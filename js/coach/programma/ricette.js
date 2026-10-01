/* Variazione del coach: ricette a slot e buildProgram
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VARIAZIONE DEL COACH: ricette a slot
   Ogni tipo di giorno e una lista di posti in ordine di priorita.
   Per ogni posto il coach sceglie tra tutti gli esercizi adatti
   (schema, attrezzi, fastidi, graditi, allungamento) con un pizzico
   di variazione guidata da un seme: programmi diversi a ogni ciclo,
   stabili dentro il ciclo. Con l obiettivo forza i fondamentali
   restano fissi (la forza e specifica dello strumento).
   ============================================================ */
function rngDa(seme) {
  let x = 2166136261;
  String(seme).split('').forEach(c => { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; });
  return () => { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
}
const _n = (e) => senzaEmoji(e.name);
const SLOT_DEF = {
  spintaO: e => schemaDi(e.name) === 'spintaO' && e.group === 'petto',   /* i piegamenti a diamante e i dip su panca sono per i tricipiti */
  spintaV: e => schemaDi(e.name) === 'spintaV' || /landmine/i.test(_n(e)),
  tirataO: e => schemaDi(e.name) === 'tirataO' || /rematore alla macchina|rematore con petto|rematore inverso/i.test(_n(e)),
  tirataV: e => schemaDi(e.name) === 'tirataV',
  squat: e => schemaDi(e.name) === 'squat' && e.type === 'compound' && !e.lato,
  unilaterale: e => (e.group === 'gambe' || e.group === 'glutei') && e.type === 'compound' && !!e.lato,
  hinge: e => /stacco|good morning|pull-through/i.test(_n(e)),
  glutSpinta: e => /hip thrust|ponte glutei/i.test(_n(e)),
  isoPetto: e => e.group === 'petto' && e.type !== 'compound',
  isoDeltL: e => /alzate laterali/i.test(_n(e)),
  isoDeltP: e => /face pull|reverse|alzate posteriori|y-raise/i.test(_n(e)),
  isoBic: e => e.group === 'braccia' && /curl/i.test(_n(e)) && !/inverso|zottman/i.test(_n(e)),   /* il curl inverso e per gli avambracci, lo Zottman e un classico: non sono il posto del bicipite */
  isoTri: e => e.group === 'braccia' && /pushdown|french press|estensione tricipiti|kickback tricipiti/i.test(_n(e)),
  isoFem: e => /leg curl|nordic/i.test(_n(e)),
  isoQuad: e => /leg extension/i.test(_n(e)),
  isoPolp: e => /calf raise/i.test(_n(e)),
  core: e => e.group === 'core'
};
/* ricette: le varianti A/B/C cambiano l ordine e alcuni posti */
const RICETTE = {
  push: k => ['spintaO', 'spintaV', 'spintaO2', 'isoDeltL', 'isoTri', 'isoPetto'],
  pull: k => k % 2 ? ['tirataV', 'tirataO', 'hinge', 'isoDeltP', 'isoBic', 'isoBic2'] : ['hinge', 'tirataV', 'tirataO', 'isoDeltP', 'isoBic', 'isoBic2'],
  legs: k => ['squat', 'hinge', 'unilaterale', 'squat2', 'isoFem', 'isoPolp'],
  upper: k => k % 2 ? ['tirataO', 'spintaO', 'tirataV', 'spintaV', 'isoDeltL', 'isoTri', 'isoBic'] : ['spintaO', 'tirataV', 'spintaV', 'tirataO', 'isoBic', 'isoTri', 'isoDeltL'],   /* A: petto, tirata verticale, spalle; B: tirata orizzontale, petto, tirata verticale: in due sedute spinte e tirate pari e il petto sempre 2 volte */
  lower: k => k % 2 ? ['hinge', 'unilaterale', 'squat', 'glutSpinta', 'isoQuad', 'isoPolp'] : ['squat', 'hinge', 'unilaterale', 'glutSpinta', 'isoFem', 'isoPolp'],
  /* sedute dell epoca d oro (Arnold, Mentzer): petto e schiena in coppia, poi spalle e braccia */
  'petto-schiena': k => ['spintaO', 'tirataV', 'spintaO2', 'tirataO', 'isoPetto', 'hinge'],
  'spalle-braccia': k => ['spintaV', 'isoDeltL', 'isoBic', 'isoTri', 'isoDeltP', 'isoBic2'],
  /* nei full body spinte e tirate si alternano anche quando la seduta e corta (ABB-04): tagliando a 4-5 posti restano pari */
  fullbody: k => [['squat', 'spintaO', 'tirataV', 'hinge', 'tirataO', 'spintaV', 'core'], ['hinge', 'spintaV', 'tirataO', 'squat', 'spintaO', 'tirataV', 'core'], ['unilaterale', 'spintaO', 'tirataO', 'glutSpinta', 'tirataV', 'spintaV', 'core']][k % 3]
};
/* preferenze di base (classifiche degli esperti e rapporto stimolo/fatica) */
const PRIORI = {
  'Panca Piana Bilanciere': 3, 'Panca Inclinata Manubri': 2.5, 'Chest Press Machine': 2.5, 'Panca Piana Manubri': 2.5, 'Panca Inclinata Bilanciere': 2,
  'Military Press': 2.5, 'Shoulder Press Machine': 2.5, 'Lento Avanti Manubri': 2, 'Landmine Press': 1.5,
  'Lat Machine': 3, 'Trazioni alla Sbarra (Pull-ups)': 2.5, 'Lat Machine a un Braccio': 2.5, 'Trazioni Assistite (Macchina)': 2,
  'Rematore con Petto Appoggiato': 3, 'Rematore alla Macchina': 2.5, 'Pulley Basso': 2.5, 'Rematore con Bilanciere': 2, 'Rematore con Manubrio': 2,
  'Squat con Bilanciere': 3, 'Hack Squat': 3, 'Pendulum Squat': 2.5, 'Leg Press': 2.5, 'Squat al Multipower': 2, 'Front Squat': 1.5, 'Goblet Squat': 1.5,
  'Stacco Rumeno': 3, 'Stacco da Terra (Deadlift)': 2.5, 'Stacco con Trap Bar': 2.5, 'Pull-Through ai Cavi': 1.5,
  'Affondi Bulgari': 3, 'Affondi in Camminata': 2.5, 'Affondi Inversi': 2, 'Affondi al Multipower (Piede Rialzato)': 2,
  'Hip Thrust': 3, 'Hip Thrust alla Macchina': 2.5,
  'Leg Curl Seduto': 3, 'Nordic Curl': 1.5, 'Leg Extension': 2.5,
  'Alzate Laterali ai Cavi': 3, 'Alzate Laterali': 2.5, 'Reverse Pec Deck': 3, 'Face Pull': 2.5,
  'Curl Bayesiano ai Cavi': 3, 'Curl su Panca Inclinata': 2.5, 'Curl su Panca Scott': 2.5, 'Curl Bilanciere Bicipiti': 2,
  'Estensione Tricipiti sopra la Testa ai Cavi': 3, 'Pushdown con Corda': 2.5, 'Estensione Tricipiti sopra la Testa con Manubrio': 2.5,
  'Croci ai Cavi da Seduto': 3, 'Pectoral Machine (Butterfly)': 2.5, 'Croci ai Cavi dal Basso': 2,
  'Calf Raise in Piedi': 2.5, 'Calf Raise Seduto': 2, 'Calf Raise alla Leg Press': 2,
  'Plank': 2, 'Pallof Press': 2, 'Dead Bug': 2, 'Crunch al Cavo': 2
};
window.buildProgram = function(d) {
  const prof0 = (typeof getProfile === 'function' && d !== undefined && d.usaProfilo !== false && d === onbData) ? (getProfile() || {}) : {};
  const goals = (d.goals && d.goals.length) ? d.goals.slice(0, 3) : [d.goal || 'salute'];
  const scheme = schemaMisto(goals);
  const level = d.level || 'intermedio';
  const eta = Number(d.age) || 0;
  const over65 = eta >= 65;
  const donna = d.sex === 'F' || d.sex === 'donna';
  const freqScelta = ['1', '2', '3'].indexOf(String(d.freq || prof0.freq || '')) !== -1 ? String(d.freq || prof0.freq) : null;
  let split = splitPerFrequenza(level, d.days, freqScelta);
  let nEs = exerciseCountFor(d.minutes, scheme);
  const struttura = strutturaProgramma(level);
  const prefs = { luogo: d.luogo || 'palestra', fastidi: (d.fastidi || []).filter(f => f !== 'nessuno'), sonno: d.sonno || 'bene', attrezzi: d.attrezzi || 'indifferente',
    attrezziPalestra: d.attrezziPalestra !== undefined ? d.attrezziPalestra : (prof0.attrezziPalestra || null), graditi: d.graditi || prof0.graditi || [], odiati: d.odiati || prof0.odiati || [],
    priorita: (d.priorita || prof0.priorita || []).slice(0, 3) };
  const sostituzioni = [];
  const note = [];
  const poco = (Number(d.minutes) || 60) <= 45;
  /* chi ha davanti: le risposte psicologiche cambiano come si usano le regole */
  const ps = psicoCoach(d.psico || prof0.psico);
  if (ps.fiduciaBassa && level === 'principiante' && nEs > 3) nEs--;
  /* il coach compone: fattore fisico (BIA, dati) + psicologico + momento di vita */
  const fis = fattoreFisico(d, prof0);
  const scelta = d.metodo !== undefined ? { primo: d.metodo && metodoDa(d.metodo) ? { m: metodoDa(d.metodo), perche: [] } : null, secondo: null } : sceltaMetodo(d, prof0, ps, fis, level, over65);
  const metodo = scelta.primo ? scelta.primo.m : null;
  const metodoAttivo = metodo && metodo.applicabile && metodo.id !== 'coach' ? metodo : null;
  const ispirazioni = [];
  if (metodoAttivo) {
    if (metodoAttivo.split && !freqScelta) split = metodoAttivo.split(d.days);
    if (metodoAttivo.nEs) nEs = metodoAttivo.nEs(nEs);
    if (metodoAttivo.luogo) prefs.luogo = metodoAttivo.luogo;
    ispirazioni.push({ id: metodoAttivo.id, ruolo: 'struttura', perche: scelta.primo.perche || [] });
  } else ispirazioni.push({ id: 'coach', ruolo: 'struttura', perche: [] });
  const tocco = scelta.secondo && TOCCHI[scelta.secondo.m.tocco] ? scelta.secondo : null;
  if (tocco) ispirazioni.push({ id: tocco.m.id, ruolo: 'dettaglio', dettaglio: TOCCHI[tocco.m.tocco].testo, perche: (tocco.perche || []).filter(t => !/giorni a settimana/.test(t)) });
  const testFisici = d.test || prof0.test || {};
  const fattoreVarieta = metodoAttivo ? Math.min(ps.varieta, metodoAttivo.varieta) || (d.variante ? 0.5 : 0) : (ps.varieta || (d.variante ? 0.5 : 0));   /* routine: stessi esercizi, salvo chi chiede un altra variante */

  const mappaGiorni = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 3, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
  const indiciGiorni = mappaGiorni[d.days] || [0, 2, 4];
  const visti = {};

  /* variazione: ogni programma (e ogni ciclo) esce diverso, ma e ripetibile col suo seme */
  const seme = d.seme !== undefined ? d.seme : [ymd(new Date()), level, d.days, goals.join('+'), (d.cicli || prof0.cicli || 0), (d.variante || 0)].join('|');
  const rng = rngDa(seme);
  const occ = {}, usatiSett = {};
  const cauto = over65 || d.parq === 'si' || d.parq === true;
  /* 3 giorni con upper e lower una volta sola: il full body fa da giorno leggero per entrambi (forza + ipertrofia, ogni muscolo 2 volte) */
  const ulUnico = split.giorni.filter(g => g === 'upper').length === 1 && split.giorni.filter(g => g === 'lower').length === 1;
  let schienaPrima = null;   /* ABB-07: la seduta del giorno prima aveva un carico pesante sulla schiena? */
  const sedute = split.giorni.slice(0, d.days).map((tplId, i) => {
    const tpl = WORKOUT_TEMPLATES.find(t => t.id === tplId);
    const usati = [];
    const base = [];
    let pesantiSchiena = 0;
    const vietaSchiena = !!(schienaPrima && !metodoAttivo && indiciGiorni[i] - schienaPrima.idx === 1 && schienaPrima.pesa);
    let schienaQui = false;
    /* PHUL: all intermedio con upper/lower la prima volta e forza, la seconda ipertrofia */
    const tipoGiorno = ((level === 'intermedio' && !metodoAttivo) || (metodoAttivo && metodoAttivo.phul)) && (tplId === 'upper' || tplId === 'lower') ? (visti[tplId] ? 'ipertrofia' : 'forza')
      : (level === 'intermedio' && !metodoAttivo && tplId === 'fullbody' && ulUnico ? 'ipertrofia' : null);
    visti[tplId] = true;
    /* ricetta a slot: per ogni posto il coach sceglie tra tutti gli esercizi adatti */
    const RIC = (metodoAttivo && metodoAttivo.ricette && metodoAttivo.ricette[tplId]) ? metodoAttivo.ricette : RICETTE;
    const ricetta = tplId === 'punti' ? ricettaPunti(prefs.priorita) : (RIC[tplId] ? RIC[tplId](occ[tplId] || 0) : []);
    occ[tplId] = (occ[tplId] || 0) + 1;
    ricetta.forEach((slot, pos) => {
      if (base.length >= nEs) return;
      const def = SLOT_DEF[slot.replace(/\d$/, '')];
      if (!def) return;
      const tutti = EXERCISE_LIBRARY.filter(x => def(x) && !base.some(y => y.name === x.name));
      if (!tutti.length) return;
      const pesante = (pos === 0 || (metodoAttivo && metodoAttivo.pesanti)) && !cauto && !(metodoAttivo && metodoAttivo.leggeri);   /* leggeri: Gironda, 8x8 con macchine e pesi moderati */
      const fisso = pesante && goals[0] === 'forza';
      const prio = (x) => (PRIORI[x.name.replace(EMOJI_TESTA, '')] || 0) + (pesante && tipoCarico(x.name) === 'pesante' ? 3 : 0) - (cauto && tipoCarico(x.name) === 'pesante' ? 3 : 0);
      const migliore = tutti.slice().sort((x, y) => prio(y) - prio(x))[0];
      const ok = tutti.filter(x => consentito(x.name, prefs) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1) && !(metodoAttivo && metodoAttivo.leggeri && tipoCarico(x.name) === 'pesante'));
      if (!ok.length) return;
      const punteggio = (x) => {
        let v = prio(x) + bonusBiomecc(x, slot.replace(/\d$/, ''), testFisici, prefs.fastidi);
        if ((prefs.graditi || []).indexOf(x.name) !== -1) v += 3;
        if (inAllungamento(x.name)) v += 1.5;
        if (usatiSett[x.name] && !(metodoAttivo && metodoAttivo.ripeti)) v -= level === 'principiante' ? 1 : 4;   /* varieta tra i giorni (ripeti: i metodi con la stessa seduta ogni volta) */
        if (!fisso) v += rng() * (level === 'principiante' ? 1 : 2.5) * fattoreVarieta;    /* la variazione del coach, dosata sul gusto */
        if (ps.disagio && !fisso && attrezzoDi(senzaEmoji(x.name)) === 'bilanciere') v -= 2;   /* a disagio: meno bilanciere, meno postazioni */
        if (strRidondante(x, base)) v -= 4;   /* ABB-02: non due esercizi che fanno lo stesso lavoro */
        if (vietaSchiena && strSchiena(x.name)) v -= 5;   /* ABB-07: due giorni di fila, schiena pesante una volta sola */
        return v;
      };
      const scelta = ok.slice().sort((x, y) => punteggio(y) - punteggio(x))[0];
      if (migliore && scelta.name !== migliore.name && !consentito(migliore.name, prefs)) sostituzioni.push({ da: migliore.name, a: scelta.name });
      if (SCHIENA_PESANTE.test(scelta.name)) pesantiSchiena++;
      if (strSchiena(scelta.name)) schienaQui = true;
      usatiSett[scelta.name] = 1;
      base.push({ name: scelta.name, weight: scelta.weight || 0 });
    });
    /* allungamento dove e provato (le varianti restano in scheda se non disponibili) */
    base.forEach(e => {
      const sc = scambiAllungamento().find(x => senzaEmoji(e.name) === x[0]);
      if (!sc) return;
      const alt = nomeInLibreria(sc[1]);
      if (alt && consentito(alt, prefs) && !base.some(y => y.name === alt)) { e.name = alt; e.weight = (findExercise(alt) || {}).weight || e.weight; }
    });
    /* ABB-01: fondamentale, poi macchine, poi isolamenti, il core in fondo (i metodi famosi hanno il loro ordine) */
    if (!metodoAttivo) strOrdina(base, tplId, prefs.priorita);
    schienaPrima = { idx: indiciGiorni[i], pesa: schienaQui };

    let primoComp = true;
    return {
      giorno: DAYS[indiciGiorni[i]],
      tipo: tplId,
      titolo: tplId === 'punti' ? 'Punti deboli' : (tpl ? tpl.title.split(' — ')[0] : 'Seduta ' + (i + 1)) + (tipoGiorno ? ' ' + tipoGiorno : ''),
      esercizi: base.map(e => {
        const meta = findExercise(e.name);
        const isComp = meta && meta.type === 'compound';
        const tipo = tipoCarico(e.name);
        let sets = scheme.sets, reps = scheme.reps;
        let rest = tipo === 'pesante' ? scheme.restCompound : (tipo === 'macchina' ? Math.max(90, Math.round(scheme.restCompound * 0.75)) : Math.max(60, scheme.restIso));
        /* ripetizioni per tipo di esercizio: fondamentali 5-8, macchine 8-12, isolamenti 10-20 */
        const forzaQui = goals[0] === 'forza' || tipoGiorno === 'forza';
        if (tipo === 'pesante') reps = forzaQui ? 5 : Math.min(reps, 8);
        else if (tipo === 'macchina') { reps = forzaQui ? 8 : Math.max(8, reps); if (goals[0] === 'forza') sets = Math.min(sets, 4); }
        else { reps = Math.max(10, reps); if (goals[0] === 'forza') sets = Math.min(sets, 3); }
        let fisso = false;
        if (isComp && primoComp && scheme.forzaSulPrimo && !over65) { sets = 5; reps = 5; rest = 180; fisso = true; }
        if (goals[0] === 'forza' && level !== 'principiante' && tipo === 'pesante' && !over65 && !(d.parq === 'si' || d.parq === true) && !metodoAttivo) { sets = 6; reps = 3; rest = 180; }
        if (tipoGiorno === 'forza' && tipo === 'pesante') { sets = 4; rest = Math.max(rest, 180); }
        if (tipoGiorno === 'ipertrofia') { reps = tipo === 'pesante' ? 8 : (isComp ? 10 : 12); }
        if (isComp) primoComp = false;
        if (!isComp && scheme.isoMassa) { sets = 3; reps = 12; }
        sets = Math.min(sets, scheme.tettoSerie);
        if (level === 'principiante') sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente);   /* 2-3 serie impegnative (Barbell Medicine) */
        if (over65) { sets = Math.min(sets, COACH_PARAMETRI.serieMaxPrudente); reps = Math.max(8, Math.min(12, reps)); }
        if ((d.parq === 'si' || d.parq === true) && isComp) reps = Math.max(8, Math.min(12, reps));   /* pressione: 60-80%, niente apnea (ACSM) */
        if (donna) rest = Math.max(60, Math.round(rest * 0.85));   /* recupero piu rapido tra le serie (PeerJ 2025) */
        if (isTimeBased(e.name)) reps = meta ? meta.reps : 30;
        rest = Math.round(rest / 15) * 15;
        return { name: e.name, sets: sets, reps: reps, weight: e.weight, rest: rest, fisso: fisso || undefined };
      })
    };
  });

  /* schemi di movimento mancanti nella settimana: si aggiungono dove c e posto */
  const presenti = {};
  sedute.forEach(sd => sd.esercizi.forEach(e => { const k = schemaDi(e.name); if (k) presenti[k] = 1; }));
  SCHEMI_MOV.forEach(([k, rx, etichetta]) => {
    if (presenti[k] || (metodoAttivo && metodoAttivo.essenziale)) return;
    const cauto = over65 || d.parq === 'si' || d.parq === true || level === 'principiante';
    const cand = EXERCISE_LIBRARY.filter(x => rx.test(senzaEmoji(x.name)) && consentito(x.name, prefs))
      .sort((a, b) => cauto ? (tipoCarico(a.name) === 'pesante') - (tipoCarico(b.name) === 'pesante') : 0);
    if (!cand.length) return;
    const adatta = (sd) => /spinta|tirata/.test(k) ? /upper|push|pull|fullbody/.test(sd.tipo) : /lower|legs|fullbody/.test(sd.tipo);
    const dove = sedute.filter(adatta).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || sedute.slice().sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!dove) return;
    const ex = cand.find(x => !dove.esercizi.some(y => y.name === x.name)) || cand[0];
    const tipo = tipoCarico(ex.name);
    dove.esercizi.push({ name: ex.name, sets: Math.min(scheme.sets, 3), reps: tipo === 'pesante' ? Math.min(scheme.reps, 8) : Math.max(8, scheme.reps), weight: ex.weight || 0,
      rest: tipo === 'pesante' ? scheme.restCompound : Math.max(90, Math.round(scheme.restCompound * 0.75)) });
    presenti[k] = 1;
    note.push('Aggiunto: ' + senzaEmoji(ex.name) + ' \u2014 ogni settimana servono tutti e sei gli schemi di movimento.');
  });

  /* obiettivo glutei: le quattro famiglie */
  if (goals.indexOf('glutei') !== -1) {
    GLUTEI_FAMIGLIE.forEach(([k, rx, predef]) => {
      if (sedute.some(sd => sd.esercizi.some(e => rx.test(senzaEmoji(e.name)) && findExercise(e.name) && ['glutei', 'gambe'].indexOf(findExercise(e.name).group) !== -1))) return;
      const nome = nomeInLibreria(predef);
      if (!nome || !consentito(nome, prefs)) return;
      const dove = sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || sedute[0];
      if (dove) dove.esercizi.push({ name: nome, sets: 3, reps: 12, weight: (findExercise(nome) || {}).weight || 0, rest: 75 });
    });
    note.push('Glutei: spinta d anca, squat o affondi, stacchi e abduzioni ogni settimana.');
  }

  /* copertura per regioni (Schoenfeld, Maeo, Pedrosa): femorali in flessione di ginocchio,
     retto femorale con la leg extension, bicipite prossimale e distale, deltoide laterale */
  const settimanaNomi = () => [].concat.apply([], sedute.map(sd => sd.esercizi.map(e => senzaEmoji(e.name))));
  const aggiungiRegione = (rx, nomi, dove, testo) => {
    if (settimanaNomi().some(n => rx.test(n))) return;
    const nome = nomi.map(nomeInLibreria).find(n => n && consentito(n, prefs));
    if (!nome) return;
    const sd = sedute.filter(dove).sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!sd || sd.esercizi.length > nEs) return;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: 2, reps: m.reps && m.reps > 8 ? m.reps : 12, weight: m.weight || 0, rest: 75 });
    note.push(testo);
  };
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  const regioni = !(metodoAttivo && metodoAttivo.essenziale) && d.days >= 3 && goals[0] !== 'salute';
  if (regioni && conGambe) {
    aggiungiRegione(/leg curl|nordic/i, ['Leg Curl Seduto', 'Leg Curl Sdraiato', 'Nordic Curl'], sd => /lower|legs|fullbody/.test(sd.tipo),
      'Femorali: squat e hip thrust non li fanno crescere, serve la flessione del ginocchio (leg curl).');
    if (goals.indexOf('massa') !== -1 || goals.indexOf('glutei') !== -1) aggiungiRegione(/leg extension/i, ['Leg Extension'], sd => /lower|legs|fullbody/.test(sd.tipo),
      'Retto femorale: cresce solo con la leg extension, schienale un po’ reclinato.');
  }
  if (regioni && (goals.indexOf('massa') !== -1 || goals.indexOf('ricomposizione') !== -1)) {
    if (settimanaNomi().some(n => /panca|chest press|piegamenti/i.test(n)))
      aggiungiRegione(/alzate laterali/i, ['Alzate Laterali ai Cavi', 'Alzate Laterali'], sd => /upper|push|fullbody/.test(sd.tipo),
        'Spalle larghe: la panca copre il deltoide anteriore, le alzate laterali quello laterale.');
    /* bicipite: panca inclinata = parte alta, Scott/spider = parte bassa (Pedrosa 2025) */
    const curl = [];
    sedute.forEach(sd => sd.esercizi.forEach(e => { if (/curl/i.test(senzaEmoji(e.name)) && (findExercise(e.name) || {}).group === 'braccia' && !/leg curl|nordic/i.test(e.name)) curl.push(e); }));
    if (curl.length >= 2 && !curl.some(e => /scott|spider|concentrazione/i.test(senzaEmoji(e.name)))) {
      const nuovo = ['Curl su Panca Scott', 'Spider Curl'].map(nomeInLibreria).find(n => n && consentito(n, prefs) && !settimanaNomi().some(x => x === senzaEmoji(n)));
      if (nuovo) { const e = curl[curl.length - 1]; e.name = nuovo; e.weight = (findExercise(nuovo) || {}).weight || e.weight; note.push('Bicipite: un curl su panca inclinata e uno alla Scott per crescere in tutta la lunghezza.'); }
    }
  }
  /* ABB-03: ogni settimana nessun buco (polpacci, deltoidi posteriori, core, braccia dirette) */
  strCopri({ sedute: sedute, goals: goals, level: level, days: Number(d.days) || 3, prefs: prefs, nEs: nEs, note: note, metodoAttivo: metodoAttivo });
  (prefs.fastidi || []).forEach(f => { if (SCALE_DOLORE[f]) note.push(SCALE_DOLORE[f]); });

  /* volume per muscolo: partenza per livello, tetto di 11 serie per seduta */
  let [vMin, vMax] = goals[0] === 'salute' ? [6, 12] : (VOLUME_LIVELLO[level] || VOLUME_LIVELLO.intermedio);
  /* fattore fisico: massa magra bassa = piu volume; in calo = meno */
  if (fis.ffmiBasso && goals[0] !== 'dimagrimento') { vMin = Math.round(vMin * COACH_PARAMETRI.fattoreVolumeFfmiBasso); vMax = Math.round(vMax * COACH_PARAMETRI.fattoreVolumeFfmiBasso); }
  if (fis.magraInCalo) { vMin = Math.round(vMin * 0.85); vMax = Math.round(vMax * 0.85); }
  /* esigenza del coach: +20% all inizio, poi segue l andamento (mai oltre il massimo del livello) */
  const moG = typeof momentoAttivo === 'function' ? momentoAttivo() : null;
  const esig = (cauto || (moG && !moG.scaduto && (moG.vol < 1 || moG.rir))) ? 1 :
    (d.esigenza || (prof0.esigenza && prof0.esigenza.valore) || esigenzaIniziale(d, prof0));   /* INT-02: parte dal corpo (BIA) */
  if (esig > 1) { vMin = Math.min(vMax, Math.round(vMin * esig)); if (esig >= 1.15) note.push('Coach esigente: volume verso la parte alta del range, un po’ più vicino al cedimento su macchine e isolamenti.'); }
  else if (esig < 1) { vMin = Math.round(vMin * esig); vMax = Math.round(vMax * esig); }
  /* conteggio frazionario: 1 per il muscolo principale, 0,5 per quelli che aiutano (Pelland 2025) */
  const perGruppo = (g) => sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => {
    const m = findExercise(e.name); if (!m) return a;
    if (m.group === g) return a + e.sets;
    if (m.type === 'compound' && (MUSCLE_GROUPS[m.group].synergists || []).indexOf(g) !== -1) return a + e.sets * 0.5;
    return a;
  }, 0), 0);
  const prio = prefs.priorita;
  const specializza = level === 'avanzato' && prio.length && goals[0] !== 'dimagrimento';
  GRUPPI_PRINCIPALI.forEach(g => {
    const es = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => (findExercise(e.name) || {}).group === g && !isTimeBased(e.name))));
    if (!es.length) return;
    let min = vMin, max = vMax;
    if (prio.indexOf(g) !== -1) { min = Math.round(vMin * (specializza ? 1.5 : 1.2)); max = Math.round(vMax * (specializza ? 1.5 : 1.2)); }
    else if (specializza) { min = 6; max = vMin; }
    let giri = 0;
    while (perGruppo(g) < min && giri++ < 20) { const e = es.filter(x => !x.fisso).sort((a, b) => a.sets - b.sets)[0]; if (!e || e.sets >= 5) break; e.sets++; }
    giri = 0;
    while (perGruppo(g) > max && giri++ < 20) {
      const e = es.filter(x => !x.fisso && ((findExercise(x.name) || {}).type !== 'compound' || es.every(y => (findExercise(y.name) || {}).type === 'compound'))).sort((a, b) => b.sets - a.sets)[0];
      if (!e || e.sets <= 2) break; e.sets--;
    }
  });
  sedute.forEach(sd => {
    const conta = {};
    sd.esercizi.forEach(e => { const g = (findExercise(e.name) || {}).group; if (g) conta[g] = (conta[g] || 0) + e.sets; });
    Object.keys(conta).forEach(g => {
      let giri = 0;
      while (conta[g] > COACH_PARAMETRI.serieMaxMuscoloSeduta && giri++ < 20) {
        const e = sd.esercizi.filter(x => (findExercise(x.name) || {}).group === g && x.sets > 2 && !x.fisso).sort((a, b) => b.sets - a.sets)[0];
        if (!e) break; e.sets--; conta[g]--;
      }
    });
  });
  /* ABB-04 e ABB-08: tirate non meno delle spinte, il fondamentale non ha meno serie degli altri */
  strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs });
  if (prio.length) note.push((specializza ? 'Specializzazione: ' : 'Priorita: ') + prio.map(g => MUSCLE_GROUPS[g] ? MUSCLE_GROUPS[g].label : g).join(', ') + (specializza ? ' \u2014 +50% serie, gli altri gruppi a mantenimento.' : ' \u2014 qualche serie in piu.'));
  if (freqScelta) note.push(split.limite ? 'Con 2 giorni ogni muscolo si allena al massimo 2 volte a settimana.' :
    (split.freq === 1 ? 'Ogni muscolo una volta a settimana, come hai scelto: fino a 11 serie in una seduta, oltre si sprecano.' : 'Ogni muscolo ' + split.freq + ' volte a settimana, come hai scelto.'));

  /* principianti e over 65: mai piu di 3 serie per esercizio */
  if (level === 'principiante' || over65) sedute.forEach(sd => sd.esercizi.forEach(e => { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); }));
  /* poco sonno o molto stress: una serie in meno sugli accessori (dopo il volume) */
  if (prefs.sonno === 'male') sedute.forEach(sd => sd.esercizi.forEach((e, i) => { if (i > 0 && !e.fisso) e.sets = Math.max(2, e.sets - 1); }));
  /* la seduta deve stare nei minuti dichiarati */
  const minutiDi = (sd) => 8 + sd.esercizi.reduce((t, e) => t + e.sets * (35 + e.rest) / 60, 0);
  sedute.forEach(sd => {
    let giri = 0;
    while (minutiDi(sd) > (Number(d.minutes) || 60) + 5 && giri++ < 40) {
      const isPrio = (e) => prio.indexOf((findExercise(e.name) || {}).group) !== -1;
      const cand = sd.esercizi.filter(e => e.sets > 2 && !e.fisso).sort((a, b) => isPrio(a) - isPrio(b) || ((findExercise(a.name) || {}).type === 'compound') - ((findExercise(b.name) || {}).type === 'compound') || b.sets - a.sets)[0];
      if (cand) { cand.sets--; continue; }
      const iso = sd.esercizi.filter(e => (findExercise(e.name) || {}).type !== 'compound' && !e.protetto);
      if (iso.length && sd.esercizi.length > 3) { sd.esercizi.splice(sd.esercizi.lastIndexOf(iso[iso.length - 1]), 1); continue; }
      break;
    }
  });

  /* ABB-08 e ABB-09: a tempo sistemato, il fondamentale ha le sue serie e gli stacchi da terra restano a 3 al massimo */
  strFinale({ sedute: sedute, level: level, over65: over65, metodoAttivo: metodoAttivo });
  strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs }, true);   /* il tempo e le serie spostate possono aver rotto l equilibrio: niente serie in piu */
  /* tecniche: poco tempo = superserie e drop set; over 65 = potenza ed equilibrio;
     avanzati = serie AMRAP e back-off sui fondamentali */
  sedute.forEach(sd => {
    const es = sd.esercizi;
    if (poco && !metodoAttivo) {   /* con un metodo famoso decide il metodo (coppie, tecniche) */
      strSuperserie(sd);   /* ABB-06: solo antagonisti, mai con un fondamentale pesante */
      const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !isTimeBased(e.name));
      const leggeri = iso.length ? iso : es.filter(e => tipoCarico(e.name) === 'macchina' && !e.tecnica);
      if (leggeri.length && ps.intensita !== 'bassa') leggeri[leggeri.length - 1].tecnica = 'drop';
    }
    const primo = es.find(e => (findExercise(e.name) || {}).type === 'compound');
    if (over65 && primo) primo.tecnica = 'potenza';
    else if (d.parq === 'si' || d.parq === true || over65) es.forEach(e => { if (tipoCarico(e.name) === 'pesante') e.tecnica = 'cluster'; });
    else if (level !== 'principiante' && primo && tipoCarico(primo.name) === 'pesante' && ps.intensita !== 'bassa') primo.tecnica = level === 'avanzato' ? 'backoff' : 'amrap';
    if ((level === 'avanzato' || (level === 'intermedio' && ps.intensita === 'alta')) && !poco && ps.intensita !== 'bassa') { const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !isTimeBased(e.name) && !e.tecnica); if (iso.length) iso[iso.length - 1].tecnica = 'parziali'; }
  });
  /* il metodo scelto decide serie, ripetizioni e pause */
  if (metodoAttivo && metodoAttivo.schema) sedute.forEach(sd => sd.esercizi.forEach((e, i) => { delete e.tecnica; metodoAttivo.schema(e, i, sd); if (isTimeBased(e.name)) e.reps = (findExercise(e.name) || {}).reps || e.reps; }));
  if (tocco) sedute.forEach(sd => TOCCHI[tocco.m.tocco].fa(sd, ps));
  if (metodoAttivo && metodoAttivo.superserie) sedute.forEach(sd => {
    if (metodoAttivo.id !== 'rr') { strSuperserie(sd); return; }   /* ABB-06; la Recommended Routine ha le sue coppie (trazione + squat, dip + hinge...) */
    const es = sd.esercizi; for (let k = 1; k < es.length; k++) { if (!es[k - 1].superset && !es[k].superset) { es[k].superset = true; k++; } }
  });
  /* regola del picco e della fine: chi non ama la fatica ricorda meglio una seduta che finisce leggera */
  if (ps.intensita === 'bassa') sedute.forEach(sd => { const u = sd.esercizi[sd.esercizi.length - 1]; if (u && !u.fisso && u.sets > 2) u.sets--; });
  ritrattoCoach(ps).slice(0, 4).forEach(r => note.push(r));
  fis.testi.forEach(t => note.push(t));
  if (!cauto) statoBia(d, prof0).testi.forEach(t => note.push(t));   /* INT-01 */
  if (poco && !metodoAttivo) note.push('Poco tempo: spinte e tirate in superserie (-37% di tempo, stessi risultati) e drop set sull ultimo isolamento.');
  if (over65) note.push('Dai 65 anni: 2-3 serie da 8-12, niente cedimento, il primo esercizio veloce in salita per la potenza e 5 minuti di equilibrio a fine seduta.');
  if (donna) note.push('Pause un po piu corte: le donne recuperano piu in fretta tra una serie e l altra.');
  if (goals[0] === 'dimagrimento' || goals.indexOf('dimagrimento') !== -1) note.push('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo.');

  /* avanzati: mesociclo con RIR che scende settimana dopo settimana */
  const fasi = fasiProgramma(struttura);
  let rirSett = null;
  if (level === 'avanzato') {
    rirSett = [];
    let k = 0;
    fasi.forEach(f => { if (f === 'scarico') { rirSett.push(4); k = 0; } else { const n = struttura.blocco - 1; rirSett.push(Math.max(0, Math.round(3 - 3 * k / Math.max(1, n - 1)))); k++; } });
    note.push('Mesociclo: ripetizioni in riserva 3, 2, 1, 0 nelle settimane di carico, poi scarico.');
  }

  /* esercizi alternativi scelti dall utente: stessi muscoli, stesso posto */
  const scelte = d.scelte || {};
  if (Object.keys(scelte).length) sedute.forEach(sd => sd.esercizi.forEach(e => {
    const n = scelte[e.name], m = n ? findExercise(n) : null;
    if (!m || sd.esercizi.some(x => x !== e && x.name === n)) return;
    e.originale = e.name; e.name = n; e.weight = m.weight || 0;
  }));

  /* carichi di partenza: dai dati del corpo (BIA) e, se ci sono, dallo storico; senza consenso restano quelli della libreria */
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

  sedute.forEach(sd => sd.esercizi.forEach(e => { delete e.protetto; }));   /* ABB-03: serviva solo a non tagliare le aggiunte per il tempo */
  /* carico ridotto richiesto dal metodo (es. 8x8 col 70% del carico delle 8 ripetizioni), dopo la stima dai dati del corpo */
  sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (!e.fattoreCarico) return;
    const m = findExercise(e.name);
    if (m && e.weight > 0) e.weight = arrotondaPartenza(m, e.weight * e.fattoreCarico);
    delete e.fattoreCarico;
  }));

  return {
    goals: goals, scheme: scheme, split: split, sedute: sedute, prefs: prefs,
    metodo: metodoAttivo ? metodoAttivo.id : null, ispirazioni: ispirazioni, fisico: fis,
    sostituzioni: sostituzioni, note: note,
    riposo: DAYS.filter(g => !sedute.some(s => s.giorno === g)),
    settimane: struttura.settimane, blocco: struttura.blocco, fasi: fasi, rirSett: rirSett,
    eserciziPerSeduta: nEs, seme: seme
  };
};
