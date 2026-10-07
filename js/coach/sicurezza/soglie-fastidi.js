/* Soglie dei fastidi: la modifica scritta (REC-04, DEC-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DEI FASTIDI (coach v2, W4-T1 versione snella, P4-F; ricerca-recupero-infortuni-popolazioni §3, §5.1)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js). Le soglie si leggono solo durante l’esecuzione
   (sogliaFastidi), mai al caricamento. Sono pochi numeri, e quasi tutti «Convenzione»: la nota non è una cura e non promette niente, dice cosa c’è nella scheda.
   ============================================================ */
const SOGLIE_FASTIDI = {
  /* dall’attributo `stress` di js/dati/attributi-esercizi.js (0 nessuno, 1 cautela, 2 controindicato): da questo valore in su un esercizio «carica» la zona dolente
     e la nota lo nomina; è lo stesso criterio del collaudo SAF-02 e di MAV-02 (esercizioCaricaIlFastidio) */
  stressNominato: {
    v: 1,
    forza: 'Convenzione', fonte: 'attributo `stress` di W1-T2 (matrice di ricerca-recupero-infortuni-popolazioni §3, elenchi del collaudo): 1 = cautela, 2 = controindicato; stesso criterio di esercizioCaricaIlFastidio e del collaudo SAF-02', regole: ['REC-04']
  },
  /* INT-4b (m9): con un fastidio dichiarato gli esercizi che restano con cautela (stress sulla zona >= stressNominato) non vanno sotto questo numero di ripetizioni in riserva: lontano dal cedimento
     sulla zona che da fastidio. Un pavimento in rirBersaglio: solo alza, non cambia serie, esercizi, volume né frequenza */
  rirConFastidio: {
    v: 2,
    forza: 'Convenzione', fonte: 'revisione indipendente dell onda 4 (m9); ricerca-recupero-infortuni-popolazioni §3 e §5.1 (lavoro lontano dal cedimento sulla zona dolente: prudenza, non una prova); stessa soglia del pavimento dei minorenni (MES_RIR.pisoMinorenni)', regole: ['REC-04']
  },
  /* il fastidio che si tollera: fino a 3/10 si continua e si osserva (DEC-01), oltre ci si ferma. È il limite basso del modello del dolore (che tollera fino a 5/10 se la mattina
     dopo è normale: validato sul tendine d’Achille, esteso alle altre zone per consenso, non per uno studio) e lo stesso di DEC-01 e della scheda del questionario */
  doloreMassimo: {
    v: 3,
    forza: 'Convenzione', fonte: 'DEC-01 (fastidio lieve, fino a 3/10: si continua e si osserva); modello del dolore di Silbernagel 2007 (fino a 5/10 se al mattino è normale: Moderata sul tendine, consenso per le altre zone), qui il limite basso; ricerca-recupero-infortuni-popolazioni §5.1', regole: ['REC-04', 'DEC-01']
  }
};
/* il valore di una soglia dei fastidi (null se il file non c’è: i test che caricano pochi script) */
function sogliaFastidi(nome) {
  return typeof SOGLIE_FASTIDI !== 'undefined' && SOGLIE_FASTIDI[nome] ? SOGLIE_FASTIDI[nome].v : null;
}
