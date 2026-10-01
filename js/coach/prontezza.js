/* Prontezza prima della seduta
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PRONTEZZA PRIMA DELLA SEDUTA (check in 4 tocchi)
   Sonno 30%, stress 25%, dolenzia 25%, voglia 20% (FitnessVolt, Hooper).
   70% o piu: seduta come da piano. 50-69%: un RIR in piu sui
   multiarticolari (-4%). Sotto 50%: seduta leggera, multiarticolari -10%.
   Gli isolamenti non si toccano: il sonno scarso cala la forza solo nei
   multiarticolari (Knowles 2018). Si puo saltare.
   ============================================================ */
const PRONTEZZA_KEY = () => 'coach_plus_prontezza_' + currentMode;
const PRONTEZZA_VOCI = [
  ['sonno', 'Sonno', 30, ['Male', 'Così così', 'Bene']],
  ['stress', 'Stress', 25, ['Alto', 'Medio', 'Basso']],
  ['dolenzia', 'Dolenzia', 25, ['Molta', 'Un po’', 'Nessuna']],
  ['voglia', 'Voglia', 20, ['Poca', 'Normale', 'Tanta']]
];
/* facoltativo: sintomi del ciclo, trattati come sonno e stress (niente programmazione per fasi: Colenso-Semple 2023) */
const VOCE_CICLO = ['ciclo', 'Ciclo', 15, ['Sintomi forti', 'Lievi', 'Nessuno']];
function vociProntezza() { const p = getProfile() || {}; return p.cicloTraccia ? PRONTEZZA_VOCI.concat([VOCE_CICLO]) : PRONTEZZA_VOCI; }
let prontezzaStato = {};
function leggiProntezza() { try { return JSON.parse(localStorage.getItem(PRONTEZZA_KEY()) || 'null'); } catch (e) { return null; } }
function prontezzaOggi(day) {
  const p = leggiProntezza();
  return p && p.data === ymd(new Date()) && p.day === day ? p.punteggio : undefined;
}
function punteggioProntezza(r) {
  const voci = vociProntezza().filter(v => r[v[0]] !== undefined);
  const tot = voci.reduce((t, v) => t + v[2], 0) || 100;
  return Math.round(voci.reduce((t, v) => t + v[2] * (r[v[0]] || 0) / 2, 0) * 100 / tot);
}
function renderProntezza() {
  const box = document.getElementById('prontezza-box');
  if (!box) return;
  const list = loadData()[currentDay] || [];
  const p = leggiProntezza();
  const fatta = p && p.data === ymd(new Date()) && p.day === currentDay;
  if (!coachAttivo() || fatta || !list.length || list.some(e => e.completedSets.some(x => x.done))) { box.innerHTML = ''; return; }
  box.innerHTML = '<div class="card pz-card"><div class="pz-head"><b>Come stai oggi?</b><button class="og-link" onclick="saltaProntezza()">Salta</button></div>' +
    '<div class="pz-sub">Quattro tocchi: il coach adatta i carichi di oggi.</div>' +
    vociProntezza().map(v => '<div class="pz-row"><span>' + v[1] + '</span><div class="pz-opts">' +
      v[3].map((l, i) => '<button class="pz-opt' + (prontezzaStato[v[0]] === i ? ' on' : '') + '" onclick="sceltaProntezza(\'' + v[0] + '\',' + i + ')">' + l + '</button>').join('') +
      '</div></div>').join('') + '</div>';
}
window.sceltaProntezza = function(k, v) {
  prontezzaStato[k] = v;
  if (vociProntezza().every(x => prontezzaStato[x[0]] !== undefined)) applicaProntezza(prontezzaStato);
  else renderProntezza();
};
window.saltaProntezza = function() {
  try { localStorage.setItem(PRONTEZZA_KEY(), JSON.stringify({ data: ymd(new Date()), day: currentDay, punteggio: null })); } catch (e) {}
  prontezzaStato = {};
  renderProntezza();
};
window.applicaProntezza = function(r) {
  const punteggio = punteggioProntezza(r);
  const f = punteggio >= COACH_PARAMETRI.prontezzaBuona ? 1 : (punteggio >= COACH_PARAMETRI.prontezzaMedia ? COACH_PARAMETRI.prontezzaFattoreMedia : COACH_PARAMETRI.prontezzaFattoreBassa);
  const prima = localStorage.getItem(dataKey());
  const data = loadData();
  let toccati = 0;
  if (f < 1) (data[currentDay] || []).forEach(e => {
    const m = findExercise(e.name);
    if (!m || m.type !== 'compound' || !(Number(e.weight) > 0) || e.completedSets.some(x => x.done)) return;
    e.weight = arrotonda(e.weight * f);
    e.completedSets = e.completedSets.map(x => Object.assign({}, x, { weight: e.weight }));
    e.coachNote = (punteggio >= 50 ? 'Prontezza ' + punteggio + '%: un RIR in più sui multiarticolari (-4%)' : 'Prontezza ' + punteggio + '%: seduta leggera, multiarticolari -10%');
    e.coachTipo = 'giu';
    toccati++;
  });
  /* giornata ottima in settimana di carico: una serie in piu sugli accessori */
  const st = settimanaProgramma();
  if (punteggio >= 70 && st && st.fase === 'carico') (data[currentDay] || []).forEach(e => {
    if (tipoCarico(e.name) !== 'isolamento' || e.completedSets.some(x => x.done) || e.sets >= 5) return;
    e.sets += 1; e.completedSets.push({ done: false, reps: e.reps, weight: e.weight, wasBerserk: false });
    e.coachNote = (e.coachNote ? e.coachNote + ' \u2022 ' : '') + 'Prontezza alta: una serie in piu'; toccati++;
  });
  saveData(data);
  try { localStorage.setItem(PRONTEZZA_KEY(), JSON.stringify({ data: ymd(new Date()), day: currentDay, punteggio: punteggio, risposte: r })); } catch (e) {}
  /* storia: stanchezza che dura una settimana = scarico anticipato (Hooper) */
  const storia = storicoProntezza().filter(x => x.data !== ymd(new Date())).concat([{ data: ymd(new Date()), punteggio: punteggio, sonno: r.sonno }]).slice(-14);
  try { localStorage.setItem('coach_plus_prontezza_storia_' + currentMode, JSON.stringify(storia)); } catch (e) {}
  const settimana = storia.filter(x => giorniTra(daYmd(x.data), new Date()) <= 7);
  if (settimana.length >= 3 && settimana.slice(-3).every(x => x.punteggio < 50)) {
    const ag = aggiustiCoach();
    if (!ag.scarico) { ag.scarico = { sedute: 2, motivo: 'stanchezza alta per piu giorni di fila' }; salvaAggiusti(ag); }
  }
  prontezzaStato = {};
  renderProntezza(); renderAllenamento();
  const msg = punteggio >= 70 ? 'Prontezza ' + punteggio + '%: seduta come da piano' :
    (punteggio >= 50 ? 'Prontezza ' + punteggio + '%: multiarticolari un po’ più leggeri' : 'Prontezza ' + punteggio + '%: oggi seduta leggera. Anche solo muoversi conta.');
  showUndo(msg, toccati ? () => { if (prima !== null) localStorage.setItem(dataKey(), prima); renderAllenamento(); } : null, 6000);
  return punteggio;
};
