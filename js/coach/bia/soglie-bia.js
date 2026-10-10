/* Soglie del cibo e della BIA (COR-03)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   Soglie del Preparatore (cartella bia/), formato di js/coach/regia/soglie-regia.js: { v, forza, fonte, regole }.
   I g/kg di proteine di COR-03 sono «Convenzione»: il prodotto li dava gia prima, nessuna fonte verificata li sostiene
   (docs/ricerca-cardio-nutrizione.md, riga COR-03: «da correggere»; 1,75 per le donne «senza fonte vista»). NON sono validati: qui si
   etichettano soltanto e non si alzano. NUT-01 (1,6 g/kg di peso, Morton 2018) li sostituira con W5-T3 e non e ancora implementata.
   Non valgono per minorenni, over 65 e gravidanza: per loro il coach non scrive nessun grammo (guardiaNutrizione, js/coach/compone.js).
   Le soglie si leggono solo durante l esecuzione (proteineGKg, compone.js), mai al caricamento.
   ============================================================ */
const SOGLIE_BIA = {
  /* COR-03: g di proteine per kg di massa magra (BIA), estremo basso e alto dell intervallo di corpoCoach; l estremo basso e anche quello della nota del programma */
  proteineMassaMagraMin: {
    v: 2.35,
    forza: 'Convenzione', fonte: 'COR-03 (storica, prodotto di prima): nessuna fonte verificata; ricerca-cardio-nutrizione.md la segna «da correggere» (la nota cita Helms 2014: 2,3-3,1 g/kg di massa magra solo per atleti magri in definizione); non validato', regole: ['COR-03']
  },
  proteineMassaMagraMax: {
    v: 2.75,
    forza: 'Convenzione', fonte: 'COR-03 (storica, prodotto di prima): nessuna fonte verificata; stesso intervallo dell estremo basso; non validato', regole: ['COR-03']
  },
  /* COR-03: senza BIA, g di proteine per kg di peso */
  proteinePesoUomo: {
    v: 2,
    forza: 'Convenzione', fonte: 'COR-03 (storica, prodotto di prima): nessuna fonte verificata (la nota cita Morton 2018: 1,6 g/kg di peso come punto di massimo; è NUT-01, non ancora implementata); non validato', regole: ['COR-03']
  },
  proteinePesoDonna: {
    v: 1.75,
    forza: 'Convenzione', fonte: 'COR-03 (storica, prodotto di prima): «senza fonte vista» (ricerca-cardio-nutrizione.md); NUT-01 usera lo stesso numero per i due sessi; non validato', regole: ['COR-03']
  }
};
