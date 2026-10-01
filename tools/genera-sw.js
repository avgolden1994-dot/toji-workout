#!/usr/bin/env node
/* Riscrive l'elenco dei file da tenere offline in sw.js.
   Legge index.html (fogli di stile e script), aggiunge manifest, icone e i
   disegni in esercizi/. Uso:  npm run sw        (scrive)
                               npm run sw -- --check   (solo controlla) */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
const rif = [...html.matchAll(/<(?:link rel="stylesheet" href|script src)="([^"]+)"/g)].map(m => m[1]);
const svg = fs.readdirSync(path.join(R, 'esercizi')).filter(f => f.endsWith('.svg')).sort().map(f => 'esercizi/' + f);
const lista = ['index.html', 'manifest.json', 'favicon-32.png', 'icon-192.png', 'icon-512.png', ...rif, ...svg];
const blocco = '/*INIZIO-ASSET*/\n' + lista.map(f => `  './${f}',`).join('\n') + '\n  /*FINE-ASSET*/';
const sw = fs.readFileSync(path.join(R, 'sw.js'), 'utf8');
const nuovo = sw.replace(/\/\*INIZIO-ASSET\*\/[\s\S]*?\/\*FINE-ASSET\*\//, blocco);
const mancanti = lista.filter(f => !fs.existsSync(path.join(R, f)));
if (mancanti.length) { console.error('File citati ma assenti:', mancanti.join(', ')); process.exit(1); }
if (process.argv.includes('--check')) {
  if (nuovo !== sw) { console.error('sw.js non e aggiornato: lancia npm run sw'); process.exit(1); }
  console.log('sw.js aggiornato (' + lista.length + ' file)'); process.exit(0);
}
fs.writeFileSync(path.join(R, 'sw.js'), nuovo);
console.log('sw.js riscritto: ' + lista.length + ' file');
