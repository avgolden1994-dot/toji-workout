/* Termina allenamento e cardio
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   TERMINA ALLENAMENTO → Storico
   ============================================================ */
let ultimaChiusuraSeduta = 0;

/* MES-09: la seduta salvata ricorda in che settimana e fase del programma e stata fatta (`settimana: { numero, fase }`) e,
   per ogni esercizio, cosa il coach prevedeva (`obiettivo: { reps, sets, rir, tecnica, coachTipo }`): senza, uno scarico
   e una seduta qualunque (carico di riferimento, analisi, RPE contro il RIR di quel giorno). Campi facoltativi: le voci
   vecchie non li hanno e restano valide.
   loadHistory() ricostruisce ogni voce campo per campo (normalizeHistoryEntry, js/core/storage.js) e scarterebbe `settimana`
   a ogni lettura e risalvataggio dello storico: qui la si rimette (valida o assente). `obiettivo` sta dentro `sessione`,
   che normalizeHistoryEntry lascia com e. */
const _normalizeHistoryEntryPrimaFase = normalizeHistoryEntry;
normalizeHistoryEntry = function(session) {
  const out = _normalizeHistoryEntryPrimaFase(session);
  const s = session && session.settimana;
  if (s && typeof s === 'object' && typeof s.fase === 'string' && s.fase) out.settimana = { numero: Number(s.numero) || 0, fase: s.fase.slice(0, 20) };
  return out;
};
function obiettivoSeduta(e) {
  const reps = Number(e.reps), serie = Number(e.sets);
  const o = { reps: reps > 0 ? reps : undefined, sets: serie > 0 ? serie : undefined, tecnica: e.tecnicaSeduta || e.tecnica || undefined, coachTipo: e.coachTipo || undefined };
  if (coachAttivo() && !isTimeBased(e.name)) {
    try { const r = rirBersaglio(e.name); if (Array.isArray(r)) o.rir = [r[0], r[1]]; } catch (err) {}
  }
  return o;
}

/* ============================================================
   CARDIO NELLA SEDUTA
   Sei scelte in un menu a tendina. Per chi fa pesi la camminata in
   pendenza e la piu facile da recuperare; la corsa veloce va lontana dai
   giorni di gambe pesanti (IFPA, SwolMindset). Riferimento OMS: 150 minuti
   a settimana di attivita moderata.
   ============================================================ */
const CARDIO_TIPI = [
  ['pendenza', 'Camminata in pendenza'],
  ['camminata', 'Camminata veloce'],
  ['corsa', 'Corsa'],
  ['corsaveloce', 'Corsa veloce'],
  ['bici', 'Bici'],
  ['vogatore', 'Vogatore']
];
const cardioKey = () => 'tz_cardio_corrente_' + currentMode;
function cardioCorrente() { return leggiJSON(cardioKey(), '[]') || []; }
let cardioAperto = false;
function nomeCardio(id) { const t = CARDIO_TIPI.find(x => x[0] === id); return t ? t[1] : id; }
window.renderCardio = function() {
  const box = document.getElementById('cardio-wrap');
  if (!box) return;
  const c = cardioCorrente();
  const tot = c.reduce((t, x) => t + (Number(x.min) || 0), 0);
  box.innerHTML = '<button class="btn-cardio' + (c.length ? ' on' : '') + '" onclick="toggleCardio()">' + ico('cardio') + ' <span>Cardio</span>' +
      (c.length ? ' <small>· <span data-no-tr>' + tot + ' min</span> <span>' + c.map(x => nomeCardio(x.tipo)).join(', ') + '</span></small>' : '') + '</button>' +
    (cardioAperto ? '<div class="cardio-box">' +
      (c.length ? c.map((x, i) => '<div class="cardio-riga"><span><span>' + nomeCardio(x.tipo) + '</span> · <span data-no-tr>' + x.min + ' min</span></span><button class="og-link" onclick="togliCardio(' + i + ')">Togli</button></div>').join('') : '') +
      '<label class="cardio-l"><span>Tipo</span><select id="cardio-tipo">' + CARDIO_TIPI.map(t => '<option value="' + t[0] + '">' + t[1] + '</option>').join('') + '</select></label>' +
      '<label class="cardio-l"><span>Minuti</span><input type="number" inputmode="numeric" min="1" max="240" id="cardio-min" value="20"></label>' +
      '<button class="btn-archive" onclick="aggiungiCardio()">Aggiungi il cardio</button></div>' : '');
};
window.toggleCardio = function() { cardioAperto = !cardioAperto; renderCardio(); };
window.aggiungiCardio = function() {
  const tipo = (document.getElementById('cardio-tipo') || {}).value || 'pendenza';
  const min = Math.round(Number((document.getElementById('cardio-min') || {}).value) || 0);
  if (!(min > 0 && min <= 240)) { showUndo('Scrivi i minuti di cardio'); return; }
  const c = cardioCorrente(); c.push({ tipo: tipo, min: min });
  localStorage.setItem(cardioKey(), JSON.stringify(c));
  cardioAperto = false; renderCardio();
  showUndo(trP('Cardio aggiunto: %s', tr(nomeCardio(tipo)) + ' ' + min + ' min'), () => { const c2 = cardioCorrente(); c2.pop(); localStorage.setItem(cardioKey(), JSON.stringify(c2)); renderCardio(); });
};
window.togliCardio = function(i) { const c = cardioCorrente(); c.splice(i, 1); localStorage.setItem(cardioKey(), JSON.stringify(c)); renderCardio(); };
/* statistiche del cardio: questa settimana e media delle ultime 4 */
function minutiCardioSettimana(lun) {
  const a = piuGiorni(lun, 7);
  return tutteLeSedute().reduce((t, h) => { const d = dataSessione(h); return d && d >= lun && d < a ? t + (h.cardio || []).reduce((q, c) => q + (Number(c.min) || 0), 0) : t; }, 0);
}
window.renderCardioStat = function() {
  const box = document.getElementById('pg-cardio');
  if (!box) return;
  const lun = lunediDi(new Date());
  const ora = minutiCardioSettimana(lun);
  const ult = [1, 2, 3, 4].map(k => minutiCardioSettimana(piuGiorni(lun, -7 * k)));
  const media = Math.round(ult.reduce((t, x) => t + x, 0) / 4);
  const perTipo = {};
  tutteLeSedute().forEach(h => { const d = dataSessione(h); if (d && d >= piuGiorni(lun, -28)) (h.cardio || []).forEach(c => { perTipo[c.tipo] = (perTipo[c.tipo] || 0) + (Number(c.min) || 0); }); });
  box.innerHTML = '<div class="section-title">Cardio</div>' +
    '<div class="pw-kp"><div><span>Questa settimana</span><b data-no-tr>' + ora + ' min</b></div>' +
    '<div><span>Media delle ultime 4</span><b data-no-tr>' + media + ' min</b></div>' +
    '<div><span>Riferimento OMS</span><b data-no-tr>150 min</b></div></div>' +
    '<div class="wday-progress" style="margin-top:10px"><span style="width:' + Math.min(100, Math.round(ora / 150 * 100)) + '%"></span></div>' +
    (Object.keys(perTipo).length ? '<div class="pw-list">' + Object.keys(perTipo).map(k => '<div class="pw-row"><span>' + nomeCardio(k) + '</span><b data-no-tr>' + perTipo[k] + ' min</b></div>').join('') + '</div>'
      : '<div class="sr-note">Lo aggiungi in seduta con il pulsante Cardio, prima di terminare.</div>');
};

window.endWorkout = function() {
  const data = loadData();
  const list = data[currentDay] || [];
  if (list.length === 0) {
    alert('Nessun esercizio pianificato per oggi.');
    return;
  }

  const activeList = list.filter(e => !e.skipped);
  const anySetChecked = activeList.some(e => e.completedSets.some(s => s.done));
  const sedutaInterrotta = !!window.__sedutaInterrotta;
  window.__sedutaInterrotta = false;
  /* doppio tocco su Termina: la seduta appena salvata ha azzerato le serie,
     il secondo tocco non deve salvarne una vuota */
  if (!anySetChecked && Date.now() - ultimaChiusuraSeduta < 3000) return;
  if (!anySetChecked && !sedutaInterrotta) {
    const proceed = confirm('Non hai completato nessun set. Vuoi terminare comunque la sessione?');
    if (!proceed) return;
  }

  const berserkFound = activeList.some(e => e.completedSets.some(s => s.wasBerserk));
  const skippedCount = list.length - activeList.length;
  const historyEntry = {
    id: Date.now(),
    day: currentDay,
    date: formatNow(),
    /* fotografia completa, serie per serie: e cio che si rivede aprendo
       un giorno gia completato */
    minuti: minutiSeduta(),
    prontezza: prontezzaOggi(currentDay),
    interrotta: sedutaInterrotta || undefined,
    sessione: activeList.map(e => ({
      name: e.name,
      rest: e.rest,
      sets: e.completedSets.map(s => ({ reps: s.reps, weight: s.weight, done: !!s.done, wasBerserk: !!s.wasBerserk, rpe: s.rpe || null })),
      riscaldamento: (e.riscaldamento || []).filter(w => w.done).map(w => ({ reps: w.reps, weight: w.weight })),
      extra: (e.extra || []).filter(x => x.done).length ? e.extra.filter(x => x.done).map(x => ({ tipo: x.tipo, reps: x.reps, weight: x.weight })) : undefined
    })),
    berserk: berserkFound,
    skipped: skippedCount,
    cardio: cardioCorrente().length ? cardioCorrente() : undefined,
    exercises: activeList.map(e => {
      const doneSets = e.completedSets.filter(s => s.done);
      const lastWeight = doneSets.length ? doneSets[doneSets.length - 1].weight : e.weight;
      return {
        name: e.name,
        weight: lastWeight,
        totalSets: e.sets,
        doneSets: doneSets.length,
        wasBerserk: e.completedSets.some(s => s.wasBerserk)
      };
    })
  };

  ultimaChiusuraSeduta = Date.now();
  const spec = specialeAttiva(currentDay);
  if (spec) {
    historyEntry.titolo = spec.titolo;
    if (spec.tipo === 'libera') historyEntry.libera = true;
    if (spec.tipo === 'passata' && spec.quando) {
      historyEntry.id = spec.quando; historyEntry.date = dataOra(new Date(spec.quando)); historyEntry.passata = true;
      historyEntry.minuti = undefined; historyEntry.prontezza = undefined;
    }
  }
  /* MES-09: settimana e obiettivo di ogni esercizio, calcolati prima di salvare (il RIR bersaglio vede ancora lo storico di prima); non per le sedute fuori programma */
  if (!historyEntry.libera && !historyEntry.passata && regolaAttiva('MES-09')) {
    try {
      const sett = settimanaProgramma();
      if (sett && sett.fase) historyEntry.settimana = { numero: sett.numero, fase: sett.fase };
      historyEntry.sessione.forEach((s, i) => { s.obiettivo = obiettivoSeduta(activeList[i]); });
    } catch (err) {}
  }
  const history = loadHistory();
  history.unshift(historyEntry);
  if (historyEntry.passata) history.sort((a, b) => (dataSessione(b) || 0) - (dataSessione(a) || 0));
  saveHistory(history);
  segnaFattoNelCalendario(historyEntry);   /* la spunta sul giorno di oggi */
  localStorage.removeItem(cardioKey()); cardioAperto = false; try { renderCardio(); } catch (e) {}
  fermaTempoSeduta(true);

  if (coachAttivo() && !sedutaInterrotta && !historyEntry.passata) { try { imparaDallaSeduta(activeList); } catch (err) {} }
  /* coach IA: commento a fine seduta, in background (non blocca nulla) */
  if (anySetChecked && !sedutaInterrotta && !historyEntry.passata && typeof coachIAAttivo === 'function' && coachIAAttivo()) {
    try { commentaSeduta(historyEntry.id, true); } catch (err) {}
  }
  ripristinaSostituzioni(list);   /* macchinario occupato: l esercizio previsto torna nel piano */
  impostaOccupato(null);
  list.forEach(e => {
    e.completedSets = e.completedSets.map(() => ({ done: false, reps: e.reps, weight: e.weight, wasBerserk: false }));
    if (e.riscaldamento) e.riscaldamento = e.riscaldamento.map(w => Object.assign({}, w, { done: false }));
    delete e.recordSeduta;
    delete e.extra;   /* drop e rest-pause valgono per la seduta */
    e.skipped = false; /* il salto vale per la sessione di oggi, non per sempre */
  });
  data[currentDay] = list;
  saveData(data);
  if (spec) ripristinaSpeciale();   /* il piano di oggi torna com era */

  armedSet = null;
  stopDropSet();
  closeRecoveryPanel();

  renderPiano();
  renderAllenamento();
  backToDayPicker();
  switchTab('storico');
  /* il questionario usa dati sulla salute (dolore): solo con il consenso */
  if (coachAttivo() && !sedutaInterrotta && !historyEntry.passata) {
    consumaAggiusti(historyEntry);
    if (anySetChecked) apriQuestionario(historyEntry);
  }
  try { localStorage.removeItem(PRONTEZZA_KEY()); } catch (e) {}
};
