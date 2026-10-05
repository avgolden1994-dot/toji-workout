/* Soglie delle tecniche di intensità: budget, posizione nel blocco, volume e limiti (MAV-01..09, MAV-13, ETA-02)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLE TECNICHE (coach v2, W2-T3; docs/ricerca-metodi-avanzati-intensita.md 3.3, 4.1, 4.2)
   Ogni numero del cancello delle tecniche (sicurezza/tecnica-adatta.js) vive qui, con forza e fonte. Sono quasi tutti Convenzione
   (registro C.4, riga «Tecniche»): prudenza della pratica dei coach, non risultati di studi. La parte che e Solida e un'altra:
   drop set, rest-pause, myo-reps e cluster NON fanno crescere di piu delle serie normali a parita di volume, fanno risparmiare tempo
   o fatica (meta-analisi 2022-2026): per questo il testo delle tecniche dice «risparmia tempo», non «fa crescere di piu» (MAV-16).
   Le soglie si leggono solo durante l'esecuzione, mai al caricamento.
   ============================================================ */
const SOGLIE_TECNICHE = {
  /* MAV-08 e RIC-04: quante tecniche intense (verso il cedimento: drop set, rest-pause, myo-reps, AMRAP, parziali, calibrazione) in una seduta e in una settimana.
     Il principiante, il minorenne, l'over 65 e chi e in modalita prudente non ne hanno (0): solo le tecniche leggere (tempo, superserie, cluster, potenza) */
  budgetSedutaIntermedio: { v: 1, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (intermedio: 1 per seduta, come RIC-04)', regole: ['MAV-08', 'RIC-04'] },
  budgetSettimanaIntermedio: { v: 2, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (intermedio: al massimo 2 a settimana)', regole: ['MAV-08'] },
  budgetSedutaAvanzato: { v: 2, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (avanzato: 2 per seduta, su esercizi e muscoli diversi)', regole: ['MAV-08'] },
  budgetSettimanaAvanzato: { v: 6, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (avanzato: al massimo 6 a settimana)', regole: ['MAV-08'] },
  budgetSettimanaSpecializzazione: { v: 8, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (blocco di specializzazione: al massimo 8 a settimana)', regole: ['MAV-08', 'MAV-15'] },
  /* MAV-08: posizione nel blocco (4.2). La prima settimana del blocco e lo scarico non hanno tecniche intense (si stima ancora il carico: INT-04/05);
     nelle settimane di mezzo solo le parziali in allungamento (avanzato; nel blocco lungo anche l'intermedio); il tetto del livello nelle ultime settimane di carico
     (1 nel blocco di 4 settimane, 2 in quello di 6) */
  settimaneSenzaTecnicheInizio: { v: 1, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.2 (settimana 1 del blocco: nessuna tecnica intensa)', regole: ['MAV-08'] },
  settimaneTettoBloccoCorto: { v: 1, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 4 settimane: il tetto solo nell ultima di carico)', regole: ['MAV-08'] },
  settimaneTettoBloccoLungo: { v: 2, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 6 settimane: il tetto nelle settimane 4-5)', regole: ['MAV-08'] },
  bloccoLungoDa: { v: 5, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 6 settimane = 5 di carico e lo scarico)', regole: ['MAV-08'] },
  /* MAV-09: quanto vale una tecnica nel conteggio delle serie (il tetto di serie per muscolo in una seduta, COACH_PARAMETRI.serieMaxMuscoloSeduta): un drop set a piu
     cadute vale 2-3 serie, rest-pause e myo-reps (attivazione + mini-serie) 3. Il tempo che costano e di CAS-05 (volume/tempo.js) */
  serieEquivalenti: { v: { drop: 2, riposopausa: 3, myo: 3 }, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 («un drop set a piu cadute vale 2-3 serie» [V]; myo-reps: attivazione e 3-4 mini-serie)', regole: ['MAV-09'] },
  /* MAV-01: poco tempo = 45 minuti o meno (3.3 e 4.1); il cluster allunga la seduta e le parziali non servono a risparmiarla */
  pocoTempoMinuti: { v: 45, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 3.3 e 4.1 (poco tempo: 45 minuti o meno)', regole: ['MAV-01', 'MAV-13'] },
  /* MAV-03 ed ETA-10: dai 50 ai 64 anni le tecniche verso il cedimento solo sugli isolamenti (classi D ed E: macchine, cavi, manubri), mai sui multiarticolari liberi */
  etaMezzaEta: { v: 50, forza: 'Convenzione', fonte: 'ricerca-fasce-di-eta.md 3.2 (50-64: drop e forzate solo su macchine, mai sui pesanti liberi)', regole: ['MAV-03', 'ETA-10'] },
  /* MAV-07: le parziali in allungamento sono 3-6 ripetizioni nella meta allungata, dopo il cedimento; una serie per esercizio, al massimo due esercizi per muscolo a settimana */
  parzialiRipetizioni: { v: [3, 6], forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.3 (parziali in allungamento: 3-6 ripetizioni nella meta allungata)', regole: ['MAV-07'] },
  parzialiPerMuscoloSettimana: { v: 2, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.3 (al massimo 2 esercizi per muscolo a settimana)', regole: ['MAV-07'] },
  /* MAV-08: una stessa tecnica sullo stesso esercizio al massimo una volta a settimana; si alternano tecniche diverse per non assuefarsi */
  stessaTecnicaStessoEsercizioSettimana: { v: 1, forza: 'Convenzione', fonte: 'ricerca-metodi-avanzati-intensita.md 4.1 (una stessa tecnica sullo stesso esercizio al massimo una volta a settimana)', regole: ['MAV-08'] },
  /* MAV-11: la discesa controllata, 2-3 secondi (niente tempi di 6-10 secondi: la crescita e simile tra 0,5 e 8 secondi) */
  discesaSecondi: { v: [2, 3], forza: 'Moderata', fonte: 'ricerca-metodi-avanzati-intensita.md 1.4 e 4.3 (Schoenfeld 2015: da 0,5 a 8 s per ripetizione la crescita e simile; discesa 2-3 s)', regole: ['MAV-11'] }
};
