/* Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso).
   B9 «Dura» non e uno scarico (MES-08); B13/B33 ginocchio (REC-04 ponte); B14 la variante per il dolore allena lo stesso muscolo (DEC-03);
   B25 buchi di RISCHIO (SAF-01, SEL-11); B28 attrezzi che a casa non ci sono (CAS-01 guardia); B31 respiro degli over 65 (REC-06 parte a);
   B32 croci alla pari (BIO-05, D-P8); B21 principiante 8 settimane con scarico solo all 8a (PRN-03 ponte, D-P5).
   Le regole bloccate (REC-06 parte b: pressione alta) non sono qui: non si implementano. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conSoglieStruttura, senzaSoglie } = require('./aiuto-mesociclo');

const ORA = '2026-10-05T12:00:00';
const BASE = { luogo: 'palestra', fastidi: [], attrezzi: 'indifferente', graditi: [], odiati: [] };
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
const IN_VM = (app, x) => app.g('JSON.parse(' + JSON.stringify(JSON.stringify(x)) + ')');

/* una risposta del questionario di fine seduta (le risposte sRPE sono 3 / 6 / 8 / 10: Facile, Giusta, Dura, Al limite) */
const FACILE = 3, GIUSTA = 6, DURA = 8, AL_LIMITE = 10;
const fbSeduta = (srpe, arrivo, extra) => Object.assign({ srpe, arrivo: arrivo || 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, coinvolti: [], esercizi: [] }, extra || {});
const tipi = dec => dec.map(d => d.tipo);

function decidi(app, fb, prec, prefs) {
  app.ctx.__fb = IN_VM(app, fb); app.ctx.__prec = IN_VM(app, prec || []); app.ctx.__prefs = IN_VM(app, prefs || BASE);
  return app.dati(app.g('decisioniCoach(__fb, __prec, __prefs)'));
}
/* `mondo` = un documento finto che ricorda l HTML scritto: serve a leggere le risposte offerte dal questionario */
function documentoFinto() {
  const els = {};
  return { els, getElementById: id => els[id] || (els[id] = { classList: { add() {}, remove() {} }, style: {}, innerText: '', disabled: false, onclick: null, innerHTML: '' }), querySelector: () => null };
}

test('MES-08 (B9): Dura, Dura, Giusta non e uno scarico; Al limite due volte su tre si', () => {
  const app = caricaApp({ ora: ORA });
  /* l ultima seduta e la prima della lista: Dura (oggi), Dura (ieri), Giusta */
  assert.ok(!tipi(decidi(app, fbSeduta(DURA), [fbSeduta(DURA), fbSeduta(GIUSTA)])).includes('scarico'), 'Dura, Dura, Giusta: nessuno scarico');
  assert.ok(!tipi(decidi(app, fbSeduta(DURA), [fbSeduta(DURA), fbSeduta(DURA)])).includes('scarico'), 'Dura per tre sedute senza essere stanchi: nessuno scarico');
  assert.ok(tipi(decidi(app, fbSeduta(AL_LIMITE), [fbSeduta(AL_LIMITE), fbSeduta(GIUSTA)])).includes('scarico'), 'Al limite x2: scarico');
  assert.ok(!tipi(decidi(app, fbSeduta(AL_LIMITE), [fbSeduta(GIUSTA), fbSeduta(GIUSTA)])).includes('scarico'), 'Al limite una volta su tre: niente scarico');
  /* una seduta Dura con arrivo stanco pesa; stanco ma facile o giusta no */
  assert.ok(tipi(decidi(app, fbSeduta(DURA, 'stanco'), [fbSeduta(DURA, 'stanco'), fbSeduta(GIUSTA)])).includes('scarico'), 'Dura e stanco x2: scarico');
  assert.ok(!tipi(decidi(app, fbSeduta(GIUSTA, 'stanco'), [fbSeduta(FACILE, 'stanco'), fbSeduta(GIUSTA, 'stanco')])).includes('scarico'), 'stanco ma Giusta o Facile: niente scarico');
  /* le vecchie risposte 9 (Dura prima dell onda 0) contano come 8 */
  assert.ok(!tipi(decidi(app, fbSeduta(9), [fbSeduta(9), fbSeduta(7)])).includes('scarico'), 'vecchio 9, vecchio 9, vecchio 7: niente scarico');
  assert.ok(tipi(decidi(app, fbSeduta(9, 'stanco'), [fbSeduta(9, 'stanco'), fbSeduta(7)])).includes('scarico'), 'vecchio 9 e stanco x2: scarico');
  /* tre su quattro pesanti: si propone di togliere un giorno; tre Dura no */
  assert.ok(tipi(decidi(app, fbSeduta(AL_LIMITE), [fbSeduta(AL_LIMITE), fbSeduta(AL_LIMITE), fbSeduta(GIUSTA)])).includes('frequenza'));
  assert.ok(!tipi(decidi(app, fbSeduta(DURA), [fbSeduta(DURA), fbSeduta(DURA), fbSeduta(DURA)])).includes('frequenza'));
  /* carichi pesanti e Dura (anche il vecchio 9): nessun aumento la prossima volta; Giusta no */
  assert.ok(tipi(decidi(app, fbSeduta(DURA, 'normale', { carichi: 'pesanti' }), [])).includes('blocca'));
  assert.ok(tipi(decidi(app, fbSeduta(9, 'normale', { carichi: 'pesanti' }), [])).includes('blocca'));
  assert.ok(!tipi(decidi(app, fbSeduta(GIUSTA, 'normale', { carichi: 'pesanti' }), [])).includes('blocca'));
  /* carichi leggeri e seduta facile: un aumento in piu (invariato) */
  assert.ok(tipi(decidi(app, fbSeduta(FACILE, 'normale', { carichi: 'leggeri' }), [])).includes('extra'));
  assert.deepStrictEqual(app.errori, []);
});

test('MES-08: il questionario offre le risposte 3 / 6 / 8 / 10', () => {
  const app = caricaApp({ ora: ORA });
  const doc = documentoFinto();
  app.ctx.document = doc;
  app.g("apriQuestionario({ id: 1, day: 'Lunedì', sessione: [] })");
  const html = doc.els['fb-body'].innerHTML;
  const valori = [...html.matchAll(/fbSet\('srpe', (\d+)\)/g)].map(m => Number(m[1]));
  assert.deepStrictEqual(valori, [3, 6, 8, 10]);
  ['Facile', 'Giusta', 'Dura', 'Al limite'].forEach(e => assert.ok(html.indexOf('<b>' + e + '</b>') !== -1, e));
});

test('DEC-03 (B14): per ogni voce di STRESS_ZONA la variante ha lo stesso muscolo bersaglio, o resta lo stesso esercizio a -20%, mai un altro muscolo', () => {
  const app = caricaApp({ ora: ORA });
  const STRESS = app.json('STRESS_ZONA');
  const lib = app.json('EXERCISE_LIBRARY.map(e => e.name)');
  const nomeLib = p => lib.find(n => pulito(n) === p);
  const bers = n => app.g('bersaglioDi')(n), fam = n => app.g('famigliaTotaleDi')(n);
  const NOTA = 'ampiezza senza dolore, discesa in 3 s';
  const profili = [
    ['palestra', BASE], ['casa con i manubri', Object.assign({}, BASE, { luogo: 'manubri' })],
    ['corpo libero', Object.assign({}, BASE, { luogo: 'corpo' })], ['palestra con soli pesi liberi', Object.assign({}, BASE, { attrezziPalestra: ['bilanciere', 'manubri'] })]
  ];
  const REGIONE = { spalla: 'spalle', ginocchio: 'ginocchia', schiena: 'schiena' };
  let sostituzioni = 0, scontati = 0;
  profili.forEach(([nomeProfilo, prefs]) => Object.keys(STRESS).forEach(z => STRESS[z].forEach(pul => {
    const n = nomeLib(pul);
    assert.ok(n, 'STRESS_ZONA.' + z + ': ' + pul + ' non e nella libreria');
    const dec = decidi(app, { srpe: GIUSTA, arrivo: 'normale', carichi: 'giusti', dolore: true, zone: [z], livello: 7, coinvolti: [n], esercizi: [n] }, [], prefs)
      .filter(d => d.tipo === 'sostituisci' || d.tipo === 'carico');
    const ctx = nomeProfilo + ' / ' + z + ' / ' + pul;
    assert.strictEqual(dec.length, 1, ctx + ': una decisione per esercizio');
    const d = dec[0];
    assert.strictEqual(d.esercizio, n, ctx);
    if (d.tipo === 'sostituisci') {
      sostituzioni++;
      assert.notStrictEqual(d.variante, n, ctx + ': la variante e un altro esercizio');
      if (fam(n)) assert.strictEqual(fam(d.variante), fam(n), ctx + ' -> ' + pulito(d.variante) + ': stessa famiglia del multiarticolare totale');
      else {
        assert.strictEqual(bers(d.variante), bers(n), ctx + ' -> ' + pulito(d.variante) + ': stesso bersaglio');
        assert.strictEqual(fam(d.variante), '', ctx + ' -> ' + pulito(d.variante) + ': non un multiarticolare totale');
      }
      assert.ok(STRESS[z].indexOf(pulito(d.variante)) === -1, ctx + ' -> ' + pulito(d.variante) + ': e tra quelli che caricano di piu la zona');
      const conZona = Object.assign({}, prefs, { fastidi: (prefs.fastidi || []).concat(REGIONE[z] ? [REGIONE[z]] : []) });
      assert.strictEqual(app.chiama('consentito', d.variante, IN_VM(app, conZona)), true, ctx + ' -> ' + pulito(d.variante) + ': attrezzi e fastidi consentiti');
    } else {
      scontati++;
      assert.strictEqual(d.fattore, 0.8, ctx + ': -20%');
      assert.strictEqual(d.nota, NOTA, ctx);
      assert.ok(d.testo.indexOf('carico -20%') !== -1 && d.testo.indexOf(NOTA) !== -1, ctx + ': ' + d.testo);
    }
  })));
  assert.ok(sostituzioni > 150 && scontati > 20, 'la prova non e vuota: ' + sostituzioni + ' sostituzioni, ' + scontati + ' scontati');
  /* la vecchia tabella (squat -> hip thrust, stacco -> hip thrust, dip -> pushdown) non c e piu */
  assert.strictEqual(app.g("typeof SOSTITUZIONI"), 'undefined');
  assert.deepStrictEqual(app.errori, []);
});

test('DEC-03: gli esempi della matrice (stacco con la schiena, squat con il ginocchio) e le soglie del dolore', () => {
  const app = caricaApp({ ora: ORA });
  const lib = app.json('EXERCISE_LIBRARY.map(e => e.name)');
  const nomeLib = p => lib.find(n => pulito(n) === p);
  const dolore = (zona, livello, n, prefs, prec) => decidi(app, { srpe: GIUSTA, arrivo: 'normale', carichi: 'giusti', dolore: true, zone: [zona], livello, coinvolti: [nomeLib(n)], esercizi: [nomeLib(n)] }, prec || [], prefs || BASE);
  /* stacco da terra con la schiena: tutti gli stacchi sono a rischio, niente hip thrust al suo posto: stesso esercizio -20% con la nota */
  const stacco = dolore('schiena', 7, 'Stacco da Terra (Deadlift)').find(d => d.tipo === 'carico');
  assert.ok(stacco && stacco.fattore === 0.8 && /ampiezza senza dolore, discesa in 3 s/.test(stacco.testo));
  /* squat con il ginocchio: mai hip thrust (un altro muscolo) */
  const squat = dolore('ginocchio', 7, 'Squat con Bilanciere').find(d => d.tipo === 'sostituisci' || d.tipo === 'carico');
  assert.notStrictEqual(squat.variante && pulito(squat.variante), 'Hip Thrust');
  assert.ok(squat.tipo === 'carico' || app.g('bersaglioDi')(squat.variante) === 'quadricipiti');
  /* 4-5/10 la prima volta: -10% come prima, senza nota; se e tornato nella stessa zona (>= 4/10): variante o -20% */
  const lieve = dolore('spalla', 5, 'Military Press').find(d => d.tipo === 'carico');
  assert.ok(lieve && lieve.fattore === 0.9 && !lieve.nota && lieve.testo.indexOf('ampiezza') === -1);
  const tornato = dolore('spalla', 5, 'Military Press', BASE, [{ dolore: true, zone: ['spalla'], livello: 4, srpe: GIUSTA, arrivo: 'normale', carichi: 'giusti' }]);
  assert.ok(tornato.some(d => d.tipo === 'sostituisci' || (d.tipo === 'carico' && d.fattore === 0.8)));
  /* fino a 3/10 si continua; da 6/10 c e anche il rinvio al medico (invariato) */
  assert.ok(dolore('spalla', 3, 'Military Press').every(d => d.tipo === 'osserva' || d.tipo === 'ok'));
  assert.ok(dolore('spalla', 7, 'Military Press').some(d => d.tipo === 'medico' && /medico o da un fisioterapista/.test(d.testo)));
  assert.deepStrictEqual(app.errori, []);
});

test('DEC-03: la variante non finisce due volte nello stesso giorno; da un esercizio a ripetizioni a uno a tempo cambia il bersaglio; Annulla ripristina tutto', () => {
  const app = caricaApp({ ora: ORA });
  const lib = app.json('EXERCISE_LIBRARY.map(e => e.name)');
  const nomeLib = p => lib.find(n => pulito(n) === p);
  const squat = nomeLib('Squat con Bilanciere'), wall = nomeLib('Wall Sit');
  const piano = (nomi) => ({ 'Lunedì': nomi.map(n => ({ name: n, sets: 3, reps: 8, weight: 60, rest: 120, completedSets: [] })) });
  const scrivi = (nomi) => app.scrivi(app.g('dataKey()'), app.dati(app.g('(() => { const d = {}; const src = ' + JSON.stringify(piano(nomi)) + '; DAYS.forEach(g => { d[g] = (src[g] || []).map(normalizeExerciseRecord); }); return d; })()')));
  const fb = { srpe: GIUSTA, arrivo: 'normale', carichi: 'giusti', dolore: true, zone: ['ginocchio'], livello: 7, coinvolti: [squat], esercizi: [squat] };
  /* con il ginocchio a posto del Wall Sit non c e altro: e la variante */
  scrivi([squat]);
  app.ctx.__fb = IN_VM(app, fb);
  const dec = app.g('decisioniCoach(__fb, [], ' + JSON.stringify(BASE) + ')');
  const sost = app.dati(dec).find(d => d.tipo === 'sostituisci');
  assert.ok(sost && pulito(sost.variante) === 'Wall Sit', 'Wall Sit');
  const chiavi = [app.g('dataKey()'), app.g('AGG_KEY()'), app.g('restKey()')];
  const prima = chiavi.map(k => app.store[k]);
  app.ctx.__dec = dec;
  const annulla = app.g('applicaDecisioni(__dec, __fb)');
  const e = app.pianoSalvato()['Lunedì'][0];
  assert.strictEqual(e.name, wall);
  assert.strictEqual(e.reps, app.g('findExercise')(wall).reps, 'il bersaglio e quello del wall sit (secondi), non 8');
  assert.ok(e.completedSets.every(s => s.reps === e.reps && !s.done));
  annulla();
  assert.deepStrictEqual(chiavi.map(k => app.store[k]), prima, 'Annulla: piano, aggiusti e riposi identici');
  /* il Wall Sit e gia in quel giorno: la variante non si ripete, resta lo stesso esercizio a -20% con la nota */
  scrivi([squat, wall]);
  const dec2 = app.dati(app.g('decisioniCoach(__fb, [], ' + JSON.stringify(BASE) + ')'));
  assert.ok(!dec2.some(d => d.tipo === 'sostituisci' && d.variante === wall), 'niente doppione nello stesso giorno');
  assert.ok(dec2.some(d => d.tipo === 'carico' && d.esercizio === squat && d.nota));
  /* applicato, il -20% porta la nota anche nel motivo che si legge in seduta */
  app.ctx.__dec = IN_VM(app, dec2);
  app.g('applicaDecisioni(__dec, __fb)');
  const ag = app.json('aggiustiCoach()');
  assert.strictEqual(ag.esercizi[squat].fattore, 0.8);
  assert.ok(/ampiezza senza dolore, discesa in 3 s/.test(ag.esercizi[squat].motivo), ag.esercizi[squat].motivo);
  assert.deepStrictEqual(app.errori, []);
});

test('SAF-01 / SEL-11 (B25): i buchi di RISCHIO sono chiusi', () => {
  const app = caricaApp({ ora: ORA });
  const C = (n, p) => app.chiama('consentito', n, IN_VM(app, Object.assign({}, BASE, p)));
  assert.strictEqual(C('Pike Push-up', { fastidi: ['spalle'] }), false, 'spalle + Pike Push-up');
  ['Front Squat', 'Rematore Presa Inversa (Yates)', 'Sit-up a Ginocchia Piegate', 'Russian Twist', 'Crunch a Terra']
    .forEach(n => assert.strictEqual(C(n, { fastidi: ['schiena'] }), false, 'schiena + ' + n));
  /* con la schiena sensibile restano i lavori «anti» */
  ['Plank', 'Dead Bug', 'Bird Dog', 'Plank Laterale', 'Pallof Press'].forEach(n => assert.strictEqual(C(n, { fastidi: ['schiena'] }), true, 'schiena + ' + n));
  /* senza il fastidio niente cambia */
  ['Pike Push-up', 'Front Squat', 'Russian Twist'].forEach(n => assert.strictEqual(C(n, { luogo: 'corpo' }) || C(n, {}), true, n));
  /* non si e allentato quel che c era: squat sumo e squat col bilanciere restano fuori con le ginocchia dolenti */
  assert.strictEqual(C('Squat Sumo', { fastidi: ['ginocchia'] }), false);
  assert.strictEqual(C('Squat con Bilanciere', { fastidi: ['ginocchia'] }), false);
  /* nessun programma con un fastidio contiene un esercizio vietato (griglia piccola, seme fisso) */
  const RX = { spalle: /military|lento avanti|arnold|tirate al mento|dip|panca piana bilanciere|pullover|shoulder press|pike/i, schiena: /stacco|good morning|rematore con bilanciere|squat con bilanciere|hyperextension|t-bar|front squat|yates|rematore presa inversa|sit-up|russian twist|crunch a terra/i };
  let programmi = 0;
  ['palestra', 'manubri', 'corpo'].forEach(luogo => ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 5].forEach(days => ['spalle', 'schiena'].forEach(f => {
    const p = app.dati(app.chiama('buildProgram', { goals: ['massa'], level, days, minutes: 60, luogo, fastidi: [f], sex: 'M', age: 30, seme: 'sic|' + luogo + level + days + f, parq: 'no' }));
    programmi++;
    p.sedute.forEach(s => s.esercizi.forEach(e => assert.ok(!RX[f].test(pulito(e.name)), luogo + '/' + level + '/' + f + ': ' + e.name)));
  }))));
  assert.strictEqual(programmi, 36);
  assert.deepStrictEqual(app.errori, []);
});

test('REC-04 ponte (B13/B33): con le ginocchia dolenti restano i quadricipiti, anche a casa', () => {
  const app = caricaApp({ ora: ORA });
  const C = (n, p) => app.chiama('consentito', n, IN_VM(app, Object.assign({}, BASE, { fastidi: ['ginocchia'] }, p)));
  /* leg extension e leg press non sono piu tolte (la nota di SCALE_DOLORE dice come farle); il resto dello squat e degli affondi si */
  assert.strictEqual(C('Leg Extension', {}), true);
  assert.strictEqual(C('Leg Press', {}), true);
  ['Hack Squat', 'Affondi Manubri', 'Step-up su Panca', 'Affondi Bulgari', 'Goblet Squat', 'Front Squat'].forEach(n => assert.strictEqual(C(n, {}), false, n));
  /* senza macchine (casa, o palestra di soli pesi liberi) passa lo squat a corpo libero; con le macchine no, c e la leg press */
  assert.strictEqual(C('Squat a Corpo Libero', { luogo: 'corpo' }), true);
  assert.strictEqual(C('Squat a Corpo Libero', { luogo: 'manubri' }), true);
  assert.strictEqual(C('Squat a Corpo Libero', { attrezziPalestra: ['bilanciere', 'manubri'] }), true);
  assert.strictEqual(C('Squat a Corpo Libero', {}), false);
  assert.strictEqual(C('Wall Sit', { luogo: 'corpo' }), true);
  /* la nota di modifica c e (SCALE_DOLORE) e parla di ampiezza senza dolore */
  assert.ok(/profondità senza dolore/.test(app.json('SCALE_DOLORE').ginocchia));
  /* programmi veri: ogni profilo con le ginocchia dolenti ha almeno un esercizio con bersaglio quadricipiti (collaudo MIS-01) e la nota */
  let n = 0;
  [['palestra', null], ['palestra', ['bilanciere', 'manubri', 'sbarra']], ['manubri', null], ['corpo', null]].forEach(([luogo, attrezziPalestra]) => ['principiante', 'intermedio', 'avanzato'].forEach(level => [2, 3, 5].forEach(days => [30, 60].forEach(minutes => {
    const d = { goals: ['massa'], level, days, minutes, luogo, fastidi: ['ginocchia'], sex: 'F', age: 35, seme: 'gin|' + luogo + level + days + minutes, parq: 'no' };
    if (attrezziPalestra) d.attrezziPalestra = attrezziPalestra;
    const p = app.dati(app.chiama('buildProgram', d));
    n++;
    const nomi = [].concat(...p.sedute.map(s => s.esercizi.map(e => e.name)));
    assert.ok(nomi.some(x => app.g('bersaglioDi')(x) === 'quadricipiti'), luogo + '/' + level + '/' + days + '/' + minutes + ': nessun quadricipite in ' + nomi.map(pulito).join(', '));
    assert.ok(p.note.some(x => /^Ginocchia:/.test(x)), 'la nota delle ginocchia nel programma');
  }))));
  assert.strictEqual(n, 72);
  assert.deepStrictEqual(app.errori, []);
});

test('CAS-01 guardia (B28): a casa senza sbarra, parallele, sedia romana o panca per lombari non entra nulla che li richieda', () => {
  const app = caricaApp({ ora: ORA });
  const C = (n, luogo, extra) => app.chiama('consentito', n, IN_VM(app, Object.assign({}, BASE, { luogo }, extra || {})));
  const richiedono = ['Trazioni alla Sbarra (Pull-ups)', 'Trazioni Presa Neutra', 'Trazioni Presa Inversa (Chin-up)', 'Dip alle Parallele', 'Leg Raise alla Sedia Romana',
    'Hyperextension (Lombari)', 'Hyperextension a 45° per Glutei', 'Leg Raise alla Sbarra', 'Ab Wheel'];
  richiedono.forEach(n => {
    assert.strictEqual(C(n, 'manubri'), false, 'manubri: ' + n);
    assert.strictEqual(C(n, 'corpo'), false, 'corpo: ' + n);
    assert.strictEqual(C(n, 'palestra'), true, 'in palestra restano: ' + n);
  });
  /* l attrezzo e quello di DETTAGLI: tutti gli esercizi di casa con quegli attrezzi sono fuori */
  const ATT = /^(sbarra|parallele|sedia romana|panca per lombari|panca a 45°|ruota addominale)$/i;
  const fuori = app.json('EXERCISE_LIBRARY.map(e => ({ n: e.name, att: (dettaglioEsercizio(e.name) || {}).att || "" }))').filter(x => ATT.test(x.att));
  assert.ok(fuori.length >= 9, 'attrezzi riconosciuti: ' + fuori.length);
  fuori.forEach(x => ['manubri', 'corpo'].forEach(l => assert.strictEqual(C(x.n, l), false, l + ': ' + x.n)));
  /* il rematore inverso (sbarra bassa o anelli) resta a corpo libero: e l unica tirata orizzontale senza manubri; con i manubri c e il rematore */
  assert.strictEqual(C('Rematore Inverso (Corpo Libero)', 'corpo'), true);
  assert.strictEqual(C('Rematore Inverso (Corpo Libero)', 'manubri'), false);
  assert.strictEqual(C('Rematore con Manubrio', 'manubri'), true);
  /* chi ha dichiarato gli attrezzi della palestra con la sbarra continua ad averla (invariato) */
  assert.strictEqual(C('Trazioni alla Sbarra (Pull-ups)', 'palestra', { attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'] }), true);
  /* programmi veri: a casa nessuna trazione e nessun attrezzo fuori elenco (griglia con seme fisso) */
  let n = 0;
  ['manubri', 'corpo'].forEach(luogo => ['principiante', 'intermedio', 'avanzato'].forEach(level => [2, 3, 4, 6].forEach(days => [30, 60, 90].forEach(minutes => ['massa', 'forza', 'dimagrimento'].forEach(goal => {
    const p = app.dati(app.chiama('buildProgram', { goals: [goal], level, days, minutes, luogo, fastidi: [], sex: 'F', age: 40, seme: 'casa|' + luogo + level + days + minutes + goal, parq: 'no' }));
    n++;
    p.sedute.forEach(s => s.esercizi.forEach(e => {
      assert.ok(!/trazioni|dip alle parallele|hyperextension|sedia romana|ab wheel|leg raise alla sbarra/i.test(pulito(e.name)), luogo + ': ' + e.name);
      const att = (app.json('dettaglioEsercizio(' + JSON.stringify(e.name) + ')') || {}).att || '';
      assert.ok(!ATT.test(att), luogo + ': ' + e.name + ' [' + att + ']');
    }));
  })))));
  assert.strictEqual(n, 216);
  assert.deepStrictEqual(app.errori, []);
});

test('REC-06 parte a (B31): niente apnea per chi ha 65 anni o piu, come per il PAR-Q positivo', () => {
  const comp = (profilo) => { const app = caricaApp({ ora: ORA }); app.profilo(profilo); return { app, t: app.g("respiroPer('compound')") }; };
  const apnea = /Valsalva|trattenere il fiato 1–2 secondi/;
  const PRUDENTE = 'Non trattenere il fiato: espira mentre sollevi, inspira in discesa. Carichi moderati, 8–12 ripetizioni.';
  assert.ok(apnea.test(comp({ age: 40, parq: false }).t), 'a 40 anni resta il testo con il Valsalva');
  assert.ok(apnea.test(comp({ age: 64, parq: false }).t), 'a 64 anni pure');
  assert.strictEqual(comp({ age: 65, parq: false }).t, PRUDENTE, 'a 65 anni');
  const settanta = comp({ age: 68, parq: false });
  assert.strictEqual(settanta.t, PRUDENTE, '68enne senza PAR-Q');
  assert.ok(!apnea.test(settanta.t));
  assert.strictEqual(comp({ age: '70', parq: false }).t, PRUDENTE, 'eta salvata come testo');
  assert.strictEqual(comp({ age: 30, parq: true }).t, PRUDENTE, 'PAR-Q positivo come prima');
  /* isolamenti e core non cambiano; senza profilo non si rompe */
  const app = settanta.app;
  assert.strictEqual(app.g("respiroPer('isolation')"), app.g('RESPIRO.isolation'));
  assert.strictEqual(app.g("respiroPer('core')"), app.g('RESPIRO.core'));
  assert.ok(apnea.test(caricaApp({ ora: ORA }).g("respiroPer('compound')")), 'senza profilo: testo di base');
  /* la scheda tecnica del fondamentale mostra il testo prudente */
  assert.deepStrictEqual(app.errori, []);
});

test('BIO-05 (B32, D-P8): le croci ai cavi non hanno piu il +0,5: cavi e manubri alla pari', () => {
  const app = caricaApp({ ora: ORA });
  const lib = app.json('EXERCISE_LIBRARY.map(e => e.name)');
  const croci = lib.filter(n => /croci/i.test(n));
  assert.ok(croci.length >= 4, 'croci in libreria: ' + croci.length);
  const bonus = n => app.g('bonusBiomecc')(app.g('findExercise')(n), 'isoPetto', {}, []);
  croci.forEach(n => assert.strictEqual(bonus(n), 0, n));
  assert.strictEqual(bonus(lib.find(n => /Croci ai Cavi$/.test(n))), bonus(lib.find(n => /Croci su Panca Manubri/.test(n))));
  /* il resto del BIO-05 non cambia: calf raise in piedi +1, caviglia rigida: hack e leg press +2 */
  assert.strictEqual(app.g('bonusBiomecc')(app.g('findExercise')(lib.find(n => /Calf Raise in Piedi/.test(n))), 'isoPolp', {}, []), 1);
  assert.strictEqual(app.g('bonusBiomecc')(app.g('findExercise')(lib.find(n => /Hack Squat/.test(n))), 'squat', { caviglia: 'no' }, []), 2);
});

test('PRN-03 (B21, D-P5, W2-T4): il principiante fa 12 settimane con lo scarico solo alla 12a, l intermedio blocchi 5+1; i prudenti non cambiano; senza soglie vale il ponte dell onda 0 (8 settimane)', () => {
  const app = conSoglieStruttura(caricaApp({ ora: ORA }));
  assert.deepStrictEqual(app.json("strutturaProgramma('principiante')"), { settimane: 12, blocco: 12 });
  assert.deepStrictEqual(app.json("fasiProgramma(strutturaProgramma('principiante'))"), Array(11).fill('carico').concat(['scarico']));
  /* prudente (over 65, PAR-Q, minorenne): 3+1 come prima; chi chiama deve passarlo */
  assert.deepStrictEqual(app.json("strutturaProgramma('principiante', true)"), { settimane: 8, blocco: 4 });
  assert.deepStrictEqual(app.json("fasiProgramma(strutturaProgramma('principiante', true))"), ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico']);
  assert.deepStrictEqual(app.json("strutturaProgramma('intermedio')"), { settimane: 12, blocco: 6 });
  assert.deepStrictEqual(app.json("strutturaProgramma('intermedio', true)"), { settimane: 12, blocco: 4 });
  assert.deepStrictEqual(app.json("strutturaProgramma('avanzato')"), { settimane: 12, blocco: 6 });
  /* buildProgram: 12 settimane, un solo scarico, alla fine; intermedi 5+1 e avanzati 5+1 */
  const prog = (level, a) => (a || app).dati((a || app).chiama('buildProgram', { goals: ['massa'], level, days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, seme: 'prn', parq: 'no' }));
  const scarichi = p => p.fasi.map((f, i) => f === 'scarico' ? i + 1 : null).filter(Boolean);
  const p = prog('principiante');
  assert.strictEqual(p.settimane, 12);
  assert.deepStrictEqual(scarichi(p), [12]);
  assert.deepStrictEqual(scarichi(prog('intermedio')), [6, 12]);
  assert.deepStrictEqual(scarichi(prog('avanzato')), [6, 12]);
  /* il ponte: senza il file delle soglie (o con PRN-03 spenta) 8 settimane con un solo scarico, all 8a; intermedio 3+1 */
  const v1 = senzaSoglie(caricaApp({ ora: ORA }));
  assert.deepStrictEqual(v1.json("strutturaProgramma('principiante')"), { settimane: 8, blocco: 8 });
  assert.deepStrictEqual(scarichi(prog('principiante', v1)), [8]);
  assert.deepStrictEqual(scarichi(prog('intermedio', v1)), [4, 8, 12]);
  assert.deepStrictEqual(scarichi(prog('avanzato', v1)), [6, 12]);
  /* nessun lettore del programma assume lo scarico alla 4a: l archivio vecchio e quello nuovo si leggono */
  assert.deepStrictEqual(app.errori, []);
});

test('PRN-03 ponte: un programma salvato prima dell onda 0 tiene le sue settimane di scarico', () => {
  const salvato = require('./aiuto-app').leggiFixture('principiante-donna-casa').chiavi.coach_plus_programma_toji;
  assert.deepStrictEqual(salvato.fasi, ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'], 'la fixture e un programma v1 (3+1)');
  [['2026-09-29T12:00:00', 4, 'scarico'], ['2026-10-05T12:00:00', 5, 'carico'], ['2026-10-27T12:00:00', 8, 'scarico']].forEach(([ora, settimana, fase]) => {
    const app = caricaApp({ ora, fixture: 'principiante-donna-casa' });
    app.ora(ora);
    assert.deepStrictEqual(app.json('getProgramma().fasi'), salvato.fasi, 'fasi salvate intatte');
    const st = app.json('settimanaProgramma()');
    assert.strictEqual(st.numero, settimana, ora);
    assert.strictEqual(st.fase, fase, 'settimana ' + settimana);
    assert.deepStrictEqual(app.errori, []);
  });
});
