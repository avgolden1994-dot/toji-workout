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

window.caricoProssimo = function(nome, base, repsTarget, setsBase) {
  const r = caricoProssimoBase(nome, base, repsTarget, setsBase);
  let ag;
  try { ag = aggiustiCoach(); } catch (e) { return r; }
  if (ag.scarico && ag.scarico.sedute > 0 && r.tipo !== 'scarico') {
    r.weight = arrotonda(r.weight * 0.9);
    r.sets = Math.max(2, Math.round((setsBase || 3) * 0.6));
    r.tipo = 'scarico';
    r.motivo = 'Scarico deciso dal coach: ' + ag.scarico.motivo;
  }
  const a = ag.esercizi[nome];
  if (a && a.sedute > 0) {
    const inc = incrementoPer(nome);
    if (a.fattore) { r.weight = arrotonda(r.weight * a.fattore); r.tipo = 'giu'; r.motivo = a.motivo; }
    else if (a.blocca && r.tipo === 'su') { r.weight = arrotonda(Math.max(0, r.weight - inc)); r.tipo = 'fermo'; r.motivo = 'Stesso carico: l ultima seduta era al limite'; }
    else if (a.extra && r.tipo === 'su') { r.weight = arrotonda(r.weight + inc); r.motivo += ' • +' + inc + ' kg in più: l ultima volta era leggero'; }
    else if (a.nota) { r.motivo = a.nota; }
    if (a.alteRip && !isTimeBased(nome)) { r.reps = Math.max(Number(r.reps) || 0, 12); r.motivo += ' \u2022 ripetizioni alte (12-20) per rispettare l articolazione'; }
  }
  if (!isTimeBased(nome) && r.weight > 0 && r.tipo !== 'scarico' && r.tipo !== 'giu') r.motivo += ' \u2022 ' + testoRir(nome);
  return r;
};
