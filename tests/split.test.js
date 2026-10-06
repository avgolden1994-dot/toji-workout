/* W2-T5, split, giorni e attrezzi (PRG-02, OBI-01, OBI-07, CAS-01, CAS-10, ETA-05): prove in node con l app vera in vm (tests/aiuto-app.js).
   Misurato sul codice di coach-v2-onda-2d (collaudo, matrice rapida, criteri 1.5, % pesata): REC-01 schiena 2,2, spalle 1,6 (la frequenza 3 con 4 o 5 giorni mette il full body il giorno prima
   di un upper; push/pull/legs + upper/lower mette push e pull in giorni consecutivi). Le prove sui giorni falliscono su da05947 (nessuna ricerca dei giorni senza conflitti).
   Il file delle soglie (js/coach/programma/soglie-split.js) lo mette nell index.html l integrazione (docs/in-arrivo/W2-T5.json): finche non c e, la prova lo carica da sola. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const R = path.join(__dirname, '..');
function caricaConSoglie() {
  const a = caricaApp({ ora: LUNEDI });
  if (a.g('typeof SOGLIE_SPLIT') === 'undefined') vm.runInContext(fs.readFileSync(path.join(R, 'js/coach/programma/soglie-split.js'), 'utf8'), a.ctx, { filename: 'js/coach/programma/soglie-split.js' });
  return a;
}
/* giorniSettimana su un brief finto: { indici, tipi (come restano nella divisione), note } */
function giorni(a, tipi, giorniDichiarati, opz) {
  const o = Object.assign({ livello: 'intermedio', metodo: null, priorita: [] }, opz || {});
  return a.json('(function () { const brief = { agenda: { giorni: ' + giorniDichiarati + ' }, chi: { livello: ' + JSON.stringify(o.livello) + ' }, metodo: { attivo: ' + JSON.stringify(o.metodo) + ' }, lavoro: { note: [], split: null, prefs: { priorita: ' + JSON.stringify(o.priorita) + ' } } };' +
    'const split = { nome: "prova", giorni: ' + JSON.stringify(tipi) + ' }; brief.lavoro.split = split; const indici = giorniSettimana(brief, split); return { indici: indici, tipi: brief.lavoro.split.giorni, note: brief.lavoro.note }; })()');
}

test('PRG-02: frequenza 3 con 4 giorni (full body, upper, lower, full body): i due full body non stanno accanto a niente (lunedi, mercoledi, giovedi, sabato)', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4);
  assert.deepStrictEqual(r.indici, [0, 2, 3, 5], 'prima: lunedi-martedi-giovedi-venerdi, full body e upper in giorni di fila');
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody'], 'l ordine della divisione resta quello scelto');
  assert.deepStrictEqual(r.note, [], 'nessuna nota: dice il vero la scheda finale, non il tipo di seduta');
});

test('PRG-02: push/pull/legs + upper/lower (5 giorni): push, pull e legs non sono consecutivi, quattro giorni di fila al massimo', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['push', 'pull', 'legs', 'upper', 'lower'], 5);
  assert.deepStrictEqual(r.indici, [0, 2, 4, 5, 6], 'lunedi push, mercoledi pull, venerdi legs, sabato upper, domenica lower: la seduta di tirata ha anche lo stacco rumeno, quindi anche pull e legs non stanno accanto');
  assert.deepStrictEqual(r.tipi, ['push', 'pull', 'legs', 'upper', 'lower']);
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
});

test('PRG-02: frequenza 3 con 5 giorni (upper, lower, full body, upper, lower): il full body sta da solo tra due giorni di riposo, sabato e lunedi non sono mai di fila con lo stesso muscolo', () => {
  const a = caricaConSoglie();
  const tipi = ['upper', 'lower', 'fullbody', 'upper', 'lower'];
  const r = giorni(a, tipi, 5);
  assert.deepStrictEqual(r.tipi, tipi, 'stesso ordine');
  assert.strictEqual(a.json('conflittiDeiGiorni(' + JSON.stringify(r.tipi) + ', ' + JSON.stringify(r.indici) + ', { priorita: [] })'), 0, JSON.stringify(r));
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
  assert.strictEqual(r.indici.length, 5);
});

test('PRG-02: push/pull/legs con i punti deboli (frequenza 1, 4 giorni): push e pull non sono consecutivi', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['push', 'pull', 'legs', 'punti'], 4);
  assert.deepStrictEqual(r.indici, [0, 2, 4, 5]);
  assert.deepStrictEqual(r.tipi, ['push', 'pull', 'legs', 'punti']);
  /* le priorita dichiarate cambiano cosa lavora il giorno dei punti deboli: con le gambe il giorno dopo legs e un conflitto, e la ricerca lo evita */
  const g = giorni(a, ['push', 'pull', 'legs', 'punti'], 4, { priorita: ['gambe'] });
  assert.strictEqual(a.json('conflittiDeiGiorni(' + JSON.stringify(g.tipi) + ', ' + JSON.stringify(g.indici) + ', { priorita: ["gambe"] })'), 0, JSON.stringify(g));
});

test('PRG-02: dove i giorni di sempre non hanno conflitti non cambia niente (2 giorni, 3 giorni, upper/lower x2, 5 giorni di chi sceglie la frequenza 2)', () => {
  const a = caricaConSoglie();
  assert.deepStrictEqual(giorni(a, ['fullbody', 'fullbody'], 2).indici, [0, 3]);
  assert.deepStrictEqual(giorni(a, ['fullbody', 'fullbody', 'fullbody'], 3).indici, [0, 2, 4]);
  assert.deepStrictEqual(giorni(a, ['upper', 'lower', 'fullbody'], 3).indici, [0, 2, 4]);
  assert.deepStrictEqual(giorni(a, ['upper', 'lower', 'upper', 'lower'], 4).indici, [0, 1, 3, 4], 'upper e lower in giorni di fila non hanno grandi muscoli in comune');
});

test('PRG-02: un metodo famoso tiene la sua struttura e i giorni di sempre', () => {
  const a = caricaConSoglie();
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4, { metodo: { id: 'phul' } });
  assert.deepStrictEqual(r.indici, [0, 1, 3, 4]);
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody']);
});

test('PRG-02: quando i conflitti non si possono togliere del tutto la ricerca li riduce, riordina solo se serve, non supera i 4 giorni di fila e tiene le stesse sedute', () => {
  const a = caricaConSoglie();
  const tipi = ['push', 'pull', 'push', 'pull', 'legs'];
  const prima = a.json('conflittiDeiGiorni(' + JSON.stringify(tipi) + ', [0, 1, 3, 4, 5], { priorita: [] })');
  const r = giorni(a, tipi, 5);
  const dopo = a.json('conflittiDeiGiorni(' + JSON.stringify(r.tipi) + ', ' + JSON.stringify(r.indici) + ', { priorita: [] })');
  assert.ok(dopo < prima, 'conflitti ' + prima + ' -> ' + dopo);
  assert.deepStrictEqual(r.tipi.slice().sort(), tipi.slice().sort());
  assert.ok(a.json('giorniDiFilaCiclici(' + JSON.stringify(r.indici) + ')') <= 4);
  assert.deepStrictEqual(r.indici.slice().sort((x, y) => x - y), r.indici, 'giorni in ordine');
  assert.strictEqual(new Set(r.indici).size, 5);
});

/* finche l integrazione non mette soglie-split.js nell index.html, il generatore tiene i giorni di sempre: nessuna ricerca, nessun errore (dopo l integrazione la prova si salta) */
test('PRG-02: senza il file delle soglie i giorni restano quelli di sempre', { skip: caricaApp({ ora: LUNEDI }).g('typeof SOGLIE_SPLIT') !== 'undefined' }, () => {
  const a = caricaApp({ ora: LUNEDI });
  const r = giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4);
  assert.deepStrictEqual(r.indici, [0, 1, 3, 4]);
  assert.deepStrictEqual(r.tipi, ['fullbody', 'upper', 'lower', 'fullbody']);
});

/* ---------------------------------------------------------------- programmi veri ---------------------------------------------------------------- */
const GRUPPI_REC = { petto: ['petto'], schiena: ['schiena'], quadricipiti: ['quadricipiti'], femorali: ['femorali'], glutei: ['glutei'], spalle: ['deltoidi_laterali', 'deltoidi_posteriori', 'deltoidi_anteriori'] };
/* i giorni di allenamento di fila sulla settimana ad anello (indici di DAYS) */
function giorniDiFila(indici) {
  const set = [0, 1, 2, 3, 4, 5, 6].map(i => indici.indexOf(i) !== -1), riposo = set.indexOf(false);
  if (riposo === -1) return 7;
  let max = 0, corsa = 0;
  for (let k = 1; k <= 7; k++) { if (set[(riposo + k) % 7]) { corsa++; max = Math.max(max, corsa); } else corsa = 0; }
  return max;
}
function installaMisura(a) {
  a.g('globalThis.__recSett = function (p) { const prog = buildProgram(p); const out = []; const GR = ' + JSON.stringify(GRUPPI_REC) + ';' +
    'const frac = (sd, g) => GR[g].reduce((t, x) => t + frazGruppoSeduta(sd, x), 0);' +
    'prog.sedute.forEach((x, i) => prog.sedute.forEach((y, j) => { if (j <= i || !giorniAdiacenti(DAYS.indexOf(x.giorno), DAYS.indexOf(y.giorno))) return;' +
    'Object.keys(GR).forEach(g => { if (frac(x, g) >= 4 && frac(y, g) >= 4) out.push(g + ": " + x.giorno + " (" + x.tipo + ") e " + y.giorno + " (" + y.tipo + ")"); }); }));' +
    'return { conflitti: out, giorni: prog.sedute.map(s => s.giorno.slice(0, 3) + ":" + s.tipo), indici: prog.sedute.map(s => DAYS.indexOf(s.giorno)) }; }');
}
test('REC-01 (collaudo) su programmi veri: con 4 e 5 giorni nessun grande muscolo (spalle comprese) e a fondo in due giorni consecutivi, e i giorni di fila non superano 4', { timeout: 280000 }, () => {
  const a = caricaConSoglie();
  installaMisura(a);
  const brutti = [];
  let tot = 0, i = 0;
  ['3', 'auto', '2', '1'].forEach(freq => [4, 5].forEach(days => ['principiante', 'intermedio', 'avanzato'].forEach(level => [30, 45, 75].forEach(minutes => ['palestra', 'manubri'].forEach(luogo => ['massa', 'forza'].forEach(goal => {
    const p = { goals: [goal], level: level, days: days, minutes: minutes, luogo: luogo, fastidi: [], sex: 'M', age: 30, freq: freq, parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], usaProfilo: false, seme: 'split' + (i++) };
    const r = a.dati(a.chiama('__recSett', p)); tot++; r.run = giorniDiFila(r.indici);
    if (r.run > 4 || r.conflitti.length) brutti.push([freq + ' freq', days + 'g', level, minutes + 'min', luogo, goal].join(' ') + ' :: ' + r.giorni.join(' ') + ' :: ' + r.conflitti.concat(r.run > 4 ? ['giorni di fila ' + r.run] : []).join('; '));
  }))))));
  assert.strictEqual(tot, 288);
  assert.deepStrictEqual(brutti.slice(0, 6), [], 'programmi con un conflitto o oltre 4 giorni di fila: ' + brutti.length);
});

/* ---------------------------------------------------------------- CAS-01: gli attrezzi dichiarati ---------------------------------------------------------------- */
const BASE = { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, fastidi: [], sex: 'M', age: 30, freq: 'auto', parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], usaProfilo: false, seme: 'attrezzi' };
const con = (extra) => Object.assign({}, BASE, extra);

test('CAS-01: attrezziDichiarati ripulisce e rende coerenti i tre campi con il luogo (manubri sempre in casa coi manubri, mai a corpo libero, kg solo coi manubri, extra solo in palestra)', () => {
  const a = caricaConSoglie();
  const f = (d, p) => a.json('attrezziDichiarati(' + JSON.stringify(d) + ', ' + JSON.stringify(p || {}) + ')');
  assert.deepStrictEqual(f({ luogo: 'manubri' }), { attrezziCasa: null, manubriKg: null, extraPalestra: null }, 'chi non risponde: tutto null (come prima)');
  assert.deepStrictEqual(f({ luogo: 'manubri', attrezziCasa: ['kettlebell', 'sbarra', 'inventato'], manubriKg: 12.3 }), { attrezziCasa: ['sbarra', 'kettlebell', 'manubri'], manubriKg: 12.5, extraPalestra: null }, 'id noti, ordine fisso, i manubri ci sono, kg al mezzo chilo');
  assert.deepStrictEqual(f({ luogo: 'corpo', attrezziCasa: ['manubri', 'elastico'], manubriKg: 20, extraPalestra: ['anelli'] }), { attrezziCasa: ['elastico'], manubriKg: null, extraPalestra: null }, 'a corpo libero niente manubri ne kg ne extra della palestra');
  assert.deepStrictEqual(f({ luogo: 'palestra', attrezziCasa: ['sbarra'], manubriKg: 20, extraPalestra: ['anelli', 'kettlebell', 'x'] }), { attrezziCasa: null, manubriKg: null, extraPalestra: ['kettlebell', 'anelli'] });
  assert.deepStrictEqual(f({ luogo: 'palestra', extraPalestra: [] }).extraPalestra, [], '«nessuno di questi» e una risposta: elenco vuoto, non null');
  assert.deepStrictEqual(f({ luogo: 'manubri', manubriKg: 0 }).manubriKg, null);
  assert.deepStrictEqual(f({ luogo: 'manubri', manubriKg: 500 }).manubriKg, null, 'oltre il limite del campo (100 kg) non e un manubrio');
  assert.deepStrictEqual(f({ luogo: 'manubri', manubriKg: 'abc' }).manubriKg, null);
  assert.deepStrictEqual(f({ luogo: 'manubri' }, { luogo: 'manubri', attrezziCasa: ['panca'], manubriKg: 16 }), { attrezziCasa: ['panca', 'manubri'], manubriKg: 16, extraPalestra: null }, 'dal profilo salvato se le risposte non li dicono');
  assert.deepStrictEqual(f({ luogo: 'manubri', attrezziCasa: [] }, { attrezziCasa: ['panca'] }).attrezziCasa, ['manubri'], 'le risposte vincono sul profilo');
});

test('CAS-01: il brief porta i tre campi (agenda.attrezziCasa, agenda.manubriKg, agenda.extraPalestra) e le preferenze li passano a consentito solo se detti; chi non risponde ha le prefs di sempre', () => {
  const a = caricaConSoglie();
  const brief = (d) => a.json('(function () { const b = briefCoach(' + JSON.stringify(d) + ', {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); return { agenda: b.agenda, prefs: prefsDelBrief(b) }; })()');
  const casa = brief(con({ luogo: 'manubri', attrezziCasa: ['sbarra', 'panca'], manubriKg: 14 }));
  assert.deepStrictEqual([casa.agenda.attrezziCasa, casa.agenda.manubriKg, casa.agenda.extraPalestra], [['sbarra', 'panca', 'manubri'], 14, null]);
  assert.deepStrictEqual([casa.prefs.attrezziCasa, casa.prefs.manubriKg, 'extraPalestra' in casa.prefs], [['sbarra', 'panca', 'manubri'], 14, false]);
  const pal = brief(con({ luogo: 'palestra', extraPalestra: ['kettlebell'] }));
  assert.deepStrictEqual([pal.agenda.attrezziCasa, pal.agenda.manubriKg, pal.agenda.extraPalestra], [null, null, ['kettlebell']]);
  assert.deepStrictEqual(pal.prefs.extraPalestra, ['kettlebell']);
  const niente = brief(con({ luogo: 'manubri' }));
  assert.deepStrictEqual([niente.agenda.attrezziCasa, niente.agenda.manubriKg, niente.agenda.extraPalestra], [null, null, null]);
  assert.deepStrictEqual(Object.keys(niente.prefs), ['luogo', 'fastidi', 'sonno', 'attrezzi', 'attrezziPalestra', 'graditi', 'odiati', 'priorita', 'esclusi'], 'nessuna chiave nuova senza risposta: i programmi di chi non risponde non cambiano');
  /* il campo agenda.attrezziPalestra di prima non cambia (contratto: solo aggiunte) */
  assert.deepStrictEqual(brief(con({ luogo: 'palestra', attrezziPalestra: ['bilanciere', 'manubri'] })).agenda.attrezziPalestra, ['bilanciere', 'manubri']);
  /* ... e arrivano nel programma salvato (prog.prefs) */
  const prog = a.dati(a.chiama('buildProgram', con({ luogo: 'manubri', attrezziCasa: ['panca'], manubriKg: 20 })));
  assert.deepStrictEqual([prog.prefs.attrezziCasa, prog.prefs.manubriKg], [['panca', 'manubri'], 20]);
});

test('CAS-01: il profilo salvato dopo «Crea il programma» ha i campi dichiarati, e solo quelli; le sostituzioni (prefsCoach, prefsOccupato) li ricevono', () => {
  const a = caricaConSoglie();
  a.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(con({ luogo: 'manubri', attrezziCasa: ['sbarra'], manubriKg: 18, sex: 'uomo', goal: 'massa' })) + ')');
  a.g('applyGeneratedProgram()');
  const salvato = a.leggi(a.chiave('PROFILE_KEY'));
  assert.deepStrictEqual([salvato.attrezziCasa, salvato.manubriKg, 'extraPalestra' in salvato], [['sbarra', 'manubri'], 18, false]);
  assert.deepStrictEqual(a.json('(function () { const p = prefsCoach(); return [p.attrezziCasa, p.manubriKg, "extraPalestra" in p]; })()'), [['sbarra', 'manubri'], 18, false]);
  assert.deepStrictEqual(a.json('(function () { const p = prefsOccupato(); return [p.attrezziCasa, p.manubriKg]; })()'), [['sbarra', 'manubri'], 18]);
  /* chi non risponde: nessuna chiave nel profilo */
  const b = caricaConSoglie();
  b.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(con({ luogo: 'palestra', sex: 'uomo', goal: 'massa' })) + ')');
  b.g('applyGeneratedProgram()');
  const s2 = b.leggi(b.chiave('PROFILE_KEY'));
  assert.deepStrictEqual(['attrezziCasa' in s2, 'manubriKg' in s2, 'extraPalestra' in s2], [false, false, false]);
  /* rifare il programma dal profilo tiene quello che era stato detto */
  a.g('onbData = Object.assign(nuovoOnbData(), { goals: ["massa"], goal: "massa", level: "intermedio", days: 3, minutes: 60, luogo: "manubri", sonno: "bene", attrezzi: "indifferente", sex: "uomo", age: 30, parq: "no", freq: "auto" })');
  assert.deepStrictEqual(a.json('[onbData.attrezziCasa, onbData.manubriKg]'), [['sbarra', 'manubri'], 18], 'nuovoOnbData riparte dal profilo');
});

test('CAS-01 (onboarding): la domanda sugli attrezzi cambia con il luogo; i tocchi scrivono i campi del brief; i manubri a corpo libero non ci sono', () => {
  const a = caricaConSoglie();
  const html = (luogo) => { a.g('onbData = Object.assign(nuovoOnbData(), { luogo: ' + JSON.stringify(luogo) + ', attrezziPalestra: undefined, attrezziCasa: undefined, extraPalestra: undefined, manubriKg: undefined })'); return a.g('htmlAttrezziOnboarding()'); };
  const pal = html('palestra');
  assert.ok(/Cosa c’è nella tua palestra\?/.test(pal) && /onbToggleAttrezzoPalestra\('bilanciere'\)/.test(pal) && /onbToggleExtraPalestra\('kettlebell'\)/.test(pal) && /onbToggleExtraPalestra\('anelli'\)/.test(pal) && /onbToggleExtraPalestra\('elastico'\)/.test(pal), pal);
  assert.strictEqual((pal.match(/aw-group on/g) || []).length, 4, 'senza risposta i quattro attrezzi della palestra completa sono accesi e i tre extra spenti');
  const manubri = html('manubri');
  assert.ok(/Cosa hai in casa\?/.test(manubri) && /onbToggleAttrezzoCasa\('sbarra'\)/.test(manubri) && /onbToggleAttrezzoCasa\('panca'\)/.test(manubri) && /onbToggleAttrezzoCasa\('elastico'\)/.test(manubri) && /onbToggleAttrezzoCasa\('kettlebell'\)/.test(manubri) && /onbToggleAttrezzoCasa\('anelli'\)/.test(manubri) && /Manubrio più pesante \(kg\)/.test(manubri) && /onbSetManubriKg/.test(manubri), manubri);
  assert.ok(!/onbToggleAttrezzoCasa\('manubri'\)/.test(manubri), 'i manubri sono la scelta del luogo, non un chip');
  const corpo = html('corpo');
  assert.ok(/Cosa hai in casa\?/.test(corpo) && !/Manubrio più pesante/.test(corpo) && !/onbSetManubriKg/.test(corpo), corpo);
  assert.strictEqual(html(null), '');
  /* i tocchi */
  a.g('onbData = Object.assign(nuovoOnbData(), { luogo: "manubri", attrezziCasa: undefined, manubriKg: undefined })');
  a.g('onbToggleAttrezzoCasa("panca"); onbToggleAttrezzoCasa("elastico"); onbToggleAttrezzoCasa("panca"); onbSetManubriKg("22,5")');
  assert.deepStrictEqual(a.json('[onbData.attrezziCasa, onbData.manubriKg]'), [['elastico'], 22.5]);
  a.g('onbSetManubriKg("")');
  assert.strictEqual(a.json('onbData.manubriKg'), null);
  a.g('onbData = Object.assign(nuovoOnbData(), { luogo: "palestra", attrezziPalestra: undefined, extraPalestra: undefined })');
  a.g('onbToggleAttrezzoPalestra("macchine"); onbToggleExtraPalestra("anelli")');
  assert.deepStrictEqual(a.json('[onbData.attrezziPalestra, onbData.extraPalestra]'), [['bilanciere', 'manubri', 'sbarra'], ['anelli']], 'togliere un attrezzo crea l elenco; gli extra sono una risposta a parte');
  a.g('onbToggleAttrezzoPalestra("macchine")');
  assert.strictEqual(a.json('onbData.attrezziPalestra'), null, 'tutti e quattro di nuovo accesi = palestra completa = nessun elenco, come in Opzioni');
});

test('CAS-01 (Opzioni): palestra e casa hanno ognuna il suo gruppo di attrezzi, con gli stessi campi dell onboarding', () => {
  const a = caricaConSoglie();
  const pal = a.g('htmlAttrezziCoach(' + JSON.stringify({ luogo: 'palestra', extraPalestra: ['kettlebell'] }) + ')');
  assert.ok(/Attrezzi della tua palestra/.test(pal) && /Altri attrezzi in palestra/.test(pal) && /toggleCoachLista\('extraPalestra','anelli'\)/.test(pal) && !/Attrezzi di casa/.test(pal), pal);
  const casa = a.g('htmlAttrezziCoach(' + JSON.stringify({ luogo: 'manubri', attrezziCasa: ['panca'], manubriKg: 16 }) + ')');
  assert.ok(/Attrezzi di casa/.test(casa) && /toggleCoachLista\('attrezziCasa','kettlebell'\)/.test(casa) && /setManubriKgCoach/.test(casa) && /value="16"/.test(casa) && !/Attrezzi della tua palestra/.test(casa), casa);
  assert.ok(!/setManubriKgCoach/.test(a.g('htmlAttrezziCoach(' + JSON.stringify({ luogo: 'corpo' }) + ')')));
  a.g('onbData = nuovoOnbData(); localStorage.setItem(PROFILE_KEY(), JSON.stringify({ luogo: "manubri", level: "intermedio" }))');
  a.g('toggleCoachLista("attrezziCasa", "sbarra"); toggleCoachLista("attrezziCasa", "anelli"); setManubriKgCoach("24")');
  assert.deepStrictEqual(a.json('[getProfile().attrezziCasa, getProfile().manubriKg]'), [['sbarra', 'anelli'], 24]);
  a.g('setManubriKgCoach("")');
  assert.strictEqual(a.json('"manubriKg" in getProfile()'), false);
});

/* ---------------------------------------------------------------- OBI-01, OBI-07, CAS-10, ETA-05, PRG-02 (onboarding) ---------------------------------------------------------------- */
test('OBI-01: massa e dimagrimento insieme mostrano l avviso (non bloccante) con la scelta «Usa la ricomposizione»; il tocco sostituisce i due obiettivi, e solo lui', () => {
  const a = caricaConSoglie();
  assert.strictEqual(a.g('htmlAvvisoObiettivi(["massa"])'), '');
  assert.strictEqual(a.g('htmlAvvisoObiettivi(["forza", "dimagrimento"])'), '');
  const h = a.g('htmlAvvisoObiettivi(["forza", "massa", "dimagrimento"])');
  assert.ok(/Costruire muscolo e perdere grasso insieme funziona bene se inizi o riparti/.test(h) && /Scegli una fase alla volta, oppure la ricomposizione/.test(h) && /Se li tieni entrambi, il primo che hai scelto guida il programma/.test(h) && /onbUsaRicomposizione\(\)/.test(h), h);
  /* senza il tocco, niente cambia: la scelta resta, il programma si crea (il primo guida, la fase del corpo e il deficit: OBI-02) */
  a.g('onbData = Object.assign(nuovoOnbData(), { goals: ["massa", "dimagrimento"], goal: "massa" })');
  assert.deepStrictEqual(a.json('onbData.goals'), ['massa', 'dimagrimento']);
  assert.strictEqual(a.json('faseDaObiettivi(["massa", "dimagrimento"])'), 'deficit', 'l avviso dice il vero: i passi seguono il dimagrimento anche se il primo e la massa');
  assert.ok(a.json('buildProgram(' + JSON.stringify(con({ goals: ['massa', 'dimagrimento'] })) + ').note.some(n => /^Passi: 10-12 mila/.test(n))'), 'la nota dei passi c e davvero');
  a.g('onbUsaRicomposizione()');
  assert.deepStrictEqual(a.json('onbData.goals'), ['ricomposizione']);
  assert.strictEqual(a.json('onbData.goal'), 'ricomposizione');
  a.g('onbData = Object.assign(nuovoOnbData(), { goals: ["forza", "dimagrimento", "massa"], goal: "forza" })');
  a.g('onbUsaRicomposizione()');
  assert.deepStrictEqual(a.json('onbData.goals'), ['forza', 'ricomposizione'], 'la ricomposizione prende il posto del primo dei due, gli altri obiettivi restano');
  a.g('onbData = Object.assign(nuovoOnbData(), { goals: ["salute"], goal: "salute" }); onbUsaRicomposizione()');
  assert.deepStrictEqual(a.json('onbData.goals'), ['salute'], 'senza il conflitto il tocco non fa niente');
});

test('OBI-07: «tonificare» e il sottotitolo della ricomposizione (le chiavi degli obiettivi non cambiano)', () => {
  const a = caricaConSoglie();
  const r = a.json('ONB_GOALS.find(g => g.id === "ricomposizione")');
  assert.strictEqual(r.desc, 'più muscolo, meno grasso: quello che molti chiamano tonificare');
  assert.deepStrictEqual(a.json('ONB_GOALS.map(g => g.id)'), ['massa', 'dimagrimento', 'forza', 'ricomposizione', 'salute', 'glutei']);
  /* chi sceglie la ricomposizione legge anche cosa vuol dire (e solo lui) */
  assert.ok(/Tonificare vuol dire un po’ più di muscolo e meno grasso: per farlo servono pesi che salgono piano piano, non solo tante ripetizioni\./.test(a.g('htmlNotaTonificare(["forza", "ricomposizione"])')));
  assert.strictEqual(a.g('htmlNotaTonificare(["massa"])'), '');
});

test('CAS-10: il testo dei minuti non dice piu che sotto la mezz ora lo stimolo e scarso (nessuna fonte); dice cosa fa il coach con pochi minuti', () => {
  const sorgente = fs.readFileSync(path.join(R, 'js/ui/onboarding.js'), 'utf8');
  assert.ok(!/Sotto la mezz ora lo stimolo rischia di essere scarso/.test(sorgente));
  assert.ok(/Con pochi minuti conta cosa metti: pochi esercizi completi, in coppia dove si può\./.test(sorgente));
});

test('CAS-10: metodoAmmesso accetta il metodo «minimo» a 20-45 minuti e 2-3 giorni (dati del metodo di W2-T2), non a 4 giorni e non senza il motivo', () => {
  const a = caricaConSoglie();
  const ps = 'psicoCoach({})';
  const ammesso = (c) => a.json('(function () { const m = METODI.find(x => x.id === "minimo"); return metodoAmmesso(m, Object.assign({ level: "intermedio", days: 2, minuti: 20, luogo: "palestra", goals: ["salute"], ps: ' + ps + ', mo: null, cauto: false }, ' + JSON.stringify(c) + ')); })()');
  assert.deepStrictEqual(a.json('METODI.find(x => x.id === "minimo").minuti'), [20, 45]);
  assert.deepStrictEqual(a.json('METODI.find(x => x.id === "minimo").giorni'), [2, 3]);
  assert.strictEqual(ammesso({}), true, '20 minuti, 2 giorni');
  assert.strictEqual(ammesso({ days: 3, minuti: 30 }), true, '30 minuti, 3 giorni');
  assert.strictEqual(ammesso({ days: 3, minuti: 35 }), true);
  assert.strictEqual(ammesso({ days: 4, minuti: 30 }), false, '4 giorni: non e un metodo da 2-3');
  assert.strictEqual(ammesso({ days: 2, minuti: 60 }), false, 'con 60 minuti la dose minima non serve');
});

test('PRG-02 (onboarding): chi comincia e sceglie 5 o 6 giorni legge, nel passo dei giorni, che avra 4 sedute (la stessa frase della nota del programma); gli altri non vedono niente', () => {
  const a = caricaConSoglie();
  const frase = a.g('NOTA_PRINCIPIANTE_4_SEDUTE');
  assert.strictEqual(frase, 'A chi comincia bastano 4 sedute a settimana: gli altri giorni sono riposo o una camminata.');
  ['5', '6'].forEach(n => assert.ok(a.g('htmlAvvisoGiorni("principiante", ' + n + ')').indexOf(frase) !== -1, n + ' giorni'));
  ['2', '3', '4'].forEach(n => assert.strictEqual(a.g('htmlAvvisoGiorni("principiante", ' + n + ')'), '', n + ' giorni'));
  assert.strictEqual(a.g('htmlAvvisoGiorni("intermedio", 6)'), '');
  assert.strictEqual(a.g('htmlAvvisoGiorni(null, null)'), '');
  /* e il programma fa quello che l avviso dice: 4 sedute con la stessa nota */
  [5, 6].forEach(giorni => {
    const prog = a.dati(a.chiama('buildProgram', con({ level: 'principiante', days: giorni, goals: ['salute'] })));
    assert.strictEqual(prog.sedute.length, 4, giorni + ' giorni: 4 sedute');
    assert.ok(prog.note.indexOf(frase) !== -1, giorni + ' giorni: la nota c e');
  });
});

test('ETA-05: «Bene» per il sonno e 8 ore o piu per un minorenne (13-17 anni), 7 per gli altri; l eta scritta nel passo aggiorna il testo senza ridisegnarlo', () => {
  const a = caricaConSoglie();
  const d = (eta) => a.g('descSonnoBene(' + eta + ')');
  assert.strictEqual(d(30), 'dormo 7 ore o piu, stress sotto controllo', 'identica al testo di sempre (la sua traduzione c e gia)');
  assert.strictEqual(d('null'), 'dormo 7 ore o piu, stress sotto controllo');
  assert.strictEqual(d(70), 'dormo 7 ore o piu, stress sotto controllo');
  assert.strictEqual(d(17), 'dormo 8 ore o più, stress sotto controllo');
  assert.strictEqual(d(13), 'dormo 8 ore o più, stress sotto controllo');
  assert.strictEqual(d(18), 'dormo 7 ore o piu, stress sotto controllo');
  assert.strictEqual(d(12), 'dormo 7 ore o piu, stress sotto controllo', 'sotto i 13 anni non c e programma: il testo non cambia');
  assert.deepStrictEqual(a.json('SOGLIE_SPLIT.oreSonnoBene.v'), { adulto: 7, minorenne: 8 });
});

/* i passi dell onboarding disegnati davvero (renderOnb) su un DOM finto: le funzioni sono collegate ai passi, non solo scritte */
function conDomFinto(a) {
  const els = {};
  const el = () => ({ innerHTML: '', innerText: '', textContent: '', disabled: false, style: {}, classList: { add() {}, remove() {} } });
  a.ctx.document = { getElementById: id => (els[id] = els[id] || el()), querySelector: () => null, querySelectorAll: () => [], createElement: () => el(), head: { appendChild() {} } };
  return els;
}
/* le regole spegnibili (tz_regole_spente) valgono solo se il catalogo le conosce: lo rigenera l integrazione (npm run catalogo), finche non c e la prova si salta */
const catalogoConosce = (a, codice) => !!a.json('(function () { const v = regolaDescritta("' + codice + '"); return !!(v && v.spegnibile); })()');
test('PRG-02, OBI-01, CAS-01: con la regola spenta (tz_regole_spente) tutto torna come prima: i giorni di sempre, nessun avviso, nessuna domanda ne campo', () => {
  const a = caricaConSoglie();
  if (!['PRG-02', 'OBI-01', 'CAS-01'].every(c => catalogoConosce(a, c))) return;   /* prima dell integrazione il catalogo non le ha */
  a.spegni(['PRG-02', 'OBI-01', 'CAS-01']);
  assert.deepStrictEqual(giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4).indici, [0, 1, 3, 4]);
  assert.strictEqual(a.g('htmlAvvisoObiettivi(["massa", "dimagrimento"])'), '');
  a.g('onbData = Object.assign(nuovoOnbData(), { luogo: "manubri" })');
  assert.strictEqual(a.g('htmlAttrezziOnboarding()'), '');
  assert.deepStrictEqual(a.json('attrezziDichiarati({ luogo: "manubri", attrezziCasa: ["sbarra"], manubriKg: 20 }, {})'), { attrezziCasa: null, manubriKg: null, extraPalestra: null });
  assert.ok(!/Attrezzi di casa|Altri attrezzi in palestra/.test(a.g('htmlAttrezziCoach({ luogo: "manubri" })')));
  a.riaccendi();
  assert.deepStrictEqual(giorni(a, ['fullbody', 'upper', 'lower', 'fullbody'], 4).indici, [0, 2, 3, 5]);
});
test('onboarding: i passi 0, 2, 3 e 4 mostrano l avviso massa+dimagrimento, il 4 sedute di chi comincia, il nuovo testo dei minuti e la domanda sugli attrezzi', () => {
  const a = caricaConSoglie();
  const els = conDomFinto(a);
  const passo = (n, dati) => { a.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(dati) + '); onbStep = ' + n + '; renderOnb()'); return els['onb-body'].innerHTML; };
  const p0 = passo(0, { goals: ['massa', 'dimagrimento'], goal: 'massa' });
  assert.ok(/id="onb-avviso-obiettivi"/.test(p0) && /Usa la ricomposizione/.test(p0) && /quello che molti chiamano tonificare/.test(p0) && !/onb-nota-tonificare/.test(p0), 'passo 0');
  assert.ok(/id="onb-nota-tonificare"/.test(passo(0, { goals: ['ricomposizione'], goal: 'ricomposizione' })), 'passo 0 con la ricomposizione');
  assert.ok(!/onb-avviso-obiettivi/.test(passo(0, { goals: ['massa'], goal: 'massa' })));
  assert.ok(/id="onb-avviso-giorni"/.test(passo(2, { level: 'principiante', days: 5 })), 'passo 2: principiante con 5 giorni');
  assert.ok(!/onb-avviso-giorni/.test(passo(2, { level: 'principiante', days: 3 })) && !/onb-avviso-giorni/.test(passo(2, { level: 'avanzato', days: 6 })));
  const p3 = passo(3, { minutes: 45 });
  assert.ok(/Con pochi minuti conta cosa metti/.test(p3) && !/Sotto la mezz ora/.test(p3), 'passo 3');
  assert.ok(!/20 minuti/.test(p3), 'il generatore a 20 minuti sfora il tempo (collaudo, DUR-01): l opzione non c e');
  const p4 = passo(4, { luogo: 'manubri', age: 16 });
  assert.ok(/Cosa hai in casa\?/.test(p4) && /id="onb-manubri-kg"/.test(p4), 'passo 4: casa');
  assert.ok(/id="onb-sonno-bene-desc">dormo 8 ore o più, stress sotto controllo</.test(p4), 'passo 4: sonno di un minorenne');
  assert.ok(/id="onb-sonno-bene-desc">dormo 7 ore o piu, stress sotto controllo</.test(passo(4, { luogo: 'palestra', age: 40 })), 'passo 4: sonno di un adulto');
  assert.ok(/Cosa c’è nella tua palestra\?/.test(passo(4, { luogo: 'palestra', age: 40 })), 'passo 4: palestra');
  assert.ok(!/Cosa hai in casa|Cosa c’è nella tua palestra/.test(passo(4, { luogo: null, age: 40 })), 'senza luogo nessuna domanda');
  /* l eta scritta aggiorna il testo del sonno senza ridisegnare il passo */
  a.g('onbData.age = null');
  els['onb-sonno-bene-desc'] = { textContent: '' };
  a.g('onbSetEta("15")');
  assert.strictEqual(els['onb-sonno-bene-desc'].textContent, 'dormo 8 ore o più, stress sotto controllo');
  a.g('onbSetEta("40")');
  assert.strictEqual(els['onb-sonno-bene-desc'].textContent, 'dormo 7 ore o piu, stress sotto controllo');
});
