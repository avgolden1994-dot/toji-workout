/* Il Coach IA e rimosso per intero (decisione del proprietario, 2026-10-05): niente Worker, niente chiavi orfane, niente rete.
   Cosa deve restare vero:
   - nessuna traccia del Worker ("workers.dev") ne del vecchio file coach-ia in index.html, sw.js e js/; la CSP non ammette altre origini di rete oltre a cdnjs;
   - le chiavi orfane del vecchio Coach IA (tz_consenso_ia, tz_consenso_ia_data, tz_device_ia, tz_ia_uso) si tolgono all'avvio, in silenzio,
     e le altre chiavi (consenso generale compreso) restano intatte;
   - i commenti IA gia salvati nello storico (commentoIA) restano: normalizeHistoryEntry, saveHistory, backup e ripristino li conservano;
   - un backup vecchio che contiene le chiavi IA (e il consenso) non le rimette.
   L'avvio vero nel browser e in tests/browser/senza-coach-ia.js; i programmi salvati dalla v1 sono in tests/migrazione-v1.test.js. */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const { caricaApp, radice } = require('./aiuto-app');

const ORFANE = ['tz_consenso_ia', 'tz_consenso_ia_data', 'tz_device_ia', 'tz_ia_uso'];
const SEMINA_ORFANE = { tz_consenso_ia: 'si', tz_consenso_ia_data: '01/09/2026, 10:00', tz_device_ia: 'vecchio-codice-dispositivo', tz_ia_uso: '{"usati":3,"limite":20,"mese":"2026-09"}' };
const COMMENTO = { testo: 'Ottima seduta: panca sempre più forte, continua così & non saltare il riscaldamento.', data: '04/10/2026, 19:30' };

function filesDi(cartella) {
  return fs.readdirSync(cartella, { withFileTypes: true }).flatMap(d => d.isDirectory() ? filesDi(path.join(cartella, d.name)) : [path.join(cartella, d.name)]);
}
const IN_VM = (app, x) => app.g('JSON.parse(' + JSON.stringify(JSON.stringify(x)) + ')');
const seduta = extra => Object.assign({ id: 1760000000000, day: 'Lunedì', date: '05/10/2026, 10:00', berserk: false, minuti: 50,
  exercises: [{ name: 'Panca Piana Bilanciere', weight: 60, totalSets: 3, doneSets: 3, wasBerserk: false }] }, extra || {});

test('nessuna traccia del Worker o del vecchio file coach-ia in index.html, sw.js e js/', () => {
  const file = [path.join(radice, 'index.html'), path.join(radice, 'sw.js'), ...filesDi(path.join(radice, 'js'))];
  assert.ok(file.length > 100, 'attesi molti file, trovati ' + file.length);
  const trovati = [];
  file.forEach(f => { const t = fs.readFileSync(f, 'utf8'); ['workers.dev', 'coach-ia'].forEach(parola => { if (t.includes(parola)) trovati.push(path.relative(radice, f) + ': ' + parola); }); });
  assert.deepStrictEqual(trovati, []);
});

test('la CSP non ammette origini di rete oltre a cdnjs (pdf.js) e il resto resta com era', () => {
  const html = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
  const csp = (html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1];
  assert.ok(csp, 'meta CSP presente');
  const direttiva = nome => ((csp.split(';').map(s => s.trim()).find(s => s.startsWith(nome + ' ')) || '').split(/\s+/).slice(1));
  assert.deepStrictEqual(direttiva('connect-src'), ["'self'", 'blob:', 'data:', 'https://cdnjs.cloudflare.com']);
  assert.deepStrictEqual(direttiva('script-src'), ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'https://www.youtube.com', 'https://open.spotify.com']);
  assert.deepStrictEqual(direttiva('frame-src'), ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://open.spotify.com', 'blob:', 'about:']);
  assert.deepStrictEqual(direttiva('worker-src'), ["'self'", 'blob:', 'https://cdnjs.cloudflare.com']);
  assert.deepStrictEqual(direttiva('object-src'), ["'none'"]);
});

test('i nomi del Coach IA non esistono piu; quelli spostati restano funzioni', () => {
  const app = caricaApp();
  assert.deepStrictEqual(app.erroriCaricamento, []);
  ['coachIAAttivo', 'commentaSeduta', 'htmlCommentoIA', 'setCoachIA', 'htmlPrivacyIA'].forEach(n => assert.strictEqual(app.g('typeof ' + n), 'undefined', n));
  ['openHistoryDetail', 'closeDoneView', 'ripulisciChiaviCoachIA'].forEach(n => assert.strictEqual(app.g('typeof ' + n), 'function', n));
  assert.deepStrictEqual(app.errori, []);
});

test('le chiavi orfane del Coach IA seminate prima dell avvio spariscono; le altre restano intatte', () => {
  const altre = { tz_consenso: 'si', tz_consenso_data: '01/09/2026, 10:00', tz_consenso_versione: '1.1', tz_theme: 'dark', tz_onb: '1', coach_plus_history_toji: JSON.stringify([seduta()]), coach_plus_titles_toji: '{"Lunedì":"Spinta"}' };
  const app = caricaApp({ chiaviIniziali: Object.assign({}, SEMINA_ORFANE, altre) });
  assert.deepStrictEqual(app.erroriCaricamento, []);
  ORFANE.forEach(k => assert.strictEqual(app.store[k], undefined, k + ' doveva sparire'));
  Object.keys(altre).forEach(k => assert.strictEqual(app.store[k], altre[k], k + ' non va toccata'));
  assert.strictEqual(app.g('coachAttivo()'), true, 'il consenso generale resta quello di prima');
  assert.deepStrictEqual(Object.keys(app.json('fotografia()')).filter(k => ORFANE.includes(k)), [], 'nemmeno un backup nuovo le contiene');
  assert.deepStrictEqual(app.errori, [], 'nessun errore e nessun messaggio');
});

test('la pulizia e idempotente, silenziosa e non si ferma se localStorage da errore', () => {
  const app = caricaApp({ chiaviIniziali: SEMINA_ORFANE });
  const prima = JSON.stringify(app.store);
  app.chiama('ripulisciChiaviCoachIA'); app.chiama('ripulisciChiaviCoachIA');
  assert.strictEqual(JSON.stringify(app.store), prima, 'senza chiavi orfane non cambia nulla');
  ORFANE.forEach(k => app.store[k] = 'x');
  const rimuovi = app.ctx.localStorage.removeItem;
  app.ctx.localStorage.removeItem = () => { throw new Error('storage non disponibile'); };
  assert.doesNotThrow(() => app.chiama('ripulisciChiaviCoachIA'), 'ogni accesso e in try/catch');
  app.ctx.localStorage.removeItem = rimuovi;
  app.chiama('ripulisciChiaviCoachIA');
  ORFANE.forEach(k => assert.strictEqual(app.store[k], undefined, k));
  assert.deepStrictEqual(app.errori, []);
});

test('un commentoIA salvato sopravvive a loadHistory/saveHistory e a un giro completo fotografia -> svuota -> applicaFotografia', () => {
  const app = caricaApp();
  const lista = [seduta({ commentoIA: COMMENTO }), seduta({ id: 1759900000000, day: 'Martedì', date: '04/10/2026, 10:00' })];
  app.storia(lista);
  const atteso = app.json('loadHistory()');
  assert.deepStrictEqual(atteso[0].commentoIA, COMMENTO, 'normalizeHistoryEntry lo lascia passare');
  assert.strictEqual(atteso[1].commentoIA, undefined, 'e non lo inventa dove non c era');
  app.g('saveHistory(loadHistory())'); app.g('saveHistory(loadHistory())');
  assert.deepStrictEqual(app.json('loadHistory()'), atteso, 'rileggere e risalvare non lo perde');
  /* backup e ripristino su un telefono svuotato */
  const foto = app.json('fotografia()');
  assert.ok(foto[app.chiave('historyKey')], 'la fotografia contiene lo storico');
  Object.keys(app.store).forEach(k => delete app.store[k]);
  assert.strictEqual(app.json('loadHistory()').length, 0, 'store svuotato');
  app.ctx.__foto = IN_VM(app, foto);
  app.g('applicaFotografia(__foto, true)');
  const dopo = app.json('loadHistory()');
  assert.deepStrictEqual(dopo, atteso, 'dopo il ripristino lo storico e identico');
  assert.deepStrictEqual(dopo[0].commentoIA, COMMENTO, 'commentoIA compreso');
  assert.deepStrictEqual(app.errori, []);
});

test('un backup vecchio con le chiavi del Coach IA e il consenso non le ripristina (ne con ripristino normale ne esatto)', () => {
  [false, true].forEach(esatta => {
    const app = caricaApp({ consenso: false });   /* tz_consenso = 'no' */
    assert.strictEqual(app.store.tz_consenso, 'no');
    const dati = Object.assign({ tz_consenso: 'si', tz_consenso_data: '01/01/2026', tz_consenso_versione: '9.9', coach_plus_history_toji: JSON.stringify([seduta({ commentoIA: COMMENTO })]) }, SEMINA_ORFANE);
    app.ctx.__dati = IN_VM(app, dati);
    app.g('applicaFotografia(__dati, ' + esatta + ')');
    ORFANE.forEach(k => assert.strictEqual(app.store[k], undefined, k + ' non va rimessa (esatta=' + esatta + ')'));
    ['tz_consenso_data', 'tz_consenso_versione'].forEach(k => assert.strictEqual(app.store[k], undefined, k));
    assert.strictEqual(app.store.tz_consenso, 'no', 'il consenso generale non passa da un backup (esatta=' + esatta + ')');
    assert.strictEqual(app.g('coachAttivo()'), false);
    assert.deepStrictEqual(app.json('loadHistory()')[0].commentoIA, COMMENTO, 'mentre i dati veri (e il commento) si ripristinano');
    assert.deepStrictEqual(app.errori, []);
  });
});
