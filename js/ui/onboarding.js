/* Schermata iniziale: creazione del programma
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHERMATA INIZIALE: creazione del programma personalizzato
   Regole prese dalla letteratura e dalla pratica dei preparatori:
   - principianti 2-3 sedute full body, intermedi 3-4 upper/lower,
     avanzati 4-6 push/pull/legs
   - ogni gruppo muscolare 2 volte a settimana e' il punto di equilibrio
   - forza: 2-6 ripetizioni, recuperi lunghi; ipertrofia: 8-12
   - dimagrimento: 3-4 sedute di forza + cardio
   - oltre i 90 minuti di seduta il recupero peggiora
   - la periodizzazione lineare e' la piu adatta a chi inizia
   ============================================================ */
const ONB_KEY = 'tz_onboarded';
const PROFILE_KEY = () => 'coach_plus_profile_' + currentMode;

let onbStep = 0;
let onbData = { goals: [], goal: null, level: null, days: null, minutes: null, luogo: null, fastidi: [], sonno: null, attrezzi: null, parq: null, sex: null, age: null, height: null, weight: null, bia: null };

const ONB_GOALS = [
  { id: 'massa',   emoji: ico('manubrio'), name: 'Massa muscolare', desc: '8-12 ripetizioni, carichi progressivi' },
  { id: 'dimagrimento', emoji: '\u{1F525}', name: 'Dimagrimento', desc: 'forza + cardio, ripetizioni medio-alte' },
  { id: 'forza',   emoji: ico('bilanciere'), name: 'Forza', desc: '2-6 ripetizioni, recuperi lunghi' },
  { id: 'ricomposizione', emoji: '\u2696\uFE0F', name: 'Ricomposizione', desc: 'più muscolo, meno grasso: quello che molti chiamano tonificare' }   /* OBI-07 */,
  { id: 'salute',  emoji: '\u2764\uFE0F', name: 'Salute e forma', desc: 'movimento costante, senza estremi' },
  { id: 'glutei',  emoji: '\u2728', name: 'Glutei', desc: 'quattro famiglie di esercizi, 9-15 serie a settimana' }
];

const ONB_LEVELS = [
  { id: 'principiante', emoji: '\u{1F331}', name: 'Principiante', desc: 'meno di 6 mesi, o riparto da zero' },
  { id: 'intermedio',   emoji: '\u{1F33F}', name: 'Intermedio', desc: 'da 6 mesi a 2 anni, con costanza' },
  { id: 'avanzato',     emoji: '\u{1F333}', name: 'Avanzato', desc: 'oltre 2 anni, tecnica solida' }
];

/* Schema settimanale per livello e giorni disponibili */
function splitFor(level, days) {
  if (days <= 2) return { nome: 'Full Body', giorni: ['fullbody', 'fullbody'] };
  if (level === 'principiante') {
    if (days === 3) return { nome: 'Full Body 3x', giorni: ['fullbody', 'fullbody', 'fullbody'] };
    return { nome: 'Upper / Lower', giorni: ['upper', 'lower', 'upper', 'lower'] };
  }
  /* ABB-05, 3 giorni: Upper / Lower / Full Body, cosi ogni muscolo si allena 2 volte (ACSM 2026) e nessun muscolo supera
     le circa 11 serie in una seduta (Pelland 2025). Il Push / Pull / Legs una volta sola resta per chi sceglie la frequenza 1 */
  if (level === 'intermedio') {
    if (days === 3) return { nome: 'Upper / Lower / Full Body', giorni: ['upper', 'lower', 'fullbody'] };
    if (days === 4) return { nome: 'Upper / Lower x2', giorni: ['upper', 'lower', 'upper', 'lower'] };
    if (days >= 6) return { nome: 'Push / Pull / Legs x2', giorni: ['push', 'pull', 'legs', 'push', 'pull', 'legs'] };
    return { nome: 'Push / Pull / Legs + Upper / Lower', giorni: ['push', 'pull', 'legs', 'upper', 'lower'] };
  }
  if (days === 3) return { nome: 'Upper / Lower / Full Body', giorni: ['upper', 'lower', 'fullbody'] };
  if (days === 4) return { nome: 'Upper / Lower x2', giorni: ['upper', 'lower', 'upper', 'lower'] };
  if (days === 5) return { nome: 'Push / Pull / Legs + Upper / Lower', giorni: ['push', 'pull', 'legs', 'upper', 'lower'] };
  return { nome: 'Push / Pull / Legs x2', giorni: ['push', 'pull', 'legs', 'push', 'pull', 'legs'] };
}

/* Frequenza scelta dall utente: quante volte a settimana ogni muscolo.
   A parita di serie la frequenza cambia poco la crescita (Schoenfeld 2019,
   Ramos-Campo 2024): si rispetta la preferenza, conta il volume totale. */
function splitPerFrequenza(level, days, freq) {
  const f = String(freq || 'auto');
  days = Number(days) || 3;
  if (f === '1') {
    if (days <= 2) return { nome: 'Upper / Lower', giorni: ['upper', 'lower'], freq: 1 };
    const g = ['push', 'pull', 'legs'];
    for (let i = 3; i < days; i++) g.push('punti');
    return { nome: days === 3 ? 'Push / Pull / Legs' : 'Push / Pull / Legs + punti deboli', giorni: g, freq: 1 };
  }
  if (f === '2') {
    if (days <= 2) return { nome: 'Full Body', giorni: ['fullbody', 'fullbody'], freq: 2 };
    if (days === 3) return { nome: 'Upper / Lower / Full Body', giorni: ['upper', 'lower', 'fullbody'], freq: 2 };
    if (days === 4) return { nome: 'Upper / Lower x2', giorni: ['upper', 'lower', 'upper', 'lower'], freq: 2 };
    if (days === 5) return { nome: 'Push / Pull / Legs + Upper / Lower', giorni: ['push', 'pull', 'legs', 'upper', 'lower'], freq: 2 };
    return { nome: 'Push / Pull / Legs x2', giorni: ['push', 'pull', 'legs', 'push', 'pull', 'legs'], freq: 2 };
  }
  if (f === '3') {
    if (days <= 2) return { nome: 'Full Body', giorni: ['fullbody', 'fullbody'], freq: 2, limite: true };
    if (days === 3) return { nome: 'Full Body 3x', giorni: ['fullbody', 'fullbody', 'fullbody'], freq: 3 };
    if (days === 4) return { nome: 'Full Body + Upper / Lower', giorni: ['fullbody', 'upper', 'lower', 'fullbody'], freq: 3 };
    if (days === 5) return { nome: 'Upper / Lower + Full Body', giorni: ['upper', 'lower', 'fullbody', 'upper', 'lower'], freq: 3 };
    return { nome: 'Upper / Lower x3', giorni: ['upper', 'lower', 'upper', 'lower', 'upper', 'lower'], freq: 3 };
  }
  return splitFor(level, days);
}
/* scegliSplit(brief): la divisione della settimana dal livello, dai giorni e dalla frequenza scelta (stadio 5 del generatore, piano B.3). Oggi e splitPerFrequenza;
   un metodo famoso o la modalita forza/estetica (specialitaStruttura) possono sostituirla in regia/genera.js; la riscrive W2-T5. */
function scegliSplit(brief) {
  return splitPerFrequenza(brief.chi.livello, brief.agenda.giorni, brief.agenda.freqScelta);
}
/* giorno dei punti deboli: i muscoli su cui punti, altrimenti i piccoli gruppi */
const SLOT_PRIORITA = { petto: ['spintaO', 'isoPetto'], schiena: ['tirataV', 'tirataO'], spalle: ['isoDeltL', 'spintaV', 'isoDeltP'],
  braccia: ['isoBic', 'isoTri'], gambe: ['isoQuad', 'isoFem', 'isoPolp'], glutei: ['glutSpinta', 'unilaterale'], core: ['core'] };
function ricettaPunti(priorita) {
  const out = [];
  (priorita || []).forEach(g => (SLOT_PRIORITA[g] || []).forEach(x => { if (out.indexOf(x) === -1) out.push(x); }));
  ['isoDeltL', 'isoBic', 'isoTri', 'isoDeltP', 'isoPolp', 'core'].forEach(x => { if (out.indexOf(x) === -1) out.push(x); });
  return out;
}

/* Serie, ripetizioni e recuperi per obiettivo */
function schemeFor(goal) {
  /* forza: 3-6 rip a ~80%, pause lunghe, 3-5 RIR (Robinson 2024, ACSM 2026) */
  if (goal === 'forza')         return { sets: 5, reps: 5,  restCompound: 210, restIso: 90,  settimane: 8,  nota: 'Carichi alti e poche ripetizioni, lasciando 3-5 ripetizioni in riserva: il recupero lungo serve a esprimere forza.' };
  /* massa: 10-20 serie a settimana, 6-30 rip vicino al cedimento, pause >= 90 s (Pelland 2025, Singer 2024) */
  if (goal === 'massa')         return { sets: 4, reps: 10, restCompound: 150, restIso: 75,  settimane: 10, nota: 'Da 8 a 12 ripetizioni vicino al cedimento, con aumento graduale del carico.' };
  /* dimagrimento: si tengono i carichi, pause normali; il fiatone si fa con passi e cardio (Roth 2023) */
  if (goal === 'dimagrimento')  return { sets: 3, reps: 12, restCompound: 105, restIso: 60,  settimane: 8,  nota: 'Si tengono i carichi per salvare il muscolo; il dispendio arriva da passi e cardio nei giorni liberi.' };
  if (goal === 'ricomposizione')return { sets: 3, reps: 10, restCompound: 120, restIso: 75,  settimane: 12, nota: 'Carichi da massa con un volume moderato: si costruisce muscolo mentre il grasso scende piano.' };
  if (goal === 'glutei')        return { sets: 3, reps: 12, restCompound: 120, restIso: 60,  settimane: 10, nota: 'Quattro famiglie per i glutei: spinta d anca, squat e affondi, stacchi, abduzioni. 9-15 serie a settimana.' };
  /* salute: ACSM 2026, tutti i gruppi 2 volte, 2-3 RIR, circa 10 serie */
  return { sets: 3, reps: 10, restCompound: 90, restIso: 60, settimane: 8, nota: 'Tutti i gruppi due volte a settimana, lasciando 2-3 ripetizioni in riserva: il programma migliore e quello che segui.' };
}

/* PRG-03 (B1, ponte di W0-T2): quanti esercizi per seduta (PARAM_NUMERO_ESERCIZI, serieEffettive, pausaMediaPerTipo, stimaEsercizi; il sinonimo exerciseCountFor)
   stanno in js/coach/volume/tempo.js dal generatore a stadi (W1-T4): il tempo e un tetto e li decide il Dosatore. */

/* ETA-01 (D-P9, ponte di W0-T2; assorbe REC-11): l eta e obbligatoria prima del programma; sotto 13 anni nessun programma;
   13-17 anni profilo minorenne (ETA-02, ETA-03: brief.js e prescriviSerie). Una sola funzione per l onboarding, per Opzioni e per buildProgram.
   Soglia 13 = decisione dell utente; la soglia legale dei dati (14 in Italia) e un tema separato (registro G.1). */
const PARAM_ETA = { min: 13, max: 99, maggiorenne: 18 };
const MSG_ETA_SOTTO_MINIMO = 'Sotto i 13 anni il coach non crea programmi: allenati con un adulto esperto.';
const MSG_ETA_MANCANTE = 'Inserisci la tua età (da 13 a 99 anni): serve per scegliere pesi e ritmo giusti.';
function etaPerProgramma(eta) {
  const vuota = eta === null || eta === undefined || (typeof eta === 'string' && eta.trim() === '');
  const n = Number(eta);
  if (vuota || !isFinite(n) || n !== Math.floor(n) || n > PARAM_ETA.max) return { ok: false, motivo: 'mancante', minore: false, messaggio: MSG_ETA_MANCANTE };
  if (n < PARAM_ETA.min) return { ok: false, motivo: n < 1 ? 'mancante' : 'sotto-minimo', minore: false, messaggio: n < 1 ? MSG_ETA_MANCANTE : MSG_ETA_SOTTO_MINIMO };
  return { ok: true, motivo: n < PARAM_ETA.maggiorenne ? 'minorenne' : 'adulto', minore: n < PARAM_ETA.maggiorenne, messaggio: '' };
}

window.startOnboarding = function(force) {
  if (!coachAttivo()) return false;   /* senza consenso il coach non usa i tuoi dati */
  if (!force && localStorage.getItem(ONB_KEY) === '1') return false;
  onbStep = 0;
  onbData = nuovoOnbData();
  document.getElementById('onb').classList.remove('hidden');
  renderOnb();
  return true;
};

function nuovoOnbData() {
  return { inizio: undefined, goals: [], goal: null, level: null, days: null, minutes: null,
           luogo: null, fastidi: [], sonno: null, attrezzi: null, parq: null, priorita: [],
           sex: null, age: ((typeof getProfile === 'function' && getProfile()) || {}).age || null, height: null, weight: null, bia: null,   /* ETA-01: chi rifa il programma ha gia detto l eta */
           psico: Object.assign({}, ((typeof getProfile === 'function' && getProfile()) || {}).psico || {}),
           test: Object.assign({}, ((typeof getProfile === 'function' && getProfile()) || {}).test || {}),
           freq: ((typeof getProfile === 'function' && getProfile()) || {}).freq || null,
           attrezziPalestra: ((typeof getProfile === 'function' && getProfile()) || {}).attrezziPalestra, attrezziCasa: ((typeof getProfile === 'function' && getProfile()) || {}).attrezziCasa,   /* CAS-01 (W2-T5): chi rifa il programma ritrova quello che ha dichiarato */
           manubriKg: ((typeof getProfile === 'function' && getProfile()) || {}).manubriKg, extraPalestra: ((typeof getProfile === 'function' && getProfile()) || {}).extraPalestra };
}

window.onbSkipAll = function() {
  localStorage.setItem(ONB_KEY, '1');
  document.getElementById('onb').classList.add('hidden');
  offriGuida();
};

window.onbPrev = function() {
  if (onbStep === 0) { onbSkipAll(); return; }
  onbStep--;
  renderOnb();
};

const ONB_ULTIMO = 7;   /* 0 obiettivi, 1 livello, 2 giorni, 3 minuti, 4 preferenze, 5 BIA, 6 come ti alleni meglio, 7 esito */

window.onbNext = function() {
  if (onbStep === ONB_ULTIMO) {
    if (!etaPerProgramma(onbData.age).ok) { onbStep = 4; renderOnb(); return; }   /* ETA-01: senza un eta valida non si crea nessun programma */
    applyGeneratedProgram(); return;
  }
  if (!onbStepValid()) return;
  onbStep++;
  renderOnb();
};

function onbStepValid() {
  if (onbStep === 0) return onbData.goals.length > 0;
  if (onbStep === 1) return !!onbData.level;
  if (onbStep === 2) return !!onbData.days;
  if (onbStep === 3) return !!onbData.minutes;
  if (onbStep === 4) return !!onbData.luogo && !!onbData.sonno && !!onbData.attrezzi && !!onbData.freq && etaPerProgramma(onbData.age).ok;
  return true;
}

const ONB_FREQ = [
  { id: '1', emoji: ico('calendario'), name: '1 volta', desc: 'una seduta lunga per muscolo' },
  { id: '2', emoji: ico('calendario'), name: '2 volte', desc: 'consigliata' },
  { id: '3', emoji: ico('calendario'), name: '3 volte', desc: 'sedute corte e frequenti' },
  { id: 'auto', emoji: ico('calendario'), name: 'Decide il coach', desc: 'in base a livello e giorni' }
];
window.onbSetTest = function(k, v) {
  onbData.test = onbData.test || {};
  onbData.test[k] = v === 'dopo' ? null : v;
  renderOnb();
};
window.onbPick = function(campo, valore) {
  onbData[campo] = valore;
  renderOnb();
};
/* ETA-01: l eta si scrive senza ridisegnare il passo (il campo perderebbe il fuoco); il messaggio e il tasto Avanti seguono il valore */
window.onbSetEta = function(v) {
  const testo = String(v === undefined || v === null ? '' : v).trim();
  onbData.age = testo === '' ? null : Number(testo);
  const e = etaPerProgramma(onbData.age);
  const msg = document.getElementById('onb-eta-msg');
  if (msg) msg.textContent = (e.ok || testo === '') ? '' : e.messaggio;
  const next = document.getElementById('onb-next');
  if (next) next.disabled = !onbStepValid();
  const sonno = document.getElementById('onb-sonno-bene-desc');   /* ETA-05: per un minorenne «Bene» e 8 ore o piu */
  if (sonno) sonno.textContent = descSonnoBene(onbData.age);
};

/* Fino a tre obiettivi: il primo scelto guida il programma, gli altri lo
   correggono. Oltre tre si diluisce tutto e non si ottiene niente. */
window.onbToggleGoal = function(id) {
  const i = onbData.goals.indexOf(id);
  if (i !== -1) onbData.goals.splice(i, 1);
  else if (onbData.goals.length < 3) onbData.goals.push(id);
  onbData.goal = onbData.goals[0] || null;
  renderOnb();
};

window.onbTogglePriorita = function(g) {
  onbData.priorita = onbData.priorita || [];
  const i = onbData.priorita.indexOf(g);
  if (i !== -1) onbData.priorita.splice(i, 1); else if (onbData.priorita.length < 3) onbData.priorita.push(g);
  renderOnb();
};
window.onbToggleFastidio = function(id) {
  if (id === 'nessuno') { onbData.fastidi = onbData.fastidi.indexOf('nessuno') !== -1 ? [] : ['nessuno']; renderOnb(); return; }
  onbData.fastidi = onbData.fastidi.filter(x => x !== 'nessuno');
  const i = onbData.fastidi.indexOf(id);
  if (i === -1) onbData.fastidi.push(id); else onbData.fastidi.splice(i, 1);
  renderOnb();
};

const ONB_LUOGHI = [
  { id: 'palestra', emoji: '\u{1F3DF}\uFE0F', name: 'Palestra attrezzata', desc: 'bilancieri, macchine e cavi' },
  { id: 'manubri', emoji: '\u{1F3E0}', name: 'A casa con manubri', desc: 'manubri e una panca' },
  { id: 'corpo', emoji: '\u{1F938}', name: 'Corpo libero', desc: 'senza attrezzi, o quasi' }
];
const ONB_FASTIDI = [
  { id: 'spalle', fig: 'spalle', emoji: '', name: 'Spalle' },
  { id: 'ginocchia', fig: 'gambe', emoji: '', name: 'Ginocchia' },
  { id: 'schiena', fig: 'schiena', emoji: '', name: 'Schiena bassa' },
  { id: 'nessuno', emoji: '\u2705', name: 'Nessuno' }
];
/* PAR-Q+: un si = modalita prudente e consiglio di sentire il medico */
const ONB_PARQ = [
  { id: 'no', emoji: '\u2705', name: 'No, nessuno', desc: 'si procede normalmente' },
  { id: 'si', emoji: '\u26A0', name: 'Sì, almeno uno', desc: 'coach prudente, e senti il medico prima di sforzi intensi' }
];
const PARQ_DOMANDE = ['problemi al cuore o pressione alta', 'dolore al petto a riposo o sotto sforzo', 'capogiri o svenimenti', 'problemi a ossa o articolazioni che peggiorano col movimento', 'farmaci per cuore o pressione', 'gravidanza o parto recente', 'un medico ti ha sconsigliato lo sforzo'];
const ONB_SONNO = [
  { id: 'bene', emoji: '\u{1F60C}', name: 'Bene', desc: 'dormo 7 ore o piu, stress sotto controllo' },
  { id: 'medio', emoji: '\u{1F610}', name: 'Cosi cosi', desc: 'a volte dormo poco o sono sotto pressione' },
  { id: 'male', emoji: '\u{1F62B}', name: 'Male', desc: 'poco sonno o molto stress, di solito' }
];
const ONB_ATTREZZI = [
  { id: 'liberi', emoji: '\u{1F3CB}\uFE0F', name: 'Pesi liberi', desc: 'bilanciere e manubri' },
  { id: 'macchine', emoji: '\u2699\uFE0F', name: 'Macchine', desc: 'piu guidate e sicure' },
  { id: 'indifferente', emoji: '\u{1F937}', name: 'Indifferente', desc: 'scegli tu' }
];

function chip(sel, onclick, testo) {
  return '<button class="aw-group ' + (sel ? 'on' : '') + '" onclick="' + onclick + '">' + testo + '</button>';
}

/* ---- W2-T5: avvisi e domande che cambiano davvero il programma ---- */
/* OBI-01: massa e dimagrimento insieme chiedono cose opposte. Avviso, non blocco: nessun cambio senza un tocco dell utente («Usa la ricomposizione»). Cosa fa il coach se li tieni tutti e due e vero:
   il primo che hai scelto guida il programma (schemaMisto) e la fase del corpo e il deficit (faseDaObiettivi, OBI-02), con la nota dei passi */
const TESTO_AVVISO_MASSA_DIMAGRIMENTO = 'Costruire muscolo e perdere grasso insieme funziona bene se inizi o riparti, molto meno se sei già allenato: hanno bisogno di cose opposte. Scegli una fase alla volta, oppure la ricomposizione.';
const TESTO_AVVISO_MASSA_DIMAGRIMENTO_SE_RESTANO = 'Se li tieni entrambi, il primo che hai scelto guida il programma e passi e cardio seguono il dimagrimento.';
function htmlAvvisoObiettivi(goals) {
  const g = goals || [];
  if (g.indexOf('massa') === -1 || g.indexOf('dimagrimento') === -1 || (typeof regolaAttiva === 'function' && !regolaAttiva('OBI-01'))) return '';
  /* due blocchi, non uno: il traduttore cerca ogni frase intera */
  return '<div class="onb-note onb-avviso" id="onb-avviso-obiettivi">' + TESTO_AVVISO_MASSA_DIMAGRIMENTO + '</div>' +
    '<div class="onb-note">' + TESTO_AVVISO_MASSA_DIMAGRIMENTO_SE_RESTANO + '</div>' +
    '<button class="set-row-btn" onclick="onbUsaRicomposizione()">Usa la ricomposizione</button>';
}
/* la scelta esplicita dell utente: massa e dimagrimento diventano la ricomposizione, nel posto del primo dei due (gli altri obiettivi restano) */
window.onbUsaRicomposizione = function() {
  const g = onbData.goals, i = Math.min(g.indexOf('massa'), g.indexOf('dimagrimento'));
  if (i < 0 || g.indexOf('massa') === -1 || g.indexOf('dimagrimento') === -1) return;
  onbData.goals = g.filter(x => x !== 'massa' && x !== 'dimagrimento');
  if (onbData.goals.indexOf('ricomposizione') === -1) onbData.goals.splice(Math.min(i, onbData.goals.length), 0, 'ricomposizione');
  onbData.goal = onbData.goals[0] || null;
  renderOnb();
};
/* OBI-07: chi sceglie la ricomposizione legge cosa vuol dire «tonificare» (un po piu di muscolo e meno grasso) e che serve il carico che sale, non solo tante ripetizioni (ACSM 2026, Schoenfeld 2017) */
const TESTO_TONIFICARE = 'Tonificare vuol dire un po’ più di muscolo e meno grasso: per farlo servono pesi che salgono piano piano, non solo tante ripetizioni.';
function htmlNotaTonificare(goals) {
  return (goals || []).indexOf('ricomposizione') === -1 ? '' : '<div class="onb-note" id="onb-nota-tonificare">' + TESTO_TONIFICARE + '</div>';
}
/* PRG-02: chi comincia con 5 o 6 giorni ha 4 sedute: glielo dice il passo dei giorni (e la nota del programma, con la stessa frase) */
function htmlAvvisoGiorni(livello, giorni) {
  const s = typeof sogliaSplit === 'function' ? sogliaSplit('principianteSedute') : null;
  if (!s || livello !== 'principiante' || !(Number(giorni) >= s.giorniDa) || typeof NOTA_PRINCIPIANTE_4_SEDUTE === 'undefined') return '';
  return '<div class="onb-note" id="onb-avviso-giorni">' + NOTA_PRINCIPIANTE_4_SEDUTE + '</div>';
}
/* ETA-05: «Bene» per il sonno vuol dire 7 ore o piu per un adulto e 8 ore o piu per un minorenne (13-17 anni) */
function descSonnoBene(eta) {
  const o = typeof sogliaSplit === 'function' ? sogliaSplit('oreSonnoBene') : null;
  if (!o) return ONB_SONNO[0].desc;
  return etaPerProgramma(eta).motivo === 'minorenne' ? 'dormo ' + o.minorenne + ' ore o più, stress sotto controllo' : 'dormo ' + o.adulto + ' ore o piu, stress sotto controllo';
}
/* CAS-01 (D-P3): la domanda sugli attrezzi, di palestra o di casa. Facoltativa: senza risposta il coach si comporta come prima (palestra completa; a casa solo cio che non chiede un attrezzo da dichiarare).
   I nomi dei campi sono quelli del brief (regia/brief.js: attrezziCasa, manubriKg, extraPalestra; attrezziPalestra com era) */
const ONB_ATTREZZI_NOMI = { sbarra: 'Sbarra', panca: 'Panca', elastico: 'Elastici', kettlebell: 'Kettlebell', anelli: 'Anelli' };
function onbAttrezziPalestra() { return onbData.attrezziPalestra !== undefined ? onbData.attrezziPalestra : (((typeof getProfile === 'function' && getProfile()) || {}).attrezziPalestra || null); }
function htmlAttrezziOnboarding() {
  const luogo = onbData.luogo;
  if (typeof regolaAttiva === 'function' && !regolaAttiva('CAS-01')) return '';
  if (luogo === 'palestra') {
    const lista = onbAttrezziPalestra(), extra = Array.isArray(onbData.extraPalestra) ? onbData.extraPalestra : [];
    return '<div class="aw-sec">Cosa c’è nella tua palestra?</div>' +
      '<div class="pref-note">Tocca quello che trovi (facoltativo). Se non rispondi, il coach pensa a una palestra completa.</div>' +
      '<div class="aw-groups">' + ATTREZZI_PALESTRA.map(a => chip(!lista || !lista.length || lista.indexOf(a[0]) !== -1, 'onbToggleAttrezzoPalestra(\'' + a[0] + '\')', a[1])).join('') + '</div>' +
      '<div class="pref-note">Altro, se c’è:</div>' +
      '<div class="aw-groups">' + ATTREZZI_EXTRA_PALESTRA_IDS.map(k => chip(extra.indexOf(k) !== -1, 'onbToggleExtraPalestra(\'' + k + '\')', ONB_ATTREZZI_NOMI[k])).join('') + '</div>';
  }
  if (luogo === 'manubri' || luogo === 'corpo') {
    const casa = Array.isArray(onbData.attrezziCasa) ? onbData.attrezziCasa : [];
    return '<div class="aw-sec">Cosa hai in casa?</div>' +
      '<div class="pref-note">Tocca quello che hai (facoltativo). Pavimento, una sedia robusta e un gradino li do per scontati.</div>' +
      '<div class="aw-groups">' + ATTREZZI_CASA_IDS.filter(k => k !== 'manubri').map(k => chip(casa.indexOf(k) !== -1, 'onbToggleAttrezzoCasa(\'' + k + '\')', ONB_ATTREZZI_NOMI[k])).join('') + '</div>' +
      (luogo === 'manubri' ? '<div class="onb-fields"><label class="onb-field"><span>Manubrio più pesante (kg)</span><input type="number" inputmode="decimal" id="onb-manubri-kg" min="1" max="100" step="0.5" value="' + (onbData.manubriKg || '') + '" oninput="onbSetManubriKg(this.value)"></label><span></span></div>' +
        '<div class="pref-note">Quanto pesa, a mano, il manubrio più pesante che hai (per i regolabili, il carico massimo di uno).</div>' : '');
  }
  return '';
}
function onbCambiaLista(lista, id) {
  const l = (Array.isArray(lista) ? lista : []).slice(), i = l.indexOf(id);
  if (i === -1) l.push(id); else l.splice(i, 1);
  return l;
}
window.onbToggleAttrezzoPalestra = function(id) {
  const tutti = ATTREZZI_PALESTRA.map(a => a[0]), l = onbCambiaLista(onbAttrezziPalestra() && onbAttrezziPalestra().length ? onbAttrezziPalestra() : tutti, id);
  onbData.attrezziPalestra = l.length === tutti.length ? null : l;   /* tutti = palestra completa = nessun elenco, come in Opzioni */
  renderOnb();
};
window.onbToggleExtraPalestra = function(id) { onbData.extraPalestra = onbCambiaLista(onbData.extraPalestra, id); renderOnb(); };
window.onbToggleAttrezzoCasa = function(id) { onbData.attrezziCasa = onbCambiaLista(onbData.attrezziCasa, id); renderOnb(); };
window.onbSetManubriKg = function(v) {   /* senza ridisegnare il passo (il campo perderebbe il fuoco), come l eta */
  const n = Number(String(v === undefined || v === null ? '' : v).replace(',', '.'));
  onbData.manubriKg = String(v).trim() === '' || !isFinite(n) || n <= 0 ? null : n;
};

function renderOnb() {
  const body = document.getElementById('onb-body');
  const next = document.getElementById('onb-next');
  const TOT = ONB_ULTIMO + 1;
  document.getElementById('onb-step').innerText = 'Passo ' + (onbStep + 1) + ' di ' + TOT;
  document.getElementById('onb-progress-fill').style.width = Math.round(((onbStep + 1) / TOT) * 100) + '%';
  next.innerText = onbStep === ONB_ULTIMO ? '\u2713 Crea il programma' : 'Avanti';
  next.disabled = !onbStepValid();

  if (onbStep === 0) {
    body.innerHTML = '<div class="onb-q">Quali sono i tuoi obiettivi?</div>' +
      '<div class="onb-why">Puoi sceglierne fino a tre. Il primo che tocchi guida il programma, gli altri lo correggono. Oltre tre si diluisce tutto.</div>' +
      ONB_GOALS.map(g => {
        const pos = onbData.goals.indexOf(g.id);
        const pieno = onbData.goals.length >= 3 && pos === -1;
        return '<button class="onb-opt ' + (pos !== -1 ? 'on' : '') + (pieno ? ' spento' : '') + '" onclick="onbToggleGoal(\'' + g.id + '\')">' +
          '<span class="onb-opt-emoji">' + g.emoji + '</span>' +
          '<span class="onb-opt-main"><span class="onb-opt-name">' + g.name + '</span>' +
          '<span class="onb-opt-desc">' + g.desc + '</span></span>' +
          '<span class="goal-rank">' + (pos !== -1 ? (pos === 0 ? '1\u00B0 \u2022 guida' : (pos + 1) + '\u00B0') : '') + '</span></button>';
      }).join('') +
      '<div class="onb-note">' + onbData.goals.length + ' di 3 scelti</div>' +
      htmlAvvisoObiettivi(onbData.goals) + htmlNotaTonificare(onbData.goals);
  } else if (onbStep === 1) {
    body.innerHTML = '<div class="onb-q">Da quanto ti alleni?</div>' +
      '<div class="onb-why">Ai principianti conviene il full body, perche ogni muscolo viene stimolato piu volte. Chi ha piu esperienza regge una divisione piu spinta. Decide anche quanto dura il programma.</div>' +
      ONB_LEVELS.map(g => optHtml('level', g)).join('');
  } else if (onbStep === 2) {
    body.innerHTML = '<div class="onb-q">Quanti giorni a settimana?</div>' +
      '<div class="onb-why">Due o quattro sedute fatte con costanza valgono piu di sei settimane intense e poi il vuoto. Il riposo fa parte del programma.</div>' +
      [2, 3, 4, 5, 6].map(n => optHtml('days', {
        id: n, emoji: '\u{1F4C5}', name: n + ' giorni',
        desc: n <= 2 ? 'il minimo per avere risultati' : (n <= 4 ? 'la fascia piu sostenibile' : 'richiede buon recupero')
      })).join('') + htmlAvvisoGiorni(onbData.level, onbData.days);
  } else if (onbStep === 3) {
    body.innerHTML = '<div class="onb-q">Quanto dura una seduta?</div>' +
      '<div class="onb-why">Con pochi minuti conta cosa metti: pochi esercizi completi, in coppia dove si può. Oltre i novanta minuti il recupero peggiora. Decido quanti esercizi metterti in base a questo.</div>' +
      [30, 45, 60, 75, 90].map(n => optHtml('minutes', {
        id: n, emoji: '\u23F1\uFE0F', name: n + ' minuti',
        desc: n <= 30 ? 'seduta breve e densa' : (n >= 90 ? 'il massimo consigliabile' : 'durata equilibrata')
      })).join('');
  } else if (onbStep === 4) {
    /* Solo domande che cambiano davvero il piano: ogni risposta ha un effetto */
    const eta = etaPerProgramma(onbData.age);
    body.innerHTML = '<div class="onb-q">Qualche preferenza</div>' +
      '<div class="onb-why">Ogni risposta cambia qualcosa di preciso nel programma.</div>' +
      '<div class="aw-sec">Quanti anni hai?</div>' +
      '<div class="pref-note">Serve per scegliere pesi e ritmo giusti. Sotto i 13 anni il coach non crea programmi.</div>' +
      '<div class="onb-fields"><label class="onb-field"><span>Età</span><input type="number" inputmode="numeric" id="onb-age" min="' + PARAM_ETA.min + '" max="' + PARAM_ETA.max + '" step="1" value="' + (onbData.age || '') + '" oninput="onbSetEta(this.value)"></label><span></span></div>' +
      '<div class="onb-note" id="onb-eta-msg">' + ((eta.ok || !onbData.age) ? '' : eta.messaggio) + '</div>' +
      '<div class="aw-sec">Dove ti alleni?</div>' +
      '<div class="pref-note">Cosi non ti propongo esercizi che non puoi fare.</div>' +
      ONB_LUOGHI.map(g => optHtml('luogo', g)).join('') +
      htmlAttrezziOnboarding() +
      '<div class="aw-sec">Hai fastidi in qualche zona?</div>' +
      '<div class="pref-note">Evito gli esercizi che la caricano di piu. Non sostituisce il parere di un medico.</div>' +
      '<div class="aw-groups">' + ONB_FASTIDI.map(f => chip(onbData.fastidi.indexOf(f.id) !== -1, 'onbToggleFastidio(\'' + f.id + '\')', (f.fig ? '<span class="chip-fig">' + muscleFigure(f.fig) + '</span>' : f.emoji) + ' ' + f.name)).join('') + '</div>' +
      '<div class="aw-sec">Come dormi e quanto stress hai?</div>' +
      '<div class="pref-note">Il recupero decide quanto volume reggi e quanto in fretta aumentare i carichi.</div>' +
      ONB_SONNO.map(g => optHtml('sonno', g.id === 'bene' ? Object.assign({}, g, { desc: descSonnoBene(onbData.age), idDesc: 'onb-sonno-bene-desc' }) : g)).join('') +
      '<div class="aw-sec">Cosa preferisci usare?</div>' +
      '<div class="pref-note">Quando un esercizio va sostituito, scelgo nella direzione che preferisci.</div>' +
      ONB_ATTREZZI.map(g => optHtml('attrezzi', g)).join('') +
      '<div class="aw-sec">Muscoli su cui puntare (facoltativo, fino a 3)</div>' +
      '<div class="pref-note">Ricevono qualche serie in più. Se scegli tutto, non punta su niente.</div>' +
      '<div class="aw-groups">' + GRUPPI_PRINCIPALI.map(g => chip((onbData.priorita || []).indexOf(g) !== -1, 'onbTogglePriorita(\'' + g + '\')', '<span class="chip-fig">' + muscleFigure(g) + '</span> ' + MUSCLE_GROUPS[g].label)).join('') + '</div>' +
      '<div class="aw-sec">Quante volte a settimana vuoi allenare ogni muscolo?</div>' +
      '<div class="pref-note">Due volte è la scelta più comune; conta soprattutto il totale delle serie.</div>' +
      ONB_FREQ.map(g => optHtml('freq', g)).join('') +
      '<div class="aw-sec">Test in due minuti</div>' +
      '<div class="pref-note">Due prove a corpo libero: il coach sceglie le varianti adatte al tuo corpo.</div>' +
      TEST_FAI_DA_TE.filter(t => t.k !== 'stance').map(t => '<div class="onb-test"><div class="onb-test-q">' + t.q + '</div><div class="pref-note">' + t.d + '</div>' +
        '<div class="aw-groups">' + t.o.concat([['dopo', 'Lo faccio dopo']]).map(o => chip(((onbData.test || {})[t.k] || 'dopo') === o[0], 'onbSetTest(\'' + t.k + '\',\'' + o[0] + '\')', o[1])).join('') + '</div></div>').join('') +
      '<div class="aw-sec">Salute: hai uno di questi?</div>' +
      '<div class="pref-note">' + PARQ_DOMANDE.join(' · ') + '.</div>' +
      ONB_PARQ.map(g => optHtml('parq', g)).join('');
  } else if (onbStep === 5) {
    body.innerHTML = renderBiaStep();
    setTimeout(bindBiaInputs, 0);
  } else if (onbStep === 6) {
    body.innerHTML = renderPsicoStep();
  } else {
    body.innerHTML = renderOnbResult();
  }

  document.getElementById('onb-back').innerText = onbStep === 0 ? '\u2715' : '\u2190';
}

function optHtml(campo, o) {
  const sel = String(onbData[campo]) === String(o.id);
  return '<button class="onb-opt ' + (sel ? 'on' : '') + '" onclick="onbPick(\'' + campo + '\', ' +
    (typeof o.id === 'number' ? o.id : "'" + o.id + "'") + ')">' +
    '<span class="onb-opt-emoji">' + o.emoji + '</span>' +
    '<span class="onb-opt-main"><span class="onb-opt-name">' + o.name + '</span>' +
    '<span class="onb-opt-desc"' + (o.idDesc ? ' id="' + o.idDesc + '"' : '') + '>' + o.desc + '</span></span>' +
    '<span class="pick-check">' + (sel ? '\u2713' : '') + '</span></button>';
}

/* ---------- Lettore BIA ----------
   I referti BIA cambiano da strumento a strumento (Tanita, InBody, Akern...),
   quindi il riconoscimento automatico e' un aiuto, non un oracolo: i valori
   letti restano sempre modificabili a mano prima di essere usati. */
function renderBiaStep() {
  const b = onbData.bia || {};
  const letti = ['peso', 'fmPerc', 'ffm', 'tbw', 'bmr', 'smm', 'phase', 'altezza']
    .filter(k => b[k] !== undefined && b[k] !== null);
  const etichette = { peso: 'Peso', altezza: 'Altezza', fmPerc: 'Massa grassa', ffm: 'Massa magra',
                      tbw: 'Acqua totale', bmr: 'Metabolismo basale', smm: 'Massa muscolare', phase: 'Angolo di fase' };
  const unita = { peso: ' kg', altezza: ' cm', fmPerc: '%', ffm: ' kg', tbw: ' L', bmr: ' kcal', smm: ' kg', phase: '\u00B0' };

  return '<div class="onb-q">Hai un referto BIA?</div>' +
    '<div class="onb-why">La bioimpedenziometria misura massa grassa, massa magra e acqua corporea: dice se stai perdendo grasso o muscolo, cosa che la bilancia da sola non sa fare. Carica il PDF e leggo io tutti i valori: peso compreso, non serve riscriverli.</div>' +

    '<label class="bia-drop" for="bia-file">\u{1F4C4} Carica il PDF della tua BIA' +
    '<span style="display:block;font-weight:400;font-size:0.7rem;margin-top:4px;">leggo peso, massa grassa, massa magra e il resto</span></label>' +
    '<input type="file" id="bia-file" accept="application/pdf" style="display:none;">' +
    '<div class="bia-status" id="bia-status"></div>' +

    (letti.length
      ? '<div class="res-card" style="margin-top:var(--sp-4);"><div class="res-title">Letti dal referto</div>' +
        letti.map(k => '<div class="res-line"><span>' + etichette[k] + '</span><b>' + b[k] + unita[k] + '</b></div>').join('') +
        '</div>'
      : '') +

    /* Solo cio che la BIA non dice: servono per leggere i valori nel modo giusto */
    '<div class="aw-sec">Quello che il referto non dice</div>' +
    '<div class="pref-note">Servono per interpretare i valori: le soglie della massa grassa sono diverse per uomini e donne.</div>' +
    '<div class="onb-fields">' +
      '<label class="onb-field"><span>Sesso</span><select id="onb-sex">' +
        '<option value="">--</option>' +
        '<option value="uomo"' + (onbData.sex === 'uomo' ? ' selected' : '') + '>Uomo</option>' +
        '<option value="donna"' + (onbData.sex === 'donna' ? ' selected' : '') + '>Donna</option>' +
      '</select></label>' +
      '<span></span>' +   /* l eta e obbligatoria e si chiede nel passo delle preferenze (ETA-01) */
    '</div>' +
    (b.altezza ? '' :
      '<div class="onb-fields" style="margin-top:var(--sp-3);">' +
        '<label class="onb-field"><span>Altezza (cm)</span><input type="number" data-bia="altezza" value=""></label>' +
        '<span></span></div>') +

    '<button class="set-row-btn" style="margin-top:var(--sp-4);" onclick="onbToggleManuale()">' +
      (onbManuale ? '\u2715 Nascondi i campi a mano' : '\u270E Non ho il referto: inserisco i valori a mano') + '</button>' +
    (onbManuale
      ? '<div class="bia-grid" style="margin-top:var(--sp-3);">' +
          biaField('peso', 'Peso (kg)', b.peso) +
          biaField('altezza', 'Altezza (cm)', b.altezza) +
          biaField('fmPerc', 'Massa grassa (%)', b.fmPerc) +
          biaField('ffm', 'Massa magra (kg)', b.ffm) +
          biaField('tbw', 'Acqua totale (L)', b.tbw) +
          biaField('bmr', 'Metabolismo basale (kcal)', b.bmr) +
        '</div>'
      : '') +

    '<div class="onb-note">Anche senza BIA il programma si crea lo stesso: i valori servono solo a seguire i progressi. I dati letti dal PDF sono una proposta: un referto va interpretato da un professionista.</div>';
}

let onbManuale = false;
window.onbToggleManuale = function() {
  onbManuale = !onbManuale;
  renderOnb();
};

function biaField(k, label, val) {
  return '<label class="bia-val"><span>' + label + '</span>' +
    '<input type="number" step="0.1" data-bia="' + k + '" value="' + (val !== undefined && val !== null ? val : '') + '"></label>';
}

function bindBiaInputs() {
  const file = document.getElementById('bia-file');
  if (file) file.addEventListener('change', (e) => handleBiaPdf(e.target.files));
  document.querySelectorAll('[data-bia]').forEach(inp => {
    inp.addEventListener('change', () => {
      onbData.bia = onbData.bia || {};
      const v = parseFloat(inp.value);
      onbData.bia[inp.dataset.bia] = isNaN(v) ? null : v;
    });
  });
  const sex = document.getElementById('onb-sex');
  if (sex) sex.addEventListener('change', () => { onbData.sex = sex.value || null; });
}

function ensurePdfJs() {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
    const timeoutMs = window.__TZ_PDF_TIMEOUT_MS || 9000;
    const t = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    /* impronta del file: se la rete lo cambia, il browser lo rifiuta */
    s.integrity = 'sha512-q+4liFwdPC/bNdhUpZx6aXDx/h77yEQtn4I1slHydcbZK34nLaR3cAeYSJshoxIOq3mjEf7xJE8YWIUHMn+oCQ==';
    s.crossOrigin = 'anonymous';
    s.onload = () => {
      clearTimeout(t);
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else reject(new Error('lib assente'));
    };
    s.onerror = () => { clearTimeout(t); reject(new Error('rete')); };
    document.head.appendChild(s);
  });
}

/* Cerca i valori con le diciture piu comuni nei referti italiani e inglesi */
