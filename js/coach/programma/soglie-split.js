/* Soglie della divisione e dei giorni della settimana (PRG-02, OBI-01, CAS-10, ETA-05)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DI SPLIT, GIORNI E AGENDA (coach v2, W2-T5; ricerca-ipertrofia-programmazione §3.7, ricerca-principianti-12-settimane §3.3,
   ricerca-fasce-di-eta §5 punto 4; collaudo REC-01 e REC-03)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   Le soglie si leggono solo durante l’esecuzione (sogliaSplit, in regia/genera.js), mai al caricamento. Senza questo file il generatore
   tiene i giorni di sempre (lunedì-martedì-giovedì-venerdì...): la ricerca dei giorni senza conflitti non parte.
   ============================================================ */
const SOGLIE_SPLIT = {
  /* ---- PRG-02: i giorni della settimana ---- */
  /* al massimo 4 giorni di allenamento di fila (la settimana è un anello: domenica e lunedì sono consecutivi); con 6 sedute i giorni di fila sono 6 e non c’è scelta, e la nota lo dice */
  giorniDiFilaMax: {
    v: 4,
    forza: 'Convenzione', fonte: 'ricerca-ipertrofia-programmazione §3.7 (5 giorni: due giorni di riposo, mai oltre 4 di fila); pratica dei coach; collaudo REC-03 (GIORNI_CONSECUTIVI_MAX)', regole: ['PRG-02']
  },
  /* i grandi muscoli che ogni tipo di seduta lavora a fondo (i sei di REC-01: petto, schiena, quadricipiti, femorali, glutei e spalle, con i deltoidi anteriori e laterali delle spinte e i posteriori delle
     tirate): due sedute in giorni consecutivi non devono averne uno in comune. Vengono dalle ricette dei tipi (RICETTE, programma/ricette.js): la seduta di tirata ha anche il fondamentale d anca (stacco
     rumeno: femorali e glutei), quella dei punti deboli le priorita dichiarate (puntiDeboli) piu le spalle (l elenco di sempre ha alzate laterali e posteriori); un tipo che non c e qui porta tutti i grandi muscoli */
  gruppiDelleSedute: {
    v: { fullbody: ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei', 'spalle'], upper: ['petto', 'schiena', 'spalle'], lower: ['quadricipiti', 'femorali', 'glutei'], legs: ['quadricipiti', 'femorali', 'glutei'],
      push: ['petto', 'spalle'], pull: ['schiena', 'spalle', 'femorali', 'glutei'], 'petto-schiena': ['petto', 'schiena', 'femorali', 'glutei'], 'spalle-braccia': ['spalle'] },
    forza: 'Moderata', fonte: 'ACSM 2009 (48 ore tra due sedute dello stesso gruppo; Moderata per la regola, Convenzione per la soglia di serie); collaudo REC-01 (sei gruppi)', regole: ['PRG-02']
  },
  puntiDeboli: {
    v: { petto: ['petto'], schiena: ['schiena'], spalle: ['spalle'], gambe: ['quadricipiti', 'femorali'], glutei: ['glutei'], sempre: ['spalle'] },
    forza: 'Convenzione', fonte: 'ricettaPunti (ui/onboarding.js): le priorita dichiarate, poi alzate laterali e posteriori, braccia, polpacci e core', regole: ['PRG-02']
  },
  /* chi comincia con 5 o 6 giorni ha 4 sedute: gli altri giorni sono riposo o una camminata (la nota lo dice all’utente, e il passo dei giorni nell’onboarding anche) */
  principianteSedute: {
    v: { giorniDa: 5, sedute: 4 },
    forza: 'Convenzione', fonte: 'ricerca-principianti-12-settimane §3.3 (5-6 giorni diventano 4, detto all’utente; 2-3 sedute già bastano a chi inizia)', regole: ['PRG-02']
  },
  /* ---- ETA-05: il sonno dei minori nell’onboarding ---- */
  /* «Bene» vuol dire 7 ore o più per un adulto e 8 ore o più per un minorenne (13-17 anni): è la risposta migliore, le altre due restano più prudenti */
  oreSonnoBene: {
    v: { adulto: 7, minorenne: 8 },
    forza: 'Moderata', fonte: 'ricerca-fasce-di-eta §5 punto 4 (adolescenti: 8-10 ore; sotto le 8 ore più infortuni e meno recupero)', regole: ['ETA-05']
  },
  /* ---- CAS-01: i campi degli attrezzi dichiarati ---- */
  /* il manubrio più pesante che si può scrivere (kg a mano): un limite del campo per evitare valori assurdi, non una soglia di coaching */
  manubriKg: {
    v: { min: 1, max: 100 },
    forza: 'Convenzione', fonte: 'limite del campo (ricerca-casa-poco-tempo §4.3: si chiede il manubrio più pesante a mano, in kg)', regole: ['CAS-01']
  }
};
