/* Correzioni dopo la revisione finale indipendente dell onda 5 (D-P26): B1 traduzioni, B2 due testi che promettevano piu di quello che il coach mantiene.
   (A1 ALG-19 e in tests/onda5-ripresa-prudenti.test.js, A2 la domanda sulla gravidanza in tests/onda5-gravidanza-parq.test.js.)
   B1: le note «Cima del range raggiunta (#): +# kg e si riparte da # (modalita prudente)» e «Arrivato a # ripetizioni: ora +# kg e si riparte da # (modalita prudente)» non avevano la
   voce con il suffisso: in en/es/de chi e prudente leggeva meta frase in italiano («Reached 12 reps: ora +2.5 kg e si riparte da 10 (modalita prudente)»).
   B2: «poi si sale in fretta» (partenza bassa voluta) la leggevano anche gli over 65, il PAR-Q, la gravidanza, il sonno scarso e i minorenni, che hanno gli aumenti dimezzati o nessuna
   rincorsa; «ti da routine e umore» (momento «fine di una relazione») affermava un beneficio sull umore (OBI-17 e bloccata: nessuna frase sui benefici per umore e sonno).
   Ogni prova e stata scritta prima della correzione e fallisce sul codice del tag coach-v2-onda-5. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const LINGUE = ['en', 'es', 'de'];

/* ---------- B1: le note dei prudenti si traducono per intero ---------- */
const NOTE_B1 = [
  'Arrivato a 12 ripetizioni: ora +2,5 kg e si riparte da 10 (modalita prudente)',
  'Arrivato a 12 ripetizioni: ora +2,5 kg e si riparte da 10 (aumento prudente: recupero scarso)',
  'Cima del range raggiunta (15): +2,5 kg e si riparte da 12 (modalita prudente)',
  'Cima del range raggiunta (15): +2,5 kg e si riparte da 12 (aumento prudente: recupero scarso)',
  /* i casi che gia funzionavano non devono rompersi */
  'Tutte le serie complete la volta scorsa: +2,5 kg (modalita prudente)',
  'Arrivato a 12 ripetizioni: ora +2,5 kg e si riparte da 10',
  'Cima del range raggiunta (15): +2,5 kg e si riparte da 12 • aumento dimezzato: dopo i 65 anni si sale più piano'
];
/* il dizionario e la lingua si scelgono all avvio della pagina: nella vm si imposta LINGUA a mano (let globale del traduttore) */
function appIn(l) { const a = caricaApp({ ora: LUNEDI }); if (l !== 'it') a.g("LINGUA = '" + l + "'"); return a; }
const RESIDUO_ITALIANO = /modalita|si riparte|riparte da|\bora \+|Arrivato|Cima del|recupero scarso|dimezzato|\bdopo i\b/i;

LINGUE.forEach(l => {
  test('B1 (' + l + '): le note di progressione dei prudenti sono tradotte per intero, senza pezzi in italiano', () => {
    const a = appIn(l);
    const residui = NOTE_B1.map(n => ({ n: n, t: String(a.g('tr(' + JSON.stringify(n) + ')')) })).filter(x => RESIDUO_ITALIANO.test(x.t));
    assert.deepStrictEqual(residui, [], l + ': note con pezzi in italiano:\n' + residui.map(x => x.n + '\n   -> ' + x.t).join('\n'));
  });
});

test('B1: la nota vera di un prudente, prodotta da caricoProssimo, si traduce per intero in en, es e de', () => {
  const nota = (extra) => {
    const a = caricaApp({ ora: LUNEDI });
    a.profilo(Object.assign({ level: 'intermedio', sex: 'F', age: 40, parq: true }, extra || {}));
    return a;
  };
  const a = nota();
  /* un isolamento arrivato alla cima del range: +1 passo con la dicitura dei prudenti */
  const nome = a.g("EXERCISE_LIBRARY.find(e => e.type !== 'compound' && !isTimeBased(e.name) && Number(e.weight) > 0 && /manubri|cavi/i.test(attrezzoDi(e.name) || '')).name");
  a.storia([a.seduta(7, [{ nome: nome, serie: [[10, 15, true, 7], [10, 15, true, 7], [10, 15, true, 7]] }])]);
  const r = a.dati(a.chiama('caricoProssimo', nome, 10, 12, 3));
  assert.ok(/modalita prudente/.test(r.motivo), r.motivo);
  LINGUE.forEach(l => {
    const b = appIn(l);
    const t = String(b.g('tr(' + JSON.stringify(r.motivo) + ')'));
    assert.ok(!RESIDUO_ITALIANO.test(t), l + ': ' + r.motivo + '\n   -> ' + t);
  });
});

/* ---------- B2: nessuna promessa di salire in fretta a chi ha gli aumenti dimezzati ---------- */
const PROGRAMMA = (extra) => Object.assign({ goals: ['massa'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, weight: 65, fastidi: [], sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false, seme: 'p05' }, extra || {});
const PROMESSA = /sale in fretta|si sale in fretta/;
const CHI = {
  'PAR-Q positivo': { parq: 'si' },
  'over 65': { age: 70 },
  'minorenne': { age: 16 },
  'sonno scarso': { sonno: 'male' }
};

test('B2: la nota del programma con la partenza bassa promette di salire in fretta solo a chi ha gli aumenti normali', () => {
  const a = caricaApp({ ora: LUNEDI });
  const adulta = a.dati(a.chiama('buildProgram', PROGRAMMA()));
  assert.ok(adulta.note.some(n => n === 'Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento, poi il coach sale in fretta.'), 'l adulta senza PAR-Q: la nota di sempre');
  Object.keys(CHI).filter(k => k !== 'sonno scarso').forEach(k => {
    const p = a.dati(a.chiama('buildProgram', PROGRAMMA(CHI[k])));
    assert.ok(p.note.some(n => /bassi di proposito/.test(n)), k + ': la partenza e comunque bassa e lo dice');
    assert.ok(!p.note.some(n => PROMESSA.test(n)), k + ': niente «sale in fretta»: ' + p.note.filter(n => PROMESSA.test(n)).join(' | '));
    assert.ok(p.note.some(n => n === 'Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento.'), k + ': la nota senza promessa');
  });
});

test('B2: la nota dell esercizio alla prima seduta (tipo «nuovo») idem: la promessa solo a chi ha gli aumenti normali', () => {
  const nota = (profilo) => {
    const a = caricaApp({ ora: LUNEDI });
    a.profilo(Object.assign({ level: 'principiante', sex: 'F', age: 30 }, profilo || {}));
    return String(a.g("motivoStimaDi('pesoBassa')"));
  };
  assert.ok(/^Partenza bassa voluta: impari il movimento, poi si sale in fretta • Oggi si parte leggeri apposta/.test(nota()), nota());
  [['PAR-Q positivo', { parq: true }], ['over 65', { age: 70 }], ['minorenne', { age: 16 }], ['sonno scarso', { prefs: { sonno: 'male' } }]].forEach(([k, p]) => {
    const t = nota(p);
    assert.ok(!PROMESSA.test(t), k + ': ' + t);
    assert.ok(/^Partenza bassa voluta: impari il movimento • Oggi si parte leggeri apposta/.test(t), k + ': ' + t);
  });
  /* le altre fonti della stima restano com erano per tutti */
  assert.strictEqual(String(caricaApp({ ora: LUNEDI }).g("motivoStimaDi('peso')")), String(caricaApp({ ora: LUNEDI }).g("MOTIVI_STIMA.peso")));
});

LINGUE.forEach(l => {
  test('B2 (' + l + '): le due frasi senza la promessa e il momento «fine di una relazione» sono tradotti', () => {
    const a = appIn(l);
    const frasi = ['Partenza bassa voluta: impari il movimento • Oggi si parte leggeri apposta: non è un test. L’obiettivo è finire con 3-4 ripetizioni in più',
      'Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento.',
      String(a.g("MOMENTI.find(m => m.id === 'rottura').testo"))];
    frasi.forEach(f => {
      const t = String(a.g('tr(' + JSON.stringify(f) + ')'));
      assert.notStrictEqual(t, f, l + ': non tradotta: ' + f);
      assert.ok(!/Partenza|Carichi di|Dopo una|molti si|routine sostenibile|purché/.test(t), l + ': pezzi in italiano: ' + t);
    });
  });
});

test('B2: il momento «fine di una relazione» non afferma un beneficio sull umore (OBI-17 e bloccata) e il vecchio testo non e piu in nessun dizionario', () => {
  const a = caricaApp({ ora: LUNEDI });
  const testo = String(a.g("MOMENTI.find(m => m.id === 'rottura').testo"));
  assert.ok(!/umore|mood|ánimo|Stimmung/i.test(testo), testo);
  assert.ok(/routine/.test(testo) && /massimali/.test(testo) && /sonno/.test(testo), 'le cautele restano: ' + testo);
  LINGUE.forEach(l => {
    const b = appIn(l);
    assert.ok(!b.g("Object.keys(window.I18N[window.lingua()]).some(k => /ti dà routine e umore/.test(k))"), l + ': la vecchia voce e ancora nel dizionario');
  });
});
