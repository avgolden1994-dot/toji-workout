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
window.applyGeneratedProgram = function() {
  const prog = buildProgram(onbData);
  const data = loadData();
  const titles = loadTitles();

  DAYS.forEach(g => { data[g] = []; });
  prog.sedute.forEach(s => {
    data[s.giorno] = s.esercizi.map(e => normalizeExerciseRecord(Object.assign({}, e, { completedSets: [] })));
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
    prefs: prog.prefs, sex: onbData.sex, age: onbData.age, bia: onbData.bia, parq: onbData.parq === 'si' || onbData.parq === true,
    weight: onbData.weight, height: onbData.height, luogo: onbData.luogo, fastidi: onbData.fastidi, sonno: onbData.sonno, attrezzi: onbData.attrezzi,
    priorita: onbData.priorita || [], attrezziPalestra: onbData.attrezziPalestra !== undefined ? onbData.attrezziPalestra : ((getProfile() || {}).attrezziPalestra || null),
    graditi: onbData.graditi || (getProfile() || {}).graditi || [], odiati: onbData.odiati || (getProfile() || {}).odiati || [], cicloTraccia: (getProfile() || {}).cicloTraccia || false,
    psico: onbData.psico || (getProfile() || {}).psico || null,
    momento: (getProfile() || {}).momento || null,
    test: Object.assign({}, (getProfile() || {}).test || {}, onbData.test || {}), freq: onbData.freq || (getProfile() || {}).freq || null,
    esigenza: (getProfile() || {}).esigenza || null,
    orario: onbData.orario || (getProfile() || {}).orario || '', fase: onbData.fase || (getProfile() || {}).fase || '', cicli: onbData.cicli || 0, bloccoTipo: onbData.bloccoTipo || 'ipertrofia',
    settimane: prog.settimane, split: prog.split.nome, creato: formatNow()
  }, typeof attrezziSalvati === 'function' ? attrezziSalvati(onbData, getProfile() || {}) : {})));   /* CAS-01 (W2-T5): attrezzi di casa, kg dei manubri, attrezzi in piu della palestra: solo se dichiarati */
  if (onbData.bia && Object.keys(onbData.bia).some(k => onbData.bia[k])) {
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
