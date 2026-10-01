/* Navigazione: giorni e tab
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   NAVIGAZIONE: giorni e tab
   ============================================================ */
const daysContainer = document.getElementById('days-container');

function renderDayBar() {
  daysContainer.innerHTML = DAYS.map(d => `
    <div class="day-chip ${d === currentDay ? 'active' : ''}" onclick="selectDay('${d}')">${d}</div>
  `).join('');
  document.getElementById('day-title').innerText = getDayTitle(currentDay);
  document.getElementById('allenamento-day-label').innerText = getDayTitle(currentDay);
}

window.selectDay = function(day) {
  currentDay = day;
  planDayOpen = true;
  armedSet = null;
  stopDropSet();
  renderDayBar();
  renderPiano();
  renderAllenamento();
  if (currentTab === 'piano') renderGruppi();
};
