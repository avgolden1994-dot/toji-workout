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
