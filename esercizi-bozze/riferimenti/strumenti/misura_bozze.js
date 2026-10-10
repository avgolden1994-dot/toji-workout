// Measure drawn-content bounding boxes of Quiver drafts (excluding bg rect, labels, shadows, decorative strokes)
// Uso: node misura_bozze.js <bozza.svg>...   (esce in ./misure/ accanto a questo script: misure.json + maschere PNG; da non committare)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);
const outDir = path.join(__dirname, 'misure');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1, viewport: { width: 2100, height: 400 } });
  const page = await ctx.newPage();
  const results = [];
  for (const f of files) {
    await page.goto('file://' + path.resolve(f));
    const r = await page.evaluate(() => {
      const root = document.documentElement;
      const raw = root.outerHTML;
      const vbAttr = root.getAttribute('viewBox');
      const vb = root.viewBox.baseVal;
      const W = vb.width, H = vb.height;
      root.setAttribute('width', W);
      root.setAttribute('height', H);
      root.style.width = W + 'px';
      root.style.height = H + 'px';
      root.style.display = 'block';
      document.body && (document.body.style.margin = '0');
      const rr = root.getBoundingClientRect();
      const sx = W / rr.width, sy = H / rr.height;
      const toU = (b) => ({ x: vb.x + (b.left - rr.left) * sx, y: vb.y + (b.top - rr.top) * sy, w: b.width * sx, h: b.height * sy });
      function parseColor(c) {
        if (!c || c === 'none') return null;
        const m = c.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].split(',').map(s => parseFloat(s));
        return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 };
      }
      const lum = (c) => 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
      const sat = (c) => { const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b); return mx === 0 ? 0 : (mx - mn) / mx; };
      function effOpacity(el) {
        let o = 1; let e = el;
        while (e && e.nodeType === 1 && e !== root.parentNode) {
          const cs = getComputedStyle(e);
          o *= parseFloat(cs.opacity || '1');
          e = e.parentNode;
        }
        return o;
      }
      const leaves = Array.from(root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,use,image'))
        .filter(el => !el.closest('defs,clipPath,mask,metadata,pattern,linearGradient,radialGradient,symbol'));
      const items = leaves.map((el, i) => {
        const cs = getComputedStyle(el);
        const b = toU(el.getBoundingClientRect());
        const fill = parseColor(cs.fill);
        const stroke = parseColor(cs.stroke);
        const fo = parseFloat(cs.fillOpacity || '1');
        const op = effOpacity(el);
        return { i, tag: el.tagName, b, fill, stroke, fo, op, hasTransform: !!el.getAttribute('transform') };
      });
      // classify
      const texts = [];
      for (const it of items) {
        const el = leaves[it.i];
        it.cls = 'content';
        if (it.tag === 'text') { it.cls = 'text'; texts.push(it); continue; }
        if (it.b.w === 0 && it.b.h === 0) { it.cls = 'empty'; continue; }
        const f = it.fill;
        const big = it.b.w >= 150 && it.b.h >= 100;
        if (big && f && lum(f) > 0.8 && sat(f) < 0.15) { it.cls = 'bg'; continue; }
        if (big && it.tag === 'rect' && f && sat(f) < 0.1 && lum(f) > 0.6) { it.cls = 'bg'; continue; }
        if (it.b.w >= 250 && it.b.h >= 250) { it.cls = 'bg'; continue; }
        // shadows: flat ellipse / low-opacity grey flat shapes
        const flat = it.b.h > 0 && it.b.h < 0.25 * it.b.w && it.b.w > 8;
        if (flat && (it.tag === 'ellipse' || it.tag === 'path' || it.tag === 'rect') && f && sat(f) < 0.12 && (lum(f) > 0.45 || it.op * it.fo < 0.4) && !(it.tag === 'rect' && lum(f) < 0.45)) { it.cls = 'shadow'; continue; }
        if (flat && f && (it.op * it.fo) < 0.3) { it.cls = 'shadow'; continue; }
        // decorative: fill none + light stroke, or very low opacity light shapes
        if ((!f || f.a === 0) && it.stroke && lum(it.stroke) > 0.7 && sat(it.stroke) < 0.15) { it.cls = 'deco'; continue; }
        if (f && lum(f) > 0.85 && sat(f) < 0.1 && (it.op * it.fo) < 0.5) { it.cls = 'deco'; continue; }
      }
      // label pills: rects that contain a text centre
      for (const it of items) {
        if (it.cls !== 'content' || it.tag !== 'rect') continue;
        for (const t of texts) {
          const cx = t.b.x + t.b.w / 2, cy = t.b.y + t.b.h / 2;
          if (cx >= it.b.x && cx <= it.b.x + it.b.w && cy >= it.b.y && cy <= it.b.y + it.b.h && it.b.w < 80) { it.cls = 'label'; break; }
        }
      }
      const union = (arr) => {
        if (!arr.length) return null;
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const it of arr) { x0 = Math.min(x0, it.b.x); y0 = Math.min(y0, it.b.y); x1 = Math.max(x1, it.b.x + it.b.w); y1 = Math.max(y1, it.b.y + it.b.h); }
        return { x0: +x0.toFixed(1), y0: +y0.toFixed(1), x1: +x1.toFixed(1), y1: +y1.toFixed(1), w: +(x1 - x0).toFixed(1), h: +(y1 - y0).toFixed(1) };
      };
      const content = items.filter(it => it.cls === 'content');
      const counts = {};
      for (const it of items) counts[it.cls] = (counts[it.cls] || 0) + 1;
      const bgs = items.filter(it => it.cls === 'bg').map(it => ({ tag: it.tag, x: +it.b.x.toFixed(1), y: +it.b.y.toFixed(1), w: +it.b.w.toFixed(1), h: +it.b.h.toFixed(1) }));
      const shadows = items.filter(it => it.cls === 'shadow').map(it => ({ cx: +(it.b.x + it.b.w / 2).toFixed(1), cy: +(it.b.y + it.b.h / 2).toFixed(1), w: +it.b.w.toFixed(1) }));
      // hide non-content for raster
      for (const it of items) if (it.cls !== 'content') leaves[it.i].style.display = 'none';
      const matrix = (raw.match(/matrix\(([0-9.]+) 0 0 ([0-9.]+) ([0-9.\-]+) ([0-9.\-]+)\)/) || []).slice(0, 5);
      return {
        vb: vbAttr, W, H, rootW: root.getAttribute('width'), counts, bgs, shadows,
        union: union(content), all: union(items.filter(it => it.cls !== 'empty')),
        hasMatrix: /matrix\(/.test(raw), matrix: matrix[0] || null,
        hasGradient: /Gradient/.test(raw), hasFilter: /<filter/.test(raw), hasClip: /clipPath/.test(raw),
        nText: texts.length,
      };
    });
    // raster of content only, 1 unit = 1 px (scale 2 for precision)
    const el = await page.$('svg');
    const png = path.join(outDir, path.basename(f).replace(/\.svg$/, '.mask.png'));
    await el.screenshot({ path: png, omitBackground: true });
    r.file = path.basename(f);
    r.mask = png;
    results.push(r);
  }
  fs.writeFileSync(path.join(outDir, 'misure.json'), JSON.stringify(results, null, 1));
  await browser.close();
  console.log('ok', results.length);
})();
