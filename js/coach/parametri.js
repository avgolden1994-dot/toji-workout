/* Parametri del coach: tutte le soglie e i fattori in un posto solo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PARAMETRI DEL COACH
   Prima questi numeri erano scritti dentro le funzioni. Cambiare un valore
   qui lo cambia ovunque la regola e usata. Ogni voce dice a quale regola
   della mappa (docs/coach-mappa-regole.md) appartiene.
   ============================================================ */
const COACH_PARAMETRI = {
  /* PRG-18/19/31: principianti, over 65 e modalita prudente: mai piu di tante serie per esercizio */
  serieMaxPrudente: 3,
  /* PRG: tetto di serie per muscolo in una seduta (oltre si sprecano) */
  serieMaxMuscoloSeduta: 11,
  /* PRG: chi ha poca massa magra (FFMI basso) parte con un volume piu alto */
  fattoreVolumeFfmiBasso: 1.2,
  /* CAR/DOL/DEC: scarico "reattivo" (dolore, prontezza, stanchezza): carico e serie */
  scaricoReattivoCarico: 0.9,
  scaricoReattivoSerie: 0.6,
  /* CAR-10: scarico della progressione (meta serie) e carico dopo due mancate di fila */
  scaricoProgressioneSerie: 0.5,
  dopoDueMancateCarico: 0.9,
  /* PRO-ORA: prontezza prima della seduta: sopra 'buona' tutto invariato, sopra 'media' meno 4%, altrimenti meno 10% */
  prontezzaBuona: 70, prontezzaMedia: 50, prontezzaFattoreMedia: 0.96, prontezzaFattoreBassa: 0.9,
  /* ESI/ADE: sotto questa quota di sedute fatte la costanza e considerata bassa */
  aderenzaMinima: 0.7
};

/* Una regola si puo spegnere (utile per le regole nuove e per le prove).
   Le regole gia in uso restano sempre accese: spegnerle non e previsto. */
const REGOLE_SPEGNIBILI = ['RIC-01', 'RIC-02', 'RIC-03', 'RIC-04', 'RIC-05', 'INT-04', 'INT-05',
  /* onda 0 del coach v2 (W0-T3, W0-T4): ALG-02 «blocca»/«extra», MES-02 RIR di partenza, MES-06 carico di riferimento e ripresa dopo lo
     scarico, MES-09 etichetta di fase sulla seduta, MES-10/11/12 scarico fuori dalle analisi, PRN-01 esigenza del principiante, STD-01
     tabelle di forza, ETA-04 niente numeri su peso e cibo ai minori */
  'ALG-02', 'MES-02', 'MES-06', 'MES-09', 'MES-10', 'MES-11', 'MES-12', 'PRN-01', 'STD-01', 'ETA-04'];
const REGOLE_SPENTE_KEY = 'tz_regole_spente';
window.regolaAttiva = function(codice) {
  if (!REGOLE_SPEGNIBILI.includes(codice)) return true;
  try { return !JSON.parse(localStorage.getItem(REGOLE_SPENTE_KEY) || '[]').includes(codice); } catch (e) { return true; }
};
