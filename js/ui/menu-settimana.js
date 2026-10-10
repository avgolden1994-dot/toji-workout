/* Menu della settimana
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   MENU DELLA SETTIMANA (la maniglia \u2261)
   Da qui si fa tutto senza dover svuotare il mese: cancellare un
   singolo giorno, svuotare la settimana, copiarla su quella dopo o
   su altre settimane. Trascinando la maniglia si copia come prima.
   ============================================================ */
let wmLunedi = null;

window.openWeekMenu = function(lk) {
  wmLunedi = lk;
  renderWeekMenu();
  document.getElementById('week-menu').classList.remove('hidden');
};
window.closeWeekMenu = function() {
  document.getElementById('week-menu').classList.add('hidden');
  wmLunedi = null;
};

function renderWeekMenu() {
  const cal = loadCal();
  const l = daYmd(wmLunedi);
  const SIGLE = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
  document.getElementById('wm-title').innerText = etichettaSettimana(wmLunedi);

  const giorni = [0, 1, 2, 3, 4, 5, 6].map(i => {
    const k = ymd(piuGiorni(l, i)), v = cal[k];
    const stato = !v ? 'Vuoto' : (v.done ? 'Fatto' : (v.rest ? 'Riposo' : (v.items || []).length + ' eserc.'));
    const bloccato = !v || v.done;
    return '<button class="wm-day ' + (bloccato ? 'bloccato' : '') + '" ' +
      (bloccato ? 'disabled' : 'onclick="wmCancellaGiorno(\'' + k + '\')"') + '>' +
      '<span class="cal-dow">' + SIGLE[i] + '</span>' +
      '<span class="wm-day-st">' + stato + '</span>' +
      '<span class="wm-x">' + (bloccato ? (v && v.done ? '\u2713' : '\u2013') : '\u2715') + '</span></button>';
  }).join('');

  document.getElementById('wm-body').innerHTML =
    '<div class="aw-sec">Cancella un giorno</div>' +
    '<div class="pref-note">I giorni gia fatti restano: sono il tuo storico.</div>' +
    '<div class="wm-days">' + giorni + '</div>' +
    '<div class="aw-sec">Tutta la settimana</div>' +
    '<button class="set-row-btn" onclick="wmCopiaProssima()">\u2B07 Copia sulla settimana successiva</button>' +
    '<button class="set-row-btn" onclick="wmSelezionaPerCopiare()">\u{1F4CB} Copia su altre settimane...</button>' +
    '<button class="set-row-btn danger" onclick="wmSvuotaSettimana()">\u{1F5D1} Svuota questa settimana</button>';
}

window.wmCancellaGiorno = function(k) {
  const cal = loadCal();
  const tolto = cal[k];
  if (!tolto || tolto.done) return;
  delete cal[k];
  saveCal(cal);
  renderMonthCal();
  renderWeekMenu();
  showUndo(trP('%s cancellato', daYmd(k).toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric' })), () => {
    const c = loadCal(); c[k] = tolto; saveCal(c); renderMonthCal(); if (wmLunedi) renderWeekMenu();
  });
};

window.wmSvuotaSettimana = function() {
  const cal = loadCal();
  const backup = JSON.stringify(cal);
  let n = 0, fatti = 0;
  for (let i = 0; i < 7; i++) {
    const k = ymd(piuGiorni(daYmd(wmLunedi), i));
    if (!cal[k]) continue;
    if (cal[k].done) { fatti++; continue; }   /* lo storico non si cancella */
    delete cal[k]; n++;
  }
  saveCal(cal);
  renderMonthCal();
  renderWeekMenu();
  showUndo(n + ' giorni cancellati' + (fatti ? ', ' + fatti + ' gia fatti conservati' : ''), () => {
    localStorage.setItem(calKey(), backup); renderMonthCal(); if (wmLunedi) renderWeekMenu();
  }, 8000);
};

window.wmCopiaProssima = function() {
  const dest = ymd(piuGiorni(daYmd(wmLunedi), 7));
  const origine = wmLunedi;
  closeWeekMenu();
  mcCopyWeeks(origine, [dest]);
};

window.wmSelezionaPerCopiare = function() {
  const l = wmLunedi;
  closeWeekMenu();
  mcSelectWeek(l);
};

window.mcClearMonth = function() {
  const cal = loadCal();
  const backup = JSON.stringify(cal);
  const mese = mcAnno + '-' + String(mcMese + 1).padStart(2, '0');
  let tolti = 0;
  Object.keys(cal).forEach(k => {
    if (k.slice(0, 7) === mese && !cal[k].done) { delete cal[k]; tolti++; }
  });
  saveCal(cal);
  renderMonthCal();
  showUndo(tolti + (tolti === 1 ? ' giorno tolto dal mese' : ' giorni tolti dal mese'), () => { localStorage.setItem(calKey(), backup); renderMonthCal(); }, 8000);
};

/* ---- Dettaglio di un giorno ---- */
window.mcOpenDay = function(k) {
  const v = loadCal()[k];
  if (v && v.done && v.sessione) { openDoneView(k); return; }
  const d = daYmd(k);
  document.getElementById('mc-day-title').innerText = d.toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric', month: 'long' });
  document.getElementById('mc-day-sub').innerText = v ? (v.done ? 'Allenamento fatto' : (v.rest ? 'Riposo' : 'In programma')) : 'Niente in programma';

  let html = '';
  if (!v) {
    html = '<div class="dv-empty">Nessun allenamento in questo giorno.</div>' +
      '<button class="btn-archive" onclick="mcPlanDay(\'' + k + '\')">\u{1F4CC} Metti qui il ' + giornoSettimana(d) + ' della settimana tipo</button>';
  } else if (v.rest) {
    html = '<div class="dv-empty">\u{1F634}<br>Giorno di riposo.</div>' +
      '<button class="btn-archive" onclick="mcRemoveDay(\'' + k + '\')">Togli dal calendario</button>';
  } else {
    if (v.done) {
      html += '<div class="mc-done-box"><div class="mc-done-t">\u2713 Fatto</div>' +
        (v.summary ? '<div class="dv-meta">' + escapeHtml(v.summary) + '</div>' : '') +
        (v.doneAt ? '<div class="dv-meta">' + escapeHtml(v.doneAt) + '</div>' : '') + '</div>';
    }
    html += '<div class="card"><div class="section-title">' + escapeHtml(v.title || '') + '</div>' +
      (v.items || []).map((e, i) => '<div class="dv-row"><span class="dv-num">' + (i + 1) + '</span>' +
        '<span class="dv-main"><span class="dv-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) + '</span>' +
        '<span class="dv-meta"><b>' + e.sets + ' \u00D7 ' + e.reps + '</b></span></span></div>').join('') +
      '</div>';
    html += '<a class="btn-archive mc-gcal" href="' + linkGoogle(k, v) + '" target="_blank" rel="noopener noreferrer">\u{1F4C6} Aggiungi solo questo a Google Calendar</a>';
    if (!v.done) html += '<button class="btn-archive" onclick="mcRemoveDay(\'' + k + '\')">Togli dal calendario</button>';
  }
  document.getElementById('mc-day-body').innerHTML = html;
  document.getElementById('mc-day-sheet').classList.remove('hidden');
};

window.mcCloseDay = function() { document.getElementById('mc-day-sheet').classList.add('hidden'); };

window.mcPlanDay = function(k) {
  const cal = loadCal();
  const v = voceDaPiano(daYmd(k));
  if (!v) { alert('Nella settimana tipo quel giorno e vuoto.'); return; }
  cal[k] = v; saveCal(cal);
  mcCloseDay(); renderMonthCal();
};

window.mcRemoveDay = function(k) {
  const cal = loadCal();
  const tolto = cal[k];
  delete cal[k]; saveCal(cal);
  mcCloseDay(); renderMonthCal();
  showUndo('Giorno tolto', () => { const c2 = loadCal(); c2[k] = tolto; saveCal(c2); renderMonthCal(); });
};

/* Chiamata a fine allenamento: il giorno di OGGI riceve la spunta */
window.segnaFattoNelCalendario = function(entry) {
  const cal = loadCal();
  const k = ymd(entry.passata ? new Date(entry.id) : new Date());
  if (entry.passata && cal[k] && cal[k].done) return;   /* quel giorno ha gia la sua seduta */
  const fatte = entry.exercises.reduce((s, e) => s + e.doneSets, 0);
  const totali = entry.exercises.reduce((s, e) => s + e.totalSets, 0);
  cal[k] = {
    title: entry.titolo || getDayTitle(entry.day),
    day: entry.day,
    items: entry.exercises.map(e => ({ name: e.name, sets: e.totalSets, reps: '' })),
    done: true,
    doneAt: entry.date,
    historyId: entry.id,
    sessione: entry.sessione || null,
    summary: fatte + ' di ' + totali + ' serie' + (entry.berserk ? ' \u2022 con cedimento' : ''),
    cardio: entry.cardio || undefined
  };
  saveCal(cal);
};
