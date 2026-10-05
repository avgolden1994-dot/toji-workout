# Sicurezza di 3in

Controllo fatto il 1 ottobre 2026 sul codice dell'app (nessun server da esaminare: il Worker del Coach IA non è nel repo). Aggiornato il 2026-10-05: il Coach IA è stato rimosso per intero e l'app non invia più dati dell'utente a server del titolare; vedi «Aggiornamento del 2026-10-05» in fondo. Le righe sul Coach IA qui sotto restano come cronologia, con la nota dove l'affermazione non vale più.

## Corretto in questa versione
| Problema | Cosa poteva succedere | Correzione |
|---|---|---|
| Nomi di esercizio con `"` o `<` finivano nell'HTML e nei pulsanti (`onclick`) senza protezione | Un backup o un file CSV manomesso (scaricato da altri) poteva eseguire codice nell'app e leggere tutti i dati salvati (storico, dati del corpo, risposte di salute) | `jsArg()` per i pulsanti, `nomeSicuro()` per i file importati, `pulisciDeep()` per i backup; prova in `tests/browser/sicurezza.js` |
| Il ripristino di un backup poteva impostare anche i consensi (`tz_consenso`, `tz_consenso_ia`) e il codice del dispositivo | Un file manomesso accendeva il Coach IA al posto dell'utente | Questi tre dati non si ripristinano più dal file (aggiornato il 2026-10-05: il Coach IA non esiste più; il ripristino continua a non impostare il consenso `tz_consenso`, e le chiavi del Coach IA rimaste sono ripulite all'avvio) |
| Nessuna politica di sicurezza del browser | Un'eventuale iniezione poteva mandare i dati a qualunque sito | `Content-Security-Policy` in `index.html`: rete solo verso il Worker del coach e cdnjs (aggiornato il 2026-10-05: la voce del Worker è stata tolta da `connect-src`, che ora ammette solo `'self'`, `blob:`, `data:` e cdnjs); niente plugin, niente `<base>`, niente invio di moduli. Prova: una richiesta verso un altro sito viene bloccata |
| `pdf.js` caricato da cdnjs senza controllo | Se cdnjs fosse compromesso, codice estraneo con accesso a tutti i dati | Impronta SRI (sha512, uguale a quella pubblicata da cdnjs); un file alterato viene rifiutato (provato) |
| Referrer inviato ai link esterni | Indirizzo dell'app nei siti aperti dai link | `<meta name="referrer" content="no-referrer">` |

## Già a posto
- I titoli dei giorni, i riepiloghi e le anteprime di importazione passano da `escapeHtml`.
- Nessun `eval`, `new Function`, `document.write`.
- I link esterni hanno `rel="noopener noreferrer"`; gli identificativi YouTube e Spotify sono validati da un'espressione regolare.
- Il file `.ics` esporta testi protetti.

## Da sapere (limiti rimasti)
1. **La CSP deve ammettere `'unsafe-inline'` per gli script**, perché l'app usa molti `onclick="..."` nel markup. Quindi non ferma l'esecuzione di codice iniettato: ferma solo la fuga dei dati. Per chiudere del tutto serve spostare i gestori in `addEventListener` (lavoro grande: fase a sé).
2. **I testi dentro pagina non sono tutti protetti uno per uno** (molti `e.name` messi nell'HTML senza `escapeHtml`). La difesa è all'ingresso dei dati (import e backup). Se si aggiunge una nuova via d'ingresso (condivisione di schede, link), va usato `nomeSicuro()`.
3. **I dati stanno in chiaro nel telefono** (localStorage), comprese le risposte del questionario di salute. È normale per questa architettura; con un telefono sbloccato altri possono leggerli. Il backup `.json` scaricato è anch'esso in chiaro.
4. **Il worker di pdf.js** viene caricato da cdnjs senza SRI (il browser non lo permette per i worker). Alternativa: includere pdf.js nel repo.
5. **YouTube e Spotify** (player incorporati) sono servizi esterni: ricevono l'indirizzo IP dell'utente quando si usano.
6. **Aggiornamenti**: il service worker serve sempre la versione di rete quando c'è; non c'è firma del codice (normale per una PWA).

## Aggiornamento del 2026-10-05: Coach IA rimosso
Decisione del proprietario: il Coach IA (il client `js/coach/coach-ia.js` che mandava le serie fatte, RPE, obiettivi, livello, fase, risposte PAR-Q, prontezza, lingua e un codice dispositivo a un Worker Cloudflare) è tolto per intero. Cosa cambia in questo documento:
- **Limite «Coach IA lato server»**: tolto dall'elenco. Non c'è più nel repo nessun codice che invii dati a un server del titolare, quindi autenticazione del codice dispositivo, limiti di frequenza e CORS del Worker non riguardano più l'app.
- **Il Worker sta fuori dal repo e non è mai stato esaminato da qui.** Il proprietario può disattivarlo o cancellarlo da Cloudflare, insieme ai dati e ai log che contiene. Da verificare dal proprietario: se e per quanto tempo conserva i dati ricevuti, e se vanno cancellati.
- **CSP**: `connect-src` non cita più il Worker. Resta rete verso terzi solo per funzioni facoltative: cdnjs (pdf.js, importazione di un PDF), script e frame di YouTube e Spotify (`script-src`, `frame-src`), link aperti dall'utente nel browser (YouTube, Google Calendar). Vedi i limiti 4 e 5.
- **Consensi**: resta `tz_consenso` (coach locale, `coachAttivo()`). `tz_consenso_ia`, `tz_device_ia` e `tz_ia_uso` non sono più usate e vengono ripulite all'avvio. I commenti già salvati nelle sedute (campo `commentoIA`) restano nei dati e nei backup (e il ripristino li conserva) ma non vengono più mostrati.
