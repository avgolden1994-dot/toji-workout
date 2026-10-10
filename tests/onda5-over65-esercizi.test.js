/* ETA-19 (onda 5): dopo i 65 anni gli esercizi «da evitare» (soglie-popolazioni.js, over65Evitare: stacchi da terra, trap bar, military press...) sono l ultima scelta di un posto della scheda.
   Aperto di onda-4: SAF-05 sulla fascia senior della matrice completa (21.600 profili di 70 anni) 113 programmi, Stacco con Trap Bar 86 e Military Press 35, lo stesso prima e dopo P4-S.
   Causa trovata: con 5-6 sedute e i soli pesi liberi (bilanciere, manubri, sbarra) il terzo posto della cerniera dell anca prendeva il trap bar e il terzo della spinta verticale il military,
   perche RID-02 (lo stesso esercizio al massimo in due sedute) lasciava solo loro tra i candidati «freschi». Ora un candidato gia usato due volte vince su uno da evitare; se non c e nessun altro,
   l esercizio da evitare resta (il posto non si perde). Sotto i 65 anni: byte-identici. Prima (coach-v2-onda-4-bis): la regola non esisteva (= regola spenta).
   Prove in node con l app vera in vm (tests/aiuto-app.js). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const EVITARE = /Military Press|Stacco con Trap Bar|Stacco da Terra|Stacco Sumo|Good Morning|Front Squat|Nordic Curl|Ab Wheel|Tirate al Mento|Pike Push-up/;
const BARRA = ['bilanciere', 'manubri', 'sbarra'];
const senior = (days, goals, level, seme) => ({ level: level, days: days, minutes: 60, goals: goals, sex: 'M', age: 70, parq: 'no', luogo: 'palestra', fastidi: [], priorita: [], attrezziPalestra: BARRA, seme: seme });
const nomi = p => [].concat.apply([], p.sedute.map(s => s.esercizi.map(e => e.name)));
const schema = (a, nome) => (a.json('attributi(' + JSON.stringify(nome) + ')') || {}).schema;
function costruisci(a, d, spenta) { if (spenta) a.spegni(['ETA-19']); else a.riaccendi(); return a.dati(a.chiama('buildProgram', d)); }

const CASI = [senior(5, ['forza'], 'intermedio', 'o5-sen-5forzaintermediobarra'), senior(5, ['massa'], 'avanzato', 'o5-sen-5massaavanzatobarra'), senior(5, ['salute'], 'avanzato', 'o5-sen-5saluteavanzatobarra')];

test('ETA-19 spenta (= prima): a 70 anni con 5 sedute e i soli pesi liberi la scheda ha lo Stacco con Trap Bar', () => {
  const a = caricaApp({ ora: ORA });
  CASI.forEach(d => assert.ok(nomi(costruisci(a, d, true)).some(n => /Stacco con Trap Bar/.test(n)), d.seme + ': prima c era il trap bar'));
});

test('ETA-19 accesa: nessun esercizio da evitare, e ogni seduta che aveva una cerniera dell anca ce l ha ancora (la copertura del posto non si perde)', () => {
  const a = caricaApp({ ora: ORA });
  CASI.forEach(d => {
    const prima = costruisci(a, d, true), dopo = costruisci(a, d, false);
    const trovati = nomi(dopo).filter(n => EVITARE.test(n));
    assert.deepStrictEqual(trovati, [], d.seme + ': ' + trovati.join(', '));
    prima.sedute.forEach((s, i) => {
      const hingePrima = s.esercizi.some(e => schema(a, e.name) === 'hinge'), hingeDopo = dopo.sedute[i].esercizi.some(e => schema(a, e.name) === 'hinge');
      if (hingePrima) assert.ok(hingeDopo, d.seme + ' ' + s.giorno + ': la cerniera dell anca resta');
      const vertPrima = s.esercizi.some(e => schema(a, e.name) === 'spintaV'), vertDopo = dopo.sedute[i].esercizi.some(e => schema(a, e.name) === 'spintaV');
      if (vertPrima) assert.ok(vertDopo, d.seme + ' ' + s.giorno + ': la spinta verticale resta');
      assert.ok(dopo.sedute[i].esercizi.length >= 3, 'almeno 3 esercizi');
    });
    /* lo stesso numero di sedute e, in tutta la settimana, al massimo due esercizi in meno (il solutore ridistribuisce) */
    assert.strictEqual(dopo.sedute.length, prima.sedute.length);
    const nPrima = nomi(prima).length, nDopo = nomi(dopo).length;
    assert.ok(nDopo >= nPrima - 2, d.seme + ': esercizi nella settimana ' + nPrima + ' -> ' + nDopo);
  });
});

test('ETA-19: con un solo candidato l esercizio da evitare resta (il posto non si perde): la funzione preferisce, non vieta', () => {
  const a = caricaApp({ ora: ORA });
  const f = a.g("(function () { const f = eserciziDaEvitareOver65({ over65: true }); return [f('🦵 Stacco con Trap Bar'), f('Military Press'), f('🍑 Stacco Rumeno'), f('Shoulder Press Machine')]; })()");
  assert.deepStrictEqual(a.dati(f), [true, true, false, false]);
  assert.strictEqual(a.g('eserciziDaEvitareOver65({ over65: false })'), null);
  a.spegni(['ETA-19']);
  assert.strictEqual(a.g('eserciziDaEvitareOver65({ over65: true })'), null, 'spenta: non si applica');
});

test('ETA-19 non tocca chi ha meno di 65 anni (nemmeno con il PAR-Q positivo): programmi byte-identici con la regola accesa e spenta', () => {
  const a = caricaApp({ ora: ORA });
  [Object.assign({}, CASI[0], { age: 30 }), Object.assign({}, CASI[1], { age: 45, parq: 'si' }), Object.assign({}, CASI[2], { age: 17 })].forEach(d => {
    assert.strictEqual(JSON.stringify(costruisci(a, d, true)), JSON.stringify(costruisci(a, d, false)), d.seme + ' a ' + d.age + ' anni');
  });
});
