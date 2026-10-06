/* Soglie della progressione dei carichi (ALG-02, ALG-05, ALG-06, AUT-01, CAS-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLA BILANCIA ESSENZIALE (coach v2, P3-A: una parte di W3-T1; registro B3, B17 del piano, D-P5)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   Si leggono solo durante l esecuzione (sogliaProgressione, in carichi/attrezzi.js), mai al caricamento.
   «Moderata» = limiti di affidabilita del RIR con studi (Halperin 2022, Remmert 2023: nella nota forza §3.3);
   «Decisione» = scelta del registro (B3: al massimo due punti di RPE per volta);
   «Convenzione» = numeri di pratica, senza una prova diretta (la nota algoritmi li chiama cosi: §3.14).
   ============================================================ */
const SOGLIE_PROGRESSIONE = {
  /* ALG-06: la griglia di base dei pesi che si caricano davvero. E la griglia di PAR-04, la stessa della partenza (arrotondaPartenza e passoCarico in partenza.js
     la applicano da sempre; arrotondaAttrezzo la riusa e passoAttrezzo legge questi passi: tests/bilancia-v2.test.js controlla che coincidano). Manubri e corpo libero
     zavorrato: 1 kg sotto i 10 kg, 2 kg da 10 kg; macchine e cavi: il passo della pila; bilanciere: 2,5 kg in tutto (1,25 kg per lato), mai sotto la barra.
     Non e la griglia della TUA palestra (manubri da 2,5 kg, pile da 5 kg, microdischi): le impostazioni «Pesi della tua palestra» sono rimandate */
  grigliaBase: {
    v: { manubri: { passoSotto: 1, passoSopra: 2, soglia: 10 }, pila: 2.5, bilanciere: { passo: 2.5, perLato: 1.25, barra: 20 } },
    forza: 'Convenzione', fonte: 'PAR-04 (js/coach/carichi/partenza.js); ricerca-algoritmi-carichi-e-app §3.5 (passo minimo reale per attrezzo, tabella) e §6 U7 (B17: 0,5 kg per tutti)', regole: ['ALG-06', 'PAR-04']
  },
  /* ALG-06: nello scarico la dose di carico non sempre si carica (12 kg di manubri x 0,9 = 10,8: il peso vero e 10 o 12); se il peso vero si allontana dalla dose piu di
     tanto, il motivo dice il peso che si carica (frazione del carico voluto) */
  scostamentoNota: {
    v: 0.03,
    forza: 'Convenzione', fonte: 'P3-A: un passo di griglia vale il 2-3% del carico ai pesi tipici del bilanciere (ricerca-algoritmi §3.5); sotto questa soglia la differenza non si dice', regole: ['ALG-06']
  },
  /* AUT-01: un RPE segnato conta per il carico solo se dice da 0 a 4 ripetizioni in riserva (oltre la stima sbaglia di piu) e su serie da 12 ripetizioni o meno */
  rirAffidabile: {
    v: [0, 4],
    forza: 'Moderata', fonte: 'registro coach v2 B3; ricerca-forza-progressione §3.3 punto 1 (Remmert 2023, Halperin 2022)', regole: ['AUT-01']
  },
  ripetizioniMaxRpe: {
    v: 12,
    forza: 'Moderata', fonte: 'registro coach v2 B3; ricerca-forza-progressione §3.3 punto 1 e §3.5 (Halperin 2022: oltre 12 ripetizioni la stima non e affidabile)', regole: ['AUT-01']
  },
  /* AUT-01: al massimo due punti di RPE per volta (circa 6% di carico): con un errore di stima di circa una ripetizione (circa 3%) un salto piu grande insegue il rumore */
  puntiRpeMax: {
    v: 2,
    forza: 'Decisione', fonte: 'registro coach v2 B3 («al massimo 2 punti, circa 6%, per volta»); ricerca-forza-progressione §3.3 punto 4; ricerca-algoritmi-carichi-e-app §2 D', regole: ['AUT-01']
  },
  /* ALG-05 (fase 'carico' 20): si ricalcola dal massimale quando le ripetizioni efficaci (bersaglio + ripetizioni in riserva) cambiano di almeno tanto dalla seduta prima */
  cambioRipetizioniEfficaci: {
    v: 2,
    forza: 'Convenzione', fonte: 'piano coach v2 W3-T1 (fase 20) e ricerca-algoritmi-carichi-e-app §3.6 punto 1 e §7 ALG-05', regole: ['ALG-05']
  },
  /* ALG-05: tetti del ricalcolo rispetto al carico di lavoro di prima (+10% al massimo, -30% al massimo) */
  tettiRicalcolo: {
    v: { su: 0.10, giu: 0.30 },
    forza: 'Convenzione', fonte: 'ricerca-algoritmi-carichi-e-app §3.3 (tetto) e §3.14 (tettoCambioBersaglioPct +10 / -30)', regole: ['ALG-05']
  },
  /* ALG-05: oltre 12 ripetizioni di bersaglio le formule divergono: non si converte, si parte dall ultimo carico meno almeno tanto (e la calibrazione fa il resto) */
  ripetizioniMaxConversione: {
    v: 12,
    forza: 'Convenzione', fonte: 'ricerca-algoritmi-carichi-e-app §3.4 (sopra 12 ripetizioni Epley e Brzycki divergono: «non si converte, meno 10-15%»)', regole: ['ALG-05']
  },
  riduzioneOltreConversione: {
    v: 0.10,
    forza: 'Convenzione', fonte: 'ricerca-algoritmi-carichi-e-app §3.4 e §3.8 («meno 10-15%»: il valore piu piccolo, perche il carico e gia il piu basso tra questo e la conversione)', regole: ['ALG-05']
  },
  /* ALG-05: massimale «recente» = sedute di lavoro entro tanti giorni (non di scarico); senza un RPE segnato il ricalcolo lascia una ripetizione in riserva in piu */
  giorniMassimaleRecente: {
    v: 42,
    forza: 'Convenzione', fonte: 'ricerca-algoritmi-carichi-e-app §3.2 (e1rmRif: media dei due migliori delle ultime 3 sedute di lavoro, entro 42 giorni)', regole: ['ALG-05']
  },
  rirInPiuSenzaRpe: {
    v: 1,
    forza: 'Convenzione', fonte: 'ricerca-algoritmi-carichi-e-app §7 ALG-05 («con RIR assunto: prima volta con RIR +1»)', regole: ['ALG-05']
  },
  /* CAS-01b: al manubrio piu pesante dichiarato si sale con le ripetizioni fino al bersaglio + tante; poi il coach lo dice (serve un manubrio piu pesante o una variante) */
  cimaRipetizioniTetto: {
    v: 4,
    forza: 'Convenzione', fonte: 'ricerca-forza-progressione §3.1 (passo troppo grosso: cima del range = bersaglio + 4 con passi oltre l 8%) e §3.4', regole: ['CAS-01']
  }
};
