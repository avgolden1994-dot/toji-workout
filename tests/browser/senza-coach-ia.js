/* Senza Coach IA (rimosso il 2026-10-05): l'app si avvia con le chiavi orfane del vecchio Coach IA gia sul telefono.
   - zero errori di pagina e di console, nessuna richiesta di rete verso *.workers.dev;
   - le chiavi orfane (tz_consenso_ia, tz_consenso_ia_data, tz_device_ia, tz_ia_uso) sono sparite, il consenso generale e il resto no;
   - i nomi del Coach IA non esistono piu (coachIAAttivo, commentaSeduta, htmlCommentoIA, setCoachIA, htmlPrivacyIA);
     openHistoryDetail e closeDoneView (spostate in js/ui/sessione-completata.js) sono funzioni;
   - la pagina Privacy e la pagina Il coach delle impostazioni si aprono senza errori e senza parlare di Coach IA;
   - una seduta salvata con commentoIA si apre nel dettaglio: il commento NON e mostrato (nessun #ia-box) e la chiusura funziona.
   Esce con errore se qualcosa non torna. */
const { chromium } = require('playwright-core');
const path = require('path'), url = require('url');
let problemi = 0;
const ok = (cond, msg) => { if (!cond) { problemi++; console.log('   MALE:', msg); } else console.log('   ok:', msg); };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const pagina = url.pathToFileURL(path.join(__dirname,'..','..','index.html')).href;
const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
const p=await ctx.newPage(); p.errs=[]; const richieste=[];
p.on('pageerror',e=>p.errs.push('pageerror: '+e.message));
p.on('console',m=>{ if (m.type()==='error') p.errs.push('console: '+m.text()); });
p.on('request',r=>richieste.push(r.url()));
/* il telefono di chi usava il Coach IA: le chiavi orfane sono gia li PRIMA che l'app si avvii; il consenso generale e dato */
await p.addInitScript(()=>{
  localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','si');localStorage.setItem('tz_consenso_data','01/09/2026, 10:00');
  localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');localStorage.setItem('tz_theme','dark');
  localStorage.setItem('tz_consenso_ia','si');localStorage.setItem('tz_consenso_ia_data','01/09/2026, 10:05');
  localStorage.setItem('tz_device_ia','vecchio-codice-dispositivo');localStorage.setItem('tz_ia_uso','{"usati":3,"limite":20,"mese":"2026-09"}');
});
await p.goto(pagina);await p.waitForTimeout(900);

console.log('1) avvio con le chiavi orfane gia sul telefono');
const st = await p.evaluate(()=>({
  orfane:['tz_consenso_ia','tz_consenso_ia_data','tz_device_ia','tz_ia_uso'].map(k=>localStorage.getItem(k)),
  consenso:localStorage.getItem('tz_consenso'), data:localStorage.getItem('tz_consenso_data'), onb:localStorage.getItem('tz_onb'),
  attivo:coachAttivo(),
  nomi:['coachIAAttivo','commentaSeduta','htmlCommentoIA','setCoachIA','htmlPrivacyIA'].map(n=>typeof window[n]+'/'+eval('typeof '+n)),
  funzioni:[typeof openHistoryDetail, typeof closeDoneView]
}));
ok(st.orfane.every(v=>v===null), 'le quattro chiavi orfane sono sparite: '+JSON.stringify(st.orfane));
ok(st.consenso==='si' && st.data==='01/09/2026, 10:00' && st.onb==='1' && st.attivo===true, 'il consenso generale (e il resto) e rimasto intatto');
ok(st.nomi.every(v=>v==='undefined/undefined'), 'i nomi del Coach IA non esistono piu: '+st.nomi.join(' '));
ok(st.funzioni.join()==='function,function', 'openHistoryDetail e closeDoneView sono funzioni: '+st.funzioni);
const esterne = richieste.filter(u=>!/^(file|data|blob|about):/.test(u));
ok(!richieste.some(u=>/workers\.dev/.test(u)), 'nessuna richiesta verso *.workers.dev ('+richieste.length+' richieste in tutto)');
console.log('   richieste esterne all avvio:', esterne.length ? esterne.join(' ') : 'nessuna');
ok(esterne.length===0, 'all avvio nessuna richiesta di rete esterna');

console.log('2) impostazioni: Privacy e Il coach');
await p.evaluate(()=>switchTab('impostazioni')); await p.waitForTimeout(250);
const imp = await p.evaluate(()=>document.getElementById('tab-impostazioni').textContent);
ok(!/Coach IA/i.test(imp), 'nelle impostazioni non c e piu la riga "Coach IA"');
await p.evaluate(()=>openSetPage('privacy')); await p.waitForTimeout(200);
let pg = await p.evaluate(()=>({ nascosta:document.getElementById('set-page').classList.contains('hidden'), titolo:document.getElementById('set-page-title').textContent, corpo:document.getElementById('set-page-body').textContent }));
ok(!pg.nascosta && pg.titolo==='Consenso ai dati' && /Consenso dato/.test(pg.corpo), 'la pagina Privacy si apre e mostra il consenso generale: '+pg.corpo.replace(/\s+/g,' ').slice(0,80));
ok(!/Coach IA|\bIA\b|intelligenza artificiale|server|Worker/i.test(pg.corpo), 'la pagina Privacy non parla piu di Coach IA o di server');
await p.evaluate(()=>closeSetPage());
await p.evaluate(()=>openSetPage('coach')); await p.waitForTimeout(250);
pg = await p.evaluate(()=>({ nascosta:document.getElementById('set-page').classList.contains('hidden'), titolo:document.getElementById('set-page-title').textContent, corpo:document.getElementById('set-page-body').textContent }));
ok(!pg.nascosta && pg.titolo==='Il coach' && pg.corpo.length>50, 'la pagina Il coach si apre: '+pg.titolo);
ok(!/Coach IA/i.test(pg.corpo), 'la pagina Il coach non nomina il Coach IA');
await p.evaluate(()=>closeSetPage());
await p.evaluate(()=>{ switchTab('oggi'); });await p.waitForTimeout(150);

console.log('3) seduta salvata con commentoIA: il dettaglio non lo mostra');
const TESTO = 'Commento-IA-vecchio-da-non-mostrare';
await p.evaluate((t)=>{
  saveTitles({ 'Lunedì': 'Spinta di prova' });
  saveHistory([{ id:1760000000000, day:'Lunedì', date:'05/10/2026, 10:00', berserk:false, minuti:50,
    commentoIA:{ testo:t, data:'05/10/2026, 11:00' },
    exercises:[{ name:'Panca Piana Bilanciere', weight:60, totalSets:3, doneSets:3, wasBerserk:false }],
    sessione:[{ name:'Panca Piana Bilanciere', rest:90, sets:[{ weight:60, reps:8, done:true, wasBerserk:false },{ weight:60, reps:8, done:true, wasBerserk:false },{ weight:60, reps:8, done:true, wasBerserk:false }] }] }]);
}, TESTO);
const salvato = await p.evaluate(()=>loadHistory()[0].commentoIA);
ok(salvato && salvato.testo===TESTO, 'il commentoIA resta nei dati (loadHistory): non e stato cancellato');
await p.evaluate(()=>openHistoryDetail(0)); await p.waitForTimeout(200);
const f = await p.evaluate(()=>{ const s=document.getElementById('done-view-sheet'); return { nascosto:s.classList.contains('hidden'), titolo:document.getElementById('dv2-title').textContent,
  corpo:s.innerText, html:s.innerHTML, iabox:!!document.getElementById('ia-box'), righe:document.querySelectorAll('#dv2-body .dv2-set').length }; });
ok(!f.nascosto && f.titolo==='Spinta di prova' && f.righe===3, 'il dettaglio della seduta si apre: '+f.titolo+', '+f.righe+' serie');
ok(!f.iabox, 'non c e #ia-box');
ok(f.corpo.indexOf(TESTO)===-1 && f.html.indexOf(TESTO)===-1, 'il testo del commento non e mostrato');
await p.evaluate(()=>closeDoneView()); await p.waitForTimeout(150);
ok(await p.evaluate(()=>document.getElementById('done-view-sheet').classList.contains('hidden')), 'closeDoneView() chiude il dettaglio');
/* il commento resta anche dopo aver aperto e chiuso il dettaglio e dopo un backup */
const dopo = await p.evaluate(()=>{ const foto=fotografia(); return { storico:loadHistory()[0].commentoIA, nelBackup:/Commento-IA-vecchio/.test(foto[historyKey()]||'') }; });
ok(dopo.storico && dopo.storico.testo===TESTO && dopo.nelBackup, 'il commento resta nello storico e finisce nel backup');

console.log('4) richieste e errori');
ok(!richieste.some(u=>/workers\.dev/.test(u)), 'nessuna richiesta verso *.workers.dev in tutta la prova ('+richieste.length+' richieste)');
ok(p.errs.length===0, 'zero errori di pagina e di console: '+p.errs.join(' || '));
await ctx.close();
await b.close();
console.log(problemi? `PROBLEMI: ${problemi}` : 'tutto ok');
process.exit(problemi?1:0);
})();
