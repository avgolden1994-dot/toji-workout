/* W2-T5, split, giorni e attrezzi (PRG-02, OBI-01, OBI-07, CAS-01, CAS-10, ETA-05): prove in node con l app vera in vm (tests/aiuto-app.js).
   Misurato sul codice di coach-v2-onda-2d (collaudo, matrice rapida, criteri 1.5, % pesata): REC-01 schiena 2,2, spalle 1,6 (la frequenza 3 con 4 o 5 giorni mette il full body il giorno prima
   di un upper; push/pull/legs + upper/lower mette push e pull in giorni consecutivi). Le prove sui giorni falliscono su da05947 (nessuna ricerca dei giorni senza conflitti).
   Il file delle soglie (js/coach/programma/soglie-split.js) lo mette nell index.html l integrazione (docs/in-arrivo/W2-T5.json): finche non c e, la prova lo carica da sola. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const R = path.join(__dirname, '..');
function caricaConSoglie() {
  const a = caricaApp({ ora: LUNEDI });
  if (a.g('typeof SOGLIE_SPLIT') === 'undefined') vm.runInContext(fs.readFileSync(path.join(R, 'js/coach/programma/soglie-split.js'), 'utf8'), a.ctx, { filename: 'js/coach/programma/soglie-split.js' });
  return a;
}
/* giorniSettimana su un brief finto: { indici, tipi (come restano nella divisione), note } */
function giorni(a, tipi, giorniDichiarati, opz) {
  const o = Object.assign({ livello: 'intermedio', metodo: null, priorita: [] }, opz || {});
  return a.json('(function () { const brief = { agenda: { giorni: ' + giorniDichiarati + ' }, chi: { livello: ' + JSON.stringify(o.livello) + ' }, metodo: { attivo: ' + JSON.stringify(o.metodo) + ' }, lavoro: { note: [], split: null, prefs: { priorita: ' + JSON.stringify(o.priorita) + ' } } };' +
    'const split = { nome: "prova", giorni: ' + JSON.stringify(tipi) + ' }; brief.lavoro.split = split; const indici = giorniSettimana(brief, split); return { indici: indici, tipi: brief.lavoro.split.giorni, note: brief.lavoro.note }; })()');
}

test('PRG-02: frequenza 3 con 4 giorni (full body, upper, lower, full body): i due full body non stanno accanto a niente (lunedi, mercoledi, giovedi, sabato)', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4);
  assert.deepStrictEqual(r.indici, [0, 2, 3, 5], 'prima: lunedi-martedi-giovedi-venerdi, full body e upper in giorni di fila');
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody'], 'l ordine della divisione resta quello scelto');
  assert.deepStrictEqual(r.note, [], 'nessuna nota: dice il vero la scheda finale, non il tipo di seduta');
});

test('PRG-02: push/pull/legs + upper/lower (5 giorni): push, pull e legs non sono consecutivi, quattro giorni di fila al massimo', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['push', 'pull', 'legs', 'upper', 'lower'], 5);
  assert.deepStrictEqual(r.indici, [0, 2, 4, 5, 6], 'lunedi push, mercoledi pull, venerdi legs, sabato upper, domenica lower: la seduta di tirata ha anche lo stacco rumeno, quindi anche pull e legs non stanno accanto');
  assert.deepStrictEqual(r.tipi, ['push', 'pull', 'legs', 'upper', 'lower']);
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
});

test('PRG-02: frequenza 3 con 5 giorni (upper, lower, full body, upper, lower): il full body sta da solo tra due giorni di riposo, sabato e lunedi non sono mai di fila con lo stesso muscolo', () => {
  const a = caricaConSoglie();
  const tipi = ['upper', 'lower', 'fullbody', 'upper', 'lower'];
  const r = giorni(a, tipi, 5);
  assert.deepStrictEqual(r.tipi, tipi, 'stesso ordine');
  assert.strictEqual(a.json('conflittiDeiGiorni(' + JSON.stringify(r.tipi) + ', ' + JSON.stringify(r.indici) + ', { priorita: [] })'), 0, JSON.stringify(r));
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
  assert.strictEqual(r.indici.length, 5);
});

test('PRG-02: push/pull/legs con i punti deboli (frequenza 1, 4 giorni): push e pull non sono consecutivi', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['push', 'pull', 'legs', 'punti'], 4);
  assert.deepStrictEqual(r.indici, [0, 2, 4, 5]);
  assert.deepStrictEqual(r.tipi, ['push', 'pull', 'legs', 'punti']);
  /* le priorita dichiarate cambiano cosa lavora il giorno dei punti deboli: con le gambe il giorno dopo legs e un conflitto, e la ricerca lo evita */
  const g = giorni(a, ['push', 'pull', 'legs', 'punti'], 4, { priorita: ['gambe'] });
  assert.strictEqual(a.json('conflittiDeiGiorni(' + JSON.stringify(g.tipi) + ', ' + JSON.stringify(g.indici) + ', { priorita: ["gambe"] })'), 0, JSON.stringify(g));
});

test('PRG-02: dove i giorni di sempre non hanno conflitti non cambia niente (2 giorni, 3 giorni, upper/lower x2, 5 giorni di chi sceglie la frequenza 2)', () => {
  const a = caricaConSoglie();
  assert.deepStrictEqual(giorni(a, ['fullbody', 'fullbody'], 2).indici, [0, 3]);
  assert.deepStrictEqual(giorni(a, ['fullbody', 'fullbody', 'fullbody'], 3).indici, [0, 2, 4]);
  assert.deepStrictEqual(giorni(a, ['upper', 'lower', 'fullbody'], 3).indici, [0, 2, 4]);
  assert.deepStrictEqual(giorni(a, ['upper', 'lower', 'upper', 'lower'], 4).indici, [0, 1, 3, 4], 'upper e lower in giorni di fila non hanno grandi muscoli in comune');
});

test('PRG-02: un metodo famoso tiene la sua struttura e i giorni di sempre', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4, { metodo: { id: 'phul' } });
  assert.deepStrictEqual(r.indici, [0, 1, 3, 4]);
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody']);
});

test('PRG-02: quando i conflitti non si possono togliere del tutto la ricerca li riduce, riordina solo se serve, non supera i 4 giorni di fila e tiene le stesse sedute', () => {
  const a = caricaConSoglie();
  const tipi = ['push', 'pull', 'push', 'pull', 'legs'];
  const prima = a.json('conflittiDeiGiorni(' + JSON.stringify(tipi) + ', [0, 1, 3, 4, 5], { priorita: [] })');
  const r = giorni(a, tipi, 5);
  const dopo = a.json('conflittiDeiGiorni(' + JSON.stringify(r.tipi) + ', ' + JSON.stringify(r.indici) + ', { priorita: [] })');
  assert.ok(dopo < prima, 'conflitti ' + prima + ' -> ' + dopo);
  assert.deepStrictEqual(r.tipi.slice().sort(), tipi.slice().sort());
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
  assert.deepStrictEqual(r.indici.slice().sort((x, y) => x - y), r.indici, 'giorni in ordine');
  assert.strictEqual(new Set(r.indici).size, 5);
});

/* finche l integrazione non mette soglie-split.js nell index.html, il generatore tiene i giorni di sempre: nessuna ricerca, nessun errore (dopo l integrazione la prova si salta) */
test('PRG-02: senza il file delle soglie i giorni restano quelli di sempre', { skip: caricaApp({ ora: LUNEDI }).g('typeof SOGLIE_SPLIT') !== 'undefined' }, () => {
  const a = caricaApp({ ora: LUNEDI });
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4);
  assert.deepStrictEqual(r.indici, [0, 1, 3, 4]);
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody']);
});

/* ---------------------------------------------------------------- programmi veri ---------------------------------------------------------------- */
const GRUPPI_REC = { petto: ['petto'], schiena: ['schiena'], quadricipiti: ['quadricipiti'], femorali: ['femorali'], glutei: ['glutei'], spalle: ['deltoidi_laterali', 'deltoidi_posteriori', 'deltoidi_anteriori'] };
/* i giorni di allenamento di fila sulla settimana ad anello (indici di DAYS) */
function giorniDiFila(indici) {
  const set = [0, 1, 2, 3, 4, 5, 6].map(i => indici.indexOf(i) !== -1), riposo = set.indexOf(false);
  if (riposo === -1) return 7;
  let max = 0, corsa = 0;
  for (let k = 1; k <= 7; k++) { if (set[(riposo + k) % 7]) { corsa++; max = Math.max(max, corsa); } else corsa = 0; }
  return max;
}
function installaMisura(a) {
  a.g('globalThis.__recSett = function (p) { const prog = buildProgram(p); const out = []; const GR = ' + JSON.stringify(GRUPPI_REC) + ';' +
    'const frac = (sd, g) => GR[g].reduce((t, x) => t + frazGruppoSeduta(sd, x), 0);' +
    'prog.sedute.forEach((x, i) => prog.sedute.forEach((y, j) => { if (j <= i || !giorniAdiacenti(DAYS.indexOf(x.giorno), DAYS.indexOf(y.giorno))) return;' +
    'Object.keys(GR).forEach(g => { if (frac(x, g) >= 4 && frac(y, g) >= 4) out.push(g + ": " + x.giorno + " (" + x.tipo + ") e " + y.giorno + " (" + y.tipo + ")"); }); }));' +
    'return { conflitti: out, giorni: prog.sedute.map(s => s.giorno.slice(0, 3) + ":" + s.tipo), indici: prog.sedute.map(s => DAYS.indexOf(s.giorno)) }; }');
}
test('REC-01 (collaudo) su programmi veri: con 4 e 5 giorni nessun grande muscolo (spalle comprese) e a fondo in due giorni consecutivi, e i giorni di fila non superano 4', { timeout: 280000 }, () => {
  const a = caricaConSoglie();
  installaMisura(a);
  const brutti = [];
  let tot = 0, i = 0;
  ['3', 'auto', '2', '1'].forEach(freq => [4, 5].forEach(days => ['principiante', 'intermedio', 'avanzato'].forEach(level => [30, 45, 75].forEach(minutes => ['palestra', 'manubri'].forEach(luogo => ['massa', 'forza'].forEach(goal => {
    const p = { goals: [goal], level: level, days: days, minutes: minutes, luogo: luogo, fastidi: [], sex: 'M', age: 30, freq: freq, parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], usaProfilo: false, seme: 'split' + (i++) };
    const r = a.dati(a.chiama('__recSett', p)); tot++; r.run = giorniDiFila(r.indici);
    if (r.run > 4 || r.conflitti.length) brutti.push([freq + ' freq', days + 'g', level, minutes + 'min', luogo, goal].join(' ') + ' :: ' + r.giorni.join(' ') + ' :: ' + r.conflitti.concat(r.run > 4 ? ['giorni di fila ' + r.run] : []).join('; '));
  }))))));
  assert.strictEqual(tot, 288);
  assert.deepStrictEqual(brutti.slice(0, 6), [], 'programmi con un conflitto o oltre 4 giorni di fila: ' + brutti.length);
});
