#!/usr/bin/env node
/* Aggiorna il grafo del codice (graphify-out/) in un colpo solo:
   1. graphify update .            estrazione AST di graphify (nessun LLM)
   2. legami dei nomi globali      graphify non vede window.nome = function e le
                                   chiamate tra file (script classici): li aggiunge
                                   da tools/simboli.js (nodi e archi con fonte
                                   "tools/simboli.js", confidenza EXTRACTED)
   3. graphify cluster-only .      ricalcola community, report e graph.html
   4. nomi delle community         in italiano, da tools/grafo-nomi.json (file
                                   principale -> nome), riapplicati ad ogni giro
   Uso: npm run grafo   (serve graphify: python3 -m venv /tmp/gfy && /tmp/gfy/bin/pip install graphifyy;
                         il binario si cerca in $GRAPHIFY, nel PATH o in /tmp/gfy/bin/graphify) */
const fs = require('fs'), path = require('path'), { execFileSync, spawnSync } = require('child_process');
const R = path.join(__dirname, '..');
const OUT = path.join(R, 'graphify-out');
const FONTE = 'tools/simboli.js';

/* impronta dei sorgenti che finiscono nel grafo: dice senza graphify se il grafo e aggiornato */
const IMPRONTA = path.join(OUT, 'impronta-sorgenti.txt');
function impronta() {
  const crypto = require('crypto'), h = crypto.createHash('sha256');
  const fuori = /^(docs\/indice-codice\.md|docs\/mappa-simboli\.md|tests\/browser\/)/;
  const file = execFileSync('git', ['ls-files', '-co', '--exclude-standard', 'js', 'tools', 'tests', 'docs', 'index.html', 'package.json', 'manifest.json', 'sw.js', 'CLAUDE.md', 'README.md', '.graphifyignore'], { cwd: R, encoding: 'utf8' })
    .split('\n').filter(f => f && !fuori.test(f) && fs.existsSync(path.join(R, f))).sort();
  file.forEach(f => { h.update(f + '\0'); h.update(fs.readFileSync(path.join(R, f))); });
  return h.digest('hex');
}
if (process.argv.includes('--verifica')) {
  const salvata = fs.existsSync(IMPRONTA) ? fs.readFileSync(IMPRONTA, 'utf8').trim() : '';
  if (salvata !== impronta()) { console.error('grafo NON aggiornato rispetto al codice: lancia npm run grafo'); process.exit(1); }
  console.log('grafo aggiornato'); process.exit(0);
}

function trovaGraphify() {
  const prova = [process.env.GRAPHIFY, 'graphify', '/tmp/gfy/bin/graphify'].filter(Boolean);
  for (const p of prova) if (spawnSync(p, ['--help'], { stdio: 'ignore' }).status === 0) return p;
  console.error('graphify non trovato. Installa:  python3 -m venv /tmp/gfy && /tmp/gfy/bin/pip install graphifyy\n' +
    'oppure indica il binario con GRAPHIFY=/percorso/graphify npm run grafo');
  process.exit(1);
}
const GFY = trovaGraphify();
const env = { ...process.env, GRAPHIFY_NO_BACKUP: '1', GRAPHIFY_NO_TIPS: '1' };
const graphify = (...args) => {
  const r = spawnSync(GFY, args, { cwd: R, env, encoding: 'utf8' });
  const testo = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { console.error(testo); console.error('graphify ' + args.join(' ') + ' non riuscito'); process.exit(1); }
  return testo;
};
const leggiGrafo = () => JSON.parse(fs.readFileSync(path.join(OUT, 'graph.json'), 'utf8'));
const scriviGrafo = g => fs.writeFileSync(path.join(OUT, 'graph.json'), JSON.stringify(g, null, 2));

/* 1. estrazione di graphify */
console.log('1/4 graphify update .');
graphify('update', '.');

/* 2. legami dei nomi globali */
console.log('2/4 legami dei nomi globali (tools/simboli.js)');
const dati = JSON.parse(execFileSync(process.execPath, [path.join(__dirname, 'simboli.js'), '--json'], { cwd: R, maxBuffer: 1 << 28 }));
const g = leggiGrafo();
const linkKey = g.links ? 'links' : 'edges';
g.nodes = g.nodes.filter(n => n.fonte !== FONTE);
g[linkKey] = g[linkKey].filter(l => l.fonte !== FONTE);
const makeId = (...parti) => parti.join('_').toLowerCase().replace(/[^\p{L}\p{N}_]+/gu, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
const nodi = new Map(g.nodes.map(n => [n.id, n]));
const perNome = new Map();   // "file::nome" -> id
g.nodes.forEach(n => {
  if (!n.source_file || !n.label) return;
  perNome.set(n.source_file + '::' + n.label.replace(/\(\)$/, ''), n.id);
});
const idFile = f => {
  const id = makeId(f.replace(/\.[^.\/]+$/, ''));
  if (nodi.has(id)) return id;
  if (f === 'index.html' && nodi.has('index')) return 'index';
  const n = { id, label: path.basename(f), file_type: f.endsWith('.html') ? 'document' : 'code', source_file: f, source_location: 'L1', _origin: 'semantic', fonte: FONTE };
  g.nodes.push(n); nodi.set(id, n); return id;
};
const archi = new Set(g[linkKey].map(l => l.source + '|' + l.target + '|' + l.relation));
const aggiungiArco = (source, target, relation, file, riga, context) => {
  if (source === target) return;
  const k = source + '|' + target + '|' + relation;
  if (archi.has(k)) return;
  archi.add(k);
  g[linkKey].push({ source, target, relation, confidence: 'EXTRACTED', confidence_score: 1.0, context, source_file: file,
    source_location: 'L' + riga, weight: 1.0, _origin: 'semantic', fonte: FONTE });
};
let nuoviNodi = 0;
const idSimbolo = new Map();
const usatoFuori = s => s.usi.some(u => u.file !== s.file && !u.file.startsWith('tests/'));
dati.simboli.forEach(s => {
  let id = perNome.get(s.file + '::' + s.nome);
  if (!id && (s.window || usatoFuori(s) || s.tipo === 'funzione')) {
    id = makeId(s.file.replace(/\.[^.\/]+$/, ''), s.nome);
    if (nodi.has(id)) id = id + '_globale';
    const n = { id, label: s.nome + (s.tipo === 'funzione' ? '()' : ''), file_type: 'code', source_file: s.file,
      source_location: 'L' + s.riga, _origin: 'semantic', fonte: FONTE, tipo_simbolo: s.tipo + (s.window ? ' window' : '') };
    if (s.tipo === 'funzione') n._callable = true;
    g.nodes.push(n); nodi.set(id, n); perNome.set(s.file + '::' + s.nome, id); nuoviNodi++;
    aggiungiArco(idFile(s.file), id, 'contains', s.file, s.riga, 'definizione globale');
  }
  if (id) idSimbolo.set(s.nome, id);
});
let nuoviArchi = 0;
const prima = archi.size;
dati.simboli.forEach(s => {
  const target = idSimbolo.get(s.nome);
  if (!target) return;
  s.usi.forEach(u => {
    if (u.file.startsWith('tests/')) return;   // i test li elenca la mappa, nel grafo resta il codice dell'app
    const source = (u.da && perNome.get(u.file + '::' + u.da)) || idFile(u.file);
    const rel = u.come === 'usa' ? 'references' : 'calls';
    aggiungiArco(source, target, rel, u.file, u.riga, u.come === 'html' ? 'html (onclick/markup)' : 'nome globale');
  });
});
nuoviArchi = archi.size - prima;
g.directed = true;   // diretto: "A chiama B" e "B chiama A" restano due archi distinti
scriviGrafo(g);
console.log(`   +${nuoviNodi} nodi, +${nuoviArchi} archi`);

/* 3. community, report, graph.html */
console.log('3/4 graphify cluster-only .');
const ETICHETTE = path.join(OUT, '.graphify_labels.json'), FIRME = ETICHETTE + '.sig';
[ETICHETTE, FIRME].forEach(f => fs.rmSync(f, { force: true }));   // file locali di graphify: i nomi veri sono in tools/grafo-nomi.json
graphify('cluster-only', '.', '--no-label');   // --no-label: nessuna chiamata a un LLM

/* 4. nomi delle community in italiano */
console.log('4/4 nomi delle community (tools/grafo-nomi.json)');
const { _nota, ...nomiFile } = JSON.parse(fs.readFileSync(path.join(__dirname, 'grafo-nomi.json'), 'utf8'));
const descrizione = f => {
  if (nomiFile[f]) return nomiFile[f];
  const p = path.join(R, f);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) return f;
  const testa = fs.readFileSync(p, 'utf8').slice(0, 600);
  const m = f.endsWith('.md') ? testa.match(/^#\s+(.+)$/m) : testa.match(/^\s*\/\*\s*([^\n*]+)/);
  return m ? m[1].trim().replace(/[:.]$/, '') : path.basename(f);
};
const g2 = leggiGrafo();
const comunita = new Map();
g2.nodes.forEach(n => {
  if (n.community == null) return;
  if (!comunita.has(n.community)) comunita.set(n.community, new Map());
  const conta = comunita.get(n.community), f = n.source_file || '';
  if (f) conta.set(f, (conta.get(f) || 0) + 1);
});
const etichette = {}, usate = new Map();
[...comunita.keys()].sort((a, b) => a - b).forEach(cid => {
  const conta = [...comunita.get(cid)].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (!conta.length) {   // solo moduli esterni (fs, path, os...) richiesti da test e strumenti
    etichette[cid] = 'Moduli esterni di Node: ' + g2.nodes.filter(n => n.community === cid).map(n => n.label.replace(/^ref_/, '')).join(', ');
    return;
  }
  const [f] = conta[0];
  let nome = descrizione(f);
  const volte = (usate.get(nome) || 0) + 1; usate.set(nome, volte);
  if (volte > 1) nome += ' (parte ' + volte + ')';
  const altri = conta.slice(1).map(([a]) => path.basename(a));   // i nomi degli altri file: cosi un grep nel report trova l'area
  etichette[cid] = nome + ' · ' + f + (altri.length ? ' + ' + altri.slice(0, 3).join(', ') + (altri.length > 3 ? ` +${altri.length - 3}` : '') : '');
});
fs.writeFileSync(ETICHETTE, JSON.stringify(etichette, null, 2));
fs.rmSync(FIRME, { force: true });
graphify('cluster-only', '.');   // stessa suddivisione: graphify riusa le etichette appena scritte
const finale = leggiGrafo();
const ok = new Set(finale.nodes.filter(n => n.community != null && n.community_name === etichette[n.community]).map(n => n.community));
console.log(`fatto: ${finale.nodes.length} nodi, ${finale[linkKey].length} archi, ${comunita.size} community ` +
  `(${ok.size} con il nome italiano)`);
if (ok.size < comunita.size) { console.error('graphify non ha riusato tutti i nomi: rilancia npm run grafo'); process.exit(1); }

/* report: due righe in testa su come si usa il grafo in questo repo, e l'impronta dei sorgenti */
const rp = path.join(OUT, 'GRAPH_REPORT.md');
let report = fs.readFileSync(rp, 'utf8');
report = report.replace(/^(# .*\n)/, '$1\n' +
  '> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).\n' +
  '> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.\n' +
  '> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.\n' +
  '> Aggiornato? `npm run grafo:verifica` (non serve graphify).\n')
  .replace('Run `git rev-parse HEAD` and compare to check if the graph is stale.', 'Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).')
  .replace('Run `graphify update .` after code changes (no API cost).', 'Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).');
fs.writeFileSync(rp, report);
fs.writeFileSync(IMPRONTA, impronta() + '\n');
