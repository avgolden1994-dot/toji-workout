/* Scarico unico e protezioni (P3-B, piano coach v2 W3-T5, versione snella: MES-05, MES-07, CST-09, N6, PRN-03; solo programmi con prog.versione 2).
   Una dose sola (DOSE_SCARICO si deriva da scaricoSerie e scaricoCarico di soglie-struttura.js: la «alta» e a 0,40 e non a 0,30), un esercizio da 2 serie che nello scarico
   scende davvero (N6), la 12a settimana del principiante con il carico del riferimento di prima dello scarico (PRN-03: non ridotto, mai composto), le protezioni dello scarico deciso dal
   coach (MES-07: mai da un solo segnale, non nelle prime 2 settimane del blocco, non entro 14 giorni da un altro scarico, uno ogni 3 settimane, non vicino a quello del programma) e il
   messaggio della stanchezza che non passa (CST-09: riposo o camminate e il medico, mai «sovrallenamento»).
   Cio che NON c e: S3 (deriva dell RPE: il piano non salva ancora l RPE bersaglio per serie), lo spostamento dello scarico del programma (le settimane sono fisse: «anticipare» vuol dire
   non scaricare due volte vicino), la dose «reattiva mirata» di CAR-08 (regole-ricerca.js, di P3-A: resta COACH_PARAMETRI.scaricoReattivoCarico).
   Le prove che dicono «ora c e» falliscono sul codice di coach-v2-onda-2g; le guardie («i v1 tengono la dose di prima», «lo scarico non si compone», la storia dei v1) passano anche li.
   Prove in node con l app vera in vm (tests/aiuto-app.js, orologio finto). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const H = require('./aiuto-atleta-piano');
const R = path.join(__dirname, '..');

const FB = (srpe, extra) => Object.assign({ srpe: srpe, arrivo: 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, esercizi: [] }, extra || {});
const ALTA = { serie: 0.4, carico: 0.9 }, MEDIA = { serie: 0.5, carico: 0.9 }, BASSA = { serie: 0.65, carico: 0.95 };
const SQUAT = '🦵 Squat con Bilanciere', PANCA = '💪 Panca Piana Bilanciere', REMATORE = '🏹 Rematore con Bilanciere';

/* cio che serve a ogni scenario: l orologio, la storia di sedute e di prontezza con date relative a ADESSO dell app */
function storiaFb(a, lista) {   /* [{ ggFa, fb, nomi, extra }] dal piu recente */
  a.storia(lista.map(x => {
    const es = (x.nomi || [SQUAT]).map(n => ({ nome: n, serie: [[100, 5, true, 8], [100, 5, true, 8], [100, 5, true, 8]] }));
    return a.seduta(x.ggFa, es, Object.assign({ feedback: x.fb || null }, x.extra || {}));
  }));
}
function prontezza(a, punteggi, extra, fine) {   /* punteggi dal piu vecchio: un check-in al giorno, l ultimo oggi (o `fine` giorni fa) */
  const n = punteggi.length, f = fine || 0;
  a.scrivi('coach_plus_prontezza_storia_toji', punteggi.map((x, i) => Object.assign({ data: a.ymd(a.giorniFa(n - 1 - i + f)), punteggio: x, sonno: 1, voglia: 1 }, extra && extra[i] ? extra[i] : {})));
}
/* i messaggi con Annulla dell app (showUndo) si registrano, e l ultimo Annulla si tocca come farebbe l utente */
function registraMessaggi(a) {
  a.g('globalThis.__msgs = []; window.showUndo = function (m, u) { __msgs.push(String(m)); lastUndo = u || null; }');
  return a;
}
const messaggi = a => a.json('__msgs');
const annullaUltimo = a => a.g('(() => { const f = lastUndo; lastUndo = null; if (f) f(); return !!f; })()');
const aggiusti = a => a.json('aggiustiCoach()');
const decisioni = (a, fb, prec) => a.dati(a.chiama('decisioniCoach', fb, prec || [], {}));

/* ============ una dose sola ============ */

function sorgenti() {
  const out = [];
  (function giro(d) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const f = path.join(d, e.name); if (e.isDirectory()) giro(f); else if (/\.js$/.test(e.name)) out.push(f); }); })(path.join(R, 'js'));
  return out.filter(f => !/[\\/]lingue[\\/]/.test(f) && !/catalogo-regole\.js$/.test(f));
}
const senzaCommenti = t => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:"'\\])\/\/.*$/gm, '$1');

test('una sola dose di scarico: nessuna tabella di dosi fuori dalle soglie, e DOSE_SCARICO non ha numeri suoi', () => {
  const rx = /(bassa|media|alta)\s*:\s*\{\s*serie\s*:\s*0?\.\d+/;
  const dove = sorgenti().filter(f => rx.test(senzaCommenti(fs.readFileSync(f, 'utf8')))).map(f => path.relative(R, f).split(path.sep).join('/'));
  assert.deepStrictEqual(dove, ['js/coach/sicurezza/soglie-scarico.js'], 'la sola tabella di dosi fuori da soglie-struttura.js e quella dei programmi v1 (D-P5), che sta in un file soglie');
  /* i file di P3-B non hanno un decimale di scarico nel codice (i fattori stanno nelle soglie); negli altri file lo scarico non porta numeri nelle sue righe */
  ['js/coach/sicurezza/scarico.js', 'js/coach/volume/rampa-settimana.js'].forEach(f => {
    const num = senzaCommenti(fs.readFileSync(path.join(R, f), 'utf8')).match(/\b0\.\d+/g);
    assert.strictEqual(num, null, f + ': nessun fattore numerico nel codice (' + num + ')');
  });
  ['js/coach/dolore-mattina.js', 'js/coach/prontezza.js', 'js/coach/questionario-decisioni.js', 'js/coach/repertorio.js'].forEach(f => {
    const righe = senzaCommenti(fs.readFileSync(path.join(R, f), 'utf8')).split('\n').filter(r => /scarico/i.test(r) && (/\b0\.\d+/.test(r) || /serie -\d|carico -\d|volume -\d/.test(r)));
    assert.deepStrictEqual(righe, [], f + ': nessuna dose scritta nelle righe dello scarico');
  });
});

test('residui noti (non di P3-B): i soli numeri di dose fuori dalle soglie sono i tre di parametri.js, usati da CAR-08 e dallo scarico senza storia in regole-ricerca.js (di P3-A)', () => {
  const usi = sorgenti().filter(f => /scaricoReattivo(Carico|Serie)|scaricoProgressioneSerie/.test(senzaCommenti(fs.readFileSync(f, 'utf8')))).map(f => path.relative(R, f).split(path.sep).join('/')).sort();
  assert.deepStrictEqual(usi, ['js/coach/dolore-mattina.js', 'js/coach/parametri.js', 'js/coach/questionario-decisioni.js', 'js/coach/regole-ricerca.js'],
    'dolore-mattina.js e questionario-decisioni.js li tengono solo per i programmi v1; regole-ricerca.js (P3-A) li usa ancora in CAR-08 e per lo scarico di un esercizio mai fatto');
});

test('DOSE_SCARICO nei programmi v2 si deriva da scaricoSerie e scaricoCarico (soglie-struttura.js): bassa 0,65 · 0,95, media 0,50 · 0,90, alta 0,40 · 0,90; il testo dice la dose vera', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  const soglia = n => a.json("sogliaStruttura('" + n + "')");
  const dose = a.json('({ bassa: DOSE_SCARICO.bassa, media: DOSE_SCARICO.media, alta: DOSE_SCARICO.alta })');
  ['bassa', 'media', 'alta'].forEach(k => assert.deepStrictEqual([dose[k].serie, dose[k].carico], [soglia('scaricoSerie')[k], soglia('scaricoCarico')[k]], k));
  assert.deepStrictEqual([dose.bassa.t, dose.media.t, dose.alta.t], ['volume -35% e carico -5%', 'volume -50% e carico -10%', 'volume -60% e carico -10%'],
    'la «alta» e -60% (non -70%: con il minimo di 2 serie il -70% era solo testo) e la «bassa» dice anche il carico');
  assert.strictEqual(dose.alta.serie, 0.4);
});

test('i programmi v1 (nessun piano) tengono la dose di prima, frasi comprese: «alta» a 0,30 e -70%', () => {
  const { a } = H.telefono({ v1: true, d: { level: 'intermedio' } });
  const dose = a.json('({ bassa: DOSE_SCARICO.bassa, media: DOSE_SCARICO.media, alta: DOSE_SCARICO.alta })');
  assert.deepStrictEqual(dose, { bassa: { serie: 0.65, carico: 0.95, t: 'volume -35%' }, media: { serie: 0.5, carico: 0.9, t: 'volume -50% e carico -10%' }, alta: { serie: 0.3, carico: 0.9, t: 'volume -70% e carico -10%' } });
  a.spegni(['MES-05']);
  const v2 = H.telefono({ d: { level: 'intermedio' } });
  v2.a.spegni(['MES-05']);
  assert.strictEqual(v2.a.json('DOSE_SCARICO.alta.serie'), 0.3, 'con MES-05 spenta anche un programma v2 torna alla dose di prima');
});

/* ============ N6: un esercizio da 2 serie viene davvero alleggerito ============ */

test('N6: nello scarico un esercizio da 2 serie scende a 1 (prima restava a 2: il «-70%» era solo testo); da 3 serie in su il minimo e 2', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  const s = (picco, k) => a.json('serieDiScarico(' + picco + ', DOSE_SCARICO.' + k + '.serie)');
  assert.deepStrictEqual(['bassa', 'media', 'alta'].map(k => s(2, k)), [1, 1, 1], 'picco 2: tutte e tre le dosi tolgono lavoro');
  assert.deepStrictEqual(['bassa', 'media', 'alta'].map(k => s(3, k)), [2, 2, 2]);
  assert.deepStrictEqual(['bassa', 'media', 'alta'].map(k => s(4, k)), [3, 2, 2], 'a 4 serie «media» e «alta» coincidono: il minimo di 2 serie dice cosi (B4, C.4)');
  assert.deepStrictEqual(['bassa', 'media', 'alta'].map(k => s(5, k)), [3, 3, 2], 'da 5 serie in su la «alta» e davvero piu leggera della «media»');
  assert.deepStrictEqual(['bassa', 'media', 'alta'].map(k => s(6, k)), [4, 3, 2]);
});

test('N6 in seduta: nella settimana di scarico dell intermedio gli esercizi da 2 serie fanno 1 serie, quelli da 4 fanno 3, e il carico e il riferimento x dose', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  const nomi = []; a.json('DAYS').forEach(g => (a.json('loadData()')[g] || []).forEach(e => nomi.push(e.name)));
  /* una seduta di tre giorni prima con tutti gli esercizi a 40 kg: il riferimento */
  H.vaiA(a, 6, 0);
  a.storia([a.seduta(3, nomi.map(nome => ({ nome: nome, serie: [[40, 8, true, 8], [40, 8, true, 8]] })), { feedback: FB(6), settimana: { numero: 5, fase: 'carico' } })]);
  let con2 = 0, scarichi = 0;
  H.giorniDiAllenamento(a).forEach(g => {
    const voci = H.apriGiorno(a, g);
    assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
    assert.strictEqual(a.json('livelloFatica()'), 'bassa', 'sRPE 6 e nessuna prontezza: dose bassa (serie -35%, carico -5%)');
    voci.forEach(e => {
      const attese = Math.max(e.setsBase >= 3 ? 2 : 1, Math.round(e.setsBase * 0.65));
      assert.strictEqual(e.sets, attese, e.name + ': picco ' + e.setsBase);
      if (e.setsBase === 2) { con2++; assert.strictEqual(e.sets, 1); }
      if (e.coachTipo === 'scarico') {
        scarichi++;
        assert.strictEqual(e.weight, 38, e.name + ': 40 kg x 0,95');
        assert.ok(/Settimana di scarico: volume -35% e carico -5%/.test(e.coachNote), e.coachNote);
        assert.ok(!/ripartire/.test(e.coachNote), 'niente «ripartire piu forte»: non ha base');
      }
    });
  });
  assert.ok(con2 >= 2 && scarichi >= 10, 'il programma ha esercizi da 2 serie (' + con2 + ') e le voci di scarico sono ' + scarichi);
});

test('N6 con la fatica alta: a 5 e 6 serie la dose «alta» da 2 serie, la «media» da 3; un esercizio da 4 serie fa 2 con entrambe', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  H.vaiA(a, 6, 0);
  a.storia([a.seduta(3, [{ nome: SQUAT, serie: [[100, 5, true, 8], [100, 5, true, 8]] }], { feedback: FB(10), settimana: { numero: 5, fase: 'carico' } }),
    a.seduta(5, [{ nome: SQUAT, serie: [[100, 5, true, 8]] }], { feedback: FB(10), settimana: { numero: 5, fase: 'carico' } })]);
  assert.strictEqual(a.json('livelloFatica()'), 'alta');
  const per = picco => a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 100, 5, ' + picco + ')');
  assert.deepStrictEqual([2, 3, 4, 5, 6].map(x => per(x).sets), [1, 2, 2, 2, 2]);
  assert.strictEqual(per(5).weight, 90, 'x 0,90 sul riferimento (100 kg)');
  assert.ok(/volume -60% e carico -10%/.test(per(5).motivo), per(5).motivo);
});

test('lo scarico non si compone: due sedute della stessa settimana hanno lo stesso carico (riferimento x dose), la ripresa e al 100% del riferimento', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  H.vaiA(a, 5, 0);
  a.storia([a.seduta(2, [{ nome: SQUAT, serie: [[100, 5, true, 8], [100, 5, true, 8], [100, 5, true, 8]] }], { feedback: FB(6), settimana: { numero: 5, fase: 'carico' } })]);
  H.vaiA(a, 6, 0);
  const w1 = a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 100, 5, 4)');
  assert.deepStrictEqual([w1.tipo, w1.weight, w1.sets], ['scarico', 95, 3], '100 kg x 0,95, 4 x 0,65 = 2,6 -> 3 serie');
  /* la seduta di scarico e fatta: la seconda della settimana parte ancora da 100 kg, non da 95 */
  a.storia([a.seduta(0, [{ nome: SQUAT, serie: [[95, 5, true, 8], [95, 5, true, 8], [95, 5, true, 8]] }], { feedback: FB(6), settimana: { numero: 6, fase: 'scarico' } })].concat(a.leggi(a.chiave('historyKey'))));
  const w2 = a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 100, 5, 4)');
  assert.strictEqual(w2.weight, 95, 'stesso carico di riferimento (100 kg x 0,95), non 90,25');
  H.vaiA(a, 7, 0);
  const rip = a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 100, 5, 4)');
  assert.ok(rip.weight >= 100, 'dopo lo scarico si riparte dal riferimento: ' + rip.weight);
});

/* ============ PRN-03: la 12a settimana del principiante (verifica) ============ */

function dodiciSettimane(opz) {
  const { a, p } = H.telefono({ d: Object.assign({ level: 'principiante' }, opz && opz.d) });
  const ultimoCarico = {};   /* nome -> carico dell ultima seduta di carico fatta */
  for (let n = 1; n <= 11; n++) {
    const s = H.viviSettimana(a, n, { feedback: FB(6) });
    assert.strictEqual(s.fase, 'carico', 'settimana ' + n + ' di carico (il controllo dell 8a continua: fatica bassa, nessun segnale)');
    Object.keys(s.giorni).forEach(g => s.giorni[g].forEach(e => { ultimoCarico[e.name] = { weight: e.weight, sets: e.sets, picco: e.setsBase }; }));
  }
  return { a, p, ultimoCarico };
}

test('PRN-03: la 12a settimana ha il carico del riferimento di prima (entro un passo, in pratica uguale), le serie -33% e il RIR 3-4; dodici settimane vissute una dopo l altra', () => {
  const { a, p, ultimoCarico } = dodiciSettimane();
  assert.strictEqual(p.piano.settimane[11].fase, 'scarico');
  assert.strictEqual(p.piano.settimane[11].carico, 1);
  H.vaiA(a, 12, 0);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  const giorni = H.giorniDiAllenamento(a);
  let provati = 0;
  giorni.forEach(g => H.apriGiorno(a, g).forEach(e => {
    const rif = ultimoCarico[e.name];
    if (!rif) return;
    const passo = a.json('incrementoPer(' + JSON.stringify(e.name) + ')');
    assert.ok(Math.abs(e.weight - rif.weight) <= passo, e.name + ': ' + e.weight + ' contro il riferimento ' + rif.weight + ' (un passo = ' + passo + ')');
    assert.strictEqual(e.weight, rif.weight, e.name + ': carico invariato');
    /* serie: da 3 a 2 (-33%); un esercizio da 2 serie resta a 2 (la tabella del principiante: 2/2) */
    assert.strictEqual(e.sets, Math.min(e.setsBase, 2), e.name);
    assert.ok(/Settimana di verifica: volume -35%, stesso carico di prima/.test(e.coachNote), e.coachNote);
    if (e.weight > 0) assert.ok(/lascia 3–4 ripetizioni in riserva/.test(e.coachNote), 'RIR 3-4: ' + e.coachNote);
    assert.ok(!/ripartire|-5%|-10%/.test(e.coachNote), 'niente carico ridotto nel motivo: ' + e.coachNote);
    provati++;
  }));
  assert.ok(provati >= 4, 'esercizi confrontati: ' + provati);
});

test('PRN-03: la 12a settimana vale anche per una donna che punta alla forza: carico invariato, serie da 3 a 2', () => {
  const { a, ultimoCarico } = dodiciSettimane({ d: { goals: ['forza'], sex: 'F', age: 41, days: 3, minutes: 50 } });
  H.vaiA(a, 12, 0);
  let provati = 0;
  H.giorniDiAllenamento(a).forEach(g => H.apriGiorno(a, g).forEach(e => {
    const rif = ultimoCarico[e.name];
    if (!rif || !(e.weight > 0)) return;
    assert.strictEqual(e.weight, rif.weight, e.name + ': carico invariato');
    assert.ok(e.sets <= Math.min(e.setsBase, 2) || e.setsBase <= 2, e.name + ': ' + e.sets + ' serie da ' + e.setsBase);
    provati++;
  }));
  assert.ok(provati >= 3, 'esercizi con carico confrontati: ' + provati);
});

test('PRN-03: la verifica non si compone: la seconda seduta della 12a settimana ha lo stesso carico della prima, e senza storia il carico e quello del programma', () => {
  const { a, ultimoCarico } = dodiciSettimane();
  H.vaiA(a, 12, 0);
  const giorni = H.giorniDiAllenamento(a);
  const prima = H.vivi(a, giorni[0], { feedback: FB(6) }).voci;
  H.vaiA(a, 12, 3);
  const seconda = H.apriGiorno(a, giorni[giorni.length > 2 ? 2 : 1]);
  prima.forEach(e => { if (e.weight > 0) assert.strictEqual(e.weight, ultimoCarico[e.name].weight, 'prima seduta ' + e.name); });
  seconda.forEach(e => { const rif = ultimoCarico[e.name]; if (rif && e.weight > 0) assert.strictEqual(e.weight, rif.weight, 'seconda seduta ' + e.name); });
  /* un esercizio mai fatto nella settimana di verifica: il carico del programma, invariato */
  const r = a.json('caricoProssimo("🦵 Hack Squat Mai Fatto", 80, 10, 3)');
  assert.strictEqual(r.weight, 80);
});

test('l 8a settimana del controllo (scarico «basso» del principiante) alleggerisce davvero un esercizio da 2 serie e ha il carico -5% sul riferimento', () => {
  const { a } = H.telefono({ sett: 8, giorno: 2, d: { level: 'principiante' } });
  a.storia([0, 1, 2].map(i => a.seduta(2 + 2 * i, [{ nome: SQUAT, serie: [[60, 10, true], [60, 10, true], [60, 10, true]] }], { feedback: FB(10), settimana: { numero: 7, fase: 'carico' } })));
  assert.strictEqual(a.json('settimanaProgramma().doseFissa'), 'bassa');
  const due = a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 60, 10, 2)'), tre = a.json('caricoProssimo(' + JSON.stringify(SQUAT) + ', 60, 10, 3)');
  assert.deepStrictEqual([due.sets, tre.sets, tre.weight], [1, 2, 57], 'da 2 serie a 1, da 3 a 2, 60 kg x 0,95');
});

/* ============ MES-07: lo scarico deciso dal coach ha le sue protezioni ============ */

/* un intermedio alla settimana `sett` (blocco 5+1), con le due condizioni per uno scarico: tre sedute su tre «Al limite» (S7) e tre giorni di prontezza bassa (S1).
   Il resto lo spegne o lo accende ogni prova */
function intermedioStanco(sett, giorno) {
  const { a, p } = H.telefono({ sett: sett, giorno: giorno || 2, d: { level: 'intermedio' } });
  storiaFb(a, [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }]);
  prontezza(a, [70, 45, 40, 38]);
  return { a, p };
}

test('MES-07 base: due segnali (sedute al limite e prontezza bassa) a meta blocco, lontano da altri scarichi: il coach propone lo scarico con la dose unica «alta» e i segnali', () => {
  const { a } = intermedioStanco(4);
  const v = a.json("valutaScaricoReattivo('S7')");
  assert.deepStrictEqual([v.ok, v.segnali], [true, ['S1', 'S7']]);
  const d = decisioni(a, FB(10), [FB(10), FB(10)]);
  const sc = d.find(x => x.tipo === 'scarico');
  assert.ok(sc, JSON.stringify(d));
  assert.strictEqual(sc.testo, 'Fatica accumulata: le prossime 2 sedute sono di scarico (serie -60%, carico -10%) per ricaricare le energie. • segnali: prontezza bassa, sedute al limite');
  /* applicarla scrive la voce con la dose della fatica di adesso e la durata unica, e si annulla */
  const annulla = a.chiama('applicaDecisioni', d, FB(10));
  assert.deepStrictEqual(aggiusti(a).scarico, { sedute: 2, motivo: 'fatica accumulata nelle ultime sedute', dose: 'alta' });
  annulla();
  assert.strictEqual(aggiusti(a).scarico, null, 'annullato');
});

test('MES-07 protezione 1: mai da un solo segnale (le sedute al limite da sole non scaricano: il coach lo dice e aspetta il secondo)', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  storiaFb(a, [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }]);
  prontezza(a, [85, 80, 90, 85]);
  const v = a.json("valutaScaricoReattivo('S7')");
  assert.deepStrictEqual([v.ok, v.codice], [false, 'unSegnale']);
  const d = decisioni(a, FB(10), [FB(10), FB(10)]);
  assert.ok(!d.some(x => x.tipo === 'scarico'), 'nessuno scarico');
  const o = d.find(x => x.tipo === 'osserva');
  assert.ok(o && /Un solo segnale di stanchezza non basta per scaricare/.test(o.testo), JSON.stringify(d));
  a.chiama('applicaDecisioni', d, FB(10));
  assert.strictEqual(aggiusti(a).scarico, null, 'niente scritto');
  /* un secondo segnale diverso da S1/S2/S3 non basta: servono S7 e S5 + uno tra S1, S2, S3 */
  prontezza(a, [85, 80, 90, 85], [{ sonno: 0 }, { sonno: 0 }, { sonno: 0 }, { sonno: 0 }]);
  assert.strictEqual(a.json("valutaScaricoReattivo('S7')").ok, false, 'sedute al limite + sonno scarso: due segnali ma nessuno tra prontezza, forza, deriva dell RPE');
});

test('MES-07 un segnale forte basta: prontezza media delle ultime tre sotto 40', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  storiaFb(a, [{ ggFa: 1, fb: FB(6) }]);
  prontezza(a, [60, 35, 30, 38]);
  const v = a.json("valutaScaricoReattivo('S1')");
  assert.deepStrictEqual([v.ok, v.forte], [true, true]);
});

test('MES-07 S2: il massimale in calo di almeno 5% su due multiarticolari e un segnale (con le sedute al limite scarica); su uno solo no', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  const vecchia = (n, kg) => a.seduta(12, [{ nome: n, serie: [[kg, 5, true, 8]] }], { feedback: FB(6) });
  const nuova = (n, kg) => a.seduta(2, [{ nome: n, serie: [[kg, 5, true, 8]] }], { feedback: FB(10) });
  a.storia([nuova(SQUAT, 90), nuova(PANCA, 70), a.seduta(5, [{ nome: SQUAT, serie: [[100, 5, true, 8]] }], { feedback: FB(10) }), vecchia(SQUAT, 100), vecchia(PANCA, 80)]);
  prontezza(a, [85, 80, 90, 85]);
  assert.deepStrictEqual(a.json('eserciziInCalo()').sort(), [PANCA, SQUAT].sort());
  const v = a.json("valutaScaricoReattivo('S7')");
  assert.deepStrictEqual([v.ok, v.segnali], [true, ['S2', 'S7']], 'forza in calo e sedute al limite');
  a.storia([nuova(SQUAT, 90), vecchia(SQUAT, 100), nuova(PANCA, 80), vecchia(PANCA, 80)]);
  assert.deepStrictEqual(a.json('eserciziInCalo()'), [SQUAT], 'solo uno: non e un segnale');
  assert.strictEqual(a.json('segnaliFatica().S2'), false);
});

test('MES-07 S5 e S6: il sonno «male» e la voglia «poca» in 4 check-in su 7 sono segnali, la voglia da sola non basta (serve S1, S2 o S3)', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(a, [80, 80, 80, 80, 80, 80, 80], [{ sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }]);
  const s = a.json('segnaliFatica()');
  assert.deepStrictEqual([s.S5, s.S6, s.S1, s.S7], [true, true, false, false]);
  prontezza(a, [80, 80, 80, 80, 80, 80, 80], [{ sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }]);
  const t = a.json('segnaliFatica()');
  assert.deepStrictEqual([t.S5, t.S6], [false, false], 'tre su sette non bastano');
  prontezza(a, [80, 80, 80, 80, 80, 80, 80], [{ sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }, { sonno: 0, voglia: 0 }]);
  assert.strictEqual(a.json("valutaScaricoReattivo('S6')").ok, false, 'voglia e sonno insieme non bastano senza prontezza, forza o RPE');
});

test('MES-07 protezione 2: non nelle prime 2 settimane del blocco (la dolenzia dei primi giorni non e fatica accumulata); dalla 3a si', () => {
  [[1, 'primeSettimane'], [2, 'primeSettimane'], [3, true], [4, true], [7, 'primeSettimane'], [8, 'primeSettimane'], [9, true]].forEach(([sett, atteso]) => {
    const { a } = intermedioStanco(sett);
    const v = a.json("valutaScaricoReattivo('S7')");
    if (atteso === true) assert.strictEqual(v.ok, true, 'settimana ' + sett + ': ' + JSON.stringify(v));
    else assert.deepStrictEqual([v.ok, v.codice], [false, atteso], 'settimana ' + sett);
  });
  const { a } = intermedioStanco(2);
  assert.ok(/prime settimane del blocco/.test(a.json("valutaScaricoReattivo('S7')").perche));
  /* anche i principianti: il blocco e di 12 settimane, le prime 2 sono quelle della dolenzia */
  const principiante = (sett, punteggi) => {
    const pr = H.telefono({ sett: sett, giorno: 2, d: { level: 'principiante' } });
    storiaFb(pr.a, [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }]); prontezza(pr.a, punteggi);
    return pr.a.json("valutaScaricoReattivo('S7')");
  };
  assert.strictEqual(principiante(2, [70, 45, 40, 38]).codice, 'primeSettimane');
  /* chi comincia ha tre settimane, salvo un segnale forte (prontezza media sotto 40): la dolenzia e l abitudine dei primi giorni non sono fatica */
  assert.strictEqual(principiante(3, [70, 45, 40, 38]).codice, 'primeSettimane', 'settimana 3 del principiante: ancora presto');
  assert.strictEqual(principiante(3, [60, 35, 30, 38]).ok, true, 'settimana 3 con un segnale forte: si');
  assert.strictEqual(principiante(4, [70, 45, 40, 38]).ok, true, 'settimana 4: si');
});

/* una seduta in cui il coach aveva scaricato tutti gli esercizi (scarico deciso, non quello del programma), `giorni` giorni fa, nella storia di chi e stanco alla settimana 4 */
function conScaricoDiGiorniFa(giorni) {
  const { a } = intermedioStanco(4);
  const lista = a.leggi(a.chiave('historyKey')).concat([conPrimaSedutaCoach(a, giorni)]);
  a.storia(lista.sort((x, y) => y.id - x.id));
  return a;
}
test('MES-07 protezione 3: non a meno di 14 giorni dall ultimo scarico deciso dal coach (13 e 14 giorni fa); a 15 giorni non e piu questa protezione', () => {
  [10, 13, 14].forEach(g => {
    const v = conScaricoDiGiorniFa(g).json("valutaScaricoReattivo('S7')");
    assert.deepStrictEqual([v.ok, v.codice], [false, 'distanza'], g + ' giorni');
    assert.ok(/da meno di 14 giorni/.test(v.perche), v.perche);
  });
  assert.notStrictEqual(conScaricoDiGiorniFa(15).json("valutaScaricoReattivo('S7')").codice, 'distanza');
  /* lo scarico del programma conta come l ultimo scarico: la settimana 6 e di scarico, nella 7 (primo giorno del blocco) il veto e quello delle prime settimane, a 14 giorni dalla sua fine e gia la 9 */
  const { a } = intermedioStanco(7, 0);
  assert.strictEqual(a.json("valutaScaricoReattivo('S7')").codice, 'primeSettimane');
});

test('MES-07 protezione 4: uno scarico deciso dal coach ogni 3 settimane al massimo: a 17 giorni (oltre i 14 della distanza) blocca ancora, a 22 no', () => {
  const v17 = conScaricoDiGiorniFa(17).json("valutaScaricoReattivo('S7')");
  assert.deepStrictEqual([v17.ok, v17.codice], [false, 'unoOgniTre']);
  assert.ok(/ne decide al massimo uno ogni 3 settimane/.test(v17.perche), v17.perche);
  assert.strictEqual(conScaricoDiGiorniFa(22).json("valutaScaricoReattivo('S7')").ok, true);
});

test('MES-07 protezione 5: se lo scarico del programma e entro 7 giorni si fa quello, nessun secondo scarico (settimana 5: il lunedi dopo e di scarico)', () => {
  const { a } = intermedioStanco(5, 0);
  const v = a.json("valutaScaricoReattivo('S7')");
  assert.deepStrictEqual([v.ok, v.codice], [false, 'programmato']);
  assert.ok(/Lo scarico del programma è tra pochi giorni: si fa quello, senza un secondo scarico/.test(v.perche));
  /* 8 giorni prima non c e nessun veto: settimana 4, lunedi */
  assert.strictEqual(intermedioStanco(4, 0).a.json("valutaScaricoReattivo('S7')").ok, true);
});

test('MES-07: nella settimana di scarico del programma e con uno scarico gia deciso non se ne aggiunge un altro', () => {
  const { a } = intermedioStanco(6, 1);
  assert.strictEqual(a.json("valutaScaricoReattivo('S7')").codice, 'inCorso');
  const b = intermedioStanco(4);
  b.a.aggiusti({ esercizi: {}, scarico: { sedute: 1, motivo: 'x', dose: 'media' } });
  assert.strictEqual(b.a.json("valutaScaricoReattivo('S7')").codice, 'giaDeciso');
});

test('MES-07: i programmi v1 e la regola spenta decidono come prima (un segnale basta, nessuna distanza)', () => {
  const v1 = H.telefono({ v1: true, sett: 1, giorno: 2, d: { level: 'intermedio' } });
  storiaFb(v1.a, [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }]);
  assert.deepStrictEqual(v1.a.json("valutaScaricoReattivo('S7')"), { ok: true, segnali: [], forte: false });
  const d = decisioni(v1.a, FB(10), [FB(10), FB(10)]);
  assert.strictEqual(d.find(x => x.tipo === 'scarico').testo, 'Fatica accumulata: la prossima seduta è di scarico (serie -40%, carico -10%) per ricaricare le energie.', 'il testo di prima');
  v1.a.chiama('applicaDecisioni', d, FB(10));
  assert.deepStrictEqual(aggiusti(v1.a).scarico, { sedute: 1, motivo: 'fatica accumulata nelle ultime sedute' }, 'una seduta, senza dose: come prima');
  const { a } = H.telefono({ sett: 1, giorno: 2, d: { level: 'intermedio' } });
  a.spegni(['MES-07']);
  assert.strictEqual(a.json("valutaScaricoReattivo('S7')").ok, true, 'MES-07 spenta: nessuna protezione');
});

test('PRZ-04 (prontezza bassa tre giorni di fila) nei programmi v2 e un segnale: da sola non scarica, con le sedute al limite si, lo dice e si annulla; la voce voglia entra nella storia', () => {
  const risposte = { sonno: 1, stress: 1, dolenzia: 1, voglia: 0 };   /* prontezza di oggi 40: sotto 50, ma la media delle ultime tre (45, 45, 40) non e «forte» (sotto 40) */
  const prova = (alLimite) => {
    const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
    registraMessaggi(a);
    a.g('currentDay = "Giovedì"');
    storiaFb(a, alLimite ? [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }] : [{ ggFa: 1, fb: FB(6) }]);
    prontezza(a, [45, 45], null, 1);                       /* i due giorni prima: poi oggi */
    a.chiama('applicaProntezza', risposte);
    return a;
  };
  const sola = prova(false);
  assert.strictEqual(aggiusti(sola).scarico, null, 'solo la prontezza bassa: un segnale (PRZ-04 non basta piu da sola)');
  const due = prova(true);
  assert.deepStrictEqual([aggiusti(due).scarico.sedute, aggiusti(due).scarico.dose], [2, 'alta'], 'prontezza bassa e sedute al limite: due segnali');
  assert.ok(messaggi(due).some(m => /Prontezza bassa da giorni e altri segnali di recupero scarso: le prossime 2 sedute sono di scarico/.test(m)), messaggi(due).join(' | '));
  assert.ok(annullaUltimo(due), 'il messaggio ha l Annulla');
  assert.strictEqual(aggiusti(due).scarico, null, 'l annulla toglie lo scarico');
  assert.ok(due.leggi('coach_plus_prontezza_storia_toji').every(x => x.voglia !== undefined), 'la storia porta la voce voglia (S6)');
  /* nelle prime settimane del blocco nemmeno con due segnali */
  const { a } = H.telefono({ sett: 1, giorno: 2, d: { level: 'intermedio' } });
  a.g('currentDay = "Giovedì"');
  storiaFb(a, [{ ggFa: 1, fb: FB(10) }, { ggFa: 3, fb: FB(10) }, { ggFa: 5, fb: FB(10) }]);
  prontezza(a, [45, 45], null, 1);
  a.chiama('applicaProntezza', risposte);
  assert.strictEqual(aggiusti(a).scarico, null, 'settimana 1: la dolenzia dei primi giorni non e fatica accumulata');
});

test('la storia della prontezza dei programmi v1 non porta il campo voglia (la voce di sempre)', () => {
  const { a } = H.telefono({ v1: true, sett: 1, giorno: 2, d: { level: 'intermedio' } });
  a.g('currentDay = "Giovedì"');
  a.chiama('applicaProntezza', { sonno: 2, stress: 2, dolenzia: 2, voglia: 2 });
  assert.ok(a.leggi('coach_plus_prontezza_storia_toji').every(x => !('voglia' in x)));
});

test('STR-01: lo strain in salita da due settimane propone lo scarico solo se le protezioni lo permettono, ha «Non ora» che si annulla, e col tocco passa dalle protezioni', () => {
  const { a } = intermedioStanco(4);
  registraMessaggi(a);
  /* tre settimane con lo sforzo in salita (sRPE 8, 9, 10 x 50 minuti), una seduta al lunedi di ognuna (oggi e mercoledi) */
  const lunedi = k => a.seduta(2 + 7 * k, [{ nome: SQUAT, serie: [[100, 5, true, 8]] }], { feedback: FB([10, 9, 8][k]), minuti: 50 });
  a.storia([lunedi(0), lunedi(1), lunedi(2)]);
  const proposte = () => a.dati(a.chiama('azioniCoach')).filter(x => /meglio due sedute di scarico/.test(x.testo));
  assert.strictEqual(proposte().length, 1, 'strain in salita, fatica alta, prontezza bassa: la proposta c e');
  assert.deepStrictEqual(proposte()[0].bottoni.map(b => b[0]), ['Scarico ora', 'Non ora']);
  a.chiama('azioneCoach', 'scaricoNonOra', '');
  assert.strictEqual(proposte().length, 0, '«Non ora»: la proposta non si ripete per 7 giorni');
  assert.ok(annullaUltimo(a));
  assert.strictEqual(proposte().length, 1, 'annullato: la proposta torna');
  /* col tocco lo scarico passa dalle protezioni: alla settimana 5 quello del programma e tra pochi giorni */
  const b = intermedioStanco(5, 0);
  registraMessaggi(b.a);
  b.a.chiama('azioneCoach', 'scarico', '');
  assert.strictEqual(aggiusti(b.a).scarico, null);
  assert.ok(messaggi(b.a).some(m => /Lo scarico del programma è tra pochi giorni/.test(m)), messaggi(b.a).join(' | '));
  /* e alla settimana 4 passa, con la dose unica e le due sedute */
  a.chiama('azioneCoach', 'scarico', '');
  assert.deepStrictEqual([aggiusti(a).scarico.sedute, aggiusti(a).scarico.dose], [2, 'alta']);
});

/* ============ lo scarico deciso dal coach in seduta: la stessa dose ============ */

test('lo scarico deciso dal coach (CAR-10) dei programmi v2 usa la dose unica della fatica di quando e stato deciso; i v1 i numeri di sempre', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  a.storia([a.seduta(3, [{ nome: SQUAT, serie: [[100, 5, true, 8], [100, 5, true, 8], [100, 5, true, 8]] }], { feedback: FB(6), settimana: { numero: 3, fase: 'carico' } })]);
  a.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'fatica accumulata nelle ultime sedute', dose: 'alta' } });
  const per = picco => a.dati(a.chiama('caricoProssimo', SQUAT, 100, 5, picco));
  assert.deepStrictEqual([2, 3, 4, 5, 6].map(x => per(x).sets), [1, 2, 2, 2, 2], 'dose alta: da 2 serie a 1 (N6)');
  assert.strictEqual(per(4).weight, 90);
  assert.ok(/Scarico deciso dal coach: fatica accumulata nelle ultime sedute • volume -60% e carico -10%/.test(per(4).motivo), per(4).motivo);
  /* senza `dose` (una voce di prima): i numeri di sempre, 0,6 delle serie e 0,9 del carico */
  a.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'x' } });
  assert.deepStrictEqual([2, 3, 4, 5, 6].map(x => per(x).sets), [2, 2, 2, 3, 4]);
  const v1 = H.telefono({ v1: true, sett: 4, giorno: 2, d: { level: 'intermedio' } });
  v1.a.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'x', dose: 'alta' } });
  assert.deepStrictEqual([2, 3, 4].map(x => v1.a.dati(v1.a.chiama('caricoProssimo', SQUAT, 100, 5, x)).sets), [2, 2, 2], 'v1: il campo dose non conta');
});

/* ============ CST-09: la stanchezza che non passa ============ */

function conPrimaSedutaCoach(a, ggFa) {   /* una seduta in cui tutti gli esercizi erano scaricati dal coach (episodio di scarico deciso) */
  const h = a.seduta(ggFa, [{ nome: SQUAT, serie: [[90, 5, true, 8]] }, { nome: PANCA, serie: [[60, 5, true, 8]] }], { feedback: FB(6), settimana: { numero: 2, fase: 'carico' } });
  h.sessione.forEach(e => { e.obiettivo = { reps: 5, sets: 2, coachTipo: 'scarico' }; });
  return h;
}
const html = a => a.g('htmlStanchezzaPersistente()');

test('CST-09: prontezza media di 14 giorni a 37 o meno con almeno 5 misure: messaggio con riposo o camminate e il medico, mai «sovrallenamento»', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(a, [30, 35, 40, 35, 38, 30]);
  const h = html(a);
  assert.ok(/Stanchezza che non passa/.test(h) && /La stanchezza dura da due settimane: questa settimana riposa o fai solo camminate/.test(h), h);
  assert.ok(/parlane con il medico/.test(h) && /l’app non può capire cosa c’è dietro/.test(h), h);
  assert.ok(!/sovrallenament|overtraining|diagnosi/i.test(h), 'mai la parola «sovrallenamento»');
  assert.ok(/nascondiStanchezza/.test(h), 'si puo nascondere');
});

test('CST-09: non scatta con meno di 5 misure, con la media sopra 37, con misure vecchie di piu di 14 giorni', () => {
  [[[30, 35, 40, 35], 'quattro misure'], [[50, 45, 55, 45, 50, 48], 'media 49'], [[40, 40, 40, 40, 40, 40], 'media 40 (sopra 37)']].forEach(([p, nome]) => {
    const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
    prontezza(a, p);
    assert.strictEqual(html(a), '', nome);
  });
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  a.scrivi('coach_plus_prontezza_storia_toji', [20, 25, 30, 35, 30, 30].map((x, i) => ({ data: a.ymd(a.giorniFa(30 + i)), punteggio: x, sonno: 1, voglia: 1 })));
  assert.strictEqual(html(a), '', 'misure di un mese fa');
});

test('CST-09: anche due scarichi decisi dal coach in sei settimane (a piu di 7 giorni uno dall altro) scattano; uno solo, o due nella stessa settimana, no', () => {
  const due = H.telefono({ sett: 5, giorno: 2, d: { level: 'intermedio' } });
  due.a.storia([conPrimaSedutaCoach(due.a, 5), conPrimaSedutaCoach(due.a, 25)]);
  prontezza(due.a, [80, 80]);
  assert.ok(/Il coach ha dovuto alleggerire il programma due volte in poco tempo: questa settimana riposa o fai solo camminate/.test(html(due.a)), html(due.a));
  const uno = H.telefono({ sett: 5, giorno: 2, d: { level: 'intermedio' } });
  uno.a.storia([conPrimaSedutaCoach(uno.a, 5), conPrimaSedutaCoach(uno.a, 7)]);
  assert.strictEqual(html(uno.a), '', 'due sedute della stessa settimana sono un episodio solo');
  const vecchi = H.telefono({ sett: 5, giorno: 2, d: { level: 'intermedio' } });
  vecchi.a.storia([conPrimaSedutaCoach(vecchi.a, 30), conPrimaSedutaCoach(vecchi.a, 50)]);
  assert.strictEqual(html(vecchi.a), '', 'oltre sei settimane');
  /* una seduta con un solo esercizio scaricato (CAR-08 mirato, dolore) non e uno scarico del coach */
  const mirato = H.telefono({ sett: 5, giorno: 2, d: { level: 'intermedio' } });
  const m = [5, 25].map(g => { const h = conPrimaSedutaCoach(mirato.a, g); h.sessione[1].obiettivo.coachTipo = 'nuovo'; h.sessione.push({ name: REMATORE, rest: 90, sets: [{ weight: 50, reps: 8, done: true }], obiettivo: { coachTipo: 'su' } }); return h; });
  mirato.a.storia(m);
  assert.strictEqual(html(mirato.a), '');
});

test('CST-09: «Ho capito» lo nasconde per 7 giorni (e si annulla); senza consenso, con un programma v1 o con la regola spenta non c e', () => {
  const { a } = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(a, [30, 35, 40, 35, 38, 30]);
  assert.notStrictEqual(html(a), '');
  a.g('nascondiStanchezza()');
  assert.strictEqual(html(a), '', 'nascosto');
  assert.strictEqual(aggiusti(a).stanchezzaVistaIl, a.ymd());
  a.ora(a.ora() + 6 * 86400000); prontezza(a, [30, 35, 40, 35, 38, 30]);
  assert.strictEqual(html(a), '', 'ancora nascosto dopo 6 giorni');
  a.ora(a.ora() + 2 * 86400000); prontezza(a, [30, 35, 40, 35, 38, 30]);
  assert.notStrictEqual(html(a), '', 'dopo 8 giorni torna');
  const b = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(b.a, [30, 35, 40, 35, 38, 30]); b.a.g('nascondiStanchezza()');
  b.a.g('lastUndo && lastUndo()');
  assert.notStrictEqual(html(b.a), '', 'annullato');
  const senza = H.telefono({ sett: 4, giorno: 2, consenso: false, d: { level: 'intermedio' } });
  prontezza(senza.a, [30, 35, 40, 35, 38, 30]);
  assert.strictEqual(html(senza.a), '', 'senza consenso il coach non legge i dati');
  const v1 = H.telefono({ v1: true, sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(v1.a, [30, 35, 40, 35, 38, 30]);
  assert.strictEqual(html(v1.a), '', 'programma v1: niente di nuovo');
  const off = H.telefono({ sett: 4, giorno: 2, d: { level: 'intermedio' } });
  prontezza(off.a, [30, 35, 40, 35, 38, 30]); off.a.spegni(['CST-09']);
  assert.strictEqual(html(off.a), '', 'regola spenta');
});
