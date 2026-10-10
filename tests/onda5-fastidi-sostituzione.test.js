/* Onda 5 (aperti di onda-4, P4-F seguito): la nota dei fastidi non deve mentire quando in seduta si cambia esercizio, e il rinvio al medico dice «Non sono un medico e non faccio diagnosi».
   1. notaCautelaFastidio (sicurezza/fastidi.js): un esercizio che carica una zona dichiarata porta la sua cautela («Spalle: da fare nell’ampiezza che non fa male»); uno che non la carica: niente.
   2. «Macchinario occupato» (sostituisciOggi): l esercizio messo al posto di un altro porta quella cautela nella nota del coach; le alternative proposte non contengono mai un esercizio
      controindicato (stress 2) per la zona dichiarata (consentito).
   3. Le note per zona della scheda e la nota della cuffia finiscono con la formula di DEC-03/04.
   Prima (coach-v2-onda-4-bis): notaCautelaFastidio non esisteva, la nota del sostituto era solo la stima del carico, le note per zona e la cuffia mandavano dal medico senza la formula.
   Prove in node con l app vera in vm (tests/aiuto-app.js). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { execFileSync } = require('child_process');
const path = require('path');

const ORA = '2026-10-05T12:00:00';
const LENTO = '🛡️ Lento Avanti Manubri', LEG_PRESS = '🦵 Leg Press', PANCA_MANUBRI = '💪 Panca Piana Manubri';
const FORMULA = 'Non sono un medico e non faccio diagnosi.';
function app(fastidi) {
  const a = caricaApp({ ora: ORA });
  a.profilo({ level: 'intermedio', age: 30, sex: 'M', goals: ['massa'], fastidi: fastidi, luogo: 'palestra', attrezziPalestra: null });
  return a;
}
const nomi = a => a.json('EXERCISE_LIBRARY.map(x => x.name)');

test('1. la cautela di un esercizio: chi carica la spalla la porta, chi non la carica no; senza fastidi niente', () => {
  const a = app(['spalle']);
  assert.ok(nomi(a).indexOf(LENTO) !== -1 && nomi(a).indexOf(LEG_PRESS) !== -1);
  assert.ok(a.json('stressArticolare(' + JSON.stringify(LENTO) + ', "spalle")') >= 1, 'il lento avanti carica la spalla (attributi)');
  const nota = a.chiama('notaCautelaFastidio', LENTO, ['spalle']);
  assert.ok(/^Spalle: /.test(nota) && !/restano/.test(nota) && /non fa male/.test(nota), 'prima: nessuna cautela per il singolo esercizio; ora: ' + nota);
  assert.strictEqual(a.chiama('notaCautelaFastidio', LEG_PRESS, ['spalle']), '');
  assert.strictEqual(a.chiama('notaCautelaFastidio', LENTO, []), '');
  assert.strictEqual(a.chiama('notaCautelaFastidio', LENTO, ['ginocchia']), '');
  /* tradotta a pezzi (en, es, de) */
  const esito = execFileSync('node', [path.join(__dirname, '..', '.claude', 'skills', 'implementa-regola-coach', 'references', 'controlla-traduzioni.js'), '--frasi', nota], { encoding: 'utf8' });
  assert.ok(/tutto ok/.test(esito), esito);
});

test('2. «Macchinario occupato»: le alternative con la spalla dolente non contengono esercizi controindicati; il sostituto che carica la spalla porta la cautela nella nota del coach', () => {
  const a = app(['spalle']);
  const prefs = a.json('prefsOccupato()');
  assert.deepStrictEqual(prefs.fastidi, ['spalle']);
  const alt = a.json('alternativeStessoMuscolo(' + JSON.stringify(PANCA_MANUBRI) + ', prefsOccupato(), [], { attrezzoDiverso: true, max: 12 }).map(x => x.ex.name)');
  assert.ok(alt.length >= 1, 'ci sono alternative per la panca con i manubri');
  const vietati = alt.filter(n => a.json('stressArticolare(' + JSON.stringify(n) + ', "spalle")') >= 2);
  assert.deepStrictEqual(vietati, [], 'nessuna alternativa controindicata per la spalla');
  /* una seduta con la panca coi manubri; si mette al suo posto un alternativa che carica la spalla (stress 1), se c e */
  const conCautela = alt.find(n => a.json('stressArticolare(' + JSON.stringify(n) + ', "spalle")') >= 1);
  const giorno = a.json('DAYS')[0];
  a.g('currentDay = ' + JSON.stringify(giorno));
  const data = {}; a.json('DAYS').forEach(g => { data[g] = []; });
  data[giorno] = [a.dati(a.chiama('normalizeExerciseRecord', { name: PANCA_MANUBRI, sets: 3, reps: 10, weight: 20, rest: 90, completedSets: [] }))];
  a.scrivi(a.chiave('dataKey'), data);
  const scelta = conCautela || alt[0];
  a.g('occupatoOpzioni = ' + JSON.stringify([scelta]));
  try { a.g('sostituisciOggi(0, 0)'); } catch (e) { /* le schermate (DOM finto) possono lamentarsi DOPO aver salvato: conta il dato */ }
  const rec = a.json('loadData()')[giorno][0];
  assert.strictEqual(rec.name, scelta);
  assert.strictEqual(rec.sostituito.name, PANCA_MANUBRI);
  if (conCautela) {
    assert.ok(/Spalle: /.test(rec.coachNote || ''), 'prima: la nota del sostituto era solo la stima del carico; ora: ' + rec.coachNote);
    assert.strictEqual(rec.coachTipo, 'nuovo');
  } else assert.ok(!/Spalle: /.test(rec.coachNote || ''), 'nessuna cautela se il sostituto non carica la spalla');
  /* senza fastidi la nota e quella di prima */
  const b = app([]);
  b.g('currentDay = ' + JSON.stringify(giorno)); b.scrivi(b.chiave('dataKey'), data); b.g('occupatoOpzioni = ' + JSON.stringify([scelta]));
  try { b.g('sostituisciOggi(0, 0)'); } catch (e) { /* idem */ }
  assert.ok(!/Spalle: /.test(b.json('loadData()')[giorno][0].coachNote || ''));
});

test('3. le note per zona della scheda e la nota della cuffia dicono «Non sono un medico e non faccio diagnosi» (en, es, de tradotte)', () => {
  const a = app(['spalle', 'ginocchia', 'schiena']);
  const prog = a.dati(a.chiama('buildProgram', { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', fastidi: ['spalle', 'ginocchia', 'schiena'], sex: 'M', age: 30, parq: 'no', seme: 'o5-fastidi' }));
  const zone = prog.note.filter(n => /^(Spalle|Ginocchia|Schiena bassa)[:,]/.test(n));
  assert.strictEqual(zone.length, 3, 'una nota per zona: ' + JSON.stringify(prog.note));
  zone.forEach(n => assert.ok(n.endsWith(' — ' + FORMULA), 'prima: senza la formula; ora: ' + n));
  assert.ok(/ Non sono un medico e non faccio diagnosi\.$/.test(a.g('NOTA_CUFFIA')), a.g('NOTA_CUFFIA'));
  for (const l of ['en', 'es', 'de']) {
    const d = a.json('I18N[' + JSON.stringify(l) + ']');
    assert.ok(d[FORMULA], l + ': la formula da sola e tradotta');
    assert.ok(d[a.g('NOTA_CUFFIA')], l + ': la nota della cuffia con la formula e tradotta');
  }
  const esito = execFileSync('node', [path.join(__dirname, '..', '.claude', 'skills', 'implementa-regola-coach', 'references', 'controlla-traduzioni.js'), '--frasi'].concat(zone), { encoding: 'utf8' });
  assert.ok(/tutto ok/.test(esito), esito);
});
