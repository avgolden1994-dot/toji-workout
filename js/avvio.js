/* Avvio: ultimo file caricato
   (3in, parte di avvio; ordine di caricamento: vedi index.html) */

/* ============================================================
   BOOT
   ============================================================ */
(function boot() {
  const dockPlayer = document.getElementById('dock-player');
  ['youtube-embed-wrap', 'spotify-embed-wrap'].forEach(id => {
    const el = document.getElementById(id);
    if (el && dockPlayer) dockPlayer.appendChild(el);
  });
  buildExerciseSelect();
  applyTheme();
  document.getElementById('recovery-mute-btn').innerText = recoveryMuted ? '🔇' : '🔊';
  /* un solo aspetto: si entra direttamente. Chi aveva gia usato l app
     ritrova i dati della modalita che usava; al primo avvio parte il consenso */
  chooseMode(getStoredMode() || 'toji');
  refreshFailureTracks().catch(() => {
    const c = document.getElementById('track-list');
    if (c) c.innerHTML = '<span class="muted">Il tuo browser non supporta il salvataggio audio locale (IndexedDB).</span>';
  });
})();
