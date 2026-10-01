/* Prova di avvio in un browser vero: la pagina si carica, nessun errore, i dati sono al loro posto. */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) {}
const exe = process.env.CHROMIUM || ['/opt/pw-browsers/chromium'].find(p => fs.existsSync(p));
const url = 'file://' + path.join(__dirname, '..', 'index.html');

test('avvio senza errori', { skip: !chromium || !exe ? 'browser non disponibile' : false }, async () => {
  const b = await chromium.launch({ executablePath: exe });
  try {
    const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' })).newPage();
    const errori = [];
    p.on('pageerror', e => errori.push(e.message));
    await p.addInitScript(() => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'no'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); });
    await p.goto(url); await p.waitForTimeout(900);
    assert.deepStrictEqual(errori, []);
    assert.strictEqual(await p.title(), '3in');
    assert.ok(await p.evaluate(() => typeof buildProgram === 'function' && typeof chooseMode === 'function'));
  } finally { await b.close(); }
});
test('il vecchio indirizzo toji.html porta a index.html', { skip: !chromium || !exe ? 'browser non disponibile' : false }, async () => {
  const b = await chromium.launch({ executablePath: exe });
  try {
    const p = await (await b.newContext({ serviceWorkers: 'block' })).newPage();
    await p.goto('file://' + path.join(__dirname, '..', 'toji.html')); await p.waitForTimeout(600);
    assert.match(p.url(), /index\.html$/);
  } finally { await b.close(); }
});
