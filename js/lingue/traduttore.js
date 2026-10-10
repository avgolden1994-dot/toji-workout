/* Traduttore automatico dell interfaccia (it/en/es/de) */
/* ============================================================
   LINGUE (italiano, inglese, spagnolo, tedesco)
   L app e scritta in italiano. Per le altre lingue un traduttore
   lavora sulla pagina gia disegnata: ogni testo e ogni etichetta
   (placeholder, aria-label, title) si cerca nel dizionario della
   lingua scelta. I numeri non fanno parte della chiave: "4 esercizi"
   e "12 esercizi" usano la stessa voce "# esercizi". Le frasi composte
   (con " • ", " · ", " — ", ": ") si traducono pezzo per pezzo.
   Cosi il codice resta uno solo e ogni schermata nuova si traduce da
   sola, purche le sue frasi siano nel dizionario.
   In italiano il traduttore non parte nemmeno: zero costo.
   ============================================================ */

/* ============================================================
   ICONE A LINEA (niente emoji): stesso tratto della barra in basso.
   ico('fiamma') restituisce un piccolo SVG che eredita colore e
   dimensione del testo intorno.
   ============================================================ */
const ICO_PATHS = {
  fiamma: '<path d="M12 21.5c3.9 0 6.8-2.6 6.8-6.6 0-3.4-2.3-5.8-4.2-8-.4 1.9-1.3 3.2-2.5 3.7.4-2.9-.9-5.6-3.1-7.4.2 2.9-1.4 4.9-2.9 6.6-1.2 1.4-1.9 3-1.9 5.1 0 4 2.9 6.6 7.8 6.6z"/>',
  audio: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
  muto: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/>',
  coppa: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M9 20h6M10 17h4"/>',
  luna: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  nota: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  lista: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h6M9 19h3"/>',
  manubrio: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  bilanciere: '<path d="M2 12h20M5 7v10M8 5v14M16 5v14M19 7v10"/>',
  lucchetto: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  documento: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  matita: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  spillo: '<path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
  cestino: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  grafico: '<path d="M4 20V11M10 20V5M16 20v-7M21 20H3"/>',
  sale: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  bandiera: '<path d="M5 21V4M5 4h12l-2.5 4L17 12H5"/>',
  stop: '<path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z"/><path d="M8 12h8"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  palestra: '<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/>',
  corpo: '<circle cx="12" cy="4.5" r="2"/><path d="M5 9l7 1 7-1M12 10v5l-3 6M12 15l3 6"/>',
  livello1: '<path d="M6 20v-4"/><path d="M12 20v-9" opacity=".3"/><path d="M18 20V6" opacity=".3"/>',
  livello2: '<path d="M6 20v-4"/><path d="M12 20v-9"/><path d="M18 20V6" opacity=".3"/>',
  livello3: '<path d="M6 20v-4"/><path d="M12 20v-9"/><path d="M18 20V6"/>',
  viso1: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 10h.01M15 10h.01"/>',
  viso2: '<circle cx="12" cy="12" r="9"/><path d="M9 15h6M9 10h.01M15 10h.01"/>',
  viso3: '<circle cx="12" cy="12" r="9"/><path d="M15.5 16.5a4.5 4.5 0 0 0-7 0M9 10h.01M15 10h.01"/>',
  mescola: '<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  ok: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  catena: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  idea: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>',
  mondo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  disco: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
  salta: '<path d="M5 5l9 7-9 7z"/><path d="M19 5v14"/>',
  bersaglio: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  bilancia: '<path d="M12 4v16M7 20h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',
  cuore: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  cardio: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  scintilla: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  ingranaggio: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  avviso: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/>'
};
function ico(n, cls) {
  return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICO_PATHS[n] || '') + '</svg>';
}
/* ogni emoji rimasta nei testi diventa l icona corrispondente;
   quelle dei gruppi muscolari (davanti ai nomi degli esercizi) spariscono:
   li c e gia la figura anatomica. */
const EMOJI_ICO = {
  '\u{1F525}': 'fiamma', '\u{1F4A5}': 'fiamma', '\u{1F50A}': 'audio', '\u{1F509}': 'audio', '\u{1F507}': 'muto', '\u{1F3C6}': 'coppa',
  '\u{1F634}': 'luna', '\u{1F4A4}': 'luna', '\u{1F3B5}': 'nota', '\u{1F3B6}': 'nota', '\u{1F4CB}': 'lista', '\u{1F3CB}': 'bilanciere',
  '\u{1F512}': 'lucchetto', '\u{1F4C4}': 'documento', '\u{1F4C5}': 'calendario', '\u{1F4C6}': 'calendario', '\u{1F4DD}': 'matita',
  '✏': 'matita', '\u{1F4CC}': 'spillo', '\u{1F5D1}': 'cestino', '\u{1F4CA}': 'grafico', '\u{1F4C8}': 'sale', '\u{1F3C1}': 'bandiera',
  '\u{1F6D1}': 'stop', '\u{1F3E0}': 'casa', '\u{1F3DF}': 'palestra', '\u{1F938}': 'corpo', '\u{1F331}': 'livello1', '\u{1F33F}': 'livello2',
  '\u{1F333}': 'livello3', '\u{1F60C}': 'viso1', '\u{1F610}': 'viso2', '\u{1F62B}': 'viso3', '\u{1F937}': 'mescola', '✅': 'ok',
  '☑': 'ok', '⛓': 'catena', '\u{1F4A1}': 'idea', '⏱': 'timer', '\u{1F310}': 'mondo', '\u{1F4C0}': 'disco', '⏭': 'salta',
  '✨': 'scintilla', '⚖': 'bilancia', '❤': 'cuore', '⚙': 'ingranaggio', '⚠': 'avviso', '\u{1F4AA}': null,
  '\u{1F9B5}': null, '\u{1F3F9}': null, '\u{1F351}': null, '\u{1F6E1}': null, '\u{1F9BE}': null, '\u{1F3AF}': null, '\u{1F9CD}': null
};
const EMOJI_RX = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}✅✨❌❤✊-✍✏⭐⏩-⏳⏸-⏺☑][️‍]*/u;
const EMOJI_RX_G = new RegExp(EMOJI_RX.source, 'gu');
/* toglie solo l emoji davanti (i nomi degli esercizi salvati la portano) */
const EMOJI_TESTA = /^(?:[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}⭐⏩-⏺][️‍]*)+\s*/u;
function senzaEmojiTesto(t) { return String(t).replace(EMOJI_RX_G, '').replace(/[ \t]{2,}/g, ' ').trim(); }

const LINGUA_KEY = 'tz_lingua';
const LINGUE = { it: 'Italiano', en: 'English', es: 'Español', de: 'Deutsch' };
const LOCALI = { it: 'it-IT', en: 'en-GB', es: 'es-ES', de: 'de-DE' };
window.I18N = window.I18N || {};

function linguaIniziale() {
  try { const s = localStorage.getItem(LINGUA_KEY); if (s && LINGUE[s]) return s; } catch (e) {}
  /* primo avvio: la lingua del telefono; se non la parliamo, inglese */
  const nav = String((navigator.languages && navigator.languages[0]) || navigator.language || 'it').slice(0, 2).toLowerCase();
  return LINGUE[nav] ? nav : 'en';
}
let LINGUA = linguaIniziale();
window.lingua = function() { return LINGUA; };
window.LOCALE = function() { return LOCALI[LINGUA] || 'it-IT'; };

const I18N_SEP = [' • ', ' · ', ' — ', ' – ', ' → ', ': ', ' / ', ', '];
function trCore(c, d, prof) {
  if (Object.prototype.hasOwnProperty.call(d, c)) return d[c];
  /* stessa frase con l iniziale maiuscola o minuscola ("Gran dorsale" e "gran dorsale"): basta una voce sola.
     In tedesco i nomi restano sempre maiuscoli, quindi la traduzione non si abbassa mai */
  const c0 = c.charAt(0), alta = c0 !== c0.toLowerCase(), alt = (alta ? c0.toLowerCase() : c0.toUpperCase()) + c.slice(1);
  if (alt !== c && Object.prototype.hasOwnProperty.call(d, alt)) {
    const r = d[alt];
    return alta ? r.charAt(0).toUpperCase() + r.slice(1) : (LINGUA === 'de' ? r : r.charAt(0).toLowerCase() + r.slice(1));
  }
  const nums = [];
  const k = c.replace(/\d+(?:[.,]\d+)*/g, x => { nums.push(x); return '#'; });
  if (nums.length && Object.prototype.hasOwnProperty.call(d, k)) { let i = 0; return d[k].replace(/#/g, () => nums[i++] !== undefined ? nums[i - 1] : '#'); }
  /* simboli davanti o dietro (frecce, spunte, emoji): si tengono */
  const m = c.match(/^([^\p{L}\p{N}(¿¡"“«]+)([\s\S]+)$/u);
  if (m) { const r = trCore(m[2], d, prof); if (r != null) return m[1] + r; }
  const t = c.match(/^([\s\S]+?)(\s*[^\p{L}\p{N})"”».%]+)$/u);
  if (t) { const r = trCore(t[1], d, prof); if (r != null) return r + t[2]; }
  /* B1 (revisione finale dell onda 5): un suffisso tra parentesi che ha la sua voce («... (modalita prudente)», «... (aumento prudente: recupero scarso)») si traduce a parte: il resto
     contiene i separatori (": ", ", ") e spezzato per intero non troverebbe la voce con il suffisso */
  const par = c.match(/^([\s\S]*\S) (\([^()]+\))$/);
  if (par && Object.prototype.hasOwnProperty.call(d, par[2])) { const r = trCore(par[1], d, (prof || 0) + 1); if (r != null) return r + ' ' + d[par[2]]; }
  if ((prof || 0) > 3) return null;
  for (const sep of I18N_SEP) {
    if (c.indexOf(sep) === -1) continue;
    const parti = c.split(sep);
    const tp = parti.map(p => p.trim() ? trCore(p, d, (prof || 0) + 1) : p);
    if (tp.some(x => x != null)) return tp.map((x, i) => x == null ? parti[i] : x).join(sep);
  }
  return null;
}
window.tr = function(s) {
  if (LINGUA === 'it' || s == null) return s;
  s = String(s);
  const d = window.I18N[LINGUA] || {};
  const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const core = m[2];
  if (!core || !/\p{L}/u.test(core)) return s;
  if (core.indexOf('\n') !== -1) return m[1] + core.split('\n').map(r => window.tr(r)).join('\n') + m[3];
  const r = trCore(core.replace(/\s+/g, ' '), d, 0);
  if (r == null) { if (window.__i18nMancanti) window.__i18nMancanti.add(core.replace(/\s+/g, ' ')); return s; }
  return m[1] + r + m[3];
};

/* frase con parti variabili: si traduce lo stampo (%s = nome o data, numeri = #), poi si inseriscono i valori */
window.trP = function(frase) {
  const v = [].slice.call(arguments, 1);
  let i = 0;
  return window.tr(frase).replace(/%s/g, () => { const x = v[i++]; return x === undefined || x === null ? '' : x; });
};
window.trEs = function(n) { return window.tr(senzaEmoji(String(n || '')).replace(/^\s+/, '')); };

const I18N_ATTR = ['placeholder', 'aria-label', 'title'];
const I18N_ORIG = new WeakMap();
/* un testo con emoji: le emoji diventano icone SVG (o spariscono),
   i pezzi di testo intorno si traducono e ricordano il loro italiano */
function emojiInIcone(n, p) {
  const v = n.nodeValue;
  if (/^(OPTION|OPTGROUP|TEXTAREA|TITLE|SELECT)$/.test(p.nodeName) || (p.namespaceURI && p.namespaceURI.indexOf('svg') !== -1)) {
    const it = senzaEmojiTesto(v), t = window.tr(it);
    I18N_ORIG.set(n, { it: it, t: t }); n.nodeValue = t; return;
  }
  const frag = document.createDocumentFragment();
  let resto = v, m;
  const testo = (x) => {
    if (!x) return;
    const tn = document.createTextNode(window.tr(x));
    I18N_ORIG.set(tn, { it: x, t: tn.nodeValue });
    frag.appendChild(tn);
  };
  while ((m = EMOJI_RX.exec(resto))) {
    testo(resto.slice(0, m.index));
    const nome = EMOJI_ICO[m[0].replace(/[\uFE0F\u200D]/g, '')];
    resto = resto.slice(m.index + m[0].length);
    if (nome) { const w = document.createElement('span'); w.className = 'ico-w'; w.setAttribute('data-no-tr', ''); w.innerHTML = ico(nome); frag.appendChild(w); }
    else resto = resto.replace(/^[ \t]+/, '');
  }
  testo(resto);
  p.replaceChild(frag, n);
}
function trTesto(n) {
  const p = n.parentNode;
  if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || (p.closest && p.closest('[data-no-tr]'))) return;
  const v = n.nodeValue;
  if (EMOJI_RX.test(v)) { emojiInIcone(n, p); return; }
  if (LINGUA === 'it') return;
  const o = I18N_ORIG.get(n);
  if (o && v === o.t) return;               /* e gia la nostra traduzione */
  const t = window.tr(v);
  I18N_ORIG.set(n, { it: v, t: t });
  if (t !== v) n.nodeValue = t;
}
function trAttr(el) {
  I18N_ATTR.forEach(a => {
    if (!el.hasAttribute || !el.hasAttribute(a)) return;
    const v = el.getAttribute(a);
    const k = '__i18n_' + a;
    if (el[k] === v) return;
    const t = window.tr(v);
    el[k] = t; el[k + '_it'] = v;
    if (t !== v) el.setAttribute(a, t);
  });
}
function trAlbero(root) {
  if (!root) return;
  if (root.nodeType === 3) { trTesto(root); return; }
  if (root.nodeType !== 1) return;
  if (root.nodeName === 'SCRIPT' || root.nodeName === 'STYLE') return;
  trAttr(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  const testi = [];
  let n;
  while ((n = w.nextNode())) { if (n.nodeType === 3) testi.push(n); else if (LINGUA !== 'it') trAttr(n); }
  testi.forEach(trTesto);
}
window.traduciPagina = function() { trAlbero(document.body); document.title = window.tr(document.title); };

let I18N_ATTIVO = false;
function avviaTraduttore() {
  document.documentElement.lang = LINGUA;
  if (I18N_ATTIVO) return;
  I18N_ATTIVO = true;
  const a0 = window.alert, c0 = window.confirm, p0 = window.prompt;
  const pul = (m) => window.tr(senzaEmojiTesto(m == null ? '' : m));
  window.alert = function(m) { return a0.call(window, pul(m)); };
  window.confirm = function(m) { return c0.call(window, pul(m)); };
  window.prompt = function(m, d) { return p0.call(window, pul(m), d); };
  const via = () => {
    window.traduciPagina();
    new MutationObserver(rec => {
      rec.forEach(r => {
        if (r.type === 'characterData') trTesto(r.target);
        else if (r.type === 'attributes') trAttr(r.target);
        else r.addedNodes.forEach(trAlbero);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: I18N_ATTR });
  };
  if (document.body) via(); else document.addEventListener('DOMContentLoaded', via);
}

/* iniziali dei giorni nel calendario, nella lingua scelta */
const DOW_IT = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
function applicaGiorniSettimana() {
  const box = document.getElementById('mc-dow'); if (!box) return;
  const sp = box.querySelectorAll('span');
  for (let i = 0; i < 7; i++) {
    if (!sp[i + 1]) continue;
    sp[i + 1].textContent = LINGUA === 'it' ? DOW_IT[i] : new Date(2024, 0, 1 + i).toLocaleDateString(LOCALE(), { weekday: 'narrow' });
  }
}

/* ritraduce tutto partendo dall italiano originale di ogni testo */
function ritraduciTutto() {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n;
  while ((n = w.nextNode())) {
    if (n.nodeType === 3) {
      const p = n.parentNode;
      if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || (p.closest && p.closest('[data-no-tr]'))) continue;
      const o = I18N_ORIG.get(n);
      const base = (o && n.nodeValue === o.t) ? o.it : n.nodeValue;
      const t = window.tr(base);
      I18N_ORIG.set(n, { it: base, t: t });
      if (n.nodeValue !== t) n.nodeValue = t;
    } else {
      I18N_ATTR.forEach(a => {
        if (!n.hasAttribute(a)) return;
        const k = '__i18n_' + a, v = n.getAttribute(a);
        const base = (n[k] === v && n[k + '_it'] != null) ? n[k + '_it'] : v;
        const t = window.tr(base);
        n[k] = t; n[k + '_it'] = base;
        if (v !== t) n.setAttribute(a, t);
      });
    }
  }
}

/* cambio lingua sul posto, senza ricaricare: niente schermo nero */
window.setLingua = function(l) {
  if (!LINGUE[l]) return;
  try { localStorage.setItem(LINGUA_KEY, l); } catch (e) {}
  if (l === LINGUA) return;
  const b = document.body;
  const esegui = () => {
    LINGUA = l;
    document.documentElement.lang = l;
    avviaTraduttore();
    ritraduciTutto();
    applicaGiorniSettimana();
    try {
      if (typeof renderSettings === 'function' && currentTab === 'impostazioni') renderSettings();
      if (typeof renderSetPage === 'function') renderSetPage();
    } catch (e) {}
    if (b) b.style.opacity = '1';
  };
  if (b && b.animate && !window.navigator.webdriver) {
    b.style.transition = 'opacity .14s ease';
    b.style.opacity = '0.25';
    setTimeout(esegui, 140);
  } else esegui();
};
