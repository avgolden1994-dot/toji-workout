# Architettura di 3in

App web installabile (PWA) per allenamenti, calendario e coach. Nessun server, nessun build: si apre `index.html`. I dati stanno solo nel telefono (localStorage; brani MP3 e foto dei progressi in IndexedDB). Il Coach IA è l'unica parte che manda dati a un server (un Worker Cloudflare), e solo con consenso; i player YouTube/Spotify del cedimento caricano i loro script solo se l'utente ha scelto un brano YouTube o Spotify.

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
2. **L'ordine in `index.html` conta, ma poco.** Quasi tutto si chiama solo a schermata aperta, quando ogni file è già caricato. Al caricamento servono: `js/core/ripristino-guida.js` prima di `js/core/storage.js` (ripristina i dati veri prima che qualcuno li legga), `js/core/costanti.js` prima di `js/core/stato-condiviso.js` (`FAILURE_SET_SECONDS`), `js/avvio.js` per ultimo, e i file che **avvolgono** una funzione di un altro file (`const prima = window.f; window.f = function…`): `js/coach/regole-nuove.js` dopo `prontezza.js`, `dolore-mattina.js` e `regole-ricerca.js`; `js/coach/intensita.js` dopo `regole-nuove.js` (avvolge di nuovo `caricoProssimo`, la versione attiva è l'ultima caricata). L'elenco completo, ricavato dal codice, è in testa a `docs/mappa-simboli.md`. `npm test` controlla ripristino-guida e avvio; `npm run simboli -- --check` (dentro `npm run controlla`) fallisce se un file usa al caricamento un nome definito più avanti.
3. **Un nome, un file.** Nessuna funzione o costante globale può essere definita in due file (lo controlla `npm test`).
4. **I dati sono in localStorage**, con chiavi `coach_plus_*` e `tz_*`. Il suffisso `_toji` delle chiavi è l'identificatore interno storico della modalità: **non va rinominato** senza una migrazione, altrimenti gli utenti perdono schede e storico. `currentMode` (`js/core/costanti.js`) non è un aspetto grafico ma lo **spazio dei dati**: vale `'toji'`, ma esiste anche `_maki` per chi scelse Maki a settembre 2026 (chiavi `coach_plus_*_maki`, `tz_seeded_maki`, `tz_app_mode` = `maki`). Perciò non va trasformato in costante né normalizzato a `'toji'`: i dati di quegli utenti sparirebbero dalla vista. Anche l'UID degli eventi dei file calendario (`3in-AAAAMMGG@3in`, `js/ui/esporta-ics.js`) non va più cambiato: cambiarlo duplicherebbe gli eventi già importati (l'ultimo cambio è del 2026-10-05).
5. **Il coach è un motore a regole**, non un'IA. Il Coach IA (`js/coach/coach-ia.js`) è separato, ha il suo consenso e può solo commentare.
6. **Lingue.** Il testo nel codice è italiano. Le altre lingue si traducono con `tr()` e con il traduttore automatico che cerca la frase italiana nei dizionari `js/lingue/*.js`. Ogni frase nuova va aggiunta in en, es e de (lo controlla `npm test`). I numeri nelle frasi si scrivono `#`.
7. **Cache.** Cambiando i file cambia il nome in `CACHE_NAME` di `sw.js` (oggi `3in-v14` → `3in-v15`) così i telefoni scartano le copie vecchie.

## Dove mettere una cosa nuova

| Voglio… | File |
|---|---|
| una nuova regola del coach | `js/coach/` (cartella dell'argomento) e la riga in `docs/coach-mappa-regole.md`, poi `npm run catalogo` |
| una nuova schermata | `js/ui/<nome>.js`, markup in `index.html`, stile in `css/` |
| un nuovo esercizio | `js/dati/libreria-esercizi.js`, poi disegno/scheda in `js/dati/` |
| una nuova frase | italiano nel codice + `js/lingue/en.js`, `es.js`, `de.js` |
| una nuova chiave di dati | `js/core/storage.js` e il backup in `js/core/backup.js` |

## Comandi

```
npm install          una volta
npm test             controlli di struttura, muscoli, avvio e cedimento in browser (~30 s)
npm run test:browser prove lunghe con tocchi veri (guida, macchinario occupato, carichi, statistiche…)
npm run sw           rigenera l'elenco dei file di sw.js
npm run catalogo     rigenera js/coach/catalogo-regole.js da docs/coach-mappa-regole.md
npm run indice       rigenera docs/indice-codice.md
npm run simboli      rigenera docs/mappa-simboli.md (nomi globali: dove sono e chi li usa)
npm run trova -- n   dice dove è definito il nome n, chi lo usa e cosa usa
npm run grafo        rigenera graphify-out/ (serve graphify, vedi CLAUDE.md)
npm run controlla    tutto insieme (sw, catalogo, indice e mappa aggiornati, test)
```

Le prove lunghe usano Chromium: `CHROMIUM=/percorso/chrome npm run test:browser` se non è in `/opt/pw-browsers/chromium`. La guida passa senza segnalazioni a 390×844 e a 360×640 (`tests/browser/guida.js`, `guida-tocchi.js`).

## Mappa rapida

- `docs/indice-codice.md` elenca ogni file con le sue funzioni, nell'ordine di caricamento.
- `docs/mappa-simboli.md` dice per ogni nome globale dove è definito e chi lo usa negli altri file (anche `onclick="nome()"`); `npm run trova -- nome` stampa la stessa cosa per un nome solo.
- `graphify-out/GRAPH_REPORT.md` e il grafo raggruppano il codice per aree, con nomi italiani (`tools/grafo-nomi.json`).
- `docs/mappa-per-agenti.md`: dove sta ogni funzione dell'app e i flussi principali.

Sono tutti generati (tranne la mappa per agenti): non si modificano a mano.
