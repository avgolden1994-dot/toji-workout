/* Modulo cedimento (drop set)
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   LA CANZONE DEL CEDIMENTO E LA MUSICA DELLE ALTRE APP
   Il difetto: dopo aver scelto una canzone, finito il cedimento la
   musica di Spotify o Apple Music non ripartiva. La canzone veniva
   suonata come "playback", che su iPhone ferma le altre app e non le
   fa ripartire. La specifica Audio Session prevede apposta il tipo
   "transient-solo": suona da solo e, quando finisce, fa RIPRENDERE
   l audio messo in pausa. Finito il cedimento l app lascia subito
   la sessione (pausa + tipo transitorio + sorgente scaricata), cosi il
   telefono restituisce l audio alle altre app. Dove il browser non
   conosce "transient-solo" si ricade su "playback", come prima.
   ============================================================ */
function sessioneCanzoneAttiva() {
  tipoSessione('transient-solo');
  try {
    if ('audioSession' in navigator && navigator.audioSession.type !== 'transient-solo') tipoSessione('playback');
  } catch (e) {}
}
function rilasciaSessioneCanzone() {
  if (isOn(BYPASS_KEY, false)) return;   /* l utente ha scelto di tenere il canale aperto */
  tipoSessione('transient');
  const audio = document.getElementById('failure-audio');
  if (audio && audio.getAttribute('src')) {
    /* scaricare e ricaricare la sorgente chiude davvero il lettore:
       una semplice pausa lo lascia "proprietario" dell audio */
    const src = audio.getAttribute('src');
    try { audio.removeAttribute('src'); audio.load(); audio.src = src; audio.preload = 'metadata'; } catch (e) {}
  }
}
/* anche l ascolto di prova nella schermata della canzone restituisce
   l audio quando lo fermi */
(function() {
  const a = document.getElementById('failure-audio');
  if (!a) return;
  a.addEventListener('play', () => { if (!dropActive) sessioneCanzoneAttiva(); });
  a.addEventListener('pause', () => { if (!dropActive) tipoSessione('transient'); });
  a.addEventListener('ended', () => { if (!dropActive) tipoSessione('transient'); });
})();

function startDropAudio() {
  const mode = getResolvedAudioMode();
  /* se hai scelto una canzone nell app, e lei a suonare e prende il
     controllo; se non l hai scelta, l app non tocca l audio e la tua
     musica (Spotify, Apple Music...) continua senza interruzioni */
  if (mode) sessioneCanzoneAttiva();
  const vol = Number(document.getElementById('drop-volume').value);
  if (mode === 'mp3') {
    const audio = document.getElementById('failure-audio');
    const start = Number(document.getElementById('segment-start-mp3').value) || 0;
    try {
      audio.currentTime = start;
      audio.volume = vol / 100;
      const p = audio.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {}
  } else if (mode === 'youtube' && ytPlayerReady) {
    const start = Number(document.getElementById('segment-start-web').value) || 0;
    try {
      ytPlayer.seekTo(start, true);
      ytPlayer.setVolume(vol);
      ytPlayer.playVideo();
    } catch (e) {}
    controllaAvvioMusica();
  } else if (mode === 'spotify' && spotifyController) {
    const start = Number(document.getElementById('segment-start-web').value) || 0;
    try {
      spotifyController.seek(start);
      spotifyController.resume();
    } catch (e) {}
    controllaAvvioMusica();
  }
}
function stopDropAudio() {
  const mode = getResolvedAudioMode();
  if (mode === 'mp3') {
    const audio = document.getElementById('failure-audio');
    if (audio) { try { audio.pause(); } catch (e) {} }
    rilasciaSessioneCanzone();
  } else if (mode === 'youtube' && ytPlayerReady) {
    try { ytPlayer.pauseVideo(); } catch (e) {}
  } else if (mode === 'spotify' && spotifyController) {
    try { spotifyController.pause(); } catch (e) {}
  }
  if (mode !== 'mp3') rilasciaSessioneCanzone();
}

function updateDropTimerDisplay() {
  document.getElementById('drop-timer-display').innerText = formatMMSS(dropRemaining);
}
function updateFireModeState() {
  const vol = Number(document.getElementById('drop-volume').value);
  document.body.classList.toggle('fire-mode', dropActive && vol >= 100);
}

window.onDropVolumeInput = function() {
  const vol = Number(document.getElementById('drop-volume').value);
  salvaMusica();
  document.getElementById('drop-volume-label').innerText = vol + '%';
  const mode = getResolvedAudioMode();
  if (mode === 'mp3') {
    const audio = document.getElementById('failure-audio');
    if (audio) audio.volume = vol / 100;
  } else if (mode === 'youtube' && ytPlayerReady) {
    try { ytPlayer.setVolume(vol); } catch (e) {}
  }
  updateFireModeState();
};

window.startDropSet = function() {
  if (!armedSet) return;
  clearInterval(dropInterval);
  dropRemaining = FAILURE_SET_SECONDS;
  dropActive = true;

  const data = loadData();
  const ex = data[currentDay][armedSet.exIdx];
  const set = ex.completedSets[armedSet.setIdx];
  set.wasBerserk = true;
  saveData(data);

  startDropAudio();
  updateDropTimerDisplay();
  updateFireModeState();
  document.getElementById('drop-status').innerText = `Cedimento in corso: ${ex.name} — Serie ${armedSet.setIdx + 1} 🔥`;
  renderAllenamento();

  /* anche il cedimento conta sull orologio: minimizzando l app non si ferma */
  dropEndAt = Date.now() + FAILURE_SET_SECONDS * 1000;
  dropInterval = setInterval(tickCedimento, 250);
};

let dropEndAt = 0;

function tickCedimento() {
  const r = Math.max(0, Math.ceil((dropEndAt - Date.now()) / 1000));
  if (r !== dropRemaining) {
    dropRemaining = r;
    updateDropTimerDisplay();
  }
  if (r <= 0 && dropInterval) finishDropSet();
}

function finishDropSet() {
  clearInterval(dropInterval);
  dropInterval = null;
  dropActive = false;
  stopDropAudio();
  playBeep();
  if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (e) {} }
  document.getElementById('drop-status').innerText = 'Cedimento raggiunto! 💥';
  updateFireModeState();
}

window.stopDropSet = function() {
  clearInterval(dropInterval);
  dropInterval = null;
  dropActive = false;
  dropRemaining = FAILURE_SET_SECONDS;
  stopDropAudio();
  updateDropTimerDisplay();
  const statusEl = document.getElementById('drop-status');
  if (statusEl) statusEl.innerText = '';
  updateFireModeState();
};
