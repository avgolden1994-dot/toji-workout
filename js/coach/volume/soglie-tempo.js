/* Soglie del tempo: tempi per serie e per cambio, riscaldamento, pause per classe, capacita e durata massima (CAS-05..08, CAS-18, PRG-13, PRG-20, IPE-04, IPE-12)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DEL TEMPO (coach v2, W2-T2; piano capitolo E.3; registro B8, B11, B12, D-P7, D-P10, C.4)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   Tutto «Convenzione»: sono costanti ragionate del modello dei tempi (ricerca-casa-poco-tempo §5.1: «da tarare sul tempo reale», e lo fa CAS-18) e le
   pause della tabella B8, che mette d accordo Singer 2024 (oltre 60-90 s poca differenza per la massa) e ACSM 2026 (2-3 minuti: Contrastata).
   «Decisione» dove la scelta e del registro (D-P7 per le donne, D-P10 per il tempo che e un tetto).
   Le soglie si leggono solo durante l esecuzione (sogliaTempo, in volume/tempo.js), mai al caricamento.
   I numeri di volume che il tempo usa (volumeMax, volumeMin, serieMinRecupero) restano in PARAM_TEMPO (tempo.js) finche W2-T1 non li porta nel suo file.
   ============================================================ */
const SOGLIE_TEMPO = {
  /* CAS-05: secondi per ripetizione per classe (A-F di attributi-esercizi.js). S = c + n x t_rip; la classe A ha la pausa a fine corsa (5 s: 5 ripetizioni = 30 s, la riga «pesante» di §5.1),
     il corpo libero la discesa controllata (4 s), il Nordic 5 s, i multiarticolari liberi 3,5 s, macchine, cavi e isolamenti 3 s */
  secRipetizione: {
    v: { A: 5, B: 3.5, corpo: 4, C: 3, D: 3, E: 3, F: 3, nordic: 5 },
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (tempo di una serie e tabella delle classi)', regole: ['CAS-05']
  },
  /* CAS-05: preparazione di una serie (c), secondi in piu di una tenuta (la serie dura quanto la tenuta + 5-10 s: il minimo), passaggio da un lato all altro (unilaterali: S = 2 x (c + n x t_rip) + 10) */
  secPreparazione: {
    v: 5,
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (c = 5 s)', regole: ['CAS-05']
  },
  secTenutaExtra: {
    v: 5,
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (tenute: S = durata + 5-10 s)', regole: ['CAS-05']
  },
  secCambioLato: {
    v: 10,
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (unilaterali: due lati piu 10 s di cambio)', regole: ['CAS-05']
  },
  /* CAS-05: passaggio tra i due esercizi di una coppia (T_coppia = n x (S_A + S_B + 15 + max(R_A, R_B)) + X_A + X_B) */
  secPassaggioCoppia: {
    v: 15,
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (coppia: il 15 e il passaggio tra i due esercizi)', regole: ['CAS-05', 'CAS-08']
  },
  /* CAS-05: cambio X (secondi) quando l esercizio non ha il suo `setup` in attributi-esercizi.js (esercizio fuori libreria): per classe, unilaterali e elastici a parte */
  secCambio: {
    v: { A: 60, B: 30, C: 30, D: 20, E: 20, F: 15, unilaterale: 40, elastico: 25 },
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 (colonna «Cambio X» della tabella delle classi)', regole: ['CAS-05']
  },
  /* CAS-05 (assorbe IPE-14 e RIS-12 come calcolo): riscaldamento generale G = min(8, max(3, 4 + eta + pesante + zona dolente)). Freddo, ora del giorno e rientro dopo una pausa non si conoscono quando si
     scrive il programma: valgono 0 (la stessa stima per il generatore e per Oggi). eta 40-59 +1, da 60 +2; «pesante» = il primo multiarticolare e a 5 ripetizioni o meno (intensita relativa da 0,80) */
  riscaldamentoGenerale: {
    v: { base: 4, min: 3, max: 8, eta40: 1, eta60: 2, pesante: 1, zonaDolente: 1, ripetizioniPesante: 5 },
    forza: 'Convenzione', fonte: 'ricerca-riscaldamento-mobilita-prevenzione §3.7; registro B11 (RIS 3.7 e non il W(M) di CAS: niente doppio conteggio)', regole: ['CAS-05']
  },
  /* CAS-05: minuti di una rampa di riscaldamento per numero di serie (RIS §3.9: somma delle ripetizioni x 3 s e dei riposi) */
  rampaMinuti: {
    v: { 0: 0, 1: 1.3, 2: 2.9, 3: 4.1, 4: 6.2, 5: 7.5 },
    forza: 'Convenzione', fonte: 'ricerca-riscaldamento-mobilita-prevenzione §3.9 (costo in tempo; la quinta serie, la serie «0» leggera di §3.5, e di 10 ripetizioni con 45 s di riposo: +1,3 minuti, calcolo con la stessa regola)', regole: ['CAS-05']
  },
  /* CAS-05: quante serie di rampa per classe e intensita relativa I = 1 / (1 + (R + 2) / 30) (Epley con 2 ripetizioni in riserva): [da 0,80, da 0,70, sotto]; manubri e kettlebell uno in meno;
     corpo libero 1 serie leggera solo sul primo multiarticolare; isolamento a macchina o cavo 1 serie sul primo del muscolo; chi comincia +1 sul primo multiarticolare di ogni schema; over 65, PAR-Q e minorenni +1; massimo 5.
     Riduzioni: stessa regione con almeno 2 serie di lavoro -1, stesso gruppo -2, stesso schema al massimo 1 serie. Il peso non conta (la stima e uguale prima e dopo la scelta del carico di partenza) */
  rampaSerie: {
    v: { pesante: [4, 3, 2], guidato: [3, 2, 1], intensita: [0.80, 0.70], rir: 2, epley: 30, manubriMeno: 1, corpoLibero: 1, isolamentoGuidato: 1, principiante: 1, prudente: 1, max: 5,
      menoRegione: 1, menoGruppo: 2, stessoSchemaMax: 1, serieLavoroPerRiduzione: 2 },
    forza: 'Convenzione', fonte: 'ricerca-riscaldamento-mobilita-prevenzione §3.1-3.5 (classi, riduzioni e aumenti)', regole: ['CAS-05']
  },
  /* CAS-05: tetto del tempo di tutta la rampa in una seduta, per minuti dichiarati: [fino a, minuti] (si taglia dagli ultimi esercizi, mai dal primo di ogni regione) */
  rampaTetto: {
    v: [[45, 5], [75, 8], [999, 10]],
    forza: 'Convenzione', fonte: 'ricerca-riscaldamento-mobilita-prevenzione §3.6 (tetto di tempo)', regole: ['CAS-05']
  },
  /* CAS-18: fattore personale = mediana(minuti reali / minuti stimati) delle ultime `sedute` sedute con la durata registrata, tra min e max. Contano le sedute complete (almeno `completamento` delle serie
     fatte), non interrotte, non importate ne libere, con una durata tra `minutiMin` e `minutiMax` */
  fattorePersonale: {
    v: { min: 0.8, max: 1.4, sedute: 3, completamento: 0.7, minutiMin: 10, minutiMax: 240, sogliaNota: 0.05 },
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.1 e CAS-18 (f = mediana, limitato a 0,8-1,4); le soglie di scarto sono del collaudo del tempo', regole: ['CAS-18']
  },
  /* registro B8, PRG-13: pause per classe e obiettivo, [prescritta, massima, minima della cella] in secondi (la minima c e solo dove non e il minimo della classe: forza, classe A). Colonne: ipertrofia e ricomposizione (anche glutei), forza, salute e dimagrimento.
     A 120-180 / 180-240 / 120, B 90 (corpo libero 75) / 120 / 75, C 90-120 / 120 / 90, D e E 60-90 (polpacci e laterali 45-60) / 90 / 60, F 45. Il collaudo RX-02 accetta tutte queste celle */
  pausa: {
    v: {
      ipertrofia: { A: [150, 180], B: [90, 90], C: [105, 120], D: [75, 90], E: [75, 90], F: [45, 45] },
      forza:      { A: [210, 240, 180], B: [120, 120], C: [120, 120], D: [90, 90], E: [90, 90], F: [45, 45] },
      generale:   { A: [120, 120], B: [75, 75], C: [90, 90], D: [60, 60], E: [60, 60], F: [45, 45] }
    },
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (Singer 2024 contro ACSM 2026: Contrastata; per la forza con carichi alti le pause lunghe hanno base: ACSM 2009, Schoenfeld 2016); ricerca-ipertrofia-programmazione §3.4', regole: ['PRG-13']
  },
  pausaCorpoLibero: {
    v: 75,
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (B, ipertrofia: corpo libero 75 s); ricerca-casa-poco-tempo CAS-04', regole: ['PRG-13']
  },
  pausaPolpacciLaterali: {
    v: [60, 60],
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (polpacci e laterali 45-60 s); ricerca-ipertrofia-programmazione §3.4', regole: ['PRG-13']
  },
  /* PRG-13: minimo della pausa per classe nel taglio per il tempo (CAS-07 passo 1); con l obiettivo forza la classe A non si taglia (resta la prescritta) */
  pausaMinimo: {
    v: { A: 120, B: 60, C: 75, D: 45, E: 45, F: 30 },
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (colonna «Minimo (taglio per il tempo)»); ricerca-casa-poco-tempo §5.4 (ordine di intervento, passo 1)', regole: ['PRG-13', 'CAS-07']
  },
  /* PRG-13: dove la fascia di recupero del collaudo (RX-02: ACSM 2009, Singer 2024, Schoenfeld 2016) e piu alta del minimo di B8 il taglio si ferma prima: con la forza i multiarticolari B e C non scendono sotto 90 s, il core e le tenute
     (F) non sotto 45 s con la forza e l ipertrofia (solo per salute e dimagrimento valgono i 30 s di B8). Raffinamento di B8, non una riga nuova: stessa Convenzione */
  pausaMinimoAlzato: {
    v: { forza: { B: 90, C: 90, F: 45 }, ipertrofia: { F: 45 } },
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (colonna «Minimo») raffinata con le fasce di recupero del collaudo RX-02 (forza: macchine e multiarticolari 90-240 s; isolamenti 45-150 s)', regole: ['PRG-13', 'CAS-07']
  },
  /* ETA-09 assorbita in PRG-13: oltre i 65 anni almeno 90 s su B e C, 120 s su A (Borde: 120 s [V]; il resto Convenzione) */
  pausaOltre65: {
    v: { A: 120, B: 90, C: 90 },
    forza: 'Moderata', fonte: 'registro coach v2 B8 e B10; ricerca-fasce-di-eta §3.2 (65-74: almeno 90 s, 120 s sui pesanti; Borde)', regole: ['PRG-13']
  },
  /* PRG-20 (D-P7, riscritta; ex DON-08): -15% solo su D, E e su B, C con almeno 8 ripetizioni; mai su A ne con 6 ripetizioni o meno; minimi 45 s (F), 60 s (D, E), 75 s (B, C) */
  pauseDonne: {
    v: { fattore: 0.85, classi: ['B', 'C', 'D', 'E'], ripetizioniMinime: 8, minimi: { B: 75, C: 75, D: 60, E: 60, F: 45 } },
    forza: 'Convenzione', fonte: 'registro coach v2 D-P7 (fonte unica: PeerJ 2025; meno affaticabili sotto l 80% di 1RM, nessuna prova ai carichi pesanti: Contrastata); ricerca-donne-carichi-iniziali §4 (Pause)', regole: ['PRG-20']
  },
  /* CAS-06 (assorbe PRI-08): quanti esercizi per seduta. Minimo 4 (i quattro schemi base), massimo 8 (EXN-02 del collaudo: la riga «10 con coppie» di CAS-06 resta sopra il tetto di 8);
     principianti 4-6 (5-6 con 2 giorni e almeno 40 minuti: ogni schema in entrambe le sedute); una coppia fa risparmiare circa il 27% (multi + multi) o il 20% (iso + iso) */
  capacita: {
    v: { min: 4, max: 8, minPrincipiante: 4, maxPrincipiante: 6, minPrincipiante2Giorni: 5, minutiMinPrincipiante2Giorni: 40, risparmioCoppie: 0.25, minutiConCoppie: 45, serieMedie: 3, serieMedieForza: 3.5 },
    forza: 'Convenzione', fonte: 'ricerca-casa-poco-tempo §5.3-5.4 e CAS-06; ricerca-principianti-12-settimane PRI-08; registro B1', regole: ['CAS-06']
  },
  /* D-P10 e PRI-08: i principianti stanno al massimo in 40 minuti nelle settimane 1-2 e in 50 dopo, anche se dichiarano di piu (il tempo in piu va al riscaldamento e al recupero) */
  durataMaxPrincipiante: {
    v: { settimane1e2: 40, dopo: 50 },
    forza: 'Convenzione', fonte: 'registro coach v2 D-P10; ricerca-principianti-12-settimane PRI-08 e §1.11 (durata consigliata 35-45 minuti, poi 45-50)', regole: ['CAS-06']
  },
  /* CAS-07: i pavimenti del taglio per il tempo, in attesa del pavimento per unita di W2-T1 (pavimentoVolume): mai sotto i 4 schemi base per 2 serie, mai un grande muscolo sotto 4 serie frazionarie a settimana
     (Iversen 2021, Pelland: il minimo che serve a cominciare) */
  pavimentiTaglio: {
    v: { schemiBase: 4, serieBase: 2, frazionarieGrandi: 4, grandi: ['petto', 'dorsali', 'quadricipiti', 'femorali', 'grande_gluteo'] },
    forza: 'Moderata', fonte: 'ricerca-casa-poco-tempo §5.4 (passo 6: mai sotto P1 x 2 serie) e §3.8 di ricerca-ipertrofia-programmazione (sotto 4 serie frazionarie il muscolo non e da ipertrofia: Pelland, Iversen 2021)', regole: ['CAS-07']
  },
  /* IPE-04: nel giorno «forza» del PHUL con 45 minuti o meno (non per l obiettivo forza) 6-8 ripetizioni e 120-150 s invece di 4 x 5 a 180 s; il 5 x 5 resta dai 60 minuti */
  giornoForzaCorto: {
    v: { minuti: 45, ripetizioni: 6, serie: 3, pausa: 135 },
    forza: 'Moderata', fonte: 'ricerca-ipertrofia-programmazione IPE-04 (ACSM 2026: per la massa conta la serie vicina al cedimento, non il carico; Singer 2024)', regole: ['IPE-04']
  },
  /* IPE-12: poco tempo = al massimo 30 minuti, oppure al massimo 2 giorni con al massimo 45 minuti (INT-2d: prima bastavano 2 giorni anche a 90 minuti). La nota non dice piu «4-6 serie per muscolo»:
     serieMin e serieMax restano solo come dose minima di riferimento della nota di ricerca, nessuna frase le scrive */
  pocoTempo: {
    v: { minuti: 30, giorni: 2, minutiDueGiorni: 45, serieMin: 4, serieMax: 6 },
    forza: 'Moderata', fonte: 'ricerca-ipertrofia-programmazione IPE-12 (dose minima: Iversen 2021, Androulakis-Korakakis)', regole: ['IPE-12']
  },
  /* D-P10 / B12: la seduta che usa meno di questa quota dei minuti dichiarati, con il volume utile completo, lo dice («il lavoro utile per te e gia tutto qui»); e la stessa soglia di spreco del collaudo DUR-02 */
  quotaLavoroUtile: {
    v: 0.75,
    forza: 'Decisione', fonte: 'registro coach v2 B12 e D-P10 (il tempo e un tetto, non un obiettivo: la seduta usa meno del 75% dei minuti solo se il volume utile e completo)', regole: ['CAS-06', 'CAS-07']
  }
};
