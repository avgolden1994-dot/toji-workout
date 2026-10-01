/* Lettore musicale sempre raggiungibile
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   LETTORE MUSICALE SEMPRE RAGGIUNGIBILE (iPhone)
   Due problemi insieme:
   1. il lettore YouTube/Spotify stava nella schermata delle Opzioni,
      che durante l allenamento e nascosta: non c era niente da toccare;
   2. su iPhone Safari NON passa il tuo tocco dall app al riquadro di
      YouTube: un video incorporato parte con l audio solo dopo un tocco
      DENTRO il video. E una regola di Apple, non aggirabile.
   Soluzione: il lettore vive in un riquadro fisso, piccolo, che resta
   visibile durante la seduta. Su iPhone si tocca ▶ una volta sola:
   l app lo ferma subito e lo porta all inizio dei tuoi 90 secondi.
   Da quel momento il cedimento fa partire la musica da solo.
   ============================================================ */
let IS_IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let ytSbloccato = false;       /* l utente ha toccato il video almeno una volta */
let dockStatoAttuale = 'nascosto';
let attesaAvvio = null;

function inizioSegmento() {
  return Number((document.getElementById('segment-start-web') || {}).value) || 0;
}

/* Il riquadro esiste sempre (mai display:none, cosi il lettore non si
   ricarica) e cambia solo posizione: fuori schermo, anteprima, seduta. */
let dockApertoAMano = false;
let dockChiama = false;

/* In seduta il lettore si apre solo quando va toccato (su iPhone prima
   dello sblocco, o se al cedimento la musica non parte). Il resto del
   tempo e una barra sottile che non copre le serie. Il video resta
   comunque della sua misura piena (almeno 200 px, come chiede YouTube):
   viene solo nascosto alla vista, non rimpicciolito. */
function dockDaAprire() {
  return dockApertoAMano || dockChiama ||
    (IS_IOS && currentWebMode === 'youtube' && !ytSbloccato);
}

window.dockStato = function(stato) {
  const d = document.getElementById('music-dock');
  if (!d) return;
  if (stato === 'sessione' && !currentWebMode) stato = 'nascosto';
  if (stato !== 'sessione') { dockApertoAMano = false; dockChiama = false; }
  dockStatoAttuale = stato;
  const compatto = stato === 'sessione' && !dockDaAprire();
  d.className = 'music-dock ' + stato + (compatto ? ' compatto' : '') + (dockChiama ? ' chiama' : '');
  const caret = document.getElementById('dock-caret');
  if (caret) caret.innerText = compatto ? '\u25B4' : '\u25BE';
  const tit = document.getElementById('dock-title');
  if (tit) tit.innerText = (IS_IOS && currentWebMode === 'youtube' && !ytSbloccato) ? 'Musica: serve un tocco' :
    (ytSbloccato || currentWebMode === 'spotify' || !IS_IOS ? 'Musica pronta' : 'Musica del cedimento');
  aggiornaAvvisoDock();
  posizionaDock();
};

/* In seduta il lettore non galleggia sopra gli esercizi: si appoggia sul
   posto riservato nella card del Cedimento e scorre con la pagina. Non
   viene spostato nel codice della pagina (il video si ricaricherebbe e
   perderebbe lo sblocco): cambia solo la sua posizione. */
window.posizionaDock = function() {
  const d = document.getElementById('music-dock');
  const slot = document.getElementById('dock-slot');
  if (!d || !slot) return;
  if (dockStatoAttuale !== 'sessione') {
    d.style.top = d.style.left = d.style.width = '';
    slot.style.height = '0px';
    return;
  }
  const r = slot.getBoundingClientRect();
  if (!r.width) { slot.style.height = '0px'; return; }   /* card non visibile */
  d.style.top = (r.top + window.scrollY) + 'px';
  d.style.left = (r.left + window.scrollX) + 'px';
  d.style.width = r.width + 'px';
  slot.style.height = d.offsetHeight + 'px';
};
window.addEventListener('resize', () => posizionaDock());
if (window.ResizeObserver) {
  /* se cambia qualcosa sopra (testi, card), il posto si sposta e il lettore lo segue */
  new ResizeObserver(() => posizionaDock()).observe(document.getElementById('app-root'));
}

window.toggleDock = function() {
  if (dockStatoAttuale !== 'sessione') return;
  dockApertoAMano = !dockApertoAMano;
  dockStato('sessione');
};

function aggiornaAvvisoDock(forte) {
  const msg = document.getElementById('dock-msg');
  const d = document.getElementById('music-dock');
  if (!msg || !d) return;
  if (forte && !dockChiama) { dockChiama = true; dockStato(dockStatoAttuale === 'nascosto' ? 'sessione' : dockStatoAttuale); return; }
  let testo = '';
  if (currentWebMode === 'youtube' && IS_IOS && !ytSbloccato) testo = 'Tocca \u25B6 una volta: su iPhone la musica parte solo dopo un tocco sul video';
  if (currentWebMode === 'spotify') testo = 'Se non parte da sola, tocca \u25B6 sul lettore';
  if (dockChiama) testo = 'Tocca \u25B6 sul video per far partire la musica';
  if (currentWebMode === 'youtube' && ytSbloccato && !dockChiama) testo = '';
  msg.innerText = testo;
  msg.style.display = testo ? 'block' : 'none';
}

/* Eventi del lettore YouTube: riconoscono il tocco di sblocco */
window.ytStatoCambiato = function(e) {
  const st = e && e.data;
  if (st !== 1) return;                                 /* 1 = in riproduzione */
  const inCedimento = !!dropInterval;
  if (!inCedimento && !ytSbloccato) {
    /* era il tocco di sblocco: si ferma subito e si prepara al punto giusto */
    ytSbloccato = true;
    try { ytPlayer.pauseVideo(); ytPlayer.seekTo(inizioSegmento(), true); } catch (err) {}
    dockApertoAMano = false;
    dockStato(dockStatoAttuale);
    showUndo('Musica pronta: partira da sola al cedimento');
    return;
  }
  ytSbloccato = true;
  clearTimeout(attesaAvvio);
  dockChiama = false;
  dockStato(dockStatoAttuale);
  /* partito con un tocco manuale durante il cedimento: si porta al punto scelto */
  try {
    if (inCedimento && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() < inizioSegmento() - 1) ytPlayer.seekTo(inizioSegmento(), true);
  } catch (err) {}
};

/* Al cedimento: si prova a partire; se dopo un attimo non suona, si
   chiede il tocco, senza fermare il timer */
function controllaAvvioMusica() {
  clearTimeout(attesaAvvio);
  if (currentWebMode !== 'youtube' && currentWebMode !== 'spotify') return;
  dockStato('sessione');
  attesaAvvio = setTimeout(() => {
    if (!dropInterval) return;
    let suona = false;
    try { suona = currentWebMode === 'youtube' && ytPlayer && [1, 3].indexOf(ytPlayer.getPlayerState()) !== -1; } catch (e) {}
    if (!suona) aggiornaAvvisoDock(true);
  }, 1500);
}
