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
