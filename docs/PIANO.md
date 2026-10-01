# Piano dell'app 3in

Stato: fasi 1-4 fatte; la 5 (App Store) è rimandata. Le prossime modifiche partono da qui.

## Fase 1 — Struttura (fatta)
- Un solo file da 16.000 righe → `css/` + `js/` per cartelle di dominio, stesso ordine di prima, comportamento invariato (verificato riga per riga e con le prove in browser).
- Nome pubblico **3in**: `index.html` come ingresso, `toji.html` rimane come rimando per le installazioni esistenti. Le chiavi di dati restano `_toji` (vedi `ARCHITETTURA.md`).
- Strumenti: `npm test`, indice del codice, elenco offline generato.

## Fase 2 — Ordine nel coach (fatta)
- **Catalogo delle regole**: `js/coach/catalogo-regole.js` è generato dalla mappa (`npm run catalogo`), 144 regole con codice e descrizione.
- **Parametri in un posto solo**: `js/coach/parametri.js` (serie massime, scarico, prontezza, aderenza…). Il limite di 3 serie per principianti/over 65 usa un solo parametro.
- **Scheda unica per esercizio**: `schedaUnica(nome)` in `js/dati/scheda-unica.js` legge libreria, scheda tecnica, disegno, schemi e regole di carico; `bucchiNelleSchede()` dice cosa manca.
- Ancora da fare: soglie minori dentro le funzioni (mappa, n. 8 e n. 3) e interruttori per le regole storiche.

## Fase 3 — Nuove regole del coach (fatta)
RIC-01…05 (serie in più nel blocco, pausa prima di abbassare il carico, posizione allungata, tetto alle tecniche al cedimento, rientro del piano), tutte spegnibili e provate in `tests/browser/regole-nuove.js`. Dettagli nel capitolo 19 della mappa. Il Coach IA **non** influisce ancora sulle decisioni (da decidere dopo la verifica del Worker).

## Fase 4 — Coerenza del Coach IA (fatta nell'app)
Il consenso elenca tutto ciò che esce dal telefono (`TESTI_IA`), tradotto in en/es/de e controllato da un test. **Resta da fare lato server**: verificare nel Worker Cloudflare se i dati della seduta vengono conservati; il testo non promette più «non vengono salvati».

## Fase 5 — Pubblicazione su App Store (rimandata su richiesta)
Da fare più avanti, in ordine: privacy e dichiarazioni dei dati, guscio Capacitor (notifiche locali, haptics), icona 1024, schermate, test su dispositivo, requisiti sanitari (non è un dispositivo medico: nessuna promessa di salute), pagamenti se previsti.

## Regole di lavoro
- Una PR = un argomento. La ristrutturazione non si mescola con le modifiche al coach.
- Prima di aprire una PR: `npm run controlla`.
- Ogni regola nuova: file in `js/coach/`, riga nella mappa, frase in en/es/de, una prova.
