/* Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2).
   - tools/genera-catalogo.js: ogni regola ha UN sotto-coach (capitolo 0 della mappa), i codici di due lettere (IA-01..05) entrano,
     «(spegnibile)» e «(bloccata)» passano nel catalogo, i codici ritirati del registro A.3 e le regole bloccate senza segno lo fermano;
   - regolaAttiva (js/coach/parametri.js): una regola bloccata e sempre spenta, una «(spegnibile)» si spegne senza toccare parametri.js;
   - js/coach/regia/perche.js: aggiungiPerche, testoPerche, sottoCoachDi, nomeSottoCoach, fasePerche.
   Finche l'integrazione (INT-1) non ha applicato docs/in-arrivo/w1-t1.json (capitolo 0, capitoli 21-34, REG, righe bloccate), le prove
   sulla mappa vera la applicano in memoria con lo strumento dell'integrazione (tools/integra-onda.js, senza scrivere nulla). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), os = require('os'), path = require('path'), vm = require('vm');
const { spawnSync } = require('child_process');
const G = require('../tools/genera-catalogo.js');

const R = path.join(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(R, f), 'utf8');
const JSON_W1T1 = path.join(R, 'docs/in-arrivo/w1-t1.json');
const REGISTRO = leggi(G.FILE_REGISTRO);
const SQUADRA_ID = ['regista', 'architetto', 'dosatore', 'bilancia', 'sentinella', 'tecnico', 'preparatore', 'motivatore', 'specialista'];
/* registro C.2: bloccate in tutto (righe «(bloccata)») e in parte (righe «(parte b bloccata)») */
const BLOCCATE = ['DON-13', 'ETA-07', 'ETA-11', 'ETA-12', 'ETA-13', 'ETA-17', 'MAV-14', 'OBI-17', 'TAP-01'];
const BLOCCATE_IN_PARTE = ['DCA-03', 'ETA-08', 'REC-06', 'REC-07', 'REC-09', 'REC-12'];

let _mappa = null;
function mappaVera() {
  if (_mappa) return _mappa;
  const mappa = leggi(G.FILE_MAPPA);
  if (/^## 0\. /m.test(mappa) || !fs.existsSync(JSON_W1T1)) return (_mappa = mappa);
  const I = require('../tools/integra-onda.js');
  const errori = [], avvisi = [];
  const r = I.pianifica(I.leggiBatch([JSON_W1T1], errori, avvisi), errori, avvisi);
  assert.deepStrictEqual(errori, [], 'docs/in-arrivo/w1-t1.json non si applica alla mappa');
  return (_mappa = r.modifiche[G.FILE_MAPPA]);
}
const catalogoVero = () => G.costruisciCatalogo({ mappa: mappaVera(), registro: REGISTRO });

/* mappa in miniatura: capitolo 0 con tre sotto-coach e un capitolo di regole */
const TABELLA = ['## 0. La squadra del coach', '', '| id | Nome | Missione | Codici | File |', '|---|---|---|---|---|',
  '| `regista` | **Il Regista** | «Metto insieme.» | REG-01..06 | `js/coach/regia/` |',
  '| `motivatore` | **Il Motivatore** | «Ti conosco.» | IA-01..05, PSI-* | — |',
  '| `bilancia` | **La Bilancia** | «Decido quanto sollevi.» | CAR-01..19, TAP-01, RIC-01..02, REC-06, IPE-*, DON-*, PRI-*, SEL-* | — |'];
const mini = (righe, tabella) => (tabella || TABELLA).concat(['', '## 1. Regole di prova', ''], righe).join('\n');
const errori = c => c.errori.join('\n');
const voce = (c, codice) => c.voci.find(v => v.codice === codice);

/* contesto vm con parametri.js, un catalogo, soglie-regia.js e perche.js (localStorage in memoria) */
function contesto(testoCatalogo, prima) {
  const store = {};
  const ctx = { console, localStorage: { getItem: k => Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } } };
  ctx.window = ctx;
  vm.createContext(ctx);
  if (prima) vm.runInContext(prima, ctx);
  vm.runInContext(leggi('js/coach/parametri.js'), ctx, { filename: 'js/coach/parametri.js' });
  if (testoCatalogo) vm.runInContext(testoCatalogo, ctx, { filename: 'js/coach/catalogo-regole.js' });
  vm.runInContext(leggi('js/coach/regia/soglie-regia.js'), ctx, { filename: 'js/coach/regia/soglie-regia.js' });
  vm.runInContext(leggi('js/coach/regia/perche.js'), ctx, { filename: 'js/coach/regia/perche.js' });
  return {
    g: e => vm.runInContext(e, ctx),
    json: e => JSON.parse(vm.runInContext('JSON.stringify(' + e + ')', ctx)),
    attiva: c => vm.runInContext('regolaAttiva(' + JSON.stringify(c) + ')', ctx),
    spegni: codici => { store.tz_regole_spente = JSON.stringify(codici); }
  };
}

test('catalogo vero: ogni regola ha un sotto-coach solo, la squadra ha 9 righe, IA-01..05 e REG-01..06 ci sono', () => {
  const c = catalogoVero();
  assert.strictEqual(errori(c), '', 'il catalogo vero deve generarsi senza errori');
  assert.deepStrictEqual(c.squadra.map(s => s.id), SQUADRA_ID);
  const righeRegola = mappaVera().split('\n').filter(r => /^- \*\*[A-Z]{2,3}-\d{2}\*\* /.test(r)).length;
  assert.strictEqual(c.voci.length, righeRegola, 'ogni riga di regola della mappa e nel catalogo');
  assert.deepStrictEqual(c.voci.filter(v => SQUADRA_ID.indexOf(v.sottoCoach) === -1).map(v => v.codice), [], 'regole senza sotto-coach');
  SQUADRA_ID.forEach(id => assert.ok(c.voci.some(v => v.sottoCoach === id), id + ' possiede almeno una regola'));
  assert.deepStrictEqual(c.voci.filter(v => /^IA-/.test(v.codice)).map(v => [v.codice, v.sottoCoach]),
    ['IA-01', 'IA-02', 'IA-03', 'IA-04', 'IA-05'].map(x => [x, 'motivatore']), 'IA-01..05 (due lettere) nel catalogo, al Motivatore');
  assert.deepStrictEqual(c.voci.filter(v => /^REG-/.test(v.codice)).map(v => v.codice + ':' + v.sottoCoach),
    [1, 2, 3, 4, 5, 6].map(n => 'REG-0' + n + ':regista'));
  assert.ok(c.voci.filter(v => /^REG-/.test(v.codice)).every(v => v.area === 'Regia (REG)' && !v.spegnibile && !v.bloccata), 'REG nel capitolo 32, sempre accese');
});

test('catalogo vero: sotto-coach scelti dove la tabella B.1 del piano metteva un codice in due righe o in nessuna', () => {
  const c = catalogoVero();
  const di = codice => (voce(c, codice) || {}).sottoCoach;
  assert.deepStrictEqual(['PRG-07', 'PRG-26', 'PRG-36', 'MET-03', 'STA-03', 'RIC-03'].map(di), ['sentinella', 'preparatore', 'motivatore', 'preparatore', 'architetto', 'architetto']);
  assert.deepStrictEqual(['PRG-06', 'PRG-25', 'PRG-37', 'MET-04', 'STA-02', 'RIC-02', 'RIC-04'].map(di), ['architetto', 'dosatore', 'dosatore', 'architetto', 'bilancia', 'bilancia', 'sentinella']);
  assert.deepStrictEqual(['CAR-03', 'CAR-08', 'CAR-10', 'CAR-17', 'INT-01', 'INT-04', 'SUG-01', 'BIA-02', 'LIV-01'].map(di),
    ['sentinella', 'sentinella', 'sentinella', 'bilancia', 'sentinella', 'bilancia', 'tecnico', 'preparatore', 'regista']);
});

test('catalogo vero: «(bloccata)» e «(parte b bloccata)» per le 16 regole del registro C.2, «(spegnibile)» dalla mappa', () => {
  const c = catalogoVero();
  assert.deepStrictEqual(c.voci.filter(v => v.bloccata).map(v => v.codice).sort(), BLOCCATE);
  assert.deepStrictEqual(c.voci.filter(v => v.bloccataInParte).map(v => v.codice).sort(), BLOCCATE_IN_PARTE);
  assert.ok(c.voci.filter(v => v.bloccataInParte).every(v => !v.bloccata), 'la parte a si implementa: il codice non e bloccato');
  ['RIC-03', 'CAS-14', 'MES-10', 'ETA-04'].forEach(x => assert.strictEqual(voce(c, x).spegnibile, true, x + ' spegnibile'));
  ['MAV-02', 'MAV-03', 'ETA-01', 'ETA-02', 'ETA-03', 'PRG-01', 'REG-01'].forEach(x => assert.ok(!voce(c, x).spegnibile, x + ' resta sempre accesa'));
});

test('registro A.3: codici assorbiti, rinominati e rinviati sono ritirati; quelli attivi e i bloccati con lo stesso codice no', () => {
  const rit = G.leggiRitirati(REGISTRO.split('\n'));
  ['IPE-03', 'IPE-05', 'SEL-01', 'SEL-05', 'SEL-10', 'PCO-02', 'MES-04', 'MES-18', 'ALG-16', 'REC-10', 'ETA-06', 'CAS-09'].forEach(x => assert.match(rit[x] || '', /^assorbita/, x + ' assorbita'));
  ['PRI-01', 'DON-01', 'DON-10', 'DON-12', 'REC-13', 'REC-14', 'REC-15'].forEach(x => assert.match(rit[x] || '', /^rinominata → /, x + ' rinominata'));
  ['SEL-09', 'SEL-14', 'CAS-03', 'OBI-09', 'DON-16', 'SPE-17'].forEach(x => assert.ok(rit[x] && !/assorbita|rinominata/.test(rit[x]), x + ' senza codice finale'));
  ['IPE-01', 'IPE-09', 'CST-06', 'DON-13', 'TAP-01', 'REC-06', 'ETA-08', 'ETA-11', 'MES-02', 'CAS-14', 'ALG-02', 'STD-01'].forEach(x => assert.strictEqual(rit[x], undefined, x + ' resta un codice'));
  assert.strictEqual(rit['PRI-01'], 'rinominata → PRN-01 (esigenza del principiante ≤ 1,0, niente «Coach esigente»)');
});

test('registro C.2: 16 regole bloccate, 7 solo in parte', () => {
  const b = G.leggiBloccate(REGISTRO.split('\n'));
  assert.strictEqual(new Set(Object.keys(b).map(c => b[c].n)).size, 16);
  assert.deepStrictEqual(Object.keys(b).filter(c => !b[c].parziale).sort(), BLOCCATE.concat(['MES-18', 'REC-14']).sort());
  assert.deepStrictEqual(Object.keys(b).filter(c => b[c].parziale).sort(), ['DCA-03', 'DON-10', 'DON-12', 'DON-14', 'ETA-08', 'REC-06', 'REC-07', 'REC-09', 'REC-12']);
  assert.strictEqual(b['TAP-01'].n, 15);
});

test('catalogo -- --check fallisce: codice senza sotto-coach, in due righe, voce non valida, capitolo 0 mancante', () => {
  const senza = G.costruisciCatalogo({ mappa: mini(['- **CAR-01** carico.', '- **XYZ-01** senza padrone.']), registro: REGISTRO });
  assert.strictEqual(senza.errori.length, 1, errori(senza));
  assert.match(senza.errori[0], /^XYZ-01 \(Regole di prova\) non ha un sotto-coach/);
  assert.strictEqual(voce(senza, 'CAR-01').sottoCoach, 'bilancia');
  const tab2 = TABELLA.slice(); tab2[4] = tab2[4].replace('REG-01..06', 'REG-01..06, CAR-05');
  const due = G.costruisciCatalogo({ mappa: mini(['- **CAR-05** carico.', '- **CAR-06** carico.'], tab2), registro: REGISTRO });
  assert.strictEqual(due.errori.length, 1, errori(due));
  assert.match(due.errori[0], /^CAR-05 ha due sotto-coach \(regista, bilancia\)/);
  assert.ok(due.avvisi.some(a => /CAR-05 \(regista\) e CAR-01\.\.19 \(bilancia\) si sovrappongono/.test(a)));
  const tab3 = TABELLA.slice(); tab3[4] = tab3[4].replace('REG-01..06', 'REG-1, REG-06..01');
  assert.strictEqual(G.costruisciCatalogo({ mappa: mini([]), registro: REGISTRO }).errori.length, 0);
  assert.strictEqual(G.costruisciCatalogo({ mappa: mini([], tab3), registro: REGISTRO }).errori.filter(e => /voce «REG-(1|06\.\.01)» non valida/.test(e)).length, 2);
  const senzaCap0 = G.costruisciCatalogo({ mappa: '## 1. Regole\n\n- **CAR-01** carico.\n', registro: REGISTRO });
  assert.deepStrictEqual(senzaCap0.errori.map(e => /manca il capitolo 0/.test(e)), [true]);
});

test('catalogo: un codice ritirato del registro A.3 scritto come regola lo ferma; IPE-01 no', () => {
  const c = G.costruisciCatalogo({ mappa: mini(['- **IPE-03** tempo prima dei tagli.', '- **DON-01** partenza bassa.', '- **PRI-01** esigenza.', '- **SEL-09** niente.', '- **IPE-01** volume per muscolo (spegnibile).']), registro: REGISTRO });
  assert.strictEqual(c.errori.length, 4, errori(c));
  assert.match(errori(c), /IPE-03 e un codice ritirato nel registro A\.3 \(assorbita → CAS-07\)/);
  assert.match(errori(c), /DON-01 e un codice ritirato nel registro A\.3 \(rinominata → PAR-06\)/);
  assert.match(errori(c), /PRI-01 e un codice ritirato nel registro A\.3 \(rinominata → PRN-01/);
  assert.match(errori(c), /SEL-09 e un codice ritirato nel registro A\.3 \(senza codice finale/);
  assert.ok(!/IPE-01/.test(errori(c)));
});

test('catalogo: le regole del registro C.2 si scrivono solo con «(bloccata)» (o «(parte b bloccata)»), mai spegnibili', () => {
  const nuda = G.costruisciCatalogo({ mappa: mini(['- **TAP-01** taper prima di una gara.']), registro: REGISTRO });
  assert.deepStrictEqual(nuda.errori.map(e => /^TAP-01 e bloccata \(registro C\.2 n\. 15\)/.test(e)), [true]);
  const segnata = G.costruisciCatalogo({ mappa: mini(['- **TAP-01** (bloccata) taper: non implementata.', '- **REC-06** (parte b bloccata) parte a fatta.']), registro: REGISTRO });
  assert.strictEqual(errori(segnata), '');
  assert.strictEqual(voce(segnata, 'TAP-01').bloccata, true);
  assert.strictEqual(voce(segnata, 'REC-06').bloccataInParte, true);
  assert.strictEqual(voce(segnata, 'REC-06').bloccata, undefined);
  const parteNuda = G.costruisciCatalogo({ mappa: mini(['- **REC-06** respiro.']), registro: REGISTRO });
  assert.deepStrictEqual(parteNuda.errori.map(e => /^REC-06 e bloccata in parte \(registro C\.2 n\. 1\)/.test(e)), [true]);
  const entrambe = G.costruisciCatalogo({ mappa: mini(['- **TAP-01** (spegnibile) (bloccata) taper.']), registro: REGISTRO });
  assert.deepStrictEqual(entrambe.errori.map(e => /insieme «\(spegnibile\)» e «\(bloccata\)»/.test(e)), [true]);
});

test('npm run catalogo: esce 1 e non scrive con un codice senza sotto-coach; --check esce 0 solo con il catalogo aggiornato', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'catalogo-prova-'));
  try {
    fs.mkdirSync(path.join(tmp, 'docs'), { recursive: true }); fs.mkdirSync(path.join(tmp, 'js/coach'), { recursive: true });
    fs.writeFileSync(path.join(tmp, G.FILE_REGISTRO), REGISTRO);
    const lancia = (...a) => spawnSync(process.execPath, [path.join(R, 'tools/genera-catalogo.js'), '--radice', tmp].concat(a), { encoding: 'utf8' });
    fs.writeFileSync(path.join(tmp, G.FILE_MAPPA), mini(['- **CAR-01** carico.', '- **XYZ-01** senza padrone.']));
    const rotto = lancia();
    assert.strictEqual(rotto.status, 1, rotto.stdout + rotto.stderr);
    assert.match(rotto.stderr, /XYZ-01 .* non ha un sotto-coach/);
    assert.ok(!fs.existsSync(path.join(tmp, G.FILE_CATALOGO)), 'con un errore il catalogo non si scrive');
    fs.writeFileSync(path.join(tmp, G.FILE_MAPPA), mini(['- **CAR-01** carico.', '- **IA-01** consenso.', '- **TAP-01** (bloccata) taper.']));
    assert.strictEqual(lancia('--check').status, 1, 'catalogo mancante');
    assert.strictEqual(lancia().status, 0);
    assert.strictEqual(lancia('--check').status, 0);
    fs.appendFileSync(path.join(tmp, G.FILE_MAPPA), '- **REG-01** nuova.\n');
    assert.strictEqual(lancia('--check').status, 1, 'mappa cambiata: catalogo vecchio');
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});

test('regolaAttiva: «(bloccata)» sempre spenta, «(spegnibile)» si spegne senza toccare parametri.js, le storiche restano accese', () => {
  const c = G.costruisciCatalogo({ mappa: mini(['- **CAR-01** storica.', '- **CAR-18** (spegnibile) calibrazione rapida.', '- **TAP-01** (bloccata) taper.', '- **RIC-01** serie in piu.']), registro: REGISTRO });
  assert.strictEqual(errori(c), '');
  const a = contesto(c.testo);
  assert.strictEqual(a.g("REGOLE_SPEGNIBILI.indexOf('CAR-18')"), -1, 'CAR-18 non e in parametri.js');
  assert.strictEqual(a.attiva('CAR-18'), true);
  assert.strictEqual(a.attiva('TAP-01'), false, 'bloccata: spenta anche senza tz_regole_spente');
  a.spegni(['CAR-18', 'CAR-01', 'RIC-01']);
  assert.strictEqual(a.attiva('CAR-18'), false, 'spegnibile dalla mappa');
  assert.strictEqual(a.attiva('CAR-01'), true, 'storica: spegnerla non ha effetto');
  assert.strictEqual(a.attiva('RIC-01'), false, 'REGOLE_SPEGNIBILI vale ancora');
  assert.strictEqual(a.attiva('XYZ-01'), true, 'codice sconosciuto: acceso come prima');
  a.spegni([]);
  a.g("REGOLE_SPEGNIBILI.push('TAP-01')");
  assert.strictEqual(a.attiva('TAP-01'), false, 'una bloccata non si riaccende nemmeno da parametri.js');
  assert.strictEqual(a.attiva('RIC-01'), true);
  /* senza catalogo (prima che sia caricato) regolaAttiva funziona come prima */
  const s = contesto(null);
  assert.strictEqual(s.attiva('TAP-01'), true);
  s.spegni(['RIC-01']); assert.strictEqual(s.attiva('RIC-01'), false);
});

test('regolaAttiva sul catalogo vero: le 9 regole bloccate sono spente, RIC-03 si spegne', () => {
  const a = contesto(catalogoVero().testo);
  assert.deepStrictEqual(BLOCCATE.map(a.attiva), BLOCCATE.map(() => false));
  assert.deepStrictEqual(BLOCCATE_IN_PARTE.map(a.attiva), BLOCCATE_IN_PARTE.map(() => true), 'la parte a resta attiva');
  assert.strictEqual(a.attiva('RIC-03'), true);
  a.spegni(['RIC-03', 'MAV-03', 'REG-01']);
  assert.deepStrictEqual(['RIC-03', 'MAV-03', 'REG-01'].map(a.attiva), [false, true, true]);
  assert.strictEqual(a.g("regolaDescritta('IA-02').sottoCoach"), 'motivatore');
  assert.strictEqual(a.g("regolaDescritta('IPE-03')"), null);
});

test('perche.js: sottoCoachDi e nomeSottoCoach dal catalogo e dalla tabella della squadra', () => {
  const a = contesto(catalogoVero().testo);
  const di = c => a.g('sottoCoachDi(' + JSON.stringify(c) + ')');
  assert.deepStrictEqual(['CAR-05', 'PRG-07', 'MET-03', 'RIC-03', 'IA-03', 'REG-03'].map(di), ['bilancia', 'sentinella', 'preparatore', 'architetto', 'motivatore', 'regista']);
  assert.deepStrictEqual(['CAR-18', 'FRZ-05', 'IPE-01', 'RIS-13'].map(di), ['bilancia', 'specialista', 'dosatore', 'tecnico'], 'codici non ancora nella mappa: dalla tabella');
  assert.deepStrictEqual(['IPE-03', 'XYZ-01', 'nonso'].map(di), [null, null, null]);
  assert.strictEqual(a.g("nomeSottoCoach('architetto')"), 'L’Architetto');
  assert.strictEqual(a.g("nomeSottoCoach('architetto', { breve: true })"), 'Architetto');
  assert.deepStrictEqual(a.json("COACH_SQUADRA.map(s => nomeSottoCoach(s.id, { breve: true }))"),
    ['Regista', 'Architetto', 'Dosatore', 'Bilancia', 'Sentinella', 'Tecnico', 'Preparatore', 'Motivatore', 'Specialista']);
  assert.strictEqual(a.g("nomeSottoCoach('cuoco')"), '');
});

test('perche.js: aggiungiPerche senza doppioni e mai per una regola bloccata; testoPerche come i motivi di oggi', () => {
  const a = contesto(catalogoVero().testo);
  a.g("var d = {}; var v1 = aggiungiPerche(d, 'CAR-05', 'serie facili: +2,5 kg', { forza: 'Convenzione', codice: 'XXX-99' })");
  assert.deepStrictEqual(a.json('d.perche'), [{ forza: 'Convenzione', codice: 'CAR-05', sottoCoach: 'bilancia', testo: 'serie facili: +2,5 kg' }]);
  assert.strictEqual(a.g("aggiungiPerche(d, 'CAR-05', '  serie facili: +2,5 kg ') === v1"), true, 'stesso codice e testo: nessun doppione');
  a.g("aggiungiPerche(d, 'PRZ-02', 'prontezza bassa: -4%')");
  assert.strictEqual(a.g("aggiungiPerche(d, 'TAP-01', 'taper prima della gara')"), null, 'regola bloccata: nessun perché');
  assert.strictEqual(a.g("aggiungiPerche(d, 'CAR-06', '   ')"), null);
  assert.strictEqual(a.g('d.perche.length'), 2);
  assert.strictEqual(a.g('testoPerche(d)'), 'serie facili: +2,5 kg • prontezza bassa: -4%');
  assert.strictEqual(a.g('testoPerche(d.perche, { etichette: true })'), 'Bilancia · serie facili: +2,5 kg • Sentinella · prontezza bassa: -4%');
  assert.strictEqual(a.g("testoPerche([{ testo: 'a' }, null, { testo: '' }, 'b', { testo: 'a' }])"), 'a • b');
  assert.strictEqual(a.g('testoPerche(null)'), '');
});

test('perche.js: fasePerche lascia identico un risultato senza perché e aggiunge al motivo solo i pezzi nuovi', () => {
  const a = contesto(catalogoVero().testo);
  assert.strictEqual(a.g("(function(){ var r = { weight: 60, motivo: 'serie complete • RIR 2' }; return fasePerche(r) === r && r.motivo === 'serie complete • RIR 2' && !('perche' in r); })()"), true);
  assert.strictEqual(a.g("fasePerche({ motivo: 'serie complete', perche: [{ testo: 'serie complete' }, { testo: 'settimana di scarico: -10%' }] }).motivo"), 'serie complete • settimana di scarico: -10%');
  assert.strictEqual(a.g("fasePerche({ perche: [{ testo: 'primo' }] }).motivo"), 'primo');
  assert.strictEqual(a.g('fasePerche(null)'), null);
});

test('perche.js: con la catena delle fasi (W1-T3) si registra come fase 99 di «carico»; senza, nessun errore', () => {
  const a = contesto(catalogoVero().testo, 'var registrate = []; function registraFase() { registrate.push(Array.prototype.slice.call(arguments)); }');
  assert.deepStrictEqual(a.json('registrate.map(x => x.slice(0, 3))'), [['carico', 99, 'REG-03']]);
  assert.strictEqual(a.g('registrate[0][3] === fasePerche'), true);
  assert.strictEqual(contesto(catalogoVero().testo).g('typeof fasePerche'), 'function');
});

test('nomi, nomi brevi e missioni della squadra sono tradotti in en, es, de (dizionari o docs/in-arrivo/w1-t1.json)', () => {
  const frasiJson = fs.existsSync(JSON_W1T1) ? JSON.parse(fs.readFileSync(JSON_W1T1, 'utf8')).frasi || {} : {};
  const diz = {};
  ['en', 'es', 'de'].forEach(l => { const w = {}; vm.runInNewContext(leggi('js/lingue/' + l + '.js'), { window: w }); diz[l] = w.I18N[l]; });
  const a = contesto(catalogoVero().testo);
  const frasi = a.json('COACH_SQUADRA.map(s => [s.nome, nomeSottoCoach(s.id, { breve: true }), s.missione])').reduce((x, y) => x.concat(y), [])
    .concat(a.json("['Convenzione', 'Decisione', 'Provvisoria'].map(etichettaForza)"));
  assert.strictEqual(frasi.length, 30);
  const mancanti = [];
  frasi.forEach(f => ['en', 'es', 'de'].forEach(l => { if (!(frasiJson[f] && frasiJson[f][l]) && !diz[l][f]) mancanti.push(l + ': ' + f); }));
  assert.deepStrictEqual(mancanti, []);
});
