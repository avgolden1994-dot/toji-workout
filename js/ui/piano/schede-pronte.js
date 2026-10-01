/* Selettore schede pronte e titolo della giornata
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDE PRONTE (libreria) + titolo della giornata
   ============================================================ */
window.openTemplatePicker = function() {
  document.getElementById('template-target-day').innerText = `Verranno caricate su: ${getDayTitle(currentDay)}`;
  const container = document.getElementById('template-list');
  const usage = weekUsage();
  container.innerHTML = WORKOUT_TEMPLATES.map(t => {
    const totalSets = t.exercises.reduce((s, e) => s + e.sets, 0);
    const estMin = Math.round(t.exercises.reduce((s, e) => s + e.sets * (30 + e.rest), 0) / 60);
    const inOggi = t.exercises.filter(e => (usage[e.name] || []).indexOf(currentDay) !== -1).length;
    const inSett = t.exercises.filter(e => (usage[e.name] || []).length > 0).length;
    const stato = inOggi === t.exercises.length ? 'done' : (inSett > 0 ? 'partial' : 'fresh');
    const etichetta = stato === 'done' ? '\u2713 gia caricata' : (stato === 'partial' ? '\u21BB ' + inSett + ' di ' + t.exercises.length + ' gia in settimana' : '\u2726 nuova');
    return `
      <div class="template-card tpl-${stato}">
        <span class="tpl-state ${stato}">${etichetta}</span>
        <div class="template-card-head">
          <div class="template-name">${escapeHtml(t.title)}</div>
          <span class="template-tag">${escapeHtml(t.tag)}</span>
        </div>
        <div class="template-desc">${escapeHtml(t.desc)}</div>
        <div class="template-meta">${t.exercises.length} esercizi • ${totalSets} serie • ~${estMin} min</div>
        <div class="template-actions">
          <button class="template-btn replace" onclick="applyTemplate('${t.id}', true)">Sostituisci</button>
          <button class="template-btn append" onclick="applyTemplate('${t.id}', false)">Aggiungi in coda</button>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('template-overlay').classList.remove('hidden');
};

window.closeTemplatePicker = function() {
  document.getElementById('template-overlay').classList.add('hidden');
};

window.applyTemplate = function(templateId, replace) {
  const tpl = WORKOUT_TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;
  const data = loadData();
  const existing = data[currentDay] || [];

  if (replace && existing.length > 0) {
    if (!confirm(`Sostituire i ${existing.length} esercizi di ${getDayTitle(currentDay)} con la scheda "${tpl.title}"?`)) return;
  }

  const fresh = tpl.exercises.map(e => normalizeExerciseRecord({ ...e, completedSets: [] }));
  data[currentDay] = replace ? fresh : existing.concat(fresh);
  saveData(data);

  /* Se il giorno non è ancora stato rinominato, prende il nome della scheda:
     così la giornata si legge "Push — Petto, Spalle, Tricipiti" e non "Lunedì". */
  if (replace) {
    const titles = loadTitles();
    if (!titles[currentDay]) {
      titles[currentDay] = tpl.title;
      saveTitles(titles);
    }
  }

  armedSet = null;
  closeTemplatePicker();
  renderDayBar();
  renderPiano();
  renderAllenamento();
  renderGruppi(); /* il carosello deve rileggere lo stato: altrimenti la scheda
                     appena applicata continuava a risultare "nuova" */
};

window.renameDayTitle = function() {
  const current = getDayTitle(currentDay);
  const next = prompt(`Nome della scheda per ${currentDay}:`, current);
  if (next === null) return;
  const titles = loadTitles();
  const trimmed = next.trim();
  if (trimmed === '' || trimmed === currentDay) delete titles[currentDay];
  else titles[currentDay] = trimmed;
  saveTitles(titles);
  renderDayBar();
};
