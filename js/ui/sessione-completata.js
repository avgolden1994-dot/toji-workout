/* Sessione gia completata
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SESSIONE GIA COMPLETATA, IN SOLA LETTURA
   Un giorno fatto e storico: riaprendolo si vedono i valori esatti di
   quando l hai finito, serie per serie. Non si modifica per sbaglio;
   se vuoi allenarti di nuovo c e un pulsante apposta.
   ============================================================ */
/* Mostra una sessione completata. Accetta sia la voce del calendario sia
   quella dello storico. Le sessioni nuove hanno ogni serie (ripetizioni e
   carico); quelle registrate prima avevano solo carico finale e serie
   fatte, e si mostra onestamente quello che c e. */
function mostraSessione(s) {
  document.getElementById('dv2-title').innerText = s.title || 'Allenamento';
  document.getElementById('dv2-sub').innerText = (s.quando ? s.quando + ' \u2022 ' : '') + (s.summary || '');
  const fmt = (n) => Math.round(n).toLocaleString(LOCALE());

  const conDettaglio = !!(s.sessione && s.sessione.length);
  /* volume totale: somma di ripetizioni per carico sulle serie fatte */
  const vol = conDettaglio ? s.sessione.reduce((t, e) => t + e.sets.filter(x => x.done).reduce((a, x) => a + (Number(x.reps) || 0) * (Number(x.weight) || 0), 0), 0) : 0;
  let html = '<div class="mc-done-box"><div class="mc-done-t">\u2713 Completato</div>' +
    '<div class="dv-meta">' + escapeHtml(s.doneAt || '') + '</div>' +
    (vol > 0 ? '<div class="dv2-tot">Volume totale <b>' + fmt(vol) + ' kg</b></div>' : '') + '</div>';
  html += '<div id="ia-box">' + htmlCommentoIA(s.id) + '</div>';

  if (conDettaglio) {

    html += s.sessione.map((e, i) => {
      const fatte = e.sets.filter(x => x.done);
      const volEs = fatte.reduce((a, x) => a + (Number(x.reps) || 0) * (Number(x.weight) || 0), 0);
      const max = fatte.reduce((m, x) => Math.max(m, Number(x.weight) || 0), 0);
      return '<div class="card dv2-ex">' +
        '<div class="dv2-head"><span class="dv-num">' + (i + 1) + '</span>' +
          '<span class="dv-main"><span class="dv-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) + '</span>' +
          '<span class="dv-meta">' + fatte.length + ' di ' + e.sets.length + ' serie' +
            (max ? ' \u2022 carico max ' + max + ' kg' : '') + (volEs ? ' \u2022 volume ' + fmt(volEs) + ' kg' : '') +
          '</span></span></div>' +
        '<div class="dv2-cols"><span>Serie</span><span>Ripetizioni</span><span>Carico</span><span></span></div>' +
        e.sets.map((x, si) => '<div class="dv2-set ' + (x.done ? 'ok' : 'no') + '">' +
          '<span class="dv2-n">' + (si + 1) + '</span>' +
          '<span class="dv2-c"><b>' + x.reps + '</b></span>' +
          '<span class="dv2-c"><b>' + x.weight + '</b> kg</span>' +
          '<span class="dv2-chk">' + (x.wasBerserk ? '\u{1F525} ' : '') + (x.done ? '\u2713' : '\u2013') + '</span></div>').join('') +
      '</div>';
    }).join('');
  } else {
    const es = s.esercizi || (s.items || []).map(x => ({ name: x.name, totalSets: x.sets }));
    html += '<div class="card">' + es.map((e, i) =>
      '<div class="dv-row"><span class="dv-num">' + (i + 1) + '</span><span class="dv-main">' +
      '<span class="dv-name">' + escapeHtml(e.name.replace(EMOJI_TESTA, '')) + (e.wasBerserk ? ' \u{1F525}' : '') + '</span>' +
      '<span class="dv-meta">' + (e.doneSets !== undefined ? e.doneSets + ' di ' : '') + e.totalSets + ' serie' +
        (e.weight !== undefined ? ' \u2022 carico <b>' + e.weight + ' kg</b>' : '') + '</span></span></div>').join('') +
      '<div class="aw-warn">Per questo allenamento erano stati salvati solo il carico finale e le serie fatte. ' +
      'Da ora in poi, per ogni allenamento che completi, vedrai qui ogni serie con ripetizioni e carico.</div></div>';
  }

  if (s.day && (loadData()[s.day] || []).length) {
    html += '<button class="btn-archive" onclick="closeDoneView(); openWorkoutDay(\'' + s.day + '\', true);">\u21BB Allenati di nuovo con questa scheda</button>';
  }
  document.getElementById('dv2-body').innerHTML = html;
  document.getElementById('done-view-sheet').classList.remove('hidden');
}

/* dal calendario o dalla schermata Allenamento */
window.openDoneView = function(k) {
  const v = loadCal()[k];
  if (!v || !v.done) return;
  /* le sessioni vecchie non hanno il dettaglio nel calendario: si recupera
     dallo storico quello che c e (carico finale, serie fatte, cedimento) */
  const h0 = loadHistory().find(x => (v.historyId && x.id === v.historyId) || x.date === v.doneAt);
  mostraSessione({
    title: v.title, day: v.day || (h0 && h0.day), doneAt: v.doneAt, summary: v.summary,
    quando: daYmd(k).toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric', month: 'long' }),
    sessione: v.sessione || (h0 && h0.sessione) || null,
    esercizi: h0 ? h0.exercises : null, items: v.items,
    id: v.historyId || (h0 && h0.id) || null
  });
};

/* dalla sezione Allenamenti completati */
window.openHistoryDetail = function(i) {
  const x = loadHistory()[i];
  if (!x) return;
  const fatte = x.exercises.reduce((a, e) => a + e.doneSets, 0);
  const tot = x.exercises.reduce((a, e) => a + e.totalSets, 0);
  mostraSessione({
    title: getDayTitle(x.day), day: x.day, doneAt: x.date,
    summary: fatte + ' di ' + tot + ' serie' + (x.berserk ? ' \u2022 con cedimento' : ''),
    sessione: x.sessione || null, esercizi: x.exercises, id: x.id
  });
};

window.closeDoneView = function() {
  document.getElementById('done-view-sheet').classList.add('hidden');
};
