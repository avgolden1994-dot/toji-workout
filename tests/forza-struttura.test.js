/* La modalità Forza: struttura del powerlifting (piano coach v2, W2-T7): FRZ-02 (squat e panca almeno 2 volte, stacco 1 + variante, per 3-6 giorni), FRZ-03 (varianti e punto debole),
   FRZ-04 (accessorio del punto debole), FRZ-05 (onda giornaliera pesante, media, leggera), STD-02 (nessun test del massimale: il testo) e le guardie di sicurezza (la modalità
   non scavalca la Sentinella: minorenni, over 65, PAR-Q, fastidi, attrezzi, periodi di vita, prontezza e dolore).
   Prove in node con l'app vera in vm (tests/aiuto-app.js, orologio e caso fissi). I due file nuovi (specialita/soglie-forza.js e forza.js) li mette in index.html l'integrazione
   (docs/in-arrivo/W2-T7.json): se non ci sono ancora, la prova li carica da sola nel contesto, dopo tutti gli altri come farà index.html (forza.js DOPO regia/genera.js: si registra al caricamento).
   Sul codice di prima (tag coach-v2-onda-2d) la prova fallisce sulle asserzioni (nessuna modalità registrata, nessuna alzata fissa, nessuna onda), non per un file mancante. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const R = path.join(__dirname, '..');
const ORA = '2026-10-05T12:00:00';   /* lunedi */
const FILE_NUOVI = ['js/coach/specialita/soglie-forza.js', 'js/coach/specialita/forza.js'];
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();

function nuovaApp(opz) {
  const a = caricaApp(Object.assign({ ora: ORA }, opz || {}));
  if (a.g('typeof SPEC_FORZA') === 'undefined') FILE_NUOVI.filter(f => fs.existsSync(path.join(R, f))).forEach(f => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), a.ctx, { filename: f }));
  return a;
}
let _app = null;
const app = () => _app || (_app = nuovaApp());
const costruisci = (d, a) => (a || app()).dati((a || app()).chiama('buildProgram', d));
/* un powerlifter: forza, palestra completa, nessun fastidio, adulto, sano */
const PL = { goals: ['forza'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', usaProfilo: false, forzaTipo: 'powerlifting', seme: 'w2t7' };
const prog = (extra, a) => costruisci(Object.assign({}, PL, extra || {}), a);
const senza = (extra, a) => costruisci(Object.assign({}, PL, { forzaTipo: undefined }, extra || {}), a);   /* lo stesso profilo con la forza di sempre */

/* le tre alzate come le conta chi guarda i nomi (non i segni della modalità): l'alzata di gara e le sue varianti */
const RX = { squat: /^(squat con bilanciere|squat con pausa|front squat)/i, panca: /^(panca piana bilanciere|panca con pausa|panca presa stretta|panca inclinata bilanciere)/i, stacco: /^(stacco da terra|stacco in deficit|stacco rumeno$|stacco con trap bar)/i };
const sedutePer = (p, k) => p.sedute.filter(sd => sd.esercizi.some(e => RX[k].test(pulito(e.name)))).length;
const tuttiGliEsercizi = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi));
const SERIE_FORZA_MIN = { principiante: 6, intermedio: 9, avanzato: 12 };   /* GOA-01 del collaudo */
const serieForza = p => tuttiGliEsercizi(p).reduce((t, e) => t + (app().json('(function (n) { const m = findExercise(n); return !!m && m.type === "compound" && !isTimeBased(n); })(' + JSON.stringify(e.name) + ')') && e.reps <= 6 ? e.sets : 0), 0);
const minutiSeduta = (sd, M, livello) => app().chiama('durataSeduta', JSON.parse(JSON.stringify(sd.esercizi)), { minuti: M, eta: 30, prudente: false, livello: livello || 'intermedio', fastidi: false, fattore: 1 });

/* ============================================================ attivazione ============================================================ */
test('FRZ-01/02: la modalità «forza» è registrata nel generatore (stadio 3) e il brief la legge solo dalla risposta «powerlifting» (forza generale = come oggi)', () => {
  const a = app();
  assert.strictEqual(a.g('typeof SPEC_FORZA'), 'object', 'SPEC_FORZA esiste');
  assert.strictEqual(a.g("typeof SPECIALITA_STRUTTURA.forza"), 'function', 'registraSpecialita("forza", specialitaForza)');
  const mod = (d, prof0, goals) => a.dati(a.chiama('modalitaForzaDa', d, prof0, goals));
  assert.strictEqual(mod({ forzaTipo: 'powerlifting' }, {}, ['forza']), 'forza');
  assert.strictEqual(mod({ forzaTipo: 'Powerlifting' }, {}, ['forza', 'massa']), 'forza', 'maiuscole e secondo obiettivo');
  assert.strictEqual(mod({ forzaTipo: 'generale' }, {}, ['forza']), null, 'forza generale = come oggi');
  assert.strictEqual(mod({}, {}, ['forza']), null, 'nessuna risposta = come oggi');
  assert.strictEqual(mod({ forzaTipo: 'powerlifting' }, {}, ['massa', 'forza']), null, 'la forza deve essere il primo obiettivo');
  assert.strictEqual(mod({ forzaTipo: 'powerlifting' }, {}, ['massa']), null);
  assert.strictEqual(mod({}, { forzaTipo: 'powerlifting' }, ['forza']), 'forza', 'un nuovo ciclo lo legge dal profilo salvato');
  assert.strictEqual(mod({ tipoForza: 'powerlifting' }, {}, ['forza']), 'forza', 'nome alternativo del campo');
  assert.strictEqual(mod({ modalita: 'forza' }, {}, ['forza']), 'forza');
  assert.strictEqual(mod({ forzaTipo: 'generale' }, { forzaTipo: 'powerlifting' }, ['forza']), null, 'la risposta di adesso vince sul profilo');
  /* il brief */
  const brief = (d) => a.json('briefCoach(' + JSON.stringify(Object.assign({}, PL, d)) + ', {}).obiettivi.modalita');
  assert.strictEqual(brief({}), 'forza');
  assert.strictEqual(brief({ forzaTipo: 'generale' }), 'generale');
  assert.strictEqual(brief({ forzaTipo: undefined }), 'generale');
  assert.strictEqual(brief({ goals: ['massa'] }), 'generale');
});

test('senza «powerlifting» il programma è quello di prima, identico (byte per byte)', () => {
  const a = app();
  [{ level: 'principiante', days: 3 }, { days: 4 }, { level: 'avanzato', days: 5, minutes: 90 }, { days: 6, sex: 'F' }, { goals: ['massa'] }].forEach(extra => {
    const x = costruisci(Object.assign({}, PL, { forzaTipo: undefined }, extra), a), y = costruisci(Object.assign({}, PL, { forzaTipo: 'generale' }, extra), a);
    assert.deepStrictEqual(x, y, JSON.stringify(extra));
    assert.strictEqual(x.modalita, 'generale');
    assert.ok(!/^Forza:/.test(x.split.nome));
  });
});

/* ============================================================ FRZ-02: la frequenza delle tre alzate ============================================================ */
test('FRZ-02: 3, 4, 5 e 6 giorni (intermedio e avanzato, palestra): squat almeno 2 sedute, panca almeno 2, stacco almeno 1; titoli dei giorni, nome della divisione, programma v2', () => {
  const a = app();
  ['intermedio', 'avanzato'].forEach(level => [3, 4, 5, 6].forEach(days => [30, 45, 60, 90].forEach(minutes => ['M', 'F'].forEach(sex => {
    const p = costruisci(Object.assign({}, PL, { level, days, minutes, sex, seme: 'f2|' + level + days + minutes + sex }), a), id = level + ' ' + days + ' giorni ' + minutes + ' min ' + sex;
    assert.strictEqual(p.modalita, 'forza', id);
    assert.strictEqual(p.versione, 2, id);
    assert.ok(/^Forza: /.test(p.split.nome), id + ': ' + p.split.nome);
    assert.strictEqual(p.sedute.length, days, id + ': tante sedute quanti i giorni (SPL-01)');
    assert.ok(sedutePer(p, 'squat') >= 2, id + ': squat in ' + sedutePer(p, 'squat') + ' sedute');
    assert.ok(sedutePer(p, 'panca') >= 2, id + ': panca in ' + sedutePer(p, 'panca') + ' sedute');
    assert.ok(sedutePer(p, 'stacco') >= 1, id + ': stacco in ' + sedutePer(p, 'stacco') + ' sedute');
    assert.ok(!p.note.some(n => /alcune alzate restano fuori/.test(n)), id + ': con questi minuti la frequenza è completa, la nota «non è completa» non c\'è');
    p.sedute.forEach(sd => {
      assert.ok(sd.esercizi.length >= 3, id + ' ' + sd.titolo + ': almeno 3 esercizi (EXN-01)');
      assert.ok(minutiSeduta(sd, minutes) <= minutes * 1.1 + 1e-9, id + ' ' + sd.titolo + ': ' + Math.round(minutiSeduta(sd, minutes)) + ' min stimati su ' + minutes + ' (DUR-01)');
      const lift = sd.esercizi.filter(e => e.alzata);
      assert.ok(lift.length >= 1 && lift.every(e => e.fisso), id + ': ogni seduta ha almeno una alzata fissa');
    });
    assert.ok(serieForza(p) >= SERIE_FORZA_MIN[level], id + ': ' + serieForza(p) + ' serie a 6 ripetizioni o meno sui multiarticolari (GOA-01)');
  }))));
});

test('FRZ-02: la struttura per giorni è quella scritta nella tabella (chi alzata in quale seduta e con quale onda)', () => {
  const a = app();
  /* 90 minuti, intermedio: nessun taglio per il tempo, si vede la tabella intera */
  const lista = (p) => p.sedute.map(sd => sd.esercizi.filter(e => e.alzata).map(e => e.alzata + ':' + e.onda).join(' '));
  assert.deepStrictEqual(lista(prog({ days: 3, minutes: 90 }, a)), ['squat:pesante panca:media', 'stacco:pesante panca:leggera', 'panca:pesante squat:leggera stacco:leggera']);
  assert.deepStrictEqual(lista(prog({ days: 4, minutes: 90 }, a)), ['squat:pesante stacco:leggera', 'panca:pesante', 'stacco:pesante squat:leggera', 'panca:media']);
  assert.deepStrictEqual(lista(prog({ days: 5, minutes: 90 }, a)), ['panca:pesante', 'squat:pesante stacco:leggera', 'panca:media', 'stacco:pesante squat:leggera', 'panca:leggera']);
  assert.deepStrictEqual(lista(prog({ days: 6, minutes: 90 }, a)), ['panca:pesante', 'squat:pesante stacco:leggera', 'panca:media', 'stacco:pesante', 'panca:leggera', 'squat:leggera']);
  assert.deepStrictEqual(prog({ days: 4 }, a).sedute.map(sd => sd.tipo), ['lower', 'upper', 'lower', 'upper']);
  assert.deepStrictEqual(prog({ days: 3 }, a).sedute.map(sd => sd.tipo), ['fullbody', 'fullbody', 'fullbody']);
  /* le tabelle rispettano la frequenza minima scritta nelle soglie (la stessa che il collaudo controlla) */
  const min = a.json('sogliaForza("frequenzaMinima")');
  [3, 4, 5, 6].forEach(g => ['squat', 'panca', 'stacco'].forEach(k => {
    const n = a.json('SPEC_FORZA.sedute[' + g + '].filter(r => r.some(x => x[0] === ' + JSON.stringify(k) + ' || (' + JSON.stringify(k) + ' === "stacco" && x[0] === "varStacco"))).length');
    assert.ok(n >= min[k], g + ' giorni: ' + k + ' in ' + n + ' sedute della tabella, minimo ' + min[k]);
  }));
});

test('FRZ-02: chi comincia: stessa prescrizione in ogni seduta, al massimo 4 sedute con la nota, stacco rumeno (lo stacco da terra è abilità 3), mai due volte lo stesso esercizio in tre sedute', () => {
  const a = app();
  [3, 4, 5, 6].forEach(days => {
    const p = costruisci(Object.assign({}, PL, { level: 'principiante', days, minutes: 60, seme: 'pr' + days }), a), id = 'principiante ' + days + ' giorni';
    assert.strictEqual(p.sedute.length, Math.min(days, 4), id);
    if (days >= 5) assert.ok(p.note.some(n => /bastano 4 sedute/.test(n)), id + ': la nota dei 4 giorni');
    assert.ok(sedutePer(p, 'squat') >= 2 && sedutePer(p, 'panca') >= 2 && sedutePer(p, 'stacco') >= 1, id);
    const lift = tuttiGliEsercizi(p).filter(e => e.alzata);
    assert.ok(lift.every(e => e.onda === undefined), id + ': nessuna onda per chi comincia');
    assert.ok(lift.every(e => e.sets <= 3 && e.reps === 5), id + ': 3 serie da 5 al massimo (serieMaxPrudente, ' + JSON.stringify(lift.map(e => e.sets + 'x' + e.reps)) + ')');
    assert.ok(!lift.some(e => /Stacco da Terra|Stacco in Deficit|Front Squat/.test(e.name)), id + ': nessun esercizio di abilità 3');
    assert.ok(lift.some(e => /Stacco Rumeno$/.test(pulito(e.name))), id + ': lo stacco è il rumeno');
    p.sedute.forEach(sd => assert.ok(!/pesante|medi[ao]|leggero|leggera/.test(sd.titolo), id + ': i titoli non dicono giorni pesanti o leggeri («' + sd.titolo + '»)'));
    assert.ok(p.note.some(n => /chi comincia non ha giorni pesanti e leggeri/.test(n)), id + ': la nota dice la verità sull\'onda');
    const conta = {}; tuttiGliEsercizi(p).forEach(e => { conta[e.name] = (p.sedute.filter(sd => sd.esercizi.some(x => x.name === e.name)).length); });
    Object.keys(conta).filter(n => /Panca|Squat|Stacco/.test(n)).forEach(n => assert.ok(conta[n] <= 2, id + ': ' + n + ' in ' + conta[n] + ' sedute (RID-02)'));
  });
});

/* ============================================================ FRZ-05: l'onda ============================================================ */
test('FRZ-05: pesante 4x3 (stacco 3x3), media 3x5, leggera 2x5: tutte a 6 ripetizioni o meno, la pausa dalla fascia della classe (pesante la più lunga, leggera la più corta); le non pesanti sono una variante con la sua storia di carichi', () => {
  const a = app();
  const p = prog({ days: 4, minutes: 90 }, a);
  const lift = tuttiGliEsercizi(p).filter(e => e.alzata);
  const W = a.json('sogliaForza("onda")');
  lift.forEach(e => {
    assert.ok(e.reps >= 3 && e.reps <= 6, e.name + ': ' + e.reps + ' ripetizioni (nessuna serie singola, nessun massimale: STD-02)');
    assert.strictEqual(e.reps, W[e.onda].ripetizioni, e.name);
    const attese = /Stacco da Terra|Stacco in Deficit/.test(e.name) ? Math.min(W[e.onda].serie, 3) : W[e.onda].serie;
    assert.strictEqual(e.sets, attese, e.name + ' (' + e.onda + ')');
    const lim = a.dati(a.chiama('limitiPausa', e.name, { obiettivo: 'forza', minimiDa: 'forza', reps: e.reps, donna: false, parq: false, over65: false }));
    assert.ok(e.rest >= lim.lo && e.rest <= lim.max, e.name + ': pausa ' + e.rest + ' nella fascia ' + lim.lo + '-' + lim.max);
    assert.strictEqual(e.fisso, true);
  });
  const pesanti = lift.filter(e => e.onda === 'pesante'), leggere = lift.filter(e => e.onda === 'leggera');
  assert.ok(pesanti.length >= 3 && leggere.length >= 1);
  assert.ok(Math.min.apply(null, pesanti.map(e => e.rest)) >= Math.max.apply(null, leggere.map(e => e.rest)), 'la pausa della pesante non è più corta di quella della leggera');
  /* la pesante è l'alzata di gara; le altre esposizioni sono varianti con un altro nome */
  assert.deepStrictEqual(pesanti.map(e => pulito(e.name)).sort(), ['Panca Piana Bilanciere', 'Squat con Bilanciere', 'Stacco da Terra (Deadlift)']);
  lift.filter(e => e.onda !== 'pesante').forEach(e => assert.ok(!/^(Squat con Bilanciere|Panca Piana Bilanciere|Stacco da Terra)/.test(pulito(e.name)), e.name + ' è una variante'));
  assert.deepStrictEqual(p.sedute.map(sd => sd.titolo), ['Squat pesante · Stacco leggero', 'Panca pesante', 'Stacco pesante · Squat leggero', 'Panca media']);
  /* il prima: lo stesso profilo senza la modalità non ha nessuna alzata fissa, nessuna onda, nessun titolo con il giorno */
  const prima = senza({ days: 4, minutes: 90 }, a);
  assert.ok(!tuttiGliEsercizi(prima).some(e => e.alzata || e.onda), 'senza la modalità nessun segno');
  assert.ok(!prima.sedute.some(sd => /pesante|leggero|leggera/.test(sd.titolo)));
});

test('FRZ-05: con la regola spenta niente onda né giorni nei titoli (la stessa prescrizione in ogni seduta, 3x5), ma la struttura per giorni resta', () => {
  const a = nuovaApp();
  a.g("COACH_REGOLE_PER_CODICE['FRZ-05'] = { codice: 'FRZ-05', spegnibile: true, sottoCoach: 'specialista' }");   /* il catalogo lo dice dopo l'integrazione (riga «(spegnibile)» della mappa) */
  a.spegni(['FRZ-05']);
  const p = prog({ days: 4, minutes: 90 }, a);
  assert.strictEqual(p.modalita, 'forza');
  assert.ok(tuttiGliEsercizi(p).filter(e => e.alzata).every(e => e.onda === undefined), 'nessuna onda');
  assert.ok(p.sedute.every(sd => !/pesante|medio|media|leggero|leggera/.test(sd.titolo)), p.sedute.map(sd => sd.titolo).join(' | '));
  assert.ok(p.note.indexOf(app().g('FORZA_NOTA_PIATTA')) !== -1 && !p.note.some(n => /giorni pesanti, medi e leggeri/.test(n)), 'la nota non parla di giorni pesanti se non ci sono');
  assert.ok(tuttiGliEsercizi(p).filter(e => e.alzata).every(e => e.sets <= 3 && e.reps === 5), 'stessa prescrizione');
  assert.ok(!(p.perche || []).some(x => x.codice === 'FRZ-05'));
  assert.ok(sedutePer(p, 'squat') >= 2 && sedutePer(p, 'panca') >= 2 && sedutePer(p, 'stacco') >= 1, 'la frequenza resta');
});

test('FRZ-02 spenta: il programma è quello di prima; FRZ-03 spenta: nessuna variante (l\'alzata intera in ogni esposizione); FRZ-04 spenta: nessun accessorio', () => {
  const a = nuovaApp();
  ['FRZ-02', 'FRZ-03', 'FRZ-04'].forEach(c => a.g("COACH_REGOLE_PER_CODICE['" + c + "'] = { codice: '" + c + "', spegnibile: true, sottoCoach: 'specialista' }"));
  a.spegni(['FRZ-02']);
  assert.deepStrictEqual(prog({ days: 4 }, a).sedute, senza({ days: 4 }, a).sedute, 'FRZ-02 spenta');
  a.spegni(['FRZ-03']);
  const v = prog({ days: 5, minutes: 90, puntiDeboli: ['panca-meta'] }, a);
  assert.ok(tuttiGliEsercizi(v).filter(e => e.alzata === 'panca').every(e => pulito(e.name) === 'Panca Piana Bilanciere'), 'FRZ-03 spenta: solo la panca di gara: ' + JSON.stringify(tuttiGliEsercizi(v).filter(e => e.alzata === 'panca').map(e => e.name)));
  assert.ok(!/cambia variante/.test(v.note.join(' | ')), 'la nota non parla di varianti');
  a.spegni(['FRZ-04']);
  assert.ok(!tuttiGliEsercizi(prog({ days: 5, minutes: 90, puntiDeboli: ['panca-meta'] }, a)).some(e => e.puntoDebole), 'FRZ-04 spenta');
});

/* ============================================================ FRZ-03 e FRZ-04: i punti deboli ============================================================ */
test('FRZ-03/04: «fermo a metà panca» → panca a presa stretta (esposizione media) e un esercizio per i tricipiti nella seduta pesante; «fermo in buca» → squat con pausa e un accessorio per gambe e glutei', () => {
  const a = app();
  const p = prog({ days: 5, minutes: 90, puntiDeboli: ['panca-meta', 'squat-buca'] }, a);
  const lift = tuttiGliEsercizi(p).filter(e => e.alzata);
  const nomiPanca = lift.filter(e => e.alzata === 'panca').map(e => e.onda + ':' + pulito(e.name));
  const media = lift.find(e => e.alzata === 'panca' && e.onda === 'media'), leggera = lift.find(e => e.alzata === 'panca' && e.onda === 'leggera');
  assert.strictEqual(pulito(media.name), 'Panca Presa Stretta', 'la variante del punto debole prende l\'esposizione più intensa: ' + JSON.stringify(nomiPanca));
  assert.strictEqual(pulito(leggera.name), 'Panca con Pausa');
  const squatLeggero = lift.find(e => e.alzata === 'squat' && e.onda === 'leggera');
  assert.strictEqual(pulito(squatLeggero.name), 'Squat con Pausa');
  /* l'accessorio: nella seduta della panca pesante, per i tricipiti */
  const sPanca = p.sedute.find(sd => sd.esercizi.some(e => e.alzata === 'panca' && e.onda === 'pesante'));
  const accTri = sPanca.esercizi.find(e => e.puntoDebole === 'panca-meta');
  assert.ok(accTri, 'un esercizio per il punto debole della panca nella seduta della panca pesante');
  assert.strictEqual(app().json('bersaglioDi(' + JSON.stringify(accTri.name) + ')'), 'tricipiti');
  assert.ok(accTri.sets >= 2 && accTri.sets <= 3, 'serie dell\'accessorio: ' + accTri.sets);
  const sSquat = p.sedute.find(sd => sd.esercizi.some(e => e.alzata === 'squat' && e.onda === 'pesante'));
  assert.ok(sSquat.esercizi.some(e => e.puntoDebole === 'squat-buca'), 'l\'accessorio dello squat nella seduta dello squat pesante');
  /* i perché con codice e forza dichiarata */
  const per = (c) => (p.perche || []).find(x => x.codice === c);
  assert.ok(per('FRZ-03') && per('FRZ-04') && per('FRZ-02') && per('FRZ-05') && per('STD-02'), JSON.stringify((p.perche || []).map(x => x.codice)));
  assert.strictEqual(per('FRZ-05').forza, 'Contrastata', 'l\'onda è «Contrastata»: lo dice');
  assert.strictEqual(per('FRZ-02').forza, 'Convenzione');
  assert.strictEqual(per('FRZ-02').sottoCoach, 'specialista');
  assert.strictEqual(per('STD-02').sottoCoach, 'regista');
  /* senza punto debole: niente FRZ-03 né FRZ-04 */
  const senzaPd = prog({ days: 5, minutes: 90 }, a);
  assert.ok(!(senzaPd.perche || []).some(x => x.codice === 'FRZ-03' || x.codice === 'FRZ-04'));
  assert.ok(!tuttiGliEsercizi(senzaPd).some(e => e.puntoDebole));
});

test('FRZ-03/04: tutte le chiavi di punto debole portano una variante e un accessorio ammessi; una chiave sconosciuta si ignora; al massimo due punti (uno per alzata)', () => {
  const a = app();
  const chiavi = Object.keys(a.json('SPEC_FORZA.varianti.punti'));
  assert.deepStrictEqual(chiavi.sort(), ['panca-chiusura', 'panca-meta', 'panca-petto', 'squat-buca', 'squat-uscita', 'stacco-chiusura', 'stacco-terra']);
  chiavi.forEach(k => {
    const p = prog({ days: 5, minutes: 90, puntiDeboli: [k], seme: 'pd' + k }, a);
    const punto = a.json('SPEC_FORZA.varianti.punti["' + k + '"]');
    assert.ok(tuttiGliEsercizi(p).some(e => e.alzata === punto.alzata && pulito(e.name) === punto.variante), k + ': la variante ' + punto.variante + ' è in scheda');
    assert.ok(tuttiGliEsercizi(p).some(e => e.puntoDebole === k), k + ': l\'accessorio è in scheda');
  });
  const x = prog({ days: 5, minutes: 90, puntiDeboli: ['non-esiste', 'panca-meta', 'panca-petto', 'squat-buca', 'stacco-terra'] }, a);
  const messi = [...new Set(tuttiGliEsercizi(x).filter(e => e.puntoDebole).map(e => e.puntoDebole))].sort();
  assert.deepStrictEqual(messi, ['panca-meta', 'squat-buca'], 'una voce per alzata, al massimo due, nell\'ordine in cui sono dette');
  const solaStringa = prog({ days: 5, minutes: 90, puntiDeboli: 'panca-meta' }, a);
  assert.ok(tuttiGliEsercizi(solaStringa).some(e => e.puntoDebole === 'panca-meta'), 'anche una voce sola, non in un elenco');
});

/* ============================================================ STD-02 ============================================================ */
test('STD-02: nessun test del massimale: il testo è in nota e nel Perché, nessuna serie singola, nessuna prova da 1RM; con la modalità non attiva il testo non c\'è', () => {
  const a = app();
  const TESTO = 'Non serve provare il massimale: il coach lo stima dalle serie che fai, con meno rischio.';
  ['principiante', 'intermedio', 'avanzato'].forEach(level => {
    const p = prog({ level, days: 4, seme: 'std' + level }, a);
    assert.ok(p.note.indexOf(TESTO) !== -1, level + ': la nota c\'è');
    assert.ok((p.perche || []).some(x => x.codice === 'STD-02' && x.testo === TESTO), level + ': il Perché c\'è');
    assert.ok(tuttiGliEsercizi(p).every(e => e.reps !== 1 && !/test|max/i.test(String(e.tecnica || ''))), level + ': nessuna serie singola né tecnica «test»');
  });
  assert.ok(senza({ days: 4 }, a).note.indexOf(TESTO) === -1, 'forza generale: nessun testo');
});

/* ============================================================ la sicurezza: la modalità non scavalca nessun vincolo ============================================================ */
/* tutto quello che toglie la modalità: lo stesso profilo con la forza di sempre, e una sola nota in più (all'inizio) che dice perché */
function cede(extra, notaAttesa, a) {
  a = a || app();
  const x = prog(extra, a), y = senza(extra, a);
  assert.deepStrictEqual(x.sedute, y.sedute, JSON.stringify(extra) + ': le sedute sono quelle della forza generale');
  assert.deepStrictEqual(x.split, y.split);
  assert.strictEqual(x.modalita, 'forza', 'la modalità era chiesta (il brief la porta)');
  assert.ok(!tuttiGliEsercizi(x).some(e => e.alzata || e.onda), JSON.stringify(extra) + ': nessun segno della modalità');
  if (notaAttesa) { assert.strictEqual(x.note[0], notaAttesa, JSON.stringify(extra) + ': la nota dice perché'); assert.deepStrictEqual(x.note.slice(1), y.note, 'il resto delle note è lo stesso'); }
  else assert.deepStrictEqual(x.note, y.note, 'nessuna nota in più');
  return x;
}
const NOTA = nome => app().g(nome);

test('sicurezza: minorenni (13-17), over 65 e PAR-Q positivo non hanno la modalità: forza generale con i loro limiti e una nota che lo dice', () => {
  [13, 16, 17].forEach(age => cede({ age, days: 4, seme: 'min' + age }, NOTA('FORZA_NOTA_PRUDENTE')));
  [65, 70, 82].forEach(age => cede({ age, days: 4, seme: 'old' + age }, NOTA('FORZA_NOTA_PRUDENTE')));
  cede({ parq: 'si', days: 4, seme: 'parq' }, NOTA('FORZA_NOTA_PRUDENTE'));
  cede({ parq: true, days: 3, seme: 'parq2' }, NOTA('FORZA_NOTA_PRUDENTE'));
  /* i limiti di sempre valgono: minorenni e over 65 mai più di 3 serie, 8-15 e 8-12 ripetizioni, nessuna tecnica al cedimento */
  const minore = prog({ age: 16, days: 4, seme: 'min16' }), vecchio = prog({ age: 70, days: 4, seme: 'old70' });
  const alCedimento = e => ['drop', 'myo', 'parziali', 'amrap', 'backoff', 'calibrazione', 'riposopausa'].indexOf(e.tecnica) !== -1;
  tuttiGliEsercizi(minore).forEach(e => assert.ok(e.sets <= 3 && !alCedimento(e), 'minorenne: ' + e.name + ' ' + e.sets + 'x' + e.reps));
  tuttiGliEsercizi(vecchio).forEach(e => assert.ok(e.sets <= 3 && !alCedimento(e) && (e.reps >= 8 || app().json('isTimeBased(' + JSON.stringify(e.name) + ')')), 'over 65: ' + e.name + ' ' + e.sets + 'x' + e.reps));
});

test('sicurezza: meno di 3 giorni, «ogni muscolo una volta a settimana», un periodo di vita con volume ridotto e un metodo scelto dall\'utente: la modalità cede', () => {
  cede({ days: 2, seme: 'g2' }, NOTA('FORZA_NOTA_GIORNI'));
  cede({ days: 4, freq: '1', seme: 'f1' }, NOTA('FORZA_NOTA_FREQUENZA'));
  /* un metodo scelto dall'utente ha la sua struttura e la sua nota: nessuna nota della modalità */
  const metodo = app().json('METODI.find(m => m.id === "gzclp") ? "gzclp" : METODI[0].id');
  const x = prog({ days: 4, metodo: metodo, seme: 'met' }), y = senza({ days: 4, metodo: metodo, seme: 'met' });
  assert.deepStrictEqual(x.sedute, y.sedute, 'metodo scelto: le sedute sono quelle del metodo');
  assert.deepStrictEqual(x.note, y.note, 'nessuna nota della modalità: il metodo ha la sua');
  /* un periodo di vita che riduce il volume (profilo salvato) */
  const a = nuovaApp();
  const finoA = a.ymd(a.ora() + 20 * 86400000);
  a.profilo({ level: 'intermedio', goals: ['forza'], momento: { id: 'stress', dal: a.ymd(), fino: finoA } });
  cede({ days: 4, seme: 'mom' }, NOTA('FORZA_NOTA_MOMENTO'), a);
  /* scaduto: la modalità torna */
  a.profilo({ level: 'intermedio', goals: ['forza'], momento: { id: 'stress', dal: a.ymd(a.ora() - 40 * 86400000), fino: a.ymd(a.ora() - 10 * 86400000) } });
  assert.ok(tuttiGliEsercizi(prog({ days: 4, seme: 'mom2' }, a)).some(e => e.alzata), 'con il periodo scaduto la modalità c\'è');
});

test('sicurezza: fastidi (spalle, ginocchia, schiena) e attrezzatura senza bilanciere (casa con manubri, corpo libero, palestra con elenco senza bilanciere): nessuna alzata viene aggirata, forza generale con la sua nota', () => {
  [['spalle'], ['ginocchia'], ['schiena'], ['spalle', 'schiena']].forEach(f => cede({ fastidi: f, days: 4, seme: 'fa' + f.join('') }, NOTA('FORZA_NOTA_FASTIDIO')));
  [{ luogo: 'manubri' }, { luogo: 'corpo' }, { attrezziPalestra: ['macchine', 'manubri'] }].forEach(x => cede(Object.assign({ days: 4, seme: 'at' + JSON.stringify(x).length }, x), NOTA('FORZA_NOTA_ATTREZZI')));
  /* con un elenco della palestra che ha il bilanciere la modalità c'è */
  assert.ok(tuttiGliEsercizi(prog({ days: 4, attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'], seme: 'elenco' })).some(e => e.alzata));
});

test('sicurezza: ogni esercizio di un programma Forza è ammesso per quella persona (consentito, fastidio, esclusi della Sentinella, abilità per chi comincia, tetto di serie)', () => {
  const a = app();
  const profili = [];
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 4, 5, 6].forEach(days => ['bene', 'male'].forEach(sonno => [30, 60].forEach(minutes => profili.push({ level, days, sonno, minutes, sex: sonno === 'male' ? 'F' : 'M', seme: 'sic|' + level + days + sonno + minutes })))));
  profili.forEach(extra => {
    const p = prog(extra, a), id = JSON.stringify(extra);
    tuttiGliEsercizi(p).forEach(e => {
      assert.strictEqual(a.json('consentito(' + JSON.stringify(e.name) + ', ' + JSON.stringify(p.prefs) + ')'), true, id + ': ' + e.name + ' deve essere consentito');
      if (extra.level === 'principiante') {
        assert.ok(e.sets <= 3, id + ': ' + e.name + ' ' + e.sets + ' serie (serieMaxEsercizio dei principianti)');
        assert.ok(!e.tecnica, id + ': nessuna tecnica al cedimento a chi comincia');
        /* l'abilità 3 la guarda la modalità sulle sue alzate (la ricetta di sempre ne ha ancora, collaudo SAF-05) */
        if (e.alzata || e.puntoDebole) assert.ok(!(a.json('(function (n) { const x = attributi(n); return x ? x.abilita : 0; })(' + JSON.stringify(e.name) + ')') >= 3), id + ': ' + e.name + ' ha abilità 3');
      }
    });
  });
  /* poco sonno: una serie in meno sulle alzate (come il resto della scheda), mai sotto le 2 serie */
  const bene = prog({ days: 4, minutes: 90, sonno: 'bene', seme: 'sonno' }, a), male = prog({ days: 4, minutes: 90, sonno: 'male', seme: 'sonno' }, a);
  const serie = p => tuttiGliEsercizi(p).filter(e => e.alzata).map(e => e.sets);
  assert.ok(serie(male).every((s, i) => s === Math.max(2, serie(bene)[i] - 1)), JSON.stringify(serie(bene)) + ' contro ' + JSON.stringify(serie(male)));
});

test('sicurezza: la prontezza e il dolore agiscono sulle alzate della modalità come su ogni altro esercizio (nome per nome: nessuna alzata «fissa» sfugge)', () => {
  const a = nuovaApp();
  const p = prog({ days: 4, seme: 'pront' }, a);
  const lunedi = p.sedute[0];
  const nomi = lunedi.esercizi.filter(e => e.alzata).map(e => e.name);
  assert.ok(nomi.length >= 1);
  /* prontezza bassa: il piano di oggi (lunedì) con le alzate; i multiarticolari con carico scendono del 10% (PRZ-02) */
  a.g("(function (piano) { const o = {}; Object.keys(piano).forEach(g => { o[g] = piano[g].map(e => normalizeExerciseRecord(Object.assign({}, e, { completedSets: [] }))); }); saveData(o); })")({ 'Lunedì': lunedi.esercizi.map(e => Object.assign({}, e, { weight: 100 })) });
  a.g("currentDay = 'Lunedì'");
  const zero = {}; a.json('PRONTEZZA_VOCI.map(v => v[0])').forEach(k => { zero[k] = 0; });
  a.chiama('applicaProntezza', zero);
  const dopo = a.json("loadData()['Lunedì']");
  nomi.forEach(n => { const e = dopo.find(x => x.name === n); assert.ok(e.weight < 100 && e.coachTipo === 'giu', n + ': ' + e.weight); });
  /* dolore: l'aggiustamento del coach su una alzata abbassa il carico e il tipo è «giu», mai un aumento */
  a.aggiusti({ esercizi: { [nomi[0]]: { fattore: 0.9, sedute: 2, motivo: 'dolore' } }, scarico: null });
  const r = a.dati(a.chiama('caricoProssimo', nomi[0], 100, 3, 4));
  assert.ok(r.weight <= 90 && r.tipo === 'giu', JSON.stringify(r));
});

/* ============================================================ riproducibilità, persistenza, frasi ============================================================ */
test('REG-05: stesso seme, stesso programma (con la modalità); il programma salvato porta la modalità e i segni delle alzate (le legge W3-T6)', () => {
  const a = app();
  assert.deepStrictEqual(prog({ days: 5, seme: 'rip' }, a), prog({ days: 5, seme: 'rip' }, a));
  const p = prog({ days: 4, seme: 'rip2' }, a);
  assert.strictEqual(p.modalita, 'forza');
  assert.ok(tuttiGliEsercizi(p).filter(e => e.alzata).every(e => ['squat', 'panca', 'stacco'].indexOf(e.alzata) !== -1));
  /* un esercizio del programma passa per normalizeExerciseRecord (il piano salvato) senza perdere i segni */
  const rec = a.dati(a.chiama('normalizeExerciseRecord', Object.assign({}, tuttiGliEsercizi(p).find(e => e.alzata), { completedSets: [] })));
  assert.ok(rec.alzata && rec.onda && rec.fisso === true);
});

test('le frasi nuove sono tradotte in en, es e de (nel manifesto di integrazione o già nei dizionari) e i titoli dei giorni sono solo quelli tradotti', () => {
  const a = app();
  const sorgente = fs.readFileSync(path.join(R, 'js/coach/specialita/forza.js'), 'utf8');
  const frasi = [...sorgente.matchAll(/^const (FORZA_(?:NOTA|PERCHE)_[A-Z_]+) = /gm)].map(m => a.g(m[1]));
  const titoli = a.json('(function () { const o = []; ["squat", "panca", "stacco"].forEach(k => { const t = FORZA_TITOLO[k]; o.push(t.nome); ["pesante", "media", "leggera"].forEach(w => o.push(t.nome + " " + FORZA_AGGETTIVO[t.f ? "f" : "m"][w])); }); return o; })()');
  const nomi = a.json('Object.keys(SPEC_FORZA.split).map(k => SPEC_FORZA.split[k].nome)');
  const manifesto = path.join(R, 'docs/in-arrivo/W2-T7.json');
  const frasiManifesto = fs.existsSync(manifesto) ? JSON.parse(fs.readFileSync(manifesto, 'utf8')).frasi || {} : {};
  const chiave = t => t.replace(/\d+(?:[.,]\d+)*/g, '#');
  frasi.concat(titoli, nomi).forEach(t => {
    const k = chiave(t), m = frasiManifesto[k];
    const dizionari = ['en', 'es', 'de'].every(l => a.json('typeof I18N === "object" && Object.prototype.hasOwnProperty.call(I18N.' + l + ', ' + JSON.stringify(k) + ')'));
    assert.ok(dizionari || (m && m.en && m.es && m.de), 'frase senza traduzione in en, es e de: ' + t);
  });
  /* i titoli prodotti da una griglia di programmi sono solo pezzi tradotti */
  const noti = new Set(titoli.concat(['Squat', 'Panca', 'Stacco']));
  const visti = new Set();
  [3, 4, 5, 6].forEach(days => ['principiante', 'intermedio', 'avanzato'].forEach(level => [45, 90].forEach(minutes => prog({ days, level, minutes, seme: 'tit' + days + level }, a).sedute.forEach(sd => sd.titolo.split(' · ').forEach(pz => visti.add(pz))))));
  visti.forEach(pz => assert.ok(noti.has(pz), 'titolo non previsto: «' + pz + '»'));
});

test('la modalità non cambia nessun altro programma: la griglia dei profili senza «powerlifting» (obiettivi, livelli, età, fastidi) ha le stesse sedute con e senza i due file nuovi', () => {
  const con = app(), senzaFile = caricaApp({ ora: ORA });   /* il contesto di index.html di oggi */
  const profili = [];
  ['massa', 'forza', 'dimagrimento', 'salute', 'glutei'].forEach(g => ['principiante', 'intermedio', 'avanzato'].forEach((level, i) => [2, 3, 5].forEach(days => profili.push({ goals: [g], level, days, minutes: 60, luogo: ['palestra', 'manubri', 'corpo'][i], fastidi: i === 1 ? ['spalle'] : [], sex: i === 0 ? 'F' : 'M', age: [16, 30, 70][i], parq: 'no', usaProfilo: false, seme: 'gr' + g + level + days }))));
  profili.forEach(d => assert.deepStrictEqual(con.dati(con.chiama('buildProgram', d)), senzaFile.dati(senzaFile.chiama('buildProgram', d)), JSON.stringify(d)));
});
