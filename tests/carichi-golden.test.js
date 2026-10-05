/* Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2)
   Registrato PRIMA di togliere i wrapper, sul codice di allora (caricoProssimo avvolto da dolore-mattina.js, regole-nuove.js e
   intensita.js; applicaCaricoProgressivo e applicaProntezza avvolte da regole-nuove.js; imparaDallaSeduta avvolta da intensita.js),
   e confrontato dopo: la conversione in fasi registrate non cambia nessun numero e nessuna frase.

   500 casi, ognuno e uno scenario completo dell'app vera (tests/aiuto-app.js, orologio fisso lunedi 5 ottobre 2026):
     livello x settimana del programma x storico dell'esercizio x aggiusti del questionario x prontezza x regole RIC/INT accese e spente
     x sforzo medio delle ultime sedute (sRPE, scelta dello scarico) x come finisce la seduta.
   Su ogni caso si registrano i risultati di
     1. caricoProssimo su cinque esercizi (bilanciere pesante, macchina, isolamento, corpo libero, a tempo): peso, ripetizioni, serie, tipo,
        pausa in piu, stallo e il MOTIVO (le frasi che l'utente legge);
     2. applicaCaricoProgressivo sul piano del lunedi: numero di esercizi cambiati e piano dopo (carichi, serie, note del coach, tecniche);
     3. applicaProntezza con le risposte del caso: punteggio, piano dopo, messaggio e annulla, riscritture dello schermo, chiavi salvate
        e lo stato dopo l'annulla;
     4. imparaDallaSeduta su una seduta finita come dice il caso: aggiusti dopo (stalli, taratura del RIR, scarico), esigenza e
        calibrazione del profilo (INT-05), messaggi.
   I casi sono scelti una volta (`--ricampiona`) tra 6000 combinazioni a caso, dando la precedenza a quelli che producono frasi e rami
   nuovi: il test rilegge i casi dal JSON (la specifica e scritta per nome in ogni caso) e controlla che ogni valore di ogni dimensione
   compaia davvero.

   Uso:   node --test tests/carichi-golden.test.js            (confronto, fa parte di npm test)
          node tests/carichi-golden.test.js --registra        (riscrive le uscite dei casi gia scelti: SOLO se un task cambia
                                                              apposta il comportamento dei carichi e lo dichiara)
          node tests/carichi-golden.test.js --ricampiona      (sceglie di nuovo i casi e riscrive tutto: ~3 minuti) */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const { caricaApp } = require('./aiuto-app');

const FILE_GOLDEN = path.join(__dirname, 'dati', 'carichi-golden.json');
const ORA = '2026-10-05T10:00:00';          /* lunedi */
const GIORNO = 'Lunedì';
const N_CASI = 500, SEME_POOL = 20261005;
const N_POOL = Number(process.env.GOLDEN_POOL) || 6000;   /* solo per provare lo strumento con un campione piccolo */

/* ============================================================================================================
   Le dimensioni dei casi
   ============================================================================================================ */
/* cinque esercizi: pesante col bilanciere, macchina, isolamento, corpo libero, a tempo; ognuno con la sua tecnica nel piano (RIC-04) */
const ES = [
  { nome: '💪 Panca Piana Bilanciere', kg: 60, reps: 8, sets: 4, rest: 120, tecnica: 'backoff' },
  { nome: '🦵 Leg Press', kg: 100, reps: 12, sets: 3, rest: 90, tecnica: 'drop', stimato: 'peso' },
  { nome: '🦾 Curl su Panca Inclinata', kg: 12, reps: 12, sets: 3, rest: 60, tecnica: 'parziali' },
  { nome: '💪 Piegamenti a Terra (Push-up)', kg: 0, reps: 15, sets: 3, rest: 60, tecnica: 'amrap' },
  { nome: '🎯 Plank', kg: 0, reps: 45, sets: 3, rest: 45, tecnica: '' }
];
const ALTRO = '🦵 Squat con Bilanciere';     /* un esercizio che non e tra i cinque: storico di chi si e allenato ma non con questi */
const meta = x => Math.round(x * 2) / 2;

const PROFILI = {
  principiante: { level: 'principiante', age: 30, sex: 'M', priorita: ['petto'] },
  principianteForza: { level: 'principiante', age: 24, sex: 'F', goals: ['forza'], priorita: ['petto'] },
  intermedio: { level: 'intermedio', age: 30, sex: 'M', priorita: ['petto'] },
  avanzato: { level: 'avanzato', age: 35, sex: 'F', priorita: ['petto', 'schiena'] },
  over65: { level: 'intermedio', age: 68, sex: 'M', priorita: ['petto'] },
  parq: { level: 'intermedio', age: 30, sex: 'M', priorita: ['petto'], parq: true },
  sonnoMale: { level: 'intermedio', age: 30, sex: 'F', priorita: ['petto'], prefs: { sonno: 'male' } },
  minorenne: { level: 'intermedio', age: 16, sex: 'M', priorita: ['petto'] }
};
/* settimana del programma (12 settimane, blocchi di 4: carico, carico, carico, scarico), oggi e lunedi 5 ottobre */
const FASI = ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'];
const INIZI = { S1: '2026-10-05', S2: '2026-09-28', S3: '2026-09-21', S4: '2026-09-14', S5: '2026-09-07', finito: '2026-06-01' };
function programma(nome, livello) {
  if (nome === 'nessuno') return null;
  const forza = livello === 'principianteForza';
  return { creato: '24/08/2026 ore 11:00', inizio: INIZI[nome], settimane: 12, blocco: 4, fasi: FASI, goals: [forza ? 'forza' : 'massa'],
           rirSett: livello === 'avanzato' ? FASI.map((f, i) => f === 'scarico' ? 4 : [3, 2, 0][i % 4]) : null };
}

/* serie [peso, ripetizioni, fatta, rpe] */
const rep = (n, kg, reps, rpe) => Array.from({ length: n }, () => [kg, reps, true, rpe || null]);
const ok = rpe => es => rep(es.sets, es.kg, es.reps, rpe);
const mancato = es => rep(es.sets, es.kg, es.reps).map((s, i) => i === 0 ? s : [s[0], es.reps - (i === es.sets - 1 ? 2 : 1), true, null]);
const soloUltima = es => rep(es.sets, es.kg, es.reps).map((s, i) => i === es.sets - 1 ? [s[0], es.reps - 2, true, null] : s);
const incompleta = es => rep(es.sets, es.kg, es.reps, 8).map((s, i) => [s[0], s[1], i % 2 === 0, s[3]]);
const moltoSotto = es => rep(es.sets, es.kg, es.reps - 4).map((s, i) => [s[0], s[1], i < Math.ceil(es.sets * 0.4), null]);
const scarico = es => rep(Math.max(2, Math.round(es.sets * 0.5)), meta(es.kg * 0.9), es.reps);
const scaricoMancato = es => scarico(es).map((s, i) => i === 0 ? s : [s[0], es.reps - 3, true, null]);
const cala = f => es => rep(es.sets, meta(es.kg * f), es.reps);
/* una seduta dello storico: dd giorni fa; sc = e una seduta di scarico (la voce porta settimana e obiettivo come dall'onda 0) */
const STORIE = {
  nessuna: () => [],
  ok1: () => [{ dd: 4, fn: ok() }],
  ok2: () => [{ dd: 7, fn: ok() }, { dd: 3, fn: ok() }],
  ok2Duro: () => [{ dd: 7, fn: ok(10) }, { dd: 3, fn: ok(10) }],
  ok2Facile: () => [{ dd: 7, fn: ok(6) }, { dd: 3, fn: ok(6) }],
  ok2Incompleto: () => [{ dd: 7, fn: incompleta }, { dd: 3, fn: incompleta }],
  ok4: () => [{ dd: 22, fn: ok() }, { dd: 15, fn: ok() }, { dd: 8, fn: ok() }, { dd: 3, fn: ok() }],
  facile: () => [{ dd: 4, fn: ok(6) }],
  giusto: () => [{ dd: 4, fn: ok(8) }],
  duro: () => [{ dd: 4, fn: ok(10) }],
  mancato1: () => [{ dd: 8, fn: ok() }, { dd: 3, fn: mancato }],
  mancato2: () => [{ dd: 10, fn: mancato }, { dd: 3, fn: mancato }],
  moltoSotto: () => [{ dd: 4, fn: moltoSotto }],
  soloUltima: () => [{ dd: 3, fn: soloUltima }],
  amrap: () => [{ dd: 3, fn: es => rep(es.sets, es.kg, es.reps).map((s, i) => i === es.sets - 1 ? [s[0], es.reps + 4, true, null] : s) }],
  rientro12: () => [{ dd: 12, fn: ok() }],
  rientro25: () => [{ dd: 25, fn: ok() }],
  rientro60: () => [{ dd: 60, fn: ok() }],
  rientro120: () => [{ dd: 120, fn: ok() }],
  dopoScarico: () => [{ dd: 3, fn: scarico, sc: true }, { dd: 11, fn: ok() }],
  dopoScaricoMancato: () => [{ dd: 3, fn: scaricoMancato, sc: true }, { dd: 11, fn: ok() }],
  caloMassimale: () => [{ dd: 3, fn: es => mancato(Object.assign({}, es, { kg: meta(es.kg * 55 / 60) })) }, { dd: 7, fn: cala(57.5 / 60) }, { dd: 11, fn: ok() }],
  saltato: () => [{ dd: 4, fn: es => rep(es.sets, es.kg, es.reps).map(s => [s[0], s[1], false, null]) }],
  pesoVariabile: () => [{ dd: 4, fn: es => rep(es.sets, es.kg, es.reps).map((s, i) => i === 0 ? s : [meta(s[0] * 0.9), s[1], true, null]) }],
  soloAltroRecente: () => [{ dd: 2, altro: true }],
  soloAltroVecchio: () => [{ dd: 20, altro: true }]
};
const SRPE = { nessuno: null, facile: 3, giusto: 8, alto: 10 };
const q = (n, f) => ({ [ES[n].nome]: f });
const AGGIUSTI = {
  nessuno: () => null,
  scarico2: () => ({ esercizi: {}, scarico: { sedute: 2, motivo: 'stanchezza alta per piu giorni di fila' } }),
  scarico1Blocca: () => ({ esercizi: q(0, { blocca: true, sedute: 1 }), scarico: { sedute: 1, motivo: 'fatica accumulata nelle ultime sedute' } }),
  dolore: () => ({ scarico: null, esercizi: Object.assign({},
    q(0, { fattore: 0.9, sedute: 2, alteRip: true, motivo: 'Dolore segnalato: carico ridotto (10%)' }), q(1, { fattore: 0.8, sedute: 1, alteRip: false, motivo: 'Dolore segnalato: carico ridotto (20%)' }),
    q(2, { fattore: 0.9, sedute: 1, alteRip: true, motivo: 'Dolore segnalato: carico ridotto (10%) • ampiezza senza dolore' }), q(3, { fattore: 0.9, sedute: 1, alteRip: true, motivo: 'Dolore segnalato: carico ridotto (10%)' })) }),
  blocca: () => ({ scarico: null, esercizi: Object.assign({}, ...ES.map((e, i) => q(i, { blocca: true, sedute: 1 }))) }),
  extra: () => ({ scarico: null, esercizi: Object.assign({}, ...ES.map((e, i) => q(i, { extra: true, sedute: 1 }))) }),
  nota: () => ({ scarico: null, esercizi: Object.assign({}, q(0, { nota: 'Variante scelta dal coach al posto di Panca Inclinata Manubri', sedute: 1 }), q(1, { nota: 'Variante scelta dal coach al posto di Hack Squat', sedute: 1 })) }),
  stalli: () => ({ esercizi: {}, scarico: null, stalli: { [ES[0].nome]: 1, [ES[1].nome]: 1 } }),
  rirBias: () => ({ esercizi: {}, scarico: null, rirBias: 1.2 })
};
/* prontezza: risposte alle quattro domande (0 male, 1 cosi cosi, 2 bene), storia dei giorni prima e se oggi era gia stata data */
const PRONTEZZE = {
  nessuna: { risposte: null, storia: [] },
  nessunaStoriaBassa: { risposte: null, storia: [[3, 40], [2, 45], [1, 38]] },
  alta100: { risposte: { sonno: 2, stress: 2, dolenzia: 2, voglia: 2 }, storia: [[2, 85], [1, 90]] },
  media50: { risposte: { sonno: 1, stress: 1, dolenzia: 1, voglia: 1 }, storia: [[3, 60], [2, 65], [1, 70]] },
  bassa35: { risposte: { sonno: 0, stress: 1, dolenzia: 1, voglia: 1 }, storia: [[2, 80], [1, 75]] },
  bassa35DueBassi: { risposte: { sonno: 0, stress: 1, dolenzia: 1, voglia: 1 }, storia: [[2, 40], [1, 42]] },
  giaBassaOggi: { risposte: null, storia: [[1, 70]], oggi: 35 }
};
const REGOLE = {
  tutte: [],
  senzaRIC: ['RIC-01', 'RIC-02', 'RIC-04', 'RIC-05'],
  senzaINT: ['INT-04', 'INT-05'],
  senzaRICINT: ['RIC-01', 'RIC-02', 'RIC-04', 'RIC-05', 'INT-04', 'INT-05'],
  senzaTutte: null       /* tutte le regole spegnibili (REGOLE_SPEGNIBILI dell'app) */
};
/* BIA salvata: nessuna, massa magra in calo (freno agli aumenti) o due bandiere di prudenza (angolo di fase e acqua extracellulare: un RIR in piu) */
const BIA = {
  nessuna: null,
  freno: [{ dd: 40, valori: { ffm: 60, phase: 7.5 } }, { dd: 5, valori: { ffm: 58.5, phase: 7.5 } }],
  bandiere: [{ dd: 5, valori: { ffm: 60, phase: 4, ecw: 20, tbw: 48 } }]
};
const FINI = ['normale', 'tosta', 'facile', 'incompleta', 'taratura'];
const DIMENSIONI = { liv: Object.keys(PROFILI), prog: ['nessuno'].concat(Object.keys(INIZI)), sto: Object.keys(STORIE), agg: Object.keys(AGGIUSTI),
                     pro: Object.keys(PRONTEZZE), reg: Object.keys(REGOLE), srpe: Object.keys(SRPE), bia: Object.keys(BIA), fine: FINI };

/* ============================================================================================================
   Un caso: lo stato, le quattro chiamate, i risultati
   ============================================================================================================ */
function costruisciStato(app, s) {
  app.profilo(PROFILI[s.liv]);
  const P = programma(s.prog, s.liv);
  if (P) app.programma(P);
  /* storico: dalla seduta piu recente */
  const lista = STORIE[s.sto]().sort((a, b) => a.dd - b.dd).map(x => {
    const nomi = x.altro ? [{ nome: ALTRO, serie: rep(4, 80, 8) }] : ES.map(es => ({ nome: es.nome, serie: x.fn(es) }));
    const extra = {};
    if (SRPE[s.srpe]) extra.feedback = { srpe: SRPE[s.srpe] };
    if (x.sc) extra.settimana = { numero: 4, fase: 'scarico' };
    const h = app.seduta(x.dd, nomi, extra);
    if (x.sc) h.sessione.forEach(e => { e.obiettivo = { reps: ES.find(es => es.nome === e.name).reps, sets: e.sets.length, coachTipo: 'scarico' }; });
    return h;
  });
  app.storia(lista);
  const A = AGGIUSTI[s.agg]();
  if (A) app.aggiusti(A);
  const pr = PRONTEZZE[s.pro];
  if (pr.storia.length) app.scrivi('coach_plus_prontezza_storia_toji', pr.storia.map(([dd, p]) => ({ data: app.ymd(app.giorniFa(dd)), punteggio: p, sonno: 1 })));
  if (pr.oggi !== undefined) app.scrivi('coach_plus_prontezza_toji', { data: app.ymd(app.ora()), day: GIORNO, punteggio: pr.oggi });
  if (BIA[s.bia]) app.scrivi(app.g('biaKey()'), BIA[s.bia].map(x => ({ data: app.ymd(app.giorniFa(x.dd)), valori: x.valori })));
  app.spegni(REGOLE[s.reg] === null ? app.json('REGOLE_SPEGNIBILI') : REGOLE[s.reg]);
  app.scrivi(app.g('dataKey()'), { [GIORNO]: ES.map(es => ({ name: es.nome, sets: es.sets, reps: es.reps, weight: es.kg, rest: es.rest, tecnica: es.tecnica, stimato: es.stimato,
    completedSets: Array.from({ length: es.sets }, () => ({ done: false, reps: es.reps, weight: es.kg, wasBerserk: false })) })) });
  app.g('currentDay = ' + JSON.stringify(GIORNO));
}
/* il piano in forma corta, un esercizio per riga: [peso, ripetizioni, serie, pausa, tipo del coach, tecnica di oggi, serie/ripetizioni/pausa base,
   serie come peso x ripetizioni e + (fatta) o - (da fare), nota del coach]; la nota e "=" se e uguale a quella dello stadio prima */
const corto = (e, prima) => {
  const cs = []; (e.completedSets || []).forEach(x => { const t = x.weight + 'x' + x.reps + (x.done ? '+' : '-'); if (cs.length && cs[cs.length - 1][0] === t) cs[cs.length - 1][1]++; else cs.push([t, 1]); });
  const nota = e.coachNote === undefined ? null : e.coachNote;
  return [e.weight, e.reps, e.sets, e.rest, e.coachTipo === undefined ? null : e.coachTipo, e.tecnicaSeduta === undefined ? null : e.tecnicaSeduta,
    [e.setsBase, e.repsBase, e.restBase].map(x => x === undefined ? '-' : x).join('/'), cs.map(c => c[0] + (c[1] > 1 ? '*' + c[1] : '')).join(' '), prima !== undefined && nota === prima ? '=' : nota];
};
const pianoCorto = (app, note) => (app.pianoSalvato() || {})[GIORNO].map((e, i) => corto(e, note ? note[i] : undefined));
function provaStadio(f) { try { return f(); } catch (e) { return { errore: String(e && e.message || e) }; } }

function eseguiCaso(s) {
  const app = caricaApp({ ora: ORA });
  costruisciStato(app, s);
  app.g('window.__undo = []; window.__undoFn = []; window.showUndo = function (m, f, ms) { window.__undo.push({ m: String(m), annulla: typeof f === \'function\', ms: ms === undefined ? null : ms }); window.__undoFn.push(f || null); };' +
        'window.__ra = 0; renderAllenamento = function () { window.__ra++; };');
  const messaggi = () => app.json('__undo.splice(0)');
  const out = {};
  out.carico = provaStadio(() => ES.map(es => app.dati(app.chiama('caricoProssimo', es.nome, es.kg, es.reps, es.sets))));
  out.apertura = provaStadio(() => { const n = app.g('applicaCaricoProgressivo(' + JSON.stringify(GIORNO) + ')'); return { n: n, piano: pianoCorto(app, out.carico.map && out.carico.map(r => r.motivo)), msg: messaggi(), ra: app.g('__ra') }; });
  const pr = PRONTEZZE[s.pro];
  /* le note del piano dopo l'apertura (quelle "=" valgono quelle del carico) */
  const notaApertura = () => (out.apertura.piano || []).map((e, i) => e[8] === '=' ? out.carico[i].motivo : e[8]);
  if (pr.risposte) {
    out.prontezza = provaStadio(() => {
      app.g('__ra = 0');
      const punteggio = app.g('applicaProntezza(' + JSON.stringify(pr.risposte) + ')');
      const dopo = { punteggio: punteggio, piano: pianoCorto(app, notaApertura()), msg: messaggi(), ra: app.g('__ra'), chiave: app.leggi('coach_plus_prontezza_toji'), storia: app.leggi('coach_plus_prontezza_storia_toji'),
                     scarico: (app.json('aggiustiCoach()') || {}).scarico || null };
      /* l'annulla (se c'e): si prova su una copia e poi si rimette il piano com'era */
      const fn = app.g('__undoFn[0]'), k = app.g('dataKey()'), prima = app.store[k];
      if (typeof fn === 'function') { fn(); dopo.dopoAnnulla = pianoCorto(app, notaApertura()); app.store[k] = prima; }
      app.g('__undoFn.length = 0');
      return dopo;
    });
  }
  out.dopo = provaStadio(() => {
    /* la seduta finisce come dice il caso */
    const lista = app.json('loadData()[' + JSON.stringify(GIORNO) + ']');
    lista.forEach(e => e.completedSets.forEach((x, i) => {
      x.done = s.fine === 'incompleta' ? i % 2 === 0 : true;
      x.rpe = s.fine === 'tosta' ? 10 : (s.fine === 'facile' ? 6 : 8);
    }));
    if (s.fine === 'taratura') {
      lista.find(e => e.name === ES[2].nome).tecnicaSeduta = 'calibrazione';
      const ag = app.json('aggiustiCoach()'); ag.rirBias = 1.2; app.aggiusti(ag);
    }
    app.ctx.__l = app.g('JSON.parse(' + JSON.stringify(JSON.stringify(lista)) + ')');
    app.g('imparaDallaSeduta(__l)');
    const p = app.json('getProfile()') || {};
    return { aggiusti: app.json('aggiustiCoach()'), esigenza: p.esigenza || null, calibrazione: p.calibrazione || null, msg: messaggi() };
  });
  if (app.errori.length) out.errori = app.errori.slice();
  return out;
}

/* ============================================================================================================
   Scelta dei casi (una volta sola, --ricampiona) e file del golden
   ============================================================================================================ */
function mulberry32(a) { return function () { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const chiaveSpec = s => Object.keys(DIMENSIONI).map(k => s[k]).join('|');
const norm = t => String(t).replace(/\d+([.,]\d+)?/g, '#');
/* frasi e rami toccati da un caso: servono a scegliere casi che insieme li coprano tutti */
function firme(out) {
  const f = new Set();
  const pezzi = (pre, testo) => { if (typeof testo !== 'string') return; f.add(pre + 'M:' + norm(testo)); testo.split(' • ').forEach(p => f.add(pre + 'p:' + norm(p))); };
  (Array.isArray(out.carico) ? out.carico : []).forEach(r => { f.add('t:' + r.tipo); if (r.piuPausa) f.add('piuPausa'); if (r.stallo) f.add('stallo'); if (r.sets) f.add('sets:' + r.tipo + r.sets); pezzi('c', r.motivo); });
  const ap = out.apertura || {};
  (ap.piano || []).forEach(e => { pezzi('a', e[8]); f.add('tipoA:' + e[4]); f.add('tecS:' + e[5]); });
  (ap.msg || []).forEach(m => f.add('aMsg:' + norm(m.m)));
  const pr = out.prontezza;
  if (pr) { f.add('pr:' + (pr.punteggio >= 70 ? 'alta' : (pr.punteggio >= 50 ? 'media' : 'bassa'))); (pr.msg || []).forEach(m => f.add('prMsg:' + norm(m.m) + m.annulla)); if (pr.ra > 1) f.add('prRender2'); if (pr.scarico) f.add('prScarico'); (pr.piano || []).forEach(e => { pezzi('p', e[8]); f.add('tecSP:' + e[5]); }); }
  const d = out.dopo || {};
  (d.msg || []).forEach(m => f.add('dMsg:' + norm(m.m)));
  if (d.calibrazione) f.add('cal:' + d.calibrazione.esito);
  if (d.aggiusti) { f.add('rirBias:' + (d.aggiusti.rirBias === undefined ? 'x' : d.aggiusti.rirBias)); f.add('stalli:' + Object.keys(d.aggiusti.stalli || {}).length + (d.aggiusti.scarico ? 's' : '')); }
  return f;
}
function ricampiona() {
  const rnd = mulberry32(SEME_POOL), pool = [], viste = new Set();
  while (pool.length < N_POOL) {
    const s = {}; Object.keys(DIMENSIONI).forEach(k => { s[k] = DIMENSIONI[k][Math.floor(rnd() * DIMENSIONI[k].length)]; });
    const k = chiaveSpec(s); if (viste.has(k)) continue; viste.add(k);
    pool.push({ spec: s, out: eseguiCaso(s) });
  }
  const f = pool.map(c => firme(c.out)), noti = new Set(), scelti = [], usati = new Set();
  /* prima i casi che aggiungono piu firme nuove, poi si riempie a caso */
  while (scelti.length < N_CASI) {
    let meglio = -1, guadagno = 0;
    pool.forEach((c, i) => { if (usati.has(i)) return; let g = 0; f[i].forEach(x => { if (!noti.has(x)) g++; }); if (g > guadagno) { guadagno = g; meglio = i; } });
    if (meglio < 0) break;
    usati.add(meglio); scelti.push(meglio); f[meglio].forEach(x => noti.add(x));
  }
  /* poi ogni firma rara (meno di 3 casi) si porta a 3, se il campione ne ha */
  const volte = new Map(); scelti.forEach(i => f[i].forEach(x => volte.set(x, (volte.get(x) || 0) + 1)));
  Array.from(volte.keys()).filter(x => volte.get(x) < 3).forEach(x => {
    for (let i = 0; i < pool.length && volte.get(x) < 3 && scelti.length < N_CASI; i++) {
      if (usati.has(i) || !f[i].has(x)) continue;
      usati.add(i); scelti.push(i); f[i].forEach(y => volte.set(y, (volte.get(y) || 0) + 1));
    }
  });
  const coperti = scelti.length;
  for (let i = 0; scelti.length < N_CASI && i < pool.length; i++) if (!usati.has(i)) { usati.add(i); scelti.push(i); }
  console.log('firme distinte: ' + noti.size + '; casi scelti per copertura: ' + coperti + ', riempiti a caso: ' + (scelti.length - coperti));
  return scelti.sort((a, b) => a - b).map(i => pool[i]);
}
function scrivi(casi) {
  const righe = casi.map((c, i) => '  ' + JSON.stringify({ id: 'c' + String(i + 1).padStart(3, '0'), spec: c.spec, out: c.out }));
  fs.mkdirSync(path.dirname(FILE_GOLDEN), { recursive: true });
  fs.writeFileSync(FILE_GOLDEN, '{\n "versione": 1,\n "ora": ' + JSON.stringify(ORA) + ',\n "nota": "Golden dei carichi (W1-T3): vedi tests/carichi-golden.test.js. Un caso per riga: spec (le dimensioni, per nome) e out (caricoProssimo, applicaCaricoProgressivo, applicaProntezza, imparaDallaSeduta).",\n "casi": [\n' + righe.join(',\n') + '\n ]\n}\n');
}
const leggi = () => JSON.parse(fs.readFileSync(FILE_GOLDEN, 'utf8'));

if (process.argv.includes('--ricampiona')) {
  scrivi(ricampiona());
} else if (process.argv.includes('--registra')) {
  scrivi(leggi().casi.map(c => ({ spec: c.spec, out: eseguiCaso(c.spec) })));
  console.log('golden riscritto: ' + leggi().casi.length + ' casi');
} else {
  /* ========================================================================================================
     Le prove
     ======================================================================================================== */
  const golden = leggi();
  const confronta = (a, b, via, diff) => {
    if (diff.length >= 6) return;
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const chiavi = new Set(Object.keys(a).concat(Object.keys(b)));
      chiavi.forEach(k => confronta(a[k], b[k], via + '.' + k, diff));
    } else if (a !== b) diff.push(via + ': atteso ' + JSON.stringify(b) + ', ora ' + JSON.stringify(a));
  };

  test('golden: 500 casi, specifiche valide e ogni valore di ogni dimensione compare', () => {
    assert.strictEqual(golden.casi.length, N_CASI);
    assert.strictEqual(new Set(golden.casi.map(c => chiaveSpec(c.spec))).size, N_CASI, 'casi tutti diversi');
    Object.keys(DIMENSIONI).forEach(k => DIMENSIONI[k].forEach(v => {
      assert.ok(golden.casi.filter(c => c.spec[k] === v).length >= 5, 'dimensione ' + k + ' = ' + v + ': troppo pochi casi');
    }));
    golden.casi.forEach(c => Object.keys(DIMENSIONI).forEach(k => assert.ok(DIMENSIONI[k].includes(c.spec[k]), c.id + ': ' + k + ' = ' + c.spec[k] + ' non esiste')));
  });

  test('golden: le frasi e i rami che le quattro catene sanno produrre ci sono tutti', () => {
    const f = new Set(); golden.casi.forEach(c => firme(c.out).forEach(x => f.add(x)));
    const motivo = (re) => assert.ok(Array.from(f).some(x => re.test(x)), 'nel golden manca ' + re);
    [/^cp:Settimana di scarico/, /^cp:Scarico deciso dal coach/, /^cp:Rientro dopo # giorni/, /^cp:Dopo lo scarico riparti/, /^cp:Stesso carico: l ultima seduta era al limite/,
      /^cp:\+# kg in più: l ultima volta era leggero/, /^cp:ampiezza senza dolore/, /^cp:rientro dopo # giorni: meno serie su tutto il piano/,
      /^cp:settimana centrale del blocco, muscolo prioritario/, /^cp:mancava solo l ultima serie: # secondi/, /^cp:prima volta: una serie in meno/,
      /^cp:lascia #–# ripetizioni in riserva/, /^cp:fino a #–# ripetizioni in riserva/, /^cp:Due volte di fila non completato: -#%/, /^cp:Massimale stimato in calo/,
      /^cp:Prime sedute: serie molto sotto il previsto/, /^cp:Doppia progressione/, /^cp:Ultima serie con # ripetizioni in piu/, /^cp:Serie complete ma RPE/,
      /^cp:Serie facili \(RPE/, /^cp:Secondo stallo: stesso peso ma schema/, /^cp:Variante scelta dal coach/, /^cp:Dolore segnalato/,
      /^cp:Non tutte le serie complete: stesso peso con # secondi/, /^cp:La massa magra e scesa/, /^cp:aumento dimezzato/, /^cp:Tenuta completata/, /^cp:Rientro dopo # giorni: carico/].forEach(motivo);
    ['piuPausa', 'stallo', 'prRender2', 'prScarico', 'tecS:-', 'tecS:calibrazione', 'cal:giusta', 'cal:alta', 'cal:bassa'].forEach(x => assert.ok(f.has(x), 'nel golden manca ' + x));
    assert.ok(Array.from(f).some(x => /^prMsg:Prontezza/.test(x)), 'messaggio di prontezza');
    ['era tosta', 'eri sotto il bersaglio', 'intensità giusta'].forEach(t => assert.ok(Array.from(f).some(x => x.indexOf('dMsg:Prime due sedute: ' + t) === 0), 'messaggio del bilancio delle prime sedute (INT-05): ' + t));
  });

  test('golden: caricoProssimo, applicaCaricoProgressivo, applicaProntezza e imparaDallaSeduta danno gli stessi numeri e le stesse frasi di prima', () => {
    const diversi = [];
    golden.casi.forEach(c => {
      const ora = JSON.parse(JSON.stringify(eseguiCaso(c.spec))), diff = [];
      confronta(ora, c.out, '', diff);
      if (diff.length) diversi.push(c.id + ' [' + chiaveSpec(c.spec) + ']\n    ' + diff.join('\n    '));
    });
    assert.strictEqual(diversi.length, 0, diversi.length + ' casi su ' + golden.casi.length + ' sono diversi dal golden:\n  ' + diversi.slice(0, 8).join('\n  '));
  });
}
