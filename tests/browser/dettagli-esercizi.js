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
/* W1-T5: esercizi nuovi il cui nome la regex di attrezzoDi (js/coach/programma/motore.js) legge male: la sezione dice la verita (come ATTRIBUTI.attrezzo), attrezzoDi no
   (chiave = esercizio, valore = cosa risponde oggi attrezzoDi). Li corregge W2-T6, quando la scelta degli esercizi leggera gli attributi; se attrezzoDi li legge giusto
   la voce va tolta da qui (la prova lo dice). Stessa lista nella nota di docs/in-arrivo/w1-t5.json */
const ATTREZZO_DI_DA_CORREGGERE = { 'Panca con Pausa': 'corpo', 'Seal Row': 'corpo', 'Leg Curl con Asciugamano': 'macchine', 'Belt Squat': 'corpo', 'Kettlebell Swing': 'corpo', 'Suitcase Carry': 'corpo' };
const r = await p.evaluate((DA_CORREGGERE) => {
  const puliti = EXERCISE_LIBRARY.map(e => e.name.replace(EMOJI_TESTA, ''));
  const senza = [], sezioneStrana = [], subFuori = [], senzaScheda = [], vuoti = [], discordi = [], eccezioniVere = [], eccezioniInutili = [], eccezioniMalScritte = [];
  const SEZ_PER_ATTREZZO = { bilanciere: ['L'], manubri: ['L'], kettlebell: ['L'], macchina: ['M'], cavo: ['M'], corpo: ['C'], elastico: ['L', 'M'], anelli: ['C'] };
  EXERCISE_LIBRARY.forEach(e => {
    const n = e.name.replace(EMOJI_TESTA, ''), d = dettaglioEsercizio(e.name);
    if (!d) { senza.push(n); return; }
    if (['M', 'L', 'C'].indexOf(d.sez) === -1) sezioneStrana.push(n);
    if (SOTTOGRUPPI[e.group].indexOf(d.sub) === -1) subFuori.push(n + ' -> ' + d.sub + ' (' + e.group + ')');
    if (!d.att || !d.focus) vuoti.push(n);
    if (!TECNICA[n] || !TECNICA[n].s || !TECNICA[n].e.length || !TECNICA[n].x.length || !TECNICA[n].c || !TECNICA[n].m) senzaScheda.push(n);
    const a = attrezzoDi(e.name);
    const atteso = d.sez === 'M' ? ['macchine'] : (d.sez === 'C' ? ['corpo'] : ['bilanciere', 'manubri']);
    if (atteso.indexOf(a) === -1) {
      if (DA_CORREGGERE[n] === a) {
        eccezioniVere.push(n);
        /* la sezione e giusta secondo gli attributi (dopo l integrazione di W1-T2 il file e caricato; prima no) */
        if (typeof attributi === 'function' && attributi(e.name) && (SEZ_PER_ATTREZZO[attributi(e.name).attrezzo] || []).indexOf(d.sez) === -1) eccezioniMalScritte.push(n + ': sezione ' + d.sez + ' ma attrezzo ' + attributi(e.name).attrezzo);
      } else discordi.push(n + ': sezione ' + d.sez + ' ma attrezzoDi dice ' + a);
    } else if (DA_CORREGGERE[n]) eccezioniInutili.push(n);
  });
  Object.keys(DA_CORREGGERE).forEach(n => { if (puliti.indexOf(n) === -1) eccezioniInutili.push(n + ' (non e piu in libreria)'); });
  const orfani = Object.keys(DETTAGLI).filter(k => puliti.indexOf(k) === -1);
  const noteMancanti = Object.keys(DETTAGLI).filter(k => DETTAGLI[k][6] && !NOTE_ATTACCO[DETTAGLI[k][6]]);
  const org = organizzaEsercizi(EXERCISE_LIBRARY);
  let conteggio = 0; const visti = {}; let doppi = 0;
  org.forEach(s => s.gruppi.forEach(g => g.sottogruppi.forEach(x => x.items.forEach(e => { conteggio++; if (visti[e.name]) doppi++; visti[e.name] = 1; }))));
  const nomi = puliti.filter((n, i) => puliti.indexOf(n) !== i);
  return { n: EXERCISE_LIBRARY.length, senza, sezioneStrana, subFuori, vuoti, senzaScheda, discordi, orfani, noteMancanti, conteggio, doppi, nomiDoppi: nomi,
    sezioni: org.map(s => s.sez + ':' + s.gruppi.reduce((t, g) => t + g.sottogruppi.reduce((u, x) => u + x.items.length, 0), 0)), eccezioniVere, eccezioniInutili, eccezioniMalScritte };
}, ATTREZZO_DI_DA_CORREGGERE);
ok(r.n >= 173, 'la libreria ha '+r.n+' esercizi');
ok(r.nomiDoppi.length===0, 'nessun nome doppio '+r.nomiDoppi);
ok(r.senza.length===0, 'tutti hanno i dettagli '+r.senza.join(' | '));
ok(r.orfani.length===0, 'nessuna riga dei dettagli senza esercizio '+r.orfani.join(' | '));
ok(r.sezioneStrana.length===0 && r.vuoti.length===0, 'sezione, attrezzo e focus sempre presenti '+r.sezioneStrana.concat(r.vuoti).join(' | '));
ok(r.subFuori.length===0, 'ogni sottogruppo e uno di quelli del suo gruppo '+r.subFuori.join(' | '));
ok(r.senzaScheda.length===0, 'tutti hanno la scheda tecnica completa '+r.senzaScheda.join(' | '));
ok(r.noteMancanti.length===0, 'tutte le note citate esistono '+r.noteMancanti.join(' | '));
ok(r.discordi.length===0, 'la sezione combacia con attrezzoDi: '+r.discordi.join(' || '));
ok(r.eccezioniInutili.length===0, 'nessuna voce di ATTREZZO_DI_DA_CORREGGERE e rimasta senza motivo (attrezzoDi ora li legge giusto: toglierle) '+r.eccezioniInutili.join(' | '));
ok(r.eccezioniMalScritte.length===0, 'dove attrezzoDi sbaglia, la sezione combacia con ATTRIBUTI.attrezzo '+r.eccezioniMalScritte.join(' | '));
console.log('  ('+r.eccezioniVere.length+' esercizi nuovi che attrezzoDi legge male: '+r.eccezioniVere.join(', ')+')');
ok(r.conteggio===r.n && r.doppi===0, 'organizzaEsercizi mette ogni esercizio una volta sola ('+r.conteggio+'/'+r.n+') '+r.sezioni.join(' '));
ok(errs.length===0, 'nessun errore di pagina '+errs);
await b.close();
console.log(problemi ? 'PROBLEMI: '+problemi : 'tutto ok');
process.exit(problemi?1:0);
})();
