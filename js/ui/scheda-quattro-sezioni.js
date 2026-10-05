/* Scheda esercizio a quattro sezioni
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDA ESERCIZIO A QUATTRO SEZIONI
   Come si fa · Storico · Grafico · Record, come nelle app di
   riferimento. Storico, grafico e record leggono le sedute salvate:
   ogni numero viene dai tuoi allenamenti, non e inventato.
   Il massimale stimato (1RM) usa la formula di Epley, la piu diffusa,
   affidabile fino a circa 12 ripetizioni.
   ============================================================ */
let exInfoNome = null;
let exInfoTab = 'come';

/* Le sedute con questo esercizio, dalla piu vecchia alla piu recente */
function seduteEsercizio(nome) {
  /* tutte le sedute: storico, giorni fatti del calendario e sedute importate;
     il nome si confronta senza emoji, e le sedute del vecchio formato (solo
     il carico finale) entrano con il loro carico */
  const pulito = senzaEmoji(nome);
  const out = [], visti = {};
  tutteLeSedute().forEach(h0 => {
    const d = dataSessione(h0);
    if (!d) return;
    const k = ymd(d) + ' ' + d.getHours();
    if (visti[k]) return;
    const ex = (h0.sessione || []).find(e => senzaEmoji(e.name) === pulito);
    if (ex) {
      const fatte = (ex.sets || []).filter(s => s.done && !s.riscaldamento);
      if (!fatte.length) return;
      visti[k] = 1;
      out.push({
        data: d, sets: fatte,
        max: Math.max.apply(null, fatte.map(s => Number(s.weight) || 0)),
        rm: Math.max.apply(null, fatte.map(s => e1rm(s.weight, s.reps))),
        ripMax: Math.max.apply(null, fatte.map(s => Number(s.reps) || 0)),
        volume: fatte.reduce((a, s) => a + (Number(s.reps) || 0) * (Number(s.weight) || 0), 0)
      });
      return;
    }
    const e2 = (h0.exercises || []).find(e => senzaEmoji(e.name) === pulito);
    if (e2 && Number(e2.weight) > 0 && (e2.doneSets || 0) > 0) {
      visti[k] = 1;
      out.push({ data: d, sets: [], max: Number(e2.weight), rm: Number(e2.weight), ripMax: 0, volume: 0 });
    }
  });
  out.sort((a, b) => a.data - b.data);
  return out;
}

window.setExInfoTab = function(t) {
  exInfoTab = t;
  document.querySelectorAll('#ex-tabs button').forEach(b => {
    const on = b.dataset.t === t;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  ['come', 'storico', 'grafico', 'record'].forEach(k => {
    const el = document.getElementById('ex-pane-' + k);
    if (el) el.style.display = k === t ? 'block' : 'none';
  });
};

function exVuoto(testo) {
  return '<div class="dv-empty" style="padding:var(--sp-5) var(--sp-3);">' + testo + '</div>';
}

function paneStorico(sed) {
  if (!sed.length) return exVuoto('Ancora nessuna seduta con questo esercizio.<br>Dopo il primo allenamento lo trovi qui.');
  return sed.slice().reverse().map(s =>
    '<div class="exh-row"><div class="exh-date">' + s.data.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: '2-digit' }) + '</div>' +
    '<div class="exh-sets">' + (s.sets.length ? s.sets.map(x => '<span>' + x.reps + ' \u00D7 ' + x.weight + '</span>').join('') : '<span>' + s.max + ' kg</span>') + '</div></div>').join('');
}

function paneGrafico(sed) {
  if (!sed.length) return exVuoto('Ancora nessuna seduta con questo esercizio.<br>Dopo il primo allenamento il grafico parte da qui.');
  const ultimi = sed.slice(-12);
  /* a corpo libero (0 kg) si segue il numero di ripetizioni */
  const perRip = ultimi.every(s => !s.rm);
  const val = (s) => perRip ? s.ripMax : Math.round(s.rm * 10) / 10;
  const unita = perRip ? ' rip' : ' kg';
  const vals = ultimi.map(val);
  const min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  const W = 320, H = 150, pad = 18;
  const span = Math.max(1, max - min);
  const x = (i) => ultimi.length === 1 ? W / 2 : pad + i * (W - 2 * pad) / (ultimi.length - 1);
  const y = (v) => ultimi.length === 1 ? H / 2 : H - pad - (v - min) / span * (H - 2 * pad);
  const punti = ultimi.map((s, i) => x(i).toFixed(1) + ',' + y(val(s)).toFixed(1)).join(' ');
  const d0 = ultimi[0].data, d1 = ultimi[ultimi.length - 1].data;
  const diff = Math.round((vals[vals.length - 1] - vals[0]) * 10) / 10;
  const titolo = perRip ? 'Ripetizioni migliori' : '1RM stimato';
  return '<div class="exg-head"><span>' + titolo + '</span> \u2022 <span>' + 'ultime # sedute'.replace('#', ultimi.length) + '</span></div>' +
    '<svg class="exg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + titolo + '">' +
    '<line x1="' + pad + '" y1="' + (H - pad) + '" x2="' + (W - pad) + '" y2="' + (H - pad) + '" class="exg-axis"></line>' +
    (ultimi.length > 1 ? '<polyline points="' + punti + '" class="exg-line"></polyline>' : '') +
    ultimi.map((s, i) => '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(val(s)).toFixed(1) + '" r="3.5" class="exg-dot"></circle>').join('') +
    '<text x="' + pad + '" y="12" class="exg-lbl">' + String(max).replace('.', ',') + unita + '</text>' +
    '<text x="' + pad + '" y="' + (H - 3) + '" class="exg-lbl">' + d0.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' }) + '</text>' +
    (ultimi.length > 1 ? '<text x="' + (W - pad) + '" y="' + (H - 3) + '" text-anchor="end" class="exg-lbl">' + d1.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' }) + '</text>' : '') +
    '</svg>' +
    (ultimi.length === 1 ? '<div class="exg-diff">Primo punto: dalla prossima seduta vedi la linea.</div>'
      : '<div class="exg-diff ' + (diff > 0 ? 'su' : (diff < 0 ? 'giu' : '')) + '">' + (diff > 0 ? '+' : '') + String(diff).replace('.', ',') + unita + ' <span>dalla prima seduta del grafico</span></div>');
}

function paneRecord(sed) {
  if (!sed.length) return exVuoto('I record compaiono dopo la prima seduta.');
  const best = (f) => sed.reduce((a, s) => f(s) > f(a) ? s : a, sed[0]);
  const bRm = best(s => s.rm), bMax = best(s => s.max), bVol = best(s => s.volume);
  let bSet = null;
  sed.forEach(s => s.sets.forEach(x => {
    const r = e1rm(x.weight, x.reps);
    if (!bSet || r > bSet.r) bSet = { r: r, x: x, data: s.data };
  }));
  const quando = (d) => d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: '2-digit' });
  const tile = (et, v, d) => '<div class="exr-tile"><span class="exr-et">' + et + '</span><span class="exr-v">' + v + '</span><span class="exr-d">' + quando(d) + '</span></div>';
  return '<div class="exr-grid">' +
    tile('1RM stimato', bRm.rm + ' kg', bRm.data) +
    tile('Carico massimo', bMax.max + ' kg', bMax.data) +
    tile('Volume in una seduta', Math.round(bVol.volume).toLocaleString(LOCALE()) + ' kg', bVol.data) +
    (bSet ? tile('Serie migliore', bSet.x.reps + ' \u00D7 ' + bSet.x.weight + ' kg', bSet.data) : '') +
    '</div><div class="set-about">Il massimale stimato e calcolato con la formula di Epley: una stima, non un test da fare.</div>';
}
