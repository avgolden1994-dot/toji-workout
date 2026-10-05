/* Coerenza delle schede del coach (ABB-01..10): su una griglia di profili le schede
   rispettano le regole di struttura. Ogni profilo e ripetibile (seme fisso). */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async () => {
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const p = await (await b.newContext({ serviceWorkers: 'block' })).newPage(); const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.addInitScript(() => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'no'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', 'it'); });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname, '..', '..', 'index.html')).href); await p.waitForTimeout(900);

const r = await p.evaluate(() => {
  const liv = ['principiante', 'intermedio', 'avanzato'], giorni = [2, 3, 4, 5, 6], obiettivi = [['massa'], ['forza'], ['ricomposizione'], ['dimagrimento'], ['salute'], ['glutei'], ['massa', 'forza']], luoghi = ['palestra', 'manubri', 'corpo'], minuti = [45, 60, 90];
  const V = {}, esempi = {};
  const segna = (k, prof, msg) => { V[k] = (V[k] || 0) + 1; (esempi[k] = esempi[k] || []).length < 3 && esempi[k].push(JSON.stringify(prof) + ' :: ' + msg); };
  const meta = (e) => findExercise(e.name) || {};
  const sub = (e) => (dettaglioEsercizio(e.name) || {}).sub;
  let n = 0, conMetodo = 0;
  liv.forEach(l => giorni.forEach(g => obiettivi.forEach(o => luoghi.forEach(lu => minuti.forEach(m => {
    if (lu !== 'palestra' && m === 90) return;
    const prof = { level: l, days: g, goals: o, luogo: lu, minutes: m };
    let prog;
    try { prog = buildProgram(Object.assign({ sex: 'M', age: 30, seme: 'audit', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false }, prof)); } catch (e) { segna('ERRORE', prof, e.message); return; }
    n++;
    const sed = prog.sedute, ipert = o.some(x => x === 'massa' || x === 'ricomposizione');
    if (prog.metodo) { conMetodo++; if (prog.metodo !== 'rr') return; }
    sed.forEach(sd => {
      const es = sd.esercizi;
      if (prog.metodo) return;
      /* ABB-01 */
      for (let i = 0; i < es.length; i++) for (let j = i + 1; j < es.length; j++) {
        if (sd.tipo !== 'punti' && meta(es[i]).type === 'isolation' && meta(es[i]).group !== 'core' && meta(es[j]).type === 'compound' && meta(es[j]).group !== 'core' && !isTimeBased(es[i].name)) segna('ABB-01 isolamento prima del multiarticolare', prof, sd.titolo + ': ' + es[i].name + ' prima di ' + es[j].name);
      }
      for (let i = 0; i < es.length - 1; i++) if (meta(es[i]).group === 'core' && meta(es[i + 1]).group !== 'core') segna('ABB-01 core non in fondo', prof, sd.titolo);
      /* ABB-02 */
      const chiavi = {};
      es.forEach(e => { const k = [meta(e).group, sub(e), meta(e).type, schemaDi(e.name) || ''].join('|'); (chiavi[k] = chiavi[k] || []).push(e.name.replace(EMOJI_TESTA, '')); });
      Object.keys(chiavi).forEach(k => {
        const ammessi = /^gambe\|Multiarticolari\|compound/.test(k) ? 3 : (/^glutei\|Glutei\|compound|^braccia\|(Bicipiti|Tricipiti)\|isolation/.test(k) ? 2 : 1);
        if (chiavi[k].length > ammessi) segna('ABB-02 esercizi doppi', prof, sd.titolo + ': ' + chiavi[k].join(' + '));
      });
      /* ABB-06 */
      es.forEach((e, i) => {
        if (!e.superset || i === 0) return;
        const a = es[i - 1], sa = schemaDi(a.name), sb = schemaDi(e.name);
        const antag = (sa && sb && ((/spinta/.test(sa) && /tirata/.test(sb)) || (/tirata/.test(sa) && /spinta/.test(sb)))) || (meta(a).group === 'petto' && meta(e).group === 'schiena') || (meta(a).group === 'schiena' && meta(e).group === 'petto')
          || (sub(a) === 'Bicipiti' && sub(e) === 'Tricipiti') || (sub(a) === 'Tricipiti' && sub(e) === 'Bicipiti') || (sub(a) === 'Quadricipiti' && sub(e) === 'Femorali') || (sub(a) === 'Femorali' && sub(e) === 'Quadricipiti');
        if (!antag || tipoCarico(a.name) === 'pesante' || tipoCarico(e.name) === 'pesante') segna('ABB-06 superserie non valida', prof, sd.titolo + ': ' + a.name + ' + ' + e.name);
      });
      /* ABB-08 */
      const comp = es.filter(e => meta(e).type === 'compound' && !isTimeBased(e.name));
      if (comp.length > 1 && tipoCarico(comp[0].name) === 'pesante' && !STR_FATICA.test(comp[0].name) && !comp[0].fisso) {
        const altro = comp.slice(1).find(e => e.sets > comp[0].sets && e.sets > 2 && !e.fisso && tipoCarico(e.name) !== 'pesante');
        if (altro) segna('ABB-08 il fondamentale ha meno serie', prof, sd.titolo + ': ' + comp[0].name + ' ' + comp[0].sets + ' vs ' + altro.name + ' ' + altro.sets);
      }
      es.forEach(e => { if (STR_FATICA.test(e.name) && !e.fisso && e.sets > 3) segna('ABB-09 stacco oltre 3 serie', prof, sd.titolo + ': ' + e.name + ' ' + e.sets); });
    });
    if (prog.metodo) return;
    const tutti = [].concat.apply([], sed.map(sd => sd.esercizi));
    const ha = (rx) => tutti.some(e => rx.test(e.name.replace(EMOJI_TESTA, '')));
    /* ABB-03 */
    if (ipert && l !== 'principiante' && g >= 3 && o[0] !== 'salute') {
      if (sed.some(sd => /lower|legs|fullbody/.test(sd.tipo)) && !ha(/calf/i)) segna('ABB-03 polpacci assenti', prof, '');
      if (lu !== 'corpo') {   /* senza attrezzi non c e un curl ne un pushdown */
      if (tutti.some(e => { const s = schemaDi(e.name); return s === 'spintaO' || s === 'spintaV'; }) && !ha(/face pull|reverse|alzate posteriori|y-raise/i)) segna('ABB-03 deltoidi posteriori assenti', prof, '');
      if (g >= 4 && !tutti.some(e => meta(e).group === 'braccia' && sub(e) === 'Bicipiti')) segna('ABB-03 bicipiti assenti', prof, '');
      if (g >= 4 && !tutti.some(e => meta(e).group === 'braccia' && sub(e) === 'Tricipiti' && meta(e).type !== 'compound')) segna('ABB-03 tricipiti diretti assenti', prof, '');
      }
    }
    if (g >= 3 && o[0] !== 'salute' && lu !== 'corpo' && !tutti.some(e => meta(e).group === 'core')) segna('ABB-03 core assente', prof, '');
    /* ABB-04 */
    const pat = (e) => schemaDi(e.name);
    const spinta = tutti.filter(e => pat(e) === 'spintaO' || pat(e) === 'spintaV').reduce((t, e) => t + e.sets, 0);
    /* il Pullover con Manubrio e la tirata verticale di riserva a casa senza sbarra (CAS-14, D-P11): conta come tirata, come per strEtirata e il collaudo (EQ-01) */
    const tirata = tutti.filter(e => pat(e) === 'tirataO' || pat(e) === 'tirataV' || /face pull|reverse|alzate posteriori|y-raise|pullover con manubrio/i.test(e.name)).reduce((t, e) => t + e.sets, 0);
    if (spinta + tirata >= 8 && tirata < spinta * 0.85) segna('ABB-04 piu spinte che tirate', prof, 'spinta ' + spinta + ' tirata ' + tirata);
    /* ABB-05: con 3 giorni, intermedio e avanzato, ogni grande gruppo in almeno 2 sedute */
    if (g === 3 && l !== 'principiante' && lu === 'palestra') {
      if (prog.split.nome !== 'Upper / Lower / Full Body') segna('ABB-05 split a 3 giorni', prof, prog.split.nome);
      ['petto', 'schiena', 'gambe'].forEach(gr => { if (sed.filter(sd => sd.esercizi.some(e => meta(e).group === gr)).length < 2) segna('ABB-05 gruppo una volta sola', prof, gr); });
    }
  })))));
  return { n: n, conMetodo: conMetodo, V: V, esempi: esempi };
});
console.log('profili provati: ' + r.n + ' (con un metodo famoso: ' + r.conMetodo + ')');
const chiavi = Object.keys(r.V).sort();
ok(r.n > 500, 'griglia di profili abbastanza larga');
ok(chiavi.length === 0, 'nessuna violazione delle regole di struttura' + (chiavi.length ? ': ' + chiavi.map(k => k + ' x' + r.V[k]).join(' | ') : ''));
chiavi.forEach(k => r.esempi[k].forEach(x => console.log('     ' + k + ' -> ' + x)));

/* una scheda letta per intero: intermedio, 3 giorni, massa, palestra, 60 minuti */
const s = await p.evaluate(() => {
  const prog = buildProgram({ sex: 'M', age: 30, seme: 'audit', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, level: 'intermedio', days: 3, goals: ['massa'], luogo: 'palestra', minutes: 60 });
  const nomi = [].concat.apply([], prog.sedute.map(sd => sd.esercizi.map(e => e.name.replace(EMOJI_TESTA, ''))));
  return { split: prog.split.nome, titoli: prog.sedute.map(sd => sd.titolo), note: prog.note, nomi: nomi, core: [].concat.apply([], prog.sedute.map(sd => sd.esercizi)).some(e => (findExercise(e.name) || {}).group === 'core') };
});
ok(s.split === 'Upper / Lower / Full Body', 'intermedio, 3 giorni: Upper / Lower / Full Body (' + s.split + ')');
ok(/forza/.test(s.titoli[0]) && /forza/.test(s.titoli[1]) && /ipertrofia/.test(s.titoli[2]), 'upper e lower forza, full body ipertrofia: ' + s.titoli.join(' | '));
/* ABB-03 (aggiornata in INT-0): polpacci, deltoidi posteriori e core ci sono in ogni settimana, e se li ha AGGIUNTI strCopri la nota lo dice. Dall'onda 0 (W0-T2: tempo e femorali)
   alcuni stanno gia nella ricetta o nel riempimento del tempo: allora non c'e nessuna aggiunta e quindi nessuna nota (prima la prova pretendeva una nota per tutti e tre). */
const presente = { 'Polpacci': s.nomi.some(n => /calf/i.test(n)), 'Deltoidi posteriori': s.nomi.some(n => /face pull|reverse|alzate posteriori|y-raise/i.test(n)), 'Core': s.core };
ok(Object.keys(presente).every(w => presente[w]), 'polpacci, deltoidi posteriori e core ci sono nella settimana: ' + JSON.stringify(presente));
ok(Object.keys(presente).every(w => !s.note.some(x => x.indexOf(w + ':') === 0) || presente[w]), 'se una nota dice che ha aggiunto polpacci, deltoidi posteriori o core, l esercizio c e davvero');

/* la priorita dell utente porta il suo gruppo davanti a parita di tipo (ABB-10) */
const pr = await p.evaluate(() => {
  const base = { sex: 'M', age: 30, seme: 'audit', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, level: 'intermedio', days: 3, goals: ['massa'], luogo: 'palestra', minutes: 60 };
  const primo = (prio) => buildProgram(Object.assign({}, base, { priorita: prio })).sedute[0].esercizi.slice(0, 3).map(e => (findExercise(e.name) || {}).group);
  const lista = [{ name: '💪 Panca Piana Manubri' }, { name: '🏹 Lat Machine' }, { name: '💪 Chest Press Machine' }];
  return { senza: strOrdina(lista.slice(), 'upper', []).map(e => e.name), con: strOrdina(lista.slice(), 'upper', ['schiena']).map(e => e.name) };
});
ok(pr.con[0].indexOf('Lat Machine') !== -1 && pr.senza[0].indexOf('Panca Piana Manubri') !== -1, 'a parita di tipo il gruppo prioritario passa davanti: ' + pr.senza[0] + ' -> ' + pr.con[0]);

ok(errs.length === 0, 'nessun errore di pagina ' + errs);
await b.close();
console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok');
process.exit(problemi ? 1 : 0);
})();
