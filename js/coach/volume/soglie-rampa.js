/* Soglie della rampa del volume in seduta (MES-03, P3-B)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLA RAMPA IN SEDUTA (coach v2, P3-B = W3-T4 snello; registro B6, C.4; ricerca-mesocicli-periodizzazione-scarichi §3.3,
   ricerca-principianti-12-settimane §3.2)
   I fattori della rampa (0,75 · 0,85 · 0,95 · 1 · 1 e gli altri) non stanno qui: li scrive il piano del mesociclo (programma/soglie-struttura.js
   → prog.piano.settimane[].volume e .serie) e la seduta li legge (volume/rampa-settimana.js). Qui stanno solo i due numeri che la seduta aggiunge.
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1). Le soglie si leggono solo durante l’esecuzione, mai al caricamento.
   ============================================================ */
const SOGLIE_RAMPA = {
  /* mai meno di 2 serie per esercizio nelle settimane di carico, e nessuna rampa se il picco dell’esercizio è già 2 o meno */
  serieMinime: {
    v: 2,
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.3 («serie(w) = max(2, round(setsBase × f[w])), con serie(w) ≤ setsBase e nessuna rampa se setsBase ≤ 2»); registro coach v2 B6 (pavimenti)', regole: ['MES-03']
  },
  /* principiante: «multi» sono i primi tre esercizi della seduta (il gesto principale di gambe, spinta e tirata), «altri» tutti gli altri */
  principianteMulti: {
    v: 3,
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.2 («Multi = i primi tre esercizi della seduta»); piano coach v2 W2-T4 (seriePrincipiante)', regole: ['MES-03', 'PRN-03']
  }
};
