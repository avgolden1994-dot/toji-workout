/* Tab Storico
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   TAB STORICO
   ============================================================ */
/* Riga compatta di una seduta: una riga sola invece della card con tutti
   gli esercizi, cosi anche dopo mesi la lista resta leggibile. */
function rigaSeduta(session, i, conGiorno) {
  const fatte = session.exercises.reduce((a, e) => a + e.doneSets, 0);
  const tot = session.exercises.reduce((a, e) => a + e.totalSets, 0);
  const vol = session.sessione ? session.sessione.reduce((t, e) => t + e.sets.filter(x => x.done)
    .reduce((q, x) => q + (Number(x.reps) || 0) * (Number(x.weight) || 0), 0), 0) : 0;
  const d = dataSessione(session);
  return '<button class="history-card hs-row" onclick="openHistoryDetail(' + i + ')">' +
    '<span class="hs-date" data-no-tr><b>' + (d ? d.getDate() : '') + '</b>' + (d ? d.toLocaleDateString(LOCALE(), conGiorno ? { weekday: 'short' } : { month: 'short' }).replace('.', '') : '') + '</span>' +
    '<span class="hs-main"><span class="hs-title">' + escapeHtml(session.titolo || getDayTitle(session.day)) +
      (session.berserk ? ' <span class="hs-tag">Cedimento</span>' : '') + (session.importata ? ' <span class="hs-tag">' + escapeHtml(session.importata) + '</span>' : '') + '</span>' +
    '<span class="hs-meta">' + session.exercises.length + (session.exercises.length === 1 ? ' esercizio' : ' esercizi') +
      ' • ' + fatte + '/' + tot + ' serie' + (vol > 0 ? ' • ' + Math.round(vol).toLocaleString(LOCALE()) + ' kg' : '') + '</span>' +
      (session.cardio && session.cardio.length ? '<span class="hs-cardio">' + ico('cardio') + ' <span>Cardio</span> <span data-no-tr>' + session.cardio.reduce((t, c) => t + (Number(c.min) || 0), 0) + ' min</span></span>' : '') + '</span>' +
    '<span class="aw-path-go">›</span></button>';
}

/* Storico in ordine: mese, poi settimane 1-4 del mese (1-7, 8-14, 15-21,
   22-fine), poi gli allenamenti con la loro data. */
function htmlStoricoOrdinato(history) {
  const gruppi = [];
  const perMese = {};
  history.forEach((x, i) => {
    const d = dataSessione(x);
    const km = d ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') : 'zzzz';
    if (!perMese[km]) { perMese[km] = { d: d, sett: {} , n: 0 }; gruppi.push(km); }
    const w = d ? Math.min(4, Math.ceil(d.getDate() / 7)) : 0;
    (perMese[km].sett[w] = perMese[km].sett[w] || []).push({ x: x, i: i, d: d });
    perMese[km].n++;
  });
  gruppi.sort().reverse();
  return gruppi.map(km => {
    const M = perMese[km];
    const nomeMese = M.d ? M.d.toLocaleDateString(LOCALE(), { month: 'long', year: 'numeric' }) : tr('Senza data');
    const fineMese = M.d ? new Date(M.d.getFullYear(), M.d.getMonth() + 1, 0).getDate() : 0;
    const mese = M.d ? M.d.toLocaleDateString(LOCALE(), { month: 'short' }).replace('.', '') : '';
    return '<div class="hs-mese"><span data-no-tr>' + nomeMese.charAt(0).toUpperCase() + nomeMese.slice(1) + '</span> <small>· <span>' + M.n + (M.n === 1 ? ' allenamento' : ' allenamenti') + '</span></small></div>' +
      Object.keys(M.sett).map(Number).sort((a, b) => b - a).map(w => {
        const da = (w - 1) * 7 + 1, a2 = w === 4 ? fineMese : w * 7;
        const righe = M.sett[w].sort((p, q) => (q.d || 0) - (p.d || 0));
        return '<div class="hs-sett"><span><span>' + (w ? 'Settimana ' + w : '') + '</span>' + (w ? ' · <span data-no-tr>' + da + '–' + a2 + ' ' + mese + '</span>' : '') + '</span><b>' + righe.length + '</b></div>' +
          righe.map(r => rigaSeduta(r.x, r.i, true)).join('');
      }).join('');
  }).join('');
}

function renderStorico() {
  const history = loadHistory();
  renderProgressiTop();
  try { renderFatica(); renderPesoCard(); renderAnno(); renderPgTiles(); } catch (e) {}
  const container = document.getElementById('history-list');
  if (history.length === 0) {
    container.innerHTML = '<span class="muted">Nessun allenamento completato.</span>';
    return;
  }
  container.innerHTML = htmlStoricoOrdinato(history);
}

/* Numeri in cima a Progressi e l elenco dei blocchi da 4 settimane */
function renderProgressiTop() {
  const box = document.getElementById('pg-kpis');
  if (!box) return;
  const sed = tutteLeSedute();
  const sett = {};
  sed.forEach(h0 => { const d = dataSessione(h0); if (d) sett[ymd(lunediDi(d))] = 1; });
  box.innerHTML =
    '<div class="pg-kpi"><b>' + sed.length + '</b><span>allenamenti</span></div>' +
    '<div class="pg-kpi"><b>' + Object.keys(sett).length + '</b><span>settimane attive</span></div>' +
    '<div class="pg-kpi"><b>' + settimaneDiFila() + '</b><span>settimane di fila</span></div>';

  const bl = blocchiQuattroSettimane();
  const cont = document.getElementById('pg-blocchi');
  if (!bl.length) { cont.innerHTML = '<div class="dv-empty" style="padding:var(--sp-3) 0;">Il primo report compare dopo il primo allenamento.</div>'; return; }
  const d = (x) => x.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  cont.innerHTML = bl.slice().reverse().map(b => {
    const r = calcolaBlocco(b.i);
    const inc = r.mediaInc;
    return '<button class="entry-btn pg-block" onclick="openStats(\'b' + b.i + '\')">' +
      '<span class="pg-bn"><small>Sett.</small>' + (b.i * 4 + 1) + '–' + (b.i * 4 + 4) + '</span>' +
      '<span class="aw-main"><span class="entry-name">' + d(b.da) + ' – ' + d(b.a) + (b.inCorso ? ' <span class="hs-tag on">In corso</span>' : '') + '</span>' +
      '<span class="aw-meta">' + r.sessioni + (r.sessioni === 1 ? ' allenamento' : ' allenamenti') +
        (inc !== null ? ' • carichi <b class="' + (inc > 0 ? 'su' : (inc < 0 ? 'giu' : '')) + '">' + (inc > 0 ? '+' : '') + String(inc).replace('.', ',') + '%</b>' : '') + '</span></span>' +
      '<span class="aw-path-go">›</span></button>';
  }).join('');
}
window.clearHistory = function() {
  if (confirm('Sei sicuro di voler eliminare tutto lo storico progressi?')) {
    localStorage.removeItem(historyKey());
    renderStorico();
  }
};
