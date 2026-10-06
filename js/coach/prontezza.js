/* Prontezza prima della seduta
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PRONTEZZA PRIMA DELLA SEDUTA (check in 4 tocchi)
   Sonno 30%, stress 25%, dolenzia 25%, voglia 20% (FitnessVolt, Hooper).
   70% o piu: seduta come da piano. 50-69%: un RIR in piu sui
   multiarticolari (-4%). Sotto 50%: seduta leggera, multiarticolari -10%.
   Gli isolamenti non si toccano: il sonno scarso cala la forza solo nei
   multiarticolari (Knowles 2018). Si puo saltare.
   PRZ-03 (una serie in piu sugli accessori con prontezza 70% o piu) e ritirata (decisione D-P14, onda 0): "tutto normale" vale circa 78,
   quindi scattava quasi ogni giorno, oltre il piano e oltre il tetto di 3 serie dei principianti (B18). Il solo "+1 serie" che resta e
   quello settimanale per unita di volume (PCO-03, W3-T4).
   W1-T3: applicaProntezza non e piu avvolta da regole-nuove.js ma una catena 'prontezza' di fasi registrate (regia/fasi.js): 10 PRZ qui, 20 RIC-04.
   P3-B (programmi v2): PRZ-04 non basta da sola per uno scarico: la prontezza bassa e il segnale S1 di MES-07 e serve un secondo segnale, con le protezioni di distanza
   (valutaScaricoReattivo, sicurezza/scarico.js); lo scarico ha la dose e la durata uniche, e si annulla dal messaggio. La storia delle check-in porta anche la voce «voglia»
   (S6 di MES-07). CST-09: la stanchezza che non passa (prontezza bassa da due settimane, o due scarichi in sei settimane) ha il suo messaggio qui sotto, con il rinvio al medico.
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
  const persistente = typeof htmlStanchezzaPersistente === 'function' ? htmlStanchezzaPersistente() : '';   /* CST-09: solo programmi v2, con il consenso */
  if (!coachAttivo() || fatta || !list.length || list.some(e => e.completedSets.some(x => x.done))) { box.innerHTML = persistente; return; }
  box.innerHTML = persistente + '<div class="card pz-card"><div class="pz-head"><b>Come stai oggi?</b><button class="og-link" onclick="saltaProntezza()">Salta</button></div>' +
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
/* La prontezza di oggi. La catena 'prontezza' (regia/fasi.js, W1-T3): 10 PRZ qui (prontezzaDiOggi), 20 RIC-04 in regole-nuove.js
   (tecniche al cedimento con prontezza bassa). Restituisce il punteggio. */
window.applicaProntezza = function(r) {
  return eseguiFasi('prontezza', undefined, { risposte: r });
};
function prontezzaDiOggi(r) {
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
  /* PRZ-03 ritirata (D-P14): una giornata ottima non aggiunge serie */
  saveData(data);
  try { localStorage.setItem(PRONTEZZA_KEY(), JSON.stringify({ data: ymd(new Date()), day: currentDay, punteggio: punteggio, risposte: r })); } catch (e) {}
  /* storia: stanchezza che dura una settimana = scarico anticipato (Hooper) */
  const voce = { data: ymd(new Date()), punteggio: punteggio, sonno: r.sonno };
  if (typeof programmaConPiano === 'function' && programmaConPiano()) voce.voglia = r.voglia;   /* S6 di MES-07: solo nei programmi v2 (la v1 salva la voce di sempre) */
  const storia = storicoProntezza().filter(x => x.data !== ymd(new Date())).concat([voce]).slice(-14);
  try { localStorage.setItem('coach_plus_prontezza_storia_' + currentMode, JSON.stringify(storia)); } catch (e) {}
  const settimana = storia.filter(x => giorniTra(daYmd(x.data), new Date()) <= 7);
  let scaricoDecisoDa = null;   /* programmi v2: i segnali per cui il coach ha deciso lo scarico (per il messaggio e per annullarlo) */
  const primaAgg = localStorage.getItem(AGG_KEY());
  if (settimana.length >= 3 && settimana.slice(-3).every(x => x.punteggio < 50)) {
    const ag = aggiustiCoach();
    if (!ag.scarico) {
      /* MES-07: la prontezza bassa (S1) da sola non basta nei programmi v2: serve un secondo segnale e le protezioni di distanza (nelle prime settimane del blocco, vicino a un altro scarico: niente) */
      const mes07 = typeof valutaScaricoReattivo === 'function' ? valutaScaricoReattivo('S1') : { ok: true };
      if (mes07.ok) {
        ag.scarico = voceScaricoReattivo('stanchezza alta per piu giorni di fila', 2);
        salvaAggiusti(ag);
        if (programmaConPiano()) scaricoDecisoDa = mes07.segnali || [];
      }
    }
  }
  prontezzaStato = {};
  renderProntezza(); renderAllenamento();
  const msg = punteggio >= 70 ? 'Prontezza ' + punteggio + '%: seduta come da piano' :
    (punteggio >= 50 ? 'Prontezza ' + punteggio + '%: multiarticolari un po’ più leggeri' : 'Prontezza ' + punteggio + '%: oggi seduta leggera. Anche solo muoversi conta.');
  if (scaricoDecisoDa) {
    /* lo scarico deciso dal coach lo dice e si annulla (insieme ai carichi di oggi): prima di P3-B la voce si scriveva in silenzio */
    showUndo('Prontezza bassa da giorni e altri segnali di recupero scarso: le prossime ' + sogliaScarico('reattivoSedute') + ' sedute sono di scarico', () => {
      if (primaAgg !== null) localStorage.setItem(AGG_KEY(), primaAgg); else localStorage.removeItem(AGG_KEY());
      if (toccati && prima !== null) localStorage.setItem(dataKey(), prima);
      renderAllenamento();
    }, 8000);
  } else showUndo(msg, toccati ? () => { if (prima !== null) localStorage.setItem(dataKey(), prima); renderAllenamento(); } : null, 6000);
  return punteggio;
}
registraFase('prontezza', 10, 'PRZ', (v, c) => prontezzaDiOggi(c.risposte));
