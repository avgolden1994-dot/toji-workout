/* Statistiche: la pagina si apre su un poligono di frequenza (allenamenti per settimana).
   Controlla grafico, periodi, report del blocco, pagina vuota, inglese e tema chiaro/scuro.
   Gli screenshot vanno in tmpdir. Esce con errore se qualcosa non torna. */
const { chromium } = require('playwright-core');
const os = require('os'), path = require('path'), url = require('url');
let problemi = 0;
const ok = (cond, msg) => { if (!cond) { problemi++; console.log('   MALE:', msg); } };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const pagina = url.pathToFileURL(path.join(__dirname,'..','..','index.html')).href;
const nuova = async (theme, lingua, conDati) => {
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'});
  const p=await ctx.newPage(); p.errs=[]; p.on('pageerror',e=>p.errs.push(e.message));
  await p.addInitScript(([t,l])=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua',l);localStorage.setItem('tz_theme',t);},[theme,lingua]);
  await p.goto(pagina);await p.waitForTimeout(900);
  if (conDati) {
    /* ogni tanto Chromium perde la scrittura se si ricarica subito (succede anche senza queste modifiche): si riprova */
    for (let t=0; t<4; t++) {
      await p.evaluate(()=>{guidaDatiDemo();}); await p.waitForTimeout(250); await p.reload();await p.waitForTimeout(900);
      if (await p.evaluate(()=>loadHistory().length>0)) break;
    }
  }
  await p.evaluate(()=>switchTab('storico'));await p.waitForTimeout(300);
  p.ctx = ctx; return p;
};
/* il disegno: quante settimane (punti) e se la linea parte e finisce sull asse */
const forma = (p) => p.evaluate(()=>{
  const s=document.querySelector('#pg-sheet:not(.hidden) .stg-svg, #stats-sheet:not(.hidden) .stg-svg'); if(!s) return null;
  const pt=s.querySelector('.stg-line').getAttribute('points').trim().split(/\s+/).map(x=>x.split(',').map(Number));
  const base=Number(s.querySelector('.stg-axis').getAttribute('y1'));
  return {settimane:s.querySelectorAll('.stg-pt').length, partenza:pt[0][1]===base, arrivo:pt[pt.length-1][1]===base, nPunti:pt.length,
    area:!!s.querySelector('.stg-area'), kpi:[...s.closest('.stg-vista').parentNode.querySelectorAll('.pg-kpi b')].map(e=>e.innerText), vivo:s.querySelectorAll('.stg-pt.vivo').length};
});

for (const theme of ['dark','light']) {
  const p = await nuova(theme,'it',true);
  await p.click('#pg-tiles .pg-tile:nth-child(2)');await p.waitForTimeout(500);
  console.log(theme,'| pagina Statistiche');
  let f = await forma(p);
  ok(f, 'nella pagina Statistiche manca il grafico');
  if (f) {
    ok(f.settimane===8, 'di partenza 8 settimane, trovate '+f.settimane);
    ok(f.partenza && f.arrivo && f.nPunti===f.settimane+2, 'il poligono deve partire e finire sull asse (classi vuote prima e dopo)');
    ok(f.area, 'manca l area sotto la linea');
    ok(f.vivo===1, 'la settimana in corso deve essere un punto vuoto');
    const tot = await p.evaluate(()=>calcolaStatistiche('8').sessioni);
    ok(Number(f.kpi[0])===tot, 'allenamenti nel grafico ('+f.kpi[0]+') diversi dalla tabella ('+tot+')');
  }
  const ordine = await p.evaluate(()=>[...document.querySelectorAll('#pg-sheet .pg-pane[data-pane="stats"] > .card')].map(c=>c.id||'report'));
  ok(ordine[0]==='pg-stats-grafico', 'il grafico deve stare in cima, trovato: '+ordine.join(','));
  await p.screenshot({path:path.join(os.tmpdir(),`stat_pagina_${theme}.png`)});
  for (const [v,n] of [['4',4],['12',12]]) {
    await p.evaluate(x=>setStatsGrafPeriodo(x),v); await p.waitForTimeout(150);
    f = await forma(p);
    ok(f && f.settimane===n, `periodo ${v}: attese ${n} settimane, trovate ${f&&f.settimane}`);
  }
  await p.evaluate(()=>setStatsGrafPeriodo('tutto')); await p.waitForTimeout(150);
  f = await forma(p); ok(f && f.settimane>=26 && f.partenza && f.arrivo, 'periodo Tutto: almeno 26 settimane e poligono chiuso');
  await p.screenshot({path:path.join(os.tmpdir(),`stat_tutto_${theme}.png`)});
  await p.evaluate(()=>setStatsGrafPeriodo('8'));
  /* dal grafico ai carichi: stesso periodo, grafico in cima e tabella sotto */
  await p.click('#pg-stats-grafico .storico-stats'); await p.waitForTimeout(400);
  f = await forma(p);
  ok(f && f.settimane===8, 'il dettaglio dei carichi apre lo stesso periodo con il grafico in cima');
  ok(await p.$('#stats-body .st-table'), 'nel dettaglio manca la tabella dei carichi');
  await p.screenshot({path:path.join(os.tmpdir(),`stat_dettaglio_${theme}.png`)});
  /* report del primo blocco: 4 settimane, tutte chiuse */
  await p.evaluate(()=>openStats('b0')); await p.waitForTimeout(300);
  f = await forma(p);
  ok(f && f.settimane===4 && f.vivo===0 && f.partenza && f.arrivo, 'blocco 1: 4 settimane chiuse e poligono chiuso, trovato '+JSON.stringify(f));
  ok(f && f.kpi.length===0, 'nel report del blocco il grafico non ripete le tessere (ci sono gia le sue)');
  await p.evaluate(()=>{const bl=blocchiQuattroSettimane(); openStats('b'+(bl.length-1));}); await p.waitForTimeout(300);
  f = await forma(p); ok(f && f.vivo===1, 'blocco in corso: ultima settimana a punto vuoto');
  await p.screenshot({path:path.join(os.tmpdir(),`stat_blocco_${theme}.png`)});
  ok(p.errs.length===0, 'errori di pagina: '+p.errs);
  await p.ctx.close();
}

/* senza allenamenti: niente grafico finto, solo il messaggio */
{
  const p = await nuova('dark','it',false);
  await p.evaluate(()=>apriPagProgressi('stats')); await p.waitForTimeout(300);
  ok(!(await forma(p)), 'senza allenamenti il grafico non deve comparire');
  ok(/Nessun allenamento/.test(await p.$eval('#pg-stats-grafico',e=>e.innerText)), 'senza allenamenti manca il messaggio');
  await p.evaluate(()=>openStats('8')); await p.waitForTimeout(200);
  ok(p.errs.length===0, 'errori di pagina (vuoto): '+p.errs);
  await p.ctx.close();
}

/* inglese: ogni frase nuova ha la sua traduzione */
{
  const p = await nuova('dark','en',true);
  await p.evaluate(()=>{window.__i18nMancanti=new Set();});
  await p.evaluate(()=>apriPagProgressi('stats')); await p.waitForTimeout(500);
  await p.evaluate(()=>openStats('8')); await p.waitForTimeout(500);
  await p.evaluate(()=>setStatsPeriodo('b0')); await p.waitForTimeout(500);
  const manca = await p.evaluate(()=>[...window.__i18nMancanti].filter(x=>/settiman|punto|carich|frequenza|allenament/i.test(x)));
  ok(manca.length===0, 'frasi senza traduzione: '+JSON.stringify(manca));
  await p.evaluate(()=>apriPagProgressi('stats')); await p.waitForTimeout(400);   /* il traduttore lavora subito dopo il disegno */
  const testo = await p.$eval('#pg-stats-grafico',e=>e.innerText);
  ok(/workouts per week/i.test(testo) && /best week/i.test(testo), 'la pagina in inglese non e tradotta: '+testo.slice(0,120));
  await p.screenshot({path:path.join(os.tmpdir(),'stat_pagina_en.png')});
  await p.ctx.close();
}
await b.close();
console.log(problemi? `PROBLEMI: ${problemi}` : 'tutto ok');
process.exit(problemi?1:0);
})();
