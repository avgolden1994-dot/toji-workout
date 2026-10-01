/* Stato del coach
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PIANO: lo stato del coach in poche righe
   programma, periodo di vita, primo mese. Oggi resta pulito.
   ============================================================ */
function renderPianoCoach() {
  const box = document.getElementById('piano-coach');
  if (!box) return;
  if (!coachAttivo()) { box.innerHTML = ''; return; }
  let h = '';
  const sett = settimanaProgramma();
  if (sett && !sett.finito) {
    h += '<div class="pc-row"><span class="pc-t"><span>Programma</span> · <span>' + 'settimana # di #'.replace('#', sett.numero).replace('#', sett.totale) + '</span></span>' +
      '<span class="og-muted">' + (sett.fase === 'scarico' ? 'Scarico' : 'Carico') + '</span></div>' +
      '<div class="wday-progress"><span style="width:' + Math.round((sett.numero - 1) / sett.totale * 100) + '%"></span></div>';
  }
  h += htmlMomentoBreve() + htmlPrimiPassi();
  box.innerHTML = h ? '<div class="card pc-card">' + h + '</div>' : '';
}
function htmlMomentoBreve() {
  const m = momentoAttivo();
  if (!m) {
    return prontezzaBassaSettimana() ? '<div class="pc-row pc-sep"><span class="pc-t">' + ico('cuore') + ' <span>Settimana pesante?</span></span>' +
      '<button class="og-link" onclick="switchTab(\'impostazioni\'); openSetPage(\'coach\');">Dimmelo</button></div>' : '';
  }
  /* il periodo serve al coach: non resta in vista. Solo l avviso se esageri. */
  const giorni7 = tutteLeSedute().filter(h0 => { const d = dataSessione(h0); return d && d >= piuGiorni(new Date(), -7); }).length;
  const prev = ((getProfile() || {}).days) || 3;
  return m.guardia && giorni7 > prev + 1 ? '<div class="pc-row pc-sep"><span class="pc-warn"><b>' + giorni7 + '</b> <span>allenamenti in 7 giorni: il riposo fa crescere.</span></span></div>' : '';
}
/* Il coach chiede come va solo quando serve:
   l ultimo giorno di allenamento della settimana (se non ha gia chiesto)
   oppure alla data limite del periodo. */
function ultimoGiornoAllenamento() {
  const data = loadData(), cal = loadCal(), lun = lunediDi(new Date());
  let ult = -1;
  DAYS.forEach((d, i) => {
    const v = cal[ymd(piuGiorni(lun, i))];
    if ((v && v.done) || !(isRestDay(d) || (v && v.rest) || !(data[d] || []).length)) ult = i;
  });
  return ult;
}
function momentoDaChiedere() {
  if (!coachAttivo()) return null;
  const m = momentoAttivo();
  if (!m) return null;
  if (m.scaduto) return 'scaduto';
  const mo = (getProfile() || {}).momento || {};
  const lun = ymd(lunediDi(new Date()));
  if ((mo.verificato || mo.dal || '') >= lun) return null;
  const ult = ultimoGiornoAllenamento();
  const oggiI = (new Date().getDay() + 6) % 7;
  return ult >= 0 && oggiI >= ult ? 'settimana' : null;
}
function htmlDomandaMomento() {
  const q = momentoDaChiedere();
  if (!q) return '';
  const m = momentoAttivo();
  return '<div class="card og-saltata og-momento"><div class="og-dol-t">' + ico('cuore') + ' <span>' + m.nome + '</span></div>' +
    '<p>' + (q === 'scaduto' ? 'Il periodo è finito: come va?' : 'Fine settimana: come va?') + '</p>' +
    '<div class="pc-btns">' + (q === 'scaduto' ?
      '<button class="btn-archive mo-ok" onclick="fineMomento(true)">Altre 2 settimane</button>' :
      '<button class="btn-archive mo-ok" onclick="verificaMomento(\'continua\')">Continuo</button>') +
    '<button class="btn-archive" onclick="vaiAlMomento()">Va meglio</button></div></div>';
}
