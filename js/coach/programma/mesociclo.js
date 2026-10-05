/* Mesociclo: durata, blocchi, scarichi e RIR per settimana (PRN-03, ETA-02)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   MESOCICLO (piano coach v2, B.3 stadio 4; W1-T4)
   pianoMesociclo(brief) decide quante settimane dura il programma, dove stanno gli scarichi e (per gli avanzati e i minorenni) il RIR di ogni
   settimana. Oggi sono le regole di prima, spostate qui da motore.js e da buildProgram: la riscrive W2-T4 (tabella MES-02, rampe, 12 settimane).
   Dalla ricerca:
   - un blocco di lavoro dura 4-8 settimane, con uno SCARICO ogni 4-8;
     il principiante non prudente fa 8 settimane con un solo scarico, all 8a
     (PRN-03 ponte, registro B4: nei sani lo scarico a calendario non ha un
     vantaggio provato); i prudenti (over 65, PAR-Q, minorenni) restano a 3+1
   - nello scarico si tagliano le serie del 30-50% e si alleggerisce il carico
   ============================================================ */

/* Durata e struttura in base all esperienza.
   PRN-03 (ponte, D-P5): principiante = 8 settimane e scarico solo all 8a, SOLO per i programmi creati da ora
   (un programma salvato tiene le sue fasi: stanno in prog.fasi). `prudente` (over 65, PAR-Q positivo, minorenne):
   blocchi 3+1 come prima; chi chiama (buildProgram) deve passarlo: over65, PAR-Q positivo o eta tra 1 e 17 anni. */
function strutturaProgramma(level, prudente) {
  if (level === 'principiante') return prudente ? { settimane: 8, blocco: 4 } : { settimane: 8, blocco: 8 };   /* prudente: 2 blocchi da 3+1; altri: 7 di carico + 1 di scarico */
  if (level === 'avanzato') return { settimane: 12, blocco: 6 };       /* 2 blocchi da 5+1 */
  return { settimane: 12, blocco: 4 };                                 /* 3 blocchi da 3+1 */
}

function fasiProgramma(struttura) {
  const fasi = [];
  for (let w = 1; w <= struttura.settimane; w++) fasi.push(w % struttura.blocco === 0 ? 'scarico' : 'carico');
  return fasi;
}

/* pianoMesociclo(brief) -> { struttura: { settimane, blocco }, fasi, rirSett, note }
   B4: over 65, PAR-Q positivo e minorenni restano a blocchi 3+1; PRN-03: gli altri principianti hanno lo scarico solo all 8a.
   rirSett: gli avanzati lavorano con RIR che scende settimana dopo settimana (3, 2, 1, 0 nelle settimane di carico, 4 nello scarico);
   ETA-02: il minorenne lavora sempre con almeno 2 ripetizioni in riserva (rirBersaglioBase legge rirSett: il bersaglio e [2, 3], 4 nello scarico).
   `note` sono le righe che il programma mostra per il mesociclo: le scrive buildProgram al suo posto nell ordine delle note. */
function pianoMesociclo(brief) {
  const chi = brief.chi;
  const struttura = strutturaProgramma(chi.livello, chi.cauto);
  const fasi = fasiProgramma(struttura);
  let rirSett = null;
  const note = [];
  if (chi.livello === 'avanzato' && !chi.minorenne) {
    rirSett = [];
    let k = 0;
    fasi.forEach(f => { if (f === 'scarico') { rirSett.push(4); k = 0; } else { const n = struttura.blocco - 1; rirSett.push(Math.max(0, Math.round(3 - 3 * k / Math.max(1, n - 1)))); k++; } });
    note.push('Mesociclo: ripetizioni in riserva 3, 2, 1, 0 nelle settimane di carico, poi scarico.');
  }
  if (chi.minorenne) rirSett = fasi.map(f => f === 'scarico' ? 4 : 2);
  return { struttura: struttura, fasi: fasi, rirSett: rirSett, note: note };
}
