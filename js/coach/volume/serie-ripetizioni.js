/* Serie, ripetizioni e pause di ogni esercizio (PRG-14, PRG-20, ETA-02, B2, B34)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SERIE, RIPETIZIONI E PAUSE (piano coach v2, B.3 stadio 8; W1-T4)
   prescriviSerie(brief, sedute) dice, per ogni esercizio scelto dalla composizione (componiSedute), quante serie, quante ripetizioni e quanta pausa:
   dallo schema dell obiettivo (schemeFor + schemaMisto), dal TIPO di esercizio (fondamentale col bilanciere, macchina, isolamento), dal giorno
   (PHUL: forza o ipertrofia), dal livello e dalle popolazioni (principianti, over 65, minorenni, PAR-Q, donne). Sono le regole di prima, spostate qui
   da buildProgram senza cambiarne l esito: le riscrivono W2-T2 (pause per tipo, B8) e W3-T1.
   Ordine: oggi gira PRIMA dei completamenti (completaSettimana: serie in piu, schemi mancanti, copertura per regioni), perche quelli leggono le serie
   gia prescritte (fisso, sets); il piano B.3 mette la prescrizione dopo i completamenti, e li rimette in ordine W2-T2 e W2-T6.
   prescriviSeduta(brief, base, tipoGiorno) e la stessa regola su UNA seduta, senza toccare niente: la composizione la usa per sapere le serie
   delle sedute gia fatte (le 48 ore dei riempimenti, REC-01).
   ============================================================ */

/* B34 (ponte di W0-T2): il 5x5 fisso del primo multiarticolare vale solo per il bilanciere pesante (BIL_PESANTI), mai per goblet, manubri, corpo libero e nemmeno per le
   macchine guidate: con la massa come obiettivo principale 5 ripetizioni su una macchina escono dalla fascia 6-15 (collaudo RX-01:ipertrofia/macchina) */
function adattoAlCincoPerCinque(nome) {
  const m = findExercise(nome) || {};
  return m.type === 'compound' && !isTimeBased(nome) && m.weight > 0 && tipoCarico(nome) === 'pesante';
}

/* base: gli esercizi scelti per la seduta ({ name, weight, riservaTirataV?, protetto? }); ritorna gli esercizi con serie, ripetizioni e pausa.
   tipoGiorno: 'forza' o 'ipertrofia' (PHUL e full body dei tre giorni) o null. */
function prescriviSeduta(brief, base, tipoGiorno) {
  const chi = brief.chi, goals = brief.obiettivi.lista, scheme = brief.obiettivi.scheme, level = chi.livello, over65 = chi.over65, minore = chi.minorenne;
  const parqSi = chi.parq, donna = chi.donna, metodoAttivo = brief.metodo.attivo;
  let primoComp = true;
  return base.map(e => {
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
    if (parqSi && isComp) reps = Math.max(8, Math.min(12, reps));   /* pressione: 60-80%, niente apnea (ACSM) */
    if (donna) rest = Math.max(60, Math.round(rest * 0.85));   /* recupero piu rapido tra le serie (PeerJ 2025) */
    if (isTimeBased(e.name)) reps = meta ? meta.reps : 30;
    if (RX_NORDIC.test(senzaEmoji(e.name))) { sets = Math.min(sets, PARAM_NORDIC.serieMax); reps = ripetizioniFlessione(e.name); }   /* B1: al massimo 3 serie da 3-6 ripetizioni */
    rest = Math.round(rest / 15) * 15;
    return { name: e.name, sets: sets, reps: reps, weight: e.weight, rest: rest, fisso: fisso || undefined, riservaTirataV: e.riservaTirataV, protetto: e.protetto };   /* protetto (W0-T7): il pullover di CAS-14 passa dalla base alle sedute, come le aggiunte di strCopri e del ponte dei femorali */
  });
}

/* tutte le sedute del programma: sostituisce gli esercizi scelti (solo il nome) con quelli prescritti */
function prescriviSerie(brief, sedute) {
  sedute.forEach((sd, i) => { sd.esercizi = prescriviSeduta(brief, sd.esercizi, brief.lavoro.tipiGiorno[i]); });
  return sedute;
}
