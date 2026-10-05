---
name: ricerca-fitness
description: Ricerca web di alta qualità sul mondo fitness (ipertrofia, forza, powerlifting, S&C, nutrizione di base, recupero, psicologia dell'allenamento) per rafforzare le regole del coach e il generatore di schede di 3in. Da caricare PRIMA di cercare studi, blog di esperti, podcast o video, e per trasformare i risultati in regole con la forza dell'evidenza dichiarata. Trigger - ricerca fitness, impara dal web, studi su ipertrofia, meta-analisi, evidenze, podcast, video, regole del coach, nuova regola RIC, fitness research, hypertrophy evidence, strength training literature review.
---

# Ricerca fitness per il coach di 3in

Scopo: portare nel coach (`js/coach/`) e nel generatore di schede conoscenza **verificata**, con la forza dell'evidenza scritta accanto a ogni regola. Nessuna regola nasce da una frase sentita in un video.

**Prima di tutto leggi `references/rete.md`** (cosa è raggiungibile, sondato il 2026-10-05). In breve: in questo ambiente funziona **solo WebSearch**. WebFetch, curl, Playwright e le librerie per le trascrizioni YouTube passano dallo stesso proxy e trovano 403 su PubMed, YouTube, siti degli esperti, editori, API bibliografiche. Non perdere tempo a riprovare: il lavoro si fa con WebSearch e con la disciplina qui sotto. Elenco lungo di fonti: `references/fonti.md`.

## 1. Il ciclo di ricerca

Salta questa skill se la domanda riguarda solo codice o UI. Per i temi grandi: un sotto-agente per tema, in parallelo (CLAUDE.md: Sonnet per ricerca e scrittura, Opus per la revisione delle regole proposte, Haiku solo per conferme di titolo/PMID). Chi legge il report non rilegge i file.

**(a) Controllo lacune.** Cosa sa già il repo? Leggi in quest'ordine, solo quanto serve:
1. `graphify-out/GRAPH_REPORT.md`, poi `npm run -s trova -- <nome>` per un simbolo o `graphify query "parole" --budget 1500`.
2. `docs/ricerca-struttura-e-intensita.md` (tabelle con forza e fonte), `docs/coach-mappa-regole.md` (cap. 19 «Regole aggiunte dalla ricerca (RIC)» e il capitolo dell'area).
3. `js/coach/regole-ricerca.js`, `js/coach/regole-nuove.js`, `js/coach/biomeccanica.js`.
Ricerca di nuovo solo ciò che manca, è marcato «Moderata» o «preprint», o può essere stato superato da evidenza più recente.

**(b) Lista di domande.** 3-8 domande chiuse, ognuna con: popolazione (principiante/intermedio/avanzato, sesso, età, over 65), esito (ipertrofia, forza, aderenza, sicurezza), variabile, e **quale decisione dell'app cambierebbe** la risposta. Se nessuna decisione cambia, la domanda non vale la ricerca.

**(c) Cerca** (sezione 2). **(d) Verifica**: ogni numero in 2 fonti indipendenti, oppure marcato «fonte unica». **(e) Grada** (sezione 5). **(f) Scrivi** la nota `docs/ricerca-<tema>.md` (sezione 7). **(g) Trasforma in regole** (sezione 8), solo per ciò che è almeno Moderato e con salvaguardia.

## 2. Strategia di ricerca con WebSearch

- **Data**: `date +%F`; metti l'anno corrente nelle query e preferisci gli ultimi 3 anni. Un'idea vecchia va controllata contro revisioni recenti.
- **Pattern di query**: `<tema> meta-analysis <anno>`; `<tema> systematic review`; `<tema> umbrella review`; `<tema> position stand ACSM NSCA ISSN`; `<autore> <anno> <tema>`; `<nome studio> <anno> results`; `<tema> randomized trial trained men women`; per i dissensi `<tema> criticism limitations`.
- **`allowed_domains`** per cambiare la qualità dei risultati:
  - primarie: `["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","europepmc.org"]` restituisce titolo + URL + PMID dello studio vero (provato: Schoenfeld 2017 trovato al primo colpo). Serve a **identificare e datare** lo studio, anche se non puoi aprirlo;
  - un solo sito esperto: `["strongerbyscience.com"]` o `["mennohenselmans.com"]` fa uscire gli articoli di quel sito su quel tema;
  - titoli video: `["youtube.com"]` (solo titolo e URL, vedi sezione 4).
- **`blocked_domains`** per togliere rumore: `["gumroad.com","tiktok.com","pinterest.com"]` (programmi a pagamento e clip senza contenuto comparivano nelle query sui video).
- **Il riassunto è il contenuto.** WebFetch non apre le pagine: ciò che leggi è il riassunto del risultato, scritto da un modello su snippet. Quindi: cita i numeri **esattamente** come compaiono, con la fonte accanto; mai arrotondare, mai completare a memoria, mai citare ciò che non è nei risultati (autori, n, effetto, rivista). Se due query ripetono la stessa frase è lo stesso snippet, non una seconda fonte.
- **Triangolazione**: almeno 2 fonti **indipendenti** (non due blog che riassumono lo stesso studio). Schema ideale: 1 primaria (titolo/PMID da PubMed o PMC) + 1 pratica (esperto che la applica) + 1 critica se esiste. Se l'unica base è un blog, il tema resta «Convenzione».
- **Escavare**: parti largo (revisione), poi stringi sul sottotema (popolazione, esito); cerca il dato opposto («no effect», «no difference», «limitations»); segui i nomi degli studi citati nei riassunti e cercali per titolo.
- **Non aggirare la rete**: niente proxy alternativi, niente TLS disattivato, niente `unset HTTPS_PROXY`. Se l'utente ha cambiato le impostazioni di rete, prova UNA richiesta (`curl -sS -o /dev/null -w "%{http_code}" --cacert /root/.ccr/ca-bundle.crt https://host/`) e aggiorna `references/rete.md` e il registro.

## 3. Fonti a livelli (lista completa in `references/fonti.md`)

| Livello | Cosa | Come lo usi |
|---|---|---|
| **1** | Meta-analisi, revisioni sistematiche, umbrella review, posizioni ufficiali (ACSM, NSCA, ISSN, OMS, Cochrane); riviste peer-reviewed (Sports Medicine, J Strength Cond Res, MSSE, Br J Sports Med, Frontiers in Sports and Active Living, IJSPP) | Base per «Solida» / «Moderata». Preprint (SportRxiv, bioRxiv) = **non rivisti**, sempre segnalati |
| **2** | Ricercatori e allenatori basati sull'evidenza (Schoenfeld, Nuckols/Stronger By Science, Helms, Henselmans, Israetel/RP, Beardsley, Trexler, Zourdos, Tuchscherer, Baraki, Norton, Contreras, Aragon, Galpin, Phillips...) e i loro podcast | Spiegano e applicano gli studi: utili per trovare lo studio e per la pratica, non sostituiscono lo studio. Un parere è «Convenzione» finché non si ritrova la base |
| **3** | Forum, bro-science, social, programmi a pagamento, classici (Arnold, Yates, Mentzer, Poliquin, Westside) | Solo «Convenzione», dichiarata. I classici vanno con il giudizio moderno accanto (come in `docs/ricerca-struttura-e-intensita.md`, cap. 2) |

**Bandiere rosse** (abbassano la forza o fanno scartare):
- studio singolo trasformato in titolo («studio rivoluzionario»); effetto non replicato;
- EMG o meccanismo (attivazione, segnalazione cellulare) esteso a risultati di crescita o forza;
- studi su roditori o su cellule; n piccolo (poche decine in tutto); durata di poche settimane per un'affermazione sul lungo periodo;
- popolazione diversa dall'utente (solo giovani maschi non allenati per un consiglio ad over 65 o donne);
- conflitto di interessi: chi vende integratori, programmi, app o coaching sul tema; sponsor del prodotto studiato;
- numeri senza fonte, «secondo gli studi» senza nome; citazione di una citazione;
- certezze assolute («sempre», «mai») su temi con dissenso noto.

## 4. Video e podcast (YouTube, podcast: non si possono aprire)

Protocollo, perché le trascrizioni non sono raggiungibili:
1. **Trova**: `WebSearch` con `allowed_domains ["youtube.com"]` (o il sito del podcast, `["strongerbyscience.com"]`) per titolo, URL, episodio, a volte descrizione, capitoli o note con gli studi citati. Il sito dello show spesso ha note con orari e carte citate: cerca lì.
2. **Estrai solo ciò che hai visto** nei risultati. Scrivi l'affermazione come **«riportato da <persona> (video/podcast "<titolo>", <anno>), da verificare»**. Mai virgolette con parole che non hai letto; mai «ha detto che» senza il testo davanti.
3. **Risali allo studio**: cerca titolo/autore/anno con `allowed_domains` PubMed/PMC. Se lo trovi, **valuti lo studio** (sezione 5), non la persona, e la fonte diventa lo studio (+ la persona come divulgatore).
4. Se lo studio non si trova, l'affermazione resta «Convenzione» e **non diventa regola**. Se serve davvero, mettila tra le «Domande aperte».
5. Riassunti di siti terzi su un video (fitness news, blog) sono livello 3: servono per capire di cosa parla il video, non come prova.
6. **Per ottenere trascrizioni vere** serve che l'utente cambi la rete dell'ambiente (host esatti e passi in `references/rete.md`, sezione «Cosa sbloccare»). Chiedilo con poche righe e prosegui con il resto del lavoro.

## 5. Grado dell'evidenza (identico a `docs/ricerca-struttura-e-intensita.md`)

| Forza | Significato |
|---|---|
| **Solida** | Meta-analisi o posizione ufficiale concordi |
| **Moderata** | Pochi studi controllati, o risultati che cambiano con la popolazione; preprint in coerenza con altro |
| **Convenzione** | Pratica comune dei coach senza prove dirette: costa poco e non ha controindicazioni, ma si dice |
| **+ Contrastata** | Bandiera aggiunta quando fonti di pari livello non concordano: descrivi le due posizioni e di' quale adotta il coach e perché (prudenza) |

Per assegnarla annota sempre: tipo di studio (RCT, meta-analisi, osservazionale, caso), **n**, popolazione (allenati/non allenati, sesso, età), durata, **effetto** (SMD, % di massa, kg, con intervallo se c'è), preprint sì/no, replicazione, conflitti di interessi e **limiti**. Regole:
- fonte unica secondaria (blog, video, riassunto) senza studio ritrovato = **Convenzione**;
- studio singolo o piccolo non replicato = al massimo **Moderata**;
- un preprint si scrive «(preprint <anno>)» e non basta da solo per «Solida»;
- ogni affermazione ha **nome della fonte + anno**; niente fonte vista = niente citazione;
- limiti sempre scritti (popolazione, durata, preprint, conflitti): la sezione «Limiti onesti» del documento esistente è il modello.

## 6. Salute, nutrizione, integratori, infortuni

L'app **informa e segnala prudenza**; non diagnostica e non prescrive (cap. 14 «Salvaguardie e messaggi di salute» di `docs/coach-mappa-regole.md`, e COR-03 «informazione, non prescrizione»; `docs/SICUREZZA.md` riguarda la sicurezza del software, non la salute). Per questi temi:
- regole **conservative** che alzano la prudenza (più riposo, meno carico, invito a fermarsi), mai regole che spingono oltre;
- ogni regola ha una **soglia di rinvio al medico** esplicita (dolore acuto o che peggiora, sintomi al petto, svenimenti, formicolii o perdita di forza improvvisi, segnali di disturbi alimentari): scritta nel motivo mostrato all'utente;
- niente calorie, macro o integratori come prescrizione; solo informazione generale con la forza dell'evidenza, e rinvio a un professionista per casi particolari (patologie, gravidanza, farmaci, minorenni);
- le salvaguardie esistenti (PAR-Q, over 65, principianti, dolore, scarico) hanno **sempre la precedenza**.

## 7. Modello della nota di ricerca: `docs/ricerca-<tema>.md` (in italiano)

```markdown
# Ricerca: <tema in una riga>
Ambito: cosa copre e quali regole/aree del coach tocca (codici, es. RIC, ABB, INT). Data della ricerca e come si legge la «forza» (Solida / Moderata / Convenzione, + Contrastata).

## 1. Cosa dicono le fonti
| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| ... | numeri e popolazione esatti, come compaiono | Moderata | Autore anno (rivista, n) |

## 2. Dove le fonti non concordano
Posizione A (fonte, anno) contro posizione B (fonte, anno); cosa adotta il coach e perché.

## 3. Regole proposte
| Codice proposto | Quando scatta | Cosa fa | Motivo (testo italiano per l'utente) | Forza | Rischio / salvaguardia | File / funzione da toccare |
|---|---|---|---|---|---|---|

## 4. Domande aperte
Cosa manca, cosa servirebbe leggere per intero (trascrizioni, full text), claim da video/podcast ancora «da verificare».

## 5. Limiti onesti
Popolazione, durata, preprint, rete (solo WebSearch), fonti secondarie.
```

## 8. Dalla ricerca alla regola (verificato su `package.json`, `tools/`, `js/coach/` il 2026-10-05)

Modello da leggere prima: `js/coach/regole-nuove.js` (RIC-01..05) e cap. 19 di `docs/coach-mappa-regole.md`.
1. **Codice e mappa**: aggiungi la riga `- **RIC-06** testo (fonte anno): quando scatta e cosa fa` nel cap. 19 (formato `- **XXX-NN** ...`; i codici devono essere unici). Da lì `npm run catalogo` genera `js/coach/catalogo-regole.js`.
2. **Spegnibile**: aggiungi il codice a `REGOLE_SPEGNIBILI` in `js/coach/parametri.js` e usa `regolaAttiva('RIC-06')`. Soglie e fattori in `COACH_PARAMETRI` (stesso file), non sparsi nelle funzioni.
3. **Consenso**: la regola agisce solo con `coachAttivo()`. Rispetta le salvaguardie (come RIC-01/02: non scatta per prudente, over 65, principianti, dolore, scarico).
4. **Motivo scritto in italiano** nella nota dell'esercizio o nel messaggio, con fonte e anno; e **annullabile** dove cambia il piano (vedi `applicaDecisioni` / «ripristina», cap. 10).
5. **File nuovo** = una riga `<script src>` in `index.html` al posto giusto dell'ordine di caricamento (i vincoli di ordine sono in testa a `docs/mappa-simboli.md`) + `npm run sw` (riscrive l'elenco asset). **Alza a mano `CACHE_NAME`** in `sw.js` (ora `3in-v11`; `npm run sw` non lo cambia).
6. **Un nome = un file** (`npm test` lo controlla). Frasi nuove anche in `js/lingue/en.js`, `es.js`, `de.js` (chiave = testo italiano; `npm test` controlla che le tre lingue abbiano le stesse chiavi).
7. **Test**: un caso in `tests/browser/regole-nuove.js` (modello: profilo, programma e storico via `localStorage`, poi `caricoProssimo(...)`) o un nuovo file. `npm test` lancia solo i quattro file elencati nello script `test` di `package.json`: un file di test nuovo va aggiunto lì. `npm run test:browser` per le prove lunghe (`tests/browser/intensita-bia.js` fallisce già da prima, non è una regressione).
8. **Rigenera**: `npm run catalogo`, `npm run indice`, `npm run simboli`, e `npm run grafo` (graphify: `python3 -m venv /tmp/gfy && /tmp/gfy/bin/pip install graphifyy` una volta; non basta `graphify update .`); `npm run grafo:verifica` dice se il grafo è aggiornato.
9. **Prima del commit**: `npm run controlla` (sw, catalogo, indice, simboli + `npm test`, circa 30 s). Aggiorna anche la nota in `docs/` e il cap. 19 con il codice e la fonte.

## Registro degli apprendimenti

Chi usa questa skill aggiunge **in coda** una riga per ciò che ha funzionato o no (query, filtri, formati, host sbloccati). Formato: `- AAAA-MM-GG | cosa | esito / consiglio`.

- 2026-10-05 | WebSearch senza filtri su «<podcast/persona> + tema» | Riassunto di 2-4 frasi con numeri (es. RIR: errore medio circa 1 ripetizione, 0,95; ≤12 ripetizioni più preciso) e link; **nessun nome di studio né DOI** nel testo. Usare per orientarsi, non per citare da sola.
- 2026-10-05 | WebSearch con `allowed_domains` PubMed/PMC | Ottimo per **titoli e PMID** (Schoenfeld 2017: PMID 27433992; trovata anche una meta-regressione su volume e frequenza, PMID 41343037). Il riassunto sotto può essere impreciso: controlla titolo e anno dai link, non dal testo.
- 2026-10-05 | WebSearch con `allowed_domains ["strongerbyscience.com"]` | Elenca gli articoli del sito (rep in reserve, effective reps, autoregulation), il riassunto ripete gli stessi snippet. Buono per sapere **cosa esiste** da leggere.
- 2026-10-05 | WebSearch con `allowed_domains ["youtube.com"]` | Solo titoli e URL di video (e Shorts); nessuna trascrizione né capitoli. Dalla ricerca senza filtro compaiono anche TikTok e Gumroad: usa `blocked_domains`.
- 2026-10-05 | WebFetch / curl / Playwright / `youtube-transcript-api` | Tutti bloccati (403 sul tunnel) su PubMed, YouTube, editori, siti degli esperti. Dettagli e host da sbloccare: `references/rete.md`.
- 2026-10-05 | Titoli di studi 2024-2025 comparsi nei risultati | Sono stati ritrovati solo come titolo/URL: prima di usarli in una regola serve altra ricerca che ne mostri n, popolazione ed effetto.
