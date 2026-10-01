/* Schede esercizio: disegno e spiegazione
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDE ESERCIZIO: disegno + spiegazione semplice
   I disegni sono omini stilizzati fatti a mano in SVG: niente foto di
   terzi, niente da scaricare, funzionano offline. Ogni esercizio e'
   ricondotto al suo SCHEMA DI MOVIMENTO, perche' venti esercizi di spinta
   si spiegano con le stesse tre regole.
   ============================================================ */

/* --- Disegni anatomici: sagome piene con volumi, non omini a bastoncino ---
   Ogni arto e' una capsula con spessore variabile (coscia piu' larga del
   polpaccio, braccio piu' largo dell avambraccio), il tronco e' una sagoma
   che si stringe in vita: cosi la figura si legge come un corpo e non come
   uno schema. Tutto disegnato a mano in SVG, senza immagini di terzi. */

/* capsula tra due punti, con spessore che rastrema */
function arto(x1, y1, x2, y2, w1, w2, cls) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const a1 = w1 / 2, a2 = w2 / 2;
  const p = [
    [x1 + nx * a1, y1 + ny * a1],
    [x2 + nx * a2, y2 + ny * a2],
    [x2 - nx * a2, y2 - ny * a2],
    [x1 - nx * a1, y1 - ny * a1]
  ].map(c => c[0].toFixed(1) + ' ' + c[1].toFixed(1));
  return '<path class="' + (cls || 'bd') + '" d="M' + p[0] + ' L' + p[1] +
    ' A' + a2 + ' ' + a2 + ' 0 0 1 ' + p[2] + ' L' + p[3] +
    ' A' + a1 + ' ' + a1 + ' 0 0 1 ' + p[0] + ' Z"/>';
}

/* tronco: spalle larghe, vita stretta, bacino */
function tronco(sx, sy, hx, hy, ws, wv, wh) {
  const dx = hx - sx, dy = hy - sy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const mx = sx + dx * 0.55, my = sy + dy * 0.55;
  const P = (x, y, n, w) => (x + nx * n * w).toFixed(1) + ' ' + (y + ny * n * w).toFixed(1);
  return '<path class="bd" d="M' + P(sx, sy, 1, ws / 2) +
    ' Q' + P(mx, my, 1, wv / 2) + ' ' + P(hx, hy, 1, wh / 2) +
    ' L' + P(hx, hy, -1, wh / 2) +
    ' Q' + P(mx, my, -1, wv / 2) + ' ' + P(sx, sy, -1, ws / 2) + ' Z"/>';
}

function testa(x, y, r, rot) {
  return '<ellipse class="bd" cx="' + x + '" cy="' + y + '" rx="' + (r * 0.82) + '" ry="' + r +
    '" transform="rotate(' + (rot || 0) + ' ' + x + ' ' + y + ')"/>';
}

function bilanciere(x, y, w, ang) {
  const half = (w || 40) / 2;
  const g = '<g transform="rotate(' + (ang || 0) + ' ' + x + ' ' + y + ')">' +
    '<rect class="bar" x="' + (x - half) + '" y="' + (y - 1.8) + '" width="' + (half * 2) + '" height="3.6" rx="1.8"/>' +
    '<rect class="plate" x="' + (x - half - 4) + '" y="' + (y - 11) + '" width="7" height="22" rx="2.5"/>' +
    '<rect class="plate" x="' + (x + half - 3) + '" y="' + (y - 11) + '" width="7" height="22" rx="2.5"/>' +
    '</g>';
  return g;
}

function manubrio(x, y) {
  return '<g><rect class="bar" x="' + (x - 7) + '" y="' + (y - 1.6) + '" width="14" height="3.2" rx="1.6"/>' +
    '<rect class="plate" x="' + (x - 11) + '" y="' + (y - 6) + '" width="5" height="12" rx="2"/>' +
    '<rect class="plate" x="' + (x + 6) + '" y="' + (y - 6) + '" width="5" height="12" rx="2"/></g>';
}

function freccia(x1, x2, y) {
  return '<g class="arrow" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x2 - 8) + '" y2="' + y + '"/>' +
    '<path d="M' + (x2 - 10) + ' ' + (y - 6) + ' L ' + x2 + ' ' + y + ' L ' + (x2 - 10) + ' ' + (y + 6) + '"/></g>';
}

function suolo(y) {
  return '<line class="ground" x1="10" y1="' + (y || 150) + '" x2="290" y2="' + (y || 150) + '" stroke-width="2.5" stroke-linecap="round"/>';
}

function wrapSvg(inner, pedana) {
  return '<svg viewBox="0 0 300 165" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" class="ex-draw" role="img" aria-label="Disegno del movimento">' +
    (pedana === false ? '' : suolo(150)) + inner + '</svg>';
}

/* --- pose --- */
/* figura in piedi, vista di lato: x = centro, alza/abbassa via offset */
function inPiedi(x, opts) {
  const o = opts || {};
  const sy = 56, hy = 96;          /* spalle, anca */
  return testa(x + 1, 34, 11) +
    arto(x, 44, x, sy, 9, 13) +                       /* collo */
    tronco(x, sy, x, hy, 30, 22, 25) +
    arto(x - 11, hy + 2, x - 13, 122, 15, 11) +       /* coscia */
    arto(x - 13, 122, x - 12, 148, 11, 8) +           /* polpaccio */
    arto(x + 11, hy + 2, x + 13, 122, 15, 11) +
    arto(x + 13, 122, x + 12, 148, 11, 8) +
    (o.noArms ? '' :
      arto(x - 13, sy + 4, x - 15, 84, 11, 8) +
      arto(x - 15, 84, x - 14, 106, 8, 6) +
      arto(x + 13, sy + 4, x + 15, 84, 11, 8) +
      arto(x + 15, 84, x + 14, 106, 8, 6));
}

function accosciato(x) {
  const sy = 74, hy = 108;
  return testa(x + 9, 52, 11) +
    arto(x + 7, 62, x + 3, sy, 9, 13) +
    tronco(x + 3, sy, x - 6, hy, 30, 23, 25) +
    arto(x - 6, hy, x + 16, 124, 16, 12) +            /* coscia avanti */
    arto(x + 16, 124, x + 12, 148, 12, 8) +
    arto(x - 6, hy, x - 20, 126, 16, 12) +
    arto(x - 20, 126, x - 14, 148, 12, 8) +
    arto(x - 6, sy + 6, x - 14, 88, 11, 8) +
    arto(x + 8, sy + 4, x + 16, 86, 11, 8);
}

function piegato(x) {
  const sy = 72, hy = 92;
  return testa(x + 26, 66, 11) +
    arto(x + 20, 72, x + 12, sy, 9, 13) +
    tronco(x + 12, sy, x - 10, hy, 30, 24, 26) +
    arto(x - 10, hy, x - 12, 122, 16, 12) +
    arto(x - 12, 122, x - 9, 148, 12, 8) +
    arto(x + 6, hy - 2, x + 6, 122, 16, 12) +
    arto(x + 6, 122, x + 8, 148, 12, 8) +
    arto(x + 14, sy + 4, x + 16, 100, 11, 8) +
    arto(x + 16, 100, x + 15, 122, 8, 6);
}

function sdraiato(x, y, alt) {
  /* di lato su panca: tronco orizzontale, braccia verso l alto */
  const ty = y;
  return '<rect class="bench" x="' + (x - 44) + '" y="' + (ty + 12) + '" width="88" height="9" rx="4"/>' +
    '<rect class="bench" x="' + (x - 34) + '" y="' + (ty + 21) + '" width="7" height="26" rx="3"/>' +
    '<rect class="bench" x="' + (x + 28) + '" y="' + (ty + 21) + '" width="7" height="26" rx="3"/>' +
    testa(x - 36, ty + 2, 10) +
    tronco(x - 24, ty + 8, x + 22, ty + 10, 28, 24, 26) +
    arto(x + 22, ty + 10, x + 40, ty + 34, 15, 11) +
    arto(x + 40, ty + 34, x + 36, ty + 48, 11, 8) +
    arto(x - 18, ty + 4, x - 12, alt, 11, 8) +
    arto(x - 12, alt, x - 4, alt - 6, 8, 6);
}

const PATTERN_DRAW = {
  squat: () => wrapSvg(
    inPiedi(76, { noArms: true }) +
    arto(63, 60, 58, 74, 11, 8) + arto(89, 60, 94, 74, 11, 8) +
    bilanciere(76, 58, 46) +
    accosciato(216) +
    bilanciere(219, 76, 46) +
    freccia(126, 166, 92)),
  hinge: () => wrapSvg(
    inPiedi(76) + bilanciere(76, 108, 44) +
    piegato(216) + bilanciere(231, 132, 44) +
    freccia(126, 166, 92)),
  pushH: () => wrapSvg(
    sdraiato(76, 70, 44) + bilanciere(72, 44, 40) +
    sdraiato(216, 70, 74) + bilanciere(212, 74, 40) +
    freccia(126, 166, 60), false),
  pushV: () => wrapSvg(
    inPiedi(76, { noArms: true }) +
    arto(63, 60, 60, 74, 11, 8) + arto(89, 60, 92, 74, 11, 8) +
    bilanciere(76, 74, 42) +
    inPiedi(216, { noArms: true }) +
    arto(203, 60, 210, 26, 11, 8) + arto(229, 60, 222, 26, 11, 8) +
    bilanciere(216, 22, 42) +
    freccia(126, 166, 52)),
  pullV: () => wrapSvg(
    '<line class="bar" x1="30" y1="18" x2="270" y2="18" stroke-width="5" stroke-linecap="round"/>' +
    testa(76, 62, 11) + arto(76, 72, 76, 84, 9, 13) + tronco(76, 84, 76, 120, 28, 21, 24) +
    arto(64, 88, 66, 22, 11, 8) + arto(88, 88, 86, 22, 11, 8) +
    arto(70, 122, 68, 146, 14, 10) + arto(82, 122, 84, 146, 14, 10) +
    testa(216, 34, 11) + arto(216, 44, 216, 56, 9, 13) + tronco(216, 56, 216, 92, 28, 21, 24) +
    arto(204, 60, 206, 22, 11, 8) + arto(228, 60, 226, 22, 11, 8) +
    arto(210, 94, 206, 122, 14, 10) + arto(222, 94, 226, 122, 14, 10) +
    freccia(126, 166, 60), false),
  pullH: () => wrapSvg(
    piegato(76) + bilanciere(91, 134, 40) +
    piegato(216) + bilanciere(231, 108, 40) +
    freccia(126, 166, 92)),
  lunge: () => wrapSvg(
    inPiedi(76) +
    testa(216, 40, 11) + arto(216, 50, 214, 62, 9, 13) + tronco(214, 62, 210, 98, 29, 22, 25) +
    arto(210, 98, 240, 118, 16, 12) + arto(240, 118, 240, 148, 12, 8) +
    arto(210, 98, 186, 126, 16, 12) + arto(186, 126, 196, 148, 12, 9) +
    arto(202, 66, 198, 96, 11, 8) + arto(226, 66, 230, 96, 11, 8) +
    freccia(126, 166, 92)),
  hip: () => wrapSvg(
    '<rect class="bench" x="34" y="86" width="46" height="9" rx="4"/>' +
    testa(48, 74, 10) + tronco(58, 84, 88, 124, 26, 23, 25) +
    arto(88, 124, 110, 148, 15, 11) + bilanciere(90, 118, 34) +
    '<rect class="bench" x="174" y="86" width="46" height="9" rx="4"/>' +
    testa(188, 74, 10) + tronco(198, 84, 236, 92, 26, 23, 25) +
    arto(236, 92, 244, 124, 15, 12) + arto(244, 124, 244, 148, 12, 8) +
    bilanciere(234, 84, 34) +
    freccia(126, 166, 110)),
  curl: () => wrapSvg(
    inPiedi(76, { noArms: true }) +
    arto(63, 60, 62, 88, 12, 9) + arto(62, 88, 64, 112, 9, 7) +
    arto(89, 60, 90, 88, 12, 9) + arto(90, 88, 88, 112, 9, 7) +
    manubrio(64, 114) + manubrio(88, 114) +
    inPiedi(216, { noArms: true }) +
    arto(203, 60, 202, 88, 12, 9) + arto(202, 88, 208, 66, 9, 7) +
    arto(229, 60, 230, 88, 12, 9) + arto(230, 88, 224, 66, 9, 7) +
    manubrio(208, 62) + manubrio(224, 62) +
    freccia(126, 166, 86)),
  ext: () => wrapSvg(
    inPiedi(76, { noArms: true }) +
    arto(63, 60, 66, 40, 12, 9) + arto(66, 40, 58, 58, 9, 7) +
    arto(89, 60, 86, 40, 12, 9) + arto(86, 40, 94, 58, 9, 7) +
    bilanciere(76, 58, 26) +
    inPiedi(216, { noArms: true }) +
    arto(203, 60, 206, 40, 12, 9) + arto(206, 40, 208, 20, 9, 7) +
    arto(229, 60, 226, 40, 12, 9) + arto(226, 40, 224, 20, 9, 7) +
    bilanciere(216, 18, 26) +
    freccia(126, 166, 46)),
  raise: () => wrapSvg(
    inPiedi(76, { noArms: true }) +
    arto(63, 60, 60, 92, 11, 8) + arto(60, 92, 60, 112, 8, 6) +
    arto(89, 60, 92, 92, 11, 8) + arto(92, 92, 92, 112, 8, 6) +
    manubrio(60, 114) + manubrio(92, 114) +
    inPiedi(216, { noArms: true }) +
    arto(203, 60, 176, 58, 11, 8) + arto(176, 58, 156, 58, 8, 6) +
    arto(229, 60, 256, 58, 11, 8) + arto(256, 58, 276, 58, 8, 6) +
    manubrio(154, 58) + manubrio(278, 58) +
    freccia(126, 166, 100)),
  coreStatic: () => wrapSvg(
    testa(64, 82, 11) + arto(58, 90, 74, 96, 9, 13) +
    tronco(74, 96, 150, 116, 28, 24, 26) +
    arto(150, 116, 178, 140, 15, 11) + arto(178, 140, 186, 148, 11, 9) +
    arto(74, 100, 70, 148, 12, 9) +
    '<text class="lbl" x="225" y="86" font-size="15" font-weight="900">FERMO</text>' +
    '<text class="lbl2" x="212" y="106" font-size="11">corpo dritto</text>'),
  coreFlex: () => wrapSvg(
    testa(40, 118, 10) + tronco(52, 124, 96, 130, 26, 22, 24) +
    arto(96, 130, 84, 100, 15, 12) + arto(84, 100, 92, 132, 12, 9) +
    testa(196, 92, 10) + tronco(206, 100, 236, 128, 26, 22, 24) +
    arto(236, 128, 224, 100, 15, 12) + arto(224, 100, 232, 128, 12, 9) +
    freccia(126, 166, 112)),
  calf: () => wrapSvg(
    inPiedi(76) +
    testa(217, 22, 11) + arto(216, 32, 216, 44, 9, 13) + tronco(216, 44, 216, 84, 30, 22, 25) +
    arto(205, 86, 203, 112, 15, 11) + arto(203, 112, 206, 138, 11, 8) +
    arto(227, 86, 229, 112, 15, 11) + arto(229, 112, 226, 138, 11, 8) +
    '<path class="bd" d="M200 138 q8 -6 16 0 l0 8 q-8 4 -16 0z"/>' +
    arto(203, 48, 201, 80, 11, 8) + arto(229, 48, 231, 80, 11, 8) +
    freccia(126, 166, 92)),
  machine: () => wrapSvg(
    '<rect class="bench" x="34" y="96" width="62" height="10" rx="4"/>' +
    '<rect class="bench" x="34" y="60" width="9" height="40" rx="4"/>' +
    testa(56, 50, 10) + tronco(52, 60, 56, 94, 26, 22, 24) +
    arto(56, 94, 92, 104, 15, 11) + arto(92, 104, 92, 130, 11, 8) +
    '<rect class="bench" x="176" y="96" width="62" height="10" rx="4"/>' +
    '<rect class="bench" x="176" y="60" width="9" height="40" rx="4"/>' +
    testa(198, 50, 10) + tronco(194, 60, 198, 94, 26, 22, 24) +
    arto(198, 94, 236, 92, 15, 11) + arto(236, 92, 268, 88, 11, 8) +
    freccia(126, 166, 120))
};

const PATTERN_INFO = {
  squat: { nome: 'Accosciata', complesso: true,
    come: ['Piedi larghi come le spalle, punte leggermente in fuori.',
           'Scendi mandando il sedere indietro e in basso, come per sederti.',
           'Le ginocchia seguono la direzione delle punte dei piedi.',
           'Risali spingendo con tutto il piede, non solo con le punte.'],
    errori: ['Ginocchia che cadono verso l interno.', 'Talloni che si staccano da terra.', 'Schiena che si arrotonda in fondo.'] },
  hinge: { nome: 'Piegamento dell’anca', complesso: true,
    come: ['Il movimento parte dall anca, non dalla schiena: il sedere va indietro.',
           'La schiena resta dritta come un asse, dall inizio alla fine.',
           'Il bilanciere sfiora le gambe per tutta la salita.',
           'Arrivato in piedi stringi i glutei, senza inarcarti all indietro.'],
    errori: ['Schiena curva: e l errore che fa male.', 'Bilanciere lontano dalle gambe.', 'Partire strappando invece di spingere.'] },
  pushH: { nome: 'Spinta orizzontale', complesso: true,
    come: ['Sdraiato, avvicina le scapole tra loro e abbassa le spalle.',
           'Scendi controllando fino a sfiorare il petto.',
           'Spingi verso l alto senza staccare la schiena dalla panca.'],
    errori: ['Spalle che salgono verso le orecchie.', 'Rimbalzare il bilanciere sul petto.', 'Gomiti spalancati a 90 gradi.'] },
  pushV: { nome: 'Spinta sopra la testa', complesso: true,
    come: ['In piedi, piedi saldi e addome contratto.',
           'Spingi verso l alto tenendo il bilanciere vicino al viso.',
           'A braccia tese la testa passa leggermente avanti.'],
    errori: ['Inarcare la schiena per spingere di piu.', 'Spingere in avanti invece che in alto.'] },
  pullV: { nome: 'Trazione verticale', complesso: true,
    come: ['Appeso, spalle basse e lontane dalle orecchie.',
           'Tira portando i gomiti verso il basso e il petto verso la sbarra.',
           'Scendi controllando, senza lasciarti cadere.'],
    errori: ['Dondolare con le gambe per aiutarsi.', 'Fare mezze ripetizioni.', 'Tirare solo con le braccia.'] },
  pullH: { nome: 'Trazione orizzontale', complesso: true,
    come: ['Busto inclinato in avanti, schiena dritta.',
           'Tira verso l ombelico portando i gomiti indietro.',
           'Stringi le scapole in fondo al movimento.'],
    errori: ['Alzare il busto a ogni tirata.', 'Schiena arrotondata.', 'Usare lo slancio invece dei muscoli.'] },
  lunge: { nome: 'Affondo', complesso: false,
    come: ['Un passo avanti, busto eretto.',
           'Scendi finche il ginocchio dietro sfiora quasi terra.',
           'Risali spingendo con il tallone della gamba davanti.'],
    errori: ['Ginocchio davanti che cede verso l interno.', 'Busto che crolla in avanti.'] },
  hip: { nome: 'Spinta dell’anca', complesso: false,
    come: ['Schiena appoggiata a una panca, piedi ben piantati.',
           'Spingi il bacino verso l alto stringendo i glutei.',
           'In cima corpo dritto dalle ginocchia alle spalle.'],
    errori: ['Inarcare la schiena invece di stringere i glutei.', 'Spingere con le punte dei piedi.'] },
  curl: { nome: 'Flessione del gomito', complesso: false,
    come: ['Gomiti fermi vicino ai fianchi.', 'Sali piegando solo l avambraccio.', 'Scendi lentamente fino quasi a braccia tese.'],
    errori: ['Dondolare con la schiena.', 'Gomiti che scappano in avanti.'] },
  ext: { nome: 'Estensione del gomito', complesso: false,
    come: ['Gomiti fermi e stretti.', 'Estendi il braccio fino in fondo.', 'Torna controllando.'],
    errori: ['Allargare i gomiti.', 'Muovere le spalle al posto delle braccia.'] },
  raise: { nome: 'Alzata', complesso: false,
    come: ['Braccia quasi tese, gomito appena morbido.', 'Sali fino all altezza delle spalle, non oltre.', 'Scendi lentamente.'],
    errori: ['Usare pesi troppo alti e slanciare.', 'Alzare le spalle verso le orecchie.'] },
  coreStatic: { nome: 'Tenuta del core', complesso: false,
    come: ['Corpo dritto come un asse, dalla testa ai talloni.', 'Addome e glutei contratti.', 'Respira normalmente, non trattenere.'],
    errori: ['Sedere troppo alto o troppo basso.', 'Trattenere il respiro.'] },
  coreFlex: { nome: 'Flessione del busto', complesso: false,
    come: ['Muovi solo la parte alta o le gambe, senza strappi.', 'Espira mentre chiudi.', 'Torna lentamente.'],
    errori: ['Tirarsi con le mani dietro il collo.', 'Usare lo slancio.'] },
  calf: { nome: 'Polpacci', complesso: false,
    come: ['Sali sulle punte il piu in alto possibile.', 'Fermati un attimo in cima.', 'Scendi lentamente sotto il livello del gradino.'],
    errori: ['Rimbalzare senza controllo.', 'Fare mezze ripetizioni.'] },
  machine: { nome: 'Macchinario', complesso: false,
    come: ['Regola il sedile prima di iniziare.', 'Muovi solo l articolazione interessata.', 'Non lasciare cadere il peso a fine ripetizione.'],
    errori: ['Sedile regolato male.', 'Carico troppo alto e movimento a scatti.'] }
};

/* Ogni esercizio della libreria ricondotto al suo schema */
const PATTERN_RULES = [
  [/leg press|leg extension|leg curl|hack squat|pectoral|chest press|shoulder press|abductor|adductor|lat machine|pulley|pushdown|croci ai cavi|crunch al cavo|kickback ai cavi|curl ai cavi|dip alla macchina/i, 'machine'],
  [/squat|goblet/i, 'squat'],
  [/stacco|good morning/i, 'hinge'],
  [/panca|piegamenti|dip|croci|pullover/i, 'pushH'],
  [/military|lento avanti|arnold|tirate al mento|pike/i, 'pushV'],
  [/trazioni|chin/i, 'pullV'],
  [/rematore|t-bar|hyperextension/i, 'pullH'],
  [/affondi|step-up/i, 'lunge'],
  [/hip thrust|ponte glutei|slanci/i, 'hip'],
  [/curl/i, 'curl'],
  [/french press|panca presa stretta|dip su panca|kickback/i, 'ext'],
  [/alzate|face pull|scrollate/i, 'raise'],
  [/plank|hollow/i, 'coreStatic'],
  [/crunch|leg raise|russian|mountain|ab wheel|woodchop|sit-up/i, 'coreFlex'],
  [/calf/i, 'calf']
];

window.patternFor = function(name) {
  const n = String(name).replace(EMOJI_TESTA, '');
  for (let i = 0; i < PATTERN_RULES.length; i++) {
    if (PATTERN_RULES[i][0].test(n)) return PATTERN_RULES[i][1];
  }
  return 'machine';
};

/* Fonti video verificate durante la ricerca, in italiano.
   NOTA ONESTA mostrata anche all utente: non posso guardare i video, quindi
   per i singoli esercizi apro una RICERCA su YouTube (sempre aggiornata e
   mai un link morto) e segnalo a parte le fonti che ho verificato. */
const VIDEO_VERIFICATI = {
  '\u{1F3F9} Stacco da Terra (Deadlift)': 'https://www.youtube.com/watch?v=xPs2VFWDWTI'
};
const VIDEO_PLAYLIST = 'https://www.youtube.com/playlist?list=PLP3v68UxbrjAchVp8RRso71h5Dx9LBOH5';

/* La ricerca porta il nome nella lingua dell app, il nome inglese (e quello con piu video) e, se l esercizio ha un
   attacco o una presa (il cavo con triangolo, barra o corda non e lo stesso esercizio), anche quelli. */
window.testoRicercaVideo = function(name) {
  const pulito = String(name).replace(EMOJI_TESTA, '');
  const d = typeof dettaglioEsercizio === 'function' ? dettaglioEsercizio(name) : null;
  const l = typeof lingua === 'function' ? lingua() : 'it';
  const nome = l === 'it' ? pulito : String(window.tr(pulito));
  const en = (window.I18N && I18N.en && I18N.en[pulito]) || '';
  const parole = { it: 'tecnica esecuzione', en: 'proper form tutorial', es: 'técnica ejecución', de: 'Technik Ausführung' };
  const att = d ? [d.att, d.attacco].filter(Boolean).map(x => l === 'it' ? x : String(window.tr(x))) : [];
  const q = [nome].concat(en && en !== nome ? [en] : [], att, [parole[l] || parole.en]).join(' ');
  return q.replace(/[(),·]/g, ' ').replace(/\s+/g, ' ').trim();
};
window.videoLinkFor = function(name) {
  if (VIDEO_VERIFICATI[name]) return VIDEO_VERIFICATI[name];
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(testoRicercaVideo(name));
};
