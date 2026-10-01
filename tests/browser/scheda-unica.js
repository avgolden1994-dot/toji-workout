/* La scheda unica legge tutte le tabelle senza errori, per ogni esercizio della libreria */
const { chromium } = require('playwright-core');
const ok=(c,m)=>{console.log((c?'  ok: ':'  FALLITO: ')+m); if(!c) process.exitCode=1;};
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const rotte=[]; EXERCISE_LIBRARY.forEach(e=>{ try{ const s=schedaUnica(e.name); if(!s.inLibreria||!s.carico.tipo) rotte.push(e.name); }catch(x){ rotte.push(e.name+': '+x.message); } });
  return { n: EXERCISE_LIBRARY.length, rotte, bucchi: bucchiNelleSchede(), panca: schedaUnica('💪 Panca Piana Bilanciere') };
});
ok(r.n>100&&r.rotte.length===0,'schedaUnica funziona su tutti i '+r.n+' esercizi '+r.rotte.slice(0,3).join('|'));
ok(r.panca.tecnica&&r.panca.gruppo&&r.panca.carico.pausa,'panca piana: libreria, scheda tecnica e regole di carico insieme');
console.log('  Buchi da riempire: '+r.bucchi.length+' esercizi su '+r.n);
const conta={}; r.bucchi.forEach(x=>x.manca.forEach(m=>conta[m]=(conta[m]||0)+1)); console.log('  '+JSON.stringify(conta));
ok(errs.length===0,'nessun errore di pagina '+errs.join('|'));
await b.close();
})();
