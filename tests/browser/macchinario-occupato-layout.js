const { chromium } = require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
for (const [nome,lang,theme,w] of [['luce360','it','light',360],['tedesco','de','dark',390]]) {
  const ctx=await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:2,serviceWorkers:'block'});
  const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(([lang,theme])=>{ localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua',lang);localStorage.setItem('tz_theme',theme); },[lang,theme]);
  await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);
  await p.evaluate(()=>{const d=loadData(); const g=DAYS[(new Date().getDay()+6)%7];
    d[g]=[['💪 Panca Piana Bilanciere',3,10,60,90],['🏹 Lat Machine',3,10,50,90]].map(([name,sets,reps,weight,rest])=>normalizeExerciseRecord({name,sets,reps,weight,rest}));
    saveData(d); const t=loadTitles(); t[g]='Upper'; saveTitles(t); saveRestDays(DAYS.filter(x=>x!==g));});
  await p.reload(); await p.waitForTimeout(900);
  await p.click('#oggi-body .btn-start-workout'); await p.waitForTimeout(600);
  await p.click('.busy-btn[data-busy="0"]'); await p.waitForTimeout(500);
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  console.log(nome,'scroll orizzontale:',ov,'| errori:',errs);
  await p.screenshot({path:require('os').tmpdir()+'/occ_'+nome+'.png'});
  await ctx.close();
}
await b.close();})();
