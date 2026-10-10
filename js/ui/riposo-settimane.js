/* Giorni di riposo e settimane salvate
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ---- Giorni di riposo ---- */
const restKey = () => 'coach_plus_rest_' + currentMode;
const loadRestDays = () => { const r = leggiJSON(restKey(), '[]'); return Array.isArray(r) ? r : []; };
const saveRestDays = (d) => localStorage.setItem(restKey(), JSON.stringify(d));
window.isRestDay = function(day) { return loadRestDays().indexOf(day) !== -1; };

window.toggleRestDay = function() {
  const days = loadRestDays();
  const i = days.indexOf(currentDay);
  if (i === -1) {
    const n = (loadData()[currentDay] || []).length;
    const frase = n === 1
      ? 'Su %s hai 1 esercizio. Segnarlo come riposo lo lascia salvato ma nascosto. Continuare?'
      : 'Su %s hai ' + n + ' esercizi. Segnarlo come riposo li lascia salvati ma nascosti. Continuare?';
    if (n > 0 && !confirm(trP(frase, tr(getDayTitle(currentDay))))) return;
    days.push(currentDay);
  } else {
    days.splice(i, 1);
  }
  saveRestDays(days);
  renderPiano();
  renderGruppi();
  renderAllenamento();
};

function syncRestToggle() {
  const btn = document.getElementById('rest-toggle-btn');
  if (!btn) return;
  const on = isRestDay(currentDay);
  btn.classList.toggle('on', on);
  btn.innerText = on ? '\u{1F634} Giorno di riposo \u2014 tocca per riattivarlo' : '\u{1F634} Segna come giorno di riposo';
}

/* ---- Settimane salvate: il piano si archivia con la sua data ---- */
const weeksKey = () => 'coach_plus_weeks_' + currentMode;
const loadWeeks = () => { const r = leggiJSON(weeksKey(), '[]'); return Array.isArray(r) ? r : []; };
const saveWeeks = (w) => localStorage.setItem(weeksKey(), JSON.stringify(w));

function isoWeekLabel(d) {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const n = 1 + Math.round(((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return date.getFullYear() + '-S' + String(n).padStart(2, '0');
}

window.saveWeekSnapshot = function() {
  const data = loadData();
  const total = DAYS.reduce((s, d) => s + (data[d] || []).length, 0);
  if (total === 0) { alert('Il programma e vuoto: aggiungi almeno un esercizio prima di salvarlo.'); return; }

  const now = new Date();
  const weeks = loadWeeks();
  const label = isoWeekLabel(now);
  const entry = {
    id: String(now.getTime()),
    week: label,
    date: formatNow(),
    titles: loadTitles(),
    rest: loadRestDays(),
    days: JSON.parse(JSON.stringify(data)),
    totalExercises: total
  };
  const existing = weeks.findIndex(w => w.week === label);
  if (existing !== -1) {
    if (!confirm(trP('Hai gia salvato la settimana %s. Sovrascriverla?', label))) return;
    weeks[existing] = entry;
  } else {
    weeks.unshift(entry);
  }
  saveWeeks(weeks);
  showUndo(trP('Programma della settimana %s salvato.', label));
  renderWeeks();
};

window.restoreWeek = function(id) {
  const w = loadWeeks().find(x => x.id === id);
  if (!w) return;
  if (!confirm(trP('Ripristinare il programma del %s? Il piano attuale verra sostituito.', tr(w.date)))) return;   /* w.date e salvata in italiano: si traduce solo da mostrare */
  saveData(w.days);
  if (w.titles) saveTitles(w.titles);
  if (w.rest) saveRestDays(w.rest);
  armedSet = null;
  renderDayBar(); renderPiano(); renderGruppi(); renderAllenamento();
  switchTab('piano');
  showUndo(trP('Programma del %s ripristinato.', tr(w.date)));
};

window.deleteWeek = function(id) {
  const weeks = loadWeeks();
  const i = weeks.findIndex(x => x.id === id);
  if (i === -1) return;
  const removed = weeks.splice(i, 1)[0];
  saveWeeks(weeks);
  renderWeeks();
  showUndo('Settimana eliminata.', () => {
    const cur = loadWeeks();
    cur.splice(i, 0, removed);
    saveWeeks(cur);
    renderWeeks();
  });
};

function renderWeeks() {
  const c = document.getElementById('weeks-list');
  if (!c) return;
  const weeks = loadWeeks();
  if (!weeks.length) {
    c.innerHTML = '<span class="muted">Nessun programma salvato. Usa "Salva questa settimana" nel Piano.</span>';
    return;
  }
  c.innerHTML = weeks.map(w => {
    const giorni = DAYS.filter(d => (w.days[d] || []).length > 0).length;
    return '<div class="week-card">' +
      '<div class="week-main">' +
        '<div class="week-name">Settimana <span data-no-tr>' + escapeHtml(w.week) + '</span></div>' +
        '<div class="week-meta">' + escapeHtml(w.date) + ' \u2022 ' + giorni + (giorni === 1 ? ' giorno' : ' giorni') + ' \u2022 ' + w.totalExercises + (w.totalExercises === 1 ? ' esercizio' : ' esercizi') + '</div>' +
      '</div>' +
      '<button class="track-select-btn" onclick="restoreWeek(\'' + w.id + '\')">Ripristina</button>' +
      '<button class="del-btn" onclick="deleteWeek(\'' + w.id + '\')">\u2715</button>' +
    '</div>';
  }).join('');
}
