/* INT-2g (ultimo giro prima della PR dell'onda 2e): le rifiniture trovate dalla seconda revisione indipendente (revisione-onda2f).
   Ogni prova qui sotto e stata scritta ROSSA sul codice di 33a6764 (tag coach-v2-onda-2f) e diventa verde con la correzione.
   1  «Dove ti blocchi?» non promette cio che non fa: per chi comincia il punto debole CAMBIA il programma (accessorio nel giorno pesante, variante alla terza esposizione): 45 programmi su 45
   2  «Hip Hinge a Corpo Libero» e sempre 2 serie da 12 (con la forza era 2x6 r120: una cerniera senza carico a 6 ripetizioni non allena niente)
   3  la nota di chi comincia nel powerlifting dice «stacco rumeno» (la scheda ha il rumeno, non lo stacco da terra) */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const a = caricaApp({ ora: LUNEDI });
const se = n => a.g('senzaEmoji')(n);
const build = d => a.dati(a.chiama('buildProgram', d));
const PL = { goals: ['forza'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', usaProfilo: false, forzaTipo: 'powerlifting' };
const tutti = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi));
const firma = p => JSON.stringify(p.sedute.map(sd => sd.esercizi.map(e => [se(e.name), e.sets, e.reps, e.rest])));

test('FRZ-03/04: il testo di «Dove ti blocchi?» per chi comincia dice il vero (il punto debole cambia il programma: un esercizio in piu, la variante della terza esposizione)', () => {
  const testo = a.g('FORZA_NOTA_PUNTI');
  const PUNTI = [['panca-meta'], ['panca-petto'], ['squat-buca'], ['stacco-chiusura'], ['panca-meta', 'squat-buca'], ['panca-chiusura', 'stacco-terra']];
  let cambiano = 0, totale = 0;
  [3, 4, 5].forEach(days => [45, 60, 90].forEach(minutes => PUNTI.forEach(pd => {
    const base = Object.assign({}, PL, { days, minutes, seme: 'g1-' + days + minutes });
    const senza = build(base), con = build(Object.assign({}, base, { puntiDeboli: pd }));
    totale++;
    if (firma(senza) !== firma(con)) cambiano++;
  })));
  assert.ok(cambiano > 0, 'per chi comincia il punto debole cambia qualcosa (' + cambiano + ' su ' + totale + ')');
  /* il testo non puo dire il contrario di cio che il generatore fa */
  assert.ok(!/non cambia il suo programma/.test(testo), 'il testo dice che il punto debole non cambia il programma di chi comincia, ma ' + cambiano + ' su ' + totale + ' lo cambiano');
  const perChiComincia = testo.split(/chi comincia/i).pop();
  assert.ok(/chi comincia/i.test(testo) && /esercizio/.test(perChiComincia), 'il testo dice cosa cambia per chi comincia (l esercizio in piu)');
  assert.ok(/terza|tre volte/.test(perChiComincia), 'il testo dice della variante alla terza esposizione');
});

test('FRZ-03: il perche della variante non parla di «giorni medi e leggeri» (chi comincia non li ha)', () => {
  const p = build(Object.assign({}, PL, { days: 3, puntiDeboli: ['panca-meta'], seme: 'g1b' }));
  const frz3 = (p.perche || []).filter(x => x.codice === 'FRZ-03');
  assert.strictEqual(frz3.length, 1, 'il perche di FRZ-03 c e (la terza panca e la presa stretta)');
  assert.ok(!/giorni medi e leggeri/.test(frz3[0].testo), frz3[0].testo);
});

test('Hip Hinge a Corpo Libero: sempre 2 serie da 12, anche con la forza come obiettivo (era 2x6 r120)', () => {
  const HH = 'Hip Hinge a Corpo Libero';
  const dove = [], visti = { n: 0, forza: 0 };
  const BASE = { level: 'intermedio', days: 3, minutes: 45, sex: 'M', age: 40, parq: 'no', usaProfilo: false, fastidi: [], luogo: 'corpo' };
  [['forza'], ['forza', 'massa'], ['massa'], ['glutei'], ['dimagrimento'], ['salute']].forEach(goals => ['corpo', 'manubri', 'palestra'].forEach(luogo => [[], ['schiena']].forEach(fastidi => ['principiante', 'intermedio', 'avanzato'].forEach(level => [2, 3, 4, 5].forEach(days => {
    const d = Object.assign({}, BASE, { goals, luogo, fastidi, level, days, seme: 'g2' + goals.join('') + luogo + fastidi.join('') + level + days });
    build(d).sedute.forEach(sd => sd.esercizi.forEach(e => {
      if (se(e.name) !== HH) return;
      visti.n++; if (goals[0] === 'forza') visti.forza++;
      if (e.reps !== 12 || e.sets > 2) dove.push([goals.join('+'), luogo, fastidi.join('+') || '-', level, days, sd.titolo].join('|') + ' ' + e.sets + 'x' + e.reps + ' r' + e.rest);
    }));
  })))));
  assert.ok(visti.n > 50 && visti.forza > 10, 'la griglia lo esercita: ' + visti.n + ' occorrenze, ' + visti.forza + ' con la forza');
  assert.deepStrictEqual(dove.slice(0, 8), [], dove.length + ' occorrenze non sono 2x12');
});

test('Powerlifting, chi comincia: la nota di struttura dice «stacco rumeno» (la scheda ha il rumeno, non lo stacco da terra)', () => {
  [3, 4].forEach(days => {
    const p = build(Object.assign({}, PL, { days, seme: 'g3' + days }));
    const nomi = tutti(p).map(e => se(e.name));
    assert.ok(nomi.indexOf('Stacco Rumeno') !== -1 && nomi.indexOf('Stacco da Terra (Deadlift)') === -1, 'lo stacco della scheda e il rumeno: ' + nomi.join(', '));
    const nota = p.note.find(t => /^Forza: squat e panca almeno due volte/.test(t));
    assert.ok(nota, 'la nota di struttura c e');
    assert.ok(/rumeno/i.test(nota), 'la nota dice quale stacco: ' + nota);
  });
});
