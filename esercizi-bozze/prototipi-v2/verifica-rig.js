#!/usr/bin/env node
/* verifica-rig.js - controlli automatici su un SVG animato (rig o crossfade) prima di consegnarlo.
   uso: node verifica-rig.js file.svg [--sheet foglio.png] [--width 520] [--fps 30]
   Controlli:
   - peso del file (<= 60 KB), viewBox che parte da 0 0 (perni CSS non ambigui), nomi con prefisso
   - nessuna animazione di opacita' (crossfade = fantasmi) [avviso]
   - riduzione movimento: con prefers-reduced-motion la figura e' identica alla posa START (t=0)
   - giunzione del ciclo: t=0 e t=durata-1 frame quasi identici
   - fluidita': differenza media tra fotogrammi consecutivi (MAD) su tutto il ciclo; indice di scatto
     (media |dMAD| / media MAD) e salto massimo (max |dMAD| / media MAD). Un salto > 0.5 indica uno
     scatto (es. cinematica inversa che cambia ramo, angolo che fa il giro lungo).
   - foglio di controllo (contact sheet) PNG con 12 fotogrammi del ciclo, da guardare SEMPRE.
   Richiede playwright-core (devDependency del repo) e Chromium in /opt/pw-browsers/chromium
   (o variabile CHROMIUM). */
'use strict';
const fs = require('fs');
const path = require('path');
let chromium;
try { ({ chromium } = require('playwright-core')); } catch (e) { ({ chromium } = require('playwright')); }

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const file = path.resolve(args[0]);
const sheet = opt('sheet', file.replace(/\.svg$/, '-foglio.png'));
const width = +opt('width', 520);
const fps = +opt('fps', 30);

(async () => {
  const src = fs.readFileSync(file, 'utf8');
  const out = [];
  let bad = 0;
  const ok = (c, m, warn) => { out.push((c ? '  ok    ' : (warn ? '  AVVISO ' : '  MALE  ')) + m); if (!c && !warn) bad++; };
  const kb = fs.statSync(file).size / 1024;
  ok(kb <= 60, `peso ${kb.toFixed(1)} KB (limite 60)`);
  const vb = src.match(/viewBox="([^"]+)"/)[1].trim().split(/[\s,]+/).map(Number);
  ok(vb[0] === 0 && vb[1] === 0, `viewBox ${vb.join(' ')} (0 0 consigliato per transform-origin)`, true);
  ok(!/@keyframes[^{]*\{[^}]*opacity/.test(src), 'nessuna animazione di opacita\' (crossfade)', true);
  ok(/prefers-reduced-motion/.test(src), 'regola prefers-reduced-motion presente');
  const durM = src.match(/animation:\s*([\d.]+)s/);
  const dur = durM ? +durM[1] * 1000 : 5400;
  const height = Math.round(width * vb[3] / vb[2]);
  const exe = process.env.CHROMIUM || '/opt/pw-browsers/chromium';
  const browser = await chromium.launch(fs.existsSync(exe) && fs.statSync(exe).isFile() ? { executablePath: exe } : {});
  const shoot = async (reduced, times) => {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    await page.goto('file://' + file);
    await page.evaluate(() => { const s = document.documentElement; if (s.pauseAnimations) s.pauseAnimations(); document.getAnimations().forEach(a => a.pause()); });
    const shots = [];
    for (const t of times) {
      await page.evaluate(t => { const s = document.documentElement; if (s.setCurrentTime) s.setCurrentTime(t / 1000); document.getAnimations().forEach(a => { a.currentTime = t; }); }, t);
      shots.push((await page.screenshot()).toString('base64'));
    }
    await page.close();
    return shots;
  };
  const n = Math.round(dur / 1000 * fps);
  const times = Array.from({ length: n }, (_, i) => i * 1000 / fps);
  const frames = await shoot(false, times);
  const [redMid] = await shoot(true, [dur / 4]);
  const [last] = await shoot(false, [dur - 1000 / 60]);
  // pixel analysis in a blank page (canvas)
  const ana = await browser.newPage();
  const res = await ana.evaluate(async ({ frames, redMid, last, width, height }) => {
    const load = b64 => new Promise(r => { const im = new Image(); im.onload = () => r(im); im.src = 'data:image/png;base64,' + b64; });
    const cv = document.createElement('canvas'); cv.width = width; cv.height = height;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const px = async b64 => { const im = await load(b64); cx.clearRect(0, 0, width, height); cx.drawImage(im, 0, 0); return cx.getImageData(0, 0, width, height).data; };
    // blurred 3x3 luminance difference: ignores 1-px anti-aliasing changes, catches real pose changes
    const lum = a => { const L = new Float32Array(width * height); for (let i = 0, j = 0; i < a.length; i += 4, j++) L[j] = (a[i] + a[i + 1] + a[i + 2]) / 3; return L; };
    const blur = L => { const B = new Float32Array(L.length); for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) { let s = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += L[(y + dy) * width + x + dx]; B[y * width + x] = s / 9; } return B; };
    const diff = (a, b) => { const A = blur(lum(a)), Bb = blur(lum(b)); let s = 0, c = 0; for (let j = 0; j < A.length; j++) { const d = Math.abs(A[j] - Bb[j]); s += d; if (d > 40) c++; } return { mean: s / A.length, changed: c }; };
    const data = []; for (const f of frames) data.push(await px(f));
    // union of moving pixels for normalisation
    const n = data.length, npx = width * height;
    const union = new Uint8Array(npx);
    for (let k = 1; k < n; k++) { const a = data[k], b = data[0]; for (let i = 0, j = 0; i < a.length; i += 4, j++) if (a[i] !== b[i] || a[i + 1] !== b[i + 1] || a[i + 2] !== b[i + 2]) union[j] = 1; }
    const U = union.reduce((s, v) => s + v, 0) || 1;
    const mad = [];
    for (let k = 0; k < n; k++) { const a = data[k], b = data[(k + 1) % n]; let s = 0; for (let i = 0, j = 0; i < a.length; i += 4, j++) if (union[j]) s += (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2])) / 3; mad.push(s / U); }
    const mx = Math.max(...mad); const mv = mad.filter(v => v > 0.05 * mx);
    const mean = mv.reduce((s, v) => s + v, 0) / (mv.length || 1);
    const d = mad.slice(1).map((v, i) => Math.abs(v - mad[i]));
    const jerk = d.reduce((s, v) => s + v, 0) / d.length / (mean || 1);
    let jmax = 0, at = 0; d.forEach((v, i) => { if (v / (mean || 1) > jmax) { jmax = v / (mean || 1); at = i; } });
    const red = diff(await px(redMid), data[0]);
    const seam = diff(await px(last), data[0]);
    return { jerk, jmax, at, red, seam, U };
  }, { frames, redMid, last, width, height });
  ok(res.red.changed <= width * height * 0.001, `riduzione movimento = posa START (${res.red.changed} pixel diversi oltre la tolleranza)`);
  ok(res.seam.mean < 0.5, `giunzione del ciclo (diff media ${res.seam.mean.toFixed(3)})`);
  ok(res.jerk < 0.06, `indice di scatto ${res.jerk.toFixed(3)} (rig fluido < 0.06; crossfade 5 pose ~0.08-0.15)`, true);
  ok(res.jmax < 0.5, `salto massimo ${res.jmax.toFixed(2)} a t=${(res.at * 1000 / fps / 1000).toFixed(2)} s (> 0.5 = scatto da controllare)`);
  // contact sheet
  const pick = Array.from({ length: 12 }, (_, i) => Math.round(i * n / 12));
  const html = `<html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(6,${width / 2}px);gap:4px;font:10px sans-serif">` +
    pick.map(i => `<div style="background:#fff"><div>t=${(times[i] / 1000).toFixed(2)} s</div><img width="${width / 2}" src="data:image/png;base64,${frames[i]}"></div>`).join('') + '</body></html>';
  await ana.setViewportSize({ width: 6 * (width / 2 + 4), height: 2 * (height / 2 + 20) });
  await ana.setContent(html);
  await ana.screenshot({ path: sheet, fullPage: true });
  await browser.close();
  console.log(path.basename(file));
  out.forEach(l => console.log(l));
  console.log(`  foglio di controllo: ${sheet}`);
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
