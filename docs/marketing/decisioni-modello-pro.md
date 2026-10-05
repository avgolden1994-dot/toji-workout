# Scheda di decisione: modello Pro di 3in

Data: 2026-10-05. Stato: decisioni dell'utente registrate (prezzo del lifetime chiuso il 2026-10-05); punti aperti in fondo. Nessun codice scritto, nessuna spesa fatta. Nulla qui è consulenza legale o fiscale. Le cifre di lavoro sono STIME da un'analisi dell'agente, non misure.

## 1. Decisioni prese dall'utente (2026-10-05)

| # | Tema | Decisione |
|---|---|---|
| 1 | Modello | **Pro** (non più «gratis + tip jar») |
| 2 | Prodotti | **Abbonamento annuale + lifetime**, entrambi |
| 3 | Prova gratuita | **Prova Pro di 2 settimane** come introductory offer di Apple; poi si acquista. Se App Store Connect non la consente (DA CONFERMARE): 1 settimana o 1 mese |
| 4 | PWA web | Per ora **tutta gratuita** e non ancora condivisa con nessuno |
| 5 | Tip jar | **Tolta dalla v1** |
| 6 | Pagamenti esterni | **Nessun link** a pagamenti esterni |
| 7 | Analisi | **Nessun analytics.** Le metriche vengono da App Store Connect e dal riscatto dei codici |
| 8 | Tecnica | StoreKit 2 con il plugin `@capgo/native-purchases` (v8.8.1 al 22/09/2026, licenza MPL-2.0, Capacitor 8 o superiore); controllo dei diritti solo sul dispositivo |
| 9 | Terzi | **Niente RevenueCat**: è un SDK/server di terzi, rompe «Data Not Collected»; il sito non era raggiungibile, non verificato |
| 10 | Annuale | **19,99 € prezzo pieno.** Lancio: **6,99 € il primo anno** via offer code «Pay up front», poi rinnovo a 19,99 € (netti 13,93 € pieno, 4,87 € lancio; formula prezzo/1,22*0,85). Il paywall deve dire «6,99 € il primo anno, poi 19,99 €/anno» (3.1.2). Prezzo di lancio onesto e a tempo limitato; prezzo barrato falso vietato (normativa UE sulle riduzioni di prezzo, citata a memoria, non verificata) |
| 11 | Lifetime | Si vende **insieme all'annuale**. **Prezzo CHIUSO: 39,99 € pieno**; **prezzo di lancio «25 euro» = livello Apple 24,99 €** via offer code (non-consumable: gli offer code valgono anche per acquisti una tantum dal 29/10/2025, riscatto in app da iOS 16.3), **a tempo/posti limitati e onesto**: il pieno 39,99 € deve esistere dopo il lancio; prezzo barrato falso vietato (normativa UE a memoria, non verificata). Netti 27,86 € pieno, 17,41 € lancio |
| 12 | Famiglia | **Sì al prodotto «Lifetime Famiglia» a +30%** con Family Sharing (condivisione fino a 6 persone: limite Apple, non limitabile a 3; link di condivisione propri non ammessi, 3.1.1). Il **lifetime singolo senza Family Sharing**. Il codice famiglia -90% è **abbandonato** |
| 13 | Codici | **-80% solo per recensori/palestre/trainer**, in numero limitato. Per il pubblico il codice di lancio è quello a 6,99 € primo anno |

**Lavoro stimato** (STIMA, da un'analisi): 15-25 h di sviluppo + circa 4 h in App Store Connect.

**Sequenza raccomandata.** Il contesto finanziario dell'utente è difficile: **spesa zero fino al segnale dei 30 giorni.** Non scrivere il codice di acquisto e non pagare i 99 $ dell'Apple Developer Program prima del segnale: **150 iscritti alla lista d'attesa oppure 300 utenti PWA con buon ritorno a 7 giorni** (soglie della metodologia, sez. 5, stime non verificate). Fino ad allora: contenuti, lista d'attesa, misura. Se il segnale non arriva, non si è speso nulla.

## 2. Perimetro gratis / Pro (decisione dell'utente)

**GRATIS (sempre)**
- Base: registrazione delle sedute, timer, Live Activity, notifiche, libreria esercizi, programma base.
- Assaggio dei punti forti: cedimento base, 1 sostituzione di macchinario occupato per seduta.
- Fino a **2 piani generati in tutto.**
- Export e cancellazione dei dati: **mai a pagamento.**
- Funzioni native: devono restare gratuite (guideline 4.2: un'app che è solo un sito impacchettato rischia il rifiuto).

**PRO**
- Cedimento completo, calendario, coach progressivo, alternative illimitate per macchinario occupato, piani illimitati.
- Calendario BIA: dati solo locali, pochi, usati dal coach; «Data Not Collected» resta valido; il BIA è una stima indicativa.
- Nuove funzioni Pro ogni settimana e a lungo termine (valore ricorrente, contro il rischio 3.1.2(a)).
- **Massimo 5 punti di blocco** nell'app.

**Alla scadenza** (prova o abbonamento): i dati restano visibili ed esportabili in sola lettura, mai in ostaggio (coerente con «export mai a pagamento» e con il GDPR art. 9 per il BIA).

**Resta da curare:** la PWA gratuita non deve contraddire i testi che dicono «Pro»: separare «versione iOS» e «versione web» (nessun «Pro» nei testi web, o nota chiara «su iPhone»).

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

## 4. Prezzi, lifetime e famiglia

**Formula netti:** netto = prezzo / 1,22 x 0,85 (IVA 22%, commissione 15%, imposte sul reddito escluse; per abbonamenti, valido per la prima annualità).

| Prodotto | Prezzo | Netto |
|---|---|---|
| Annuale, pieno | 19,99 | 13,93 |
| Annuale, lancio primo anno (Pay up front; poi 19,99) | 6,99 | 4,87 |
| Lifetime, pieno (deciso) | 39,99 | 27,86 |
| Lifetime, lancio 24,99 via offer code, a tempo/posti limitati (deciso) | 24,99 | 17,41 |
| Lifetime Famiglia, +30% su 39,99 | 51,99 | ~36,2 |
| Lifetime Famiglia di lancio (OPZIONE, non decisa): +30% su 24,99 | 32,49 | ~22,6 |
| Codice -80% (recensori/palestre/trainer) su annuale 19,99 | 4,00 | 2,79 |

**Annuale:** deciso. Il paywall dice chiaramente «6,99 € il primo anno, poi 19,99 €/anno». Il prezzo di lancio è onesto e a tempo limitato; il prezzo barrato falso è vietato.

**Lifetime (deciso 2026-10-05, prezzo CHIUSO).** Pieno 39,99 € (netto 27,86 €); lancio «25 euro» = livello Apple 24,99 € (netto 17,41 €) via offer code, a tempo o posti limitati e onesto. Il pieno 39,99 € deve esistere davvero dopo il lancio; prezzo barrato falso vietato (normativa UE citata a memoria, non verificata). Il lifetime costa chiaramente più dell'annuale (39,99 contro 19,99), quindi l'annuale ha senso.

**Rientro dei ~485 € in vendite** (485 / netto, arrotondato per eccesso):

| Prodotto | Netto | Vendite per rientrare |
|---|---|---|
| Annuale pieno 19,99 | 13,93 | 35 |
| Annuale lancio 6,99 (primo anno) | 4,87 | 100 |
| Lifetime pieno 39,99 | 27,86 | 18 |
| Lifetime lancio 24,99 | 17,41 | 28 |

**Famiglia (deciso).** Prodotto separato **«Lifetime Famiglia»** a +30% con Family Sharing, anche se la condivisione arriva fino a 6 persone (limite Apple, non limitabile a 3; link di condivisione propri non ammessi, 3.1.1). Il lifetime singolo resta senza Family Sharing. Il codice famiglia -90% è abbandonato. Su 39,99 il +30% dà 51,99 (netto ~36,2). Famiglia di lancio NON decisa: se servisse, +30% su 24,99 = 32,49 (netto ~22,6), solo come opzione. Family Sharing potrebbe essere irreversibile una volta attivato su un prodotto (DA VERIFICARE): per questo i due lifetime sono prodotti distinti.

**Codici:** -80% solo per recensori, palestre e trainer, in numero limitato; per il pubblico vale il codice di lancio a 6,99 € primo anno.

## 5. Cosa si tiene dal piano precedente

- Prova: 2 settimane decise; da confermare in App Store Connect le durate ammesse per la introductory offer (DA VERIFICARE); i benchmark RevenueCat (trial più lunghi convertono meglio) sono VIA TERZI, fonte non letta.
- Prezzi: annuale deciso (19,99 pieno, 6,99 lancio primo anno); lifetime deciso (39,99 pieno, 24,99 lancio; sez. 4). La tabella per fascia di pubblico della metodologia sez. 6 resta come ordine di grandezza.
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

## 7. Aperti
- **Durata della prova da confermare in App Store Connect** (2 settimane; alternative 1 settimana o 1 mese).
- **Irreversibilità di Family Sharing** (da verificare).
- **Limiti di riscatti per codice** (recensori/palestre/trainer, numero limitato) da verificare in App Store Connect.
- **Schedule 2** della licenza (non letto).
- **Riallineamento della sez. 6** (modifiche ai docs: ancora opzioni A/B/C e mance), da riscrivere quando si toccheranno quei file.

Verifiche tecniche non legate alle decisioni (invariate): Attachment 14 UE (letto in sintesi), JWS e `Transaction.updates` nel plugin, categoria d'età, riscatto codici in sandbox.
