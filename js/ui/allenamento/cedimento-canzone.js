/* Cedimento: la canzone si sceglie una volta
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   MODULO CEDIMENTO 90s (Drop / Berserk)
   ============================================================ */
/* ============================================================
   CANZONE DEL CEDIMENTO: SI SCEGLIE UNA VOLTA
   Prima la scelta viveva solo in memoria: a ogni riavvio si perdeva e
   andava rifatta. Ora si salva (traccia o link, punto di partenza,
   volume) e vale per tutti gli allenamenti finche non la cambi.
   ============================================================ */
const MUSIC_KEY = 'tz_cedimento_audio';
let musicaRipristinata = false;

function leggiMusica() {
  try { return JSON.parse(localStorage.getItem(MUSIC_KEY) || 'null'); } catch (e) { return null; }
}

window.salvaMusica = function() {
  const input = document.getElementById('web-link-input');
  const m = {
    tab: activeSourceTab,
    trackId: selectedTrackId,
    mp3Start: Number((document.getElementById('segment-start-mp3') || {}).value) || 0,
    url: input ? input.value.trim() : '',
    webOk: !!currentWebMode,
    webStart: Number((document.getElementById('segment-start-web') || {}).value) || 0,
    volume: Number((document.getElementById('drop-volume') || {}).value) || 80
  };
  /* aperta come file locale la pagina puo non avere memoria: non si blocca */
  try { localStorage.setItem(MUSIC_KEY, JSON.stringify(m)); } catch (e) {}
  aggiornaRiassuntoMusica();
};

function nomeMusica() {
  const m = leggiMusica();
  if (!m) return null;
  if (m.tab === 'mp3' && m.trackId) {
    const t = failureTracks.find(x => x.id === m.trackId);
    return t ? t.name : null;
  }
  if (m.tab === 'web' && m.url && m.webOk) {
    return (/spotify/i.test(m.url) ? 'Spotify' : 'YouTube') + ' \u2022 link salvato';
  }
  return null;
}

function aggiornaRiassuntoMusica() {
  const n = nomeMusica();
  const el = document.getElementById('drop-song-name');
  if (el) el.innerText = n || 'Nessuna canzone: suona la tua musica';
  const s = document.getElementById('set-music-name');
  if (s) s.innerText = n || 'Nessuna canzone scelta';
}

/* Ripristino: la traccia locale subito; il link web solo quando serve
   (schermata della canzone o cedimento), mai all apertura dell app o
   della seduta: il lettore YouTube non si scarica prima del tempo. */
window.ripristinaMusica = function(conWeb) {
  const m = leggiMusica();
  if (!m) { aggiornaRiassuntoMusica(); return; }
  const vol = document.getElementById('drop-volume');
  if (vol) { vol.value = m.volume; const l = document.getElementById('drop-volume-label'); if (l) l.innerText = m.volume + '%'; }
  if (m.tab) switchAudioSourceTab(m.tab, true);
  if (m.tab === 'mp3' && m.trackId && selectedTrackId !== m.trackId && failureTracks.some(t => t.id === m.trackId)) {
    selectTrack(m.trackId, true);
    const r = document.getElementById('segment-start-mp3');
    if (r && !r.disabled) { r.value = m.mp3Start; onMp3RangeInput(true); }
  }
  const input = document.getElementById('web-link-input');
  if (input && m.url && !input.value) input.value = m.url;
  if (conWeb && m.tab === 'web' && m.url && m.webOk && (!currentWebMode || !playerWebCaricato())) {
    handleWebLinkSubmit(true);
  }
  musicaRipristinata = true;
  aggiornaRiassuntoMusica();
};

window.clearCedimentoAudio = function() {
  selectedTrackId = null;
  currentWebMode = null;
  const input = document.getElementById('web-link-input');
  if (input) input.value = '';
  try { localStorage.removeItem(MUSIC_KEY); } catch (e) {}
  liberaPlayerWeb();
  renderFailureTracks();
  aggiornaRiassuntoMusica();
  /* la scelta e fatta: si torna indietro, come ci si aspetta da un pulsante
     di conferma (prima restava sulla schermata e sembrava non succedere nulla) */
  const sheet = document.getElementById('music-sheet');
  if (sheet && !sheet.classList.contains('hidden')) {
    sheet.classList.add('hidden');
    dockStato('nascosto');
    if (currentTab === 'impostazioni') renderSettings();
  }
  showUndo('Nessuna canzone: durante il cedimento continua la tua musica');
};

window.openMusicSheet = function() {
  document.getElementById('music-sheet').classList.remove('hidden');
  ripristinaMusica(true);
  /* finito un cedimento la sorgente e scaricata: per l ascolto di prova si rimette (solo metadati, non suona) */
  const prova = document.getElementById('failure-audio');
  if (prova && selectedTrackUrl && !prova.getAttribute('src')) {
    prova.preload = 'metadata';
    prova.src = selectedTrackUrl;
    try { prova.load(); } catch (e) {}
  }
  dockStato('anteprima');
};
window.closeMusicSheet = function() {
  document.getElementById('music-sheet').classList.add('hidden');
  salvaMusica();
  /* l ascolto di prova finisce qui: il lettore web si scarica, la canzone resta scelta */
  liberaPlayerWeb();
  dockStato('nascosto');
};

window.switchAudioSourceTab = function(tab, silenzioso) {
  activeSourceTab = tab;
  document.querySelectorAll('.source-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.source === tab));
  document.getElementById('source-panel-mp3').classList.toggle('active', tab === 'mp3');
  document.getElementById('source-panel-web').classList.toggle('active', tab === 'web');
  if (!silenzioso) salvaMusica();
};

function getResolvedAudioMode() {
  if (activeSourceTab === 'mp3') return selectedTrackId ? 'mp3' : null;
  if (activeSourceTab === 'web') return currentWebMode;
  return null;
}
/* La canzone scelta per il cedimento ('mp3' | 'youtube' | 'spotify' | null),
   anche se il lettore web non e ancora stato caricato: viene dal salvataggio.
   null = nessuna canzone, e allora il cedimento non tocca l audio. */
function modoCanzone() {
  const m = getResolvedAudioMode();
  if (m) return m;
  if (activeSourceTab !== 'web') return null;
  const sal = leggiMusica();
  const p = sal && sal.tab === 'web' && sal.webOk ? parseWebAudioUrl(sal.url || '') : null;
  return p ? p.type : null;
}
