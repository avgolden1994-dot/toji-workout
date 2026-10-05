/* Soglie del carico di partenza e della calibrazione rapida (PAR-06..09, CAR-18..19)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLA PARTENZA BASSA E DELLA CALIBRAZIONE (coach v2, W2-T8; piano capitolo D; registro B1, B22, D-P1, D-P12, D-P13, D-P16)
   Una voce per numero: nome: { v, forza, fonte, regole } (convenzione di W1-T1, js/coach/regia/soglie-regia.js).
   «Decisione» = chi parte basso e a chi si applica la calibrazione (scelta di prodotto dell utente, 2026-10-05);
   «Convenzione» = i numeri (calcoli [D] su àncore di terzi, ±25%: nessuno studio dice quanto partire bassi);
   «Provvisoria» = il peso di riferimento di una donna che non lo ha detto (estensione di W2-T8, da verificare).
   Le soglie si leggono solo durante l esecuzione (sogliaPartenza, in carichi/partenza.js), mai al caricamento.
   I numeri di PAR-01..04 (PARAM_PARTENZA: riferimenti di massa, livello, età, prudenza, limiti) restano nella loro tabella: gli uomini
   partono come prima (D-P1) e il golden dei carichi lo prova.
   ============================================================ */
const SOGLIE_PARTENZA = {
  /* PAR-06: chi parte basso. Le donne fino al livello intermedio; gli uomini e le avanzate no; livello mancante = principiante (D-P12) */
  chiParteBasso: {
    v: { sesso: 'donna', livelli: ['principiante', 'intermedio'] },
    forza: 'Decisione', fonte: 'decisione dell’utente 2026-10-05 («carichi di partenza bassi per le donne fino al livello intermedio»); registro coach v2 D-P1, B1', regole: ['PAR-06']
  },
  /* PAR-06: il fattore si applica dopo il limite del fattore dal corpo (0,45-1,8), per distretto (alto = tutto tranne gambe e glutei) e tipo
     (multiarticolare o isolamento); la salita rapida lo restituisce (CAR-18). Core, tempi e corpo libero a zero kg non hanno fattore (PAR-09) */
  fattoreDonne: {
    v: { principiante: { alto: 0.60, basso: 0.65, iso: 0.75 }, intermedio: { alto: 0.85, basso: 0.85, iso: 0.85 } },
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.2-3.3 (calcolo [D] sulle àncore «non allenata» di Symmetric Strength, una fonte di terzi, ±25%); registro coach v2 B1; piano D.3', regole: ['PAR-06']
  },
  /* PAR-01/PAR-06: per le donne con il fattore attivo la BIA (massa muscolare o magra) sposta la stima al massimo di tanto rispetto a quella dal solo peso */
  biaEntro: {
    v: 0.15,
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §2 G e §3.4 (DON-01: la BIA di consumo è rumorosa, la calibrazione prende presto il comando); piano D.2', regole: ['PAR-01', 'PAR-06']
  },
  /* PAR-06: una donna che non ha detto il peso non parte dal valore della libreria (pensato per un uomo di 75 kg): peso di riferimento in kg */
  pesoDonnaSenzaDati: {
    v: 59,
    forza: 'Provvisoria', fonte: 'ricerca-donne-carichi-iniziali §1.3 (àncora «non allenata»: donna di 130 lb = 59 kg); estensione di W2-T8 per chi salta il peso e la BIA: da verificare', regole: ['PAR-06']
  },
  /* PAR-07: il rapporto dallo storico conta solo con gli esercizi la cui calibrazione è chiusa o con RPE medio almeno questo, e ha due mediane (alto, basso) se ci sono
     abbastanza esercizi per lato; il peso dello storico cresce con il numero di esercizi (PARAM_PARTENZA.storicoAPieno) e lo sconto della partenza bassa sparisce con lui */
  storicoRpeMinimo: {
    v: 7,
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.6 e §5 (DON-05: con molta riserva il massimale dalle ripetizioni sottostima)', regole: ['PAR-07']
  },
  storicoEserciziPerLato: {
    v: 2,
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §6 (DON-05: due mediane se ci sono almeno 2 esercizi per lato)', regole: ['PAR-07']
  },
  /* PAR-08: la barra e il suo limite. Sotto la soglia (frazione della barra) il bilanciere non si propone: variante dello stesso muscolo con manubri o macchina */
  barraKg: {
    v: 20,
    forza: 'Convenzione', fonte: 'PAR-04 (barra olimpica da 20 kg); ricerca-donne-carichi-iniziali §3.7', regole: ['PAR-04', 'PAR-08']
  },
  sottoBarra: {
    v: 0.9,
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.7 (DON-03: sotto 0,9 × la barra); piano D.4', regole: ['PAR-08']
  },
  penalitaBilanciere: {
    v: -3,
    forza: 'Convenzione', fonte: 'piano D.4 (PAR-08 a: penalità nella scelta, non esclusione)', regole: ['PAR-08']
  },
  /* PAR-08 b: se il bilanciere resta (obiettivo o modalità forza, metodo famoso, esercizio gradito) si parte dalla barra vuota con poche ripetizioni e una serie in meno */
  barraVuota: {
    v: { ripetizioni: [6, 8], serieInMeno: 1 },
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.7 punto 3 (DON-03); piano D.4', regole: ['PAR-08']
  },
  /* PAR-09: le principianti partono dalla variante facilitata di piegamenti e trazioni; si passa alla completa con queste ripetizioni pulite */
  corpoLiberoPulite: {
    v: [10, 15],
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §1.8 (progressioni dei piegamenti e delle trazioni: salto con 3 serie da 10-15 ripetizioni pulite)', regole: ['PAR-09']
  },
  /* CAR-18: a chi si applica la calibrazione rapida (tutti i principianti, uomini compresi, e le donne intermedie con il fattore attivo) */
  calibrazioneChi: {
    v: { livelli: ['principiante'], donneConFattore: true },
    forza: 'Decisione', fonte: 'registro coach v2 D-P1 e B22 (la calibrazione vale per tutti i principianti; il fattore basso solo per le donne fino all’intermedio); piano D.1', regole: ['CAR-18']
  },
  /* CAR-18: prime esposizioni contate dallo storico; alla quarta la calibrazione si chiude comunque */
  calibrazioneEsposizioni: {
    v: 4,
    forza: 'Convenzione', fonte: 'piano D.5; ricerca-donne-carichi-iniziali §3.6 (prime 3-4 esposizioni)', regole: ['CAR-18']
  },
  /* CAR-18: RPE a cui il carico è giusto (stop al primo RPE da questo in su, ricerca-donne §3.6) e tolleranza: dentro ±tolleranza la calibrazione si chiude.
     Lo scarto (bersaglio meno RPE segnato) sceglie la riga della tabella; la scala dell app parte da 6 (6 = facile, quattro o più ripetizioni di riserva) */
  calibrazioneBersaglioRpe: {
    v: 8,
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.6 (stop al primo RPE ≥ 8); registro B1', regole: ['CAR-18']
  },
  calibrazioneTolleranzaRpe: {
    v: 0.5,
    forza: 'Convenzione', fonte: 'piano D.5 (entro ±0,5 di RPE si chiude)', regole: ['CAR-18']
  },
  /* CAR-18: salti di carico per scarto di RPE (≥ 3, 2, 1 punti sotto il bersaglio). `bassa`: alto, basso, isolamento per le donne con il fattore attivo;
     `normale`: partenza normale (principianti uomini, D-P1). Un salto vale almeno un passo dell attrezzo, arrotondato per difetto */
  calibrazioneSalti: {
    v: {
      bassa: { 3: { alto: 0.20, basso: 0.25, iso: 0.20 }, 2: { alto: 0.15, basso: 0.20, iso: 0.15 }, 1: { alto: 0.10, basso: 0.10, iso: 0.10 } },
      normale: { 3: 0.10, 2: 0.075, 1: 0.05 }
    },
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.6 (tabella dei salti per RPE, scelta di prodotto); registro B1 (per scarto di RPE, non dal massimale); piano D.5', regole: ['CAR-18']
  },
  /* CAR-18: senza RPE segnato, a serie complete: salto (per colonna e distretto) e quante volte al massimo */
  calibrazioneSenzaRpe: {
    v: { bassa: { alto: 0.10, basso: 0.15, iso: 0.10 }, normale: 0.05, volteMax: 2 },
    forza: 'Convenzione', fonte: 'ricerca-donne-carichi-iniziali §3.6 (senza RPE +10/15/10%); piano D.5 (al massimo 2 volte)', regole: ['CAR-18', 'CAR-19']
  },
  /* CAR-18: nessun salto oltre questa quota in una volta */
  calibrazioneTettoSalto: {
    v: 0.25,
    forza: 'Convenzione', fonte: 'piano D.5 (mai oltre +25%); ricerca-donne-carichi-iniziali §3.6', regole: ['CAR-18']
  },
  /* CAR-18: salvaguardia, i salti si dimezzano con PAR-Q positivo, sonno scarso o da 65 anni */
  calibrazioneCauto: {
    v: 0.5,
    forza: 'Convenzione', fonte: 'piano D.5 (salvaguardie); skill implementa-regola-coach §6 (gli aumenti si dimezzano per i prudenti)', regole: ['CAR-18']
  }
};
