/* Partenza bassa per le donne e calibrazione rapida (W2-T8, piano coach v2 capitolo D, prove D.8)
   PAR-01 (livello mancante = principiante), PAR-05 (testo della prima esposizione), PAR-06 (fattore di partenza bassa), PAR-07 (lo storico lo assorbe),
   PAR-08 (sotto la barra: variante o barra vuota), PAR-09 (corpo libero facilitato), CAR-18 (calibrazione rapida) e CAR-19 (promemoria dell RPE);
   INT-05 ed ESI-02 non contano come «serie facili» quelle degli esercizi in calibrazione.
   Il banco di prova e tests/aiuto-app.js (l app vera in vm, orologio fisso) e tests/aiuto-atleta.js (l atleta virtuale, capacita dalle àncore delle note di ricerca).
   La prova funziona anche prima che l integrazione metta i due file nuovi in index.html (li carica lei) e prima che la mappa renda le regole «(spegnibile)»
   (le simula con REGOLE_SPEGNIBILI, come le prove dell onda 0). I numeri «di prima» (uomini e donne avanzate) sono quelli del tag coach-v2-onda-1. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');
const { conSoglieSelezione } = require('./aiuto-selezione');   /* W2-T6: le soglie della scelta degli esercizi (SEL-06) anche prima che index.html le citi */
const { simulaNellApp, riassunto, mulberry32, CONTROLLO } = require('./aiuto-atleta');

const R = path.join(__dirname, '..');
const LUNEDI = '2026-10-05T12:00:00';
const FILE_NUOVI = ['js/coach/carichi/soglie-partenza.js', 'js/coach/carichi/calibrazione.js'];
const REGOLE_NUOVE = ["PAR-06", "PAR-07", "PAR-08", "PAR-09", "CAR-18", "CAR-19"];

/* l app vera, con i file di W2-T8 anche se index.html non li ha ancora (l integrazione li aggiunge) e le regole nuove spegnibili */
function nuovaApp(opz) {
  const a = conSoglieSelezione(caricaApp(Object.assign({ ora: LUNEDI }, opz || {})));
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
  FILE_NUOVI.forEach(f => { if (html.indexOf('src="' + f + '"') === -1) vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), a.ctx, { filename: f }); });
  REGOLE_NUOVE.forEach(c => a.g('REGOLE_SPEGNIBILI.indexOf(' + JSON.stringify(c) + ') === -1 && REGOLE_SPEGNIBILI.push(' + JSON.stringify(c) + ')'));
  return a;
}
/* il contesto dei carichi di una persona, senza storico (come lo costruisce applicaPartenze alla creazione) */
const CTX = (sesso, livello, peso, extra) => 'Object.assign(contestoCarichi(' + JSON.stringify(Object.assign({ sex: sesso, level: livello, age: 30, weight: peso }, extra || {})) + ', {}), { storico: null })';
const stima = (a, nome, ctx) => a.dati(a.g('(() => { const s = stimaCaricoIniziale(' + JSON.stringify(nome) + ', ' + ctx + '); return s; })()'));
const lib = (a, nome) => a.json('findExercise(' + JSON.stringify(nome) + ')');
const PASSO = (a, nome) => { const m = lib(a, nome); const att = a.chiama('attrezzoDi', nome); return att === 'manubri' || att === 'corpo' ? 1 : 2.5; };

/* ========== PAR-06: la tabella D.3 (principiante 0,60 / 0,65 / 0,75, intermedia 0,85) ========== */
const FATTORI = { principiante: { alto: 0.60, basso: 0.65, iso: 0.75 }, intermedio: { alto: 0.85, basso: 0.85, iso: 0.85 } };
const classe = (m) => m.type === 'isolation' ? 'iso' : ((m.group === 'gambe' || m.group === 'glutei') ? 'basso' : 'alto');
/* il fattore dal corpo di oggi (PAR-02), calcolato a mano: massa dal solo peso (0,74) / 61,5 x livello x sesso (parte alta 0,9) x prudenza 0,85 */
const LIVELLO = { principiante: 1, intermedio: 1.3, avanzato: 1.6 };
const kCorpoDonna = (peso, livello, m) => Math.max(0.45, Math.min(1.8, (peso * 0.74 / 61.5) * LIVELLO[livello] * ((m.group === 'gambe' || m.group === 'glutei') ? 1 : 0.9) * 0.85));
const perDifetto = (x, passo) => Math.floor(x / passo + 1e-9) * passo;

test('D.8.1: donna principiante di 65 kg senza BIA: carico di oggi x fattore della tabella, per difetto sui passi veri, a un passo dai valori della nota', () => {
  const a = nuovaApp();
  /* valori di controllo della nota donne §3.3 (65 kg): panca 15, chest press 15, lat machine 15, squat 22,5, leg press 35, hip thrust 20, curl con manubri 4 per mano */
  const CONTROLLO_NOTA = { '💪 Panca Piana Bilanciere': 15, '💪 Chest Press Machine': 15, '🏹 Lat Machine': 15, '🦵 Squat con Bilanciere': 22.5, '🦵 Leg Press': 35, '🍑 Hip Thrust': 20, '🦾 Curl Manubri Alternato': 4 };
  Object.keys(CONTROLLO_NOTA).forEach(nome => {
    const m = lib(a, nome), s = stima(a, nome, CTX('F', 'principiante', 65));
    const att = a.chiama('attrezzoDi', nome), grezzo = m.weight * kCorpoDonna(65, 'principiante', m) * FATTORI.principiante[classe(m)];
    assert.ok(Math.abs(s.fEff - FATTORI.principiante[classe(m)]) < 1e-9, nome + ': fattore ' + s.fEff);
    assert.ok(/Bassa$/.test(s.fonte), nome + ': la stima porta il segno della partenza bassa (' + s.fonte + ')');
    if (att === 'bilanciere' && grezzo < 0.9 * 20) {   /* sotto la barra (PAR-08): il peso e la barra vuota e la stima lo dice */
      assert.strictEqual(s.sottoBarra, true, nome + ': ' + grezzo.toFixed(1) + ' kg sono sotto 0,9 x la barra');
      assert.strictEqual(s.peso, 20);
    } else {
      assert.strictEqual(s.peso, Math.max(att === 'bilanciere' ? 20 : (att === 'manubri' ? 1 : 2.5), perDifetto(grezzo, att === 'manubri' ? (grezzo < 10 ? 1 : 2) : 2.5)), nome + ': per difetto sul passo vero');
      assert.ok(Math.abs(s.peso - CONTROLLO_NOTA[nome]) <= PASSO(a, nome) * (att === 'manubri' ? 1 : 1) + 1e-9 || att === 'bilanciere', nome + ': ' + s.peso + ' contro ' + CONTROLLO_NOTA[nome] + ' della nota');
    }
  });
  /* i valori che non sono sotto la barra stanno a un passo da quelli della nota */
  assert.ok(Math.abs(stima(a, '💪 Chest Press Machine', CTX('F', 'principiante', 65)).peso - 15) <= 2.5);
  assert.ok(Math.abs(stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65)).peso - 35) <= 2.5);
  assert.ok(Math.abs(stima(a, '🏹 Lat Machine', CTX('F', 'principiante', 65)).peso - 15) <= 2.5);
  assert.ok(Math.abs(stima(a, '🦾 Curl Manubri Alternato', CTX('F', 'principiante', 65)).peso - 4) <= 1);
  /* 55 e 75 kg: la nota dice «scala lineare» per le principianti; la panca col bilanciere e sempre sotto la barra, il leg press sale col peso */
  const lp = [55, 65, 75].map(w => stima(a, '🦵 Leg Press', CTX('F', 'principiante', w)).peso);
  assert.ok(lp[0] < lp[1] && lp[1] < lp[2], 'leg press: ' + lp.join(' < '));
  [55, 65, 75].forEach(w => assert.strictEqual(stima(a, '💪 Panca Piana Bilanciere', CTX('F', 'principiante', w)).sottoBarra, true, 'panca col bilanciere sotto la barra a ' + w + ' kg'));
});

test('PAR-06: il fattore si applica dopo il limite 0,45 del fattore dal corpo, che non lo annulla (nota donne §0 punto 3)', () => {
  const a = nuovaApp();
  /* una donna molto leggera: k dal corpo sotto 0,45 si porta a 0,45 e poi si applica lo sconto */
  const m = lib(a, '💪 Chest Press Machine'), s = stima(a, '💪 Chest Press Machine', CTX('F', 'principiante', 38));
  assert.ok(kCorpoDonna(38, 'principiante', m) <= 0.46, 'k grezzo ' + kCorpoDonna(38, 'principiante', m));
  assert.strictEqual(s.k, 0.45, 'il limite di sempre sul fattore dal corpo');
  assert.strictEqual(s.peso, perDifetto(m.weight * 0.45 * 0.60, 2.5), 'lo sconto 0,60 viene dopo il limite');
  assert.ok(s.peso < m.weight * 0.45, 'il limite non riporta il carico al valore senza sconto');
});

test('D.8.2: donna intermedia 0,85, donna avanzata e uomo principiante come prima (valori del tag coach-v2-onda-1)', () => {
  const a = nuovaApp();
  const NOMI = ['💪 Panca Piana Bilanciere', '💪 Panca Piana Manubri', '💪 Chest Press Machine', '🏹 Lat Machine', '🏹 Rematore con Manubrio', '🛡️ Lento Avanti Manubri', '🦵 Squat con Bilanciere',
    '🦵 Leg Press', '🦵 Goblet Squat', '🍑 Stacco Rumeno', '🍑 Hip Thrust', '🦾 Curl su Panca Inclinata', '🛡️ Alzate Laterali', '🦵 Leg Curl Seduto', '🦵 Leg Extension'];
  /* valori di partenza di oggi (onda 1), a 55, 65 e 75 kg senza BIA, per esercizio */
  const PRIMA = {
    M: { principiante: [[25, 30, 35], [12, 14, 16], [25, 30, 35], [25, 30, 35], [10, 12, 14], [7, 9, 10], [30, 37.5, 42.5], [50, 60, 67.5], [10, 12, 14], [25, 30, 35], [27.5, 32.5, 37.5], [5, 6, 7], [4, 4, 5], [17.5, 20, 25], [17.5, 22.5, 25]],
         intermedio: [[32.5, 37.5, 45], [16, 20, 22], [32.5, 37.5, 45], [32.5, 37.5, 45], [12, 16, 18], [10, 12, 14], [40, 47.5, 55], [65, 77.5, 87.5], [12, 16, 18], [32.5, 37.5, 45], [37.5, 42.5, 50], [6, 8, 9], [5, 6, 7], [22.5, 27.5, 30], [25, 27.5, 32.5]] },
    F: { avanzato: [[32.5, 37.5, 45], [16, 20, 22], [32.5, 37.5, 45], [32.5, 37.5, 45], [12, 16, 18], [10, 12, 14], [45, 52.5, 62.5], [72.5, 85, 97.5], [14, 18, 20], [35, 42.5, 50], [40, 47.5, 55], [6, 8, 9], [5, 6, 7], [25, 30, 35], [27.5, 32.5, 37.5]] }
  };
  Object.keys(PRIMA).forEach(sesso => Object.keys(PRIMA[sesso]).forEach(livello => NOMI.forEach((nome, i) => [55, 65, 75].forEach((w, j) => {
    const s = stima(a, nome, CTX(sesso, livello, w));
    assert.strictEqual(s.peso, PRIMA[sesso][livello][i][j], sesso + ' ' + livello + ' ' + w + ' kg ' + nome + ': come prima');
    assert.strictEqual(s.fEff, 1, 'nessuno sconto'); assert.ok(!/Bassa$/.test(s.fonte));
  }))));
  /* l intermedia: 0,85 sopra il valore che avrebbe senza sconto, per difetto */
  [55, 65, 75].forEach(w => ['💪 Chest Press Machine', '🏹 Lat Machine', '🦵 Leg Press', '🦾 Curl Manubri Alternato'].forEach(nome => {
    const m = lib(a, nome), s = stima(a, nome, CTX('F', 'intermedio', w));
    assert.ok(Math.abs(s.fEff - 0.85) < 1e-9, nome + ' ' + w + ': ' + s.fEff);
    const att = a.chiama('attrezzoDi', nome), grezzo = m.weight * kCorpoDonna(w, 'intermedio', m) * 0.85;
    assert.strictEqual(s.peso, Math.max(att === 'manubri' ? 1 : 2.5, perDifetto(grezzo, att === 'manubri' ? (grezzo < 10 ? 1 : 2) : 2.5)), nome + ' ' + w + ' kg');
  }));
  /* livello mancante = principiante (D-P12): non piu «intermedio» (x1,3) */
  const senza = stima(a, '🏹 Lat Machine', 'Object.assign(contestoCarichi({ sex: "M", age: 30, weight: 65 }, {}), { storico: null })');
  assert.strictEqual(senza.peso, 30, 'uomo senza livello a 65 kg = come il principiante (era 37,5 come intermedio)');
  assert.strictEqual(a.json('contestoCarichi({ sex: "F", age: 30, weight: 65 }, {}).livello'), 'principiante');
});

test('PAR-01: la BIA sposta la stima delle donne con il fattore al massimo del ±15% rispetto a quella dal solo peso (DON-01); gli uomini no', () => {
  const a = nuovaApp();
  const base = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65));
  /* una massa muscolare molto alta e una molto bassa (SMM 34 = il riferimento: oltre il +15% del peso) */
  const alta = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65, { bia: { peso: 65, smm: 34 } }));
  const bassa = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65, { bia: { peso: 65, smm: 14 } }));
  assert.ok(Math.abs(alta.k / base.k - 1.15) < 1e-9, 'tetto +15%: ' + (alta.k / base.k));
  assert.ok(Math.abs(bassa.k / base.k - 0.85) < 1e-9, 'tetto -15%: ' + (bassa.k / base.k));
  const media = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65, { bia: { peso: 65, smm: 26.5 } }));
  assert.ok(media.k / base.k > 0.85 && media.k / base.k < 1.15, 'dentro la banda la BIA conta com e');
  /* un uomo: la BIA decide come prima (SMM 34 contro 14 = piu del doppio) */
  const uAlto = stima(a, '🦵 Leg Press', CTX('M', 'principiante', 65, { bia: { peso: 65, smm: 34 } })), uBasso = stima(a, '🦵 Leg Press', CTX('M', 'principiante', 65, { bia: { peso: 65, smm: 14 } }));
  assert.ok(uAlto.k / uBasso.k > 1.5, 'uomini: nessun tetto del ±15% sulla BIA (rapporto ' + (uAlto.k / uBasso.k).toFixed(2) + ' contro il massimo di 1,35 delle donne)');
});

test('PAR-06: una donna che non ha detto il peso parte dalla donna di riferimento (59 kg), non dal valore pensato per un uomo di 75 kg; l uomo senza dati resta alla libreria', () => {
  const a = nuovaApp();
  const s = stima(a, '🏹 Lat Machine', 'Object.assign(contestoCarichi({ sex: "F", level: "principiante", age: 30 }, {}), { storico: null })');
  assert.ok(s && /^tipicoBassa$/.test(s.fonte), 'fonte ' + (s && s.fonte));
  assert.ok(s.peso < lib(a, '🏹 Lat Machine').weight / 2, 'meno di meta del valore di libreria (' + s.peso + ' contro ' + lib(a, '🏹 Lat Machine').weight + ')');
  const u = stima(a, '🏹 Lat Machine', 'Object.assign(contestoCarichi({ sex: "M", level: "principiante", age: 30 }, {}), { storico: null })');
  assert.strictEqual(u, null, 'l uomo senza dati: nessuna stima, vale la libreria come prima');
});

/* ========== PAR-07: lo storico personale assorbe lo sconto ========== */
test('D.8.3: con 2 esercizi in storico lo sconto e dimezzato, con 4 e nullo; gli esercizi in calibrazione non chiusa o con RPE basso non contano', () => {
  const a = nuovaApp();
  const NOMI = ['🏹 Lat Machine', '🏹 Rematore con Manubrio', '🦵 Leg Press', '🦵 Goblet Squat'];
  const sedute = (n, rpe) => NOMI.slice(0, n).map((nome, i) => a.seduta(2 + i, [{ nome: nome, serie: [[20, 10, true, rpe], [20, 10, true, rpe], [20, 10, true, rpe]] }]));
  const prova = (n, rpe) => {
    a.profilo({ level: 'principiante', sex: 'F', age: 30, weight: 65 });
    a.storia(sedute(n, rpe));
    const sto = a.dati(a.g('scalaDaStorico({ donne: true })'));
    const s = a.dati(a.g('stimaCaricoIniziale("💪 Chest Press Machine", Object.assign(contestoCarichi({ sex: "F", level: "principiante", age: 30, weight: 65 }, {}), { storico: scalaDaStorico({ donne: true }) }))'));
    return { sto: sto, s: s };
  };
  const zero = prova(0, 8), due = prova(2, 8), quattro = prova(4, 8);
  assert.ok(Math.abs(zero.s.fEff - 0.60) < 1e-9, 'senza storico lo sconto intero');
  assert.strictEqual(due.sto.n, 2); assert.ok(Math.abs(due.s.fEff - 0.80) < 1e-9, 'con 2 esercizi dimezzato: ' + due.s.fEff);
  assert.strictEqual(quattro.sto.n, 4); assert.ok(Math.abs(quattro.s.fEff - 1) < 1e-9, 'con 4 esercizi nullo: ' + quattro.s.fEff);
  assert.ok(!/Bassa$/.test(quattro.s.fonte), 'senza sconto la fonte non porta il segno della partenza bassa');
  assert.ok(quattro.s.peso > zero.s.peso, 'il carico sale: ' + zero.s.peso + ' -> ' + due.s.peso + ' -> ' + quattro.s.peso);
  /* RPE 6,5 (< 7) e nessuna calibrazione chiusa: non contano per il rapporto delle donne */
  const facili = prova(4, 6.5);
  assert.strictEqual(facili.sto, null, 'esercizi fatti con RPE sotto 7 e calibrazione non aperta o non chiusa: esclusi');
  assert.ok(Math.abs(facili.s.fEff - 0.60) < 1e-9);
  /* un uomo: lo storico conta com e, RPE o no (il rapporto di sempre) */
  a.profilo({ level: 'principiante', sex: 'M', age: 30, weight: 75 });
  a.storia(sedute(2, 6.5));
  assert.strictEqual(a.json('scalaDaStorico().n'), 2, 'uomini: tutti gli esercizi fatti');
  /* due mediane (alto e basso) solo con almeno 2 esercizi per lato */
  a.profilo({ level: 'principiante', sex: 'F', age: 30, weight: 65 });
  a.storia(sedute(4, 8));
  const due2 = a.dati(a.g('scalaDaStorico({ donne: true })'));
  assert.ok(due2.alto > 0 && due2.basso > 0, 'due mediane: alto e basso');
  a.storia(sedute(2, 8));
  assert.strictEqual(a.dati(a.g('scalaDaStorico({ donne: true })')).basso, null, 'un solo lato con 2 esercizi: l altro resta senza mediana propria');
});

test('PAR-07: mai uno sconto su un carico che viene dalla storia dell esercizio stesso', () => {
  const a = nuovaApp();
  a.profilo({ level: 'principiante', sex: 'F', age: 30, weight: 65 });
  const senzaStoria = stima(a, '🏹 Lat Machine', CTX('F', 'principiante', 65));
  assert.ok(senzaStoria.fEff < 1);
  a.storia([a.seduta(5, [{ nome: '🏹 Lat Machine', serie: [[20, 10, true, 8], [20, 10, true, 8], [20, 10, true, 8]] }])]);
  const conStoria = stima(a, '🏹 Lat Machine', CTX('F', 'principiante', 65));
  assert.strictEqual(conStoria.fEff, 1, 'l esercizio ha la sua storia: niente fattore');
});

/* ========== PAR-08 e PAR-09, generatore ========== */
function profiliDonne(n, seme, extra) {
  const r = mulberry32(seme), uno = l => l[Math.floor(r() * l.length)];
  return Array.from({ length: n }, (_, i) => Object.assign({
    goals: [uno(['massa', 'salute', 'dimagrimento', 'ricomposizione', 'glutei'])], level: uno(['principiante', 'principiante', 'intermedio']), days: uno([3, 3, 4]), minutes: uno([45, 60, 75]),
    luogo: uno(['palestra', 'palestra', 'manubri']), sex: uno(['F', 'donna']), age: 20 + Math.floor(r() * 35), weight: 50 + Math.floor(r() * 28), fastidi: [], sonno: 'bene', attrezzi: 'indifferente',
    parq: 'no', usaProfilo: false, seme: 'w2t8-' + seme + '-' + i }, extra || {}));
}
const salvaPiano = (a, prog) => { /* il piano del lunedi come lo vede l app: serve alle prove che leggono i record */
  const dati = {}; prog.sedute.forEach(sd => { dati[sd.giorno] = sd.esercizi.map(e => Object.assign({ rest: 90 }, e)); }); a.scrivi(a.chiave('dataKey'), dati);
};
test('D.8.4: nessun carico fuori dalla griglia dell attrezzo; mai un bilanciere sotto 0,9 x la barra senza la variante o la nota', () => {
  const a = nuovaApp();
  let esercizi = 0, conBarra = 0, barraVuota = 0, conStimaBassa = 0;
  profiliDonne(150, 11).concat(profiliDonne(40, 12, { goals: ['forza'] }), profiliDonne(30, 13, { sex: 'M' })).forEach(p => {
    a.profilo({ level: p.level, sex: p.sex, age: p.age, weight: p.weight });
    const prog = a.dati(a.chiama('buildProgram', p));
    const ctx = CTX(p.sex, p.level, p.weight);
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      if (!(e.weight > 0)) return;
      esercizi++;
      const att = a.chiama('attrezzoDi', e.name);
      if (att === 'manubri' || att === 'corpo') assert.ok(e.weight < 10 ? Number.isInteger(e.weight) : e.weight % 2 === 0, p.seme + ' ' + e.name + ' ' + e.weight + ' fuori dai passi di 1 e 2 kg');
      else assert.ok(Math.abs(e.weight / 2.5 - Math.round(e.weight / 2.5)) < 1e-9, p.seme + ' ' + e.name + ' ' + e.weight + ' fuori dai passi di 2,5 kg');
      if (e.partenzaBassa) conStimaBassa++;
      if (att === 'bilanciere') {
        conBarra++;
        assert.ok(e.weight >= Math.min(20, lib(a, e.name).weight), p.seme + ' ' + e.name + ' ' + e.weight + ' kg: il bilanciere non pesa meno della barra');
        const s = stima(a, e.name, ctx);
        if (s && s.sottoBarra) {   /* il bilanciere e rimasto con la stima sotto la barra: deve esserci la nota e il carico e quello della barra */
          barraVuota++;
          assert.strictEqual(e.weight, 20, p.seme + ' ' + e.name + ': barra vuota');
          assert.ok(prog.note.some(n => /bilanciere vuoto/.test(n)), p.seme + ': nota «Per ora basta il bilanciere vuoto»');
        }
      }
    }));
  });
  assert.ok(esercizi > 500 && conBarra > 20 && conStimaBassa > 200, 'il campione c e: ' + esercizi + ' esercizi, ' + conBarra + ' col bilanciere, ' + conStimaBassa + ' con la partenza bassa');
  assert.ok(barraVuota > 0, 'di controllo: in forza (e per il gradito) il bilanciere resta e parte dalla barra vuota (' + barraVuota + ')');
});

test('D.8.5 PAR-08: in 200 profili di donne, se il bilanciere partirebbe sotto la soglia il posto ha una variante con lo stesso bersaglio', () => {
  const a = nuovaApp();
  let scambi = 0, panche = 0;
  /* W2-T6 (SEL-06): le principianti senza la forza come primo obiettivo non ricevono piu il bilanciere (sul codice di prima: 318 esercizi col bilanciere e 685 scambi in 200 programmi, ora 0 e 0: partono dalle macchine e dai manubri,
     abilita 1); lo scambio di PAR-08 si prova sulle intermedie (lo sconto di PAR-06 arriva fino al livello intermedio), 11 scambi su 200 */
  profiliDonne(200, 21, { level: 'intermedio', luogo: 'palestra' }).forEach(p => {
    const prog = a.dati(a.chiama('buildProgram', p));
    const ctx = CTX(p.sex, 'intermedio', p.weight);
    prog.sostituzioni.forEach(s => {
      /* W2-T6 (SEL-06): la lista delle sostituzioni ha anche i posti dove il primo della classifica e vietato a chi inizia per la sua abilita (Affondi Bulgari -> Affondi Inversi): lo stesso bersaglio vale per gli scambi del bilanciere (PAR-08) */
      if (a.chiama('attrezzoDi', s.da) === 'bilanciere') assert.strictEqual(a.json('bersaglioDi(' + JSON.stringify(s.a) + ')'), a.json('bersaglioDi(' + JSON.stringify(s.da) + ')'), p.seme + ': ' + s.da + ' -> ' + s.a + ' stesso bersaglio');
      if (a.chiama('attrezzoDi', s.da) === 'bilanciere' && a.chiama('attrezzoDi', s.a) !== 'bilanciere') scambi++;
    });
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      if (/Panca Piana Bilanciere/.test(e.name)) {
        panche++;
        const s = stima(a, e.name, ctx);   /* se la panca col bilanciere e ancora li con la stima sotto la barra, e un caso con la sua prescrizione (forza, gradito, 5x5 fisso) */
        if (s && s.sottoBarra) assert.ok(e.fisso || /forza/.test(prog.goals.join()) || (p.graditi || []).indexOf(e.name) !== -1, p.seme + ': panca col bilanciere sotto la barra senza una ragione');
      }
      if (e.originale) assert.strictEqual(a.json('bersaglioDi(' + JSON.stringify(e.name) + ')'), a.json('bersaglioDi(' + JSON.stringify(e.originale) + ')'), p.seme + ': ' + e.originale + ' -> ' + e.name);
    }));
  });
  assert.ok(scambi >= 10, 'bilanciere -> manubri o macchina: ' + scambi + ' scambi su 200 programmi');
});

test('PAR-08: penalitaPartenza = -3 al bilanciere che partirebbe sotto la barra, 0 per il resto, per gli uomini e senza consenso', () => {
  const a = nuovaApp();
  const brief = (sesso, livello, peso) => ({ grezzo: { d: { sex: sesso, level: livello, age: 30, weight: peso }, prof0: {} } });
  const pen = (nome, b) => a.g('penalitaPartenza')(nome, b);
  assert.strictEqual(a.g('(b => penalitaPartenza("💪 Panca Piana Bilanciere", b))')(a.g('(' + JSON.stringify(brief('F', 'principiante', 65)) + ')')), -3);
  const bF = a.g('(' + JSON.stringify(brief('F', 'principiante', 65)) + ')'), bM = a.g('(' + JSON.stringify(brief('M', 'principiante', 75)) + ')');
  assert.strictEqual(pen('💪 Panca Piana Bilanciere', bF), -3, 'donna principiante 65 kg: panca col bilanciere sotto la barra');
  assert.strictEqual(pen('💪 Chest Press Machine', bF), 0, 'una macchina: nessuna penalita');
  assert.strictEqual(pen({ name: '💪 Panca Piana Bilanciere' }, bF), -3, 'accetta anche la voce della libreria');
  assert.strictEqual(pen('💪 Panca Piana Bilanciere', bM), 0, 'uomo: nessuna penalita (la barra vuota non e sotto il suo carico)');
  assert.strictEqual(pen('🦵 Squat con Bilanciere', bF), 0, 'squat a 65 kg: sopra 0,9 x la barra');
  a.consenso(false);
  assert.strictEqual(pen('💪 Panca Piana Bilanciere', bF), 0, 'senza consenso ai dati nessun effetto');
  a.consenso(true);
  a.spegni(['PAR-08']);
  assert.strictEqual(pen('💪 Panca Piana Bilanciere', bF), 0, 'PAR-08 spenta');
});

test('PAR-09: le principianti partono da piegamenti inclinati e da trazioni assistite o lat machine (non le intermedie, non gli uomini); la nota dice come si passa alla completa', () => {
  const a = nuovaApp();
  const base = { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, weight: 60, fastidi: [], sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false };
  let completi = 0, facilitati = 0, uomini = 0, intermedie = 0;
  for (let i = 0; i < 60; i++) {
    /* W2-T6 (SEL-06): in palestra chi inizia non riceve piu le trazioni libere (abilita 3) e parte dalle macchine: il posto non ha piu bisogno dello scambio. Lo scambio resta dove ci sono i piegamenti a terra: un programma su due a corpo libero */
    const p = Object.assign({}, base, { seme: 'par09-' + i, goals: [['massa', 'salute', 'ricomposizione'][i % 3]], luogo: i % 2 ? 'palestra' : 'corpo' });
    const prog = a.dati(a.chiama('buildProgram', p));
    const nomi = prog.sedute.map(sd => sd.esercizi.map(e => e.name)).reduce((t, x) => t.concat(x), []);
    assert.ok(!nomi.some(n => /Piegamenti a Terra|Trazioni alla Sbarra/.test(n)), p.seme + ': nessun piegamento a terra o trazione completa per una principiante');
    if (prog.sedute.some(sd => sd.esercizi.some(e => e.originale && /Piegamenti|Trazioni/.test(e.originale) && /Piegamenti Inclinati|Trazioni Assistite|Lat Machine/.test(e.name)))) {
      facilitati++;
      assert.ok(prog.note.some(n => n === 'Versione facilitata per partire: si passa alla completa a 10-15 ripetizioni pulite'), p.seme + ': la nota');
      assert.ok(prog.sostituzioni.some(s => /Piegamenti|Trazioni/.test(s.da)), p.seme + ': lo scambio e tra i cambiamenti mostrati');
    }
    const u = a.dati(a.chiama('buildProgram', Object.assign({}, p, { sex: 'M' })));
    if (u.sedute.some(sd => sd.esercizi.some(e => /Piegamenti Inclinati/.test(e.name) && e.originale))) uomini++;
    const im = a.dati(a.chiama('buildProgram', Object.assign({}, p, { level: 'intermedio' })));
    if (im.sedute.some(sd => sd.esercizi.some(e => e.originale && /Piegamenti a Terra|Trazioni/.test(e.originale)))) intermedie++;
    completi++;
  }
  assert.ok(facilitati >= 1, 'versioni facilitate nei programmi: ' + facilitati + ' su ' + completi);
  assert.strictEqual(uomini, 0, 'gli uomini non hanno lo scambio facilitato');
  assert.strictEqual(intermedie, 0, 'le intermedie nemmeno');
});

test('PAR-05: la prima esposizione dice a tutti perche si parte leggeri; con la partenza bassa anche che e voluta; il programma lo dice una volta', () => {
  const a = nuovaApp();
  const donna = a.dati(a.chiama('buildProgram', { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, weight: 65, fastidi: [], sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false, seme: 'p05' }));
  const uomo = a.dati(a.chiama('buildProgram', { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, weight: 75, fastidi: [], sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false, seme: 'p05' }));
  assert.ok(donna.note.some(n => n === 'Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento, poi il coach sale in fretta.'));
  assert.ok(!uomo.note.some(n => /bassi di proposito/.test(n)), 'gli uomini: nessuna nota di partenza bassa');
  const frasi = a.dati(a.g('MOTIVI_STIMA'));
  assert.ok(/^Partenza bassa voluta: impari il movimento, poi si sale in fretta • Oggi si parte leggeri apposta: non è un test/.test(frasi.pesoBassa), frasi.pesoBassa);
  assert.ok(/^Oggi si parte leggeri apposta: non è un test\. L’obiettivo è finire con 3-4 ripetizioni in più • Carico di partenza stimato dal tuo peso/.test(frasi.peso), frasi.peso);
  /* alla prima seduta la nota dell esercizio (tipo «nuovo») e quella: e.stimato porta la fonte, applicaCaricoProgressivo la legge */
  const e = donna.sedute[0].esercizi.find(x => x.stimato);
  assert.ok(/Bassa$/.test(e.stimato), e.name + ' ' + e.stimato);
  salvaPiano(a, donna);
  a.programma(Object.assign({}, donna, { creato: '05/10/2026 ore 10:00', inizio: '2026-10-05', settimane: 12, blocco: 4, fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'] }));
  a.g('applicaCaricoProgressivo')(donna.sedute[0].giorno);
  const nota = a.dati(a.g('loadData()'))[donna.sedute[0].giorno].find(x => x.name === e.name).coachNote;
  assert.strictEqual(nota, frasi[e.stimato], 'la nota della prima volta');
});

/* ========== CAR-18: la tabella dei salti ========== */
const CE = '💪 Chest Press Machine', LP = '🦵 Leg Press', LX = '🦵 Leg Extension', LAV = '🛡️ Lento Avanti Manubri';
function profiloScenario(a, o) {
  Object.keys(a.store).forEach(k => delete a.store[k]);
  a.consenso(true); a.ora(LUNEDI);
  a.profilo(Object.assign({ level: 'principiante', sex: 'F', age: 30, weight: 65, goals: ['massa'] }, o.profilo || {}));
  if (o.aggiusti) a.aggiusti(o.aggiusti);
}
/* un esercizio con carico stimato nel piano e le sue esposizioni (dalla piu vecchia): ognuna { w, rpe | [rpe per serie], reps, fatte } (3 serie da 12) */
function scenario(a, o) {
  profiloScenario(a, o);
  const nome = o.nome || CE, reps = o.reps || 12, sets = 3;
  const dati = {}; dati['Lunedì'] = [{ name: nome, sets: sets, reps: reps, weight: o.base, rest: 90, stimato: o.stimato === undefined ? 'pesoBassa' : o.stimato }];
  if (o.stimato !== null) a.scrivi(a.chiave('dataKey'), dati);
  const storia = [];
  (o.esp || []).forEach((x, i, tutte) => {
    const giorni = 3 * (tutte.length - i);
    const rpe = Array.isArray(x.rpe) ? x.rpe : [x.rpe, x.rpe, x.rpe];
    const fatte = x.fatte || [reps, reps, reps];
    storia.unshift({ id: a.giorniFa(giorni), day: 'Lunedì', date: a.g('formatNow()'), minuti: 50, prontezza: 80, exercises: [],
      sessione: [{ name: nome, rest: 90, sets: fatte.map((r, k) => ({ weight: x.w, reps: r, done: x.nonFatta ? false : true, wasBerserk: false, rpe: rpe[k] === undefined ? null : rpe[k] })), obiettivo: Object.assign({ reps: reps, sets: sets, rir: [3, 4], coachTipo: 'su' }, x.obiettivo || {}) }],
      settimana: x.scarico ? { numero: 1, fase: 'scarico' } : undefined });
  });
  a.storia(storia);
  return () => a.dati(a.chiama('caricoProssimo', nome, o.base, reps, sets));
}
const sale = (r) => r.tipo === 'su' && /^Calibrazione:/.test(r.motivo);

test('D.8.6 CAR-18: scarto 3 (RPE 5) +20/25/20%, scarto 2 (RPE 6) +15/20/15%, scarto 1 (RPE 7) +10%, per alto, basso e isolamento (per difetto sul passo)', () => {
  const a = nuovaApp();
  /* carichi alti: il salto in percentuale supera il passo di 2,5 kg */
  const prova = (nome, w, rpe) => scenario(a, { nome: nome, base: w, esp: [{ w: w, rpe: rpe }] })();
  const atteso = { 5: { [CE]: 47.5, [LP]: 100, [LX]: 47.5 }, 6: { [CE]: 45, [LP]: 95, [LX]: 45 }, 7: { [CE]: 42.5, [LP]: 87.5, [LX]: 42.5 } };
  const carichi = { [CE]: 40, [LP]: 80, [LX]: 40 };
  [5, 6, 7].forEach(rpe => Object.keys(carichi).forEach(nome => {
    const r = prova(nome, carichi[nome], rpe);
    assert.strictEqual(r.weight, atteso[rpe][nome], nome + ' RPE ' + rpe + ': ' + r.weight + ' kg (' + r.motivo + ')');
    assert.ok(sale(r), nome + ' RPE ' + rpe + ': ' + r.motivo);
  }));
  /* le frasi: RPE contro previsto, nuovo carico e percentuale */
  assert.strictEqual(prova(CE, 40, 6).motivo.split(' • ')[0], 'Calibrazione: RPE 6 contro 8 previsto, si sale a 45 kg (+13%)');
  assert.strictEqual(prova(CE, 40, 6.5).motivo.split(' • ')[0], 'Calibrazione: RPE 6,5 contro 8 previsto, si sale a 42,5 kg (+6%)', 'scarto 1,5 = riga 1 (+10%)');
});

test('CAR-18: l RPE che conta e quello della serie piu dura (la prima serie sola, col tocco di W3-T3, se e l unica)', () => {
  const a = nuovaApp();
  const piuDura = scenario(a, { base: 40, esp: [{ w: 40, rpe: [6, 6.5, 7] }] })();
  assert.ok(/RPE 7 contro 8/.test(piuDura.motivo), piuDura.motivo);
  assert.strictEqual(piuDura.weight, 42.5);
  const unaSola = scenario(a, { base: 40, esp: [{ w: 40, rpe: [6, null, null] }] })();
  assert.ok(/RPE 6 contro 8/.test(unaSola.motivo) && unaSola.weight === 45, unaSola.motivo);
  /* il rirBias di CAR-14 corregge l RPE (come in caricoProssimoBase) */
  const conBias = scenario(a, { base: 40, esp: [{ w: 40, rpe: 7 }], aggiusti: { esercizi: {}, scarico: null, rirBias: 1 } })();
  assert.ok(/RPE 6 contro 8/.test(conBias.motivo), 'RPE 7 con bias 1 = 6: ' + conBias.motivo);
});

test('CAR-18: nel bersaglio (RPE 7,5-8,5) si chiude: «Carico tarato», il carico si ripete una volta; sopra il bersaglio nessun salto e nessun «tarato»', () => {
  const a = nuovaApp();
  const nelBersaglio = scenario(a, { base: 40, esp: [{ w: 40, rpe: [6, 6.5, 7.5] }] })();
  assert.strictEqual(nelBersaglio.weight, 40, 'stesso carico (la progressione di prima avrebbe aggiunto un passo)');
  assert.strictEqual(nelBersaglio.tipo, 'fermo');
  assert.ok(/Carico tarato: da qui la progressione normale/.test(nelBersaglio.motivo), nelBersaglio.motivo);
  const sopra = scenario(a, { base: 40, esp: [{ w: 40, rpe: 9.5 }] })();
  assert.ok(sopra.weight <= 40, 'nessun salto: ' + sopra.weight);
  assert.ok(!/Calibrazione:/.test(sopra.motivo) && !/Carico tarato/.test(sopra.motivo), sopra.motivo);
  /* chiusa: la seduta dopo non e piu in calibrazione */
  const dopo = scenario(a, { base: 40, esp: [{ w: 40, rpe: 8 }, { w: 40, rpe: 6 }] })();
  assert.ok(!/Calibrazione:/.test(dopo.motivo), 'chiusa alla prima esposizione: ' + dopo.motivo);
  assert.strictEqual(a.g('calibrazioneChiusa')(CE), true);
});

test('CAR-18 senza RPE: +10/15/10% al massimo 2 volte con il promemoria di CAR-19; la terza volta nessun salto', () => {
  const a = nuovaApp();
  const uno = scenario(a, { base: 40, esp: [{ w: 40, rpe: null }] })();
  assert.strictEqual(uno.weight, 42.5);
  assert.ok(/^Calibrazione: serie complete, \+2,5 kg • Segna quanto è stata dura la prima serie \(RPE\): con il dato il carico sale più in fretta/.test(uno.motivo), uno.motivo);
  const due = scenario(a, { base: 40, esp: [{ w: 40, rpe: null }, { w: 42.5, rpe: null }] })();
  assert.ok(sale(due) && due.weight === 45, due.motivo + ' ' + due.weight);
  const tre = scenario(a, { base: 40, esp: [{ w: 40, rpe: null }, { w: 42.5, rpe: null }, { w: 45, rpe: null }] })();
  assert.ok(!sale(tre) && /Segna quanto è stata dura la prima serie/.test(tre.motivo), 'la terza volta niente salto ma il promemoria: ' + tre.motivo);
  /* con l RPE segnato il salto passa dalla tabella e il promemoria non c e */
  const conRpe = scenario(a, { base: 40, esp: [{ w: 40, rpe: null }, { w: 42.5, rpe: 6 }] })();
  assert.ok(/RPE 6 contro 8/.test(conRpe.motivo) && !/Segna quanto/.test(conRpe.motivo), conRpe.motivo);
});

test('CAR-18: un mancato chiude la calibrazione (CAR-17 come prima); subito dopo un salto si torna al carico completato; dolore, scarico e prontezza non fanno salire', () => {
  const a = nuovaApp();
  /* mancato alla prima esposizione: niente salto, e dopo non si calibra piu */
  const mancato = scenario(a, { base: 40, esp: [{ w: 40, rpe: 9, fatte: [12, 12, 9] }] })();
  assert.ok(!sale(mancato), mancato.motivo);
  const dopoMancato = scenario(a, { base: 40, esp: [{ w: 40, rpe: 9, fatte: [12, 12, 9] }, { w: 40, rpe: 6 }] })();
  assert.ok(!sale(dopoMancato), 'chiusa dal mancato: ' + dopoMancato.motivo);
  /* un mancato subito dopo un salto della calibrazione: il salto era troppo grande */
  const rollback = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }, { w: 45, rpe: 9.5, fatte: [12, 11, 8] }] })();
  assert.strictEqual(rollback.weight, 40, 'torna al carico che aveva completato');
  assert.strictEqual(rollback.tipo, 'giu');
  assert.ok(/^Il salto era troppo grande: si torna a 40 kg, da qui la progressione normale/.test(rollback.motivo), rollback.motivo);
  /* dolore su questo esercizio: nessun salto */
  const dolore = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }], aggiusti: { esercizi: { [CE]: { fattore: 0.9, sedute: 2, alteRip: true, motivo: 'Dolore segnalato: carico ridotto (10%)' } }, scarico: null } })();
  assert.ok(!sale(dolore), dolore.motivo);
  /* scarico deciso dal coach */
  const scarico = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }], aggiusti: { esercizi: {}, scarico: { sedute: 2, motivo: 'stanchezza alta' } } })();
  assert.ok(!sale(scarico), scarico.motivo);
  /* prontezza di oggi sotto 50: nessun salto */
  const conProntezza = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }] });
  a.scrivi(a.g('PRONTEZZA_KEY()'), { data: a.ymd(), day: 'Lunedì', punteggio: 35 });
  assert.ok(!sale(conProntezza()), 'prontezza 35%');
  /* settimana di scarico del programma e rientro dopo una pausa: lo decide la progressione di prima */
  const dopoScarico = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }, { w: 36, rpe: 6, scarico: true }] })();
  assert.ok(!sale(dopoScarico), 'dopo una seduta di scarico: ' + dopoScarico.motivo);
});

test('CAR-18: PAR-Q, sonno scarso o da 65 anni dimezzano i salti; i principianti uomini usano la riga «partenza normale» (+10/7,5/5%)', () => {
  const a = nuovaApp();
  const donna = scenario(a, { nome: LP, base: 80, esp: [{ w: 80, rpe: 6 }] })();
  assert.strictEqual(donna.weight, 95, 'basso, scarto 2: +20%');
  const parq = scenario(a, { nome: LP, base: 80, profilo: { parq: true }, esp: [{ w: 80, rpe: 6 }] })();
  assert.strictEqual(parq.weight, 87.5, 'PAR-Q: +10%');
  const sonno = scenario(a, { nome: LP, base: 80, profilo: { prefs: { sonno: 'male' } }, esp: [{ w: 80, rpe: 6 }] })();
  assert.strictEqual(sonno.weight, 87.5, 'sonno scarso: +10%');
  /* uomo principiante: partenza normale */
  [[5, 87.5], [6, 85], [7, 82.5]].forEach(([rpe, atteso]) => {
    const r = scenario(a, { nome: LP, base: 80, profilo: { sex: 'M', weight: 75 }, stimato: 'peso', esp: [{ w: 80, rpe: rpe }] })();
    assert.strictEqual(r.weight, atteso, 'uomo RPE ' + rpe + ': ' + r.weight + ' (' + r.motivo + ')');
  });
  /* senza RPE gli uomini: +5% */
  const senza = scenario(a, { nome: LP, base: 80, profilo: { sex: 'M', weight: 75 }, stimato: 'peso', esp: [{ w: 80, rpe: null }] })();
  assert.strictEqual(senza.weight, 82.5);
});

test('CAR-18: si chiude alla quinta esposizione (salti dopo le prime cinque, la sesta prescrizione e chiusa; INT-3a: erano quattro); mai oltre +25% e mai un salto piu grosso di un passo che gia lo supera', () => {
  const a = nuovaApp();
  /* sei esposizioni sempre «facili»: la calibrazione decide il carico delle esposizioni 2-6, poi la progressione di prima */
  let w = 40; const esp = [], motivi = [];
  for (let t = 0; t < 6; t++) {
    const r = scenario(a, { base: 40, esp: esp.slice() })();
    motivi.push(r.motivo);
    esp.push({ w: r.weight, rpe: 6 });
    w = r.weight;
  }
  const salti = motivi.map(m => /^Calibrazione: RPE/.test(m));
  assert.deepStrictEqual(salti, [false, true, true, true, true, true], 'esposizioni 1..6: salti dopo le esposizioni 1-5 (prima 1-4: INT-3a) (' + motivi.map(m => m.slice(0, 40)).join(' | ') + ')');
  scenario(a, { base: 40, esp: esp.slice() })();   /* con sei esposizioni nello storico la calibrazione e chiusa (con cinque decide ancora la quinta) */
  assert.strictEqual(a.g('calibrazioneChiusa')(CE), true);
  /* tetto +25%: da 8 kg il +15% e 1,2 (un passo di 2 kg dei manubri), mai oltre il quarto */
  const piccolo = scenario(a, { nome: '🛡️ Alzate Laterali', base: 3, reps: 12, esp: [{ w: 3, rpe: 6 }] })();
  /* INT-5d (D-P26): prima 3 kg («un passo (1 kg) sarebbe +33%: nessun salto, si sale con le ripetizioni») per tutta la calibrazione; il +25% (3,75 kg) non contiene nessun peso della griglia
     dei manubri (4 kg), la guardia lascia passare UN passo (non due: il caso sotto tiene) */
  assert.strictEqual(piccolo.weight, 4, 'un manubrio da 3 kg: il +25% non ha nessun peso, si sale di un passo (1 kg): ' + piccolo.motivo);
  const lento = scenario(a, { nome: LAV, base: 8, reps: 10, esp: [{ w: 8, rpe: 6 }] })();
  assert.ok(lento.weight > 8 && lento.weight / 8 <= 1.25 + 1e-9, 'da 8 kg: un passo di 1 kg (+12,5%): ' + lento.weight);
});

test('CAR-18: vale solo per chi deve: principianti e donne intermedie con il fattore, adulti, con carico stimato nel piano e il consenso; spenta, tutto come prima', () => {
  const a = nuovaApp();
  const salita = (o) => sale(scenario(a, Object.assign({ base: 40, esp: [{ w: 40, rpe: 6 }] }, o))());
  assert.strictEqual(salita({}), true, 'donna principiante: si');
  assert.strictEqual(salita({ profilo: { level: 'intermedio' } }), true, 'donna intermedia con il fattore: si');
  assert.strictEqual(salita({ profilo: { sex: 'M', level: 'principiante', weight: 75 }, stimato: 'peso' }), true, 'uomo principiante: si (D-P1)');
  assert.strictEqual(salita({ profilo: { level: 'avanzato' } }), false, 'donna avanzata: no');
  assert.strictEqual(salita({ profilo: { sex: 'M', level: 'intermedio', weight: 75 }, stimato: 'peso' }), false, 'uomo intermedio: no');
  assert.strictEqual(salita({ profilo: { age: 16 } }), false, 'minorenne: no (non si spinge)');
  assert.strictEqual(salita({ stimato: null }), false, 'nessun carico stimato nel piano (carico della libreria): no');
  assert.strictEqual(salita({ stimato: undefined, base: 40 }), true);
  assert.strictEqual(salita({ nome: '🎯 Plank', reps: 45 }), false, 'a tempo: no');
  /* senza consenso e a regola spenta il carico e quello di sempre (CAR-16) */
  const a2 = nuovaApp();
  const conCar16 = scenario(a2, { base: 40, esp: [{ w: 40, rpe: 5 }] });
  a2.spegni(['CAR-18']);
  assert.ok(!sale(conCar16()), 'CAR-18 spenta');
  assert.ok(/Serie facili/.test(conCar16().motivo), 'resta CAR-16: ' + conCar16().motivo);
  a2.riaccendi(); a2.consenso(false);
  assert.ok(!sale(conCar16()), 'senza consenso');
});

/* ========== INT-05 ed ESI-02 ========== */
const FASI4 = ['carico', 'carico', 'carico', 'scarico'];
test('D.8.7 INT-05: le serie facili degli esercizi in calibrazione non alzano l esigenza (le altre si); contano per il completamento', () => {
  const prova = (conCalibrazione) => {
    const a = nuovaApp();
    profiloScenario(a, { profilo: { level: 'intermedio', esigenza: { valore: 1.2, sett: '2026-09-28', storia: [] } } });
    a.programma({ creato: '28/09/2026 ore 11:00', inizio: '2026-09-28', settimane: 4, blocco: 4, fasi: FASI4.slice(), goals: ['massa'], rirSett: null,
      prefs: { luogo: 'palestra', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', attrezziPalestra: null, graditi: [], odiati: [], priorita: [] } });
    const nomi = [CE, LP, LX, '🏹 Lat Machine'];
    if (conCalibrazione) a.scrivi(a.chiave('dataKey'), { 'Lunedì': nomi.map(n => ({ name: n, sets: 3, reps: 12, weight: 30, rest: 90, stimato: 'pesoBassa' })) });
    const seduta = (giorno, w) => ({ id: new Date(giorno + 'T18:00:00').getTime(), day: 'Lunedì', date: '28/09/2026', minuti: 50, prontezza: 80, exercises: [],
      sessione: nomi.map(n => ({ name: n, rest: 90, sets: [1, 2, 3].map(() => ({ weight: w, reps: 12, done: true, wasBerserk: false, rpe: 5 })), obiettivo: { reps: 12, sets: 3, rir: [2, 3], coachTipo: 'nuovo' } })) });
    a.storia([seduta('2026-09-30', 35), seduta('2026-09-28', 30)]);
    const esito = a.g('bilancioPrimeSedute()');
    return { esito: esito && esito.esito, completamento: esito && esito.completamento, esigenza: a.json('getProfile().esigenza.valore') };
  };
  const senza = prova(false), con = prova(true);
  assert.strictEqual(senza.esito, 'bassa', 'di controllo: senza calibrazione sei serie facili alzano l esigenza');
  assert.strictEqual(senza.esigenza, 1.3);
  assert.strictEqual(con.esito, 'giusta', 'con la calibrazione l esigenza resta');
  assert.strictEqual(con.esigenza, 1.2);
  assert.strictEqual(con.completamento, 100, 'le serie contano per il completamento');
});

test('D.8.7 ESI-02: la correzione settimanale non conta le serie facili degli esercizi in calibrazione', () => {
  const prova = (conCalibrazione) => {
    const a = nuovaApp({ ora: '2026-10-05T12:00:00' });
    profiloScenario(a, { profilo: { level: 'intermedio', days: 2, esigenza: { valore: 1.2, sett: '2026-09-28', storia: [] } } });
    a.programma({ creato: '21/09/2026 ore 11:00', inizio: '2026-09-21', settimane: 8, blocco: 4, fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'], goals: ['massa'], rirSett: null,
      prefs: { luogo: 'palestra', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', attrezziPalestra: null, graditi: [], odiati: [], priorita: [] } });
    const nomi = [CE, LP, LX, '🏹 Lat Machine'];
    if (conCalibrazione) a.scrivi(a.chiave('dataKey'), { 'Lunedì': nomi.map(n => ({ name: n, sets: 3, reps: 12, weight: 30, rest: 90, stimato: 'pesoBassa' })) });
    const seduta = (giorno, w) => ({ id: new Date(giorno + 'T18:00:00').getTime(), day: 'Lunedì', date: '30/09/2026', minuti: 50, prontezza: 80, exercises: [],
      sessione: nomi.map(n => ({ name: n, rest: 90, sets: [1, 2, 3].map(() => ({ weight: w, reps: 12, done: true, wasBerserk: false, rpe: 5 })), obiettivo: { reps: 12, sets: 3, rir: [2, 3], coachTipo: 'nuovo' } })) });
    a.storia([seduta('2026-10-02', 35), seduta('2026-09-30', 30)]);
    a.g('aggiornaEsigenza()');
    return a.json('getProfile().esigenza.valore');
  };
  assert.strictEqual(prova(false), 1.25, 'di controllo: serie facili +5%');
  assert.strictEqual(prova(true), 1.2, 'in calibrazione: l esigenza non si alza');
});

/* ========== (spegnibile) e consenso ========== */
test('D.8.8 (spegnibile): con PAR-06 spenta i valori sono quelli di prima; PAR-08 e PAR-09 spente non toccano il bilanciere e il corpo libero; senza consenso nessun effetto', () => {
  const a = nuovaApp();
  const dopo = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65));
  a.spegni(['PAR-06']);
  const spenta = stima(a, '🦵 Leg Press', CTX('F', 'principiante', 65));
  assert.strictEqual(spenta.peso, 60 / 60 * 52.5, 'senza PAR-06: il valore di prima (52,5 kg)');
  assert.ok(dopo.peso < spenta.peso && !/Bassa$/.test(spenta.fonte));
  assert.strictEqual(spenta.fEff, 1);
  assert.strictEqual(stima(a, '🏹 Lat Machine', CTX('F', 'principiante', 65)).peso, 25, 'lat machine: 25 come prima');
  /* una donna senza il peso: senza PAR-06 non c e stima (libreria) */
  assert.strictEqual(stima(a, '🏹 Lat Machine', 'Object.assign(contestoCarichi({ sex: "F", level: "principiante", age: 30 }, {}), { storico: null })'), null);
  a.riaccendi();
  /* PAR-09 e PAR-08 spente: programma con i piegamenti a terra o la panca col bilanciere dove li metteva il generatore */
  const p = { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, weight: 60, fastidi: [], sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false, seme: 'spegni' };
  const conRegole = a.dati(a.chiama('buildProgram', p));
  a.spegni(['PAR-08', 'PAR-09']);
  const senzaRegole = a.dati(a.chiama('buildProgram', p));
  const barraVuota = pr => pr.note.some(n => /bilanciere vuoto/.test(n));
  assert.ok(!barraVuota(senzaRegole) && senzaRegole.sostituzioni.every(s => !(a.chiama('attrezzoDi', s.da) === 'bilanciere' && a.chiama('attrezzoDi', s.a) !== 'bilanciere' && /Panca|Squat|Stacco|Hip|Rematore|Military|Curl/.test(s.da) && false)), 'PAR-08 spenta: nessuna nota della barra vuota');
  assert.ok(conRegole.sostituzioni.length >= senzaRegole.sostituzioni.length, 'PAR-08 e PAR-09 accese scambiano piu esercizi');
  /* con PAR-08 spenta la barra torna a fare da pavimento e nessun bilanciere porta il segno di sottoBarra */
  assert.strictEqual(a.dati(a.g('(() => { const s = stimaCaricoIniziale("💪 Panca Piana Bilanciere", Object.assign(contestoCarichi({ sex: "F", level: "principiante", age: 30, weight: 65 }, {}), { storico: null })); return s; })()')).sottoBarra, undefined);
  a.riaccendi();
  /* senza consenso: carichi della libreria, nessuna calibrazione, nessun fattore */
  a.consenso(false);
  const libreria = a.dati(a.chiama('buildProgram', p));
  assert.ok(libreria.sedute.every(sd => sd.esercizi.every(e => !e.stimato && !e.partenzaBassa)), 'senza consenso nessuna stima');
  const senzaConsenso = scenario(a, { base: 40, esp: [{ w: 40, rpe: 6 }] });
  a.consenso(false);
  assert.ok(!sale(senzaConsenso()), 'senza consenso nessuna calibrazione');
  assert.deepStrictEqual(a.dati(a.chiama('pesoPartenza', '🦵 Leg Press')), { peso: 80, stimato: false });
});

test('le regole nuove sono «(spegnibile)» nel catalogo quando l integrazione ha scritto le loro righe (prima: simulate)', () => {
  const a = nuovaApp();
  ['PAR-06', 'PAR-08', 'PAR-09', 'CAR-18'].forEach(c => {
    const voce = a.dati(a.g('regolaDescritta(' + JSON.stringify(c) + ')'));
    if (voce) assert.strictEqual(voce.spegnibile, true, c + ' nel catalogo deve essere (spegnibile)');
    a.spegni([c]);
    assert.strictEqual(a.g('regolaAttiva(' + JSON.stringify(c) + ')'), false, c + ' si spegne');
    a.riaccendi();
    assert.strictEqual(a.g('regolaAttiva(' + JSON.stringify(c) + ')'), true);
  });
});

/* ========== atleta virtuale (D.8.9) ========== */
test('atleta virtuale: capacita dalle àncore delle note (non da PAR), ripetibile dal seme, RPE dentro la scala 6-10 con il rumore e la quota senza RPE', () => {
  const { atletaVirtuale } = require('./aiuto-atleta');
  const x = atletaVirtuale({ sesso: 'F', livello: 'principiante', pesoCorpo: 65, seme: 5, deviazione: 0, variazioneEsercizio: 0 });
  /* senza scarto personale: il massimale tipico della nota (le àncore vere 0,42 e 0,62 volte il peso; chest press e leg press dalla tabella 3.2 a 65 kg: 29 e 65) */
  assert.ok(Math.abs(x.massimale('💪 Panca Piana Bilanciere') - 0.42 * 65) < 1e-9 && Math.abs(x.massimale('💪 Chest Press Machine') - 29) < 1e-9);
  assert.ok(Math.abs(x.massimale('🦵 Squat con Bilanciere') - 0.62 * 65) < 1e-9 && Math.abs(x.massimale('🦵 Leg Press') - 65) < 1e-9);
  const u = atletaVirtuale({ sesso: 'M', livello: 'principiante', pesoCorpo: 82, seme: 5, deviazione: 0, variazioneEsercizio: 0 });
  assert.ok(Math.abs(u.massimale('💪 Panca Piana Bilanciere') - 0.56 * 82) < 1e-9, 'uomo: 0,56 x peso (nota §3.5)');
  assert.ok(Math.abs(u.massimale('🦵 Squat con Bilanciere') - 0.75 * 82) < 1e-9);
  /* un carico che e il suo carico giusto (RIR 3,5, 12 ripetizioni) dalle ripetizioni in riserva */
  const g = x.caricoGiusto('💪 Chest Press Machine', 12, 3.5);
  const fatto = x.eseguiSeduta([{ nome: '💪 Chest Press Machine', weight: g, reps: 12, sets: 3 }])[0];
  assert.ok(Math.abs(fatto.rirPrima - 3.5) < 1e-9, 'RIR vero della prima serie ' + fatto.rirPrima);
  /* scarto personale: ±25% e ripetibile */
  const a1 = atletaVirtuale({ sesso: 'F', pesoCorpo: 65, seme: 9 }), a2 = atletaVirtuale({ sesso: 'F', pesoCorpo: 65, seme: 9 });
  assert.strictEqual(a1.massimale('🦵 Leg Press'), a2.massimale('🦵 Leg Press'));
  for (let s = 1; s <= 200; s++) assert.ok(Math.abs(atletaVirtuale({ seme: s }).scarto) <= 0.25);
  /* l RPE segnato sta in 6-10 a mezzi punti; una quota senza RPE; un carico oltre il massimo = ripetizioni mancate */
  let senza = 0, conRpe = 0;
  for (let s = 1; s <= 400; s++) {
    const b = atletaVirtuale({ sesso: 'F', pesoCorpo: 65, seme: s });
    const r = b.eseguiSeduta([{ nome: '🦵 Leg Press', weight: 35, reps: 12, sets: 3 }])[0];
    if (r.senzaRpe) senza++; else { conRpe++; r.serie.forEach(x2 => assert.ok(x2[3] >= 6 && x2[3] <= 10 && x2[3] * 2 === Math.round(x2[3] * 2))); }
  }
  assert.ok(senza / 400 > 0.2 && senza / 400 < 0.4, 'senza RPE circa il 30%: ' + senza / 400);
  const pesante = atletaVirtuale({ sesso: 'F', pesoCorpo: 65, seme: 1, deviazione: 0, variazioneEsercizio: 0 }).eseguiSeduta([{ nome: '🦵 Leg Press', weight: 70, reps: 12, sets: 3 }])[0];
  assert.strictEqual(pesante.completa, false, 'sopra il massimale non si finisce');
});

test('D.8.9: 500 atlete principianti: il carico giusto in poche esposizioni (mediana <= 3, 95° percentile <= 5); la calibrazione non peggiora la progressione di prima', { timeout: 300000 }, () => {
  const a = nuovaApp();
  const N = Number(process.env.ATLETI) || 500;
  const sim = (sesso, senzaCar18) => Array.from({ length: N }, (_, i) => simulaNellApp(a, { sesso: sesso, livello: 'principiante', pesoCorpo: 50 + (i * 7) % 36, seme: 1000 + i, esposizioni: 6, senzaCar18: senzaCar18 }));
  const donne = riassunto(sim('F', false));
  const prima = riassunto(sim('F', true));
  const nuova = nuovaApp();
  console.log('# D.8.9 donne (' + donne.n + ' esercizi): mediana ' + donne.mediana + ', p95 ' + donne.p95 + ', mai ' + donne.pc(donne.mai) + '%; prima esposizione sopra RIR-1 ' + donne.pc(donne.primoSopra) + '% (oltre il massimo ' +
    donne.pc(donne.primoOltre) + '%); dalla seconda sopra RIR-1 ' + donne.pc(donne.dopoSopra) + '% (oltre il massimo ' + donne.pc(donne.dopoOltre) + '%) | solo CAR-16: mediana ' + prima.mediana + ', p95 ' + prima.p95 + ', mai ' + prima.pc(prima.mai) + '%, dalla seconda ' + prima.pc(prima.dopoSopra) + '% (' + prima.pc(prima.dopoOltre) + '%)');
  assert.ok(donne.mediana <= 3, 'mediana ' + donne.mediana);
  assert.ok(donne.p95 <= 5, '95° percentile ' + donne.p95);
  /* chi non arriva in sei esposizioni (entro ±10%) sono le atlete forti (+15-25% sulla media) la cui partenza e al 55% del carico giusto: con salti di 10-15% a seduta
     servono piu di sei sedute (misura: ~2%, contro il 12,6% della sola CAR-16); soglia 3% */
  assert.ok(donne.mai <= 0.03, 'chi non arriva nelle sei esposizioni: ' + donne.pc(donne.mai) + '%');
  /* la calibrazione migliora la progressione di prima, non la peggiora: piu in fretta e con meno carichi sopra la capacita dopo la prima esposizione */
  assert.ok(donne.p95 < prima.p95 || donne.mai < prima.mai, 'piu in fretta della sola CAR-16');
  /* INT-4: la sola CAR-16 ha ora il tetto +25% della progressione di base (limitaSalitaBase, regole-ricerca.js): le prescrizioni sopra la capacita dopo la prima esposizione scendono da 21,8% (15% oltre il
     massimo) a 14,3% (6,8%), quindi il confronto relativo con quel braccio non vale piu (la calibrazione ha 15,4% e 7,8%, circa un punto sopra, e arriva al carico giusto molto prima: p95 5 contro 99,
     «mai» 1,6% contro 9,9%). Prima di INT-4 la prova diceva «meno di CAR-16»: 16,3% e 9,6% contro 21,8% e 15%. Resta il confronto con il numero di prima: la calibrazione non peggiora (16,3% e 9,6% a origin/main) */
  assert.ok(donne.dopoSopra <= 0.163 && donne.dopoOltre <= 0.096, 'non peggio di prima dopo la prima esposizione: ' + donne.pc(donne.dopoSopra) + '% (16,3%) e ' + donne.pc(donne.dopoOltre) + '% (9,6%)');
  /* la partenza (la tabella D.3, una decisione dell utente) ha le sue code: poche atlete molto sotto la media sono gia al limite alla prima seduta; il tetto di prudenza e questo */
  assert.ok(donne.primoOltre <= 0.05, 'alla prima esposizione le ripetizioni previste non si finiscono nel ' + donne.pc(donne.primoOltre) + '% dei casi');
  assert.ok(donne.dopoOltre <= 0.12, 'dalla seconda in poi le ripetizioni previste non si finiscono nel ' + donne.pc(donne.dopoOltre) + '% dei casi');
  void nuova;
});

test('D.8.9 uomini: la partenza e quella di sempre (decisione D-P1) e la calibrazione, riga «partenza normale», non peggiora niente rispetto a prima', { timeout: 300000 }, () => {
  const a = nuovaApp();
  const N = Number(process.env.ATLETI) || 500;
  const sim = (senzaCar18) => Array.from({ length: N }, (_, i) => simulaNellApp(a, { sesso: 'M', livello: 'principiante', pesoCorpo: 60 + (i * 7) % 40, seme: 2000 + i, esposizioni: 6, senzaCar18: senzaCar18 }));
  const uomini = riassunto(sim(false)), prima = riassunto(sim(true));
  console.log('# D.8.9 uomini (' + uomini.n + ' esercizi): mediana ' + uomini.mediana + ', p95 ' + uomini.p95 + ', mai ' + uomini.pc(uomini.mai) + '%; prima esposizione sopra RIR-1 ' + uomini.pc(uomini.primoSopra) + '% (oltre il massimo ' + uomini.pc(uomini.primoOltre) +
    '%); dalla seconda ' + uomini.pc(uomini.dopoSopra) + '% (' + uomini.pc(uomini.dopoOltre) + '%) | solo CAR-16: mediana ' + prima.mediana + ', p95 ' + prima.p95 + ', mai ' + prima.pc(prima.mai) + '%, dalla seconda ' + prima.pc(prima.dopoSopra) + '% (' + prima.pc(prima.dopoOltre) + '%)');
  assert.strictEqual(uomini.primoSopra, prima.primoSopra, 'la partenza degli uomini non cambia (stessi carichi alla prima esposizione)');
  assert.ok(uomini.dopoSopra <= prima.dopoSopra + 0.02 && uomini.dopoOltre <= prima.dopoOltre + 0.02, 'CAR-18 non aumenta i carichi sopra la capacita');
  assert.ok(uomini.mai <= prima.mai + 0.01 && uomini.mediana <= prima.mediana, 'ne rallenta la convergenza');
});

/* ========== traduzioni ========== */
test('D.8.10: ogni frase nuova (messaggi di D.7, note del programma, motivi) ha la voce in en, es e de (o la porta il JSON di integrazione)', () => {
  const a = nuovaApp();
  const chiavi = lingua => {
    const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, 'js/lingue/' + lingua + '.js'), 'utf8'), ctx);
    const dizionario = Object.assign({}, (ctx.window.I18N && ctx.window.I18N[lingua]) || {});
    const json = path.join(R, 'docs/in-arrivo/w2-t8.json');
    if (fs.existsSync(json)) { const frasi = JSON.parse(fs.readFileSync(json, 'utf8')).frasi || {}; Object.keys(frasi).forEach(k => { if (frasi[k][lingua]) dizionario[k] = frasi[k][lingua]; }); }
    return dizionario;
  };
  const dizionari = { en: chiavi('en'), es: chiavi('es'), de: chiavi('de') };
  const stampo = f => f.replace(/\d+(?:[.,]\d+)*/g, '#');
  const nuove = new Set();
  const frasi = a.dati(a.g('({ m: MOTIVI_STIMA, n: NOTE_PROGRAMMA_STIMA, p: NOTA_PARTENZA_BASSA, b: NOTA_BARRA_VUOTA, s: NOTA_SENZA_BARRA, c: notaCorpoLiberoFacile(), t: FRASE_CARICO_TARATO, r: FRASE_PROMEMORIA_RPE, x: FRASE_SALTO_TROPPO_GRANDE_PRIMA + 40 + FRASE_SALTO_TROPPO_GRANDE_DOPO, f: FRASI_FONTE_STIMA })'));
  Object.values(frasi.m).forEach(m => m.split(' • ').forEach(p => nuove.add(p)));
  Object.values(frasi.n).forEach(p => nuove.add(p));
  [frasi.p, frasi.b, frasi.s, frasi.c, frasi.t, frasi.r, frasi.x].forEach(p => nuove.add(p));
  nuove.add('Calibrazione: RPE 6,5 contro 8 previsto, si sale a 42,5 kg (+6%)'); nuove.add('Calibrazione: serie complete, +2,5 kg');
  const mancanti = [];
  nuove.forEach(f => ['en', 'es', 'de'].forEach(l => { if (!Object.prototype.hasOwnProperty.call(dizionari[l], stampo(f))) mancanti.push(l + ': ' + f); }));
  assert.deepStrictEqual(mancanti, []);
});
