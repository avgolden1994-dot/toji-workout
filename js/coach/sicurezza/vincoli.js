/* Vincoli di sicurezza del programma (SENTINELLA, MAV-02, MAV-03, B1)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VINCOLI DI SICUREZZA (piano coach v2, B.2; W1-T4)
   vincoliSicurezza(brief) e il SOLO canale dei limiti: la Sentinella li scrive nel brief (brief.sicurezza.vincoli) e gli altri stadi li
   leggono, invece di rifare ognuno i suoi controlli su eta, livello e PAR-Q.
     { vietati: { nome: motivo }, modifiche: { nome: { nota, carico, rirMin, rom } }, rirMin: { A, B, C, D, E, F }, serieMaxEsercizio,
       gruppiTecniche: ['G1', 'G1b', ...] (docs/ricerca-metodi-avanzati-intensita.md 3.3), tettoCarico (al massimo 1), motivi: [{ codice, testo }] }
   Oggi (W1-T4) le regole sono SOLO quelle di prima, spostate qui senza cambiarne l esito:
   - vietati: il Nordic Curl non entra per chi inizia, per i prudenti (over 65, PAR-Q, minorenni) ne per le ginocchia dolenti (B1, revisione dell onda 0:
     discesa eccentrica sovramassimale a corpo libero) e, dall INT-2a, lo Stacco Rumeno a una Gamba per i prudenti (abilita 3);
     li leggono consentito() (prefs.esclusi) e ogni scelta di esercizi;
   - serieMaxEsercizio: chi inizia e i prudenti fanno al massimo COACH_PARAMETRI.serieMaxPrudente serie per esercizio (CAS-14, femorali, riempimento);
   - gruppiTecniche: le tecniche al cedimento (G2, G2b, G3) mai a chi inizia, ai minorenni, agli over 65 e in modalita prudente (MAV-02, MAV-03:
     Convenzione, prudenza); la superserie antagonista (G1b) vale per tutti. La matrice completa delle tecniche per persona e di W2-T3 (MAV-01).
   modifiche e rirMin restano vuoti: li riempiono i task che li possiedono (dolore, popolazioni: W4-T1, W4-T2). tettoCarico 1 = nessun tetto.
   Le fonti e le regole dei singoli numeri sono dove sono sempre state (ricette.js, tecniche.js, parametri.js): qui si decide solo CHI e vincolato.
   ============================================================ */
function vincoliSicurezza(brief) {
  const chi = brief.chi, fastidi = (brief.sicurezza && brief.sicurezza.fastidi) || [];
  const vincoli = { vietati: {}, modifiche: {}, rirMin: {}, serieMaxEsercizio: null, gruppiTecniche: ['G1b'], tettoCarico: 1, motivi: [] };
  /* B1 (revisione dell onda 0): il Nordic Curl non entra per chi inizia, per i prudenti e per le ginocchia dolenti (esclusi: motivi di sicurezza, non di gusto) */
  const nordic = nomeInLibreria('Nordic Curl');
  if (nordic && (chi.principiante || chi.cauto || fastidi.indexOf('ginocchia') !== -1)) {
    vincoli.vietati[nordic] = 'discesa eccentrica sovramassimale: non per chi inizia, per i prudenti e per le ginocchia dolenti';
    vincoli.motivi.push({ codice: 'B1', testo: 'Il Nordic Curl non entra: è una discesa eccentrica sovramassimale, non adatta a chi inizia, ai prudenti e alle ginocchia dolenti.' });
  }
  /* INT-2a (M1 della revisione dell onda 1): lo Stacco Rumeno a una Gamba e un esercizio di abilita 3 (equilibrio e cerniera su un piede: la sua scheda dice di
     appoggiare una mano) e prima, letto come bilanciere, finiva in 225 programmi su 263 di persone prudenti; per i prudenti resta fuori finche la scelta non leggera
     l abilita (W2-T6); lo stesso vale per chi inizia (SEL-06: abilita 3 non e per i principianti). Hanno lo Stacco Rumeno con Manubri (abilita 2) */
  const unaGamba = nomeInLibreria('Stacco Rumeno a una Gamba');
  if (unaGamba && (chi.cauto || chi.principiante)) vincoli.vietati[unaGamba] = 'abilita 3 (equilibrio su un piede): non per i prudenti ne per chi inizia, finche la scelta non legge l abilita';
  /* INT-2a (M5 della revisione dell onda 1): gli esercizi di avvio (attributo soloAvvio: Squat su Scatola, Sit-to-Stand dalla Panca) sono la progressione verso lo squat carico:
     li ricevono chi inizia e i prudenti. Prima, senza nessuna regola, lo Squat su Scatola entrava in 951 programmi su 1800 di una griglia di prova, anche degli avanzati,
     al posto di uno squat con un carico. Si legge l attributo, non il nome */
  if (!chi.principiante && !chi.cauto && typeof attributi === 'function') EXERCISE_LIBRARY.forEach(e => {
    const a = attributi(e.name);
    if (a && a.soloAvvio) vincoli.vietati[e.name] = 'esercizio di avvio verso lo squat carico: per chi inizia e per i prudenti';
  });
  if (chi.principiante || chi.cauto) vincoli.serieMaxEsercizio = COACH_PARAMETRI.serieMaxPrudente;   /* 2-3 serie impegnative (Barbell Medicine); CAS-14, femorali, riempimento */
  /* MAV-03: niente tecniche al cedimento a chi inizia, ai minorenni, agli over 65 e in modalita prudente */
  if (!chi.principiante && !chi.cauto) vincoli.gruppiTecniche.push('G2', 'G2b');
  else vincoli.motivi.push({ codice: 'MAV-03', testo: 'Per ora niente serie al cedimento: la tecnica viene prima.' });
  return vincoli;
}

/* le tecniche che portano vicino al cedimento (G2, G2b: drop, parziali, AMRAP, back-off...) sono ammesse? E la vecchia `tecnicheOk` di buildProgram */
function tecnicheAlCedimentoAmmesse(brief) {
  const v = brief.sicurezza && brief.sicurezza.vincoli;
  return !!(v && v.gruppiTecniche && v.gruppiTecniche.indexOf('G2') !== -1);
}
