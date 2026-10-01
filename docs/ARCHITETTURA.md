# Architettura di 3in

App web installabile (PWA) per allenamenti, calendario e coach. Nessun server, nessun build: si apre `index.html`. I dati stanno solo nel telefono (localStorage). Il Coach IA è l'unica parte che parla con un server (un Worker Cloudflare), e solo con consenso.

## Come è fatto

```
index.html          markup delle schermate + elenco ordinato di fogli di stile e script
toji.html           vecchio indirizzo: rimanda a index.html (per chi ha già installato l'app)
sw.js               service worker: l'app parte anche senza rete (elenco file generato)
manifest.json       dati di installazione (nome 3in, icone)
favicon-32.png      icona nella scheda del browser (ricavata da icon-512.png)
css/                stile, un file per area, nell'ordine in cui si applicano
js/lingue/          dizionari en/es/de (una frase per riga) + traduttore automatico
js/core/            fondamenta: costanti, storage, modalità, navigazione, utility, audio, backup, consenso
js/dati/            dati fissi: schede pronte, libreria esercizi, dettagli (attrezzo, presa, focus), disegni, schede tecniche
js/coach/           il coach a regole (vedi docs/coach-mappa-regole.md)
js/ui/              le schermate: oggi, piano, allenamento, musica, progressi, calendario, opzioni, guida…
js/avvio.js         ultimo script: accende l'app
esercizi/           disegni SVG degli esercizi
tools/              strumenti di manutenzione (generano sw.js e l'indice)
tests/              controlli automatici
docs/               documenti
```

## Regole del gioco

1. **Script classici, scope globale.** Ogni file è uno script normale: le funzioni e le costanti sono globali (molte anche `window.nome`, perché l'HTML usa `onclick="nome()"`). Non ci sono moduli ES né bundler: aggiungere un file = aggiungere una riga in `index.html` e lanciare `npm run sw`.
2. **L'ordine in `index.html` conta, ma poco.** Quasi tutto si chiama solo a schermata aperta, quando ogni file è già caricato. Al caricamento servono solo: `js/core/ripristino-guida.js` per primo (ripristina i dati veri prima che qualcuno li legga), `js/core/costanti.js` prima di chi usa `FAILURE_SET_SECONDS`, `js/avvio.js` per ultimo. `npm test` controlla ripristino-guida e avvio.
3. **Un nome, un file.** Nessuna funzione o costante globale può essere definita in due file (lo controlla `npm test`).
4. **I dati sono in localStorage**, con chiavi `coach_plus_*` e `tz_*`. Il suffisso `_toji` delle chiavi è l'identificatore interno storico della modalità: **non va rinominato** senza una migrazione, altrimenti gli utenti perdono schede e storico. Anche l'UID `@tojiworkout` dei file calendario resta (cambiarlo duplicherebbe gli eventi già importati).
5. **Il coach è un motore a regole**, non un'IA. Il Coach IA (`js/coach/coach-ia.js`) è separato, ha il suo consenso e può solo commentare.
6. **Lingue.** Il testo nel codice è italiano. Le altre lingue si traducono con `tr()` e con il traduttore automatico che cerca la frase italiana nei dizionari `js/lingue/*.js`. Ogni frase nuova va aggiunta in en, es e de (lo controlla `npm test`). I numeri nelle frasi si scrivono `#`.
7. **Cache.** Cambiando i file cambia il nome in `CACHE_NAME` di `sw.js` (`3in-v7` → `3in-v8`) così i telefoni scartano le copie vecchie.

## Dove mettere una cosa nuova

| Voglio… | File |
|---|---|
| una nuova regola del coach | `js/coach/` (cartella dell'argomento) e la riga in `docs/coach-mappa-regole.md` |
| una nuova schermata | `js/ui/<nome>.js`, markup in `index.html`, stile in `css/` |
| un nuovo esercizio | `js/dati/libreria-esercizi.js`, poi disegno/scheda in `js/dati/` |
| una nuova frase | italiano nel codice + `js/lingue/en.js`, `es.js`, `de.js` |
| una nuova chiave di dati | `js/core/storage.js` e il backup in `js/core/backup.js` |

## Comandi

```
npm install          una volta
npm test             controlli di struttura + avvio in browser (~5 s)
npm run test:browser prove lunghe con tocchi veri (guida, macchinario occupato, carichi, statistiche…)
npm run sw           rigenera l'elenco dei file di sw.js
npm run indice       rigenera docs/indice-codice.md
npm run controlla    tutto insieme (sw aggiornato, indice aggiornato, test)
```

Le prove lunghe usano Chromium: `CHROMIUM=/percorso/chrome npm run test:browser` se non è in `/opt/pw-browsers/chromium`. La guida passa senza segnalazioni a 390×844 e a 360×640 (`tests/browser/guida.js`, `guida-tocchi.js`).

## Mappa rapida

`docs/indice-codice.md` elenca ogni file con le sue funzioni, nell'ordine di caricamento. È generato: non si modifica a mano.
