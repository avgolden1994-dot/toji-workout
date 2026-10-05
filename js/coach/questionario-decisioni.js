/* Questionario di fine allenamento e decisioni
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   QUESTIONARIO DI FINE ALLENAMENTO E DECISIONI DEL COACH
   A fine seduta l allievo dice in quattro tocchi com e andata: fatica
   della seduta (RPE di sessione, Foster), come era arrivato, come ha
   sentito i carichi e se qualcosa ha fatto male. Il coach decide con
   regole prese dalla letteratura:
   - DOLORE (modello di monitoraggio del dolore, Silbernagel 2007):
     fino a 3/10 si continua e si osserva; 4-5/10 si abbassa il carico
     del 10% sugli esercizi coinvolti; se torna nella stessa zona, o se
     e 6/10 o piu, l esercizio si SOSTITUISCE con una variante che
     carica meno quell articolazione (presa neutra, macchina, meno leva).
   - FATICA (autoregolazione e scarico reattivo, Bell 2022): due sedute
     su tre "al limite" o arrivando stanchi = scarico nella seduta
     successiva (serie -40%, carico -10%). Se continua per tre sedute
     su quattro il coach propone di togliere un giorno a settimana.
   - SENSAZIONE DEI CARICHI: leggeri e seduta facile = aumento extra la
     prossima volta; pesanti e seduta al limite = niente aumenti.
   Ogni decisione ha il suo motivo scritto ed e annullabile.
   ============================================================ */
const AGG_KEY = () => 'coach_plus_aggiusti_' + currentMode;
window.aggiustiCoach = function() {
  try { const a = JSON.parse(localStorage.getItem(AGG_KEY()) || 'null'); if (a) return a; } catch (e) {}
  return { esercizi: {}, scarico: null };
};
function salvaAggiusti(a) { try { localStorage.setItem(AGG_KEY(), JSON.stringify(a)); } catch (e) {} }

const ZONE_DOLORE = [
  ['spalla', 'Spalla'], ['gomito', 'Gomito'], ['polso', 'Polso'], ['schiena', 'Schiena bassa'],
  ['anca', 'Anca'], ['ginocchio', 'Ginocchio'], ['caviglia', 'Caviglia']
];
/* preposizione articolata e articolo per ogni zona: "al gomito", "l’anca" */
const ZONA_ART = { spalla: ['alla ', 'la '], gomito: ['al ', 'il '], polso: ['al ', 'il '], schiena: ['alla ', 'la '], anca: ['all’', 'l’'], ginocchio: ['al ', 'il '], caviglia: ['alla ', 'la '] };
function zonaA(z, nome) { return (ZONA_ART[z] || ['a ', ''])[0] + nome; }
function zonaIl(z, nome) { return (ZONA_ART[z] || ['', ''])[1] + nome; }
/* quali esercizi caricano di piu ogni articolazione */
const STRESS_ZONA = {
  spalla: ['Panca Piana Bilanciere', 'Panca Inclinata Bilanciere', 'Panca Declinata', 'Dip alle Parallele', 'Military Press', 'Lento Avanti Manubri', 'Arnold Press', 'Tirate al Mento (Upright Row)', 'Croci su Panca Manubri', 'Trazioni alla Sbarra (Pull-ups)', 'Dip su Panca', 'Pullover con Manubrio', 'Alzate Frontali'],
  gomito: ['French Press', 'Curl Bilanciere Bicipiti', 'Panca Presa Stretta', 'Dip su Panca', 'Trazioni Presa Inversa (Chin-up)', 'Curl su Panca Scott'],
  polso: ['Curl Bilanciere Bicipiti', 'Front Squat', 'Panca Piana Bilanciere', 'Panca Presa Stretta', 'Piegamenti a Terra (Push-up)'],
  schiena: ['Stacco da Terra (Deadlift)', 'Rematore con Bilanciere', 'Good Morning', 'Squat con Bilanciere', 'T-Bar Row', 'Stacco Rumeno', 'Military Press', 'Stacco Sumo', 'Hyperextension (Lombari)'],
  anca: ['Squat con Bilanciere', 'Affondi Bulgari', 'Stacco Sumo', 'Affondi in Camminata', 'Hip Thrust', 'Leg Press', 'Squat Sumo'],
  ginocchio: ['Squat con Bilanciere', 'Front Squat', 'Hack Squat', 'Affondi Manubri', 'Affondi in Camminata', 'Affondi Bulgari', 'Step-up su Panca', 'Leg Extension', 'Leg Press', 'Goblet Squat', 'Squat Sumo'],
  caviglia: ['Calf Raise in Piedi', 'Affondi in Camminata', 'Step-up su Panca', 'Mountain Climber', 'Squat con Bilanciere']
};
/* la variante che risolve il problema: meno leva, presa neutra,
   traiettoria guidata o carico spostato su un altra articolazione */
const SOSTITUZIONI = {
  spalla: { 'Panca Piana Bilanciere': 'Chest Press Machine', 'Panca Inclinata Bilanciere': 'Panca Inclinata Manubri', 'Panca Declinata': 'Chest Press Machine',
    'Dip alle Parallele': 'Pushdown Tricipiti ai Cavi', 'Military Press': 'Shoulder Press Machine', 'Lento Avanti Manubri': 'Shoulder Press Machine',
    'Arnold Press': 'Shoulder Press Machine', 'Tirate al Mento (Upright Row)': 'Alzate Laterali', 'Croci su Panca Manubri': 'Croci ai Cavi',
    'Trazioni alla Sbarra (Pull-ups)': 'Lat Machine Presa Inversa', 'Dip su Panca': 'Pushdown Tricipiti ai Cavi', 'Pullover con Manubrio': 'Pullover ai Cavi', 'Alzate Frontali': 'Face Pull' },
  gomito: { 'French Press': 'Pushdown Tricipiti ai Cavi', 'Curl Bilanciere Bicipiti': 'Hammer Curl', 'Panca Presa Stretta': 'Pushdown Tricipiti ai Cavi',
    'Dip su Panca': 'Kickback Tricipiti', 'Trazioni Presa Inversa (Chin-up)': 'Lat Machine', 'Curl su Panca Scott': 'Curl ai Cavi' },
  polso: { 'Curl Bilanciere Bicipiti': 'Hammer Curl', 'Front Squat': 'Goblet Squat', 'Panca Piana Bilanciere': 'Chest Press Machine',
    'Panca Presa Stretta': 'Pushdown Tricipiti ai Cavi', 'Piegamenti a Terra (Push-up)': 'Chest Press Machine' },
  schiena: { 'Stacco da Terra (Deadlift)': 'Hip Thrust', 'Rematore con Bilanciere': 'Pulley Basso', 'Good Morning': 'Leg Curl Sdraiato',
    'Squat con Bilanciere': 'Leg Press', 'T-Bar Row': 'Pulley Basso', 'Stacco Rumeno': 'Leg Curl Sdraiato', 'Military Press': 'Shoulder Press Machine',
    'Stacco Sumo': 'Hip Thrust', 'Hyperextension (Lombari)': 'Ponte Glutei' },
  anca: { 'Squat con Bilanciere': 'Leg Press', 'Affondi Bulgari': 'Leg Press', 'Stacco Sumo': 'Stacco Rumeno', 'Affondi in Camminata': 'Leg Press',
    'Hip Thrust': 'Ponte Glutei', 'Leg Press': 'Leg Extension', 'Squat Sumo': 'Adductor Machine' },
  ginocchio: { 'Squat con Bilanciere': 'Hip Thrust', 'Front Squat': 'Hip Thrust', 'Hack Squat': 'Hip Thrust', 'Affondi Manubri': 'Stacco Rumeno',
    'Affondi in Camminata': 'Stacco Rumeno', 'Affondi Bulgari': 'Hip Thrust', 'Step-up su Panca': 'Ponte Glutei', 'Leg Extension': 'Leg Curl Seduto',
    'Leg Press': 'Hip Thrust', 'Goblet Squat': 'Stacco Rumeno', 'Squat Sumo': 'Adductor Machine' },
  caviglia: { 'Calf Raise in Piedi': 'Calf Raise Seduto', 'Affondi in Camminata': 'Leg Press', 'Step-up su Panca': 'Leg Press',
    'Mountain Climber': 'Plank', 'Squat con Bilanciere': 'Leg Press' }
};
const senzaEmoji = (n) => String(n).replace(EMOJI_TESTA, '');
function nomeInLibreria(pulito) {
  const m = EXERCISE_LIBRARY.find(e => senzaEmoji(e.name) === pulito);
  return m ? m.name : null;
}

let fbState = null;
window.apriQuestionario = function(entry) {
  fbState = { id: entry.id, day: entry.day, esercizi: (entry.sessione || []).map(e => e.name),
    srpe: null, arrivo: null, carichi: null, dolore: null, zone: [], livello: 3, coinvolti: [] };
  const b = document.getElementById('fb-send');
  b.onclick = () => inviaQuestionario();
  const salta = document.querySelector('#fb-sheet .sheet-footer .og-link');
  if (salta) salta.style.display = '';
  renderQuestionario();
  document.getElementById('fb-sheet').classList.remove('hidden');
};
window.fbSet = function(k, v) {
  fbState[k] = v;
  if (k === 'dolore' && !v) { fbState.zone = []; fbState.coinvolti = []; }
  renderQuestionario();
};
window.fbZona = function(z) {
  const i = fbState.zone.indexOf(z);
  if (i === -1) {
    fbState.zone.push(z);
    /* preseleziona gli esercizi di oggi che caricano quella zona */
    fbState.esercizi.forEach(n => { if ((STRESS_ZONA[z] || []).indexOf(senzaEmoji(n)) !== -1 && fbState.coinvolti.indexOf(n) === -1) fbState.coinvolti.push(n); });
  } else fbState.zone.splice(i, 1);
  renderQuestionario();
};
window.fbEsercizio = function(i) {
  const n = fbState.esercizi[i];
  const j = fbState.coinvolti.indexOf(n);
  if (j === -1) fbState.coinvolti.push(n); else fbState.coinvolti.splice(j, 1);
  renderQuestionario();
};
window.fbLivello = function(v) { fbState.livello = Number(v); const l = document.getElementById('fb-liv'); if (l) l.innerText = fbState.livello + '/10 • ' + etichettaDolore(fbState.livello); };
function etichettaDolore(v) { return v <= 3 ? 'lieve' : (v <= 5 ? 'moderato' : 'forte'); }

function fbScelta(k, opzioni) {
  return '<div class="fb-opts">' + opzioni.map(([v, l, d]) =>
    '<button class="fb-opt' + (fbState[k] === v ? ' on' : '') + '" onclick="fbSet(\'' + k + '\', ' + (typeof v === 'string' ? '\'' + v + '\'' : v) + ')">' +
    '<b>' + l + '</b>' + (d ? '<small>' + d + '</small>' : '') + '</button>').join('') + '</div>';
}
function renderQuestionario() {
  const f = fbState;
  let h = '<div class="fb-intro">Quattro tocchi: il coach usa le tue risposte per decidere carichi, varianti e recupero.</div>' +
    '<div class="fb-q">1. Quanto è stata dura la seduta?</div>' +
    fbScelta('srpe', [[4, 'Facile', 'RPE 1–4'], [7, 'Giusta', 'RPE 5–7'], [9, 'Dura', 'RPE 8–9'], [10, 'Al limite', 'RPE 10']]) +
    '<div class="fb-q">2. Come ci sei arrivato?</div>' +
    fbScelta('arrivo', [['riposato', 'Riposato'], ['normale', 'Normale'], ['stanco', 'Stanco']]) +
    '<div class="fb-q">3. Come hai sentito i carichi?</div>' +
    fbScelta('carichi', [['leggeri', 'Leggeri'], ['giusti', 'Giusti'], ['pesanti', 'Pesanti']]) +
    '<div class="fb-q">4. Qualcosa ti ha fatto male?</div>' +
    fbScelta('dolore', [[false, 'No'], [true, 'Sì']]);
  if (f.dolore) {
    h += '<div class="fb-sub">Dove?</div><div class="fb-chips">' + ZONE_DOLORE.map(([z, l]) =>
      '<button class="fb-chip' + (f.zone.indexOf(z) !== -1 ? ' on' : '') + '" onclick="fbZona(\'' + z + '\')">' + l + '</button>').join('') + '</div>' +
      '<div class="fb-sub">Quanto, da 0 a 10? <b id="fb-liv">' + f.livello + '/10 • ' + etichettaDolore(f.livello) + '</b></div>' +
      '<input type="range" class="fb-range" min="1" max="10" step="1" value="' + f.livello + '" oninput="fbLivello(this.value)" aria-label="Intensità del dolore">' +
      '<div class="fb-scale"><span>fastidio</span><span>moderato</span><span>forte</span></div>' +
      (f.esercizi.length ? '<div class="fb-sub">Durante quali esercizi?</div><div class="fb-chips">' + f.esercizi.map((n, i) =>
        '<button class="fb-chip' + (f.coinvolti.indexOf(n) !== -1 ? ' on' : '') + '" onclick="fbEsercizio(' + i + ')">' + escapeHtml(senzaEmoji(n)) + '</button>').join('') + '</div>' : '');
  }
  document.getElementById('fb-body').innerHTML = h;
  const ok = f.srpe !== null && f.arrivo !== null && f.carichi !== null && f.dolore !== null && (!f.dolore || f.zone.length);
  const b = document.getElementById('fb-send');
  b.disabled = !ok;
  b.innerText = ok ? 'Invia al coach' : 'Rispondi alle domande';
}
window.chiudiQuestionario = function() {
  document.getElementById('fb-sheet').classList.add('hidden');
  fbState = null;
};

/* Il cuore: dalle risposte alle decisioni. Funzione pura sui dati salvati,
   cosi e verificabile dai test. */
window.decisioniCoach = function(fb, storicoFeedback) {
  const out = [];
  const prec = (storicoFeedback || []).filter(Boolean);   /* dal piu recente */
  const ultimi3 = [fb].concat(prec.slice(0, 2));
  const ultimi4 = [fb].concat(prec.slice(0, 3));
  const pesante = (x) => x.srpe >= 9 || x.arrivo === 'stanco';

  /* dolore */
  if (fb.dolore && fb.zone.length) {
    fb.zone.forEach(z => {
      const tornato = prec.slice(0, 2).some(p => p.dolore && (p.zone || []).indexOf(z) !== -1 && (p.livello || 0) >= 4);
      /* dolore che cresce di seduta in seduta nella stessa zona (Silbernagel) */
      const storiaZona = prec.filter(p => p.dolore && (p.zone || []).indexOf(z) !== -1).slice(0, 2).map(p => p.livello || 0);
      const cresce = storiaZona.length >= 2 && fb.livello > storiaZona[0] && storiaZona[0] > storiaZona[1];
      if (cresce) out.push({ tipo: 'medico', testo: 'Il dolore ' + zonaA(z, (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1].toLowerCase()) + ' cresce di seduta in seduta: fatti vedere da un fisioterapista.' });
      const coinvolti = (fb.coinvolti.length ? fb.coinvolti : fb.esercizi)
        .filter(n => (STRESS_ZONA[z] || []).indexOf(senzaEmoji(n)) !== -1 || fb.coinvolti.indexOf(n) !== -1);
      const zNome = (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1].toLowerCase();
      if (fb.livello <= 3) {
        out.push({ tipo: 'osserva', testo: 'Fastidio lieve ' + zonaA(z, zNome) + ' (' + fb.livello + '/10): si continua. Se domattina è peggio del solito, segnalalo la prossima volta.' });
        return;
      }
      coinvolti.forEach(n => {
        const variante = (SOSTITUZIONI[z] || {})[senzaEmoji(n)];
        const nomeV = variante ? nomeInLibreria(variante) : null;
        if ((fb.livello >= 6 || tornato) && nomeV) {
          out.push({ tipo: 'sostituisci', esercizio: n, variante: nomeV, zona: z,
            testo: senzaEmoji(n) + ' → ' + variante + ': ' + (fb.livello >= 6 ? 'dolore forte' : 'il dolore ' + zonaA(z, zNome) + ' è tornato') + ', la variante carica meno ' + zonaIl(z, zNome) + '.' });
        } else {
          out.push({ tipo: 'carico', esercizio: n, fattore: fb.livello >= 6 ? 0.8 : 0.9, sedute: 2, zona: z, zNome: zNome, livello: fb.livello, alteRip: z === 'gomito' || z === 'ginocchio',
            testo: senzaEmoji(n) + ': carico ' + (fb.livello >= 6 ? '-20%' : '-10%') + ' per due sedute, per il dolore ' + zonaA(z, zNome) + '.' });
        }
      });
      if (fb.livello >= 6) out.push({ tipo: 'medico', testo: 'Dolore forte: se non passa in pochi giorni o peggiora, fatti vedere da un medico o da un fisioterapista.' });
    });
  }

  /* fatica e recupero */
  const pesanti3 = ultimi3.filter(pesante).length;
  const pesanti4 = ultimi4.filter(pesante).length;
  if (pesanti4 >= 3 && prec.length >= 3) {
    out.push({ tipo: 'frequenza', testo: 'Tre sedute su quattro al limite o arrivando stanco: il recupero non basta. Il coach propone di togliere un allenamento a settimana.' });
  }
  if (pesanti3 >= 2) {
    out.push({ tipo: 'scarico', testo: 'Fatica accumulata: la prossima seduta è di scarico (serie -40%, carico -10%) per ricaricare le energie.' });
  } else if (fb.carichi === 'pesanti' && fb.srpe >= 9) {
    out.push({ tipo: 'blocca', testo: 'Carichi pesanti e seduta al limite: la prossima volta nessun aumento, consolida prima.' });
  } else if (fb.carichi === 'leggeri' && fb.srpe <= 5 && !fb.dolore) {
    out.push({ tipo: 'extra', testo: 'Carichi leggeri e seduta facile: la prossima volta un aumento in più dove hai completato tutte le serie.' });
  }
  if (!out.length) out.push({ tipo: 'ok', testo: 'Seduta nella norma: il programma prosegue come previsto.' });
  return out;
};

/* applica le decisioni ai dati; restituisce la funzione per annullare */
function applicaDecisioni(dec, fb) {
  const primaDati = localStorage.getItem(dataKey());
  const primaAgg = localStorage.getItem(AGG_KEY());
  const primaRest = localStorage.getItem(restKey());
  const ag = aggiustiCoach();
  const data = loadData();
  dec.forEach(d => {
    if (d.tipo === 'carico') {
      ag.esercizi[d.esercizio] = { fattore: d.fattore, sedute: d.sedute, alteRip: !!d.alteRip, motivo: 'Dolore segnalato: carico ridotto (' + Math.round((1 - d.fattore) * 100) + '%)' };
      /* dolore moderato: domattina il coach chiede se e tornato normale (Silbernagel) */
      if (d.fattore >= 0.9 && d.zona) {
        const c = ag.controlloDolore && ag.controlloDolore.dal === ymd(new Date()) ? ag.controlloDolore : { dal: ymd(new Date()), zone: {}, esercizi: [] };
        c.zone[d.zona] = d.zNome;
        if (c.esercizi.indexOf(d.esercizio) === -1) c.esercizi.push(d.esercizio);
        ag.controlloDolore = c;
      }
    }
    if (d.tipo === 'blocca' || d.tipo === 'extra') fb.esercizi.forEach(n => { if (!ag.esercizi[n]) ag.esercizi[n] = { [d.tipo]: true, sedute: 1 }; });
    if (d.tipo === 'scarico') ag.scarico = { sedute: 1, motivo: 'fatica accumulata nelle ultime sedute' };
    if (d.tipo === 'sostituisci') {
      const lib = findExercise(d.variante);
      DAYS.forEach(g => (data[g] || []).forEach(e => {
        if (e.name !== d.esercizio) return;
        e.name = d.variante;
        if (lib) { const pp = pesoPartenza(d.variante); e.weight = pp.peso; e.stimato = pp.stimato ? pp.fonte : undefined; e.completedSets = e.completedSets.map(sx => Object.assign({}, sx, { weight: pp.peso, done: false })); }
        e.coachNote = 'Variante scelta dal coach: ' + senzaEmoji(d.esercizio) + ' dava dolore';
        e.coachTipo = 'scarico';
      }));
      ag.esercizi[d.variante] = { nota: 'Variante scelta dal coach al posto di ' + senzaEmoji(d.esercizio), sedute: 1 };
    }
  });
  saveData(data);
  salvaAggiusti(ag);
  return () => {
    if (primaDati !== null) localStorage.setItem(dataKey(), primaDati);
    if (primaAgg !== null) localStorage.setItem(AGG_KEY(), primaAgg); else localStorage.removeItem(AGG_KEY());
    if (primaRest !== null) localStorage.setItem(restKey(), primaRest); else localStorage.removeItem(restKey());
    renderPiano(); renderAllenamento();
  };
}

/* toglie il giorno di allenamento piu leggero: diventa riposo (annullabile) */
window.riduciFrequenza = function() {
  const data = loadData();
  const giorni = DAYS.filter(d => !isRestDay(d) && (data[d] || []).length);
  if (giorni.length <= 2) { showUndo('Ti alleni già due volte a settimana: meglio ridurre le serie che i giorni'); return; }
  const piuLeggero = giorni.slice().sort((a, b) => (data[a] || []).reduce((t, e) => t + e.sets, 0) - (data[b] || []).reduce((t, e) => t + e.sets, 0))[0];
  const r = loadRestDays(); r.push(piuLeggero); saveRestDays(r);
  renderPiano();
  const btn = document.getElementById('fb-freq-btn'); if (btn) { btn.disabled = true; btn.innerText = getDayTitle(piuLeggero) + ' ora è riposo'; }
  showUndo(trP('%s diventa giorno di riposo', tr(getDayTitle(piuLeggero))), () => { const r2 = loadRestDays().filter(x => x !== piuLeggero); saveRestDays(r2); renderPiano(); });
};

window.inviaQuestionario = function() {
  const f = fbState;
  if (!f) return;
  const fb = { srpe: f.srpe, arrivo: f.arrivo, carichi: f.carichi, dolore: !!f.dolore, zone: f.zone.slice(), livello: f.dolore ? f.livello : 0,
    coinvolti: f.coinvolti.slice(), esercizi: f.esercizi.slice() };
  const hist = loadHistory();
  const i = hist.findIndex(h => h.id === f.id);
  const precedenti = hist.filter(h => h.id !== f.id && h.feedback).map(h => h.feedback);
  if (i !== -1) { hist[i].feedback = fb; saveHistory(hist); }
  const dec = decisioniCoach(fb, precedenti);
  const annulla = applicaDecisioni(dec, fb);
  const ico = { sostituisci: '⇄', carico: '↓', scarico: '↻', blocca: '‖', extra: '↑', frequenza: '−', medico: '!', osserva: '•', ok: '✓' };
  document.getElementById('fb-body').innerHTML =
    '<div class="fb-dec-title">Il coach ha deciso</div>' +
    dec.map(d => '<div class="fb-dec ' + d.tipo + '"><span class="fb-dec-ico">' + ico[d.tipo] + '</span><span>' + escapeHtml(d.testo) + '</span></div>').join('') +
    (dec.some(d => d.tipo === 'frequenza') ? '<button class="set-row-btn" id="fb-freq-btn" onclick="riduciFrequenza()">Togli un allenamento a settimana</button>' : '') +
    '<button class="btn-archive" onclick="(' + 'window.__fbAnnulla && window.__fbAnnulla()' + ')">Annulla le decisioni</button>';
  window.__fbAnnulla = () => { annulla(); showUndo('Decisioni annullate: il programma resta com era'); chiudiQuestionario(); };
  const b = document.getElementById('fb-send');
  b.disabled = false; b.innerText = 'Fatto';
  b.onclick = () => chiudiQuestionario();
  const salta = document.querySelector('#fb-sheet .sheet-footer .og-link');
  if (salta) salta.style.display = 'none';
  renderPiano(); renderAllenamento();
};
