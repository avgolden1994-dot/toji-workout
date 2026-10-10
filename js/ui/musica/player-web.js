/* Player web (YouTube e Spotify)
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ---- Link Web: YouTube / Spotify ---- */
function parseWebAudioUrl(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return { type: 'youtube', id: yt[1] };
  const sp = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|episode)\/([a-zA-Z0-9]+)/);
  if (sp) return { type: 'spotify', id: sp[2], kind: sp[1] };
  return null;
}

function setWebStatus(text, warning, comeHtml) {
  const el = document.getElementById('web-status');
  /* comeHtml: ogni frase italiana sta in un suo <span> (come syncBuildingLine in piano/giorno.js): il traduttore la segue anche se la lingua cambia mentre la riga e sullo schermo */
  if (comeHtml) el.innerHTML = text; else el.innerText = text;
  el.className = warning ? 'web-warning' : '';
}

/* Abilita/disabilita i controlli del segmento in base alla durata nota.
   Il punto chiave: il massimo dello slider e' durata-90, cosi il pezzo
   scelto ci sta SEMPRE per intero, qualunque sia la lunghezza del brano. */
function configureWebSegment(durationSec) {
  const range = document.getElementById('segment-start-web');
  webDuration = Number(durationSec) || 0;
  const usable = webDuration > FAILURE_SET_SECONDS;
  range.disabled = !usable;
  range.max = usable ? Math.floor(webDuration - FAILURE_SET_SECONDS) : 0;
  /* il punto di partenza scelto si ricorda: prima ogni caricamento lo azzerava */
  const m = typeof leggiMusica === 'function' ? leggiMusica() : null;
  range.value = usable && m && m.tab === 'web' ? Math.max(0, Math.min(Number(range.max), Number(m.webStart) || 0)) : 0;
  document.querySelectorAll('.nudge-btn').forEach(b => { b.disabled = !usable; });
  document.getElementById('web-preview-btn').disabled = !currentWebMode;
  updateWebSegmentLabel();
}

function updateWebSegmentLabel() {
  const start = Number(document.getElementById('segment-start-web').value) || 0;
  const label = document.getElementById('segment-label-web');
  if (!webDuration) {
    label.innerText = 'primi ' + FAILURE_SET_SECONDS + 's';   /* stesso formato di mp3-locale.js */
    return;
  }
  const end = Math.min(start + FAILURE_SET_SECONDS, webDuration);
  label.innerText = formatMMSS(start) + ' \u2192 ' + formatMMSS(end);
}

window.onWebRangeInput = function() { updateWebSegmentLabel(); salvaMusica(); };

window.nudgeWebSegment = function(delta) {
  const range = document.getElementById('segment-start-web');
  if (range.disabled) return;
  const next = Math.max(0, Math.min(Number(range.max), (Number(range.value) || 0) + delta));
  range.value = next;
  updateWebSegmentLabel();
};

/* Anteprima: fa sentire da dove partira' il pezzo, senza avviare la serie */
window.previewWebSegment = function() {
  const start = Number(document.getElementById('segment-start-web').value) || 0;
  if (currentWebMode === 'youtube' && ytPlayerReady) {
    try { ytPlayer.seekTo(start, true); ytPlayer.playVideo(); } catch (e) {}
    setTimeout(() => { try { ytPlayer.pauseVideo(); } catch (e) {} }, 6000);
  } else if (currentWebMode === 'spotify' && spotifyController) {
    try { spotifyController.seek(start); spotifyController.resume(); } catch (e) {}
  } else {
    alert('Carica prima un link e attendi che il player sia pronto.');
  }
};

window.handleWebLinkSubmit = function(silenzioso) {
  const url = document.getElementById('web-link-input').value.trim();
  const parsed = parseWebAudioUrl(url);
  if (!parsed) {
    if (silenzioso === true) return;
    alert('Link non valido. Incolla un link YouTube (youtube.com o youtu.be) oppure Spotify (open.spotify.com/track/...).');
    return;
  }
  if (parsed.type === 'youtube') {
    currentWebMode = 'youtube';
    loadYouTubePlayer(parsed.id);
  } else {
    currentWebMode = 'spotify';
    loadSpotifyPlayer(parsed.id, parsed.kind);
  }
  if (silenzioso !== true) salvaMusica();
};

/* Scarica del tutto il lettore: video fermato (non solo in pausa), iframe
   rimosso. Il link scelto resta salvato; al prossimo cedimento il lettore
   si ricrea. Cosi finito il cedimento nessun lettore tiene occupato l audio. */
let webToken = 0;   /* ogni caricamento ha il suo numero: uno scaricato nel frattempo non ricrea nulla */
window.liberaPlayerWeb = function() {
  webToken++;
  if (ytPlayer) {
    try { ytPlayer.stopVideo(); } catch (e) {}
    try { ytPlayer.destroy(); } catch (e) {}
  }
  ytPlayer = null; ytPlayerReady = false;
  if (spotifyController) {
    try { spotifyController.pause(); } catch (e) {}
    try { if (typeof spotifyController.destroy === 'function') spotifyController.destroy(); } catch (e) {}
  }
  spotifyController = null; spotifyReady = false;
  ['youtube-player-host', 'spotify-player-host'].forEach(id => { const h = document.getElementById(id); if (h) h.innerHTML = ''; });
};
function playerWebCaricato() { return !!(ytPlayer || spotifyController); }

/* ---- YouTube ---- */
function ensureYouTubeApi() {
  return new Promise((resolve, reject) => {
    if (window.YT && window.YT.Player) { resolve(); return; }
    const timeoutMs = window.__TZ_YT_TIMEOUT_MS || 8000;
    const timeout = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    const prevCb = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout);
      if (typeof prevCb === 'function') prevCb();
      resolve();
    };
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = () => { clearTimeout(timeout); reject(new Error('script load error')); };
      document.head.appendChild(tag);
    }
  });
}

const YT_ERRORS = {
  2: 'ID video non valido.',
  5: 'Il video non e riproducibile in questo player.',
  100: 'Video non trovato o rimosso.',
  101: 'Il proprietario ha vietato la riproduzione esterna di questo video.',
  150: 'Il proprietario ha vietato la riproduzione esterna di questo video.'
};

function loadYouTubePlayer(videoId) {
  document.getElementById('spotify-embed-wrap').style.display = 'none';
  document.getElementById('youtube-embed-wrap').style.display = 'block';
  ytPlayerReady = false;
  ytSbloccato = false;   /* ogni lettore nuovo e un video nuovo: su iPhone serve di nuovo il suo tocco */
  configureWebSegment(0);

  /* YouTube rifiuta l'IFrame API da pagine aperte come file locale (file://). */
  if (window.location.protocol === 'file:') {
    setWebStatus('\u26A0\uFE0F YouTube non funziona aprendo il file direttamente dal computer (file://). Serve un hosting, es. GitHub Pages. MP3 locale funziona comunque.', true);
    return;
  }

  setWebStatus('Caricamento player YouTube...', false);

  const tk = ++webToken;
  ensureYouTubeApi().then(() => {
    if (tk !== webToken) return;
    if (ytPlayer && typeof ytPlayer.destroy === 'function') { try { ytPlayer.destroy(); } catch (e) {} }
    /* BUG FIX IMPORTANTE: YT.Player SOSTITUISCE il div con un iframe, e destroy()
       lo rimuove del tutto. Senza ricrearlo, dal secondo video in poi il
       caricamento fallisce in silenzio. Quindi ricreiamo sempre l'elemento. */
    const host = document.getElementById('youtube-player-host');
    host.innerHTML = '<div id="youtube-player-el"></div>';

    ytPlayer = new window.YT.Player('youtube-player-el', {
      width: '100%',
      videoId: videoId,
      playerVars: {
        controls: 1,
        playsinline: 1,        /* su iPhone evita il passaggio forzato a schermo intero */
        rel: 0,
        start: Math.floor(inizioSegmento()),   /* il primo avvio parte gia dal punto scelto */
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          if (tk !== webToken) return;
          ytPlayerReady = true;
          readYouTubeDuration(0);
          if (dropActive) {
            /* il cedimento e gia partito mentre il lettore si caricava: ora suona */
            avviaWebPronto();
          } else {
            /* pronto al punto giusto: un tocco parte gia dal segmento scelto */
            try { ytPlayer.seekTo(inizioSegmento(), true); ytPlayer.pauseVideo(); } catch (err) {}
          }
          aggiornaAvvisoDock();
        },
        onStateChange: (e) => ytStatoCambiato(e),
        onError: (e) => {
          const code = e && e.data;
          setWebStatus('\u274C <span>' + escapeHtml(YT_ERRORS[code] || 'Errore nel caricare il video.') + '</span> <span>Prova un altro video.</span>', true, true);   /* i due pezzi si traducono a parte: la frase intera non ha voce */
        }
      }
    });
  }).catch(() => {
    setWebStatus('Impossibile caricare YouTube. Verifica la connessione internet.', true);
  });
}

/* Subito dopo onReady la durata a volte e' ancora 0: riproviamo qualche volta. */
function readYouTubeDuration(attempt) {
  let dur = 0;
  try { dur = ytPlayer.getDuration ? ytPlayer.getDuration() : 0; } catch (e) {}
  if (dur > 0) {
    configureWebSegment(dur);
    if (dur > FAILURE_SET_SECONDS) {
      setWebStatus('\u2714 <span>Video pronto</span> (' + formatMMSS(dur) + '). <span>Scegli il punto di partenza: verranno riprodotti ' + FAILURE_SET_SECONDS + ' secondi esatti.</span>', false, true);
    } else {
      setWebStatus('\u2714 Video pronto, ma dura meno di 90 secondi: verra riprodotto per intero.', false);
    }
    return;
  }
  if (attempt < 8) {
    setTimeout(() => readYouTubeDuration(attempt + 1), 250);
  } else {
    configureWebSegment(0);
    setWebStatus('Video caricato, ma non riesco a leggerne la durata: verranno riprodotti i primi 90 secondi.', true);
  }
}

/* ---- Spotify (iFrame API) ---- */
function ensureSpotifyApi() {
  return new Promise((resolve, reject) => {
    if (window.__spotifyIFrameApi) { resolve(window.__spotifyIFrameApi); return; }
    const timeoutMs = window.__TZ_SPOTIFY_TIMEOUT_MS || 8000;
    const timeout = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      clearTimeout(timeout);
      window.__spotifyIFrameApi = IFrameAPI;
      resolve(IFrameAPI);
    };
    if (!document.getElementById('spotify-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'spotify-iframe-api-script';
      tag.src = 'https://open.spotify.com/embed/iframe-api/v1';
      tag.async = true;
      tag.onerror = () => { clearTimeout(timeout); reject(new Error('script load error')); };
      document.head.appendChild(tag);
    }
  });
}

function loadSpotifyPlayer(id, kind) {
  document.getElementById('youtube-embed-wrap').style.display = 'none';
  document.getElementById('spotify-embed-wrap').style.display = 'block';
  spotifyReady = false;
  configureWebSegment(0);
  setWebStatus('Caricamento player Spotify...', false);

  const tk = ++webToken;
  ensureSpotifyApi().then((IFrameAPI) => {
    if (tk !== webToken) return;
    const host = document.getElementById('spotify-player-host');
    host.innerHTML = '<div id="spotify-embed-el"></div>';
    const element = document.getElementById('spotify-embed-el');

    IFrameAPI.createController(element, { uri: 'spotify:' + kind + ':' + id, width: '100%', height: 152 }, (EmbedController) => {
      if (tk !== webToken) { try { if (typeof EmbedController.destroy === 'function') EmbedController.destroy(); } catch (e) {} return; }
      spotifyController = EmbedController;
      EmbedController.addListener('ready', () => {
        if (tk !== webToken) return;
        spotifyReady = true;
        /* LIMITE DI SPOTIFY, non dell'app: quando la riproduzione viene avviata
           via codice, Spotify serve un'anteprima di ~30 secondi anche agli utenti
           Premium. I 90 secondi pieni si ottengono solo con MP3 o YouTube. */
        if (dropActive) avviaWebPronto();
        setWebStatus('\u26A0\uFE0F Spotify limita a ~30 secondi la riproduzione avviata da un\'app esterna, anche con Premium. Per i 90 secondi pieni usa un MP3 locale o YouTube. Puoi comunque scegliere il punto di partenza.', true);
      });
      EmbedController.addListener('playback_update', (e) => {
        const ms = e && e.data && e.data.duration;
        if (ms && !webDuration) configureWebSegment(Math.floor(ms / 1000));
      });
    });
  }).catch(() => {
    setWebStatus('Impossibile caricare Spotify. Verifica la connessione internet.', true);
  });
}
