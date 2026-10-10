/* Figura anatomica
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   FIGURA ANATOMICA
   Disegnata a mano in SVG: niente immagini esterne, cosi funziona
   offline e segue i colori del tema. Proporzioni piu realistiche:
   spalle piu larghe dei fianchi, torace a trapezio, dorsali a V,
   addome diviso in fasce, cosce affusolate verso il ginocchio.
   ============================================================ */
/* Card di un gruppo muscolare: al posto dell emoji, la stessa tavola
   anatomica dell app ritagliata sulla zona giusta, con il muscolo acceso.
   Coerente con la figura del Piano e disegnata a mano: niente immagini
   di terzi. */
const MG_VISTA = {
  petto:   { box: '41 49 61 38',  sub: 'Pettorali' },
  schiena: { box: '148 33 80 89', sub: 'Dorsali e trapezio' },
  gambe:   { box: '40 105 63 130', sub: 'Quadricipiti e femorali' },
  glutei:  { box: '160 104 55 41', sub: 'Grande e medio' },
  spalle:  { box: '30 46 83 36',  sub: 'Deltoidi' },
  braccia: { box: '23 64 99 71', sub: 'Bicipiti e tricipiti' },
  core:    { box: '44 64 59 65',  sub: 'Addome e obliqui' }
};
/* la figura di un gruppo e sempre la stessa: si disegna una volta sola */
const _figCache = {};
window.muscleFigure = function(g) {
  if (_figCache[g]) return _figCache[g];
  return (_figCache[g] = muscleFigureNuova(g));
};
function muscleFigureNuova(g) {
  const v = MG_VISTA[g] || { box: MC_VIEWBOX };
  return renderBodyMap([g], null).replace('viewBox="' + MC_VIEWBOX + '"', 'viewBox="' + v.box + '"')
    .replace(/<text class="bm-label"[^<]*<\/text>/g, '');
}
window.muscleCard = function(g, on, onclick) {
  const n = EXERCISE_LIBRARY.filter(e => e.group === g).length;
  return '<button class="mg-card' + (on ? ' on' : '') + '" onclick="' + onclick + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
    '<span class="mg-fig">' + muscleFigure(g) + '</span>' +
    '<span class="mg-txt"><span class="mg-name">' + MUSCLE_GROUPS[g].label + '</span>' +
    '<span class="mg-sub">' + (MG_VISTA[g] ? MG_VISTA[g].sub : '') + ' \u00B7 <b class="mg-n">' + n + '</b></span></span>' +
    '<span class="mg-check" aria-hidden="true">' + (on ? '✓' : '') + '</span>' +
  '</button>';
};

/* ============================================================
   FIGURA ANATOMICA (tavola fornita dall utente: mappa-muscoli.svg)
   Disegno vettoriale a due viste, fronte e retro, con ogni muscolo come
   forma separata. I colori originali sono stati trasformati in classi
   (sagoma, parti scure, linee, muscoli), cosi la figura segue i token
   del tema chiaro e scuro; ogni muscolo porta il suo gruppo (data-g) e
   si accende, si colora per carico settimanale o si tocca.
   ============================================================ */
const MC_PARTS = [["bm-sil",null,"path"," d=\"m116.5 128.3c0.2-1.0-0.9-6.0-0.8-13.5 0.1-7.5 1.0-12.5-2.1-20.0-1.0-2.5-3.0-5.3-3.0-5.8 0.5-5.5-0.2-11.1-2.8-14.2 1.8-10.3-2.0-20.5-13.2-20.6-4.2-4.6-13.4-6.2-14.5-9.8v-5.4c0.3-0.6 0.7-1.4 1.0-2.2 2.0-0.5 3.9-7.9 1.6-7.6 0.8-9-3.9-14.4-10.4-14.4s-11.1 5.7-10.3 14.3c-2.7-0.0-0.4 7.4 1.6 7.6 0.2 0.7 0.5 1.4 0.8 2.0v5.6c-1.2 3.5-10.8 5.8-14.5 9.7-12.4 0.1-15.3 11.2-13.6 20.7-2.7 3.8-3.6 9-2.9 14.2 0.0 0.7-2.5 4.8-4.0 8.7-2.4 6.5-1.3 11.6-1.4 17.8-0.1 5.9-1.0 11.4-0.8 12.8 0.1 1.4-0.3 9.4-0.3 11.2 0.7 4.5 2.4 8.7 7.2 12.1 1.8 0.7 1.9-1.5 1.8-2.7-2.2-3-3.4-6.5-2.7-9.8 0.1-0.1 0.5-0.1 0.6 0.0 0.0 2.2 0.4 5.5 2.7 5.5 0.9 0 0.7-1.4 0.5-2.9-0.1-1.3-0.3-3.1-0.2-4.9 0.1-3.6-1.4-6.5-3.2-7.8-0.1-4.4 2.9-10.4 6.1-15.4 4.1-6.5 3.8-12.9 3.5-19.2 2.5-3.1 4.5-6.6 5.2-10.7 1.1 3.3 3.2 6.2 5.3 8.5 0.7 3.3 0.7 7.5-0.4 11.6-0.3 1.6-0.1 4.7 0.3 6.6-3.9 5.1-4.8 14.4-4.5 21.7-4.7 9.8-3.4 23.8 1.2 34.3-0.6 4.1-0.6 8.3-0.2 12.5-4.5 7.3-6.3 15.0-3.4 23.5 0.9 4.9 2.1 11.9 2.7 16.9 0.3 3 0.0 6-0.8 8.8 0.0 3-3.3 7.0-5.6 9.2-1.9 1.9-1.5 4.9 1.4 5.3 5.4 0.9 12.7 0.7 12.4-4.0 1.3-1.3 0.7-3.5 0.4-5.3-0.2-1.4 0.2-2.9 0.6-4.3 0.3-1.2-0.5-3.0-0.8-4.8-0.5-4.6 1.9-14.3 3.5-19.7 1.6-3.3 3.5-6.5 3.4-10.6-0.1-4.5-2.0-9.2-2.0-12.8 2.5-3.7 3.9-8.4 4.5-13.3 1.1-4.5 1.9-9.5 2.2-13.0 1.9-7.2 2.3-15.2 2.3-20.2h1.4c0.0 5.1 0.4 13.0 2.0 20.2 0.2 3.5 1.1 8.2 2.3 12.5 0.4 4.9 2.0 9.6 4.3 13.3 0.0 3.4-2.0 8.4-2.1 13.2-0.0 4 1.5 7.5 3.5 10.4 1.1 5.5 3.4 11.6 3.8 16.9 0.1 2.4-1.2 5.4-1.1 7 0.0 1.3 1 3.0 0.8 4.4-0.2 1.9-1.0 4.1 0.2 6.0-0.1 4.9 4.8 4.9 11.0 4.5 4.3-0.1 4.5-3.2 2.5-5.5-2.3-2.5-5.0-5.9-5.3-9.0-0.4-2.8-0.6-5.9-0.3-9.0 0.5-5.6 1.4-11.8 2.4-17.1 2.7-7.6 0.9-16.7-3.0-23.7 0.3-4.2 0.2-8.6-0.0-12.5 4.2-11.1 5.7-24.1 1.0-34.0 0.0-7.9-1.1-17.7-4.2-22 0.6-2.1 0.6-4.3 0.2-6.2-0.8-4.1-0.6-8.4 0.2-12 2.3-2.6 4.0-5.7 5-8.9 0.6 4.0 2.5 7.7 4.7 10.9 0 5.0-0.6 10.9 2.8 17.2 3.2 5.5 6.7 11.1 6.7 17.5-2.3 1.9-3.2 5.0-3.1 8.2 0.0 2.1-0.3 4.4-0.4 6.3-0.0 0.9 0.5 1.2 1.2 1.2 1.7-0.2 1.9-3.8 2.1-5.6 0.1-0.2 0.5-0.2 0.6-0.0 0.3 3.2-0.6 6.7-2.6 9.3-0.5 1.7 0.0 3.8 1.4 3.1 4.6-3 6.5-7.2 7.5-11.8 0-3.5-0.7-9.5-0.2-11.4z\""],["bm-dark",null,"path"," d=\"m99.7 238c-2.3-2.5-5.0-5.9-5.3-9.0-1.2-1.8-3.1-3.2-4.7-3.1-2 0.1-3.5 1.3-4.5 2.6 0.0 1.3 1 3.0 0.8 4.4-0.2 1.9-1.0 4.1 0.2 6.0-0.1 4.9 4.8 4.9 11.0 4.5 4.3-0.1 4.5-3.2 2.5-5.5z\""],["bm-dark",null,"path"," d=\"m48.4 228.5c0.0 3-3.3 7.0-5.6 9.2-1.9 1.9-1.5 4.9 1.4 5.3 5.4 0.9 12.7 0.7 12.4-4.0 1.3-1.3 0.7-3.5 0.4-5.3-0.2-1.4 0.2-2.9 0.6-4.3-0.9-1.9-3-3.4-4.8-3.4-1.8 0-3.3 1.3-4.4 2.6z\""],["bm-dark",null,"path"," d=\"m33.1 128.9c-1.1-1.1-2.4-2.3-3.7-2.3-1.3 0.0-2.4 0.8-2.7 1.7 0.1 1.4-0.3 9.4-0.3 11.2 0.7 4.5 2.4 8.7 7.2 12.1 1.8 0.7 1.9-1.5 1.8-2.7-2.2-3-3.4-6.5-2.7-9.8 0.1-0.1 0.5-0.1 0.6 0.0 0.0 2.2 0.4 5.5 2.7 5.5 0.9 0 0.7-1.4 0.5-2.9-0.1-1.3-0.3-3.1-0.2-4.9 0.1-3.6-1.4-6.5-3.2-7.8z\""],["bm-dark",null,"path"," d=\"m116.5 128.3c-0.2-0.8-1.4-1.6-2.9-1.5-1.3 0.3-2.5 1.3-3.6 2.0-2.3 1.9-3.2 5.0-3.1 8.2 0.0 2.1-0.3 4.4-0.4 6.3-0.0 0.9 0.5 1.2 1.2 1.2 1.7-0.2 1.9-3.8 2.1-5.6 0.1-0.2 0.5-0.2 0.6-0.0 0.3 3.2-0.6 6.7-2.6 9.3-0.5 1.7 0.0 3.8 1.4 3.1 4.6-3 6.5-7.2 7.5-11.8 0-3.5-0.7-9.5-0.2-11.4z\""],["bm-dark",null,"path"," d=\"m82.5 28.7c0.8-9-3.9-14.4-10.4-14.4s-11.1 5.7-10.3 14.3c-2.7-0.0-0.4 7.4 1.6 7.6 1.5 4.5 5.0 7.3 8.6 7.3 3.8 0 7.5-3.2 8.8-7.3 2.0-0.5 3.9-7.9 1.6-7.6z\""],["bm-dark",null,"path"," d=\"m66.7 41.5c1.2 5.4 2.1 16.1 5.0 17.5 1.6 0.0 3.6-13 5-17.0-3.4 2.6-6.9 2.0-10.0-0.4z\""],["bm-dark",null,"path"," d=\"m63.9 45.1c-0.2 3.9-4.9 7.3-9.2 9.9 1.9 0.5 4.1 0.7 6 0.9 2.5-2.1 4.6-4.3 5.4-6.1-0.6-1.6-1.0-3.4-2.1-4.7z\""],["bm-dark",null,"path"," d=\"m79.6 45.3c-0.7 4.1-1.7 8.1-3.1 11.7 3.5-0.5 6.8-0.9 9.6-1.2-3.3-3.1-6.2-6.5-6.5-10.4z\""],["bm-muscle","spalle","path"," d=\"m53.9 56c-3.2 1.6-5.0 5.2-6.5 8.4 4.0-2.0 8.0-5.1 11.5-7.9-1.7-0.1-3.3-0.3-5-0.5z\""],["bm-muscle","spalle","path"," d=\"m88.7 55.8c-1.7 0.0-3.2 0.2-4.6 0.5 3.4 2.8 7.1 5.4 11.0 7.3-1.1-3.2-3.4-6.1-6.4-7.9z\""],["bm-muscle","petto","path"," d=\"m59.3 56.7c-3.1 2.5-7.5 5.2-11.2 7.7-1.4 1.1-1.6 3.0-1.1 4.7 1.7 4.8 6.8 10 12.3 10.1 4.2 0.1 10.5-1.4 11.3-5.0 0.5-3.7 0.6-7.9 0.2-11.7-0.5-4.9-6.6-5.4-11.6-5.7z\""],["bm-muscle","petto","path"," d=\"m84.1 56.6c-5.2 0.2-11.2 0.7-11.8 6.0-0.3 3.7-0.4 7.7 0.0 11.4 0.6 3.6 7.0 5.4 11.4 5.2 5.9-0.2 12.2-6.4 12.6-11.5 0.0-1.5-0.6-3.0-2.0-3.9-3.8-2.1-7.1-4.8-10.2-7.2z\""],["bm-muscle","braccia","path"," d=\"m45.3 70.2c-7 1.9-11.5 19.0-8 23.4 0.8 1.0 2.4 0.8 3.6 0.1 6.6-4.1 6.3-16.5 5.1-22.9-0.0-0.4-0.4-0.6-0.8-0.6z\""],["bm-muscle","braccia","path"," d=\"m98.7 70.3c-0.2 0-0.6 0.2-0.7 0.5-1.8 7.3-2.0 19.2 5.2 23.0 1.4 0.7 2.7 0.5 3.3-0.7 2.2-6.5-1.7-22.5-7.7-22.8z\""],["bm-muscle","core","path"," d=\"m54.0 90c-0.7 5.3 3.4 10.2 6.6 13.4 0.2-2.1 0.1-4.4-0.6-6.3-1.4-3.0-3.5-5.5-5.9-7.1z\""],["bm-muscle","core","path"," d=\"m88.7 90.0c-3.9 3.4-7.2 7.9-6.5 13.3 4.6-2.8 7.5-8.0 6.5-13.3z\""],["bm-muscle","core","path"," d=\"m54.7 98.3c-1.5 3.7-2.5 8.5-0.5 11.6 3.0 3.9 6.7 7.3 10.4 10.0-1.8-4.8-3.0-10.2-3.2-15.6-1.9-2.6-4.2-4.5-6.6-6.0z\""],["bm-muscle","core","path"," d=\"m88.0 98.3c-2.3 1.9-4.5 3.9-6.1 6.1-0.0 5.4-1.3 10.7-3.1 15.5 3.3-2.9 7.0-5.8 10.2-9.3 1.9-3.8 0.6-8.4-0.9-12.4z\""],["bm-muscle","core","path"," d=\"m64.7 106.4c-2.7 0.2 0.2 16.4 5.6 16.5 0.7 0 0.7-0.7 0.7-1.2 0.0-4.4 0.1-8.9-0.1-13.4-0.1-1.6-4-1.7-6.3-1.8z\""],["bm-muscle","core","path"," d=\"m78.1 106.5c-2.4 0.2-5.8 0.1-6 1.9-0.2 4.4-0.1 8.9-0.1 13.4 0 0.5 0.2 1.1 0.9 1.1 4.5-0.3 6.9-12.1 6.3-15.5-0.0-0.5-0.5-0.9-1.2-0.9z\""],["bm-muscle","gambe","path"," d=\"m56.2 123c-0.3 0.0-0.6 0.2-0.8 0.7-4.1 11-4.0 28.0 1.6 38.6 0.2 0.3 0.7 0.3 0.9-0.0 3.6-10.8 3-27.3-0.5-38.6-0.1-0.4-0.7-0.7-1.1-0.7z\""],["bm-muscle","gambe","path"," d=\"m59.0 128c2.3 11.1 1.3 24.8 0.1 35.7-0.3 3.0 1.2 6.7 3.7 6.9 7.6-6.7 3.9-29.3-3.9-42.6z\""],["bm-muscle","gambe","path"," d=\"m53.7 127.1c-9.4 8.7-8.1 28.0-2.4 38.3 0.5 1 2.1 0.9 2.9 0.2 1.2-1.3 1.0-3.9 0.5-5.9-3.4-10.2-3.4-22.3-1.0-32.6z\""],["bm-muscle","gambe","path"," d=\"m86.1 122.8c-0.3-0.0-0.6 0.2-0.8 0.6-3.7 11.0-3.4 28.1 0.0 38.7 0.1 0.5 0.8 0.5 1.0 0.1 5.1-10.4 4.8-26.4 0.5-38.9-0.0-0.3-0.4-0.5-0.8-0.6z\""],["bm-muscle","gambe","path"," d=\"m88.5 126.9c3 10.7 2.8 23.5-0.5 33.5-0.6 2.3-0.2 5.6 2.2 5.8 0.7 0.0 1.3-0.4 1.6-1.0 5.5-11.2 6.4-29.0-3.3-38.4z\""],["bm-muscle","gambe","path"," d=\"m83.5 127.5c-4.9 10.0-9 20.9-7.9 32.2 0.3 4.1 1.6 9.6 5.1 10.6 2.7-1.1 3.3-5.1 2.8-8.2-2.0-11-2.2-23.4-0.1-34.6z\""],["bm-muscle","gambe","path"," d=\"m49.4 181.1c-3.8 6.5-4.8 14.9-2.1 20.9 3.8-3.7 3.3-14.2 2.1-20.9z\""],["bm-muscle","gambe","path"," d=\"m61.1 181.9c-2.5 1.9-4.0 5.1-3.9 8.5 0.2 4.5 0.6 9.5 2.0 13.2 5.8-4.4 4.0-15.2 1.8-21.7z\""],["bm-muscle","gambe","path"," d=\"m57.6 203c-1.7 6.0-2.4 12.8-1.7 18.6 0.9-5.7 3.5-13.3 1.7-18.6z\""],["bm-muscle","gambe","path"," d=\"m81.4 181.8c-1.6 6.7-4.0 16.1 1.6 21.8 1.5-2.4 2.1-6.9 2.3-11.1 0.2-4.6-1-8.6-3.9-10.6z\""],["bm-muscle","gambe","path"," d=\"m93.2 181.1c-1.0 6.8-1.4 16.2 2.7 21.3 2.5-6.5 1.1-15.7-2.7-21.3z\""],["bm-muscle","gambe","path"," d=\"m84.5 203.7c-0.5 0.2-0.6 0.8-0.5 1.5 0.6 5.4 1.5 11.2 3.0 16.0 0.1-6-0.4-12.4-2.4-17.6z\""],["bm-muscle","core","path"," d=\"m53.4 71.8c-7.0 6.0-3.1 16.5 1.5 20.9-0.0-5.9-0.0-13.6-1.5-20.9z\""],["bm-muscle","core","path"," d=\"m96.4 70.4c-2.1 2.7-4.8 5.0-6.1 7.6-0.3 4.6-0.3 9.4-0.1 13.4 5.5-4.9 7.4-14.1 6.3-21.0z\""],["bm-muscle","braccia","path"," d=\"m103.4 72.4c3.2 5.5 4.6 12.0 4.1 19.3-0.4 2.7-0.7 5.5-0.7 7.6 1.2-3.2 2.5-6.2 3-9.3 0.4-7.2-0.7-14.3-6.3-17.7z\""],["bm-muscle","braccia","path"," d=\"m39.5 72.5c-5.3 3.3-6.4 10.1-5.5 16.5 0.8 3.4 1.9 7 2.8 10.4 0.3-2.1 1.0-4.4 1.3-6.6-1.5-7.3-0.9-14.4 1.3-20.2z\""],["bm-muscle","braccia","path"," d=\"m34.0 89.7c-2.7 3.5-4.1 7.7-3.7 12.6 0.6 6.5 0.4 13.2-0.5 19.6-0.2 1.8-0.8 3.5-1.0 5.1l1.8-0.5c1.0-7.5 3.7-16.0 5.8-24.1 0.7-5-0.1-9.4-2.3-12.8z\""],["bm-muscle","braccia","path"," d=\"m109.5 89.9c-2.2 4.1-3 8.7-1.9 13.1 2.0 8 3.5 16.6 4.8 23.9l2.1 0.5c-2.1-10.1-1.7-21.8-1.8-30.1-0.5-3-1.6-5.4-3.2-7.4z\""],["bm-muscle","braccia","path"," d=\"m42.4 94.6c-3.3 1.2-5.7 4.1-6.4 8-2.2 7.9-4.6 16.6-5.5 24.3l1.8 1.3c0.5-9.7 5.0-18.4 9.0-27.2 0.8-2.4 1.1-4.5 1.0-6.4z\""],["bm-muscle","braccia","path"," d=\"m112.3 95.3c0.5 10-1.1 21.9 2.2 31.9l1.7 0.6c-2.0-10-0.1-22.2-4.0-32.5z\""],["bm-muscle","braccia","path"," d=\"m42.1 101.4c-4.8 7.7-8.4 17.0-9.3 26.5l0.4 0.7c0.3-8.2 6.8-18.6 8.9-27.2z\""],["bm-muscle","gambe","path"," d=\"m53.5 111.2c-0.0 4.1 1.0 8.6 3.4 12.5 3.1 4.8 6.3 9.5 8.7 13.6 0.0-4.9 0.1-10.6-0.5-15.2-3.9-4.0-7.7-7.7-11.6-10.9z\""],["bm-muscle","gambe","path"," d=\"m89.5 111.3c-4.4 3.4-8.6 7.2-12.2 10.9-0.3 4.5-0.3 9.7-0.0 15.0 5.3-7.7 11.5-16.4 12.3-26z\""],["bm-muscle","gambe","path"," d=\"m90.0 111.5c-1.3 3.4-2.3 7.1-2.3 11.0 2.0 3.5 4.4 6.9 6.5 9.7-0.0-7.1-1.2-14.9-4.1-20.8z\""],["bm-muscle","gambe","path"," d=\"m53.3 111.4c-3.6 5.4-4.4 13.1-4.3 20.3 1.6-2.5 3.4-4.6 5.4-6.3 1.0-4.7 0.3-9.7-1.1-14.0z\""],["bm-muscle","gambe","path"," d=\"m65.4 122.1c0.5 4.8 1.0 12.1 5.9 12.1 4.7-0.0 5.3-7.2 5.8-12.0-4.0 2.4-7.9 2.1-11.7-0.0z\""],["bm-muscle","gambe","path"," d=\"m65.7 134.9c-0.0 3.5-0.1 6.8 0.0 9.6 2.2 4.3 2.5 9.2 2.4 13.6 1.8-7.5 1.6-17.0-2.5-23.3z\""],["bm-muscle","gambe","path"," d=\"m77.2 135.2c-3.3 5.8-3.8 14.7-2.5 22.5 0.0-4.1 0.3-8.4 2.0-12.5 0.6-3.5 0.6-6.8 0.5-9.9z\""],["bm-dark",null,"ellipse"," cx=\"56.3\" cy=\"170.5\" rx=\"4.1\" ry=\"5.9\""],["bm-dark",null,"ellipse"," cx=\"86.4\" cy=\"170.5\" rx=\"3.9\" ry=\"5.9\""],["bm-muscle","gambe","path"," d=\"m50.7 166.1c-2.1 8.2 1.7 17.7 5.2 24.2 1.0-8 9.6-14.2 8.4-19.4-1.0-0.6-2.4-0.6-3.7-0.3-0.6 3.0-2.7 5.7-4.5 5.8-3.0-0.8-4.3-5.8-3.7-9.7l-1.6-0.5z\""],["bm-muscle","gambe","path"," d=\"m78.1 170.1c-0.2 5.8 4.0 9.9 6.5 14.5 1.2 2.0 2.1 4.1 2.5 5.8 3.5-7.3 6.9-16.4 5-24.1l-1.6 0.3c0.2 3.7-1.0 9.2-3.9 9.7-2.2-0.3-3.9-3.0-4.6-5.8l-3.9-0.5z\""],["bm-muscle","gambe","path"," d=\"m49.9 180c0.4 12.9 0.7 28.8 0.8 39.2 0.0 3.0-0.3 5.7-1.1 8.2 2.5-2.4 5.5-1.3 7.5 0.8-4-8.2-2.3-27.3-1.2-37.9-1.6-4.4-3.7-7.6-5.9-10.4z\""],["bm-muscle","gambe","path"," d=\"m93.2 179.8c-1.9 3.8-4.4 7.5-5.9 11.0 1.2 11.1 2.8 28.5-1.3 37.4 2.4-2.9 5.9-2.3 7.8 0.4-2-9.2-0.5-32.0-0.5-46.1v-2.8z\""],["bm-dark",null,"path"," d=\"m56.5 190.8c-2 12-3.9 27.6-0.3 36.0-0.7-6.6 0.6-14.4 2.2-21.4-0.7-5.2-1.3-10.0-1.8-14.6z\""],["bm-muscle","gambe","path"," d=\"m85.1 191.6c-1 10.9 2.6 27.6 0.6 36.4 4.4-7.1 2.5-26.1-0.6-36.4z\""],["bm-ln",null,"path"," d=\"m66.9 40.5c1.3 5.7 1.9 14.0 4.6 18.3-2.2-0.5-4.2-1.0-5.5-1.9-1.5-4.8-2.2-10.0-2.1-15.4l3-0.9z\""],["bm-ln",null,"path"," d=\"m77.7 40.5c-1.7 5.8-2.7 13.1-5.4 18.2 1.8-0.5 3.4-0.9 5-1.4 1.5-4.5 2.3-9.8 2.3-15.6l-1.9-1.1z\""],["bm-ln",null,"path"," d=\"m39.5 72.3c-5.4 3.2-6.7 10-5.6 16.5\""],["bm-ln",null,"path"," d=\"m103.4 72.5c5.1 3.5 6.5 10.2 6.2 17.0\""],["bm-ln",null,"path"," d=\"m30.4 96.1c1.0 4.9 2.3 9.9 2.3 14.9\""],["bm-ln",null,"path"," d=\"m112 95.8c-1.1 5-2.2 9.7-2.2 14.6\""],["bm-ln",null,"path"," d=\"m53.9 125.4c-2.7 10.7-2.9 25.3 2.4 37.1\""],["bm-ln",null,"path"," d=\"m58.8 127.9c2.3 11 2.0 23.4-0.4 34.6\""],["bm-ln",null,"path"," d=\"m88.0 126.2c3.5 11.1 3.2 24.6-1.6 36.3\""],["bm-ln",null,"path"," d=\"m83.8 127.1c-2.2 11.1-2.0 24.0 0.8 35.5\""],["bm-ln",null,"path"," d=\"m49.4 180.9c1.1 11.8 0.7 27.7 1.5 42.0\""],["bm-ln",null,"path"," d=\"m93.1 180.7c-0.5 12.5-1.6 27.6-1.4 42.5\""],["bm-ln",null,"path"," d=\"m57.6 203c-1.7 6.0-2.2 12.7-1.7 18.6\""],["bm-ln",null,"path"," d=\"m84.5 203.7c1.1 5.5 2.2 11.6 2.4 17.6\""],["bm-ln",null,"path"," d=\"m49.7 53.7c1.6 0.5 3.7 1.3 5.7 1.7\""],["bm-ln",null,"path"," d=\"m94.3 54.2c-1.5 0.4-3.4 0.9-5.2 1.4\""],["bm-muscle","spalle","path"," d=\"m51.3 53.8c-2.9 0.1-6.1 0.4-8.5 2.0-6.0 3.8-7.2 11.1-6.1 17.6 4.5-2.2 9-5.8 11.6-9.9 1.3-2.5 3-5.0 4.8-7.0-0.3-1.2-0.9-2.0-1.6-2.6z\""],["bm-muscle","spalle","path"," d=\"m94.7 54.2c-1.6 0.3-3.5 0.6-4.3 1.8 1.3 2.5 3.0 5.1 4.7 7.8 3.1 4.4 7.6 8.2 11.8 9.8 1.3-9.4-1.8-19.6-12.2-19.5z\""],["bm-ln",null,"path"," d=\"m45.4 70.1c-0.8 0.0-1.6 0.3-2.3 0.6\""],["bm-ln",null,"path"," d=\"m97.9 70.0c-0.6 0.0-1.2 0.1-1.8 0.4\""],["bm-muscle","core","path"," d=\"m54.4 79.0c-1.3 5.1 2.3 14.6 5.9 16.1 0.6 0.2 0.9-0.2 0.9-0.8 0.3-6.8-0.5-14.8-6.9-15.2z\""],["bm-muscle","core","path"," d=\"m69.4 78.4c-2.6 0.9-7.8 1.2-8.4 3.5-0.3 2.5-0.5 7 2.0 6.8 2.8-0.5 7.7-0.5 8.0-3.1 0.1-2.7 0.7-7.5-1.6-7.2z\""],["bm-muscle","core","path"," d=\"m73.3 78.5c-1.8-0.1-1.3 4.1-1.2 6.7 0.1 2.6 5.0 3.2 8.0 3.7 2.3 0.2 2.0-4.1 1.8-6.7-0.4-1.9-5.6-3.2-8.6-3.7z\""],["bm-muscle","core","path"," d=\"m88.5 78.8c-5.6 0.3-6.1 5.8-5.7 10.1 0.0 0.5 0.7 0.6 1.1 0.2 3.4-2.8 6.5-6.5 4.6-10.4z\""],["bm-muscle","core","path"," d=\"m69.1 88.2c-2.8 0.4-7.3 0.8-7.6 2.8-0.2 2.4-0.0 5.8 2.5 5.6 2.6-0.2 6.9 0.1 7.1-2.3 0.1-2.5 0.4-6.2-2.0-6.1z\""],["bm-muscle","core","path"," d=\"m73.2 88.4c-1.8-0.0-1.4 3.8-1.2 6.2 0.1 2.2 4.7 2.1 7.6 2.3 2.2 0.1 2.0-3.5 1.9-5.5-0.1-1.7-5.3-2.7-8.2-3z\""],["bm-muscle","core","path"," d=\"m69.3 97.0c-2.9 0.2-7.1-0.0-7.2 1.9-0.0 2.4-0.0 6 2.2 6.4 2.5 0.5 6.7 1.3 6.9-1.3 0.0-2.9 0.5-7.1-1.9-7.0z\""],["bm-muscle","core","path"," d=\"m73.3 97.0c-1.9 0-1.5 4.3-1.4 7.0 0.0 2.7 4.3 1.8 6.9 1.3 2-0.4 2.0-3.9 2-6.3-0.0-1.5-4.7-1.9-7.5-2.0z\""],["bm-ln",null,"path"," d=\"m53.9 83.6c2.3 1.7 4.3 3.6 6.1 5.5\""],["bm-ln",null,"path"," d=\"m89.0 83.5c-2.5 1.9-4.7 4.0-6.4 6.3\""],["bm-sil",null,"path"," d=\"m232.8 128.7c-0.2-2.6-0.7-7.1-0.4-13.1 0.2-6.4 0.8-11.6-1.5-17.9-1.0-3-3.7-6.3-4-8.0 0.5-5.4 0.0-10.9-2.4-14.7 1.7-10.3-2.2-20.5-13.5-20.7-4.7-3.4-13.1-6.2-14.5-9.1-0.3-1.8-0.3-3.6-0.1-5.5 0.2-0.7 0.5-1.6 0.9-2.5 2.0-0.5 3.8-8.1 1.5-7.8 0.8-9.4-4.2-14.5-10.3-14.5-6.3 0-11.3 5.6-10.5 14.5-2.4 0.0-0.2 7.2 1.5 7.7 0.2 0.9 0.6 1.7 1.1 2.5l-0.1 5.3c-1.5 3.7-9.8 6.5-14.0 9.0-12.7 0.2-16.1 11.5-14.6 21.2-2.3 4.3-3.0 9.6-2.5 14.7-0.0 1.1-3.4 5.5-5.0 10.6-1.5 5.2-0.7 11.4-0.8 17.3 0 5.3-0.8 10.8-0.5 12.7-0.1 2.9-0.5 6.1-0.5 9.0 0.6 4.9 2.7 9.6 7.5 12.2 1.5 0.4 1.8-1.9 1.5-3-2.1-2.9-3-6.4-2.3-9.5 0.1-0.2 0.5-0.1 0.6 0.0 0.1 2.3 0.2 5.6 2.5 5.5 1.0-0.0 0.5-3 0.3-5.5 0.4-3.9-0.2-7.9-3.0-9.8-0.1-5.1 3.0-11.0 6.5-16.6 3.1-5.5 3.0-11.8 2.8-16.9 2.9-3.7 5.0-7.6 5.6-11.8 1.5 3.9 3.7 7.4 6.0 10.6 0.2 2.1-0.8 4.8-1.4 7.8-0.5 2.8-0.3 5.4 0.0 8.1-3.8 6.7-5.8 14.8-5.4 22.7-2.5 9.1-2.1 19.4 2.4 32 0.4 4.6 0.5 10.4 0.3 14-4.5 7.6-6.5 16.1-2.9 24.2 0.7 6.5 2.9 13.8 3.4 20.1 0.1 2.8-0.0 5.6-0.6 8.1-1.2 1.7-3.2 3.0-5.7 3.9-2 0.6-1.9 3.0 0.0 3.8 2 0.7 4.4 1.0 6.0 2.2 2.3 1.6 6.7 1.9 8.8 0.5 1.5-1.3 0.5-4.8-0.0-7.3 0.2-1.9 1-3.7 0.3-5.6-0.8-2.5-0.8-5.5-0.3-8.7 1-5.9 2.4-12.2 4.0-17.4 2.9-6.1 1.2-14.7-1.4-20.3 2.2-3.7 3.5-8.2 3.5-12.5 3.2-12.6 5.6-25.9 5.0-36.5l1.6-1.1 0.9 0.9c-0.6 11.0 1.4 23.3 4.6 35.5 0.0 5.1 1.2 10.3 3.2 13.9-2.9 6.5-4.8 14.1-0.6 21.6 1.3 6.5 3.4 13.4 3.7 19.5 0.1 2.4-0.8 4.6-1.4 6.7-0.2 1.6 0.4 3.3 0.7 4.8-0.7 2.5-1.9 5.7 0.1 7 2.5 1.2 6.8 0.5 9.0-1.0 1.9-1.0 4.4-1.3 6.4-2.2 1.1-0.7 0.8-2.8-0.7-3.4-2.7-0.9-4.7-2.5-5.7-4.3-0.5-3-0.6-6.3-0.1-9.8 1.0-6.2 1.9-12.5 2.9-18.3 3.4-8.0 1.6-16.6-2.3-23.6-0.1-4.8-0.1-10.1 0.0-14.8 4.3-9.7 5.2-21.5 3.0-31.8 0.3-8-1.6-16.0-5.2-22.5 0.3-3.4 0.0-7-1.0-10.5-0.5-2.8-0.3-5.3 0.1-7.4 2.6-3.2 4.6-6.7 5.9-9.9 0.3 4.4 2.6 8.5 4.9 12.0-0.6 5.5-0.4 11.0 3 17.0 3.3 5.6 6.6 11.3 6.2 16.8-2.7 2.1-3.6 5.3-3.2 8.7 0 2.2-0.6 4.5-0.5 6.3 0.1 0.7 1.0 0.8 1.6 0.5 1.6-0.8 1.5-3.6 1.8-5.4 0.1-0.2 0.5-0.1 0.6 0.0 0.2 3.4-0.9 6.7-2.9 9.4-0.1 1.4 0.5 3.3 1.9 2.8 4.7-3.0 6.5-7.6 7.4-12-0.0-3.3-0.4-8.0-0.1-10.8z\""],["bm-dark",null,"path"," d=\"m208.6 232.4-0.1-0.3c-0.4-2.1-1.3-4.6-1.1-7.8 0.6-6.7 2.2-13.6 3.5-20.3-4.6 9.7-8.3 21.1-6.6 31.1-1.4-0.8-3.4-0.7-4.7 0.2-0.7 0.2-1.0 0.3-0.7 0.8-0.6 2.4-1.3 5.6 0.7 6.9 2.6 1.1 6.5 0.5 8.9-1.0 2-0.9 4.5-1.1 6.5-2.1 1.1-0.7 0.9-2.6-0.6-3.2-2.4-0.8-4.4-2.2-5.6-4z\""],["bm-dark",null,"path"," d=\"m232.4 129.8c-0.5-0.8-1.7-1.2-3.0-1.0-1.4 0.4-2.5 1.2-3.6 1.9-2.6 1.9-3.2 4.9-2.8 7.7 0.0 2.0-0.5 4.0-0.5 5.8 0.1 0.6 1.0 0.7 1.6 0.5 1.6-0.8 1.5-3.5 1.8-5.3 0.1-0.2 0.5-0.1 0.6 0.0 0.2 3.3-0.9 6.6-2.8 9.4-0.1 1.4 0.5 3.0 1.9 2.5 4.6-2.9 6.3-7.4 7.3-11.9-0.0-3.4-0.0-6.7-0.5-9.7z\""],["bm-muscle","schiena","path"," d=\"m210.8 54.2c-1.2-0.1-2.0 0.0-2.5 0.5-0.9 1.8-4.1 3.5-8.0 4.5 2.3 0.1 4.3 0.4 6.1 0.5 1.7-1.7 3.5-3.4 4.5-5.7z\""],["bm-muscle","schiena","path"," d=\"m166.7 53.9c-1.0 0.2-1.8 0.6-2.2 1.5 1.6 1.7 3.6 3.2 5.8 4.3l5.0-0.1c-3.9-1.2-7-3.1-8.6-5.6z\""],["bm-muscle","schiena","path"," d=\"m188.1 38.8c-1.9-0.4-3.8-0.4-5.4 0.0 0.2 5.1-3.0 8.9-7.5 11.5-2.6 1.7-6.5 3.0-6.0 5.0 0.7 1.9 3.9 2.9 6.5 4.1 7.2 4.4 9.3 19.3 11.6 28.9h1.0l0.6-0.0c1.9-9.7 3.1-25.3 10.5-28.6 3.2-1.1 7.4-2.4 7.4-4.7-0.7-1.4-4.5-3.0-7.7-5.0-4.3-2.6-6.4-6.5-6.2-11.1-1.6-0.3-3.2-0.3-4.7-0.0z\""],["bm-muscle","spalle","path"," d=\"m213.2 55.1c-3.1 0.4-5.4 2.4-6.1 4.7 2.7 2.1 5.3 4.6 7.8 7.2 3.6 1.9 6.6 4.6 9.0 7.2 1.1-8.5-2.3-18.4-10.8-19.2z\""],["bm-muscle","spalle","path"," d=\"m162.1 55.2c-8.4 1.3-11.4 11.0-10 18.4 3.1-2.7 6.7-5.1 10.2-7.4 2.3-2.0 4.6-3.8 6.6-6.2-1.0-2.9-3.8-4.5-6.9-4.7z\""],["bm-muscle","braccia","path"," d=\"m158.7 70.5c-8.0 2.5-10.5 12.2-9.0 19.0 1.5-2.1 3.0-4.0 4.8-5.2 1.5-4.8 3.5-9.3 4.9-13.5l-0.6-0.2z\""],["bm-muscle","schiena","path"," d=\"m216.7 70.5-0.9 0.2c-0.9 3.7-2.3 7.5-3.0 11.3-0.4 6.3 2.9 13.1 7.8 15.4 0.3-4.4 0.6-9.2 1.0-13.9-1.0-4.9-2.8-9.2-4.8-13.0z\""],["bm-muscle","braccia","path"," d=\"m217.3 70.5-1.0 0.2c2.3 3.8 4.0 8 5.6 12.3 2.1 2.3 3.6 5.1 4.5 7.9 1.3-8.0-0.8-18.0-9.1-20.5z\""],["bm-muscle","schiena","path"," d=\"m159.9 71.7c-2.6 3.9-5.5 8.5-5.6 13.4 0.0 4.5 0.5 9 0.9 12.5 4.5-3.2 7.8-8.3 7.9-14.0-0.5-4.4-1.6-8.4-3.2-11.9z\""],["bm-muscle","schiena","path"," d=\"m170.2 94c0.2 1.5 0.5 3.0 1.1 4.3 2.2 2.7 2.9 6.4 4.8 8.7 1.6-0.0 2.5-1.5 2.5-3.0-2.4-4.0-5.4-7.1-8.5-10z\""],["bm-muscle","schiena","path"," d=\"m205.4 94.1c-3.4 3.5-6.7 6.9-8.9 10.0 0.1 1.5 0.9 2.8 2.6 2.8 1.2-2.8 1.8-6.3 4.2-8.7 1.2-1.1 1.7-2.6 2-4.1z\""],["bm-muscle","glutei","path"," d=\"m180 110.8c-4.4 0.1-8.0 3.0-8.5 7.1-0.5 2.7-3.5 5.0-4.9 8.4-1.6 4.8 0.8 11.2 6 11.5 5.9-0.2 13.5-1.8 14.5-7.5 1.0-7.2-1.5-15.7-6.9-19.6z\""],["bm-muscle","glutei","path"," d=\"m195.5 110.8c-5.6 4.1-8.3 12.3-7.0 19.3 1.1 5.8 8.9 7.6 14.8 7.9 5.4-0.7 7.1-7.4 5.4-11.9-1.5-3.1-4.5-5.8-4.8-9.2-0.7-3.8-4.5-5.9-8.3-6.1z\""],["bm-muscle","gambe","path"," d=\"m175.7 138.6c-2.9-0.1-4.8 2.6-5.8 5.8-2.6 10.1-3.4 21.7-3.2 32.6 1.9-5.9 6.2-11.2 8.5-17.4 1.6-6.4 1.4-14.1 1.8-20.6l-1.2-0.4z\""],["bm-muscle","gambe","path"," d=\"m177.7 139c-0.4 6.0-1.6 12.7-0.7 18.7 1.4 5.2 3.2 10.2 3.6 14.7 4.2-10.3 3.7-25.0-2.9-33.4z\""],["bm-muscle","gambe","path"," d=\"m196.8 138.7c-6.4 9.1-6.5 23.4-1.3 33 1.0-4.5 3.2-8.8 3.9-13.6-0.8-6.9-1.1-13.5-1.5-19.1l-1-0.1z\""],["bm-muscle","gambe","path"," d=\"m198.6 138.8c0.0 6.0-0.0 12.7 1.1 18.6 2.0 7.1 6.0 13.5 8.4 19.4 0.2-10.7-0.3-22.8-3.4-34.2-0.8-3.1-3.2-4.3-6.1-3.8z\""],["bm-muscle","gambe","path"," d=\"m169 178.9c-5.1 6.0-8.2 15.2-4.8 23.2 0.8 1.9 2.8 3.5 4.5 2.5 2.7-1.8 3.2-6.1 3.2-10.2 0-6.1-0.4-14.7-2.9-15.5z\""],["bm-muscle","gambe","path"," d=\"m175.1 179.5c-2.8 6.8-4.1 18.3-0.4 24.4 0.7 1.2 2.3 1.3 3.2 0.2 4.8-6.2 2.3-17.8-2.8-24.6z\""],["bm-muscle","gambe","path"," d=\"m199.7 179.5c-4.3 6.3-7.5 15.1-4.1 23.0 0.6 1.6 2.3 3.0 3.7 1.9 2.9-2.3 3.1-7.4 3.0-12.2-0.1-5.6-0.7-11.3-2.6-12.8z\""],["bm-muscle","gambe","path"," d=\"m205.7 178.8c-2.7 3.0-3.2 12.0-2.8 18.6 0.1 3.7 1.9 7.7 4.7 7.5 7.1-4.5 5.4-19.4-1.8-26.1z\""],["bm-muscle","gambe","path"," d=\"m164.6 203.8c3.1 11.5 7.3 23.4 6.1 31.2 0.7-0.9 2.5-0.9 3.3-0.1-0.4-4.7-0.0-9.5 0.7-14.1 1.0-5.1 2.2-10.2 3.3-15.6-1.5 0.6-3.1-0.1-3.9-1.6-0.5-1.2-1.1-2.8-2.1-4.1-0.4 2-1.0 4.0-2.5 5.1-1.4 0.8-3.4 0.3-5-0.6z\""],["bm-muscle","gambe","path"," d=\"m196.7 204.6c2.3 9.4 4.5 19.8 4.1 30.0 1.0-0.3 2.3-0.4 3.4 0.2-1.3-9.8 2.0-20.7 6-30.9-0.9 0.8-2.3 1.7-3.6 1.1-2.1-1.0-3-4-3.7-6.8-0.5 2.5-1.4 5.3-3.5 6.4l-2.6-0.0z\""],["bm-ln",null,"path"," d=\"m164.2 203.6c2.1 6.4 4.2 12.8 5.0 18.2 0.1 3.6-1.5 7.4-2.5 10.4 0.0 2.4 0.3 5.7 1.2 5.8 1.1-0.6 2.0-1.7 2.7-3.1\""],["bm-ln",null,"path"," d=\"m210.6 203.8c-4 10.2-8 21-6.4 31.3 0.6 1.3 1.6 3 2.7 3 0.8-1.6 0.9-4 0.9-6.1-1.2-3.0-1.5-6.5-1.2-10.0 1.3-6.0 2.6-12.1 3.8-18.1z\""],["bm-ln",null,"path"," d=\"m187.8 38.9-0.0 11.4-0.6 2.1 0.5 2.2 0.0 3.7-0.0 30.1\""],["bm-ln",null,"path"," d=\"m187.8 88.6-0.0 31.2\""],["bm-ln",null,"path"," d=\"m182.7 38.8c0.2 4.2-1.9 7.8-6.1 10.3-3.3 2.0-7.9 3.8-8.5 5.4 0.2 2.3 3.8 3.7 7.2 5.1 7.3 3.8 9.6 17.8 11.0 27.8 0.7 2.8-1.4 6.6-4.1 10.1-2.5 3.6-3.0 8.7-1.3 12.0 2.7 3.6 4.7 7.5 6.7 10.0l0.7-0.0 0.4 0.0c2.0-3.7 4.5-7.3 7.3-10.6 0.9-3.9 0.2-8.2-2.1-11.9-2.7-3.7-5.2-7.7-4.2-10.8 1.0-10.0 2.9-23.4 9.8-26.5 3.6-1.2 7.5-2.5 7.6-4.8-1.1-1.6-5.2-3.5-8.9-5.8-3.6-2.3-4.8-6.2-5-10.2\""],["bm-ln",null,"path"," d=\"m161 70.4c0.1 8.9 4.0 18.5 9.6 24.9l8.1 8.6\""],["bm-ln",null,"path"," d=\"m214.8 70.3c-0.2 8.9-4.3 18.0-9.4 23.3l-8.6 10.3\""],["bm-ln",null,"path"," d=\"m188 132.5c-1.4 1.0-3.2 2.1-5.3 2.9\""],["bm-ln",null,"path"," d=\"m192.7 135.6c1.5 0.8 3.3 1.5 5.3 2.0\""],["bm-ln",null,"path"," d=\"m170.1 139.1c-4.7 2.6-7.0 8.3-7.3 13.3\""],["bm-ln",null,"path"," d=\"m204.9 138.9c4.7 3.0 7 8.4 7.6 13.0\""],["bm-ln",null,"path"," d=\"m167.4 166.9c-2.5-5.0-4.3-10.2-4.2-15\""],["bm-ln",null,"path"," d=\"m208.5 166.2c2.1-5.0 3.6-10.0 3.6-14.5\""],["bm-ln",null,"path"," d=\"m182 135.8c2.2 5.6 2.6 12 2.2 17.8\""],["bm-ln",null,"path"," d=\"m191.2 135.7c-1.5 6.3-1.4 13.7-0.1 20.2\""],["bm-ln",null,"path"," d=\"m171.3 115.3c-1.2-0.2-2.4 0-3.0 1-2.9 4.5-4.0 11-2.3 16.0\""],["bm-ln",null,"path"," d=\"m204.7 115.3c1.2-0.3 2.4 0.0 3.2 1.2 2.6 5.2 3.3 12.0 1.5 17.2\""],["bm-ln",null,"path"," d=\"m171.6 167.4c-2.7 3.7-4.2 8-4.5 11.7\""],["bm-ln",null,"path"," d=\"m172.3 167.8c1.9 4 2.4 8.2 2.1 12.2\""],["bm-muscle","gambe","path"," d=\"m175.7 161.5c-1.4 6.4-1.1 14.5 1.6 20.9 3.3-6.0 2.9-15.9-1.6-20.9z\""],["bm-muscle","gambe","path"," d=\"m199 160.9c-4.4 5.4-4.8 15.0-1.4 21.2 2.5-6.3 2.7-14.2 1.8-20.6l-0.4-0.5z\""],["bm-muscle","gambe","path"," d=\"m202.6 167c-1.9 4.8-2.6 9.6-2.5 13.9 2.0-1.5 4.5-1.3 6.8-0.8 0-4.7-1.5-9.4-4.3-13.1z\""],["bm-muscle","gambe","path"," d=\"m171.5 179.2c1.1 0.5 2.1 1.4 2.9 2.5 0.7-4.9 0.4-10.5-2.1-14.5-1 4.2-1.0 8.2-0.7 12z\""],["bm-muscle","schiena","path"," d=\"m171.2 59.7c-3.9 0.6-7.5 3.6-9.8 6.4 1.1 4.4 6.1 8.6 10.8 8.2 1.9-0.0 3.2-1.3 3.3-3.4 0.0-5 0.2-11.4-4.3-11.2z\""],["bm-muscle","schiena","path"," d=\"m175.1 59.7c0.1 9.7 2.5 18.4 10.6 24.4-0.7-10.3-3.1-23.0-10.6-24.4z\""],["bm-muscle","schiena","path"," d=\"m204.2 59.6c-3 0.0-4.0 2.9-4.1 6.1-0.4 3.3-1.1 7.7 2.2 8.4 4.9 0.6 10-3.4 12.3-7.6-2.4-3.7-6.3-6.8-10.4-6.9z\""],["bm-muscle","schiena","path"," d=\"m200.7 59.8c-7.3 1.6-9.7 15.1-10.5 24.4 6.6-5.2 10.1-12.8 10.4-21.0 0.0-1.2 0.3-2.3 0.1-3.3z\""],["bm-muscle","schiena","path"," d=\"m214.7 69.7c-5.4 4.0-11.5 6.0-15.9 3.3-1.5 4.1-5.1 7.8-8.5 11.1-1.6 2.5-0.3 6.5 2.4 10.6 2.4 3.4 3.5 7.1 3.3 11.7 3.6-2.9 7.0-6.7 9.8-12.4 5.3-7.9 8.9-16.7 8.8-24.5z\""],["bm-muscle","schiena","path"," d=\"m176.5 73.2c-5.4 2.8-11.3-0.5-15.7-3.1 0.1 5.3 1.5 11 4.0 16.2 3.1 6.5 9.3 12.4 14.8 17.1-0.8-3.7 1.3-7.5 4.2-11.2 2.2-2.6 3.1-6 0.9-8.5-3.8-3.3-6.5-6.8-8.2-10.4z\""],["bm-muscle","braccia","path"," d=\"m153.4 84.1c-4.9 4.7-5.7 13.0-4.0 20.7 1.6-3.1 3.9-5.4 5.9-6.8-0.0-5.3-0.2-10.1-1.8-13.9z\""],["bm-muscle","braccia","path"," d=\"m221.6 83.7c-0.9 4.9-1.1 9.9-1.0 14.5 2.6 2.0 4.7 4.5 6.0 7.4 1.3-7.4 0.5-17-5-22z\""],["bm-muscle","braccia","path"," d=\"m157 97.6c-4.1 2.3-7.6 6-8.4 11.0-1.5 6.9-3.0 14.0-3.8 19.9l3.1 0.8c-0.8-3.0 0.3-6.8 1.8-10.8 2.2-7.2 4.3-14.6 7.1-20.9z\""],["bm-muscle","braccia","path"," d=\"m147.8 95.9c-3.9 8.7-3.3 21.5-4.5 33.0l2.2-0.4c1.3-8.2 2.9-16.5 3.6-23.7-0.3-3.4-0.7-6.2-1.3-8.8z\""],["bm-muscle","braccia","path"," d=\"m217.6 96.3c-1.2 5.5 0.2 11.4 3.7 17.3 3.0 5.3 5.5 10.8 5.5 15.4l2.5-0.6c-0.9-11.1-4.7-23.3-11.8-32.1z\""],["bm-muscle","braccia","path"," d=\"m227.7 96.0c-0.8 3.9-1.3 7.9-0.8 11.9 0.8 7.1 1.6 14.6 2.9 20.6l2.0 0.4c-1.5-10.6-0.0-23.0-4.2-33.0z\""],["bm-muscle","schiena","path"," d=\"m171.8 98.6c-2.5 3.7-3.4 8.0-2.4 11.5 1.9-2.2 4.3-3.0 6.3-2.9-0.0-3.7-1.3-6.8-3.9-8.6z\""],["bm-muscle","schiena","path"," d=\"m203.6 98.5c-3.1 2.0-4.2 5.4-4.4 8.7 2.9 0.0 5.6 1.2 7.0 3.2 0.7-4.6-0.3-8.8-2.6-11.9z\""],["bm-muscle","schiena","path"," d=\"m175.2 107.1c-3.2-0.0-5.8 1.9-5.7 4.4 0.0 1.7 1.0 3.1 2.4 3.8 2.4-3.0 5.5-4.8 8.9-5.0-0.9-1.9-3.1-3.2-5.6-3.2z\""],["bm-muscle","schiena","path"," d=\"m200.7 107.1c-3.0 0.0-5.3 1.8-6.6 3.8 3.9 0.1 7.3 2.2 9.5 5.1 2-0.2 3.3-1.5 3.2-3.6-0.0-3.0-2.9-5.2-6.1-5.3z\""]];
const MC_VIEWBOX = '20.5 8.5 218.2 256';
function renderBodyMap(active, loads) {
  const cls = (g) => {
    let c = 'bm-muscle';
    if (loads) {
      const lvl = volLevel((loads[g] || {}).sets || 0);
      if (lvl) c += ' active load-' + lvl;
    } else if (active.indexOf(g) !== -1) c += ' active';
    if (active.indexOf(g) !== -1) c += ' sel active';
    return c;
  };
  let s = '<svg viewBox="' + MC_VIEWBOX + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Muscoli coinvolti">';
  s += '<g class="bm-body">';   /* il "respiro" della tavola originale */
  MC_PARTS.forEach(p => {
    s += '<' + p[2] + ' class="' + (p[1] ? cls(p[1]) : p[0]) + '"' + (p[1] ? ' data-g="' + p[1] + '"' : '') + p[3] + '/>';
  });
  s += '</g>';
  s += '<text class="bm-label" x="71" y="259">FRONTE</text><text class="bm-label" x="187" y="259">RETRO</text>';
  return s + '</svg>';
}

/* Spiegazioni scritte in parole semplici: quello che vedi acceso nel
   disegno deve corrispondere a quello che leggi. */

/* Parametri di partenza uguali per tutti: si sceglie l'esercizio, non i numeri.
   Le regolazioni si fanno il giorno dell'allenamento. */
const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;
const REPS_MIN = 3;       /* con un carico: dalle 3 ripetizioni di forza alle 20 di resistenza (il coach prescrive anche 3x5 e 5x3) */
const REPS_MAX = 20;
/* corpo libero: dipende dalla corporatura. Chi pesa molto o e alle prime trazioni ne fa 1 o 2, chi e leggero e forte
   ne fa 25. Per questo il minimo e 1 e il massimo sale. */
const REPS_MIN_CORPO = 1;
const REPS_MAX_CORPO = 30;

/* Eccezione onesta: gli isometrici si misurano in secondi, non in ripetizioni
   (un plank da 10 "reps" non vuol dire niente). Per loro la scala e' piu ampia. */
const TIME_MIN = 10;
const TIME_MAX = 120;
window.isTimeBased = function(name) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('isTimeBased') : null;   /* dentro buildProgram: una volta per nome */
  if (t !== null) { const v = t.get(name); if (v !== undefined) return v; }
  const m = findExercise(name), r = !!m && (m.tempo === true || (m.group === 'core' && m.reps >= 25));
  if (t !== null) t.set(name, r);
  return r;
};
/* esercizi a un lato alla volta: le ripetizioni sono "per lato" */
window.perLato = function(name) { const m = findExercise(name); return !!(m && m.lato); };
/* corpo libero: niente kg, al massimo una zavorra */
window.corpoLibero = function(name) { const m = findExercise(name); return !!m && !m.weight && attrezzoDi(name) === 'corpo'; };
/* trazioni e dip a corpo libero, e le trazioni assistite alla macchina (il carico e il proprio corpo meno l aiuto) */
window.repsCorporatura = function(name) { return corpoLibero(name) || /assistit/i.test(String(name)); };
window.repsRange = function(name) {
  if (isTimeBased(name)) return { min: TIME_MIN, max: TIME_MAX };
  return repsCorporatura(name) ? { min: REPS_MIN_CORPO, max: REPS_MAX_CORPO } : { min: REPS_MIN, max: REPS_MAX };
};
window.defaultRepsFor = function(name) {
  const m = findExercise(name);
  return isTimeBased(name) ? (m ? m.reps : 30) : DEFAULT_REPS;
};

window.weekUsage = function() {
  const data = loadData();
  const map = {};
  DAYS.forEach(d => {
    if (isRestDay(d)) return;
    (data[d] || []).forEach(e => {
      if (!map[e.name]) map[e.name] = [];
      if (map[e.name].indexOf(d) === -1) map[e.name].push(d);
    });
  });
  return map;
};

/* Stato di un esercizio rispetto alla settimana:
   'today'  = gia in scheda nel giorno che stai costruendo (verde)
   'week'   = gia scelto in un altro giorno (ambra, va in fondo)
   null     = mai scelto (neutro, ha la precedenza) */
window.usageState = function(name, usage) {
  const u = usage || weekUsage();
  const giorni = u[name] || [];
  if (giorni.indexOf(currentDay) !== -1) return { level: 'today', days: giorni };
  if (giorni.length) return { level: 'week', days: giorni };
  return { level: null, days: [] };
};

function usageBadge(st) {
  if (!st.level) return '';
  if (st.level === 'today') return '<span class="use-tag today">\u2713 in scheda oggi</span>';
  const altri = st.days.filter(d => d !== currentDay);
  /* un giorno solo: "gia" e il nome del giorno in due pezzi di testo, cosi il nome si traduce da solo */
  const txt = altri.length === 1 ? '<span>gia</span> <span>' + escapeHtml(altri[0]) + '</span>' : 'gia in ' + altri.length + ' giorni';
  return '<span class="use-tag week">\u21BB ' + txt + '</span>';
}

function usageRank(st) {
  if (!st.level) return 0;          /* mai scelto: primo */
  if (st.level === 'week') return 1; /* scelto altrove: dopo */
  return 2;                          /* gia oggi: ultimo */
}

/* Soglie di volume settimanale per gruppo, dalla letteratura:
   sotto le 10 serie sei sotto il minimo utile, tra 10 e 22 sei nel
   range consigliato, oltre la fatica cresce piu del beneficio. */
const VOL_MIN_UTILE = 10;
const VOL_MAX_UTILE = 22;

window.weeklyVolumeByGroup = function() {
  const data = loadData();
  const vol = {};
  Object.keys(MUSCLE_GROUPS).forEach(g => { vol[g] = { sets: 0, days: 0, indirette: 0, maxSeduta: 0 }; });
  DAYS.forEach(d => {
    if (isRestDay(d)) return;
    const visti = {};
    const inSeduta = {};
    (data[d] || []).forEach(e => {
      const m = findExercise(e.name);
      if (!m) return;
      const n = Number(e.sets) || 0;
      vol[m.group].sets += n;
      inSeduta[m.group] = (inSeduta[m.group] || 0) + n;
      if (!visti[m.group]) { vol[m.group].days += 1; visti[m.group] = true; }
      /* i multiarticolari lavorano anche i muscoli che aiutano: mezza serie */
      if (m.type === 'compound') (MUSCLE_GROUPS[m.group].synergists || []).forEach(sg => {
        if (!vol[sg]) return;
        vol[sg].indirette += n * 0.5;
        inSeduta[sg] = (inSeduta[sg] || 0) + n * 0.5;
      });
    });
    Object.keys(inSeduta).forEach(g => { if (vol[g] && inSeduta[g] > vol[g].maxSeduta) vol[g].maxSeduta = inSeduta[g]; });
  });
  return vol;
};

function volLevel(sets) {
  if (sets <= 0) return null;
  if (sets < VOL_MIN_UTILE) return 'start';
  if (sets <= VOL_MAX_UTILE) return 'ok';
  return 'high';
}

function volLabel(v) {
  const lvl = volLevel(v.sets);
  if (!lvl) return '';
  const gg = v.days === 1 ? '1 giorno' : v.days + ' giorni';
  const ind = v.indirette ? ' \u2022 +' + numeroLingua(Math.round(v.indirette * 2) / 2) + ' indirette' : '';
  /* oltre ~11 serie per muscolo nella stessa seduta il guadagno cala (Remmert 2025) */
  const tetto = v.maxSeduta > 11 ? ' \u2014 troppe in un giorno: dividile' : '';
  if (lvl === 'high') return v.sets + ' serie \u2022 ' + gg + ind + ' \u2014 carico alto' + tetto;
  return v.sets + ' serie \u2022 ' + gg + ind + tetto;
}


function renderGruppi() {
  const data0 = loadData();
  syncBuildingLine((data0[currentDay] || []).length);

  const vol = weeklyVolumeByGroup();
  document.getElementById('body-map').innerHTML = renderBodyMap(selectedGroups, vol);

  /* Il pulsante appare solo quando c e davvero qualcosa da nascondere.
     Prima restava sempre in pagina, solo disattivato: sembrava rotto. */
  const clearBtn = document.getElementById('clear-sel-btn');
  if (clearBtn) {
    clearBtn.style.display = selectedGroups.length ? 'block' : 'none';
    clearBtn.innerText = '\u2715 Nascondi le proposte (' + selectedGroups.length + ')';
  }
  document.getElementById('group-grid').innerHTML = Object.keys(MUSCLE_GROUPS).map(id => {
    const g = MUSCLE_GROUPS[id];
    const n = EXERCISE_LIBRARY.filter(e => e.group === id).length;
    const acceso = selectedGroups.indexOf(id) !== -1;
    const v = vol[id];
    const lvl = volLevel(v.sets);
    const check = lvl === 'high' ? '!' : '\u2713';
    return '<div class="group-card ' + (acceso ? 'selected ' : '') + (lvl ? 'vol-' + lvl : '') + '" onclick="openGroupSheet(\'' + id + '\')">' +
      (lvl ? '<span class="vol-check ' + lvl + '">' + check + '</span>' : '') +
      '<div class="group-emoji group-fig">' + muscleFigure(id) + '</div>' +
      '<div class="group-label">' + g.label + '</div>' +
      (lvl
        ? '<div class="group-vol ' + lvl + '">' + volLabel(v) + '</div>'
        : '<div class="group-count">' + n + ' esercizi</div>') +
    '</div>';
  }).join('');

  /* Schede consigliate in carosello orizzontale: si scorre di lato,
     la pagina non si allunga. Se non hai scelto nulla mostra le piu usate. */
  const base = selectedGroups.length
    ? WORKOUT_TEMPLATES.map(t => {
        const hits = t.exercises.filter(e => {
          const m = findExercise(e.name);
          return m && selectedGroups.indexOf(m.group) !== -1;
        }).length;
        return { tpl: t, ratio: hits / t.exercises.length };
      }).filter(x => x.ratio >= 0.4).sort((a, b) => b.ratio - a.ratio)
    : WORKOUT_TEMPLATES.map(t => ({ tpl: t, ratio: null }));

  const tplCard = document.getElementById('group-templates-card');
  if (base.length) {
    tplCard.style.display = 'block';
    const usage = weekUsage();
    /* Ogni scheda dice quanto dei suoi esercizi hai gia in programma:
       nuova (neutro), parziale (ambra), gia caricata (verde). Le schede
       ancora da usare restano davanti nel carosello. */
    const conStato = base.map(x => {
      const t = x.tpl;
      const inOggi = t.exercises.filter(e => (usage[e.name] || []).indexOf(currentDay) !== -1).length;
      const inSett = t.exercises.filter(e => (usage[e.name] || []).length > 0).length;
      let stato = 'fresh';
      if (inOggi === t.exercises.length) stato = 'done';
      else if (inSett > 0) stato = 'partial';
      return Object.assign({}, x, { inOggi: inOggi, inSett: inSett, stato: stato });
    });
    const ordine = { fresh: 0, partial: 1, done: 2 };
    conStato.sort((a, b) => ordine[a.stato] - ordine[b.stato]);

    document.getElementById('group-templates').innerHTML = conStato.map(x => {
      const t = x.tpl;
      const totalSets = t.exercises.reduce((s2, e) => s2 + e.sets, 0);
      const estMin = Math.round(durataSeduta(t.exercises));   /* CAS-05, B36 (INT-2b): la stessa stima del generatore, di Oggi e di Aggiungi allenamento */
      const etichetta = x.stato === 'done'
        ? '\u2713 <span>gia caricata su</span> <span>' + escapeHtml(getDayTitle(currentDay)) + '</span>'   /* il nome del giorno si traduce da solo */
        : (x.stato === 'partial'
            ? '\u21BB ' + x.inSett + ' di ' + t.exercises.length + ' gia in settimana'
            : '\u2726 nuova');
      return '<div class="carousel-card tpl-' + x.stato + '">' +
        '<div class="template-card-head"><div class="template-name">' + escapeHtml(t.title) + '</div>' +
        '<span class="template-tag">' + escapeHtml(t.tag) + '</span></div>' +
        '<div class="template-desc">' + escapeHtml(t.desc) + '</div>' +
        '<div class="template-meta">' + t.exercises.length + ' esercizi \u2022 ' + totalSets + ' serie \u2022 ~' + estMin + ' min' +
        (x.ratio !== null ? ' \u2022 ' + Math.round(x.ratio * 100) + '% in linea' : '') + '</div>' +
        '<span class="tpl-state ' + x.stato + '">' + etichetta + '</span>' +
        '<div class="template-actions" style="margin-top:8px;">' +
          '<button class="template-btn replace" onclick="applyTemplate(\'' + t.id + '\', true)">Sostituisci</button>' +
          '<button class="template-btn append" onclick="applyTemplateFromGroups(\'' + t.id + '\')">Aggiungi</button>' +
        '</div>' +
      '</div>';
    }).join('');
  } else {
    tplCard.style.display = 'none';
  }
}

window.addLibraryExercise = function(name, rowIdx) {
  const meta = findExercise(name);
  if (!meta) return;
  /* Se l'esercizio arriva dalla lista Gruppi, prende i valori che l'utente
     ha eventualmente modificato nei campi; altrimenti quelli consigliati. */
  const readField = (k, fallback) => {
    if (rowIdx === undefined || rowIdx === null) return fallback;
    const el = document.getElementById('lp-' + k + '-' + rowIdx);
    if (!el) return fallback;
    const v = parseFloat(el.value);
    return isNaN(v) ? fallback : v;
  };
  const data = loadData();
  data[currentDay].push(normalizeExerciseRecord({
    name: meta.name,
    sets: readField('sets', DEFAULT_SETS),
    reps: readField('reps', defaultRepsFor(meta.name)),
    weight: readField('weight', pesoPartenza(meta.name).peso),
    rest: readField('rest', meta.rest),
    stimato: pesoPartenza(meta.name).stimato ? pesoPartenza(meta.name).fonte : undefined,
    completedSets: []
  }));
  saveData(data);
  renderPiano();
  renderAllenamento();
  if (sheetGroup) renderSheetExercises(); else renderGruppi();
};

window.applyTemplateFromGroups = function(templateId) {
  applyTemplate(templateId, false);
  renderGruppi();
};
