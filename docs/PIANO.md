# Piano dell'app 3in

Stato: fase 1 fatta in questa PR. Le altre fasi sono in ordine di priorità; ognuna è una PR a sé e non cambia le altre.

## Fase 1 — Struttura (fatta)
- Un solo file da 16.000 righe → `css/` + `js/` per cartelle di dominio, stesso ordine di prima, comportamento invariato (verificato riga per riga e con le prove in browser).
- Nome pubblico **3in**: `index.html` come ingresso, `toji.html` rimane come rimando per le installazioni esistenti. Le chiavi di dati restano `_toji` (vedi `ARCHITETTURA.md`).
- Strumenti: `npm test`, indice del codice, elenco offline generato.

## Fase 2 — Ordine nel coach
1. **Catalogo delle regole in un unico posto**: ogni regola con codice, condizione, effetto, fonte e un interruttore, al posto di soglie scritte dentro le funzioni (incoerenza n. 8 della mappa).
2. **Una sola regola per principianti/over 65** al posto delle tre ripetute (n. 7).
3. **Scheda unica per esercizio** (dati, disegno, scheda tecnica, biomeccanica oggi in file diversi).
4. Test sulle regole: dato un profilo, il programma generato rispetta i limiti.

## Fase 3 — Nuove regole del coach
Le cinque regole proposte dalla ricerca, aggiunte una alla volta nel catalogo, ognuna con test e riga nella mappa. Il Coach IA può **suggerire** al coach a regole ma non decidere (decisione da confermare).

## Fase 4 — Coerenza del Coach IA
Il testo del consenso deve elencare tutti i dati inviati (modalità prudente da PAR-Q, prontezza, fase, durata, identificativo del dispositivo). Da sistemare prima di qualunque pubblicazione.

## Fase 5 — Pubblicazione su App Store (rimandata su richiesta)
Da fare più avanti, in ordine: privacy e dichiarazioni dei dati, guscio Capacitor (notifiche locali, haptics), icona 1024, schermate, test su dispositivo, requisiti sanitari (non è un dispositivo medico: nessuna promessa di salute), pagamenti se previsti.

## Regole di lavoro
- Una PR = un argomento. La ristrutturazione non si mescola con le modifiche al coach.
- Prima di aprire una PR: `npm run controlla`.
- Ogni regola nuova: file in `js/coach/`, riga nella mappa, frase in en/es/de, una prova.
