#!/usr/bin/env node
/* Genera docs/indice-codice.md: per ogni file, a cosa serve e quali funzioni
   mette a disposizione. Serve a trovare il punto giusto senza leggere il codice.
   npm run indice            scrive il file
   npm run indice -- --check controlla che sia aggiornato */
const fs = require('fs'), path = require('path'), acorn = require('acorn');
const R = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const righe = ['# Indice del codice', '',
  'File generato da `tools/indice.js` (`npm run indice`): non si modifica a mano.',
  'Prima di leggere il codice consulta `graphify-out/GRAPH_REPORT.md`, poi il grafo (`graphify-out/graph.json`).',
  'Gli script si caricano **in questo ordine** (lo stesso di `index.html`).', ''];
let cartella = '';
scripts.forEach((f, i) => {
  const src = fs.readFileSync(path.join(R, f), 'utf8');
  const c = f.split('/').slice(0, f.startsWith('js/lingue') ? 2 : f.split('/').length > 2 ? 2 : 1).join('/');
  if (c !== cartella) { cartella = c; righe.push('## ' + c, ''); }
  const desc = (src.match(/^\/\*\s*([^\n*]+)/) || [, ''])[1].trim();
  righe.push(`### ${i + 1}. \`${f}\` — ${desc}`);
  if (f.includes('lingue/')) { righe.push(''); return; }
  const nomi = [];
  acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' }).body.forEach(n => {
    if (n.type === 'FunctionDeclaration') nomi.push(n.id.name + '()');
    else if (n.type === 'VariableDeclaration') n.declarations.forEach(d => d.id.name && nomi.push(d.id.name));
    else if (n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression') {
      const l = n.expression.left;
      if (l.type === 'MemberExpression' && l.object.name === 'window' && l.property.name) nomi.push('window.' + l.property.name + '()');
    }
  });
  righe.push('', nomi.length ? nomi.map(n => '`' + n + '`').join(' · ') : '_solo istruzioni, nessun nome pubblico_', '');
});
const out = righe.join('\n');
const dest = path.join(R, 'docs/indice-codice.md');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== out) { console.error('docs/indice-codice.md non e aggiornato: lancia npm run indice'); process.exit(1); }
  console.log('indice aggiornato'); process.exit(0);
}
fs.writeFileSync(dest, out); console.log('indice scritto (' + scripts.length + ' file)');
