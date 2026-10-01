#!/usr/bin/env node
/* Genera js/coach/catalogo-regole.js dalla mappa docs/coach-mappa-regole.md:
   la mappa e l'unica fonte, il catalogo si legge dal codice (es. per spiegare
   "perche" all'utente o per spegnere una regola).
   npm run catalogo            scrive
   npm run catalogo -- --check controlla che sia aggiornato */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..');
const md = fs.readFileSync(path.join(R, 'docs/coach-mappa-regole.md'), 'utf8').split('\n');
const voci = []; let area = '';
md.forEach(r => {
  const h = r.match(/^## (\d+)\. (.*)$/); if (h) { area = h[2]; return; }
  const m = r.match(/^- \*\*([A-Z]{3}-\d{2})\*\* (.*)$/);
  if (m) voci.push({ codice: m[1], area, testo: m[2].replace(/\s+/g, ' ').trim() });
});
const codici = voci.map(v => v.codice);
const doppi = codici.filter((c, i) => codici.indexOf(c) !== i);
if (doppi.length) { console.error('Codici ripetuti nella mappa: ' + doppi.join(', ')); process.exit(1); }
const out = '/* Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da\n   docs/coach-mappa-regole.md (npm run catalogo). Non si modifica a mano.\n   Ogni regola: codice, area, descrizione. Per spegnere una regola vedi regolaAttiva() in parametri.js. */\n' +
  'const COACH_REGOLE = [\n' + voci.map(v => '  ' + JSON.stringify(v)).join(',\n') + '\n];\n' +
  'window.regolaDescritta = function(codice) { return COACH_REGOLE.find(r => r.codice === codice) || null; };\n';
const dest = path.join(R, 'js/coach/catalogo-regole.js');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== out) { console.error('catalogo-regole.js non e aggiornato: lancia npm run catalogo'); process.exit(1); }
  console.log('catalogo aggiornato (' + voci.length + ' regole)'); process.exit(0);
}
fs.writeFileSync(dest, out); console.log('catalogo scritto: ' + voci.length + ' regole');
