# Piano dell'app 3in

Stato: fasi 1-4 fatte; la 5 (App Store) è rimandata. Le prossime modifiche partono da qui.

## Fase 1 — Struttura (fatta)
- Un solo file da 16.000 righe → `css/` + `js/` per cartelle di dominio, stesso ordine di prima, comportamento invariato (verificato riga per riga e con le prove in browser).
- Nome pubblico **3in**: `index.html` come ingresso, `toji.html` rimane come rimando per le installazioni esistenti. Le chiavi di dati restano `_toji` (vedi `ARCHITETTURA.md`).
- Strumenti: `npm test`, indice del codice, elenco offline generato.

## Fase 2 — Ordine nel coach (fatta)
- **Catalogo delle regole**: `js/coach/catalogo-regole.js` è generato dalla mappa (`npm run catalogo`), 173 regole con codice e descrizione.
- **Parametri in un posto solo**: `js/coach/parametri.js` (serie massime, scarico, prontezza, aderenza…). Il limite di 3 serie per principianti/over 65 usa un solo parametro.
- **Scheda unica per esercizio**: `schedaUnica(nome)` in `js/dati/scheda-unica.js` legge libreria, scheda tecnica, disegno, schemi e regole di carico; `bucchiNelleSchede()` dice cosa manca.
- Ancora da fare: soglie minori dentro le funzioni (mappa, n. 8 e n. 3) e interruttori per le regole storiche.

## Fase 3 — Nuove regole del coach (fatta)
RIC-01…05 (serie in più nel blocco, pausa prima di abbassare il carico, posizione allungata, tetto alle tecniche al cedimento, rientro del piano), tutte spegnibili e provate in `tests/browser/regole-nuove.js`. Dettagli nel capitolo 19 della mappa. Il Coach IA **non** influisce ancora sulle decisioni (da decidere dopo la verifica del Worker).

## Fase 4 — Coerenza del Coach IA (fatta nell'app)
Il consenso elenca tutto ciò che esce dal telefono (`TESTI_IA`), tradotto in en/es/de e controllato da un test. **Resta da fare lato server**: verificare nel Worker Cloudflare se i dati della seduta vengono conservati; il testo non promette più «non vengono salvati».

## Fase 4b — Struttura professionale e intensità del coach (fatta)
- **Abbinamenti e struttura (ABB)**: ordine della seduta, niente esercizi doppi, copertura settimanale (polpacci, deltoidi posteriori, core, braccia), tirate non meno delle spinte, superserie solo tra antagonisti, 3 giorni = Upper / Lower / Full Body. `js/coach/programma/struttura-pro.js`, `tests/browser/coerenza-schede.js` (735 profili).
- **Intensità dal corpo e dalle prime sedute (INT)**: angolo di fase e ECW/TBW come bandiere di prudenza, prima volta con un esercizio e bilancio delle prime due sedute. `js/coach/intensita.js`, `tests/browser/intensita-bia.js`.
- **Epoca d'oro (EPO, TEC)**: Golden Six, 5x5 di Reg Park, Arnold a 6 giorni, Gironda 8x8, Heavy Duty rivisto, Reeves e Yates come ispirazione; 13 sedute pronte; sei tecniche nuove. `js/coach/metodi-epoca-oro.js`, `js/dati/schede-epoca-oro.js`, `tests/browser/metodi-epoca-oro.js`.
- Le fonti, con la forza di ogni prova, sono in `docs/ricerca-struttura-e-intensita.md`.

## Fase 5 — Pubblicazione su App Store (rimandata su richiesta)
Da fare più avanti, in ordine: privacy e dichiarazioni dei dati, guscio Capacitor (notifiche locali, haptics), icona 1024, schermate, test su dispositivo, requisiti sanitari (non è un dispositivo medico: nessuna promessa di salute), pagamenti se previsti.

Piano dettagliato e checklist: [`piano-lancio-appstore.md`](piano-lancio-appstore.md).

## Regole di lavoro
- Una PR = un argomento. La ristrutturazione non si mescola con le modifiche al coach.
- Prima di aprire una PR: `npm run controlla`.
- Ogni regola nuova: file in `js/coach/`, riga nella mappa, frase in en/es/de, una prova.
