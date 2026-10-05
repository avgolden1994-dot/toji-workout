/* Impostazioni
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   IMPOSTAZIONI
   ============================================================ */
/* THEME_KEY ('tz_theme') sta in js/core/tema-iniziale.js: serve gia in <head> */
const SOUND_KEY = 'tz_sound';               /* suoni del timer */
const COUNTDOWN_KEY = 'tz_countdown';       /* bip negli ultimi 5 secondi */
const AUTOCLOSE_KEY = 'tz_autoclose';       /* chiusura automatica del timer */
const BYPASS_KEY = 'tz_bypass_silent';      /* suona anche col telefono zittito */
const FLASH_KEY = 'tz_flash';               /* lampeggio dello schermo */

window.getSetting = function(k, def) {
  const v = localStorage.getItem(k);
  return v === null ? def : v;
};
window.setSetting = function(k, v) { localStorage.setItem(k, String(v)); };
window.isOn = function(k, def) { return getSetting(k, def ? '1' : '0') === '1'; };

window.applyTheme = function() {
  /* scelta salvata e, in 'auto', tema del sistema: la stessa funzione che in
     <head> lo applica prima del primo disegno (js/core/tema-iniziale.js) */
  const tema = temaRisolto();
  /* Lo sfondo della pagina lo disegna <html>, non <body>: applicando il
     tema al solo body, fuori dall area occupata dal contenuto restava il
     fondo scuro di partenza. Va messo su entrambi. */
  document.body.dataset.theme = tema;
  document.documentElement.dataset.theme = tema;
  const meta = document.getElementById('theme-color-meta');
  /* barra del browser: nel chiaro e lo stesso colore di --bg (css/base.css) */
  if (meta) meta.setAttribute('content', tema === 'light' ? '#f6f5f3' : '#08080a');
};

window.setTheme = function(v) {
  setSetting(THEME_KEY, v);
  applyTheme();
  renderSettings();
};

/* In automatico il tema segue anche i cambi del sistema ad app aperta (prima
   si leggeva una volta sola, all avvio). Con la dissolvenza di body, come
   quando si cambia da Opzioni. */
try {
  const sistemaChiaro = window.matchMedia('(prefers-color-scheme: light)');
  const segui = () => { if (getSetting(THEME_KEY, 'dark') === 'auto') applyTheme(); };
  if (sistemaChiaro.addEventListener) sistemaChiaro.addEventListener('change', segui);
  else if (sistemaChiaro.addListener) sistemaChiaro.addListener(segui);   /* Safari prima della 14 */
} catch (e) {}

/* Zoom con le dita: spento di default (l app resta ferma come un app vera), acceso da Opzioni > Aspetto */
const ZOOM_KEY = 'tz_zoom';
window.applicaZoom = function() {
  const m = document.querySelector('meta[name="viewport"]');
  if (!m) return;
  m.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover' +
    (isOn(ZOOM_KEY, false) ? '' : ', maximum-scale=1.0, user-scalable=no'));
};
try { applicaZoom(); } catch (e) {}

window.openSettings = function() { switchTab('impostazioni'); };
window.closeSettings = function() { switchTab('piano'); };

window.toggleSetting = function(k, def) {
  setSetting(k, isOn(k, def) ? '0' : '1');
  if (k === DISCHI_KEY) renderAllenamento();
  if (k === ZOOM_KEY) applicaZoom();
  if (k === WAKE_KEY) tieniSchermoAcceso(sedutaAperta());
  renderSettings();
};

function toggleHtml(k, def, nome, desc) {
  const on = isOn(k, def);
  return '<button class="set-toggle" onclick="toggleSetting(\'' + k + '\', ' + (def ? 'true' : 'false') + ')">' +
    '<span class="set-toggle-main"><span class="set-toggle-name">' + nome + '</span>' +
    '<span class="set-toggle-desc">' + desc + '</span></span>' +
    '<span class="switch ' + (on ? 'on' : '') + '"></span></button>';
}
