/* Bilancia essenziale (P3-A, coach v2: una parte di W3-T1): griglia dei pesi per attrezzo (ALG-06, B17), manubrio piu pesante dichiarato anche nella
   progressione (CAS-01b), carico di lavoro robusto (ALG-02, U10), incrementi dall RPE con il massimale (AUT-01, registro B3), ricalcolo dal massimale
   quando cambiano le ripetizioni efficaci (ALG-05, fase 'carico' 20), contratto `c.voce` della catena 'carico', testo dello scarico senza «ripartire piu forte».
   Come lavora: carica l app VERA in vm (tests/aiuto-app.js, orologio fisso lunedi 5 ottobre 2026) e i due file nuovi se index.html non li ha ancora
   (conBilanciaV2, tests/aiuto-atleta.js: entrano con il manifesto docs/in-arrivo/P3-A.json). Le prove dei difetti sono scritte PRIMA della correzione,
   con i numeri che il codice di prima dava (nei commenti «prima:»): senza la correzione falliscono.
   Fonti: docs/ricerca-algoritmi-carichi-e-app.md (3.3-3.8, 3.14, 6 U7 U10 U12, 7 ALG-02 ALG-05 ALG-06), docs/ricerca-forza-progressione.md 3.1-3.3 (AUT-01),
   registro docs/coach-v2-decisioni.md B3 (un punto di RPE: caricoPer sul massimale, 2,4-2,9% per punto, al massimo 2 punti), D-P5 e REG-04 (programmi v1). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conBilanciaV2, inGrigliaBase, simulaNellApp, riassunto } = require('./aiuto-atleta');

const ORA = '2026-10-05T10:00:00';                 /* lunedi */
const PANCA = '💪 Panca Piana Bilanciere';         /* bilanciere, «pesante», +2,5 kg */
const LEG = '🦵 Leg Press';                        /* macchina, +5 kg */
const CURL = '🦾 Curl su Panca Inclinata';         /* manubri, isolamento, +1 kg */
const LENTO = '🛡️ Lento Avanti Manubri';           /* manubri, multiarticolare, +2,5 kg */
const GOBLET = '🦵 Goblet Squat';                  /* manubri, gambe, +5 kg */
const ALZATE = '🛡️ Alzate Laterali';               /* manubri, isolamento leggero */
/* programma di 12 settimane cominciato lunedi 28 settembre: oggi e la settimana 2 (carico); blocchi di 6 (5 di carico + scarico) */
const FASI = ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico'];
const PROG_V1 = { creato: '2026-09-28', inizio: '2026-09-28', settimane: 12, blocco: 6, fasi: FASI, goals: ['massa'] };
const PROG_V2 = Object.assign({}, PROG_V1, { versione: 2 });
/* oggi nella settimana 6 (scarico): cominciato 5 settimane fa */
const PROG_V1_SCARICO = Object.assign({}, PROG_V1, { creato: '2026-08-31', inizio: '2026-08-31' });

function nuovaApp(profilo, prog, opz) {
  const app = caricaApp(Object.assign({ ora: ORA }, opz || {}));
  conBilanciaV2(app);
  app.profilo(Object.assign({ level: 'intermedio', age: 30, sex: 'M' }, profilo));
  if (prog) app.programma(prog);
  return app;
}
/* una seduta dello storico: `giorniFa`, serie [[kg, ripetizioni, rpe]] (tutte fatte), obiettivo come lo salva la v2 (facoltativo) */
function registra(app, giorniFa, nome, serie, obiettivo) {
  const h = app.seduta(giorniFa, [{ nome: nome, serie: serie.map(s => [s[0], s[1], s[3] !== false, s[2] || null]) }]);
  if (obiettivo) h.sessione[0].obiettivo = obiettivo;
  const lista = (app.leggi(app.chiave('historyKey')) || []).concat([h]).sort((a, b) => b.id - a.id);
  app.storia(lista);
  return h;
}
const serie = (n, kg, reps, rpe) => Array.from({ length: n }, () => [kg, reps, rpe || null]);
const carico = (app, nome, base, reps, sets) => app.dati(app.chiama('caricoProssimo', nome, base, reps, sets));
/* simula la regola nel catalogo come «(spegnibile)» finche l integrazione non scrive la sua riga nella mappa */
function spegnibileNelCatalogo(app, codice) {
  app.g('if (!COACH_REGOLE_PER_CODICE[' + JSON.stringify(codice) + ']) COACH_REGOLE_PER_CODICE[' + JSON.stringify(codice) + '] = { codice: ' + JSON.stringify(codice) + ', spegnibile: true, sottoCoach: "bilancia" }');
}

/* ============================================================================================================
   ALG-02 · U10: chi abbassa il peso a meta seduta non vede salire il carico (programmi v2; i v1 come prima, REG-04)
   ============================================================================================================ */
test('U10 (ALG-02): peso abbassato dopo la prima serie, programma v2: si riparte dal peso con cui si sono fatte piu serie (prima: 62,5 kg)', () => {
  const app = nuovaApp({}, PROG_V2);
  registra(app, 3, PANCA, [[60, 8], [55, 8], [55, 8], [55, 8]], { reps: 8, base: 8, sets: 4 });
  const r = carico(app, PANCA, 60, 8, 4);
  /* prima: il riferimento era il massimo (60 kg) e la seduta «ok»: 62,5 kg, sopra il carico che non si e tenuto */
  assert.ok(r.weight <= 57.5, 'non sopra il carico di lavoro (55 kg) + un passo: ' + r.weight + ' kg · ' + r.motivo);
  assert.strictEqual(r.weight, 57.5);
  assert.match(r.motivo, /Hai cambiato peso a metà seduta: parto dal peso con cui hai fatto più serie/);
});

test('U10 (ALG-02): una serie abbassata alla fine = la seduta non e «ok» a quel carico: stesso carico (prima: 62,5 kg)', () => {
  const app = nuovaApp({}, PROG_V2);
  registra(app, 3, PANCA, [[60, 8], [60, 8], [60, 8], [55, 8]], { reps: 8, base: 8, sets: 4 });
  const r = carico(app, PANCA, 60, 8, 4);
  assert.deepStrictEqual([r.weight, r.tipo], [60, 'fermo'], r.motivo);
});

test('ALG-02: con il back-off (CAR-13) il carico di lavoro e la serie piu pesante, come prima; programmi v1 come prima (REG-04)', () => {
  const app = nuovaApp({}, PROG_V2);
  registra(app, 3, PANCA, [[60, 8], [57, 8], [57, 8], [57, 8]], { reps: 8, base: 8, sets: 4, tecnica: 'backoff' });
  assert.strictEqual(carico(app, PANCA, 60, 8, 4).weight, 62.5, 'back-off: la serie pesante e il carico di lavoro');
  const v1 = nuovaApp({}, PROG_V1);
  registra(v1, 3, PANCA, [[60, 8], [55, 8], [55, 8], [55, 8]], { reps: 8, sets: 4 });
  assert.strictEqual(carico(v1, PANCA, 60, 8, 4).weight, 62.5, 'v1: il massimo tra le serie, come prima (D-P5: cambia dal prossimo programma)');
});

/* ============================================================================================================
   ALG-06 · griglia: nessun carico proposto fuori dai pesi che si caricano davvero (programmi v1 e v2)
   ============================================================================================================ */
const PROFILI = { intermedio: { level: 'intermedio' }, principiante: { level: 'principiante' }, parq: { level: 'intermedio', parq: true }, over65: { level: 'intermedio', age: 68 },
  donna: { level: 'principiante', sex: 'F' } };
/* [nome, kg, ripetizioni] */
const ESERCIZI = [[PANCA, 60, 8], [LEG, 100, 12], [CURL, 12, 12], [LENTO, 14, 10], [GOBLET, 16, 12], [ALZATE, 7, 12], [PANCA, 42.5, 8]];
/* storie: (kg, ripetizioni) -> sedute [[giorniFa, serie]] */
const STORIE = {
  ok: (kg, r) => [[10, serie(3, kg, r)], [6, serie(3, kg, r)], [3, serie(3, kg, r)]],
  okSopra: (kg, r) => [[10, serie(3, kg, r)], [6, serie(3, kg, r + 1)], [3, serie(3, kg, r + 2)]],
  cima: (kg, r) => [[10, serie(3, kg, r + 1)], [6, serie(3, kg, r + 2)], [3, serie(3, kg, r + 3)]],
  facile: (kg, r) => [[10, serie(3, kg, r)], [6, serie(3, kg, r)], [3, serie(3, kg, r, 6)]],
  facileSubito: (kg, r) => [[3, serie(3, kg, r, 6)]],
  mancato2: (kg, r) => [[6, serie(3, kg, r - 2)], [3, serie(3, kg, r - 2)]],
  moltoSotto: (kg, r) => [[3, serie(3, kg, r - 4)]],
  rientro: (kg, r) => [[15, serie(3, kg, r)]],
  varia: (kg, r) => [[3, [[kg, r], [kg * 0.9, r], [kg * 0.9, r]]]]
};
const AGGIUSTI = {
  nessuno: () => null,
  dolore: n => ({ scarico: null, esercizi: { [n]: { fattore: 0.9, sedute: 1, motivo: 'Dolore segnalato: carico ridotto (10%)' } } }),
  extra: n => ({ scarico: null, esercizi: { [n]: { extra: true, sedute: 1 } } }),
  scaricoCoach: () => ({ esercizi: {}, scarico: { sedute: 1, motivo: 'stanchezza alta per piu giorni di fila' } })
};
test('ALG-06: in 5 profili x 7 esercizi x 9 storie x 4 aggiusti x 3 programmi (v1, v2, v1 in scarico) nessun carico fuori dalla griglia dell attrezzo (prima: 61,5 · 16,5 · 13 · 54 kg...)', () => {
  const app = nuovaApp();
  const fuori = [];
  let pesati = 0;
  Object.keys(PROFILI).forEach(pk => [['v1', PROG_V1], ['v2', PROG_V2], ['scarico', PROG_V1_SCARICO]].forEach(([pn, P]) => ESERCIZI.forEach(([nome, kg, reps]) => Object.keys(STORIE).forEach(sk => Object.keys(AGGIUSTI).forEach(ak => {
    Object.keys(app.store).forEach(k => delete app.store[k]);
    app.consenso(true);
    app.profilo(Object.assign({ level: 'intermedio', age: 30, sex: 'M' }, PROFILI[pk]));
    app.programma(P);
    app.storia([]);
    STORIE[sk](kg, reps).forEach(([g, s]) => registra(app, g, nome, s.map(x => [x[0], x[1], x[2]]), pn === 'v2' ? { reps: reps, base: reps, sets: 3 } : null));
    const a = AGGIUSTI[ak](nome);
    if (a) app.aggiusti(a);
    const r = carico(app, nome, kg, reps, 3);
    if (r.weight > 0) pesati++;
    if (!inGrigliaBase(app, nome, r.weight)) fuori.push([pk, pn, sk, ak, nome, r.weight, r.motivo].join(' | '));
  })))));
  assert.ok(pesati > 3000, 'il campione c e: ' + pesati);
  assert.deepStrictEqual(fuori.slice(0, 12), [], fuori.length + ' carichi fuori griglia');
});

test('ALG-06: la griglia della progressione e quella della partenza (PAR-04): arrotondaAttrezzo e passoAttrezzo coincidono con arrotondaPartenza e passoCarico', () => {
  const app = nuovaApp();
  assert.strictEqual(app.g('typeof arrotondaAttrezzo'), 'function', 'carichi/attrezzi.js caricato');
  const diversi = app.json(`(() => {
    const out = [];
    EXERCISE_LIBRARY.filter(m => Number(m.weight) > 0).forEach(m => {
      for (let x = 0.5; x <= 160; x += 0.7) {
        const a = arrotondaAttrezzo(x, m.name), b = arrotondaPartenza(m, x);
        const ag = arrotondaAttrezzo(x, m.name, { modo: 'giu' }), bg = arrotondaPartenza(m, x, 'giu');
        if (Math.abs(a - b) > 1e-9 || Math.abs(ag - bg) > 1e-9 || Math.abs(passoAttrezzo(m.name, { kg: x }) - passoCarico(m, x)) > 1e-9) out.push(m.name + ' ' + x);
      }
    });
    return out;
  })()`);
  assert.deepStrictEqual(diversi.slice(0, 5), [], diversi.length + ' differenze');
  /* «su»: il primo peso della griglia sopra; mai sotto il minimo (barra, 1 kg) */
  const su = (kg, nome) => app.g('arrotondaAttrezzo(' + kg + ', ' + JSON.stringify(nome) + ', { modo: "su" })');
  assert.deepStrictEqual([su(9.2, CURL), su(10.1, CURL), su(11, CURL), su(60.1, PANCA), su(5, PANCA), su(101, LEG)], [10, 12, 12, 62.5, 20, 102.5]);
  /* la griglia dichiarata nel file delle soglie e quella che il codice applica */
  const g = app.json('SOGLIE_PROGRESSIONE.grigliaBase.v');
  assert.deepStrictEqual([app.g('passoAttrezzo(' + JSON.stringify(CURL) + ', { kg: 8 })'), app.g('passoAttrezzo(' + JSON.stringify(CURL) + ', { kg: 12 })'), app.g('passoAttrezzo(' + JSON.stringify(LEG) + ', { kg: 50 })'),
    app.g('passoAttrezzo(' + JSON.stringify(PANCA) + ', { kg: 50 })')], [g.manubri.passoSotto, g.manubri.passoSopra, g.pila, g.bilanciere.passo]);
});

test('ALG-06: un aumento e almeno un passo dell attrezzo e il motivo dice il salto vero (manubri da 12 kg: +2 kg, non «+1 kg»; prima: 13 kg)', () => {
  const app = nuovaApp({}, PROG_V1);
  STORIE.cima(12, 12).forEach(([g, s]) => registra(app, g, CURL, s));
  const r = carico(app, CURL, 12, 12, 3);
  assert.deepStrictEqual([r.weight, r.reps, r.tipo], [14, 12, 'su'], r.motivo);
  assert.match(r.motivo, /\+2 kg/);
  /* modalita prudente: mezzo incremento (+1,25 kg) non si carica col bilanciere: prima le ripetizioni, poi il passo (prima: 61,5 kg) */
  const pr = nuovaApp({ parq: true }, PROG_V1);
  STORIE.ok(60, 8).forEach(([g, s]) => registra(pr, g, PANCA, s));
  const rp = carico(pr, PANCA, 60, 8, 3);
  assert.deepStrictEqual([rp.weight, rp.reps], [60, 9], rp.motivo);
});

test('ALG-06 spenta: l arrotondamento di prima (0,5 kg)', () => {
  const app = nuovaApp({}, PROG_V1);
  spegnibileNelCatalogo(app, 'ALG-06');
  STORIE.cima(12, 12).forEach(([g, s]) => registra(app, g, CURL, s));
  app.spegni(['ALG-06']);
  assert.strictEqual(carico(app, CURL, 12, 12, 3).weight, 13);
});



/* ============================================================================================================
   CAS-01b · il manubrio piu pesante dichiarato vale anche nella progressione
   ============================================================================================================ */
const CASA = { luogo: 'manubri', manubriKg: 12 };
test('CAS-01b: al manubrio piu pesante si sale con le ripetizioni e il motivo lo dice (prima: 14,5 kg con manubri fino a 12)', () => {
  const app = nuovaApp(CASA, PROG_V1);
  STORIE.okSopra(12, 10).forEach(([g, s]) => registra(app, g, LENTO, s));
  const r = carico(app, LENTO, 12, 10, 3);
  assert.deepStrictEqual([r.weight, r.reps, r.tipo], [12, 13, 'su'], r.motivo);
  assert.match(r.motivo, /manubrio più pesante che hai \(12 kg\)/);
  /* alla cima delle ripetizioni: lo dice, niente carico in piu */
  const cima = nuovaApp(CASA, PROG_V1);
  [[10, 14], [6, 14], [3, 14]].forEach(([g, rr]) => registra(cima, g, LENTO, serie(3, 12, rr)));
  const rc = carico(cima, LENTO, 12, 10, 3);
  assert.deepStrictEqual([rc.weight, rc.reps, rc.tipo], [12, 14, 'fermo'], rc.motivo);
  assert.match(rc.motivo, /serve un manubrio più pesante o una variante più difficile/);
  /* sotto il tetto con un salto che lo supererebbe: fino al tetto */
  const sotto = nuovaApp(CASA, PROG_V1);
  STORIE.okSopra(10, 10).forEach(([g, s]) => registra(sotto, g, GOBLET, s));
  assert.ok(carico(sotto, GOBLET, 10, 10, 3).weight <= 12, 'mai sopra il manubrio piu pesante');
});

test('CAS-01b: anche dopo un aggiusto «extra», nel programma v2, con un tetto dichiarato fuori dai passi (12,5 kg: e un peso vero); non per le macchine; spenta o senza dichiarazione come prima', () => {
  const ex = nuovaApp(CASA, PROG_V2);
  STORIE.ok(10, 10).forEach(([g, s]) => registra(ex, g, LENTO, s, { reps: 10, base: 10, sets: 3 }));
  ex.aggiusti({ scarico: null, esercizi: { [LENTO]: { extra: true, sedute: 1 } } });
  assert.ok(carico(ex, LENTO, 10, 10, 3).weight <= 12, 'extra: mai sopra il tetto');
  const mezzo = nuovaApp({ luogo: 'manubri', manubriKg: 12.5 }, PROG_V1);
  STORIE.okSopra(12.5, 10).forEach(([g, s]) => registra(mezzo, g, LENTO, s));
  const rm = carico(mezzo, LENTO, 12.5, 10, 3);
  assert.deepStrictEqual([rm.weight, rm.reps], [12.5, 13], rm.motivo);
  const macchina = nuovaApp(CASA, PROG_V1);
  STORIE.ok(100, 12).forEach(([g, s]) => registra(macchina, g, LEG, s));
  assert.ok(carico(macchina, LEG, 100, 12, 3).weight > 100, 'le macchine non hanno il tetto dei manubri');
  const spenta = nuovaApp(CASA, PROG_V1);
  STORIE.okSopra(12, 10).forEach(([g, s]) => registra(spenta, g, LENTO, s));
  spenta.spegni(['CAS-01']);
  assert.ok(carico(spenta, LENTO, 12, 10, 3).weight > 12, 'CAS-01 spenta: come prima');
});

/* ============================================================================================================
   Testo dello scarico (MES-05 N10): «ripartire piu forte» non ha base
   ============================================================================================================ */
test('scarico: il testo non promette di «ripartire più forte» (nessuna prova: ricerca-mesocicli §5 riga 20) e dice a cosa serve', () => {
  const app = nuovaApp({}, PROG_V1_SCARICO);
  registra(app, 3, PANCA, serie(3, 60, 8));
  const r = carico(app, PANCA, 60, 8, 3);
  assert.strictEqual(r.tipo, 'scarico');
  assert.ok(!/ripartire/.test(r.motivo), r.motivo);
  assert.match(r.motivo, /serve a smaltire la fatica accumulata/);
});

/* ============================================================================================================
   Contratto c.voce (per P3-C e P4-F): la catena 'carico' riceve la voce del piano dell esercizio
   ============================================================================================================ */
test('c.voce: applicaCaricoProgressivo passa alla catena la voce del piano (bersaglio, onda, alzata...); una chiamata senza voce ha c.voce = null', () => {
  const app = nuovaApp({}, PROG_V2);
  app.g('window.__voci = []; registraFase("carico", 98, "PROVA", (r, c) => { window.__voci.push(c.voce === null ? null : { name: c.voce.name, onda: c.voce.onda, alzata: c.voce.alzata, repsBase: c.voce.repsBase, reps: c.voce.reps }); return r; })');
  app.scrivi(app.chiave('dataKey'), { 'Lunedì': [{ name: PANCA, sets: 3, reps: 5, weight: 60, rest: 120, onda: 'leggero', alzata: 'panca', fisso: true,
    completedSets: Array.from({ length: 3 }, () => ({ done: false, reps: 5, weight: 60, wasBerserk: false })) }] });
  app.chiama('applicaCaricoProgressivo', 'Lunedì');
  const viste = app.json('__voci');
  assert.deepStrictEqual(viste, [{ name: PANCA, onda: 'leggero', alzata: 'panca', repsBase: 5, reps: 5 }]);
  app.g('window.__voci = []');
  carico(app, PANCA, 60, 5, 3);
  assert.deepStrictEqual(app.json('__voci'), [null]);
});

/* ============================================================================================================
   Atleta virtuale: 500 donne e 500 uomini x 6 esposizioni, programmi v1 e v2, meta a casa con i manubri dichiarati
   ============================================================================================================ */
test('atleta virtuale: 0 carichi fuori griglia e 0 sopra il manubrio piu pesante (500 donne e 500 uomini x 6 esposizioni, programmi v1 e v2, meta con i manubri dichiarati); donne senza tetto: mediana <= 3, 95° percentile <= 5', { timeout: 900000 }, () => {
  const app = conBilanciaV2(caricaApp({ ora: ORA }));
  const N = Number(process.env.ATLETI) || 500;
  const TETTI = [8, 10, 12, 12.5, 14, 16, 20];
  const conta = { fuori: [], sopra: [], esposizioni: 0, conTetto: 0 };
  const riassunti = {};
  ['v1', 'v2'].forEach(prog => ['F', 'M'].forEach(sesso => {
    const lista = Array.from({ length: N }, (_, i) => {
      const casa = i % 2 === 0;
      const sim = simulaNellApp(app, { sesso: sesso, livello: 'principiante', pesoCorpo: (sesso === 'F' ? 50 : 60) + (i * 7) % (sesso === 'F' ? 36 : 40), seme: (sesso === 'F' ? 1000 : 2000) + i,
        esposizioni: 6, programma: prog, luogo: casa ? 'manubri' : null, manubriKg: casa ? TETTI[i % TETTI.length] : null });
      sim.nomi.forEach(n => sim.reg[n].esp.forEach((e, t) => {
        conta.esposizioni++;
        if (!inGrigliaBase(app, n, e.w, sim.manubriKg)) conta.fuori.push([prog, sesso, i, n, t, e.w].join(' '));
        if (sim.manubriKg && app.chiama('attrezzoDi', n) === 'manubri') { conta.conTetto++; if (e.w > sim.manubriKg + 1e-9) conta.sopra.push([prog, sesso, i, n, t, e.w, sim.manubriKg].join(' ')); }
      }));
      return sim;
    });
    /* la convergenza (D.8.9) si misura senza il tetto dei manubri: chi ha i manubri fino a 8 kg non arriva al suo carico giusto per scelta sua, non del coach */
    riassunti[prog + sesso] = riassunto(lista.filter(x => !x.manubriKg));
  }));
  Object.keys(riassunti).forEach(k => { const x = riassunti[k]; console.log('# atleta ' + k + ' (' + x.n + ' esercizi): mediana ' + x.mediana + ', p95 ' + x.p95 + ', mai ' + x.pc(x.mai) + '%; dalla seconda sopra RIR-1 ' + x.pc(x.dopoSopra) + '% (oltre il massimo ' + x.pc(x.dopoOltre) + '%)'); });
  console.log('# esposizioni ' + conta.esposizioni + ', con il tetto dei manubri ' + conta.conTetto + '; fuori griglia ' + conta.fuori.length + ', sopra il tetto ' + conta.sopra.length);
  assert.ok(conta.esposizioni >= N * 4 * 6 * 5 && conta.conTetto > N * 2, 'il campione c e');
  assert.deepStrictEqual(conta.fuori.slice(0, 8), [], conta.fuori.length + ' carichi fuori griglia');
  assert.deepStrictEqual(conta.sopra.slice(0, 8), [], conta.sopra.length + ' carichi sopra il manubrio piu pesante');
  ['v1F', 'v2F'].forEach(k => { assert.ok(riassunti[k].mediana <= 3, k + ' mediana ' + riassunti[k].mediana); assert.ok(riassunti[k].p95 <= 5, k + ' p95 ' + riassunti[k].p95); });
});
