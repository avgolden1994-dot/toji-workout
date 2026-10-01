/* Selezione multipla e azioni di massa
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SELEZIONE MULTIPLA E AZIONI DI MASSA
   Cancellare venti esercizi uno swipe alla volta e' sfiancante:
   qui si spuntano e si eliminano in un colpo solo, con Annulla.
   ============================================================ */
let selectMode = false;
let selectedIdx = [];

window.toggleSelectMode = function() {
  selectMode = !selectMode;
  selectedIdx = [];
  document.body.classList.toggle('select-mode', selectMode);
  document.getElementById('bulk-bar').style.display = selectMode ? 'flex' : 'none';
  document.getElementById('select-toggle-btn').classList.toggle('active', selectMode);
  document.getElementById('select-toggle-btn').innerText = selectMode ? '\u2715 Fine' : '\u2611 Seleziona';
  if (selectMode && document.body.classList.contains('reorder-mode')) toggleReorderMode();
  renderPiano();
};

window.togglePick = function(idx) {
  const i = selectedIdx.indexOf(idx);
  if (i === -1) selectedIdx.push(idx);
  else selectedIdx.splice(i, 1);
  renderPiano();
};

window.selectAllPlan = function() {
  const n = (loadData()[currentDay] || []).length;
  selectedIdx = selectedIdx.length === n ? [] : Array.from({ length: n }, (_, i) => i);
  renderPiano();
};

function syncBulkBar() {
  const delBtn = document.getElementById('bulk-del-btn');
  const allBtn = document.getElementById('bulk-all-btn');
  if (!delBtn) return;
  const n = (loadData()[currentDay] || []).length;
  delBtn.innerText = 'Elimina (' + selectedIdx.length + ')';
  delBtn.disabled = selectedIdx.length === 0;
  allBtn.innerText = (selectedIdx.length === n && n > 0) ? 'Deseleziona tutti' : 'Seleziona tutti';
}

window.deleteSelected = function() {
  if (selectedIdx.length === 0) return;
  const data = loadData();
  const backup = JSON.parse(JSON.stringify(data[currentDay]));
  const n = selectedIdx.length;
  data[currentDay] = data[currentDay].filter((_, i) => selectedIdx.indexOf(i) === -1);
  saveData(data);
  selectedIdx = [];
  armedSet = null;
  renderPiano(); renderAllenamento(); renderGruppi(); renderSuggested();
  showUndo(n + ' esercizi eliminati', () => {
    const d2 = loadData();
    d2[currentDay] = backup;
    saveData(d2);
    renderPiano(); renderAllenamento(); renderGruppi(); renderSuggested();
  });
};

window.clearDay = function() {
  const data = loadData();
  const backup = JSON.parse(JSON.stringify(data[currentDay] || []));
  if (backup.length === 0) { alert('Questo giorno e gia vuoto.'); return; }
  data[currentDay] = [];
  saveData(data);
  armedSet = null;
  renderPiano(); renderAllenamento(); renderGruppi(); renderSuggested();
  showUndo(trP('%s svuotato (' + backup.length + ' esercizi)', tr(getDayTitle(currentDay))), () => {
    const d2 = loadData();
    d2[currentDay] = backup;
    saveData(d2);
    renderPiano(); renderAllenamento(); renderGruppi(); renderSuggested();
  }, 8000);
};

/* Copiare un giorno evita di ricostruire la stessa scheda sette volte */
window.copyDayTo = function() {
  const data = loadData();
  const src = data[currentDay] || [];
  if (src.length === 0) { alert('Non c e niente da copiare in questo giorno.'); return; }
  const scelta = prompt('In quale giorno copio ' + getDayTitle(currentDay) + '?\n' +
    DAYS.map((d, i) => (i + 1) + ') ' + d).join('\n'), '');
  if (scelta === null) return;
  const idx = parseInt(scelta, 10) - 1;
  const target = DAYS[idx];
  if (!target) { alert('Scrivi un numero da 1 a 7.'); return; }
  if (target === currentDay) { alert('E il giorno da cui stai copiando.'); return; }

  const backup = JSON.parse(JSON.stringify(data[target] || []));
  if (backup.length > 0 && !confirm(getDayTitle(target) + ' ha gia ' + backup.length + ' esercizi. Li sostituisco?')) return;

  data[target] = JSON.parse(JSON.stringify(src)).map(e => normalizeExerciseRecord(
    Object.assign({}, e, { completedSets: [], skipped: false })
  ));
  saveData(data);
  renderPiano(); renderAllenamento();
  showUndo(trP('Copiato in %s', tr(getDayTitle(target))), () => {
    const d2 = loadData();
    d2[target] = backup;
    saveData(d2);
    renderPiano(); renderAllenamento();
  });
};

/* Riordino: frecce su/giù (più affidabili del drag su mobile sudato) */
window.toggleReorderMode = function() {
  const on = document.body.classList.toggle('reorder-mode');
  document.getElementById('reorder-toggle-btn').classList.toggle('active', on);
  document.getElementById('reorder-toggle-btn').innerText = on ? '✓ Fatto' : '⇅ Riordina';
};

window.moveExercise = function(idx, delta) {
  const data = loadData();
  const list = data[currentDay];
  const target = idx + delta;
  if (target < 0 || target >= list.length) return;
  [list[idx], list[target]] = [list[target], list[idx]];
  saveData(data);
  armedSet = null;
  renderPiano();
  renderAllenamento();
};

window.duplicateExercise = function(idx) {
  const data = loadData();
  const list = data[currentDay];
  const src = list[idx];
  if (!src) return;
  const copy = normalizeExerciseRecord({
    name: src.name, sets: src.sets, reps: src.reps, weight: src.weight,
    rest: src.rest, note: src.note, superset: false, completedSets: []
  });
  list.splice(idx + 1, 0, copy);
  saveData(data);
  armedSet = null;
  renderPiano();
  renderAllenamento();
};

/* Superset = eseguito di fila con l'esercizio precedente (il primo non può esserlo) */
window.toggleSuperset = function(idx) {
  if (idx === 0) {
    alert('Il primo esercizio non può essere in superset: serve un esercizio precedente a cui agganciarlo.');
    return;
  }
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex) return;
  ex.superset = !ex.superset;
  saveData(data);
  renderPiano();
  renderAllenamento();
};

window.startWorkoutFromPlan = function() {
  const data = loadData();
  if ((data[currentDay] || []).length === 0) {
    alert('Aggiungi almeno un esercizio al piano prima di iniziare.');
    return;
  }
  if (document.body.classList.contains('reorder-mode')) toggleReorderMode();
  const giorno = currentDay;
  switchTab('allenamento');
  openWorkoutDay(giorno); /* arrivi dal piano: salta la scelta del giorno */
};

let editingExerciseIdx = null;
let planDayOpen = true; /* se la lista esercizi del giorno corrente e aperta */

document.getElementById('exercise-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = loadData();
  const sets = Number(document.getElementById('sets').value) || 0;
  const payload = {
    name: document.getElementById('exercise-name').value,
    sets,
    reps: Number(document.getElementById('reps').value) || 0,
    weight: Number(document.getElementById('weight').value) || 0,
    rest: Number(document.getElementById('rest').value) || 0,
    note: document.getElementById('note').value.trim()
  };

  if (editingExerciseIdx !== null && data[currentDay][editingExerciseIdx]) {
    const existing = data[currentDay][editingExerciseIdx];
    payload.completedSets = existing.completedSets; /* normalize adatta lunghezza/default ai nuovi sets */
    payload.superset = existing.superset;
    data[currentDay][editingExerciseIdx] = normalizeExerciseRecord(payload);
  } else {
    data[currentDay].push(normalizeExerciseRecord({ ...payload, completedSets: [], superset: false }));
  }

  saveData(data);
  window.cancelEditExercise();
  renderPiano();
  renderAllenamento();
});

window.toggleManualForm = function(forceOpen) {
  const wrap = document.getElementById('manual-form-wrap');
  const btn = document.getElementById('manual-toggle-btn');
  const open = forceOpen === true ? true : wrap.style.display === 'none';
  wrap.style.display = open ? 'block' : 'none';
  btn.innerText = open ? '\u2715 Chiudi inserimento manuale' : '\u270F\uFE0F Aggiungi un esercizio a mano';
  btn.classList.toggle('active', open);
};

window.startEditExercise = function(idx) {
  const data = loadData();
  const e = data[currentDay][idx];
  if (!e) return;
  document.getElementById('exercise-name').value = e.name;
  document.getElementById('sets').value = e.sets;
  document.getElementById('reps').value = e.reps;
  document.getElementById('weight').value = e.weight;
  document.getElementById('rest').value = e.rest;
  document.getElementById('note').value = e.note || '';
  editingExerciseIdx = idx;
  document.getElementById('form-submit-btn').innerText = '✎ Aggiorna Esercizio';
  document.getElementById('cancel-edit-btn').style.display = 'block';
  toggleManualForm(true); /* il form e' collassato: va aperto per far vedere i campi */
};

window.cancelEditExercise = function() {
  editingExerciseIdx = null;
  document.getElementById('exercise-form').reset();
  document.getElementById('exercise-select').value = '';
  document.getElementById('sets').value = 3;
  document.getElementById('reps').value = 10;
  document.getElementById('weight').value = 0;
  document.getElementById('rest').value = 90;
  document.getElementById('note').value = '';
  document.getElementById('form-submit-btn').innerText = '+ Inserisci Esercizio';
  document.getElementById('cancel-edit-btn').style.display = 'none';
};

window.deletePianoExercise = function(idx) {
  const data = loadData();
  const removed = data[currentDay][idx];
  if (!removed) return;
  data[currentDay].splice(idx, 1);
  saveData(data);
  armedSet = null;
  if (editingExerciseIdx === idx) window.cancelEditExercise();
  renderPiano();
  renderAllenamento();
  renderGruppi();
  showUndo(trP('%s eliminato', trEs(removed.name)), () => {
    const d2 = loadData();
    d2[currentDay].splice(idx, 0, removed);
    saveData(d2);
    renderPiano(); renderAllenamento(); renderGruppi();
  });
};
