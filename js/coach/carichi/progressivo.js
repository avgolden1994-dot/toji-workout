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
   - settimana di scarico: serie -40% e carico -10%, sul carico di riferimento
     (ultima seduta NON di scarico, MES-06: lo scarico non si compone) e dopo
     lo scarico si riparte da li; la seduta salvata dice se era di scarico (MES-09)
   - la BIA puo frenare: se la massa magra cala, niente aumenti
   Usa SOLO i dati dell utente, quindi funziona solo con il consenso.
   ============================================================ */
/* arrotondamento numerico (0,5 kg se non si dice il passo). ALG-06 (P3-A): il CARICO di un esercizio va sulla griglia del suo attrezzo con
   arrotondaAttrezzo(kg, nome, { modo }) (carichi/attrezzi.js; caricoInGriglia, caricoSalito, caricoSceso in regole-ricerca.js): questa resta per chi
   non e ancora passato (prontezza.js, dolore-mattina.js: la fase 'carico' 95 riporta in griglia i carichi della catena) e come ripiego con ALG-06 spenta */
function arrotonda(x, passo) { return Math.round(x / (passo || 0.5)) * (passo || 0.5); }

function incrementoPer(nome) {
  const m = findExercise(nome);
  const gambe = m && (m.group === 'gambe' || m.group === 'glutei');
  const comp = m && m.type === 'compound';
  if (gambe) return comp ? 5 : 2.5;
  return comp ? 2.5 : 1;
}

/* MES-06/MES-09: la fase di una seduta salvata (carico, scarico...). La scrive la voce stessa (settimana.fase); per le voci
   vecchie si ricava dal programma di adesso e dalla data, finche il programma c e (null se non si puo sapere) */
function faseSedutaSalvata(h, prog) {
  if (h && h.settimana && h.settimana.fase) return h.settimana.fase;
  const p = prog || getProgramma(), d = h ? dataSessione(h) : null;
  if (!p || !p.inizio || !Array.isArray(p.fasi) || !d) return null;
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7) + 1;
  return w >= 1 && w <= p.fasi.length ? (p.fasi[w - 1] || null) : null;
}
/* Il carico di questo esercizio, in questa seduta, era di scarico? Si, se il coach lo aveva deciso per l esercizio (obiettivo.coachTipo:
   anche lo scarico deciso dal coach o mirato su un solo esercizio) oppure se la seduta era in una settimana di scarico del programma
   (anche se la prontezza del giorno ha cambiato il tipo in «giu»: era comunque un carico di scarico; «scarico...» vale anche per fasi
   con un suffisso, come «scarico-reattivo»). E l unica definizione di «seduta di scarico»: la usano MES-06 (riferimento e ripresa) e,
   con l interruttore di MES-10, inScarico (regole-ricerca.js) per le analisi. */
function esercizioInScarico(h, ex, prog) {
  if (ex && ex.obiettivo && ex.obiettivo.coachTipo === 'scarico') return true;
  return /^scarico/.test(String(faseSedutaSalvata(h, prog) || ''));
}

/* Le sedute in cui compare l esercizio, dalla piu recente: { h: la voce di storico, ex: l esercizio con le sue serie }.
   opz.senzaScarico (MES-06): salta le sedute di scarico, che non dicono quanto si e forti */
function sedutePerEsercizio(nome, n, opz) {
  const senzaScarico = !!(opz && opz.senzaScarico), prog = senzaScarico ? getProgramma() : null;
  const out = [];
  loadHistory().forEach(h => {
    if (out.length >= n || !h.sessione || h.interrotta) return;
    const ex = h.sessione.find(e => e.name === nome);
    if (!ex || (senzaScarico && esercizioInScarico(h, ex, prog))) return;
    out.push({ h: h, ex: ex });
  });
  return out;
}
/* Le ultime sessioni in cui compare l esercizio, dalla piu recente (con { senzaScarico: true } senza quelle di scarico) */
function ultimeSessioni(nome, n, opz) { return sedutePerEsercizio(nome, n, opz).map(x => x.ex); }

/* MES-06: carico di riferimento di un esercizio = il carico massimo delle serie fatte nell ultima seduta che NON era di scarico,
   se e di meno di GIORNI_CARICO_RIFERIMENTO giorni (0 se non c e). Lo scarico si calcola su questo e mai sul carico di un altro
   scarico (60 → 54 → 48,5 → 43,5 kg), e dopo lo scarico si riparte da qui. */
const GIORNI_CARICO_RIFERIMENTO = 28;
function caricoRiferimento(nome, base) {
  /* base (ALG-05, stesso esercizio con ripetizioni diverse nella settimana: revisione di 3a, M1): il bersaglio di oggi; il riferimento e l ultima seduta di lavoro CON LO STESSO
     bersaglio (a 10 ripetizioni con 8 kg non dice cosa fare con 10 kg a 6), altrimenti l ultima seduta di lavoro */
  const fatte = sedutePerEsercizio(nome, 12, { senzaScarico: true }).filter(x => (x.ex.sets || []).some(s => s.done));
  const t = (Number(base) > 0 && fatte.find(x => Math.abs(Number((x.ex.obiettivo || {}).base) - Number(base)) < 1e-9)) || fatte[0];
  if (!t) return 0;
  const d = dataSessione(t.h);
  if (d && giorniTra(d, new Date()) > GIORNI_CARICO_RIFERIMENTO) return 0;
  return Math.max.apply(null, t.ex.sets.filter(s => s.done).map(s => Number(s.weight) || 0));
}

/* ALG-02: l ultima volta con l esercizio = carico (il massimo delle serie fatte, come lo legge il motore: carico piu
   frequente con W3-T1) e ripetizioni previste (obiettivo.reps nelle voci nuove, altrimenti le piu basse tra le serie fatte).
   null se manca la storia o non c erano serie fatte. Serve a «blocca» e a «extra» (dolore-mattina.js). */
function pesoUltimoDi(nome) {
  const ex = ultimeSessioni(nome, 1)[0];
  const fatte = ex ? (ex.sets || []).filter(s => s.done) : [];
  if (!fatte.length) return null;
  const prevista = ex.obiettivo ? Number(ex.obiettivo.reps) : 0;
  return { weight: Math.max.apply(null, fatte.map(s => Number(s.weight) || 0)),
           reps: prevista > 0 ? prevista : Math.min.apply(null, fatte.map(s => Number(s.reps) || 0)) };
}

function esito(ex, repsTarget) {
  const fatte = ex.sets.filter(s => s.done);
  if (!fatte.length) return 'saltato';
  const tutte = fatte.length === ex.sets.length;
  const reps = fatte.every(s => (Number(s.reps) || 0) >= (Number(repsTarget) || 0));
  return tutte && reps ? 'ok' : 'mancato';
}

/* Settimana corrente del programma (1..N) e la sua fase. PRN-03 (INT-2d, B1): alla settimana del controllo di un programma da principiante a 12 settimane la
   prima lettura decide il controllo (controlloOttavaPrincipiante, programma/mesociclo.js: con il consenso, una volta sola, annullabile) e scrive la fase nel
   programma salvato; la settimana di scarico che ne esce porta la dose fissata dal controllo (`doseFissa`, la legge caricoProssimoBase) e il suo motivo */
window.settimanaProgramma = function() {
  let p = getProgramma();
  if (!p) return null;
  if (typeof controlloOttavaPrincipiante === 'function' && controlloOttavaPrincipiante(p)) p = getProgramma();
  const giorni = giorniTra(daYmd(p.inizio), lunediDi(new Date()));
  const w = Math.floor(giorni / 7) + 1;
  if (w < 1 || w > p.settimane) return { numero: w, fase: null, finito: w > p.settimane, totale: p.settimane };
  const out = { numero: w, fase: p.fasi[w - 1], finito: false, totale: p.settimane };
  const c = p.piano && p.piano.controllo;
  if (c && c.settimana === w) { out.controllo = c.motivo; if (c.esito === 'scarico' && out.fase === 'scarico') out.doseFissa = c.dose; }
  return out;
};

/* La BIA frena gli aumenti se la massa magra e scesa di almeno 1 kg */
function frenoBia() {
  const st = getBiaStorico();
  if (st.length < 2) return null;
  const a = st[st.length - 2].valori, b = st[st.length - 1].valori;
  if (a.ffm && b.ffm && b.ffm - a.ffm <= -1) return 'La massa magra e scesa di ' + Math.abs(Math.round((b.ffm - a.ffm) * 10) / 10) + ' kg nell ultima BIA: per ora tengo fermi i carichi e punto al recupero.';
  return null;
}
