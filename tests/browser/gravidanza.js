/* Prova in browser della bandiera «Gravidanza o parto recente» (REC-12 parte a, pacchetto P4-S del coach v2 = W4-T2 snello)
   Opzioni › Il coach: l'interruttore c'è per le donne, accende e tiene accesa la modalità prudente (il PAR-Q), mostra il rinvio fisso all'ostetrica o al medico;
   in seduta niente tecniche al cedimento e mai sotto 3 ripetizioni in riserva; spenta torna la risposta di prima al questionario; in inglese, spagnolo e tedesco
   i testi sono tradotti. Nient'altro: la parte b (esercizi da evitare, posizioni, ripresa dopo il parto, pavimento pelvico) è bloccata (registro C.2 n. 4).
   Finché l'integrazione non li applica, i file nuovi (sicurezza/soglie-popolazioni.js, sicurezza/popolazioni.js) e le frasi di docs/in-arrivo/P4-S.json si caricano qui. */
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..');
const ok = (c, m) => { console.log((c ? '  ok: ' : '  FALLITO: ') + m); if (!c) process.exitCode = 1; };
const FILE_P4S = ['js/coach/sicurezza/soglie-popolazioni.js', 'js/coach/sicurezza/popolazioni.js'];
const MANIFESTO = path.join(R, 'docs', 'in-arrivo', 'P4-S.json');
const frasi = fs.existsSync(MANIFESTO) ? JSON.parse(fs.readFileSync(MANIFESTO, 'utf8')).frasi || {} : {};

async function pagina(b, lingua) {
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' })).newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(l => {
    localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'si'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_onboarded', '1'); localStorage.setItem('tz_guida_vista', '1');
    localStorage.setItem('tz_lingua', l); window.__i18nMancanti = new Set();
    if (!localStorage.getItem('coach_plus_profile_toji')) localStorage.setItem('coach_plus_profile_toji', JSON.stringify({ level: 'avanzato', age: 31, sex: 'F', goals: ['massa'], priorita: [], parq: false }));
  }, lingua);
  await p.goto(require('url').pathToFileURL(path.join(R, 'index.html')).href);
  await p.waitForTimeout(800);
  for (const f of FILE_P4S) {
    const manca = await p.evaluate(f => f.indexOf('soglie') !== -1 ? typeof SOGLIE_POPOLAZIONI === 'undefined' : typeof inGravidanza === 'undefined', f);
    if (manca && fs.existsSync(path.join(R, f))) await p.addScriptTag({ path: path.join(R, f) });
  }
  /* le frasi del manifesto (prima dell'integrazione non sono ancora nei dizionari) */
  await p.evaluate(fr => { ['en', 'es', 'de'].forEach(l => { Object.keys(fr).forEach(k => { if (window.I18N[l] && !window.I18N[l][k]) window.I18N[l][k] = fr[k][l]; }); }); }, frasi);
  return { p, errs };
}
const profilo = (p, o) => p.evaluate(o => { localStorage.setItem(PROFILE_KEY(), JSON.stringify(Object.assign({ level: 'avanzato', age: 31, sex: 'F', goals: ['massa'], priorita: [], parq: false }, o))); }, o);
const leggiProfilo = p => p.evaluate(() => getProfile());
const tocca = async (p, testo) => { await p.locator('#set-page-body button.sr-row', { hasText: testo }).first().click(); await p.waitForTimeout(150); };

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });

  console.log('Opzioni › Il coach (italiano)');
  const { p, errs } = await pagina(b, 'it');
  await profilo(p, {});
  /* un programma alla settimana 5 di un blocco da 5 (il tetto delle tecniche dell avanzato; senza `versione`: il calendario non si ferma, CST-01 qui non c entra) e una seduta
     con tre tecniche al cedimento */
  await p.evaluate(() => {
    const l = lunediDi(new Date()), ini = piuGiorni(l, -7 * 4);
    localStorage.setItem(progKey(), JSON.stringify({ inizio: ymd(ini), settimane: 6, blocco: 6, fasi: ['carico', 'carico', 'carico', 'carico', 'carico', 'scarico'], goals: ['massa'] }));
    const mk = (n, t) => ({ name: n, sets: 3, reps: 10, weight: 20, rest: 90, tecnica: t, completedSets: [{ done: false, reps: 10, weight: 20 }] });
    const dati = loadData(); dati[DAYS[0]] = [mk('🦾 Curl ai Cavi', 'drop'), mk('🦵 Calf Raise in Piedi', 'parziali'), mk('🦵 Leg Extension', 'myo')]; saveData(dati);
  });
  const prima = await p.evaluate(() => { const n = limitaTecnicheIntense(DAYS[0]); const t = loadData()[DAYS[0]].map(e => e.tecnicaSeduta || e.tecnica); const d = loadData(); d[DAYS[0]].forEach(e => { delete e.tecnicaSeduta; }); saveData(d); return { n, t, rir: rirBersaglio('🦾 Curl ai Cavi') }; });
  ok(prima.t.filter(t => t !== '-').length >= 1, 'senza la bandiera l avanzata ha la sua tecnica al cedimento (' + prima.t.join(', ') + ')');
  await p.evaluate(() => openSetPage('coach'));
  await p.waitForTimeout(200);
  ok(await p.locator('#set-page-body', { hasText: 'Gravidanza o parto recente' }).count() === 1, 'l interruttore c è per una donna');
  ok(await p.locator('#set-page-body', { hasText: 'ostetrica' }).count() === 0, 'spento: nessun messaggio');
  await tocca(p, 'Gravidanza o parto recente');
  let pr = await leggiProfilo(p);
  ok(pr.gravidanza === true && pr.parq === true, 'acceso: gravidanza e modalità prudente (' + JSON.stringify({ g: pr.gravidanza, parq: pr.parq }) + ')');
  const testo = await p.locator('#set-page-body').innerText();
  ok(/Parlane con l’ostetrica o con il medico: sono loro a dirti come allenarti adesso\./.test(testo) && /Non è un parere medico\./.test(testo), 'il rinvio fisso all ostetrica o al medico');
  ok(!/sicur|garant|protein|calori|kcal|supin|pelvic|evita/i.test(testo.split('Gravidanza o parto recente')[1].split('Sintomi del ciclo')[0]), 'nessuna promessa, nessun numero di nutrizione, nessun consiglio della parte bloccata');
  const dopo = await p.evaluate(() => { const n = limitaTecnicheIntense(DAYS[0]); return { n, t: loadData()[DAYS[0]].map(e => e.tecnicaSeduta || e.tecnica), rir: ['🦾 Curl ai Cavi', '💪 Panca Piana Bilanciere', '🦵 Leg Extension'].map(x => rirBersaglio(x)) }; });
  ok(dopo.t.every(t => t === '-'), 'in seduta niente tecniche al cedimento (' + dopo.t.join(', ') + ')');
  ok(dopo.rir.every(r => r[0] >= 3), 'mai sotto 3 ripetizioni in riserva (' + dopo.rir.map(r => r.join('-')).join(', ') + ')');
  await tocca(p, 'Modalità prudente');
  pr = await leggiProfilo(p);
  ok(pr.parq === true, 'la modalità prudente non si spegne finché c è la gravidanza');
  ok(/togli prima «Gravidanza o parto recente»/.test(await p.evaluate(() => document.body.innerText)), 'e lo dice');
  await tocca(p, 'Gravidanza o parto recente');
  pr = await leggiProfilo(p);
  ok(pr.gravidanza === undefined && pr.parq === false && pr.parqDaGravidanza === undefined, 'spento: torna la risposta di prima al questionario');
  await profilo(p, { sex: 'M' });
  await p.evaluate(() => renderSetPage());
  ok(await p.locator('#set-page-body', { hasText: 'Gravidanza o parto recente' }).count() === 0, 'non si propone a chi ha detto di essere un uomo');
  ok(errs.length === 0, 'nessun errore di pagina ' + errs.join(' | '));

  for (const [l, atteso] of [['en', 'Pregnancy or recent childbirth'], ['es', 'Embarazo o parto reciente'], ['de', 'Schwangerschaft oder kürzliche Geburt']]) {
    console.log('Traduzione: ' + l);
    const t = await pagina(b, l);
    await profilo(t.p, { gravidanza: true, parq: true });
    await t.p.evaluate(() => { openSetPage('coach'); traduciPagina(); });
    await t.p.waitForTimeout(200);
    const tx = await t.p.locator('#set-page-body').innerText();
    ok(tx.indexOf(atteso) !== -1, 'interruttore tradotto: ' + atteso);
    ok(!/ostetrica|Parlane|modalità prudente/.test(tx), 'nessun pezzo in italiano nel rinvio');
    const mancanti = await t.p.evaluate(() => [...(window.__i18nMancanti || [])].filter(s => /gravidanza|ostetrica|prudente/i.test(s)));
    ok(mancanti.length === 0, 'nessuna frase senza traduzione ' + mancanti.join(' | '));
    ok(t.errs.length === 0, 'nessun errore di pagina ' + t.errs.join(' | '));
  }
  await b.close();
})();
