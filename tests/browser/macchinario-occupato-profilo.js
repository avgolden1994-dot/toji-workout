const { chromium } = require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{ if(!localStorage.getItem('tz_mode')){localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');} });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);
const run=async(etichetta, cons, prof)=>{
  const r=await p.evaluate(([cons,prof])=>{
    localStorage.setItem('tz_consenso',cons);
    localStorage.setItem(PROFILE_KEY(), JSON.stringify(prof));
    const l=[normalizeExerciseRecord({name:'💪 Panca Piana Bilanciere',sets:3,reps:10,weight:60,rest:90})];
    return alternativeOggi(l[0],l).map(a=>a.ex.name.replace(/^\S+\s/,'')+' ['+attrezzoDi(a.ex.name)+']');
  },[cons,prof]);
  console.log('\n'+etichetta+' ('+r.length+'):\n   '+r.join('\n   '));
  return r;
};
const base=await run('SENZA consenso, profilo ignorato','no',{attrezziPalestra:['manubri'],fastidi:['spalle']});
const r1=await run('CON consenso, palestra con solo manubri','si',{luogo:'palestra',attrezziPalestra:['manubri'],fastidi:[]});
const r2=await run('CON consenso, fastidio alle spalle','si',{luogo:'palestra',attrezziPalestra:null,fastidi:['spalle']});
const r3=await run('CON consenso, a casa solo corpo libero','si',{luogo:'corpo',attrezziPalestra:null,fastidi:[]});
const ok=(c,m)=>console.log((c?'  ok: ':'  FALLITO: ')+m);
console.log('');
ok(base.length>=5 && base.some(x=>/\[macchine\]/.test(x)),'senza consenso il profilo non filtra (ci sono ancora le macchine)');
ok(r1.length>0 && !r1.some(x=>/\[(macchine|bilanciere)\]/.test(x)),'solo manubri: niente macchine né bilanciere');
ok(!r2.some(x=>/Dip alle|Panca Piana Bilanciere/.test(x)) && r2.length>0,'fastidio alle spalle: niente dip');
ok(r3.length>0 && r3.every(x=>/\[corpo\]/.test(x)),'solo corpo libero: solo esercizi a corpo libero ('+r3.length+')');
console.log('errori pagina:',errs);
await b.close();})();
