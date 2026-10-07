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
     4 settimane -20%, fino a 3 mesi -30%, oltre -50%. I giorni sono quelli veri
     per tutti (onda 0: per gli over 65 si contavano doppi e 5 giorni davano gia
     «Rientro dopo 5 giorni: -10%»; l eta resta protetta dal RIR 3-4, dagli aumenti
     dimezzati e dalla ripresa al 95%).
   - Scarico mirato (Dr. Muscle): massimale stimato in calo per due
     sedute di fila su un esercizio = -10% e meta serie solo li.
   Onda 0 del coach v2 (W0-T4, docs/piano-coach-v2.md E.1):
   - MES-02 (ponte) RIR di partenza per livello: principiante 3-4 nelle prime due settimane e poi 2-3, mai 0;
     intermedio e avanzato almeno 2 nella prima settimana del blocco e almeno 1 sui pesanti col bilanciere (anche con rirSett).
   - MES-06 carico di riferimento nello scarico (W0-T3 + W0-T4, una sola implementazione, qui in caricoProssimoBase): la stessa dose
     su un carico fisso (caricoRiferimento, progressivo.js), uguale in tutte le sedute della settimana; la prima seduta dopo uno scarico
     riuscito riparte da li (95% in prudenza, al massimo +25% sull ultima seduta) con un RIR in piu (testoRir); se lo scarico e mancato
     il carico resta com e. Prima i carichi si componevano (60, 54, 48,5 kg). Lo scarico deciso dal coach (CAR-10) e in dolore-mattina.js.
   - MES-10 lo scarico fuori dalle analisi (inScarico): il massimale in calo (CAR-08) non lo conta e vuole il 3% (il rumore del RIR).
   - CAR-06 (ETA-18) aumenti dimezzati anche dopo i 65 anni, come dice il capitolo 14 della mappa.
   - CAR-07 (PCO-01, riga del principiante) lo schema 5x3 solo con obiettivo forza; altrimenti stesso peso, 30 secondi in piu, poi -5%.
   - CAR-14 (B10, ponte) la taratura del RIR non impara piu dal confronto tra serie diverse: ogni taratura dimezza la correzione
     appresa (rirBias) e non si fa a principianti, minori, over 65, modalita prudente e sul core.
   Onda 1 del coach v2 (W1-T3, nessun cambiamento di comportamento): caricoProssimo, applicaCaricoProgressivo e imparaDallaSeduta non sono piu
   avvolte da altri file ma catene di fasi registrate (regia/fasi.js, piano B.3), con l ordine scritto: la fase 10 di ognuna e in questo file
   (caricoProssimoBase, carichiDelGiorno, contaStalli), le altre nei file delle loro regole. Spostati: DOSE_SCARICO e livelloFatica in
   sicurezza/scarico.js, e1rmSerie e e1rmSeduta in carichi/e1rm.js, la taratura del RIR (CAR-14) in carichi/taratura.js.
   ============================================================ */
/* tecniche speciali che il coach assegna (quando e perche: vedi Opzioni > Il coach).
   MAV-16 (W2-T3): i testi sono onesti: drop set, myo-reps, rest-pause e cluster non fanno crescere di piu delle serie normali a parita di volume, fanno risparmiare tempo o fatica
   (meta-analisi 2022-2026, Solida). MAV-06: l AMRAP si ferma a 1 ripetizione dal cedimento. MAV-07: le parziali sono facoltative e solo dove il muscolo e allungato. */
const TECNICHE = {
  drop: 'Drop set sull’ultima serie: arrivato vicino al cedimento togli il 20% e continua, due volte. Non fa crescere di più: serve a risparmiare tempo',
  myo: 'Myo-reps: una serie da 12-20 ripetizioni vicino al cedimento, poi 3-5 mini-serie da 3-5 ripetizioni con 10-20 secondi di pausa. Non fa crescere di più: serve a risparmiare tempo',
  cluster: 'Cluster: 30 secondi di pausa ogni 2 ripetizioni. Non fa crescere di più: serve ad arrivare meno stanco',
  potenza: 'Potenza: salita veloce con un carico leggero (40-60%), discesa controllata',
  amrap: 'Ultima serie: arriva a 1 ripetizione dal cedimento e fermati se la velocità cala o la tecnica cede',
  backoff: 'Back-off: dopo la serie piu pesante, le altre a -5%',
  parziali: 'A fine serie, dopo il cedimento, 3-6 ripetizioni solo nella parte in cui il muscolo è allungato. Facoltativo: non è dimostrato che batta il movimento completo',
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
  const eta = Number(p.age) || 0;
  return { livello: p.level || 'intermedio', eta: eta, prudente: !!p.parq,
           sonnoMale: !!(p.prefs && p.prefs.sonno === 'male'),
           minorenne: eta > 0 && eta < PARAM_ETA.maggiorenne };   /* ETA-02 (INT-2a): un età non detta (0) vale adulto, come per i programmi già salvati */
}
const BIL_PESANTI = /Squat con Bilanciere|Squat con Pausa|Front Squat|Stacco(?! Rumeno (?:con Manubri|a una Gamba))|Panca con Pausa|Panca Presa Stretta|Panca Piana Bilanciere|Panca Inclinata Bilanciere|Panca Declinata|Military Press|Rematore con Bilanciere|T-Bar Row|Good Morning/;
function tipoCarico(nome) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('tipoCarico') : null;   /* dentro buildProgram: una volta per nome */
  if (t !== null) { const v = t.get(nome); if (v !== undefined) return v; }
  const m = findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '');
  const r = (!m || m.type !== 'compound') ? 'isolamento' : (BIL_PESANTI.test(senzaEmoji(nome)) ? 'pesante' : 'macchina');
  if (t !== null) t.set(nome, r);
  return r;
}
const RIR_TIPO = { pesante: [1, 3], macchina: [0, 2], isolamento: [0, 1] };
/* MES-02 (ponte dell onda 0): una tabella sola per il RIR di partenza (registro B5; collaudo RIR-02 e RIR-03). Principiante: 3-4
   ripetizioni in riserva nelle prime due settimane e 2-3 dopo, mai 0 (le stime del RIR sbagliano di circa una ripetizione: Halperin
   2022). Intermedio e avanzato: almeno 2 nella prima settimana del blocco, su ogni tipo di esercizio, e almeno 1 sui fondamentali
   pesanti col bilanciere anche con la rampa dell avanzato (rirSett). Convenzione + Moderata; la tabella completa e di W2-T4. */
const MES_RIR = { principianteInizio: [3, 4], principianteDopo: [2, 3], principianteSettimaneInizio: 2, pisoPrimaSettimana: 2, pisoPesante: 1, pisoMinorenni: 2 };   /* pisoMinorenni: ETA-02, INT-2a (M3 della revisione dell onda 1): mai sotto 2 ripetizioni in riserva sotto i 18 anni, con o senza rirSett */
/* prima settimana di un blocco (1, 1 + blocco, ...); senza programma o senza la durata del blocco conta solo la settimana 1 */
function primaSettimanaBlocco(p, numero) {
  if (!(numero >= 1)) return false;
  return numero === 1 || !!(p && p.blocco > 0 && (numero - 1) % p.blocco === 0);
}
/* OBI-02: la fase del corpo e una sola per tutta l app (faseCorpo, regia/brief.js): il dimagrimento in qualunque posizione e un deficit, la fase scelta a mano vince */
function inDeficitCalorico() {
  return faseCorpo() === 'deficit';
}
/* PRN-01 / MES-02: il -1 RIR dell esigenza (>= 1,15) non porta mai sotto il pavimento del livello: ai principianti e in dimagrimento
   non si applica (99 = non si tocca), nella prima settimana del blocco non scende sotto 2 */
function pisoRirEsigenza(sett) {
  if (!regolaAttiva('MES-02')) return 0;
  if (inDeficitCalorico() || profiloCoach().livello === 'principiante') return 99;
  const n = sett || (settimanaProgramma() || {}).numero || 0;
  return primaSettimanaBlocco(getProgramma(), n) ? MES_RIR.pisoPrimaSettimana : 0;
}
/* sett = numero di settimana del programma (1..N): serve a rifare il bersaglio di una seduta passata (MES-11); senza, quella di oggi */
/* ETA-02 (M3, INT-2a): il minorenne lavora sempre con almeno 2 ripetizioni in riserva, in ogni percorso: anche con un programma senza rirSett (salvato dalla v1: le correzioni di RIR
   valgono subito, D-P5 a) dove prima un 16enne leggeva «lascia 0–0» sugli isolamenti, e anche dopo il -1 dell esigenza (ora i minorenni ne sono esclusi: esigenzaEsclusa) */
function pavimentoRirMinorenni(r) {
  const piso = MES_RIR.pisoMinorenni;
  return profiloCoach().minorenne && r[0] < piso ? [piso, Math.max(r[1], piso + 1)] : r;
}
/* INT-2d (M5 della revisione, MES-02): chi comincia non lavora mai sotto 2 ripetizioni in riserva (la tabella dice 3-4 nelle settimane 1-2 e 2-3 dopo, mai 0), in ogni percorso: anche con un programma
   salvato da un altro livello (un piano da intermedio con il livello poi cambiato in «principiante»: gli isolamenti arrivavano a [0, 1] alla 5ª settimana), senza rirSett (salvato dalla v1) o con la tabella spenta.
   Si legge il livello del momento (profiloCoach), come per i minorenni */
function pavimentoRirPrincipiante(r) {
  const piso = MES_RIR.principianteDopo[0];
  return profiloCoach().livello === 'principiante' && r[0] < piso ? [piso, Math.max(r[1], piso + 1)] : r;
}
function rirBersaglio(nome, sett) {
  const r = rirBersaglioBase(nome, sett);
  /* chi si ferma alla prima fatica si allena lontano dal cedimento (PRETIE-Q): stessa crescita fino a 3-4 RIR */
  let piu = psicoCoach((getProfile() || {}).psico).intensita === 'bassa' ? 1 : 0;
  const mo = momentoAttivo();
  if (mo && !mo.scaduto) piu += mo.rir || 0;
  if (typeof rirExtraIntensita === 'function') piu += rirExtraIntensita(nome);   /* INT-03/04: BIA con bandiere di prudenza, prima volta con l esercizio */
  let out = piu ? [Math.min(4, r[0] + piu), Math.min(5, r[1] + piu)] : r.slice();
  if (!piu && esigenzaCoach() >= 1.15 && tipoCarico(nome) !== 'pesante') {
    const a = Math.max(0, out[0] - 1);
    if (a >= pisoRirEsigenza(sett)) out = [a, Math.max(a, out[1] - 1)];
  }
  if (!stabile(nome) && out[0] < 1) out = [1, Math.max(2, out[1])];
  /* CST-02 (W4-T2, P4-S): +1 nelle due sedute dopo una pausa, su quello che varrebbe senza la pausa (sicurezza/popolazioni.js) */
  const rientro = typeof rirExtraRientro === 'function' ? rirExtraRientro(nome) : 0;
  if (rientro) out = [Math.min(4, out[0] + rientro), Math.min(5, out[1] + rientro)];
  out = pavimentoRirMinorenni(out);
  /* REC-04 (INT-4b, m9): con un fastidio dichiarato, mai sotto 2 sugli esercizi che restano con cautela (sicurezza/fastidi.js: solo alza) */
  if (typeof pavimentoRirFastidi === 'function') out = pavimentoRirFastidi(out, nome);
  /* ETA-08 a e REC-12 a (W4-T2, P4-S): il pavimento degli over 65 e della gravidanza, per ultimo (sicurezza/popolazioni.js: solo alza) */
  return typeof pavimentoRirPopolazioni === 'function' ? pavimentoRirPopolazioni(out, nome, sett) : out;
}
/* MES-02 (W2-T3, aggancio): la tabella del piano per settimana e classe, se c e (rirPianoSettimana, programma/mesociclo.js, W2-T4), decide il RIR della settimana; senza (oggi, o un
   programma salvato prima del piano) restano i valori di prima, rirBersaglioPerLivello. rirPianoSettimana(nome, sett) ritorna [min, max] (o { min, max }) per l esercizio in quella settimana,
   o niente se per questa persona la tabella non si applica. La prudenza vince sempre (modalita prudente e over 65 restano a 3-4, i minorenni a 2 o piu), il RIR non supera 4 e i
   fondamentali col bilanciere non scendono sotto MES_RIR.pisoPesante (collaudo RIR-02). */
function rirDalPiano(nome, sett) {
  if (typeof rirPianoSettimana !== 'function') return null;
  const pc = profiloCoach();
  if (pc.prudente || pc.eta >= 65) return null;
  /* INT-2d (M5): il piano di un altro livello non vale per chi ora e principiante (la tabella del principiante la da rirBersaglioPerLivello: 3-4 poi 2-3) */
  if (pc.livello === 'principiante') { const pr = getProgramma(); if (!pr || !pr.piano || pr.piano.livello !== 'principiante') return null; }
  let t = rirPianoSettimana(nome, sett);
  if (t && !Array.isArray(t) && isFinite(t.min) && isFinite(t.max)) t = [t.min, t.max];
  if (!Array.isArray(t) || t.length !== 2 || !isFinite(t[0]) || !isFinite(t[1])) return null;
  let r = [Math.max(0, Math.min(4, Number(t[0]))), Math.max(0, Math.min(4, Number(t[1])))];
  if (r[1] < r[0]) r = [r[0], r[0]];
  if (tipoCarico(nome) === 'pesante' && r[0] < MES_RIR.pisoPesante) r = [MES_RIR.pisoPesante, Math.max(r[1], MES_RIR.pisoPesante + 1)];
  return r;
}
function rirBersaglioBase(nome, sett) { return pavimentoRirPrincipiante(pavimentoRirMinorenni(rirDalPiano(nome, sett) || rirBersaglioPerLivello(nome, sett))); }
function rirBersaglioPerLivello(nome, sett) {
  const pc = profiloCoach();
  if (pc.prudente || pc.eta >= 65) return [3, 4];
  const p = getProgramma(), numero = sett || ((p && settimanaProgramma()) || {}).numero || 0;
  const nuova = regolaAttiva('MES-02'), tipo = tipoCarico(nome);
  /* principiante: 3-4 nelle prime due settimane, poi 2-3, mai 0 (MES-02, PRN-01) */
  if (nuova && pc.livello === 'principiante') return (numero >= 1 && numero <= MES_RIR.principianteSettimaneInizio ? MES_RIR.principianteInizio : MES_RIR.principianteDopo).slice();
  /* avanzati: RIR che scende nelle settimane del blocco (RP) */
  let r = RIR_TIPO[tipo];
  if (p && p.rirSett && numero >= 1 && numero <= p.rirSett.length) { const x = p.rirSett[numero - 1]; r = [x, x + 1]; }
  if (!nuova) return r;
  r = r.slice();
  if (tipo === 'pesante' && r[0] < MES_RIR.pisoPesante) r = [MES_RIR.pisoPesante, Math.max(r[1], MES_RIR.pisoPesante + 1)];
  if (primaSettimanaBlocco(p, numero) && r[0] < MES_RIR.pisoPrimaSettimana) r = [MES_RIR.pisoPrimaSettimana, Math.max(r[1], MES_RIR.pisoPrimaSettimana + 1)];
  return r;
}
/* La dose dello scarico (DOSE_SCARICO) e la fatica che la sceglie (livelloFatica) stanno in sicurezza/scarico.js (W1-T3) */
function storicoProntezza() { try { return JSON.parse(localStorage.getItem('coach_plus_prontezza_storia_' + currentMode) || '[]'); } catch (e) { return []; } }
function rpeBersaglio(nome, sett) { const r = rirBersaglio(nome, sett); return 10 - (r[0] + r[1]) / 2; }
/* l RPE bersaglio della SEDUTA che si legge (CAR-16 e AUT-01, programmi v2): 10 meno la media delle ripetizioni in riserva previste ALLORA (obiettivo.rir, salvato da endWorkout).
   Confrontare l RPE di una seduta con il bersaglio di OGGI faceva leggere «facile» chi aveva rispettato il RIR [4,5] della settimana 1 contro il [1,2] della settimana 2
   («Serie facili (RPE 5,5, bersaglio 8,5)»: +14-20%, Rematore 20 -> 24 kg; ricontrollo di INT-3b). Senza obiettivo.rir (sedute di prima) e per i programmi v1 vale il bersaglio di oggi, come prima. */
function rpeBersaglioDiQuellaSeduta(ex, nome) {
  const r = ex && ex.obiettivo && ex.obiettivo.rir;
  if (progressioneV2() && Array.isArray(r) && r.length === 2 && isFinite(r[0]) && isFinite(r[1])) return 10 - (Number(r[0]) + Number(r[1])) / 2;
  return rpeBersaglio(nome);
}
/* il RIR di oggi in una frase; dopo uno scarico (MES-06) dice che e una ripetizione in piu: lo stesso rirBersaglio (ripresaDopoScarico) lo alza di uno */
function testoRir(nome) {
  const r = rirBersaglio(nome);
  if (r[1] === 1 && r[0] === 0) return 'fino a 0–1 ripetizioni in riserva';
  /* un intervallo con gli estremi uguali (lo scarico lascia 3, il cedimento 0) e un numero solo: «lascia 3 ripetizioni», non «3–3» (revisione di 3a, m4) */
  const quante = r[0] === r[1] ? r[0] + (r[0] === 1 ? ' ripetizione' : ' ripetizioni') : r[0] + '–' + r[1] + ' ripetizioni';
  return 'lascia ' + quante + ' in riserva' + (ripresaDopoScarico(nome) ? ', una in più dopo lo scarico' : '');
}
/* il massimale stimato (e1rmSerie, e1rmSeduta) sta in carichi/e1rm.js (W1-T3) */
/* B11 / MES-10: una seduta fatta in una settimana di scarico (o un esercizio scaricato dal coach) non e un dato di forma e non conta nelle
   analisi (esigenza, esercizi fermi, verdetto del ciclo, carico mirato). La fase e scritta nella seduta dall onda 0 (settimana.fase e
   obiettivo.coachTipo, MES-09); per le sedute piu vecchie si ricostruisce dalle fasi del programma attuale e dalla data: se il programma
   di allora non c e piu, la seduta conta come di carico. */
const PARAM_ANALISI = {
  rumoreE1rm: 0.03,           /* MES-10/MES-12: sotto il 3% una differenza di massimale non si distingue dall errore di stima del RIR (circa 1 ripetizione, Epley) */
  giorniDopoScarico: 14,      /* MES-10: nessun nuovo scarico del coach entro due settimane dall ultimo */
  prontezzaRipresa: 60,       /* MES-06: ripresa dopo lo scarico al 95% se la prontezza media degli ultimi giorni e sotto questa soglia */
  ripresaPrudente: 0.95,      /* MES-06: ... e per prudenti, over 65 e sonno scarso (il riferimento vale 28 giorni: GIORNI_CARICO_RIFERIMENTO, progressivo.js) */
  saltoMaxRipresa: 1.25       /* MES-06: la ripresa non sale di piu del 25% rispetto all ultima seduta (uno scarico normale vale al massimo +11%: serve solo
                                 per i dati vecchi con lo scarico gia composto, 24,5 -> 22 -> 20 -> 18 kg, e si risale per gradi) */
};
/* p0 = il programma gia letto (chi scorre tutto lo storico lo legge una volta sola) */
function faseDelGiorno(d, p0) {
  const p = p0 || getProgramma();
  if (!regolaAttiva('MES-10') || !p || !p.inizio || !p.fasi || !d) return null;
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7);
  return w >= 0 && w < p.fasi.length ? p.fasi[w] : null;
}
function settimanaDellaSeduta(h) {
  if (h && h.settimana && h.settimana.numero >= 1) return Number(h.settimana.numero);
  const p = getProgramma(), d = h ? dataSessione(h) : null;
  if (!p || !p.inizio || !d) return 0;
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7) + 1;
  return w >= 1 && w <= (p.settimane || 0) ? w : 0;
}
/* MES-10: la seduta conta come di scarico nelle analisi. La definizione e una sola, esercizioInScarico (progressivo.js); qui c e solo l interruttore */
function inScarico(h, ex, p0) {
  return !!h && regolaAttiva('MES-10') && esercizioInScarico(h, ex, p0);
}
/* le ultime n sedute con l esercizio, dalla piu recente. `scarico`: conta come scarico nelle analisi (MES-10, spegnibile); `eraDiScarico`:
   era davvero di scarico (la usa MES-06, che non dipende dall interruttore di MES-10) */
function sessioniConData(nome, n, senzaScarico) {
  const out = [], prog = getProgramma(), mes10 = regolaAttiva('MES-10');
  loadHistory().forEach(h => {
    if (out.length >= n || !h.sessione || h.interrotta) return;
    const ex = h.sessione.find(e => e.name === nome);
    if (!ex) return;
    const eraDiScarico = esercizioInScarico(h, ex, prog), scarico = eraDiScarico && mes10;
    if (senzaScarico && scarico) return;
    out.push({ ex: ex, data: dataSessione(h), scarico: scarico, eraDiScarico: eraDiScarico });
  });
  return out;
}
/* MES-06: la seduta di questo esercizio prima di oggi era di scarico (e c e un carico di riferimento, caricoRiferimento in progressivo.js):
   oggi si riparte da quel carico, con un RIR in piu (usata da rirExtraIntensita e da testoRir). Con la settimana di scarico in corso no. */
function ripresaDopoScarico(nome) {
  if (!coachAttivo() || !regolaAttiva('MES-06') || isTimeBased(nome)) return false;
  const s = sessioniConData(nome, 1)[0];
  return !!(s && s.eraDiScarico && !((settimanaProgramma() || {}).fase === 'scarico') && caricoRiferimento(nome) > 0);
}
/* CAR-04: g = giorni dall ultima volta con l esercizio. B20 (W4-T2, P4-S): nei programmi v2, con il consenso, oltre i 65 anni i giorni di una pausa VERA (piu di 6 giorni
   senza nessuna seduta) contano doppi (giorniPausaContati, sicurezza/popolazioni.js); con il ritmo normale restano quelli veri, come per tutti (era il motivo della deroga
   del 2026-10-05: 5 giorni davano gia -10%). `contati` (facoltativo) = i giorni gia contati (ALG-14 rifa il conto di una pausa passata). Programmi v1: giorni veri */
function rientroDopoPausa(g, contati) {
  const c = contati !== undefined ? contati : (typeof giorniPausaContati === 'function' ? giorniPausaContati(g) : g);
  if (c < 10) return null;
  if (c <= 20) return { f: 0.9, t: '-10%' };
  if (c <= 28) return { f: 0.8, t: '-20%' };
  if (c <= 90) return { f: 0.7, t: '-30%' };
  return { f: 0.5, t: '-50%' };
}
const fmtKg = (x) => String(Math.round(x * 10) / 10);
/* l obiettivo e la forza? (il programma attuale, altrimenti il profilo) */
function obiettivoForza() {
  const pr = getProgramma(), p = getProfile() || {};
  return ((pr && pr.goals && pr.goals[0]) || (p.goals && p.goals[0]) || p.goal) === 'forza';
}

/* ============================================================
   BILANCIA ESSENZIALE (coach v2, P3-A: una parte di W3-T1; docs/piano-coach-v2.md W3-T1, registro B3, D-P5; numeri in carichi/soglie-progressione.js)
   - ALG-06 per TUTTI i programmi (correzione di calcolo della seduta, D-P5 a): ogni carico di caricoProssimoBase sta sulla griglia dell attrezzo (carichi/attrezzi.js):
     caricoInGriglia (il piu vicino), caricoSalito (un aumento: almeno un passo vero), caricoSceso (una riduzione: almeno un passo, se c e). Con ALG-06 spenta, o senza
     attrezzi.js (prove che caricano pochi script), l arrotondamento di prima a 0,5 kg. Un aumento che la griglia rende piu grande del previsto (il mezzo incremento dei
     prudenti: +1,25 kg non si caricano sul bilanciere) passa prima dalle ripetizioni, come i micro-incrementi. Il tetto dei manubri dichiarato (CAS-01b) e la griglia
     dei carichi delle fasi dopo sono la fase 95 (attrezzi.js).
   - Solo per i programmi v2 (prog.versione >= 2): quelli salvati prima continuano con le regole di prima (REG-04, D-P5), tranne la griglia.
     ALG-02 il carico di lavoro e il piu frequente tra le serie fatte (a parita il piu alto; con il back-off la serie piu pesante), non il massimo; la seduta e «ok» solo
       se nessuna serie e sotto quel carico (U10: chi abbassava il peso a meta seduta vedeva salire il carico).
     AUT-01 un punto di RPE vale caricoPer sul massimale (2,4-2,9% di carico, registro B3), al massimo puntiRpeMax punti per volta, mai meno del passo normale, solo
       con 0-4 ripetizioni in riserva e fino a 12 ripetizioni; chi comincia e i minorenni lo usano solo per frenare (la calibrazione dei principianti e CAR-18), i
       prudenti a meta; nelle prime sedute degli altri resta CAR-16.
     ALG-05 fase 'carico' 20 (ricalcoloDalMassimale): le ripetizioni efficaci (bersaglio + ripetizioni in riserva) cambiano di 2 o piu rispetto alla seduta prima ->
       carico = caricoPer sul massimale recente stimato, per difetto, con i tetti +10% / -30%.
   ============================================================ */
/* il programma salvato e v2 (REG-04) e i file della bilancia ci sono */
function progressioneV2() {
  const p = getProgramma();
  return !!(p && Number(p.versione) >= 2) && typeof sogliaProgressione === 'function';
}
/* ALG-06: la griglia dell attrezzo vale (carichi/attrezzi.js caricato e regola accesa) */
function grigliaAttiva() { return typeof arrotondaAttrezzo === 'function' && regolaAttiva('ALG-06'); }
/* ALG-06: il peso della griglia per kg (ctx: modo), o null se la griglia non lo rappresenta: sotto il minimo dell attrezzo (un bilanciere da 13 kg dei dati
   vecchi: la barra pesa 20) il primo peso della griglia e piu di un passo sopra, e un carico non si alza di nascosto fino alla barra (la fase 95 lo dice) */
function pesoGriglia(kg, nome, ctx) {
  const w = arrotondaAttrezzo(kg, nome, ctx);
  return w > kg + passoAttrezzo(nome, { kg: kg }) + 1e-9 ? null : w;
}
/* ALG-06: il carico piu vicino sulla griglia dell attrezzo (prima: 0,5 kg per tutti) */
function caricoInGriglia(kg, nome) {
  const w = grigliaAttiva() ? pesoGriglia(kg, nome) : null;
  return w === null ? arrotonda(kg) : w;
}
/* ALG-06: un aumento di `inc` da `da`: il peso della griglia piu vicino, almeno il primo sopra `da`; a meta tra due pesi quello sotto (manubri 12 + 5 = 17: 16, non 18, +33% e non
   +50%: revisione di 3a, m2) */
function caricoSalito(da, inc, nome) {
  if (!grigliaAttiva()) return arrotonda(da + inc);
  let w = pesoGriglia(da + inc, nome);
  if (w === null) return arrotonda(da + inc);
  if (w > da + inc + 1e-9) {
    const giu = pesoGriglia(da + inc, nome, { modo: 'giu' });
    if (giu !== null && giu > da + 1e-9 && Math.abs((w - (da + inc)) - ((da + inc) - giu)) < 1e-9) w = giu;
  }
  if (w > da + 1e-9) return w;
  const s = pesoGriglia(da + 1e-6, nome, { modo: 'su' });
  return s === null ? arrotonda(da + inc) : s;
}
/* ALG-06 e CAR-18 (INT-4): un aumento della progressione di base non supera +25% in una volta, come la calibrazione e la ripresa dopo lo scarico. La griglia puo rendere il passo molto piu
   grande di quanto voluto (un cavo da 6,5 kg + 2,5 = 9, che la griglia porta a 10: +54%; fuori dal piano non c e il +10% di ALG-05). Si sale al peso della griglia piu alto che sta nel tetto; se
   tra il carico e il tetto non c e nessun peso (manubri da 3 kg: +1 kg e +33%) resta il passo piu piccolo che c e: il peso sale sempre, mai di piu del necessario. `w` = l aumento deciso */
function limitaSalitaBase(w, pesoUltimo, nome) {
  if (!(pesoUltimo > 0) || !(w > pesoUltimo) || typeof sogliaPartenza !== 'function') return w;
  const tetto = pesoUltimo * (1 + sogliaPartenza('calibrazioneTettoSalto'));
  if (w <= tetto + 1e-9) return w;
  const giu = grigliaAttiva() ? arrotondaAttrezzo(tetto, nome, { modo: 'giu' }) : Math.floor(tetto / 0.5 + 1e-9) * 0.5;
  if (giu > pesoUltimo + 1e-9) return giu;
  const primo = grigliaAttiva() ? arrotondaAttrezzo(pesoUltimo + 1e-6, nome, { modo: 'su' }) : pesoUltimo + 0.5;
  return Math.min(w, primo);
}
/* ALG-06: una riduzione di `da` del fattore `f`: il peso della griglia piu vicino, almeno il primo sotto `da` se c e (mai sotto la barra o 1 kg), mai sopra `da` */
function caricoSceso(da, f, nome) {
  if (!grigliaAttiva()) return arrotonda(da * f);
  const w = pesoGriglia(da * f, nome);
  if (w === null || w > da + 1e-9) return arrotonda(da * f);
  if (w < da - 1e-9) return w;
  const g = arrotondaAttrezzo(da - 1e-6, nome, { modo: 'giu' });
  return g < da - 1e-9 ? g : w;
}
/* ALG-06: nello scarico la dose non sempre si carica (12 kg di manubri x 0,9): se il peso vero si allontana piu di scostamentoNota, il motivo lo dice */
function notaPesoVicino(w, voluto) {
  if (!grigliaAttiva() || !(voluto > 0) || Math.abs(w - voluto) / voluto <= sogliaProgressione('scostamentoNota') + 1e-9) return '';
  return ' • ' + fraseGrigliaPiuVicino(w);
}
/* ALG-02: il carico di lavoro di una seduta (un esercizio dello storico): il piu frequente tra le serie fatte con un carico (a parita il piu alto); con il
   back-off (obiettivo.tecnica, CAR-13) la serie piu pesante, come prima. 0 senza serie fatte con un carico */
function caricoDiLavoro(ex) {
  const pesi = ((ex && ex.sets) || []).filter(s => s.done && Number(s.weight) > 0).map(s => Number(s.weight));
  if (!pesi.length) return 0;
  const max = Math.max.apply(null, pesi);
  if (ex.obiettivo && ex.obiettivo.tecnica === 'backoff') return max;
  const conta = new Map();
  pesi.forEach(w => conta.set(w, (conta.get(w) || 0) + 1));
  let W = 0, n = 0;
  conta.forEach((c, w) => { if (c > n || (c === n && w > W)) { W = w; n = c; } });
  return W;
}
/* ALG-02: l esito al carico di lavoro W: «ok» solo se, oltre a esito() (tutte le serie fatte alle ripetizioni previste), nessuna serie e sotto W (salvo il back-off) */
function esitoDiLavoro(ex, repsTarget, W) {
  const e = esito(ex, repsTarget);
  if (e !== 'ok' || (ex.obiettivo && ex.obiettivo.tecnica === 'backoff')) return e;
  return ex.sets.some(s => s.done && Number(s.weight) > 0 && Number(s.weight) < W - 1e-9) ? 'mancato' : 'ok';
}
const FRASE_PESO_CAMBIATO = 'Hai cambiato peso a metà seduta: parto dal peso con cui hai fatto più serie';
/* MES-05 / N10: a cosa serve lo scarico, senza promettere di «ripartire piu forte» (ricerca-mesocicli-periodizzazione-scarichi §5 riga 20, §2 B: Moderata) */
const FRASE_SCOPO_SCARICO = 'serve a smaltire la fatica accumulata: non fa crescere di più, ma fermarsi del tutto può costare forza';
/* AUT-01: il carico (non arrotondato) che un RPE piu basso del bersaglio permette, registro B3: massimale stimato con le ripetizioni in riserva osservate (dentro
   rirAffidabile, al massimo puntiRpeMax punti sopra quelle del bersaglio), poi caricoPer con quelle del bersaglio. Vale circa 1/(30 + ripetizioni + RIR) per punto:
   2,4-2,9% tra 3 e 10 ripetizioni. Epley senza il taglio a 12 ripetizioni efficaci di e1rm (lo stesso di caricoPer): vale fino a 12 ripetizioni e 4 in riserva */
function salitaDaRpe(W, reps, rirOss, rirB) {
  const lim = sogliaProgressione('rirAffidabile');
  const oss = Math.max(lim[0], Math.min(lim[1], Number(rirOss) || 0));
  const usati = Math.max(0, Math.min(sogliaProgressione('puntiRpeMax'), oss - rirB));
  return caricoPer(W * (1 + (reps + rirB + usati) / 30), reps, rirB);
}

function caricoProssimoBase(nome, base, repsTarget, setsBase, soloBase) {
  const sett = settimanaProgramma();
  const scarico = sett && sett.fase === 'scarico';
  const pc = profiloCoach();
  const over65 = pc.eta >= 65;   /* ETA-18: gli aumenti si dimezzano anche dopo i 65 anni, come dice il capitolo 14 della mappa */
  const prudente = pc.sonnoMale || pc.prudente || over65;
  /* ALG-05, stesso esercizio con ripetizioni diverse nella settimana (soloBase = il bersaglio di oggi, vedi sedutaStessaBase): ogni bersaglio ha la sua storia, la progressione guarda
     le sedute con lo stesso bersaglio e non quella di un altro giorno (a 10 ripetizioni con 8 kg non dice niente sul giorno da 6 con 10 kg). I giorni di pausa restano quelli dell
     ultima seduta vera. Revisione di 3a, M1. */
  const tutte = sessioniConData(nome, 40);   /* una sola lettura dello storico per le ultime sedute e le ultime di carico */
  const lista = soloBase > 0 ? tutte.filter(x => Number((x.ex.obiettivo || {}).base) === Number(soloBase)) : tutte;
  const sess = soloBase > 0 ? lista.slice(0, 2).map(x => x.ex) : ultimeSessioni(nome, 2);
  const dose = scarico ? DOSE_SCARICO[sett.doseFissa || livelloFatica()] : null;   /* PRN-03 (INT-2d): lo scarico del controllo dell 8ª ha la dose «bassa» del registro, non quella della fatica di oggi */
  const sets = scarico ? Math.max(2, Math.round((setsBase || 3) * dose.serie)) : (setsBase || 3);

  if (isTimeBased(nome)) {
    if (sess.length && esito(sess[0], repsTarget) === 'ok') return { weight: base, reps: Number(repsTarget) + 5, sets: sets, tipo: 'su', motivo: 'Tenuta completata: +5 secondi' };
    return { weight: base, reps: repsTarget, sets: sets, tipo: sess.length ? 'fermo' : 'nuovo', motivo: sess.length ? 'Stessa durata, punta a completarla' : 'Parti dalla durata del programma' };
  }

  if (!sess.length) {
    return { weight: scarico ? caricoInGriglia(base * COACH_PARAMETRI.scaricoReattivoCarico, nome) : base, reps: repsTarget, sets: sets, tipo: scarico ? 'scarico' : 'nuovo',
             motivo: scarico ? 'Settimana di scarico: carico e serie ridotti' : 'Prima volta: parti dal carico del programma' };
  }

  /* ALG-02 (programmi v2): il carico di lavoro e il piu frequente tra le serie fatte, non il massimo (U10); i programmi v1 come prima (REG-04) */
  const v2 = progressioneV2(), alg02 = v2 && regolaAttiva('ALG-02');
  const fatteUltima = sess[0].sets.filter(x => x.done);
  const pesoUltimo = fatteUltima.length ? (alg02 ? caricoDiLavoro(sess[0]) : Math.max.apply(null, fatteUltima.map(x => Number(x.weight) || 0))) : base;
  /* prime sedute con questo esercizio: il carico di partenza e una stima, quindi si corregge piu in fretta */
  const calibrazione = ultimeSessioni(nome, 3).length < 3;
  const sd = lista.slice(0, 3);              /* allineata a sess: stesse sedute, stesso ordine */
  const esitoDi = ex => alg02 ? esitoDiLavoro(ex, repsTarget, caricoDiLavoro(ex)) : esito(ex, repsTarget);
  const e1 = esitoDi(sess[0]);
  const e2 = sess[1] && !(sd[1] && sd[1].scarico) ? esitoDi(sess[1]) : null;   /* una seduta di scarico non conta come mancata */
  const freno = frenoBia();

  /* MES-06 (W0-T3 + W0-T4, l unica implementazione): lo scarico si calcola sul carico di riferimento (caricoRiferimento: l ultima seduta
     NON di scarico, entro 28 giorni), non sull ultima seduta: cosi la dose e la stessa in tutte le sedute della settimana (60 -> 54 -> 54,
     prima 60 -> 54 -> 48,5 -> 43,5 kg). Senza riferimento (esercizio mai fatto fuori da uno scarico) l ultima seduta di scarico resta com e:
     la dose non si applica due volte. */
  const mes06 = regolaAttiva('MES-06');
  const ultimaDiScarico = !!(sd[0] && sd[0].eraDiScarico);
  const rif = mes06 && (scarico || ultimaDiScarico) ? caricoRiferimento(nome, soloBase) : 0;   /* serve solo in scarico e subito dopo; soloBase: il riferimento e quello di questo bersaglio */
  if (scarico) {
    const gia = mes06 && rif <= 0 && ultimaDiScarico;
    const voluto = (rif > 0 ? rif : pesoUltimo) * dose.carico, w = gia ? pesoUltimo : caricoInGriglia(voluto, nome);
    /* MES-05 (N10 della nota mesocicli): niente \u00abripartire piu forte\u00bb (gli studi visti non mostrano piu crescita ne piu forza dopo lo scarico; uno stop completo costa forza alle gambe) */
    return { weight: w, reps: repsTarget, sets: sets, tipo: 'scarico',
      motivo: 'Settimana di scarico: ' + dose.t + ' \u2022 ' + FRASE_SCOPO_SCARICO + (rif > 0 ? ' \u2022 sul carico di riferimento (' + fmtKg(rif) + ' kg), lo stesso in tutte le sedute della settimana' : '') + (gia ? '' : notaPesoVicino(w, voluto)) };
  }

  /* MES-06: la seduta di prima era di scarico e c e un riferimento. Scarico riuscito (tutte le serie fatte alle ripetizioni previste): si
     riparte da li, non dal carico di scarico piu un incremento, 5% sotto in prudenza, con sonno scarso o con la prontezza media bassa;
     al massimo +25% sull ultima seduta (dati vecchi con lo scarico gia composto: si risale per gradi). Scarico mancato: il carico resta
     com e e il motore decide. Il RIR in piu lo da rirBersaglio (ripresaDopoScarico), il testo lo scrive testoRir. */
  const scaricoRiuscito = rif > 0 && ultimaDiScarico && e1 === 'ok';
  const tettoRipresa = pesoUltimo > 0 ? caricoInGriglia(pesoUltimo * PARAM_ANALISI.saltoMaxRipresa, nome) : Infinity;

  /* rientro dopo una pausa su questo esercizio (dopo uno scarico riuscito il calo si applica al riferimento, non al carico di scarico) */
  const giorni = tutte[0] && tutte[0].data ? giorniTra(tutte[0].data, new Date()) : 0;
  const rientro = rientroDopoPausa(giorni);
  const pesoRientro = scaricoRiuscito ? rif : pesoUltimo;
  if (rientro && pesoRientro > 0) {
    const w = caricoSceso(pesoRientro, rientro.f, nome);
    return { weight: scaricoRiuscito ? Math.min(w, tettoRipresa) : w, reps: repsTarget, sets: sets, tipo: 'giu',
             motivo: 'Rientro dopo ' + giorni + ' giorni: carico ' + rientro.t + ' e 3 ripetizioni in riserva, si risale in fretta' };
  }
  if (scaricoRiuscito) {
    const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
    const stanco = prudente || (pr.length > 0 && pr.reduce((t, x) => t + x, 0) / pr.length < PARAM_ANALISI.prontezzaRipresa);
    const f = stanco ? PARAM_ANALISI.ripresaPrudente : 1, pieno = caricoInGriglia(rif * f, nome), da = Math.min(pieno, tettoRipresa);
    if (da > pesoUltimo) {   /* se in scarico si e gia lavorato a quel carico o oltre, la ripresa non c e: vale la progressione normale */
      const perGradi = da < pieno;
      return { weight: da, reps: repsTarget, sets: sets, tipo: perGradi ? 'su' : 'fermo',
               motivo: perGradi ? 'Dopo lo scarico si risale per gradi verso il carico di prima: oggi +' + Math.round((da / pesoUltimo - 1) * 100) + '%'
                 : f < 1 ? 'Dopo lo scarico riparti poco sotto il carico che avevi prima (-' + Math.round((1 - f) * 100) + '%), per prudenza'
                         : 'Dopo lo scarico riparti dal carico che avevi prima' };
    }
  }

  /* esercizi a corpo libero: si progredisce con le ripetizioni */
  if (pesoUltimo === 0) {
    if (e1 === 'ok') return { weight: 0, reps: Number(repsTarget) + 1, sets: sets, tipo: 'su', motivo: 'Tutte le serie complete: +1 ripetizione' };
    return { weight: 0, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Stesse ripetizioni, punta a completarle tutte' };
  }

  if (e1 === 'ok') {
    if (freno) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: freno };
    const inc = prudente ? Math.max(0.5, incrementoPer(nome) / 2) : incrementoPer(nome);
    /* ALG-06: il testo dice il salto vero della griglia (con la griglia spenta l incremento, come prima) */
    const griglia = grigliaAttiva(), kgPiu = w => griglia ? fmtKg(w - pesoUltimo) : String(inc);
    const nota = (pc.prudente ? ' (modalita prudente)' : (pc.sonnoMale ? ' (aumento prudente: recupero scarso)' : '')) + (over65 && !pc.prudente && !pc.sonnoMale ? ' \u2022 aumento dimezzato: dopo i 65 anni si sale più piano' : '');
    /* autoregolazione dall RPE segnato sulle serie */
    const bias = Number((aggiustiCoach() || {}).rirBias) || 0;
    const rpes = fatteUltima.map(x => Number(x.rpe)).filter(x => x > 0).map(x => Math.max(1, x - bias));
    if (rpes.length) {
      const media = Math.round(rpes.reduce((t, x) => t + x, 0) / rpes.length * 10) / 10;
      const bers = rpeBersaglioDiQuellaSeduta(sess[0], nome);
      const delta = media - bers;
      if (delta >= 1) return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo',
        motivo: 'Serie complete ma RPE ' + String(media).replace('.', ',') + ', sopra il bersaglio ' + String(bers).replace('.', ',') + ': stesso carico, consolida' };
      /* AUT-01 (programmi v2, registro B3): il punto di RPE vale caricoPer sul massimale (salitaDaRpe), al massimo 2 punti; chi comincia e i minorenni solo frenano
         (la calibrazione dei principianti e CAR-18), i prudenti a meta. Nelle prime sedute degli altri resta CAR-16 (+5% per punto); i programmi v1 come prima (+4%) */
      const aut01 = v2 && regolaAttiva('AUT-01');
      const regolaDiPrima = !aut01 || (calibrazione && pc.livello !== 'principiante' && !pc.minorenne);
      if (delta <= -1 && regolaDiPrima) {
        const pct = (calibrazione ? Math.min(0.15, -delta * 0.05) : Math.min(0.1, -delta * 0.04)) * (prudente ? 0.5 : 1);   /* aumenti dimezzati: anche quello a percentuale */
        const w = limitaSalitaBase(Math.max(caricoSalito(pesoUltimo, inc, nome), caricoInGriglia(pesoUltimo * (1 + pct), nome)), pesoUltimo, nome);
        return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
          motivo: 'Serie facili (RPE ' + String(media).replace('.', ',') + ', bersaglio ' + String(bers).replace('.', ',') + '): +' + fmtKg(w - pesoUltimo) + ' kg' + nota + (calibrazione ? ' \u2022 prime sedute: mi avvicino piu in fretta' : '') };
      }
      if (delta <= -1 && pc.livello !== 'principiante' && !pc.minorenne && (Number(repsTarget) || 0) <= sogliaProgressione('ripetizioniMaxRpe')) {
        let t = salitaDaRpe(pesoUltimo, Number(repsTarget) || 0, 10 - media, 10 - bers);
        if (prudente) t = pesoUltimo + (t - pesoUltimo) / 2;
        const w = limitaSalitaBase(Math.max(caricoSalito(pesoUltimo, inc, nome), caricoInGriglia(t, nome)), pesoUltimo, nome);
        return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
          motivo: 'Serie facili (RPE ' + String(media).replace('.', ',') + ', bersaglio ' + String(bers).replace('.', ',') + '): +' + fmtKg(w - pesoUltimo) + ' kg' + nota };
      }
    }
    /* serie finale AMRAP: aumento proporzionale alle ripetizioni in piu (nSuns) */
    const ultima = fatteUltima[fatteUltima.length - 1];
    const extra = ultima ? (Number(ultima.reps) || 0) - (Number(repsTarget) || 0) : 0;
    if (tipoCarico(nome) === 'pesante' && extra >= 2 && fatteUltima.length === sess[0].sets.length) {
      const gambe = /gambe|glutei/.test((findExercise(nome) || {}).group || '');
      const salto = extra >= 6 ? (gambe ? 7.5 : 5) : (extra >= 4 ? (gambe ? 5 : 2.5) : 2.5);
      const tot = prudente ? Math.max(inc, salto / 2) : Math.max(inc, salto);
      const w = limitaSalitaBase(caricoSalito(pesoUltimo, tot, nome), pesoUltimo, nome);
      return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Ultima serie con ' + extra + ' ripetizioni in piu: +' + fmtKg(griglia ? w - pesoUltimo : tot) + ' kg' + nota };
    }
    /* isolamenti: doppia progressione, prima le ripetizioni fino alla cima del range */
    if (tipoCarico(nome) === 'isolamento') {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const cima = (Number(repsTarget) || 0) + 3;
      if (repsFatte < cima) return { weight: pesoUltimo, reps: Math.max(Number(repsTarget) || 0, repsFatte) + 1, sets: sets, tipo: 'su',
        motivo: 'Doppia progressione: una ripetizione in piu (' + (Math.max(Number(repsTarget) || 0, repsFatte) + 1) + ' su ' + cima + '), poi il peso' };
      const w = limitaSalitaBase(caricoSalito(pesoUltimo, inc, nome), pesoUltimo, nome);
      return { weight: w, reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Cima del range raggiunta (' + repsFatte + '): +' + kgPiu(w) + ' kg e si riparte da ' + repsTarget + nota };
    }
    /* micro-incrementi: un salto oltre il 5% si fa prima con le ripetizioni. ALG-06: il salto e quello vero della griglia (caricoSalito); se la griglia lo rende piu
       grande dell incremento voluto (il mezzo incremento dei prudenti: +1,25 kg non si caricano sul bilanciere) si passa anche qui prima dalle ripetizioni */
    const salitoA = limitaSalitaBase(caricoSalito(pesoUltimo, inc, nome), pesoUltimo, nome), quanto = griglia ? salitoA - pesoUltimo : inc;
    if (quanto / pesoUltimo > 0.05 || (griglia && quanto > inc + 1e-9)) {
      const repsFatte = Math.min.apply(null, fatteUltima.map(x => Number(x.reps) || 0));
      const tetto = (Number(repsTarget) || 0) + 2;
      if (repsFatte < tetto) {
        return { weight: pesoUltimo, reps: repsFatte + 1, sets: sets, tipo: 'su',
          motivo: quanto / pesoUltimo > 0.05 ? '+' + kgPiu(salitoA) + ' kg sarebbe un salto del ' + Math.round(quanto / pesoUltimo * 100) + '%: prima una ripetizione in piu (' + (repsFatte + 1) + ')'
            : 'Aumento dimezzato: il passo più piccolo dell’attrezzo (+' + kgPiu(salitoA) + ' kg) è troppo, prima una ripetizione in più (' + (repsFatte + 1) + ')' };
      }
      return { weight: salitoA, reps: repsTarget, sets: sets, tipo: 'su',
        motivo: 'Arrivato a ' + repsFatte + ' ripetizioni: ora +' + kgPiu(salitoA) + ' kg e si riparte da ' + repsTarget + nota };
    }
    return { weight: salitoA, reps: repsTarget, sets: sets, tipo: 'su',
             motivo: 'Tutte le serie complete la volta scorsa: +' + kgPiu(salitoA) + ' kg' + nota };
  }
  /* prime sedute: se le serie sono molto sotto il previsto il carico di partenza era troppo alto: -5% subito, senza aspettare il secondo errore */
  if (calibrazione && e1 === 'mancato' && e2 !== 'mancato' && pesoUltimo > 0) {
    const totSerie = sess[0].sets.length || 1;
    const repsMedie = fatteUltima.length ? fatteUltima.reduce((t, x) => t + (Number(x.reps) || 0), 0) / fatteUltima.length : 0;
    if (fatteUltima.length < Math.ceil(totSerie * 0.6) || repsMedie <= (Number(repsTarget) || 0) - 3)
      return { weight: caricoSceso(pesoUltimo, 0.95, nome), reps: repsTarget, sets: sets, tipo: 'giu',
        motivo: 'Prime sedute: serie molto sotto il previsto, il carico di partenza era troppo alto: -5% e poi si risale' };
  }
  if (e1 === 'mancato' && e2 === 'mancato') {
    const ag0 = aggiustiCoach();
    const stalli = ((ag0.stalli || {})[nome] || 0);
    /* PCO-01 (riga del principiante, ex PRI-12): lo schema 5x3 e per chi punta alla forza; con gli altri obiettivi si resta sul peso (+30 s) e poi -5% */
    if (pc.livello === 'principiante' && tipoCarico(nome) === 'pesante' && stalli >= 1 && obiettivoForza())
      return { weight: pesoUltimo, reps: 3, sets: 5, tipo: 'fermo', stallo: true,
        motivo: 'Secondo stallo: stesso peso ma schema 5\u00D73 (poi 6\u00D72 e 10\u00D71), come nel GZCLP' };
    if (pc.livello === 'principiante') return { weight: caricoSceso(pesoUltimo, 0.95, nome), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -5% e si ricostruisce' };
    return { weight: caricoSceso(pesoUltimo, COACH_PARAMETRI.dopoDueMancateCarico, nome), reps: repsTarget, sets: sets, tipo: 'giu', stallo: true, motivo: 'Due volte di fila non completato: -10% e si ricostruisce' };
  }
  /* scarico mirato (CAR-08): massimale stimato in calo per due sedute di fila, senza contare le sedute di scarico e solo oltre il 3% (il rumore del RIR: MES-10) */
  const sc = lista.filter(x => !x.scarico).slice(0, 3);
  if (sc.length >= 3) {
    const m = sc.map(x => e1rmSeduta(x.ex)), r = regolaAttiva('MES-10') ? 1 - PARAM_ANALISI.rumoreE1rm : 1;
    if (m[0] && m[1] && m[2] && m[0] < m[1] * r && m[1] < m[2] * r) {
      return { weight: caricoSceso(pesoUltimo, COACH_PARAMETRI.scaricoReattivoCarico, nome), reps: repsTarget, sets: Math.max(2, Math.round(sets * COACH_PARAMETRI.scaricoProgressioneSerie)), tipo: 'scarico',
               motivo: 'Massimale stimato in calo da due sedute: scarico solo qui (-10% e meta serie), il resto non cambia' };
    }
  }
  if (pc.livello === 'principiante') return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', piuPausa: 30,
    motivo: 'Non tutte le serie complete: stesso peso con 30 secondi di pausa in piu' };
  return { weight: pesoUltimo, reps: repsTarget, sets: sets, tipo: 'fermo', motivo: 'Non tutte le serie complete: stesso carico, punta a piu ripetizioni' };
};

/* CARICO PROSSIMO: la catena 'carico' (regia/fasi.js, piano B.3). L ordine e scritto nelle fasi, non e quello degli script: 10 BIL qui
   (caricoProssimoBase: progressione, scarico del programma e ripresa), 15 CAR-18 in carichi/calibrazione.js, 20 ALG-05 qui (ricalcolo dal massimale),
   50 AGG in dolore-mattina.js (aggiusti del coach e frase del RIR), 60 RIC in regole-nuove.js, 70 INT in intensita.js, 95 ALG-06 in carichi/attrezzi.js
   (griglia e tetto dei manubri), 99 REG-03 in regia/perche.js. Ogni fase vede il risultato delle precedenti (r.motivo contiene gia i pezzi aggiunti
   prima, r.tipo puo essere gia 'scarico') e restituisce la stessa forma { weight, reps, sets, tipo, motivo, piuPausa?, stallo?, perche? }.

   CONTRATTO c.voce (P3-A; lo usano P3-C, fase 25 sull onda della modalita Forza, e P4-F, fastidi): il contesto di ogni fase e
   { nome, base, repsTarget, setsBase, voce }. `voce` e la voce del piano della settimana per questo esercizio (loadData()[giorno][i], come la scrive
   salvaProgramma da buildProgram e la aggiorna carichiDelGiorno), passata da applicaCaricoProgressivo; null quando chi chiama non ce l ha (renderOggi,
   renderAgent, «Macchinario occupato», prove). SOLA LETTURA: una fase non la modifica (carichiDelGiorno la riscrive dopo con il risultato). Campi che si possono leggere
   (tutti facoltativi tranne name): name, reps (le ripetizioni di oggi, gia cambiate dalla doppia progressione), repsBase (il bersaglio del piano: = c.repsTarget),
   sets, setsBase, weight, rest, restBase, tecnica, stimato (fonte della stima di partenza), partenzaBassa, fisso (alzata della modalita Forza), alzata
   ('squat' | 'panca' | 'stacco'), onda ('pesante' | 'medio' | 'leggero', FRZ-05), originale (l esercizio sostituito). Una fase che ne ha bisogno
   controlla c.voce prima di leggerla (c.voce && c.voce.onda). */
window.caricoProssimo = function(nome, base, repsTarget, setsBase, voce) {
  return eseguiFasi('carico', undefined, { nome: nome, base: base, repsTarget: repsTarget, setsBase: setsBase, voce: voce && typeof voce === 'object' ? voce : null });
};
/* ALG-05, stesso esercizio con ripetizioni diverse nella settimana (B7; revisione di 3a, M1): se l ultima seduta di lavoro aveva un bersaglio diverso da quello di oggi ma ce n e una
   recente (giorniMassimaleRecente) con lo STESSO bersaglio, quella e la seduta di riferimento: ogni bersaglio ha la sua storia e non si converte da un giorno all altro (i tetti
   +10% / -30% sul carico dell altro giorno, una ripetizione in riserva in piu a ogni conversione e il massimale stimato con sedute gia ridotte facevano scendere il carico a
   ogni seduta: Affondi Bulgari 10 -> 4 kg in 11 settimane con tutte le serie complete). Ritorna la seduta di riferimento ({ ex, data, ... }) o null: solo con il consenso, i
   programmi v2 e ALG-05 accesa, come la regola. Anche una seduta di scarico con lo stesso bersaglio e di riferimento (la ripresa dopo lo scarico riparte dal carico di quel giorno:
   caricoRiferimento). Il cambio di bersaglio senza una seduta recente con lo stesso resta a ALG-05. */
function sedutaStessaBase(nome, ora) {
  if (!(Number(ora) > 0) || isTimeBased(nome) || !coachAttivo() || !progressioneV2() || !regolaAttiva('ALG-05')) return null;
  const tutte = sessioniConData(nome, 12), ultima = tutte[0];
  if (!ultima) return null;
  const b = Number((ultima.ex.obiettivo || {}).base);
  if (!(b > 0) || Math.abs(b - Number(ora)) < 1e-9) return null;
  const giorni = sogliaProgressione('giorniMassimaleRecente'), oggi = new Date();
  return tutte.find(x => x.data && giorniTra(x.data, oggi) <= giorni && Math.abs(Number((x.ex.obiettivo || {}).base) - Number(ora)) < 1e-9) || null;
}
/* fase 10: la progressione; ALG-02 (programmi v2) dice nel perche quando l ultima seduta aveva serie a carichi diversi e il carico di lavoro non e il massimo */
function caricoProgressione(r, c) {
  const stessa = sedutaStessaBase(c.nome, c.repsTarget);
  const out = caricoProssimoBase(c.nome, c.base, c.repsTarget, c.setsBase, stessa ? Number(c.repsTarget) : 0);
  if (out && out.weight > 0 && out.tipo !== 'scarico' && out.tipo !== 'nuovo' && !isTimeBased(c.nome) && progressioneV2() && regolaAttiva('ALG-02')) {
    const ex = stessa ? stessa.ex : ultimeSessioni(c.nome, 1)[0];
    const fatte = ex ? (ex.sets || []).filter(s => s.done && Number(s.weight) > 0) : [];
    if (fatte.length && caricoDiLavoro(ex) < Math.max.apply(null, fatte.map(s => Number(s.weight))) - 1e-9) aggiungiPerche(out, 'ALG-02', FRASE_PESO_CAMBIATO, { forza: 'Convenzione' });
  }
  return out;
}
registraFase('carico', 10, 'BIL', caricoProgressione);

/* ALG-05 (fase 'carico' 20, solo programmi v2): il massimale recente stimato di un esercizio: le sedute di lavoro (non di scarico) entro giorniMassimaleRecente,
   al massimo 3, la media delle due migliori (ricerca-algoritmi §3.2). Per ogni serie al carico di lavoro: e1rm con le ripetizioni in riserva dall RPE (con rirBias,
   dentro rirAffidabile, fino a ripetizioniMaxRpe), 0 al cedimento, altrimenti quelle previste allora (obiettivo.rir) o oggi (rirOggi). null se non c e niente;
   conRpe = almeno una serie aveva l RPE */
function massimaleRecente(nome, rirOggi) {
  const bias = Number((aggiustiCoach() || {}).rirBias) || 0, lim = sogliaProgressione('rirAffidabile'), maxRip = sogliaProgressione('ripetizioniMaxRpe');
  const giorni = sogliaProgressione('giorniMassimaleRecente'), oggi = new Date();
  let conRpe = false;
  const valori = sessioniConData(nome, 12).filter(x => !x.eraDiScarico && x.data && giorniTra(x.data, oggi) <= giorni).slice(0, 3).map(x => {
    const W = caricoDiLavoro(x.ex), o = x.ex.obiettivo || {};
    const rirAllora = Array.isArray(o.rir) && o.rir.length === 2 && isFinite(o.rir[0]) && isFinite(o.rir[1]) ? (Number(o.rir[0]) + Number(o.rir[1])) / 2 : rirOggi;
    const e = (x.ex.sets || []).filter(s => s.done && Number(s.weight) > 0 && Number(s.weight) >= W - 1e-9).map(s => {
      const reps = Number(s.reps) || 0, rpe = Number(s.rpe);
      let rir = rirAllora;
      if (s.wasBerserk) rir = 0;
      else if (rpe > 0 && reps <= maxRip) { rir = Math.max(lim[0], Math.min(lim[1], 10 - (rpe - bias))); conRpe = true; }
      return e1rm(Number(s.weight), reps, rir);
    });
    return e.length ? Math.max.apply(null, e) : 0;
  }).filter(v => v > 0).sort((a, b) => b - a);
  if (!valori.length) return null;
  return { e1: valori.length >= 2 ? (valori[0] + valori[1]) / 2 : valori[0], conRpe: conRpe };
}
/* ALG-05: se le ripetizioni efficaci (bersaglio del piano + ripetizioni in riserva di oggi) cambiano di cambioRipetizioniEfficaci o piu rispetto alla seduta prima
   (obiettivo.base + obiettivo.rir, salvati da endWorkout: senza la base salvata non si ricalcola), il carico e caricoPer sul massimale recente, per difetto sulla griglia,
   tra -30% e +10% del carico di lavoro di prima; oltre 12 ripetizioni di bersaglio non si converte (almeno -10%); senza RPE una ripetizione in riserva in piu.
   Gli aumenti: fermi con il freno della BIA, a meta per prudenti, over 65, sonno scarso e minorenni. Non tocca scarico, prima volta, tempi, corpo libero, la ripresa
   dopo uno scarico (MES-06), il rientro dopo una pausa (CAR-04) e la calibrazione (CAR-18). Risolve B7 e B8 (stesso esercizio con bersagli diversi nella settimana,
   cambio di blocco, onda della Forza). Solo con il consenso e i programmi v2 (REG-04). */
const fraseRicalcolo = (da, a, e1) => (da !== a ? 'Passi da ' + da + ' a ' + a + ' ripetizioni' : 'Ripetizioni in riserva cambiate') + ': peso ricalcolato dal massimale stimato (' + fmtKg(e1) + ' kg)';
function ricalcoloDalMassimale(r, c) {
  const nome = c.nome;
  if (!r || r.tipo === 'scarico' || r.tipo === 'nuovo' || !(Number(r.weight) > 0) || isTimeBased(nome)) return r;
  if (!coachAttivo() || !progressioneV2() || !regolaAttiva('ALG-05')) return r;
  if (Array.isArray(r.perche) && r.perche.some(p => p && p.codice === 'CAR-18')) return r;
  const ultima = sessioniConData(nome, 1)[0];
  if (!ultima || ultima.eraDiScarico || (ultima.data && rientroDopoPausa(giorniTra(ultima.data, new Date())))) return r;
  if (sedutaStessaBase(nome, c.repsTarget)) return r;   /* M1: c e una seduta recente con lo stesso bersaglio: la progressione ha gia guardato quella (caricoProgressione) */
  const o = ultima.ex.obiettivo || {}, prima = Number(o.base), ora = Number(c.repsTarget) || 0;
  if (!(prima > 0) || !(ora > 0)) return r;
  const rOggi = rirBersaglio(nome), mOggi = (rOggi[0] + rOggi[1]) / 2;
  const mPrima = Array.isArray(o.rir) && o.rir.length === 2 && isFinite(o.rir[0]) && isFinite(o.rir[1]) ? (Number(o.rir[0]) + Number(o.rir[1])) / 2 : mOggi;
  if (Math.abs((ora + mOggi) - (prima + mPrima)) < sogliaProgressione('cambioRipetizioniEfficaci') - 1e-9) return r;
  const M = massimaleRecente(nome, mOggi), W = caricoDiLavoro(ultima.ex);
  if (!M || !(W > 0)) return r;
  let t = caricoPer(M.e1, ora, mOggi + (M.conRpe ? 0 : sogliaProgressione('rirInPiuSenzaRpe')));
  if (ora > sogliaProgressione('ripetizioniMaxConversione')) {
    /* oltre le 12 ripetizioni non si converte e si toglie almeno il 10%: ma solo se le ripetizioni efficaci SALGONO (piu ripetizioni = meno carico). Se non salgono (cambiano solo le
       ripetizioni in riserva: alla settimana 2 di ogni blocco il RIR passa da [4,5] a [1,2]) il carico non va verso il basso: decide la progressione (revisione di 3a, B1) */
    if (ora + mOggi <= prima + mPrima + 1e-9) return r;
    t = Math.min(t, W * (1 - sogliaProgressione('riduzioneOltreConversione')));
  }
  const tetti = sogliaProgressione('tettiRicalcolo');
  t = Math.max(W * (1 - tetti.giu), Math.min(W * (1 + tetti.su), t));
  /* una seduta completa al suo bersaglio e un giorno piu duro (meno ripetizioni efficaci: il RIR scende o il bersaglio cala): il carico non va sotto quello fatto. Il massimale
     stimato taglia a 12 ripetizioni efficaci e il peso scende per difetto sulla griglia (2,5 kg): da solo il ricalcolo toglieva un passo anche quando doveva alzare
     (revisione di 3a, B1 e M1). Una seduta non completata decide il ricalcolo, come prima. */
  if (ora + mOggi < prima + mPrima && esitoDiLavoro(ultima.ex, prima, W) === 'ok') t = Math.max(t, W);
  if (t > W) {
    const pc = profiloCoach();
    if (frenoBia()) t = W;
    else if (pc.prudente || pc.sonnoMale || pc.eta >= 65 || pc.minorenne) t = W + (t - W) / 2;
  }
  const g = grigliaAttiva() ? pesoGriglia(t, nome, { modo: 'giu' }) : null;
  /* per difetto: mai sopra il calcolo. Sotto il minimo dell attrezzo (la barra vuota, la pila a 2,5 kg) il peso della griglia supera il calcolo: se non supera anche il carico gia
     fatto e il minimo che si carica davvero (revisione di 3a, M3: prima 19 kg di bilanciere e 2 · 1,5 · 1 · 0,5 kg sui cavi); se lo supera resta il calcolo e la fase 95 lo dice */
  const w = g !== null && (g <= t + 1e-9 || g <= W + 1e-9) ? g : Math.floor(t * 2 + 1e-9) / 2;
  /* stesso bersaglio (cambia solo il RIR: alla settimana 2 di ogni blocco) e il ricalcolo da lo stesso peso dell ultima seduta: non c e niente da convertire, e `r.reps = ora` azzererebbe
     la ripetizione guadagnata dalla doppia progressione (12 · 12 · 13 · 14 · 15, scarico, di nuovo 12 · 12...: il peso non saliva mai). Resta la proposta della progressione (ricontrollo di INT-3b, N1) */
  if (prima === ora && Math.abs(w - W) < 1e-9) return r;
  r.weight = w > 0 ? w : W;
  r.reps = ora;
  r.tipo = r.weight > W + 1e-9 ? 'su' : (r.weight < W - 1e-9 ? 'giu' : 'fermo');
  delete r.stallo; delete r.piuPausa;
  r.motivo = fraseRicalcolo(prima, ora, M.e1);
  aggiungiPerche(r, 'ALG-05', r.motivo, { forza: 'Convenzione' });
  return r;
}
registraFase('carico', 20, 'ALG-05', ricalcoloDalMassimale);

/* Applicato quando si apre una seduta: solo se c e il consenso e solo se
   la seduta non e ancora iniziata (non tocca serie gia fatte). La catena 'apertura' (regia/fasi.js): 10 BIL qui (carichiDelGiorno),
   20 RIC-04 in regole-nuove.js (una sola tecnica al cedimento). Restituisce il numero di esercizi cambiati. */
window.applicaCaricoProgressivo = function(day) {
  return eseguiFasi('apertura', 0, { giorno: day });
};
function carichiDelGiorno(day) {
  if (!coachAttivo()) return 0;
  if (!getProgramma() && !loadHistory().some(h => h.sessione)) return 0;
  const data = loadData();
  const list = data[day] || [];
  let cambiati = 0;
  list.forEach(e => {
    if (e.completedSets.some(s => s.done)) return;
    if (e.setsBase === undefined) e.setsBase = e.sets;
    if (e.repsBase === undefined) e.repsBase = e.reps;
    const t = caricoProssimo(e.name, e.weight, e.repsBase, e.setsBase, e);   /* c.voce: la voce del piano (contratto sopra caricoProssimo) */
    e.weight = t.weight;
    e.reps = t.reps;
    e.sets = t.sets;
    e.completedSets = Array.from({ length: t.sets }, () => ({ done: false, reps: t.reps, weight: t.weight, wasBerserk: false }));
    e.coachNote = (e.stimato && t.tipo === 'nuovo' && MOTIVI_STIMA[e.stimato]) ? MOTIVI_STIMA[e.stimato] : t.motivo;
    e.coachTipo = t.tipo;
    if (e.restBase === undefined) e.restBase = e.rest;
    e.rest = e.restBase + (t.piuPausa || 0);
    /* avanzati: dopo la serie piu pesante, serie a -5% (RTS) */
    if (e.tecnica === 'backoff' && t.weight > 0 && t.tipo !== 'scarico') { const b = caricoSceso(t.weight, 0.95, e.name); e.completedSets.forEach((x, i) => { if (i > 0) x.weight = b; }); }   /* ALG-06: sulla griglia */
    e.tecnicaSeduta = '';
    cambiati++;
  });
  /* calibrazione del RIR (CAR-14, ponte dell onda 0): quale esercizio va a cedimento per tarare la stima lo dice carichi/taratura.js */
  segnaEsercizioTaratura(list);
  saveData(data);
  return cambiati;
}
registraFase('apertura', 10, 'BIL', (n, c) => carichiDelGiorno(c.giorno));

/* dopo la seduta: la catena 'dopoSeduta' (regia/fasi.js): 10 STA qui (stalli), 20 CAR-14 in carichi/taratura.js (taratura del RIR),
   30 INT-05 in intensita.js (bilancio delle prime due sedute) */
function imparaDallaSeduta(list) {
  eseguiFasi('dopoSeduta', undefined, { lista: list });
}
function contaStalli(list) {
  const ag = aggiustiCoach();
  ag.stalli = ag.stalli || {};
  list.forEach(e => {
    if (e.coachNote && /Due volte di fila non completato/.test(e.coachNote)) ag.stalli[e.name] = (ag.stalli[e.name] || 0) + 1;
  });
  salvaAggiusti(ag);
}
registraFase('dopoSeduta', 10, 'STA', (v, c) => { contaStalli(c.lista); });
