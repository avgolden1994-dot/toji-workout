/* Utility
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   UTILITY
   ============================================================ */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function formatMMSS(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
function formatNow() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()} ore ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}
function handleSelectExercise(val) {
  if (val) document.getElementById('exercise-name').value = val;
}
/* Un SOLO contesto audio per tutta l'app.
   Prima se ne creava uno nuovo a ogni bip: i browser ne consentono pochi
   contemporaneamente (Chrome circa sei) e dopo qualche timer il suono
   spariva del tutto. In piu sul telefono il contesto nasce "sospeso" e va
   risvegliato da un gesto dell'utente, altrimenti resta muto per sempre. */
let audioCtx = null;

function getAudioCtx() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended' && audioCtx.resume) audioCtx.resume();
    return audioCtx;
  } catch (e) { return null; }
}
