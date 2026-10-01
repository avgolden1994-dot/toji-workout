/* Importa i tuoi progressi
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   IMPORTA I TUOI PROGRESSI
   Un file qualsiasi (PDF, testo, CSV, esportazioni di Strong, Hevy,
   FitNotes). Il CSV con intestazioni passa dal lettore gia esistente; il
   resto viene letto riga per riga: una data apre un allenamento, le righe
   sotto sono esercizi ("Panca piana 4x8 60 kg", "Squat 80kg x 5, 5, 5",
   "Rematore 3 serie da 10 con 40 kg"). Prima di salvare si vede cosa e
   stato capito. Un esercizio che la libreria non conosce resta con il
   nome scritto dall utente, come esercizio personalizzato.
   ============================================================ */
const personalizzatiKey = () => 'coach_plus_personalizzati_' + currentMode;
function eserciziPersonalizzati() { return leggiJSON(personalizzatiKey(), '[]') || []; }
function normNome(x) {
  return senzaEmoji(String(x || '')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
let indiceNomiCache = null;
function indiceNomi() {
  if (indiceNomiCache) return indiceNomiCache;
  const idx = {};
  EXERCISE_LIBRARY.forEach(e => {
    const plain = senzaEmoji(e.name).replace(/^\s+/, '');
    idx[normNome(plain)] = e.name;
    ['en', 'es', 'de'].forEach(l => { const t = ((window.I18N || {})[l] || {})[plain]; if (t) idx[normNome(t)] = idx[normNome(t)] || e.name; });
  });
  return (indiceNomiCache = idx);
}
function riconosciEsercizio(nome0) {
  const n = normNome(nome0);
  if (!n) return null;
  const idx = indiceNomi();
  if (idx[n]) return idx[n];
  const est = nomeDaEstero(nome0);
  if (findExercise(est)) return est;
  const parole = n.split(' ').filter(w => w.length > 2);
  if (parole.length >= 2) {
    const cand = Object.keys(idx).filter(k => { const kp = k.split(' '); return parole.every(w => kp.indexOf(w) !== -1); });
    if (cand.length) return cand.map(k => idx[k]).sort((a, b) => (PRIORI[senzaEmoji(b).trim()] || 1) - (PRIORI[senzaEmoji(a).trim()] || 1))[0];
  }
  return null;
}
const MESI_NOMI = { gen: 0, jan: 0, ene: 0, feb: 1, mar: 2, 'mär': 2, apr: 3, abr: 3, mag: 4, may: 4, mai: 4, giu: 5, jun: 5, lug: 6, jul: 6, ago: 7, aug: 7, set: 8, sep: 8, ott: 9, oct: 9, okt: 9, nov: 10, dic: 11, dec: 11, dez: 11 };
function dataInRiga(r) {
  const t = r.trim();
  const oggi = new Date();
  const fixA = (y, m, d) => {
    if (!(m >= 0 && m < 12 && d >= 1 && d <= 31)) return null;
    let a = y ? (y < 100 ? 2000 + y : y) : oggi.getFullYear();
    let dt = new Date(a, m, d, 12);
    if (!y && dt > oggi) dt = new Date(a - 1, m, d, 12);
    return dt;
  };
  let m = t.match(/^(?:[a-zà-ü]{2,12}\.?,?\s+)?(\d{4})-(\d{1,2})-(\d{1,2})\b(.*)$/i);
  if (m) { const d = fixA(+m[1], +m[2] - 1, +m[3]); return d ? { d: d, resto: m[4] } : null; }
  m = t.match(/^(?:[a-zà-ü]{2,12}\.?,?\s+)?(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{2,4}))?(?!\s*[x×*]\s*\d)(?!\d)(.*)$/i);
  if (m) { const d = fixA(m[3] ? +m[3] : 0, +m[2] - 1, +m[1]); return d ? { d: d, resto: m[4] } : null; }
  m = t.match(/^(?:[a-zà-ü]{2,12}\.?,?\s+)?(\d{1,2})\s+([a-zà-ü]{3,10})\.?\s*(\d{4})?\b(.*)$/i);
  if (m) { const mm = MESI_NOMI[m[2].toLowerCase().slice(0, 3)]; if (mm !== undefined) { const d = fixA(m[3] ? +m[3] : 0, mm, +m[1]); return d ? { d: d, resto: m[4] } : null; } }
  return null;
}
function serieInRiga(r) {
  const num = (x) => Number(String(x).replace(',', '.'));
  const lb = /\blbs?\b/i.test(r) ? 0.45359 : 1;
  const kgFix = (w) => Math.round(num(w) * lb * 4) / 4;
  const nome = r.split(/\s[-–:@]\s|\s\d|:\s*\d|\t/)[0].replace(/[•*·\-–:@]+$/, '').trim();
  if (nome.length < 3 || !/[a-zà-ü]{3}/i.test(nome)) return null;
  const resto = r.slice(r.indexOf(nome) + nome.length);
  const sets = [];
  /* "80 kg x 5, 5, 5" */
  let m = resto.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|lbs?)\s*[x×*]\s*(\d+(?:\s*[,/]\s*\d+)+)/i);
  if (m) { m[2].split(/[,/]/).forEach(x => sets.push({ reps: Math.round(num(x)), weight: kgFix(m[1]) })); return { nome: nome, sets: sets }; }
  /* "80x5 80x5 85x3" (peso x ripetizioni, piu serie) */
  const coppie = [...resto.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:kg|lbs?)?\s*[x×*]\s*(\d+)(?!\s*[x×*])/gi)];
  const kgQui = resto.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|lbs?)\b/i);
  /* "4x8 60 kg" / "4 x 8 @ 60" / "3 serie da 10 con 40 kg" */
  m = resto.match(/(\d+)\s*(?:[x×*]|serie da|sets? of|series de|sätze à|saetze a)\s*(\d+)(?:\s*(?:[x×*@]|con|a|with|at|mit|de)?\s*(\d+(?:[.,]\d+)?)\s*(?:kg|lbs?)?)?/i);
  if (coppie.length >= 2 && !(m && coppie.length === 1)) {
    coppie.forEach(c => { const a = num(c[1]), b = Math.round(num(c[2])); sets.push(a >= b || /kg|lb/i.test(c[0]) ? { reps: b, weight: kgFix(c[1]) } : { reps: Math.round(a), weight: kgFix(b) }); });
    return { nome: nome, sets: sets };
  }
  if (m) {
    let n = +m[1], reps = +m[2];
    let w = m[3] ? kgFix(m[3]) : (kgQui ? kgFix(kgQui[1]) : 0);
    if (n > 12 && reps <= 20 && !m[3]) { w = kgFix(n); n = 1; }          /* "100x5": un solo peso */
    for (let i = 0; i < Math.min(n, 12); i++) sets.push({ reps: reps, weight: w });
    return sets.length ? { nome: nome, sets: sets } : null;
  }
  return null;
}
function leggiTestoLibero(testo) {
  const sedute = [];
  let cur = null, capite = 0, nonCapite = [];
  String(testo || '').split(/\r?\n/).map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean).forEach(r => {
    const d = dataInRiga(r);
    if (d) {
      cur = { quando: d.d, titolo: d.resto.replace(/^[\s\-–:·|,]+/, '').trim().slice(0, 40), es: [] };
      sedute.push(cur);
      return;
    }
    const e = serieInRiga(r);
    if (e && cur) {
      const nome = riconosciEsercizio(e.nome) || e.nome;
      let x = cur.es.find(y => y.name === nome);
      if (!x) { x = { name: nome, nome0: e.nome, sets: [], extra: [] }; cur.es.push(x); }
      e.sets.forEach(q => x.sets.push({ reps: q.reps, weight: q.weight, done: true, wasBerserk: false, rpe: null }));
      capite++;
    } else if (cur || e) nonCapite.push(r);
  });
  const valide = sedute.filter(x => x.es.length);
  /* due allenamenti nello stesso giorno: ore diverse, cosi restano distinti */
  const visti = {};
  valide.forEach(x => { const k = ymd(x.quando); visti[k] = (visti[k] || 0) + 1; x.quando = new Date(x.quando.getFullYear(), x.quando.getMonth(), x.quando.getDate(), 11 + visti[k]); });
  const sconosciuti = {};
  valide.forEach(x => x.es.forEach(e => { if (!findExercise(e.name)) sconosciuti[e.name] = e.name; }));
  return { origine: 'Importato', sedute: valide.sort((a, b) => b.quando - a.quando), riconosciuti: {}, sconosciuti: sconosciuti, capite: capite, nonCapite: nonCapite };
}
async function testoDaPdfRighe(file) {
  const pdfjsLib = await ensurePdfJs();
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  let righe = [];
  for (let i = 1; i <= Math.min(pdf.numPages, 40); i++) {
    const tc = await (await pdf.getPage(i)).getTextContent();
    const perY = {};
    tc.items.forEach(it => { const y = Math.round(it.transform[5] / 3); (perY[y] = perY[y] || []).push(it); });
    Object.keys(perY).map(Number).sort((a, b) => b - a).forEach(y => righe.push(perY[y].sort((a, b) => a.transform[4] - b.transform[4]).map(x => x.str).join(' ')));
  }
  return righe.join('\n');
}
function leggiFileProgressi(cb) {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = '.pdf,.txt,.csv,.md,.text,application/pdf,text/plain,text/csv'; inp.style.display = 'none';
  inp.onchange = async () => {
    const f = inp.files && inp.files[0];
    inp.remove();
    if (!f) return;
    try {
      const testo = /\.pdf$/i.test(f.name) || f.type === 'application/pdf' ? await testoDaPdfRighe(f) : await f.text();
      cb(testo, f.name);
    } catch (e) { showUndo('Non riesco a leggere il file. Prova con un PDF o un file di testo.'); }
  };
  document.body.appendChild(inp);
  inp.click();
}
function analizzaProgressi(testo) {
  const primaRiga = String(testo || '').split(/\r?\n/)[0] || '';
  if (/[,;\t]/.test(primaRiga) && /(date|data|datum|fecha|start_time)/i.test(primaRiga) && /(exercise|esercizio)/i.test(primaRiga)) {
    const r = leggiExport(testo);
    if (!r.errore) { r.capite = r.sedute.reduce((t, x) => t + x.es.length, 0); r.nonCapite = []; return r; }
  }
  return leggiTestoLibero(testo);
}
window.importaProgressi = function() { leggiFileProgressi((testo, nome) => mostraAnteprimaImport(analizzaProgressi(testo), nome)); };
function mostraAnteprimaImport(r, nomeFile) {
  const storia = loadHistory();
  const esistenti = {};
  storia.forEach(h => { const d = dataSessione(h); if (d) esistenti[ymd(d) + ' ' + d.getHours()] = 1; });
  const nuove = r.sedute.filter(x => !esistenti[ymd(x.quando) + ' ' + x.quando.getHours()]);
  foglioDati = { r: r, nuove: nuove, progressi: true };
  const fmt = (d) => d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: 'numeric' });
  const nuoviEs = Object.keys(r.sconosciuti || {});
  const ric = {};
  r.sedute.forEach(x => x.es.forEach(e => { if (findExercise(e.name)) ric[e.name] = 1; }));
  const primo = r.sedute[r.sedute.length - 1], ultimo = r.sedute[0];
  apriFoglio('Importa i tuoi progressi',
    (r.sedute.length ? '<div class="res-card"><div class="res-title">Ho trovato</div>' +
      '<div class="res-line"><span>Allenamenti</span><b>' + r.sedute.length + '</b></div>' +
      '<div class="res-line"><span>Nuovi da aggiungere</span><b>' + nuove.length + '</b></div>' +
      (primo ? '<div class="res-line"><span>Periodo</span><b data-no-tr>' + fmt(primo.quando) + ' – ' + fmt(ultimo.quando) + '</b></div>' : '') +
      '<div class="res-line"><span>Esercizi riconosciuti</span><b>' + Object.keys(ric).length + '</b></div>' +
      (nuoviEs.length ? '<div class="res-line"><span>Nuovi esercizi personalizzati</span><b>' + nuoviEs.length + '</b></div>' : '') + '</div>' : '') +
    (nuove.length ? '<div class="res-card"><div class="res-title">Anteprima</div>' + nuove.slice(0, 8).map(x =>
      '<div class="imp-s"><b data-no-tr>' + fmt(x.quando) + '</b>' + (x.titolo ? ' · <span data-no-tr>' + escapeHtml(x.titolo) + '</span>' : '') +
      '<div class="imp-e" data-no-tr>' + x.es.map(e => escapeHtml(trEs(e.name)) + ' ' + e.sets.length + '×' + (e.sets[0] ? e.sets[0].reps : '') + (e.sets[0] && e.sets[0].weight ? ' · ' + String(e.sets[0].weight).replace('.', ',') + ' kg' : '')).join(' · ') + '</div></div>').join('') +
      (nuove.length > 8 ? '<div class="sr-note">' + tr('e altri # allenamenti').replace('#', nuove.length - 8) + '</div>' : '') + '</div>' : '') +
    (nuoviEs.length ? '<div class="res-card"><div class="res-title">Esercizi personalizzati</div><div class="consent-li" data-no-tr>' + escapeHtml(nuoviEs.slice(0, 30).join(', ')) + '</div>' +
      '<div class="sr-note">Restano con il nome che hai scritto: li vedi nello storico e nelle statistiche.</div></div>' : '') +
    ((r.nonCapite || []).length ? '<div class="res-card"><div class="res-title">Righe non capite</div><div class="consent-li" data-no-tr>' + r.nonCapite.slice(0, 8).map(escapeHtml).join('<br>') + '</div>' +
      '<div class="sr-note">Scrivi una data per riga (12/09/2026) e sotto gli esercizi: "Panca piana 4x8 60 kg".</div></div>' : '') +
    (nuove.length ? '<button class="btn-start-workout" onclick="confermaImportProgressi()">Aggiungi allo storico e al calendario</button>'
      : '<div class="sr-note">' + (r.sedute.length ? 'Niente di nuovo da importare.' : 'Non ho trovato allenamenti. Scrivi una data per riga (12/09/2026) e sotto gli esercizi: "Panca piana 4x8 60 kg".') + '</div>'),
    nomeFile);
}
window.confermaImportProgressi = function() {
  if (!foglioDati || !foglioDati.nuove) return;
  const prima = { h: localStorage.getItem(historyKey()), c: localStorage.getItem(calKey()), p: localStorage.getItem(personalizzatiKey()) };
  const nuoveH = foglioDati.nuove.map(x => sedutaImportata(x, foglioDati.r.origine));
  const storia = loadHistory().concat(nuoveH);
  storia.sort((a, b) => (dataSessione(b) || 0) - (dataSessione(a) || 0));
  saveHistory(storia);
  nuoveH.forEach(h => segnaFattoNelCalendario(Object.assign({}, h, { passata: true })));
  const pers = eserciziPersonalizzati();
  Object.keys(foglioDati.r.sconosciuti || {}).forEach(n => { if (pers.indexOf(n) === -1) pers.push(n); });
  localStorage.setItem(personalizzatiKey(), JSON.stringify(pers));
  const n = nuoveH.length;
  foglioDati = null;
  chiudiFoglio();
  if (currentTab === 'storico') renderStorico();
  showUndo(n + ' allenamenti importati', () => {
    const rim = (k, v) => { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); };
    rim(historyKey(), prima.h); rim(calKey(), prima.c); rim(personalizzatiKey(), prima.p);
    if (currentTab === 'storico') renderStorico();
  }, 8000);
};

window.confermaImport = function() {
  if (!foglioDati || !foglioDati.nuove) return;
  const prima = localStorage.getItem(historyKey());
  const storia = loadHistory().concat(foglioDati.nuove.map(s => sedutaImportata(s, foglioDati.r.origine)));
  storia.sort((a, b) => (dataSessione(b) || 0) - (dataSessione(a) || 0));
  saveHistory(storia);
  const n = foglioDati.nuove.length;
  foglioDati = null;
  chiudiFoglio();
  if (currentTab === 'storico') renderStorico();
  showUndo(n + ' allenamenti importati', () => {
    if (prima === null) localStorage.removeItem(historyKey()); else localStorage.setItem(historyKey(), prima);
    if (currentTab === 'storico') renderStorico();
  }, 10000);
};
