/* Serie, ripetizioni e pause di ogni esercizio (PRG-13, PRG-14, PRG-20, IPE-04, ETA-02, B2, B34)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SERIE, RIPETIZIONI E PAUSE (piano coach v2, B.3 stadio 8; W1-T4)
   prescriviSerie(brief, sedute) dice, per ogni esercizio scelto dalla composizione (componiSedute), quante serie, quante ripetizioni e quanta pausa:
   dallo schema dell obiettivo (schemeFor + schemaMisto), dal TIPO di esercizio (fondamentale col bilanciere, macchina, isolamento), dal giorno
   (PHUL: forza o ipertrofia), dal livello e dalle popolazioni (principianti, over 65, minorenni, PAR-Q, donne). Sono le regole di prima, spostate qui
   da buildProgram: W2-T2 le ha riscritte (le pause vengono dalla tabella per CLASSE e obiettivo, B8: limitiPausa in tempo.js; le donne solo dove D-P7 lo ammette; la forza ha i multiarticolari
   a 6 ripetizioni o meno; il giorno «forza» del PHUL sotto i 45 minuti e piu corto: IPE-04), W3-T1 le riscrivera per le ripetizioni.
   Ordine: oggi gira PRIMA dei completamenti (completaSettimana: serie in piu, schemi mancanti, copertura per regioni), perche quelli leggono le serie
   gia prescritte (fisso, sets); il piano B.3 mette la prescrizione dopo i completamenti, e li rimette in ordine W2-T2 e W2-T6.
   prescriviSeduta(brief, base, tipoGiorno) e la stessa regola su UNA seduta, senza toccare niente: la composizione la usa per sapere le serie
   delle sedute gia fatte (le 48 ore dei riempimenti, REC-01).
   ============================================================ */

/* B34 (W0-T2, W2-T2): il 5x5 fisso del primo multiarticolare vale solo per la classe A (bilanciere libero pesante), mai per goblet, manubri, corpo libero e nemmeno per le
   macchine guidate: con la massa come obiettivo principale 5 ripetizioni su una macchina escono dalla fascia 6-15 (collaudo RX-01:ipertrofia/macchina) */
function adattoAlCincoPerCinque(nome) {
  const m = findExercise(nome) || {};
  return m.type === 'compound' && !isTimeBased(nome) && m.weight > 0 && classePausa(nome) === 'A';
}

/* base: gli esercizi scelti per la seduta ({ name, weight, riservaTirataV?, protetto? }); ritorna gli esercizi con serie, ripetizioni e pausa.
   tipoGiorno: 'forza' o 'ipertrofia' (PHUL e full body dei tre giorni) o null. */
function prescriviSeduta(brief, base, tipoGiorno) {
  const chi = brief.chi, goals = brief.obiettivi.lista, scheme = brief.obiettivi.scheme, level = chi.livello, over65 = chi.over65, minore = chi.minorenne;
  const parqSi = chi.parq, donna = chi.donna && regolaAttiva('PRG-20'), metodoAttivo = brief.metodo.attivo, ob = tipoObiettivoDi(goals), forzaGoal = goals[0] === 'forza';
  const corto = Number(brief.agenda.minuti) <= sogliaTempo('giornoForzaCorto').minuti && regolaAttiva('IPE-04');   /* IPE-04: con 45 minuti o meno il giorno «forza» del PHUL non e un 4x5 a 3 minuti di pausa */
  let primoComp = true;
  return base.map(e => {
    const meta = findExercise(e.name);
    const isComp = meta && meta.type === 'compound';
    const tipo = tipoCarico(e.name);
    let sets = scheme.sets, reps = scheme.reps;
    /* ripetizioni per tipo di esercizio: fondamentali 5-8, macchine 8-12, isolamenti 10-20; con la forza come obiettivo tutti i multiarticolari stanno a 6 ripetizioni o meno (collaudo GOA-01) */
    const forzaQui = forzaGoal || tipoGiorno === 'forza';
    if (tipo === 'pesante') reps = forzaQui ? (ob === 'generale' ? 6 : 5) : Math.min(reps, 8);   /* salute e dimagrimento: il giorno «forza» del PHUL parte da 6 (la fascia del collaudo RX-01: 6-15) */
    else if (tipo === 'macchina') { reps = forzaGoal ? 6 : (forzaQui ? 8 : Math.max(8, reps)); if (forzaGoal) sets = Math.min(sets, 4); }
    else { reps = Math.max(10, reps); if (forzaGoal) sets = Math.min(sets, 3); }
    let fisso = false;
    /* B34 (PRG-14): il 5x5 fisso e solo per il primo multiarticolare di classe A, mai su goblet, manubri o corpo libero, e non nel giorno di ipertrofia; ne per over 65 e minorenni */
    if (isComp && primoComp && scheme.forzaSulPrimo && !over65 && !minore && tipoGiorno !== 'ipertrofia' && adattoAlCincoPerCinque(e.name)) { sets = 5; reps = 5; fisso = true; primoComp = false; }
    if (forzaGoal && level !== 'principiante' && tipo === 'pesante' && !over65 && !minore && !parqSi && !metodoAttivo) { sets = 6; reps = 3; }
    if (tipoGiorno === 'forza' && tipo === 'pesante') sets = 4;
    /* IPE-04: il giorno «forza» del PHUL con 45 minuti o meno (non per l obiettivo forza) e di 3 serie da 6, non di 4 da 5 */
    const giornoForzaCorto = tipoGiorno === 'forza' && tipo === 'pesante' && corto && !forzaGoal && !fisso;
    if (giornoForzaCorto) { sets = Math.min(sets, sogliaTempo('giornoForzaCorto').serie); reps = sogliaTempo('giornoForzaCorto').ripetizioni; }
    /* B2 (PHUL): il giorno di ipertrofia torna allo schema della massa (4 serie, ripetizioni da massa), non 6x8 o 5x8 ereditati dal giorno di forza; con la forza come obiettivo il fondamentale resta a 6 */
    if (tipoGiorno === 'ipertrofia') {
      const ip = schemeFor('massa');   /* 4 x 10 */
      reps = tipo === 'pesante' ? (forzaGoal ? 6 : 8) : (isComp ? 10 : 12);
      sets = Math.min(sets, ip.sets);
    }
    if (!isComp && scheme.isoMassa) { sets = 3; reps = 12; }
    sets = Math.min(sets, scheme.tettoSerie);
    if (level === 'principiante') sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente);   /* 2-3 serie impegnative (Barbell Medicine) */
    if (over65) { sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente); reps = Math.max(8, Math.min(12, reps)); }
    if (minore) { sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente); reps = Math.max(8, Math.min(15, reps)); }   /* ETA-02: al massimo 3 serie, 8-15 ripetizioni */
    if (parqSi && isComp) reps = Math.max(8, Math.min(12, reps));   /* pressione: 60-80%, niente apnea (ACSM) */
    if (isTimeBased(e.name)) reps = meta ? meta.reps : 30;
    if (RX_NORDIC.test(senzaEmoji(e.name))) { sets = Math.min(sets, PARAM_NORDIC.serieMax); reps = ripetizioniFlessione(e.name); }   /* B1: al massimo 3 serie da 3-6 ripetizioni */
    if (RIPIEGO_HINGE.test(senzaEmoji(e.name)) && typeof sogliaVolume === 'function') { const r = sogliaVolume('ripiegoCerniera'); if (r) { sets = Math.min(sets, r.serieMax); if (!forzaQui) reps = r.ripetizioni; } }   /* INT-2f: il ripiego e un esercizio tecnico, 2 serie da 12 (con la forza le ripetizioni sono quelle dei multiarticolari della forza, 6 o meno: GOA-01) */
    /* PRG-13 (B8, B34): la pausa e quella della CLASSE dell esercizio e dell obiettivo (tabella in soglie-tempo.js): Hyperextension e Ponte Glutei non hanno piu 158 s. PRG-20 (D-P7, Convenzione): le donne
       -15% solo su D, E e su B, C con 8 ripetizioni o piu; oltre i 65 anni almeno 90/120 s. Il 5x5 e il 6x3 della forza restano a 180 s (la classe A della forza va da 180 a 240) */
    const lim = limitiPausa(e.name, { obiettivo: tipoGiorno === 'ipertrofia' ? 'ipertrofia' : ob, minimiDa: ob, reps: reps, donna: donna, parq: parqSi, over65: over65 });   /* il giorno di ipertrofia del PHUL ha le pause della massa anche con la forza come obiettivo (B2) */
    let rest = lim.v;
    if (tipoGiorno === 'forza' && tipo === 'pesante') rest = giornoForzaCorto ? Math.min(lim.max, sogliaTempo('giornoForzaCorto').pausa) : (ob === 'ipertrofia' ? lim.max : lim.v);
    if (fisso || (forzaGoal && level !== 'principiante' && tipo === 'pesante' && sets === 6)) rest = Math.min(lim.max, Math.max(lim.lo, 180));
    rest = Math.min(lim.max, Math.max(lim.lo, round15(rest)));
    return { name: e.name, sets: sets, reps: reps, weight: e.weight, rest: rest, fisso: fisso || undefined, riservaTirataV: e.riservaTirataV, protetto: e.protetto };   /* protetto (W0-T7): il pullover di CAS-14 passa dalla base alle sedute, come le aggiunte di strCopri e del ponte dei femorali */
  });
}

/* tutte le sedute del programma: sostituisce gli esercizi scelti (solo il nome) con quelli prescritti */
function prescriviSerie(brief, sedute) {
  sedute.forEach((sd, i) => { sd.esercizi = prescriviSeduta(brief, sd.esercizi, brief.lavoro.tipiGiorno[i]); });
  return sedute;
}
