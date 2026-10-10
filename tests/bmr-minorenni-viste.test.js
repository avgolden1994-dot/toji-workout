/* Il metabolismo basale in kcal (bmr, la misura della BIA inserita dall utente) non si mostra ai minorenni anche nelle altre viste
   dove compariva ancora (ETA-04, D-P26): il passo BIA dell onboarding (renderBiaStep, js/ui/onboarding.js) e Opzioni › BIA
   (renderBiaSheet e salvaBiaAgente, js/coach/bia/opzioni.js). Il criterio sta in un solo helper (bmrNascostoPerEta, js/coach/bia/bmr-minorenni.js).
   Gli adulti (18 anni e piu) e l eta non detta restano come prima. Il dato salvato non si cancella ne si sovrascrive: salvare senza il campo
   a mano lascia il bmr com era. Esegue il codice vero dell app in node (vm), senza browser. Lancio: npm test
   Le prove sui minorenni devono FALLIRE sul codice di prima e passare dopo la correzione. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const BMR = 1650;
const BIA = { peso: 70, altezza: 175, fmPerc: 20, ffm: 56, bmr: BMR };
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };

/* il passo BIA dell onboarding (renderBiaStep, HTML) per una persona di questa eta, con un referto che ha il bmr; manuale: i campi a mano aperti */
function passoBia(eta, manuale) {
  const app = caricaApp({ ora: ORA });
  app.ctx.__d = JSON.parse(JSON.stringify(Object.assign({}, BASE, { age: eta, bia: BIA })));
  const html = app.g('(function(){ onbData = __d; onbManuale = ' + (manuale ? 'true' : 'false') + '; return renderBiaStep(); })()');
  return { app, html };
}

/* Opzioni › BIA (renderBiaSheet) con il profilo salvato di questa eta e una lettura del referto che ha il bmr: la pagina va in #bia-body */
function paginaBia(eta) {
  const app = caricaApp({ ora: ORA });
  app.profilo({ age: eta });
  const body = { innerHTML: '' };
  app.ctx.document = { getElementById: id => (id === 'bia-body' ? body : null) };
  app.g('biaLetta = ' + JSON.stringify({ peso: 70, fmPerc: 20, ffm: 56, bmr: BMR }));
  app.g('renderBiaSheet()');
  return { app, html: body.innerHTML };
}

/* il DOM del foglio: un campo assente vale null, come nel DOM vero */
function domBia(campi) {
  return { getElementById: id => (Object.prototype.hasOwnProperty.call(campi, id) ? campi[id] : null) };
}

/* salva dal foglio Opzioni › BIA (salvaBiaAgente) con il profilo di questa eta; prima: una misura gia salvata oggi (o null) */
function salva(eta, campi, prima) {
  const app = caricaApp({ ora: ORA });
  app.profilo({ age: eta });
  if (prima) app.g('aggiungiBia(' + JSON.stringify(prima) + ')');
  app.ctx.renderAgent = () => {};
  app.ctx.showUndo = () => {};
  app.ctx.document = domBia(campi);
  app.chiama('salvaBiaAgente');
  return app;
}

test('ETA-04 (un solo criterio): bmrNascostoPerEta nasconde da 1 a 17 anni; 0, eta non detta, 18 e oltre no', () => {
  const app = caricaApp({ ora: ORA });
  const casi = [['13', true], ['15', true], ["'15'", true], ['17', true], ['18', false], ['30', false], ['0', false], ['null', false], ['undefined', false], ["''", false]];
  casi.forEach(([espressione, atteso]) => {
    assert.strictEqual(app.g('bmrNascostoPerEta(' + espressione + ')'), atteso, 'bmrNascostoPerEta(' + espressione + ')');
  });
});

test('ETA-04 (passo BIA dell onboarding): il minorenne non vede il metabolismo basale ne il campo a mano', () => {
  [13, 15, 17].forEach(eta => {
    const { html } = passoBia(eta, true);
    assert.ok(!/Metabolismo basale/.test(html), eta + ' anni: il metabolismo basale non deve comparire (riepilogo ne campo)');
    assert.ok(html.indexOf(String(BMR)) === -1, eta + ' anni: il valore ' + BMR + ' non deve comparire');
    assert.ok(!/data-bia="bmr"/.test(html), eta + ' anni: il campo a mano del metabolismo non deve esserci');
    assert.ok(/data-bia="fmPerc"/.test(html), eta + ' anni: gli altri campi a mano restano');
    assert.ok(/<span>Massa grassa<\/span><b>20%<\/b>/.test(html), eta + ' anni: la massa grassa letta resta visibile');
  });
});

test('ETA-04 (passo BIA dell onboarding): adulti (18, 30, 64 anni) vedono il metabolismo basale e il campo a mano come prima', () => {
  [18, 30, 64].forEach(eta => {
    const { html } = passoBia(eta, true);
    assert.ok(/<span>Metabolismo basale<\/span><b>1650 kcal<\/b>/.test(html), eta + ' anni: deve comparire «Metabolismo basale 1650 kcal»');
    assert.ok(/data-bia="bmr"/.test(html), eta + ' anni: il campo a mano del metabolismo deve esserci');
  });
});

test('ETA-04 (Opzioni › BIA): il minorenne non vede il metabolismo ne il campo a mano, il resto del foglio si', () => {
  [13, 15, 17].forEach(eta => {
    const { html } = paginaBia(eta);
    assert.ok(!/<span>Metabolismo<\/span>/.test(html), eta + ' anni: il metabolismo nel riepilogo del referto non deve comparire');
    assert.ok(html.indexOf(String(BMR)) === -1, eta + ' anni: il valore ' + BMR + ' non deve comparire');
    assert.ok(!/id="ag-bmr"/.test(html), eta + ' anni: il campo a mano del metabolismo non deve esserci');
    assert.ok(!/Metabolismo \(kcal\)/.test(html), eta + ' anni: l etichetta del campo non deve esserci');
    assert.ok(/id="ag-peso"/.test(html), eta + ' anni: il campo del peso a mano resta');
    assert.ok(/Letti dal referto/.test(html), eta + ' anni: il riepilogo del referto resta');
    assert.ok(/<span>Massa grassa<\/span>/.test(html), eta + ' anni: la massa grassa letta resta visibile');
  });
});

test('ETA-04 (Opzioni › BIA): adulti (18, 30 anni) vedono il metabolismo nel riepilogo e il campo a mano come prima', () => {
  [18, 30].forEach(eta => {
    const { html } = paginaBia(eta);
    assert.ok(/<span>Metabolismo<\/span><b>1650 kcal<\/b>/.test(html), eta + ' anni: deve comparire «Metabolismo 1650 kcal»');
    assert.ok(/id="ag-bmr"/.test(html), eta + ' anni: il campo a mano del metabolismo deve esserci');
  });
});

test('ETA-04 (Opzioni › BIA): salvare senza il campo del metabolismo lascia il bmr gia salvato per oggi com era', () => {
  [13, 15, 17].forEach(eta => {
    const app = salva(eta, { 'ag-peso': { value: '71' }, 'ag-fm': { value: '' }, 'ag-ffm': { value: '' } },
      { peso: 70, fmPerc: 20, ffm: 56, bmr: BMR });
    const st = app.json('getBiaStorico()');
    assert.strictEqual(st.length, 1, eta + ' anni: una misura per data');
    assert.strictEqual(st[0].valori.peso, 71, eta + ' anni: il salvataggio c e stato (peso 71)');
    assert.strictEqual(st[0].valori.bmr, BMR, eta + ' anni: il bmr salvato non cambia');
  });
});

test('ETA-04 (Opzioni › BIA): salvare senza il campo del metabolismo non scrive un bmr nuovo', () => {
  [13, 15, 17].forEach(eta => {
    const app = salva(eta, { 'ag-peso': { value: '71' }, 'ag-fm': { value: '' }, 'ag-ffm': { value: '' } }, null);
    const st = app.json('getBiaStorico()');
    assert.strictEqual(st.length, 1, eta + ' anni: una misura salvata');
    assert.ok(!('bmr' in st[0].valori), eta + ' anni: nessun bmr deve essere scritto');
  });
});

test('ETA-04 (Opzioni › BIA): compilaBiaAgente non va in errore se il campo del metabolismo non c e', () => {
  const app = caricaApp({ ora: ORA });
  app.profilo({ age: 15 });
  app.ctx.document = domBia({ 'ag-peso': { value: '' }, 'ag-fm': { value: '' }, 'ag-ffm': { value: '' } });
  assert.doesNotThrow(() => app.chiama('compilaBiaAgente', { peso: 70, bmr: BMR }));
  assert.strictEqual(app.ctx.document.getElementById('ag-peso').value, 70, 'il peso letto si compila');
});

test('adulti (Opzioni › BIA): il campo a mano del metabolismo si salva come prima', () => {
  const app = salva(30, { 'ag-peso': { value: '71' }, 'ag-fm': { value: '' }, 'ag-ffm': { value: '' }, 'ag-bmr': { value: '1700' } },
    { peso: 70, fmPerc: 20, ffm: 56, bmr: BMR });
  const st = app.json('getBiaStorico()');
  assert.strictEqual(st[0].valori.bmr, 1700, 'l adulto che scrive 1700 lo ritrova salvato');
});
