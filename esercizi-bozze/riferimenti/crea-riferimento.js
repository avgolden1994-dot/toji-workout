#!/usr/bin/env node
/* Controllo rapido di una bozza Quiver a UNA posa e creazione dell'immagine di riferimento (PNG)
   da allegare in Quiver ai prompt delle pose successive (metodo v2, docs/metodo-immagini-v2.md).

   Uso:
     PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_PATH=/opt/node-tools/node_modules \
       node esercizi-bozze/riferimenti/crea-riferimento.js <bozza.svg> [--png out.png] [--json out.json] [--size 1024]

   Cosa fa:
   - toglie (solo nella copia in memoria) fondo, ombre a terra, scritte/etichette e tratti decorativi chiari;
     le scritte possono essere <text> oppure tracciati (Quiver disegna "START", "25%"... come path scuri:
     una parola = un path con piu' sottotracciati, oppure lettere separate in fila) -> "scritte_tracciate";
   - le ombre sono solo forme basse e larghe (almeno il 12% del lato) nella parte bassa del canvas, chiare o
     trasparenti: l'acciaio pieno #8a919c (traverse, basi, telai) resta;
   - misura il riquadro del disegno nel canvas della bozza e lo confronta con le ancore v2
     (canvas 1000: piedi/base a y=950, figura centrata su x=500) -> "controlli_v2" se la bozza e' quadrata;
   - controlli QA automatici: testo, gradienti, filtri, clipPath, immagini raster, numero di colori,
     simmetria sinistra/destra (utile per le pose frontali), numero di figure separate;
   - con --png salva il disegno pulito su fondo bianco, quadrato, con la stessa inquadratura della bozza
     riportata al canvas 1000 (e' il riferimento da allegare in Quiver). Il PNG va sempre guardato:
     le regole sono euristiche (vedi "tolti" nel JSON). */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const file = args.find(a => a.endsWith('.svg'));
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
if (!file) { console.error('manca il file .svg'); process.exit(1); }
const size = parseInt(opt('--size') || '1024', 10);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  const raw = fs.readFileSync(file, 'utf8');
  await page.setContent('<html><body style="margin:0;background:#fff">' + raw + '</body></html>');
  const rep = await page.evaluate(async (size) => {
    const root = document.querySelector('svg');
    const b0 = root.viewBox.baseVal;   // copia: baseVal e' "vivo" e cambia quando si riscrive il viewBox
    const vb = b0 && b0.width ? { x: b0.x, y: b0.y, width: b0.width, height: b0.height }
      : { x: 0, y: 0, width: parseFloat(root.getAttribute('width')), height: parseFloat(root.getAttribute('height')) };
    if (!(b0 && b0.width)) root.setAttribute('viewBox', [vb.x, vb.y, vb.width, vb.height].join(' '));
    root.setAttribute('width', vb.width); root.setAttribute('height', vb.height);
    root.style.display = 'block';
    const rr = root.getBoundingClientRect();
    const k = vb.width / rr.width;
    const box = el => { const b = el.getBoundingClientRect(); return { x: vb.x + (b.left - rr.left) * k, y: vb.y + (b.top - rr.top) * k, w: b.width * k, h: b.height * k }; };
    const rgb = c => { const m = (c || '').match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(parseFloat); return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 }; };
    const lum = c => 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    const sat = c => { const mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b); return mx ? (mx - mn) / mx : 0; };
    const opac = el => { let o = 1; for (let e = el; e && e !== root.parentNode; e = e.parentNode) o *= parseFloat(getComputedStyle(e).opacity || '1'); return o; };
    const leaves = [...root.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,text,image,use')]
      .filter(el => !el.closest('defs,clipPath,mask,metadata,pattern,symbol,linearGradient,radialGradient'));
    const lato0 = Math.min(vb.width, vb.height);   // Quiver disegna in un quadrato di questo lato
    const tolti = { fondo: 0, ombre: 0, scritte: 0, scritte_tracciate: 0, decorazioni: 0 };
    const testi = [];
    const contenuto = [];
    for (const el of leaves) {
      const cs = getComputedStyle(el), b = box(el), f = rgb(cs.fill), s = rgb(cs.stroke);
      const a = opac(el) * parseFloat(cs.fillOpacity || '1');
      let tipo = 'contenuto';
      if (el.tagName === 'text') { tipo = 'scritte'; testi.push(b); }
      else if (b.w >= 0.5 * lato0 && b.h >= 0.33 * lato0 && f && lum(f) > 0.6 && sat(f) < 0.15) tipo = 'fondo';
      // ombra a terra: bassa e larga, nella parte bassa, trasparente o grigio chiaro (non l'acciaio pieno #8a919c, lum 0,57)
      else if (b.w >= 0.12 * lato0 && b.h < 0.25 * b.w && b.y + b.h / 2 > vb.y + 0.6 * vb.height && f && sat(f) < 0.12 &&
               (a < 0.45 || lum(f) > 0.65) && el.tagName !== 'rect') tipo = 'ombre';
      // tratti decorativi: solo contorno, grigio chiaro e (tratteggiato o semitrasparente o quasi bianco);
      // un grigio pieno come #C2C3C6 resta: puo' essere una barra o un cavo
      else if ((!f || f.a === 0) && s && sat(s) < 0.15 && lum(s) > 0.7 &&
               ((cs.strokeDasharray && cs.strokeDasharray !== 'none') || opac(el) * parseFloat(cs.strokeOpacity || '1') < 0.6 || lum(s) > 0.86)) tipo = 'decorazioni';
      else if (f && lum(f) > 0.85 && sat(f) < 0.1 && a < 0.5) tipo = 'decorazioni';
      if (tipo === 'contenuto') contenuto.push({ el, b, fill: cs.fill, f, a });
      else { tolti[tipo]++; el.style.display = 'none'; }
    }
    // scritte disegnate come tracciati: forme scure piccole e isolate, cioe' il loro gruppo (forme scure piccole che si
    // toccano) non tocca nessun'altra parte del disegno (cosi' la rigatura di un'impugnatura tenuta in mano resta);
    // sono una parola (path largo con almeno 3 sottotracciati) o lettere vicine in fila (almeno 3)
    const tocca = (p, q, m) => p.x < q.x + q.w + m && q.x < p.x + p.w + m && p.y < q.y + q.h + m && q.y < p.y + p.h + m;
    const cand = contenuto.filter(c => c.el.tagName === 'path' && c.f && c.a > 0.5 && lum(c.f) < 0.35 && sat(c.f) < 0.4 &&
      c.b.h > 0.006 * lato0 && c.b.h < 0.06 * lato0 && c.b.w < 0.25 * lato0);
    const margine = 0.002 * lato0, attaccati = new Set(cand.filter(c => contenuto.some(o => !cand.includes(o) && tocca(c.b, o.b, margine))));
    for (let cambiato = true; cambiato;) {
      cambiato = false;
      for (const c of cand) if (!attaccati.has(c) && cand.some(o => attaccati.has(o) && tocca(c.b, o.b, margine))) { attaccati.add(c); cambiato = true; }
    }
    const lettere = cand.filter(c => !attaccati.has(c));
    const segnati = new Set(lettere.filter(c => ((c.el.getAttribute('d') || '').match(/[mM]/g) || []).length >= 3 && c.b.w / c.b.h >= 1.8));
    const ord = [...lettere].sort((p, q) => p.b.x - q.b.x);
    const vicine = (p, q) => { const h = Math.max(p.b.h, q.b.h), dx = q.b.x - (p.b.x + p.b.w);
      return Math.abs(q.b.y + q.b.h / 2 - (p.b.y + p.b.h / 2)) < 0.3 * h && q.b.h / p.b.h > 0.6 && q.b.h / p.b.h < 1.6 && dx > -0.2 * h && dx < h; };
    const usati = new Set();
    for (const c of ord) {
      if (usati.has(c)) continue;
      const fila = [c];
      for (let u = c, q = null; (q = ord.find(o => !usati.has(o) && !fila.includes(o) && vicine(u, o))); u = q) fila.push(q);
      if (fila.length >= 3) fila.forEach(o => { segnati.add(o); usati.add(o); });
    }
    for (const c of segnati) { c.el.style.display = 'none'; c.tolto = true; tolti.scritte_tracciate++; }
    // etichette a pillola: rettangoli piccoli che contengono una scritta
    for (const c of contenuto) {
      if (c.tolto || c.el.tagName !== 'rect' || c.b.w > 0.1 * vb.width) continue;
      if (testi.some(t => { const x = t.x + t.w / 2, y = t.y + t.h / 2; return x >= c.b.x && x <= c.b.x + c.b.w && y >= c.b.y && y <= c.b.y + c.b.h; })) {
        c.el.style.display = 'none'; c.tolto = true; tolti.scritte++;
      }
    }
    const vivi = contenuto.filter(c => !c.tolto && c.b.w + c.b.h > 0);
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const c of vivi) { x0 = Math.min(x0, c.b.x); y0 = Math.min(y0, c.b.y); x1 = Math.max(x1, c.b.x + c.b.w); y1 = Math.max(y1, c.b.y + c.b.h); }
    const colori = new Set(vivi.map(c => c.fill).filter(f => f && f !== 'none'));
    // immagine del disegno pulito -> maschera per simmetria e numero di figure
    const clone = root.cloneNode(true);
    clone.setAttribute('width', 400); clone.setAttribute('height', Math.round(400 * vb.height / vb.width));
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone));
    const img = new Image(); img.src = url; await img.decode();
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
    const ctx = cv.getContext('2d'); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    const W = cv.width, H = cv.height, m = new Uint8Array(W * H);
    let mx0 = W, mx1 = -1;
    for (let i = 0; i < W * H; i++) if (d[i * 4 + 3] > 20) { m[i] = 1; const x = i % W; if (x < mx0) mx0 = x; if (x > mx1) mx1 = x; }
    const cxm = (mx0 + mx1) / 2;
    let inter = 0, uni = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const xm = Math.round(2 * cxm - x); const a1 = m[y * W + x], a2 = xm >= 0 && xm < W ? m[y * W + xm] : 0;
      if (a1 && a2) inter++; if (a1 || a2) uni++;
    }
    // figure separate: colonne vuote larghe almeno 3% della larghezza dividono il disegno
    const col = new Array(W).fill(0); for (let i = 0; i < W * H; i++) if (m[i]) col[i % W] = 1;
    let gruppi = 0, vuoto = 99;
    for (let x = 0; x < W; x++) { if (col[x]) { if (vuoto >= Math.max(3, W * 0.03)) gruppi++; vuoto = 0; } else vuoto++; }
    // PNG di riferimento: il quadrato centrale di lato min(larghezza, altezza), cioe' il canvas in cui Quiver
    // disegna davvero (per una bozza quadrata e' il canvas intero), riportato alla scala 1000
    const lato = lato0;
    root.setAttribute('viewBox', [vb.x - (lato - vb.width) / 2, vb.y - (lato - vb.height) / 2, lato, lato].join(' '));
    root.setAttribute('width', size); root.setAttribute('height', size);
    const s1000 = v => Math.round(v * 1000 / lato);
    const riq = { x0: s1000(x0 - vb.x + (lato - vb.width) / 2), y0: s1000(y0 - vb.y + (lato - vb.height) / 2), x1: s1000(x1 - vb.x + (lato - vb.width) / 2), y1: s1000(y1 - vb.y + (lato - vb.height) / 2) };
    const quadrato = Math.abs(vb.width - vb.height) < 1;
    const gradienti = !!root.querySelector('linearGradient,radialGradient'), filtri = !!root.querySelector('filter');
    return {
      viewBox: [vb.x, vb.y, vb.width, vb.height].map(v => +v.toFixed(2)),
      quadrato,
      riquadro_disegno_canvas1000: riq,
      riempimento_altezza: +((y1 - y0) / vb.height).toFixed(3),
      tolti, elementi_disegno: vivi.length, colori_distinti: colori.size,
      gradienti, filtri,
      clipPath: !!root.querySelector('clipPath'), raster: !!root.querySelector('image'),
      simmetria_iou: +(inter / Math.max(1, uni)).toFixed(3), figure_separate: gruppi,
      // soglie del metodo v2 (§7.2), solo per le bozze quadrate a una figura
      controlli_v2: quadrato ? {
        base_a_950: Math.abs(riq.y1 - 950) <= 25, centro_x_500: Math.abs((riq.x0 + riq.x1) / 2 - 500) <= 30,
        nessuna_scritta: tolti.scritte + tolti.scritte_tracciate === 0, una_figura: gruppi === 1,
        senza_gradienti_filtri: !gradienti && !filtri
      } : null
    };
  }, size);
  rep.file = path.basename(file);
  const out = JSON.stringify(rep, null, 1);
  if (opt('--json')) fs.writeFileSync(opt('--json'), out);
  if (opt('--png')) { const el = await page.$('svg'); await el.screenshot({ path: opt('--png') }); rep.png = opt('--png'); }
  console.log(out);
  await browser.close();
})();
