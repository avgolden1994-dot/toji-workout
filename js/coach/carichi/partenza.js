/* Carico di partenza dai dati del corpo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CARICO DI PARTENZA: dai dati del corpo, poi dalle sedute
   Un esercizio mai fatto non parte piu dal valore generico della libreria
   (pensato per un uomo di 75 kg, principiante) ma da una stima per te:
     1. dalla massa muscolare (o magra) della BIA rispetto a quella di riferimento,
        con livello, sesso (solo parte alta del corpo), eta e prudenza;
     2. appena ci sono sedute registrate, da quello che sollevi davvero rispetto ai
        valori di riferimento: piu esercizi hai fatto, meno pesa la BIA e piu lo storico.
   E una stima prudente (si parte con ripetizioni di scorta): nelle prime sedute il
   coach la corregge piu in fretta del normale (calibrazione, in caricoProssimoBase).
   Senza consenso o senza dati del corpo si usa il valore della libreria, come prima.
   I coefficienti sono approssimazioni da affinare con i dati reali, non misure.
   ============================================================ */
const PARAM_PARTENZA = {
  rifSmm: 34,                         /* massa muscolare scheletrica di riferimento (kg): uomo di 75 kg al 18% di grasso */
  rifFfm: 61.5,                       /* massa magra di riferimento (kg): lo stesso uomo */
  fracMagra: { M: 0.82, F: 0.74 },    /* quota di massa magra stimata quando c e solo il peso */
  livello: { principiante: 1, intermedio: 1.3, avanzato: 1.6 },
  sessoParteAlta: 0.9,                /* a parita di massa, la parte alta delle donne e un po meno forte; gambe e glutei no */
  cauto: 0.85,                        /* PAR-Q positivo */
  prudenza: 0.85,                     /* si parte sotto il limite: le prime sedute calibrano */
  limiti: [0.45, 1.8],
  storicoAPieno: 4                    /* con 4 esercizi in storico la stima si fonda solo sulle sedute */
};
const MOTIVI_STIMA = {
  smm: 'Carico di partenza stimato dalla tua massa muscolare e dal tuo livello: prudente, si regola nelle prime sedute',
  ffm: 'Carico di partenza stimato dalla tua massa magra e dal tuo livello: prudente, si regola nelle prime sedute',
  peso: 'Carico di partenza stimato dal tuo peso e dal tuo livello: meno preciso senza la BIA, si regola nelle prime sedute',
  storico: 'Carico di partenza stimato da quello che sollevi negli altri esercizi: si regola nelle prime sedute'
};
/* cosa sappiamo del corpo: dati appena inseriti, altrimenti l ultima BIA salvata, altrimenti il peso */
function contestoCarichi(d, prof) {
  d = d || {}; prof = prof || {};
  const bia = d.bia || prof.bia || null;
  let ult = null;
  try { const st = getBiaStorico().filter(x => x && x.valori); ult = st.length ? st[st.length - 1].valori : null; } catch (e) {}
  const num = (k) => { const v = Number(bia && bia[k]); if (v > 0) return v; const w = Number(ult && ult[k]); return w > 0 ? w : null; };
  const sex = d.sex || prof.sex;
  const donna = sex === 'F' || sex === 'donna';
  const peso = num('peso') || Number(d.weight || prof.weight) || null;
  const smm = num('smm'), ffm = num('ffm'), fm = num('fmPerc');
  const P = PARAM_PARTENZA;
  let massa = null;
  if (smm && smm >= 10 && smm <= 70) massa = { v: smm, rif: P.rifSmm, tipo: 'smm' };
  else if (ffm && ffm >= 25 && ffm <= 110) massa = { v: ffm, rif: P.rifFfm, tipo: 'ffm' };
  else if (peso && fm && fm > 3 && fm < 60) massa = { v: peso * (1 - fm / 100), rif: P.rifFfm, tipo: 'ffm' };
  else if (peso && peso >= 35 && peso <= 200) massa = { v: peso * P.fracMagra[donna ? 'F' : 'M'], rif: P.rifFfm, tipo: 'peso' };
  return { massa: massa, donna: donna, eta: Number(d.age || prof.age) || 0, livello: d.level || prof.level || 'intermedio',
    cauto: !!(d.parq === 'si' || d.parq === true || prof.parq) };
}
/* fattore dal corpo per un esercizio (1 = come la libreria) */
function scalaDaCorpo(m, ctx) {
  if (!ctx || !ctx.massa) return null;
  const P = PARAM_PARTENZA;
  let k = ctx.massa.v / ctx.massa.rif;
  k *= P.livello[ctx.livello] || 1;
  if (ctx.donna && m.group !== 'gambe' && m.group !== 'glutei') k *= P.sessoParteAlta;
  if (ctx.eta >= 65) k *= 0.85; else if (ctx.eta >= 50) k *= 0.95;
  if (ctx.cauto) k *= P.cauto;
  return k * P.prudenza;
}
/* fattore dallo storico: mediana, sugli esercizi gia fatti, di (massimale stimato / massimale del valore di libreria) */
function scalaDaStorico() {
  const visti = {}, rapporti = [];
  loadHistory().filter(x => x.sessione && !x.interrotta).slice(0, 40).forEach(x => x.sessione.forEach(e => {
    if (visti[e.name]) return;
    const m = findExercise(e.name);
    if (!m || !(Number(m.weight) > 0) || isTimeBased(e.name) || corpoLibero(e.name)) return;
    const rm = e1rmSeduta(e);
    if (!rm) return;
    visti[e.name] = 1;
    rapporti.push(rm / (m.weight * (1 + (m.reps || 10) / 30)));
  }));
  if (!rapporti.length) return null;
  rapporti.sort((a, b) => a - b);
  const mid = rapporti.length / 2;
  const k = rapporti.length % 2 ? rapporti[(rapporti.length - 1) / 2] : (rapporti[mid - 1] + rapporti[mid]) / 2;
  return { k: k, n: rapporti.length };
}
/* pesi reali: barra da 20 kg, manubri e corpo libero a passi da 1 o 2 kg, macchine e cavi a 2,5 kg */
function arrotondaPartenza(m, x) {
  const att = attrezzoDi(m.name);
  let p;
  if (att === 'manubri' || att === 'corpo') p = x < 10 ? Math.round(x) : Math.round(x / 2) * 2;
  else p = Math.round(x / 2.5) * 2.5;
  if (att === 'bilanciere') p = Math.max(p, Math.min(20, Number(m.weight) || 20));
  return Math.max(att === 'manubri' || att === 'corpo' ? 1 : 2.5, p);
}
/* Stima del carico di partenza di un esercizio. Restituisce null se non c e nulla da stimare
   (nessun dato, esercizio a corpo libero o a tempo): allora vale il valore della libreria. */
window.stimaCaricoIniziale = function(nome, ctx) {
  const m = findExercise(nome);
  if (!m || !(Number(m.weight) > 0) || isTimeBased(nome) || corpoLibero(nome)) return null;
  const P = PARAM_PARTENZA;
  const kC = scalaDaCorpo(m, ctx);
  const sto = ctx && ctx.storico !== undefined ? ctx.storico : scalaDaStorico();
  if (kC === null && !sto) return null;
  let k, fonte;
  if (sto) {
    const w = Math.min(1, sto.n / P.storicoAPieno);
    k = kC === null ? sto.k : w * sto.k + (1 - w) * kC;
    fonte = 'storico';
  } else { k = kC; fonte = ctx.massa.tipo; }
  k = Math.max(P.limiti[0], Math.min(P.limiti[1], k));
  return { peso: arrotondaPartenza(m, m.weight * k), k: k, fonte: fonte, motivo: MOTIVI_STIMA[fonte] };
};
/* peso con cui parte un esercizio nuovo: la stima (solo col consenso ai dati), altrimenti la libreria */
function pesoPartenza(nome, ctx) {
  const m = findExercise(nome);
  const base = m ? Number(m.weight) || 0 : 0;
  if (!base || !coachAttivo()) return { peso: base, stimato: false };
  let s = null;
  try { s = stimaCaricoIniziale(nome, ctx || contestoCarichi({}, getProfile() || {})); } catch (e) {}
  return s ? { peso: s.peso, stimato: true, fonte: s.fonte, motivo: s.motivo } : { peso: base, stimato: false };
}

/* applicaPartenze(brief, sedute): il carico di partenza di ogni esercizio del programma nuovo (stadio 15 del generatore, piano B.3): dai dati del corpo (BIA) e, se ci
   sono, dallo storico; senza consenso restano quelli della libreria. Scrive weight, stimato e, se ne ha stimato qualcuno, la nota sulla fonte della stima.
   Oggi e il blocco «carichi di partenza» di buildProgram, spostato qui senza cambiarne l esito; lo riscrive W2-T8 (partenza bassa per le donne, CAR-18, PAR-06..09). */
function applicaPartenze(brief, sedute) {
  const d = brief.grezzo.d, prof0 = brief.grezzo.prof0, note = brief.lavoro.note;
  if (coachAttivo()) {
    const cc = contestoCarichi(d, prof0);
    cc.storico = scalaDaStorico();
    let stimati = 0, fonteStima = null;
    sedute.forEach(sd => sd.esercizi.forEach(e => {
      const s = stimaCaricoIniziale(e.name, cc);
      if (s) { e.weight = s.peso; e.stimato = s.fonte; stimati++; fonteStima = fonteStima || s.fonte; }
    }));
    if (stimati) note.push({ smm: 'Carichi di partenza stimati dalla tua massa muscolare, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
      ffm: 'Carichi di partenza stimati dalla tua massa magra, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
      peso: 'Carichi di partenza stimati dal tuo peso, dal livello e dall’età: senza la BIA sono meno precisi, si regolano nelle prime sedute.',
      storico: 'Carichi di partenza stimati da quello che sollevi già: si regolano nelle prime sedute.' }[fonteStima]);
  }
  return sedute;
}
