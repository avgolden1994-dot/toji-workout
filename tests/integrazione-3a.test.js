/* Collegamenti tra i pacchetti della sotto-onda 3a (INT-3a: P3-M, P3-A, P3-B, P3-G fusi), ognuno con la prova scritta PRIMA della correzione (rossa sul codice dei quattro
   rami fusi, verde dopo): (b) la griglia dei pesi di P3-A anche dove P3-B e le fasi 50 arrotondavano ancora a 0,5 kg; (c) la scheda Oggi conta la rampa di P3-B;
   (d) la «prima volta» di INT-04 non taglia le serie che la rampa ha gia ridotto; (e) le fasi nell elenco di fasi.js. Come lavora: l app VERA in vm (tests/aiuto-app.js,
   tests/aiuto-atleta-piano.js: un telefono con un programma v2, orologio finto). I numeri attesi sono scritti qui, non «meglio di prima». */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const H = require('./aiuto-atleta-piano');

const PANCA = '💪 Panca Piana Bilanciere';          /* bilanciere: griglia di 2,5 kg */
const LENTO = '🛡️ Lento Avanti Manubri';            /* manubri, multiarticolare: da 10 kg passi di 2 kg */
const LEG = '🦵 Leg Press';                         /* macchina: pila a passi di 2,5 kg */

/* ============================================================================================================
   (b) arrotondamenti residui: prontezza.js e la fase 50 portano il carico sulla griglia dell attrezzo (prima: 0,5 kg per qualunque attrezzo)
   ============================================================================================================ */
function conPianoDelGiorno(esercizi) {
  const a = caricaApp({ ora: '2026-10-05T12:00:00' });
  a.profilo({ level: 'intermedio', age: 30, sex: 'M' });
  const GIORNO = 'Lunedì';
  a.scrivi(a.chiave('dataKey'), { [GIORNO]: esercizi.map(e => ({ name: e.nome, sets: 3, reps: 8, weight: e.kg, rest: 90,
    completedSets: [0, 1, 2].map(() => ({ done: false, reps: 8, weight: e.kg, wasBerserk: false })) })) });
  a.g('currentDay = ' + JSON.stringify(GIORNO));
  return { a, GIORNO };
}
const pesiDelGiorno = (a, g) => a.json('loadData()')[g].map(e => e.weight);
const noteDelGiorno = (a, g) => a.json('loadData()')[g].map(e => e.coachNote);

test('(b) prontezza bassa: i multiarticolari scendono del 10% sulla griglia dell attrezzo (prima: 57,5 x 0,9 = 51,75 -> 52 a passi di 0,5 kg)', () => {
  const { a, GIORNO } = conPianoDelGiorno([{ nome: PANCA, kg: 57.5 }, { nome: LEG, kg: 100 }]);
  a.g('applicaProntezza({ sonno: 0, stress: 0, dolenzia: 0, voglia: 0 })');
  const pesi = pesiDelGiorno(a, GIORNO);
  assert.strictEqual(pesi[0], 52.5, 'bilanciere: 51,75 -> 52,5 (griglia di 2,5 kg), non 52');
  assert.strictEqual(pesi[1], 90, 'macchina: 100 x 0,9 = 90, sulla pila a passi di 2,5 kg');
});

test('(b) prontezza media (-4%): sulla griglia, mai sopra il carico di prima, e se la griglia allontana dalla dose lo dice (manubri a passi di 2 kg)', () => {
  const { a, GIORNO } = conPianoDelGiorno([{ nome: LENTO, kg: 20 }, { nome: PANCA, kg: 100 }]);
  a.g('applicaProntezza({ sonno: 1, stress: 1, dolenzia: 1, voglia: 1 })');   /* punteggio 50: fascia media */
  const pesi = pesiDelGiorno(a, GIORNO), note = noteDelGiorno(a, GIORNO);
  assert.strictEqual(pesi[0], 18, '20 kg x 0,96 = 19,2: i manubri da 19 non esistono, il primo peso sotto e 18 (prima: 19)');
  assert.match(note[0], /-4%/);
  assert.match(note[0], /con questo attrezzo il peso più vicino è 18 kg/, 'la dose non si carica: il motivo dice il peso vero (ALG-06)');
  assert.strictEqual(pesi[1], 95, '100 x 0,96 = 96 -> 95 sul bilanciere (griglia di 2,5 kg; prima 96)');
  assert.doesNotMatch(note[1], /peso più vicino/, 'scostamento sotto il 3%: nessuna nota');
});

test('(b) con ALG-06 spenta la prontezza arrotonda come prima (0,5 kg)', () => {
  const { a, GIORNO } = conPianoDelGiorno([{ nome: PANCA, kg: 57.5 }]);
  a.spegni(['ALG-06']);
  a.g('applicaProntezza({ sonno: 0, stress: 0, dolenzia: 0, voglia: 0 })');
  assert.strictEqual(pesiDelGiorno(a, GIORNO)[0], 52);
});

test('(b) scarico del programma v2 di un esercizio mai fatto: il carico del programma x la dose sta sulla griglia (prima: 60 x 0,9 = 54 a passi di 0,5 kg, poi 52,5 per difetto dalla fase 95)', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  H.vaiA(a, 6, 0);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  const dose = a.json('livelloFatica()'), f = { bassa: 0.95, media: 0.9, alta: 0.9 }[dose];
  const r = a.json('caricoProssimo(' + JSON.stringify(PANCA) + ', 60, 8, 4)');
  assert.strictEqual(r.tipo, 'scarico');
  assert.strictEqual(r.weight, f === 0.9 ? 55 : 57.5, 'dose ' + dose + ': 60 x ' + f + ' sulla griglia del bilanciere (2,5 kg): ' + r.motivo);
});

test('(b) «extra» degli aggiusti: l incremento in piu sta sulla griglia e il motivo dice di quanto sale davvero (prima: +1 kg dichiarato, poi tolto dalla fase 95)', () => {
  const a = caricaApp({ ora: '2026-10-05T10:00:00' });
  a.profilo({ level: 'intermedio', age: 30, sex: 'M' });
  const CURL = '🦾 Curl su Panca Inclinata';   /* manubri, isolamento: +1 kg */
  a.storia([a.seduta(3, [{ nome: CURL, serie: [[14, 10, true], [14, 10, true], [14, 10, true]] }])]);
  a.spegni(['ALG-02']);                         /* il ramo «extra» senza il controllo ALG-02 («su» = aumento di carico) */
  a.aggiusti({ esercizi: { [CURL]: { extra: true, sedute: 1 } }, scarico: null });
  const r = a.json('caricoProssimo(' + JSON.stringify(CURL) + ', 14, 10, 3)');
  assert.strictEqual(r.tipo, 'su');
  assert.strictEqual(r.weight, 16, '14 kg + 1 kg di incremento e 1 kg di extra: dalla griglia dei manubri (passi di 2 kg) il primo peso sopra e 16');
  assert.match(r.motivo, /\+2 kg in più: l ultima volta era leggero/);
});
