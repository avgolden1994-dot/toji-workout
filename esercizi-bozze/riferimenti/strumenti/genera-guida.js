// Genera esercizi-bozze/riferimenti/ex-48-guida-quote.svg (2 pannelli 1000x1000, passo 1050: START ed END)
// dalle quote di geometria-ex48.json (cinematica inversa a due segmenti). Uso: node genera-guida.js <out.svg>
const fs = require('fs');
const g = JSON.parse(fs.readFileSync(__dirname + '/geometria-ex48.json', 'utf8'));
const out = process.argv[2];
const R = v => Math.round(v);
const S = { x: g.S.x, y: g.S.y };                       // spalla destra dell'immagine (585, 450)
const SL = { x: 1000 - S.x, y: S.y };
const pose = g.tab;
const mir = p => ({ x: 1000 - p.x, y: p.y });
const gx = g.gx;
// testo con alone bianco (leggibile anche sopra lo schienale scuro); fill e grassetto come parametri (niente attributi doppi)
const txt = (x, y, s, size = 20, fill = '#333', bold = false) => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" fill="${fill}"${bold ? ' font-weight="bold"' : ''} stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">${s}</text>`;
const hline = (y, lab, col = '#999') => `<line x1="0" y1="${y}" x2="1000" y2="${y}" stroke="${col}" stroke-width="1.5" stroke-dasharray="8 8"/>` + txt(8, y - 5, lab, 17);

function pannello(k, titolo, extra) {
  const p = pose[k], gy = p.gy, E = { x: R(p.E.x), y: R(p.E.y) }, G = { x: gx, y: gy };
  const EL = mir(E), GL = mir(G);
  let s = '';
  s += '<rect width="1000" height="1000" fill="none" stroke="#bbb"/>';
  // macchina (parti ferme)
  s += '<rect x="390" y="270" width="220" height="465" rx="28" fill="#34373D"/>';                     // schienale
  s += '<rect x="178" y="70" width="24" height="860" fill="#8a919c"/><rect x="798" y="70" width="24" height="860" fill="#8a919c"/>';
  s += '<rect x="178" y="58" width="644" height="24" fill="#8a919c"/><rect x="150" y="930" width="700" height="20" fill="#8a919c"/>';
  s += '<rect x="488" y="770" width="24" height="160" fill="#8a919c"/>';
  // carrelli e maniglie (si muovono solo in verticale)
  s += `<rect x="786" y="${gy - 30}" width="48" height="60" rx="6" fill="#6B727D"/><rect x="166" y="${gy - 30}" width="48" height="60" rx="6" fill="#6B727D"/>`;
  s += `<line x1="790" y1="${gy}" x2="640" y2="${gy}" stroke="#201E1E" stroke-width="16" stroke-linecap="round"/><line x1="210" y1="${gy}" x2="360" y2="${gy}" stroke="#201E1E" stroke-width="16" stroke-linecap="round"/>`;
  // figura schematica
  s += '<path d="M455 690 Q500 700 545 690 L590 725 L585 742 L415 742 L410 725 Z" fill="#5B5E66"/>';             // bacino e cosce di scorcio
  s += '<rect x="405" y="730" width="190" height="42" rx="10" fill="#26282C" opacity=".85"/>';                     // bordo del sedile
  s += '<path d="M392 440 Q500 422 608 440 L592 520 L566 610 L572 690 L428 690 L434 610 L408 520 Z" fill="#D2B8A3"/>'; // busto
  s += '<rect x="424" y="462" width="152" height="96" rx="22" fill="#201E1E"/>';                                    // reggiseno (fondo a y=558)
  s += '<path d="M432 610 L568 610 L574 692 L426 692 Z" fill="#5B5E66"/>';                                         // vita alta dei leggings
  s += '<rect x="484" y="398" width="32" height="44" fill="#C9AE98"/>';                                              // collo
  s += '<ellipse cx="500" cy="355" rx="42" ry="55" fill="#D2B8A3"/><path d="M458 340 Q500 280 542 340 Q540 305 500 300 Q460 305 458 340 Z" fill="#2B211C"/>';
  for (const kx of [440, 560]) {
    s += `<rect x="${kx - 19}" y="705" width="38" height="201" rx="16" fill="#5B5E66"/><circle cx="${kx}" cy="705" r="28" fill="#5B5E66"/>`;
    s += `<rect x="${kx - 32}" y="902" width="64" height="48" rx="14" fill="#2F3237"/><rect x="${kx - 32}" y="940" width="64" height="10" rx="4" fill="#EDEDED"/>`;
  }
  // braccia: braccio (scuro), banda del tricipite sul lato di sotto, avambraccio, mano sulla presa, cupola del deltoide
  const braccio = (Sp, Ep, Gp) => {
    const dx = Ep.x - Sp.x, dy = Ep.y - Sp.y, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const sgn = ny > 0 ? 1 : -1;                          // normale che punta verso il basso (lato di sotto)
    const o = 12 * sgn;
    let t = `<line x1="${Sp.x}" y1="${Sp.y}" x2="${Ep.x}" y2="${Ep.y}" stroke="#C9AE98" stroke-width="40" stroke-linecap="round"/>`;
    t += `<line x1="${R(Sp.x + nx * o + dx * .25)}" y1="${R(Sp.y + ny * o + dy * .25)}" x2="${R(Sp.x + nx * o + dx * .85)}" y2="${R(Sp.y + ny * o + dy * .85)}" stroke="#fdba8c" stroke-width="12" stroke-linecap="round"/>`;
    t += `<line x1="${Ep.x}" y1="${Ep.y}" x2="${Gp.x}" y2="${Gp.y}" stroke="#D2B8A3" stroke-width="34" stroke-linecap="round"/>`;
    t += `<circle cx="${Gp.x}" cy="${Gp.y}" r="22" fill="#B8997F"/>`;
    t += `<circle cx="${Sp.x}" cy="${Sp.y}" r="30" fill="#fb8b3c"/>`;
    return t;
  };
  s += braccio(S, E, G) + braccio(SL, EL, GL);
  // linee di quota
  s += hline(70, 'traversa 70') + hline(270, 'schienale 270') + hline(300, 'testa 300') + hline(409, 'mento 409') + hline(450, 'spalle 450 (x 415 | 585)');
  s += hline(705, 'ginocchia 705') + hline(730, 'sedile 730') + hline(950, 'suole 950');
  s += '<line x1="500" y1="0" x2="500" y2="1000" stroke="#999" stroke-width="1.5" stroke-dasharray="8 8"/>';
  s += extra || '';
  // punti chiave: verde = spalla, rosso = gomito, blu = centro presa
  for (const [P, col] of [[S, '#1a8f3a'], [SL, '#1a8f3a'], [E, '#c00'], [EL, '#c00'], [G, '#06c'], [GL, '#06c']]) s += `<circle cx="${P.x}" cy="${P.y}" r="8" fill="${col}" stroke="#fff" stroke-width="2"/>`;
  const lp = k === 'start' ? [612, G.y - 40] : [470, G.y - 34], le = k === 'start' ? [612, E.y + 50] : [E.x + 28, E.y + 8];
  s += txt(lp[0], lp[1], `presa (${GL.x} | ${G.x}, ${G.y})`, 21, '#06c', true) + txt(le[0], le[1], `gomito (${EL.x} | ${E.x}, ${E.y})`, 21, '#c00', true);
  s += txt(20, 1040, titolo[0], 30, '#333', true) + txt(20, 1072, titolo[1], 21);
  return s;
}
const s = pose.start, e = pose.end;
const titoloS = ['START (bottom of the press)', `presa al mento, avambracci verticali, gomiti sotto le prese; braccio ${Math.abs(s.braccio).toFixed(0)} gradi sotto l'orizzontale, gomito ${s.gom.toFixed(0)} gradi`];
const titoloE = ['END (top of the press)', `braccia quasi tese, gomito 165 gradi; braccio ${e.braccio.toFixed(0)} gradi sopra l'orizzontale; gomiti alla fronte`];
// percorso di presa e gomito (pose di riserva) nel pannello END
let perc = `<line x1="${gx}" y1="${s.gy}" x2="${gx}" y2="${e.gy}" stroke="#06c" stroke-width="3" stroke-dasharray="4 6"/><line x1="${1000 - gx}" y1="${s.gy}" x2="${1000 - gx}" y2="${e.gy}" stroke="#06c" stroke-width="3" stroke-dasharray="4 6"/>`;
const seq = ['start', 'q1', 'mid', 'q3', 'end'].map(k => pose[k]);
perc += `<polyline points="${seq.map(p => R(p.E.x) + ',' + R(p.E.y)).join(' ')}" fill="none" stroke="#c00" stroke-width="3" stroke-dasharray="4 6"/>`;
perc += `<polyline points="${seq.map(p => (1000 - R(p.E.x)) + ',' + R(p.E.y)).join(' ')}" fill="none" stroke="#c00" stroke-width="3" stroke-dasharray="4 6"/>`;
for (const p of seq.slice(0, 4)) {
  perc += `<circle cx="${R(p.E.x)}" cy="${R(p.E.y)}" r="6" fill="#fff" stroke="#c00" stroke-width="3"/><circle cx="${gx}" cy="${p.gy}" r="6" fill="#fff" stroke="#06c" stroke-width="3"/>`;
  perc += `<circle cx="${1000 - R(p.E.x)}" cy="${R(p.E.y)}" r="6" fill="#fff" stroke="#c00" stroke-width="3"/><circle cx="${1000 - gx}" cy="${p.gy}" r="6" fill="#fff" stroke="#06c" stroke-width="3"/>`;
}
perc += txt(752, 470, 'percorso del gomito', 18) + txt(752, 492, '(pose di riserva)', 18);
const nota = `Rig START -> END (lato destro dell'immagine): braccio ruota di ${(e.braccio - s.braccio).toFixed(0)} gradi attorno alla spalla, gomito +${(e.gom - s.gom).toFixed(0)} gradi, avambraccio +${(e.avambraccioDaVerticale - s.avambraccioDaVerticale).toFixed(0)} gradi, carrelli ${e.gy - s.gy} px in verticale. Lato sinistro: x' = 1000 - x.`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2050 1130" role="img" aria-label="ex-48 guida quote: posizione di partenza e di arrivo">
<!-- Guida delle quote di ex-48 (non e' un prompt). Canvas 1000x1000 per posa, y verso il basso; pannello START a x=0, pannello END traslato di 1050.
     Scala: donna di 170 cm = 820 px in piedi (4,82 px/cm, testa 109 px). Braccio 152, gomito-centro presa 155 (avambraccio + 0,4 mano).
     Verde = spalla, rosso = gomito, blu = centro presa. Fonte: docs/prompt-esercizi/ex-48-shoulder-press-machine.md.
     Generata con la cinematica inversa a due segmenti (quote e formule nel file dell'esercizio). Per sovrapporla a una bozza: stessa scala 1000, pannello giusto.
     Serve solo all'agente per il controllo: NON va allegata in Quiver (contiene scritte). -->
<rect width="2050" height="1130" fill="#fff"/>
<g id="start">${pannello('start', titoloS)}</g>
<g id="end" transform="translate(1050 0)">${pannello('end', titoloE, perc)}</g>
${txt(20, 1115, nota, 21)}
</svg>
`;
fs.writeFileSync(out, svg);
console.log('scritto', out, svg.length, 'byte');
