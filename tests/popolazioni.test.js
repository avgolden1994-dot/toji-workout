/* Popolazioni e rientro dopo una pausa (pacchetto P4-S del coach v2 = W4-T2 snello; registro B10, B20, C.2; D-P21 n. 5)
   Prove in vm sull'app vera (tests/aiuto-app.js, tests/aiuto-atleta-piano.js: programmi v2 veri, orologio sulla settimana del programma):
   - over 65: nessuna «potenza» nelle 8 settimane di base, dai 75 anni e con il PAR-Q positivo (il caso della revisione: Hack Squat dalla settimana 1); 12 settimane vissute
     con 0 serie sotto 3 ripetizioni in riserva nelle settimane 1-8 e 0 sotto 2 dopo, classi A e B sempre a 3-4; mai sotto 8 ripetizioni (lo schema 5×3 di CAR-07);
   - rientro dopo una pausa, una prova per ogni soglia (≤ 6, 7-13, 14-27, ≥ 28 giorni): carichi (CAR-04), serie (RIC-05 e CST-02), calendario fermo (CST-01), giorni doppi
     oltre i 65 anni in una pausa vera (B20; con il ritmo normale di 2 sedute a settimana nessun calo: il motivo della deroga del 2026-10-05), seconda seduta e +1 RIR (CST-02),
     risalita (ALG-14); regole spente, programmi v1 e senza consenso: come prima;
   - gravidanza o parto recente (REC-12 parte a): la bandiera tiene accesa la modalità prudente, il pavimento di 3 ripetizioni in riserva, il testo prudente;
   - nessun testo delle regole bloccate (registro C.2: REC-12 b, ETA-08 b, ETA-11..13, ETA-17, REC-06 b) nelle stringhe del codice né nei dizionari;
   - chi non ha le condizioni (meno di 65 anni, nessuna pausa, nessuna gravidanza) e i programmi v1: stessi programmi e stessi carichi, con e senza i file di P4-S.
   I file nuovi (sicurezza/soglie-popolazioni.js, sicurezza/popolazioni.js) entrano in index.html con l'integrazione (docs/in-arrivo/P4-S.json): finché non ci sono, li carica
   conP4S, come conP3B in aiuto-atleta-piano.js. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const acorn = require('acorn');
const { caricaApp } = require('./aiuto-app');
const { telefono, vaiA, viviSettimana, conP3B } = require('./aiuto-atleta-piano');

const R = path.join(__dirname, '..');
const FILE_P4S = [['js/coach/sicurezza/soglie-popolazioni.js', 'SOGLIE_POPOLAZIONI'], ['js/coach/sicurezza/popolazioni.js', 'fasePopolazioni']];
const CODICI_NUOVI = ['CST-01', 'CST-02', 'ALG-14'];
/* carica i file di P4-S se index.html non li ha ancora; le regole nuove sono spegnibili come dirà la mappa (il catalogo lo rigenera l'integrazione) */
function conP4S(app) {
  FILE_P4S.forEach(([file, nome]) => {
    const f = path.join(R, file);
    if (!fs.existsSync(f)) return;                       /* sul codice di prima la prova fallisce per il motivo giusto */
    if (app.g('typeof ' + nome) !== 'undefined') return;
    app.g(fs.readFileSync(f, 'utf8'));
  });
  CODICI_NUOVI.forEach(c => app.g("if (!COACH_REGOLE_PER_CODICE['" + c + "']) COACH_REGOLE_PER_CODICE['" + c + "'] = { codice: '" + c + "', spegnibile: true, sottoCoach: '" + (c === 'ALG-14' ? 'bilancia' : 'sentinella') + "' }"));
  return app;
}
const appP4S = opz => conP4S(conP3B(caricaApp(Object.assign({ ora: '2026-10-05T12:00:00' }, opz || {}))));
const telP4S = opz => { const t = telefono(opz); conP4S(t.a); return t; };
const nomeLib = (a, n) => a.json('nomeInLibreria(' + JSON.stringify(n) + ')');
const serie = (n, kg, reps, rpe) => Array.from({ length: n }, () => [kg, reps, true, rpe || 8]);

/* ---------------------------------------------------------------------------------------------------- over 65 (ETA-08 parte a: solo la base) */
const PROFILO_REVISORE = { goals: ['salute'], level: 'principiante', luogo: 'palestra', age: 68, parq: 'si', days: 3, minutes: 60, sex: 'F', seme: 'p4s' };

test('ETA-08 a / D-P21 n. 5: nessuna «potenza» nella base degli over 65 (il caso della revisione: Hack Squat dalla settimana 1, PAR-Q positivo)', () => {
  const a = appP4S();
  const profili = [PROFILO_REVISORE, Object.assign({}, PROFILO_REVISORE, { parq: 'no' }), Object.assign({}, PROFILO_REVISORE, { age: 78, parq: 'no' }),
    { goals: ['massa'], level: 'intermedio', luogo: 'palestra', age: 70, days: 4, minutes: 60, sex: 'M', seme: 'p4s' },
    { goals: ['forza'], level: 'avanzato', luogo: 'palestra', age: 66, days: 3, minutes: 75, sex: 'M', seme: 'p4s' }];
  profili.forEach(d => {
    const p = a.dati(a.chiama('buildProgram', d));
    const conPotenza = [];
    p.sedute.forEach(s => s.esercizi.forEach(e => { if (e.tecnica === 'potenza') conPotenza.push(e.name); }));
    assert.deepStrictEqual(conPotenza, [], JSON.stringify(d) + ': nessuna potenza nella base, trovata su ' + conPotenza.join(', '));
    assert.ok(!p.note.some(n => /veloce in salita per la potenza/.test(n)), 'la nota non promette la potenza: ' + JSON.stringify(d));
    assert.ok(p.note.some(n => /^Dai 65 anni: /.test(n)), 'resta la nota degli over 65');
  });
});

test('ETA-08 a: la potenza di un over 65 solo dopo le 8 settimane di base, solo su macchina, mai dai 75 anni né con il PAR-Q positivo', () => {
  const a = appP4S();
  const hack = nomeLib(a, 'Hack Squat'), panca = nomeLib(a, 'Panca Piana Bilanciere');
  const prova = (chi, sett, nome) => a.json('tecnicaAdatta("potenza", ' + JSON.stringify(nome || hack) + ', { chi: ' + JSON.stringify(chi) + ' }, ' + (sett === undefined ? '{}' : '{ settimana: ' + JSON.stringify(sett) + ' }') + ')');
  const c68 = { eta: 68, over65: true, livello: 'intermedio' };
  assert.strictEqual(prova(c68, { numero: 9, fase: 'carico' }).ok, true, 'settimana 9, 68 anni, macchina: ammessa');
  const base = prova(c68, { numero: 8, fase: 'carico' });
  assert.strictEqual(base.ok, false, 'settimana 8: è ancora la base');
  assert.strictEqual(base.codice, 'ETA-08');
  assert.strictEqual(prova(c68, undefined).ok, false, 'nella generazione (nessuna settimana): è la base');
  assert.strictEqual(prova(c68, null).ok, false, 'settimana sconosciuta: è la base');
  assert.strictEqual(prova({ eta: 78, over65: true, livello: 'intermedio' }, { numero: 12, fase: 'carico' }).ok, false, 'dai 75 anni la base non finisce');
  assert.strictEqual(prova({ eta: 68, over65: true, livello: 'intermedio', parq: true }, { numero: 12, fase: 'carico' }).ok, false, 'PAR-Q positivo: mai');
  assert.strictEqual(prova(c68, { numero: 10, fase: 'carico' }, panca).ok, false, 'su un bilanciere libero: mai (MAV-03)');
  assert.strictEqual(prova({ eta: 40, livello: 'intermedio' }, { numero: 10, fase: 'carico' }).ok, false, 'sotto i 65 anni: non è una tecnica per loro (come prima)');
});

test('ETA-08 a: il pavimento delle ripetizioni in riserva (base 3 su tutto; dopo, 3 sui pesi liberi e 2 su macchine e cavi; dai 75 anni sempre 3; gravidanza 3)', () => {
  const a = appP4S();
  const pav = (profilo, r, nome, sett) => { a.profilo(profilo); return a.json('pavimentoRirPopolazioni(' + JSON.stringify(r) + ', ' + JSON.stringify(nomeLib(a, nome)) + ', ' + sett + ')'); };
  const o68 = { age: 68 }, o78 = { age: 78 };
  assert.deepStrictEqual(pav(o68, [0, 1], 'Chest Press Machine', 5), [3, 4], 'base, macchina');
  assert.deepStrictEqual(pav(o68, [1, 2], 'Panca Piana Bilanciere', 8), [3, 4], 'base, bilanciere');
  assert.deepStrictEqual(pav(o68, [0, 1], 'Chest Press Machine', 9), [2, 3], 'dopo la base, macchina (classe C): mai sotto 2');
  assert.deepStrictEqual(pav(o68, [0, 1], 'Curl ai Cavi', 10), [2, 3], 'dopo la base, cavo (classe D): mai sotto 2');
  assert.deepStrictEqual(pav(o68, [2, 3], 'Panca Piana Bilanciere', 10), [3, 4], 'dopo la base, bilanciere (classe A): 3-4');
  assert.deepStrictEqual(pav(o68, [2, 3], 'Panca Inclinata Manubri', 10), [3, 4], 'dopo la base, manubri (classe B): niente pesi liberi a RIR 2');
  assert.deepStrictEqual(pav(o78, [0, 1], 'Chest Press Machine', 12), [3, 4], 'dai 75 anni: sempre la base');
  assert.deepStrictEqual(pav(o68, [3, 4], 'Chest Press Machine', 5), [3, 4], 'solo alza: 3-4 resta');
  assert.deepStrictEqual(pav({ age: 40 }, [0, 1], 'Chest Press Machine', 5), [0, 1], 'sotto i 65 anni: com\'era');
  assert.deepStrictEqual(pav({ age: 30, sex: 'F', gravidanza: true }, [0, 1], 'Curl ai Cavi', 5), [3, 4], 'gravidanza: mai sotto 3');
});

test('ETA-08 a: 12 settimane vissute da un over 65 (programma v2 vero): 0 serie sotto 3 RIR nelle settimane 1-8, 0 sotto 2 dopo, classi A e B sempre a 3-4, mai sotto 8 ripetizioni', () => {
  [{ age: 68, level: 'intermedio', goals: ['massa'], days: 3 }, { age: 70, level: 'avanzato', goals: ['forza'], days: 4, sex: 'F' }, { age: 77, level: 'principiante', goals: ['salute'], days: 3 }].forEach(d => {
    const { a } = telP4S({ d: Object.assign({ minutes: 60, luogo: 'palestra' }, d) });
    for (let n = 1; n <= 12; n++) viviSettimana(a, n, { rpe: 'bersaglio' });
    /* ogni esercizio con un carico di ogni seduta: il RIR previsto (obiettivo.rir, lo stesso che la seduta mostra) e le ripetizioni */
    let viste = 0;
    a.leggi(a.chiave('historyKey')).forEach(h => h.sessione.forEach(e => {
      if (!(e.sets[0].weight > 0) || a.json('isTimeBased(' + JSON.stringify(e.name) + ')')) return;
      const n = h.settimana ? h.settimana.numero : -1, rir = e.obiettivo.rir, classe = a.json('classeTecnica(' + JSON.stringify(e.name) + ')');
      viste++;
      assert.ok(rir[0] >= (n <= 8 || d.age >= 75 ? 3 : 2), d.age + ' anni, settimana ' + n + ', ' + e.name + ': RIR ' + rir.join('-'));
      if (classe === 'A' || classe === 'B') assert.ok(rir[0] >= 3, 'classe ' + classe + ' sempre a 3-4: ' + e.name + ' ' + rir.join('-'));
      assert.ok(e.obiettivo.reps >= 8, 'mai sotto 8 ripetizioni: ' + e.name + ' ' + e.obiettivo.reps);
    }));
    assert.ok(viste > 100, 'esercizi con carico visti: ' + viste);
  });
});

test('ETA-08 a: dai 65 anni niente schema 5×3 al secondo stallo (CAR-07): -5% e le ripetizioni del piano', () => {
  const a = appP4S();
  const panca = nomeLib(a, 'Panca Piana Bilanciere');
  const mancata = [[60, 10, true, 9], [60, 8, true, 10], [60, 7, true, 10]];
  const scena = eta => {
    a.profilo({ level: 'principiante', age: eta, goals: ['forza'] });
    a.programma({ inizio: a.ymd(a.giorniFa(14)), settimane: 12, blocco: 6, fasi: Array(12).fill('carico'), goals: ['forza'], versione: 2 });
    a.storia([a.seduta(3, [{ nome: panca, serie: mancata }]), a.seduta(7, [{ nome: panca, serie: mancata }])]);
    a.aggiusti({ esercizi: {}, stalli: { [panca]: 1 } });
    return a.dati(a.chiama('caricoProssimo', panca, 60, 10, 3));
  };
  const giovane = scena(30);
  assert.strictEqual(giovane.reps, 3, 'sotto i 65 anni lo schema 5×3 resta (CAR-07): ' + JSON.stringify(giovane));
  const r = scena(68);
  assert.ok(r.reps >= 8 && r.sets <= 3, 'over 65: ripetizioni del piano e serie del piano, non 5×3: ' + JSON.stringify(r));
  assert.ok(r.weight < 60 && r.weight >= 55, 'over 65: carico -5% (sulla griglia): ' + r.weight);
  assert.ok(/dai 65 anni restano almeno 8 ripetizioni/.test(r.motivo), r.motivo);
});

/* ---------------------------------------------------------------------------------------------------- rientro dopo una pausa (B20, MES-15) */
/* un telefono con un programma v2 intermedio, settimana `sett` (lunedì); storico: dall'inizio del programma una seduta il lunedì e il giovedì con `nome` (4 serie da 10 a `kg`,
   tutte fatte, RPE 8) fino a `pausa` giorni fa compresi; nessuna seduta dopo. Ogni voce porta la settimana come la scrive endWorkout (prima della pausa è quella del calendario).
   Programmi: sotto i 65 anni scarico alle settimane 6 e 12, dai 65 alle 4, 8 e 12. Restituisce { a, p, nome } */
function conPausa(pausa, opz) {
  const o = Object.assign({ sett: 5, eta: 30, v1: false, kg: 100, nome: 'Chest Press Machine', senzaP4S: false }, opz || {});
  const { a, p } = (o.senzaP4S ? telefono : telP4S)({ d: { level: 'intermedio', age: o.eta }, sett: o.sett, v1: o.v1 });
  const nome = nomeLib(a, o.nome), oggi = 7 * (o.sett - 1);
  const voci = [];
  for (let g = 0; g <= oggi - pausa; g++) {
    if (g % 7 !== 0 && g % 7 !== 3 && g !== oggi - pausa) continue;
    const w = Math.floor(g / 7) + 1;
    voci.push(a.seduta(oggi - g, [{ nome: nome, serie: serie(4, o.kg, 10) }], { settimana: { numero: w, fase: p.fasi[w - 1] } }));
  }
  a.storia(voci.reverse());
  return { a, p, nome };
}
const carico = (t, sets) => t.a.dati(t.a.chiama('caricoProssimo', t.nome, 100, 10, sets || 4));
const settimana = t => t.a.json('settimanaProgramma()').numero;
/* la seduta di oggi fatta (le serie dette, all RPE del bersaglio) e salvata come la salva endWorkout, poi l orologio avanti di `dopo` giorni */
function fatta(t, sets, kg, dopo) {
  const rir = t.a.json('rirBersaglio(' + JSON.stringify(t.nome) + ')'), st = t.a.json('settimanaProgramma()');
  const voce = t.a.seduta(0, [{ nome: t.nome, serie: serie(sets, kg, 10, 10 - (rir[0] + rir[1]) / 2) }], { settimana: { numero: st.numero, fase: st.fase } });
  voce.sessione[0].obiettivo = { reps: 10, base: 10, sets: sets, rir: rir };
  t.a.storia([voce].concat(t.a.leggi(t.a.chiave('historyKey'))));
  t.a.ora(t.a.ora() + dopo * 86400000);
}

test('B20 e MES-15: pausa di 6 giorni o meno: nessun calo di carico o di serie, il calendario scorre', () => {
  [0, 4, 6].forEach(pausa => {
    const t = conPausa(pausa);
    const r = carico(t);
    assert.ok(r.weight >= 100 && r.sets === 4 && !/[Rr]ientro dopo/.test(r.motivo), pausa + ' giorni: ' + JSON.stringify(r));
    assert.strictEqual(settimana(t), 5, pausa + ' giorni: la settimana del calendario');
  });
});

test('CST-01 (7-13 giorni): la rampa non avanza, si rifà la settimana dell\'ultima seduta; il carico scende solo da 10 giorni (CAR-04, -10%), le serie restano', () => {
  const t7 = conPausa(7), r7 = carico(t7);
  assert.strictEqual(settimana(t7), 4, '7 giorni (ultima seduta il lunedì della settimana 4): oggi, lunedì della 5, la settimana resta la 4');
  assert.ok(r7.weight >= 100 && r7.sets === 4 && !/[Rr]ientro dopo/.test(r7.motivo), '7 giorni: carico e serie come prima: ' + JSON.stringify(r7));
  const t10 = conPausa(10), r10 = carico(t10);
  assert.strictEqual(settimana(t10), 3, '10 giorni (ultima seduta il venerdì della settimana 3): settimana 3');
  assert.strictEqual(r10.weight, t10.a.json('caricoSceso(100, 0.9, ' + JSON.stringify(t10.nome) + ')'), '10 giorni: -10% (CAR-04)');
  assert.strictEqual(r10.sets, 4, '10 giorni: serie del piano (RIC-05 parte da 14)');
  /* la settimana rifatta non conta due volte: il giovedì è ancora la 4, il lunedì dopo la 5 */
  fatta(t7, 4, 100, 3);
  assert.strictEqual(settimana(t7), 4, 'giovedì: ancora la settimana 4');
  fatta(t7, 4, 100, 4);
  assert.strictEqual(settimana(t7), 5, 'il lunedì dopo la settimana rifatta: la 5');
});

test('CST-01 (14-27 giorni): si riparte dalla prima settimana del blocco; carico -10% fino a 20 giorni, -20% fino a 27 (CAR-04); serie -25% (RIC-05) dopo la rampa della settimana 1', () => {
  const t20 = conPausa(20, { sett: 6 }), r20 = carico(t20);
  assert.strictEqual(settimana(t20), 1, '20 giorni (ultima seduta nella settimana 3): si riparte dalla settimana 1 del blocco');
  assert.strictEqual(r20.weight, t20.a.json('caricoSceso(100, 0.9, ' + JSON.stringify(t20.nome) + ')'), '20 giorni: -10%');
  t20.a.spegni(['RIC-05']);
  const rampa = carico(t20).sets;
  t20.a.riaccendi();
  assert.strictEqual(rampa, 3, 'la settimana 1 del blocco ha la rampa (MES-03): 4 serie -> 3');
  assert.strictEqual(r20.sets, 2, 'e la prima seduta dopo la pausa il -25% (RIC-05): 3 -> 2');
  assert.ok(/rientro dopo 20 giorni: meno serie su tutto il piano/.test(r20.motivo), r20.motivo);
  const t24 = conPausa(24, { sett: 11 }), r24 = carico(t24);
  assert.strictEqual(settimana(t24), 7, '24 giorni (ultima seduta nella settimana 7, secondo blocco): si riparte dalla 7, la prima del blocco');
  assert.strictEqual(r24.weight, t24.a.json('caricoSceso(100, 0.8, ' + JSON.stringify(t24.nome) + ')'), '24 giorni: -20%');
  assert.strictEqual(r24.sets, 2);
});

test('CST-01 (28 giorni o più): nuovo blocco dalla sua prima settimana; carico -30% fino a 90 giorni, -50% oltre (CAR-04); serie -25%', () => {
  const t35 = conPausa(35, { sett: 10 }), r35 = carico(t35);
  assert.strictEqual(settimana(t35), 1, '35 giorni (ultima seduta nella settimana 5): prima settimana del blocco');
  assert.strictEqual(r35.weight, t35.a.json('caricoSceso(100, 0.7, ' + JSON.stringify(t35.nome) + ')'), '35 giorni: -30%');
  assert.strictEqual(r35.sets, 2, '35 giorni: rampa della settimana 1 e -25% delle serie');
  const t95 = conPausa(95, { sett: 16 }), r95 = carico(t95);
  assert.strictEqual(r95.weight, t95.a.json('caricoSceso(100, 0.5, ' + JSON.stringify(t95.nome) + ')'), '95 giorni: -50%');
  /* una pausa dopo uno scarico (settimana 6): si riparte dalla prima settimana del blocco dopo */
  const tS = conPausa(30, { sett: 11 });
  assert.strictEqual(settimana(tS), 7, 'ultima seduta nella settimana di scarico (6): si riparte dalla 7');
});

test('CST-01: una pausa che comincia prima del programma conta; senza nessuna seduta, spenta, senza consenso o con un programma v1 la settimana è quella del calendario', () => {
  const { a } = telP4S({ d: { level: 'intermedio' }, sett: 3 });
  a.storia([]);
  assert.strictEqual(a.json('settimanaProgramma()').numero, 3, 'nessuna seduta: non c è una pausa da misurare, il calendario (come prima)');
  a.storia([a.seduta(17, [{ nome: nomeLib(a, 'Chest Press Machine'), serie: serie(4, 100, 10) }])]);
  assert.strictEqual(a.json('settimanaProgramma()').numero, 1, 'ultima seduta 3 giorni prima dell inizio, poi due settimane senza sedute: si parte dalla settimana 1');
  a.spegni(['CST-01']);
  assert.strictEqual(a.json('settimanaProgramma()').numero, 3, 'CST-01 spenta: il calendario');
  a.riaccendi(); a.consenso(false);
  assert.strictEqual(a.json('settimanaProgramma()').numero, 3, 'senza consenso: il calendario');
  const v1 = conPausa(20, { v1: true, sett: 6 });
  assert.strictEqual(settimana(v1), 6, 'programma v1: il calendario, come prima');
});

test('B20: oltre i 65 anni i giorni di una pausa vera contano doppi (CAR-04 e serie), con il ritmo normale no; programmi v1 come prima', () => {
  /* 5 giorni: il ritmo normale di 2 sedute a settimana (il motivo della deroga del 2026-10-05) */
  const t5 = conPausa(5, { eta: 70, sett: 3 }), r5 = carico(t5);
  assert.ok(r5.weight >= 100 && !/[Rr]ientro dopo/.test(r5.motivo), '70 anni, 5 giorni: niente calo: ' + JSON.stringify(r5));
  const t7 = conPausa(7, { eta: 70, sett: 3 }), r7 = carico(t7);
  assert.strictEqual(r7.weight, t7.a.json('caricoSceso(100, 0.9, ' + JSON.stringify(t7.nome) + ')'), '70 anni, 7 giorni (contano 14): -10%');
  assert.strictEqual(r7.sets, 3, '70 anni, 7 giorni: serie -25% (CST-02 / RIC-05)');
  assert.ok(/dai 65 anni i giorni di pausa contano doppi/.test(r7.motivo), r7.motivo);
  const t11 = conPausa(11, { eta: 70, sett: 3 }), r11 = carico(t11);
  assert.strictEqual(r11.weight, t11.a.json('caricoSceso(100, 0.8, ' + JSON.stringify(t11.nome) + ')'), '70 anni, 11 giorni (contano 22): -20%');
  const t16 = conPausa(16, { eta: 70, sett: 4 }), r16 = carico(t16);
  assert.strictEqual(r16.weight, t16.a.json('caricoSceso(100, 0.7, ' + JSON.stringify(t16.nome) + ')'), '70 anni, 16 giorni (contano 32): -30%');
  const g7 = carico(conPausa(7, { eta: 40, sett: 3 }));
  assert.ok(g7.weight >= 100 && !/[Rr]ientro dopo/.test(g7.motivo), '40 anni, 7 giorni: giorni veri, nessun calo ' + JSON.stringify(g7));
  const v1 = conPausa(7, { eta: 70, v1: true, sett: 3 }), rv1 = carico(v1);
  assert.ok(rv1.weight >= 100 && !/[Rr]ientro dopo/.test(rv1.motivo), 'programma v1, 70 anni, 7 giorni: giorni veri come prima (deroga): ' + JSON.stringify(rv1));
});

test('CST-02: la seconda seduta dopo la pausa ha il 10% di serie in meno, poi il piano; +1 ripetizione in riserva nelle prime due sedute (non agli over 65)', () => {
  const t = conPausa(20, { sett: 6 });
  const nome = t.nome, rir = () => t.a.json('rirBersaglio(' + JSON.stringify(nome) + ')');
  const rirPrima = rir();
  t.a.spegni(['CST-02']);
  const rirSpenta = rir();
  t.a.riaccendi();
  assert.deepStrictEqual(rirPrima, [Math.min(4, rirSpenta[0] + 1), Math.min(5, rirSpenta[1] + 1)], 'prima seduta: +1 RIR (' + rirSpenta.join('-') + ' -> ' + rirPrima.join('-') + ')');
  /* fatta la prima seduta, due giorni dopo: la seconda */
  fatta(t, 3, 90, 2);
  const r2 = t.a.dati(t.a.chiama('caricoProssimo', nome, 100, 10, 8));
  t.a.spegni(['CST-02']);
  const r2Spenta = t.a.dati(t.a.chiama('caricoProssimo', nome, 100, 10, 8)), rir2Spenta = rir();
  t.a.riaccendi();
  assert.strictEqual(r2.sets, Math.max(2, Math.round(r2Spenta.sets * 0.9)), 'seconda seduta: -10% delle serie (' + r2Spenta.sets + ' -> ' + r2.sets + ')');
  assert.ok(r2.sets < r2Spenta.sets && /seconda seduta dopo la pausa: serie -10%/.test(r2.motivo), r2.motivo);
  assert.deepStrictEqual(rir(), [Math.min(4, rir2Spenta[0] + 1), Math.min(5, rir2Spenta[1] + 1)], 'seconda seduta: ancora +1 RIR');
  /* la terza: il piano */
  fatta(t, r2.sets, 90, 2);
  const r3 = t.a.dati(t.a.chiama('caricoProssimo', nome, 100, 10, 8));
  t.a.spegni(['CST-02']);
  const r3Spenta = t.a.dati(t.a.chiama('caricoProssimo', nome, 100, 10, 8)), rir3Spenta = rir();
  t.a.riaccendi();
  assert.ok(r3.sets === r3Spenta.sets && !/seconda seduta/.test(r3.motivo), 'terza seduta: il piano ' + JSON.stringify(r3));
  assert.deepStrictEqual(rir(), rir3Spenta, 'terza seduta: il RIR del piano');
  /* over 65: niente +1 RIR (è già a 3-4) */
  const o = conPausa(20, { sett: 6, eta: 70 });
  assert.deepStrictEqual(o.a.json('rirBersaglio(' + JSON.stringify(o.nome) + ')'), [3, 4], 'over 65: 3-4, non 4-5');
});

test('ALG-14: dopo il rientro il carico risale verso quello di prima, circa +5% a seduta (2,5% oltre i 65 anni), mai oltre; spenta = progressione normale', () => {
  const scena = (eta, spenta) => {
    const t = conPausa(24, { sett: 6, eta: eta });
    const giu = carico(t).weight;   /* -20% (CAR-04) */
    fatta(t, 3, giu, 3);
    if (spenta) t.a.spegni(['ALG-14']);
    return { t: t, giu: giu, r: carico(t), passo: t.a.json('passoAttrezzo(' + JSON.stringify(t.nome) + ', { kg: ' + giu + ' })') };
  };
  const on = scena(30, false), off = scena(30, true);
  assert.ok(on.giu <= 80 && on.giu >= 75, 'il rientro: -20% ' + on.giu);
  assert.ok(on.r.weight > off.r.weight, 'ALG-14 accesa sale più della progressione normale: ' + on.r.weight + ' contro ' + off.r.weight);
  assert.ok(on.r.weight <= on.giu * 1.05 + on.passo / 2 + 1e-9 && on.r.weight <= 100, 'circa +5% e mai oltre il carico di prima: ' + on.r.weight + ' da ' + on.giu);
  assert.ok(/dopo la pausa si risale verso il carico di prima \(100 kg\), di circa il 5% a seduta/.test(on.r.motivo), on.r.motivo);
  /* altre due sedute: si sale ancora, mai oltre 100 */
  let w = on.r.weight;
  for (let i = 0; i < 2; i++) { fatta(on.t, 3, w, 3); const r = carico(on.t); assert.ok(r.weight >= w && r.weight <= 100, 'seduta ' + (i + 3) + ': ' + r.weight); w = r.weight; }
  const o = scena(70, false);
  assert.ok(o.r.weight <= Math.max(o.giu * 1.025, o.giu + o.passo) + o.passo / 2 + 1e-9, 'over 65: circa +2,5% (o un passo dell attrezzo): ' + o.r.weight + ' da ' + o.giu);
});

/* ---------------------------------------------------------------------------------------------------- gravidanza o parto recente (REC-12 parte a) */
test('REC-12 a: inGravidanza e la bandiera in Opzioni: tiene accesa la modalità prudente, poi torna la risposta di prima', () => {
  const a = appP4S();
  assert.strictEqual(a.json('inGravidanza({ gravidanza: true })'), true);
  assert.strictEqual(a.json('inGravidanza({})'), false);
  assert.strictEqual(a.json('inGravidanza(null)'), false);
  a.g('window.__undo = []; showUndo = function (m) { window.__undo.push(String(m)); }; renderSetPage = function () {};');
  a.profilo({ sex: 'F', age: 31, parq: false });
  a.chiama('setCoach', 'gravidanza', true);
  let p = a.json('getProfile()');
  assert.ok(p.gravidanza === true && p.parq === true, 'accesa: gravidanza e modalità prudente ' + JSON.stringify(p));
  a.chiama('setCoach', 'parq', false);
  p = a.json('getProfile()');
  assert.strictEqual(p.parq, true, 'la modalità prudente non si spegne finché c\'è la gravidanza');
  assert.ok(/togli prima «Gravidanza o parto recente»/.test(a.json('window.__undo.join("|")')), 'e lo dice');
  a.chiama('setCoach', 'gravidanza', false);
  p = a.json('getProfile()');
  assert.ok(p.parq === false && p.gravidanza === undefined && p.parqDaGravidanza === undefined, 'spenta: torna la risposta di prima ' + JSON.stringify(p));
  a.profilo({ sex: 'F', age: 31, parq: true });
  a.chiama('setCoach', 'gravidanza', true); a.chiama('setCoach', 'gravidanza', false);
  assert.strictEqual(a.json('getProfile()').parq, true, 'con il PAR-Q già positivo, spegnere la gravidanza lascia la modalità prudente');
  /* la pagina: il rinvio fisso all ostetrica o al medico, solo quando è accesa; nessun numero, nessuna promessa */
  a.profilo({ sex: 'F', age: 31, parq: true, gravidanza: true });
  const h = a.json('paginaCoach(getProfile())');
  assert.ok(/Gravidanza o parto recente/.test(h) && /Parlane con l’ostetrica o con il medico/.test(h), 'interruttore e rinvio');
  const testo = a.json('TESTO_GRAVIDANZA');
  assert.ok(!/\d|sicur|garant|kcal|calori|protein|grammi|supin|pelvic|evita/i.test(testo), 'nessun numero, nessuna promessa, nessun consiglio bloccato: ' + testo);
  a.profilo({ sex: 'M', age: 31 });
  assert.ok(!/Gravidanza o parto recente/.test(a.json('paginaCoach(getProfile())')), 'non si propone a chi ha detto di essere un uomo');
});

test('REC-12 a: in gravidanza mai sotto 3 ripetizioni in riserva e nessuna tecnica al cedimento, anche con la modalità prudente persa', () => {
  const { a } = telP4S({ d: { level: 'avanzato', age: 30, sex: 'F' }, sett: 4 });
  a.profilo({ level: 'avanzato', age: 30, sex: 'F', goals: ['massa'], parq: false, gravidanza: true });
  const nomi = a.json('DAYS.flatMap(g => (loadData()[g] || []).map(e => e.name))');
  nomi.forEach(n => { const r = a.json('rirBersaglio(' + JSON.stringify(n) + ')'); assert.ok(r[0] >= 3, n + ' ' + r.join('-')); });
  /* con la bandiera accesa dalla pagina la modalità prudente c'è: il cancello delle tecniche nega il cedimento (G2, G2b) */
  a.profilo({ level: 'avanzato', age: 30, sex: 'F', goals: ['massa'], parq: true, gravidanza: true });
  const bud = a.json('budgetTecniche(briefTecnicheOggi("Lunedì"))');
  assert.ok(bud.gruppi.indexOf('G2') === -1 && bud.gruppi.indexOf('G2b') === -1 && bud.perSeduta === 0, JSON.stringify(bud.gruppi));
});

/* ---------------------------------------------------------------------------------------------------- regole bloccate (registro C.2) */
/* le stringhe (non i commenti) di tutto js/ e dei dizionari: nessun testo delle parti bloccate. Le frasi che c'erano già prima di P4-S sono elencate qui e possono solo diminuire */
/* le frasi: posizioni da evitare e ripresa dopo il parto (non la «presa supina» di un esercizio); i carichi alti ai 65enni; equilibrio e cadute (non le «cadute» di un drop set);
   test con norme; domande mediche; il modo fragile; la regola clinica della pressione (non la tecnica del respiro sotto carico di BIO-02) */
const BLOCCATE = {
  'REC-12 b': /posizione supina|sdraiat[ao] sulla schiena|pavimento pelvico|pelvic floor|suelo p[ée]lvico|beckenboden|diastasi|diastasis|(dopo il parto|after giving birth|tras el parto|nach der geburt)[^.:]{0,80}(\d|settiman|weeks|semanas|wochen|esercizi|exercises|ejercicios|übungen|attivit|activity|actividad)/i,
  'ETA-08 b': /70-85 ?%|pesi liberi pesanti|heavy free weights/i,
  'ETA-11': /rischio di cad|cadute (recenti|negli anziani)|prevenire le cadute|riduce .{0,20}cadut|risk of falling|fall risk/i,
  'ETA-12': /timed up|\bTUG\b|sit[- ]to[- ]stand test|alzate dalla sedia in \d|velocit[aà] del passo|forza della presa|handgrip/i,
  'ETA-13': /osteopor|anticoagul/i,
  'ETA-17': /\bfragil[ei]\b|modo fragile|frailty/i,
  'REC-06 b': /ipertes|pressione arteriosa|hypertens|pressione alta.{0,40}(RPE|campo)/i
};
/* il catalogo (js/coach/catalogo-regole.js, generato dalla mappa) descrive le regole bloccate con la loro riga «(bloccata) ... non implementata»: è la loro descrizione, non il testo */
const NON_GUARDATI = ['js/coach/catalogo-regole.js'];
/* la ripresa dopo il parto del momento «bambino» (metodi-momenti.js) c'era già prima del coach v2: tolta in INT-4 (tests/integrazione-onda4.test.js); la lista non ha più voci e non ne deve avere */
const GIA_PRIMA = [];
function stringheDi(src) {
  const out = [];
  acorn.parse(src, { ecmaVersion: 'latest', onToken: t => { if (t.type.label === 'string' || t.type.label === 'template') out.push(String(t.value)); } });
  return out;
}
function fileJs(dir) {
  return fs.readdirSync(path.join(R, dir), { withFileTypes: true }).flatMap(e => e.isDirectory() ? fileJs(path.join(dir, e.name)) : (/\.js$/.test(e.name) ? [path.join(dir, e.name)] : []));
}
test('registro C.2: nessun testo delle regole bloccate (REC-12 b, ETA-08 b, ETA-11..13, ETA-17, REC-06 b) nelle stringhe del codice né nei dizionari', () => {
  const trovate = [];
  fileJs('js').filter(f => NON_GUARDATI.indexOf(f.split(path.sep).join('/')) === -1).forEach(f => {
    const stringhe = stringheDi(fs.readFileSync(path.join(R, f), 'utf8'));
    Object.keys(BLOCCATE).forEach(cod => {
      const s = stringhe.find(x => BLOCCATE[cod].test(x));
      if (s) trovate.push(f.split(path.sep).join('/') + '|' + cod + '|' + s.slice(0, 80));
    });
  });
  const nuove = trovate.filter(t => GIA_PRIMA.indexOf(t.split('|').slice(0, 2).join('|')) === -1);
  assert.deepStrictEqual(nuove, [], 'testi delle regole bloccate:\n' + nuove.join('\n'));
  /* i file di P4-S non ne hanno nemmeno uno */
  ['js/coach/sicurezza/popolazioni.js', 'js/coach/sicurezza/soglie-popolazioni.js', 'js/ui/opzioni/il-coach.js'].forEach(f => {
    if (fs.existsSync(path.join(R, f))) assert.ok(!trovate.some(t => t.indexOf(f + '|') === 0), f);
  });
});

/* ---------------------------------------------------------------------------------------------------- chi non ha le condizioni: invariato */
test('invarianza: sotto i 65 anni, senza pause e senza gravidanza, programmi e 12 settimane di carichi uguali con e senza P4-S; programmi v1 uguali anche con una pausa', () => {
  /* buildProgram: stessi programmi (la potenza è solo degli over 65) */
  const senza = conP3B(caricaApp({ ora: '2026-10-05T12:00:00' })), con = appP4S();
  [{ goals: ['massa'], level: 'intermedio', days: 4 }, { goals: ['forza'], level: 'avanzato', days: 5, sex: 'F' }, { goals: ['salute'], level: 'principiante', days: 3, parq: 'si' },
   { goals: ['dimagrimento'], level: 'intermedio', days: 3, luogo: 'manubri', age: 55 }, { goals: ['massa'], level: 'principiante', days: 2, age: 16 }].forEach(d0 => {
    const d = Object.assign({ minutes: 60, luogo: 'palestra', age: 30, sex: 'M', seme: 'inv' }, d0);
    assert.strictEqual(JSON.stringify(con.chiama('buildProgram', d)), JSON.stringify(senza.chiama('buildProgram', d)), JSON.stringify(d0));
  });
  /* 12 settimane vissute (lunedì, martedì, giovedì, venerdì: nessuna pausa): stessi carichi, serie, ripetizioni e motivi */
  const vivi12 = conP4 => {
    const t = telefono({ d: { level: 'intermedio', age: 30 } });
    if (conP4) conP4S(t.a);
    const out = [];
    for (let n = 1; n <= 12; n++) { const w = viviSettimana(t.a, n, { rpe: 'bersaglio' }); Object.keys(w.giorni).forEach(g => out.push(w.giorni[g].map(v => [v.name, v.weight, v.sets, v.reps, v.coachNote]))); }
    return JSON.stringify(out);
  };
  assert.strictEqual(vivi12(true), vivi12(false), '12 settimane senza pause');
  /* programma v1 con una pausa di 20 giorni e un over 65: come prima */
  [[20, 70], [7, 70], [9, 30]].forEach(([pausa, eta]) => {
    const v1 = conP4 => { const t = conPausa(pausa, { v1: true, eta: eta, sett: 6, senzaP4S: !conP4 }); return JSON.stringify([carico(t), t.a.json('settimanaProgramma()'), t.a.json('rirBersaglio(' + JSON.stringify(t.nome) + ')')]); };
    assert.strictEqual(v1(true), v1(false), 'programma v1, ' + eta + ' anni, ' + pausa + ' giorni di pausa');
  });
});
