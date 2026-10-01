/* Tab Allenamento e seduta piu ricca
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   TAB ALLENAMENTO — lista set-by-set + arm Drop
   ============================================================ */
/* ============================================================
   SEDUTA PIU RICCA (proposta 2)
   - ultima volta: i valori della seduta precedente, per battere se stessi
   - RPE: quanto era dura la serie (6 = facile, 10 = cedimento), dopo la spunta
   - riscaldamento: serie leggere che non contano per carichi e statistiche
   - calcolatore dischi: quali dischi mettere per lato sul bilanciere
   - record: se una serie supera il tuo massimo stimato, te lo dice
   - tempo trascorso della seduta
   ============================================================ */
const RPE_VALORI = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'];

function ultimaVoltaTesto(nome) {
  const s = ultimeSessioni(nome, 1)[0];
  if (!s) return '';
  const fatte = s.sets.filter(x => x.done);
  if (!fatte.length) return '';
  return 'Ultima volta: ' + fatte.map(x => x.weight + '\u00D7' + x.reps).join(' \u00B7 ');
}

/* 1RM stimato con la formula di Epley: affidabile fino a circa 12 ripetizioni */
function unoRM(peso, reps) {
  peso = Number(peso) || 0; reps = Number(reps) || 0;
  if (peso <= 0 || reps <= 0) return 0;
  if (reps === 1) return peso;
  return Math.round(peso * (1 + Math.min(reps, 12) / 30) * 10) / 10;
}

function migliorUnoRM(nome) {
  let best = 0;
  loadHistory().forEach(h0 => (h0.sessione || []).forEach(e => {
    if (e.name !== nome) return;
    e.sets.forEach(s => { if (s.done) best = Math.max(best, unoRM(s.weight, s.reps)); });
  }));
  return best;
}

/* chiamato alla spunta di una serie */
function controllaRecord(ex, set) {
  if (!set.done || isTimeBased(ex.name)) return;
  const prima = migliorUnoRM(ex.name);
  const ora = unoRM(set.weight, set.reps);
  if (prima > 0 && ora > prima && ora > (ex.recordSeduta || 0)) {
    ex.recordSeduta = ora;
    showUndo('\u{1F3C6} Nuovo record: ' + set.weight + ' kg \u00D7 ' + set.reps + ' (1RM stimato ' + ora + ' kg)');
  }
}

window.updateSetRpe = function(exIdx, setIdx, v) {
  const data = loadData();
  const set = data[currentDay][exIdx].completedSets[setIdx];
  if (!set) return;
  set.rpe = v ? Number(v) : null;
  saveData(data);
};

/* ---- riscaldamento ---- */
window.addWarmup = function(idx) {
  const data = loadData();
  const e = data[currentDay][idx];
  e.riscaldamento = e.riscaldamento || [];
  if (e.riscaldamento.length >= 3) return;
  const base = Number(e.weight) || 0;
  const quota = [0.5, 0.7, 0.85][e.riscaldamento.length];
  e.riscaldamento.push({ reps: [10, 6, 3][e.riscaldamento.length], weight: Math.round(base * quota / 2.5) * 2.5, done: false });
  saveData(data);
  renderAllenamento();
};
window.removeWarmup = function(idx, wi) {
  const data = loadData();
  const e = data[currentDay][idx];
  (e.riscaldamento || []).splice(wi, 1);
  saveData(data);
  renderAllenamento();
};
window.updateWarmup = function(idx, wi, campo, v) {
  const data = loadData();
  const w = (data[currentDay][idx].riscaldamento || [])[wi];
  if (!w) return;
  w[campo] = Number(v) || 0;
  saveData(data);
};
window.toggleWarmup = function(idx, wi) {
  const data = loadData();
  const w = (data[currentDay][idx].riscaldamento || [])[wi];
  if (!w) return;
  w.done = !w.done;
  saveData(data);
  renderAllenamento();
};

/* ---- calcolatore dischi ---- */
const DISCHI = [25, 20, 15, 10, 5, 2.5, 1.25];
const COLORE_DISCO = { 25: '#e5484d', 20: '#3b82f6', 15: '#eab308', 10: '#22c55e', 5: '#f3f3f6', 2.5: '#a8a8b6', 1.25: '#6b6b78' };

window.dischiPerLato = function(totale, bilanciere) {
  let lato = (Number(totale) - Number(bilanciere)) / 2;
  if (lato < 0) return { dischi: [], resto: 0, impossibile: true };
  const out = [];
  DISCHI.forEach(d => { while (lato >= d - 1e-9) { out.push(d); lato = Math.round((lato - d) * 100) / 100; } });
  return { dischi: out, resto: Math.round(lato * 100) / 100, impossibile: false };
};

let dischiBil = 20;
window.openPlates = function(idx) {
  const e = loadData()[currentDay][idx];
  const prossima = e.completedSets.find(s => !s.done) || e.completedSets[0];
  document.getElementById('plate-kg').value = prossima ? prossima.weight : e.weight;
  document.getElementById('plate-title').innerText = e.name.replace(EMOJI_TESTA, '');
  document.getElementById('plate-sheet').classList.remove('hidden');
  renderPlates();
};
window.closePlates = function() { document.getElementById('plate-sheet').classList.add('hidden'); };
window.setBilanciere = function(v) { dischiBil = v; renderPlates(); };
window.renderPlates = function() {
  const kg = Number(document.getElementById('plate-kg').value) || 0;
  const r = dischiPerLato(kg, dischiBil);
  document.querySelectorAll('.plate-bar-btn').forEach(b => b.classList.toggle('on', Number(b.dataset.kg) === dischiBil));
  const vis = document.getElementById('plate-vis');
  const txt = document.getElementById('plate-txt');
  if (r.impossibile) { vis.innerHTML = ''; txt.innerText = 'Il carico e sotto il peso del bilanciere.'; return; }
  vis.innerHTML = '<div class="pl-bar"></div>' + r.dischi.map(d =>
    '<div class="pl-disc" style="height:' + (24 + d * 2.2) + 'px;background:' + COLORE_DISCO[d] + '" title="' + d + ' kg"></div>').join('') + '<div class="pl-end"></div>';
  txt.innerText = r.dischi.length
    ? 'Per lato: ' + r.dischi.map(d => String(d).replace('.', ',')).join(' + ') + ' kg' + (r.resto ? ' (restano ' + String(r.resto).replace('.', ',') + ' kg per lato)' : '')
    : 'Solo il bilanciere.';
};

/* ---- tempo trascorso ---- */
let sedutaTimer = null;
function avviaTempoSeduta(day) {
  let inizio = null;
  try {
    const salvato = JSON.parse(localStorage.getItem('tz_seduta_inizio') || 'null');
    if (salvato && salvato.day === day && Date.now() - salvato.t < 6 * 3600 * 1000) inizio = salvato.t;
  } catch (e) {}
  if (!inizio) { inizio = Date.now(); try { localStorage.setItem('tz_seduta_inizio', JSON.stringify({ day: day, t: inizio })); } catch (e) {} }
  clearInterval(sedutaTimer);
  const tick = () => {
    const el = document.getElementById('session-elapsed');
    if (el) el.innerText = 'In corso da ' + formatMMSS((Date.now() - inizio) / 1000);
  };
  tick();
  sedutaTimer = setInterval(tick, 1000);
}
function fermaTempoSeduta(azzera) {
  clearInterval(sedutaTimer);
  sedutaTimer = null;
  if (azzera) { try { localStorage.removeItem('tz_seduta_inizio'); } catch (e) {} }
}

function renderAllenamento() {
  try { renderCardio(); } catch (e) {}
  pulisciSostituzioniVecchie();
  const data = loadData();
  const list = data[currentDay] || [];
  const container = document.getElementById('allenamento-list');
  if (list.length === 0) {
    container.innerHTML = '<span class="muted">Nessun esercizio pianificato. Aggiungine uno dal tab Piano.</span>';
  } else {
    container.innerHTML = list.map((e, idx) => `
      <div class="workout-item ${e.skipped ? 'skipped' : ''}">
        <div class="workout-item-head">
          <div>
            <div class="ex-name">${e.superset ? '<span class="ss-tag">⛓</span> ' : ''}${findExercise(e.name) ? '<span class="ex-fig">' + muscleFigure(findExercise(e.name).group) + '</span>' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) : escapeHtml(e.name)}</div>
            <div class="ex-data">Recupero ${e.rest} s${infoEsercizio(e.name)}</div>
            ${htmlSostituito(e)}
            ${e.coachNote && coachAttivo() ? `<span class="coach-badge-set ${e.coachTipo || ''}"><b>Coach ·</b> ${escapeHtml(e.coachNote)}</span>` : ''}
            ${coachAttivo() && (e.tecnicaSeduta || e.tecnica) && TECNICHE[e.tecnicaSeduta || e.tecnica] ? `<span class="tecnica-badge">${escapeHtml(TECNICHE[e.tecnicaSeduta || e.tecnica])}</span>` : ''}
            ${e.recordSeduta ? `<span class="pr-badge">\u{1F3C6} Record! 1RM stimato ${e.recordSeduta} kg</span>` : ''}
            ${ultimaVoltaTesto(e.name) ? `<span class="last-time">${escapeHtml(ultimaVoltaTesto(e.name))}</span>` : ''}
            ${e.note ? `<div class="plan-note">📝 ${escapeHtml(e.note)}</div>` : ''}
          </div>
          <button class="info-btn" onclick="openExerciseInfo('${jsArg(e.name)}')" title="Come si fa" aria-label="Come si fa">ℹ</button>
          <button class="skip-btn ${e.skipped ? 'on' : ''}" onclick="toggleSkipExercise(${idx})">${e.skipped ? '↺ Riprendi' : '⏭ Salta'}</button>
        </div>
        <div class="set-rows">
          ${(e.riscaldamento || []).map((w, wi) => `
            <div class="set-row warmup ${w.done ? 'done' : ''}">
              <span class="set-num warm">R</span>
              <input type="number" inputmode="numeric" class="set-input small" value="${w.reps}" onchange="updateWarmup(${idx},${wi},'reps',this.value)" aria-label="Ripetizioni del riscaldamento">
              <span class="set-x">×</span>
              <input type="number" class="set-input" value="${w.weight}" step="0.5" onchange="updateWarmup(${idx},${wi},'weight',this.value)" aria-label="Carico del riscaldamento">
              <span class="set-kg-label">kg</span>
              <button class="set-flame-btn" onclick="removeWarmup(${idx},${wi})" aria-label="Togli il riscaldamento">✕</button>
              <button class="set-check ${w.done ? 'checked' : ''}" onclick="toggleWarmup(${idx},${wi})" aria-label="Riscaldamento fatto">✓</button>
            </div>`).join('')}
          ${e.completedSets.map((s, si) => `
            <div class="set-row ${s.done ? 'done' : ''} ${armedSet && armedSet.exIdx === idx && armedSet.setIdx === si ? 'armed' : ''}">
              <span class="set-num">${si + 1}</span>
              <input type="number" inputmode="numeric" class="num-drag" data-reps-ex="${idx}" data-reps-set="${si}" value="${s.reps}"><button class="wheel-btn" type="button" data-wheel-ex="${idx}" data-wheel-set="${si}" aria-label="Scegli con la ruota">▾</button>
              <span class="set-x">×</span>
              <input type="number" class="set-input" value="${corpoLibero(e.name) && !s.weight ? '' : s.weight}" placeholder="${corpoLibero(e.name) ? '+0' : ''}" step="0.5" oninput="updateSetField(${idx},${si},'weight',this.value)" aria-label="Carico">
              <span class="set-kg-label">kg</span>
              ${isTimeBased(e.name) && !s.done ? htmlLavoro(idx, si) : s.done && !s.wasBerserk ? `<select class="rpe-sel" onchange="updateSetRpe(${idx},${si},this.value)" aria-label="Quanto era dura (RPE)"><option value="">RPE</option>${RPE_VALORI.map(v => `<option value="${v}" ${Number(s.rpe) === Number(v) ? 'selected' : ''}>${v.replace('.', ',')}</option>`).join('')}</select>` : s.wasBerserk ? `<button class="set-flame-btn flame-on" onclick="annullaCedimento(${idx},${si})" aria-label="Togli il cedimento dalla serie ${si + 1}" title="Tocca per togliere il cedimento">🔥</button>` : `<button class="set-flame-btn ${armedSet && armedSet.exIdx === idx && armedSet.setIdx === si ? 'armed' : ''}" onclick="armDropTarget(${idx},${si})" aria-label="Porta la serie ${si + 1} a cedimento" title="Porta a cedimento">🔥</button>`}
              <button class="set-check ${s.done ? 'checked' : ''}" onclick="toggleSetDone(${idx},${si})" aria-label="Segna serie ${si + 1} completata">✓</button>
            </div>
          `).join('')}
          ${htmlExtra(e, idx)}
        </div>
        ${e.completedSets.some(s => s.done && !s.wasBerserk && !s.rpe) ? '<div class="rpe-hint"><b>RPE</b> = quanto era dura la serie: 10 cedimento, 9 ti restava 1 ripetizione, 8 te ne restavano 2, 7 tre, 6 facile.</div>' : ''}
        <div class="set-tools">
          <button class="set-tool-btn" onclick="removeSetFrom(${idx})" ${e.sets <= 1 ? 'disabled' : ''}>− Serie</button>
          <button class="set-tool-btn" onclick="addSetTo(${idx})">+ Serie</button>
          <button class="set-tool-btn" onclick="addWarmup(${idx})" ${(e.riscaldamento || []).length >= 3 ? 'disabled' : ''}>+ Risc.</button>
          ${attrezzoDi(e.name) === 'bilanciere' && isOn(DISCHI_KEY, true) ? `<button class="set-tool-btn" onclick="openPlates(${idx})">Dischi</button>` : ''}
          ${e.completedSets.some(s => s.done) && !isTimeBased(e.name) ? `<button class="set-tool-btn" onclick="aggiungiExtra(${idx},'drop')">+ Drop</button><button class="set-tool-btn" onclick="aggiungiExtra(${idx},'rp')">+ Rest-pause</button>` : ''}
        </div>
        ${htmlOccupato(e, idx, list)}
      </div>
    `).join('');

    /* Le ripetizioni si regolano trascinando il numero in alto o in basso,
       oppure digitandolo. Limiti diversi per gli isometrici, che vanno a secondi. */
    container.querySelectorAll('.num-drag[data-reps-ex]').forEach(inp => {
      const exIdx = Number(inp.dataset.repsEx);
      const setIdx = Number(inp.dataset.repsSet);
      const nome = (list[exIdx] || {}).name || '';
      const r = repsRange(nome);
      attachRepsField(inp, r.min, r.max, (val) => updateSetField(exIdx, setIdx, 'reps', val));
    });
  }
  const active = list.filter(e => !e.skipped);
  const totalSets = active.reduce((s, e) => s + e.sets, 0);
  const doneSets = active.reduce((s, e) => s + e.completedSets.filter(x => x.done).length, 0);
  const skipped = list.length - active.length;
  const prog = document.getElementById('session-progress');
  if (prog) prog.innerText = (totalSets ? doneSets + ' / ' + totalSets + ' serie completate' : '') + (skipped ? ' \u2022 ' + skipped + ' saltati' : '');

  refreshDropButtonState();
}

/* Aggiungere o togliere una serie si fa QUI, il giorno dell'allenamento:
   e' il momento in cui sai davvero come stai andando. */
window.addSetTo = function(idx) {
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex) return;
  const ultima = ex.completedSets[ex.completedSets.length - 1];
  ex.completedSets.push({
    done: false,
    reps: ultima ? ultima.reps : ex.reps,
    weight: ultima ? ultima.weight : ex.weight,
    wasBerserk: false
  });
  ex.sets = ex.completedSets.length;
  saveData(data);
  renderAllenamento();
  renderPiano();
};

window.removeSetFrom = function(idx) {
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex || ex.completedSets.length <= 1) return;
  const tolta = ex.completedSets.pop();
  ex.sets = ex.completedSets.length;
  saveData(data);
  if (armedSet && armedSet.exIdx === idx && armedSet.setIdx >= ex.completedSets.length) armedSet = null;
  renderAllenamento();
  renderPiano();
  showUndo(trP('Una serie in meno su %s', trEs(ex.name)), () => {
    const d2 = loadData();
    d2[currentDay][idx].completedSets.push(tolta);
    d2[currentDay][idx].sets = d2[currentDay][idx].completedSets.length;
    saveData(d2);
    renderAllenamento(); renderPiano();
  });
};

/* Saltare un esercizio non lo cancella: resta in scheda per le volte
   successive, ma esce dal conteggio della sessione di oggi. */
window.toggleSkipExercise = function(idx) {
  const data = loadData();
  const ex = data[currentDay][idx];
  if (!ex) return;
  ex.skipped = !ex.skipped;
  saveData(data);
  renderAllenamento();
  if (ex.skipped) {
    showUndo(trP('%s saltato per oggi', trEs(ex.name)), () => {
      const d2 = loadData();
      d2[currentDay][idx].skipped = false;
      saveData(d2);
      renderAllenamento();
    });
  }
};
