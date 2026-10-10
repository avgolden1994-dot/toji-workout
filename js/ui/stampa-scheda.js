/* Condividi e stampa la scheda
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 11. CONDIVIDERE LA SCHEDA ============ */
function righeScheda() {
  const data = loadData();
  const prof = getProfile() || {};
  const out = [];
  DAYS.forEach(d => {
    const l = data[d] || [];
    if (!l.length || isRestDay(d)) return;
    out.push({ giorno: d, titolo: getDayTitle(d), es: l.map(e => ({ nome: senzaEmoji(e.name), sets: e.sets, reps: e.reps, kg: e.weight, rest: e.rest, lato: perLato(e.name), tempo: isTimeBased(e.name), ss: e.superset })) });
  });
  return { titolo: prof.split || 'La mia scheda', giorni: out };
}
function testoScheda() {
  const s = righeScheda();
  const T = window.tr;
  let t = T(s.titolo) + '\n';
  s.giorni.forEach(g => {
    t += '\n' + T(g.giorno) + (g.titolo !== g.giorno ? ' — ' + T(g.titolo) : '') + '\n';
    g.es.forEach(e => { t += '• ' + T(e.nome) + ': ' + e.sets + '×' + e.reps + (e.tempo ? ' s' : '') + (e.lato ? ' ' + T('per lato') : '') + (e.kg ? ' • ' + numeroLingua(e.kg, 2) + ' kg' : '') + ' • ' + T('recupero') + ' ' + e.rest + ' s\n'; });
  });
  return t;
}
window.condividiScheda = function() {
  const t = testoScheda();
  if (navigator.share) { navigator.share({ title: window.tr('La mia scheda'), text: t }).catch(() => {}); return; }
  if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(() => showUndo('Scheda copiata: incollala dove vuoi'), () => scaricaFile('scheda.txt', t, 'text/plain')); return; }
  scaricaFile('scheda.txt', t, 'text/plain');
};
window.stampaScheda = function() {
  const s = righeScheda();
  const T = (x) => escapeHtml(window.tr(x));
  const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + T(s.titolo) + '</title><style>' +
    'body{font:13px -apple-system,Segoe UI,Roboto,sans-serif;color:#111;margin:18mm}h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:18px 0 6px;border-bottom:1px solid #ccc;padding-bottom:3px}' +
    'table{width:100%;border-collapse:collapse}td,th{padding:5px 4px;border-bottom:1px solid #eee;text-align:left}th{font-size:11px;color:#666;font-weight:600}td.n{text-align:right;white-space:nowrap}.box{display:inline-block;width:34px;height:14px;border:1px solid #bbb;margin-left:2px}' +
    '.sub{color:#666;font-size:11px}@page{margin:12mm}</style></head><body><h1>' + T(s.titolo) + '</h1><div class="sub">' + new Date().toLocaleDateString(LOCALE()) + '</div>' +
    s.giorni.map(g => '<h2>' + T(g.giorno) + (g.titolo !== g.giorno ? ' — ' + T(g.titolo) : '') + '</h2><table><tr><th>' + T('Esercizio') + '</th><th>' + T('Serie') + '</th><th>kg</th><th>' + T('Recupero') + '</th><th>' + T('Note') + '</th></tr>' +
      g.es.map(e => '<tr><td>' + (e.ss ? '↳ ' : '') + T(e.nome) + (e.lato ? ' <span class="sub">(' + T('per lato') + ')</span>' : '') + '</td><td class="n">' + e.sets + ' × ' + e.reps + (e.tempo ? ' s' : '') + '</td><td class="n">' + (e.kg ? numeroLingua(e.kg, 2) : '–') + '</td><td class="n">' + e.rest + ' s</td><td>' + '<span class="box"></span>'.repeat(Math.min(6, e.sets)) + '</td></tr>').join('') + '</table>').join('') +
    '</body></html>';
  let fr = document.getElementById('print-frame');
  if (fr) fr.remove();
  fr = document.createElement('iframe');
  fr.id = 'print-frame';
  fr.setAttribute('aria-hidden', 'true');
  fr.style.cssText = 'position:fixed;width:0;height:0;border:0;right:0;bottom:0;';
  document.body.appendChild(fr);
  const doc = fr.contentWindow.document;
  doc.open(); doc.write(html); doc.close();
  setTimeout(() => { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (e) { scaricaFile('scheda.html', html, 'text/html'); } }, 250);
};
