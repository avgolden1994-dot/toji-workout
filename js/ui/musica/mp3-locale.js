/* Libreria MP3 locale (IndexedDB)
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ---- MP3 locale: IndexedDB ---- */
function openAudioDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window) || !window.indexedDB) {
      reject(new Error('IndexedDB non disponibile'));
      return;
    }
    const req = indexedDB.open(AUDIO_DB_NAME, AUDIO_DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE)) {
        db.createObjectStore(AUDIO_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbAddTrack(record) {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, 'readwrite');
    const req = tx.objectStore(AUDIO_STORE).add(record);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbGetAllTracks() {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, 'readonly');
    const req = tx.objectStore(AUDIO_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function dbDeleteTrack(id) {
  const db = await openAudioDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE, 'readwrite');
    const req = tx.objectStore(AUDIO_STORE).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
function readAudioDuration(file) {
  return new Promise((resolve) => {
    const el = document.createElement('audio');
    const url = URL.createObjectURL(file);
    let done = false;
    const timeoutMs = window.__TZ_METADATA_TIMEOUT_MS || 6000;
    const finish = (dur) => {
      if (done) return;
      done = true;
      URL.revokeObjectURL(url);
      resolve(dur);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    el.preload = 'metadata';
    el.addEventListener('loadedmetadata', () => {
      clearTimeout(timer);
      const d = isFinite(el.duration) ? el.duration : null;
      finish(d);
    });
    el.addEventListener('error', () => { clearTimeout(timer); finish(null); });
    el.src = url;
  });
}

window.handleAudioUpload = async function(fileList) {
  const file = fileList && fileList[0];
  if (!file) return;
  if (!file.type || !file.type.startsWith('audio/')) {
    alert('Seleziona un file audio valido (mp3, m4a, wav...).');
    return;
  }
  const statusEl = document.getElementById('upload-status');
  if (statusEl) statusEl.innerText = 'Caricamento in corso...';
  try {
    const duration = await readAudioDuration(file);
    const id = await dbAddTrack({ name: file.name, type: file.type, blob: file, duration });
    await refreshFailureTracks();
    selectTrack(id);
  } catch (err) {
    alert('Errore nel caricamento del file audio. Il tuo browser potrebbe non supportare il salvataggio locale.');
  } finally {
    if (statusEl) statusEl.innerText = '';
  }
};

async function refreshFailureTracks() {
  failureTracks = await dbGetAllTracks();
  renderFailureTracks();
  if (!musicaRipristinata) ripristinaMusica(false);
  else aggiornaRiassuntoMusica();
}
function renderFailureTracks() {
  const container = document.getElementById('track-list');
  if (!container) return;
  if (failureTracks.length === 0) {
    container.innerHTML = '<span class="muted">Nessuna traccia caricata.</span>';
    return;
  }
  container.innerHTML = failureTracks.slice().reverse().map(t => `
    <div class="track-item">
      <div>
        <div class="track-name">${escapeHtml(t.name)}</div>
        <div class="track-meta">${t.duration ? formatMMSS(t.duration) : 'durata sconosciuta'}</div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button class="track-select-btn ${t.id === selectedTrackId ? 'selected' : ''}" onclick="selectTrack(${t.id})">${t.id === selectedTrackId ? 'Selezionata' : 'Seleziona'}</button>
        <button class="del-btn" onclick="deleteTrack(${t.id})">✕</button>
      </div>
    </div>
  `).join('');
}

window.selectTrack = function(id, silenzioso) {
  const track = failureTracks.find(t => t.id === id);
  if (!track) return;
  selectedTrackId = id;
  if (selectedTrackUrl) URL.revokeObjectURL(selectedTrackUrl);
  selectedTrackUrl = URL.createObjectURL(track.blob);

  const audio = document.getElementById('failure-audio');
  audio.style.display = 'block';
  audio.preload = 'metadata';   /* legge solo la durata: non occupa l audio */
  audio.src = selectedTrackUrl;
  if (typeof audio.load === 'function') { try { audio.load(); } catch (e) {} }

  const rangeRow = document.getElementById('mp3-range-row');
  rangeRow.style.display = 'flex';
  const range = document.getElementById('segment-start-mp3');
  const dur = track.duration;
  if (dur && dur > FAILURE_SET_SECONDS) {
    range.disabled = false;
    range.max = Math.floor(dur - FAILURE_SET_SECONDS);
    range.value = 0;
  } else {
    range.disabled = true;
    range.max = 0;
    range.value = 0;
  }
  updateMp3SegmentLabel(track);
  stopDropSet();
  renderFailureTracks();
  if (!silenzioso) salvaMusica();
};

function updateMp3SegmentLabel(track) {
  const range = document.getElementById('segment-start-mp3');
  const start = Number(range.value) || 0;
  const dur = track.duration;
  const end = dur ? Math.min(start + FAILURE_SET_SECONDS, dur) : start + FAILURE_SET_SECONDS;
  document.getElementById('segment-label-mp3').innerText = dur
    ? `${formatMMSS(start)} → ${formatMMSS(end)}`
    : `Durata non rilevata: primi ${FAILURE_SET_SECONDS}s`;
  const audio = document.getElementById('failure-audio');
  if (audio && !dropActive) { try { audio.currentTime = start; } catch (e) {} }
}
window.onMp3RangeInput = function(silenzioso) {
  const t = failureTracks.find(x => x.id === selectedTrackId);
  if (t) updateMp3SegmentLabel(t);
  if (silenzioso !== true) salvaMusica();
};

window.deleteTrack = async function(id) {
  const m = leggiMusica();
  if (m && m.trackId === id) { m.trackId = null; try { localStorage.setItem(MUSIC_KEY, JSON.stringify(m)); } catch (e) {} }
  if (!confirm('Eliminare questa traccia?')) return;
  await dbDeleteTrack(id);
  if (selectedTrackId === id) {
    selectedTrackId = null;
    if (selectedTrackUrl) { URL.revokeObjectURL(selectedTrackUrl); selectedTrackUrl = null; }
    document.getElementById('failure-audio').style.display = 'none';
    document.getElementById('mp3-range-row').style.display = 'none';
    stopDropSet();
  }
  await refreshFailureTracks();
};
