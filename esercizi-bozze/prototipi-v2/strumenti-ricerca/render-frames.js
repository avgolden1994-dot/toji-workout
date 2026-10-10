// Deterministic frame renderer for animated SVGs (CSS animations + SMIL).
// usage: node render-frames.js <svg> <outdir> [--fps 60] [--dur 5400] [--width 720]
//        [--times 0,100,...] [--transparent] [--reduced] [--css "extra css"]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function arg(name, def) {
  const i = process.argv.indexOf('--' + name);
  if (i < 0) return def;
  const v = process.argv[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
}

(async () => {
  const svgPath = path.resolve(process.argv[2]);
  const outDir = path.resolve(process.argv[3]);
  const fps = +arg('fps', 60);
  const dur = +arg('dur', 5400);
  const width = +arg('width', 720);
  const transparent = !!arg('transparent', false);
  const reduced = !!arg('reduced', false);
  const extraCss = arg('css', '');
  let times = arg('times', null);
  times = times ? String(times).split(',').map(Number)
                : Array.from({ length: Math.round(dur / 1000 * fps) }, (_, i) => i * 1000 / fps);
  fs.mkdirSync(outDir, { recursive: true });
  const src = fs.readFileSync(svgPath, 'utf8');
  const vb = src.match(/viewBox="([^"]+)"/)[1].trim().split(/[\s,]+/).map(Number);
  const height = Math.round(width * vb[3] / vb[2]);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await page.goto('file://' + svgPath);
  if (extraCss) {
    await page.evaluate(css => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      s.textContent = css; document.documentElement.appendChild(s);
    }, extraCss);
  }
  await page.evaluate(() => {
    const svg = document.documentElement;
    if (svg.pauseAnimations) svg.pauseAnimations();
    document.getAnimations().forEach(a => a.pause());
  });
  const meta = [];
  for (let i = 0; i < times.length; i++) {
    const t = times[i];
    await page.evaluate(t => {
      const svg = document.documentElement;
      if (svg.setCurrentTime) svg.setCurrentTime(t / 1000);
      document.getAnimations().forEach(a => { a.currentTime = t; });
    }, t);
    const file = path.join(outDir, 'f' + String(i).padStart(4, '0') + '.png');
    await page.screenshot({ path: file, omitBackground: transparent });
    meta.push({ i, t, file });
  }
  fs.writeFileSync(path.join(outDir, 'frames.json'), JSON.stringify({ svg: svgPath, width, height, fps, dur, transparent, frames: meta }, null, 1));
  await browser.close();
  console.log('rendered', times.length, 'frames', width + 'x' + height, '->', outDir);
})().catch(e => { console.error(e); process.exit(1); });
