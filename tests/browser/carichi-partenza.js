const { chromium } = require('playwright-core');
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','si');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
const R=await p.evaluate(()=>{
  const nomi=['💪 Panca Piana Bilanciere','🦵 Squat con Bilanciere','🏹 Stacco da Terra (Deadlift)','🛡️ Military Press','🏹 Lat Machine','🦵 Leg Press','💪 Chest Press Machine','💪 Panca Inclinata Manubri','🦾 Curl Bilanciere Bicipiti'].map(n=>{const m=EXERCISE_LIBRARY.find(e=>e.name.replace(/^\S+\s/,'')===n.replace(/^\S+\s/,''));return m?m.name:null}).filter(Boolean);
  const casi={
   'A uomo 75 kg, SMM 34 (riferimento), principiante':{d:{sex:'M',age:30,level:'principiante',bia:{peso:75,smm:34,ffm:61.5}}},
   'B donna 60 kg, massa magra 42, principiante':{d:{sex:'F',age:30,level:'principiante',bia:{peso:60,ffm:42,fmPerc:30}}},
   'C uomo 90 kg grasso 25%, intermedio':{d:{sex:'M',age:35,level:'intermedio',bia:{peso:90,fmPerc:25}}},
   'D uomo avanzato, massa magra 72':{d:{sex:'M',age:32,level:'avanzato',bia:{peso:85,ffm:72}}},
   'E uomo 70 anni, PAR-Q positivo, principiante':{d:{sex:'M',age:70,level:'principiante',parq:'si',bia:{peso:78,ffm:60}}},
   'F solo peso 80 kg (niente BIA), intermedio':{d:{sex:'M',age:30,level:'intermedio',weight:80}},
   'G nessun dato':{d:{level:'principiante'}}
  };
  const out={};
  for(const [k,v] of Object.entries(casi)){
    const c=contestoCarichi(v.d,{}); c.storico=null;
    out[k]=nomi.map(n=>{const s=stimaCaricoIniziale(n,c);const m=findExercise(n);return n.replace(/^\S+\s/,'').slice(0,18)+': '+(s?s.peso:'(libreria '+m.weight+')')+(s?' ['+s.fonte+']':'')+' / lib '+m.weight});
  }
  return out;
});
for(const [k,v] of Object.entries(R)){console.log('\n'+k);v.forEach(x=>console.log('   '+x));}
// consenso spento: libreria
const off=await p.evaluate(()=>{localStorage.setItem('tz_consenso','no');const r=pesoPartenza('💪 Panca Piana Bilanciere');localStorage.setItem('tz_consenso','si');return r});
console.log('\nconsenso spento ->',JSON.stringify(off));
console.log('errori:',errs);
await b.close();})();
