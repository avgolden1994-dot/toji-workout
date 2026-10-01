const { chromium } = require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
for (const theme of ['dark','light']) {
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,serviceWorkers:'block'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript((t)=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');localStorage.setItem('tz_theme',t);},theme);
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
await p.evaluate(()=>{guidaDatiDemo();});
await p.reload();await p.waitForTimeout(900);
await p.evaluate(()=>switchTab('storico'));await p.waitForTimeout(500);
await p.screenshot({path:require('os').tmpdir()+`/stat_tab_${theme}.png`,clip:{x:0,y:0,width:390,height:330}});
// icona pulsante "Statistiche per periodo" nella pagina storico? e pagina statistiche
await p.click('#pg-tiles .pg-tile:nth-child(2)');await p.waitForTimeout(500);
const btn=await p.$('.storico-stats'); if(btn){await btn.scrollIntoViewIfNeeded(); await p.waitForTimeout(300); await btn.screenshot({path:require('os').tmpdir()+`/stat_btn_${theme}.png`});}
await p.evaluate(()=>{closeStats&&0;});
await p.evaluate(()=>openStats()); await p.waitForTimeout(500);
await p.screenshot({path:require('os').tmpdir()+`/stat_page_${theme}.png`,clip:{x:0,y:0,width:390,height:520}});
const kpi=await p.$$eval('#stats-body .pg-kpi',els=>els.map(e=>e.innerText.replace(/\n/g,' ')));
const cols=await p.$eval('#stats-body .st-kpis',e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
console.log(theme,'| KPI nel report:',JSON.stringify(kpi),'| colonne:',cols,'| "kg sollevati" nella pagina:',/kg sollevati/.test(await p.$eval('#stats-body',e=>e.innerText)),'| errori:',errs);
// periodo "8 settimane": sintesi
await p.evaluate(()=>setStatsPeriodo('8')); await p.waitForTimeout(400);
console.log('   periodo 8 sett. -> sintesi contiene "Volume di una seduta":',/Volume di una seduta/.test(await p.$eval('#stats-body',e=>e.innerText)));
await ctx.close();}
await b.close();})();
