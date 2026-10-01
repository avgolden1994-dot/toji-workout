/* Motore del coach: suggerimento del prossimo esercizio
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   MOTORE COACH - suggerimento del prossimo esercizio
   NOTA ONESTA: non e' una rete neurale, e' un sistema di regole che
   codifica i principi di programmazione usati dai preparatori.
   Funziona offline, e' istantaneo e ogni suggerimento e' spiegabile
   (campo "reason"), cosa che un modello generativo non garantirebbe.
   Regole, in ordine di peso:
     1. Multiarticolari prima, isolamento dopo
     2. Non superare ~3 esercizi sullo stesso gruppo in una seduta
     3. Dopo il gruppo principale, passa ad antagonista o sinergico
     4. Chiudi la seduta con il core
     5. Mai ripetere un esercizio gia' presente nel piano
   ============================================================ */
function suggestNextExercises(planList, startGroup, limit) {
  const max = limit || 3;
  const present = new Set((planList || []).map(e => e.name));
  const counts = {};
  (planList || []).forEach(e => {
    const meta = findExercise(e.name);
    if (meta) counts[meta.group] = (counts[meta.group] || 0) + 1;
  });

  const last = (planList || []).length ? findExercise(planList[planList.length - 1].name) : null;
  const anchorGroup = startGroup || (last ? last.group : null);
  const totalSoFar = (planList || []).length;
  const compoundsSoFar = (planList || []).filter(e => {
    const m = findExercise(e.name);
    return m && m.type === 'compound';
  }).length;

  const weekUsed = (typeof weekUsage === 'function' && currentMode) ? weekUsage() : {};

  return EXERCISE_LIBRARY
    .filter(ex => !present.has(ex.name))
    .map(ex => {
      let score = 0;
      const reasons = [];
      const groupCount = counts[ex.group] || 0;

      /* 1. I multiarticolari vanno all'inizio, quando sei fresco */
      if (ex.type === 'compound') {
        if (totalSoFar < 2) { score += 40; reasons.push('multiarticolare da fare a inizio seduta'); }
        else if (compoundsSoFar < 2) { score += 25; reasons.push('serve ancora un multiarticolare'); }
        else score += 8;
      } else {
        if (totalSoFar >= 3) { score += 30; reasons.push('isolamento adatto alla seconda parte'); }
        else score -= 15;
      }

      /* 2. Saturazione del gruppo: oltre 3 esercizi il rendimento cala */
      if (groupCount >= 3) { score -= 45; reasons.push('gruppo gia molto allenato oggi'); }
      else if (groupCount === 2) score -= 12;

      /* 3. Continuita col gruppo di partenza, poi antagonista/sinergico */
      if (anchorGroup && MUSCLE_GROUPS[anchorGroup]) {
        const anchorMeta = MUSCLE_GROUPS[anchorGroup];
        if (ex.group === anchorGroup && groupCount < 3) {
          score += 28; reasons.push('stesso gruppo di partenza (' + anchorMeta.label + ')');
        } else if (anchorMeta.antagonist === ex.group) {
          score += 22; reasons.push('antagonista di ' + anchorMeta.label + ': bilancia la seduta');
        } else if (anchorMeta.synergists.indexOf(ex.group) !== -1) {
          score += 16; reasons.push('sinergico di ' + anchorMeta.label);
        }
      }

      /* 4. Il core chiude, non apre */
      if (ex.group === 'core') {
        if (totalSoFar >= 4) { score += 26; reasons.push('ottimo per chiudere la seduta'); }
        else score -= 30;
      }

      /* 5. Evita due multiarticolari identici di fila sullo stesso gruppo */
      if (last && last.group === ex.group && last.type === ex.type && ex.type === 'compound') {
        score -= 8;
      }

      /* 6. Gia scelto in un altro giorno della settimana: non e' sbagliato
         riproporlo, ma non deve stare davanti a un esercizio mai considerato. */
      const usati = (weekUsed[ex.name] || []).filter(d => d !== currentDay).length;
      if (usati > 0) { score -= 20 * usati; reasons.push('gia previsto in un altro giorno'); }

      return Object.assign({}, ex, { score: score, reason: reasons[0] || 'complemento utile alla seduta' });
    })
    .sort((a, b) => b.score - a.score)
    /* Diversita': al massimo 2 proposte per gruppo, altrimenti con una libreria
       ampia il Coach restituirebbe 5 varianti dello stesso muscolo. */
    .reduce((acc, ex) => {
      const perGroup = acc.filter(x => x.group === ex.group).length;
      if (perGroup < 2) acc.push(ex);
      return acc;
    }, [])
    .slice(0, max);
}
