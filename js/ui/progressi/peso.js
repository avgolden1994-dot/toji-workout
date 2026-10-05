/* Peso corporeo
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 9. PESO CORPOREO CON OBIETTIVO ============ */
const pesoKey = () => 'coach_plus_peso_' + currentMode;
const pesoObKey = () => 'coach_plus_peso_obiettivo_' + currentMode;
function pesiTutti() {
  const m = {};
  getBiaStorico().forEach(b => { if (b.valori && b.valori.peso) m[b.data] = Number(b.valori.peso); });
  const l = leggiJSON(pesoKey(), '[]');
  (Array.isArray(l) ? l : []).forEach(x => { if (x && x.data && x.kg) m[x.data] = Number(x.kg); });
  return Object.keys(m).sort().map(k => ({ data: k, kg: m[k] }));
}
function tendenzaPeso(pts) {
  /* retta dei minimi quadrati sulle ultime 4 settimane: toglie il rumore di acqua e sale */
  const da = ymd(piuGiorni(new Date(), -28));
  const p = pts.filter(x => x.data >= da);
  if (p.length < 2) return null;
  const xs = p.map(x => giorniTra(daYmd(p[0].data), daYmd(x.data))), ys = p.map(x => x.kg);
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  const den = xs.reduce((a, x) => a + (x - mx) * (x - mx), 0);
  if (!den || xs[n - 1] < 6) return null;
  const k = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / den;
  return { settimana: k * 7, perc: k * 7 / my * 100 };
}
/* faseCorpo(): la fase del corpo (deficit, massa, ricomposizione, mantenimento) e una sola per tutta l app, in js/coach/regia/brief.js (OBI-02) */
function consiglioPeso(t) {
  if (!t) return 'Pesati 2-3 volte a settimana, al mattino: dopo 2 settimane il coach legge la tendenza.';
  const f = faseCorpo();
  const p = t.perc;
  if (f === 'deficit') {
    if (p < -1) return 'Scendi più dell 1% a settimana: rischi di perdere muscolo. Aggiungi qualche caloria, soprattutto proteine.';
    if (p > -0.25) return 'Il peso è quasi fermo: togli 200-300 kcal al giorno o aggiungi passi.';
    return 'Ritmo giusto per dimagrire tenendo il muscolo (0,5-1% a settimana).';
  }
  if (f === 'massa') {
    if (p > 0.5) return 'Sali in fretta: oltre lo 0,5% a settimana si accumula soprattutto grasso.';
    if (p < 0.1) return 'Il peso non sale: aggiungi 200-300 kcal al giorno.';
    return 'Ritmo giusto per la massa (0,25-0,5% a settimana).';
  }
  if (Math.abs(p) > 0.5) return 'Il peso si sta muovendo: se vuoi mantenerlo, controlla le calorie.';
  return 'Peso stabile.';
}
function graficoPeso(pts, obiettivo) {
  const da = ymd(piuGiorni(new Date(), -120));
  const p = pts.filter(x => x.data >= da);
  if (!p.length) return '';
  const W = 300, H = 110, padX = 10, padT = 16, padB = 18;
  const ys = p.map(x => x.kg).concat(obiettivo ? [obiettivo] : []);
  let min = Math.min.apply(null, ys), max = Math.max.apply(null, ys);
  if (max - min < 2) { min -= 1; max += 1; }
  const t0 = daYmd(p[0].data).getTime(), t1 = daYmd(p[p.length - 1].data).getTime();
  const X = (d) => p.length === 1 ? W / 2 : padX + (daYmd(d).getTime() - t0) / Math.max(1, t1 - t0) * (W - 2 * padX);
  const Y = (v) => padT + (max - v) / (max - min) * (H - padT - padB);
  const f1 = (v) => String(Math.round(v * 10) / 10).replace('.', ',');
  const giorno = (d) => daYmd(d).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  return '<svg class="peso-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Andamento del peso">' +
    '<line x1="0" x2="' + W + '" y1="' + (H - padB) + '" y2="' + (H - padB) + '" class="exg-axis"></line>' +
    (obiettivo ? '<line x1="0" x2="' + W + '" y1="' + Y(obiettivo).toFixed(1) + '" y2="' + Y(obiettivo).toFixed(1) + '" class="peso-ob"></line>' +
      '<text x="' + (W - 2) + '" y="' + (Y(obiettivo) - 4).toFixed(1) + '" text-anchor="end" class="exg-lbl">' + f1(obiettivo) + '</text>' : '') +
    (p.length > 1 ? '<polyline points="' + p.map(x => X(x.data).toFixed(1) + ',' + Y(x.kg).toFixed(1)).join(' ') + '" class="peso-line"></polyline>' : '') +
    p.map((x, i) => '<circle cx="' + X(x.data).toFixed(1) + '" cy="' + Y(x.kg).toFixed(1) + '" r="' + (i === p.length - 1 ? 4 : 2.4) + '" class="peso-pt"></circle>').join('') +
    '<text x="' + X(p[p.length - 1].data).toFixed(1) + '" y="' + (Y(p[p.length - 1].kg) - 8).toFixed(1) + '" text-anchor="' + (p.length === 1 ? 'middle' : 'end') + '" class="exg-lbl">' + f1(p[p.length - 1].kg) + '</text>' +
    '<text x="' + (p.length === 1 ? W / 2 : padX) + '" y="' + (H - 4) + '" text-anchor="' + (p.length === 1 ? 'middle' : 'start') + '" class="exg-lbl" data-no-tr>' + giorno(p[0].data) + '</text>' +
    (p.length > 1 ? '<text x="' + (W - padX) + '" y="' + (H - 4) + '" text-anchor="end" class="exg-lbl" data-no-tr>' + giorno(p[p.length - 1].data) + '</text>' : '') +
    '</svg>' + (p.length === 1 ? '<div class="sr-note">Primo punto: dal prossimo peso vedi la linea.</div>' : '');
}
function renderPesoCard() {
  const box = document.getElementById('pg-peso');
  if (!box) return;
  const pts = pesiTutti();
  const ult = pts[pts.length - 1];
  const ob = Number(localStorage.getItem(pesoObKey())) || null;
  const t = tendenzaPeso(pts);
  let eta = '';
  if (ob && ult && t && Math.abs(t.settimana) > 0.05 && (ob - ult.kg) / t.settimana > 0) {
    const sett = (ob - ult.kg) / t.settimana;
    if (sett < 104) eta = '<span>Di questo passo arrivi all obiettivo verso</span> <span data-no-tr>' + piuGiorni(new Date(), Math.round(sett * 7)).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long' }) + '</span>.';
  } else if (ob && ult && Math.abs(ob - ult.kg) < 0.3) eta = 'Obiettivo raggiunto.';
  const f1 = (v) => String(Math.round(v * 10) / 10).replace('.', ',');
  box.innerHTML = '<div class="section-title">Peso corporeo</div>' +
    '<div id="pg-peso-grafico"><div class="peso-top"><div><b class="peso-big">' + (ult ? f1(ult.kg) : '–') + '</b> kg' +
      (t ? '<small> • <span data-no-tr>' + (t.settimana > 0 ? '+' : '') + f1(t.settimana) + '</span> <span>kg/sett</span></small>' : '') + '</div>' +
      (ob ? '<div class="og-muted">Obiettivo <b>' + f1(ob) + '</b> kg</div>' : '') + '</div>' +
    graficoPeso(pts, ob) + '</div>' + htmlPesate(pts, ob) +
    '<div class="peso-in"><input type="number" inputmode="decimal" step="0.1" id="peso-in" placeholder="Peso di oggi (kg)" aria-label="Peso di oggi in kg">' +
      '<button class="set-tool-btn" onclick="registraPeso()">Registra</button></div>' +
    '<label class="peso-in peso-ob-row"><span>Obiettivo</span><input type="number" inputmode="decimal" step="0.5" id="peso-ob" placeholder="kg" value="' + (ob || '') + '" aria-label="Peso obiettivo in kg" onchange="salvaObiettivoPeso(this.value)"><span>kg</span></label>' +
    '<div class="coach-badge-set"><b>Coach ·</b> <span>' + consiglioPeso(t) + '</span>' + (eta ? ' <span>' + eta + '</span>' : '') + '</div>';
}
window.registraPeso = function() {
  const el = document.getElementById('peso-in');
  const v = parseFloat(String(el ? el.value : '').replace(',', '.'));
  if (!(v > 25 && v < 400)) { showUndo('Scrivi il peso in kg'); return; }
  const kg = Math.round(v * 10) / 10;
  const oggi = ymd(new Date());
  const prima = localStorage.getItem(pesoKey());
  const l = (leggiJSON(pesoKey(), '[]') || []).filter(x => x && x.data !== oggi);
  l.push({ data: oggi, kg: kg });
  localStorage.setItem(pesoKey(), JSON.stringify(l));
  const p = getProfile();
  if (p) { p.weight = kg; localStorage.setItem(PROFILE_KEY(), JSON.stringify(p)); }
  renderPesoCard();
  showUndo('Peso registrato', () => { if (prima === null) localStorage.removeItem(pesoKey()); else localStorage.setItem(pesoKey(), prima); renderPesoCard(); });
};
window.salvaObiettivoPeso = function(v) {
  const n = parseFloat(String(v).replace(',', '.'));
  if (n > 25 && n < 400) localStorage.setItem(pesoObKey(), String(Math.round(n * 10) / 10)); else localStorage.removeItem(pesoObKey());
  renderPesoCard();
};
