/* INT-2f (revisione indipendente dell'onda 2e, minori 1-3): le parole e i campi della modalita Forza dicono cio che il programma fa.
   1. `prog.modalita` restava «forza» anche quando il powerlifting non si attiva (minorenne, 65+, PAR-Q, 2 giorni, fastidio, eta mancante): un rischio per chi la legge dopo (W3-T6). Ora dice «generale».
   2. Con l eta mancante la nota diceva «carichi e ripetizioni piu prudenti» (falso: l eta non detta vale adulto, e il programma ha anche l AMRAP): una nota a parte; e il refuso «ne ha 65» (non «né»).
   3. «Dove ti blocchi?» prometteva varianti e accessori a tutti: chi comincia ha la stessa alzata in ogni seduta (niente giorni medi e leggeri) e l accessorio della panca e solo ai cavi.
   Le prove sotto falliscono su e6ac7ad. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const a = caricaApp({ ora: LUNEDI });
const BASE = { goals: ['forza'], goal: 'forza', level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, freq: 'auto', forzaTipo: 'powerlifting', seme: 'mod' };
const prog = extra => a.json('buildProgram(' + JSON.stringify(Object.assign({}, BASE, extra)) + ')');
const haAlzate = p => p.sedute.some(s => s.esercizi.some(e => e.alzata));

test('modalita: il programma dice «forza» solo se il powerlifting si attiva davvero; altrimenti «generale»', () => {
  const casi = { attivo: {}, minorenne: { age: 16 }, over65: { age: 70 }, parq: { parq: 'si' }, dueGiorni: { days: 2 }, spalla: { fastidi: ['spalle'] }, schiena: { fastidi: ['schiena'] }, etaMancante: { age: undefined } };
  const out = {};
  Object.keys(casi).forEach(k => { const p = prog(casi[k]); out[k] = [haAlzate(p), p.modalita]; });
  assert.deepStrictEqual(out.attivo, [true, 'forza'], 'il caso attivo');
  Object.keys(casi).filter(k => k !== 'attivo').forEach(k => assert.deepStrictEqual(out[k], [false, 'generale'], k + ': il powerlifting non si attiva, la modalita non e «forza»: ' + JSON.stringify(out[k])));
  /* chi non ha chiesto il powerlifting: generale, come prima */
  assert.strictEqual(prog({ forzaTipo: undefined }).modalita, 'generale');
  assert.strictEqual(prog({ forzaTipo: 'generale' }).modalita, 'generale');
});

test('eta mancante: la nota dice che serve l eta, non «piu prudenti»; la nota dei prudenti non ha il refuso «ne ha 65»', () => {
  const note = p => p.note.join(' | ');
  const mancante = prog({ age: undefined });
  assert.ok(!haAlzate(mancante));
  assert.ok(/età/i.test(mancante.note.filter(n => /powerlifting/i.test(n)).join(' ')), 'una nota sul powerlifting parla dell eta: ' + note(mancante).slice(0, 400));
  assert.ok(!/più prudenti/.test(mancante.note.filter(n => /powerlifting/i.test(n)).join(' ')), 'l eta non detta non e un programma piu prudente');
  const minorenne = prog({ age: 16 });
  const nota = minorenne.note.find(n => /powerlifting/i.test(n));
  assert.ok(nota && /più prudenti/.test(nota), 'i minorenni leggono la nota dei prudenti: ' + nota);
  assert.ok(!/ne ha 65/.test(nota), 'senza il refuso: ' + nota);
});

test('«Dove ti blocchi?» promette solo il vero: chi comincia ha la stessa alzata ovunque, l accessorio della panca e un cavo', () => {
  const testo = a.g('FORZA_NOTA_PUNTI');
  assert.ok(/chi comincia/i.test(testo), testo);
  assert.ok(/cavo|cavi/i.test(testo), testo);
  /* e la prova che dice il vero: un principiante con un punto debole non ha varianti, un intermedio si */
  const principiante = prog({ level: 'principiante', puntiDeboli: ['panca-meta'] });
  const nomi = p => [].concat.apply([], p.sedute.map(s => s.esercizi.map(e => a.g('senzaEmoji')(e.name))));
  assert.ok(!nomi(principiante).some(n => /Panca con Pausa|Panca Presa Stretta/.test(n)), 'chi comincia non riceve la variante del punto debole: ' + nomi(principiante).join(', '));
  const esperto = prog({ puntiDeboli: ['panca-meta'] });
  assert.ok(nomi(esperto).some(n => /Panca Presa Stretta/.test(n)), 'chi ha esperienza riceve la variante: ' + nomi(esperto).join(', '));
});
