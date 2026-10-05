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
   coach la corregge piu in fretta del normale (calibrazione: CAR-18 in carichi/calibrazione.js, CAR-16 in caricoProssimoBase).
   Senza consenso o senza dati del corpo si usa il valore della libreria, come prima (salvo la donna di PAR-06 senza il peso).
   I coefficienti sono approssimazioni da affinare con i dati reali, non misure.

   W2-T8 (piano coach v2, capitolo D; registro B1, B22, D-P1, D-P12, D-P13): partenza bassa per le donne fino al livello intermedio.
   PAR-01 livello mancante = principiante (D-P12); la BIA sposta la stima delle donne con il fattore attivo al massimo del ±15% rispetto a quella dal peso.
   PAR-05 testo della prima esposizione, per tutti: «Oggi si parte leggeri apposta: non è un test».
   PAR-06 fattore di partenza bassa per distretto e tipo (soglie-partenza.js), applicato dopo il limite del fattore dal corpo e solo a un carico STIMATO,
          mai a quello che viene dallo storico dello stesso esercizio. PAR-07 lo storico personale assorbe lo sconto (w = esercizi / 4); il rapporto dallo
          storico delle donne usa solo esercizi con calibrazione chiusa o RPE medio almeno 7 e due mediane (alto, basso). PAR-04: per difetto quando c e lo sconto.
   PAR-08 sotto la barra (0,9 × 20 kg): al posto del bilanciere la variante con manubri o macchina dello stesso muscolo, altrimenti barra vuota con poche
          ripetizioni e una serie in meno; penaltaPartenza e la penalita per la scelta degli esercizi (la legge ricette.js di W2-T6).
   PAR-09 corpo libero: le principianti partono da piegamenti inclinati e da trazioni assistite o lat machine.
   Gli uomini partono come prima (D-P1): il golden dei carichi lo prova byte per byte.
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
/* PAR-05 (W2-T8): la prima esposizione dice a tutti perche si parte leggeri; con la partenza bassa (fonte con il suffisso «Bassa», PAR-06) anche che e voluta.
   La chiave e il valore di stimato dell esercizio (la fonte della stima): regole-ricerca.js la legge cosi alla prima seduta. */
const FRASE_PRIMA_ESPOSIZIONE = 'Oggi si parte leggeri apposta: non è un test. L’obiettivo è finire con 3-4 ripetizioni in più';
const FRASE_PARTENZA_BASSA = 'Partenza bassa voluta: impari il movimento, poi si sale in fretta';
const FRASI_FONTE_STIMA = {
  smm: 'Carico di partenza stimato dalla tua massa muscolare e dal tuo livello: prudente, si regola nelle prime sedute',
  ffm: 'Carico di partenza stimato dalla tua massa magra e dal tuo livello: prudente, si regola nelle prime sedute',
  peso: 'Carico di partenza stimato dal tuo peso e dal tuo livello: meno preciso senza la BIA, si regola nelle prime sedute',
  storico: 'Carico di partenza stimato da quello che sollevi negli altri esercizi: si regola nelle prime sedute',
  tipico: 'Carico di partenza prudente per chi inizia: non conosco il tuo peso, si regola nelle prime sedute'
};
const MOTIVI_STIMA = {};
Object.keys(FRASI_FONTE_STIMA).forEach(f => {
  MOTIVI_STIMA[f] = FRASE_PRIMA_ESPOSIZIONE + ' • ' + FRASI_FONTE_STIMA[f];
  MOTIVI_STIMA[f + 'Bassa'] = FRASE_PARTENZA_BASSA + ' • ' + FRASE_PRIMA_ESPOSIZIONE;
});
const NOTE_PROGRAMMA_STIMA = {
  smm: 'Carichi di partenza stimati dalla tua massa muscolare, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
  ffm: 'Carichi di partenza stimati dalla tua massa magra, dal livello e dall’età: prudenti, si regolano nelle prime sedute.',
  peso: 'Carichi di partenza stimati dal tuo peso, dal livello e dall’età: senza la BIA sono meno precisi, si regolano nelle prime sedute.',
  storico: 'Carichi di partenza stimati da quello che sollevi già: si regolano nelle prime sedute.',
  tipico: 'Carichi di partenza prudenti per chi inizia: non conosco il tuo peso, si regolano nelle prime sedute.'
};
const NOTA_PARTENZA_BASSA = 'Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento, poi il coach sale in fretta.';
const NOTA_BARRA_VUOTA = 'Per ora basta il bilanciere vuoto: poche ripetizioni, tecnica pulita';
const NOTA_SENZA_BARRA = 'Il bilanciere vuoto pesa 20 kg: per iniziare lo stesso movimento con i manubri o con la macchina';
/* PAR-09: la voce del dizionario e «... a #-# ripetizioni pulite» (i numeri vengono da soglie-partenza.js, corpoLiberoPulite) */
const notaCorpoLiberoFacile = () => 'Versione facilitata per partire: si passa alla completa a ' + sogliaPartenza('corpoLiberoPulite').join('-') + ' ripetizioni pulite';

/* una soglia di soglie-partenza.js (si legge solo a esecuzione) */
function sogliaPartenza(nome) { return SOGLIE_PARTENZA[nome].v; }
/* la fonte senza il suffisso «Bassa» (PAR-06): 'pesoBassa' -> 'peso' */
function fonteBase(f) { return String(f || '').replace(/Bassa$/, ''); }

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
  /* PAR-01 (D-P12): il livello mancante conta come principiante nelle stime di carico (prima «intermedio», ×1,3) */
  const livello = d.level || prof.level || 'principiante';
  /* PAR-06: chi parte basso (soglie-partenza.js, chiParteBasso): le donne fino all intermedio, se la regola e accesa */
  const chi = sogliaPartenza('chiParteBasso');
  const partenzaBassa = donna && regolaAttiva('PAR-06') && chi.livelli.indexOf(livello) !== -1;
  let massa = null, massaPeso = null;
  if (partenzaBassa && peso && peso >= 35 && peso <= 200) massaPeso = { v: peso * P.fracMagra.F, rif: P.rifFfm };   /* il riferimento dal solo peso: la BIA lo sposta al massimo del ±15% */
  if (smm && smm >= 10 && smm <= 70) massa = { v: smm, rif: P.rifSmm, tipo: 'smm' };
  else if (ffm && ffm >= 25 && ffm <= 110) massa = { v: ffm, rif: P.rifFfm, tipo: 'ffm' };
  else if (peso && fm && fm > 3 && fm < 60) massa = { v: peso * (1 - fm / 100), rif: P.rifFfm, tipo: 'ffm' };
  else if (peso && peso >= 35 && peso <= 200) massa = { v: peso * P.fracMagra[donna ? 'F' : 'M'], rif: P.rifFfm, tipo: 'peso' };
  else if (partenzaBassa) massa = { v: sogliaPartenza('pesoDonnaSenzaDati') * P.fracMagra.F, rif: P.rifFfm, tipo: 'tipico' };   /* nessun peso: la donna di riferimento, non l uomo di 75 kg */
  return { massa: massa, massaPeso: massaPeso, donna: donna, partenzaBassa: partenzaBassa, eta: Number(d.age || prof.age) || 0, livello: livello,
    cauto: !!(d.parq === 'si' || d.parq === true || prof.parq) };
}
/* PAR-06: il fattore di partenza bassa di un esercizio (1 = nessuno): per livello, distretto (alto = tutto tranne gambe e glutei) e tipo (multiarticolare o isolamento).
   Core, tempi e corpo libero (classe F degli attributi) non hanno fattore. */
function classePartenza(m) {
  const a = typeof attributi === 'function' ? attributi(m.name) : null;
  if ((a && a.classe === 'F') || m.group === 'core') return null;
  if (m.type === 'isolation') return 'iso';
  return (m.group === 'gambe' || m.group === 'glutei') ? 'basso' : 'alto';
}
function fattorePartenza(m, ctx) {
  if (!ctx || !ctx.partenzaBassa) return 1;
  const cl = classePartenza(m);
  const t = cl ? sogliaPartenza('fattoreDonne')[ctx.livello] : null;
  return t ? t[cl] : 1;
}
/* fattore dal corpo per un esercizio (1 = come la libreria) */
function scalaDaCorpo(m, ctx) {
  if (!ctx || !ctx.massa) return null;
  const P = PARAM_PARTENZA;
  let k = ctx.massa.v / ctx.massa.rif;
  /* PAR-01 (DON-01): con il fattore di partenza bassa la BIA e una bandiera di prudenza, non il motore: la massa si sposta al massimo del ±15% rispetto a quella dal peso */
  if (ctx.partenzaBassa && ctx.massaPeso && ctx.massa.tipo !== 'peso') {
    const kp = ctx.massaPeso.v / ctx.massaPeso.rif, e = sogliaPartenza('biaEntro');
    k = Math.max(kp * (1 - e), Math.min(kp * (1 + e), k));
  }
  k *= P.livello[ctx.livello] || 1;
  if (ctx.donna && m.group !== 'gambe' && m.group !== 'glutei') k *= P.sessoParteAlta;
  if (ctx.eta >= 65) k *= 0.85; else if (ctx.eta >= 50) k *= 0.95;
  if (ctx.cauto) k *= P.cauto;
  return k * P.prudenza;
}
/* fattore dallo storico: mediana, sugli esercizi gia fatti, di (massimale stimato / massimale del valore di libreria).
   opz.donne (PAR-07, DON-05): per le donne con il fattore attivo contano solo gli esercizi con la calibrazione chiusa o con RPE medio almeno storicoRpeMinimo
   (con molta riserva il massimale dalle ripetizioni sottostima), e ci sono due mediane, alto e basso, se ci sono abbastanza esercizi per lato. */
function scalaDaStorico(opz) {
  const donne = !!(opz && opz.donne);
  const visti = {}, rapporti = [], alti = [], bassi = [];
  loadHistory().filter(x => x.sessione && !x.interrotta).slice(0, 40).forEach(x => x.sessione.forEach(e => {
    if (visti[e.name]) return;
    const m = findExercise(e.name);
    if (!m || !(Number(m.weight) > 0) || isTimeBased(e.name) || corpoLibero(e.name)) return;
    const rm = e1rmSeduta(e);
    if (!rm) return;
    if (donne && !esercizioAffidabilePerLoStorico(e)) return;
    visti[e.name] = 1;
    const r = rm / (m.weight * (1 + (m.reps || 10) / 30));
    rapporti.push(r);
    (m.group === 'gambe' || m.group === 'glutei' ? bassi : alti).push(r);
  }));
  if (!rapporti.length) return null;
  const mediana = (v) => { v = v.slice().sort((a, b) => a - b); const mid = v.length / 2; return v.length % 2 ? v[(v.length - 1) / 2] : (v[mid - 1] + v[mid]) / 2; };
  const out = { k: mediana(rapporti), n: rapporti.length };
  if (donne) {
    const lato = sogliaPartenza('storicoEserciziPerLato');
    out.alto = alti.length >= lato ? mediana(alti) : null;
    out.basso = bassi.length >= lato ? mediana(bassi) : null;
  }
  return out;
}
/* PAR-07: un esercizio della storia vale per il rapporto delle donne se la sua calibrazione e chiusa o se l RPE medio delle serie fatte e almeno 7 */
function esercizioAffidabilePerLoStorico(e) {
  if (typeof calibrazioneChiusa === 'function' && calibrazioneChiusa(e.name)) return true;
  const rpe = (e.sets || []).filter(s => s.done && Number(s.rpe) > 0).map(s => Number(s.rpe));
  return rpe.length > 0 && rpe.reduce((t, x) => t + x, 0) / rpe.length >= sogliaPartenza('storicoRpeMinimo');
}
/* il fattore dallo storico per questo esercizio: la mediana del suo lato (alto o basso) se c e, altrimenti quella di tutti */
function kStoricoPer(sto, m) {
  const lato = m.group === 'gambe' || m.group === 'glutei' ? sto.basso : sto.alto;
  return lato || sto.k;
}
/* pesi reali: barra da 20 kg, manubri e corpo libero a passi da 1 o 2 kg, macchine e cavi a 2,5 kg.
   verso 'giu' (PAR-04, W2-T8): per difetto, per le stime con lo sconto della partenza bassa (mai un carico sopra quello pensato). */
function arrotondaPartenza(m, x, verso) {
  const att = attrezzoDi(m.name), giu = verso === 'giu';
  const per = (v, passo) => (giu ? Math.floor(v / passo + 1e-9) : Math.round(v / passo)) * passo;
  let p;
  if (att === 'manubri' || att === 'corpo') p = x < 10 ? per(x, 1) : per(x, 2);
  else p = per(x, 2.5);
  if (att === 'bilanciere') p = Math.max(p, Math.min(sogliaPartenza('barraKg'), Number(m.weight) || sogliaPartenza('barraKg')));
  return Math.max(att === 'manubri' || att === 'corpo' ? 1 : 2.5, p);
}
/* il passo reale dell attrezzo vicino a un carico (PAR-04): serve alla calibrazione per salire di almeno un passo */
function passoCarico(m, kg) {
  const att = attrezzoDi(m.name);
  if (att === 'manubri' || att === 'corpo') return kg < 10 ? 1 : 2;
  return 2.5;
}
/* Stima del carico di partenza di un esercizio. Restituisce null se non c e nulla da stimare
   (nessun dato, esercizio a corpo libero o a tempo): allora vale il valore della libreria.
   W2-T8: k = misto(storico, corpo) limitato a [0,45; 1,8], POI il fattore di partenza bassa (PAR-06: il limite non lo annulla), che lo storico personale assorbe
   (PAR-07: fEff = 1 − (1 − fD)(1 − w), w = esercizi in storico / 4) e che non c e per un esercizio con la sua storia. Se e un bilanciere sotto 0,9 × la barra
   (PAR-08) ritorna sottoBarra e il peso della barra vuota: chi chiama decide (variante dello stesso muscolo o barra vuota). */
window.stimaCaricoIniziale = function(nome, ctx) {
  const m = findExercise(nome);
  if (!m || !(Number(m.weight) > 0) || isTimeBased(nome) || corpoLibero(nome)) return null;
  const P = PARAM_PARTENZA;
  const kC = scalaDaCorpo(m, ctx);
  const sto = ctx && ctx.storico !== undefined ? ctx.storico : scalaDaStorico({ donne: !!(ctx && ctx.partenzaBassa) });
  if (kC === null && !sto) return null;
  let k, fonte, w = 0;
  if (sto) {
    w = Math.min(1, sto.n / P.storicoAPieno);
    const ks = kStoricoPer(sto, m);
    k = kC === null ? ks : w * ks + (1 - w) * kC;
    fonte = 'storico';
  } else { k = kC; fonte = ctx.massa.tipo; }
  k = Math.max(P.limiti[0], Math.min(P.limiti[1], k));
  /* PAR-06/07: il fattore, dopo il limite; mai su un carico che viene dalla storia dello stesso esercizio (ultimeSessioni) */
  let fD = fattorePartenza(m, ctx);
  if (fD < 1 && ultimeSessioni(nome, 1).length) fD = 1;
  const fEff = 1 - (1 - fD) * (1 - w);
  const grezzo = m.weight * k * fEff;
  const bassa = fEff < 1;
  const out = { peso: arrotondaPartenza(m, grezzo, bassa ? 'giu' : undefined), k: k, fonte: fonte + (bassa ? 'Bassa' : ''), fD: fD, fEff: fEff };
  out.motivo = MOTIVI_STIMA[out.fonte];
  /* PAR-08: sotto 0,9 × la barra il bilanciere non si propone (solo con lo sconto: gli uomini restano come prima) */
  if (bassa && attrezzoDi(m.name) === 'bilanciere') {
    const barra = Math.min(sogliaPartenza('barraKg'), Number(m.weight) || sogliaPartenza('barraKg'));
    if (grezzo < sogliaPartenza('sottoBarra') * barra) { out.sottoBarra = true; out.barra = barra; out.peso = barra; }
  }
  return out;
};
/* peso con cui parte un esercizio nuovo: la stima (solo col consenso ai dati), altrimenti la libreria.
   Per le sostituzioni (DEC-09, STA-02, macchinario occupato), la seduta libera e l aggiunta dalla libreria: con un bilanciere sotto la barra (PAR-08) il peso e quello
   della barra vuota e il motivo lo dice (la variante con manubri o macchina la propone chi sceglie l esercizio) */
function pesoPartenza(nome, ctx) {
  const m = findExercise(nome);
  const base = m ? Number(m.weight) || 0 : 0;
  if (!base || !coachAttivo()) return { peso: base, stimato: false };
  let s = null;
  try { s = stimaCaricoIniziale(nome, ctx || contestoCarichi({}, getProfile() || {})); } catch (e) {}
  if (!s) return { peso: base, stimato: false };
  const r = { peso: s.peso, stimato: true, fonte: s.fonte, motivo: s.motivo };
  if (s.sottoBarra) { r.sottoBarra = true; r.motivo = NOTA_BARRA_VUOTA + ' • ' + NOTA_SENZA_BARRA; }
  return r;
}

/* PAR-08 a (penalitaPartenza): nella scelta degli esercizi la Bilancia da -3 al bilanciere che per questa persona partirebbe sotto 0,9 × la barra: non e un
   esclusione, vince la variante con manubri o macchina dello stesso muscolo. La legge ricette.js (W2-T6) con typeof; applicaPartenze garantisce lo stesso dopo la scelta.
   x = nome o voce della libreria; brief = il brief del programma (dati grezzi e storico si leggono una volta). 0 senza consenso, senza regola o per un esercizio che non e un bilanciere. */
const _PARTENZA_PER_BRIEF = new WeakMap();
function penalitaPartenza(x, brief) {
  if (!coachAttivo() || !regolaAttiva('PAR-08')) return 0;
  const nome = typeof x === 'string' ? x : (x && x.name);
  if (!nome || attrezzoDi(nome) !== 'bilanciere') return 0;
  let cc = brief && typeof brief === 'object' ? _PARTENZA_PER_BRIEF.get(brief) : null;
  if (!cc) {
    const g = (brief && brief.grezzo) || {};
    cc = contestoCarichi(g.d, g.prof0);
    cc.storico = scalaDaStorico({ donne: cc.partenzaBassa });
    if (brief && typeof brief === 'object') _PARTENZA_PER_BRIEF.set(brief, cc);
  }
  let s = null;
  try { s = stimaCaricoIniziale(nome, cc); } catch (e) {}
  return s && s.sottoBarra ? sogliaPartenza('penalitaBilanciere') : 0;
}

/* PAR-08: la variante senza bilanciere dello stesso muscolo (stesso bersaglio, preferendo lo stesso movimento) con un carico, non troppo tecnica per chi comincia e non gia due volte nel programma */
function varianteSenzaBilanciere(e, sd, sedute, brief) {
  const L = brief.lavoro, principiante = brief.chi && brief.chi.livello === 'principiante';
  const usati = sd.esercizi.map(x => x.name);
  const conta = {}; sedute.forEach(s2 => s2.esercizi.forEach(x => { conta[x.name] = (conta[x.name] || 0) + 1; }));
  const alt = alternativeStessoMuscolo(e.name, L.prefs, usati, { max: 12 }).map(a => a.ex)
    .filter(x => attrezzoDi(x.name) !== 'bilanciere' && Number(x.weight) > 0 && (conta[x.name] || 0) < 2 && (!principiante || typeof livelloAbilita !== 'function' || (livelloAbilita(x.name) || 1) <= 2));
  return alt.length ? alt[0] : null;
}
/* PAR-09: la variante facilitata del corpo libero per le principianti: piegamenti inclinati, trazioni assistite alla macchina o lat machine (stesso muscolo, stesso schema) */
const FACILITATE_PAR09 = [
  { quando: /^(Piegamenti a Terra|Piegamenti a Diamante|Piegamenti Declinati)/i, a: ['Piegamenti Inclinati (Mani Rialzate)'] },
  { quando: /^Trazioni (alla Sbarra|Presa Inversa|Presa Neutra)/i, a: ['Trazioni Assistite (Macchina)', 'Lat Machine'] }
];
function versioneFacilitata(e, sd, brief) {
  const pulito = senzaEmoji(e.name), regola = FACILITATE_PAR09.find(x => x.quando.test(pulito));
  if (!regola) return null;
  for (let i = 0; i < regola.a.length; i++) {
    const m = EXERCISE_LIBRARY.find(x => senzaEmoji(x.name) === regola.a[i]);
    if (m && m.name !== e.name && !sd.esercizi.some(x => x !== e && x.name === m.name) && consentito(m.name, brief.lavoro.prefs)) return m;
  }
  return null;
}

/* applicaPartenze(brief, sedute): il carico di partenza di ogni esercizio del programma nuovo (stadio 15 del generatore, piano B.3): dai dati del corpo (BIA) e, se ci
   sono, dallo storico; senza consenso restano quelli della libreria. Scrive weight, stimato e, se ne ha stimato qualcuno, la nota sulla fonte della stima.
   W2-T8: PAR-06 il fattore di partenza bassa (e.partenzaBassa = { fD, fEff }), PAR-08 il bilanciere sotto la barra (variante o barra vuota), PAR-09 il corpo libero
   facilitato. Per gli uomini e per chi non ha il fattore il risultato e quello di prima. */
function applicaPartenze(brief, sedute) {
  const d = brief.grezzo.d, prof0 = brief.grezzo.prof0, L = brief.lavoro, note = L.note;
  if (coachAttivo()) {
    const cc = contestoCarichi(d, prof0);
    cc.storico = scalaDaStorico({ donne: cc.partenzaBassa });
    const forza = brief.obiettivi && (brief.obiettivi.modalita === 'forza' || (brief.obiettivi.lista || [])[0] === 'forza');
    const graditi = (L.prefs && L.prefs.graditi) || [];
    let stimati = 0, fonteStima = null, basse = false, barraVuota = false, senzaBarra = false, facilitati = false;
    sedute.forEach(sd => sd.esercizi.forEach(e => {
      /* PAR-09: le principianti con il fattore attivo partono dalla versione facilitata di piegamenti e trazioni */
      if (cc.partenzaBassa && cc.livello === 'principiante' && regolaAttiva('PAR-09')) {
        const f = versioneFacilitata(e, sd, brief);
        if (f) { L.sostituzioni.push({ da: e.name, a: f.name }); e.originale = e.name; e.name = f.name; e.weight = f.weight || 0; facilitati = true; }
      }
      let s = stimaCaricoIniziale(e.name, cc);
      if (s && s.sottoBarra) {
        /* PAR-08 b se il bilanciere resta (obiettivo o modalita forza, metodo famoso, gradito); altrimenti a la variante dello stesso muscolo */
        const suaPrescrizione = forza || e.fisso || brief.metodo.attivo;   /* lo schema di forza, il 5x5 fisso (PRG-14) e il metodo famoso hanno la loro prescrizione */
        const resta = suaPrescrizione || graditi.indexOf(e.name) !== -1;
        const v = resta ? null : varianteSenzaBilanciere(e, sd, sedute, brief);
        const sv = v ? stimaCaricoIniziale(v.name, cc) : null;
        if (v && sv && !sv.sottoBarra) {
          L.sostituzioni.push({ da: e.name, a: v.name });
          e.originale = e.name; e.name = v.name; s = sv; senzaBarra = true;
        } else {
          /* la barra vuota e il carico; poche ripetizioni e una serie in meno solo per l esercizio gradito: lo schema di forza (5x5, B34) e il metodo famoso (3x5 di Starting
             Strength, B19) hanno la loro prescrizione, che parte gia da una barra vuota */
          if (!suaPrescrizione) {
            const bv = sogliaPartenza('barraVuota');
            e.reps = Math.max(bv.ripetizioni[0], Math.min(bv.ripetizioni[1], e.reps));
            e.sets = Math.max(2, e.sets - bv.serieInMeno);
          }
          barraVuota = true;
        }
      }
      if (s) {
        e.weight = s.peso; e.stimato = s.fonte; stimati++; fonteStima = fonteStima || fonteBase(s.fonte);
        if (s.fEff < 1) { e.partenzaBassa = { fD: s.fD, fEff: s.fEff }; basse = true; }
      }
    }));
    if (stimati) note.push(NOTE_PROGRAMMA_STIMA[fonteStima]);
    if (basse) note.push(NOTA_PARTENZA_BASSA);
    if (barraVuota) note.push(NOTA_BARRA_VUOTA);
    if (senzaBarra) note.push(NOTA_SENZA_BARRA);
    if (facilitati) note.push(notaCorpoLiberoFacile());
  }
  return sedute;
}
