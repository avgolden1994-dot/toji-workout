/* Controlli di struttura: veloci, senza browser. Lancio: npm test */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), acorn = require('acorn');
const R = path.join(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(R, f), 'utf8');
const html = leggi('index.html');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const stili = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);

test('ogni file citato da index.html esiste', () => {
  [...scripts, ...stili].forEach(f => assert.ok(fs.existsSync(path.join(R, f)), 'manca ' + f));
});
test('ogni file js/ e css/ e citato da index.html (nessun file orfano)', () => {
  const tutti = d => fs.readdirSync(path.join(R, d), { recursive: true }).filter(f => /\.(js|css)$/.test(f)).map(f => d + '/' + f.split(path.sep).join('/'));
  [...tutti('js'), ...tutti('css')].forEach(f => assert.ok([...scripts, ...stili].includes(f), 'orfano: ' + f));
});
test('tutti gli script si leggono senza errori di sintassi', () => {
  scripts.forEach(f => acorn.parse(leggi(f), { ecmaVersion: 'latest', sourceType: 'script' }));
});
test('avvio.js e l ultimo script e il ripristino della guida viene prima dei dati', () => {
  assert.strictEqual(scripts[scripts.length - 1], 'js/avvio.js');
  assert.ok(scripts.indexOf('js/core/ripristino-guida.js') < scripts.indexOf('js/core/storage.js'));
});
test('nessuna funzione globale definita in due file', () => {
  const visti = new Map();
  scripts.filter(f => !f.includes('lingue/')).forEach(f => {
    acorn.parse(leggi(f), { ecmaVersion: 'latest', sourceType: 'script' }).body.forEach(n => {
      const nomi = n.type === 'FunctionDeclaration' ? [n.id.name]
        : n.type === 'VariableDeclaration' ? n.declarations.map(d => d.id.name).filter(Boolean) : [];
      nomi.forEach(nome => { assert.ok(!visti.has(nome), nome + ' in ' + f + ' e in ' + visti.get(nome)); visti.set(nome, f); });
    });
  });
});
test('le tre lingue hanno le stesse frasi', () => {
  global.window = {};
  ['en', 'es', 'de'].forEach(l => new Function(leggi('js/lingue/' + l + '.js')).call(global));
  const chiavi = l => Object.keys(window.I18N[l]);
  const en = new Set(chiavi('en'));
  ['es', 'de'].forEach(l => {
    const mancano = [...en].filter(k => !(k in window.I18N[l]));
    assert.deepStrictEqual(mancano, [], l + ' non traduce: ' + mancano.slice(0, 5).join(' | '));
  });
});
test('sw.js elenca esattamente i file dell app', () => {
  const r = require('child_process').spawnSync('node', [path.join(R, 'tools/genera-sw.js'), '--check'], { encoding: 'utf8' });
  assert.strictEqual(r.status, 0, r.stderr);
});
test('manifest e toji.html (vecchio indirizzo) puntano a index.html', () => {
  assert.strictEqual(JSON.parse(leggi('manifest.json')).start_url, './index.html');
  assert.match(leggi('toji.html'), /index\.html/);
});
test('il consenso del Coach IA e tradotto in ogni lingua', () => {
  global.window = {};
  ['en', 'es', 'de'].forEach(l => new Function(leggi('js/lingue/' + l + '.js')).call(global));
  const blocco = leggi('js/coach/coach-ia.js').match(/const TESTI_IA = \{([\s\S]*?)\n\};/)[1];
  const frasi = [...blocco.matchAll(/^  \w+: '(.*)',?$/gm)].map(m => m[1].replace(/\\'/g, "'"));
  assert.ok(frasi.length >= 6);
  ['en', 'es', 'de'].forEach(l => frasi.forEach(f => assert.ok(window.I18N[l][f], l + ' non traduce: ' + f.slice(0, 50))));
});
