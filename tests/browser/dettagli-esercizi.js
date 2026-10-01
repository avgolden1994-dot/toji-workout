/* Dettagli degli esercizi: ognuno della libreria ha attrezzo, sezione, sottogruppo, focus e scheda tecnica,
   e i dati non si contraddicono (la sezione scelta a mano combacia con l attrezzo che ricava il coach). */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(800);
const r = await p.evaluate(() => {
  const puliti = EXERCISE_LIBRARY.map(e => e.name.replace(EMOJI_TESTA, ''));
  const senza = [], sezioneStrana = [], subFuori = [], senzaScheda = [], vuoti = [], discordi = [];
  EXERCISE_LIBRARY.forEach(e => {
    const n = e.name.replace(EMOJI_TESTA, ''), d = dettaglioEsercizio(e.name);
    if (!d) { senza.push(n); return; }
    if (['M', 'L', 'C'].indexOf(d.sez) === -1) sezioneStrana.push(n);
    if (SOTTOGRUPPI[e.group].indexOf(d.sub) === -1) subFuori.push(n + ' -> ' + d.sub + ' (' + e.group + ')');
    if (!d.att || !d.focus) vuoti.push(n);
    if (!TECNICA[n] || !TECNICA[n].s || !TECNICA[n].e.length || !TECNICA[n].x.length || !TECNICA[n].c || !TECNICA[n].m) senzaScheda.push(n);
    const a = attrezzoDi(e.name);
    const atteso = d.sez === 'M' ? ['macchine'] : (d.sez === 'C' ? ['corpo'] : ['bilanciere', 'manubri']);
    if (atteso.indexOf(a) === -1) discordi.push(n + ': sezione ' + d.sez + ' ma attrezzoDi dice ' + a);
  });
  const orfani = Object.keys(DETTAGLI).filter(k => puliti.indexOf(k) === -1);
  const noteMancanti = Object.keys(DETTAGLI).filter(k => DETTAGLI[k][6] && !NOTE_ATTACCO[DETTAGLI[k][6]]);
  const org = organizzaEsercizi(EXERCISE_LIBRARY);
  let conteggio = 0; const visti = {}; let doppi = 0;
  org.forEach(s => s.gruppi.forEach(g => g.sottogruppi.forEach(x => x.items.forEach(e => { conteggio++; if (visti[e.name]) doppi++; visti[e.name] = 1; }))));
  const nomi = puliti.filter((n, i) => puliti.indexOf(n) !== i);
  return { n: EXERCISE_LIBRARY.length, senza, sezioneStrana, subFuori, vuoti, senzaScheda, discordi, orfani, noteMancanti, conteggio, doppi, nomiDoppi: nomi,
    sezioni: org.map(s => s.sez + ':' + s.gruppi.reduce((t, g) => t + g.sottogruppi.reduce((u, x) => u + x.items.length, 0), 0)) };
});
ok(r.n >= 139, 'la libreria ha '+r.n+' esercizi');
ok(r.nomiDoppi.length===0, 'nessun nome doppio '+r.nomiDoppi);
ok(r.senza.length===0, 'tutti hanno i dettagli '+r.senza.join(' | '));
ok(r.orfani.length===0, 'nessuna riga dei dettagli senza esercizio '+r.orfani.join(' | '));
ok(r.sezioneStrana.length===0 && r.vuoti.length===0, 'sezione, attrezzo e focus sempre presenti '+r.sezioneStrana.concat(r.vuoti).join(' | '));
ok(r.subFuori.length===0, 'ogni sottogruppo e uno di quelli del suo gruppo '+r.subFuori.join(' | '));
ok(r.senzaScheda.length===0, 'tutti hanno la scheda tecnica completa '+r.senzaScheda.join(' | '));
ok(r.noteMancanti.length===0, 'tutte le note citate esistono '+r.noteMancanti.join(' | '));
ok(r.discordi.length===0, 'la sezione combacia con attrezzoDi: '+r.discordi.join(' || '));
ok(r.conteggio===r.n && r.doppi===0, 'organizzaEsercizi mette ogni esercizio una volta sola ('+r.conteggio+'/'+r.n+') '+r.sezioni.join(' '));
ok(errs.length===0, 'nessun errore di pagina '+errs);
await b.close();
console.log(problemi ? 'PROBLEMI: '+problemi : 'tutto ok');
process.exit(problemi?1:0);
})();
