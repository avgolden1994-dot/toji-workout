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
    /* INT-2f (revisione 2e, MAGGIORE 1): i chip della palestra partono accesi e il testo dice di TOGLIERE; il tocco toglie; «Nessuno di questi» e un tocco; a casa «Solo i manubri» */
    const chipOn = async (nome) => p.evaluate(n => [...document.querySelectorAll('#onb-body button.aw-group')].filter(b => b.innerText.trim() === n).map(b => b.classList.contains('on'))[0], nome);
    const tx = await testo();
    ok(tx.includes(await p.evaluate(() => tr('Togli quello che non trovi (facoltativo): sono tutti accesi. Se non tocchi niente, il coach pensa a una palestra completa.'))), 'passo 4 (palestra): il testo dice di togliere quello che non si trova');
    await passo(4, { luogo: 'palestra', age: 40 });
    for (const n of ['Bilanciere', 'Manubri', 'Macchine e cavi', 'Sbarra']) ok(await chipOn(await p.evaluate(x => tr(x), n)) === true, 'passo 4 (palestra): «' + n + '» parte acceso');
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Sbarra'))) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.attrezziPalestra)) === '["bilanciere","manubri","macchine"]', 'passo 4 (palestra): il tocco sulla sbarra la toglie, restano gli altri tre: ' + JSON.stringify(await p.evaluate(() => onbData.attrezziPalestra)));
    /* INT-2g: l ultimo chip acceso non si toglie (un elenco vuoto varrebbe palestra completa e i chip riapparirebbero accesi) e una nota dice cosa fare */
    for (const n of ['Macchine e cavi', 'Manubri']) await p.click('button.aw-group:has-text("' + (await p.evaluate(x => tr(x), n)) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.attrezziPalestra)) === '["bilanciere"]', 'passo 4 (palestra): tolti sbarra, macchine e manubri resta il bilanciere: ' + JSON.stringify(await p.evaluate(() => onbData.attrezziPalestra)));
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Bilanciere'))) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.attrezziPalestra)) === '["bilanciere"]', 'passo 4 (palestra): il tocco sull ultimo attrezzo acceso non lo toglie (niente [])');
    ok(await chipOn(await p.evaluate(() => tr('Bilanciere'))) === true && await chipOn(await p.evaluate(() => tr('Manubri'))) === false, 'passo 4 (palestra): i chip restano come erano, non tornano tutti accesi');
    ok((await testo()).includes(await p.evaluate(() => tr('Ne serve almeno uno acceso. Se in palestra non c’è niente di tutto questo, scegli «Corpo libero» come luogo.'))), 'passo 4 (palestra): la nota dice perche e cosa fare');
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Nessuno di questi'))) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.extraPalestra)) === '[]', 'passo 4 (palestra): «Nessuno di questi» dichiara []');
    ok(await chipOn(await p.evaluate(() => tr('Nessuno di questi'))) === true, 'passo 4 (palestra): e il chip e acceso');
    await passo(4, { luogo: 'manubri', age: 40 });
    await p.click('button.aw-group:has-text("' + (await p.evaluate(() => tr('Solo i manubri'))) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.attrezziCasa)) === '[]', 'passo 4 (casa coi manubri): «Solo i manubri» dichiara []');
    ok((await testo()).includes(await p.evaluate(() => tr('Tocca quello che hai (facoltativo). Pavimento, una sedia robusta e un gradino li do per scontati. Se tocchi qualcosa, scelgo gli esercizi solo con quello (e con i manubri, se ti alleni con quelli); se non rispondi, penso ai manubri e a una panca, ma non a sbarra, elastici, kettlebell e anelli: se la panca non ce l’hai, tocca «Solo i manubri».'))), 'passo 4 (casa coi manubri): il testo dice che senza risposta la panca e contata');
    const mancanti = await p.evaluate(() => [...(window.__i18nMancanti || [])].filter(s => /palestra|casa|attrezz|manubri|ricomposizione|tonific|minuti|sedute|dormo|Altro/i.test(s)));
    if (lang !== 'it') ok(mancanti.length === 0, 'frasi senza traduzione: ' + JSON.stringify(mancanti.slice(0, 5)));
    ok(errs.length === 0, 'nessun errore di pagina ' + errs.join('|'));
    await ctx.close();
  }
  await b.close();
  console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok'); process.exitCode = problemi ? 1 : 0;
})();
