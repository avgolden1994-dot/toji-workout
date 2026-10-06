/* Volume per muscolo: fasce per unità, solutore delle serie, tetti, verifica con la causa (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, REG-02, VOL-01, VOL-02, SES-01, REC-01, ESI-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VOLUME PER MUSCOLO (piano coach v2, B.3 stadio 9; W1-T4 il posto, W2-T1 il motore)
   Il volume è il lavoro della settimana: quante serie per muscolo. Dal coach v2 si conta per UNITA (le 15 di UNITA_VOLUME,
   js/dati/attributi-esercizi.js) con i crediti degli attributi degli esercizi (1 al bersaglio, 0,5 a un secondario che è un vero motore, 0 con
   eccezione scritta: contaVolume e la stessa misura). Le fasce stanno in js/coach/volume/soglie-volume.js (registro B6).
   - bersagliVolume(brief): per ogni unità minimo, bersaglio (il punto di partenza dentro la fascia: la sposta solo l esigenza, il fisico e il
     deficit, mai oltre il massimo), massimo, mantenimento, pavimento di serie dirette per giorni (IPE-02), tetto per seduta (IPE-06, B7), al
     massimo 2 unità prioritarie (EST-02, D-P17) con +25% / +45% e gli altri a max(mantenimento, 50%) in specializzazione (EST-05, EST-06, B19);
     deficit: l 85-90% del picco (OBI-04); i femorali almeno 0,6 volte i quadricipiti (EQ-03).
   - assegnaVolume(brief, sedute): il solutore. Parte dalle sedute composte e le porta dentro le fasce: toglie le serie oltre il massimo, aggiunge una
     serie alla volta dove costa meno tempo e ne dà di più all unità col deficit relativo più alto (poco «sbordo» sugli altri), scambia serie tra esercizi
     della stessa seduta o di sedute diverse quando il tempo è finito (il tempo è un tetto: D-P10, durataSeduta), e se un unità non ha esercizi chiede un
     posto (aggiungiSerieUtile: un esercizio nuovo nella seduta con più tempo). Ogni mossa rispetta i tetti: per esercizio, 8 serie morbido e 11 duro per
     unità in una seduta (SES-01), le 48 ore (REC-01), l equilibrio tra spinte e tirate (ABB-04) e almeno 2 sedute per unità con 3 giorni o più (FRQ-01, FRQ-02).
   - limitaVolume: i tetti dopo la struttura (chi inizia, poco sonno) e un nuovo giro del solutore dopo strBilancia.
   - validaVolume (REG-02): dopo l ultimo taglio rimette in ordine con le sole serie che ci sono e scrive la nota con la CAUSA di ciò che non entra
     («Polpacci 4 serie: con 30 minuti non entra di più»; sotto 4 serie frazionarie «con questi minuti è un programma di mantenimento»).
   - pavimentoVolume(brief, unita): le serie sotto cui un taglio per il tempo non deve scendere (W2-T2).
   IPE-01 spenta, un metodo famoso o il file delle soglie assente: l algoritmo di prima per gruppi (assegnaVolumeGruppi, limitaVolumeGruppi, in fondo al file).
   Il conteggio per gruppo (creditoSerie, frazionarieSettimana, recuperoOk, limitaVolumePerMuscolo) resta per chi lo usa ancora: tempo.js, completamenti.js, ricette.js.
   ============================================================ */

/* ---------------- il conteggio per gruppo di prima (lo leggono ancora tempo.js, completamenti.js, ricette.js) ---------------- */
/* muscolo (id di DETTAGLI) -> gruppo del conteggio per muscolo; classe: grande o piccolo (il core non ha tetto) */
const GRUPPI_FRAZIONARI = {
  petto: { muscoli: ['petto_alto', 'petto_medio', 'petto_basso'], classe: 0 }, schiena: { muscoli: ['dorsali', 'schiena_spessore'], classe: 0 }, quadricipiti: { muscoli: ['quadricipiti'], classe: 0 },
  femorali: { muscoli: ['femorali'], classe: 0 }, glutei: { muscoli: ['grande_gluteo'], classe: 0 }, deltoidi_laterali: { muscoli: ['deltoide_laterale'], classe: 1 },
  deltoidi_posteriori: { muscoli: ['deltoide_posteriore'], classe: 1 }, deltoidi_anteriori: { muscoli: ['deltoide_anteriore'], classe: 1 }, bicipiti: { muscoli: ['bicipiti'], classe: 1 },
  tricipiti: { muscoli: ['tricipiti'], classe: 1 }, polpacci: { muscoli: ['polpacci'], classe: 1 }
};
const FRAZIONARI_NON_CONTATI = ['stabilita', 'avambracci', 'flessori_anca'];   /* stabilizzatori e presa non fanno crescere: nessun credito */
function gruppoFrazionario(muscolo) { return Object.keys(GRUPPI_FRAZIONARI).find(g => GRUPPI_FRAZIONARI[g].muscoli.indexOf(muscolo) !== -1) || null; }
/* credito di UNA serie di un esercizio, per gruppo: 1 se il bersaglio e nel gruppo, 0,5 se e un secondario (i femorali non si contano nello squat e nella leg press: Kubo 2019) */
function creditoSerie(nome) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('creditoSerie') : null;   /* dentro buildProgram: una volta per nome (chi lo legge non lo modifica) */
  if (t !== null) { const v = t.get(nome); if (v !== undefined) return v; }
  const det = dettaglioEsercizio(nome), out = {};
  if (det) {
    let sec = det.secondari.filter(m => FRAZIONARI_NON_CONTATI.indexOf(m) === -1);
    if (schemaDi(nome) === 'squat') sec = sec.filter(m => m !== 'femorali');
    sec.forEach(m => { const g = gruppoFrazionario(m); if (g) out[g] = Math.max(out[g] || 0, 0.5); });
    const gb = det.bersaglio ? gruppoFrazionario(det.bersaglio) : null;
    if (gb) out[gb] = 1;
  }
  if (t !== null) t.set(nome, out);
  return out;
}
function frazionarieSettimana(sedute) {
  const tot = {};
  sedute.forEach(sd => sd.esercizi.forEach(e => { const cr = creditoSerie(e.name); Object.keys(cr).forEach(g => { tot[g] = (tot[g] || 0) + e.sets * cr[g]; }); }));
  return tot;
}
/* REC-01 e SES-01 (W0-T7): le aggiunte (ponte dei femorali, riempimento del tempo, seduta di tirata a corpo libero) rispettano le 48 ore tra due sedute dello stesso grande muscolo e il tetto di
   serie frazionarie per muscolo in una seduta. Prima mettevano un leg curl il giorno dopo un altra seduta di femorali o portavano il petto oltre le 11 serie. Il conteggio e quello del collaudo:
   1 serie per il bersaglio, 0,5 per i secondari (creditoSerie). `sedute` sono tutte le sedute della settimana, `sd` quella dove si aggiunge (anche non ancora dentro la lista). */
const GRUPPI_RECUPERO = ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei'];   /* i grandi muscoli del collaudo REC-01 (le spalle hanno la loro storia: i deltoidi posteriori stanno anche nei giorni di tirata) */
function frazGruppoSeduta(sd, g) { return sd.esercizi.reduce((t, e) => t + e.sets * (creditoSerie(e.name)[g] || 0), 0); }
function giornoSeduta(sd) { return DAYS.indexOf(sd.giorno); }
/* opz.obbligata (INT-2b): per la flessione del ginocchio obbligata della settimana (completaSettimana, B6) quando le serie sono ancora quelle della prescrizione (4 per esercizio): non il tetto di serie
   per seduta (a casa coi manubri i glutei sono gia a 11-12 in una seduta di gambe e il leg curl con l asciugamano, credito 0,5 ai glutei, non entrava: il solutore del volume e il taglio per il tempo
   riportano la seduta sotto il tetto, SES-01, subito dopo) e, per le 48 ore, solo i conflitti che la mossa CREA (un grande muscolo gia a 4 serie in due giorni di fila e un conflitto che c era prima) */
function recuperoOk(sd, sedute, nome, sets, opz) {
  const cr = creditoSerie(nome), obbligata = !!(opz && opz.obbligata);
  return Object.keys(cr).every(g => {
    const prima = frazGruppoSeduta(sd, g), dopo = prima + cr[g] * sets;
    if (dopo > COACH_PARAMETRI.serieMaxMuscoloSeduta && !obbligata) return false;   /* SES-01 */
    if (GRUPPI_RECUPERO.indexOf(g) === -1 || dopo < PARAM_TEMPO.serieMinRecupero) return true;
    if (obbligata && prima >= PARAM_TEMPO.serieMinRecupero) return true;
    return !sedute.some(o => o !== sd && giornoSeduta(o) >= 0 && Math.abs(giornoSeduta(o) - giornoSeduta(sd)) === 1 && frazGruppoSeduta(o, g) >= PARAM_TEMPO.serieMinRecupero);   /* REC-01 */
  });
}

/* ============================================================
   IPE-01: IL VOLUME PER UNITA (W2-T1)
   ============================================================ */
function sogliaVolume(nome) { return SOGLIE_VOLUME[nome].v; }
/* le unità grandi di B6 (il resto, tranne il deltoide anteriore che ha solo un massimo, sono piccole) */
const VOLUME_UNITA_GRANDI = ['petto', 'dorsali', 'schiena_spessore', 'quadricipiti', 'femorali', 'grande_gluteo'];
const VOLUME_UNITA_GENERALE = ['petto', 'dorsali', 'quadricipiti', 'femorali', 'grande_gluteo'];   /* salute e generale: «unità grandi» 4-8 / 6-10 / 8-12 (B6); le altre hanno solo un minimo di 2 serie frazionarie */
const VOLUME_ETICHETTE = { petto: 'Petto', dorsali: 'Dorsali', schiena_spessore: 'Spessore della schiena', quadricipiti: 'Quadricipiti', femorali: 'Femorali', grande_gluteo: 'Glutei',
  adduttori: 'Adduttori', abduttori: 'Abduttori', polpacci: 'Polpacci', deltoide_anteriore: 'Deltoidi anteriori', deltoide_laterale: 'Deltoidi laterali',
  deltoide_posteriore: 'Deltoidi posteriori', bicipiti: 'Bicipiti', tricipiti: 'Tricipiti', addome: 'Addome' };
/* i gruppi che l utente sceglie come priorità (onboarding) -> le unità fini, la principale per prima (D-P17: massimo 2 unità in tutto) */
const VOLUME_PRIORITA_UNITA = { petto: ['petto'], schiena: ['dorsali', 'schiena_spessore'], spalle: ['deltoide_laterale', 'deltoide_posteriore'], braccia: ['bicipiti', 'tricipiti'],
  gambe: ['quadricipiti', 'femorali'], glutei: ['grande_gluteo'], core: ['addome'] };
/* il fastidio che toglie la specializzazione di un unità (EST-03: nessun fastidio dichiarato nella zona) */
const VOLUME_ZONA_UNITA = { petto: ['spalle'], dorsali: ['spalle', 'schiena'], schiena_spessore: ['schiena', 'spalle'], quadricipiti: ['ginocchia'], femorali: ['ginocchia', 'schiena'],
  grande_gluteo: ['schiena'], deltoide_laterale: ['spalle'], deltoide_posteriore: ['spalle'], deltoide_anteriore: ['spalle'], addome: ['schiena'] };
/* i gruppi del collaudo REC-01 (48 ore) e dell equilibrio: il credito di un esercizio al gruppo e il massimo dei crediti delle sue unità (come il collaudo: 1 per il bersaglio, 0,5 per un secondario) */
const VOLUME_GRUPPI_RECUPERO = { petto: ['petto'], schiena: ['dorsali', 'schiena_spessore'], quadricipiti: ['quadricipiti'], femorali: ['femorali'], glutei: ['grande_gluteo'],
  spalle: ['deltoide_laterale', 'deltoide_posteriore', 'deltoide_anteriore'] };
const VOLUME_GRUPPI_SOMMA = ['spalle'];   /* le spalle sono tre unità: il credito al gruppo è la somma (come il collaudo REC-01), per gli altri il massimo */
/* unità con la frequenza da controllare: ≥ 2 sedute con almeno 1,5 serie frazionarie (FRQ-01) e, per i muscoli piccoli, ≥ 2 sedute con serie dirette (FRQ-02) */
const VOLUME_FREQUENZA_UNITA = ['petto', 'dorsali', 'quadricipiti', 'femorali', 'grande_gluteo', 'bicipiti', 'tricipiti'];
const VOLUME_FREQUENZA_DIRETTE = ['deltoide_laterale', 'deltoide_posteriore', 'bicipiti', 'tricipiti', 'polpacci'];
/* quanto conta un unità quando il tempo non basta per tutte: la scala di priorità di ricerca-casa-poco-tempo §5.4 (P1 i grandi schemi, P3 spinte e tirate, P4 laterali, polpacci e flessione,
   P5 braccia dirette, P6 core): le grandi per prime, poi i piccoli, il core e le anche per ultimi (Convenzione; è solo l ordine in cui il solutore sceglie dove spendere i minuti) */
const VOLUME_IMPORTANZA = { petto: 1, dorsali: 1, quadricipiti: 1, femorali: 1, grande_gluteo: 0.9, schiena_spessore: 0.9, deltoide_laterale: 0.7, polpacci: 0.6, deltoide_posteriore: 0.6, bicipiti: 0.55, tricipiti: 0.55,
  addome: 0.35, adduttori: 0.25, abduttori: 0.25, deltoide_anteriore: 1 };
/* pesi del solutore: dicono solo in che ordine prova le mosse (non sono soglie del coach). Per ogni serie e per bersaglio:
   sotto il mantenimento 4, fino al minimo 2,5, fino al bersaglio 1,5 (i prioritari valgono 1,4 volte), oltre il bersaglio niente (il tempo è un tetto), oltre il massimo -3;
   tutto diviso per max(8, bersaglio): contano i deficit RELATIVI, senza che un muscolo piccolo pesi più di uno grande. */
const VOLUME_PESI = { mantenimento: 4, minimo: 2.5, bersaglio: 1.5, importanzaPriorita: 1.4, eccesso: 3, direttePavimento: 3, riferimentoMin: 8, frequenza: 0.35, morbidoSeduta: 0.1, duroSeduta: 1, equilibrio: 0.2, recupero: 0.3, soglia: 0.004, sogliaScambio: 0.01, giriMax: 160 };

/* volume della settimana per scopo (come tipoObiettivoDi di tempo.js: tre tipi) */
function volumeTipo(goals) { const g = goals[0]; return g === 'forza' ? 'forza' : ((g === 'salute' || g === 'dimagrimento') ? 'generale' : 'ipertrofia'); }
function volumeEtichetta(u) { return VOLUME_ETICHETTE[u] || u; }

/* le unità prioritarie: al massimo 2 (D-P17). Se il brief le ha già (le sceglie l interfaccia di W5-T1, EST-02) valgono quelle; altrimenti si ricavano dai gruppi scelti
   nell onboarding: la prima unità di ogni gruppo, poi la seconda, finché sono 2 */
function unitaPriorita(brief) {
  const max = sogliaVolume('priorita').massimoUnita;
  const date = brief.obiettivi && brief.obiettivi.prioritaUnita;
  if (Array.isArray(date) && date.length) return date.filter(u => UNITA_VOLUME.indexOf(u) !== -1).slice(0, max);
  const gruppi = ((brief.preferenze && brief.preferenze.priorita) || []).filter(g => VOLUME_PRIORITA_UNITA[g]);
  const out = [];
  for (let giro = 0; giro < 2 && out.length < max; giro++) gruppi.forEach(g => { const u = VOLUME_PRIORITA_UNITA[g][giro]; if (u && out.length < max && out.indexOf(u) === -1) out.push(u); });
  return out;
}
/* EST-03: chi può specializzare (volume +25% o +45%, gli altri a mantenimento). Avanzato (l intermedio solo nella modalità Estetica, che arriva con W5-T4: i 12 mesi di allenamento
   non si possono ancora verificare), adulto, non prudente, non in deficit, nessun fastidio nella zona dell unità, nessun periodo difficile che riduce il volume */
function puoSpecializzare(brief, prioritarie) {
  const chi = brief.chi, goals = brief.obiettivi.lista, fastidi = (brief.sicurezza && brief.sicurezza.fastidi) || [];
  if (!(chi.livello === 'avanzato' || (chi.livello === 'intermedio' && brief.obiettivi.modalita === 'estetica'))) return false;
  if (chi.cauto || chi.minorenne || goals[0] === 'dimagrimento' || faseDaObiettivi(goals) === 'deficit') return false;
  const mo = brief.mente && brief.mente.momento;
  if (mo && !mo.scaduto && (mo.vol < 1 || mo.rir)) return false;
  return !prioritarie.some(u => (VOLUME_ZONA_UNITA[u] || []).some(z => fastidi.indexOf(z) !== -1));
}

/* bersagliVolume(brief): i numeri del volume per unità di questo programma (registro B6, B7, B19, OBI-04).
   Ritorna { tipo, giorni, esigenza, deficit, specializza, prioritarie, unita: { u: { min, minBanda, target, max, mant, floorD, pienaD, capDuro, capMorbido, prioritaria, altro } }, gruppiLimite }.
   min = da dove il solutore sente il deficit come urgente (per un prioritario è il bersaglio standard + 1), minBanda = il minimo della fascia (le note); target = il punto di partenza
   dentro la fascia: min × esigenza (mai oltre il massimo), ×1,2 se la massa magra è bassa, ×0,85 se in calo; in deficit l 85% del minimo e il massimo al 90% (OBI-04). */
function bersagliVolume(brief, opz) {
  opz = opz || {};
  const chi = brief.chi, level = chi.livello, goals = brief.obiettivi.lista, tipo = volumeTipo(goals);
  const giorni = Number(brief.agenda.giorni) || 3;
  const fis = (brief.corpo && brief.corpo.fis) || {};
  const deficit = faseDaObiettivi(goals) === 'deficit' && regolaAttiva('OBI-04');
  let esig = Number(brief.mente && brief.mente.esigenza) || 1;
  if (deficit && esig > 1) esig = 1;   /* OBI-04: niente +20% in deficit */
  const fasce = sogliaVolume('fasceUnita'), gen = sogliaVolume('fasceGenerale')[level] || sogliaVolume('fasceGenerale').intermedio, forzaQ = sogliaVolume('forzaQuotaFascia');
  const pavimenti = sogliaVolume('pavimentiDirette'), pr = sogliaVolume('priorita'), tt = sogliaVolume('tettoSeduta'), defi = sogliaVolume('deficit'), ff = sogliaVolume('fattoreFisico');
  const prioritarie = opz.senzaPriorita ? [] : unitaPriorita(brief);
  const specializza = prioritarie.length > 0 && regolaAttiva('EST-05') && puoSpecializzare(brief, prioritarie);   /* EST-05 spenta: solo la priorità leggera */
  const altriAMantenimento = specializza && regolaAttiva('EST-06');
  const base = (brief.lavoro && brief.lavoro.volumeBase) || {};   /* il volume che il programma standard ha dato a ogni unità: la priorità si misura da lì (PRI-01) */
  const unita = {};
  UNITA_VOLUME.forEach(u => {
    const f = fasce[u], mant = f.mantenimento.slice(), grande = VOLUME_UNITA_GRANDI.indexOf(u) !== -1, piccola = !grande && u !== 'deltoide_anteriore';
    let mn = f[level][0], mx = f[level][1], t = mn;
    if (tipo === 'generale') {
      if (VOLUME_UNITA_GENERALE.indexOf(u) !== -1) { mn = gen[0]; mx = gen[1]; }
      else if (u === 'deltoide_anteriore') { mn = 0; mx = Math.min(mx, gen[1]); }
      else { mn = Math.min(mn, sogliaVolume('minimoPiccoleGenerale')); mx = Math.min(mx, gen[1]); }
      t = mn;
    } else if (tipo === 'forza') {
      if (grande) mx = Math.min(mx, mn + Math.round((mx - mn) * forzaQ));   /* le grandi nella metà bassa della fascia */
      else if (piccola) { mn = mant[0]; t = Math.max(mn, mant[1]); }        /* le piccole a mantenimento */
    }
    if (u === 'grande_gluteo' && tipo === 'ipertrofia' && goals.indexOf('glutei') !== -1) { const fg = sogliaVolume('fasciaGlutei')[level]; mn = fg[0]; mx = fg[1]; t = mn; }
    /* il punto di partenza: l esigenza lo sposta dentro la fascia (mai oltre il massimo); sotto 1 scende anche il minimo */
    if (esig > 1) t = Math.min(mx, Math.max(t, Math.round(mn * esig)));
    else if (esig < 1) { mn = Math.round(mn * esig); t = Math.max(mn, Math.round(t * esig)); }
    if (fis.ffmiBasso && goals[0] !== 'dimagrimento' && t > 0) t = Math.min(mx, Math.round(t * ff.ffmiBasso));
    if (fis.magraInCalo) { mn = Math.round(mn * ff.magraInCalo); t = Math.max(mn, Math.round(t * ff.magraInCalo)); }
    if (deficit && tipo !== 'generale') { mn = Math.round(mn * defi.minimo); mx = Math.max(mn, Math.round(mx * defi.massimo)); t = mn; }
    t = Math.max(mn, Math.min(t, mx));
    /* IPE-02: pavimento di serie dirette (intermedio e avanzato; chi inizia solo femorali e addome, un esercizio) */
    let floorD = 0, pienaD = 0;
    const pav = pavimenti[u];
    if (pav) {
      const col = level === 'principiante' ? 'generale' : (tipo === 'forza' ? 'forza' : (tipo === 'generale' ? 'generale' : (giorni >= 4 ? 'g4' : (giorni === 3 ? 'g3' : 'g2'))));
      if (level !== 'principiante' || u === 'femorali' || (u === 'addome' && giorni >= 3)) { floorD = pav[col][0]; pienaD = pav[col][1]; }
    }
    const x = { min: mn, minBanda: mn, target: t, max: mx, mant: mant[0], floorD: floorD, pienaD: pienaD, capDuro: tt.duro, capMorbido: tt.morbido, prioritaria: false, altro: false };
    if (prioritarie.indexOf(u) !== -1) {
      const aum = specializza ? (level === 'avanzato' ? pr.aumento.avanzato : pr.aumento.intermedio) : pr.aumento.leggera;
      const tetto = pr.tetto[u] || pr.tetto.predefinito;
      const rif = Math.max(t, base[u] || 0);
      x.prioritaria = true;
      x.target = Math.min(tetto, Math.max(rif + 1, Math.round(rif * (1 + aum))));
      x.min = Math.min(x.target, rif + 1);   /* ciò che il programma standard dà più una serie vengono prima del resto: la priorità vale sempre almeno una serie */
      x.max = specializza ? tetto : Math.max(mx, x.target);
      if (specializza) { x.capDuro = piccola ? tt.specializzazionePiccole : tt.specializzazione; x.capMorbido = Math.min(x.capMorbido, x.capDuro); }
    } else if (altriAMantenimento && u !== 'deltoide_anteriore') {
      /* EST-06: gli altri a max(mantenimento, 50% del bersaglio standard), carichi invariati */
      const m = Math.max(mant[1], Math.round(pr.altriQuota * t));
      x.altro = true; x.target = Math.min(t, m); x.min = Math.min(mant[0], x.target); x.max = Math.min(mx, x.target + 1);
      x.floorD = Math.min(x.floorD, x.target);
    }
    x.min = Math.min(x.min, x.target); x.mant = Math.min(x.mant, x.min);
    unita[u] = x;
  });
  /* EQ-03: i femorali almeno 0,6 volte i quadricipiti */
  const rapporto = Math.round(sogliaVolume('femoraliSuQuadricipiti') * unita.quadricipiti.target);
  const fem = unita.femorali;
  if (!fem.altro && rapporto > fem.min) { fem.min = Math.min(rapporto, fem.max); fem.minBanda = Math.max(fem.minBanda, fem.min); fem.target = Math.max(fem.target, fem.min); }
  /* il tetto di gruppo della schiena: dorsali e spessore insieme non oltre la fascia IPE (le trazioni e i rematori sono la stessa schiena). INT-2b: mai sotto la somma dei due minimi (per i
     principianti di forza e di salute 6 + 4 > 8: il solutore penalizzava uno stato che le fasce stesse gli chiedevano; il collaudo VOL-02:schiena conta ancora la somma contro la fascia dei dorsali) */
  return { tipo: tipo, giorni: giorni, esigenza: esig, deficit: deficit, specializza: specializza, altriAMantenimento: altriAMantenimento, prioritarie: prioritarie, unita: unita,
    gruppiLimite: { schiena: { unita: ['dorsali', 'schiena_spessore'], max: Math.max(unita.dorsali.max, unita.schiena_spessore.max, unita.dorsali.min + unita.schiena_spessore.min) } } };
}

/* crediti di UNA serie, per unità: gli attributi sono l unica fonte (W1-T2); senza (un esercizio fuori libreria) si ricade su DETTAGLI */
const _creditiUnitaCache = {};
function creditiUnita(nome) {
  const k = String(nome);
  if (_creditiUnitaCache[k]) return _creditiUnitaCache[k];
  const out = {};
  const a = typeof attributi === 'function' ? attributi(nome) : null;
  if (a) UNITA_VOLUME.forEach(u => { if (a.muscoli[u] > 0) out[u] = a.muscoli[u]; });
  else {
    const det = typeof dettaglioEsercizio === 'function' ? dettaglioEsercizio(nome) : null;
    if (det) {
      (det.secondari || []).forEach(m => { const u = unitaDiMuscolo(m); if (u && FRAZIONARI_NON_CONTATI.indexOf(m) === -1) out[u] = Math.max(out[u] || 0, 0.5); });
      const ub = det.bersaglio ? unitaDiMuscolo(det.bersaglio) : null;
      if (ub) out[ub] = 1;
    }
  }
  _creditiUnitaCache[k] = out;
  return out;
}
/* il volume di una settimana per unità: { u: { frazionarie, dirette, sedute } } (contaVolume degli attributi) */
function volumeUnita(sedute) { return contaVolume(sedute); }

/* IPE-01 acceso, il file delle soglie presente e nessun metodo famoso (il metodo decide da sé le serie) */
function volumeNuovoAttivo(brief) {
  return typeof SOGLIE_VOLUME !== 'undefined' && !!(brief && brief.chi && brief.obiettivi && brief.agenda) && regolaAttiva('IPE-01') && !(brief.metodo && brief.metodo.attivo);
}

/* ============================================================
   IL SOLUTORE: un unico stato (le serie di ogni esercizio), una funzione di utilità sulle unità, mosse che la migliorano
   ============================================================ */
function volumeMotore(brief, sedute, b, opz) {
  opz = opz || {};
  const U = UNITA_VOLUME, nU = U.length, iU = {};
  U.forEach((u, i) => { iU[u] = i; });
  const L = brief.lavoro, prefs = L.prefs, chi = brief.chi, nS = sedute.length;
  const vincoli = (brief.sicurezza && brief.sicurezza.vincoli) || {};
  const prudente = !!(chi.principiante || chi.cauto);
  const serieMax = sogliaVolume('serieMaxEsercizio'), seduteMin = sogliaVolume('seduteMinimeUnita'), serieMinSeduta = sogliaVolume('serieMinSeduta');
  const maxEs = chi.principiante ? sogliaVolume('eserciziMaxSeduta').principiante : sogliaVolume('eserciziMaxSeduta').adulto;
  const minRec = (typeof PARAM_TEMPO !== 'undefined' && PARAM_TEMPO.serieMinRecupero) || 4;
  const tettoGruppo = sogliaVolume('tettoSeduta').duro;   /* il tetto duro per seduta vale anche per i grandi gruppi del collaudo (petto, schiena, quadricipiti, femorali, glutei) */
  const rapportoTirate = typeof STR_PESI !== 'undefined' ? STR_PESI.tirateSuSpinte : 0.9, minBilancio = typeof STR_PESI !== 'undefined' ? STR_PESI.minSerieBilancio : 8;
  const PS = VOLUME_PESI;
  const minuti = opz.minuti || brief.agenda.minuti;
  const senzaCrescita = !!opz.senzaCrescita;   /* nella verifica finale nessuna seduta si allunga: si scambiano le serie, non si aggiungono minuti (W2-T2 ha deciso il tempo) */

  /* ---- parametri per unità ---- */
  const P = U.map(u => {
    const x = b.unita[u], ref = Math.max(PS.riferimentoMin, x.target), imp = x.prioritaria ? PS.importanzaPriorita : (VOLUME_IMPORTANZA[u] || 0.5);
    return { u: u, min: x.min, minBanda: x.minBanda, target: x.target, max: x.max, mant: Math.min(x.mant, x.min), floorD: x.floorD, capDuro: x.capDuro, capMorbido: x.capMorbido, prio: x.prioritaria, ref: ref, imp: imp,
      w0: imp * PS.mantenimento / ref, w1: imp * PS.minimo / ref, w2: imp * PS.bersaglio / ref, w4: PS.eccesso / ref, wd: imp * PS.direttePavimento / ref };
  });
  const frequenzaOk = nS >= 2 && b.giorni >= 3;
  const freqU = frequenzaOk ? VOLUME_FREQUENZA_UNITA.map(u => iU[u]) : [];
  /* la frequenza si conta col più severo dei due conteggi, gli attributi e il credito di prima (creditoSerie): una seduta «conta» solo se vale per tutti e due (FRQ-01) */
  const GRUPPO_DI_PRIMA = { petto: 'petto', dorsali: 'schiena', quadricipiti: 'quadricipiti', femorali: 'femorali', grande_gluteo: 'glutei', bicipiti: 'bicipiti', tricipiti: 'tricipiti' };
  const freqG = freqU.map(i => GRUPPO_DI_PRIMA[U[i]]);
  const dirU = (frequenzaOk && b.tipo === 'ipertrofia' && chi.livello !== 'principiante') ? VOLUME_FREQUENZA_DIRETTE.map(u => iU[u]).filter(i => P[i].floorD >= 2) : [];
  const schienaIdx = VOLUME_GRUPPI_RECUPERO.schiena.map(u => iU[u]), iAddome = iU.addome;
  const limiteSchiena = b.gruppiLimite && b.gruppiLimite.schiena ? b.gruppiLimite.schiena.max : 99;

  /* ---- stato ---- */
  const W = new Array(nU).fill(0), D = new Array(nU).fill(0);
  const S = sedute.map(() => new Array(nU).fill(0)), SD = sedute.map(() => new Array(nU).fill(0)), GL = sedute.map(() => ({}));
  const GR = Object.keys(VOLUME_GRUPPI_RECUPERO), nG = GR.length, iG = {};
  GR.forEach((g, h) => { iG[g] = h; });
  const sommaG = GR.map(g => VOLUME_GRUPPI_SOMMA.indexOf(g) !== -1);
  const G = sedute.map(() => new Array(nG).fill(0));   /* serie per gruppo del recupero e per seduta, indicizzate come GR (INT-2b: niente chiavi di testo nel ciclo caldo) */
  let PUSH = 0, PULL = 0, SCHIENA = 0;
  const SCHIENA_S = sedute.map(() => 0);   /* le serie di schiena (dorsali e spessore insieme) per seduta: il tetto duro di 11 vale per il gruppo, come nel collaudo (SES-01) */
  const giorno = sedute.map(sd => giornoSeduta(sd));
  const consecutive = [], vicini = sedute.map(() => []);
  for (let s = 0; s < nS; s++) for (let o = s + 1; o < nS; o++) if (giorno[s] >= 0 && giorno[o] >= 0 && Math.abs(giorno[s] - giorno[o]) === 1) { consecutive.push([s, o]); vicini[s].push(o); vicini[o].push(s); }
  const recs = [], vietatiNuovi = {};
  const T = sedute.map(sd => durataSeduta(sd.esercizi));
  const T0 = T.slice();
  /* INT-2b (velocità, misurata: l utilità era metà del tempo di buildProgram). La somma dell utilità resta LA STESSA, nello stesso ordine di operazioni (una mossa
     vince sull altra anche per l ultimo bit: l esito deve restare identico), ma i cicli che non aggiungono niente si saltano: i contatori dicono quante celle stanno
     sopra un tetto (per seduta: unità sopra il tetto morbido, gruppi sopra il tetto duro; coppie di giorni consecutivi con lo stesso gruppo da 4 serie), e la frequenza
     di un unità (somma sulle sedute) si ricalcola solo quando una sua seduta cambia. Li tiene aggiornati muovi. */
  const sopraMorbido = new Array(nS).fill(0);
  let sopraGruppo = 0, recuperoAttivo = 0;
  const kFreq = new Array(nU).fill(-1), kDir = new Array(nU).fill(-1), kFreqDiGruppo = {};
  freqU.forEach((i, k) => { kFreq[i] = k; const g = freqG[k]; if (g) (kFreqDiGruppo[g] = kFreqDiGruppo[g] || []).push(k); });
  dirU.forEach((i, k) => { kDir[i] = k; });
  const nFreq = freqU.map(() => 0), freqSporca = freqU.map(() => true), nDir = dirU.map(() => 0), dirSporca = dirU.map(() => true);
  const recuperoDi = (s, o, h) => Math.min(G[s][h], G[o][h]) >= minRec;

  const tempoSerie = (e) => {
    const sec = (isTimeBased(e.name) ? e.reps : e.reps * ((typeof PARAM_TEMPO !== 'undefined' && PARAM_TEMPO.secRipetizione) || 3.5)) * ((findExercise(e.name) || {}).lato ? 2 : 1) + ((typeof PARAM_TEMPO !== 'undefined' && PARAM_TEMPO.secSetup) || 10);
    return (sec + (e.rest || 0)) / 60;
  };
  const capSerie = (e) => {
    const m = findExercise(e.name) || {}, comp = m.type === 'compound';
    let c = comp ? serieMax.composto : serieMax.isolamento;
    if (m.group === 'core') c = Math.min(c, sogliaVolume('serieMaxCore'));   /* INT-2b: il core non oltre 3 serie per esercizio (ABB-03, SEL-07); il resto in un altra seduta */
    if (prudente) c = Math.min(c, COACH_PARAMETRI.serieMaxPrudente);
    if (vincoli.serieMaxEsercizio) c = Math.min(c, vincoli.serieMaxEsercizio);
    if (typeof STR_FATICA !== 'undefined' && STR_FATICA.test(e.name)) c = Math.min(c, 3);        /* ABB-09 */
    if (typeof RX_NORDIC !== 'undefined' && RX_NORDIC.test(senzaEmoji(e.name))) c = Math.min(c, PARAM_NORDIC.serieMax);   /* B1 */
    return c;
  };
  const nuovoRec = (s, e, fond) => {
    const cr = creditiUnita(e.name), crv = [];
    Object.keys(cr).forEach(u => crv.push([iU[u], cr[u]]));
    const gr = [];
    const vecchio = creditoSerie(e.name);   /* le 48 ore valgono anche col conteggio di prima (ponte dei femorali, riempimento): il credito al gruppo è il più alto dei due */
    GR.forEach((g, h) => { const v = VOLUME_GRUPPI_RECUPERO[g].map(u => cr[u] || 0), c0 = sommaG[h] ? v.reduce((t, x) => t + x, 0) : Math.max.apply(null, v), c = Math.max(c0, sommaG[h] ? 0 : (vecchio[g] || 0)); if (c > 0) gr.push([h, c]); });
    const tempo = !isTimeBased(e.name);
    return { s: s, e: e, cr: crv, gr: gr, leg: vecchio, push: tempo && strEspinta(e), pull: tempo && strEtirata(e), tm: tempoSerie(e), sets0: e.sets, cap: capSerie(e), fond: !!fond, min: Math.min(e.sets, fond ? 3 : 2), bloccato: false,
      sch: Math.max(cr.dorsali || 0, cr.schiena_spessore || 0) };
  };
  const muovi = (r, d) => {
    r.e.sets += d;
    const s = r.s, Ss = S[s], Gs = G[s], vic = vicini[s];
    for (let k = 0; k < r.cr.length; k++) {
      const i = r.cr[k][0], c = r.cr[k][1] * d, cap = P[i].capMorbido;
      W[i] += c;
      const prima = Ss[i] > cap;
      Ss[i] += c;
      if ((Ss[i] > cap) !== prima) sopraMorbido[s] += prima ? -1 : 1;
      if (r.cr[k][1] === 1) { D[i] += d; SD[s][i] += d; if (kDir[i] >= 0) dirSporca[kDir[i]] = true; }
      if (kFreq[i] >= 0) freqSporca[kFreq[i]] = true;
    }
    for (let k = 0; k < r.gr.length; k++) {
      const h = r.gr[k][0], dopo = Gs[h] + r.gr[k][1] * d;
      /* le coppie di giorni consecutivi con questo gruppo contano solo se la seduta arriva a 4 serie: sotto, prima e dopo, niente cambia */
      let primaRec = 0;
      const guarda = vic.length > 0 && (Gs[h] >= minRec || dopo >= minRec);
      if (guarda) for (let j = 0; j < vic.length; j++) if (recuperoDi(s, vic[j], h)) primaRec++;
      const primaTetto = !sommaG[h] && Gs[h] > tettoGruppo;
      Gs[h] = dopo;
      if ((!sommaG[h] && Gs[h] > tettoGruppo) !== primaTetto) sopraGruppo += primaTetto ? -1 : 1;
      if (guarda) { for (let j = 0; j < vic.length; j++) if (recuperoDi(s, vic[j], h)) primaRec--; recuperoAttivo -= primaRec; }
    }
    for (const g in r.leg) {
      GL[s][g] = (GL[s][g] || 0) + r.leg[g] * d;
      const ks = kFreqDiGruppo[g];
      if (ks) for (let j = 0; j < ks.length; j++) freqSporca[ks[j]] = true;
    }
    if (r.push) PUSH += d;
    if (r.pull) PULL += d;
    SCHIENA += r.sch * d; SCHIENA_S[s] += r.sch * d;
  };
  sedute.forEach((sd, s) => {
    const primo = sd.esercizi.find(e => (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name));
    sd.esercizi.forEach(e => {
      const r = nuovoRec(s, e, e === primo); recs.push(r);
      /* INT-2b: il core entra gia dentro il suo tetto per esercizio (3 serie: ABB-03, SEL-07), anche se la prescrizione gliene dava 4 (il solutore toglie solo dove l utilita sale) */
      const sets = (findExercise(e.name) || {}).group === 'core' ? Math.min(e.sets, r.cap) : e.sets;
      r.sets0 = sets; r.min = Math.min(sets, r.min);
      e.sets = 0; muovi(r, sets);
    });
  });

  /* ---- utilità ---- */
  const utilita = () => {
    let r = 0;
    for (let i = 0; i < nU; i++) {
      const p = P[i], v = W[i];
      if (v <= p.mant) r += v * p.w0;
      else {
        r += p.mant * p.w0;
        if (v <= p.min) r += (v - p.mant) * p.w1;
        else {
          r += (p.min - p.mant) * p.w1;
          if (v <= p.target) r += (v - p.min) * p.w2;
          else { r += (p.target - p.min) * p.w2; if (v > p.max) r -= (v - p.max) * p.w4; }
        }
      }
      if (p.floorD > 0) r += Math.min(D[i], p.floorD) * p.wd;
    }
    if (SCHIENA > limiteSchiena) r -= (SCHIENA - limiteSchiena) * PS.eccesso / Math.max(PS.riferimentoMin, limiteSchiena);
    /* oltre il tetto duro (SES-01) una serie costa quanto un muscolo sotto il minimo: uno stato di partenza fuori tetto si ripara (le sedute senza unità sopra il tetto morbido non aggiungono niente: si saltano) */
    for (let s = 0; s < nS; s++) { if (sopraMorbido[s] === 0) continue; for (let i = 0; i < nU; i++) { const o = S[s][i] - P[i].capMorbido; if (o > 0) { r -= o * PS.morbidoSeduta; const d = S[s][i] - P[i].capDuro; if (d > 0) r -= d * PS.duroSeduta; } } }
    for (let k = 0; k < freqU.length; k++) {
      if (freqSporca[k]) { const i = freqU[k], g = freqG[k]; let n = 0; for (let s = 0; s < nS; s++) n += Math.min(1, Math.min(S[s][i], g ? (GL[s][g] || 0) : 99) / serieMinSeduta); nFreq[k] = n; freqSporca[k] = false; }
      r += PS.frequenza * Math.min(seduteMin, nFreq[k]);
    }
    for (let k = 0; k < dirU.length; k++) {
      if (dirSporca[k]) { const i = dirU[k]; let n = 0; for (let s = 0; s < nS; s++) n += Math.min(1, SD[s][i]); nDir[k] = n; dirSporca[k] = false; }
      r += PS.frequenza * Math.min(seduteMin, nDir[k]);
    }
    if (PUSH + PULL >= minBilancio && PULL < rapportoTirate * PUSH) r -= (rapportoTirate * PUSH - PULL) * PS.equilibrio;
    if (sopraGruppo > 0) for (let s = 0; s < nS; s++) for (let h = 0; h < nG; h++) if (!sommaG[h] && G[s][h] > tettoGruppo) r -= (G[s][h] - tettoGruppo) * PS.duroSeduta;
    if (recuperoAttivo > 0) for (let k = 0; k < consecutive.length; k++) for (let h = 0; h < nG; h++) {   /* REC-01: due sedute in giorni consecutivi non hanno entrambe 4 serie frazionarie dello stesso grande muscolo */
      const m = Math.min(G[consecutive[k][0]][h], G[consecutive[k][1]][h]);
      if (m >= minRec) r -= (m - minRec + 1) * PS.recupero;
    }
    return r;
  };
  const squilibrio = () => (PUSH + PULL >= minBilancio && PULL < rapportoTirate * PUSH) ? rapportoTirate * PUSH - PULL : 0;

  const seduteChePesano = (i) => { const g = freqG[freqU.indexOf(i)]; return sedute.filter((sd, s) => Math.min(S[s][i], g ? (GL[s][g] || 0) : 99) >= serieMinSeduta - 1e-9).length; };

  /* ---- vincoli di una mossa (d serie in più o in meno su un esercizio) ---- */
  const consente = (r, d, intero, senzaEquilibrio) => {   /* senzaEquilibrio (INT-2b): l equilibrio tra spinte e tirate lo giudica chi compone una mossa doppia (miglioreToglimentoCoppia) sullo stato finale */
    const e = r.e;
    if (e.fisso) return false;
    if (d > 0) {
      if (e.sets + d > r.cap) return false;
      for (let k = 0; k < r.cr.length; k++) { const i = r.cr[k][0]; if (S[r.s][i] + r.cr[k][1] * d > P[i].capDuro + 1e-9) return false; }   /* SES-01, IPE-06 */
      for (let k = 0; k < r.cr.length; k++) { const i = r.cr[k][0]; if (i === iAddome && W[i] + r.cr[k][1] * d > P[i].max + 1e-9) return false; }   /* INT-2b: l addome non supera il massimo di B6 a settimana (tetto duro, non solo la penalita) */
      if (r.sch > 0 && SCHIENA_S[r.s] + r.sch * d > Math.min(P[iU.dorsali].capDuro, P[iU.schiena_spessore].capDuro) + 1e-9) return false;
      for (let k = 0; k < r.gr.length; k++) if (!sommaG[r.gr[k][0]] && G[r.s][r.gr[k][0]] + r.gr[k][1] * d > tettoGruppo + 1e-9) return false;   /* SES-01 col conteggio di prima e degli attributi */
      for (let k = 0; k < r.gr.length; k++) {   /* REC-01: 48 ore (vicini: le sedute del giorno prima e del giorno dopo) */
        const h = r.gr[k][0], dopo = G[r.s][h] + r.gr[k][1] * d, vic = vicini[r.s];
        if (dopo < minRec) continue;
        for (let j = 0; j < vic.length; j++) if (G[vic[j]][h] >= minRec) return false;
      }
    } else if (!intero && e.sets + d < r.min) return false;
    if ((r.push || r.pull) && !senzaEquilibrio) {   /* ABB-04: spinte e tirate non peggiorano uno squilibrio e non ne creano */
      const prima = squilibrio(), pu = PUSH + (r.push ? d : 0), pl = PULL + (r.pull ? d : 0);
      const dopoSq = (pu + pl >= minBilancio && pl < rapportoTirate * pu) ? rapportoTirate * pu - pl : 0;
      if (dopoSq > 1e-9 && dopoSq > prima + 1e-9) return false;
    }
    return true;
  };
  const tempoOk = (r, d) => { if (senzaCrescita) return T[r.s] + d * r.tm <= T0[r.s] + 1e-9; return T[r.s] + d * r.tm <= minuti + 1e-9; };

  /* ---- esercizi nuovi (aggiungiSerieUtile): candidati della libreria per unità ---- */
  const consentitoCache = {};
  const consentitoC = (nome) => { if (consentitoCache[nome] === undefined) consentitoCache[nome] = !!consentito(nome, prefs); return consentitoCache[nome]; };
  const candCache = {};
  const candidatiNuovi = (u) => {
    if (candCache[u]) return candCache[u];
    const lista = EXERCISE_LIBRARY.filter(x => {
      const cr = creditiUnita(x.name);
      if (!(cr[u] >= 0.5) || !consentitoC(x.name)) return false;
      const a = typeof attributi === 'function' ? attributi(x.name) : null;
      if (a && (a.soloAvvio || (prudente && a.abilita === 3))) return false;
      if (schienaLombare(x.name) || SCHIENA_PESANTE.test(x.name)) return false;   /* ABB-07: i carichi pesanti per la schiena li decide la composizione, non il volume */
      if (/Pullover con Manubrio/i.test(senzaEmoji(x.name))) return false;   /* D-P11: il pullover è la riserva della tirata verticale, lo mette la composizione solo dove non c è altro; il volume non lo aggiunge */
      /* a casa non si da per certo un attrezzo che il questionario non chiede: a corpo libero niente di ciò che serve qualcosa; con i manubri al massimo la panca (CAS-01) */
      const sv = typeof serveAttrezzo === 'function' ? serveAttrezzo(x.name) : null;
      if (sv && sv.length && (prefs.luogo === 'corpo' || (prefs.luogo === 'manubri' && sv.some(q => q !== 'panca')))) return false;
      return true;
    }).sort((x, y) => (creditiUnita(y.name)[u] - creditiUnita(x.name)[u]) || ((x.type === 'compound') - (y.type === 'compound')) || ((PRIORI[senzaEmoji(y.name)] || 0) - (PRIORI[senzaEmoji(x.name)] || 0)) || (x.name < y.name ? -1 : 1));
    candCache[u] = lista.slice(0, 16);
    return candCache[u];
  };
  const usoSettimana = (nome) => sedute.filter(sd => sd.esercizi.some(e => e.name === nome)).length;
  /* un esercizio intero si può togliere se non è il fondamentale, un fisso, l unico del suo schema nella seduta (SES-03) e la seduta resta con almeno 3 esercizi (EXN-01) */
  const categoria = (e) => {   /* lo schema del multiarticolare, come lo legge il collaudo (SES-03, PAT-01): dal bersaglio e dallo schema */
    const m = findExercise(e.name) || {};
    if (m.type !== 'compound' || isTimeBased(e.name)) return null;
    const bers = bersaglioDi(e.name), schema = schemaDi(e.name);
    if (/^petto/.test(bers)) return 'spintaO';
    if (bers === 'deltoide_anteriore') return 'spintaV';
    if (bers === 'dorsali') return 'tirataV';
    if (bers === 'schiena_spessore') return 'tirataO';
    if (bers === 'tricipiti') return 'spintaT';
    if (schema === 'squat') return 'squat';
    if (schema === 'hinge' || ['erettori', 'grande_gluteo', 'femorali'].indexOf(bers) !== -1) return 'hinge';
    return null;
  };
  const SCHEMI_SEDUTA = { fullbody: ['spinta', 'tirata', 'basso'], upper: ['spinta', 'tirata'], lower: ['squat', 'hinge'], legs: ['squat', 'hinge'], push: ['spinta'], pull: ['tirata'] };
  const classeSeduta = (cat, tipo) => cat === 'spintaO' || cat === 'spintaV' ? 'spinta' : cat === 'tirataO' || cat === 'tirataV' ? 'tirata' : ((cat === 'squat' || cat === 'hinge') && tipo === 'fullbody' ? 'basso' : cat);
  const femoraleSeduta = (e) => /leg curl|nordic|stacco|good morning|pull-through/i.test(senzaEmoji(e.name));   /* come SLOT_DEF.hinge e la flessione del ginocchio del collaudo */
  const rimovibile = (r, senzaVolume, senzaEquilibrio) => {
    const sd = sedute[r.s];
    if (r.e.fisso || r.fond || sd.esercizi.length <= 3 || !consente(r, -r.e.sets, true, senzaEquilibrio)) return false;
    const att = typeof attributi === 'function' ? attributi(r.e.name) : null;
    if (att && att.soloAvvio) return false;   /* lo squat di avvio (Squat su Scatola, Sit-to-Stand) lo toglie la progressione, non il volume (M5) */
    const cat = categoria(r.e);
    if (cat) {   /* la seduta tiene gli schemi del suo tipo (SES-03) e la settimana tiene ogni schema (PAT-01) */
      const k = classeSeduta(cat, sd.tipo);
      if (SCHEMI_SEDUTA[sd.tipo] && SCHEMI_SEDUTA[sd.tipo].indexOf(k) !== -1 && !sd.esercizi.some(x => x !== r.e && categoria(x) && classeSeduta(categoria(x), sd.tipo) === k)) return false;
      if (!sedute.some(o => o.esercizi.some(x => x !== r.e && categoria(x) === cat))) return false;
      /* INT-2b (PAT-01, B15): la cerniera VERA (stacchi, good morning: schemaDi 'hinge') non lascia la settimana senza un altra cerniera vera; `categoria` conta come hinge anche la spinta d anca
         (grande gluteo), che per il collaudo non e una cerniera. Con la flessione del ginocchio in scheda il solutore toglieva lo stacco rumeno dal giorno di gambe e teneva l hip thrust */
      if (cat === 'hinge' && schemaDi(r.e.name) === 'hinge' && !sedute.some(o => o.esercizi.some(x => x !== r.e && schemaDi(x.name) === 'hinge'))) return false;
    }
    /* l unica flessione del ginocchio della settimana (leg curl, nordic) resta: i femorali hanno bisogno di una flessione (Maeo 2021, EQ-03) */
    if (/leg curl|nordic/i.test(senzaEmoji(r.e.name)) && !sedute.some(o => o.esercizi.some(x => x !== r.e && /leg curl|nordic/i.test(senzaEmoji(x.name))))) return false;
    /* una seduta di gambe (lower, legs, full body) tiene uno stacco o una flessione del ginocchio (SES-03, FRQ-01): non si toglie l unico */
    if (/lower|legs|fullbody/.test(sd.tipo || '') && femoraleSeduta(r.e) && !sd.esercizi.some(x => x !== r.e && femoraleSeduta(x))) return false;
    /* il muscolo che l esercizio allena in pieno (credito 1) non scende sotto il minimo della sua fascia per toglierlo (il core, i polpacci, i deltoidi posteriori restano coperti) */
    return senzaVolume || (guardiaVolume(r) && guardiaMis(r));
  };
  /* MIS-01: un muscolo che ha almeno 2 serie frazionarie non scende sotto 2 per togliere un esercizio */
  const guardiaMis = (r) => r.cr.every(c => W[c[0]] < 2 - 1e-9 || W[c[0]] - c[1] * r.e.sets >= 2 - 1e-9);
  const guardiaVolume = (r) => r.cr.every(c => c[1] < 1 || ((P[c[0]].minBanda <= 0 || W[c[0]] - r.e.sets >= P[c[0]].minBanda - 1e-9) && (P[c[0]].floorD <= 0 || D[c[0]] - r.e.sets >= P[c[0]].floorD - 1e-9)));
  /* un esercizio nuovo nella seduta s, con 2 serie: { r, ex } oppure null. La prescrizione (ripetizioni, pausa) e quella di sempre (prescriviSeduta) */
  const presCache = {};
  const provaNuovo = (s, x) => {
    const sd = sedute[s];
    if (sd.esercizi.some(e => e.name === x.name) || vietatiNuovi[s + '|' + x.name]) return null;
    if (sd.tipo === 'punti' && x.type === 'compound') return null;   /* il giorno dei punti deboli tiene l ordine di priorità: un multiarticolare in coda sarebbe dopo gli isolamenti (ORD-01, ORD-02) */
    if (usoSettimana(x.name) >= maxSettimana(x.name)) return null;
    if (typeof adattoAllaSeduta === 'function' && !adattoAllaSeduta(x, sd.tipo)) return null;
    if (strRidondante(x, sd.esercizi) || strSquatDoppio(x, sd.esercizi)) return null;
    const bers = bersaglioDi(x.name), stessi = sd.esercizi.filter(e => bersaglioDi(e.name) === bers && (findExercise(e.name) || {}).type === x.type && !isTimeBased(e.name)).length;
    if (bers && !isTimeBased(x.name) && stessi >= (((x.type === 'isolation' && (bers === 'bicipiti' || bers === 'tricipiti')) || (x.type === 'compound' && (bers === 'quadricipiti' || bers === 'grande_gluteo'))) ? 2 : 1)) return null;   /* RID-01 */
    if (x.group === 'core' && sd.esercizi.some(e => (findExercise(e.name) || {}).group === 'core')) return null;
    const k = s + '|' + x.name;
    if (!presCache[k]) presCache[k] = prescriviSeduta(brief, [{ name: x.name, weight: x.weight || 0 }], L.tipiGiorno[s])[0];
    const ex = Object.assign({}, presCache[k], { sets: 0 });
    delete ex.fisso; delete ex.protetto;   /* non protetto: se la seduta ha troppi esercizi (EXN-02) lo toglie la stessa regola degli altri */
    const r = nuovoRec(s, ex, false);
    r.sets0 = 2; r.min = 2; r.cap = Math.max(r.cap, 2);
    return { r: r, ex: ex, pieno: sd.esercizi.length >= maxEs };
  };

  /* ---- scelta delle mosse ---- */
  /* togliere una serie dove l utilità sale (oltre il massimo di un unità, oltre il tetto morbido di una seduta, squilibrio tra spinte e tirate) */
  const miglioreToglimento = (u0) => {
    let best = null;
    recs.forEach(r => {
      if (r.e.fisso || r.e.sets - 1 < r.min || !consente(r, -1)) return;
      muovi(r, -1);
      const du = utilita() - u0;
      muovi(r, 1);
      if (du > PS.soglia && (!best || du > best.du)) best = { tipo: 'serie', r: r, d: -1, du: du };
    });
    return best;
  };
  /* una o due serie di spinta e una di tirata insieme: da sole la tirata non si può togliere (ABB-04) e la spinta non cambia l utilità, ma insieme riportano la schiena sotto il suo massimo */
  const miglioreToglimentoCoppia = (u0) => {
    let best = null;
    if (SCHIENA <= limiteSchiena + 1e-9) return null;
    const tolgono = (r) => !r.e.fisso && r.e.sets - 1 >= r.min;
    const spinte = recs.filter(r => r.push), tirate = recs.filter(r => r.pull && r.sch > 0);
    spinte.forEach((a, ia) => {
      if (!tolgono(a) || !consente(a, -1)) return;
      muovi(a, -1);
      for (let ib = -1; ib < spinte.length; ib++) {   /* ib = -1: una sola spinta */
        const b = ib >= 0 ? spinte[ib] : null;
        if (b && (ib < ia || !tolgono(b) || !consente(b, -1))) continue;
        if (b) muovi(b, -1);
        tirate.forEach(c => {
          if (!tolgono(c) || !consente(c, -1)) return;
          muovi(c, -1);
          const du = utilita() - u0;
          muovi(c, 1);
          if (du > PS.soglia && (!best || du > best.du)) best = { tipo: 'coppia', rs: b ? [a, b] : [a], r2: c, du: du };
        });
        if (b) muovi(b, 1);
      }
      muovi(a, 1);
    });
    if (opz.senzaNuovi) return best;
    /* o un esercizio di spinta intero (quello che costa meno) e una serie di tirata */
    spinte.forEach(a => {
      if (!rimovibile(a)) return;
      const sets = a.e.sets;
      muovi(a, -sets);
      tirate.forEach(c => {
        if (!tolgono(c) || !consente(c, -1)) return;
        muovi(c, -1);
        const du = utilita() - u0;
        muovi(c, 1);
        if (du > PS.soglia && (!best || du > best.du)) best = { tipo: 'coppia', rs: [], intero: a, r2: c, du: du };
      });
      muovi(a, sets);
    });
    /* INT-2b (ABB-04 e VOL-02:schiena dei principianti): o un esercizio di TIRATA intero (il secondo della seduta: non l unico, SES-03) e una serie di spinta insieme: da sola la tirata non puo uscire
       perche le spinte la pareggiano appena (il collaudo EQ-01 vuole le tirate almeno al 90% delle spinte) e le spinte non possono scendere da sole senza fare peggio. Prima, con 5-6 tirate a settimana
       da 2 serie (la ricetta full body dei principianti) la schiena restava a 12 serie con massimo 10 */
    const squilibrioPrima = squilibrio();
    tirate.forEach(c => {
      if (!c.sch || !rimovibile(c, false, true)) return;   /* l equilibrio si giudica sotto, sulla mossa intera */
      const sets = c.e.sets;
      muovi(c, -sets);
      spinte.forEach(a => {
        if (!tolgono(a) || !consente(a, -1, false, true)) return;
        muovi(a, -1);
        const du = utilita() - u0, sq = squilibrio();
        muovi(a, 1);
        if (sq <= squilibrioPrima + 1e-9 && du > PS.soglia && (!best || du > best.du)) best = { tipo: 'coppia', rs: [a], intero: c, r2: null, du: du };
      });
      muovi(c, sets);
    });
    return best;
  };
  const miglioreEsercizioTolto = (u0) => {
    let best = null;
    recs.forEach(r => {
      if (!rimovibile(r)) return;
      const sets = r.e.sets;
      muovi(r, -sets);
      const du = utilita() - u0;
      muovi(r, sets);
      if (du > PS.sogliaScambio && (!best || du > best.du)) best = { tipo: 'esercizio', r: r, du: du };
    });
    return best;
  };
  /* aggiungere: una serie a un esercizio che c e, o un esercizio nuovo; vince il guadagno per minuto */
  const migliorAggiunta = (u0, soloUnita) => {
    let best = null;
    const prova = (az) => { if (!best || az.eff > best.eff) best = az; };
    recs.forEach(r => {
      if (r.bloccato || r.e.fisso || !consente(r, 1) || !tempoOk(r, 1)) return;
      if (soloUnita && !r.cr.some(c => c[0] === iU[soloUnita])) return;
      muovi(r, 1);
      const du = utilita() - u0;
      muovi(r, -1);
      if (du > PS.soglia) prova({ tipo: 'serie', r: r, d: 1, du: du, eff: du / r.tm });
    });
    if (opz.senzaNuovi || senzaCrescita) return best;
    /* esercizi nuovi: solo per le unità che ne hanno bisogno (sotto il bersaglio, sotto il pavimento di serie dirette o con poche sedute) */
    const bisogni = U.filter((u, i) => {
      if (soloUnita && u !== soloUnita) return false;
      return W[i] < P[i].target || (P[i].floorD > 0 && D[i] < P[i].floorD) || (freqU.indexOf(i) !== -1 && seduteChePesano(i) < Math.min(seduteMin, nS)) ||
        (dirU.indexOf(i) !== -1 && sedute.filter((sd, s) => SD[s][i] >= 1).length < Math.min(seduteMin, nS));
    }).sort((a, c) => (W[iU[a]] / (P[iU[a]].target || 1)) - (W[iU[c]] / (P[iU[c]].target || 1))).slice(0, 4);
    /* con la seduta già piena (8 esercizi, 6 per chi inizia) l esercizio nuovo prende il posto di quello che costa meno al volume */
    const donatori = {};
    const donatore = (s) => {
      if (donatori[s] !== undefined) return donatori[s];
      let mig = null;
      recs.forEach(r => { if (r.s !== s || !rimovibile(r)) return; const sets = r.e.sets; muovi(r, -sets); const du = utilita() - u0; muovi(r, sets); if (!mig || du > mig.du) mig = { r: r, du: du }; });
      return (donatori[s] = mig ? mig.r : null);
    };
    /* INT-2b (velocità): le serie da togliere agli altri esercizi per far posto in una seduta al limite dei minuti dipendono dallo stato della seduta (il donatore tolto, le serie già
       tolte), non dal candidato: la k-esima scelta è la stessa per ogni esercizio nuovo provato nella stessa seduta. Si calcola una volta e si allunga solo quando ne servono di più */
    const tolteDi = {};
    const prossimaTolta = (s, don, tolte) => {
      const tc = tolteDi[s] || (tolteDi[s] = { lista: [], finita: false });
      if (tolte.length < tc.lista.length) return tc.lista[tolte.length];
      if (tc.finita) return null;
      let mig = null;
      recs.forEach(r => {
        if (r.s !== s || r === don || r.e.fisso || r.e.sets - 1 < r.min || !consente(r, -1)) return;
        muovi(r, -1); const x = utilita() - u0; muovi(r, 1);
        if (!mig || x > mig.du) mig = { r: r, du: x };
      });
      if (!mig) { tc.finita = true; return null; }
      tc.lista.push(mig.r);
      return mig.r;
    };
    bisogni.forEach(u => {
      let provati = 0;
      candidatiNuovi(u).forEach(x => {
        if (provati >= 6) return;
        for (let s = 0; s < nS; s++) {
          const n = provaNuovo(s, x);
          if (!n) continue;
          provati++;
          const don = n.pieno ? donatore(s) : null;
          if (n.pieno && !don) continue;
          const dt = 2 * n.r.tm + 1 - (don ? don.e.sets * don.tm + 1 : 0);   /* due serie e un cambio di esercizio (un minuto), meno quelle dell esercizio tolto */
          const sets = don ? don.e.sets : 0;
          if (don) muovi(don, -sets);
          /* la seduta è al limite dei minuti: si fa posto togliendo qualche serie agli altri esercizi, dove costa meno (al massimo 4) */
          const tolte = [];
          let libero = minuti - (T[s] + dt);
          while (!senzaCrescita && libero < -1e-9 && tolte.length < 4) {
            const mig = prossimaTolta(s, don, tolte);
            if (!mig) break;
            muovi(mig, -1); tolte.push(mig); libero += mig.tm;
          }
          let du = -Infinity;
          if ((senzaCrescita || libero >= -1e-9) && consente(n.r, 2)) { n.r.e.sets = 0; muovi(n.r, 2); du = utilita() - u0; muovi(n.r, -2); }
          tolte.forEach(r => muovi(r, 1));
          if (don) muovi(don, sets);
          if (du > PS.soglia) prova({ tipo: 'nuovo', r: n.r, ex: n.ex, s: s, d: 2, du: du, eff: du / Math.max(dt, 1), unita: u, don: don, tolte: tolte });
        }
      });
    });
    return best;
  };
  /* scambio: una serie tolta a un esercizio e data a un altro (stessa seduta o no) se il tempo lo permette e l utilità sale */
  const migliorScambio = (u0) => {
    const don = [], ric = [];
    recs.forEach(r => {
      if (r.e.fisso) return;
      if (r.e.sets - 1 >= r.min && consente(r, -1)) { muovi(r, -1); don.push({ r: r, du: utilita() - u0 }); muovi(r, 1); }
      if (!r.bloccato && consente(r, 1)) { muovi(r, 1); ric.push({ r: r, du: utilita() - u0 }); muovi(r, -1); }
    });
    don.sort((a, c) => c.du - a.du); ric.sort((a, c) => c.du - a.du);
    let best = null;
    don.slice(0, 8).forEach(a => ric.slice(0, 8).forEach(c => {
      if (a.r === c.r) return;
      /* il tempo: la seduta del ricevente deve avere posto per una serie in più, al netto di quella tolta nella stessa seduta */
      const netto = c.r.tm - (a.r.s === c.r.s ? a.r.tm : 0);
      if (a.r.s === c.r.s ? (!senzaCrescita ? T[c.r.s] + netto > minuti + 1e-9 : T[c.r.s] + netto > T0[c.r.s] + 1e-9) : !tempoOk(c.r, 1)) return;
      muovi(a.r, -1);
      let du = -Infinity;
      if (consente(c.r, 1)) { muovi(c.r, 1); du = utilita() - u0; muovi(c.r, -1); }
      muovi(a.r, 1);
      if (du > PS.sogliaScambio && (!best || du > best.du)) best = { tipo: 'scambio', da: a.r, a: c.r, du: du };
    }));
    return best;
  };

  /* sostituzione: un esercizio tolto e le sue serie date (fino a 3) agli altri dove rendono di più: la composizione cambia dove un passo solo non basta (la schiena sopra il suo massimo
     con tutti gli esercizi già al minimo di serie, un unità sotto fascia che ha bisogno del posto di un altro). Si accetta solo se alla fine il muscolo dell esercizio tolto resta nella sua fascia */
  const migliorSostituzione = (u0) => {
    let best = null;
    recs.forEach(r => {
      if (!rimovibile(r, true)) return;
      const sets = r.e.sets, s0 = r.s, aggiunte = [], dT = {}, prima = r.cr.map(c => W[c[0]]);
      muovi(r, -sets);
      dT[s0] = -(sets * r.tm + 1);
      for (let k = 0; k < 3; k++) {
        let mig = null;
        recs.forEach(c => {
          if (c === r || c.bloccato || c.e.fisso || !consente(c, 1)) return;
          const tetto = senzaCrescita ? T0[c.s] : minuti;
          if (T[c.s] + (dT[c.s] || 0) + c.tm > tetto + 1e-9) return;
          muovi(c, 1); const x = utilita() - u0; muovi(c, -1);
          if (!mig || x > mig.du) mig = { r: c, du: x };
        });
        if (!mig) break;
        muovi(mig.r, 1); dT[mig.r.s] = (dT[mig.r.s] || 0) + mig.r.tm; aggiunte.push(mig.r);
      }
      const du = utilita() - u0, ok = guardiaVolume({ cr: r.cr, e: { sets: 0 } }) && r.cr.every((c, k) => W[c[0]] >= Math.min(prima[k], 2) - 1e-9);
      aggiunte.forEach(c => muovi(c, -1));
      muovi(r, sets);
      if (ok && aggiunte.length && du > PS.sogliaScambio && (!best || du > best.du)) best = { tipo: 'sostituzione', r: r, aggiunte: aggiunte.slice(), du: du };
    });
    return best;
  };

  /* applica una mossa controllando il tempo vero (durataSeduta); se non entra la annulla e blocca l esercizio */
  const applica = (az) => {
    if (az.tipo === 'esercizio') {
      const r = az.r, sd = sedute[r.s];
      muovi(r, -r.e.sets);
      sd.esercizi.splice(sd.esercizi.indexOf(r.e), 1);
      recs.splice(recs.indexOf(r), 1);
      T[r.s] = durataSeduta(sd.esercizi);
      (opz.tolti || []).push(r.e.name);
      return true;
    }
    if (az.tipo === 'sostituzione') {
      applica({ tipo: 'esercizio', r: az.r });
      az.aggiunte.forEach(c => { if (recs.indexOf(c) !== -1) applica({ tipo: 'serie', r: c, d: 1 }); });
      return true;
    }
    if (az.tipo === 'coppia') {
      az.rs.forEach(r => muovi(r, -1)); if (az.r2) muovi(az.r2, -1);
      if (az.intero) {
        const r = az.intero, sd = sedute[r.s];
        muovi(r, -r.e.sets);
        sd.esercizi.splice(sd.esercizi.indexOf(r.e), 1);
        recs.splice(recs.indexOf(r), 1);
        (opz.tolti || []).push(r.e.name);
        T[r.s] = durataSeduta(sd.esercizi);
      }
      az.rs.concat(az.r2 ? [az.r2] : []).forEach(r => { T[r.s] = durataSeduta(sedute[r.s].esercizi); });
      return true;
    }
    if (az.tipo === 'scambio') {
      muovi(az.da, -1); muovi(az.a, 1);
      const ss = az.da.s === az.a.s ? [az.a.s] : [az.da.s, az.a.s];
      const nuovi = ss.map(s => durataSeduta(sedute[s].esercizi));
      const ok = ss.every((s, k) => senzaCrescita ? nuovi[k] <= T0[s] + 1e-9 || nuovi[k] <= T[s] + 1e-9 : (nuovi[k] <= minuti + 1e-9 || nuovi[k] <= T[s] + 1e-9));
      if (!ok) { muovi(az.da, 1); muovi(az.a, -1); az.a.bloccato = true; return false; }
      ss.forEach((s, k) => { T[s] = nuovi[k]; });
      return true;
    }
    if (az.tipo === 'nuovo') {
      const sd = sedute[az.s];
      const don = az.don || null, donSets = don ? don.e.sets : 0, donPos = don ? sd.esercizi.indexOf(don.e) : -1, tolte = az.tolte || [];
      if (don) { muovi(don, -donSets); sd.esercizi.splice(donPos, 1); recs.splice(recs.indexOf(don), 1); }
      tolte.forEach(r => muovi(r, -1));
      sd.esercizi.push(az.ex);
      az.r.e.sets = 0; muovi(az.r, 2);
      const t = durataSeduta(sd.esercizi);
      if (!senzaCrescita && t > minuti + 1e-9) {   /* non entra: si rimette com era */
        muovi(az.r, -2); sd.esercizi.pop();
        tolte.forEach(r => muovi(r, 1));
        if (don) { sd.esercizi.splice(donPos, 0, don.e); recs.push(don); muovi(don, donSets); }
        vietatiNuovi[az.s + '|' + az.ex.name] = true; return false;
      }
      recs.push(az.r);
      T[az.s] = t;
      strOrdina(sd.esercizi, sd.tipo, prefs.priorita);
      if (sd.tipo === 'punti') sd.esercizi.sort((a, c) => ((findExercise(a.name) || {}).group === 'core') - ((findExercise(c.name) || {}).group === 'core'));   /* ABB-01: nei punti deboli il core resta in fondo */
      (opz.aggiunti || []).push({ nome: az.ex.name, unita: az.unita, al_posto_di: don ? don.e.name : null });
      return true;
    }
    const r = az.r;
    muovi(r, az.d);
    if (az.d > 0) {
      const t = durataSeduta(sedute[r.s].esercizi);
      if (t > (senzaCrescita ? T0[r.s] : minuti) + 1e-9 && t > T[r.s] + 1e-9) { muovi(r, -az.d); r.bloccato = true; return false; }
      T[r.s] = t;
    } else T[r.s] = durataSeduta(sedute[r.s].esercizi);
    return true;
  };

  /* soloUnita: solo aggiunte per quell unità e un passo solo (una serie o un esercizio nuovo da 2 serie): è aggiungiSerieUtile */
  const risolvi = (soloUnita) => {
    let aggiunte = 0;
    for (let giri = 0; giri < PS.giriMax; giri++) {
      const u0 = utilita();
      let az = soloUnita ? null : (miglioreToglimento(u0) || miglioreToglimentoCoppia(u0) || (opz.senzaNuovi ? null : miglioreEsercizioTolto(u0)));
      if (az) { if (applica(az)) continue; }
      az = migliorAggiunta(u0, soloUnita);
      if (az && applica(az)) { aggiunte += az.d; if (soloUnita) break; continue; }
      if (az) continue;   /* non e entrata: riprova senza di lei */
      if (soloUnita) break;
      az = migliorScambio(u0);
      if (az && applica(az)) continue;
      if (az) continue;
      az = opz.senzaNuovi ? null : migliorSostituzione(u0);
      if (az && applica(az)) continue;
      break;
    }
    return aggiunte;
  };

  /* ---- lo stato, per la verifica e le note ---- */
  /* le unità sotto la loro fascia che meritano una nota: le grandi e quelle con un pavimento di serie dirette (adduttori, abduttori e il resto non ne hanno) */
  const sotto = () => U.map((u, i) => ({ u: u, i: i, v: W[i], d: D[i], min: P[i].minBanda, floorD: P[i].floorD, target: P[i].target }))
    .filter(x => (VOLUME_UNITA_GRANDI.indexOf(x.u) !== -1 || x.floorD > 0) && ((x.min > 0 && x.v < x.min - 1e-9) || (x.floorD > 0 && x.d < x.floorD - 1e-9)));
  /* perché un unità non arriva: 'attrezzi' (nessun esercizio adatto), 'tetto' (le serie o gli esercizi di una seduta sono al limite), 'tempo' */
  const causa = (u) => {
    const iu = iU[u];
    if (!candidatiNuovi(u).length && !recs.some(r => r.cr.some(c => c[0] === iu))) return 'attrezzi';
    /* c è posto nei minuti ma una regola lo impedisce (serie per esercizio, per seduta, 48 ore, esercizi per seduta)? */
    const conPosto = recs.some(r => r.cr.some(c => c[0] === iu) && !r.e.fisso && T[r.s] + r.tm <= minuti + 1e-9) ||
      sedute.some((sd, s) => sd.esercizi.length >= maxEs && T[s] + 2 * 2.5 + 1 <= minuti);
    return conPosto ? 'tetto' : 'tempo';
  };
  const volumi = () => { const o = {}; U.forEach((u, i) => { o[u] = W[i]; }); return o; };
  return { risolvi: risolvi, sotto: sotto, causa: causa, volumi: volumi, W: W, D: D, S: S, SD: SD, T: T, P: P, iU: iU, minuti: minuti, recs: recs };
}

/* ---------------- le funzioni dei posti di W1-T4 ---------------- */

/* assegnaVolume(brief, sedute): le serie per unità a settimana. Vedi l intestazione; con IPE-01 spenta o con un metodo famoso resta l algoritmo di prima per gruppi */
function assegnaVolume(brief, sedute) {
  if (!volumeNuovoAttivo(brief) || !sedute.length) return assegnaVolumeGruppi(brief, sedute);
  const L = brief.lavoro, note = L.note;
  const aggiunti = [];
  /* con delle priorità si risolve prima il programma standard: la priorità vale «almeno una serie, +25% o +45%» rispetto a quello che il programma dà a quell unità (collaudo PRI-01) */
  const prioritarie = unitaPriorita(brief);
  if (prioritarie.length) {
    const m1 = volumeMotore(brief, sedute, bersagliVolume(brief, { senzaPriorita: true }), { aggiunti: aggiunti });
    m1.risolvi();
    L.volumeBase = m1.volumi();
  }
  const b = bersagliVolume(brief);
  L.volumeBersagli = b;
  L.specializza = b.specializza;
  brief.obiettivi.prioritaUnita = b.prioritarie.slice();
  if (b.esigenza >= 1.15) note.push('Coach esigente: volume verso la parte alta del range, un po’ più vicino al cedimento su macchine e isolamenti.');
  volumeMotore(brief, sedute, b, { aggiunti: aggiunti }).risolvi();
  aggiunti.filter(a => sedute.some(sd => sd.esercizi.some(e => e.name === a.nome))).forEach(a => note.push('Aggiunto: ' + senzaEmoji(a.nome) + ' — il muscolo restava sotto il volume minimo.'));   /* solo quelli rimasti nella scheda */
  return sedute;
}

/* INT-2b (ABB-04 e VOL-02): una serie in piu a una tirata (strBilancia) e ammessa solo se ogni unita che l esercizio allena (credito >= 0,5) resta dentro il suo massimo di B6 e la schiena (dorsali e
   spessore insieme) dentro il tetto di gruppo: altrimenti l equilibrio si rifa togliendo una serie a una spinta. Prima strBilancia alzava le tirate dei principianti oltre la fascia (collaudo VOL-02:schiena:
   i principianti di forza a corpo libero a 9 serie con massimo 8). Senza i bersagli (IPE-01 spenta, un metodo) ritorna sempre vero */
function puoSalireVolume(brief, sedute, e) {
  if (!volumeNuovoAttivo(brief)) return true;
  const b = (brief.lavoro && brief.lavoro.volumeBersagli) || bersagliVolume(brief), cr = creditiUnita(e.name), vol = contaVolume(sedute);
  const ok = Object.keys(cr).every(u => !(cr[u] >= 0.5) || !b.unita[u] || !vol[u] || vol[u].frazionarie + cr[u] <= b.unita[u].max + 1e-9);
  if (!ok) return false;
  const sch = Math.max(cr.dorsali || 0, cr.schiena_spessore || 0);
  if (!(sch > 0) || !b.gruppiLimite || !b.gruppiLimite.schiena) return true;
  const totale = sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, x) => { const c = creditiUnita(x.name); return a + x.sets * Math.max(c.dorsali || 0, c.schiena_spessore || 0); }, 0), 0);
  return totale + sch <= b.gruppiLimite.schiena.max + 1e-9;
}

/* le note del volume: le unità in priorità (specializzazione) e la frequenza scelta dall utente. Vanno dopo quelle di strBilancia (ABB-04) */
function noteVolume(brief) {
  const L = brief.lavoro, note = L.note, split = L.split, freqScelta = brief.agenda.freqScelta;
  const b = L.volumeBersagli;
  if (b && b.prioritarie.length) {
    const etichette = b.prioritarie.map(volumeEtichetta).join(', ');
    if (b.specializza) note.push('Specializzazione: ' + etichette + ' — +' + Math.round(sogliaVolume('priorita').aumento[brief.chi.livello === 'avanzato' ? 'avanzato' : 'intermedio'] * 100) + '% di serie, gli altri muscoli a mantenimento con gli stessi carichi.');
    else note.push('Priorità: ' + etichette + ' — qualche serie in più.');
    const scelti = ((brief.preferenze && brief.preferenze.priorita) || []).filter(g => VOLUME_PRIORITA_UNITA[g]);
    const unitaScelte = [].concat.apply([], scelti.map(g => VOLUME_PRIORITA_UNITA[g]));
    if (unitaScelte.some(u => b.prioritarie.indexOf(u) === -1) && scelti.length > 1) note.push('Al massimo due muscoli alla volta: gli altri restano al volume normale.');
  } else if (!b) {
    const prio = L.prefs.priorita;
    if (prio.length) note.push((L.specializza ? 'Specializzazione: ' : 'Priorita: ') + prio.map(g => MUSCLE_GROUPS[g] ? MUSCLE_GROUPS[g].label : g).join(', ') + (L.specializza ? ' — +50% serie, gli altri gruppi a mantenimento.' : ' — qualche serie in piu.'));
  }
  if (freqScelta) note.push(split.limite ? 'Con 2 giorni ogni muscolo si allena al massimo 2 volte a settimana.' :
    (split.freq === 1 ? 'Ogni muscolo una volta a settimana, come hai scelto: fino a 11 serie in una seduta, oltre si sprecano.' : 'Ogni muscolo ' + split.freq + ' volte a settimana, come hai scelto.'));
}

/* i tetti dopo la struttura: principianti, over 65 e minorenni mai piu di 3 serie per esercizio; poco sonno = una serie in meno sugli accessori dove il volume lo consente;
   poi un nuovo giro del solutore (strBilancia può aver spostato serie): nessun muscolo fuori dalla sua fascia (VOL-01, VOL-02) */
function limitaVolume(brief, sedute) {
  if (!volumeNuovoAttivo(brief) || !sedute.length) return limitaVolumeGruppi(brief, sedute);
  const chi = brief.chi, level = chi.livello, prefs = brief.lavoro.prefs;
  const b = brief.lavoro.volumeBersagli || bersagliVolume(brief);
  /* principianti e over 65: mai piu di 3 serie per esercizio */
  if (level === 'principiante' || chi.over65 || chi.minorenne) sedute.forEach(sd => sd.esercizi.forEach(e => { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); }));
  /* poco sonno o molto stress: una serie in meno sugli accessori (dopo il volume), solo dove le unità che l esercizio allena restano nella loro fascia */
  if (prefs.sonno === 'male') {
    const vol = () => contaVolume(sedute);
    sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
      if (i === 0 || e.fisso || e.sets <= 2) return;
      const cr = creditiUnita(e.name), v = vol();
      if (Object.keys(cr).every(u => v[u].frazionarie - cr[u] >= b.unita[u].min - 1e-9 && (b.unita[u].floorD <= 0 || v[u].dirette - (cr[u] === 1 ? 1 : 0) >= b.unita[u].floorD))) e.sets--;
    }));
  }
  volumeMotore(brief, sedute, b).risolvi();
  return sedute;
}

/* IPE-02: le serie sotto cui un taglio non deve scendere per un unità (serie frazionarie a settimana): il pavimento di serie dirette (per giorni, tabella B6) e per le grandi
   il mantenimento. 0 con IPE-01 spenta o un metodo famoso. Lo legge adattaAlTempo (W2-T2) prima di togliere serie o esercizi */
function pavimentoVolume(brief, unita) {
  if (!volumeNuovoAttivo(brief)) return 0;
  const b = (brief.lavoro && brief.lavoro.volumeBersagli) || bersagliVolume(brief), x = b.unita[unita];
  return x ? Math.max(x.floorD, x.mant) : 0;
}

/* aggiungiSerieUtile(brief, sedute, unita): una serie in più (o un esercizio nuovo da 2 serie nella seduta con più tempo) per l unità sotto fascia, dove costa meno tempo e dà
   meno «sbordo»; rispetta i tetti e i minuti dichiarati. Ritorna quante serie ha aggiunto (0 se non c è posto, niente se IPE-01 non agisce). La chiede il solutore, e adattaAlTempo (W2-T2)
   «solo finché un unità è sotto fascia» (D-P10) */
function aggiungiSerieUtile(brief, sedute, unita) {
  if (!volumeNuovoAttivo(brief) || !sedute.length || UNITA_VOLUME.indexOf(unita) === -1) return;
  const b = (brief.lavoro && brief.lavoro.volumeBersagli) || bersagliVolume(brief);
  const m = volumeMotore(brief, sedute, b, { aggiunti: [] });
  return m.risolvi(unita);
}

/* REG-02, verifica finale: rimette in ordine con le serie che ci sono (si scambiano, non si aggiungono minuti: il tempo lo ha già deciso adattaAlTempo) e scrive la nota con la CAUSA
   di ciò che non entra. Ritorna le note (testi) che verificaProgramma aggiunge al programma */
function validaVolume(brief, sedute) {
  if (!volumeNuovoAttivo(brief) || !sedute.length) return;
  const b = (brief.lavoro && brief.lavoro.volumeBersagli) || bersagliVolume(brief);
  const m = volumeMotore(brief, sedute, b, { senzaCrescita: true });
  m.risolvi();
  /* le note «Aggiunto: X» valgono per la scheda finale: se la verifica ha tolto X, la nota non c e piu */
  const noteL = brief.lavoro && brief.lavoro.note;
  if (Array.isArray(noteL)) for (let k = noteL.length - 1; k >= 0; k--) {
    const mm = /^Aggiunto: (.+?) — il muscolo restava sotto il volume minimo\.$/.exec(String(noteL[k]));
    if (mm && !sedute.some(sd => sd.esercizi.some(e => senzaEmoji(e.name) === mm[1]))) noteL.splice(k, 1);
  }
  const note = [];
  const mancano = m.sotto();
  /* INT-2b: validaTempo (W2-T2) dice «il lavoro utile per te e gia tutto qui» solo se nessuna unita e sotto fascia: con il volume per unita il verdetto e questo (le fasce B6 e i crediti degli attributi), non
     quello del conteggio per gruppo di adattaAlTempo (che vedeva i deltoidi posteriori sotto di mezza serie con tutte le unita nella fascia) */
  if (brief.lavoro) brief.lavoro.sottoFasciaUnita = mancano.map(x => x.u);
  const nTesto = (v) => { const r = Math.round(v * 2) / 2; return String(r).replace('.', ','); };
  const gruppi = {};
  const grande = (x) => VOLUME_UNITA_GRANDI.indexOf(x.u) !== -1 ? 0 : 1;
  mancano.sort((a, c) => (grande(a) - grande(c)) || ((c.min - c.v) / Math.max(1, c.min) - (a.min - a.v) / Math.max(1, a.min))).forEach(x => {   /* prima le unità grandi; tutte quelle sotto fascia hanno la loro nota (100% con la causa) */
    const dirette = x.floorD > 0 && x.d < x.floorD - 1e-9 && !(x.v < x.min - 1e-9);
    (gruppi[m.causa(x.u)] = gruppi[m.causa(x.u)] || []).push(volumeEtichetta(x.u) + ' ' + nTesto(dirette ? x.d : x.v) + ' serie');
  });
  const minutiDichiarati = brief.agenda.minuti;
  if (gruppi.tempo) note.push(gruppi.tempo.join(', ') + ': con ' + minutiDichiarati + ' minuti non entra di più');
  if (gruppi.tetto) note.push(gruppi.tetto.join(', ') + ': i limiti di serie e di esercizi per seduta non lasciano altro posto');
  if (gruppi.attrezzi) note.push(gruppi.attrezzi.join(', ') + ': con i tuoi attrezzi o i tuoi fastidi non c’è un esercizio adatto');
  const grandi = VOLUME_UNITA_GENERALE.some(u => m.W[m.iU[u]] < 4 - 1e-9 && b.unita[u].minBanda >= 4);
  if (grandi) note.push('Con questi minuti è un programma di mantenimento: per crescere servono più sedute o sedute più lunghe.');
  return note;
}

/* ============================================================
   IL VOLUME PER GRUPPI DI PRIMA (IPE-01 spenta, un metodo famoso o senza il file delle soglie)
   ============================================================ */
/* VOL-02 (ponte di W0-T2; il motore del volume per muscolo e di W2-T1): il volume per gruppo del generatore conta le sinergie per GRUPPO (la spalla vale mezza serie
   per il petto) e non per muscolo, e con piu esercizi per seduta supera il massimo di qualche muscolo (glutei, schiena). Qui, per ogni muscolo sopra il suo massimo
   settimanale, si toglie una serie alla volta all esercizio che lo carica di piu (minimo 2 serie, mai un posto fisso, mai se un altro muscolo che quell esercizio
   allena scenderebbe sotto il suo minimo). Una serie alla volta, al massimo 12 giri. */
function limitaVolumePerMuscolo(sedute, c) {
  for (let giri = 0; giri < 12; giri++) {
    const sett = frazionarieSettimana(sedute);
    const sopra = Object.keys(sett).filter(g => sett[g] > c.volumeMax[GRUPPI_FRAZIONARI[g].classe]).sort((a, b) => (sett[b] - c.volumeMax[GRUPPI_FRAZIONARI[b].classe]) - (sett[a] - c.volumeMax[GRUPPI_FRAZIONARI[a].classe]));
    if (!sopra.length) return;
    const g = sopra[0];
    /* revisione dell onda 0 (M4): il fondamentale della seduta (il primo multiarticolare) si taglia per ultimo e non scende sotto 3 serie (Front Squat 2x5 nel giorno di forza,
       Military 2x3: il lavoro pesante e quello che conta); si toglie dagli altri esercizi, quello che porta piu serie al muscolo */
    const fondamentale = (e) => sedute.some(sd => sd.esercizi.find(x => (findExercise(x.name) || {}).type === 'compound' && !isTimeBased(x.name)) === e);
    const cand = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => e.sets > 2 && !e.fisso && !isTimeBased(e.name) && creditoSerie(e.name)[g] && !(fondamentale(e) && e.sets <= 3)).map(e => e)))
      .filter(e => { const cr = creditoSerie(e.name); return Object.keys(cr).every(h => h === g || (sett[h] || 0) - cr[h] >= c.volumeMin[GRUPPI_FRAZIONARI[h].classe]); })
      .sort((a, b) => (fondamentale(a) - fondamentale(b)) || (creditoSerie(b.name)[g] * b.sets - creditoSerie(a.name)[g] * a.sets))[0];
    if (!cand) return;
    /* ABB-04: le tirate non meno del 90% delle spinte. Se la serie tolta e di una tirata e rompe il rapporto, se ne toglie una anche a una spinta (collaudo EQ-01) */
    if (strEtirata(cand)) {
      const tir = strSerie(sedute, strEtirata) - 1, spi = strSerie(sedute, strEspinta);
      if (tir + spi >= STR_PESI.minSerieBilancio && tir < spi * STR_PESI.tirateSuSpinte) {
        const giu = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => strEspinta(e) && e.sets > 2 && !e.fisso))).sort((a, b) => b.sets - a.sets)[0];
        if (giu) giu.sets--;
      }
    }
    cand.sets--;
  }
}

/* assegnaVolumeGruppi(brief, sedute): le serie per gruppo a settimana (il blocco di prima di W2-T1). Parte dal range del livello (salute 6-12), lo corregge col corpo (massa magra bassa = piu volume;
   in calo = meno) e con l esigenza del coach (+20% all inizio, mai oltre il massimo del livello), dà il +20% (+50% per gli avanzati che specializzano)
   ai gruppi in priorita, porta ogni gruppo dentro il suo range e infine toglie le serie oltre il tetto di una seduta (COACH_PARAMETRI.serieMaxMuscoloSeduta).
   Conteggio frazionario: 1 per il muscolo principale, 0,5 per quelli che aiutano (Pelland 2025). */
function assegnaVolumeGruppi(brief, sedute) {
  const goals = brief.obiettivi.lista, level = brief.chi.livello, fis = brief.corpo.fis, L = brief.lavoro, note = L.note, prefs = L.prefs;
  /* volume per muscolo: partenza per livello, tetto di 11 serie per seduta */
  let [vMin, vMax] = goals[0] === 'salute' ? [6, 12] : (VOLUME_LIVELLO[level] || VOLUME_LIVELLO.intermedio);
  /* fattore fisico: massa magra bassa = piu volume; in calo = meno */
  if (fis.ffmiBasso && goals[0] !== 'dimagrimento') { vMin = Math.round(vMin * COACH_PARAMETRI.fattoreVolumeFfmiBasso); vMax = Math.round(vMax * COACH_PARAMETRI.fattoreVolumeFfmiBasso); }
  if (fis.magraInCalo) { vMin = Math.round(vMin * 0.85); vMax = Math.round(vMax * 0.85); }
  /* esigenza del coach: +20% all inizio, poi segue l andamento (mai oltre il massimo del livello) */
  const esig = brief.mente.esigenza;
  if (esig > 1) { vMin = Math.min(vMax, Math.round(vMin * esig)); if (esig >= 1.15) note.push('Coach esigente: volume verso la parte alta del range, un po’ più vicino al cedimento su macchine e isolamenti.'); }
  else if (esig < 1) { vMin = Math.round(vMin * esig); vMax = Math.round(vMax * esig); }
  /* conteggio frazionario: 1 per il muscolo principale, 0,5 per quelli che aiutano (Pelland 2025) */
  const perGruppo = (g) => sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => {
    const m = findExercise(e.name); if (!m) return a;
    if (m.group === g) return a + e.sets;
    if (m.type === 'compound' && (MUSCLE_GROUPS[m.group].synergists || []).indexOf(g) !== -1) return a + e.sets * 0.5;
    return a;
  }, 0), 0);
  const prio = prefs.priorita;
  const specializza = level === 'avanzato' && prio.length && goals[0] !== 'dimagrimento';
  L.specializza = specializza;
  GRUPPI_PRINCIPALI.forEach(g => {
    const es = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => (findExercise(e.name) || {}).group === g && !isTimeBased(e.name))));
    if (!es.length) return;
    let min = vMin, max = vMax;
    if (prio.indexOf(g) !== -1) { min = Math.round(vMin * (specializza ? 1.5 : 1.2)); max = Math.round(vMax * (specializza ? 1.5 : 1.2)); }
    else if (specializza) { min = 6; max = vMin; }
    let giri = 0;
    while (perGruppo(g) < min && giri++ < 20) { const e = es.filter(x => !x.fisso).sort((a, b) => a.sets - b.sets)[0]; if (!e || e.sets >= 5) break; e.sets++; }
    giri = 0;
    while (perGruppo(g) > max && giri++ < 20) {
      const e = es.filter(x => !x.fisso && ((findExercise(x.name) || {}).type !== 'compound' || es.every(y => (findExercise(y.name) || {}).type === 'compound'))).sort((a, b) => b.sets - a.sets)[0];
      if (!e || e.sets <= 2) break; e.sets--;
    }
  });
  sedute.forEach(sd => {
    const conta = {};
    sd.esercizi.forEach(e => { const g = (findExercise(e.name) || {}).group; if (g) conta[g] = (conta[g] || 0) + e.sets; });
    Object.keys(conta).forEach(g => {
      let giri = 0;
      while (conta[g] > COACH_PARAMETRI.serieMaxMuscoloSeduta && giri++ < 20) {
        const e = sd.esercizi.filter(x => (findExercise(x.name) || {}).group === g && x.sets > 2 && !x.fisso).sort((a, b) => b.sets - a.sets)[0];
        if (!e) break; e.sets--; conta[g]--;
      }
    });
  });
  return sedute;
}

/* i tetti dopo la struttura di prima: principianti, over 65 e minorenni mai piu di 3 serie per esercizio; poco sonno o molto stress = una serie in meno sugli accessori (dopo il volume);
   nessun muscolo sopra il suo massimo settimanale (limitaVolumePerMuscolo, VOL-02) */
function limitaVolumeGruppi(brief, sedute) {
  const chi = brief.chi, level = chi.livello, goals = brief.obiettivi.lista, prefs = brief.lavoro.prefs, metodoAttivo = brief.metodo.attivo;
  /* principianti e over 65: mai piu di 3 serie per esercizio */
  if (level === 'principiante' || chi.over65 || chi.minorenne) sedute.forEach(sd => sd.esercizi.forEach(e => { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); }));
  /* poco sonno o molto stress: una serie in meno sugli accessori (dopo il volume) */
  if (prefs.sonno === 'male') sedute.forEach(sd => sd.esercizi.forEach((e, i) => { if (i > 0 && !e.fisso) e.sets = Math.max(2, e.sets - 1); }));
  if (!metodoAttivo) limitaVolumePerMuscolo(sedute, { volumeMax: PARAM_TEMPO.volumeMax[tipoObiettivoDi(goals)][level], volumeMin: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level] });
  return sedute;
}
