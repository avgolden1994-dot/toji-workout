/* Il cancello delle tecniche (piano coach v2, onda 2a, W2-T3): MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02, l aggancio di MES-02 in rirBersaglioBase.
   Prove in node con l app vera in vm (tests/aiuto-app.js, orologio e caso fissi). Le due righe <script> dei file nuovi (soglie-tecniche.js, tecnica-adatta.js) le mette
   l integrazione (docs/in-arrivo/w2-t3.json): se index.html non le ha ancora, la prova carica da sola i due file nel contesto.
   Quattro parti: (1) la MATRICE tecnica x classe x livello x eta x vincolo di tecnicaAdatta, con cifre e booleani; (2) il budget per seduta e per settimana e la posizione nel
   blocco (budgetTecniche); (3) i programmi veri su una griglia di profili: nessuna tecnica dove non deve essere, budget mai superato; (4) RIC-04 in seduta, i metodi famosi,
   i testi onesti e l aggancio del RIR per settimana. MAV-14 (BFR) e bloccata dalla verifica: non c e, nemmeno come testo. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const R = path.join(__dirname, '..');
const ORA = '2026-10-05T12:00:00';   /* lunedi */
const FILE_NUOVI = ['js/coach/sicurezza/soglie-tecniche.js', 'js/coach/sicurezza/tecnica-adatta.js'];
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();

function nuovaApp() {
  const a = caricaApp({ ora: ORA });
  if (a.g('typeof tecnicaAdatta') === 'undefined') FILE_NUOVI.forEach(f => vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), a.ctx, { filename: f }));
  /* un aiutante nel mondo dell app: la tecnica `t` sull esercizio `n`, per la persona `p` e il vincolo `c`, con il brief come lo costruisce il generatore (chiDa + vincoliSicurezza) */
  a.g(`window.__brief3 = function (p, c) {
    const chi = chiDa({ age: p.eta, level: p.livello, parq: p.parq ? 'si' : 'no' });
    const brief = { chi: chi, sicurezza: { fastidi: c.fastidi || [], vincoli: null }, agenda: { minuti: c.minuti || 60 }, mente: { momento: c.momento || null }, lavoro: { specializza: !!c.specializza } };
    brief.sicurezza.vincoli = vincoliSicurezza(brief);
    return brief;
  }`);
  a.g(`window.__t3 = function (t, n, p, c) {
    c = c || {};
    return tecnicaAdatta(t, n, __brief3(p, c), { settimana: c.settimana, prontezza: c.prontezza, coppia: c.coppia, piano: c.piano });
  }`);
  a.g(`window.__b3 = function (p, c) {
    c = c || {};
    const b = budgetTecniche(__brief3(p, c), c.settimana, { prontezza: c.prontezza, piano: c.piano });
    return { perSeduta: b.perSeduta, perSettimana: b.perSettimana, gruppi: b.gruppi, tier: b.tier };
  }`);
  /* tutta la matrice in una chiamata sola: 1 se ok, nell ordine persona, vincolo, tecnica, esercizio */
  a.g(`window.__m3 = function (persone, vincoli, tecniche, esercizi) {
    const out = [];
    Object.keys(persone).forEach(pn => Object.keys(vincoli).forEach(vn => tecniche.forEach(t => esercizi.forEach(n => out.push(__t3(t, n, persone[pn], vincoli[vn]).ok ? 1 : 0)))));
    return out;
  }`);
  return a;
}
let _app = null;
const app = () => _app || (_app = nuovaApp());
const adatta = (t, n, p, c) => app().dati(app().chiama('__t3', t, n, p, c)).ok === true;
const motivo = (t, n, p, c) => app().dati(app().chiama('__t3', t, n, p, c));
const budget = (p, c) => app().dati(app().chiama('__b3', p, c));
const attr = n => app().json('(function (n) { const a = attributi(n); return a ? { classe: a.classe, profilo: a.profilo, attrezzo: a.attrezzo, schema: a.schema, abilita: a.abilita } : null; })(' + JSON.stringify(n) + ')');

/* le persone della matrice: livello, eta, PAR-Q */
const PERSONE = {
  principiante: { livello: 'principiante', eta: 30 },
  intermedio: { livello: 'intermedio', eta: 30 },
  avanzato: { livello: 'avanzato', eta: 30 },
  minore: { livello: 'avanzato', eta: 16 },
  mezzaEta: { livello: 'avanzato', eta: 55 },
  over65: { livello: 'avanzato', eta: 70 },
  parq: { livello: 'avanzato', eta: 30, parq: true }
};
/* un campione per classe (gli attributi di js/dati/attributi-esercizi.js: A bilanciere libero, B multiarticolare libero, C guidato, D isolamento a macchina o cavo, E libero, F core e corpo libero a zero kg) */
const ESERCIZI = {
  A: ['Panca Piana Bilanciere', 'Squat con Bilanciere', 'Stacco da Terra (Deadlift)', 'Front Squat', 'Rematore con Bilanciere', 'Military Press'],
  B: ['Panca Piana Manubri', 'Goblet Squat', 'Rematore con Manubrio', 'Stacco Rumeno con Manubri', 'Dip alle Parallele', 'Piegamenti a Terra (Push-up)'],
  C: ['Chest Press Machine', 'Leg Press', 'Lat Machine', 'Shoulder Press Machine', 'Hack Squat', 'Pulley Basso'],
  D: ['Leg Extension', 'Calf Raise in Piedi', 'Curl ai Cavi', 'Pectoral Machine (Butterfly)', 'Alzate Laterali ai Cavi', 'Estensione Tricipiti sopra la Testa ai Cavi'],
  E: ['Curl su Panca Inclinata', 'Alzate Laterali', 'Croci su Panca Manubri', 'Hammer Curl', 'Calf Raise con Manubrio sul Gradino', 'Estensione Tricipiti sopra la Testa con Manubrio'],
  F: ['Plank', 'Pallof Press', 'Dead Bug', 'Calf Raise a un Piede (Corpo Libero)', 'Nordic Curl', 'Hyperextension (Lombari)', 'Crunch al Cavo']
};
const TUTTI_ESERCIZI = [].concat.apply([], Object.keys(ESERCIZI).map(c => ESERCIZI[c].map(n => ({ classe: c, nome: n }))));
const TECNICHE_NOTE = ['tempo', 'picco', 'potenza', 'superserie', 'cluster', 'piramide', 'ottoperotto', 'drop', 'riposopausa', 'myo', 'amrap', 'backoff', 'calibrazione', 'parziali', 'negativa', 'forzate'];
const AL_CEDIMENTO = ['drop', 'riposopausa', 'myo', 'amrap', 'backoff', 'calibrazione', 'parziali'];   /* G2 e G2b */
const G2_G5 = AL_CEDIMENTO.concat(['negativa', 'forzate', 'piramide', 'ottoperotto']);
const FASI_4 = ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'];
const FASI_6 = ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'carico', 'carico', 'scarico'];
const sett = (numero, fasi) => ({ numero: numero, fase: fasi[numero - 1], fasi: fasi });

/* ============================================================ 1. la matrice ============================================================ */
test('MAV-01: la matrice tecnica x classe x persona x vincolo: cifre e booleani (nessun ok dove non deve esserci)', () => {
  const vincoli = { base: {}, scarico: { settimana: sett(4, FASI_4) }, prontezza: { prontezza: 40 }, spalle: { fastidi: ['spalle'] }, poco: { minuti: 45 }, primaSettimana: { settimana: sett(1, FASI_4) } };
  const tecniche = TECNICHE_NOTE.concat(['bfr', 'zzz']);
  const flat = app().dati(app().chiama('__m3', PERSONE, vincoli, tecniche, TUTTI_ESERCIZI.map(e => e.nome)));
  const righe = [];
  Object.keys(PERSONE).forEach(pn => Object.keys(vincoli).forEach(vn => tecniche.forEach(t => TUTTI_ESERCIZI.forEach(es => { righe.push({ pn: pn, vn: vn, t: t, es: es, ok: flat[righe.length] === 1 }); }))));
  const ok = r => r.ok;
  const conta = f => righe.filter(r => r.ok && f(r)).length;
  assert.strictEqual(righe.length, Object.keys(PERSONE).length * Object.keys(vincoli).length * tecniche.length * TUTTI_ESERCIZI.length, 'la matrice: 7 persone x 6 vincoli x 18 tecniche x ' + TUTTI_ESERCIZI.length + ' esercizi = ' + righe.length);
  /* una tecnica che non e nella lista (BFR e bloccata dalla verifica, registro C.2 n. 14; una inventata) non passa mai */
  assert.strictEqual(conta(r => r.t === 'bfr' || r.t === 'zzz'), 0);
  /* forzate e negative: solo manuali, mai assegnate dal coach */
  assert.strictEqual(conta(r => r.t === 'forzate' || r.t === 'negativa'), 0);
  /* classe F (core, tenute, corpo libero a zero kg): nessuna tecnica di intensita, per nessuno (tranne la discesa controllata e, per il corpo libero, la superserie) */
  assert.strictEqual(conta(r => r.es.classe === 'F' && r.t !== 'tempo' && r.t !== 'superserie'), 0, 'classe F: solo la discesa controllata');
  assert.strictEqual(conta(r => r.es.nome === 'Plank' && r.t === 'superserie'), 0, 'il core non va in superserie (SS-02)');
  assert.strictEqual(conta(r => r.es.nome === 'Pallof Press' && r.t !== 'tempo'), 0, 'il Pallof Press non ha tecniche');
  assert.ok(conta(r => r.es.classe === 'F' && r.t === 'tempo') > 0);
  /* principiante, minorenne, over 65 e modalita prudente: nessuna tecnica verso il cedimento (G2, G2b), ne piramide e 8x8 */
  ['principiante', 'minore', 'over65', 'parq'].forEach(pn => assert.strictEqual(conta(r => r.pn === pn && G2_G5.indexOf(r.t) !== -1), 0, pn + ': niente G2, G2b, piramide, 8x8'));
  /* il minorenne: solo la discesa controllata, il picco e la superserie; niente cluster, niente potenza (ETA-02) */
  const minore = righe.filter(r => r.pn === 'minore' && r.ok).map(r => r.t);
  assert.deepStrictEqual(Array.from(new Set(minore)).sort(), ['picco', 'superserie', 'tempo']);
  /* il principiante sano: tempo, picco, superserie; il cluster no (G1c); la potenza e degli over 65 */
  assert.deepStrictEqual(Array.from(new Set(righe.filter(r => r.pn === 'principiante' && r.ok).map(r => r.t))).sort(), ['picco', 'superserie', 'tempo']);
  /* gli over 65: potenza e cluster solo su macchina guidata (C); la superserie solo tra macchine e cavi */
  assert.strictEqual(conta(r => r.pn === 'over65' && (r.t === 'potenza' || r.t === 'cluster') && r.es.classe !== 'C'), 0);
  /* P4-S (ETA-08 parte a, D-P21 n. 5): con sicurezza/popolazioni.js la potenza c'e solo dopo le 8 settimane di base, e nessun vincolo di questa matrice e dopo la base (nessuna
     settimana = la generazione, scarico alla 4a, prima settimana): qui non compare; la potenza dopo la base e provata in tests/popolazioni.test.js */
  if (app().g("typeof potenzaAmmessaOver65 === 'function'")) assert.strictEqual(conta(r => r.t === 'potenza'), 0, 'nessuna potenza nella base (P4-S)');
  else assert.ok(conta(r => r.pn === 'over65' && r.t === 'potenza' && r.es.classe === 'C' && r.vn === 'base') > 0, 'la potenza sulle macchine guidate c e');
  righe.filter(r => r.pn === 'over65' && r.t === 'superserie' && r.ok).forEach(r => assert.ok(['macchina', 'cavo'].indexOf(attr(r.es.nome).attrezzo) !== -1, 'over 65 in superserie: ' + r.es.nome));
  assert.strictEqual(conta(r => r.t === 'potenza' && r.pn !== 'over65'), 0, 'la potenza e solo degli over 65');
  /* dai 50 ai 64 anni le tecniche verso il cedimento solo sugli isolamenti (D, E): mai sui multiarticolari liberi */
  assert.strictEqual(conta(r => r.pn === 'mezzaEta' && AL_CEDIMENTO.indexOf(r.t) !== -1 && ['D', 'E'].indexOf(r.es.classe) === -1), 0);
  assert.ok(conta(r => r.pn === 'mezzaEta' && r.vn === 'base' && r.t === 'drop' && r.es.classe === 'D') > 0);
  assert.ok(conta(r => r.pn === 'avanzato' && r.vn === 'base' && r.t === 'backoff' && r.es.classe === 'A') > 0, 'l avanzato adulto il back-off sul bilanciere lo ha');
  /* nello scarico e con prontezza sotto 50: nessuna tecnica verso il cedimento, per nessuno; con la prima settimana del blocco lo stesso per G2 e G2b */
  ['scarico', 'prontezza'].forEach(vn => assert.strictEqual(conta(r => r.vn === vn && G2_G5.indexOf(r.t) !== -1), 0, vn + ': niente G2..G5'));
  assert.strictEqual(conta(r => r.vn === 'primaSettimana' && AL_CEDIMENTO.indexOf(r.t) !== -1), 0, 'prima settimana del blocco: niente tecniche verso il cedimento');
  assert.ok(conta(r => r.vn === 'scarico' && r.t === 'superserie') > 0 && conta(r => r.vn === 'scarico' && r.t === 'tempo') > 0, 'lo scarico tiene le tecniche leggere');
  /* l esercizio che carica la zona del fastidio dichiarato non ha tecniche (tranne la discesa controllata) */
  assert.strictEqual(conta(r => r.vn === 'spalle' && r.t !== 'tempo' && ['Panca Piana Bilanciere', 'Croci su Panca Manubri', 'Dip alle Parallele'].indexOf(r.es.nome) !== -1), 0);
  /* poco tempo (45 minuti o meno): niente cluster, parziali e 8x8; il drop set per i myo-reps e le superserie restano */
  assert.strictEqual(conta(r => r.vn === 'poco' && ['cluster', 'parziali', 'ottoperotto'].indexOf(r.t) !== -1), 0);
  assert.ok(conta(r => r.vn === 'poco' && r.t === 'drop') > 0 && conta(r => r.vn === 'poco' && r.t === 'superserie') > 0);
  /* le parziali in allungamento solo dove il muscolo e allungato (attributo `profilo`) e mai sul bilanciere: polpacci in piedi si, laterali con l elastico e alzate laterali no */
  righe.filter(r => r.t === 'parziali' && r.ok).forEach(r => { const a = attr(r.es.nome); assert.strictEqual(a.profilo, 'allungato', r.es.nome); assert.ok(['C', 'D', 'E'].indexOf(a.classe) !== -1); });
  assert.ok(conta(r => r.pn === 'avanzato' && r.vn === 'base' && r.t === 'parziali' && r.es.nome === 'Calf Raise in Piedi') === 1, 'i polpacci in piedi tengono le parziali');
  assert.strictEqual(conta(r => r.pn === 'avanzato' && r.vn === 'base' && r.t === 'parziali' && r.es.nome === 'Alzate Laterali'), 0, 'alzate laterali: muscolo accorciato, niente parziali in allungamento');
  /* il cedimento non va su stacchi, spinte sopra la testa, abilita 3 */
  ['Stacco da Terra (Deadlift)', 'Stacco Rumeno con Manubri', 'Front Squat', 'Military Press', 'Shoulder Press Machine'].forEach(n => assert.strictEqual(conta(r => r.es.nome === n && AL_CEDIMENTO.indexOf(r.t) !== -1), 0, n));
  /* cifre della matrice per l intermedio adulto sano, base (hand-checked sulla tabella 3.2 della nota) */
  const base = (t, n, pn) => adatta(t, n, PERSONE[pn || 'intermedio'], {});
  assert.deepStrictEqual([base('drop', 'Leg Extension'), base('drop', 'Panca Piana Manubri'), base('drop', 'Goblet Squat'), base('drop', 'Chest Press Machine'), base('drop', 'Leg Press'), base('drop', 'Panca Piana Bilanciere'), base('drop', 'Leg Press', 'avanzato')],
    [true, true, false, true, false, false, true], 'drop set: D/E si, B solo manubri su panca, C non leg press se non avanzato, A no');
  assert.deepStrictEqual([base('myo', 'Curl ai Cavi'), base('myo', 'Chest Press Machine'), base('myo', 'Leg Press'), base('myo', 'Panca Piana Manubri'), base('riposopausa', 'Hack Squat', 'avanzato')],
    [true, true, false, false, false], 'myo-reps e rest-pause: D/E si, C non leg press ne hack, B e A no');
  assert.deepStrictEqual([base('amrap', 'Panca Piana Bilanciere'), base('amrap', 'Squat con Bilanciere'), base('amrap', 'Panca Piana Bilanciere', 'principiante'), base('backoff', 'Squat con Bilanciere'), base('backoff', 'Squat con Bilanciere', 'avanzato')],
    [true, true, false, false, true], 'AMRAP sul bilanciere: intermedio e oltre, non su stacchi; back-off: avanzato');
  assert.deepStrictEqual([base('cluster', 'Squat con Bilanciere'), base('cluster', 'Chest Press Machine'), base('cluster', 'Curl ai Cavi'), base('cluster', 'Panca Piana Bilanciere', 'principiante')], [true, true, false, false], 'cluster: A, B, C si; D ed E non servono; il principiante sano no');
  assert.deepStrictEqual([base('superserie', 'Lat Machine'), base('superserie', 'Panca Piana Bilanciere'), base('superserie', 'Plank'), base('superserie', 'Lat Machine', 'minore')], [true, false, false, true], 'superserie: mai con un fondamentale pesante (ABB-06), mai col core');
  assert.strictEqual(adatta('superserie', 'Lat Machine', PERSONE.intermedio, { coppia: 'Panca Piana Bilanciere' }), false, 'la coppia con un fondamentale pesante non passa nemmeno se e l altro a essere pesante');
  assert.strictEqual(adatta('superserie', 'Lat Machine', PERSONE.over65, { coppia: 'Chest Press Machine' }), true);
  assert.strictEqual(adatta('superserie', 'Lat Machine', PERSONE.over65, { coppia: 'Panca Piana Manubri' }), false, 'oltre i 65 anni la coppia e tra macchine e cavi');
  /* il motivo dice codice e perche */
  const m = motivo('drop', 'Plank', PERSONE.intermedio, {});
  assert.deepStrictEqual([m.ok, m.codice, typeof m.motivo], [false, 'MAV-02', 'string']);
  assert.strictEqual(motivo('drop', 'Leg Extension', PERSONE.principiante, {}).codice, 'MAV-03');
  assert.strictEqual(motivo('drop', 'Leg Extension', PERSONE.minore, {}).codice, 'ETA-02');
  assert.strictEqual(motivo('drop', 'Leg Extension', PERSONE.intermedio, { settimana: sett(4, FASI_4) }).codice, 'MAV-08');
  assert.ok(righe.some(ok));
});

/* ============================================================ 2. il budget e la posizione nel blocco ============================================================ */
test('MAV-08: il budget (principiante, minorenne, over 65, PAR-Q: 0; intermedio 1 e 2; avanzato 2 e 6; specializzazione 8)', () => {
  const b = pn => budget(PERSONE[pn], {});
  assert.deepStrictEqual([b('principiante').perSeduta, b('principiante').perSettimana], [0, 0]);
  assert.deepStrictEqual([b('minore').perSeduta, b('minore').perSettimana], [0, 0]);
  assert.deepStrictEqual([b('over65').perSeduta, b('over65').perSettimana], [0, 0]);
  assert.deepStrictEqual([b('parq').perSeduta, b('parq').perSettimana], [0, 0]);
  assert.deepStrictEqual([b('intermedio').perSeduta, b('intermedio').perSettimana], [1, 2]);
  assert.deepStrictEqual([b('avanzato').perSeduta, b('avanzato').perSettimana], [2, 6]);
  assert.deepStrictEqual([b('mezzaEta').perSeduta, b('mezzaEta').perSettimana], [2, 6], '50-64: stesso budget, ma solo sugli isolamenti (classi D ed E)');
  assert.strictEqual(budget(PERSONE.avanzato, { specializza: true }).perSettimana, 8, 'blocco di specializzazione: 8 a settimana');
  assert.strictEqual(budget(PERSONE.intermedio, { specializza: true }).perSettimana, 2, 'la specializzazione e dell avanzato');
  /* i gruppi: il minorenne e il principiante hanno solo G1 e G1b (e il cluster chi e prudente e non minorenne) */
  assert.deepStrictEqual(b('minore').gruppi, ['G1', 'G1b']);
  assert.deepStrictEqual(b('principiante').gruppi, ['G1', 'G1b']);
  assert.deepStrictEqual(b('over65').gruppi, ['G1', 'G1b', 'G1c']);
  assert.deepStrictEqual(b('parq').gruppi, ['G1', 'G1b', 'G1c']);
  assert.deepStrictEqual(b('avanzato').gruppi, ['G1', 'G1b', 'G1c', 'G1p', 'G2', 'G2b', 'G5']);
  assert.ok(b('avanzato').gruppi.indexOf('G3') === -1, 'forzate e negative: mai dal coach');
  /* poco tempo: niente cluster, parziali e 8x8 */
  assert.deepStrictEqual(budget(PERSONE.avanzato, { minuti: 45 }).gruppi, ['G1', 'G1b', 'G1p', 'G2']);
  /* il momento di vita «senza tecniche» (MOMENTI.tecniche = false) toglie le intense */
  assert.deepStrictEqual([budget(PERSONE.avanzato, { momento: { id: 'stress', tecniche: false } }).perSeduta, budget(PERSONE.avanzato, { momento: { id: 'ansia' } }).perSeduta], [0, 2]);
});

test('MAV-08: la posizione nel blocco (4.2): settimana 1 nessuna, di mezzo solo le parziali, il tetto nelle ultime; nello scarico nessuna', () => {
  const sd = (pn, n, fasi, extra) => budget(PERSONE[pn], Object.assign({ settimana: sett(n, fasi) }, extra || {}));
  /* blocco di 4 settimane (3 di carico e lo scarico) */
  assert.deepStrictEqual([1, 2, 3, 4].map(n => sd('avanzato', n, FASI_4).tier), [0, 1, 2, 0]);
  assert.deepStrictEqual([1, 2, 3, 4].map(n => sd('avanzato', n, FASI_4).perSeduta), [0, 2, 2, 0], 'avanzato: la settimana 2 solo le parziali (G2b), il tetto alla 3, nulla nello scarico');
  assert.deepStrictEqual([1, 2, 3, 4].map(n => sd('intermedio', n, FASI_4).perSeduta), [0, 0, 1, 0], 'intermedio: nel blocco corto le parziali non ci sono, il tetto solo alla settimana 3');
  assert.strictEqual(sd('avanzato', 2, FASI_4).gruppi.indexOf('G2'), -1, 'settimana 2: niente G2');
  assert.ok(sd('avanzato', 2, FASI_4).gruppi.indexOf('G2b') !== -1, 'settimana 2: le parziali si');
  assert.ok(sd('avanzato', 3, FASI_4).gruppi.indexOf('G2') !== -1);
  /* il secondo blocco (settimane 5-8) segue lo stesso schema */
  assert.deepStrictEqual([5, 6, 7, 8].map(n => sd('avanzato', n, FASI_4).tier), [0, 1, 2, 0]);
  /* blocco di 6 settimane (5 di carico e lo scarico): 1-2 solo G1, 3 le parziali (anche l intermedio), 4-5 il tetto */
  assert.deepStrictEqual([1, 2, 3, 4, 5, 6].map(n => sd('avanzato', n, FASI_6).tier), [0, 0, 1, 2, 2, 0]);
  assert.deepStrictEqual([1, 2, 3, 4, 5, 6].map(n => sd('intermedio', n, FASI_6).perSeduta), [0, 0, 1, 1, 1, 0], 'intermedio nel blocco lungo: le parziali alla 3, il tetto alla 4-5');
  assert.ok(sd('intermedio', 3, FASI_6).gruppi.indexOf('G2b') !== -1 && sd('intermedio', 3, FASI_6).gruppi.indexOf('G2') === -1);
  /* il piano di W2-T4 (piano.settimane[n].tecniche = 'G1') puo solo restringere */
  const piano = { versione: 2, settimane: FASI_4.map((f, i) => ({ n: i + 1, fase: f, tecniche: i === 2 ? 'G1' : 'G2' })) };
  assert.strictEqual(sd('avanzato', 3, FASI_4, { piano: piano }).tier, 0, 'il piano dice G1 alla settimana 3: nessuna tecnica intensa');
  assert.strictEqual(sd('avanzato', 2, FASI_4, { piano: piano }).tier, 1, 'il piano dice G2: vale la posizione nel blocco');
  /* senza settimana (la generazione del programma, che si ripete in ogni settimana) vale il tetto del livello */
  assert.strictEqual(budget(PERSONE.avanzato, {}).tier, 2);
  /* prontezza sotto 50: nessuna intensa anche nella settimana del tetto; 50 e oltre si */
  assert.strictEqual(sd('avanzato', 3, FASI_4, { prontezza: 49 }).perSeduta, 0);
  assert.strictEqual(sd('avanzato', 3, FASI_4, { prontezza: 50 }).perSeduta, 2);
});

test('MAV-09: quante serie vale una tecnica nel volume (drop set 2, rest-pause e myo-reps 3) e il tetto per muscolo in una seduta', () => {
  const a = app();
  assert.deepStrictEqual(['drop', 'riposopausa', 'myo', 'amrap', 'tempo'].map(t => a.chiama('serieEquivalentiTecnica', t)), [2, 3, 3, 1, 1]);
  const es = (n, sets) => ({ name: a.chiama('nomeInLibreria', n), sets: sets, reps: 12, weight: 10, rest: 60 });
  /* 9 serie dirette di bicipiti: un drop set (+1) entra, i myo-reps (+2) arrivano a 11 e entrano; 10 serie: il drop (+1) arriva a 11, i myo-reps no */
  const seduta = (serie) => { a.ctx.__s = a.g('JSON.parse(' + JSON.stringify(JSON.stringify([es('Curl ai Cavi', serie)])) + ')'); return a.ctx.__s; };
  const entra = (serie, t) => { const s = seduta(serie); a.ctx.__e = s[0]; return a.g('entraNelTetto(__s, __e, ' + JSON.stringify(t) + ')'); };
  assert.deepStrictEqual([entra(9, 'drop'), entra(9, 'myo'), entra(10, 'drop'), entra(10, 'myo'), entra(11, 'drop'), entra(11, 'amrap')], [true, true, true, false, false, true]);
});

test('MAV-05: tra piu candidati si tengono i piu sicuri (classe D prima di A), non i primi; la distribuzione nella settimana', () => {
  const a = app();
  const cand = [{ n: 'A', rischio: 44 }, { n: 'B', rischio: 2 }, { n: 'C', rischio: 1 }, { n: 'D', rischio: 2 }];
  a.ctx.__c = a.g('JSON.parse(' + JSON.stringify(JSON.stringify(cand)) + ')');
  const r = a.dati(a.g('scegliTecnicheSicure(__c, 2)'));
  assert.deepStrictEqual(r.tenute.map(x => x.n), ['C', 'B'], 'prima il rischio piu basso, a parita il primo della lista');
  assert.deepStrictEqual(r.scartate.map(x => x.n), ['D', 'A']);
  assert.deepStrictEqual(a.dati(a.g('scegliTecnicheSicure(__c, 0)')).tenute, []);
  /* il rischio: la classe D batte la E, la C, la B e la A; a pari classe le parziali battono il drop set e l AMRAP */
  const rr = (t, n) => a.chiama('rischioTecnica', t, n);
  assert.ok(rr('drop', 'Leg Extension') < rr('drop', 'Curl su Panca Inclinata') && rr('drop', 'Curl su Panca Inclinata') < rr('drop', 'Chest Press Machine') && rr('drop', 'Chest Press Machine') < rr('amrap', 'Panca Piana Bilanciere'));
  assert.ok(rr('parziali', 'Calf Raise in Piedi') < rr('drop', 'Calf Raise in Piedi'));
  /* distribuisciTecniche: un candidato per seduta in 4 sedute, 2 a settimana: la prima e l ultima (non due di fila); 3 sedute: la prima e l ultima */
  const uno = k => Array.from({ length: k }, (_, i) => [{ id: i, rischio: 1 }]);
  const dist = (k, perSeduta, perSettimana, cands) => { a.ctx.__d = a.g('JSON.parse(' + JSON.stringify(JSON.stringify(cands || uno(k))) + ')'); return a.dati(a.g('distribuisciTecniche(__d, ' + perSeduta + ', ' + perSettimana + ')')).map(l => l.length); };
  assert.deepStrictEqual(dist(4, 1, 2), [1, 0, 0, 1]);
  assert.deepStrictEqual(dist(3, 1, 2), [1, 0, 1]);
  assert.deepStrictEqual(dist(2, 1, 2), [1, 1]);
  assert.deepStrictEqual(dist(5, 1, 2), [1, 0, 0, 0, 1]);
  assert.deepStrictEqual(dist(4, 1, 6), [1, 1, 1, 1], 'mai piu di perSeduta per seduta');
  /* avanzato: due candidati per seduta, 6 a settimana su 5 sedute: uno in ognuna e il secondo nella prima */
  const due = Array.from({ length: 5 }, (_, i) => [{ id: i + 'a', rischio: 1 }, { id: i + 'b', rischio: 40 }]);
  assert.deepStrictEqual(dist(5, 2, 6, due), [2, 1, 1, 1, 1]);
  assert.deepStrictEqual(dist(5, 2, 8, due), [2, 1, 2, 1, 2], 'otto a settimana: il secondo giro riparte dalla prima, dalla meta e dall ultima');
});

/* ============================================================ 3. i programmi veri ============================================================ */
/* una griglia fissa di profili (stesso seme): livello x persona x minuti x luogo x giorni (x un fastidio) */
function profili() {
  const out = [];
  const persone = [{ n: 'minore', age: 16 }, { n: 'adulto', age: 30 }, { n: 'mezza', age: 55 }, { n: 'over65', age: 70 }, { n: 'parq', age: 30, parq: 'si' }];
  ['principiante', 'intermedio', 'avanzato'].forEach(level => persone.forEach(p => [30, 45, 75].forEach(minutes => ['palestra', 'manubri'].forEach(luogo => [3, 5].forEach(days => [[], ['spalle']].forEach(fastidi => {
    out.push(Object.assign({ goals: ['massa'], level, days, minutes, luogo, fastidi, sex: 'M', usaProfilo: false, seme: 't3-' + out.length }, { age: p.age, parq: p.parq || 'no' }, { _persona: p.n }));
  }))))));
  return out;
}
let _programmi = null;
function programmi() {
  if (_programmi) return _programmi;
  const a = app();
  _programmi = profili().map(p => { const d = Object.assign({}, p); delete d._persona; return { p: p, prog: a.dati(a.chiama('buildProgram', d)) }; });
  return _programmi;
}
const infoEs = (() => { const cache = {}; return n => cache[n] || (cache[n] = attr(n)); })();
const INTENSE = ['drop', 'myo', 'amrap', 'parziali', 'calibrazione', 'negativa', 'forzate', 'riposopausa', 'backoff'];

test('i programmi veri: 360 profili con seme fisso: nessuna tecnica dove non deve esserci (classe F, principiante, minorenne, over 65, PAR-Q, 50-64 sui liberi)', () => {
  const colpe = [];
  let conTecnica = 0, drop = 0, myo = 0, parziali = 0, amrap = 0, backoff = 0, cluster = 0, potenza = 0;
  programmi().forEach(({ p, prog }) => {
    const prudente = p.level === 'principiante' || p.age < 18 || p.age >= 65 || p.parq === 'si';
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      const id = p.seme + ' (' + p.level + ', ' + p.age + ', ' + p.minutes + ' min) ' + pulito(e.name);
      if (!e.tecnica) return;
      conTecnica++;
      const a = infoEs(e.name);
      if (e.tecnica === 'drop') drop++; if (e.tecnica === 'myo') myo++; if (e.tecnica === 'parziali') parziali++; if (e.tecnica === 'amrap') amrap++; if (e.tecnica === 'backoff') backoff++; if (e.tecnica === 'cluster') cluster++; if (e.tecnica === 'potenza') potenza++;
      if (a && a.classe === 'F') colpe.push(id + ' ' + e.tecnica + ' su classe F');
      if (p.age < 18) colpe.push(id + ' ' + e.tecnica + ' a un minorenne');
      if (INTENSE.indexOf(e.tecnica) !== -1 && prudente) colpe.push(id + ' ' + e.tecnica + ' (tecnica al cedimento a chi e prudente)');
      if (['piramide', 'ottoperotto'].indexOf(e.tecnica) !== -1 && prudente) colpe.push(id + ' ' + e.tecnica);
      if (p.age >= 50 && p.age < 65 && INTENSE.indexOf(e.tecnica) !== -1 && a && ['D', 'E'].indexOf(a.classe) === -1) colpe.push(id + ' ' + e.tecnica + ' sui liberi a ' + p.age + ' anni');
      if (e.tecnica === 'parziali' && (!a || a.profilo !== 'allungato')) colpe.push(id + ' parziali su un muscolo non allungato');
      if (e.tecnica === 'potenza' && (p.age < 65 || !a || a.classe !== 'C')) colpe.push(id + ' potenza fuori posto');
      if (e.tecnica === 'cluster' && (p.minutes <= 45 || p.age < 18)) colpe.push(id + ' cluster con poco tempo o a un minorenne');
      if (e.tecnica === 'cluster' && p.age >= 65 && (!a || a.classe !== 'C')) colpe.push(id + ' cluster oltre i 65 anni fuori da una macchina guidata');
      if (p.fastidi.indexOf('spalle') !== -1 && app().chiama('stressArticolare', e.name, 'spalle') >= 1) colpe.push(id + ' ' + e.tecnica + ' sull esercizio che carica la spalla dolente');
      if (/Stacco|Front Squat|Military/.test(e.name) && INTENSE.indexOf(e.tecnica) !== -1) colpe.push(id + ' ' + e.tecnica + ' su ' + e.name);
    }));
  });
  assert.deepStrictEqual(colpe, []);
  assert.strictEqual(programmi().length, 360);
  /* P4-S (ETA-08 parte a, D-P21 n. 5): con sicurezza/popolazioni.js i programmi nuovi degli over 65 non hanno la potenza (la base); senza, compare come prima */
  const p4s = app().g("typeof potenzaAmmessaOver65 === 'function'");
  assert.ok(conTecnica > 100 && drop > 10 && myo > 5 && parziali > 20 && amrap > 0 && backoff > 0 && cluster > 5 && (p4s ? potenza === 0 : potenza > 5), 'il campione contiene tutte le tecniche: ' + JSON.stringify({ conTecnica, drop, myo, parziali, amrap, backoff, cluster, potenza }));
});

test('i programmi veri: il budget non e mai superato (intermedio 1 per seduta e 2 a settimana, avanzato 2 e 6, gli altri 0) e una tecnica sullo stesso esercizio una volta a settimana', () => {
  const colpe = [];
  let pieni = 0;
  programmi().forEach(({ p, prog }) => {
    const budgetP = p.age < 18 || p.age >= 65 || p.parq === 'si' || p.level === 'principiante' ? { s: 0, w: 0 } : (p.level === 'avanzato' ? { s: 2, w: 6 } : { s: 1, w: 2 });
    let settimana = 0;
    const viste = {};
    prog.sedute.forEach(sd => {
      const n = sd.esercizi.filter(e => INTENSE.indexOf(e.tecnica) !== -1).length;
      settimana += n;
      if (n > budgetP.s) colpe.push(p.seme + ' ' + sd.giorno + ': ' + n + ' tecniche intense (budget ' + budgetP.s + ')');
      sd.esercizi.forEach(e => { if (e.tecnica) { const k = e.name + '|' + e.tecnica; if (viste[k] && INTENSE.indexOf(e.tecnica) !== -1) colpe.push(p.seme + ' ' + k + ' due volte'); viste[k] = 1; } });
    });
    if (settimana > budgetP.w) colpe.push(p.seme + ': ' + settimana + ' tecniche intense a settimana (budget ' + budgetP.w + ')');
    if (settimana === budgetP.w && budgetP.w > 0) pieni++;
    /* la superserie: mai con un fondamentale pesante, mai tra core; oltre i 65 anni solo tra macchine e cavi */
    prog.sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
      if (!e.superset) return;
      [e, sd.esercizi[i - 1]].forEach(x => { const a = infoEs(x.name); if (a && a.classe === 'A') colpe.push(p.seme + ' superserie con ' + pulito(x.name) + ' (classe A)'); if (p.age >= 65 && a && ['macchina', 'cavo'].indexOf(a.attrezzo) === -1) colpe.push(p.seme + ' superserie oltre i 65 anni con ' + pulito(x.name)); });
    }));
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(pieni > 10, 'il budget della settimana si usa davvero (' + pieni + ' programmi lo riempiono)');
});

test('MAV-11, MAV-16: la nota della discesa piano a chi inizia, ai minorenni e agli over 65; il drop set e i myo-reps dicono che risparmiano tempo e non fanno crescere di piu', () => {
  const a = app();
  const note = d => a.dati(a.chiama('buildProgram', Object.assign({ goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'n1' }, d))).note;
  const piano = n => n.some(x => /^Scendi piano: 2-3 secondi in discesa/.test(x));
  assert.deepStrictEqual([note({ level: 'principiante' }), note({ age: 16 }), note({ age: 70 }), note({}), note({ level: 'avanzato' })].map(piano), [true, true, true, false, false]);
  const poco = note({ minutes: 45 });
  assert.ok(poco.some(x => /drop set/.test(x) && /non fanno crescere di più/.test(x)), 'poco tempo: il drop set e onesto');
  assert.ok(!note({ minutes: 45, level: 'principiante' }).some(x => /non fanno crescere di più/.test(x)), 'chi non ha il drop set non legge la frase');
  /* i myo-reps e il drop set si alternano: in una settimana di 45 minuti, 4 giorni, c e l uno e l altro */
  const prog = a.dati(a.chiama('buildProgram', { goals: ['massa'], level: 'intermedio', days: 4, minutes: 45, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'n1' }));
  const tec = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.map(e => e.tecnica).filter(Boolean)));
  assert.deepStrictEqual(tec.sort(), ['drop', 'myo'], 'due tecniche in una settimana (intermedio), il drop set e i myo-reps');
});

/* ============================================================ 4. RIC-04 in seduta, i metodi, i testi, il RIR per settimana ============================================================ */
function giornoCon(a, lista) {
  const dati = {};
  dati['Lunedì'] = lista.map(([nome, tecnica]) => ({ name: a.chiama('nomeInLibreria', nome), sets: 3, reps: 10, weight: 20, rest: 60, tecnica: tecnica, completedSets: [{ done: false, reps: 10, weight: 20 }] }));
  a.scrivi(a.chiave('dataKey'), dati);
}
const giorno = a => a.pianoSalvato()['Lunedì'].map(e => e.tecnicaSeduta || '');
function conPiano(a, fasi, numero) {
  a.programma({ inizio: a.ymd(a.giorniFa(7 * (numero - 1))), settimane: fasi.length, fasi: fasi });
}
const SEDUTA_PROVA = [['Curl ai Cavi', 'drop'], ['Panca Piana Bilanciere', 'amrap'], ['Calf Raise in Piedi', 'parziali'], ['Squat con Bilanciere', 'backoff'], ['Leg Extension', 'myo']];

test('RIC-04 (MAV-01, MAV-05, MAV-08): in seduta le tecniche passano dal cancello e dal budget, la piu sicura e non la prima', () => {
  const a = nuovaApp();
  /* principiante e minorenne: nessuna, anche se il programma salvato le porta (prima RIC-04 teneva la prima della lista) */
  [{ level: 'principiante' }, { age: 16 }, { age: 70 }, { parq: true }].forEach(p => {
    a.profilo(p); giornoCon(a, SEDUTA_PROVA);
    assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 5, JSON.stringify(p));
    assert.deepStrictEqual(giorno(a), ['-', '-', '-', '-', '-'], JSON.stringify(p));
  });
  /* intermedio, senza programma (settimana del tetto): 1 per seduta, la piu sicura: le parziali sul polpaccio; il back-off e dell avanzato */
  a.profilo({ level: 'intermedio' }); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 4);
  assert.deepStrictEqual(giorno(a), ['-', '-', '', '-', '-']);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 0, 'seconda chiamata: niente da togliere');
  /* avanzato: due, le due piu sicure (parziali sul polpaccio e drop set sul curl; il myo sulla leg extension e piu sicuro dell AMRAP ma e il terzo) */
  a.profilo({ level: 'avanzato' }); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 3);
  assert.deepStrictEqual(giorno(a), ['', '-', '', '-', '-'], 'avanzato: parziali e drop set, il resto tolto');
  /* 50-64 anni: solo sugli isolamenti: l AMRAP sul bilanciere e il back-off non passano */
  a.profilo({ level: 'avanzato', age: 55 }); giornoCon(a, [['Panca Piana Bilanciere', 'amrap'], ['Squat con Bilanciere', 'backoff'], ['Calf Raise in Piedi', 'parziali']]);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 2);
  assert.deepStrictEqual(giorno(a), ['-', '-', '']);
  /* nello scarico, con prontezza sotto 50: nessuna tecnica al cedimento (anche il back-off) */
  a.profilo({ level: 'avanzato' }); conPiano(a, FASI_4, 4); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 5, 'scarico');
  conPiano(a, FASI_4, 3); a.scrivi(a.chiave('PRONTEZZA_KEY'), { data: a.ymd(), day: 'Lunedì', punteggio: 40 }); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 5, 'prontezza 40');
  a.scrivi(a.chiave('PRONTEZZA_KEY'), { data: a.ymd(), day: 'Lunedì', punteggio: 80 }); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 3, 'prontezza 80, settimana 3 del blocco: il tetto dell avanzato (2)');
  /* la posizione nel blocco (MAV-08): settimana 1 nessuna, settimana 2 solo le parziali (avanzato), settimana 3 il tetto */
  a.profilo({ level: 'avanzato' });
  delete a.store[a.chiave('PRONTEZZA_KEY')];
  conPiano(a, FASI_4, 1); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 5, 'settimana 1: nessuna tecnica intensa');
  conPiano(a, FASI_4, 2); giornoCon(a, SEDUTA_PROVA);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 4, 'settimana 2: solo le parziali');
  assert.deepStrictEqual(giorno(a), ['-', '-', '', '-', '-']);
  /* MAV-04: la calibrazione solo a chi puo (intermedio e oltre, sotto i 65 anni, non PAR-Q), mai sul core, mai a prontezza bassa */
  a.profilo({ level: 'intermedio' }); conPiano(a, FASI_4, 3);
  giornoCon(a, [['Curl ai Cavi', 'calibrazione']]); assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 0, 'intermedio sano: la calibrazione resta');
  giornoCon(a, [['Dead Bug', 'calibrazione']]); assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 1, 'sul core no');
  a.profilo({ level: 'principiante' }); giornoCon(a, [['Curl ai Cavi', 'calibrazione']]); assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 1, 'al principiante no');
  /* la regola spenta o il coach senza consenso: non agisce */
  a.profilo({ level: 'principiante' }); giornoCon(a, SEDUTA_PROVA); a.spegni(['RIC-04']);
  assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 0); a.riaccendi();
  a.consenso(false); assert.strictEqual(a.chiama('limitaTecnicheIntense', 'Lunedì'), 0); a.consenso(true);
  assert.deepStrictEqual(a.errori, []);
});

test('i metodi famosi passano dallo stesso cancello e dallo stesso budget: AMRAP al massimo 1 per seduta e 2 a settimana per l intermedio, niente a chi non puo', () => {
  const a = app();
  const costruisci = d => a.dati(a.chiama('buildProgram', Object.assign({ goals: ['forza'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, usaProfilo: false, seme: 'm1' }, d)));
  const tecn = prog => prog.sedute.map(sd => sd.esercizi.filter(e => e.tecnica).map(e => e.tecnica));
  ['gzclp', 'redditppl', 'greyskull'].forEach(m => {
    const giorni = m === 'gzclp' ? 4 : (m === 'redditppl' ? 6 : 3);
    const sano = costruisci({ metodo: m, days: giorni, seme: 'm1-' + m });
    const t = tecn(sano), tot = t.reduce((s, x) => s + x.length, 0);
    assert.ok(t.every(x => x.length <= 1), m + ': al massimo una tecnica per seduta (intermedio)');
    assert.ok(tot <= 2, m + ': al massimo 2 a settimana (intermedio): ' + tot);
    assert.ok(tot >= 1, m + ': ma l AMRAP c e ancora');
    assert.ok(sano.note.some(n => /Ho tolto qualche tecnica/.test(n)), m + ': la nota dice che qualche tecnica e stata tolta');
    const avanzato = costruisci({ metodo: m, days: giorni, level: 'avanzato', seme: 'm2-' + m });
    assert.ok(tecn(avanzato).every(x => x.length <= 2) && tecn(avanzato).reduce((s, x) => s + x.length, 0) <= 6);
    [{ level: 'principiante' }, { age: 16 }, { age: 70 }, { parq: 'si' }].forEach(p => assert.deepStrictEqual(tecn(costruisci(Object.assign({ metodo: m, days: giorni, seme: 'm3-' + m }, p))).filter(x => x.indexOf('amrap') !== -1), [], m + ' ' + JSON.stringify(p)));
  });
  /* i tocchi (il secondo metodo da cui il coach prende un dettaglio) e le tecniche dei metodi dell epoca d oro: piramide e 8x8 non a chi e prudente, mai sul core */
  ['arnold6', 'gironda', 'hatfield', 'hit'].forEach(m => [{ level: 'principiante' }, { age: 16 }, { age: 70 }, { parq: 'si' }].forEach(p => {
    const prog = costruisci(Object.assign({ metodo: m, days: m === 'arnold6' ? 6 : 3, level: 'avanzato', goals: ['massa'], seme: 'm4-' + m }, p));
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => { if (e.tecnica) assert.ok(['potenza', 'cluster'].indexOf(e.tecnica) !== -1 && p.age !== 16, m + ' ' + JSON.stringify(p) + ' ' + e.name + ' ' + e.tecnica); }));
  }));
  /* la coppia con un fondamentale pesante si scioglie (ABB-06, MAV-01) */
  a.ctx.__b = a.g('(function () { const chi = chiDa({ age: 30, level: "intermedio" }); return { chi: chi, sicurezza: { fastidi: [], vincoli: null }, agenda: { minuti: 45 }, lavoro: {}, metodo: { attivo: null } }; })()');
  a.ctx.__sd = a.g('JSON.parse(' + JSON.stringify(JSON.stringify({ esercizi: [
    { name: a.chiama('nomeInLibreria', 'Panca Presa Stretta'), sets: 3, reps: 10, weight: 30, rest: 90 }, { name: a.chiama('nomeInLibreria', 'Rematore con Manubrio'), sets: 3, reps: 10, weight: 16, rest: 90, superset: true },
    { name: a.chiama('nomeInLibreria', 'Curl ai Cavi'), sets: 3, reps: 12, weight: 15, rest: 60 }, { name: a.chiama('nomeInLibreria', 'Pushdown Tricipiti ai Cavi'), sets: 3, reps: 12, weight: 20, rest: 60, superset: true }] })) + ')');
  assert.strictEqual(a.g('filtraCoppie(__b, __sd, {})'), 1, 'Panca Presa Stretta e un fondamentale (classe A): la coppia con lui si scioglie, quella tra i cavi resta');
  assert.deepStrictEqual(a.dati(a.ctx.__sd).esercizi.map(e => !!e.superset), [false, false, false, true]);
});

test('MAV-06, MAV-07, MAV-13, MAV-16: i testi sono onesti (risparmia tempo, non fa crescere di piu; l AMRAP si ferma a 1 ripetizione dal cedimento; le parziali sono facoltative); BFR non c e', () => {
  const a = app(), T = a.json('TECNICHE');
  ['drop', 'myo', 'cluster'].forEach(k => assert.ok(/Non fa crescere di più/.test(T[k]), k + ': ' + T[k]));
  assert.ok(/risparmiare tempo/.test(T.drop) && /risparmiare tempo/.test(T.myo));
  assert.ok(/1 ripetizione dal cedimento/.test(T.amrap) && !/più ripetizioni possibili|piu ripetizioni possibili/.test(T.amrap), 'AMRAP: ' + T.amrap);
  assert.ok(/3-6 ripetizioni/.test(T.parziali) && /Facoltativo/.test(T.parziali) && /allungato/.test(T.parziali), T.parziali);
  assert.ok(/12-20/.test(T.myo) && /3-5 mini-serie/.test(T.myo));
  assert.deepStrictEqual(Object.keys(T).filter(k => !a.json('GRUPPO_TECNICA')[k]).sort(), [], 'ogni tecnica con un testo e nel cancello');
  assert.deepStrictEqual(Object.keys(a.json('GRUPPO_TECNICA')).filter(k => !T[k]).sort(), ['superserie', 'tempo'], 'e viceversa, tranne la coppia e la discesa (che non sono un badge: la coppia e la sigla SS, la discesa una nota)');
  /* MAV-14 (BFR) e bloccata dalla verifica (registro C.2 n. 14): nessuna tecnica, nessun testo, nemmeno un flag spento */
  const sorgenti = [].concat(FILE_NUOVI, ['js/coach/volume/tecniche.js', 'js/coach/regole-nuove.js', 'js/coach/regole-ricerca.js']).map(f => fs.readFileSync(path.join(R, f), 'utf8')).join('\n');
  assert.ok(!/\bbfr\b|blood flow|restrizione del flusso|occlusione/i.test(sorgenti), 'MAV-14 non si implementa');
  assert.strictEqual(a.json('GRUPPO_TECNICA.bfr'), undefined);
  /* le soglie: forza e fonte scritte (tests/soglie.test.js le controlla tutte), i numeri del piano */
  const S = a.json('SOGLIE_TECNICHE');
  assert.deepStrictEqual([S.budgetSedutaIntermedio.v, S.budgetSettimanaIntermedio.v, S.budgetSedutaAvanzato.v, S.budgetSettimanaAvanzato.v, S.budgetSettimanaSpecializzazione.v], [1, 2, 2, 6, 8]);
  assert.deepStrictEqual(S.serieEquivalenti.v, { drop: 2, riposopausa: 3, myo: 3 });
  Object.keys(S).forEach(k => { assert.strictEqual(S[k].forza === 'Convenzione' || S[k].forza === 'Moderata', true, k); assert.ok(S[k].fonte.length > 10, k); });
});

test('MES-02 (aggancio): rirBersaglioBase legge rirPianoSettimana se c e, e senza da i valori di oggi; la prudenza, il pavimento dei minorenni e quello dei pesanti vincono', () => {
  const a = nuovaApp();
  const rir = (nome, sett) => a.json('rirBersaglioBase(' + JSON.stringify(a.chiama('nomeInLibreria', nome)) + ', ' + sett + ')');
  const campioni = [['Squat con Bilanciere', 1], ['Chest Press Machine', 3], ['Curl ai Cavi', 5], ['Panca Piana Bilanciere', 8]];
  const perfil = [{ level: 'principiante' }, { level: 'intermedio' }, { level: 'avanzato' }, { level: 'intermedio', age: 70 }, { level: 'intermedio', age: 16 }, { level: 'intermedio', parq: true }];
  a.programma({ inizio: '2026-10-05', settimane: 8, fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'], blocco: 4, rirSett: [3, 2, 2, 4, 3, 2, 1, 4] });
  const senza = perfil.map(p => { a.profilo(p); return campioni.map(([n, s]) => rir(n, s)); });
  /* con rirPianoSettimana assente i valori sono quelli di prima (le fasi e il pavimento: rirBersaglioPerLivello) */
  perfil.forEach((p, i) => { a.profilo(p); campioni.forEach(([n, s], k) => assert.deepStrictEqual(a.json('pavimentoRirMinorenni(rirBersaglioPerLivello(' + JSON.stringify(a.chiama('nomeInLibreria', n)) + ', ' + s + '))'), senza[i][k])); });
  /* con la tabella di W2-T4: vale il suo intervallo, entro 4, e con la prudenza no */
  a.g('window.rirPianoSettimana = function (nome, sett) { return [sett === 1 ? 0 : 1, sett === 1 ? 1 : 2]; }');
  a.profilo({ level: 'intermedio' });
  assert.deepStrictEqual(rir('Curl ai Cavi', 1), [0, 1], 'la tabella decide l isolamento');
  assert.deepStrictEqual(rir('Squat con Bilanciere', 1), [1, 2], 'ma un fondamentale col bilanciere non scende sotto 1 ripetizione in riserva (RIR-02)');
  assert.deepStrictEqual(rir('Curl ai Cavi', 3), [1, 2]);
  a.profilo({ level: 'intermedio', age: 70 }); assert.deepStrictEqual(rir('Curl ai Cavi', 3), [3, 4], 'over 65: 3-4 come sempre');
  a.profilo({ level: 'intermedio', parq: true }); assert.deepStrictEqual(rir('Curl ai Cavi', 3), [3, 4], 'modalita prudente: 3-4');
  a.profilo({ level: 'intermedio', age: 16 }); assert.deepStrictEqual(rir('Curl ai Cavi', 1), [2, 3], 'minorenni: mai sotto 2 ripetizioni in riserva');
  a.g('window.rirPianoSettimana = function () { return { min: 2, max: 9 }; }'); a.profilo({ level: 'intermedio' });
  assert.deepStrictEqual(rir('Curl ai Cavi', 3), [2, 4], 'il RIR non supera mai 4');
  a.g('window.rirPianoSettimana = function () { return null; }'); a.profilo({ level: 'intermedio' });
  assert.deepStrictEqual(rir('Curl ai Cavi', 3), a.json('rirBersaglioPerLivello(' + JSON.stringify(a.chiama('nomeInLibreria', 'Curl ai Cavi')) + ', 3)'), 'la tabella che non risponde: i valori di prima');
  /* INT-2b: dopo la fusione con W2-T4 rirPianoSettimana e una dichiarazione di funzione (non si cancella da window): «assente» si simula con undefined, che e quello che
     controlla rirDalPiano (typeof !== 'function'). L aspettativa e la stessa di W2-T3: senza la tabella valgono i valori di prima. */
  a.g('window.rirPianoSettimana = undefined'); a.profilo({ level: 'intermedio' });
  assert.strictEqual(a.g('typeof rirPianoSettimana'), 'undefined');
  assert.deepStrictEqual(rir('Curl ai Cavi', 3), a.json('rirBersaglioPerLivello(' + JSON.stringify(a.chiama('nomeInLibreria', 'Curl ai Cavi')) + ', 3)'), 'senza la funzione: i valori di prima');
  assert.deepStrictEqual(a.errori, []);
});

test('MAV-11: dopo una pausa (rientro) la discesa piano entra nel motivo del carico, accanto al calo delle serie', () => {
  const a = nuovaApp();
  a.profilo({ level: 'intermedio' });
  const nome = a.chiama('nomeInLibreria', 'Panca Piana Bilanciere');
  const sess = giorniFa => a.seduta(giorniFa, [{ nome: nome, serie: [[60, 8, true, 8], [60, 8, true, 8], [60, 8, true, 8], [60, 8, true, 8]] }]);
  a.storia([sess(20)]);
  const r = a.dati(a.chiama('caricoProssimo', nome, 60, 8, 4));
  assert.strictEqual(r.sets, 3);
  assert.ok(/rientro dopo 20 giorni/.test(r.motivo) && /Scendi piano: 2-3 secondi in discesa/.test(r.motivo), r.motivo);
  a.storia([sess(5)]);
  assert.ok(!/Scendi piano/.test(a.dati(a.chiama('caricoProssimo', nome, 60, 8, 4)).motivo), 'senza pausa niente');
});
