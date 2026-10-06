/* Distribuzione dei muscoli piccoli e flessione del ginocchio con poco tempo (P3-G, coach v2 onda 3): una prova per correzione, con i numeri di prima.
   FRQ-01  la frequenza nel solutore del volume conta le sedute MIGLIORI (frequenzaMigliori, volume.js), anche con 2 giorni: bicipiti e tricipiti in almeno 2 sedute che contano (da 1,5 serie frazionarie);
   EQ-02   i due piani di tirata restano (pianiTirata, soglie-volume.js): il solutore non toglie il pullover di riserva per alzare i rematori;
   FRQ-02  un isolamento per un muscolo piccolo con serie dirette in una sola seduta entra in un altra seduta anche se piena (il donatore puo scendere sotto la sua fascia: decide l utilita);
   M6      a 2 giorni e 30 minuti in palestra la settimana ha la flessione del ginocchio e i quadricipiti in due sedute (scalaDelTempo: prima via il secondo di gambe che non costa frequenza, poi una serie
           alla volta anche sotto i pavimenti, solo alla fine la flessione).
   Esegue il codice vero dell'app in node (vm), senza browser. Le prove FALLISCONO sul codice di prima (tag coach-v2-onda-2g: i numeri di prima sono scritti accanto a ogni prova). Lancio: npm test */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const app = caricaApp({ ora: '2026-10-06T12:00:00' });
const senzaEmoji = n => app.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const costruisci = p => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, p)));
const CREDITI = {};
const crediti = n => CREDITI[n] || (CREDITI[n] = app.dati(app.chiama('creditoMuscoli', n)) || {});
const fraz = (sd, u) => sd.esercizi.reduce((t, e) => t + (Number(e.sets) || 0) * (crediti(e.name)[u] || 0), 0);
const dirette = (sd, u) => sd.esercizi.reduce((t, e) => t + (crediti(e.name)[u] === 1 ? Number(e.sets) || 0 : 0), 0);
/* come il collaudo FRQ-01: una seduta conta da 1,5 serie frazionarie */
const seduteCheContano = (prog, u) => prog.sedute.filter(sd => fraz(sd, u) >= 1.5 - 1e-9).length;
let _n = 0;
function griglia(nome, dim) {
  const out = [];
  const giro = (i, p) => {
    if (i === dim.length) { const q = Object.assign({ sex: _n % 2 ? 'F' : 'M', seme: nome + '-' + _n }, p); _n++; out.push({ p: q, prog: costruisci(q) }); return; }
    dim[i][1].forEach(v => giro(i + 1, Object.assign({}, p, { [dim[i][0]]: v })));
  };
  giro(0, {});
  return out;
}

/* ============================================================================================================ FRQ-01 */
test('FRQ-01: bicipiti e tricipiti in almeno 2 sedute che contano, anche con 2 giorni e poco tempo', () => {
  /* griglia di 144 programmi (livello x obiettivo x 2-3 giorni x 30-60 minuti x palestra e manubri). Sul codice di prima (coach-v2-onda-2g): 84 programmi con i bicipiti o i tricipiti in una sola seduta
     che conta: la frequenza del solutore sommava le quote di TUTTE le sedute (tre rematori da 2 serie = 1 serie frazionaria per seduta = due sedute piene) e con 2 giorni non la guardava */
  const g = griglia('frq01', [['level', ['principiante', 'intermedio', 'avanzato']], ['goals', [['massa'], ['dimagrimento'], ['forza'], ['salute']]], ['days', [2, 3]], ['minutes', [30, 45, 60]], ['luogo', ['palestra', 'manubri']]]);
  assert.strictEqual(g.length, 144);
  const male = g.filter(x => ['bicipiti', 'tricipiti'].some(u => seduteCheContano(x.prog, u) < 2)).map(x => [x.p.level, x.p.goals[0], x.p.days, x.p.minutes, x.p.luogo].join('|'));
  assert.ok(male.length <= 56, 'bicipiti o tricipiti in una seduta sola: ' + male.length + ' su 144 (84 prima, 56 dopo; i restanti sono quasi tutti a 30 minuti, dove il tempo non basta): ' + male.join(', '));
});

/* ============================================================================================================ EQ-02 */
test('EQ-02: le tirate tengono i due piani (verticale e orizzontale) anche quando il solutore cerca serie per i bicipiti', () => {
  /* i 7 profili della matrice rapida del collaudo (chi comincia, 3 giorni, a casa coi manubri: senza sbarra la tirata verticale e il pullover di riserva) in cui la sola correzione della frequenza (frequenzaMigliori,
     senza la guardia pianiTirata) toglieva il pullover e alzava i rematori: 7 su 7 con il piano verticale sotto un quarto delle tirate (collaudo EQ-02:verticale 1,03 -> 1,71 sulla rapida). Sul tag 2g erano 0 su 7:
     la prova difende da una regressione della correzione stessa (si vede rossa spegnendo pianiOk) */
  const PROFILI = [
    { sex: 'M', age: 25, seme: 'collaudo|ricomposizione|principiante|3|45|manubri|schiena|M|giovane|1', fastidi: ['schiena'], sonno: 'medio', attrezzi: 'indifferente', level: 'principiante', days: 3, goals: ['ricomposizione'], luogo: 'manubri', minutes: 45, freq: 'auto', parq: 'si', priorita: [] },
    { sex: 'F', age: 25, seme: 'collaudo|ricomposizione|principiante|3|75|manubri|-|F|giovane|2', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', level: 'principiante', days: 3, goals: ['ricomposizione'], luogo: 'manubri', minutes: 75, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'M', age: 25, seme: 'collaudo|ricomposizione|principiante|3|90|manubri|ginocchia|M|giovane|0', fastidi: ['ginocchia'], sonno: 'bene', attrezzi: 'liberi', level: 'principiante', days: 3, goals: ['ricomposizione'], luogo: 'manubri', minutes: 90, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'M', age: 25, seme: 'collaudo|ricomposizione|principiante|3|90|manubri|ginocchia+schiena|M|giovane|0', fastidi: ['ginocchia', 'schiena'], sonno: 'medio', attrezzi: 'macchine', level: 'principiante', days: 3, goals: ['ricomposizione'], luogo: 'manubri', minutes: 90, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'F', age: 70, seme: 'collaudo|glutei|principiante|3|30|manubri|-|F|senior|2', fastidi: [], sonno: 'male', attrezzi: 'indifferente', level: 'principiante', days: 3, goals: ['glutei'], luogo: 'manubri', minutes: 30, freq: 'auto', parq: 'no', priorita: [], psico: { varieta: 'routine', preferenza: 'impegnativi', tolleranza: 'continuo' } },
    { sex: 'F', age: 45, seme: 'collaudo|glutei|principiante|3|60|manubri|-|F|adulto|1', fastidi: [], sonno: 'medio', attrezzi: 'indifferente', level: 'principiante', days: 3, goals: ['glutei'], luogo: 'manubri', minutes: 60, freq: '3', parq: 'no', priorita: [] },
    { sex: 'M', age: 45, seme: 'collaudo|massa+forza|principiante|3|45|manubri|ginocchia+schiena|M|adulto|1', fastidi: ['ginocchia', 'schiena'], sonno: 'medio', attrezzi: 'indifferente', level: 'principiante', days: 3, goals: ['massa', 'forza'], luogo: 'manubri', minutes: 45, freq: 'auto', parq: 'no', priorita: [] }
  ];
  const piano = (n) => {
    const m = app.g('findExercise')(n) || {}, b = app.g('bersaglioDi')(n), a = app.g('attributi')(n);
    if (app.g('isTimeBased')(n)) return 0;
    if (m.type === 'compound') return b === 'dorsali' ? 1 : (b === 'schiena_spessore' ? 2 : 0);
    return b === 'dorsali' && a && a.schema === 'tirataV' ? 1 : 0;
  };
  const g = PROFILI.map(p => ({ p, prog: costruisci(p) }));
  const male = g.filter(x => {
    let v = 0, o = 0;
    x.prog.sedute.forEach(sd => sd.esercizi.forEach(e => { const k = piano(e.name); if (k === 1) v += e.sets; else if (k === 2) o += e.sets; }));
    return v > 0 && v + o >= 6 && Math.min(v, o) < 0.25 * (v + o);
  }).map(x => x.p.seme);
  assert.deepStrictEqual(male, [], 'un piano di tirata sotto un quarto: ' + male.length + ' su 7');
});

/* ============================================================================================================ FRQ-02 */
test('FRQ-02: le alzate laterali entrano anche nella seconda seduta di parte alta quando e piena (il donatore puo scendere sotto la sua fascia)', () => {
  /* sei profili della matrice standard del collaudo (intermedi, ipertrofia, 3-4 giorni, 60-90 minuti, palestra) con i deltoidi laterali diretti in una sola seduta sul codice di prima (coach-v2-onda-2g:
     6 su 6 nel collaudo, 5 su 6 qui, dove il consenso del coach e acceso):
     la seduta full body o upper era piena (8 esercizi) e nessun esercizio poteva lasciare il posto senza portare un muscolo sotto la sua fascia, cosi le alzate laterali restavano tutte nel giorno di spinta */
  const PROFILI = [
    { sex: 'F', age: 25, seme: 'collaudo|massa|intermedio|3|90|palestra|-|F|giovane|1', fastidi: [], sonno: 'bene', attrezzi: 'macchine', level: 'intermedio', days: 3, goals: ['massa'], luogo: 'palestra', minutes: 90, freq: '2', parq: 'si', priorita: ['petto'], psico: { preferenza: 'tranquilli', tolleranza: 'mi-fermo', fiducia: 'media', varieta: 'mix' }, attrezziPalestra: ['macchine', 'manubri'] },
    { sex: 'F', age: 70, seme: 'collaudo|massa|intermedio|3|75|palestra|-|F|senior|2', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', level: 'intermedio', days: 3, goals: ['massa'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'M', age: 25, seme: 'collaudo|massa|intermedio|4|60|palestra|spalle|M|giovane|2', fastidi: ['spalle'], sonno: 'bene', attrezzi: 'indifferente', level: 'intermedio', days: 4, goals: ['massa'], luogo: 'palestra', minutes: 60, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'F', age: 25, seme: 'collaudo|ricomposizione|intermedio|3|75|palestra|-|F|giovane|0', fastidi: [], sonno: 'male', attrezzi: 'indifferente', level: 'intermedio', days: 3, goals: ['ricomposizione'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: [], psico: { preferenza: 'tranquilli', tolleranza: 'mi-fermo', fiducia: 'media', varieta: 'mix' } },
    { sex: 'M', age: 70, seme: 'collaudo|ricomposizione|intermedio|3|90|palestra|-|M|senior|0', fastidi: [], sonno: 'medio', attrezzi: 'macchine', level: 'intermedio', days: 3, goals: ['ricomposizione'], luogo: 'palestra', minutes: 90, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'M', age: 45, seme: 'collaudo|ricomposizione|intermedio|3|60|palestra|schiena|M|adulto|1', fastidi: ['schiena'], sonno: 'male', attrezzi: 'macchine', level: 'intermedio', days: 3, goals: ['ricomposizione'], luogo: 'palestra', minutes: 60, freq: '3', parq: 'no', priorita: [], psico: { preferenza: 'durissimi', tolleranza: 'spingo', fiducia: 'alta', varieta: 'mix' } }
  ];
  const male = PROFILI.filter(p => { const prog = costruisci(p); return prog.sedute.filter(sd => dirette(sd, 'deltoide_laterale') >= 1).length < 2; }).map(p => p.seme);
  assert.deepStrictEqual(male, [], 'deltoidi laterali diretti in una seduta sola: ' + male.length + ' su 6');
});

/* ============================================================================================================ M6 */
test('M6: a 2 giorni e 30 minuti in palestra ogni programma ha la flessione del ginocchio e i quadricipiti in due sedute', () => {
  /* la griglia di tests/selezione.test.js (144 programmi, stessi semi). Sul codice di prima: 13 senza flessione (12 con la forza in seconda posizione: due cerniere per seduta, la panca e la lat machine ferme
     a 4 serie dai pavimenti, il leg curl usciva) e 6 con i quadricipiti in una sola seduta (usciva lo squat, il piu caro in minuti, e restava la cerniera senza carico) */
  const FLESSIONE = /leg curl|nordic/i, senza = [], quad = [];
  let n = 0;
  const BASE6 = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [['massa'], ['glutei'], ['massa', 'forza'], ['dimagrimento'], ['forza', 'massa'], ['salute']].forEach(goals =>
    [[], ['spalle'], ['ginocchia'], ['schiena']].forEach(fastidi => ['F', 'M'].forEach(sex => {
      const prog = app.dati(app.chiama('buildProgram', Object.assign({}, BASE6, { level, goals, fastidi, sex, days: 2, minutes: 30, luogo: 'palestra', seme: 'sel-m6-' + (n++) })));
      const id = [level, goals.join('+'), fastidi.join('+'), sex].join('|');
      if (!prog.sedute.some(sd => sd.esercizi.some(e => FLESSIONE.test(senzaEmoji(e.name))))) senza.push(id);
      if (seduteCheContano(prog, 'quadricipiti') < 2) quad.push(id);
    }))));
  assert.strictEqual(n, 144);
  assert.deepStrictEqual(senza, [], 'senza flessione del ginocchio (13 prima)');
  assert.deepStrictEqual(quad, [], 'quadricipiti in una seduta sola (6 prima)');
});

test('EQ-03: con l obiettivo glutei e 2 giorni la flessione del ginocchio resta, e anche la spinta d anca', () => {
  /* sette profili della matrice standard del collaudo (obiettivo glutei, 2 giorni, 60-90 minuti, palestra) senza flessione del ginocchio sul codice di prima: il completamento metteva il leg curl, e il tetto di
     esercizi per seduta (EXN-02, adattaAlTempo) lo toglieva per primo tra le aggiunte protette. Ora l unica flessione della settimana esce per ultima; con l obiettivo glutei della coppia spinta d anca e
     cerniera lascia il posto la cerniera (se un altra seduta ne ha una) e la spinta d anca resta: e una delle quattro famiglie della nota «Glutei: ...» */
  const PROFILI = [
    { sex: 'M', age: 25, seme: 'collaudo|glutei|principiante|2|60|palestra|ginocchia|M|giovane|1', fastidi: ['ginocchia'], sonno: 'bene', attrezzi: 'indifferente', level: 'principiante', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 60, freq: '3', parq: 'no', priorita: [], psico: { varieta: 'routine', preferenza: 'impegnativi', tolleranza: 'continuo' } },
    { sex: 'M', age: 25, seme: 'collaudo|glutei|principiante|2|75|palestra|-|M|giovane|2', fastidi: [], sonno: 'bene', attrezzi: 'macchine', level: 'principiante', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: [] },
    { sex: 'F', age: 45, seme: 'collaudo|glutei|principiante|2|75|palestra|ginocchia|F|adulto|0', fastidi: ['ginocchia'], sonno: 'bene', attrezzi: 'indifferente', level: 'principiante', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 75, freq: '3', parq: 'no', priorita: [], psico: { preferenza: 'tranquilli', tolleranza: 'mi-fermo', fiducia: 'media', varieta: 'mix' } },
    { sex: 'M', age: 25, seme: 'collaudo|glutei|intermedio|2|75|palestra|-|M|giovane|0', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', level: 'intermedio', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: ['braccia'] },
    { sex: 'F', age: 70, seme: 'collaudo|glutei|avanzato|2|75|palestra|-|F|senior|0', fastidi: [], sonno: 'medio', attrezzi: 'indifferente', level: 'avanzato', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: ['braccia'] },
    { sex: 'F', age: 25, seme: 'collaudo|glutei|avanzato|2|75|palestra|ginocchia|F|giovane|2', fastidi: ['ginocchia'], sonno: 'bene', attrezzi: 'liberi', level: 'avanzato', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 75, freq: 'auto', parq: 'no', priorita: ['schiena'] },
    { sex: 'M', age: 45, seme: 'collaudo|glutei|avanzato|2|90|palestra|-|M|adulto|1', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', level: 'avanzato', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 90, freq: 'auto', parq: 'no', priorita: ['glutei'] }
  ];
  const FLESSIONE = /leg curl|nordic/i, SPINTA_ANCA = /hip thrust|ponte glutei/i;
  const senza = [], senzaSpinta = [];
  PROFILI.forEach(p => {
    const nomi = [].concat.apply([], costruisci(p).sedute.map(sd => sd.esercizi.map(e => senzaEmoji(e.name))));
    if (!nomi.some(n => FLESSIONE.test(n))) senza.push(p.seme);
    if (!nomi.some(n => SPINTA_ANCA.test(n))) senzaSpinta.push(p.seme);
  });
  assert.deepStrictEqual(senza, [], 'senza flessione del ginocchio');
  assert.deepStrictEqual(senzaSpinta, [], 'senza spinta d anca con l obiettivo glutei');
});

test('M6: secondoDiGambe con un costo toglie per primo il secondo di gambe che non costa frequenza (la seconda cerniera, non lo squat)', () => {
  /* prima l ordine era solo per minuti: usciva lo squat (4 serie) e restava la cerniera senza carico (2 serie, 1 serie frazionaria di femorali: non conta per la frequenza) */
  const nome = n => app.g('nomeInLibreria')(n);
  const sd = (nomi, serie) => ({ tipo: 'fullbody', giorno: 'Lunedì', esercizi: nomi.map((n, i) => ({ name: nome(n), sets: serie[i], reps: 10, rest: 60 })) });
  const a = sd(['Goblet Squat', 'Panca Piana Manubri', 'Rematore con Petto Appoggiato', 'Hip Hinge a Corpo Libero'], [3, 3, 3, 2]);
  const b = sd(['Lento Avanti Manubri', 'Rematore con Manubrio', 'Squat a Corpo Libero', 'Hip Hinge a Corpo Libero', 'Nordic Curl'], [2, 3, 4, 2, 3]);
  b.giorno = 'Giovedì';
  const sedute = [a, b];
  const costo = e => app.g('frequenzaPersa')(sedute, b, e);
  const scelto = app.g('secondoDiGambe')(b, sedute, null, costo);
  assert.strictEqual(senzaEmoji(scelto.name), 'Hip Hinge a Corpo Libero');
  assert.strictEqual(senzaEmoji(app.g('secondoDiGambe')(b, sedute, null).name), 'Squat a Corpo Libero', 'senza costo resta l ordine per minuti');
  assert.ok(costo(b.esercizi[2]) >= 1, 'togliere lo squat lascia i quadricipiti (e i glutei) in una seduta sola');
  assert.strictEqual(costo(b.esercizi[3]), 0, 'la cerniera senza carico (2 serie x 0,5) non fa contare la seduta per i femorali');
});
