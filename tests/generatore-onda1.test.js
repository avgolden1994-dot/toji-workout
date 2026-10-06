/* Generatore: residui dell onda 1 (piano coach v2, W1-T6): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso), come generatore-onda0b.test.js.
   (a) REC-02 / ABB-07: il carico pesante sui lombari e il DATO dell esercizio (stress della schiena 2 e classi A-C: stacchi di ogni tipo, anche lo stacco rumeno coi manubri, il trap bar,
       il front squat, i rematori col bilanciere), non due espressioni sul nome; due giorni di fila non hanno due sedute con almeno 3 punti lombari (stesso conto del collaudo);
       il giorno dopo il posto dell hinge lo prende la spinta d anca o un hinge leggero (SES-03 resta a posto);
   (b) RID-01: il secondo posto dello stesso tipo (squat2) non diventa un terzo esercizio per i quadricipiti (a corpo libero: squat, affondi e squat su scatola);
   (c) la nota «senza leg curl restano meno allenati» non c e se la settimana ha uno stacco che allena i femorali (cap. 17 n. 15 della mappa), e c e ancora dove manca ogni altra cerniera. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
let _app = null;
const app = () => _app || (_app = caricaApp({ ora: ORA }));
const costruisci = d => app().dati(app().chiama('buildProgram', Object.assign({ sex: 'M', age: 30, seme: 'w1t6', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false }, d)));
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
const GIORNI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const NOTA_FEMORALI = 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.';

/* una griglia fissa: luogo x livello x giorni x minuti x obiettivo (i metodi famosi hanno i loro controlli e le loro sedute: si saltano) */
function griglia(luoghi, livelli, giorni, minuti, goals) {
  const out = [];
  livelli.forEach(level => giorni.forEach(days => luoghi.forEach(luogo => minuti.forEach(m => goals.forEach(g => { if (luogo !== 'palestra' && m === 90) return; out.push({ level, days, luogo, minutes: m, goals: g }); })))));
  return out;
}

/* il conto del collaudo REC-02: serie di stacchi e good morning, mezzo punto per serie di squat col bilanciere, front squat e rematori col bilanciere */
const puntiLombari = sd => sd.esercizi.reduce((t, e) => { const n = pulito(e.name); return t + (/stacco|good morning/i.test(n) ? e.sets : (/squat con bilanciere|front squat|rematore con bilanciere|t-bar|rematore presa inversa/i.test(n) ? e.sets * 0.5 : 0)); }, 0);
const PUNTI_MIN = 3;   /* LOMBARE_SERIE_PESANTI del collaudo */

/* ---------- (a) il dato dell esercizio dice cosa e pesante per i lombari ---------- */
test('(a) schienaLombare: stress 2 sulla schiena e multiarticolare (A-C); non l hyperextension, non l hip thrust, non le macchine', () => {
  const f = n => app().g('schienaLombare')(app().g('nomeInLibreria')(n));
  ['Stacco da Terra (Deadlift)', 'Stacco Rumeno', 'Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Stacco con Trap Bar', 'Stacco Sumo', 'Good Morning', 'Front Squat',
    'Squat con Bilanciere', 'Rematore con Bilanciere', 'T-Bar Row', 'Rematore Presa Inversa (Yates)'].forEach(n => assert.strictEqual(f(n), true, n + ' pesa sui lombari'));
  ['Hyperextension (Lombari)', 'Hip Thrust', 'Pull-Through ai Cavi', 'Leg Press', 'Hack Squat', 'Goblet Squat', 'Squat a Corpo Libero', 'Lat Machine', 'Leg Curl Seduto', 'Ponte Glutei'].forEach(n => assert.strictEqual(f(n), false, n + ' non pesa sui lombari'));
  /* fuori libreria (o senza attributi) ricade sull elenco di prima */
  assert.strictEqual(app().g('schienaLombare')('Stacco da Terra (Deadlift)'), true);
  assert.strictEqual(app().g('schienaLombare')('Esercizio inventato'), false);
  /* strSchiena (ABB-07 nella composizione) e la stessa cosa */
  assert.strictEqual(app().g('strSchiena')(app().g('nomeInLibreria')('Stacco con Trap Bar')), true);
});

test('(a) REC-02: due giorni di fila non hanno due sedute con 3 punti lombari (palestra, manubri, corpo libero; 4, 5 e 6 giorni; massa, forza e glutei)', () => {
  const colpe = [];
  let confronti = 0, conStacco = 0;
  griglia(['palestra', 'manubri', 'corpo'], ['principiante', 'intermedio', 'avanzato'], [4, 5, 6], [45, 60, 90], [['massa'], ['forza'], ['glutei'], ['dimagrimento']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'rec02-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    const sed = prog.sedute.map(sd => ({ sd, gi: GIORNI.indexOf(sd.giorno), pt: puntiLombari(sd) }));
    if (sed.some(s => s.pt >= PUNTI_MIN)) conStacco++;
    for (let i = 0; i < sed.length; i++) for (let j = i + 1; j < sed.length; j++) {
      if (Math.abs(sed[i].gi - sed[j].gi) !== 1) continue;
      confronti++;
      if (sed[i].pt >= PUNTI_MIN && sed[j].pt >= PUNTI_MIN) colpe.push(JSON.stringify(p) + ' ' + sed[i].sd.giorno + '/' + sed[j].sd.giorno);
    }
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(confronti > 100 && conStacco > 50, 'la griglia deve esercitare il caso: ' + confronti + ' coppie di giorni, ' + conStacco + ' programmi con uno stacco');
});

test('(a) ABB-07: il giorno dopo un carico lombare pesante il posto dell hinge non prende lo stacco: spinta d anca o hinge leggero, e la seduta ha ancora il suo schema (SES-03)', () => {
  const colpe = [];
  let giorniDopo = 0;
  griglia(['palestra', 'manubri', 'corpo'], ['intermedio', 'avanzato'], [6], [60, 75], [['massa'], ['forza']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'abb07-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    prog.sedute.forEach((sd, i) => {
      const prima = prog.sedute[i - 1];
      if (!prima || GIORNI.indexOf(sd.giorno) - GIORNI.indexOf(prima.giorno) !== 1 || !prima.esercizi.some(e => app().g('strSchiena')(e.name))) return;
      giorniDopo++;
      sd.esercizi.forEach(e => { if (app().g('strSchiena')(e.name) && !/squat|rematore|t-bar/i.test(pulito(e.name))) colpe.push('stacco il giorno dopo ' + JSON.stringify(p) + ' ' + sd.giorno + ': ' + pulito(e.name)); });
      if (/lower|legs/.test(sd.tipo) && !sd.esercizi.some(e => /hinge|spintaAnca/.test((app().json('attributi(' + JSON.stringify(e.name) + ') || {}')).schema || ''))) colpe.push('legs senza cerniera ne spinta d anca ' + JSON.stringify(p) + ' ' + sd.giorno);
    });
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(giorniDopo > 20, 'giorni dopo uno stacco in griglia: ' + giorniDopo);
});

/* ---------- (b) RID-01: niente terzo esercizio uguale ---------- */
test('(b) RID-01: strTerzoUguale dice se due esercizi con la stessa chiave (gruppo, parte, tipo, schema) sono gia scelti', () => {
  const nome = n => app().g('nomeInLibreria')(n);
  const base = n => app().g('JSON.parse')(JSON.stringify(n.map(x => ({ name: nome(x) }))));
  const f = (x, b) => app().g('strTerzoUguale')({ name: nome(x) }, base(b));
  assert.strictEqual(f('Squat su Scatola', ['Squat a Corpo Libero', 'Affondi in Camminata']), true);
  assert.strictEqual(f('Squat su Scatola', ['Squat a Corpo Libero']), false, 'due squat sono ammessi (ABB-02: macchina dopo bilanciere)');
  assert.strictEqual(f('Squat su Scatola', []), false);
  assert.strictEqual(f('Esercizio inventato', ['Squat a Corpo Libero', 'Affondi in Camminata']), false);
});

test('(b) RID-01: a corpo libero e coi manubri nessuna seduta ha tre esercizi multiarticolari per i quadricipiti (squat, affondi, squat su scatola, goblet)', () => {
  const colpe = [];
  let sedutaGambe = 0;
  griglia(['corpo', 'manubri', 'palestra'], ['intermedio', 'avanzato'], [4, 5, 6], [30, 45, 60, 75, 90], [['massa'], ['forza'], ['salute'], ['glutei']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'rid01-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    prog.sedute.forEach(sd => {
      const quad = sd.esercizi.filter(e => { const m = app().json('findExercise(' + JSON.stringify(e.name) + ') || {}'); return m.type === 'compound' && app().g('bersaglioDi')(e.name) === 'quadricipiti'; });
      if (/legs|lower|fullbody/.test(sd.tipo)) sedutaGambe++;
      if (quad.length > 2) colpe.push(JSON.stringify(p) + ' ' + sd.giorno + ': ' + quad.map(e => pulito(e.name)).join(' + '));
    });
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(sedutaGambe > 200, 'la griglia deve esercitare il caso: ' + sedutaGambe + ' sedute di gambe');
});

test('(b) RID-01: il posto lasciato vuoto non lascia la seduta sotto i 3 esercizi ne senza lavoro per i femorali e i polpacci (a corpo libero, 6 giorni)', () => {
  const colpe = [];
  griglia(['corpo'], ['intermedio', 'avanzato'], [6], [30, 45, 60], [['massa'], ['salute']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'rid01b-' + JSON.stringify(p) }, p));
    prog.sedute.forEach(sd => { if (sd.esercizi.length < 3) colpe.push('meno di 3 esercizi ' + JSON.stringify(p) + ' ' + sd.giorno); });
    const gambe = prog.sedute.filter(sd => sd.tipo === 'legs');
    gambe.forEach(sd => { if (!sd.esercizi.some(e => /squat|affondi/i.test(pulito(e.name)))) colpe.push('legs senza squat ne affondi ' + JSON.stringify(p) + ' ' + sd.giorno); });
  });
  assert.deepStrictEqual(colpe, []);
});

/* ---------- (c) la nota dei femorali ---------- */
test('(c) la nota «senza leg curl restano meno allenati» non compare se la settimana ha uno stacco che allena i femorali, e compare dove manca ogni altra cerniera', () => {
  const colpe = [];
  let conStaccoSenzaNota = 0, conNota = 0;
  griglia(['corpo', 'manubri', 'palestra'], ['principiante', 'intermedio', 'avanzato'], [2, 3, 4, 5, 6], [30, 45, 60], [['massa'], ['salute'], ['glutei']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'nota-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    /* la definizione e indipendente dal codice provato: schema hinge, classi A-C e credito ai femorali nei dati degli esercizi */
    const cerniera = prog.sedute.some(sd => sd.esercizi.some(e => { const a = app().json('attributi(' + JSON.stringify(e.name) + ') || {}'); return a.schema === 'hinge' && 'ABC'.indexOf(a.classe) !== -1 && (a.muscoli.femorali || 0) > 0; }));
    const nota = prog.note.some(n => n === NOTA_FEMORALI);
    if (cerniera && nota) colpe.push('nota con lo stacco ' + JSON.stringify(p));
    if (cerniera) conStaccoSenzaNota++;
    if (nota) conNota++;
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(conStaccoSenzaNota > 50, 'programmi con una cerniera per i femorali: ' + conStaccoSenzaNota);
  /* INT-2b: 5 programmi della griglia e non piu 20+. Con il volume per muscolo (W2-T1) il Leg Curl con Asciugamano entra a casa quasi sempre e la nota «senza leg curl restano meno allenati» era falsa in
     quei programmi (c era la flessione e la nota diceva il contrario): riconciliaNote (REG-02) la toglie. Resta dove i femorali hanno davvero solo il ponte (principianti a casa con 2 giorni e 30 minuti): il controllo
     che conta e sopra, mai la nota con una cerniera, e sotto in tests/integrazione-onda2b.test.js (mai la nota con una flessione) */
  assert.ok(conNota >= 3, 'resta la nota dove i femorali hanno solo il ponte: ' + conNota);
});

test('(c) eCernieraFemorali: lo stacco rumeno (coi manubri, a una gamba), il good morning e gli stacchi si; hip thrust, ponte, hyperextension, pull-through e leg curl no', () => {
  const f = n => app().g('eCernieraFemorali')({ name: app().g('nomeInLibreria')(n) });
  ['Stacco Rumeno', 'Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Good Morning', 'Stacco da Terra (Deadlift)', 'Stacco con Trap Bar'].forEach(n => assert.strictEqual(f(n), true, n));
  ['Hip Thrust', 'Ponte Glutei', 'Hyperextension (Lombari)', 'Hyperextension a 45° per Glutei', 'Pull-Through ai Cavi', 'Leg Curl Seduto', 'Leg Curl con Asciugamano'].forEach(n => assert.strictEqual(f(n), false, n));
});
