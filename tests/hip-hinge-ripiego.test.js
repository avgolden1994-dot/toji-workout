/* INT-2f (revisione indipendente dell'onda 2e, MAGGIORE 2): «Hip Hinge a Corpo Libero» e un ripiego, non una scelta da preparatore.
   W2-T6 lo ha aggiunto (la cerniera dell anca senza carico) perche a corpo libero nessuna seduta di gambe aveva una cerniera (MOD-12, SES-03). Il commento diceva «dove c e un cavo o un manubrio vince la variante con il carico»,
   ma il punteggio del posto (PRIORI -1) perdeva contro la varieta tra i giorni (-4 a un esercizio gia usato in settimana): sulla matrice standard compariva in 7.449 programmi su 10.800 (0 su 2d), anche in palestra,
   anche con uno stacco con carico nella stessa settimana, apriva la seduta lower con 4x10, e contava 1 serie piena di femorali: da solo spiegava quasi tutto il miglioramento dichiarato di SES-03, RID-02 ed EQ-03:rapporto.
   Ora: solo quando nessuna cerniera con carico e consentita a quella persona (consentito), mai prima di un altro multiarticolare, 2 serie da 12-15, credito ai femorali 0,5, al massimo in 2 sedute a settimana.
   Le prove sotto falliscono su 122cd69 (HEAD della correzione precedente). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const HH = 'Hip Hinge a Corpo Libero';
const a = caricaApp({ ora: LUNEDI });
const se = n => a.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], goal: 'massa', level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', age: 25, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, freq: 'auto' };
/* cerniere con carico consentite a quelle preferenze: la definizione della prova, scritta a parte (non chiama la funzione che prova) */
const conCarico = prefs => a.json('(function () { const p = ' + JSON.stringify(prefs) + '; return EXERCISE_LIBRARY.filter(e => /stacco|good morning|pull-through/i.test(senzaEmoji(e.name)) && (attributi(e.name) || {}).attrezzo !== "corpo" && consentito(e.name, p)).map(e => senzaEmoji(e.name)); })()');
const consentito = prefs => a.json('consentito(nomeInLibreria(' + JSON.stringify(HH) + '), ' + JSON.stringify(prefs) + ')');

test('Hip Hinge a corpo libero: consentito solo dove nessuna cerniera con carico lo e (corpo libero, o attrezzi e fastidi che le tolgono tutte)', () => {
  assert.strictEqual(consentito({ luogo: 'palestra', fastidi: [] }), false, 'in palestra c e lo stacco, il pull-through, il cavo');
  assert.strictEqual(consentito({ luogo: 'manubri', fastidi: [] }), false, 'a casa con i manubri c e lo stacco rumeno con i manubri');
  assert.strictEqual(consentito({ luogo: 'corpo', fastidi: [] }), true, 'a corpo libero e l unica cerniera dell anca');
  /* i posti dell hinge scelgono per nome (SLOT_DEF.hinge: stacchi, good morning, pull-through; MOD-04 aperto): lo swing con il kettlebell dichiarato non e una cerniera che un posto sappia scegliere, quindi il ripiego resta */
  assert.strictEqual(consentito({ luogo: 'corpo', fastidi: [], attrezziCasa: ['kettlebell'] }), true, 'con un kettlebell dichiarato lo swing non e nei posti dell hinge: il ripiego resta');
  assert.strictEqual(consentito({ luogo: 'corpo', fastidi: [], attrezziCasa: ['elastico'] }), true, 'con l elastico non c e una cerniera con carico');
  /* l'equivalenza con la definizione scritta a parte, su una griglia di preferenze */
  const dove = [];
  ['palestra', 'manubri', 'corpo'].forEach(luogo => [[], ['schiena'], ['ginocchia'], ['spalle']].forEach(fastidi => [undefined, ['macchine'], ['sbarra']].forEach(attrezziPalestra => {
    const prefs = { luogo, fastidi, attrezziPalestra };
    const nessuna = conCarico(prefs).length === 0;
    if (consentito(prefs) !== nessuna) dove.push(luogo + '/' + fastidi.join('+') + '/' + (attrezziPalestra || ['-']).join('+') + ': consentito ' + consentito(prefs) + ', cerniere con carico ' + conCarico(prefs).length);
  })));
  assert.deepStrictEqual(dove, [], 'il ripiego c e se e solo se non c e una cerniera con carico');
});

test('Hip Hinge a corpo libero: il credito ai femorali di una serie e al massimo 0,5 (era 1: una serie piena di femorali senza carico)', () => {
  const m = a.json('attributi(nomeInLibreria(' + JSON.stringify(HH) + ')).muscoli');
  assert.ok(m.femorali <= 0.5, 'femorali ' + m.femorali);
  assert.ok(m.femorali > 0, 'qualcosa conta: la cerniera allena i femorali anche senza carico');
});

/* la griglia: tre luoghi x livelli x giorni x fastidi, un programma per riga */
function griglia() {
  const out = a.json('(function () { const o = []; ' +
    '["palestra", "manubri", "corpo"].forEach(luogo => ["principiante", "intermedio", "avanzato"].forEach(level => [3, 4, 5, 6].forEach(days => [[], ["schiena"], ["ginocchia"]].forEach(fastidi => [["massa"], ["glutei"]].forEach(goals => {' +
    'const d = Object.assign({}, ' + JSON.stringify(BASE) + ', { luogo: luogo, level: level, days: days, fastidi: fastidi, goals: goals, goal: goals[0], minutes: 60, seme: "hh" + luogo + level + days + fastidi.join("") + goals[0] });' +
    'const prog = buildProgram(d);' +
    'o.push({ id: [luogo, level, days, fastidi.join("+") || "-", goals[0]].join("|"), luogo: luogo, fastidi: fastidi, sedute: prog.sedute.map(sd => ({ tipo: sd.tipo, titolo: sd.titolo, es: sd.esercizi.map(e => ({ n: senzaEmoji(e.name), sets: e.sets, reps: e.reps, compound: (findExercise(e.name) || {}).type === "compound" })) })) }); }))))); return o; })()');
  return out;
}
const G = griglia();

test('Hip Hinge a corpo libero: nei programmi compare solo dove nessuna cerniera con carico e consentita (mai in palestra o a casa con i manubri senza mal di schiena)', () => {
  assert.strictEqual(G.length, 216);
  const con = G.filter(x => x.sedute.some(sd => sd.es.some(e => e.n === HH)));
  const sbagliati = con.filter(x => conCarico({ luogo: x.luogo, fastidi: x.fastidi }).length > 0).map(x => x.id);
  assert.deepStrictEqual(sbagliati, [], 'con una cerniera con carico consentita il ripiego non entra (prima: ' + sbagliati.length + ' su 216)');
  assert.ok(con.some(x => x.luogo === 'corpo'), 'a corpo libero entra ancora: e l unica cerniera dell anca (SES-03)');
});

test('Hip Hinge a corpo libero: 2 serie da 12 (6 o meno con la forza), in al massimo 2 sedute a settimana, mai prima di un altro multiarticolare', () => {
  const dove = { serie: [], sedute: [], primo: [] };
  G.forEach(x => {
    const n = x.sedute.filter(sd => sd.es.some(e => e.n === HH)).length;
    if (n > 2) dove.sedute.push(x.id + ' ' + n);
    x.sedute.forEach(sd => {
      const i = sd.es.findIndex(e => e.n === HH);
      if (i === -1) return;
      const e = sd.es[i];
      const giornoForza = /forza/i.test(sd.tipo + ' ' + (sd.titolo || ''));   /* il giorno «forza» del PHUL ha le ripetizioni dei multiarticolari di quel giorno (8 per l intermedio che punta alla massa) */
      if (e.sets > 2 || (giornoForza ? e.reps > 8 : (e.reps < 12 || e.reps > 15))) dove.serie.push(x.id + ' ' + e.sets + 'x' + e.reps);
      if (i === 0 && sd.es.some(y => y.compound && y.n !== HH)) dove.primo.push(x.id + ' ' + sd.tipo);
    });
  });
  assert.deepStrictEqual(dove, { serie: [], sedute: [], primo: [] });
});

test('Hip Hinge a corpo libero: il programma del revisore (intermedio, 4 giorni, 90 minuti, palestra, nessun fastidio) ha la sua cerniera con carico anche il venerdi, e il venerdi non apre con il ripiego', () => {
  const d = { sex: 'M', age: 25, seme: 'collaudo|massa|intermedio|4|90|palestra|-|M|giovane|1', fastidi: [], sonno: 'male', attrezzi: 'liberi', usaProfilo: false, level: 'intermedio', days: 4, goals: ['massa'], luogo: 'palestra', minutes: 90, freq: 'auto', parq: 'no', priorita: [] };
  const prog = a.json('buildProgram(' + JSON.stringify(d) + ')');
  const nomi = prog.sedute.map(sd => sd.esercizi.map(e => se(e.name)));
  assert.ok(!nomi.some(l => l.indexOf(HH) !== -1), 'niente ripiego in palestra: ' + nomi.map(l => l.join(', ')).join(' / '));
  nomi.forEach((l, i) => { if (/lower/i.test(prog.sedute[i].tipo)) assert.ok(l.some(x => /stacco|pull-through|hip thrust/i.test(x)), 'la seduta lower ' + i + ' ha una cerniera dell anca o la spinta d anca: ' + l.join(', ')); });
});

test('Hip Hinge a corpo libero: il leg curl del ponte dei femorali non toglie il lavoro per la cuffia (SAF-06): con la spalla dolente la settimana ha sempre i deltoidi posteriori o la cuffia', () => {
  /* a corpo libero la cerniera senza carico non dispensa dal leg curl (credito 0,5 x 2 serie = 1 serie frazionaria: sotto 1,5 la seduta non conta per la frequenza), quindi il ponte aggiunge il leg curl e la seduta
     di un principiante arriva a 7 esercizi; il tetto di esercizi (EXN-02) toglieva allora il Y-Raise, l ultima aggiunta protetta: salute, principiante, 2 giorni, corpo libero, spalla dolente: 0 serie dietro */
  const dietro = prog => prog.sedute.reduce((t, sd) => t + sd.esercizi.reduce((s, e) => s + (/face pull|reverse|alzate posteriori|y-raise|extrarotazione/i.test(se(e.name)) ? e.sets : 0), 0), 0);
  const manca = [];
  ['salute', 'massa', 'forza', 'dimagrimento'].forEach(g => ['principiante', 'intermedio'].forEach(level => [2, 3].forEach(days => [30, 45, 60].forEach(minutes => {
    const d = Object.assign({}, BASE, { goals: [g], goal: g, level, days, minutes, luogo: 'corpo', fastidi: ['spalle'], sex: 'M', age: 30, seme: 'pco-hh-' + g + level + days + minutes });
    const prog = a.json('buildProgram(' + JSON.stringify(d) + ')');
    if (dietro(prog) < 2) manca.push([g, level, days, minutes].join('|'));
  }))));
  assert.deepStrictEqual(manca, [], 'programmi con la spalla dolente senza lavoro per la cuffia');
});

test('ponte dei femorali: una seduta di gambe con il solo pull-through (femorali 0 negli attributi) non dispensa dal leg curl: le sedute senza lavoro per i femorali scendono da 41 a 14 su 216', () => {
  /* sul codice di e6ac7ad il ponte (completamenti.js) saltava il leg curl dove la seduta aveva «una cerniera» per nome (SLOT_DEF.hinge: anche il pull-through): 41 sedute su 216 (principiante e intermedio, 2-3 giorni,
     palestra, 30-90 minuti, nessun fastidio o spalle o ginocchia) senza un esercizio che allena i femorali, tutte con il pull-through; i femorali in una sola seduta (FRQ-01:femorali 6,53% contro 5,21% di 2d) */
  const out = a.json(`(function () { const o = [];
    ['principiante', 'intermedio'].forEach(level => [2, 3].forEach(days => [30, 45, 60, 90].forEach(minutes => [[], ['spalle'], ['ginocchia']].forEach(fastidi => ['F', 'M'].forEach(sex => {
      const d = { sex: sex, age: 45, seme: 'ponte' + level + days + minutes + fastidi.join('') + sex, fastidi: fastidi, sonno: 'bene', attrezzi: 'liberi', usaProfilo: false, level: level, days: days, goals: ['massa'], luogo: 'palestra', minutes: minutes, freq: 'auto', parq: 'no', priorita: [] };
      const prog = buildProgram(d);
      prog.sedute.forEach(sd => { if (!/lower|legs|fullbody/.test(sd.tipo)) return; o.push(sd.esercizi.some(e => ((attributi(e.name) || { muscoli: {} }).muscoli.femorali || 0) > 0 && !/hip hinge/i.test(senzaEmoji(e.name)))); });
    })))));
    return o; })()`);
  assert.strictEqual(out.length, 216);
  const senza = out.filter(x => !x).length;
  assert.ok(senza <= 20, 'sedute di gambe senza un esercizio per i femorali: ' + senza + ' su 216 (41 prima della correzione)');
});

test('tetto di esercizi (EXN-02) e cuffia: un principiante con la spalla dolente non ha sedute oltre 6 esercizi e conserva il lavoro per la cuffia (obiettivo glutei, 2 giorni, palestra)', () => {
  /* il ponte dei femorali aggiunge il leg curl e il tetto non toglie piu il lavoro per la cuffia: la seduta con lo stacco rumeno coi manubri, l hip thrust e il Face Pull arrivava a 7 esercizi e nessuno lasciava il posto
     (EXN-02, 1 programma su 10.800 della matrice standard). La spinta d anca che ha accanto una cerniera vera lascia il posto (e il doppione della cerniera: una sola per seduta, RID-01) */
  const d = { sex: 'F', age: 45, seme: 'collaudo|glutei|principiante|2|60|palestra|spalle|F|adulto|2', fastidi: ['spalle'], sonno: 'medio', attrezzi: 'macchine', usaProfilo: false, level: 'principiante', days: 2, goals: ['glutei'], luogo: 'palestra', minutes: 60, freq: 'auto', parq: 'no', priorita: ['schiena'] };
  const prog = a.json('buildProgram(' + JSON.stringify(d) + ')');
  assert.deepStrictEqual(prog.sedute.filter(sd => sd.esercizi.length > 6).map(sd => sd.giorno + ' ' + sd.esercizi.length), [], 'sedute oltre 6 esercizi per chi comincia');
  assert.ok(prog.sedute.some(sd => sd.esercizi.some(e => e.cuffia)), 'il lavoro per la cuffia c e: ' + prog.sedute.map(sd => sd.esercizi.map(e => se(e.name)).join(', ')).join(' / '));
});

test('Hip Hinge a corpo libero con la forza come obiettivo: le ripetizioni sono quelle dei multiarticolari della forza (6 o meno, collaudo GOA-01), non 12', () => {
  /* a casa con i manubri e la schiena dolente nessuna cerniera con carico e consentita: il ripiego entra, e con la forza le ripetizioni dei multiarticolari non vanno oltre 6 (4 programmi su 10.800 della matrice standard con 12) */
  const out = [];
  [{ luogo: 'manubri', fastidi: ['schiena'] }, { luogo: 'manubri', fastidi: ['ginocchia', 'schiena'] }, { luogo: 'corpo', fastidi: [] }].forEach((x, k) => ['forza', 'forza+massa'].forEach(g => {
    const d = Object.assign({}, BASE, { goals: g.split('+'), goal: 'forza', level: 'intermedio', days: 3, minutes: 30, sex: 'M', age: 40, seme: 'goa' + k + g }, x);
    a.json('buildProgram(' + JSON.stringify(d) + ')').sedute.forEach(sd => sd.esercizi.forEach(e => { if (se(e.name) === HH && (e.reps > 6 || e.sets > 2) && /forza/.test(sd.titolo + sd.tipo)) out.push(x.luogo + ' ' + g + ' ' + sd.titolo + ': ' + e.sets + 'x' + e.reps); }));
  }));
  assert.deepStrictEqual(out, []);
});
