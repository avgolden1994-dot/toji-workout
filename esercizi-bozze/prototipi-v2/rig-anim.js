#!/usr/bin/env node
/* rig-anim.js - genera un SVG animato "a rig" (tween di trasformazioni CSS) da UN disegno START
   diviso in parti, piu' un file JSON di rig. Nessuna dipendenza (Node >= 16).

   uso:  node rig-anim.js rig.json [-o out.svg]

   Idea: ogni parte mobile (braccio, avambraccio, manubrio, deltoide...) e' un <g id="..."> nel file
   "parts" (coordinate della posa START). Il rig dice dove sono i perni (spalla, gomito, mano) e
   quanto ruota/trasla/scala ogni parte alla fine della corsa (posa END). Tutti i canali sono funzione
   di un unico avanzamento p (0 = START, 1 = END) che segue la curva di easing del ciclo:
   pausa in basso -> salita (easeUp) -> pausa in alto -> discesa (easeDown) -> pausa in basso.
   Canali lineari in p: 2 keyframe per fase con l'easing globale (esatto).
   Canali non lineari (aim/IK, finestre): keyframe a passi uguali di p con il pezzo ESATTO della curva
   di easing su ogni segmento (suddivisione di de Casteljau) -> velocita' continua, niente scatti.

   Formato rig.json (coordinate = quelle del file parts, posa START):
   {
     "id": "e50",                       prefisso di classi e keyframes (sicuro anche se inline)
     "parts": "ex-50-parts.svg",        file con i <g id> (percorso relativo al json)
     "label": "Alzate Laterali (frontale)",
     "viewBox": [790.5, 77.5, 173.3, 130],   (riquadro nelle coordinate del parts; l'output e' 0 0 W H)
     "duration": 5.4,
     "timeline": {"bottomHold": 6, "top": 40, "topHold": 46, "bottom": 95,
                  "easeUp": [0.47,0,0.53,1], "easeDown": [0.42,0,0.58,1], "keys": 10},
     "layers": [ "torso", "head",                 parti statiche (id), nell'ordine di disegno
       {"node": "armL", "pivot": [866,108.5], "rotate": 80, "translate": [0,-0.9],
        "children": [ {"node": "dbL", "pivot": [860.46,144.89], "rotate": -80} ]},
       {"node": "delL", "pivot": [866,108.5], "rotate": "armL*0.55",
        "scale": [1.1,0.9], "scaleOrigin": [867.2,108.4], "translate": [0,-0.9]},
       {"node": "uaL", "pivot": [866.3,116], "ik2": {"elbow": [865.6,132.8], "wrist": [865.6,148.5],
        "target": "bar", "side": "L", "foreshorten": 0.75}, "translate": [0,-1.5],
        "children": [ {"node": "faL", "pivot": [865.6,132.8], "aim": {"from": [865.6,132.8],
                       "to": [865.6,148.5], "target": "bar", "maxStretch": 1.08}} ]},
       {"node": "bar", "translate": [0,-44]}
     ]
   }
   Canali di un nodo (valori alla posa END, START = identita'): rotate (gradi, oppure "altroNodo*k"),
   translate [dx,dy], scale [sx,sy] attorno a scaleOrigin (asse scaleAxis gradi, default 0),
   window [p0,p1] (il nodo si muove solo in quella parte della corsa), ik2 (angolo finale del braccio
   da cinematica inversa a 2 segmenti, poi rotazione lineare in p), aim (il nodo punta un punto di un
   altro nodo e si accorcia/allunga lungo il proprio asse: avambraccio verso il polso),
   empty:true (nodo senza disegno, solo gruppo di trasformazione: es. spalle che salgono con le braccia dentro).
   Riduzione movimento: @media (prefers-reduced-motion:reduce) -> animation:none = posa START.
*/
'use strict';
const fs = require('fs');
const path = require('path');

// ------------------------------------------------------------------ util
const f = (v, p = 3) => {
  let s = Number(v).toFixed(p);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s === '-0' ? '0' : s;
};
const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;

// affine 2x3 [a,b,c,d,e,f] (x' = a x + c y + e ; y' = b x + d y + f)
const M = {
  id: () => [1, 0, 0, 1, 0, 0],
  mul: (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]],
  tr: (x, y) => [1, 0, 0, 1, x, y],
  rot: a => { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); return [c, s, -s, c, 0, 0]; },
  sc: (x, y) => [x, 0, 0, y, 0, 0],
  ap: (m, p) => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]],
};

// ------------------------------------------------------------------ easing
function bezier(x1, y1, x2, y2) {
  const P = [[0, 0], [x1, y1], [x2, y2], [1, 1]];
  const at = u => {
    const a = (1 - u) ** 3, b = 3 * u * (1 - u) ** 2, c = 3 * u * u * (1 - u), d = u ** 3;
    return [a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1]];
  };
  return { P, at };
}
// split easing into n equal-PROGRESS segments; returns [{x, p, tf}]
function easeSegments(e, n) {
  const B = bezier(...e);
  const uFor = p => { let lo = 0, hi = 1; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (B.at(m)[1] < p) lo = m; else hi = m; } return (lo + hi) / 2; };
  const lerp = (a, b, t) => [(1 - t) * a[0] + t * b[0], (1 - t) * a[1] + t * b[1]];
  const split = (pts, t) => {
    const p01 = lerp(pts[0], pts[1], t), p12 = lerp(pts[1], pts[2], t), p23 = lerp(pts[2], pts[3], t);
    const p012 = lerp(p01, p12, t), p123 = lerp(p12, p23, t), p0123 = lerp(p012, p123, t);
    return [[pts[0], p01, p012, p0123], [p0123, p123, p23, pts[3]]];
  };
  const sub = (ua, ub) => {
    const right = split(B.P, ua)[1];
    const t2 = ua < 1 ? (ub - ua) / (1 - ua) : 0;
    const L = split(right, t2)[0];
    const dx = L[3][0] - L[0][0], dy = L[3][1] - L[0][1];
    const c = v => Math.min(1, Math.max(0, v));
    return `cubic-bezier(${f(c((L[1][0] - L[0][0]) / dx))},${f((L[1][1] - L[0][1]) / dy)},${f(c((L[2][0] - L[0][0]) / dx))},${f((L[2][1] - L[0][1]) / dy)})`;
  };
  const us = [0]; for (let k = 1; k < n; k++) us.push(uFor(k / n)); us.push(1);
  return us.map((u, k) => ({ x: B.at(u)[0], p: k / n, tf: k < n ? sub(us[k], us[k + 1]) : null }));
}

// ------------------------------------------------------------------ parts file
function extractGroups(svg) {
  const out = {};
  const re = /<g\b[^>]*\bid="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(svg))) {
    let depth = 1, i = re.lastIndex;
    const tag = /<\/?g\b[^>]*>/g; tag.lastIndex = i;
    let t;
    while (depth && (t = tag.exec(svg))) {
      if (t[0].startsWith('</')) depth--; else if (!t[0].endsWith('/>')) depth++;
      if (!depth) { out[m[1]] = svg.slice(i, t.index).trim(); }
    }
  }
  return out;
}

// ------------------------------------------------------------------ main
function build(rigPath) {
  const rig = JSON.parse(fs.readFileSync(rigPath, 'utf8'));
  const dir = path.dirname(rigPath);
  const parts = extractGroups(fs.readFileSync(path.resolve(dir, rig.parts), 'utf8'));
  const P = rig.id ? rig.id + '-' : '';
  const [x0, y0, W, H] = rig.viewBox;
  const dur = rig.duration || 5.4;
  const tl = Object.assign({ bottomHold: 6, top: 40, topHold: 46, bottom: 95, easeUp: [0.47, 0, 0.53, 1], easeDown: [0.42, 0, 0.58, 1], keys: 10 }, rig.timeline || {});

  // flatten node tree
  const nodes = {}; const order = [];
  const walk = (n, parent) => { n.parent = parent; nodes[n.node] = n; order.push(n); (n.children || []).forEach(c => walk(c, n)); };
  rig.layers.forEach(l => { if (typeof l === 'object' && l.node) walk(l, null); });
  for (const n of order) if (!n.empty && !(n.node in parts)) throw new Error('parte mancante nel file parts: ' + n.node);

  // resolve "other*k" rotations and ik2 end angles
  const ang = v => deg(Math.atan2(v[1], v[0]));
  const endRot = {};
  const resolveRot = n => {
    if (n.node in endRot) return endRot[n.node];
    let r = 0;
    if (typeof n.rotate === 'number') r = n.rotate;
    else if (typeof n.rotate === 'string') { const [o, k] = n.rotate.split('*'); r = resolveRot(nodes[o.trim()]) * (k ? +k : 1); }
    else if (n.ik2) {
      const S = n.pivot, E = n.ik2.elbow, Wr = n.ik2.wrist;
      const L1 = Math.hypot(E[0] - S[0], E[1] - S[1]), L2 = Math.hypot(Wr[0] - E[0], Wr[1] - E[1]) * (n.ik2.foreshorten || 1);
      const tgt = nodes[n.ik2.target]; const tEnd = tgt.translate || [0, 0];
      const sh = n.translate || [0, 0];
      const Se = [S[0] + sh[0], S[1] + sh[1]], We = [Wr[0] + tEnd[0], Wr[1] + tEnd[1]];
      let d = Math.hypot(We[0] - Se[0], We[1] - Se[1]); d = Math.min(d, L1 + L2 - 1e-6);
      const a = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))));
      const base = Math.atan2(We[1] - Se[1], We[0] - Se[0]);
      const cands = [base + a, base - a].map(t => [Se[0] + L1 * Math.cos(t), Se[1] + L1 * Math.sin(t)]);
      const Ee = n.ik2.side === 'L' ? cands.reduce((A, B) => A[0] < B[0] ? A : B) : cands.reduce((A, B) => A[0] > B[0] ? A : B);
      let dth = ang([Ee[0] - Se[0], Ee[1] - Se[1]]) - ang([E[0] - S[0], E[1] - S[1]]);
      // turn through the lateral side (L: increasing angle, R: decreasing)
      dth = n.ik2.side === 'L' ? ((dth % 360) + 360) % 360 : -((((-dth) % 360) + 360) % 360);
      r = dth;
      n._ikInfo = { L1, L2, elbowEnd: Ee };
    }
    endRot[n.node] = r; return r;
  };
  order.forEach(resolveRot);

  // progress of a node given global p (window)
  const prog = (n, p) => { if (!n.window) return p; const [a, b] = n.window; return Math.min(1, Math.max(0, (p - a) / (b - a))); };
  const nonlinear = n => !!(n.aim || n.window);

  // local transform parameters of node at global progress p
  const params = (n, p, worldOf) => {
    const q = prog(n, p);
    const t = n.translate ? [n.translate[0] * q, n.translate[1] * q] : [0, 0];
    let a = endRot[n.node] * q;
    let s = n.scale ? [1 + (n.scale[0] - 1) * q, 1 + (n.scale[1] - 1) * q] : [1, 1];
    let axis = n.scaleAxis || 0;
    if (n.aim) {
      // world position of joint (through parent) and of target point (through target node)
      const parentW = n.parent ? worldOf(n.parent) : M.id();
      const jointW = M.ap(parentW, n.aim.from);
      const tgtW = M.ap(worldOf(nodes[n.aim.target]), n.aim.to);
      const v0 = [n.aim.to[0] - n.aim.from[0], n.aim.to[1] - n.aim.from[1]];
      const v1 = [tgtW[0] - jointW[0], tgtW[1] - jointW[1]];
      const parentRot = deg(Math.atan2(parentW[1], parentW[0]));
      a = ang(v1) - ang(v0) - parentRot;
      let k = Math.hypot(v1[0], v1[1]) / Math.hypot(v0[0], v0[1]);
      k = Math.min(k, n.aim.maxStretch || 1.08);
      s = [1, k]; axis = ang(v0) - 90;   // stretch along the START axis of the segment
      n._stretch = n._stretch || [9, 0]; n._stretch = [Math.min(n._stretch[0], k), Math.max(n._stretch[1], k)];
    }
    return { t, a, s, axis };
  };
  const localM = (n, prm) => {
    const pv = n.pivot || [0, 0], O = n.scaleOrigin || (n.aim ? n.aim.from : pv);
    let m = M.tr(prm.t[0], prm.t[1]);
    m = M.mul(m, M.tr(pv[0], pv[1])); m = M.mul(m, M.rot(prm.a)); m = M.mul(m, M.tr(O[0] - pv[0], O[1] - pv[1]));
    m = M.mul(m, M.rot(prm.axis)); m = M.mul(m, M.sc(prm.s[0], prm.s[1])); m = M.mul(m, M.rot(-prm.axis)); m = M.mul(m, M.tr(-O[0], -O[1]));
    return m;
  };
  const evalAll = p => {
    const cache = {}; const prmOut = {};
    const worldOf = n => {
      if (cache[n.node]) return cache[n.node];
      const prm = params(n, p, worldOf); prmOut[n.node] = prm;
      const m = M.mul(n.parent ? worldOf(n.parent) : M.id(), localM(n, prm));
      cache[n.node] = m; return m;
    };
    order.forEach(worldOf);
    return prmOut;
  };

  // keyframe schedule: [{t (percent), p, tf}] dense (for nonlinear nodes) and sparse (linear nodes)
  const sched = dense => {
    const k = dense ? tl.keys : 1;
    const out = [{ t: 0, p: 0, tf: null }];
    easeSegments(tl.easeUp, k).forEach(s => out.push({ t: tl.bottomHold + (tl.top - tl.bottomHold) * s.x, p: s.p, tf: s.tf }));
    easeSegments(tl.easeDown, k).forEach(s => out.push({ t: tl.topHold + (tl.bottom - tl.topHold) * s.x, p: 1 - s.p, tf: s.tf }));
    out.push({ t: 100, p: 0, tf: null });
    return out;
  };
  const tfStr = (n, prm) => {
    // minimal function list per node (same list in every keyframe -> exact component interpolation)
    const pv = n.pivot || [0, 0];
    const hasRot = !!(n.aim || endRot[n.node]);
    const hasScale = !!(n.scale || n.aim);
    const O = n.scaleOrigin || (n.aim ? n.aim.from : pv);
    const X = v => f(v - x0), Y = v => f(v - y0);   // rebased coordinates
    let s = `translate(${f(prm.t[0])}px,${f(prm.t[1])}px)`;
    if (hasRot) {
      s += ` translate(${X(pv[0])}px,${Y(pv[1])}px) rotate(${f(prm.a, 2)}deg)`;
      if (hasScale) s += ` translate(${f(O[0] - pv[0])}px,${f(O[1] - pv[1])}px) rotate(${f(prm.axis, 2)}deg) scale(${f(prm.s[0], 4)},${f(prm.s[1], 4)}) rotate(${f(-prm.axis, 2)}deg) translate(${f(-(O[0] - x0))}px,${f(-(O[1] - y0))}px)`;
      else s += ` translate(${f(-(pv[0] - x0))}px,${f(-(pv[1] - y0))}px)`;
    } else if (hasScale) {
      s += ` translate(${X(O[0])}px,${Y(O[1])}px) rotate(${f(prm.axis, 2)}deg) scale(${f(prm.s[0], 4)},${f(prm.s[1], 4)}) rotate(${f(-prm.axis, 2)}deg) translate(${f(-(O[0] - x0))}px,${f(-(O[1] - y0))}px)`;
    }
    return s;
  };
  // a node needs dense keys if it, or anything it depends on through aim, is nonlinear
  const needsDense = n => nonlinear(n);
  const css = [`.${P}mv{transform-box:view-box;transform-origin:0 0;animation:${f(dur, 3)}s infinite linear}`];
  const names = [];
  for (const n of order) {
    const S = sched(needsDense(n));
    const frames = S.map(k => ({ k, prm: evalAll(k.p)[n.node] }));
    let kf = '';
    for (const { k, prm } of frames) kf += `${f(k.t)}%{transform:${tfStr(n, prm)}${k.tf ? ';animation-timing-function:' + k.tf : ''}}`;
    css.push(`@keyframes ${P}${n.node}{${kf}}`);
    names.push(`.${P}${n.node}{animation-name:${P}${n.node}}`);
  }
  css.splice(1, 0, names.join(''));
  css.push(`@media (prefers-reduced-motion:reduce){.${P}mv{animation:none!important}}`);

  // markup
  const wrapStatic = id => { if (!(id in parts)) throw new Error('parte statica mancante: ' + id); return parts[id]; };
  const emitNode = n => {
    const kids = (n.children || []).map(emitNode).join('\n');
    const own = n.empty ? '' : `\n<g transform="translate(${f(-x0)} ${f(-y0)})">${parts[n.node]}</g>`;
    return `<g class="${P}mv ${P}${n.node}">${own}${kids ? '\n' + kids : ''}\n</g>`;
  };
  const body = []; let staticBuf = [];
  const flush = () => { if (staticBuf.length) { body.push(`<g transform="translate(${f(-x0)} ${f(-y0)})">\n${staticBuf.join('\n')}\n</g>`); staticBuf = []; } };
  for (const l of rig.layers) {
    if (typeof l === 'string') staticBuf.push(wrapStatic(l));
    else { flush(); body.push(emitNode(l)); }
  }
  flush();
  const info = order.filter(n => n._stretch || n._ikInfo).map(n => n.node + (n._stretch ? ` stretch ${f(n._stretch[0], 3)}..${f(n._stretch[1], 3)}` : '') + (n._ikInfo ? ` ik L1 ${f(n._ikInfo.L1, 2)} L2' ${f(n._ikInfo.L2, 2)} rot ${f(endRot[n.node], 1)}deg` : ''));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${f(H)}" fill="none" role="img" aria-label="${rig.label || ''}">\n` +
    `<!-- generato da rig-anim.js (${path.basename(rigPath)}): tween di trasformazioni da un solo disegno START -->\n` +
    `<style>\n${css.join('\n')}\n</style>\n${body.join('\n')}\n</svg>\n`;
  return { svg, info };
}

if (require.main === module) {
  const a = process.argv.slice(2);
  if (!a.length) { console.error('uso: node rig-anim.js rig.json [-o out.svg]'); process.exit(2); }
  const oi = a.indexOf('-o');
  const { svg, info } = build(a[0]);
  const out = oi >= 0 ? a[oi + 1] : a[0].replace(/\.json$/, '.svg');
  fs.writeFileSync(out, svg);
  console.log(`${out}: ${svg.length} byte`);
  info.forEach(s => console.log('  ' + s));
}
module.exports = { build, easeSegments, extractGroups };
