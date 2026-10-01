/* Seduta libera e sedute extra
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 4. SEDUTA LIBERA E SEDUTA PASSATA ============ */
const SPEC_KEY = 'tz_seduta_speciale';
function specialeAttiva(day) {
  try { const s = JSON.parse(localStorage.getItem(SPEC_KEY) || 'null'); if (s && (!day || s.day === day)) return s; } catch (e) {}
  return null;
}
window.sedutaPassataAttiva = function() { const s = specialeAttiva(currentDay); return !!(s && s.tipo === 'passata' && sedutaAperta()); };
function ripristinaSpeciale() {
  const s = specialeAttiva();
  if (!s) return;
  const data = loadData(), titles = loadTitles();
  data[s.day] = (s.backup || []).map(normalizeExerciseRecord);
  if (s.backupTitolo === null || s.backupTitolo === undefined) delete titles[s.day]; else titles[s.day] = s.backupTitolo;
  saveData(data); saveTitles(titles);
  localStorage.removeItem(SPEC_KEY);
}
window.annullaSpeciale = function() {
  ripristinaSpeciale();
  fermaTempoSeduta(true);
  renderPiano(); renderWorkoutDayPicker();
};
let liberaSel = [], liberaTipo = 'libera', liberaFiltro = 'tutti', liberaCerca = '', liberaQuando = null;
window.apriSedutaLibera = function(tipo) {
  liberaTipo = tipo || 'libera';
  liberaSel = []; liberaFiltro = 'tutti'; liberaCerca = '';
  if (liberaTipo === 'passata') { const d = new Date(); d.setDate(d.getDate() - 1); d.setHours(18, 0, 0, 0); liberaQuando = d.getTime(); }
  renderSedutaLibera();
};
function ultimoUso(nome) {
  const h = loadHistory().find(x => (x.sessione || []).some(e => e.name === nome));
  if (!h) return null;
  const e = h.sessione.find(x => x.name === nome);
  const f = e.sets.filter(s => s.done);
  return f.length ? { sets: f.length, reps: f[f.length - 1].reps, weight: f[f.length - 1].weight } : null;
}
const FILTRI_ATTREZZI = [['tutti', 'Tutti'], ['preferiti', 'Preferiti'], ['bilanciere', 'Bilanciere'], ['manubri', 'Manubri'], ['macchine', 'Macchine e cavi'], ['corpo', 'Corpo libero']];
function renderSedutaLibera() {
  const passata = liberaTipo === 'passata';
  const storia = loadHistory().filter(h => h.sessione && h.sessione.length).slice(0, 5);
  const data = loadData();
  const prof = getProfile() || {};
  let h = '';
  if (passata) {
    const d = new Date(liberaQuando);
    const v = ymd(d) + 'T' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    h += setGroup('Quando', '<label class="sr-row sr-input"><span class="sr-name">Data e ora</span><input type="datetime-local" id="lib-quando" value="' + v + '" max="' + ymd(new Date()) + 'T23:59" onchange="liberaQuando = new Date(this.value).getTime() || liberaQuando"></label>',
      'Poi spunti le serie che hai fatto: niente timer di recupero.');
  }
  if (storia.length) {
    h += setGroup(passata ? 'Come un allenamento già fatto' : 'Ripeti un allenamento', storia.map((x, i) => {
      const d = dataSessione(x);
      return '<button class="sr-row" onclick="liberaDaStorico(' + i + ')"><span class="sr-name">' + escapeHtml(x.titolo || getDayTitle(x.day)) +
        '<small>' + (d ? '<span data-no-tr>' + d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' }) + '</span> • ' : '') + x.sessione.length + ' esercizi</small></span><span class="sr-go" aria-hidden="true">›</span></button>';
    }).join(''));
  }
  const cerca = liberaCerca.toLowerCase();
  const lista = EXERCISE_LIBRARY.filter(e => {
    const n = senzaEmoji(e.name);
    if (cerca && n.toLowerCase().indexOf(cerca) === -1 && window.tr(n).toLowerCase().indexOf(cerca) === -1) return false;
    if (liberaFiltro === 'preferiti') return (prof.graditi || []).indexOf(e.name) !== -1;
    if (liberaFiltro !== 'tutti') return attrezzoDi(n) === liberaFiltro;
    return true;
  });
  h += '<div class="sr-group"><div class="sr-title">Scegli gli esercizi</div>' +
    '<input type="search" class="lib-cerca" placeholder="Cerca un esercizio" value="' + escapeHtml(liberaCerca) + '" oninput="liberaCerca = this.value; renderListaLibera()">' +
    '<div class="fb-chips sr-chips-pad">' + FILTRI_ATTREZZI.map(([k, t]) => '<button class="fb-chip' + (liberaFiltro === k ? ' on' : '') + '" onclick="liberaFiltro = \'' + k + '\'; renderSedutaLibera()">' + t + '</button>').join('') + '</div>' +
    '<div class="sr-list" id="lib-lista">' + htmlListaLibera(lista) + '</div></div>';
  const giorni = DAYS.filter(d => (data[d] || []).length);
  if (giorni.length) {
    h += setGroup('Da una scheda del piano', giorni.map(d =>
      '<button class="sr-row" onclick="liberaDaGiorno(\'' + d + '\')"><span class="sr-name">' + escapeHtml(getDayTitle(d)) + '<small>' + d + ' • ' + data[d].length + ' esercizi</small></span><span class="sr-go" aria-hidden="true">›</span></button>').join(''));
  }
  h += '<div class="lib-bar"><button class="btn-start-workout" id="lib-via" onclick="liberaDaScelta()" ' + (liberaSel.length ? '' : 'disabled') + '>' +
    (passata ? 'Registra' : 'Inizia') + ' • ' + liberaSel.length + ' esercizi</button></div>';
  const aperto = document.getElementById('og-foglio') && !document.getElementById('og-foglio').classList.contains('hidden');
  const y = aperto ? document.getElementById('og-foglio-b').scrollTop : 0;
  apriFoglio(passata ? 'Seduta passata' : 'Seduta libera', h, passata ? 'Registra un allenamento che non hai segnato' : 'Fuori programma: il piano non cambia');
  if (aperto) document.getElementById('og-foglio-b').scrollTop = y;
}
function htmlListaLibera(lista) {
  if (!lista.length) return '<div class="sr-row sr-static"><span class="sr-name"><small>Nessun esercizio con questo filtro</small></span></div>';
  return lista.map(e => {
    const on = liberaSel.indexOf(e.name) !== -1;
    return '<button class="sr-row" onclick="liberaToggle(' + JSON.stringify(e.name).replace(/"/g, '&quot;') + ')" aria-pressed="' + on + '">' +
      '<span class="og-exfig">' + muscleFigure(e.group) + '</span><span class="sr-name">' + escapeHtml(senzaEmoji(e.name)) + '<small>' + MUSCLE_GROUPS[e.group].label + (e.lato ? ' • per lato' : '') + '</small></span>' +
      '<span class="sr-check">' + (on ? '✓' : '') + '</span></button>';
  }).join('');
}
window.renderListaLibera = function() {
  const box = document.getElementById('lib-lista');
  if (!box) return;
  const prof = getProfile() || {};
  const cerca = liberaCerca.toLowerCase();
  box.innerHTML = htmlListaLibera(EXERCISE_LIBRARY.filter(e => {
    const n = senzaEmoji(e.name);
    if (cerca && n.toLowerCase().indexOf(cerca) === -1 && window.tr(n).toLowerCase().indexOf(cerca) === -1) return false;
    if (liberaFiltro === 'preferiti') return (prof.graditi || []).indexOf(e.name) !== -1;
    if (liberaFiltro !== 'tutti') return attrezzoDi(n) === liberaFiltro;
    return true;
  }));
};
window.liberaToggle = function(n) {
  const i = liberaSel.indexOf(n);
  if (i === -1) liberaSel.push(n); else liberaSel.splice(i, 1);
  renderListaLibera();
  const b = document.getElementById('lib-via');
  if (b) { b.disabled = !liberaSel.length; b.textContent = (liberaTipo === 'passata' ? 'Registra' : 'Inizia') + ' • ' + liberaSel.length + ' esercizi'; }
};
function eserciziDaNomi(nomi) {
  return nomi.map(n => {
    const m = findExercise(n) || {};
    const u = ultimoUso(n);
    return { name: n, sets: u ? u.sets : (m.sets || 3), reps: u ? u.reps : (m.reps || 10), weight: u ? u.weight : pesoPartenza(n).peso, rest: m.rest || 90 };
  });
}
window.liberaDaScelta = function() { if (liberaSel.length) avviaSpeciale(eserciziDaNomi(liberaSel), liberaTipo === 'passata' ? 'Seduta registrata' : 'Seduta libera'); };
window.liberaDaStorico = function(i) {
  const x = loadHistory().filter(h => h.sessione && h.sessione.length)[i];
  if (!x) return;
  avviaSpeciale(x.sessione.map(e => {
    const f = e.sets.filter(s => s.done), u = f[f.length - 1] || e.sets[0] || {};
    return { name: e.name, sets: Math.max(1, e.sets.length), reps: u.reps || 10, weight: u.weight || 0, rest: e.rest || (findExercise(e.name) || {}).rest || 90 };
  }), x.titolo || getDayTitle(x.day));
};
window.liberaDaGiorno = function(d) {
  const l = loadData()[d] || [];
  avviaSpeciale(l.map(e => ({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight, rest: e.rest, superset: e.superset })), getDayTitle(d));
};
function avviaSpeciale(esercizi, titolo) {
  if (!esercizi.length) return;
  if (specialeAttiva()) ripristinaSpeciale();
  const oggi = DAYS[(new Date().getDay() + 6) % 7];
  const data = loadData(), titles = loadTitles();
  const q = document.getElementById('lib-quando');
  if (liberaTipo === 'passata' && q && q.value) { const t = new Date(q.value).getTime(); if (t) liberaQuando = t; }
  if (liberaTipo === 'passata' && liberaQuando > Date.now()) liberaQuando = Date.now();
  localStorage.setItem(SPEC_KEY, JSON.stringify({ day: oggi, tipo: liberaTipo, quando: liberaTipo === 'passata' ? liberaQuando : null, titolo: titolo,
    backup: data[oggi] || [], backupTitolo: titles[oggi] !== undefined ? titles[oggi] : null }));
  data[oggi] = esercizi.map(e => normalizeExerciseRecord({ name: e.name, sets: e.sets, reps: e.reps, weight: e.weight, rest: e.rest, superset: !!e.superset, completedSets: [] }));
  titles[oggi] = titolo;
  saveData(data); saveTitles(titles);
  try { localStorage.removeItem('tz_seduta_inizio'); } catch (e) {}
  chiudiFoglio();
  switchTab('allenamento');
  openWorkoutDay(oggi);
}
function renderSpecialeBox() {
  const box = document.getElementById('speciale-box');
  if (!box) return;
  const s = specialeAttiva(currentDay);
  if (!s) { box.innerHTML = ''; return; }
  const d = s.quando ? new Date(s.quando) : null;
  box.innerHTML = '<div class="card spec-card">' + ico(s.tipo === 'passata' ? 'calendario' : 'scintilla') + '<div><b>' + (s.tipo === 'passata' ? 'Seduta passata' : 'Seduta libera') + '</b>' +
    '<div class="og-muted">' + (d ? '<span data-no-tr>' + d.toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric', month: 'long' }) + ' ' + d.toLocaleTimeString(LOCALE(), { hour: '2-digit', minute: '2-digit' }) + '.</span> <span>Spunta le serie fatte e premi Termina.</span>'
      : 'Il piano di oggi torna com era quando termini.') + '</div></div>' +
    '<button class="og-link" onclick="backToDayPicker(); annullaSpeciale();">Annulla</button></div>';
}
function renderSeduteExtra() {
  const box = document.getElementById('workout-extra');
  if (!box) return;
  const s = specialeAttiva();
  box.innerHTML = (s ? '<div class="card spec-card">' + ico('scintilla') + '<div><b>' + escapeHtml(s.titolo) + '</b><div class="og-muted">' + (s.tipo === 'passata' ? 'Seduta passata in corso' : 'Seduta libera in corso') + '</div></div>' +
      '<button class="og-link" onclick="openWorkoutDay(\'' + s.day + '\')">Riprendi</button><button class="og-link" onclick="annullaSpeciale()">Annulla</button></div>' : '') +
    '<div class="lib-due"><button class="entry-btn" onclick="apriSedutaLibera(\'libera\')"><span class="entry-ico">' + ico('scintilla') + '</span>' +
      '<span class="aw-main"><span class="entry-name">Seduta libera</span><span class="aw-meta">Ripeti un allenamento o scegli gli esercizi</span></span><span class="aw-path-go">›</span></button>' +
    '<button class="entry-btn" onclick="apriSedutaLibera(\'passata\')"><span class="entry-ico">' + ico('calendario') + '</span>' +
      '<span class="aw-main"><span class="entry-name">Seduta passata</span><span class="aw-meta">Registra un allenamento che non hai segnato</span></span><span class="aw-path-go">›</span></button></div>';
}

/* ============ 5. DROP SET E REST-PAUSE ============ */
function arrotondaCarico(w, nome) {
  const passo = attrezzoDi(senzaEmoji(nome)) === 'bilanciere' ? 2.5 : (w >= 20 ? 2 : 1);
  return Math.max(0, Math.round(w / passo) * passo);
}
window.aggiungiExtra = function(idx, tipo) {
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex) return;
  const fatte = ex.completedSets.filter(s => s.done);
  const rif = (ex.extra && ex.extra.length ? ex.extra[ex.extra.length - 1] : null) || fatte[fatte.length - 1] || ex.completedSets[ex.completedSets.length - 1] || { reps: ex.reps, weight: ex.weight };
  const w = Number(rif.weight) || 0, r = Number(rif.reps) || ex.reps;
  /* drop: -20% di carico, stesse ripetizioni; rest-pause: stesso carico, circa un terzo delle ripetizioni dopo 15-20 s */
  const x = tipo === 'drop' ? { tipo: 'drop', reps: r, weight: arrotondaCarico(w * 0.8, ex.name), done: false }
                            : { tipo: 'rp', reps: Math.max(2, Math.round(r / 3)), weight: w, done: false };
  ex.extra = (ex.extra || []).concat([x]);
  saveData(data);
  renderAllenamento();
};
window.aggiornaExtra = function(idx, xi, campo, v) {
  const data = loadData();
  const x = ((data[currentDay][idx] || {}).extra || [])[xi];
  if (!x) return;
  x[campo] = campo === 'reps' ? (Number(v) || 0) : (parseFloat(v) || 0);
  saveData(data);
};
window.togliExtra = function(idx, xi) {
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex || !ex.extra) return;
  ex.extra.splice(xi, 1);
  saveData(data);
  renderAllenamento();
};
window.spuntaExtra = function(idx, xi) {
  const data = loadData();
  const ex = data[currentDay][idx];
  const x = ex && ex.extra && ex.extra[xi];
  if (!x) return;
  x.done = !x.done;
  saveData(data);
  renderAllenamento();
  if (x.done && x.tipo === 'rp') openRecoveryPanel('Rest-pause', 20);
  else if (x.done) closeRecoveryPanel();
};
function htmlExtra(e, idx) {
  return (e.extra || []).map((x, xi) => `
            <div class="set-row extra ${x.done ? 'done' : ''}">
              <span class="set-num extra-num">${x.tipo === 'drop' ? 'D' : 'RP'}</span>
              <input type="number" inputmode="numeric" class="set-input small" value="${x.reps}" onchange="aggiornaExtra(${idx},${xi},'reps',this.value)" aria-label="Ripetizioni">
              <span class="set-x">×</span>
              <input type="number" class="set-input" value="${x.weight}" step="0.5" onchange="aggiornaExtra(${idx},${xi},'weight',this.value)" aria-label="Carico">
              <span class="set-kg-label">kg</span>
              <button class="set-flame-btn" onclick="togliExtra(${idx},${xi})" aria-label="Togli la serie extra">✕</button>
              <button class="set-check ${x.done ? 'checked' : ''}" onclick="spuntaExtra(${idx},${xi})" aria-label="Serie extra fatta">✓</button>
            </div>`).join('');
}
