/* Elenco ordinato degli esercizi: sezioni (macchinari e cavi, pesi liberi, corpo libero), gruppi, sottogruppi,
   attrezzo, presa e focus su ogni riga; scheda dell esercizio con le altre prese; link YouTube della variante. */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const nuova = async (lingua) => {
  const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const p=await ctx.newPage(); p.errs=[]; p.on('pageerror',e=>p.errs.push(e.message)); p.ctx=ctx;
  await p.addInitScript((l)=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua',l);},lingua);
  await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);
  return p;
};

console.log('== scheda del gruppo (Schiena)');
let p = await nuova('it');
await p.evaluate(()=>{ switchTab('piano'); openGroupSheet('schiena'); }); await p.waitForTimeout(300);
let r = await p.evaluate(()=>{
  const sez=[...document.querySelectorAll('#sheet-exercises .es-sez')];
  return { ordine: sez.map(s=>s.dataset.sez), nomi: sez.map(s=>s.querySelector('.es-sez-nome').innerText), aperte: sez.map(s=>s.classList.contains('open')),
    righe: document.querySelectorAll('#sheet-exercises .pick-row').length, conFocus: document.querySelectorAll('#sheet-exercises .pick-row .pick-focus').length, conAtt: document.querySelectorAll('#sheet-exercises .pick-row .pick-att').length,
    totale: EXERCISE_LIBRARY.filter(e=>e.group==='schiena').length };
});
ok(JSON.stringify(r.ordine)==='["M","L","C"]', 'tre sezioni nell ordine macchinari e cavi, pesi liberi, corpo libero: '+r.nomi);
const attese = await p.evaluate(()=>{ const sez=[...document.querySelectorAll('#sheet-exercises .es-sez')]; const conScelti=sez.map(s=>!!s.querySelector('.pick-row.on')); return conScelti.some(Boolean) ? conScelti : sez.map((s,i)=>i===0); });
ok(JSON.stringify(r.aperte)===JSON.stringify(attese), 'all apertura si apre la sezione con gli esercizi gia scelti, o la prima se non ce ne sono '+JSON.stringify(r.aperte));
await p.evaluate(()=>document.querySelectorAll('#sheet-exercises .es-sez-head').forEach(h=>{ if(!h.parentNode.classList.contains('open')) h.click(); })); await p.waitForTimeout(200);
r = await p.evaluate(()=>({ righe: document.querySelectorAll('#sheet-exercises .pick-row').length, conFocus: document.querySelectorAll('#sheet-exercises .pick-row .pick-focus').length, conAtt: document.querySelectorAll('#sheet-exercises .pick-row .pick-att').length,
  totale: EXERCISE_LIBRARY.filter(e=>e.group==='schiena').length, subs: [...document.querySelectorAll('#sheet-exercises .es-sub')].map(x=>x.innerText) }));
ok(r.righe===r.totale, 'ogni esercizio della schiena compare una volta ('+r.righe+'/'+r.totale+')');
ok(r.conFocus===r.righe && r.conAtt===r.righe, 'ogni riga dice attrezzo e focus');
ok(r.subs.some(s=>/larghezza/i.test(s)) && r.subs.some(s=>/Spessore/i.test(s)), 'sottogruppi della schiena: '+r.subs.slice(0,6).join(' | '));
// scegliere un esercizio non richiude le sezioni
const prima = await p.evaluate(()=>[...document.querySelectorAll('#sheet-exercises .es-sez')].map(s=>s.classList.contains('open')));
await p.evaluate(()=>{ document.querySelector('#sheet-exercises .es-sez[data-sez="M"] .pick-row').click(); }); await p.waitForTimeout(300);
const dopo = await p.evaluate(()=>({ aperte:[...document.querySelectorAll('#sheet-exercises .es-sez')].map(s=>s.classList.contains('open')), scelti: document.querySelectorAll('#sheet-exercises .pick-row.on').length, n: (loadData()[currentDay]||[]).length }));
ok(JSON.stringify(dopo.aperte)===JSON.stringify(prima) && dopo.scelti>=1, 'aggiungere un esercizio non cambia le sezioni aperte '+JSON.stringify([prima,dopo]));
ok(errs0(p), 'nessun errore di pagina');
await p.ctx.close();

console.log('== piu gruppi insieme (Aggiungi allenamento)');
p = await nuova('it');
await p.evaluate(()=>{ openAddWeek(); awPath='gruppi'; awStep=1; awGroups=['petto','schiena']; renderAddWeek(); }); await p.waitForTimeout(300);
r = await p.evaluate(()=>({ gruppi:[...document.querySelectorAll('#aw-body .es-gruppo')].map(x=>x.innerText), sez: document.querySelectorAll('#aw-body .es-sez').length }));
ok(r.sez>=2 && r.gruppi.length>=2, 'con due gruppi compaiono i loro titoli dentro le sezioni: '+r.gruppi.slice(0,4));
ok(errs0(p), 'nessun errore di pagina');
await p.ctx.close();

console.log('== scheda dell esercizio e video');
p = await nuova('it');
r = await p.evaluate(()=>{ openExerciseInfo('🏹 Pulley Basso'); const t=document.getElementById('ex-info-body');
  return { blocco: !!t.querySelector('.ex-det'), righe:[...t.querySelectorAll('.ex-det .res-line')].map(x=>x.innerText.replace(/\n/g,' ')), varianti:[...t.querySelectorAll('.ex-var-b')].map(x=>x.innerText), nota: (t.querySelector('.ex-note-att')||{}).innerText||'',
    video: t.querySelector('a.ex-video').href }; });
ok(r.blocco && r.righe.some(x=>/Cavo/.test(x)) && r.righe.some(x=>/Triangolo/.test(x)) && r.righe.some(x=>/Focus/.test(x)), 'Pulley Basso: attrezzo cavo, triangolo e focus: '+r.righe.join(' | '));
ok(r.varianti.length===3 && r.varianti.includes('Pulley Basso Presa Inversa'), 'le altre prese e attacchi: '+r.varianti.join(', '));
ok(/Padovan 2026/.test(r.nota), 'la nota spiega perche la presa conta e cita la fonte');
ok(/youtube\.com\/results/.test(r.video) && /Triangolo/i.test(decodeURIComponent(r.video)) && /Seated/i.test(decodeURIComponent(r.video)), 'il link YouTube contiene nome, attacco e nome inglese: '+decodeURIComponent(r.video).slice(-120));
await p.evaluate(()=>{ [...document.querySelectorAll('.ex-var-b')].find(x=>/Presa Inversa/.test(x.innerText)).click(); });
await p.waitForTimeout(200);
r = await p.evaluate(()=>({ titolo: document.getElementById('ex-info-title').innerText, video: decodeURIComponent(document.querySelector('a.ex-video').href) }));
ok(/presa inversa/i.test(r.titolo) && /supina/i.test(r.video), 'dalla variante si passa a un altra scheda e il video cambia: '+r.titolo);
r = await p.evaluate(()=>{ const d = loadData(); const g = DAYS[0]; d[g]=[normalizeExerciseRecord({name:'🏹 Lat Machine Triangolo (Presa Neutra)',sets:3,reps:12,weight:35,rest:75,completedSets:[]})]; saveData(d); currentDay=g; saveRestDays([]); renderAllenamento();
  const el=document.querySelector('#allenamento-list .workout-item'); return { focus: (el.querySelector('.ex-focus')||{}).innerText, video: (el.querySelector('a.video-btn')||{}).href||'' }; });
ok(/Triangolo/.test(r.focus) && /Focus/.test(r.focus), 'nell allenamento sotto il nome: '+r.focus);
ok(/youtube\.com\/results/.test(r.video), 'nell allenamento c e il pulsante video');
ok(errs0(p), 'nessun errore di pagina');
await p.ctx.close();

console.log('== in spagnolo');
p = await nuova('es');
await p.evaluate(()=>{ switchTab('piano'); openGroupSheet('gambe'); }); await p.waitForTimeout(500);
r = await p.evaluate(()=>({ sez:[...document.querySelectorAll('#sheet-exercises .es-sez-nome')].map(x=>x.innerText), focus:(document.querySelector('#sheet-exercises .pick-focus')||{}).innerText }));
ok(r.sez.some(x=>/Máquinas/i.test(x)) && r.sez.some(x=>/Peso corporal|Pesas libres|libres/i.test(x)) , 'le sezioni sono tradotte: '+r.sez);
ok(/Enfoque/.test(r.focus), 'il focus e tradotto: '+r.focus);
ok(errs0(p), 'nessun errore di pagina');
await p.ctx.close();

await b.close();
console.log(problemi ? 'PROBLEMI: '+problemi : 'tutto ok');
process.exit(problemi?1:0);
function errs0(p){ if (p.errs.length) console.log('   errori:', p.errs); return p.errs.length===0; }
})();
