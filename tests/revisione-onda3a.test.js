/* Difetti trovati dalla revisione indipendente della sotto-onda 3a (INT-3b): carichi che scendevano a ogni blocco (B1), a ogni seduta con bersagli alternati (M1), il tetto
   dei manubri che non valeva per gli esercizi «corpo» con carico (M2), carichi fuori griglia sotto il minimo dell attrezzo (M3) e la copertura che non li vedeva (m1).
   Ogni prova e stata scritta PRIMA della correzione e fallisce sul codice di 3a (tag coach-v2-onda-3a): i numeri di «prima:» sono quelli letti allora.
   Come lavora: l app VERA in vm (tests/aiuto-app.js) e telefoni con un programma v2 vero (tests/aiuto-atleta-piano.js: l atleta fa tutte le serie come scritte, con l RPE uguale
   al bersaglio, e la voce di storico salva anche obiettivo.base come endWorkout). I semi sono quelli della revisione (rev/storia.js, rev/stallo.js, rev/barra.js). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conBilanciaV2, inGrigliaBase } = require('./aiuto-atleta');
const H = require('./aiuto-atleta-piano');

const ORA = '2026-10-05T10:00:00';                 /* lunedi: con il programma sotto e la settimana 2 (RIR [1,2] per gli intermedi) */
const PANCA = '💪 Panca Piana Bilanciere';
const LEGCURL = '🦵 Leg Curl Seduto';              /* macchina, isolamento, 15 ripetizioni */
const ALZATE_CAVI = '🛡️ Alzate Laterali ai Cavi';   /* cavi: la pila va a passi di 2,5 kg */
const BULGARI = '🍑 Affondi Bulgari';              /* «corpo» con carico: manubri in mano */
const FASI = ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico'];
const PROG_V2 = { creato: '2026-09-28', inizio: '2026-09-28', settimane: 12, blocco: 6, fasi: FASI, goals: ['massa'], versione: 2 };

function nuovaApp(profilo, prog) {
  const app = caricaApp({ ora: ORA });
  conBilanciaV2(app);
  app.profilo(Object.assign({ level: 'intermedio', age: 30, sex: 'M' }, profilo));
  if (prog) app.programma(prog);
  return app;
}
function registra(app, giorniFa, nome, serie, obiettivo) {
  const h = app.seduta(giorniFa, [{ nome: nome, serie: serie.map(s => [s[0], s[1], true, s[2] || null]) }]);
  if (obiettivo) h.sessione[0].obiettivo = obiettivo;
  app.storia((app.leggi(app.chiave('historyKey')) || []).concat([h]).sort((a, b) => b.id - a.id));
  return h;
}
const serie = (n, kg, reps, rpe) => Array.from({ length: n }, () => [kg, reps, rpe || null]);
const carico = (app, nome, base, reps, sets) => app.dati(app.chiama('caricoProssimo', nome, base, reps, sets));

/* 12 settimane vissute da un atleta che fa tutto come prescritto: { [nome]: [{ n, g, w, reps, base, fase, tipo, nota }] } nell ordine delle sedute */
function storia(opz, settimane, rpe) {
  const { a } = H.telefono(opz);
  const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), tab = {};
  for (let n = 1; n <= settimane; n++) giorni.forEach(g => {
    H.vaiA(a, n, nomi.indexOf(g));
    const fase = (a.json('settimanaProgramma()') || {}).fase;
    H.vivi(a, g, { rpe: rpe }).voci.forEach(e => (tab[e.name] = tab[e.name] || []).push({ n: n, g: g, w: e.weight, reps: e.reps, base: e.repsBase, fase: fase, tipo: e.coachTipo, nota: e.coachNote }));
  });
  return { a: a, tab: tab };
}
/* dove un carico scende senza che ci sia uno scarico di mezzo: per ogni esercizio e ogni bersaglio di ripetizioni (base) le sedute di carico una dopo l altra; la prima dopo
   uno scarico puo ripartire poco sotto (MES-06: -5% in prudenza), non oltre */
function cali(tab) {
  const out = [];
  Object.keys(tab).forEach(nome => {
    const perBase = {};
    tab[nome].forEach(s => (perBase[s.base] = perBase[s.base] || []).push(s));
    Object.keys(perBase).forEach(b => {
      let prec = null, dopoScarico = false;
      perBase[b].forEach(s => {
        if (s.fase === 'scarico') { dopoScarico = true; return; }
        if (!(s.w > 0)) { prec = null; dopoScarico = false; return; }
        const tolleranza = dopoScarico ? 0.9 : 1;
        if (prec && s.w < prec.w * tolleranza - 1e-9) out.push(nome + ' (bersaglio ' + b + ') s' + s.n + ' ' + s.g.slice(0, 3) + ': ' + prec.w + ' -> ' + s.w + ' kg [' + (s.nota || '').slice(0, 90) + ']');
        prec = s; dopoScarico = false;
      });
    });
  });
  return out;
}

/* ============================================================================================================
   B1 · ALG-05 sopra le 12 ripetizioni non toglie il 10% quando cambiano solo le ripetizioni in riserva
   ============================================================================================================ */
test('B1: 15 ripetizioni, il RIR passa da [4,5] a [1,2] (settimana 2 del blocco): il carico non scende (prima: 30 -> 25 kg, -17% dopo la griglia, quando doveva salire)', () => {
  const app = nuovaApp({}, PROG_V2);
  assert.deepStrictEqual(app.json('rirBersaglio(' + JSON.stringify(LEGCURL) + ')'), [1, 2], 'oggi il RIR e [1,2]');
  [10, 6, 3].forEach(g => registra(app, g, LEGCURL, serie(3, 30, 15, 5.5), { reps: 15, base: 15, sets: 3, rir: [4, 5] }));
  const r = carico(app, LEGCURL, 30, 15, 3);
  assert.ok(r.weight >= 30, 'ora ' + r.weight + ' kg · ' + r.motivo);
  assert.doesNotMatch(r.motivo, /ricalcolato dal massimale/);
});

test('B1: 15 ripetizioni con il RIR identico a prima: nessun ricalcolo; un vero cambio di bersaglio oltre le 12 ripetizioni (8 -> 15) si converte come prima, almeno -10%', () => {
  const app = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, LEGCURL, serie(3, 30, 8, 8), { reps: 8, base: 8, sets: 3, rir: [1, 2] }));
  const r = carico(app, LEGCURL, 30, 15, 3);
  assert.ok(r.weight <= 27 && /Passi da 8 a 15 ripetizioni/.test(r.motivo), 'piu ripetizioni = meno carico: ' + r.weight + ' kg · ' + r.motivo);
});

test('B1: sotto le 12 ripetizioni il RIR che scende da [4,5] a [1,2] porta ancora un aumento da ALG-05 (al massimo +10%)', () => {
  const app = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, PANCA, serie(3, 60, 8, 5.5), { reps: 8, base: 8, sets: 3, rir: [4, 5] }));
  const r = carico(app, PANCA, 60, 8, 3);
  assert.ok(r.weight > 60 && r.weight <= 66, r.weight + ' kg · ' + r.motivo);
});

test('B1, storia di 12 settimane (uomo, intermedio, 4 giorni, RPE sul bersaglio): nessun carico scende senza uno scarico di mezzo (prima: Leg Curl 27,5 -> 17,5, Calf Raise 30 -> 20, Abductor 25 -> 15)', { timeout: 120000 }, () => {
  const { tab } = storia({ d: { level: 'intermedio', days: 4, minutes: 60, goals: ['massa'], sex: 'M', age: 30, seme: 'uomo1' } }, 12, 'bersaglio');
  assert.ok(Object.keys(tab).length >= 25, 'il programma ha piu di 25 esercizi');
  assert.deepStrictEqual(cali(tab), []);
  const lc = tab[LEGCURL].filter(s => s.fase !== 'scarico');
  assert.ok(lc[lc.length - 1].w >= lc[0].w, 'il Leg Curl a fine corsa non e sotto la partenza: ' + lc.map(s => s.w).join(' '));
});

/* ============================================================================================================
   M2 · il manubrio piu pesante dichiarato vale anche per gli esercizi «corpo» con carico (Affondi Bulgari, Inversi, Step-up, Russian Twist, Kettlebell Swing...)
   ============================================================================================================ */
const CASA20 = { luogo: 'manubri', manubriKg: 20 };
test('M2: Affondi Bulgari (corpo con carico) con manubri fino a 20 kg: non si propone mai oltre (prima: 26 kg dopo tre sedute a 20 kg con 10 ripetizioni, bersaglio 8)', () => {
  const app = nuovaApp(CASA20, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, BULGARI, serie(3, 20, 10), { reps: 10, base: 8, sets: 3 }));
  const r = carico(app, BULGARI, 20, 8, 3);
  assert.ok(r.weight <= 20, r.weight + ' kg · ' + r.motivo);
  assert.match(r.motivo, /manubrio più pesante che hai \(20 kg\)/);
  /* sotto il tetto con un salto che lo supererebbe: fino al tetto, come per i manubri */
  const sotto = nuovaApp(CASA20, PROG_V2);
  [10, 6, 3].forEach(g => registra(sotto, g, BULGARI, serie(3, 18, 10), { reps: 10, base: 8, sets: 3 }));
  assert.strictEqual(carico(sotto, BULGARI, 18, 8, 3).weight, 20, 'da 18 kg il salto (+6) supererebbe il tetto: si sale fino al tetto');
  /* senza dichiarazione (palestra) o con CAS-01 spenta: come prima */
  const palestra = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(palestra, g, BULGARI, serie(3, 20, 10), { reps: 10, base: 8, sets: 3 }));
  assert.ok(carico(palestra, BULGARI, 20, 8, 3).weight > 20, 'nessuna dichiarazione: nessun tetto');
});

test('M2, storia di 12 settimane a casa con manubri fino a 20 kg (seme casa1): nessun esercizio con i manubri o «corpo» sopra 20 kg (prima: Affondi Bulgari a 24 kg alla settimana 11)', { timeout: 120000 }, () => {
  const { tab, a } = storia({ d: { level: 'intermedio', days: 3, minutes: 45, goals: ['massa'], sex: 'M', luogo: 'manubri', manubriKg: 20, seme: 'casa1' }, profilo: CASA20 }, 12, 'bersaglio');
  const sopra = [];
  Object.keys(tab).forEach(nome => { const att = a.chiama('attrezzoDi', nome); if (att === 'manubri' || att === 'corpo') tab[nome].forEach(s => { if (s.w > 20 + 1e-9) sopra.push(nome + ' s' + s.n + ' ' + s.w); }); });
  assert.deepStrictEqual(sopra, []);
  assert.ok(Object.keys(tab).some(n => a.chiama('attrezzoDi', n) === 'corpo' && tab[n].some(s => s.w > 0)), 'il programma ha un esercizio «corpo» con carico');
});

/* ============================================================================================================
   M3 · sotto il minimo dell attrezzo ALG-05 non da carichi fuori griglia e la nota della barra e solo del bilanciere
   ============================================================================================================ */
test('M3: Panca 22,5 kg x 6 portata a 12 ripetizioni: la barra vuota (20 kg), non 19 kg di bilanciere, e niente consiglio sui manubri (prima: 19 kg con «il bilanciere vuoto pesa 20 kg: ... con i manubri»)', () => {
  const app = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, PANCA, serie(3, 22.5, 6), { reps: 6, base: 6, sets: 3, rir: [2, 3] }));
  const r = carico(app, PANCA, 22.5, 12, 3);
  assert.strictEqual(r.weight, 20, r.weight + ' kg · ' + r.motivo);
  assert.ok(inGrigliaBase(app, PANCA, r.weight));
  assert.doesNotMatch(r.motivo, /bilanciere vuoto/, 'a 20 kg il bilanciere e la barra: nessun consiglio');
});

test('M3: Alzate Laterali ai Cavi da 2,5 kg portate a 15 ripetizioni: la pila minima (2,5 kg), non 2 kg (prima: 2 · 1,5 · 1 · 0,5 kg)', () => {
  const app = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, ALZATE_CAVI, serie(3, 2.5, 8), { reps: 8, base: 8, sets: 3, rir: [1, 2] }));
  const r = carico(app, ALZATE_CAVI, 2.5, 15, 3);
  assert.strictEqual(r.weight, 2.5, r.weight + ' kg · ' + r.motivo);
  assert.ok(inGrigliaBase(app, ALZATE_CAVI, r.weight));
});

test('M3: la nota «il bilanciere vuoto pesa 20 kg» compare solo per il bilanciere, non per i cavi o le macchine sotto il loro minimo (prima: anche sui cavi a 0,5 kg)', () => {
  const app = nuovaApp({}, PROG_V2);
  const cavi = carico(app, ALZATE_CAVI, 0.5, 15, 3);
  assert.doesNotMatch(cavi.motivo, /bilanciere/, cavi.weight + ' kg · ' + cavi.motivo);
  assert.ok(cavi.weight <= 0.5 + 1e-9, 'la fase 95 non alza il carico');
  const barra = carico(app, PANCA, 13, 8, 3);
  assert.match(barra.motivo, /Il bilanciere vuoto pesa 20 kg/, 'per il bilanciere la nota resta: ' + barra.motivo);
});

/* ============================================================================================================
   M1 · lo stesso esercizio con ripetizioni diverse nella settimana: il carico non scende a ogni seduta
   ============================================================================================================ */
const SEMI_M1 = [
  ['intermedia, 4 giorni, 60 minuti, forza (xintermedio460forzaF)', { level: 'intermedio', days: 4, minutes: 60, goals: ['forza'], sex: 'F', age: 30, seme: 'xintermedio460forzaF' }],
  ['intermedio, 3 giorni, 90 minuti, massa (xintermedio390massaM)', { level: 'intermedio', days: 3, minutes: 90, goals: ['massa'], sex: 'M', age: 30, seme: 'xintermedio390massaM' }]
];
SEMI_M1.forEach(([nome, d]) => [null, 'bersaglio'].forEach(rpe => {
  test('M1: ' + nome + ', 11 settimane con tutte le serie complete' + (rpe ? ' e RPE sul bersaglio' : ' senza RPE') + ': per ogni bersaglio di ripetizioni il carico non scende senza uno scarico di mezzo', { timeout: 120000 }, () => {
    const { tab } = storia({ d: d }, 11, rpe);
    const alterni = Object.keys(tab).filter(n => new Set(tab[n].map(s => s.base)).size > 1);
    assert.ok(alterni.length >= 1, 'il programma ha un esercizio con ripetizioni diverse nella settimana: ' + alterni.join(', '));
    assert.deepStrictEqual(cali(tab), []);
  });
}));

test('M1: martedi 6 ripetizioni a 10 kg e venerdi 10 ripetizioni a 8 kg, tutto completo: il martedi dopo non scende sotto i 10 kg (prima: 8 kg, il tetto del +10% sul carico del venerdi)', () => {
  const app = nuovaApp({}, PROG_V2);
  /* oggi lunedi 5 ottobre (settimana 2): il martedi e di 6 giorni fa, il venerdi di 3 */
  registra(app, 13, BULGARI, serie(2, 10, 6), { reps: 6, base: 6, sets: 2, rir: [1, 3] });
  registra(app, 10, BULGARI, serie(2, 8, 10), { reps: 10, base: 10, sets: 2, rir: [1, 3] });
  registra(app, 6, BULGARI, serie(2, 10, 6), { reps: 6, base: 6, sets: 2, rir: [1, 3] });
  registra(app, 3, BULGARI, serie(2, 8, 10), { reps: 10, base: 10, sets: 2, rir: [1, 3] });
  const r = carico(app, BULGARI, 10, 6, 2);
  assert.ok(r.weight >= 10, r.weight + ' kg · ' + r.motivo);
  assert.doesNotMatch(r.motivo, /Passi da 10 a 6/, 'nessuna conversione: c e una seduta recente con lo stesso bersaglio');
  const v = carico(app, BULGARI, 8, 10, 2);
  assert.ok(v.weight >= 8 && v.weight < 10, 'il giorno da 10 ripetizioni resta sul suo carico (' + v.weight + ' kg): ' + v.motivo);
  /* senza una seduta con lo stesso bersaglio (cambio di blocco) la conversione resta quella di prima */
  const nuovo = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(nuovo, g, BULGARI, serie(2, 10, 6), { reps: 6, base: 6, sets: 2, rir: [1, 3] }));
  assert.match(carico(nuovo, BULGARI, 10, 10, 2).motivo, /Passi da 6 a 10 ripetizioni/);
});

/* ============================================================================================================
   m1 · copertura: TUTTI gli esercizi con carico del programma, non solo i 6 di CONTROLLO dell atleta virtuale (tests/aiuto-atleta.js): 0 carichi fuori griglia e 0 sopra il
   manubrio piu pesante dichiarato, in 12 settimane di programmi v2 veri (livelli, giorni, luoghi, obiettivi e sessi diversi) vissuti con tutte le serie complete
   ============================================================================================================ */
const PROGRAMMI_COPERTURA = [
  ['uomo intermedio 4 giorni palestra', { d: { level: 'intermedio', days: 4, minutes: 60, goals: ['massa'], sex: 'M', age: 30, seme: 'uomo1' } }],
  ['donna intermedia 4 giorni forza', { d: { level: 'intermedio', days: 4, minutes: 60, goals: ['forza'], sex: 'F', age: 30, seme: 'xintermedio460forzaF' } }],
  ['uomo intermedio 3 giorni 90 minuti', { d: { level: 'intermedio', days: 3, minutes: 90, goals: ['massa'], sex: 'M', age: 30, seme: 'xintermedio390massaM' } }],
  ['uomo intermedio a casa, manubri fino a 20 kg', { d: { level: 'intermedio', days: 3, minutes: 45, goals: ['massa'], sex: 'M', luogo: 'manubri', manubriKg: 20, seme: 'casa1' }, profilo: CASA20, tetto: 20 }],
  ['donna principiante a casa, manubri fino a 8 kg', { d: { level: 'principiante', days: 3, minutes: 45, goals: ['massa'], sex: 'F', luogo: 'manubri', manubriKg: 8, seme: 'casa2' }, profilo: { luogo: 'manubri', manubriKg: 8 }, tetto: 8 }],
  ['donna principiante 3 giorni palestra', { d: { level: 'principiante', days: 3, minutes: 60, goals: ['tonificare'], sex: 'F', age: 35, seme: 'pr1' } }],
  ['uomo avanzato 5 giorni', { d: { level: 'avanzato', days: 5, minutes: 75, goals: ['massa'], sex: 'M', age: 28, seme: 'av1' } }],
  ['donna avanzata 4 giorni forza', { d: { level: 'avanzato', days: 4, minutes: 60, goals: ['forza'], sex: 'F', age: 32, seme: 'av2' } }]
];
test('m1: 8 programmi x 12 settimane x tutti gli esercizi con carico: 0 carichi fuori griglia, 0 sopra il manubrio piu pesante dichiarato', { timeout: 600000 }, () => {
  const fuori = [], sopra = [];
  let esposizioni = 0;
  PROGRAMMI_COPERTURA.forEach(([nome, opz]) => [null, 'bersaglio'].forEach(rpe => {
    const { a, tab } = storia(opz, 12, rpe);
    Object.keys(tab).forEach(n => tab[n].forEach(s => {
      if (!(s.w > 0)) return;
      esposizioni++;
      if (!inGrigliaBase(a, n, s.w, opz.tetto)) fuori.push(nome + ' / ' + (rpe ? 'RPE bersaglio' : 'senza RPE') + ' / ' + n + ' s' + s.n + ': ' + s.w + ' kg [' + (s.nota || '').slice(0, 80) + ']');
      const att = a.chiama('attrezzoDi', n);
      if (opz.tetto && (att === 'manubri' || att === 'corpo') && s.w > opz.tetto + 1e-9) sopra.push(nome + ' / ' + n + ' s' + s.n + ': ' + s.w + ' kg contro ' + opz.tetto);
    }));
  }));
  console.log('# copertura m1: ' + esposizioni + ' esposizioni con carico, fuori griglia ' + fuori.length + ', sopra il manubrio dichiarato ' + sopra.length);
  assert.ok(esposizioni > 3000, 'il campione c e: ' + esposizioni);
  assert.deepStrictEqual(sopra, []);
  assert.deepStrictEqual(fuori.slice(0, 12), []);
});

/* ============================================================================================================
   m4 · il RIR a intervallo nullo e un solo numero: «lascia 0 ripetizioni in riserva», «lascia 3 ripetizioni in riserva» (prima: «lascia 0–0», «3–3»)
   ============================================================================================================ */
test('m4: testoRir con riserva uguale agli estremi dice un numero solo; l intervallo vero resta come prima', () => {
  const app = nuovaApp({}, PROG_V2);
  const dice = (rir) => { app.g('rirBersaglio = (nome) => ' + JSON.stringify(rir)); return app.g('testoRir("x")'); };
  assert.strictEqual(dice([0, 0]), 'lascia 0 ripetizioni in riserva');
  assert.strictEqual(dice([3, 3]), 'lascia 3 ripetizioni in riserva');
  assert.strictEqual(dice([1, 1]), 'lascia 1 ripetizione in riserva');
  assert.strictEqual(dice([1, 2]), 'lascia 1–2 ripetizioni in riserva');
  assert.strictEqual(dice([0, 1]), 'fino a 0–1 ripetizioni in riserva');
});
test('m4 in scarico: nelle sedute di scarico di una storia vera nessuna frase dice «3–3» o «0–0» e le tre lingue traducono le due frasi nuove', { timeout: 60000 }, () => {
  const { tab } = storia({ d: { level: 'intermedio', days: 4, minutes: 60, goals: ['massa'], sex: 'M', age: 30, seme: 'uomo1' } }, 6, 'bersaglio');
  const note = [];
  Object.keys(tab).forEach(n => tab[n].forEach(s => { if (s.fase === 'scarico') note.push(s.nota || ''); }));
  assert.ok(note.length >= 20 && note.some(t => /lascia 3 ripetizioni in riserva/.test(t)), 'lo scarico lascia 3 ripetizioni: ' + note.slice(0, 2).join(' | '));
  assert.deepStrictEqual(note.filter(t => /(\d)–\1 ripetizioni/.test(t)), []);
  ['en', 'es', 'de'].forEach(l => ['lascia # ripetizioni in riserva', 'lascia # ripetizione in riserva'].forEach(k => {
    assert.ok(new RegExp('^"' + k + '":', 'm').test(require('fs').readFileSync(require('path').join(__dirname, '..', 'js', 'lingue', l + '.js'), 'utf8')), l + ': manca «' + k + '»');
  }));
});

/* ============================================================================================================
   m2 · a parita di distanza la griglia arrotonda per difetto in un aumento (manubri 12 + 5 = 17: 16, non 18: +33% e non +50%)
   ============================================================================================================ */
test('m2: caricoSalito a meta tra due pesi della griglia sceglie quello sotto, ma sale sempre di almeno un passo', () => {
  const app = nuovaApp({}, PROG_V2);
  const su = (da, inc, nome) => app.chiama('caricoSalito', da, inc, nome);
  const STACCO = '🍑 Stacco Rumeno con Manubri';
  assert.strictEqual(su(12, 5, STACCO), 16, 'manubri 12 + 5 = 17: a meta tra 16 e 18 (prima: 18, +50%)');
  assert.strictEqual(su(14, 5, STACCO), 18, '19: a meta tra 18 e 20 (prima: 20)');
  assert.strictEqual(su(5, 2.5, STACCO), 7, 'sotto i 10 kg: 7,5 a meta tra 7 e 8 (prima: 8)');
  assert.strictEqual(su(10, 1, STACCO), 12, '11 sarebbe a meta tra 10 e 12, ma 10 non e un aumento: il primo peso sopra');
  assert.strictEqual(su(12, 4, STACCO), 16, 'non a meta: come prima');
  assert.strictEqual(su(60, 2.5, PANCA), 62.5, 'bilanciere: come prima');
  assert.strictEqual(su(60, 1.25, PANCA), 62.5, 'bilanciere, mezzo incremento: sale di un passo come prima');
  assert.strictEqual(su(100, 5, '🦵 Leg Press'), 105, 'macchina: come prima');
});

/* ============================================================================================================
   N1 (ricontrollo di INT-3b) · la doppia progressione arriva all aumento di peso: ALG-05 che scatta solo per il RIR e lascia il peso com e non azzera la ripetizione guadagnata
   ============================================================================================================ */
/* le coppie esercizio-bersaglio seguite per 9+ settimane (almeno 6 sedute di carico) che non salgono mai di peso, tolto il tetto del manubrio dichiarato */
function nonSalgono(tab, a, tetto) {
  const out = [];
  Object.keys(tab).forEach(nome => {
    const perBase = {};
    tab[nome].filter(s => s.fase === 'carico' && s.tipo !== 'scarico' && s.w > 0).forEach(s => (perBase[s.base] = perBase[s.base] || []).push(s));
    Object.keys(perBase).forEach(b => {
      const L = perBase[b];
      if (L.length < 6 || L[L.length - 1].n - L[0].n < 8) return;
      if (Math.max.apply(null, L.map(s => s.w)) > L[0].w + 1e-9) return;
      const att = a.chiama('attrezzoDi', nome);
      if (tetto > 0 && (att === 'manubri' || att === 'corpo') && L.some(s => Math.abs(s.w - tetto) < 1e-9 || /manubrio più pesante/.test(s.nota || ''))) return;
      out.push(nome + ' (bersaglio ' + b + '): ' + L.map(s => 's' + s.n + ':' + s.w + 'x' + s.reps).join(' '));
    });
  });
  return out;
}
test('N1: Leg Curl 27,5 kg x 12 in tre sedute senza RPE, alla settimana 2 il RIR passa da [4,5] a [1,2]: il peso resta e la ripetizione guadagnata resta (prima: 12 ripetizioni, azzerata)', () => {
  const app = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(app, g, LEGCURL, serie(3, 27.5, 12), { reps: 12, base: 12, sets: 3, rir: [4, 5] }));
  const r = carico(app, LEGCURL, 27.5, 12, 3);
  assert.strictEqual(r.weight, 27.5, r.weight + ' kg · ' + r.motivo);
  assert.strictEqual(r.reps, 13, 'una ripetizione in piu (doppia progressione): ' + r.reps + ' · ' + r.motivo);
  assert.doesNotMatch(r.motivo, /ricalcolato dal massimale/);
});
test('N1: se il ricalcolo da lo stesso peso la proposta resta quella della progressione (Panca 60 kg x 8 senza RPE: +2,5 kg, non un «ricalcolato» fermo a 60); se da un peso diverso decide ALG-05', () => {
  const senza = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(senza, g, PANCA, serie(3, 60, 8), { reps: 8, base: 8, sets: 3, rir: [4, 5] }));
  const r = carico(senza, PANCA, 60, 8, 3);
  assert.doesNotMatch(r.motivo, /ricalcolato dal massimale/, r.weight + ' kg · ' + r.motivo);
  assert.strictEqual(r.weight, 62.5, r.motivo);
  const conRpe = nuovaApp({}, PROG_V2);
  [10, 6, 3].forEach(g => registra(conRpe, g, PANCA, serie(3, 60, 8, 5.5), { reps: 8, base: 8, sets: 3, rir: [4, 5] }));
  const rr = carico(conRpe, PANCA, 60, 8, 3);
  assert.ok(rr.weight > 60 && /ricalcolato dal massimale/.test(rr.motivo), rr.weight + ' kg · ' + rr.motivo);
});
[['intermedio, 2 giorni, 45 minuti, tonificare (scintermedio245tonificareM)', { level: 'intermedio', days: 2, minutes: 45, goals: ['tonificare'], sex: 'M', age: 30, seme: 'scintermedio245tonificareM' }],
 ['intermedio, 4 giorni, 60 minuti, massa (uomo1)', { level: 'intermedio', days: 4, minutes: 60, goals: ['massa'], sex: 'M', age: 30, seme: 'uomo1' }]].forEach(([nome, d]) => [null, 'bersaglio'].forEach(rpe => {
  test('N1, storia di 12 settimane (' + nome + (rpe ? ', RPE sul bersaglio' : ', senza RPE') + '): ogni esercizio seguito per 9 settimane o piu sale di peso almeno una volta (prima: Leg Curl 27,5 kg x 12 · 12 · 13 · 14 · 15, scarico, di nuovo 12 · 12 · 13...)', { timeout: 120000 }, () => {
    const { a, tab } = storia({ d: d }, 12, rpe);
    assert.deepStrictEqual(nonSalgono(tab, a, 0), []);
  });
}));

/* ============================================================================================================
   Collegato a N1 · CAR-16 e AUT-01 confrontano l RPE di una seduta con il bersaglio di quella seduta, non con quello di oggi
   ============================================================================================================ */
const REMATORE = '🏹 Rematore con Petto Appoggiato';
test('RPE: chi ha rispettato il RIR [4,5] della settimana 1 (RPE 5,5) non e «facile» contro il RIR [1,2] della settimana 2: niente +20% (prima: Rematore 20 -> 24 kg, «Serie facili (RPE 5,5, bersaglio 8,5)»)', () => {
  const app = nuovaApp({}, PROG_V2);
  registra(app, 7, REMATORE, serie(3, 20, 8, 5.5), { reps: 8, base: 8, sets: 3, rir: [4, 5] });
  const r = carico(app, REMATORE, 20, 8, 3);
  assert.ok(r.weight <= 22.5, r.weight + ' kg · ' + r.motivo);
  assert.doesNotMatch(r.motivo, /Serie facili/);
});
test('RPE: una seduta davvero piu facile del SUO bersaglio (RPE 4 contro 5,5) vale ancora «serie facili», e il motivo dice il bersaglio di quella seduta', () => {
  const app = nuovaApp({}, PROG_V2);
  registra(app, 7, REMATORE, serie(3, 20, 8, 4), { reps: 8, base: 8, sets: 3, rir: [4, 5] });
  const r = carico(app, REMATORE, 20, 8, 3);
  assert.match(r.motivo, /Serie facili \(RPE 4, bersaglio 5,5\)/, r.motivo);
  assert.ok(r.weight > 20);
});
test('RPE: senza obiettivo.rir salvato (sedute di prima) e nei programmi v1 il confronto e quello di prima, con il bersaglio di oggi', () => {
  const vecchia = nuovaApp({}, PROG_V2);
  vecchia.spegni(['CST-01']);   /* P4-S: l unica seduta e di 7 giorni fa, che con CST-01 non fa avanzare la rampa (si rifa la settimana 1): qui si prova il confronto dell RPE, non la pausa */
  registra(vecchia, 7, REMATORE, serie(3, 20, 8, 5.5), { reps: 8, base: 8, sets: 3 });
  assert.match(carico(vecchia, REMATORE, 20, 8, 3).motivo, /Serie facili \(RPE 5,5, bersaglio 8,5\)/);
  const v1 = nuovaApp({}, Object.assign({}, PROG_V2, { versione: undefined }));
  registra(v1, 7, REMATORE, serie(3, 20, 8, 5.5), { reps: 8, base: 8, sets: 3, rir: [4, 5] });
  assert.match(carico(v1, REMATORE, 20, 8, 3).motivo, /Serie facili \(RPE 5,5, bersaglio 8,5\)/);
});
