/* Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri.
   M1  Stacco Rumeno a una Gamba non e un esercizio da bilanciere (attrezzoDi) e resta fuori per i prudenti e per chi inizia (abilita 3);
   M3  i minorenni hanno almeno 2 ripetizioni in riserva in ogni percorso (rirBersaglio, esigenza);
   M5  Squat su Scatola e Sit-to-Stand sono esercizi di avvio: non per chi puo fare lo squat carico, e mai nella seduta che ha gia uno squat.
   Esegue il codice vero dell'app in node (vm), senza browser. Lancio: npm test
   Le prove devono FALLIRE sul codice di prima della correzione (i numeri di prima sono scritti accanto a ogni prova). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conSoglieSelezione } = require('./aiuto-selezione');   /* W2-T6: le soglie della scelta degli esercizi (SEL-06) anche prima che index.html le citi */

const ORA = '2026-10-05T12:00:00';
const app = conSoglieSelezione(caricaApp({ ora: ORA }));
const senzaEmoji = n => app.g('senzaEmoji')(n);
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const costruisci = p => app.dati(app.chiama('buildProgram', Object.assign({}, BASE, p)));
const nomiSeduta = sd => sd.esercizi.map(e => senzaEmoji(e.name));
const PERSONE = { adulto: { age: 30, parq: 'no' }, over65: { age: 70, parq: 'no' }, parq: { age: 30, parq: 'si' }, minorenne: { age: 16, parq: 'no' } };

/* una griglia piccola e sempre uguale: livello x luogo x giorni x obiettivo x persona (seme fisso nel nome) */
function griglia(persone) {
  const out = []; let i = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => ['palestra', 'manubri', 'corpo'].forEach(luogo => [3, 4, 5].forEach(days => [['massa'], ['salute'], ['glutei']].forEach(goals =>
    Object.keys(PERSONE).forEach(pk => { const n = i++; if (persone.indexOf(pk) !== -1) out.push(Object.assign({ level, luogo, days, goals, sex: n % 2 ? 'F' : 'M', seme: 'rev1-' + n }, PERSONE[pk], { _persona: pk })); })))));
  return out;
}
const programmi = persone => griglia(persone).map(p => { const q = Object.assign({}, p); delete q._persona; return { p, prog: costruisci(q) }; });

/* ============================================================================================================ M1 */
test('M1: Stacco Rumeno a una Gamba e un esercizio coi manubri, non col bilanciere', () => {
  /* prima: 'bilanciere' (la regex /stacco/). Tutti i 169 esercizi: tests/attributi.test.js confronta attrezzoDi con gli attributi e tests/browser/dettagli-esercizi.js con la sezione della lista */
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno a una Gamba'), 'manubri');
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno con Manubri'), 'manubri');
  assert.strictEqual(app.g('attrezzoDi')('Stacco Rumeno'), 'bilanciere');
  const nome = app.g('nomeInLibreria')('Stacco Rumeno a una Gamba');
  const cons = prefs => app.g('consentito')(nome, prefs);
  assert.strictEqual(cons({ luogo: 'palestra', attrezziPalestra: ['bilanciere'], fastidi: [] }), false, 'serve un manubrio: con il solo bilanciere non c e');
  assert.strictEqual(cons({ luogo: 'palestra', attrezziPalestra: ['manubri'], fastidi: [] }), true, 'una palestra con i soli manubri lo ha');
  assert.strictEqual(cons({ luogo: 'manubri', fastidi: [] }), true, 'a casa con i manubri e proprio dove serve (bio §5.5)');
});

test('M1: nessun prudente e nessun principiante riceve lo Stacco Rumeno a una Gamba; chi puo farlo lo riceve ancora', () => {
  /* sul codice di prima: 17 programmi su 243 di prudenti lo avevano (letto come bilanciere era ammesso in palestra), 0 dopo; chi ha esperienza: 2 programmi su 54 prima, 20 dopo
     (a casa con i manubri e dove la nota bio §5.5 lo voleva); chi inizia non lo ha mai: senza il divieto per i principianti sarebbero i 50 programmi della griglia larga della revisione */
  const cauti = programmi(['over65', 'parq', 'minorenne']), adulti = programmi(['adulto']);
  const con = lista => lista.filter(x => x.prog.sedute.some(sd => nomiSeduta(sd).indexOf('Stacco Rumeno a una Gamba') !== -1));
  assert.strictEqual(cauti.length, 243);
  assert.deepStrictEqual(con(cauti).map(x => x.p.seme), [], 'un prudente non riceve un esercizio di abilita 3');
  const principianti = adulti.filter(x => x.p.level === 'principiante');
  assert.strictEqual(principianti.length, 27);
  assert.deepStrictEqual(con(principianti).map(x => x.p.seme), [], 'chi inizia non riceve un esercizio di abilita 3 (SEL-06)');
  const esperti = adulti.filter(x => x.p.level !== 'principiante');
  assert.strictEqual(esperti.length, 54);
  /* W2-T2: 18 e non 20 (la capacita di CAS-06 e il taglio per il tempo cambiano quali programmi della griglia hanno il posto dell unilaterale); il controllo e che lo riceva ancora dove ci sono i manubri */
  assert.strictEqual(con(esperti).length, 18, 'chi ha esperienza lo riceve dove ci sono i manubri');
});

/* ============================================================================================================ M5 */
test('M5: gli esercizi di avvio sono due, di schema squat e abilita 1, e si leggono dagli attributi', () => {
  const ATTR = app.json('ATTRIBUTI');
  assert.deepStrictEqual(Object.keys(ATTR).filter(n => ATTR[n].soloAvvio).sort(), ['Sit-to-Stand dalla Panca', 'Squat su Scatola']);
  ['Sit-to-Stand dalla Panca', 'Squat su Scatola'].forEach(n => { assert.strictEqual(ATTR[n].schema, 'squat', n); assert.strictEqual(ATTR[n].abilita, 1, n); });
  assert.strictEqual(app.g('attributi')('💪 Squat su Scatola').soloAvvio, true, 'anche con l emoji');
  assert.ok(!app.g('attributi')('Goblet Squat').soloAvvio);
});

test('M5: strSquatDoppio: lo squat di avvio non sta con un altro squat, in nessuno dei due ordini; due squat carichi restano ammessi (ABB-02)', () => {
  const doppio = (x, base) => app.g('strSquatDoppio')({ name: x }, base.map(name => ({ name })));
  assert.strictEqual(doppio('Squat su Scatola', ['Squat a Corpo Libero']), true);
  assert.strictEqual(doppio('Squat su Scatola', ['Goblet Squat', 'Stacco Rumeno']), true);
  assert.strictEqual(doppio('Squat a Corpo Libero', ['Squat su Scatola']), true, 'e al contrario: nessun altro squat nella seduta che ha lo squat di avvio');
  assert.strictEqual(doppio('Leg Press', ['Squat su Scatola']), true);
  assert.strictEqual(doppio('Sit-to-Stand dalla Panca', ['Squat su Scatola']), true);
  assert.strictEqual(doppio('Hack Squat', ['Squat con Bilanciere']), false, 'macchina dopo il bilanciere: ammesso (ABB-02)');
  assert.strictEqual(doppio('Squat su Scatola', ['Stacco Rumeno', 'Panca Piana Manubri']), false, 'senza altri squat nella seduta va bene');
  assert.strictEqual(doppio('Stacco Rumeno', ['Squat su Scatola']), false, 'lo stacco non e uno squat');
  assert.strictEqual(doppio('Leg Extension', ['Squat su Scatola']), false, 'un isolamento non e uno squat');
});

test('M5: la Sentinella vieta gli esercizi di avvio a chi puo fare lo squat con un carico, non a chi inizia ne ai prudenti', () => {
  const v = d => app.dati(app.chiama('vincoliSicurezza', app.chiama('briefCoach', Object.assign({}, BASE, d), {}))).vietati;
  const avvio = ['Squat su Scatola', 'Sit-to-Stand dalla Panca'].map(n => app.g('nomeInLibreria')(n));
  [{ level: 'intermedio' }, { level: 'avanzato' }, { level: 'avanzato', sex: 'M' }].forEach(d => avvio.forEach(n => assert.ok(n in v(d), n + ' vietato per ' + JSON.stringify(d))));
  [{ level: 'principiante' }, { level: 'avanzato', age: 70 }, { level: 'avanzato', age: 16 }, { level: 'avanzato', parq: 'si' }].forEach(d => avvio.forEach(n => assert.ok(!(n in v(d)), n + ' ammesso per ' + JSON.stringify(d))));
});

test('M5: su una griglia di 324 programmi nessun intermedio o avanzato sano riceve lo Squat su Scatola e nessuna seduta lo ha con un altro squat', () => {
  /* sul codice di prima: 32 programmi su 54 di chi ha esperienza (anche avanzati, al posto di uno squat carico), 34 sedute con lo Squat su Scatola e un altro squat, 71 sedute con due squat */
  const tutti = programmi(['adulto', 'over65', 'parq', 'minorenne']), ATTR = app.json('ATTRIBUTI');
  assert.strictEqual(tutti.length, 324);
  const haScatola = x => x.prog.sedute.some(sd => nomiSeduta(sd).indexOf('Squat su Scatola') !== -1);
  const esperti = tutti.filter(x => x.p._persona === 'adulto' && x.p.level !== 'principiante');
  assert.strictEqual(esperti.length, 54);
  assert.deepStrictEqual(esperti.filter(haScatola).map(x => x.p.seme), [], 'chi puo fare lo squat con un carico non riceve lo squat di avvio');
  /* lo ricevono ancora chi inizia e i prudenti (la progressione verso lo squat carico) */
  /* W2-T6: 10 e non 12 (con le prime scelte di SEL-06 e la varieta di RID-02 lo squat di avvio resta a 10 principianti su 27: la progressione verso lo squat carico c e ancora) */
  /* INT-2f: 9 e non 10 (il ripiego della cerniera senza carico non fa piu da variante tra i giorni: cambia il sorteggio degli squat di chi inizia, sempre la progressione verso lo squat carico) */
  assert.strictEqual(tutti.filter(x => x.p._persona === 'adulto' && x.p.level === 'principiante').filter(haScatola).length, 9);
  /* W2-T2: 130 e non 128 (con la capacita di CAS-06 ai prudenti e ai principianti restano 2 programmi in piu con lo squat di avvio: e la progressione verso lo squat carico) */
  /* W2-T6: 128 e non 130 (le prime scelte di SEL-06 e la varieta di RID-02 spostano lo squat di avvio dei prudenti: sempre la progressione verso lo squat carico) */
  /* INT-2f: 130 (la stessa causa: senza il ripiego come variante lo squat di avvio dei prudenti torna a 130, la progressione verso lo squat carico) */
  assert.strictEqual(tutti.filter(x => x.p._persona !== 'adulto').filter(haScatola).length, 130);
  let sedute = 0, conAvvioEAltroSquat = 0, conDueSquat = 0;
  tutti.forEach(x => x.prog.sedute.forEach(sd => {
    sedute++;
    const n = nomiSeduta(sd), squat = n.filter(e => ATTR[e] && ATTR[e].schema === 'squat'), avvio = n.filter(e => ATTR[e] && ATTR[e].soloAvvio);
    if (squat.length > 1) conDueSquat++;
    if (avvio.length && squat.length > 1) conAvvioEAltroSquat++;
  }));
  assert.ok(sedute > 1000);
  assert.strictEqual(conAvvioEAltroSquat, 0, 'lo squat di avvio non sta con un altro squat');
  /* INT-2b: 40 e non 45 (con il volume per muscolo di W2-T1 la griglia ha 5 sedute di squat doppi in meno: Hack Squat + Leg Press e le coppie col bilanciere; erano 71 sul codice di prima, 45 con la capacita di
     W2-T2). Il controllo che conta, nessuna seduta con lo squat di avvio e un altro squat, resta a 0 sopra. Restano 40 sedute con due schemi di squat: macchina + macchina (Hack + Leg Press, Hack + Pendulum),
     bilanciere + macchina (ABB-02) e, a casa con i manubri, Goblet Squat + Squat a Corpo Libero (23 sedute, come prima: 22): un doppione di scelta, non di volume, che spetta alla scelta per attributi
     (RID-01/RID-02, W2-T6). Il numero scende solo se il generatore migliora: si aggiorna con il motivo, mai a mano per far passare la prova */
  /* onda 2c (INT-2b): 41 e non 40: il Front Squat e vietato a chi inizia e ai prudenti (SAF-05, abilita 3: vincoli.js) e in una seduta della griglia il suo posto lo prende uno squat alla macchina
     accanto a un altro (un doppione di scelta, W2-T6); nessuna seduta con lo squat di avvio e un altro squat (sopra, 0) */
  /* W2-T6 (ABB-02, SES-03): 1 e non 41. Le sedute hanno al massimo due varianti di squat o di affondo (`squatOltreMax`): con un affondo gia in seduta (il posto dell unilaterale) il secondo squat, che era il doppione
     di scelta di cui sopra (Hack + Leg Press, Hack + Pendulum, Goblet + Squat a Corpo Libero), non entra piu; la terza variante e la cerniera dell anca o la flessione del ginocchio. Era 41 sul codice di prima.
     INT-2e: 0 e non 1, ricalcolato sul codice integrato con le righe <script> applicate (W2-T5 con i giorni ad anello e soglie-split.js + W2-T6 con soglie-selezione.js): l unica seduta della griglia
     che restava con due squat (misurata da T6 senza gli script nuovi in index.html) non l ha piu quando le soglie di T6 sono caricate; il controllo che conta (lo squat di avvio mai con un altro squat) resta a 0 sopra. */
  assert.strictEqual(conDueSquat, 0, 'doppi squat nella griglia: erano 71 sul codice di prima, 45 con la capacita di W2-T2, 40 con il volume per muscolo, 41 con il Front Squat vietato, 0 con ABB-02 di W2-T6 e i giorni di W2-T5');
});

/* ============================================================================================================ M3 */
const FASI = ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'];
const RIR_SETT_MINORE = [2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4];
const ISOLAMENTO = '🛡️ Alzate Laterali', MACCHINA = '🦵 Leg Press', PESANTE = '💪 Panca Piana Bilanciere';
const serie = (kg, reps) => [[kg, reps, true, 8], [kg, reps, true, 8], [kg, reps, true, 8]];
/* un telefono con il profilo (eta, livello intermedio), un programma alla settimana 3 (a meta blocco) e lo storico dei tre esercizi (senza storico la prima volta vale +1 RIR, INT-04) */
function telefono(age, esigenza, rirSett) {
  const a = caricaApp({ ora: '2026-10-05T10:00:00' });
  a.profilo(Object.assign({ level: 'intermedio', age, sex: 'M' }, esigenza ? { esigenza: { valore: esigenza, aggiornata: '2026-10-05' } } : {}));
  a.programma({ creato: '2026-09-21', inizio: '2026-09-21', settimane: 12, blocco: 4, fasi: FASI, rirSett: rirSett || null });
  const es = [{ nome: ISOLAMENTO, serie: serie(8, 12) }, { nome: MACCHINA, serie: serie(60, 10) }, { nome: PESANTE, serie: serie(40, 8) }];
  a.storia([a.seduta(3, es), a.seduta(10, es)]);
  return a;
}
const rirDi = (a, nome) => a.dati(a.g('rirBersaglio')(nome));

test('M3: il minorenne ha almeno 2 ripetizioni in riserva in ogni percorso, con o senza rirSett e con l esigenza alta', () => {
  /* prima, a meta blocco: senza rirSett (programma salvato dalla v1) isolamento [0,0], macchina [0,1], pesante [1,3]; con rirSett [2,2,2,4...] e l esigenza 1,25: [1,2] sugli isolamenti */
  [[16, null], [16, 1.25], [13, 1.25], [17, 1.25]].forEach(([age, esigenza]) => {
    const a = telefono(age, esigenza, null);
    [ISOLAMENTO, MACCHINA, PESANTE].forEach(nome => assert.deepStrictEqual(rirDi(a, nome), [2, 3], age + ' anni senza rirSett, esigenza ' + esigenza + ': ' + nome));
  });
  [0, 1.25].forEach(esigenza => {
    const a = telefono(16, esigenza, RIR_SETT_MINORE);
    [ISOLAMENTO, MACCHINA, PESANTE].forEach(nome => assert.deepStrictEqual(rirDi(a, nome), [2, 3], 'con rirSett, esigenza ' + esigenza + ': ' + nome));
  });
  /* nella settimana di scarico il bersaglio resta quello del programma (4 ripetizioni in riserva): il pavimento non lo abbassa */
  const scarico = telefono(16, 1.25, RIR_SETT_MINORE);
  scarico.programma({ creato: '2026-09-14', inizio: '2026-09-14', settimane: 12, blocco: 4, fasi: FASI, rirSett: RIR_SETT_MINORE });   /* oggi 5 ottobre = settimana 4 */
  assert.deepStrictEqual(rirDi(scarico, ISOLAMENTO), [4, 5]);
});

test('M3: i minorenni sono esclusi dall esigenza (nessun -1 RIR, nessun bilancio); gli adulti e gli over 65 restano come prima', () => {
  assert.strictEqual(telefono(16, 1.25, null).g('esigenzaCoach')(), 1, 'prima 1,25');
  assert.strictEqual(telefono(17, 1.25, null).g('esigenzaEsclusa')({ age: 17, level: 'intermedio' }), true);
  assert.strictEqual(telefono(18, 1.25, null).g('esigenzaEsclusa')({ age: 18, level: 'intermedio' }), false);
  assert.strictEqual(telefono(0, 1.25, null).g('esigenzaEsclusa')({ age: 0, level: 'intermedio' }), false, 'un età non detta vale adulto');
  /* un adulto di 18 anni a meta blocco: 0-0 sugli isolamenti (come prima, la regola non lo tocca), -1 dell esigenza compreso */
  const adulto = telefono(18, 1.25, null);
  assert.strictEqual(adulto.g('esigenzaCoach')(), 1.25);
  assert.deepStrictEqual([ISOLAMENTO, MACCHINA, PESANTE].map(n => rirDi(adulto, n)), [[0, 0], [0, 1], [1, 3]]);
  const over65 = telefono(70, 0, null);
  assert.deepStrictEqual([ISOLAMENTO, MACCHINA, PESANTE].map(n => rirDi(over65, n)), [[3, 4], [3, 4], [3, 4]]);
});

test('M3: la frase che legge il minorenne dice 2-3 ripetizioni in riserva, mai 0', () => {
  const a = telefono(16, 1.25, null);
  const r = a.dati(a.chiama('caricoProssimo', ISOLAMENTO, 8, 12, 3));
  assert.ok(/lascia 2–3 ripetizioni in riserva/.test(r.motivo), r.motivo);
  assert.ok(!/lascia 0/.test(r.motivo), r.motivo);
  const adulto = telefono(30, 1.25, null), ra = adulto.dati(adulto.chiama('caricoProssimo', ISOLAMENTO, 8, 12, 3));
  assert.ok(/lascia 0–0 ripetizioni in riserva/.test(ra.motivo), 'l adulto resta come prima: ' + ra.motivo);
});

/* ============================================================================================================ minori */
test('m8: l id di un obiettivo sconosciuto passa da escapeHtml nel risultato dell onboarding (sicurezza)', () => {
  const html = (goals) => { app.ctx.__d = JSON.parse(JSON.stringify(Object.assign({}, BASE, { goals, bia: null, seme: 'm8' }))); return app.g('(function(){ onbData = __d; return renderOnbResult(); })()'); };
  const cattivo = '<img src=x onerror=alert(1)>';
  const h = html([cattivo, 'massa']);
  assert.ok(h.indexOf(cattivo) === -1, 'l id sconosciuto non deve comparire come HTML');
  assert.ok(h.indexOf('&lt;img src=x onerror=alert(1)&gt;') !== -1, 'compare come testo');
  assert.ok(html(['massa']).indexOf('Massa') !== -1 || html(['massa']).indexOf('massa') !== -1, 'un obiettivo noto resta com era');
});

test('m9: un livello sconosciuto («esperto») non fa lanciare buildProgram: ricade sul livello piu vicino', () => {
  /* prima: TypeError «reading '1'» in volume.js */
  const p = livello => costruisci({ level: livello, seme: 'm9' });
  const forma = prog => JSON.stringify({ settimane: prog.settimane, blocco: prog.blocco, fasi: prog.fasi, rirSett: prog.rirSett, split: prog.split.nome, sedute: prog.sedute.map(sd => sd.esercizi.length) });
  assert.strictEqual(forma(p('esperto')), forma(p('avanzato')), 'esperto: struttura da avanzato (12 settimane, blocchi da 6, rampa del RIR)');
  assert.strictEqual(forma(p('Principiante assoluto')), forma(p('principiante')));
  assert.strictEqual(forma(p('boh')), forma(p('intermedio')), 'un livello che non si capisce vale intermedio');
  /* INT-2e: il livello mancante vale intermedio per la STRUTTURA (settimane, blocco, fasi, rampa del RIR, divisione, numero di sedute); non per quanti esercizi ha ogni seduta: per i carichi di partenza vale principiante (PAR-01, D-P12) e per una
     donna il bilanciere che partirebbe sotto la barra cede il posto a una variante (PAR-08 a, penalitaPartenza dentro la scelta dei posti): i due programmi scelgono esercizi diversi e strBilancia li bilancia diversamente. Prima la parita del conto degli
     esercizi per seduta ([6,6,5,8]) era una coincidenza: con la correzione di INT-2e (schemaDi vede le spinte come i dati) intermedio ne ha 6 nella prima seduta e il livello mancante 7 */
  const struttura = prog => JSON.stringify({ settimane: prog.settimane, blocco: prog.blocco, fasi: prog.fasi, rirSett: prog.rirSett, split: prog.split.nome, sedute: prog.sedute.length });
  assert.strictEqual(struttura(p(undefined)), struttura(p('intermedio')), 'un livello mancante vale intermedio per la struttura, come prima');
  assert.strictEqual(JSON.stringify(p('esperto').sedute), JSON.stringify(p('avanzato').sedute), 'esperto e avanzato: le stesse sedute (anche il metodo famoso lo sceglie il livello normalizzato)');
  assert.strictEqual(p('esperto').settimane, 12);
  assert.ok(Array.isArray(p('esperto').rirSett), 'la rampa del RIR degli avanzati');
  assert.deepStrictEqual(['principiante', 'intermedio', 'avanzato', 'esperto', '', null, 'Principiante assoluto'].map(l => app.g('livelloConosciuto')(l)), ['principiante', 'intermedio', 'avanzato', 'avanzato', 'intermedio', 'intermedio', 'principiante']);
});
