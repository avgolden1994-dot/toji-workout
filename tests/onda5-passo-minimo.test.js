/* CAR-18 / ALG-06 (INT-5d, D-P26): la guardia del +25% lascia passare UN passo di griglia quando il +25% non contiene nessun peso sopra il carico.
   Difetto trovato da INT-5c dopo A1: con un carico piccolo e una griglia grossa (pila da 2,5 kg: 5 -> 7,5 kg e' +50%, manubri da 3 kg: +1 kg e' +33%) il tetto del +25% non ammette NESSUN
   peso di griglia sopra il carico e la guardia di faseCalibrazione («+2,5 kg sarebbe un salto del 50%: prima una ripetizione in piu») teneva il peso per tutta la calibrazione, cioe per
   tutto il programma di un principiante (8 settimane): principianti PAR-Q 5,6% -> 17,1% di coppie mai salite, gravidanza 11,8% -> 32,4%, over 66 7,3% -> 20,4%; stesso meccanismo di m3 negli adulti.
   La correzione e la stessa scelta di limitaSalitaBase (INT-4): `passoUnicoOltreTetto` da il primo peso della griglia sopra il carico SOLO quando il +25% non ne contiene nessuno, e la guardia lo
   lascia passare (mai di piu). Dove il +25% contiene gia un peso della griglia la guardia vale come prima; i salti di piu di un passo restano fermi.
   Le storie di 8-12 settimane (principianti PAR-Q, gravidanza, over 66, adulti) sono in tests/onda5-ripresa-prudenti.test.js; qui le prove puntuali sulla funzione e sulla fase. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const CAVO = '🛡️ Alzate Laterali ai Cavi', MANUBRI = '🛡️ Alzate Laterali', MACCHINA = '🦵 Leg Extension', BILANCIERE = '💪 Panca Piana Bilanciere', CE = '💪 Chest Press Machine';

test('passoUnicoOltreTetto: il primo peso della griglia sopra il carico, solo se il +25% non ne contiene nessuno (cavi e pile da 2,5 kg, manubri da 1 e 2 kg)', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  const p = (nome, kg) => a.g('passoUnicoOltreTetto')(kg, nome);
  /* il +25% non contiene nessun peso sopra il carico: un solo passo */
  assert.strictEqual(p(CAVO, 2.5), 5, 'cavo 2,5 kg: +25% = 3,1 kg, passo 2,5');
  assert.strictEqual(p(CAVO, 5), 7.5, 'cavo 5 kg: +25% = 6,25 kg');
  assert.strictEqual(p(CAVO, 7.5), 10, 'cavo 7,5 kg: +25% = 9,4 kg, 10 kg e +33%');
  assert.strictEqual(p(MACCHINA, 5), 7.5);
  assert.strictEqual(p(MANUBRI, 2), 3, 'manubri da 2 kg: +25% = 2,5 kg, il passo e 1 kg (3 kg: +50%)');
  assert.strictEqual(p(MANUBRI, 3), 4, 'manubri da 3 kg: +1 kg e +33%');
  /* il +25% contiene gia un peso della griglia: il tetto vale, nessun passo speciale */
  assert.strictEqual(p(CAVO, 10), null, 'cavo 10 kg: +25% = 12,5 kg che e un peso della pila');
  assert.strictEqual(p(CAVO, 6.5), null, 'cavo 6,5 kg: +25% = 8,1 kg, la pila ha 7,5 kg');
  assert.strictEqual(p(CAVO, 20), null);
  assert.strictEqual(p(MACCHINA, 40), null);
  assert.strictEqual(p(MANUBRI, 4), null, 'manubri da 4 kg: +25% = 5 kg, e un peso della griglia');
  assert.strictEqual(p(MANUBRI, 12), null, 'manubri da 12 kg: +25% = 15 kg, 14 kg e nella griglia');
  assert.strictEqual(p(BILANCIERE, 40), null);
  assert.strictEqual(p(BILANCIERE, 20), null, 'bilanciere 20 kg: +25% = 25 kg, 22,5 kg e un peso della griglia');
  /* senza carico: niente */
  assert.strictEqual(p(CAVO, 0), null);
});

test('limitaSalitaBase (INT-4) resta identica dopo il riuso di passoUnicoOltreTetto: sale al peso piu alto dentro il +25%, o al solo passo che c e', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  const l = (w, kg, nome) => a.g('limitaSalitaBase')(w, kg, nome);
  assert.strictEqual(l(10, 6.5, CAVO), 7.5, 'cavo da 6,5 kg: 9 diventava 10 (+54%), ora 7,5');
  assert.strictEqual(l(7.5, 5, CAVO), 7.5, 'cavo da 5 kg: il solo passo');
  assert.strictEqual(l(12.5, 5, CAVO), 7.5, 'mai piu di un passo');
  assert.strictEqual(l(4, 3, MANUBRI), 4);
  assert.strictEqual(l(14, 12, MANUBRI), 14);
  assert.strictEqual(l(50, 40, MACCHINA), 50, 'dentro il tetto: invariato');
  assert.strictEqual(l(60, 40, MACCHINA), 50, 'oltre il tetto: il peso piu alto dentro');
});

/* ===== la fase di CAR-18 (guardia del +25%): uno scenario con il carico stimato nel piano e le sue esposizioni (come in tests/partenza-donne.test.js) ===== */
function scenario(a, o) {
  Object.keys(a.store).forEach(k => delete a.store[k]);
  a.consenso(true); a.ora(LUNEDI);
  a.profilo(Object.assign({ level: 'principiante', sex: 'F', age: 30, weight: 65, goals: ['massa'] }, o.profilo || {}));
  const nome = o.nome, reps = o.reps || 12, sets = 3;
  const dati = {}; dati['Lunedì'] = [{ name: nome, sets: sets, reps: reps, weight: o.base, rest: 90, stimato: 'pesoBassa' }];
  a.scrivi(a.chiave('dataKey'), dati);
  const storia = [];
  o.esp.forEach((x, i, tutte) => {
    const rpe = Array.isArray(x.rpe) ? x.rpe : [x.rpe, x.rpe, x.rpe], fatte = x.fatte || [reps, reps, reps];
    storia.unshift({ id: a.giorniFa(3 * (tutte.length - i)), day: 'Lunedì', date: a.g('formatNow()'), minuti: 50, prontezza: 80, exercises: [],
      sessione: [{ name: nome, rest: 90, sets: fatte.map((r, k) => ({ weight: x.w, reps: r, done: true, wasBerserk: false, rpe: rpe[k] === undefined ? null : rpe[k] })), obiettivo: { reps: reps, sets: sets, rir: [3, 4], coachTipo: 'su' } }] });
  });
  a.storia(storia);
  return { prossimo: () => a.dati(a.chiama('caricoProssimo', nome, o.base, reps, sets)),
           fase: (peso) => a.dati(a.g('faseCalibrazione')({ weight: peso, reps: reps, sets: sets, tipo: 'su', motivo: 'proposta' }, { nome: nome, repsTarget: reps })) };
}

test('CAR-18 (INT-5d): manubri da 3 kg alla cima delle ripetizioni (RPE 6, 14 ripetizioni): sale di un passo a 4 kg (prima: 3 kg e una ripetizione in piu per sempre)', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  const s = scenario(a, { nome: MANUBRI, base: 3, esp: [{ w: 3, rpe: 6, fatte: [14, 14, 14] }] });
  const r = s.prossimo();
  assert.strictEqual(r.weight, 4, 'prima: 3 kg (+1 kg sarebbe un salto del 33%): ' + r.motivo);
  assert.strictEqual(r.tipo, 'su');
  assert.ok(/^Serie facili \(RPE 6, bersaglio 7,5\): \+1 kg/.test(r.motivo), r.motivo);
  /* ma non di piu di un passo: due passi (6 kg, +100%) restano fermi con la ripetizione in piu */
  const due = s.fase(6);
  assert.strictEqual(due.weight, 3, 'oltre un passo la guardia tiene: ' + due.motivo);
  assert.strictEqual(due.reps, 13);
  assert.ok(/salto del 100%/.test(due.motivo), due.motivo);
});

test('CAR-18 (INT-5d): con un carico grande (il +25% contiene pesi della griglia) la guardia vale come prima: oltre il +25% resta fermo con una ripetizione in piu', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  /* tre esposizioni senza RPE: i primi due salti sono fatti, la terza e «tieni» (CAR-19: al massimo 2 salti senza RPE) e la proposta passa dalla guardia */
  const s = scenario(a, { nome: CE, base: 40, esp: [{ w: 40, rpe: null }, { w: 40, rpe: null }, { w: 40, rpe: null }] });
  const entro = s.fase(50);
  assert.strictEqual(entro.weight, 50, 'esattamente +25%: passa: ' + entro.motivo);
  const oltre = s.fase(52.5);
  assert.strictEqual(oltre.weight, 40, 'la griglia ha 50 kg dentro il tetto: 52,5 kg (+31%) e fermo come prima: ' + oltre.motivo);
  assert.strictEqual(oltre.reps, 13);
  assert.ok(/salto del 31%/.test(oltre.motivo), oltre.motivo);
  const grande = s.fase(60);
  assert.strictEqual(grande.weight, 40, '+50%: fermo: ' + grande.motivo);
  assert.ok(/salto del 50%/.test(grande.motivo), grande.motivo);
});

test('CAR-18 (INT-5d): la calibrazione con salto grande della tabella non cambia (Chest Press 40 kg, RPE 5: 47,5 kg, +19%); un cavo da 40 kg e le macchine non hanno il passo speciale', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  const r = scenario(a, { nome: CE, base: 40, esp: [{ w: 40, rpe: 5 }] }).prossimo();
  assert.strictEqual(r.weight, 47.5, r.motivo);
  assert.ok(/^Calibrazione: RPE 5 contro 8 previsto, si sale a 47,5 kg \(\+19%\)/.test(r.motivo), r.motivo);
  const f = scenario(a, { nome: MACCHINA, base: 40, esp: [{ w: 40, rpe: null }, { w: 40, rpe: null }, { w: 40, rpe: null }] }).fase(52.5);
  assert.strictEqual(f.weight, 40, 'oltre il +25% con una griglia che ha pesi dentro il tetto: fermo: ' + f.motivo);
});

test('CAR-18 spenta: nessuna guardia e nessun cambiamento (il passo speciale vive solo dentro la guardia di CAR-18)', () => {
  const a = caricaApp({ ora: LUNEDI, consenso: true });
  const s = scenario(a, { nome: MANUBRI, base: 3, esp: [{ w: 3, rpe: 6, fatte: [14, 14, 14] }] });
  a.spegni(['CAR-18']);
  const r = s.prossimo();
  assert.strictEqual(r.weight, 4, 'senza calibrazione la progressione di base sale di un passo (limitaSalitaBase): ' + r.motivo);
});
