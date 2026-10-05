# Soglie del coach

> File **generato** da `tools/elenco-soglie.js` (`npm run soglie`): non si modifica a mano. Elenca ogni numero dei file `js/**/soglie-*.js` con la sua forza e la sua fonte (piano coach v2 B.4).
> Forze: **Solida** (meta-analisi o posizione ufficiale), **Moderata** (pochi studi, o risultati che cambiano con la popolazione), **Contrastata** (studi in disaccordo), **Convenzione** (pratica dei coach: il foglio «Perché?» mostra «Scelta prudente del coach (Convenzione): non è un risultato di studi»), **Decisione** (scelta di prodotto: «Decisione di prodotto»), **Provvisoria** (numero di partenza in attesa di verifica: «Numero di partenza, in verifica»). Etichette: `etichettaForza` in `js/coach/regia/perche.js` (registro C.4).
> Le tabelle di prima (`COACH_PARAMETRI`, `PARAM_PARTENZA`, `PARAM_INTENSITA`, `STR_PESI`, `DOSE_SCARICO`, `RIR_TIPO`) non sono ancora qui: passano in un file soglie quando il task che possiede il loro file le tocca.

Totale: 2 soglie in 1 tabelle (Decisione 2).

## `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `precedenza` | sentinella 1, motivatore 2, specialista 3, architetto 4, dosatore 4, bilancia 4, preparatore 5, tecnico 5 | Decisione | piano coach v2 B.2 (REG-01, precedenze della squadra) | REG-01 |
| `versioneProgramma` | 2 | Decisione | piano coach v2 B.6 (REG-04); registro coach v2 D-P5 | REG-04 |
