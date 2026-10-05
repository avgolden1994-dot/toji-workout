/* Tema prima del primo disegno
   (3in, parte di core; il PRIMO script: sta in <head>, sincrono, prima dei fogli di stile: vedi index.html) */

/* ============================================================
   TEMA PRIMA DEL PRIMO DISEGNO
   All avvio applyTheme (js/ui/opzioni/impostazioni.js) parte da js/avvio.js,
   l ultimo dei ~110 script: fino ad allora <html> non aveva data-theme,
   quindi valevano i token scuri e chi usa il chiaro vedeva prima lo scuro
   e poi la dissolvenza di 0,4 s di body. Qui il tema si decide subito, con
   la stessa funzione che poi usa applyTheme: <html> nasce gia giusto, body
   eredita i token e al primo disegno non c e niente da dissolvere.
   Il fondo di <html> prima dei fogli di stile lo da lo <style> in <head>.
   Limite: i colori di manifest.json (schermata di avvio dell app installata
   su Android) sono fissi e non possono seguire la scelta: restano quelli
   dello scuro, il tema di default (background_color = --bg scuro, theme_color
   = barra dello scuro); chi usa il chiaro li vede solo in quella schermata.
   ============================================================ */
const THEME_KEY = 'tz_theme';               /* 'dark' | 'light' | 'auto' (Opzioni > Aspetto) */

/* Tema da disegnare: la scelta salvata (letta grezza, come getSetting; senza
   scelta 'dark') e, in 'auto', il tema del sistema. localStorage puo lanciare
   (dati bloccati, anteprime): allora vale il default. */
function temaRisolto() {
  let pref = null;
  try { pref = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (pref === null) pref = 'dark';
  if (pref !== 'auto') return pref;
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
  return (mq && mq.matches) ? 'light' : 'dark';
}

/* Subito, prima dei fogli di stile. Il body non esiste ancora: lo segna
   applyTheme all avvio, con lo stesso valore. La barra del browser nel
   chiaro e --bg (come in applyTheme); nello scuro resta quella scritta nel meta. */
try {
  const tema = temaRisolto();
  document.documentElement.dataset.theme = tema;
  const meta = document.getElementById('theme-color-meta');
  if (meta && tema === 'light') meta.setAttribute('content', '#f6f5f3');
} catch (e) {}
