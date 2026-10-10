/* Aiuto per le prove del piano che si esegue in seduta e dello scarico unico (P3-B, piano coach v2 W3-T4 e W3-T5, versione snella).
   Non e un test (non finisce in `npm test`): lo usano tests/piano-in-seduta.test.js e tests/scarichi.test.js.

   COSA FA: un telefono con un programma v2 vero (buildProgram) salvato come lo salva l app, l OROLOGIO FINTO che porta l app alla settimana n del programma
   (il lunedi 5 ottobre 2026 e l inizio) e le settimane vissute una dopo l altra: apertura della seduta (applicaCaricoProgressivo: la catena 'carico' di
   caricoProssimo con tutte le sue fasi), una seduta fatta dall atleta (tutte le serie fatte al carico e alle ripetizioni scritte nel piano), la voce di storico
   com e la scrive endWorkout (settimana, obiettivo di ogni esercizio, coachTipo) e il consumo degli aggiusti. Cosi 12 settimane si vivono in qualche secondo e le
   prove guardano cio che l utente vede (serie, carico, motivo) e non una funzione sola.
   I file di P3-B che index.html avra dopo l integrazione (docs/in-arrivo/P3-B.json) li carica da sola `conP3B(app)` se mancano, come aiuto-mesociclo.js:
   cosi le prove passano con e senza le righe <script>.
   Uso:
     const { telefono, vaiA, apriGiorno, vivi, conP3B } = require('./aiuto-atleta-piano');
     const { a, p } = telefono({ d: { level: 'intermedio' } });   // settimana 1, lunedi
     vaiA(a, 4);                                                   // settimana 4, lunedi
     const voci = apriGiorno(a, 'Lunedì');                         // [{ name, sets, setsBase, weight, reps, coachNote, coachTipo }] dopo la catena dei carichi */
'use strict';
const fs = require('fs'), path = require('path');
const { caricaApp } = require('./aiuto-app');
const R = path.join(__dirname, '..');

const LUNEDI = '2026-10-05T12:00:00';   /* inizio del programma: lunedi della settimana 1 */
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', priorita: [], usaProfilo: false, seme: 'p3b' };

/* i file nuovi di P3-B, nell ordine in cui entrano in index.html: [file, nome della cosa che definiscono (typeof) o null se registrano una fase] */
const FILE_P3B = [['js/coach/sicurezza/soglie-scarico.js', 'SOGLIE_SCARICO'], ['js/coach/volume/soglie-rampa.js', 'SOGLIE_RAMPA'], ['js/coach/volume/rampa-settimana.js', null]];
function conP3B(app) {
  FILE_P3B.forEach(([file, nome]) => {
    const f = path.join(R, file);
    if (!fs.existsSync(f)) return;                                              /* prima che il file esista le prove falliscono per il motivo giusto, non per l aiuto */
    if (nome && app.g('typeof ' + nome) !== 'undefined') return;
    if (!nome && app.g("FASI_PUNTI.carico.some(f => f.codice === 'MES-03')")) return;
    app.g(fs.readFileSync(f, 'utf8'));
  });
  /* il catalogo delle regole lo rigenera l integrazione dalle righe della mappa: finche non c e, queste regole sono accese e spegnibili come dira la mappa */
  ['MES-03', 'MES-05', 'MES-07', 'CST-09'].forEach(c => app.g("if (!COACH_REGOLE_PER_CODICE['" + c + "']) COACH_REGOLE_PER_CODICE['" + c + "'] = { codice: '" + c + "', spegnibile: true, sottoCoach: '" + (c === 'MES-03' ? 'dosatore' : 'sentinella') + "' }"));
  return app;
}

/* un telefono con il programma v2 appena creato (settimana `sett`, giorno `giorno` della settimana: 0 lunedi). opz: sett, giorno, consenso, d (campi di buildProgram), profilo
   (campi del profilo salvato), v1 (il programma come lo salvava la v1: niente versione, niente piano, niente volume per unita) */
function telefono(opz) {
  const o = Object.assign({ sett: 1, giorno: 0, consenso: true, d: {}, profilo: {}, v1: false }, opz || {});
  const a = caricaApp({ ora: LUNEDI, consenso: o.consenso });
  conP3B(a);
  const d = Object.assign({}, BASE, o.d);
  const p = a.dati(a.chiama('buildProgram', d));
  const salvato = { creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, schema: { sets: 3, reps: 10 }, seme: d.seme, ispirazioni: p.ispirazioni };
  if (!o.v1) Object.assign(salvato, { versione: 2, piano: p.piano, perche: p.perche });
  a.programma(salvato);
  a.profilo(Object.assign({ level: d.level, age: d.age, sex: d.sex, goals: d.goals, parq: d.parq === 'si' || d.parq === true, luogo: d.luogo, priorita: d.priorita || [] }, o.profilo));
  /* il piano della settimana (le sedute del programma), come lo scrive applyGeneratedProgram */
  const giorni = a.json('DAYS'), data = {};
  giorni.forEach(g => { data[g] = []; });
  p.sedute.forEach(s => { data[s.giorno] = s.esercizi.map(e => a.dati(a.chiama('normalizeExerciseRecord', Object.assign({}, e, { completedSets: [] })))); });
  a.scrivi(a.chiave('dataKey'), data);
  vaiA(a, o.sett, o.giorno);
  return { a, p, d };
}
/* l orologio sulla settimana n (1..) del programma, giorno g (0 = lunedi) */
function vaiA(a, n, g) { a.ora(new Date(2026, 9, 5 + 7 * (n - 1) + (g || 0), 12, 0, 0)); }

/* apre la seduta di `giorno` come fa l app (applicaCaricoProgressivo: la catena 'carico' con tutte le fasi) e restituisce gli esercizi come li vede l utente */
function apriGiorno(a, giorno) {
  a.chiama('applicaCaricoProgressivo', giorno);
  const lista = a.json('loadData()')[giorno] || [];
  return lista.map(e => ({ name: e.name, sets: e.sets, setsBase: e.setsBase, weight: e.weight, reps: e.reps, repsBase: e.repsBase, coachNote: e.coachNote, coachTipo: e.coachTipo, rest: e.rest }));
}
/* le sedute (giorni con esercizi) del programma, nell ordine della settimana */
function giorniDiAllenamento(a) { return a.giorniAllenamento(); }

/* una seduta vissuta: apre il giorno, l atleta fa tutte le serie come scritte (peso e ripetizioni del piano), la voce di storico e quella di endWorkout (settimana, obiettivo
   di ogni esercizio) e si consumano gli aggiusti; il questionario non c e (nessun feedback) salvo `feedback`. Ritorna le voci con le serie fatte.
   L obiettivo di ogni esercizio salva anche `base` (il bersaglio del piano, come endWorkout): senza, ALG-05 (ricalcolo dal massimale, ripetizioni cambiate) non scatta mai
   e le simulazioni da 12 settimane non lo provano (revisione indipendente di 3a, INT-3b). opz.rpe: un numero (default 8), null (nessun RPE segnato) o 'bersaglio'
   (l RPE uguale al bersaglio di ogni esercizio: 10 meno le ripetizioni in riserva previste, cioe l atleta che fa tutto come prescritto) */
function vivi(a, giorno, opz) {
  const o = Object.assign({ feedback: null, rpe: 8 }, opz || {});
  const voci = apriGiorno(a, giorno);
  const sett = a.json('settimanaProgramma()');
  const data = a.json('loadData()');
  const sessione = voci.map(e => {
    const rir = a.json('rirBersaglio(' + JSON.stringify(e.name) + ')');
    const rpe = o.rpe === 'bersaglio' ? 10 - (rir[0] + rir[1]) / 2 : o.rpe;
    return { name: e.name, rest: e.rest || 90, sets: Array.from({ length: e.sets }, () => ({ weight: e.weight, reps: e.reps, done: true, wasBerserk: false, rpe: rpe })),
      obiettivo: { reps: e.reps, base: e.repsBase, sets: e.sets, rir: rir, tecnica: '', coachTipo: e.coachTipo } };
  });
  const voce = { id: a.ora(), day: giorno, date: a.g('formatNow()'), minuti: 50, prontezza: 80, sessione: sessione, exercises: [] };
  if (sett && sett.fase) voce.settimana = { numero: sett.numero, fase: sett.fase };
  if (o.feedback) voce.feedback = o.feedback;
  a.storia([voce].concat(a.leggi(a.chiave('historyKey')) || []));
  a.chiama('consumaAggiusti', voce);
  void data;
  return { voci: voci, voce: voce };
}
/* una settimana intera: vive tutti i giorni di allenamento (lunedi, giovedi...) con l orologio sul giorno giusto; ritorna { n, fase, giorni: { giorno: voci } } */
function viviSettimana(a, n, opz) {
  const giorni = giorniDiAllenamento(a), nomi = a.json('DAYS');
  const out = { n: n, giorni: {} };
  giorni.forEach(g => {
    vaiA(a, n, Math.max(0, nomi.indexOf(g)));
    const r = vivi(a, g, opz);
    out.giorni[g] = r.voci;
    out.fase = (a.json('settimanaProgramma()') || {}).fase;
  });
  return out;
}

module.exports = { telefono, vaiA, apriGiorno, vivi, viviSettimana, giorniDiAllenamento, conP3B, LUNEDI, BASE, FILE_P3B };
