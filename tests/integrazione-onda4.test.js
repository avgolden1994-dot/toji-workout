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

/* ============================================================ d. le guardie del corpo (P4-C) valgono per tutte le righe di cibo, passi e integratori */
const GRUPPI = {
  minorenne: [{ age: 13 }, { age: 16 }, { age: 17 }],
  over65: [{ age: 65 }, { age: 72 }],
  gravidanza: [{ age: 30, sex: 'F', gravidanza: true }]
};
const ADULTI = [{ age: 18 }, { age: 30 }, { age: 40, sex: 'F' }, { age: 64 }];
const tuttiIGruppi = f => Object.keys(GRUPPI).forEach(g => GRUPPI[g].forEach(p => f(g, p)));
const TESTO_PER = {
  minorenne: /^Alla tua età non do numeri su peso o cibo/,
  over65: /^Alla tua età non do grammi di proteine né calorie/,
  gravidanza: /^In gravidanza o dopo il parto non do grammi di proteine né calorie/
};
/* ritmo di calo o di salita (% a settimana), passi, creatina, kcal, grammi, «ideale»: tutto ciò che è un numero di corpo o di cibo */
const NUMERO_DI_CORPO = /\d[\d,.\-– ]*\s?(%|mila|kcal|g\b)|creatina|\bideale\b|ritmo giusto/i;
const DUE_BIA = [{ data: '2026-09-01', valori: { peso: 75, altezza: 175, fmPerc: 20, ffm: 60 } }, { data: '2026-09-15', valori: { peso: 74, altezza: 175, fmPerc: 19, ffm: 60 } }];
function conBia(app, profilo, voci) { app.profilo(profilo); voci.forEach(v => app.chiama('aggiungiBia', v.valori, v.data)); }

test('d. corpoCoach: per minorenni (anche con ETA-04 spenta), over 65 e gravidanza solo il testo prudente: niente ritmo di calo, passi in deficit né creatina', () => {
  tuttiIGruppi((g, p) => ['deficit', 'massa'].forEach(fase => [[], DUE_BIA].forEach((bia, i) => [false, true].forEach(spenta => {
    const app = caricaApp({ ora: '2026-10-05T12:00:00' });
    conBia(app, Object.assign({ sex: 'M', weight: 75, goals: [fase === 'deficit' ? 'dimagrimento' : 'massa'], fase: fase }, p), bia);
    if (spenta) app.spegni(['ETA-04']);
    const out = app.dati(app.chiama('corpoCoach'));
    const e = g + ' ' + JSON.stringify(p) + ' ' + fase + (i ? ' con BIA' : ' senza BIA') + (spenta ? ' ETA-04 spenta' : '');
    assert.deepStrictEqual(out.filter(t => NUMERO_DI_CORPO.test(t)), [], e + ': ' + JSON.stringify(out));
    assert.ok(out.some(t => TESTO_PER[g].test(t)), e + ': manca il testo prudente in ' + JSON.stringify(out));
    assert.ok(!out.some(t => /^Passi|^Creatina/i.test(t)), e);
  }))));
});
test('d. corpoCoach: un over 65 con l\'obiettivo salute tiene i minuti di attività dell\'OMS (non sono cibo né corpo); minorenni e gravidanza no', () => {
  const dopo = p => { const a = caricaApp({ ora: '2026-10-05T12:00:00' }); conBia(a, Object.assign({ sex: 'M', weight: 75, goals: ['salute'], fase: 'mantenimento' }, p), DUE_BIA); return a.dati(a.chiama('corpoCoach')); };
  const over = dopo({ age: 70 });
  assert.strictEqual(over.length, 2, JSON.stringify(over));
  assert.ok(TESTO_PER.over65.test(over[0]) && /^Questa settimana \d+ minuti di pesi/.test(over[1]) && /150-300 minuti/.test(over[1]), JSON.stringify(over));
  assert.deepStrictEqual(over.slice(1).filter(t => /Passi|Creatina|Proteine|g al giorno/i.test(t)), []);
  [{ age: 16 }, { age: 30, sex: 'F', gravidanza: true }].forEach(p => { const o = dopo(p); assert.strictEqual(o.length, 1, JSON.stringify(p) + ' ' + JSON.stringify(o)); });
});
test('d. corpoCoach: per un adulto restano ritmo di calo, passi e creatina di prima (nessuna differenza)', () => {
  ADULTI.forEach(p => {
    const app = caricaApp({ ora: '2026-10-05T12:00:00' });
    conBia(app, Object.assign({ sex: 'M', weight: 75, goals: ['dimagrimento'], fase: 'deficit' }, p), DUE_BIA);
    const out = app.dati(app.chiama('corpoCoach'));
    assert.ok(out.some(t => /^Passi: 10-12 mila/.test(t)) && out.some(t => /^Creatina 3-5 g/.test(t)) && out.some(t => /ideale e 0,5-1%|ritmo ideale/.test(t)), JSON.stringify(p) + ' ' + JSON.stringify(out));
  });
});
const TENDENZE = { deficitVeloce: ['deficit', -1.4], deficitGiusto: ['deficit', -0.7], deficitFermo: ['deficit', -0.1], massaVeloce: ['massa', 0.8], massaGiusta: ['massa', 0.3], massaFerma: ['massa', 0.05], mantenimentoSale: ['mantenimento', 0.8] };
test('d. consiglioPeso: i tre gruppi non ricevono mai «Ritmo giusto… 0,5-1% a settimana», né un ritmo di salita, né calorie; un adulto sì, come prima', () => {
  const consiglio = (p, k) => {
    const app = caricaApp({ ora: '2026-10-05T12:00:00' });
    app.profilo(Object.assign({ sex: 'M', weight: 75, goals: ['dimagrimento'], fase: TENDENZE[k][0] }, p));
    return app.dati(app.chiama('consiglioPeso', { settimana: 0, perc: TENDENZE[k][1] }));
  };
  tuttiIGruppi((g, p) => Object.keys(TENDENZE).forEach(k => {
    const t = consiglio(p, k);
    assert.ok(!NUMERO_DI_CORPO.test(t), g + ' ' + JSON.stringify(p) + ' ' + k + ': ' + t);
    assert.ok(TESTO_PER[g].test(t), g + ' ' + k + ': manca il testo prudente: ' + t);
  }));
  ADULTI.forEach(p => {
    assert.strictEqual(consiglio(p, 'deficitGiusto'), 'Ritmo giusto per dimagrire tenendo il muscolo (0,5-1% a settimana).');
    assert.strictEqual(consiglio(p, 'massaGiusta'), 'Ritmo giusto per la massa (0,25-0,5% a settimana).');
    assert.strictEqual(consiglio(p, 'massaVeloce'), 'Sali in fretta: oltre lo 0,5% a settimana si accumula soprattutto grasso.');
  });
});
test('d. buildProgram: la nota dei passi in deficit (10-12 mila) non va ai tre gruppi (al suo posto il testo prudente); la nota del grasso sopra la media (8-10 mila passi) neppure', () => {
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  const base = { goals: ['dimagrimento'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', sex: 'M', fastidi: [], parq: 'no', sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, seme: 'int4', bia: { peso: 90, altezza: 175, fmPerc: 38, ffm: 56 } };
  tuttiIGruppi((g, p) => {
    const prog = app.dati(app.chiama('buildProgram', Object.assign({}, base, p)));
    assert.deepStrictEqual(prog.note.filter(t => /mila/i.test(t)), [], g + ' ' + JSON.stringify(p) + ': ' + JSON.stringify(prog.note));
    assert.ok(prog.note.some(t => TESTO_PER[g].test(t)), g + ': manca il testo prudente');
    assert.strictEqual(prog.note.filter(t => TESTO_PER[g].test(t)).length, 1, g + ': il testo prudente una volta sola');
  });
  ADULTI.forEach(p => {
    const prog = app.dati(app.chiama('buildProgram', Object.assign({}, base, p)));
    assert.ok(prog.note.indexOf('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo.') !== -1, JSON.stringify(p) + ': la nota dei passi dell adulto c e');
    assert.ok(prog.note.some(t => /^Grasso sopra la media: .*8-10 mila/.test(t)), JSON.stringify(p) + ': la nota del grasso dell adulto c e');
  });
});

/* ============================================================ e. «un fisioterapista» dice anche che il coach non fa diagnosi */
function stringheDi(src) {
  const acorn = require('acorn'), out = [];
  acorn.parse(src, { ecmaVersion: 'latest', onToken: t => { if (t.type.label === 'string' || t.type.label === 'template') out.push(String(t.value)); } });
  return out;
}
function fileJs(dir) {
  return fs.readdirSync(path.join(R, dir), { withFileTypes: true }).flatMap(e => e.isDirectory() ? fileJs(path.join(dir, e.name)) : (/\.js$/.test(e.name) ? [path.join(dir, e.name)] : []));
}
test('e. ogni frase di dolore-mattina.js e delle decisioni dopo la seduta che manda da un fisioterapista dice «Non sono un medico e non faccio diagnosi», e le tre traduzioni la dicono', () => {
  const FRASE = 'Non sono un medico e non faccio diagnosi';
  const senza = [], frasi = [];
  /* dolore-mattina.js e le decisioni dopo la seduta (DEC-03/04); le note per zona di sicurezza/fastidi.js e la nota della cuffia (completamenti.js) hanno il loro rinvio, aperto per la formula (onda-5) */
  fileJs('js').filter(f => /dolore-mattina|questionario-decisioni/.test(f)).forEach(f => stringheDi(fs.readFileSync(path.join(R, f), 'utf8')).forEach(s => {
    if (/fisioterapist/i.test(s)) { if (/dolore-mattina/.test(f)) frasi.push(s); if (s.indexOf(FRASE) === -1) senza.push(f + ': ' + s.slice(0, 100)); }
  }));
  assert.ok(frasi.length >= 1, 'c e la frase di dolore-mattina.js');
  assert.deepStrictEqual(senza, []);
  ['en', 'es', 'de'].forEach(l => {
    const d = dizionario(l);
    frasi.forEach(s => {
      const chiave = s.replace(/\d+/g, '#');
      assert.ok(d[chiave] || d[s], l + ': manca «' + chiave + '»');
    });
  });
  const d = dizionario('en'), k = 'Il carico resta ridotto del #%. Se continua a crescere, senti un fisioterapista. Non sono un medico e non faccio diagnosi.';
  assert.ok(/not a doctor/i.test(d[k] || ''), 'en');
  assert.ok(/no soy m[ée]dico/i.test(dizionario('es')[k] || ''), 'es');
  assert.ok(/kein arzt/i.test(dizionario('de')[k] || ''), 'de');
});

/* ============================================================ INT-4b, B1: la bandiera della gravidanza resta quando il profilo si riscrive (nuovo ciclo, «Rifai il programma», questionario rifatto) */
function conGravidanza() {
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  app.profilo({ level: 'intermedio', sex: 'donna', age: 31, weight: 64, height: 165, days: 3, minutes: 60, luogo: 'palestra', goals: ['dimagrire'], fastidi: [], sonno: 'bene', attrezzi: 'indifferente', freq: '2', parq: false });
  app.scrivi('tz_onboarded', '1'); app.scrivi('tz_consenso', 'si');
  app.g('nuovoCiclo(true)');
  app.g("setCoach('gravidanza', true)");
  return app;
}
const rifaiQuestionario = (app, risposte) => {
  const p = app.leggi(app.chiave('PROFILE_KEY'));
  app.ctx.confirm = () => true; app.ctx.alert = () => {};
  app.g('restartOnboarding()');
  app.g('Object.assign(onbData, ' + J(Object.assign({ goals: p.goals, level: p.level, days: p.days, minutes: p.minutes, luogo: p.luogo, sonno: p.sonno, attrezzi: p.attrezzi, freq: p.freq }, risposte || {})) + '); onbStep = ONB_ULTIMO; onbNext()');
};
const SOLO_PRUDENTE = out => assert.ok(out.length === 1 && TESTO_PER.gravidanza.test(out[0]), JSON.stringify(out));
[['nuovo ciclo', app => app.g('nuovoCiclo(true)')], ['«Rifai il programma» con il questionario', app => rifaiQuestionario(app)],
 ['questionario rifatto con il PAR-Q a «no»', app => rifaiQuestionario(app, { parq: 'no' })]].forEach(([via, fai]) => {
  test('B1. la bandiera gravidanza e la modalità prudente restano dopo: ' + via + ' (e il testo prudente al posto di proteine, passi e creatina)', () => {
    const app = conGravidanza();
    const p0 = app.leggi(app.chiave('PROFILE_KEY'));
    assert.strictEqual(p0.gravidanza, true); assert.strictEqual(p0.parq, true); assert.strictEqual(p0.parqDaGravidanza, true);
    fai(app);
    const p1 = app.leggi(app.chiave('PROFILE_KEY'));
    assert.strictEqual(p1.gravidanza, true, 'la bandiera resta');
    assert.strictEqual(p1.parq, true, 'la modalità prudente resta');
    assert.strictEqual(p1.parqDaGravidanza, true, 'ricorda che la modalità prudente l ha accesa la bandiera: spenta la bandiera torna la risposta di prima');
    SOLO_PRUDENTE(app.dati(app.chiama('corpoCoach')));
    assert.ok(app.errori.length === 0, app.errori.join('\n'));
    /* il programma nuovo e quello di chi e prudente: nessuna tecnica al cedimento, RIR >= 3 */
    assert.ok(app.json('getProgramma()').prefs !== undefined);
    assert.ok(app.g('inGravidanza(getProfile())'));
    /* spenta la bandiera, torna la risposta di prima al questionario */
    app.g("setCoach('gravidanza', false)");
    const p2 = app.leggi(app.chiave('PROFILE_KEY'));
    assert.strictEqual(p2.gravidanza, undefined); assert.strictEqual(p2.parq, false, 'senza bandiera torna il «no» di prima');
  });
});
test('B1. senza la bandiera il profilo si riscrive come prima (nessun campo di gravidanza dal nulla)', () => {
  const app = caricaApp({ ora: '2026-10-05T12:00:00' });
  app.profilo({ level: 'intermedio', sex: 'donna', age: 31, weight: 64, height: 165, days: 3, minutes: 60, luogo: 'palestra', goals: ['dimagrire'], fastidi: [], sonno: 'bene', attrezzi: 'indifferente', freq: '2', parq: false });
  app.scrivi('tz_onboarded', '1'); app.scrivi('tz_consenso', 'si');
  app.g('nuovoCiclo(true)'); app.g('nuovoCiclo(true)');
  const p = app.leggi(app.chiave('PROFILE_KEY'));
  assert.ok(!('gravidanza' in p) && !('parqDaGravidanza' in p) && p.parq === false, JSON.stringify([p.gravidanza, p.parqDaGravidanza, p.parq]));
});
test('B1. un backup fatto con la bandiera accesa la riporta (il ripristino non riscrive il profilo)', () => {
  const app = conGravidanza();
  const foto = app.dati(app.g('fotografia()'));
  const altro = caricaApp({ ora: '2026-10-05T12:00:00' });
  altro.ctx.__foto = altro.g('JSON.parse(' + J(J(foto)) + ')');
  altro.g('applicaFotografia(__foto, true)');
  assert.strictEqual(altro.leggi(altro.chiave('PROFILE_KEY')).gravidanza, true);
});

/* ============================================================ INT-4b, M2: ALG-14 riporta al carico di LAVORO di prima della pausa, non a quello dello scarico */
function rientroDopoScarico(eta, pausa) {
  const { a } = telefono({ d: { level: 'intermedio', days: 3, minutes: 60, goals: ['massa'], sex: 'M', age: eta, parq: 'no', seme: 'rie3' + eta + 'intermedio' } });
  const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), off = giorni.map(g => nomi.indexOf(g)), righe = [];
  const nome = a.json('loadData()')[giorni[0]].find(e => Number(e.weight) > 0 && !a.g('isTimeBased(' + J(e.name) + ')')).name;
  const wS = a.json('getProgramma().fasi').indexOf('scarico') + 1, inizioPausa = 7 * wS;   /* la pausa comincia subito dopo la prima settimana di scarico */
  for (let day = 0; day < inizioPausa + pausa + 21; day++) {
    if (off.indexOf(day % 7) === -1 || (day >= inizioPausa && day < inizioPausa + pausa)) continue;
    a.ora(new Date(2026, 9, 5 + day, 12));
    const sett = a.json('settimanaProgramma()');
    const r = vivi(a, nomi[day % 7], { rpe: 'bersaglio' });
    const e = r.voci.find(z => z.name === nome);
    if (e) righe.push({ day: day, sett: sett.numero, scarico: sett.fase === 'scarico', w: e.weight, reps: e.reps, nota: e.coachNote || '' });
  }
  return righe;
}
[70, 30].forEach(eta => test('M2. dopo uno scarico e una pausa di 14 giorni (' + eta + ' anni) il carico di prima dell\'ALG-14 è quello di lavoro, non quello dello scarico; mai oltre; il motivo non si contraddice', () => {
  const righe = rientroDopoScarico(eta, 14);
  const lavoro = Math.max(...righe.filter(r => !r.scarico && r.day < righe.find(x => x.scarico).day).map(r => r.w)), scarico = righe.find(r => r.scarico);
  assert.ok(scarico && scarico.w < lavoro, 'lo scarico c e: ' + JSON.stringify(scarico) + ' contro ' + lavoro);
  const dopo = righe.filter(r => r.day > righe.filter(x => x.scarico).pop().day + 13);
  const conRisalita = dopo.filter(r => /si risale verso il carico di prima/.test(r.nota));
  conRisalita.forEach(r => {
    assert.ok(r.nota.indexOf('(' + String(lavoro).replace('.', ',') + ' kg)') !== -1 || r.nota.indexOf('(' + lavoro + ' kg)') !== -1, 'il carico di prima e quello di lavoro ' + lavoro + ': ' + r.nota);
    assert.ok(r.nota.indexOf('(' + scarico.w + ' kg)') === -1 && r.nota.indexOf('(' + String(scarico.w).replace('.', ',') + ' kg)') === -1, 'non quello dello scarico: ' + r.nota);
    assert.ok(!/sarebbe un salto|prima una ripetizione in piu/.test(r.nota), 'il motivo non dice due cose: ' + r.nota);
    assert.ok(!/circa il 2,5% a seduta|circa il 5% a seduta/.test(r.nota), 'niente percentuale a seduta che non e quella vera: ' + r.nota);
  });
  assert.ok(dopo.every(r => r.w <= lavoro + 1e-9), 'mai oltre il carico di prima: ' + dopo.map(r => r.w).join(' '));
  /* e si torna: dopo tre sedute a 0,9 del carico di lavoro o piu per chi ha 30 anni, e almeno risale ogni volta per gli over 65 */
  const pesi = dopo.map(r => r.w);
  for (let i = 1; i < pesi.length; i++) assert.ok(pesi[i] >= pesi[i - 1] - 1e-9, 'il carico non scende nelle sedute dopo il rientro: ' + pesi.join(' '));
  if (eta === 30) assert.ok(pesi[pesi.length - 1] >= lavoro * 0.9 - 1e-9, 'a 30 anni in tre sedute si e a 0,9 del carico di prima o piu: ' + pesi.join(' ') + ' contro ' + lavoro);
  assert.ok(conRisalita.length >= 1, 'la risalita c e: ' + JSON.stringify(dopo));
}));

/* ============================================================ INT-4b, m4: Opzioni › Il coach non dice «0,5-1% a settimana» ai tre gruppi protetti */
test('m4. la pagina «Il coach» non mostra il ritmo di calo (0,5-1% a settimana) a minorenni, over 65 e gravidanza; agli adulti sì, come prima', () => {
  const pagina = p => { const a = caricaApp({ ora: '2026-10-05T12:00:00' }); a.profilo(Object.assign({ level: 'intermedio', sex: 'F', weight: 60, goals: ['dimagrimento'], fase: 'deficit' }, p)); return a.g('paginaCoach(getProfile())'); };
  tuttiIGruppi((g, p) => { const h = pagina(p); assert.ok(!/0,5-1%|a settimana/.test(h.replace(/<[^>]*>/g, '')) || !/peso scenda/.test(h), g + ' ' + JSON.stringify(p) + ': ' + (h.match(/In dimagrimento[^<]*/) || [''])[0]); assert.ok(/In dimagrimento il coach tiene i carichi/.test(h), g + ': la frase senza ritmo c e'); });
  ADULTI.forEach(p => assert.ok(/peso scenda dello 0,5-1% a settimana/.test(pagina(p)), JSON.stringify(p)));
  ['en', 'es', 'de'].forEach(l => assert.ok(dizionario(l)['In dimagrimento il coach tiene i carichi.'], l + ': manca la traduzione'));
});

/* ============================================================ INT-4b, m2: una pausa durante lo scarico non fa rifare la settimana di scarico */
test('m2. una pausa di 7-13 giorni nella settimana di scarico non la fa rifare: dopo si va avanti (3 e 2 sedute a settimana)', () => {
  [3, 2].forEach(d => {
    const { a } = telefono({ d: { level: 'intermedio', days: d, minutes: 60 } });
    const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
    const wS = a.json('getProgramma().fasi').indexOf('scarico') + 1;
    assert.ok(wS >= 2);
    for (let n = 1; n < wS; n++) giorni.forEach(g => { vaiA(a, n, nomi.indexOf(g)); vivi(a, g, { rpe: 'bersaglio' }); });
    vaiA(a, wS, nomi.indexOf(giorni[0])); vivi(a, giorni[0], { rpe: 'bersaglio' });   /* solo la prima seduta dello scarico, poi la pausa */
    vaiA(a, wS + 1, nomi.indexOf(giorni[0]));   /* 7 giorni dopo */
    const sett = a.json('settimanaProgramma()');
    assert.strictEqual(sett.numero, wS + 1, d + ' a settimana: la settimana dopo lo scarico e la ' + (wS + 1) + ', non una seconda ' + wS + ' (' + sett.numero + ' ' + sett.fase + ')');
    assert.notStrictEqual(sett.fase, 'scarico', 'non si rifa lo scarico');
  });
});
test('m2. una pausa di 7-13 giorni FUORI dallo scarico ferma ancora la settimana (la rampa non avanza), come prima', () => {
  const { a } = telefono({ d: { level: 'intermedio', days: 3, minutes: 60 } });
  const nomi = a.json('DAYS'), giorni = a.giorniAllenamento();
  for (let n = 1; n <= 2; n++) giorni.forEach(g => { vaiA(a, n, nomi.indexOf(g)); vivi(a, g, { rpe: 'bersaglio' }); });
  vaiA(a, 3, nomi.indexOf(giorni[giorni.length - 1]) + 1);   /* 9 giorni dopo l ultima seduta della settimana 2 */
  assert.strictEqual(a.json('settimanaProgramma()').numero, 2, 'la settimana 2 si rifa');
});
