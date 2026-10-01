/* Schermo acceso durante la seduta
   (3in, parte di core; ordine di caricamento: vedi index.html) */


/* ============ 1. SCHERMO ACCESO IN SEDUTA ============ */
const WAKE_KEY = 'tz_schermo_acceso';
let wakeLock = null, wakeVoluto = false;
window.tieniSchermoAcceso = async function(on) {
  wakeVoluto = !!on && isOn(WAKE_KEY, true);
  try {
    if (!wakeVoluto) { if (wakeLock) { const w = wakeLock; wakeLock = null; await w.release(); } return; }
    if (!('wakeLock' in navigator) || wakeLock) return;
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => { wakeLock = null; });
  } catch (e) { wakeLock = null; }
};
/* il telefono lo toglie quando l app va in secondo piano: al rientro si riprende */
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && wakeVoluto) tieniSchermoAcceso(true); });
function sedutaAperta() { const s = document.getElementById('workout-session'); return !!s && s.style.display === 'block'; }
