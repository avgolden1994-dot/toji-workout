/* Coach 2: regole nuove dalla ricerca
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH 2 — regole nuove dalla ricerca (progetto: claude/ricerca-coach.md)
   - RIR bersaglio per tipo di esercizio (Robinson 2024, pratica RP):
     bilanciere pesante 1-3, multiarticolare a macchina 0-2, isolamento 0-1.
     Con il PAR-Q positivo (modalita prudente) sempre 3-4.
   - Autoregolazione da RPE (Helms 2018): +-2% di carico per ogni mezzo
     punto di scarto dal bersaglio.
   - Micro-incrementi: se il salto disponibile supera il 5% del carico,
     prima una ripetizione in piu, poi il peso.
   - Principiante: due volte mancato = -5% (Starting Strength), gli
     altri -10%.
   - Rientro dopo una pausa (detraining, SBS): 10-20 giorni -10%, fino a
     4 settimane -20%, fino a 3 mesi -30%, oltre -50%. Over 65 perdono
     il doppio: soglie dimezzate.
   - Scarico mirato (Dr. Muscle): massimale stimato in calo per due
     sedute di fila su un esercizio = -10% e meta serie solo li.
   ============================================================ */
/* tecniche speciali che il coach assegna (quando e perche: vedi Opzioni > Il coach) */
const TECNICHE = {
  drop: 'Drop set sull ultima serie: arrivato vicino al cedimento togli il 20% e continua, due volte',
  cluster: 'Cluster: 30 secondi di pausa ogni 2 ripetizioni, meno fatica per le articolazioni',
  potenza: 'Potenza: salita veloce con un carico leggero (40-60%), discesa controllata',
  amrap: 'Ultima serie AMRAP: fai piu ripetizioni possibili con buona tecnica',
  backoff: 'Back-off: dopo la serie piu pesante, le altre a -5%',
  parziali: 'A fine serie qualche ripetizione parziale nella parte allungata',
  calibrazione: 'Calibrazione: ultima serie fino al cedimento, il coach impara quanto stimi le ripetizioni in riserva',
  /* tecniche dell epoca d oro (TEC-01..05): le assegnano solo i metodi che le prevedono */
  piramide: 'Piramide: serie dopo serie il carico sale e le ripetizioni scendono (per esempio 12, 10, 8, 6), come faceva Arnold',
  negativa: 'Negative: nell’ultima serie scendi in 4-5 secondi (serve un compagno che ti aiuti a salire): il sovraccarico in discesa dà un piccolo vantaggio sulla massa',
  forzate: 'Ripetizioni forzate: al cedimento un compagno ti aiuta per 1-2 ripetizioni, solo su panca o macchine',
  riposopausa: 'Riposo-pausa: al cedimento 15 secondi di pausa e ancora qualche ripetizione, per due volte',
  picco: 'Contrazione di picco: in cima a ogni ripetizione fermati 2 secondi stringendo il muscolo',
  ottoperotto: 'Gironda 8×8: otto serie da otto con 30 secondi di pausa, con circa il 70% del carico delle 8 ripetizioni'
};
function profiloCoach() {
  const p = getProfile() || {};
  return { livello: p.level || 'intermedio', eta: Number(p.age) || 0, prudente: !!p.parq,
           sonnoMale: !!(p.prefs && p.prefs.sonno === 'male') };
}
const BIL_PESANTI = /Squat con Bilanciere|Front Squat|Stacco|Panca Piana Bilanciere|Panca Inclinata Bilanciere|Panca Declinata|Military Press|Rematore con Bilanciere|T-Bar Row|Good Morning/;
function tipoCarico(nome) {
  const m = findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '');
  if (!m || m.type !== 'compound') return 'isolamento';
  return BIL_PESANTI.test(senzaEmoji(nome)) ? 'pesante' : 'macchina';
}
const RIR_TIPO = { pesante: [1, 3], macchina: [0, 2], isolamento: [0, 1] };
function rirBersaglio(nome) {
  const r = rirBersaglioBase(nome);
  /* chi si ferma alla prima fatica si allena lontano dal cedimento (PRETIE-Q): stessa crescita fino a 3-4 RIR */
  let piu = psicoCoach((getProfile() || {}).psico).intensita === 'bassa' ? 1 : 0;
  const mo = momentoAttivo();
  if (mo && !mo.scaduto) piu += mo.rir || 0;
  if (typeof rirExtraIntensita === 'function') piu += rirExtraIntensita(nome);   /* INT-03/04: BIA con bandiere di prudenza, prima volta con l esercizio */
  let out = piu ? [Math.min(4, r[0] + piu), Math.min(5, r[1] + piu)] : r.slice();
  if (!piu && esigenzaCoach() >= 1.15 && tipoCarico(nome) !== 'pesante') { const a = Math.max(0, out[0] - 1); out = [a, Math.max(a, out[1] - 1)]; }
  if (!stabile(nome) && out[0] < 1) out = [1, Math.max(2, out[1])];
  return out;
}
function rirBersaglioBase(nome) {
  const pc = profiloCoach();
  if (pc.prudente || pc.eta >= 65) return [3, 4];
  /* avanzati: RIR che scende nelle settimane del blocco (RP) */
  const p = getProgramma(), st = p && p.rirSett ? settimanaProgramma() : null;
  if (st && st.numero >= 1 && st.numero <= p.rirSett.length) { const r = p.rirSett[st.numero - 1]; return [r, r + 1]; }
  return RIR_TIPO[tipoCarico(nome)];
}
/* scarico dosato sul bisogno (Bell 2024): poca, media o molta fatica */
function livelloFatica() {
  const hist = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, 3);
  const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
  if (!hist.length && !pr.length) return 'media';
  const srpe = hist.length ? hist.reduce((t, h) => t + (h.feedback.srpe || 7), 0) / hist.length : 7;
  const pz = pr.length ? pr.reduce((t, x) => t + x, 0) / pr.length : 70;
  if (srpe >= 9 || pz < 50) return 'alta';
  if (srpe < 7 && pz >= 70) return 'bassa';
  return 'media';
}
const DOSE_SCARICO = { bassa: { serie: 0.65, carico: 0.95, t: 'volume -35%' }, media: { serie: 0.5, carico: 0.9, t: 'volume -50% e carico -10%' }, alta: { serie: 0.3, carico: 0.9, t: 'volume -70% e carico -10%' } };
function storicoProntezza() { try { return JSON.parse(localStorage.getItem('coach_plus_prontezza_storia_' + currentMode) || '[]'); } catch (e) { return []; } }
function rpeBersaglio(nome) { const r = rirBersaglio(nome); return 10 - (r[0] + r[1]) / 2; }
function testoRir(nome) { const r = rirBersaglio(nome); return r[1] === 1 && r[0] === 0 ? 'fino a 0–1 ripetizioni in riserva' : 'lascia ' + r[0] + '–' + r[1] + ' ripetizioni in riserva'; }
/* massimale stimato (Epley) solo da serie fino a 12 ripetizioni */
function e1rmSerie(x) { const w = Number(x.weight) || 0, r = Number(x.reps) || 0; if (!w || !r || r > 12) return 0; return w * (1 + r / 30); }
function e1rmSeduta(ex) { const v = (ex.sets || []).filter(x => x.done).map(e1rmSerie); return v.length ? Math.max.apply(null, v) : 0; }
function sessioniConData(nome, n) {
  const out = [];
  loadHistory().forEach(h => {
    if (out.length >= n || !h.sessione || h.interrotta) return;
    const ex = h.sessione.find(e => e.name === nome);
    if (ex) out.push({ ex: ex, data: dataSessione(h) });
  });
  return out;
}
function rientroDopoPausa(giorni, eta) {
  const g = eta >= 65 ? giorni * 2 : giorni;
  if (g < 10) return null;
  if (g <= 20) return { f: 0.9, t: '-10%' };
  if (g <= 28) return { f: 0.8, t: '-20%' };
  if (g <= 90) return { f: 0.7, t: '-30%' };
  return { f: 0.5, t: '-50%' };
}
const fmtKg = (x) => String(Math.round(x * 10) / 10);

function caricoProssimoBase(nome, base, repsTarget, setsBase) {
  const sett = settimanaProgramma();
  const scarico = sett && sett.fase === 'scarico';
  const pc = profiloCoach();
  const prudente = pc.sonnoMale || pc.prudente;
  const sess = ultimeSessioni(nome, 2);
  const dose = scarico ? DOSE_SCARICO[livelloFatica()] : null;
  const sets = scarico ? Math.max(2, Math.round((setsBase || 3) * dose.serie)) : (setsBase || 3);

  if (isTimeBased(nome)) {
    if (sess.length && esito(sess[0], repsTarget) === 'ok') return { weight: base, reps: Number(repsTarget) + 5, sets: sets, tipo: 'su', motivo: 'Tenuta completata: +5 secondi' };
    return { weight: base, reps: repsTarget, sets: sets, tipo: sess.length ? 'fermo' : 'nuovo', motivo: sess.length ? 'Stessa durata, punta a completarla' : 'Parti dalla durata del programma' };
  }

  if (!sess.length) {
    return { weight: scarico ? arrotonda(base * COACH_PARAMETRI.scaricoReattivoCarico) : base, reps: repsTarget, sets: sets, tipo: scarico ? 'scarico' : 'nuovo',
             motivo: scarico ? 'Settimana di scarico: carico e serie ridotti' : 'Prima volta: parti dal carico del programma' };
  }

  const fatteUltima = sess[0].sets.filter(x => x.done);
  const pesoUltimo = fatteUltima.length ? Math.max.apply(null, fatteUltima.map(x => Number(x.weight) || 0)) : base;
  /* prime sedute con questo esercizio: il carico di partenza e una stima, quindi si corregge piu in fretta */
  const calibrazione = ultimeSessioni(nome, 3).length < 3;
  const e1 = esito(sess[0], repsTarget);
  const e2 = sess[1] ? esito(sess[1], repsTarget) : null;
  const freno = frenoBia();

  if (scarico) return { weight: arrotonda(pesoUltimo * dose.carico), reps: repsTarget, sets: sets, tipo: 'scarico',
    motivo: 'Settimana di scarico: ' + dose.t + ', per recuperare e ripartire piu forte (mai stop totale: la forza calerebbe)' };

  /* rientro dopo una pausa su questo esercizio */
  const sd = sessioniConData(nome, 3);
  const giorni = sd[0] && sd[0].data ? giorniTra(sd[0].data, new Date()) : 0;
  const rientro = rientroDopoPausa(giorni, pc.eta);
  if (rientro && pesoUltimo > 0) {
    return { weight: arrotonda(pesoUltimo * rientro.f), reps: repsTarget, sets: sets, tipo: 'giu',
             motivo: 'Rientro dopo ' + giorni + ' giorni: carico ' + rientro.t + ' e 3 ripetizioni in riserva, si risale in fretta' };
  }

  /* esercizi a corpo libero: si progredisce con le ripetizioni */
  if (pesoUltimo === 0) {
    if (e1 === 'ok') return { weight: 0, reps: Number(repsTarget) + 1, sets: sets, tipo: 'su', motivo: 'Tutte le serie complete: +1 ripetizione' };
    return { weight: 0, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Stesse ripetizioni, punta a completarle tutte' };
  }

  if (e1 === 'ok') {
    if (freno) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: freno };
    const inc = prudente ? Math.max(0.5, incrementoPer(nome) / 2) : incrementoPer(nome);
    const nota = pc.prudente ? ' (modalita prudente)' : (pc.sonnoMale ? ' (aumento prudente: recupero scarso)' : '');
    /* autoregolazione dall RPE segnato sulle serie */
    const bias = Number((aggiustiCoach() || {}).rirBias) || 0;
    const rpes = fatteUltima.map(x => Number(x.rpe)).filter(x => x > 0).map(x => Math.max(1, x - bias));
    if (rpes.length) {
      const media = Math.round(rpes.reduce((t, x) => t + x, 0) / rpes.length * 10) / 10;
      const bers = rpeBersaglio(nome);
      const delta = media - bers;
      if (delta >= 1) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo',
        motivo: 'Serie complete ma RPE ' + String(media).replace('.', ',') + ', sopra il bersaglio ' + String(bers).replace('.', ',') + ': stesso carico, consolida' };
      if (delta <= -1) {
        const pct = calibrazione ? Math.min(0.15, -delta * 0.05) : Math.min(0.1, -delta * 0.04);
        const w = Math.max(arrotonda(pesoUltimo + inc), arrotonda(pesoUltimo * (1 + pct)));
        return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
          motivo: 'Serie facili (RPE ' + String(media).replace('.', ',') + ', bersaglio ' + String(bers).replace('.', ',') + '): +' + fmtKg(w - pesoUltimo) + ' kg' + nota + (calibrazione ? ' \u2022 prime sedute: mi avvicino piu in fretta' : '') };
      }
    }
    /* serie finale AMRAP: aumento proporzionale alle ripetizioni in piu (nSuns) */
    const ultima = fatteUltima[fatteUltima.length - 1];
    const extra = ultima ? (Number(ultima.reps) || 0) - (Number(repsTarget) || 0) : 0;
    if (tipoCarico(nome) === 'pesante' && extra >= 2 && fatteUltima.length === sess[0].sets.length) {
      const gambe = /gambe|glutei/.test((findExercise(nome) || {}).group || '');
      const salto = extra >= 6 ? (gambe ? 7.5 : 5) : (extra >= 4 ? (gambe ? 5 : 2.5) : 2.5);
      const tot = prudente ? Math.max(inc, salto / 2) : Math.max(inc, salto);
      return { weight: arrotonda(pesoUltimo + tot), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Ultima serie con ' + extra + ' ripetizioni in piu: +' + fmtKg(tot) + ' kg' + nota };
    }
    /* isolamenti: doppia progressione, prima le ripetizioni fino alla cima del range */
    if (tipoCarico(nome) === 'isolamento') {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const cima = (Number(repsTarget) || 0) + 3;
      if (repsFatte < cima) return { weight: pesoUltimo, reps: Math.max(Number(repsTarget) || 0, repsFatte) + 1, sets: sets, tipo: 'su',
        motivo: 'Doppia progressione: una ripetizione in piu (' + (Math.max(Number(repsTarget) || 0, repsFatte) + 1) + ' su ' + cima + '), poi il peso' };
      return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Cima del range raggiunta (' + repsFatte + '): +' + inc + ' kg e si riparte da ' + repsTarget + nota };
    }
    /* micro-incrementi: un salto oltre il 5% si fa prima con le ripetizioni */
    if (inc / pesoUltimo > 0.05) {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const tetto = (Number(repsTarget) || 0) + 2;
      if (repsFatte < tetto) {
        return { weight: pesoUltimo, reps: repsFatte + 1, sets: sets, tipo: 'su',
          motivo: '+' + inc + ' kg sarebbe un salto del ' + Math.round(inc / pesoUltimo * 100) + '%: prima una ripetizione in piu (' + (repsFatte + 1) + ')' };
      }
      return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Arrivato a ' + repsFatte + ' ripetizioni: ora +' + inc + ' kg e si riparte da ' + repsTarget + nota };
    }
    return { weight: arrotonda(pesoUltimo + inc), reps: repsTarget, sets: sets, tipo: 'su',
             motivo: 'Tutte le serie complete la volta scorsa: +' + inc + ' kg' + nota };
  }
  /* prime sedute: se le serie sono molto sotto il previsto il carico di partenza era troppo alto: -5% subito, senza aspettare il secondo errore */
  if (calibrazione && e1 === 'mancato' && e2 !== 'mancato' && pesoUltimo > 0) {
    const totSerie = sess[0].sets.length || 1;
    const repsMedie = fatteUltima.length ? fatteUltima.reduce((t, x) => t + (Number(x.reps) || 0), 0) / fatteUltima.length : 0;
    if (fatteUltima.length < Math.ceil(totSerie * 0.6) || repsMedie <= (Number(repsTarget) || 0) - 3)
      return { weight: arrotonda(pesoUltimo * 0.95), reps: repsTarget, sets: sets, tipo: 'giu',
        motivo: 'Prime sedute: serie molto sotto il previsto, il carico di partenza era troppo alto: -5% e poi si risale' };
  }
  if (e1 === 'mancato' && e2 === 'mancato') {
    const ag0 = aggiustiCoach();
    const stalli = ((ag0.stalli || {})[nome] || 0);
    if (pc.livello === 'principiante' && tipoCarico(nome) === 'pesante' && stalli >= 1)
      return { weight: pesoUltimo, reps: 3, sets: 5, tipo: 'fermo', stallo: true,
        motivo: 'Secondo stallo: stesso peso ma schema 5\u00D73 (poi 6\u00D72 e 10\u00D71), come nel GZCLP' };
    if (pc.livello === 'principiante') return { weight: arrotonda(pesoUltimo * 0.95), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -5% e si ricostruisce' };
    return { weight: arrotonda(pesoUltimo * COACH_PARAMETRI.dopoDueMancateCarico), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -10% e si ricostruisce' };
  }
  /* scarico mirato: massimale stimato in calo per due sedute di fila */
  if (sd.length >= 3) {
    const m = sd.map(x => e1rmSeduta(x.ex));
    if (m[0] && m[1] && m[2] && m[0] < m[1] && m[1] < m[2]) {
      return { weight: arrotonda(pesoUltimo * COACH_PARAMETRI.scaricoReattivoCarico), reps: repsTarget, sets: Math.max(2, Math.round(sets * COACH_PARAMETRI.scaricoProgressioneSerie)), tipo: 'scarico',
               motivo: 'Massimale stimato in calo da due sedute: scarico solo qui (-10% e meta serie), il resto non cambia' };
    }
  }
  if (pc.livello === 'principiante') return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', piuPausa: 30,
    motivo: 'Non tutte le serie complete: stesso peso con 30 secondi di pausa in piu' };
  return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Non tutte le serie complete: stesso carico, punta a piu ripetizioni' };
};

/* Applicato quando si apre una seduta: solo se c e il consenso e solo se
   la seduta non e ancora iniziata (non tocca serie gia fatte) */
window.applicaCaricoProgressivo = function(day) {
  if (!coachAttivo()) return 0;
  if (!getProgramma() && !loadHistory().some(h => h.sessione)) return 0;
  const data = loadData();
  const list = data[day] || [];
  let cambiati = 0;
  list.forEach(e => {
    if (e.completedSets.some(s => s.done)) return;
    if (e.setsBase === undefined) e.setsBase = e.sets;
    const t = caricoProssimo(e.name, e.weight, e.repsBase !== undefined ? e.repsBase : e.reps, e.setsBase);
    if (e.repsBase === undefined) e.repsBase = e.reps;
    e.weight = t.weight;
    e.reps = t.reps;
    e.sets = t.sets;
    e.completedSets = Array.from({ length: t.sets }, () => ({ done: false, reps: t.reps, weight: t.weight, wasBerserk: false }));
    e.coachNote = (e.stimato && t.tipo === 'nuovo' && MOTIVI_STIMA[e.stimato]) ? MOTIVI_STIMA[e.stimato] : t.motivo;
    e.coachTipo = t.tipo;
    if (e.restBase === undefined) e.restBase = e.rest;
    e.rest = e.restBase + (t.piuPausa || 0);
    /* avanzati: dopo la serie piu pesante, serie a -5% (RTS) */
    if (e.tecnica === 'backoff' && t.weight > 0 && t.tipo !== 'scarico') e.completedSets.forEach((x, i) => { if (i > 0) x.weight = arrotonda(t.weight * 0.95); });
    e.tecnicaSeduta = '';
    cambiati++;
  });
  /* calibrazione del RIR: nell ultima settimana di carico del blocco, l ultima serie del primo isolamento va a cedimento */
  const st = settimanaProgramma(), pr = getProgramma();
  if (st && pr && pr.fasi && st.fase === 'carico' && pr.fasi[st.numero] === 'scarico') {
    const iso = list.find(e => tipoCarico(e.name) === 'isolamento' && !isTimeBased(e.name) && !e.completedSets.some(x => x.done));
    if (iso) iso.tecnicaSeduta = 'calibrazione';
  }
  saveData(data);
  return cambiati;
};

/* dopo la seduta: stalli e calibrazione del RIR */
function imparaDallaSeduta(list) {
  const ag = aggiustiCoach();
  ag.stalli = ag.stalli || {};
  list.forEach(e => {
    if (e.coachNote && /Due volte di fila non completato/.test(e.coachNote)) ag.stalli[e.name] = (ag.stalli[e.name] || 0) + 1;
    if (e.tecnicaSeduta === 'calibrazione') {
      const fatte = e.completedSets.filter(x => x.done);
      const ultima = fatte[fatte.length - 1];
      const altre = fatte.slice(0, -1).map(x => Number(x.rpe)).filter(x => x > 0);
      if (ultima && altre.length) {
        const rirStimato = 10 - altre.reduce((t, x) => t + x, 0) / altre.length;
        const rirVero = (Number(ultima.reps) || 0) - (Number(e.reps) || 0);
        const b = Math.max(-2, Math.min(3, rirVero - rirStimato));
        ag.rirBias = Math.round(((Number(ag.rirBias) || 0) * 0.5 + b * 0.5) * 10) / 10;
      }
    }
  });
  salvaAggiusti(ag);
}
