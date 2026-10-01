/* Cronometro di lavoro e info esercizio
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 6. PER LATO, CORPO LIBERO, A TEMPO ============ */
function infoEsercizio(nome) {
  const p = [];
  if (isTimeBased(nome)) p.push('a tempo: il numero sono secondi');
  if (perLato(nome)) p.push('per lato');
  if (corpoLibero(nome)) p.push('corpo libero: kg = zavorra');
  return p.length ? ' • ' + p.join(' • ') : '';
}

/* ============ 7. TIMER DI LAVORO ============ */
let lavoro = null;
window.fermaLavoro = function() { if (lavoro) clearInterval(lavoro.int); lavoro = null; };
window.avviaLavoro = function(exIdx, setIdx) {
  if (lavoro && lavoro.exIdx === exIdx && lavoro.setIdx === setIdx) { fermaLavoro(); renderAllenamento(); return; }
  fermaLavoro();
  const s = ((loadData()[currentDay][exIdx] || {}).completedSets || [])[setIdx];
  if (!s) return;
  const sec = Math.max(5, Number(s.reps) || 30);
  closeRecoveryPanel();
  const ora = Date.now();
  lavoro = { exIdx: exIdx, setIdx: setIdx, via: ora + 3000, fine: ora + 3000 + sec * 1000, ultimo: null };
  lavoro.int = setInterval(tickLavoro, 200);
  renderAllenamento();
  tickLavoro();
};
function tickLavoro() {
  if (!lavoro) return;
  const b = document.querySelector('[data-lavoro="' + lavoro.exIdx + '-' + lavoro.setIdx + '"]');
  const ora = Date.now();
  const suono = isOn(SOUND_KEY, true) && !recoveryMuted;
  if (ora < lavoro.via) {
    const r = Math.ceil((lavoro.via - ora) / 1000);
    if (b) { b.textContent = r; b.classList.add('pronti'); }
    if (r !== lavoro.ultimo) { lavoro.ultimo = r; if (suono) playTick(); }
    return;
  }
  const r = Math.max(0, Math.ceil((lavoro.fine - ora) / 1000));
  if (b) { b.textContent = r; b.classList.remove('pronti'); }
  if (!lavoro.partito) { lavoro.partito = true; if (suono) playBeep(); }
  if (r !== lavoro.ultimo) { if (r <= 3 && r > 0 && suono) playTick(); lavoro.ultimo = r; }
  if (r <= 0) {
    const l = lavoro;
    fermaLavoro();
    if (suono) playEnd();
    if (navigator.vibrate) { try { navigator.vibrate([200, 90, 200]); } catch (e) {} }
    const s = ((loadData()[currentDay][l.exIdx] || {}).completedSets || [])[l.setIdx];
    if (s && !s.done) toggleSetDone(l.exIdx, l.setIdx); else renderAllenamento();
  }
}
function htmlLavoro(idx, si) {
  const on = lavoro && lavoro.exIdx === idx && lavoro.setIdx === si;
  return '<button class="set-flame-btn work-btn' + (on ? ' on' : '') + '" data-lavoro="' + idx + '-' + si + '" data-no-tr onclick="avviaLavoro(' + idx + ',' + si + ')" aria-label="Avvia il timer della serie">' + ico('timer') + '</button>';
}
