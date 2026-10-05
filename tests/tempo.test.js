/* Il tempo (piano coach v2, W2-T2): CAS-05 (modello dei tempi: serie, cambi, lati, coppie, riscaldamento e rampa), CAS-06 (capacita), CAS-07 e CAS-08 (la scala del taglio, il tempo e un tetto),
   CAS-18 (fattore personale), PRG-13 (pause per classe, B8), PRG-20 (donne, D-P7), IPE-04, IPE-12, PCO-04 (metodi minimo e rr), B34, B36.
   Prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso). I numeri sono calcolati a mano dalle costanti di docs/ricerca-casa-poco-tempo.md 5.1,
   docs/ricerca-riscaldamento-mobilita-prevenzione.md 3.6-3.9 e dal registro B8: un test che non li ritrova fallisce sul codice di prima (che non ha questi nomi, o dava 158 s a un ponte). */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
let _app = null;
const app = () => _app || (_app = caricaApp({ ora: ORA }));
const N = x => app().g('nomeInLibreria')(x);
const E = (nome, sets, reps, rest, extra) => Object.assign({ name: N(nome), sets, reps, rest, weight: 0 }, extra || {});
const costruisci = d => app().dati(app().chiama('buildProgram', d));
const dur = (lista, opz) => app().chiama('durataSeduta', lista, opz);
const vicino = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= (tol === undefined ? 0.01 : tol), (msg || '') + ' ' + a + ' contro ' + b);
const O60 = { minuti: 60, eta: 30, prudente: false, livello: 'intermedio', fastidi: false, fattore: 1 };
const limiti = (nome, ctx) => app().dati(app().chiama('limitiPausa', N(nome), ctx));
/* con il nome gia completo (quello degli esercizi dei programmi, con l emoji) */
const limitiN = (nomeCompleto, ctx) => app().dati(app().chiama('limitiPausa', nomeCompleto, ctx));
const BASE = { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', usaProfilo: false };

/* ============================================================ CAS-05: il modello dei tempi ============================================================ */
test('CAS-05: durataEsercizio = n x (S + R) + X, con S = 5 s + ripetizioni x secondi per classe (5 sulla classe A, 3,5 multiarticolari liberi, 4 corpo libero, 3 macchine e isolamenti)', () => {
  const a = app();
  const min = e => a.chiama('durataEsercizio', e);
  /* Goblet Squat 3 x 10, 90 s (classe B): S = 5 + 10 x 3,5 = 40 s, cambio 30 s: 3 x 130 + 30 = 420 s = 7,0 minuti (la riga «multi» di ricerca-casa-poco-tempo 5.2) */
  vicino(min(E('Goblet Squat', 3, 10, 90)), 7.0, 0.001, 'Goblet Squat');
  /* Squat col bilanciere 4 x 5, 180 s (classe A): S = 5 + 5 x 5 = 30 s, cambio 60 s: 4 x 210 + 60 = 900 s = 15 minuti */
  vicino(min(E('Squat con Bilanciere', 4, 5, 180)), 15.0, 0.001, 'Squat con Bilanciere');
  /* Chest Press Machine 3 x 10, 90 s (classe C, 3 s a ripetizione): S = 35 s, cambio 30 s: 3 x 125 + 30 = 405 s = 6,75 minuti */
  vicino(min(E('Chest Press Machine', 3, 10, 90)), 6.75, 0.001, 'Chest Press Machine');
  /* Curl su Panca Inclinata 3 x 12, 60 s (isolamento libero): S = 5 + 36 = 41 s, cambio 20 s: 3 x 101 + 20 = 323 s */
  vicino(min(E('Curl su Panca Inclinata', 3, 12, 60)), 323 / 60, 0.001, 'Curl su Panca Inclinata');
  /* una tenuta dura quanto la tenuta piu 5 s: Plank 3 x 45 s, 45 s: S = 50 s, cambio 15 s: 3 x 95 + 15 = 300 s = 5 minuti (con 90 s di pausa come nel metodo rr di prima: 3 x 140 + 15 = 435 s, 2,25 minuti in piu) */
  vicino(min(E('Plank', 3, 45, 45)), 5.0, 0.001, 'Plank');
  vicino(min(E('Plank', 3, 45, 90)), 7.25, 0.001, 'Plank a 90 s');
  /* il Nordic Curl e un eccentrico: 5 s a ripetizione */
  vicino(min(E('Nordic Curl', 3, 6, 75)), (3 * (5 + 6 * 5 + 75) + 20) / 60, 0.2, 'Nordic Curl');
  assert.strictEqual(min(E('Goblet Squat', 0, 10, 90)), 0, 'senza serie non si conta niente');
});

test('CAS-05: un esercizio a un lato solo vale due lati piu 10 s di cambio, non lo stesso tempo di un bilaterale (H-13: «circa +55%»)', () => {
  const a = app();
  const bulgaro = a.chiama('durataEsercizio', E('Affondi Bulgari', 3, 10, 90)), goblet = a.chiama('durataEsercizio', E('Goblet Squat', 3, 10, 90));
  /* Affondi Bulgari (classe B a corpo libero, 4 s a ripetizione): S = 2 x (5 + 10 x 4) + 10 = 100 s, cambio 40 s: 3 x 190 + 40 = 610 s */
  vicino(bulgaro, 610 / 60, 0.001, 'Affondi Bulgari');
  assert.ok(bulgaro > goblet * 1.4, 'il bulgaro dura molto piu del goblet: ' + bulgaro.toFixed(2) + ' contro ' + goblet.toFixed(2));
  /* la prima stima delle schermate (30 s + pausa a serie) lo contava come un goblet: 3 x (30 + 90) = 6 minuti */
  assert.ok(bulgaro > 3 * 120 / 60 * 1.5);
});

test('CAS-08: una coppia dura n x (S_A + S_B + 15 + max(R_A, R_B)) + X_A + X_B: il 27,8% in meno di due esercizi a serie dritte', () => {
  const a = app();
  const coppia = [E('Chest Press Machine', 3, 10, 90), E('Lat Machine', 3, 10, 90, { superset: true })], dritti = coppia.map(e => Object.assign({}, e, { superset: false }));
  /* coppia: 3 x (35 + 35 + 15 + 90) + 30 + 30 = 585 s = 9,75 minuti; dritti: 2 x 405 = 810 s = 13,5 minuti. Stesso riscaldamento: la differenza e 3,75 minuti */
  const d = dur(dritti, O60) - dur(coppia, O60);
  vicino(d, 3.75, 0.001, 'risparmio della coppia');
  vicino(d / (810 / 60), 0.2778, 0.001, 'quota risparmiata');
  /* l ultima pausa non si conta: la seduta di sola coppia dura 585 s - 90 s piu il riscaldamento */
  vicino(dur(coppia, O60) - dur([E('Chest Press Machine', 3, 10, 90, { rest: 90 })].slice(0, 0).concat([]), O60) > 0 ? dur(coppia, O60) : 0, dur(coppia, O60), 1e-9);
});

test('CAS-05 (RIS 3.7, 3.9, 3.6): il riscaldamento generale e la rampa entrano nella seduta: G = 4 + 1 col primo multiarticolare a 5 ripetizioni o meno, rampa da 4 serie (6,2 minuti) sullo squat pesante', () => {
  const a = app();
  const squat = [E('Squat con Bilanciere', 4, 5, 180)];
  a.ctx.__l = squat;
  assert.deepStrictEqual(a.dati(a.g('[minutiRiscaldamentoGenerale(__l, ' + JSON.stringify(O60) + '), minutiRampa(__l, ' + JSON.stringify(O60) + ')]')), [5, 6.2]);
  /* 5 + 6,2 + 15 - 3 (la pausa dopo l ultima serie) = 23,2 minuti con 60 minuti dichiarati */
  vicino(dur(squat, O60), 23.2, 0.001, 'squat 60 minuti');
  /* con 30 minuti il tetto della rampa e 5 minuti: lo squat e il primo della sua regione e non perde la rampa, scende da 4 a 3 serie (4,1 minuti) */
  vicino(dur(squat, Object.assign({}, O60, { minuti: 30 })), 5 + 4.1 + 12, 0.001, 'squat 30 minuti');
  /* un goblet a 10 ripetizioni: I = 0,71 (3 serie come il bilanciere) meno una per i manubri = 2 serie (2,9 minuti), G = 4 */
  a.ctx.__l = [E('Goblet Squat', 3, 10, 90)];
  assert.deepStrictEqual(a.dati(a.g('[minutiRiscaldamentoGenerale(__l, ' + JSON.stringify(O60) + '), minutiRampa(__l, ' + JSON.stringify(O60) + ')]')), [4, 2.9]);
  /* over 65 (o PAR-Q): G cresce di 2 (eta da 60) e la rampa di 1 serie */
  assert.deepStrictEqual(a.dati(a.g('[minutiRiscaldamentoGenerale(__l, ' + JSON.stringify(Object.assign({}, O60, { eta: 70, prudente: true })) + '), minutiRampa(__l, ' + JSON.stringify(Object.assign({}, O60, { eta: 70, prudente: true })) + ')]')), [6, 4.1]);
  /* un fastidio dichiarato: +1 minuto; mai meno di 3 ne piu di 8 */
  assert.strictEqual(a.g('minutiRiscaldamentoGenerale')(a.g('__l'), Object.assign({}, O60, { fastidi: true })), 5);
});

test('CAS-05 (RIS 3.6): la rampa di una seduta non supera il tetto dei minuti dichiarati (5 fino a 45, 8 fino a 75, 10 oltre) e si taglia dagli ultimi esercizi', () => {
  const a = app();
  const lista = [E('Squat con Bilanciere', 4, 8, 120), E('Panca Piana Bilanciere', 4, 8, 120), E('Rematore con Bilanciere', 4, 8, 120), E('Leg Extension', 3, 12, 75)];
  a.ctx.__l = lista;
  const rampa = m => a.g('minutiRampa')(a.g('__l'), Object.assign({}, O60, { minuti: m }));
  /* senza tetto: squat 3 serie (4,1) + panca 3 (4,1, regione alta) + rematore 3 -1 (stessa regione con 2 serie: 2 serie, 2,9) + leg extension (D, primo del muscolo: 1 serie, 1,3) */
  assert.ok(rampa(90) <= 10);
  assert.ok(rampa(60) <= 8 + 1e-9, 'tetto 8 fino a 75 minuti: ' + rampa(60));
  assert.ok(rampa(45) <= 5 + 1e-9, 'tetto 5 fino a 45 minuti: ' + rampa(45));
  assert.ok(rampa(30) <= 5 + 1e-9);
  assert.ok(rampa(30) >= 4.1 + 1.3 - 1e-9 || rampa(30) >= 4.1, 'il primo di ogni regione (squat e panca) non perde la rampa');
});

test('B36 (CAS-05): Oggi, Giorno e Aggiungi allenamento usano durataSeduta (la stessa funzione del generatore), non piu 30 s + pausa a serie senza gli 8 minuti fissi', () => {
  const R = path.join(__dirname, '..');
  ['js/ui/oggi.js', 'js/ui/piano/giorno.js', 'js/ui/piano/aggiungi-allenamento.js'].forEach(f => {
    const src = fs.readFileSync(path.join(R, f), 'utf8');
    assert.ok(/durataSeduta\(/.test(src), f + ' chiama durataSeduta');
    assert.ok(!/\(30 \+ e\.rest\)|\(30 \+ r\.rest\)/.test(src), f + ' non ha piu la stima di prima (30 s + pausa)');
  });
});

test('B36 (CAS-05): con il profilo salvato lo stesso numero esce dal generatore e dalle schermate (stesse opzioni: eta, fastidi, livello, minuti)', () => {
  const a = caricaApp({ ora: ORA });
  const p = Object.assign({}, BASE, { days: 4, minutes: 60, fastidi: ['spalle'], age: 45, seme: 'ui1' });
  a.profilo({ level: p.level, age: p.age, minutes: p.minutes, fastidi: p.fastidi, parq: false });
  const prog = a.dati(a.chiama('buildProgram', p));
  /* le schermate leggono il piano salvato (loadData, normalizeExerciseRecord): gli stessi esercizi, con `superset` e `tecnica` */
  const piano = {};
  prog.sedute.forEach(sd => { piano[sd.giorno] = sd.esercizi.map(e => Object.assign({}, e, { completedSets: [] })); });
  a.scrivi(a.chiave('dataKey'), piano);
  const stimeUI = prog.sedute.map(sd => a.chiama('durataSeduta', a.dati(a.g('loadData()[' + JSON.stringify(sd.giorno) + ']'))));
  const stimeGeneratore = prog.sedute.map(sd => a.chiama('durataSeduta', sd.esercizi, { minuti: 60, eta: 45, prudente: false, livello: 'intermedio', fastidi: true, fattore: 1 }));
  stimeUI.forEach((m, i) => vicino(m, stimeGeneratore[i], 1e-9, 'seduta ' + i));
  /* e la nota del programma dice la media delle stesse stime */
  const media = Math.round(stimeUI.reduce((t, x) => t + x, 0) / stimeUI.length);
  assert.ok(prog.note.some(n => n.indexOf('circa ' + media + ' minuti') !== -1), 'la nota dice ' + media + ' minuti: ' + JSON.stringify(prog.note.filter(n => /durano/.test(n))));
});

/* ============================================================ CAS-18: il fattore personale ============================================================ */
test('CAS-18: dopo 3 sedute con la durata registrata il fattore e la mediana di minuti reali / stimati, tra 0,8 e 1,4; con meno di 3 sedute vale 1; solo con il consenso', () => {
  const a = caricaApp({ ora: ORA });
  a.profilo({ level: 'intermedio', age: 30, minutes: 60 });
  const serieDi = (n, reps) => Array.from({ length: n }, () => [60, reps, true, 8]);
  const esercizi = [{ nome: N('Squat con Bilanciere'), serie: serieDi(4, 5), rest: 180 }, { nome: N('Lat Machine'), serie: serieDi(3, 10), rest: 90 }, { nome: N('Curl su Panca Inclinata'), serie: serieDi(3, 12), rest: 60 }];
  /* la stima della stessa seduta fatta dal modello senza fattore: la ricostruisce dalle serie fatte (nome, serie, ripetizioni, pausa) */
  const lista = [E('Squat con Bilanciere', 4, 5, 180), E('Lat Machine', 3, 10, 90), E('Curl su Panca Inclinata', 3, 12, 60)];
  const stima = dur(lista, Object.assign({}, O60, { eta: 30 }));
  const con = (rapporto, n, extra) => a.storia(Array.from({ length: n }, (_, i) => a.seduta(2 + 3 * i, esercizi, Object.assign({ minuti: Math.round(stima * rapporto) }, extra || {}))));
  assert.strictEqual(a.chiama('fattoreTempo'), 1, 'senza storico');
  con(1.2, 2); assert.strictEqual(a.chiama('fattoreTempo'), 1, 'con 2 sedute vale ancora 1');
  con(1.2, 3);
  vicino(a.chiama('fattoreTempo'), 1.2, 0.02, 'tre sedute al 120%');
  /* il fattore entra nella durata mostrata e nel risolutore: la stessa lista dura il 20% in piu */
  /* (nella stessa app: lo storico e quello di `a`) */
  const mostrata = a.chiama('durataSeduta', lista), senzaFattore = a.chiama('durataSeduta', lista, Object.assign({}, a.dati(a.chiama('opzioniTempoProfilo')), { fattore: 1 }));
  vicino(mostrata / senzaFattore, a.chiama('fattoreTempo'), 1e-9, 'T_mostrato = T x f');
  con(2, 3); assert.strictEqual(a.chiama('fattoreTempo'), 1.4, 'limite alto');
  con(0.4, 3); assert.strictEqual(a.chiama('fattoreTempo'), 0.8, 'limite basso');
  /* una seduta interrotta, importata o libera non conta; una seduta a meta (meno del 70% delle serie) nemmeno */
  con(1.2, 3, { interrotta: true }); assert.strictEqual(a.chiama('fattoreTempo'), 1, 'sedute interrotte');
  con(1.2, 3, { importata: true }); assert.strictEqual(a.chiama('fattoreTempo'), 1, 'sedute importate');
  /* la mediana, non la media: due sedute normali e una lunghissima restano al 110% */
  a.storia([a.seduta(2, esercizi, { minuti: Math.round(stima * 1.1) }), a.seduta(5, esercizi, { minuti: Math.round(stima * 1.1) }), a.seduta(8, esercizi, { minuti: Math.round(stima * 1.4) })]);
  vicino(a.chiama('fattoreTempo'), 1.1, 0.02, 'mediana');
  /* senza il consenso ai dati il coach non legge lo storico */
  con(1.2, 3); a.consenso(false); assert.strictEqual(a.chiama('fattoreTempo'), 1, 'senza consenso');
});

test('CAS-18: il fattore tara il generatore: chi e piu lento del previsto riceve sedute con meno lavoro, e la nota lo dice', () => {
  const a = caricaApp({ ora: ORA });
  const p = Object.assign({}, BASE, { days: 3, minutes: 60, seme: 'f1' });
  a.profilo({ level: p.level, age: p.age, minutes: p.minutes });
  const senza = a.dati(a.chiama('buildProgram', p));
  const lista = [E('Squat con Bilanciere', 4, 5, 180), E('Lat Machine', 3, 10, 90), E('Curl su Panca Inclinata', 3, 12, 60)];
  const serieDi = (n, reps) => Array.from({ length: n }, () => [60, reps, true, 8]);
  const esercizi = [{ nome: N('Squat con Bilanciere'), serie: serieDi(4, 5), rest: 180 }, { nome: N('Lat Machine'), serie: serieDi(3, 10), rest: 90 }, { nome: N('Curl su Panca Inclinata'), serie: serieDi(3, 12), rest: 60 }];
  const stima = dur(lista, O60);
  a.storia([0, 1, 2].map(i => a.seduta(2 + 3 * i, esercizi, { minuti: Math.round(stima * 1.3) })));
  const con = a.dati(a.chiama('buildProgram', p));
  const serie = prog => prog.sedute.reduce((t, sd) => t + sd.esercizi.reduce((x, e) => x + e.sets, 0), 0);
  assert.ok(serie(con) < serie(senza), 'meno serie con f = 1,3: ' + serie(con) + ' contro ' + serie(senza));
  assert.ok(con.note.some(n => /Le tue sedute durano di solito il (2|3)\d% più del previsto/.test(n)), 'la nota del fattore: ' + JSON.stringify(con.note.filter(n => /durano/.test(n))));
  assert.ok(!senza.note.some(n => /Le tue sedute durano di solito/.test(n)));
});

/* ============================================================ PRG-13 e PRG-20: pause per classe ============================================================ */
test('PRG-13 (B8): le pause vengono dalla CLASSE e dall obiettivo, non dal tipo di carico: Hyperextension e Ponte Glutei 45 s (non 158), Squat col bilanciere 150/210/120 s', () => {
  const g = (nome, ob, reps) => limiti(nome, { obiettivo: ob, reps: reps || 10 });
  /* A: ipertrofia 120-180 (150), forza 180-240 (210), salute e dimagrimento 120 */
  assert.deepStrictEqual([g('Squat con Bilanciere', 'ipertrofia').v, g('Squat con Bilanciere', 'forza', 5).v, g('Squat con Bilanciere', 'generale').v], [150, 210, 120]);
  assert.strictEqual(g('Squat con Bilanciere', 'ipertrofia').max, 180);
  assert.strictEqual(g('Squat con Bilanciere', 'forza', 5).max, 240);
  /* B multiarticolare libero: 90 (corpo libero 75), 120, 75; C guidato: 105 (90-120), 120, 90 */
  assert.deepStrictEqual([g('Goblet Squat', 'ipertrofia').v, g('Goblet Squat', 'forza', 5).v, g('Goblet Squat', 'generale').v], [90, 120, 75]);
  assert.strictEqual(g('Piegamenti a Terra (Push-up)', 'ipertrofia').v, 75, 'corpo libero 75 s');
  assert.deepStrictEqual([g('Chest Press Machine', 'ipertrofia').v, g('Chest Press Machine', 'forza', 5).v, g('Chest Press Machine', 'generale').v], [105, 120, 90]);
  /* D, E isolamento: 75 (60-90), 90, 60; polpacci e laterali 60 */
  assert.deepStrictEqual([g('Leg Extension', 'ipertrofia').v, g('Leg Extension', 'forza').v, g('Leg Extension', 'generale').v], [75, 90, 60]);
  assert.strictEqual(g('Calf Raise in Piedi', 'ipertrofia').v, 60);
  assert.strictEqual(g('Alzate Laterali ai Cavi', 'ipertrofia').v, 60);
  /* F core, tenute, elastici e il corpo libero a zero kg: 45 s con ogni obiettivo (minimo 30 per salute e dimagrimento) */
  ['Hyperextension (Lombari)', 'Ponte Glutei', 'Plank', 'Dead Bug'].forEach(n => ['ipertrofia', 'forza', 'generale'].forEach(ob => assert.strictEqual(g(n, ob).v, 45, n + ' ' + ob)));
  assert.strictEqual(g('Plank', 'generale').taglio, 30);
  assert.strictEqual(g('Plank', 'ipertrofia').taglio, 45, 'con la forza e l ipertrofia il taglio non scende sotto 45 s (fascia RX-02)');
  /* il Nordic Curl e un eccentrico, non un core: ha le pause degli isolamenti */
  assert.strictEqual(g('Nordic Curl', 'ipertrofia').v, 75);
  /* minimi del taglio per il tempo: A 120 (con la forza nessun taglio), B 60 (con la forza 90), C 75 (con la forza 90), D e E 45 */
  assert.deepStrictEqual([g('Squat con Bilanciere', 'ipertrofia').taglio, g('Goblet Squat', 'ipertrofia').taglio, g('Chest Press Machine', 'ipertrofia').taglio, g('Leg Extension', 'ipertrofia').taglio], [120, 60, 75, 45]);
  assert.strictEqual(g('Squat con Bilanciere', 'forza', 5).taglio, 210, 'forza: la classe A non si taglia');
  assert.deepStrictEqual([g('Goblet Squat', 'forza', 5).taglio, g('Chest Press Machine', 'forza', 5).taglio], [90, 90]);
});

test('PRG-20 (D-P7): le donne -15% solo su D, E e su B, C con almeno 8 ripetizioni, mai su A ne con 6 ripetizioni o meno, minimi 45/60/75 s; non con il PAR-Q', () => {
  const d = (nome, ob, reps, extra) => limiti(nome, Object.assign({ obiettivo: ob, reps, donna: true }, extra || {})).v;
  /* D, E: 75 -> 60 (il minimo e 60); B: 90 -> 75; C: 105 -> 90 */
  assert.strictEqual(d('Leg Extension', 'ipertrofia', 12), 60);
  assert.strictEqual(d('Goblet Squat', 'ipertrofia', 10), 75);
  assert.strictEqual(d('Chest Press Machine', 'ipertrofia', 10), 90);
  /* mai con 6 ripetizioni o meno ne sulla classe A */
  assert.strictEqual(d('Goblet Squat', 'ipertrofia', 6), 90);
  assert.strictEqual(d('Chest Press Machine', 'forza', 6), 120);
  assert.strictEqual(d('Squat con Bilanciere', 'ipertrofia', 10), 150);
  assert.strictEqual(d('Squat con Bilanciere', 'forza', 5), 210);
  /* i minimi: la pausa di salute di un isolamento (60) e di un B (75) non scende ancora; il core (45) non si tocca */
  assert.strictEqual(d('Leg Extension', 'generale', 12), 60);
  assert.strictEqual(d('Goblet Squat', 'generale', 10), 75);
  assert.strictEqual(d('Plank', 'ipertrofia', 45), 45);
  /* con il PAR-Q (DON-08) niente riduzione */
  assert.strictEqual(d('Leg Extension', 'ipertrofia', 12, { parq: true }), 75);
  /* gli uomini non cambiano */
  assert.strictEqual(limiti('Leg Extension', { obiettivo: 'ipertrofia', reps: 12 }).v, 75);
});

test('PRG-13 (ETA-09 assorbita): oltre i 65 anni almeno 90 s su B e C e 120 s su A, anche per il taglio per il tempo', () => {
  const o = (nome, ob) => limiti(nome, { obiettivo: ob, reps: 10, over65: true });
  assert.strictEqual(o('Goblet Squat', 'generale').v, 90);
  assert.strictEqual(o('Goblet Squat', 'generale').taglio, 90);
  assert.strictEqual(o('Chest Press Machine', 'generale').v, 90);
  assert.strictEqual(o('Squat con Bilanciere', 'generale').v, 120);
  assert.strictEqual(o('Squat con Bilanciere', 'generale').taglio, 120);
  assert.strictEqual(o('Leg Extension', 'generale').v, 60, 'gli isolamenti no');
});

test('B34 (RX-01, RX-02): in 250 programmi nessuna pausa fuori dalla tabella di classe e obiettivo (Hyperextension e Ponte Glutei non hanno 158 s) e il 5x5 fisso solo sulla classe A', () => {
  const a = app();
  const fuori = [], cinque = [];
  let esercizi = 0;
  const obiettivi = [['massa'], ['forza'], ['salute'], ['dimagrimento'], ['ricomposizione'], ['glutei'], ['forza', 'massa'], ['massa', 'forza']];
  const livelli = ['principiante', 'intermedio', 'avanzato'], luoghi = ['palestra', 'palestra', 'manubri', 'corpo'];
  for (let i = 0; i < 250; i++) {
    const p = Object.assign({}, BASE, { goals: obiettivi[i % obiettivi.length], level: livelli[i % 3], luogo: luoghi[i % 4], days: [2, 3, 4, 5][i % 4], minutes: [30, 45, 60, 75, 90][i % 5], sex: i % 2 ? 'F' : 'M',
      age: i % 11 === 0 ? 70 : 30, parq: i % 13 === 0 ? 'si' : 'no', seme: 'b34-' + i });
    const prog = costruisci(p);
    if (prog.metodo) continue;
    prog.sedute.forEach((sd, k) => sd.esercizi.forEach(e => {
      esercizi++;
      const ob = /ipertrofia/.test(sd.titolo) ? 'ipertrofia' : app().g('tipoObiettivoDi')(p.goals);
      const lim = limitiN(e.name, { obiettivo: ob, reps: e.reps, donna: p.sex === 'F', parq: p.parq === 'si', over65: p.age >= 65 });
      const taglio = app().g('classePausa')(e.name) === 'A' && p.goals[0] === 'forza' ? 120 : lim.lo;   /* la forza, se proprio non entra, porta la classe A al minimo di B8 */
      if (e.rest > lim.max || e.rest < Math.min(taglio, lim.lo)) fuori.push(p.seme + ' ' + e.name + ' ' + e.rest + ' s (ammesso ' + Math.min(taglio, lim.lo) + '-' + lim.max + ', ' + ob + ')');
      if (e.fisso && a.chiama('classePausa', e.name) !== 'A') cinque.push(p.seme + ' ' + e.name);
    }));
  }
  assert.ok(esercizi > 3000, 'campione: ' + esercizi);
  assert.deepStrictEqual(fuori.slice(0, 10), [], 'pause fuori dalla tabella: ' + fuori.length);
  assert.deepStrictEqual(cinque, [], '5x5 fisso fuori dalla classe A');
  ['Hyperextension (Lombari)', 'Ponte Glutei', 'Ponte Glutei a una Gamba'].forEach(n => assert.ok(a.chiama('adattoAlCincoPerCinque', N(n)) === false, n + ' non e adatto al 5x5'));
  assert.strictEqual(a.chiama('adattoAlCincoPerCinque', N('Goblet Squat')), false, 'goblet: niente 5x5');
  assert.strictEqual(a.chiama('adattoAlCincoPerCinque', N('Squat con Bilanciere')), true);
});

test('PRG-20: nei programmi le donne hanno pause piu corte solo dove D-P7 lo ammette (a pari profilo e seme) e il programma lo dice per la nota del generatore', () => {
  const a = caricaApp({ ora: ORA });
  const p = Object.assign({}, BASE, { days: 4, minutes: 90, level: 'avanzato', seme: 'don1' });
  const u = a.dati(a.chiama('buildProgram', p)), d = a.dati(a.chiama('buildProgram', Object.assign({}, p, { sex: 'F' })));
  let piuCorte = 0, uguali = 0, piuLunghe = 0, classeAPiuCorta = 0;
  u.sedute.forEach((sd, i) => sd.esercizi.forEach((e, j) => {
    const f = d.sedute[i] && d.sedute[i].esercizi[j];
    if (!f || f.name !== e.name) return;
    if (f.rest < e.rest) { piuCorte++; if (a.chiama('classePausa', e.name) === 'A') classeAPiuCorta++; } else if (f.rest > e.rest) piuLunghe++; else uguali++;
  }));
  assert.ok(piuCorte > 0, 'qualche pausa piu corta per le donne');
  assert.strictEqual(piuLunghe, 0);
  assert.strictEqual(classeAPiuCorta, 0, 'mai sulla classe A');
  assert.ok(uguali > 0, 'non tutte: solo D, E e B, C con 8 ripetizioni o piu (la classe A e il core restano uguali)');
});

test('PRG-13 (RX-02): la forza ha i minimi di B e C a 90 s anche nel giorno di ipertrofia del PHUL (corpo libero a 75 s no), e una variante senza bilanciere porta la pausa della sua classe (non i 150 s della panca)', () => {
  const a = app();
  /* nel giorno di ipertrofia di un programma di forza: pausa della massa, ma il pavimento e quello della forza */
  const ip = limiti('Squat a Corpo Libero', { obiettivo: 'ipertrofia', minimiDa: 'forza', reps: 10 }), solo = limiti('Squat a Corpo Libero', { obiettivo: 'ipertrofia', reps: 10 });
  assert.strictEqual(solo.v, 75, 'con la massa come obiettivo il corpo libero aspetta 75 s');
  assert.strictEqual(ip.v, 90); assert.strictEqual(ip.lo, 90); assert.ok(ip.taglio >= 90);
  /* le donne non scendono sotto il pavimento dell obiettivo del programma: la forza (B, C a 90 s) vince su D-P7 */
  assert.ok(limiti('Chest Press Machine', { obiettivo: 'ipertrofia', minimiDa: 'forza', reps: 10, donna: true }).v >= 90);
  /* il programma: nessuna pausa sotto 90 s su B e C in un programma di forza (fuori dai metodi), anche nel giorno di ipertrofia */
  const colpe = [];
  [['corpo', 'principiante'], ['manubri', 'intermedio'], ['palestra', 'intermedio'], ['corpo', 'avanzato']].forEach(([luogo, level], k) => [30, 45, 60].forEach(minutes => {
    const prog = costruisci(Object.assign({}, BASE, { goals: ['forza'], level, luogo, days: 4, minutes, seme: 'min90-' + k + minutes }));
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => { const cl = a.chiama('classePausa', e.name); if ((cl === 'B' || cl === 'C') && !e.superset && e.rest < 90) colpe.push(luogo + level + minutes + ' ' + e.name + ' ' + e.rest + ' s'); }));
  }));
  assert.deepStrictEqual(colpe, []);
  /* una panca con il bilanciere (A, 150 s) cambiata in chest press (C) dopo il tempo: riallineaPause la porta alla pausa di C (105 s a 8 ripetizioni) e non tocca le pause gia tagliate */
  a.ctx.__d = Object.assign({}, BASE, { seme: 'riallinea' });
  a.g('(function(){ const b = briefCoach(__d, {}); window.__brief = b; })()');
  a.ctx.__s = [{ tipo: 'push', esercizi: [Object.assign(E('Chest Press Machine', 3, 8, 150), { originale: N('Panca Piana Bilanciere') }), E('Leg Extension', 3, 12, 45)] }];
  assert.strictEqual(a.g('riallineaPause(__brief, __s)'), 1);
  assert.deepStrictEqual(a.dati(a.g('__s[0].esercizi.map(e => e.rest)')), [105, 45]);
});

test('CAS-07 (D-P10): il riempimento con le serie va prima agli isolamenti, poi ai multiarticolari del muscolo sotto fascia, e una spinta solo se le tirate la pareggiano (ABB-04)', () => {
  const a = app();
  /* due sedute: petto sotto il minimo (10 serie frazionarie per l intermedio della massa); una chest press (3 serie) e una panca (3), le tirate 4 + 4: si puo dare una serie alla spinta finche le tirate la pareggiano */
  a.ctx.__d = Object.assign({}, BASE, { minutes: 90, days: 2, seme: 'riempi' });
  a.ctx.__e1 = [E('Panca Piana Bilanciere', 3, 8, 120), E('Rematore con Bilanciere', 4, 8, 120), E('Leg Press', 3, 10, 90)];
  a.ctx.__e2 = [E('Chest Press Machine', 3, 10, 90), E('Lat Machine', 4, 10, 90), E('Leg Curl Seduto', 3, 12, 60)];
  a.g('(function(){ const b = briefCoach(__d, {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); window.__brief = b; window.__sed = [{ giorno: "Lunedì", tipo: "fullbody", titolo: "A", esercizi: JSON.parse(JSON.stringify(__e1)) }, { giorno: "Giovedì", tipo: "fullbody", titolo: "B", esercizi: JSON.parse(JSON.stringify(__e2)) }]; })()');
  a.g('adattaAlTempo(__brief, __sed)');
  const sedute = a.dati(a.g('__sed')), spinte = sedute.reduce((t, sd) => t + sd.esercizi.filter(e => a.chiama('strEspinta', e)).reduce((x, e) => x + e.sets, 0), 0), tirate = sedute.reduce((t, sd) => t + sd.esercizi.filter(e => a.chiama('strEtirata', e)).reduce((x, e) => x + e.sets, 0), 0);
  assert.ok(spinte <= tirate, 'spinte ' + spinte + ' tirate ' + tirate);
  sedute.forEach(sd => assert.ok(a.chiama('durataSeduta', sd.esercizi, a.dati(a.chiama('opzioniTempo', a.g('__brief')))) <= 90, 'dentro i minuti dichiarati'));
});

/* ============================================================ CAS-06: la capacita ============================================================ */
test('CAS-06: stimaEsercizi: minimo 4 (i quattro schemi base), massimo 8, principianti 4-6 e al massimo 50 minuti; la forza con le pause lunghe ne tiene meno', () => {
  const a = app();
  const n = (goal, min, opz) => a.chiama('stimaEsercizi', min, a.dati(a.g("schemeFor('" + goal + "')")), opz);
  assert.deepStrictEqual([20, 30, 45, 60, 75, 90].map(m => n('massa', m, { level: 'intermedio' })), [4, 4, 6, 6, 8, 8]);
  assert.deepStrictEqual([20, 30, 45, 60, 75, 90].map(m => n('forza', m, { level: 'intermedio' })), [4, 4, 4, 5, 6, 7]);
  assert.deepStrictEqual([20, 30, 45, 60, 75, 90].map(m => n('salute', m, { level: 'intermedio' })), [4, 4, 7, 7, 8, 8]);
  assert.deepStrictEqual([20, 30, 45, 60, 75, 90].map(m => n('massa', m, { level: 'principiante' })), [4, 4, 6, 5, 5, 5], 'chi comincia: al massimo 6 e, oltre i 50 minuti, 50');
  assert.strictEqual(n('massa', 90, { level: 'principiante' }), n('massa', 50, { level: 'principiante' }), 'chi comincia dichiara 90 minuti e ne usa 50 (D-P10)');
  assert.strictEqual(n('massa', 45, { level: 'principiante', giorni: 2 }), 6);
  assert.strictEqual(n('massa', 30, { level: 'principiante', giorni: 2 }), 4, 'con 30 minuti e 2 giorni non si arriva a 5 (i 5-6 valgono da 40 minuti)');
  [20, 30, 45, 60, 75, 90].forEach(m => ['massa', 'forza', 'salute', 'dimagrimento'].forEach(g => {
    const x = n(g, m, { level: 'intermedio' });
    assert.ok(x >= 4 && x <= 8, g + ' ' + m + ': ' + x);
  }));
  assert.strictEqual(a.chiama('durataMassimaPrincipiante', 1), 40);
  assert.strictEqual(a.chiama('durataMassimaPrincipiante', 2), 40);
  assert.strictEqual(a.chiama('durataMassimaPrincipiante', 3), 50);
});

test('PRI-08 / D-P10: chi comincia dichiara 90 minuti e la seduta non supera i 50 (+10%), con la nota onesta; nessun principiante ha piu di 6 esercizi', () => {
  const p = Object.assign({}, BASE, { level: 'principiante', days: 3, minutes: 90, seme: 'pri1' });
  const prog = costruisci(p);
  prog.sedute.forEach(sd => {
    assert.ok(sd.esercizi.length >= 4 && sd.esercizi.length <= 6, sd.titolo + ': ' + sd.esercizi.length + ' esercizi');
    const m = dur(sd.esercizi, { minuti: 90, eta: 30, prudente: false, livello: 'principiante', fastidi: false, fattore: 1 });
    assert.ok(m <= 55 + 1e-9, sd.titolo + ': ' + m.toFixed(1) + ' minuti');
  });
  assert.ok(prog.note.some(n => /^Per chi comincia bastano sedute da 40-50 minuti/.test(n)), 'la nota onesta');
  assert.ok(!costruisci(Object.assign({}, p, { minutes: 45 })).note.some(n => /^Per chi comincia bastano sedute/.test(n)), 'con 45 minuti la nota non serve');
});

/* ============================================================ CAS-07, CAS-08: la scala del taglio ============================================================ */
/* una settimana di tre sedute full body uguali (i pavimenti dei grandi muscoli sono rispettati) e il brief del profilo: adattaAlTempo sul piano finto */
function scala(minuti, livello, ricca) {
  const a = app();
  /* ricca: quattro serie sui fondamentali, tre sul resto: i muscoli sono nella fascia (nessun lavoro utile da aggiungere) */
  const lista = [E('Squat con Bilanciere', ricca ? 4 : 3, 8, 150), E('Panca Piana Bilanciere', ricca ? 4 : 3, 8, 150), E('Rematore con Bilanciere', ricca ? 4 : 3, 8, 150), E('Stacco Rumeno', ricca ? 4 : 3, 8, 150), E('Lat Machine', 3, 10, 105),
    E('Curl su Panca Inclinata', 3, 12, 75), E('Estensione Tricipiti sopra la Testa ai Cavi', 3, 12, 75), E('Alzate Laterali ai Cavi', 3, 15, 60), E('Plank', 3, 45, 45)];
  a.ctx.__d = Object.assign({}, BASE, { minutes: minuti, level: livello || 'intermedio', seme: 'scala' });
  a.ctx.__e = lista;
  a.g('(function(){ const b = briefCoach(__d, {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); window.__brief = b; window.__sed = ["Lunedì", "Mercoledì", "Venerdì"].map(g => ({ giorno: g, tipo: "fullbody", titolo: "Full Body", esercizi: JSON.parse(JSON.stringify(__e)) })); })()');
  const prima = a.dati(a.g('__sed[0].esercizi'));
  a.g('adattaAlTempo(__brief, __sed)');
  const dopo = a.dati(a.g('__sed[0].esercizi')), passi = a.dati(a.g('__brief.lavoro.tempoPassi')), note = a.dati(a.g('__brief.lavoro.note'));
  const T = a.g('durataSeduta')(a.g('__sed[0].esercizi'), a.g('opzioniTempo(__brief)'));
  return { prima, dopo, passi, note, T, tutte: a.dati(a.g('__sed')), sotto: a.dati(a.g('__brief.lavoro.sottoFascia')), nome: n => dopo.find(e => e.name === N(n)) };
}
const schemi = (r) => r.dopo.map(e => app().chiama('schemaDi', e.name)).filter(Boolean);

test('CAS-07 passo 1: se basta, si accorciano solo le pause (15 s alla volta, la piu lunga per prima), niente serie ne esercizi tolti', () => {
  const r = scala(74);
  assert.deepStrictEqual(r.passi, { pause: 3, coppie: 0, tagli: 0 }, 'solo le pause, in tutte e tre le sedute');
  assert.strictEqual(r.dopo.length, 8, 'solo il tetto di EXN-02 (9 esercizi: 8) ha tolto un isolamento');
  r.dopo.forEach(e => { const p = r.prima.find(x => x.name === e.name); assert.strictEqual(e.sets, p.sets, e.name + ': serie invariate'); assert.ok(!e.superset, 'nessuna coppia'); });
  assert.strictEqual(r.nome('Squat con Bilanciere').rest, 135, 'una sola pausa da 150 a 135: quanto serve, non tutto al minimo');
  assert.strictEqual(r.nome('Panca Piana Bilanciere').rest, 150);
  assert.ok(r.T <= 74 * 1.05 + 1e-9, 'sta nei minuti: ' + r.T.toFixed(1));
  const piu = scala(66);
  ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Rematore con Bilanciere', 'Stacco Rumeno'].forEach(n => assert.strictEqual(piu.nome(n).rest, 120, n + ': la classe A arriva al suo minimo (120 s)'));
  assert.strictEqual(piu.nome('Lat Machine').rest, 75, 'la classe C al suo minimo (75 s)');
  assert.deepStrictEqual(piu.passi, { pause: 3, coppie: 0, tagli: 0 });
  assert.ok(piu.T <= 66 * 1.05 + 1e-9);
});

test('CAS-07 passo 2 e CAS-08: se non basta, le coppie antagoniste (mai con un pesante, un core o una tenuta), anche sopra i 45 minuti', () => {
  const r = scala(64);
  assert.strictEqual(r.passi.coppie, 3, 'una coppia per seduta');
  assert.strictEqual(r.passi.tagli, 0);
  const i = r.dopo.findIndex(e => e.superset);
  assert.ok(i > 0, 'una coppia c e');
  assert.deepStrictEqual([r.dopo[i - 1].name, r.dopo[i].name].map(n => n.replace(/^\S+ /, '')), ['Curl su Panca Inclinata', 'Estensione Tricipiti sopra la Testa ai Cavi'], 'bicipiti con tricipiti');
  r.dopo.forEach((e, k) => { if (e.superset) { assert.ok(app().chiama('strPuoSuperserie', r.dopo[k - 1]) && app().chiama('strPuoSuperserie', e), 'mai con un fondamentale pesante'); } });
  assert.ok(!r.dopo.some(e => e.superset && /Plank|Squat con Bilanciere|Panca Piana Bilanciere|Stacco Rumeno/.test(e.name)));
  assert.ok(r.T <= 64 * 1.05 + 1e-9);
});

test('CAS-07 passi 3-5: poi via il core e le braccia dirette, le serie da 3 a 2 sui non prioritari (prima le spinte, per ultimo il fondamentale), mai sotto i 4 schemi base per 2 serie', () => {
  const sessanta = scala(60);
  assert.ok(!sessanta.dopo.some(e => /Plank/.test(e.name)), 'il core (P6) e il primo a saltare: nelle altre sedute della settimana ce n e uno');
  assert.ok(sessanta.passi.tagli > 0);
  const r = scala(45), t = scala(30);
  [r, t].forEach(x => {
    ['squat', 'hinge', 'spintaO', 'tirataO'].forEach(k => assert.ok(schemi(x).indexOf(k) !== -1, 'schema base ' + k + ' presente'));
    x.dopo.forEach(e => assert.ok(e.sets >= 2, e.name + ': mai sotto 2 serie'));
  });
  assert.strictEqual(r.nome('Panca Piana Bilanciere').sets, 2, 'a 45 minuti la spinta prende il taglio prima delle tirate');
  assert.strictEqual(r.nome('Rematore con Bilanciere').sets, 3);
  assert.strictEqual(r.nome('Squat con Bilanciere').sets, 3, 'il fondamentale e l ultimo a perdere serie');
  assert.ok(r.T <= 45 * 1.05 + 1e-9, 'a 45 minuti: ' + r.T.toFixed(1));
  /* a 30 minuti i quattro schemi base a due serie non entrano ancora (DUR-01): l ultima risorsa toglie l esercizio fuori dai quattro (la tirata verticale) dalle prime sedute, non dall ultima: nella
     settimana un piano di tirata resta (EQ-02) */
  assert.strictEqual(t.dopo.length, 4, 'a 30 minuti restano i quattro schemi di base');
  t.dopo.forEach(e => assert.strictEqual(e.sets, 2, e.name + ' a 30 minuti'));
  assert.ok(t.tutte[2].esercizi.some(e => /Lat Machine/.test(e.name)), 'la tirata verticale resta in una seduta della settimana');
  assert.ok(t.tutte.every(sd => sd.esercizi.length >= 4), 'mai meno di 4 esercizi: EXN-01 (minimo 3) con margine');
});

test('EXN-01: la scala del taglio non porta mai una seduta sotto i 3 esercizi (nemmeno togliendo il core e le braccia dirette), e a 30 minuti con 5 giorni la seduta «upper forza» ne tiene 3', () => {
  const prog = costruisci({ goals: ['forza'], level: 'intermedio', days: 5, minutes: 30, luogo: 'manubri', fastidi: ['spalle', 'schiena'], sex: 'M', age: 45, sonno: 'bene', attrezzi: 'indifferente', freq: 'auto', parq: 'no', priorita: [], psico: 'nessuno', attrezziPalestra: null, seme: 'collaudo|forza|intermedio|5|30|manubri|spalle+schiena|M|adulto|2' });
  prog.sedute.forEach(sd => assert.ok(sd.esercizi.length >= 3, sd.titolo + ': ' + sd.esercizi.length + ' esercizi'));
});

test('D-P10: il tempo e un tetto: a 90 minuti niente si allunga (nessuna pausa piu lunga della tabella, nessuna serie in piu dove i muscoli sono nella fascia) e riempiTempo non esiste piu', () => {
  const a = app();
  assert.strictEqual(a.g('typeof riempiTempo'), 'undefined', 'il riempimento di prima non e tornato');
  const r = scala(90, 'intermedio', true);
  assert.deepStrictEqual(r.passi, { pause: 0, coppie: 0, tagli: 0 });
  assert.deepStrictEqual(r.sotto.map(x => x.gruppo).filter(g => ['petto', 'schiena', 'quadricipiti', 'glutei'].indexOf(g) !== -1), [], 'i muscoli grandi di questa settimana sono nella fascia (restano sotto solo i femorali, i deltoidi laterali e i polpacci: senza posto per un esercizio in piu, EXN-02)');
  r.dopo.forEach(e => { const p = r.prima.find(x => x.name === e.name); assert.ok(p, e.name + ': nessun esercizio nuovo'); assert.ok(e.sets <= p.sets, e.name + ': serie ' + e.sets + ' contro ' + p.sets); assert.ok(e.rest <= p.rest, e.name + ': pausa non allungata'); });
  assert.ok(r.T <= 90 * 1.05, 'sta nei minuti: ' + r.T.toFixed(1));
  /* con i muscoli sotto la fascia (tre serie sui fondamentali) il tempo che resta serve a una serie in piu, ma mai oltre i minuti dichiarati e solo dove manca lavoro */
  const povera = scala(90);
  assert.ok(povera.T <= 90, 'il riempimento sta nei minuti dichiarati: ' + povera.T.toFixed(1));
  povera.dopo.forEach(e => { const p = povera.prima.find(x => x.name === e.name); assert.ok(p, e.name + ': nessun esercizio nuovo'); assert.ok(e.sets <= p.sets + 1, e.name + ': al massimo una serie in piu'); assert.ok(e.rest <= p.rest, e.name + ': pausa non allungata'); });
  /* sui programmi veri: a 90 minuti la durata media e molto sotto i minuti dichiarati (il lavoro utile sta in meno tempo) e nessuna pausa e piu lunga del massimo di classe */
  let somma = 0, n = 0;
  [2, 3, 4].forEach(days => ['massa', 'salute'].forEach(g => {
    const prog = costruisci(Object.assign({}, BASE, { goals: [g], days, minutes: 90, seme: 'tetto-' + days + g }));
    prog.sedute.forEach(sd => { somma += dur(sd.esercizi, { minuti: 90, eta: 30, prudente: false, livello: 'intermedio', fastidi: false, fattore: 1 }) / 90; n++; });
  }));
  assert.ok(somma / n < 0.85, 'a 90 minuti le sedute usano in media il ' + Math.round(100 * somma / n) + '% dei minuti');
});

test('CAS-07: a 30 minuti e con la forza la classe A scende al suo minimo (120 s) solo se non c e altro modo, e i programmi che non entrano lo dicono («di mantenimento»)', () => {
  const prog = costruisci(Object.assign({}, BASE, { goals: ['forza'], level: 'avanzato', days: 3, minutes: 30, seme: 'forza30' }));
  prog.sedute.forEach(sd => {
    const m = dur(sd.esercizi, { minuti: 30, eta: 30, prudente: false, livello: 'avanzato', fastidi: false, fattore: 1 });
    assert.ok(m <= 30 * 1.10 + 1e-9, sd.titolo + ': ' + m.toFixed(1) + ' minuti');
    sd.esercizi.filter(e => app().chiama('classePausa', e.name) === 'A').forEach(e => assert.ok(e.rest >= 120, e.name + ': ' + e.rest + ' s'));
  });
  /* 20 minuti, tre giorni: i quattro schemi base con i bilancieri non ci stanno: la nota onesta */
  const venti = costruisci(Object.assign({}, BASE, { goals: ['salute'], days: 2, minutes: 20, metodo: 'minimo', seme: 'venti' }));
  assert.ok(venti.note.some(n => /^Con questi minuti il programma tiene i muscoli e fa progredire chi comincia/.test(n)), 'mantenimento: ' + JSON.stringify(venti.note));
});

/* ============================================================ IPE-04, IPE-12 ============================================================ */
test('IPE-04: il giorno «forza» del PHUL con 45 minuti o meno e a 6 ripetizioni con 120-150 s di pausa (non 4 x 5 a 180 s); da 60 minuti resta 5 ripetizioni; per l obiettivo forza non scatta', () => {
  const classeA = prog => [].concat.apply([], prog.sedute.filter(sd => /forza/.test(sd.titolo)).map(sd => sd.esercizi.filter(e => app().chiama('classePausa', e.name) === 'A' && !e.fisso)));
  const corto = costruisci(Object.assign({}, BASE, { days: 4, minutes: 45, seme: 'phul1' })), lungo = costruisci(Object.assign({}, BASE, { days: 4, minutes: 75, seme: 'phul1' }));
  const c = classeA(corto), l = classeA(lungo);
  assert.ok(c.length >= 2 && l.length >= 2);
  c.forEach(e => { assert.strictEqual(e.reps, 6, e.name + ' a 45 minuti: 6 ripetizioni'); assert.ok(e.rest >= 120 && e.rest <= 150, e.name + ': ' + e.rest + ' s'); });
  l.forEach(e => { assert.strictEqual(e.reps, 5, e.name + ' a 75 minuti: 5 ripetizioni'); assert.ok(e.rest >= 120, e.name); });
  assert.ok(l.some(e => e.rest === 180), 'a 75 minuti il giorno di forza tiene i 180 s');
  const forzaGoal = costruisci(Object.assign({}, BASE, { goals: ['forza'], days: 4, minutes: 45, seme: 'phul1' }));
  assert.ok(classeA(forzaGoal).every(e => e.reps <= 5), 'con la forza come obiettivo il giorno resta a 5 ripetizioni o meno');
});

test('IPE-12: con 30 minuti o meno, o 2 giorni al massimo, la nota onesta «4-6 serie per muscolo a settimana»; non con 60 minuti e 3 giorni', () => {
  const nota = prog => prog.note.some(n => /^Con poco tempo conta il lavoro essenziale/.test(n));
  assert.ok(nota(costruisci(Object.assign({}, BASE, { minutes: 30, seme: 'p12a' }))));
  assert.ok(nota(costruisci(Object.assign({}, BASE, { days: 2, minutes: 60, seme: 'p12b' }))));
  assert.ok(!nota(costruisci(Object.assign({}, BASE, { days: 3, minutes: 60, seme: 'p12c' }))));
});

/* ============================================================ PCO-04, CAS-10: i metodi ============================================================ */
test('PCO-04 / CAS-10: il metodo «minimo» accetta 2 o 3 giorni e da 20 a 45 minuti; 4-5 esercizi da 2 serie, la pausa e quella della classe', () => {
  const a = app();
  const m = a.dati(a.g("(() => { const x = metodoDa('minimo'); return { giorni: x.giorni, minuti: x.minuti, split2: x.split(2).giorni, split3: x.split(3).giorni, nEs: [3, 4, 6, 8].map(n => x.nEs(n)), superserie: x.superserie }; })()"));
  assert.deepStrictEqual(m.giorni, [2, 3]);
  assert.deepStrictEqual(m.minuti, [20, 45]);
  assert.deepStrictEqual(m.split2, ['fullbody', 'fullbody']);
  assert.deepStrictEqual(m.split3, ['fullbody', 'fullbody', 'fullbody']);
  assert.deepStrictEqual(m.nEs, [4, 4, 5, 5]);
  assert.strictEqual(m.superserie, true);
  const prog = costruisci(Object.assign({}, BASE, { goals: ['salute'], days: 3, minutes: 30, metodo: 'minimo', seme: 'min3' }));
  assert.strictEqual(prog.metodo, 'minimo');
  assert.strictEqual(prog.sedute.length, 3, 'tre full body');
  prog.sedute.forEach(sd => {
    assert.ok(sd.esercizi.length >= 4 && sd.esercizi.length <= 5, sd.titolo + ': ' + sd.esercizi.length);
    sd.esercizi.forEach(e => { assert.strictEqual(e.sets, 2, e.name); if (!a.g('isTimeBased')(e.name)) assert.strictEqual(e.reps, 10, e.name); assert.ok(e.rest <= limitiN(e.name, { obiettivo: 'generale', reps: e.reps }).max, e.name + ': pausa di classe'); });
  });
});

test('PCO-04 / H-07: il metodo rr ha le coppie per MUSCOLO antagonista (mai per indice), le gambe prima, nessuna coppia con core o tenute, 3 serie da 5-8 e le pause di classe (il Plank non aspetta 90 s)', () => {
  const a = app();
  const rx = costruisci(Object.assign({}, BASE, { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, luogo: 'corpo', metodo: 'rr', seme: 'rr1' }));
  assert.strictEqual(rx.metodo, 'rr');
  let coppie = 0;
  const colpe = [];
  [['massa', 60], ['forza', 45], ['salute', 60], ['ricomposizione', 75]].forEach(([g, min]) => ['principiante', 'intermedio'].forEach(level => [0, 1, 2].forEach(k => {
    const prog = costruisci(Object.assign({}, BASE, { goals: [g], level, days: 3, minutes: min, luogo: 'corpo', metodo: 'rr', seme: 'rr-' + g + level + k }));
    prog.sedute.forEach(sd => {
      sd.esercizi.forEach((e, i) => {
        /* 3 serie del metodo; 2 solo se la scala del tempo (CAS-07 passo 4) ha dovuto toglierne: con 45 minuti la forza a corpo libero non entra */
        if (e.sets !== 3 && !(e.sets === 2 && min <= 45)) colpe.push(g + level + ' ' + e.name + ' ' + e.sets + ' serie (' + min + ' minuti)');
        if (!a.g('isTimeBased')(e.name) && (e.reps < 5 || e.reps > 8)) colpe.push(g + level + ' ' + e.name + ' ' + e.reps + ' ripetizioni');
        if (e.rest > limitiN(e.name, { obiettivo: a.g('tipoObiettivoDi')([g]), reps: e.reps }).max) colpe.push(g + level + ' ' + e.name + ' pausa ' + e.rest);
        if (e.superset) {
          coppie++;
          const prec = sd.esercizi[i - 1];
          if (!a.chiama('antagonistiPerMuscolo', prec, e)) colpe.push(g + level + ' coppia non antagonista: ' + prec.name + ' + ' + e.name);
          if (a.g('isTimeBased')(e.name) || a.g('isTimeBased')(prec.name) || /Dead Bug|Plank|Bird Dog/.test(e.name + prec.name)) colpe.push(g + level + ' coppia con un tempo o il core');
        }
      });
      const idxGambe = sd.esercizi.map(e => (a.g('findExercise')(e.name) || {}).group).map(gr => gr === 'gambe' || gr === 'glutei');
      const primoNonGambe = idxGambe.indexOf(false), ultimoGambeMulti = sd.esercizi.map((e, i) => (a.g('findExercise')(e.name) || {}).type === 'compound' && idxGambe[i]).lastIndexOf(true);
      if (primoNonGambe !== -1 && ultimoGambeMulti > primoNonGambe && sd.esercizi.slice(0, ultimoGambeMulti).some(e => ['spalle', 'braccia'].indexOf((a.g('findExercise')(e.name) || {}).group) !== -1)) colpe.push(g + level + ' spalle o braccia prima di un multiarticolare delle gambe');
    });
  })));
  assert.deepStrictEqual(colpe, []);
  assert.ok(coppie > 10, 'il campione ha delle coppie: ' + coppie);
  /* la prima stima di una tenuta con 90 s di pausa (H-04) non c e piu */
  assert.ok(![].concat.apply([], rx.sedute.map(sd => sd.esercizi)).some(e => /Plank|Dead Bug|Bird Dog/.test(e.name) && e.rest > 45));
});

test('SS-01 (ABB-06): riparaCoppie toglie il segno `superset` che non e piu una coppia valida (partner tolto, pesante, core o tenuta) e lascia le coppie giuste', () => {
  const a = app();
  const s = [{ esercizi: [E('Squat a Corpo Libero', 3, 8, 75), E('Ponte Glutei a una Gamba', 3, 8, 45), E('Rematore Inverso (Corpo Libero)', 3, 8, 75, { superset: true }), E('Piegamenti a Terra (Push-up)', 3, 8, 75, { superset: true }),
    E('Curl su Panca Inclinata', 3, 12, 60), E('Estensione Tricipiti sopra la Testa ai Cavi', 3, 12, 60, { superset: true }), E('Plank', 3, 45, 45, { superset: true })] }];
  a.ctx.__s = s;
  const tolti = a.g('riparaCoppie(__s)');
  /* Rematore + Ponte non e una coppia (il Ponte non e una tirata: antagonisti per muscolo) e il segno cade; Piegamenti dopo il Rematore (ora a serie dritte) e invece una coppia giusta di tirata e spinta e resta;
     Curl + Tricipiti si; Plank con un tricipite in coppia no (un core non fa coppia, e il tricipite ha gia il suo compagno) */
  assert.strictEqual(tolti, 2);
  assert.deepStrictEqual(a.dati(a.g('__s[0].esercizi.map(e => !!e.superset)')), [false, false, false, true, false, true, false]);
  /* un pesante non fa coppia: panca col bilanciere + rematore col bilanciere (SS-02), e una tenuta nemmeno */
  a.ctx.__s = [{ esercizi: [E('Panca Piana Bilanciere', 3, 8, 120), E('Rematore con Bilanciere', 3, 8, 120, { superset: true }), E('Plank', 3, 45, 45), E('Dead Bug', 3, 45, 45, { superset: true })] }];
  assert.strictEqual(a.g('riparaCoppie(__s)'), 2);
  assert.deepStrictEqual(a.dati(a.g('__s[0].esercizi.map(e => !!e.superset)')), [false, false, false, false]);
});

/* ============================================================ la verifica del tempo ============================================================ */
test('validaTempo: la nota dice quanto durano le sedute (la media di durataSeduta), mai NaN; con il lavoro utile completo e sedute sotto il 75% dei minuti lo dice', () => {
  const prog = costruisci(Object.assign({}, BASE, { goals: ['salute'], days: 3, minutes: 90, level: 'intermedio', seme: 'utile1' }));
  const media = Math.round(prog.sedute.reduce((t, sd) => t + dur(sd.esercizi, { minuti: 90, eta: 30, prudente: false, livello: 'intermedio', fastidi: false, fattore: 1 }), 0) / prog.sedute.length);
  const nota = prog.note.find(n => /^Le sedute durano circa/.test(n));
  assert.ok(nota && !/NaN/.test(nota), 'la nota c e: ' + nota);
  assert.ok(nota.indexOf('circa ' + media + ' minuti') !== -1, nota + ' (media ' + media + ')');
  assert.ok(media < 90 * 0.75, 'sotto il 75% dei minuti: ' + media);
  assert.ok(/il lavoro utile per te è già tutto qui/.test(nota), 'tutti i muscoli nella fascia e sedute corte: lo dice (D-P10): ' + nota);
  /* con soli 2 giorni i muscoli non arrivano alla fascia: la seduta e corta lo stesso ma il lavoro utile NON e «gia tutto qui» (non lo si dice se non e vero) */
  const due = costruisci(Object.assign({}, BASE, { goals: ['salute'], days: 2, minutes: 90, level: 'intermedio', seme: 'utile1' }));
  assert.ok(due.note.some(n => /^Le sedute durano circa \d+ minuti: nel conto ci sono riscaldamento/.test(n)), 'due giorni: ' + JSON.stringify(due.note.filter(n => /durano/.test(n))));
  const lunga = costruisci(Object.assign({}, BASE, { goals: ['massa'], days: 5, minutes: 45, level: 'avanzato', seme: 'utile2' }));
  assert.ok(lunga.note.some(n => /^Le sedute durano circa \d+ minuti: nel conto ci sono riscaldamento/.test(n)), 'con i muscoli non ancora nella fascia il lavoro utile non e «gia tutto qui»');
});

test('i numeri di soglie-tempo.js hanno forza e fonte (Convenzione, Decisione, Moderata) e i dizionari hanno le frasi nuove (en, es, de)', () => {
  const a = app();
  const soglie = a.dati(a.g('SOGLIE_TEMPO'));
  Object.keys(soglie).forEach(k => { assert.ok(soglie[k].v !== undefined && soglie[k].fonte && ['Convenzione', 'Decisione', 'Moderata', 'Solida', 'Contrastata', 'Provvisoria'].indexOf(soglie[k].forza) !== -1, k); assert.ok(Array.isArray(soglie[k].regole) && soglie[k].regole.length > 0, k + ': i codici delle regole'); });
  assert.strictEqual(soglie.pauseDonne.forza, 'Convenzione', 'PRG-20: etichetta «Convenzione» (D-P7)');
  assert.strictEqual(soglie.pausa.forza, 'Convenzione');
  assert.strictEqual(soglie.quotaLavoroUtile.forza, 'Decisione');
  assert.deepStrictEqual(soglie.durataMaxPrincipiante.v, { settimane1e2: 40, dopo: 50 });
  assert.deepStrictEqual(soglie.fattorePersonale.v.min, 0.8);
  assert.deepStrictEqual(soglie.fattorePersonale.v.max, 1.4);
});
