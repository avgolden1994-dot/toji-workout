/* Recupero: i testi sul pannello (arancione nel chiaro, sfumato nello scuro) si leggono in entrambi i temi.
   Misura il contrasto vero: il colore del testo contro i pixel dello sfondo dietro di lui (peggiore dei punti).
   WCAG: 4,5 per il testo normale. Gli screenshot vanno in tmpdir. */
const { chromium } = require('playwright-core');
const os = require('os'), path = require('path'), url = require('url');
let problemi = 0;
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/opt/pw-browsers/chromium'});
const pagina = url.pathToFileURL(path.join(__dirname,'..','..','index.html')).href;

/* contrasto minimo tra il colore del testo di `sel` e lo sfondo dietro, a testo nascosto */
async function contrasto(p, sel) {
  const info = await p.evaluate(s => { const el=document.querySelector(s), cs=getComputedStyle(el), g=document.createRange(); g.selectNodeContents(el); const r=g.getBoundingClientRect(); el.style.visibility='hidden'; return {color:cs.color, x:r.x, y:r.y, w:r.width, h:r.height}; }, sel);   /* solo l area occupata dal testo, non tutta la scatola */
  const png = await p.screenshot({clip:{x:info.x,y:info.y,width:Math.max(1,info.w),height:Math.max(1,info.h)}});
  await p.evaluate(s => { document.querySelector(s).style.visibility=''; }, sel);
  return p.evaluate(async ([b64, color]) => {
    const bmp = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
    const g = c.getContext('2d'); g.drawImage(bmp, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    const m = color.match(/[\d.]+/g).map(Number), t = { r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1 };
    const lum = (r, g2, b2) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g2) + 0.0722 * f(b2); };
    let peggiore = 99;
    for (let i = 0; i < d.length; i += 4) {
      const L = lum(t.r * t.a + d[i] * (1 - t.a), t.g * t.a + d[i + 1] * (1 - t.a), t.b * t.a + d[i + 2] * (1 - t.a)), B = lum(d[i], d[i + 1], d[i + 2]);
      const hi = Math.max(L, B), lo = Math.min(L, B), cr = (hi + 0.05) / (lo + 0.05);
      if (cr < peggiore) peggiore = cr;
    }
    return Math.round(peggiore * 100) / 100;
  }, [png.toString('base64'), info.color]);
}

for (const theme of ['light', 'dark']) {
  for (const stato of ['compatto', 'esteso']) {
    const ctx = await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,serviceWorkers:'block'});
    const p = await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.addInitScript(t=>{localStorage.setItem('tz_mode','toji');localStorage.setItem('tz_consenso','no');localStorage.setItem('tz_onb','1');localStorage.setItem('tz_guida_vista','1');localStorage.setItem('tz_lingua','es');localStorage.setItem('tz_theme',t);},theme);
    await p.goto(pagina); await p.waitForTimeout(900);
    await p.evaluate(()=>{
      openRecoveryPanel('Press de hombros en máquina', 90);
      document.getElementById('recovery-next').innerHTML = '<span>Siguiente</span> <b>Press de hombros en máquina</b> <span data-no-tr>• 2/3 • 10 × 29 kg</span>';
    });
    if (stato === 'esteso') await p.evaluate(()=>document.getElementById('recovery-overlay').classList.add('expanded'));
    await p.waitForTimeout(700);
    await p.screenshot({path:path.join(os.tmpdir(),`recupero_${theme}_${stato}.png`)});
    const righe = [['.recovery-next', 'riga «Siguiente»'], ['.recovery-next b', 'nome dell esercizio'], ['.recovery-title', 'titolo'], ['.recovery-time-big', 'tempo']];
    const out = [];
    for (const [sel, nome] of righe) { const c = await contrasto(p, sel); out.push(`${nome} ${c}`); if (c < 4.5) { problemi++; console.log(`   MALE: ${theme}/${stato}: ${nome} contrasto ${c} < 4,5`); } }
    console.log(`${theme}/${stato}: ${out.join(' | ')}${errs.length ? ' | errori: ' + errs : ''}`);
    if (errs.length) problemi++;
    await ctx.close();
  }
}
await b.close();
console.log(problemi ? `PROBLEMI: ${problemi}` : 'tutto ok');
process.exit(problemi ? 1 : 0);
})();
