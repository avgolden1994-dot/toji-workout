/* Soglie della modalità Forza (FRZ-02..05, STD-02)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   I NUMERI DELLA MODALITÀ FORZA (piano coach v2, W2-T7, versione snella)
   Una voce per numero: { v, forza, fonte, regole } (convenzione di regia/soglie-regia.js). Si leggono solo a esecuzione, con sogliaForza(nome).
   Onestà sulla forza dell'evidenza: la nota docs/ricerca-forza-progressione.md dice che frequenza, schemi e punti deboli per la forza sono «conoscenza del modello,
   non verificata sul web» (1.6) e che nessun programma famoso (5/3/1, GZCL, Candito, Sheiko) ha prove dirette (docs/ricerca-metodi-coach-pratici.md 2.7-2.12): qui sono
   tutti «Convenzione». Le due eccezioni sono dette: l'onda giornaliera è «Contrastata» (2C: due meta-analisi dicono sì, altre due no) e le serie minime per alzata sono
   «Solida» (Krieger 2010, Ralston 2017: 2-3 serie battono 1, la stessa fonte di RX-03 del collaudo).
   Cosa NON c'è: percentuali del massimale, tetti di RPE, AMRAP di appoggio, taper (FRZ-06..10, W3-T6; il taper TAP-01 è bloccato dal registro C.2 n. 15 e spento).
   ============================================================ */
const SOGLIE_FORZA = {
  /* FRZ-02: quante sedute a settimana hanno ognuna delle tre alzate nei programmi da powerlifting con almeno 3 giorni (la prova di tests/forza-struttura.test.js la controlla
     sulle tabelle di SPEC_FORZA). Squat 2 e panca 2 sono il minimo della nota (2-3 sedute per alzata); lo stacco 1 perché pesa di più sul recupero (ricerca-forza 1.6) */
  frequenzaMinima: {
    v: { squat: 2, panca: 2, stacco: 1 },
    forza: 'Convenzione', fonte: 'docs/ricerca-forza-progressione.md 1.6 (frequenza per la forza: 2-3 sedute per alzata, conoscenza del modello non verificata sul web; Williams 2017 e ACSM 2026 vanno nella stessa direzione); docs/ricerca-metodi-coach-pratici.md 2.11 (Sheiko: panca 3 volte, squat 2); docs/ricerca-obiettivi-e-programmi.md 3.1 (forza: lo stesso fondamentale 2-3 volte)',
    regole: ['FRZ-02']
  },
  /* FRZ-02: i giorni in cui la struttura da powerlifting è possibile. Con 2 giorni le tre alzate con la frequenza minima starebbero in due sedute (tre alzate in una: troppo per i minuti
     di chi ha 2 giorni); oltre 6 giorni l'app non ha divisioni (giorni 7 = 6 sedute) */
  giorni: {
    v: { min: 3, max: 6 },
    forza: 'Decisione', fonte: 'W2-T7 (versione snella): con 2 giorni resta la forza generale, detto all\'utente; GIORNI_PER_SEDUTE di regia/genera.js arriva a 6 sedute',
    regole: ['FRZ-02']
  },
  /* FRZ-05: l'onda giornaliera (pesante, media, leggera) sulla stessa alzata nella settimana. Il numero di serie e ripetizioni è la parte «Convenzione»; tutte le ripetizioni restano
     a 6 o meno (ACSM 2009 e 2026: forza 1-6 ripetizioni sopra l'80% del massimale; la leggera cambia la fatica, non la fascia). La pesante è un T1 di GZCL (85-100% del massimale,
     10-15 ripetizioni totali in serie da 1-3: qui 4x3 = 12), la media un T2 con meno serie (5-8 ripetizioni per serie: qui 3x5), la leggera il giorno scarico del Texas Method (qui 2x5).
     Il totale per alzata sta tra le due note: circa 6-12 serie a settimana per l'intermedio (ricerca-forza 1.6, Moderata da verificare) e 3-6 serie dirette + accessori
     (ricerca-obiettivi 3.1, Mod †): squat 6, panca 7-9, stacco 3 + 2 di variante */
  onda: {
    v: { pesante: { serie: 4, ripetizioni: 3 }, media: { serie: 3, ripetizioni: 5 }, leggera: { serie: 2, ripetizioni: 5 } },
    forza: 'Convenzione', fonte: 'docs/ricerca-metodi-coach-pratici.md 2.7 (5/3/1: onda 5/3/1 di 4 settimane), 2.8 (GZCL: T1 1-3 ripetizioni per serie, T2 5-8), 2.10 (Candito); docs/ricerca-forza-progressione.md 1.6 (volume per la forza: 6-12 serie a settimana per alzata) e 3.8 (intermedio: alternanza pesante, media, leggera); docs/ricerca-obiettivi-e-programmi.md 3.1 (principali 1-6 ripetizioni, 3-6 serie dirette per fondamentale)',
    regole: ['FRZ-05']
  },
  /* FRZ-05: la scelta stessa dell'onda. Le fonti non concordano: meta-analisi 2022 e Williams 2017 la vedono meglio nei già allenati, Harries 2015 e una meta-analisi 2026 (29 studi)
     non vedono differenze, e sulla massa nessuno ne vede (ricerca-forza 2C). Il coach la adotta perché costa poco rischio e perché 5/3/1 e il PHUL già la usano; non la promette migliore */
  ondaGiornaliera: {
    v: true,
    forza: 'Contrastata', fonte: 'docs/ricerca-forza-progressione.md 2C (lineare o ondulato: A meta-analisi 2022 e Williams 2017, B Harries 2015 e meta-analisi 2026 con 29 studi) e 3.8',
    regole: ['FRZ-05']
  },
  /* FRZ-05: chi comincia non ha onda: stessa prescrizione in tutte le sedute (nella tabella della nota 3.8: «stessi carichi in tutte le sedute») */
  ondaPrincipiante: {
    v: 'media',
    forza: 'Convenzione', fonte: 'docs/ricerca-forza-progressione.md 3.8 (principiante: full body 2-3 volte, stessi carichi in tutte le sedute)',
    regole: ['FRZ-05']
  },
  /* FRZ-05: la pausa dell'onda sta dentro la fascia della classe dell'esercizio (registro B8, regia di volume/tempo.js: classe A, forza 180-240 s con 210 prescritti): la pesante prende
     la più lunga ammessa, la media quella prescritta, la leggera la più corta ammessa (RX-02 del collaudo: 120-300 s sui pesanti per la forza). 3-5 minuti sulle alzate principali:
     ricerca-forza 1.6 (Moderata), ricerca-obiettivi 3.1 (Mod †) */
  pausaDaClasse: {
    v: { pesante: 'max', media: 'v', leggera: 'lo' },
    forza: 'Convenzione', fonte: 'registro coach v2 B8 (pause per classe, soglie-tempo.js); docs/ricerca-forza-progressione.md 1.6 (riposo per la forza 2-5 minuti: Moderata, già in repo); la scelta di quale estremo della fascia per quale giorno è del coach',
    regole: ['FRZ-05']
  },
  /* FRZ-02: lo stacco da terra (e le sue varianti da terra) al massimo 3 serie, come il tetto di ABB-09 in strFinale (rapporto stimolo/fatica) */
  serieMaxStacco: {
    v: 3,
    forza: 'Convenzione', fonte: 'ABB-09 (struttura-pro.js strFinale: stacchi da terra a 3 serie al massimo); docs/ricerca-struttura-e-intensita.md (rapporto stimolo/fatica dello stacco)',
    regole: ['FRZ-02', 'FRZ-05']
  },
  /* FRZ-05: sotto questo numero di serie un'alzata non scende nemmeno per far stare la seduta nei minuti: se non ci sta, l'alzata meno importante esce dalla seduta */
  serieMinimeAlzata: {
    v: 2,
    forza: 'Solida', fonte: 'Krieger 2010, Ralston 2017 (2-3 serie battono 1: la stessa soglia di RX-03 del collaudo)',
    regole: ['FRZ-05']
  },
  /* FRZ-02: per far stare le alzate nei minuti si stima la pausa a questo valore: il taglio per il tempo accorcia le pause delle alzate fino alla fascia ammessa (collaudo RX-02:
     forza, esercizi pesanti 120-300 s; ACSM 2009: 2-3 minuti sui fondamentali), non oltre. Serve solo alla stima: la pausa scritta nella scheda e quella dell'onda */
  pausaMinimaStima: {
    v: 120,
    forza: 'Moderata', fonte: 'ACSM 2009 (2-3 minuti sui fondamentali per la forza), docs/ricerca-forza-progressione.md 1.6 (riposo per la forza: 2-5 minuti); collaudo RX-02 (forza, pesanti: 120-300 s)',
    regole: ['FRZ-02']
  },
  /* FRZ-02: una tirata per seduta (la prima della ricetta) ha almeno queste serie e il taglio per il tempo non la toglie: le alzate sono fisse e le spinte della modalità (la panca due o tre volte)
     non scendono, quindi le tirate tengono il rapporto con le spinte (ABB-04: tirate almeno il 90% delle spinte; collaudo EQ-01, Convenzione) */
  serieMinimeTirata: {
    v: 3,
    forza: 'Convenzione', fonte: 'ABB-04 (tirate non meno del 90% delle spinte, STR_PESI.tirateSuSpinte); docs/ricerca-struttura-e-intensita.md (equilibrio spalle: pratica dei coach)',
    regole: ['FRZ-02']
  },
  /* FRZ-02 (EQ-01, P3-C): serie di una tirata alta (face pull, reverse pec deck) aggiunta quando le tirate della settimana restano sotto il 90% delle spinte: come strCopri per i deltoidi posteriori */
  serieTirataAlta: {
    v: 2,
    forza: 'Convenzione', fonte: 'ABB-03 (strCopri: deltoidi posteriori, 2 serie da 15) e ABB-04 (tirate non meno del 90% delle spinte, STR_PESI.tirateSuSpinte); docs/ricerca-struttura-e-intensita.md (equilibrio spalle: pratica dei coach)',
    regole: ['FRZ-02']
  },
  /* FRZ-04: serie di un accessorio per il punto debole (tricipiti, dorsali, glutei...). Le ripetizioni e la pausa le dà la prescrizione di sempre per quel tipo di esercizio */
  serieAccessorio: {
    v: 3,
    forza: 'Convenzione', fonte: 'docs/ricerca-obiettivi-e-programmi.md 3.1 (forza: 3-6 serie dirette per fondamentale a settimana + accessori 6-12, Mod †); docs/ricerca-forza-progressione.md 1.6 (punti deboli e accessori: nessuna prova diretta)',
    regole: ['FRZ-04']
  },
  /* FRZ-03 e FRZ-04: quanti punti deboli il coach ascolta (uno per alzata al massimo, due in tutto: ogni punto debole toglie tempo al resto della seduta) */
  puntiDeboliMax: {
    v: 2,
    forza: 'Convenzione', fonte: 'W2-T7: ogni accessorio toglie tempo e recupero; stessa idea di EST-02 (al massimo 2 unità prioritarie)',
    regole: ['FRZ-03', 'FRZ-04']
  }
};
