/* Memoria di una chiamata (INT-2b, velocità del generatore): js/core/memoria-chiamata.js e il suo uso in buildProgram.
   Fuori dal generatore non c e nessuna memoria (memoriaTabella da null: le funzioni calcolano come sempre); dentro buildProgram e aperta e si chiude
   sempre, anche quando il brief lancia l errore dell eta (ETA-01). Le funzioni che vi si appoggiano danno lo stesso risultato con la memoria aperta e
   chiusa, su tutta la libreria. Il golden di buildProgram (tests/genera-golden.test.js) prova che i programmi sono identici byte per byte.
   Il banco di prova e tests/aiuto-app.js (l app vera in vm). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { profili } = require('./aiuto-genera');

const ORA = '2026-10-05T12:00:00';
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', usaProfilo: false, seme: 'memoria-1' };

test('fuori dal generatore la memoria e chiusa: memoriaTabella da null e le funzioni non memorizzano niente', () => {
  const a = caricaApp({ ora: ORA });
  assert.strictEqual(a.g("memoriaTabella('findExercise')"), null);
  a.g("findExercise('💪 Panca Piana Bilanciere'); senzaEmoji('💪 Panca Piana Bilanciere'); schemaDi('Panca Piana Bilanciere'); regolaAttiva('RIC-03')");
  assert.strictEqual(a.g("memoriaTabella('senzaEmoji')"), null, 'anche dopo le chiamate resta chiusa');
});

test('dentro buildProgram la memoria e aperta (le tabelle si riempiono) e alla fine e chiusa, anche con l errore dell eta sotto i 13 anni (ETA-01)', () => {
  const a = caricaApp({ ora: ORA });
  a.g(`globalThis.__viste = null; const __orig = verificaProgramma; verificaProgramma = function(b, p) { __viste = { aperta: memoriaTabella('findExercise') !== null, voci: memoriaTabella('findExercise').size, consentito: memoriaTabella('consentito') !== null }; return __orig(b, p); };`);
  a.g('buildProgram(' + JSON.stringify(BASE) + ')');
  const viste = a.json('__viste');
  assert.strictEqual(viste.aperta, true, 'aperta durante la verifica finale');
  assert.ok(viste.voci > 50, 'findExercise memorizzato per molti nomi: ' + viste.voci);
  assert.strictEqual(viste.consentito, true, 'anche consentito');
  assert.strictEqual(a.g("memoriaTabella('findExercise')"), null, 'chiusa alla fine');
  assert.throws(() => a.g('buildProgram(' + JSON.stringify(Object.assign({}, BASE, { age: 12 })) + ')'), /13/, 'ETA-01 lancia');
  assert.strictEqual(a.g("memoriaTabella('findExercise')"), null, 'chiusa anche dopo l errore');
  /* chiamate annidate: chiude solo l ultima */
  a.g('memoriaApri(); memoriaApri(); memoriaChiudi()');
  assert.notStrictEqual(a.g("memoriaTabella('prova')"), null, 'ancora aperta dopo una sola chiusura');
  a.g('memoriaChiudi()');
  assert.strictEqual(a.g("memoriaTabella('prova')"), null);
  assert.doesNotThrow(() => a.g('memoriaChiudi()'), 'una chiusura di troppo non fa niente');
});

test('con la memoria aperta le funzioni per nome danno lo stesso risultato di quando e chiusa, su tutta la libreria (findExercise, senzaEmoji, schemaDi, tipoCarico, attrezzoDi, creditoSerie, consentito, isTimeBased, dettaglioEsercizio)', () => {
  const a = caricaApp({ ora: ORA });
  const prefs = { luogo: 'manubri', fastidi: ['spalle'], esclusi: [], odiati: [], graditi: [], priorita: [] };
  const raccogli = () => a.json(`EXERCISE_LIBRARY.map(e => [findExercise(e.name) === e, senzaEmoji(e.name), schemaDi(e.name), tipoCarico(e.name), attrezzoDi(senzaEmoji(e.name)), creditoSerie(e.name), consentito(e.name, __prefs), isTimeBased(e.name), dettaglioEsercizio(e.name), bersaglioDi(e.name), strChiave(e), regolaAttiva('RIC-03')])`);
  a.ctx.__prefs = a.g('(' + JSON.stringify(prefs) + ')');
  const chiusa = raccogli();
  a.g('memoriaApri()');
  const aperta1 = raccogli(), aperta2 = raccogli();   /* la seconda volta legge dalla memoria */
  a.g('memoriaChiudi()');
  assert.deepStrictEqual(aperta1, chiusa);
  assert.deepStrictEqual(aperta2, chiusa);
  assert.ok(chiusa.length > 100 && chiusa.every(r => r[0] === true), 'tutta la libreria (' + chiusa.length + ' esercizi) e findExercise da l oggetto della libreria');
});

test('velocita (misura, non golden): 60 profili del golden, mediana sotto i 100 ms e nessun errore (il piano chiede mediana < 50 ms alla fine; misurato in INT-2b: 2a 13,5 ms, 2b 69 ms, dopo la memoria e il solutore 31 ms)', () => {
  const a = caricaApp({ ora: ORA });
  const lista = profili(a, 60, 'memoria');
  a.ctx.__lista = JSON.parse(JSON.stringify(lista));
  a.ctx.__orologio = () => Number(process.hrtime.bigint() / 1000n) / 1000;
  a.g('__lista.slice(0, 5).forEach(p => buildProgram(p))');
  const tempi = a.json('__lista.map(p => { const t = __orologio(); buildProgram(p); return __orologio() - t; })').sort((x, y) => x - y);
  const mediana = tempi[Math.floor(tempi.length / 2)];
  assert.ok(mediana < 100, 'mediana ' + mediana.toFixed(1) + ' ms');
  assert.deepStrictEqual(a.errori, []);
});
