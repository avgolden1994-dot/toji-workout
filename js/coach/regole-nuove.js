/* Regole del coach aggiunte dalla ricerca (RIC-01..05)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   REGOLE NUOVE DALLA RICERCA
   Ognuna ha il suo codice (docs/coach-mappa-regole.md, capitolo 19), si puo
   spegnere con regolaAttiva() e spiega sempre il motivo nella nota
   dell esercizio. Non toccano le regole di sicurezza: modalita prudente,
   over 65, dolore e scarico hanno sempre la precedenza.
   RIC-01 serie in piu nelle settimane centrali del blocco (Pelland 2025, Bell 2024)
   RIC-02 pausa piu lunga prima di abbassare il carico (Singer 2024)
   RIC-03 posizione allungata per petto, schiena e glutei (Maeo 2021-2023, Pedrosa 2025)  -> schemi.js
   RIC-04 al massimo una tecnica al cedimento per seduta (Robinson 2024)
   RIC-05 rientro dopo una pausa: serie ridotte su tutto il piano (detraining, SBS)
   W1-T3: nessun involucro. RIC-01/02/05 sono la fase 60 della catena 'carico', RIC-04 la fase 20 di 'apertura' e di 'prontezza'
   (regia/fasi.js, piano B.3): l ordine e scritto nel numero, non nell ordine degli script.
   ============================================================ */
const TECNICHE_INTENSE = ['drop', 'amrap', 'parziali', 'calibrazione', 'negativa', 'forzate', 'riposopausa'];   /* tutte arrivano al cedimento */

function sedutePassate() {
  return loadHistory().filter(h0 => h0.sessione && h0.sessione.length && !h0.interrotta)
    .map(h0 => ({ h: h0, d: dataSessione(h0) })).filter(x => x.d).sort((a, b) => b.d - a.d);
}
/* giorni dall ultima seduta vera (0 se non ce n e nessuna: niente rientro per chi comincia) */
function giorniDallUltimaSeduta() {
  const s = sedutePassate();
  return s.length ? giorniTra(s[0].d, new Date()) : 0;
}
/* prontezza media delle ultime due sedute in cui e stata registrata (null se mai) */
function prontezzaRecente() {
  const v = sedutePassate().map(x => x.h.prontezza).filter(x => typeof x === 'number').slice(0, 2);
  return v.length ? v.reduce((t, x) => t + x, 0) / v.length : null;
}
/* RIC-05: pausa lunga su tutto il piano. I giorni sono quelli veri, per tutti: oltre i 65 anni non si contano doppi, come per il singolo esercizio (CAR-04). Il registro B20 li
   voleva doppi, ma 5 giorni di pausa (normali con 2 sedute a settimana) facevano scattare il -10% e il -25% delle serie: deroga del 2026-10-05 finche W4-T2 non porta la catena
   completa di B20 con le sue soglie (CST-01, CST-02, MES-15). */
function rientroPiano() {
  const g = giorniDallUltimaSeduta();
  return g >= 14 ? g : 0;
}
/* RIC-01: settimana centrale di un blocco di carico (non la prima, non l ultima prima dello scarico) */
function settimanaCentraleBlocco() {
  const p = getProgramma(), st = settimanaProgramma();
  if (!p || !p.fasi || !st || st.finito || st.fase !== 'carico') return false;
  let k = 0;
  for (let i = st.numero - 2; i >= 0 && p.fasi[i] === 'carico'; i--) k++;
  return k >= 1 && p.fasi[st.numero] === 'carico';
}
function gruppoInPriorita(nome) {
  const g = (findExercise(nome) || {}).group;
  return !!g && ((getProfile() || {}).priorita || []).indexOf(g) !== -1;
}
/* RIC-02: nell ultima seduta tutte le serie tranne l ultima erano complete */
function mancavaSoloUltimaSerie(nome, repsTarget) {
  const s = ultimeSessioni(nome, 1)[0];
  if (!s || !s.sets || s.sets.length < 3) return false;
  const completa = x => x.done && (Number(x.reps) || 0) >= (Number(repsTarget) || 0);
  return s.sets.slice(0, -1).every(completa) && !completa(s.sets[s.sets.length - 1]);
}

/* Fase 60 RIC della catena 'carico' (regia/fasi.js, W1-T3): RIC-05, RIC-01 e RIC-02 sul risultato di 10 BIL e 50 AGG; prima era un involucro
   di caricoProssimo. Viene dopo gli aggiusti (50) e prima di INT-04 (70): lo scritto «60» e l ordine, non quello degli script. */
function regoleRicAlCarico(r, c) {
  const nome = c.nome, repsTarget = c.repsTarget;
  if (!r || r.tipo === 'scarico' || isTimeBased(nome)) return r;
  const pc = profiloCoach();
  /* ETA-02 (INT-1, correzione di sicurezza): il minorenne (eta > 0 e sotto i 18: 0 = non detta) e prudente come l over 65, il PAR-Q e il principiante: niente serie in piu
     (RIC-01, una 16enne arrivava a 5 serie) e niente pausa allungata di RIC-02; il generatore gia lo trattava cosi (brief.chi.cauto) */
  const minorenne = pc.eta > 0 && pc.eta < PARAM_ETA.maggiorenne;
  const cauto = pc.prudente || pc.sonnoMale || pc.livello === 'principiante' || pc.eta >= 65 || minorenne;
  const rientro = regolaAttiva('RIC-05') ? rientroPiano() : 0;
  if (rientro) {
    if (r.sets > 2) {
      r.sets = Math.max(2, Math.round(r.sets * 0.75));
      r.motivo += ' • rientro dopo ' + rientro + ' giorni: meno serie su tutto il piano, poi si torna al solito';
    }
    return r;
  }
  if (regolaAttiva('RIC-01') && !cauto && r.sets <= 4 && settimanaCentraleBlocco() && gruppoInPriorita(nome)
      && (prontezzaRecente() === null || prontezzaRecente() >= COACH_PARAMETRI.prontezzaBuona)) {
    r.sets += 1;
    r.motivo += ' • settimana centrale del blocco, muscolo prioritario: +1 serie (si torna indietro con lo scarico)';
  }
  if (regolaAttiva('RIC-02') && r.tipo === 'fermo' && !r.piuPausa && !cauto && mancavaSoloUltimaSerie(nome, repsTarget)) {
    r.piuPausa = 45;
    r.motivo += ' • mancava solo l ultima serie: 45 secondi di pausa in piu prima di abbassare il carico';
  }
  return r;
}
registraFase('carico', 60, 'RIC', regoleRicAlCarico);

/* RIC-04: tecniche al cedimento. In scarico o con prontezza bassa nessuna; altrimenti una sola per seduta.
   La tecnica del programma non si cancella: per la seduta di oggi si mette '-' (nessun badge). */
function limitaTecnicheIntense(day) {
  if (!regolaAttiva('RIC-04') || !coachAttivo()) return 0;
  const data = loadData(), list = data[day] || [];
  if (list.some(e => e.completedSets.some(s => s.done))) return 0;
  const st = settimanaProgramma();
  const pr = prontezzaOggi(day);
  const niente = (st && st.fase === 'scarico') || (typeof pr === 'number' && pr < COACH_PARAMETRI.prontezzaMedia);
  let viste = 0, tolte = 0;
  list.forEach(e => {
    const t = e.tecnicaSeduta || e.tecnica;
    if (!TECNICHE_INTENSE.includes(t)) return;
    if (niente || viste >= 1) { e.tecnicaSeduta = '-'; tolte++; } else viste++;
  });
  if (tolte) saveData(data);
  return tolte;
}
/* RIC-04 come fase 20 dei punti 'apertura' (dopo i carichi, 10) e 'prontezza' (dopo la prontezza, 10): prima erano involucri di
   applicaCaricoProgressivo e applicaProntezza. Non restituiscono niente: il valore (esercizi cambiati, punteggio) resta quello della fase 10. */
registraFase('apertura', 20, 'RIC-04', (n, c) => { limitaTecnicheIntense(c.giorno); });
registraFase('prontezza', 20, 'RIC-04', () => {
  if (limitaTecnicheIntense(currentDay) && typeof renderAllenamento === 'function') renderAllenamento();
});
