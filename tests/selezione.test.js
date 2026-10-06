/* Scelta degli esercizi per attributi (W2-T6, versione snella): una prova per correzione, con i numeri di prima.
   M6      a 2 giorni e 30 minuti in palestra la settimana ha una flessione del ginocchio (EQ-03:flessione, secondoDiGambe e scalaDelTempo);
   SEL-06  abilita <= livello: chi inizia e i prudenti non ricevono esercizi di abilita 3 (un metodo famoso scelto dall utente porta i suoi), chi inizia parte dalle prime scelte
           (abilita 1) senza il bonus al bilanciere al primo posto salvo obiettivo forza; PRI-05 e assorbita (collaudo SAF-05);
   SEL-03  a corpo libero niente esercizio che per dato chiede una panca (collaudo SAF-04);
   PCO-08  con la spalla dolente la settimana ha lavoro per la cuffia o per i deltoidi posteriori, senza caricare la spalla (collaudo SAF-06);
   SES-03  a corpo libero ogni seduta di gambe ha una cerniera dell anca (Hip Hinge a Corpo Libero); ABB-02 al massimo due varianti di squat in una seduta;
   ORD-03  il multiarticolare di spalle o braccia non sta prima di quelli delle gambe, nemmeno dopo le superserie; RID-02 lo stesso esercizio al massimo in due sedute.
   Il file soglie-selezione.js non e ancora in index.html (lo aggiunge il manifesto di integrazione docs/in-arrivo/W2-T6.json): la prova lo carica da se se manca.
   Esegue il codice vero dell'app in node (vm), senza browser. Lancio: npm test
   Le prove devono FALLIRE sul codice di prima della correzione (i numeri di prima sono scritti accanto a ogni prova). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const fs = require('fs'), path = require('path'), vm = require('vm');

const ORA = '2026-10-06T12:00:00';
const app = caricaApp({ ora: ORA });
if (app.g('typeof SOGLIE_SELEZIONE') === 'undefined') vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js/coach/programma/soglie-selezione.js'), 'utf8'), app.ctx, { filename: 'soglie-selezione.js' });
const senzaEmoji = n => app.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const costruisci = p => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, p)));
const nomi = sd => sd.esercizi.map(e => senzaEmoji(e.name));
const tutti = prog => [].concat.apply([], prog.sedute.map(nomi));
const ATTR = app.json('ATTRIBUTI');
const attr = n => ATTR[senzaEmoji(n)] || null;
const FLESSIONE = /leg curl|nordic/i;

/* ============================================================================================================ M6 */
test('M6: a 2 giorni e 30 minuti in palestra la flessione del ginocchio manca solo dove il tempo non basta, e il programma lo dice', () => {
  /* griglia di 144 programmi: livello x obiettivi x fastidi x sesso, seme fisso. Sul codice di prima (tag coach-v2-onda-2d) 107 non avevano una flessione del ginocchio (leg curl, nordic): la scala
     del tempo toglieva serie ai multiarticolari e poi, per ultimo, il leg curl, perche la seduta full body teneva due multiarticolari di gambe di schema diverso (squat e stacco rumeno) oltre a spinta e tirata.
     Dopo: 15 (12 con il solo M6, 3 in piu per le altre scelte di questa consegna), quasi tutti con un obiettivo di forza in seconda posizione (posti fissi 5x5 e pause lunghe) o il minimo di serie di petto e dorsali che nessun taglio puo scendere (registro B6, pavimenti) */
  const senza = [];
  let n = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [['massa'], ['glutei'], ['massa', 'forza'], ['dimagrimento'], ['forza', 'massa'], ['salute']].forEach(goals =>
    [[], ['spalle'], ['ginocchia'], ['schiena']].forEach(fastidi => ['F', 'M'].forEach(sex => {
      const prog = costruisci({ level, goals, fastidi, sex, days: 2, minutes: 30, luogo: 'palestra', seme: 'sel-m6-' + (n++) });
      if (!tutti(prog).some(x => FLESSIONE.test(x))) {
        senza.push([level, goals.join('+'), fastidi.join('+'), sex].join('|'));
        assert.ok(prog.note.some(x => /^Femorali: con questi minuti la flessione del ginocchio/.test(x)), 'senza la flessione il programma lo dice: ' + senza[senza.length - 1]);
      }
    }))));
  assert.strictEqual(n, 144);
  assert.ok(senza.length <= 15, 'senza flessione: ' + senza.length + ' su 144 (107 prima della correzione): ' + senza.join(', '));
  const senzaForza = senza.filter(x => !/forza/.test(x.split('|')[1]));
  assert.ok(senzaForza.length <= 4, 'senza un obiettivo di forza: ' + senzaForza.join(', '));
});

test('M6: la flessione prende il posto di un secondo multiarticolare di gambe, non di uno schema che resta solo nella settimana', () => {
  /* il taglio toglie il secondo esercizio di gambe della seduta full body quando lo stesso schema e in un altra seduta: squat, stacco, spinta e tirata restano in settimana (PAT-01) */
  const prog = costruisci({ level: 'avanzato', goals: ['glutei'], fastidi: [], sex: 'F', days: 2, minutes: 30, luogo: 'palestra', seme: 'collaudo|glutei|avanzato|2|30|palestra|-|F|giovane' });
  const schemi = new Set();
  prog.sedute.forEach(sd => sd.esercizi.forEach(e => { const k = app.g('schemaDi')(e.name); if (k) schemi.add(k); }));
  ['squat', 'hinge', 'spintaO', 'tirataO'].forEach(k => assert.ok(schemi.has(k), 'manca lo schema ' + k + ' nella settimana'));
  assert.ok(tutti(prog).some(x => FLESSIONE.test(x)), 'e c e la flessione del ginocchio');
});

test('M6: secondoDiGambe: solo nel full body, non il primo multiarticolare, non un posto fisso, solo se lo schema e anche in un altra seduta', () => {
  const sd = (tipo, nomiEs, extra) => ({ tipo, esercizi: nomiEs.map((n, i) => Object.assign({ name: app.g('nomeInLibreria')(n), sets: 3, reps: 8, rest: 120 }, (extra && extra[i]) || {})) });
  const f = (s, altre) => { const r = app.g('secondoDiGambe')(s, [s].concat(altre), null); return r ? senzaEmoji(r.name) : null; };
  const a = sd('fullbody', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine']);
  const b = sd('fullbody', ['Stacco da Terra (Deadlift)', 'Rematore con Petto Appoggiato', 'Hack Squat', 'Shoulder Press Machine']);
  assert.strictEqual(f(a, [b]), 'Stacco Rumeno', 'lo stacco rumeno (lo squat e il primo multiarticolare della seduta, lo stacco e anche nell altra)');
  assert.strictEqual(f(a, [sd('fullbody', ['Panca Piana Bilanciere', 'Hack Squat', 'Lat Machine'])]), null, 'senza uno stacco nell altra seduta l unico stacco della settimana resta (PAT-01)');
  assert.strictEqual(f(sd('upper', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine']), [b]), null, 'solo il full body');
  assert.strictEqual(f(sd('fullbody', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Stacco Rumeno', 'Lat Machine'], [null, null, { fisso: true }]), [b]), null, 'un posto fisso resta');
  const pt = sd('fullbody', ['Panca Piana Bilanciere', 'Pull-Through ai Cavi', 'Leg Press', 'Lat Machine']);
  assert.strictEqual(f(pt, [sd('fullbody', ['Squat con Bilanciere', 'Pull-Through ai Cavi', 'Lat Machine'])]), 'Pull-Through ai Cavi', 'il pull-through ai cavi e una cerniera dell anca anche se il nome non dice «stacco»');
});

/* ============================================================================================================ griglie */
const PERSONE = { adulto: { age: 30, parq: 'no' }, over65: { age: 70, parq: 'no' }, parq: { age: 30, parq: 'si' }, minorenne: { age: 16, parq: 'no' } };
let _n = 0;
/* un programma per ogni combinazione, seme fisso (il nome della griglia e un numero d ordine): { p, pk, prog } */
function griglia(nome, livelli, persone, luoghi, giorni, obiettivi, extra) {
  const out = [];
  livelli.forEach(level => luoghi.forEach(luogo => giorni.forEach(days => obiettivi.forEach(goals => persone.forEach(pk => {
    const n = _n++, p = Object.assign({ level, luogo, days, goals, sex: n % 2 ? 'F' : 'M', seme: nome + '-' + n }, PERSONE[pk], extra || {});
    out.push({ p, pk, prog: costruisci(p) });
  })))));
  return out;
}
const abilita = n => { const a = attr(n); return a ? a.abilita : 1; };

/* ============================================================================================================ SEL-06 */
test('SEL-06: chi inizia e i prudenti non ricevono esercizi di abilita 3 (dato degli attributi), prima ne avevano', () => {
  /* griglia di 144 + 108 programmi. Sul codice di prima (tag coach-v2-onda-2d): 134 programmi su 144 di chi inizia avevano almeno un esercizio di abilita 3 (Pike Push-up, Piegamenti Declinati,
     Sissy Squat, Affondi Bulgari, Dip, Trazioni libere, Stacco da Terra) e 108 su 108 dei prudenti intermedi e avanzati: la Sentinella aveva tre elenchi a mano e il collaudo SAF-05 ne vedeva uno solo (Pike) */
  const inizio = griglia('sel06a', ['principiante'], ['adulto', 'over65', 'parq', 'minorenne'], ['palestra', 'manubri', 'corpo'], [3, 4, 5], [['massa'], ['salute'], ['glutei'], ['dimagrimento']]);
  const prudenti = griglia('sel06b', ['intermedio', 'avanzato'], ['over65', 'parq', 'minorenne'], ['palestra', 'manubri', 'corpo'], [3, 4, 5], [['massa'], ['glutei']]);
  assert.strictEqual(inizio.length, 144); assert.strictEqual(prudenti.length, 108);
  const con3 = lista => lista.filter(x => tutti(x.prog).some(n => abilita(n) === 3));
  assert.deepStrictEqual(con3(inizio).map(x => x.p.seme + ':' + tutti(x.prog).filter(n => abilita(n) === 3)), [], 'chi inizia non riceve esercizi di abilita 3');
  assert.deepStrictEqual(con3(prudenti).map(x => x.p.seme + ':' + tutti(x.prog).filter(n => abilita(n) === 3)), [], 'i prudenti non ricevono esercizi di abilita 3');
  /* chi sta bene e non inizia li puo ancora ricevere (non e un divieto per tutti) */
  const esperti = griglia('sel06c', ['avanzato'], ['adulto'], ['palestra', 'corpo'], [4, 5], [['massa'], ['glutei']]);
  assert.ok(con3(esperti).length > 0, 'un avanzato sano puo avere esercizi di abilita 3');
});

test('SEL-06: chi inizia senza obiettivo forza parte dalle prime scelte, senza bilanciere al primo posto; con la forza il bilanciere resta', () => {
  /* sul codice di prima: il primo esercizio della seduta era un bilanciere in 28 sedute su 55 di chi inizia (il +3 del primo posto e la classifica PRIORI: Squat con Bilanciere, Stacco Rumeno, Panca Piana
     Bilanciere 3 contro le macchine a 2,5) */
  const inizio = griglia('sel06d', ['principiante'], ['adulto'], ['palestra'], [3, 4, 5], [['massa'], ['salute'], ['glutei'], ['dimagrimento'], ['ricomposizione']]);
  let sedute = 0, conBilanciere = 0, classeA = 0;
  inizio.forEach(x => x.prog.sedute.forEach(sd => { sedute++; const e0 = sd.esercizi[0]; if (e0 && attr(e0.name) && attr(e0.name).attrezzo === 'bilanciere') conBilanciere++; classeA += sd.esercizi.filter(e => attr(e.name) && attr(e.name).classe === 'A').length; }));
  assert.ok(sedute > 50);
  assert.ok(conBilanciere <= 2, 'bilanciere al primo posto: ' + conBilanciere + ' sedute su ' + sedute + ' (28 su 55 sul codice di prima)');
  assert.ok(classeA <= 4, 'esercizi di classe A (bilanciere libero pesante) per chi inizia: ' + classeA + ' (49 sul codice di prima)');
  /* l obiettivo forza tiene il bilanciere (PRG-08) */
  const forza = griglia('sel06e', ['principiante'], ['adulto'], ['palestra'], [3, 4], [['forza']]);
  assert.ok(forza.every(x => x.prog.sedute.some(sd => attr(sd.esercizi[0].name) && attr(sd.esercizi[0].name).attrezzo === 'bilanciere')), 'la forza parte dal bilanciere');
});

test('SEL-06: un metodo famoso scelto dall utente porta i suoi esercizi (Starting Strength: lo stacco da terra anche a chi inizia)', () => {
  const prog = costruisci({ goals: ['forza'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', metodo: 'startingstrength', seme: 'sel06-ss' });
  assert.ok(tutti(prog).indexOf('Stacco da Terra (Deadlift)') !== -1, 'Starting Strength ha lo stacco da terra: ' + tutti(prog).join(', '));
  assert.strictEqual(prog.metodo, 'startingstrength');
  /* senza il metodo scelto dall utente lo stacco da terra non entra (abilita 3) */
  const senza = costruisci({ goals: ['forza'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', seme: 'sel06-ss' });
  assert.ok(tutti(senza).indexOf('Stacco da Terra (Deadlift)') === -1);
});

test('SEL-06 (Sentinella): i vietati di chi inizia sono quelli di prima piu ogni abilita 3 del dato; chi non inizia e non e prudente non ne ha', () => {
  const vincoli = (chi) => app.dati(app.g('vincoliSicurezza')(app.g('(' + JSON.stringify({ grezzo: { d: {} }, chi, sicurezza: { fastidi: [] } }) + ')')));
  const v = vincoli({ principiante: true, cauto: false }), nome = n => app.g('nomeInLibreria')(n);
  ['Nordic Curl', 'Front Squat', 'Stacco Rumeno a una Gamba', 'Pike Push-up', 'Affondi Bulgari', 'Sissy Squat', 'Piegamenti Declinati (Piedi Rialzati)', 'Stacco da Terra (Deadlift)', 'Dip alle Parallele'].forEach(n => assert.ok(v.vietati[nome(n)], n + ' e vietato a chi inizia'));
  assert.ok(!v.vietati[nome('Squat con Bilanciere')] && !v.vietati[nome('Panca Piana Bilanciere')], 'l abilita 2 non e vietata');
  const p = vincoli({ principiante: false, cauto: true });
  assert.ok(p.vietati[nome('Pike Push-up')] && p.vietati[nome('Affondi Bulgari')], 'i prudenti come chi inizia');
  const e = vincoli({ principiante: false, cauto: false });
  assert.ok(!e.vietati[nome('Pike Push-up')] && !e.vietati[nome('Affondi Bulgari')], 'chi non inizia e non e prudente li ha');
  assert.strictEqual(Object.keys(e.vietati).filter(k => !/Squat su Scatola|Sit-to-Stand/.test(k)).length, 0, 'e nessun altro divieto');
});

/* ============================================================================================================ SEL-03 */
test('SEL-03: a corpo libero niente Dip su Panca (chiede una panca); a casa coi manubri e in palestra si', () => {
  /* il Dip su Panca diventa la scelta per i tricipiti a corpo libero quando SEL-06 toglie i piegamenti difficili: senza questa regola SAF-04 saliva da 0 a 106 programmi su 1774 della matrice rapida */
  const nome = app.g('nomeInLibreria')('Dip su Panca');
  const cons = prefs => app.g('consentito')(nome, prefs);
  assert.strictEqual(cons({ luogo: 'corpo', fastidi: [] }), false);
  assert.strictEqual(cons({ luogo: 'manubri', fastidi: [] }), true, 'A casa con manubri: manubri e una panca');
  assert.strictEqual(cons({ luogo: 'palestra', fastidi: [] }), true);
  assert.strictEqual(cons({ luogo: 'corpo', fastidi: [], attrezziCasa: ['panca'] }), true, 'quando la panca sara dichiarata (W2-T5) torna');
  assert.ok(app.json('serveAttrezzo("Dip su Panca")').indexOf('panca') !== -1, 'il dato e `serve` di attributi-esercizi.js');
  const corpo = griglia('sel03', ['principiante', 'intermedio'], ['adulto'], ['corpo'], [3, 4, 5], [['massa'], ['glutei']]);
  assert.deepStrictEqual(corpo.filter(x => tutti(x.prog).indexOf('Dip su Panca') !== -1).map(x => x.p.seme), []);
});

/* ============================================================================================================ PCO-08 */
const RX_DIETRO = /face pull|extrarotazione|reverse|alzate posteriori|y-raise/i;
const serieDietro = prog => prog.sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => a + (RX_DIETRO.test(senzaEmoji(e.name)) && attr(e.name) && attr(e.name).muscoli.deltoide_posteriore >= 1 ? e.sets : 0), 0), 0);
test('PCO-08: con la spalla dolente la settimana ha almeno 2 serie dirette per i deltoidi posteriori o la cuffia, senza esercizi che caricano la spalla', () => {
  /* sul codice di prima (tag coach-v2-onda-2d): 375 programmi su 1774 della matrice rapida del collaudo (SAF-06) senza lavoro per la cuffia; nella griglia di questa prova la meta circa */
  const lista = griglia('pco08', ['principiante', 'intermedio', 'avanzato'], ['adulto', 'over65'], ['palestra', 'manubri', 'corpo'], [2, 3, 4, 5], [['massa'], ['salute'], ['forza']], { fastidi: ['spalle'] });
  assert.strictEqual(lista.length, 216);
  const senza = lista.filter(x => serieDietro(x.prog) < 2);
  assert.deepStrictEqual(senza.map(x => x.p.seme + ' ' + x.p.level + ' ' + x.p.luogo + ' ' + x.p.days), [], 'senza lavoro per la cuffia: ' + senza.length + ' su 216');
  /* il lavoro aggiunto non carica la spalla (stress 0), sono al massimo due esercizi e la nota rimanda al medico */
  lista.forEach(x => {
    const aggiunti = [].concat.apply([], x.prog.sedute.map(sd => sd.esercizi.filter(e => e.cuffia === 'aggiunto')));
    assert.ok(aggiunti.length <= 2, x.p.seme + ': piu di due esercizi aggiunti');
    aggiunti.forEach(e => assert.ok(!attr(e.name).stress.spalla, x.p.seme + ': ' + e.name + ' carica la spalla'));
    if (aggiunti.length) assert.ok(x.prog.note.some(n => /^Con la spalla delicata ho aggiunto/.test(n) && /medico o da un fisioterapista/.test(n)), x.p.seme + ': la nota con il rinvio al medico');
  });
  /* senza la spalla dolente niente aggiunte (e niente nota) */
  const sana = griglia('pco08b', ['intermedio'], ['adulto'], ['palestra', 'corpo'], [3, 4], [['massa']]);
  sana.forEach(x => { assert.ok(!x.prog.sedute.some(sd => sd.esercizi.some(e => e.cuffia)), x.p.seme); assert.ok(!x.prog.note.some(n => /^Con la spalla delicata/.test(n))); });
});

test('PCO-08: con 4 o piu sedute anche la rotazione esterna al cavo (la cuffia vera), in un altra seduta; la nota non resta se il lavoro e stato tolto', () => {
  const prog = costruisci({ level: 'principiante', goals: ['massa'], days: 6, minutes: 60, luogo: 'palestra', fastidi: ['spalle'], seme: 'pco08-rot' });
  const aggiunti = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.filter(e => e.cuffia === 'aggiunto').map(e => senzaEmoji(e.name))));
  assert.ok(aggiunti.length >= 1 && aggiunti.length <= 2, aggiunti.join(', '));
  /* riconciliaNote: se il lavoro non c e piu la nota va via */
  const finta = JSON.parse(JSON.stringify(prog));
  finta.sedute.forEach(sd => { sd.esercizi = sd.esercizi.filter(e => !RX_DIETRO.test(senzaEmoji(e.name))); });
  assert.ok(app.dati(app.chiama('riconciliaNote', finta)).note.every(n => !/^Con la spalla delicata/.test(n)));
});

/* ============================================================================================================ SES-03 / MOD-12 */
test('SES-03: a corpo libero ogni seduta di gambe ha una cerniera dell anca (Hip Hinge a Corpo Libero), anche con la schiena dolente; prima nessuna', () => {
  /* sul codice di prima: 0 esercizi di hinge a corpo libero (MOD-12), e il collaudo SES-03 (lower/hinge 9,1%, legs/hinge 3,7% pesati) cadeva su ogni seduta lower e legs a corpo libero */
  const lista = griglia('ses03', ['principiante', 'intermedio', 'avanzato'], ['adulto', 'over65'], ['corpo'], [3, 4, 5, 6], [['massa'], ['glutei'], ['salute']], { fastidi: [] });
  /* la cerniera senza carico e un ripiego: al massimo in due sedute a settimana (RIPETIZIONI_SETTIMANA_MAX) e solo nelle sedute di gambe; con 5 e 6 giorni le sedute di gambe sono piu di due e le prime due la hanno
     (con 4 giorni e meno ogni seduta di gambe); sul codice di prima con 6 giorni finiva in 4 sedute e i femorali arrivavano a 13 serie frazionarie contro un massimo di 8 (collaudo VOL-02:femorali) */
  const ripiego = sd => sd.esercizi.some(e => senzaEmoji(e.name) === 'Hip Hinge a Corpo Libero');
  const gambe = []; lista.forEach(x => { const g = x.prog.sedute.filter(sd => /lower|legs/.test(sd.tipo)); g.forEach((sd, i) => { if (i < 2) gambe.push({ x, sd }); }); assert.ok(x.prog.sedute.filter(ripiego).length <= 2, x.p.seme + ': il ripiego in piu di due sedute'); });
  assert.ok(gambe.length > 40, 'sedute lower e legs: ' + gambe.length);
  const senza = gambe.filter(g => !g.sd.esercizi.some(e => attr(e.name) && attr(e.name).schema === 'hinge'));
  assert.deepStrictEqual(senza.map(g => g.x.p.seme + ' ' + g.sd.giorno), [], 'sedute di gambe a corpo libero senza cerniera dell anca');
  const schiena = griglia('ses03b', ['intermedio'], ['adulto'], ['corpo'], [4, 5], [['massa']], { fastidi: ['schiena'] });
  assert.ok(schiena.every(x => x.prog.sedute.filter(sd => /lower|legs/.test(sd.tipo)).every(sd => sd.esercizi.some(e => attr(e.name) && attr(e.name).schema === 'hinge'))), 'anche con la schiena dolente: il gesto senza carico non e uno stacco');
  /* dove c e un carico vince la variante con il carico: in palestra (cavi, macchine, bilanciere) non serve mai; a casa con i manubri e solo la variante in piu quando i due stacchi con il carico sono gia in due sedute (RID-02),
     una volta a settimana, mai l unica cerniera dell anca della settimana */
  const manubri = griglia('ses03c', ['principiante', 'intermedio', 'avanzato'], ['adulto'], ['manubri', 'palestra'], [3, 4, 5], [['massa'], ['glutei']]);
  const conRipiego = x => x.prog.sedute.filter(sd => sd.esercizi.some(e => senzaEmoji(e.name) === 'Hip Hinge a Corpo Libero')).length;
  assert.ok(manubri.filter(x => x.p.luogo === 'palestra').every(x => conRipiego(x) === 0), 'in palestra il ripiego senza carico non serve');
  assert.ok(manubri.every(x => conRipiego(x) <= 1), 'il ripiego senza carico al massimo in una seduta a settimana');
  assert.ok(manubri.filter(x => conRipiego(x) === 1).every(x => x.prog.sedute.some(sd => sd.esercizi.some(e => senzaEmoji(e.name) !== 'Hip Hinge a Corpo Libero' && attr(e.name) && attr(e.name).schema === 'hinge'))), 'mai l unica cerniera dell anca della settimana');
});

/* ============================================================================================================ ABB-02 */
test('ABB-02 (SES-03): al massimo due varianti di squat o di affondo in una seduta; la terza e la cerniera dell anca o la flessione', () => {
  /* sul codice di prima: sedute Gambe con tre varianti (Squat con Bilanciere + Front Squat + Affondi Bulgari; Goblet + Affondi + Squat a Corpo Libero) in 128 programmi su 1774 della matrice rapida (7,4% pesato) */
  const lista = griglia('abb02', ['intermedio', 'avanzato'], ['adulto'], ['palestra', 'manubri', 'corpo'], [4, 5, 6], [['massa'], ['glutei']]);
  const tre = [];
  lista.forEach(x => x.prog.sedute.forEach(sd => { const n = sd.esercizi.filter(e => attr(e.name) && ['squat', 'affondo'].indexOf(attr(e.name).schema) !== -1 && (app.g('findExercise')(e.name) || {}).type === 'compound').length; if (n >= 3) tre.push(x.p.seme + ' ' + sd.giorno + ' ' + nomi(sd).join('+')); }));
  assert.deepStrictEqual(tre, []);
});

/* ============================================================================================================ ORD-03 */
test('ORD-03: nessun multiarticolare di spalle o braccia prima di quelli delle gambe, nemmeno quando la coppia di superserie porta il partner subito dopo il primo', () => {
  /* sul codice di prima: 64 programmi su 1774 della matrice rapida (2,3% pesato): «Shoulder Press Machine prima di Pull-Through» perche strSuperserie spostava la spinta sopra le gambe, e il pull-through non contava come cerniera */
  const lista = griglia('ord03', ['principiante', 'intermedio'], ['adulto', 'over65'], ['palestra', 'manubri', 'corpo'], [2, 3, 4], [['massa'], ['salute'], ['dimagrimento']]);
  const fp = app.g('strPiccoloMulti'), fb = app.g('strBassoMulti');
  const male = [];
  lista.forEach(x => x.prog.sedute.forEach(sd => sd.esercizi.forEach((e, i) => { if (fp(e) && sd.esercizi.slice(i + 1).some(y => fb(y))) male.push(x.p.seme + ' ' + sd.giorno + ': ' + senzaEmoji(e.name) + ' prima di ' + nomi(sd).slice(i + 1).join(',')); })));
  assert.deepStrictEqual(male, []);
  /* strSuperserie: non porta la spinta sopra una cerniera dell anca */
  const sd = { esercizi: ['Pulley Basso', 'Pull-Through ai Cavi', 'Shoulder Press Machine', 'Leg Curl Seduto'].map(n => ({ name: app.g('nomeInLibreria')(n), sets: 3, reps: 10, rest: 75 })) };
  app.chiama('strSuperserie', sd);
  const dopo = sd.esercizi.map(e => senzaEmoji(e.name));
  assert.ok(dopo.indexOf('Pull-Through ai Cavi') < dopo.indexOf('Shoulder Press Machine'), dopo.join(','));
});

/* ============================================================================================================ RID-02 */
test('RID-02: lo stesso esercizio al massimo in due sedute a settimana dove la libreria ha una variante (palestra e casa con i manubri)', () => {
  /* sul codice di prima: lo stesso esercizio in 3 o piu sedute in 460 programmi su 1774 della matrice rapida (14,6% pesato: il posto sceglieva sempre il primo della classifica, la varieta pesava 1 o 4 punti) */
  const lista = griglia('rid02', ['principiante', 'intermedio', 'avanzato'], ['adulto'], ['palestra', 'manubri'], [5, 6], [['massa'], ['salute'], ['glutei']]);
  const tre = [];
  lista.forEach(x => { const c = {}; x.prog.sedute.forEach(sd => new Set(nomi(sd)).forEach(n => { c[n] = (c[n] || 0) + 1; })); Object.keys(c).forEach(n => { if (c[n] >= 3) tre.push(x.p.seme + ' ' + n); }); });
  assert.ok(tre.length <= 6, 'esercizi in 3 o piu sedute: ' + tre.length + ' su ' + lista.length + ' programmi: ' + tre.join(' | '));
});
