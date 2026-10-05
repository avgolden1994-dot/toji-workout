/* Lettore musicale sempre raggiungibile
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   LETTORE MUSICALE DEL CEDIMENTO (iPhone)
   Il lettore YouTube/Spotify compare solo dentro la finestra del
   cedimento, e solo se la canzone scelta e un link web: all apertura
   della seduta non si carica niente.
   Su iPhone Safari NON passa il tuo tocco dall app al riquadro di
   YouTube: un video incorporato parte con l audio solo dopo un tocco
   DENTRO il video. E una regola di Apple, non aggirabile. Quindi:
   - dove la piattaforma lo permette (Android, desktop) la musica parte
     da sola nel tocco sulla fiamma e il lettore resta una barra sottile;
   - su iPhone, finche non c e stato quel tocco, il riquadro si apre
     nella finestra con scritto "tocca ▶": un tocco solo.
   Finito il cedimento il lettore viene fermato e scaricato del tutto.
   ============================================================ */
let IS_IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let ytSbloccato = false;       /* l utente ha toccato il video almeno una volta */
let dockStatoAttuale = 'nascosto';
let attesaAvvio = null;

function inizioSegmento() {
  /* con la durata nota vale il cursore; mentre il lettore si carica, il punto salvato */
  if (webDuration > 0) return Number((document.getElementById('segment-start-web') || {}).value) || 0;
  const m = typeof leggiMusica === 'function' ? leggiMusica() : null;
  return m && m.tab === 'web' ? Number(m.webStart) || 0 : Number((document.getElementById('segment-start-web') || {}).value) || 0;
}

/* Il riquadro esiste sempre (mai display:none, cosi il lettore non si
   ricarica) e cambia solo posizione: fuori schermo, anteprima, seduta. */
let dockApertoAMano = false;
let dockChiama = false;

/* Nella finestra del cedimento il lettore si apre solo quando va toccato (su iPhone prima
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

/* Nel cedimento il lettore non galleggia: si appoggia sul posto riservato
   nella finestra (dock-slot). Non viene spostato nel codice della pagina
   (il video si ricaricherebbe e perderebbe lo sblocco): cambia solo la
   sua posizione, fissa sullo schermo, sopra la finestra. */
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
  if (!r.width) { slot.style.height = '0px'; return; }   /* finestra non visibile */
  d.style.top = r.top + 'px';
  d.style.left = r.left + 'px';
  d.style.width = r.width + 'px';
  slot.style.height = d.offsetHeight + 'px';
};
window.addEventListener('resize', () => posizionaDock());
if (window.ResizeObserver) {
  /* se cambia qualcosa sopra (testi, finestra), il posto si sposta e il lettore lo segue */
  const ro = new ResizeObserver(() => posizionaDock());
  ro.observe(document.getElementById('app-root'));
  const fin = document.getElementById('cedimento-sheet');
  if (fin) ro.observe(fin);
}
(function() {
  const corpo = document.getElementById('cedimento-body');
  if (corpo) corpo.addEventListener('scroll', () => posizionaDock(), { passive: true });
})();

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
