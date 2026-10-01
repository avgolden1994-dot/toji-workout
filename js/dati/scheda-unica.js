/* Scheda unica per esercizio: tutto quello che l'app sa di un esercizio, in un oggetto solo
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDA UNICA PER ESERCIZIO
   La conoscenza sugli esercizi e in tabelle diverse (libreria, disegni,
   schede tecniche, schemi di movimento, regole di carico e di allungamento).
   schedaUnica(nome) le legge tutte e restituisce un oggetto solo, in sola
   lettura: serve per i controlli di completezza (npm run test:browser) e per
   le schermate che vogliono mostrare tutto in un colpo. Non sostituisce le
   tabelle: per aggiungere o correggere un dato si modifica la sua tabella.
   ============================================================ */
window.schedaUnica = function(nome) {
  const pulito = String(nome).replace(EMOJI_TESTA, '');
  const lib = findExercise(nome) || null;
  const tec = TECNICA[pulito] || null;
  const img = typeof immagineEsercizio === 'function' ? immagineEsercizio(nome) : null;
  return {
    nome: pulito,
    inLibreria: !!lib,
    gruppo: lib ? lib.group : null,
    tipo: lib ? lib.type : null,
    attrezzo: attrezzoDi(nome),
    aTempo: isTimeBased(nome),
    peso: lib ? lib.weight : null,
    carico: { tipo: tipoCarico(nome), incremento: incrementoPer(nome), riserva: rirBersaglio(nome), rpeBersaglio: rpeBersaglio(nome), pausa: pausaConsigliata(nome) },
    schema: schemaDi(nome),
    isolamentoDi: isolamentoDi(nome),
    inAllungamento: inAllungamento(nome),
    disegno: img || null,
    pattern: typeof patternFor === 'function' ? patternFor(nome) : null,
    tecnica: tec ? { muscoli: tec.m, partenza: tec.s, esecuzione: tec.e, errori: tec.x, consiglio: tec.c } : null,
    video: typeof videoLinkFor === 'function' ? videoLinkFor(nome) : null
  };
};
/* quali esercizi della libreria hanno ancora buchi: [{ nome, manca: [...] }] */
window.bucchiNelleSchede = function() {
  return EXERCISE_LIBRARY.map(e => {
    const s = schedaUnica(e.name), manca = [];
    if (!s.tecnica) manca.push('scheda tecnica');
    if (!s.disegno) manca.push('disegno');
    return manca.length ? { nome: s.nome, manca: manca } : null;
  }).filter(Boolean);
};
