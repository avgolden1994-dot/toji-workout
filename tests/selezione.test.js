/* Scelta degli esercizi per attributi (W2-T6, versione snella): una prova per correzione, con i numeri di prima.
   M6      a 2 giorni e 30 minuti in palestra la settimana ha una flessione del ginocchio (EQ-03:flessione, secondoDiGambe e scalaDelTempo);
   SEL-06  abilita <= livello: chi inizia e i prudenti non ricevono esercizi di abilita 3, chi inizia al massimo uno di abilita 2 per seduta, nessun bonus al bilanciere
           al primo posto salvo obiettivo forza; PRI-05 e assorbita;
   PCO-08  con la spalla dolente la settimana ha lavoro per la cuffia o per i deltoidi posteriori, 1-2 volte, senza caricare la spalla (SAF-06).
   Esegue il codice vero dell'app in node (vm), senza browser. Lancio: npm test
   Le prove devono FALLIRE sul codice di prima della correzione (i numeri di prima sono scritti accanto a ogni prova). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-06T12:00:00';
const app = caricaApp({ ora: ORA });
const senzaEmoji = n => app.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const costruisci = p => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, p)));
const nomi = sd => sd.esercizi.map(e => senzaEmoji(e.name));
const tutti = prog => [].concat.apply([], prog.sedute.map(nomi));
const ATTR = app.json('ATTRIBUTI');
const attr = n => ATTR[senzaEmoji(n)] || null;
const FLESSIONE = /leg curl|nordic/i;

/* ============================================================================================================ M6 */
test('M6: a 2 giorni e 30 minuti in palestra la flessione del ginocchio manca solo dove il tempo non basta, e il programma lo dice', () => {
  /* griglia di 144 programmi: livello x obiettivi x fastidi x sesso, seme fisso. Sul codice di prima (tag coach-v2-onda-2d) 107 non avevano una flessione del ginocchio (leg curl, nordic): la scala
     del tempo toglieva serie ai multiarticolari e poi, per ultimo, il leg curl, perche la seduta full body teneva due multiarticolari di gambe di schema diverso (squat e stacco rumeno) oltre a spinta e tirata.
     Dopo: 12, quasi tutti con un obiettivo di forza in seconda posizione (posti fissi 5x5 e pause lunghe) o il minimo di serie di petto e dorsali che nessun taglio puo scendere (registro B6, pavimenti) */
  const senza = [];
  let n = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [['massa'], ['glutei'], ['massa', 'forza'], ['dimagrimento'], ['forza', 'massa'], ['salute']].forEach(goals =>
    [[], ['spalle'], ['ginocchia'], ['schiena']].forEach(fastidi => ['F', 'M'].forEach(sex => {
      const prog = costruisci({ level, goals, fastidi, sex, days: 2, minutes: 30, luogo: 'palestra', seme: 'sel-m6-' + (n++) });
      if (!tutti(prog).some(x => FLESSIONE.test(x))) {
        senza.push([level, goals.join('+'), fastidi.join('+'), sex].join('|'));
        assert.ok(prog.note.some(x => /^Femorali: con questi minuti la flessione del ginocchio/.test(x)), 'senza la flessione il programma lo dice: ' + senza[senza.length - 1]);
      }
    }))));
  assert.strictEqual(n, 144);
  assert.ok(senza.length <= 12, 'senza flessione: ' + senza.length + ' su 144 (107 prima della correzione): ' + senza.join(', '));
  const senzaForza = senza.filter(x => !/forza/.test(x.split('|')[1]));
  assert.ok(senzaForza.length <= 2, 'senza un obiettivo di forza: ' + senzaForza.join(', '));
});

test('M6: la flessione prende il posto di un secondo multiarticolare di gambe, non di uno schema che resta solo nella settimana', () => {
  /* il taglio toglie il secondo esercizio di gambe della seduta full body quando lo stesso schema e in un altra seduta: squat, stacco, spinta e tirata restano in settimana (PAT-01) */
  const prog = costruisci({ level: 'avanzato', goals: ['glutei'], fastidi: [], sex: 'F', days: 2, minutes: 30, luogo: 'palestra', seme: 'collaudo|glutei|avanzato|2|30|palestra|-|F|giovane' });
  const schemi = new Set();
  prog.sedute.forEach(sd => sd.esercizi.forEach(e => { const k = app.g('schemaDi')(e.name); if (k) schemi.add(k); }));
  ['squat', 'hinge', 'spintaO', 'tirataO'].forEach(k => assert.ok(schemi.has(k), 'manca lo schema ' + k + ' nella settimana'));
  assert.ok(tutti(prog).some(x => FLESSIONE.test(x)), 'e c e la flessione del ginocchio');
});

test('M6: secondoDiGambe: solo nel full body, non il primo multiarticolare, non un posto fisso, solo se lo schema e anche in un altra seduta', () => {
  const sd = (tipo, nomiEs, extra) => ({ tipo, esercizi: nomiEs.map((n, i) => Object.assign({ name: app.g('nomeInLibreria')(n), sets: 3, reps: 8, rest: 120 }, (extra && extra[i]) || {})) });
  const f = (s, altre) => { const r = app.g('secondoDiGambe')(s, [s].concat(altre), null); return r ? senzaEmoji(r.name) : null; };
  const a = sd('fullbody', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine']);
  const b = sd('fullbody', ['Stacco da Terra (Deadlift)', 'Rematore con Petto Appoggiato', 'Hack Squat', 'Shoulder Press Machine']);
  assert.strictEqual(f(a, [b]), 'Stacco Rumeno', 'lo stacco rumeno (lo squat e il primo multiarticolare della seduta, lo stacco e anche nell altra)');
  assert.strictEqual(f(a, [sd('fullbody', ['Panca Piana Bilanciere', 'Hack Squat', 'Lat Machine'])]), null, 'senza uno stacco nell altra seduta l unico stacco della settimana resta (PAT-01)');
  assert.strictEqual(f(sd('upper', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine']), [b]), null, 'solo il full body');
  assert.strictEqual(f(sd('fullbody', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine'], [null, null, { fisso: true }]), [b]), null, 'un posto fisso resta');
  const pt = sd('fullbody', ['Panca Piana Bilanciere', 'Pull-Through ai Cavi', 'Leg Press', 'Lat Machine']);
  assert.strictEqual(f(pt, [sd('fullbody', ['Squat con Bilanciere', 'Pull-Through ai Cavi', 'Lat Machine'])]), 'Pull-Through ai Cavi', 'il pull-through ai cavi e una cerniera dell anca anche se il nome non dice «stacco»');
});
