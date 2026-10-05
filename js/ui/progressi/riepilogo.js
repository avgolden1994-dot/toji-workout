/* Prossima seduta, fatica muscolare e anno
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 10. LA PROSSIMA SERIE, LA PROSSIMA SEDUTA ============ */
function prossimaSerie() {
  const list = (loadData()[currentDay] || []);
  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    if (e.skipped) continue;
    const si = e.completedSets.findIndex(s => !s.done);
    if (si !== -1) return { e: e, si: si, s: e.completedSets[si] };
  }
  return null;
}
function aggiornaProssima() {
  const el = document.getElementById('recovery-next');
  if (!el) return;
  const p = sedutaAperta() ? prossimaSerie() : null;
  if (!p) { el.innerHTML = sedutaAperta() ? '<b>Tutte le serie fatte</b>: puoi terminare' : ''; return; }
  const t = isTimeBased(p.e.name);
  el.innerHTML = '<span>Prossima</span> <b>' + escapeHtml(senzaEmoji(p.e.name)) + '</b> <span data-no-tr>• ' + (p.si + 1) + '/' + p.e.completedSets.length + ' • ' +
    p.s.reps + (t ? ' s' : '') + (p.s.weight ? ' × ' + String(p.s.weight).replace('.', ',') + ' kg' : '') + '</span>';
}
function htmlProssimaSeduta() {
  const oggi = new Date();
  const data = loadData(), cal = loadCal();
  for (let k = 1; k <= 7; k++) {
    const d = piuGiorni(new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate()), k);
    const g = DAYS[(d.getDay() + 6) % 7];
    const v = cal[ymd(d)];
    if ((v && v.rest) || isRestDay(g) || !(data[g] || []).length) continue;
    const l = data[g];
    return '<div class="og-next">' + ico('calendario') + '<span><span>Prossima seduta</span>: <b data-no-tr>' +
      d.toLocaleDateString(LOCALE(), { weekday: 'long' }) + '</b> • ' + escapeHtml(getDayTitle(g)) + ' • ' + l.length + ' esercizi</span></div>';
  }
  return '';
}

/* ============ 8. FATICA MUSCOLARE E ANNO ============ */
function faticaMuscoli() {
  const ora = Date.now();
  const f = {};
  GRUPPI_PRINCIPALI.concat(['core']).forEach(g => { f[g] = 0; });
  tutteLeSedute().forEach(h0 => {
    const d = dataSessione(h0);
    if (!d || !h0.sessione) return;
    const ore = (ora - d.getTime()) / 3600000;
    if (ore < 0 || ore > 72) return;
    const peso = 1 - ore / 72;   /* si recupera in circa 48-72 ore */
    h0.sessione.forEach(e => {
      const m = findExercise(e.name);
      if (!m || f[m.group] === undefined) return;
      const n = e.sets.filter(s => s.done).length + (e.extra || []).length * 0.5;
      f[m.group] += n * peso;
      (MUSCLE_GROUPS[m.group].synergists || []).forEach(s => { if (f[s] !== undefined) f[s] += n * peso * 0.3; });
    });
  });
  return f;
}
function renderFatica() {
  const box = document.getElementById('pg-fatica');
  if (!box) return;
  const f = faticaMuscoli();
  const livello = (v) => v < 1 ? ['ok', 'Pronto'] : (v < 5 ? ['mid', 'In recupero'] : ['hi', 'Affaticato']);
  const pronti = Object.keys(f).filter(g => f[g] < 1 && g !== 'core').map(g => MUSCLE_GROUPS[g].label);
  box.innerHTML = '<div class="section-title">Recupero muscolare</div><div class="set-about" style="margin-top:0;">Ultime 72 ore: serie fatte, pesate per quanto sono recenti.</div>' +
    '<div class="fat-grid">' + Object.keys(f).map(g => {
      const l = livello(f[g]);
      return '<div class="fat-cell ' + l[0] + '"><span class="fat-fig">' + muscleFigure(g) + '</span><b>' + MUSCLE_GROUPS[g].label + '</b><small>' + l[1] + '</small></div>';
    }).join('') + '</div>' +
    (pronti.length && pronti.length < 6 ? '<div class="sr-note"><span>Pronti per essere allenati</span>: ' + pronti.map(x => '<span>' + x + '</span>').join(', ') + '.</div>' : '');
}
function renderAnno() {
  const box = document.getElementById('pg-anno');
  if (!box) return;
  /* verde = allenamento fatto, rosso = in calendario ma saltato, azzurro = riposo */
  const fatti = {};
  tutteLeSedute().forEach(h0 => { const d = dataSessione(h0); if (d) fatti[ymd(d)] = true; });
  const cal = loadCal();
  const oggi = new Date();
  const kOggi = ymd(oggi);
  const inizio = piuGiorni(lunediDi(oggi), -52 * 7);
  const passo = 6.2, lato = 5;
  let celle = '', nFatti = 0, nSaltati = 0, settimane = {};
  for (let w = 0; w < 53; w++) {
    for (let g = 0; g < 7; g++) {
      const d = piuGiorni(inizio, w * 7 + g);
      if (d > oggi) continue;
      const k = ymd(d), v = cal[k];
      let st = 'y0';
      if (fatti[k] || (v && v.done)) { st = 'yf'; nFatti++; settimane[w] = 1; }
      else if (v && v.rest) st = 'yr';
      else if (v && k < kOggi && (v.saltato || v.title || (v.items && v.items.length))) { st = 'ys'; nSaltati++; }
      celle += '<rect x="' + (w * passo).toFixed(1) + '" y="' + (g * passo).toFixed(1) + '" width="' + lato + '" height="' + lato + '" rx="1.2" class="' + st + '"></rect>';
    }
  }
  box.innerHTML = '<div class="section-title">Il tuo anno</div>' +
    '<svg class="hm-svg" viewBox="-0.5 -0.5 ' + (53 * passo + 1).toFixed(0) + ' ' + (7 * passo + 1).toFixed(0) + '" role="img" aria-label="Allenamenti degli ultimi 12 mesi">' + celle + '</svg>' +
    '<div class="yr-leg"><span><i class="yf"></i><span>Fatti</span> <b>' + nFatti + '</b></span><span><i class="ys"></i><span>Saltati</span> <b>' + nSaltati + '</b></span><span><i class="yr"></i><span>Riposo</span></span></div>' +
    '<div class="sr-note"><b>' + Object.keys(settimane).length + '/53</b> <span>settimane attive</span></div>';
}
