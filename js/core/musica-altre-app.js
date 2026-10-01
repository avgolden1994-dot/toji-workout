/* Convivenza con la musica delle altre app
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONVIVENZA CON LA MUSICA DELLE ALTRE APP
   Il difetto: la traccia silenziosa per suonare col telefono zittito
   partiva al primo tocco e restava attiva. Su iPhone un audio che gira
   come "lettore musicale" prende il controllo esclusivo, e Spotify o
   Apple Music si fermano. L app non deve mai bloccare la musica.
   La soluzione documentata: dichiarare i nostri suoni come audio
   TRANSITORIO (Safari 16.4+). iOS li mescola alla musica, che continua
   o si abbassa un istante. La traccia silenziosa resta solo come
   opzione esplicita, spenta di default, e avvisa che ferma la musica.
   ============================================================ */
function tipoSessione(tipo) {
  try { if ('audioSession' in navigator) navigator.audioSession.type = tipo; } catch (e) {}
}
/* all avvio i suoni dell app sono transitori: si mescolano */
tipoSessione('transient');

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
  if (mediaKeeper) { try { mediaKeeper.pause(); } catch (e) {} }
  tipoSessione('transient');   /* la musica delle altre app torna libera */
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

function unlockAudio() {
  const ctx = getAudioCtx();
  if (isOn(BYPASS_KEY, false)) avviaCanaleMultimediale();
  if (ctx && ctx.state === 'running') {
    document.removeEventListener('pointerdown', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  }
}
document.addEventListener('pointerdown', unlockAudio);
document.addEventListener('touchstart', unlockAudio);

function playTone(freq, dur, tipo) {
  try {
    tipoSessione(isOn(BYPASS_KEY, false) ? 'playback' : 'transient');
    const ctx = getAudioCtx();
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
  } catch (e) {}
}

function playBeep() { playTone(880, 0.25, 'sawtooth'); }

/* Prova dalle impostazioni: serve anche a sbloccare l audio al primo uso */
window.testSound = function() {
  if (isOn(BYPASS_KEY, false)) avviaCanaleMultimediale();
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
