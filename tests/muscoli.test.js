/* Muscolo bersaglio, "Macchinario occupato", "Esercizi alternativi" e sostituto: tutti allenano lo STESSO muscolo
   (i multiarticolari totali, come lo stacco da terra, la stessa famiglia: MULTIARTICOLARI_TOTALI).
   Esegue il codice vero dell app in node (vm), senza browser. Lancio: npm test
   In fondo (W0-T6, dati degli esercizi): hinge, Stacco con Trap Bar, squat e leg press, Pullover con Manubrio, allungamento
   (B15, B16, SEL-02, P10, P12, D-P8, D-P11). */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');
const { caricaApp } = require('./aiuto-app');   /* l app intera (buildProgram): solo per le prove di W0-T6 in fondo */

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
    'js/coach/programma/motore.js', 'js/coach/programma/schemi.js', 'js/coach/programma/ricette.js', 'js/coach/programma/alternative.js', 'js/ui/allenamento/macchinario-occupato.js']
    .forEach(f => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f }));
  /* palestra completa, nessun fastidio: senza consenso ai dati il coach non legge il profilo */
  ctx.coachAttivo = () => false; ctx.getProfile = () => null; ctx.regolaAttiva = () => true;   /* regolaAttiva e di coach/parametri.js */
  return ctx;
}
const c = carica();
const g = nome => vm.runInContext(nome, c);
const LIB = g('EXERCISE_LIBRARY'), DETTAGLI = g('DETTAGLI'), MUSCOLI = g('MUSCOLI'), SOTTOGRUPPI = g('SOTTOGRUPPI'), MUSCLE_GROUPS = g('MUSCLE_GROUPS');
const pulito = n => g('senzaEmoji')(n);
const nomeLib = p => LIB.find(e => pulito(e.name) === p).name;
const bersaglio = n => g('bersaglioDi')(n);
const famiglia = n => g('famigliaTotaleDi')(n);
/* x e un alternativa giusta per e: stessa famiglia se e e un multiarticolare totale, altrimenti lo stesso muscolo bersaglio */
const stessoLavoro = (e, x) => famiglia(e) ? famiglia(x) === famiglia(e) : bersaglio(x) === bersaglio(e);
/* alternative di "Macchinario occupato" con la seduta fatta del solo esercizio */
const alt = (p, seduta) => { const n = nomeLib(p); return [...g('alternativeOggi')({ name: n }, [{ name: n }].concat((seduta || []).map(s => ({ name: nomeLib(s) }))))].map(a => pulito(a.ex.name)); };

test('ogni esercizio della libreria ha un muscolo bersaglio valido', () => {
  assert.strictEqual(LIB.length, 169);   /* 140 + i 29 di W1-T5 */
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
  const primo = { quadricipiti: /^quadricipiti/i, grande_gluteo: /^grande gluteo/i, femorali: /^femorali/i, deltoide_anteriore: /^deltoide anteriore/i, erettori: /^erettori spinali/i,
    petto_alto: /^gran pettorale \(fasci alti\)/i, petto_basso: /^gran pettorale \(fasci bassi\)/i, petto_medio: /^gran pettorale(?! \(fasci)/i };
  Object.keys(DETTAGLI).forEach(nome => {
    const r = DETTAGLI[nome], b = r[7];
    if (eccezioni.indexOf(nome) !== -1) { assert.strictEqual(b, 'brachioradiale'); return; }
    if (misti.indexOf(r[3]) !== -1) assert.ok(primo[b] && primo[b].test(r[4]), nome + ': ' + b + ' non e il primo muscolo del focus «' + r[4] + '»');
    else assert.strictEqual(MUSCOLI[b].sub, r[3], nome + ': ' + b + ' non corrisponde al sottogruppo ' + r[3]);
  });
});

test('Macchinario occupato: per ogni esercizio ogni alternativa ha lo stesso muscolo bersaglio (o la stessa famiglia totale)', () => {
  let coppie = 0;
  LIB.forEach(e => {
    const a = g('alternativeOggi')({ name: e.name }, [{ name: e.name }]);
    assert.ok(a.length <= 6, e.name + ': piu di 6 alternative');
    a.forEach(x => {
      coppie++;
      assert.notStrictEqual(x.ex.name, e.name);
      /* un muscolo solo: sempre lo stesso bersaglio, mai allentato */
      if (!famiglia(e.name)) assert.strictEqual(bersaglio(x.ex.name), bersaglio(e.name), pulito(e.name) + ' -> ' + pulito(x.ex.name));
      else assert.strictEqual(famiglia(x.ex.name), famiglia(e.name), pulito(e.name) + ' -> ' + pulito(x.ex.name));
    });
  });
  assert.ok(coppie > 500, 'troppe poche alternative in tutto: ' + coppie);
});

test('adduttori e abduttori non si scambiano', () => {
  assert.deepStrictEqual(alt('Abductor Machine').sort(), ['Abduzioni ai Cavi', 'Slanci Laterali a Terra']);
  assert.ok(alt('Slanci Laterali a Terra').indexOf('Abductor Machine') !== -1);
  /* adduttori: Adductor Machine, Squat Sumo e (W1-T5) Cossack Squat e Copenhagen Plank, ognuno alternativa degli altri (mai l Abductor Machine) */
  const ADDUTTORI = ['Adductor Machine', 'Copenhagen Plank', 'Cossack Squat', 'Squat Sumo'];
  ADDUTTORI.forEach(n => assert.deepStrictEqual(alt(n).sort(), ADDUTTORI.filter(x => x !== n), n));
  ['Abductor Machine', 'Slanci Laterali a Terra', 'Abduzioni ai Cavi'].forEach(n => assert.ok(alt(n).every(x => bersaglio(nomeLib(x)) === 'abduttori'), n));
});

test('Squat Sumo: adduttori, a manubri, nella libreria e nei suoi collegamenti', () => {
  const n = nomeLib('Squat Sumo'), d = g('dettaglioEsercizio')(n);
  assert.strictEqual(bersaglio(n), 'adduttori');
  assert.deepStrictEqual([...d.secondari].sort(), ['grande_gluteo', 'quadricipiti']);
  assert.strictEqual(d.sub, 'Adduttori');
  assert.strictEqual(famiglia(n), '');
  assert.strictEqual(g('attrezzoDi')('Squat Sumo'), 'manubri');
  assert.strictEqual(g('schemaDi')(n), 'squat');
  /* e un accessorio per gli adduttori: non prende il posto del fondamentale delle gambe */
  assert.strictEqual(g('SLOT_DEF').squat(LIB.find(e => e.name === n)), false);
  /* dal Macchinario occupato all Adductor Machine e ritorno; il sostituto pure: sempre un esercizio degli adduttori (con W1-T5 anche Cossack Squat e Copenhagen Plank) */
  assert.strictEqual(pulito(g('sostituto')(n, PREFS(), []).name), 'Cossack Squat', 'stesso movimento (squat) e stesso tipo (multiarticolare) prima di tutto');
  assert.ok(['Adductor Machine', 'Copenhagen Plank', 'Cossack Squat'].indexOf(pulito(g('sostituto')(nomeLib('Adductor Machine'), PREFS(), []).name)) !== -1);
  /* ginocchia delicate: niente squat sumo */
  assert.ok(!g('consentito')(n, Object.assign(PREFS(), { fastidi: ['ginocchia'] })));
});

test('multiarticolari totali: lo stacco da terra si scambia con chi allena tutta la catena posteriore e le gambe', () => {
  const FAM = g('MULTIARTICOLARI_TOTALI');
  const membri = [];
  Object.keys(FAM).forEach(id => {
    FAM[id].muscoli.forEach(mu => assert.ok(MUSCOLI[mu], id + ': muscolo sconosciuto ' + mu));
    FAM[id].esercizi.forEach(nome => {
      assert.ok(nomeLib(nome) && DETTAGLI[nome], id + ': ' + nome + ' non e nella libreria');
      assert.ok(membri.indexOf(nome) === -1, nome + ' in due famiglie');
      membri.push(nome);
      /* ogni esercizio della famiglia allena tutto l insieme (bersaglio o secondari) */
      const tutti = [bersaglio(nome)].concat(g('dettaglioEsercizio')(nome).secondari);
      FAM[id].muscoli.forEach(mu => assert.ok(tutti.indexOf(mu) !== -1, nome + ' non allena ' + mu));
    });
  });
  /* le alternative proposte (da confermare): gli altri stacchi da terra, mai un esercizio di un muscolo solo */
  const STACCHI = ['Stacco da Terra (Deadlift)', 'Stacco con Trap Bar', 'Stacco Sumo', 'Stacco in Deficit'];   /* W1-T5: lo stacco in deficit e la stessa famiglia */
  const tot = {};
  STACCHI.forEach(n => { tot[n] = STACCHI.filter(x => x !== n); });
  Object.keys(tot).forEach(n => {
    assert.strictEqual(famiglia(nomeLib(n)), 'catena_totale', n);
    assert.deepStrictEqual(alt(n).sort(), tot[n].slice().sort(), n);
    assert.deepStrictEqual([...g('alternativeDi')(nomeLib(n), PREFS(), [])].map(x => pulito(x.name)).sort(), tot[n].slice().sort(), n);
    assert.ok(tot[n].indexOf(pulito(g('sostituto')(nomeLib(n), PREFS(), []).name)) !== -1, n + ': sostituto');
  });
  /* fuori dalla famiglia: catena posteriore senza quadricipiti (o senza femorali per squat e affondi) */
  ['Stacco Rumeno', 'Good Morning', 'Hyperextension (Lombari)', 'Squat con Bilanciere', 'Leg Press', 'Affondi in Camminata', 'Affondi Bulgari', 'Hip Thrust',
    'Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Kettlebell Swing', 'Hip Thrust con Manubrio'].forEach(n => assert.strictEqual(famiglia(nomeLib(n)), '', n));
  /* stacco rumeno e good morning restano distinti: non sono alternative l uno dell altro */
  assert.ok(alt('Stacco Rumeno').indexOf('Good Morning') === -1 && alt('Good Morning').indexOf('Stacco Rumeno') === -1);
  /* un muscolo solo resta sul suo bersaglio: l Hyperextension (lombari) propone ancora lo stacco da terra e quello con la trap bar (bersaglio erettori), che allenano anche i lombari */
  assert.deepStrictEqual(alt('Hyperextension (Lombari)').sort(), ['Stacco con Trap Bar', 'Stacco da Terra (Deadlift)', 'Stacco in Deficit']);
  /* schiena delicata: tutti gli stacchi sono a rischio, nessun sostituto (lo stacco resta dov e) */
  assert.strictEqual(g('sostituto')(nomeLib('Stacco da Terra (Deadlift)'), Object.assign(PREFS(), { fastidi: ['schiena'] }), []), null);
  /* nella tendina: «Stesso lavoro», non un muscolo solo */
  assert.strictEqual(g('lavoroDaSostituire')(nomeLib('Stacco da Terra (Deadlift)')).totale, true);
  assert.strictEqual(g('lavoroDaSostituire')(nomeLib('Squat Sumo')).nome, MUSCOLI.adduttori.nome);
});

test('scelte confermate: bersagli che non cambiano', () => {
  ['Affondi Bulgari', 'Affondi al Multipower (Piede Rialzato)'].forEach(n => assert.strictEqual(bersaglio(n), 'grande_gluteo', n));
  ['Hammer Curl', 'Curl ai Cavi con Corda (Presa Martello)'].forEach(n => assert.strictEqual(DETTAGLI[n][3], 'Bicipiti', n));
  assert.strictEqual(bersaglio('Stacco Rumeno'), 'grande_gluteo');
  assert.strictEqual(bersaglio('Good Morning'), 'femorali');
});

test('calf raise: solo polpacci (il tibialis raise non e un calf raise: bersaglio tibiale)', () => {
  ['Calf Raise in Piedi', 'Calf Raise Seduto', 'Calf Raise alla Leg Press', 'Calf Raise a un Piede (Corpo Libero)', 'Calf Raise con Manubrio sul Gradino'].forEach(n => {
    const a = alt(n);
    assert.strictEqual(a.length, 4, n);
    assert.ok(a.every(x => /^Calf Raise/.test(x)), n + ': ' + a.join(', '));
  });
});

test('scrollate: niente alzate laterali (il trapezio superiore ha solo le due scrollate: col bilanciere e coi manubri, P13)', () => {
  assert.deepStrictEqual(alt('Scrollate (Shrug)'), ['Scrollate con Manubri']);
  assert.deepStrictEqual(alt('Scrollate con Manubri'), ['Scrollate (Shrug)']);
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

/* palestra completa, nessun fastidio, seduta vuota */
const PREFS = () => ({ luogo: 'palestra', fastidi: [], attrezziPalestra: null, graditi: [], odiati: [], attrezzi: 'indifferente' });

test('Esercizi alternativi (alternativeDi): per tutti gli esercizi solo lo stesso muscolo bersaglio (o la stessa famiglia totale), al massimo 6', () => {
  let coppie = 0, senza = [];
  LIB.forEach(e => {
    const a = g('alternativeDi')(e.name, PREFS(), []);
    assert.ok(a.length <= 6, e.name + ': piu di 6 alternative');
    if (!a.length) senza.push(pulito(e.name));
    a.forEach(x => {
      coppie++;
      assert.notStrictEqual(x.name, e.name);
      assert.ok(stessoLavoro(e.name, x.name), pulito(e.name) + ' -> ' + pulito(x.name));
      if (!famiglia(e.name)) assert.strictEqual(bersaglio(x.name), bersaglio(e.name), pulito(e.name) + ' -> ' + pulito(x.name));
    });
    /* e lo stesso elenco che propone Macchinario occupato senza il vincolo dell attrezzo diverso */
    assert.deepStrictEqual(a.map(x => x.name), g('alternativeStessoMuscolo')(e.name, PREFS(), []).map(x => x.ex.name));
  });
  assert.ok(coppie > 800, 'troppe poche alternative in tutto: ' + coppie);
  /* mai un altro muscolo, anche se restano meno scelte: gli unici senza alternativa */
  assert.deepStrictEqual(senza.sort(), ['Tibialis Raise']);   /* il tibiale anteriore ha un solo esercizio (W1-T5); le scrollate ora sono due */
});

test('Esercizi alternativi: restano i filtri (gia in seduta, attrezzi, fastidi, odiati)', () => {
  const curl = nomeLib('Curl Bilanciere Bicipiti'), cavi = nomeLib('Curl ai Cavi');
  assert.ok(g('alternativeDi')(curl, PREFS(), []).some(x => x.name === cavi));
  assert.ok(!g('alternativeDi')(curl, PREFS(), [{ name: cavi }]).some(x => x.name === cavi));
  const solo = Object.assign(PREFS(), { attrezziPalestra: ['manubri'] });
  const m = g('alternativeDi')(nomeLib('Panca Piana Bilanciere'), solo, []);
  assert.ok(m.length > 0 && m.every(x => ['manubri', 'corpo'].indexOf(g('attrezzoDi')(x.name)) !== -1 && bersaglio(x.name) === 'petto_medio'));
  const spalle = Object.assign(PREFS(), { fastidi: ['spalle'] });
  assert.ok(!g('alternativeDi')(nomeLib('Shoulder Press Machine'), spalle, []).some(x => /military|lento avanti|arnold/i.test(x.name)));
  const odiati = Object.assign(PREFS(), { odiati: [cavi] });
  assert.ok(!g('alternativeDi')(curl, odiati, []).some(x => x.name === cavi));
});

test('sostituto: per tutti gli esercizi lo stesso muscolo bersaglio (o la stessa famiglia totale), oppure null (mai un altro muscolo)', () => {
  let nulli = [];
  LIB.forEach(e => {
    const s = g('sostituto')(e.name, PREFS(), []);
    const esatte = g('alternativeStessoMuscolo')(e.name, PREFS(), []);
    if (!s) { nulli.push(pulito(e.name)); assert.strictEqual(esatte.length, 0, e.name + ': null ma ci sono alternative'); return; }
    assert.notStrictEqual(s.name, e.name);
    assert.ok(stessoLavoro(e.name, s.name), pulito(e.name) + ' -> ' + pulito(s.name));
    if (!famiglia(e.name)) assert.strictEqual(bersaglio(s.name), bersaglio(e.name), pulito(e.name) + ' -> ' + pulito(s.name));
  });
  assert.deepStrictEqual(nulli.sort(), ['Tibialis Raise']);
  assert.strictEqual(g('sostituto')('Esercizio che non esiste', PREFS(), []), null);
});

test('sostituto: rispetta usati, odiati e la preferenza macchine o pesi liberi, sempre sullo stesso muscolo', () => {
  const nome = nomeLib('Curl Bilanciere Bicipiti');
  const primo = g('sostituto')(nome, PREFS(), []);
  assert.ok(primo);
  const secondo = g('sostituto')(nome, PREFS(), [primo.name]);
  assert.ok(secondo && secondo.name !== primo.name && bersaglio(secondo.name) === bersaglio(nome));
  assert.notStrictEqual(g('sostituto')(nome, Object.assign(PREFS(), { odiati: [primo.name] }), []).name, primo.name);
  /* tutti gli esercizi dello stesso muscolo gia usati o odiati: null */
  const tutti = g('alternativeStessoMuscolo')(nome, PREFS(), [], { max: 99 }).map(x => x.ex.name);
  assert.strictEqual(g('sostituto')(nome, PREFS(), tutti), null);
  const petto = nomeLib('Panca Piana Bilanciere');
  const mac = g('sostituto')(petto, Object.assign(PREFS(), { attrezzi: 'macchine' }), []);
  const lib = g('sostituto')(petto, Object.assign(PREFS(), { attrezzi: 'liberi' }), []);
  [mac, lib].forEach(x => assert.strictEqual(bersaglio(x.name), 'petto_medio'));
  /* i graditi contano solo tra gli esercizi dello stesso muscolo */
  const gradito = g('alternativeStessoMuscolo')(nome, PREFS(), [], { max: 99 }).pop().ex.name;
  assert.strictEqual(bersaglio(g('sostituto')(nome, Object.assign(PREFS(), { graditi: [gradito] }), []).name), bersaglio(nome));
});

/* ============================================================================================================
   W0-T6 · Dati degli esercizi (B15, B16, SEL-02, P10, P12, D-P8, D-P11)
   ============================================================================================================ */

test('B15: hip thrust e ponte glutei non sono hinge (spinte d anca da supini), stacchi e hyperextension si', () => {
  const s = g('schemaDi');
  ['Hip Thrust', 'Hip Thrust alla Macchina', 'Ponte Glutei', 'Ponte Glutei a una Gamba'].forEach(n => assert.strictEqual(s(nomeLib(n)), null, n));
  ['Stacco da Terra (Deadlift)', 'Stacco con Trap Bar', 'Stacco Sumo', 'Stacco Rumeno', 'Good Morning', 'Hyperextension (Lombari)', 'Hyperextension a 45° per Glutei']
    .forEach(n => assert.strictEqual(s(nomeLib(n)), 'hinge', n));
  /* l espressione dell hinge, da cui buildProgram pesca lo schema mancante, non li prende nemmeno */
  const hinge = g('SCHEMI_MOV').find(x => x[0] === 'hinge')[1];
  ['Hip Thrust', 'Ponte Glutei', 'Ponte Glutei a una Gamba', 'Hip Thrust alla Macchina'].forEach(n => assert.ok(!hinge.test(n), n));
  /* gli altri schemi non cambiano */
  assert.strictEqual(s(nomeLib('Squat con Bilanciere')), 'squat');
  assert.strictEqual(s(nomeLib('Lat Machine')), 'tirataV');
});

test('B15: ogni scheda da palestra senza fastidi ha uno stacco vero (l hip thrust da solo non basta a contare l hinge)', () => {
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  assert.strictEqual(app.chiama('schemaDi', '🍑 Hip Thrust'), null);
  let n = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 4, 5].forEach(days => [['massa'], ['forza'], ['glutei'], ['salute']].forEach(goals => [45, 90].forEach(minutes => {
    const p = app.dati(app.chiama('buildProgram', { goals, level, days, minutes, luogo: 'palestra', fastidi: [], sex: 'F', age: 30, usaProfilo: false, seme: 'w0t6-' + (n++) }));
    const nomi = [].concat(...p.sedute.map(sd => sd.esercizi.map(e => e.name)));
    /* INT-2b: «hinge vero» e la cerniera dell anca degli attributi (stacchi, good morning, pull-through ai cavi: schema 'hinge'), come per il collaudo PAT-01 (hingeVero) e SLOT_DEF.hinge; l hip thrust e il ponte
       glutei hanno schema 'spintaAnca' e non contano (B15). Prima la prova leggeva schemaDi (SCHEMI_MOV, per nome: stacco, good morning, hyperextension) e un solo programma della griglia (avanzato, 4 giorni,
       glutei, 45 minuti) ha ora il pull-through come unica cerniera: lo stacco rumeno di 2 serie lo toglie il volume per muscolo (W2-T1) perche il pull-through e l hip thrust coprono i glutei. Il
       conteggio degli schemi per attributi e di W2-T6 (SCHEMI_MOV derivato dagli attributi): fin li le due letture divergono su questo nome */
    const hingeVero = x => { const a = app.chiama('attributi', x); return !!a && a.schema === 'hinge'; };
    assert.ok(nomi.some(hingeVero), level + ' ' + days + ' giorni ' + goals + ' ' + minutes + ' min: nessun hinge vero (' + nomi.length + ' esercizi)');
  }))));
  assert.ok(n >= 70);
});

test('B16 e P12: squat e leg press non hanno i femorali tra i muscoli; gli adduttori sono tra quelli che lavorano', () => {
  ['Squat con Bilanciere', 'Leg Press'].forEach(n => {
    const d = g('dettaglioEsercizio')(nomeLib(n));
    assert.ok(d.secondari.indexOf('femorali') === -1, n + ': femorali tra i secondari');
    assert.ok(!/femorali/i.test(d.focus + ' ' + d.sec), n + ': femorali nel testo (' + d.focus + ' / ' + d.sec + ')');
    assert.ok(d.secondari.indexOf('adduttori') !== -1 && /adduttori/i.test(d.focus), n + ': adduttori');
    assert.strictEqual(d.bersaglio, 'quadricipiti', n);
    assert.ok(/^quadricipiti/i.test(d.focus), n + ': il bersaglio resta il primo muscolo del focus');
  });
  assert.deepStrictEqual([...g('dettaglioEsercizio')(nomeLib('Squat con Bilanciere')).secondari].sort(), ['adduttori', 'erettori', 'grande_gluteo']);
  assert.deepStrictEqual([...g('dettaglioEsercizio')(nomeLib('Leg Press')).secondari].sort(), ['adduttori', 'grande_gluteo']);
  /* lo stacco rumeno (RDL) non cambia qui: i crediti per muscolo sono di W1-T2 */
  assert.strictEqual(bersaglio('Stacco Rumeno'), 'grande_gluteo');
  assert.deepStrictEqual([...g('dettaglioEsercizio')(nomeLib('Stacco Rumeno')).secondari].sort(), ['erettori', 'femorali']);
});

test('SEL-02 (a): Stacco con Trap Bar non e un esercizio dei quadricipiti; resta nella famiglia catena_totale', () => {
  const n = nomeLib('Stacco con Trap Bar');
  assert.notStrictEqual(bersaglio(n), 'quadricipiti');
  assert.strictEqual(bersaglio(n), 'erettori', 'il bersaglio dello stacco da terra: come lui scambia solo con gli stacchi, e con l Hyperextension dei lombari');
  assert.strictEqual(bersaglio(n), bersaglio('Stacco da Terra (Deadlift)'));
  assert.strictEqual(famiglia(n), 'catena_totale');
  assert.ok(g('dettaglioEsercizio')(n).secondari.indexOf('quadricipiti') !== -1, 'allena ancora i quadricipiti, come secondario');
  /* nessun esercizio dei quadricipiti lo propone, in nessuna delle liste di alternative; mai come sostituto */
  LIB.filter(e => bersaglio(e.name) === 'quadricipiti').forEach(e => {
    assert.ok(!g('alternativeDi')(e.name, PREFS(), [], { max: 99 }).some(x => x.name === n), pulito(e.name) + ' propone lo Stacco con Trap Bar');
    assert.ok(!alt(pulito(e.name)).some(x => /Trap Bar/.test(x)), pulito(e.name) + ' (macchinario occupato)');
    assert.ok(!/Trap Bar/.test((g('sostituto')(e.name, PREFS(), []) || { name: '' }).name), pulito(e.name) + ' sostituto');
  });
  ['Leg Extension', 'Goblet Squat'].forEach(x => assert.ok(!alt(x).some(y => /Trap Bar/.test(y)), x));
  /* lui scambia solo con gli altri stacchi da terra */
  assert.deepStrictEqual(alt('Stacco con Trap Bar').sort(), ['Stacco Sumo', 'Stacco da Terra (Deadlift)', 'Stacco in Deficit']);
});

test('D-P11: Pullover con Manubrio allena i dorsali (petto secondario), gruppo schiena; le sue alternative sono tutte dorsali', () => {
  const n = nomeLib('Pullover con Manubrio'), d = g('dettaglioEsercizio')(n), e = LIB.find(x => x.name === n);
  assert.strictEqual(bersaglio(n), 'dorsali');
  assert.strictEqual(e.group, 'schiena');
  assert.strictEqual(d.sub, 'Dorsali · larghezza');
  assert.ok(d.secondari.indexOf('petto_medio') !== -1 && d.secondari.indexOf('tricipiti') !== -1);
  assert.ok(/^gran dorsale/i.test(d.focus));
  for (const a of [alt('Pullover con Manubrio'), g('alternativeDi')(n, PREFS(), []).map(x => pulito(x.name)), g('alternativeDi')(n, PREFS(), [], { max: 99 }).map(x => pulito(x.name))]) {
    assert.ok(a.length >= 3, a.join(', '));
    a.forEach(x => assert.strictEqual(bersaglio(nomeLib(x)), 'dorsali', 'Pullover con Manubrio -> ' + x));
    assert.ok(!a.some(x => /panca|croci|piegamenti|chest|pectoral|dip/i.test(x)), a.join(', '));
  }
  assert.ok(g('alternativeDi')(nomeLib('Pullover ai Cavi'), PREFS(), [], { max: 99 }).some(x => x.name === n), 'il pullover ai cavi lo propone');
  /* e non e piu un isolamento del petto: ne la panca ne le croci lo propongono, e non entra nel posto isoPetto */
  ['Panca Piana Bilanciere', 'Croci su Panca Manubri', 'Pectoral Machine (Butterfly)'].forEach(x => assert.ok(!alt(x).some(y => /Pullover/.test(y)), x));
  assert.strictEqual(g('SLOT_DEF').isoPetto(e), false);
  /* il sottogruppo di ogni esercizio sta nel suo gruppo (la schermata Gruppi li mostra cosi) */
  LIB.forEach(x => assert.ok(SOTTOGRUPPI[x.group].indexOf(g('dettaglioEsercizio')(x.name).sub) !== -1, x.name + ': ' + x.group + ' / ' + g('dettaglioEsercizio')(x.name).sub));
  const org = g('organizzaEsercizi')([e], null);
  assert.strictEqual(JSON.stringify(org.map(s => [s.sez, s.gruppi.map(gr => [gr.gruppo, gr.sottogruppi.map(s2 => s2.sub)])])), JSON.stringify([['L', [['schiena', ['Dorsali · larghezza']]]]]));
});

test('D-P11: il pullover coi manubri e solo la riserva della tirata verticale (non sostituisce trazioni e lat, ne in palestra ne con la sbarra)', () => {
  /* come schema: non conta come tirata verticale (altrimenti prenderebbe il posto di trazioni e lat, e strBilancia lo conterebbe come tirata) */
  assert.strictEqual(g('schemaDi')(nomeLib('Pullover con Manubrio')), null);
  assert.strictEqual(g('SLOT_DEF').tirataV(LIB.find(e => e.name === nomeLib('Pullover con Manubrio'))), false);
  assert.ok(g('SCHEMI_MOV').find(x => x[0] === 'tirataV')[1].test('Pullover con Manubrio'), 'e nell elenco da cui si pesca lo schema mancante');
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  const prova = (extra, i) => {
    const p = app.dati(app.chiama('buildProgram', Object.assign({ goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'w0t6-' + i }, extra)));
    const nomi = [].concat(...p.sedute.map(sd => sd.esercizi.map(e => pulito(e.name))));
    return { pullover: nomi.indexOf('Pullover con Manubrio') !== -1, vera: nomi.some(x => app.chiama('schemaDi', x) === 'tirataV'), note: p.note || [] };
  };
  for (let i = 0; i < 6; i++) {
    /* palestra completa o con la sbarra o con le sole macchine: trazioni o lat, mai il pullover */
    [{}, { attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'] }, { attrezziPalestra: ['macchine'] }].forEach(extra => {
      const r = prova(extra, i);
      assert.strictEqual(r.pullover, false, JSON.stringify(extra));
      assert.strictEqual(r.vera, true, JSON.stringify(extra));
    });
    /* niente sbarra e niente macchine: nessuna tirata verticale possibile, il pullover la sostituisce, con la nota dello schema mancante */
    const senza = prova({ attrezziPalestra: ['bilanciere', 'manubri'] }, i);
    assert.strictEqual(senza.vera, false);
    assert.strictEqual(senza.pullover, true);
    assert.ok(senza.note.some(x => /Pullover con Manubrio/.test(x)), senza.note.join(' | '));
  }
});

test('P10 e D-P8: allungamento (IN_ALLUNGAMENTO): niente «da seduto» generico, niente scambio ne +1,5 per le croci', () => {
  const a = g('inAllungamento');
  /* provati: sopra la testa, leg curl seduto, curl su panca inclinata e Bayesiano (bicipite allungato), affondi col piede rialzato */
  ['Estensione Tricipiti sopra la Testa ai Cavi', 'Estensione Tricipiti sopra la Testa con Manubrio', 'Leg Curl Seduto', 'Curl su Panca Inclinata', 'Curl Bayesiano ai Cavi',
    'Affondi al Multipower (Piede Rialzato)'].forEach(n => assert.strictEqual(a(nomeLib(n)), true, n));
  /* RIC-03 (accesa): schiena e glutei */
  ['Pullover con Manubrio', 'Affondi Bulgari', 'Stacco Rumeno'].forEach(n => assert.strictEqual(a(nomeLib(n)), true, n));
  /* le croci stanno alla pari, ai cavi (anche da seduto) e coi manubri: nessuna e «in allungamento» */
  ['Croci ai Cavi', 'Croci ai Cavi da Seduto', 'Croci su Panca Manubri', 'Croci ai Cavi dal Basso', 'Croci ai Cavi Alti (Parte Bassa)', 'Pectoral Machine (Butterfly)']
    .forEach(n => assert.strictEqual(a(nomeLib(n)), false, n));
  /* bicipiti: Scott e Spider non lo sono, il curl inclinato e il Bayesiano si */
  ['Curl su Panca Scott', 'Curl alla Macchina (Scott)', 'Spider Curl', 'Curl Bilanciere Bicipiti', 'Hammer Curl'].forEach(n => assert.strictEqual(a(nomeLib(n)), false, n));
  /* nessun pezzo che prende un esercizio per sbaglio, nessun pezzo che non cattura nulla */
  assert.ok(!g('IN_ALLUNGAMENTO').source.includes('da seduto'));
  assert.ok(!g('IN_ALLUNGAMENTO').source.includes('panca inclinata \\('));
  assert.ok(!g('IN_ALLUNGAMENTO_NUOVI').source.includes('croci'));
  /* RIC-03 spenta: solo la lista vecchia */
  const prima = c.regolaAttiva;
  c.regolaAttiva = () => false;
  try {
    ['Pullover con Manubrio', 'Affondi Bulgari', 'Stacco Rumeno'].forEach(n => assert.strictEqual(a(nomeLib(n)), false, n + ' (RIC-03 spenta)'));
    assert.strictEqual(a(nomeLib('Curl Bayesiano ai Cavi')), true);
    assert.strictEqual(g('scambiAllungamento')().length, 3);
  } finally { c.regolaAttiva = prima; }
});

test('SEL-02 (b) e D-P8: nessuno scambio per allungamento attraversa i gruppi o i muscoli (ne croci ne pullover)', () => {
  const coppie = g('scambiAllungamento')();
  assert.strictEqual(coppie.length, 3);
  assert.strictEqual(g('SCAMBI_ALLUNGAMENTO_NUOVI').length, 0);
  coppie.forEach(([da, a]) => {
    assert.ok(nomeLib(pulito(da)) && nomeLib(pulito(a)), da + ' -> ' + a + ': fuori libreria');
    assert.strictEqual(bersaglio(da), bersaglio(a), da + ' -> ' + a + ': muscolo diverso');
    assert.strictEqual(LIB.find(e => pulito(e.name) === da).group, LIB.find(e => pulito(e.name) === a).group, da + ' -> ' + a + ': gruppo diverso');
    assert.ok(!/croci|pullover/i.test(da + a), da + ' -> ' + a);
  });
});

/* ---- W1-T5 (CAS-13, SEL-03, SEL-04, D-P2, D-P3): i 29 esercizi nuovi, i dorsali dei rematori, la copertura sui dati ---- */
const NUOVI_W1T5 = ['Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Hip Thrust con Manubrio', 'Leg Curl con Asciugamano', 'Leg Curl in Piedi', 'Belt Squat',
  'Squat con Pausa', 'Cossack Squat', 'Squat su Scatola', 'Step-up Basso', 'Sit-to-Stand dalla Panca', 'Calf Raise con Manubrio sul Gradino', 'Tibialis Raise',
  'Trazioni Negative', 'Seal Row', 'Lat Pulldown con Elastico', 'Rematore agli Anelli', 'Stacco in Deficit', 'Floor Press con Manubri',
  'Chest Press Inclinata alla Macchina', 'Panca con Pausa', 'Alzate Laterali con Elastico', 'Alzate Laterali Inclinate', 'Extrarotazione al Cavo',
  'Face Pull con Elastico', 'Scrollate con Manubri', 'Suitcase Carry', 'Copenhagen Plank', 'Kettlebell Swing'];
/* rinviati: il nome e preso per altro da una regex del generatore (Reverse Nordic: isoFem e RX_NORDIC; Wrist Curl: isoBic; Reverse Crunch: isoDeltP) */
const RINVIATI_W1T5 = ['Reverse Nordic', 'Wrist Curl', 'Reverse Wrist Curl', 'Reverse Crunch'];
const REMATORI_W1T5 = ['Rematore con Bilanciere', 'Rematore con Manubrio', 'T-Bar Row', 'Pulley Basso', 'Rematore alla Macchina', 'Rematore Inverso (Corpo Libero)',
  'Rematore con Petto Appoggiato', 'Pulley Basso Presa Inversa', 'Pulley Basso a un Braccio', 'Rematore Presa Inversa (Yates)', 'Seal Row', 'Rematore agli Anelli'];
const app5 = caricaApp({ ora: '2026-10-05T12:00:00' });
/* prima dell integrazione la riga <script> di attributi-esercizi.js non e ancora in index.html (lo fa tools/integra-onda.js da docs/in-arrivo/w1-t2.json) */
if (app5.g('typeof ATTRIBUTI') === 'undefined') vm.runInContext(fs.readFileSync(path.join(R, 'js/dati/attributi-esercizi.js'), 'utf8'), app5.ctx, { filename: 'js/dati/attributi-esercizi.js' });
const ATTR5 = app5.json('ATTRIBUTI'), TECN5 = app5.json('TECNICA'), IMM5 = app5.json('IMMAGINI_ESERCIZI'), DETT5 = app5.json('DETTAGLI');

test('W1-T5: i 29 esercizi nuovi ci sono una volta sola, con dettagli, attributi e scheda tecnica completi; i 4 rinviati no', () => {
  assert.strictEqual(NUOVI_W1T5.length, 29);
  assert.strictEqual(new Set(NUOVI_W1T5).size, 29);
  NUOVI_W1T5.forEach(n => {
    assert.strictEqual(LIB.filter(e => pulito(e.name) === n).length, 1, n + ': una sola voce in libreria');
    assert.ok(DETT5[n] && (DETT5[n].length === 8 || DETT5[n].length === 9) && DETT5[n][7], n + ': riga di DETTAGLI con il bersaglio (8 voci, 9 se ha secondari)');
    assert.ok(ATTR5[n], n + ': riga di ATTRIBUTI');
    const t = TECN5[n];
    assert.ok(t && t.m && t.s && t.c, n + ': scheda tecnica con muscoli, partenza e consiglio');
    assert.ok(Array.isArray(t.e) && t.e.length >= 2 && Array.isArray(t.x) && t.x.length >= 2, n + ': esecuzione e errori');
  });
  RINVIATI_W1T5.forEach(n => {
    assert.strictEqual(LIB.filter(e => pulito(e.name) === n).length, 0, n + ': rinviato, non in libreria');
    assert.ok(!DETT5[n] && !ATTR5[n] && !TECN5[n], n + ': rinviato, senza righe');
  });
  /* niente doppioni con un nome gia in libreria (senza emoji, senza maiuscole) */
  const visti = new Set(); LIB.forEach(e => { const k = pulito(e.name).toLowerCase(); assert.ok(!visti.has(k), 'doppione ' + k); visti.add(k); });
});

test('D-P2: gli esercizi nuovi escono senza disegno (nessuna voce in IMMAGINI_ESERCIZI): il segnaposto «Immagine in arrivo» e il percorso img/ vengono dal generico', () => {
  NUOVI_W1T5.forEach(n => {
    assert.ok(!(n in IMM5), n + ': ha un disegno, ma D-P2 dice di non farne');
    assert.ok(/^img\/[a-z0-9-]+\.png$/.test(app5.chiama('immagineEsercizio', n)), n + ': percorso generico');
  });
});

test('D-P3: gli attrezzi nuovi (elastico, kettlebell, anelli) sono dichiarati in ATTRIBUTI.attrezzo e in `serve`, mai al posto del corpo libero', () => {
  const per = a => NUOVI_W1T5.filter(n => ATTR5[n].attrezzo === a);
  assert.deepStrictEqual(per('elastico').sort(), ['Alzate Laterali con Elastico', 'Face Pull con Elastico', 'Lat Pulldown con Elastico']);
  assert.deepStrictEqual(per('kettlebell'), ['Kettlebell Swing']);
  assert.deepStrictEqual(per('anelli'), ['Rematore agli Anelli']);
  ['elastico', 'kettlebell', 'anelli'].forEach(a => per(a).forEach(n => assert.ok(ATTR5[n].serve.some(s => s.split('|').indexOf(a) !== -1), n + ': serve ' + a)));
  /* chi serve la panca la dichiara: il floor press no (sta a terra), il seal row si */
  assert.deepStrictEqual(ATTR5['Seal Row'].serve, ['panca']);
  assert.deepStrictEqual(ATTR5['Floor Press con Manubri'].serve, []);
  /* conteggio per attrezzo dei 29 */
  const conta = {}; NUOVI_W1T5.forEach(n => { conta[ATTR5[n].attrezzo] = (conta[ATTR5[n].attrezzo] || 0) + 1; });
  assert.deepStrictEqual(conta, { manubri: 9, corpo: 8, macchina: 3, bilanciere: 3, elastico: 3, anelli: 1, cavo: 1, kettlebell: 1 });
});

test('W1-T5: i rematori danno 0,5 ai dorsali (prima il gran dorsale era nel testo ma non tra i secondari: nessun credito)', () => {
  REMATORI_W1T5.forEach(n => {
    assert.strictEqual(DETT5[n][7], 'schiena_spessore', n + ': il bersaglio resta lo spessore');
    assert.ok(DETT5[n][8].split(' ').indexOf('dorsali') !== -1, n + ': dorsali tra i secondari di DETTAGLI');
    assert.strictEqual(ATTR5[n].muscoli.schiena_spessore, 1, n);
    assert.strictEqual(ATTR5[n].muscoli.dorsali, 0.5, n + ': 0,5 ai dorsali (scala 0/0,5/1 di B6, non 0,7)');
  });
  /* il lat resta bersaglio dei dorsali: i rematori non diventano esercizi dei dorsali e non scambiano con le trazioni */
  assert.strictEqual(DETT5['Lat Machine'][7], 'dorsali');
  assert.strictEqual(ATTR5['Lat Machine'].muscoli.dorsali, 1);
  assert.ok(alt('Rematore con Bilanciere').indexOf('Rematore con Manubrio') !== -1);
  assert.ok(!alt('Rematore con Manubrio').some(x => /Trazioni|Lat Machine/.test(x)));
});

test('MOD-12 sui dati (W1-T5): a casa con i manubri hinge, flessione del ginocchio, deltoide laterale e posteriore hanno una scelta; con l elastico anche la tirata verticale', () => {
  const kit = (ammessi, serveOk) => Object.keys(ATTR5).filter(n => ammessi.indexOf(ATTR5[n].attrezzo) !== -1 && ATTR5[n].serve.every(s => serveOk.indexOf(s) !== -1));
  const cella = {
    hinge: n => ATTR5[n].schema === 'hinge',
    femoraliFlessione: n => ATTR5[n].schema === 'isolamento' && ATTR5[n].muscoli.femorali === 1,
    deltoideLaterale: n => ATTR5[n].muscoli.deltoide_laterale === 1,
    deltoidePosteriore: n => ATTR5[n].muscoli.deltoide_posteriore === 1,
    tirataV: n => ATTR5[n].schema === 'tirataV'
  };
  const manubri = kit(['manubri', 'corpo'], []);
  assert.deepStrictEqual(manubri.filter(cella.hinge).sort(), ['Stacco Rumeno a una Gamba', 'Stacco Rumeno con Manubri']);   /* prima: nessuno */
  assert.ok(manubri.filter(cella.femoraliFlessione).length >= 1, 'flessione del ginocchio: ' + manubri.filter(cella.femoraliFlessione));
  assert.ok(manubri.filter(cella.deltoideLaterale).length >= 2, 'deltoide laterale');
  assert.ok(manubri.filter(cella.deltoidePosteriore).length >= 1, 'deltoide posteriore');
  /* con una panca i posteriori sono due (Y-raise) */
  assert.ok(kit(['manubri', 'corpo'], ['panca']).filter(cella.deltoidePosteriore).length >= 2);
  /* corpo libero e basta: la flessione del ginocchio c e (asciugamano), il resto aspetta gli attrezzi dichiarati (W2-T5/T6) */
  const corpo = kit(['corpo'], []);
  assert.deepStrictEqual(corpo.filter(cella.femoraliFlessione), ['Leg Curl con Asciugamano']);
  assert.strictEqual(corpo.filter(cella.hinge).length, 0);
  const elastico = kit(['corpo', 'elastico'], ['elastico']);
  ['deltoideLaterale', 'deltoidePosteriore', 'tirataV'].forEach(k => assert.ok(elastico.filter(cella[k]).length >= 1, k + ' con l elastico'));
  assert.deepStrictEqual(kit(['corpo', 'elastico', 'anelli', 'kettlebell'], ['elastico', 'anelli', 'kettlebell']).filter(cella.hinge), ['Kettlebell Swing']);
});
