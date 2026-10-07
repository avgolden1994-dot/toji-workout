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
