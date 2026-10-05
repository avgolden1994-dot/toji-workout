/* Cancello delle tecniche: quale tecnica, su quale esercizio, a chi e quando (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   IL CANCELLO DELLE TECNICHE (piano coach v2, W2-T3; docs/ricerca-metodi-avanzati-intensita.md 3.2, 3.3, 4.1, 4.2)
   Le tecniche di intensita (drop set, rest-pause, myo-reps, cluster, superserie, parziali, AMRAP...) non fanno crescere di piu delle serie normali
   a parita di volume: fanno risparmiare tempo o fatica, e costano sforzo (meta-analisi 2022-2026, Solida). Per questo il coach le dosa con un cancello solo,
   che prima era sparso in ricette.js, tecniche.js, regole-nuove.js e regole-ricerca.js:
     tecnicaAdatta(tecnica, nome, brief, ctx)  una tecnica su un esercizio e ammessa? { ok, codice, motivo, gruppo }
     budgetTecniche(brief, settimana, ctx)      quante per seduta e per settimana, quali gruppi questa settimana, e perche gli altri no
   Chi decide cosa, per ordine (la matrice completa e nella nota, 3.2 e 3.3):
     1. la persona (livello, eta, PAR-Q, momento di vita, Sentinella): principiante, minorenne, over 65 e modalita prudente hanno solo le tecniche leggere
        (tempo, superserie su esercizi non pesanti, cluster e potenza dove la matrice li ammette); dai 50 ai 64 anni le tecniche verso il cedimento solo sugli
        isolamenti (classi D ed E); chi non e in una di queste classi ha un budget (1 tecnica intensa per seduta e 2 a settimana l'intermedio, 2 e 6 l'avanzato);
     2. il giorno: nello scarico, con prontezza sotto 50 o in un periodo di vita «senza tecniche» nessuna tecnica intensa; nella prima settimana del blocco
        nessuna, nelle settimane di mezzo solo le parziali in allungamento, il tetto del livello nelle ultime (MAV-08, 4.2); con poco tempo (<= 45 minuti)
        niente cluster ne parziali;
     3. l'esercizio, con gli ATTRIBUTI (js/dati/attributi-esercizi.js: classe A-F, schema, abilita, profilo, stress per zona), mai con il nome: il core, le tenute e
        il corpo libero a zero kg (classe F) non hanno tecniche; i cedimenti non vanno su stacchi (cerniera), spinte sopra la testa, abilita 3 o sull'esercizio che carica
        la zona del fastidio dichiarato; le parziali solo dove il muscolo e allungato (profilo allungato, classi D ed E).
   MAV-14 e bloccata dalla verifica (registro C.2 n. 14): non c'e, ne come tecnica ne come testo. Una tecnica fuori da GRUPPO_TECNICA non passa mai.
   Fonti dei numeri: sicurezza/soglie-tecniche.js. Il resto e la matrice della nota (Convenzione, prudenza).
   ============================================================ */

/* gruppo di ogni tecnica (3.3): G1 tempo e velocita, G1b superserie antagoniste, G1c cluster, G1p piramide, G2 verso il cedimento (drop set, rest-pause, myo-reps, AMRAP,
   back-off, calibrazione), G2b parziali in allungamento, G3 forzate e negative (solo manuali: il coach non le assegna mai), G5 8x8 (Gironda). Chi non e qui non e ammesso. */
const GRUPPO_TECNICA = {
  tempo: 'G1', picco: 'G1', potenza: 'G1', superserie: 'G1b', cluster: 'G1c', piramide: 'G1p', ottoperotto: 'G5',
  drop: 'G2', riposopausa: 'G2', myo: 'G2', amrap: 'G2', backoff: 'G2', calibrazione: 'G2', parziali: 'G2b', negativa: 'G3', forzate: 'G3'
};
/* matrice tecnica x classe (3.2), nell'ordine A B C D E F: O = si, C = con una condizione (condizioneClasse), - = no.
   A bilanciere libero pesante, B multiarticolare libero, C multiarticolare guidato, D isolamento a macchina o cavo, E isolamento libero, F core, tenute e corpo libero a zero kg.
   Il cluster non serve sugli isolamenti (D, E: nessun vantaggio); la piramide e l'8x8 non vanno sul core; le parziali solo dove si allunga il muscolo (C, D, E) */
const CLASSI_PER_TECNICA = {
  tempo: 'OOOOOO', picco: 'OOOOO-', potenza: '--O---', superserie: '-OOOOC', cluster: 'OOO---', piramide: 'OOOOO-', ottoperotto: '-OOOO-',
  drop: '-CCOO-', riposopausa: '--COO-', myo: '--COO-', amrap: 'COOOO-', backoff: 'COO---', calibrazione: '---OO-', parziali: '--COO-',
  negativa: '--CC--', forzate: '--CC--'
};
const ORDINE_CLASSI = 'ABCDEF';
/* quanto e rischiosa una tecnica (MAV-05: nel tetto si tiene la piu sicura, non la prima della lista): classe dell'esercizio (D macchina e cavo, poi E, C, B, A) e tecnica */
const RISCHIO_CLASSE = { D: 0, E: 1, C: 2, B: 3, A: 4, F: 5 };
const RISCHIO_TECNICA = { calibrazione: 0, parziali: 1, drop: 2, myo: 2, riposopausa: 3, amrap: 4, backoff: 4, negativa: 5, forzate: 6 };
/* le frasi che l'utente puo leggere (il perche di una tecnica tolta); sono tradotte (docs/in-arrivo/w2-t3.json) */
const MOTIVI_TECNICHE = {
  principiante: 'Per ora niente serie al cedimento: la tecnica viene prima.',
  prudente: 'Con la modalità prudente niente serie al cedimento: meglio qualche ripetizione in riserva.',
  minorenne: 'Alla tua età conta imparare bene i movimenti: niente massimali né serie al limite, lascia sempre 2-3 ripetizioni in riserva.',
  over65: 'Dai 65 anni niente serie al limite: la stessa crescita arriva con più ripetizioni in riserva.',
  mezzaEta: 'Dai 50 anni le serie al limite solo su macchine e isolamenti, non sui multiarticolari liberi.',
  classe: 'Questa tecnica va bene su macchine e cavi con tecnica stabile: qui meglio una discesa controllata.',
  core: 'Sul core non serve il cedimento: conta il controllo.',
  scarico: 'Questa settimana tieni le tecniche leggere: le serie dure arrivano nelle ultime settimane.',
  prontezza: 'Oggi niente serie dure: con questa prontezza meglio una seduta tranquilla.',
  momento: 'In questo periodo niente tecniche intense: il piano resta semplice.',
  poco: 'Con poco tempo questa tecnica allunga la seduta: meglio le superserie.',
  fastidio: 'Su questo esercizio niente tecniche: carica la zona del tuo fastidio.',
  sicura: 'Teniamo la tecnica più sicura tra quelle previste.',
  sconosciuta: 'Questa tecnica non è tra quelle che il coach assegna.',
  parziali: 'Le parziali servono dove il muscolo è allungato: qui meglio il movimento completo.'
};

/* ---- la persona, dal brief del programma (briefCoach) o da quello di oggi (briefOggi): le due forme hanno gli stessi campi che servono qui ---- */
function personaTecniche(brief) {
  const b = brief || {}, chi = b.chi || {};
  const eta = Number(chi.eta) || 0;
  const livello = ['principiante', 'intermedio', 'avanzato'].indexOf(chi.livello) !== -1 ? chi.livello : 'intermedio';
  const minore = !!chi.minorenne || (eta > 0 && eta < PARAM_ETA.maggiorenne);
  const over65 = !!chi.over65 || eta >= 65;
  const parq = !!chi.parq;
  return { livello: livello, eta: eta, minore: minore, over65: over65, parq: parq, principiante: livello === 'principiante', cauto: minore || over65 || parq,
    mezzaEta: !over65 && eta >= SOGLIE_TECNICHE.etaMezzaEta.v };
}
function fastidiDelBrief(brief) {
  const b = brief || {};
  return ((b.sicurezza && b.sicurezza.fastidi) || b.fastidi || []).filter(f => f && f !== 'nessuno');
}
function vincoliDelBrief(brief) {
  const b = brief || {};
  return (b.sicurezza && b.sicurezza.vincoli) || b.vincoli || null;
}
/* il nome di libreria dell'esercizio (con l'emoji): un nome gia completo resta com'e, uno senza emoji si ritrova (come tipoCarico) */
function nomeCompletoTecnica(nome) {
  return findExercise(nome) ? nome : (nomeInLibreria(senzaEmoji(nome)) || nome);
}
/* il fastidio dichiarato carica questo esercizio? (stress 1 = cautela, 2 = controindicato: attributo `stress`, non il nome) */
function esercizioCaricaIlFastidio(nome, fastidi) {
  return (fastidi || []).some(f => f && f !== 'nessuno' && (stressArticolare(nome, f) || 0) >= 1);
}

/* MAV-02: niente cedimento sul core, sulle tenute, a peso zero (togliere il 20% non ha senso) e sulle cerniere (stacchi: rapporto stimolo/fatica, ABB-09).
   Dall'attributo, non dal nome: classe F, gruppo core, esercizio a tempo, peso di libreria zero, schema hinge. */
function esercizioSenzaCedimento(nome) {
  nome = nomeCompletoTecnica(nome);
  const a = attributi(nome), m = findExercise(nome) || {};
  if (!a) return true;
  return a.classe === 'F' || m.group === 'core' || isTimeBased(nome) || !(m.weight > 0) || a.schema === 'hinge';
}
/* MAV-02 (revisione dell'onda 0): niente cedimento neppure sulle spinte sopra la testa e sugli esercizi di abilita 3 (front squat, military...), ne sull'esercizio
   che carica di piu la zona del fastidio dichiarato */
function esercizioSenzaCedimentoPer(nome, fastidi) {
  if (esercizioSenzaCedimento(nome)) return true;
  const a = attributi(nome);
  if (a.schema === 'spintaV' || a.abilita >= 3) return true;
  return esercizioCaricaIlFastidio(nome, fastidi);
}

/* dove cade il blocco: { tier, p, L } con tier 2 = il tetto del livello, 1 = solo le parziali in allungamento, 0 = nessuna tecnica intensa (MAV-08, 4.2).
   `settimana` = { numero, fase, fasi? } (settimanaProgramma, o il piano); senza settimana (generazione del programma, che si ripete in ogni settimana) vale il tetto. Se il programma
   ha il piano di W2-T4 (programma.piano.settimane[n].tecniche = 'G1' o 'G2') il piano puo solo restringere. */
function posizioneNelBlocco(settimana, programma, piano) {
  const S = SOGLIE_TECNICHE;
  if (!settimana) return { tier: 2, p: null, L: null, fase: null };
  const num = Number(settimana.numero), fase = settimana.fase || null;
  if (fase && fase !== 'carico') return { tier: 0, p: null, L: null, fase: fase };
  const fasi = settimana.fasi || (programma && programma.fasi) || null;
  let tier = 2, p = null, L = null;
  if (fasi && num >= 1 && num <= fasi.length) {
    let inizio = num - 1; while (inizio > 0 && fasi[inizio - 1] === 'carico') inizio--;
    let fine = num - 1; while (fine + 1 < fasi.length && fasi[fine + 1] === 'carico') fine++;
    p = num - inizio; L = fine - inizio + 1;
    const tetto = L >= S.bloccoLungoDa.v ? S.settimaneTettoBloccoLungo.v : S.settimaneTettoBloccoCorto.v;
    if (p <= S.settimaneSenzaTecnicheInizio.v) tier = 0;
    else if (p > L - tetto) tier = 2;
    else if (p === L - tetto) tier = 1;
    else tier = 0;
  }
  const voce = piano && Array.isArray(piano.settimane) ? piano.settimane.find(s => s && Number(s.n) === num) : null;
  if (voce && voce.tecniche === 'G1') tier = 0;
  return { tier: tier, p: p, L: L, fase: fase };
}

/* MAV-08 / MAV-01: il budget di oggi. { perSeduta, perSettimana, gruppi, negati, tier, perSeduta... }
   gruppi = i gruppi di tecniche ammessi a questa persona in questa settimana; negati[gruppo] = { codice, motivo } del primo motivo per cui un gruppo non c'e.
   `settimana`: undefined = quella del brief (briefOggi), null = nessuna (la generazione: vale il tetto del blocco). ctx: { prontezza, programma, piano, settimana }. */
function budgetTecniche(brief, settimana, ctx) {
  ctx = ctx || {};
  const b = brief || {}, S = SOGLIE_TECNICHE, P = personaTecniche(b);
  if (settimana === undefined) settimana = ctx.settimana !== undefined ? ctx.settimana : (b.settimana || null);
  const programma = ctx.programma || b.programma || null;
  const piano = ctx.piano || (programma && programma.piano) || null;
  const minuti = Number(ctx.minuti) || Number(b.agenda && b.agenda.minuti) || 0;
  const poco = minuti > 0 && minuti <= S.pocoTempoMinuti.v;
  const pos = posizioneNelBlocco(settimana, programma, piano);
  const negati = {};
  const vieta = (gr, codice, motivo) => { gr.forEach(g => { if (!negati[g]) negati[g] = { codice: codice, motivo: motivo }; }); };
  const intense = ['G1p', 'G2', 'G2b', 'G3', 'G5'];   /* verso il cedimento o a volume alto: mai a chi e fragile, nello scarico o con poca prontezza */
  /* 1. la persona (3.3): il cluster e per chi e prudente o gia allenato, non per il minorenne ne per il principiante sano */
  if (P.minore) vieta(['G1c'], 'ETA-02', MOTIVI_TECNICHE.minorenne);
  else if (!P.cauto && P.principiante) vieta(['G1c'], 'MAV-03', MOTIVI_TECNICHE.principiante);
  if (P.minore) vieta(intense, 'ETA-02', MOTIVI_TECNICHE.minorenne);
  else if (P.over65) vieta(intense, 'MAV-03', MOTIVI_TECNICHE.over65);
  else if (P.parq) vieta(intense, 'MAV-03', MOTIVI_TECNICHE.prudente);
  else if (P.principiante) vieta(intense, 'MAV-03', MOTIVI_TECNICHE.principiante);
  /* la Sentinella (vincoliSicurezza) e il solo canale dei limiti: se non ammette G2 o G2b, qui non entrano mai (il cancello non rende possibile cio che una salvaguardia vieta) */
  const v = vincoliDelBrief(b);
  if (v && Array.isArray(v.gruppiTecniche)) {
    if (v.gruppiTecniche.indexOf('G2') === -1) vieta(['G2', 'G1p', 'G5'], 'MAV-03', MOTIVI_TECNICHE.principiante);
    if (v.gruppiTecniche.indexOf('G2b') === -1) vieta(['G2b'], 'MAV-03', MOTIVI_TECNICHE.principiante);
  }
  vieta(['G3'], 'MAV-01', MOTIVI_TECNICHE.sconosciuta);   /* forzate e negative: solo manuali, il coach non le assegna mai (3.2) */
  /* 2. il giorno: scarico, prontezza bassa, periodo di vita senza tecniche */
  const momento = (b.mente && b.mente.momento) || b.momento || null;
  if (momento && !momento.scaduto && momento.tecniche === false) vieta(intense, 'MAV-08', MOTIVI_TECNICHE.momento);
  const fase = (settimana && settimana.fase) || null;
  if (fase && fase !== 'carico') vieta(intense, 'MAV-08', MOTIVI_TECNICHE.scarico);
  const pr = ctx.prontezza !== undefined ? ctx.prontezza : b.prontezza;
  if (typeof pr === 'number' && pr < COACH_PARAMETRI.prontezzaMedia) vieta(intense, 'MAV-08', MOTIVI_TECNICHE.prontezza);
  /* 3. la posizione nel blocco (solo le tecniche verso il cedimento): nessuna nella prima settimana, solo le parziali in quelle di mezzo (l'intermedio solo nel blocco lungo) */
  if (pos.tier === 0) vieta(['G2', 'G2b'], 'MAV-08', MOTIVI_TECNICHE.scarico);
  else if (pos.tier === 1) {
    vieta(['G2'], 'MAV-08', MOTIVI_TECNICHE.scarico);
    if (P.livello !== 'avanzato' && pos.L < S.bloccoLungoDa.v) vieta(['G2b'], 'MAV-08', MOTIVI_TECNICHE.scarico);
  }
  /* 4. poco tempo: il cluster allunga la seduta, le parziali e l'8x8 non la accorciano */
  if (poco) vieta(['G1c', 'G2b', 'G5'], 'MAV-01', MOTIVI_TECNICHE.poco);
  const gruppi = ['G1', 'G1b', 'G1c', 'G1p', 'G2', 'G2b', 'G3', 'G5'].filter(g => !negati[g]);
  /* il budget conta solo le tecniche verso il cedimento (G2 e G2b) */
  let perSeduta = 0, perSettimana = 0;
  if (gruppi.indexOf('G2') !== -1 || gruppi.indexOf('G2b') !== -1) {
    if (P.livello === 'avanzato') { perSeduta = S.budgetSedutaAvanzato.v; perSettimana = (b.lavoro && b.lavoro.specializza) ? S.budgetSettimanaSpecializzazione.v : S.budgetSettimanaAvanzato.v; }
    else { perSeduta = S.budgetSedutaIntermedio.v; perSettimana = S.budgetSettimanaIntermedio.v; }
  }
  return { perSeduta: perSeduta, perSettimana: perSettimana, gruppi: gruppi, negati: negati, tier: pos.tier, posizione: pos, persona: P, poco: poco };
}

/* le condizioni delle celle «C» della matrice (3.2) */
function condizioneClasse(tecnica, classe, a, P, nome) {
  if (tecnica === 'superserie' && classe === 'F') return (findExercise(nomeCompletoTecnica(nome)) || {}).group !== 'core' && !isTimeBased(nomeCompletoTecnica(nome));   /* corpo libero a zero kg si, core e tenute no (SS-02) */
  if (tecnica === 'drop') {
    if (classe === 'B') return a.attrezzo === 'manubri' && a.serve.indexOf('panca') !== -1 && !P.principiante;   /* manubri su panca, ultima serie, intermedio e oltre */
    if (classe === 'C') return P.livello === 'avanzato' || (a.schema !== 'squat' && a.schema !== 'affondo');   /* niente leg press e hack se non avanzato */
  }
  if (tecnica === 'riposopausa' || tecnica === 'myo' || tecnica === 'parziali') {
    if (classe === 'C') return a.schema !== 'squat' && a.schema !== 'affondo';   /* chest press, shoulder press, lat machine, row; non leg press ne hack */
  }
  if (tecnica === 'amrap' && classe === 'A') return !P.principiante;   /* bilanciere libero: intermedio e oltre, RIR reale almeno 1 (MAV-06) */
  if (tecnica === 'backoff' && classe === 'A') return P.livello === 'avanzato';
  return false;
}
function macchinaOCavo(a) { return !!a && (a.attrezzo === 'macchina' || a.attrezzo === 'cavo'); }

/* MAV-01: la tecnica `tecnica` su l'esercizio `nome` e ammessa a questa persona? ctx: { settimana, prontezza, coppia (l'altro esercizio di una superserie), budget (gia calcolato) }.
   Ritorna { ok, codice, motivo, gruppo, tecnica }: se non e ok, `codice` e `motivo` dicono perche (frasi tradotte); nessuna tecnica = ok. */
function tecnicaAdatta(tecnica, nome, brief, ctx) {
  ctx = ctx || {};
  if (!tecnica || tecnica === '-') return { ok: true, codice: null, motivo: '', gruppo: null, tecnica: tecnica || null };
  const gruppo = GRUPPO_TECNICA[tecnica] || null;
  const no = (codice, motivo) => ({ ok: false, codice: codice, motivo: motivo, gruppo: gruppo, tecnica: tecnica });
  if (!gruppo) return no('MAV-01', MOTIVI_TECNICHE.sconosciuta);
  const P = personaTecniche(brief), fastidi = fastidiDelBrief(brief);
  const bud = ctx.budget || budgetTecniche(brief, ctx.settimana, ctx);
  if (bud.gruppi.indexOf(gruppo) === -1) { const n = bud.negati[gruppo] || { codice: 'MAV-01', motivo: MOTIVI_TECNICHE.classe }; return no(n.codice, n.motivo); }
  if (tecnica === 'potenza' && !P.over65) return no('MAV-03', MOTIVI_TECNICHE.classe);   /* la potenza e la tecnica degli over 65 (macchina o alzata dalla sedia, PRI-16) */
  const a = attributi(nome);
  if (!a) return tecnica === 'tempo' ? { ok: true, codice: null, motivo: '', gruppo: gruppo, tecnica: tecnica } : no('MAV-01', MOTIVI_TECNICHE.classe);
  const cella = (CLASSI_PER_TECNICA[tecnica] || '------').charAt(ORDINE_CLASSI.indexOf(a.classe));
  if (cella === '-') { const core = a.classe === 'F' && (gruppo === 'G2' || gruppo === 'G2b'); return no(core ? 'MAV-02' : 'MAV-01', core ? MOTIVI_TECNICHE.core : MOTIVI_TECNICHE.classe); }
  if (cella === 'C' && !condizioneClasse(tecnica, a.classe, a, P, nome)) return no('MAV-01', MOTIVI_TECNICHE.classe);
  /* persona x classe: oltre i 65 anni solo macchine e cavi; dai 50 ai 64 le tecniche verso il cedimento solo sugli isolamenti */
  if (P.over65 && (tecnica === 'cluster' || tecnica === 'potenza') && a.classe !== 'C') return no('MAV-03', MOTIVI_TECNICHE.over65);
  if (P.mezzaEta && (gruppo === 'G2' || gruppo === 'G2b') && a.classe !== 'D' && a.classe !== 'E') return no('MAV-03', MOTIVI_TECNICHE.mezzaEta);
  /* la tecnica verso il cedimento: dall'attributo, mai dal nome (MAV-02) */
  if ((gruppo === 'G2' || gruppo === 'G2b') && esercizioSenzaCedimentoPer(nome, fastidi)) return no('MAV-02', esercizioSenzaCedimento(nome) ? MOTIVI_TECNICHE.core : MOTIVI_TECNICHE.classe);
  if (tecnica === 'parziali' && a.profilo !== 'allungato') return no('MAV-07', MOTIVI_TECNICHE.parziali);   /* le parziali in allungamento servono dove il muscolo e allungato (polpacci, curl inclinato, estensioni sopra la testa...) */
  /* il fastidio dichiarato: nessuna tecnica (tranne la discesa controllata) sull'esercizio che ne carica la zona */
  if (tecnica !== 'tempo' && esercizioCaricaIlFastidio(nome, fastidi)) return no('MAV-02', MOTIVI_TECNICHE.fastidio);
  /* la superserie: oltre i 65 anni solo tra macchine e cavi; mai un fondamentale pesante (ABB-06: la classe A e un no della matrice, anche per il compagno) */
  if (tecnica === 'superserie') {
    if (P.over65 && !macchinaOCavo(a)) return no('MAV-03', MOTIVI_TECNICHE.over65);
    if (ctx.coppia) { const r2 = tecnicaAdatta('superserie', ctx.coppia, brief, Object.assign({}, ctx, { coppia: null })); if (!r2.ok) return r2; }
  }
  return { ok: true, codice: null, motivo: '', gruppo: gruppo, tecnica: tecnica };
}

/* MAV-05: quanto e rischiosa questa tecnica su questo esercizio (piu basso = piu sicura): prima la classe dell'esercizio, poi la tecnica */
function rischioTecnica(tecnica, nome) {
  const a = attributi(nome), c = a && RISCHIO_CLASSE[a.classe] !== undefined ? RISCHIO_CLASSE[a.classe] : 6;
  return c * 10 + (RISCHIO_TECNICA[tecnica] !== undefined ? RISCHIO_TECNICA[tecnica] : 3);
}
/* MAV-05: tra i candidati si tengono i `max` piu sicuri, non i primi della lista; a parita il primo. { tenute, scartate } */
function scegliTecnicheSicure(candidati, max) {
  const ord = candidati.map((c, i) => ({ c: c, i: i })).sort((x, y) => (x.c.rischio - y.c.rischio) || (x.i - y.i)).map(x => x.c);
  const n = Math.max(0, Number(max) || 0);
  return { tenute: ord.slice(0, n), scartate: ord.slice(n) };
}
/* MAV-09: quante serie vale una tecnica nel conteggio del volume (drop set 2, rest-pause e myo-reps 3, le altre 1) */
function serieEquivalentiTecnica(tecnica) {
  const t = SOGLIE_TECNICHE.serieEquivalenti.v;
  return t[tecnica] !== undefined ? t[tecnica] : 1;
}
/* le tecniche che contano per il budget: quelle verso il cedimento (TECNICHE_INTENSE, regole-nuove.js) e il back-off, la «seconda» dell avanzato (4.1) */
function tecnicaContaNelBudget(tecnica) {
  return TECNICHE_INTENSE.indexOf(tecnica) !== -1 || tecnica === 'backoff';
}

/* il brief di una seduta aperta oggi: quello leggero (briefOggi) con in piu cio che il cancello legge dal profilo salvato (fastidi, minuti, sicurezza) */
function briefTecnicheOggi(giorno) {
  const b = typeof briefOggi === 'function' ? briefOggi(giorno) : {};
  const p = (typeof getProfile === 'function' ? getProfile() : null) || {};
  b.sicurezza = { fastidi: (p.fastidi || []).filter(f => f && f !== 'nessuno'), vincoli: b.vincoli || null };
  b.agenda = { minuti: Number(p.minutes) || 60 };
  b.mente = { momento: b.momento || null };
  const prog = typeof getProgramma === 'function' ? getProgramma() : null;
  if (prog && prog.piano) b.programma = Object.assign({}, b.programma || {}, { piano: prog.piano });
  return b;
}
