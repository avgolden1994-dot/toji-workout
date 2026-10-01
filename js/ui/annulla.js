/* Snackbar con Annulla
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* Snackbar con Annulla: per le cancellazioni frequenti la ricerca preferisce
   l'annulla alla finestra di conferma, che rallenta ogni singola operazione. */
let snackTimer = null;
let lastUndo = null;

window.showUndo = function(message, undoFn, ms, etichetta) {
  const bar = document.getElementById('snackbar');
  clearTimeout(snackTimer); /* una nuova azione sostituisce la precedente */
  const btn = document.getElementById('snackbar-btn');
  document.getElementById('snackbar-text').innerText = window.tr(String(message == null ? '' : message));
  lastUndo = undoFn || null;
  btn.style.display = undoFn ? 'block' : 'none';
  btn.innerText = etichetta || 'Annulla';
  bar.classList.add('show');
  clearTimeout(snackTimer);
  snackTimer = setTimeout(() => { bar.classList.remove('show'); lastUndo = null; }, ms || 5000);
};

window.hideSnackbar = function() {
  clearTimeout(snackTimer);
  document.getElementById('snackbar').classList.remove('show');
  lastUndo = null;
};

document.getElementById('snackbar-btn').addEventListener('click', () => {
  if (lastUndo) { const f = lastUndo; lastUndo = null; f(); }
  hideSnackbar();
});
