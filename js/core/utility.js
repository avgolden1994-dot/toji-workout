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
/* Un numero da mostrare con il segno decimale della lingua scelta (virgola it/es/de, punto en), da `min` a `max` decimali, senza separatore delle migliaia.
   Solo per testi che si mostrano subito: mai da rileggere, salvare o esportare. Il traduttore (tr) riduce ogni numero a # nella chiave del dizionario, quindi le frasi
   con numeri formattati cosi trovano la loro voce in ogni lingua. Mai "-0". */
function numeroLingua(v, max = 1, min = 0) {
  const s = (Number(v) + 0).toLocaleString(LOCALE(), { minimumFractionDigits: min, maximumFractionDigits: max, useGrouping: false });
  return /^-0(?:[.,]0+)?$/.test(s) ? s.slice(1) : s;
}
/* Il campo mostra il nome nella lingua scelta, senza emoji; la chiave italiana (il nome salvato in libreria, con l emoji) resta in data-chiave
   e al salvataggio torna al suo posto (selezione-multipla.js). data-visto = cio che il campo mostrava, per capire se l utente lo ha modificato. */
function handleSelectExercise(val) {
  const inp = document.getElementById('exercise-name');
  if (!inp) return;
  if (val) { inp.value = inp.dataset.visto = trEs(val); inp.dataset.chiave = val; }
  else { delete inp.dataset.chiave; delete inp.dataset.visto; }   /* menu riportato su "Seleziona": il testo scritto resta, ma e solo testo */
}
/* Un SOLO contesto audio per tutta l'app, creato solo quando serve.
   Prima se ne creava uno a ogni bip: i browser ne consentono pochi
   contemporaneamente (Chrome circa sei) e dopo qualche timer il suono
   spariva. In piu un contesto sempre acceso occupa il canale audio del
   telefono: ora nasce SOLO dentro il tocco che avvia un timer con suoni
   (getAudioCtx(true), vedi preparaAudio) e si sospende subito dopo
   l ultimo bip (sospendiAudioCtx). Senza tocco non si crea nulla. */
let audioCtx = null;

function getAudioCtx(crea) {
  try {
    if (!audioCtx) {
      if (!crea) return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended' && audioCtx.resume) { const p = audioCtx.resume(); if (p && p.catch) p.catch(() => {}); }
    return audioCtx;
  } catch (e) { return null; }
}
function sospendiAudioCtx() {
  try {
    if (audioCtx && audioCtx.state !== 'closed' && audioCtx.suspend) { const p = audioCtx.suspend(); if (p && p.catch) p.catch(() => {}); }
  } catch (e) {}
}
