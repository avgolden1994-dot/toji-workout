/* Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COMPLETAMENTI (piano coach v2, B.3 stadio 7; W1-T4)
   completaSettimana(brief, sedute) rimette in ordine cio che la composizione delle singole sedute puo aver lasciato scoperto nella SETTIMANA:
   la serie in piu al rematore quando manca la tirata verticale (CAS-14), i sei schemi di movimento (PRG-21), le quattro famiglie dei glutei (PRG-22), la
   copertura per regioni (femorali con la flessione del ginocchio o col ponte glutei, retto femorale, deltoide laterale, bicipite allungato: Schoenfeld,
   Maeo, Pedrosa; PRG-23) e i buchi di polpacci, deltoidi posteriori, core e braccia (strCopri, ABB-03). rinforzaFemorali e il ritocco dei femorali che
   adattaAlTempo (tempo.js) chiama dopo il taglio per il tempo, dove la seduta resta nei minuti. ordinaSedute rimette i grandi gruppi prima dei piccoli (ORD-03).
   Sono le regole di prima, spostate da ricette.js e da buildProgram senza cambiarne l esito: le riscrive W2-T6 (copertura per muscolo).
   ============================================================ */
const NOTA_REMATORE_INVERSO = 'Rematore inverso: fallo sotto un tavolo robusto o con una sbarra bassa, dopo aver controllato che regga il tuo peso.';
const NOTA_FEMORALI_SENZA_LEG_CURL = 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.';
/* le flessioni del ginocchio della libreria, nell ordine in cui il coach le propone: le macchine, poi la flessione a casa (il leg curl con l asciugamano: W1-T5, CAS-13, abilita 1, nessun attrezzo), per
   ultimo il Nordic Curl (eccentrico, 3x6, una seduta a settimana, non per chi inizia ne per i prudenti: B1). INT-2b: prima la lista era solo [Seduto, Sdraiato, Nordic], e a casa con i manubri la
   settimana restava senza flessione (6 programmi a 30 minuti nella matrice standard; il ponte glutei al posto del leg curl anche dove l asciugamano c era) */
const FLESSIONI_GINOCCHIO = ['Leg Curl Seduto', 'Leg Curl Sdraiato', 'Leg Curl in Piedi', 'Leg Curl con Asciugamano', 'Nordic Curl'];
const NOTA_FEMORALI_SERVE_FLESSIONE = 'Femorali: squat e hip thrust non li fanno crescere, serve la flessione del ginocchio (leg curl).';   /* riconciliaNote (genera.js) la tiene solo se la scheda ha davvero una flessione */
/* W1-T6: una cerniera dell anca che allena i femorali (credito > 0 negli attributi: stacco rumeno, a una gamba, good morning, stacchi; non l hyperextension, che e classe F, ne l hip thrust, che e
   una spinta d anca). Senza attributi ricade sul nome. */
function eCernieraFemorali(e) {
  const a = typeof attributi === 'function' ? attributi(e.name) : null;
  if (!a) return /stacco|good morning/i.test(senzaEmoji(e.name));
  return a.schema === 'hinge' && 'ABC'.indexOf(a.classe) !== -1 && (a.muscoli.femorali || 0) > 0 && a.attrezzo !== 'corpo';   /* W2-T6: la cerniera dell anca senza carico (Hip Hinge a Corpo Libero) non dispensa dalla nota: i femorali senza leg curl restano meno allenati */
}

/* M6 (W2-T6, revisione INT-2d; collaudo EQ-03:flessione): lo schema delle gambe di un esercizio dal DATO (attributi: l affondo vale come lo squat, il pull-through ai cavi e una cerniera dell anca che
   SCHEMI_MOV non riconosce dal nome); senza attributi ricade su schemaDi. null per tutto il resto (spinta d anca, isolamenti, core) */
function schemaDiGambe(nome) {
  const a = typeof attributi === 'function' ? attributi(nome) : null, s = a ? a.schema : schemaDi(nome);
  return s === 'squat' || s === 'affondo' ? 'squat' : (s === 'hinge' ? 'hinge' : null);
}
/* un multiarticolare di gambe (non l isolamento, non il core, non l esercizio a tempo) */
function eMultiDiGambe(e) {
  const m = findExercise(e.name) || {};
  return m.type === 'compound' && !isTimeBased(e.name) && schemaDiGambe(e.name) !== null;
}
/* ABB-02 (W2-T6, SES-03): x farebbe la terza variante di squat o di affondo della lista (la seduta ne tiene al massimo `squatPerSeduta`, la terza e la cerniera dell anca o la flessione): lo usano i posti della
   ricetta (ricette.js) e gli esercizi che il solutore del volume aggiunge (volume.js, provaNuovo: il Cossack Squat per gli adduttori finiva dopo uno squat e un affondo). Senza il file delle soglie: mai */
function squatOltreMax(x, lista) {
  const tetto = typeof sogliaSelezione === 'function' ? sogliaSelezione('squatPerSeduta') : null;
  const famiglia = (e) => eMultiDiGambe(e) && schemaDiGambe(e.name) === 'squat';
  return tetto !== null && regolaAttiva('ABB-02') && famiglia(x) && lista.filter(famiglia).length >= tetto;
}
/* M6: a 2 giorni e 30 minuti in palestra la seduta full body ha due multiarticolari di gambe di schema DIVERSO (squat e stacco rumeno) oltre a una spinta e a una tirata: non c e posto per la flessione
   del ginocchio (leg curl), l unica della settimana (registro B6: una flessione a settimana, Maeo 2021). La flessione vale piu di una seconda cerniera dell anca o di un secondo squat: il piu caro in
   minuti dei due (non il primo multiarticolare, non un posto fisso o protetto) lascia il posto, purche il suo schema sia anche in un altra seduta (PAT-01). Solo nel full body: nelle sedute lower e legs
   squat e hinge servono entrambi (SES-03). Ritorna l esercizio da togliere, o null. Lo chiamano completaSettimana (dove mettere la flessione) e scalaDelTempo (tempo.js, quando i minuti non bastano) */
function secondoDiGambe(sd, sedute, opz, costo) {
  if (sd.tipo !== 'fullbody' || sd.esercizi.filter(eMultiDiGambe).length < 2) return null;
  const primo = sd.esercizi.find(e => (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name));
  const minuti = (lista) => durataSeduta(lista, opz);
  /* P3-G: `costo` (facoltativo, scalaDelTempo in tempo.js) mette per primo quello che costa meno alla settimana (la frequenza dei muscoli grandi), poi il piu caro in minuti */
  return sd.esercizi.filter(e => eMultiDiGambe(e) && !e.fisso && !e.protetto && e !== primo && sedute.some(o => o !== sd && o.esercizi.some(x => x !== e && eMultiDiGambe(x) && schemaDiGambe(x.name) === schemaDiGambe(e.name))))
    .sort((a, b) => (costo ? costo(a) - costo(b) : 0) || minuti(sd.esercizi.filter(x => x !== a)) - minuti(sd.esercizi.filter(x => x !== b)))[0] || null;
}

/* PCO-08 (W2-T6; Cressey, ricerca-metodi-coach-pratici H-08; collaudo SAF-06): con la spalla dolente dichiarata la settimana ha lavoro per la cuffia dei rotatori e per i deltoidi posteriori, 1-2 volte, leggero e
   che non carica la spalla (stress 0): le serie dirette dei deltoidi posteriori (face pull, alzate posteriori, reverse pec deck: credito pieno) sono almeno `serieMinime`; se mancano entra il primo esercizio della
   lista che l utente puo fare e, con `seduteDueVolte` o piu sedute, la rotazione esterna al cavo in un altra seduta (non piu di due esercizi aggiunti). Non cura il dolore: la nota rimanda al medico. Un metodo essenziale
   (Starting Strength...) ha la sua struttura. Senza il file delle soglie (soglie-selezione.js) non fa niente. Ritorna quanti esercizi ha aggiunto */
const CUFFIA_ESERCIZI = ['Face Pull', 'Face Pull con Elastico', 'Reverse Pec Deck', 'Alzate Posteriori (Reverse Fly)', 'Y-Raise a Corpo Libero', 'Y-Raise su Panca Inclinata'];
const CUFFIA_ROTAZIONE = 'Extrarotazione al Cavo';
const RX_CUFFIA = /face pull|extrarotazione|reverse|alzate posteriori|y-raise/i;
const NOTA_CUFFIA = 'Con la spalla delicata ho aggiunto un lavoro leggero per la cuffia dei rotatori e per i deltoidi posteriori. Non cura il dolore: se non passa fatti vedere da un medico o da un fisioterapista.';
function copriCuffia(brief, sedute) {
  const c = typeof sogliaSelezione === 'function' ? sogliaSelezione('cuffia') : null;
  const prefs = brief.lavoro.prefs, metodoAttivo = brief.metodo.attivo, note = brief.lavoro.note;
  if (!c || (prefs.fastidi || []).indexOf('spalle') === -1 || (metodoAttivo && metodoAttivo.essenziale) || !regolaAttiva('PCO-08')) return 0;
  const diretteDietro = (e) => { const a = typeof attributi === 'function' ? attributi(e.name) : null; return a && a.muscoli && a.muscoli.deltoide_posteriore >= 1 && RX_CUFFIA.test(senzaEmoji(e.name)) && !isTimeBased(e.name) ? e.sets : 0; };
  const serie = () => sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => a + diretteDietro(e), 0), 0);
  const nEs = brief.lavoro.nEs;
  const ammessi = (nomi) => nomi.map(nomeInLibreria).filter(n => n && consentito(n, prefs) && !(typeof esercizioCaricaIlFastidio === 'function' && esercizioCaricaIlFastidio(n, prefs.fastidi)));
  let aggiunti = 0;
  const aggiungi = (nome, usate) => {
    /* la seduta di tirata (pull, upper, full body, punti deboli) con meno esercizi che non ha gia un lavoro dietro e non e gia stata usata; il lavoro dietro sta con le tirate, non con le spinte */
    const idonee = sedute.filter(s => /pull|upper|fullbody|punti/.test(s.tipo) && usate.indexOf(s) === -1 && !s.esercizi.some(e => RX_CUFFIA.test(senzaEmoji(e.name))));
    /* INT-2f: se ogni seduta e gia oltre nEs + 1 (il ponte dei femorali ha aggiunto il leg curl a chi ha la cerniera senza carico) il lavoro per la cuffia entra comunque nella piu corta: e una salvaguardia (SAF-06) e non si rinuncia
       a causa del numero di esercizi; il tetto di esercizi e il tempo tolgono prima altro (il lavoro aggiunto e protetto) */
    const sd = idonee.filter(s => s.esercizi.length <= nEs + 1).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || idonee.sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!sd) return null;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: c.serieAggiunte, reps: isTimeBased(nome) ? (m.reps || 30) : (m.reps && m.reps > 8 ? m.reps : 15), weight: m.weight || 0, rest: 60, protetto: true, cuffia: 'aggiunto' });   /* cuffia: il solutore del volume non lo toglie (volume.js, rimovibile); 'aggiunto' = messo da PCO-08, 'ricetta' = c era gia */
    aggiunti++;
    return sd;
  };
  const usate = [];
  /* il lavoro per i deltoidi posteriori che la ricetta ha gia (un reverse pec deck, un face pull) e quello che la regola chiede: non lo tolgono ne il tempo ne il solutore del volume (prima lo toglievano e la settimana restava senza: collaudo SAF-06) */
  if (serie() >= c.serieMinime) sedute.forEach(sd => sd.esercizi.forEach(e => { if (diretteDietro(e)) { e.protetto = true; e.cuffia = 'ricetta'; } }));
  if (serie() < c.serieMinime) { const nome = ammessi(CUFFIA_ESERCIZI)[0]; const sd = nome ? aggiungi(nome, usate) : null; if (sd) usate.push(sd); }
  /* con abbastanza sedute la rotazione esterna (la cuffia vera) in un altra seduta: Cressey la vuole una o due volte a settimana */
  if (aggiunti && sedute.length >= c.seduteDueVolte && aggiunti < c.eserciziMax) { const nome = ammessi([CUFFIA_ROTAZIONE])[0]; const sd = nome ? aggiungi(nome, usate) : null; if (sd) usate.push(sd); }
  if (aggiunti) note.push(NOTA_CUFFIA);
  return aggiunti;
}

/* completaSettimana(brief, sedute): vedi sopra. Scrive le note nell ordine in cui le scrivevano i passi di buildProgram (brief.lavoro.note). */
function completaSettimana(brief, sedute) {
  const chi = brief.chi, level = chi.livello, over65 = chi.over65, cauto = chi.cauto, scheme = brief.obiettivi.scheme, goals = brief.obiettivi.lista, giorni = brief.agenda.giorni;
  const L = brief.lavoro, prefs = L.prefs, note = L.note, nEs = L.nEs, metodoAttivo = brief.metodo.attivo, senzaSbarraSerieInPiu = L.senzaSbarraSerieInPiu;
  let senzaSbarra = L.senzaSbarra;
  const pulloverMesso = L.pulloverMesso;
  /* CAS-14 (ponte di W0-T2): dove la tirata verticale non c e e non c e nemmeno il pullover, il rematore ha una serie in piu (al massimo 4, 3 per chi inizia) */
  senzaSbarraSerieInPiu.forEach(i => {
    const rem = sedute[i].esercizi.find(e => schemaDi(e.name) === 'tirataO' && !e.fisso && !isTimeBased(e.name));
    if (rem) { rem.sets = Math.min(rem.sets + 1, level === 'principiante' || cauto ? COACH_PARAMETRI.serieMaxPrudente : 4); senzaSbarra = true; }
  });
  if (senzaSbarra) note.push('Senza sbarra la schiena si allena con rematori e pullover: meno completo.');
  if (pulloverMesso) note.push('Aggiunto: ' + senzaEmoji(nomeInLibreria('Pullover con Manubrio')) + ' \u2014 ogni settimana servono tutti e sei gli schemi di movimento.');   /* la stessa nota di PRG-21: il pullover e la riserva della tirata verticale (D-P11) */

  /* schemi di movimento mancanti nella settimana: si aggiungono dove c e posto */
  const presenti = {};
  sedute.forEach(sd => sd.esercizi.forEach(e => { const k = schemaDi(e.name); if (k) presenti[k] = 1; if (/landmine/i.test(senzaEmoji(e.name))) presenti.spintaV = 1; if (/pullover con manubrio/i.test(senzaEmoji(e.name)) && e.riservaTirataV) presenti.tirataV = 1; }));   /* il Landmine Press e una spinta verticale (SLOT_DEF.spintaV) anche se SCHEMI_MOV non lo riconosce; il pullover messo qui al posto della tirata verticale (CAS-14) la rappresenta: PRG-21 non ne aggiunge un secondo */
  SCHEMI_MOV.forEach(([k, rx, etichetta]) => {
    if (presenti[k] || (metodoAttivo && metodoAttivo.essenziale)) return;
    const prudenteSchemi = over65 || chi.parq || level === 'principiante';
    const cand = EXERCISE_LIBRARY.filter(x => rx.test(senzaEmoji(x.name)) && consentito(x.name, prefs))
      .sort((a, b) => prudenteSchemi ? (tipoCarico(a.name) === 'pesante') - (tipoCarico(b.name) === 'pesante') : 0);
    if (!cand.length) return;
    const adatta = (sd) => /spinta|tirata/.test(k) ? /upper|push|pull|fullbody/.test(sd.tipo) : /lower|legs|fullbody/.test(sd.tipo);
    const dove = sedute.filter(adatta).sort((a, b) => a.esercizi.length - b.esercizi.length)[0] || sedute.slice().sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!dove) return;
    const ex = cand.find(x => !dove.esercizi.some(y => y.name === x.name)) || cand[0];
    const tipo = tipoCarico(ex.name);
    dove.esercizi.push({ name: ex.name, sets: Math.min(scheme.sets, 3), reps: tipo === 'pesante' ? Math.min(scheme.reps, 8) : Math.max(8, scheme.reps), weight: ex.weight || 0,
      rest: tipo === 'pesante' ? scheme.restCompound : Math.max(90, Math.round(scheme.restCompound * 0.75)), protetto: true });   /* W0-T7: la nota dice che e stato aggiunto, EXN-02 e il tempo non lo tolgono */
    presenti[k] = 1;
    note.push('Aggiunto: ' + senzaEmoji(ex.name) + ' \u2014 ogni settimana servono tutti e sei gli schemi di movimento.');
  });

  /* obiettivo glutei: le quattro famiglie */
  if (goals.indexOf('glutei') !== -1) {
    GLUTEI_FAMIGLIE.forEach(([k, rx, predef]) => {
      if (sedute.some(sd => sd.esercizi.some(e => rx.test(senzaEmoji(e.name)) && findExercise(e.name) && ['glutei', 'gambe'].indexOf(findExercise(e.name).group) !== -1))) return;
      const nome = nomeInLibreria(predef);
      if (!nome || !consentito(nome, prefs)) return;
      /* RID-01 (W1-T6): una famiglia multiarticolare dei glutei (spinta d anca, affondo, stacco) non va in una seduta che ha gia due multiarticolari per il grande gluteo (ABB-02 ne ammette due):
         prima la seduta di gambe che ne ha meno, poi quella con meno esercizi (prima finiva dove c era piu posto: stacco rumeno, affondi bulgari e hip thrust nella stessa seduta) */
      const gluteiMulti = (sd) => sd.esercizi.filter(e => bersaglioDi(e.name) === 'grande_gluteo' && (findExercise(e.name) || {}).type === 'compound').length;
      const multi = bersaglioDi(nome) === 'grande_gluteo' && (findExercise(nome) || {}).type === 'compound';
      const dove = sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).sort((a, b) => (multi ? (gluteiMulti(a) >= 2) - (gluteiMulti(b) >= 2) : 0) || a.esercizi.length - b.esercizi.length)[0] || sedute[0];
      if (dove) dove.esercizi.push({ name: nome, sets: 3, reps: 12, weight: (findExercise(nome) || {}).weight || 0, rest: 75 });
    });
    note.push('Glutei: spinta d anca, squat o affondi, stacchi e abduzioni ogni settimana.');
  }

  /* copertura per regioni (Schoenfeld, Maeo, Pedrosa): femorali in flessione di ginocchio,
     retto femorale con la leg extension, bicipite prossimale e distale, deltoide laterale */
  const settimanaNomi = () => [].concat.apply([], sedute.map(sd => sd.esercizi.map(e => senzaEmoji(e.name))));
  const aggiungiRegione = (rx, nomi, dove, testo) => {
    if (settimanaNomi().some(n => rx.test(n))) return;
    const ammessi = nomi.map(nomeInLibreria).filter(n => n && consentito(n, prefs));   /* INT-2b (SAF-02): prima chi non carica una zona dolente dichiarata */
    const nome = ammessi.find(n => !(typeof esercizioCaricaIlFastidio === 'function' && esercizioCaricaIlFastidio(n, prefs.fastidi))) || ammessi[0];
    if (!nome) return;
    const sd = sedute.filter(dove).sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!sd || sd.esercizi.length > nEs) return;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: 2, reps: m.reps && m.reps > 8 ? m.reps : 12, weight: m.weight || 0, rest: 75 });
    note.push(testo);
  };
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  const regioni = !(metodoAttivo && metodoAttivo.essenziale) && giorni >= 3 && goals[0] !== 'salute';
  /* B29 / PRG-23 (ponte dei femorali di W0-T2; il risolutore e W2-T1/W2-T6): da 2 giorni, anche per la salute, ogni seduta di gambe
     (lower, legs, full body) ha uno stacco o una flessione del ginocchio: dove manca si aggiunge un leg curl da 3 serie (2 ai principianti).
     Il femorale cosi si allena in ogni seduta di gambe e non solo in una, col rapporto giusto sui quadricipiti (collaudo FRQ-01, EQ-03, VOL-01) */
  if (!(metodoAttivo && metodoAttivo.essenziale) && giorni >= 2 && conGambe) {
    const flessioni = FLESSIONI_GINOCCHIO.map(nomeInLibreria).filter(n => n && consentito(n, prefs));   /* INT-2b: anche il leg curl con l asciugamano (casa, CAS-13) e quello in piedi, che la lista non aveva */
    const usi = (n) => sedute.filter(sd => sd.esercizi.some(e => e.name === n)).length;
    let aggiunti = 0, aggiuntiPonte = 0;
    const setsFlessione = level === 'principiante' ? 2 : 3;
    const eFlessione = (e) => /leg curl|nordic/i.test(senzaEmoji(e.name)), ePonte = (e) => /ponte glutei/i.test(senzaEmoji(e.name));
    /* B1 (revisione dell onda 0): senza macchine ne Nordic Curl (chi inizia, i prudenti, le ginocchia dolenti) non c e una flessione del ginocchio sicura da dare a casa: i femorali restano
       meno allenati e prendono il ponte glutei (credito 0,5: il ponte a una gamba per chi puo, quello a due gambe per chi inizia o e prudente) dove non c e gia. Le flessioni vere sono di W1-T5 */
    const ponte = !FLESSIONI_GINOCCHIO.filter(n => !RX_NORDIC.test(n)).some(n => nomeInLibreria(n) && consentito(nomeInLibreria(n), prefs))
      ? ((level === 'principiante' || cauto) ? ['Ponte Glutei', 'Ponte Glutei a una Gamba'] : ['Ponte Glutei a una Gamba', 'Ponte Glutei']).map(nomeInLibreria).filter(n => n && consentito(n, prefs))[0] : null;
    sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo)).forEach(sd => {
      if (sd.esercizi.some(e => eCernieraFemorali(e) || eFlessione(e)) || sd.esercizi.length > nEs + 1) return;   /* INT-2f: solo una cerniera che allena i femorali (credito > 0: lo stacco, il rumeno, il good morning) dispensa dal leg curl: non il pull-through (femorali 0) ne la cerniera senza carico (2 serie x 0,5 = 1 serie frazionaria: sotto 1,5 la seduta non conta per la frequenza, FRQ-01) */
      /* W0-T7: non il giorno dopo un altra seduta dello stesso grande muscolo, e non oltre il tetto di serie per muscolo in una seduta (REC-01, SES-01) */
      const nome = flessioni.filter(n => !sd.esercizi.some(e => e.name === n) && usi(n) < maxSettimana(n) && recuperoOk(sd, sedute, n, setsFlessione)).sort((a, b) => usi(a) - usi(b))[0];
      if (nome) {
        const m = findExercise(nome) || {};
        sd.esercizi.push({ name: nome, sets: Math.min(setsFlessione, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75, protetto: true });
        aggiunti++;
      } else if (ponte && !sd.esercizi.some(ePonte) && usi(ponte) < RIPETIZIONI_SETTIMANA_MAX && recuperoOk(sd, sedute, ponte, COACH_PARAMETRI.serieMaxPrudente)) {
        const m = findExercise(ponte) || {};
        sd.esercizi.push({ name: ponte, sets: COACH_PARAMETRI.serieMaxPrudente, reps: Math.min(m.reps || 12, 15), weight: m.weight || 0, rest: 75 });   /* 3 serie anche a chi inizia: 1,5 serie frazionarie di femorali per seduta, la soglia della frequenza (FRQ-01). Non protetto: se la seduta ha troppi esercizi (EXN-02) o i minuti non bastano, e il primo a saltare */
        aggiuntiPonte++;
      }
    });
    /* e almeno una flessione del ginocchio nella settimana, anche se ogni seduta ha gia il suo stacco (aggiungiRegione dava 2 serie e solo con 3+ giorni) */
    if (flessioni.length && !settimanaNomi().some(n => /leg curl|nordic/i.test(n))) {
      const gambe = sedute.filter(x => /lower|legs|fullbody/.test(x.tipo)).sort((a, b) => a.esercizi.length - b.esercizi.length);
      const recOk = (x) => recuperoOk(x, sedute, flessioni[0], setsFlessione, { obbligata: true });   /* le 48 ore che la mossa crea si; il tetto per seduta lo rimettono il volume e il tempo (le serie qui sono ancora 4 per esercizio) */
      /* INT-2b (registro B6, collaudo EQ-03:flessione): se ogni seduta di gambe e gia oltre nEs + 1 (le famiglie dei glutei, gli schemi mancanti: a 30 minuti con l obiettivo glutei) la flessione entra
         comunque nella piu corta sotto il tetto di esercizi (EXN-02): decide la scala del tempo, che tiene l unica flessione della settimana e toglie prima un doppione dello schema (scalaDelTempo) */
      const maxEs = level === 'principiante' ? PARAM_NUMERO_ESERCIZI.maxSedutaPrincipiante : PARAM_NUMERO_ESERCIZI.maxSeduta;
      /* M6 (W2-T6): se ogni seduta di gambe e gia piena (30 minuti: 4 esercizi) la flessione va dove prende il posto del secondo di gambe e la seduta resta piu corta (secondoDiGambe): la scala del tempo
         (scalaDelTempo) lo toglie quando serve; nella seduta con un solo multiarticolare di gambe dovrebbe togliere una spinta o una tirata, o rinunciare alla flessione */
      const piene = gambe.every(x => x.esercizi.length >= nEs);
      const opzT = typeof opzioniTempo === 'function' && typeof durataSeduta === 'function' ? opzioniTempo(brief) : null;
      const dopoLo = (x) => { const via = secondoDiGambe(x, sedute, opzT); return via ? durataSeduta(x.esercizi.filter(y => y !== via).concat([{ name: flessioni[0], sets: setsFlessione, reps: 12, rest: 75 }]), opzT) : Infinity; };
      let sd = (piene && opzT ? gambe.filter(x => x.esercizi.length <= nEs + 1 && recOk(x) && isFinite(dopoLo(x))).sort((a, b) => dopoLo(a) - dopoLo(b))[0] : null) ||
        gambe.find(x => x.esercizi.length <= nEs + 1 && recOk(x)) || gambe.find(x => x.esercizi.length < maxEs && recOk(x)) || null;
      if (!sd) {   /* ogni seduta di gambe e al tetto di esercizi, o di serie per muscolo (SES-01 contato prima del volume, con 4 serie per esercizio: a casa coi manubri i glutei sono gia a 11): la flessione
                      prende il posto del secondo esercizio di schema squat (la hack, gli affondi o lo squat a corpo libero dopo il primo), mai del fondamentale ne di un posto fisso */
        for (const x of gambe) {
          const comp = x.esercizi.filter(e => (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name));
          const doppio = comp.filter((e, i) => i > 0 && !e.fisso && schemaDi(e.name) === 'squat' && comp.some(y => y !== e && schemaDi(y.name) === 'squat')).pop();
          if (!doppio) continue;
          const k = x.esercizi.indexOf(doppio);
          x.esercizi.splice(k, 1);
          if (recOk(x)) { sd = x; break; }
          x.esercizi.splice(k, 0, doppio);
        }
      }
      const nome = sd ? flessioni[0] : null;
      if (nome) {
        const m = findExercise(nome) || {};
        sd.esercizi.push({ name: nome, sets: Math.min(setsFlessione, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75, protetto: true });
        aggiunti++;
      }
    }
    /* W1-T6: la nota «senza leg curl restano meno allenati» non c e dove i femorali hanno gia una cerniera dell anca vera (stacco rumeno coi manubri o col bilanciere, a una gamba,
       good morning, stacchi): rinforzaFemorali e il ponte guardavano solo le flessioni e la nota compariva anche con lo stacco rumeno in scheda (mappa, cap. 17 n. 15) */
    if (aggiunti) note.push(NOTA_FEMORALI_SERVE_FLESSIONE);
    else if (aggiuntiPonte && !sedute.some(sd => sd.esercizi.some(eCernieraFemorali))) note.push(NOTA_FEMORALI_SENZA_LEG_CURL);
  }
  if (regioni && conGambe) {
    if (goals.indexOf('massa') !== -1 || goals.indexOf('glutei') !== -1) aggiungiRegione(/leg extension/i, ['Leg Extension'], sd => /lower|legs|fullbody/.test(sd.tipo),
      'Retto femorale: cresce solo con la leg extension, schienale un po’ reclinato.');
  }
  if (regioni && (goals.indexOf('massa') !== -1 || goals.indexOf('ricomposizione') !== -1)) {
    if (settimanaNomi().some(n => /panca|chest press|piegamenti/i.test(n)))
      aggiungiRegione(/alzate laterali/i, ['Alzate Laterali ai Cavi', 'Alzate Laterali'], sd => /upper|push|fullbody/.test(sd.tipo),
        'Spalle larghe: la panca copre il deltoide anteriore, le alzate laterali quello laterale.');
    /* PRG-23 (B32, D-P8): bicipite. Con almeno 2 curl, uno e sulla panca inclinata (o il Bayesiano ai cavi): il muscolo lavora allungato (Pedrosa 2025).
       Lo Scott e lo Spider non si aggiungono piu al posto del curl inclinato: sono il secondo esercizio, non il primo */
    const curl = [];
    sedute.forEach(sd => sd.esercizi.forEach(e => { if (/curl/i.test(senzaEmoji(e.name)) && (findExercise(e.name) || {}).group === 'braccia' && !/leg curl|nordic/i.test(e.name)) curl.push(e); }));
    if (curl.length >= 2 && !curl.some(e => /panca inclinata|bayesiano/i.test(senzaEmoji(e.name)))) {
      const nuovo = ['Curl su Panca Inclinata', 'Curl Bayesiano ai Cavi'].map(nomeInLibreria).find(n => n && consentito(n, prefs) && !settimanaNomi().some(x => x === senzaEmoji(n)));
      if (nuovo) { const e = curl[curl.length - 1]; e.name = nuovo; e.weight = (findExercise(nuovo) || {}).weight || e.weight; note.push('Bicipite: un curl su panca inclinata, con il muscolo allungato, per crescere in tutta la lunghezza.'); }
    }
  }
  /* PCO-08: la spalla dolente ha il suo lavoro per la cuffia e per i deltoidi posteriori (prima di strCopri: quello che aggiunge conta) */
  copriCuffia(brief, sedute);
  /* ABB-03: ogni settimana nessun buco (polpacci, deltoidi posteriori, core, braccia dirette) */
  strCopri({ sedute: sedute, goals: goals, level: level, days: Number(giorni) || 3, prefs: prefs, nEs: nEs, note: note, metodoAttivo: metodoAttivo });
  (prefs.fastidi || []).forEach(f => { if (SCALE_DOLORE[f]) note.push(SCALE_DOLORE[f]); });
  L.senzaSbarra = senzaSbarra;
  return sedute;
}

/* B29 (ponte dei femorali di W0-T2): i femorali arrivano al minimo del livello (la fascia delle grandi unita: docs/ricerca-ipertrofia-programmazione.md 3.2, rivista
   da W2-T1 con la tabella B6) prima di tutto con le serie dei leg curl o dei nordic gia in scheda (fino a 4, 5 agli avanzati, 3 a chi inizia), poi con un secondo
   esercizio di flessione in un altra seduta di gambe. Solo dove la seduta resta nei minuti dichiarati (+5%): non si sfora il tempo per i femorali. */
function rinforzaFemorali(c) {
  const target = Math.ceil(c.minimo * 0.92);
  const flex = (e) => /leg curl|nordic/i.test(senzaEmoji(e.name));
  /* il Nordic Curl e una discesa eccentrica a corpo libero: oltre 3 serie non e un lavoro che si fa (la libreria lo da a 3x6) */
  const tetto = (e) => /nordic/i.test(senzaEmoji(e.name)) ? Math.min(3, c.maxSerieFlessione) : c.maxSerieFlessione;
  const dentro = (sd) => durataSeduta(sd.esercizi) <= c.minuti * 1.05;
  const nomiFlessione = () => FLESSIONI_GINOCCHIO.map(nomeInLibreria).filter(n => n && consentito(n, c.prefs));
  const usoFlessione = (n) => c.sedute.filter(x => x.esercizi.some(e => e.name === n)).length;
  /* frequenza: il femorale conta in una seduta da 1,5 serie frazionarie in su (3 serie con credito 0,5: un pull-through a 2 serie non basta); almeno 2 sedute
     a settimana (ACSM 2026). Dove manca, una serie in piu al leg curl che c e o un leg curl nuovo (collaudo FRQ-01) */
  const femSeduta = (sd) => sd.esercizi.reduce((t, e) => t + e.sets * (creditoSerie(e.name).femorali || 0), 0);
  const gambe = c.sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo));
  const nuova = (sd) => {   /* un leg curl nuovo nella seduta, solo se c e posto, non sfora il tempo e rispetta le 48 ore e il tetto di serie (W0-T7: REC-01, SES-01) */
    if (sd.esercizi.length >= c.maxEsercizi || sd.esercizi.some(flex)) return false;
    const nome = nomiFlessione().filter(n => usoFlessione(n) < maxSettimana(n) && recuperoOk(sd, c.sedute, n, c.setsNuovo)).sort((a, b) => usoFlessione(a) - usoFlessione(b))[0];
    if (!nome) return false;
    const m = findExercise(nome) || {};
    const nuovoEs = { name: nome, sets: Math.min(c.setsNuovo, RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.serieMax : 99), reps: ripetizioniFlessione(nome), weight: m.weight || 0, rest: 75 };
    sd.esercizi.push(nuovoEs);
    if (!dentro(sd)) {
      sd.esercizi.pop();
      /* INT-2b (B6): nei minuti non entra in piu: prende il posto del secondo esercizio di schema squat della seduta (non il primo multiarticolare, non un fisso), se cosi la seduta sta nei minuti;
         la flessione del ginocchio vale piu di un doppione dello squat (scala di priorita del poco tempo, P4 contro un secondo P1 dello stesso schema) */
      const comp = sd.esercizi.filter(e => (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name));
      const doppio = comp.filter((e, i) => i > 0 && !e.fisso && schemaDi(e.name) === 'squat' && comp.some(y => y !== e && schemaDi(y.name) === 'squat')).pop();
      if (!doppio) return false;
      const k = sd.esercizi.indexOf(doppio), dopo = sd.esercizi[k + 1], coppiaDopo = !!(dopo && dopo.superset && !doppio.superset);
      togliEsercizio(sd, doppio);
      sd.esercizi.push(nuovoEs);
      if (!dentro(sd)) { sd.esercizi.pop(); sd.esercizi.splice(k, 0, doppio); if (coppiaDopo) dopo.superset = true; return false; }
    }
    strOrdina(sd.esercizi, sd.tipo, c.prefs.priorita);   /* ABB-01: il core resta in fondo */
    return true;
  };
  const piuSerie = (sd, f) => {   /* una serie in piu al leg curl che c e: tetto, tempo e recupero */
    if (!(f.sets < tetto(f)) || f.fisso || !recuperoOk(sd, c.sedute, f.name, 1)) return false;
    f.sets++;
    if (!dentro(sd)) { f.sets--; return false; }
    return true;
  };
  for (let giri = 0; giri < 6 && gambe.filter(sd => femSeduta(sd) >= 1.5).length < Math.min(2, gambe.length); giri++) {
    const poveri = gambe.filter(x => femSeduta(x) < 1.5).sort((a, b) => femSeduta(b) - femSeduta(a));
    if (!poveri.some(sd => { const f = sd.esercizi.find(e => flex(e) && e.sets < tetto(e) && !e.fisso); return f ? piuSerie(sd, f) : nuova(sd); })) break;
  }
  for (let giri = 0; giri < 10 && (frazionarieSettimana(c.sedute).femorali || 0) < target; giri++) {
    const su = [].concat.apply([], c.sedute.map(sd => sd.esercizi.filter(e => flex(e) && e.sets < tetto(e) && !e.fisso && dentro(sd)).map(e => ({ sd: sd, e: e }))))
      .sort((a, b) => a.e.sets - b.e.sets);
    if (su.some(x => piuSerie(x.sd, x.e))) continue;
    /* nessun leg curl da rinforzare: ne entra un secondo in un altra seduta di gambe (non lo stesso esercizio in piu di 2 sedute) */
    if (!gambe.filter(x => !x.esercizi.some(flex)).sort((a, b) => a.esercizi.length - b.esercizi.length).some(nuova)) break;
  }
}

/* ORD-03: l ordine dei grandi gruppi prima dei piccoli, dopo il tempo e la struttura. Con un metodo famoso decide il metodo. */
function ordinaSedute(brief, sedute) {
  const metodoAttivo = brief.metodo.attivo, prefs = brief.lavoro.prefs;
  /* ORD-03 (ponte di W0-T2): i grandi gruppi prima dei piccoli (ACSM 2009). Un multiarticolare di spalle o braccia non sta prima di uno squat o di uno stacco,
     salvo il muscolo che l utente ha messo in priorita (ABB-10). Le ricette full body hanno la spinta verticale prima dello squat */
  if (!metodoAttivo) sedute.forEach(sd => {
    if (sd.tipo === 'punti') return;
    const piccolo = (e) => strPiccoloMulti(e) && prefs.priorita.indexOf(strMeta(e).group) === -1;
    /* W1-T6: anche la spinta d anca (hip thrust, ponte con carico) e un multiarticolare del gluteo, le gambe: una famiglia dei glutei aggiunta a una seduta full body non resta dopo la military;
       W2-T6: e il pull-through ai cavi, una cerniera dell anca per dato (strBassoMulti, struttura-pro.js) */
    const basso = strBassoMulti;
    sd.esercizi.slice().filter(piccolo).forEach(a => {
      let ultimo = -1;
      sd.esercizi.forEach((x, i) => { if (basso(x)) ultimo = i; });
      if (ultimo > sd.esercizi.indexOf(a)) { sd.esercizi.splice(sd.esercizi.indexOf(a), 1); sd.esercizi.splice(ultimo, 0, a); }   /* dopo l ultimo multiarticolare delle gambe (l indice e gia scalato di uno) */
    });
  });
  return sedute;
}
