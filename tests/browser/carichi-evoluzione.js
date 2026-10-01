const { chromium } = require('playwright-core');
const ok=(c,m)=>{console.log((c?'  ok: ':'  FALLITO: ')+m); if(!c) process.exitCode=1;};
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','si');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);

console.log('1) programma completo con BIA');
const prog=await p.evaluate(()=>{
  const base={goals:['massa'],level:'principiante',days:3,minutes:60,luogo:'palestra',fastidi:[],sonno:'bene',attrezzi:'indifferente',parq:'no',sex:'F',age:30,weight:60,
    bia:{peso:60,ffm:42,fmPerc:30,smm:20}, seme:'prova'};
  const conBia=buildProgram(base);
  const senzaBia=buildProgram(Object.assign({},base,{bia:null}));
  const nessuno=buildProgram(Object.assign({},base,{bia:null,weight:null,sex:null}));
  const pw=(pr)=>pr.sedute[0].esercizi.slice(0,4).map(e=>e.name.replace(/^\S+\s/,'').slice(0,16)+' '+e.weight+(e.stimato?'*':''));
  return {conBia:pw(conBia),conBiaNote:conBia.note.filter(n=>/partenza/.test(n)),senzaBia:pw(senzaBia),senzaBiaNote:senzaBia.note.filter(n=>/partenza/.test(n)),nessuno:pw(nessuno),nessunoNote:nessuno.note.filter(n=>/partenza/.test(n)),tuttiStimati:conBia.sedute.every(s=>s.esercizi.every(e=>e.stimato||!e.weight))};
});
console.log('   con BIA (donna 60 kg, massa magra 42):',prog.conBia.join(' | '));console.log('   nota:',prog.conBiaNote[0]);
console.log('   solo peso:',prog.senzaBia.join(' | '));console.log('   nota:',prog.senzaBiaNote[0]);
console.log('   nessun dato:',prog.nessuno.join(' | '),'| note di partenza:',prog.nessunoNote.length);
ok(prog.tuttiStimati,'tutti gli esercizi con carico sono stimati (segnati *)');
ok(prog.nessunoNote.length===0,'senza dati nessuna nota e carichi della libreria');

console.log('\n2) evoluzione: calibrazione nelle prime sedute');
const ev=await p.evaluate(()=>{
  const nome='💪 Panca Piana Bilanciere';
  const sess=(sets)=>({id:Date.now()+Math.random(),day:'Lunedì',date:formatNow(),minuti:50,sessione:[{name:nome,rest:120,sets}],exercises:[{name:nome,weight:sets[0].weight,totalSets:sets.length,doneSets:sets.filter(s=>s.done).length}]});
  const S=(w,reps,done,rpe)=>({weight:w,reps,done,rpe});
  const out={};
  // a) nessuna storia: carico del programma
  saveHistory([]); out.prima=caricoProssimo(nome,30,8,4);
  // b) prima seduta tutta fatta e MOLTO facile (RPE 5): salto grande
  saveHistory([sess([S(30,8,true,5),S(30,8,true,5),S(30,8,true,5),S(30,8,true,5)])]);
  out.facile1=caricoProssimo(nome,30,8,4);
  // c) stessa cosa ma dopo 3 sedute: salto normale
  const f=sess([S(30,8,true,5),S(30,8,true,5),S(30,8,true,5),S(30,8,true,5)]);
  saveHistory([f,f,f]); out.facile3=caricoProssimo(nome,30,8,4);
  // d) prima seduta molto sotto il previsto (2 serie su 4, 5 rip): -5%
  saveHistory([sess([S(40,5,true,10),S(40,5,true,10),S(40,0,false),S(40,0,false)])]);
  out.troppo=caricoProssimo(nome,40,8,4);
  // e) un piccolo errore (3 serie su 4 complete, 7 rip): niente -5%
  saveHistory([sess([S(40,8,true,9),S(40,8,true,9),S(40,8,true,9),S(40,6,false,10)])]);
  out.piccolo=caricoProssimo(nome,40,8,4);
  // f) stessa cosa "troppo" ma alla quarta seduta: niente correzione rapida
  const m=sess([S(40,5,true,10),S(40,5,true,10),S(40,0,false),S(40,0,false)]);
  saveHistory([m,sess([S(40,8,true,8),S(40,8,true,8),S(40,8,true,8),S(40,8,true,8)]),sess([S(40,8,true,8),S(40,8,true,8),S(40,8,true,8),S(40,8,true,8)]),sess([S(40,8,true,8),S(40,8,true,8),S(40,8,true,8),S(40,8,true,8)])]);
  out.troppoDopo=caricoProssimo(nome,40,8,4);
  saveHistory([]);
  return out;
});
const r=(x)=>x.weight+' kg, '+x.tipo+' — '+x.motivo.slice(0,95);
console.log('   a) mai fatto:',r(ev.prima));
console.log('   b) 1 seduta, RPE 5:',r(ev.facile1));
console.log('   c) dopo 3 sedute, RPE 5:',r(ev.facile3));
console.log('   d) 1 seduta molto sotto:',r(ev.troppo));
console.log('   e) 1 seduta quasi completa:',r(ev.piccolo));
console.log('   f) caso d) ma alla 4a seduta:',r(ev.troppoDopo));
ok(ev.facile1.weight>ev.facile3.weight,'prime sedute: salto piu grande se le serie sono molto facili ('+ev.facile1.weight+' contro '+ev.facile3.weight+' kg)');
ok(ev.troppo.tipo==='giu' && Math.abs(ev.troppo.weight-38)<0.6,'prime sedute, serie molto sotto: -5% subito ('+ev.troppo.weight+' kg)');
ok(ev.piccolo.weight===40 && ev.piccolo.tipo!=='giu','un piccolo errore non abbassa il carico');
ok(ev.troppoDopo.tipo!=='giu' || !/Prime sedute/.test(ev.troppoDopo.motivo),'dopo le prime sedute la correzione rapida non scatta');

console.log('\n3) la stima passa dalla BIA allo storico');
const st=await p.evaluate(()=>{
  const ctx=contestoCarichi({sex:'M',age:30,level:'principiante',bia:{peso:75,smm:34}},{});
  const nomeT='💪 Chest Press Machine';
  const mk=(nome,w,reps)=>({id:Date.now()+Math.random(),day:'Lunedì',date:formatNow(),minuti:50,sessione:[{name:nome,rest:90,sets:[1,2,3].map(()=>({weight:w,reps,done:true,rpe:8}))}],exercises:[{name:nome,weight:w,totalSets:3,doneSets:3}]});
  const corpo=stimaCaricoIniziale(nomeT,Object.assign({},ctx,{storico:undefined}));
  // l'utente solleva molto piu della stima sul pettorale e su altri esercizi
  saveHistory([mk('💪 Panca Piana Bilanciere',60,8),mk('🏹 Lat Machine',55,10),mk('🛡️ Military Press',37.5,8),mk('🦵 Leg Press',120,10)]);
  const dopo=stimaCaricoIniziale(nomeT,Object.assign({},ctx,{storico:undefined}));
  const sto=scalaDaStorico();
  saveHistory([]);
  return {corpo,dopo,sto};
});
console.log('   senza storico:',st.corpo.peso,'kg ['+st.corpo.fonte+'] | con 4 esercizi in storico:',st.dopo.peso,'kg ['+st.dopo.fonte+'], scala personale',Math.round(st.sto.k*100)/100,'su',st.sto.n,'esercizi');
ok(st.dopo.peso>st.corpo.peso && st.dopo.fonte==='storico','dopo le sedute la stima sale e si basa sullo storico');

console.log('\n4) i nuovi esercizi usano la stima (macchinario occupato)');
const sw=await p.evaluate(()=>{
  const d=loadData(); const g=DAYS[0];
  d[g]=[normalizeExerciseRecord({name:'💪 Panca Piana Bilanciere',sets:3,reps:10,weight:30,rest:90})]; saveData(d); currentDay=g;
  localStorage.setItem('coach_plus_profile_toji',JSON.stringify({level:'principiante',sex:'F',age:30,weight:60,goals:['massa']}));
  occupatoOpzioni=['💪 Chest Press Machine']; sostituisciOggi(0,0);
  const e=loadData()[g][0]; return {name:e.name,weight:e.weight,stimato:e.stimato,nota:e.coachNote,lib:findExercise(e.name).weight};
});
console.log('   ',sw.name,sw.weight,'kg (libreria',sw.lib+') | stimato:',sw.stimato,'|',sw.nota);
ok(sw.stimato && sw.weight<sw.lib,'lo scambio usa il carico stimato, non quello generico');
console.log('\nerrori pagina:',errs);
await b.close();})();
