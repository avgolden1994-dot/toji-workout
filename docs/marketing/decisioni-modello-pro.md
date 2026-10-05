# Scheda di decisione: modello Pro di 3in

Data: 2026-10-05. Stato: decisioni dell'utente registrate; punti aperti in fondo. Nessun codice scritto, nessuna spesa fatta. Nulla qui è consulenza legale o fiscale. Le cifre di lavoro sono STIME da un'analisi dell'agente, non misure.

## 1. Decisioni prese dall'utente (2026-10-05)

| # | Tema | Decisione |
|---|---|---|
| 1 | Modello | **Pro** (non più «gratis + tip jar») |
| 2 | Prodotti | **Abbonamento annuale + lifetime**, entrambi |
| 3 | Prova gratuita | **Introductory offer di Apple.** Durata: 2 settimane se App Store Connect la consente (DA CONFERMARE); alternative 1 settimana o 1 mese |
| 4 | PWA web | Per ora **tutta gratuita** e non ancora condivisa con nessuno |
| 5 | Tip jar | **Tolta dalla v1** |
| 6 | Pagamenti esterni | **Nessun link** a pagamenti esterni |
| 7 | Analisi | **Nessun analytics.** Le metriche vengono da App Store Connect e dal riscatto dei codici |
| 8 | Tecnica | StoreKit 2 con il plugin `@capgo/native-purchases` (v8.8.1 al 22/09/2026, licenza MPL-2.0, Capacitor 8 o superiore); controllo dei diritti solo sul dispositivo |
| 9 | Terzi | **Niente RevenueCat**: è un SDK/server di terzi, rompe «Data Not Collected»; il sito non era raggiungibile, non verificato |
| 10 | Famiglia | «Family Sharing sì, sconto fino al 90% con codice famiglia, fino a 3 persone»: ambiguo, vedi sez. 4 |

**Lavoro stimato** (STIMA, da un'analisi): 15-25 h di sviluppo + circa 4 h in App Store Connect.

**Sequenza raccomandata.** Il contesto finanziario dell'utente è difficile: **spesa zero fino al segnale dei 30 giorni.** Non scrivere il codice di acquisto e non pagare i 99 $ dell'Apple Developer Program prima del segnale: **150 iscritti alla lista d'attesa oppure 300 utenti PWA con buon ritorno a 7 giorni** (soglie della metodologia, sez. 5, stime non verificate). Fino ad allora: contenuti, lista d'attesa, misura. Se il segnale non arriva, non si è speso nulla.

## 2. Perimetro gratis / Pro (secondo l'utente)

**GRATIS (sempre)**
- Registrazione delle sedute, timer, Live Activity, notifiche, libreria esercizi, programma base.
- Export e cancellazione dei dati: **mai a pagamento.**
- Funzioni native: devono restare gratuite (guideline 4.2: un'app che è solo un sito impacchettato rischia il rifiuto; le funzioni native sono il valore dell'app anche senza Pro).
- Fino a **2 allenamenti/piani generati.**

**PRO**
- Generazione illimitata di allenamenti/piani.
- Calendario, uso del calendario BIA, progressione dei carichi, statistiche avanzate.
- Nuove funzioni Pro che arrivano di settimana in settimana e a lungo termine. Il valore continuo serve contro il rischio 3.1.2(a) (un abbonamento deve dare valore ricorrente, non un solo sblocco).

**Da chiarire con l'utente**
1. Cosa significa «2 allenamenti»: 2 piani generati in tutto, oppure 2 al mese? (Raccomandazione: 2 in tutto per la v1, più semplice da spiegare nel paywall e da provare in sandbox; da decidere.)
2. Cosa succede ai dati di calendario/BIA già inseriti quando la prova o l'abbonamento scade. **Raccomandazione:** restano visibili ed esportabili in sola lettura, mai dati «in ostaggio» (coerente con «export mai a pagamento» e con il GDPR art. 9 per il BIA).
3. La PWA gratuita non deve contraddire i testi che dicono «Pro»: separare le formule «versione iOS» e «versione web» (nessun «Pro» nei testi web, o nota chiara «su iPhone»).

## 3. Rischi e regole Apple

Fonti Apple lette (analisi del 05/10/2026): App Review Guidelines 3.1.1, 3.1.2, 3.1.2(a), 3.1.2(c), 4.2, 2.3.2, 5.1.1; App Privacy; guide agli offer code per abbonamenti e IAP. Dal 29/10/2025 gli offer code valgono anche per consumable e non-consumable, quindi per il lifetime. Il riscatto in app richiede iOS 16.3.
**NON letto:** Schedule 2 della licenza. Attachment 14 UE (dal 01/10/2026) letto solo in sintesi.

**Il plugin non ha un metodo per aprire il foglio di riscatto dei codici**: il riscatto passa dall'App Store o da un URL; poi l'app chiama `getPurchases` all'avvio (da provare in sandbox).

**Nuova checklist minima di review**
- [ ] Paywall con prezzo, durata, prova, rinnovo, come disdire, link a Termini + Privacy + EULA, in 4 lingue.
- [ ] «Ripristina acquisti» e «Gestisci abbonamento» presenti.
- [ ] Descrizione e screenshot dicono cosa è Pro.
- [ ] Funzioni native gratuite (4.2).
- [ ] Nessun link a pagamenti esterni.
- [ ] IAP inviati con la build, con la schermata di revisione.
- [ ] Note al revisore: percorso verso Pro e cosa portano gli aggiornamenti (3.1.2(a)).
- [ ] «Data Not Collected» senza SDK di terzi.
- [ ] Family Sharing deciso prima della creazione dei prodotti.
- [ ] Prove sandbox: acquisto, annullamento, scadenza, ripristino, offline, codice riscattato.

## 4. Famiglia: punto da chiarire e tre opzioni

**Il nodo.** L'utente ha detto «Family Sharing sì, sconto fino al 90% con codice famiglia, fino a 3 persone». Sono **due meccanismi distinti** e si sovrappongono:
- **Family Sharing di Apple** condivide l'acquisto con i membri del nucleo familiare (fino a 5) senza pagare di nuovo.
- **Offer code personalizzato** = sconto per chi lo riscatta. Lotti fino a 25.000; il numero di riscatti si imposta (DA VERIFICARE in App Store Connect che si possa limitare a 3 riscatti per codice).
Un «codice famiglia -90% per 3 persone» cannibalizza Family Sharing: se la famiglia può già condividere un acquisto, vendere 3 copie scontate rende meno di 1 copia piena condivisa.
Per quanto ricordato, **Family Sharing potrebbe essere irreversibile** una volta attivato su un prodotto (DA VERIFICARE): decidere prima di creare i prodotti.

**Netti** (netto = prezzo / 1,22 x 0,85; IVA 22%, commissione 15%, imposte sul reddito escluse; per abbonamenti, valido per la prima annualità)

| Prodotto | Prezzo | Netto pieno | Netto -80% | Netto -90% |
|---|---|---|---|---|
| Annuale | 6,99 | 4,87 | 0,97 | 0,49 |
| Annuale | 9,99 | 6,96 | 1,39 | 0,70 |
| Lifetime | 14,99 | 10,44 | 2,09 | 1,04 |
| Lifetime | 19,99 | 13,93 | 2,79 | 1,39 |

**Opzioni**
- **A) Family Sharing attivo solo sul lifetime + codici -80% solo per lancio, recensori, palestre.** Una famiglia di 5 paga una volta sola il lifetime; l'annuale resta individuale. Nessun codice famiglia.
- **B) Family Sharing su entrambi, senza codice famiglia.** Il più generoso e semplice da spiegare; ma l'annuale condiviso con 5 persone riduce il ricavo per utente e non si torna indietro (se irreversibile).
- **C) Family Sharing spento + codice famiglia -90% limitato a 3 riscatti.** Realizza alla lettera la frase dell'utente, ma 3 riscatti a -90% su un lifetime da 14,99 danno 3 x 1,04 = 3,12 netti, meno di una sola vendita piena (10,44); richiede inoltre di verificare il limite di 3 riscatti e di distribuire i codici a mano.

**Raccomandazione: A.** Motivi: (1) la famiglia è servita da Family Sharing sul lifetime, che è il prodotto «una volta e basta» più adatto a una famiglia; (2) niente sovrapposizione fra i due meccanismi; (3) l'annuale conserva un valore individuale e un ricavo ricorrente; (4) non dipende dalla verifica dei «3 riscatti»; (5) i codici -80% restano uno strumento di canale con durata limitata, come già deciso. Il -90% resta solo un'opzione non decisa (caso famiglia, opzione C). **La scelta finale è dell'utente.**

## 5. Cosa si tiene dal piano precedente

- Prova: la scelta di durata si decide dopo aver letto in App Store Connect le durate ammesse per la introductory offer (DA VERIFICARE); i benchmark RevenueCat (trial più lunghi convertono meglio) sono VIA TERZI, fonte non letta.
- Prezzi: nessun prezzo fissato. Gli esempi sopra servono ai conti; il prezzo si fissa prima del TestFlight pubblico in base alla fascia del pubblico (metodologia, sez. 6).
- Obiettivo di rientro: circa 350 € nel piano di lancio contro circa 485 € nella skill (285 € costi vivi + 20 h a 10 €/h): da riconciliare in un'unica cifra.

## 6. Modifiche da fare ai docs (NON eseguite; i riferimenti sono stati verificati leggendo i file)

**`docs/piano-lancio-appstore.md`**
- Sez. 1.1, riga D2 (riga 95): da «Donazioni o rientro di circa 350 € / tip jar» a «Pro: annuale + lifetime, prova Apple, spesa zero fino al segnale».
- Sez. 1.2 (riga 122): «prezzi delle tre mance» diventa prezzi di annuale e lifetime, durata della prova, Family Sharing.
- Sez. 3.6 (riga 237): «Il tip jar IAP non aggiunge dati...» diventa Pro/StoreKit 2 senza SDK di terzi; citare anche «acquisti IAP» nella policy (riga 236).
- Sez. 4.3 (riga 285): «le mance IAP devono funzionare in sandbox» diventa i prodotti Pro in sandbox e schermata di revisione.
- Sez. 4.7 (riga 303): «gratuita con tip jar... consumabili (3.1.1)» diventa abbonamento auto-rinnovabile + lifetime non consumabile (3.1.1, 3.1.2, 3.1.2(a)).
- Sez. 6.2 (riga 360): «come provare le mance IAP... non sbloccano nulla» diventa percorso verso Pro e cosa portano gli aggiornamenti.
- Sez. 7.1, riga 8 della tabella (riga 396) e il diagramma (righe 411, 415): «tip jar» diventa Pro/IAP (StoreKit 2), stima 15-25 h + 4 h ASC, dopo il segnale dei 30 giorni; anche riga 423 («le mance in ASC»).
- Sez. 7.2, passo 5 (riga 430): «tip jar... tre prodotti consumabili» diventa prodotti Pro (annuale, lifetime), a valle del segnale.
- Sez. 8.1 (righe 439-441): regole 3.1.1 sulle mance sostituite da 3.1.1/3.1.2/3.1.2(a); resta il divieto di link esterni (3.1.1(a)).
- Sez. 8.3 (righe 446-453): tabella delle mance sostituita dai netti di annuale/lifetime; rientro ~350 € nel piano vs ~485 € nella skill: unificare.
- Sez. 8.4 (righe 455-472): opzioni A/B/C riscritte; la raccomandazione «partire con A (tip jar)» (riga 462) è superata.
- Sez. 8.5 (riga 478, «Tecnica»): plugin `@capgo/native-purchases`, niente RevenueCat; il resto della sezione (DSA, W-8BEN, fisco) resta.
- Glossario (riga 551, «Tip jar»): da togliere o aggiornare.

**`docs/checklist-appstore/08-monetizzazione.md`**: «Scelta» (righe 5-8); prima «Regola Apple» (riga 11, mance consumabili); «3 prodotti IAP consumabili» (riga 19); «Offrimi un caffè» (riga 24); plugin (riga 23); obiettivo di rientro (riga 36).
**`05-conformita-review.md`**: sez. 2.1 (riga 21, «Mance IAP provabili») e «Pagamenti e altro» (riga 46, «Tip jar: solo IAP consumabili»).
**`04-sicurezza-privacy.md`**: riga 43 (la policy cita «IAP»: aggiungere acquisti Pro e Family Sharing; riga 47 App Privacy invariata ma da riverificare senza SDK).
**`02-tecnica-ios.md`**: nessuna riga su StoreKit oggi; aggiungere in «Funzioni native» (dopo riga 28) plugin `@capgo/native-purchases` e il file di configurazione StoreKit per i test locali.
**`07-rilascio.md`**: riga 8 (note per il revisore: «come provare le mance IAP»).
**`01-decisioni.md`**: riga 6 (D2).
**`privacy-policy-bozza.md`**: riga 26 («Acquisti (mance)»).

## 7. Da verificare / da fare
- Schedule 2 della licenza (non letto).
- Durate ammesse della prova (introductory offer) in App Store Connect.
- Irreversibilità di Family Sharing e limite di 3 riscatti per codice.
- Attachment 14 UE (dal 01/10/2026), letto solo in sintesi.
- Se il plugin verifica il JWS e ascolta `Transaction.updates` (altrimenti vanno gestiti a parte).
- Categoria d'età.
- Riscatto codici: percorso App Store/URL + `getPurchases` all'avvio, da provare in sandbox.
- Risposte dell'utente ai punti della sez. 2 e scelta A/B/C della sez. 4.
