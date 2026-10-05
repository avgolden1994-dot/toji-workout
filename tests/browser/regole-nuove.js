/* Prove delle cinque regole nuove (RIC-01..05) e dei parametri del coach */
const { chromium } = require('playwright-core');
const ok=(c,m)=>{console.log((c?'  ok: ':'  FALLITO: ')+m); if(!c) process.exitCode=1;};
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','si');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);

const r=await p.evaluate(()=>{
  const out={}; const nome='💪 Panca Piana Bilanciere';
  const S=(w,reps,done,rpe)=>({weight:w,reps,done,rpe});
  const sess=(sets,giorniFa,pront)=>({id:Date.now()-giorniFa*86400000,day:'Lunedì',date:formatNow(),minuti:50,prontezza:pront,sessione:[{name:nome,rest:120,sets}],exercises:[]});
  const profilo=(o)=>localStorage.setItem(PROFILE_KEY(),JSON.stringify(Object.assign({level:'intermedio',age:30,goals:['massa'],priorita:['petto']},o)));
  const programma=(sett,fasi)=>{const l=lunediDi(new Date()); const ini=piuGiorni(l,-7*(sett-1)); localStorage.setItem(progKey(),JSON.stringify({inizio:ymd(ini),settimane:fasi.length,fasi}));};
  const ok4=()=>[S(60,8,true,8),S(60,8,true,8),S(60,8,true,8),S(60,8,true,8)];
  // RIC-01
  profilo(); programma(2,['carico','carico','carico','scarico']); saveHistory([sess(ok4(),3,80)]);
  out.r1=caricoProssimo(nome,60,8,3);
  programma(1,['carico','carico','carico','scarico']); out.r1prima=caricoProssimo(nome,60,8,3).sets;
  programma(3,['carico','carico','carico','scarico']); out.r1ultima=caricoProssimo(nome,60,8,3).sets;
  programma(2,['carico','carico','carico','scarico']); profilo({priorita:['gambe']}); out.r1nonPrior=caricoProssimo(nome,60,8,3).sets;
  profilo({level:'principiante'}); out.r1princ=caricoProssimo(nome,60,8,3).sets;
  profilo(); saveHistory([sess(ok4(),3,30)]); out.r1stanco=caricoProssimo(nome,60,8,3).sets;
  localStorage.setItem(REGOLE_SPENTE_KEY,JSON.stringify(['RIC-01'])); saveHistory([sess(ok4(),3,80)]); out.r1spenta=caricoProssimo(nome,60,8,3).sets; localStorage.removeItem(REGOLE_SPENTE_KEY);
  // RIC-02
  localStorage.removeItem(progKey()); profilo({priorita:[]});
  saveHistory([sess([S(60,8,true,8),S(60,8,true,8),S(60,8,true,8),S(60,5,false,10)],3)]); out.r2=caricoProssimo(nome,60,8,4);
  saveHistory([sess([S(60,8,true,8),S(60,6,false,10),S(60,6,false,10),S(60,5,false,10)],3)]); out.r2no=caricoProssimo(nome,60,8,4);
  // RIC-05
  saveHistory([sess(ok4(),20,80)]); out.r5=caricoProssimo(nome,60,8,4);
  saveHistory([sess(ok4(),5,80)]); out.r5no=caricoProssimo(nome,60,8,4);
  profilo({age:70}); saveHistory([sess(ok4(),8,80)]); out.r5eta=caricoProssimo(nome,60,8,4); saveHistory([sess(ok4(),15,80)]); out.r5eta15=caricoProssimo(nome,60,8,4);
  profilo({priorita:[]});
  // RIC-04
  const mk=(n,t)=>({name:n,sets:3,reps:8,weight:20,rest:90,tecnica:t,completedSets:[{done:false,reps:8,weight:20}]});
  const dati=loadData(); const g=DAYS[0]; dati[g]=[mk('A','drop'),mk('B','amrap'),mk('C','parziali'),mk('D','backoff')]; saveData(dati);
  out.r4n=limitaTecnicheIntense(g); out.r4=loadData()[g].map(e=>e.tecnicaSeduta||'');
  const d2=loadData(); d2[g].forEach(e=>{e.tecnicaSeduta='';}); saveData(d2);
  programma(4,['carico','carico','carico','scarico']); out.r4s=limitaTecnicheIntense(g);
  // RIC-03
  out.r3=['💪 Croci su Panca Manubri','🍑 Stacco Rumeno','💪 Pullover con Manubrio','💪 Panca Piana Bilanciere','💪 Croci ai Cavi'].map(n=>inAllungamento(n));
  // catalogo
  out.cat=regolaDescritta('RIC-01')&&regolaDescritta('RIC-05')&&COACH_REGOLE.length;
  return out;
});
console.log('RIC-01'); ok(r.r1.sets===4&&/\+1 serie/.test(r.r1.motivo),'settimana centrale + prioritario + prontezza buona: +1 serie');
ok(r.r1prima===3&&r.r1ultima===3,'prima e ultima settimana del blocco: nessuna serie in piu');
ok(r.r1nonPrior===3,'muscolo non prioritario: niente'); ok(r.r1princ===3,'principiante: niente'); ok(r.r1stanco===3,'prontezza bassa: niente'); ok(r.r1spenta===3,'regola spenta: niente');
console.log('RIC-02'); ok(r.r2.piuPausa===45,'mancava solo l ultima serie: +45 s'); ok(!r.r2no.piuPausa,'piu serie mancate: nessuna pausa extra');
console.log('RIC-05'); ok(r.r5.sets===3&&/rientro dopo 20/.test(r.r5.motivo),'dopo 20 giorni: 4 serie -> 3'); ok(r.r5no.sets===4,'dopo 5 giorni: invariato'); ok(r.r5eta.sets===4&&!/rientro dopo/.test(r.r5eta.motivo),'a 70 anni i giorni sono quelli veri: dopo 8 giorni le serie non cambiano (deroga B20, 2026-10-05)'); ok(r.r5eta15.sets===3&&/rientro dopo 15/.test(r.r5eta15.motivo),'a 70 anni dopo 15 giorni: 4 serie -> 3');
console.log('RIC-04'); ok(r.r4n===2&&JSON.stringify(r.r4)===JSON.stringify(['','-','-','']),'tre tecniche intense: resta la prima, le altre tolte (il backoff non conta)');
ok(r.r4s===3,'in settimana di scarico: tutte le intense tolte');
console.log('RIC-03'); ok(r.r3.join()==='false,true,true,false,false','stacco rumeno e pullover coi manubri contano come allungamento, le croci (su panca e ai cavi) alla pari e senza il bonus (D-P8, W0-T6)');
console.log('Catalogo'); ok(r.cat>100,'catalogo con '+r.cat+' regole, RIC incluse');
ok(errs.length===0,'nessun errore di pagina '+errs.join('|'));
await b.close();
})();
