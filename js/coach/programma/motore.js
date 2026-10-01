/* Coach engine: costruzione del programma
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH ENGINE: costruzione del programma
   Dalla ricerca:
   - un blocco di lavoro dura 4-8 settimane, con uno SCARICO ogni 4-8;
     ai principianti bastano blocchi corti (3 settimane + 1 di scarico)
   - nello scarico si tagliano le serie del 30-50% e si alleggerisce il carico
   - piu obiettivi insieme: uno guida, gli altri correggono. Massimizzare
     tutto nello stesso blocco non funziona meglio che alternare.
   ============================================================ */

/* Durata e struttura in base all esperienza */
function strutturaProgramma(level) {
  if (level === 'principiante') return { settimane: 8, blocco: 4 };    /* 2 blocchi da 3+1 */
  if (level === 'avanzato') return { settimane: 12, blocco: 6 };       /* 2 blocchi da 5+1 */
  return { settimane: 12, blocco: 4 };                                 /* 3 blocchi da 3+1 */
}

function fasiProgramma(struttura) {
  const fasi = [];
  for (let w = 1; w <= struttura.settimane; w++) fasi.push(w % struttura.blocco === 0 ? 'scarico' : 'carico');
  return fasi;
}

/* ---- Attrezzatura e fastidi: esercizi da evitare e con cosa sostituirli ---- */
function attrezzoDi(nome) {
  const n = nome.toLowerCase();
  if (/piegamenti|mani rialzate/.test(n)) return 'corpo';   /* anche con le mani su una panca: niente manubri ("ri-alzate" non e "alzate") */
  if (/un piede|corpo libero|sissy|pike|sit-up|sedia romana|diamante/.test(n)) return 'corpo';
  if (/manubri|concentrazione/.test(n) && !/cavi|cavo|macchin/.test(n)) return 'manubri';   /* "Lento Avanti Manubri" non e da bilanciere */
  if (/macchin|leg press|leg extension|leg curl|hack|pectoral|chest press|shoulder press|lat machine|pulley|cavi|cavo|abductor|adductor|smith|t-bar|multipower|pendulum|pec deck|pallof|pushdown|face pull|pulldown|woodchop|calf raise/.test(n)) return 'macchine';   /* il calf raise e alla macchina o al multipower: a corpo libero c e solo quello a un piede */
  if (/bilanciere|stacco|good morning|squat con|front squat|rematore con b|military|lento avanti|french press|panca presa stretta|panca declinata|trap bar|landmine|hip thrust|tirate al mento|panca scott|yates/.test(n)) return 'bilanciere';
  if (/manubri|goblet|arnold|hammer|croci|alzate|scrollate|kickback|pullover|concentrat|panca inclinata|petto appoggiato|farmer|y-raise|spider|zottman/.test(n)) return 'manubri';
  return 'corpo';
}

const RISCHIO = {
  spalle: /military|lento avanti|arnold|tirate al mento|dip|panca piana bilanciere|pullover|shoulder press/i,
  ginocchia: /squat|affondi|leg extension|step-up|hack|bulgar|jump|salti|pistol/i,
  schiena: /stacco|good morning|rematore con bilanciere|squat con bilanciere|hyperextension|t-bar/i
};

function consentito(nome, prefs) {
  const a = attrezzoDi(nome);
  if ((prefs.odiati || []).indexOf(nome) !== -1) return false;
  /* attrezzi della TUA palestra: il coach propone solo cio che trovi */
  if (prefs.attrezziPalestra && prefs.attrezziPalestra.length && a !== 'corpo' && prefs.attrezziPalestra.indexOf(a) === -1) return false;
  if (/sbarra|trazioni/i.test(nome) && prefs.attrezziPalestra && prefs.attrezziPalestra.length && prefs.attrezziPalestra.indexOf('sbarra') === -1) return false;
  if (prefs.luogo === 'manubri' && (a === 'macchine' || a === 'bilanciere')) return false;
  if (prefs.luogo === 'corpo' && a !== 'corpo') return false;
  return !(prefs.fastidi || []).some(f => RISCHIO[f] && RISCHIO[f].test(nome));
}

/* Sostituto: stesso gruppo, stesso tipo se possibile, attrezzo consentito,
   nella direzione preferita (pesi liberi o macchine) */
function sostituto(nome, prefs, usati) {
  const meta = findExercise(nome);
  if (!meta) return null;
  const candidati = EXERCISE_LIBRARY.filter(e => e.group === meta.group && e.name !== nome &&
    usati.indexOf(e.name) === -1 && consentito(e.name, prefs));
  const sch = schemaDi(nome), bersaglio = isolamentoDi(nome);
  const punteggio = (e) => (e.type === meta.type ? 10 : 0) +
    (sch && schemaDi(e.name) === sch ? 8 : 0) + (bersaglio && isolamentoDi(e.name) === bersaglio ? 6 : 0) +
    (inAllungamento(e.name) ? 2 : 0) + ((prefs.graditi || []).indexOf(e.name) !== -1 ? 4 : 0) +
    (prefs.attrezzi === 'macchine' && attrezzoDi(e.name) === 'macchine' ? 3 : 0) +
    (prefs.attrezzi === 'liberi' && (attrezzoDi(e.name) === 'bilanciere' || attrezzoDi(e.name) === 'manubri') ? 3 : 0);
  candidati.sort((a, b) => punteggio(b) - punteggio(a));
  return candidati[0] || null;
}

/* ---- Mescolare fino a tre obiettivi ----
   Il primo decide lo schema. Gli altri correggono singoli aspetti:
   forza -> il primo multiarticolare della seduta diventa pesante (5x5)
   massa -> gli isolamenti passano a 3x12
   dimagrimento -> recuperi piu brevi e una nota sul cardio
   ricomposizione / salute -> tetto al volume */
function schemaMisto(goals) {
  const primo = schemeFor(goals[0]);
  const altri = goals.slice(1);
  const s = Object.assign({}, primo, {
    forzaSulPrimo: altri.indexOf('forza') !== -1,
    isoMassa: altri.indexOf('massa') !== -1,
    tettoSerie: (altri.indexOf('ricomposizione') !== -1 || altri.indexOf('salute') !== -1) ? 4 : 99,
    cardio: goals.indexOf('dimagrimento') !== -1
  });
  /* col dimagrimento le pause NON si accorciano: servono a tenere i carichi */
  return s;
}
