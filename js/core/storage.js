/* Storage per modalita e normalizzazione dei dati
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   STORAGE (namespaced per modalità) + NORMALIZZAZIONE DATI
   ============================================================ */
const dataKey = () => `coach_plus_data_${currentMode}`;
const historyKey = () => `coach_plus_history_${currentMode}`;
const titlesKey = () => `coach_plus_titles_${currentMode}`;

/* lettura protetta: un dato salvato rovinato non deve bloccare l app.
   Si tiene una copia del dato rotto e si riparte dal valore vuoto. */
function leggiJSON(key, vuoto) {
  const raw = localStorage.getItem(key);
  if (raw == null || raw === '') return JSON.parse(vuoto);
  try { return JSON.parse(raw); }
  catch (e) {
    try { localStorage.setItem(key + '_rotto_' + Date.now(), raw); localStorage.removeItem(key); } catch (e2) {}
    return JSON.parse(vuoto);
  }
}
const loadTitles = () => { const t = leggiJSON(titlesKey(), '{}'); return (t && typeof t === 'object' && !Array.isArray(t)) ? t : {}; };
const saveTitles = (t) => localStorage.setItem(titlesKey(), JSON.stringify(t));
function getDayTitle(day) {
  const t = loadTitles();
  return (t[day] && String(t[day]).trim()) ? t[day] : day;
}

function normalizeExerciseRecord(e) {
  const sets = Number(e.sets) || 0;
  const reps = Number(e.reps) || 0;
  const weight = Number(e.weight) || 0;
  const rest = e.rest !== undefined && e.rest !== null && e.rest !== '' ? Number(e.rest) || 0 : 90;

  let cs = Array.isArray(e.completedSets) ? e.completedSets : [];
  cs = cs.map(item => {
    if (item && typeof item === 'object') {
      return {
        done: !!item.done,
        reps: Number(item.reps) || reps,
        weight: item.weight !== undefined && item.weight !== null && item.weight !== '' ? Number(item.weight) : weight,
        wasBerserk: !!item.wasBerserk,
        rpe: item.rpe !== undefined && item.rpe !== null && item.rpe !== '' ? Number(item.rpe) : null
      };
    }
    /* formato precedente: booleano semplice */
    return { done: !!item, reps, weight, wasBerserk: false };
  });
  while (cs.length < sets) cs.push({ done: false, reps, weight, wasBerserk: false });
  if (cs.length > sets) cs = cs.slice(0, sets);

  e.completedSets = cs;
  e.sets = sets;
  e.reps = reps;
  e.weight = weight;
  e.rest = rest;
  e.note = typeof e.note === 'string' ? e.note : '';
  e.superset = !!e.superset;
  e.skipped = !!e.skipped;
  e.addedBy = e.addedBy === 'group' ? 'group' : 'manual';
  delete e.wasBerserk; /* ora tracciato per singola serie in completedSets[i].wasBerserk */
  delete e.done;
  return e;
}

function loadData() {
  let raw = leggiJSON(dataKey(), '{}');
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) raw = {};
  const out = {};
  DAYS.forEach(d => {
    out[d] = Array.isArray(raw[d]) ? raw[d].map(normalizeExerciseRecord) : [];
  });
  return out;
}
const saveData = (data) => localStorage.setItem(dataKey(), JSON.stringify(data));

function normalizeHistoryEntry(session) {
  /* ATTENZIONE: qui si conservano TUTTI i campi utili. Prima venivano
     scartati id e dettaglio serie per serie: rileggendo e risalvando lo
     storico, il dettaglio andava perso per sempre. */
  return {
    id: session.id,
    sessione: Array.isArray(session.sessione) ? session.sessione : undefined,
    day: session.day,
    date: session.date,
    berserk: !!session.berserk,
    feedback: session.feedback || undefined,
    commentoIA: session.commentoIA && session.commentoIA.testo ? { testo: String(session.commentoIA.testo), data: session.commentoIA.data || '' } : undefined,
    minuti: Number(session.minuti) || undefined,
    prontezza: session.prontezza !== undefined && session.prontezza !== null ? session.prontezza : undefined,
    interrotta: session.interrotta ? true : undefined,
    cardio: Array.isArray(session.cardio) && session.cardio.length ? session.cardio.map(c => ({ tipo: String(c.tipo || ''), min: Number(c.min) || 0 })) : undefined,
    titolo: session.titolo || undefined,
    importata: session.importata || undefined,
    passata: session.passata ? true : undefined,
    libera: session.libera ? true : undefined,
    skipped: Number(session.skipped) || 0,
    settimana: session.settimana && typeof session.settimana.fase === 'string' && session.settimana.fase ? { numero: Number(session.settimana.numero) || 0, fase: session.settimana.fase.slice(0, 20) } : undefined,   /* MES-09: settimana e fase del programma (facoltativa) */
    exercises: (session.exercises || []).map(e => ({
      name: e.name,
      weight: e.weight,
      totalSets: e.totalSets !== undefined ? e.totalSets : (e.sets !== undefined ? e.sets : 0),
      doneSets: e.doneSets !== undefined ? e.doneSets : 0,
      wasBerserk: !!e.wasBerserk
    }))
  };
}
function loadHistory() {
  const raw = leggiJSON(historyKey(), '[]');
  return (Array.isArray(raw) ? raw : []).filter(x => x && typeof x === 'object').map(normalizeHistoryEntry);
}
const saveHistory = (data) => localStorage.setItem(historyKey(), JSON.stringify(data));

function migrateLegacyDataIfNeeded(mode) {
  const legacyData = localStorage.getItem('coach_plus_data');
  if (legacyData && !localStorage.getItem(dataKey()) && mode === 'toji') {
    localStorage.setItem(dataKey(), legacyData);
  }
  const legacyHist = localStorage.getItem('coach_plus_history');
  if (legacyHist && !localStorage.getItem(historyKey()) && mode === 'toji') {
    localStorage.setItem(historyKey(), legacyHist);
  }
}

function seedDefaultsIfNeeded(mode) {
  const seededKey = `tz_seeded_${mode}`;
  if (localStorage.getItem(seededKey) === '1') return;
  const existing = loadData();
  const hasAny = Object.values(existing).some(list => list.length > 0);
  if (hasAny) { localStorage.setItem(seededKey, '1'); return; }

  const preset = DEFAULT_MONDAY_PROGRAM[mode] || [];
  const data = {};
  DAYS.forEach(d => { data[d] = []; });
  data['Lunedì'] = preset.map(e => normalizeExerciseRecord({ ...e, completedSets: [] }));
  saveData(data);
  localStorage.setItem(seededKey, '1');
}
