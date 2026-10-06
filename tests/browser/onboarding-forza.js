/* Domanda «Che forza?» di INT-2e nel browser vero, in italiano, inglese, spagnolo e tedesco (FRZ-01): compare solo con la forza come primo obiettivo, il powerlifting mostra i requisiti e «Dove ti blocchi?»,
   i tocchi scrivono forzaTipo e puntiDeboli (uno per alzata, al massimo due), «Crea il programma» li salva nel profilo e il programma e il powerlifting; la stessa domanda in Opzioni › Il coach; nessuna frase senza traduzione.
   Modello: tests/browser/onboarding-attrezzi.js (W2-T5). */
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
    const passo = async (n, dati) => { await p.evaluate(([n, d]) => { onbData = Object.assign(nuovoOnbData(), d); onbStep = n; document.getElementById('onb').classList.remove('hidden'); renderOnb(); }, [n, dati]); await p.waitForTimeout(350); return testo(); }
    const T = f => p.evaluate(f => tr(f), f);
    console.log('== ' + lang);
    await passo(0, { goals: ['massa'], goal: 'massa' });
    ok(await p.$('#onb-forza') === null, 'passo 0 con la massa: nessuna domanda sulla forza');
    await passo(0, { goals: ['massa', 'forza'], goal: 'massa' });
    ok(await p.$('#onb-forza') === null, 'passo 0 con la forza come secondo obiettivo: nessuna domanda');
    await passo(0, { goals: ['forza'], goal: 'forza' });
    ok(await p.$('#onb-forza') !== null, 'passo 0 con la forza per prima: la domanda c e');
    ok(await p.$('#onb-forza-requisiti') === null, 'senza risposta: niente requisiti');
    await p.click('button.onb-opt:has-text("Powerlifting")');
    await p.waitForTimeout(300);
    ok(await p.evaluate(() => onbData.forzaTipo) === 'powerlifting', 'il tocco su Powerlifting scrive forzaTipo');
    ok(await p.$('#onb-forza-requisiti') !== null, 'con il powerlifting compaiono i requisiti');
    const req = await p.evaluate(() => document.getElementById('onb-forza-requisiti').innerText);
    ok(/18/.test(req) && /64/.test(req), 'i requisiti dicono 18 e 64 anni: ' + req.slice(0, 60));
    await p.click('button.aw-group:has-text("' + (await T('Panca a metà')) + '")');
    await p.click('button.aw-group:has-text("' + (await T('Squat in buca')) + '")');
    await p.click('button.aw-group:has-text("' + (await T('Stacco da terra')) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.puntiDeboli)) === '["panca-meta","squat-buca"]', 'due punti deboli al massimo');
    await p.click('button.aw-group:has-text("' + (await T('Panca al petto')) + '")');
    ok(JSON.stringify(await p.evaluate(() => onbData.puntiDeboli)) === '["squat-buca","panca-petto"]', 'una per alzata: la panca cambia punto');
    await p.click('button.onb-opt:has-text("' + (await T('Forza generale')) + '")');
    await p.waitForTimeout(300);
    ok(await p.$('#onb-forza-requisiti') === null && !/Dove ti blocchi|Where do you get stuck|¿Dónde te atascas|Wo bleibst du hängen/.test(await testo()), 'con la forza generale niente punti deboli');
    /* crea il programma: profilo e programma */
    await p.evaluate(() => { onbData = Object.assign(nuovoOnbData(), { goals: ['forza'], goal: 'forza', level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sonno: 'bene', attrezzi: 'indifferente', sex: 'uomo', age: 30, parq: 'no', freq: 'auto', fastidi: [], forzaTipo: 'powerlifting', puntiDeboli: ['panca-meta'] }); applyGeneratedProgram(); });
    await p.waitForTimeout(400);
    const salvato = await p.evaluate(() => { const pr = getProfile(); return [pr.forzaTipo, pr.puntiDeboli, getProgramma().modalita]; });
    ok(JSON.stringify(salvato) === '["powerlifting",["panca-meta"],"forza"]', 'il profilo salvato e il programma: ' + JSON.stringify(salvato));
    /* Opzioni › Il coach */
    const opz = await p.evaluate(() => { const d = document.createElement('div'); d.innerHTML = paginaCoach(getProfile()); return d.innerText || d.textContent; });
    ok(/Powerlifting/.test(opz), 'Opzioni › Il coach ha la domanda');
    await p.evaluate(() => { document.body.insertAdjacentHTML('beforeend', '<div id="prova-opz">' + paginaCoach(getProfile()) + '</div>'); });
    const chip = await p.evaluate(t => [...document.querySelectorAll('#prova-opz .fb-chip')].some(c => c.getAttribute('onclick') === "togglePuntoDeboleCoach('stacco-terra')"), null);
    ok(chip, 'Opzioni: i punti deboli sono chip');
    await p.evaluate(() => { document.getElementById('prova-opz').remove(); setForzaTipoCoach('generale'); });
    ok(await p.evaluate(() => { const pr = getProfile(); return pr.forzaTipo === 'generale' && !('puntiDeboli' in pr); }), 'Opzioni: «Forza generale» toglie i punti deboli');
    const mancanti = await p.evaluate(() => [...(window.__i18nMancanti || [])].filter(s => /forza|powerlifting|blocchi|squat|panca|stacco|alzata|Facoltativo/i.test(s)));
    if (lang !== 'it') ok(mancanti.length === 0, 'frasi senza traduzione: ' + JSON.stringify(mancanti.slice(0, 5)));
    ok(errs.length === 0, 'nessun errore di pagina ' + errs.join('|'));
    await ctx.close();
  }
  await b.close();
  console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok'); process.exitCode = problemi ? 1 : 0;
})();
