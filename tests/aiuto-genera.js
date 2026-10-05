/* Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera.
   Non e un test (non finisce in `npm test`): lo usano tests/genera-golden.test.js e tests/genera-stadi.test.js.
   I profili sono sempre gli stessi (mulberry32 con seme fisso, nessun Math.random ne orologio): il golden registrato prima della
   ristrutturazione deve restare identico byte per byte dopo. I campi coprono tutto cio che buildProgram legge: obiettivi (anche tre),
   livello, giorni, minuti, luogo, fastidi, sonno, attrezzi, sesso, eta (minorenni, over 65, eta non detta), PAR-Q, frequenza scelta,
   priorita, graditi e odiati, attrezzi della palestra, risposte psicologiche, prove fai-da-te, BIA, metodi famosi forzati, momento di vita,
   esigenza, variante e ciclo, scelte dell utente tra le alternative. */
'use strict';
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const TUTTI_GLI_OBIETTIVI = ['massa', 'forza', 'dimagrimento', 'salute', 'ricomposizione', 'glutei'];
const PSICO = [undefined, undefined, undefined,
  { preferenza: 'durissimi', tolleranza: 'spingo', fiducia: 'alta', varieta: 'mix' },
  { varieta: 'routine', preferenza: 'impegnativi', tolleranza: 'continuo' },
  { preferenza: 'tranquilli', tolleranza: 'mi-fermo', fiducia: 'poca', dopoPausa: 'mollo', palestra: 'disagio', varieta: 'varieta', motivo: 'dovere' },
  { preferenza: 'impegnativi', tolleranza: 'spingo', varieta: 'varieta', palestra: 'osservato' }];
const BIA = [null, null, null, null,
  { peso: 82, altezza: 178, fmPerc: 14, ffm: 70.5, smm: 36, phase: 6.8 }, { peso: 95, altezza: 176, fmPerc: 31, ffm: 65.5, smm: 33 },
  { peso: 58, altezza: 165, fmPerc: 24, ffm: 44, smm: 22, phase: 5.2 }, { peso: 70, altezza: 180, fmPerc: 12, ffm: 61.6, smm: 31.5 }, { peso: 66, altezza: 168 }];
const ATTREZZI_PALESTRA = [undefined, undefined, undefined, ['bilanciere', 'manubri', 'macchine', 'sbarra'], ['manubri', 'macchine'], ['bilanciere', 'manubri'], ['macchine'], ['manubri']];
const GRUPPI = ['petto', 'schiena', 'spalle', 'braccia', 'gambe', 'glutei', 'core'];
const MOMENTI_PROVA = [undefined, undefined, undefined, undefined, undefined, undefined, 'stress', 'rientro', 'bambino', 'sonno'];

/* nomi veri della libreria (servono per i graditi, gli odiati e le scelte): si leggono dall app una volta */
function nomiLibreria(app) { return app.json('EXERCISE_LIBRARY.map(e => e.name)'); }
function proveFaiDaTe(app) { return app.json('TEST_FAI_DA_TE.map(t => ({ k: t.k, o: t.o.map(x => x[0]) }))'); }
function idMetodi(app) { return app.json('METODI.map(m => m.id)'); }

/* n profili: stesso seme, stessi profili. Il campo `seme` e quello di buildProgram (rngDa), diverso per ogni profilo. */
function profili(app, n, prefisso) {
  const r = mulberry32(20261005 + 17), uno = l => l[Math.floor(r() * l.length)];
  const nomi = nomiLibreria(app), prove = proveFaiDaTe(app), metodi = idMetodi(app);
  const out = [];
  for (let i = 0; i < n; i++) {
    const k = i % 10;   /* un profilo su dieci minorenne, uno su dieci over 65, uno su cinquanta senza eta */
    const age = i % 50 === 7 ? undefined : (k === 0 ? 13 + Math.floor(r() * 5) : k === 1 ? 65 + Math.floor(r() * 20) : 18 + Math.floor(r() * 47));
    const goals = [uno(TUTTI_GLI_OBIETTIVI)];
    if (r() < 0.35) { const g = uno(TUTTI_GLI_OBIETTIVI); if (goals.indexOf(g) === -1) goals.push(g); }
    if (goals.length === 2 && r() < 0.25) { const g = uno(TUTTI_GLI_OBIETTIVI); if (goals.indexOf(g) === -1) goals.push(g); }
    const p = {
      goals, age, level: uno(['principiante', 'intermedio', 'intermedio', 'avanzato', 'avanzato']), days: uno([2, 3, 3, 4, 4, 5, 6]), minutes: uno([30, 45, 60, 60, 75, 90]),
      luogo: uno(['palestra', 'palestra', 'palestra', 'manubri', 'corpo']), sex: uno(['M', 'F', 'F', 'donna']),
      fastidi: r() < 0.3 ? [uno(['spalle', 'ginocchia', 'schiena'])].concat(r() < 0.2 ? ['nessuno'] : []) : (r() < 0.05 ? ['nessuno'] : []),
      parq: uno(['no', 'no', 'no', 'no', 'no', 'no', 'no', 'si', true, false]), sonno: uno(['bene', 'bene', 'medio', 'male']), attrezzi: uno(['indifferente', 'indifferente', 'liberi', 'macchine']),
      usaProfilo: false, seme: (prefisso || 'w1t4') + '-' + i
    };
    if (r() < 0.55) p.freq = uno(['1', '2', '3', 'auto']);
    if (r() < 0.3) p.priorita = [uno(GRUPPI)].concat(r() < 0.5 ? [uno(GRUPPI)] : []).filter((g, j, a) => a.indexOf(g) === j);
    if (r() < 0.2) p.graditi = [uno(nomi), uno(nomi)];
    if (r() < 0.2) p.odiati = [uno(nomi), uno(nomi)];
    const ap = uno(ATTREZZI_PALESTRA); if (ap) p.attrezziPalestra = ap;
    const ps = uno(PSICO); if (ps) p.psico = ps;
    const bia = uno(BIA); if (bia) p.bia = bia;
    if (r() < 0.45) { p.test = {}; prove.forEach(t => { if (r() < 0.6) p.test[t.k] = uno(t.o); }); }
    if (r() < 0.15) p.metodo = r() < 0.1 ? null : uno(metodi);
    if (r() < 0.15) p.esigenza = uno([0.9, 1, 1.1, 1.2]);
    if (r() < 0.1) p.variante = 1;
    if (r() < 0.1) p.cicli = 1 + Math.floor(r() * 3);
    const m = uno(MOMENTI_PROVA); if (m) p.momentoNuovo = m;
    if (i % 97 === 5) { delete p.goals; p.goal = uno(TUTTI_GLI_OBIETTIVI); }   /* qualche profilo con il vecchio campo goal e non goals */
    if (i % 101 === 9) p.goals = [];                                         /* e uno senza obiettivi: ripiega su salute come oggi */
    out.push(p);
  }
  return out;
}

/* qualche scelta dell utente tra le alternative (PRG-39: «Esercizi alternativi»), derivata da un primo programma dello stesso profilo */
function conScelte(app, p) {
  const base = app.dati(app.chiama('buildProgram', p));
  const scelte = {};
  base.sedute.slice(0, 2).forEach(sd => sd.esercizi.slice(0, 3).forEach((e, i) => {
    const alt = app.json('alternativeStessoMuscolo(' + JSON.stringify(e.name) + ', ' + JSON.stringify(base.prefs) + ', [], { max: 2 }).map(a => a.ex.name)');
    if (alt.length) scelte[e.name] = alt[i % alt.length];
  }));
  return Object.assign({}, p, { scelte });
}

/* i profili del golden: n base + alcuni con le scelte dell utente (coach acceso: e il caso dell app vera) */
function profiliGolden(app, n) {
  const lista = profili(app, n, 'w1t4');
  [11, 47, 83, 121, 167, 203, 251, 289].forEach(i => { if (lista[i]) lista[i] = conScelte(app, lista[i]); });
  return lista;
}

/* ogni metodo famoso (METODI, anche quelli solo ispirazione) forzato con `metodo`, per tre persone: chi inizia a casa, un intermedio in palestra, un avanzato prudente di 70 anni o
   con le ginocchia dolenti: copre i rami dei metodi (split, nEs, luogo, ricette, schema, pesanti, leggeri, superserie, tocco) che i profili a caso toccano poco */
function profiliMetodi(app) {
  const base = [
    { goals: ['salute'], level: 'principiante', days: 3, minutes: 45, luogo: 'manubri', sex: 'F', age: 34, fastidi: [] },
    { goals: ['massa', 'forza'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', age: 28, fastidi: [] },
    { goals: ['forza'], level: 'avanzato', days: 5, minutes: 90, luogo: 'palestra', sex: 'M', age: 70, fastidi: ['ginocchia'], parq: 'si', priorita: ['spalle'] }
  ];
  const out = [];
  idMetodi(app).forEach(id => base.forEach((b, j) => out.push(Object.assign({ sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false }, b, { metodo: id, seme: 'w1t4-metodo-' + id + '-' + j }))));
  return out;
}

/* la stessa costruzione di renderOnbResult / applyGeneratedProgram: d e proprio onbData (cosi buildProgram legge anche il profilo salvato) */
function costruisciConProfilo(app, d) {
  app.ctx.__d = app.g('JSON.parse(' + JSON.stringify(JSON.stringify(d)) + ')');
  return app.dati(app.g('(onbData = __d, buildProgram(onbData))'));
}

/* profili salvati sul telefono (graditi, priorita, psico, test, frequenza, BIA, momento, esigenza) + storico per i carichi di partenza */
function profiliConProfilo(app, n) {
  const r = mulberry32(777), uno = l => l[Math.floor(r() * l.length)];
  const nomi = nomiLibreria(app), out = [];
  for (let i = 0; i < n; i++) {
    const sex = uno(['M', 'F']);
    const salvato = { level: uno(['principiante', 'intermedio', 'avanzato']), age: uno([16, 30, 45, 70]), sex, goals: [uno(TUTTI_GLI_OBIETTIVI)], priorita: r() < 0.5 ? [uno(GRUPPI)] : [], parq: r() < 0.15,
      graditi: r() < 0.4 ? [uno(nomi), uno(nomi)] : [], odiati: r() < 0.3 ? [uno(nomi)] : [], freq: uno([null, '1', '2', '3']), attrezziPalestra: uno(ATTREZZI_PALESTRA) || null,
      psico: uno(PSICO) || null, test: r() < 0.5 ? { caviglia: uno(['ok', 'no']), spalle: uno(['ok', 'no']) } : {}, bia: uno(BIA), weight: uno([60, 75, 90]), cicli: uno([0, 1, 2]) };
    if (r() < 0.3) salvato.momento = { id: uno(['stress', 'rientro', 'bambino']), da: '2026-09-20' };
    if (r() < 0.3) salvato.esigenza = { valore: uno([0.9, 1, 1.15, 1.2]) };
    const d = { goals: salvato.goals, level: salvato.level, days: uno([2, 3, 4, 5]), minutes: uno([45, 60, 90]), luogo: uno(['palestra', 'manubri', 'corpo']), fastidi: [], sex, age: salvato.age,
      parq: salvato.parq ? 'si' : 'no', sonno: 'bene', attrezzi: 'indifferente', seme: 'w1t4-conprofilo-' + i };
    out.push({ salvato, d, storico: i % 3 === 0, biaStorico: i % 4 === 0 });
  }
  return out;
}
function preparaConProfilo(app, c) {
  app.store = app.store;
  Object.keys(app.store).forEach(k => { if (/^(coach_plus|tz_)/.test(k) && k !== 'tz_consenso' && k !== 'tz_lingua' && k !== 'tz_app_mode') delete app.store[k]; });
  app.profilo(c.salvato);
  if (c.storico) {
    app.storia([app.seduta(5, [{ nome: '💪 Panca Piana Bilanciere', serie: [[60, 8, true, 8], [60, 8, true, 8]] }, { nome: '💪 Squat con Bilanciere', serie: [[80, 6, true, 8]] }]),
      app.seduta(12, [{ nome: '💪 Panca Piana Bilanciere', serie: [[57.5, 8, true, 8]] }])]);
  }
  if (c.biaStorico) {
    app.chiama('aggiungiBia', { peso: 80, ffm: 63, fmPerc: 21, smm: 32 }, '2026-07-20');
    app.chiama('aggiungiBia', { peso: 79, ffm: 62.2, fmPerc: 21, smm: 31.4 }, '2026-09-20');
  }
}

module.exports = { ORA, mulberry32, profili, profiliGolden, profiliMetodi, conScelte, costruisciConProfilo, profiliConProfilo, preparaConProfilo, nomiLibreria, TUTTI_GLI_OBIETTIVI, caricaApp };
