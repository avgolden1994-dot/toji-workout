/* Tempo della seduta: quanti esercizi, quanti minuti, adattamento ai minuti dichiarati (PRG-03, DUR, EXN-02, REC-01, SES-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   TEMPO (piano coach v2, B.3 stadio 10; W1-T4)
   Il tempo è un tetto, non un obiettivo (D-P10). Qui sta tutto ciò che dipende dai minuti dichiarati: stimaEsercizi (quanti esercizi per seduta dai minuti,
   già exerciseCountFor di onboarding.js), durataSeduta (la stima dei minuti di una seduta: 3,5 s a ripetizione, setup, cambi, riscaldamento, drop set;
   la formula di prima, già stimaMinutiSeduta di ricette.js), adattaAlTempo (taglio per il tempo e riempimento) e rifinisciAlTempo (l ultimo giro dopo
   la struttura). Sono le regole di prima, spostate senza cambiarne l esito: le riscrive W2-T2 (CAS-05..08, tabella B8 delle pause).
   I nomi exerciseCountFor e stimaMinutiSeduta restano come sinonimi (le prove e le schermate li chiamano ancora).
   ============================================================ */

/* PRG-03 (B1, ponte di W0-T2; il risolutore e W2-T2): quanti esercizi per seduta, senza sforare i minuti dichiarati.
   Si contano le serie che davvero si faranno (chi inizia, il minorenne, l over 65 e chi e in modalita prudente ne fa al massimo 3:
   COACH_PARAMETRI.serieMaxPrudente) e la pausa media dei tre tipi di esercizio (fondamentale, macchina, isolamento), non quella del solo
   fondamentale: prima la stima era per eccesso e le sedute restavano mezze vuote (collaudo DUR-02). Le quote dei tipi sono Convenzione. */
const PARAM_NUMERO_ESERCIZI = {
  minutiFissi: 8,                                                      /* riscaldamento e cambi di attrezzo: gli stessi 8 minuti di minutiDi in buildProgram */
  quotaTipi: { pesante: 0.25, macchina: 0.35, isolamento: 0.40 },      /* in una seduta tipo: 1 esercizio su 4 e un fondamentale col bilanciere, 1 su 3 una macchina o un libero, il resto isolamenti */
  serieMedie: 3, serieMedieForza: 3.5,                                 /* serie per esercizio realmente fatte, in media */
  min: 3, max: 7, maxPrincipiante: 5,
  maxSeduta: 8, maxSedutaPrincipiante: 6                               /* tetto assoluto dopo le aggiunte (collaudo EXN-02: oltre 8, oltre 6 per chi inizia) */
};
/* serie per esercizio che il generatore fara davvero con questo schema e questo livello: le serie dello schema (4 per la massa, 5 per la forza)
   sono il punto di partenza, ma il volume per muscolo e il taglio per il tempo le portano in media a 3 (3,5 per la forza; misurato su 1.800 programmi) */
function serieEffettive(scheme, opzioni) {
  const o = opzioni || {};
  let sets = Math.min(scheme.sets, scheme.tettoSerie || 99, scheme.restCompound >= 210 ? PARAM_NUMERO_ESERCIZI.serieMedieForza : PARAM_NUMERO_ESERCIZI.serieMedie);
  if (o.level === 'principiante' || o.prudente) sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente);
  return sets;
}
/* pausa media (secondi) tra le serie: stessa regola per tipo di buildProgram (fondamentale = restCompound, macchina = 3/4 con minimo 90, isolamento minimo 60) */
function pausaMediaPerTipo(scheme) {
  const q = PARAM_NUMERO_ESERCIZI.quotaTipi;
  return q.pesante * scheme.restCompound + q.macchina * Math.max(90, Math.round(scheme.restCompound * 0.75)) + q.isolamento * Math.max(60, scheme.restIso);
}
function stimaEsercizi(minutes, scheme, opzioni) {
  const o = opzioni || {};
  const perEsercizio = serieEffettive(scheme, o) * (35 + pausaMediaPerTipo(scheme)) / 60;
  const n = Math.floor(((Number(minutes) || 60) - PARAM_NUMERO_ESERCIZI.minutiFissi) / perEsercizio);
  return Math.max(PARAM_NUMERO_ESERCIZI.min, Math.min(o.level === 'principiante' ? PARAM_NUMERO_ESERCIZI.maxPrincipiante : PARAM_NUMERO_ESERCIZI.max, n));
}

/* Modello del tempo di una seduta (stesso del collaudo, docs/ricerca-ipertrofia-programmazione.md 3.8: Convenzione): 3,5 s a ripetizione, 10 s per mettersi in posizione,
   1 minuto di cambio tra un esercizio e l altro, 6 minuti di riscaldamento generale e 2 serie progressive prima dei primi 2 fondamentali pesanti; gli
   esercizi su un lato solo contano doppio. Lo riscrive W2-T2 (CAS-05). */
const PARAM_TEMPO = { secRipetizione: 3.5, secSetup: 10, secCambio: 60, secCambioSuperserie: 10, minRiscaldamento: 6, serieRiscaldamento: 2, secSerieRiscaldamento: 45, secDrop: 45,
  tolleranzaSforamento: 0.05,   /* il taglio per il tempo lascia una seduta fino al 5% oltre i minuti dichiarati */
  quotaMinima: 0.82,   /* sotto questa quota dei minuti dichiarati la seduta si allunga (la soglia di spreco del collaudo e 0,75) */
  direteMax: 10,       /* serie dirette a settimana per muscolo: sopra, l isolamento non prende altre serie per riempire il tempo (fascia piccoli del collaudo: massimo 14) */
  serieMinRecupero: 4, /* REC-01 (W0-T7): un grande muscolo con almeno 4 serie frazionarie in una seduta aspetta 48 ore (nessun altro lavoro dello stesso muscolo nella seduta del giorno prima o dopo; ACSM 2009: Convenzione per la soglia di serie) */
  /* massimo di serie frazionarie a settimana per muscolo [grande, piccolo] oltre il quale il riempimento non aggiunge serie (1 al bersaglio, 0,5 ai secondari: Pelland 2025;
     numeri: docs/ricerca-ipertrofia-programmazione.md 3.2, Convenzione). E il conteggio per muscolo che W2-T1 porta in tutto il generatore: qui serve solo a non sforare. */
  volumeMax: { ipertrofia: { principiante: [10, 10], intermedio: [16, 14], avanzato: [20, 18] }, forza: { principiante: [10, 8], intermedio: [14, 10], avanzato: [18, 12] },
    generale: { principiante: [8, 8], intermedio: [10, 10], avanzato: [12, 10] } },
  volumeMin: { ipertrofia: { principiante: [6, 4], intermedio: [10, 6], avanzato: [12, 8] }, forza: { principiante: [4, 2], intermedio: [6, 3], avanzato: [8, 4] },
    generale: { principiante: [4, 2], intermedio: [6, 3], avanzato: [8, 3] } },   /* il minimo corrispondente: un esercizio nuovo si sceglie dove il muscolo e piu sotto */
  /* pausa massima per tipo di esercizio e di obiettivo: dentro le fasce del collaudo (RX-02: ACSM 2009, Singer 2024, Schoenfeld 2016). Dal W0-T7 il riempimento non allunga piu le pause
     (D-P10): resta come riferimento per W2-T2, che riscrive le pause per tipo (tabella B8) */
  pausaMax: { forza: { pesante: 300, macchina: 240, isolamento: 150 }, ipertrofia: { pesante: 180, macchina: 150, isolamento: 120 }, generale: { pesante: 150, macchina: 120, isolamento: 90 } } };
/* l obiettivo del programma per le fasce di volume e di pausa: forza, generale (salute, dimagrimento) o ipertrofia (come il collaudo) */
function tipoObiettivoDi(goals) { const g = goals[0]; return g === 'forza' ? 'forza' : ((g === 'salute' || g === 'dimagrimento') ? 'generale' : 'ipertrofia'); }
function durataSeduta(esercizi) {
  const secSerie = (e) => ((isTimeBased(e.name) ? e.reps : e.reps * PARAM_TEMPO.secRipetizione) * ((findExercise(e.name) || {}).lato ? 2 : 1)) + PARAM_TEMPO.secSetup;
  let sec = PARAM_TEMPO.minRiscaldamento * 60;
  sec += Math.min(2, esercizi.filter(e => tipoCarico(e.name) === 'pesante' && (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name)).length) * PARAM_TEMPO.serieRiscaldamento * PARAM_TEMPO.secSerieRiscaldamento;
  for (let i = 0; i < esercizi.length; i++) {
    const a = esercizi[i], b = esercizi[i + 1] && esercizi[i + 1].superset ? esercizi[i + 1] : null;
    if (b) {
      const giri = Math.max(a.sets, b.sets);
      sec += giri * (secSerie(a) + secSerie(b) + PARAM_TEMPO.secCambioSuperserie) + Math.max(0, giri - 1) * Math.max(a.rest, b.rest) + PARAM_TEMPO.secCambio;
      i++;
    } else sec += a.sets * secSerie(a) + Math.max(0, a.sets - 1) * a.rest + PARAM_TEMPO.secCambio;
    [a, b].forEach(x => { if (x && x.tecnica === 'drop') sec += PARAM_TEMPO.secDrop; });
  }
  return sec / 60;
}

function riempiTempo(sd, c) {
  const bersaglio = c.minuti * PARAM_TEMPO.quotaMinima;
  const gruppoDi = (e) => (findExercise(e.name) || {}).group;
  const inCoppia = (e, i) => e.superset || (sd.esercizi[i + 1] && sd.esercizi[i + 1].superset);
  /* 1) (tolto in W0-T7, D-P10: il tempo e un tetto, non un obiettivo) le pause non si allungano per riempire i minuti: restano quelle per tipo di esercizio e di obiettivo
     (revisione dell onda 0: core a 90-120 s, Goblet Squat a 225 s nel giorno di ipertrofia). Se avanza tempo con il volume al suo posto, la seduta resta piu corta. */
  /* 2) una serie in piu agli isolamenti: i multiarticolari no (ogni serie di panca o di rematore conta anche per spalle, braccia e schiena, e il volume per muscolo e
     gia al massimo), le spalle e il core nemmeno. L isolamento a 2 serie e il primo a poter crescere, finche le serie dirette di quel muscolo restano sotto il tetto,
     nessun muscolo supera il suo massimo settimanale e la seduta resta sotto il tetto di serie per muscolo */
  const sub = (e) => { const x = dettaglioEsercizio(e.name); return x ? x.sub : ''; };
  const diretteSett = (e) => c.sedute.reduce((t, s2) => t + s2.esercizi.reduce((a, x) => a + (sub(x) === sub(e) && (findExercise(x.name) || {}).type !== 'compound' ? x.sets : 0), 0), 0);
  for (let giri = 0; giri < 12 && durataSeduta(sd.esercizi) < bersaglio; giri++) {
    const conta = {};
    sd.esercizi.forEach(e => { const g = gruppoDi(e); if (g) conta[g] = (conta[g] || 0) + e.sets; });
    const sett = frazionarieSettimana(c.sedute);
    const entro = (e) => { const cr = creditoSerie(e.name); return Object.keys(cr).every(g => (sett[g] || 0) + cr[g] <= c.volumeMax[GRUPPI_FRAZIONARI[g].classe]); };
    const cand = sd.esercizi.filter((e, i) => (findExercise(e.name) || {}).type !== 'compound' && !e.fisso && !isTimeBased(e.name) && !inCoppia(e, i) && e.sets < c.maxSerie &&
      gruppoDi(e) && gruppoDi(e) !== 'core' && gruppoDi(e) !== 'spalle' && conta[gruppoDi(e)] < COACH_PARAMETRI.serieMaxMuscoloSeduta && entro(e) && diretteSett(e) < PARAM_TEMPO.direteMax && recuperoOk(sd, c.sedute, e.name, 1))
      .sort((a, b) => a.sets - b.sets);
    if (!cand.length) break;
    cand[0].sets++;
  }
  /* 3) ancora corta: un isolamento in piu (al massimo 8 esercizi per seduta, 6 per chi inizia) dove un muscolo e sotto il minimo: mai un multiarticolare (spinte e tirate
     restano in equilibrio: ABB-04), mai uno che porti un muscolo oltre il massimo, non lo stesso lavoro di uno gia in seduta e non lo stesso esercizio in piu di 2 sedute */
  for (let giri = 0; giri < 3 && durataSeduta(sd.esercizi) < bersaglio && sd.esercizi.length < c.maxEsercizi; giri++) {
    const sett = frazionarieSettimana(c.sedute);
    const gruppi = GRUPPI_DELLA_SEDUTA[sd.tipo] || null;
    const uso = (n) => c.sedute.filter(x => x.esercizi.some(e => e.name === n)).length;
    /* con le ginocchia dolenti il riempimento non sceglie lui la leg extension (che il regex di RISCHIO lascia passare, REC-04): se serve la mette la copertura per regioni */
    const ginocchia = c.prefs.fastidi.indexOf('ginocchia') !== -1;
    const punti = EXERCISE_LIBRARY.filter(x => consentito(x.name, c.prefs) && !sd.esercizi.some(e => e.name === x.name) && uso(x.name) < maxSettimana(x.name) && !isTimeBased(x.name) &&
      x.group !== 'core' && x.group !== 'spalle' && (!gruppi || adattoAllaSeduta(x, sd.tipo)) && x.type !== 'compound' && !strRidondante(x, sd.esercizi) &&
      !(ginocchia && /leg extension|sissy/i.test(senzaEmoji(x.name))))
      .map(x => {
        const cr = creditoSerie(x.name), sets = c.maxSerie >= 3 ? 3 : 2;
        const dentro = Object.keys(cr).every(g => (sett[g] || 0) + cr[g] * sets <= c.volumeMax[GRUPPI_FRAZIONARI[g].classe]);
        const mancano = Object.keys(cr).reduce((t, g) => t + Math.max(0, c.volumeMin[GRUPPI_FRAZIONARI[g].classe] - (sett[g] || 0)) * cr[g], 0);
        return { x: x, ok: dentro && mancano > 0 && recuperoOk(sd, c.sedute, x.name, sets), mancano: mancano };   /* W0-T7: 48 ore e tetto di serie per muscolo in una seduta (REC-01, SES-01) */
      }).filter(y => y.ok).sort((a, b) => b.mancano - a.mancano || (PRIORI[senzaEmoji(b.x.name)] || 0) - (PRIORI[senzaEmoji(a.x.name)] || 0));
    if (!punti.length) break;
    const x = punti[0].x, tipo = tipoCarico(x.name);
    sd.esercizi.push({ name: x.name, sets: c.maxSerie >= 3 ? 3 : 2, reps: RX_NORDIC.test(senzaEmoji(x.name)) ? ripetizioniFlessione(x.name) : (tipo === 'macchina' ? Math.max(8, c.reps) : Math.max(10, c.reps)), weight: x.weight || 0, rest: tipo === 'macchina' ? c.restMacchina : c.restIso });
    strOrdina(sd.esercizi, sd.tipo, c.prefs.priorita);
    if (sd.tipo === 'punti') sd.esercizi.sort((a, b) => ((findExercise(a.name) || {}).group === 'core') - ((findExercise(b.name) || {}).group === 'core'));   /* nei punti deboli il core resta in fondo */
  }
}

/* i sinonimi dei nomi di prima: stessa funzione, spostata qui */
function exerciseCountFor(minutes, scheme, opzioni) { return stimaEsercizi(minutes, scheme, opzioni); }
function stimaMinutiSeduta(esercizi) { return durataSeduta(esercizi); }

/* quanti esercizi per seduta: dai minuti (stimaEsercizi), uno in meno per chi inizia con poca fiducia (la prima cosa è presentarsi), poi come vuole il metodo scelto */
function numeroEsercizi(brief) {
  const chi = brief.chi, metodoAttivo = brief.metodo.attivo;
  let nEs = stimaEsercizi(brief.agenda.minuti, brief.obiettivi.scheme, { level: chi.livello, prudente: chi.cauto });
  if (brief.mente.ps.fiduciaBassa && chi.livello === 'principiante' && nEs > 3) nEs--;
  if (metodoAttivo && metodoAttivo.nEs) nEs = metodoAttivo.nEs(nEs);
  return nEs;
}

/* adattaAlTempo(brief, sedute): dopo il volume e i tetti, la seduta deve stare nei minuti dichiarati. In ordine:
   1) EXN-02 (ponte di W0-T2): le aggiunte (schemi mancanti, regioni, copertura, femorali) non portano una seduta oltre 8 esercizi (6 per chi inizia):
      se succede, lascia la seduta l ultimo esercizio della ricetta che non e un aggiunta protetta, un fondamentale o un posto fisso;
   2) il taglio per il tempo: stesso modello del riempimento (durataSeduta, tolleranza del 5%; il collaudo segnala oltre il 10%);
   3) i femorali (rinforzaFemorali, completamenti.js) dove la seduta resta nei minuti;
   4) il riempimento (riempiTempo): una seduta sotto l 82% dei minuti prende una serie in piu sugli isolamenti o un isolamento nuovo. Il metodo famoso decide da se. */
function adattaAlTempo(brief, sedute) {
  const chi = brief.chi, level = chi.livello, goals = brief.obiettivi.lista, scheme = brief.obiettivi.scheme, prefs = brief.lavoro.prefs, metodoAttivo = brief.metodo.attivo;
  const prio = prefs.priorita, minuti = brief.agenda.minuti, donna = chi.donna, vincoli = brief.sicurezza.vincoli || {};
  const maxEsSeduta = level === 'principiante' ? PARAM_NUMERO_ESERCIZI.maxSedutaPrincipiante : PARAM_NUMERO_ESERCIZI.maxSeduta;
  sedute.forEach(sd => {
    let giri = 0;
    while (sd.esercizi.length > maxEsSeduta && giri++ < 6) {
      const iso = sd.esercizi.filter(e => !e.protetto && !e.fisso && (findExercise(e.name) || {}).type !== 'compound' && (findExercise(e.name) || {}).group !== 'core');   /* il core in fondo resta: ABB-03 */
      /* un multiarticolare si toglie solo se la seduta ha un altro dello stesso schema (due spinte verticali): mai l unica spinta, tirata, squat o hinge (collaudo SES-03) */
      const doppi = sd.esercizi.filter(e => !e.protetto && !e.fisso && (findExercise(e.name) || {}).type === 'compound' && schemaDi(e.name) && sd.esercizi.filter(y => schemaDi(y.name) === schemaDi(e.name)).length > 1);
      const via = iso[iso.length - 1] || doppi[doppi.length - 1];
      if (!via) break;
      sd.esercizi.splice(sd.esercizi.indexOf(via), 1);
    }
  });
  /* la seduta deve stare nei minuti dichiarati */
  /* B1 (ponte di W0-T2): il taglio per il tempo usa lo stesso modello del riempimento (durataSeduta), non piu «8 minuti + serie x (35 s + pausa)»,
     che sottostimava le sedute di forza e quelle a un lato solo: tolleranza del 5% (il collaudo segnala oltre il 10%) */
  const minutiDi = (sd) => durataSeduta(sd.esercizi);
  sedute.forEach(sd => {
    let giri = 0;
    while (minutiDi(sd) > minuti * (1 + PARAM_TEMPO.tolleranzaSforamento) && giri++ < 40) {
      const isPrio = (e) => prio.indexOf((findExercise(e.name) || {}).group) !== -1;
      const cand = sd.esercizi.filter(e => e.sets > 2 && !e.fisso).sort((a, b) => isPrio(a) - isPrio(b) || ((findExercise(a.name) || {}).type === 'compound') - ((findExercise(b.name) || {}).type === 'compound') || b.sets - a.sets)[0];
      if (cand) { cand.sets--; continue; }
      const iso = sd.esercizi.filter(e => (findExercise(e.name) || {}).type !== 'compound' && !e.protetto);
      const senzaCore = iso.filter(e => (findExercise(e.name) || {}).group !== 'core');   /* il core in fondo si toglie per ultimo (collaudo MIS-01:core) */
      const via = senzaCore.length ? senzaCore[senzaCore.length - 1] : iso[iso.length - 1];
      if (via && sd.esercizi.length > 3) { sd.esercizi.splice(sd.esercizi.lastIndexOf(via), 1); continue; }
      /* ultima risorsa (collaudo DUR-01, W0-T7): tutto a 2 serie e restano solo aggiunte protette (femorali, polpacci...): se la seduta sfora ancora di oltre il 10% dei minuti
         dichiarati, l ultima aggiunta protetta che non e core lascia il posto (meglio una copertura in meno che una seduta che non sta nel tempo) */
      if (minutiDi(sd) > minuti * 1.10 && sd.esercizi.length > 3) {
        const protette = sd.esercizi.filter(e => (findExercise(e.name) || {}).type !== 'compound' && e.protetto && (findExercise(e.name) || {}).group !== 'core');
        if (protette.length) { sd.esercizi.splice(sd.esercizi.lastIndexOf(protette[protette.length - 1]), 1); continue; }
      }
      break;
    }
  });

  /* B1 / DUR-02 (ponte di W0-T2; il risolutore e W2-T2, dove il tempo diventa un tetto): una seduta che resta sotto l 85% dei minuti
     dichiarati prima allunga le pause, poi (dove il volume del muscolo lo consente) prende una serie in piu sugli esercizi non fissi.
     Le pause lunghe sui fondamentali hanno prove (ACSM 2009: 2-3 minuti; Schoenfeld 2016) e dentro i tetti per tipo; con un metodo famoso decide il metodo */
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  if (!(metodoAttivo && metodoAttivo.essenziale) && conGambe && brief.agenda.giorni >= 2) rinforzaFemorali({ sedute: sedute, prefs: prefs, minuti: minuti, maxEsercizi: maxEsSeduta, setsNuovo: level === 'principiante' ? 2 : 3,
    maxSerieFlessione: vincoli.serieMaxEsercizio || (level === 'avanzato' ? 5 : 4),
    minimo: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level][0] });
  if (!metodoAttivo) sedute.forEach(sd => riempiTempo(sd, { sedute: sedute, minuti: minuti, obiettivo: goals[0], donna: donna, maxSerie: vincoli.serieMaxEsercizio || 4,
    volumeMax: PARAM_TEMPO.volumeMax[tipoObiettivoDi(goals)][level],
    volumeMin: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level],
    maxEsercizi: maxEsSeduta, prefs: prefs, reps: scheme.reps, restMacchina: Math.max(90, Math.round(scheme.restCompound * 0.75)), restIso: Math.max(60, scheme.restIso) }));
  return sedute;
}

/* DUR-01 (W0-T7): strFinale sposta serie sul fondamentale (le pause lunghe pesano di piu) e dopo il taglio la seduta puo tornare sopra i minuti dichiarati: ultimo giro, solo serie
   (mai esercizi: la struttura e finita), dagli esercizi non fissi e non prioritari con piu serie */
function rifinisciAlTempo(brief, sedute) {
  const prio = brief.lavoro.prefs.priorita, minuti = brief.agenda.minuti;
  sedute.forEach(sd => {
    const isPrio = (e) => prio.indexOf((findExercise(e.name) || {}).group) !== -1, compound = (e) => (findExercise(e.name) || {}).type === 'compound';
    const fondamentale = sd.esercizi.find(e => compound(e) && !isTimeBased(e.name));   /* resta com e: ABB-08 */
    for (let g = 0; g < 12 && durataSeduta(sd.esercizi) > minuti * (1 + PARAM_TEMPO.tolleranzaSforamento); g++) {
      const cand = sd.esercizi.filter(e => e.sets > 2 && !e.fisso && e !== fondamentale).sort((a, b) => isPrio(a) - isPrio(b) || compound(a) - compound(b) || b.sets - a.sets)[0];
      if (!cand) break;
      cand.sets--;
    }
  });
  return sedute;
}
