/* Taratura del RIR (CAR-14, W1-T3)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   TARATURA DEL RIR (CAR-14)
   Il coach non sa quanto sbagli a stimare le ripetizioni in riserva: una volta per blocco l ultima serie di un isolamento va a cedimento
   (apertura della seduta) e a fine seduta la correzione appresa (rirBias degli aggiusti) si aggiorna (dopoSeduta, fase 20).
   Ponte dell onda 0 (W0-T4, B10): la taratura non impara piu dal confronto tra serie diverse, ogni taratura dimezza la correzione gia
   appresa (che cosi si spegne) e non si fa a principianti, minori, over 65, modalita prudente e sul core.
   W1-T3 sposta qui, senza cambiare niente, le due meta che stavano in regole-ricerca.js (scelta dell esercizio in applicaCaricoProgressivo
   e apprendimento in imparaDallaSeduta). La taratura nuova (previsione sulla stessa serie, settimana 2-3 del blocco) e di W3-T3: riscrive questo file.
   ============================================================ */

/* Apertura della seduta: nell ultima settimana di carico del blocco, l ultima serie del primo isolamento va a cedimento (tecnica
   «calibrazione» di oggi). Solo per intermedi e avanzati adulti, sotto i 65 anni, senza modalita prudente e mai sul core: chi e piu
   fragile o ha ancora poca esperienza non va a cedimento per tarare una stima. `list` e il piano del giorno: lo cambia sul posto. */
function segnaEsercizioTaratura(list) {
  const st = settimanaProgramma(), pr = getProgramma(), pcal = profiloCoach();
  const puoTarare = pcal.livello !== 'principiante' && !pcal.prudente && pcal.eta < 65 && !(pcal.eta > 0 && pcal.eta < 18);
  if (puoTarare && st && pr && pr.fasi && st.fase === 'carico' && pr.fasi[st.numero] === 'scarico') {
    const iso = list.find(e => tipoCarico(e.name) === 'isolamento' && !isTimeBased(e.name) && (findExercise(e.name) || {}).group !== 'core' && !e.completedSets.some(x => x.done));
    if (iso) iso.tecnicaSeduta = 'calibrazione';
  }
}

/* Dopo la seduta: ogni esercizio tarato dimezza la correzione appresa (rirBias). B10 (ponte fino alla taratura nuova di W3-T3): il confronto
   tra l ultima serie al cedimento e l RPE delle serie prima, gia stanche, ha sempre lo stesso segno e non misura la stima del RIR: non si
   impara piu niente da li. Si salva solo se c e stata una taratura. */
function apprendiTaraturaRir(list) {
  const tarati = list.filter(e => e.tecnicaSeduta === 'calibrazione' && e.completedSets.some(x => x.done));
  if (!tarati.length) return;
  const ag = aggiustiCoach();
  tarati.forEach(() => {
    const mezza = (Number(ag.rirBias) || 0) * 0.5;
    ag.rirBias = Math.abs(mezza) < 0.1 ? 0 : Math.round(mezza * 10) / 10;
  });
  salvaAggiusti(ag);
}
registraFase('dopoSeduta', 20, 'CAR-14', (v, c) => { apprendiTaraturaRir(c.lista); });
