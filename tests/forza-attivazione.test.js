/* INT-2e, attivazione della struttura Forza (FRZ-01): la domanda «Che forza?» (forza generale | powerlifting) in onboarding e in Opzioni, il salvataggio di forzaTipo e puntiDeboli nel profilo
   (applyGeneratedProgram) e il ciclo dopo / «Rifai il programma» che li ritrovano. Prove in node con l app vera in vm (tests/aiuto-app.js).
   W2-T7 aveva la struttura (specialita/forza.js, 19 prove) e la leggeva in modo difensivo da forzaTipo, ma nessuno scriveva quel campo: in produzione il powerlifting non si attivava mai.
   Le prove sotto falliscono su 7181e80 (nessuna domanda, nessun salvataggio). Chi non risponde ha lo stesso programma e lo stesso profilo di prima, byte per byte. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const RISPOSTE = { goals: ['forza'], goal: 'forza', level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sonno: 'bene', attrezzi: 'indifferente', sex: 'uomo', age: 30, parq: 'no', freq: 'auto', fastidi: [] };
function conOnb(a, extra) { a.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(Object.assign({}, RISPOSTE, extra || {})) + ')'); }
function crea(a, extra) { conOnb(a, extra); a.g('applyGeneratedProgram()'); return { profilo: a.leggi(a.chiave('PROFILE_KEY')), programma: a.json('getProgramma()'), giorni: a.json('loadData()') }; }
const nomi = r => [].concat.apply([], Object.keys(r.giorni).map(g => (r.giorni[g] || []).map(e => e.name.replace(/^\S+\s/, ''))));

test('FRZ-01: «Che forza?» si offre solo con la forza come primo obiettivo; il powerlifting mostra i requisiti e «Dove ti blocchi?»', () => {
  const a = caricaApp({ ora: LUNEDI });
  conOnb(a);
  const html = g => a.g('htmlForzaOnboarding(' + JSON.stringify(g) + ')');
  const base = html(['forza']);
  assert.ok(/Che forza\?/.test(base) && /Forza generale/.test(base) && /Powerlifting/.test(base), base);
  assert.ok(!/Dove ti blocchi/.test(base) && !/onb-forza-requisiti/.test(base), 'senza risposta niente requisiti ne punti deboli');
  assert.strictEqual(html(['massa', 'forza']), '', 'la forza deve essere il primo obiettivo');
  assert.strictEqual(html(['massa']), '');
  assert.strictEqual(html([]), '');
  a.g('onbData.forzaTipo = "powerlifting"');
  const pl = html(['forza', 'massa']);
  assert.ok(/onb-forza-requisiti/.test(pl) && /tra 18 e 64 anni/.test(pl) && /Dove ti blocchi\?/.test(pl), pl);
  assert.strictEqual((pl.match(/onbTogglePuntoDebole/g) || []).length, 7, 'i sette punti deboli di SPEC_FORZA.varianti.punti');
  a.g('onbData.forzaTipo = "generale"');
  assert.ok(!/Dove ti blocchi/.test(html(['forza'])), 'con la forza generale niente punti deboli');
  a.spegni(['FRZ-02']);
  assert.strictEqual(html(['forza']), '', 'con la struttura spenta la domanda non si offre (non cambierebbe niente)');
});

test('FRZ-01: i punti deboli: uno per alzata, al massimo due, un secondo tocco lo toglie; un punto che non esiste non entra', () => {
  const a = caricaApp({ ora: LUNEDI });
  const cambia = (l, k) => a.json('forzaCambiaPunto(' + JSON.stringify(l) + ', ' + JSON.stringify(k) + ')');
  assert.deepStrictEqual(cambia([], 'panca-meta'), ['panca-meta']);
  assert.deepStrictEqual(cambia(['panca-meta'], 'panca-meta'), []);
  assert.deepStrictEqual(cambia(['panca-meta'], 'panca-petto'), ['panca-petto'], 'una sola per alzata: il secondo tocco sulla panca prende il posto del primo');
  assert.deepStrictEqual(cambia(['panca-meta'], 'squat-buca'), ['panca-meta', 'squat-buca']);
  assert.deepStrictEqual(cambia(['panca-meta', 'squat-buca'], 'stacco-terra'), ['panca-meta', 'squat-buca'], 'al massimo due in tutto (puntiDeboliMax)');
  assert.deepStrictEqual(cambia(['panca-meta', 'squat-buca'], 'squat-uscita'), ['panca-meta', 'squat-uscita'], 'ma si puo cambiare il punto di un alzata gia scelta');
  assert.deepStrictEqual(cambia(['inventato'], 'panca-meta'), ['panca-meta']);
  assert.deepStrictEqual(cambia([], 'non-esiste'), []);
  assert.deepStrictEqual(cambia(undefined, 'stacco-terra'), ['stacco-terra']);
  /* i tocchi dell onboarding */
  conOnb(a, { forzaTipo: 'powerlifting' });
  a.g('onbTogglePuntoDebole("panca-meta"); onbTogglePuntoDebole("squat-buca"); onbTogglePuntoDebole("stacco-terra")');
  assert.deepStrictEqual(a.json('onbData.puntiDeboli'), ['panca-meta', 'squat-buca']);
});

test('FRZ-01: «Crea il programma» salva forzaTipo e puntiDeboli nel profilo e il programma ha il powerlifting; «generale» e nessuna risposta no', () => {
  const pl = crea(caricaApp({ ora: LUNEDI }), { forzaTipo: 'powerlifting', puntiDeboli: ['panca-meta', 'inventato'] });
  assert.strictEqual(pl.profilo.forzaTipo, 'powerlifting');
  assert.deepStrictEqual(pl.profilo.puntiDeboli, ['panca-meta'], 'solo quelli che il generatore conosce');
  assert.strictEqual(pl.programma.modalita, 'forza', 'il programma salvato dice che e la modalita Forza');
  const n = nomi(pl), conta = re => n.filter(x => re.test(x)).length;
  assert.ok(conta(/^Squat con Bilanciere$|Squat con Pausa|Front Squat/) >= 2 && conta(/Panca/) >= 2 && conta(/Stacco/) >= 1, 'squat, panca e stacco nella settimana: ' + n.join(', '));
  const gen = crea(caricaApp({ ora: LUNEDI }), { forzaTipo: 'generale', puntiDeboli: ['panca-meta'] });
  assert.strictEqual(gen.profilo.forzaTipo, 'generale');
  assert.ok(!('puntiDeboli' in gen.profilo), 'i punti deboli servono solo al powerlifting');
  assert.notStrictEqual(gen.programma.modalita, 'forza');
  const niente = crea(caricaApp({ ora: LUNEDI }));
  assert.ok(!('forzaTipo' in niente.profilo) && !('puntiDeboli' in niente.profilo), 'chi non risponde ha un profilo senza i due campi');
  assert.notStrictEqual(niente.programma.modalita, 'forza');
  /* un altro primo obiettivo: i campi non si salvano e la struttura non c e, anche se il campo era nei dati */
  const massa = crea(caricaApp({ ora: LUNEDI }), { goals: ['massa', 'forza'], goal: 'massa', forzaTipo: 'powerlifting', puntiDeboli: ['panca-meta'] });
  assert.ok(!('forzaTipo' in massa.profilo) && !('puntiDeboli' in massa.profilo));
  assert.notStrictEqual(massa.programma.modalita, 'forza');
});

test('FRZ-01: chi non risponde ha lo stesso programma e le stesse chiavi di profilo di prima (byte per byte); «generale» ha lo stesso programma di chi non risponde', () => {
  const programmi = extra => {
    const a = caricaApp({ ora: LUNEDI });
    return JSON.stringify(a.json('(function () { const o = Object.assign(nuovoOnbData(), ' + JSON.stringify(Object.assign({}, RISPOSTE, { seme: 'frz01' }, extra)) + '); return buildProgram(o).sedute; })()'));
  };
  assert.strictEqual(programmi({ forzaTipo: 'generale' }), programmi({}), 'forza generale = nessuna risposta');
  assert.strictEqual(programmi({ forzaTipo: undefined, puntiDeboli: undefined }), programmi({}));
  assert.notStrictEqual(programmi({ forzaTipo: 'powerlifting' }), programmi({}), 'il powerlifting cambia il programma');
});

test('FRZ-01: «Rifai il programma» e il ciclo dopo ritrovano la scelta dal profilo (nuovoOnbData, nuovoCiclo)', () => {
  const a = caricaApp({ ora: LUNEDI });
  crea(a, { forzaTipo: 'powerlifting', puntiDeboli: ['squat-buca', 'panca-petto'] });
  a.g('onbData = nuovoOnbData()');
  assert.deepStrictEqual(a.json('[onbData.forzaTipo, onbData.puntiDeboli]'), ['powerlifting', ['squat-buca', 'panca-petto']], 'l onboarding rifatto riparte dalla risposta');
  a.g('nuovoCiclo(true)');
  const p = a.leggi(a.chiave('PROFILE_KEY'));
  assert.strictEqual(p.forzaTipo, 'powerlifting', 'il nuovo ciclo non perde la scelta');
  assert.deepStrictEqual(p.puntiDeboli, ['squat-buca', 'panca-petto']);
  assert.strictEqual(a.json('getProgramma().modalita'), 'forza', 'e il nuovo programma e ancora il powerlifting');
  /* il ciclo dopo, con il verdetto del coach */
  a.g('nuovoCiclo()');
  assert.strictEqual(a.json('getProgramma().modalita'), 'forza');
  assert.strictEqual(a.leggi(a.chiave('PROFILE_KEY')).forzaTipo, 'powerlifting');
});

test('FRZ-01 (Opzioni › Il coach): il gruppo si vede solo con la forza come primo obiettivo; i tocchi scrivono il profilo; un secondo tocco toglie la risposta', () => {
  const a = caricaApp({ ora: LUNEDI });
  const html = p => a.g('htmlForzaCoach(' + JSON.stringify(p) + ')');
  assert.strictEqual(html({ goals: ['massa'] }), '');
  assert.strictEqual(html({}), '');
  assert.ok(/Che forza\?/.test(html({ goals: ['forza'] })) && !/Dove ti blocchi/.test(html({ goals: ['forza'] })));
  assert.ok(/Dove ti blocchi\?/.test(html({ goals: ['forza'], forzaTipo: 'powerlifting' })));
  assert.ok(/Che forza\?/.test(html({ goal: 'forza' })), 'anche con il solo campo goal');
  a.profilo({ goals: ['forza'], goal: 'forza', level: 'intermedio', age: 30 });
  a.g('setForzaTipoCoach("powerlifting"); togglePuntoDeboleCoach("stacco-terra"); togglePuntoDeboleCoach("stacco-chiusura"); togglePuntoDeboleCoach("squat-buca")');
  let p = a.leggi(a.chiave('PROFILE_KEY'));
  assert.strictEqual(p.forzaTipo, 'powerlifting');
  assert.deepStrictEqual(p.puntiDeboli, ['stacco-chiusura', 'squat-buca']);
  a.g('setForzaTipoCoach("generale")');
  p = a.leggi(a.chiave('PROFILE_KEY'));
  assert.deepStrictEqual([p.forzaTipo, 'puntiDeboli' in p], ['generale', false], 'con la forza generale i punti deboli non servono');
  a.g('setForzaTipoCoach("generale")');
  assert.ok(!('forzaTipo' in a.leggi(a.chiave('PROFILE_KEY'))), 'il secondo tocco toglie la risposta');
});
