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
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.4 e PRI-05 («mai liv 3»; i liv 2 solo dove il posto non ha un liv 1: la regola «un solo liv 2 per seduta» non è implementata come tetto), §5.3 (affondi bulgari in 18 piani su 23, trazioni libere in 10, nordic e pike push-up); ricerca-biomeccanica-esercizi §5.3 P14 e SEL-06', regole: ['SEL-06']
  },
  /* ABB-02 (W2-T6, SES-03): i multiarticolari di squat o di affondo in una seduta: due varianti al massimo, la terza e la cerniera dell anca o la flessione del ginocchio (le sedute Gambe avevano squat,
     un affondo e un secondo squat: tre varianti dello stesso lavoro per i quadricipiti) */
  squatPerSeduta: {
    v: 2,
    forza: 'Convenzione', fonte: 'piano coach v2 W2-T6 (SES-03: nelle sedute Gambe due varianti di squat, la terza e hinge o flessione); ABB-02 (niente esercizi doppi); collaudo RID-01', regole: ['ABB-02']
  },
  /* PCO-08: la spalla dolente riceve lavoro per la cuffia dei rotatori o per i deltoidi posteriori: almeno `serieMinime` serie dirette a settimana (collaudo SAF-06); se mancano entra un esercizio da
     `serieAggiunte` serie (le serie di Cressey, 3 una volta a settimana, ridotte a 2 per seduta come le altre aggiunte di strCopri: deltoidi posteriori, 2 serie da 15) e, con almeno
     `seduteDueVolte` sedute, la rotazione esterna al cavo in un altra seduta (una o due volte a settimana); mai piu di `eserciziMax` esercizi aggiunti (PCO-08). `seduteDueVolte` e provvisorio: la nota dice
     «una o due volte» senza dire da quante sedute */
  cuffia: {
    v: { serieMinime: 2, serieAggiunte: 2, seduteDueVolte: 4, eserciziMax: 2 },
    forza: 'Convenzione', fonte: 'ricerca-metodi-coach-pratici H-08 e PCO-08 (Cressey: rotazione esterna della cuffia almeno una volta a settimana, 2-3 serie, una o due volte; non più di 2 esercizi aggiunti); collaudo SAF-06 (almeno 2 serie dirette); seduteDueVolte: Provvisoria', regole: ['PCO-08']
  }
};
/* il valore di una soglia della scelta (null se il file non c e: i test che caricano pochi script) */
function sogliaSelezione(nome) {
  return typeof SOGLIE_SELEZIONE !== 'undefined' && SOGLIE_SELEZIONE[nome] ? SOGLIE_SELEZIONE[nome].v : null;
}
