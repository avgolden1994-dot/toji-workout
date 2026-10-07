/* Integrazione dell'onda 4 (INT-4): i collegamenti che nessuno dei quattro pacchetti (P4-C guardie del corpo, P4-F fastidi, P3-C Forza, P4-S popolazioni e rientro) poteva chiudere da solo.
   Ogni prova è nata rossa sul codice fuso di prima e dice il difetto che chiude.

   a. Progressione base fuori piano (regole-ricerca.js, caricoProssimoBase): un aumento non supera mai +25% in una volta, come la calibrazione (CAR-18) e la ripresa dopo lo scarico (MES-06).
      Il passo della griglia (cavo da 6,5 kg + 2,5 = 9, che la griglia porta a 10) faceva +54%; dentro il piano lo fermava il +10% di ALG-05 (che per difetto portava a 5 kg: più basso).
   b. CST-01 e chi fa una seduta a settimana (popolazioni.js): una «pausa» è relativa alla frequenza del programma. Con 1 seduta a settimana 7 giorni tra due sedute sono normali: prima la settimana
      del programma non avanzava mai e lo scarico non arrivava; con 2 a settimana una seduta saltata la fermava di una settimana.
   c. Il momento «Nuovo bambino in casa» (metodi-momenti.js) non dà più la ripresa dopo il parto (REC-12 parte b, bloccata): rinvio all'ostetrica o al medico, in quattro lingue.
   d. Le guardie del corpo (P4-C) valgono anche per il ritmo di calo, i passi in deficit e la creatina di corpoCoach e per consiglioPeso ai minorenni.
   e. dolore-mattina.js: dove c'è «un fisioterapista» c'è anche «Non sono un medico e non faccio diagnosi». */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');
const { telefono, vaiA, vivi } = require('./aiuto-atleta-piano');
const R = path.join(__dirname, '..');
const J = JSON.stringify;

/* ============================================================ a. la salita della progressione base: mai oltre +25% in una volta */
const TETTO = 1.25;
/* un telefono con un programma v2 e lo storico di UN esercizio fuori dal piano: tre serie complete a `peso` x `reps` (bersaglio di oggi `bersaglio`), senza RPE segnato (strada della doppia progressione) */
function conStoria(nome, peso, reps, opz) {
  const o = Object.assign({ age: 30, parq: false, bersaglio: 8, sedute: 2 }, opz || {});
  const { a } = telefono({ d: { level: 'intermedio', days: 3, minutes: 60 } });   /* il programma è quello di un adulto: il profilo cambia dopo, cosi l'esercizio resta fuori dal piano */
  a.profilo({ level: 'intermedio', sex: 'M', age: o.age, parq: !!o.parq });
  const nelPiano = a.json('Object.values(loadData()).flat().map(e => e.name)').indexOf(nome) !== -1;
  const voci = [];
  for (let k = 0; k < o.sedute; k++) voci.push(a.seduta(3 + 4 * k, [{ nome: nome, serie: [[peso, reps, true, null], [peso, reps, true, null], [peso, reps, true, null]] }], { settimana: { numero: 1, fase: 'carico' } }));
  a.storia(voci);
  return { a, nelPiano };
}
const proponi = (a, nome, bersaglio) => a.dati(a.chiama('caricoProssimo', nome, 0, bersaglio || 8, 3));
const SALITE = [
  /* nome, peso di ieri, ripetizioni fatte (alla cima del campo: ora si sale di peso), profilo */
  ['🍑 Pull-Through ai Cavi', 6.5, 10, { age: 68, parq: true }],   /* il caso di conserva-progressi: +2,5 prudente = 9 kg, la griglia dava 10 (+54%) */
  ['🍑 Pull-Through ai Cavi', 6.5, 10, {}],                          /* un adulto: +5 kg (gambe) = 11,5 kg, la griglia dava 12,5 (+92%) */
  ['🍑 Pull-Through ai Cavi', 7, 10, { age: 68, parq: true }],
  ['🛡️ Alzate Laterali', 3, 11, {}],                                 /* manubri da 3 kg: un solo passo (+1 kg) è +33%: non c'è un peso in mezzo, resta il passo più piccolo */
  ['🦾 Hammer Curl', 4, 11, {}]
];
SALITE.forEach(([nome, peso, reps, opz]) => {
  test('a. ' + nome + ' ' + peso + ' kg x ' + reps + (opz.age ? ' (68 anni, PAR-Q)' : '') + ': sale, ma non oltre +25% in una volta (o di un solo passo se un passo è già di più)', () => {
    const { a, nelPiano } = conStoria(nome, peso, reps, opz);
    assert.ok(!nelPiano, nome + ' deve essere fuori dal piano per questa prova');
    const r = proponi(a, nome);
    const passo = a.g('passoAttrezzo(' + J(nome) + ', { kg: ' + peso + ' })'), primoSopra = a.g('arrotondaAttrezzo(' + (peso + 1e-6) + ', ' + J(nome) + ', { modo: "su" })');
    assert.ok(r.weight > peso, nome + ': il peso sale (' + peso + ' -> ' + r.weight + ')');
    assert.ok(r.weight <= peso * TETTO + 1e-9 || Math.abs(r.weight - primoSopra) < 1e-9, nome + ': ' + peso + ' -> ' + r.weight + ' kg (' + Math.round((r.weight / peso - 1) * 100) + '%), tetto ' + (peso * TETTO) + ' o il primo passo ' + primoSopra + ' (passo ' + passo + ')');
    assert.ok(a.errori.length === 0, a.errori.join('\n'));
  });
});
test('a. un cavo con un carico fuori griglia (6,5 kg) sale al primo peso vero della griglia che non supera il +25% (7,5 kg), non a 10 kg', () => {
  const { a } = conStoria('🍑 Pull-Through ai Cavi', 6.5, 10, { age: 68, parq: true });
  assert.strictEqual(proponi(a, '🍑 Pull-Through ai Cavi').weight, 7.5);
});

/* ============================================================ b. CST-01: la pausa è relativa alla frequenza del programma */
/* vive il programma per `settimane` settimane e dice la settimana che la scheda mostra all'apertura di ogni seduta; `salta`: sedute (settimana:giorno) che l'atleta non fa */
function storia(giorniSettimana, settimane, opz) {
  const o = Object.assign({ salta: [], rpe: 'bersaglio' }, opz || {});
  const { a } = telefono({ d: { level: 'intermedio', days: giorniSettimana, minutes: 60 } });
  const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
  const visto = [];
  for (let n = 1; n <= settimane; n++) giorni.forEach(g => {
    if (o.salta.indexOf(n + ':' + g) !== -1) return;
    vaiA(a, n, nomi.indexOf(g));
    const sett = a.json('settimanaProgramma()');
    const r = vivi(a, g, { rpe: o.rpe });
    visto.push({ n: n, g: g, sett: sett.numero, fase: sett.fase, tipi: r.voci.map(v => v.coachTipo) });
  });
  return { a, visto };
}
function controlla(visto, etichetta) {
  const sbagliate = visto.filter(v => v.sett !== v.n);
  assert.deepStrictEqual(sbagliate.map(v => v.n + ':' + v.g + ' mostra la settimana ' + v.sett), [], etichetta + ': la settimana del programma segue il calendario');
  [6, 12].forEach(n => {
    const v = visto.filter(x => x.n === n);
    assert.ok(v.length > 0 && v.every(x => x.fase === 'scarico'), etichetta + ': la settimana ' + n + ' è di scarico (' + v.map(x => x.fase).join(',') + ')');
    assert.ok(v.some(x => x.tipi.indexOf('scarico') !== -1), etichetta + ': la seduta di scarico della settimana ' + n + ' ha i carichi di scarico');
  });
}
test('b. 1 seduta a settimana: 12 settimane, la settimana avanza e arrivano i due scarichi (6ª e 12ª)', () => {
  const { visto } = storia(1, 12);
  assert.strictEqual(visto.length, 12);
  controlla(visto, '1 a settimana');
});
test('b. 2 sedute a settimana: 12 settimane, la settimana avanza e arrivano i due scarichi', () => {
  const { visto } = storia(2, 12);
  assert.strictEqual(visto.length, 24);
  controlla(visto, '2 a settimana');
});
test('b. 2 sedute a settimana con una seduta saltata (4ª e 9ª settimana): il programma non si ferma di una settimana', () => {
  const { visto } = storia(2, 12, { salta: ['4:Giovedì', '9:Lunedì'] });
  controlla(visto, '2 a settimana con una seduta saltata');
});
test('b. 3 sedute a settimana: come prima (nessuna differenza per chi ha un ritmo normale)', () => {
  const { visto } = storia(3, 12);
  controlla(visto, '3 a settimana');
});
test('b. una pausa vera (25 giorni senza sedute) ferma il calendario e si riparte dalla prima settimana del blocco, con 1, 2 e 3 sedute a settimana', () => {
  [1, 2, 3].forEach(d => {
    const { a } = telefono({ d: { level: 'intermedio', days: d, minutes: 60 } });
    const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
    for (let n = 1; n <= 4; n++) giorni.forEach(g => { vaiA(a, n, nomi.indexOf(g)); vivi(a, g, { rpe: 'bersaglio' }); });
    const ultimo = giorni[giorni.length - 1];
    vaiA(a, 4, nomi.indexOf(ultimo) + 25);   /* 25 giorni dopo l'ultima seduta */
    const sett = a.json('settimanaProgramma()');
    assert.strictEqual(sett.numero, 1, d + ' a settimana: dopo 25 giorni senza sedute si riparte dalla settimana 1 (' + sett.numero + ')');
  });
});
test('b. una pausa di 9 giorni con 2 sedute a settimana ferma la settimana (la rampa non avanza), come prima; con 1 a settimana 9 giorni sono un ritardo normale', () => {
  const dopo = d => {
    const { a } = telefono({ d: { level: 'intermedio', days: d, minutes: 60 } });
    const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
    for (let n = 1; n <= 3; n++) giorni.forEach(g => { vaiA(a, n, nomi.indexOf(g)); vivi(a, g, { rpe: 'bersaglio' }); });
    const ultimo = giorni[giorni.length - 1];
    vaiA(a, 3, nomi.indexOf(ultimo) + 9);   /* 9 giorni dopo l'ultima seduta della settimana 3: calendario = settimana 4 (o 5) */
    return { sett: a.json('settimanaProgramma()').numero, calendario: Math.floor((9 + nomi.indexOf(ultimo)) / 7) + 3 };
  };
  const due = dopo(2), uno = dopo(1);
  assert.ok(due.sett < due.calendario, '2 a settimana, 9 giorni: la settimana si ferma (' + due.sett + ' contro il calendario ' + due.calendario + ')');
  assert.strictEqual(uno.sett, uno.calendario, '1 a settimana, 9 giorni: segue il calendario');
});
test('b. over 65 con 1 seduta a settimana: i 7 giorni tra due sedute non contano doppi (nessun rientro a ogni seduta)', () => {
  const { a } = telefono({ d: { level: 'intermedio', days: 1, minutes: 60, age: 68, parq: 'no' }, profilo: { age: 68 } });
  const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
  for (let n = 1; n <= 3; n++) giorni.forEach(g => { vaiA(a, n, nomi.indexOf(g)); vivi(a, g, { rpe: 'bersaglio' }); });
  vaiA(a, 4, 0);
  assert.strictEqual(a.g('giorniPausaContati(7)'), 7, '7 giorni tra due sedute settimanali restano 7');
  assert.strictEqual(a.json('statoRientro()').seduta, 0, 'nessun rientro');
  /* una pausa vera (21 giorni) conta ancora doppia */
  vaiA(a, 3, 21);
  assert.strictEqual(a.g('giorniPausaContati(21)'), 42, 'una pausa vera conta doppia sopra i 65 anni');
});

/* ============================================================ c. il momento «Nuovo bambino in casa» non dà la ripresa dopo il parto */
function dizionario(lingua) {
  const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, 'js/lingue/' + lingua + '.js'), 'utf8'), ctx);
  return Object.assign({}, (ctx.window.I18N && ctx.window.I18N[lingua]) || {});
}
const RX_PROTOCOLLO_PARTO = /pavimento pelvico|pelvic floor|suelo p[ée]lvico|beckenboden|\d+ settimane|\d+ weeks|\d+ semanas|\d+ wochen|attivit[aà] leggera|light activity|actividad ligera|leichte aktivit/i;
test('c. il momento «bambino»: nessun protocollo dopo il parto, rinvio all\'ostetrica o al medico, tradotto in en, es e de', () => {
  const app = caricaApp({});
  const m = app.json('MOMENTI.find(x => x.id === "bambino")');
  assert.ok(m && m.testo, 'il momento esiste');
  assert.ok(!RX_PROTOCOLLO_PARTO.test(m.testo), 'nessun protocollo: ' + m.testo);
  assert.ok(/ostetric/i.test(m.testo) && /medico/i.test(m.testo), 'rinvia all\'ostetrica o al medico: ' + m.testo);
  assert.ok(/non do un programma|non dà un programma|non da un programma/i.test(m.testo), 'dice che il coach non dà un programma specifico: ' + m.testo);
  ['en', 'es', 'de'].forEach(l => {
    const t = dizionario(l)[m.testo];
    assert.ok(t && t !== m.testo, l + ': manca la traduzione di «' + m.testo + '»');
    assert.ok(!RX_PROTOCOLLO_PARTO.test(t), l + ': nessun protocollo nella traduzione: ' + t);
  });
});
test('c. nei dizionari non resta nessuna voce con la ripresa dopo il parto di prima', () => {
  ['en', 'es', 'de'].forEach(l => {
    const d = dizionario(l);
    const rimaste = Object.keys(d).filter(k => /pavimento pelvico/i.test(k) || /pelvic floor|suelo p[ée]lvico|beckenboden/i.test(d[k]));
    assert.deepStrictEqual(rimaste, [], l + ': voci con il pavimento pelvico');
  });
});
