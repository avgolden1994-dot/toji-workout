// Geometria di ex-48 (canvas 1000, y verso il basso), lato destro dell'immagine; il sinistro e' x' = 1000 - x.
// Scala: statura H = 820 px (donna di 170 cm, 4,82 px/cm, 7,5 teste: testa 109 px). Rapporti di Winter/Drillis-Contini.
const H = 820, cm = H / 170, testa = H / 7.5;
const r = v => Math.round(v);
const suola = 950, cimaTesta = 300, scarpa = 2.5 * cm;          // suola della scarpa circa 2,5 cm
const mento = cimaTesta + testa;                                  // 0,130 H in Winter (107); 7,5 teste -> 109
const spallaY = cimaTesta + 0.182 * H;                           // giunto gleno-omerale a 0,818 H
const ancaY = spallaY + 0.288 * H;                               // anca (grande trocantere) a 0,530 H: 0,288 H sotto la spalla
const sedile = ancaY + 0.055 * H;                                // tuberosita' ischiatiche + tessuti compressi
const ginocchio = suola - scarpa - 0.285 * H;                    // centro del ginocchio a 0,285 H dalla pianta
const caviglia = suola - scarpa - 0.039 * H;
const popliteo = ginocchio + 0.03 * H;                           // sotto-coscia vicino al ginocchio, circa 2,5 cm sotto il centro
const naso = cimaTesta + 0.70 * testa, fronte = cimaTesta + 0.18 * testa;
console.log('scala', cm.toFixed(2), 'px/cm; testa', testa.toFixed(0), 'px');
console.log({ mento: r(mento), naso: r(naso), fronte: r(fronte), spallaY: r(spallaY), ancaY: r(ancaY), sedile: r(sedile), popliteo: r(popliteo), ginocchio: r(ginocchio), caviglia: r(caviglia) });
console.log('altezza seduta (sedile->vertice)', ((sedile - cimaTesta) / H).toFixed(3), 'H; popliteo con scarpa', ((suola - sedile) / H).toFixed(3), 'H; gamba ginocchio->caviglia', ((caviglia - ginocchio) / H).toFixed(3), 'H');
// vecchia versione: ginocchio a 760 -> stinco+piede 190 px
console.log('vecchio ginocchio y=760: ginocchio->suola', 950 - 760, 'px =', ((950 - 760) / cm).toFixed(1), 'cm; atteso', r(suola - ginocchio), 'px =', ((suola - ginocchio) / cm).toFixed(1), 'cm');

// Braccio
const a = 0.186 * H;                    // braccio 152,5
const avamb = 0.146 * H, mano = 0.108 * H;
const b = avamb + 0.4 * mano;           // gomito -> centro della presa (presa a pugno a circa 0,4 della mano)
console.log('braccio', a.toFixed(1), 'avambraccio', avamb.toFixed(1), 'mano', mano.toFixed(1), 'gomito->presa', b.toFixed(1));
const A = 152, B = 155;                 // valori arrotondati usati
const S = { x: 585, y: 450 };           // spalla destra dell'immagine (sinistra della donna), spalle a 170 px = 35 cm
const gx = 690;
function ik(gy) {
  const dx = gx - S.x, dy = gy - S.y, d = Math.hypot(dx, dy);
  const gom = Math.acos((A * A + B * B - d * d) / (2 * A * B)) * 180 / Math.PI;      // angolo interno del gomito
  const alfa = Math.acos((A * A + d * d - B * B) / (2 * A * d));
  const dir = Math.atan2(dy, dx) + alfa;                                               // ramo con il gomito in basso/fuori
  const E = { x: S.x + A * Math.cos(dir), y: S.y + A * Math.sin(dir) };
  const braccio = -dir * 180 / Math.PI;                                                // + = sopra l'orizzontale
  const avDir = Math.atan2(gy - E.y, gx - E.x);
  const incl = (90 + avDir * 180 / Math.PI);                                           // 0 = verticale, + = mano piu' esterna del gomito
  return { gy, E: { x: +E.x.toFixed(1), y: +E.y.toFixed(1) }, gom: +gom.toFixed(1), braccio: +braccio.toFixed(1), avambraccioDaVerticale: +incl.toFixed(1), d: +d.toFixed(1) };
}
// START: avambraccio verticale -> gomito sotto la presa: (gx-Sx)^2 + (gy+B-Sy)^2 = A^2
const gyStart = S.y - B + Math.sqrt(A * A - (gx - S.x) ** 2);
// END: gomito a 165 gradi
const dEnd = Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(165 * Math.PI / 180));
const gyEnd = S.y - Math.sqrt(dEnd * dEnd - (gx - S.x) ** 2);
console.log('gyStart', gyStart.toFixed(1), 'gyEnd', gyEnd.toFixed(1));
const yS = 405, yE = 164, pose = { start: yS, q1: 345, mid: 285, q3: 224, end: yE };
const tab = {};
for (const [k, y] of Object.entries(pose)) tab[k] = ik(y);
console.table(Object.fromEntries(Object.entries(tab).map(([k, v]) => [k, { presaY: v.gy, gomitoX: v.E.x, gomitoY: v.E.y, gomitoSx: +(1000 - v.E.x).toFixed(1), angoloGomito: v.gom, braccioSuOrizz: v.braccio, avambraccioDaVert: v.avambraccioDaVerticale }])));
const s = tab.start, e = tab.end;
console.log('rig START->END (lato destro): spalla', (e.braccio - s.braccio).toFixed(1), 'gradi (antiorario a schermo), gomito +', (e.gom - s.gom).toFixed(1),
  ', avambraccio assoluto', (e.avambraccioDaVerticale - s.avambraccioDaVerticale).toFixed(1), 'gradi, carrello', (yE - yS), 'px');
// massima uscita laterale del gomito (braccio orizzontale) e distanza dal montante (x=810, largo 24)
console.log('gomito piu esterno x =', S.x + A, '-> bordo esterno circa', S.x + A + 20, '; montante bordo interno 798; carrello circa 790');
// controllo vecchia geometria
const old = { S: { x: 595, y: 450 }, G: { x: 725, y: 370 }, E: { x: 728, y: 530 } };
const len = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
const ang = (p, c, q) => { const u = [p.x - c.x, p.y - c.y], v = [q.x - c.x, q.y - c.y]; return Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI; };
console.log('vecchio START: braccio', len(old.S, old.E).toFixed(1), 'avambraccio+mano', len(old.E, old.G).toFixed(1), 'gomito', ang(old.S, old.E, old.G).toFixed(1));
const oldEnd = { E: { x: 674, y: 317 }, G: { x: 725, y: 165 } };
console.log('vecchio END: braccio', len(old.S, oldEnd.E).toFixed(1), 'avambraccio+mano', len(oldEnd.E, oldEnd.G).toFixed(1), 'gomito', ang(old.S, oldEnd.E, oldEnd.G).toFixed(1));
console.log('larghezza prese vecchia', 725 - 275, 'px =', ((725 - 275) / cm).toFixed(0), 'cm; nuova', 690 - 310, 'px =', ((690 - 310) / cm).toFixed(0), 'cm; spalle vecchie', 190 / cm | 0, 'cm, nuove', (170 / cm).toFixed(0), 'cm');
require('fs').writeFileSync(__dirname + '/geometria-ex48.json', JSON.stringify({ H, cm, mento, spallaY, ancaY, sedile, ginocchio, caviglia, A, B, S, gx, tab }, null, 1));
