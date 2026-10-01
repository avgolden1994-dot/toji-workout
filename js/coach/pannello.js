/* Pannello coach nel tab Piano
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PANNELLO COACH (nel tab Piano)
   ============================================================ */
function renderCoach() {
  const box = document.getElementById('coach-box');
  box.style.display = 'block';
  const container = document.getElementById('coach-suggestions');
  const titleEl = document.getElementById('coach-title');
  const data = loadData();
  const list = data[currentDay] || [];

  const startGroup = selectedGroups.length === 1 ? selectedGroups[0] : null;
  const suggestions = suggestNextExercises(list, startGroup, 3);

  if (suggestions.length === 0) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';

  if (list.length === 0) {
    titleEl.innerText = startGroup
      ? 'Da dove partire per ' + MUSCLE_GROUPS[startGroup].label
      : 'Da dove partire';
  } else {
    const last = list[list.length - 1];
    titleEl.innerText = trP('Dopo %s', trEs(last.name.replace(/^[^\s]+\s/, '')));
  }

  container.innerHTML = suggestions.map(s =>
    '<div class="coach-item">' +
      '<div><div class="coach-name">' + escapeHtml(s.name) + '</div>' +
      '<div class="coach-reason">' + escapeHtml(s.reason) + '</div></div>' +
      '<button class="lib-add-btn" onclick="addLibraryExercise(\'' + jsArg(s.name) + '\')" aria-label="Aggiungi">+</button>' +
    '</div>'
  ).join('');
}
