const { chromium } = require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
for (const [lang,theme] of [['it','dark'],['en','dark'],['de','light']]) {
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(([l,t])=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','si');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua',l);localStorage.setItem('tz_theme',t);window.__i18nMancanti=new Set();},[lang,theme]);
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
// onboarding, passo con le prove
await p.evaluate(()=>{onbData=nuovoOnbData();onbStep=4;document.getElementById('onb').classList.remove('hidden');renderOnb();});
await p.waitForTimeout(500);
const t=await p.$('.onb-test'); 
const n=await p.$$eval('.onb-test',e=>e.length);
await p.evaluate(()=>{const e=document.querySelector('.onb-test'); e&&e.scrollIntoView({block:'start'});});
await p.waitForTimeout(300);
await p.screenshot({path:require('os').tmpdir()+`/prove_${lang}.png`});
const mancanti=await p.evaluate(()=>[...(window.__i18nMancanti||[])].filter(s=>/muro|tallone|schiena|squat|coach|punte|gomiti|larghezz|Come si fa|Risultato|A cosa serve|riesco/i.test(s)));
console.log(lang,'| prove in onboarding:',n,'| frasi senza traduzione:',lang==='it'?'(n/a)':mancanti.length, mancanti.slice(0,3));
console.log('   errori:',errs);
await ctx.close();}
await b.close();})();
