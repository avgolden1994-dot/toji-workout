/* Soglie della scelta degli esercizi per attributi (SEL-06, PCO-08, SES-03, PRI-05)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLA SCELTA (coach v2, W2-T6, versione snella; registro B, D-P8; ricerca-biomeccanica-esercizi §7 parte A; ricerca-principianti-12-settimane §3.4, §5.1;
   ricerca-metodi-coach-pratici H-08; ricerca-fasce-di-eta §3.2)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js). Quasi tutto è «Convenzione» (registro C.4: la scelta degli
   esercizi per livello e per zona dolente è pratica dei coach, non c’è una prova diretta) e le regole sono più prudenti, mai meno.
   Le soglie si leggono solo durante l’esecuzione (sogliaSelezione), mai al caricamento.
   ============================================================ */
const SOGLIE_SELEZIONE = {
  /* SEL-06: l’abilità massima (attributo `abilita` di js/dati/attributi-esercizi.js: 1 accessibile, 2 serve tecnica o forza, 3 non per chi comincia) degli esercizi che il coach sceglie per chi inizia
     e per i prudenti (over 65, PAR-Q positivo, minorenni): «mai liv 3». Un metodo famoso scelto dall’utente (Starting Strength, StrongLifts…) porta i suoi esercizi: la regola non li toglie */
  abilitaMax: {
    v: { principiante: 2, prudente: 2 },
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.4 e PRI-05 («un solo esercizio liv 2 per seduta, mai liv 3»), §5.3 (affondi bulgari in 18 piani su 23, trazioni libere in 10, nordic e pike push-up); ricerca-biomeccanica-esercizi §5.3 P14 e SEL-06', regole: ['SEL-06']
  },
  /* SEL-06: gli esercizi di abilità 2 (serve tecnica o forza) in una seduta di chi comincia: uno solo, dove c’è un’alternativa di abilità 1 */
  abilita2PerSeduta: {
    v: 1,
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane PRI-05 e §5.1 («Esercizio troppo difficile: max un esercizio liv 2 per seduta»)', regole: ['SEL-06']
  },
  /* PCO-08: la spalla dolente riceve lavoro per la cuffia dei rotatori o per i deltoidi posteriori: almeno questo numero di serie dirette a settimana in al massimo questo numero di sedute, con al massimo
     due esercizi aggiunti. Le serie sono quelle di Cressey (3 serie, una volta a settimana) ridotte a 2 per seduta come le altre aggiunte di strCopri (deltoidi posteriori, 2 serie da 15) */
  cuffia: {
    v: { serieMinime: 2, serieAggiunte: 2, sedute: 2, eserciziMax: 2 },
    forza: 'Convenzione', fonte: 'ricerca-metodi-coach-pratici H-08 e PCO-08 (Cressey: rotazione esterna della cuffia almeno una volta a settimana, 2-3 serie, una o due volte; non più di 2 esercizi aggiunti); collaudo SAF-06 (almeno 2 serie dirette)', regole: ['PCO-08']
  }
};
/* il valore di una soglia della scelta (null se il file non c e: i test che caricano pochi script) */
function sogliaSelezione(nome) {
  return typeof SOGLIE_SELEZIONE !== 'undefined' && SOGLIE_SELEZIONE[nome] ? SOGLIE_SELEZIONE[nome].v : null;
}
