/* INT-2e, spinte e tirate nei programmi di forza (ABB-04, collaudo EQ-01): il generatore conta le spinte con schemaDi (una regex sul nome: SCHEMI_MOV) e il collaudo con l attributo `schema` (attributi-esercizi.js).
   «Panca con Pausa» e «Panca Presa Stretta» (le varianti della panca di W2-T7, FRZ-03) non erano nella regex, e il Landmine Press non contava come spinta: strBilancia non le vedeva come spinte e non toglieva le spinte in piu ne alzava le tirate, mentre il collaudo le contava.
   Sulla matrice «forza» del collaudo (1.440 profili con il powerlifting, 1.6) EQ-01 era a 245 programmi (20,3% pesata) contro 52 (3,1%) della forza generale di 2d. Le prove sotto falliscono su fd18466.
   Le altre differenze tra la regex e i dati sono elencate qui (obiettivo aperto MOD-04, «SCHEMI_MOV dagli attributi»): l elenco puo solo accorciarsi. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';

test('ABB-04: schemaDi vede la panca con pausa e la presa stretta come spinte orizzontali (come i dati)', () => {
  const a = caricaApp({ ora: LUNEDI });
  ['Panca con Pausa', 'Panca Presa Stretta'].forEach(n => {
    const nome = a.g('nomeInLibreria')(n);
    assert.strictEqual(a.g('schemaDi')(nome), 'spintaO', n);
    assert.strictEqual(a.g('attributi')(nome).schema, 'spintaO', n + ' (il dato)');
    assert.strictEqual(a.g('strEspinta')({ name: nome }), true, n);
  });
  assert.strictEqual(a.g('schemaDi')(a.g('nomeInLibreria')('Panca Piana Bilanciere')), 'spintaO');
  assert.strictEqual(a.g('schemaDi')(a.g('nomeInLibreria')('Curl su Panca Scott')), null, 'un curl su una panca non e una spinta');
});

test('ABB-04: le differenze che restano tra la regex e i dati su spinte e tirate sono quelle elencate (MOD-04: possono solo diminuire)', () => {
  const a = caricaApp({ ora: LUNEDI });
  const diverse = a.json('(function () { const o = []; const P = ["spintaO", "spintaV", "tirataO", "tirataV"]; EXERCISE_LIBRARY.forEach(e => { const at = attributi(e.name) || {}; const g = schemaDi(e.name) || null, s = at.schema || null; if ((P.indexOf(g) !== -1 || P.indexOf(s) !== -1) && g !== s) o.push(senzaEmoji(e.name)); }); return o.sort(); })()');
  assert.deepStrictEqual(diverse, ['Dip alla Macchina (Tricipiti)', 'Dip su Panca', 'Floor Press con Manubri', 'Landmine Press', 'Lat Pulldown con Elastico', 'Pullover con Manubrio', 'Seal Row'],
    'se ne aggiunge una, la regex non la riconosce: o la regex o l elenco; se ne toglie una, si accorcia l elenco (Pullover con Manubrio e una riserva voluta: SCHEMI_RISERVA)');
});

/* i programmi di forza: il conto del generatore (strSerie con strEspinta/strEtirata) e quello dei dati (attributo schema) per la stessa scheda */
function conti(a, extra) {
  return a.json('(function () { const out = []; ' +
    '[["forza"], ["forza", "massa"]].forEach(goals => ["principiante", "intermedio", "avanzato"].forEach(level => [3, 4, 5, 6].forEach(days => [30, 60, 90].forEach(minutes => {' +
    'const d = Object.assign({ goals: goals, level: level, days: days, minutes: minutes, luogo: "palestra", fastidi: [], sex: "M", age: 30, sonno: "bene", attrezzi: "indifferente", usaProfilo: false, freq: "auto", parq: "no", forzaTipo: "powerlifting", seme: "eq" + level + days + minutes + goals.length }, ' + JSON.stringify(extra || {}) + ');' +
    'const prog = buildProgram(d); let gen = [0, 0], dato = [0, 0];' +
    'prog.sedute.forEach(sd => sd.esercizi.forEach(e => { if (isTimeBased(e.name)) return; const s = (attributi(e.name) || {}).schema; if (strEspinta(e)) gen[0] += e.sets; if (strEtirata(e)) gen[1] += e.sets; if (s === "spintaO" || s === "spintaV") dato[0] += e.sets; if (s === "tirataO" || s === "tirataV" || /^(face pull|reverse|alzate posteriori|y-raise)/i.test(senzaEmoji(e.name))) dato[1] += e.sets; }));' +
    'out.push({ seme: d.seme, modalita: prog.modalita, gen: gen, dato: dato }); }))));  return out; })()');
}

test('ABB-04: nei programmi di forza il generatore conta le spinte come i dati (72 programmi con il powerlifting scelto)', () => {
  const a = caricaApp({ ora: LUNEDI });
  const c = conti(a);
  assert.strictEqual(c.length, 72);
  assert.ok(c.filter(x => x.modalita === 'forza').length >= 66, 'quasi tutti hanno la modalita Forza: ' + c.filter(x => x.modalita === 'forza').length);
  const diversi = c.filter(x => x.gen[0] !== x.dato[0]).map(x => x.seme + ': spinte ' + x.gen[0] + ' contro ' + x.dato[0]);
  assert.deepStrictEqual(diversi, [], 'il generatore non conta una spinta che i dati contano');
});

test('ABB-04: dopo il conto giusto le tirate dei programmi di forza non restano sotto il 90% delle spinte piu di prima (72 programmi)', () => {
  const a = caricaApp({ ora: LUNEDI });
  const c = conti(a);
  const sbilanciati = c.filter(x => x.dato[0] + x.dato[1] >= 8 && x.dato[1] < x.dato[0] * 0.9);
  /* sul codice di fd18466: 17 su 72 (10 a tre giorni, 4 a cinque, 3 a sei: la panca con pausa non contava, strBilancia credeva i programmi in equilibrio); dopo la panca con pausa e il Landmine Press: 11 (10 a tre giorni, 1 a cinque). Restano i tre giorni (la panca tre volte e
     una tirata per seduta, che col tempo scende a 2 serie) e i sei: il collaudo misura il residuo sulla matrice «forza» (EQ-01 245 programmi su 1.440 prima, meno dopo (vedi il registro D-P22); la forza generale di 2d: 52) */
  assert.ok(sbilanciati.length <= 11, 'programmi con le tirate sotto il 90% delle spinte: ' + sbilanciati.length + ' su 72');
});
