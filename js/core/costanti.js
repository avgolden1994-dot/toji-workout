/* Costanti e stato globale
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   COSTANTI & STATO GLOBALE
   ============================================================ */
const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
let currentDay = DAYS[0];
let currentMode = null;
let currentTab = 'piano';

const MODE_KEY = 'tz_app_mode';

const DEFAULT_MONDAY_PROGRAM = {
  toji: [
    { name: '💪 Panca Piana Bilanciere', sets: 4, reps: 8, weight: 60, rest: 90 },
    { name: '🏹 Trazioni alla Sbarra (Pull-ups)', sets: 4, reps: 8, weight: 0, rest: 90 },
    { name: '🛡️ Military Press', sets: 3, reps: 10, weight: 40, rest: 75 }
  ]
};

const FAILURE_SET_SECONDS = 90;
