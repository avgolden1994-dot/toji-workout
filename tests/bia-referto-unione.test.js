/* Il referto PDF non azzera le misure gia salvate per la stessa data.
   Chi carica un referto (salvaBiaLetta, js/coach/bia/opzioni.js) e chi fa il questionario con la BIA letta (applyGeneratedProgram,
   js/coach/programma/alternative.js) chiedono la fusione ad aggiungiBia con { unisci: true } (js/coach/programma/archivio.js):
   un campo che il referto non riporta (null o assente) lascia il valore gia salvato per quella data; un campo che il referto
   riporta vince. Il bmr (metabolismo basale) e il caso che ha fatto perdere il dato, ma vale per tutti i campi della voce.
   Il form a mano di Opzioni › BIA (salvaBiaAgente) NON fonde: quello che c e nel form e quello che si salva (un campo vuoto si toglie).
   Esegue il codice vero dell app in node (vm), senza browser. Lancio: npm test
   Le prove con un valore gia salvato devono FALLIRE sul codice di prima e passare dopo la correzione. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const OGGI = '2026-10-05';

/* il referto come lo restituisce parseBiaText: ogni campo c e, null se il PDF non lo riporta */
function referto(campi) {
  const r = { peso: null, altezza: null, fmPerc: null, fm: null, ffm: null, smm: null, tbw: null, bmr: null, bmi: null,
    phase: null, ecw: null, viscerale: null, proteine: null, minerali: null, storico: [] };
  return Object.assign(r, campi);
}

/* lo storico salvato prima del referto (scritto direttamente, senza passare dal codice in prova); poi si carica il referto
   e si preme «Salva la BIA» (salvaBiaLetta) */
function salvaReferto(storicoPrima, letto) {
  const app = caricaApp({ ora: ORA });
  app.scrivi(app.g('biaKey()'), storicoPrima || []);
  app.ctx.renderBiaSheet = () => {};
  app.ctx.showUndo = () => {};
  app.g('biaLetta = ' + JSON.stringify(letto));
  app.chiama('salvaBiaLetta');
  return app;
}

/* il foglio Opzioni › BIA a mano: una misura gia salvata oggi (o nessuna), i campi del form (un campo assente dal form non c e nel DOM) */
function salvaForm(eta, prima, campi) {
  const app = caricaApp({ ora: ORA });
  app.profilo({ age: eta });
  if (prima) app.scrivi(app.g('biaKey()'), [{ data: OGGI, valori: prima }]);
  app.ctx.renderAgent = () => {};
  app.ctx.showUndo = () => {};
  app.ctx.document = { getElementById: id => (Object.prototype.hasOwnProperty.call(campi, id) ? { value: campi[id] } : null) };
  app.chiama('salvaBiaAgente');
  return app;
}

test('referto senza bmr: il metabolismo basale gia salvato per quella data resta (1700)', () => {
  const app = salvaReferto(
    [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 } }],
    referto({ data: OGGI, peso: 71, fmPerc: 19.5, ffm: 57.5 }));
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st.length, 1, 'una misura per data');
  assert.strictEqual(st[0].valori.bmr, 1700, 'il bmr salvato non si azzera');
  assert.strictEqual(st[0].valori.peso, 71, 'il peso del referto vince');
  assert.strictEqual(st[0].valori.fmPerc, 19.5, 'la massa grassa del referto vince');
});

test('referto con bmr 1800: il metabolismo del referto vince sul 1700 salvato', () => {
  const app = salvaReferto(
    [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 } }],
    referto({ data: OGGI, peso: 71, fmPerc: 19.5, ffm: 57.5, bmr: 1800 }));
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st.length, 1, 'una misura per data');
  assert.strictEqual(st[0].valori.bmr, 1800, 'il bmr del referto sostituisce quello salvato');
});

test('data nuova senza voce: la misura si crea con i soli campi del referto, come prima', () => {
  const app = salvaReferto([], referto({ data: '2026-09-20', peso: 79, fmPerc: 21, ffm: 62.4 }));
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st.length, 1, 'una misura creata');
  assert.strictEqual(st[0].data, '2026-09-20', 'con la data del referto');
  assert.deepStrictEqual(st[0].valori, { peso: 79, fmPerc: 21, ffm: 62.4 }, 'solo i campi letti, nessun null e nessun bmr');
});

test('referto senza acqua, muscolo, viscerale, altezza: quei campi gia salvati per la data restano', () => {
  const app = salvaReferto(
    [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, tbw: 42, smm: 30, viscerale: 6, altezza: 175, bmi: 22.9 } }],
    referto({ data: OGGI, peso: 71, fmPerc: 19.5 }));
  const v = app.json('getBiaStorico()')[0].valori;
  assert.strictEqual(v.tbw, 42, 'acqua totale');
  assert.strictEqual(v.smm, 30, 'muscolo scheletrico');
  assert.strictEqual(v.viscerale, 6, 'grasso viscerale');
  assert.strictEqual(v.altezza, 175, 'altezza');
  assert.strictEqual(v.bmi, 22.9, 'BMI');
  assert.strictEqual(v.ffm, 56, 'massa magra: il referto non la riporta, resta quella salvata');
  assert.strictEqual(v.peso, 71, 'il peso del referto vince');
});

test('storico stampato sul referto: una data gia salvata con bmr non perde il bmr, le altre date si aggiungono', () => {
  const app = salvaReferto(
    [{ data: '2026-09-20', valori: { peso: 78, fmPerc: 21, ffm: 61, bmr: 1600 } }],
    referto({ data: OGGI, peso: 71, fmPerc: 19.5, ffm: 57.5,
      storico: [{ data: '2026-09-20', valori: { peso: 79, smm: 31, fmPerc: 21, ffm: 62.4 } }] }));
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st.length, 2, 'due date: quella del referto e quella dello storico');
  const settembre = st.find(x => x.data === '2026-09-20');
  assert.strictEqual(settembre.valori.bmr, 1600, 'il bmr di settembre resta');
  assert.strictEqual(settembre.valori.peso, 79, 'il peso dello storico stampato vince');
});

test('aggiungiBia: senza opzioni la voce si riscrive come prima (un campo che manca si toglie); con { unisci: true } si fonde', () => {
  const app = caricaApp({ ora: ORA });
  app.scrivi(app.g('biaKey()'), [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 } }]);
  app.g("aggiungiBia({ peso: 71 }, '" + OGGI + "')");
  assert.deepStrictEqual(app.json('getBiaStorico()')[0].valori, { peso: 71 }, 'senza opzioni: nessuna fusione');
  app.scrivi(app.g('biaKey()'), [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 } }]);
  app.g("aggiungiBia({ peso: 71 }, '" + OGGI + "', { unisci: true })");
  assert.deepStrictEqual(app.json('getBiaStorico()')[0].valori, { peso: 71, fmPerc: 20, ffm: 56, bmr: 1700 }, 'con unisci: i campi mancanti restano');
});

test('form a mano (Opzioni › BIA): con il bmr di oggi gia salvato, salvare con il campo bmr vuoto toglie il bmr (il form e autorevole)', () => {
  const app = salvaForm(30, { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 },
    { 'ag-peso': '71', 'ag-fm': '', 'ag-ffm': '', 'ag-bmr': '' });
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st.length, 1, 'una misura per data');
  assert.strictEqual(st[0].valori.peso, 71, 'il salvataggio c e stato (peso 71)');
  assert.ok(!('bmr' in st[0].valori), 'il campo bmr vuoto non deve lasciare il 1700 di prima');
  assert.ok(!('ffm' in st[0].valori), 'la massa magra vuota non deve lasciare il 56 di prima');
});

test('form a mano (Opzioni › BIA): salvare con altri campi compilati e bmr 1800 scrive 1800', () => {
  const app = salvaForm(30, { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 },
    { 'ag-peso': '71', 'ag-fm': '19.5', 'ag-ffm': '57.5', 'ag-bmr': '1800' });
  const v = app.json('getBiaStorico()')[0].valori;
  assert.strictEqual(v.bmr, 1800, 'il bmr del form vince');
  assert.strictEqual(v.fmPerc, 19.5, 'la massa grassa del form');
  assert.strictEqual(v.ffm, 57.5, 'la massa magra del form');
});

test('ETA-04 (form a mano): un minorenne (15 anni) che salva senza il campo bmr lascia il bmr di oggi com era (1700)', () => {
  const app = salvaForm(15, { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 },
    { 'ag-peso': '71', 'ag-fm': '', 'ag-ffm': '' });
  const v = app.json('getBiaStorico()')[0].valori;
  assert.strictEqual(v.peso, 71, 'il salvataggio c e stato (peso 71)');
  assert.strictEqual(v.bmr, 1700, 'il bmr nascosto ai minorenni non si cancella dal form');
});

test('questionario con la BIA letta (applyGeneratedProgram): un referto senza bmr non cancella il bmr di oggi, anche per un minorenne', () => {
  [15, 30].forEach(eta => {
    const app = caricaApp({ ora: ORA });
    app.scrivi(app.g('biaKey()'), [{ data: OGGI, valori: { peso: 70, fmPerc: 20, ffm: 56, bmr: 1700 } }]);
    const risposte = { goals: ['salute'], goal: 'salute', level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', sonno: 'bene',
      attrezzi: 'indifferente', sex: 'uomo', age: eta, parq: 'no', freq: 'auto', fastidi: [], bia: { peso: 71, fmPerc: 19.5, ffm: 57.5 } };
    app.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(risposte) + ')');
    try { app.g('applyGeneratedProgram()'); } catch (e) { /* le schermate (DOM finto) possono lamentarsi DOPO aver scritto profilo e programma */ }
    const st = app.json('getBiaStorico()');
    assert.strictEqual(st.length, 1, eta + ' anni: una misura per data');
    assert.strictEqual(st[0].valori.peso, 71, eta + ' anni: il peso del referto vince');
    assert.strictEqual(st[0].valori.bmr, 1700, eta + ' anni: il bmr di oggi resta');
  });
});
