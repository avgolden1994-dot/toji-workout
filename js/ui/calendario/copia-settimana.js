/* Copiare una settimana come blocco
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   COPIARE UNA SETTIMANA COME BLOCCO UNICO
   La settimana si seleziona intera, da lunedi a domenica, con i suoi
   allenamenti E i suoi riposi. Poi la si incolla su altre settimane,
   anche in altri mesi: cosi si costruisce un programma piu lungo.
   Due modi per farlo, che portano allo stesso risultato:
   - TOCCARE: si tocca la maniglia per selezionare il blocco, poi si
     toccano le settimane dove incollarlo (si puo cambiare mese), poi
     Incolla. Oppure "Ripeti" per le prossime 1, 2, 4 o 8 settimane.
   - TRASCINARE: si prende la maniglia e si porta il blocco sopra
     un altra settimana, in su o in giu; passando su piu settimane si
     riempiono tutte quelle attraversate.
   ============================================================ */
let mcCopySrc = null;        /* lunedi della settimana selezionata */
let mcCopyTargets = [];      /* lunedi delle settimane dove incollare */

function etichettaSettimana(lk) {
  const l = daYmd(lk), d = piuGiorni(l, 6);
  const f = (x) => x.getDate() + ' ' + x.toLocaleDateString(LOCALE(), { month: 'short' });
  return f(l) + ' \u2013 ' + f(d);
}

function settimanaPiena(lk, cal) {
  for (let i = 0; i < 7; i++) if (cal[ymd(piuGiorni(daYmd(lk), i))]) return true;
  return false;
}

window.mcSelectWeek = function(lk) {
  if (mcCopySrc === lk) { mcCancelCopy(); return; }
  if (!settimanaPiena(lk, loadCal())) {
    alert('Questa settimana e vuota: seleziona una settimana gia programmata.');
    return;
  }
  mcCopySrc = lk;
  mcCopyTargets = [];
  renderMonthCal();
};

window.mcToggleTarget = function(lk) {
  if (!mcCopySrc || lk === mcCopySrc) return;
  const i = mcCopyTargets.indexOf(lk);
  if (i === -1) mcCopyTargets.push(lk); else mcCopyTargets.splice(i, 1);
  mcCopyTargets.sort();
  renderMonthCal();
};

/* Ripete il blocco sulle N settimane che seguono: il modo piu rapido
   per trasformare una settimana in un programma di un mese o due. */
window.mcRepeat = function(n) {
  if (!mcCopySrc) return;
  const l = daYmd(mcCopySrc);
  mcCopyTargets = [];
  for (let i = 1; i <= n; i++) mcCopyTargets.push(ymd(piuGiorni(l, 7 * i)));
  renderMonthCal();
};

window.mcCancelCopy = function() {
  mcCopySrc = null;
  mcCopyTargets = [];
  renderMonthCal();
};

window.mcPaste = function() {
  if (!mcCopySrc || !mcCopyTargets.length) return;
  const origine = mcCopySrc, dest = mcCopyTargets.slice();
  mcCopySrc = null; mcCopyTargets = [];
  mcCopyWeeks(origine, dest);
};

function renderCopyBar() {
  const bar = document.getElementById('mc-copybar');
  if (!bar) return;
  if (!mcCopySrc) { bar.style.display = 'none'; return; }
  bar.style.display = 'block';
  const n = mcCopyTargets.length;
  const ultima = n ? mcCopyTargets[n - 1] : null;
  document.getElementById('mc-cb-text').innerHTML =
    '<b>\u{1F4CB} Blocco selezionato:</b> ' + etichettaSettimana(mcCopySrc) + '<br>' +
    (n ? n + (n === 1 ? ' settimana scelta' : ' settimane scelte') + ', fino al ' +
         piuGiorni(daYmd(ultima), 6).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long' })
       : 'Tocca le settimane dove incollarlo, anche in altri mesi.');
  const inc = document.getElementById('mc-cb-paste');
  inc.disabled = n === 0;
  inc.innerText = n ? 'Incolla su ' + n + (n === 1 ? ' settimana' : ' settimane') : 'Incolla';
}

/* ---- Trascinamento del blocco ---- */
function attachWeekDrag(grip) {
  let premuto = false, trascina = false, x0 = 0, y0 = 0, anteprima = [];
  const origine = grip.dataset.grip;
  const ghost = document.getElementById('mc-ghost');

  const settimanaSotto = (x, y) => {
    if (ghost) ghost.style.display = 'none';          /* il fantasma non deve coprire */
    const el = document.elementFromPoint ? document.elementFromPoint(x, y) : null;
    if (ghost && trascina) ghost.style.display = 'block';
    const riga = el && el.closest ? el.closest('.mc-week') : null;
    return riga ? riga.dataset.lunedi : null;
  };
  const evidenzia = () => {
    document.querySelectorAll('#mc-grid .mc-week').forEach(r => {
      r.classList.toggle('drop', anteprima.indexOf(r.dataset.lunedi) !== -1);
    });
  };

  grip.addEventListener('pointerdown', (e) => {
    premuto = true; trascina = false; anteprima = [];
    x0 = e.clientX; y0 = e.clientY;
    try { grip.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  });

  grip.addEventListener('pointermove', (e) => {
    if (!premuto) return;
    if (!trascina) {
      if (Math.abs(e.clientY - y0) + Math.abs(e.clientX - x0) < 8) return;   /* era un tocco */
      trascina = true;
      mcCopySrc = origine;
      document.querySelectorAll('#mc-grid .mc-week').forEach(r => r.classList.toggle('sorgente', r.dataset.lunedi === origine));
      if (ghost) { ghost.innerText = '\u{1F4CB} ' + etichettaSettimana(origine); ghost.style.display = 'block'; }
    }
    if (ghost) { ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; }
    const sotto = settimanaSotto(e.clientX, e.clientY);
    if (!sotto) { anteprima = []; evidenzia(); return; }
    /* tutte le settimane attraversate, in su o in giu, esclusa l origine */
    const tutte = Array.from(document.querySelectorAll('#mc-grid .mc-week')).map(r => r.dataset.lunedi);
    const a = tutte.indexOf(origine), b = tutte.indexOf(sotto);
    anteprima = (b > a ? tutte.slice(a + 1, b + 1) : tutte.slice(b, a)).filter(k => k !== origine);
    evidenzia();
  });

  const fine = () => {
    if (!premuto) return;
    premuto = false;
    if (ghost) ghost.style.display = 'none';
    if (!trascina) { openWeekMenu(origine); return; }   /* tocco semplice: apre il menu della settimana */
    const lista = anteprima.slice();
    anteprima = []; trascina = false;
    mcCopySrc = null; mcCopyTargets = [];
    if (lista.length) mcCopyWeeks(origine, lista);
    else renderMonthCal();
  };
  grip.addEventListener('pointerup', fine);
  grip.addEventListener('pointercancel', () => {
    premuto = false; trascina = false; anteprima = [];
    if (ghost) ghost.style.display = 'none';
    renderMonthCal();
  });
}

window.mcCopyWeeks = function(origine, destinazioni) {
  const cal = loadCal();
  const backup = JSON.stringify(cal);
  const da = daYmd(origine);
  destinazioni.forEach(k => { copiaSettimana(da, daYmd(k), cal); });
  saveCal(cal);
  renderMonthCal();
  showUndo('Settimana ricopiata su ' + destinazioni.length + (destinazioni.length === 1 ? ' settimana' : ' settimane'), () => {
    localStorage.setItem(calKey(), backup); renderMonthCal();
  }, 8000);
};

window.mcPlaceTemplate = function() {
  const tot = DAYS.reduce((s, d) => s + (loadData()[d] || []).length, 0);
  if (!tot) { alert('La settimana tipo e vuota: costruiscila prima nel Piano.'); return; }
  const cal = loadCal();
  const backup = JSON.stringify(cal);
  const l = lunediDi(new Date());
  mettiSettimana(l, cal);
  saveCal(cal);
  mcAnno = l.getFullYear(); mcMese = new Date().getMonth();
  renderMonthCal();
  showUndo('Settimana tipo messa sul calendario', () => { localStorage.setItem(calKey(), backup); renderMonthCal(); }, 8000);
};

window.mcFillMonth = function() {
  const tot = DAYS.reduce((s, d) => s + (loadData()[d] || []).length, 0);
  if (!tot) { alert('La settimana tipo e vuota: costruiscila prima nel Piano.'); return; }
  const cal = loadCal();
  const backup = JSON.stringify(cal);
  const oggiL = lunediDi(new Date());
  let settimane = 0;
  settimaneDelMese().forEach(l => {
    if (l < oggiL) return;          /* le settimane passate restano com erano */
    mettiSettimana(l, cal); settimane++;
  });
  saveCal(cal);
  renderMonthCal();
  showUndo('Mese riempito: ' + settimane + (settimane === 1 ? ' settimana' : ' settimane'), () => { localStorage.setItem(calKey(), backup); renderMonthCal(); }, 8000);
};
