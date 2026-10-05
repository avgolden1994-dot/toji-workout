/* Convivenza con la musica delle altre app
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONVIVENZA CON LA MUSICA DELLE ALTRE APP
   Il difetto: l app teneva sempre l audio del telefono occupato (traccia
   silenziosa dal primo tocco, contesto audio sempre acceso, tipo di
   sessione "playback"), e Spotify o Apple Music si fermavano e non
   ripartivano. La regola ora e una sola:
   - FUORI dal cedimento l app non ferma mai l audio degli altri: bip e
     tick del recupero e del cronometro sono audio "ambient" (si mescolano
     alla musica, rispettano l interruttore silenzioso) e il contesto
     audio nasce dentro il tocco che avvia il timer e si sospende subito
     dopo l ultimo bip;
   - DURANTE i 90 secondi del cedimento, e solo se hai scelto una canzone,
     l app puo prendere l audio (vedi cedimento.js). L opzione "Suona anche
     in silenzioso" accende la traccia silenziosa SOLO in quei 90 secondi:
     finiti, la traccia viene fermata e scaricata e l audio torna libero.
   ============================================================ */
function tipoSessione(tipo) {
  try { if ('audioSession' in navigator) navigator.audioSession.type = tipo; } catch (e) {}
}
/* all avvio i suoni dell app si mescolano alla musica: non la interrompono */
tipoSessione('ambient');

/* Traccia silenziosa per suonare col telefono zittito: parte SOLO dal
   cedimento (cedimento.js), mai da un tocco qualunque, e si scarica del tutto. */
function avviaCanaleMultimediale() {
  if (!isOn(BYPASS_KEY, false)) return;
  tipoSessione('playback');
  try {
    if (!mediaKeeper) {
      mediaKeeper = document.createElement('audio');
      mediaKeeper.src = SILENZIO_WAV;
      mediaKeeper.loop = true;
      mediaKeeper.preload = 'auto';
      mediaKeeper.setAttribute('playsinline', '');
      mediaKeeper.setAttribute('x-webkit-airplay', 'deny');
      mediaKeeper.volume = 0.02;   /* non zero: a zero alcuni browser lo ignorano */
      document.body.appendChild(mediaKeeper);
    }
    const p = mediaKeeper.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}

function fermaCanaleMultimediale() {
  if (mediaKeeper) {
    /* pausa, sorgente tolta e elemento rimosso: la musica delle altre app torna libera */
    try { mediaKeeper.pause(); } catch (e) {}
    try { mediaKeeper.removeAttribute('src'); mediaKeeper.load(); } catch (e) {}
    try { if (mediaKeeper.parentNode) mediaKeeper.parentNode.removeChild(mediaKeeper); } catch (e) {}
    mediaKeeper = null;
  }
  tipoSessione('ambient');
}

/* Segnale visivo: lampeggia lo schermo. Questo funziona sempre,
   anche col telefono zittito e anche se l audio viene bloccato. */
window.lampeggia = function(volte) {
  if (!isOn(FLASH_KEY, true)) return;
  const n = volte || 2;
  let i = 0;
  const flash = document.getElementById('screen-flash');
  if (!flash) return;
  const giro = () => {
    if (i >= n) { flash.classList.remove('on'); return; }
    flash.classList.add('on');
    setTimeout(() => { flash.classList.remove('on'); i++; setTimeout(giro, 140); }, 160);
  };
  giro();
};

/* Il contesto audio si crea e si risveglia DENTRO il tocco che avvia un
   timer con suoni (recupero, cronometro di serie, prova): i bip arrivano
   poi senza tocco, ma il telefono li lascia partire perche il contesto e
   gia sbloccato. Subito dopo si sospende: resta acceso solo mentre suona. */
window.preparaAudio = function() {
  if (dropAudioAttivo) return;
  if (!isOn(SOUND_KEY, true) && !isOn(COUNTDOWN_KEY, true)) return;
  tipoSessione('ambient');
  const ctx = getAudioCtx(true);
  if (ctx) sospendiAudioDopo(300);
};
let sospendiAudioT = null;
function sospendiAudioDopo(ms) {
  clearTimeout(sospendiAudioT);
  sospendiAudioT = setTimeout(sospendiAudioCtx, ms);
}

function playTone(freq, dur, tipo) {
  try {
    /* durante il cedimento la sessione e quella della canzone: non si tocca */
    if (!dropAudioAttivo) tipoSessione('ambient');
    const ctx = getAudioCtx();   /* senza contesto sbloccato da un tocco: niente suono, solo lampeggio e vibrazione */
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    /* piccola dissolvenza: il taglio netto fa "clic" e da fastidio */
    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
    sospendiAudioDopo(dur * 1000 + 1300);
  } catch (e) {}
}

function playBeep() { playTone(880, 0.25, 'sawtooth'); }

/* Prova dalle impostazioni: il tocco sblocca il contesto audio, poi si sospende da solo */
window.testSound = function() {
  getAudioCtx(true);
  lampeggia(1);
  playTick();
  setTimeout(() => playTick(), 230);
  setTimeout(() => playEnd(), 540);
};

/* Conto alla rovescia: tre bip brevi e acuti, poi uno lungo e piu grave
   a tempo scaduto, cosi si distingue "sto per finire" da "e finito". */
function playTick() { playTone(1320, 0.07, 'square'); }
function playEnd() { playTone(660, 0.45, 'sawtooth'); }
window.stepValue = function(id, delta, min) {
  const input = document.getElementById(id);
  let val = parseFloat(input.value) || 0;
  val = +(val + delta).toFixed(2);
  if (val < min) val = min;
  input.value = val;
};
