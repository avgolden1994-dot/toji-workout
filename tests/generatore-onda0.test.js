/* Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso).
   B1 quanti esercizi per seduta (PRG-03 ponte), B2 PHUL (PRG-14), B3 tecniche al cedimento (MAV-02/03 ponte), B19 Starting Strength,
   B22 TOCCHI (testo = codice), B24 eta (ETA-01..03, D-P9, REC-11 parte prudente), B29 femorali (ponte), B32 curl inclinato (PRG-23),
   B34 5x5 solo col bilanciere (PRG-14), CAS-14 casa senza sbarra (ponte). Le regole bloccate dalla verifica non sono qui.
   Il grosso e su 300 profili con seme fisso (stessi 300 a ogni esecuzione), poi le prove puntuali. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
const IN_VM = (app, x) => app.g('JSON.parse(' + JSON.stringify(JSON.stringify(x)) + ')');

/* ---------- i 300 profili: generatore con seme fisso (mulberry32), le classi a rischio sono sempre presenti ---------- */
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const PSICO_IMPEGNATIVO = { preferenza: 'durissimi', tolleranza: 'spingo', fiducia: 'alta', varieta: 'mix' };
const PSICO_ROUTINE = { varieta: 'routine', preferenza: 'impegnativi', tolleranza: 'continuo' };
function profili(n) {
  const r = mulberry32(20261005), uno = l => l[Math.floor(r() * l.length)];
  const out = [];
  for (let i = 0; i < n; i++) {
    const k = i % 10;   /* un profilo su dieci minorenne, uno su dieci over 65 */
    const age = k === 0 ? 13 + Math.floor(r() * 5) : k === 1 ? 65 + Math.floor(r() * 20) : 18 + Math.floor(r() * 47);
    const tutti = ['massa', 'forza', 'dimagrimento', 'salute', 'ricomposizione', 'glutei'];
    const goals = [uno(tutti)]; if (r() < 0.3) { const g = uno(tutti); if (goals.indexOf(g) === -1) goals.push(g); }
    out.push({
      goals, age, level: uno(['principiante', 'intermedio', 'intermedio', 'avanzato']), days: uno([2, 3, 3, 4, 4, 5, 6]), minutes: uno([30, 45, 60, 60, 75, 90]),
      luogo: uno(['palestra', 'palestra', 'palestra', 'manubri', 'corpo']), sex: uno(['M', 'F']), fastidi: r() < 0.25 ? [uno(['spalle', 'ginocchia', 'schiena'])] : [],
      parq: r() < 0.1 ? 'si' : 'no', sonno: uno(['bene', 'bene', 'medio', 'male']), attrezzi: uno(['indifferente', 'indifferente', 'liberi', 'macchine']),
      psico: uno([undefined, undefined, PSICO_IMPEGNATIVO, PSICO_ROUTINE]), usaProfilo: false, seme: 'w0t2-' + i
    });
  }
  return out;
}
const PROFILI = profili(300);

/* il programma del profilo: p e il profilo, prog il risultato (o l errore) */
let _app = null, _tutti = null;
const app = () => _app || (_app = caricaApp({ ora: ORA }));
const costruisci = d => app().dati(app().chiama('buildProgram', d));
function tutti() {
  if (_tutti) return _tutti;
  _tutti = PROFILI.map(p => { let prog = null, errore = null; try { prog = costruisci(p); } catch (e) { errore = e.message; } return { p, prog, errore }; });
  return _tutti;
}
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false };
const senzaCed = nome => app().g('senzaCedimento')(nome);
const TECNICHE_CED = () => app().json('TECNICHE_AL_CEDIMENTO');
const tecnicheAmmesse = p => p.level !== 'principiante' && p.age >= 18 && p.age < 65 && p.parq !== 'si';   /* MAV-03, ETA-02, REC-11 */

/* ---------- B1 / PRG-03 ponte: quanti esercizi per seduta ---------- */
test('B1 (PRG-03, riscritta da W2-T2 come CAS-06): stimaEsercizi conta le serie vere e il modello dei tempi: da 4 a 8 esercizi, da 4 a 6 per chi inizia', () => {
  const a = app();
  const massa = a.g("schemeFor('massa')"), forza = a.g("schemeFor('forza')");
  const sM = a.dati(massa), sF = a.dati(forza);
  /* serie effettive: chi inizia, il prudente (minorenne, over 65, PAR-Q) al massimo 3 (COACH_PARAMETRI.serieMaxPrudente); la forza ne fa in media 3,5 */
  assert.strictEqual(a.chiama('serieEffettive', sM, { level: 'principiante' }), 3);
  assert.strictEqual(a.chiama('serieEffettive', sM, { prudente: true }), 3);
  assert.ok(a.chiama('serieEffettive', sF, { level: 'intermedio' }) > a.chiama('serieEffettive', sM, { level: 'intermedio' }) - 1e-9, 'la forza conta almeno le serie della massa');
  assert.ok(a.chiama('serieEffettive', sF, {}) <= sF.sets, 'mai oltre le serie dello schema');
  /* limiti di CAS-06: 4-8 esercizi (i quattro schemi base, il tetto di EXN-02), 4-6 per chi inizia; la forza, con le pause lunghe, ne tiene meno della massa */
  [20, 30, 45, 60, 75, 90].forEach(min => {
    ['massa', 'forza', 'salute', 'dimagrimento'].forEach(goal => {
      const s = a.dati(a.g("schemeFor('" + goal + "')"));
      const n = a.chiama('exerciseCountFor', min, s, { level: 'intermedio' }), nP = a.chiama('exerciseCountFor', min, s, { level: 'principiante' });
      assert.ok(n >= 4 && n <= 8, goal + ' ' + min + ' min: ' + n + ' esercizi, fuori da 4-8');
      assert.ok(nP >= 4 && nP <= 6, goal + ' ' + min + ' min principiante: ' + nP + ' esercizi, fuori da 4-6');
    });
  });
  /* il caso che riempiva male le sedute: 60 minuti di massa erano 4 esercizi, adesso 6-8 */
  assert.ok(a.chiama('exerciseCountFor', 60, sM, { level: 'intermedio' }) >= 6);
  assert.strictEqual(a.chiama('exerciseCountFor', 30, sM, { level: 'intermedio' }), 4);
  assert.strictEqual(a.chiama('exerciseCountFor', 90, sM, { level: 'principiante' }), 5);
  assert.deepStrictEqual(app().errori, []);
});

test('B1: sui 300 profili ogni seduta ha almeno 3 esercizi (EXN-01 = 0), al massimo 8 (6 per chi inizia) e i principianti non fanno piu di 3 serie', () => {
  const r = tutti();
  assert.deepStrictEqual(r.filter(x => x.errore).map(x => x.errore), [], 'nessun profilo da 13 anni in su deve dare un errore');
  const pochi = [], troppi = [], serie = [];
  let sedute = 0;
  r.forEach(({ p, prog }) => prog.sedute.forEach(sd => {
    sedute++;
    if (sd.esercizi.length < 3) pochi.push(p.seme + ' ' + sd.titolo + ' ' + sd.esercizi.length);
    if (sd.esercizi.length > (p.level === 'principiante' ? 6 : 8)) troppi.push(p.seme + ' ' + sd.titolo + ' ' + sd.esercizi.length);
    if (p.level === 'principiante') sd.esercizi.forEach(e => { if (e.sets > 3) serie.push(p.seme + ' ' + e.name + ' ' + e.sets); });
  }));
  assert.deepStrictEqual(pochi, [], 'EXN-01: sedute con meno di 3 esercizi');
  /* EXN-02: il tetto lascia fuori solo le aggiunte protette (femorali, glutei): residuo sotto l 1% delle sedute (collaudo: 11,2% -> 0,6%) */
  assert.ok(troppi.length / sedute <= 0.01, 'EXN-02: sedute con troppi esercizi: ' + troppi.join('; '));
  assert.deepStrictEqual(serie, [], 'PRN-02: principianti con piu di 3 serie');
});

test('B1 (CAS-05, DUR-01): sui 300 profili le sedute non sforano i minuti dichiarati col modello dei tempi di W2-T2 e il tempo non si riempie (D-P10)', () => {
  const a = app();
  let sotto = 0, sopra = 0, sedute = 0;
  tutti().forEach(({ p, prog }) => prog.sedute.forEach(sd => {
    /* le stesse opzioni del generatore (il profilo non e salvato in questa prova): il modello e quello di durataSeduta, senza fattore personale; chi inizia sta in 50 minuti al massimo (PRI-08) */
    const m = a.chiama('durataSeduta', sd.esercizi, { minuti: p.minutes, eta: p.age, prudente: p.age >= 65 || p.parq === 'si', livello: p.level, fastidi: p.fastidi.length > 0, fattore: 1 });
    const limite = p.level === 'principiante' ? Math.min(p.minutes, 50) : p.minutes;
    sedute++;
    if (m < 0.75 * p.minutes) sotto++;
    if (m > 1.10 * limite) sopra++;
  }));
  /* W2-T2 (CAS-07, D-P10): il tempo e un tetto, non un obiettivo: la seduta non si allunga per riempire i minuti (il riempimento di prima, riempiTempo, non c e piu) e quasi meta delle sedute
     resta sotto il 75% dei minuti dichiarati (misurato: 47%; a 90 minuti il 59% in media): il volume utile sta in meno tempo. Lo sforamento oltre il 10% resta solo dove i pavimenti (4 schemi base
     per 2 serie, 4 serie frazionarie per i grandi muscoli) non lasciano tagliare: a 30 minuti, circa 1 seduta su 20 */
  assert.ok(sotto / sedute >= 0.30, 'il tempo e un tetto: ' + (100 * sotto / sedute).toFixed(1) + '% delle sedute sotto il 75% dei minuti');
  assert.ok(sopra / sedute <= 0.02, 'DUR-01: ' + (100 * sopra / sedute).toFixed(1) + '% delle sedute oltre il 110% dei minuti');
});

/* ---------- B3 / MAV-02, MAV-03 ponte: tecniche al cedimento ---------- */
test('B3 (TEC-01 = 0): niente tecniche al cedimento a principianti, minorenni, over 65, PAR-Q; mai su core, a tempo, peso zero, stacchi', () => {
  const a = app();
  const ced = TECNICHE_CED();
  assert.deepStrictEqual(ced.slice().sort(), ['amrap', 'backoff', 'calibrazione', 'drop', 'myo', 'parziali', 'riposopausa']);   /* W2-T3 (MAV-13): anche i myo-reps portano al cedimento */
  const colpe = [];
  let conTecnica = 0;
  tutti().forEach(({ p, prog }) => prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (ced.indexOf(e.tecnica) === -1) return;
    conTecnica++;
    if (!tecnicheAmmesse(p)) colpe.push(p.seme + ' (' + p.level + ', ' + p.age + ', parq ' + p.parq + ') ' + e.name + ' ' + e.tecnica);
    if (senzaCed(e.name)) colpe.push(p.seme + ' ' + e.name + ' ' + e.tecnica + ' su esercizio senza cedimento');
  })));
  assert.deepStrictEqual(colpe, []);
  assert.ok(conTecnica > 20, 'il campione deve contenere tecniche al cedimento per chi puo farle (' + conTecnica + ')');
  /* senzaCedimento: core, tempo, peso zero, stacchi si; un fondamentale col bilanciere no */
  assert.ok(senzaCed(a.json("EXERCISE_LIBRARY.find(e => /Plank/.test(e.name)).name")), 'Plank');
  assert.ok(senzaCed(a.json("EXERCISE_LIBRARY.find(e => /Stacco da Terra/.test(e.name)).name")), 'Stacco da Terra');
  assert.ok(senzaCed(a.json("EXERCISE_LIBRARY.find(e => /Stacco Rumeno/.test(e.name)).name")), 'Stacco Rumeno');
  assert.ok(!senzaCed(a.json("EXERCISE_LIBRARY.find(e => /Panca Piana Bilanciere/.test(e.name)).name")), 'Panca Piana Bilanciere');
});

test('B3 (MAV-03): over 65 e PAR-Q senza AMRAP, drop e parziali; la potenza solo su macchina; il cluster solo se non minorenne', () => {
  const a = app();
  const colpe = [];
  let potenza = 0;
  tutti().forEach(({ p, prog }) => prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (e.tecnica === 'potenza') {
      potenza++;
      if (p.age < 65) colpe.push(p.seme + ' potenza sotto i 65 anni');
      if (a.chiama('attrezzoDi', pulito(e.name)) !== 'macchine') colpe.push(p.seme + ' potenza su ' + e.name + ' (non e una macchina)');
    }
    if (e.tecnica === 'cluster' && p.age < 18) colpe.push(p.seme + ' cluster a un minorenne');
  })));
  assert.deepStrictEqual(colpe, []);
  assert.ok(potenza > 0, 'la potenza degli over 65 compare (' + potenza + ')');
  /* una scheda a 45 minuti per un principiante: superserie si, drop set no, e la nota non promette il drop */
  const prog = costruisci(Object.assign({}, BASE, { level: 'principiante', minutes: 45, days: 3, seme: 'drop-1' }));
  assert.ok(!prog.sedute.some(sd => sd.esercizi.some(e => e.tecnica === 'drop')));
  assert.ok(prog.note.some(n => /Poco tempo: spinte e tirate in superserie/.test(n)) && !prog.note.some(n => /drop set/.test(n)), 'la nota non nomina un drop set che non c e');
  assert.ok(prog.note.some(n => /Per ora niente serie al cedimento/.test(n)));
  /* un intermedio sano a 45 minuti il drop set ce l ha e la nota lo dice */
  const prog2 = costruisci(Object.assign({}, BASE, { level: 'intermedio', minutes: 45, days: 3, seme: 'drop-2', psico: undefined }));
  const haDrop = prog2.sedute.some(sd => sd.esercizi.some(e => e.tecnica === 'drop'));
  assert.strictEqual(prog2.note.some(n => /drop set/.test(n)), haDrop, 'la nota dice drop set se e solo se c e');
  assert.deepStrictEqual(a.errori, []);
});

test('B3 / B22: i metodi con AMRAP (GreySkull, GZCLP, Reddit PPL) lo tolgono a chi non puo, e lo tengono (non su stacchi) per chi puo', () => {
  ['greyskull', 'gzclp', 'redditppl'].forEach(m => {
    const giorni = m === 'gzclp' ? 4 : 3;
    const prudente = costruisci(Object.assign({}, BASE, { metodo: m, level: 'principiante', days: giorni, goals: ['forza'], seme: 'amrap-' + m }));
    prudente.sedute.forEach(sd => sd.esercizi.forEach(e => assert.notStrictEqual(e.tecnica, 'amrap', m + ': AMRAP a un principiante (' + e.name + ')')));
    const over = costruisci(Object.assign({}, BASE, { metodo: m, level: 'intermedio', age: 70, days: giorni, goals: ['forza'], seme: 'amrap-o-' + m }));
    over.sedute.forEach(sd => sd.esercizi.forEach(e => assert.ok(['amrap', 'backoff'].indexOf(e.tecnica) === -1, m + ': AMRAP a un over 65 (' + e.name + ')')));
    const minore = costruisci(Object.assign({}, BASE, { metodo: m, level: 'intermedio', age: 16, days: giorni, goals: ['forza'], seme: 'amrap-m-' + m }));
    minore.sedute.forEach(sd => sd.esercizi.forEach(e => assert.strictEqual(e.tecnica, undefined, m + ': tecnica a un minorenne (' + e.name + ')')));
    const sano = costruisci(Object.assign({}, BASE, { metodo: m, level: 'principiante', days: giorni, goals: ['forza'], seme: 'amrap-s-' + m, age: 30 }));
    /* un principiante sano resta senza (il metodo e per chi inizia, ma l AMRAP e cedimento): la nota del metodo lo dice */
    assert.ok(!sano.sedute.some(sd => sd.esercizi.some(e => e.tecnica === 'amrap')));
  });
  const sano = costruisci(Object.assign({}, BASE, { metodo: 'gzclp', level: 'intermedio', days: 4, goals: ['forza'], seme: 'amrap-gz' }));
  const amrap = [].concat.apply([], sano.sedute.map(sd => sd.esercizi.filter(e => e.tecnica === 'amrap')));
  assert.ok(amrap.length > 0, 'GZCLP a un intermedio sano ha ancora l AMRAP');
  amrap.forEach(e => assert.ok(!senzaCed(e.name), 'AMRAP su ' + e.name));
});

/* ---------- B2 / PRG-14: PHUL ---------- */
test('B2 (RX-01): giorno di ipertrofia (PHUL e intermedi): torna allo schema della massa, niente 6x8 ne 5x8 a 180 s; il giorno di forza tiene le pause lunghe', () => {
  /* PHUL con massa e con forza, e l intermedio senza metodo con la forza come obiettivo (li' il giorno di ipertrofia ereditava 6 serie e 240-300 s di pausa) */
  const casi = [{ metodo: 'phul', goals: ['massa'] }, { metodo: 'phul', goals: ['forza'] }, { metodo: 'phul', goals: ['massa'], level: 'avanzato' }, { goals: ['forza'] }, { goals: ['forza'], sex: 'F' }, { goals: ['forza', 'massa'], minutes: 90 }];
  casi.forEach((caso, i) => {
    const seme = 'ipertrofia-' + i;
    const prog = costruisci(Object.assign({}, BASE, { level: 'intermedio', minutes: 75, days: 4, seme }, caso));
    const iper = prog.sedute.filter(sd => /ipertrofia/.test(sd.titolo)), forza = prog.sedute.filter(sd => /forza/.test(sd.titolo));
    assert.strictEqual(iper.length, 2, seme + ': due giorni di ipertrofia');
    assert.strictEqual(forza.length, 2, seme + ': due giorni di forza');
    iper.forEach(sd => sd.esercizi.forEach(e => {
      assert.ok(e.sets <= 5, seme + ' ' + e.name + ' ' + e.sets + ' serie nel giorno di ipertrofia');   /* 5 solo dal riempimento del volume minimo di un muscolo, mai 6 */
      /* con PHUL decide il metodo (schema della massa: 150 s al massimo); senza metodo il riempimento del tempo puo allungare le pause dentro il tetto dell obiettivo */
      if (caso.metodo) assert.ok(e.rest <= 150, seme + ' ' + e.name + ': ' + e.rest + ' s di pausa nel giorno di ipertrofia');
      assert.ok(!(e.sets >= 6 && e.reps === 8), seme + ' ' + e.name + ': 6x8');
      assert.ok(!(e.reps === 8 && e.rest >= 180 && e.sets >= 5), seme + ' ' + e.name + ': 5x8 a 180 s');
      if (!e.fisso && !a_tempo(e.name)) assert.ok(e.reps >= 6 && e.reps <= 15, seme + ' ' + e.name + ': ' + e.reps + ' ripetizioni fuori da 6-15');
    }));
    /* W2-T2 (B8): il giorno di forza tiene le pause lunghe (fino a 180 s) e, solo se la seduta non sta nei minuti, la classe A scende al suo minimo di 120 s (il taglio per il tempo, CAS-07) */
    forza.forEach(sd => sd.esercizi.filter(e => e.reps <= 5).forEach(e => assert.ok(e.rest >= 120, seme + ' ' + e.name + ': il giorno di forza tiene le pause lunghe (' + e.rest + ' s)')));
    assert.ok(!iper.some(sd => sd.esercizi.some(e => e.fisso)), seme + ': nessun 5x5 fisso nel giorno di ipertrofia');
  });
});
function a_tempo(nome) { return app().g('isTimeBased')(nome); }

/* ---------- B34 / PRG-14: il 5x5 fisso solo col bilanciere ---------- */
test('B34 (PRG-14): il 5x5 fisso solo sul primo fondamentale col bilanciere, mai su goblet, manubri, macchine, corpo libero, ne a over 65 e minorenni', () => {
  const a = app();
  const colpe = [];
  let cinque = 0;
  tutti().forEach(({ p, prog }) => prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (!e.fisso) return;
    cinque++;
    if (prog.metodo) return;   /* i metodi famosi hanno le loro serie (3x5, 1x5...) e marcano il posto come fisso */
    /* 5 ripetizioni; le serie sono 5 ma chi inizia o e nel giorno di forza ne fa meno (tetto 3 o 4 dopo il 5x5) */
    if (e.reps !== 5 || e.sets > 5) colpe.push(p.seme + ' ' + e.name + ' fisso ma ' + e.sets + 'x' + e.reps);
    if (!a.chiama('adattoAlCincoPerCinque', e.name)) colpe.push(p.seme + ' ' + e.name + ' non e adatto al 5x5');
    if (/goblet/i.test(e.name) || a.chiama('attrezzoDi', pulito(e.name)) !== 'bilanciere') colpe.push(p.seme + ' ' + e.name + ': 5x5 senza bilanciere');
    if (p.age >= 65 || p.age < 18) colpe.push(p.seme + ' 5x5 a ' + p.age + ' anni');
    if (/ipertrofia/.test(sd.titolo)) colpe.push(p.seme + ' 5x5 nel giorno di ipertrofia');
  })));
  assert.deepStrictEqual(colpe, []);
  assert.ok(cinque > 5, 'il campione contiene dei 5x5 fissi (' + cinque + ')');
  /* l idoneita per nome */
  const idoneo = rx => a.chiama('adattoAlCincoPerCinque', a.json('EXERCISE_LIBRARY.find(e => ' + rx + '.test(e.name)).name'));
  assert.strictEqual(idoneo('/Squat con Bilanciere/'), true);
  assert.strictEqual(idoneo('/Panca Piana Bilanciere/'), true);
  assert.strictEqual(idoneo('/Goblet/'), false, 'goblet squat');
  assert.strictEqual(idoneo('/Piegamenti/'), false, 'corpo libero');
  assert.strictEqual(idoneo('/Chest Press Machine/'), false, 'macchina guidata');
});

/* ---------- B19: Starting Strength ---------- */
test('B19: Starting Strength A = squat 3x5, panca 3x5, stacco 1x5; B = squat 3x5, military 3x5, stacco 1x5; niente power clean', () => {
  ['ss-1', 'ss-2', 'ss-3'].forEach((seme, i) => {
    const prog = costruisci(Object.assign({}, BASE, { metodo: 'startingstrength', level: 'principiante', goals: ['forza'], days: 3, minutes: [45, 60, 75][i], sex: i === 1 ? 'F' : 'M', seme }));
    assert.strictEqual(prog.metodo, 'startingstrength');
    assert.strictEqual(prog.sedute.length, 3);
    const riga = e => pulito(e.name) + ' ' + e.sets + 'x' + e.reps;
    const A = ['Squat con Bilanciere 3x5', 'Panca Piana Bilanciere 3x5', 'Stacco da Terra (Deadlift) 1x5'];
    const B = ['Squat con Bilanciere 3x5', 'Military Press 3x5', 'Stacco da Terra (Deadlift) 1x5'];
    assert.deepStrictEqual(prog.sedute[0].esercizi.map(riga), A, seme + ' seduta A');
    assert.deepStrictEqual(prog.sedute[1].esercizi.map(riga), B, seme + ' seduta B');
    assert.deepStrictEqual(prog.sedute[2].esercizi.map(riga), A, seme + ' seduta A (di nuovo)');
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => assert.ok(!/power clean|girata/i.test(e.name), 'niente power clean: non c e in libreria')));
  });
  const m = app().json("METODI.find(x => x.id === 'startingstrength')");
  assert.ok(/stacco da terra #?|stacco da terra 1×5/i.test(m.come) && /3×5/.test(m.come), 'il testo dice quello che il programma fa: ' + m.come);
  assert.ok(/power clean non c/i.test(m.attenzione), 'la nota avvisa che il power clean non c e');
});

/* ---------- B22: TOCCHI, il testo e il codice ---------- */
test('B22: i tocchi dei metodi fanno quello che dicono (piramide: ultimo isolamento da 20; isolamenti da almeno 15; AMRAP solo dove si puo)', () => {
  const a = app();
  const base = costruisci(Object.assign({}, BASE, { days: 4, minutes: 75, goals: ['massa'], seme: 'tocchi-1', level: 'intermedio' }));
  const sedutaDa = (i) => { const sd = JSON.parse(JSON.stringify(base.sedute[i])); sd.esercizi.forEach(e => { delete e.tecnica; }); return sd; };   /* senza le tecniche gia messe dal generatore: qui si prova il solo tocco */
  /* tecnicheOk: undefined = nessun contesto (come i vecchi chiamanti); true/false = il contesto del generatore, con la vera senzaCedimento dell app */
  const applica = (nome, sd, ps, tecnicheOk) => { a.ctx.__sd = IN_VM(a, sd); a.ctx.__ps = IN_VM(a, ps || {}); a.ctx.__ok = tecnicheOk; a.g('TOCCHI.' + nome + '.fa(__sd, __ps, __ok === undefined ? undefined : { tecnicheOk: __ok, senzaCedimento: senzaCedimento })'); return a.dati(a.ctx.__sd); };
  const T = a.json('TOCCHI');
  assert.ok(/20 ripetizioni/.test(T.piramide.testo), T.piramide.testo);
  assert.ok(/15 ripetizioni/.test(T.isolamenti.testo), T.isolamenti.testo);
  assert.strictEqual(T.amrap.alCedimento, true);
  const isoOk = e => a.chiama('tipoCarico', e.name) === 'isolamento' && !a.chiama('isTimeBased', e.name) && (a.chiama('findExercise', e.name) || {}).group !== 'core';
  for (let i = 0; i < base.sedute.length; i++) {
    const prima = sedutaDa(i);
    /* piramide: l ultimo isolamento (non core, non a tempo) va a 20, nessun altro cambia */
    const dopo = applica('piramide', prima, {});
    const ultimo = prima.esercizi.filter(isoOk).pop();
    prima.esercizi.forEach((e, k) => {
      if (e === ultimo || (ultimo && e.name === ultimo.name)) { assert.strictEqual(dopo.esercizi[k].reps, 20, 'ultimo isolamento a 20: ' + e.name); assert.strictEqual(dopo.esercizi[k].rest, 60); }
      else assert.strictEqual(dopo.esercizi[k].reps, e.reps, 'la piramide non tocca ' + e.name);
    });
    /* isolamenti: tutti a 15 o piu, il resto no */
    const dopo2 = applica('isolamenti', prima, {});
    prima.esercizi.forEach((e, k) => { if (isoOk(e)) assert.ok(dopo2.esercizi[k].reps >= 15, e.name + ' ' + dopo2.esercizi[k].reps); else assert.strictEqual(dopo2.esercizi[k].reps, e.reps); });
    /* AMRAP: su un solo pesante, mai se non si puo andare al cedimento, mai a intensita bassa */
    assert.strictEqual(applica('amrap', prima, { intensita: 'alta' }, false).esercizi.filter(e => e.tecnica === 'amrap').length, 0, 'AMRAP a chi non puo');
    assert.strictEqual(applica('amrap', prima, { intensita: 'bassa' }, true).esercizi.filter(e => e.tecnica === 'amrap').length, 0, 'AMRAP a chi non ama la fatica');
    applica('amrap', prima, { intensita: 'alta' }, true).esercizi.filter(e => e.tecnica === 'amrap').forEach(e => assert.ok(!senzaCed(e.name)));
  }
});

/* ---------- B24 / ETA-01..03, D-P9: l eta ---------- */
test('B24 (ETA-01): l eta e obbligatoria: senza eta o sotto i 13 anni nessun programma, con il messaggio che dice di allenarsi con un adulto esperto', () => {
  const a = app();
  const ok = x => a.chiama('etaPerProgramma', x);
  [null, undefined, '', '  ', 'abc', 0, -4, 3.5, 100, 150].forEach(x => { const r = ok(x); assert.strictEqual(r.ok, false, String(x)); assert.strictEqual(r.minore, false); assert.ok(r.messaggio, 'messaggio per ' + String(x)); });
  [1, 5, 12, '12'].forEach(x => { const r = ok(x); assert.strictEqual(r.ok, false, String(x)); assert.strictEqual(r.messaggio, 'Sotto i 13 anni il coach non crea programmi: allenati con un adulto esperto.'); });
  [13, 15, 17, '16'].forEach(x => { const r = ok(x); assert.strictEqual(r.ok, true); assert.strictEqual(r.minore, true, String(x)); assert.strictEqual(r.motivo, 'minorenne'); });
  [18, 30, 65, 99].forEach(x => { const r = ok(x); assert.strictEqual(r.ok, true); assert.strictEqual(r.minore, false, String(x)); });
  /* buildProgram: l ultima guardia, sotto i 13 anni non produce niente (e non scrive niente) */
  [5, 12].forEach(eta => assert.throws(() => costruisci(Object.assign({}, BASE, { age: eta, seme: 'eta-' + eta })), e => /Sotto i 13 anni il coach non crea programmi/.test(e.message), 'buildProgram a ' + eta + ' anni'));
  assert.deepStrictEqual(Object.keys(a.store).filter(k => /prog/i.test(k)), [], 'nessun programma salvato');
  /* il programma dei 13 anni invece esce */
  assert.ok(costruisci(Object.assign({}, BASE, { age: 13, seme: 'eta-13' })).sedute.length > 0);
});

test('B24 (ETA-01): l onboarding non va avanti senza un eta valida (passo preferenze) e non crea il programma all ultimo passo', () => {
  const a = app();
  const passo4 = (age) => {
    a.g('onbStep = 4');
    a.ctx.__o = IN_VM(a, { goals: ['massa'], goal: 'massa', level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', freq: 'auto', age, parq: 'no' });
    a.g('onbData = __o');
    return a.g('onbStepValid()');
  };
  assert.strictEqual(passo4(null), false, 'senza eta');
  assert.strictEqual(passo4(12), false, '12 anni');
  assert.strictEqual(passo4(13), true, '13 anni');
  assert.strictEqual(passo4(40), true, '40 anni');
  assert.strictEqual(passo4(120), false, '120 anni');
  /* all ultimo passo senza eta si torna alle preferenze, senza creare niente */
  a.g('onbStep = 7'); a.ctx.__o = IN_VM(a, { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], age: null }); a.g('onbData = __o');
  const tocca = a.g('typeof renderOnb');
  assert.ok(tocca === 'function');
  a.ctx.renderOnb = () => {};
  a.g('onbNext()');
  assert.strictEqual(a.g('onbStep'), 4, 'torna al passo dell eta');
  assert.deepStrictEqual(Object.keys(a.store).filter(k => /prog/i.test(k)), [], 'nessun programma salvato');
});

test('B24 (ETA-02, ETA-03, REC-11): 13-17 anni, profilo minorenne: al massimo 3 serie, nessuna tecnica, RIR almeno 2, la nota dell adulto o istruttore', () => {
  const minorenni = tutti().filter(x => x.p.age < 18);
  assert.ok(minorenni.length >= 25, 'il campione ha minorenni (' + minorenni.length + ')');
  const colpe = [];
  minorenni.forEach(({ p, prog }) => {
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      if (e.sets > 3) colpe.push(p.seme + ' ' + e.name + ' ' + e.sets + ' serie');
      if (e.tecnica) colpe.push(p.seme + ' ' + e.name + ' tecnica ' + e.tecnica);
      if (e.fisso) colpe.push(p.seme + ' 5x5 fisso a un minorenne');
      if (!a_tempo(e.name) && (e.reps < 8 || e.reps > 15)) colpe.push(p.seme + ' ' + e.name + ' ' + e.reps + ' ripetizioni');
    }));
    if (!prog.rirSett || prog.rirSett.some(x => x < 2)) colpe.push(p.seme + ' RIR sotto 2: ' + JSON.stringify(prog.rirSett));
    if (!prog.note.some(n => /Allenati con un adulto o un istruttore/.test(n))) colpe.push(p.seme + ' senza la nota dell istruttore');
    if (!prog.note.some(n => /Alla tua età conta imparare bene i movimenti/.test(n))) colpe.push(p.seme + ' senza la nota sui massimali');
  });
  assert.deepStrictEqual(colpe, []);
  /* un quindicenne preciso, in palestra, a 75 minuti: nessun esercizio da piu di 3 serie, mai al cedimento, e un adulto della stessa scheda no */
  const q = costruisci(Object.assign({}, BASE, { age: 15, minutes: 75, days: 4, level: 'avanzato', goals: ['forza'], seme: 'q15' }));
  q.sedute.forEach(sd => sd.esercizi.forEach(e => { assert.ok(e.sets <= 3, e.name + ' ' + e.sets); assert.strictEqual(e.tecnica, undefined); assert.ok(!e.fisso); }));
  assert.ok(q.rirSett.every(x => x >= 2), 'RIR della settimana: ' + q.rirSett);
  const adulto = costruisci(Object.assign({}, BASE, { age: 30, minutes: 75, days: 4, level: 'avanzato', goals: ['forza'], seme: 'q15' }));
  assert.ok(adulto.sedute.some(sd => sd.esercizi.some(e => e.sets > 3)), 'un adulto avanzato in forza fa piu di 3 serie');
  assert.ok(!adulto.note.some(n => /adulto o un istruttore/.test(n)));
  /* un minorenne non incontra un metodo con RIR 0 ne un mesociclo che scende a zero */
  assert.ok(q.rirSett.length > 0);
});

test('ETA-03: over 65 e PAR-Q restano prudenti (3 serie, niente cedimento); chi non dice l eta (programma gia salvato) conta come adulto', () => {
  tutti().filter(x => x.p.age >= 65).forEach(({ p, prog }) => prog.sedute.forEach(sd => sd.esercizi.forEach(e => assert.ok(e.sets <= 3, p.seme + ' ' + e.name + ' ' + e.sets))));
  const senzaEta = costruisci(Object.assign({}, BASE, { age: undefined, seme: 'senza-eta' }));
  assert.ok(senzaEta.sedute.length > 0 && !senzaEta.note.some(n => /adulto o un istruttore/.test(n)), 'un profilo vecchio senza eta resta adulto: i programmi gia salvati non cambiano');
});

/* ---------- B29: femorali ---------- */
test('B29 (SES-03, MIS-01, FRQ-01): ogni seduta di gambe (lower, legs, full body) ha uno stacco o una flessione del ginocchio; leg curl da 2 giorni, 3 serie (2 ai principianti)', () => {
  const a = app();
  const flessione = e => /leg curl|nordic/i.test(pulito(e.name));
  const cerniera = e => { a.ctx.__e = IN_VM(a, e); return a.g('SLOT_DEF.hinge(__e)'); };
  const colpe = [];
  let controllate = 0;
  tutti().forEach(({ p, prog }) => {
    if (p.luogo !== 'palestra' || p.days < 2 || prog.metodo) return;
    prog.sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).forEach(sd => {
      controllate++;
      if (!sd.esercizi.some(e => cerniera(e) || flessione(e))) colpe.push(p.seme + ' ' + sd.titolo + ': ' + sd.esercizi.map(e => pulito(e.name)).join(', '));
    });
  });
  assert.deepStrictEqual(colpe, [], 'sedute di gambe senza femorali');
  assert.ok(controllate > 100, 'sedute controllate: ' + controllate);
  /* da 2 giorni: almeno una flessione del ginocchio nella settimana, anche per la salute; 2 serie ai principianti, agli altri 3 con 3 giorni e 2 con 2 giorni (salvo i tagli per il tempo).
     INT-2b: il «3 serie da 2 giorni» era il numero del ponte di W0-T2; la tabella B6 dei pavimenti di serie dirette (W2-T1, colonna «Salute, dimagrimento») dice 2 serie di flessione del ginocchio
     per la salute, con qualunque numero di giorni: con 2 giorni il leg curl e da 2 serie (e lo stacco rumeno porta il resto dei femorali), con 3 giorni il solutore ne mette 3 dove c e posto. Il test
     profili salute e un controllo del ponte: il pavimento per la salute non e piu «3 serie» */
  [['principiante', 2], ['intermedio', 3]].forEach(([level, serieBase]) => [2, 3].forEach(days => {
    const serie = level === 'intermedio' && days === 2 ? 2 : serieBase;
    const prog = costruisci(Object.assign({}, BASE, { goals: ['salute'], level, days, minutes: 60, seme: 'fem-' + level + days }));
    const flex = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.filter(flessione)));
    assert.ok(flex.length >= 1, level + ' ' + days + ' giorni: nessuna flessione nella settimana');
    if (level === 'principiante') flex.forEach(e => assert.ok(e.sets <= 3, 'principiante: ' + e.sets + ' serie di ' + e.name));
    else assert.ok(flex.some(e => e.sets >= serie), level + ': almeno un leg curl da ' + serie + ' serie');
    prog.sedute.filter(sd => /legs|lower|fullbody/.test(sd.tipo)).forEach(sd => assert.ok(sd.esercizi.some(e => cerniera(e) || flessione(e)), level + ' ' + days + ' giorni: ' + sd.titolo + ' senza femorali'));
  }));
  assert.deepStrictEqual(a.errori, []);
});

/* ---------- B32 / PRG-23: il curl sulla panca inclinata, non lo Scott ---------- */
test('B32 (PRG-23, D-P8): con due curl uno e inclinato o ai cavi (Bayesiano); lo Scott e lo Spider non prendono il suo posto', () => {
  const colpe = [];
  let sostituzioni = 0, conDueCurl = 0;
  tutti().forEach(({ p, prog }) => {
    if (prog.metodo || p.luogo === 'corpo') return;
    const curl = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.filter(e => /curl/i.test(pulito(e.name)) && !/leg curl|nordic/i.test(pulito(e.name)))));
    if (prog.note.some(n => /Bicipite: un curl su panca inclinata/.test(n))) {
      sostituzioni++;
      if (!curl.some(e => /panca inclinata|bayesiano/i.test(pulito(e.name)))) colpe.push(p.seme + ' nota senza il curl inclinato: ' + curl.map(e => pulito(e.name)).join(', '));
    }
    if (curl.length >= 2 && (p.goals.indexOf('massa') !== -1 || p.goals.indexOf('ricomposizione') !== -1) && p.days >= 3 && p.goals[0] !== 'salute') {
      conDueCurl++;
      if (!curl.some(e => /panca inclinata|bayesiano/i.test(pulito(e.name)))) colpe.push(p.seme + ' due curl, nessuno allungato: ' + curl.map(e => pulito(e.name)).join(', '));
    }
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(conDueCurl > 10, 'campione con due curl: ' + conDueCurl);
  /* il Curl su Panca Inclinata esiste in libreria ed e quello che il coach propone per primo */
  assert.ok(app().json('EXERCISE_LIBRARY.some(e => /Curl su Panca Inclinata/.test(e.name))'));
});

/* ---------- CAS-14 ponte: casa senza sbarra ---------- */
test('CAS-14: senza sbarra (palestra con solo bilanciere e manubri) niente trazioni ne lat; la tirata verticale e il Pullover con Manubrio o una serie in piu di rematore, e la nota lo dice', () => {
  const a = app();
  ['bil-man-1', 'bil-man-2', 'bil-man-3'].forEach((seme, i) => {
    const prog = costruisci(Object.assign({}, BASE, { days: [3, 4, 5][i], minutes: 60, level: 'intermedio', attrezziPalestra: ['bilanciere', 'manubri'], seme }));
    const nomi = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.map(e => pulito(e.name))));
    assert.ok(!nomi.some(n => /trazioni|lat machine|pulldown|lat pull|sbarra/i.test(n)), seme + ': ' + nomi.join(', '));
    const haPullover = nomi.some(n => /Pullover con Manubrio/.test(n));
    const righe = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.filter(e => /^Rematore/.test(pulito(e.name)) || /Pulley|Rematore/.test(pulito(e.name)))));
    assert.ok(haPullover || righe.some(e => e.sets >= 4), seme + ': ne pullover ne un rematore a 4 serie');
    assert.ok(prog.note.some(n => n === 'Senza sbarra la schiena si allena con rematori e pullover: meno completo.'), seme + ' senza la nota: ' + prog.note.join(' | '));
    /* sei schemi di movimento ogni settimana: la tirata verticale c e come pullover o non e piu «mancante», e non ce n e uno doppio (SAN-01) */
    assert.ok(nomi.filter(n => /Pullover con Manubrio/.test(n)).length <= 2);
    assert.ok(prog.sedute.every(sd => new Set(sd.esercizi.map(e => e.name)).size === sd.esercizi.length), 'nessun esercizio doppio nella seduta');
  });
  /* con la palestra completa la nota non c e */
  const piena = costruisci(Object.assign({}, BASE, { days: 3, minutes: 60, seme: 'piena' }));
  assert.ok(!piena.note.some(n => /Senza sbarra/.test(n)));
  assert.deepStrictEqual(a.errori, []);
});

/* ---------- guardia: nessun errore dell app, e il programma di sempre ha la stessa forma ---------- */
test('forma del programma invariata e nessun console.error dell app sui 300 profili', () => {
  const r = tutti();
  r.forEach(({ prog }) => {
    ['goals', 'scheme', 'split', 'sedute', 'prefs', 'metodo', 'ispirazioni', 'fisico', 'sostituzioni', 'note', 'riposo', 'settimane', 'blocco', 'fasi', 'rirSett', 'eserciziPerSeduta', 'seme'].forEach(k => assert.ok(k in prog, 'manca ' + k));
    prog.sedute.forEach(sd => { assert.ok(sd.giorno && sd.tipo && sd.titolo); sd.esercizi.forEach(e => { assert.ok(e.name && e.sets >= 1 && e.reps >= 1 && e.rest >= 0); assert.ok(!('protetto' in e) && !('riservaTirataV' in e), 'marcatore interno rimasto su ' + e.name); }); });
  });
  assert.deepStrictEqual(app().errori, []);
});
