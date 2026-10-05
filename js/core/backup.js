/* Backup e ripristino
   (3in, parte di core; ordine di caricamento: vedi index.html) */


/* ============ 2. BACKUP E RIPRISTINO ============ */
const CHIAVI_APP = /^(coach_plus|tz_)/;
const CHIAVI_TEMPORANEE = /^(tz_seduta_inizio|tz_seduta_speciale|tz_guida_backup)$|_rotto_/;
/* un file di backup non puo dare il consenso al posto dell utente (tz_consenso, con data e versione). Le chiavi del vecchio Coach IA, rimosso
   (tz_consenso_ia, tz_device_ia, tz_ia_uso: vedi CHIAVI_COACH_IA_RIMOSSO in storage.js), possono stare ancora in un backup vecchio:
   non si rimettono, cosi non tornano orfane sul telefono fino al prossimo avvio */
const CHIAVI_NON_RIPRISTINABILI = /^(tz_consenso|tz_consenso_ia|tz_device_ia|tz_ia_uso)/;
/* testi di un backup: via < e > da ogni valore, cosi un file manomesso non puo iniettare codice nelle schermate */
function valorePulito(v) {
  try { const j = JSON.parse(v); if (j && typeof j === 'object') return JSON.stringify(pulisciDeep(j)); } catch (e) {}
  return String(v).replace(/[<>]/g, '');
}
function chiaviApp() {
  const k = [];
  for (let i = 0; i < localStorage.length; i++) { const x = localStorage.key(i); if (CHIAVI_APP.test(x) && !CHIAVI_TEMPORANEE.test(x)) k.push(x); }
  return k;
}
function fotografia() { const d = {}; chiaviApp().forEach(k => { d[k] = localStorage.getItem(k); }); return d; }
window.esportaBackup = function() {
  const b = { app: 'allenamento', formato: 1, versione: APP_VERSIONE, creato: new Date().toISOString(), dati: fotografia() };
  scaricaFile('allenamento-backup-' + ymd(new Date()) + '.json', JSON.stringify(b), 'application/json');
  try { localStorage.setItem('tz_ultimo_backup', ymd(new Date())); } catch (e) {}
  showUndo('Backup creato: tienilo in File, Drive o iCloud');
  if (currentTab === 'impostazioni') renderSettings();
};
function contaAllenamenti(dati) {
  let n = 0;
  Object.keys(dati).forEach(k => { if (/^coach_plus_history/.test(k)) { try { const a = JSON.parse(dati[k]); if (Array.isArray(a)) n += a.length; } catch (e) {} } });
  return n;
}
window.ripristinaBackup = function() {
  scegliFile('.json,application/json', (testo) => {
    let b = null;
    try { b = JSON.parse(testo); } catch (e) {}
    if (!b || !b.dati || typeof b.dati !== 'object') { showUndo('Il file non è un backup di questa app'); return; }
    const chiavi = Object.keys(b.dati).filter(k => CHIAVI_APP.test(k));
    if (!chiavi.length) { showUndo('Il backup è vuoto'); return; }
    foglioDati = b;
    const quando = b.creato ? new Date(b.creato) : null;
    apriFoglio('Ripristina backup',
      '<div class="res-card"><div class="res-title">Nel file</div>' +
        (quando && !isNaN(quando) ? '<div class="res-line"><span>Creato</span><b data-no-tr>' + quando.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long', year: 'numeric' }) + '</b></div>' : '') +
        '<div class="res-line"><span>Allenamenti</span><b>' + contaAllenamenti(b.dati) + '</b></div>' +
        '<div class="res-line"><span>Elementi salvati</span><b>' + chiavi.length + '</b></div></div>' +
      '<div class="res-card"><div class="res-title">Adesso sul telefono</div>' +
        '<div class="res-line"><span>Allenamenti</span><b>' + contaAllenamenti(fotografia()) + '</b></div></div>' +
      '<div class="sr-note">Il backup sostituisce i dati attuali. Subito dopo puoi annullare.</div>' +
      '<button class="btn-start-workout" onclick="confermaRipristino()">Ripristina</button>');
  });
};
function applicaFotografia(d, esatta) {
  if (esatta) chiaviApp().forEach(k => { if (!(k in d)) localStorage.removeItem(k); });
  Object.keys(d).forEach(k => { if (CHIAVI_APP.test(k) && !CHIAVI_TEMPORANEE.test(k) && !CHIAVI_NON_RIPRISTINABILI.test(k) && typeof d[k] === 'string') localStorage.setItem(k, valorePulito(d[k])); });
}
function ricaricaApp() {
  const L = localStorage.getItem(LINGUA_KEY);
  if (L && LINGUE[L] && L !== lingua() && typeof setLingua === 'function') setLingua(L);
  activateMode(localStorage.getItem(MODE_KEY) || currentMode || 'toji');
  applyTheme();
  switchTab('impostazioni');
}
window.confermaRipristino = function() {
  if (!foglioDati) return;
  const prima = fotografia();
  applicaFotografia(foglioDati.dati, false);
  foglioDati = null;
  chiudiFoglio();
  ricaricaApp();
  showUndo('Backup ripristinato', () => { applicaFotografia(prima, true); ricaricaApp(); }, 10000);
};
