/* Soglie della struttura del programma: blocchi, rampe, RIR e scarico (MES-01, MES-02, MES-03, PRN-03, OBI-03)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DEL MESOCICLO (coach v2, W2-T4; registro B3-B5, D-P15; ricerca-mesocicli-periodizzazione-scarichi §3.2-3.6, §3.9-3.11, §6;
   ricerca-principianti-12-settimane §3.2; ricerca-ipertrofia-programmazione §3.5-3.6; ricerca-obiettivi-e-programmi OBI-03, OBI-10)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   Quasi tutto è «Convenzione» (registro C.4, riga «Mesociclo e scarichi»): la forma del blocco conta poco per la crescita (Moesgaard 2022,
   Grgic 2017) e le dosi dello scarico sono pratica dei coach (Bell 2022, 2024); la direzione della rampa del RIR ha una base
   Moderata (Robinson 2024), i numeri no. «Decisione» = scelte del prodotto (12 settimane per chi comincia, D-P15).
   Le soglie si leggono solo durante l’esecuzione (sogliaStruttura, in programma/mesociclo.js), mai al caricamento. Senza questo file
   il generatore ricade sulle regole di prima (programmi della v1: niente piano, 8 settimane per chi comincia, blocchi 3+1).
   RIR: ogni valore delle tabelle è il LIMITE BASSO del bersaglio, che è [r, r + 1] (come rirBersaglioBase); le colonne sono le settimane di
   CARICO del blocco (la settimana di scarico ha il suo RIR in rirScarico).
   ============================================================ */
const SOGLIE_STRUTTURA = {
  /* ---- PRN-03 / MES-01: durata e blocchi ---- */
  /* principiante non prudente: 12 settimane, settimane 1-11 di carico, la 12ª è una verifica (scarico leggero); all’8ª un controllo:
     diventa uno scarico «basso» solo se la fatica è media o alta o un segnale di MES-07 è acceso (controlloOttava) */
  strutturaPrincipiante: {
    v: { settimane: 12, blocco: 12, controllo: 8 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 e D-P15; ricerca-principianti-12-settimane §3.2 e PRI-03 (scarico solo alla verifica); Bell 2022, 2024 e due RCT 2024/2026 (nessun vantaggio dello scarico sulla massa: Contrastata)', regole: ['PRN-03', 'PRG-01']
  },
  /* intermedio: 12 settimane, due blocchi da 5 di carico + 1 di scarico */
  strutturaIntermedio: {
    v: { settimane: 12, blocco: 6 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.2 e §6 A MES-01; Bell 2024 (uno scarico circa ogni 5,6 ± 2,3 settimane)', regole: ['MES-01', 'PRG-01']
  },
  /* avanzato: come l’intermedio (5+1 per due blocchi), lo scarico si può anticipare (scaricoAnticipabile) */
  strutturaAvanzato: {
    v: { settimane: 12, blocco: 6 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.2 e §6 A MES-01', regole: ['MES-01', 'PRG-01']
  },
  /* prudenti (over 65, PAR-Q positivo, minorenni): come prima della v2: blocchi 3+1 per chi comincia e per chi è intermedio, 5+1 per l’avanzato */
  strutturaPrudente: {
    v: { principiante: { settimane: 8, blocco: 4 }, intermedio: { settimane: 12, blocco: 4 }, avanzato: { settimane: 12, blocco: 6 } },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 («Prudenti: blocchi 3+1 come oggi»); ricerca-mesocicli-periodizzazione-scarichi §3.2 (modalità prudente: invariato rispetto a oggi)', regole: ['MES-01', 'PRN-03', 'PRG-01']
  },
  /* lo scarico programmato si può anticipare (MES-07, W3-T5) dopo almeno questo numero di settimane di carico: 5+1 diventa 4+1 */
  scaricoAnticipabile: {
    v: { settimaneCaricoMinime: 4 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 e B17 (scarico reattivo unico); ricerca-mesocicli-periodizzazione-scarichi §3.2 («anticipabile a 4+1») e §3.7', regole: ['MES-01']
  },
  /* all’8ª settimana il principiante ha un controllo: scarico solo se la fatica è una di queste o se un segnale di MES-07 è acceso, con la dose bassa */
  controlloOttava: {
    v: { scaricoSeFatica: ['media', 'alta'], dose: 'bassa' },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 (controllo all’8ª settimana dei principianti); ricerca-mesocicli-periodizzazione-scarichi §3.6.2', regole: ['PRN-03']
  },
  /* i segnali che il controllo dell’8ª legge dai dati salvati (oltre alla fatica di livelloFatica, che già conta la prontezza e l’sRPE medio):
     sonno «male» in almeno 4 delle ultime 7 check-in (S5); «Al limite», o «Dura» arrivando stanco, in almeno 2 delle ultime 3 sedute (S7: stessa
     definizione di DEC-06, sedutaPesante); dolore da 4/10 in su nelle ultime 3 sedute (soglia di DEC-02: da lì in avanti il coach non chiede di allenarsi
     attraverso il dolore). Il dolore per il registro non è fatica generale (S4): al controllo conta come prudenza in più, mai come diagnosi */
  controlloOttavaSegnali: {
    v: { checkInSonno: 7, sonnoMaleMin: 4, seduteUltime: 3, seduteAlLimiteMin: 2, doloreMinimo: 4 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.7 (S5 sonno, S7 sRPE, S4 dolore: scarico locale) e DEC-02 (dolore da 4/10)', regole: ['PRN-03']
  },

  /* ---- MES-03: rampa di volume (fattore sul volume di base, settimane di carico del blocco) ---- */
  /* principiante: 2 serie nelle settimane 1-2 (2/3 del volume), 3 sui primi tre esercizi nelle 3-4, 3 su tutti dalla 5ª (volume pieno); poi 1 */
  rampaVolumePrincipiante: {
    v: [0.70, 0.70, 0.85, 0.85, 1],
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.2 e PRI-04; ricerca-obiettivi-e-programmi OBI-10 (volume 70 → 100%); registro C.4 (fattori della rampa)', regole: ['MES-03', 'PRN-03']
  },
  rampaVolumeIntermedio: {
    v: [0.75, 0.85, 0.95, 1, 1],
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 e §6 A MES-03 (circa +1 serie per muscolo a settimana); a volume pari la periodizzazione non cambia la massa (Moesgaard 2022): serve a gestire fatica e dolenzia', regole: ['MES-03']
  },
  rampaVolumeAvanzato: {
    v: [0.70, 0.80, 0.90, 1, 1],
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 e §6 A MES-03', regole: ['MES-03']
  },
  /* salute e dimagrimento: la rampa non parte sotto questo fattore */
  rampaVolumeSalute: {
    v: 0.80,
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.2 («dimagrimento e salute: rampa 0,80 → 1,00»)', regole: ['MES-03']
  },
  /* avanzato: +1 serie ai muscoli prioritari dalla settimana 3 del blocco (tetti del livello e di seduta restano: li guarda il volume) */
  prioritariAvanzato: {
    v: { dallaSettimana: 3, piuSerie: 1 },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 (RIC-01 spostato dove serve); registro coach v2 B18 (l’unico «+1» è settimanale)', regole: ['MES-03']
  },
  /* principiante: serie per esercizio per settimana (multi = i primi tre esercizi, altri = gli altri); la 12ª è la verifica (-30/-35% di serie) */
  seriePrincipiante: {
    v: { multi: [2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], altri: [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2] },
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.2 (tabella settimana per settimana) e PRI-04; piano coach v2 W2-T4', regole: ['MES-03', 'PRN-03']
  },
  /* principiante: ripetizioni per tipo, settimane 1-2 e poi */
  ripetizioniPrincipiante: {
    v: { inizio: { settimane: 2, multi: [10, 12], isolamento: [12, 15] }, dopo: { multi: [8, 12], isolamento: [10, 15] } },
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.2 e PRI-11 (doppia progressione: sale il carico alla cima del range)', regole: ['PRN-03']
  },

  /* ---- MES-02: tabella del RIR per livello, classe e settimana ---- */
  /* principiante: 3-4 nelle settimane 1-2, 2-3 dalla 3ª alla 11ª, 3-4 alla verifica (12ª); dalla 7ª l’ultima serie degli isolamenti a macchina o cavo (classe D) 1-2; mai 0 */
  rirPrincipiante: {
    v: { inizio: [3, 4], inizioSettimane: 2, dopo: [2, 3], ultimaSerieIsolamenti: { dallaSettimana: 7, rir: [1, 2] }, verifica: [3, 4] },
    forza: 'Convenzione', fonte: 'registro coach v2 B5; ricerca-principianti-12-settimane §3.2 e PRI-02; Halperin 2022, Refalo 2023 (le stime del RIR sbagliano di circa 1 ripetizione)', regole: ['MES-02', 'PRN-03']
  },
  /* intermedio e avanzato: limite basso del RIR per tipo (pesanti = classe A; macchine = classi B e C; isolamenti = classi D, E, F), settimane di carico 1-5.
     0 solo nell’ultima settimana (intermedio) o nelle ultime due (avanzato) e solo su esercizi stabili con prontezza almeno prontezzaPerZero */
  rirIntermedio: {
    v: { pesanti: [3, 3, 2, 2, 1], macchine: [3, 2, 2, 1, 1], isolamenti: [3, 2, 1, 1, 0] },
    forza: 'Convenzione', fonte: 'registro coach v2 B5; ricerca-mesocicli-periodizzazione-scarichi §3.4; ricerca-ipertrofia-programmazione §3.5; Robinson 2024 (per l’ipertrofia la crescita sale avvicinandosi al cedimento)', regole: ['MES-02']
  },
  rirAvanzato: {
    v: { pesanti: [3, 2, 2, 1, 1], macchine: [3, 2, 1, 1, 0], isolamenti: [2, 1, 1, 0, 0] },
    forza: 'Convenzione', fonte: 'registro coach v2 B5; ricerca-mesocicli-periodizzazione-scarichi §3.4; ricerca-ipertrofia-programmazione §3.5', regole: ['MES-02']
  },
  /* settimana di scarico: la scorta sta tra queste (RIR 4-5, mai sopra 4 come limite basso) */
  rirScarico: {
    v: [4, 5],
    forza: 'Convenzione', fonte: 'registro coach v2 B5 e B17; ricerca-mesocicli-periodizzazione-scarichi §3.6 (RIR mostrato in scarico)', regole: ['MES-02']
  },
  /* oltre 4 ripetizioni di scorta la stima peggiora (Remmert 2023, Halperin 2022): il limite basso non supera mai questo */
  rirMassimo: {
    v: 4,
    forza: 'Moderata', fonte: 'registro coach v2 B5 («il RIR non supera mai 4»); Halperin 2022, Remmert 2023', regole: ['MES-02']
  },
  /* pavimenti: i fondamentali col bilanciere non scendono sotto 1; i multiarticolari liberi (classe B) nemmeno */
  pavimentoPesanti: {
    v: 1,
    forza: 'Convenzione', fonte: 'registro coach v2 B5 (PCO-02, collaudo RIR-02); ricerca-metodi-coach-pratici PCO-02; ACSM 2026 (il cedimento non serve)', regole: ['MES-02']
  },
  /* esercizi che possono cadere addosso, da soli in casa (pesi liberi o equilibrio, non il solo corpo libero): almeno 2 ripetizioni in riserva */
  /* INT-2d (revisione, minor 2): il core (classe F) non ha il cedimento: MAV-02 dice «sul core non serve il cedimento», ma la tabella lo leggeva come un isolamento e alla 5ª settimana arrivava a [0, 1]. Mai 0 sul core */
  pavimentoCore: {
    v: 1,
    forza: 'Convenzione', fonte: 'MAV-02 (niente cedimento sul core, sulle tenute e a peso zero); revisione INT-2d, minor 2; ACSM 2026 (il cedimento non serve)', regole: ['MES-02', 'MAV-02']
  },
  pavimentoCasa: {
    v: 2,
    forza: 'Convenzione', fonte: 'registro coach v2 B5 (CAS-11); ricerca-casa-poco-tempo §4.4 e CAS-11 (cedimento sicuro senza spotter)', regole: ['MES-02']
  },
  /* il RIR 0 si pianifica solo con una prontezza del giorno di almeno questo punteggio (su 100) */
  prontezzaPerZero: {
    v: 60,
    forza: 'Convenzione', fonte: 'registro coach v2 B5 («0 solo nell’ultima settimana, esercizi stabili, prontezza ≥ 60»); ricerca-mesocicli-periodizzazione-scarichi §3.4', regole: ['MES-02']
  },
  /* minorenni: mai sotto 2 ripetizioni in riserva (la stessa cifra di MES_RIR.pisoMinorenni, regole-ricerca.js) */
  pavimentoMinorenni: {
    v: 2,
    forza: 'Convenzione', fonte: 'ETA-02 (registro coach v2 C.3); ricerca-fasce-di-eta §3.2', regole: ['MES-02']
  },
  /* modalità prudente e over 65: nessuna rampa, sempre 3-4 ripetizioni in riserva */
  rirPrudente: {
    v: [3, 4],
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.2 (modalità prudente: RIR 3-4 fisso, invariato rispetto a oggi); registro coach v2 B10', regole: ['MES-02']
  },

  /* ---- OBI-03: il RIR dichiarato è il RIR usato ---- */
  /* salute: mai più vicino al cedimento di 2 ripetizioni in riserva (la scorta di 3-4 delle prime settimane resta) */
  obiettivoSalute: {
    v: { pavimento: 2 },
    forza: 'Moderata', fonte: 'registro coach v2 B5 (OBI-03: salute [2,3] ovunque); ACSM 2026 e Robinson 2024 (2-3 ripetizioni in riserva)', regole: ['OBI-03']
  },
  /* forza: sui fondamentali pesanti [2,4] (salvo AMRAP e test, che il piano non vede) */
  obiettivoForza: {
    v: { pesanti: [2, 4] },
    forza: 'Convenzione', fonte: 'registro coach v2 B5 (OBI-03: forza [2,4] sui pesanti); ricerca-obiettivi-e-programmi OBI-03; per la forza la pendenza sul RIR stimato è nulla (Robinson 2024)', regole: ['OBI-03']
  },
  /* fase di taglio: pavimento 2 sui pesanti e 1 sul resto */
  obiettivoDeficit: {
    v: { pesanti: 2, altri: 1 },
    forza: 'Convenzione', fonte: 'registro coach v2 B5 (deficit: pavimento 2 sui pesanti, ex MES-17); ricerca-mesocicli-periodizzazione-scarichi §3.12.2', regole: ['OBI-03']
  },

  /* ---- scarico: una dose sola, sul carico di riferimento di PRIMA dello scarico (mai composto: MES-06) ---- */
  /* serie × questi fattori (-35 / -50 / -60%) */
  scaricoSerie: {
    v: { bassa: 0.65, media: 0.50, alta: 0.40 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4, B17, C.4 (MES-05: dosi); ricerca-mesocicli-periodizzazione-scarichi §3.6 (sondaggio di 204 preparatori, Wendler, RP)', regole: ['MES-01', 'MES-05']
  },
  /* carico × questi fattori (-5 / -10%) sul riferimento prima dello scarico */
  scaricoCarico: {
    v: { bassa: 0.95, media: 0.90, alta: 0.90 },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 e C.4; ricerca-mesocicli-periodizzazione-scarichi §3.6 e §3.6.1 (Rippetoe e Baker 2014; PMID 28328712: 2 settimane di stop mantengono la forza)', regole: ['MES-01', 'MES-05']
  },
  /* durata dello scarico in giorni (6,4 ± 1,7 in pratica: Bell 2024) e carico della ripresa (1 = 100% del riferimento) */
  scaricoGiorni: {
    v: [5, 7],
    forza: 'Convenzione', fonte: 'registro coach v2 B4; Bell 2024 (scarico di 6,4 ± 1,7 giorni); ricerca-mesocicli-periodizzazione-scarichi §3.6', regole: ['MES-01']
  },
  scaricoRipresa: {
    v: 1,
    forza: 'Convenzione', fonte: 'registro coach v2 B4 e B17 («ripresa al 100%»); ricerca-mesocicli-periodizzazione-scarichi §3.6.1', regole: ['MES-01', 'MES-06']
  },
  /* dose di partenza segnata nel piano (poi la sceglie la fatica del momento, MES-05): bassa fino a questo numero di giorni a settimana, media oltre; media per i prudenti */
  scaricoDoseIniziale: {
    v: { giorniBassa: 3, prudente: 'media' },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.11 (dose di default per numero di sedute) e §3.2 (prudenti: «media»)', regole: ['MES-01', 'MES-05']
  },
  /* la 12ª settimana del principiante: serie -35% (la nota dice -30/-35%), carico invariato, RIR 3-4 */
  verificaPrincipiante: {
    v: { serie: 0.65, carico: 1, rir: [3, 4] },
    forza: 'Convenzione', fonte: 'registro coach v2 B4 («12ª di verifica: serie −30/−35%, RIR 3-4, carico invariato»); ricerca-principianti-12-settimane §3.2', regole: ['PRN-03']
  },

  /* ---- cosa passa da un blocco al successivo (lo applica W3-T5: MES-13, MES-14) e le tecniche per posizione nel blocco ---- */
  passaggioBlocco: {
    v: { prioritaPiuSerie: 1, fondamentaliBlocchi: [2, 3], accessoriRuotati: [0.33, 0.5], rampaRiparte: true },
    forza: 'Convenzione', fonte: 'ricerca-mesocicli-periodizzazione-scarichi §3.9-3.10 (+1 serie al muscolo prioritario se il verdetto è «buono»; fondamentali fissi per 2-3 blocchi; ruota un terzo - metà degli accessori al confine del blocco; Baz-Valle 2019)', regole: ['MES-13', 'MES-14']
  },
  /* tecniche: nelle settimane 1-2 del blocco solo G1 (tempo, pausa breve, superserie); dalla 3ª anche G2; in scarico e per i principianti sempre G1 */
  tecnichePerPosizione: {
    v: { soloG1FinoAllaSettimana: 2 },
    forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita §4.2 (posizione nel blocco); registro coach v2 A.2 (tecniche)', regole: ['MES-01']
  }
};
