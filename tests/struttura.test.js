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
test('in spagnolo «Dolenzia» (domanda di inizio seduta) e «Dolor muscular», non «agujetas»', () => {
  /* «agujetas» e solo spagnolo di Spagna e vuol dire un tipo preciso di dolore dopo lo sforzo; in America Latina significa altro.
     La domanda chiede quanto dolore muscolare c e oggi, con le risposte Mucho / Un poco / Nada. */
  global.window = {};
  new Function(leggi('js/lingue/es.js')).call(global);
  assert.strictEqual(window.I18N.es['Dolenzia'], 'Dolor muscular');
  assert.ok(!/agujetas/i.test(leggi('js/lingue/es.js')), 'agujetas e ancora in es.js');
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
test('l audio degli altri non si blocca: niente sblocco al primo tocco, niente playback fuori dal cedimento', () => {
  const js = scripts.filter(f => !f.includes('lingue/'));
  const CED = 'js/ui/allenamento/cedimento.js', MUS = 'js/core/musica-altre-app.js';
  const senzaCommenti = t => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  js.forEach(f => {
    const src = senzaCommenti(leggi(f));
    assert.ok(!/unlockAudio/.test(src), f + ': sblocco audio globale al primo tocco');
    /* nessun ascoltatore globale di tocchi che crei il contesto audio o accenda la traccia silenziosa */
    [...src.matchAll(/addEventListener\(\s*['"](?:pointerdown|touchstart|touchend|mousedown|click)['"][^;]*;/g)].forEach(m =>
      assert.ok(!/getAudioCtx|avviaCanaleMultimediale|audioSession|tipoSessione/.test(m[0]), f + ': ascoltatore di tocchi che prende l audio'));
    /* i tipi di sessione che interrompono gli altri stanno solo nel percorso del cedimento */
    if (/['"](?:playback|transient-solo)['"]/.test(src)) assert.ok([CED, MUS].includes(f), f + ': playback/transient-solo fuori dal cedimento');
    /* il contesto audio si crea solo dentro il tocco che avvia timer o prova suono (musica-altre-app.js) */
    if (/getAudioCtx\(\s*true\s*\)/.test(src)) assert.strictEqual(f, MUS, f + ': crea il contesto audio');
    /* la traccia silenziosa la accende solo il cedimento */
    if (f !== MUS && /avviaCanaleMultimediale\s*\(/.test(src)) assert.strictEqual(f, CED, f + ' accende la traccia silenziosa');
  });
  /* in musica-altre-app.js "playback" vive solo dentro avviaCanaleMultimediale */
  const mus = leggi(MUS);
  const fn = acorn.parse(mus, { ecmaVersion: 'latest', ranges: true }).body.find(n => n.type === 'FunctionDeclaration' && n.id.name === 'avviaCanaleMultimediale');
  assert.ok(fn, 'avviaCanaleMultimediale non trovata');
  assert.ok(!/['"]playback['"]/.test(senzaCommenti(mus.slice(0, fn.start) + mus.slice(fn.end))), '"playback" fuori da avviaCanaleMultimediale');
  /* a fine cedimento niente bip */
  const ced = leggi(CED);
  const fin = acorn.parse(ced, { ecmaVersion: 'latest', ranges: true }).body.find(n => n.type === 'FunctionDeclaration' && n.id.name === 'finishDropSet');
  assert.ok(fin, 'finishDropSet non trovata');
  assert.ok(!/play(?:Beep|Tone|Tick|End)\s*\(/.test(senzaCommenti(ced.slice(fin.start, fin.end))), 'finishDropSet suona un bip');
});
