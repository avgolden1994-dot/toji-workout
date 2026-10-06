/* INT-2e, attrezzi dichiarati che arrivano alla scelta degli esercizi (CAS-01, D-P3): prove in node con l app vera in vm (tests/aiuto-app.js).
   Prima dell integrazione W2-T5 salvava prefs.attrezziCasa / prefs.extraPalestra e consentito (js/coach/programma/motore.js) non li leggeva: chi dichiarava la sbarra a casa non riceveva le trazioni,
   chi non dichiarava la panca a casa con i manubri riceveva la Panca Piana con i Manubri, chi in palestra diceva «nessuno di questi» riceveva lo stesso gli elastici. Le prove sotto falliscono su b36446d.
   Chi non risponde (campo null o assente) ha la scelta di sempre: i programmi sono uguali byte per byte. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const consentiti = (a, prefs) => a.json('(function () { const p = ' + JSON.stringify(prefs) + '; return EXERCISE_LIBRARY.filter(e => consentito(e.name, p)).map(e => senzaEmoji(e.name)); })()');
const solo = (x, y) => x.filter(n => y.indexOf(n) === -1);
const TUTTI_CASA = ['sbarra', 'panca', 'elastico', 'kettlebell', 'anelli', 'manubri'];

test('CAS-01: a casa con i manubri senza panca dichiarata niente esercizio che chiede una panca; con la panca tornano', () => {
  const a = caricaApp({ ora: LUNEDI });
  const base = consentiti(a, { luogo: 'manubri', fastidi: [] });
  const senza = consentiti(a, { luogo: 'manubri', fastidi: [], attrezziCasa: ['manubri'] });
  const con = consentiti(a, { luogo: 'manubri', fastidi: [], attrezziCasa: ['panca', 'manubri'] });
  assert.deepStrictEqual(solo(base, senza).sort(), ['Croci su Panca Manubri', 'Curl su Panca Inclinata', 'Dip su Panca', 'Hip Thrust con Manubrio', 'Panca Inclinata Manubri', 'Panca Piana Manubri',
    'Rematore con Petto Appoggiato', 'Seal Row', 'Spider Curl', 'Y-Raise su Panca Inclinata'], 'chi non ha la panca non riceve i 10 esercizi che la chiedono (attributo serve)');
  assert.deepStrictEqual(solo(senza, base), [], 'dichiarare di meno non aggiunge niente');
  assert.deepStrictEqual(con, base, 'con la panca dichiarata la scelta e quella di prima (a casa con i manubri la panca c era)');
});

test('CAS-01: a casa sbarra, elastici, kettlebell e anelli dichiarati tornano (prima non c erano mai); non dichiarati restano fuori', () => {
  const a = caricaApp({ ora: LUNEDI });
  const base = consentiti(a, { luogo: 'corpo', fastidi: [] });
  const sbarra = consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: ['sbarra'] });
  assert.deepStrictEqual(solo(sbarra, base).sort(), ['Leg Raise alla Sbarra', 'Trazioni Negative', 'Trazioni Presa Inversa (Chin-up)', 'Trazioni Presa Neutra', 'Trazioni alla Sbarra (Pull-ups)']);
  const elastico = consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: ['elastico'] });
  assert.deepStrictEqual(solo(elastico, base).sort(), ['Alzate Laterali con Elastico', 'Face Pull con Elastico', 'Lat Pulldown con Elastico'], 'il nome dice «pulldown» (macchine) ma l attributo dice elastico');
  assert.deepStrictEqual(solo(consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: ['kettlebell'] }), base), ['Kettlebell Swing']);
  assert.deepStrictEqual(solo(consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: ['anelli'] }), base), ['Rematore agli Anelli']);
  assert.deepStrictEqual(solo(consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: [] }), base), [], 'una risposta vuota a corpo libero non aggiunge niente');
  assert.deepStrictEqual(solo(base, consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: [] })), [], 'e non toglie niente: il rematore inverso sotto un tavolo (nota del programma) resta come prima');
  /* quelli che non si dichiarano (parallele, sedia romana, ruota) non tornano con nessuna risposta */
  const tutto = consentiti(a, { luogo: 'manubri', fastidi: [], attrezziCasa: TUTTI_CASA });
  ['Dip alle Parallele', 'Ab Wheel', 'Hyperextension (Lombari)', 'Leg Raise alla Sedia Romana'].forEach(n => assert.ok(tutto.indexOf(n) === -1, n + ' non si dichiara'));
  /* il rematore inverso con i manubri nel luogo non c era (c e il rematore coi manubri): con la sbarra o gli anelli dichiarati si */
  assert.ok(consentiti(a, { luogo: 'manubri', fastidi: [] }).indexOf('Rematore Inverso (Corpo Libero)') === -1);
  assert.ok(consentiti(a, { luogo: 'manubri', fastidi: [], attrezziCasa: ['anelli', 'manubri'] }).indexOf('Rematore Inverso (Corpo Libero)') !== -1);
});

test('CAS-01: in palestra «nessuno di questi» toglie elastici, kettlebell e anelli anche dalla palestra completa; un elenco di attrezzi con il kettlebell dichiarato lo ammette', () => {
  const a = caricaApp({ ora: LUNEDI });
  const base = consentiti(a, { luogo: 'palestra', fastidi: [] });
  const nessuno = consentiti(a, { luogo: 'palestra', fastidi: [], extraPalestra: [] });
  assert.deepStrictEqual(solo(base, nessuno).sort(), ['Alzate Laterali con Elastico', 'Face Pull con Elastico', 'Kettlebell Swing', 'Lat Pulldown con Elastico', 'Rematore agli Anelli']);
  assert.deepStrictEqual(consentiti(a, { luogo: 'palestra', fastidi: [], extraPalestra: ['elastico', 'kettlebell', 'anelli'] }), base, 'tutti dichiarati = la palestra completa di prima');
  const lista = { luogo: 'palestra', fastidi: [], attrezziPalestra: ['macchine'] };
  const senzaExtra = consentiti(a, lista);
  assert.deepStrictEqual(solo(consentiti(a, Object.assign({ extraPalestra: ['kettlebell'] }, lista)), senzaExtra), ['Kettlebell Swing']);
  assert.deepStrictEqual(solo(consentiti(a, Object.assign({ extraPalestra: ['elastico'] }, lista)), senzaExtra).sort(), ['Alzate Laterali con Elastico', 'Face Pull con Elastico', 'Lat Pulldown con Elastico'],
    'gli elastici dichiarati passano anche se l elenco della palestra non ha ne manubri ne cavi (il nome non decide)');
});

test('CAS-01: campo non dichiarato (null o assente) = scelta di sempre; con la regola spenta i campi salvati non cambiano la scelta; fastidi e odiati valgono ancora sugli attrezzi dichiarati', () => {
  const a = caricaApp({ ora: LUNEDI });
  ['palestra', 'manubri', 'corpo'].forEach(luogo => {
    const base = consentiti(a, { luogo: luogo, fastidi: [] });
    assert.deepStrictEqual(consentiti(a, { luogo: luogo, fastidi: [], attrezziCasa: null, extraPalestra: null, manubriKg: null }), base, luogo + ': null = come prima');
  });
  a.spegni(['CAS-01']);
  assert.deepStrictEqual(consentiti(a, { luogo: 'manubri', fastidi: [], attrezziCasa: ['manubri'] }), consentiti(a, { luogo: 'manubri', fastidi: [] }), 'CAS-01 spenta: la panca non dichiarata non toglie niente');
  assert.deepStrictEqual(consentiti(a, { luogo: 'corpo', fastidi: [], attrezziCasa: TUTTI_CASA }), consentiti(a, { luogo: 'corpo', fastidi: [] }), 'CAS-01 spenta: la sbarra dichiarata non aggiunge niente');
  a.riaccendi();
  const dichiarati = { luogo: 'corpo', attrezziCasa: ['sbarra', 'panca', 'kettlebell'] };
  assert.ok(consentiti(a, Object.assign({ fastidi: [] }, dichiarati)).indexOf('Kettlebell Swing') !== -1);
  assert.ok(consentiti(a, Object.assign({ fastidi: ['schiena'] }, dichiarati)).indexOf('Kettlebell Swing') === -1, 'la schiena dolente toglie lo swing anche con il kettlebell dichiarato');
  assert.ok(consentiti(a, Object.assign({ fastidi: [] }, dichiarati)).indexOf('Dip su Panca') !== -1 && consentiti(a, Object.assign({ fastidi: ['spalle'] }, dichiarati)).indexOf('Dip su Panca') === -1, 'idem la spalla e i dip');
  assert.ok(consentiti(a, Object.assign({ fastidi: [], odiati: ['🏹 Trazioni alla Sbarra (Pull-ups)'] }, dichiarati)).indexOf('Trazioni alla Sbarra (Pull-ups)') === -1, 'un esercizio odiato resta fuori');
});

/* ---- dentro i programmi veri ---- */
const PROFILI = [];
['principiante', 'intermedio', 'avanzato'].forEach(level => [2, 3, 4, 5].forEach(days => [['massa'], ['dimagrimento'], ['forza'], ['salute']].forEach(goals => [30, 60].forEach(minutes =>
  PROFILI.push({ goals: goals, level: level, days: days, minutes: minutes, fastidi: [], sex: days % 2 ? 'M' : 'F', age: 30 + days, sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, freq: 'auto', parq: 'no', seme: 'ad' + level + days + minutes })))));

function programmi(a, luogo, extra) {
  return a.json('(function () { const out = []; ' + JSON.stringify(PROFILI) + '.forEach(d => { d.luogo = ' + JSON.stringify(luogo) + '; Object.assign(d, ' + JSON.stringify(extra) + '); const prog = buildProgram(d); out.push({ seme: d.seme, prefs: prog.prefs, sedute: prog.sedute.map(sd => (sd.esercizi || []).map(e => e.name)) }); }); return out; })()');
}
const nomiDi = p => [].concat.apply([], p.sedute);
const serveDi = (a, nome) => a.json('serveAttrezzo(' + JSON.stringify(nome) + ')');

test('CAS-01: nessun programma ha un esercizio che chiede un attrezzo di casa non dichiarato (96 profili, quattro risposte); la panca non dichiarata non c e mai', () => {
  const a = caricaApp({ ora: LUNEDI });
  assert.strictEqual(PROFILI.length, 96);
  const RISPOSTE = [
    ['manubri', ['manubri']], ['manubri', ['elastico', 'manubri']], ['corpo', []], ['corpo', ['sbarra', 'anelli']]
  ];
  RISPOSTE.forEach(([luogo, dichiarati]) => {
    const progs = programmi(a, luogo, { attrezziCasa: dichiarati });
    progs.forEach(p => nomiDi(p).forEach(n => {
      const s = serveDi(a, n) || [];
      s.forEach(tok => {
        if (['panca', 'sbarra', 'elastico', 'kettlebell', 'anelli'].indexOf(tok) === -1) return;
        assert.ok(dichiarati.indexOf(tok) !== -1, luogo + ' ' + JSON.stringify(dichiarati) + ' (' + p.seme + '): ' + n + ' chiede ' + tok + ' che non e dichiarato');
      });
    }));
    assert.strictEqual(progs.length, 96);
  });
});

test('CAS-01: gli attrezzi dichiarati arrivano nei programmi (trazioni con la sbarra, anelli, elastici), e chi non risponde ha gli stessi programmi di chi non ha il campo', () => {
  const a = caricaApp({ ora: LUNEDI });
  const conta = (progs, re) => progs.filter(p => nomiDi(p).some(n => re.test(n))).length;
  const sbarra = programmi(a, 'corpo', { attrezziCasa: ['sbarra', 'anelli', 'elastico'] });
  assert.ok(conta(sbarra, /Trazioni/) >= 20, 'le trazioni arrivano a chi ha dichiarato la sbarra: ' + conta(sbarra, /Trazioni/));
  assert.ok(conta(sbarra, /Anelli/) >= 20, 'il rematore agli anelli a chi ha dichiarato gli anelli: ' + conta(sbarra, /Anelli/));
  assert.ok(conta(sbarra, /Elastico/) >= 10, 'gli elastici a chi li ha dichiarati: ' + conta(sbarra, /Elastico/));
  assert.strictEqual(conta(programmi(a, 'corpo', {}), /Trazioni|Anelli|Elastico/), 0, 'a corpo libero senza risposta non c e niente di tutto questo (come prima)');
  /* null o assente: byte per byte lo stesso programma */
  ['palestra', 'manubri', 'corpo'].forEach(luogo => {
    const senza = JSON.stringify(programmi(a, luogo, {})), nulli = JSON.stringify(programmi(a, luogo, { attrezziCasa: null, extraPalestra: null, manubriKg: null }));
    assert.strictEqual(nulli, senza, luogo + ': i campi null non cambiano un programma');
  });
});

/* ---- il manubrio piu pesante (manubriKg) ---- */
const pesiManubri = (a, extra) => a.json('(function () { const out = []; ' + JSON.stringify(PROFILI) + '.forEach(d => { d.luogo = "manubri"; Object.assign(d, ' + JSON.stringify(extra) + '); const prog = buildProgram(d); ' +
  'prog.sedute.forEach(sd => sd.esercizi.forEach(e => { if (attrezzoDi(e.name) === "manubri") out.push([d.seme, e.name, Number(e.weight)]); })); out.push([d.seme, "note", prog.note.filter(n => /manubri i carichi di partenza/.test(n))]); }); return out; })()');

test('CAS-01: il manubrio piu pesante dichiarato e il tetto dei carichi di partenza con i manubri (stima e libreria); senza dichiarazione i carichi sono quelli di prima', () => {
  const a = caricaApp({ ora: LUNEDI });
  const senza = pesiManubri(a, { attrezziCasa: ['panca', 'manubri'] });
  const con = pesiManubri(a, { attrezziCasa: ['panca', 'manubri'], manubriKg: 12 });
  const pesi = r => r.filter(x => x[1] !== 'note');
  assert.ok(pesi(senza).some(x => x[2] > 12), 'prima: la partenza supera 12 kg per molti esercizi con i manubri (' + pesi(senza).filter(x => x[2] > 12).length + ')');
  assert.deepStrictEqual(pesi(con).filter(x => x[2] > 12), [], 'con 12 kg nessun esercizio con i manubri parte sopra 12');
  assert.deepStrictEqual(pesi(con).map(x => [x[0], x[1]]), pesi(senza).map(x => [x[0], x[1]]), 'gli esercizi scelti sono gli stessi: il limite non cambia la scheda');
  assert.deepStrictEqual(pesi(con).filter((x, i) => x[2] !== pesi(senza)[i][2] && x[2] !== 12), [], 'cambia solo chi superava il limite, e va a 12');
  const nota = r => r.filter(x => x[1] === 'note' && x[2].length).length;
  assert.strictEqual(nota(senza), 0);
  assert.ok(nota(con) > 0, 'la nota dice che la partenza e limitata, solo dove lo e');
  const unaNota = con.find(x => x[1] === 'note' && x[2].length)[2][0];
  assert.strictEqual(unaNota, 'Con i manubri i carichi di partenza non superano il più pesante che hai (12 kg).');
  /* un limite alto non cambia niente */
  assert.deepStrictEqual(pesiManubri(a, { attrezziCasa: ['panca', 'manubri'], manubriKg: 100 }), senza);
  /* con la regola spenta il campo resta nel profilo e non fa niente */
  a.spegni(['CAS-01']);
  assert.deepStrictEqual(pesi(pesiManubri(a, { attrezziCasa: ['panca', 'manubri'], manubriKg: 12 })).filter(x => x[2] > 12).length > 0, true, 'CAS-01 spenta: nessun tetto');
});

test('CAS-01: il tetto vale anche per i carichi proposti da una sostituzione (pesoPartenza) e non per il bilanciere ne fuori dal luogo con i manubri', () => {
  const a = caricaApp({ ora: LUNEDI });
  const profilo = extra => a.profilo(Object.assign({ level: 'intermedio', sex: 'M', age: 30, weight: 80 }, extra));
  profilo({ luogo: 'manubri' });
  const prima = { panca: a.json('pesoPartenza(nomeInLibreria("Panca Piana Manubri")).peso'), bilanciere: a.json('pesoPartenza(nomeInLibreria("Squat con Bilanciere")).peso') };
  assert.ok(prima.panca > 10 && prima.bilanciere > 10, JSON.stringify(prima));
  profilo({ luogo: 'manubri', manubriKg: 10 });
  assert.strictEqual(a.json('pesoPartenza(nomeInLibreria("Panca Piana Manubri")).peso'), 10);
  assert.strictEqual(a.json('pesoPartenza(nomeInLibreria("Squat con Bilanciere")).peso'), prima.bilanciere, 'il bilanciere non e un manubrio');
  profilo({ luogo: 'palestra', manubriKg: 10 });
  assert.strictEqual(a.json('pesoPartenza(nomeInLibreria("Panca Piana Manubri")).peso'), prima.panca, 'in palestra il campo non vale');
});
