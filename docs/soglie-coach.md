# Soglie del coach

> File **generato** da `tools/elenco-soglie.js` (`npm run soglie`): non si modifica a mano. Elenca ogni numero dei file `js/**/soglie-*.js` con la sua forza e la sua fonte (piano coach v2 B.4).
> Forze: **Solida** (meta-analisi o posizione ufficiale), **Moderata** (pochi studi, o risultati che cambiano con la popolazione), **Contrastata** (studi in disaccordo), **Convenzione** (pratica dei coach: il foglio «Perché?» mostra «Scelta prudente del coach (Convenzione): non è un risultato di studi»), **Decisione** (scelta di prodotto: «Decisione di prodotto»), **Provvisoria** (numero di partenza in attesa di verifica: «Numero di partenza, in verifica»). Etichette: `etichettaForza` in `js/coach/regia/perche.js` (registro C.4).
> Le tabelle di prima (`COACH_PARAMETRI`, `PARAM_PARTENZA`, `PARAM_INTENSITA`, `STR_PESI`, `DOSE_SCARICO`, `RIR_TIPO`) non sono ancora qui: passano in un file soglie quando il task che possiede il loro file le tocca.

Totale: 115 soglie in 6 tabelle (Solida 2, Moderata 7, Convenzione 99, Decisione 5, Provvisoria 2).

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

## `SOGLIE_STRUTTURA` — `js/coach/programma/soglie-struttura.js` (architetto)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `strutturaPrincipiante` | settimane 12, blocco 12, controllo 8 | Convenzione | registro coach v2 B4 e D-P15; ricerca-principianti-12-settimane §3.2 e PRI-03 (scarico solo alla verifica); Bell 2022, 2024 e due RCT 2024/2026 (nessun vantaggio dello scarico sulla massa: Contrastata) | PRN-03, PRG-01 |
| `strutturaIntermedio` | settimane 12, blocco 6 | Convenzione | registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.2 e §6 A MES-01; Bell 2024 (uno scarico circa ogni 5,6 ± 2,3 settimane) | MES-01, PRG-01 |
| `strutturaAvanzato` | settimane 12, blocco 6 | Convenzione | registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.2 e §6 A MES-01 | MES-01, PRG-01 |
| `strutturaPrudente` | principiante settimane 8, blocco 4, intermedio settimane 12, blocco 4, avanzato settimane 12, blocco 6 | Convenzione | registro coach v2 B4 («Prudenti: blocchi 3+1 come oggi»); ricerca-mesocicli-periodizzazione-scarichi §3.2 (modalità prudente: invariato rispetto a oggi) | MES-01, PRN-03, PRG-01 |
| `scaricoAnticipabile` | settimaneCaricoMinime 4 | Convenzione | registro coach v2 B4 e B17 (scarico reattivo unico); ricerca-mesocicli-periodizzazione-scarichi §3.2 («anticipabile a 4+1») e §3.7 | MES-01 |
| `controlloOttava` | scaricoSeFatica [«media», «alta»], dose «bassa» | Convenzione | registro coach v2 B4 (controllo all’8ª settimana dei principianti); ricerca-mesocicli-periodizzazione-scarichi §3.6.2 | PRN-03 |
| `controlloOttavaSegnali` | checkInSonno 7, sonnoMaleMin 4, seduteUltime 3, seduteAlLimiteMin 2, doloreMinimo 4 | Convenzione | registro coach v2 B4; ricerca-mesocicli-periodizzazione-scarichi §3.7 (S5 sonno, S7 sRPE, S4 dolore: scarico locale) e DEC-02 (dolore da 4/10) | PRN-03 |
| `rampaVolumePrincipiante` | [0.7, 0.7, 0.85, 0.85, 1] | Convenzione | ricerca-principianti-12-settimane §3.2 e PRI-04; ricerca-obiettivi-e-programmi OBI-10 (volume 70 → 100%); registro C.4 (fattori della rampa) | MES-03, PRN-03 |
| `rampaVolumeIntermedio` | [0.75, 0.85, 0.95, 1, 1] | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 e §6 A MES-03 (circa +1 serie per muscolo a settimana); a volume pari la periodizzazione non cambia la massa (Moesgaard 2022): serve a gestire fatica e dolenzia | MES-03 |
| `rampaVolumeAvanzato` | [0.7, 0.8, 0.9, 1, 1] | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 e §6 A MES-03 | MES-03 |
| `rampaVolumeSalute` | 0.8 | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.2 («dimagrimento e salute: rampa 0,80 → 1,00») | MES-03 |
| `prioritariAvanzato` | dallaSettimana 3, piuSerie 1 | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.2-3.3 (RIC-01 spostato dove serve); registro coach v2 B18 (l’unico «+1» è settimanale) | MES-03 |
| `seriePrincipiante` | multi [2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], altri [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2] | Convenzione | ricerca-principianti-12-settimane §3.2 (tabella settimana per settimana) e PRI-04; piano coach v2 W2-T4 | MES-03, PRN-03 |
| `ripetizioniPrincipiante` | inizio settimane 2, multi [10, 12], isolamento [12, 15], dopo multi [8, 12], isolamento [10, 15] | Convenzione | ricerca-principianti-12-settimane §3.2 e PRI-11 (doppia progressione: sale il carico alla cima del range) | PRN-03 |
| `rirPrincipiante` | inizio [3, 4], inizioSettimane 2, dopo [2, 3], ultimaSerieIsolamenti dallaSettimana 7, rir [1, 2], verifica [3, 4] | Convenzione | registro coach v2 B5; ricerca-principianti-12-settimane §3.2 e PRI-02; Halperin 2022, Refalo 2023 (le stime del RIR sbagliano di circa 1 ripetizione) | MES-02, PRN-03 |
| `rirIntermedio` | pesanti [3, 3, 2, 2, 1], macchine [3, 2, 2, 1, 1], isolamenti [3, 2, 1, 1, 0] | Convenzione | registro coach v2 B5; ricerca-mesocicli-periodizzazione-scarichi §3.4; ricerca-ipertrofia-programmazione §3.5; Robinson 2024 (per l’ipertrofia la crescita sale avvicinandosi al cedimento) | MES-02 |
| `rirAvanzato` | pesanti [3, 2, 2, 1, 1], macchine [3, 2, 1, 1, 0], isolamenti [2, 1, 1, 0, 0] | Convenzione | registro coach v2 B5; ricerca-mesocicli-periodizzazione-scarichi §3.4; ricerca-ipertrofia-programmazione §3.5 | MES-02 |
| `rirScarico` | [4, 5] | Convenzione | registro coach v2 B5 e B17; ricerca-mesocicli-periodizzazione-scarichi §3.6 (RIR mostrato in scarico) | MES-02 |
| `rirMassimo` | 4 | Moderata | registro coach v2 B5 («il RIR non supera mai 4»); Halperin 2022, Remmert 2023 | MES-02 |
| `pavimentoPesanti` | 1 | Convenzione | registro coach v2 B5 (PCO-02, collaudo RIR-02); ricerca-metodi-coach-pratici PCO-02; ACSM 2026 (il cedimento non serve) | MES-02 |
| `pavimentoCore` | 1 | Convenzione | MAV-02 (niente cedimento sul core, sulle tenute e a peso zero); revisione INT-2d, minor 2; ACSM 2026 (il cedimento non serve) | MES-02, MAV-02 |
| `pavimentoCasa` | 2 | Convenzione | registro coach v2 B5 (CAS-11); ricerca-casa-poco-tempo §4.4 e CAS-11 (cedimento sicuro senza spotter) | MES-02 |
| `prontezzaPerZero` | 60 | Convenzione | registro coach v2 B5 («0 solo nell’ultima settimana, esercizi stabili, prontezza ≥ 60»); ricerca-mesocicli-periodizzazione-scarichi §3.4 | MES-02 |
| `pavimentoMinorenni` | 2 | Convenzione | ETA-02 (registro coach v2 C.3); ricerca-fasce-di-eta §3.2 | MES-02 |
| `rirPrudente` | [3, 4] | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.2 (modalità prudente: RIR 3-4 fisso, invariato rispetto a oggi); registro coach v2 B10 | MES-02 |
| `obiettivoSalute` | pavimento 2 | Moderata | registro coach v2 B5 (OBI-03: salute [2,3] ovunque); ACSM 2026 e Robinson 2024 (2-3 ripetizioni in riserva) | OBI-03 |
| `obiettivoForza` | pesanti [2, 4] | Convenzione | registro coach v2 B5 (OBI-03: forza [2,4] sui pesanti); ricerca-obiettivi-e-programmi OBI-03; per la forza la pendenza sul RIR stimato è nulla (Robinson 2024) | OBI-03 |
| `obiettivoDeficit` | pesanti 2, altri 1 | Convenzione | registro coach v2 B5 (deficit: pavimento 2 sui pesanti, ex MES-17); ricerca-mesocicli-periodizzazione-scarichi §3.12.2 | OBI-03 |
| `scaricoSerie` | bassa 0.65, media 0.5, alta 0.4 | Convenzione | registro coach v2 B4, B17, C.4 (MES-05: dosi); ricerca-mesocicli-periodizzazione-scarichi §3.6 (sondaggio di 204 preparatori, Wendler, RP) | MES-01, MES-05 |
| `scaricoCarico` | bassa 0.95, media 0.9, alta 0.9 | Convenzione | registro coach v2 B4 e C.4; ricerca-mesocicli-periodizzazione-scarichi §3.6 e §3.6.1 (Rippetoe e Baker 2014; PMID 28328712: 2 settimane di stop mantengono la forza) | MES-01, MES-05 |
| `scaricoGiorni` | [5, 7] | Convenzione | registro coach v2 B4; Bell 2024 (scarico di 6,4 ± 1,7 giorni); ricerca-mesocicli-periodizzazione-scarichi §3.6 | MES-01 |
| `scaricoRipresa` | 1 | Convenzione | registro coach v2 B4 e B17 («ripresa al 100%»); ricerca-mesocicli-periodizzazione-scarichi §3.6.1 | MES-01, MES-06 |
| `scaricoDoseIniziale` | giorniBassa 3, prudente «media» | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.11 (dose di default per numero di sedute) e §3.2 (prudenti: «media») | MES-01, MES-05 |
| `verificaPrincipiante` | serie 0.65, carico 1, rir [3, 4] | Convenzione | registro coach v2 B4 («12ª di verifica: serie −30/−35%, RIR 3-4, carico invariato»); ricerca-principianti-12-settimane §3.2 | PRN-03 |
| `passaggioBlocco` | prioritaPiuSerie 1, fondamentaliBlocchi [2, 3], accessoriRuotati [0.33, 0.5], rampaRiparte true | Convenzione | ricerca-mesocicli-periodizzazione-scarichi §3.9-3.10 (+1 serie al muscolo prioritario se il verdetto è «buono»; fondamentali fissi per 2-3 blocchi; ruota un terzo - metà degli accessori al confine del blocco; Baz-Valle 2019) | MES-13, MES-14 |
| `tecnichePerPosizione` | soloG1FinoAllaSettimana 2 | Convenzione | ricerca-metodi-avanzati-intensita §4.2 (posizione nel blocco); registro coach v2 A.2 (tecniche) | MES-01 |

## `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `precedenza` | sentinella 1, motivatore 2, specialista 3, architetto 4, dosatore 4, bilancia 4, preparatore 5, tecnico 5 | Decisione | piano coach v2 B.2 (REG-01, precedenze della squadra) | REG-01 |
| `versioneProgramma` | 2 | Decisione | piano coach v2 B.6 (REG-04); registro coach v2 D-P5 | REG-04 |

## `SOGLIE_TECNICHE` — `js/coach/sicurezza/soglie-tecniche.js` (sentinella)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `budgetSedutaIntermedio` | 1 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (intermedio: 1 per seduta, come RIC-04) | MAV-08, RIC-04 |
| `budgetSettimanaIntermedio` | 2 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (intermedio: al massimo 2 a settimana) | MAV-08 |
| `budgetSedutaAvanzato` | 2 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (avanzato: 2 per seduta, su esercizi e muscoli diversi) | MAV-08 |
| `budgetSettimanaAvanzato` | 6 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (avanzato: al massimo 6 a settimana) | MAV-08 |
| `budgetSettimanaSpecializzazione` | 8 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (blocco di specializzazione: al massimo 8 a settimana) | MAV-08, MAV-15 |
| `settimaneSenzaTecnicheInizio` | 1 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.2 (settimana 1 del blocco: nessuna tecnica intensa) | MAV-08 |
| `settimaneTettoBloccoCorto` | 1 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 4 settimane: il tetto solo nell ultima di carico) | MAV-08 |
| `settimaneTettoBloccoLungo` | 2 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 6 settimane: il tetto nelle settimane 4-5) | MAV-08 |
| `bloccoLungoDa` | 5 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.2 (blocco di 6 settimane = 5 di carico e lo scarico) | MAV-08 |
| `serieEquivalenti` | drop 2, riposopausa 3, myo 3 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 («un drop set a piu cadute vale 2-3 serie» [V]; myo-reps: attivazione e 3-4 mini-serie) | MAV-09 |
| `pocoTempoMinuti` | 45 | Convenzione | ricerca-metodi-avanzati-intensita.md 3.3 e 4.1 (poco tempo: 45 minuti o meno) | MAV-01, MAV-13 |
| `etaMezzaEta` | 50 | Convenzione | ricerca-fasce-di-eta.md 3.2 (50-64: drop e forzate solo su macchine, mai sui pesanti liberi) | MAV-03, ETA-10 |
| `parzialiRipetizioni` | [3, 6] | Convenzione | ricerca-metodi-avanzati-intensita.md 4.3 (parziali in allungamento: 3-6 ripetizioni nella meta allungata) | MAV-07 |
| `parzialiPerMuscoloSettimana` | 2 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.3 (al massimo 2 esercizi per muscolo a settimana) | MAV-07 |
| `stessaTecnicaStessoEsercizioSettimana` | 1 | Convenzione | ricerca-metodi-avanzati-intensita.md 4.1 (una stessa tecnica sullo stesso esercizio al massimo una volta a settimana) | MAV-08 |
| `discesaSecondi` | [2, 3] | Moderata | ricerca-metodi-avanzati-intensita.md 1.4 e 4.3 (Schoenfeld 2015: da 0,5 a 8 s per ripetizione la crescita e simile; discesa 2-3 s) | MAV-11 |

## `SOGLIE_TEMPO` — `js/coach/volume/soglie-tempo.js` (dosatore)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `secRipetizione` | A 5, B 3.5, corpo 4, C 3, D 3, E 3, F 3, nordic 5 | Convenzione | ricerca-casa-poco-tempo §5.1 (tempo di una serie e tabella delle classi) | CAS-05 |
| `secPreparazione` | 5 | Convenzione | ricerca-casa-poco-tempo §5.1 (c = 5 s) | CAS-05 |
| `secTenutaExtra` | 5 | Convenzione | ricerca-casa-poco-tempo §5.1 (tenute: S = durata + 5-10 s) | CAS-05 |
| `secCambioLato` | 10 | Convenzione | ricerca-casa-poco-tempo §5.1 (unilaterali: due lati piu 10 s di cambio) | CAS-05 |
| `secPassaggioCoppia` | 15 | Convenzione | ricerca-casa-poco-tempo §5.1 (coppia: il 15 e il passaggio tra i due esercizi) | CAS-05, CAS-08 |
| `secCambio` | A 60, B 30, C 30, D 20, E 20, F 15, unilaterale 40, elastico 25 | Convenzione | ricerca-casa-poco-tempo §5.1 (colonna «Cambio X» della tabella delle classi) | CAS-05 |
| `riscaldamentoGenerale` | base 4, min 3, max 8, eta40 1, eta60 2, pesante 1, zonaDolente 1, ripetizioniPesante 5 | Convenzione | ricerca-riscaldamento-mobilita-prevenzione §3.7; registro B11 (RIS 3.7 e non il W(M) di CAS: niente doppio conteggio) | CAS-05 |
| `rampaMinuti` | 0 0, 1 1.3, 2 2.9, 3 4.1, 4 6.2, 5 7.5 | Convenzione | ricerca-riscaldamento-mobilita-prevenzione §3.9 (costo in tempo; la quinta serie, la serie «0» leggera di §3.5, e di 10 ripetizioni con 45 s di riposo: +1,3 minuti, calcolo con la stessa regola) | CAS-05 |
| `rampaSerie` | pesante [4, 3, 2], guidato [3, 2, 1], intensita [0.8, 0.7], rir 2, epley 30, manubriMeno 1, corpoLibero 1, isolamentoGuidato 1, principiante 1, prudente 1, max 5, menoRegione 1, menoGruppo 2, stessoSchemaMax 1, serieLavoroPerRiduzione 2 | Convenzione | ricerca-riscaldamento-mobilita-prevenzione §3.1-3.5 (classi, riduzioni e aumenti) | CAS-05 |
| `rampaTetto` | [[45, 5], [75, 8], [999, 10]] | Convenzione | ricerca-riscaldamento-mobilita-prevenzione §3.6 (tetto di tempo) | CAS-05 |
| `fattorePersonale` | min 0.8, max 1.4, sedute 3, completamento 0.7, minutiMin 10, minutiMax 240, sogliaNota 0.05 | Convenzione | ricerca-casa-poco-tempo §5.1 e CAS-18 (f = mediana, limitato a 0,8-1,4); le soglie di scarto sono del collaudo del tempo | CAS-18 |
| `pausa` | ipertrofia A [150, 180], B [90, 90], C [105, 120], D [75, 90], E [75, 90], F [45, 45], forza A [210, 240, 180], B [120, 120], C [120, 120], D [90, 90], E [90, 90], F [45, 45], generale A [120, 120], B [75, 75], C [90, 90], D [60, 60], E [60, 60], F [45, 45] | Convenzione | registro coach v2 B8 (Singer 2024 contro ACSM 2026: Contrastata; per la forza con carichi alti le pause lunghe hanno base: ACSM 2009, Schoenfeld 2016); ricerca-ipertrofia-programmazione §3.4 | PRG-13 |
| `pausaCorpoLibero` | 75 | Convenzione | registro coach v2 B8 (B, ipertrofia: corpo libero 75 s); ricerca-casa-poco-tempo CAS-04 | PRG-13 |
| `pausaPolpacciLaterali` | [60, 60] | Convenzione | registro coach v2 B8 (polpacci e laterali 45-60 s); ricerca-ipertrofia-programmazione §3.4 | PRG-13 |
| `pausaMinimo` | A 120, B 60, C 75, D 45, E 45, F 30 | Convenzione | registro coach v2 B8 (colonna «Minimo (taglio per il tempo)»); ricerca-casa-poco-tempo §5.4 (ordine di intervento, passo 1) | PRG-13, CAS-07 |
| `pausaMinimoAlzato` | forza B 90, C 90, F 45, ipertrofia F 45 | Convenzione | registro coach v2 B8 (colonna «Minimo») raffinata con le fasce di recupero del collaudo RX-02 (forza: macchine e multiarticolari 90-240 s; isolamenti 45-150 s) | PRG-13, CAS-07 |
| `pausaOltre65` | A 120, B 90, C 90 | Moderata | registro coach v2 B8 e B10; ricerca-fasce-di-eta §3.2 (65-74: almeno 90 s, 120 s sui pesanti; Borde) | PRG-13 |
| `pauseDonne` | fattore 0.85, classi [«B», «C», «D», «E»], ripetizioniMinime 8, minimi B 75, C 75, D 60, E 60, F 45 | Convenzione | registro coach v2 D-P7 (fonte unica: PeerJ 2025; meno affaticabili sotto l 80% di 1RM, nessuna prova ai carichi pesanti: Contrastata); ricerca-donne-carichi-iniziali §4 (Pause) | PRG-20 |
| `capacita` | min 4, max 8, minPrincipiante 4, maxPrincipiante 6, minPrincipiante2Giorni 5, minutiMinPrincipiante2Giorni 40, risparmioCoppie 0.25, minutiConCoppie 45, serieMedie 3, serieMedieForza 3.5 | Convenzione | ricerca-casa-poco-tempo §5.3-5.4 e CAS-06; ricerca-principianti-12-settimane PRI-08; registro B1 | CAS-06 |
| `durataMaxPrincipiante` | settimane1e2 40, dopo 50 | Convenzione | registro coach v2 D-P10; ricerca-principianti-12-settimane PRI-08 e §1.11 (durata consigliata 35-45 minuti, poi 45-50) | CAS-06 |
| `pavimentiTaglio` | schemiBase 4, serieBase 2, frazionarieGrandi 4, grandi [«petto», «dorsali», «quadricipiti», «femorali», «grande_gluteo»] | Moderata | ricerca-casa-poco-tempo §5.4 (passo 6: mai sotto P1 x 2 serie) e §3.8 di ricerca-ipertrofia-programmazione (sotto 4 serie frazionarie il muscolo non e da ipertrofia: Pelland, Iversen 2021) | CAS-07 |
| `giornoForzaCorto` | minuti 45, ripetizioni 6, serie 3, pausa 135 | Moderata | ricerca-ipertrofia-programmazione IPE-04 (ACSM 2026: per la massa conta la serie vicina al cedimento, non il carico; Singer 2024) | IPE-04 |
| `pocoTempo` | minuti 30, giorni 2, minutiDueGiorni 45, serieMin 4, serieMax 6 | Moderata | ricerca-ipertrofia-programmazione IPE-12 (dose minima: Iversen 2021, Androulakis-Korakakis) | IPE-12 |
| `quotaLavoroUtile` | 0.75 | Decisione | registro coach v2 B12 e D-P10 (il tempo e un tetto, non un obiettivo: la seduta usa meno del 75% dei minuti solo se il volume utile e completo) | CAS-06, CAS-07 |

## `SOGLIE_VOLUME` — `js/coach/volume/soglie-volume.js` (dosatore)

| Voce | Valore | Forza | Fonte | Regole |
|---|---|---|---|---|
| `fasceUnita` | petto principiante [6, 10], intermedio [10, 16], avanzato [12, 20], mantenimento [4, 6], dorsali principiante [6, 10], intermedio [10, 16], avanzato [12, 20], mantenimento [4, 6], quadricipiti principiante [6, 10], intermedio [10, 16], avanzato [12, 20], mantenimento [4, 6], grande_gluteo principiante [4, 8], intermedio [8, 14], avanzato [10, 16], mantenimento [0, 3], schiena_spessore principiante [4, 8], intermedio [6, 12], avanzato [8, 14], mantenimento [2, 4], femorali principiante [4, 8], intermedio [8, 12], avanzato [10, 14], mantenimento [3, 4], deltoide_laterale principiante [4, 6], intermedio [8, 14], avanzato [10, 18], mantenimento [3, 4], deltoide_posteriore principiante [3, 5], intermedio [6, 12], avanzato [8, 14], mantenimento [2, 3], bicipiti principiante [4, 6], intermedio [8, 14], avanzato [10, 18], mantenimento [3, 4], tricipiti principiante [4, 6], intermedio [6, 12], avanzato [8, 16], mantenimento [3, 4], polpacci principiante [4, 6], intermedio [8, 12], avanzato [10, 16], mantenimento [4, 6], adduttori principiante [0, 2], intermedio [3, 8], avanzato [4, 10], mantenimento [0, 2], abduttori principiante [0, 2], intermedio [2, 6], avanzato [3, 8], mantenimento [0, 0], addome principiante [2, 4], intermedio [4, 8], avanzato [6, 10], mantenimento [0, 2], deltoide_anteriore principiante [0, 10], intermedio [0, 14], avanzato [0, 16], mantenimento [0, 0] | Convenzione | registro coach v2 B6 (VOLUME_UNITA): fasce IPE (ricerca-ipertrofia-programmazione §3.2) per petto, dorsali e quadricipiti, per muscolo da ricerca-specializzazione §3.1; massimo del deltoide anteriore per principianti: come le unità grandi (la tabella non lo dà) | IPE-01 |
| `minimoAllenati` | 10 | Solida | Schoenfeld 2017; ACSM 2026 (137 revisioni): negli allenati almeno 10 serie a settimana per le unità grandi (registro B6) | IPE-01 |
| `fasciaGlutei` | principiante [8, 12], intermedio [12, 18], avanzato [14, 20] | Convenzione | registro coach v2 B6 (grande gluteo: obiettivo glutei 8-12 / 12-18 / 14-20) | IPE-01 |
| `fasceGenerale` | principiante [4, 8], intermedio [6, 10], avanzato [8, 12] | Convenzione | registro coach v2 B6 (salute e generale: unità grandi 4-8 / 6-10 / 8-12); ricerca-ipertrofia-programmazione §3.2; ACSM 2026 | IPE-01 |
| `minimoPiccoleGenerale` | 2 | Convenzione | registro coach v2 B6 (salute e generale: unità piccole nessun minimo diretto, almeno 2 serie frazionarie) | IPE-01 |
| `forzaQuotaFascia` | 0.5 | Convenzione | registro coach v2 B6 (forza: unità grandi nella metà bassa della fascia, piccole a «mantenimento») | IPE-01 |
| `femoraliSuQuadricipiti` | 0.6 | Convenzione | registro coach v2 B6 (femorali ≥ 0,6 × quadricipiti); Maeo 2021 per la flessione del ginocchio (Moderata) | IPE-01 |
| `pavimentiDirette` | deltoide_laterale g4 [6, 8], g3 [4, 6], g2 [3, 3], forza [2, 3], generale [0, 2], deltoide_posteriore g4 [4, 6], g3 [3, 4], g2 [2, 2], forza [2, 2], generale [0, 2], bicipiti g4 [4, 6], g3 [4, 4], g2 [2, 2], forza [2, 2], generale [0, 2], tricipiti g4 [4, 6], g3 [4, 4], g2 [2, 2], forza [2, 2], generale [0, 2], polpacci g4 [8, 8], g3 [6, 6], g2 [3, 4], forza [3, 3], generale [2, 2], femorali g4 [4, 6], g3 [4, 4], g2 [2, 2], forza [2, 2], generale [2, 2], addome g4 [4, 6], g3 [4, 4], g2 [2, 2], forza [2, 2], generale [2, 2] | Convenzione | registro coach v2 B6 (pavimenti IPE-02 per giorni); ricerca-specializzazione §6.1; Maeo 2023 e Baz-Valle 2022 per tricipiti e bicipiti (Moderata) | IPE-02 |
| `tettoSeduta` | morbido 8, duro 11, specializzazione 8, specializzazionePiccole 6 | Provvisoria | Remmert 2025 (preprint, meta-regressione sul volume per seduta); Henselmans (≤ 6 per i piccoli in specializzazione); registro coach v2 B7 e C.4 | IPE-06, EST-05 |
| `serieMaxEsercizio` | composto 5, isolamento 6 | Convenzione | Krieger 2010; Ralston 2017 (2-6 serie per esercizio: Solida/Moderata); stesso tetto del collaudo (SERIE_MAX_ESERCIZIO) | IPE-01 |
| `serieMaxIsolamentoConFastidio` | 4 | Convenzione | revisione indipendente INT-2d, M7 (misurato: isolamenti a 6 serie in centinaia di programmi, Alzate Laterali 6 x 15 con la spalla dolente); regola di sicurezza (tolleranza zero, SAF-02: nessun esercizio aggiunto carica una zona dolente senza prudenza) | IPE-01, SAF-02 |
| `serieMaxCore` | 3 | Convenzione | ABB-03 (un esercizio di core a fine seduta, 2-3 serie: strCopri, strCoreNuovo); ricerca-biomeccanica-esercizi §4 SEL-07 e D10 (core 2-6 serie a settimana, poco volume); registro B6 (addome 2-4 / 4-8 / 6-10 a settimana) | IPE-01, IPE-06 |
| `eserciziMaxSeduta` | adulto 8, principiante 6 | Convenzione | collaudo del generatore (ES_MAX_SEDUTA, ES_MAX_PRINCIPIANTE); piano E.3 W2-T1 | IPE-01 |
| `seduteMinimeUnita` | 2 | Solida | ACSM 2026 (137 revisioni): ogni grande gruppo almeno 2 sedute a settimana; collaudo FRQ-01 | IPE-01 |
| `serieMinSeduta` | 1.5 | Convenzione | collaudo FRQ-01 (una seduta conta da 1,5 serie frazionarie, cioè 3 serie sinergiche) | IPE-01 |
| `priorita` | massimoUnita 2, aumento leggera 0.25, intermedio 0.25, avanzato 0.45, tetto predefinito 20, deltoide_laterale 22, deltoide_posteriore 22, polpacci 22, tricipiti 18, altriQuota 0.5 | Convenzione | registro coach v2 B19 e D-P17; ricerca-specializzazione §5.2 (+25% intermedio, +40-50% avanzato, tetti 20 / 22 / 18); Bickel 2011 per il mantenimento (conoscenza del modello) | EST-02, EST-05, EST-06 |
| `deficit` | minimo 0.85, massimo 0.9 | Convenzione | registro coach v2 B6 e C.4 (OBI-04: 85-90% del picco); ricerca-mesocicli §3.2 e §3.12.2; Helms 2015 (conoscenza del modello) | OBI-04 |
| `fattoreFisico` | ffmiBasso 1.2, magraInCalo 0.85 | Convenzione | PRG-26 di prima (compone.js, fattoreFisico): massa magra bassa +20%, in calo -15%; registro coach v2 (PRG-26 ritirata: passa al punto di partenza) | IPE-01 |
