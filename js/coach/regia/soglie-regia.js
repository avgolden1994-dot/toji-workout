/* Soglie della regia del coach (REG-01, REG-04)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONVENZIONE DELLE SOGLIE (coach v2, piano B.4, W1-T1)
   Ogni numero nuovo del coach vive in un file soglie-<argomento>.js nella cartella del suo sotto-coach
   (regia/, volume/, sicurezza/, tecnica/, corpo/, mente/, specialita/, carichi/, programma/), una voce per numero:
     nome: { v: valore, forza, fonte, regole: ['XXX-NN'] }
   Forze ammesse: Solida (meta-analisi o posizione ufficiale), Moderata (pochi studi), Contrastata (studi in disaccordo),
   Convenzione (pratica dei coach: il foglio «Perché?» lo dice, registro C.4), Decisione (scelta di prodotto),
   Provvisoria (numero di partenza in attesa di verifica). Un numero che non e in una nota di ricerca o nel registro
   (docs/coach-v2-decisioni.md) non si inventa.
   Le soglie si leggono solo durante l'esecuzione, mai al caricamento: nessun vincolo d'ordine tra gli script.
   tests/soglie.test.js controlla ogni voce (v, forza, fonte); tools/elenco-soglie.js scrive docs/soglie-coach.md.
   ============================================================ */
const SOGLIE_REGIA = {
  /* REG-01: precedenze quando due sotto-coach non sono d'accordo: vince il numero piu basso. La Sentinella mette i limiti
     assoluti, il Motivatore i momenti di vita, lo Specialista la modalita attiva; Architetto, Dosatore e Bilancia propongono;
     Preparatore e Tecnico aggiungono e informano, mai sostituiscono. Il Regista non e in classifica: applica l'ordine. */
  precedenza: {
    v: { sentinella: 1, motivatore: 2, specialista: 3, architetto: 4, dosatore: 4, bilancia: 4, preparatore: 5, tecnico: 5 },
    forza: 'Decisione', fonte: 'piano coach v2 B.2 (REG-01, precedenze della squadra)', regole: ['REG-01']
  },
  /* REG-04: versione dei programmi creati dal coach v2; quelli salvati prima continuano con le regole di prima, tranne le
     correzioni di sicurezza e di calcolo della seduta (registro D-P5 a) */
  versioneProgramma: {
    v: 2,
    forza: 'Decisione', fonte: 'piano coach v2 B.6 (REG-04); registro coach v2 D-P5', regole: ['REG-04']
  }
};
