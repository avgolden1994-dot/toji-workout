/* Stato condiviso di timer, cedimento e musica
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* Timer di recupero (pannello flottante) */
let recoveryInterval = null;
let recoveryRemaining = 0;
let recoveryTotal = 90;
let recoveryMuted = localStorage.getItem('tz_recovery_muted') === '1';
const RECOVERY_RING_CIRCUMFERENCE = 2 * Math.PI * 52;

/* Modulo Cedimento (Drop) — si apre per singola serie, non per intero esercizio */
let dropInterval = null;
let dropRemaining = FAILURE_SET_SECONDS;
let dropActive = false;
let armedSet = null; /* { exIdx, setIdx } | null: la serie con il cedimento aperto */
let dropAudioAttivo = false; /* vero solo se il cedimento ha davvero acceso audio (canzone scelta) */
let activeSourceTab = 'mp3';
let currentWebMode = null; /* 'youtube' | 'spotify' | null */

/* MP3 locale (IndexedDB) */
const AUDIO_DB_NAME = 'tz_audio_db';
const AUDIO_DB_VERSION = 1;
const AUDIO_STORE = 'tracks';
let failureTracks = [];
let selectedTrackId = null;
let selectedTrackUrl = null;

/* Player web (YouTube / Spotify) */
let ytPlayer = null;
let ytPlayerReady = false;
let spotifyController = null;
let spotifyReady = false;
let webDuration = 0;
