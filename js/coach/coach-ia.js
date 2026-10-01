/* Coach IA
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH IA (v1): la voce del coach.
   Le decisioni sui numeri restano alle regole del coach; l IA commenta e
   spiega. Il server (Worker Cloudflare) tiene nascosta la chiave e conta i
   consulti. Serve un consenso a parte: i dati della seduta escono dal
   telefono: l elenco esatto e in TESTI_IA qui sotto.
   ============================================================ */
const COACH_IA_URL = 'https://coach-allenamento.avgolden1994.workers.dev';
const IA_CONSENT_KEY = 'tz_consenso_ia';
const IA_DEVICE_KEY = 'tz_device_ia';

/* Cosa esce dal telefono, in parole. Deve restare uguale a contestoSeduta()
   e a chiamaCoachIA(): se cambi quelle, cambia anche questo (lo controlla
   tests/struttura.test.js). */
const TESTI_IA = {
  titolo: 'Coach IA',
  invia: 'Per commentare le sedute, l’app invia al server del coach: le serie fatte (esercizi, ripetizioni, carichi, RPE) con quelle della volta precedente, titolo, data e durata della seduta, esercizi saltati, la tua prontezza prima della seduta, i tuoi obiettivi, il livello, la fase e la settimana del programma, la lingua e se è attiva la modalità prudente del questionario di salute (solo il fatto che è attiva, non le risposte).',
  non: 'Non invia: nome, peso, misure e dati BIA, foto, risposte del questionario di salute.',
  codice: 'Invia anche un codice casuale di questo dispositivo, che non è il tuo nome: serve a contare i consulti del mese.',
  spegni: 'Puoi spegnerlo quando vuoi nelle Opzioni.',
  chiedi: 'Attivare?',
  nota: 'Invia le serie della seduta con quelle precedenti, data, durata, prontezza, obiettivi, livello, fase e settimana, lingua, se è attiva la modalità prudente e un codice casuale del dispositivo. Mai nome, BIA, foto o risposte di salute. I numeri li decide sempre il coach delle regole.'
};

window.coachIAAttivo = function() {
  try { return coachAttivo() && localStorage.getItem(IA_CONSENT_KEY) === 'si'; } catch (e) { return false; }
};
window.setCoachIA = function(si) {
  if (si) {
    if (!coachAttivo()) { alert('Prima serve il consenso ai dati del coach.'); return; }
    const ok = confirm([TESTI_IA.titolo, TESTI_IA.invia, TESTI_IA.non, TESTI_IA.codice, TESTI_IA.spegni, TESTI_IA.chiedi].map(t => window.tr(t)).join('\n\n'));
    if (!ok) return;
  }
  try {
    localStorage.setItem(IA_CONSENT_KEY, si ? 'si' : 'no');
    localStorage.setItem(IA_CONSENT_KEY + '_data', formatNow());
  } catch (e) {}
  renderSettings();
};
function htmlPrivacyIA() {
  const on = coachIAAttivo();
  const quando = (function() { try { return localStorage.getItem(IA_CONSENT_KEY + '_data'); } catch (e) { return null; } })();
  const uso = (function() { try { return JSON.parse(localStorage.getItem('tz_ia_uso') || 'null'); } catch (e) { return null; } })();
  return setGroup('Coach IA',
    '<button class="sr-row" onclick="setCoachIA(' + (on ? 'false' : 'true') + ')" role="switch" aria-checked="' + on + '">' + setIco('spark', on ? 'c-accent' : 'c-muted') +
      '<span class="sr-name">Commenti del coach IA' + (on && quando ? '<small>Attivo dal ' + escapeHtml(quando) + '</small>' : '<small>Due righe da allenatore dopo ogni seduta</small>') + '</span>' +
      '<span class="switch ' + (on ? 'on' : '') + '"></span></button>' +
    (on && uso ? '<div class="sr-row sr-static"><span class="sr-name">Consulti questo mese<small>' + uso.usati + ' di ' + uso.limite + '</small></span></div>' : ''),
    TESTI_IA.nota);
}

function deviceIA() {
  try {
    let id = localStorage.getItem(IA_DEVICE_KEY);
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
      localStorage.setItem(IA_DEVICE_KEY, id);
    }
    return id;
  } catch (e) { return 'anonimo-' + Math.random().toString(36).slice(2, 12); }
}

/* serie fatte in forma compatta: "8×60, 8×60, 6×60 (RPE 9)" */
function serieCompatte(sets) {
  const fatte = (sets || []).filter(x => x.done);
  if (!fatte.length) return 'nessuna serie fatta';
  return fatte.map(x => x.reps + '×' + (Number(x.weight) || 0) + (x.rpe ? ' @RPE ' + x.rpe : '') + (x.wasBerserk ? ' (cedimento)' : '')).join(', ');
}
function nomePulito(n) { return (typeof senzaEmojiTesto === 'function' ? senzaEmojiTesto(n) : String(n)).replace(EMOJI_TESTA, ''); }

/* Il contesto che legge l IA: solo dati della seduta e obiettivi */
function contestoSeduta(entry) {
  const righe = [];
  const p = getProfile() || {};
  const goals = p.goals || (p.goal ? [p.goal] : []);
  if (goals.length) righe.push('Obiettivi: ' + goals.join(', '));
  if (p.level) righe.push('Livello: ' + p.level);
  if (p.fase) righe.push('Fase: ' + p.fase);
  if (p.parq) righe.push('Modalità prudente attiva (questionario di salute).');
  try { const st = typeof settimanaProgramma === 'function' ? settimanaProgramma() : null; if (st && !st.finito) righe.push('Programma: settimana ' + st.numero + ' di ' + st.totale); } catch (e) {}
  const d = dataSessione(entry);
  righe.push('Seduta: ' + (entry.titolo || getDayTitle(entry.day)) + (d ? ' del ' + d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }) : '') +
    (entry.minuti ? ', ' + entry.minuti + ' minuti' : '') + (entry.prontezza !== undefined ? ', prontezza ' + entry.prontezza + '/100' : '') +
    (entry.skipped ? ', ' + entry.skipped + ' esercizi saltati' : ''));
  const storia = loadHistory().filter(h0 => h0.id !== entry.id && h0.sessione && (dataSessione(h0) || 0) < (dataSessione(entry) || Infinity));
  (entry.sessione || []).forEach(e => {
    let r = '- ' + nomePulito(e.name) + ': ' + serieCompatte(e.sets);
    if (e.extra && e.extra.length) r += ' + ' + e.extra.map(x => x.tipo + ' ' + x.reps + '×' + x.weight).join(', ');
    const prima = storia.find(h0 => h0.sessione.some(x => x.name === e.name));
    if (prima) {
      const ex = prima.sessione.find(x => x.name === e.name);
      const dp = dataSessione(prima);
      r += ' | volta precedente' + (dp ? ' (' + dp.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }) + ')' : '') + ': ' + serieCompatte(ex.sets);
    } else r += ' | prima volta registrata';
    righe.push(r);
  });
  if (typeof lingua === 'function' && lingua() !== 'it') righe.push('Rispondi nella lingua con codice: ' + lingua());
  return righe.join('\n');
}

/* Chiamata al server: mai eccezioni, sempre un oggetto */
async function chiamaCoachIA(tipo, contesto, messaggio) {
  if (!navigator.onLine) return { errore: 'offline', testo: 'Sei offline: il coach IA risponde quando torna la connessione.' };
  const ctrl = ('AbortController' in window) ? new AbortController() : null;
  const t = ctrl ? setTimeout(() => ctrl.abort(), 25000) : null;
  try {
    const r = await fetch(COACH_IA_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: tipo, device: deviceIA(), contesto: contesto, messaggio: messaggio || undefined }),
      signal: ctrl ? ctrl.signal : undefined
    });
    const j = await r.json().catch(() => ({ errore: 'formato', testo: 'Risposta non leggibile.' }));
    if (j && j.limite !== undefined && j.usati !== undefined) { try { localStorage.setItem('tz_ia_uso', JSON.stringify({ usati: j.usati, limite: j.limite, mese: ymd(new Date()).slice(0, 7) })); } catch (e) {} }
    if (!r.ok && !j.errore) j.errore = 'http' + r.status;
    return j;
  } catch (e) {
    return { errore: 'rete', testo: 'Il coach IA non risponde ora. Riprova più tardi.' };
  } finally { if (t) clearTimeout(t); }
}

const iaInCorso = {};
window.iaErrore = {};
window.commentaSeduta = async function(id, silenzioso) {
  if (!id || iaInCorso[id] || !coachIAAttivo()) return;
  const entry = loadHistory().find(h0 => h0.id === id);
  if (!entry || !entry.sessione || !entry.sessione.length) return;
  iaInCorso[id] = true;
  aggiornaBoxIA(id);
  const res = await chiamaCoachIA('commento', contestoSeduta(entry));
  delete iaInCorso[id];
  const hist = loadHistory();
  const h0 = hist.find(x => x.id === id);
  if (h0 && !res.errore && res.testo) {
    h0.commentoIA = { testo: res.testo, data: formatNow() };
    saveHistory(hist);
    if (silenzioso && !document.getElementById('ia-box')) {
      showUndo('Il coach ha commentato la seduta', () => { const i = loadHistory().findIndex(x => x.id === id); if (i >= 0) openHistoryDetail(i); }, 8000, 'Leggi');
    }
  } else if (!silenzioso) {
    window.iaErrore[id] = res.testo || 'Il coach IA non ha risposto.';
  }
  aggiornaBoxIA(id);
};
function aggiornaBoxIA(id) {
  const box = document.getElementById('ia-box');
  if (box && box.dataset.id === String(id)) box.innerHTML = htmlCommentoIA(id, true);
}
window.htmlCommentoIA = function(id, interno) {
  if (!id) return '';
  const entry = loadHistory().find(h0 => h0.id === id);
  if (!entry) return '';
  if (!interno) setTimeout(() => { const b = document.getElementById('ia-box'); if (b) b.dataset.id = String(id); }, 0);
  const testa = '<div class="ia-head">' + setIco('spark', 'c-accent').replace('sr-ico', 'ia-ico') + '<span>Il coach</span></div>';
  if (entry.commentoIA) {
    return '<div class="ia-card">' + testa + '<div class="ia-text">' + escapeHtml(entry.commentoIA.testo) + '</div>' +
      '<div class="ia-meta">Commento dell’IA: i numeri li decide il coach delle regole.</div></div>';
  }
  if (!coachIAAttivo() || !entry.sessione || !entry.sessione.length) return '';
  if (iaInCorso[id]) return '<div class="ia-card">' + testa + '<div class="ia-text ia-meta">Il coach sta leggendo la seduta…</div></div>';
  const err = window.iaErrore[id];
  return '<div class="ia-card">' + testa + (err ? '<div class="ia-meta">' + escapeHtml(err) + '</div>' : '') +
    '<button class="ia-btn" onclick="delete window.iaErrore[' + id + ']; commentaSeduta(' + id + ', false)">Chiedi il commento al coach</button></div>';
};

/* dalla sezione Allenamenti completati */
window.openHistoryDetail = function(i) {
  const x = loadHistory()[i];
  if (!x) return;
  const fatte = x.exercises.reduce((a, e) => a + e.doneSets, 0);
  const tot = x.exercises.reduce((a, e) => a + e.totalSets, 0);
  mostraSessione({
    title: getDayTitle(x.day), day: x.day, doneAt: x.date,
    summary: fatte + ' di ' + tot + ' serie' + (x.berserk ? ' \u2022 con cedimento' : ''),
    sessione: x.sessione || null, esercizi: x.exercises, id: x.id
  });
};

window.closeDoneView = function() {
  document.getElementById('done-view-sheet').classList.add('hidden');
};
