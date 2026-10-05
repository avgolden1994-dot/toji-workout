# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2887 nodes · 7918 edges · 156 communities (147 shown, 9 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 591 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28809c4b`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +3
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + coach-mappa-regole.md, coach-v2-decisioni.md, ricerca-mesocicli-periodizzazione-scarichi.md +7
- Onboarding: creazione del programma · js/ui/onboarding.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, schede-pronte.js, navigazione.js +5
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + stile-iphone.js, schermo-acceso.js, psicologia.js +2
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + repertorio.js, regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md +3
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js
- Schermata Oggi · js/ui/oggi.js + riepilogo.js, statistiche.js, repertorio.js +7
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, dolore-mattina.js +12
- Soglie del coach (W1-T1, piano coach v2 B.4; registro docs/coach-v2-decisioni.md C.4): ogni file js/ · tests/soglie.test.js + catalogo.test.js
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js
- Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + intensita.js, esigenza.js, parametri.js +1
- Manifest della PWA · manifest.json
- Variazione del coach: ricette a slot e composizione delle sedute (componiSedute) · js/coach/programma/ricette.js + completamenti.js, importa-progressi.js, genera.js +7
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +6
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js
- Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, avvio.test.js
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js
- Piano: scelta del giorno · js/ui/piano/giorno.js + agente-consigli.js, selezione-multipla.js, annulla.js +11
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + questionario-decisioni.js, biomeccanica.js, schede-tecniche.js
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js
- integra-onda.js · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js
- Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js, piano-coach-v2.md +1
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, riposo-settimane.js, seduta.js
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2
- Test: struttura e avvio · tests/struttura.test.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, completamenti.js +1
- Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +4
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- BIA nelle opzioni · js/coach/bia/opzioni.js + archivio.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, stato-condiviso.js, utility.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + coach-v2-decisioni.md, e1rm.js, seduta.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md + coach-v2-decisioni.md, ricerca-mesocicli-periodizzazione-scarichi.md, motore.js +1
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js
- Backup e ripristino · js/core/backup.js + storico.js, fogli.js, sessione-completata.js +7
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js, integrazione-onda0.test.js +1
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + serie-ripetizioni.js, libreria-esercizi.js, biomeccanica.js +11
- Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js + intensita-onda0.test.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3) · js/coach/regia/fasi.js + regole-ricerca.js, taratura.js
- Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md
- Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + genera.js, volume.js, piano-coach-v2.md +3
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, seduta-libera.js
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md + mesociclo.js, ricerca-algoritmi-carichi-e-app.md, ricerca-mesocicli-periodizzazione-scarichi.md +3
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Coach: prontezza prima della seduta · js/coach/prontezza.js + mi-sento-male.js, utility.js, cedimento.js +4
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js, costanti.js +2
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Consenso ai dati · js/core/consenso.js + costanti.js, modalita.js, guida-interattiva.js +1
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md
- Coach: psicologia · js/coach/psicologia.js + metodi-momenti.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +1
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + pagine.js, ricerca-cardio-nutrizione.md, piano-coach-v2.md +2
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js
- Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Alternative e applicazione del programma · js/coach/programma/alternative.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + repertorio.js, stampa-scheda.js, storage.js +11
- Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, piano-lancio-appstore.md, 04-sicurezza-privacy.md +1
- Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js
- Progressi: foto · js/ui/progressi/foto.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js
- Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, regole-ricerca.js
- elenco-soglie.js · tools/elenco-soglie.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Carico progressivo · js/coach/carichi/progressivo.js + regole-ricerca.js, mappa-per-agenti.md, dolore-mattina.js
- Coach: psicologia (parte 2) · js/coach/psicologia.js + onboarding.js, lettore.js, onboarding-risultato.js
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- Tempo della seduta: quanti esercizi, quanti minuti, adattamento ai minuti dichiarati (PRG-03, DUR, EXN-02, REC-01, SES-01) · js/coach/volume/tempo.js + volume.js, mappa-per-agenti.md, parametri.js +1
- 3in · README.md
- Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js
- Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04) · js/dati/attributi-esercizi.js
- Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + catalogo-regole.js, soglie-coach.md, ARCHITETTURA.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 3) · docs/ricerca-donne-carichi-iniziali.md
- Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- Coach: schemi di movimento · js/coach/programma/schemi.js + volume.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js
- Soglie della regia del coach (REG-01, REG-04) · js/coach/regia/soglie-regia.js
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 3) · docs/ricerca-ipertrofia-programmazione.md
- Tecniche di intensita: drop set, superserie, AMRAP, back-off, potenza e cluster (MAV-02, MAV-03, ETA-02, ABB-06) · js/coach/volume/tecniche.js
- Mappa per agenti · docs/mappa-per-agenti.md

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 106 edges
2. `renderAllenamento()` - 93 edges
3. `findExercise()` - 74 edges
4. `currentDay` - 74 edges
5. `Novità del coach v2` - 73 edges
6. `renderPiano()` - 72 edges
7. `showUndo()` - 67 edges
8. `ymd()` - 65 edges
9. `getProfile()` - 58 edges
10. `senzaEmoji()` - 55 edges

## Surprising Connections (you probably didn't know these)
- `7. Regole proposte` --references--> `carico()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → tests/carichi-onda0.test.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `D.1 Ambito` --references--> `contestoCarichi()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js
- `D.4 Barra e corpo libero` --references--> `alternativeStessoMuscolo()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js
- `D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19)` --references--> `applicaPartenze()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (156 total, 9 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +3"
Cohesion: 0.08
Nodes (55): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html) (+47 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + coach-mappa-regole.md, coach-v2-decisioni.md, ricerca-mesocicli-periodizzazione-scarichi.md +7"
Cohesion: 0.11
Nodes (33): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato) (+25 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js"
Cohesion: 0.15
Nodes (32): biaField(), chip(), etaPerProgramma(), MSG_ETA_SOTTO_MINIMO, nuovoOnbData(), ONB_ATTREZZI, ONB_FASTIDI, ONB_FREQ (+24 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, schede-pronte.js, navigazione.js +5"
Cohesion: 0.12
Nodes (35): currentMode, daysContainer, renderDayBar(), CHIAVI_COACH_IA_RIMOSSO, dataKey(), getDayTitle(), historyKey(), leggiJSON() (+27 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + stile-iphone.js, schermo-acceso.js, psicologia.js +2"
Cohesion: 0.16
Nodes (29): renderSetPage(), renderSettings(), sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, openConsentText(), applicaZoom(), applyTheme() (+21 more)

### Community 5 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + repertorio.js, regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md +3"
Cohesion: 0.19
Nodes (22): E.0 Protocollo di lavoro (vale per ogni task), E.1 Onda 0 — strumenti e bug netti, E.4 Onda 3 — carichi e autoregolazione, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate, 3.12 Concatenare i blocchi in 6-12 mesi (+14 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.04
Nodes (41): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheEs, CATEGORIA_ATTREZZO, CONTROINDICAZIONI, CRITERI, DIRETTE_MIN_MUSCOLO (+33 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js"
Cohesion: 0.13
Nodes (33): GUIDA_BACKUP, guidaApplicaFoto(), aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio() (+25 more)

### Community 8 - "Schermata Oggi · js/ui/oggi.js + riepilogo.js, statistiche.js, repertorio.js +7"
Cohesion: 0.21
Nodes (23): consigliCoach2(), livelloStimato(), prossimoGiornoLibero(), fattoQuestaSettimana(), minutiCardioSettimana(), renderCardioStat(), lunediDi(), piuGiorni() (+15 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.09
Nodes (23): B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati, B17. Scarico reattivo (+15 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.27
Nodes (21): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+13 more)

### Community 12 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, dolore-mattina.js +12"
Cohesion: 0.13
Nodes (43): Appendice B. Simulazioni eseguite (riproducibili), C. Igiene dei dati: lo scarico non è un dato di forma, 5. Regole proposte, getProfile(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), aggiornaEsigenza() (+35 more)

### Community 13 - "Soglie del coach (W1-T1, piano coach v2 B.4; registro docs/coach-v2-decisioni.md C.4): ogni file js/ · tests/soglie.test.js + catalogo.test.js"
Cohesion: 0.12
Nodes (11): voce(), assert, fs, os, path, R, S, SOTTO_COACH (+3 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js"
Cohesion: 0.05
Nodes (56): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+48 more)

### Community 15 - "Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.06
Nodes (46): 3.9 Seduta o pausa saltata, Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), acorn, AGGIUSTI, assert, BIA (+38 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + intensita.js, esigenza.js, parametri.js +1"
Cohesion: 0.10
Nodes (34): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+26 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Variazione del coach: ricette a slot e composizione delle sedute (componiSedute) · js/coach/programma/ricette.js + completamenti.js, importa-progressi.js, genera.js +7"
Cohesion: 0.15
Nodes (30): 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 6. Audit delle regole esistenti, bonusBiomecc(), completaSettimana(), NOTA_REMATORE_INVERSO, rinforzaFemorali(), adattoAllaSeduta(), componiSedute() (+22 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js"
Cohesion: 0.28
Nodes (17): trEs(), alternativeOggi(), chiudiOccupato(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato(), htmlSostituito() (+9 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +6"
Cohesion: 0.16
Nodes (49): currentDay, selectDay(), armedSet, loadData(), saveData(), annullaCedimento(), copiaRecord(), pulisciSostituzioniVecchie() (+41 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js"
Cohesion: 0.24
Nodes (18): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+10 more)

### Community 23 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js"
Cohesion: 0.45
Nodes (12): accosciato(), arto(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW, piegato(), sdraiato() (+4 more)

### Community 24 - "Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, avvio.test.js"
Cohesion: 0.08
Nodes (23): assert, fs, path, test, fs, html, lista, mancanti (+15 more)

### Community 25 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js"
Cohesion: 0.22
Nodes (25): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, aggiornaRiassuntoMusica(), clearCedimentoAudio(), closeMusicSheet(), getResolvedAudioMode() (+17 more)

### Community 26 - "Piano: scelta del giorno · js/ui/piano/giorno.js + agente-consigli.js, selezione-multipla.js, annulla.js +11"
Cohesion: 0.13
Nodes (26): closeAgent(), deltaTesto(), openAgent(), renderAgent(), restartOnboarding(), switchProtocol(), chiudiQuestionario(), controlloSchemi() (+18 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (24): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+16 more)

### Community 28 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + questionario-decisioni.js, biomeccanica.js, schede-tecniche.js"
Cohesion: 0.05
Nodes (55): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+47 more)

### Community 29 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.05
Nodes (39): 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato), 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»), 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti, 2.10 Candito 6 settimane, 2.11 Sheiko, 2.12 RTS: Reactive Training Systems (Mike Tuchscherer), 2.13 Barbell Medicine (+31 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.13
Nodes (15): scripts, cancello, catalogo, collaudo:schede, controlla, grafo, grafo:verifica, indice (+7 more)

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (8): 2. Dove le fonti non concordano, 4. Primo giorno, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 15 ricerche riuscite, Appendice B. Query pronte (da rilanciare con il tetto alzato), In una pagina, Ricerca: le prime 12 settimane del principiante e la prima seduta

### Community 32 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.11
Nodes (18): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+10 more)

### Community 33 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js"
Cohesion: 0.18
Nodes (12): 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere), 3.1 Ingressi (tutti già disponibili nel codice), 3.2 Classi di esercizio, 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W), 3.4 Riduzioni («quando saltare»), 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra), 3.6 Arrotondamento e tetto di tempo, 3.7 Riscaldamento generale (minuti) (+4 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md"
Cohesion: 0.38
Nodes (12): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, applicaPartenze(), arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA (+4 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js"
Cohesion: 0.49
Nodes (10): currentWebMode, aggiornaAvvisoDock(), attesaAvvio, controllaAvvioMusica(), dockDaAprire(), dockStato(), posizionaDock(), toggleDock() (+2 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.06
Nodes (34): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+26 more)

### Community 40 - "Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js"
Cohesion: 0.29
Nodes (11): openExerciseInfo(), exInfoNome, exVuoto(), paneGrafico(), paneRecord(), paneStorico(), setExInfoTab(), PATTERN_INFO (+3 more)

### Community 41 - "Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js, piano-coach-v2.md +1"
Cohesion: 0.07
Nodes (42): B.2 Il contratto: un `brief` che attraversa la squadra, ATTREZZI_PALESTRA, BIA, { caricaApp }, conScelte(), costruisciConProfilo(), GRUPPI, idMetodi() (+34 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.08
Nodes (24): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima, 1. Cosa dicono le fonti (+16 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, riposo-settimane.js, seduta.js"
Cohesion: 0.19
Nodes (25): avviaTempoSeduta(), openWorkoutDay(), renderWorkoutDayPicker(), isRestDay(), syncRestToggle(), annullaSpeciale(), apriSedutaLibera(), avviaSpeciale() (+17 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2"
Cohesion: 0.16
Nodes (44): sceltaSaltata(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcFillMonth() (+36 more)

### Community 45 - "Test: struttura e avvio · tests/struttura.test.js"
Cohesion: 0.18
Nodes (9): acorn, assert, fs, html, path, R, scripts, stili (+1 more)

### Community 46 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.20
Nodes (10): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+2 more)

### Community 47 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, completamenti.js +1"
Cohesion: 0.22
Nodes (23): TOCCHI, ordinaSedute(), schemaDi(), SCHEMI_RISERVA, STR_PESI, strAntagonisti(), strBilancia(), strChiave() (+15 more)

### Community 48 - "Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +4"
Cohesion: 0.14
Nodes (24): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), escapeHtml(), jsArg(), MUSCLE_GROUPS, aggiornaDopoScambio(), attachSwapDrag() (+16 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.09
Nodes (22): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+14 more)

### Community 50 - "BIA nelle opzioni · js/coach/bia/opzioni.js + archivio.js"
Cohesion: 0.34
Nodes (11): closeBiaSheet(), eliminaBia(), openBiaSheet(), renderBiaSheet(), rigaBia(), salvaBiaAgente(), salvaBiaLetta(), toggleBiaManuale() (+3 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, stato-condiviso.js, utility.js"
Cohesion: 0.25
Nodes (15): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+7 more)

### Community 52 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + coach-v2-decisioni.md, e1rm.js, seduta.js"
Cohesion: 0.20
Nodes (11): F.1 Le 12 modifiche che contano di più (qualità e sicurezza), in ordine, F.2 Riordino delle ondate (le ondate restano rilasciabili), F. Priorità reale, 5.1 Funzioni molto apprezzate, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, caricoPer() (+3 more)

### Community 53 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js"
Cohesion: 0.25
Nodes (8): 4. Audit delle regole esistenti (confronto con il codice), 3.3 Struttura per giorni a settimana, 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie, 6. Audit delle regole esistenti, splitFor()

### Community 54 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md + coach-v2-decisioni.md, ricerca-mesocicli-periodizzazione-scarichi.md, motore.js +1"
Cohesion: 0.06
Nodes (36): E. Copertura del collaudo (40 criteri falliti su 48), 3.5 Carico e ripetizioni settimana per settimana, 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice), 0. Come si legge, 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento) (+28 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.07
Nodes (31): 8. Regole proposte, alt(), app5, assert, ATTR5, bersaglio(), c, carica() (+23 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js"
Cohesion: 0.19
Nodes (25): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR (+17 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Backup e ripristino · js/core/backup.js + storico.js, fogli.js, sessione-completata.js +7"
Cohesion: 0.13
Nodes (32): consigliAgente(), applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ripristinaBackup() (+24 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js, integrazione-onda0.test.js +1"
Cohesion: 0.07
Nodes (28): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+20 more)

### Community 61 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + serie-ripetizioni.js, libreria-esercizi.js, biomeccanica.js +11"
Cohesion: 0.11
Nodes (28): 5.6 Cue: stato nell'app [V], 6. Audit delle regole esistenti, 8. Regole proposte, 7. Regole proposte, CUE_SCHEMA, cueEsercizio(), stabile(), inAllungamento() (+20 more)

### Community 62 - "Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js + intensita-onda0.test.js"
Cohesion: 0.10
Nodes (16): app(), assert, { caricaApp }, costruisci(), gruppo(), nomi(), pulito(), schema() (+8 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3) · js/coach/regia/fasi.js + regole-ricerca.js, taratura.js"
Cohesion: 0.29
Nodes (8): segnaEsercizioTaratura(), eseguiFasi(), FASI_PUNTI, fasiRegistrate(), registraFase(), applicaCaricoProgressivo(), carichiDelGiorno(), caricoProssimo()

### Community 65 - "Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md"
Cohesion: 0.46
Nodes (7): 6. Regole proposte, apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo()

### Community 66 - "Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + genera.js, volume.js, piano-coach-v2.md +3"
Cohesion: 0.12
Nodes (31): E.2 Onda 1 — fondamenta, E.3 Onda 2 — il generatore, F.2 Rischi e rimedi, METODI, metodoDa(), briefCoach(), briefOggi(), chiDa() (+23 more)

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, seduta-libera.js"
Cohesion: 0.18
Nodes (20): 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5. Audit della libreria, 7. Regole proposte, Parte A (da fatti del codice) (+12 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md + mesociclo.js, ricerca-algoritmi-carichi-e-app.md, ricerca-mesocicli-periodizzazione-scarichi.md +3"
Cohesion: 0.09
Nodes (30): 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale, 0. Stato della ricerca (leggere prima), 2. Dove le fonti non concordano, 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento), 3.2 Quando tenere, ripetere, scaricare o riportare indietro, 3.3 Dal RIR o RPE al carico della seduta dopo (+22 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.10
Nodes (19): 2. Dove le fonti non concordano, 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti, 3.6 Disegno dello scarico: cosa si taglia, 3.8 Come devono trattare lo scarico le altre regole (+11 more)

### Community 71 - "Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js"
Cohesion: 0.08
Nodes (24): app, assert, ATTR, { caricaApp }, CTRL, DETT, DIFFERENZE, differenzeVere() (+16 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.13
Nodes (14): 1. Riepilogo numeri, 2. Tabella completa, 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno), 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file (+6 more)

### Community 76 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.11
Nodes (17): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), B.1 La squadra (8 sotto-coach e un regista), B.3 Le catene: ordine fisso e scritto, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach (+9 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + mi-sento-male.js, utility.js, cedimento.js +4"
Cohesion: 0.17
Nodes (23): apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI (+15 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js, costanti.js +2"
Cohesion: 0.16
Nodes (28): FAILURE_SET_SECONDS, spotifyController, webDuration, ytPlayer, ytPlayerReady, formatMMSS(), avviaWebPronto(), caricaPlayerWebSalvato() (+20 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.15
Nodes (13): confronta(), costruisciRisultato(), creaAmbiente(), ctx, dirUscita(), gitInfo(), main(), mdReport() (+5 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Consenso ai dati · js/core/consenso.js + costanti.js, modalita.js, guida-interattiva.js +1"
Cohesion: 0.18
Nodes (11): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, DEFAULT_MONDAY_PROGRAM, MODE_KEY, MODE_META, chooseMode() (+3 more)

### Community 85 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 86 - "Coach: psicologia · js/coach/psicologia.js + metodi-momenti.js"
Cohesion: 0.24
Nodes (9): vaiAlMomento(), closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, ritrattoCoach(), SET_PAGINE, setPsico() (+1 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md"
Cohesion: 0.32
Nodes (11): TEC-07 tetto alle tecniche al cedimento (RIC-04), giorniDallUltimaSeduta(), gruppoInPriorita(), limitaTecnicheIntense(), mancavaSoloUltimaSerie(), prontezzaRecente(), regoleRicAlCarico(), rientroPiano() (+3 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js"
Cohesion: 0.18
Nodes (20): calcolaBlocco(), calcolaStatistiche(), cercaAggiornamento(), closeStats(), getNome(), graficoFrequenzaHtml(), mostraPeriodoAttivo(), poligonoFrequenzaSvg() (+12 more)

### Community 91 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3"
Cohesion: 0.07
Nodes (25): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+17 more)

### Community 92 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.20
Nodes (9): 2. Dove le fonti non concordano, 4. Blocchi di mobilità, 5. Prehab per sicurezza, 8. Domande aperte, 9. Limiti onesti, Appendice: query pronte (da ripetere con il tetto di ricerca alzato), Come si legge, In una pagina (+1 more)

### Community 93 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +1"
Cohesion: 0.29
Nodes (18): Flussi principali, mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale(), tipoSessione(), dropActive, dropInterval (+10 more)

### Community 94 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 95 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.70
Nodes (5): hash32(), matrice(), mulberry32(), profilo(), scegli()

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + pagine.js, ricerca-cardio-nutrizione.md, piano-coach-v2.md +2"
Cohesion: 0.20
Nodes (21): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, frenoBia(), fattoreFisico(), apriPagProgressi(), chiudiPagProgressi(), htmlPesate() (+13 more)

### Community 100 - "collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (14): contaSerie(), controindicato(), coperturaLibreria(), dacautela(), gruppoDi(), infoEs(), modello(), rirPianificato() (+6 more)

### Community 101 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 102 - "07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 103 - "08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 104 - "Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js"
Cohesion: 0.20
Nodes (6): assert, BASE, { caricaApp }, decidi(), IN_VM(), test

### Community 105 - "Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js"
Cohesion: 0.11
Nodes (19): assert, BLOCCATE, BLOCCATE_IN_PARTE, catalogoVero(), contesto(), fs, G, JSON_W1T1 (+11 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.10
Nodes (19): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 109 - "Alternative e applicazione del programma · js/coach/programma/alternative.js"
Cohesion: 0.47
Nodes (9): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+1 more)

### Community 111 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + repertorio.js, stampa-scheda.js, storage.js +11"
Cohesion: 0.17
Nodes (29): apprendiTaraturaRir(), consumaAggiusti(), applyGeneratedProgram(), AGG_KEY(), aggiustiCoach(), applicaDecisioni(), inviaQuestionario(), riduciFrequenza() (+21 more)

### Community 112 - "Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js"
Cohesion: 0.36
Nodes (8): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), bindBiaInputs(), ensurePdfJs()

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

### Community 117 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, piano-lancio-appstore.md, 04-sicurezza-privacy.md +1"
Cohesion: 0.07
Nodes (37): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+29 more)

### Community 118 - "Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js"
Cohesion: 0.31
Nodes (9): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, spotifyReady, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks() (+1 more)

### Community 119 - "Progressi: foto · js/ui/progressi/foto.js"
Cohesion: 0.35
Nodes (15): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+7 more)

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 121 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 122 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.23
Nodes (15): codiceNellaVoce(), costruisciCatalogo(), espandiCodici(), fs, leggiBloccate(), leggiRegole(), leggiRepo(), leggiRitirati() (+7 more)

### Community 123 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 124 - "Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js"
Cohesion: 0.31
Nodes (9): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), EMOJI_TESTA, I18N, PATTERN_RULES, patternFor() (+1 more)

### Community 125 - "Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md"
Cohesion: 0.22
Nodes (9): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+1 more)

### Community 126 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, regole-ricerca.js"
Cohesion: 0.22
Nodes (15): htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), TEST_FAI_DA_TE, TECNICHE, ATTREZZI_PALESTRA, chipCoach() (+7 more)

### Community 127 - "elenco-soglie.js · tools/elenco-soglie.js"
Cohesion: 0.20
Nodes (14): caricaSoglie(), cella(), FORZE_AMMESSE, fs, generaElenco(), main(), path, R (+6 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Carico progressivo · js/coach/carichi/progressivo.js + regole-ricerca.js, mappa-per-agenti.md, dolore-mattina.js"
Cohesion: 0.42
Nodes (11): Nomi in posti inattesi, caricoRiferimento(), esercizioInScarico(), faseSedutaSalvata(), pesoUltimoDi(), sedutePerEsercizio(), ultimeSessioni(), aggiustiAlCarico() (+3 more)

### Community 130 - "Coach: psicologia (parte 2) · js/coach/psicologia.js + onboarding.js, lettore.js, onboarding-risultato.js"
Cohesion: 0.36
Nodes (8): analyzeBia(), onbMomento(), onbPsico(), renderPsicoStep(), onbData, onbPick(), optHtml(), renderOnbResult()

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 133 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.22
Nodes (8): 0. In breve, 2. Dove le fonti non concordano, 4. Regole per le donne oltre ai carichi, 7. Domande aperte, 8. Limiti onesti, Appendice A. Registro delle 20 ricerche riuscite, Appendice B. Query pronte per ripeterle con il tetto alzato, Ricerca: donne, carichi di partenza prudenti e allenamento al femminile

### Community 134 - "Tempo della seduta: quanti esercizi, quanti minuti, adattamento ai minuti dichiarati (PRG-03, DUR, EXN-02, REC-01, SES-01) · js/coach/volume/tempo.js + volume.js, mappa-per-agenti.md, parametri.js +1"
Cohesion: 0.20
Nodes (27): Novità del coach v2, COACH_PARAMETRI, vincoliSicurezza(), adattaAlTempo(), durataSeduta(), exerciseCountFor(), numeroEsercizi(), PARAM_NUMERO_ESERCIZI (+19 more)

### Community 136 - "Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js"
Cohesion: 0.15
Nodes (9): assert, { caricaApp, radice }, COMMENTO, filesDi(), fs, ORFANE, path, SEMINA_ORFANE (+1 more)

### Community 137 - "Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04) · js/dati/attributi-esercizi.js"
Cohesion: 0.16
Nodes (20): ATTREZZI_ESERCIZIO, ATTRIBUTI, attributi(), _attributiEspansi(), classeTecnica(), CLASSI_TECNICA, contaVolume(), creditoMuscoli() (+12 more)

### Community 138 - "Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + catalogo-regole.js, soglie-coach.md, ARCHITETTURA.md"
Cohesion: 0.20
Nodes (15): Catalogo delle regole generato dalla mappa (npm run catalogo), Soglie del coach, `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista), COACH_REGOLE, COACH_REGOLE_PER_CODICE, COACH_SQUADRA, regolaDescritta(), aggiungiPerche() (+7 more)

### Community 139 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 3) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.25
Nodes (8): 3.1 Metodo, parametri, assunzioni, 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg), 3.4 Peso corporeo e massa magra, 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante), 3.6 Fattore prudente e sblocco rapido (DON-04), 3.7 Pavimento della barra e alternative, 3.8 Come tarare con dati reali (senza inviare nulla), 3. Carichi di partenza: tabelle

### Community 140 - "Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md"
Cohesion: 0.20
Nodes (9): 0. Come si legge, C.1 Criterio, C.2 Elenco (16 regole; 7 sono bloccate solo in parte), C.3 Non bloccate, anche se toccano popolazioni o salute (motivo in una riga), C.4 Numeri che escono come «Convenzione» con etichetta visibile, C. Regole bloccate dalla verifica, D. Decisioni di prodotto (prese; rispondono al cap. H del piano), G. Cose non risolte (e proposta) (+1 more)

### Community 141 - "collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.50
Nodes (4): eseguiMatrice(), pesoProfilo(), r1(), tabellaSettimana()

### Community 142 - "Coach: schemi di movimento · js/coach/programma/schemi.js + volume.js"
Cohesion: 0.25
Nodes (10): GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), SCHEMI_MOV (+2 more)

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.10
Nodes (19): 2. Dove le fonti non concordano, 3.10 Corpo libero, elastici, cavi, tempo, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+11 more)

### Community 144 - "collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.33
Nodes (6): analizza(), autotest(), contesto(), costruisci(), datiPerBuild(), tipoObiettivo()

### Community 147 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 148 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.22
Nodes (9): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+1 more)

### Community 149 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js"
Cohesion: 0.22
Nodes (9): 5.1 Chi ci può accedere (SPE-03), 5.2 La ricetta, in otto passi, 5.3 Come innestarla su ogni split, 5.4 Esercizi per priorità (nomi della libreria attuale `libreria-esercizi.js`), 5.5 Durata e regola di uscita (SPE-08), 5. Programma di specializzazione, 7. Audit delle regole esistenti, ricettaPunti() (+1 more)

### Community 150 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js"
Cohesion: 0.44
Nodes (8): applicaMomento(), chiediMomento(), confermaMomento(), MOMENTI, momentoDa(), momentoInAttesa, setMomento(), UL4

### Community 151 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md"
Cohesion: 0.29
Nodes (7): 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 153 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 3) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.33
Nodes (5): 2. Dove le fonti non concordano, 6. Domande aperte, 7. Limiti onesti, 8. Appendice: query pronte per un'altra sessione con il tetto alzato, Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

### Community 154 - "Tecniche di intensita: drop set, superserie, AMRAP, back-off, potenza e cluster (MAV-02, MAV-03, ETA-02, ABB-06) · js/coach/volume/tecniche.js"
Cohesion: 0.53
Nodes (5): assegnaTecniche(), senzaCedimento(), senzaCedimentoPer(), TECNICHE_AL_CEDIMENTO, ZONA_DEL_FASTIDIO

### Community 155 - "Mappa per agenti · docs/mappa-per-agenti.md"
Cohesion: 0.50
Nodes (3): Come cercare (in quest'ordine), Mappa per agenti, Stile

## Knowledge Gaps
- **901 isolated node(s):** `ATTR`, `1. Flusso di lavoro`, `2. Principi visivi`, `3. Modello di prompt (due pose affiancate, una sola generazione)`, `4. Lavorazione del file (lato Claude)` (+896 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1001 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Piano: scelta del giorno · js/ui/piano/giorno.js + agente-consigli.js, selezione-multipla.js, annulla.js +11` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, schede-pronte.js, navigazione.js +5`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + stile-iphone.js, schermo-acceso.js, psicologia.js +2`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, dolore-mattina.js +12`, `Coach: prontezza prima della seduta · js/coach/prontezza.js + mi-sento-male.js, utility.js, cedimento.js +4`, `Backup e ripristino · js/core/backup.js + storico.js, fogli.js, sessione-completata.js +7`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +1`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 72 inferred relationships involving `Novità del coach v2` (e.g. with `e1rm()` and `e1rmSeduta()`) actually correct?**
  _`Novità del coach v2` has 72 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ATTR`, `1. Flusso di lavoro`, `2. Principi visivi` to the rest of the system?**
  _901 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._
- **Why does `renderAllenamento()` connect `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +6` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +3`, `Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, seduta-libera.js`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + stile-iphone.js, schermo-acceso.js, psicologia.js +2`, `Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js`, `Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, dolore-mattina.js +12`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, completamenti.js +1`, `Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +4`, `Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, stato-condiviso.js, utility.js`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +1`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js`, `Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js`, `Schede tecniche per esercizio · js/dati/schede-tecniche.js + serie-ripetizioni.js, libreria-esercizi.js, biomeccanica.js +11`, `Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, regole-ricerca.js`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + coach-mappa-regole.md, coach-v2-decisioni.md, ricerca-mesocicli-periodizzazione-scarichi.md +7` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, dolore-mattina.js +12` to `Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3) · js/coach/regia/fasi.js + regole-ricerca.js, taratura.js`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +3`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, schede-pronte.js, navigazione.js +5`, `Piano: scelta del giorno · js/ui/piano/giorno.js + agente-consigli.js, selezione-multipla.js, annulla.js +11`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js`, `Schermata Oggi · js/ui/oggi.js + riepilogo.js, statistiche.js, repertorio.js +7`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, riposo-settimane.js, seduta.js`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2`, `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + repertorio.js, stampa-scheda.js, storage.js +11`, `Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +4`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, completamenti.js +1`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +6`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js`, `Backup e ripristino · js/core/backup.js + storico.js, fogli.js, sessione-completata.js +7`, `Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js`, `Schede tecniche per esercizio · js/dati/schede-tecniche.js + serie-ripetizioni.js, libreria-esercizi.js, biomeccanica.js +11`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._