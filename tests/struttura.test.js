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
/* Niente lampo all avvio: il tema si applica in <head> prima dei fogli di stile, con la stessa funzione di applyTheme */
const sfondoToken = sel => leggi('css/base.css').match(new RegExp('^' + sel + '[^{]*\\{[^}]*?--bg:\\s*(#[0-9a-f]{6})', 'm'))[1];
test('il tema si decide in <head> prima dei fogli di stile (niente lampo scuro o bianco all avvio)', () => {
  const testa = html.slice(0, html.indexOf('</head>'));
  const iScript = testa.indexOf('<script src="js/core/tema-iniziale.js"></script>');   /* sincrono: niente async/defer */
  assert.strictEqual(scripts[0], 'js/core/tema-iniziale.js');
  assert.ok(iScript > testa.indexOf('id="theme-color-meta"') && iScript < testa.indexOf('<link rel="stylesheet"'), 'tema-iniziale.js va dopo il meta theme-color e prima dei fogli di stile');
  /* lo stile critico ha gli stessi fondi dei token --bg di css/base.css, e sta prima dei fogli */
  const stile = testa.match(/<style>([\s\S]*?)<\/style>/);
  assert.ok(stile && testa.indexOf(stile[0]) < testa.indexOf('<link rel="stylesheet"'), 'manca lo <style> critico prima dei fogli');
  const scuro = sfondoToken(':root, html\\[data-theme="dark"\\]'), chiaro = sfondoToken('html\\[data-theme="light"\\], body\\[data-theme="light"\\]');
  assert.ok(stile[1].includes(':where(html){background:' + scuro), 'fondo scuro diverso da --bg di base.css (' + scuro + ')');
  assert.ok(stile[1].includes(':where(html[data-theme="light"]){background:' + chiaro), 'fondo chiaro diverso da --bg di base.css (' + chiaro + ')');
  /* applyTheme usa la stessa funzione e la stessa barra del browser nel chiaro */
  const imp = leggi('js/ui/opzioni/impostazioni.js');
  assert.match(imp, /applyTheme = function\(\) \{[^}]*const tema = temaRisolto\(\);/);
  assert.ok(imp.includes("tema === 'light' ? '" + chiaro + "'"), 'applyTheme: barra del browser nel chiaro diversa da --bg');
});
test('tema-iniziale.js: stessa scelta di applyTheme per ogni preferenza, anche con localStorage bloccato', () => {
  const src = leggi('js/core/tema-iniziale.js');
  const chiaro = sfondoToken('html\\[data-theme="light"\\], body\\[data-theme="light"\\]');
  const prova = (salvato, sistemaChiaro, bloccato) => {
    const radice = { dataset: {} }, meta = { content: '#08080a', setAttribute(k, v) { this[k] = v; } };
    const window = { matchMedia: q => ({ matches: q === '(prefers-color-scheme: light)' && sistemaChiaro }) };
    const localStorage = { getItem: k => { if (bloccato) throw new Error('bloccato'); return k === 'tz_theme' ? salvato : null; } };
    const document = { documentElement: radice, getElementById: id => (id === 'theme-color-meta' ? meta : null) };
    new Function('window', 'localStorage', 'document', src)(window, localStorage, document);
    return radice.dataset.theme + ' ' + meta.content;
  };
  assert.strictEqual(prova(null, true), 'dark #08080a');          /* nessuna scelta: scuro, come getSetting(THEME_KEY, 'dark') */
  assert.strictEqual(prova('dark', true), 'dark #08080a');
  assert.strictEqual(prova('light', false), 'light ' + chiaro);
  assert.strictEqual(prova('auto', true), 'light ' + chiaro);
  assert.strictEqual(prova('auto', false), 'dark #08080a');
  assert.strictEqual(prova('light', true, true), 'dark #08080a');  /* localStorage che lancia: il default, senza errori */
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
