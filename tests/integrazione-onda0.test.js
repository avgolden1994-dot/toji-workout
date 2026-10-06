/* Integrazione dell'onda 0 del coach v2 (INT-0): le cuciture tra i task che nessuno dei cinque rami poteva provare da solo.
   CAS-14 spegnibile, i prudenti restano a blocchi 3+1 (W0-T5 + W0-T2), nuovoCiclo con un'eta sotto il minimo (W0-T2),
   soglia della fatica «alta» con le risposte 3/6/8/10 (MES-08, W0-T5), salvaguardie sempre accese. L'app vera in vm (tests/aiuto-app.js). */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conSoglieStruttura, senzaSoglie } = require('./aiuto-mesociclo');

const ORA = '2026-10-05T12:00:00';
const BASE = { goals: ['massa'], level: 'principiante', days: 2, minutes: 45, luogo: 'manubri', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'int0' };
const costruisci = (app, d) => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, d)));

test('REGOLE_SPEGNIBILI: CAS-14 si spegne, le salvaguardie MAV-02, MAV-03 ed ETA-01..03 no', () => {
  const app = caricaApp({ ora: ORA });
  const sp = app.json('REGOLE_SPEGNIBILI');
  assert.ok(sp.indexOf('CAS-14') !== -1, 'CAS-14 e spegnibile');
  ['MAV-02', 'MAV-03', 'ETA-01', 'ETA-02', 'ETA-03'].forEach(c => assert.ok(sp.indexOf(c) === -1, c + ' e una salvaguardia: sempre accesa'));
  app.spegni(['MAV-03', 'ETA-02', 'CAS-14']);
  assert.strictEqual(app.chiama('regolaAttiva', 'CAS-14'), false);
  assert.strictEqual(app.chiama('regolaAttiva', 'MAV-03'), true, 'spegnere una salvaguardia non ha effetto');
  assert.strictEqual(app.chiama('regolaAttiva', 'ETA-02'), true);
});

test('CAS-14: a casa senza sbarra il posto della tirata verticale prende il pullover; con la regola spenta il posto resta com\'era (nessun errore, nessuna nota CAS-14)', () => {
  const app = caricaApp({ ora: ORA });
  /* un intermedio a 5 giorni a casa con i manubri: le sedute sono abbastanza lunghe da avere il posto della tirata verticale */
  const prof = { level: 'intermedio', days: 4, minutes: 75 };
  const acceso = costruisci(app, prof);
  const nomi = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.map(e => e.name)));
  assert.ok(acceso.note.some(n => /Senza sbarra la schiena si allena con rematori e pullover/.test(n)), 'con CAS-14 accesa la nota c e');
  app.spegni(['CAS-14']);
  const spento = costruisci(app, prof);
  assert.ok(!spento.note.some(n => /Senza sbarra la schiena si allena con rematori e pullover/.test(n)), 'con CAS-14 spenta la nota non c e');
  assert.ok(nomi(spento).length > 0, 'il programma si costruisce lo stesso');
  app.riaccendi();
  assert.deepStrictEqual(costruisci(app, prof), acceso, 'riaccesa, torna identica (stesso seme)');
});

test('PRN-03 e B4 (W2-T4): il principiante ha 12 settimane con lo scarico solo alla 12a, ma over 65, PAR-Q positivo e minorenni restano a blocchi 3+1; l intermedio ha blocchi 5+1', () => {
  const app = conSoglieStruttura(caricaApp({ ora: ORA }));
  const primoScarico = p => p.fasi.indexOf('scarico') + 1;
  assert.strictEqual(primoScarico(costruisci(app, {})), 12, 'principiante adulto: scarico alla 12a (verifica)');
  assert.strictEqual(primoScarico(costruisci(app, { age: 70 })), 4, 'principiante over 65: 3+1');
  assert.strictEqual(primoScarico(costruisci(app, { parq: 'si' })), 4, 'principiante con PAR-Q positivo: 3+1');
  assert.strictEqual(primoScarico(costruisci(app, { age: 16 })), 4, 'principiante minorenne: 3+1');
  assert.strictEqual(primoScarico(costruisci(app, { level: 'intermedio' })), 6, 'intermedio: blocchi da 5+1 (MES-01)');
  /* senza soglie-struttura.js (o con le regole spente) il generatore e quello di prima: principiante 8 settimane con lo scarico all 8a, intermedio 3+1 */
  const v1 = senzaSoglie(caricaApp({ ora: ORA }));
  assert.strictEqual(primoScarico(costruisci(v1, {})), 8, 'ponte: principiante 8 settimane');
  assert.strictEqual(primoScarico(costruisci(v1, { level: 'intermedio' })), 4, 'ponte: intermedio 3+1');
  assert.strictEqual(costruisci(v1, {}).piano, undefined, 'senza soglie nessun piano');
});

test('ETA-01: «Crea il ciclo successivo» con un\'eta da 1 a 12 anni non lancia buildProgram (messaggio, nessun programma nuovo); un\'eta non detta resta adulto', () => {
  const app = caricaApp({ ora: ORA });
  app.profilo({ level: 'principiante', age: 10, days: 3, minutes: 60, luogo: 'palestra' });
  const prima = app.leggi(app.chiave('progKey'));
  assert.doesNotThrow(() => app.chiama('nuovoCiclo', true));
  assert.deepStrictEqual(app.leggi(app.chiave('progKey')), prima, 'nessun programma nuovo scritto');
  assert.strictEqual(app.errori.length, 0, 'nessun errore: ' + app.errori.join(' | '));
  const e = app.dati(app.chiama('etaPerProgramma', 10));
  assert.strictEqual(e.motivo, 'sotto-minimo');
  assert.strictEqual(app.dati(app.chiama('etaPerProgramma', 13)).ok, true);
});

test('MES-08: la fatica del programma e «alta» solo con sRPE medio >= 9,5 (con le risposte 3/6/8/10 una Dura da stanchi non basta), «bassa» con tutte Giusta', () => {
  const app = caricaApp({ ora: ORA });
  const con = srpe => {
    app.storia(srpe.map((v, i) => Object.assign(app.seduta(2 + i * 2, [{ nome: 'Panca Piana Bilanciere', serie: [[60, 8, true, 7]] }]), { feedback: { srpe: v } })));
    return app.chiama('livelloFatica');
  };
  assert.strictEqual(con([10, 10, 10]), 'alta');
  assert.strictEqual(con([10, 10, 8]), 'media', 'media 9,33: prima (soglia 9) era «alta»');
  assert.strictEqual(con([8, 8, 8]), 'media');
  assert.strictEqual(con([6, 6, 6]), 'bassa');
});

test('i prudenti non hanno tecniche al cedimento nemmeno dopo l\'integrazione (MAV-02, MAV-03, ETA-02): 72 profili con seme fisso', () => {
  const app = caricaApp({ ora: ORA });
  const TEC = app.json('TECNICHE_AL_CEDIMENTO');
  let n = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [{ age: 16 }, { age: 70 }, { parq: 'si' }, { age: 30 }].forEach(p => ['palestra', 'manubri', 'corpo'].forEach(luogo => [30, 60].forEach(minutes => {
    const prog = costruisci(app, Object.assign({ level, luogo, minutes, days: 4 }, p));
    n++;
    const prudente = level === 'principiante' || p.age === 16 || p.age === 70 || p.parq === 'si';
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      if (prudente && e.tecnica && TEC.indexOf(e.tecnica) !== -1) assert.fail(JSON.stringify(Object.assign({ level, luogo, minutes }, p)) + ': ' + e.name + ' con ' + e.tecnica);
    }));
  }))));
  assert.strictEqual(n, 72);
});
