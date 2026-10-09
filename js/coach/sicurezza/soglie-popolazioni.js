/* Soglie delle popolazioni e del rientro dopo una pausa: base degli over 65, gravidanza, catena unica del rientro (ETA-08 a, REC-12 a, CST-01, CST-02, CAR-04, ALG-14)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SOGLIE DELLE POPOLAZIONI E DEL RIENTRO (coach v2, W4-T2 = pacchetto P4-S snello; registro B10, B20, C.2, C.4;
   ricerca-fasce-di-eta §3.1-3.3, ricerca-recupero-infortuni-popolazioni §4 e §5.3, ricerca-mesocicli-periodizzazione-scarichi §3.12.3 (MES-15),
   ricerca-psicologia-aderenza CST-01 e CST-02, ricerca-algoritmi-carichi-e-app ALG-14)
   Tutto è «Convenzione» (registro C.4): nessun numero di questa tabella viene da uno studio che lo misura; la base dei rientri è [V] solo per la
   direzione (lo stop di 2-4 settimane, il recupero rapido: PMID 28328712, 32017951; l’effetto maggiore sopra i 65 anni: PMID 23347054).
   Le regole bloccate del registro C.2 (ETA-08 parte b, ETA-11..13, ETA-17, REC-06 parte b, REC-12 parte b) NON hanno soglie qui: non sono implementate.
   Una voce per numero: nome: { v, forza, fonte, regole }. Le soglie si leggono solo durante l’esecuzione, mai al caricamento.
   ============================================================ */
const SOGLIE_POPOLAZIONI = {
  /* B10: dai 65 anni le prime 8 settimane del programma sono la «base» (RIR 3-4, 8-12 ripetizioni, aumenti dimezzati); dai 75 la base non finisce mai
     (finché ETA-17 resta bloccata). Il «dopo la base» che alza lo stimolo (ETA-08 parte a: RIR 2-3 su macchine e cavi) NON c’è: escluso per scelta del proprietario */
  over65: {
    v: { eta: 65, settimaneBase: 8, etaSempreBase: 75 },
    forza: 'Convenzione', fonte: 'registro coach v2 B10 (base di 8 settimane, «il bordo prudente di ETA-08»; dai 75 anni la base resta finché ETA-17 non è verificata); ricerca-fasce-di-eta §3.2', regole: ['ETA-08']
  },
  /* B10: il pavimento delle ripetizioni in riserva degli over 65: nella base 3 su tutto; dopo la base 3 sui pesi liberi (classi A, B, E) e sul core (F), 2 al massimo
     su macchine e cavi (classi C e D). Il coach non porta mai nessuno sotto questi numeri; oggi gli over 65 restano comunque a 3-4 (rirBersaglioPerLivello) */
  rirOver65: {
    v: { base: 3, liberi: 3, macchine: 2 },
    forza: 'Convenzione', fonte: 'registro coach v2 B10 (RIR 3-4 nella base; dopo, RIR 2-3 solo sulle classi C e D; la parte b di ETA-08 è bloccata); ricerca-recupero-infortuni-popolazioni §5.2 (prudenti e over 65 RIR ≥ 3-4)', regole: ['ETA-08']
  },
  /* B10: dai 65 anni 8-12 ripetizioni: nessuna fase dei carichi porta sotto `minimo` (lo schema 5×3 del secondo stallo, CAR-07, è per i principianti con la forza:
     a un over 65 tocca invece il calo `caloStallo` dei principianti con gli altri obiettivi, «-5% e si ricostruisce») */
  ripetizioniMinOver65: {
    v: { minimo: 8, caloStallo: 0.95 },
    forza: 'Convenzione', fonte: 'registro coach v2 B10 («8-12 ripetizioni» nella base e dopo; la parte b di ETA-08 è bloccata; Borde [V] per i carichi moderati); CAR-07 / PCO-01, riga del principiante (-5% al secondo stallo)', regole: ['ETA-08', 'CAR-07']
  },
  /* REC-12 parte a: in gravidanza o dopo un parto recente il coach non scende mai sotto 3 ripetizioni in riserva (la modalità prudente le tiene a 3-4) */
  rirGravidanza: {
    v: 3,
    forza: 'Convenzione', fonte: 'registro coach v2 C.3 (REC-12 a: guardia che toglie, modalità prudente); ricerca-recupero-infortuni-popolazioni §4 e §5.2 («RIR ≥ 3-4, nessun cedimento», ricordo da verificare: per questo solo come pavimento della modalità prudente, mai come prescrizione)', regole: ['REC-12']
  },
  /* ETA-19 (onda 5, aperto di onda-4 «Over 65: esercizi da favorire»; SAF-05 del collaudo sulla fascia senior: 113 programmi su 21.600, Stacco con Trap Bar 86, Military Press 35): dai 65 anni gli
     esercizi dell'elenco sono l'ULTIMA scelta di un posto della scheda: il generatore preferisce un altro candidato consentito, anche se già usato due volte nella settimana (RID-02 cede alla sicurezza);
     se non c'è nessun altro restano (la copertura del posto non si perde). Un elenco di nomi, non un divieto: niente ricerca li vieta; la tabella 65-74 e 75+ dice «evitare pesi sopra la testa pesanti»
     e «liberi sopra la testa», «favorire macchine guidate e appoggio», e il collaudo (TECNICI_PRUDENTE) li chiama «tecnicamente impegnativi» per la modalità prudente */
  over65Evitare: {
    v: { nomi: ['Military Press', 'Stacco da Terra (Deadlift)', 'Stacco Sumo', 'Stacco con Trap Bar', 'Good Morning', 'Front Squat', 'Nordic Curl', 'Ab Wheel', 'Tirate al Mento (Upright Row)', 'Pike Push-up'] },
    forza: 'Convenzione', fonte: 'ricerca-fasce-di-eta tabella 3.3 (65-74: «evitare pesi sopra la testa pesanti», 75+: «liberi sopra la testa», «favorire macchine guidate, appoggio»; Conv/[CM]); tools/collaudo-generatore.js SAF-05 (TECNICI_PRUDENTE, Convenzione); nessuno studio che misuri il rischio di questi esercizi dopo i 65 anni',
    regole: ['ETA-19']
  },
  /* B20 e MES-15 (CST-01): le soglie della pausa, in giorni veri dall’ultima seduta: fino a `nulla` niente; fino a `ferma` la rampa non avanza (si rifà la settimana
     dell’ultima seduta); fino a `blocco` si riparte dalla prima settimana del blocco; oltre, nuovo blocco (dalla prima settimana del blocco, con i carichi di CAR-04 più bassi) */
  pausa: {
    v: { nulla: 6, ferma: 13, blocco: 27 },
    forza: 'Convenzione', fonte: 'registro coach v2 B20 (≤ 6 giorni nulla; 7-13 la rampa non avanza; 14-27 si riparte dalla settimana 1 del blocco e il calendario scorre; ≥ 28 nuovo blocco); ricerca-mesocicli-periodizzazione-scarichi §3.12.3 (MES-15)', regole: ['CST-01']
  },
  /* CST-01, CST-02 (INT-4): una «pausa» è relativa alla frequenza del programma. Il giorno di una seduta saltata si tollera: i giorni senza sedute oltre i quali c'è una pausa sono
     (1 + sedute saltate tollerate) volte l'intervallo normale tra due sedute (7 diviso le sedute a settimana, per eccesso) meno 1, e mai meno di `pausa.nulla`. Con 1 seduta a settimana
     sono 13 (7 giorni tra due sedute sono normali, 14 sono una pausa vera), con 2 sono 7, con 3 o più restano 6. Dalla soglia `pausa.ferma` in su (14 giorni) non cambia niente */
  pausaPerFrequenza: {
    v: { seduteSaltate: 1, giorniSettimana: 7 },
    forza: 'Convenzione', fonte: 'decisione di INT-4 (collegamento tra B20/MES-15, soglie in giorni veri, e i programmi da 1-2 sedute a settimana: con le soglie di B20 un programma da 1 seduta a settimana non avanzava mai); registro B20', regole: ['CST-01', 'CST-02', 'CAR-04']
  },
  /* B20: oltre i 65 anni i giorni di una pausa vera (più di `pausa.nulla` giorni senza nessuna seduta) contano `fattore` volte, per i carichi (CAR-04) e per le serie (CST-02).
     Con il ritmo normale (2 sedute a settimana: 3-5 giorni tra una seduta e l’altra) restano i giorni veri, come per tutti: era il motivo della deroga del 2026-10-05 */
  giorniDoppiOver65: {
    v: { fattore: 2 },
    forza: 'Convenzione', fonte: 'registro coach v2 B20 («giorni doppi oltre i 65», obiettivo di W4-T2; la deroga datata 2026-10-05 finisce con la catena completa e le soglie di MES-15); ricerca-recupero-infortuni-popolazioni §4 e §5.3 (lo stop pesa di più sopra i 65 anni, PMID 23347054 [V])', regole: ['CAR-04', 'CST-02']
  },
  /* CST-02 (RIC-05): da `giorni` giorni di pausa (contati) le prime due sedute del rientro hanno meno serie: la prima -25% (RIC-05), la seconda -10%, poi il piano;
     nelle stesse due sedute una ripetizione in riserva in più (non a chi è già a 3-4: prudenti, over 65, minorenni) */
  rientroSerie: {
    v: { giorni: 14, prima: 0.75, seconda: 0.9, sedute: 2, rirPiu: 1 },
    forza: 'Convenzione', fonte: 'registro coach v2 B20 (CST-02: serie -25%, -10%, poi piano, +1 RIR per 2 sedute); ricerca-psicologia-aderenza CST-02; RIC-05 (14 giorni, -25% nella prima seduta)', regole: ['CST-02', 'RIC-05']
  },
  /* ALG-14: dopo il rientro (CAR-04) il carico risale di circa il 5% a seduta (2,5% per chi comincia, i prudenti e dopo i 65 anni; almeno un passo dell'attrezzo) fino al carico di
     prima, nelle `sedute` sedute dopo il rientro */
  risalita: {
    v: { passo: 0.05, passoPrudente: 0.025, sedute: 3 },
    forza: 'Convenzione', fonte: 'registro coach v2 B20 (ALG-14: 5% a seduta, 2,5% principianti e over 65, fino al carico di prima); ricerca-algoritmi-carichi-e-app ALG-14 (W\' = min(Wpre, W·1,05) per 3 sedute; base da verificare [M])', regole: ['ALG-14']
  }
};
