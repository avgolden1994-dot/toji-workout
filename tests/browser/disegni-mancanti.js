/* Disegni mancanti (W1-T5, D-P2): i 33 esercizi nuovi escono con la scheda tecnica e senza disegno. La scheda di ognuno mostra il riquadro vuoto
   (.ex-img-slot.vuoto) con «Immagine in arrivo» tradotto, senza errori; nessun consumatore del percorso del disegno (schedaUnica(nome).disegno,
   immagineEsercizio, slotImmagine) presume che il file esista. Quando un disegno arriva, si toglie il nome da NUOVI: la prova guarda comunque il file su disco. */
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..', '..');
const ok = (c, m) => { console.log((c ? '  ok: ' : '  FALLITO: ') + m); if (!c) process.exitCode = 1; };

const NUOVI = ['Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Hip Thrust con Manubrio', 'Leg Curl con Asciugamano', 'Leg Curl in Piedi', 'Trazioni Negative',
  'Alzate Laterali con Elastico', 'Alzate Laterali Inclinate', 'Floor Press con Manubri', 'Chest Press Inclinata alla Macchina', 'Calf Raise con Manubrio sul Gradino', 'Tibialis Raise',
  'Cossack Squat', 'Copenhagen Plank', 'Reverse Crunch', 'Suitcase Carry', 'Wrist Curl', 'Reverse Wrist Curl', 'Extrarotazione al Cavo', 'Reverse Nordic', 'Belt Squat', 'Seal Row',
  'Squat con Pausa', 'Panca con Pausa', 'Stacco in Deficit', 'Sit-to-Stand dalla Panca', 'Scrollate con Manubri', 'Lat Pulldown con Elastico', 'Face Pull con Elastico', 'Kettlebell Swing',
  'Rematore agli Anelli', 'Squat su Scatola', 'Step-up Basso'];

/* 1. i consumatori del disegno, letti dai sorgenti: solo slotImmagine (con onerror) e schedaUnica/bucchiNelleSchede, che guardano il percorso e non il file */
function jsDi(dir) { return fs.readdirSync(path.join(R, dir), { withFileTypes: true }).flatMap(d => d.isDirectory() ? jsDi(path.join(dir, d.name)) : (/\.js$/.test(d.name) ? [path.join(dir, d.name)] : [])); }
const consumatori = jsDi('js').filter(f => /immagineEsercizio\(|slotImmagine\(|schedaUnica\(|\.disegno\b|IMMAGINI_ESERCIZI/.test(fs.readFileSync(path.join(R, f), 'utf8'))).map(f => f.split(path.sep).join('/')).sort();
const AMMESSI = ['js/dati/disegni-esercizi.js', 'js/dati/scheda-unica.js', 'js/dati/schede-tecniche.js'];
ok(JSON.stringify(consumatori) === JSON.stringify(AMMESSI), 'solo ' + AMMESSI.join(', ') + ' leggono il disegno (trovati: ' + consumatori.join(', ') + '): un consumatore nuovo va controllato');
const disegniSrc = fs.readFileSync(path.join(R, 'js/dati/disegni-esercizi.js'), 'utf8');
ok(/function slotImmagine/.test(disegniSrc) && /onerror="this\.closest\(\\'\.ex-img-slot\\'\)\.classList\.add\(\\'vuoto\\'\)/.test(disegniSrc), 'slotImmagine aggiunge la classe vuoto con onerror quando il file manca');
ok(/immagineEsercizio\(nome\)/.test(fs.readFileSync(path.join(R, 'js/dati/schede-tecniche.js'), 'utf8')) === false && /slotImmagine\(name\)/.test(fs.readFileSync(path.join(R, 'js/dati/schede-tecniche.js'), 'utf8')), 'la scheda esercizio passa solo da slotImmagine');
ok(/typeof immagineEsercizio === 'function' \? immagineEsercizio\(nome\) : null/.test(fs.readFileSync(path.join(R, 'js/dati/scheda-unica.js'), 'utf8')), 'schedaUnica prende il percorso senza aprire il file');

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
  for (const lang of ['it', 'en', 'es', 'de']) {
    const ctx = await b.newContext({ serviceWorkers: 'block' });
    const p = await ctx.newPage(); const errs = [], consoleErr = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('console', m => { if (m.type() === 'error') consoleErr.push({ testo: m.text(), url: m.location().url || '' }); });
    await p.addInitScript(l => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'no'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', l); }, lang);
    await p.goto(require('url').pathToFileURL(path.join(R, 'index.html')).href); await p.waitForTimeout(800);
    console.log('--- lingua ' + lang);

    /* 2. la scheda unica dei nuovi: percorso presente, nessuna voce nella mappa dei disegni, scheda tecnica completa */
    const dati = await p.evaluate(nomi => {
      const lib = {}; EXERCISE_LIBRARY.forEach(e => { lib[e.name.replace(EMOJI_TESTA, '')] = e.name; });
      const buchi = {}; bucchiNelleSchede().forEach(x => { buchi[x.nome] = x.manca; });
      return nomi.map(n => {
        const nome = lib[n];
        if (!nome) return { n, manca: true };
        const s = schedaUnica(nome);
        return { n, nome, disegno: s.disegno, inMappa: !!IMMAGINI_ESERCIZI[n], tecnica: !!(s.tecnica && s.tecnica.partenza && s.tecnica.esecuzione.length && s.tecnica.errori.length && s.tecnica.consiglio), buchi: buchi[n] || [],
          testo: window.tr('Immagine in arrivo') };
      });
    }, NUOVI);
    ok(dati.every(d => !d.manca), 'tutti i 33 esercizi sono nella libreria');
    ok(dati.every(d => !d.manca && typeof d.disegno === 'string' && /^(img|esercizi)\//.test(d.disegno)), 'schedaUnica(nome).disegno e sempre un percorso (mai null), anche senza file');
    const senzaDisegno = dati.filter(d => !d.manca && !fs.existsSync(path.join(R, d.disegno))), conDisegno = dati.filter(d => !d.manca && fs.existsSync(path.join(R, d.disegno)));
    ok(senzaDisegno.length + conDisegno.length === NUOVI.length, 'ogni nuovo ha un percorso (' + senzaDisegno.length + ' senza file, ' + conDisegno.length + ' con il disegno)');
    if (lang === 'it') ok(senzaDisegno.length === NUOVI.length && dati.every(d => !d.inMappa), 'D-P2: nessuno dei 33 ha ancora un disegno ne una voce in IMMAGINI_ESERCIZI');
    ok(dati.every(d => d.tecnica), 'tutti hanno la scheda tecnica completa nella scheda unica');
    ok(dati.every(d => d.buchi.indexOf('scheda tecnica') === -1), 'bucchiNelleSchede non segnala la scheda tecnica di nessuno');

    /* 3. aprire la scheda: il riquadro e vuoto, con il testo tradotto, senza errori */
    const male = [];
    for (const d of dati.filter(x => !x.manca)) {
      await p.evaluate(nome => openExerciseInfo(nome, 'come'), d.nome);
      const esito = await p.evaluate(async () => {
        const slot = document.querySelector('#ex-pane-come .ex-img-slot');
        for (let i = 0; i < 40 && slot && !slot.classList.contains('vuoto') && slot.querySelector('img'); i++) await new Promise(r => setTimeout(r, 50));   /* l evento error del file mancante */
        await new Promise(r => setTimeout(r, 120));   /* il traduttore lavora dopo il disegno della scheda */
        if (!slot) return { slot: false };
        const hint = slot.querySelector('.ex-img-hint');
        return { slot: true, vuoto: slot.classList.contains('vuoto'), img: !!slot.querySelector('img'), testo: hint ? hint.textContent.trim() : '', visibile: hint ? getComputedStyle(hint).display !== 'none' : false,
          atteso: window.tr('Immagine in arrivo'), titolo: document.getElementById('ex-info-title').innerText };
      });
      const haFile = conDisegno.some(x => x.n === d.n);
      if (!esito.slot) male.push(d.n + ': nessun riquadro');
      else if (haFile) { if (esito.vuoto) male.push(d.n + ': ha il disegno ma il riquadro e vuoto'); }
      else {
        if (!esito.vuoto) male.push(d.n + ': il riquadro non e .vuoto');
        if (esito.img) male.push(d.n + ': l immagine rotta e rimasta nel riquadro');
        if (!esito.visibile) male.push(d.n + ': il testo non si vede');
        if (esito.testo !== esito.atteso) male.push(d.n + ': testo «' + esito.testo + '» invece di «' + esito.atteso + '»');
        if (lang !== 'it' && esito.testo === 'Immagine in arrivo') male.push(d.n + ': testo non tradotto');
      }
      if (esito.titolo !== d.n && lang === 'it') male.push(d.n + ': titolo ' + esito.titolo);
    }
    ok(male.length === 0, 'la scheda di ognuno dei 33 mostra .ex-img-slot.vuoto con «' + (dati[0].testo) + '» ' + male.slice(0, 5).join(' | '));
    await p.evaluate(() => closeExerciseInfo());

    /* 4. nessun errore: ne di pagina ne di console, a parte il file del disegno che manca di proposito (img/<slug>.png) */
    const attesi = new Set(senzaDisegno.map(d => d.disegno));
    const altri = consoleErr.filter(e => !(/Failed to load resource/.test(e.testo) && [...attesi].some(a => e.url.indexOf(a) !== -1)));
    ok(errs.length === 0, 'nessun errore di pagina ' + errs.slice(0, 3).join(' | '));
    ok(altri.length === 0, 'nessun errore in console oltre al file del disegno che manca (' + (consoleErr.length - altri.length) + ' caricamenti mancati attesi) ' + altri.slice(0, 3).map(e => e.testo).join(' | '));
    await ctx.close();
  }
  await b.close();
})();
