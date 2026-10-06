/* Soglie dello scarico: dose di prima, minimo di serie, protezioni dello scarico reattivo e stanchezza che non passa (MES-05, MES-07, CST-09)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLO SCARICO (coach v2, P3-B = W3-T5 snello; registro B4, B17, C.4; ricerca-mesocicli-periodizzazione-scarichi §3.6, §3.7;
   ricerca-psicologia-aderenza CST-09)
   La DOSE dello scarico dei programmi v2 non sta qui: è una sola, e sta in programma/soglie-struttura.js (scaricoSerie, scaricoCarico, verificaPrincipiante):
   DOSE_SCARICO (sicurezza/scarico.js) la deriva da lì. Qui stanno solo la dose dei programmi SALVATI PRIMA della v2 (che continuano con le regole di prima:
   registro D-P5), il minimo di serie, le protezioni e i segnali dello scarico reattivo (MES-07) e le soglie di CST-09.
   Quasi tutto è «Convenzione»: nessuna soglia di fatica è validata nei pesi (Saw 2016, revisione sul sovrallenamento); il consenso ECSS-ACSM 2013 (Meeusen) è Solido
   per lo spettro, non per i numeri. Una voce per numero: nome: { v, forza, fonte, regole }. Le soglie si leggono solo durante l’esecuzione, mai al caricamento.
   ============================================================ */
const SOGLIE_SCARICO = {
  /* i programmi salvati prima della v2 (nessun piano) tengono la dose di prima: «alta» a 0,30 delle serie, e le frasi di prima. Non è una seconda tabella dei programmi v2 */
  doseV1: {
    v: { bassa: { serie: 0.65, carico: 0.95, t: 'volume -35%' }, media: { serie: 0.5, carico: 0.9, t: 'volume -50% e carico -10%' }, alta: { serie: 0.3, carico: 0.9, t: 'volume -70% e carico -10%' } },
    forza: 'Convenzione', fonte: 'registro coach v2 D-P5 (i programmi salvati prima della v2 continuano con le regole di prima); dose CAR-03 di prima della v2, sostituita da scaricoSerie e scaricoCarico (soglie-struttura.js) nei programmi v2', regole: ['MES-05', 'CAR-03']
  },
  /* serie nello scarico: almeno 2 per l’esercizio da 3 serie in su; un esercizio da 2 serie si alleggerisce davvero (1 serie): prima la dose «-70%» era solo testo (bug N6) */
  scaricoSerieMinime: {
    v: { daTreInSu: 2, daDue: 1 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 e C.4 (MES-05: «minimo 2 serie per gli esercizi da ≥ 3»); ricerca-mesocicli-periodizzazione-scarichi §3.6 e bug N6 (un esercizio da 2 serie non veniva tagliato)', regole: ['MES-05']
  },
  /* scarico deciso dal coach per la fatica (DEC-06, PRZ-04, STR-01): una sola durata, in sedute (il minimo di MES-07: «3 sedute o 7 giorni, minimo 2») */
  reattivoSedute: {
    v: 2,
    forza: 'Convenzione', fonte: 'registro coach v2 B17 («una dose e una durata»); ricerca-mesocicli-periodizzazione-scarichi §3.7 («per le prossime 3 sedute o 7 giorni, minimo 2 sedute»); PRZ-04 e STR-01 erano già a 2 sedute', regole: ['MES-07']
  },
  /* le protezioni (MES-07): non nelle prime N settimane del blocco; non prima di N giorni dall’ultimo scarico; uno ogni N giorni al massimo; se lo scarico del programma è entro N giorni
     si fa quello; «Non ora» rimanda la proposta di N giorni */
  reattivoProtezioni: {
    v: { primeSettimaneDelBlocco: 2, giorniDalloScarico: 14, unoOgniGiorni: 21, programmatoEntroGiorni: 7, nonOraGiorni: 7 },
    forza: 'Convenzione', fonte: 'registro coach v2 B17 (protezioni di distanza); ricerca-mesocicli-periodizzazione-scarichi §3.7 («non nelle prime 2 settimane del blocco; non a meno di 14 giorni dall’ultimo scarico; al massimo uno ogni 3 settimane; se lo scarico programmato è entro 7 giorni si anticipa quello; bottone Non ora»)', regole: ['MES-07']
  },
  /* mai da un solo segnale: almeno N segnali distinti e almeno uno tra S1 (prontezza), S2 (forza), S3 (deriva dell’RPE); oppure un segnale forte */
  reattivoSegnali: {
    v: { distinti: 2, unoTra: ['S1', 'S2', 'S3'] },
    forza: 'Convenzione', fonte: 'registro coach v2 B17 (≥ 2 segnali distinti, almeno uno tra prontezza, forza, deriva dell’RPE); ricerca-mesocicli-periodizzazione-scarichi §3.7 (regola di scatto); Saw 2016 (più misure soggettive insieme, nessuna validata da sola)', regole: ['MES-07']
  },
  /* S1 prontezza bassa: media delle ultime N check-in sotto la soglia, oppure N giorni su `giorni` sotto la soglia; forte: media delle ultime N sotto `forteSotto` */
  segnaleProntezza: {
    v: { sotto: 50, mediaUltime: 3, giorniSu: 3, giorni: 7, forteSotto: 40 },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.7 (S1: media delle ultime 3 check-in < 50, oppure 3 giorni su 7 < 50, già PRZ-04; forte: media < 40); registro B18', regole: ['MES-07', 'PRZ-04']
  },
  /* S5 sonno «male» e S6 voglia «poca»: in almeno N delle ultime `checkIn` check-in (S6 non basta mai da sola: serve S1, S2 o S3) */
  segnaleSonnoVoglia: {
    v: { checkIn: 7, minimo: 4 },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.7 (S5 e S6: voce «male» o «poca» in ≥ 4 delle ultime 7 check-in)', regole: ['MES-07']
  },
  /* S7 sRPE: «Al limite» (o «Dura» arrivando stanco: sedutaPesante, come DEC-05 e DEC-06) in almeno N delle ultime `ultime` sedute */
  segnaleSedute: {
    v: { ultime: 3, alLimiteMin: 2 },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.7 (S7: «Al limite» in ≥ 2 delle ultime 3 sedute, oppure «Dura» con «Stanco» all’arrivo); MES-08', regole: ['MES-07', 'DEC-06']
  },
  /* S2 forza in calo: massimale stimato dell’ultima seduta di un multiarticolare di almeno `calo` sotto il migliore degli ultimi `giorni` giorni (sedute di scarico escluse),
     su almeno `multiarticolari` esercizi; forte su `forti`. L’ultima seduta dev’essere di non oltre `ultimaEntro` giorni fa */
  segnaleForza: {
    v: { calo: 0.05, multiarticolari: 2, forti: 3, giorni: 21, ultimaEntro: 10 },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.7 (S2: massimale ≤ -5% sul migliore delle ultime 3 settimane non di scarico su ≥ 2 multiarticolari; forte su ≥ 3); il rumore del RIR è circa 3% (MES-10)', regole: ['MES-07']
  },
  /* CST-09: stanchezza che non passa. Prontezza media dei `giorni` giorni (almeno `misureMin` misure) a `prontezzaMediaMax` o meno (3/8 della scala, CST-07), oppure `scarichiReattivi`
     scarichi decisi dal coach in `settimane` settimane; il messaggio si può nascondere e torna dopo `ripropostaGiorni` giorni */
  stanchezzaPersistente: {
    v: { giorni: 14, misureMin: 5, prontezzaMediaMax: 37, scarichiReattivi: 2, settimane: 6, ripropostaGiorni: 7 },
    forza: 'Convenzione', fonte: 'ricerca-psicologia-aderenza CST-09 (prontezza bassa nella media di 14 giorni, ≥ 5 misure, oppure 2 scarichi reattivi in 6 settimane); registro B17 e C.4; Meeusen 2013 (Solida per lo spettro, soglie Convenzione)', regole: ['CST-09']
  }
};
