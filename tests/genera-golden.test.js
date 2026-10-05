/* Golden di buildProgram (piano coach v2, onda 1, W1-T4: «generatore a stadi e brief»).
   Registrato PRIMA di ristrutturare il generatore (commit del codice di partenza dell onda 1) e da non toccare piu: la ristrutturazione in stadi
   (brief, vincoli, mesociclo, composizione, completamenti, serie e ripetizioni, volume, tempo, tecniche, partenze) sposta il codice senza cambiarne
   gli esiti, quindi il programma di ognuno dei 300 profili deve restare IDENTICO BYTE PER BYTE (JSON.stringify: anche l ordine dei campi e delle note).
   Quattro parti: (1) 300 profili con seme fisso, coach acceso (e il caso dell app vera: carichi di partenza dai dati del corpo e dallo storico) e il programma
   intero nel file; (2) gli stessi 300 con il coach spento (consenso negato: niente carichi stimati), solo l impronta sha256; (3) 24 profili con un profilo
   salvato sul telefono (buildProgram(onbData): graditi, priorita, psico, prove, BIA, momento, esigenza, storico), programma intero; (4) ogni metodo famoso
   forzato (METODI x 3 persone), programma intero: i rami dei metodi che i profili a caso toccano poco.
   Il golden si rigenera SOLO per un cambiamento di comportamento dichiarato (INT-1: l onda 1 aggiunge esercizi alla libreria):
     GENERA_GOLDEN=scrivi node tests/genera-golden.test.js     (poi si dichiara il motivo nel commit) */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { caricaApp, ORA, profiliGolden, profiliMetodi, profiliConProfilo, preparaConProfilo, costruisciConProfilo } = require('./aiuto-genera');

const FILE = path.join(__dirname, 'dati', 'genera-golden.json');
const N = 300, N_CON_PROFILO = 24;
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const stringa = x => JSON.stringify(x);

/* una riga di errore o il programma, sempre come stringa JSON: cosi un programma che lancia un errore e un esito come un altro */
function esito(f) { try { return stringa(f()); } catch (e) { return stringa({ errore: e.message }); } }

function costruisciGolden() {
  const app = caricaApp({ ora: ORA });
  const profili = profiliGolden(app, N);
  const programmi = profili.map(p => esito(() => app.dati(app.chiama('buildProgram', p))));
  const spento = caricaApp({ ora: ORA, consenso: false });
  const impronte = profili.map(p => sha(esito(() => spento.dati(spento.chiama('buildProgram', p)))));
  const conProfilo = [];
  const lista = profiliConProfilo(app, N_CON_PROFILO);
  lista.forEach(c => {
    const a = caricaApp({ ora: ORA });
    preparaConProfilo(a, c);
    conProfilo.push({ c, programma: esito(() => costruisciConProfilo(a, c.d)) });
  });
  const metodi = profiliMetodi(app);
  const programmiMetodi = metodi.map(p => esito(() => app.dati(app.chiama('buildProgram', p))));
  return { profili, programmi, impronte, conProfilo, metodi, programmiMetodi, errori: app.errori.concat(spento.errori) };
}

if (process.env.GENERA_GOLDEN === 'scrivi') {
  const g = costruisciGolden();
  const out = { descrizione: 'Golden di buildProgram registrato prima del generatore a stadi (W1-T4). Vedi tests/genera-golden.test.js.', ora: ORA,
    profili: g.profili, programmi: g.programmi.map(s => JSON.parse(s)), impronteSenzaConsenso: g.impronte,
    conProfilo: g.conProfilo.map(x => ({ salvato: x.c.salvato, d: x.c.d, storico: x.c.storico, biaStorico: x.c.biaStorico, programma: JSON.parse(x.programma) })),
    metodi: g.metodi, programmiMetodi: g.programmiMetodi.map(s => JSON.parse(s)) };
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(out) + '\n');
  console.log('golden scritto: ' + FILE + ' (' + fs.statSync(FILE).size + ' byte, ' + out.programmi.length + ' programmi, ' + out.conProfilo.length + ' con profilo, ' + out.programmiMetodi.length + ' dei metodi)');
  process.exit(0);
}

const GOLDEN = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let _g = null;
const ora = () => _g || (_g = costruisciGolden());

/* il primo punto in cui due JSON differiscono, per un messaggio che dica dove guardare */
function primaDifferenza(a, b, p) {
  p = p || '$';
  if (a === b) return null;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') return p + ': atteso ' + stringa(a).slice(0, 120) + ', trovato ' + stringa(b).slice(0, 120);
  if (Array.isArray(a) !== Array.isArray(b)) return p + ': array contro oggetto';
  const ka = Object.keys(a), kb = Object.keys(b);
  if (stringa(ka) !== stringa(kb)) return p + ': campi diversi, attesi [' + ka.join(',') + '], trovati [' + kb.join(',') + ']';
  for (const k of ka) { const d = primaDifferenza(a[k], b[k], p + (Array.isArray(a) ? '[' + k + ']' : '.' + k)); if (d) return d; }
  return null;
}

test('golden: i profili sono quelli registrati (stesso seme, stessi campi)', () => {
  assert.strictEqual(GOLDEN.programmi.length, N);
  assert.strictEqual(stringa(ora().profili), stringa(GOLDEN.profili), 'il generatore dei profili e cambiato: il golden non e piu confrontabile');
});

test('golden: per ognuno dei 300 profili il programma (coach acceso) e identico byte per byte a prima della ristrutturazione', () => {
  const g = ora();
  const diversi = [];
  g.programmi.forEach((s, i) => {
    const atteso = stringa(GOLDEN.programmi[i]);
    if (s !== atteso) diversi.push('profilo ' + i + ' (' + stringa(g.profili[i]).slice(0, 160) + '): ' + primaDifferenza(GOLDEN.programmi[i], JSON.parse(s)));
  });
  assert.deepStrictEqual(diversi.slice(0, 5), [], diversi.length + ' programmi su ' + N + ' sono cambiati');
  assert.deepStrictEqual(g.errori, [], 'console.error dell app');
});

test('golden: stessi 300 profili con il coach spento (senza consenso: niente carichi stimati), impronta identica', () => {
  const g = ora();
  const diversi = [];
  g.impronte.forEach((h, i) => { if (h !== GOLDEN.impronteSenzaConsenso[i]) diversi.push(i); });
  assert.deepStrictEqual(diversi.slice(0, 10), [], diversi.length + ' programmi senza consenso sono cambiati');
});

test('golden: 24 profili con un profilo salvato sul telefono (buildProgram(onbData)): programma identico', () => {
  const g = ora();
  const diversi = [];
  g.conProfilo.forEach((x, i) => {
    const atteso = stringa(GOLDEN.conProfilo[i].programma);
    if (x.programma !== atteso) diversi.push('con profilo ' + i + ': ' + primaDifferenza(GOLDEN.conProfilo[i].programma, JSON.parse(x.programma)));
  });
  assert.deepStrictEqual(diversi.slice(0, 5), [], diversi.length + ' programmi con profilo sono cambiati');
});

test('golden: ogni metodo famoso forzato (METODI x 3 persone): programma identico', () => {
  const g = ora();
  assert.strictEqual(stringa(g.metodi), stringa(GOLDEN.metodi), 'l elenco dei metodi e cambiato: il golden non e piu confrontabile');
  const diversi = [];
  g.programmiMetodi.forEach((s, i) => { if (s !== stringa(GOLDEN.programmiMetodi[i])) diversi.push('metodo ' + g.metodi[i].metodo + ' persona ' + (i % 3) + ': ' + primaDifferenza(GOLDEN.programmiMetodi[i], JSON.parse(s))); });
  assert.deepStrictEqual(diversi.slice(0, 5), [], diversi.length + ' programmi dei metodi sono cambiati');
});

test('golden: i programmi coprono i casi che contano (non e un golden di programmi tutti uguali)', () => {
  const progs = GOLDEN.programmi.filter(p => p.sedute);
  assert.ok(progs.length >= 290, 'quasi tutti i profili producono un programma');
  const conta = f => progs.filter(f).length;
  assert.ok(conta(p => p.metodo) >= 10, 'metodi famosi');
  assert.ok(conta(p => p.rirSett) >= 20, 'RIR per settimana (avanzati e minorenni)');
  assert.ok(conta(p => p.sedute.some(s => s.esercizi.some(e => e.tecnica))) >= 30, 'tecniche');
  assert.ok(conta(p => p.sedute.some(s => s.esercizi.some(e => e.superset))) >= 10, 'superserie');
  assert.ok(conta(p => p.sedute.some(s => s.esercizi.some(e => e.stimato))) >= 100, 'carichi di partenza stimati');
  assert.ok(conta(p => p.note.length >= 5) >= 100, 'note');
  assert.ok(conta(p => p.sedute.some(s => s.esercizi.some(e => e.originale))) >= 4, 'scelte dell utente');
});
