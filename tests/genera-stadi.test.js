/* Generatore a stadi e brief (piano coach v2, onda 1, W1-T4): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso).
   Il golden (tests/genera-golden.test.js) dice che il programma di 300 profili non e cambiato; qui si prova la struttura nuova: il brief (B.2), i vincoli
   della Sentinella, il mesociclo, lo smistamento della specialita, la verifica finale, la fase del corpo (OBI-02) e l UNICO cambiamento di comportamento
   voluto: un obiettivo che il coach non conosce ancora (D-P6, es. corsa5k) produce il programma di «salute» e il profilo conserva l obiettivo dichiarato. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp, ORA, profili, TUTTI_GLI_OBIETTIVI } = require('./aiuto-genera');
const { elencoFixture } = require('./aiuto-app');
const { conSoglieStruttura } = require('./aiuto-mesociclo');

let _app = null;
const app = () => _app || (_app = conSoglieStruttura(caricaApp({ ora: ORA })));   /* W2-T4: il mesociclo v2 legge le soglie della struttura */
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'w1t4-stadi' };
const costruisci = (d, a) => (a || app()).dati((a || app()).chiama('buildProgram', Object.assign({}, BASE, d)));
const brief = (d, a) => (a || app()).chiama('briefCoach', Object.assign({}, BASE, d), {});
const stringa = x => JSON.stringify(x);

/* ---------- D-P6: obiettivi che il coach non conosce ancora ---------- */
test('D-P6: un obiettivo sconosciuto (corsa5k) produce il programma di «salute» e il programma conserva l obiettivo dichiarato', () => {
  const lista = profili(app(), 60, 'dp6');
  lista.forEach((p, i) => {
    const comune = Object.assign({}, p, { seme: 'dp6-' + i });
    const ignoto = costruisci(Object.assign({}, comune, { goals: ['corsa5k'] }));
    const salute = costruisci(Object.assign({}, comune, { goals: ['salute'] }));
    assert.deepStrictEqual(ignoto.goals, ['corsa5k'], 'il profilo conserva l obiettivo (profilo ' + i + ')');
    assert.deepStrictEqual(salute.goals, ['salute']);
    assert.strictEqual(stringa(Object.assign({}, ignoto, { goals: salute.goals })), stringa(salute), 'profilo ' + i + ': corsa5k = salute, in tutto il resto (scheda, volume, note, metodo, tecniche)');
  });
});

test('D-P6: un obiettivo sconosciuto accanto a uno noto diventa «salute» al suo posto; due sconosciuti non fanno due «salute»; i noti non cambiano', () => {
  const eq = (dichiarati, effettivi) => assert.deepStrictEqual(app().json('obiettiviEffettivi(' + stringa(dichiarati) + ')'), effettivi, stringa(dichiarati));
  eq(['corsa5k'], ['salute']);
  eq(['corsa5k', 'massa'], ['salute', 'massa']);
  eq(['massa', 'corsa5k'], ['massa', 'salute']);
  eq(['corsa5k', 'abilita'], ['salute']);
  eq(['corsa5k', 'salute'], ['salute']);
  eq(['massa', 'forza', 'glutei'], ['massa', 'forza', 'glutei']);
  eq(['massa', 'massa'], ['massa', 'massa']);
  /* il programma con due obiettivi usa quelli effettivi: corsa5k + massa = salute + massa (salute guida, la massa corregge) */
  const a = costruisci({ goals: ['corsa5k', 'massa'] }), b = costruisci({ goals: ['salute', 'massa'] });
  assert.deepStrictEqual(a.goals, ['corsa5k', 'massa']);
  assert.strictEqual(stringa(Object.assign({}, a, { goals: b.goals })), stringa(b));
  assert.strictEqual(a.scheme.isoMassa, true);
  assert.strictEqual(costruisci({ goals: ['sport', 'abilita'] }).scheme.sets, 3, 'lo schema di salute: 3 serie');
});

test('D-P6: gli obiettivi noti del generatore sono quelli che la schermata offre (ONB_GOALS) e non un id in piu o in meno', () => {
  const noti = app().json('OBIETTIVI_NOTI').sort(), offerti = app().json('ONB_GOALS.map(g => g.id)').sort();
  assert.deepStrictEqual(noti, offerti);
  assert.deepStrictEqual(noti, TUTTI_GLI_OBIETTIVI.slice().sort());
});

test('D-P6: il profilo salvato dopo «Crea il programma» conserva l obiettivo dichiarato (corsa5k), il programma e quello di salute', () => {
  const a = caricaApp({ ora: ORA });
  a.ctx.__d = a.g('JSON.parse(' + stringa(stringa(Object.assign({}, BASE, { goals: ['corsa5k'], goal: 'corsa5k', usaProfilo: undefined, parq: 'no', sonno: 'bene', attrezzi: 'indifferente', inizio: 'questa', test: {}, psico: {} }))) + ')');
  a.g('onbData = __d');
  try { a.g('applyGeneratedProgram()'); } catch (e) { /* le schermate (DOM finto) possono lamentarsi DOPO aver scritto profilo e programma: contano i dati salvati */ }
  const profilo = a.leggi(a.chiave('PROFILE_KEY')), progr = a.leggi(a.chiave('progKey'));
  assert.ok(profilo && progr, 'profilo e programma salvati');
  assert.deepStrictEqual(profilo.goals, ['corsa5k']);
  assert.strictEqual(profilo.goal, 'corsa5k');
  assert.deepStrictEqual(progr.goals, ['corsa5k']);
  assert.strictEqual(progr.schema.sets, 3, 'lo schema salvato e quello di salute (3 serie)');
});

/* ---------- OBI-02: la fase del corpo e una sola, per tutta l app ---------- */
test('OBI-02: faseCorpo guarda tutti gli obiettivi; la fase scelta a mano vince; il programma, la scheda Peso e il pannello del coach dicono la stessa cosa', () => {
  const f = (p) => app().json('faseCorpo(' + stringa(p) + ')');
  assert.strictEqual(f({ goals: ['dimagrimento'] }), 'deficit');
  assert.strictEqual(f({ goals: ['forza', 'dimagrimento'] }), 'deficit', 'forza + dimagrimento: deficit (prima mantenimento nella scheda Peso)');
  assert.strictEqual(f({ goals: ['massa', 'dimagrimento'] }), 'deficit', 'finche OBI-01 (W2-T5) non decide la priorita, il deficit prevale');
  assert.strictEqual(f({ goals: ['massa'] }), 'massa');
  assert.strictEqual(f({ goals: ['forza', 'massa'] }), 'massa');
  assert.strictEqual(f({ goals: ['ricomposizione', 'massa'] }), 'ricomposizione');
  assert.strictEqual(f({ goals: ['massa', 'ricomposizione'] }), 'massa');
  assert.strictEqual(f({ goals: ['salute'] }), 'mantenimento');
  assert.strictEqual(f({ goals: ['forza', 'glutei'] }), 'mantenimento');
  assert.strictEqual(f({ goal: 'dimagrimento' }), 'deficit', 'il vecchio campo goal');
  assert.strictEqual(f({}), 'mantenimento');
  assert.strictEqual(f({ goals: ['dimagrimento'], fase: 'massa' }), 'massa', 'la fase scelta in Opzioni vince');
  /* [forza, dimagrimento]: il programma dice 10-12 mila passi, e ora lo dicono anche il pannello del coach e la scheda Peso */
  const passi = costruisci({ goals: ['forza', 'dimagrimento'] }).note.some(n => /Passi: 10-12 mila/.test(n));
  assert.ok(passi, 'la nota dei passi del programma');
  const a = caricaApp({ ora: ORA });
  a.profilo({ goals: ['forza', 'dimagrimento'], level: 'intermedio', age: 30, sex: 'M' });
  assert.ok(a.json('corpoCoach()').some(t => /Passi: 10-12 mila/.test(t)), 'corpoCoach (pannello del coach)');
  assert.strictEqual(a.json('faseCorpo()'), 'deficit', 'faseCorpo() senza argomenti legge il profilo salvato (scheda Peso)');
  /* senza dimagrimento nessuna nota dei passi, come prima */
  assert.ok(!costruisci({ goals: ['massa', 'forza'] }).note.some(n => /Passi: 10-12 mila/.test(n)));
  assert.deepStrictEqual(a.errori, []);
});

/* INT-1 (out-of-list di W1-T4): regole-ricerca.js leggeva la fase del corpo a modo suo (solo il primo obiettivo): ora usa faseCorpo */
test('OBI-02: inDeficitCalorico legge faseCorpo (dimagrimento in qualunque posizione); il piso del RIR non si tocca in deficit (MES-02)', () => {
  const a = caricaApp({ ora: ORA });
  const prova = (profilo, atteso, perche) => { a.profilo(Object.assign({ level: 'intermedio', age: 30, sex: 'M' }, profilo)); assert.strictEqual(a.json('inDeficitCalorico()'), atteso, perche); };
  prova({ goals: ['dimagrimento'] }, true, 'dimagrimento primo');
  prova({ goals: ['massa', 'dimagrimento'] }, true, 'dimagrimento secondo: prima il pannello diceva mantenimento');
  prova({ goals: ['forza', 'dimagrimento'] }, true, 'forza + dimagrimento');
  prova({ goals: ['massa'] }, false, 'solo massa');
  prova({ goals: ['dimagrimento'], fase: 'mantenimento' }, false, 'la fase scelta a mano vince');
  a.profilo({ goals: ['massa', 'dimagrimento'], level: 'intermedio', age: 30, sex: 'M' });
  assert.strictEqual(a.json('pisoRirEsigenza(2)'), 99, 'in deficit il -1 RIR dell esigenza non si applica (MES-02), anche con il dimagrimento in seconda posizione');
  assert.deepStrictEqual(a.errori, []);
});

/* ---------- il brief (B.2) ---------- */
test('briefCoach: la forma di B.2 (versione 2, seme, chi, obiettivi, agenda, preferenze, corpo, mente, sicurezza, metodo, test, perche) e i dati giusti', () => {
  const b = app().dati(brief({ goals: ['corsa5k', 'massa'], level: 'principiante', age: 70, parq: 'si', sex: 'F', luogo: 'manubri', fastidi: ['ginocchia', 'nessuno'], days: 3, minutes: 45, freq: '2', priorita: ['spalle'], seme: 'b' }));
  ['versione', 'seme', 'chi', 'obiettivi', 'agenda', 'preferenze', 'corpo', 'mente', 'sicurezza', 'metodo', 'test', 'perche'].forEach(k => assert.ok(k in b, 'campo ' + k));
  assert.strictEqual(b.versione, 2);
  assert.strictEqual(b.seme, 'b');
  assert.deepStrictEqual({ donna: b.chi.donna, sesso: b.chi.sesso, eta: b.chi.eta, over65: b.chi.over65, minorenne: b.chi.minorenne, parq: b.chi.parq, cauto: b.chi.cauto, principiante: b.chi.principiante, livello: b.chi.livello },
    { donna: true, sesso: 'F', eta: 70, over65: true, minorenne: false, parq: true, cauto: true, principiante: true, livello: 'principiante' });
  assert.deepStrictEqual(b.obiettivi.dichiarati, ['corsa5k', 'massa']);
  assert.deepStrictEqual(b.obiettivi.lista, ['salute', 'massa']);
  assert.strictEqual(b.obiettivi.primo, 'salute');
  assert.strictEqual(b.obiettivi.fase, 'massa');   /* la fase guarda tutti gli obiettivi: nessun dimagrimento, il primo tra ricomposizione e massa = massa (anche se la massa e il secondo) */
  assert.strictEqual(b.obiettivi.modalita, 'generale');
  /* W2-T5 (CAS-01): il brief ha tre campi in piu, null se l utente non ha detto niente (regia/brief.js: attrezziCasa, manubriKg, extraPalestra); i campi di prima sono quelli di prima (contratto con W2-T6: solo aggiunte) */
  assert.deepStrictEqual(b.agenda, { giorni: 3, minuti: 45, luogo: 'manubri', attrezziPalestra: null, passiPalestra: null, freqScelta: '2', indiciGiorni: null, attrezziCasa: null, manubriKg: null, extraPalestra: null });
  assert.deepStrictEqual(b.preferenze.priorita, ['spalle']);
  assert.deepStrictEqual(b.sicurezza.fastidi, ['ginocchia'], 'nessuno non e un fastidio');
  assert.strictEqual(b.sicurezza.vincoli, null, 'i vincoli li riempie vincoliSicurezza(brief)');
  assert.deepStrictEqual(b.perche, []);
});

test('briefCoach: eta e popolazioni (minorenne, over 65, eta non detta) come le leggeva buildProgram; sotto i 13 anni lancia l errore di ETA-01', () => {
  const chi = (age) => app().dati(brief({ age })).chi;
  assert.strictEqual(chi(15).minorenne, true);
  assert.strictEqual(chi(15).cauto, true);
  assert.strictEqual(chi(17).minorenne, true);
  assert.strictEqual(chi(18).minorenne, false);
  assert.strictEqual(chi(64).over65, false);
  assert.strictEqual(chi(65).over65, true);
  assert.strictEqual(chi(undefined).eta, 0);
  assert.strictEqual(chi(undefined).cauto, false, 'un eta non detta resta adulto');
  assert.throws(() => brief({ age: 12 }), e => /Sotto i 13 anni il coach non crea programmi/.test(e.message));
  assert.strictEqual(app().dati(brief({ parq: true })).chi.parq, true);
  assert.strictEqual(app().dati(brief({ parq: 'no' })).chi.parq, false);
});

test('briefCoach: stesso seme, stesso brief; senza seme il seme e quello di sempre (data, livello, giorni, obiettivi, ciclo, variante)', () => {
  assert.strictEqual(stringa(app().dati(brief({}))), stringa(app().dati(brief({}))));
  const s = app().dati(brief({ seme: undefined, goals: ['corsa5k', 'forza'], cicli: 2, variante: 1 })).seme;
  assert.strictEqual(s, '2026-10-05|intermedio|4|salute+forza|2|1', 'il seme usa gli obiettivi effettivi: corsa5k e salute fanno lo stesso programma');
});

test('briefOggi: il brief leggero a ogni apertura di seduta, senza scrivere niente', () => {
  const nome = elencoFixture()[0];
  const a = caricaApp({ fixture: nome });
  const prima = stringa(a.store);
  const b = a.json("briefOggi('Lunedì')");
  assert.strictEqual(stringa(a.store), prima, 'nessuna scrittura');
  ['giorno', 'chi', 'obiettivi', 'programma', 'settimana', 'prontezza', 'aggiusti', 'momento', 'esigenza', 'vincoli'].forEach(k => assert.ok(k in b, 'campo ' + k));
  assert.strictEqual(b.giorno, 'Lunedì');
  assert.ok(b.chi && typeof b.chi.cauto === 'boolean');
  assert.ok(b.programma && b.programma.fasi.length >= 8, 'il programma in corso dalla fixture');
  assert.ok(b.settimana && typeof b.settimana.numero === 'number');
  assert.ok(b.vincoli && Array.isArray(b.vincoli.gruppiTecniche), 'i vincoli della Sentinella');
  assert.deepStrictEqual(a.errori, []);
  /* senza profilo ne programma non lancia */
  const vuoto = caricaApp({ ora: ORA }).json("briefOggi('Martedì')");
  assert.strictEqual(vuoto.programma, null);
  assert.strictEqual(vuoto.settimana, null);
});

/* ---------- 2. i vincoli della Sentinella (le regole di oggi) ---------- */
test('vincoliSicurezza: oggi le regole di prima: Nordic Curl, serie massime, tecniche al cedimento', () => {
  const v = (d) => app().dati(app().chiama('vincoliSicurezza', app().chiama('briefCoach', Object.assign({}, BASE, d), {})));
  const nordic = app().g("nomeInLibreria('Nordic Curl')");
  const adulto = v({ level: 'avanzato' });
  /* INT-2a (M5): gli esercizi di avvio (Squat su Scatola, Sit-to-Stand dalla Panca) non sono per chi puo fare lo squat con un carico */
  const avvio = ['Squat su Scatola', 'Sit-to-Stand dalla Panca'].map(n => app().g("nomeInLibreria('" + n + "')")).sort();
  assert.deepStrictEqual(Object.keys(adulto.vietati).sort(), avvio, 'un avanzato adulto sano puo fare il Nordic Curl: gli unici divieti sono gli esercizi di avvio');
  assert.strictEqual(adulto.serieMaxEsercizio, null);
  assert.ok(adulto.gruppiTecniche.indexOf('G2') !== -1 && adulto.gruppiTecniche.indexOf('G2b') !== -1);
  assert.strictEqual(adulto.tettoCarico, 1);
  /* INT-2a (M1 della revisione dell onda 1): lo Stacco Rumeno a una Gamba (abilita 3) non e per i prudenti ne per chi inizia; le ginocchia dolenti toglierebbero solo il Nordic Curl */
  const unaGamba = app().g("nomeInLibreria('Stacco Rumeno a una Gamba')");
  /* Onda 2c (SAF-05 del collaudo, tolleranza zero): anche Front Squat, Tirate al Mento e Ab Wheel (abilita 3) sono vietati a chi inizia e ai prudenti */
  const abilita3 = ['Front Squat', 'Tirate al Mento (Upright Row)', 'Ab Wheel'].map(n => app().g("nomeInLibreria('" + n + "')"));
  /* W2-T6 (SEL-06): con il file delle soglie (soglie-selezione.js) la Sentinella vieta a chi inizia e ai prudenti OGNI esercizio di abilita 3 del dato (attributi-esercizi.js), non solo i tre elenchi a mano di prima;
     senza il file restano i cinque di prima */
  const conSoglie = app().g("typeof sogliaSelezione") === 'function';
  const abilita3Dato = conSoglie ? app().json("EXERCISE_LIBRARY.filter(e => (attributi(e.name) || {}).abilita > 2).map(e => e.name)") : [];
  const attesi = [nordic, unaGamba].concat(abilita3).concat(abilita3Dato.filter(n => [nordic, unaGamba].concat(abilita3).indexOf(n) === -1));
  [{ level: 'principiante' }, { age: 70 }, { age: 16 }, { parq: 'si' }].forEach(d => {
    const r = v(Object.assign({ level: 'avanzato' }, d));
    assert.deepStrictEqual(Object.keys(r.vietati).sort(), attesi.slice().sort(), 'Nordic Curl, Stacco Rumeno a una Gamba, i tre di abilita 3 di prima' + (conSoglie ? ' e ogni esercizio di abilita 3 del dato' : '') + ' vietati per ' + stringa(d));
    assert.deepStrictEqual(Object.keys(r.vietati).slice(0, 5), [nordic, unaGamba].concat(abilita3), 'in testa i cinque di prima, nell ordine di prima');
  });
  assert.deepStrictEqual(Object.keys(v({ level: 'avanzato', fastidi: ['ginocchia'] }).vietati).sort(), [nordic].concat(avvio).sort(), 'Nordic Curl vietato per le ginocchia dolenti (e gli esercizi di avvio, come per ogni avanzato)');
  [{ level: 'principiante' }, { age: 70 }, { age: 16 }, { parq: 'si' }].forEach(d => {
    const r = v(Object.assign({ level: 'avanzato' }, d));
    assert.strictEqual(r.serieMaxEsercizio, 3, 'al massimo 3 serie per ' + stringa(d));
    assert.deepStrictEqual(r.gruppiTecniche, ['G1b'], 'niente tecniche al cedimento per ' + stringa(d));
  });
  assert.deepStrictEqual(v({ level: 'avanzato', fastidi: ['ginocchia'] }).gruppiTecniche.indexOf('G2') !== -1, true, 'il fastidio non toglie le tecniche: lo fanno senzaCedimentoPer e consentito');
  assert.deepStrictEqual(v({}).modifiche, {});
  assert.deepStrictEqual(v({}).rirMin, {});
  /* i vincoli arrivano a consentito(): prefs.esclusi li legge */
  const p = costruisci({ level: 'principiante' });
  assert.deepStrictEqual(p.prefs.esclusi.slice().sort(), attesi.slice().sort());
  assert.ok(!p.sedute.some(sd => sd.esercizi.some(e => /nordic|front squat|tirate al mento|ab wheel/i.test(e.name))));
});

/* ---------- 4. il mesociclo ---------- */
test('pianoMesociclo: settimane, scarichi e RIR per settimana (W2-T4: 12 settimane per chi comincia, blocchi 5+1; i prudenti come prima)', () => {
  const m = (d) => app().dati(app().chiama('pianoMesociclo', app().chiama('briefCoach', Object.assign({}, BASE, d), {})));
  assert.deepStrictEqual(m({ level: 'principiante' }).struttura, { settimane: 12, blocco: 12 });
  assert.deepStrictEqual(m({ level: 'principiante', age: 70 }).struttura, { settimane: 8, blocco: 4 });
  assert.deepStrictEqual(m({ level: 'intermedio' }).struttura, { settimane: 12, blocco: 6 });
  const av = m({ level: 'avanzato' });
  assert.deepStrictEqual(av.struttura, { settimane: 12, blocco: 6 });
  assert.deepStrictEqual(av.rirSett, [3, 2, 2, 1, 1, 4, 3, 2, 2, 1, 1, 4], 'il limite basso dei fondamentali col bilanciere: mai 0 (PCO-02)');
  assert.strictEqual(av.note.length, 1);
  assert.deepStrictEqual(m({ level: 'intermedio' }).rirSett, [3, 3, 2, 2, 1, 4, 3, 3, 2, 2, 1, 4], 'MES-02: anche l intermedio ha la rampa del RIR');
  assert.deepStrictEqual(m({ level: 'intermedio', age: 15 }).rirSett, [2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4], 'minorenne: almeno 2 ripetizioni in riserva, 4 nello scarico');
  assert.strictEqual(m({ level: 'avanzato', age: 15 }).note.length, 0, 'il minorenne avanzato non ha la rampa');
  assert.deepStrictEqual(app().json("fasiProgramma(strutturaProgramma('avanzato'))"), ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico']);
});

/* ---------- 3 e 5. specialita, divisione e giorni ---------- */
test('specialitaStruttura: oggi nessuna (null); un task dopo registra la sua modalita senza toccare genera.js', () => {
  const b = app().chiama('briefCoach', BASE, {});
  assert.strictEqual(app().chiama('specialitaStruttura', b), null);
  assert.strictEqual(app().json("briefCoach(" + stringa(BASE) + ", {}).obiettivi.modalita"), 'generale');
  /* un registro estendibile: una modalita 'prova' che impone la divisione */
  app().g("registraSpecialita('prova', brief => ({ split: { nome: 'Prova', giorni: ['fullbody', 'fullbody'], freq: 2 } }))");
  try {
    const b2 = app().g('(() => { const b = briefCoach(' + stringa(BASE) + ', {}); b.obiettivi.modalita = "prova"; return b; })()');
    assert.strictEqual(app().dati(app().chiama('specialitaStruttura', b2)).split.nome, 'Prova');
  } finally { app().g("delete SPECIALITA_STRUTTURA.prova"); }
  /* W2-T7: la modalita Forza (specialita/forza.js) si registra al caricamento, quindi dopo l'integrazione il registro non e piu vuoto ma ha solo lei (l'estetica e di W5-T4);
     la prova «oggi nessuna» fotografava l'algoritmo di prima. Con la modalita «generale» del brief la risposta resta null */
  assert.deepStrictEqual(app().json('Object.keys(SPECIALITA_STRUTTURA)'), app().g('typeof SPEC_FORZA') === 'undefined' ? [] : ['forza']);
});

test('giorniSettimana e scegliSplit: i giorni di sempre (2 = lunedi e giovedi, 6 = lunedi-mercoledi e venerdi-domenica) e la divisione dal livello e dalla frequenza', () => {
  const g = (days) => app().json('(() => { const b = briefCoach(' + stringa(Object.assign({}, BASE, { days })) + ', {}); return { indici: giorniSettimana(b, null), nelBrief: b.agenda.indiciGiorni }; })()');
  assert.deepStrictEqual(g(2).indici, [0, 3]);
  assert.deepStrictEqual(g(3).indici, [0, 2, 4]);
  assert.deepStrictEqual(g(4).indici, [0, 1, 3, 4]);
  assert.deepStrictEqual(g(5).indici, [0, 1, 3, 4, 5]);
  /* INT-2b (onda 2c): 6 giorni = lunedi-mercoledi e venerdi-domenica, il giovedi di riposo (collaudo REC-03: mai 6 giorni di fila; prima lunedi-sabato) */
  assert.deepStrictEqual(g(6).indici, [0, 1, 2, 4, 5, 6]);
  assert.deepStrictEqual(g(6).nelBrief, [0, 1, 2, 4, 5, 6], 'i giorni restano nel brief');
  const s = (d) => app().dati(app().chiama('scegliSplit', app().chiama('briefCoach', Object.assign({}, BASE, d), {}))).nome;
  assert.strictEqual(s({ level: 'intermedio', days: 4 }), 'Upper / Lower x2');
  assert.strictEqual(s({ level: 'principiante', days: 3 }), 'Full Body 3x');
  assert.strictEqual(s({ level: 'avanzato', days: 6 }), 'Push / Pull / Legs x2');
  assert.strictEqual(s({ level: 'avanzato', days: 4, freq: '3' }), 'Full Body + Upper / Lower');
});

/* ---------- 10. il tempo: i nomi vecchi restano ---------- */
test('stimaEsercizi e durataSeduta sono le funzioni di prima (exerciseCountFor e stimaMinutiSeduta restano come sinonimi)', () => {
  const a = app();
  ['massa', 'forza', 'salute', 'dimagrimento'].forEach(goal => [30, 45, 60, 90].forEach(min => ['principiante', 'intermedio'].forEach(level => {
    const s = a.dati(a.g("schemeFor('" + goal + "')"));
    assert.strictEqual(a.chiama('stimaEsercizi', min, s, { level }), a.chiama('exerciseCountFor', min, s, { level }));
  })));
  const seduta = [{ name: '💪 Panca Piana Bilanciere', sets: 4, reps: 8, rest: 150 }, { name: '💪 Alzate Laterali', sets: 3, reps: 12, rest: 60 }];
  assert.strictEqual(a.chiama('durataSeduta', seduta), a.chiama('stimaMinutiSeduta', seduta));
  /* i posti di W2-T1 (volume per muscolo): oggi senza effetto */
  assert.strictEqual(a.chiama('pavimentoVolume', {}, 'petto'), 0);
  assert.strictEqual(a.chiama('aggiungiSerieUtile', {}, [], 'petto'), undefined);
  assert.strictEqual(a.chiama('validaVolume', {}, []), undefined);
});

/* ---------- 17. la verifica finale ---------- */
test('verificaProgramma: chiama i valida* che esistono e mette in nota il testo che ritornano; senza valida* non cambia niente', () => {
  const a = caricaApp({ ora: ORA });
  const d = Object.assign({}, BASE);
  assert.strictEqual(typeof a.g('validaVolume'), 'function');
  /* W2-T2: validaTempo esiste (le note oneste del tempo): per provare il meccanismo la si sostituisce, prima con una che non scrive niente e poi con quella di prova */
  assert.strictEqual(typeof a.g('validaTempo'), 'function');
  a.g("globalThis.validaTempo = () => []");
  const prog0 = a.dati(a.chiama('buildProgram', d));
  a.g("globalThis.validaTempo = (brief, sedute) => ['Prova: la seduta di ' + sedute.length + ' giorni non entra nei minuti']");
  const prog1 = a.dati(a.chiama('buildProgram', d));
  assert.deepStrictEqual(prog1.note, prog0.note.concat(['Prova: la seduta di ' + prog0.sedute.length + ' giorni non entra nei minuti']));
  assert.strictEqual(stringa(Object.assign({}, prog1, { note: prog0.note })), stringa(prog0));
});

/* ---------- invarianti del generatore ---------- */
test('buildProgram non scrive niente e, con lo stesso seme, da lo stesso programma (REG-05); il seme cambia il programma', () => {
  const a = caricaApp({ ora: ORA });
  const prima = stringa(a.store);
  const p1 = a.dati(a.chiama('buildProgram', BASE)), p2 = a.dati(a.chiama('buildProgram', BASE));
  assert.strictEqual(stringa(p1), stringa(p2));
  assert.strictEqual(stringa(a.store), prima, 'nessuna scrittura');
  const diversi = [0, 1, 2, 3, 4, 5].map(i => stringa(a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { seme: 'altro-' + i }))).sedute.map(s => s.esercizi.map(e => e.name)))).filter((x, i, l) => l.indexOf(x) === i);
  assert.ok(diversi.length >= 2, 'semi diversi, programmi diversi');
  assert.deepStrictEqual(a.errori, []);
});

test('buildProgram: la forma del programma e dei suoi campi, nell ordine di sempre (le schermate e il salvataggio li leggono)', () => {
  const p = costruisci({});
  assert.deepStrictEqual(Object.keys(p), ['goals', 'scheme', 'split', 'sedute', 'prefs', 'metodo', 'ispirazioni', 'fisico', 'sostituzioni', 'note', 'riposo', 'settimane', 'blocco', 'fasi', 'rirSett', 'eserciziPerSeduta', 'seme', 'versione', 'piano', 'perche', 'modalita']);
  assert.deepStrictEqual(Object.keys(p.prefs), ['luogo', 'fastidi', 'sonno', 'attrezzi', 'attrezziPalestra', 'graditi', 'odiati', 'priorita', 'esclusi']);
  assert.deepStrictEqual(Object.keys(p.sedute[0]), ['giorno', 'tipo', 'titolo', 'esercizi']);
  Object.keys(p.sedute[0].esercizi[0]).forEach(k => assert.ok(['name', 'sets', 'reps', 'weight', 'rest', 'fisso', 'tecnica', 'superset', 'stimato'].indexOf(k) !== -1, 'campo inatteso ' + k));
  assert.ok(!('lavoro' in p) && !('grezzo' in p), 'il brief non esce dal generatore');
});
