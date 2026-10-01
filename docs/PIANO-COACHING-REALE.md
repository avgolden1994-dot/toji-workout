# Piano: coaching con un coach reale (portale web/desktop collegato all'app 3in)

Stato: **bozza di architettura** (1 ottobre 2026). Decide cosa costruire e in che ordine; i dettagli si discutono dopo. Progetto a parte rispetto all'app: nuovo repository (`3in-coach`), che parla con l'app attraverso un contratto di eventi (capitolo 6).

## 1. Cosa vogliamo
- Un **coach reale** crea un codice sul sito. L'atleta lo inserisce nell'app, **accetta cosa condividere**, e da quel momento il coach vede in tempo reale: programma, sedute fatte, carichi, ripetizioni, RPE, misure/BIA, foto, prontezza, note di dolore.
- Il coach vede tutto con **grafici** (progressi, volume, aderenza, peso corporeo) e può **mandare il programma** e commenti.
- Tutto **solo se l'atleta attiva il coaching** con il codice, e **revocabile** in ogni momento da entrambe le parti.
- L'app resta **utilizzabile da sola**, offline, senza account (come oggi). Il coaching è un'aggiunta, non un obbligo.

## 2. Principi (non negoziabili)
1. **Locale prima di tutto.** I dati restano sul telefono; al server va una copia solo dopo il consenso, solo delle categorie scelte.
2. **Consenso a categorie e revocabile**, mostrato in chiaro (come il consenso del Coach IA: elenco esatto di cosa esce).
3. **Dati di salute = dati sensibili** (GDPR art. 9): consenso esplicito, server in UE, cancellazione su richiesta, registro degli accessi del coach.
4. **Le regole di sicurezza del coach a regole restano** (PAR-Q, over 65, dolore): un coach reale può decidere i numeri, non spegnerle in silenzio. Se le supera, l'app lo dice all'atleta.
5. **Il server non è la fonte di verità dell'allenamento**: l'app registra, il server riceve e mostra.

## 3. Panoramica

```
 ATLETA (app 3in)                         SERVIZIO                    COACH (sito / app desktop)
 ┌────────────────────┐   HTTPS/WSS   ┌──────────────────────┐   WSS   ┌───────────────────────┐
 │ dati in localStorage│──eventi──────▶│ API + database (UE)  │────────▶│ dashboard in tempo     │
 │ coda di invio       │               │ foto: archivio privato│        │ reale, grafici, foto,  │
 │ (funziona offline)  │◀──programma───│ realtime (WebSocket)  │◀───────│ editor del programma   │
 │ Opzioni>Coaching    │   messaggi    │ accessi registrati    │ azioni  │ messaggi, avvisi       │
 └────────────────────┘               └──────────────────────┘         └───────────────────────┘
        ▲ codice di abbinamento (6-8 caratteri, scade in 10 minuti, monouso)  │
        └─────────────────────────────────────────────────────────────────────┘
```

## 4. Come ci si collega (abbinamento)
1. Il coach, dal sito, preme «Nuovo atleta»: il server genera un **codice** (es. `K7M-4QX`), valido 10 minuti, monouso, legato a quel coach.
2. L'atleta apre **Opzioni → Coaching reale**, inserisce il codice.
3. L'app mostra il **consenso**: nome del coach, elenco di cosa verrà condiviso, con un interruttore per categoria:
   programma · sedute e carichi · misure e BIA · foto · prontezza e dolore · risposte del questionario di salute.
   Le ultime due sono spente di default e spiegate.
4. Il server crea il **collegamento** e dà all'app un **token di collegamento** (salvato solo sul telefono, mai nei backup).
5. L'app invia lo **storico già esistente** (solo se l'atleta lo sceglie: «da oggi» oppure «anche il passato») e poi gli eventi nuovi.
6. **Revoca:** dall'app («Interrompi coaching») o dal sito. Il token muore subito; l'atleta sceglie se cancellare anche i dati già inviati (default: sì dopo 30 giorni, avvisando il coach).

Perché non un account per l'atleta: meno attrito e nessuna gestione password/App Store (cancellazione account). Limite: se perde il telefono perde il collegamento (il coach può ripetere l'invito; i dati del server restano al coach finché dura il rapporto).

## 5. Dati: cosa si invia e cosa no
| Categoria | Esempi | Di default | Note |
|---|---|---|---|
| Programma | giorni, esercizi, serie, ripetizioni, pause | sì | il coach lo può modificare e rimandare |
| Sedute e carichi | serie fatte, peso, ripetizioni, RPE, durata, cardio | sì | cuore del servizio |
| Misure e BIA | peso, massa magra/grassa, circonferenze | scelta | cresce con l'uso |
| Foto | foto dei progressi | scelta, per foto | archivio privato, link a scadenza breve |
| Prontezza e dolore | punteggio, sonno, note di fastidio | scelta | utile al coach per il carico |
| Questionario di salute | risposte PAR-Q | **no** | solo il fatto «modalità prudente» se non condiviso |
| Mai | nome, e-mail, contatti, altri dati dell'app | – | il coach vede il nome che l'atleta sceglie |

## 6. Il contratto tra app e servizio
**Eventi dall'app** (append-only, con id univoco: l'invio si può ripetere senza duplicare). L'app li mette in una **coda** e li invia quando c'è rete.

| Evento | Contenuto minimo |
|---|---|
| `seduta.completata` | id, data, giorno, titolo, durata, per esercizio: serie (peso, ripetizioni, RPE, cedimento), note |
| `programma.cambiato` | versione, giorni/esercizi, chi l'ha cambiato (atleta, coach, coach a regole) + motivo |
| `misura.registrata` | data, tipo, valori |
| `foto.aggiunta` | id, data, tipo di posa, file caricato a parte |
| `prontezza.registrata` | data, punteggio, voci |
| `dolore.segnalato` | data, zona, scala, nota |
| `consenso.cambiato` | categorie attive |

**Dal coach all'app:** `programma.proposto` (l'atleta lo accetta o lo rifiuta; il precedente resta annullabile), `messaggio`, `commento.seduta`, `carico.indicato` (un carico suggerito per un esercizio).

**API (bozza):** `POST /abbina`, `POST /eventi` (a lotti), `GET /da-coach?dopo=…` (e notifica in tempo reale), `POST /foto/url-di-caricamento`, `POST /revoca`. Versionata (`/v1`), con schema JSON per ogni evento e test di compatibilità tra app e servizio.

## 7. Il sito del coach
**Pagine:** elenco atleti con avvisi · scheda atleta (calendario con aderenza, sedute, grafici) · seduta in dettaglio · progressi per esercizio · foto a confronto (prima/dopo, per data) · editor del programma · messaggi · impostazioni e fatturazione.

**Grafici:** carico massimo stimato per esercizio (nel tempo) · volume per gruppo muscolare a settimana · aderenza (sedute fatte/previste) · RPE medio · peso corporeo e massa magra · prontezza · mappa di calore dei gruppi.

**Avvisi utili:** seduta saltata · dolore segnalato · prontezza bassa per più giorni · carico sceso due sedute di fila · nuova foto · nuova misura.

**Editor del programma:** usa la **stessa libreria di esercizi dell'app** (pacchetto condiviso, una sola fonte) e invia un `programma.proposto`.

## 8. Come cambia l'app 3in (lavoro lato app)
- Nuova cartella `js/coaching/`: abbinamento, consenso a categorie, coda di invio, ricezione, schermata «Coaching reale» nelle Opzioni.
- **Il coach reale ha la precedenza sui numeri**, il coach a regole passa a «consigliere»: una famiglia di regole `COA` nella mappa. Restano attive le salvaguardie di salute.
- **CSP** (`connect-src`) da aprire verso il dominio del servizio; il **token di collegamento non entra nei backup** (come i consensi) e non si ripristina da file.
- Testi e traduzioni (it/en/es/de), informativa privacy, test (`tests/browser/coaching.js`), indice e mappa aggiornati.
- Il Coach IA resta separato; con il coach reale attivo si chiede quale dei due commenti mostrare (default: solo il coach).

## 9. Scelte tecniche (consiglio + alternativa)
| Tema | Consiglio per partire | Alternativa |
|---|---|---|
| Servizio | **Supabase (regione UE)**: Postgres, accessi per riga, tempo reale, archivio foto, login del coach già pronti | Cloudflare (già usato per il Coach IA): Workers + D1 + R2 + Durable Objects; più controllo, molto più lavoro da scrivere |
| Sito coach | **Web app responsive installabile (PWA)**, TypeScript, grafici con una libreria leggera | App desktop (Electron/Tauri) in una fase successiva, riusando lo stesso codice |
| Accesso coach | e-mail + link magico, **verifica a due passaggi** | login con Google/Apple |
| Accesso atleta | **nessun account**: token del collegamento | account opzionale più avanti (recupero del collegamento) |
| Cifratura | HTTPS + cifratura a riposo + foto in archivio privato con link a scadenza | **Cifratura end-to-end** (chiave nel codice di abbinamento: il server non legge nulla); più sicura per le foto, ma niente ricerca sul server e gestione dispositivi più complessa. Da valutare per la fase 4 |
| Realtime | WebSocket gestito dal servizio | polling ogni 30 s come ripiego |

## 10. Privacy, legge e store (da fare **prima** del lancio)
- **GDPR:** dati di salute (art. 9) → consenso esplicito, informativa chiara, valutazione d'impatto (DPIA), contratto con il fornitore (DPA), server UE, tempi di conservazione, esportazione e cancellazione su richiesta, registro degli accessi del coach visibile all'atleta.
- **Ruoli:** chi è titolare dei dati? (coach, tu, o entrambi). Serve un modello chiaro e termini di servizio per i coach (obbligo di riservatezza, nessun uso diverso).
- **Minori:** limite di età o consenso dei genitori.
- **App Store:** dati di salute e foto = privacy nutrition label accurata; se il coaching è un servizio a pagamento tra persone, valutare le regole sui pagamenti (le regole per servizi da persona a persona possono permettere un pagamento esterno: **da verificare con le linee guida aggiornate**); nessun obbligo di account per usare l'app (il nostro schema lo rispetta).
- **Non è un dispositivo medico:** niente promesse di cura; il coach non è un medico.

## 11. Rischi principali
1. **Privacy e fiducia** (foto e salute): è il rischio più grande; mitigazione: consenso a categorie, revoca facile, cancellazione, registro accessi, cifratura.
2. **Costi del servizio** (foto e tempo reale crescono con gli utenti): limiti per atleta, foto ridimensionate.
3. **Conflitto coach reale / coach a regole**: regole chiare su chi decide (sezione 8).
4. **Sincronizzazione**: duplicati, offline lungo, versioni diverse dell'app → eventi idempotenti, schema versionato.
5. **Modello di business non deciso** (chi paga: coach, atleta, nessuno).

## 12. Fasi
| Fase | Contenuto | Risultato |
|---|---|---|
| 0. Decisioni | modello di business, titolare dati, servizio (Supabase o Cloudflare), nome/dominio, bozza informativa | scelte scritte |
| 1. MVP in sola lettura | abbinamento + consenso + invio di sedute/carichi/programma; sito con elenco atleti, scheda atleta, 4 grafici | un coach vero segue un atleta vero |
| 2. Foto e tempo reale | foto con confronto, avvisi, misure/BIA, prontezza e dolore | il coach vede «in diretta» |
| 3. Il coach scrive | editor del programma, invio al telefono, commenti, messaggi | ciclo completo |
| 4. Scala | più coach/team, app desktop, cifratura end-to-end, esportazioni, pagamenti | prodotto |
| Parallela | revisione legale, privacy store, prove di sicurezza (come `docs/SICUREZZA.md`) | via libera al lancio |

## 13. Domande aperte (da decidere insieme)
1. Il coach è **uno** (tu) o ce ne saranno **molti** (una piattaforma)? Cambia tutto: account, fatturazione, team.
2. **Chi paga**, e come? (abbonamento coach, abbonamento atleta, solo coaching incluso)
3. L'atleta può avere **più coach** (es. allenatore e nutrizionista)? Consiglio: uno solo all'inizio.
4. Cosa succede ai dati se il coach **chiude l'account** o l'atleta **cancella l'app**?
5. Il coach può **modificare le sedute già fatte**? (consiglio: no, solo commentare)
6. Serve la **chat** dentro l'app o basta il commento sulle sedute? (consiglio: commenti subito, chat dopo)
7. **Cifratura end-to-end** subito o dopo? (consiglio: dopo, ma progettare lo schema perché sia possibile)
8. Lingue del sito: solo italiano all'inizio?
9. Servizi e dominio: nome del servizio (distinto da 3in?).
