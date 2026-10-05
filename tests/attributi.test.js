/* Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per
   unità di volume, profilo, stabilità, fatica, abilità, stress per 8 zone, attrezzo, cosa serve e tempo di cambio (js/dati/attributi-esercizi.js).
   Esegue il codice vero dell'app in node (vm), senza browser. Lancio: npm test
   Prima dell'integrazione la riga <script> non è ancora in index.html (lo fa tools/integra-onda.js da docs/in-arrivo/w1-t2.json): la prova carica il
   file a mano se serve. Nessun consumatore legge ancora gli attributi: le prove controllano i dati, il confronto con le vecchie tabelle e le funzioni. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');
const { caricaApp } = require('./aiuto-app');

const app = caricaApp({ ora: '2026-10-05T12:00:00' });
if (app.g('typeof ATTRIBUTI') === 'undefined') vm.runInContext(fs.readFileSync(path.join(R, 'js/dati/attributi-esercizi.js'), 'utf8'), app.ctx, { filename: 'js/dati/attributi-esercizi.js' });
const g = app.g, J = app.json;
const pulito = n => g('senzaEmoji')(n);
const LIB = J('EXERCISE_LIBRARY'), ATTR = J('ATTRIBUTI'), DETT = J('DETTAGLI'), MUSCOLI = J('MUSCOLI');
const UNITA = J('UNITA_VOLUME'), UDM = J('UNITA_DI_MUSCOLO'), ZONE = J('ZONE_STRESS'), MOTIVI = J('MOTIVI_ZERO');
const attr = nome => J('attributi(' + JSON.stringify(nome) + ')');   /* la riga espansa (8 zone di stress) */

/* l'elenco esperto del collaudo (tools/collaudo-generatore.js, non si modifica): le prove lo leggono, cosi i dati e il collaudo non si allontanano */
function dalCollaudo(nome) {
  const src = fs.readFileSync(path.join(R, 'tools/collaudo-generatore.js'), 'utf8'), da = src.indexOf('const ' + nome + ' = ');
  assert.ok(da !== -1, nome + ' non e piu in tools/collaudo-generatore.js: aggiornare questa prova (INT-1 fa leggere al collaudo l\'attributo stress)');
  const resto = src.slice(da), fine = resto.charAt(('const ' + nome + ' = ').length) === '{' ? resto.indexOf('\n};') + 3 : resto.indexOf(';\n') + 1;
  return vm.runInNewContext('(function(){' + resto.slice(0, fine) + ';return ' + nome + ';})()');
}
const CTRL = dalCollaudo('CONTROINDICAZIONI'), TECNICI_PRINCIPIANTE = dalCollaudo('TECNICI_PRINCIPIANTE');
const ZONA_DI_FASTIDIO = { spalle: 'spalla', ginocchia: 'ginocchio', schiena: 'schiena' };

/* le 140 righe di W1-T2: W1-T5 ne aggiunge altre, i confronti con le vecchie tabelle valgono solo per queste */
const NOMI_W1T2 = [
  'Panca Piana Bilanciere', 'Panca Inclinata Bilanciere', 'Panca Inclinata Manubri', 'Panca Declinata', 'Chest Press Machine', 'Dip alle Parallele',
  'Piegamenti a Terra (Push-up)', 'Croci ai Cavi', 'Croci su Panca Manubri', 'Pectoral Machine (Butterfly)', 'Stacco da Terra (Deadlift)',
  'Trazioni alla Sbarra (Pull-ups)', 'Trazioni Presa Inversa (Chin-up)', 'Lat Machine', 'Lat Machine Presa Inversa', 'Rematore con Bilanciere',
  'Rematore con Manubrio', 'T-Bar Row', 'Pulley Basso', 'Pullover ai Cavi', 'Hyperextension (Lombari)', 'Squat con Bilanciere', 'Front Squat',
  'Goblet Squat', 'Hack Squat', 'Leg Press', 'Affondi Manubri', 'Affondi in Camminata', 'Step-up su Panca', 'Leg Extension', 'Leg Curl Sdraiato',
  'Leg Curl Seduto', 'Calf Raise in Piedi', 'Calf Raise Seduto', 'Hip Thrust', 'Stacco Rumeno', 'Stacco Sumo', 'Affondi Bulgari', 'Good Morning',
  'Ponte Glutei', 'Abductor Machine', 'Kickback ai Cavi', 'Slanci Laterali a Terra', 'Military Press', 'Lento Avanti Manubri', 'Arnold Press',
  'Shoulder Press Machine', 'Tirate al Mento (Upright Row)', 'Alzate Laterali', 'Alzate Frontali', 'Alzate Posteriori (Reverse Fly)', 'Face Pull',
  'Scrollate (Shrug)', 'Curl Bilanciere Bicipiti', 'Curl Manubri Alternato', 'Hammer Curl', 'Curl su Panca Scott', 'Curl ai Cavi',
  'Curl di Concentrazione', 'Pushdown Tricipiti ai Cavi', 'French Press', 'Panca Presa Stretta', 'Dip su Panca', 'Kickback Tricipiti',
  'Panca Piana Manubri', 'Croci ai Cavi dal Basso', 'Piegamenti Inclinati (Mani Rialzate)', 'Rematore alla Macchina', 'Pulldown a Braccia Tese',
  'Trazioni Assistite (Macchina)', 'Rematore Inverso (Corpo Libero)', 'Squat a Corpo Libero', 'Affondi Inversi', 'Nordic Curl', 'Wall Sit',
  'Pull-Through ai Cavi', 'Ponte Glutei a una Gamba', 'Abduzioni ai Cavi', 'Landmine Press', 'Y-Raise su Panca Inclinata', 'Curl con Bilanciere EZ',
  'Spider Curl', 'Pushdown con Corda', 'Pallof Press', 'Dead Bug', 'Bird Dog', 'Farmer Walk', 'Estensione Tricipiti sopra la Testa ai Cavi',
  'Estensione Tricipiti sopra la Testa con Manubrio', 'Curl su Panca Inclinata', 'Curl Bayesiano ai Cavi', 'Alzate Laterali ai Cavi',
  'Reverse Pec Deck', 'Rematore con Petto Appoggiato', 'Lat Machine a un Braccio', 'Pendulum Squat', 'Squat al Multipower',
  'Calf Raise alla Leg Press', 'Stacco con Trap Bar', 'Hip Thrust alla Macchina', 'Hyperextension a 45° per Glutei',
  'Affondi al Multipower (Piede Rialzato)', 'Croci ai Cavi da Seduto', 'Plank', 'Plank Laterale', 'Crunch a Terra', 'Crunch al Cavo',
  'Leg Raise alla Sbarra', 'Leg Raise a Terra', 'Russian Twist', 'Mountain Climber', 'Hollow Hold', 'Ab Wheel',
  'Pulley Basso Barra Larga (Presa Prona)', 'Pulley Basso Presa Inversa', 'Pulley Basso a un Braccio', 'Lat Machine Triangolo (Presa Neutra)',
  'Rematore Presa Inversa (Yates)', 'Trazioni Presa Neutra', 'Croci ai Cavi Alti (Parte Bassa)', 'Piegamenti Declinati (Piedi Rialzati)',
  'Piegamenti a Diamante', 'Adductor Machine', 'Calf Raise a un Piede (Corpo Libero)', 'Sissy Squat', 'Alzate Laterali alla Macchina',
  'Pike Push-up', 'Curl ai Cavi con Corda (Presa Martello)', 'Curl Inverso con Bilanciere EZ', 'Curl alla Macchina (Scott)', 'Curl Zottman',
  'Pushdown Presa Inversa', 'Pushdown con Barra V', 'Dip alla Macchina (Tricipiti)', 'Crunch alla Macchina', 'Woodchop ai Cavi (Rotazioni)',
  'Leg Raise alla Sedia Romana', 'Sit-up a Ginocchia Piegate', 'Squat Sumo', 'Pullover con Manubrio'
];

test('ogni esercizio della libreria ha una riga con tutti i campi e valori ammessi', () => {
  const CAMPI = ['classe', 'schema', 'muscoli', 'profilo', 'stabilita', 'fatica', 'abilita', 'unilaterale', 'stress', 'attrezzo', 'serve', 'setup', 'fonte'];
  const SCHEMI = J('SCHEMI_ESERCIZIO'), PROFILI = J('PROFILI_RESISTENZA'), ATTREZZI = J('ATTREZZI_ESERCIZIO'), SERVE = J('SERVE_AMMESSI');
  assert.ok(LIB.length >= 140);
  const nomi = LIB.map(e => pulito(e.name));
  assert.deepStrictEqual(Object.keys(ATTR).filter(n => nomi.indexOf(n) === -1), [], 'righe di ATTRIBUTI senza esercizio nella libreria');
  NOMI_W1T2.forEach(n => assert.ok(nomi.indexOf(n) !== -1 && ATTR[n], 'sparito: ' + n));
  nomi.forEach(n => {
    const a = ATTR[n];
    assert.ok(a, 'senza attributi: ' + n);
    CAMPI.forEach(c => assert.ok(a[c] !== undefined, n + ': manca ' + c));
    assert.ok(/^[A-F]$/.test(a.classe), n + ': classe ' + a.classe);
    assert.ok(SCHEMI.indexOf(a.schema) !== -1, n + ': schema ' + a.schema);
    assert.ok(PROFILI.indexOf(a.profilo) !== -1, n + ': profilo ' + a.profilo);
    ['stabilita', 'fatica', 'abilita'].forEach(c => assert.ok([1, 2, 3].indexOf(a[c]) !== -1, n + ': ' + c + ' ' + a[c]));
    assert.strictEqual(typeof a.unilaterale, 'boolean', n);
    assert.ok(ATTREZZI.indexOf(a.attrezzo) !== -1, n + ': attrezzo ' + a.attrezzo);
    assert.ok(Array.isArray(a.serve) && a.serve.every(s => s.split('|').every(x => SERVE.indexOf(x) !== -1)), n + ': serve ' + JSON.stringify(a.serve));
    assert.ok(Number.isInteger(a.setup) && a.setup >= 10 && a.setup <= 90 && a.setup % 5 === 0, n + ': setup ' + a.setup);
    assert.ok(/^bio §3\.[1-6]/.test(a.fonte), n + ': fonte ' + a.fonte);
    /* la riga espansa: tutte e 8 le zone di stress, 0 dove il dato tace */
    const x = attr(n);
    assert.deepStrictEqual(Object.keys(x.stress), ZONE, n);
    Object.keys(a.stress).forEach(z => assert.ok(ZONE.indexOf(z) !== -1 && [1, 2].indexOf(a.stress[z]) !== -1, n + ': stress ' + z + ' ' + a.stress[z]));
  });
  ['A', 'B', 'C', 'D', 'E', 'F'].forEach(c => assert.ok(nomi.some(n => ATTR[n].classe === c), 'nessun esercizio di classe ' + c));
  SCHEMI.forEach(s => assert.ok(nomi.some(n => ATTR[n].schema === s), 'nessun esercizio con lo schema ' + s));
});

test('l\'accesso vale con o senza emoji; un esercizio sconosciuto da null', () => {
  LIB.forEach(e => assert.strictEqual(attr(e.name).nome, pulito(e.name)));
  assert.strictEqual(attr('💪 Panca Piana Bilanciere').classe, 'A');
  assert.strictEqual(attr('Panca Piana Bilanciere').classe, 'A');
  ['attributi', 'creditoMuscoli', 'classeTecnica', 'livelloAbilita', 'serveAttrezzo'].forEach(f => assert.strictEqual(J(f + '("Esercizio Inventato")'), null, f));
  assert.strictEqual(J('stressArticolare("Esercizio Inventato", "spalla")'), null);
  assert.strictEqual(J('attributi("")'), null);
});

test('classe A-F: segue ricerca-metodi §3.1 (F = core, tenute e isolamenti a zero kg; A-C multiarticolari; D-E isolamenti; C e D guidati)', () => {
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n];
    const f = e.group === 'core' || !!e.tempo || (e.type === 'isolation' && e.weight === 0);
    assert.strictEqual(a.classe === 'F', f, n + ': classe ' + a.classe);
    if (f) return;
    if (e.type === 'compound') assert.ok('ABC'.indexOf(a.classe) !== -1, n + ': multiarticolare di classe ' + a.classe); else assert.ok('DE'.indexOf(a.classe) !== -1, n + ': isolamento di classe ' + a.classe);
    const guidato = a.attrezzo === 'macchina' || a.attrezzo === 'cavo';
    if (a.classe === 'C' || a.classe === 'D') assert.ok(guidato, n + ': classe ' + a.classe + ' ma attrezzo ' + a.attrezzo);
    if (a.classe === 'B' || a.classe === 'E') assert.ok(!guidato, n + ': classe ' + a.classe + ' ma attrezzo ' + a.attrezzo);
    /* la T-bar e «Macchina» in DETTAGLI, ma la nota la mette in A (T-bar con bilanciere) */
    if (a.classe === 'A') assert.ok(a.attrezzo === 'bilanciere' || n === 'T-Bar Row', n + ': classe A senza bilanciere');
  });
  const classe = n => ATTR[n].classe;
  assert.strictEqual(classe('Pallof Press'), 'F', 'il Pallof usa il cavo ma e core: classe F');
  assert.strictEqual(classe('Stacco da Terra (Deadlift)'), 'A');
  assert.strictEqual(classe('Hip Thrust'), 'B', 'ricerca-metodi §3.1: l\'hip thrust e classe B');
  assert.strictEqual(classe('Landmine Press'), 'B');
  assert.strictEqual(classe('Leg Press'), 'C');
  assert.strictEqual(classe('Leg Extension'), 'D');
  assert.strictEqual(classe('Alzate Laterali'), 'E');
  assert.strictEqual(classe('Wall Sit'), 'F');
});

test('stabilita, fatica e abilita: A e fatica alta vanno insieme; D e sempre stabile; i divieti del collaudo ai principianti valgono 3 (SEL-06)', () => {
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n];
    if (a.classe === 'A') assert.ok(a.stabilita >= 2 && a.fatica >= 2, n + ': classe A con stabilita ' + a.stabilita + ' e fatica ' + a.fatica);
    if (a.fatica === 3) assert.strictEqual(a.classe, 'A', n + ': fatica 3 fuori dalla classe A');
    if (a.classe === 'D') assert.strictEqual(a.stabilita, 1, n);
    if (TECNICI_PRINCIPIANTE.test(n)) assert.strictEqual(a.abilita, 3, n + ': il collaudo lo vieta ai principianti, abilita ' + a.abilita);
  });
  /* ricerca-principianti-12-settimane §3.4: prima scelta = 1, «dopo» = 2, escluso = 3 */
  const TAB = {
    1: ['Leg Press', 'Goblet Squat', 'Hack Squat', 'Squat a Corpo Libero', 'Pull-Through ai Cavi', 'Ponte Glutei', 'Hyperextension a 45° per Glutei', 'Hip Thrust alla Macchina', 'Chest Press Machine',
      'Panca Piana Manubri', 'Piegamenti Inclinati (Mani Rialzate)', 'Shoulder Press Machine', 'Lento Avanti Manubri', 'Landmine Press', 'Lat Machine', 'Lat Machine Triangolo (Presa Neutra)',
      'Rematore alla Macchina', 'Pulley Basso', 'Rematore con Petto Appoggiato', 'Rematore con Manubrio', 'Step-up su Panca', 'Affondi Inversi', 'Plank', 'Dead Bug', 'Bird Dog', 'Pallof Press'],
    2: ['Squat con Bilanciere', 'Stacco Rumeno', 'Stacco con Trap Bar', 'Panca Piana Bilanciere', 'Piegamenti a Terra (Push-up)', 'Military Press', 'Trazioni Assistite (Macchina)', 'Rematore con Bilanciere',
      'Affondi in Camminata', 'Plank Laterale'],
    3: ['Sissy Squat', 'Front Squat', 'Squat al Multipower', 'Stacco da Terra (Deadlift)', 'Good Morning', 'Stacco Sumo', 'Dip alle Parallele', 'Piegamenti Declinati (Piedi Rialzati)', 'Pike Push-up', 'Arnold Press',
      'Trazioni alla Sbarra (Pull-ups)', 'Trazioni Presa Inversa (Chin-up)', 'T-Bar Row', 'Affondi Bulgari', 'Nordic Curl', 'Ab Wheel', 'Hollow Hold', 'Leg Raise alla Sbarra', 'Mountain Climber', 'Russian Twist']
  };
  Object.keys(TAB).forEach(k => TAB[k].forEach(n => assert.strictEqual(ATTR[n].abilita, Number(k), n + ': abilita ' + ATTR[n].abilita + ' invece di ' + k)));
  assert.strictEqual(J('livelloAbilita("Nordic Curl")'), 3);
  assert.strictEqual(J('livelloAbilita("💪 Chest Press Machine")'), 1);
});

test('lo schema coincide con schemaDi dove la regex risponde (affondi e step-up ora sono «affondo»); hip thrust e ponte non sono hinge (B15); il pullover coi manubri e tirata verticale (D-P11)', () => {
  LIB.forEach(e => {
    const vecchio = g('schemaDi')(e.name);
    if (!vecchio) return;
    const atteso = vecchio === 'squat' && /affondi|step-up/i.test(e.name) ? 'affondo' : vecchio;
    assert.strictEqual(ATTR[pulito(e.name)].schema, atteso, pulito(e.name) + ': schemaDi ' + vecchio);
  });
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n], b = DETT[n][7];
    if (e.group === 'core') assert.ok(['core', 'trasporto'].indexOf(a.schema) !== -1, n + ': gruppo core con schema ' + a.schema);
    if (a.schema === 'core') assert.strictEqual(e.group, 'core', n);
    if (a.schema === 'tirataV') assert.strictEqual(b, 'dorsali', n);
    if (a.schema === 'tirataO') assert.strictEqual(b, 'schiena_spessore', n);
    if (a.schema === 'spintaV') assert.strictEqual(b, 'deltoide_anteriore', n);
  });
  ['Hip Thrust', 'Hip Thrust alla Macchina', 'Ponte Glutei', 'Ponte Glutei a una Gamba'].forEach(n => assert.strictEqual(ATTR[n].schema, 'spintaAnca', n));
  ['Stacco Rumeno', 'Good Morning', 'Pull-Through ai Cavi', 'Stacco da Terra (Deadlift)', 'Stacco con Trap Bar'].forEach(n => assert.strictEqual(ATTR[n].schema, 'hinge', n));
  assert.strictEqual(ATTR['Pullover con Manubrio'].schema, 'tirataV');
  assert.strictEqual(DETT['Pullover con Manubrio'][7], 'dorsali');
  assert.strictEqual(ATTR['Farmer Walk'].schema, 'trasporto');
  assert.strictEqual(ATTR['Pallof Press'].schema, 'core');
});

/* ---------------------------------------------------------------------------------------------------------------- crediti (registro B6) */
/* W1-T5: le stesse ragioni per le righe nuove: Stacco in Deficit (come lo stacco da terra), Scrollate con Manubri (trapezio), Tibialis Raise (tibiale anteriore),
   Suitcase Carry (trasporto: 0,5 come il Farmer Walk) */
const ECCEZIONI_CREDITO_PIENO = ['Stacco da Terra (Deadlift)', 'Stacco con Trap Bar', 'Hyperextension (Lombari)', 'Scrollate (Shrug)', 'Farmer Walk',
  'Stacco in Deficit', 'Scrollate con Manubri', 'Tibialis Raise', 'Suitcase Carry'];

test('le unita di volume sono le 15 di B6 e ogni muscolo di MUSCOLI ha la sua (o nessuna)', () => {
  assert.deepStrictEqual(UNITA, ['petto', 'dorsali', 'schiena_spessore', 'quadricipiti', 'femorali', 'grande_gluteo', 'adduttori', 'abduttori', 'polpacci',
    'deltoide_anteriore', 'deltoide_laterale', 'deltoide_posteriore', 'bicipiti', 'tricipiti', 'addome']);
  assert.deepStrictEqual(Object.keys(MUSCOLI).filter(id => !(id in UDM)), [], 'muscoli di MUSCOLI senza una voce in UNITA_DI_MUSCOLO');
  Object.keys(UDM).forEach(id => assert.ok(UDM[id] === null || UNITA.indexOf(UDM[id]) !== -1, id + ' -> ' + UDM[id]));
  ['erettori', 'trapezio', 'avambracci', 'flessori_anca'].forEach(id => assert.strictEqual(UDM[id], null, id + ' non e un\'unita di B6'));
  assert.strictEqual(UDM.brachioradiale, 'bicipiti');
  ['petto_alto', 'petto_medio', 'petto_basso'].forEach(id => assert.strictEqual(UDM[id], 'petto', id));
  ['addome', 'addome_basso', 'obliqui', 'stabilita'].forEach(id => assert.strictEqual(UDM[id], 'addome', id));
  assert.strictEqual(J('unitaDiMuscolo("grande_gluteo")'), 'grande_gluteo');
  assert.strictEqual(J('unitaDiMuscolo("erettori")'), null);
  UNITA.forEach(u => assert.ok(LIB.some(e => ATTR[pulito(e.name)].muscoli[u] === 1), 'nessun esercizio con credito pieno per ' + u));
});

test('crediti 0 / 0,5 / 1 (B6): 1 sull\'unita del bersaglio (eccezioni elencate), 0,5 ai motori di DETTAGLI, 0 sempre con un motivo', () => {
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n], zeri = a.zeri || {}, bers = DETT[n][7], sec = DETT[n][8] ? DETT[n][8].split(' ') : [], ub = UDM[bers];
    Object.keys(a.muscoli).forEach(u => {
      assert.ok(UNITA.indexOf(u) !== -1, n + ': unita sconosciuta ' + u);
      assert.ok([0, 0.5, 1].indexOf(a.muscoli[u]) !== -1, n + ': credito ' + a.muscoli[u] + ' per ' + u + ' (niente pesi intermedi)');
    });
    assert.ok(Object.keys(a.muscoli).filter(u => a.muscoli[u] === 1).length <= 1, n + ': due crediti pieni');
    if (a.eccezione) assert.ok(ECCEZIONI_CREDITO_PIENO.indexOf(n) !== -1, n + ': eccezione non elencata nella prova');
    else { assert.ok(ub, n + ': bersaglio ' + bers + ' senza unita e senza eccezione'); assert.strictEqual(a.muscoli[ub], 1, n + ': il credito pieno va a ' + ub); }
    /* ogni secondario di DETTAGLI con un'unita (diversa da quella del bersaglio) e nei crediti: 0,5 o 0 con motivo */
    sec.forEach(m => { const u = UDM[m]; if (!u || u === ub) return; assert.ok(a.muscoli[u] !== undefined, n + ': il secondario ' + m + ' (' + u + ') non e nei crediti'); });
    Object.keys(a.muscoli).forEach(u => {
      if (a.muscoli[u] === 0) assert.ok(MOTIVI[zeri[u]], n + ': credito 0 per ' + u + ' senza motivo');
      const ammesso = u === ub || sec.some(m => UDM[m] === u) || (u === 'femorali' && zeri[u] === 'kubo');
      assert.ok(ammesso, n + ': credito a ' + u + ' che non e bersaglio ne secondario');
    });
    Object.keys(zeri).forEach(u => { assert.strictEqual(a.muscoli[u], 0, n + ': motivo senza credito 0 per ' + u); assert.ok(MOTIVI[zeri[u]], n + ': motivo sconosciuto ' + zeri[u]); });
  });
});

test('le eccezioni al credito pieno sono solo quelle scritte, ognuna con la sua ragione', () => {
  assert.deepStrictEqual(LIB.map(e => pulito(e.name)).filter(n => ATTR[n].eccezione).sort(), ECCEZIONI_CREDITO_PIENO.slice().sort());
  ECCEZIONI_CREDITO_PIENO.forEach(n => assert.ok(ATTR[n].eccezione.length > 40, n));
  ['Stacco da Terra (Deadlift)', 'Stacco con Trap Bar', 'Hyperextension (Lombari)', 'Scrollate (Shrug)', 'Stacco in Deficit', 'Scrollate con Manubri', 'Tibialis Raise']
    .forEach(n => assert.strictEqual(UDM[DETT[n][7]], null, n + ': ha un\'unita, nessuna eccezione'));
  assert.deepStrictEqual(ATTR['Farmer Walk'].muscoli, { addome: 0.5 });
  assert.deepStrictEqual(ATTR['Suitcase Carry'].muscoli, { addome: 0.5 }, 'come il Farmer Walk: un trasporto vale 0,5 all\'addome');
});

test('i femorali valgono 0 in ogni squat e nella leg press (Kubo 2019); gli stabilizzatori non contano (SEL-01)', () => {
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n];
    if (a.schema === 'squat') { assert.strictEqual(a.muscoli.femorali, 0, n); assert.strictEqual((a.zeri || {}).femorali, 'kubo', n); }
    if (a.schema !== 'core') ['stabilita', 'obliqui'].forEach(m => { const u = UDM[m]; if ((DETT[n][8] || '').split(' ').indexOf(m) !== -1 && u !== UDM[DETT[n][7]]) assert.strictEqual(a.muscoli[u], 0, n + ': ' + m + ' non conta'); });
  });
  assert.deepStrictEqual(ATTR['Leg Press'].muscoli.femorali, 0);
  assert.ok(/Kubo 2019/.test(J('MOTIVI_ZERO').kubo));
  /* qualche conto a mano, dai dati di DETTAGLI */
  assert.deepStrictEqual(ATTR['Squat con Bilanciere'].muscoli, { quadricipiti: 1, grande_gluteo: 0.5, adduttori: 0.5, femorali: 0 });
  assert.deepStrictEqual(ATTR['Panca Piana Bilanciere'].muscoli, { petto: 1, deltoide_anteriore: 0.5, tricipiti: 0.5 });
  assert.deepStrictEqual(ATTR['Stacco Rumeno'].muscoli, { grande_gluteo: 1, femorali: 0.5 });
  assert.deepStrictEqual(ATTR['Stacco da Terra (Deadlift)'].muscoli, { grande_gluteo: 0.5, femorali: 0.5, quadricipiti: 0.5, dorsali: 0 });
  assert.deepStrictEqual(ATTR['Hammer Curl'].muscoli, { bicipiti: 1 }, 'il brachioradiale conta con i bicipiti: un\'unita sola');
  assert.deepStrictEqual(ATTR['Pullover con Manubrio'].muscoli, { dorsali: 1, petto: 0.5, tricipiti: 0 });
  assert.deepStrictEqual(ATTR['Scrollate (Shrug)'].muscoli, {});
});

/* ---------------------------------------------------------------------------------------------------------------- stress per zona (MOD-01) */
test('stress: ogni coppia esercizio-zona dell\'elenco esperto del collaudo e 2 (forte) o almeno 1 (cautela): MOD-01 «ok»', () => {
  const CORREZIONI_CAUTELA = { 'Calf Raise alla Leg Press|ginocchia': 'la regex «leg press» lo prende per nome, ma a ginocchia ferme non carica il ginocchio' };
  /* W1-T5: dove la regex dell'elenco esperto (sul nome) non vede bene un esercizio nuovo: [stress voluto, motivo]. Una riga per ogni caso */
  const CORREZIONI_NUOVI = {
    'Squat con Pausa|schiena': [2, 'variante dello Squat con Bilanciere (bilanciere sulla schiena): la regex del collaudo cerca «squat con bilanciere» e non lo prende per nome'],
    'Squat su Scatola|ginocchia': [1, 'è la modifica dello squat per le ginocchia delicate (si siede su una scatola alta): la regex «squat» lo darebbe «forte»; cautela'],
    'Step-up Basso|ginocchia': [1, 'è il gradino basso per le ginocchia delicate (recupero §3: «step-up bassi»): la regex «step-up» lo darebbe «forte»; cautela']
  };
  let forti = 0;
  LIB.forEach(e => {
    const n = pulito(e.name), x = attr(n);
    Object.keys(CTRL).forEach(f => {
      const s = x.stress[ZONA_DI_FASTIDIO[f]];
      const corr = CORREZIONI_NUOVI[n + '|' + f];
      if (corr) { assert.strictEqual(s, corr[0], n + ': ' + f + ' ' + corr[1]); assert.ok(corr[1].length > 20); return; }
      if (CTRL[f].forte.test(n)) { forti++; assert.strictEqual(s, 2, n + ': ' + f + ' forte nel collaudo, stress ' + s); }
      else {
        assert.notStrictEqual(s, 2, n + ': stress 2 per ' + f + ' ma non e nell\'elenco esperto (forte)');
        if (CTRL[f].cautela.test(n) && !CORREZIONI_CAUTELA[n + '|' + f]) assert.ok(s >= 1, n + ': ' + f + ' cautela nel collaudo, stress ' + s);
      }
    });
  });
  assert.ok(forti >= 30, 'troppo poche coppie forti: ' + forti);
  assert.strictEqual(J('stressArticolare("Pike Push-up", "spalla")'), 2);
  assert.strictEqual(J('stressArticolare("Front Squat", "schiena")'), 2);
  assert.strictEqual(J('stressArticolare("Rematore Presa Inversa (Yates)", "schiena")'), 2);
});

test('stress: nelle altre cinque zone il 2 e raro (solo dove due note concordano) e ogni zona ha qualche cautela', () => {
  const DUE = { gomito: ['French Press', 'Panca Presa Stretta'], polso: ['Front Squat'], anca: [], caviglia: [], collo: [] };
  ['gomito', 'polso', 'anca', 'caviglia', 'collo'].forEach(z => {
    const due = NOMI_W1T2.filter(n => ATTR[n].stress[z] === 2);
    assert.deepStrictEqual(due.sort(), DUE[z].slice().sort(), 'stress 2 su ' + z);
    assert.ok(NOMI_W1T2.some(n => ATTR[n].stress[z] === 1) || DUE[z].length, 'nessun esercizio con cautela su ' + z);
  });
  /* le liste di STRESS_ZONA (esercizi che caricano di piu ogni articolazione) restano almeno in cautela */
  const SZ = J('STRESS_ZONA');
  Object.keys(SZ).forEach(z => SZ[z].forEach(n => assert.ok(attr(n).stress[z] >= 1, n + ': in STRESS_ZONA.' + z + ' ma stress 0')));
  assert.strictEqual(J('stressArticolare("Scrollate (Shrug)", "collo")'), 1);
});

test('stressArticolare accetta anche il plurale del questionario (spalle, ginocchia) e rifiuta le zone che non esistono', () => {
  assert.strictEqual(J('stressArticolare("Military Press", "spalle")'), 2);
  assert.strictEqual(J('stressArticolare("Squat con Bilanciere", "ginocchia")'), 2);
  assert.strictEqual(J('stressArticolare("Panca Piana Bilanciere", "polsi")'), 1);
  assert.strictEqual(J('stressArticolare("Plank", "schiena")'), 0);
  assert.strictEqual(J('stressArticolare("Plank", "testa")'), null);
});

/* ---------------------------------------------------------------------------------------------------------------- attrezzo, cosa serve, tempo di cambio */
test('attrezzo e serve seguono DETTAGLI (MOD-04); unilaterale e `lato` della libreria; cosa serve vale per sbarra, parallele, panca, sedia romana, ruota, ancoraggio', () => {
  const ATT = { Bilanciere: 'bilanciere', 'Trap bar': 'bilanciere', Multipower: 'macchina', Macchina: 'macchina', Cavo: 'cavo', Manubri: 'manubri', Kettlebell: 'kettlebell', Elastico: 'elastico', Elastici: 'elastico', Anelli: 'anelli' };
  const CORPO = ['Corpo libero', 'Corpo libero o manubri', 'Sbarra', 'Parallele', 'Panca', 'Gradino', 'Sedia romana', 'Ruota addominale', 'Panca per lombari', 'Panca a 45°', 'Sbarra bassa o anelli'];
  const SERVE = { Sbarra: 'sbarra', Parallele: 'parallele', 'Ruota addominale': 'ruota', 'Sedia romana': 'sedia romana', 'Panca per lombari': 'sedia romana', 'Panca a 45°': 'sedia romana',
    Panca: 'panca', 'Sbarra bassa o anelli': 'sbarra|anelli' };
  LIB.forEach(e => {
    const n = pulito(e.name), a = ATTR[n], att = DETT[n][1];
    if (ATT[att] || CORPO.indexOf(att) !== -1) assert.strictEqual(a.attrezzo, ATT[att] || 'corpo', n + ': DETTAGLI dice «' + att + '»');   /* un attrezzo nuovo di W1-T5: lo decide chi lo aggiunge */
    assert.strictEqual(a.unilaterale, !!e.lato, n);
    if (SERVE[att]) assert.ok(a.serve.indexOf(SERVE[att]) !== -1, n + ': DETTAGLI «' + att + '» ma serve ' + JSON.stringify(a.serve));
    if (a.attrezzo !== 'corpo') assert.ok(a.serve.indexOf('sbarra') === -1 && a.serve.indexOf('parallele') === -1, n);
  });
  assert.deepStrictEqual(J('serveAttrezzo("💪 Dip alle Parallele")'), ['parallele']);
  assert.deepStrictEqual(J('serveAttrezzo("Trazioni alla Sbarra (Pull-ups)")'), ['sbarra']);
  assert.deepStrictEqual(J('serveAttrezzo("Nordic Curl")'), ['ancoraggio']);
  assert.deepStrictEqual(J('serveAttrezzo("Ab Wheel")'), ['ruota']);
  assert.deepStrictEqual(J('serveAttrezzo("Plank")'), []);
  assert.deepStrictEqual(J('serveAttrezzo("Rematore Inverso (Corpo Libero)")'), ['sbarra|anelli']);
  assert.strictEqual(ATTR['Scrollate (Shrug)'].attrezzo, 'bilanciere', 'P13: DETTAGLI dice bilanciere (attrezzoDi dice manubri)');
  assert.ok(ATTR['Squat con Bilanciere'].setup > ATTR['Alzate Laterali'].setup && ATTR['Plank'].setup <= ATTR['Alzate Laterali'].setup, 'setup per classe (CAS-05)');
});

/* ---------------------------------------------------------------------------------------------------------------- confronto con le vecchie tabelle */
/* Differenze volute rispetto a tipoCarico, stabile, attrezzoDi, RISCHIO e STRESS_ZONA, per i 140 esercizi di W1-T2: [tabella, esercizio, dettaglio, motivo].
   La prova calcola le differenze vere e le confronta con questo elenco in tutte e due le direzioni: una differenza nuova o sparita va spiegata qui.
   STRESS_ZONA elencava gli esercizi che caricano di più ogni articolazione (per scegliere la variante del dolore); l'elenco esperto del collaudo
   è un'altra cosa (cosa togliere con un fastidio dichiarato): quasi tutte le righe STRESS_ZONA sono esercizi che l'elenco del collaudo aggiunge. */
const DIFFERENZE = [
  ['tipoCarico', 'Panca Presa Stretta', 'macchina → classe A', 'barra libera con carico pesante: classe A (metodi §3.1); tipoCarico la riconosceva solo dal nome'],
  ['tipoCarico', 'Rematore Presa Inversa (Yates)', 'macchina → classe A', 'barra libera con carico pesante: classe A (metodi §3.1); tipoCarico la riconosceva solo dal nome'],
  ['stabile', 'Piegamenti a Terra (Push-up)', 'false → stabilita 1', 'senza carico il cedimento non espone: piegamenti a cedimento pieno (casa §4.4)'],
  ['stabile', 'Croci su Panca Manubri', 'true → stabilita 2', 'manubri liberi sopra il petto: almeno 1 ripetizione in riserva (casa §4.4)'],
  ['stabile', 'T-Bar Row', 'true → stabilita 2', 'barra carica con il busto inclinato: classe A (metodi §3.1), almeno 1 in riserva'],
  ['stabile', 'French Press', 'true → stabilita 2', 'barra EZ sopra la fronte: almeno 1 in riserva'],
  ['stabile', 'Piegamenti Inclinati (Mani Rialzate)', 'false → stabilita 1', 'come i piegamenti a terra (casa §4.4)'],
  ['stabile', 'Rematore Inverso (Corpo Libero)', 'false → stabilita 1', 'rematori inversi a cedimento pieno (casa §4.4)'],
  ['stabile', 'Squat a Corpo Libero', 'false → stabilita 1', 'senza carico il cedimento non espone (B33)'],
  ['stabile', 'Nordic Curl', 'true → stabilita 2', 'discesa libera, senza controllo a fine corsa (bio §3.5)'],
  ['stabile', 'Ponte Glutei a una Gamba', 'true → stabilita 2', 'un appoggio solo: equilibrio'],
  ['stabile', 'Farmer Walk', 'true → stabilita 2', 'camminata con un carico per lato: equilibrio e presa'],
  ['stabile', 'Rematore con Petto Appoggiato', 'false → stabilita 1', 'petto appoggiato: nessun carico sulla schiena e nessun equilibrio (bio §3.2)'],
  ['stabile', 'Squat al Multipower', 'true → stabilita 2', 'guidato ma con il carico sulla schiena: serve il gancio di sicurezza (casa §4.4)'],
  ['stabile', 'Affondi al Multipower (Piede Rialzato)', 'true → stabilita 2', 'guidato ma unilaterale con il piede rialzato'],
  ['stabile', 'Leg Raise alla Sbarra', 'true → stabilita 2', 'appeso: la presa cede prima dell’addome'],
  ['stabile', 'Ab Wheel', 'true → stabilita 2', 'estensione massima: i lombari cedono prima (bio §6)'],
  ['stabile', 'Piegamenti a Diamante', 'false → stabilita 1', 'come i piegamenti a terra (casa §4.4)'],
  ['stabile', 'Calf Raise a un Piede (Corpo Libero)', 'true → stabilita 2', 'un appoggio solo su un gradino'],
  ['stabile', 'Sissy Squat', 'true → stabilita 2', 'ginocchia in avanti con un solo appoggio della mano'],
  ['stabile', 'Pullover con Manubrio', 'true → stabilita 2', 'manubrio sopra il viso a braccia quasi tese'],
  ['attrezzoDi', 'Scrollate (Shrug)', 'manubri → bilanciere', 'P13: DETTAGLI dice bilanciere; la versione coi manubri arriva con W1-T5'],
  ['RISCHIO', 'Panca Piana Bilanciere', 'spalla: lo toglie → stress 1', 'cautela, non divieto: l’elenco del collaudo la tiene in cautela per la spalla'],
  ['RISCHIO', 'Piegamenti Declinati (Piedi Rialzati)', 'spalla: lo toglie → stress 1', 'W0-T7 (dopo la base di W1-T2): RISCHIO lo toglie con la spalla dolente perché a casa restano i piegamenti a terra e inclinati; l’elenco del collaudo lo tiene in cautela, come la panca piana (SAF-01 legge stress: la cautela non è un divieto)'],
  ['RISCHIO', 'Squat a Corpo Libero', 'ginocchio: lo toglie → stress 1', 'B13/B33: il ginocchio dolente si modifica, non si toglie (restano le eccezioni di RISCHIO)'],
  ['RISCHIO', 'Crunch a Terra', 'schiena: lo toglie → stress 1', 'SEL-11: preferenza prudente, non divieto (ricerca-recupero §3 schiena: D1); il collaudo lo tiene in cautela'],
  ['RISCHIO', 'Russian Twist', 'schiena: lo toglie → stress 1', 'SEL-11: preferenza prudente, non divieto; il collaudo lo tiene in cautela'],
  ['RISCHIO', 'Sit-up a Ginocchia Piegate', 'schiena: lo toglie → stress 1', 'SEL-11: preferenza prudente, non divieto; il collaudo lo tiene in cautela'],
  ['STRESS_ZONA', 'Pullover ai Cavi', 'spalla: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Front Squat', 'schiena: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Affondi Manubri', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Affondi in Camminata', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Affondi Bulgari', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Shoulder Press Machine', 'spalla: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Scrollate (Shrug)', 'collo: zona nuova → stress 1', 'ricerca-recupero §3 (collo): scrollate pesanti → versioni supportate o carichi ridotti'],
  ['STRESS_ZONA', 'Squat a Corpo Libero', 'ginocchio: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Affondi Inversi', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Affondi Inversi', 'ginocchio: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Nordic Curl', 'ginocchio: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Wall Sit', 'ginocchio: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Landmine Press', 'spalla: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Pendulum Squat', 'ginocchio: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Squat al Multipower', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Squat al Multipower', 'ginocchio: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Calf Raise alla Leg Press', 'caviglia: assente → stress 1', 'ricerca-recupero §3 (caviglia)'],
  ['STRESS_ZONA', 'Stacco con Trap Bar', 'schiena: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Stacco con Trap Bar', 'ginocchio: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Hyperextension a 45° per Glutei', 'schiena: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Affondi al Multipower (Piede Rialzato)', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Affondi al Multipower (Piede Rialzato)', 'ginocchio: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Crunch a Terra', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Crunch al Cavo', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Leg Raise alla Sbarra', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Leg Raise a Terra', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Russian Twist', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Mountain Climber', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Mountain Climber', 'ginocchio: assente → stress 1', 'ricerca-recupero §3 (ginocchio)'],
  ['STRESS_ZONA', 'Ab Wheel', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Rematore Presa Inversa (Yates)', 'schiena: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Sissy Squat', 'ginocchio: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Pike Push-up', 'spalla: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Dip alla Macchina (Tricipiti)', 'spalla: assente → stress 2', 'elenco esperto del collaudo (forte)'],
  ['STRESS_ZONA', 'Crunch alla Macchina', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Woodchop ai Cavi (Rotazioni)', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Leg Raise alla Sedia Romana', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  ['STRESS_ZONA', 'Sit-up a Ginocchia Piegate', 'schiena: assente → stress 1', 'elenco esperto del collaudo (cautela)'],
  /* dopo l'unione dell'onda 0 (W0-T5, B25): RISCHIO.spalle toglie anche i piegamenti declinati (caricano la spalla come la panca inclinata); l'elenco del collaudo li tiene in cautela */
  ['RISCHIO', 'Piegamenti Declinati (Piedi Rialzati)', 'spalla: lo toglie → stress 1', 'W0-T5: RISCHIO.spalle toglie i piegamenti declinati (caricano la spalla come la panca inclinata); l’elenco esperto del collaudo li tiene in cautela']
];

function differenzeVere() {
  const out = [];
  const SZ = J('STRESS_ZONA'), RISCHIO = { spalle: g('RISCHIO.spalle'), ginocchia: g('RISCHIO.ginocchia'), schiena: g('RISCHIO.schiena') };
  LIB.filter(e => NOMI_W1T2.indexOf(pulito(e.name)) !== -1).forEach(e => {
    const n = pulito(e.name), a = attr(n);
    const carico = g('tipoCarico')(e.name);
    if ({ pesante: ['A'], macchina: ['B', 'C'], isolamento: ['D', 'E', 'F'] }[carico].indexOf(a.classe) === -1) out.push(['tipoCarico', n, carico + ' → classe ' + a.classe]);
    const stabile = g('stabile')(e.name);
    if (stabile !== (a.stabilita === 1)) out.push(['stabile', n, stabile + ' → stabilita ' + a.stabilita]);
    const ad = g('attrezzoDi')(n), nuovo = { bilanciere: 'bilanciere', manubri: 'manubri', macchina: 'macchine', cavo: 'macchine' }[a.attrezzo] || 'corpo';
    if (ad !== nuovo) out.push(['attrezzoDi', n, ad + ' → ' + a.attrezzo]);
    Object.keys(RISCHIO).forEach(f => {
      const r = RISCHIO[f].test(n), s = a.stress[ZONA_DI_FASTIDIO[f]];
      if (r && s !== 2) out.push(['RISCHIO', n, ZONA_DI_FASTIDIO[f] + ': lo toglie → stress ' + s]);
      if (!r && s === 2) out.push(['RISCHIO', n, ZONA_DI_FASTIDIO[f] + ': non lo toglie → stress 2']);
    });
    ZONE.forEach(z => {
      const lista = SZ[z] ? SZ[z].indexOf(n) !== -1 : null, s = a.stress[z];
      if (lista === true && s === 0) out.push(['STRESS_ZONA', n, z + ': in lista → stress 0']);
      if (lista === false && s >= 1) out.push(['STRESS_ZONA', n, z + ': assente → stress ' + s]);
      if (lista === null && s >= 1) out.push(['STRESS_ZONA', n, z + ': zona nuova → stress ' + s]);
    });
  });
  return out;
}

test('confronto con tipoCarico, stabile, attrezzoDi, RISCHIO e STRESS_ZONA: le differenze sono tutte e solo quelle scritte, una riga ciascuna', () => {
  const chiave = r => r[0] + ' | ' + r[1] + ' | ' + r[2];
  const veri = differenzeVere().map(chiave).sort(), scritti = DIFFERENZE.map(chiave).sort();
  assert.deepStrictEqual(veri.filter(k => scritti.indexOf(k) === -1), [], 'differenze non spiegate (aggiungerle a DIFFERENZE con il motivo)');
  assert.deepStrictEqual(scritti.filter(k => veri.indexOf(k) === -1), [], 'differenze scritte che non esistono piu');
  DIFFERENZE.forEach(r => assert.ok(r.length === 4 && r[3].length > 10, 'motivo mancante: ' + chiave(r)));
  /* due righe note: tipoCarico non vedeva i bilancieri liberi che non stanno nell'elenco */
  assert.ok(DIFFERENZE.some(r => r[0] === 'tipoCarico' && r[1] === 'Rematore Presa Inversa (Yates)'));
});

/* ---------------------------------------------------------------------------------------------------------------- funzioni e conteggio del volume */
test('creditoMuscoli e classeTecnica rispondono dai dati', () => {
  assert.deepStrictEqual(J('creditoMuscoli("🦵 Leg Press")'), { quadricipiti: 1, grande_gluteo: 0.5, adduttori: 0, femorali: 0 });
  assert.strictEqual(J('classeTecnica("🎯 Pallof Press")'), 'F');
  assert.strictEqual(J('classeTecnica("T-Bar Row")'), 'A');
  /* la copia non cambia i dati */
  const c = J('creditoMuscoli("Leg Press")'); c.quadricipiti = 99;
  assert.strictEqual(J('creditoMuscoli("Leg Press")').quadricipiti, 1);
  assert.throws(() => g('(function(){ "use strict"; attributi("Leg Press").stress.spalla = 2; })()'), e => e && e.name === 'TypeError', 'le righe sono congelate');
});

test('contaVolume: serie frazionarie, dirette e sedute per unita, con conti fatti a mano', () => {
  const E = (name, sets) => ({ name, sets, reps: 10, weight: 20, rest: 90 });
  const sedute = [
    { giorno: 'Lunedì', tipo: 'upper', titolo: 'Upper', esercizi: [E('💪 Panca Piana Bilanciere', 4), E('🏹 Lat Machine', 3), E('🛡️ Alzate Laterali', 3)] },
    { giorno: 'Mercoledì', tipo: 'lower', titolo: 'Lower', esercizi: [E('🦵 Squat con Bilanciere', 4), E('🍑 Stacco Rumeno', 3), E('🦵 Leg Curl Seduto', 3)] },
    { giorno: 'Venerdì', tipo: 'upper', titolo: 'Upper', esercizi: [E('💪 Panca Inclinata Manubri', 3), E('🏹 Pulley Basso', 3), E('🦾 Curl ai Cavi', 2)] }
  ];
  const v = J('contaVolume(' + JSON.stringify(sedute) + ')');
  assert.deepStrictEqual(Object.keys(v), UNITA);
  const att = (u) => v[u];
  assert.deepStrictEqual(att('petto'), { frazionarie: 7, dirette: 7, sedute: 2 });
  assert.deepStrictEqual(att('deltoide_anteriore'), { frazionarie: 3.5, dirette: 0, sedute: 2 });   /* 4 x 0,5 + 3 x 0,5 */
  assert.deepStrictEqual(att('tricipiti'), { frazionarie: 3.5, dirette: 0, sedute: 2 });
  assert.deepStrictEqual(att('dorsali'), { frazionarie: 3 + 1.5, dirette: 3, sedute: 2 });   /* lat machine 3 il lunedi + il rematore (pulley basso 3 x 0,5) il venerdi: W1-T5, i rematori danno 0,5 ai dorsali */
  assert.deepStrictEqual(att('schiena_spessore'), { frazionarie: 3, dirette: 3, sedute: 1 });
  assert.deepStrictEqual(att('bicipiti'), { frazionarie: 5, dirette: 2, sedute: 2 });   /* lat 1,5 + pulley 1,5 + curl 2; il lunedi 1,5 e il venerdi 3,5 */
  assert.deepStrictEqual(att('deltoide_laterale'), { frazionarie: 3, dirette: 3, sedute: 1 });
  assert.deepStrictEqual(att('quadricipiti'), { frazionarie: 4, dirette: 4, sedute: 1 });   /* i femorali dello squat non contano, il rumeno non da quadricipiti */
  assert.deepStrictEqual(att('femorali'), { frazionarie: 3 + 1.5, dirette: 3, sedute: 1 });
  assert.deepStrictEqual(att('grande_gluteo'), { frazionarie: 2 + 3, dirette: 3, sedute: 1 });   /* squat 4 x 0,5 + rumeno 3 */
  assert.deepStrictEqual(att('adduttori'), { frazionarie: 2, dirette: 0, sedute: 1 });
  /* una serie sola dell'indiretto non fa «allenare» l'unita (soglia 1,5 serie frazionarie) */
  assert.strictEqual(J('contaVolume([[{ name: "Leg Press", sets: 3 }]], { minSerie: 1 })').grande_gluteo.sedute, 1);
  assert.strictEqual(J('contaVolume([[{ name: "Hack Squat", sets: 2 }]])').grande_gluteo.sedute, 0);
  assert.strictEqual(J('contaVolume([[{ name: "Hack Squat", sets: 3 }]])').grande_gluteo.sedute, 1);
  assert.deepStrictEqual(J('contaVolume([{ es: [{ nome: "Plank", serie: 3 }, { name: "Esercizio Inventato", sets: 9 }, { name: "Plank", sets: 0 }] }])').addome, { frazionarie: 3, dirette: 3, sedute: 1 });
  assert.deepStrictEqual(J('contaVolume()').petto, { frazionarie: 0, dirette: 0, sedute: 0 });
});

test('contaVolume su programmi veri: ogni esercizio generato ha gli attributi e i conti tornano', () => {
  const profili = [];
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [2, 4, 6].forEach(days => ['palestra', 'manubri', 'corpo'].forEach(luogo =>
    profili.push({ goals: ['massa'], level, days, minutes: 60, luogo, fastidi: [], sex: 'M', age: 30, seme: 'audit' }))));
  profili.push({ goals: ['dimagrimento'], level: 'intermedio', days: 3, minutes: 45, luogo: 'palestra', fastidi: ['spalle', 'schiena'], sex: 'F', age: 40, seme: 'audit' });
  let esercizi = 0;
  profili.forEach(p => {
    const prog = J('buildProgram(' + JSON.stringify(p) + ')');
    const v = J('contaVolume(' + JSON.stringify(prog.sedute) + ')');
    const calcolato = {};
    UNITA.forEach(u => { calcolato[u] = 0; });
    prog.sedute.forEach(s => s.esercizi.forEach(e => {
      esercizi++;
      const a = ATTR[pulito(e.name)];
      assert.ok(a, 'esercizio generato senza attributi: ' + e.name + ' (' + JSON.stringify(p) + ')');
      Object.keys(a.muscoli).forEach(u => { calcolato[u] += e.sets * a.muscoli[u]; });
    }));
    UNITA.forEach(u => {
      assert.strictEqual(v[u].frazionarie, calcolato[u], u + ' ' + JSON.stringify(p));
      assert.ok(v[u].dirette <= v[u].frazionarie, u);
      assert.ok(v[u].sedute <= prog.sedute.length, u);
    });
  });
  assert.ok(esercizi > 300);
});
