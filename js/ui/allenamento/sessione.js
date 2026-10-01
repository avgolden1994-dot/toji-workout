/* Allenamento: prima il giorno, poi la sessione
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   ALLENAMENTO: prima il giorno, poi la sessione
   Una schermata = una domanda. La prima chiede "quale allenamento?",
   la seconda mostra solo quello, senza altre scelte intorno.
   ============================================================ */
window.backToDayPicker = function() {
  dockStato('nascosto');
  fermaTempoSeduta(false);
  tieniSchermoAcceso(false);
  fermaLavoro();
  document.getElementById('workout-day-picker').style.display = 'block';
  document.getElementById('workout-session').style.display = 'none';
  stopDropSet();
  closeRecoveryPanel();
  renderWorkoutDayPicker();
};

/* Il giorno di QUESTA settimana che corrisponde al giorno tipo, e se e
   gia stato completato: la spunta sta sulla data, nel calendario. */
function fattoQuestaSettimana(i) {
  const k = ymd(piuGiorni(lunediDi(new Date()), i));
  const v = loadCal()[k];
  return v && v.done ? Object.assign({ data: k }, v) : null;
}

function renderWorkoutDayPicker() {
  renderSeduteExtra();
  const data = loadData();
  const todayIdx = (new Date().getDay() + 6) % 7; /* lunedi = 0 */
  const container = document.getElementById('workout-days-list');

  container.innerHTML = DAYS.map((d, i) => {
    const fatto = fattoQuestaSettimana(i);
    if (fatto) {
      /* gia completato: si mostra come storico, e si riapre in sola lettura */
      return '<button class="wday-card wday-done' + (i === todayIdx ? ' today' : '') + '" onclick="openDoneView(\'' + fatto.data + '\')">' +
        '<div class="wday-main">' +
          '<div class="wday-name">' + escapeHtml(fatto.title || getDayTitle(d)) + ' <span class="wday-meta">(' + d + ')</span></div>' +
          '<div class="wday-meta">\u2713 Completato \u2022 ' + escapeHtml(fatto.summary || '') + '</div>' +
          '<div class="wday-progress"><span style="width:100%"></span></div>' +
        '</div>' +
        '<span class="wday-badge fatto">FATTO</span>' +
        '<span class="wday-go">\u203A</span>' +
      '</button>';
    }
    const list = data[d] || [];
    const totalSets = list.reduce((s, e) => s + e.sets, 0);
    const doneSets = list.reduce((s, e) => s + e.completedSets.filter(x => x.done).length, 0);
    const pct = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;
    const rest = isRestDay(d);
    const empty = rest || list.length === 0;
    const meta = rest
      ? '\u{1F634} Riposo'
      : (list.length === 0
          ? 'Nessun esercizio \u2014 costruiscilo nel Piano'
          : list.length + ' esercizi \u2022 ' + totalSets + ' serie' + (doneSets ? ' \u2022 ' + doneSets + ' gia fatte' : ''));

    return '<button class="wday-card ' + (empty ? 'empty' : '') + (i === todayIdx ? ' today' : '') + '" ' +
      'onclick="openWorkoutDay(\'' + d + '\')">' +
      '<div class="wday-main">' +
        '<div class="wday-name">' + escapeHtml(getDayTitle(d)) + (getDayTitle(d) !== d ? ' <span class="wday-meta">(' + d + ')</span>' : '') + '</div>' +
        '<div class="wday-meta">' + meta + '</div>' +
        (!rest && totalSets ? '<div class="wday-progress"><span style="width:' + pct + '%"></span></div>' : '') +
      '</div>' +
      (i === todayIdx ? '<span class="wday-badge">OGGI</span>' : '') +
      '<span class="wday-go">\u203A</span>' +
    '</button>';
  }).join('');
}

window.openWorkoutDay = function(day) {
  const data = loadData();
  if (isRestDay(day) && !specialeAttiva(day)) {
    if (!confirm(getDayTitle(day) + ' e segnato come riposo. Vuoi allenarti lo stesso?')) return;
  }
  if ((data[day] || []).length === 0) {
    alert(trP('Per %s non hai ancora esercizi. Costruisci la scheda nel tab Piano.', tr(getDayTitle(day))));
    return;
  }
  currentDay = day;
  armedSet = null;
  occupatoAperto = null;
  ripristinaMusica(true);   /* la canzone scelta nelle Opzioni e gia pronta */
  setTimeout(() => dockStato('sessione'), 0);   /* il lettore resta raggiungibile in seduta */
  if (!specialeAttiva(day)) applicaCaricoProgressivo(day);   /* il coach imposta i carichi della seduta (non in seduta libera o passata) */
  avviaTempoSeduta(day);
  document.getElementById('workout-day-picker').style.display = 'none';
  document.getElementById('workout-session').style.display = 'block';
  tieniSchermoAcceso(true);
  renderSpecialeBox();
  renderProntezza();
  renderDayBar();
  renderPiano();
  renderAllenamento();
};
