/* Muscolo bersaglio e "Macchinario occupato": le alternative allenano lo STESSO muscolo.
   Esegue il codice vero dell app in node (vm), senza browser. Lancio: npm test */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');

/* carica in un contesto isolato solo gli script che servono, con un document finto */
function carica() {
  const nulla = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : nulla, apply: () => nulla, construct: () => nulla });
  const store = {};
  const ctx = { console, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {}, document: nulla,
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    navigator: { userAgent: 'node', language: 'it' }, location: { href: '', search: '', hash: '' } };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  ['js/lingue/traduttore.js', 'js/dati/libreria-esercizi.js', 'js/dati/dettagli-esercizi.js', 'js/coach/questionario-decisioni.js',
    'js/coach/programma/motore.js', 'js/coach/programma/schemi.js', 'js/coach/programma/ricette.js', 'js/ui/allenamento/macchinario-occupato.js']
    .forEach(f => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f }));
  /* palestra completa, nessun fastidio: senza consenso ai dati il coach non legge il profilo */
  ctx.coachAttivo = () => false; ctx.getProfile = () => null;
  return ctx;
}
const c = carica();
const g = nome => vm.runInContext(nome, c);
const LIB = g('EXERCISE_LIBRARY'), DETTAGLI = g('DETTAGLI'), MUSCOLI = g('MUSCOLI'), SOTTOGRUPPI = g('SOTTOGRUPPI'), MUSCLE_GROUPS = g('MUSCLE_GROUPS');
const pulito = n => g('senzaEmoji')(n);
const nomeLib = p => LIB.find(e => pulito(e.name) === p).name;
const bersaglio = n => g('bersaglioDi')(n);
/* alternative di "Macchinario occupato" con la seduta fatta del solo esercizio */
const alt = (p, seduta) => { const n = nomeLib(p); return [...g('alternativeOggi')({ name: n }, [{ name: n }].concat((seduta || []).map(s => ({ name: nomeLib(s) }))))].map(a => pulito(a.ex.name)); };

test('ogni esercizio della libreria ha un muscolo bersaglio valido', () => {
  assert.strictEqual(LIB.length, 139);
  LIB.forEach(e => {
    const b = bersaglio(e.name);
    assert.ok(b && MUSCOLI[b], 'senza bersaglio: ' + e.name);
    g('dettaglioEsercizio')(e.name).secondari.forEach(s => assert.ok(MUSCOLI[s], e.name + ': secondario sconosciuto ' + s));
  });
  Object.keys(MUSCOLI).forEach(id => {
    assert.ok(MUSCLE_GROUPS[MUSCOLI[id].gruppo], id + ': gruppo sconosciuto');
    assert.ok(SOTTOGRUPPI[MUSCOLI[id].gruppo].indexOf(MUSCOLI[id].sub) !== -1, id + ': sottogruppo sconosciuto');
  });
});

test('il bersaglio viene da DETTAGLI: sottogruppo di un muscolo solo, altrimenti il primo muscolo del focus', () => {
  const misti = ['Multiarticolari', 'Spinte', 'Aperture e isolamento', 'Glutei e femorali'];
  const eccezioni = ['Hammer Curl', 'Curl ai Cavi con Corda (Presa Martello)'];   /* focus brachiale e brachioradiale, sottogruppo Bicipiti */
  const primo = { quadricipiti: /^quadricipiti/i, grande_gluteo: /^grande gluteo/i, femorali: /^femorali/i, deltoide_anteriore: /^deltoide anteriore/i,
    petto_alto: /^gran pettorale \(fasci alti\)/i, petto_basso: /^gran pettorale \(fasci bassi\)/i, petto_medio: /^gran pettorale(?! \(fasci)/i };
  Object.keys(DETTAGLI).forEach(nome => {
    const r = DETTAGLI[nome], b = r[7];
    if (eccezioni.indexOf(nome) !== -1) { assert.strictEqual(b, 'brachioradiale'); return; }
    if (misti.indexOf(r[3]) !== -1) assert.ok(primo[b] && primo[b].test(r[4]), nome + ': ' + b + ' non e il primo muscolo del focus «' + r[4] + '»');
    else assert.strictEqual(MUSCOLI[b].sub, r[3], nome + ': ' + b + ' non corrisponde al sottogruppo ' + r[3]);
  });
});

test('Macchinario occupato: per ogni esercizio ogni alternativa ha lo stesso muscolo bersaglio', () => {
  let coppie = 0;
  LIB.forEach(e => {
    const a = g('alternativeOggi')({ name: e.name }, [{ name: e.name }]);
    assert.ok(a.length <= 6, e.name + ': piu di 6 alternative');
    a.forEach(x => {
      coppie++;
      assert.notStrictEqual(x.ex.name, e.name);
      assert.strictEqual(bersaglio(x.ex.name), bersaglio(e.name), pulito(e.name) + ' -> ' + pulito(x.ex.name));
    });
  });
  assert.ok(coppie > 500, 'troppe poche alternative in tutto: ' + coppie);
});

test('adduttori e abduttori non si scambiano', () => {
  assert.deepStrictEqual(alt('Abductor Machine').sort(), ['Abduzioni ai Cavi', 'Slanci Laterali a Terra']);
  assert.ok(alt('Slanci Laterali a Terra').indexOf('Abductor Machine') !== -1);
  /* nel catalogo non c e lo squat sumo: per l Adductor Machine nessuna alternativa, piuttosto che un altro muscolo */
  assert.deepStrictEqual(alt('Adductor Machine'), []);
  ['Abductor Machine', 'Slanci Laterali a Terra', 'Abduzioni ai Cavi'].forEach(n => assert.ok(alt(n).every(x => bersaglio(nomeLib(x)) === 'abduttori'), n));
});

test('calf raise: solo polpacci', () => {
  ['Calf Raise in Piedi', 'Calf Raise Seduto', 'Calf Raise alla Leg Press', 'Calf Raise a un Piede (Corpo Libero)'].forEach(n => {
    const a = alt(n);
    assert.strictEqual(a.length, 3, n);
    assert.ok(a.every(x => /^Calf Raise/.test(x)), n + ': ' + a.join(', '));
  });
});

test('scrollate: niente alzate laterali (il trapezio superiore non ha altri esercizi)', () => {
  assert.deepStrictEqual(alt('Scrollate (Shrug)'), []);
});

test('crunch: addominali, mai Bird Dog o esercizi di stabilita', () => {
  ['Crunch a Terra', 'Crunch al Cavo', 'Crunch alla Macchina'].forEach(n => {
    const a = alt(n);
    assert.ok(a.length >= 3, n);
    assert.ok(a.indexOf('Bird Dog') === -1 && a.indexOf('Plank') === -1 && a.indexOf('Dead Bug') === -1, n + ': ' + a.join(', '));
  });
  assert.ok(alt('Bird Dog').every(x => bersaglio(nomeLib(x)) === 'stabilita'));
});

test('bicipiti e tricipiti non si scambiano', () => {
  const tric = /pushdown|french|tricipiti|kickback|dip|diamante|presa stretta/i;
  ['Curl Bilanciere Bicipiti', 'Curl Manubri Alternato', 'Curl ai Cavi', 'Curl su Panca Scott', 'Hammer Curl'].forEach(n => {
    const a = alt(n);
    assert.ok(a.length >= 2 && !a.some(x => tric.test(x)), n + ': ' + a.join(', '));
  });
  ['Pushdown Tricipiti ai Cavi', 'French Press', 'Panca Presa Stretta', 'Kickback Tricipiti'].forEach(n => {
    const a = alt(n);
    assert.ok(a.length >= 3 && !a.some(x => /curl/i.test(x)), n + ': ' + a.join(', '));
  });
});

test('restano i filtri: esercizi gia in seduta, attrezzi della palestra, fastidi', () => {
  assert.ok(alt('Curl Bilanciere Bicipiti', ['Curl ai Cavi']).indexOf('Curl ai Cavi') === -1);
  c.coachAttivo = () => true;
  try {
    c.getProfile = () => ({ luogo: 'palestra', attrezziPalestra: ['manubri'], fastidi: [] });
    const m = alt('Panca Piana Bilanciere');
    assert.ok(m.length > 0 && m.every(x => ['manubri', 'corpo'].indexOf(g('attrezzoDi')(x)) !== -1), m.join(', '));
    c.getProfile = () => ({ luogo: 'palestra', attrezziPalestra: null, fastidi: ['spalle'] });
    assert.ok(!alt('Shoulder Press Machine').some(x => /military|lento avanti|arnold/i.test(x)));
  } finally { c.coachAttivo = () => false; c.getProfile = () => null; }
});

test('schemi di movimento: niente falsi multiarticolari', () => {
  const s = g('schemaDi'), iso = g('isolamentoDi');
  assert.strictEqual(s('🦵 Calf Raise alla Leg Press'), null);
  assert.strictEqual(s('🦵 Sissy Squat'), null);
  assert.strictEqual(s('💪 Piegamenti Inclinati (Mani Rialzate)'), 'spintaO');
  assert.strictEqual(s('🛡️ Alzate Laterali'), null);
  assert.strictEqual(s('🦵 Leg Press'), 'squat');
  assert.strictEqual(s('🦵 Squat con Bilanciere'), 'squat');
  assert.strictEqual(iso('🦵 Nordic Curl'), 'femorali');
});
