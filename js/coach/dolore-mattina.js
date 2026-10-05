/* Controllo del dolore la mattina dopo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONTROLLO DEL DOLORE LA MATTINA DOPO (Silbernagel 2007)
   Un dolore fino a 5/10 durante la seduta e accettabile se torna al
   livello di base entro la mattina dopo. Il coach lo chiede in Oggi:
   se e tornato normale toglie il -10%, altrimenti lo tiene.
   ============================================================ */
function controlloDoloreDaFare() {
  if (!coachAttivo()) return null;
  const c = aggiustiCoach().controlloDolore;
  if (!c || !c.dal || c.dal >= ymd(new Date())) return null;
  return c;
}
function htmlControlloDolore() {
  const c = controlloDoloreDaFare();
  if (!c) return '';
  const zone = Object.keys(c.zone).map(z => (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1]);
  return '<div class="card og-dolore"><div class="og-dol-t">' + ico('cuore') + ' Controllo del coach</div>' +
    '<p><span>Dolore segnalato l’ultima volta</span>: <b>' + zone.join(', ') + '</b><br><span>Stamattina è tornato come prima?</span></p>' +
    '<div class="og-dol-b"><button class="btn-main" onclick="rispostaDolore(true)">Sì, tutto normale</button>' +
    '<button class="btn-archive" onclick="rispostaDolore(false)">No, ancora</button></div></div>';
}
window.rispostaDolore = function(passato) {
  const ag = aggiustiCoach();
  const c = ag.controlloDolore;
  if (!c) return;
  if (passato) {
    c.esercizi.forEach(n => { const a = ag.esercizi[n]; if (a && a.fattore >= 0.9) delete ag.esercizi[n]; });
    showUndo('Bene: il dolore è passato, carichi normali');
  } else {
    segnaDoloreEsigenza();
    showUndo('Il carico resta ridotto del 10%. Se continua a crescere, senti un fisioterapista.');
  }
  ag.controlloDolore = null;
  salvaAggiusti(ag);
  if (typeof renderOggi === 'function') renderOggi();
};

/* a fine seduta si consumano gli aggiustamenti usati */
function consumaAggiusti(entry) {
  const ag = aggiustiCoach();
  (entry.sessione || []).forEach(e => {
    const a = ag.esercizi[e.name];
    if (a) { a.sedute = (a.sedute || 1) - 1; if (a.sedute <= 0) delete ag.esercizi[e.name]; }
  });
  if (ag.scarico) { ag.scarico.sedute -= 1; if (ag.scarico.sedute <= 0) ag.scarico = null; }
  salvaAggiusti(ag);
}

/* B7 (DEC-02): dolore a gomito o ginocchio: -10% con ampiezza senza dolore e almeno cosi tante ripetizioni in riserva */
const RIR_MIN_DOLORE = 3;

/* Il carico della prossima seduta, fase 50 AGG della catena 'carico' (regia/fasi.js, W1-T3): sopra caricoProssimoBase (fase 10, regole-ricerca.js:
   progressione, scarico del programma e ripresa dopo lo scarico, MES-06) mette gli aggiustamenti del coach (scarico deciso CAR-10, dolore,
   «blocca» ed «extra» ALG-02) e la frase del RIR. Prima era la funzione caricoProssimo stessa, avvolta poi da regole-nuove.js e intensita.js:
   ora sono tutte fasi (60 RIC, 70 INT) con l ordine scritto. */
function aggiustiAlCarico(r, c) {
  const nome = c.nome, setsBase = c.setsBase;
  let ag;
  try { ag = aggiustiCoach(); } catch (e) { return r; }
  if (ag.scarico && ag.scarico.sedute > 0 && r.tipo !== 'scarico') {
    /* CAR-10: scarico deciso dal coach. MES-06: si calcola sul carico di riferimento (caricoRiferimento), mai su un carico che un altro
       scarico ha gia tagliato (la seduta di prima era di scarico: il motore parte da li); e mai piu di quello che il motore proponeva
       (dolore, rientro) se quella proposta non viene da uno scarico. */
    const rif = isTimeBased(nome) || !regolaAttiva('MES-06') ? 0 : caricoRiferimento(nome);
    const ultima = rif > 0 ? sedutePerEsercizio(nome, 1)[0] : null;
    const dopoScarico = !!(ultima && esercizioInScarico(ultima.h, ultima.ex));
    r.weight = arrotonda((rif > 0 && (dopoScarico || rif <= r.weight) ? rif : r.weight) * COACH_PARAMETRI.scaricoReattivoCarico);
    r.sets = Math.max(2, Math.round((setsBase || 3) * COACH_PARAMETRI.scaricoReattivoSerie));
    r.tipo = 'scarico';
    r.motivo = 'Scarico deciso dal coach: ' + ag.scarico.motivo;
  }
  const a = ag.esercizi[nome];
  if (a && a.sedute > 0) {
    const inc = incrementoPer(nome);
    const alg02 = regolaAttiva('ALG-02'), ult = alg02 ? pesoUltimoDi(nome) : null;
    if (a.fattore) { r.weight = arrotonda(r.weight * a.fattore); r.tipo = 'giu'; r.motivo = a.motivo; }
    /* ALG-02: «blocca» = nessun aumento, quindi carico e ripetizioni dell ultima volta (non un incremento in meno: con +1 ripetizione
       o con un aumento da RPE il carico finiva sotto o sopra quello di prima); «extra» solo se il «su» era un aumento di carico.
       Con la regola spenta torna il comportamento di prima. */
    else if (a.blocca && r.tipo === 'su') {
      if (alg02 && ult) { r.weight = ult.weight; if (ult.reps > 0) r.reps = ult.reps; }
      else r.weight = arrotonda(Math.max(0, r.weight - inc));
      r.tipo = 'fermo'; r.motivo = 'Stesso carico: l ultima seduta era al limite';
    }
    else if (a.extra && r.tipo === 'su' && (!alg02 || (ult && r.weight > ult.weight))) { r.weight = arrotonda(r.weight + inc); r.motivo += ' • +' + inc + ' kg in più: l ultima volta era leggero'; }
    else if (a.nota) { r.motivo = a.nota; }
    if (a.alteRip && !isTimeBased(nome)) r.motivo += ' • ampiezza senza dolore, almeno ' + RIR_MIN_DOLORE + ' ripetizioni in riserva';
  }
  /* il RIR di oggi; dopo uno scarico e una ripetizione in piu e lo dice testoRir (MES-06) */
  if (!isTimeBased(nome) && r.weight > 0 && r.tipo !== 'scarico' && r.tipo !== 'giu') r.motivo += ' • ' + testoRir(nome);
  return r;
}
registraFase('carico', 50, 'AGG', aggiustiAlCarico);
