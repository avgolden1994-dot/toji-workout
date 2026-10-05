/* Scarico: dose, fatica e scarico deciso dal coach (CAR-03, CAR-10, MES-08, W1-T3)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCARICO
   Un posto solo per cio che dice quanto scaricare e chi puo chiedere uno scarico, che prima stava in regole-ricerca.js
   (dose e fatica) e in tre punti diversi che scrivevano `ag.scarico` a mano (questionario-decisioni.js, prontezza.js, repertorio.js).
   W1-T3 sposta qui, senza cambiare un numero, DOSE_SCARICO, livelloFatica e la soglia dell sRPE (MES-08) e aggiunge scaricoReattivo:
   la voce di `ag.scarico` (aggiusti del coach) con il motivo che l utente legge. La dose unica (MES-07) e il riferimento (MES-06) sono
   di W3-T5: cambieranno qui.
   ============================================================ */

/* MES-08: con le risposte 3/6/8/10 (Facile, Giusta, Dura, Al limite) la fatica e «alta» solo se la media delle ultime sedute e quasi sempre «Al limite» (9,5; era 9: bastava
   una Dura in piu); Convenzione (ricerca-mesocicli-periodizzazione-scarichi.md, MES-08) */
const SOGLIA_SRPE_ALTA = 9.5;
/* scarico dosato sul bisogno (Bell 2024): poca, media o molta fatica */
function livelloFatica() {
  const hist = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, 3);
  const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
  if (!hist.length && !pr.length) return 'media';
  /* la scala dell sRPE e 3/6/8/10 (W0-T5, MES-08); le risposte salvate prima dell onda 0 erano 4/7/9/10 e si portano sulla scala nuova (il 9 conta come 8: registro B9) */
  const sulla3_6_8 = (v) => ({ 4: 3, 7: 6, 9: 8 })[v] || v;
  const srpe = hist.length ? hist.reduce((t, h) => t + (sulla3_6_8(h.feedback.srpe) || 6), 0) / hist.length : 6;
  const pz = pr.length ? pr.reduce((t, x) => t + x, 0) / pr.length : 70;
  if (srpe >= SOGLIA_SRPE_ALTA || pz < 50) return 'alta';
  if (srpe < 7 && pz >= 70) return 'bassa';
  return 'media';
}
const DOSE_SCARICO = { bassa: { serie: 0.65, carico: 0.95, t: 'volume -35%' }, media: { serie: 0.5, carico: 0.9, t: 'volume -50% e carico -10%' }, alta: { serie: 0.3, carico: 0.9, t: 'volume -70% e carico -10%' } };

/* La voce `ag.scarico` degli aggiusti: le prossime `sedute` sono di scarico deciso dal coach (CAR-10); `motivo` e la frase che l utente legge
   («Scarico deciso dal coach: <motivo>»). Restituisce l oggetto, non scrive niente: chi la usa lo assegna ad `ag.scarico` e salva gli
   aggiusti insieme al resto (questionario-decisioni.js: DEC, prontezza.js: stanchezza di piu giorni) */
function scaricoReattivo(motivo, sedute) {
  return { sedute: sedute, motivo: motivo };
}
