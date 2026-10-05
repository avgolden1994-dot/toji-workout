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


/* Un solo aspetto (tema scuro o chiaro, Opzioni > Aspetto). currentMode resta
   l id dello spazio dati ('toji'; 'maki' per chi lo scelse a settembre 2026):
   decide le chiavi di localStorage, non l aspetto. */
function activateMode(mode) {
  currentMode = mode;

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
