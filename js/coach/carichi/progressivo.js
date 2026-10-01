/* Carico progressivo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CARICO PROGRESSIVO ENGINE
   Doppia progressione, il metodo piu semplice e sostenuto dalle evidenze:
   - stesso carico finche TUTTE le serie arrivano alle ripetizioni previste
   - poi si aumenta: circa +2-5% nella parte alta, +5-10% sulle gambe
     (in pratica +2,5 kg / +5 kg sui multiarticolari, meno sugli isolamenti)
   - mancato una volta: stesso carico, si punta a piu ripetizioni
   - mancato due volte di fila: -10% e si ricostruisce
   - settimana di scarico: serie -40% e carico -10%
   - la BIA puo frenare: se la massa magra cala, niente aumenti
   Usa SOLO i dati dell utente, quindi funziona solo con il consenso.
   ============================================================ */
function arrotonda(x, passo) { return Math.round(x / (passo || 0.5)) * (passo || 0.5); }

function incrementoPer(nome) {
  const m = findExercise(nome);
  const gambe = m && (m.group === 'gambe' || m.group === 'glutei');
  const comp = m && m.type === 'compound';
  if (gambe) return comp ? 5 : 2.5;
  return comp ? 2.5 : 1;
}

/* Le ultime sessioni in cui compare l esercizio, dalla piu recente */
function ultimeSessioni(nome, n) {
  const out = [];
  loadHistory().forEach(h => {
    if (out.length >= n || !h.sessione || h.interrotta) return;
    const ex = h.sessione.find(e => e.name === nome);
    if (ex) out.push(ex);
  });
  return out;
}

function esito(ex, repsTarget) {
  const fatte = ex.sets.filter(s => s.done);
  if (!fatte.length) return 'saltato';
  const tutte = fatte.length === ex.sets.length;
  const reps = fatte.every(s => (Number(s.reps) || 0) >= (Number(repsTarget) || 0));
  return tutte && reps ? 'ok' : 'mancato';
}

/* Settimana corrente del programma (1..N) e la sua fase */
window.settimanaProgramma = function() {
  const p = getProgramma();
  if (!p) return null;
  const giorni = giorniTra(daYmd(p.inizio), lunediDi(new Date()));
  const w = Math.floor(giorni / 7) + 1;
  if (w < 1 || w > p.settimane) return { numero: w, fase: null, finito: w > p.settimane, totale: p.settimane };
  return { numero: w, fase: p.fasi[w - 1], finito: false, totale: p.settimane };
};

/* La BIA frena gli aumenti se la massa magra e scesa di almeno 1 kg */
function frenoBia() {
  const st = getBiaStorico();
  if (st.length < 2) return null;
  const a = st[st.length - 2].valori, b = st[st.length - 1].valori;
  if (a.ffm && b.ffm && b.ffm - a.ffm <= -1) return 'La massa magra e scesa di ' + Math.abs(Math.round((b.ffm - a.ffm) * 10) / 10) + ' kg nell ultima BIA: per ora tengo fermi i carichi e punto al recupero.';
  return null;
}
