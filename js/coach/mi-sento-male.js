/* Mi sento male in seduta
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   "MI SENTO MALE" IN SEDUTA (Harvard Health, segnali di stop)
   Ferma tutto, dice cosa fare e chiude la seduta come interrotta:
   una seduta interrotta non conta per i carichi.
   ============================================================ */
window.apriMiSentoMale = function() {
  closeRecoveryPanel();
  if (typeof stopDropSet === 'function') stopDropSet();
  document.getElementById('male-sheet').classList.remove('hidden');
};
window.chiudiMiSentoMale = function() { document.getElementById('male-sheet').classList.add('hidden'); };
window.chiudiSedutaInterrotta = function() {
  chiudiMiSentoMale();
  window.__sedutaInterrotta = true;
  endWorkout();
  showUndo('Seduta interrotta: non conta per i carichi. Riposati.');
};

function minutiSeduta() {
  try { const s0 = JSON.parse(localStorage.getItem('tz_seduta_inizio') || 'null'); if (s0 && s0.t) return Math.max(1, Math.round((Date.now() - s0.t) / 60000)); } catch (e) {}
  return null;
}
