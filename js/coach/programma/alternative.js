/* Alternative e applicazione del programma
   (3in, parte di coach; ordine di caricamento: vedi index.html) */


window.altraVariante = function() {
  onbData.variante = (onbData.variante || 0) + 1;
  onbData.scelte = {};
  renderOnb();
};

/* ---- Esercizi alternativi: una tendina per ogni esercizio ----
   Solo esercizi con lo STESSO muscolo bersaglio (alternativeStessoMuscolo), con attrezzi e fastidi
   consentiti, mai uno gia in seduta, al massimo 6. Se ce ne sono meno, o nessuno, se ne mostrano meno:
   mai un esercizio per un altro muscolo. */
function alternativeDi(nome, prefs, sessione) {
  return alternativeStessoMuscolo(nome, prefs, sessione.map(e => e.name)).map(a => a.ex);
}
let altScelte = {};
window.apriAlternative = function() {
  altScelte = Object.assign({}, onbData.scelte || {});
  renderAlternative();
  document.getElementById('alt-sheet').classList.remove('hidden');
};
window.chiudiAlternative = function() { document.getElementById('alt-sheet').classList.add('hidden'); };
window.sceltaAlternativa = function(orig, nuovo) {
  if (!nuovo || nuovo === orig) delete altScelte[orig]; else altScelte[orig] = nuovo;
};
window.applicaAlternative = function() {
  onbData.scelte = Object.assign({}, altScelte);
  chiudiAlternative();
  renderOnb();
  const n = Object.keys(onbData.scelte).length;
  showUndo(n ? n + (n === 1 ? ' esercizio cambiato' : ' esercizi cambiati') : 'Esercizi del coach');
};
window.rimescolaAlternative = function() { chiudiAlternative(); altraVariante(); };
function renderAlternative() {
  const box = document.getElementById('alt-body');
  if (!box) return;
  const base = buildProgram(Object.assign({}, onbData, { scelte: {} }));
  box.innerHTML = '<div class="alt-intro">Cambia solo quelli che vuoi. Le alternative allenano lo stesso muscolo.</div>' +
    base.sedute.map(sd => '<div class="alt-day"><span>' + escapeHtml(sd.titolo) + '</span> · <span>' + sd.giorno + '</span></div>' +
      sd.esercizi.map(e => {
        const alt = alternativeDi(e.name, base.prefs, sd.esercizi);
        const sel = altScelte[e.name] || e.name;
        const id = 'alt-' + Math.random().toString(36).slice(2, 8);
        return '<div class="alt-row" data-no-tr><label for="' + id + '">' + escapeHtml(trEs(e.name)) + '</label>' +
          (alt.length
            ? '<select id="' + id + '" onchange="sceltaAlternativa(' + escapeHtml(JSON.stringify(e.name)) + ', this.value)">' +
                '<option value="' + escapeHtml(e.name) + '"' + (sel === e.name ? ' selected' : '') + '>' + escapeHtml(trEs(e.name)) + ' (' + tr('attuale') + ')</option>' +
                alt.map(x => '<option value="' + escapeHtml(x.name) + '"' + (sel === x.name ? ' selected' : '') + '>' + escapeHtml(trEs(x.name)) + '</option>').join('') +
              '</select>'
            : '<div class="alt-none">' + tr('Nessuna alternativa adatta con i tuoi attrezzi.') + '</div>') + '</div>';
      }).join('')).join('') +
    '<button class="btn-start-workout" onclick="applicaAlternative()">Applica le scelte</button>' +
    '<button class="set-row-btn" onclick="rimescolaAlternative()">Rimescola tutto</button>';
}
/* P3-M (D-P23): rifare il programma azzera il piano, non i progressi. Un esercizio gia svolto (con il consenso) compare nel piano nuovo con il suo carico di lavoro (caricoRiferimento: l ultima
   seduta non di scarico, entro 28 giorni; altrimenti l ultimo carico usato), non con la stima di partenza che applicaPartenze fa dal corpo e dagli altri esercizi (era il 20% sopra l ultimo carico
   di una donna di 52 anni: il Piano mostrava un peso che nessuno aveva sollevato). Chi decide la progressione e sempre caricoProssimo all apertura della seduta, che per un esercizio con
   lo storico non guarda questo peso. Senza storico (o a tempo, o a corpo libero) resta la stima. */
function caricoDelloStorico(e) {
  if (!coachAttivo()) return e;
  const u = pesoUltimoDi(e.name), kg = caricoRiferimento(e.name) || (u ? u.weight : 0);
  return kg > 0 ? Object.assign({}, e, { weight: kg }) : e;
}
/* P3-M (D-P23): la fase di una seduta vecchia (carico, scarico...) che la voce non ha scritto si ricava dal programma di adesso (faseSedutaSalvata, progressivo.js: «finche il programma c e»).
   Rifare il programma lo butta, e con lui il fatto che quella seduta era di scarico: la proposta di carico ripartirebbe dal peso dello scarico (82 kg di stacco rumeno diventavano 66,5 kg).
   Prima di sostituire il programma si scrive sulle voci che non l hanno la settimana e la fase (la stessa etichetta che scrive la fine seduta, MES-09, e che normalizeHistoryEntry conserva):
   nient altro cambia nel record, e dove il programma non sa niente (seduta fuori dalle sue settimane) non si scrive niente. Idempotente. Solo con il consenso. */
function fissaFasiDelloStorico() {
  const p = getProgramma();
  if (!coachAttivo() || !p || !p.inizio || !Array.isArray(p.fasi)) return;
  let lista = null;
  try { lista = JSON.parse(localStorage.getItem(historyKey()) || 'null'); } catch (e) { return; }
  if (!Array.isArray(lista)) return;
  let scritte = 0;
  lista.forEach(h => {
    if (!h || typeof h !== 'object' || (h.settimana && h.settimana.fase)) return;
    const d = dataSessione(h);
    if (!d) return;
    const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7) + 1, fase = w >= 1 && w <= p.fasi.length ? p.fasi[w - 1] : null;
    if (typeof fase === 'string' && fase) { h.settimana = { numero: w, fase: fase.slice(0, 20) }; scritte++; }
  });
  if (scritte) localStorage.setItem(historyKey(), JSON.stringify(lista));
}
window.applyGeneratedProgram = function() {
  /* INT-4b (B1): con la bandiera della gravidanza accesa la modalita prudente non si spegne nemmeno rispondendo «no» al PAR-Q del questionario rifatto: il programma nuovo e quello di chi e prudente */
  if (typeof inGravidanza === 'function' && inGravidanza(getProfile() || {})) onbData.parq = true;
  const prog = buildProgram(onbData);
  fissaFasiDelloStorico();   /* P3-M: prima di sostituire il programma */
  const profPrima = getProfile() || {};   /* il profilo di prima di questa creazione (P3-M: quello che il questionario non chiede si conserva) */
  const data = loadData();
  const titles = loadTitles();

  DAYS.forEach(g => { data[g] = []; });
  prog.sedute.forEach(s => {
    data[s.giorno] = s.esercizi.map(e => normalizeExerciseRecord(Object.assign({}, caricoDelloStorico(e), { completedSets: [] })));
    titles[s.giorno] = s.titolo;
  });
  saveData(data);
  saveTitles(titles);
  saveRestDays(prog.riposo.slice());

  /* Il programma parte dalla data scelta e si registra con quella data.
     Da li in avanti il vecchio programma viene ripulito, ma i giorni gia
     completati restano: sono storico. */
  const inizio = onbData.inizio === 'prossima' ? piuGiorni(lunediDi(new Date()), 7) : lunediDi(new Date());
  const cal = loadCal();
  const daQui = ymd(inizio);
  Object.keys(cal).forEach(k => { if (k >= daQui && !cal[k].done) delete cal[k]; });
  for (let w = 0; w < prog.settimane; w++) {
    const l = piuGiorni(inizio, w * 7);
    mettiSettimana(l, cal);
    if (prog.fasi[w] === 'scarico') {
      for (let i = 0; i < 7; i++) {
        const k = ymd(piuGiorni(l, i));
        if (cal[k] && !cal[k].rest && !cal[k].done) cal[k].title = cal[k].title + ' \u2022 scarico';
      }
    }
  }
  saveCal(cal);

  const salvato = {
    creato: formatNow(), inizio: ymd(inizio), settimane: prog.settimane, blocco: prog.blocco, fasi: prog.fasi,
    goals: prog.goals, prefs: prog.prefs, split: prog.split.nome, rirSett: prog.rirSett,
    schema: { sets: prog.scheme.sets, reps: prog.scheme.reps }, seme: prog.seme, ispirazioni: prog.ispirazioni
  };
  /* programma v2 (REG-04, W2-T4): versione, piano del mesociclo (pianoMesociclo), volume per unita (W2-T1), perche con codice (REG-03), modalita (FRZ-01, EST-01)
     e cardio. Un programma salvato dalla v1 non ha questi campi (nessun `piano`): chi li legge ricade sul comportamento di prima (rirPianoSettimana ritorna null) */
  if (prog.versione === 2) Object.assign(salvato, { versione: 2, piano: prog.piano || null, volume: prog.volume || null, perche: prog.perche || [], modalita: prog.modalita || 'generale', cardio: prog.cardio || null });
  localStorage.setItem(progKey(), JSON.stringify(salvato));
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(Object.assign({
    goal: prog.goals[0], goals: prog.goals, level: onbData.level, days: onbData.days, minutes: onbData.minutes,
    prefs: prog.prefs, sex: onbData.sex, age: onbData.age, bia: onbData.bia || profPrima.bia || onbData.bia, parq: onbData.parq === 'si' || onbData.parq === true,
    weight: onbData.weight, height: onbData.height, luogo: onbData.luogo, fastidi: onbData.fastidi, sonno: onbData.sonno, attrezzi: onbData.attrezzi,
    priorita: onbData.priorita || [], attrezziPalestra: onbData.attrezziPalestra !== undefined ? onbData.attrezziPalestra : ((getProfile() || {}).attrezziPalestra || null),
    graditi: onbData.graditi || (getProfile() || {}).graditi || [], odiati: onbData.odiati || (getProfile() || {}).odiati || [], cicloTraccia: (getProfile() || {}).cicloTraccia || false,
    psico: onbData.psico || (getProfile() || {}).psico || null,
    momento: (getProfile() || {}).momento || null,
    test: Object.assign({}, (getProfile() || {}).test || {}, onbData.test || {}), freq: onbData.freq || (getProfile() || {}).freq || null,
    esigenza: (getProfile() || {}).esigenza || null,
    orario: onbData.orario || (getProfile() || {}).orario || '', fase: onbData.fase || (getProfile() || {}).fase || '', cicli: onbData.cicli || 0, bloccoTipo: onbData.bloccoTipo || 'ipertrofia',
    settimane: prog.settimane, split: prog.split.nome, creato: formatNow()
  }, typeof attrezziSalvati === 'function' ? attrezziSalvati(onbData, getProfile() || {}) : {},   /* CAS-01 (W2-T5): attrezzi di casa, kg dei manubri, attrezzi in piu della palestra: solo se dichiarati */
    typeof forzaSalvata === 'function' ? forzaSalvata(onbData, getProfile() || {}, prog.goals) : {},   /* FRZ-01 (INT-2e): «Che forza?» e i punti deboli, solo con la forza come primo obiettivo e solo se detti */
    typeof gravidanzaDaRiportare === 'function' ? gravidanzaDaRiportare(profPrima) : {})));   /* INT-4b (B1): il profilo si riscrive da zero a ogni nuovo ciclo e a ogni questionario: la bandiera della gravidanza non si perde */
  /* P3-M: un referto uguale a quello gia nel profilo (nuovoCiclo lo ripassa) e gia nello storico dei referti: non si aggiunge una misura con la data di oggi */
  if (onbData.bia && Object.keys(onbData.bia).some(k => onbData.bia[k]) && JSON.stringify(onbData.bia) !== JSON.stringify(profPrima.bia)) {
    (onbData.bia.storico || []).forEach(x => { if (x.data !== onbData.bia.data) aggiungiBia(x.valori, x.data); });
    aggiungiBia(onbData.bia, onbData.bia.data);
  }
  localStorage.setItem(ONB_KEY, '1');
  /* un periodo difficile in corso resta: il nuovo piano parte gia alleggerito */
  const moAtt = (getProfile() || {}).momento, moNuovo = onbData.momentoNuovo;
  if (moNuovo || moAtt) {
    const pM = getProfile(); const idM = moNuovo || moAtt.id; delete pM.momento; localStorage.setItem(PROFILE_KEY(), JSON.stringify(pM));
    setMomento(idM, true);
  }

  currentDay = prog.sedute.length ? prog.sedute[0].giorno : DAYS[0];
  armedSet = null;
  selectedGroups = [];
  document.getElementById('onb').classList.add('hidden');
  renderDayBar(); renderPiano(); renderGruppi(); renderAllenamento();
  switchTab('piano');
  offriGuida();
  const quando = onbData.inizio === 'prossima' ? 'da luned\u00EC prossimo' : 'da questa settimana';
  showUndo(trP('Programma creato: %s, ' + prog.settimane + ' settimane %s', tr(prog.split.nome), tr(quando)), null, 6000);
};
