#!/usr/bin/env node
/* Controlla che le frasi italiane nuove abbiano la voce in en, es e de (js/lingue/*.js).
   Perche serve: window.__i18nMancanti NON segnala le frasi composte (" • ", ": ", ", "...) se almeno un
   pezzo e tradotto (tr() restituisce un misto italiano/inglese e il Set resta vuoto). Questo script spezza la
   frase come fa trCore (js/lingue/traduttore.js) e dice quali pezzi non hanno una voce diretta.

   Uso (dalla radice del repo, dopo npm install):
     node .claude/skills/implementa-regola-coach/references/controlla-traduzioni.js --frasi "prima frase" "seconda frase"
     node .../controlla-traduzioni.js "<espressione JS che dia una stringa o un array di stringhe>"
   Esempio con una regola: l'espressione puo preparare profilo e storico e restituire il motivo, es.
     "(()=>{ saveHistory([...]); return caricoProssimo('💪 Panca Piana Bilanciere',60,8,4).motivo; })()"
   Il browser parte con consenso ai dati acceso (tz_consenso=si), come nelle prove in tests/browser/.
   Esce con 1 se manca qualcosa. Chromium: CHROMIUM=/percorso se non e in /opt/pw-browsers/chromium. */
const path = require('path');
const R = process.cwd();
const { chromium } = require(path.join(R, 'node_modules/playwright-core'));
const args = process.argv.slice(2);
if (!args.length) { console.error('uso: --frasi "frase" ...   oppure   "<espressione JS>"'); process.exit(2); }

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
  let problemi = 0;
  for (const lang of ['en', 'es', 'de']) {
    const p = await (await b.newContext({ serviceWorkers: 'block' })).newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(l => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'si'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', l); }, lang);
    await p.goto(require('url').pathToFileURL(path.join(R, 'index.html')).href); await p.waitForTimeout(800);
    const r = await p.evaluate(([modo, argomenti]) => {
      let frasi;
      if (modo === 'frasi') frasi = argomenti;
      else { const v = (0, eval)(argomenti[0]); frasi = Array.isArray(v) ? v : [v]; }
      const D = window.I18N[window.lingua()];
      /* pezzi senza voce diretta: prima la frase intera, poi la si spezza come trCore (primo separatore presente) */
      const mancanti = (c, prof) => {
        c = String(c).replace(/\s+/g, ' ').trim();
        if (!c || !/\p{L}/u.test(c)) return [];
        if (trCore(c, D, 4) != null) return [];        /* voce diretta (numeri come #, maiuscole, simboli ai lati) */
        if (prof > 3) return [c];
        let primo = null;
        for (const sep of I18N_SEP) {
          if (c.indexOf(sep) === -1) continue;
          const m = c.split(sep).flatMap(x => mancanti(x, prof + 1));
          if (!m.length) return [];                    /* questa divisione traduce tutto */
          if (!primo) primo = m;
        }
        return primo || [c];
      };
      return frasi.filter(f => typeof f === 'string').map(f => ({ frase: f, mancano: mancanti(f, 0) }));
    }, [args[0] === '--frasi' ? 'frasi' : 'js', args[0] === '--frasi' ? args.slice(1) : [args[0]]]);
    const male = r.filter(x => x.mancano.length);
    console.log(lang + ': ' + r.length + ' frasi controllate, ' + male.length + ' con pezzi senza traduzione');
    male.forEach(x => x.mancano.forEach(m => console.log('   manca (' + lang + '): ' + m)));
    if (errs.length) { console.log('   errori di pagina: ' + errs.join(' | ')); problemi++; }
    if (male.length) problemi++;
    await p.context().close();
  }
  await b.close();
  console.log(problemi ? 'PROBLEMI: ' + problemi + ' (aggiungi le voci a js/lingue/en.js, es.js, de.js: chiave = testo italiano identico, numeri come #)' : 'tutto ok');
  process.exit(problemi ? 1 : 0);
})();
