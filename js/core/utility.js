/* Utility
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   UTILITY
   ============================================================ */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
/* Sicurezza dei testi che arrivano da fuori (backup, CSV, testo incollato).
   nomeSicuro: toglie i caratteri che servono a iniettare codice nell HTML. */
function nomeSicuro(n) {
  return String(n == null ? '' : n).replace(/[<>"`\\\u0000-\u001f\u007f]/g, '').trim().slice(0, 120);
}
/* pulisciDeep: applica nomeSicuro-leggero (via < e >) a ogni testo di un dato JSON */
function pulisciDeep(v, prof) {
  if ((prof || 0) > 12) return null;
  if (typeof v === 'string') return v.replace(/[<>]/g, '');
  if (Array.isArray(v)) return v.map(x => pulisciDeep(x, (prof || 0) + 1));
  if (v && typeof v === 'object') {
    const o = {};
    Object.keys(v).forEach(k => { if (k !== '__proto__' && k !== 'constructor' && k !== 'prototype') o[k.replace(/[<>]/g, '')] = pulisciDeep(v[k], (prof || 0) + 1); });
    return o;
  }
  return v;
}
/* jsArg: un testo da mettere tra apici dentro un onclick="..." (prima si protegge per JS, poi per HTML) */
function jsArg(s) { return escapeHtml(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/[\u0000-\u001f]/g, ' ')); }
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
