/* Onboarding di W2-T5 nel browser vero, in italiano, inglese, spagnolo e tedesco: avviso massa+dimagrimento (OBI-01) e il tocco sulla ricomposizione, nota «tonificare» (OBI-07), le 4 sedute di chi comincia con 5 giorni (PRG-02),
   niente opzione dei 20 minuti (CAS-10), la domanda sugli attrezzi di casa e di palestra e i kg dei manubri (CAS-01), «Bene» = 8 ore per un minorenne (ETA-05), nessuna frase senza traduzione.
   Serve soglie-split.js nell index.html (lo mette l integrazione, docs/in-arrivo/W2-T5.json). */
const { chromium } = require('playwright-core');
const path = require('path'), url = require('url');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
  let problemi = 0;
  const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
  for (const lang of ['it', 'en', 'es', 'de']) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(l => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'si'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', l); }, lang);
    await p.goto(url.pathToFileURL(path.join(__dirname, '..', '..', 'index.html')).href); await p.waitForTimeout(900);
    const testo = async () => (await p.evaluate(() => document.getElementById('onb-body').innerText));
    const passo = async (n, dati) => { await p.evaluate(([n, d]) => { onbData = Object.assign(nuovoOnbData(), d); onbStep = n; document.getElementById('onb').classList.remove('hidden'); renderOnb(); }, [n, dati]); await p.waitForTimeout(350); return testo(); };
    console.log('== ' + lang);
    const t0 = await passo(0, { goals: ['massa', 'dimagrimento'], goal: 'massa' });
    ok(await p.$('#onb-avviso-obiettivi') !== null, 'passo 0: avviso massa+dimagrimento presente');
    await p.click('text=' + (await p.evaluate(() => tr('Usa la ricomposizione'))));
    await p.waitForTimeout(300);
    ok(JSON.stringify(await p.evaluate(() => onbData.goals)) === '["ricomposizione"]', 'passo 0: il tocco passa alla ricomposizione');
    ok(await p.$('#onb-nota-tonificare') !== null, 'passo 0: nota «tonificare» con la ricomposizione');
    await passo(2, { level: 'principiante', days: 5 });
    ok(await p.$('#onb-avviso-giorni') !== null, 'passo 2: chi comincia con 5 giorni legge le 4 sedute');
    await passo(3, { minutes: 45 });
    ok(!/20/.test(await testo()), 'passo 3: niente 20 minuti');
    const t4 = await passo(4, { luogo: 'manubri', age: 16 });
    ok(await p.$('#onb-manubri-kg') !== null, 'passo 4 (casa coi manubri): campo dei kg');
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Panca'))) + '")');
    await p.fill('#onb-manubri-kg', '18');
    await p.waitForTimeout(200);
    ok(JSON.stringify(await p.evaluate(() => [onbData.attrezziCasa, onbData.manubriKg])) === '[["panca"],18]', 'passo 4: tocco sulla panca e kg scritti in onbData');
    ok(/8/.test(await p.evaluate(() => document.getElementById('onb-sonno-bene-desc').innerText)), 'passo 4: «Bene» = 8 ore per i 16 anni');
    await p.fill('#onb-age', '40'); await p.waitForTimeout(200);
    ok(/7/.test(await p.evaluate(() => document.getElementById('onb-sonno-bene-desc').innerText)), 'passo 4: poi a 40 anni 7 ore');
    await passo(4, { luogo: 'palestra', age: 40 });
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Kettlebell'))) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.extraPalestra)) === '["kettlebell"]', 'passo 4 (palestra): tocco sul kettlebell');
    const mancanti = await p.evaluate(() => [...(window.__i18nMancanti || [])].filter(s => /palestra|casa|attrezz|manubri|ricomposizione|tonific|minuti|sedute|dormo|Altro/i.test(s)));
    if (lang !== 'it') ok(mancanti.length === 0, 'frasi senza traduzione: ' + JSON.stringify(mancanti.slice(0, 5)));
    ok(errs.length === 0, 'nessun errore di pagina ' + errs.join('|'));
    await ctx.close();
  }
  await b.close();
  console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok'); process.exitCode = problemi ? 1 : 0;
})();
