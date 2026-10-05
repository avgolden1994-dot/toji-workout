/* Volume per muscolo (W2-T1, piano coach v2 E.3; registro B6, B7, B19, D-P17)
   IPE-01 (fasce per unità, solutore), IPE-02 (pavimenti di serie dirette per giorni), IPE-06 (tetto per seduta), OBI-04 (deficit), EST-02 (al massimo 2 unità
   prioritarie), PRN-01 (il principiante parte da 1,0), REG-02 (la nota con la causa), pavimentoVolume e aggiungiSerieUtile.
   I numeri sono quelli del registro B6 scritti a mano: le prove falliscono sull algoritmo di prima (volume per gruppo: assegnaVolumeGruppi), che si prova spegnendo IPE-01.
   Il banco di prova e tests/aiuto-app.js (l app vera in vm). La prova funziona anche prima che l integrazione metta soglie-volume.js in index.html
   (lo carica lei) e prima che la mappa renda IPE-01 e OBI-04 «(spegnibili)» (li simula con REGOLE_SPEGNIBILI, come le prove dell onda 0). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const R = path.join(__dirname, '..');
const FILE_NUOVI = ['js/coach/volume/soglie-volume.js'];
const REGOLE_NUOVE = ['IPE-01', 'OBI-04'];
const PICCOLE = ['deltoide_laterale', 'deltoide_posteriore', 'bicipiti', 'tricipiti', 'polpacci'];

function nuovaApp(opz) {
  const a = caricaApp(Object.assign({ ora: '2026-10-05T12:00:00' }, opz || {}));
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
  FILE_NUOVI.forEach(f => { if (html.indexOf('src="' + f + '"') === -1) vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), a.ctx, { filename: f }); });
  REGOLE_NUOVE.forEach(c => a.g('REGOLE_SPEGNIBILI.indexOf(' + JSON.stringify(c) + ') === -1 && REGOLE_SPEGNIBILI.push(' + JSON.stringify(c) + ')'));
  return a;
}
/* il brief di un profilo, come lo costruisce buildProgram fino ai posti (vincoli, metodo, preferenze) */
function brief(a, d) {
  a.g('globalThis.__d = ' + JSON.stringify(d) + '; globalThis.__brief = (function () { const b = briefCoach(__d, {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); return b; })()');
}
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 90, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, seme: 'volume-1', esigenza: 1 };
const profilo = (extra) => Object.assign({}, BASE, extra || {});
const bersagli = (a, d) => { brief(a, d); return a.json('bersagliVolume(__brief)'); };
const programma = (a, d) => a.json('buildProgram(' + JSON.stringify(d) + ')');
const volume = (a, prog) => a.json('contaVolume(' + JSON.stringify(prog.sedute) + ')');
/* quante sedute hanno serie dirette di un unità */
const seduteDirette = (a, prog, u) => prog.sedute.filter(sd => sd.esercizi.some(e => a.json('creditiUnita(' + JSON.stringify(e.name) + ')')[u] === 1 && e.sets > 0)).length;

/* ========== le soglie: la tabella B6 e B7 ========== */
test('SOGLIE_VOLUME: le fasce di B6, i pavimenti per giorni, il tetto per seduta di B7 e i limiti delle priorità di B19', () => {
  const a = nuovaApp();
  const s = a.json('SOGLIE_VOLUME');
  const f = s.fasceUnita.v;
  assert.deepStrictEqual([f.petto.principiante, f.petto.intermedio, f.petto.avanzato, f.petto.mantenimento], [[6, 10], [10, 16], [12, 20], [4, 6]]);
  assert.deepStrictEqual([f.grande_gluteo.intermedio, f.schiena_spessore.intermedio, f.femorali.intermedio, f.femorali.avanzato], [[8, 14], [6, 12], [8, 12], [10, 14]]);
  assert.deepStrictEqual([f.deltoide_laterale.intermedio, f.deltoide_posteriore.intermedio, f.bicipiti.avanzato, f.tricipiti.avanzato, f.polpacci.mantenimento], [[8, 14], [6, 12], [10, 18], [8, 16], [4, 6]]);
  assert.deepStrictEqual([f.adduttori.intermedio, f.abduttori.intermedio, f.addome.intermedio, f.deltoide_anteriore.intermedio], [[3, 8], [2, 6], [4, 8], [0, 14]]);
  assert.deepStrictEqual(s.fasciaGlutei.v, { principiante: [8, 12], intermedio: [12, 18], avanzato: [14, 20] });
  assert.deepStrictEqual(s.fasceGenerale.v, { principiante: [4, 8], intermedio: [6, 10], avanzato: [8, 12] });
  const p = s.pavimentiDirette.v;
  assert.deepStrictEqual([p.deltoide_laterale.g4, p.deltoide_laterale.g3, p.deltoide_laterale.g2, p.deltoide_laterale.forza, p.deltoide_laterale.generale], [[6, 8], [4, 6], [3, 3], [2, 3], [0, 2]]);
  assert.deepStrictEqual([p.polpacci.g4, p.polpacci.g3, p.polpacci.g2, p.femorali.g3, p.addome.g4, p.bicipiti.g3], [[8, 8], [6, 6], [3, 4], [4, 4], [4, 6], [4, 4]]);
  assert.deepStrictEqual(s.tettoSeduta.v, { morbido: 8, duro: 11, specializzazione: 8, specializzazionePiccole: 6 });
  assert.strictEqual(s.tettoSeduta.forza, 'Provvisoria', 'IPE-06 e un preprint (registro C.4)');
  assert.strictEqual(s.minimoAllenati.forza, 'Solida', 'l unico numero con base solida: almeno 10 serie negli allenati');
  assert.strictEqual(s.femoraliSuQuadricipiti.v, 0.6);
  assert.deepStrictEqual(s.priorita.v, { massimoUnita: 2, aumento: { leggera: 0.25, intermedio: 0.25, avanzato: 0.45 }, tetto: { predefinito: 20, deltoide_laterale: 22, deltoide_posteriore: 22, polpacci: 22, tricipiti: 18 }, altriQuota: 0.5 });
  assert.deepStrictEqual(s.deficit.v, { minimo: 0.85, massimo: 0.9 });
});

/* ========== bersagliVolume: i numeri per unità ========== */
test('IPE-01: intermedio, ipertrofia, 4 giorni, esigenza 1: fasce IPE per petto, dorsali e quadricipiti, fasce per muscolo per le altre unità, pavimenti di serie dirette', () => {
  const a = nuovaApp();
  const b = bersagli(a, profilo());
  const u = b.unita;
  assert.strictEqual(b.tipo, 'ipertrofia');
  ['petto', 'dorsali', 'quadricipiti'].forEach(k => assert.deepStrictEqual([u[k].min, u[k].target, u[k].max, u[k].mant], [10, 10, 16, 4], k));
  assert.deepStrictEqual([u.femorali.min, u.femorali.max, u.femorali.floorD], [8, 12, 4]);
  assert.deepStrictEqual([u.grande_gluteo.min, u.grande_gluteo.max], [8, 14]);
  assert.deepStrictEqual([u.schiena_spessore.min, u.schiena_spessore.max], [6, 12]);
  assert.deepStrictEqual([u.deltoide_laterale.min, u.deltoide_laterale.max, u.deltoide_laterale.floorD], [8, 14, 6]);
  assert.deepStrictEqual([u.deltoide_posteriore.min, u.deltoide_posteriore.max, u.deltoide_posteriore.floorD], [6, 12, 4]);
  assert.deepStrictEqual([u.bicipiti.min, u.bicipiti.max, u.bicipiti.floorD], [8, 14, 4]);
  assert.deepStrictEqual([u.tricipiti.min, u.tricipiti.max, u.tricipiti.floorD], [6, 12, 4]);
  assert.deepStrictEqual([u.polpacci.min, u.polpacci.max, u.polpacci.floorD], [8, 12, 8]);
  assert.deepStrictEqual([u.addome.min, u.addome.max, u.addome.floorD], [4, 8, 4]);
  assert.deepStrictEqual([u.deltoide_anteriore.min, u.deltoide_anteriore.max], [0, 14], 'il deltoide anteriore ha solo il controllo dell eccesso');
  assert.deepStrictEqual([u.adduttori.min, u.adduttori.max, u.abduttori.min, u.abduttori.max], [3, 8, 2, 6]);
  assert.deepStrictEqual([u.petto.capMorbido, u.petto.capDuro], [8, 11], 'B7: tetto per seduta morbido 8, duro 11');
  assert.strictEqual(u.petto.prioritaria, false);
  assert.deepStrictEqual(b.prioritarie, []);
});

test('IPE-02: i pavimenti di serie dirette per giorni (3 giorni, 2 giorni), per obiettivo (forza, salute) e niente pavimento ai principianti tranne femorali e addome', () => {
  const a = nuovaApp();
  const pav = (d) => { const u = bersagli(a, d).unita; return [u.deltoide_laterale.floorD, u.deltoide_posteriore.floorD, u.bicipiti.floorD, u.polpacci.floorD, u.femorali.floorD, u.addome.floorD]; };
  assert.deepStrictEqual(pav(profilo({ days: 4 })), [6, 4, 4, 8, 4, 4]);
  assert.deepStrictEqual(pav(profilo({ days: 3 })), [4, 3, 4, 6, 4, 4]);
  assert.deepStrictEqual(pav(profilo({ days: 2 })), [3, 2, 2, 3, 2, 2]);
  assert.deepStrictEqual(pav(profilo({ days: 4, goals: ['forza'] })), [2, 2, 2, 3, 2, 2]);
  assert.deepStrictEqual(pav(profilo({ days: 4, goals: ['salute'] })), [0, 0, 0, 2, 2, 2]);
  assert.deepStrictEqual(pav(profilo({ days: 4, level: 'principiante' })), [0, 0, 0, 0, 2, 2]);
  assert.deepStrictEqual(pav(profilo({ days: 4, level: 'avanzato' })), [6, 4, 4, 8, 4, 4]);
  /* pavimentoVolume: le serie sotto cui un taglio per il tempo non scende (W2-T2) */
  brief(a, profilo({ days: 3 }));
  assert.strictEqual(a.g("pavimentoVolume(__brief, 'polpacci')"), 6);
  assert.strictEqual(a.g("pavimentoVolume(__brief, 'petto')"), 4, 'per le grandi il mantenimento della tabella');
  assert.strictEqual(a.g("pavimentoVolume(__brief, 'deltoide_laterale')"), 4);
  a.spegni(['IPE-01']);
  assert.strictEqual(a.g("pavimentoVolume(__brief, 'polpacci')"), 0, 'con IPE-01 spenta il pavimento torna 0 (algoritmo di prima)');
});

test('IPE-01: l esigenza sposta solo il punto di partenza dentro la fascia, mai oltre il massimo; i femorali almeno 0,6 volte i quadricipiti', () => {
  const a = nuovaApp();
  const u1 = bersagli(a, profilo({ esigenza: 1.2 })).unita, u0 = bersagli(a, profilo({ esigenza: 1 })).unita;
  assert.deepStrictEqual([u0.petto.target, u1.petto.target, u1.petto.max, u1.petto.min], [10, 12, 16, 10], '10 x 1,2 = 12');
  assert.deepStrictEqual([u1.polpacci.target, u1.deltoide_laterale.target, u1.femorali.target], [10, 10, 10], '8 x 1,2 = 9,6: 10');
  const alto = bersagli(a, profilo({ esigenza: 1.3, level: 'avanzato' })).unita;
  assert.strictEqual(alto.petto.target, 16, '12 x 1,3 = 15,6');
  assert.ok(alto.tricipiti.target <= alto.tricipiti.max);
  /* femorali: 0,6 x quadricipiti (priorita ai quadricipiti: bersaglio 15 -> femorali almeno 9) */
  const q = bersagli(a, profilo({ priorita: ['gambe'], level: 'intermedio' })).unita;
  assert.ok(q.quadricipiti.target >= 13 && q.femorali.min >= Math.round(0.6 * q.quadricipiti.target), 'femorali ' + q.femorali.min + ' contro quadricipiti ' + q.quadricipiti.target);
  /* esigenza sotto 1: scende anche il minimo (aderenza bassa, dolore) */
  const basso = bersagli(a, profilo({ esigenza: 0.9 })).unita;
  assert.deepStrictEqual([basso.petto.min, basso.petto.target, basso.petto.max], [9, 9, 16]);
});

test('IPE-01: forza (grandi nella meta bassa della fascia, piccole a mantenimento), salute e dimagrimento (fasce generali), principiante e obiettivo glutei', () => {
  const a = nuovaApp();
  const f = bersagli(a, profilo({ goals: ['forza'] })).unita;
  assert.deepStrictEqual([f.petto.min, f.petto.max], [10, 13], 'meta bassa di 10-16');
  assert.deepStrictEqual([f.quadricipiti.min, f.quadricipiti.max], [10, 13]);
  assert.deepStrictEqual([f.bicipiti.min, f.bicipiti.target, f.bicipiti.max], [3, 4, 14], 'piccole a mantenimento 3-4');
  const g = bersagli(a, profilo({ goals: ['salute'] })).unita;
  assert.deepStrictEqual([g.petto.min, g.petto.max, g.femorali.min, g.femorali.max], [6, 10, 6, 10], 'salute: unita grandi 6-10 (intermedio)');
  assert.deepStrictEqual([g.bicipiti.min, g.bicipiti.max, g.polpacci.min], [2, 10, 2], 'le piccole: almeno 2 serie frazionarie, nessun minimo diretto');
  const d = bersagli(a, profilo({ goals: ['dimagrimento'], esigenza: 1.2 }));
  assert.strictEqual(d.esigenza, 1, 'OBI-04: in deficit niente +20%');
  assert.deepStrictEqual([d.unita.petto.min, d.unita.petto.max], [6, 10]);
  const p = bersagli(a, profilo({ level: 'principiante' })).unita;
  assert.deepStrictEqual([p.petto.min, p.petto.max, p.polpacci.min, p.deltoide_posteriore.min, p.grande_gluteo.max], [6, 10, 4, 3, 8]);
  const gl = bersagli(a, profilo({ goals: ['glutei'], level: 'avanzato' })).unita;
  assert.deepStrictEqual([gl.grande_gluteo.min, gl.grande_gluteo.max], [14, 20], 'obiettivo glutei: 14-20 per l avanzato');
});

test('OBI-04: in deficit (il dimagrimento tra gli obiettivi) il volume parte dall 85% e non supera il 90% del picco, e l esigenza non supera il 100%', () => {
  const a = nuovaApp();
  const b = bersagli(a, profilo({ goals: ['massa', 'dimagrimento'], esigenza: 1.2 }));
  assert.strictEqual(b.deficit, true);
  assert.strictEqual(b.esigenza, 1);
  assert.deepStrictEqual([b.unita.petto.min, b.unita.petto.target, b.unita.petto.max], [9, 9, 14], '10 x 0,85 = 8,5 e 16 x 0,9 = 14,4');
  assert.deepStrictEqual([b.unita.polpacci.min, b.unita.polpacci.max], [7, 11]);
  /* l esigenza di partenza e il suo tetto (intensita.js, esigenza.js) */
  assert.strictEqual(a.chiama('esigenzaIniziale', { goals: ['dimagrimento'], level: 'intermedio' }, {}), 1);
  assert.strictEqual(a.chiama('esigenzaIniziale', { goals: ['massa', 'dimagrimento'], level: 'avanzato' }, {}), 1);
  assert.strictEqual(a.chiama('esigenzaIniziale', { goals: ['massa'], level: 'intermedio' }, {}), 1.2, 'senza deficit parte da 1,2 come prima');
  assert.strictEqual(a.chiama('tettoEsigenza', { level: 'intermedio', goals: ['dimagrimento'] }), 1);
  assert.strictEqual(a.chiama('tettoEsigenza', { level: 'intermedio', goals: ['massa'] }), 1.3);
  assert.strictEqual(a.chiama('tettoEsigenza', { level: 'principiante', goals: ['massa'] }), 1, 'PRN-01 resta');
  assert.strictEqual(a.chiama('esigenzaIniziale', { goals: ['massa'], level: 'principiante' }, {}), 1, 'PRN-01: il principiante parte da 1,0');
  /* nessuna nota «Coach esigente» in un programma di dimagrimento */
  const prog = programma(a, profilo({ goals: ['dimagrimento'], esigenza: undefined, level: 'intermedio' }));
  assert.ok(!prog.note.some(n => /Coach esigente/.test(n)), prog.note.join(' | '));
  const prog2 = programma(a, profilo({ goals: ['massa'], esigenza: undefined, level: 'intermedio' }));
  assert.ok(prog2.note.some(n => /Coach esigente/.test(n)), 'senza deficit la nota c e ancora');
});

test('EST-02, EST-03, EST-05, EST-06: al massimo 2 unita prioritarie; +25% (+45% l avanzato che specializza), tetti 20 / 22 / 18; gli altri a max(mantenimento, 50%); chi non puo specializzare ha la priorita leggera', () => {
  const a = nuovaApp();
  brief(a, profilo({ priorita: ['petto', 'schiena', 'gambe'] }));
  assert.deepStrictEqual(a.json('unitaPriorita(__brief)'), ['petto', 'dorsali'], 'tre gruppi scelti: due unita (D-P17)');
  brief(a, profilo({ priorita: ['braccia', 'spalle'] }));
  assert.deepStrictEqual(a.json('unitaPriorita(__brief)'), ['bicipiti', 'deltoide_laterale']);
  brief(a, profilo({ priorita: ['braccia'] }));
  assert.deepStrictEqual(a.json('unitaPriorita(__brief)'), ['bicipiti', 'tricipiti']);
  /* avanzato che specializza (esigenza 1): bicipiti 10 -> 15, tricipiti 8 -> 12, altri a mantenimento o meta */
  const s = bersagli(a, profilo({ level: 'avanzato', priorita: ['braccia'] }));
  assert.strictEqual(s.specializza, true);
  assert.deepStrictEqual([s.unita.bicipiti.target, s.unita.tricipiti.target], [15, 12], '+45%');
  assert.deepStrictEqual([s.unita.bicipiti.capDuro, s.unita.tricipiti.capDuro], [6, 6], 'in specializzazione 6 per le unita piccole');
  assert.deepStrictEqual([s.unita.petto.target, s.unita.petto.max], [6, 7], 'gli altri: max(mantenimento 6, 50% di 12)');
  assert.deepStrictEqual([s.unita.polpacci.target, s.unita.deltoide_laterale.target], [6, 5], 'max(mantenimento 6, meta di 10) per i polpacci, max(4, 5) per i deltoidi laterali');
  assert.strictEqual(s.unita.tricipiti.max, 18, 'tetto assoluto del tricipite');
  const sp = bersagli(a, profilo({ level: 'avanzato', priorita: ['petto'] }));
  assert.deepStrictEqual([sp.unita.petto.target, sp.unita.petto.capDuro], [17, 8], 'petto 12 + 45% = 17, tetto duro 8 per seduta');
  /* intermedio: priorita leggera (+25%), gli altri invariati; con la modalita Estetica specializza */
  const l = bersagli(a, profilo({ priorita: ['braccia'] }));
  assert.strictEqual(l.specializza, false);
  assert.deepStrictEqual([l.unita.bicipiti.target, l.unita.tricipiti.target, l.unita.petto.target], [10, 8, 10], '8 x 1,25 = 10; 6 x 1,25 = 7,5: 8; petto invariato');
  assert.deepStrictEqual([l.unita.bicipiti.capDuro], [11]);
  /* chi non puo specializzare: fastidio nella zona, prudente, deficit, minorenne */
  assert.strictEqual(bersagli(a, profilo({ level: 'avanzato', priorita: ['spalle'], fastidi: ['spalle'] })).specializza, false, 'fastidio nella zona');
  assert.strictEqual(bersagli(a, profilo({ level: 'avanzato', priorita: ['braccia'], parq: true })).specializza, false, 'modalita prudente');
  assert.strictEqual(bersagli(a, profilo({ level: 'avanzato', priorita: ['braccia'], goals: ['massa', 'dimagrimento'] })).specializza, false, 'deficit');
  assert.strictEqual(bersagli(a, profilo({ level: 'avanzato', priorita: ['braccia'], age: 16 })).specializza, false, 'minorenne');
  /* il tetto assoluto dell unita: 22 per i polpacci, 20 per le altre */
  const alto = bersagli(a, profilo({ level: 'avanzato', priorita: ['gambe'], esigenza: 1.3 })).unita;
  assert.ok(alto.quadricipiti.target <= 20 && alto.quadricipiti.max <= 20);
});

/* ========== il solutore: programmi veri ========== */
test('IPE-01: con i minuti che servono (4 giorni, 90 minuti) ogni unita entra nella sua fascia B6, sotto il massimo +10% e il pavimento di serie dirette c e', () => {
  const a = nuovaApp();
  const d = profilo();
  const b = bersagli(a, d).unita;
  const prog = programma(a, d), v = volume(a, prog);
  Object.keys(b).forEach(k => {
    const x = b[k], w = v[k].frazionarie;
    assert.ok(w >= x.minBanda - 1e-9, k + ': ' + w + ' sotto il minimo ' + x.minBanda);
    assert.ok(w <= x.max * 1.1 + 1e-9, k + ': ' + w + ' oltre il massimo ' + x.max + ' + 10%');
    if (x.floorD > 0) assert.ok(v[k].dirette >= x.floorD, k + ': ' + v[k].dirette + ' serie dirette sotto il pavimento ' + x.floorD);
  });
  assert.ok(v.femorali.frazionarie >= 0.6 * v.quadricipiti.frazionarie, 'femorali ' + v.femorali.frazionarie + ' contro quadricipiti ' + v.quadricipiti.frazionarie);
  assert.ok(prog.sedute.some(sd => sd.esercizi.some(e => /leg curl|nordic/i.test(e.name))), 'almeno una flessione del ginocchio');
  assert.ok(prog.sedute.every(sd => a.g('durataSeduta(' + JSON.stringify(sd.esercizi) + ')') <= 90 * 1.05), 'il tempo e un tetto');
});

test('FRQ-02, SES-01, REC-01: i muscoli piccoli con serie dirette in almeno 2 sedute, nessuna unita sopra 11 serie frazionarie in una seduta, 48 ore tra due sedute dello stesso grande muscolo', () => {
  const a = nuovaApp();
  [profilo(), profilo({ days: 5, minutes: 75, seme: 'volume-5' }), profilo({ days: 3, minutes: 75, seme: 'volume-6' })].forEach(d => {
    const prog = programma(a, d);
    const dueSedute = PICCOLE.filter(u => seduteDirette(a, prog, u) >= 2);
    if (d.days >= 4) assert.ok(dueSedute.length >= 4, d.days + ' giorni: solo ' + dueSedute.join(', ') + ' hanno serie dirette in 2 sedute');
    prog.sedute.forEach(sd => {
      const per = volume(a, { sedute: [sd] });
      Object.keys(per).forEach(u => assert.ok(per[u].frazionarie <= 11 + 1e-9, sd.titolo + ': ' + u + ' ' + per[u].frazionarie + ' serie frazionarie'));
    });
  });
});

test('l algoritmo di prima (IPE-01 spenta) non arriva a quei numeri: polpacci, deltoidi laterali e posteriori sotto il pavimento (la prova sopra fallirebbe)', () => {
  const a = nuovaApp();
  a.spegni(['IPE-01']);
  const d = profilo(), b = bersagli(a, d).unita;
  const prog = programma(a, d), v = volume(a, prog);
  const sotto = ['polpacci', 'deltoide_laterale', 'deltoide_posteriore', 'addome'].filter(u => v[u].dirette < b[u].floorD);
  assert.ok(sotto.length >= 2, 'con il volume per gruppi: ' + sotto.join(', ') + ' sotto il pavimento');
  assert.ok(!prog.note.some(n => /Aggiunto: .* — il muscolo restava sotto il volume minimo/.test(n)), 'niente aggiunte del solutore');
  a.riaccendi();
  const nuovo = volume(a, programma(a, d));
  assert.ok(['polpacci', 'deltoide_laterale', 'deltoide_posteriore', 'addome'].every(u => nuovo[u].dirette >= b[u].floorD), 'acceso: tutti al pavimento');
});

test('PRI-01 (collaudo): un muscolo prioritario ha almeno una serie in piu del programma senza priorita; gli altri non scendono sotto il minimo (priorita leggera)', () => {
  const a = nuovaApp();
  const senza = volume(a, programma(a, profilo()));
  const con = volume(a, programma(a, profilo({ priorita: ['braccia'] })));
  const somma = (v) => v.bicipiti.frazionarie + v.tricipiti.frazionarie;
  assert.ok(somma(con) - somma(senza) >= 1, 'braccia con priorita ' + somma(con) + ' contro ' + somma(senza));
  assert.ok(con.petto.frazionarie >= 10 && con.dorsali.frazionarie >= 10 && con.quadricipiti.frazionarie >= 10, 'gli altri restano nelle fasce');
  const p = programma(a, profilo({ priorita: ['braccia'] }));
  assert.ok(p.note.some(n => n === 'Priorità: Bicipiti, Tricipiti — qualche serie in più.'), p.note.join(' | '));
  /* tre gruppi: la nota dice che al massimo due muscoli alla volta */
  const tre = programma(a, profilo({ priorita: ['petto', 'schiena', 'gambe'] }));
  assert.ok(tre.note.some(n => /^Priorità: Petto, Dorsali — /.test(n)), tre.note.join(' | '));
  assert.ok(tre.note.some(n => n === 'Al massimo due muscoli alla volta: gli altri restano al volume normale.'), tre.note.join(' | '));
});

test('PRN-01 e principianti: partono da 1,0 senza «Coach esigente», al massimo 3 serie per esercizio, ogni unita grande dentro la fascia 6-10', () => {
  const a = nuovaApp();
  const d = profilo({ level: 'principiante', days: 3, minutes: 60, esigenza: undefined });
  const prog = programma(a, d), v = volume(a, prog);
  assert.ok(!prog.note.some(n => /Coach esigente/.test(n)));
  prog.sedute.forEach(sd => sd.esercizi.forEach(e => assert.ok(e.sets <= 3, e.name + ' ' + e.sets)));
  ['petto', 'dorsali', 'quadricipiti'].forEach(u => { assert.ok(v[u].frazionarie >= 6 && v[u].frazionarie <= 11, u + ' ' + v[u].frazionarie); });
  prog.sedute.forEach(sd => assert.ok(sd.esercizi.length <= 6, sd.titolo + ': ' + sd.esercizi.length + ' esercizi'));
});

/* ========== REG-02: la nota con la causa ========== */
test('REG-02: con 30 minuti e 2 giorni il volume non entra e la nota dice la causa («con 30 minuti non entra di più»), con la nota del mantenimento', () => {
  const a = nuovaApp();
  const prog = programma(a, profilo({ days: 2, minutes: 30, seme: 'volume-2' }));
  const nota = prog.note.find(n => /: con 30 minuti non entra di più$/.test(n));
  assert.ok(nota, prog.note.join(' | '));
  assert.ok(/^(Petto|Dorsali|Quadricipiti|Glutei|Femorali|Spessore della schiena)[^:]* serie(, [^:]+ serie)*: con 30 minuti/.test(nota), nota);
  assert.ok(prog.note.indexOf('Con questi minuti è un programma di mantenimento: per crescere servono più sedute o sedute più lunghe.') !== -1, 'sotto 4 serie frazionarie: programma di mantenimento');
  /* con i minuti che servono non c e nessuna nota di mancanza */
  const ricco = programma(a, profilo());
  assert.ok(!ricco.note.some(n => /non entra di più|programma di mantenimento/.test(n)), ricco.note.join(' | '));
});

test('validaVolume e aggiungiSerieUtile: rimette in ordine con le serie che ci sono; un esercizio mancante si chiede alla seduta con piu tempo (2 serie)', () => {
  const a = nuovaApp();
  const d = profilo();
  const prog = programma(a, d);
  /* si toglie ogni esercizio di polpacci dalla scheda e si chiede una serie utile: arriva un esercizio nuovo da 2 serie nella seduta con piu tempo */
  brief(a, d);
  a.g('globalThis.__sedute = ' + JSON.stringify(prog.sedute));
  a.g('__sedute.forEach(sd => { sd.esercizi = sd.esercizi.filter(e => !/calf raise/i.test(e.name)); })');
  assert.strictEqual(a.json('contaVolume(__sedute).polpacci.frazionarie'), 0);
  const prima = a.json('__sedute.map(sd => sd.esercizi.length)');
  const aggiunte = a.g("aggiungiSerieUtile(__brief, __sedute, 'polpacci')");
  assert.strictEqual(aggiunte, 2, 'un esercizio nuovo con 2 serie');
  const dopo = a.json('__sedute.map(sd => sd.esercizi.length)');
  assert.strictEqual(dopo.reduce((t, x) => t + x, 0), prima.reduce((t, x) => t + x, 0) + 1);
  assert.strictEqual(a.json('contaVolume(__sedute).polpacci.frazionarie'), 2);
  assert.ok(a.g("aggiungiSerieUtile(__brief, __sedute, 'polpacci')") >= 1, 'poi una serie alla volta');
  assert.ok(a.json('contaVolume(__sedute).polpacci.frazionarie') >= 3);
  /* senza posto (tutti a 30 minuti con i minuti gia pieni): niente */
  assert.strictEqual(a.g("aggiungiSerieUtile(__brief, [], 'polpacci')"), undefined);
  /* con IPE-01 spenta o senza programma: nessun effetto */
  assert.strictEqual(a.chiama('validaVolume', {}, []), undefined);
  assert.strictEqual(a.chiama('pavimentoVolume', {}, 'petto'), 0);
});

/* ========== il resto resta com e ========== */
test('con un metodo famoso il volume lo decide il metodo (algoritmo di prima, nessuna aggiunta del solutore)', () => {
  const a = nuovaApp();
  const prog = programma(a, profilo({ metodo: 'rr', luogo: 'corpo', days: 3, minutes: 45, level: 'intermedio' }));
  assert.strictEqual(prog.metodo, 'rr');
  assert.ok(!prog.note.some(n => /Aggiunto: .* — il muscolo restava|non entra di più/.test(n)), prog.note.join(' | '));
});

test('lo stesso seme, lo stesso programma (REG-05); il solutore non consuma il caso', () => {
  const a = nuovaApp();
  const d = profilo({ days: 5, minutes: 60, priorita: ['spalle'], seme: 'volume-7' });
  assert.deepStrictEqual(programma(a, d), programma(a, d));
});

/* ========== traduzioni ========== */
test('ogni frase nuova delle note del volume ha la voce in en, es e de (o la porta il JSON di integrazione)', () => {
  const a = nuovaApp();
  const dizionario = (lingua) => {
    const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, 'js/lingue/' + lingua + '.js'), 'utf8'), ctx);
    const d = Object.assign({}, (ctx.window.I18N && ctx.window.I18N[lingua]) || {});
    const json = path.join(R, 'docs/in-arrivo/w2-t1.json');
    if (fs.existsSync(json)) { const frasi = JSON.parse(fs.readFileSync(json, 'utf8')).frasi || {}; Object.keys(frasi).forEach(k => { if (frasi[k][lingua]) d[k] = frasi[k][lingua]; }); }
    return d;
  };
  const SEP = [' • ', ' · ', ' — ', ' – ', ' → ', ': ', ' / ', ', '];
  const nomi = new Set(a.json('EXERCISE_LIBRARY.map(e => senzaEmoji(e.name))'));
  /* i pezzi di una frase come li traduce trCore (traduttore.js): voce intera, numeri come #, maiuscola/minuscola, poi i separatori */
  const mancano = (frase, d, prof) => {
    if (Object.prototype.hasOwnProperty.call(d, frase) || nomi.has(frase)) return [];
    const c0 = frase.charAt(0), alt = (c0 !== c0.toLowerCase() ? c0.toLowerCase() : c0.toUpperCase()) + frase.slice(1);
    if (Object.prototype.hasOwnProperty.call(d, alt)) return [];
    const k = frase.replace(/\d+(?:[.,]\d+)*/g, '#');
    if (k !== frase && Object.prototype.hasOwnProperty.call(d, k)) return [];
    for (const sep of SEP) {
      if (frase.indexOf(sep) === -1 || (prof || 0) > 3) continue;
      return [].concat(...frase.split(sep).filter(x => x.trim()).map(p => mancano(p.trim(), d, (prof || 0) + 1)));
    }
    return [frase];
  };
  const frasi = new Set();
  const griglia = [profilo({ days: 2, minutes: 30, seme: 'volume-2' }), profilo({ days: 3, minutes: 45, seme: 'volume-8' }), profilo({ priorita: ['petto', 'schiena', 'gambe'] }), profilo({ priorita: ['braccia'] }),
    profilo({ level: 'avanzato', priorita: ['spalle', 'braccia'] }), profilo({ level: 'avanzato', priorita: ['gambe'], days: 5 }), profilo({ goals: ['salute'], days: 3, minutes: 30 }), profilo({ luogo: 'corpo', days: 5, minutes: 30 }),
    profilo({ level: 'principiante', days: 3, minutes: 30 }), profilo({ level: 'avanzato', priorita: ['glutei'], days: 6, minutes: 45, fastidi: ['schiena'] })];
  griglia.forEach(d => programma(a, d).note.forEach(n => { if (/Priorità|Specializzazione:|Al massimo due|il muscolo restava|non entra di più|non lasciano altro posto|non c’è un esercizio adatto|programma di mantenimento/.test(n)) frasi.add(n); }));
  assert.ok(frasi.size >= 6, 'frasi trovate: ' + [...frasi].join(' | '));
  ['en', 'es', 'de'].forEach(l => {
    const d = dizionario(l), m = new Set();
    frasi.forEach(f => mancano(f, d, 0).forEach(p => m.add(p)));
    assert.deepStrictEqual([...m], [], l + ': pezzi senza voce');
  });
  /* e le etichette di tutte le unita (priorità) nelle forme «Etichetta # serie» */
  const unita = a.json('UNITA_VOLUME.map(volumeEtichetta)');
  ['en', 'es', 'de'].forEach(l => { const d = dizionario(l); assert.deepStrictEqual(unita.filter(e => mancano(e, d, 0).length), [], l + ': etichette senza voce'); assert.deepStrictEqual(unita.filter(e => mancano(e + ' 4 serie', d, 0).length), [], l + ': «Etichetta # serie» senza voce'); });
});
