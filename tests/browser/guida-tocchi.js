/* Guida: si tocca solo dove e illuminato (il cerchio arancione).
   Prova con tocchi e trascinamenti veri il passo del calendario, un passo «tocca qui», uno «Avanti» e quello delle statistiche.
   Esce con errore se qualcosa non torna. */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (cond, msg) => { if (!cond) { problemi++; console.log('   MALE:', msg); } else console.log('   ok  ', msg); };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const errs=[], dialoghi=[];
let ctx, p;
/* ogni scenario parte da una guida nuova, con i dati di prova gia pronti */
const apri = async () => {
  if (ctx) await ctx.close();
  ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(e.message));
  p.on('dialog',d=>{dialoghi.push(d.message().slice(0,50));d.dismiss();});
  await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');localStorage.setItem('tz_dato_vero','ABC');});
  await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
  await p.evaluate(()=>avviaGuida());await p.waitForTimeout(300);
  await p.click('.g-go');await p.waitForTimeout(500);   // passo 0 -> dati di prova
};
const vai = async (n, prima) => { if (prima) await p.evaluate(prima); await p.evaluate(n=>{guidaPasso=n;guidaMostra();},n); await p.waitForTimeout(900); };
const stato = () => p.evaluate(()=>({passo:guidaPasso, tab:currentTab, aperti:[...document.querySelectorAll('.group-sheet:not(.hidden), .wheel-overlay:not(.hidden)')].map(e=>e.id)}));
const centro = (sel) => p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,l:r.left,t:r.top,r:r.right,b:r.bottom};},sel);

console.log('== passo 10: il mese (si trascina, un tocco non fa nulla)');
await apri();
await vai(10, ()=>switchTab('calendario'));
let s = await stato(); ok(s.passo===10,'siamo al passo del mese');
const pol = await p.evaluate(()=>{const c=document.querySelector('#mc-grid .mc-cell'), g=document.querySelector('#mc-grid .mc-grip'), t=document.getElementById('mc-title');
  return {tocco:guidaConsente(c,'click'), giu:guidaConsente(c,'pointerdown'), maniglia:guidaConsente(g,'pointerdown'), titolo:guidaConsente(t,'pointerdown'), fumetto:guidaConsente(document.querySelector('.g-go'),'click')};});
ok(pol.giu && !pol.tocco && !pol.maniglia && !pol.titolo && pol.fumetto, 'regole: cella si trascina ma non si tocca, maniglia e titolo no, fumetto si: '+JSON.stringify(pol));
const celle = await p.evaluate(()=>[...document.querySelectorAll('#mc-grid .mc-cell')].map(c=>{const r=c.getBoundingClientRect();return {k:c.dataset.data,x:r.left+r.width/2,y:r.top+r.height/2,cls:c.className,riga:c.parentNode.dataset.lunedi};}));
const mobili = celle.filter(c=>/(plan|rest)/.test(c.cls)&&!/ done/.test(c.cls));
ok(mobili.length>0,'nel mese di prova c e almeno un giorno trascinabile');
// 1) tocco su un giorno
await p.mouse.click(mobili[0].x, mobili[0].y); await p.waitForTimeout(400);
s = await stato(); ok(s.aperti.length===0 && s.passo===10,'un tocco su un giorno non apre il giorno sopra la guida: '+JSON.stringify(s));
// 2) tocco sulla maniglia della settimana
const grip = await centro('#mc-grid .mc-grip:not(.vuota)');
await p.mouse.click(grip.x, grip.y); await p.waitForTimeout(400);
s = await stato(); ok(s.aperti.length===0 && s.passo===10,'un tocco sulla maniglia non apre il menu della settimana: '+JSON.stringify(s));
// 3) tocco fuori dal cerchio (barra in basso, Opzioni)
await p.mouse.click(350, 815); await p.waitForTimeout(400);
s = await stato(); ok(s.tab==='calendario' && s.passo===10,'un tocco fuori dal cerchio non cambia schermata: '+JSON.stringify(s));
// 4) trascinamento nella stessa settimana: scambia
const calOra = await p.evaluate(()=>loadCal());
const origine = mobili[0];
const dest = celle.find(c=>c.riga===origine.riga && c.k!==origine.k && !(calOra[c.k]&&calOra[c.k].done) && JSON.stringify(calOra[c.k]||null)!==JSON.stringify(calOra[origine.k]||null));
ok(!!dest,'nella stessa settimana c e un giorno diverso con cui scambiare');
const prima = await p.evaluate(([a,b])=>{const c=loadCal();return JSON.stringify([c[a]||null,c[b]||null]);},[origine.k,dest.k]);
await p.mouse.move(origine.x,origine.y); await p.mouse.down(); await p.mouse.move(origine.x+12,origine.y+12,{steps:3}); await p.mouse.move(dest.x,dest.y,{steps:8}); await p.mouse.up(); await p.waitForTimeout(500);
const dopo = await p.evaluate(([a,b])=>{const c=loadCal();return JSON.stringify([c[a]||null,c[b]||null]);},[origine.k,dest.k]);
const [pa,pb]=JSON.parse(prima), [da,db]=JSON.parse(dopo);
ok(prima!==dopo && JSON.stringify(pa)===JSON.stringify(db) && JSON.stringify(pb)===JSON.stringify(da), 'il trascinamento nella stessa settimana scambia i due giorni');
s = await stato(); ok(s.passo===10 && s.aperti.length===0 && dialoghi.length===0,'dopo lo scambio la guida e al suo posto, nessun avviso: '+JSON.stringify(s)+' '+dialoghi);
// 5) trascinamento su un altra settimana: niente avvisi, niente cambi
const altra = celle.find(c=>c.riga!==origine.riga);
const o2 = await p.evaluate(()=>{const c=[...document.querySelectorAll('#mc-grid .mc-cell')].filter(c=>/(plan|rest)/.test(c.className)&&!/ done/.test(c.className))[0];const r=c.getBoundingClientRect();return {k:c.dataset.data,x:r.left+r.width/2,y:r.top+r.height/2};});
const prima2 = await p.evaluate(()=>localStorage.getItem(calKey()));
await p.mouse.move(o2.x,o2.y); await p.mouse.down(); await p.mouse.move(o2.x+12,o2.y+12,{steps:3}); await p.mouse.move(altra.x,altra.y,{steps:8}); await p.mouse.up(); await p.waitForTimeout(400);
ok(await p.evaluate(()=>localStorage.getItem(calKey()))===prima2 && dialoghi.length===0,'su un altra settimana non cambia nulla e non compaiono avvisi: '+dialoghi);
// 6) rilascio fuori dal cerchio
await p.mouse.move(o2.x,o2.y); await p.mouse.down(); await p.mouse.move(o2.x+12,o2.y+12,{steps:3}); await p.mouse.move(200,822,{steps:8}); await p.mouse.up(); await p.waitForTimeout(400);
ok(await p.evaluate(()=>localStorage.getItem(calKey()))===prima2,'rilasciando fuori dal cerchio non cambia nulla');
ok(await p.evaluate(()=>document.querySelectorAll('.swap-from,.swap-to,.swap-no,.swap-fuori').length===0 && document.getElementById('mc-ghost').style.display!=='block'),'nessun giorno resta evidenziato e il fantasma sparisce');
s = await stato(); ok(s.passo===10,'la guida e ancora al passo del mese');
await p.click('.g-go'); await p.waitForTimeout(500);
ok((await stato()).passo===11,'«Avanti» funziona dopo i trascinamenti');

console.log('== passo 1: «Inizia allenamento» (si deve toccare il pulsante)');
await apri();
await vai(1, ()=>switchTab('oggi'));
const bt = await centro('#oggi-body .btn-start-workout');
await p.mouse.click(bt.l-3, bt.y); await p.waitForTimeout(300);          // margine del cerchio, fuori dal pulsante
await p.mouse.click(bt.x, bt.t-4); await p.waitForTimeout(300);
s = await stato(); ok(s.tab==='oggi' && s.passo===1,'un tocco nel margine del cerchio non fa partire nulla: '+JSON.stringify(s));
await p.mouse.click(bt.x, bt.y); await p.waitForTimeout(900);
s = await stato(); ok(s.tab==='allenamento' || s.passo>=2,'il tocco sul pulsante illuminato funziona: '+JSON.stringify(s));
console.log('== il cardio (Avanti, ma si sceglie tipo e minuti)');
await p.evaluate(()=>{guidaPasso=4;guidaMostra();}); await p.waitForTimeout(700);
await p.click('.btn-cardio'); await p.waitForTimeout(900);
const cd = await p.evaluate(()=>{const c=document.querySelector('.cardio-box'), e=c&&c.querySelector('button, input');
  return {passo:guidaPasso, dentro:e?guidaConsente(e,'click'):'nessun elemento', fuori:guidaConsente(document.querySelector('.btn-cardio'),'click')};});
ok(cd.passo===5 && cd.dentro===true && cd.fuori===false,'nel passo del cardio si scelgono tipo e minuti, il resto no: '+JSON.stringify(cd));

console.log('== passo «Il peso» (Avanti: solo da guardare)');
await apri();
await vai(13, ()=>{switchTab('storico');apriPagProgressi('peso');});
const nonTocca = await p.evaluate(()=>{const e=document.querySelector('#pg-peso button, #pg-peso input'); return e?guidaConsente(e,'pointerdown'):'nessun elemento';});
ok(nonTocca===false,'dentro il bersaglio del passo «Avanti» non si tocca nulla: '+nonTocca);
const el = await p.evaluate(()=>{const e=document.querySelector('#pg-peso button'); if(!e) return null; const r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
if (el) { const k0 = await p.evaluate(()=>localStorage.length); await p.mouse.click(el.x,el.y); await p.waitForTimeout(300); s = await stato(); ok(s.passo===13 && dialoghi.length===0 && s.aperti.every(i=>i==='pg-sheet'),'un tocco su un pulsante del peso non fa nulla: '+JSON.stringify(s)); }

console.log('== passo «Le statistiche» (solo i pulsanti del periodo)');
await vai(15, ()=>{switchTab('storico');apriPagProgressi('stats');});
const ch = await p.evaluate(()=>({chip:guidaConsente(document.querySelector('#pg-stats-grafico .st-periodo button'),'click'), carichi:guidaConsente(document.querySelector('#pg-stats-grafico .storico-stats'),'click')}));
ok(ch.chip===true && ch.carichi===false,'i pulsanti del periodo si toccano, «Carichi per esercizio» no: '+JSON.stringify(ch));
const c12 = await p.evaluate(()=>{const e=[...document.querySelectorAll('#pg-stats-grafico .st-periodo button')].find(x=>/12/.test(x.innerText)); const r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};});
await p.mouse.click(c12.x,c12.y); await p.waitForTimeout(400);
ok(await p.evaluate(()=>statsGrafPeriodo)==='12','toccando «12 settimane» il grafico cambia periodo');
const cb = await centro('#pg-stats-grafico .storico-stats');
await p.mouse.click(cb.x,cb.y); await p.waitForTimeout(400);
ok(await p.evaluate(()=>document.getElementById('stats-sheet').classList.contains('hidden')),'toccando «Carichi per esercizio» non si apre il dettaglio sopra la guida');

ok(errs.length===0,'nessun errore di pagina: '+errs);
await ctx.close();
await b.close();
console.log(problemi?`PROBLEMI: ${problemi}`:'tutto ok');
process.exit(problemi?1:0);
})();
