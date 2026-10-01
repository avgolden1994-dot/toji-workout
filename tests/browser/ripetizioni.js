/* Ripetizioni: a corpo libero (trazioni, dip, piegamenti) si puo scendere sotto 6, secondo la corporatura.
   Con un carico il minimo e 3 (il coach prescrive anche 3x5 e 5x3). Gli isometrici restano a secondi.
   Prova la regola e il campo vero nella schermata dell allenamento. */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const p=await (await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'})).newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','it');});
await p.goto(require('url').pathToFileURL(require('path').join(__dirname,'..','..','index.html')).href);await p.waitForTimeout(900);

console.log('== la regola');
const r = await p.evaluate(()=>{
  const nome = (frag) => EXERCISE_LIBRARY.find(e => e.name.indexOf(frag) !== -1).name;
  const f = (frag) => { const x = repsRange(nome(frag)); return x.min + '-' + x.max; };
  return { trazioni: f('Trazioni alla Sbarra'), chin: f('Chin-up'), dip: f('Dip alle Parallele'), pushup: f('Push-up'), assistite: f('Trazioni Assistite'), rematoreInverso: f('Rematore Inverso'),
           leg: f('Leg Press'), panca: f('Panca Piana Bilanciere'), stacco: f('Stacco da Terra'), plank: f('Plank') };
});
ok(r.trazioni==='1-30' && r.chin==='1-30' && r.dip==='1-30' && r.pushup==='1-30' && r.rematoreInverso==='1-30', 'trazioni, chin-up, dip, push-up e rematore inverso: da 1 a 30 ('+JSON.stringify([r.trazioni,r.chin,r.dip,r.pushup])+')');
ok(r.assistite==='1-30', 'trazioni assistite alla macchina: da 1 a 30 ('+r.assistite+')');
ok(r.leg==='3-20' && r.panca==='3-20' && r.stacco==='3-20', 'con un carico: da 3 a 20 ('+[r.leg,r.panca,r.stacco]+')');
ok(r.plank==='10-120', 'il plank resta a secondi: 10-120 ('+r.plank+')');

console.log('== il campo nella schermata dell allenamento');
async function provaCampo(frag, scrivi) {
  return p.evaluate(([frag, scrivi]) => {
    const nome = EXERCISE_LIBRARY.find(e => e.name.indexOf(frag) !== -1).name;
    const data = loadData(); const g = DAYS[0];
    data[g] = [normalizeExerciseRecord({ name: nome, sets: 3, reps: 8, weight: 0, rest: 90, completedSets: [] })];
    saveData(data); currentDay = g; saveRestDays([]);
    renderAllenamento();
    const inp = document.querySelector('#allenamento-list input.num-drag[data-reps-ex="0"][data-reps-set="0"]');
    if (!inp) return { errore: 'campo non trovato' };
    inp.value = String(scrivi); inp.dispatchEvent(new Event('change', { bubbles: true }));
    const dopo = loadData()[g][0].completedSets[0].reps;
    inp.parentNode.querySelector('.wheel-btn').click();
    const ruota = [...document.querySelectorAll('#wheel-track .wheel-num')].map(x => Number(x.dataset.v));
    closeWheel();
    return { scritto: scrivi, salvato: dopo, campo: inp.value, ruotaMin: Math.min.apply(null, ruota), ruotaMax: Math.max.apply(null, ruota) };
  }, [frag, scrivi]);
}
let c = await provaCampo('Trazioni alla Sbarra', 3);
ok(c.salvato===3 && c.campo==='3', 'trazioni: scrivere 3 resta 3 (salvato '+c.salvato+')');
ok(c.ruotaMin===1 && c.ruotaMax===30, 'trazioni: la ruota va da 1 a 30 ('+c.ruotaMin+'-'+c.ruotaMax+')');
c = await provaCampo('Trazioni alla Sbarra', 1);
ok(c.salvato===1, 'trazioni: anche 1 sola ripetizione si puo mettere (salvato '+c.salvato+')');
c = await provaCampo('Trazioni alla Sbarra', 0);
ok(c.salvato===1, 'trazioni: 0 viene portato al minimo, 1 (salvato '+c.salvato+')');
c = await provaCampo('Leg Press', 2);
ok(c.salvato===3, 'leg press: 2 viene portato al minimo con un carico, 3 (salvato '+c.salvato+')');
c = await provaCampo('Leg Press', 5);
ok(c.salvato===5, 'leg press: 5 ripetizioni (forza) ora si possono scrivere (salvato '+c.salvato+')');
c = await provaCampo('Push-up', 40);
ok(c.salvato===30, 'push-up: oltre il massimo viene portato a 30 (salvato '+c.salvato+')');

ok(errs.length===0, 'nessun errore di pagina '+errs);
await b.close();
console.log(problemi ? 'PROBLEMI: '+problemi : 'tutto ok');
process.exit(problemi?1:0);
})();
