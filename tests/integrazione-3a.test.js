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

/* ============================================================================================================
   (c) la scheda Oggi conta la rampa di P3-B: le serie e i minuti della seduta sono quelli che la seduta avra quando si apre, e gli obiettivi della settimana le serie del piano
   (prima: 23 serie e 65 minuti alla settimana 1, la seduta ne aveva 18 e 54; «Obiettivi della settimana» sommava il picco, setsBase)
   ============================================================================================================ */
const FB = srpe => ({ srpe: srpe, arrivo: 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, esercizi: [] });
/* una seduta di tre giorni prima del lunedi della settimana n con tutti gli esercizi del piano: niente «prima volta» (INT-04) ne rientro (RIC-05), che non sono del piano */
function vaiConStoria(a, n) {
  H.vaiA(a, n, 0);
  const nomi = [];
  a.json('DAYS').forEach(g => (a.json('loadData()')[g] || []).forEach(e => { if (nomi.indexOf(e.name) === -1) nomi.push(e.name); }));
  const t = new Date(2026, 9, 5 + 7 * (n - 1) - 3, 12, 0, 0).getTime();
  a.storia([{ id: t, day: 'Venerdì', date: '02/10/2026', minuti: 50, prontezza: 80, exercises: [], feedback: FB(6),
    sessione: nomi.map(nome => ({ name: nome, rest: 90, sets: [1, 2, 3].map(() => ({ weight: 20, reps: 10, done: true, wasBerserk: false, rpe: 8 })) })) }]);
}
const PROFILI_OGGI = [{ nome: 'principiante', d: { level: 'principiante', days: 3 } }, { nome: 'intermedio', d: { level: 'intermedio', days: 4 } }, { nome: 'avanzato', d: { level: 'avanzato', days: 4 } }];

PROFILI_OGGI.forEach(pr => {
  test('(c) Oggi, ' + pr.nome + ': in ogni settimana del programma serie, ripetizioni, pause e minuti della scheda sono quelli della seduta aperta; gli obiettivi sono le serie del piano', () => {
    const { a, p } = H.telefono({ d: pr.d });
    const giorni = H.giorniDiAllenamento(a);
    let ridotte = 0, confrontate = 0;
    for (let n = 1; n <= p.settimane; n++) {
      vaiConStoria(a, n);
      const fase = a.json('settimanaProgramma().fase');
      /* le serie previste della settimana PRIMA di aprire i giorni: come le legge Oggi, e non cambiano mentre la settimana passa */
      const ob = a.json('obiettiviSettimana()');
      const previste = Object.keys(ob).reduce((t, k) => t + ob[k].previste, 0);
      let sedute = 0, apertaTot = 0, piccoTot = 0;
      giorni.forEach(g => {
        const stima = a.json('stimaSeduta(loadData()[' + JSON.stringify(g) + '])');
        const aperta = H.apriGiorno(a, g);
        const dopo = a.json('loadData()[' + JSON.stringify(g) + ']');
        assert.strictEqual(stima.esercizi.length, aperta.length);
        stima.esercizi.forEach((e, i) => {
          const o = dopo[i];
          assert.deepStrictEqual([e.sets, e.reps, e.weight, e.rest], [o.sets, o.reps, o.weight, o.rest], pr.nome + ' sett. ' + n + ' ' + g + ' ' + e.name);
          confrontate++; if (o.sets < o.setsBase) ridotte++;
          if (a.json('categoriaDi(' + JSON.stringify(o.name) + ')')) { apertaTot += o.sets; piccoTot += o.setsBase; }   /* Oggi conta spinta, tirata e gambe: non il core */
        });
        assert.strictEqual(stima.serie, dopo.reduce((t, e) => t + e.sets, 0), 'serie della scheda = serie della seduta');
        assert.strictEqual(stima.minuti, Math.round(a.json('durataSeduta(loadData()[' + JSON.stringify(g) + '])')), 'minuti della scheda = minuti della seduta aperta');
        sedute++;
      });
      assert.strictEqual(previste, apertaTot, pr.nome + ' settimana ' + n + ' (' + fase + '): le serie previste della settimana sono quelle del piano (non il picco ' + piccoTot + ')');
      if (n === 1) assert.ok(apertaTot < piccoTot, pr.nome + ': alla settimana 1 il volume e sotto il picco (rampa): ' + apertaTot + ' contro ' + piccoTot);
      assert.ok(sedute >= 2);
    }
    assert.ok(confrontate > 40 && ridotte > 0, 'la prova guarda esercizi con la rampa (' + ridotte + ' su ' + confrontate + ')');
  });
});

test('(c) Oggi senza consenso: la seduta e il piano com e (nessuna chiamata alla catena dei carichi)', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' }, consenso: false });
  const g = H.giorniDiAllenamento(a)[0];
  const piano = a.json('loadData()[' + JSON.stringify(g) + ']');
  const stima = a.json('stimaSeduta(loadData()[' + JSON.stringify(g) + '])');
  assert.deepStrictEqual(stima.esercizi.map(e => e.sets), piano.map(e => e.sets));
  assert.strictEqual(stima.alzati, 0);
  const ob = a.json('obiettiviSettimana()');
  const picco = a.json('DAYS').reduce((t, d) => t + (a.json('(loadData()[' + JSON.stringify(d) + '] || [])').filter(e => a.json('categoriaDi(' + JSON.stringify(e.name) + ')')).reduce((s, e) => s + (e.setsBase || e.sets), 0)), 0);
  assert.strictEqual(Object.keys(ob).reduce((t, k) => t + ob[k].previste, 0), picco, 'senza consenso: il picco');
});

/* ============================================================================================================
   (d) INT-04 e la rampa alla prima esposizione: non si sommano (prima: un esercizio da 4 serie nuovo alla settimana 1 faceva 2 serie: 3 per la rampa, 2 per la prima volta)
   ============================================================================================================ */
const nuovoEsercizio = (a, picco) => a.json('caricoProssimo(' + JSON.stringify(PANCA) + ', 40, 8, ' + picco + ')');   /* senza storico: tipo «nuovo» */

test('(d) prima esposizione alla settimana 1 (rampa 0,75): da 4 serie a 3, non a 2; il RIR in piu della prima volta resta', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  assert.strictEqual(a.json('settimanaProgramma().numero'), 1);
  const r = nuovoEsercizio(a, 4);
  assert.strictEqual(r.tipo, 'nuovo');
  assert.strictEqual(r.sets, 3, 'rampa: round(4 x 0,75) = 3; la prima volta non toglie una seconda serie: ' + r.motivo);
  assert.doesNotMatch(r.motivo, /prima volta: una serie in meno/);
  assert.strictEqual(a.json('rirExtraIntensita(' + JSON.stringify(PANCA) + ')'), 1, 'il RIR in piu della prima volta resta');
});

test('(d) senza rampa (settimana 3, fattore 0,95 su 4 serie = 4) la prima volta toglie una serie come prima; con MES-03 spenta anche alla settimana 1', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' }, sett: 3 });
  const r = nuovoEsercizio(a, 4);
  assert.strictEqual(r.sets, 3);
  assert.match(r.motivo, /prima volta: una serie in meno/);
  const b = H.telefono({ d: { level: 'intermedio' } }).a;
  b.spegni(['MES-03']);
  const r1 = nuovoEsercizio(b, 4);
  assert.strictEqual(r1.sets, 3, 'rampa spenta: le 4 serie del picco, una in meno alla prima volta');
  assert.match(r1.motivo, /prima volta: una serie in meno/);
});

test('(d) mai sotto 2 serie: la prima volta di un esercizio da 3 serie alla settimana 1 (rampa 3 -> 2) resta a 2; da 2 serie niente', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  assert.strictEqual(nuovoEsercizio(a, 3).sets, 2);
  assert.strictEqual(nuovoEsercizio(a, 2).sets, 2);
  const p = H.telefono({ d: { level: 'principiante', days: 3 } }).a;
  assert.strictEqual(nuovoEsercizio(p, 4).sets, 2, 'principiante settimana 1: 2 serie (piano 2/2), non una in meno');
});

test('(d) programma della v1 (senza piano, senza rampa): la prima volta toglie una serie come sempre', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' }, v1: true });
  const r = nuovoEsercizio(a, 4);
  assert.strictEqual(r.sets, 3);
  assert.match(r.motivo, /prima volta: una serie in meno/);
});
