/* Tempo della seduta: modello dei minuti, pause per classe, capacita, scala del taglio e fattore personale (CAS-05..08, CAS-18, PRG-03, PRG-13, PRG-20, PRG-33, IPE-04, IPE-12)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   TEMPO (piano coach v2, B.3 stadio 10; W2-T2)
   Il tempo e un TETTO, non un obiettivo (D-P10): la seduta non si allunga per riempire i minuti dichiarati (il riempimento di prima, riempiTempo, e sparito: W0-T7 aveva gia tolto
   l allungamento delle pause). Qui sta tutto cio che dipende dai minuti:
   - il modello (CAS-05; assorbe IPE-14 e RIS-12 come calcolo): durataEsercizio (n x (S + R) + X, con S per classe, unilaterali due lati + 10 s), la coppia (T_coppia), il riscaldamento
     generale (RIS 3.7) e la rampa del primo esercizio di ogni schema (RIS 3.9, tetto di RIS 3.6) in durataSeduta; il fattore personale (CAS-18, fattoreTempo) che lo tara sulle sedute vere.
     UNA funzione sola per il generatore e per le stime di Oggi, Giorno e Aggiungi allenamento (B36): durataSeduta;
   - le pause per classe e obiettivo (PRG-13, tabella B8) con la riga per le donne (PRG-20, D-P7) e i minimi oltre i 65 anni: limitiPausa, pausaPrescritta;
   - la capacita (CAS-06, assorbe PRI-08): stimaEsercizi (minimo 4, massimo 8, principianti 4-6 e al massimo 50 minuti);
   - la scala del taglio (CAS-07, assorbe IPE-03): pause al minimo della classe, coppie antagoniste, via core e braccia dirette, serie da 3 a 2 sui non prioritari, isolamenti uno alla volta,
     mai sotto i pavimenti; se resta tempo si aggiungono serie SOLO dove un muscolo e sotto fascia (serieSottoFascia, poi aggiungiSerieUtile di volume.js);
   - le note oneste (validaTempo): quanto dura, il lavoro utile gia tutto qui, il programma di mantenimento, la dose minima (IPE-12).
   I numeri stanno in soglie-tempo.js (SOGLIE_TEMPO, sogliaTempo). I nomi exerciseCountFor e stimaMinutiSeduta restano come sinonimi (le schermate e le prove li chiamano ancora).
   ============================================================ */

/* PRG-03 (B1): i numeri che restano di prima: il minimo di esercizi di una seduta (EXN-01 del collaudo: almeno 3), il tetto assoluto dopo le aggiunte (EXN-02: oltre 8, oltre 6 per chi inizia) e le
   quote dei tre tipi di esercizio in una seduta tipo (1 su 4 un fondamentale col bilanciere, 1 su 3 un multiarticolare libero o guidato, il resto isolamenti: Convenzione) */
const PARAM_NUMERO_ESERCIZI = {
  quotaTipi: { pesante: 0.25, macchina: 0.35, isolamento: 0.40 },
  min: 3,
  maxSeduta: 8, maxSedutaPrincipiante: 6
};
/* i numeri del tempo che altri file leggono ancora: il drop set (+45 s), la tolleranza del taglio (5%: il collaudo segnala oltre il 10%), le 48 ore (volume.js) e le fasce di volume per tipo
   di obiettivo e livello (massimo e minimo di serie frazionarie a settimana per [grande, piccolo]: Convenzione, docs/ricerca-ipertrofia-programmazione.md 3.2; le riscrive W2-T1 con la tabella B6) */
const PARAM_TEMPO = { secDrop: 45,
  tolleranzaSforamento: 0.05,
  serieMinRecupero: 4, /* REC-01 (W0-T7): un grande muscolo con almeno 4 serie frazionarie in una seduta aspetta 48 ore (nessun altro lavoro dello stesso muscolo nella seduta del giorno prima o dopo; ACSM 2009: Convenzione per la soglia di serie) */
  volumeMax: { ipertrofia: { principiante: [10, 10], intermedio: [16, 14], avanzato: [20, 18] }, forza: { principiante: [10, 8], intermedio: [14, 10], avanzato: [18, 12] },
    generale: { principiante: [8, 8], intermedio: [10, 10], avanzato: [12, 10] } },
  volumeMin: { ipertrofia: { principiante: [6, 4], intermedio: [10, 6], avanzato: [12, 8] }, forza: { principiante: [4, 2], intermedio: [6, 3], avanzato: [8, 4] },
    generale: { principiante: [4, 2], intermedio: [6, 3], avanzato: [8, 3] } } };

function sogliaTempo(nome) { return SOGLIE_TEMPO[nome].v; }
/* l obiettivo del programma per le fasce di volume e di pausa: forza, generale (salute, dimagrimento) o ipertrofia (come il collaudo) */
function tipoObiettivoDi(goals) { const g = goals[0]; return g === 'forza' ? 'forza' : ((g === 'salute' || g === 'dimagrimento') ? 'generale' : 'ipertrofia'); }
/* serie per esercizio che il generatore fara davvero con questo schema e questo livello: le serie dello schema (4 per la massa, 5 per la forza) sono il punto di partenza, ma il volume per muscolo
   e il taglio per il tempo le portano in media a 3 (3,5 per la forza; misurato su 1.800 programmi) */
function serieEffettive(scheme, opzioni) {
  const o = opzioni || {}, c = sogliaTempo('capacita');
  let sets = Math.min(scheme.sets, scheme.tettoSerie || 99, scheme.restCompound >= 210 ? c.serieMedieForza : c.serieMedie);
  if (o.level === 'principiante' || o.prudente) sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente);
  return sets;
}
function round15(x) { return Math.round(x / 15) * 15; }

/* ---------------------------------------------------------------- CAS-05: il modello dei tempi ----------------------------------------------------------------
   Di un esercizio il modello vuole la classe (A-F di attributi-esercizi.js), l attrezzo, se e a un lato solo, se e una tenuta e il cambio (setup). Si legge una volta per nome: un esercizio fuori
   libreria (aggiunto a mano) e un multiarticolare libero (classe B), il caso medio. */
const REGIONE_ALTO = ['petto', 'schiena', 'spalle', 'braccia'], REGIONE_BASSO = ['gambe', 'glutei'];
const _infoTempo = {};
function infoTempo(nome) {
  const k = String(nome || '');
  if (_infoTempo[k]) return _infoTempo[k];
  const a = typeof attributi === 'function' ? attributi(k) : null, m = findExercise(k) || null, pulito = senzaEmoji(k);
  const tenuta = !!(m && isTimeBased(k)), nordic = RX_NORDIC.test(pulito);
  let classe = a ? a.classe : null, attrezzo = a ? a.attrezzo : null;
  if (!attrezzo) { attrezzo = m ? attrezzoDi(pulito) : 'corpo'; if (attrezzo === 'macchine') attrezzo = 'macchina'; }
  if (!classe) {
    if (!m) classe = 'B';
    else if (m.group === 'core' || tenuta) classe = 'F';
    else if (m.type !== 'compound') classe = attrezzo === 'macchina' ? 'D' : 'E';
    else classe = tipoCarico(k) === 'pesante' ? 'A' : (attrezzo === 'macchina' ? 'C' : 'B');
  }
  const unilaterale = a ? !!a.unilaterale : !!(m && m.lato);
  const t = sogliaTempo('secRipetizione'), c = sogliaTempo('secCambio');
  const info = {
    classe: classe, attrezzo: attrezzo, tenuta: tenuta, nordic: nordic, unilaterale: unilaterale,
    secRip: nordic ? t.nordic : (classe === 'B' && attrezzo === 'corpo' ? t.corpo : t[classe]),
    cambio: a && a.setup > 0 ? a.setup : (unilaterale ? c.unilaterale : (attrezzo === 'elastico' ? c.elastico : c[classe])),
    compound: classe === 'A' || classe === 'B' || classe === 'C',
    schema: a ? a.schema : (typeof schemaDi === 'function' ? schemaDi(k) : null), gruppo: m ? m.group : null, credito: a ? a.muscoli : null,
    regione: m ? (REGIONE_ALTO.indexOf(m.group) !== -1 ? 'alto' : (REGIONE_BASSO.indexOf(m.group) !== -1 ? 'basso' : null)) : null
  };
  _infoTempo[k] = info;
  return info;
}
/* S: secondi di una serie = c + n x t_rip; una tenuta dura quanto la tenuta piu 5 s; a un lato solo: due serie piu 10 s di cambio */
function secSerieDa(reps, i) {
  const r = Number(reps) || 0;
  const una = i.tenuta ? r + sogliaTempo('secTenutaExtra') : sogliaTempo('secPreparazione') + r * i.secRip;
  return i.unilaterale ? 2 * una + sogliaTempo('secCambioLato') : una;
}
function pausaDi(e) { return e.rest !== undefined && e.rest !== null && e.rest !== '' ? (Number(e.rest) || 0) : 90; }
/* minuti di UN esercizio fatto a serie dritte: n x (S + R) + X (il recupero dell ultima serie e dentro; la seduta toglie solo l ultimo) */
function durataEsercizio(e) {
  const n = Number(e.sets) || 0;
  if (!(n > 0)) return 0;
  const i = infoTempo(e.name);
  return (n * (secSerieDa(e.reps, i) + pausaDi(e)) + i.cambio) / 60;
}
/* minuti di una coppia (il secondo esercizio ha `superset`): n giri x (S_A + S_B + 15 + max(R_A, R_B)) + X_A + X_B; i giri sono quelli dell esercizio con piu serie */
function durataCoppia(a, b) {
  const ia = infoTempo(a.name), ib = infoTempo(b.name), giri = Math.max(Number(a.sets) || 0, Number(b.sets) || 0);
  return (giri * (secSerieDa(a.reps, ia) + secSerieDa(b.reps, ib) + sogliaTempo('secPassaggioCoppia') + Math.max(pausaDi(a), pausaDi(b))) + ia.cambio + ib.cambio) / 60;
}
/* RIS 3.9, 3.4, 3.5: quante serie di rampa prima dei lavori di ogni esercizio. L intensita relativa I = 1 / (1 + (R + 2) / 30) dice 4, 3 o 2 serie al fondamentale col bilanciere, 3, 2 o 1 alla macchina;
   i manubri una in meno; il corpo libero una serie leggera sul primo multiarticolare; l isolamento guidato una sul primo del muscolo; poi le riduzioni (stessa regione, stesso gruppo, stesso schema) e gli
   aumenti (chi comincia, over 65 e PAR-Q). Il peso non conta: la stima e la stessa prima e dopo la scelta del carico di partenza */
function rampaDelleSerie(lista, o) {
  const r = sogliaTempo('rampaSerie'), prudente = !!(o.prudente);
  const stato = { regioni: { alto: 0, basso: 0 }, gruppi: {}, schemi: {}, composti: 0, primi: {} };
  return lista.map(e => {
    const i = infoTempo(e.name);
    let n = 0, primoSchema = false, primo = false;
    if (i.tenuta || i.classe === 'F') n = 0;
    else if (i.compound) {
      const I = 1 / (1 + ((Number(e.reps) || 0) + r.rir) / r.epley), k = I >= r.intensita[0] ? 0 : (I >= r.intensita[1] ? 1 : 2);
      if (i.attrezzo === 'corpo') n = stato.composti === 0 ? r.corpoLibero : 0;
      else if (i.attrezzo === 'macchina' || i.attrezzo === 'cavo') n = r.guidato[k];
      else { n = r.pesante[k]; if (i.attrezzo !== 'bilanciere') n = Math.max(1, n - r.manubriMeno); }
      primoSchema = !!i.schema && !stato.schemi[i.schema];
      if (n > 0) {
        if (stato.gruppi[i.gruppo] >= r.serieLavoroPerRiduzione) n = Math.max(0, n - r.menoGruppo);
        else if (i.regione && stato.regioni[i.regione] >= r.serieLavoroPerRiduzione) n = Math.max(0, n - r.menoRegione);
        if (stato.schemi[i.schema]) n = Math.min(n, r.stessoSchemaMax);
      }
      if (n > 0 && primoSchema && o.livello === 'principiante') n += r.principiante;
      if (n > 0 && prudente) n += r.prudente;
      n = Math.min(n, r.max);
      if (i.regione) { stato.regioni[i.regione] += Number(e.sets) || 0; if (n > 0 && !stato.primi[i.regione]) { primo = true; stato.primi[i.regione] = true; } }
      if (i.schema) stato.schemi[i.schema] = true;
      stato.composti++;
    } else if (i.classe === 'D' && !stato.gruppi[i.gruppo]) n = r.isolamentoGuidato;
    if (i.gruppo) stato.gruppi[i.gruppo] = (stato.gruppi[i.gruppo] || 0) + (Number(e.sets) || 0);
    return { n: n, primo: primo };   /* il primo multiarticolare di ogni regione (alto, basso) non perde la rampa per il tetto */
  });
}
/* RIS 3.6: il tetto della rampa di una seduta, dai minuti dichiarati; si taglia dagli ultimi esercizi, mai dal primo di ogni regione (prima i non primi, poi una serie alla volta ai primi) */
function minutiRampa(lista, o) {
  const rm = sogliaTempo('rampaMinuti'), voci = rampaDelleSerie(lista, o);
  const m = Number(o.minuti) || 60, tetto = sogliaTempo('rampaTetto').find(t => m <= t[0])[1];
  const tot = () => voci.reduce((t, v) => t + rm[v.n], 0);
  for (let g = 0; g < 40 && tot() > tetto; g++) {
    let k = -1;
    voci.forEach((v, j) => { if (v.n > 0 && !v.primo) k = j; });
    if (k !== -1) { voci[k].n = 0; continue; }
    voci.forEach((v, j) => { if (v.n > 1) k = j; });
    if (k === -1) break;
    voci[k].n--;
  }
  return tot();
}
/* RIS 3.7: il riscaldamento generale G = min(8, max(3, 4 + eta + pesante + zona dolente)); freddo, ora e rientro non si conoscono: 0 */
function minutiRiscaldamentoGenerale(lista, o) {
  const g = sogliaTempo('riscaldamentoGenerale'), eta = Number(o.eta) || 0;
  const primo = lista.find(e => infoTempo(e.name).compound);
  const G = g.base + (eta >= 60 ? g.eta60 : (eta >= 40 ? g.eta40 : 0)) + (o.fastidi ? g.zonaDolente : 0) + (primo && (Number(primo.reps) || 0) <= g.ripetizioniPesante ? g.pesante : 0);
  return Math.min(g.max, Math.max(g.min, G));
}

/* Le opzioni del modello: chi si allena (eta, PAR-Q, livello, fastidi), i minuti dichiarati (servono al tetto della rampa) e il fattore personale. Il generatore le legge dal brief (opzioniTempo), le schermate
   dal profilo salvato (opzioniTempoProfilo): sono gli stessi dati (il profilo e l onboarding salvato). Mentre il generatore lavora le chiamate senza opzioni (completamenti, tecniche) usano quelle del brief
   (contesto, scade dopo qualche secondo: un errore a meta lavoro non deve sporcare le schermate). */
let _contestoTempo = null;
function impostaContestoTempo(o) { _contestoTempo = { o: o, t: Date.now() }; }
function liberaContestoTempo() { _contestoTempo = null; }
function opzioniTempo(brief) {
  const chi = brief.chi;
  return { minuti: brief.agenda.minuti, eta: chi.eta, prudente: chi.over65 || chi.parq, livello: chi.livello, fastidi: (brief.sicurezza.fastidi || []).length > 0, fattore: fattoreTempo() };
}
function opzioniTempoProfilo(conFattore) {
  const p = (typeof getProfile === 'function' ? getProfile() : null) || {};
  const eta = Number(p.age) || 0, f = (p.fastidi || (p.prefs && p.prefs.fastidi) || []).filter(x => x && x !== 'nessuno');
  return { minuti: Number(p.minutes) || 60, eta: eta, prudente: eta >= 65 || p.parq === true || p.parq === 'si', livello: typeof livelloConosciuto === 'function' ? livelloConosciuto(p.level) : (p.level || 'intermedio'),
    fastidi: f.length > 0, fattore: conFattore === false ? 1 : fattoreTempo() };
}
function opzioniTempoCorrenti() {
  if (_contestoTempo && Date.now() - _contestoTempo.t < 5000) return _contestoTempo.o;
  return opzioniTempoProfilo();
}

/* CAS-05: la durata di una seduta in minuti = (G + rampa + somma degli esercizi e delle coppie - il recupero dopo l ultimo) x fattore personale. E LA funzione dei minuti: il generatore (taglio, note),
   Oggi, Giorno e Aggiungi allenamento la chiamano con la lista degli esercizi (`name`, `sets`, `reps`, `rest`, `superset`, `tecnica`); gli esercizi saltati o senza serie non contano */
function durataSeduta(esercizi, opz) {
  const o = opz || opzioniTempoCorrenti();
  const lista = (esercizi || []).filter(e => e && !e.skipped && Number(e.sets) > 0);
  if (!lista.length) return 0;
  let min = minutiRiscaldamentoGenerale(lista, o) + minutiRampa(lista, o), ultimaPausa = 0;
  for (let i = 0; i < lista.length; i++) {
    const a = lista[i], b = lista[i + 1] && lista[i + 1].superset ? lista[i + 1] : null;
    if (b) { min += durataCoppia(a, b); ultimaPausa = Math.max(pausaDi(a), pausaDi(b)); i++; }
    else { min += durataEsercizio(a); ultimaPausa = pausaDi(a); }
    [a, b].forEach(x => { if (x && x.tecnica === 'drop') min += PARAM_TEMPO.secDrop / 60; });
  }
  return (min - ultimaPausa / 60) * (o.fattore > 0 ? o.fattore : 1);
}

/* CAS-18: il fattore personale = la mediana di (minuti reali / minuti stimati) delle ultime 3 sedute vere con la durata registrata, tra 0,8 e 1,4; con meno di 3 sedute vale 1. Solo con il consenso
   ai dati (coachAttivo). La stima di una seduta passata si rifa dalle serie fatte (sessione dello storico) con lo stesso modello, senza fattore; le coppie si leggono dal piano di oggi (stesso giorno,
   stesso nome): lo storico non le salva. Si ricalcola solo quando lo storico cambia. */
let _cacheFattore = { raw: null, v: 1 };
function mediana(v) { const s = v.slice().sort((a, b) => a - b), k = Math.floor(s.length / 2); return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; }
function fattoreTempo() {
  try {
    if ((typeof coachAttivo === 'function' && !coachAttivo()) || (typeof regolaAttiva === 'function' && !regolaAttiva('CAS-18'))) return 1;
    const raw = localStorage.getItem(historyKey()) || '';
    if (raw === _cacheFattore.raw) return _cacheFattore.v;
    const c = sogliaTempo('fattorePersonale'), piano = loadData();
    const o = Object.assign(opzioniTempoProfilo(false), { fattore: 1 });
    const stima = (h) => {
      const giorno = piano[h.day] || [];
      const es = h.sessione.map(x => {
        const fatte = (x.sets || []).filter(s => s && s.done);
        if (!fatte.length) return null;
        const cur = giorno.find(y => y.name === x.name);
        return { name: x.name, sets: fatte.length, reps: Math.round(mediana(fatte.map(s => Number(s.reps) || 0))), rest: x.rest, superset: !!(cur && cur.superset) };
      }).filter(Boolean);
      return durataSeduta(es, o);
    };
    const rapporti = loadHistory().filter(h => h.minuti >= c.minutiMin && h.minuti <= c.minutiMax && Array.isArray(h.sessione) && h.sessione.length && !h.interrotta && !h.importata && !h.passata && !h.libera)
      .filter(h => { const tot = h.sessione.reduce((t, x) => t + (x.sets || []).length, 0), fatte = h.sessione.reduce((t, x) => t + (x.sets || []).filter(s => s && s.done).length, 0); return tot > 0 && fatte >= tot * c.completamento; })
      .sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0)).slice(0, c.sedute).map(h => { const s = stima(h); return s > 0 ? h.minuti / s : null; }).filter(x => x !== null);
    const v = rapporti.length < c.sedute ? 1 : Math.min(c.max, Math.max(c.min, mediana(rapporti)));
    _cacheFattore = { raw: raw, v: v };
    return v;
  } catch (e) { return 1; }
}

/* ---------------------------------------------------------------- PRG-13, PRG-20: le pause per classe ----------------------------------------------------------------
   limitiPausa(nome, ctx) dice, per UN esercizio: v (la pausa prescritta), max (la piu lunga ammessa), lo (la piu corta ammessa) e taglio (dove arriva il taglio per il tempo).
   ctx: obiettivo (forza, ipertrofia, generale), reps, donna, parq, over65. La classe viene dagli attributi (A-F); il Nordic Curl ha le pause degli isolamenti: e un eccentrico, non un core.
   Donne (D-P7): -15% solo su D, E e su B, C con almeno 8 ripetizioni, mai su A ne con 6 ripetizioni o meno, con i minimi 45/60/75 s; non con il PAR-Q (DON-08). Oltre i 65 anni almeno 90 s su B e C,
   120 s su A (B8: sale anche il minimo del taglio). Nessuna pausa si accorcia per riempire, ne si allunga: la tabella e un tetto e un pavimento. */
function classePausa(nome) { const i = infoTempo(nome); return i.nordic ? 'E' : i.classe; }
function limitiPausa(nome, ctx) {
  const o = ctx || {}, ob = o.obiettivo || 'ipertrofia', tab = sogliaTempo('pausa')[ob], i = infoTempo(nome), cl = classePausa(nome);
  const cella = tab[cl] || tab.B, base = sogliaTempo('pausaMinimo'), alzato = sogliaTempo('pausaMinimoAlzato')[ob] || {}, minimi = {};
  Object.keys(base).forEach(k => { minimi[k] = Math.max(base[k], alzato[k] || 0); });
  let v = cella[0], max = cella[1], lo = cella[2] !== undefined ? cella[2] : minimi[cl];
  if (cl === 'B' && i.attrezzo === 'corpo' && ob !== 'forza') { v = Math.min(v, sogliaTempo('pausaCorpoLibero')); }
  if (ob !== 'forza' && (cl === 'D' || cl === 'E') && i.credito && (i.credito.polpacci === 1 || i.credito.deltoide_laterale === 1)) { const p = sogliaTempo('pausaPolpacciLaterali'); v = Math.min(v, p[0]); max = Math.min(max, p[1]); }
  const d = sogliaTempo('pauseDonne');
  if (o.donna && !o.parq && d.classi.indexOf(cl) !== -1 && (Number(o.reps) || 0) >= d.ripetizioniMinime) {
    v = Math.min(v, Math.max(round15(v * d.fattore), d.minimi[cl]));
    lo = Math.min(lo, v);
  }
  let taglio = ob === 'forza' && cl === 'A' ? v : Math.min(v, minimi[cl]);
  const p65 = sogliaTempo('pausaOltre65')[cl];
  if (o.over65 && p65) { v = Math.max(v, p65); lo = Math.max(lo, p65); taglio = Math.max(taglio, p65); }
  return { v: v, max: Math.max(max, v), lo: Math.min(lo, v), taglio: Math.min(Math.max(taglio, lo), v) };
}
function pausaPrescritta(nome, ctx) { return limitiPausa(nome, ctx).v; }
/* B34: ogni esercizio della seduta ha la pausa della sua classe, anche quelli che i completamenti hanno aggiunto dopo la prescrizione (Hyperextension a 158 s, Ponte Glutei...): si riporta dentro
   [lo, max]. Scrive in brief.lavoro.pauseDonneAccorciate se per le donne e scesa sotto la pausa degli uomini (la nota del programma sulle pause delle donne lo legge: genera.js, noteDelProgramma) */
/* l obiettivo che vale per le pause e le fasce di UNA seduta: quello del programma, salvo il giorno di ipertrofia del PHUL (ha le pause della massa anche con la forza come obiettivo: B2) */
function obiettivoDellaSeduta(brief, i) { return (brief.lavoro.tipiGiorno || [])[i] === 'ipertrofia' ? 'ipertrofia' : tipoObiettivoDi(brief.obiettivi.lista); }
function pausePerClasse(brief, sedute) {
  const chi = brief.chi, donna = chi.donna && regolaAttiva('PRG-20');
  let accorciate = false;
  sedute.forEach((sd, i) => sd.esercizi.forEach(e => {
    const ctx = { obiettivo: obiettivoDellaSeduta(brief, i), reps: e.reps, donna: donna, parq: chi.parq, over65: chi.over65 };
    const lim = limitiPausa(e.name, ctx);
    if (donna && lim.v < limitiPausa(e.name, Object.assign({}, ctx, { donna: false })).v) accorciate = true;
    if (!(e.rest >= 0)) e.rest = lim.v;
    if (e.rest > lim.max) e.rest = lim.max; else if (e.rest < lim.lo) e.rest = lim.lo;
  }));
  brief.lavoro.pauseDonneAccorciate = accorciate;
}

/* ---------------------------------------------------------------- CAS-06: la capacita (quanti esercizi) ---------------------------------------------------------------- */
/* i minuti su cui contare: chi comincia sta al massimo in 50 minuti anche se ne dichiara di piu (D-P10, PRI-08; nelle settimane 1-2 40: lo fanno le serie del mesociclo, W2-T4) */
function minutiEffettivi(minuti, livello) {
  const M = Number(minuti) || 60;
  return livello === 'principiante' ? Math.min(M, sogliaTempo('durataMaxPrincipiante').dopo) : M;
}
function durataMassimaPrincipiante(settimana) { const d = sogliaTempo('durataMaxPrincipiante'); return settimana >= 1 && settimana <= 2 ? d.settimane1e2 : d.dopo; }
function obiettivoDaSchema(scheme) { return scheme.restCompound >= 210 ? 'forza' : (scheme.restCompound >= 120 ? 'ipertrofia' : 'generale'); }
/* CAS-06 (assorbe PRG-03 e PRI-08): quanti esercizi stanno nei minuti. Si costruisce una seduta tipica (un esercizio su 4 un fondamentale col bilanciere, su 3 un multiarticolare, il resto isolamenti),
   con le serie di serieEffettive, le pause della tabella e il modello di durataSeduta (riscaldamento e rampa tipici; con 45 minuti o meno le coppie fanno risparmiare il 25%), e si prende il numero piu
   grande che sta nei minuti, tra 4 (i quattro schemi base) e 8; per chi comincia tra 4 e 6 (5-6 con 2 giorni). Non e il numero finale: il taglio (adattaAlTempo) toglie il resto */
function stimaEsercizi(minutes, scheme, opzioni) {
  const o = opzioni || {}, cap = sogliaTempo('capacita'), q = PARAM_NUMERO_ESERCIZI.quotaTipi, principiante = o.level === 'principiante';
  const M = minutiEffettivi(minutes, o.level), ob = o.obiettivo || obiettivoDaSchema(scheme), sets = serieEffettive(scheme, o), rep = ob === 'forza' ? { A: 5, B: 6, E: 12 } : { A: 8, B: 10, E: 12 };
  const tab = sogliaTempo('pausa')[ob], rs = sogliaTempo('secRipetizione'), cm = sogliaTempo('secCambio');
  const costo = (cl) => ((sets * (secSerieDa(rep[cl], { tenuta: false, unilaterale: false, secRip: rs[cl] }) + tab[cl][0]) + cm[cl]) / 60);
  const cA = costo('A'), cB = costo('B'), cE = costo('E'), rg = sogliaTempo('riscaldamentoGenerale'), rm = sogliaTempo('rampaMinuti');
  const tetto = sogliaTempo('rampaTetto').find(t => M <= t[0])[1];
  const calda = Math.min(rg.max, Math.max(rg.min, rg.base + (ob === 'forza' ? rg.pesante : 0))) + Math.min(tetto, rm[3] + rm[2]);
  const T = (n) => {
    const nA = Math.round(n * q.pesante), nB = Math.round(n * q.macchina), nE = n - nA - nB;
    return calda + (nA * cA + nB * cB + nE * cE) * (M <= cap.minutiConCoppie ? 1 - cap.risparmioCoppie : 1) - tab.E[0] / 60;
  };
  let n = cap.min;
  for (let k = cap.min; k <= cap.max && T(k) <= M; k++) n = k;
  if (principiante) n = Math.max(Number(o.giorni) <= 2 && M >= cap.minutiMinPrincipiante2Giorni ? cap.minPrincipiante2Giorni : cap.minPrincipiante, Math.min(cap.maxPrincipiante, n));
  return n;
}

/* quanti esercizi per seduta: dai minuti (stimaEsercizi), uno in meno per chi inizia con poca fiducia (la prima cosa e presentarsi; mai sotto il minimo dei principianti), poi come vuole il metodo scelto.
   Qui comincia il lavoro del tempo di un programma: le opzioni del brief diventano il contesto delle stime fino alla verifica finale (validaTempo) */
function numeroEsercizi(brief) {
  const chi = brief.chi, metodoAttivo = brief.metodo.attivo;
  impostaContestoTempo(opzioniTempo(brief));
  let nEs = stimaEsercizi(brief.agenda.minuti, brief.obiettivi.scheme, { level: chi.livello, prudente: chi.cauto, obiettivo: tipoObiettivoDi(brief.obiettivi.lista), giorni: Number(brief.agenda.giorni) || 3 });
  const cap = sogliaTempo('capacita');
  /* chi comincia ha al massimo 6 esercizi in tutto (EXN-02): la ricetta ne prende uno meno, perche il core (ABB-03) entra sopra */
  if (chi.livello === 'principiante' && nEs >= cap.maxPrincipiante) nEs = cap.maxPrincipiante - 1;
  if (brief.mente.ps.fiduciaBassa && chi.livello === 'principiante' && nEs > cap.minPrincipiante) nEs--;
  if (metodoAttivo && metodoAttivo.nEs) nEs = metodoAttivo.nEs(nEs);
  return nEs;
}

/* ---------------------------------------------------------------- CAS-07: la scala del taglio ---------------------------------------------------------------- */
/* mai sotto i pavimenti: togliere `serie` serie dell esercizio non porta un grande muscolo sotto 4 serie frazionarie a settimana, ne un unita sotto il suo pavimento di serie dirette (pavimentoVolume di
   volume.js, W2-T1: finche vale 0 resta solo il pavimento dei grandi muscoli) */
function pavimentoOk(brief, sedute, e, serie) {
  const cr = infoTempo(e.name).credito;
  if (!cr || typeof contaVolume !== 'function') return true;
  const p = sogliaTempo('pavimentiTaglio'), vol = contaVolume(sedute);
  return Object.keys(cr).every(u => {
    const c = cr[u];
    if (!(c > 0) || !vol[u]) return true;
    if (p.grandi.indexOf(u) !== -1 && vol[u].frazionarie - serie * c < p.frazionarieGrandi) return false;
    const f = typeof pavimentoVolume === 'function' ? Number(pavimentoVolume(brief, u)) || 0 : 0;
    return !(c === 1 && f > 0 && vol[u].dirette - serie < f);
  });
}
function togliEsercizio(sd, e) {
  const k = sd.esercizi.indexOf(e), prossimo = sd.esercizi[k + 1];
  sd.esercizi.splice(k, 1);
  if (prossimo && prossimo.superset && !e.superset) prossimo.superset = false;   /* l esercizio era il primo di una coppia: il secondo resta solo */
}
/* i passi del taglio su UNA seduta (la scala di CAS-07, ricerca-casa-poco-tempo 5.4): 1) pause al minimo della classe (la classe A della forza non si taglia); 2) coppie antagoniste se fanno risparmiare,
   anche sopra i 45 minuti (ABB-06: mai con un fondamentale pesante); 3) via il core e le braccia dirette (non quelli che coprono un buco della settimana: `protetto`); 4) serie da 3 a 2 sui non prioritari;
   5) gli isolamenti uno alla volta; ultima risorsa (DUR-01): un isolamento protetto. Mai sotto i pavimenti, mai sotto i quattro schemi base per due serie. `passi` conta cosa e servito (le note) */
function scalaDelTempo(brief, sd, sedute, opz, minutiEff, passi) {
  const chi = brief.chi, goals = brief.obiettivi.lista, ob = obiettivoDellaSeduta(brief, sedute.indexOf(sd)), prio = brief.lavoro.prefs.priorita, metodoAttivo = brief.metodo.attivo;
  const limite = minutiEff * (1 + PARAM_TEMPO.tolleranzaSforamento), T = () => durataSeduta(sd.esercizi, opz);
  if (T() <= limite) return;
  const comp = (e) => infoTempo(e.name).compound, group = (e) => (findExercise(e.name) || {}).group, isPrio = (e) => prio.indexOf(group(e)) !== -1;
  /* 1) le pause verso il minimo della classe, 15 secondi alla volta, sempre a quella piu lunga sopra il suo minimo, finche la seduta sta nei minuti (non un taglio secco di tutte: il recupero si toglie solo quanto serve) */
  const donnaPausa = chi.donna && regolaAttiva('PRG-20'), taglio = (e) => limitiPausa(e.name, { obiettivo: ob, reps: e.reps, donna: donnaPausa, parq: chi.parq, over65: chi.over65 }).taglio;
  let cambiato = false;
  for (let g = 0; g < 200 && T() > limite; g++) {
    const c = sd.esercizi.map(e => ({ e: e, sopra: e.rest - taglio(e) })).filter(x => x.sopra > 0).sort((a, b) => b.sopra - a.sopra)[0];
    if (!c) break;
    c.e.rest = Math.max(c.e.rest - 15, c.e.rest - c.sopra); cambiato = true;
  }
  if (cambiato) passi.pause++;
  if (T() <= limite) return;
  /* 2) le coppie antagoniste, se fanno risparmiare (la coppia di prima si rimette com era se no); un metodo famoso ha le sue */
  if (!metodoAttivo) {
    const prima = T(), ordine = sd.esercizi.slice(), flag = ordine.map(e => !!e.superset);
    strSuperserie(sd);
    sd.esercizi.forEach((e, i) => { if (e.superset && !coppiaValida(sd.esercizi[i - 1], e)) delete e.superset; });   /* solo antagonisti per muscolo (SS-01) */
    if (T() < prima - 0.01) passi.coppie++;
    else { sd.esercizi.splice(0, sd.esercizi.length, ...ordine); ordine.forEach((e, k) => { if (flag[k]) e.superset = true; else delete e.superset; }); }
    if (T() <= limite) return;
  }
  /* 3) il core e le braccia dirette (P6 e P5), uno alla volta: non i protetti, non sotto i pavimenti */
  const via = (sel) => {
    for (let g = 0; g < 12 && T() > limite; g++) {
      const c = sd.esercizi.filter(sel).filter(e => !e.fisso && !e.protetto && pavimentoOk(brief, sedute, e, e.sets)).pop();
      if (!c) break;
      togliEsercizio(sd, c); passi.tagli++;
    }
  };
  via(e => group(e) === 'core');
  via(e => group(e) === 'braccia' && !comp(e));
  /* 4) le serie da 3 a 2 sui non prioritari, una alla volta: prima gli isolamenti, poi i multiarticolari (spinte prima delle tirate: ABB-04) e per ultimo il fondamentale della seduta (M4: il lavoro pesante e
     quello che conta); 5) poi gli isolamenti uno alla volta, il core per ultimo */
  const fondamentale = sd.esercizi.find(e => comp(e) && !isTimeBased(e.name));
  for (let g = 0; g < 80 && T() > limite; g++) {
    const c = sd.esercizi.filter(e => e.sets > 2 && !e.fisso && pavimentoOk(brief, sedute, e, 1)).sort((a, b) => isPrio(a) - isPrio(b) || (a === fondamentale) - (b === fondamentale) || comp(a) - comp(b) || strEtirata(a) - strEtirata(b) || b.sets - a.sets)[0];
    if (c) { c.sets--; passi.tagli++; continue; }
    const iso = sd.esercizi.filter(e => !comp(e) && !e.protetto && !e.fisso && pavimentoOk(brief, sedute, e, e.sets));
    const senzaCore = iso.filter(e => group(e) !== 'core'), v = (senzaCore.length ? senzaCore : iso).pop();
    if (v && sd.esercizi.length > 3) { togliEsercizio(sd, v); passi.tagli++; continue; }
    break;
  }
  /* la forza: se proprio non entra, anche la classe A scende al minimo di B8 (120 s; con la forza non si taglia prima: ACSM 2009, Schoenfeld 2016) */
  if (T() > limite && ob === 'forza') {
    const min = sogliaTempo('pausaMinimo').A;
    sd.esercizi.forEach(e => { if (classePausa(e.name) === 'A' && e.rest > min) e.rest = min; });
  }
  /* ultima risorsa (collaudo DUR-01): se sfora ancora di oltre il 10%, l ultima aggiunta protetta che non e core lascia il posto (meglio una copertura in meno che una seduta che non sta nei minuti) */
  for (let g = 0; g < 12 && T() > minutiEff * 1.10 && sd.esercizi.length > 3; g++) {
    const protette = sd.esercizi.filter(e => !comp(e) && e.protetto && group(e) !== 'core');
    if (!protette.length) break;
    togliEsercizio(sd, protette[protette.length - 1]); passi.tagli++;
  }
  /* e solo alla fine anche il 5x5 fisso della forza perde serie, fino a 3 (5 serie da 5 con 2-3 minuti di pausa non stanno in una seduta da 30 minuti) */
  for (let g = 0; g < 6 && T() > minutiEff * 1.10; g++) {
    const f = sd.esercizi.filter(e => e.fisso && e.sets > 3).sort((a, b) => b.sets - a.sets)[0];
    if (!f) break;
    f.sets--; passi.tagli++;
  }
}

/* CAS-07 passo finale e CAS-08 (D-P10: il tempo e un tetto): se in una seduta resta tempo, una serie in piu SOLO dove un muscolo e sotto la sua fascia settimanale (volumeMin: il minimo del livello e dell obiettivo),
   all isolamento che piu lo copre, dentro i massimi di volume, il tetto di serie per esercizio, le 48 ore e i minuti dichiarati (senza tolleranza); se nessun esercizio puo prenderla, un isolamento nuovo del muscolo
   piu in difetto. Senza muscoli sotto fascia la seduta resta com e, anche se corta. Ponte: il solutore per unita di W2-T1 (aggiungiSerieUtile, volume.js) lo sostituisce con la tabella B6; qui il minimo e quello di sempre. */
function sottoFascia(sedute, c) {
  const sett = frazionarieSettimana(sedute);
  return Object.keys(GRUPPI_FRAZIONARI).map(g => ({ gruppo: g, mancano: c.volumeMin[GRUPPI_FRAZIONARI[g].classe] - (sett[g] || 0) })).filter(x => x.mancano > 0);
}
function serieSottoFascia(brief, sedute, opz, minutiEff, c) {
  const group = (e) => (findExercise(e.name) || {}).group, tempoOk = (sd) => durataSeduta(sd.esercizi, opz) <= minutiEff;
  for (let giri = 0; giri < 40; giri++) {
    const sotto = sottoFascia(sedute, c);
    if (!sotto.length) break;
    const sett = frazionarieSettimana(sedute), mancano = {};
    sotto.forEach(x => { mancano[x.gruppo] = x.mancano; });
    let migliore = null;
    sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
      if (infoTempo(e.name).compound || e.fisso || isTimeBased(e.name) || e.sets >= c.maxSerie || !group(e) || group(e) === 'core' || group(e) === 'spalle') return;
      if (e.superset || (sd.esercizi[i + 1] && sd.esercizi[i + 1].superset)) return;   /* in coppia i giri sono quelli dell esercizio con piu serie */
      const cr = creditoSerie(e.name);
      if (!Object.keys(cr).every(g => (sett[g] || 0) + cr[g] <= c.volumeMax[GRUPPI_FRAZIONARI[g].classe])) return;
      const score = Object.keys(cr).reduce((t, g) => t + (mancano[g] ? mancano[g] * cr[g] : 0), 0);
      if (score <= 0 || !recuperoOk(sd, sedute, e.name, 1)) return;
      e.sets++;
      const ok = tempoOk(sd);
      e.sets--;
      if (ok && (!migliore || score > migliore.score || (score === migliore.score && e.sets < migliore.e.sets))) migliore = { e: e, score: score };
    }));
    if (migliore) { migliore.e.sets++; continue; }
    /* nessuna serie utile: un isolamento nuovo, dove c e posto e tempo, del muscolo piu in difetto (non un multiarticolare: spinte e tirate restano in equilibrio, ABB-04) */
    let fatto = false;
    for (const sd of sedute.slice().sort((a, b) => durataSeduta(a.esercizi, opz) - durataSeduta(b.esercizi, opz))) {
      if (sd.esercizi.length >= c.maxEsercizi) continue;
      const gruppi = GRUPPI_DELLA_SEDUTA[sd.tipo] || null, setsNuovo = c.maxSerie >= 3 ? 3 : 2;
      const uso = (n) => sedute.filter(x => x.esercizi.some(e => e.name === n)).length;
      const ginocchia = c.prefs.fastidi.indexOf('ginocchia') !== -1;   /* con le ginocchia dolenti non sceglie lui la leg extension (che il regex di RISCHIO lascia passare, REC-04) */
      const punti = EXERCISE_LIBRARY.filter(x => consentito(x.name, c.prefs) && !sd.esercizi.some(e => e.name === x.name) && uso(x.name) < maxSettimana(x.name) && !isTimeBased(x.name) &&
        x.group !== 'core' && x.group !== 'spalle' && (!gruppi || adattoAllaSeduta(x, sd.tipo)) && x.type !== 'compound' && !strRidondante(x, sd.esercizi) && !(ginocchia && /leg extension|sissy/i.test(senzaEmoji(x.name))))
        .map(x => {
          const cr = creditoSerie(x.name);
          const dentro = Object.keys(cr).every(g => (sett[g] || 0) + cr[g] * setsNuovo <= c.volumeMax[GRUPPI_FRAZIONARI[g].classe]);
          const manca = Object.keys(cr).reduce((t, g) => t + (mancano[g] ? mancano[g] * cr[g] : 0), 0);
          return { x: x, ok: dentro && manca > 0 && recuperoOk(sd, sedute, x.name, setsNuovo), manca: manca };   /* W0-T7: 48 ore e tetto di serie per muscolo in una seduta (REC-01, SES-01) */
        }).filter(y => y.ok).sort((a, b) => b.manca - a.manca || (PRIORI[senzaEmoji(b.x.name)] || 0) - (PRIORI[senzaEmoji(a.x.name)] || 0));
      for (const y of punti) {
        const tipo = tipoCarico(y.x.name), nuovo = { name: y.x.name, sets: setsNuovo, reps: RX_NORDIC.test(senzaEmoji(y.x.name)) ? ripetizioniFlessione(y.x.name) : (tipo === 'macchina' ? Math.max(8, c.reps) : Math.max(10, c.reps)), weight: y.x.weight || 0, rest: 0 };
        nuovo.rest = pausaPrescritta(nuovo.name, { obiettivo: c.obiettivoTipo, reps: nuovo.reps, donna: c.donna, parq: c.parq, over65: c.over65 });
        sd.esercizi.push(nuovo);
        if (!tempoOk(sd)) { sd.esercizi.pop(); continue; }
        strOrdina(sd.esercizi, sd.tipo, c.prefs.priorita);
        if (sd.tipo === 'punti') sd.esercizi.sort((a, b) => ((findExercise(a.name) || {}).group === 'core') - ((findExercise(b.name) || {}).group === 'core'));   /* nei punti deboli il core resta in fondo */
        fatto = true; break;
      }
      if (fatto) break;
    }
    if (!fatto) break;
  }
  return sottoFascia(sedute, c);
}

/* adattaAlTempo(brief, sedute): dopo il volume e i tetti, la seduta deve stare nei minuti dichiarati (+5%: il collaudo segnala oltre il 10%); chi comincia sta in 50 minuti al massimo (D-P10). In ordine:
   1) EXN-02: le aggiunte (schemi mancanti, regioni, copertura, femorali) non portano una seduta oltre 8 esercizi (6 per chi inizia): se succede, lascia la seduta l ultimo esercizio della ricetta che non e
      un aggiunta protetta, un fondamentale o un posto fisso;
   2) PRG-13 (B34): ogni esercizio ha la pausa della sua classe, anche le aggiunte;
   3) la scala del taglio (CAS-07, scalaDelTempo) per ogni seduta che sfora;
   4) i femorali (rinforzaFemorali, completamenti.js) dove la seduta resta nei minuti;
   5) il tempo che resta NON si riempie: una serie in piu solo dove un muscolo e sotto fascia (serieSottoFascia), poi il solutore di W2-T1 (aggiungiSerieUtile). Il metodo famoso decide da se. */
function adattaAlTempo(brief, sedute) {
  const chi = brief.chi, level = chi.livello, goals = brief.obiettivi.lista, scheme = brief.obiettivi.scheme, prefs = brief.lavoro.prefs, metodoAttivo = brief.metodo.attivo, L = brief.lavoro;
  const vincoli = brief.sicurezza.vincoli || {}, opz = opzioniTempo(brief), minuti = brief.agenda.minuti, minutiEff = minutiEffettivi(minuti, level), ob = tipoObiettivoDi(goals);
  impostaContestoTempo(opz);
  const maxEsSeduta = level === 'principiante' ? PARAM_NUMERO_ESERCIZI.maxSedutaPrincipiante : PARAM_NUMERO_ESERCIZI.maxSeduta;
  sedute.forEach(sd => {
    let giri = 0;
    while (sd.esercizi.length > maxEsSeduta && giri++ < 6) {
      const iso = sd.esercizi.filter(e => !e.protetto && !e.fisso && (findExercise(e.name) || {}).type !== 'compound' && (findExercise(e.name) || {}).group !== 'core');   /* il core in fondo resta: ABB-03 */
      /* un multiarticolare si toglie solo se la seduta ha un altro dello stesso schema (due spinte verticali): mai l unica spinta, tirata, squat o hinge (collaudo SES-03) */
      const doppi = sd.esercizi.filter(e => !e.protetto && !e.fisso && (findExercise(e.name) || {}).type === 'compound' && schemaDi(e.name) && sd.esercizi.filter(y => schemaDi(y.name) === schemaDi(e.name)).length > 1);
      /* se resta troppo lungo (EXN-02, anche con l 8 di CAS-06 le aggiunte di strCopri e dei completamenti possono portare a 9) lascia l ultima aggiunta protetta che non e core */
      const protette = sd.esercizi.filter(e => !e.fisso && e.protetto && (findExercise(e.name) || {}).type !== 'compound' && (findExercise(e.name) || {}).group !== 'core');
      /* il core si toglie solo se un altra seduta della settimana ne ha uno: la copertura (ABB-03) resta */
      const core = sd.esercizi.filter(e => !e.fisso && (findExercise(e.name) || {}).group === 'core' && sedute.some(o => o !== sd && o.esercizi.some(x => (findExercise(x.name) || {}).group === 'core')));
      const via = iso[iso.length - 1] || doppi[doppi.length - 1] || protette[protette.length - 1] || core[core.length - 1];
      if (!via) break;
      sd.esercizi.splice(sd.esercizi.indexOf(via), 1);
    }
  });
  pausePerClasse(brief, sedute);
  const passi = { pause: 0, coppie: 0, tagli: 0 };
  sedute.forEach(sd => scalaDelTempo(brief, sd, sedute, opz, minutiEff, passi));
  L.tempoPassi = passi;
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  if (!(metodoAttivo && metodoAttivo.essenziale) && conGambe && brief.agenda.giorni >= 2) rinforzaFemorali({ sedute: sedute, prefs: prefs, minuti: minutiEff, maxEsercizi: maxEsSeduta, setsNuovo: level === 'principiante' ? 2 : 3,
    maxSerieFlessione: vincoli.serieMaxEsercizio || (level === 'avanzato' ? 5 : 4),
    minimo: PARAM_TEMPO.volumeMin[ob][level][0] });
  if (!metodoAttivo) {
    const c = { minuti: minutiEff, maxSerie: vincoli.serieMaxEsercizio || 4, maxEsercizi: maxEsSeduta, volumeMax: PARAM_TEMPO.volumeMax[ob][level], volumeMin: PARAM_TEMPO.volumeMin[ob][level], prefs: prefs, reps: scheme.reps,
      obiettivoTipo: ob, donna: chi.donna && regolaAttiva('PRG-20'), parq: chi.parq, over65: chi.over65 };
    const sotto = serieSottoFascia(brief, sedute, opz, minutiEff, c);
    L.sottoFascia = sotto;
    if (typeof aggiungiSerieUtile === 'function') aggiungiSerieUtile(brief, sedute, sotto);   /* W2-T1: la stessa idea sulle unita fini con la tabella B6 (oggi non fa niente) */
  }
  if (passi.pause || passi.coppie || passi.tagli) {
    L.note.push(FRASE_TAGLIO_TEMPO);
    aggiungiPerche(brief, 'CAS-07', FRASE_TAGLIO_TEMPO, { forza: SOGLIE_TEMPO.pausaMinimo.forza });
  }
  return sedute;
}
const FRASE_TAGLIO_TEMPO = 'Per farti stare nei minuti ho accorciato prima le pause e abbinato esercizi opposti, poi tolto il superfluo: gli schemi di base restano sempre.';

/* DUR-01 (W0-T7): strFinale sposta serie sul fondamentale (le pause lunghe pesano di piu) e dopo il taglio la seduta puo tornare sopra i minuti dichiarati: ultimo giro, solo serie
   (mai esercizi: la struttura e finita), dagli esercizi non fissi e non prioritari con piu serie */
function rifinisciAlTempo(brief, sedute) {
  const prio = brief.lavoro.prefs.priorita, opz = opzioniTempo(brief), minuti = minutiEffettivi(brief.agenda.minuti, brief.chi.livello);
  impostaContestoTempo(opz);
  sedute.forEach(sd => {
    const isPrio = (e) => prio.indexOf((findExercise(e.name) || {}).group) !== -1, compound = (e) => (findExercise(e.name) || {}).type === 'compound';
    const fondamentale = sd.esercizi.find(e => compound(e) && !isTimeBased(e.name));   /* resta com e: ABB-08 */
    for (let g = 0; g < 12 && durataSeduta(sd.esercizi, opz) > minuti * (1 + PARAM_TEMPO.tolleranzaSforamento); g++) {
      const cand = sd.esercizi.filter(e => e.sets > 2 && !e.fisso && e !== fondamentale).sort((a, b) => isPrio(a) - isPrio(b) || compound(a) - compound(b) || strEtirata(a) - strEtirata(b) || b.sets - a.sets)[0];   /* le spinte prima delle tirate: ABB-04 */
      if (!cand) break;
      cand.sets--;
    }
  });
  return sedute;
}

/* ---------------------------------------------------------------- le note oneste (REG-02, D-P10, IPE-12) ---------------------------------------------------------------- */
const FRASE_DURATA = 'Le sedute durano circa # minuti: nel conto ci sono riscaldamento, cambi tra gli esercizi e, dove serve, il lato destro e sinistro.';
const FRASE_LAVORO_UTILE = 'Le sedute durano circa # minuti: il lavoro utile per te è già tutto qui, non serve riempire il resto del tempo.';
const FRASE_FATTORE_PIU = 'Le tue sedute durano di solito il #% più del previsto: adatto il programma alla tua velocità.';
const FRASE_FATTORE_MENO = 'Le tue sedute durano di solito il #% meno del previsto: adatto il programma alla tua velocità.';
const FRASE_MANTENIMENTO = 'Con questi minuti il programma tiene i muscoli e fa progredire chi comincia: per crescere in modo evidente servono più sedute o sedute più lunghe.';
const FRASE_PRINCIPIANTE_DURATA = 'Per chi comincia bastano sedute da 40-50 minuti: più a lungo non serve e stanca, il tempo in più va al riscaldamento e al recupero.';
const FRASE_POCO_TEMPO = 'Con poco tempo conta il lavoro essenziale: pochi esercizi completi, in coppia dove si può. Realisticamente 4-6 serie per muscolo a settimana: bastano per mantenere e per crescere da principiante.';
/* ABB-06 (SS-01, SS-02): una coppia ha il secondo esercizio col segno `superset` e il primo accanto. Dopo che una funzione di struttura (strBilancia) toglie o cambia un esercizio il segno puo restare su un esercizio che non e
   piu in coppia con un antagonista (o con un pesante, un core, una tenuta): si toglie, l esercizio resta a serie dritte e il tempo lo conta cosi. Ritorna quanti segni ha tolto */
const RX_BERSAGLIO_SPINTA = /^(petto|deltoide_anteriore)/, RX_BERSAGLIO_TIRATA = /^(dorsali|schiena_spessore|deltoide_posteriore)$/;
/* gli antagonisti PER MUSCOLO bersaglio (come li conta il collaudo SS-01): spinta (petto, deltoide anteriore) con tirata (dorsali, spessore, deltoide posteriore), bicipiti con tricipiti, quadricipiti con femorali.
   Piu stretto di strAntagonisti (struttura-pro.js, che guarda anche lo schema e il sottogruppo): un piegamento a diamante (tricipiti) o un hammer curl (brachioradiale) non sono la «spinta» e il «bicipite» di una coppia */
function antagonistiPerMuscolo(a, b) {
  const x = bersaglioDi(a.name) || '', y = bersaglioDi(b.name) || '';
  if ((RX_BERSAGLIO_SPINTA.test(x) && RX_BERSAGLIO_TIRATA.test(y)) || (RX_BERSAGLIO_TIRATA.test(x) && RX_BERSAGLIO_SPINTA.test(y))) return true;
  return (x === 'bicipiti' && y === 'tricipiti') || (x === 'tricipiti' && y === 'bicipiti') || (x === 'quadricipiti' && y === 'femorali') || (x === 'femorali' && y === 'quadricipiti');
}
function coppiaValida(a, e) { return !!a && !a.superset && strPuoSuperserie(a) && strPuoSuperserie(e) && strAntagonisti(a, e) && antagonistiPerMuscolo(a, e); }
function riparaCoppie(sedute) {
  let tolti = 0;
  sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
    if (e.superset && !coppiaValida(sd.esercizi[i - 1], e)) { delete e.superset; tolti++; }
  }));
  return tolti;
}
/* la verifica del tempo, l ultima del programma (verificaProgramma): dice quanto durano le sedute (la stessa durataSeduta di Oggi), se il fattore personale ha tarato il programma (CAS-18), se il lavoro utile e gia
   tutto qui (D-P10), se non si riesce a stare nei minuti (CAS-07: programma di mantenimento) e la dose minima di IPE-12. Ritorna le note; libera il contesto del generatore */
function validaTempo(brief, sedute) {
  const note = [], opz = opzioniTempo(brief), minuti = brief.agenda.minuti, level = brief.chi.livello, minutiEff = minutiEffettivi(minuti, level), L = brief.lavoro, giorni = Number(brief.agenda.giorni) || 3;
  liberaContestoTempo();
  if (!sedute.length) return note;
  riparaCoppie(sedute);
  const durate = sedute.map(sd => durataSeduta(sd.esercizi, opz)), media = Math.round(durate.reduce((t, x) => t + x, 0) / durate.length);
  const utileCompleto = !(L.sottoFascia && L.sottoFascia.length) && media < minutiEff * sogliaTempo('quotaLavoroUtile') && !brief.metodo.attivo;
  note.push((utileCompleto ? FRASE_LAVORO_UTILE : FRASE_DURATA).replace('#', media));
  const f = opz.fattore, s = sogliaTempo('fattorePersonale').sogliaNota;
  if (Math.abs(f - 1) >= s) note.push((f > 1 ? FRASE_FATTORE_PIU : FRASE_FATTORE_MENO).replace('#', Math.round(Math.abs(f - 1) * 100)));
  if (durate.some(d => d > minutiEff * 1.10)) note.push(FRASE_MANTENIMENTO);
  if (level === 'principiante' && minuti > minutiEff) note.push(FRASE_PRINCIPIANTE_DURATA);
  const p = sogliaTempo('pocoTempo');
  if ((minuti <= p.minuti || giorni <= p.giorni) && !brief.metodo.attivo && regolaAttiva('IPE-12')) note.push(FRASE_POCO_TEMPO);
  aggiungiPerche(brief, 'CAS-05', 'Durata stimata con riscaldamento, cambi, lato destro e sinistro e coppie: circa ' + media + ' minuti', { forza: SOGLIE_TEMPO.secRipetizione.forza });
  return note;
}

/* i sinonimi dei nomi di prima: stessa funzione, spostata qui */
function exerciseCountFor(minutes, scheme, opzioni) { return stimaEsercizi(minutes, scheme, opzioni); }
function stimaMinutiSeduta(esercizi, opz) { return durataSeduta(esercizi, opz); }
