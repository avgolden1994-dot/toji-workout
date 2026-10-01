/* Statistiche: progresso dei carichi nel tempo
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   STATISTICHE: progresso dei carichi nel tempo
   Confronta il PRIMO carico usato con l ULTIMO, esercizio per
   esercizio, nel periodo scelto. Serve almeno un paio di settimane:
   sotto, i numeri raccontano il caso e non l andamento.
   La colonna 80% e un riferimento pratico: circa l intensita a cui si
   lavora lasciando due ripetizioni in riserva.
   ============================================================ */
const APP_VERSIONE = '2026.10.01-1';
const DISCHI_KEY = 'tz_dischi';   /* si aggiorna a ogni consegna: dice quale versione sta girando */
const NOME_KEY = 'tz_nome';
/* Forza il controllo della versione nuova: aggiorna il service worker e
   ricarica la pagina saltando le copie salvate */
window.cercaAggiornamento = async function() {
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) await reg.update();
    }
    if (window.caches) {
      const chiavi = await caches.keys();
      await Promise.all(chiavi.map(k => caches.delete(k)));
    }
  } catch (e) {}
  location.reload();
};

window.getNome = function() { try { return localStorage.getItem(NOME_KEY) || ''; } catch (e) { return ''; } };
window.salvaNome = function(v) { try { localStorage.setItem(NOME_KEY, String(v).slice(0, 30)); } catch (e) {} };

let statsPeriodo = '8';   /* settimane, oppure 'programma' | 'tutto' */

function dataSessione(h0) {
  if (h0.id) return new Date(h0.id);
  const m = String(h0.date || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null;
}

function pesoSessione(ex) {
  if (ex.sets) {
    const fatte = ex.sets.filter(s => s.done);
    if (fatte.length) return Math.max.apply(null, fatte.map(s => Number(s.weight) || 0));
    return null;
  }
  return Number(ex.weight) || null;
}

/* Dove comincia il periodo scelto (null = dal primo allenamento). Le
   settimane sono quelle del calendario, da lunedi: "8 settimane" sono questa
   e le sette prima. Cosi tabella e grafico contano gli stessi allenamenti. */
window.inizioPeriodo = function(periodo) {
  if (periodo === 'tutto') return null;
  if (periodo === 'programma') { const p = getProgramma(); return p ? daYmd(p.inizio) : null; }
  return piuGiorni(lunediDi(new Date()), -7 * (Number(periodo) - 1));
};

window.calcolaStatistiche = function(periodo) {
  const tutte = tutteLeSedute().slice().filter(h0 => dataSessione(h0));
  tutte.sort((a, b) => dataSessione(a) - dataSessione(b));
  const da = inizioPeriodo(periodo);
  const sess = da ? tutte.filter(h0 => dataSessione(h0) >= da) : tutte;
  if (!sess.length) return { vuoto: true };

  const primo = dataSessione(sess[0]), ultimo = dataSessione(sess[sess.length - 1]);
  const giorniSpan = Math.round((ultimo - primo) / 86400000);

  /* esercizio -> primo e ultimo carico, con il giorno in cui compare */
  const mappa = {};
  sess.forEach(h0 => {
    const lista = h0.sessione || h0.exercises || [];
    lista.forEach(ex => {
      const w = pesoSessione(ex);
      if (w === null) return;
      const k = ex.name;
      if (!mappa[k]) mappa[k] = { name: k, giorno: h0.day, primo: w, ultimo: w, volte: 0 };
      mappa[k].ultimo = w;
      mappa[k].giorno = h0.day;
      mappa[k].volte++;
    });
  });

  const esercizi = Object.keys(mappa).map(k => {
    const e = mappa[k];
    e.incremento = e.primo > 0 ? Math.round(((e.ultimo - e.primo) / e.primo) * 1000) / 10 : null;
    e.rpe80 = Math.round(e.ultimo * 0.8 * 10) / 10;
    return e;
  }).filter(e => e.volte >= 2);

  /* volume totale per sessione, per vedere se il lavoro complessivo cresce */
  const volume = sess.map(h0 => {
    if (!h0.sessione) return null;
    return h0.sessione.reduce((t, e) => t + e.sets.filter(s => s.done)
      .reduce((a, s) => a + (Number(s.reps) || 0) * (Number(s.weight) || 0), 0), 0);
  }).filter(v => v !== null);

  /* costanza: allenamenti fatti rispetto a quelli programmati nel periodo */
  const cal = loadCal();
  let programmati = 0;
  Object.keys(cal).forEach(k => {
    const d = daYmd(k);
    if (da && d < da) return;
    if (d > ultimo) return;
    if (!cal[k].rest) programmati++;
  });

  return {
    vuoto: false, sessioni: sess.length, primo: primo, ultimo: ultimo, giorniSpan: giorniSpan,
    breve: giorniSpan < 14, esercizi: esercizi, volume: volume, programmati: programmati
  };
};

/* Tutte le sedute che il telefono conosce: lo storico PIU i giorni fatti
   del calendario che nello storico non ci sono (per esempio dopo uno
   "Svuota storico"). Cosi le statistiche usano ogni dato gia salvato. */
window.tutteLeSedute = function() {
  const hist = loadHistory();
  const ids = {}, date = {};
  hist.forEach(h0 => { if (h0.id) ids[h0.id] = 1; if (h0.date) date[h0.date] = 1; });
  const extra = [];
  let cal = {};
  try { cal = loadCal(); } catch (e) {}
  Object.keys(cal).forEach(k => {
    const v = cal[k];
    if (!v || !v.done || !v.sessione || !v.sessione.length) return;
    if ((v.historyId && ids[v.historyId]) || (v.doneAt && date[v.doneAt])) return;
    const d = daYmd(k); d.setHours(12);
    extra.push({
      id: d.getTime(), date: v.doneAt || '', day: v.day, sessione: v.sessione, dalCalendario: true,
      exercises: v.sessione.map(e => ({ name: e.name, doneSets: e.sets.filter(x => x.done).length, totalSets: e.sets.length }))
    });
  });
  return hist.concat(extra);
};

function volumeSeduta(h0) {
  if (!h0.sessione) return 0;
  return h0.sessione.reduce((t, e) => t + e.sets.filter(s => s.done)
    .reduce((a, s) => a + (Number(s.reps) || 0) * (Number(s.weight) || 0), 0), 0);
}

/* Blocchi da 4 settimane a partire dal lunedi del primo allenamento:
   e il ritmo con cui un preparatore rivede la scheda. */
window.blocchiQuattroSettimane = function() {
  const dd = tutteLeSedute().map(dataSessione).filter(Boolean).sort((a, b) => a - b);
  if (!dd.length) return [];
  const origine = lunediDi(dd[0]);
  const oggi = new Date();
  const n = Math.floor(giorniTra(origine, lunediDi(oggi)) / 28) + 1;
  const out = [];
  for (let i = 0; i < Math.max(1, n); i++) {
    const da = piuGiorni(origine, i * 28);
    const a = piuGiorni(origine, i * 28 + 27);
    out.push({ i: i, da: da, a: a, inCorso: oggi >= da && oggi <= piuGiorni(a, 1) });
  }
  return out;
};

/* Report di un blocco: carico massimo di ogni esercizio in questo blocco
   confrontato con il blocco precedente. Nel primo blocco non c e un
   precedente, quindi si confronta la prima seduta con l ultima. */
window.calcolaBlocco = function(i) {
  const bl = blocchiQuattroSettimane();
  const b = bl[i];
  if (!b) return { vuoto: true, sessioni: 0, mediaInc: null };
  const fine = piuGiorni(b.a, 1);
  const tutte = tutteLeSedute().filter(h0 => dataSessione(h0)).sort((x, y) => dataSessione(x) - dataSessione(y));
  const dentro = (h0, da, a) => { const d = dataSessione(h0); return d >= da && d < a; };
  const qui = tutte.filter(h0 => dentro(h0, b.da, fine));
  const prec = i > 0 ? tutte.filter(h0 => dentro(h0, bl[i - 1].da, b.da)) : [];

  const massimi = (lista) => {
    const m = {};
    lista.forEach(h0 => (h0.sessione || h0.exercises || []).forEach(ex => {
      const w = pesoSessione(ex);
      if (w === null) return;
      if (!m[ex.name]) m[ex.name] = { max: w, primo: w, ultimo: w, giorno: h0.day, volte: 0 };
      m[ex.name].max = Math.max(m[ex.name].max, w);
      m[ex.name].ultimo = w; m[ex.name].giorno = h0.day; m[ex.name].volte++;
    }));
    return m;
  };
  const mq = massimi(qui), mp = massimi(prec);
  const esercizi = Object.keys(mq).map(k => {
    const q = mq[k];
    let prima, ora;
    if (i > 0) { if (!mp[k]) return null; prima = mp[k].max; ora = q.max; }
    else { if (q.volte < 2) return null; prima = q.primo; ora = q.ultimo; }
    return { name: k, giorno: q.giorno, primo: prima, ultimo: ora,
      incremento: prima > 0 ? Math.round(((ora - prima) / prima) * 1000) / 10 : null,
      rpe80: Math.round(ora * 0.8 * 10) / 10 };
  }).filter(Boolean);
  const nuovi = i > 0 ? Object.keys(mq).filter(k => !mp[k]).length : 0;

  const conInc = esercizi.filter(e => e.incremento !== null);
  const mediaInc = conInc.length ? Math.round(conInc.reduce((t, e) => t + e.incremento, 0) / conInc.length * 10) / 10 : null;

  let programmati = 0;
  try {
    const cal = loadCal();
    Object.keys(cal).forEach(k => { const d = daYmd(k); if (d >= b.da && d < fine && cal[k] && !cal[k].rest) programmati++; });
  } catch (e) {}

  const volQ = qui.reduce((t, h0) => t + volumeSeduta(h0), 0);
  const volP = prec.reduce((t, h0) => t + volumeSeduta(h0), 0);
  return { vuoto: !qui.length, blocco: b, sessioni: qui.length, sessioniPrec: prec.length,
    volume: volQ, volumePrec: volP, esercizi: esercizi, nuovi: nuovi, mediaInc: mediaInc, programmati: programmati };
};

window.setStatsPeriodo = function(v) { statsPeriodo = v; renderStats(); };
/* senza periodo apre il report del blocco in corso */
window.openStats = function(periodo) {
  if (periodo) statsPeriodo = String(periodo);
  else { const bl = blocchiQuattroSettimane(); statsPeriodo = bl.length ? 'b' + (bl.length - 1) : '8'; }
  document.getElementById('stats-sheet').classList.remove('hidden'); renderStats();
};
window.closeStats = function() { document.getElementById('stats-sheet').classList.add('hidden'); };

/* Scheda del report di un blocco da 4 settimane, sul modello del
   controllo periodico di un personal trainer: quanto ti sei allenato,
   quanto lavoro hai fatto e come sono cambiati i carichi. */
function reportBloccoHtml(i, nome) {
  const r = calcolaBlocco(i);
  const d = (x) => x.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  const fmt = (n) => Math.round(n).toLocaleString(LOCALE());
  if (r.vuoto) return '<div class="dv-empty">Nessun allenamento in queste 4 settimane.</div>';
  const b = r.blocco;
  const delta = (a, p) => {
    if (!p || b.inCorso) return '';   /* un blocco a meta non si confronta con uno intero */
    const v = Math.round((a - p) / p * 100);
    return '<em class="' + (v > 0 ? 'su' : (v < 0 ? 'giu' : '')) + '">' + (v > 0 ? '+' : '') + v + '%</em>';
  };
  let html = '<div class="st-head">' +
    '<div class="st-title">Report settimane ' + (i * 4 + 1) + '–' + (i * 4 + 4) + (nome ? ' — ' + escapeHtml(nome) : '') + '</div>' +
    '<div class="st-sub">' + d(b.da) + ' – ' + d(b.a) + (b.inCorso ? ' • in corso' : '') +
    (i > 0 ? ' • confronto con le 4 settimane prima' : ' • primo blocco: prima seduta contro ultima') + '</div></div>';

  html += '<div class="card st-graf"><div class="section-title">Allenamenti a settimana</div>' + graficoFrequenzaHtml('b' + i, { senzaNumeri: true }) + '</div>';

  html += '<div class="pg-kpis st-kpis">' +
    '<div class="pg-kpi"><b>' + r.sessioni + '</b><span>allenamenti' + (r.programmati ? ' su ' + r.programmati : '') + '</span>' + (i > 0 ? delta(r.sessioni, r.sessioniPrec) : '') + '</div>' +
    '<div class="pg-kpi"><b>' + (r.mediaInc === null ? '–' : (r.mediaInc > 0 ? '+' : '') + String(r.mediaInc).replace('.', ',') + '%') + '</b><span>carichi medi</span></div>' +
  '</div>';

  if (b.inCorso) html += '<div class="onb-note">Blocco ancora in corso: il report si completa a fine settimana ' + (i * 4 + 4) + '.</div>';

  if (!r.esercizi.length) {
    return html + '<div class="dv-empty">' + (i > 0
      ? 'Nessun esercizio in comune con le 4 settimane precedenti: il confronto parte dal prossimo blocco.'
      : 'Servono almeno due sedute con lo stesso esercizio per confrontare i carichi.') + '</div>';
  }

  const perGiorno = {};
  r.esercizi.forEach(e => { (perGiorno[e.giorno] = perGiorno[e.giorno] || []).push(e); });
  const maxInc = Math.max.apply(null, r.esercizi.map(e => Math.abs(e.incremento || 0)).concat([1]));
  html += '<div class="st-table"><div class="st-row st-h"><span>Esercizio</span><span>' + (i > 0 ? 'Prima' : 'Inizio') + '</span><span>' + (i > 0 ? 'Ora' : 'Fine') + '</span><span>Var.</span><span>80%</span></div>';
  Object.keys(perGiorno).forEach(g => {
    html += '<div class="st-day">' + escapeHtml(getDayTitle(g)) + '</div>';
    perGiorno[g].sort((a, b2) => (b2.incremento || 0) - (a.incremento || 0)).forEach(e => {
      const inc = e.incremento;
      const cls = inc === null ? '' : (inc > 0 ? 'su' : (inc < 0 ? 'giu' : ''));
      html += '<div class="st-row"><span class="st-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) +
        '<span class="st-bar"><i class="' + cls + '" style="width:' + Math.min(100, Math.abs(inc || 0) / maxInc * 100) + '%"></i></span></span>' +
        '<span>' + e.primo + '</span><span><b>' + e.ultimo + '</b></span>' +
        '<span class="st-inc ' + cls + '">' + (inc === null ? '–' : (inc > 0 ? '+' : '') + inc + '%') + '</span>' +
        '<span>' + e.rpe80 + '</span></div>';
    });
  });
  html += '</div>';

  /* il giudizio del coach sul blocco */
  const saliti = r.esercizi.filter(e => e.incremento > 0);
  const fermi = r.esercizi.filter(e => e.incremento === 0);
  const scesi = r.esercizi.filter(e => e.incremento < 0);
  const note = [];
  note.push(saliti.length + ' esercizi su ' + r.esercizi.length + ' sono migliorati.');
  if (saliti.length) { const m = saliti.slice().sort((a, b2) => b2.incremento - a.incremento)[0]; note.push('Miglior progresso: ' + m.name.replace(EMOJI_TESTA, '') + ' +' + m.incremento + '%.'); }
  if (fermi.length) note.push(fermi.length + (fermi.length === 1 ? ' esercizio è fermo' : ' esercizi sono fermi') + ': nel prossimo blocco punta a una ripetizione in più per serie prima di aumentare il carico.');
  if (scesi.length) note.push(scesi.length + (scesi.length === 1 ? ' esercizio è calato' : ' esercizi sono calati') + ': controlla recupero, sonno ed esecuzione.');
  if (r.nuovi) note.push(r.nuovi + (r.nuovi === 1 ? ' esercizio nuovo' : ' esercizi nuovi') + ' in questo blocco: entreranno nel confronto dal prossimo.');
  if (r.programmati && r.sessioni < r.programmati) note.push('Costanza: ' + r.sessioni + ' su ' + r.programmati + ' allenamenti programmati. La costanza conta più del carico.');
  html += '<div class="card"><div class="section-title">Giudizio del coach</div>' + note.map(x => '<div class="ag-tip">' + escapeHtml(x) + '</div>').join('') + '</div>';
  return html;
}

/* Titolo del report per periodo */
function periodoTitolo(v) {
  if (v === 'programma') return 'Programma attuale';
  if (v === 'tutto') return 'Tutto lo storico';
  return 'Ultime ' + v + ' settimane';
}

window.renderStats = function() {
  const s = statsPeriodo.charAt(0) === 'b' ? { vuoto: false } : calcolaStatistiche(statsPeriodo);
  const nome = getNome();
  const box = document.getElementById('stats-body');

  let html = scelteStatsPeriodo(statsPeriodo, 'setStatsPeriodo', true);
  if (statsPeriodo.charAt(0) === 'b') { box.innerHTML = html + reportBloccoHtml(Number(statsPeriodo.slice(1)), nome); mostraPeriodoAttivo(box); return; }

  if (s.vuoto) {
    box.innerHTML = html + '<div class="dv-empty">Nessun allenamento in questo periodo.</div>';
    mostraPeriodoAttivo(box);
    return;
  }

  const d = (x) => x.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  html += '<div class="st-head">' +
    '<div class="st-title">' + periodoTitolo(statsPeriodo) + (nome ? ' \u2014 ' + escapeHtml(nome) : '') + '</div>' +
    '<div class="st-sub">' + d(s.primo) + ' \u2013 ' + d(s.ultimo) + '</div></div>';

  if (s.breve) {
    html += '<div class="onb-note">Il periodo copre ' + s.giorniSpan + ' giorni: sotto le due settimane i numeri raccontano il caso piu che l andamento. Scegli un periodo piu lungo per leggerli davvero.</div>';
  }

  /* prima di tutto il grafico: com e stata la frequenza, settimana per settimana */
  html += '<div class="card st-graf"><div class="section-title">Allenamenti a settimana</div>' + graficoFrequenzaHtml(statsPeriodo) + '</div>';

  if (!s.esercizi.length) {
    box.innerHTML = html + '<div class="dv-empty">Servono almeno due sedute con lo stesso esercizio per confrontare i carichi.</div>';
    mostraPeriodoAttivo(box);
    return;
  }
  html += '<div class="section-title st-sez">Progresso dei carichi</div><div class="st-sub st-sez-sub">Dal primo all ultimo carico</div>';

  /* raggruppati per giorno, come una scheda */
  const perGiorno = {};
  s.esercizi.forEach(e => { (perGiorno[e.giorno] = perGiorno[e.giorno] || []).push(e); });
  const maxInc = Math.max.apply(null, s.esercizi.map(e => Math.abs(e.incremento || 0)).concat([1]));

  html += '<div class="st-table"><div class="st-row st-h"><span>Esercizio</span><span>Primo</span><span>Ultimo</span><span>Var.</span><span>80%</span></div>';
  Object.keys(perGiorno).forEach(g => {
    html += '<div class="st-day">' + escapeHtml(getDayTitle(g)) + '</div>';
    perGiorno[g].sort((a, b) => (b.incremento || 0) - (a.incremento || 0)).forEach(e => {
      const inc = e.incremento;
      const cls = inc === null ? '' : (inc > 0 ? 'su' : (inc < 0 ? 'giu' : ''));
      html += '<div class="st-row">' +
        '<span class="st-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) +
          '<span class="st-bar"><i class="' + cls + '" style="width:' + Math.min(100, Math.abs(inc || 0) / maxInc * 100) + '%"></i></span></span>' +
        '<span>' + e.primo + '</span><span><b>' + e.ultimo + '</b></span>' +
        '<span class="st-inc ' + cls + '">' + (inc === null ? '\u2013' : (inc > 0 ? '+' : '') + inc + '%') + '</span>' +
        '<span>' + e.rpe80 + '</span></div>';
    });
  });
  html += '</div>';

  /* sintesi */
  const saliti = s.esercizi.filter(e => e.incremento > 0);
  const scesi = s.esercizi.filter(e => e.incremento < 0);
  const migliore = saliti.slice().sort((a, b) => b.incremento - a.incremento)[0];
  const media = saliti.length ? Math.round(saliti.reduce((a, e) => a + e.incremento, 0) / saliti.length * 10) / 10 : 0;
  const sintesi = [];
  sintesi.push(saliti.length + ' esercizi su ' + s.esercizi.length + ' sono migliorati' + (media ? ', in media +' + media + '%' : '') + '.');
  if (migliore) sintesi.push('Il salto piu grande: ' + migliore.name.replace(EMOJI_TESTA, '') + ' +' + migliore.incremento + '%.');
  if (scesi.length) sintesi.push(scesi.length + (scesi.length === 1 ? ' esercizio e calato' : ' esercizi sono calati') + ': spesso vuol dire che hai cambiato esecuzione, ripetizioni o attrezzo. Vale la pena guardarli.');
  if (s.volume.length >= 2) {
    const v0 = s.volume[0], v1 = s.volume[s.volume.length - 1];
    if (v0 > 0) sintesi.push('Volume di una seduta: da ' + Math.round(v0).toLocaleString(LOCALE()) + ' a ' + Math.round(v1).toLocaleString(LOCALE()) + ' kg sollevati.');
  }
  if (s.programmati) sintesi.push('Costanza: ' + s.sessioni + ' allenamenti fatti su ' + s.programmati + ' programmati nel periodo.');

  html += '<div class="card"><div class="section-title">Risultati in sintesi</div>' +
    sintesi.map(x => '<div class="ag-tip">' + escapeHtml(x) + '</div>').join('') + '</div>';

  html += '<div class="card"><div class="section-title">Come leggo l 80%</div>' +
    '<div class="set-about" style="margin-top:0;">Prendo l ultimo carico che hai usato e ne calcolo l 80%. E un riferimento pratico per le serie in cui vuoi restare a circa due ripetizioni dal cedimento: utile nelle giornate storte o nelle settimane di scarico. Formula: ultimo carico \u00D7 0,80.</div></div>';

  box.innerHTML = html;
  mostraPeriodoAttivo(box);
};
