# Soglie del coach

> File **generato** da `tools/elenco-soglie.js` (`npm run soglie`): non si modifica a mano. Elenca ogni numero dei file `js/**/soglie-*.js` con la sua forza e la sua fonte (piano coach v2 B.4).
> Forze: **Solida** (meta-analisi o posizione ufficiale), **Moderata** (pochi studi, o risultati che cambiano con la popolazione), **Contrastata** (studi in disaccordo), **Convenzione** (pratica dei coach: il foglio «Perché?» mostra «Scelta prudente del coach (Convenzione): non è un risultato di studi»), **Decisione** (scelta di prodotto: «Decisione di prodotto»), **Provvisoria** (numero di partenza in attesa di verifica: «Numero di partenza, in verifica»). Etichette: `etichettaForza` in `js/coach/regia/perche.js` (registro C.4).
> Le tabelle di prima (`COACH_PARAMETRI`, `PARAM_PARTENZA`, `PARAM_INTENSITA`, `STR_PESI`, `DOSE_SCARICO`, `RIR_TIPO`) non sono ancora qui: passano in un file soglie quando il task che possiede il loro file le tocca.

Totale: 21 soglie in 2 tabelle (Convenzione 16, Decisione 4, Provvisoria 1).

## `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `chiParteBasso` | sesso «donna», livelli [«principiante», «intermedio»] | Decisione | decisione dell’utente 2026-10-05 («carichi di partenza bassi per le donne fino al livello intermedio»); registro coach v2 D-P1, B1 | PAR-06 |
| `fattoreDonne` | principiante alto 0.6, basso 0.65, iso 0.75, intermedio alto 0.85, basso 0.85, iso 0.85 | Convenzione | ricerca-donne-carichi-iniziali §3.2-3.3 (calcolo [D] sulle àncore «non allenata» di Symmetric Strength, una fonte di terzi, ±25%); registro coach v2 B1; piano D.3 | PAR-06 |
| `biaEntro` | 0.15 | Convenzione | ricerca-donne-carichi-iniziali §2 G e §3.4 (DON-01: la BIA di consumo è rumorosa, la calibrazione prende presto il comando); piano D.2 | PAR-01, PAR-06 |
| `pesoDonnaSenzaDati` | 59 | Provvisoria | ricerca-donne-carichi-iniziali §1.3 (àncora «non allenata»: donna di 130 lb = 59 kg); estensione di W2-T8 per chi salta il peso e la BIA: da verificare | PAR-06 |
| `storicoRpeMinimo` | 7 | Convenzione | ricerca-donne-carichi-iniziali §3.6 e §5 (DON-05: con molta riserva il massimale dalle ripetizioni sottostima) | PAR-07 |
| `storicoEserciziPerLato` | 2 | Convenzione | ricerca-donne-carichi-iniziali §6 (DON-05: due mediane se ci sono almeno 2 esercizi per lato) | PAR-07 |
| `barraKg` | 20 | Convenzione | PAR-04 (barra olimpica da 20 kg); ricerca-donne-carichi-iniziali §3.7 | PAR-04, PAR-08 |
| `sottoBarra` | 0.9 | Convenzione | ricerca-donne-carichi-iniziali §3.7 (DON-03: sotto 0,9 × la barra); piano D.4 | PAR-08 |
| `penalitaBilanciere` | -3 | Convenzione | piano D.4 (PAR-08 a: penalità nella scelta, non esclusione) | PAR-08 |
| `barraVuota` | ripetizioni [6, 8], serieInMeno 1 | Convenzione | ricerca-donne-carichi-iniziali §3.7 punto 3 (DON-03); piano D.4 | PAR-08 |
| `corpoLiberoPulite` | [10, 15] | Convenzione | ricerca-donne-carichi-iniziali §1.8 (progressioni dei piegamenti e delle trazioni: salto con 3 serie da 10-15 ripetizioni pulite) | PAR-09 |
| `calibrazioneChi` | livelli [«principiante»], donneConFattore true | Decisione | registro coach v2 D-P1 e B22 (la calibrazione vale per tutti i principianti; il fattore basso solo per le donne fino all’intermedio); piano D.1 | CAR-18 |
| `calibrazioneEsposizioni` | 4 | Convenzione | piano D.5; ricerca-donne-carichi-iniziali §3.6 (prime 3-4 esposizioni) | CAR-18 |
| `calibrazioneBersaglioRpe` | 8 | Convenzione | ricerca-donne-carichi-iniziali §3.6 (stop al primo RPE ≥ 8); registro B1 | CAR-18 |
| `calibrazioneTolleranzaRpe` | 0.5 | Convenzione | piano D.5 (entro ±0,5 di RPE si chiude) | CAR-18 |
| `calibrazioneSalti` | bassa 1 alto 0.1, basso 0.1, iso 0.1, 2 alto 0.15, basso 0.2, iso 0.15, 3 alto 0.2, basso 0.25, iso 0.2, normale 1 0.05, 2 0.075, 3 0.1 | Convenzione | ricerca-donne-carichi-iniziali §3.6 (tabella dei salti per RPE, scelta di prodotto); registro B1 (per scarto di RPE, non dal massimale); piano D.5 | CAR-18 |
| `calibrazioneSenzaRpe` | bassa alto 0.1, basso 0.15, iso 0.1, normale 0.05, volteMax 2 | Convenzione | ricerca-donne-carichi-iniziali §3.6 (senza RPE +10/15/10%); piano D.5 (al massimo 2 volte) | CAR-18, CAR-19 |
| `calibrazioneTettoSalto` | 0.25 | Convenzione | piano D.5 (mai oltre +25%); ricerca-donne-carichi-iniziali §3.6 | CAR-18 |
| `calibrazioneCauto` | 0.5 | Convenzione | piano D.5 (salvaguardie); skill implementa-regola-coach §6 (gli aumenti si dimezzano per i prudenti) | CAR-18 |

## `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `precedenza` | sentinella 1, motivatore 2, specialista 3, architetto 4, dosatore 4, bilancia 4, preparatore 5, tecnico 5 | Decisione | piano coach v2 B.2 (REG-01, precedenze della squadra) | REG-01 |
| `versioneProgramma` | 2 | Decisione | piano coach v2 B.6 (REG-04); registro coach v2 D-P5 | REG-04 |
