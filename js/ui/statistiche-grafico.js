/* Statistiche: poligono di frequenza degli allenamenti
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   POLIGONO DI FREQUENZA
   Le "classi" sono le settimane (da lunedi a domenica) e la frequenza e il
   numero di allenamenti fatti in ognuna. Come in ogni poligono di frequenza
   la linea unisce i punti e parte e finisce sull asse: prima della prima
   settimana e dopo l ultima la frequenza vale zero.
   Si apre da Progressi > Statistiche e in cima a ogni report del periodo.
   ============================================================ */
let statsGrafPeriodo = '8';   /* periodo scelto nella pagina Statistiche */
const STG = { W: 320, H: 190, sx: 26, dx: 14, su: 26, giu: 30 };   /* misure del disegno (viewBox) e margini */

/* Allenamenti per settimana nel periodo scelto ('4' | '8' | '12' | 'programma' | 'tutto' | 'b<N>' per un blocco).
   Le settimane non ancora cominciate non si contano. */
window.frequenzaSettimanale = function(periodo) {
  const bl = periodo.charAt(0) === 'b' ? blocchiQuattroSettimane()[Number(periodo.slice(1))] : null;
  const date = tutteLeSedute().map(dataSessione).filter(Boolean);
  const lunOggi = lunediDi(new Date());
  let da = bl ? bl.da : inizioPeriodo(periodo);
  if (!da) {
    if (!date.length) return { vuoto: true };
    da = date.reduce((a, d) => d < a ? d : a);
  }
  const inizio = lunediDi(da);
  const fine = bl ? piuGiorni(bl.a, 1) : null;
  const ultima = bl && lunediDi(bl.a) < lunOggi ? lunediDi(bl.a) : lunOggi;
  const n = Math.round(giorniTra(inizio, ultima) / 7) + 1;
  if (n < 1) return { vuoto: true };
  const settimane = [];
  for (let i = 0; i < n; i++) settimane.push({ da: piuGiorni(inizio, 7 * i), n: 0, inCorso: false });
  settimane[n - 1].inCorso = ultima.getTime() === lunOggi.getTime();
  date.forEach(d => {
    if (d < da || (fine && d >= fine)) return;
    const s = settimane[Math.floor(giorniTra(inizio, d) / 7)];
    if (s) s.n++;
  });
  const totale = settimane.reduce((t, s) => t + s.n, 0);
  if (!totale) return { vuoto: true };
  /* la settimana in corso e a meta: non abbassa la media */
  const chiuse = settimane.filter(s => !s.inCorso);
  const base = chiuse.length ? chiuse : settimane;
  return { vuoto: false, settimane: settimane, totale: totale,
    media: base.reduce((t, s) => t + s.n, 0) / base.length,
    migliore: Math.max.apply(null, settimane.map(s => s.n)) };
};

/* Il disegno: assi, righe guida, area sotto la linea, linea e punti.
   I colori stanno nel CSS (.stg-*), cosi seguono il tema chiaro e scuro. */
function poligonoFrequenzaSvg(sett) {
  const W = STG.W, H = STG.H, base = H - STG.giu;
  const iw = W - STG.sx - STG.dx, ih = base - STG.su, n = sett.length;
  const max = Math.max.apply(null, sett.map(s => s.n).concat([3]));
  let passo = 1;
  while (max / passo > 5) passo = passo === 1 ? 2 : (passo === 2 ? 5 : passo * 2);
  const alto = Math.ceil(max / passo) * passo;
  /* una classe vuota prima e una dopo: li la linea tocca l asse */
  const X = (k) => STG.sx + (k + 1) / (n + 1) * iw;
  const Y = (v) => base - v / alto * ih;
  const f = (v) => v.toFixed(1);
  const punti = [[X(-1), base]].concat(sett.map((s, i) => [X(i), Y(s.n)]), [[X(n), base]]);
  const giorno = (d) => d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' }).replace('.', '');
  const salto = Math.ceil(n / 6);      /* al massimo 6 date sotto l asse */
  const conValori = n <= 12;           /* oltre, il numero si legge solo sul picco */
  const picco = sett.reduce((m, s, i) => s.n > sett[m].n ? i : m, 0);

  let g = '';
  for (let v = passo; v <= alto; v += passo) {
    g += '<line class="stg-grid" x1="' + STG.sx + '" x2="' + (W - STG.dx) + '" y1="' + f(Y(v)) + '" y2="' + f(Y(v)) + '"></line>';
  }
  for (let v = 0; v <= alto; v += passo) {
    g += '<text class="stg-lbl" x="' + (STG.sx - 6) + '" y="' + f(Y(v) + 3.5) + '" text-anchor="end" data-no-tr>' + v + '</text>';
  }
  g += '<line class="stg-axis" x1="' + STG.sx + '" x2="' + (W - STG.dx) + '" y1="' + base + '" y2="' + base + '"></line>' +
    '<line class="stg-axis" x1="' + STG.sx + '" x2="' + STG.sx + '" y1="' + STG.su + '" y2="' + base + '"></line>';
  g += '<path class="stg-area" d="M' + punti.map(p => f(p[0]) + ',' + f(p[1])).join(' L') + ' Z"></path>' +
    '<polyline class="stg-line" points="' + punti.map(p => f(p[0]) + ',' + f(p[1])).join(' ') + '"></polyline>';
  sett.forEach((s, i) => {
    const x = X(i), y = Y(s.n);
    g += '<circle class="stg-pt' + (s.inCorso ? ' vivo' : '') + '" cx="' + f(x) + '" cy="' + f(y) + '" r="' + (n > 16 ? 2.2 : 3.6) + '">' +
      '<title>' + giorno(s.da) + ': ' + s.n + (s.n === 1 ? ' allenamento' : ' allenamenti') + '</title></circle>';
    if (conValori || i === picco) {
      g += '<text class="stg-val" x="' + f(x) + '" y="' + f(y - 8) + '" text-anchor="middle" data-no-tr>' + s.n + '</text>';
    }
    if (i % salto === 0) {
      g += '<text class="stg-lbl" x="' + f(x) + '" y="' + (H - 8) + '" text-anchor="middle" data-no-tr>' + giorno(s.da) + '</text>';
    }
  });
  return '<svg class="stg-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' +
    escapeHtml('Allenamenti a settimana: ' + sett.map(s => s.n).join(', ')) + '">' + g + '</svg>';
}

/* Grafico + tre numeri, da mettere in una card. Se nel periodo non c e nessun allenamento dice cosi.
   opz.senzaNumeri: solo il grafico; opz.testa: html da mettere sopra il grafico (i pulsanti del periodo);
   opz.id: nome del contenitore di testa + grafico + nota (e il bersaglio della guida). */
function graficoFrequenzaHtml(periodo, opz) {
  opz = opz || {};
  const r = frequenzaSettimanale(periodo);
  if (r.vuoto) return (opz.testa || '') + '<div class="dv-empty">Nessun allenamento in questo periodo.</div>';
  return '<div class="stg-vista"' + (opz.id ? ' id="' + opz.id + '"' : '') + '>' + (opz.testa || '') + poligonoFrequenzaSvg(r.settimane) +
    '<div class="st-nota"><span>Ogni punto è una settimana, da lunedì a domenica.</span>' +
      (r.settimane.some(s => s.inCorso) ? ' <span>Il punto vuoto è la settimana in corso.</span>' : '') + '</div></div>' +
    (opz.senzaNumeri ? '' : '<div class="pg-kpis stg-kpis">' +
      '<div class="pg-kpi"><b data-no-tr>' + r.totale + '</b><span>allenamenti</span></div>' +
      '<div class="pg-kpi"><b data-no-tr>' + numeroLingua(r.media) + '</b><span>media a settimana</span></div>' +
      '<div class="pg-kpi"><b data-no-tr>' + r.migliore + '</b><span>settimana migliore</span></div>' +
    '</div>');
}

/* Pulsanti per cambiare periodo: 'azione' e il nome della funzione da chiamare al tocco */
function scelteStatsPeriodo(attivo, azione, blocchi) {
  const p = getProgramma();
  const scelte = (blocchi ? blocchiQuattroSettimane().slice().reverse().map(b0 => ['b' + b0.i, 'Sett. ' + (b0.i * 4 + 1) + '–' + (b0.i * 4 + 4)]) : [])
    .concat([['4', '4 settimane'], ['8', '8 settimane'], ['12', '12 settimane']])
    .concat(p ? [['programma', 'Programma attuale']] : []).concat([['tutto', 'Tutto']]);
  return '<div class="st-periodo">' + scelte.map(([v, l]) =>
    '<button class="' + (attivo === v ? 'on' : '') + '" onclick="' + azione + '(\'' + v + '\')">' + l + '</button>').join('') + '</div>';
}

/* i pulsanti del periodo scorrono di lato: quello scelto si porta in vista */
function mostraPeriodoAttivo(box) {
  const on = box && box.querySelector('.st-periodo .on');
  if (!on) return;
  const riga = on.parentNode;
  riga.scrollLeft += on.getBoundingClientRect().left - riga.getBoundingClientRect().left - (riga.clientWidth - on.offsetWidth) / 2;
}

/* La pagina Statistiche si apre su questo: il grafico, con il periodo a scelta */
window.setStatsGrafPeriodo = function(v) { statsGrafPeriodo = v; renderStatsPagina(); };
window.renderStatsPagina = function() {
  const box = document.getElementById('pg-stats-grafico');
  if (!box) return;
  if (statsGrafPeriodo === 'programma' && !getProgramma()) statsGrafPeriodo = '8';
  box.innerHTML = '<div class="section-title">Allenamenti a settimana</div>' +
    graficoFrequenzaHtml(statsGrafPeriodo, { id: 'pg-stats-vista', testa: scelteStatsPeriodo(statsGrafPeriodo, 'setStatsGrafPeriodo', false) }) +
    '<button class="entry-btn storico-stats" onclick="openStats(statsGrafPeriodo)">' +
      '<span class="entry-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg></span>' +
      '<span class="aw-main"><span class="entry-name">Carichi per esercizio</span><span class="aw-meta">Dal primo all ultimo carico</span></span>' +
      '<span class="aw-path-go">›</span></button>';
  mostraPeriodoAttivo(box);
};
