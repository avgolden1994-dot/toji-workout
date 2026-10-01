# Piano: piattaforma di coaching con coach reali (sito + app 3in)

Stato: **architettura v4** (1 ottobre 2026), aggiornata con le decisioni del titolare. Progetto a parte rispetto all'app: nuovo repository (`3in-coach`), che parla con l'app attraverso un contratto di eventi (capitolo 7) e condivide con essa libreria esercizi e regole (capitolo 9). I dettagli si decidono per fasi.

## 1. Decisioni prese
| # | Tema | Decisione |
|---|---|---|
| 1 | Modello | **Piattaforma con più coach iscritti**, ognuno con il proprio account e i propri allievi |
| 2 | Servizi | **Solo nutrizione** oppure **servizio completo** (allenamento + nutrizione) |
| 3 | Rapporto coach–allievo | **Contratto firmato** e **moduli sul trattamento dei dati** scambiati. Si vende un **programma a pacchetto** (vedi 11) |
| 4 | Più professionisti per un allievo | **Sì**: allenatore e nutrizionista si collegano **insieme**; l'app mette a disposizione di tutti **tutta l'informazione**; **ognuno modifica solo ciò che compete al suo ruolo** (il nutrizionista solo il piano alimentare, l'allenatore solo gli allenamenti) |
| 5 | Sedute | Il coach **commenta le sedute fatte** e **modifica quelle da fare** |
| 6 | Chat | Serve; si attiva **solo con il codice di coaching** (icona «Coaching» nell'app); l'allievo ha anche il **sito come allievo** per le descrizioni dettagliate |
| 7 | Scelta del coach | Un **elenco di coach** tra cui l'allievo sceglie |
| 8 | Titolare | Per ora una **piattaforma di interazione**, il titolare è **l'unico responsabile** |
| 9 | Paesi e lingue | **Solo Italia, solo italiano** |
| 11 | Cosa si vende | Un **programma con un numero di videochiamate in un totale di settimane**, perché l'allievo viva un **percorso**. Nel prezzo è incluso tutto: revisione, allenamento, coaching, chat |
| 12 | Chat | Chat **a tre** (allievo + allenatore + nutrizionista) e, nella **scheda allievo**, una **chat di coordinamento solo tra i due professionisti** (l'allievo **non** la vede e **non** vede le note interne), così si coordinano senza uscire dalla piattaforma |
| 13 | Dati dopo la fine | Restano sul server **per un periodo, in forma di archivio**, poi vengono **cancellati** |
| 14 | Coach | Accede **solo con il proprio account**; **non può delegare** la videochiamata, ma può **spostarla**. Se il coach si ritira dopo il pagamento, **l'intero piano passa a un altro coach** |
| 15 | Comunicazione | **Videochiamata + chat** |
| 10 | Suggerimenti e rapporti | Il sito prepara per il coach **suggerimenti e un rapporto** (regole dell'app e ricerche); il coach **deve leggere tutto il rapporto prima di proseguire o accettare**; **serve sempre il consenso umano** |

Da decidere: vedi capitolo 16.

## 2. Principi (non negoziabili)
1. **L'app resta utilizzabile da sola**, offline, senza account. Il coaching è un'aggiunta.
2. **Locale prima di tutto**: al server va una copia solo dopo il consenso, solo delle categorie scelte.
3. **Consenso a categorie e revocabile**, con elenco chiaro di cosa esce (come per il Coach IA).
4. **Dati di salute = dati sensibili** (GDPR art. 9): consenso esplicito, server in UE, cancellazione, registro degli accessi.
5. **Le salvaguardie di sicurezza del coach a regole restano** (PAR-Q, over 65, dolore). Un coach reale decide i numeri, ma se supera un limite l'app lo segnala all'allievo.
6. **Ogni professionista modifica solo la propria area** (allenatore: allenamenti; nutrizionista: piano alimentare). La visibilità tra i membri del team è ampia ma **solo con il consenso** dell'allievo (capitolo 5).
7. **Nessuna decisione sulla salute senza un umano**: suggerimenti e rapporti sono supporto, la decisione è sempre del coach (capitolo 9).

## 3. Attori e ruoli
| Ruolo | Cosa fa | Accesso |
|---|---|---|
| **Allievo** | Usa l'app; con un codice attiva il coaching; sceglie il coach dall'elenco; sul sito vede chat, contratti, pagamenti, schede | app (senza account) + **sito allievo** (con account: chat, contratto, pagamenti) |
| **Coach – allenamento** | Segue gli allievi, scrive/modifica gli allenamenti, commenta le sedute, chatta, fattura | sito coach, account con due passaggi |
| **Coach – nutrizione** | Come sopra ma modifica solo il **piano alimentare** | idem |
| **Amministratore** (tu) | Approva e verifica i coach, gestisce l'elenco, segnalazioni, rimborsi, richieste GDPR, commissioni | back-office |

**Il team dell'allievo:** un allievo ha **al massimo un coach per ruolo** (un allenatore e un nutrizionista). I due **lavorano insieme per impostazione predefinita**: vedono gli stessi report e grafici e si leggono a vicenda le note interne condivise; ognuno scrive solo nel proprio campo. Un coach non vede gli allievi degli altri coach. Il coach lavora **solo con il proprio account** (due passaggi) e **non può far svolgere la videochiamata a un'altra persona**.

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

## 5. Chi vede e chi modifica cosa
**Principio:** tutti i professionisti del team **vedono tutto** (report e grafici completi); **modificano solo la propria area**.

| Dato | Allenatore | Nutrizionista | Allievo |
|---|---|---|---|
| Programma, sedute, carichi, RPE | vede, **modifica** (sedute da fare), commenta le fatte | vede, commenta | vede, esegue |
| Piano alimentare e diario alimentare (**nuovo**) | vede | vede, **modifica** | vede, registra |
| Peso, misure, BIA, foto | vede | vede | vede, registra |
| Prontezza, sonno, dolore | vede | vede | registra |
| Questionario di salute (PAR-Q) | vede se concesso | vede se concesso | decide |
| Chat a tre (con l'allievo) | sì | sì | sì |
| Note interne tra professionisti e **chat di coordinamento** | sì | sì | **no** (non le vede) |

**Consenso (importante):** vedere «tutto» significa che il nutrizionista legge i dati di allenamento e viceversa. Per il GDPR l'allievo deve **sapere e accettare** chi vede cosa: quando collega il secondo professionista compare il consenso con l'elenco delle categorie e degli accessi; l'impostazione predefinita è «tutto condiviso nel team», ma l'allievo può togliere categorie (soprattutto questionario di salute e foto). Il registro degli accessi mostra chi ha aperto cosa.

**Nota sulle note interne:** anche se l'allievo non le vede nella piattaforma, sono **dati personali che lo riguardano**: se li chiede (diritto di accesso, GDPR art. 15) vanno forniti, salvo eccezioni. Per questo le note interne si scrivono in modo professionale e circoscritto. Da confermare con il legale.

**Attenzione professionale:** in Italia prescrivere diete è riservato a professioni regolamentate (dietista, biologo nutrizionista, medico). Un personal trainer **non** può dare piani alimentari: per questo il permesso di modificare il piano alimentare esiste **solo** per il ruolo «nutrizione», verificato (titolo, iscrizione all'albo, assicurazione). Da confermare con un legale.

## 6. Come si inizia (abbinamento, contratto, pagamento)
1. **Iscrizione del coach**: account, verifica a due passaggi, caricamento di titoli/assicurazione, **approvazione dell'amministratore**, profilo pubblico (foto, titoli, specializzazioni, servizi e listino).
2. **Due modi di incontrarsi:**
   - **dall'elenco:** l'allievo (sul sito allievo o nell'app) sfoglia i coach, apre il profilo e **richiede il collegamento**; il coach accetta;
   - **per invito:** il coach preme «Nuovo allievo» e il server genera un **codice** (es. `K7M-4QX`, valido 10 minuti, monouso) e un invito al contratto.
3. Con il codice (o la richiesta accettata) l'allievo prosegue in **Opzioni → Coaching** o dal sito allievo, dove crea l'account se non ce l'ha.
4. **Contratto:** l'allievo legge e firma (firma elettronica semplice: testo versionato, data e ora, indirizzo, impronta del documento; il coach firma per primo o in anticipo). Il contratto indica servizio, prezzi, durata, recesso, rimborsi, limiti (il coach non è un medico).
5. **Moduli sul trattamento dei dati:** informativa del coach come titolare del trattamento, consenso esplicito ai dati di salute, consenso per categoria (come per il Coach IA), nomina della piattaforma come responsabile. Ogni modulo è versionato e conservato.
6. **Collegamento attivo:** il server dà all'app un **token** (solo sul telefono, mai nei backup). L'app compare con l'icona **«Coaching»** (chat, programma del coach, comunicazioni).
7. **Revoca:** l'allievo può interrompere dall'app o dal sito; il coach dal sito. Il token muore subito. I dati già inviati: si seguono i termini del contratto (conservazione minima di legge per le prestazioni fatturate, cancellazione del resto su richiesta).

**Secondo professionista:** l'allievo aggiunge un nuovo coach (altro ruolo) con lo stesso percorso; il contratto e il consenso sono **separati per professionista**, e al collegamento il team si forma automaticamente (capitolo 3).

**L'elenco dei coach:** profilo con titoli verificati (indicazione «verificato dalla piattaforma»), servizi e prezzi, disponibilità; ricerca per ruolo e specializzazione. Recensioni: **non all'inizio** (richiedono moderazione e regole), eventualmente dopo. La pubblicità sanitaria ha regole specifiche in Italia: **da verificare con un legale** prima di mostrare titoli e promesse.

## 6b. Il programma a pacchetto, le videochiamate, il passaggio del percorso
**Il prodotto.** Il coach (o la piattaforma) pubblica uno o più **pacchetti** nel proprio profilo, per esempio «12 settimane, 6 videochiamate». Un pacchetto ha: **durata in settimane**, **numero di videochiamate** (e durata di ciascuna), **tipo di servizio** (allenamento, nutrizione, completo), **prezzo unico**. Comprende tutto: programma, revisioni, commenti, chat, rapporti. L'allievo lo acquista **una volta** e firma il contratto relativo.

**Le videochiamate**
- Si prenotano da un **calendario** del coach (disponibilità, fuso orario unico: Italia) e si svolgono **dentro la piattaforma** (video nel sito; l'app apre il collegamento).
- **Solo il coach titolare** può condurla: entra con il **proprio account** (due passaggi); nessuna delega a collaboratori o sostituti.
- Il coach **può spostarla** (un numero limitato di volte, con preavviso minimo); l'allievo può spostarla entro regole fissate nel contratto (preavviso). Le chiamate non fatte per colpa del coach **non si perdono**; quelle saltate dall'allievo senza preavviso **sì** (da decidere).
- Con **allenatore + nutrizionista** il pacchetto «completo» prevede chiamate con ciascuno o di gruppo (da decidere).
- **Nessuna registrazione** di default; se mai, solo con consenso esplicito e conservazione breve.
- Tecnica: servizio video già pronto con server in UE (es. fornitori WebRTC) invece di costruirlo da zero; da valutare costi e requisiti privacy.

**Il passaggio del percorso (il coach si ritira)**
1. Il coach (o l'amministratore) segnala il ritiro; il programma **non si interrompe**.
2. L'amministratore **propone un altro coach** dello stesso ruolo; l'allievo **accetta o rifiuta**. Se rifiuta, ha diritto al **rimborso proporzionale** a quanto non svolto.
3. Con l'accettazione: il **contratto passa al nuovo coach** (cessione, con nuova firma e **nuovi moduli sui dati**, perché cambia il titolare del trattamento), **storico, programma, rapporti e chat restano** e il nuovo coach li vede.
4. Il **pagamento** si divide in proporzione: ciò che resta da svolgere va al nuovo coach. Per questo i fondi **non vengono trasferiti tutti al coach all'acquisto** ma **a tappe** (per esempio a ogni videochiamata svolta e a ogni settimana completata). Stripe lo permette (incasso della piattaforma e trasferimenti separati).
5. Il vecchio coach **perde l'accesso** ai dati dell'allievo da quel momento (resta l'archivio di legge delle proprie prestazioni).

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

**Chat:** due tipi, separati fin dal database:
- **chat a tre** (allievo + allenatore + nutrizionista; con un solo professionista, chat a due);
- **coordinamento** (solo allenatore + nutrizionista, nella scheda allievo): l'allievo **non** la vede.
Testo, allegati (immagini, PDF), segni di lettura, notifiche, segnalazione abusi. I messaggi contengono dati di salute: stessa protezione degli altri dati, e il **registro degli accessi** vale anche per la chat.

**Videochiamate:** `chiamata.prenotata`, `chiamata.spostata` (con chi e perché), `chiamata.svolta` (durata reale), `chiamata.saltata`.

**API (bozza):** `/v1/abbina`, `/v1/eventi` (a lotti), `/v1/da-coach?dopo=…` + tempo reale, `/v1/foto/url`, `/v1/chat`, `/v1/contratti`, `/v1/pagamenti`, `/v1/revoca`. Schema JSON per ogni evento e test di compatibilità app–servizio.

## 8. Regole sui cambiamenti
- **Sedute già fatte:** il coach può **solo commentare**; i dati registrati non cambiano mai.
- **Sedute da fare:** il coach dell'ambito le **modifica direttamente**; l'allievo vede un avviso «modificato dal coach» con le differenze e può **annullare una volta**.
- **Piano alimentare:** solo il nutrizionista; stesso avviso all'allievo.
- **Un autore alla volta per area:** versioni numerate; se l'allievo e il coach modificano la stessa seduta, vince l'ultima e l'altro viene avvisato.
- **Il coach a regole diventa consigliere:** le regole restano come suggerimenti, **non modificano** nulla da sole quando c'è un coach reale; le salvaguardie di sicurezza restano.
- **Il consenso umano è sempre necessario** (capitolo 9): nessun suggerimento automatico arriva all'allievo senza che il coach lo abbia letto e accettato.

## 9. Suggerimenti e rapporti per il coach (consenso umano sempre)
**Cosa fa il sito:** per ogni allievo prepara un **rapporto** periodico (e a richiesta) usando le **stesse regole dell'app** (mappa delle regole, regole RIC, carichi, prontezza, dolore) e le ricerche citate, e propone **suggerimenti** al coach, ognuno con: cosa cambiare, **perché**, **codice della regola** e **fonte**.

**Come lavora il coach:**
1. Arriva nella **coda «Da rivedere»** (ordinata per priorità: dolore, calo prestazioni, seduta saltata…).
2. Apre il rapporto e **lo legge per intero**: l'accettazione dei suggerimenti si abilita solo dopo l'apertura di tutte le sezioni e una conferma esplicita «ho letto il rapporto». (Il sistema non può provare che il coach abbia davvero letto: registra apertura, tempi e conferma, e ogni accettazione richiede un gesto per suggerimento.)
3. Per ogni suggerimento: **accetta**, **modifica** o **rifiuta** (con motivo facoltativo). Solo allora la modifica passa all'allievo con l'avviso del capitolo 8.
4. Resta il **registro**: versione del rapporto, chi ha letto, cosa ha accettato, quando.

**Perché è anche una tutela legale:** una decisione che incide sulla salute presa **solo** da un sistema automatico è limitata dal GDPR (art. 22); con il coach che legge, decide e firma l'azione, la decisione è **umana**. Il rapporto è **supporto**, non prescrizione.

**Motore condiviso:** le regole dell'app sono codice JavaScript senza server. Per non scrivere due volte le regole, si estrae un **pacchetto condiviso** (`regole-3in`: libreria esercizi + regole + parametri + catalogo), usato dall'app e dal servizio. La mappa e il catalogo diventano la fonte unica. Il pacchetto viene versionato: ogni rapporto riporta la versione delle regole.

**Il Coach IA:** facoltativo, solo per **scrivere meglio** il rapporto (riassunti, spiegazioni); non decide numeri; ogni testo prodotto dall'IA è **etichettato** come tale; invio dei dati con consenso (come oggi).

**Nutrizione:** le regole dell'app sul corpo e l'alimentazione sono oggi **solo informative** (famiglie COR e BIA). Per il nutrizionista servono **regole nutrizionali nuove, scritte e validate da un professionista**: non si inventano dai dati dell'app. Fino ad allora il rapporto nutrizionale mostra dati e andamenti, senza suggerimenti di dieta.

## 9b. Il sito del coach
Pagine: elenco allievi con avvisi · scheda allievo (calendario e aderenza, sedute, grafici, foto a confronto, misure) · editor del programma (stessa libreria esercizi dell'app, pacchetto condiviso) · chat · contratti e moduli · listino e incassi · profilo.

Grafici: carico massimo stimato per esercizio · volume per gruppo muscolare · aderenza · RPE · peso e massa magra · prontezza.

Avvisi: seduta saltata · dolore segnalato · prontezza bassa · carico sceso due volte · nuova foto/misura · messaggio nuovo.

**Sito allievo:** chat con il coach e descrizioni dettagliate (schede, note, allegati) · contratto e moduli · pagamenti e ricevute · progressi in sola lettura · gestione del consenso e cancellazione dati.

## 10. Pagamenti (a pacchetto)
- **Modello:** l'allievo paga **il pacchetto in un'unica soluzione** (o a rate, da decidere); la piattaforma trattiene una **commissione**.
- **Fondi a tappe:** la piattaforma incassa e **trasferisce al coach man mano** che il servizio viene svolto (videochiamata svolta, settimana completata). Così il **passaggio a un altro coach** e i **rimborsi** sono possibili senza dover recuperare soldi già pagati.
- **Tecnica consigliata:** **Stripe Connect** (incasso separato dai trasferimenti ai coach, verifica d'identità dei coach).
- **Da definire con un legale/commercialista:** diritto di recesso del consumatore (14 giorni) e servizi già avviati, rimborsi, fatture (il coach all'allievo; la piattaforma al coach per la commissione), IVA, ritenute.
- **Store:** il pagamento avviene sul **sito allievo**, non nell'app. Per i servizi da persona a persona le linee guida degli store hanno regole particolari: **da verificare** sulla versione aggiornata prima dell'invio.

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
- L'app deve poter **ricevere i suggerimenti accettati** dal coach (con l'avviso «modificato dal coach») e mostrare **chi** ha cambiato **cosa**; regole e libreria passano a un **pacchetto condiviso** con il servizio.
- Fase successiva: **diario alimentare** (necessario per il servizio nutrizionista).
- Testi in it/en/es/de, informativa, test (`tests/browser/coaching.js`), documenti aggiornati.

## 13. Privacy, legge e store (prima del lancio)
- **Archivio e cancellazione:** alla fine del pacchetto i dati passano in **archivio a sola lettura** per un periodo fisso (**da decidere con un legale: proposta di partenza 12 mesi**), poi vengono **cancellati** in modo definitivo, con **avviso** all'allievo e al coach e possibilità di **esportare** prima (file scaricabile). Restano **per i tempi di legge** solo contratti e fatture (in genere 10 anni), separati dai dati di salute. L'allievo può chiedere la cancellazione anticipata (salvo gli obblighi di legge). Le chat e le note seguono lo stesso periodo.
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
   **Troppa fiducia nel rapporto:** il coach potrebbe accettare senza pensare. Mitigazioni: lettura registrata, un gesto per suggerimento, motivi e fonti sempre visibili, parole prudenti.
   **Dati condivisi nel team:** il nutrizionista legge dati di allenamento e viceversa: serve consenso chiaro e registro accessi.
   **Elenco pubblico dei coach:** responsabilità sulla verifica dei titoli e sulla pubblicità sanitaria.
6. **Sincronizzazione** (offline, versioni diverse dell'app).
7. **Videochiamate:** costi, qualità, privacy, assenze (coach che non si presenta), controversie.
8. **Pacchetti a lunga durata:** rischio di rimborsi e contestazioni; serve un contratto chiaro e fondi trattenuti a tappe.
9. **Passaggio del percorso:** cambia il titolare dei dati; senza consenso e nuovi moduli è una violazione.

## 15. Fasi
| Fase | Contenuto | Risultato |
|---|---|---|
| 0. Decisioni e legale | domande aperte, consulenza legale (contratto, pacchetti, recesso, nutrizione, pubblicità sanitaria, GDPR, **forma societaria**), fornitore video, fornitore pagamenti, nome e dominio | via libera scritto |
| 1. Fondamenta | account coach/allievo/admin, verifica coach, **elenco coach e pacchetti**, abbinamento, contratto e moduli | un coach e un allievo collegati, senza pagamenti |
| 2. Dati e grafici | invio sedute/carichi/programma, scheda allievo, grafici, aderenza, avvisi | coach in «sola lettura» completo |
| 3. Rapporti e suggerimenti | pacchetto condiviso delle regole, rapporto, coda «Da rivedere», lettura obbligatoria, registro | coach assistito con consenso umano |
| 4. Comunicazione | **chat** (app e sito allievo), icona «Coaching», modifica delle sedute da fare | ciclo completo |
| 5. Videochiamate | calendario, prenotazione e spostamento, chiamata nel sito, registro delle svolte | pacchetto utilizzabile |
| 6. Soldi | Stripe Connect, pacchetti, fondi a tappe, ricevute e fatture, rimborsi | servizio a pagamento |
| 7. Continuità | **passaggio del percorso ad altro coach**, archivio e cancellazione programmata, esportazione dati | tutela dell'allievo |
| 8. Foto e misure | foto a confronto, misure/BIA, prontezza e dolore | |
| 9. Team e nutrizione | secondo professionista, **chat di coordinamento**, vista condivisa, diario e piano alimentare, regole nutrizionali validate | servizio completo |
| 10. Scala | cifratura end-to-end, studi/team di coach, app desktop, assistenza, recensioni | |
| Parallela | prove di sicurezza (come `docs/SICUREZZA.md`), privacy store, revisione legale continua | |

Ordine consigliato: partire **con coach di allenamento** e portare nutrizione e team in fase 9, perché hanno più rischio legale. Le fasi 5-7 (video, soldi, continuità) sono il cuore commerciale: **non lanciare a pagamento senza averle tutte e tre**. Da confermare.

## 16. Domande ancora aperte
**Decise:** pacchetto a durata fissa con videochiamate, chat a tre + chat di coordinamento riservata, archivio con cancellazione, coach solo con account e passaggio del percorso, videochiamata + chat.

**Da decidere**
1. **Archivio:** per quanto tempo? (proposta: 12 mesi dopo la fine del pacchetto, poi cancellazione; contratti e fatture separati, 10 anni). Verifica con un legale.
2. **Videochiamate:** quante volte il coach e l'allievo possono spostarle, preavviso minimo, cosa succede se l'allievo non si presenta, cosa succede se non si presenta il coach, quando scadono quelle non usate.
3. **Pacchetto completo:** le chiamate sono con ciascun professionista, di gruppo o miste?
4. **Prezzo e commissione:** chi stabilisce i prezzi (il coach, la piattaforma, un intervallo)? Quanto trattiene la piattaforma? Pagamento unico o a rate?
5. **Rimborsi e recesso:** regole in caso di rinuncia a metà percorso o di ritiro del coach; diritto di recesso di 14 giorni.
6. **Responsabilità del titolare:** da persona fisica si risponde con il proprio patrimonio; valutare una forma societaria o un'assicurazione **prima** di aprire a pagamenti e dati di salute.
7. **Passaggio del percorso:** chi sceglie il nuovo coach? L'allievo può rifiutare e avere il rimborso? E se non c'è nessun coach disponibile?
8. **Rapporto:** frequenza (settimanale, a ogni seduta, a richiesta)? Il coach può delegare la **lettura del rapporto** (diversa dalla videochiamata, che non si delega)?
9. **Obbligo di lettura:** basta apertura di tutte le sezioni + conferma, o un controllo più stretto?
10. **Regole nutrizionali:** chi le scrive e le valida (professionista esterno consulente)?
11. **Fornitore video** (e se è il caso un'alternativa semplice: link a un servizio esterno scelto dal coach, con meno controllo ma meno lavoro e costi).
12. **Recensioni** nell'elenco coach: subito, dopo, mai?
