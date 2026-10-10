/* Progressi: pagine e pesate
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   PROGRESSI IN ORDINE: icone che aprono la loro pagina
   ============================================================ */
const PG_PAGINE = {
  peso: { t: 'Peso e foto', ico: 'orologio' },
  stats: { t: 'Statistiche', ico: 'poligono' },
  storico: { t: 'Storico', ico: 'lista' }
};
const PG_ICO = {
  orologio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  grafico: '<path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6"/>',
  cuore: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>',
  /* poligono di frequenza: assi, linea che unisce i punti e parte e finisce sulla base */
  poligono: '<path d="M4 4v16h16"/><path d="M4 20l4-8 4 3 4-8 4 13z" fill="currentColor" fill-opacity=".16"/><circle cx="8" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="7" r="1.3" fill="currentColor" stroke="none"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'
};
let pgPagina = null;
function renderPgTiles() {
  const box = document.getElementById('pg-tiles');
  if (!box) return;
  const pts = pesiTutti(), ult = pts[pts.length - 1];
  const fp = fotoPromemoria();
  const n = loadHistory().length;
  const sub = {
    peso: (ult ? '<span data-no-tr>' + numeroLingua(ult.kg) + ' kg</span>' : '<span>' + (fp.dovuta ? 'foto da fare' : 'Peso e foto ogni 2 settimane') + '</span>'),
    stats: '<span>Frequenza e report</span>',
    storico: '<span>' + n + (n === 1 ? ' allenamento' : ' allenamenti') + '</span>'
  };
  box.innerHTML = Object.keys(PG_PAGINE).map(k => '<button class="pg-tile' + (k === 'peso' && fp.dovuta ? ' dovuta' : '') + '" onclick="apriPagProgressi(\'' + k + '\')">' +
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PG_ICO[PG_PAGINE[k].ico] + '</svg>' +
    '<b>' + PG_PAGINE[k].t + '</b><small>' + sub[k] + '</small></button>').join('');
}
window.apriPagProgressi = function(k) {
  pgPagina = k;
  document.getElementById('pg-sheet-title').innerText = PG_PAGINE[k].t;
  document.querySelectorAll('#pg-sheet .pg-pane').forEach(el => { el.hidden = el.getAttribute('data-pane') !== k; });
  if (k === 'peso') { renderPesoCard(); renderFoto(); }
  if (k === 'storico') { renderStorico(); renderWeeks(); }
  if (k === 'stats') { renderProgressiTop(); renderCardioStat(); }
  document.getElementById('pg-sheet').classList.remove('hidden');
  if (k === 'stats') renderStatsPagina();   /* dopo averla aperta: il periodo scelto si porta in vista */
  const b = document.getElementById('pg-sheet-body'); if (b) b.scrollTop = 0;
};
window.chiudiPagProgressi = function() {
  pgPagina = null;
  document.getElementById('pg-sheet').classList.add('hidden');
  renderPgTiles();
};

/* ---- Pesate sotto il grafico ----
   Fino a 6 si vedono tutte; oltre, solo quelle che contano (inizio, calo e
   risalita piu forti, minimo, ultima) e la media verso l obiettivo. */
let pesateTutte = false;
function htmlPesate(pts, ob) {
  if (!pts.length) return '';
  const sg = (v) => (v > 0 ? '+' : '') + numeroLingua(v);
  const dt = (x) => daYmd(x.data).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  const primo = pts[0], ult = pts[pts.length - 1];
  let h = '';
  if (pts.length >= 2) {
    const giorni = Math.max(1, giorniTra(daYmd(primo.data), daYmd(ult.data)));
    const sett = giorni / 7;
    const media = (ult.kg - primo.kg) / Math.max(1, sett);
    h += '<div class="pw-kp">' +
      '<div><span>Media</span><b><span data-no-tr>' + sg(media) + '</span> <span>kg a settimana</span></b></div>' +
      '<div><span>Dall’inizio</span><b><span data-no-tr>' + sg(ult.kg - primo.kg) + ' kg</span> · <span>' + 'in ' + Math.max(1, Math.round(sett)) + (Math.max(1, Math.round(sett)) === 1 ? ' settimana' : ' settimane') + '</span></b></div>';
    if (ob) {
      const manca = ob - ult.kg;
      const verso = Math.abs(manca) < 0.3 ? null : (media !== 0 && Math.sign(media) === Math.sign(manca) ? Math.ceil(Math.abs(manca / media)) : null);
      h += '<div><span>All’obiettivo</span><b>' + (Math.abs(manca) < 0.3 ? '<span>raggiunto</span>' :
        '<span data-no-tr>' + sg(manca) + ' kg</span>' + (verso ? ' · <span>' + 'circa ' + verso + (verso === 1 ? ' settimana' : ' settimane') + '</span>' : ' · <span>serve invertire la tendenza</span>')) + '</b></div>';
    }
    h += '</div>';
  }
  let righe = [];
  if (pts.length <= 6 || pesateTutte) {
    righe = pts.map((x, i) => ({ x: x, t: i === 0 ? 'inizio' : (i === pts.length - 1 ? 'ultima' : ''), d: i ? x.kg - pts[i - 1].kg : null }));
  } else {
    let calo = null, sale = null, min = primo;
    for (let i = 1; i < pts.length; i++) {
      const d = pts[i].kg - pts[i - 1].kg;
      if (!calo || d < calo.d) calo = { x: pts[i], d: d };
      if (!sale || d > sale.d) sale = { x: pts[i], d: d };
      if (pts[i].kg < min.kg) min = pts[i];
    }
    const m = {};
    const metti = (x, t, d) => { if (!m[x.data]) m[x.data] = { x: x, t: t, d: d }; };
    metti(primo, 'inizio', null);
    metti(ult, 'ultima', null);
    if (calo && calo.d < 0) metti(calo.x, 'calo più forte', calo.d);
    if (sale && sale.d > 0) metti(sale.x, 'risalita più forte', sale.d);
    metti(min, 'minimo', null);
    righe = Object.keys(m).sort().map(k => m[k]);
  }
  h += '<div class="pw-list">' + righe.map(r => '<div class="pw-row"><span><span data-no-tr>' + dt(r.x) + '</span>' + (r.t ? ' · <span>' + r.t + '</span>' : '') + '</span>' +
    '<b data-no-tr>' + numeroLingua(r.x.kg) + (r.d !== null && Math.abs(r.d) >= 0.05 ? ' <small class="' + (ob && Math.sign(r.d) === Math.sign(ob - r.x.kg + r.d) ? 'su' : (ob ? 'giu' : '')) + '">' + sg(r.d) + '</small>' : '') + '</b></div>').join('') + '</div>' +
    (pts.length > 6 ? '<button class="set-row-btn" onclick="pesateTutte = !pesateTutte; renderPesoCard();">' + (pesateTutte ? 'Solo le date che contano' : 'Tutte le pesate (' + pts.length + ')') + '</button>' : '');
  return h;
}
