/* Coach engine: costruzione del programma
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH ENGINE: costruzione del programma
   Dalla ricerca:
   - un blocco di lavoro dura 4-8 settimane, con uno SCARICO ogni 4-8 (mesociclo.js)
   - piu obiettivi insieme: uno guida, gli altri correggono. Massimizzare
     tutto nello stesso blocco non funziona meglio che alternare.
   Sicurezza e segnali (onda 0, W0-T5): RISCHIO e consentito sotto (SAF-01, SEL-11,
   REC-04 ponte per il ginocchio, CAS-01 guardia degli attrezzi di casa).
   ============================================================ */

/* Durata e struttura del programma (strutturaProgramma, fasiProgramma, pianoMesociclo): js/coach/programma/mesociclo.js dal generatore a stadi (W1-T4). */

/* ---- Attrezzatura e fastidi: esercizi da evitare e con cosa sostituirli ---- */
function attrezzoDi(nome) {
  const n = nome.toLowerCase();
  if (/asciugamano/.test(n)) return 'corpo';   /* W1-T5: il leg curl con l asciugamano non e alla macchina */
  if (/seal row|suitcase/.test(n)) return 'manubri';   /* W1-T5: il nome non lo dice */
  if (/piegamenti|mani rialzate/.test(n)) return 'corpo';   /* anche con le mani su una panca: niente manubri ("ri-alzate" non e "alzate") */
  if (/un piede|corpo libero|sissy|pike|sit-up|sedia romana|diamante/.test(n)) return 'corpo';
  if (/manubri|concentrazione/.test(n) && !/cavi|cavo|macchin/.test(n)) return 'manubri';   /* "Lento Avanti Manubri" non e da bilanciere */
  if (/macchin|leg press|leg extension|leg curl|hack|pectoral|chest press|shoulder press|lat machine|pulley|cavi|cavo|abductor|adductor|smith|t-bar|multipower|pendulum|pec deck|pallof|pushdown|face pull|pulldown|woodchop|calf raise|belt squat/.test(n)) return 'macchine';   /* il calf raise e alla macchina o al multipower: a corpo libero c e solo quello a un piede */
  if (/bilanciere|stacco|good morning|squat con|front squat|rematore con b|military|lento avanti|french press|panca presa stretta|panca declinata|trap bar|landmine|hip thrust|tirate al mento|panca scott|yates|panca con pausa/.test(n)) return 'bilanciere';
  if (/manubri|goblet|squat sumo|arnold|hammer|croci|alzate|scrollate|kickback|pullover|concentrat|panca inclinata|petto appoggiato|farmer|y-raise|spider|zottman/.test(n)) return 'manubri';
  return 'corpo';
}

/* Esercizi che un fastidio dichiarato toglie dal programma (regex sul nome).
   SAF-01 (B25, buchi di RISCHIO): spalle + Pike Push-up; schiena + Front Squat, Rematore Presa Inversa (Yates).
   SEL-11 (ponte): schiena + Sit-up, Russian Twist, Crunch a Terra (restano plank, dead bug, bird dog).
   B13 (REC-04 ponte): ginocchia SENZA leg extension e leg press, coerente con SCALE_DOLORE.ginocchia (leg extension isometrica,
   ampiezza senza dolore): il ginocchio dolente si modifica, non si toglie ogni lavoro per i quadricipiti. Resta fuori il resto
   dello squat e degli affondi (vedi ECCEZIONI_RISCHIO per il solo squat a corpo libero). */
const RISCHIO = {
  spalle: /military|lento avanti|arnold|tirate al mento|dip|panca piana bilanciere|panca con pausa|pullover|shoulder press|pike|piegamenti declinati/i,   /* i piegamenti declinati (piedi rialzati) caricano la spalla come la panca inclinata (STRESS_ZONA.spalla): a casa restano quelli a terra e inclinati */
  ginocchia: /squat|affondi|step-up|hack|bulgar|jump|salti|pistol/i,
  schiena: /stacco|good morning|rematore con bilanciere|squat con bilanciere|squat con pausa|hyperextension|t-bar|front squat|rematore presa inversa|yates|sit-up|russian twist|crunch a terra/i
};
/* B33 (REC-04 ponte): con le ginocchia dolenti resta almeno un esercizio per i quadricipiti. Con le macchine c e la leg press; senza
   (a casa, o in una palestra con solo pesi liberi) lo squat a corpo libero, ad ampiezza senza dolore (la nota e in SCALE_DOLORE), passa
   anche se il regex dello squat lo toglierebbe: senza di lui i quadricipiti restano a zero (collaudo MIS-01). Wall Sit e leg extension
   passano gia: non sono nel regex. quando(prefs): dove vale l eccezione (solo senza macchine: con le macchine non serve). */
const ECCEZIONI_RISCHIO = { ginocchia: { nome: /^squat a corpo libero$/i, quando: p => senzaMacchine(p) } };
function senzaMacchine(prefs) {
  if (prefs.luogo === 'manubri' || prefs.luogo === 'corpo') return true;
  return !!(prefs.attrezziPalestra && prefs.attrezziPalestra.length && prefs.attrezziPalestra.indexOf('macchine') === -1);
}
/* CAS-01 (guardia, B28): a casa (manubri o corpo libero) non si da per certo un attrezzo che il questionario non chiede.
   L attrezzo vero e il campo di DETTAGLI (dettaglioEsercizio().att); finche l utente non lo dichiara (W2-T5) quegli esercizi non entrano.
   La sbarra bassa o gli anelli (rematore inverso) restano a corpo libero: e l unica tirata orizzontale senza manubri, senza di lui
   la schiena non si allena per niente (collaudo MIS-01:schiena, sev 4 contro SAF-04, sev 2); con i manubri c e il rematore. */
const ATTREZZI_NON_DI_CASA = /^(sbarra|parallele|sedia romana|panca per lombari|panca a 45°|ruota addominale|elastico|kettlebell|anelli)$/i;   /* W1-T5, D-P3: elastici, kettlebell e anelli finche W2-T5 non li fa dichiarare */
const ATTREZZI_NON_CON_I_MANUBRI = /^(sbarra bassa o anelli)$/i;
function attrezzoFisicoDi(nome) { const d = dettaglioEsercizio(nome); return d ? d.att : ''; }
function attrezzoDiCasaMancante(nome, luogo) {
  if (luogo !== 'manubri' && luogo !== 'corpo') return false;
  const att = attrezzoFisicoDi(nome);
  return ATTREZZI_NON_DI_CASA.test(att) || (luogo === 'manubri' && ATTREZZI_NON_CON_I_MANUBRI.test(att));
}
/* INT-1 (completa la patch di W1-T5, D-P3): con un elenco di attrezzi della palestra dichiarato (Opzioni, onboarding) elastici, kettlebell e anelli non ci sono: l utente non puo ancora
   dichiararli (lo fa W2-T5), quindi il coach non li propone (a casa li toglie ATTREZZI_NON_DI_CASA). Senza elenco la palestra e completa e valgono come prima. */
const ATTREZZI_NON_DICHIARABILI_IN_PALESTRA = /^(elastico|kettlebell|anelli)$/i;
function eccezioneRischio(f, nome, prefs) {
  const e = ECCEZIONI_RISCHIO[f];
  return !!(e && e.nome.test(senzaEmoji(nome).trim()) && e.quando(prefs));
}

function consentito(nome, prefs) {
  const a = attrezzoDi(nome);
  if ((prefs.odiati || []).indexOf(nome) !== -1) return false;
  if ((prefs.esclusi || []).indexOf(nome) !== -1) return false;   /* esclusi dal coach per sicurezza (revisione dell onda 0, B1: il Nordic Curl), non per gusto */
  /* attrezzi della TUA palestra: il coach propone solo cio che trovi */
  if (prefs.attrezziPalestra && prefs.attrezziPalestra.length && a !== 'corpo' && prefs.attrezziPalestra.indexOf(a) === -1) return false;
  if (/sbarra|trazioni/i.test(nome) && prefs.attrezziPalestra && prefs.attrezziPalestra.length && prefs.attrezziPalestra.indexOf('sbarra') === -1) return false;
  if (prefs.luogo === 'palestra' && prefs.attrezziPalestra && prefs.attrezziPalestra.length && ATTREZZI_NON_DICHIARABILI_IN_PALESTRA.test(attrezzoFisicoDi(nome))) return false;   /* INT-1, D-P3 */
  if (prefs.luogo === 'manubri' && (a === 'macchine' || a === 'bilanciere')) return false;
  if (prefs.luogo === 'corpo' && a !== 'corpo') return false;
  if (attrezzoDiCasaMancante(nome, prefs.luogo)) return false;   /* CAS-01 */
  return !(prefs.fastidi || []).some(f => RISCHIO[f] && RISCHIO[f].test(nome) && !eccezioneRischio(f, nome, prefs));
}

/* Sostituto: SOLO con lo stesso muscolo bersaglio, o la stessa famiglia per i multiarticolari totali
   (alternativeStessoMuscolo), attrezzo consentito.
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
   I multiarticolari totali (famigliaTotaleDi: stacco da terra, trap bar, sumo) allenano catena posteriore
   e tutte le gambe insieme: le loro alternative sono solo gli altri della stessa famiglia, che coprono
   tutto l insieme. Gli esercizi di un muscolo solo restano sul bersaglio (e possono proporre un
   multiarticolare totale con lo stesso bersaglio: allena anche quel muscolo).
   prefs: come per consentito() (attrezzi, fastidi, odiati, graditi); esclusi: nomi da non proporre
   (es. quelli gia in seduta); opz.attrezzoDiverso: prima gli attrezzi diversi da quello dell esercizio
   (macchinario occupato); opz.bonus(x): punti in piu decisi da chi chiama; opz.max: quante al massimo (6).
   Ritorna [{ ex, stessoMov, punti }] dalla migliore. */
function alternativeStessoMuscolo(nome, prefs, esclusi, opz) {
  const m = findExercise(nome), b = bersaglioDi(nome), fam = famigliaTotaleDi(nome);
  if (!m || !b) return [];
  const o = opz || {}, p = prefs || {};
  const fuori = (esclusi || []).map(senzaEmoji);
  const sch = schemaDi(m.name), att = attrezzoDi(m.name), graditi = p.graditi || [];
  const stessoLavoro = fam ? (x => famigliaTotaleDi(x.name) === fam) : (x => bersaglioDi(x.name) === b);
  return EXERCISE_LIBRARY
    .filter(x => x.name !== m.name && stessoLavoro(x) && fuori.indexOf(senzaEmoji(x.name)) === -1 && consentito(x.name, p))
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
