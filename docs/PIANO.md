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
RIC-01…05 (serie in più nel blocco, pausa prima di abbassare il carico, posizione allungata, tetto alle tecniche al cedimento, rientro del piano), tutte spegnibili e provate in `tests/browser/regole-nuove.js`. Dettagli nel capitolo 19 della mappa. Il Coach IA **non** influisce ancora sulle decisioni (da decidere dopo la verifica del Worker). Aggiornato il 2026-10-05: il Coach IA è stato rimosso per intero; la questione è chiusa, il coach a regole non ha mai letto nulla da lì.

## Fase 4 — Coerenza del Coach IA (fatta nell'app; superata il 2026-10-05: il Coach IA è stato rimosso)
Il consenso elenca tutto ciò che esce dal telefono (`TESTI_IA`), tradotto in en/es/de e controllato da un test. **Resta da fare lato server**: verificare nel Worker Cloudflare se i dati della seduta vengono conservati; il testo non promette più «non vengono salvati».

Aggiornato il 2026-10-05, decisione del proprietario: il Coach IA è **rimosso per intero** (client `js/coach/coach-ia.js`, consenso `tz_consenso_ia`, voce del Worker nella CSP). Il consenso IA di questa fase (`TESTI_IA`) non esiste più e la verifica lato server non serve più all'app; resta da verificare dal proprietario il Worker Cloudflare, che sta fuori dal repo (disattivarlo o cancellarlo, con i suoi dati e log). Il consenso del coach locale (`coachAttivo()`, `tz_consenso`) non cambia. Le chiavi `tz_consenso_ia`, `tz_device_ia`, `tz_ia_uso` orfane si ripuliscono all'avvio; i commenti già salvati (`commentoIA`) restano nei dati e nei backup ma non vengono più mostrati.

## Fase 4b — Struttura professionale e intensità del coach (fatta)
- **Abbinamenti e struttura (ABB)**: ordine della seduta, niente esercizi doppi, copertura settimanale (polpacci, deltoidi posteriori, core, braccia), tirate non meno delle spinte, superserie solo tra antagonisti, 3 giorni = Upper / Lower / Full Body. `js/coach/programma/struttura-pro.js`, `tests/browser/coerenza-schede.js` (735 profili).
- **Intensità dal corpo e dalle prime sedute (INT)**: angolo di fase e ECW/TBW come bandiere di prudenza, prima volta con un esercizio e bilancio delle prime due sedute. `js/coach/intensita.js`, `tests/browser/intensita-bia.js`.
- **Epoca d'oro (EPO, TEC)**: Golden Six, 5x5 di Reg Park, Arnold a 6 giorni, Gironda 8x8, Heavy Duty rivisto, Reeves e Yates come ispirazione; 13 sedute pronte; sei tecniche nuove. `js/coach/metodi-epoca-oro.js`, `js/dati/schede-epoca-oro.js`, `tests/browser/metodi-epoca-oro.js`.
- Le fonti, con la forza di ogni prova, sono in `docs/ricerca-struttura-e-intensita.md`.

## Fase 5 — Pubblicazione su App Store (rimandata su richiesta)
Da fare più avanti, in ordine: privacy e dichiarazioni dei dati, guscio Capacitor (notifiche locali, haptics), icona 1024, schermate, test su dispositivo, requisiti sanitari (non è un dispositivo medico: nessuna promessa di salute), pagamenti se previsti.

Piano dettagliato e checklist: [`piano-lancio-appstore.md`](piano-lancio-appstore.md).

## Fase 6 — Coach v2 (piano a ondate, in corso)
Piano: [`piano-coach-v2.md`](piano-coach-v2.md); decisioni, che valgono dove i due documenti non coincidono: [`coach-v2-decisioni.md`](coach-v2-decisioni.md); soglie del collaudo per onda: `tools/cancello-collaudo.json` (`npm run cancello`).
- **Onda 0 — strumenti e bug netti** (integrata il 2026-10-05, etichetta `coach-v2-onda-0`, `CACHE_NAME` `3in-v12`; criteri del collaudo 1.1). Collaudo, matrice standard (10.800 profili): programmi con almeno un fallimento grave (`gravi_pesata`) **35,8% → 2,2%**; a zero SAF-01, RIR-02, RIR-03, EXN-01, MIS-01 (quadricipiti, femorali), TEC-01; VOL-01:femorali 57,4 → 20,1; FRQ-01:femorali 31,4 → 5,3; EQ-03:rapporto 38,2 → 5,5; DUR-02 82,8 → 63,2 (soglia dell'onda 64: il tempo è un tetto, D-P10). Prove: `npm run controlla` verde, `npm run test:browser` 20 file su 21. **Aperti**: il cancello non passa (SAF-04:corpo 14,9%, il rematore inverso senza sbarra; a casa e a corpo libero peggiorano EQ-01 11,5 → 16,9, RID-02 13,8 → 19,0, VOL-01:schiena, EQ-02:verticale; in `tests/browser/coerenza-schede.js` ABB-02, ABB-03 e ABB-04; e 6 classi per 0,5-1,5 punti). Cause e correzioni proposte (task W0-T7, con W1-T5 per la libreria) nel report di INT-0.

## Regole di lavoro
- Una PR = un argomento. La ristrutturazione non si mescola con le modifiche al coach.
- Prima di aprire una PR: `npm run controlla`.
- Ogni regola nuova: file in `js/coach/`, riga nella mappa, frase in en/es/de, una prova.
