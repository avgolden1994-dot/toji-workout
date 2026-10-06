/* Integrazione dell onda 2b del coach v2 (INT-2b: W2-T1 volume, W2-T2 tempo, W2-T3 tecniche, W2-T4 mesociclo): le cuciture tra i quattro task, con l app vera in vm.
   1) rirPianoSettimana: W2-T4 la dichiara (nome, data) e accetta una Date, 'AAAA-MM-GG', un numero di settimana o niente; W2-T3 la chiama da rirBersaglioBase con
      (nome, settimana) dove la settimana e quella di tutto il coach (1..N, oppure niente/0 = oggi): le due chiamate danno lo stesso piano.
   2) la nota delle donne di genera.js legge brief.lavoro.pauseDonneAccorciate (W2-T2).
   3) la riga `minimo` della tabella MET-01 e il ramo morto di `rr` «per indice» (W2-T2).
   4) le vecchie stime di durata (figura anatomica, schede pronte) usano la funzione condivisa (W2-T2).
   5) il livello grezzo («Principiante assoluto») entra normalizzato in buildProgram (m9, difetto vero trovato da W2-T1).
   6) D-P19: le superserie di antagonisti non pesanti dei minorenni restano ammesse (e una tecnica al cedimento no). */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conSoglieStruttura } = require('./aiuto-mesociclo');

const ORA = '2026-10-05T12:00:00';   /* lunedi */
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', priorita: [], usaProfilo: false, seme: 'int2b' };

/* un telefono col programma v2 salvato come lo scrive applyGeneratedProgram, e il profilo; l orologio sulla settimana `sett` (1..N) */
function telefono(d, sett) {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, d)));
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, versione: 2, piano: p.piano, schema: { sets: 3, reps: 10 }, seme: 'int2b', ispirazioni: p.ispirazioni });
  a.profilo({ level: d.level || BASE.level, age: d.age || BASE.age, goals: d.goals || BASE.goals, parq: false, luogo: d.luogo || BASE.luogo });
  if (sett) a.ora(new Date(2026, 9, 5 + 7 * (sett - 1), 12, 0, 0));
  return { a, p };
}
const ESERCIZI = { A: 'Squat con Bilanciere', B: 'Panca Piana Manubri', C: 'Leg Press', D: 'Leg Extension', E: 'Curl Bilanciere Bicipiti', F: 'Plank' };

test('rirPianoSettimana: i due stili di chiamata (W2-T4 con una data, W2-T3 con una settimana) danno lo stesso RIR, anche senza argomento e con 0', () => {
  const { a, p } = telefono({ level: 'intermedio' });
  const n = p.piano.settimane.length;
  assert.strictEqual(n, 12, 'intermedio: 2 blocchi da 5+1 settimane (MES-01)');
  Object.keys(ESERCIZI).forEach(c => {
    const nome = JSON.stringify(ESERCIZI[c]);
    for (let w = 1; w <= n; w++) {
      const lunedi = new Date(2026, 9, 5 + 7 * (w - 1), 12, 0, 0), giovedi = new Date(2026, 9, 5 + 7 * (w - 1) + 3, 12, 0, 0);
      const perNumero = a.json('rirPianoSettimana(' + nome + ', ' + w + ')');
      assert.ok(Array.isArray(perNumero) && perNumero.length === 2, c + ' sett ' + w + ': una coppia [min, max]');
      assert.deepStrictEqual(a.json('rirPianoSettimana(' + nome + ', ' + JSON.stringify(a.ymd(giovedi)) + ')'), perNumero, c + ' sett ' + w + ' per «AAAA-MM-GG»');
      assert.deepStrictEqual(a.json('rirPianoSettimana(' + nome + ', new Date(' + giovedi.getTime() + '))'), perNumero, c + ' sett ' + w + ' per Date');
      assert.deepStrictEqual(a.json('rirPianoSettimana(' + nome + ', ' + lunedi.getTime() + ')'), perNumero, c + ' sett ' + w + ' per millisecondi');
      /* il chiamante di W2-T3: rirBersaglioBase(nome, settimana) = la tabella del piano (entro 4, con il pavimento dei pesanti), mai i valori di prima */
      const base = a.json('rirBersaglioBase(' + nome + ', ' + w + ')');
      let atteso = perNumero.map(x => Math.min(4, x));   /* il RIR non supera mai 4 (rirDalPiano) */
      if (c === 'A' && atteso[0] < 1) atteso = [1, Math.max(atteso[1], 2)];   /* e un fondamentale col bilanciere non scende sotto 1 (RIR-02) */
      assert.deepStrictEqual(base, atteso, c + ' sett ' + w + ': rirBersaglioBase legge il piano');
      /* oggi: senza argomento, con 0, con null e con undefined si legge la settimana in corso (l orologio) */
      a.ora(giovedi);
      ['', ', 0', ', null', ', undefined', ', NaN'].forEach(arg => assert.deepStrictEqual(a.json('rirPianoSettimana(' + nome + arg + ')'), perNumero, c + ' sett ' + w + ' oggi (' + (arg || 'senza argomento') + ')'));
      assert.deepStrictEqual(a.json('rirBersaglioBase(' + nome + ')'), base, c + ' sett ' + w + ': rirBersaglioBase senza settimana = oggi');
      assert.deepStrictEqual(a.json('rirBersaglioBase(' + nome + ', 0)'), base, c + ' sett ' + w + ': rirBersaglioBase con 0 = oggi (come sett || oggi del resto del coach)');
    }
    /* fuori dal programma: i valori di prima, senza errori */
    assert.strictEqual(a.json('rirPianoSettimana(' + nome + ', ' + (n + 1) + ')'), null, c + ': oltre il programma');
    assert.strictEqual(a.json('rirPianoSettimana(' + nome + ', -1)'), null, c + ': settimana negativa');
  });
  assert.deepStrictEqual(a.errori, []);
});

test('rirPianoSettimana: nessun programma, programma della v1, settimana oltre il piano: la tabella non risponde e rirBersaglioBase torna ai valori di prima', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  a.profilo({ level: 'intermedio', age: 30 });
  const nome = JSON.stringify(ESERCIZI.E);
  ['', ', 3', ', 0', ', "2026-10-07"', ', new Date()'].forEach(arg => assert.strictEqual(a.json('rirPianoSettimana(' + nome + arg + ')'), null, 'senza programma' + arg));
  a.programma({ inizio: '2026-10-05', settimane: 8, fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'], blocco: 4, rirSett: [3, 2, 2, 4, 3, 2, 1, 4] });
  [', 3', ', 0', ', "2026-10-07"'].forEach(arg => assert.strictEqual(a.json('rirPianoSettimana(' + nome + arg + ')'), null, 'programma v1' + arg));
  assert.deepStrictEqual(a.json('rirBersaglioBase(' + nome + ', 3)'), a.json('pavimentoRirMinorenni(rirBersaglioPerLivello(' + nome + ', 3))'));
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 2) la nota delle donne (PRG-20, W2-T2) ---------------------------------------------------------------- */
const NOTA_PAUSE_DONNE = 'Pause un po piu corte: le donne recuperano piu in fretta tra una serie e l altra.';
/* le pause per «seduta + esercizio»: con la regola spenta il tempo cambia anche quali esercizi entrano, quindi si confrontano solo quelli che ci sono in tutte e due le schede */
const pause = p => { const m = {}; p.sedute.forEach((sd, i) => sd.esercizi.forEach(e => { m[i + ':' + e.name] = e.rest; })); return m; };

test('PRG-20: la nota «Pause un po piu corte» c e solo se almeno una pausa e davvero scesa (brief.lavoro.pauseDonneAccorciate), mai per gli uomini, il PAR-Q positivo o con la regola spenta', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const costruisci = d => a.dati(a.chiama('buildProgram', Object.assign({}, BASE, d)));
  const ha = p => p.note.indexOf(NOTA_PAUSE_DONNE) !== -1;
  let conNota = 0, senzaNota = 0;
  [['massa', 'intermedio', 4], ['forza', 'intermedio', 3], ['salute', 'principiante', 3], ['dimagrimento', 'avanzato', 5], ['forza', 'avanzato', 4], ['massa', 'principiante', 2]].forEach(([g, level, days]) => ['palestra', 'manubri'].forEach(luogo => {
    const d = { goals: [g], level, days, luogo, sex: 'F', seme: 'donne-' + g + level + days };
    a.riaccendi();
    const donna = costruisci(d);
    a.spegni(['PRG-20']);
    const donnaSenzaRegola = costruisci(d);
    a.riaccendi();
    const uomo = costruisci(Object.assign({}, d, { sex: 'M' }));
    const prudente = costruisci(Object.assign({}, d, { parq: 'si' }));
    const pd = pause(donna), ps = pause(donnaSenzaRegola);
    const comuni = Object.keys(pd).filter(k => k in ps);
    assert.ok(comuni.length >= 4, d.seme + ': esercizi in comune ' + comuni.length);
    const sceso = comuni.some(k => pd[k] < ps[k]);
    /* se la nota c e, una pausa e scesa davvero (sugli esercizi in comune, o su uno che la scheda senza regola non ha); se non c e, nessuna pausa in comune e scesa */
    if (ha(donna)) assert.ok(sceso || Object.keys(pd).some(k => !(k in ps)), d.seme + ': la nota c e ma nessuna pausa e scesa (' + g + ' ' + level + ' ' + luogo + ')');
    else assert.strictEqual(sceso, false, d.seme + ': una pausa e scesa ma la nota non c e (' + g + ' ' + level + ' ' + luogo + ')');
    assert.strictEqual(ha(donnaSenzaRegola), false, d.seme + ': regola spenta, niente nota');
    assert.strictEqual(ha(uomo), false, d.seme + ': gli uomini non l hanno');
    assert.strictEqual(ha(prudente), false, d.seme + ': PAR-Q positivo, niente pause accorciate');
    if (ha(donna)) conNota++; else senzaNota++;
  }));
  assert.ok(conNota > 0 && senzaNota > 0, 'il campione ha donne con e senza pause accorciate: con ' + conNota + ', senza ' + senzaNota);
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 3) MET-01 e i metodi rr / minimo (PCO-04, W2-T2) ---------------------------------------------------------------- */
test('MET-01: la tabella della mappa dice giorni e minuti di ogni metodo come il codice (riga `minimo`: 2 o 3 giorni, 20-45 minuti)', () => {
  const fs = require('fs'), path = require('path');
  const mappa = fs.readFileSync(path.join(__dirname, '..', 'docs', 'coach-mappa-regole.md'), 'utf8');
  const righe = mappa.split('\n').filter(r => /^\| [a-z0-9]+ \| /.test(r) && r.split('|').length >= 10 && !/^\| id \|/.test(r)).map(r => r.split('|').map(x => x.trim()));
  const a = caricaApp({ ora: ORA });
  const metodi = a.json('METODI.map(m => ({ id: m.id, giorni: m.giorni, minuti: m.minuti, livelli: m.livelli }))');
  assert.strictEqual(righe.length, metodi.length, 'una riga per metodo');
  metodi.forEach(m => {
    const r = righe.find(x => x[1] === m.id);
    assert.ok(r, m.id + ': riga nella tabella');
    assert.strictEqual(r[4], m.giorni.join(','), m.id + ': giorni');
    assert.strictEqual(r[6], m.minuti.join('-'), m.id + ': minuti');
  });
  const minimo = metodi.find(m => m.id === 'minimo');
  assert.deepStrictEqual([minimo.giorni, minimo.minuti], [[2, 3], [20, 45]]);
});

test('rr e minimo: le coppie sono per muscolo antagonista, mai con core o tenute, e il vecchio ramo «per indice» non c e piu in genera.js', () => {
  const fs = require('fs'), path = require('path');
  const genera = fs.readFileSync(path.join(__dirname, '..', 'js', 'coach', 'regia', 'genera.js'), 'utf8');
  assert.ok(!/accoppiabile/.test(genera) && !/metodoAttivo\.id !== 'rr'/.test(genera), 'il ramo morto della Recommended Routine «per indice» e stato tolto');
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  let coppie = 0;
  [['rr', 'corpo', 3, 50], ['rr', 'manubri', 3, 60], ['minimo', 'palestra', 2, 30], ['minimo', 'manubri', 3, 25], ['minimo', 'corpo', 3, 40]].forEach(([metodo, luogo, days, minutes]) => ['principiante', 'intermedio'].forEach(level => {
    const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { metodo, luogo, days, minutes, level, goals: ['salute'], seme: 'rr-' + metodo + luogo + level })));
    if (p.metodo !== metodo) return;   /* il metodo forzato puo non essere ammesso: lo dice p.metodo */
    p.sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
      if (!e.superset) return;
      coppie++;
      const prima = sd.esercizi[i - 1], gr = x => a.json('(findExercise(' + JSON.stringify(x.name) + ') || {}).group'), tempo = x => a.json('isTimeBased(' + JSON.stringify(x.name) + ')');
      assert.ok(prima, metodo + ': una coppia ha un primo esercizio');
      assert.ok(gr(e) !== 'core' && gr(prima) !== 'core' && !tempo(e) && !tempo(prima), metodo + ' ' + luogo + ' ' + level + ': ' + prima.name + ' + ' + e.name + ': ne core ne tenute in coppia (SS-02)');
      assert.notStrictEqual(a.chiama('schemaDi', e.name), a.chiama('schemaDi', prima.name), metodo + ': due esercizi dello stesso schema non fanno coppia (' + prima.name + ' + ' + e.name + ')');
    }));
  }));
  assert.ok(coppie > 0, 'il campione ha delle coppie: ' + coppie);
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 4) le stime di durata rimaste (figura anatomica, schede pronte): la funzione condivisa (CAS-05, B36) ---------------------------------------------------------------- */
test('le card delle schede pronte (Piano e figura anatomica) mostrano la durata di durataSeduta, la stessa del generatore e di Oggi, non la vecchia stima serie x (30 s + pausa)', () => {
  const fs = require('fs'), path = require('path');
  ['js/ui/figura-anatomica.js', 'js/ui/piano/schede-pronte.js'].forEach(f => {
    const src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    assert.ok(!/\(30 \+ e\.rest\)/.test(src), f + ': la vecchia formula serie x (30 + pausa) e tolta');
    assert.ok(/durataSeduta\(t\.exercises\)/.test(src), f + ': usa durataSeduta');
  });
  const a = caricaApp({ ora: ORA });
  a.profilo({ level: 'intermedio', age: 30, minutes: 60 });
  const els = {};
  const el = id => els[id] || (els[id] = new Proxy({ style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }, innerHTML: '', innerText: '', value: '' }, { get: (t, k) => k in t ? t[k] : () => undefined }));
  a.ctx.document = { getElementById: el, querySelectorAll: () => [], querySelector: () => null, createElement: () => el('x'), body: el('body') };
  const durate = a.json('WORKOUT_TEMPLATES.map(t => Math.round(durataSeduta(t.exercises)))');
  const vecchie = a.json('WORKOUT_TEMPLATES.map(t => Math.round(t.exercises.reduce((s, e) => s + e.sets * (30 + e.rest), 0) / 60))');
  assert.ok(durate.every(m => m > 10 && m < 120), 'durate plausibili: ' + durate);
  assert.notDeepStrictEqual(durate, vecchie, 'il modello nuovo (riscaldamento, cambi, tempo sotto tensione) non e la vecchia stima');
  /* Piano > Schede pronte */
  a.g('openTemplatePicker()');
  const minuti = html => (String(html).match(/~(\d+) min/g) || []).map(x => Number(x.replace(/\D/g, '')));
  assert.deepStrictEqual(minuti(el('template-list').innerHTML), durate, 'Piano > Schede pronte');
  /* figura anatomica: le stesse schede nel carosello (nessun gruppo scelto: tutte) */
  a.g('renderGruppi()');
  const gt = minuti(el('group-templates').innerHTML);
  assert.strictEqual(gt.length, durate.length, 'una card per scheda');
  assert.deepStrictEqual(gt.slice().sort((x, y) => x - y), durate.slice().sort((x, y) => x - y), 'figura anatomica: le stesse durate (il carosello e ordinato per stato)');
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 5) m9: il livello grezzo entra normalizzato (difetto vero trovato da W2-T1) ---------------------------------------------------------------- */
test('m9: «Principiante assoluto», «esperto», «Pro» e simili danno lo stesso programma (byte per byte) del livello noto; d del chiamante non si tocca; un livello mancante resta com e', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const costruisci = d => a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { seme: 'm9b' }, d)));
  const casi = [['Principiante assoluto', 'principiante'], ['PRINCIPIANTE', 'principiante'], ['neofita', 'principiante'], ['Principiante', 'principiante'], ['esperto', 'avanzato'],
    ['Avanzato (agonista)', 'avanzato'], ['elite', 'avanzato'], ['boh', 'intermedio'], ['Intermedio+', 'intermedio']];
  ['massa', 'forza', 'salute'].forEach(g => [3, 5].forEach(days => casi.forEach(([grezzo, noto]) => {
    assert.strictEqual(JSON.stringify(costruisci({ level: grezzo, goals: [g], days })), JSON.stringify(costruisci({ level: noto, goals: [g], days })), g + ' ' + days + ' giorni: «' + grezzo + '» = ' + noto);
  })));
  /* anche la donna principiante con il profilo dentro il brief: esigenza (PRN-01), serie e metodo vedono il livello normalizzato */
  const brief = a.dati(a.chiama('briefCoach', Object.assign({}, BASE, { level: 'Principiante assoluto', sex: 'F' }), {}));
  assert.strictEqual(brief.chi.livello, 'principiante');
  assert.strictEqual(brief.grezzo.d.level, 'principiante', 'chi legge d.level dopo il brief vede un livello noto');
  assert.ok(brief.mente.esigenza <= 1, 'PRN-01: il principiante non parte con il +20% dell esigenza (' + brief.mente.esigenza + ')');
  /* d del chiamante (onbData) non si modifica, e un livello mancante resta mancante */
  const d = Object.assign({}, BASE, { level: 'Principiante assoluto' }), prima = JSON.stringify(d);
  a.ctx.__d = a.g('JSON.parse(' + JSON.stringify(JSON.stringify(d)) + ')');
  a.g('buildProgram(__d)');
  assert.strictEqual(JSON.stringify(a.dati(a.g('__d'))), prima, 'buildProgram non cambia le risposte che riceve');
  const senza = a.dati(a.chiama('briefCoach', Object.assign({}, BASE, { level: undefined }), {}));
  assert.strictEqual(senza.grezzo.d.level, undefined, 'livello mancante: resta mancante (ognuno ha il suo ripiego)');
  assert.strictEqual(senza.chi.livello, 'intermedio');
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 6) le note dicono quello che il programma fa davvero (REG-02, riconciliaNote) ---------------------------------------------------------------- */
test('riconciliaNote: «Aggiunto: X» solo se X e nella scheda, la nota del ponte glutei solo senza flessione del ginocchio, mai due note uguali (campione di 400 programmi)', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const nomi = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.map(e => a.chiama('senzaEmoji', e.name))));
  const NOTA_PONTE = 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.', NOTA_SERVE = 'Femorali: squat e hip thrust non li fanno crescere, serve la flessione del ginocchio (leg curl).';
  let aggiunti = 0, conPonte = 0, conServe = 0, programmi = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => ['palestra', 'manubri', 'corpo'].forEach(luogo => [2, 3, 5].forEach(days => [30, 45, 60, 90].forEach(minutes => ['massa', 'forza'].forEach(g => {
    if (luogo !== 'palestra' && minutes === 90) return;
    const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { level, luogo, days, minutes, goals: [g], sex: 'F', seme: 'riconcilia' + level + luogo + days + minutes + g })));
    const ex = nomi(p), flessione = ex.some(n => /leg curl|nordic/i.test(n));
    programmi++;
    assert.strictEqual(new Set(p.note).size, p.note.length, 'nessuna nota ripetuta: ' + JSON.stringify(p.note.filter((n, i) => p.note.indexOf(n) !== i)));
    p.note.forEach(n => {
      const m = /^Aggiunto: (.+?) — /.exec(n);
      if (m) { aggiunti++; assert.ok(ex.indexOf(m[1]) !== -1, level + ' ' + luogo + ' ' + days + 'gg ' + minutes + 'min ' + g + ': la nota dice «Aggiunto: ' + m[1] + '» ma non c e'); }
    });
    if (p.note.indexOf(NOTA_PONTE) !== -1) { conPonte++; assert.ok(!flessione, 'nota del ponte con una flessione del ginocchio in scheda'); }
    if (p.note.indexOf(NOTA_SERVE) !== -1) { conServe++; assert.ok(flessione, 'nota «serve la flessione» senza nessuna flessione in scheda'); }
  })))));
  assert.ok(programmi >= 150 && aggiunti > 30 && conPonte > 0, 'il campione esercita le note: programmi ' + programmi + ', note Aggiunto ' + aggiunti + ', ponte ' + conPonte + ', serve ' + conServe);
  assert.deepStrictEqual(a.errori, []);
});

test('riconciliaNote: il caso del pullover a 30 minuti (casa, 2 giorni, forza) e quello del leg curl con l asciugamano (corpo libero, principiante, 2 giorni, 45 minuti) non hanno piu la nota che mente', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const costruisci = d => a.dati(a.chiama('buildProgram', Object.assign({}, BASE, d)));
  const nomi = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.map(e => a.chiama('senzaEmoji', e.name))));
  const pull = costruisci({ level: 'intermedio', days: 2, luogo: 'manubri', minutes: 30, goals: ['forza'], seme: '{"level":"intermedio","days":2,"luogo":"manubri","minutes":30,"goals":["forza"]}' });
  assert.ok(nomi(pull).indexOf('Pullover con Manubrio') === -1 || pull.note.some(n => /^Aggiunto: Pullover con Manubrio/.test(n)), 'il pullover e in scheda oppure la nota non c e');
  assert.ok(!(pull.note.some(n => /^Aggiunto: Pullover con Manubrio/.test(n)) && nomi(pull).indexOf('Pullover con Manubrio') === -1));
  const fem = costruisci({ level: 'principiante', days: 2, luogo: 'corpo', minutes: 45, goals: ['massa'] });
  assert.ok(nomi(fem).some(n => /Leg Curl con Asciugamano/.test(n)), 'il leg curl con l asciugamano e in scheda');
  assert.ok(!fem.note.some(n => /senza leg curl restano meno allenati/.test(n)), 'e la nota «senza leg curl» non c e');
  assert.strictEqual(fem.note.filter(n => /^Aggiunto: Leg Curl con Asciugamano/.test(n)).length, 1, 'la nota «Aggiunto» c e una volta sola');
});

/* ---------------------------------------------------------------- 7) D-P19: i minorenni tengono le superserie di antagonisti non pesanti, non le tecniche al cedimento ---------------------------------------------------------------- */
test('D-P19: per i 13-17 anni le superserie restano (antagonisti, mai un fondamentale pesante, il core o una tenuta) e nessuna tecnica al cedimento, cluster o potenza', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const INTENSE = ['drop', 'riposopausa', 'myo', 'amrap', 'backoff', 'parziali', 'cluster', 'potenza', 'negativa'];
  let coppie = 0, programmi = 0, conTecnica = 0;
  [13, 15, 17].forEach(age => ['principiante', 'intermedio', 'avanzato'].forEach(level => [30, 45, 60].forEach(minutes => [3, 4].forEach(days => ['palestra', 'manubri'].forEach(luogo => {
    const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { age, level, minutes, days, luogo, goals: ['massa'], seme: 'dp19' + age + level + minutes + days + luogo })));
    programmi++;
    p.sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
      if (e.tecnica) { conTecnica++; assert.ok(INTENSE.indexOf(e.tecnica) === -1, 'minorenne di ' + age + ' anni con la tecnica ' + e.tecnica + ' su ' + e.name); }
      if (!e.superset) return;
      coppie++;
      const prima = sd.esercizi[i - 1], carico = x => a.chiama('tipoCarico', x.name), gr = x => a.json('(findExercise(' + JSON.stringify(x.name) + ') || {}).group');
      assert.ok(carico(e) !== 'pesante' && carico(prima) !== 'pesante', 'coppia con un fondamentale pesante: ' + prima.name + ' + ' + e.name);
      assert.ok(gr(e) !== 'core' && gr(prima) !== 'core' && !a.chiama('isTimeBased', e.name) && !a.chiama('isTimeBased', prima.name), 'coppia con core o tenuta: ' + prima.name + ' + ' + e.name);
    }));
    assert.ok(p.rirSett.every(r => r >= 2), 'minorenne: il RIR non scende sotto 2 (ETA-02): ' + p.rirSett.join(','));
  })))));
  assert.ok(programmi >= 100 && coppie > 0, 'il campione ha coppie di superserie per i minorenni: ' + coppie + ' in ' + programmi + ' programmi (' + conTecnica + ' tecniche, tutte leggere)');
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 8) volume e tempo: «il lavoro utile per te e gia tutto qui» (B12, D-P10) ---------------------------------------------------------------- */
test('volume e tempo: «il lavoro utile e gia tutto qui» c e solo se nessuna unita e sotto fascia (nessuna nota di mancanza), e non con un metodo famoso', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const MANCANZA = /non entra di più|non lasciano altro posto|non c’è un esercizio adatto|programma di mantenimento/;
  let utili = 0, programmi = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => ['salute', 'massa', 'forza', 'dimagrimento'].forEach(g => [2, 3, 4].forEach(days => [45, 60, 90].forEach(minutes => {
    const p = a.dati(a.chiama('buildProgram', Object.assign({}, BASE, { level, days, minutes, goals: [g], seme: 'utile' + level + g + days + minutes })));
    programmi++;
    if (p.note.some(n => /già tutto qui/.test(n))) { utili++; assert.ok(!p.note.some(n => MANCANZA.test(n)), level + ' ' + g + ' ' + days + 'gg ' + minutes + 'min: «gia tutto qui» con una nota di mancanza: ' + JSON.stringify(p.note.filter(n => MANCANZA.test(n)))); assert.strictEqual(p.metodo, null, 'con un metodo famoso non si dice'); }
  }))));
  assert.ok(utili > 5 && utili < programmi, 'il campione ha programmi con e senza la promessa: ' + utili + ' su ' + programmi);
  assert.deepStrictEqual(a.errori, []);
});

/* ---------------------------------------------------------------- 9) il taglio per il tempo non toglie l unica spinta verticale della settimana (collaudo PAT-01, EQ-02) ---------------------------------------------------------------- */
/* i 25 profili della matrice standard del collaudo (palestra, 30 minuti, spalla o schiena dolenti) che a INT-2b, prima della correzione, restavano senza nessuna spinta verticale: PAT-01:spintaV a 25 programmi
   (0 nell onda 2a). Il Landmine Press, il solo piano che la spalla dolente consente, entrava nella ricetta e usciva dal taglio per il tempo come un «isolamento» */
const PROFILI_SENZA_SPINTA_V = [
  {"goals":["massa"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":70,"sonno":"bene","attrezzi":"macchine","freq":"2","parq":"no","priorita":["gambe"],"seme":"collaudo|massa|intermedio|3|30|palestra|spalle|F|senior|1","usaProfilo":false},
  {"goals":["massa"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":45,"sonno":"bene","attrezzi":"indifferente","freq":"1","parq":"no","priorita":[],"seme":"collaudo|massa|intermedio|3|30|palestra|spalle+schiena|F|adulto|2","usaProfilo":false},
  {"goals":["forza"],"level":"intermedio","days":5,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":25,"sonno":"bene","attrezzi":"liberi","freq":"1","parq":"no","priorita":[],"seme":"collaudo|forza|intermedio|5|30|palestra|spalle|M|giovane|2","usaProfilo":false},
  {"goals":["ricomposizione"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":25,"sonno":"bene","attrezzi":"liberi","freq":"auto","parq":"si","priorita":[],"seme":"collaudo|ricomposizione|intermedio|3|30|palestra|spalle|M|giovane|0","usaProfilo":false},
  {"goals":["ricomposizione"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":25,"sonno":"male","attrezzi":"indifferente","freq":"2","parq":"no","priorita":[],"seme":"collaudo|ricomposizione|intermedio|3|30|palestra|spalle+schiena|F|giovane|1","usaProfilo":false},
  {"goals":["ricomposizione"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":70,"sonno":"male","attrezzi":"macchine","freq":"2","parq":"no","priorita":["petto","gambe"],"seme":"collaudo|ricomposizione|avanzato|3|30|palestra|spalle|F|senior|0","usaProfilo":false},
  {"goals":["ricomposizione"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":70,"sonno":"bene","attrezzi":"macchine","freq":"2","parq":"no","priorita":["schiena"],"seme":"collaudo|ricomposizione|avanzato|3|30|palestra|spalle+schiena|F|senior|1","usaProfilo":false},
  {"goals":["dimagrimento"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["ginocchia"],"sex":"F","age":45,"sonno":"bene","attrezzi":"macchine","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|dimagrimento|avanzato|3|30|palestra|ginocchia|F|adulto|1","usaProfilo":false},
  {"goals":["dimagrimento"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":45,"sonno":"bene","attrezzi":"indifferente","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|dimagrimento|avanzato|3|30|palestra|spalle+schiena|F|adulto|1","usaProfilo":false},
  {"goals":["salute"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":70,"sonno":"bene","attrezzi":"indifferente","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|salute|intermedio|3|30|palestra|spalle+schiena|F|senior|2","usaProfilo":false},
  {"goals":["salute"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":25,"sonno":"medio","attrezzi":"indifferente","freq":"2","parq":"no","priorita":["braccia"],"seme":"collaudo|salute|avanzato|3|30|palestra|spalle|M|giovane|0","usaProfilo":false},
  {"goals":["salute"],"level":"avanzato","days":4,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":25,"sonno":"medio","attrezzi":"indifferente","freq":"1","parq":"no","priorita":[],"seme":"collaudo|salute|avanzato|4|30|palestra|spalle|F|giovane|0","usaProfilo":false},
  {"goals":["glutei"],"level":"principiante","days":4,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":45,"sonno":"medio","attrezzi":"indifferente","freq":"1","parq":"no","priorita":[],"seme":"collaudo|glutei|principiante|4|30|palestra|spalle+schiena|F|adulto|1","usaProfilo":false},
  {"goals":["glutei"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":45,"sonno":"medio","attrezzi":"macchine","freq":"1","parq":"no","priorita":["braccia"],"seme":"collaudo|glutei|intermedio|3|30|palestra|spalle|F|adulto|0","usaProfilo":false},
  {"goals":["glutei"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"M","age":25,"sonno":"bene","attrezzi":"indifferente","freq":"1","parq":"si","priorita":[],"seme":"collaudo|glutei|intermedio|3|30|palestra|spalle+schiena|M|giovane|1","usaProfilo":false},
  {"goals":["glutei"],"level":"intermedio","days":6,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":45,"sonno":"medio","attrezzi":"macchine","freq":"auto","parq":"no","priorita":["schiena"],"seme":"collaudo|glutei|intermedio|6|30|palestra|spalle|M|adulto|0","usaProfilo":false},
  {"goals":["glutei"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":25,"sonno":"male","attrezzi":"indifferente","freq":"auto","parq":"no","priorita":["spalle"],"seme":"collaudo|glutei|avanzato|3|30|palestra|spalle|F|giovane|1","usaProfilo":false},
  {"goals":["massa","forza"],"level":"principiante","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":25,"sonno":"bene","attrezzi":"indifferente","freq":"2","parq":"no","priorita":["spalle"],"seme":"collaudo|massa+forza|principiante|3|30|palestra|spalle|M|giovane|2","usaProfilo":false},
  {"goals":["massa","forza"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"M","age":25,"sonno":"bene","attrezzi":"macchine","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|massa+forza|intermedio|3|30|palestra|spalle+schiena|M|giovane|0","usaProfilo":false},
  {"goals":["massa","forza"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":70,"sonno":"bene","attrezzi":"liberi","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|massa+forza|avanzato|3|30|palestra|spalle|F|senior|2","usaProfilo":false},
  {"goals":["forza","massa"],"level":"principiante","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":45,"sonno":"bene","attrezzi":"macchine","freq":"3","parq":"si","priorita":["glutei"],"seme":"collaudo|forza+massa|principiante|3|30|palestra|spalle|M|adulto|1","usaProfilo":false},
  {"goals":["forza","massa"],"level":"principiante","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"F","age":70,"sonno":"bene","attrezzi":"indifferente","freq":"3","parq":"no","priorita":["glutei"],"seme":"collaudo|forza+massa|principiante|3|30|palestra|spalle+schiena|F|senior|2","usaProfilo":false},
  {"goals":["forza","massa"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"M","age":70,"sonno":"medio","attrezzi":"indifferente","freq":"2","parq":"no","priorita":[],"seme":"collaudo|forza+massa|intermedio|3|30|palestra|spalle|M|senior|0","usaProfilo":false},
  {"goals":["forza","massa"],"level":"intermedio","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle","schiena"],"sex":"M","age":45,"sonno":"bene","attrezzi":"indifferente","freq":"1","parq":"no","priorita":[],"seme":"collaudo|forza+massa|intermedio|3|30|palestra|spalle+schiena|M|adulto|1","usaProfilo":false},
  {"goals":["forza","massa"],"level":"avanzato","days":3,"minutes":30,"luogo":"palestra","fastidi":["spalle"],"sex":"F","age":70,"sonno":"bene","attrezzi":"macchine","freq":"auto","parq":"no","priorita":[],"seme":"collaudo|forza+massa|avanzato|3|30|palestra|spalle|F|senior|2","usaProfilo":false}
];
test('adattaAlTempo: a 30 minuti il Landmine Press, la sola spinta verticale per chi ha la spalla dolente, resta nella settimana (i 25 programmi che lo perdevano)', () => {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const spintaV = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.map(e => e.name))).some(n => a.chiama('schemaDi', n) === 'spintaV' || /landmine/i.test(a.chiama('senzaEmoji', n)));
  const senza = PROFILI_SENZA_SPINTA_V.filter(d => !spintaV(a.dati(a.chiama('buildProgram', d))));
  assert.strictEqual(PROFILI_SENZA_SPINTA_V.length, 25);
  assert.deepStrictEqual(senza.map(d => d.seme), [], 'programmi ancora senza spinta verticale');
  assert.deepStrictEqual(a.errori, []);
});
