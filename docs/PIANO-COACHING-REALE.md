# Piano: piattaforma di coaching con coach reali (sito + app 3in)

Stato: **architettura v2** (1 ottobre 2026), aggiornata con le decisioni del titolare. Progetto a parte rispetto all'app: nuovo repository (`3in-coach`), che parla con l'app attraverso un contratto di eventi (capitolo 7). I dettagli si decidono per fasi.

## 1. Decisioni prese
| # | Tema | Decisione |
|---|---|---|
| 1 | Modello | **Piattaforma con più coach iscritti**, ognuno con il proprio account e i propri allievi |
| 2 | Servizi | Due tipi: **solo nutrizionista** oppure **servizio completo** (allenamento + nutrizione) |
| 3 | Rapporto coach–allievo | Si **firma un contratto** tra le parti; i **moduli sul trattamento dei dati** si scambiano; le **prestazioni si pagano una a una** (a servizio) |
| 5 | Sedute | Il coach può **commentare le sedute già fatte** e **modificare quelle ancora da fare** |
| 6 | Chat | Serve. Si attiva **solo con il codice di coaching**: nell'app compare l'icona «Coaching». L'allievo ha accesso anche al **sito come allievo**, dove il coach può scrivere descrizioni più dettagliate |

Ancora da decidere: vedi capitolo 13.

## 2. Principi (non negoziabili)
1. **L'app resta utilizzabile da sola**, offline, senza account. Il coaching è un'aggiunta.
2. **Locale prima di tutto**: al server va una copia solo dopo il consenso, solo delle categorie scelte.
3. **Consenso a categorie e revocabile**, con elenco chiaro di cosa esce (come per il Coach IA).
4. **Dati di salute = dati sensibili** (GDPR art. 9): consenso esplicito, server in UE, cancellazione, registro degli accessi.
5. **Le salvaguardie di sicurezza del coach a regole restano** (PAR-Q, over 65, dolore). Un coach reale decide i numeri, ma se supera un limite l'app lo segnala all'allievo.
6. **Il coach vede solo ciò che il suo tipo di servizio richiede** (nutrizione ≠ allenamento, capitolo 5).

## 3. Attori e ruoli
| Ruolo | Cosa fa | Accesso |
|---|---|---|
| **Allievo** | Usa l'app; con il codice attiva il coaching; sul sito vede chat, contratti, pagamenti, schede | app (senza account) + **sito allievo** (con account: serve per chat, contratto, pagamenti) |
| **Coach** (allenamento, nutrizione, completo) | Segue gli allievi, scrive il programma, commenta, chatta, fattura | sito coach, account con verifica a due passaggi |
| **Amministratore** (tu) | Approva i coach, gestisce segnalazioni, rimborsi, richieste GDPR, commissioni | back-office |

Gli allievi di un coach non vedono gli allievi degli altri. Un coach vede solo gli allievi che hanno firmato con lui.

## 4. Panoramica

```
 ALLIEVO                                 SERVIZIO (UE)                         COACH
 ┌──────────────────┐                  ┌────────────────────────┐          ┌─────────────────────┐
 │ App 3in           │──eventi, foto──▶│ API + database          │─tempo──▶│ Sito coach           │
 │ (offline, coda)   │◀─programma,chat─│ archivio foto privato   │  reale  │ elenco, grafici,     │
 │ icona «Coaching»  │                 │ chat + notifiche        │◀────────│ editor, chat, agenda │
 ├──────────────────┤                  │ contratti + firme       │         │ listino, incassi     │
 │ Sito allievo      │◀───────────────▶│ pagamenti (Stripe)      │         └─────────────────────┘
 │ chat, contratto,  │                 │ registro accessi        │         ┌─────────────────────┐
 │ pagamenti, schede │                 └────────────────────────┘         │ Back-office (admin)  │
 └──────────────────┘                                                      └─────────────────────┘
 Abbinamento: codice del coach (6-8 caratteri, scade in 10 min, monouso) → consenso → collegamento
```

## 5. Servizi e visibilità dei dati
| Dato | Solo nutrizione | Servizio completo | Note |
|---|---|---|---|
| Peso, misure, BIA, foto | sì | sì | foto solo se l'allievo le concede |
| Diario alimentare (**nuovo, da costruire nell'app**) | sì | sì | oggi l'app non registra l'alimentazione |
| Programma, sedute, carichi, RPE | no | sì | |
| Prontezza, sonno, dolore | solo sonno e stress | tutto | |
| Questionario di salute (PAR-Q) | solo se serve | solo se l'allievo lo concede | spento di default |
| Chat | sì | sì | |

Il tipo di servizio è nel contratto e decide quali categorie compaiono nel consenso. Cambiare tipo = nuovo contratto/addendum.

**Attenzione professionale:** in Italia prescrivere diete è riservato a professioni regolamentate (es. dietista, biologo nutrizionista, medico). Un personal trainer **non** può dare piani alimentari. Quindi i coach «solo nutrizione» e «servizio completo» vanno **verificati** (titolo, iscrizione all'albo, assicurazione) all'iscrizione, e il servizio completo deve avere un'**équipe**: o il coach ha entrambi i titoli, o serve un secondo professionista collegato all'allievo. Da chiarire con un legale (capitolo 13).

## 6. Come si inizia (abbinamento, contratto, pagamento)
1. **Iscrizione del coach**: account, verifica a due passaggi, caricamento di titoli/assicurazione, approvazione dell'amministratore, profilo con listino (servizi e prezzi).
2. Il coach preme «Nuovo allievo» e sceglie il servizio: il server genera un **codice** (es. `K7M-4QX`, valido 10 minuti, monouso) e un **invito al contratto**.
3. L'allievo inserisce il codice in **Opzioni → Coaching** (oppure sul sito allievo, dove crea l'account se non ce l'ha).
4. **Contratto:** l'allievo legge e firma (firma elettronica semplice: testo versionato, data e ora, indirizzo, impronta del documento; il coach firma per primo o in anticipo). Il contratto indica servizio, prezzi, durata, recesso, rimborsi, limiti (il coach non è un medico).
5. **Moduli sul trattamento dei dati:** informativa del coach come titolare del trattamento, consenso esplicito ai dati di salute, consenso per categoria (come per il Coach IA), nomina della piattaforma come responsabile. Ogni modulo è versionato e conservato.
6. **Collegamento attivo:** il server dà all'app un **token** (solo sul telefono, mai nei backup). L'app compare con l'icona **«Coaching»** (chat, programma del coach, comunicazioni).
7. **Revoca:** l'allievo può interrompere dall'app o dal sito; il coach dal sito. Il token muore subito. I dati già inviati: si seguono i termini del contratto (conservazione minima di legge per le prestazioni fatturate, cancellazione del resto su richiesta).

## 7. Il contratto tra app e servizio
**Eventi dall'app** (append-only, con id univoco: l'invio si può ripetere senza duplicare; coda con ripetizione se manca la rete):

| Evento | Contenuto minimo |
|---|---|
| `seduta.completata` | id, data, titolo, durata, per esercizio: serie (peso, ripetizioni, RPE, cedimento), note |
| `programma.cambiato` | versione, giorni/esercizi, **chi l'ha cambiato** (allievo, coach reale, coach a regole) + motivo |
| `misura.registrata` | data, tipo, valori |
| `foto.aggiunta` | id, data, posa, file caricato a parte |
| `alimentazione.registrata` | (fase successiva) pasti o riepilogo del giorno |
| `prontezza.registrata`, `dolore.segnalato` | come nell'app |
| `consenso.cambiato` | categorie attive |

**Dal coach all'app:** `programma.modificato` (sedute **ancora da fare**), `commento.seduta` (sedute fatte), `messaggio`, `carico.indicato`.

**Chat:** testo, allegati (immagini, PDF), note vocali più avanti; segni di lettura; notifiche; segnalazione abusi. I messaggi contengono dati di salute: stessa protezione degli altri dati.

**API (bozza):** `/v1/abbina`, `/v1/eventi` (a lotti), `/v1/da-coach?dopo=…` + tempo reale, `/v1/foto/url`, `/v1/chat`, `/v1/contratti`, `/v1/pagamenti`, `/v1/revoca`. Schema JSON per ogni evento e test di compatibilità app–servizio.

## 8. Regole sui cambiamenti del programma
- **Sedute già fatte:** il coach può **solo commentare**; non cambiano mai i dati registrati.
- **Sedute da fare:** il coach le **modifica direttamente**; l'allievo vede un avviso «modificato dal coach» con l'elenco delle differenze e può **annullare una volta** (come gli altri annulla dell'app).
- **Un solo autore alla volta:** se l'allievo e il coach modificano la stessa seduta, vince l'ultima versione e l'altro viene avvisato (versioni numerate per seduta).
- **Il coach a regole diventa consigliere:** i carichi automatici restano come suggerimento visibile, ma la decisione è del coach reale. Le salvaguardie di sicurezza non si spengono.
- Il Coach IA con il coaching attivo: i commenti dell'IA si mostrano solo se il coach lo permette.

## 9. Il sito del coach
Pagine: elenco allievi con avvisi · scheda allievo (calendario e aderenza, sedute, grafici, foto a confronto, misure) · editor del programma (stessa libreria esercizi dell'app, pacchetto condiviso) · chat · contratti e moduli · listino e incassi · profilo.

Grafici: carico massimo stimato per esercizio · volume per gruppo muscolare · aderenza · RPE · peso e massa magra · prontezza.

Avvisi: seduta saltata · dolore segnalato · prontezza bassa · carico sceso due volte · nuova foto/misura · messaggio nuovo.

**Sito allievo:** chat con il coach e descrizioni dettagliate (schede, note, allegati) · contratto e moduli · pagamenti e ricevute · progressi in sola lettura · gestione del consenso e cancellazione dati.

## 10. Pagamenti (a prestazione)
- **Modello:** il coach definisce un **listino** (es. «controllo mensile», «revisione scheda», «consulto nutrizionale»); l'allievo paga **ogni prestazione**; la piattaforma trattiene una commissione.
- **Tecnica consigliata:** **Stripe Connect** (i soldi vanno al coach, la piattaforma incassa la commissione; Stripe fa la verifica d'identità dei coach).
- **Da definire:** quando si paga (prima o dopo), rimborsi, controversie, **fatture** (è il coach che fattura all'allievo; la piattaforma fattura la commissione al coach), IVA.
- **Store (App Store/Google):** le prestazioni **da persona a persona** possono avere regole particolari sui pagamenti **da verificare nelle linee guida aggiornate**; il pagamento avviene sul sito allievo, non nell'app, per evitare problemi.

## 11. Scelte tecniche (consiglio + alternativa)
| Tema | Consiglio | Alternativa |
|---|---|---|
| Servizio | **Supabase (UE)**: database, accessi per riga, tempo reale, archivio foto, login | Cloudflare (già usato per il Coach IA): più controllo, molto più lavoro |
| Siti (coach, allievo, admin) | Un'unica web app in **TypeScript**, installabile (PWA), con aree separate per ruolo | App desktop (Electron/Tauri) più avanti |
| Accesso | e-mail + link magico, **due passaggi** per coach e admin | Google/Apple |
| Pagamenti | **Stripe Connect** | altri fornitori di marketplace |
| Firma contratti | **firma elettronica semplice interna** all'inizio | servizio di firma esterno (più valore legale: da valutare con un legale) |
| Notifiche | notifiche push dell'app (Capacitor) e e-mail | web push (su iPhone solo con app installata) |
| Cifratura | HTTPS + cifratura a riposo + foto in archivio privato con link a scadenza | **end-to-end** per foto e chat (fase 4) |

## 12. Come cambia l'app 3in
- Cartella `js/coaching/`: abbinamento, consenso, coda di invio, ricezione, **schermata «Coaching»** con chat e comunicazioni del coach.
- Icona **«Coaching»** nella barra: compare **solo con un collegamento attivo**.
- **CSP** (`connect-src`) aperta verso il dominio del servizio; il token **non entra nei backup**.
- Nuova famiglia di regole `COA` nella mappa (coach reale prevale sui numeri; salvaguardie sempre attive).
- Fase successiva: **diario alimentare** (necessario per il servizio nutrizionista).
- Testi in it/en/es/de, informativa, test (`tests/browser/coaching.js`), documenti aggiornati.

## 13. Privacy, legge e store (prima del lancio)
- **GDPR:** dati di salute (art. 9), consenso esplicito, valutazione d'impatto (DPIA), contratti con i fornitori, server UE, conservazione, esportazione e cancellazione, registro accessi visibile all'allievo.
- **Ruoli privacy:** coach = titolare del trattamento dei dati dei propri allievi; piattaforma = responsabile (e titolare per i dati dei coach e dei pagamenti). Serve un accordo di nomina e le condizioni d'uso dei coach.
- **Professioni regolamentate** (nutrizione) e **responsabilità**: titoli, assicurazione, limiti dichiarati; la piattaforma non è un dispositivo medico.
- **Minori:** limite di età o consenso dei genitori.
- **Marketplace:** termini per i coach, recesso/consumatori, fatturazione, antiriciclaggio e verifica del coach (Stripe).
- **Store:** privacy nutrition label (salute, foto, messaggi), nessun account obbligatorio per l'uso solo-app.

## 14. Rischi
1. **Privacy e fiducia** (foto, salute, chat): il rischio maggiore.
2. **Responsabilità professionale e legale** (nutrizione, contratti, pagamenti): serve un **legale** prima del lancio; il piano non è consulenza legale.
3. **Complessità di una piattaforma**: account, verifica coach, pagamenti, rimborsi, assistenza: più lavoro di un portale per un solo coach.
4. **Costi** (foto, chat, tempo reale) e commissioni di pagamento.
5. **Conflitti sul programma** tra allievo, coach e coach a regole (capitolo 8).
6. **Sincronizzazione** (offline, versioni diverse dell'app).

## 15. Fasi
| Fase | Contenuto | Risultato |
|---|---|---|
| 0. Decisioni e legale | domande aperte, consulenza legale (contratto, nutrizione, GDPR), scelta del servizio, nome e dominio | via libera scritto |
| 1. Fondamenta | account coach/allievo/admin, verifica coach, abbinamento, contratto e moduli, collegamento | un coach segue un allievo, senza pagamenti |
| 2. Dati e grafici | invio sedute/carichi/programma, scheda allievo con grafici, aderenza, avvisi | coach in «sola lettura» completo |
| 3. Il coach scrive | modifica delle sedute da fare, commenti, **chat** (app e sito allievo), icona «Coaching» | ciclo completo |
| 4. Foto e misure | foto a confronto, misure/BIA, prontezza e dolore | |
| 5. Soldi | listino, Stripe Connect, ricevute e fatture, rimborsi | servizio a pagamento |
| 6. Nutrizione | diario alimentare nell'app, viste del nutrizionista | secondo servizio |
| 7. Scala | cifratura end-to-end, team/studi, app desktop, assistenza | |
| Parallela | prove di sicurezza (come `docs/SICUREZZA.md`), privacy store, revisione legale continua | |

Nota di ordine: partire **solo con coach di allenamento** e rimandare la nutrizione (fase 6) riduce il rischio legale iniziale. Da confermare.

## 16. Domande ancora aperte
1. **«Seduta» a pagamento:** è una **prestazione del coach** (consulto, revisione, videochiamata) o ogni **allenamento** dell'allievo? Cambia il listino e la fatturazione.
2. **Più coach per un allievo?** (es. allenamento e nutrizione da persone diverse): per il servizio completo con titoli diversi è quasi obbligatorio.
3. **Come si trovano i coach:** solo per invito diretto del coach, oppure un **elenco pubblico** dove l'allievo sceglie? (cambia marketing, verifica, responsabilità)
4. Cosa succede ai **dati** se il coach chiude l'account o l'allievo cancella l'app (conservazione, passaggio ad altro coach)?
5. **Chi è il titolare** dell'attività (tu come persona, una società)? Serve per contratti, fatture, Stripe.
6. **Paesi e lingue** all'inizio: solo Italia e italiano?
7. **Commissione** della piattaforma e chi la sostiene.
8. **Videochiamate** o solo chat? (le visite a distanza richiedono strumenti e regole in più)
9. **Nutrizione dall'inizio o da fase 6?** (capitolo 15)
