#!/usr/bin/env node
/* Mappa dei simboli globali: per ogni nome globale (funzione, costante,
   window.nome) dice in quale file e riga e definito e chi lo usa negli altri
   file (chiamate, riferimenti, onclick="nome()" nell'HTML e nelle stringhe).
   L'app e fatta di script classici che si parlano solo per nomi globali:
   questa mappa rende visibili quei legami senza leggere il codice.
   npm run simboli              scrive docs/mappa-simboli.md
   npm run simboli -- --check   controlla che sia aggiornata
   node tools/simboli.js --json stampa i dati (li usa tools/grafo.js) */
const fs = require('fs'), path = require('path'), acorn = require('acorn');
const R = path.join(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(R, f), 'utf8');
const html = leggi('index.html');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const DIZIONARI = /^js\/lingue\/(en|es|de)\.js$/;   // solo frasi tradotte: niente da mappare
const appFiles = scripts.filter(f => !DIZIONARI.test(f));
const elenca = d => fs.readdirSync(path.join(R, d)).filter(f => f.endsWith('.js')).sort().map(f => d + '/' + f);
const testFiles = [...elenca('tests'), ...elenca('tests/browser')];
const parse = src => acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script', locations: true, allowHashBang: true });
const ast = {};
appFiles.forEach(f => { ast[f] = parse(leggi(f)); });

/* ---------- 1. definizioni ---------- */
const defs = new Map();   // nome -> { file, riga, tipo, window, alias }
const isFn = n => n && /^(FunctionExpression|ArrowFunctionExpression|ClassExpression)$/.test(n.type);
const nomiPattern = (p, out = []) => {
  if (!p) return out;
  if (p.type === 'Identifier') out.push(p.name);
  else if (p.type === 'ObjectPattern') p.properties.forEach(q => nomiPattern(q.type === 'RestElement' ? q.argument : q.value, out));
  else if (p.type === 'ArrayPattern') p.elements.forEach(e => nomiPattern(e, out));
  else if (p.type === 'AssignmentPattern') nomiPattern(p.left, out);
  else if (p.type === 'RestElement') nomiPattern(p.argument, out);
  return out;
};
const definisci = (nome, file, riga, tipo, extra = {}) => {
  const d = defs.get(nome);
  if (!d) defs.set(nome, { nome, file, riga, tipo, ...extra });
  else if (extra.window && d.file === file) d.window = true;
  else if (d.file !== file) (d.ridefinito = d.ridefinito || []).push(file + ':' + riga);   // window.x riassegnato (avvolto) altrove
};
const nomeWindow = l => l && l.type === 'MemberExpression' && l.object.type === 'Identifier' && l.object.name === 'window'
  ? (!l.computed ? l.property.name : typeof l.property.value === 'string' ? l.property.value : null) : null;

/* visita generica: chiama fn(nodo, genitore, campo) su ogni nodo */
function visita(n, fn, genitore = null, campo = null) {
  if (!n || typeof n.type !== 'string') return;
  if (fn(n, genitore, campo) === false) return;
  for (const k in n) {
    if (k === 'loc' || k === 'start' || k === 'end') continue;
    const v = n[k];
    if (Array.isArray(v)) v.forEach(c => c && typeof c.type === 'string' && visita(c, fn, n, k));
    else if (v && typeof v.type === 'string') visita(v, fn, n, k);
  }
}

appFiles.forEach(f => {
  ast[f].body.forEach(s => {
    if (s.type === 'FunctionDeclaration') definisci(s.id.name, f, s.loc.start.line, 'funzione');
    else if (s.type === 'ClassDeclaration') definisci(s.id.name, f, s.loc.start.line, 'classe');
    else if (s.type === 'VariableDeclaration') s.declarations.forEach(d => nomiPattern(d.id).forEach(nome =>
      definisci(nome, f, d.loc.start.line, isFn(d.init) ? 'funzione' : s.kind === 'const' ? 'costante' : 'variabile')));
  });
  ast[f].body.forEach(s => {   // nome = function ... : riassegna (avvolge) un globale di un altro file
    const e = s.type === 'ExpressionStatement' && s.expression;
    if (e && e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'Identifier' && defs.has(e.left.name) && defs.get(e.left.name).file !== f)
      definisci(e.left.name, f, s.loc.start.line, 'funzione');
  });
  visita(ast[f], n => {
    if (n.type !== 'AssignmentExpression' || n.operator !== '=') return;
    const nome = nomeWindow(n.left);
    if (!nome) return;
    const r = n.right;
    const tipo = isFn(r) ? 'funzione' : r.type === 'Identifier' && defs.has(r.name) && defs.get(r.name).tipo === 'funzione' ? 'funzione' : 'valore';
    definisci(nome, f, n.loc.start.line, tipo, { window: true, ...(r.type === 'Identifier' && r.name !== nome ? { alias: r.name } : {}) });
  });
});

/* ---------- 2. usi ---------- */
const usi = new Map();    // nome -> [{ file, riga, da, come }]
const aggiungiUso = (nome, u) => { if (!usi.has(nome)) usi.set(nome, []); usi.get(nome).push(u); };
const RX_CHIAMATA = /(?<![\w$.])([A-Za-z_$][\w$]*)\s*\(/g;   // "apri(1)" in onclick="..." o in una stringa di markup
function usiInStringa(testo, file, riga, da) {
  for (const c of testo.matchAll(RX_CHIAMATA)) {
    const d = defs.get(c[1]);
    if (d && d.tipo === 'funzione') aggiungiUso(c[1], { file, riga, da, come: 'html' });
  }
}

/* dichiarazioni locali di una funzione (parametri e var/let/const/function del corpo,
   senza scendere nelle funzioni annidate) */
function localiDi(fnNode) {
  const s = new Set();
  fnNode.params.forEach(p => nomiPattern(p).forEach(x => s.add(x)));
  if (fnNode.id && fnNode.type !== 'FunctionDeclaration') s.add(fnNode.id.name);
  visita(fnNode.body, (n, g) => {
    if (n !== fnNode.body && /Function/.test(n.type)) { if (n.type === 'FunctionDeclaration') s.add(n.id.name); return false; }
    if (n.type === 'VariableDeclarator') nomiPattern(n.id).forEach(x => s.add(x));
    if (n.type === 'ClassDeclaration') s.add(n.id.name);
    if (n.type === 'CatchClause' && n.param) nomiPattern(n.param).forEach(x => s.add(x));
  });
  return s;
}

/* proprietario di un'istruzione di primo livello: la funzione/costante che la contiene */
function proprietario(s) {
  if (s.type === 'FunctionDeclaration' || s.type === 'ClassDeclaration') return s.id.name;
  if (s.type === 'VariableDeclaration' && s.declarations.length === 1 && s.declarations[0].id.type === 'Identifier') return s.declarations[0].id.name;
  if (s.type === 'ExpressionStatement' && s.expression.type === 'AssignmentExpression') return nomeWindow(s.expression.left);
  return null;
}

function analizzaUsi(file, programma, globaliLocali) {
  programma.body.forEach(stmt => {
    const daStmt = proprietario(stmt);
    const scopi = globaliLocali ? [globaliLocali] : [];
    let dentroFunzioni = 0;   // funzioni non ancora eseguite (le IIFE contano come codice di primo livello)
    const alCarico = () => dentroFunzioni === 0 ? { carico: true } : {};   // eseguito mentre lo script si carica
    const locale = nome => scopi.some(s => s.has(nome));
    const cammina = (n, g, campo, da) => {
      if (!n || typeof n.type !== 'string') return;
      if (/^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/.test(n.type)) {
        const iife = g && g.type === 'CallExpression' && campo === 'callee';
        if (!iife) dentroFunzioni++;
        scopi.push(localiDi(n));
        n.params.forEach(p => camminaPattern(p, da));
        cammina(n.body, n, 'body', da);
        scopi.pop();
        if (!iife) dentroFunzioni--;
        return;
      }
      if (n.type === 'VariableDeclarator') {
        let daD = da;
        if (g === stmt && stmt.declarations.length > 1 && n.id.type === 'Identifier') daD = n.id.name;
        camminaPattern(n.id, daD); cammina(n.init, n, 'init', daD); return;
      }
      if (n.type === 'AssignmentExpression') {
        const w = nomeWindow(n.left);
        if (w) { cammina(n.right, n, 'right', da || w); return; }   // window.x = ... : definizione, non uso
      }
      if (n.type === 'CatchClause') {
        scopi.push(new Set(nomiPattern(n.param)));
        cammina(n.body, n, 'body', da); scopi.pop(); return;
      }
      if (n.type === 'MemberExpression') {
        const w = nomeWindow(n);
        if (w && defs.has(w)) aggiungiUso(w, { file, riga: n.loc.start.line, da, come: g && g.type === 'CallExpression' && campo === 'callee' ? 'chiama' : 'usa', ...alCarico() });
        cammina(n.object, n, 'object', da);
        if (n.computed) cammina(n.property, n, 'property', da);
        return;
      }
      if (n.type === 'Property' || n.type === 'MethodDefinition' || n.type === 'PropertyDefinition') {
        if (n.computed) cammina(n.key, n, 'key', da);
        if (n.type === 'Property' && n.shorthand && n.value.type === 'Identifier') cammina(n.value, n, 'value', da);
        else cammina(n.value, n, 'value', da);
        return;
      }
      if (/^(LabeledStatement|BreakStatement|ContinueStatement)$/.test(n.type)) { if (n.body) cammina(n.body, n, 'body', da); return; }
      if (n.type === 'Identifier') {
        if (defs.has(n.name) && !locale(n.name))
          aggiungiUso(n.name, { file, riga: n.loc.start.line, da, come: g && (g.type === 'CallExpression' || g.type === 'NewExpression') && campo === 'callee' ? 'chiama' : 'usa', ...alCarico() });
        return;
      }
      if (n.type === 'Literal' && typeof n.value === 'string') { usiInStringa(n.value, file, n.loc.start.line, da); return; }
      if (n.type === 'TemplateElement') { usiInStringa(n.value.cooked || n.value.raw, file, n.loc.start.line, da); return; }
      for (const k in n) {
        if (k === 'loc' || k === 'start' || k === 'end') continue;
        const v = n[k];
        if (Array.isArray(v)) v.forEach(c => cammina(c, n, k, da));
        else if (v && typeof v.type === 'string') cammina(v, n, k, da);
      }
    };
    const camminaPattern = (p, da) => {   // nei pattern contano solo i valori di default
      if (!p) return;
      if (p.type === 'AssignmentPattern') { camminaPattern(p.left, da); cammina(p.right, p, 'right', da); }
      else if (p.type === 'ObjectPattern') p.properties.forEach(q => { if (q.computed) cammina(q.key, q, 'key', da); camminaPattern(q.type === 'RestElement' ? q.argument : q.value, da); });
      else if (p.type === 'ArrayPattern') p.elements.forEach(e => camminaPattern(e, da));
      else if (p.type === 'RestElement') camminaPattern(p.argument, da);
      else if (p.type !== 'Identifier') cammina(p, null, null, da);
    };
    if (stmt.type === 'FunctionDeclaration' || stmt.type === 'ClassDeclaration') cammina(stmt, programma, 'body', daStmt);
    else cammina(stmt, programma, 'body', daStmt);
  });
}

appFiles.forEach(f => analizzaUsi(f, ast[f], null));
/* nei test i nomi di primo livello sono del test (helper locali), non dell'app */
testFiles.forEach(f => {
  let p; try { p = parse(leggi(f)); } catch (e) { return; }
  const propri = new Set();
  p.body.forEach(s => {
    if (s.type === 'FunctionDeclaration' || s.type === 'ClassDeclaration') propri.add(s.id.name);
    if (s.type === 'VariableDeclaration') s.declarations.forEach(d => nomiPattern(d.id).forEach(x => propri.add(x)));
  });
  analizzaUsi(f, p, propri);
});
html.split('\n').forEach((r, i) => usiInStringa(r, 'index.html', i + 1, null));

/* ---------- 3. uscita ---------- */
const ordine = new Map([...appFiles, 'index.html', ...testFiles].map((f, i) => [f, i]));
const simboli = [...defs.values()].map(d => {
  const u = (usi.get(d.nome) || []).filter(x => !(x.file === d.file && x.da === d.nome));   // la ricorsione non conta
  u.sort((a, b) => ordine.get(a.file) - ordine.get(b.file) || a.riga - b.riga);
  return { ...d, usi: u };
});
/* dipendenze al caricamento: codice di primo livello (o IIFE) che usa un nome di un altro file
   mentre lo script si carica. Quel file deve stare PRIMA in index.html. */
const alCaricamento = new Map();   // file -> Map(fileDefinizione -> [nomi])
const fuoriOrdine = [];
simboli.forEach(d => d.usi.forEach(u => {
  if (!u.carico || u.file === d.file || !appFiles.includes(u.file)) return;
  if (!alCaricamento.has(u.file)) alCaricamento.set(u.file, new Map());
  const m = alCaricamento.get(u.file);
  if (!m.has(d.file)) m.set(d.file, new Set());
  m.get(d.file).add(d.nome);
  if (appFiles.indexOf(d.file) > appFiles.indexOf(u.file)) fuoriOrdine.push(`${u.file}:${u.riga} usa ${d.nome} al caricamento, ma ${d.file} viene dopo in index.html`);
}));
const datiJson = { generato: 'tools/simboli.js', file: appFiles, simboli };
const iTrova = process.argv.indexOf('--trova');
if (iTrova > 0) {   // npm run trova -- nome  (anche piu nomi, o un pezzo di nome)
  const cercati = process.argv.slice(iTrova + 1).filter(a => !a.startsWith('--'));
  if (!cercati.length) { console.error('uso: npm run trova -- nomeFunzione [altroNome...]'); process.exit(2); }
  let trovati = 0;
  cercati.forEach(q => {
    const nome = q.replace(/^window\./, '').replace(/\(\)$/, '');
    const s = simboli.find(x => x.nome === nome);
    if (!s) {
      const simili = simboli.filter(x => x.nome.toLowerCase().includes(nome.toLowerCase())).slice(0, 25);
      console.log(`"${nome}": nessun nome globale con questo nome.` + (simili.length ? ' Simili: ' + simili.map(x => x.nome + ' (' + x.file + ':' + x.riga + ')').join(', ') : '') +
        '\n  (se e locale a una funzione: grep -rn "' + nome + '" js/)');
      return;
    }
    trovati++;
    console.log(`${s.nome}${s.tipo === 'funzione' ? '()' : ''}  ${s.file}:${s.riga}  ${s.tipo}${s.window ? ' (window.' + s.nome + ')' : ''}${s.alias ? ' = ' + s.alias : ''}`);
    if (s.ridefinito) console.log('  riassegnato (avvolto) anche in: ' + s.ridefinito.join(', ') + '  <- la versione attiva e l ultima caricata');
    const riga = u => `    ${u.file}:${u.riga}${u.da ? '  in ' + u.da : '  (primo livello)'}${u.come === 'html' ? '  [onclick/markup]' : u.come === 'usa' ? '  [riferimento]' : ''}${u.carico ? '  [al caricamento]' : ''}`;
    const fuori = s.usi.filter(u => u.file !== s.file), dentro = s.usi.filter(u => u.file === s.file);
    console.log(`  chi lo usa (${fuori.length} da altri file${dentro.length ? ', ' + dentro.length + ' nello stesso file' : ''}):`);
    [...fuori, ...dentro].forEach(u => console.log(riga(u)));
    if (!s.usi.length) console.log('    nessuno (forse chiamato con un nome costruito a runtime, o non piu usato)');
    const usa = new Map();
    simboli.forEach(x => x.usi.forEach(u => { if (u.file === s.file && u.da === s.nome && x.nome !== s.nome) usa.set(x.nome, x); }));
    if (usa.size) console.log('  cosa usa:\n' + [...usa.values()].map(x => `    ${x.nome}  ${x.file}:${x.riga}`).join('\n'));
  });
  process.exit(trovati ? 0 : 1);
}
if (process.argv.includes('--json')) { fs.writeFileSync(1, JSON.stringify(datiJson)); process.exit(0); }

const etichetta = d => '`' + d.nome + (d.tipo === 'funzione' ? '()' : '') + '`';
const MAX = 14;
function elencoUsi(d) {
  const fuori = d.usi.filter(u => u.file !== d.file);
  const dentro = d.usi.filter(u => u.file === d.file);
  const parti = [];
  const perFile = new Map();
  fuori.forEach(u => { if (!perFile.has(u.file)) perFile.set(u.file, []); perFile.get(u.file).push(u); });
  const dettaglio = perFile.size <= MAX;
  for (const [f, lista] of perFile) {
    if (!dettaglio) { parti.push(f + ' ×' + lista.length); continue; }
    const visti = new Set(), voci = [];
    lista.forEach(u => {
      const k = u.da || 'L' + u.riga;
      if (visti.has(k)) return; visti.add(k);
      voci.push(u.riga + (u.da ? ' ' + u.da : '') + (u.come === 'html' ? ' (html)' : ''));
    });
    parti.push(f + ':' + voci.slice(0, 6).join(', ') + (voci.length > 6 ? ', …' : ''));
  }
  let s = parti.length ? '← ' + parti.join(' · ') : '← nessun altro file';
  if (dentro.length) {
    const da = [...new Set(dentro.map(u => u.da || '(primo livello)'))];
    s += ' — nel file: ' + da.slice(0, 8).join(', ') + (da.length > 8 ? ', …' : '');
  }
  return s;
}
const righe = ['# Mappa dei simboli globali', '',
  'File generato da `tools/simboli.js` (`npm run simboli`): non si modifica a mano (`npm run controlla` lo verifica).',
  'Ogni riga: nome, dove e definito (`file:riga`), tipo, e **chi lo usa** negli altri file (`file:riga funzione`;',
  '"(html)" = chiamato da un gestore `onclick="nome()"` in index.html o da una stringa di markup nel JS). In fondo alla riga, chi lo usa nello stesso file.',
  'Cerca con `grep -n "nomeFunzione" docs/mappa-simboli.md`: la riga del nome dice chi lo usa; le altre righe in cui compare dicono cosa usa lui.',
  'Esclusi i dizionari `js/lingue/en|es|de.js`. Tra i "chi lo usa" ci sono anche i test (`tests/`).', '',
  '## Dipendenze al caricamento (ordine degli script)', '',
  'Quasi tutto il codice gira solo dopo l avvio, quando ogni file e caricato. Questi file invece usano nomi di altri file',
  '**mentre si caricano** (codice di primo livello o IIFE): il file a destra deve stare prima in `index.html`.',
  '`npm run simboli -- --check` fallisce se l ordine non e rispettato.', '',
  ...[...alCaricamento].sort((a, b) => appFiles.indexOf(a[0]) - appFiles.indexOf(b[0])).map(([f, m]) =>
    '- `' + f + '` ← ' + [...m].map(([df, nomi]) => '`' + df + '` (' + [...nomi].join(', ') + ')').join(' · ')),
  ''];
let cartella = '';
appFiles.forEach(f => {
  const c = f.split('/').slice(0, f.split('/').length > 2 ? 2 : 1).join('/');
  if (c !== cartella) { cartella = c; righe.push('## ' + c, ''); }
  righe.push('### `' + f + '`', '');
  const propri = simboli.filter(d => d.file === f).sort((a, b) => a.riga - b.riga);
  if (!propri.length) { righe.push('_nessun nome globale_', ''); return; }
  propri.forEach(d => righe.push('- ' + etichetta(d) + ' ' + f + ':' + d.riga + ' ' + d.tipo + (d.window ? ' window' : '') +
    (d.alias ? ' = ' + d.alias : '') + (d.ridefinito ? ' (riassegnato anche in ' + d.ridefinito.join(', ') + ')' : '') + ' ' + elencoUsi(d)));
  righe.push('');
});
const out = righe.join('\n');
const dest = path.join(R, 'docs/mappa-simboli.md');
if (fuoriOrdine.length) { console.error('Ordine degli script in index.html non valido:\n  ' + fuoriOrdine.join('\n  ')); process.exit(1); }
if (process.argv.includes('--check')) {
  if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== out) { console.error('docs/mappa-simboli.md non e aggiornata: lancia npm run simboli'); process.exit(1); }
  console.log('mappa dei simboli aggiornata (' + simboli.length + ' nomi)'); process.exit(0);
}
fs.writeFileSync(dest, out); console.log('mappa dei simboli scritta: ' + simboli.length + ' nomi in ' + appFiles.length + ' file');
