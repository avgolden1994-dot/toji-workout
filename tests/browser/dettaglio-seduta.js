/* Dettaglio di una seduta salvata e schermata di fine seduta: openHistoryDetail(i) apre #done-view-sheet
   con titolo, riepilogo e serie; closeDoneView() la richiude (anche dal tasto indietro e dopo openDoneView).
   Esce con errore se qualcosa non torna o se la pagina segnala errori. */
const { chromium } = require('playwright-core');
const path = require('path'), url = require('url');
let problemi = 0;
const ok = (cond, msg) => { if (!cond) { problemi++; console.log('   MALE:', msg); } };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const pagina = url.pathToFileURL(path.join(__dirname,'..','..','index.html')).href;
const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
const p=await ctx.newPage(); p.errs=[];
p.on('pageerror',e=>p.errs.push('pageerror: '+e.message));
p.on('console',m=>{ if (m.type()==='error') p.errs.push('console: '+m.text()); });
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');localStorage.setItem('tz_theme','dark');});
await p.goto(pagina);await p.waitForTimeout(900);

/* stato del foglio: nascosto o no, titolo, riepilogo, corpo */
const foglio = () => p.evaluate(()=>{
  const s=document.getElementById('done-view-sheet');
  return { esiste:!!s, nascosto:s.classList.contains('hidden'), titolo:document.getElementById('dv2-title').textContent,
    sotto:document.getElementById('dv2-sub').textContent, corpo:document.getElementById('dv2-body').textContent,
    righe:document.querySelectorAll('#dv2-body .dv2-set').length };
});

/* le due funzioni devono esistere come nomi globali (window.x) */
const tipi = await p.evaluate(()=>[typeof window.openHistoryDetail, typeof window.closeDoneView, typeof window.openDoneView]);
ok(tipi.join()==='function,function,function', 'openHistoryDetail/closeDoneView/openDoneView non sono funzioni globali: '+tipi);

/* si semina uno storico: una seduta con il dettaglio serie per serie e una vecchia, senza dettaglio */
const ID = 1760000000000;
await p.evaluate((id)=>{
  saveTitles({ 'Lunedì': 'Spinta di prova' });
  saveHistory([
    { id, day:'Lunedì', date:'05/10/2026, 10:00', berserk:true, minuti:50,
      exercises:[{ name:'Panca Piana Bilanciere', weight:60, totalSets:3, doneSets:2, wasBerserk:false }],
      sessione:[{ name:'Panca Piana Bilanciere', rest:90, sets:[
        { weight:60, reps:8, done:true, wasBerserk:false }, { weight:60, reps:8, done:true, wasBerserk:true }, { weight:60, reps:6, done:false, wasBerserk:false } ] }] },
    { id:id-86400000, day:'Martedì', date:'04/10/2026, 10:00', berserk:false,
      exercises:[{ name:'Squat', weight:80, totalSets:4, doneSets:4, wasBerserk:false }] }
  ]);
  const k = ymd(new Date(2026, 9, 5));
  saveCal({ [k]: { done:true, title:'Spinta di prova', day:'Lunedì', doneAt:'05/10/2026, 10:00', summary:'2 di 3 serie', historyId:id } });
}, ID);
const chiaveCal = await p.evaluate(()=>Object.keys(loadCal())[0]);

let f = await foglio();
ok(f.esiste && f.nascosto, 'prima di aprire, #done-view-sheet deve esistere ed essere nascosto');

/* 1. dalla lista dello Storico: tocco sulla riga */
await p.evaluate(()=>switchTab('storico'));await p.waitForTimeout(400);
const righe = await p.evaluate(()=>document.querySelectorAll('.hs-row').length);
ok(righe===2, 'nello Storico servono 2 righe di seduta, trovate '+righe);
await p.evaluate(()=>document.querySelector('.hs-row').click()); await p.waitForTimeout(200);
f = await foglio();
ok(!f.nascosto, 'il tocco su una riga dello Storico deve aprire il dettaglio');
/* la lista e ordinata dalla piu recente: la prima riga e la seduta di oggi; si controlla comunque il contenuto vero della seduta aperta */
ok(/Spinta di prova|Martedì/.test(f.titolo), 'titolo del dettaglio inatteso: '+f.titolo);

/* 2. openHistoryDetail(i) diretto, sulla seduta con il dettaglio (indice 0 dello storico salvato) */
await p.evaluate(()=>closeDoneView()); f = await foglio();
ok(f.nascosto, 'closeDoneView() deve nascondere il foglio');
await p.evaluate(()=>openHistoryDetail(0)); await p.waitForTimeout(150);
f = await foglio();
ok(!f.nascosto, 'openHistoryDetail(0) deve aprire il foglio');
ok(f.titolo==='Spinta di prova', 'titolo atteso "Spinta di prova", trovato "'+f.titolo+'"');
ok(/2 di 3 serie/.test(f.sotto) && /con cedimento/.test(f.sotto), 'riepilogo atteso "2 di 3 serie • con cedimento", trovato "'+f.sotto+'"');
ok(/Completato/.test(f.corpo) && /Panca Piana/.test(f.corpo), 'nel corpo mancano "Completato" o il nome dell esercizio');
ok(/Volume totale\s*960 kg/.test(f.corpo.replace(/\s+/g,' ')) || /960/.test(f.corpo), 'volume totale atteso 960 kg nel corpo: '+f.corpo.replace(/\s+/g,' ').slice(0,200));
ok(f.righe===3, 'attese 3 righe di serie, trovate '+f.righe);
ok(/05\/10\/2026/.test(f.corpo), 'nel corpo manca la data della seduta');

/* 3. tasto indietro (onclick="closeDoneView()" in index.html) */
await p.click('#done-view-sheet .sheet-back'); await p.waitForTimeout(150);
f = await foglio();
ok(f.nascosto, 'il tasto indietro deve nascondere il foglio');

/* 4. seduta vecchia, senza dettaglio: si mostra quello che c e */
await p.evaluate(()=>openHistoryDetail(1)); await p.waitForTimeout(150);
f = await foglio();
ok(!f.nascosto && f.titolo==='Martedì' && /4 di 4 serie/.test(f.sotto), 'seduta vecchia: titolo/riepilogo inattesi: '+f.titolo+' | '+f.sotto);
ok(/Squat/.test(f.corpo) && /salvati solo il carico finale/.test(f.corpo), 'seduta vecchia: manca l esercizio o l avviso');
await p.evaluate(()=>closeDoneView()); f = await foglio(); ok(f.nascosto, 'dopo la seduta vecchia il foglio deve chiudersi');

/* 5. indice inesistente: non succede nulla e nessun errore */
await p.evaluate(()=>openHistoryDetail(99)); await p.waitForTimeout(100);
f = await foglio(); ok(f.nascosto, 'openHistoryDetail con indice inesistente non deve aprire nulla');

/* 6. schermata di fine seduta aperta dal calendario (openDoneView) e chiusa con closeDoneView */
await p.evaluate((k)=>openDoneView(k), chiaveCal); await p.waitForTimeout(150);
f = await foglio();
ok(!f.nascosto && f.titolo==='Spinta di prova' && /Panca Piana/.test(f.corpo), 'openDoneView: foglio non aperto o contenuto inatteso: '+f.titolo);
ok(f.righe===3, 'openDoneView: attese 3 righe di serie, trovate '+f.righe);
await p.click('#done-view-sheet .sheet-back'); await p.waitForTimeout(150);
f = await foglio(); ok(f.nascosto, 'openDoneView: il tasto indietro deve chiudere il foglio');

ok(p.errs.length===0, 'errori di pagina: '+p.errs.join(' || '));
await ctx.close();
await b.close();
console.log(problemi? `PROBLEMI: ${problemi}` : 'tutto ok');
process.exit(problemi?1:0);
})();
