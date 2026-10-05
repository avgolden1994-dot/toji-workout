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

test('la CSP e esattamente questa: nessuna origine di rete oltre a cdnjs (pdf.js), tutte le direttive come prima', () => {
  const html = fs.readFileSync(path.join(radice, 'index.html'), 'utf8');
  const csp = (html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1];
  assert.ok(csp, 'meta CSP presente');
  const trovate = {};
  csp.split(';').map(s => s.trim()).filter(Boolean).forEach(d => { const [nome, ...valori] = d.split(/\s+/); trovate[nome] = valori; });
  const CDNJS = 'https://cdnjs.cloudflare.com', YT = 'https://www.youtube.com', SPOTIFY = 'https://open.spotify.com';
  assert.deepStrictEqual(trovate, {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", CDNJS, YT, SPOTIFY],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:'],
    'media-src': ["'self'", 'data:', 'blob:'],
    'font-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'blob:', 'data:', CDNJS],
    'frame-src': [YT, 'https://www.youtube-nocookie.com', SPOTIFY, 'blob:', 'about:'],
    'worker-src': ["'self'", 'blob:', CDNJS],
    'object-src': ["'none'"],
    'base-uri': ["'none'"],
    'form-action': ["'none'"]
  });
});

test('i nomi del Coach IA non esistono piu; quelli spostati restano funzioni', () => {
  const app = caricaApp();
  assert.deepStrictEqual(app.erroriCaricamento, []);
  ['coachIAAttivo', 'commentaSeduta', 'htmlCommentoIA', 'setCoachIA', 'htmlPrivacyIA'].forEach(n => assert.strictEqual(app.g('typeof ' + n), 'undefined', n));
  ['openHistoryDetail', 'closeDoneView', 'ripulisciChiaviCoachIA'].forEach(n => assert.strictEqual(app.g('typeof ' + n), 'function', n));
  assert.deepStrictEqual(app.errori, []);
});

test('le chiavi orfane del Coach IA seminate prima dell avvio spariscono; le altre restano intatte', () => {
  /* consenso: null = aiuto-app non riscrive tz_consenso dopo il caricamento (di solito lo mette a 'si'): cosi il valore seminato e quello
     che la pulizia lascia davvero, e la prova fallisce se ripulisciChiaviCoachIA tocca il consenso generale o un'altra chiave */
  const altre = { tz_consenso: 'si', tz_consenso_data: '01/09/2026, 10:00', tz_consenso_versione: '1.1', tz_theme: 'dark', tz_onb: '1', coach_plus_history_toji: JSON.stringify([seduta()]), coach_plus_titles_toji: '{"Lunedì":"Spinta"}' };
  const app = caricaApp({ consenso: null, chiaviIniziali: Object.assign({}, SEMINA_ORFANE, altre) });
  assert.deepStrictEqual(app.erroriCaricamento, []);
  ORFANE.forEach(k => assert.strictEqual(app.store[k], undefined, k + ' doveva sparire'));
  Object.keys(altre).forEach(k => assert.strictEqual(app.store[k], altre[k], k + ' non va toccata'));
  assert.strictEqual(app.store.tz_consenso, 'si', 'il consenso generale seminato resta (non lo riscrive aiuto-app)');
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

test('l informativa in app (it/en/es/de) non ha piu l eccezione del Coach IA e ha ancora le sezioni 1-7', () => {
  const riga = fs.readFileSync(path.join(radice, 'js', 'ui', 'guida-interattiva.js'), 'utf8').split('\n').find(l => l.startsWith('const INFORMATIVA = '));
  assert.ok(riga, 'const INFORMATIVA trovata');
  const inf = JSON.parse(riga.slice('const INFORMATIVA = '.length).replace(/;\s*$/, ''));
  assert.deepStrictEqual(Object.keys(inf), ['it', 'en', 'es', 'de']);
  const vera = { it: /Nessun server li riceve/, en: /No server receives it/, es: /Ningún servidor los recibe/, de: /Kein Server erhält sie/ };
  Object.keys(inf).forEach(l => {
    assert.deepStrictEqual((inf[l].match(/<h3>\d\./g) || []).map(x => x.slice(4, -1)), ['1', '2', '3', '4', '5', '6', '7'], l + ': sezioni 1-7');
    assert.ok(!/Coach IA|AI Coach|KI-Coach|Unica eccezione|only exception|Única excepción|Einzige Ausnahme|a un server|to a server|a un servidor|an einen Server/.test(inf[l]), l + ': niente piu Coach IA ne invio a un server');
    assert.ok(vera[l].test(inf[l]), l + ': resta la frase vera (nessun server riceve i dati)');
    assert.ok(/consent-foot/.test(inf[l]), l + ': resta la riga della versione');
  });
});
