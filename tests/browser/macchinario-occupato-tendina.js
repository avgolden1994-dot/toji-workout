/* Macchinario occupato: la tendina si apre dal pulsante e si chiude toccando fuori, con Esc e dopo la scelta */
const { chromium } = require('playwright-core');
const assert=(c,m)=>{ if(!c){console.log('  FALLITO:',m); process.exitCode=1;} else console.log('  ok:',m); };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,locale:'it-IT',serviceWorkers:'block'});
const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{
  if(!localStorage.getItem('tz_mode')){localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');}
  /* quanti listener pointerdown/keydown ha il documento adesso */
  window.__ls={pointerdown:0,keydown:0};
  const add=EventTarget.prototype.addEventListener, rem=EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener=function(t,f,o){ if(this===document&&t in window.__ls){ const k=t+'|'+(typeof o==='object'?!!o.capture:!!o); (this.__k=this.__k||new Map()); if(!this.__k.has(f+k)){this.__k.set(f+k,1);window.__ls[t]++;} } return add.call(this,t,f,o); };
  EventTarget.prototype.removeEventListener=function(t,f,o){ if(this===document&&t in window.__ls){ const k=t+'|'+(typeof o==='object'?!!o.capture:!!o); if(this.__k&&this.__k.has(f+k)){this.__k.delete(f+k);window.__ls[t]--;} } return rem.call(this,t,f,o); };
});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
await p.evaluate(()=>{
  const d=loadData(); const g=DAYS[(new Date().getDay()+6)%7];
  d[g]=[ ['💪 Panca Piana Bilanciere',3,10,60,90], ['🏹 Lat Machine',3,10,50,90], ['🦵 Adductor Machine',3,12,30,60] ].map(([name,sets,reps,weight,rest])=>normalizeExerciseRecord({name,sets,reps,weight,rest}));
  saveData(d); const t=loadTitles(); t[g]='Upper'; saveTitles(t); saveRestDays(DAYS.filter(x=>x!==g)); });
await p.reload(); await p.waitForTimeout(1000);
await p.click('#oggi-body .btn-start-workout'); await p.waitForTimeout(700);
const aperta=()=>p.locator('.busy-panel').count();
const ls=()=>p.evaluate(()=>({...window.__ls}));
const base=await ls();
const delta=async()=>{const x=await ls();return x.pointerdown-base.pointerdown+x.keydown-base.keydown;};

console.log('1) il pulsante apre e chiude la tendina');
const btn=p.locator('.busy-btn[data-busy="0"]');
assert(await btn.getAttribute('aria-expanded')==='false' && await btn.getAttribute('aria-haspopup')==='true','chiusa: aria-expanded=false, aria-haspopup');
assert(await aperta()===0 && await delta()===0,'chiusa: nessun pannello e nessun listener del documento');
await btn.click(); await p.waitForTimeout(350);
assert(await aperta()===1 && await btn.getAttribute('aria-expanded')==='true','si apre: aria-expanded=true');
assert(await delta()===2,'aperta: i listener (pointerdown, keydown) ci sono ('+await delta()+')');
const vis=await p.evaluate(()=>{const pn=document.querySelector('.busy-panel').getBoundingClientRect(),bt=document.querySelector('.busy-btn[data-busy="0"]').getBoundingClientRect();
  return {sotto:Math.abs(pn.top-bt.bottom)<12, dentro:pn.left>=0&&pn.right<=innerWidth, sovrappone:getComputedStyle(document.querySelector('.busy-panel')).position, scrollX:document.documentElement.scrollWidth>innerWidth, role:document.querySelector('.busy-menu').getAttribute('role'), voci:[...document.querySelectorAll('.busy-opt')].every(o=>o.getAttribute('role')==='menuitem')};});
assert(vis.sotto && vis.dentro && vis.sovrappone==='absolute' && !vis.scrollX,'e una tendina sotto il pulsante, dentro lo schermo, senza scroll orizzontale');
assert(vis.role==='menu' && vis.voci,'role=menu e menuitem');
const testa=await p.locator('.busy-head').innerText();
const att=await p.evaluate(()=>muscoloBersaglio(loadData()[currentDay][0].name).nome);
assert(testa.includes(att) && /Stesso muscolo/.test(testa),'intestazione col muscolo esatto: "'+testa.replace(/\s+/g,' ')+'"');
await p.screenshot({path:require('os').tmpdir()+'/tendina-aperta.png'});
await btn.click(); await p.waitForTimeout(250);
assert(await aperta()===0 && await btn.getAttribute('aria-expanded')==='false' && await delta()===0,'secondo tocco sul pulsante: chiusa, listener tolti');

console.log('2) tocco o clic fuori la chiudono (e non si perde il tocco)');
await btn.click(); await p.waitForTimeout(300);
const testaEs=await p.locator('.workout-item-head >> nth=0').boundingBox();
await p.touchscreen.tap(testaEs.x+testaEs.width/2, testaEs.y+testaEs.height/2); await p.waitForTimeout(250);
assert(await aperta()===0 && await btn.getAttribute('aria-expanded')==='false' && await delta()===0,'tocco (touch) fuori: chiusa, listener tolti');
await btn.click(); await p.waitForTimeout(300);
await p.mouse.click(testaEs.x+testaEs.width/2, testaEs.y+testaEs.height/2); await p.waitForTimeout(250);
assert(await aperta()===0 && await delta()===0,'clic (mouse) fuori: chiusa');
await btn.click(); await p.waitForTimeout(300);
await p.mouse.click(5, 400); await p.waitForTimeout(250);
assert(await aperta()===0,'clic sul margine della pagina: chiusa');
await btn.click(); await p.waitForTimeout(300);
const head=await p.locator('.busy-head').boundingBox();
await p.mouse.click(head.x+20, head.y+head.height/2); await p.waitForTimeout(250);
assert(await aperta()===1,'un clic DENTRO la tendina (intestazione) non la chiude');
const tocchiPrima=await p.evaluate(()=>loadData()[currentDay][0].completedSets.filter(s=>s.done).length);
await p.locator('.set-check >> nth=0').click(); await p.waitForTimeout(300);
const tocchiDopo=await p.evaluate(()=>loadData()[currentDay][0].completedSets.filter(s=>s.done).length);
assert(await aperta()===0 && tocchiDopo===tocchiPrima+1,'un clic su un altro pulsante chiude la tendina E il pulsante funziona ('+tocchiPrima+'->'+tocchiDopo+')');

console.log('3) il pulsante di un altro esercizio: chiude la prima e apre la seconda con un solo tocco');
await p.evaluate(()=>{const d=loadData();d[currentDay].forEach(e=>e.completedSets.forEach(s=>s.done=false));saveData(d);renderAllenamento();}); await p.waitForTimeout(300);
await p.evaluate(()=>closeRecoveryPanel&&closeRecoveryPanel()); await p.waitForTimeout(200);
await p.locator('.busy-btn[data-busy="1"]').click(); await p.waitForTimeout(300);
/* la tendina aperta puo coprire l altro pulsante: il tocco si simula come lo fa un dito (pointerdown, poi click sullo stesso elemento) */
const stesso=await p.evaluate(()=>{ const t=document.querySelector('.busy-btn[data-busy="0"]');
  t.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,composed:true,pointerType:'touch'}));
  const intatto=document.querySelector('.busy-btn[data-busy="0"]')===t && document.querySelectorAll('.busy-panel').length===0;   /* chiusa SENZA ridisegnare: il click successivo non si perde */
  t.click(); return intatto; });
await p.waitForTimeout(300);
assert(stesso,'il pointerdown chiude la prima senza sostituire il pulsante toccato');
assert(await p.locator('.busy-btn[data-busy="1"]').getAttribute('aria-expanded')==='false' && await p.locator('.busy-btn[data-busy="0"]').getAttribute('aria-expanded')==='true' && await aperta()===1,'prima chiusa, seconda aperta');
assert(await delta()===2,'sempre e solo un paio di listener ('+await delta()+')');
await p.keyboard.press('Escape'); await p.waitForTimeout(200);
await p.locator('.busy-btn[data-busy="1"]').click(); await p.waitForTimeout(300);

console.log('4) Esc chiude e il fuoco torna al pulsante');
await p.keyboard.press('Escape'); await p.waitForTimeout(250);
assert(await aperta()===0 && await delta()===0,'chiusa con Esc, listener tolti');
assert(await p.evaluate(()=>document.activeElement&&document.activeElement.getAttribute('data-busy')==='1'),'fuoco sul pulsante');

console.log('5) tastiera: Invio apre sulla prima voce, frecce, Tab');
await p.locator('.busy-btn[data-busy="0"]').focus();
await p.keyboard.press('Enter'); await p.waitForTimeout(300);
assert(await aperta()===1 && await p.evaluate(()=>document.activeElement.classList.contains('busy-opt')),'Invio: aperta e fuoco sulla prima voce');
const nome0=await p.evaluate(()=>document.activeElement.querySelector('.busy-opt-name').textContent);
await p.keyboard.press('ArrowDown');
const nome1=await p.evaluate(()=>document.activeElement.querySelector('.busy-opt-name').textContent);
assert(nome1!==nome0,'Freccia giu: voce successiva');
await p.keyboard.press('ArrowUp'); await p.keyboard.press('ArrowUp');
const nomeUltima=await p.evaluate(()=>document.activeElement.querySelector('.busy-opt-name').textContent);
const ultima=await p.evaluate(()=>[...document.querySelectorAll('.busy-opt')].pop().querySelector('.busy-opt-name').textContent);
assert(nomeUltima===ultima,'Freccia su dalla prima: torna all\'ultima');
await p.keyboard.press('Tab'); await p.waitForTimeout(250);
assert(await aperta()===0 && await delta()===0,'Tab chiude la tendina');
await p.locator('.busy-btn[data-busy="0"]').focus();
await p.keyboard.press('ArrowDown'); await p.waitForTimeout(300);
assert(await aperta()===1 && await p.evaluate(()=>document.activeElement.classList.contains('busy-opt')) && await p.evaluate(()=>document.querySelector('.busy-opt')===document.activeElement),'Freccia giu sul pulsante chiuso: apre e va alla prima voce');
await p.keyboard.press('Escape'); await p.waitForTimeout(200);

console.log('6) scegliere una voce sostituisce e chiude');
await p.locator('.busy-btn[data-busy="0"]').click(); await p.waitForTimeout(300);
const prima=await p.evaluate(()=>loadData()[currentDay][0].name);
const nuovoNome=await p.locator('.busy-opt >> nth=0').locator('.busy-opt-name').innerText();
await p.locator('.busy-opt >> nth=0').click(); await p.waitForTimeout(400);
const dopo=await p.evaluate(()=>{const e=loadData()[currentDay][0];return {n:e.name,orig:e.sostituito&&e.sostituito.name,b:bersaglioDi(e.name),b0:bersaglioDi(e.sostituito.name)};});
assert(dopo.orig===prima && dopo.n!==prima && dopo.b===dopo.b0,'esercizio cambiato per lo stesso muscolo: '+nuovoNome);
assert(await aperta()===0 && await delta()===0,'dopo la scelta: tendina chiusa, listener tolti');
assert(await p.locator('.busy-btn[data-busy="0"]').getAttribute('aria-expanded')==='false','pulsante chiuso');
// "Torna a" chiude anch esso
await p.locator('.busy-btn[data-busy="0"]').click(); await p.waitForTimeout(300);
await p.locator('.busy-opt.torna').click(); await p.waitForTimeout(400);
assert(await aperta()===0 && await delta()===0 && await p.evaluate(()=>!loadData()[currentDay][0].sostituito),'"Torna a" chiude e ripristina');

console.log('7) senza alternative: solo il messaggio, nessun pulsante');
if(await p.locator('.busy-btn[data-busy="2"]').count()) console.log('  stato:',await p.evaluate(()=>JSON.stringify({giorno:currentDay,es:loadData()[currentDay].map(e=>e.name+(e.sostituito?' <- '+e.sostituito.name:'')),alt:alternativeOggi(loadData()[currentDay][2],loadData()[currentDay]).map(a=>a.ex.name)})));
assert(await p.locator('.busy-btn[data-busy="2"]').count()===0,'Adductor Machine: nessun pulsante');
const msg=await p.evaluate(()=>[...document.querySelectorAll('.busy-none')].map(x=>x.textContent));
assert(msg.length===1 && /Nessuna alternativa adatta/.test(msg[0]),'messaggio "Nessuna alternativa adatta..." ('+msg.length+')');

console.log('8) la tendina aperta e poi la scheda cambia: nessun listener rimasto');
await p.locator('.busy-btn[data-busy="1"]').click(); await p.waitForTimeout(300);
assert(await delta()===2,'aperta: listener presenti');
await p.evaluate(()=>{ impostaOccupato(null); renderAllenamento(); }); await p.waitForTimeout(100);
assert(await aperta()===0 && await delta()===0,'impostaOccupato(null): listener tolti');
await p.locator('.busy-btn[data-busy="1"]').click(); await p.waitForTimeout(300);
await p.evaluate(()=>{ occupatoAperto={idx:9,nome:'x'}; renderAllenamento(); });   /* stato che non corrisponde piu a nessun pulsante */
await p.mouse.click(5, 400); await p.waitForTimeout(200);
assert(await delta()===0,'stato orfano: al primo tocco fuori i listener si tolgono');
console.log('errori pagina:',errs);
if(errs.length) process.exitCode=1;
await b.close();})();
