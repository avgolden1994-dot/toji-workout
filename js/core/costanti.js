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

const MODE_META = {
  toji: { quote: '', title: '3in', themeColor: '#08080a' },
  maki: { quote: '', title: '3in', themeColor: '#052e13' }
};

const DEFAULT_MONDAY_PROGRAM = {
  toji: [
    { name: '💪 Panca Piana Bilanciere', sets: 4, reps: 8, weight: 60, rest: 90 },
    { name: '🏹 Trazioni alla Sbarra (Pull-ups)', sets: 4, reps: 8, weight: 0, rest: 90 },
    { name: '🛡️ Military Press', sets: 3, reps: 10, weight: 40, rest: 75 }
  ],
  maki: [
    { name: '🍑 Hip Thrust', sets: 4, reps: 15, weight: 40, rest: 75 },
    { name: '🍑 Affondi Bulgari', sets: 3, reps: 12, weight: 12, rest: 60 }
  ]
};

const FAILURE_SET_SECONDS = 90;
