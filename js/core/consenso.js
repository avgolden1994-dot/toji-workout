/* Consenso ai dati
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONSENSO AI DATI
   Chiesto una volta al primo avvio, salvato, modificabile nelle Opzioni.
   Senza consenso il "coach engine" non parte: niente questionario, niente
   BIA, niente carico progressivo automatico. L app resta usabile a mano.
   ============================================================ */
const CONSENT_KEY = 'tz_consenso';
const CONSENT_VERSION = '1.1';

window.consenso = function() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
};
window.coachAttivo = function() { return consenso() === 'si'; };

window.chiediConsensoSeServe = function() {
  if (consenso() !== null) return false;
  document.getElementById('consent').classList.remove('hidden');
  return true;
};
