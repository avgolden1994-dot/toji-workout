/* Gruppi muscolari nel calendario
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   GRUPPI MUSCOLARI NEL CALENDARIO
   Ogni giorno mostra un puntino colorato per gruppo allenato;
   sotto, la legenda dei gruppi del mese e il riepilogo della
   settimana: quante volte ogni gruppo, e chi manca.
   ============================================================ */
const GRUPPO_COLORE = { petto: '#fb7185', schiena: '#60a5fa', spalle: '#fbbf24', braccia: '#2dd4bf', gambe: '#a78bfa', glutei: '#f472b6', core: '#94a3b8' };
const GRUPPI_ORDINE = ['petto', 'schiena', 'spalle', 'braccia', 'gambe', 'glutei', 'core'];
let _mcStorico = null;
function gruppiDelGiorno(v) {
  if (!v) return [];
  let lista = v.sessione && v.sessione.length ? v.sessione : (v.items || []);
  if (!lista.length && v.done) {
    /* giorni fatti prima che il calendario salvasse la seduta: la prende dallo storico */
    if (!_mcStorico) _mcStorico = loadHistory();
    const pre = String(v.doneAt || '').slice(0, 10);
    const h = _mcStorico.find(x => (v.historyId && x.id === v.historyId) || (pre && String(x.date || '').slice(0, 10) === pre && (!v.day || x.day === v.day)));
    if (h) lista = h.sessione || h.exercises || [];
  }
  const nomi = lista.map(e => e && e.name).filter(Boolean);
  const set = {};
  nomi.forEach(n => { const ex = findExercise(n); if (ex && GRUPPO_COLORE[ex.group]) set[ex.group] = 1; });
  return GRUPPI_ORDINE.filter(g => set[g]);
}
function puntiniGruppi(v) {
  const g = gruppiDelGiorno(v);
  if (!g.length) return '';
  return '<span class="mc-dots">' + g.slice(0, 6).map(x => '<i style="background:' + GRUPPO_COLORE[x] + '"></i>').join('') + '</span>';
}
function renderLegendaGruppi(cal) {
  const box = document.getElementById('mc-legend-gruppi');
  if (!box) return;
  const nelMese = {};
  settimaneDelMese().forEach(l => { for (let i = 0; i < 7; i++) { const v = cal[ymd(piuGiorni(l, i))]; if (v && !v.rest) gruppiDelGiorno(v).forEach(g => nelMese[g] = 1); } });
  const presenti = GRUPPI_ORDINE.filter(g => nelMese[g]);
  let h = presenti.length ? '<div class="mc-legend mc-leg-g">' + presenti.map(g =>
    '<span><i class="mc-gdot" style="background:' + GRUPPO_COLORE[g] + '"></i>' + MUSCLE_GROUPS[g].label + '</span>').join('') + '</div>' : '';
  /* riepilogo della settimana corrente: quante volte ogni gruppo */
  const lun = lunediDi(new Date());
  const volte = {};
  for (let i = 0; i < 7; i++) { const v = cal[ymd(piuGiorni(lun, i))]; if (v && !v.rest) gruppiDelGiorno(v).forEach(g => volte[g] = (volte[g] || 0) + 1); }
  const allenati = GRUPPI_ORDINE.filter(g => volte[g]);
  if (allenati.length) {
    const principali = ['petto', 'schiena', 'spalle', 'braccia', 'gambe'];
    const mancano = principali.filter(g => !volte[g]).map(g => MUSCLE_GROUPS[g].label);
    const una = allenati.filter(g => volte[g] === 1).map(g => MUSCLE_GROUPS[g].label);
    h += '<div class="mc-sett-gruppi"><b>Questa settimana</b>' +
      '<div class="mc-sg-row">' + allenati.map(g => '<span><i class="mc-gdot" style="background:' + GRUPPO_COLORE[g] + '"></i>' + MUSCLE_GROUPS[g].label + ' ' + volte[g] + '\u00D7</span>').join('') + '</div>' +
      '<p>' + (mancano.length ? 'Manca: ' + mancano.join(', ') : (una.length ? 'Ogni gruppo almeno una volta. Due volte a settimana e meglio per: ' + una.join(', ') : 'Ogni gruppo almeno due volte: ottimo.')) + '</p></div>';
  }
  box.innerHTML = h;
}

function renderMonthCal() {
  _mcStorico = null;
  if (mcAnno === null) { const o = new Date(); mcAnno = o.getFullYear(); mcMese = o.getMonth(); }
  const cal = loadCal();
  const oggi = ymd(new Date());
  document.getElementById('mc-title').innerText =
    new Date(mcAnno, mcMese, 1).toLocaleDateString(LOCALE(), { month: 'long', year: 'numeric' });

  document.getElementById('mc-grid').innerHTML = settimaneDelMese().map(l => {
    const lk = ymd(l);
    let piena = false;
    const celle = [0, 1, 2, 3, 4, 5, 6].map(i => {
      const d = piuGiorni(l, i), k = ymd(d), v = cal[k];
      if (v) piena = true;
      let cls = 'mc-cell';
      if (d.getMonth() !== mcMese) cls += ' fuori';
      if (k === oggi) cls += ' oggi';
      let mark = '';
      if (v && v.done) { cls += ' done'; mark = puntiniGruppi(v) || '\u2713'; }
      else if (v && v.rest) { cls += ' rest'; mark = '\u{1F634}'; }
      else if (v) { cls += ' plan'; mark = puntiniGruppi(v) || '\u25CF'; }
      /* in modalita copia, toccare un giorno sceglie la sua settimana */
      return '<button class="' + cls + '" data-data="' + k + '" onclick="mcCellClick(\'' + k + '\', \'' + lk + '\')">' +
        '<span class="mc-n">' + d.getDate() + '</span><span class="mc-mark">' + mark + '</span>' + (v && v.cardio && v.cardio.length ? '<span class="mc-cardio" aria-label="Cardio">' + ico('cardio') + '</span>' : '') + '</button>';
    }).join('');
    const stato = lk === mcCopySrc ? ' sorgente' : (mcCopyTargets.indexOf(lk) !== -1 ? ' bersaglio' : '');
    return '<div class="mc-week' + stato + '" data-lunedi="' + lk + '">' +
      '<span class="mc-grip' + (piena ? '' : ' vuota') + '" data-grip="' + lk + '" ' +
        'aria-label="Tocca per selezionare la settimana, trascina per copiarla">\u2261</span>' +
      celle + '</div>';
  }).join('');

  renderLegendaGruppi(cal);
  document.querySelectorAll('#mc-grid .mc-grip:not(.vuota)').forEach(attachWeekDrag);
  /* le celle con qualcosa dentro si possono trascinare per scambiarle
     (non mentre si sta copiando una settimana: i due gesti non si mischiano) */
  if (!mcCopySrc) {
    const calNow = loadCal();
    document.querySelectorAll('#mc-grid .mc-cell').forEach(c => {
      const v = calNow[c.getAttribute('data-data')];
      if (v && !v.done) attachSwapDrag(c, {
        selector: '#mc-grid .mc-cell', attr: 'data-data',
        label: (k) => daYmd(k).toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric' }),
        consenti: (a, b) => !!b && ymd(lunediDi(daYmd(a))) === ymd(lunediDi(daYmd(b))),
        onSwap: mcSwapDays
      });
    });
  }
  document.getElementById('mc-grid').classList.toggle('copiando', !!mcCopySrc);
  renderCopyBar();
  aggiornaAiutoIcs();
}

window.mcMove = function(delta) {
  mcMese += delta;
  if (mcMese < 0) { mcMese = 11; mcAnno--; }
  if (mcMese > 11) { mcMese = 0; mcAnno++; }
  renderMonthCal();
};
