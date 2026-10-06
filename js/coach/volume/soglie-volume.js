/* Soglie del volume per muscolo (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, EST-05, EST-06)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DEL VOLUME PER MUSCOLO (coach v2, W2-T1; registro B6, B7, B19, D-P17; piano E.3)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   Le unità sono le 15 di UNITA_VOLUME (js/dati/attributi-esercizi.js): le serie sono FRAZIONARIE (1 serie per il bersaglio, 0,5 per
   un secondario che è un vero motore: i crediti stanno negli attributi degli esercizi). Le fasce sono [minimo, massimo] a settimana.
   Forza: l'unico numero con base solida è «almeno 10 serie negli allenati» (minimoAllenati); le fasce per singolo muscolo sono
   stime di lavoro (registro C.4: «Convenzione»); il tetto per seduta è un preprint («Provvisoria» finché non esce la versione rivista).
   Le soglie si leggono solo durante l'esecuzione (sogliaVolume, in volume.js), mai al caricamento.
   ============================================================ */
const SOGLIE_VOLUME = {
  /* registro B6, tabella VOLUME_UNITA (ipertrofia e ricomposizione): fasce IPE per petto, dorsali e quadricipiti, fasce per muscolo
     (ricerca-specializzazione §3.1) per le altre unità. mantenimento = cosa basta a tenere il muscolo quando il tempo è poco o un altro
     muscolo è in specializzazione. deltoide_anteriore: nessun minimo, solo il controllo dell'eccesso (riceve molto dalle spinte) */
  fasceUnita: {
    v: {
      petto:              { principiante: [6, 10], intermedio: [10, 16], avanzato: [12, 20], mantenimento: [4, 6] },
      dorsali:            { principiante: [6, 10], intermedio: [10, 16], avanzato: [12, 20], mantenimento: [4, 6] },
      quadricipiti:       { principiante: [6, 10], intermedio: [10, 16], avanzato: [12, 20], mantenimento: [4, 6] },
      grande_gluteo:      { principiante: [4, 8],  intermedio: [8, 14],  avanzato: [10, 16], mantenimento: [0, 3] },
      schiena_spessore:   { principiante: [4, 8],  intermedio: [6, 12],  avanzato: [8, 14],  mantenimento: [2, 4] },
      femorali:           { principiante: [4, 8],  intermedio: [8, 12],  avanzato: [10, 14], mantenimento: [3, 4] },
      deltoide_laterale:  { principiante: [4, 6],  intermedio: [8, 14],  avanzato: [10, 18], mantenimento: [3, 4] },
      deltoide_posteriore: { principiante: [3, 5], intermedio: [6, 12],  avanzato: [8, 14],  mantenimento: [2, 3] },
      bicipiti:           { principiante: [4, 6],  intermedio: [8, 14],  avanzato: [10, 18], mantenimento: [3, 4] },
      tricipiti:          { principiante: [4, 6],  intermedio: [6, 12],  avanzato: [8, 16],  mantenimento: [3, 4] },
      polpacci:           { principiante: [4, 6],  intermedio: [8, 12],  avanzato: [10, 16], mantenimento: [4, 6] },
      adduttori:          { principiante: [0, 2],  intermedio: [3, 8],   avanzato: [4, 10],  mantenimento: [0, 2] },
      abduttori:          { principiante: [0, 2],  intermedio: [2, 6],   avanzato: [3, 8],   mantenimento: [0, 0] },
      addome:             { principiante: [2, 4],  intermedio: [4, 8],   avanzato: [6, 10],  mantenimento: [0, 2] },
      deltoide_anteriore: { principiante: [0, 10], intermedio: [0, 14],  avanzato: [0, 16],  mantenimento: [0, 0] }
    },
    forza: 'Convenzione',
    fonte: 'registro coach v2 B6 (VOLUME_UNITA): fasce IPE (ricerca-ipertrofia-programmazione §3.2) per petto, dorsali e quadricipiti, per muscolo da ricerca-specializzazione §3.1; massimo del deltoide anteriore per principianti: come le unità grandi (la tabella non lo dà)',
    regole: ['IPE-01']
  },
  /* B6: «≥ 10 serie negli allenati» è l'unico numero con base solida (Schoenfeld 2017, ACSM 2026) */
  minimoAllenati: {
    v: 10,
    forza: 'Solida', fonte: 'Schoenfeld 2017; ACSM 2026 (137 revisioni): negli allenati almeno 10 serie a settimana per le unità grandi (registro B6)', regole: ['IPE-01']
  },
  /* B6: obiettivo glutei, grande gluteo [principiante, intermedio, avanzato] (riceve molto indiretto: la fascia normale è più bassa) */
  fasciaGlutei: {
    v: { principiante: [8, 12], intermedio: [12, 18], avanzato: [14, 20] },
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (grande gluteo: obiettivo glutei 8-12 / 12-18 / 14-20)', regole: ['IPE-01']
  },
  /* B6: obiettivo salute o generale: unità grandi per livello; le piccole non hanno un minimo diretto (almeno 2 frazionarie) e
     non salgono oltre il massimo delle grandi del livello */
  fasceGenerale: {
    v: { principiante: [4, 8], intermedio: [6, 10], avanzato: [8, 12] },
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (salute e generale: unità grandi 4-8 / 6-10 / 8-12); ricerca-ipertrofia-programmazione §3.2; ACSM 2026', regole: ['IPE-01']
  },
  minimoPiccoleGenerale: {
    v: 2,
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (salute e generale: unità piccole nessun minimo diretto, almeno 2 serie frazionarie)', regole: ['IPE-01']
  },
  /* B6: obiettivo forza: le unità grandi nella metà bassa della fascia (quota della distanza tra minimo e massimo), le piccole a mantenimento */
  forzaQuotaFascia: {
    v: 0.5,
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (forza: unità grandi nella metà bassa della fascia, piccole a «mantenimento»)', regole: ['IPE-01']
  },
  /* B6: i femorali almeno 0,6 volte i quadricipiti e almeno una flessione del ginocchio a settimana (collaudo EQ-03) */
  femoraliSuQuadricipiti: {
    v: 0.6,
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (femorali ≥ 0,6 × quadricipiti); Maeo 2021 per la flessione del ginocchio (Moderata)', regole: ['IPE-01']
  },
  /* B6, IPE-02: pavimenti di serie DIRETTE a settimana (intermedio e avanzato): [pavimento, pieno] per «4 giorni o più», 3 giorni, 2 giorni,
     forza e generale (salute, dimagrimento). Il pavimento è il minimo che un taglio non può toccare; il pieno è dove si arriva se il tempo c'è.
     Dalla tabella per giorni di ricerca-specializzazione §6.1, con i femorali aggiunti da IPE (ricerca-ipertrofia-programmazione §3.2) */
  pavimentiDirette: {
    v: {
      deltoide_laterale:   { g4: [6, 8], g3: [4, 6], g2: [3, 3], forza: [2, 3], generale: [0, 2] },
      deltoide_posteriore: { g4: [4, 6], g3: [3, 4], g2: [2, 2], forza: [2, 2], generale: [0, 2] },
      bicipiti:            { g4: [4, 6], g3: [4, 4], g2: [2, 2], forza: [2, 2], generale: [0, 2] },
      tricipiti:           { g4: [4, 6], g3: [4, 4], g2: [2, 2], forza: [2, 2], generale: [0, 2] },
      polpacci:            { g4: [8, 8], g3: [6, 6], g2: [3, 4], forza: [3, 3], generale: [2, 2] },
      femorali:            { g4: [4, 6], g3: [4, 4], g2: [2, 2], forza: [2, 2], generale: [2, 2] },
      addome:              { g4: [4, 6], g3: [4, 4], g2: [2, 2], forza: [2, 2], generale: [2, 2] }
    },
    forza: 'Convenzione', fonte: 'registro coach v2 B6 (pavimenti IPE-02 per giorni); ricerca-specializzazione §6.1; Maeo 2023 e Baz-Valle 2022 per tricipiti e bicipiti (Moderata)', regole: ['IPE-02']
  },
  /* B7, IPE-06: tetto di serie frazionarie di un'unità in una seduta: morbido 8 (si sposta la serie in un'altra seduta se c'è), duro 11;
     l'unità prioritaria in specializzazione ha il duro a 8, e a 6 se è piccola (deltoidi, braccia, polpacci, addome) */
  tettoSeduta: {
    v: { morbido: 8, duro: 11, specializzazione: 8, specializzazionePiccole: 6 },
    forza: 'Provvisoria', fonte: 'Remmert 2025 (preprint, meta-regressione sul volume per seduta); Henselmans (≤ 6 per i piccoli in specializzazione); registro coach v2 B7 e C.4', regole: ['IPE-06', 'EST-05']
  },
  /* collaudo SERIE_MAX_ESERCIZIO: oltre 6 serie su un esercizio non rende di più; 5 per i multiarticolari (fatica), 6 per gli isolamenti */
  serieMaxEsercizio: {
    v: { composto: 5, isolamento: 6 },
    forza: 'Convenzione', fonte: 'Krieger 2010; Ralston 2017 (2-6 serie per esercizio: Solida/Moderata); stesso tetto del collaudo (SERIE_MAX_ESERCIZIO)', regole: ['IPE-01']
  },
  /* INT-2d (M7 della revisione, sicurezza): con un fastidio dichiarato a una zona (spalle, ginocchia, schiena) un isolamento che carica quella zona non va oltre 4 serie in una seduta: il solutore concentrava fino a 6 serie
     su un esercizio solo (Alzate Laterali 6 x 15 con la spalla dolente, 4 e 2 di Extrarotazione al cavo come deltoidi posteriori). 4 e il limite alto della fascia 2-4 serie per esercizio di un isolamento di ricerca-ipertrofia-programmazione (Krieger 2010: 2-6, Ralston 2017) meno due, la dose che non chiede la fatica massima all articolazione */
  serieMaxIsolamentoConFastidio: {
    v: 4,
    forza: 'Convenzione', fonte: 'revisione indipendente INT-2d, M7 (misurato: isolamenti a 6 serie in centinaia di programmi, Alzate Laterali 6 x 15 con la spalla dolente); regola di sicurezza (tolleranza zero, SAF-02: nessun esercizio aggiunto carica una zona dolente senza prudenza)', regole: ['IPE-01', 'SAF-02']
  },
  /* ABB-03, SEL-07 (INT-2b, onda 2c): un esercizio di core non va oltre 3 serie (un esercizio di core a fine seduta, 2-3 serie; ricerca-biomeccanica §4 SEL-07 e D10: il core vuole poco volume,
     2-6 serie a settimana, un movimento «anti» e uno di flessione). Il resto del volume dell'addome lo porta un secondo esercizio in un'altra seduta, non il quinto o sesto giro di Pallof Press
     (misurato su 600 programmi in palestra: 77 esercizi di core a 4-6 serie). Il massimo a settimana e la fascia di B6 (fasceUnita.addome), tetto duro per il solutore */
  serieMaxCore: {
    v: 3,
    forza: 'Convenzione', fonte: 'ABB-03 (un esercizio di core a fine seduta, 2-3 serie: strCopri, strCoreNuovo); ricerca-biomeccanica-esercizi §4 SEL-07 e D10 (core 2-6 serie a settimana, poco volume); registro B6 (addome 2-4 / 4-8 / 6-10 a settimana)', regole: ['IPE-01', 'IPE-06']
  },
  /* collaudo EXN-02: al massimo 8 esercizi in una seduta, 6 per chi inizia */
  eserciziMaxSeduta: {
    v: { adulto: 8, principiante: 6 },
    forza: 'Convenzione', fonte: 'collaudo del generatore (ES_MAX_SEDUTA, ES_MAX_PRINCIPIANTE); piano E.3 W2-T1', regole: ['IPE-01']
  },
  /* collaudo FRQ-01 e FRQ-02: ogni unità grande in almeno 2 sedute (ACSM 2026: Solida), una seduta «conta» da 1,5 serie frazionarie;
     i muscoli piccoli con serie dirette in almeno 2 sedute (ricerca-ipertrofia-programmazione §3.3: Convenzione) */
  seduteMinimeUnita: {
    v: 2,
    forza: 'Solida', fonte: 'ACSM 2026 (137 revisioni): ogni grande gruppo almeno 2 sedute a settimana; collaudo FRQ-01', regole: ['IPE-01']
  },
  serieMinSeduta: {
    v: 1.5,
    forza: 'Convenzione', fonte: 'collaudo FRQ-01 (una seduta conta da 1,5 serie frazionarie, cioè 3 serie sinergiche)', regole: ['IPE-01']
  },
  /* registro B19, ricerca-specializzazione §5.2: al massimo 2 unità prioritarie (D-P17), con questo aumento sul volume standard e questo tetto assoluto
     (serie frazionarie a settimana); gli altri muscoli a max(mantenimento, quota del volume standard) in specializzazione */
  priorita: {
    v: { massimoUnita: 2, aumento: { leggera: 0.25, intermedio: 0.25, avanzato: 0.45 }, tetto: { predefinito: 20, deltoide_laterale: 22, deltoide_posteriore: 22, polpacci: 22, tricipiti: 18 }, altriQuota: 0.5 },
    forza: 'Convenzione', fonte: 'registro coach v2 B19 e D-P17; ricerca-specializzazione §5.2 (+25% intermedio, +40-50% avanzato, tetti 20 / 22 / 18); Bickel 2011 per il mantenimento (conoscenza del modello)', regole: ['EST-02', 'EST-05', 'EST-06']
  },
  /* OBI-04, MES-17: in deficit il volume parte dall'85% del picco e non supera il 90% */
  deficit: {
    v: { minimo: 0.85, massimo: 0.9 },
    forza: 'Convenzione', fonte: 'registro coach v2 B6 e C.4 (OBI-04: 85-90% del picco); ricerca-mesocicli §3.2 e §3.12.2; Helms 2015 (conoscenza del modello)', regole: ['OBI-04']
  },
  /* PRG-26 (fattore fisico) non è più una regola a sé: sposta il punto di partenza dentro la fascia, mai oltre; il massimo della fascia resta quello */
  fattoreFisico: {
    v: { ffmiBasso: 1.2, magraInCalo: 0.85 },
    forza: 'Convenzione', fonte: 'PRG-26 di prima (compone.js, fattoreFisico): massa magra bassa +20%, in calo -15%; registro coach v2 (PRG-26 ritirata: passa al punto di partenza)', regole: ['IPE-01']
  }
};
