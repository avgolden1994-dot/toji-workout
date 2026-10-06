/* Correzioni dopo la revisione indipendente dell onda 2b/2c (INT-2d, docs/coach-v2-decisioni.md D-P21): una prova per correzione, con i numeri scritti.
   Ogni prova fallisce sul codice di coach-v2-onda-2c (ec06469): B1 il controllo dell 8a settimana del principiante, M1 le note false, M5 il RIR 0 del
   principiante, M2 i sei giorni ciclici, M4 il cancello. Prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';   /* inizio del programma: lunedi della settimana 1 */
const BASE = { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', priorita: [], usaProfilo: false, seme: 'int2d' };
const FB = (srpe, extra) => Object.assign({ srpe: srpe, arrivo: 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, esercizi: [] }, extra || {});
const SERIE = n => Array.from({ length: n }, () => [60, 10, true]);

/* un telefono con il programma da principiante a 12 settimane salvato come lo salva l app; `sett` = la settimana in cui si e (1..12), `giorno` = 0 lunedi */
function telefono(opz) {
  const o = Object.assign({ sett: 8, giorno: 2, consenso: true, d: {} }, opz || {});
  const a = caricaApp({ ora: LUNEDI, consenso: o.consenso });
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, o.d)));
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, versione: 2, piano: p.piano, schema: { sets: 3, reps: 10 }, seme: 'int2d', ispirazioni: p.ispirazioni, perche: p.perche });
  a.profilo({ level: (o.d.level || BASE.level), age: o.d.age || BASE.age, goals: BASE.goals, parq: false, luogo: BASE.luogo });
  a.ora(new Date(2026, 9, 5 + 7 * (o.sett - 1) + o.giorno, 12, 0, 0));
  return { a, p };
}
/* le ultime tre sedute con il loro questionario (feedback); `fb` = tre risposte; Leg Press a 60 kg x 10 come carico di riferimento */
function storiaTre(a, fb) {
  a.storia([0, 1, 2].map(i => a.seduta(2 + 2 * i, [{ nome: 'Leg Press', serie: SERIE(3) }], { feedback: fb[i], settimana: { numero: 7, fase: 'carico' } })));
}
const prontezza = (a, punteggi, sonno) => a.scrivi('coach_plus_prontezza_storia_toji', punteggi.map((x, i) => ({ data: a.ymd(a.giorniFa(punteggi.length - i)), punteggio: x, sonno: sonno === undefined ? 2 : sonno })));
const programma = a => a.leggi(a.chiave('progKey'));
const annulla = a => a.g('lastUndo');

/* ============ B1: il controllo dell 8a settimana esiste, decide dai dati, ha il motivo e si annulla ============ */

test('B1: all 8a settimana con fatica alta il programma salvato diventa uno scarico «basso» (serie -35%, carico -5%) con il motivo scritto', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(a.json('livelloFatica()'), 'alta', 'tre sedute su tre al limite: sRPE medio 10, fatica alta');
  const s = a.json('settimanaProgramma()');
  assert.strictEqual(s.numero, 8);
  assert.strictEqual(s.fase, 'scarico', 'la settimana 8 e di scarico, non piu «carico»');
  assert.strictEqual(s.doseFissa, 'bassa');
  const p = programma(a);
  assert.strictEqual(p.fasi[7], 'scarico');
  assert.deepStrictEqual(p.fasi.map((f, i) => f === 'scarico' ? i + 1 : 0).filter(Boolean), [8, 12], 'scarichi: la 8a del controllo e la verifica della 12a');
  const w = p.piano.settimane[7];
  assert.deepStrictEqual([w.fase, w.dose, w.volume, w.carico], ['scarico', 'bassa', 0.65, 0.95]);
  assert.deepStrictEqual(w.rir.A, [3, 4], 'RIR 3-4 come la verifica');
  assert.strictEqual(p.piano.controllo.esito, 'scarico');
  assert.strictEqual(p.piano.controllo.fatica, 'alta');
  assert.ok(/^Controllo della settimana 8 • la stanchezza delle ultime sedute è alta • le ultime sedute erano al limite o fatte da stanco • questa settimana è uno scarico leggero: serie -35% e carico -5% • poi si riprende dal carico di prima$/.test(p.piano.controllo.motivo), p.piano.controllo.motivo);
  assert.ok(p.perche.some(x => x.codice === 'PRN-03' && /^Controllo della settimana 8/.test(x.testo)), 'il perche con il codice');
  assert.strictEqual(s.controllo, p.piano.controllo.motivo);
});

test('B1: la dose dello scarico del controllo e la «bassa» del registro e si calcola sul carico di prima, mai composta', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(8)]);
  const r = a.dati(a.chiama('caricoProssimo', 'Leg Press', 60, 10, 3));
  assert.strictEqual(r.tipo, 'scarico');
  assert.strictEqual(r.weight, 57, '60 kg x 0,95 (e non x 0,9 della fatica alta)');
  assert.strictEqual(r.sets, 2, '3 serie x 0,65 = 1,95 -> 2');
  assert.ok(/volume -35%/.test(r.motivo), r.motivo);
  /* la seduta di scarico e fatta: la prossima della stessa settimana parte ancora da 60 kg, non da 57 */
  a.storia([a.seduta(0, [{ nome: 'Leg Press', serie: [[57, 10, true], [57, 10, true]] }], { feedback: FB(6), settimana: { numero: 8, fase: 'scarico' } })].concat(a.leggi(a.chiave('historyKey'))));
  const r2 = a.dati(a.chiama('caricoProssimo', 'Leg Press', 60, 10, 3));
  assert.strictEqual(r2.weight, 57, 'stesso carico di riferimento (60 kg), non 54');
});

test('B1: con fatica bassa e nessun segnale la settimana 8 continua come carico, e lo dice', () => {
  const { a } = telefono();
  storiaTre(a, [FB(3), FB(3), FB(6)]);
  prontezza(a, [85, 80, 90, 85, 80]);
  assert.strictEqual(a.json('livelloFatica()'), 'bassa');
  const s = a.json('settimanaProgramma()');
  assert.strictEqual(s.fase, 'carico');
  const p = programma(a);
  assert.strictEqual(p.fasi[7], 'carico');
  assert.strictEqual(p.piano.settimane[7].fase, 'carico');
  assert.strictEqual(p.piano.controllo.esito, 'carico');
  assert.ok(/la stanchezza è bassa e non ci sono segnali/.test(p.piano.controllo.motivo));
  assert.strictEqual(s.doseFissa, undefined);
});

test('B1: un segnale basta anche con fatica bassa: sonno scarso in 4 check-in su 7, due sedute al limite, dolore da 4/10, uno scarico del coach gia deciso', () => {
  const casi = {
    sonno: a => { storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [85, 85, 85, 85, 85, 85, 85], 0); const x = a.leggi('coach_plus_prontezza_storia_toji'); x.forEach((v, i) => { v.sonno = i < 3 ? 2 : 0; }); a.scrivi('coach_plus_prontezza_storia_toji', x); },
    sedute: a => { storiaTre(a, [FB(10), FB(10), FB(3)]); prontezza(a, [85, 85, 85]); },
    dolore: a => { storiaTre(a, [FB(3, { dolore: true, zone: ['ginocchio'], livello: 4 }), FB(3), FB(3)]); prontezza(a, [85, 85, 85]); },
    scarico: a => { storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [85, 85, 85]); a.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'stanchezza alta per piu giorni di fila' } }); }
  };
  Object.keys(casi).forEach(k => {
    const { a } = telefono();
    casi[k](a);
    assert.strictEqual(a.json('livelloFatica()') === 'alta', false, k + ': la fatica da sola non basta a spiegare lo scarico');
    const s = a.json('settimanaProgramma()');
    assert.strictEqual(s.fase, 'scarico', k);
    assert.deepStrictEqual(programma(a).piano.controllo.segnali, [k], k);
  });
  /* un dolore lieve (3/10) e un solo check-in con sonno scarso non sono segnali */
  const { a } = telefono();
  storiaTre(a, [FB(3, { dolore: true, zone: ['ginocchio'], livello: 3 }), FB(3), FB(3)]); prontezza(a, [85, 85, 85, 85, 85]);
  assert.strictEqual(a.json('settimanaProgramma()').fase, 'carico');
});

test('B1: senza dati sulla stanchezza (nessun questionario, nessuna prontezza) la fatica «media» di livelloFatica scarica per prudenza, e lo scrive', () => {
  const { a } = telefono();
  assert.strictEqual(a.json('livelloFatica()'), 'media');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  assert.ok(/non ci sono ancora dati sulla tua stanchezza: per prudenza si scarica/.test(programma(a).piano.controllo.motivo));
});

test('B1: serve il consenso (senza il coach il programma resta com e), e solo alla settimana 8', () => {
  const senza = telefono({ consenso: false });
  storiaTre(senza.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(senza.a.json('settimanaProgramma().fase'), 'carico');
  assert.strictEqual(programma(senza.a).piano.controllo, undefined, 'niente scritto');
  assert.strictEqual(programma(senza.a).piano.settimane[7].fase, 'controllo');
  [7, 9, 12].forEach(sett => {
    const { a } = telefono({ sett: sett });
    storiaTre(a, [FB(10), FB(10), FB(10)]);
    const s = a.json('settimanaProgramma()');
    assert.strictEqual(s.fase, sett === 12 ? 'scarico' : 'carico', 'settimana ' + sett);
    assert.strictEqual(programma(a).piano.controllo, undefined, 'settimana ' + sett + ': nessun controllo');
  });
});

test('B1: la decisione e presa una volta sola (una fatica diversa dopo non la cambia) e si annulla: il programma torna com era e il controllo non si ripete', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(8)]);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [90, 90, 90]);
  assert.strictEqual(a.json('livelloFatica()'), 'bassa');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico', 'la decisione resta');
  assert.strictEqual(typeof annulla(a), 'function', 'c e l annulla');
  a.g('lastUndo()');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'carico', 'annullato: la settimana continua');
  const p = programma(a);
  assert.deepStrictEqual([p.fasi[7], p.piano.settimane[7].fase, p.piano.controllo.annullato, p.piano.controllo.esito], ['carico', 'carico', true, 'carico']);
  assert.strictEqual(a.json('settimanaProgramma().doseFissa'), undefined);
  storiaTre(a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'carico', 'dopo l annulla il controllo non si ripete');
});

test('B1: non toccano il controllo i programmi senza (intermedio, prudenti) ne la regola spenta', () => {
  const inter = telefono({ d: { level: 'intermedio' }, sett: 6, giorno: 0 });
  assert.strictEqual(inter.p.piano.struttura.controllo, null);
  storiaTre(inter.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(inter.a.json('settimanaProgramma().fase'), 'scarico', 'la 6a dell intermedio e lo scarico a calendario');
  assert.strictEqual(programma(inter.a).piano.controllo, undefined);
  const over = telefono({ d: { age: 70 }, sett: 8 });
  assert.strictEqual(over.p.piano.struttura.controllo, null, 'prudente: blocchi 3+1, nessun controllo');
  const spenta = telefono();
  spenta.a.spegni(['PRN-03']);
  storiaTre(spenta.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(spenta.a.json('settimanaProgramma().fase'), 'carico');
  assert.strictEqual(programma(spenta.a).piano.controllo, undefined);
});

test('B1: la nota del programma dice quello che il codice fa (e c e la traduzione in en, es, de)', () => {
  const { p } = telefono();
  const nota = p.note.find(n => /^Programma di 12 settimane/.test(n));
  assert.ok(nota && /il coach guarda la tua stanchezza: se sei stanco, quella settimana diventa uno scarico leggero \(serve il consenso ai dati del coach\)/.test(nota), nota);
  assert.ok(!/scarichi prima/.test(nota));
});
