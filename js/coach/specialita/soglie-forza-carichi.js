/* Soglie dei carichi della modalità Forza (FRZ-11)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   I NUMERI DEI CARICHI DEI GIORNI MEDI E LEGGERI (P3-C, piano coach v2 W3-T6, versione snella)
   Una voce per numero: { v, forza, fonte, regole } (convenzione di regia/soglie-regia.js). Si leggono solo a esecuzione, con sogliaForzaCarichi(nome).
   Onestà sulla forza dell'evidenza: la nota docs/ricerca-metodi-coach-pratici.md (2.20) dice che «quanto leggero è il giorno leggero» del Texas Method non è stato verificato sul web e
   che la logica pesante/leggera è già in PHUL e GZCLP: i numeri qui sotto che dicono quanto è leggero un giorno sono «Convenzione». L'unico numero con una fonte è la scala RPE-RIR
   (RPE 9 = una ripetizione in riserva: Zourdos 2016, Moderata), che dà il tetto di capacità.
   Cosa NON c'è (obiettivi aperti, oltre la v2): una prescrizione a percentuali di un massimale di lavoro, tetti di RPE per settimana, ripetizioni di appoggio, test del massimale.
   ============================================================ */
const SOGLIE_FORZA_CARICHI = {
  /* FRZ-11: il carico di un giorno non pesante non supera quello che il massimale stimato dell'alzata permette per le sue ripetizioni con almeno questa riserva: RPE 9 = 1 ripetizione in riserva */
  rirMinimoGiorno: {
    v: 1,
    forza: 'Moderata', fonte: 'docs/ricerca-forza-progressione.md (scala RIR-RPE: RPE 10 = 0 ripetizioni in riserva, 9 = 1; Zourdos 2016) e 3.3 (carico = e1RM / (1 + (ripetizioni + RIR) / 30), entro 0,6 punti dalla tabella RPE)',
    regole: ['FRZ-11']
  },
  /* FRZ-11: il giorno leggero ha tante ripetizioni in riserva in più del giorno medio (con lo stesso bersaglio di ripetizioni: stesso carico = nessuna differenza di fatica): il carico scende di circa il 6-7% */
  rirInPiuLeggera: {
    v: 2,
    forza: 'Convenzione', fonte: 'docs/ricerca-metodi-coach-pratici.md 2.20 (Texas Method: il giorno di recupero ha carico e volume ridotti; «quanto leggero» non è verificato, conoscenza del modello); la scelta di due ripetizioni in più è del coach',
    regole: ['FRZ-11']
  },
  /* FRZ-11: di quanti passi della griglia dell'attrezzo un giorno sta almeno sotto quello più pesante della stessa alzata nella settimana (così l'ordine non si perde con l'arrotondamento: 37,5 e 37,5 sono lo stesso giorno) */
  passiSotto: {
    v: 1,
    forza: 'Decisione', fonte: 'P3-C: il giorno medio sta almeno un passo sotto il pesante e il leggero almeno un passo sotto il medio; il passo è quello dell\'attrezzo (carichi/attrezzi.js)',
    regole: ['FRZ-11']
  },
  /* FRZ-11: quante esposizioni si salgono per trovare il carico del giorno più pesante (leggero -> medio -> pesante: 2 salti): un limite alla ricorsione, mai raggiunto con le tre onde */
  profonditaMax: {
    v: 3,
    forza: 'Decisione', fonte: 'P3-C: le onde sono tre (pesante, media, leggera); il limite evita un giro infinito se i dati del piano sono incoerenti',
    regole: ['FRZ-11']
  }
};
