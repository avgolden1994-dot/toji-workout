/* Variazione del coach: ricette a slot e buildProgram
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VARIAZIONE DEL COACH: ricette a slot
   Ogni tipo di giorno e una lista di posti in ordine di priorita.
   Per ogni posto il coach sceglie tra tutti gli esercizi adatti
   (schema, attrezzi, fastidi, graditi, allungamento) con un pizzico
   di variazione guidata da un seme: programmi diversi a ogni ciclo,
   stabili dentro il ciclo. Con l obiettivo forza i fondamentali
   restano fissi (la forza e specifica dello strumento).
   ============================================================ */
function rngDa(seme) {
  let x = 2166136261;
  String(seme).split('').forEach(c => { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; });
  return () => { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
}
const _n = (e) => senzaEmoji(e.name);
const SLOT_DEF = {
  spintaO: e => schemaDi(e.name) === 'spintaO' && e.group === 'petto',   /* i piegamenti a diamante e i dip su panca sono per i tricipiti */
  spintaV: e => schemaDi(e.name) === 'spintaV' || /landmine/i.test(_n(e)),
  tirataO: e => schemaDi(e.name) === 'tirataO' || /rematore alla macchina|rematore con petto|rematore inverso/i.test(_n(e)),
  tirataV: e => schemaDi(e.name) === 'tirataV',
  squat: e => schemaDi(e.name) === 'squat' && e.type === 'compound' && !e.lato && !/sumo/i.test(_n(e)),   /* lo squat sumo e per gli adduttori: non e il fondamentale delle gambe */
  unilaterale: e => (e.group === 'gambe' || e.group === 'glutei') && e.type === 'compound' && !!e.lato,
  hinge: e => /stacco|good morning|pull-through/i.test(_n(e)),
  staccoTerra: e => /stacco da terra/i.test(_n(e)),   /* B19: lo Starting Strength fa lo stacco da terra, non il rumeno */
  glutSpinta: e => /hip thrust|ponte glutei/i.test(_n(e)),
  isoPetto: e => e.group === 'petto' && e.type !== 'compound',
  isoDeltL: e => /alzate laterali/i.test(_n(e)),
  isoDeltP: e => /face pull|reverse|alzate posteriori|y-raise/i.test(_n(e)),
  isoBic: e => e.group === 'braccia' && /curl/i.test(_n(e)) && !/inverso|zottman/i.test(_n(e)),   /* il curl inverso e per gli avambracci, lo Zottman e un classico: non sono il posto del bicipite */
  isoTri: e => e.group === 'braccia' && /pushdown|french press|estensione tricipiti|kickback tricipiti/i.test(_n(e)),
  isoFem: e => /leg curl|nordic/i.test(_n(e)),
  isoQuad: e => /leg extension/i.test(_n(e)),
  isoPolp: e => /calf raise/i.test(_n(e)),
  core: e => e.group === 'core'
};
/* ricette: le varianti A/B/C cambiano l ordine e alcuni posti */
const RICETTE = {
  push: k => ['spintaO', 'spintaV', 'spintaO2', 'isoDeltL', 'isoTri', 'isoPetto'],
  pull: k => k % 2 ? ['tirataV', 'tirataO', 'hinge', 'isoDeltP', 'isoBic', 'isoBic2'] : ['hinge', 'tirataV', 'tirataO', 'isoDeltP', 'isoBic', 'isoBic2'],
  legs: k => ['squat', 'hinge', 'unilaterale', 'squat2', 'isoFem', 'isoPolp'],
  upper: k => k % 2 ? ['tirataO', 'spintaO', 'tirataV', 'spintaV', 'isoDeltL', 'isoTri', 'isoBic'] : ['spintaO', 'tirataV', 'spintaV', 'tirataO', 'isoBic', 'isoTri', 'isoDeltL'],   /* A: petto, tirata verticale, spalle; B: tirata orizzontale, petto, tirata verticale: in due sedute spinte e tirate pari e il petto sempre 2 volte */
  lower: k => k % 2 ? ['hinge', 'unilaterale', 'squat', 'glutSpinta', 'isoQuad', 'isoPolp'] : ['squat', 'hinge', 'unilaterale', 'glutSpinta', 'isoFem', 'isoPolp'],
  /* sedute dell epoca d oro (Arnold, Mentzer): petto e schiena in coppia, poi spalle e braccia */
  'petto-schiena': k => ['spintaO', 'tirataV', 'spintaO2', 'tirataO', 'isoPetto', 'hinge'],
  'spalle-braccia': k => ['spintaV', 'isoDeltL', 'isoBic', 'isoTri', 'isoDeltP', 'isoBic2'],
  /* nei full body spinte e tirate si alternano anche quando la seduta e corta (ABB-04): tagliando a 4-5 posti restano pari */
  fullbody: k => [['squat', 'spintaO', 'tirataV', 'hinge', 'tirataO', 'spintaV', 'core'], ['hinge', 'spintaV', 'tirataO', 'squat', 'spintaO', 'tirataV', 'core'], ['unilaterale', 'spintaO', 'tirataO', 'glutSpinta', 'tirataV', 'spintaV', 'core']][k % 3]
};
/* preferenze di base (classifiche degli esperti e rapporto stimolo/fatica) */
const PRIORI = {
  'Panca Piana Bilanciere': 3, 'Panca Inclinata Manubri': 2.5, 'Chest Press Machine': 2.5, 'Panca Piana Manubri': 2.5, 'Panca Inclinata Bilanciere': 2,
  'Military Press': 2.5, 'Shoulder Press Machine': 2.5, 'Lento Avanti Manubri': 2, 'Landmine Press': 1.5,
  'Lat Machine': 3, 'Trazioni alla Sbarra (Pull-ups)': 2.5, 'Lat Machine a un Braccio': 2.5, 'Trazioni Assistite (Macchina)': 2,
  'Rematore con Petto Appoggiato': 3, 'Rematore alla Macchina': 2.5, 'Pulley Basso': 2.5, 'Rematore con Bilanciere': 2, 'Rematore con Manubrio': 2,
  'Squat con Bilanciere': 3, 'Hack Squat': 3, 'Pendulum Squat': 2.5, 'Leg Press': 2.5, 'Squat al Multipower': 2, 'Front Squat': 1.5, 'Goblet Squat': 1.5,
  'Stacco Rumeno': 3, 'Stacco da Terra (Deadlift)': 2.5, 'Stacco con Trap Bar': 2.5, 'Pull-Through ai Cavi': 1.5,
  'Affondi Bulgari': 3, 'Affondi in Camminata': 2.5, 'Affondi Inversi': 2, 'Affondi al Multipower (Piede Rialzato)': 2,
  'Hip Thrust': 3, 'Hip Thrust alla Macchina': 2.5,
  'Leg Curl Seduto': 3, 'Nordic Curl': 1.5, 'Leg Extension': 2.5,
  'Alzate Laterali ai Cavi': 3, 'Alzate Laterali': 2.5, 'Reverse Pec Deck': 3, 'Face Pull': 2.5,
  'Curl Bayesiano ai Cavi': 3, 'Curl su Panca Inclinata': 2.5, 'Curl su Panca Scott': 2.5, 'Curl Bilanciere Bicipiti': 2,
  'Estensione Tricipiti sopra la Testa ai Cavi': 3, 'Pushdown con Corda': 2.5, 'Estensione Tricipiti sopra la Testa con Manubrio': 2.5,
  'Croci ai Cavi da Seduto': 3, 'Pectoral Machine (Butterfly)': 2.5, 'Croci ai Cavi dal Basso': 2,
  'Calf Raise in Piedi': 2.5, 'Calf Raise Seduto': 2, 'Calf Raise alla Leg Press': 2,
  'Plank': 2, 'Pallof Press': 2, 'Dead Bug': 2, 'Crunch al Cavo': 2
};
/* MAV-02 e MAV-03 (ponte di W0-T2, B3; la matrice completa MAV-01 e di W2-T3, docs/ricerca-metodi-avanzati-intensita.md 3.2-3.3):
   tecniche che portano vicino al cedimento (G2 e G2b). Mai a principianti, minorenni, over 65 e modalita prudente (Convenzione, prudenza). */
const TECNICHE_AL_CEDIMENTO = ['drop', 'parziali', 'amrap', 'backoff', 'calibrazione', 'riposopausa'];
/* MAV-02: niente cedimento sul core, sugli esercizi a tempo, a peso zero (togliere il 20% non ha senso) e sugli stacchi (rapporto stimolo/fatica: ABB-09) */
function senzaCedimento(nome) {
  const m = findExercise(nome) || {};
  return m.group === 'core' || isTimeBased(nome) || !(m.weight > 0) || /stacco/i.test(senzaEmoji(nome));
}
/* B34 (ponte di W0-T2): il 5x5 fisso del primo multiarticolare vale solo per il bilanciere pesante (BIL_PESANTI), mai per goblet, manubri, corpo libero e nemmeno per le
   macchine guidate: con la massa come obiettivo principale 5 ripetizioni su una macchina escono dalla fascia 6-15 (collaudo RX-01:ipertrofia/macchina) */
function adattoAlCincoPerCinque(nome) {
  const m = findExercise(nome) || {};
  return m.type === 'compound' && !isTimeBased(nome) && m.weight > 0 && tipoCarico(nome) === 'pesante';
}
/* MAV-02 (revisione dell onda 0): niente cedimento neppure sul front squat e sulle spinte sopra la testa (Military, Lento avanti, Arnold, Shoulder press), ne sugli esercizi che caricano di piu
   la zona del fastidio dichiarato (STRESS_ZONA: l AMRAP sul Military con la schiena dolente, sul panca bilanciere con la spalla) */
const ZONA_DEL_FASTIDIO = { spalle: 'spalla', schiena: 'schiena', ginocchia: 'ginocchio' };
function senzaCedimentoPer(nome, fastidi) {
  if (senzaCedimento(nome)) return true;
  const n = senzaEmoji(nome);
  if (/front squat|military|lento avanti|arnold|shoulder press/i.test(n)) return true;
  return (fastidi || []).some(f => (STRESS_ZONA[ZONA_DEL_FASTIDIO[f]] || []).indexOf(n) !== -1);
}
const SCHEMI_ATTESI = { fullbody: ['spinta', 'tirata', 'basso'], upper: ['spinta', 'tirata'], lower: ['squat', 'hinge'], legs: ['squat', 'hinge'], push: ['spinta'], pull: ['tirata'] };
const SLOT_PER_SCHEMA = { spinta: ['spintaO', 'spintaV'], tirata: ['tirataO', 'tirataV'], basso: ['squat', 'hinge', 'glutSpinta'], squat: ['squat'], hinge: ['hinge', 'glutSpinta'] };
/* un esercizio e adatto a una seduta di quel tipo se allena i suoi muscoli: nelle sedute di tirata solo il bicipite delle braccia e i deltoidi posteriori, in quelle di spinta solo il tricipite e i deltoidi anteriori e laterali */
function adattoAllaSeduta(x, tipo) {
  const g = GRUPPI_DELLA_SEDUTA[tipo];
  if (!g) return true;
  if (g.indexOf(x.group) === -1) return false;
  const sub = (dettaglioEsercizio(x.name) || {}).sub, n = senzaEmoji(x.name);
  const dietro = /face pull|reverse|alzate posteriori|y-raise/i.test(n);
  if (tipo === 'pull') return x.group === 'schiena' || (x.group === 'braccia' && sub === 'Bicipiti') || (x.group === 'spalle' && dietro);
  if (tipo === 'push') return x.group === 'petto' || (x.group === 'braccia' && sub === 'Tricipiti') || (x.group === 'spalle' && !dietro);
  return true;
}
const NOTA_REMATORE_INVERSO = 'Rematore inverso: fallo sotto un tavolo robusto o con una sbarra bassa, dopo aver controllato che regga il tuo peso.';
const RIPETIZIONI_SETTIMANA_MAX = 2;   /* lo stesso esercizio al massimo in 2 sedute a settimana (collaudo RID-02, Convenzione) */
/* Nordic Curl (revisione dell onda 0, B1): e una discesa eccentrica sovramassimale, ci si inginocchia e si cade in avanti sulle mani. Non e per chi inizia, per i prudenti
   (over 65, PAR-Q, minorenni) ne per chi ha le ginocchia dolenti; per gli altri al massimo 3 serie da 3-6 ripetizioni, in una seduta a settimana (la libreria lo da a 3x6).
   Dove manca, a casa i femorali restano sotto il minimo (con la nota): le flessioni vere (elastico, slider) sono di W1-T5. */
const PARAM_NORDIC = { serieMax: 3, ripetizioniMax: 6, sedutePerSettimana: 1 };
const RX_NORDIC = /nordic/i;
function maxSettimana(nome) { return RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.sedutePerSettimana : RIPETIZIONI_SETTIMANA_MAX; }
function ripetizioniFlessione(nome) { const m = findExercise(nome) || {}; return RX_NORDIC.test(senzaEmoji(nome)) ? Math.min(m.reps || PARAM_NORDIC.ripetizioniMax, PARAM_NORDIC.ripetizioniMax) : (m.reps && m.reps > 8 ? m.reps : 12); }
const NOTA_FEMORALI_SENZA_LEG_CURL = 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.';
/* i gruppi che allena ogni tipo di seduta: servono a riempire una seduta rimasta con meno di 3 esercizi (EXN-01) e a scegliere un esercizio in piu (riempiTempo); i full body e i punti deboli: tutti */
const GRUPPI_DELLA_SEDUTA = { push: ['petto', 'spalle', 'braccia'], pull: ['schiena', 'braccia', 'spalle'], legs: ['gambe', 'glutei'], lower: ['gambe', 'glutei'],
  upper: ['petto', 'schiena', 'spalle', 'braccia'], 'petto-schiena': ['petto', 'schiena'], 'spalle-braccia': ['spalle', 'braccia'] };
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
  /* pausa massima per tipo di esercizio e di obiettivo: dentro le fasce del collaudo (RX-02: ACSM 2009, Singer 2024, Schoenfeld 2016) */
  pausaMax: { forza: { pesante: 300, macchina: 240, isolamento: 150 }, ipertrofia: { pesante: 180, macchina: 150, isolamento: 120 }, generale: { pesante: 150, macchina: 120, isolamento: 90 } } };
/* l obiettivo del programma per le fasce di volume e di pausa: forza, generale (salute, dimagrimento) o ipertrofia (come il collaudo) */
function tipoObiettivoDi(goals) { const g = goals[0]; return g === 'forza' ? 'forza' : ((g === 'salute' || g === 'dimagrimento') ? 'generale' : 'ipertrofia'); }
function stimaMinutiSeduta(esercizi) {
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
/* B29 (ponte dei femorali di W0-T2): i femorali arrivano al minimo del livello (la fascia delle grandi unita: docs/ricerca-ipertrofia-programmazione.md 3.2, rivista
   da W2-T1 con la tabella B6) prima di tutto con le serie dei leg curl o dei nordic gia in scheda (fino a 4, 5 agli avanzati, 3 a chi inizia), poi con un secondo
   esercizio di flessione in un altra seduta di gambe. Solo dove la seduta resta nei minuti dichiarati (+5%): non si sfora il tempo per i femorali. */
function rinforzaFemorali(c) {
  const target = Math.ceil(c.minimo * 0.92);
  const flex = (e) => /leg curl|nordic/i.test(senzaEmoji(e.name));
  /* il Nordic Curl e una discesa eccentrica a corpo libero: oltre 3 serie non e un lavoro che si fa (la libreria lo da a 3x6) */
  const tetto = (e) => /nordic/i.test(senzaEmoji(e.name)) ? Math.min(3, c.maxSerieFlessione) : c.maxSerieFlessione;
  const dentro = (sd) => stimaMinutiSeduta(sd.esercizi) <= c.minuti * 1.05;
  const nomiFlessione = () => ['Leg Curl Seduto', 'Leg Curl Sdraiato', 'Nordic Curl'].map(nomeInLibreria).filter(n => n && consentito(n, c.prefs));
  const usoFlessione = (n) => c.sedute.filter(x => x.esercizi.some(e => e.name === n)).length;
  /* frequenza: il femorale conta in una seduta da 1,5 serie frazionarie in su (3 serie con credito 0,5: un pull-through a 2 serie non basta); almeno 2 sedute
     a settimana (ACSM 2026). Dove manca, una serie in piu al leg curl che c e o un leg curl nuovo (collaudo FRQ-01) */
  const femSeduta = (sd) => sd.esercizi.reduce((t, e) => t + e.sets * (creditoSerie(e.name).femorali || 0), 0);
  const gambe = c.sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo));
  const nuova = (sd) => {   /* un leg curl nuovo nella seduta, solo se c e posto, non sfora il tempo e rispetta le 48 ore e il tetto di serie (W0-T7: REC-01, SES-01) */
    if (sd.esercizi.length >= c.maxEsercizi || sd.esercizi.some(flex)) return false;
    const nome = nomiFlessione().filter(n => usoFlessione(n) < maxSettimana(n) && recuperoOk(sd, c.sedute, n, c.setsNuovo)).sort((a, b) => usoFlessione(a) - usoFlessione(b))[0];
    if (!nome) return false;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: Math.min(c.setsNuovo, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75 });
    if (!dentro(sd)) { sd.esercizi.pop(); return false; }
    strOrdina(sd.esercizi, sd.tipo, c.prefs.priorita);   /* ABB-01: il core resta in fondo */
    return true;
  };
  const piuSerie = (sd, f) => {   /* una serie in piu al leg curl che c e: tetto, tempo e recupero */
    if (!(f.sets < tetto(f)) || f.fisso || !recuperoOk(sd, c.sedute, f.name, 1)) return false;
    f.sets++;
    if (!dentro(sd)) { f.sets--; return false; }
    return true;
  };
  for (let giri = 0; giri < 6 && gambe.filter(sd => femSeduta(sd) >= 1.5).length < Math.min(2, gambe.length); giri++) {
    const poveri = gambe.filter(x => femSeduta(x) < 1.5).sort((a, b) => femSeduta(b) - femSeduta(a));
    if (!poveri.some(sd => { const f = sd.esercizi.find(e => flex(e) && e.sets < tetto(e) && !e.fisso); return f ? piuSerie(sd, f) : nuova(sd); })) break;
  }
  for (let giri = 0; giri < 10 && (frazionarieSettimana(c.sedute).femorali || 0) < target; giri++) {
    const su = [].concat.apply([], c.sedute.map(sd => sd.esercizi.filter(e => flex(e) && e.sets < tetto(e) && !e.fisso && dentro(sd)).map(e => ({ sd: sd, e: e }))))
      .sort((a, b) => a.e.sets - b.e.sets);
    if (su.some(x => piuSerie(x.sd, x.e))) continue;
    /* nessun leg curl da rinforzare: ne entra un secondo in un altra seduta di gambe (non lo stesso esercizio in piu di 2 sedute) */
    if (!gambe.filter(x => !x.esercizi.some(flex)).sort((a, b) => a.esercizi.length - b.esercizi.length).some(nuova)) break;
  }
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
  for (let giri = 0; giri < 12 && stimaMinutiSeduta(sd.esercizi) < bersaglio; giri++) {
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
  for (let giri = 0; giri < 3 && stimaMinutiSeduta(sd.esercizi) < bersaglio && sd.esercizi.length < c.maxEsercizi; giri++) {
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
window.buildProgram = function(d) {
  const prof0 = (typeof getProfile === 'function' && d !== undefined && d.usaProfilo !== false && d === onbData) ? (getProfile() || {}) : {};
  const goals = (d.goals && d.goals.length) ? d.goals.slice(0, 3) : [d.goal || 'salute'];
  const scheme = schemaMisto(goals);
  const level = d.level || 'intermedio';
  const eta = Number(d.age) || 0;
  /* ETA-01 (D-P9): sotto 13 anni nessun programma. L onboarding e Opzioni lo impediscono prima; qui e l ultima guardia, perche un
     programma da adulto a un bambino e peggio di nessun programma (e nessun chiamante scrive niente prima di aver ricevuto il programma) */
  if (eta > 0 && eta < PARAM_ETA.min) throw new Error(MSG_ETA_SOTTO_MINIMO);
  const over65 = eta >= 65;
  const minore = eta >= PARAM_ETA.min && eta < PARAM_ETA.maggiorenne;   /* ETA-02 e ETA-03: profilo minorenne (assorbe REC-11); un eta non detta resta «adulto» per i programmi gia salvati */
  const parqSi = d.parq === 'si' || d.parq === true;
  const cauto = over65 || parqSi || minore;
  const tecnicheOk = level !== 'principiante' && !cauto;   /* MAV-03: niente tecniche al cedimento a chi inizia, ai minorenni, agli over 65 e in modalita prudente */
  const donna = d.sex === 'F' || d.sex === 'donna';
  const freqScelta = ['1', '2', '3'].indexOf(String(d.freq || prof0.freq || '')) !== -1 ? String(d.freq || prof0.freq) : null;
  let split = splitPerFrequenza(level, d.days, freqScelta);
  let nEs = exerciseCountFor(d.minutes, scheme, { level: level, prudente: cauto });
  const struttura = strutturaProgramma(level, cauto);   /* B4: over 65, PAR-Q positivo e minorenni restano a blocchi 3+1; PRN-03: gli altri principianti hanno lo scarico solo all'8a */
  const prefs = { luogo: d.luogo || 'palestra', fastidi: (d.fastidi || []).filter(f => f !== 'nessuno'), sonno: d.sonno || 'bene', attrezzi: d.attrezzi || 'indifferente',
    attrezziPalestra: d.attrezziPalestra !== undefined ? d.attrezziPalestra : (prof0.attrezziPalestra || null), graditi: d.graditi || prof0.graditi || [], odiati: d.odiati || prof0.odiati || [],
    priorita: (d.priorita || prof0.priorita || []).slice(0, 3) };
  /* B1 (revisione dell onda 0): il Nordic Curl non entra per chi inizia, per i prudenti e per le ginocchia dolenti (esclusi: motivi di sicurezza, non di gusto) */
  const nordicLib = nomeInLibreria('Nordic Curl');
  prefs.esclusi = nordicLib && (level === 'principiante' || cauto || prefs.fastidi.indexOf('ginocchia') !== -1) ? [nordicLib] : [];
  const sostituzioni = [];
  const note = [];
  const poco = (Number(d.minutes) || 60) <= 45;
  /* chi ha davanti: le risposte psicologiche cambiano come si usano le regole */
  const ps = psicoCoach(d.psico || prof0.psico);
  if (ps.fiduciaBassa && level === 'principiante' && nEs > 3) nEs--;
  /* il coach compone: fattore fisico (BIA, dati) + psicologico + momento di vita */
  const fis = fattoreFisico(d, prof0);
  const scelta = d.metodo !== undefined ? { primo: d.metodo && metodoDa(d.metodo) ? { m: metodoDa(d.metodo), perche: [] } : null, secondo: null } : sceltaMetodo(d, prof0, ps, fis, level, over65);
  const metodo = scelta.primo ? scelta.primo.m : null;
  const metodoAttivo = metodo && metodo.applicabile && metodo.id !== 'coach' ? metodo : null;
  const ispirazioni = [];
  if (metodoAttivo) {
    if (metodoAttivo.split && !freqScelta) split = metodoAttivo.split(d.days);
    if (metodoAttivo.nEs) nEs = metodoAttivo.nEs(nEs);
    if (metodoAttivo.luogo) prefs.luogo = metodoAttivo.luogo;
    ispirazioni.push({ id: metodoAttivo.id, ruolo: 'struttura', perche: scelta.primo.perche || [] });
  } else ispirazioni.push({ id: 'coach', ruolo: 'struttura', perche: [] });
  /* un «tocco» che porta al cedimento (l ultima serie AMRAP) non si prende da un altro metodo per chi non puo farlo: il testo che il coach mostra deve essere quello che fa (B22) */
  const tocco = scelta.secondo && TOCCHI[scelta.secondo.m.tocco] && (tecnicheOk || !TOCCHI[scelta.secondo.m.tocco].alCedimento) ? scelta.secondo : null;
  if (tocco) ispirazioni.push({ id: tocco.m.id, ruolo: 'dettaglio', dettaglio: TOCCHI[tocco.m.tocco].testo, perche: (tocco.perche || []).filter(t => !/giorni a settimana/.test(t)) });
  const testFisici = d.test || prof0.test || {};
  const fattoreVarieta = metodoAttivo ? Math.min(ps.varieta, metodoAttivo.varieta) || (d.variante ? 0.5 : 0) : (ps.varieta || (d.variante ? 0.5 : 0));   /* routine: stessi esercizi, salvo chi chiede un altra variante */

  const mappaGiorni = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 3, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
  const indiciGiorni = mappaGiorni[d.days] || [0, 2, 4];
  const visti = {};

  /* variazione: ogni programma (e ogni ciclo) esce diverso, ma e ripetibile col suo seme */
  const seme = d.seme !== undefined ? d.seme : [ymd(new Date()), level, d.days, goals.join('+'), (d.cicli || prof0.cicli || 0), (d.variante || 0)].join('|');
  const rng = rngDa(seme);
  const occ = {}, usatiSett = {};
  /* 3 giorni con upper e lower una volta sola: il full body fa da giorno leggero per entrambi (forza + ipertrofia, ogni muscolo 2 volte) */
  const ulUnico = split.giorni.filter(g => g === 'upper').length === 1 && split.giorni.filter(g => g === 'lower').length === 1;
  let schienaPrima = null;   /* ABB-07: la seduta del giorno prima aveva un carico pesante sulla schiena? */
  let senzaSbarra = false;           /* CAS-14: almeno un posto della tirata verticale e stato riempito con il pullover o con una serie in piu di rematore */
  let pulloverMesso = false;         /* CAS-14: almeno un posto e stato riempito con il pullover (lo dice anche la nota dello schema aggiunto, come PRG-21) */
  const senzaSbarraSerieInPiu = [];  /* CAS-14: gli indici delle sedute dove il posto e rimasto vuoto: il rematore prende una serie in piu */
  const costruite = [];   /* le sedute gia fatte (giorni precedenti): servono alle 48 ore dei riempimenti (W0-T7, REC-01) */
  const sedute = split.giorni.slice(0, d.days).map((tplId, i) => {
    const tpl = WORKOUT_TEMPLATES.find(t => t.id === tplId);
    const usati = [];
    const base = [];
    let pesantiSchiena = 0;
    const vietaSchiena = !!(schienaPrima && !metodoAttivo && indiciGiorni[i] - schienaPrima.idx === 1 && schienaPrima.pesa);
    let schienaQui = false;
    /* PHUL: all intermedio con upper/lower la prima volta e forza, la seconda ipertrofia */
    const tipoGiorno = ((level === 'intermedio' && !metodoAttivo) || (metodoAttivo && metodoAttivo.phul)) && (tplId === 'upper' || tplId === 'lower') ? (visti[tplId] ? 'ipertrofia' : 'forza')
      : (level === 'intermedio' && !metodoAttivo && tplId === 'fullbody' && ulUnico ? 'ipertrofia' : null);
    visti[tplId] = true;
    /* ricetta a slot: per ogni posto il coach sceglie tra tutti gli esercizi adatti */
    const RIC = (metodoAttivo && metodoAttivo.ricette && metodoAttivo.ricette[tplId]) ? metodoAttivo.ricette : RICETTE;
    const ricetta = tplId === 'punti' ? ricettaPunti(prefs.priorita) : (RIC[tplId] ? RIC[tplId](occ[tplId] || 0) : []);
    occ[tplId] = (occ[tplId] || 0) + 1;
    ricetta.forEach((slot, pos) => {
      if (base.length >= nEs) return;
      const def = SLOT_DEF[slot.replace(/\d$/, '')];
      if (!def) return;
      /* RID-01: la spinta d anca non e il terzo esercizio per il grande gluteo (stacco, affondo e hip thrust fanno lo stesso lavoro: ABB-02 ne ammette due) */
      if (slot === 'glutSpinta' && base.filter(y => bersaglioDi(y.name) === 'grande_gluteo' && (findExercise(y.name) || {}).type === 'compound').length >= 2) return;
      const tutti = EXERCISE_LIBRARY.filter(x => def(x) && !base.some(y => y.name === x.name));
      if (!tutti.length) return;
      const pesante = (pos === 0 || (metodoAttivo && metodoAttivo.pesanti)) && !cauto && !(metodoAttivo && metodoAttivo.leggeri);   /* leggeri: Gironda, 8x8 con macchine e pesi moderati */
      const fisso = pesante && goals[0] === 'forza';
      const prio = (x) => (PRIORI[x.name.replace(EMOJI_TESTA, '')] || 0) + (pesante && tipoCarico(x.name) === 'pesante' ? 3 : 0) - (cauto && tipoCarico(x.name) === 'pesante' ? 3 : 0);
      const migliore = tutti.slice().sort((x, y) => prio(y) - prio(x))[0];
      /* ABB-07: una sola schiena pesante per seduta; non nei metodi essenziali (Starting Strength, StrongLifts, GreySkull: squat e stacco insieme sono il metodo) */
      const ok = tutti.filter(x => consentito(x.name, prefs) && !(RX_NORDIC.test(senzaEmoji(x.name)) && (usatiSett[x.name] || 0) >= PARAM_NORDIC.sedutePerSettimana) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1 && !(metodoAttivo && metodoAttivo.essenziale)) && !(metodoAttivo && metodoAttivo.leggeri && tipoCarico(x.name) === 'pesante'));
      if (!ok.length) {
        /* SES-03 (ponte di W0-T2): senza stacchi (schiena dolente, niente bilanciere ne cavi) il posto dell hinge lo prende la spinta d anca con carico (hip thrust):
           e il movimento di cerniera dell anca che resta, e la seduta di gambe non ne e priva */
        if (slot.replace(/\d$/, '') === 'hinge') {
          const hip = EXERCISE_LIBRARY.filter(x => SLOT_DEF.glutSpinta(x) && x.type === 'compound' && consentito(x.name, prefs) && !base.some(y => y.name === x.name)).sort((a, b) => (PRIORI[senzaEmoji(b.name)] || 0) - (PRIORI[senzaEmoji(a.name)] || 0))[0];
          if (hip) { usatiSett[hip.name] = (usatiSett[hip.name] || 0) + 1; base.push({ name: hip.name, weight: hip.weight || 0 }); }
        }
        /* CAS-14 (ponte di W0-T2, B28; W0-T7): senza sbarra ne macchine il posto della tirata verticale prende il Pullover con Manubrio (dorsali, D-P11) SUBITO, al suo posto
           nella ricetta: conta come uno dei nEs esercizi (sostituisce l ultimo posto, non si aggiunge) ed e protetto dai tagli. Se non c e nemmeno quello (corpo libero, o la spalla
           dolente), il rematore della seduta ha una serie in piu (sotto) */
        if (slot.replace(/\d$/, '') === 'tirataV' && regolaAttiva('CAS-14')) {
          const pull = nomeInLibreria('Pullover con Manubrio');
          if (pull && consentito(pull, prefs) && !base.some(y => y.name === pull)) { usatiSett[pull] = (usatiSett[pull] || 0) + 1; base.push({ name: pull, weight: (findExercise(pull) || {}).weight || 0, riservaTirataV: true, protetto: true }); senzaSbarra = true; pulloverMesso = true; }
          else senzaSbarraSerieInPiu.push(i);
        }
        return;
      }
      const punteggio = (x) => {
        let v = prio(x) + bonusBiomecc(x, slot.replace(/\d$/, ''), testFisici, prefs.fastidi);
        if ((prefs.graditi || []).indexOf(x.name) !== -1) v += 3;
        if (inAllungamento(x.name)) v += 1.5;
        if (usatiSett[x.name] && !(metodoAttivo && metodoAttivo.ripeti)) v -= level === 'principiante' ? 1 : 4;   /* varieta tra i giorni (ripeti: i metodi con la stessa seduta ogni volta) */
        if (!fisso) v += rng() * (level === 'principiante' ? 1 : 2.5) * fattoreVarieta;    /* la variazione del coach, dosata sul gusto */
        if (ps.disagio && !fisso && attrezzoDi(senzaEmoji(x.name)) === 'bilanciere') v -= 2;   /* a disagio: meno bilanciere, meno postazioni */
        if (strRidondante(x, base)) v -= 4;   /* ABB-02: non due esercizi che fanno lo stesso lavoro */
        if (vietaSchiena && strSchiena(x.name)) v -= 5;   /* ABB-07: due giorni di fila, schiena pesante una volta sola */
        return v;
      };
      /* ABB-02 come regola: il migliore che non fa lo stesso lavoro di uno gia scelto, se c e (stesso ordine, stessa casualita) */
      const ordinati = ok.slice().sort((x, y) => punteggio(y) - punteggio(x));
      const scelta = ordinati.find(x => !strRidondante(x, base)) || ordinati[0];
      if (migliore && scelta.name !== migliore.name && !consentito(migliore.name, prefs)) sostituzioni.push({ da: migliore.name, a: scelta.name });
      if (SCHIENA_PESANTE.test(scelta.name)) pesantiSchiena++;
      if (strSchiena(scelta.name)) schienaQui = true;
      usatiSett[scelta.name] = (usatiSett[scelta.name] || 0) + 1;
      base.push({ name: scelta.name, weight: scelta.weight || 0 });
    });
    /* SES-03 (ponte di W0-T2): ogni seduta ha un multiarticolare di ogni schema del suo tipo (full body: spinta, tirata, squat o hinge; upper: spinta e tirata; lower:
       squat e hinge; push: spinta; pull: tirata). Se i fastidi, gli attrezzi o il taglio dei posti ne hanno tolto uno, entra il migliore possibile, anche oltre nEs */
    if (!metodoAttivo) (SCHEMI_ATTESI[tplId] || []).forEach(k => {
      const slots = SLOT_PER_SCHEMA[k];
      const e1 = (x) => slots.some(sl => SLOT_DEF[sl](x) && (sl !== 'glutSpinta' || x.type === 'compound'));
      if (base.some(b => { const x = findExercise(b.name); return x && e1(x); })) return;
      const cand = EXERCISE_LIBRARY.filter(x => e1(x) && consentito(x.name, prefs) && !base.some(y => y.name === x.name) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1)).sort((a, b) =>
        (strRidondante(a, base) - strRidondante(b, base)) || (((usatiSett[a.name] || 0) >= maxSettimana(a.name)) - ((usatiSett[b.name] || 0) >= maxSettimana(b.name))) || ((PRIORI[senzaEmoji(b.name)] || 0) - (cauto && tipoCarico(b.name) === 'pesante' ? 3 : 0)) - ((PRIORI[senzaEmoji(a.name)] || 0) - (cauto && tipoCarico(a.name) === 'pesante' ? 3 : 0)))[0];
      if (!cand) return;
      if (SCHIENA_PESANTE.test(cand.name)) pesantiSchiena++;
      usatiSett[cand.name] = (usatiSett[cand.name] || 0) + 1;
      base.push({ name: cand.name, weight: cand.weight || 0 });
    });
    /* EXN-01 (B1, ponte di W0-T2): una seduta ha almeno 3 esercizi. Quando i fastidi o gli attrezzi svuotano i posti della ricetta
       (corpo libero con le ginocchia dolenti, per esempio) si riempie con i muscoli della seduta, poi con il core */
    for (let g = 0; base.length < PARAM_NUMERO_ESERCIZI.min && g < 4; g++) {
      const gruppi = GRUPPI_DELLA_SEDUTA[tplId] || null;
      const libero = (x) => consentito(x.name, prefs) && !base.some(y => y.name === x.name) && (usatiSett[x.name] || 0) < maxSettimana(x.name) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1) && !(metodoAttivo && metodoAttivo.leggeri && tipoCarico(x.name) === 'pesante');
      const punto = (x) => (PRIORI[x.name.replace(EMOJI_TESTA, '')] || 0) - (usatiSett[x.name] ? 2 : 0) - (isTimeBased(x.name) ? 1 : 0) + (x.type === 'compound' && tplId !== 'punti' ? 1 : 0);
      const migliore = (lista) => lista.sort((a, b) => punto(b) - punto(a))[0];
      /* prima un esercizio dei muscoli della seduta che non faccia lo stesso lavoro di uno gia scelto (ABB-02), poi, nella seduta di tirata, la catena posteriore (femorali e glutei
         in isolamento: la tirata della schiena a corpo libero e una sola, W0-T7), poi il core (UNO solo per seduta: Dead Bug e Plank insieme non sono lavoro per la schiena), poi anche uno ridondante */
      const dei = EXERCISE_LIBRARY.filter(x => libero(x) && x.group !== 'core' && (!gruppi || adattoAllaSeduta(x, tplId)) && (tplId !== 'punti' || x.type !== 'compound'));
      const sdAttuale = { giorno: DAYS[indiciGiorni[i]], esercizi: base.map(y => ({ name: y.name, sets: 3 })) };
      const affini = tplId === 'pull' ? EXERCISE_LIBRARY.filter(x => libero(x) && x.type !== 'compound' && x.group !== 'core' && ['femorali', 'grande_gluteo'].indexOf(bersaglioDi(x.name)) !== -1 && !isTimeBased(x.name) &&
        recuperoOk(sdAttuale, costruite, x.name, 3)) : [];
      const core = base.some(y => (findExercise(y.name) || {}).group === 'core') ? null : migliore(EXERCISE_LIBRARY.filter(x => libero(x) && x.group === 'core'));
      const scelto = migliore(dei.filter(x => !strRidondante(x, base))) || migliore(affini.filter(x => !strRidondante(x, base))) || core || migliore(dei);
      if (!scelto) break;
      if (SCHIENA_PESANTE.test(scelto.name)) pesantiSchiena++;
      usatiSett[scelto.name] = (usatiSett[scelto.name] || 0) + 1;
      base.push({ name: scelto.name, weight: scelto.weight || 0 });
    }
    if (tplId === 'punti') base.sort((a, b) => ((findExercise(a.name) || {}).group === 'core') - ((findExercise(b.name) || {}).group === 'core'));   /* ABB-01: nei punti deboli il core resta in fondo */
    /* allungamento dove e provato (le varianti restano in scheda se non disponibili) */
    base.forEach(e => {
      const sc = scambiAllungamento().find(x => senzaEmoji(e.name) === x[0]);
      if (!sc) return;
      const alt = nomeInLibreria(sc[1]);
      if (alt && consentito(alt, prefs) && !base.some(y => y.name === alt)) { e.name = alt; e.weight = (findExercise(alt) || {}).weight || e.weight; }
    });
    /* ABB-01: fondamentale, poi macchine, poi isolamenti, il core in fondo (i metodi famosi hanno il loro ordine) */
    if (!metodoAttivo) strOrdina(base, tplId, prefs.priorita);
    schienaPrima = { idx: indiciGiorni[i], pesa: schienaQui };

    let primoComp = true;
    const seduta = {
      giorno: DAYS[indiciGiorni[i]],
      tipo: tplId,
      titolo: tplId === 'punti' ? 'Punti deboli' : (tpl ? tpl.title.split(' — ')[0] : 'Seduta ' + (i + 1)) + (tipoGiorno ? ' ' + tipoGiorno : ''),
      esercizi: base.map(e => {
        const meta = findExercise(e.name);
        const isComp = meta && meta.type === 'compound';
        const tipo = tipoCarico(e.name);
        let sets = scheme.sets, reps = scheme.reps;
        let rest = tipo === 'pesante' ? scheme.restCompound : (tipo === 'macchina' ? Math.max(90, Math.round(scheme.restCompound * 0.75)) : Math.max(60, scheme.restIso));
        /* ripetizioni per tipo di esercizio: fondamentali 5-8, macchine 8-12, isolamenti 10-20 */
        const forzaQui = goals[0] === 'forza' || tipoGiorno === 'forza';
        if (tipo === 'pesante') reps = forzaQui ? 5 : Math.min(reps, 8);
        else if (tipo === 'macchina') { reps = forzaQui ? 8 : Math.max(8, reps); if (goals[0] === 'forza') sets = Math.min(sets, 4); }
        else { reps = Math.max(10, reps); if (goals[0] === 'forza') sets = Math.min(sets, 3); }
        let fisso = false;
        /* B34 (PRG-14): il 5x5 fisso e solo per il primo multiarticolare adatto (bilanciere pesante o macchina guidata), mai su goblet, manubri o
           corpo libero, e non nel giorno di ipertrofia; ne per over 65 e minorenni */
        if (isComp && primoComp && scheme.forzaSulPrimo && !over65 && !minore && tipoGiorno !== 'ipertrofia' && adattoAlCincoPerCinque(e.name)) { sets = 5; reps = 5; rest = 180; fisso = true; primoComp = false; }
        if (goals[0] === 'forza' && level !== 'principiante' && tipo === 'pesante' && !over65 && !minore && !parqSi && !metodoAttivo) { sets = 6; reps = 3; rest = 180; }
        if (tipoGiorno === 'forza' && tipo === 'pesante') { sets = 4; rest = Math.max(rest, 180); }
        /* B2 (PHUL): il giorno di ipertrofia torna allo schema della massa (4 serie, pause da massa), non 6x8 o 5x8 a 180 s ereditati dal giorno di forza */
        if (tipoGiorno === 'ipertrofia') {
          const ip = schemeFor('massa');   /* 4 x 10, fondamentale 150 s, isolamento 75 s */
          reps = tipo === 'pesante' ? 8 : (isComp ? 10 : 12);
          sets = Math.min(sets, ip.sets);
          rest = tipo === 'pesante' ? ip.restCompound : (tipo === 'macchina' ? Math.max(90, Math.round(ip.restCompound * 0.75)) : Math.max(60, ip.restIso));
        }
        if (!isComp && scheme.isoMassa) { sets = 3; reps = 12; }
        sets = Math.min(sets, scheme.tettoSerie);
        if (level === 'principiante') sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente);   /* 2-3 serie impegnative (Barbell Medicine) */
        if (over65) { sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente); reps = Math.max(8, Math.min(12, reps)); }
        if (minore) { sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente); reps = Math.max(8, Math.min(15, reps)); }   /* ETA-02: al massimo 3 serie, 8-15 ripetizioni */
        if ((d.parq === 'si' || d.parq === true) && isComp) reps = Math.max(8, Math.min(12, reps));   /* pressione: 60-80%, niente apnea (ACSM) */
        if (donna) rest = Math.max(60, Math.round(rest * 0.85));   /* recupero piu rapido tra le serie (PeerJ 2025) */
        if (isTimeBased(e.name)) reps = meta ? meta.reps : 30;
        if (RX_NORDIC.test(senzaEmoji(e.name))) { sets = Math.min(sets, PARAM_NORDIC.serieMax); reps = ripetizioniFlessione(e.name); }   /* B1: al massimo 3 serie da 3-6 ripetizioni */
        rest = Math.round(rest / 15) * 15;
        return { name: e.name, sets: sets, reps: reps, weight: e.weight, rest: rest, fisso: fisso || undefined, riservaTirataV: e.riservaTirataV, protetto: e.protetto };   /* protetto (W0-T7): il pullover di CAS-14 passa dalla base alle sedute, come le aggiunte di strCopri e del ponte dei femorali */
      })
    };
    costruite.push(seduta);
    return seduta;
  });

  /* CAS-14 (ponte di W0-T2): dove la tirata verticale non c e e non c e nemmeno il pullover, il rematore ha una serie in piu (al massimo 4, 3 per chi inizia) */
  senzaSbarraSerieInPiu.forEach(i => {
    const rem = sedute[i].esercizi.find(e => schemaDi(e.name) === 'tirataO' && !e.fisso && !isTimeBased(e.name));
    if (rem) { rem.sets = Math.min(rem.sets + 1, level === 'principiante' || cauto ? COACH_PARAMETRI.serieMaxPrudente : 4); senzaSbarra = true; }
  });
  if (senzaSbarra) note.push('Senza sbarra la schiena si allena con rematori e pullover: meno completo.');
  if (pulloverMesso) note.push('Aggiunto: ' + senzaEmoji(nomeInLibreria('Pullover con Manubrio')) + ' \u2014 ogni settimana servono tutti e sei gli schemi di movimento.');   /* la stessa nota di PRG-21: il pullover e la riserva della tirata verticale (D-P11) */

  /* schemi di movimento mancanti nella settimana: si aggiungono dove c e posto */
  const presenti = {};
  sedute.forEach(sd => sd.esercizi.forEach(e => { const k = schemaDi(e.name); if (k) presenti[k] = 1; if (/landmine/i.test(senzaEmoji(e.name))) presenti.spintaV = 1; if (/pullover con manubrio/i.test(senzaEmoji(e.name)) && e.riservaTirataV) presenti.tirataV = 1; }));   /* il Landmine Press e una spinta verticale (SLOT_DEF.spintaV) anche se SCHEMI_MOV non lo riconosce; il pullover messo qui al posto della tirata verticale (CAS-14) la rappresenta: PRG-21 non ne aggiunge un secondo */
  SCHEMI_MOV.forEach(([k, rx, etichetta]) => {
    if (presenti[k] || (metodoAttivo && metodoAttivo.essenziale)) return;
    const cauto = over65 || d.parq === 'si' || d.parq === true || level === 'principiante';
    const cand = EXERCISE_LIBRARY.filter(x => rx.test(senzaEmoji(x.name)) && consentito(x.name, prefs))
      .sort((a, b) => cauto ? (tipoCarico(a.name) === 'pesante') - (tipoCarico(b.name) === 'pesante') : 0);
    if (!cand.length) return;
    const adatta = (sd) => /spinta|tirata/.test(k) ? /upper|push|pull|fullbody/.test(sd.tipo) : /lower|legs|fullbody/.test(sd.tipo);
    const dove = sedute.filter(adatta).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || sedute.slice().sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!dove) return;
    const ex = cand.find(x => !dove.esercizi.some(y => y.name === x.name)) || cand[0];
    const tipo = tipoCarico(ex.name);
    dove.esercizi.push({ name: ex.name, sets: Math.min(scheme.sets, 3), reps: tipo === 'pesante' ? Math.min(scheme.reps, 8) : Math.max(8, scheme.reps), weight: ex.weight || 0,
      rest: tipo === 'pesante' ? scheme.restCompound : Math.max(90, Math.round(scheme.restCompound * 0.75)), protetto: true });   /* W0-T7: la nota dice che e stato aggiunto, EXN-02 e il tempo non lo tolgono */
    presenti[k] = 1;
    note.push('Aggiunto: ' + senzaEmoji(ex.name) + ' \u2014 ogni settimana servono tutti e sei gli schemi di movimento.');
  });

  /* obiettivo glutei: le quattro famiglie */
  if (goals.indexOf('glutei') !== -1) {
    GLUTEI_FAMIGLIE.forEach(([k, rx, predef]) => {
      if (sedute.some(sd => sd.esercizi.some(e => rx.test(senzaEmoji(e.name)) && findExercise(e.name) && ['glutei', 'gambe'].indexOf(findExercise(e.name).group) !== -1))) return;
      const nome = nomeInLibreria(predef);
      if (!nome || !consentito(nome, prefs)) return;
      const dove = sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || sedute[0];
      if (dove) dove.esercizi.push({ name: nome, sets: 3, reps: 12, weight: (findExercise(nome) || {}).weight || 0, rest: 75 });
    });
    note.push('Glutei: spinta d anca, squat o affondi, stacchi e abduzioni ogni settimana.');
  }

  /* copertura per regioni (Schoenfeld, Maeo, Pedrosa): femorali in flessione di ginocchio,
     retto femorale con la leg extension, bicipite prossimale e distale, deltoide laterale */
  const settimanaNomi = () => [].concat.apply([], sedute.map(sd => sd.esercizi.map(e => senzaEmoji(e.name))));
  const aggiungiRegione = (rx, nomi, dove, testo) => {
    if (settimanaNomi().some(n => rx.test(n))) return;
    const nome = nomi.map(nomeInLibreria).find(n => n && consentito(n, prefs));
    if (!nome) return;
    const sd = sedute.filter(dove).sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!sd || sd.esercizi.length > nEs) return;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: 2, reps: m.reps && m.reps > 8 ? m.reps : 12, weight: m.weight || 0, rest: 75 });
    note.push(testo);
  };
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  const regioni = !(metodoAttivo && metodoAttivo.essenziale) && d.days >= 3 && goals[0] !== 'salute';
  /* B29 / PRG-23 (ponte dei femorali di W0-T2; il risolutore e W2-T1/W2-T6): da 2 giorni, anche per la salute, ogni seduta di gambe
     (lower, legs, full body) ha uno stacco o una flessione del ginocchio: dove manca si aggiunge un leg curl da 3 serie (2 ai principianti).
     Il femorale cosi si allena in ogni seduta di gambe e non solo in una, col rapporto giusto sui quadricipiti (collaudo FRQ-01, EQ-03, VOL-01) */
  if (!(metodoAttivo && metodoAttivo.essenziale) && d.days >= 2 && conGambe) {
    const flessioni = ['Leg Curl Seduto', 'Leg Curl Sdraiato', 'Nordic Curl'].map(nomeInLibreria).filter(n => n && consentito(n, prefs));
    const usi = (n) => sedute.filter(sd => sd.esercizi.some(e => e.name === n)).length;
    let aggiunti = 0, aggiuntiPonte = 0;
    const setsFlessione = level === 'principiante' ? 2 : 3;
    const eFlessione = (e) => /leg curl|nordic/i.test(senzaEmoji(e.name)), ePonte = (e) => /ponte glutei/i.test(senzaEmoji(e.name));
    /* B1 (revisione dell onda 0): senza macchine ne Nordic Curl (chi inizia, i prudenti, le ginocchia dolenti) non c e una flessione del ginocchio sicura da dare a casa: i femorali restano
       meno allenati e prendono il ponte glutei (credito 0,5: il ponte a una gamba per chi puo, quello a due gambe per chi inizia o e prudente) dove non c e gia. Le flessioni vere sono di W1-T5 */
    const ponte = !['Leg Curl Seduto', 'Leg Curl Sdraiato'].some(n => nomeInLibreria(n) && consentito(nomeInLibreria(n), prefs))
      ? ((level === 'principiante' || cauto) ? ['Ponte Glutei', 'Ponte Glutei a una Gamba'] : ['Ponte Glutei a una Gamba', 'Ponte Glutei']).map(nomeInLibreria).filter(n => n && consentito(n, prefs))[0] : null;
    sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).forEach(sd => {
      if (sd.esercizi.some(e => SLOT_DEF.hinge(e) || eFlessione(e)) || sd.esercizi.length > nEs + 1) return;
      /* W0-T7: non il giorno dopo un altra seduta dello stesso grande muscolo, e non oltre il tetto di serie per muscolo in una seduta (REC-01, SES-01) */
      const nome = flessioni.filter(n => !sd.esercizi.some(e => e.name === n) && usi(n) < maxSettimana(n) && recuperoOk(sd, sedute, n, setsFlessione)).sort((a, b) => usi(a) - usi(b))[0];
      if (nome) {
        const m = findExercise(nome) || {};
        sd.esercizi.push({ name: nome, sets: Math.min(setsFlessione, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75, protetto: true });
        aggiunti++;
      } else if (ponte && !sd.esercizi.some(ePonte) && usi(ponte) < RIPETIZIONI_SETTIMANA_MAX && recuperoOk(sd, sedute, ponte, COACH_PARAMETRI.serieMaxPrudente)) {
        const m = findExercise(ponte) || {};
        sd.esercizi.push({ name: ponte, sets: COACH_PARAMETRI.serieMaxPrudente, reps: Math.min(m.reps || 12, 15), weight: m.weight || 0, rest: 75 });   /* 3 serie anche a chi inizia: 1,5 serie frazionarie di femorali per seduta, la soglia della frequenza (FRQ-01). Non protetto: se la seduta ha troppi esercizi (EXN-02) o i minuti non bastano, e il primo a saltare */
        aggiuntiPonte++;
      }
    });
    /* e almeno una flessione del ginocchio nella settimana, anche se ogni seduta ha gia il suo stacco (aggiungiRegione dava 2 serie e solo con 3+ giorni) */
    if (flessioni.length && !settimanaNomi().some(n => /leg curl|nordic/i.test(n))) {
      const sd = sedute.filter(x => /lower|legs|fullbody/.test(x.tipo) && x.esercizi.length <= nEs + 1 && recuperoOk(x, sedute, flessioni[0], setsFlessione)).sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
      const nome = sd ? flessioni[0] : null;
      if (nome) {
        const m = findExercise(nome) || {};
        sd.esercizi.push({ name: nome, sets: Math.min(setsFlessione, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75, protetto: true });
        aggiunti++;
      }
    }
    if (aggiunti) note.push('Femorali: squat e hip thrust non li fanno crescere, serve la flessione del ginocchio (leg curl).');
    else if (aggiuntiPonte) note.push(NOTA_FEMORALI_SENZA_LEG_CURL);
  }
  if (regioni && conGambe) {
    if (goals.indexOf('massa') !== -1 || goals.indexOf('glutei') !== -1) aggiungiRegione(/leg extension/i, ['Leg Extension'], sd => /lower|legs|fullbody/.test(sd.tipo),
      'Retto femorale: cresce solo con la leg extension, schienale un po’ reclinato.');
  }
  if (regioni && (goals.indexOf('massa') !== -1 || goals.indexOf('ricomposizione') !== -1)) {
    if (settimanaNomi().some(n => /panca|chest press|piegamenti/i.test(n)))
      aggiungiRegione(/alzate laterali/i, ['Alzate Laterali ai Cavi', 'Alzate Laterali'], sd => /upper|push|fullbody/.test(sd.tipo),
        'Spalle larghe: la panca copre il deltoide anteriore, le alzate laterali quello laterale.');
    /* PRG-23 (B32, D-P8): bicipite. Con almeno 2 curl, uno e sulla panca inclinata (o il Bayesiano ai cavi): il muscolo lavora allungato (Pedrosa 2025).
       Lo Scott e lo Spider non si aggiungono piu al posto del curl inclinato: sono il secondo esercizio, non il primo */
    const curl = [];
    sedute.forEach(sd => sd.esercizi.forEach(e => { if (/curl/i.test(senzaEmoji(e.name)) && (findExercise(e.name) || {}).group === 'braccia' && !/leg curl|nordic/i.test(e.name)) curl.push(e); }));
    if (curl.length >= 2 && !curl.some(e => /panca inclinata|bayesiano/i.test(senzaEmoji(e.name)))) {
      const nuovo = ['Curl su Panca Inclinata', 'Curl Bayesiano ai Cavi'].map(nomeInLibreria).find(n => n && consentito(n, prefs) && !settimanaNomi().some(x => x === senzaEmoji(n)));
      if (nuovo) { const e = curl[curl.length - 1]; e.name = nuovo; e.weight = (findExercise(nuovo) || {}).weight || e.weight; note.push('Bicipite: un curl su panca inclinata, con il muscolo allungato, per crescere in tutta la lunghezza.'); }
    }
  }
  /* ABB-03: ogni settimana nessun buco (polpacci, deltoidi posteriori, core, braccia dirette) */
  strCopri({ sedute: sedute, goals: goals, level: level, days: Number(d.days) || 3, prefs: prefs, nEs: nEs, note: note, metodoAttivo: metodoAttivo });
  (prefs.fastidi || []).forEach(f => { if (SCALE_DOLORE[f]) note.push(SCALE_DOLORE[f]); });

  /* volume per muscolo: partenza per livello, tetto di 11 serie per seduta */
  let [vMin, vMax] = goals[0] === 'salute' ? [6, 12] : (VOLUME_LIVELLO[level] || VOLUME_LIVELLO.intermedio);
  /* fattore fisico: massa magra bassa = piu volume; in calo = meno */
  if (fis.ffmiBasso && goals[0] !== 'dimagrimento') { vMin = Math.round(vMin * COACH_PARAMETRI.fattoreVolumeFfmiBasso); vMax = Math.round(vMax * COACH_PARAMETRI.fattoreVolumeFfmiBasso); }
  if (fis.magraInCalo) { vMin = Math.round(vMin * 0.85); vMax = Math.round(vMax * 0.85); }
  /* esigenza del coach: +20% all inizio, poi segue l andamento (mai oltre il massimo del livello) */
  const moG = typeof momentoAttivo === 'function' ? momentoAttivo() : null;
  const esig = (cauto || (moG && !moG.scaduto && (moG.vol < 1 || moG.rir))) ? 1 :
    (d.esigenza || (prof0.esigenza && prof0.esigenza.valore) || esigenzaIniziale(d, prof0));   /* INT-02: parte dal corpo (BIA) */
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
  const maxGruppo = {};   /* il massimo di serie frazionarie a settimana per gruppo: serve anche al riempimento del tempo (sotto) */
  GRUPPI_PRINCIPALI.forEach(g => {
    const es = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => (findExercise(e.name) || {}).group === g && !isTimeBased(e.name))));
    if (!es.length) return;
    let min = vMin, max = vMax;
    if (prio.indexOf(g) !== -1) { min = Math.round(vMin * (specializza ? 1.5 : 1.2)); max = Math.round(vMax * (specializza ? 1.5 : 1.2)); }
    else if (specializza) { min = 6; max = vMin; }
    maxGruppo[g] = max;
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
  /* ABB-04 e ABB-08: tirate non meno delle spinte, il fondamentale non ha meno serie degli altri */
  strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs });
  if (prio.length) note.push((specializza ? 'Specializzazione: ' : 'Priorita: ') + prio.map(g => MUSCLE_GROUPS[g] ? MUSCLE_GROUPS[g].label : g).join(', ') + (specializza ? ' \u2014 +50% serie, gli altri gruppi a mantenimento.' : ' \u2014 qualche serie in piu.'));
  if (freqScelta) note.push(split.limite ? 'Con 2 giorni ogni muscolo si allena al massimo 2 volte a settimana.' :
    (split.freq === 1 ? 'Ogni muscolo una volta a settimana, come hai scelto: fino a 11 serie in una seduta, oltre si sprecano.' : 'Ogni muscolo ' + split.freq + ' volte a settimana, come hai scelto.'));

  /* principianti e over 65: mai piu di 3 serie per esercizio */
  if (level === 'principiante' || over65 || minore) sedute.forEach(sd => sd.esercizi.forEach(e => { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); }));
  /* poco sonno o molto stress: una serie in meno sugli accessori (dopo il volume) */
  if (prefs.sonno === 'male') sedute.forEach(sd => sd.esercizi.forEach((e, i) => { if (i > 0 && !e.fisso) e.sets = Math.max(2, e.sets - 1); }));
  if (!metodoAttivo) limitaVolumePerMuscolo(sedute, { volumeMax: PARAM_TEMPO.volumeMax[tipoObiettivoDi(goals)][level], volumeMin: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level] });
  /* EXN-02 (ponte di W0-T2): le aggiunte (schemi mancanti, regioni, copertura, femorali) non portano una seduta oltre 8 esercizi (6 per chi inizia):
     se succede, lascia la seduta l ultimo esercizio della ricetta che non e un aggiunta protetta, un fondamentale o un posto fisso */
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
  /* B1 (ponte di W0-T2): il taglio per il tempo usa lo stesso modello del riempimento (stimaMinutiSeduta), non piu «8 minuti + serie x (35 s + pausa)»,
     che sottostimava le sedute di forza e quelle a un lato solo: tolleranza del 5% (il collaudo segnala oltre il 10%) */
  const minutiDi = (sd) => stimaMinutiSeduta(sd.esercizi);
  sedute.forEach(sd => {
    let giri = 0;
    while (minutiDi(sd) > (Number(d.minutes) || 60) * (1 + PARAM_TEMPO.tolleranzaSforamento) && giri++ < 40) {
      const isPrio = (e) => prio.indexOf((findExercise(e.name) || {}).group) !== -1;
      const cand = sd.esercizi.filter(e => e.sets > 2 && !e.fisso).sort((a, b) => isPrio(a) - isPrio(b) || ((findExercise(a.name) || {}).type === 'compound') - ((findExercise(b.name) || {}).type === 'compound') || b.sets - a.sets)[0];
      if (cand) { cand.sets--; continue; }
      const iso = sd.esercizi.filter(e => (findExercise(e.name) || {}).type !== 'compound' && !e.protetto);
      const senzaCore = iso.filter(e => (findExercise(e.name) || {}).group !== 'core');   /* il core in fondo si toglie per ultimo (collaudo MIS-01:core) */
      const via = senzaCore.length ? senzaCore[senzaCore.length - 1] : iso[iso.length - 1];
      if (via && sd.esercizi.length > 3) { sd.esercizi.splice(sd.esercizi.lastIndexOf(via), 1); continue; }
      break;
    }
  });

  /* B1 / DUR-02 (ponte di W0-T2; il risolutore e W2-T2, dove il tempo diventa un tetto): una seduta che resta sotto l 85% dei minuti
     dichiarati prima allunga le pause, poi (dove il volume del muscolo lo consente) prende una serie in piu sugli esercizi non fissi.
     Le pause lunghe sui fondamentali hanno prove (ACSM 2009: 2-3 minuti; Schoenfeld 2016) e dentro i tetti per tipo; con un metodo famoso decide il metodo */
  if (!(metodoAttivo && metodoAttivo.essenziale) && conGambe && d.days >= 2) rinforzaFemorali({ sedute: sedute, prefs: prefs, minuti: Number(d.minutes) || 60, maxEsercizi: maxEsSeduta, setsNuovo: level === 'principiante' ? 2 : 3,
    maxSerieFlessione: level === 'principiante' || cauto ? COACH_PARAMETRI.serieMaxPrudente : (level === 'avanzato' ? 5 : 4),
    minimo: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level][0] });
  if (!metodoAttivo) sedute.forEach(sd => riempiTempo(sd, { sedute: sedute, minuti: Number(d.minutes) || 60, obiettivo: goals[0], donna: donna, maxSerie: (level === 'principiante' || cauto) ? COACH_PARAMETRI.serieMaxPrudente : 4,
    volumeMax: PARAM_TEMPO.volumeMax[tipoObiettivoDi(goals)][level],
    volumeMin: PARAM_TEMPO.volumeMin[tipoObiettivoDi(goals)][level],
    maxEsercizi: maxEsSeduta, prefs: prefs, reps: scheme.reps, restMacchina: Math.max(90, Math.round(scheme.restCompound * 0.75)), restIso: Math.max(60, scheme.restIso) }));

  /* ABB-08 e ABB-09: a tempo sistemato, il fondamentale ha le sue serie e gli stacchi da terra restano a 3 al massimo */
  strFinale({ sedute: sedute, level: level, over65: over65, metodoAttivo: metodoAttivo });
  strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs }, true);   /* il tempo e le serie spostate possono aver rotto l equilibrio: niente serie in piu */
  /* ORD-03 (ponte di W0-T2): i grandi gruppi prima dei piccoli (ACSM 2009). Un multiarticolare di spalle o braccia non sta prima di uno squat o di uno stacco,
     salvo il muscolo che l utente ha messo in priorita (ABB-10). Le ricette full body hanno la spinta verticale prima dello squat */
  if (!metodoAttivo) sedute.forEach(sd => {
    if (sd.tipo === 'punti') return;
    const piccolo = (e) => { const m = findExercise(e.name) || {}; return m.type === 'compound' && !isTimeBased(e.name) && (m.group === 'spalle' || m.group === 'braccia') && prefs.priorita.indexOf(m.group) === -1; };
    const basso = (e) => { const m = findExercise(e.name) || {}; return m.type === 'compound' && !isTimeBased(e.name) && (schemaDi(e.name) === 'squat' || schemaDi(e.name) === 'hinge'); };
    sd.esercizi.slice().filter(piccolo).forEach(a => {
      let ultimo = -1;
      sd.esercizi.forEach((x, i) => { if (basso(x)) ultimo = i; });
      if (ultimo > sd.esercizi.indexOf(a)) { sd.esercizi.splice(sd.esercizi.indexOf(a), 1); sd.esercizi.splice(ultimo, 0, a); }   /* dopo l ultimo multiarticolare delle gambe (l indice e gia scalato di uno) */
    });
  });
  /* tecniche: poco tempo = superserie e drop set; over 65 = potenza ed equilibrio;
     avanzati = serie AMRAP e back-off sui fondamentali */
  let dropAssegnato = false, potenzaAssegnata = false;
  sedute.forEach(sd => {
    const es = sd.esercizi;
    if (poco && !metodoAttivo) {   /* con un metodo famoso decide il metodo (coppie, tecniche) */
      strSuperserie(sd);   /* ABB-06: solo antagonisti, mai con un fondamentale pesante */
      /* MAV-02 e MAV-03: il drop set per fare prima solo a chi puo andare vicino al cedimento e mai sul core, a tempo, a peso zero, sugli stacchi */
      if (tecnicheOk) {
        const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !senzaCedimentoPer(e.name, prefs.fastidi));
        const leggeri = iso.length ? iso : es.filter(e => tipoCarico(e.name) === 'macchina' && !e.tecnica && !senzaCedimentoPer(e.name, prefs.fastidi));
        /* W0-T7 (collaudo DUR-01): il drop set costa tempo (secDrop) e arriva dopo il taglio per il tempo: solo se la seduta ci sta ancora */
        if (leggeri.length && ps.intensita !== 'bassa' && stimaMinutiSeduta(es) + PARAM_TEMPO.secDrop / 60 <= (Number(d.minutes) || 60) * (1 + PARAM_TEMPO.tolleranzaSforamento)) { leggeri[leggeri.length - 1].tecnica = 'drop'; dropAssegnato = true; }
      }
    }
    const primo = es.find(e => (findExercise(e.name) || {}).type === 'compound');
    /* over 65: «potenza» solo sul primo multiarticolare su macchina (la libreria non ha l alzata dalla sedia): niente carico libero sotto velocita */
    const primoGuidato = over65 ? es.find(e => (findExercise(e.name) || {}).type === 'compound' && attrezzoDi(senzaEmoji(e.name)) === 'macchine') : null;
    if (primoGuidato) { primoGuidato.tecnica = 'potenza'; potenzaAssegnata = true; }
    else if (!minore && (parqSi || over65)) es.forEach(e => { if (tipoCarico(e.name) === 'pesante') e.tecnica = 'cluster'; });   /* il cluster non e per i minorenni (matrice MAV 3.3, G1c) */
    else if (tecnicheOk && primo && tipoCarico(primo.name) === 'pesante' && ps.intensita !== 'bassa' && !senzaCedimentoPer(primo.name, prefs.fastidi)) primo.tecnica = level === 'avanzato' ? 'backoff' : 'amrap';
    if ((level === 'avanzato' || (level === 'intermedio' && ps.intensita === 'alta')) && !poco && ps.intensita !== 'bassa' && tecnicheOk) { const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !senzaCedimentoPer(e.name, prefs.fastidi) && !e.tecnica); if (iso.length) iso[iso.length - 1].tecnica = 'parziali'; }
  });
  /* il metodo scelto decide serie, ripetizioni e pause */
  if (metodoAttivo && metodoAttivo.schema) sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
    delete e.tecnica; metodoAttivo.schema(e, i, sd);
    if (isTimeBased(e.name)) e.reps = (findExercise(e.name) || {}).reps || e.reps;
    /* i tetti di sicurezza valgono anche col metodo (revisione dell onda 0): il Nordic Curl al massimo 3 serie da 3-6 ripetizioni; minorenni e over 65 al massimo 3 serie (ETA-02, over 65: 8-12 ripetizioni) */
    if (RX_NORDIC.test(senzaEmoji(e.name))) { e.sets = Math.min(e.sets, PARAM_NORDIC.serieMax); e.reps = ripetizioniFlessione(e.name); }
    if (over65 || minore) { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); if (!isTimeBased(e.name) && !RX_NORDIC.test(senzaEmoji(e.name))) e.reps = over65 ? Math.max(8, Math.min(12, e.reps)) : Math.max(8, Math.min(15, e.reps)); }
    /* MAV-02 e MAV-03 anche per i metodi famosi: l AMRAP di GreySkull, GZCLP e Reddit PPL non e per chi inizia, ne per minorenni, over 65 e modalita prudente, ne per core, tempo, peso zero e stacchi */
    if (TECNICHE_AL_CEDIMENTO.indexOf(e.tecnica) !== -1 && (!tecnicheOk || senzaCedimentoPer(e.name, prefs.fastidi))) delete e.tecnica;
  }));
  /* la Recommended Routine mette 3 serie a tutti (schema): l equilibrio tra spinte e tirate si rifa dopo, a casa dove la tirata e il solo rematore inverso (W0-T7) */
  if (metodoAttivo && metodoAttivo.id === 'rr') strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs }, true);
  if (tocco) sedute.forEach(sd => TOCCHI[tocco.m.tocco].fa(sd, ps, { tecnicheOk: tecnicheOk, senzaCedimento: (n) => senzaCedimentoPer(n, prefs.fastidi) }));
  if (metodoAttivo && metodoAttivo.superserie) sedute.forEach(sd => {
    if (metodoAttivo.id !== 'rr') { strSuperserie(sd); return; }   /* ABB-06; la Recommended Routine ha le sue coppie (trazione + squat, dip + hinge...) */
    const es = sd.esercizi; const accoppiabile = (x) => !isTimeBased(x.name) && (findExercise(x.name) || {}).group !== 'core';   /* SS-02: ne il core ne i tempi in coppia */
    for (let k = 1; k < es.length; k++) { if (!es[k - 1].superset && !es[k].superset && accoppiabile(es[k - 1]) && accoppiabile(es[k])) { es[k].superset = true; k++; } }
  });
  /* regola del picco e della fine: chi non ama la fatica ricorda meglio una seduta che finisce leggera */
  if (ps.intensita === 'bassa') sedute.forEach(sd => { const u = sd.esercizi[sd.esercizi.length - 1]; if (u && !u.fisso && u.sets > 2) u.sets--; });
  ritrattoCoach(ps).slice(0, 4).forEach(r => note.push(r));
  fis.testi.forEach(t => note.push(t));
  if (!cauto) statoBia(d, prof0).testi.forEach(t => note.push(t));   /* INT-01 */
  /* la nota dice quello che il programma fa davvero (B3, gap analysis: lo leggeva anche chi non ha il drop set o chi non deve andare al cedimento) */
  if (poco && !metodoAttivo) {
    if (dropAssegnato) note.push('Poco tempo: spinte e tirate in superserie (-37% di tempo, stessi risultati) e drop set sull ultimo isolamento.');
    else note.push('Poco tempo: spinte e tirate in superserie (-37% di tempo, stessi risultati).');
    if (!tecnicheOk) note.push('Per ora niente serie al cedimento: la tecnica viene prima. Per fare prima ti propongo le superserie.');
  }
  if (over65) note.push(potenzaAssegnata ? 'Dai 65 anni: 2-3 serie da 8-12, niente cedimento, il primo esercizio veloce in salita per la potenza e 5 minuti di equilibrio a fine seduta.'
    : 'Dai 65 anni: 2-3 serie da 8-12, niente cedimento e 5 minuti di equilibrio a fine seduta.');
  if (minore) {   /* ETA-02 e ETA-03: profilo minorenne */
    note.push('Alla tua età conta imparare bene i movimenti: niente massimali né serie al limite, lascia sempre 2-3 ripetizioni in riserva.');
    note.push('Allenati con un adulto o un istruttore: la tecnica viene prima dei carichi.');
  }
  if (donna) note.push('Pause un po piu corte: le donne recuperano piu in fretta tra una serie e l altra.');
  if (goals[0] === 'dimagrimento' || goals.indexOf('dimagrimento') !== -1) note.push('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo.');

  /* avanzati: mesociclo con RIR che scende settimana dopo settimana */
  const fasi = fasiProgramma(struttura);
  let rirSett = null;
  if (level === 'avanzato' && !minore) {
    rirSett = [];
    let k = 0;
    fasi.forEach(f => { if (f === 'scarico') { rirSett.push(4); k = 0; } else { const n = struttura.blocco - 1; rirSett.push(Math.max(0, Math.round(3 - 3 * k / Math.max(1, n - 1)))); k++; } });
    note.push('Mesociclo: ripetizioni in riserva 3, 2, 1, 0 nelle settimane di carico, poi scarico.');
  }
  /* ETA-02: il minorenne lavora sempre con almeno 2 ripetizioni in riserva (rirBersaglioBase legge rirSett: il bersaglio e [2, 3], 4 nello scarico) */
  if (minore) rirSett = fasi.map(f => f === 'scarico' ? 4 : 2);

  /* esercizi alternativi scelti dall utente: stessi muscoli, stesso posto */
  const scelte = d.scelte || {};
  if (Object.keys(scelte).length) sedute.forEach(sd => sd.esercizi.forEach(e => {
    const n = scelte[e.name], m = n ? findExercise(n) : null;
    if (!m || sd.esercizi.some(x => x !== e && x.name === n)) return;
    e.originale = e.name; e.name = n; e.weight = m.weight || 0;
  }));

  /* carichi di partenza: dai dati del corpo (BIA) e, se ci sono, dallo storico; senza consenso restano quelli della libreria */
  if (coachAttivo()) {
    const cc = contestoCarichi(d, prof0);
    cc.storico = scalaDaStorico();
    let stimati = 0, fonteStima = null;
    sedute.forEach(sd => sd.esercizi.forEach(e => {
      const s = stimaCaricoIniziale(e.name, cc);
      if (s) { e.weight = s.peso; e.stimato = s.fonte; stimati++; fonteStima = fonteStima || s.fonte; }
    }));
    if (stimati) note.push({ smm: 'Carichi di partenza stimati dalla tua massa muscolare, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
      ffm: 'Carichi di partenza stimati dalla tua massa magra, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
      peso: 'Carichi di partenza stimati dal tuo peso, dal livello e dall’età: senza la BIA sono meno precisi, si regolano nelle prime sedute.',
      storico: 'Carichi di partenza stimati da quello che sollevi già: si regolano nelle prime sedute.' }[fonteStima]);
  }

  /* B1 (revisione dell onda 0): il tetto del Nordic Curl vale alla fine, qualunque passo abbia aggiunto serie (volume per muscolo, riempimento del tempo, metodo): 3 serie da 3-6 ripetizioni */
  sedute.forEach(sd => sd.esercizi.forEach(e => { if (RX_NORDIC.test(senzaEmoji(e.name))) { e.sets = Math.min(e.sets, PARAM_NORDIC.serieMax); e.reps = Math.min(e.reps, PARAM_NORDIC.ripetizioniMax); } }));
  sedute.forEach(sd => sd.esercizi.forEach(e => { delete e.protetto; delete e.riservaTirataV; }));   /* ABB-03: serviva solo a non tagliare le aggiunte per il tempo */
  /* W0-T7 (decisione del committente, SAF-04): il rematore inverso e l unica tirata orizzontale senza attrezzi e resta anche a casa, con la nota che dice dove farlo e la prudenza sul tavolo */
  if (sedute.some(sd => sd.esercizi.some(e => /rematore inverso/i.test(senzaEmoji(e.name))))) note.push(NOTA_REMATORE_INVERSO);
  /* carico ridotto richiesto dal metodo (es. 8x8 col 70% del carico delle 8 ripetizioni), dopo la stima dai dati del corpo */
  sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (!e.fattoreCarico) return;
    const m = findExercise(e.name);
    if (m && e.weight > 0) e.weight = arrotondaPartenza(m, e.weight * e.fattoreCarico);
    delete e.fattoreCarico;
  }));

  return {
    goals: goals, scheme: scheme, split: split, sedute: sedute, prefs: prefs,
    metodo: metodoAttivo ? metodoAttivo.id : null, ispirazioni: ispirazioni, fisico: fis,
    sostituzioni: sostituzioni, note: note,
    riposo: DAYS.filter(g => !sedute.some(s => s.giorno === g)),
    settimane: struttura.settimane, blocco: struttura.blocco, fasi: fasi, rirSett: rirSett,
    eserciziPerSeduta: nEs, seme: seme
  };
};
