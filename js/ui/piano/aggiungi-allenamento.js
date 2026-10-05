/* Aggiungi allenamento alla settimana
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   AGGIUNGI ALLENAMENTO ALLA SETTIMANA
   Due passi: 1) quale allenamento (una scheda pronta o un giorno che
   hai gia costruito), 2) su quali giorni. Evita di entrare giorno per
   giorno a ricostruire la stessa cosa.
   ============================================================ */
let awStep = 1;
let awSource = null;      /* { tipo: 'scheda'|'giorno', id } */
let awDays = [];
let awMode = 'sostituisci';

function awEsercizi(src) {
  if (!src) return [];
  if (src.tipo === 'custom') {
    return awCustom.map(n => {
      const m = findExercise(n);
      return m ? { name: m.name, sets: DEFAULT_SETS, reps: defaultRepsFor(m.name), weight: m.weight, rest: m.rest } : null;
    }).filter(Boolean);
  }
  if (src.tipo === 'scheda') {
    const t = WORKOUT_TEMPLATES.find(x => x.id === src.id);
    return t ? t.exercises : [];
  }
  return (loadData()[src.id] || []);
}

function awNome(src) {
  if (!src) return '';
  if (src.tipo === 'custom') {
    return awGroups.map(g => MUSCLE_GROUPS[g].label).join(' e ') || 'Allenamento personalizzato';
  }
  if (src.tipo === 'scheda') {
    const t = WORKOUT_TEMPLATES.find(x => x.id === src.id);
    return t ? t.title : '';
  }
  return 'Copia di ' + getDayTitle(src.id);
}

let awPath = null;          /* 'schede' | 'gruppi' */
let awGroups = [];          /* gruppi scelti nella strada "gruppi" */
let awCustom = [];          /* esercizi scelti nella strada "gruppi" */

window.openAddWeek = function() {
  awStep = 0; awPath = null; awSource = null; awDays = []; awMode = 'sostituisci';
  awGroups = []; awCustom = [];
  azzeraSezioniEsercizi('aw');
  document.getElementById('add-week-sheet').classList.remove('hidden');
  renderAddWeek();
};

window.closeAddWeek = function() {
  document.getElementById('add-week-sheet').classList.add('hidden');
};

window.awBack = function() {
  if (awStep === 2) { awStep = 1; renderAddWeek(); }
  else if (awStep === 1) { awStep = 0; awSource = null; renderAddWeek(); }
  else closeAddWeek();
};

/* le due strade iniziali, le stesse di quando la settimana e ancora vuota */
window.awChoosePath = function(path) {
  awPath = path;
  awStep = 1;
  awSource = null;
  renderAddWeek();
};

window.awToggleGroup = function(g) {
  const i = awGroups.indexOf(g);
  if (i === -1) awGroups.push(g); else awGroups.splice(i, 1);
  renderAddWeek();
};

window.awToggleCustom = function(name) {
  const i = awCustom.indexOf(name);
  if (i === -1) awCustom.push(name); else awCustom.splice(i, 1);
  awSource = awCustom.length ? { tipo: 'custom', id: 'custom' } : null;
  renderAddWeek();
};

window.awPickSource = function(tipo, id) {
  awSource = { tipo: tipo, id: id };
  renderAddWeek();
};

window.awToggleDay = function(d) {
  const i = awDays.indexOf(d);
  if (i === -1) awDays.push(d); else awDays.splice(i, 1);
  renderAddWeek();
};

window.awQuick = function(quali) {
  const data = loadData();
  if (quali === 'vuoti') awDays = DAYS.filter(d => (data[d] || []).length === 0 && !isRestDay(d));
  else if (quali === 'nessuno') awDays = [];
  renderAddWeek();
};

window.awSetMode = function(m) { awMode = m; renderAddWeek(); };

window.awNext = function() {
  if (awStep === 0) return;   /* al passo 0 si sceglie toccando una delle due strade */
  if (awStep === 1) {
    if (!awSource) return;
    awStep = 2;
    /* se copi un giorno, quel giorno non ha senso come destinazione */
    if (awSource.tipo === 'giorno') awDays = awDays.filter(d => d !== awSource.id);
    renderAddWeek();
    return;
  }
  if (!awDays.length) return;
  applicaAllaSettimana();
};

function renderAddWeek() {
  const body = document.getElementById('aw-body');
  const next = document.getElementById('aw-next');
  const data = loadData();

  /* ---- passo 0: le due strade ---- */
  if (awStep === 0) {
    document.getElementById('aw-sub').innerText = 'Come vuoi costruirlo?';
    body.innerHTML =
      '<button class="aw-path" onclick="awChoosePath(\'schede\')">' +
        '<span class="aw-path-ico">\u{1F4CB}</span>' +
        '<span class="aw-main"><span class="aw-path-name">Schede pronte</span>' +
        '<span class="aw-meta">Push, Pull, Legs, Full Body e le altre, gia bilanciate. Oppure copia un giorno che hai gia costruito.</span></span>' +
        '<span class="aw-path-go">\u203A</span></button>' +
      '<button class="aw-path" onclick="awChoosePath(\'gruppi\')">' +
        '<span class="aw-path-ico">' + ico('manubrio') + '</span>' +
        '<span class="aw-main"><span class="aw-path-name">Gruppi muscolari</span>' +
        '<span class="aw-meta">Scegli i muscoli da allenare e poi gli esercizi, uno per uno.</span></span>' +
        '<span class="aw-path-go">\u203A</span></button>';
    next.style.display = 'none';
    return;
  }
  next.style.display = 'block';

  body.classList.remove('aw-fill');
  /* ---- passo 1, strada gruppi: muscoli e poi esercizi ---- */
  if (awStep === 1 && awPath === 'gruppi') {
    document.getElementById('aw-sub').innerText = 'Passo 1 di 2 \u2022 muscoli ed esercizi';
    /* Senza gruppi scelti la griglia riempie tutto lo schermo; appena se ne
       sceglie uno si compatta per lasciare posto agli esercizi sotto. */
    body.classList.toggle('aw-fill', !awGroups.length);
    let html = '<div class="aw-sec">Quali muscoli</div>' +
      '<div class="mg-grid' + (awGroups.length ? ' compact' : '') + '">' +
      Object.keys(MUSCLE_GROUPS).map(g => muscleCard(g, awGroups.indexOf(g) !== -1, 'awToggleGroup(\'' + g + '\')')).join('') +
      '</div>';

    if (awGroups.length) {
      html += '<div class="aw-sec">Quali esercizi \u2022 ' + awCustom.length + (awCustom.length === 1 ? ' scelto' : ' scelti') + '</div>';
      html += htmlEserciziOrganizzati(EXERCISE_LIBRARY.filter(e => awGroups.indexOf(e.group) !== -1), {
        ctx: 'aw', presente: ex => awCustom.indexOf(ex.name) !== -1, mostraGruppi: awGroups.length > 1,
        riga: ex => pickRow(ex, awCustom.indexOf(ex.name) !== -1, 'awToggleCustom(\'' + jsArg(ex.name) + '\')')
      });
    } else {
      html += '<div class="aw-warn">Tocca uno o più gruppi per vedere i loro esercizi.</div>';
    }
    body.innerHTML = html;
    next.innerText = awCustom.length ? 'Avanti con ' + awCustom.length + (awCustom.length === 1 ? ' esercizio' : ' esercizi') : 'Scegli almeno un esercizio';
    next.disabled = awCustom.length === 0;
    return;
  }

  if (awStep === 1) {
    document.getElementById('aw-sub').innerText = 'Passo 1 di 2 \u2022 quale allenamento';
    const giorniPieni = DAYS.filter(d => (data[d] || []).length > 0);

    let html = '<div class="aw-sec">Schede pronte</div>' +
      WORKOUT_TEMPLATES.map(t => {
        const on = awSource && awSource.tipo === 'scheda' && awSource.id === t.id;
        const serie = t.exercises.reduce((s, e) => s + e.sets, 0);
        return '<button class="aw-pick ' + (on ? 'on' : '') + '" onclick="awPickSource(\'scheda\', \'' + t.id + '\')">' +
          '<span class="aw-radio"></span>' +
          '<span class="aw-main"><span class="aw-name">' + escapeHtml(t.title) + '</span>' +
          '<span class="aw-meta">' + t.exercises.length + ' esercizi \u2022 ' + serie + ' serie</span></span>' +
        '</button>';
      }).join('');

    if (giorniPieni.length) {
      html += '<div class="aw-sec">Copia un giorno che hai gia costruito</div>' +
        giorniPieni.map(d => {
          const on = awSource && awSource.tipo === 'giorno' && awSource.id === d;
          const n = (data[d] || []).length;
          return '<button class="aw-pick ' + (on ? 'on' : '') + '" onclick="awPickSource(\'giorno\', \'' + d + '\')">' +
            '<span class="aw-radio"></span>' +
            '<span class="aw-main"><span class="aw-name">' + escapeHtml(getDayTitle(d)) + '</span>' +
            '<span class="aw-meta">' + d + ' \u2022 ' + n + ' esercizi</span></span>' +
          '</button>';
        }).join('');
    }

    body.innerHTML = html;
    next.innerText = 'Avanti';
    next.disabled = !awSource;
    return;
  }

  /* ---- passo 2: i giorni ---- */
  document.getElementById('aw-sub').innerText = 'Passo 2 di 2 \u2022 su quali giorni';
  const es = awEsercizi(awSource);
  const SIGLE = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];

  const occupati = awDays.filter(d => (data[d] || []).length > 0);

  body.innerHTML =
    '<div class="aw-chosen"><span class="aw-name">' + escapeHtml(awNome(awSource)) + '</span>' +
      '<span class="aw-meta">' + es.length + ' esercizi</span></div>' +
    '<div class="aw-sec">Tocca i giorni</div>' +
    '<div class="aw-days">' + DAYS.map((d, i) => {
      const on = awDays.indexOf(d) !== -1;
      const n = (data[d] || []).length;
      const stato = isRestDay(d) ? 'Riposo' : (n ? n + ' eserc.' : 'Vuoto');
      const escluso = awSource.tipo === 'giorno' && awSource.id === d;
      if (escluso) {
        return '<div class="aw-day" style="opacity:0.35;cursor:default;">' +
          '<span class="cal-dow">' + SIGLE[i] + '</span><span class="aw-check">\u2022</span>' +
          '<span class="aw-day-state">origine</span></div>';
      }
      return '<button class="aw-day ' + (on ? 'on' : '') + '" onclick="awToggleDay(\'' + d + '\')">' +
        '<span class="cal-dow">' + SIGLE[i] + '</span>' +
        '<span class="aw-check">' + (on ? '\u2713' : '+') + '</span>' +
        '<span class="aw-day-state">' + stato + '</span></button>';
    }).join('') + '</div>' +
    '<div class="aw-quick">' +
      '<button onclick="awQuick(\'vuoti\')">Tutti i giorni vuoti</button>' +
      '<button onclick="awQuick(\'nessuno\')">Nessuno</button>' +
    '</div>' +
    (occupati.length
      ? '<div class="aw-sec">' + occupati.length + (occupati.length === 1 ? ' giorno ha' : ' giorni hanno') + ' gia esercizi</div>' +
        '<div class="set-seg">' +
          '<button class="' + (awMode === 'sostituisci' ? 'on' : '') + '" onclick="awSetMode(\'sostituisci\')">Sostituisci</button>' +
          '<button class="' + (awMode === 'aggiungi' ? 'on' : '') + '" onclick="awSetMode(\'aggiungi\')">Aggiungi in coda</button>' +
        '</div>'
      : '') +
    (awDays.some(d => isRestDay(d))
      ? '<div class="aw-warn">I giorni di riposo selezionati diventeranno giorni di allenamento.</div>'
      : '');

  next.innerText = awDays.length
    ? 'Aggiungi a ' + awDays.length + (awDays.length === 1 ? ' giorno' : ' giorni')
    : 'Scegli almeno un giorno';
  next.disabled = awDays.length === 0;
}

function applicaAllaSettimana() {
  const data = loadData();
  const titles = loadTitles();
  const riposi = loadRestDays();
  const backup = {
    data: JSON.parse(JSON.stringify(data)),
    titles: JSON.parse(JSON.stringify(titles)),
    riposi: riposi.slice()
  };

  const es = awEsercizi(awSource);
  const nomeScheda = awSource.tipo === 'giorno' ? getDayTitle(awSource.id) : awNome(awSource);

  awDays.forEach(d => {
    const copia = es.map(e => normalizeExerciseRecord({
      name: e.name, sets: e.sets, reps: e.reps, weight: e.weight, rest: e.rest,
      note: e.note || '', superset: !!e.superset, completedSets: []
    }));
    const vecchi = data[d] || [];
    const sostituisci = awMode === 'sostituisci' || vecchi.length === 0;
    data[d] = sostituisci ? copia : vecchi.concat(copia);
    if (sostituisci && nomeScheda && nomeScheda !== DAYS[DAYS.indexOf(awSource.id)]) titles[d] = nomeScheda;
    const r = riposi.indexOf(d);
    if (r !== -1) riposi.splice(r, 1);
  });

  saveData(data);
  saveTitles(titles);
  saveRestDays(riposi);

  const quanti = awDays.length;
  closeAddWeek();
  renderPlanDayPicker();
  renderWeekOverview();
  renderAllenamento();

  showUndo(trP('%s aggiunto a ' + quanti + (quanti === 1 ? ' giorno' : ' giorni'), tr(nomeScheda)), () => {
    saveData(backup.data);
    saveTitles(backup.titles);
    saveRestDays(backup.riposi);
    renderPlanDayPicker();
    renderWeekOverview();
    renderAllenamento();
  }, 8000);
}

/* Il dettaglio degli allenamenti salvati vive in una schermata sua:
   nel Piano resta solo il calendario, corto e leggibile. */
window.openWeekSheet = function() {
  const data = loadData();
  const tot = DAYS.reduce((s2, d) => s2 + (data[d] || []).length, 0);
  if (tot === 0) { alert('Non hai ancora esercizi in programma questa settimana.'); return; }
  document.getElementById('week-sheet-sub').innerText =
    DAYS.filter(d => (data[d] || []).length > 0).length + ' giorni con esercizi';
  renderWeekOverview();
  document.getElementById('week-sheet').classList.remove('hidden');
};

window.closeWeekSheet = function() {
  document.getElementById('week-sheet').classList.add('hidden');
};

/* Riepilogo della settimana: elenca SOLO i giorni che hanno qualcosa,
   con il numero di esercizi. Gli esercizi veri si aprono toccando il giorno,
   altrimenti la schermata diventa una lista infinita. */
function renderWeekOverview() {
  const box = document.getElementById('week-overview');
  if (!box) return;
  const data = loadData();

  const attivi = DAYS.filter(d => (data[d] || []).length > 0 || isRestDay(d));
  if (attivi.length === 0) {
    box.innerHTML = '<div class="wk-empty">Nessun giorno ancora programmato. Scegli i muscoli qui sopra e aggiungi il primo esercizio.</div>';
    return;
  }

  const totEs = DAYS.reduce((s, d) => s + (isRestDay(d) ? 0 : (data[d] || []).length), 0);
  const totSerie = DAYS.reduce((s, d) => s + (isRestDay(d) ? 0 : (data[d] || []).reduce((s2, e) => s2 + e.sets, 0)), 0);
  const giorniAllenamento = attivi.filter(d => !isRestDay(d)).length;

  box.innerHTML =
    '<div class="wk-total">' + giorniAllenamento + ' giorni \u2022 ' + totEs + ' esercizi \u2022 ' + totSerie + ' serie a settimana</div>' +
    attivi.map(d => {
      const list = data[d] || [];
      const serie = list.reduce((s, e) => s + e.sets, 0);
      const aperto = d === currentDay;
      const riposo = isRestDay(d);
      const meta = riposo ? '\u{1F634} Riposo' : serie + ' serie \u2022 ~' +
        Math.round(list.reduce((s, e) => s + e.sets * (30 + e.rest), 0) / 60) + ' min';
      return '<button class="wk-row ' + (aperto ? 'open' : '') + '" onclick="openPlanDayScreen(\'' + d + '\')">' +
        '<div class="wk-main">' +
          '<div class="wk-name">' + escapeHtml(getDayTitle(d)) + (getDayTitle(d) !== d ? ' <span class="wk-meta">(' + d + ')</span>' : '') + '</div>' +
          '<div class="wk-meta">' + meta + '</div>' +
        '</div>' +
        (riposo ? '' : '<span class="wk-count">' + list.length + '</span>') +
        '<span class="wk-caret">\u203A</span>' +
      '</button>';
    }).join('');
}

function renderPiano() {
  const data = loadData();
  const list = data[currentDay] || [];
  const container = document.getElementById('piano-list');
  const summaryEl = document.getElementById('plan-summary');
  syncRestToggle();

  renderWeekOverview();
  renderPlanDayPicker();
  if (!planEditMode) renderDayView();

  if (isRestDay(currentDay)) {
    summaryEl.innerText = 'Riposo';
    container.innerHTML = '<div class="rest-banner"><div class="rest-emoji">\u{1F634}</div>' +
      '<div class="rest-text">Giorno di riposo</div>' +
      '<div class="rest-sub">Il recupero fa parte del programma. Gli esercizi restano salvati: riattiva il giorno quando vuoi.</div></div>';
    document.getElementById('coach-box').style.display = 'none';
    renderSuggested();
    syncBuildingLine(list.length);
    return;
  }

  /* Riepilogo in testa: esercizi, serie totali e durata stimata
     (tempo di lavoro approssimato + recuperi pianificati) */
  if (list.length === 0) {
    summaryEl.innerText = 'Nessun esercizio';
    container.innerHTML = '<span class="muted">Nessun esercizio ancora. Scegli i gruppi al passo 2 e aggiungi dal passo 3.</span>';
    renderCoach();
    renderSuggested();
    syncBulkBar();
    syncBuildingLine(0);
    return;
  }
  renderCoach();
  renderSuggested();
  syncBuildingLine(list.length);
  const totalSets = list.reduce((sum, e) => sum + e.sets, 0);
  const estSeconds = list.reduce((sum, e) => sum + e.sets * (30 + e.rest), 0);
  summaryEl.innerText = `${list.length} esercizi • ${totalSets} serie • ~${Math.round(estSeconds / 60)} min`;

  if (!planDayOpen) {
    container.innerHTML = '<div class="wk-empty">Tocca ' + escapeHtml(getDayTitle(currentDay)) + ' qui sopra per vederne gli esercizi.</div>';
    syncBulkBar();
    return;
  }

  container.innerHTML = list.map((e, idx) => `
    <div class="swipe-host" data-plan-idx="${idx}">
      <div class="swipe-bg"><span class="sw-add"></span><span class="sw-del">Elimina \u2715</span></div>
      <div class="swipe-fg plan-card ${e.superset ? 'superset' : ''} ${selectedIdx.indexOf(idx) !== -1 ? 'picked' : ''}">
        <div class="plan-card-top">
          <button class="plan-check ${selectedIdx.indexOf(idx) !== -1 ? 'on' : ''}" onclick="togglePick(${idx})" aria-label="Seleziona">✓</button>
          <div class="reorder-arrows">
            <button class="reorder-btn" onclick="moveExercise(${idx},-1)" ${idx === 0 ? 'disabled' : ''} aria-label="Sposta su">\u25B2</button>
            <button class="reorder-btn" onclick="moveExercise(${idx},1)" ${idx === list.length - 1 ? 'disabled' : ''} aria-label="Sposta giu">\u25BC</button>
          </div>
          <div class="plan-order-num">${idx + 1}</div>
          <div class="plan-card-main">
            <div class="plan-ex-name">${findExercise(e.name) ? '<span class="ex-fig">' + muscleFigure(findExercise(e.name).group) + '</span>' : ''}${escapeHtml(senzaEmoji(e.name))}</div>
            ${dettaglioEsercizio(e.name) ? `<div class="ex-focus">${escapeHtml(etichettaAttrezzo(e.name))} \u2022 <span>Focus</span>: ${escapeHtml(focusEsercizio(e.name))}</div>` : ''}
            <div class="plan-badges">
              <span class="plan-badge reps">${e.sets}\u00D7${e.reps}</span>
              <span class="plan-badge">${e.weight} kg</span>
              <span class="plan-badge rest">\u23F1 ${e.rest} sec</span>
              ${e.superset ? '<span class="plan-badge superset-tag">\u26D3 Superset</span>' : ''}
            </div>
            ${e.note ? `<div class="plan-note">\u{1F4DD} ${escapeHtml(e.note)}</div>` : ''}
          </div>
          <div class="plan-card-actions">
            <button class="plan-icon-btn" onclick="openExerciseInfo('${jsArg(e.name)}')" title="Come si fa" aria-label="Come si fa">ℹ</button>
            <button class="plan-icon-btn" onclick="toggleSuperset(${idx})" title="Superset col precedente" aria-label="Superset">\u26D3</button>
            <button class="plan-icon-btn" onclick="duplicateExercise(${idx})" title="Duplica" aria-label="Duplica">\u29C9</button>
            <button class="plan-icon-btn" onclick="startEditExercise(${idx})" title="Modifica" aria-label="Modifica">\u270E</button>
            <button class="plan-icon-btn danger" onclick="deletePianoExercise(${idx})" title="Elimina" aria-label="Elimina">\u2715</button>
          </div>
        </div>
      </div>
    </div>
  `).join('') + '<div class="swipe-hint">\u2190 scorri una riga a sinistra per eliminarla</div>';

  if (!selectMode) {
    container.querySelectorAll('.swipe-host[data-plan-idx]').forEach(host => {
      const i = Number(host.dataset.planIdx);
      attachSwipe(host, { onLeft: () => deletePianoExercise(i) });
    });
  }
  syncBulkBar();
}
