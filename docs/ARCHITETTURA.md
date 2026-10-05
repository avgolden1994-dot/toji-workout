# Architettura di 3in

App web installabile (PWA) per allenamenti, calendario e coach. Nessun server, nessun build: si apre `index.html`. I dati stanno solo nel telefono (localStorage; brani MP3 e foto dei progressi in IndexedDB). Nessuna parte dell'app manda dati a un server del titolare (aggiornato il 2026-10-05: il Coach IA, che li mandava a un Worker Cloudflare con consenso separato, è stato rimosso per intero). Le funzioni facoltative di terzi contattano quei terzi: i player YouTube/Spotify del cedimento caricano i loro script solo se l'utente ha scelto un brano YouTube o Spotify, pdf.js si carica da cdnjs solo quando si importa un PDF, e alcuni link (YouTube, Google Calendar) si aprono nel browser.

## Come è fatto

```
index.html          markup delle schermate + elenco ordinato di fogli di stile e script
toji.html           vecchio indirizzo: rimanda a index.html (per chi ha già installato l'app)
sw.js               service worker: l'app parte anche senza rete (elenco file generato)
manifest.json       dati di installazione (nome 3in, icone)
favicon-32.png      icona nella scheda del browser (ricavata da icon-512.png)
css/                stile, un file per area, nell'ordine in cui si applicano
js/lingue/          dizionari en/es/de (una frase per riga) + traduttore automatico
js/core/            fondamenta: costanti, stato condiviso (timer, cedimento, musica), storage, modalità, navigazione,
                    utility, audio (silenzioso, convivenza con le altre app), nativo (Capacitor), backup, consenso, service worker
js/dati/            dati fissi: schede pronte (anche dell'epoca d'oro), libreria esercizi, dettagli (attrezzo, presa, focus,
                    muscolo bersaglio), disegni, schede tecniche, varianti, scheda unica
js/coach/           il coach a regole (vedi docs/coach-mappa-regole.md)
js/ui/              le schermate: oggi, piano, allenamento, musica, progressi, calendario, opzioni, guida…
js/avvio.js         ultimo script: accende l'app
esercizi/           disegni SVG degli esercizi
tools/              strumenti di manutenzione: generano sw.js, il catalogo delle regole, l'indice, la mappa dei simboli e il grafo
tests/              controlli automatici (*.test.js con npm test; tests/browser/ prove lunghe)
docs/               documenti (indice-codice.md e mappa-simboli.md sono generati)
graphify-out/       grafo del codice per gli agenti (generato da npm run grafo)
```

## Regole del gioco

1. **Script classici, scope globale.** Ogni file è uno script normale: le funzioni e le costanti sono globali (molte anche `window.nome`, perché l'HTML usa `onclick="nome()"`). Non ci sono moduli ES né bundler: aggiungere un file = aggiungere una riga in `index.html` e lanciare `npm run sw`.
2. **L'ordine in `index.html` conta, ma poco, e non ci sono wrapper.** Quasi tutto si chiama solo a schermata aperta, quando ogni file è già caricato. Al caricamento servono: `js/core/ripristino-guida.js` prima di `js/core/storage.js` (ripristina i dati veri prima che qualcuno li legga), `js/core/costanti.js` prima di `js/core/stato-condiviso.js` (`FAILURE_SET_SECONDS`), `js/avvio.js` per ultimo e `js/coach/regia/fasi.js` subito dopo `js/coach/parametri.js` (offre `registraFase`, che i file delle regole chiamano mentre si caricano). **Nessun file riassegna una funzione di un altro file** (dall'onda 1: prima `regole-nuove.js` e `intensita.js` avvolgevano `caricoProssimo` con `const prima = window.f; window.f = function…`, e l'ordine delle regole era l'ordine degli script, scritto da nessuna parte). Ora le quattro catene dei carichi (`caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta`) sono *fasi registrate*: ogni regola chiama `registraFase(punto, ordine, codice, fn)` con un **ordine scritto** (un numero, con dei vuoti: 10, 20, 50…), due fasi con lo stesso ordine sono un errore, e l'elenco dei punti e dei numeri è in testa a `js/coach/regia/fasi.js`. Una regola nuova registra la sua fase: non avvolge niente. Un `const` di primo livello non è una proprietà di `window`: i moduli facoltativi si cercano con `typeof X === 'function'`. L'elenco dei vincoli al caricamento, ricavato dal codice, è in testa a `docs/mappa-simboli.md`. `npm test` controlla ripristino-guida, avvio e che nessun file riassegni una funzione di un altro; `npm run simboli -- --check` (dentro `npm run controlla`) fallisce se un file usa al caricamento un nome definito più avanti.
3. **Un nome, un file.** Nessuna funzione o costante globale può essere definita in due file (lo controlla `npm test`).
4. **I dati sono in localStorage**, con chiavi `coach_plus_*` e `tz_*`. Il suffisso `_toji` delle chiavi è l'identificatore interno storico della modalità: **non va rinominato** senza una migrazione, altrimenti gli utenti perdono schede e storico. Anche l'UID `@tojiworkout` dei file calendario resta (cambiarlo duplicherebbe gli eventi già importati).
5. **Il coach è un motore a regole**, non un'IA. (Aggiornato il 2026-10-05: il Coach IA separato, `js/coach/coach-ia.js`, che aveva un suo consenso e poteva solo commentare, è stato rimosso per intero. I commenti già salvati nelle sedute, campo `commentoIA`, restano nei dati e nei backup ma non vengono mostrati.)
6. **Lingue.** Il testo nel codice è italiano. Le altre lingue si traducono con `tr()` e con il traduttore automatico che cerca la frase italiana nei dizionari `js/lingue/*.js`. Ogni frase nuova va aggiunta in en, es e de (lo controlla `npm test`). I numeri nelle frasi si scrivono `#`.
7. **Regole spegnibili, sempre accese e bloccate.** Una regola nuova del coach si spegne: la sua riga in `docs/coach-mappa-regole.md` dice «(spegnibile)», `npm run catalogo` la scrive nel catalogo e `regolaAttiva(codice)` la spegne con `tz_regole_spente`, senza toccare `parametri.js` (l'elenco `REGOLE_SPEGNIBILI` resta solo per le regole di prima): in produzione si spegne la regola, non si torna indietro di un'onda. Le **salvaguardie** (tolgono, riducono o rinviano a un professionista: niente cedimento a chi non può, profilo minorenne, età obbligatoria), la regia e le correzioni di coerenza restano sempre accese e si marcano «(storica: sempre accesa)» o «(sempre accesa: motivo)». Una regola del registro C.2 (`docs/coach-v2-decisioni.md`) è **bloccata**: la sua riga dice «(bloccata)» (o «(parte b bloccata)»), non si implementa nemmeno come testo e `regolaAttiva` per lei è sempre falsa. Ogni codice ha il suo sotto-coach nel capitolo 0 della mappa, che il catalogo legge.
8. **Cache.** Cambiando i file cambia il nome in `CACHE_NAME` di `sw.js` (oggi `3in-v14`: ogni onda del coach v2 lo alza di uno, una volta sola per integrazione; l'onda 1 da `3in-v12` a `3in-v13`, la fusione con la rimozione del Coach IA a `3in-v14`) così i telefoni scartano le copie vecchie.

## Dove mettere una cosa nuova

| Voglio… | File |
|---|---|
| una nuova regola del coach | `js/coach/` (cartella dell'argomento) e la riga in `docs/coach-mappa-regole.md`, poi `npm run catalogo` |
| una nuova schermata | `js/ui/<nome>.js`, markup in `index.html`, stile in `css/` |
| un nuovo esercizio | `js/dati/libreria-esercizi.js`, la riga di `dettagli-esercizi.js` e quella di `attributi-esercizi.js` (classe, schema, crediti, stress per zona, attrezzo, cosa serve), la scheda tecnica; il disegno può mancare («Immagine in arrivo») |
| un numero nuovo del coach | un file `soglie-*.js` nella cartella del sotto-coach (`{ v, forza, fonte, regole }`), poi `npm run soglie` |
| una nuova frase | italiano nel codice + `js/lingue/en.js`, `es.js`, `de.js` |
| una nuova chiave di dati | `js/core/storage.js` e il backup in `js/core/backup.js` |

## Comandi

```
npm install          una volta
npm test             controlli di struttura, muscoli, avvio e cedimento in browser (~30 s)
npm run test:browser prove lunghe con tocchi veri (guida, macchinario occupato, carichi, statistiche…): le esegue tutte e riassume (22 file, circa 4 minuti; da sole)
npm run sw           rigenera l'elenco dei file di sw.js
npm run catalogo     rigenera js/coach/catalogo-regole.js da docs/coach-mappa-regole.md (capitolo 0: la squadra dei sotto-coach)
npm run soglie       rigenera docs/soglie-coach.md dai file js/**/soglie-*.js (--check: controlla)
npm run indice       rigenera docs/indice-codice.md
npm run simboli      rigenera docs/mappa-simboli.md (nomi globali: dove sono e chi li usa)
npm run trova -- n   dice dove è definito il nome n, chi lo usa e cosa usa
npm run grafo        rigenera graphify-out/ (serve graphify, vedi CLAUDE.md)
npm run controlla    tutto insieme (sw, catalogo, indice e mappa aggiornati, test, prove del cancello e dell'integrazione)
npm run collaudo:schede   collaudo del generatore di schede (criteri da preparatore, ~100 s sulla matrice standard); i report restano FUORI dal repo
npm run cancello -- <json> onda-N [--contro <json>]   soglie dell'onda (tools/cancello-collaudo.json): fallisce se un criterio le supera o peggiora
npm run integra      applica i docs/in-arrivo/*.json dei task (index.html, dizionari, mappa delle regole) nell'integrazione di fine onda (INT-N)
```

Le prove lunghe usano Chromium: `CHROMIUM=/percorso/chrome npm run test:browser` se non è in `/opt/pw-browsers/chromium`. La guida passa senza segnalazioni a 390×844 e a 360×640 (`tests/browser/guida.js`, `guida-tocchi.js`).

## Mappa rapida

- `docs/indice-codice.md` elenca ogni file con le sue funzioni, nell'ordine di caricamento.
- `docs/mappa-simboli.md` dice per ogni nome globale dove è definito e chi lo usa negli altri file (anche `onclick="nome()"`); `npm run trova -- nome` stampa la stessa cosa per un nome solo.
- `graphify-out/GRAPH_REPORT.md` e il grafo raggruppano il codice per aree, con nomi italiani (`tools/grafo-nomi.json`).
- `docs/mappa-per-agenti.md`: dove sta ogni funzione dell'app e i flussi principali.

Sono tutti generati (tranne la mappa per agenti): non si modificano a mano.
