/* Coach 2: regole nuove dalla ricerca
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH 2 — regole nuove dalla ricerca (progetto: claude/ricerca-coach.md)
   - RIR bersaglio per tipo di esercizio (Robinson 2024, pratica RP):
     bilanciere pesante 1-3, multiarticolare a macchina 0-2, isolamento 0-1.
     Con il PAR-Q positivo (modalita prudente) sempre 3-4.
   - Autoregolazione da RPE (Helms 2018): +-2% di carico per ogni mezzo
     punto di scarto dal bersaglio.
   - Micro-incrementi: se il salto disponibile supera il 5% del carico,
     prima una ripetizione in piu, poi il peso.
   - Principiante: due volte mancato = -5% (Starting Strength), gli
     altri -10%.
   - Rientro dopo una pausa (detraining, SBS): 10-20 giorni -10%, fino a
     4 settimane -20%, fino a 3 mesi -30%, oltre -50%. I giorni sono quelli veri
     per tutti (onda 0: per gli over 65 si contavano doppi e 5 giorni davano gia
     «Rientro dopo 5 giorni: -10%»; l eta resta protetta dal RIR 3-4, dagli aumenti
     dimezzati e dalla ripresa al 95%).
   - Scarico mirato (Dr. Muscle): massimale stimato in calo per due
     sedute di fila su un esercizio = -10% e meta serie solo li.
   Onda 0 del coach v2 (W0-T4, docs/piano-coach-v2.md E.1):
   - MES-02 (ponte) RIR di partenza per livello: principiante 3-4 nelle prime due settimane e poi 2-3, mai 0;
     intermedio e avanzato almeno 2 nella prima settimana del blocco e almeno 1 sui pesanti col bilanciere (anche con rirSett).
   - MES-06 carico di riferimento nello scarico (W0-T3 + W0-T4, una sola implementazione, qui in caricoProssimoBase): la stessa dose
     su un carico fisso (caricoRiferimento, progressivo.js), uguale in tutte le sedute della settimana; la prima seduta dopo uno scarico
     riuscito riparte da li (95% in prudenza, al massimo +25% sull ultima seduta) con un RIR in piu (testoRir); se lo scarico e mancato
     il carico resta com e. Prima i carichi si componevano (60, 54, 48,5 kg). Lo scarico deciso dal coach (CAR-10) e in dolore-mattina.js.
   - MES-10 lo scarico fuori dalle analisi (inScarico): il massimale in calo (CAR-08) non lo conta e vuole il 3% (il rumore del RIR).
   - CAR-06 (ETA-18) aumenti dimezzati anche dopo i 65 anni, come dice il capitolo 14 della mappa.
   - CAR-07 (PCO-01, riga del principiante) lo schema 5x3 solo con obiettivo forza; altrimenti stesso peso, 30 secondi in piu, poi -5%.
   - CAR-14 (B10, ponte) la taratura del RIR non impara piu dal confronto tra serie diverse: ogni taratura dimezza la correzione
     appresa (rirBias) e non si fa a principianti, minori, over 65, modalita prudente e sul core.
   ============================================================ */
/* tecniche speciali che il coach assegna (quando e perche: vedi Opzioni > Il coach) */
const TECNICHE = {
  drop: 'Drop set sull ultima serie: arrivato vicino al cedimento togli il 20% e continua, due volte',
  cluster: 'Cluster: 30 secondi di pausa ogni 2 ripetizioni, meno fatica per le articolazioni',
  potenza: 'Potenza: salita veloce con un carico leggero (40-60%), discesa controllata',
  amrap: 'Ultima serie AMRAP: fai piu ripetizioni possibili con buona tecnica',
  backoff: 'Back-off: dopo la serie piu pesante, le altre a -5%',
  parziali: 'A fine serie qualche ripetizione parziale nella parte allungata',
  calibrazione: 'Calibrazione: ultima serie fino al cedimento, il coach impara quanto stimi le ripetizioni in riserva',
  /* tecniche dell epoca d oro (TEC-01..05): le assegnano solo i metodi che le prevedono */
  piramide: 'Piramide: serie dopo serie il carico sale e le ripetizioni scendono (per esempio 12, 10, 8, 6), come faceva Arnold',
  negativa: 'Negative: nell’ultima serie scendi in 4-5 secondi (serve un compagno che ti aiuti a salire): il sovraccarico in discesa dà un piccolo vantaggio sulla massa',
  forzate: 'Ripetizioni forzate: al cedimento un compagno ti aiuta per 1-2 ripetizioni, solo su panca o macchine',
  riposopausa: 'Riposo-pausa: al cedimento 15 secondi di pausa e ancora qualche ripetizione, per due volte',
  picco: 'Contrazione di picco: in cima a ogni ripetizione fermati 2 secondi stringendo il muscolo',
  ottoperotto: 'Gironda 8×8: otto serie da otto con 30 secondi di pausa, con circa il 70% del carico delle 8 ripetizioni'
};
function profiloCoach() {
  const p = getProfile() || {};
  return { livello: p.level || 'intermedio', eta: Number(p.age) || 0, prudente: !!p.parq,
           sonnoMale: !!(p.prefs && p.prefs.sonno === 'male') };
}
const BIL_PESANTI = /Squat con Bilanciere|Front Squat|Stacco|Panca Piana Bilanciere|Panca Inclinata Bilanciere|Panca Declinata|Military Press|Rematore con Bilanciere|T-Bar Row|Good Morning/;
function tipoCarico(nome) {
  const m = findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '');
  if (!m || m.type !== 'compound') return 'isolamento';
  return BIL_PESANTI.test(senzaEmoji(nome)) ? 'pesante' : 'macchina';
}
const RIR_TIPO = { pesante: [1, 3], macchina: [0, 2], isolamento: [0, 1] };
/* MES-02 (ponte dell onda 0): una tabella sola per il RIR di partenza (registro B5; collaudo RIR-02 e RIR-03). Principiante: 3-4
   ripetizioni in riserva nelle prime due settimane e 2-3 dopo, mai 0 (le stime del RIR sbagliano di circa una ripetizione: Halperin
   2022). Intermedio e avanzato: almeno 2 nella prima settimana del blocco, su ogni tipo di esercizio, e almeno 1 sui fondamentali
   pesanti col bilanciere anche con la rampa dell avanzato (rirSett). Convenzione + Moderata; la tabella completa e di W2-T4. */
const MES_RIR = { principianteInizio: [3, 4], principianteDopo: [2, 3], principianteSettimaneInizio: 2, pisoPrimaSettimana: 2, pisoPesante: 1 };
/* prima settimana di un blocco (1, 1 + blocco, ...); senza programma o senza la durata del blocco conta solo la settimana 1 */
function primaSettimanaBlocco(p, numero) {
  if (!(numero >= 1)) return false;
  return numero === 1 || !!(p && p.blocco > 0 && (numero - 1) % p.blocco === 0);
}
function inDeficitCalorico() {
  const p = getProfile() || {};
  const goals = p.goals || (p.goal ? [p.goal] : []);
  return (p.fase || (goals[0] === 'dimagrimento' ? 'deficit' : '')) === 'deficit';
}
/* PRN-01 / MES-02: il -1 RIR dell esigenza (>= 1,15) non porta mai sotto il pavimento del livello: ai principianti e in dimagrimento
   non si applica (99 = non si tocca), nella prima settimana del blocco non scende sotto 2 */
function pisoRirEsigenza(sett) {
  if (!regolaAttiva('MES-02')) return 0;
  if (inDeficitCalorico() || profiloCoach().livello === 'principiante') return 99;
  const n = sett || (settimanaProgramma() || {}).numero || 0;
  return primaSettimanaBlocco(getProgramma(), n) ? MES_RIR.pisoPrimaSettimana : 0;
}
/* sett = numero di settimana del programma (1..N): serve a rifare il bersaglio di una seduta passata (MES-11); senza, quella di oggi */
function rirBersaglio(nome, sett) {
  const r = rirBersaglioBase(nome, sett);
  /* chi si ferma alla prima fatica si allena lontano dal cedimento (PRETIE-Q): stessa crescita fino a 3-4 RIR */
  let piu = psicoCoach((getProfile() || {}).psico).intensita === 'bassa' ? 1 : 0;
  const mo = momentoAttivo();
  if (mo && !mo.scaduto) piu += mo.rir || 0;
  if (typeof rirExtraIntensita === 'function') piu += rirExtraIntensita(nome);   /* INT-03/04: BIA con bandiere di prudenza, prima volta con l esercizio */
  let out = piu ? [Math.min(4, r[0] + piu), Math.min(5, r[1] + piu)] : r.slice();
  if (!piu && esigenzaCoach() >= 1.15 && tipoCarico(nome) !== 'pesante') {
    const a = Math.max(0, out[0] - 1);
    if (a >= pisoRirEsigenza(sett)) out = [a, Math.max(a, out[1] - 1)];
  }
  if (!stabile(nome) && out[0] < 1) out = [1, Math.max(2, out[1])];
  return out;
}
function rirBersaglioBase(nome, sett) {
  const pc = profiloCoach();
  if (pc.prudente || pc.eta >= 65) return [3, 4];
  const p = getProgramma(), numero = sett || ((p && settimanaProgramma()) || {}).numero || 0;
  const nuova = regolaAttiva('MES-02'), tipo = tipoCarico(nome);
  /* principiante: 3-4 nelle prime due settimane, poi 2-3, mai 0 (MES-02, PRN-01) */
  if (nuova && pc.livello === 'principiante') return (numero >= 1 && numero <= MES_RIR.principianteSettimaneInizio ? MES_RIR.principianteInizio : MES_RIR.principianteDopo).slice();
  /* avanzati: RIR che scende nelle settimane del blocco (RP) */
  let r = RIR_TIPO[tipo];
  if (p && p.rirSett && numero >= 1 && numero <= p.rirSett.length) { const x = p.rirSett[numero - 1]; r = [x, x + 1]; }
  if (!nuova) return r;
  r = r.slice();
  if (tipo === 'pesante' && r[0] < MES_RIR.pisoPesante) r = [MES_RIR.pisoPesante, Math.max(r[1], MES_RIR.pisoPesante + 1)];
  if (primaSettimanaBlocco(p, numero) && r[0] < MES_RIR.pisoPrimaSettimana) r = [MES_RIR.pisoPrimaSettimana, Math.max(r[1], MES_RIR.pisoPrimaSettimana + 1)];
  return r;
}
/* MES-08: con le risposte 3/6/8/10 (Facile, Giusta, Dura, Al limite) la fatica e «alta» solo se la media delle ultime sedute e quasi sempre «Al limite» (9,5; era 9: bastava
   una Dura in piu); Convenzione (ricerca-mesocicli-periodizzazione-scarichi.md, MES-08) */
const SOGLIA_SRPE_ALTA = 9.5;
/* scarico dosato sul bisogno (Bell 2024): poca, media o molta fatica */
function livelloFatica() {
  const hist = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, 3);
  const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
  if (!hist.length && !pr.length) return 'media';
  /* la scala dell sRPE e 3/6/8/10 (W0-T5, MES-08); le risposte salvate prima dell onda 0 erano 4/7/9/10 e si portano sulla scala nuova (il 9 conta come 8: registro B9) */
  const sulla3_6_8 = (v) => ({ 4: 3, 7: 6, 9: 8 })[v] || v;
  const srpe = hist.length ? hist.reduce((t, h) => t + (sulla3_6_8(h.feedback.srpe) || 6), 0) / hist.length : 6;
  const pz = pr.length ? pr.reduce((t, x) => t + x, 0) / pr.length : 70;
  if (srpe >= SOGLIA_SRPE_ALTA || pz < 50) return 'alta';
  if (srpe < 7 && pz >= 70) return 'bassa';
  return 'media';
}
const DOSE_SCARICO = { bassa: { serie: 0.65, carico: 0.95, t: 'volume -35%' }, media: { serie: 0.5, carico: 0.9, t: 'volume -50% e carico -10%' }, alta: { serie: 0.3, carico: 0.9, t: 'volume -70% e carico -10%' } };
function storicoProntezza() { try { return JSON.parse(localStorage.getItem('coach_plus_prontezza_storia_' + currentMode) || '[]'); } catch (e) { return []; } }
function rpeBersaglio(nome, sett) { const r = rirBersaglio(nome, sett); return 10 - (r[0] + r[1]) / 2; }
/* il RIR di oggi in una frase; dopo uno scarico (MES-06) dice che e una ripetizione in piu: lo stesso rirBersaglio (ripresaDopoScarico) lo alza di uno */
function testoRir(nome) {
  const r = rirBersaglio(nome);
  if (r[1] === 1 && r[0] === 0) return 'fino a 0–1 ripetizioni in riserva';
  return 'lascia ' + r[0] + '–' + r[1] + ' ripetizioni in riserva' + (ripresaDopoScarico(nome) ? ', una in più dopo lo scarico' : '');
}
/* massimale stimato (Epley) solo da serie fino a 12 ripetizioni */
function e1rmSerie(x) { const w = Number(x.weight) || 0, r = Number(x.reps) || 0; if (!w || !r || r > 12) return 0; return w * (1 + r / 30); }
function e1rmSeduta(ex) { const v = (ex.sets || []).filter(x => x.done).map(e1rmSerie); return v.length ? Math.max.apply(null, v) : 0; }
/* B11 / MES-10: una seduta fatta in una settimana di scarico (o un esercizio scaricato dal coach) non e un dato di forma e non conta nelle
   analisi (esigenza, esercizi fermi, verdetto del ciclo, carico mirato). La fase e scritta nella seduta dall onda 0 (settimana.fase e
   obiettivo.coachTipo, MES-09); per le sedute piu vecchie si ricostruisce dalle fasi del programma attuale e dalla data: se il programma
   di allora non c e piu, la seduta conta come di carico. */
const PARAM_ANALISI = {
  rumoreE1rm: 0.03,           /* MES-10/MES-12: sotto il 3% una differenza di massimale non si distingue dall errore di stima del RIR (circa 1 ripetizione, Epley) */
  giorniDopoScarico: 14,      /* MES-10: nessun nuovo scarico del coach entro due settimane dall ultimo */
  prontezzaRipresa: 60,       /* MES-06: ripresa dopo lo scarico al 95% se la prontezza media degli ultimi giorni e sotto questa soglia */
  ripresaPrudente: 0.95,      /* MES-06: ... e per prudenti, over 65 e sonno scarso (il riferimento vale 28 giorni: GIORNI_CARICO_RIFERIMENTO, progressivo.js) */
  saltoMaxRipresa: 1.25       /* MES-06: la ripresa non sale di piu del 25% rispetto all ultima seduta (uno scarico normale vale al massimo +11%: serve solo
                                 per i dati vecchi con lo scarico gia composto, 24,5 -> 22 -> 20 -> 18 kg, e si risale per gradi) */
};
/* p0 = il programma gia letto (chi scorre tutto lo storico lo legge una volta sola) */
function faseDelGiorno(d, p0) {
  const p = p0 || getProgramma();
  if (!regolaAttiva('MES-10') || !p || !p.inizio || !p.fasi || !d) return null;
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7);
  return w >= 0 && w < p.fasi.length ? p.fasi[w] : null;
}
function settimanaDellaSeduta(h) {
  if (h && h.settimana && h.settimana.numero >= 1) return Number(h.settimana.numero);
  const p = getProgramma(), d = h ? dataSessione(h) : null;
  if (!p || !p.inizio || !d) return 0;
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7) + 1;
  return w >= 1 && w <= (p.settimane || 0) ? w : 0;
}
/* MES-10: la seduta conta come di scarico nelle analisi. La definizione e una sola, esercizioInScarico (progressivo.js); qui c e solo l interruttore */
function inScarico(h, ex, p0) {
  return !!h && regolaAttiva('MES-10') && esercizioInScarico(h, ex, p0);
}
/* le ultime n sedute con l esercizio, dalla piu recente. `scarico`: conta come scarico nelle analisi (MES-10, spegnibile); `eraDiScarico`:
   era davvero di scarico (la usa MES-06, che non dipende dall interruttore di MES-10) */
function sessioniConData(nome, n, senzaScarico) {
  const out = [], prog = getProgramma(), mes10 = regolaAttiva('MES-10');
  loadHistory().forEach(h => {
    if (out.length >= n || !h.sessione || h.interrotta) return;
    const ex = h.sessione.find(e => e.name === nome);
    if (!ex) return;
    const eraDiScarico = esercizioInScarico(h, ex, prog), scarico = eraDiScarico && mes10;
    if (senzaScarico && scarico) return;
    out.push({ ex: ex, data: dataSessione(h), scarico: scarico, eraDiScarico: eraDiScarico });
  });
  return out;
}
/* MES-06: la seduta di questo esercizio prima di oggi era di scarico (e c e un carico di riferimento, caricoRiferimento in progressivo.js):
   oggi si riparte da quel carico, con un RIR in piu (usata da rirExtraIntensita e da testoRir). Con la settimana di scarico in corso no. */
function ripresaDopoScarico(nome) {
  if (!coachAttivo() || !regolaAttiva('MES-06') || isTimeBased(nome)) return false;
  const s = sessioniConData(nome, 1)[0];
  return !!(s && s.eraDiScarico && !((settimanaProgramma() || {}).fase === 'scarico') && caricoRiferimento(nome) > 0);
}
/* CAR-04: i giorni sono quelli veri, per tutti (prima oltre i 65 anni si contavano doppi: 5 giorni davano gia -10%) */
function rientroDopoPausa(g) {
  if (g < 10) return null;
  if (g <= 20) return { f: 0.9, t: '-10%' };
  if (g <= 28) return { f: 0.8, t: '-20%' };
  if (g <= 90) return { f: 0.7, t: '-30%' };
  return { f: 0.5, t: '-50%' };
}
const fmtKg = (x) => String(Math.round(x * 10) / 10);
/* l obiettivo e la forza? (il programma attuale, altrimenti il profilo) */
function obiettivoForza() {
  const pr = getProgramma(), p = getProfile() || {};
  return ((pr && pr.goals && pr.goals[0]) || (p.goals && p.goals[0]) || p.goal) === 'forza';
}

function caricoProssimoBase(nome, base, repsTarget, setsBase) {
  const sett = settimanaProgramma();
  const scarico = sett && sett.fase === 'scarico';
  const pc = profiloCoach();
  const over65 = pc.eta >= 65;   /* ETA-18: gli aumenti si dimezzano anche dopo i 65 anni, come dice il capitolo 14 della mappa */
  const prudente = pc.sonnoMale || pc.prudente || over65;
  const sess = ultimeSessioni(nome, 2);
  const dose = scarico ? DOSE_SCARICO[livelloFatica()] : null;
  const sets = scarico ? Math.max(2, Math.round((setsBase || 3) * dose.serie)) : (setsBase || 3);

  if (isTimeBased(nome)) {
    if (sess.length && esito(sess[0], repsTarget) === 'ok') return { weight: base, reps: Number(repsTarget) + 5, sets: sets, tipo: 'su', motivo: 'Tenuta completata: +5 secondi' };
    return { weight: base, reps: repsTarget, sets: sets, tipo: sess.length ? 'fermo' : 'nuovo', motivo: sess.length ? 'Stessa durata, punta a completarla' : 'Parti dalla durata del programma' };
  }

  if (!sess.length) {
    return { weight: scarico ? arrotonda(base * COACH_PARAMETRI.scaricoReattivoCarico) : base, reps: repsTarget, sets: sets, tipo: scarico ? 'scarico' : 'nuovo',
             motivo: scarico ? 'Settimana di scarico: carico e serie ridotti' : 'Prima volta: parti dal carico del programma' };
  }

  const fatteUltima = sess[0].sets.filter(x => x.done);
  const pesoUltimo = fatteUltima.length ? Math.max.apply(null, fatteUltima.map(x => Number(x.weight) || 0)) : base;
  /* prime sedute con questo esercizio: il carico di partenza e una stima, quindi si corregge piu in fretta */
  const calibrazione = ultimeSessioni(nome, 3).length < 3;
  const lista = sessioniConData(nome, 40);   /* una sola lettura dello storico per le ultime sedute e le ultime di carico */
  const sd = lista.slice(0, 3);              /* allineata a sess: stesse sedute, stesso ordine */
  const e1 = esito(sess[0], repsTarget);
  const e2 = sess[1] && !(sd[1] && sd[1].scarico) ? esito(sess[1], repsTarget) : null;   /* una seduta di scarico non conta come mancata */
  const freno = frenoBia();

  /* MES-06 (W0-T3 + W0-T4, l unica implementazione): lo scarico si calcola sul carico di riferimento (caricoRiferimento: l ultima seduta
     NON di scarico, entro 28 giorni), non sull ultima seduta: cosi la dose e la stessa in tutte le sedute della settimana (60 -> 54 -> 54,
     prima 60 -> 54 -> 48,5 -> 43,5 kg). Senza riferimento (esercizio mai fatto fuori da uno scarico) l ultima seduta di scarico resta com e:
     la dose non si applica due volte. */
  const mes06 = regolaAttiva('MES-06');
  const ultimaDiScarico = !!(sd[0] && sd[0].eraDiScarico);
  const rif = mes06 && (scarico || ultimaDiScarico) ? caricoRiferimento(nome) : 0;   /* serve solo in scarico e subito dopo */
  if (scarico) {
    const gia = mes06 && rif <= 0 && ultimaDiScarico;
    return { weight: gia ? pesoUltimo : arrotonda((rif > 0 ? rif : pesoUltimo) * dose.carico), reps: repsTarget, sets: sets, tipo: 'scarico',
      motivo: 'Settimana di scarico: ' + dose.t + ', per recuperare e ripartire piu forte (mai stop totale: la forza calerebbe)' + (rif > 0 ? ' \u2022 sul carico di riferimento (' + fmtKg(rif) + ' kg), lo stesso in tutte le sedute della settimana' : '') };
  }

  /* MES-06: la seduta di prima era di scarico e c e un riferimento. Scarico riuscito (tutte le serie fatte alle ripetizioni previste): si
     riparte da li, non dal carico di scarico piu un incremento, 5% sotto in prudenza, con sonno scarso o con la prontezza media bassa;
     al massimo +25% sull ultima seduta (dati vecchi con lo scarico gia composto: si risale per gradi). Scarico mancato: il carico resta
     com e e il motore decide. Il RIR in piu lo da rirBersaglio (ripresaDopoScarico), il testo lo scrive testoRir. */
  const scaricoRiuscito = rif > 0 && ultimaDiScarico && e1 === 'ok';
  const tettoRipresa = pesoUltimo > 0 ? arrotonda(pesoUltimo * PARAM_ANALISI.saltoMaxRipresa) : Infinity;

  /* rientro dopo una pausa su questo esercizio (dopo uno scarico riuscito il calo si applica al riferimento, non al carico di scarico) */
  const giorni = sd[0] && sd[0].data ? giorniTra(sd[0].data, new Date()) : 0;
  const rientro = rientroDopoPausa(giorni);
  const pesoRientro = scaricoRiuscito ? rif : pesoUltimo;
  if (rientro && pesoRientro > 0) {
    const w = arrotonda(pesoRientro * rientro.f);
    return { weight: scaricoRiuscito ? Math.min(w, tettoRipresa) : w, reps: repsTarget, sets: sets, tipo: 'giu',
             motivo: 'Rientro dopo ' + giorni + ' giorni: carico ' + rientro.t + ' e 3 ripetizioni in riserva, si risale in fretta' };
  }
  if (scaricoRiuscito) {
    const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
    const stanco = prudente || (pr.length > 0 && pr.reduce((t, x) => t + x, 0) / pr.length < PARAM_ANALISI.prontezzaRipresa);
    const f = stanco ? PARAM_ANALISI.ripresaPrudente : 1, pieno = arrotonda(rif * f), da = Math.min(pieno, tettoRipresa);
    if (da > pesoUltimo) {   /* se in scarico si e gia lavorato a quel carico o oltre, la ripresa non c e: vale la progressione normale */
      const perGradi = da < pieno;
      return { weight: da, reps: repsTarget, sets: sets, tipo: perGradi ? 'su' : 'fermo',
               motivo: perGradi ? 'Dopo lo scarico si risale per gradi verso il carico di prima: oggi +' + Math.round((da / pesoUltimo - 1) * 100) + '%'
                 : f < 1 ? 'Dopo lo scarico riparti poco sotto il carico che avevi prima (-' + Math.round((1 - f) * 100) + '%), per prudenza'
                         : 'Dopo lo scarico riparti dal carico che avevi prima' };
    }
  }

  /* esercizi a corpo libero: si progredisce con le ripetizioni */
  if (pesoUltimo === 0) {
    if (e1 === 'ok') return { weight: 0, reps: Number(repsTarget) + 1, sets: sets, tipo: 'su', motivo: 'Tutte le serie complete: +1 ripetizione' };
    return { weight: 0, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Stesse ripetizioni, punta a completarle tutte' };
  }

  if (e1 === 'ok') {
    if (freno) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: freno };
    const inc = prudente ? Math.max(0.5, incrementoPer(nome) / 2) : incrementoPer(nome);
    const nota = (pc.prudente ? ' (modalita prudente)' : (pc.sonnoMale ? ' (aumento prudente: recupero scarso)' : '')) + (over65 && !pc.prudente && !pc.sonnoMale ? ' \u2022 aumento dimezzato: dopo i 65 anni si sale più piano' : '');
    /* autoregolazione dall RPE segnato sulle serie */
    const bias = Number((aggiustiCoach() || {}).rirBias) || 0;
    const rpes = fatteUltima.map(x => Number(x.rpe)).filter(x => x > 0).map(x => Math.max(1, x - bias));
    if (rpes.length) {
      const media = Math.round(rpes.reduce((t, x) => t + x, 0) / rpes.length * 10) / 10;
      const bers = rpeBersaglio(nome);
      const delta = media - bers;
      if (delta >= 1) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo',
        motivo: 'Serie complete ma RPE ' + String(media).replace('.', ',') + ', sopra il bersaglio ' + String(bers).replace('.', ',') + ': stesso carico, consolida' };
      if (delta <= -1) {
        const pct = (calibrazione ? Math.min(0.15, -delta * 0.05) : Math.min(0.1, -delta * 0.04)) * (prudente ? 0.5 : 1);   /* aumenti dimezzati: anche quello a percentuale */
        const w = Math.max(arrotonda(pesoUltimo + inc), arrotonda(pesoUltimo * (1 + pct)));
        return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
          motivo: 'Serie facili (RPE ' + String(media).replace('.', ',') + ', bersaglio ' + String(bers).replace('.', ',') + '): +' + fmtKg(w - pesoUltimo) + ' kg' + nota + (calibrazione ? ' \u2022 prime sedute: mi avvicino piu in fretta' : '') };
      }
    }
    /* serie finale AMRAP: aumento proporzionale alle ripetizioni in piu (nSuns) */
    const ultima = fatteUltima[fatteUltima.length - 1];
    const extra = ultima ? (Number(ultima.reps) || 0) - (Number(repsTarget) || 0) : 0;
    if (tipoCarico(nome) === 'pesante' && extra >= 2 && fatteUltima.length === sess[0].sets.length) {
      const gambe = /gambe|glutei/.test((findExercise(nome) || {}).group || '');
      const salto = extra >= 6 ? (gambe ? 7.5 : 5) : (extra >= 4 ? (gambe ? 5 : 2.5) : 2.5);
      const tot = prudente ? Math.max(inc, salto / 2) : Math.max(inc, salto);
      return { weight: arrotonda(pesoUltimo + tot), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Ultima serie con ' + extra + ' ripetizioni in piu: +' + fmtKg(tot) + ' kg' + nota };
    }
    /* isolamenti: doppia progressione, prima le ripetizioni fino alla cima del range */
    if (tipoCarico(nome) === 'isolamento') {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const cima = (Number(repsTarget) || 0) + 3;
      if (repsFatte < cima) return { weight: pesoUltimo, reps: Math.max(Number(repsTarget) || 0, repsFatte) + 1, sets: sets, tipo: 'su',
        motivo: 'Doppia progressione: una ripetizione in piu (' + (Math.max(Number(repsTarget) || 0, repsFatte) + 1) + ' su ' + cima + '), poi il peso' };
      return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Cima del range raggiunta (' + repsFatte + '): +' + inc + ' kg e si riparte da ' + repsTarget + nota };
    }
    /* micro-incrementi: un salto oltre il 5% si fa prima con le ripetizioni */
    if (inc / pesoUltimo > 0.05) {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const tetto = (Number(repsTarget) || 0) + 2;
      if (repsFatte < tetto) {
        return { weight: pesoUltimo, reps: repsFatte + 1, sets: sets, tipo: 'su',
          motivo: '+' + inc + ' kg sarebbe un salto del ' + Math.round(inc / pesoUltimo * 100) + '%: prima una ripetizione in piu (' + (repsFatte + 1) + ')' };
      }
      return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Arrivato a ' + repsFatte + ' ripetizioni: ora +' + inc + ' kg e si riparte da ' + repsTarget + nota };
    }
    return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
             motivo: 'Tutte le serie complete la volta scorsa: +' + inc + ' kg' + nota };
  }
  /* prime sedute: se le serie sono molto sotto il previsto il carico di partenza era troppo alto: -5% subito, senza aspettare il secondo errore */
  if (calibrazione && e1 === 'mancato' && e2 !== 'mancato' && pesoUltimo > 0) {
    const totSerie = sess[0].sets.length || 1;
    const repsMedie = fatteUltima.length ? fatteUltima.reduce((t, x) => t + (Number(x.reps) || 0), 0) / fatteUltima.length : 0;
    if (fatteUltima.length < Math.ceil(totSerie * 0.6) || repsMedie <= (Number(repsTarget) || 0) - 3)
      return { weight: arrotonda(pesoUltimo * 0.95), reps: repsTarget, sets: sets, tipo: 'giu',
        motivo: 'Prime sedute: serie molto sotto il previsto, il carico di partenza era troppo alto: -5% e poi si risale' };
  }
  if (e1 === 'mancato' && e2 === 'mancato') {
    const ag0 = aggiustiCoach();
    const stalli = ((ag0.stalli || {})[nome] || 0);
    /* PCO-01 (riga del principiante, ex PRI-12): lo schema 5x3 e per chi punta alla forza; con gli altri obiettivi si resta sul peso (+30 s) e poi -5% */
    if (pc.livello === 'principiante' && tipoCarico(nome) === 'pesante' && stalli >= 1 && obiettivoForza())
      return { weight: pesoUltimo, reps: 3, sets: 5, tipo: 'fermo', stallo: true,
        motivo: 'Secondo stallo: stesso peso ma schema 5\u00D73 (poi 6\u00D72 e 10\u00D71), come nel GZCLP' };
    if (pc.livello === 'principiante') return { weight: arrotonda(pesoUltimo * 0.95), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -5% e si ricostruisce' };
    return { weight: arrotonda(pesoUltimo * COACH_PARAMETRI.dopoDueMancateCarico), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -10% e si ricostruisce' };
  }
  /* scarico mirato (CAR-08): massimale stimato in calo per due sedute di fila, senza contare le sedute di scarico e solo oltre il 3% (il rumore del RIR: MES-10) */
  const sc = lista.filter(x => !x.scarico).slice(0, 3);
  if (sc.length >= 3) {
    const m = sc.map(x => e1rmSeduta(x.ex)), r = regolaAttiva('MES-10') ? 1 - PARAM_ANALISI.rumoreE1rm : 1;
    if (m[0] && m[1] && m[2] && m[0] < m[1] * r && m[1] < m[2] * r) {
      return { weight: arrotonda(pesoUltimo * COACH_PARAMETRI.scaricoReattivoCarico), reps: repsTarget, sets: Math.max(2, Math.round(sets * COACH_PARAMETRI.scaricoProgressioneSerie)), tipo: 'scarico',
               motivo: 'Massimale stimato in calo da due sedute: scarico solo qui (-10% e meta serie), il resto non cambia' };
    }
  }
  if (pc.livello === 'principiante') return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', piuPausa: 30,
    motivo: 'Non tutte le serie complete: stesso peso con 30 secondi di pausa in piu' };
  return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Non tutte le serie complete: stesso carico, punta a piu ripetizioni' };
};

/* Applicato quando si apre una seduta: solo se c e il consenso e solo se
   la seduta non e ancora iniziata (non tocca serie gia fatte) */
window.applicaCaricoProgressivo = function(day) {
  if (!coachAttivo()) return 0;
  if (!getProgramma() && !loadHistory().some(h => h.sessione)) return 0;
  const data = loadData();
  const list = data[day] || [];
  let cambiati = 0;
  list.forEach(e => {
    if (e.completedSets.some(s => s.done)) return;
    if (e.setsBase === undefined) e.setsBase = e.sets;
    const t = caricoProssimo(e.name, e.weight, e.repsBase !== undefined ? e.repsBase : e.reps, e.setsBase);
    if (e.repsBase === undefined) e.repsBase = e.reps;
    e.weight = t.weight;
    e.reps = t.reps;
    e.sets = t.sets;
    e.completedSets = Array.from({ length: t.sets }, () => ({ done: false, reps: t.reps, weight: t.weight, wasBerserk: false }));
    e.coachNote = (e.stimato && t.tipo === 'nuovo' && MOTIVI_STIMA[e.stimato]) ? MOTIVI_STIMA[e.stimato] : t.motivo;
    e.coachTipo = t.tipo;
    if (e.restBase === undefined) e.restBase = e.rest;
    e.rest = e.restBase + (t.piuPausa || 0);
    /* avanzati: dopo la serie piu pesante, serie a -5% (RTS) */
    if (e.tecnica === 'backoff' && t.weight > 0 && t.tipo !== 'scarico') e.completedSets.forEach((x, i) => { if (i > 0) x.weight = arrotonda(t.weight * 0.95); });
    e.tecnicaSeduta = '';
    cambiati++;
  });
  /* calibrazione del RIR (CAR-14, ponte dell onda 0): nell ultima settimana di carico del blocco, l ultima serie del primo isolamento va a
     cedimento. Solo per intermedi e avanzati adulti, sotto i 65 anni, senza modalita prudente e mai sul core: chi e piu fragile o ha
     ancora poca esperienza non va a cedimento per tarare una stima. */
  const st = settimanaProgramma(), pr = getProgramma(), pcal = profiloCoach();
  const puoTarare = pcal.livello !== 'principiante' && !pcal.prudente && pcal.eta < 65 && !(pcal.eta > 0 && pcal.eta < 18);
  if (puoTarare && st && pr && pr.fasi && st.fase === 'carico' && pr.fasi[st.numero] === 'scarico') {
    const iso = list.find(e => tipoCarico(e.name) === 'isolamento' && !isTimeBased(e.name) && (findExercise(e.name) || {}).group !== 'core' && !e.completedSets.some(x => x.done));
    if (iso) iso.tecnicaSeduta = 'calibrazione';
  }
  saveData(data);
  return cambiati;
};

/* dopo la seduta: stalli e calibrazione del RIR */
function imparaDallaSeduta(list) {
  const ag = aggiustiCoach();
  ag.stalli = ag.stalli || {};
  list.forEach(e => {
    if (e.coachNote && /Due volte di fila non completato/.test(e.coachNote)) ag.stalli[e.name] = (ag.stalli[e.name] || 0) + 1;
    if (e.tecnicaSeduta === 'calibrazione' && e.completedSets.some(x => x.done)) {
      /* B10 (ponte fino alla taratura nuova di W3-T3): il confronto tra l ultima serie al cedimento e l RPE delle serie prima, gia stanche,
         ha sempre lo stesso segno e non misura la stima del RIR: non si impara piu niente da li. Ogni taratura dimezza la correzione
         che il coach aveva gia appreso (rirBias), che cosi si spegne. */
      const mezza = (Number(ag.rirBias) || 0) * 0.5;
      ag.rirBias = Math.abs(mezza) < 0.1 ? 0 : Math.round(mezza * 10) / 10;
    }
  });
  salvaAggiusti(ag);
}
