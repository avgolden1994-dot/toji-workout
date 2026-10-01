/* Scambiare i giorni trascinandoli
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCAMBIARE I GIORNI TRASCINANDOLI
   Esempio: oggi non ti alleni. Trascini il lunedi sopra il martedi di
   riposo e i due giorni si scambiano. Un tocco semplice continua ad
   aprire il giorno; solo il trascinamento scambia.
   Vale in due posti con lo stesso gesto:
   - nel CALENDARIO del mese: cambia solo quelle due date;
   - nella settimana del PIANO: cambia la settimana tipo, cioe tutte
     le settimane future che ne derivano.
   Un giorno gia FATTO non si sposta: e storico.
   ============================================================ */
let swapAppenaTrascinato = false;   /* evita che il rilascio apra anche il giorno */

function attachSwapDrag(el, opts) {
  let premuto = false, trascina = false, x0 = 0, y0 = 0, sotto = null;
  const ghost = document.getElementById('mc-ghost');
  const origine = el.getAttribute(opts.attr);

  const bersaglioSotto = (x, y) => {
    if (ghost) ghost.style.display = 'none';
    const hit = document.elementFromPoint ? document.elementFromPoint(x, y) : null;
    if (ghost && trascina) ghost.style.display = 'block';
    const t = hit && hit.closest ? hit.closest(opts.selector) : null;
    return t ? t.getAttribute(opts.attr) : null;
  };
  const valido = (k) => !opts.consenti || opts.consenti(origine, k);
  const evidenzia = (k) => {
    document.querySelectorAll(opts.selector).forEach(c => {
      const id = c.getAttribute(opts.attr);
      c.classList.toggle('swap-from', trascina && id === origine);
      c.classList.toggle('swap-to', !!k && id === k && k !== origine && valido(k));
      c.classList.toggle('swap-no', !!k && id === k && k !== origine && !valido(k));
      /* le celle fuori dalla settimana si spengono: si vede subito dove si puo */
      c.classList.toggle('swap-fuori', trascina && !!opts.consenti && !valido(id) && id !== origine);
    });
  };

  el.addEventListener('pointerdown', (e) => {
    premuto = true; trascina = false; sotto = null;
    x0 = e.clientX; y0 = e.clientY;
  });
  el.addEventListener('pointermove', (e) => {
    if (!premuto) return;
    if (!trascina) {
      if (Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0) < 10) return;
      trascina = true;
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      if (ghost) { ghost.innerText = '\u21C4 ' + opts.label(origine); ghost.style.display = 'block'; }
    }
    if (e.preventDefault) e.preventDefault();
    if (ghost) { ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; }
    sotto = bersaglioSotto(e.clientX, e.clientY);
    evidenzia(sotto);
  });
  const fine = () => {
    if (!premuto) return;
    premuto = false;
    if (ghost) ghost.style.display = 'none';
    if (!trascina) return;                   /* tocco: ci pensa il click */
    trascina = false;
    swapAppenaTrascinato = true;
    setTimeout(() => { swapAppenaTrascinato = false; }, 60);
    evidenzia(null);
    if (sotto && sotto !== origine) opts.onSwap(origine, sotto);
  };
  el.addEventListener('pointerup', fine);
  el.addEventListener('pointercancel', () => {
    premuto = false; trascina = false;
    if (ghost) ghost.style.display = 'none';
    evidenzia(null);
  });
}

/* ---- calendario del mese: si scambiano due date ---- */
window.mcSwapDays = function(a, b) {
  /* la settimana e un blocco: i giorni si scambiano solo al suo interno.
     Per spostare una settimana intera c e la maniglia \u2261 */
  if (ymd(lunediDi(daYmd(a))) !== ymd(lunediDi(daYmd(b)))) {
    alert('Lo scambio si fa dentro la stessa settimana, cosi la settimana resta un blocco. Per spostare o copiare una settimana intera usa la maniglia \u2261.');
    return false;
  }
  const cal = loadCal();
  if ((cal[a] && cal[a].done) || (cal[b] && cal[b].done)) {
    alert('Un giorno gia fatto non si sposta: fa parte del tuo storico.');
    return false;
  }
  const backup = JSON.stringify(cal);
  const va = cal[a], vb = cal[b];
  if (vb) cal[a] = vb; else delete cal[a];
  if (va) cal[b] = va; else delete cal[b];
  saveCal(cal);
  aggiornaDopoScambio();
  const f = (k) => daYmd(k).toLocaleDateString(LOCALE(), { weekday: 'short', day: 'numeric' });
  showUndo(trP('Scambiati %s e %s', f(a), f(b)), () => { localStorage.setItem(calKey(), backup); aggiornaDopoScambio(); });
  return true;
};

window.mcCellClick = function(k, lk) {
  if (swapAppenaTrascinato) return;
  if (mcCopySrc) mcToggleTarget(lk); else mcOpenDay(k);
};

/* Il calendario segue la settimana tipo: da questa settimana in poi i due
   giorni si scambiano anche nelle date (mai quelli gia fatti). */
function scambiaNelCalendario(a, b) {
  const ia = DAYS.indexOf(a), ib = DAYS.indexOf(b);
  if (ia < 0 || ib < 0 || ia === ib) return null;
  const cal = loadCal();
  const prima = JSON.stringify(cal);
  const da = ymd(lunediDi(new Date()));
  const lunedi = {};
  Object.keys(cal).forEach(k => { const l = ymd(lunediDi(daYmd(k))); if (l >= da) lunedi[l] = true; });
  let n = 0;
  Object.keys(lunedi).forEach(l => {
    const ka = ymd(piuGiorni(daYmd(l), ia)), kb = ymd(piuGiorni(daYmd(l), ib));
    const va = cal[ka], vb = cal[kb];
    if ((va && va.done) || (vb && vb.done) || (!va && !vb)) return;
    if (vb) cal[ka] = vb; else delete cal[ka];
    if (va) cal[kb] = va; else delete cal[kb];
    n++;
  });
  if (!n) return null;
  saveCal(cal);
  return prima;
}
/* dopo uno scambio: tutte le schermate si aggiornano subito */
function aggiornaDopoScambio() {
  try { renderPlanDayPicker(); renderWeekOverview(); renderAllenamento(); } catch (e) {}
  try { renderOggi(); } catch (e) {}
  try { if (typeof renderMonthCal === 'function') renderMonthCal(); } catch (e) {}
  try { renderPianoCoach(); } catch (e) {}
}

/* ---- settimana del Piano: si scambiano due giorni della settimana tipo ---- */
window.planSwapDays = function(a, b) {
  const data = loadData(), titles = loadTitles(), riposi = loadRestDays();
  const backup = { data: JSON.stringify(data), titles: JSON.stringify(titles), riposi: riposi.slice() };

  const tmp = data[a]; data[a] = data[b] || []; data[b] = tmp || [];
  const ta = titles[a], tb = titles[b];
  if (tb) titles[a] = tb; else delete titles[a];
  if (ta) titles[b] = ta; else delete titles[b];
  const ra = riposi.indexOf(a) !== -1, rb = riposi.indexOf(b) !== -1;
  const nuovi = riposi.filter(d => d !== a && d !== b);
  if (rb) nuovi.push(a);
  if (ra) nuovi.push(b);

  saveData(data); saveTitles(titles); saveRestDays(nuovi);
  const calPrima = scambiaNelCalendario(a, b);
  aggiornaDopoScambio();
  showUndo(trP('Scambiati %s e %s', tr(a), tr(b)), () => {
    saveData(JSON.parse(backup.data)); saveTitles(JSON.parse(backup.titles)); saveRestDays(backup.riposi);
    if (calPrima !== null) localStorage.setItem(calKey(), calPrima);
    aggiornaDopoScambio();
  });
};

window.planDayClick = function(d) {
  if (swapAppenaTrascinato) return;
  openPlanDayScreen(d);
};
