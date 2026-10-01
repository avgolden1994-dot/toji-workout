/* Epoca d'oro: sedute pronte, metodi, tecniche e traduzioni (EPO-01..07, TEC-01..07) */
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async () => {
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const p = await (await b.newContext({ serviceWorkers: 'block' })).newPage(); const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.addInitScript(() => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'no'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', 'it'); });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname, '..', '..', 'index.html')).href); await p.waitForTimeout(900);

const r = await p.evaluate(() => {
  const out = {};
  const ep = WORKOUT_TEMPLATES.filter(t => t.epoca);
  out.nTemplate = ep.length;
  out.idDoppi = WORKOUT_TEMPLATES.map(t => t.id).filter((x, i, a) => a.indexOf(x) !== i);
  out.mancano = []; out.vuoti = []; out.tecnicheStrane = []; out.nomiNonPuliti = [];
  ep.forEach(t => t.exercises.forEach(e => {
    if (!findExercise(e.name)) out.mancano.push(t.id + ': ' + e.name);
    if (!(e.sets > 0 && e.reps > 0 && e.rest > 0)) out.vuoti.push(t.id + ': ' + e.name);
    if (e.tecnica && !TECNICHE[e.tecnica]) out.tecnicheStrane.push(e.tecnica);
    if (/^\p{L}/u.test(e.name)) out.nomiNonPuliti.push(e.name);   /* i nomi sono quelli della libreria, con l emoji */
  }));
  /* sedute pronte: titolo, descrizione e tag in ogni lingua (voce intera nel dizionario) */
  const norm = (c) => c.replace(/\s+/g, ' ').trim();
  const ha = (lang, c) => { const d = window.I18N[lang]; c = norm(c); if (Object.prototype.hasOwnProperty.call(d, c)) return true; const k = c.replace(/\d+(?:[.,]\d+)*/g, '#'); return Object.prototype.hasOwnProperty.call(d, k); };
  out.senzaTraduzione = [];
  const frasi = [];
  ep.forEach(t => { frasi.push(t.title, t.desc, t.tag); });
  const nuovi = ['goldensix', 'park', 'arnold6', 'gironda', 'reeves', 'yates'].map(metodoDa);
  nuovi.forEach(m => { frasi.push(m.nome, m.come, m.perChi, m.attenzione); });
  frasi.push(metodoDa('hit').come, metodoDa('hit').attenzione);
  ['piramide', 'negativa', 'forzate', 'riposopausa', 'picco', 'ottoperotto'].forEach(k => frasi.push(TECNICHE[k]));
  ['en', 'es', 'de'].forEach(l => frasi.forEach(f => { if (f && !ha(l, f)) out.senzaTraduzione.push(l + ': ' + f.slice(0, 60)); }));
  out.tecnicheNuove = ['piramide', 'negativa', 'forzate', 'riposopausa', 'picco', 'ottoperotto'].every(k => !!TECNICHE[k]);
  out.intense = ['negativa', 'forzate', 'riposopausa'].every(k => TECNICHE_INTENSE.indexOf(k) !== -1) && TECNICHE_INTENSE.indexOf('piramide') === -1 && TECNICHE_INTENSE.indexOf('picco') === -1;
  out.nMetodi = METODI.length;

  const prof = (extra) => Object.assign({ sex: 'M', age: 30, seme: 'epoca', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, luogo: 'palestra', minutes: 60 }, extra);
  const nomi = (sd) => sd.esercizi.map(e => e.name);
  /* Golden Six */
  const g6 = buildProgram(prof({ level: 'intermedio', days: 3, goals: ['massa'], metodo: 'goldensix' }));
  out.g6 = { metodo: g6.metodo, n: g6.sedute.length, es: g6.sedute.map(sd => sd.esercizi.length), uguali: g6.sedute.every(sd => nomi(sd).join() === nomi(g6.sedute[0]).join()), serie: g6.sedute[0].esercizi.map(e => e.sets).join(), rip: g6.sedute[0].esercizi.map(e => e.reps).join(), pausa0: g6.sedute[0].esercizi[0].rest };
  /* Park 5x5 */
  const pk = buildProgram(prof({ level: 'intermedio', days: 3, goals: ['forza'], metodo: 'park', minutes: 75 }));
  const pesanti = (sd) => sd.esercizi.filter(e => e.sets === 5 && e.reps === 5 && e.rest === 180).length;
  out.pk = { metodo: pk.metodo, n: pk.sedute.length, aUguale: nomi(pk.sedute[0]).join() === nomi(pk.sedute[2]).join(), diverso: nomi(pk.sedute[0]).join() !== nomi(pk.sedute[1]).join(), p0: pesanti(pk.sedute[0]), p1: pesanti(pk.sedute[1]),
    stacco: pk.sedute[1].esercizi.filter(e => /stacco|good morning/i.test(e.name) && e.sets === 3 && e.reps === 5).length, polpacci: pk.sedute.every(sd => sd.esercizi.some(e => /calf/i.test(e.name) && e.sets === 2 && e.reps === 15)) };
  /* Arnold */
  const ar = buildProgram(prof({ level: 'avanzato', days: 6, goals: ['massa'], metodo: 'arnold6', minutes: 90 }));
  const ps = ar.sedute[0];
  out.ar = { metodo: ar.metodo, n: ar.sedute.length, titoli: ar.sedute.map(sd => sd.titolo).join('|'), uguali: nomi(ar.sedute[0]).join() === nomi(ar.sedute[3]).join() && nomi(ar.sedute[1]).join() === nomi(ar.sedute[4]).join(),
    coppie: ps.esercizi.map((e, i) => e.superset ? i : -1).filter(i => i >= 0).join(), serie: ps.esercizi.map(e => e.sets).join(), piramide: ps.esercizi.filter(e => e.tecnica === 'piramide').every(e => (findExercise(e.name) || {}).type === 'compound') && ps.esercizi.some(e => e.tecnica === 'piramide'),
    pausa: ar.sedute.every(sd => sd.esercizi.every(e => e.rest === 90)) };
  /* Gironda 8x8 */
  const gi = buildProgram(prof({ level: 'intermedio', days: 3, goals: ['massa'], metodo: 'gironda' }));
  out.gi = { metodo: gi.metodo, n: gi.sedute.length, primi: gi.sedute.map(sd => sd.esercizi[0].sets + 'x' + sd.esercizi[0].reps + '@' + sd.esercizi[0].rest + ':' + sd.esercizi[0].tecnica).join('|'),
    leggeri: gi.sedute.every(sd => sd.esercizi.every(e => tipoCarico(e.name) !== 'pesante')), altri: gi.sedute.every(sd => sd.esercizi.slice(1).every(e => e.sets === 3 && e.reps === 12 && e.rest === 75)),
    carico: gi.sedute.every(sd => sd.esercizi[0].weight <= Math.round((findExercise(sd.esercizi[0].name).weight || 0) * 0.8)) };
  /* Heavy Duty */
  const hd = buildProgram(prof({ level: 'avanzato', days: 3, goals: ['massa'], metodo: 'hit', minutes: 45 }));
  const gruppoReps = (sd) => sd.esercizi.map(e => { const g = (findExercise(e.name) || {}).group; return (g === 'gambe' || g === 'glutei') ? e.reps === 15 : e.reps === 8; }).every(Boolean);
  out.hd = { metodo: hd.metodo, split: hd.split.nome, titoli: hd.sedute.map(sd => sd.titolo).join('|'), serie: hd.sedute.every(sd => sd.esercizi.every(e => e.sets === 2)), reps: hd.sedute.every(gruppoReps),
    rp: hd.sedute.map(sd => { const u = sd.esercizi[sd.esercizi.length - 1]; return u.tecnica || '-'; }).join('|'), senzaAggiunte: hd.sedute.every(sd => sd.esercizi.length <= 6 && !sd.esercizi.some(e => e.protetto)) };
  /* Reeves e Yates: solo ispirazione */
  out.rv = buildProgram(prof({ level: 'intermedio', days: 3, goals: ['massa'], metodo: 'reeves' })).metodo;
  out.yt = buildProgram(prof({ level: 'avanzato', days: 4, goals: ['massa'], metodo: 'yates' })).metodo;
  out.applicabili = ['goldensix', 'park', 'arnold6', 'gironda', 'hit'].every(id => metodoDa(id).applicabile) && !metodoDa('reeves').applicabile && !metodoDa('yates').applicabile;
  /* il coach li propone a chi li puo usare */
  const idsPer = (pr) => metodiPerTe(pr).map(x => x.m.id);
  out.consigliaArnold = idsPer({ level: 'avanzato', days: 6, minutes: 90, luogo: 'palestra', goals: ['massa'] }).indexOf('arnold6');
  out.nonArnoldAPrincipiante = metodiPerTe({ level: 'principiante', days: 6, minutes: 90, luogo: 'palestra', goals: ['massa'] }).find(x => x.m.id === 'arnold6').v < metodiPerTe({ level: 'avanzato', days: 6, minutes: 90, luogo: 'palestra', goals: ['massa'] }).find(x => x.m.id === 'arnold6').v;
  /* tutti i metodi applicabili generano una scheda valida nel loro giorno e livello */
  out.generaTutti = METODI.filter(m => m.applicabile).map(m => { try { const pr = buildProgram(prof({ level: m.livelli[m.livelli.length - 1], days: m.giorni[0], goals: [m.obiettivi[0]], metodo: m.id, luogo: m.luoghi[0], minutes: Math.max(m.minuti[0], 45) })); return pr.sedute.length > 0 && pr.sedute.every(sd => sd.esercizi.length > 0) ? '' : m.id + ' vuoto'; } catch (e) { return m.id + ': ' + e.message; } }).filter(Boolean);
  /* sedute pronte nel piano: coppie e tecniche arrivano al giorno */
  const giorno = DAYS[0]; currentDay = giorno;
  const vuoto = {}; DAYS.forEach(d => { vuoto[d] = []; }); saveData(vuoto);
  applyTemplate('mentzer-ps', false);
  const m1 = loadData()[giorno];
  out.mentzer = { n: m1.length, coppie: m1.map((e, i) => e.superset ? i : -1).filter(i => i >= 0).join(), serie: m1.every(e => e.sets === 1) };
  saveData(vuoto); applyTemplate('petto-schiena', false);
  const m2 = loadData()[giorno];
  out.arnoldPronta = { piramide: m2.filter(e => e.tecnica === 'piramide').length, coppie: m2.map((e, i) => e.superset ? i : -1).filter(i => i >= 0).join() };
  saveData(vuoto);
  /* il carosello delle schede mostra le nuove */
  switchTab('piano'); try { renderGruppi(); } catch (e) {}
  const car = document.getElementById('group-templates');
  out.carosello = car ? (car.innerHTML.indexOf('Golden Six') !== -1 && car.innerHTML.indexOf('Epoca d') !== -1) : false;
  return out;
});
console.log('Sedute pronte');
ok(r.nTemplate === 13, 'tredici sedute dell epoca d oro (' + r.nTemplate + ')');
ok(r.idDoppi.length === 0, 'nessun id doppio ' + r.idDoppi);
ok(r.mancano.length === 0, 'tutti gli esercizi sono della libreria ' + r.mancano.join(' | '));
ok(r.vuoti.length === 0 && r.nomiNonPuliti.length === 0, 'serie, ripetizioni e pause sempre presenti; nomi con l emoji della libreria');
ok(r.tecnicheStrane.length === 0, 'le tecniche usate nelle sedute esistono');
ok(r.mentzer.n === 5 && r.mentzer.coppie === '1,3' && r.mentzer.serie, 'Mentzer petto e schiena: 5 esercizi a 1 serie, coppie sul secondo e sul quarto (' + r.mentzer.coppie + ')');
ok(r.arnoldPronta.piramide === 4 && r.arnoldPronta.coppie === '1,3', 'Arnold petto e schiena: piramide su 4 esercizi, superserie sul secondo e sul quarto');
ok(r.carosello, 'il carosello delle schede mostra "Golden Six" con il tag "Epoca d\'oro"');

console.log('Tecniche e traduzioni');
ok(r.tecnicheNuove, 'le sei tecniche nuove (piramide, negative, forzate, riposo-pausa, picco, 8x8) sono nell elenco');
ok(r.intense, 'negative, forzate e riposo-pausa contano come tecniche al cedimento (RIC-04); piramide e picco no');
ok(r.senzaTraduzione.length === 0, 'titoli, descrizioni, metodi e tecniche tradotti in en, es, de ' + r.senzaTraduzione.slice(0, 5).join(' | '));

console.log('Metodi');
ok(r.nMetodi === 25, 'venticinque metodi (' + r.nMetodi + ')');
ok(r.applicabili, 'applicabili: Golden Six, Park, Arnold, Gironda, Heavy Duty; solo ispirazione: Reeves e Yates');
ok(r.g6.metodo === 'goldensix' && r.g6.n === 3 && r.g6.es.join() === '6,6,6' && r.g6.uguali, 'Golden Six: 3 sedute da 6 esercizi, sempre gli stessi');
ok(r.g6.serie === '4,3,3,4,3,3' && r.g6.rip === '10,10,8,10,10,15' && r.g6.pausa0 === 120, 'Golden Six: serie 4,3,3,4,3,3, ripetizioni 10,10,8,10,10,15, 2 minuti sullo squat (' + r.g6.serie + ' | ' + r.g6.rip + ')');
ok(r.pk.metodo === 'park' && r.pk.n === 3 && r.pk.aUguale && r.pk.diverso, 'Park: A, B, A (la prima e la terza uguali, la seconda diversa)');
ok(r.pk.p0 === 3 && r.pk.p1 === 3 && r.pk.stacco === 1 && r.pk.polpacci, 'Park: tre fondamentali 5x5 a 180 s, stacco 3x5 nel giorno B, polpacci 2x15 ogni giorno');
ok(r.ar.metodo === 'arnold6' && r.ar.n === 6 && r.ar.titoli === 'Petto e Schiena|Spalle e Braccia|Legs|Petto e Schiena|Spalle e Braccia|Legs', 'Arnold: sei sedute, due volte petto e schiena, spalle e braccia, gambe (' + r.ar.titoli + ')');
ok(r.ar.uguali && r.ar.coppie === '1,3' && r.ar.serie === '4,4,4,4,3,3' && r.ar.piramide && r.ar.pausa, 'Arnold: stesse sedute ogni volta, coppie spinta-tirata, 4 serie sui fondamentali e 3 sul resto, piramide sui multiarticolari, 90 s');
ok(r.gi.metodo === 'gironda' && r.gi.n === 3 && /^8x8@30:ottoperotto(\|8x8@30:ottoperotto){2}$/.test(r.gi.primi), 'Gironda: il primo esercizio di ogni giorno e 8x8 con 30 s (' + r.gi.primi + ')');
ok(r.gi.leggeri && r.gi.altri && r.gi.carico, 'Gironda: niente bilanciere pesante, gli altri 3x12 a 75 s, carico ridotto al 70%');
ok(r.hd.metodo === 'hit' && r.hd.split === 'Petto e Schiena / Gambe / Spalle e Braccia' && r.hd.titoli === 'Petto e Schiena|Legs|Spalle e Braccia', 'Heavy Duty a 3 giorni: ' + r.hd.split);
ok(r.hd.serie && r.hd.reps && r.hd.senzaAggiunte, 'Heavy Duty: 2 serie, 8 ripetizioni per la parte alta e 15 per gambe e glutei, nessuna aggiunta del coach');
ok(/riposopausa/.test(r.hd.rp), 'Heavy Duty: riposo-pausa sull ultimo esercizio (' + r.hd.rp + ')');
ok(r.rv === null && r.yt === null, 'Reeves e Yates: solo ispirazione, la scheda e quella del coach');
ok(r.consigliaArnold >= 0 && r.consigliaArnold <= 4 && r.nonArnoldAPrincipiante, 'Arnold e tra i primi consigliati a un avanzato con 6 giorni, e piu in basso per un principiante (posizione ' + r.consigliaArnold + ')');
ok(r.generaTutti.length === 0, 'ogni metodo applicabile genera una scheda valida ' + r.generaTutti.join(' | '));

/* la tabella della mappa e il codice dicono lo stesso */
const md = fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'coach-mappa-regole.md'), 'utf8');
const righe = md.split('\n').filter(x => /^\| [a-z0-9]+ \| .* \| (si|no \(solo ispirazione\)) \|$/.test(x)).length;
ok(righe === r.nMetodi && /catalogo di 25 metodi/.test(md), 'la tabella MET-01 della mappa ha ' + righe + ' righe come i metodi del codice');

ok(errs.length === 0, 'nessun errore di pagina ' + errs);
await b.close();
console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok');
process.exit(problemi ? 1 : 0);
})();
