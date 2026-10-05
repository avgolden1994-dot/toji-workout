/* Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi,
   carico di riferimento nello scarico (MES-06), verdetto del ciclo (MES-12), livello con le tabelle di forza (STD-01), aumenti
   dimezzati oltre i 65 anni (ETA-18), niente creatina e proteine ai minori (ETA-04), taratura del RIR e prontezza (B10, B18).
   Il banco di prova e tests/aiuto-app.js: l'app vera in vm, con l'orologio fisso (lunedi 5 ottobre 2026) e il caso ripetibile.
   Ogni prova mostra anche il caso "di controllo" in cui la regola deve scattare, cosi non e vuota. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';            /* settimana 5 del programma di prova: carico, dopo lo scarico della settimana 4 */
const SQUAT = '🦵 Squat con Bilanciere', PANCA = '💪 Panca Piana Bilanciere', STACCO = '🏹 Stacco da Terra (Deadlift)', MILITARY = '🛡️ Military Press';
const LEG_PRESS = '🦵 Leg Press', CURL = '🦾 Curl ai Cavi', CRUNCH = '🎯 Crunch a Terra';
const FASI8 = ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'];

/* programma di 8 settimane (3 di carico, 1 di scarico, due volte) iniziato lunedi 7 settembre 2026: il 5 ottobre e la settimana 5 */
const programma = (extra) => Object.assign({ creato: '07/09/2026 ore 11:00', inizio: '2026-09-07', settimane: 8, blocco: 4, fasi: FASI8.slice(), goals: ['massa'], rirSett: null,
  prefs: { luogo: 'palestra', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', attrezziPalestra: null, graditi: [], odiati: [], priorita: [] } }, extra || {});
/* una seduta in una data (giorno ISO): serie [[peso, ripetizioni, fatta, rpe]] */
function sed(app, giorno, esercizi, extra) {
  return Object.assign(app.seduta(0, esercizi), { id: new Date(giorno + 'T18:00:00').getTime() }, extra || {});
}
const dallaPiuRecente = lista => lista.slice().sort((a, b) => b.id - a.id);
const tre = (peso, reps, rpe) => [[peso, reps, true, rpe], [peso, reps, true, rpe], [peso, reps, true, rpe]];
/* le regole nuove diventano spegnibili con l'integrazione (REGOLE_SPEGNIBILI e in parametri.js, un file condiviso: lo aggiorna INT-0): qui la si simula */
const spegnibili = (app, codici) => codici.forEach(c => app.g('REGOLE_SPEGNIBILI.indexOf(' + JSON.stringify(c) + ') === -1 && REGOLE_SPEGNIBILI.push(' + JSON.stringify(c) + ')'));
/* cattura l'ultimo "Annulla" mostrato dall'app */
function catturaUndo(app) { app.g('window.__undo = null; window.showUndo = function (m, f) { window.__undo = { m: m, f: f }; }'); }

test('MES-02: il principiante parte da 3-4 ripetizioni in riserva, poi 2-3, mai 0 e nemmeno con l\'esigenza alta', () => {
  const app = caricaApp({ ora: LUNEDI });
  app.profilo({ level: 'principiante', esigenza: { valore: 1.3, sett: '2026-09-28', storia: [] } });   /* un telefono della v1: esigenza salita al 130% */
  app.programma(programma());
  /* esercizi gia fatti (INT-04: la prima volta con un esercizio aggiunge un RIR, qui si prova la tabella) */
  const conosciuti = () => app.storia([sed(app, '2026-09-01', [SQUAT, LEG_PRESS, CURL, '🦵 Leg Extension'].map(nome => ({ nome: nome, serie: tre(20, 10) })))]);
  conosciuti();
  [['2026-09-07', [3, 4]], ['2026-09-14', [3, 4]], ['2026-09-21', [2, 3]], ['2026-10-05', [2, 3]], ['2026-11-02', [2, 3]]].forEach(([giorno, atteso]) => {
    app.ora(giorno + 'T12:00:00');
    [SQUAT, LEG_PRESS, CURL, '🦵 Leg Extension'].forEach(nome => {
      const r = app.dati(app.chiama('rirBersaglio', nome));
      assert.deepStrictEqual(r, atteso, giorno + ' ' + nome + ' bersaglio ' + r);
      assert.ok(r[0] >= 2, 'isolamento e macchine non scendono sotto 2 RIR');
    });
  });
  assert.strictEqual(app.g('esigenzaCoach()'), 1, 'il principiante lavora al 100%, anche con il 130% salvato dalla v1 (niente "Coach esigente")');
  /* di controllo: un intermedio con la stessa esigenza perde un RIR sui non pesanti, ma non sotto 2 nella prima settimana del blocco */
  app.profilo({ level: 'intermedio', esigenza: { valore: 1.3, sett: '2026-09-28', storia: [] } });
  app.ora('2026-09-14T12:00:00');
  assert.deepStrictEqual(app.dati(app.chiama('rirBersaglio', CURL)), [0, 0], 'intermedio, settimana 2: perde un RIR (come prima, [0,1] meno uno)');
  app.ora('2026-09-07T12:00:00');
  assert.ok(app.dati(app.chiama('rirBersaglio', CURL))[0] >= 2, 'intermedio, settimana 1: almeno 2 anche con l\'esigenza alta');
});

test('PRN-01: l\'esigenza di partenza del principiante e 1,0 (gli altri 1,2) e il bilancio delle prime sedute non la alza', () => {
  const app = caricaApp({ ora: LUNEDI });
  assert.strictEqual(app.g('esigenzaIniziale({ level: "principiante" }, {})'), 1);
  assert.strictEqual(app.g('esigenzaIniziale({ level: "intermedio" }, {})'), 1.2);
  assert.strictEqual(app.g('esigenzaIniziale({ level: "principiante" }, { level: "principiante" })'), 1);
  /* prime due sedute facilissime: un intermedio sale, un principiante resta a 1,0 (il bilancio lo puo solo abbassare) */
  const prove = {};
  ['principiante', 'intermedio'].forEach(livello => {
    const a = caricaApp({ ora: LUNEDI });
    a.profilo({ level: livello, esigenza: { valore: livello === 'principiante' ? 1 : 1.2, sett: '2026-09-28', storia: [] } });
    a.programma(programma({ inizio: '2026-09-28', fasi: ['carico', 'carico', 'carico', 'scarico'], settimane: 4 }));
    a.storia(dallaPiuRecente([
      sed(a, '2026-09-28', [{ nome: CURL, serie: tre(10, 12, 5) }, { nome: LEG_PRESS, serie: tre(60, 12, 5) }]),
      sed(a, '2026-09-30', [{ nome: CURL, serie: tre(10, 12, 5) }, { nome: LEG_PRESS, serie: tre(60, 12, 5) }])]));
    a.g('bilancioPrimeSedute()');
    prove[livello] = a.json('getProfile().esigenza.valore');
  });
  assert.strictEqual(prove.intermedio, 1.3, 'di controllo: l\'intermedio sale di 10 punti');
  assert.strictEqual(prove.principiante, 1, 'il principiante non sale oltre il 100%');
});

test('B30/MES-02: pavimento 1 sui fondamentali pesanti anche con la rampa dell\'avanzato; intermedio almeno 2 nella prima settimana del blocco', () => {
  const app = caricaApp({ ora: LUNEDI });
  app.profilo({ level: 'avanzato' });
  app.programma(programma({ settimane: 12, blocco: 6, fasi: ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico'], rirSett: [3, 2, 2, 1, 0, 4, 3, 2, 2, 1, 0, 4] }));
  [['2026-09-07', 3], ['2026-10-05', 0], ['2026-10-12', 4], ['2026-11-16', 0]].forEach(([giorno, r]) => {
    app.ora(giorno + 'T12:00:00');
    const squat = app.dati(app.chiama('rirBersaglioBase', SQUAT)), curl = app.dati(app.chiama('rirBersaglioBase', CURL));
    assert.ok(squat[0] >= (r === 0 ? 1 : r), giorno + ': lo squat non scende sotto 1 (rampa ' + r + ', bersaglio ' + squat + ')');
    assert.strictEqual(curl[0], r, giorno + ': l\'isolamento segue la rampa (' + curl + ')');
  });
  /* prova di non regressione sul punto che il collaudo RIR-02 misura: nessuna settimana di carico con RIR 0 sullo squat */
  for (let w = 0; w < 12; w++) {
    app.ora(new Date(new Date('2026-09-07T12:00:00').getTime() + w * 7 * 86400000));
    if (app.json('getProgramma().fasi')[w] !== 'scarico') assert.ok(app.dati(app.chiama('rirBersaglioBase', SQUAT))[0] >= 1, 'settimana ' + (w + 1));
  }
  app.profilo({ level: 'intermedio' });
  app.programma(programma());
  app.ora('2026-09-07T12:00:00');
  [SQUAT, LEG_PRESS, CURL].forEach(n => assert.ok(app.dati(app.chiama('rirBersaglioBase', n))[0] >= 2, 'intermedio, settimana 1, ' + n));
  app.ora('2026-10-05T12:00:00');   /* prima settimana del secondo blocco: dopo lo scarico si riparte con almeno 2 */
  [SQUAT, LEG_PRESS, CURL].forEach(n => assert.ok(app.dati(app.chiama('rirBersaglioBase', n))[0] >= 2, 'intermedio, settimana 5, ' + n));
  app.ora('2026-09-14T12:00:00');   /* settimana 2: invariato */
  assert.deepStrictEqual(app.dati(app.chiama('rirBersaglioBase', CURL)), [0, 1]);
  assert.deepStrictEqual(app.dati(app.chiama('rirBersaglioBase', SQUAT)), [1, 3]);
  /* regola spenta: tornano i valori di prima (principiante [1,3], intermedio isolamento [0,1]) */
  spegnibili(app, ['MES-02']);
  app.spegni(['MES-02']);
  app.ora('2026-09-07T12:00:00');
  assert.deepStrictEqual(app.dati(app.chiama('rirBersaglioBase', CURL)), [0, 1]);
  app.profilo({ level: 'principiante' });
  assert.deepStrictEqual(app.dati(app.chiama('rirBersaglioBase', SQUAT)), [1, 3]);
});

test('B11/MES-10: una settimana di scarico con RPE bassi non alza l\'esigenza (in una settimana di carico si)', () => {
  const rpe = 5;   /* molto sotto il bersaglio */
  const prova = (lunedi, sedute) => {
    const app = caricaApp({ ora: lunedi + 'T12:00:00' });
    app.profilo({ level: 'intermedio', days: 3, esigenza: { valore: 1.2, sett: '2026-09-14', storia: [] } });
    app.programma(programma());
    app.storia(dallaPiuRecente(sedute.map(g => sed(app, g, [{ nome: SQUAT, serie: tre(60, 8, rpe) }, { nome: CURL, serie: tre(15, 12, rpe) }]))));
    app.g('aggiornaEsigenza()');
    return app.json('getProfile().esigenza');
  };
  /* settimana 4 (28 settembre - 4 ottobre) = scarico; le tre sedute bastano per l'aderenza */
  const scarico = prova('2026-10-05', ['2026-09-28', '2026-09-30', '2026-10-02']);
  assert.strictEqual(scarico.valore, 1.2, 'scarico: invariata');
  assert.ok(scarico.storia[scarico.storia.length - 1].motivi.indexOf('settimana di scarico: lo sforzo non conta') !== -1);
  const carico = prova('2026-09-28', ['2026-09-21', '2026-09-23', '2026-09-25']);   /* settimana 3: carico */
  assert.strictEqual(carico.valore, 1.25, 'di controllo: in una settimana di carico le serie facili la alzano');
});

test('MES-11: lo sforzo si confronta con il RIR bersaglio della seduta, non con quello di oggi; la prima settimana dopo lo scarico non conta "RPE sopra"', () => {
  /* avanzato: ultima settimana di carico a RIR 0 (RPE 10 giusto), poi lo scarico a RIR 4: il bersaglio di oggi (5,5) farebbe sembrare l'RPE 9,5 "sopra" */
  const rirSett = [3, 2, 0, 4, 3, 2, 0, 4];
  const prova = (lunedi, giorni, extra) => {
    const app = caricaApp({ ora: lunedi + 'T12:00:00' });
    app.profilo({ level: 'avanzato', days: 3, esigenza: { valore: 1.2, sett: '2026-09-14', storia: [] } });
    app.programma(programma({ rirSett: rirSett }));
    app.storia(dallaPiuRecente(giorni.map(g => sed(app, g, [{ nome: SQUAT, serie: tre(100, 5, 9.5) }, { nome: CURL, serie: tre(20, 12, 9.5) }], extra))));
    app.g('aggiornaEsigenza()');
    return app.json('getProfile().esigenza.valore');
  };
  assert.strictEqual(prova('2026-09-28', ['2026-09-21', '2026-09-23', '2026-09-25']), 1.2, 'settimana 3 (RIR 0, RPE 9,5 = bersaglio): invariata, non -5%');
  /* con il RIR salvato nella seduta (obiettivo.rir) vale quello, anche se il programma non c'e piu come allora */
  const conSalvato = (lunedi, giorni) => {
    const app = caricaApp({ ora: lunedi + 'T12:00:00' });
    app.profilo({ level: 'intermedio', days: 3, esigenza: { valore: 1.2, sett: '2026-09-14', storia: [] } });
    app.programma(programma());
    app.storia(dallaPiuRecente(giorni.map(g => {
      const h = sed(app, g, [{ nome: CURL, serie: tre(15, 12, 8) }, { nome: SQUAT, serie: tre(60, 8, 8) }]);
      h.sessione.forEach(e => { e.obiettivo = { reps: 12, sets: 3, rir: [1, 2], coachTipo: 'nuovo' }; });   /* RPE bersaglio 8,5: 8 e sotto di mezzo punto */
      return h;
    })));
    app.g('aggiornaEsigenza()');
    return app.json('getProfile().esigenza.valore');
  };
  assert.strictEqual(conSalvato('2026-09-28', ['2026-09-21', '2026-09-23', '2026-09-25']), 1.2, 'RPE 8 contro bersaglio salvato 8,5: ne sopra ne facile');
  /* la prima settimana dopo lo scarico (settimana 5, 5-11 ottobre): RPE sopra il bersaglio di 1 punto non fa -5% */
  const alto = (lunedi, giorni) => {
    const app = caricaApp({ ora: lunedi + 'T12:00:00' });
    app.profilo({ level: 'intermedio', days: 3, esigenza: { valore: 1.2, sett: '2026-09-28', storia: [] } });
    app.programma(programma());
    app.storia(dallaPiuRecente(giorni.map(g => sed(app, g, [{ nome: CURL, serie: tre(15, 12, 10) }, { nome: SQUAT, serie: tre(60, 8, 10) }]))));
    app.g('aggiornaEsigenza()');
    return app.json('getProfile().esigenza.valore');
  };
  assert.strictEqual(alto('2026-10-12', ['2026-10-05', '2026-10-07', '2026-10-09']), 1.2, 'prima settimana dopo lo scarico: niente -5%');
  assert.strictEqual(alto('2026-10-19', ['2026-10-12', '2026-10-14', '2026-10-16']), 1.15, 'di controllo: la settimana dopo conta (RPE 10, sopra il bersaglio)');
});

test('MES-12: un intermedio che sale dell\'1,5% a settimana ha un ciclo "buono"; senza salita e "stallo"; con poche sedute non si dice stallo', () => {
  const ciclo = (crescita, aderenza, picco) => {
    const app = caricaApp({ ora: '2026-10-05T12:00:00' });
    app.profilo({ level: 'intermedio', days: 3 });
    app.programma(programma({ inizio: '2026-07-13', settimane: 12, blocco: 4, fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'] }));
    const lista = [], cal = {};
    let k = 0;
    for (let w = 0; w < 12; w++) {
      const scarico = w % 4 === 3, lun = new Date(new Date('2026-07-13T12:00:00').getTime() + w * 7 * 86400000);
      const carico = 100 * Math.pow(1 + crescita, k) * (scarico ? 0.9 : 1) * (picco && w === 9 ? 1.25 : 1);   /* picco: una sola seduta con una misura alta (rumore): la mediana lo ignora (revisione dell onda 0) */
      if (!scarico) k++;
      [0, 2, 4].forEach(g => {
        const d = new Date(lun.getTime() + g * 86400000), iso = app.ymd(d);
        if (g === 2 || aderenza) { cal[iso] = { done: true, title: 'x' }; }
        else cal[iso] = { title: 'x' };
        if (g === 2) lista.push(sed(app, iso, [{ nome: SQUAT, serie: tre(Math.round(carico * 2) / 2, 8) }, { nome: PANCA, serie: tre(Math.round(carico * 0.7 * 2) / 2, 8) }]));
      });
    }
    app.scrivi(app.g('calKey()'), cal);
    app.storia(dallaPiuRecente(lista));
    return app.json('verdettoCiclo()');
  };
  const sale = ciclo(0.015, true);
  assert.strictEqual(sale.esito, 'buono', 'verdetto ' + JSON.stringify(sale));
  assert.strictEqual(sale.quota, 100);
  assert.strictEqual(ciclo(0, true).esito, 'stallo', 'di controllo: senza progressi e uno stallo');
  assert.strictEqual(ciclo(0, true, true).esito, 'stallo', 'MES-12 (mediana delle ultime 3 sedute di carico): una misura isolata alta non e una salita');
  assert.strictEqual(ciclo(0.015, false).esito, 'aderenza', 'con una seduta su tre il verdetto resta quello dell\'aderenza');
  /* meno di 2 esercizi misurabili: "buono" per default */
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  app.profilo({ level: 'intermedio', days: 3 });
  app.programma(programma({ inizio: '2026-09-07' }));
  const cal = {}; for (let i = 0; i < 28; i += 2) cal[app.ymd(new Date(new Date('2026-09-07T12:00:00').getTime() + i * 86400000))] = { done: true, title: 'x' };
  app.scrivi(app.g('calKey()'), cal);
  app.storia([sed(app, '2026-09-30', [{ nome: SQUAT, serie: tre(100, 8) }])]);
  assert.strictEqual(app.json('verdettoCiclo()').esito, 'buono');
});

test('MES-06: lo stesso esercizio 3 volte nella settimana di scarico ha lo stesso carico; dopo lo scarico si riparte dal riferimento', () => {
  const app = caricaApp({ ora: '2026-09-28T12:00:00' });
  app.profilo({ level: 'intermedio' });
  app.programma(programma());
  const lista = [sed(app, '2026-09-18', [{ nome: PANCA, serie: tre(60, 8) }]), sed(app, '2026-09-16', [{ nome: PANCA, serie: tre(60, 8) }]), sed(app, '2026-09-14', [{ nome: PANCA, serie: tre(57.5, 8) }])];
  const carichi = [];
  ['2026-09-28', '2026-09-30', '2026-10-02'].forEach(giorno => {
    app.ora(giorno + 'T12:00:00');
    app.storia(dallaPiuRecente(lista));
    const r = app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3));
    assert.strictEqual(r.tipo, 'scarico');
    carichi.push(r.weight);
    lista.push(sed(app, giorno, [{ nome: PANCA, serie: [[r.weight, 8, true], [r.weight, 8, true]] }]));   /* la seduta di scarico si fa e si salva */
  });
  assert.deepStrictEqual(carichi, [54, 54, 54], 'oggi (senza la correzione): 54, 48,5, 43,5');
  /* la prima seduta dopo lo scarico riparte dal riferimento (60) con un RIR in piu */
  app.ora('2026-10-05T12:00:00');
  app.storia(dallaPiuRecente(lista));
  const dopo = app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3));
  assert.strictEqual(dopo.weight, 60, 'riparte dal carico di prima: ' + JSON.stringify(dopo));
  assert.ok(/Dopo lo scarico riparti dal carico che avevi prima/.test(dopo.motivo) && /in riserva, una in più dopo lo scarico/.test(dopo.motivo), dopo.motivo);
  assert.ok(app.dati(app.chiama('rirBersaglio', PANCA))[0] >= 2, 'con un RIR in piu');
  /* la seduta dopo ancora: progressione normale dal carico ripreso */
  lista.push(sed(app, '2026-10-05', [{ nome: PANCA, serie: tre(60, 8) }]));
  app.ora('2026-10-07T12:00:00');
  app.storia(dallaPiuRecente(lista));
  assert.strictEqual(app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3)).weight, 62.5);
  /* con la prontezza bassa o in prudenza la ripresa e al 95% */
  app.ora('2026-10-05T12:00:00');
  app.storia(dallaPiuRecente(lista.slice(0, 6)));
  app.scrivi('coach_plus_prontezza_storia_toji', [{ data: '2026-10-03', punteggio: 40 }, { data: '2026-10-04', punteggio: 45 }]);
  assert.strictEqual(app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3)).weight, 57);
  /* l'esercizio che non ha mai avuto un carico di lavoro non si inventa il riferimento */
  const nuovo = caricaApp({ ora: '2026-09-30T12:00:00' });
  nuovo.profilo({ level: 'intermedio' }); nuovo.programma(programma());
  assert.strictEqual(nuovo.dati(nuovo.chiama('caricoProssimo', PANCA, 60, 8, 3)).weight, 54);
});

test('MES-06: il carico di riferimento dello scarico è quello di caricoRiferimento() (progressivo.js, W0-T3): un solo calcolo, nessuna copia', () => {
  const app = caricaApp({ ora: '2026-09-30T12:00:00' });
  app.profilo({ level: 'intermedio' }); app.programma(programma());
  app.storia([sed(app, '2026-09-28', [{ nome: PANCA, serie: tre(50, 8) }])]);
  app.g('window.caricoRiferimento = function () { return 80; }');
  assert.strictEqual(app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3)).weight, 72, '80 x 0,9');
});

test('ETA-18: oltre i 65 anni gli aumenti sono dimezzati (anche quelli a percentuale), con il motivo scritto; PAR-Q e sonno scarso restano come prima', () => {
  const dopo = (profilo, rpe) => {
    const app = caricaApp({ ora: LUNEDI });
    app.profilo(profilo);
    /* l'ultima seduta e di due giorni fa: sopra i 65 anni i giorni di pausa si contano doppi, quattro non fanno ancora "rientro" */
    app.storia(dallaPiuRecente([sed(app, '2026-10-03', [{ nome: LEG_PRESS, serie: tre(120, 12, rpe) }]), sed(app, '2026-10-01', [{ nome: LEG_PRESS, serie: tre(120, 12, rpe) }]), sed(app, '2026-09-29', [{ nome: LEG_PRESS, serie: tre(120, 12, rpe) }])]));
    return app.dati(app.chiama('caricoProssimo', LEG_PRESS, 120, 12, 3));
  };
  const adulto = dopo({ age: 30 }), anziano = dopo({ age: 68 });
  assert.strictEqual(adulto.weight, 125, 'adulto: +5 kg');
  assert.strictEqual(anziano.weight, 122.5, 'sessantottenne: +2,5 kg');
  assert.ok(/aumento dimezzato: dopo i 65 anni si sale più piano/.test(anziano.motivo), anziano.motivo);
  assert.ok(!/dimezzato/.test(adulto.motivo));
  assert.strictEqual(dopo({ age: 66, parq: true }).weight, 122.5, 'PAR-Q: come prima (e il motivo e quello della modalita prudente)');
  assert.ok(/modalita prudente/.test(dopo({ age: 66, parq: true }).motivo) && !/dimezzato/.test(dopo({ age: 66, parq: true }).motivo));
  /* aumento a percentuale (serie facili): la meta */
  const su = (profilo) => dopo(profilo, 5).weight - 120;
  assert.ok(su({ age: 68 }) > 0 && su({ age: 68 }) <= su({ age: 30 }) / 2 + 1e-9, 'serie facili: ' + su({ age: 68 }) + ' contro ' + su({ age: 30 }));
});

test('CAR-08 (MES-10): il massimale in calo vuole il 3% e non conta le sedute di scarico', () => {
  const risposta = (ora, sedute) => {
    const app = caricaApp({ ora: ora + 'T12:00:00' });
    app.profilo({ level: 'intermedio' }); app.programma(programma());
    app.storia(dallaPiuRecente(sedute.map(([g, serie]) => sed(app, g, [{ nome: PANCA, serie: serie }]))));
    return app.dati(app.chiama('caricoProssimo', PANCA, 80, 8, 3));
  };
  /* sabato della settimana 3 (carico). Ultima seduta mancata (7 ripetizioni): il massimale cala di oltre il 3% a ogni seduta -> scarico mirato */
  const cala = risposta('2026-09-26', [['2026-09-24', tre(70, 7)], ['2026-09-21', tre(75, 8)], ['2026-09-16', tre(80, 8)]]);
  assert.strictEqual(cala.tipo, 'scarico', JSON.stringify(cala));
  /* un calo dell'1% e rumore del RIR (prima scattava: "strettamente in calo") */
  const rumore = risposta('2026-09-26', [['2026-09-24', tre(79, 7)], ['2026-09-21', tre(79.5, 8)], ['2026-09-16', tre(80, 8)]]);
  assert.notStrictEqual(rumore.tipo, 'scarico', JSON.stringify(rumore));
  /* la settimana di scarico (28 settembre - 4 ottobre) in mezzo non spezza la serie: il suo carico basso non conta */
  const conScarico = risposta('2026-10-09', [['2026-10-07', tre(70, 7)], ['2026-09-30', tre(55, 8)], ['2026-09-21', tre(75, 8)], ['2026-09-16', tre(80, 8)]]);
  assert.strictEqual(conScarico.tipo, 'scarico', JSON.stringify(conScarico));
});

test('regole spente: con MES-06, MES-10, MES-11 e MES-12 spente tornano i comportamenti di prima (per le prove e per spegnerle in caso di dubbio)', () => {
  const tutte = ['MES-06', 'MES-10', 'MES-11', 'MES-12'];
  /* MES-06: lo scarico si compone di nuovo (54 poi 48,5) */
  const app = caricaApp({ ora: '2026-09-28T12:00:00' });
  app.profilo({ level: 'intermedio' }); app.programma(programma());
  spegnibili(app, tutte); app.spegni(tutte);
  const lista = [sed(app, '2026-09-18', [{ nome: PANCA, serie: tre(60, 8) }]), sed(app, '2026-09-16', [{ nome: PANCA, serie: tre(60, 8) }])];
  const carichi = [];
  ['2026-09-28', '2026-09-30'].forEach(giorno => {
    app.ora(giorno + 'T12:00:00'); app.storia(dallaPiuRecente(lista));
    const r = app.dati(app.chiama('caricoProssimo', PANCA, 60, 8, 3)); carichi.push(r.weight);
    lista.push(sed(app, giorno, [{ nome: PANCA, serie: [[r.weight, 8, true], [r.weight, 8, true]] }]));
  });
  assert.deepStrictEqual(carichi, [54, 48.5]);
  /* MES-10: lo scarico torna a contare nell'esigenza */
  const e = caricaApp({ ora: '2026-10-05T12:00:00' });
  e.profilo({ level: 'intermedio', days: 3, esigenza: { valore: 1.2, sett: '2026-09-14', storia: [] } }); e.programma(programma());
  spegnibili(e, tutte); e.spegni(tutte);
  e.storia(dallaPiuRecente(['2026-09-28', '2026-09-30', '2026-10-02'].map(g => sed(e, g, [{ nome: SQUAT, serie: tre(60, 8, 5) }, { nome: CURL, serie: tre(15, 12, 5) }]))));
  e.g('aggiornaEsigenza()');
  assert.strictEqual(e.json('getProfile().esigenza.valore'), 1.25);
});

test('PCO-01 (riga del principiante): lo schema 5x3 al secondo stallo solo con obiettivo forza; altrimenti -5%', () => {
  const stallo = (goals) => {
    const app = caricaApp({ ora: '2026-09-26T12:00:00' });   /* settimana 3: carico */
    app.profilo({ level: 'principiante', goals: goals });
    app.programma(programma({ goals: goals }));
    app.aggiusti({ esercizi: {}, scarico: null, stalli: { [SQUAT]: 1 } });
    const mancata = [[40, 8, true], [40, 6, true], [40, 5, true]];
    app.storia(dallaPiuRecente([sed(app, '2026-09-24', [{ nome: SQUAT, serie: mancata }]), sed(app, '2026-09-22', [{ nome: SQUAT, serie: mancata }]), sed(app, '2026-09-17', [{ nome: SQUAT, serie: tre(37.5, 8) }]), sed(app, '2026-09-15', [{ nome: SQUAT, serie: tre(35, 8) }])]));
    return app.dati(app.chiama('caricoProssimo', SQUAT, 40, 8, 3));
  };
  const forza = stallo(['forza']), massa = stallo(['massa']);
  assert.deepStrictEqual([forza.reps, forza.sets, forza.weight], [3, 5, 40], JSON.stringify(forza));
  assert.strictEqual(massa.tipo, 'giu');
  assert.strictEqual(massa.weight, 38, JSON.stringify(massa));
  assert.ok(/-5%/.test(massa.motivo) && !/5.3/.test(massa.motivo));
});

test('B10 (ponte): la taratura del RIR non impara piu dal confronto tra serie diverse e dimezza la correzione appresa', () => {
  const app = caricaApp({ ora: LUNEDI });
  app.profilo({ level: 'intermedio' });
  app.aggiusti({ esercizi: {}, scarico: null, rirBias: 1.2 });
  const lista = () => app.g('JSON.parse(' + JSON.stringify(JSON.stringify([{ name: CURL, coachNote: '', tecnicaSeduta: 'calibrazione', reps: 12, completedSets: [{ done: true, reps: 12, rpe: 7 }, { done: true, reps: 12, rpe: 8 }, { done: true, reps: 18, rpe: 10 }] }])) + ')');
  const valori = [];
  for (let i = 0; i < 6; i++) { app.ctx.__l = lista(); app.g('imparaDallaSeduta(__l)'); valori.push(app.json('aggiustiCoach().rirBias')); }
  assert.deepStrictEqual(valori.slice(0, 2), [0.6, 0.3], 'ogni taratura la dimezza');
  assert.strictEqual(valori[valori.length - 1], 0, 'e si spegne (' + valori + ')');
  /* nessuna correzione nuova: partendo da zero resta zero anche se la serie al cedimento "dice" qualcosa */
  app.aggiusti({ esercizi: {}, scarico: null });
  app.ctx.__l = lista(); app.g('imparaDallaSeduta(__l)');
  assert.ok(!app.json('aggiustiCoach().rirBias'), 'niente apprendimento nuovo: ' + app.json('aggiustiCoach().rirBias'));
});

test('B10 (ponte): la serie al cedimento per tarare il RIR non va a principianti, minori, over 65, modalita prudente ne al core', () => {
  /* ultima settimana di carico del blocco: settimana 3 (dal 21 settembre) */
  const giorno = (profilo) => {
    const app = caricaApp({ ora: '2026-09-23T12:00:00' });
    app.profilo(profilo);
    app.programma(programma());
    const piano = { 'Lunedì': [CRUNCH, CURL].map(nome => ({ name: nome, sets: 3, reps: 12, weight: 15, rest: 60, completedSets: [0, 1, 2].map(() => ({ done: false, reps: 12, weight: 15, wasBerserk: false })) })) };
    app.scrivi(app.g('dataKey()'), piano);
    app.g('currentDay = "Lunedì"');
    app.g('applicaCaricoProgressivo("Lunedì")');
    return app.pianoSalvato()['Lunedì'].map(e => [e.name, e.tecnicaSeduta]);
  };
  const adulto = giorno({ level: 'intermedio', age: 30 });
  assert.deepStrictEqual(adulto, [[CRUNCH, ''], [CURL, 'calibrazione']], 'adulto: sul primo isolamento che non e il core');
  assert.ok(giorno({ level: 'principiante', age: 30 }).every(x => x[1] === ''), 'principiante');
  assert.ok(giorno({ level: 'intermedio', age: 16 }).every(x => x[1] === ''), 'minore');
  assert.ok(giorno({ level: 'intermedio', age: 68 }).every(x => x[1] === ''), 'over 65');
  assert.ok(giorno({ level: 'intermedio', age: 30, parq: true }).every(x => x[1] === ''), 'PAR-Q');
});

test('B18 (D-P14): la prontezza alta non aggiunge piu serie sugli accessori', () => {
  const app = caricaApp({ ora: '2026-09-23T12:00:00' });   /* settimana di carico */
  app.profilo({ level: 'intermedio' }); app.programma(programma());
  const piano = { 'Lunedì': [CURL, '🦾 Curl con Manubri'].map(nome => ({ name: nome, sets: 3, reps: 12, weight: 15, rest: 60, completedSets: [0, 1, 2].map(() => ({ done: false, reps: 12, weight: 15, wasBerserk: false })) })) };
  app.scrivi(app.g('dataKey()'), piano);
  app.g('currentDay = "Lunedì"');
  catturaUndo(app);
  assert.strictEqual(app.g('applicaProntezza({ sonno: 2, stress: 2, dolenzia: 2, voglia: 2 })'), 100);
  const dopo = app.pianoSalvato()['Lunedì'];
  assert.deepStrictEqual(dopo.map(e => e.sets), [3, 3], 'prontezza 100%: serie come da piano');
  assert.ok(dopo.every(e => !/Prontezza alta/.test(e.coachNote || '') && e.completedSets.length === 3));
});

test('STD-01: il livello sale solo se anzianita e almeno 2 alzate su 4 concordano; si propone e si annulla', () => {
  /* 30 settimane regolari (2 sedute a settimana) = 7 mesi: LIV-01 dice "intermedio" a chi si e dichiarato principiante */
  const storia = (app, squat, panca) => {
    const lista = [];
    for (let w = 0; w < 30; w++) {
      const lun = new Date(new Date('2026-03-09T12:00:00').getTime() + w * 7 * 86400000);
      [0, 3].forEach(g => lista.push(sed(app, app.ymd(new Date(lun.getTime() + g * 86400000)), [{ nome: SQUAT, serie: [[squat[0], squat[1], true]] }, { nome: PANCA, serie: [[panca[0], panca[1], true]] }, { nome: LEG_PRESS, serie: [[100, 10, true]] }])));
    }
    app.storia(dallaPiuRecente(lista));
  };
  const prova = (squat, panca, extra) => {
    const app = caricaApp({ ora: LUNEDI });
    app.profilo(Object.assign({ level: 'principiante', weight: 80, sex: 'M' }, extra || {}));
    storia(app, squat, panca);
    return app;
  };
  /* due alzate sopra la soglia dell'intermedio (squat 1,75 e panca 1,3 volte il peso: livello 3) */
  const forte = prova([120, 5], [90, 5]);
  const l = forte.json('livelloStimato()');
  assert.strictEqual(l.livello, 'intermedio');
  assert.strictEqual(l.salita, 'intermedio');
  assert.deepStrictEqual(l.standard.alzate.map(a => a.livello).sort(), [3, 3]);
  assert.ok(forte.json('azioniCoach()').some(a => a.bottoni.some(b => b[0] === 'Aggiorna il livello')));
  catturaUndo(forte);
  forte.g('azioneCoach("livello", "")');
  assert.strictEqual(forte.json('getProfile().level'), 'intermedio');
  assert.ok(forte.g('__undo && typeof __undo.f') === 'function', 'annullabile');
  forte.g('__undo.f()');
  assert.strictEqual(forte.json('getProfile().level'), 'principiante', 'dopo Annulla il livello e quello di prima');
  /* stesso storico (mesi, frequenza) ma carichi da principiante: le tabelle smentiscono, niente proposta */
  const debole = prova([60, 8], [50, 8]);
  assert.strictEqual(debole.json('livelloStimato()').livello, 'intermedio', 'LIV-01 da solo direbbe intermedio');
  assert.strictEqual(debole.json('livelloStimato()').salita, null, 'ma 2 alzate su 4 sono sotto la soglia: nessuna proposta');
  assert.ok(!debole.json('azioniCoach()').some(a => a.bottoni.some(b => b[0] === 'Aggiorna il livello')));
  /* con una sola alzata misurata le tabelle non possono ne confermare ne smentire: resta il criterio di LIV-01 */
  const soloMacchine = caricaApp({ ora: LUNEDI });
  soloMacchine.profilo({ level: 'principiante', weight: 80, sex: 'M' });
  soloMacchine.storia(dallaPiuRecente((() => { const l2 = []; for (let w = 0; w < 30; w++) { const lun = new Date(new Date('2026-03-09T12:00:00').getTime() + w * 7 * 86400000); [0, 3].forEach(g => l2.push(sed(soloMacchine, soloMacchine.ymd(new Date(lun.getTime() + g * 86400000)), [{ nome: LEG_PRESS, serie: [[100, 10, true]] }]))); } return l2; })()));
  assert.strictEqual(soloMacchine.json('livelloStimato()').salita, 'intermedio');
  /* regola spenta: torna il criterio di prima (solo LIV-01) */
  spegnibili(debole, ['STD-01']);
  debole.spegni(['STD-01']);
  assert.strictEqual(debole.json('livelloStimato()').salita, 'intermedio');
  /* senza consenso il coach non cambia il livello */
  const senza = prova([120, 5], [90, 5]);
  senza.consenso(false);
  senza.g('azioneCoach("livello", "")');
  assert.strictEqual(senza.json('getProfile().level'), 'principiante');
  /* il nuovo ciclo sale di livello solo se la proposta regge */
  const ciclo = prova([60, 8], [50, 8]);
  ciclo.programma(programma());
  ciclo.g('nuovoCiclo()');
  assert.strictEqual(ciclo.json('getProgramma()').level || ciclo.json('getProfile().level'), 'principiante');
});

test('STD-01: un avanzato dichiarato con numeri da principiante riceve una proposta di revisione, annullabile', () => {
  const storia = (app, squat, panca) => {
    const lista = [];
    for (let w = 0; w < 8; w++) {
      const lun = new Date(new Date('2026-08-10T12:00:00').getTime() + w * 7 * 86400000);
      [0, 3].forEach(g => lista.push(sed(app, app.ymd(new Date(lun.getTime() + g * 86400000)), [{ nome: SQUAT, serie: [[squat, 8, true]] }, { nome: PANCA, serie: [[panca, 8, true]] }])));
    }
    app.storia(dallaPiuRecente(lista));
  };
  const app = caricaApp({ ora: LUNEDI });
  app.profilo({ level: 'avanzato', weight: 80, sex: 'M' });
  storia(app, 40, 30);     /* squat 0,6 volte il peso, panca 0,5: sotto il livello 2 */
  const l = app.json('livelloStimato()');
  assert.strictEqual(l.revisione, 'intermedio');
  assert.ok(l.standard.alzate.every(a => a.livello < 2));
  const az = app.json('azioniCoach()').find(a => a.bottoni.some(b => b[0] === 'Passa a intermedio'));
  assert.ok(az, 'proposta di revisione: ' + JSON.stringify(app.json('azioniCoach()')));
  assert.ok(/rivedere il livello o il peso di partenza/.test(az.testo));
  assert.ok(az.bottoni.some(b => b[0] === 'Lascia com’è'));
  catturaUndo(app);
  app.g('azioneCoach("rivediLivello", "")');
  assert.strictEqual(app.json('getProfile().level'), 'intermedio');
  app.g('__undo.f()');
  assert.strictEqual(app.json('getProfile().level'), 'avanzato', 'annullabile');
  /* "Lascia com'e": la proposta sparisce per 4 settimane */
  app.g('azioneCoach("livelloOk", "")');
  assert.ok(!app.json('azioniCoach()').some(a => a.bottoni.some(b => b[0] === 'Passa a intermedio')));
  assert.strictEqual(app.json('getProfile().level'), 'avanzato');
  app.ora('2026-11-09T12:00:00');
  assert.ok(app.json('azioniCoach()').some(a => a.bottoni.some(b => b[0] === 'Passa a intermedio')), 'dopo 5 settimane si ripropone');
  /* un avanzato che solleva davvero non riceve niente; con il peso fuori campo (45 kg) il confronto e solo indicativo */
  const ok = caricaApp({ ora: LUNEDI }); ok.profilo({ level: 'avanzato', weight: 80, sex: 'M' }); storia(ok, 150, 110);
  assert.strictEqual(ok.json('livelloStimato()').revisione, null);
  const leggero = caricaApp({ ora: LUNEDI }); leggero.profilo({ level: 'avanzato', weight: 45, sex: 'M' }); storia(leggero, 30, 20);
  assert.strictEqual(leggero.json('livelloStimato()').revisione, null, 'peso fuori campo: indicativo, nessuna proposta');
  /* senza almeno 2 alzate misurate non si propone niente */
  const una = caricaApp({ ora: LUNEDI }); una.profilo({ level: 'avanzato', weight: 80, sex: 'M' });
  una.storia(dallaPiuRecente([0, 1, 2, 3, 4, 5, 6].map(i => sed(una, '2026-09-' + String(10 + i).padStart(2, '0'), [{ nome: SQUAT, serie: [[40, 8, true]] }]))));
  assert.strictEqual(una.json('livelloStimato()').revisione, null);
});

test('MES-10: gli esercizi "fermi" non si contano sugli scarichi e lo strain non chiede un secondo scarico subito dopo il primo', () => {
  /* STA-01 del principiante: ultime tre sedute con il massimale che "non sale" solo perche l'ultima e di scarico */
  const app = caricaApp({ ora: LUNEDI });
  app.profilo({ level: 'principiante' }); app.programma(programma());
  app.storia(dallaPiuRecente([sed(app, '2026-10-02', [{ nome: PANCA, serie: tre(55, 8) }]), sed(app, '2026-09-25', [{ nome: PANCA, serie: tre(62.5, 8) }]), sed(app, '2026-09-23', [{ nome: PANCA, serie: tre(60, 8) }]), sed(app, '2026-09-21', [{ nome: PANCA, serie: tre(57.5, 8) }])]));
  assert.deepStrictEqual(app.json('eserciziFermi()'), [], 'la seduta di scarico (settimana 4) non fa risultare fermo l\'esercizio');
  /* di controllo: lo stesso storico con l'ultima seduta di carico (programma senza scarico) e fermo */
  const c = caricaApp({ ora: LUNEDI });
  c.profilo({ level: 'principiante' }); c.programma(programma({ fasi: FASI8.map(() => 'carico') }));
  c.storia(dallaPiuRecente([sed(c, '2026-10-02', [{ nome: PANCA, serie: tre(55, 8) }]), sed(c, '2026-09-25', [{ nome: PANCA, serie: tre(62.5, 8) }]), sed(c, '2026-09-23', [{ nome: PANCA, serie: tre(60, 8) }]), sed(c, '2026-09-21', [{ nome: PANCA, serie: tre(57.5, 8) }])]));
  assert.deepStrictEqual(c.json('eserciziFermi()'), [PANCA]);
  /* strain: tre settimane con carico e fatica che salgono */
  const strain = (programmaFasi) => {
    const a = caricaApp({ ora: LUNEDI });
    a.profilo({ level: 'intermedio' }); a.programma(programma({ fasi: programmaFasi }));
    const fb = (srpe, minuti) => ({ feedback: { srpe: srpe }, minuti: minuti });
    a.storia(dallaPiuRecente([sed(a, '2026-10-05', [{ nome: PANCA, serie: tre(60, 8) }], fb(9, 60)), sed(a, '2026-09-29', [{ nome: PANCA, serie: tre(60, 8) }], fb(9, 50)), sed(a, '2026-09-22', [{ nome: PANCA, serie: tre(60, 8) }], fb(8, 40))]));
    return a.json('azioniCoach()').some(x => x.bottoni.some(b => /scarico/i.test(b[1]) || b[0] === 'Scarico ora'));
  };
  assert.strictEqual(strain(FASI8.map(() => 'carico')), true, 'di controllo: senza scarichi la proposta c\'e');
  assert.strictEqual(strain(FASI8), false, 'con la settimana 4 di scarico appena passata non se ne propone un altro');
});

test('ETA-04: sotto i 18 anni niente numeri su peso, cibo e integratori; niente giudizi sulla BIA', () => {
  const corpo = (age) => { const a = caricaApp({ ora: LUNEDI }); a.profilo({ age: age, weight: 70, sex: 'M', goals: ['dimagrimento'] }); return a.json('corpoCoach()').join(' | '); };
  const adulto = corpo(30), minore = corpo(16);
  assert.ok(/Creatina/.test(adulto) && /Proteine/.test(adulto) && /Passi/.test(adulto), 'adulto: come prima');
  assert.ok(!/Creatina|Proteine|Passi|calando|g al giorno/i.test(minore), 'minore: ' + minore);
  assert.ok(/medico o un dietista/.test(minore) && /qualcuno di cui ti fidi/.test(minore), 'minore: rinvio a un adulto e a un professionista');
  assert.ok(/Creatina/.test(corpo(0)), 'eta mancante: come un adulto (la decide l\'onboarding, W0-T2)');
  const spento = caricaApp({ ora: LUNEDI });
  spegnibili(spento, ['ETA-04']); spento.spegni(['ETA-04']); spento.profilo({ age: 16, weight: 70, sex: 'M' });
  assert.ok(/Creatina/.test(spento.json('corpoCoach()').join(' ')), 'regola spenta: come prima');
  /* BIA: i valori di riferimento sono da adulti */
  const bia = { phase: 3.5, ecw: 20, tbw: 40 };
  const app = caricaApp({ ora: LUNEDI });
  const a = app.dati(app.chiama('statoBia', { bia: bia, age: 30, sex: 'M' }, {})), m = app.dati(app.chiama('statoBia', { bia: bia, age: 16, sex: 'M' }, {}));
  assert.ok(a.livello === 2 && a.testi.length > 0, 'adulto: due bandiere');
  assert.deepStrictEqual([m.livello, m.testi, m.faBassa, m.ecwAlto], [0, [], false, false], 'minore: nessun giudizio');
});
