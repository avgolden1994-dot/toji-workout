#!/usr/bin/env node
/* Elenco delle soglie del coach (piano coach v2 B.4, W1-T1): legge tutti i file js/**\/soglie-*.js (una costante
   `const SOGLIE_<ARGOMENTO> = { nome: { v, forza, fonte, regole } }` per file) e scrive docs/soglie-coach.md, la tabella di
   ogni numero con la sua forza e la sua fonte.
   node tools/elenco-soglie.js            scrive docs/soglie-coach.md (non scrive nulla se una voce non va)
   node tools/elenco-soglie.js --check    controlla le voci e che il documento sia aggiornato (esce 1 se no)
   Dall'integrazione INT-1: `npm run soglie` e `npm run soglie -- --check` dentro `npm run controlla`.
   Controlli su ogni voce: `v` presente, `forza` tra quelle ammesse, `fonte` scritta, `regole` (se c'e) elenco di codici XXX-NN.
   Il modulo esporta le funzioni (tests/soglie.test.js). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');
const FILE_DOC = 'docs/soglie-coach.md';
/* piano B.4; le etichette di Convenzione, Decisione e Provvisoria per l'utente sono in js/coach/regia/perche.js (registro C.4) */
const FORZE_AMMESSE = ['Solida', 'Moderata', 'Contrastata', 'Convenzione', 'Decisione', 'Provvisoria'];
/* cartella → sotto-coach (piano B.1 e B.4) */
const SOTTO_COACH_CARTELLA = { regia: 'regista', programma: 'architetto', volume: 'dosatore', carichi: 'bilancia', sicurezza: 'sentinella', tecnica: 'tecnico', corpo: 'preparatore', bia: 'preparatore', mente: 'motivatore', specialita: 'specialista' };
const RX_CODICE = /^[A-Z]{2,3}-\d{2}$/;

/* i file soglie-*.js sotto js/, in ordine alfabetico, come percorsi relativi con «/» */
function trovaFileSoglie(radice) {
  const base = path.join(radice || R, 'js');
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base, { recursive: true }).map(f => String(f).split(path.sep).join('/'))
    .filter(f => /(^|\/)soglie-[a-z0-9-]+\.js$/.test(f)).sort().map(f => 'js/' + f);
}

/* esegue il file in un contesto isolato e ne prende le costanti SOGLIE_*: { file, tabelle: [{ nome, voci }], errori } */
function caricaSoglie(file, testo) {
  const errori = [], tabelle = [];
  const nomi = []; String(testo).replace(/^\s*const\s+(SOGLIE_[A-Z0-9_]+)\s*=/gm, (x, n) => { nomi.push(n); return x; });
  if (!nomi.length) errori.push(file + ': nessuna costante `const SOGLIE_<ARGOMENTO> = {...}`');
  const ctx = vm.createContext({ window: {}, console });
  try { vm.runInContext(String(testo), ctx, { filename: file, timeout: 2000 }); }
  catch (e) { errori.push(file + ': non si esegue da solo (' + e.message + '): una tabella di soglie contiene solo dati'); return { file, tabelle, errori }; }
  nomi.forEach(n => {
    const voci = vm.runInContext('typeof ' + n + ' === "undefined" ? undefined : ' + n, ctx);
    if (!voci || typeof voci !== 'object' || Array.isArray(voci)) { errori.push(file + ': ' + n + ' deve essere un oggetto { nome: { v, forza, fonte } }'); return; }
    tabelle.push({ nome: n, voci });
  });
  return { file, tabelle, errori };
}

/* errori di una tabella (vuoto se va bene) */
function validaVoci(nomeTabella, voci) {
  const errori = [];
  const chiavi = Object.keys(voci || {});
  if (!chiavi.length) errori.push(nomeTabella + ': nessuna voce');
  chiavi.forEach(k => {
    const s = voci[k], id = nomeTabella + '.' + k;
    if (!s || typeof s !== 'object' || Array.isArray(s)) return errori.push(id + ': ogni voce e un oggetto { v, forza, fonte }');
    if (!Object.prototype.hasOwnProperty.call(s, 'v') || s.v === undefined) errori.push(id + ': manca `v` (il valore)');
    if (FORZE_AMMESSE.indexOf(s.forza) === -1) errori.push(id + ': `forza` «' + s.forza + '» non ammessa (' + FORZE_AMMESSE.join(', ') + ')');
    if (typeof s.fonte !== 'string' || !s.fonte.trim()) errori.push(id + ': manca `fonte` (studio, nota di ricerca, registro o decisione)');
    if (s.regole !== undefined && (!Array.isArray(s.regole) || s.regole.some(c => !RX_CODICE.test(c)))) errori.push(id + ': `regole` e un elenco di codici XXX-NN');
    Object.keys(s).filter(x => ['v', 'forza', 'fonte', 'regole'].indexOf(x) === -1).forEach(x => errori.push(id + ': campo sconosciuto «' + x + '» (ammessi: v, forza, fonte, regole)'));
  });
  return errori;
}

const cella = x => String(x).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
function valoreLeggibile(v) {
  if (v && typeof v === 'object' && !Array.isArray(v)) return Object.keys(v).map(k => k + ' ' + valoreLeggibile(v[k])).join(', ');
  if (Array.isArray(v)) return '[' + v.map(valoreLeggibile).join(', ') + ']';
  return typeof v === 'string' ? '«' + v + '»' : String(v);
}
function sottoCoachDelFile(file) {
  const m = file.match(/^js\/coach\/([a-z]+)\//);
  return m && SOTTO_COACH_CARTELLA[m[1]] ? SOTTO_COACH_CARTELLA[m[1]] : '—';
}

/* { testo, errori, tabelle: [{ file, nome, voci }] } per la radice del repo */
function generaElenco(radice) {
  const r = radice || R;
  const errori = [], tabelle = [];
  trovaFileSoglie(r).forEach(f => {
    const c = caricaSoglie(f, fs.readFileSync(path.join(r, f), 'utf8'));
    errori.push(...c.errori);
    c.tabelle.forEach(t => { errori.push(...validaVoci(t.nome, t.voci)); tabelle.push({ file: f, nome: t.nome, voci: t.voci }); });
  });
  const tutte = [].concat(...tabelle.map(t => Object.keys(t.voci).map(k => t.voci[k])));
  const perForza = FORZE_AMMESSE.map(fz => [fz, tutte.filter(s => s && s.forza === fz).length]).filter(x => x[1]);
  const righe = [
    '# Soglie del coach',
    '',
    '> File **generato** da `tools/elenco-soglie.js` (`npm run soglie`): non si modifica a mano. Elenca ogni numero dei file `js/**/soglie-*.js` con la sua forza e la sua fonte (piano coach v2 B.4).',
    '> Forze: **Solida** (meta-analisi o posizione ufficiale), **Moderata** (pochi studi, o risultati che cambiano con la popolazione), **Contrastata** (studi in disaccordo), **Convenzione** (pratica dei coach: il foglio «Perché?» mostra «Scelta prudente del coach (Convenzione): non è un risultato di studi»), **Decisione** (scelta di prodotto: «Decisione di prodotto»), **Provvisoria** (numero di partenza in attesa di verifica: «Numero di partenza, in verifica»). Etichette: `etichettaForza` in `js/coach/regia/perche.js` (registro C.4).',
    '> Le tabelle di prima (`COACH_PARAMETRI`, `PARAM_PARTENZA`, `PARAM_INTENSITA`, `STR_PESI`, `DOSE_SCARICO`, `RIR_TIPO`) non sono ancora qui: passano in un file soglie quando il task che possiede il loro file le tocca.',
    '',
    'Totale: ' + tutte.length + ' soglie in ' + tabelle.length + ' tabelle' + (perForza.length ? ' (' + perForza.map(x => x[0] + ' ' + x[1]).join(', ') + ')' : '') + '.',
    ''
  ];
  tabelle.forEach(t => {
    righe.push('## `' + t.nome + '` — `' + t.file + '` (' + sottoCoachDelFile(t.file) + ')', '', '| Voce | Valore | Forza | Fonte | Regole |', '|---|---|---|---|---|');
    Object.keys(t.voci).forEach(k => {
      const s = t.voci[k] || {};
      righe.push('| `' + k + '` | ' + cella(valoreLeggibile(s.v)) + ' | ' + cella(s.forza || '') + ' | ' + cella(s.fonte || '') + ' | ' + cella((s.regole || []).join(', ') || '—') + ' |');
    });
    righe.push('');
  });
  return { testo: righe.join('\n'), errori, tabelle };
}

function main(argv) {
  const g = generaElenco();
  if (g.errori.length) {
    g.errori.forEach(e => console.error('ERRORE: ' + e));
    console.error(FILE_DOC + ' NON scritto: ' + g.errori.length + ' voci da sistemare');
    return 1;
  }
  const dest = path.join(R, FILE_DOC);
  const quante = g.tabelle.reduce((n, t) => n + Object.keys(t.voci).length, 0) + ' soglie in ' + g.tabelle.length + ' tabelle';
  if (argv.includes('--check')) {
    if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== g.testo) { console.error(FILE_DOC + ' non e aggiornato: lancia npm run soglie (node tools/elenco-soglie.js)'); return 1; }
    console.log('soglie aggiornate (' + quante + ')'); return 0;
  }
  fs.writeFileSync(dest, g.testo); console.log(FILE_DOC + ' scritto: ' + quante);
  return 0;
}
if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { FORZE_AMMESSE, SOTTO_COACH_CARTELLA, trovaFileSoglie, caricaSoglie, validaVoci, generaElenco, FILE_DOC };
