/* Modalita (id interno dei dati)
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   MODALITÀ (id interno dei dati: "toji", da non cambiare)
   ============================================================ */
function getStoredMode() { return localStorage.getItem(MODE_KEY); }

window.chooseMode = function(mode) {
  localStorage.setItem(MODE_KEY, mode);
  activateMode(mode);
  document.getElementById('app-root').style.display = 'flex';
  document.getElementById('bottom-nav').style.display = 'block';
  if (!chiediConsensoSeServe() && coachAttivo()) startOnboarding(false); /* solo al primo utilizzo */
  offriGuida();   /* la guida, una volta sola, quando non c e altro davanti */
};


/* Le modalita Toji e Maki sono state tolte (nomi di personaggi protetti,
   rischiosi in un app a pagamento). Resta un solo aspetto. I dati
   continuano a vivere nello spazio usato finora (currentMode), cosi
   nessuno perde schede o storico con l aggiornamento. */
function activateMode(mode) {
  currentMode = mode;
  document.body.dataset.mode = 'toji';
  document.documentElement.dataset.mode = 'toji';
  if (typeof applyTheme === 'function') applyTheme();

  migrateLegacyDataIfNeeded(mode);
  seedDefaultsIfNeeded(mode);

  currentDay = DAYS[0];
  armedSet = null;
  stopDropSet();
  closeRecoveryPanel();
  renderDayBar();
  renderPiano();
  renderAllenamento();
  switchTab('oggi');
}
