/* Correzioni dopo la revisione indipendente dell onda 2b/2c (INT-2d, docs/coach-v2-decisioni.md D-P21): una prova per correzione, con i numeri scritti.
   Ogni prova fallisce sul codice di coach-v2-onda-2c (ec06469): B1 il controllo dell 8a settimana del principiante, M1 le note false, M5 il RIR 0 del
   principiante, M2 i sei giorni ciclici, M4 il cancello. Prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';   /* inizio del programma: lunedi della settimana 1 */
const BASE = { goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', priorita: [], usaProfilo: false, seme: 'int2d' };
const FB = (srpe, extra) => Object.assign({ srpe: srpe, arrivo: 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, esercizi: [] }, extra || {});
const SERIE = n => Array.from({ length: n }, () => [60, 10, true]);

/* un telefono con il programma da principiante a 12 settimane salvato come lo salva l app; `sett` = la settimana in cui si e (1..12), `giorno` = 0 lunedi */
function telefono(opz) {
  const o = Object.assign({ sett: 8, giorno: 2, consenso: true, d: {} }, opz || {});
  const a = caricaApp({ ora: LUNEDI, consenso: o.consenso });
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, o.d)));
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, versione: 2, piano: p.piano, schema: { sets: 3, reps: 10 }, seme: 'int2d', ispirazioni: p.ispirazioni, perche: p.perche });
  a.profilo({ level: (o.d.level || BASE.level), age: o.d.age || BASE.age, goals: BASE.goals, parq: false, luogo: BASE.luogo });
  a.ora(new Date(2026, 9, 5 + 7 * (o.sett - 1) + o.giorno, 12, 0, 0));
  return { a, p };
}
/* le ultime tre sedute con il loro questionario (feedback); `fb` = tre risposte; Leg Press a 60 kg x 10 come carico di riferimento */
function storiaTre(a, fb) {
  a.storia([0, 1, 2].map(i => a.seduta(2 + 2 * i, [{ nome: 'Leg Press', serie: SERIE(3) }], { feedback: fb[i], settimana: { numero: 7, fase: 'carico' } })));
}
const prontezza = (a, punteggi, sonno) => a.scrivi('coach_plus_prontezza_storia_toji', punteggi.map((x, i) => ({ data: a.ymd(a.giorniFa(punteggi.length - i)), punteggio: x, sonno: sonno === undefined ? 2 : sonno })));
const programma = a => a.leggi(a.chiave('progKey'));
const annulla = a => a.g('lastUndo');

/* ============ B1: il controllo dell 8a settimana esiste, decide dai dati, ha il motivo e si annulla ============ */

test('B1: all 8a settimana con fatica alta il programma salvato diventa uno scarico «basso» (serie -35%, carico -5%) con il motivo scritto', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(a.json('livelloFatica()'), 'alta', 'tre sedute su tre al limite: sRPE medio 10, fatica alta');
  const s = a.json('settimanaProgramma()');
  assert.strictEqual(s.numero, 8);
  assert.strictEqual(s.fase, 'scarico', 'la settimana 8 e di scarico, non piu «carico»');
  assert.strictEqual(s.doseFissa, 'bassa');
  const p = programma(a);
  assert.strictEqual(p.fasi[7], 'scarico');
  assert.deepStrictEqual(p.fasi.map((f, i) => f === 'scarico' ? i + 1 : 0).filter(Boolean), [8, 12], 'scarichi: la 8a del controllo e la verifica della 12a');
  const w = p.piano.settimane[7];
  assert.deepStrictEqual([w.fase, w.dose, w.volume, w.carico], ['scarico', 'bassa', 0.65, 0.95]);
  assert.deepStrictEqual(w.rir.A, [3, 4], 'RIR 3-4 come la verifica');
  assert.strictEqual(p.piano.controllo.esito, 'scarico');
  assert.strictEqual(p.piano.controllo.fatica, 'alta');
  assert.ok(/^Controllo della settimana 8 • la stanchezza delle ultime sedute è alta • le ultime sedute erano al limite o fatte da stanco • questa settimana è uno scarico leggero: serie -35% e carico -5% • poi si riprende dal carico di prima$/.test(p.piano.controllo.motivo), p.piano.controllo.motivo);
  assert.ok(p.perche.some(x => x.codice === 'PRN-03' && /^Controllo della settimana 8/.test(x.testo)), 'il perche con il codice');
  assert.strictEqual(s.controllo, p.piano.controllo.motivo);
});

test('B1: la dose dello scarico del controllo e la «bassa» del registro e si calcola sul carico di prima, mai composta', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(8)]);
  const r = a.dati(a.chiama('caricoProssimo', 'Leg Press', 60, 10, 3));
  assert.strictEqual(r.tipo, 'scarico');
  assert.strictEqual(r.weight, 57.5, '60 kg x 0,95 = 57 (e non x 0,9 della fatica alta): griglia della macchina a passi di 2,5 kg = 57,5 (ALG-06, P3-A)');
  assert.strictEqual(r.sets, 2, '3 serie x 0,65 = 1,95 -> 2');
  assert.ok(/volume -35%/.test(r.motivo), r.motivo);
  /* la seduta di scarico e fatta: la prossima della stessa settimana parte ancora da 60 kg, non da 57 */
  a.storia([a.seduta(0, [{ nome: 'Leg Press', serie: [[57, 10, true], [57, 10, true]] }], { feedback: FB(6), settimana: { numero: 8, fase: 'scarico' } })].concat(a.leggi(a.chiave('historyKey'))));
  const r2 = a.dati(a.chiama('caricoProssimo', 'Leg Press', 60, 10, 3));
  assert.strictEqual(r2.weight, 57.5, 'stesso carico di riferimento (60 kg), non 54');
});

test('B1: con fatica bassa e nessun segnale la settimana 8 continua come carico, e lo dice', () => {
  const { a } = telefono();
  storiaTre(a, [FB(3), FB(3), FB(6)]);
  prontezza(a, [85, 80, 90, 85, 80]);
  assert.strictEqual(a.json('livelloFatica()'), 'bassa');
  const s = a.json('settimanaProgramma()');
  assert.strictEqual(s.fase, 'carico');
  const p = programma(a);
  assert.strictEqual(p.fasi[7], 'carico');
  assert.strictEqual(p.piano.settimane[7].fase, 'carico');
  assert.strictEqual(p.piano.controllo.esito, 'carico');
  assert.ok(/la stanchezza è bassa e non ci sono segnali/.test(p.piano.controllo.motivo));
  assert.strictEqual(s.doseFissa, undefined);
});

test('B1: un segnale basta anche con fatica bassa: sonno scarso in 4 check-in su 7, due sedute al limite, dolore da 4/10, uno scarico del coach gia deciso', () => {
  const casi = {
    sonno: a => { storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [85, 85, 85, 85, 85, 85, 85], 0); const x = a.leggi('coach_plus_prontezza_storia_toji'); x.forEach((v, i) => { v.sonno = i < 3 ? 2 : 0; }); a.scrivi('coach_plus_prontezza_storia_toji', x); },
    sedute: a => { storiaTre(a, [FB(10), FB(10), FB(3)]); prontezza(a, [85, 85, 85]); },
    dolore: a => { storiaTre(a, [FB(3, { dolore: true, zone: ['ginocchio'], livello: 4 }), FB(3), FB(3)]); prontezza(a, [85, 85, 85]); },
    scarico: a => { storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [85, 85, 85]); a.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'stanchezza alta per piu giorni di fila' } }); }
  };
  Object.keys(casi).forEach(k => {
    const { a } = telefono();
    casi[k](a);
    assert.strictEqual(a.json('livelloFatica()') === 'alta', false, k + ': la fatica da sola non basta a spiegare lo scarico');
    const s = a.json('settimanaProgramma()');
    assert.strictEqual(s.fase, 'scarico', k);
    assert.deepStrictEqual(programma(a).piano.controllo.segnali, [k], k);
  });
  /* un dolore lieve (3/10) e un solo check-in con sonno scarso non sono segnali */
  const { a } = telefono();
  storiaTre(a, [FB(3, { dolore: true, zone: ['ginocchio'], livello: 3 }), FB(3), FB(3)]); prontezza(a, [85, 85, 85, 85, 85]);
  assert.strictEqual(a.json('settimanaProgramma()').fase, 'carico');
});

test('B1: senza dati sulla stanchezza (nessun questionario, nessuna prontezza) la fatica «media» di livelloFatica scarica per prudenza, e lo scrive', () => {
  const { a } = telefono();
  assert.strictEqual(a.json('livelloFatica()'), 'media');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  assert.ok(/non ci sono ancora dati sulla tua stanchezza: per prudenza si scarica/.test(programma(a).piano.controllo.motivo));
});

test('B1: serve il consenso (senza il coach il programma resta com e), e solo alla settimana 8', () => {
  const senza = telefono({ consenso: false });
  storiaTre(senza.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(senza.a.json('settimanaProgramma().fase'), 'carico');
  assert.strictEqual(programma(senza.a).piano.controllo, undefined, 'niente scritto');
  assert.strictEqual(programma(senza.a).piano.settimane[7].fase, 'controllo');
  [7, 9, 12].forEach(sett => {
    const { a } = telefono({ sett: sett });
    storiaTre(a, [FB(10), FB(10), FB(10)]);
    const s = a.json('settimanaProgramma()');
    assert.strictEqual(s.fase, sett === 12 ? 'scarico' : 'carico', 'settimana ' + sett);
    assert.strictEqual(programma(a).piano.controllo, undefined, 'settimana ' + sett + ': nessun controllo');
  });
});

test('B1: la decisione e presa una volta sola (una fatica diversa dopo non la cambia) e si annulla: il programma torna com era e il controllo non si ripete', () => {
  const { a } = telefono();
  storiaTre(a, [FB(10), FB(10), FB(8)]);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico');
  storiaTre(a, [FB(3), FB(3), FB(3)]); prontezza(a, [90, 90, 90]);
  assert.strictEqual(a.json('livelloFatica()'), 'bassa');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'scarico', 'la decisione resta');
  assert.strictEqual(typeof annulla(a), 'function', 'c e l annulla');
  a.g('lastUndo()');
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'carico', 'annullato: la settimana continua');
  const p = programma(a);
  assert.deepStrictEqual([p.fasi[7], p.piano.settimane[7].fase, p.piano.controllo.annullato, p.piano.controllo.esito], ['carico', 'carico', true, 'carico']);
  assert.strictEqual(a.json('settimanaProgramma().doseFissa'), undefined);
  storiaTre(a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(a.json('settimanaProgramma().fase'), 'carico', 'dopo l annulla il controllo non si ripete');
});

test('B1: non toccano il controllo i programmi senza (intermedio, prudenti) ne la regola spenta', () => {
  const inter = telefono({ d: { level: 'intermedio' }, sett: 6, giorno: 0 });
  assert.strictEqual(inter.p.piano.struttura.controllo, null);
  storiaTre(inter.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(inter.a.json('settimanaProgramma().fase'), 'scarico', 'la 6a dell intermedio e lo scarico a calendario');
  assert.strictEqual(programma(inter.a).piano.controllo, undefined);
  const over = telefono({ d: { age: 70 }, sett: 8 });
  assert.strictEqual(over.p.piano.struttura.controllo, null, 'prudente: blocchi 3+1, nessun controllo');
  const spenta = telefono();
  spenta.a.spegni(['PRN-03']);
  storiaTre(spenta.a, [FB(10), FB(10), FB(10)]);
  assert.strictEqual(spenta.a.json('settimanaProgramma().fase'), 'carico');
  assert.strictEqual(programma(spenta.a).piano.controllo, undefined);
});

test('B1: la nota del programma dice quello che il codice fa (e c e la traduzione in en, es, de)', () => {
  const { p } = telefono();
  const nota = p.note.find(n => /^Programma di 12 settimane/.test(n));
  assert.ok(nota && /il coach guarda la tua stanchezza: se sei stanco, quella settimana diventa uno scarico leggero \(serve il consenso ai dati del coach\)/.test(nota), nota);
  assert.ok(!/scarichi prima/.test(nota));
});

/* ============ M1: nessuna nota falsa (REG-02): una nota esce solo se la sua condizione e vera per QUEL programma ============ */

const GOAL_SET = [['massa'], ['forza'], ['ricomposizione'], ['dimagrimento'], ['salute'], ['glutei'], ['massa', 'forza'], ['forza', 'massa']];
const LIVELLI = ['principiante', 'intermedio', 'avanzato'], GIORNI = [2, 3, 4, 5, 6], MINUTI = [30, 45, 60, 75, 90], LUOGHI = ['palestra', 'manubri', 'corpo'];
const FASTIDI = [[], ['spalle'], ['ginocchia'], ['schiena'], ['spalle', 'schiena'], ['ginocchia', 'schiena']];
/* un campione a passo fisso della matrice del collaudo (obiettivo x livello x giorni x minuti x luogo x fastidi: 10.800 profili): ogni `passo`-esimo, con sesso ed eta che variano (un profilo su cinque over 65) */
function campioneMatrice(passo) {
  const out = []; let i = 0;
  GOAL_SET.forEach(o => LIVELLI.forEach(l => GIORNI.forEach(g => MINUTI.forEach(mi => LUOGHI.forEach(lu => FASTIDI.forEach(f => {
    if (i++ % passo === 0) out.push({ goals: o.slice(), level: l, days: g, minutes: mi, luogo: lu, fastidi: f.slice(), sex: i % 3 === 0 ? 'F' : 'M', age: i % 5 === 0 ? 70 : (i % 2 ? 25 : 45), freq: 'auto', parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], usaProfilo: false, seme: 'm1|' + i });
  }))))));
  return out;
}
const NOTE_VECCHIE = [/Realisticamente 4-6 serie/, /i limiti di serie e di esercizi per seduta non lasciano altro posto/, /Il volume sale piano/, /Chi comincia cresce di più/, /bastano per mantenere e per crescere/, /il primo esercizio veloce in salita/];

test('M1: su 1.543 profili della matrice del collaudo nessuna nota del volume, del tempo, delle tecniche o del mesociclo dice una cosa falsa', { timeout: 300000 }, () => {
  const a = caricaApp({ ora: LUNEDI });
  /* nel mondo dell app: il programma, la durata della seduta piu lunga e i minuti effettivi come li conta il programma, la classe (A-F) di ogni esercizio */
  a.g(`globalThis.__m1 = function (p) { const prog = buildProgram(p), classi = {}; prog.sedute.forEach(sd => sd.esercizi.forEach(e => { classi[e.name] = classeTecnica(e.name); }));
    return { prog: prog, classi: classi, durMax: Math.max.apply(null, prog.sedute.map(sd => durataSeduta(sd.esercizi))), minutiEff: minutiEffettivi(p.minutes, p.level) }; }`);
  const campione = campioneMatrice(7);
  assert.ok(campione.length >= 1500, 'il campione e di almeno 1.500 profili: ' + campione.length);
  const viste = { pocoTempo: 0, mantenimento: 0, tempo: 0, struttura: 0, drop: 0, potenza: 0, quattroSedute: 0, mesociclo: 0 };
  const falsi = [];
  const falso = (p, msg) => { if (falsi.length < 12) falsi.push(msg + ' | ' + JSON.stringify({ g: p.goals, l: p.level, d: p.days, m: p.minutes, lu: p.luogo, f: p.fastidi, age: p.age })); };
  campione.forEach(p => {
    const r = a.dati(a.chiama('__m1', p)), prog = r.prog, durMax = r.durMax, minutiEff = r.minutiEff;
    const note = prog.note, tutti = [].concat.apply([], prog.sedute.map(sd => sd.esercizi));
    const classe = nome => r.classi[nome];
    note.forEach(n => {
      NOTE_VECCHIE.forEach(re => { if (re.test(n)) falso(p, 'nota vecchia: ' + n); });
      if (/^Con poco tempo conta il lavoro essenziale/.test(n)) {
        viste.pocoTempo++;
        if (!(p.minutes <= 30 || (p.days <= 2 && p.minutes <= 45))) falso(p, 'poco tempo senza poco tempo: ' + p.days + ' giorni, ' + p.minutes + ' minuti');
      }
      if (/non entra di più$/.test(n)) {
        viste.tempo++;
        if (durMax < minutiEff * 0.75 - 1e-9) falso(p, 'non entra di piu ma la seduta piu lunga usa ' + Math.round(durMax) + ' minuti su ' + minutiEff + ': ' + n);
      }
      if (/non c’è un altro posto adatto$/.test(n)) viste.struttura++;
      if (/^Con questi minuti è un programma di mantenimento/.test(n)) {
        viste.mantenimento++;
        if (durMax < minutiEff * 0.75 - 1e-9) falso(p, 'mantenimento con la seduta piu lunga a ' + Math.round(durMax) + ' minuti su ' + minutiEff);
        if (!note.some(x => /non entra di più$/.test(x))) falso(p, 'mantenimento senza la causa «tempo»');
      }
      if (/drop set sull ultimo isolamento/.test(n)) {
        viste.drop++;
        if (!tutti.some(e => e.tecnica === 'drop' && ['D', 'E'].indexOf(classe(e.name)) !== -1)) falso(p, 'drop set sull ultimo isolamento ma nessun drop su un isolamento');
      }
      if (/un esercizio alla macchina veloce in salita per la potenza/.test(n)) {
        viste.potenza++;
        if (!tutti.some(e => e.tecnica === 'potenza' && classe(e.name) === 'C')) falso(p, 'potenza alla macchina senza una potenza su una macchina');
      }
      if (/^A chi comincia bastano 4 sedute/.test(n)) {
        viste.quattroSedute++;
        if (!(p.level === 'principiante' && p.days >= 5 && prog.sedute.length === 4)) falso(p, '4 sedute: ' + p.level + ', ' + p.days + ' giorni, ' + prog.sedute.length + ' sedute');
      }
      if (/^Mesociclo: /.test(n)) viste.mesociclo++;
    });
    /* i drop set sono sugli isolamenti (D, E): MAV-13 */
    tutti.forEach(e => { if (e.tecnica === 'drop' && ['D', 'E'].indexOf(classe(e.name)) === -1) falso(p, 'drop set su ' + e.name + ' (classe ' + classe(e.name) + ')'); });
  });
  /* il controllo non e vuoto: le note ci sono, e il campione le esercita tutte */
  /* P4-S (ETA-08 parte a, D-P21 n. 5): con sicurezza/popolazioni.js la potenza (e la sua nota) non c'e nei programmi nuovi degli over 65; senza, come prima */
  const p4s = a.g("typeof potenzaAmmessaOver65 === 'function'");
  assert.ok(viste.pocoTempo >= 100 && viste.tempo >= 20 && viste.struttura >= 20 && viste.drop >= 20 && (p4s ? viste.potenza === 0 : viste.potenza >= 20) && viste.quattroSedute >= 20 && viste.mesociclo >= 100, JSON.stringify(viste));
  assert.deepStrictEqual(falsi, [], 'note false: ' + falsi.join('\n'));
});

test('M1: riconciliaNote guarda la scheda finale: «drop set sull ultimo isolamento» senza un drop su un isolamento e «un esercizio alla macchina veloce in salita» senza potenza tornano alla frase vera', () => {
  const a = caricaApp({ ora: LUNEDI });
  const es = (name, tecnica, superset) => ({ name: name, sets: 3, reps: 10, rest: 90, tecnica: tecnica, superset: superset });
  const prova = (sedute, note) => a.json('riconciliaNote({ sedute: ' + JSON.stringify(sedute) + ', note: ' + JSON.stringify(note) + ' }).note');
  const DROP = a.json('NOTA_POCO_TEMPO_SS_DROP'), SS = a.json('NOTA_POCO_TEMPO_SS'), POT = a.json('NOTA_OVER65_POTENZA'), SENZA = a.json('NOTA_OVER65');
  const coppia = [es('Panca Piana Bilanciere'), es('Rematore con Manubrio', undefined, true)];
  assert.deepStrictEqual(prova([{ esercizi: coppia.concat([es('Lat Machine', 'drop')]) }], [DROP]), [SS], 'drop su un multiarticolare (Lat Machine): la nota non lo dice piu');
  assert.deepStrictEqual(prova([{ esercizi: coppia }], [DROP]), [SS], 'nessun drop: la nota non lo dice');
  assert.deepStrictEqual(prova([{ esercizi: coppia.concat([es('Curl Bilanciere Bicipiti', 'drop')]) }], [DROP]), [DROP], 'drop su un isolamento: resta');
  assert.deepStrictEqual(prova([{ esercizi: [es('Leg Press')] }], [POT]), [SENZA], 'nessuna potenza: la frase senza la potenza');
  assert.deepStrictEqual(prova([{ esercizi: [es('Leg Press', 'potenza')] }], [POT]), [POT]);
});

/* ============ M5: chi comincia non ha mai RIR 0, in nessun percorso; i minorenni mai sotto 2 ============ */

const ES_CLASSI = { A: 'Squat con Bilanciere', B: 'Panca Piana Manubri', C: 'Leg Press', D: 'Leg Extension', E: 'Curl Bilanciere Bicipiti', F: 'Plank' };
/* il bersaglio base di ogni esercizio di prova in ogni settimana 1..12 */
function rirDiTutte(a) {
  const out = {};
  Object.keys(ES_CLASSI).forEach(c => { out[c] = []; for (let w = 1; w <= 12; w++) out[c].push(a.json('rirBersaglioBase(' + JSON.stringify(ES_CLASSI[c]) + ', ' + w + ')')); });
  return out;
}
const programmaDa = (a, d, extra) => {
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, d)));
  a.programma(Object.assign({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, versione: 2, piano: p.piano, schema: { sets: 3, reps: 10 }, seme: 'int2d' }, extra || {}));
  return p;
};

test('M5: piano da intermedio salvato e livello poi cambiato in «principiante»: mai sotto 2 ripetizioni in riserva (prima [0, 1] sugli isolamenti alla 5a settimana), 3-4 alla 1a e alla 2a', () => {
  const a = caricaApp({ ora: LUNEDI });
  programmaDa(a, { level: 'intermedio', days: 4, age: 30 });
  a.profilo({ level: 'intermedio', age: 30 });
  assert.deepStrictEqual(a.json('rirBersaglioBase("Curl Bilanciere Bicipiti", 5)'), [0, 1], 'di controllo: l intermedio arriva a [0, 1] sugli isolamenti alla 5a settimana');
  a.profilo({ level: 'principiante', age: 30 });
  const r = rirDiTutte(a);
  Object.keys(r).forEach(c => r[c].forEach((x, i) => assert.ok(x[0] >= 2 && x[1] > x[0], 'classe ' + c + ' settimana ' + (i + 1) + ': ' + JSON.stringify(x))));
  assert.deepStrictEqual(r.E[4], [2, 3], 'alla 5a settimana: 2-3');
  assert.deepStrictEqual([r.E[0], r.E[1]], [[3, 4], [3, 4]], 'alla 1a e alla 2a: 3-4');
  assert.deepStrictEqual(r.A[7], [2, 3]);
});

test('M5: programma salvato dalla v1 (senza piano e senza rirSett) e piano da principiante: chi comincia non scende sotto 2, nemmeno con la tabella spenta', () => {
  const a = caricaApp({ ora: LUNEDI });
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: 8, blocco: 8, fasi: ['carico', 'carico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico'], goals: ['massa'], prefs: {}, split: 'Full body' });
  a.profilo({ level: 'principiante', age: 30 });
  a.ora(new Date(2026, 10, 2, 12, 0, 0));   /* settimana 5 */
  [false, true].forEach(spenta => {
    if (spenta) a.spegni(['MES-02']);
    const r = rirDiTutte(a);
    Object.keys(r).forEach(c => r[c].forEach((x, i) => assert.ok(x[0] >= 2, (spenta ? 'MES-02 spenta, ' : 'v1, ') + 'classe ' + c + ' settimana ' + (i + 1) + ': ' + JSON.stringify(x))));
  });
  a.riaccendi();
  const b = caricaApp({ ora: LUNEDI });
  programmaDa(b, { level: 'principiante', days: 3 });
  b.profilo({ level: 'principiante', age: 30 });
  const r2 = rirDiTutte(b);
  Object.keys(r2).forEach(c => r2[c].forEach((x, i) => assert.deepStrictEqual(x, i < 2 || i === 11 ? [3, 4] : [2, 3], 'piano da principiante: classe ' + c + ' settimana ' + (i + 1))));
});

test('M5: i minorenni non scendono mai sotto 2 ripetizioni in riserva, anche con un piano da adulto salvato e l eta poi cambiata', () => {
  const a = caricaApp({ ora: LUNEDI });
  programmaDa(a, { level: 'avanzato', days: 4, age: 30 });
  a.profilo({ level: 'avanzato', age: 15 });
  const r = rirDiTutte(a);
  Object.keys(r).forEach(c => r[c].forEach((x, i) => assert.ok(x[0] >= 2, 'classe ' + c + ' settimana ' + (i + 1) + ': ' + JSON.stringify(x))));
});

/* ============ M7 (sicurezza) e minori ============ */

test('M7: con un fastidio dichiarato nessun isolamento che carica quella zona va oltre 4 serie in una seduta (prima Leg Extension a 5 e 6 serie con le ginocchia dolenti)', () => {
  const a = caricaApp({ ora: LUNEDI });
  a.g(`globalThis.__f = function (p) { const prog = buildProgram(p), out = [];
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => { const m = findExercise(e.name) || {}; if (m.type !== 'compound' && !isTimeBased(e.name) && esercizioCaricaIlFastidio(e.name, p.fastidi)) out.push(e.sets); }));
    return out; }`);
  const base = { sex: 'M', age: 30, freq: 'auto', parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], usaProfilo: false };
  const profili = [
    { goals: ['massa'], level: 'intermedio', days: 4, minutes: 90, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'f124' },
    { goals: ['massa'], level: 'avanzato', days: 4, minutes: 90, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'f196' },
    { goals: ['ricomposizione'], level: 'avanzato', days: 4, minutes: 60, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'f388' },
    { goals: ['ricomposizione'], level: 'avanzato', days: 4, minutes: 90, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'f412' },
    { goals: ['massa'], level: 'avanzato', days: 5, minutes: 75, luogo: 'palestra', fastidi: ['spalle'], seme: 'sp1' },
    { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: ['spalle', 'schiena'], seme: 'sp2' },
    /* P4-F (REC-04): con le eccezioni per le ginocchia (Squat su Scatola, Step-up Basso, Sit-to-Stand) il sorteggio dei posti cambia: f388 non ha piu la Leg Extension e f412 ne ha 3 serie, e i quattro
       isolamenti della prova scendevano a 3 («la prova non e vuota»). Due profili in piu con le ginocchia dolenti, avanzati, che la Leg Extension a 4 serie la hanno: il tetto di 4 si prova ancora */
    { goals: ['massa'], level: 'avanzato', days: 4, minutes: 90, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'm7-1' },
    { goals: ['massa'], level: 'avanzato', days: 4, minutes: 90, luogo: 'palestra', fastidi: ['ginocchia'], seme: 'm7-2' }
  ].map(p => Object.assign({}, base, p));
  let isolamenti = 0;
  profili.forEach(p => { const serie = a.json('__f(' + JSON.stringify(p) + ')'); isolamenti += serie.length; assert.ok(serie.every(n => n <= 4), JSON.stringify(p.goals) + ' ' + p.level + ' ' + p.fastidi + ': isolamenti che caricano la zona a ' + serie.join(', ') + ' serie'); });
  assert.ok(isolamenti >= 4, 'la prova non e vuota: ' + isolamenti + ' isolamenti che caricano una zona dolente');
  assert.strictEqual(a.json('SOGLIE_VOLUME.serieMaxIsolamentoConFastidio.v'), 4);
  /* senza fastidi il tetto degli isolamenti resta quello di prima (6): la regola non tocca chi non ha fastidi */
  assert.strictEqual(a.json('SOGLIE_VOLUME.serieMaxEsercizio.v.isolamento'), 6);
});

test('minor 2: il core (classe F) non scende mai a RIR 0 nel piano (MAV-02: sul core non serve il cedimento); prima [0, 1] alla 5ª settimana dell intermedio', () => {
  const a = caricaApp({ ora: LUNEDI });
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { level: 'intermedio', days: 4 })));
  const carico = p.piano.settimane.filter(w => w.fase === 'carico');
  assert.ok(carico.length >= 10, 'settimane di carico: ' + carico.length);
  carico.forEach(w => assert.ok(w.rir.F[0] >= 1, 'settimana ' + w.n + ' classe F: ' + JSON.stringify(w.rir.F)));
  assert.deepStrictEqual(p.piano.settimane[4].rir.E, [0, 1], 'gli isolamenti (classe E) alla 5a settimana restano a [0, 1]: il pavimento e solo del core');
  assert.deepStrictEqual(p.piano.settimane[4].rir.F, [1, 2], 'il core alla 5a settimana: [1, 2]');
  assert.strictEqual(a.json('SOGLIE_STRUTTURA.pavimentoCore.v'), 1);
});

test('minor 4: le tre frasi del piano settimana per settimana hanno la traduzione in en, es e de, come i pezzi che le compongono', () => {
  const vm = require('vm'), fs = require('fs'), path = require('path');
  const R = path.join(__dirname, '..');
  const dic = {};
  ['en', 'es', 'de'].forEach(l => { const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, 'js/lingue/' + l + '.js'), 'utf8'), ctx); dic[l] = ctx.window.I18N[l]; });
  const frasi = ['Controllo: con fatica media o alta, o un segnale di stanchezza, questa settimana diventa uno scarico leggero', 'Verifica: meno serie, stesso carico, per fare il punto', 'Scarico: meno serie e carichi più leggeri, sempre sul carico che avevi prima dello scarico'];
  const a = caricaApp({ ora: LUNEDI });
  const note = new Set(); ['principiante', 'intermedio'].forEach(level => a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { level: level }))).piano.settimane.forEach(w => { if (w.nota) note.add(w.nota); }));
  frasi.forEach(f => assert.ok(note.has(f), 'la frase e nel piano: ' + f));
  frasi.forEach(f => f.split(/: |, /).forEach(pezzo => ['en', 'es', 'de'].forEach(l => assert.ok(dic[l][pezzo] || dic[l][pezzo.replace(/\d+/g, '#')], l + ': manca «' + pezzo + '»'))));
});
