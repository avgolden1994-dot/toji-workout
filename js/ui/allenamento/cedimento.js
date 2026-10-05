/* Modulo cedimento (drop set)
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   LA FINESTRA DEL CEDIMENTO E L AUDIO DELLE ALTRE APP
   Il difetto: la card del Cedimento stava sempre in pagina e l app
   teneva occupato l audio per tutta la seduta, bloccando la musica
   che stavi ascoltando (anche in un altra app).
   Ora:
   - la finestra (#cedimento-sheet) e nascosta; compare solo quando tocchi
     la fiamma di una serie, parte subito il timer di 90 secondi, e alla
     fine si chiude da sola dopo l animazione (o con Stop);
   - se NON hai scelto una canzone non suona niente e l audio delle altre
     app non viene toccato;
   - se hai scelto una canzone (MP3, YouTube, Spotify) puo interrompere la
     musica delle altre app, ma solo per quei 90 secondi: poi tutto viene
     rilasciato (pausa, sorgente scaricata, lettore web fermato e rimosso,
     traccia silenziosa spenta, sessione audio di nuovo "ambient") perche
     l altra app possa ripartire. Se la ripresa avvenga dipende dal sistema.
   Per la canzone si usa il tipo "transient-solo": suona da solo e, quando
   finisce, fa RIPRENDERE l audio messo in pausa; dove il browser non lo
   conosce si ricade su "playback".
   ============================================================ */
function sessioneCanzoneAttiva() {
  tipoSessione('transient-solo');
  try {
    if ('audioSession' in navigator && navigator.audioSession.type !== 'transient-solo') tipoSessione('playback');
  } catch (e) {}
}
/* anche l ascolto di prova nella schermata della canzone restituisce
   l audio quando lo fermi */
(function() {
  const a = document.getElementById('failure-audio');
  if (!a) return;
  a.addEventListener('play', () => { if (!dropActive) sessioneCanzoneAttiva(); });
  a.addEventListener('pause', () => { if (!dropActive) tipoSessione('ambient'); });
  a.addEventListener('ended', () => { if (!dropActive) tipoSessione('ambient'); });
})();

let dropEndAt = 0;
let dropChiudiTimer = null;   /* la finestra si chiude da sola poco dopo "Cedimento raggiunto" */
const DROP_CHIUSURA_MS = 1500;

/* Il lettore web si crea solo qui, dentro il tocco sulla fiamma */
function caricaPlayerWebSalvato() {
  const input = document.getElementById('web-link-input');
  const m = leggiMusica();
  if (input && m && m.url && !parseWebAudioUrl(input.value.trim())) input.value = m.url;
  handleWebLinkSubmit(true);
}

/* YouTube/Spotify pronto: si parte dal punto scelto. Su iPhone la
   piattaforma puo rifiutare: allora il lettore chiede un solo tocco. */
function avviaWebPronto() {
  if (!dropActive) return;
  const vol = Number(document.getElementById('drop-volume').value);
  const start = inizioSegmento();
  if (currentWebMode === 'youtube' && ytPlayerReady) {
    try { ytPlayer.seekTo(start, true); ytPlayer.setVolume(vol); ytPlayer.playVideo(); } catch (e) {}
  } else if (currentWebMode === 'spotify' && spotifyController) {
    try { spotifyController.seek(start); spotifyController.resume(); } catch (e) {}
  }
  controllaAvvioMusica();
}

function startDropAudio() {
  const mode = modoCanzone();
  /* nessuna canzone scelta: l app non suona e non tocca l audio, la tua
     musica (Spotify, Apple Music...) continua senza interruzioni */
  if (!mode) return;
  dropAudioAttivo = true;
  sessioneCanzoneAttiva();
  avviaCanaleMultimediale();   /* solo con "Suona anche in silenzioso" acceso, e solo per questi 90 secondi */
  const vol = Number(document.getElementById('drop-volume').value);
  if (mode === 'mp3') {
    const audio = document.getElementById('failure-audio');
    const start = Number(document.getElementById('segment-start-mp3').value) || 0;
    try {
      if (!audio.getAttribute('src') && selectedTrackUrl) audio.src = selectedTrackUrl;
      audio.currentTime = start;
      audio.volume = vol / 100;
      const p = audio.play();   /* dentro il tocco: parte anche su iPhone */
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {}
  } else {
    const pronto = mode === 'youtube' ? ytPlayerReady : spotifyReady;
    if (!pronto) {
      if (!playerWebCaricato()) caricaPlayerWebSalvato();
      dockStato('sessione');
      controllaAvvioMusica();   /* partira appena il lettore e pronto; intanto, se serve, chiede il tocco */
    } else {
      dockStato('sessione');
      avviaWebPronto();
    }
  }
}

/* Rilascia tutto cio che il cedimento ha acceso, perche l audio delle altre
   app possa ripartire. Non fa nulla se il cedimento non ha acceso audio. */
function rilasciaAudioCedimento() {
  clearTimeout(attesaAvvio);
  if (!dropAudioAttivo) return;
  dropAudioAttivo = false;
  sospendiAudioCtx();           /* il contesto dei bip, se esiste, non resta acceso */
  const audio = document.getElementById('failure-audio');
  if (audio) {
    try { audio.pause(); } catch (e) {}
    /* sorgente tolta e caricamento a vuoto: una semplice pausa lascerebbe il
       lettore "proprietario" dell audio (la schermata della canzone la rimette) */
    try { audio.removeAttribute('src'); audio.load(); } catch (e) {}
  }
  liberaPlayerWeb();            /* YouTube/Spotify: fermato e rimosso, non solo in pausa */
  fermaCanaleMultimediale();    /* traccia silenziosa spenta e scaricata, sessione "ambient" */
  tipoSessione('ambient');
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

window.apriCedimento = function(exIdx, setIdx) {
  if (dropInterval) return;                 /* e gia in corso: un secondo tocco non lo riavvia */
  if (dropChiudiTimer) chiudiCedimento();   /* ancora in chiusura: si finisce di pulire prima */
  const data = loadData();
  const ex = (data[currentDay] || [])[exIdx];
  const set = ex && ex.completedSets[setIdx];
  if (!set) return;
  armedSet = { exIdx, setIdx };
  dropRemaining = FAILURE_SET_SECONDS;
  dropActive = true;
  set.wasBerserk = true;
  saveData(data);

  const sheet = document.getElementById('cedimento-sheet');
  sheet.classList.remove('hidden', 'finito');
  document.getElementById('cedimento-body').scrollTop = 0;
  document.getElementById('cedimento-sub').innerText = `${ex.name} — Serie ${setIdx + 1}`;
  document.getElementById('drop-status').innerText = `Cedimento in corso: ${ex.name} — Serie ${setIdx + 1} 🔥`;
  aggiornaRiassuntoMusica();
  updateDropTimerDisplay();
  updateFireModeState();

  /* anche il cedimento conta sull orologio: minimizzando l app non si ferma */
  dropEndAt = Date.now() + FAILURE_SET_SECONDS * 1000;
  dropInterval = setInterval(tickCedimento, 250);
  /* l audio parte QUI, dentro il tocco sulla fiamma: e l unico modo per far
     partire subito un MP3 (e, dove la piattaforma lo permette, YouTube) */
  try { startDropAudio(); } catch (e) {}
  renderAllenamento();
};

function tickCedimento() {
  const r = Math.max(0, Math.ceil((dropEndAt - Date.now()) / 1000));
  if (r !== dropRemaining) {
    dropRemaining = r;
    updateDropTimerDisplay();
  }
  if (r <= 0 && dropInterval) finishDropSet();
}

/* Tempo scaduto: niente bip (non deve disturbare l audio degli altri),
   solo vibrazione e animazione; la finestra si chiude da sola. */
function finishDropSet() {
  clearInterval(dropInterval);
  dropInterval = null;
  dropActive = false;
  rilasciaAudioCedimento();
  if (navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (e) {} }
  document.getElementById('drop-status').innerText = 'Cedimento raggiunto! 💥';
  document.getElementById('cedimento-sheet').classList.add('finito');
  updateFireModeState();
  clearTimeout(dropChiudiTimer);
  dropChiudiTimer = setTimeout(chiudiCedimento, DROP_CHIUSURA_MS);
}

/* Chiude la finestra e pulisce tutto: vale per la fine, per Stop e per
   quando si esce dalla seduta. Si puo chiamare sempre: se il cedimento non
   e aperto non tocca niente (in particolare non tocca l audio). */
function chiudiCedimento() {
  const sheet = document.getElementById('cedimento-sheet');
  const eraAperto = !!(dropInterval || dropChiudiTimer || dropActive || armedSet || (sheet && !sheet.classList.contains('hidden')));
  clearInterval(dropInterval);
  dropInterval = null;
  clearTimeout(dropChiudiTimer);
  dropChiudiTimer = null;
  dropActive = false;
  armedSet = null;
  dropRemaining = FAILURE_SET_SECONDS;
  rilasciaAudioCedimento();
  if (sheet) sheet.classList.add('hidden');
  if (sheet) sheet.classList.remove('finito');
  updateDropTimerDisplay();
  const statusEl = document.getElementById('drop-status');
  if (statusEl) statusEl.innerText = '';
  updateFireModeState();
  if (!eraAperto) return;
  dockStato('nascosto');
  const sessione = document.getElementById('workout-session');
  if (sessione && sessione.style.display !== 'none') renderAllenamento();
}
window.stopDropSet = chiudiCedimento;
