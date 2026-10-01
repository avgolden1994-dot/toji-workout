/* Schermata Oggi
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   OGGI: la schermata iniziale
   Tutto quello che serve aprendo l app, senza cercarlo in tre schede:
   l allenamento di oggi con il suo pulsante, a che punto e il
   programma, e quante serie hai fatto questa settimana per spinta,
   tirata e gambe rispetto a quelle previste.
   ============================================================ */
const CATEGORIE = {
  spinta: { nome: 'Spinta', gruppi: ['petto', 'spalle'], colore: 'var(--primary)' },
  tirata: { nome: 'Tirata', gruppi: ['schiena', 'braccia'], colore: '#6ea8ff' },
  gambe:  { nome: 'Gambe', gruppi: ['gambe', 'glutei'], colore: 'var(--success)' }
};

function categoriaDi(nome) {
  const m = findExercise(nome);
  if (!m) return null;
  return Object.keys(CATEGORIE).find(k => CATEGORIE[k].gruppi.indexOf(m.group) !== -1) || null;
}

/* Serie previste (settimana tipo) e fatte (storico dal lunedi a oggi) */
window.obiettiviSettimana = function() {
  const out = {};
  Object.keys(CATEGORIE).forEach(k => { out[k] = { previste: 0, fatte: 0 }; });
  const data = loadData();
  DAYS.forEach(d => {
    if (isRestDay(d)) return;
    (data[d] || []).forEach(e => { const c = categoriaDi(e.name); if (c) out[c].previste += Number(e.setsBase || e.sets) || 0; });
  });
  const lun = lunediDi(new Date());
  loadHistory().forEach(h0 => {
    const quando = dataSessione(h0);
    if (!quando || quando < lun) return;
    (h0.sessione || []).forEach(e => {
      const c = categoriaDi(e.name);
      if (c) out[c].fatte += e.sets.filter(s => s.done && !s.riscaldamento).length;
    });
    if (!h0.sessione) (h0.exercises || []).forEach(e => { const c = categoriaDi(e.name); if (c) out[c].fatte += e.doneSets || 0; });
  });
  return out;
};

/* Settimane di fila con almeno un allenamento (la costanza, non i giorni:
   nel lavoro coi pesi i giorni di riposo fanno parte del programma) */
window.settimaneDiFila = function() {
  const settimane = new Set(loadHistory().map(h0 => { const d = dataSessione(h0); return d ? ymd(lunediDi(d)) : null; }).filter(Boolean));
  let n = 0;
  let l = lunediDi(new Date());
  if (!settimane.has(ymd(l))) l = piuGiorni(l, -7);   /* questa settimana puo non essere ancora iniziata */
  while (settimane.has(ymd(l))) { n++; l = piuGiorni(l, -7); }
  return n;
};

window.renderOggi = function() {
  const box = document.getElementById('oggi-body');
  if (!box) return;
  try { aggiornaEsigenza(); } catch (e) {}
  const oggi = new Date();
  const idx = (oggi.getDay() + 6) % 7;
  const giorno = DAYS[idx];
  const data = loadData();
  const lista = data[giorno] || [];
  const voce = loadCal()[ymd(oggi)];
  const nome = getNome();
  const fila = settimaneDiFila();

  let html = '<div class="og-head"><div class="og-left">' +
    '<div class="og-ciao">Ciao' + (nome ? ', ' + escapeHtml(nome) : '') + '!</div>' +
    '<div class="og-data">' + oggi.toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric', month: 'long' }) + '</div>' +
    '<h1 class="og-title">Oggi</h1></div>' +
    (fila ? '<div class="og-fila">' + fila + (fila === 1 ? ' settimana' : ' settimane') + ' di fila</div>' : '') + '</div>';

  /* striscia della settimana: a colpo d occhio cosa e fatto, cosa manca */
  const cal0 = loadCal();
  const lun0 = lunediDi(oggi);
  let fattiSett = 0, previstiSett = 0;
  html += '<div class="og-strip">' + DAYS.map((d, i) => {
    const dd = piuGiorni(lun0, i), k = ymd(dd), v = cal0[k];
    const fatto = !!(v && v.done);
    const riposo = !fatto && (isRestDay(d) || (v && v.rest) || !(data[d] || []).length);
    if (fatto) fattiSett++;
    if (!riposo || fatto) previstiSett++;
    const st = fatto ? 'done' : (riposo ? 'rest' : (dd < new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate()) ? 'miss' : 'plan'));
    return '<div class="og-day ' + st + (i === idx ? ' today' : '') + '">' +
      '<span class="og-dl" data-no-tr>' + (lingua() === 'it' ? d.slice(0, 3) : dd.toLocaleDateString(LOCALE(), { weekday: 'short' }).replace('.', '').slice(0, 3)) + '</span><span class="og-dn">' + dd.getDate() + '</span>' +
      '<i aria-hidden="true">' + (fatto ? '\u2713' : '') + '</i></div>';
  }).join('') + '</div>';

  /* Oggi sta in uno schermo: un solo avviso, il piu urgente */
  html += ([htmlControlloDolore(), htmlFineCiclo(), htmlSedutaSaltata(), htmlDomandaMomento(), htmlAderenza()].find(Boolean) || '') +
    htmlOrario(lista.length && !(voce && (voce.done || voce.rest)) ? { title: getDayTitle(giorno) } : null);
  /* avvisi del coach sul programma, sul periodo e sul primo mese: nel Piano */
  /* l allenamento di oggi */
  html += '<div class="card og-today"><div class="og-label">Allenamento di oggi</div>';
  if (voce && voce.done) {
    html += '<div class="og-wname">' + escapeHtml(voce.title || getDayTitle(giorno)) + '</div>' +
      '<div class="og-ok">\u2713 Fatto \u2022 ' + escapeHtml(voce.summary || '') + '</div>' + htmlProssimaSeduta() +
      '<button class="btn-archive" onclick="openDoneView(\'' + ymd(oggi) + '\')">Vedi com’è andata</button>';
  } else if (isRestDay(giorno) || (voce && voce.rest)) {
    html += '<div class="og-wname">Riposo</div><div class="og-muted">Il recupero fa parte del programma.</div>' + htmlProssimaSeduta() +
      '<button class="btn-archive" onclick="switchTab(\'allenamento\')">Allenati lo stesso</button>';
  } else if (!lista.length) {
    html += '<div class="og-wname">Niente in programma</div><div class="og-muted">Per oggi non c’è una scheda.</div>' +
      '<button class="btn-start-workout" onclick="switchTab(\'allenamento\')">Scegli un allenamento</button>';
  } else {
    const serie = lista.reduce((a, e) => a + e.sets, 0);
    const minuti = Math.round(lista.reduce((a, e) => a + e.sets * (30 + e.rest), 0) / 60);
    let alzati = 0;
    if (coachAttivo()) lista.forEach(e => {
      try { if (caricoProssimo(e.name, e.weight, e.repsBase !== undefined ? e.repsBase : e.reps, e.setsBase !== undefined ? e.setsBase : e.sets).tipo === 'su') alzati++; } catch (err) {}
    });
    const anteprima = lista.map(e =>
      '<div class="og-ex"><span class="og-exfig">' + (findExercise(e.name) ? muscleFigure(findExercise(e.name).group) : '') + '</span>' +
      '<span class="og-exname">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) + '</span>' +
      '<span class="og-exsr">' + e.sets + ' \u00D7 ' + e.reps + (isTimeBased(e.name) ? ' s' : '') + (perLato(e.name) ? ' <span>per lato</span>' : '') + (e.weight ? ' \u2022 ' + e.weight + ' kg' : '') + '</span></div>').join('') +
      '';
    html += '<div class="og-wname">' + escapeHtml(getDayTitle(giorno)) + '</div>' +
      '<div class="og-muted">' + lista.length + ' esercizi \u2022 ' + serie + ' serie \u2022 circa ' + minuti + ' min</div>' +
      '<details class="og-drop"><summary>Vedi gli esercizi <span class="og-muted">(' + lista.length + ')</span></summary>' +
        '<div class="og-exlist">' + anteprima + '</div></details>' +
      (alzati ? '<div class="og-up">\u2191 ' + alzati + (alzati === 1 ? ' carico in più' : ' carichi in più') + '</div>' : '') +
      '<button class="btn-start-workout" onclick="iniziaOggi()">\u25B6 Inizia allenamento</button>';
  }
  html += '<button class="og-link" onclick="switchTab(\'allenamento\')">Scegli un altro giorno \u203A</button></div>';

  /* obiettivi della settimana */
  const ob = obiettiviSettimana();
  const prev = Object.keys(ob).reduce((a, k) => a + ob[k].previste, 0);
  const fatte = Object.keys(ob).reduce((a, k) => a + Math.min(ob[k].fatte, ob[k].previste || ob[k].fatte), 0);
  if (prev > 0) {
    const perc = Math.min(100, Math.round(fatte / prev * 100));
    const circ = 2 * Math.PI * 46;
    html += '<div class="card og-week"><div class="og-label">Obiettivi della settimana</div><div class="og-week-row">' +
      '<svg width="110" height="110" viewBox="0 0 110 110" role="img" aria-label="' + perc + ' per cento delle serie della settimana">' +
      '<circle cx="55" cy="55" r="46" fill="none" stroke="var(--surface-3)" stroke-width="10"></circle>' +
      '<circle cx="55" cy="55" r="46" fill="none" stroke="var(--primary)" stroke-width="10" stroke-linecap="round" stroke-dasharray="' +
        (circ * perc / 100).toFixed(1) + ' ' + circ.toFixed(1) + '" transform="rotate(-90 55 55)"></circle>' +
      '<text x="55" y="63" text-anchor="middle" class="og-perc">' + perc + '%</text></svg><div class="og-bars">' +
      Object.keys(CATEGORIE).filter(k => ob[k].previste > 0).map(k => {
        const c = CATEGORIE[k], o = ob[k];
        return '<div class="og-bar"><div class="og-bar-top"><span>' + c.nome + '</span><span class="og-muted">' + o.fatte + ' / ' + o.previste + ' serie</span></div>' +
          '<div class="og-track"><i style="width:' + Math.min(100, Math.round(o.fatte / o.previste * 100)) + '%;background:' + c.colore + '"></i></div></div>';
      }).join('') + '</div></div></div>';
  }
  /* due riquadri finali: ultimo allenamento e settimana */
  const ult = loadHistory()[0];
  const ud = ult ? dataSessione(ult) : null;
  html += '<div class="og-tiles">' +
    '<button class="og-tile" onclick="switchTab(\'storico\')"><span class="og-label">Ultimo allenamento</span>' +
      '<b>' + (ult ? escapeHtml(ult.titolo || getDayTitle(ult.day)) : '\u2013') + '</b>' +
      '<span class="og-muted">' + (ud ? ud.toLocaleDateString(LOCALE(), { weekday: 'short', day: 'numeric', month: 'short' }) : 'Nessuno ancora') + '</span></button>' +
    '<button class="og-tile" onclick="switchTab(\'calendario\')"><span class="og-label">Questa settimana</span>' +
      '<b>' + fattiSett + ' <small>di ' + previstiSett + '</small></b>' +
      '<span class="og-muted">allenamenti fatti</span></button>' +
  '</div>';
  box.innerHTML = html;
};

window.iniziaOggi = function() {
  const giorno = DAYS[(new Date().getDay() + 6) % 7];
  switchTab('allenamento');
  openWorkoutDay(giorno);
};

window.switchTab = function(tab) {
  currentTab = tab;
  if (tab !== 'allenamento' && dockStatoAttuale === 'sessione' && !dropInterval) dockStato('nascosto');
  hideSnackbar();
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
  const inNav = tab === 'allenamento' ? 'oggi' : tab;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === inNav));
  if (tab === 'oggi') renderOggi();
  if (tab === 'storico') { renderStorico(); renderWeeks(); }
  if (tab === 'impostazioni') renderSettings();
  if (tab === 'calendario') renderMonthCal();
  if (tab === 'piano') backToPlanDays(); /* prima il giorno, poi la sua schermata */
  if (tab === 'allenamento') backToDayPicker(); /* prima scegli il giorno, poi la sessione */
};
