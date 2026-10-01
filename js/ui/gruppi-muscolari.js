/* Schermata gruppi muscolari
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHERMATA GRUPPI MUSCOLARI
   ============================================================ */
let selectedGroups = [];

/* Toccare un gruppo apre la sua schermata dedicata invece di allungare
   la pagina: la ricerca sui form mobile mostra che lo scroll lungo e' il
   peggiore dei pattern, mentre passare a una schermata dedicata no. */
window.toggleGroup = function(groupId) {
  if (selectedGroups.indexOf(groupId) === -1) selectedGroups.push(groupId);
  openGroupSheet(groupId);
};

let sheetGroup = null;
let sheetOrder = null;      /* ordine congelato mentre la schermata e aperta */
let sheetExpanded = false;  /* tenda della schermata gruppo */
let suggestedExpanded = false;
let suggestedOrder = [];
let suggestedOrderKey = null;

/* Toccare un gruppo apre direttamente le sue opzioni. Nulla viene aggiunto
   da solo: la scelta resta dell'utente, un esercizio alla volta. */
window.toggleGroupInPlan = function(groupId) {
  openGroupSheet(groupId);
};

window.toggleSuggestedExpanded = function() {
  suggestedExpanded = !suggestedExpanded;
  renderSuggested();
};

/* Riga selezionabile: si tocca tutta la riga, l'icona si illumina.
   Nessun campo da compilare qui: parametri fissi 3 x 10. */
function pickRow(ex, selected, onclick) {
  const emoji = (ex.name.match(/^\S+/) || ['\u{1F3CB}\uFE0F'])[0];
  const nome = ex.name.replace(EMOJI_TESTA, '');
  const reps = defaultRepsFor(ex.name);
  const unita = isTimeBased(ex.name) ? 's' : '';
  return '<button class="pick-row ' + (selected ? 'on' : '') + '" onclick="' + onclick + '">' +
    '<span class="pick-icon' + (ex.group && MUSCLE_GROUPS[ex.group] ? ' pick-fig' : '') + '">' +
      (ex.group && MUSCLE_GROUPS[ex.group] ? muscleFigure(ex.group) : emoji) + '</span>' +
    '<span class="pick-main">' +
      '<span class="pick-name">' + escapeHtml(nome) + '</span>' +
      '<span class="pick-meta">' + DEFAULT_SETS + ' \u00D7 ' + reps + unita +
        ' \u2022 ' + (ex.type === 'compound' ? 'multiarticolare' : 'isolamento') + '</span>' +
    '</span>' +
    '<span class="pick-check">' + (selected ? '\u2713' : '+') + '</span>' +
  '</button>';
}

/* Toccando la riga si aggiunge o si toglie: un solo gesto per entrambi */
window.togglePickExercise = function(name) {
  const data = loadData();
  const gia = (data[currentDay] || []).some(e => e.name === name);
  if (gia) removeExerciseByName(name);
  else addLibraryExercise(name);
};

function renderSuggested() {
  const card = document.getElementById('suggested-card');
  const listEl = document.getElementById('suggested-list');
  if (!card) return;

  if (selectedGroups.length === 0 || isRestDay(currentDay)) {
    card.style.display = 'none';
    return;
  }
  card.style.display = 'block';

  const data = loadData();
  const present = new Set((data[currentDay] || []).map(e => e.name));
  const usage = weekUsage();

  let items = [];
  selectedGroups.forEach(gid => {
    items = items.concat(EXERCISE_LIBRARY.filter(e => e.group === gid));
  });

  /* Ordine congelato: mai scelti prima, poi usati altrove, poi gia in scheda. */
  const chiave = currentDay + '|' + selectedGroups.join(',');
  if (suggestedOrderKey !== chiave) {
    suggestedOrderKey = chiave;
    suggestedOrder = items.slice().sort((a, b) => {
      const r = usageRank(usageState(a.name, usage)) - usageRank(usageState(b.name, usage));
      if (r !== 0) return r;
      return (a.type === b.type ? 0 : (a.type === 'compound' ? -1 : 1));
    }).map(e => e.name);
  }
  const pos = {};
  suggestedOrder.forEach((n, i) => { pos[n] = i; });
  items.sort((a, b) => (pos[a.name] === undefined ? 999 : pos[a.name]) - (pos[b.name] === undefined ? 999 : pos[b.name]));

  const nomi = selectedGroups.map(g => MUSCLE_GROUPS[g].label).join(', ');
  document.getElementById('suggested-hint').innerText =
    'Proposte per ' + nomi + ': tocca l\'esercizio per metterlo in scheda. Parte sempre da ' + DEFAULT_SETS + ' serie da ' + DEFAULT_REPS + ', poi lo regoli il giorno dell\'allenamento.';

  /* Prime 4 in chiaro, il resto dietro una tenda: cosi la schermata resta corta */
  const VISIBILI = 4;
  const sopra = items.slice(0, VISIBILI);
  const sotto = items.slice(VISIBILI);

  let html = sopra.map(ex => pickRow(ex, present.has(ex.name),
    'togglePickExercise(\'' + ex.name.replace(/'/g, "\\'") + '\')')).join('');

  if (sotto.length) {
    const quantiScelti = sotto.filter(e => present.has(e.name)).length;
    html += '<button class="drawer-btn ' + (suggestedExpanded ? 'open' : '') + '" onclick="toggleSuggestedExpanded()">' +
      '<span>' + (suggestedExpanded ? 'Chiudi' : 'Altri ' + sotto.length + ' esercizi') +
      (quantiScelti ? ' \u2022 ' + quantiScelti + ' gia scelti' : '') + '</span>' +
      '<span class="caret">\u25BE</span></button>' +
      '<div class="drawer-body ' + (suggestedExpanded ? 'open' : '') + '">' +
        sotto.map(ex => pickRow(ex, present.has(ex.name),
          'togglePickExercise(\'' + ex.name.replace(/'/g, "\\'") + '\')')).join('') +
      '</div>';
  }

  listEl.innerHTML = html;
}

window.openGroupSheet = function(groupId) {
  sheetGroup = groupId;
  sheetOrder = null; /* si ricalcola a ogni apertura, non a ogni tocco */
  sheetExpanded = false;
  if (selectedGroups.indexOf(groupId) === -1) selectedGroups.push(groupId);
  const g = MUSCLE_GROUPS[groupId];
  document.getElementById('sheet-title').innerText = g.label;
  document.getElementById('sheet-map').innerHTML = renderBodyMap([groupId]);
  document.getElementById('group-sheet').classList.remove('hidden');
  renderSheetExercises();
};

window.closeGroupSheet = function() {
  document.getElementById('group-sheet').classList.add('hidden');
  sheetGroup = null;
  sheetOrder = null;
  renderPiano();
  renderGruppi();
};

function renderSheetExercises() {
  if (!sheetGroup) return;
  const data = loadData();
  const dayList = data[currentDay] || [];
  const present = new Set(dayList.map(e => e.name));
  const usage = weekUsage();

  if (!sheetOrder) {
    sheetOrder = EXERCISE_LIBRARY
      .filter(e => e.group === sheetGroup)
      .sort((a, b) => {
        const r = usageRank(usageState(a.name, usage)) - usageRank(usageState(b.name, usage));
        if (r !== 0) return r;
        return (a.type === b.type ? 0 : (a.type === 'compound' ? -1 : 1));
      })
      .map(e => e.name);
  }
  const list = sheetOrder.map(n => findExercise(n)).filter(Boolean);

  const added = list.filter(e => present.has(e.name)).length;
  document.getElementById('sheet-sub').innerText = getDayTitle(currentDay) + ' \u2022 ' + dayList.length + ' esercizi in scheda';
  document.getElementById('sheet-hint').innerText = added > 0
    ? added + ' di questo gruppo gia in scheda'
    : 'Tocca un esercizio per sceglierlo';
  document.getElementById('sheet-done-btn').innerText = added > 0
    ? '\u2713 Fatto \u2014 torna al piano'
    : '\u2190 Torna al piano';

  const VISIBILI = 4;
  const sopra = list.slice(0, VISIBILI);
  const sotto = list.slice(VISIBILI);

  let html = sopra.map(ex => pickRow(ex, present.has(ex.name),
    'togglePickExercise(\'' + ex.name.replace(/'/g, "\\'") + '\')')).join('');

  if (sotto.length) {
    const quantiScelti = sotto.filter(e => present.has(e.name)).length;
    html += '<button class="drawer-btn ' + (sheetExpanded ? 'open' : '') + '" onclick="toggleSheetExpanded()">' +
      '<span>' + (sheetExpanded ? 'Chiudi' : 'Altri ' + sotto.length + ' esercizi') +
      (quantiScelti ? ' \u2022 ' + quantiScelti + ' gia scelti' : '') + '</span>' +
      '<span class="caret">\u25BE</span></button>' +
      '<div class="drawer-body ' + (sheetExpanded ? 'open' : '') + '">' +
        sotto.map(ex => pickRow(ex, present.has(ex.name),
          'togglePickExercise(\'' + ex.name.replace(/'/g, "\\'") + '\')')).join('') +
      '</div>';
  }

  document.getElementById('sheet-exercises').innerHTML = html;
}

window.toggleSheetExpanded = function() {
  sheetExpanded = !sheetExpanded;
  renderSheetExercises();
};

/* Rimuove dal giorno corrente un esercizio individuato per nome */
window.removeExerciseByName = function(name) {
  const data = loadData();
  const idx = (data[currentDay] || []).findIndex(e => e.name === name);
  if (idx === -1) return;
  const removed = data[currentDay][idx];
  data[currentDay].splice(idx, 1);
  saveData(data);
  renderPiano();
  renderAllenamento();
  if (sheetGroup) renderSheetExercises(); else renderGruppi();
  showUndo(trP('%s rimosso', trEs(name)), () => {
    const d2 = loadData();
    d2[currentDay].splice(idx, 0, removed);
    saveData(d2);
    renderPiano(); renderAllenamento();
    if (sheetGroup) renderSheetExercises(); else renderGruppi();
  });
}

window.clearGroupSelection = function() {
  if (selectedGroups.length === 0) return;
  const quanti = selectedGroups.length;
  selectedGroups = [];
  suggestedExpanded = false;
  suggestedOrderKey = null;   /* senza questo l ordine vecchio restava in memoria */
  suggestedOrder = [];
  renderGruppi();
  renderSuggested();
  showUndo('Proposte nascoste. Il piano non e stato toccato.');
};

/* Figura anatomica disegnata in SVG: niente immagini esterne, cosi
   funziona anche offline in palestra e segue i colori del tema.
   Vista frontale a sinistra, posteriore a destra. */
