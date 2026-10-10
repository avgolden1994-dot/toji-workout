// CPU cost of an animated SVG used as <img> (as in the app): trace 3 s with 6x CPU throttling.
// usage: node perf.js file1.svg file2.svg ...
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const rows = [];
  for (const f of process.argv.slice(2)) {
    const res = [];
    for (let rep = 0; rep < 3; rep++) {
      const page = await browser.newPage({ viewport: { width: 390, height: 300 }, deviceScaleFactor: 3 });
      const html = `<html><body style="margin:0;background:#eee"><img id="i" src="file://${path.resolve(f)}" style="width:360px;height:198px;object-fit:contain;display:block"></body></html>`;
      const tmp = path.join(__dirname, 'frames', 'perf-host.html');
      fs.writeFileSync(tmp, html);
      await page.goto('file://' + tmp);
      await page.waitForTimeout(500);
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
      const tf = path.join(__dirname, 'frames', 'trace.json');
      await browser.startTracing(page, { path: tf, categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'toplevel', 'cc'] });
      await page.waitForTimeout(3000);
      await browser.stopTracing();
      const tr = JSON.parse(fs.readFileSync(tf, 'utf8'));
      const ev = tr.traceEvents || tr;
      const names = {};
      ev.filter(e => e.ph === 'M' && e.name === 'thread_name').forEach(e => { names[e.pid + ':' + e.tid] = e.args.name; });
      const sum = {}; const byName = {};
      let frames = 0;
      for (const e of ev) {
        const th = names[e.pid + ':' + e.tid] || '?';
        if (e.name === 'DrawFrame' || e.name === 'Graphics.Pipeline.DrawAndSwap') frames++;
        if (e.ph !== 'X' || !e.dur) continue;
        if (th === 'CrRendererMain' && ['UpdateLayoutTree','Layout','Paint','PrePaint','Layerize','UpdateLayer','UpdateLayerTree','Commit','ScheduleStyleRecalculation','HitTest','IntersectionObserverController::computeIntersections','PaintImage','Decode Image','ImageDecodeTask','AnimationFrameFired'].includes(e.name)) byName[e.name] = (byName[e.name] || 0) + e.dur / 1000;
        if (e.name === 'ThreadControllerImpl::RunTask' || e.name === 'ThreadPool_RunTask' || e.name === 'RunTask') {
          const key = th.startsWith('CompositorTileWorker') ? 'raster' : th === 'CrRendererMain' ? 'main' : th === 'Compositor' ? 'compositor' : null;
          if (key) sum[key] = (sum[key] || 0) + e.dur / 1000;
        }
      }
      sum.byName = byName; res.push(sum);
      await page.close();
    }
    const avg = k => res.reduce((s, r) => s + (r[k] || 0), 0) / res.length / 3; // ms per second
    const bn = {}; res.forEach(r => Object.entries(r.byName).forEach(([k, v]) => { bn[k] = (bn[k] || 0) + v / res.length / 3; }));
    Object.keys(bn).forEach(k => bn[k] = +bn[k].toFixed(1));
    rows.push({ f: path.basename(f), kb: (fs.statSync(f).size / 1024).toFixed(1), main: avg('main').toFixed(1), raster: avg('raster').toFixed(1), comp: avg('compositor').toFixed(1), byName: bn });
    console.log(JSON.stringify(rows[rows.length - 1]));
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'results', 'perf.json'), JSON.stringify(rows, null, 1));
})();
