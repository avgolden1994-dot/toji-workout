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

/* Sostituto: SOLO con lo stesso muscolo bersaglio (alternativeStessoMuscolo), attrezzo consentito.
   Tra quelli adatti vince chi ha lo stesso movimento e tipo, e la direzione preferita (allungamento,
   graditi, pesi liberi o macchine). Se non c e nessun esercizio dello stesso muscolo ritorna null:
   chi chiama lascia l esercizio dov e (mai uno per un altro muscolo). */
function sostituto(nome, prefs, usati) {
  const bonus = (e) => (inAllungamento(e.name) ? 2 : 0) + ((prefs.graditi || []).indexOf(e.name) !== -1 ? 2 : 0) +   /* +2 dei graditi e gia in alternativeStessoMuscolo: in tutto 4, come prima */
    (prefs.attrezzi === 'macchine' && attrezzoDi(e.name) === 'macchine' ? 3 : 0) +
    (prefs.attrezzi === 'liberi' && (attrezzoDi(e.name) === 'bilanciere' || attrezzoDi(e.name) === 'manubri') ? 3 : 0);
  const alt = alternativeStessoMuscolo(nome, prefs, usati, { max: 1, bonus: bonus });
  return alt.length ? alt[0].ex : null;
}

/* Alternative con lo STESSO muscolo bersaglio (bersaglioDi, da DETTAGLI): mai un altro muscolo,
   anche a costo di proporne poche o nessuna. Movimento, tipo e attrezzo servono solo a ordinare.
   prefs: come per consentito() (attrezzi, fastidi, odiati, graditi); esclusi: nomi da non proporre
   (es. quelli gia in seduta); opz.attrezzoDiverso: prima gli attrezzi diversi da quello dell esercizio
   (macchinario occupato); opz.bonus(x): punti in piu decisi da chi chiama; opz.max: quante al massimo (6).
   Ritorna [{ ex, stessoMov, punti }] dalla migliore. */
function alternativeStessoMuscolo(nome, prefs, esclusi, opz) {
  const m = findExercise(nome), b = bersaglioDi(nome);
  if (!m || !b) return [];
  const o = opz || {}, p = prefs || {};
  const fuori = (esclusi || []).map(senzaEmoji);
  const sch = schemaDi(m.name), att = attrezzoDi(m.name), graditi = p.graditi || [];
  return EXERCISE_LIBRARY
    .filter(x => x.name !== m.name && bersaglioDi(x.name) === b && fuori.indexOf(senzaEmoji(x.name)) === -1 && consentito(x.name, p))
    .map(x => {
      const stessoMov = !!sch && schemaDi(x.name) === sch;
      const punti = (stessoMov ? 10 : 0) + (x.type === m.type ? 5 : 0) + (o.attrezzoDiverso && attrezzoDi(x.name) !== att ? 4 : 0) +
        (PRIORI[senzaEmoji(x.name)] || 1) + (graditi.indexOf(x.name) !== -1 ? 2 : 0) + (o.bonus ? o.bonus(x) : 0);
      return { ex: x, stessoMov: stessoMov, punti: punti };
    })
    .sort((a, c) => c.punti - a.punti)
    .slice(0, o.max || 6);
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
