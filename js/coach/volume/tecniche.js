/* Tecniche di intensita: drop set, myo-reps, superserie, AMRAP, back-off, potenza, cluster e parziali, dosate dal cancello (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02, ABB-06, PRG-34)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   TECNICHE (piano coach v2, B.3 stadio 13; W1-T4, riscritto in W2-T3)
   assegnaTecniche(brief, sedute) mette le tecniche di intensita nelle sedute. Cosa si puo dare a chi, su quale esercizio e quando non lo decide piu questo file: lo decide il
   cancello (sicurezza/tecnica-adatta.js: tecnicaAdatta e budgetTecniche), che ha la matrice tecnica x classe x livello x eta x vincoli (docs/ricerca-metodi-avanzati-intensita.md
   3.2 e 3.3). Qui si sceglie solo dove mettere quello che il cancello ammette:
   - poco tempo (<= 45 minuti) = superserie antagoniste (la prima scelta: mai con un fondamentale pesante, ABB-06) e, a chi puo, un drop set o i myo-reps (MAV-13: si alternano)
     sull'ultimo isolamento ammesso: fanno risparmiare tempo, non fanno crescere di piu (MAV-16);
   - over 65 = «potenza» sul primo multiarticolare su macchina (PRI-16); PAR-Q o over 65 (non i minorenni) = «cluster» sui pesanti; ai principianti, ai minorenni e agli over 65
     una nota sulla discesa controllata di 2-3 secondi (MAV-11);
   - intermedi e avanzati = AMRAP o back-off sul primo fondamentale (a 1 ripetizione dal cedimento, MAV-06) e le parziali in allungamento sull'ultimo isolamento adatto (MAV-07).
   Il budget (MAV-08): intermedio 1 tecnica intensa per seduta e 2 a settimana, avanzato 2 e 6; si tiene la piu sicura, non la prima della lista (MAV-05), le sedute si
   distanziano nella settimana, una stessa tecnica sullo stesso esercizio al massimo una volta a settimana e il drop set o i myo-reps contano 2 e 3 serie nel tetto per muscolo (MAV-09).
   Le tecniche dei metodi famosi e dei tocchi (applicaMetodo gira dopo) le filtra validaTecniche, il controllo finale della verifica (REG-02): stesso cancello, stesso budget.
   Le regole di prima (MAV-02, MAV-03: niente cedimento a chi non puo e su core, tenute, peso zero, stacchi) sono dentro il cancello; qui restano i loro nomi.
   ============================================================ */

/* MAV-02 e MAV-03: tecniche che portano vicino al cedimento (G2 e G2b). Mai a principianti, minorenni, over 65 e modalita prudente (Convenzione, prudenza) */
const TECNICHE_AL_CEDIMENTO = ['drop', 'myo', 'parziali', 'amrap', 'backoff', 'calibrazione', 'riposopausa'];
/* MAV-02: niente cedimento sul core, sulle tenute, a peso zero e sulle cerniere (stacchi); la regola e nel cancello e legge gli attributi, non il nome */
function senzaCedimento(nome) { return esercizioSenzaCedimento(nome); }
/* MAV-02 (revisione dell onda 0): niente cedimento neppure su front squat e spinte sopra la testa, ne sugli esercizi che caricano la zona del fastidio dichiarato */
function senzaCedimentoPer(nome, fastidi) { return esercizioSenzaCedimentoPer(nome, fastidi); }

/* ABB-06 e MAV-01: le coppie della seduta che il cancello non ammette (un fondamentale pesante, il core, i multiarticolari liberi oltre i 65 anni) si sciolgono; ritorna quante */
function filtraCoppie(brief, sd, ctx) {
  const es = sd.esercizi; let tolte = 0;
  for (let i = 1; i < es.length; i++) {
    if (!es[i].superset) continue;
    const base = { budget: ctx && ctx.budget };
    const a = tecnicaAdatta('superserie', es[i].name, brief, Object.assign({ coppia: es[i - 1].name }, base));
    const b = tecnicaAdatta('superserie', es[i - 1].name, brief, Object.assign({ coppia: es[i].name }, base));
    if (!a.ok || !b.ok) { delete es[i].superset; tolte++; }
  }
  return tolte;
}

/* MAV-09: il drop set vale 2 serie e il rest-pause o i myo-reps 3 nel tetto di serie per muscolo in una seduta: la tecnica non entra se il muscolo e gia al tetto */
function entraNelTetto(es, e, tecnica) {
  const extra = serieEquivalentiTecnica(tecnica) - 1;
  if (extra <= 0) return true;
  const cr = creditoMuscoli(e.name);
  if (!cr) return true;
  const v = contaVolume([es]);
  return Object.keys(cr).every(u => !(cr[u] > 0) || !v[u] || v[u].frazionarie + extra * cr[u] <= COACH_PARAMETRI.serieMaxMuscoloSeduta);
}
/* il muscolo (l'unita di volume con credito pieno) su cui lavora l'esercizio: serve alle parziali (al massimo 2 esercizi per muscolo a settimana, MAV-07) */
function muscoloDellEsercizio(nome) {
  const cr = creditoMuscoli(nome) || {};
  const u = Object.keys(cr).find(k => cr[k] === 1);
  return u || (findExercise(nome) || {}).group || nome;
}

/* MAV-08: dove mettere le tecniche intense nella settimana. candidati[s] = i candidati della seduta s ({ e, tecnica, rischio }); in ogni seduta si tengono i piu sicuri (MAV-05)
   fino a perSeduta; in settimana al massimo perSettimana, a giri: prima uno per seduta, poi il secondo, e le sedute scelte si distanziano (la prima e l ultima, non due di fila).
   Ritorna, per seduta, i candidati scelti. */
function distribuisciTecniche(candidati, perSeduta, perSettimana) {
  const scelte = candidati.map(() => []);
  const ordinati = candidati.map(lista => scegliTecnicheSicure(lista, perSeduta).tenute);
  let rimasti = perSettimana;
  for (let giro = 0; giro < perSeduta && rimasti > 0; giro++) {
    const sedute = [];
    ordinati.forEach((lista, s) => { if (lista[giro]) sedute.push(s); });
    const quante = Math.min(sedute.length, rimasti);
    for (let k = 0; k < quante; k++) {
      const pos = quante === 1 ? 0 : Math.round(k * (sedute.length - 1) / (quante - 1));
      scelte[sedute[pos]].push(ordinati[sedute[pos]][giro]);
    }
    rimasti -= quante;
  }
  return scelte;
}

/* poco tempo (30-45 minuti) = superserie e drop set o myo-reps; over 65 = potenza ed equilibrio; intermedi e avanzati = AMRAP o back-off sui fondamentali e parziali.
   Scrive in brief.lavoro se ha assegnato un drop set o la potenza: le note del programma dicono quello che il programma fa davvero (B3). */
function assegnaTecniche(brief, sedute) {
  const chi = brief.chi, level = chi.livello, over65 = chi.over65, minore = chi.minorenne, parqSi = chi.parq, ps = brief.mente.ps, metodoAttivo = brief.metodo.attivo;
  const L = brief.lavoro, note = L.note, minuti = brief.agenda.minuti, S = SOGLIE_TECNICHE, poco = minuti <= S.pocoTempoMinuti.v;
  const bud = budgetTecniche(brief, null), ctx = { budget: bud };
  const adatta = (t, nome) => tecnicaAdatta(t, nome, brief, ctx).ok;
  const classeDE = nome => ['D', 'E'].indexOf(classeTecnica(nome)) !== -1;
  let potenzaAssegnata = false;
  /* 1. le tecniche leggere (coppie, potenza, cluster) si mettono subito; quelle intense si raccolgono come candidati, seduta per seduta */
  const candidati = sedute.map(sd => {
    const es = sd.esercizi, cand = [];
    if (poco && !metodoAttivo) {   /* con un metodo famoso decide il metodo (coppie, tecniche) */
      strSuperserie(sd);   /* ABB-06: solo antagonisti, mai con un fondamentale pesante */
      filtraCoppie(brief, sd, ctx);   /* MAV-01: il cancello scioglie le coppie che non ammette (un fondamentale pesante, il core, i multiarticolari liberi oltre i 65 anni) */
      /* MAV-13 e MAV-01: il drop set (o i myo-reps) per fare prima, sull'ultimo isolamento che il cancello ammette; mai sul core, a tempo, a peso zero, sugli stacchi */
      if (bud.perSeduta > 0 && ps.intensita !== 'bassa') {
        const ammessi = es.filter(e => !e.tecnica && adatta('drop', e.name));
        /* INT-2d (M1, MAV-13): solo sull'ultimo ISOLAMENTO ammesso (classi D ed E): senza, niente drop set. Prima ripiegava su qualunque esercizio ammesso (Lat Machine, Rematore alla Macchina: 49 programmi su 2.500)
           e la nota «drop set sull'ultimo isolamento» mentiva */
        const e = ammessi.filter(x => classeDE(x.name)).pop();
        /* W0-T7 (collaudo DUR-01): il drop set costa tempo (secDrop) e arriva dopo il taglio per il tempo: solo se la seduta ci sta ancora */
        if (e && durataSeduta(es) + PARAM_TEMPO.secDrop / 60 <= minuti * (1 + PARAM_TEMPO.tolleranzaSforamento)) cand.push({ e: e, tecnica: 'drop', rischio: rischioTecnica('drop', e.name), slot: 'poco' });
      }
    }
    const primo = es.find(e => (findExercise(e.name) || {}).type === 'compound');
    /* over 65: «potenza» solo sul primo multiarticolare su macchina (la libreria non ha l alzata dalla sedia): niente carico libero sotto velocita */
    const primoGuidato = over65 ? es.find(e => (findExercise(e.name) || {}).type === 'compound' && adatta('potenza', e.name)) : null;
    if (primoGuidato) { primoGuidato.tecnica = 'potenza'; potenzaAssegnata = true; }
    else if (!minore && (parqSi || over65)) es.forEach(e => { if (tipoCarico(e.name) === 'pesante' && !e.tecnica && adatta('cluster', e.name)) e.tecnica = 'cluster'; });   /* il cluster non e per i minorenni (matrice MAV 3.3, G1c) */
    else if (bud.perSeduta > 0 && primo && !primo.tecnica && tipoCarico(primo.name) === 'pesante' && ps.intensita !== 'bassa') {
      const t = level === 'avanzato' ? 'backoff' : 'amrap';
      if (adatta(t, primo.name)) cand.push({ e: primo, tecnica: t, rischio: rischioTecnica(t, primo.name), slot: 'primo' });   /* AMRAP: a 1 ripetizione dal cedimento (MAV-06) */
    }
    /* MAV-07: le parziali in allungamento solo dove il cancello le ammette (isolamenti con il muscolo allungato: polpacci, curl inclinato, estensioni sopra la testa) */
    if ((level === 'avanzato' || (level === 'intermedio' && ps.intensita === 'alta')) && !poco && ps.intensita !== 'bassa' && bud.perSeduta > 0) {
      const iso = es.filter(e => !e.tecnica && adatta('parziali', e.name));
      if (iso.length) { const e = iso[iso.length - 1]; cand.push({ e: e, tecnica: 'parziali', rischio: rischioTecnica('parziali', e.name), slot: 'iso' }); }
    }
    return cand;
  });
  /* 2. il budget (MAV-08): quanti candidati e dove, la piu sicura per prima (MAV-05) */
  const scelte = distribuisciTecniche(candidati, bud.perSeduta, bud.perSettimana);
  const usate = {}, parzialiPerMuscolo = {};
  let dropAssegnato = false, nPoco = 0;
  scelte.forEach((lista, s) => lista.forEach(c => {
    let t = c.tecnica;
    if (c.slot === 'poco') {   /* MAV-13: il drop set e i myo-reps si alternano tra le sedute della settimana (una tecnica sullo stesso esercizio al massimo una volta) */
      const ordine = !regolaAttiva('MAV-13') ? ['drop'] : (nPoco % 2 === 0 ? ['drop', 'myo'] : ['myo', 'drop']);   /* MAV-13 spenta: solo il drop set, come prima */
      t = ordine.find(x => !usate[c.e.name + '|' + x] && adatta(x, c.e.name) && entraNelTetto(sedute[s].esercizi, c.e, x));
      if (!t) return;
      nPoco++;
    } else if (usate[c.e.name + '|' + t]) return;
    if (t === 'parziali') {
      const m = muscoloDellEsercizio(c.e.name);
      if ((parzialiPerMuscolo[m] || 0) >= S.parzialiPerMuscoloSettimana.v) return;
      parzialiPerMuscolo[m] = (parzialiPerMuscolo[m] || 0) + 1;
    }
    c.e.tecnica = t; usate[c.e.name + '|' + t] = true;
    if (t === 'drop') dropAssegnato = true;
  }));
  /* MAV-05: se in una seduta c'erano piu candidati del budget, il coach tiene la piu sicura e lo dice */
  if (bud.perSeduta > 0 && candidati.some(l => l.length > bud.perSeduta)) aggiungiPerche(brief, 'MAV-05', MOTIVI_TECNICHE.sicura);
  /* MAV-16: l'onesta sulle tecniche: fanno risparmiare tempo, non fanno crescere di piu */
  if (dropAssegnato) { const t = 'Il drop set e i myo-reps servono a risparmiare tempo: non fanno crescere di più.'; note.push(t); aggiungiPerche(brief, 'MAV-16', t); }
  /* MAV-11: chi inizia, i minorenni e gli over 65 scendono piano (2-3 secondi), senza tecniche */
  if ((chi.principiante || over65 || minore) && regolaAttiva('MAV-11')) { const t = 'Scendi piano: ' + S.discesaSecondi.v[0] + '-' + S.discesaSecondi.v[1] + ' secondi in discesa.'; note.push(t); aggiungiPerche(brief, 'MAV-11', t); }
  brief.lavoro.dropAssegnato = dropAssegnato;
  brief.lavoro.potenzaAssegnata = potenzaAssegnata;
  return sedute;
}

/* il controllo finale (verificaProgramma, stadio 17): le tecniche che hanno messo il metodo famoso, il tocco o la scelta dell utente passano dallo stesso cancello e dallo
   stesso budget (MAV-01, MAV-08). Toglie cio che non e ammesso (livello, eta, esercizio) e, se una seduta o la settimana ne ha troppe, tiene le piu sicure (MAV-05).
   Ritorna le note da aggiungere al programma. */
function validaTecniche(brief, sedute) {
  const bud = budgetTecniche(brief, null), ctx = { budget: bud };
  let tolte = 0;
  sedute.forEach(sd => {
    sd.esercizi.forEach(e => { if (e.tecnica && !tecnicaAdatta(e.tecnica, e.name, brief, ctx).ok) { delete e.tecnica; tolte++; } });
    if (!brief.metodo.attivo) tolte += filtraCoppie(brief, sd, ctx);   /* le coppie dei metodi sono dei metodi (ABB-07: non vale con un metodo) */
  });
  /* il budget per seduta e per settimana: solo le tecniche verso il cedimento (TECNICHE_INTENSE) */
  const intense = sedute.map(sd => sd.esercizi.filter(e => e.tecnica && tecnicaContaNelBudget(e.tecnica)).map(e => ({ e: e, tecnica: e.tecnica, rischio: rischioTecnica(e.tecnica, e.name) })));
  intense.forEach(lista => scegliTecnicheSicure(lista, bud.perSeduta).scartate.forEach(c => { delete c.e.tecnica; tolte++; }));
  const rimaste = [];
  sedute.forEach((sd, s) => sd.esercizi.forEach(e => { if (e.tecnica && tecnicaContaNelBudget(e.tecnica)) rimaste.push({ e: e, s: s, rischio: rischioTecnica(e.tecnica, e.name) }); }));
  if (rimaste.length > bud.perSettimana) {
    rimaste.map((c, i) => ({ c: c, i: i })).sort((x, y) => (y.c.rischio - x.c.rischio) || (y.i - x.i)).slice(0, rimaste.length - bud.perSettimana).forEach(x => { delete x.c.e.tecnica; tolte++; });
  }
  if (!tolte) return [];
  const t = 'Ho tolto qualche tecnica: non è adatta a te o è troppa in una settimana. Restano le serie normali.';
  aggiungiPerche(brief, 'MAV-01', t);
  return [t];
}
