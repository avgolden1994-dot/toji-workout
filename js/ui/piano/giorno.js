/* Tab Piano: scelta del giorno e sua schermata
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   TAB PIANO
   ============================================================ */
function syncBuildingLine(n) {
  const el = document.getElementById('group-day-current');
  if (el) el.innerText = 'Stai costruendo: ' + getDayTitle(currentDay) + ' (' + n + ' esercizi)';
}

/* ============================================================
   PIANO: prima la scelta del giorno, poi la sua schermata
   Una schermata = una domanda: qui si sceglie il giorno, e solo dopo
   si vedono muscoli, proposte e scheda di quel giorno.
   ============================================================ */
window.backToPlanDays = function() {
  planEditMode = false;
  try { renderPianoCoach(); } catch (e) {}
  const scr = document.getElementById('plan-day-screen');
  if (scr) scr.classList.remove('viewing');
  document.getElementById('plan-day-picker').style.display = 'block';
  document.getElementById('plan-day-screen').style.display = 'none';
  if (document.body.classList.contains('select-mode')) toggleSelectMode();
  if (document.body.classList.contains('reorder-mode')) toggleReorderMode();
  renderPlanDayPicker();
};

window.openPlanDayScreen = function(day, forzaModifica) {
  closeWeekSheet();
  currentDay = day;
  /* Giorno gia costruito: lo si guarda. Giorno vuoto: non c e niente da
     guardare, quindi si entra direttamente a costruirlo. */
  const pieno = (loadData()[day] || []).length > 0 || isRestDay(day);
  planEditMode = forzaModifica === true ? true : !pieno;
  planDayOpen = true;
  armedSet = null;
  selectedGroups = [];
  suggestedOrderKey = null;
  document.getElementById('plan-day-picker').style.display = 'none';
  document.getElementById('plan-day-screen').style.display = 'block';
  applicaModalitaGiorno();
  renderDayBar();
  renderPiano();
  renderGruppi();
  renderSuggested();
};

let planEditMode = false;

function applicaModalitaGiorno() {
  const scr = document.getElementById('plan-day-screen');
  if (!scr) return;
  scr.classList.toggle('viewing', !planEditMode);
  if (!planEditMode) renderDayView();
}

window.enterPlanEdit = function() {
  planEditMode = true;
  applicaModalitaGiorno();
  renderPiano(); renderGruppi(); renderSuggested();
  const scr = document.getElementById('plan-day-screen');
  if (scr && scr.scrollIntoView) scr.scrollIntoView({ block: 'start' });
};

window.exitPlanEdit = function() {
  /* uscendo dalla modifica si chiudono anche gli strumenti aperti */
  if (document.body.classList.contains('select-mode')) toggleSelectMode();
  if (document.body.classList.contains('reorder-mode')) toggleReorderMode();
  const wrap = document.getElementById('manual-form-wrap');
  if (wrap && wrap.style.display !== 'none') toggleManualForm();
  selectedGroups = [];
  const pieno = (loadData()[currentDay] || []).length > 0 || isRestDay(currentDay);
  planEditMode = !pieno;   /* se hai svuotato il giorno, resti a costruirlo */
  applicaModalitaGiorno();
  renderPlanDayPicker();
  if (pieno) showUndo(trP('Allenamento di %s salvato', tr(getDayTitle(currentDay))));
};

/* Vista in sola lettura: nome, serie x ripetizioni, carico, recupero.
   Niente pulsanti di modifica: per cambiare si passa dal tasto apposito. */
function renderDayView() {
  const list = (loadData()[currentDay] || []);
  const cont = document.getElementById('day-view-list');
  const sum = document.getElementById('day-view-summary');
  const start = document.getElementById('day-view-start');
  if (!cont) return;

  if (isRestDay(currentDay)) {
    sum.innerText = 'Giorno di riposo';
    cont.innerHTML = '<div class="dv-empty">\u{1F634}<br>Oggi si recupera. Il riposo fa parte del programma.</div>';
    if (start) start.style.display = 'none';
    return;
  }
  if (start) start.style.display = list.length ? 'block' : 'none';

  const serie = list.reduce((s2, e) => s2 + e.sets, 0);
  const minuti = Math.round(list.reduce((s2, e) => s2 + e.sets * (30 + e.rest), 0) / 60);
  sum.innerText = list.length + ' esercizi \u2022 ' + serie + ' serie \u2022 circa ' + minuti + ' minuti';

  cont.innerHTML = list.map((e, i) => {
    const unita = isTimeBased(e.name) ? 's' : '';
    return '<div class="dv-row">' +
      '<span class="dv-num">' + (i + 1) + '</span>' +
      '<span class="dv-main">' +
        '<span class="dv-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) + '</span>' +
        '<span class="dv-meta"><b>' + e.sets + ' \u00D7 ' + e.reps + unita + '</b>' +
          (e.weight ? ' \u2022 ' + e.weight + ' kg' : '') +
          ' \u2022 recupero ' + e.rest + 's' +
          (e.superset ? ' \u2022 superset' : '') + '</span>' +
        (e.note ? '<span class="dv-note">' + escapeHtml(e.note) + '</span>' : '') +
      '</span>' +
      '<button class="dv-info" onclick="openExerciseInfo(\'' + jsArg(e.name) + '\')" aria-label="Come si fa">\u2139</button>' +
    '</div>';
  }).join('');
}

function aggiornaIngressoAgente() {
  const el = document.getElementById('agent-entry-meta');
  if (!el) return;
  if (!coachAttivo()) { el.innerText = 'Spento: serve il consenso ai dati'; return; }
  const s = settimanaProgramma();
  if (!s) { el.innerText = 'Crea un programma su misura'; return; }
  el.innerText = s.finito ? 'Programma concluso: rifai la BIA' : 'Settimana ' + s.numero + ' di ' + s.totale + (s.fase === 'scarico' ? ' \u2022 scarico' : ' \u2022 carico');
}

/* Figura della settimana: ogni muscolo colorato secondo le serie
   settimanali (sotto il minimo, nel range utile, carico alto). Toccando
   un muscolo si vede quanto lo alleni e in quali giorni. */
let planMapGruppo = null;
function renderPlanMap() {
  const box = document.getElementById('plan-map');
  if (!box) return;
  const vol = weeklyVolumeByGroup();
  box.innerHTML = renderBodyMap(planMapGruppo ? [planMapGruppo] : [], vol);
  box.querySelectorAll('[data-g]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (ev) => { ev.stopPropagation(); planMapSelect(el.getAttribute('data-g')); });
  });
  /* la testa non si allena: un messaggio che sparisce da solo */
  const svg = box.querySelector('svg');
  if (svg) svg.addEventListener('click', (ev) => {
    if (!svg.getScreenCTM) return;
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const q = pt.matrixTransform(svg.getScreenCTM().inverse());
    if (q.y < 37 && (Math.abs(q.x - 72) < 16 || Math.abs(q.x - 188) < 16)) toccaTesta();
  });
  renderPlanMapList();
  const info = document.getElementById('plan-map-info');
  if (!info) return;
  if (!planMapGruppo) {
    const lavorati = Object.keys(vol).filter(g => vol[g].sets > 0).length;
    info.innerHTML = '<b>' + lavorati + ' di ' + Object.keys(MUSCLE_GROUPS).length + '</b> gruppi allenati<br><span>Tocca un muscolo per i dettagli</span>';
    return;
  }
  const v = vol[planMapGruppo] || { sets: 0, days: 0 };
  const lvl = volLevel(v.sets);
  const data = loadData();
  const giorni = DAYS.filter(d => !isRestDay(d) && (data[d] || []).some(e => { const m = findExercise(e.name); return m && m.group === planMapGruppo; }));
  const giudizio = !lvl ? 'Non lo alleni questa settimana' : lvl === 'start' ? 'Sotto le ' + VOL_MIN_UTILE + ' serie utili' : lvl === 'ok' ? 'Nel range utile' : 'Oltre le ' + VOL_MAX_UTILE + ' serie: rischi di non recuperare';
  info.innerHTML = '<b>' + MUSCLE_GROUPS[planMapGruppo].label + '</b> · ' + v.sets + ' serie<br><span>' + giudizio + '</span>' +
    (giorni.length ? '<div class="pl-days">' + giorni.map(d => '<button onclick="planDayClick(\'' + d + '\')">' + escapeHtml(d.slice(0, 3)) + '</button>').join('') + '</div>' : '');
}
window.planMapSelect = function(g) {
  planMapGruppo = planMapGruppo === g ? null : g;
  renderPlanMap();
  const l = document.getElementById('plan-map-list');
  if (planMapGruppo && l && l.scrollIntoView) l.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
window.toccaTesta = function() {
  showUndo('Per questo un po’ di skin-care migliora sempre la situazione.', null, 3000);
};
/* toccato un muscolo: i suoi esercizi giorno per giorno, con la data,
   e la possibilita di aggiungerne uno in ogni giorno di allenamento */
function renderPlanMapList() {
  const box = document.getElementById('plan-map-list');
  if (!box) return;
  if (!planMapGruppo) { box.hidden = true; box.innerHTML = ''; return; }
  const g = planMapGruppo, data = loadData(), lun = lunediDi(new Date());
  const nome = MUSCLE_GROUPS[g] ? MUSCLE_GROUPS[g].label : g;
  const vol = (weeklyVolumeByGroup()[g] || { sets: 0 }).sets;
  const giorni = DAYS.map((d, i) => ({ d: d, data: piuGiorni(lun, i) })).filter(x => !isRestDay(x.d));
  box.hidden = false;
  box.innerHTML = '<div class="pl-glist-h"><span class="pl-glist-t">' + nome + '</span><span class="og-muted"><b>' + vol + '</b> <span>serie a settimana</span></span></div>' +
    (giorni.length ? giorni.map(x => {
      const es = (data[x.d] || []).filter(e => { const m = findExercise(e.name); return m && m.group === g; });
      return '<div class="pl-gday"><div class="pl-gday-h"><span><span>' + escapeHtml(getDayTitle(x.d)) + '</span> · <span data-no-tr>' +
          x.data.toLocaleDateString(LOCALE(), { weekday: 'short', day: 'numeric', month: 'short' }) + '</span></span>' +
          '<button class="og-link" onclick="aggiungiPerGruppo(\'' + x.d + '\',\'' + g + '\')">+ Aggiungi</button></div>' +
        (es.length ? es.map(e => '<button class="pl-gex" onclick="openPlanDayScreen(\'' + x.d + '\')"><span>' + escapeHtml(senzaEmoji(e.name)) + '</span>' +
          '<small>' + e.sets + ' \u00D7 ' + e.reps + (e.weight ? ' \u00B7 ' + e.weight + ' kg' : '') + ' ›</small></button>').join('')
          : '<div class="pl-gnone">Nessun esercizio per questo gruppo</div>') + '</div>';
    }).join('') : '<div class="pl-gnone">Nessun giorno di allenamento: aggiungine uno qui sotto.</div>');
}
window.aggiungiPerGruppo = function(d, g) {
  openPlanDayScreen(d, true);
  toggleGroupInPlan(g);
};

function renderPlanDayPicker() {
  aggiornaIngressoAgente();
  const data = loadData();
  const oggi = (new Date().getDay() + 6) % 7;   /* lunedi = 0 */
  const cont = document.getElementById('plan-week-cal');
  if (!cont) return;

  const SIGLE = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];

  cont.innerHTML = DAYS.map((d, i) => {
    const list = data[d] || [];
    const riposo = isRestDay(d);
    const pieno = !riposo && list.length > 0;
    const titolo = getDayTitle(d);
    /* nel poco spazio della cella entra una parola sola */
    const breve = titolo === d ? '' : titolo.split(/[\s\u2014\-\/]+/)[0].slice(0, 8);

    return '<button class="cal-day ' + (pieno ? 'pieno ' : '') + (riposo ? 'riposo ' : '') +
      (i === oggi ? 'oggi' : '') + '" data-giorno="' + d + '" onclick="planDayClick(\'' + d + '\')" ' +
      'aria-label="' + escapeHtml(titolo) + '">' +
      '<span class="cal-dow">' + SIGLE[i] + '</span>' +
      (riposo
        ? '<span class="cal-num pl-moon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg></span>'
        : '<span class="cal-num' + (pieno ? '' : ' vuoto') + '">' + (pieno ? list.length : '\u2013') + '</span>') +
      '<span class="cal-sub">' + (riposo ? 'Riposo' : (pieno ? escapeHtml(breve || 'Esercizi') : '')) + '</span>' +
    '</button>';
  }).join('');

  /* trascinando un giorno sopra un altro, i due si scambiano */
  cont.querySelectorAll('.cal-day').forEach(c => attachSwapDrag(c, {
    selector: '#plan-week-cal .cal-day', attr: 'data-giorno',
    label: (d) => getDayTitle(d) === d ? d : d + ' \u2022 ' + getDayTitle(d),
    onSwap: planSwapDays
  }));

  renderPlanMap();

  /* riepilogo in una riga sola, al posto delle sette schede */
  const giorni = DAYS.filter(d => !isRestDay(d) && (data[d] || []).length > 0).length;
  const serie = DAYS.reduce((s2, d) => s2 + (isRestDay(d) ? 0 : (data[d] || []).reduce((a, e) => a + e.sets, 0)), 0);
  const sum = document.getElementById('cal-summary');
  if (sum) {
    sum.innerText = giorni === 0
      ? 'Nessun allenamento ancora programmato'
      : giorni + ' allenamenti \u2022 ' + serie + ' serie';
  }
}

/* Le due schermate a parte della modifica del giorno */
window.openAddEx = function() {
  document.getElementById('add-ex-sub').innerText = getDayTitle(currentDay);
  document.getElementById('add-ex-sheet').classList.remove('hidden');
  renderGruppi(); renderSuggested();
};
window.closeAddEx = function() {
  document.getElementById('add-ex-sheet').classList.add('hidden');
  renderPiano();
};
window.openReco = function() {
  document.getElementById('reco-sub').innerText = getDayTitle(currentDay);
  document.getElementById('reco-sheet').classList.remove('hidden');
  renderGruppi(); renderPiano(); renderSuggested();
  /* le schede pronte qui si vedono tutte, non solo quelle dei gruppi accesi */
  const c = document.getElementById('group-templates-card');
  if (c) c.style.display = 'block';
};
window.closeReco = function() {
  document.getElementById('reco-sheet').classList.add('hidden');
  renderPiano();
};
