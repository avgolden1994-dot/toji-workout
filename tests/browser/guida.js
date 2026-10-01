/* percorre TUTTA la guida con tocchi veri e controlla a ogni passo: riquadro sul bersaglio, bersaglio in vista, fumetto che non lo copre */
const { chromium } = require('playwright-core');
const reduced = process.argv[2] === 'reduced';
const vp = process.argv[3] === 'piccolo' ? {width:360,height:640} : {width:390,height:844};
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:vp,deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:reduced?'reduce':'no-preference'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{ if(!localStorage.getItem('tz_mode')){localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_dato_vero','ABC');} });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
await p.evaluate(()=>avviaGuida());
const azioni={
 0:'.g-go',1:'#oggi-body .btn-start-workout',2:'#allenamento-list .set-check',3:'#recovery-overlay .recovery-close-btn',4:'.btn-cardio',5:'.g-go',
 6:'.nav-btn[data-tab="piano"]',7:'DATAG',8:'.g-go',9:'.nav-btn[data-tab="calendario"]',10:'.g-go',11:'.nav-btn[data-tab="storico"]',
 12:'#pg-tiles .pg-tile:nth-child(1)',13:'.g-go',14:'#pg-tiles .pg-tile:nth-child(2)',15:'.g-go',16:'.nav-btn[data-tab="impostazioni"]',17:'.g-go'};
let problemi=0;
for(let i=0;i<=17;i++){
  await p.waitForFunction(n=>guidaPasso===n||guidaPasso<0,i,{timeout:8000}).catch(()=>{});
  const passoAtt=await p.evaluate(()=>guidaPasso);
  if(passoAtt!==i){console.log(`passo ${i}: la guida e' a ${passoAtt} (attesi ${i})`);problemi++;break;}
  await p.waitForTimeout(1100);   // fine scorrimento/scivolamento
  const v=await p.evaluate(i=>{
    const s=GUIDA[i], el=s.sel?document.querySelector(s.sel):null, hole=document.querySelector('.g-hole').getBoundingClientRect(), bub=document.querySelector('.g-bub').getBoundingClientRect();
    if(!el) return {titolo:s.t,senzaBersaglio:true,bub:[Math.round(bub.top),Math.round(bub.bottom)],H:innerHeight};
    const r=el.getBoundingClientRect(), H=innerHeight;
    const err=Math.max(Math.abs(hole.top-Math.max(0,r.top-6)),Math.abs(hole.left-Math.max(0,r.left-6)));
    const inVista=r.top>=0&&r.bottom<=H&&r.height>0;
    const copre=!(bub.bottom<=r.top||bub.top>=r.bottom);
    return {titolo:s.t,err:Math.round(err),inVista,copre,H,r:[Math.round(r.top),Math.round(r.bottom)],bub:[Math.round(bub.top),Math.round(bub.bottom)],bubDentro:bub.top>=0&&bub.bottom<=H};
  },i);
  const ok = v.senzaBersaglio ? true : (v.err<=2 && v.inVista && !v.copre && v.bubDentro);
  if(!ok) problemi++;
  console.log(`${String(i).padStart(2)} ${ok?'ok ':'MALE'} ${v.titolo.padEnd(22)} ${v.senzaBersaglio?'(senza bersaglio)':`err=${v.err}px inVista=${v.inVista} fumettoCopre=${v.copre} bersaglio=${v.r} fumetto=${v.bub}`}`);
  if(i===17){ await p.click('.g-go'); break; }
  const sel=azioni[i];
  if(sel==='DATAG'){ await p.evaluate(()=>{const e=document.querySelector('#plan-map [data-g]');e.dispatchEvent(new MouseEvent('click',{bubbles:true}));}); }
  else await p.click(sel,{timeout:6000}).catch(e=>{console.log(`   !! tocco su ${sel} non riuscito: ${String(e.message).split('\n')[0]}`);problemi++;});
}
await p.waitForTimeout(1500);
const fin=await p.evaluate(()=>({vero:localStorage.getItem('tz_dato_vero'),backup:localStorage.getItem('tz_guida_backup'),vista:localStorage.getItem('tz_guida_vista'),n:localStorage.length,passo:typeof guidaPasso!=='undefined'?guidaPasso:'?'}));
console.log('fine guida -> dato vero:',fin.vero,'| backup residuo:',fin.backup,'| guida vista:',fin.vista,'| passo:',fin.passo);
console.log('PROBLEMI:',problemi,'| errori pagina:',errs);
await b.close();})();
