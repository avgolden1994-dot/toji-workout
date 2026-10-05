/* Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri.
   M1  Stacco Rumeno a una Gamba non e un esercizio da bilanciere (attrezzoDi) e resta fuori per i prudenti e per chi inizia (abilita 3);
   M3  i minorenni hanno almeno 2 ripetizioni in riserva in ogni percorso (rirBersaglio, esigenza);
   M5  Squat su Scatola e Sit-to-Stand sono esercizi di avvio: non per chi puo fare lo squat carico, e mai nella seduta che ha gia uno squat.
   Esegue il codice vero dell'app in node (vm), senza browser. Lancio: npm test
   Le prove devono FALLIRE sul codice di prima della correzione (i numeri di prima sono scritti accanto a ogni prova). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const app = caricaApp({ ora: ORA });
const senzaEmoji = n => app.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const costruisci = p => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, p)));
const nomiSeduta = sd => sd.esercizi.map(e => senzaEmoji(e.name));
const PERSONE = { adulto: { age: 30, parq: 'no' }, over65: { age: 70, parq: 'no' }, parq: { age: 30, parq: 'si' }, minorenne: { age: 16, parq: 'no' } };

/* una griglia piccola e sempre uguale: livello x luogo x giorni x obiettivo x persona (seme fisso nel nome) */
function griglia(persone) {
  const out = []; let i = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => ['palestra', 'manubri', 'corpo'].forEach(luogo => [3, 4, 5].forEach(days => [['massa'], ['salute'], ['glutei']].forEach(goals =>
    Object.keys(PERSONE).forEach(pk => { const n = i++; if (persone.indexOf(pk) !== -1) out.push(Object.assign({ level, luogo, days, goals, sex: n % 2 ? 'F' : 'M', seme: 'rev1-' + n }, PERSONE[pk], { _persona: pk })); })))));
  return out;
}
const programmi = persone => griglia(persone).map(p => { const q = Object.assign({}, p); delete q._persona; return { p, prog: costruisci(q) }; });

/* ============================================================================================================ M1 */
test('M1: Stacco Rumeno a una Gamba e un esercizio coi manubri, non col bilanciere (e gli elastici non sono macchine ne manubri)', () => {
  /* prima: 'bilanciere' (la regex /stacco/); Lat Pulldown e Face Pull con Elastico 'macchine', Alzate Laterali con Elastico 'manubri' */
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno a una Gamba'), 'manubri');
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno con Manubri'), 'manubri');
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno'), 'bilanciere');
  ['Lat Pulldown con Elastico', 'Alzate Laterali con Elastico', 'Face Pull con Elastico'].forEach(n => assert.strictEqual(app.g('attrezzoDi')(n), 'corpo', n));
  const nome = app.g('nomeInLibreria')('Stacco Rumeno a una Gamba');
  const cons = prefs => app.g('consentito')(nome, prefs);
  assert.strictEqual(cons({ luogo: 'palestra', attrezziPalestra: ['bilanciere'], fastidi: [] }), false, 'serve un manubrio: con il solo bilanciere non c e');
  assert.strictEqual(cons({ luogo: 'palestra', attrezziPalestra: ['manubri'], fastidi: [] }), true, 'una palestra con i soli manubri lo ha');
  assert.strictEqual(cons({ luogo: 'manubri', fastidi: [] }), true, 'a casa con i manubri e proprio dove serve (bio §5.5)');
});

test('M1: nessun prudente e nessun principiante riceve lo Stacco Rumeno a una Gamba; chi puo farlo lo riceve ancora', () => {
  /* sul codice di prima: 17 programmi su 243 di prudenti lo avevano (letto come bilanciere era ammesso in palestra), 0 dopo; chi ha esperienza: 2 programmi su 54 prima, 20 dopo
     (a casa con i manubri e dove la nota bio §5.5 lo voleva); chi inizia non lo ha mai: senza il divieto per i principianti sarebbero i 50 programmi della griglia larga della revisione */
  const cauti = programmi(['over65', 'parq', 'minorenne']), adulti = programmi(['adulto']);
  const con = lista => lista.filter(x => x.prog.sedute.some(sd => nomiSeduta(sd).indexOf('Stacco Rumeno a una Gamba') !== -1));
  assert.strictEqual(cauti.length, 243);
  assert.deepStrictEqual(con(cauti).map(x => x.p.seme), [], 'un prudente non riceve un esercizio di abilita 3');
  const principianti = adulti.filter(x => x.p.level === 'principiante');
  assert.strictEqual(principianti.length, 27);
  assert.deepStrictEqual(con(principianti).map(x => x.p.seme), [], 'chi inizia non riceve un esercizio di abilita 3 (SEL-06)');
  const esperti = adulti.filter(x => x.p.level !== 'principiante');
  assert.strictEqual(esperti.length, 54);
  assert.strictEqual(con(esperti).length, 20, 'chi ha esperienza lo riceve dove ci sono i manubri');
});

/* ============================================================================================================ M5 */
test('M5: gli esercizi di avvio sono due, di schema squat e abilita 1, e si leggono dagli attributi', () => {
  const ATTR = app.json('ATTRIBUTI');
  assert.deepStrictEqual(Object.keys(ATTR).filter(n => ATTR[n].soloAvvio).sort(), ['Sit-to-Stand dalla Panca', 'Squat su Scatola']);
  ['Sit-to-Stand dalla Panca', 'Squat su Scatola'].forEach(n => { assert.strictEqual(ATTR[n].schema, 'squat', n); assert.strictEqual(ATTR[n].abilita, 1, n); });
  assert.strictEqual(app.g('attributi')('💪 Squat su Scatola').soloAvvio, true, 'anche con l emoji');
  assert.ok(!app.g('attributi')('Goblet Squat').soloAvvio);
});

test('M5: strSquatDoppio: lo squat di avvio non sta con un altro squat, in nessuno dei due ordini; due squat carichi restano ammessi (ABB-02)', () => {
  const doppio = (x, base) => app.g('strSquatDoppio')({ name: x }, base.map(name => ({ name })));
  assert.strictEqual(doppio('Squat su Scatola', ['Squat a Corpo Libero']), true);
  assert.strictEqual(doppio('Squat su Scatola', ['Goblet Squat', 'Stacco Rumeno']), true);
  assert.strictEqual(doppio('Squat a Corpo Libero', ['Squat su Scatola']), true, 'e al contrario: nessun altro squat nella seduta che ha lo squat di avvio');
  assert.strictEqual(doppio('Leg Press', ['Squat su Scatola']), true);
  assert.strictEqual(doppio('Sit-to-Stand dalla Panca', ['Squat su Scatola']), true);
  assert.strictEqual(doppio('Hack Squat', ['Squat con Bilanciere']), false, 'macchina dopo il bilanciere: ammesso (ABB-02)');
  assert.strictEqual(doppio('Squat su Scatola', ['Stacco Rumeno', 'Panca Piana Manubri']), false, 'senza altri squat nella seduta va bene');
  assert.strictEqual(doppio('Stacco Rumeno', ['Squat su Scatola']), false, 'lo stacco non e uno squat');
  assert.strictEqual(doppio('Leg Extension', ['Squat su Scatola']), false, 'un isolamento non e uno squat');
});

test('M5: la Sentinella vieta gli esercizi di avvio a chi puo fare lo squat con un carico, non a chi inizia ne ai prudenti', () => {
  const v = d => app.dati(app.chiama('vincoliSicurezza', app.chiama('briefCoach', Object.assign({}, BASE, d), {}))).vietati;
  const avvio = ['Squat su Scatola', 'Sit-to-Stand dalla Panca'].map(n => app.g('nomeInLibreria')(n));
  [{ level: 'intermedio' }, { level: 'avanzato' }, { level: 'avanzato', sex: 'M' }].forEach(d => avvio.forEach(n => assert.ok(n in v(d), n + ' vietato per ' + JSON.stringify(d))));
  [{ level: 'principiante' }, { level: 'avanzato', age: 70 }, { level: 'avanzato', age: 16 }, { level: 'avanzato', parq: 'si' }].forEach(d => avvio.forEach(n => assert.ok(!(n in v(d)), n + ' ammesso per ' + JSON.stringify(d))));
});

test('M5: su una griglia di 324 programmi nessun intermedio o avanzato sano riceve lo Squat su Scatola e nessuna seduta lo ha con un altro squat', () => {
  /* sul codice di prima: 32 programmi su 54 di chi ha esperienza (anche avanzati, al posto di uno squat carico), 34 sedute con lo Squat su Scatola e un altro squat, 71 sedute con due squat */
  const tutti = programmi(['adulto', 'over65', 'parq', 'minorenne']), ATTR = app.json('ATTRIBUTI');
  assert.strictEqual(tutti.length, 324);
  const haScatola = x => x.prog.sedute.some(sd => nomiSeduta(sd).indexOf('Squat su Scatola') !== -1);
  const esperti = tutti.filter(x => x.p._persona === 'adulto' && x.p.level !== 'principiante');
  assert.strictEqual(esperti.length, 54);
  assert.deepStrictEqual(esperti.filter(haScatola).map(x => x.p.seme), [], 'chi puo fare lo squat con un carico non riceve lo squat di avvio');
  /* lo ricevono ancora chi inizia e i prudenti (la progressione verso lo squat carico) */
  assert.strictEqual(tutti.filter(x => x.p._persona === 'adulto' && x.p.level === 'principiante').filter(haScatola).length, 12);
  assert.strictEqual(tutti.filter(x => x.p._persona !== 'adulto').filter(haScatola).length, 128);
  let sedute = 0, conAvvioEAltroSquat = 0, conDueSquat = 0;
  tutti.forEach(x => x.prog.sedute.forEach(sd => {
    sedute++;
    const n = nomiSeduta(sd), squat = n.filter(e => ATTR[e] && ATTR[e].schema === 'squat'), avvio = n.filter(e => ATTR[e] && ATTR[e].soloAvvio);
    if (squat.length > 1) conDueSquat++;
    if (avvio.length && squat.length > 1) conAvvioEAltroSquat++;
  }));
  assert.ok(sedute > 1000);
  assert.strictEqual(conAvvioEAltroSquat, 0, 'lo squat di avvio non sta con un altro squat');
  assert.strictEqual(conDueSquat, 45, 'restano solo i doppi squat carichi (bilanciere + macchina, ABB-02): prima 71');
});
