/* Soglie del coach (W1-T1, piano coach v2 B.4; registro docs/coach-v2-decisioni.md C.4): ogni file js/**\/soglie-*.js ha voci
   { v, forza, fonte, regole } con una forza ammessa; tools/elenco-soglie.js le elenca in docs/soglie-coach.md e rifiuta le voci
   incomplete; etichettaForza (js/coach/regia/perche.js) da le etichette del foglio «Perché?» per Convenzione, Decisione e Provvisoria. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), os = require('os'), path = require('path'), vm = require('vm');
const { spawnSync } = require('child_process');
const S = require('../tools/elenco-soglie.js');

const R = path.join(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(R, f), 'utf8');
const SOTTO_COACH = ['regista', 'architetto', 'dosatore', 'bilancia', 'sentinella', 'tecnico', 'preparatore', 'motivatore', 'specialista'];

test('ogni file js/**/soglie-*.js: ogni voce ha v, una forza ammessa e la fonte', () => {
  const file = S.trovaFileSoglie();
  assert.ok(file.indexOf('js/coach/regia/soglie-regia.js') !== -1, 'soglie-regia.js trovato: ' + file.join(', '));
  let voci = 0;
  file.forEach(f => {
    const c = S.caricaSoglie(f, leggi(f));
    assert.deepStrictEqual(c.errori, [], f);
    assert.ok(c.tabelle.length >= 1, f + ': almeno una tabella SOGLIE_');
    c.tabelle.forEach(t => {
      assert.deepStrictEqual(S.validaVoci(t.nome, t.voci), [], t.nome);
      Object.keys(t.voci).forEach(k => {
        voci++;
        const s = t.voci[k];
        assert.ok(s.v !== undefined && S.FORZE_AMMESSE.indexOf(s.forza) !== -1 && typeof s.fonte === 'string' && s.fonte.trim().length > 0, t.nome + '.' + k);
      });
    });
    /* la cartella dice il sotto-coach (piano B.4) */
    const m = f.match(/^js\/coach\/([a-z]+)\//);
    assert.ok(m && SOTTO_COACH.indexOf(S.SOTTO_COACH_CARTELLA[m[1]]) !== -1, f + ': un file soglie sta nella cartella del suo sotto-coach');
  });
  assert.ok(voci >= 2);
});

test('SOGLIE_REGIA: precedenze di REG-01 nell\'ordine del piano B.2 e versione 2 dei programmi (REG-04)', () => {
  const { tabelle } = S.caricaSoglie('js/coach/regia/soglie-regia.js', leggi('js/coach/regia/soglie-regia.js'));
  assert.deepStrictEqual(tabelle.map(t => t.nome), ['SOGLIE_REGIA']);
  const s = tabelle[0].voci;
  assert.strictEqual(s.versioneProgramma.v, 2);
  assert.strictEqual(s.versioneProgramma.forza, 'Decisione');
  assert.deepStrictEqual(s.versioneProgramma.regole, ['REG-04']);
  const p = s.precedenza.v;
  assert.deepStrictEqual(Object.keys(p).sort(), SOTTO_COACH.filter(x => x !== 'regista').sort(), 'tutti i sotto-coach tranne il Regista, che applica l\'ordine');
  assert.deepStrictEqual([p.sentinella, p.motivatore, p.specialista, p.architetto, p.dosatore, p.bilancia, p.preparatore, p.tecnico], [1, 2, 3, 4, 4, 4, 5, 5]);
  assert.deepStrictEqual(s.precedenza.regole, ['REG-01']);
});

test('validaVoci rifiuta una voce senza v, forza o fonte, una forza inventata, regole scritte male e campi sconosciuti', () => {
  const ok = { v: 0, forza: 'Convenzione', fonte: 'registro C.4' };
  assert.deepStrictEqual(S.validaVoci('SOGLIE_PROVA', { zero: ok, falso: Object.assign({}, ok, { v: false }), conRegole: Object.assign({}, ok, { regole: ['IPE-01', 'ZZ-02'] }) }), [], 'v: 0 e v: false sono valori');
  const casi = [
    [{ forza: 'Solida', fonte: 'Pelland 2026' }, /manca `v`/],
    [{ v: 4, fonte: 'Pelland 2026' }, /`forza` «undefined» non ammessa/],
    [{ v: 4, forza: 'Forte', fonte: 'Pelland 2026' }, /`forza` «Forte» non ammessa/],
    [{ v: 4, forza: 'Solida', fonte: '  ' }, /manca `fonte`/],
    [{ v: 4, forza: 'Solida', fonte: 'x', regole: 'IPE-01' }, /`regole` e un elenco di codici/],
    [{ v: 4, forza: 'Solida', fonte: 'x', regole: ['ipe-1'] }, /`regole` e un elenco di codici/],
    [{ v: 4, forza: 'Solida', fonte: 'x', nota: 'y' }, /campo sconosciuto «nota»/],
    [4, /ogni voce e un oggetto/]
  ];
  casi.forEach(([voce, rx]) => {
    const e = S.validaVoci('SOGLIE_PROVA', { voce });
    assert.strictEqual(e.length, 1, JSON.stringify(voce) + ': ' + e.join(' | '));
    assert.match(e[0], rx);
  });
  assert.match(S.validaVoci('SOGLIE_VUOTE', {})[0], /nessuna voce/);
  assert.deepStrictEqual(S.FORZE_AMMESSE, ['Solida', 'Moderata', 'Contrastata', 'Convenzione', 'Decisione', 'Provvisoria']);
});

test('caricaSoglie: un file senza SOGLIE_, o che al caricamento usa nomi di altri file, e un errore', () => {
  assert.match(S.caricaSoglie('js/coach/x/soglie-a.js', 'const ALTRO = { a: 1 };').errori[0], /nessuna costante `const SOGLIE_/);
  assert.match(S.caricaSoglie('js/coach/x/soglie-b.js', 'const SOGLIE_B = { a: { v: COACH_PARAMETRI.serieMaxPrudente, forza: "Solida", fonte: "f" } };').errori[0], /non si esegue da solo/);
  assert.match(S.caricaSoglie('js/coach/x/soglie-c.js', 'const SOGLIE_C = [1, 2];').errori[0], /deve essere un oggetto/);
  const due = S.caricaSoglie('js/coach/x/soglie-d.js', 'const SOGLIE_D = { a: { v: 1, forza: "Solida", fonte: "f" } };\nconst SOGLIE_E = { b: { v: 2, forza: "Moderata", fonte: "g" } };');
  assert.deepStrictEqual(due.errori, []);
  assert.deepStrictEqual(due.tabelle.map(t => t.nome + ':' + Object.keys(t.voci).join()), ['SOGLIE_D:a', 'SOGLIE_E:b']);
});

test('elenco delle soglie: ogni voce con valore, forza, fonte e regole; il conteggio per forza', () => {
  const g = S.generaElenco();
  assert.deepStrictEqual(g.errori, []);
  assert.match(g.testo, /^# Soglie del coach\n/);
  assert.ok(g.testo.indexOf('| `versioneProgramma` | 2 | Decisione | piano coach v2 B.6 (REG-04); registro coach v2 D-P5 | REG-04 |') !== -1, g.testo);
  assert.ok(g.testo.indexOf('| `precedenza` | sentinella 1, motivatore 2, specialista 3, architetto 4, dosatore 4, bilancia 4, preparatore 5, tecnico 5 | Decisione |') !== -1);
  assert.ok(g.testo.indexOf('## `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista)') !== -1);
  const tutte = g.tabelle.reduce((n, t) => n + Object.keys(t.voci).length, 0);
  assert.ok(g.testo.indexOf('Totale: ' + tutte + ' soglie in ' + g.tabelle.length + ' tabelle') !== -1);
  g.tabelle.forEach(t => Object.keys(t.voci).forEach(k => assert.ok(g.testo.indexOf('| `' + k + '` | ') !== -1, k + ' nel documento')));
});

test('node tools/elenco-soglie.js: scrive il documento, --check esce 1 se e vecchio o se una voce non va (e allora non scrive)', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'soglie-prova-'));
  try {
    const f = path.join(tmp, 'js/coach/volume/soglie-volume.js');
    fs.mkdirSync(path.dirname(f), { recursive: true }); fs.mkdirSync(path.join(tmp, 'docs'), { recursive: true });
    const lancia = (...a) => spawnSync(process.execPath, [path.join(R, 'tools/elenco-soglie.js'), '--radice', tmp].concat(a), { encoding: 'utf8' });
    fs.writeFileSync(f, 'const SOGLIE_VOLUME = { minimoFrazionario: { v: 4, forza: "Solida", fonte: "nota di prova", regole: ["IPE-01"] } };\n');
    assert.strictEqual(lancia('--check').status, 1, 'documento mancante');
    assert.strictEqual(lancia().status, 0);
    const doc = fs.readFileSync(path.join(tmp, S.FILE_DOC), 'utf8');
    assert.ok(doc.indexOf('| `minimoFrazionario` | 4 | Solida | nota di prova | IPE-01 |') !== -1, doc);
    assert.ok(doc.indexOf('(dosatore)') !== -1, 'la cartella volume/ e del Dosatore');
    assert.strictEqual(lancia('--check').status, 0);
    fs.writeFileSync(f, 'const SOGLIE_VOLUME = { minimoFrazionario: { v: 5, forza: "Solida", fonte: "nota di prova", regole: ["IPE-01"] } };\n');
    assert.strictEqual(lancia('--check').status, 1, 'numero cambiato: documento vecchio');
    fs.writeFileSync(f, 'const SOGLIE_VOLUME = { minimoFrazionario: { v: 5, fonte: "nota di prova" } };\n');
    const rotto = lancia();
    assert.strictEqual(rotto.status, 1);
    assert.match(rotto.stderr, /SOGLIE_VOLUME\.minimoFrazionario: `forza` «undefined» non ammessa/);
    assert.strictEqual(fs.readFileSync(path.join(tmp, S.FILE_DOC), 'utf8'), doc, 'con un errore il documento non si riscrive');
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});

test('etichettaForza (registro C.4): Convenzione, Decisione e Provvisoria hanno l\'etichetta del foglio «Perché?», le altre no', () => {
  const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
  vm.runInContext(leggi('js/coach/regia/perche.js'), ctx);
  const et = f => vm.runInContext('etichettaForza(' + JSON.stringify(f) + ')', ctx);
  assert.strictEqual(et('Convenzione'), 'Scelta prudente del coach (Convenzione): non è un risultato di studi');
  assert.strictEqual(et('Decisione'), 'Decisione di prodotto');
  assert.strictEqual(et('Provvisoria'), 'Numero di partenza, in verifica');
  assert.deepStrictEqual(['Solida', 'Moderata', 'Contrastata', 'Forte', undefined].map(et), ['', '', '', '', '']);
  const chiavi = JSON.parse(vm.runInContext('JSON.stringify(Object.keys(ETICHETTE_FORZA))', ctx));
  assert.ok(chiavi.every(k => S.FORZE_AMMESSE.indexOf(k) !== -1), 'ogni etichetta e di una forza ammessa');
});
