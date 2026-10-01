/* Traduzioni: ogni frase dei dettagli, delle schede tecniche, delle note e dei nomi degli esercizi ha la sua voce
   in inglese, spagnolo e tedesco (se manca, la schermata resta in italiano a meta). */
const { chromium } = require('playwright-core');
let problemi = 0;
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
for (const lang of ['en', 'es', 'de']) {
  const p=await (await b.newContext({serviceWorkers:'block'})).newPage();
  await p.addInitScript((l)=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua',l);},lang);
  await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);
  const m = await p.evaluate(() => {
    window.__i18nMancanti = new Set();
    const st = new Set(), agg = x => { if (x && /\p{L}/u.test(x)) st.add(x); };
    EXERCISE_LIBRARY.forEach(e => {
      const n = e.name.replace(EMOJI_TESTA, ''), d = dettaglioEsercizio(e.name), t = TECNICA[n];
      agg(n);
      if (d) [d.att, d.attacco, d.sub, d.focus, d.sec, d.nota].forEach(agg);
      if (t) { agg(t.m); agg(t.s); t.e.forEach(agg); t.x.forEach(agg); agg(t.c); }
    });
    Object.keys(NOTE_ATTACCO).forEach(k => agg(NOTE_ATTACCO[k]));
    SEZIONI_ESERCIZI.forEach(x => agg(x[1]));
    Object.keys(SOTTOGRUPPI).forEach(g => SOTTOGRUPPI[g].forEach(agg));
    ['Focus', 'Dove', 'Attrezzo', 'Presa o attacco', 'Tipo', 'Secondari', 'Altre prese e attacchi', 'Attrezzo e focus', 'multiarticolare', 'isolamento', '# esercizio', '# esercizi'].forEach(agg);
    st.forEach(s => window.tr(s));
    return { n: st.size, mancano: [...window.__i18nMancanti] };
  });
  console.log(`${lang}: ${m.n} frasi controllate, ${m.mancano.length} senza traduzione`);
  if (m.mancano.length) { problemi++; m.mancano.slice(0, 10).forEach(x => console.log('   manca:', x)); }
  await p.context().close();
}
await b.close();
console.log(problemi ? 'PROBLEMI: '+problemi : 'tutto ok');
process.exit(problemi?1:0);
})();
