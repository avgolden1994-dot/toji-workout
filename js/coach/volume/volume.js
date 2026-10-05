/* Volume per muscolo: conteggio delle serie, volume della settimana e tetti (VOL-01, VOL-02, SES-01, REC-01, ESI-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VOLUME (piano coach v2, B.3 stadio 9; W1-T4)
   Il volume è il lavoro della settimana: quante serie per muscolo. Qui sta il conteggio frazionario (1 serie per il bersaglio, 0,5 per i secondari:
   Pelland 2025; creditoSerie, frazionarieSettimana), le 48 ore tra due sedute dello stesso muscolo e il tetto per seduta (recuperoOk, REC-01 e SES-01),
   assegnaVolume (le serie per gruppo dal livello, dal corpo e dall'esigenza del coach: il blocco "volume per muscolo" di prima) e limitaVolume
   (i tetti dopo la struttura: chi inizia, poco sonno, massimo per muscolo). Sono le regole di prima, spostate da ricette.js e da buildProgram
   senza cambiarne l'esito: le riscrive W2-T1 (volume per muscolo con la tabella B6 e le unità fini di attributi-esercizi.js).
   pavimentoVolume, aggiungiSerieUtile e validaVolume sono i posti dove W2-T1 mette il pavimento di serie dirette, l'aggiunta di una serie utile e
   il controllo finale (REG-02): oggi non fanno niente (pavimento 0).
   ============================================================ */

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
  const det = dettaglioEsercizio(nome), out = {};
  if (!det) return out;
  let sec = det.secondari.filter(m => FRAZIONARI_NON_CONTATI.indexOf(m) === -1);
  if (schemaDi(nome) === 'squat') sec = sec.filter(m => m !== 'femorali');
  sec.forEach(m => { const g = gruppoFrazionario(m); if (g) out[g] = Math.max(out[g] || 0, 0.5); });
  const gb = det.bersaglio ? gruppoFrazionario(det.bersaglio) : null;
  if (gb) out[gb] = 1;
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
function recuperoOk(sd, sedute, nome, sets) {
  const cr = creditoSerie(nome);
  return Object.keys(cr).every(g => {
    const dopo = frazGruppoSeduta(sd, g) + cr[g] * sets;
    if (dopo > COACH_PARAMETRI.serieMaxMuscoloSeduta) return false;   /* SES-01 */
    if (GRUPPI_RECUPERO.indexOf(g) === -1 || dopo < PARAM_TEMPO.serieMinRecupero) return true;
    return !sedute.some(o => o !== sd && giornoSeduta(o) >= 0 && Math.abs(giornoSeduta(o) - giornoSeduta(sd)) === 1 && frazGruppoSeduta(o, g) >= PARAM_TEMPO.serieMinRecupero);   /* REC-01 */
  });
}
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

/* assegnaVolume(brief, sedute): le serie per gruppo a settimana. Parte dal range del livello (salute 6-12), lo corregge col corpo (massa magra bassa = piu volume;
   in calo = meno) e con l esigenza del coach (+20% all inizio, mai oltre il massimo del livello), dà il +20% (+50% per gli avanzati che specializzano)
   ai gruppi in priorita, porta ogni gruppo dentro il suo range e infine toglie le serie oltre il tetto di una seduta (COACH_PARAMETRI.serieMaxMuscoloSeduta).
   Conteggio frazionario: 1 per il muscolo principale, 0,5 per quelli che aiutano (Pelland 2025). */
function assegnaVolume(brief, sedute) {
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

/* le note del volume: i muscoli in priorita (specializzazione per gli avanzati) e la frequenza scelta dall utente. Vanno dopo quelle di strBilancia (ABB-04) */
function noteVolume(brief) {
  const L = brief.lavoro, note = L.note, prio = L.prefs.priorita, split = L.split, freqScelta = brief.agenda.freqScelta;
  if (prio.length) note.push((L.specializza ? 'Specializzazione: ' : 'Priorita: ') + prio.map(g => MUSCLE_GROUPS[g] ? MUSCLE_GROUPS[g].label : g).join(', ') + (L.specializza ? ' — +50% serie, gli altri gruppi a mantenimento.' : ' — qualche serie in piu.'));
  if (freqScelta) note.push(split.limite ? 'Con 2 giorni ogni muscolo si allena al massimo 2 volte a settimana.' :
    (split.freq === 1 ? 'Ogni muscolo una volta a settimana, come hai scelto: fino a 11 serie in una seduta, oltre si sprecano.' : 'Ogni muscolo ' + split.freq + ' volte a settimana, come hai scelto.'));
}

/* i tetti dopo la struttura: principianti, over 65 e minorenni mai piu di 3 serie per esercizio; poco sonno o molto stress = una serie in meno sugli accessori;
   nessun muscolo sopra il suo massimo settimanale (limitaVolumePerMuscolo, VOL-02) */
function limitaVolume(brief, sedute) {
  const chi = brief.chi, level = chi.livello, goals = brief.obiettivi.lista, prefs = brief.lavoro.prefs, metodoAttivo = brief.metodo.attivo;
  /* principianti e over 65: mai piu di 3 serie per esercizio */
  if (level === 'principiante' || chi.over65 || chi.minorenne) sedute.forEach(sd => sd.esercizi.forEach(e => { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); }));
  /* poco sonno o molto stress: una serie in meno sugli accessori (dopo il volume) */
  if (prefs.sonno === 'male') sedute.forEach(sd => sd.esercizi.forEach((e, i) => { if (i > 0 && !e.fisso) e.sets = Math.max(2, e.sets - 1); }));
  if (!metodoAttivo) limitaVolumePerMuscolo(sedute, { volumeMax: PARAM_TEMPO.volumeMax[tipoObiettivoDi(goals)][level], volumeMin: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level] });
  return sedute;
}

/* i posti di W2-T1 (IPE-02, REG-02): il pavimento di serie dirette per unita, una serie in piu dove serve, il controllo finale. Oggi: pavimento 0 e nessuna azione. */
function pavimentoVolume(brief, unita) { return 0; }
function aggiungiSerieUtile(brief, sedute, unita) { /* niente: lo riscrive W2-T1 */ }
function validaVolume(brief, sedute) { /* niente: lo riscrive W2-T1 (REG-02: ciò che non si ripara diventa una nota con la causa) */ }
