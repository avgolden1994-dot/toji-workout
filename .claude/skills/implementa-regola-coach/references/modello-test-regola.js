/* MODELLO di prova per una regola del coach, in node (vm), senza browser: parte in meno di un secondo.
   Come si usa: copialo in tests/<nome-regola>.test.js, cambia i casi in fondo e AGGIUNGI il file allo script
   "test" di package.json (npm test lancia solo i file elencati li: un file di test nuovo non parte da solo).
   Carica TUTTI gli script dell'app nell'ordine di index.html (tranne js/avvio.js) in un contesto isolato con un
   document finto e un localStorage in memoria: le funzioni globali (caricoProssimo, buildProgram, decisioniCoach...)
   sono quelle vere, con tutti gli strati che le avvolgono (regole-nuove.js, intensita.js).
   Per cio che serve al DOM vero (schermate, tocchi, traduttore sulla pagina) usa invece tests/browser/ (Playwright).
   Verificato su RIC-05 (rientro dopo una pausa). */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');

function carica() {
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => f !== 'js/avvio.js');
  const nulla = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : nulla, apply: () => nulla, construct: () => nulla });
  const store = {};
  const ctx = { console, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {}, document: nulla,
    addEventListener() {}, MutationObserver: class { observe() {} },
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    navigator: { userAgent: 'node', language: 'it' }, location: { href: '', search: '', hash: '' } };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  scripts.forEach(f => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f }));
  store.tz_mode = 'toji'; store.tz_consenso = 'si'; store.tz_lingua = 'it';   /* coach acceso (coachAttivo), italiano */
  return { ctx, store, g: s => vm.runInContext(s, ctx) };
}
const { ctx, store, g } = carica();

/* --- ingredienti riusabili --- */
const nome = '💪 Panca Piana Bilanciere';
const S = (peso, rip, fatta, rpe) => ({ weight: peso, reps: rip, done: fatta, rpe });
const ok4 = () => [S(60, 8, true, 8), S(60, 8, true, 8), S(60, 8, true, 8), S(60, 8, true, 8)];
/* una seduta fatta `giorniFa` giorni fa; la storia e l'unica fonte dei carichi (saveHistory e di js/core/storage.js) */
const seduta = (sets, giorniFa, prontezza) => ({ id: Date.now() - giorniFa * 86400000, day: 'Lunedì', date: g('formatNow()'), minuti: 50,
  prontezza, sessione: [{ name: nome, rest: 120, sets }], exercises: [] });
const storia = lista => { ctx.__h = lista; g('saveHistory(__h)'); };
/* profilo: parq e un BOOLEANO (true/false). La stringa 'no' qui conta come modalita prudente (!!'no' e true) */
const profilo = o => { store[g('PROFILE_KEY()')] = JSON.stringify(Object.assign({ level: 'intermedio', age: 30, goals: ['massa'], priorita: [], parq: false }, o)); };
const spegni = codici => { store.tz_regole_spente = JSON.stringify(codici); };
const riaccendi = () => { delete store.tz_regole_spente; };

/* --- casi: una regola, i suoi limiti, la sua salvaguardia, l'interruttore, il consenso --- */
test('RIC-05: dopo 20 giorni di pausa 4 serie diventano 3 e il motivo e scritto', () => {
  profilo(); storia([seduta(ok4(), 20, 80)]);
  const r = g('caricoProssimo')(nome, 60, 8, 4);
  assert.strictEqual(r.sets, 3);
  assert.match(r.motivo, /rientro dopo 20 giorni/);
});
test('RIC-05: dopo 5 giorni non scatta', () => {
  profilo(); storia([seduta(ok4(), 5, 80)]);
  assert.strictEqual(g('caricoProssimo')(nome, 60, 8, 4).sets, 4);
});
test('RIC-05: spenta con regolaAttiva non scatta', () => {
  profilo(); storia([seduta(ok4(), 20, 80)]); spegni(['RIC-05']);
  assert.ok(!/meno serie su tutto il piano/.test(g('caricoProssimo')(nome, 60, 8, 4).motivo));
  riaccendi();
});
test('senza consenso ai dati il coach non agisce (coachAttivo)', () => {
  store.tz_consenso = 'no';
  assert.strictEqual(g('coachAttivo()'), false);
  assert.strictEqual(g('applicaCaricoProgressivo')('Lunedì'), 0);   /* il punto d'ingresso delle regole sui carichi esce subito */
  store.tz_consenso = 'si';
});
