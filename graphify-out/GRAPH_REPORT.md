# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2593 nodes · 7224 edges · 125 communities (117 shown, 8 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 457 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30561af3`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + ricerca-obiettivi-e-programmi.md, coach-v2-decisioni.md, ricerca-cardio-nutrizione.md +2
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + regole-ricerca.js, ricerca-algoritmi-carichi-e-app.md, ricerca-forza-progressione.md +5
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, traduttore.js +2
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + regole-ricerca.js, piano-coach-v2.md, ricerca-cardio-nutrizione.md +5
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + foto.js, termina-e-cardio.js, pagine.js +1
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Schermata Oggi · js/ui/oggi.js + annulla.js, impostazioni.js
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +3
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md
- Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3
- Manifest della PWA · manifest.json
- Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + mappa-per-agenti.md, metodi-momenti.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + metodi-momenti.js, storage.js, traduttore.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +10
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- cancello-collaudo.js · tools/cancello-collaudo.js
- Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, genera-catalogo.js
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md + onboarding.js, ricerca-principianti-12-settimane.md, ricerca-casa-poco-tempo.md +1
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Onboarding: creazione del programma · js/ui/onboarding.js + ricerca-specializzazione-punti-deboli.md, alternative.js, lettore.js +3
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + catalogo-regole.js, ricerca-struttura-e-intensita.md, ARCHITETTURA.md
- integra-onda.js · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, ricette.js, regole-ricerca.js +4
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, gesti.js, aggiungi-allenamento.js +8
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + mi-sento-male.js, sessione.js, seduta.js +6
- Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, scambio.js, copia-settimana.js +2
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + stato.js, metodi-momenti.js, dolore-mattina.js +7
- Tab Storico · js/ui/storico.js + sessione-completata.js, traduttore.js, pagine.js
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, audio-silenzioso.js, stato-condiviso.js +2
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md
- Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-metodi-avanzati-intensita.md, importa-progressi.js, ricerca-biomeccanica-esercizi.md +5
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + regole-nuove.js, coach-mappa-regole.md, ricerca-mesocicli-periodizzazione-scarichi.md +4
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +3
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, parametri.js, archivio.js +1
- Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, il-coach.js, metodi-momenti.js +15
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Selettore schede pronte e titolo della giornata · js/ui/piano/schede-pronte.js + navigazione.js
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-algoritmi-carichi-e-app.md, piano-coach-v2.md +4
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + archivio.js
- Coach: prontezza prima della seduta · js/coach/prontezza.js + repertorio.js, questionario-decisioni.js, costanti.js +4
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +7
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, utility.js, cedimento.js
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md, biomeccanica.js +1
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Test: struttura e avvio · tests/struttura.test.js + integrazione-onda0.test.js, avvio.test.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +4
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, parametri.js, ricette.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + repertorio.js, ricerca-psicologia-aderenza.md, psicologia.js
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Dati: importazione dei progressi · js/ui/importa-progressi.js + seduta-libera.js, importa-csv.js, backup.js +6
- Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi, · tests/intensita-onda0.test.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md
- Sicurezza (documento) · docs/SICUREZZA.md
- Carico progressivo · js/coach/carichi/progressivo.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, mappa-per-agenti.md +3
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- 3in · README.md
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 106 edges
2. `renderAllenamento()` - 93 edges
3. `buildProgram()` - 84 edges
4. `currentDay` - 74 edges
5. `renderPiano()` - 72 edges
6. `showUndo()` - 67 edges
7. `ymd()` - 65 edges
8. `findExercise()` - 64 edges
9. `getProfile()` - 58 edges
10. `piuGiorni()` - 52 edges

## Surprising Connections (you probably didn't know these)
- `3.12 Concatenare i blocchi in 6-12 mesi` --references--> `corpoCoach()`  [INFERRED]
  docs/ricerca-mesocicli-periodizzazione-scarichi.md → js/coach/repertorio.js
- `3.8 Come devono trattare lo scarico le altre regole` --references--> `ultimeSessioni()`  [INFERRED]
  docs/ricerca-mesocicli-periodizzazione-scarichi.md → js/coach/carichi/progressivo.js
- `E.5 Onda 4 — sicurezza, recupero, popolazioni` --references--> `consentito()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js
- `7. Regole proposte` --references--> `carico()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → tests/carichi-onda0.test.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (125 total, 8 thin omitted)

### Community 0 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + ricerca-obiettivi-e-programmi.md, coach-v2-decisioni.md, ricerca-cardio-nutrizione.md +2"
Cohesion: 0.11
Nodes (19): E. Copertura del collaudo (40 criteri falliti su 48), 4. Audit delle regole esistenti, 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti (+11 more)

### Community 1 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + regole-ricerca.js, ricerca-algoritmi-carichi-e-app.md, ricerca-forza-progressione.md +5"
Cohesion: 0.17
Nodes (25): E.0 Protocollo di lavoro (vale per ogni task), E.1 Onda 0 — strumenti e bug netti, E.2 Onda 1 — fondamenta, E.4 Onda 3 — carichi e autoregolazione, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate (+17 more)

### Community 2 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js"
Cohesion: 0.44
Nodes (11): currentWebMode, aggiornaAvvisoDock(), attesaAvvio, controllaAvvioMusica(), dockDaAprire(), dockStato(), inizioSegmento(), posizionaDock() (+3 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, traduttore.js +2"
Cohesion: 0.17
Nodes (26): inviaQuestionario(), riduciFrequenza(), CHIAVI_COACH_IA_RIMOSSO, historyKey(), leggiJSON(), loadTitles(), migrateLegacyDataIfNeeded(), ripulisciChiaviCoachIA() (+18 more)

### Community 4 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js"
Cohesion: 0.44
Nodes (11): attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcPaste(), mcRepeat(), mcSelectWeek() (+3 more)

### Community 5 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + regole-ricerca.js, piano-coach-v2.md, ricerca-cardio-nutrizione.md +5"
Cohesion: 0.19
Nodes (21): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 5. Regole proposte, D. Tra i blocchi, pause, specializzazione, settimanaProgramma(), fattoreFisico(), faseDelGiorno(), inScarico(), PARAM_ANALISI (+13 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.04
Nodes (41): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheEs, CATEGORIA_ATTREZZO, CONTROINDICAZIONI, CRITERI, DIRETTE_MIN_MUSCOLO (+33 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + foto.js, termina-e-cardio.js, pagine.js +1"
Cohesion: 0.08
Nodes (55): GUIDA_BACKUP, guidaApplicaFoto(), aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio() (+47 more)

### Community 8 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2"
Cohesion: 0.05
Nodes (63): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+55 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (21): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+13 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.05
Nodes (38): 0. Come si legge, A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A. Collisioni e doppioni, B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci (+30 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.29
Nodes (20): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+12 more)

### Community 12 - "Schermata Oggi · js/ui/oggi.js + annulla.js, impostazioni.js"
Cohesion: 0.29
Nodes (8): hideSnackbar(), categoriaDi(), CATEGORIE, iniziaOggi(), obiettiviSettimana(), switchTab(), closeSettings(), openSettings()

### Community 13 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +3"
Cohesion: 0.10
Nodes (47): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), buildExerciseSelect(), MUSCLE_GROUPS, azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati() (+39 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.06
Nodes (34): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+26 more)

### Community 15 - "Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js"
Cohesion: 0.24
Nodes (10): GLUTEI_FAMIGLIE, ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), SCHEMI_MOV, SCHIENA_PESANTE (+2 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3"
Cohesion: 0.07
Nodes (25): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+17 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + mappa-per-agenti.md, metodi-momenti.js"
Cohesion: 0.18
Nodes (32): Novità del coach v2, metodoDa(), adattoAllaSeduta(), buildProgram(), creditoSerie(), frazGruppoSeduta(), FRAZIONARI_NON_CONTATI, frazionarieSettimana() (+24 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + metodi-momenti.js, storage.js, traduttore.js"
Cohesion: 0.21
Nodes (22): applicaMomento(), normalizeExerciseRecord(), trEs(), alternativeOggi(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO (+14 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +10"
Cohesion: 0.14
Nodes (50): 5.1 Funzioni molto apprezzate, terminaMomento(), applyGeneratedProgram(), currentDay, activateMode(), armedSet, loadData(), saveData() (+42 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 23 - "cancello-collaudo.js · tools/cancello-collaudo.js"
Cohesion: 0.20
Nodes (22): autotest(), chiudi(), codiceDi(), comeSoglia(), cp, daCollaudo(), daPrima(), elenco() (+14 more)

### Community 24 - "Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, genera-catalogo.js"
Cohesion: 0.07
Nodes (27): codici, dest, doppi, fs, md, path, R, voci (+19 more)

### Community 25 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js"
Cohesion: 0.22
Nodes (25): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, aggiornaRiassuntoMusica(), clearCedimentoAudio(), closeMusicSheet(), getResolvedAudioMode() (+17 more)

### Community 26 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md + onboarding.js, ricerca-principianti-12-settimane.md, ricerca-casa-poco-tempo.md +1"
Cohesion: 0.09
Nodes (26): 6. Audit delle regole esistenti, 2. Dove le fonti non concordano, 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come (+18 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.06
Nodes (31): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+23 more)

### Community 29 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.05
Nodes (39): 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato), 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»), 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti, 2.10 Candito 6 settimane, 2.11 Sheiko, 2.12 RTS: Reactive Training Systems (Mike Tuchscherer), 2.13 Barbell Medicine (+31 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.14
Nodes (14): scripts, cancello, catalogo, collaudo:schede, controlla, grafo, grafo:verifica, indice (+6 more)

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 32 - "Onboarding: creazione del programma · js/ui/onboarding.js + ricerca-specializzazione-punti-deboli.md, alternative.js, lettore.js +3"
Cohesion: 0.05
Nodes (81): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+73 more)

### Community 33 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + catalogo-regole.js, ricerca-struttura-e-intensita.md, ARCHITETTURA.md"
Cohesion: 0.11
Nodes (20): Catalogo delle regole generato dalla mappa (npm run catalogo), coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute (+12 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, ricette.js, regole-ricerca.js +4"
Cohesion: 0.24
Nodes (20): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza() (+12 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (8): 2. Dove le fonti non concordano, 4. Primo giorno, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 15 ricerche riuscite, Appendice B. Query pronte (da rilanciare con il tetto alzato), In una pagina, Ricerca: le prime 12 settimane del principiante e la prima seduta

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.07
Nodes (28): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+20 more)

### Community 40 - "Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, gesti.js, aggiungi-allenamento.js +8"
Cohesion: 0.10
Nodes (51): getDayTitle(), escapeHtml(), jsArg(), closeExerciseInfo(), closePlates(), planDayClick(), weeklyVolumeByGroup(), attachNumberDrag() (+43 more)

### Community 41 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.07
Nodes (28): 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»), 1.8 Allenare due obiettivi insieme (+20 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.07
Nodes (27): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima (+19 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + mi-sento-male.js, sessione.js, seduta.js +6"
Cohesion: 0.15
Nodes (23): apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), saveTitles(), formatNow(), stopDropSet(), avviaTempoSeduta() (+15 more)

### Community 44 - "Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, scambio.js, copia-settimana.js +2"
Cohesion: 0.18
Nodes (35): sceltaSaltata(), mcCopyWeeks(), mcFillMonth(), mcPlaceTemplate(), mcMove(), renderMonthCal(), calKey(), copiaSettimana() (+27 more)

### Community 45 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 46 - "Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js"
Cohesion: 0.36
Nodes (8): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), openAudioDB()

### Community 47 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + stato.js, metodi-momenti.js, dolore-mattina.js +7"
Cohesion: 0.15
Nodes (31): controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), fineMomento(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), verificaMomento() (+23 more)

### Community 48 - "Tab Storico · js/ui/storico.js + sessione-completata.js, traduttore.js, pagine.js"
Cohesion: 0.25
Nodes (12): LOCALE(), htmlPesate(), closeDoneView(), mostraSessione(), openDoneView(), openHistoryDetail(), clearHistory(), closeAllSessions() (+4 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+15 more)

### Community 50 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js"
Cohesion: 0.21
Nodes (18): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia() (+10 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, audio-silenzioso.js, stato-condiviso.js +2"
Cohesion: 0.16
Nodes (21): Come cercare (in quest'ordine), Flussi principali, Mappa per agenti, Stile, mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale() (+13 more)

### Community 52 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.10
Nodes (20): 2. Dove le fonti non concordano, 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`) (+12 more)

### Community 53 - "Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-metodi-avanzati-intensita.md, importa-progressi.js, ricerca-biomeccanica-esercizi.md +5"
Cohesion: 0.13
Nodes (22): 5.6 Cue: stato nell'app [V], Parte A (da fatti del codice), 7.1 Tabella, 7.2 I casi della gap analysis, spiegati dal codice, 7.3 Cosa il codice fa già bene, 7. Audit delle regole esistenti, 6. Audit delle regole esistenti, bonusBiomecc() (+14 more)

### Community 54 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + regole-nuove.js, coach-mappa-regole.md, ricerca-mesocicli-periodizzazione-scarichi.md +4"
Cohesion: 0.10
Nodes (32): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04), A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), 3.4 RIR per settimana e per tipo di esercizio (+24 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.09
Nodes (23): 8. Regole proposte, alt(), assert, bersaglio(), c, carica(), ctx, { caricaApp } (+15 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +3"
Cohesion: 0.14
Nodes (35): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N (+27 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js"
Cohesion: 0.37
Nodes (15): FAILURE_SET_SECONDS, dropActive, dropInterval, dropRemaining, ytPlayerReady, apriCedimento(), avviaWebPronto(), chiudiCedimento() (+7 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js"
Cohesion: 0.09
Nodes (23): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+15 more)

### Community 61 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, parametri.js, archivio.js +1"
Cohesion: 0.23
Nodes (20): aggiornaEsigenza(), esigenzaCoach(), esigenzaEsclusa(), htmlEsigenza(), rpeBersaglioSeduta(), segnaDoloreEsigenza(), tettoEsigenza(), bilancioPrimeSedute() (+12 more)

### Community 62 - "Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js"
Cohesion: 0.22
Nodes (11): app(), assert, { caricaApp }, costruisci(), gruppo(), nomi(), pulito(), serie() (+3 more)

### Community 63 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, il-coach.js, metodi-momenti.js +15"
Cohesion: 0.06
Nodes (78): 6. Regole proposte, getProfile(), htmlTestFaiDaTe(), setTest(), apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe() (+70 more)

### Community 64 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.21
Nodes (20): apriQuestionario(), chiudiQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta() (+12 more)

### Community 65 - "Selettore schede pronte e titolo della giornata · js/ui/piano/schede-pronte.js + navigazione.js"
Cohesion: 0.39
Nodes (7): daysContainer, renderDayBar(), selectDay(), applyTemplate(), closeTemplatePicker(), openTemplatePicker(), renameDayTitle()

### Community 66 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.29
Nodes (7): B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.3 Le catene: ordine fisso e scritto, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-algoritmi-carichi-e-app.md, piano-coach-v2.md +4"
Cohesion: 0.13
Nodes (25): E.3 Onda 2 — il generatore, 3.5 Classi, attrezzi, passi e finestre, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta) (+17 more)

### Community 68 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.29
Nodes (7): 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md"
Cohesion: 0.12
Nodes (16): 0. Stato della ricerca (leggere prima), 2. Dove le fonti non concordano, 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento), 3.2 Quando tenere, ripetere, scaricare o riportare indietro, 3.3 Dal RIR o RPE al carico della seduta dopo, 3.4 Range di ripetizioni per obiettivo (doppia progressione: si sale di carico quando tutte le serie arrivano alla cima), 3.5 Massimale stimato (e1RM): formula, intervallo valido, rumore, 3.6 STANDARD_FORZA: proposta (LIV-02) (+8 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + archivio.js"
Cohesion: 0.13
Nodes (14): 2. Dove le fonti non concordano, 4. Scala di intervento sugli stalli, 6. Regole proposte, 7. Domande aperte, 8. Limiti onesti, Appendice A. Query pronte per una sessione con il tetto alzato, Appendice B. Simulazioni eseguite (riproducibili), Coordinamento con le altre note del repo (+6 more)

### Community 71 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + repertorio.js, questionario-decisioni.js, costanti.js +4"
Cohesion: 0.17
Nodes (29): 7. Regole proposte, consumaAggiusti(), applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato (+21 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.06
Nodes (31): 0. In breve, 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti (+23 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 76 - "Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md"
Cohesion: 0.13
Nodes (12): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), C. Innovazioni (in ordine di valore; ★ = le cinque più importanti), F.1 Invarianti (ogni integrazione li verifica), F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni, F.4 Ogni onda resta rilasciabile, F. Rischi e invarianti (+4 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, utility.js, cedimento.js"
Cohesion: 0.17
Nodes (24): spotifyController, spotifyReady, webDuration, ytPlayer, formatMMSS(), caricaPlayerWebSalvato(), configureWebSegment(), ensureSpotifyApi() (+16 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (11): confronta(), costruisciRisultato(), dirUscita(), gitInfo(), main(), mdReport(), opzioni(), profiloCompatto() (+3 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js"
Cohesion: 0.15
Nodes (9): assert, { caricaApp, radice }, COMMENTO, filesDi(), fs, ORFANE, path, SEMINA_ORFANE (+1 more)

### Community 85 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md, biomeccanica.js +1"
Cohesion: 0.23
Nodes (10): 6. Audit delle regole esistenti, In una pagina, respiroPer(), bucchiNelleSchede(), schedaUnica(), pausaConsigliata(), preferenzaEsercizio(), RESPIRO (+2 more)

### Community 86 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Test: struttura e avvio · tests/struttura.test.js + integrazione-onda0.test.js, avvio.test.js"
Cohesion: 0.09
Nodes (17): assert, fs, path, test, assert, BASE, { caricaApp }, test (+9 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +4"
Cohesion: 0.12
Nodes (36): GRUPPI_PRINCIPALI, htmlPrimiPassi(), lunediDi(), settimaneDiFila(), aggiornaProssima(), annoRiassunto(), faticaMuscoli(), prossimaSerie() (+28 more)

### Community 91 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, parametri.js, ricette.js"
Cohesion: 0.23
Nodes (22): COACH_PARAMETRI, PRIORI, schemaDi(), SCHEMI_RISERVA, STR_PESI, strAntagonisti(), strBilancia(), strChiave() (+14 more)

### Community 92 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.50
Nodes (4): 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie

### Community 94 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 95 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.36
Nodes (8): autotest(), contesto(), hash32(), matrice(), mulberry32(), profilo(), scegli(), tipoObiettivo()

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + repertorio.js, ricerca-psicologia-aderenza.md, psicologia.js"
Cohesion: 0.25
Nodes (15): 5. Regole proposte, psicoCoach(), htmlSedutaSaltata(), prossimoGiornoLibero(), sedutaSaltata(), consiglioPeso(), faseCorpo(), graficoPeso() (+7 more)

### Community 100 - "collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (14): analizza(), contaSerie(), coperturaLibreria(), costruisci(), datiPerBuild(), gruppoDi(), infoEs(), modello() (+6 more)

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

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.10
Nodes (19): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

### Community 117 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + seduta-libera.js, importa-csv.js, backup.js +6"
Cohesion: 0.05
Nodes (68): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+60 more)

### Community 118 - "Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi, · tests/intensita-onda0.test.js"
Cohesion: 0.18
Nodes (4): assert, { caricaApp }, FASI8, test

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 121 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 123 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 126 - "Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md"
Cohesion: 0.22
Nodes (9): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+1 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Carico progressivo · js/coach/carichi/progressivo.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, mappa-per-agenti.md +3"
Cohesion: 0.21
Nodes (23): Nomi in posti inattesi, 6. Audit del motore attuale, 7. Regole proposte, 3.6 Disegno dello scarico: cosa si taglia, 3.7 Scarico reattivo: segnali e soglie numeriche, B. Scarico, arrotonda(), caricoRiferimento() (+15 more)

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 141 - "collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.50
Nodes (4): eseguiMatrice(), pesoProfilo(), r1(), tabellaSettimana()

## Knowledge Gaps
- **807 isolated node(s):** `3.10 Rotazione degli esercizi`, `3.11 2-3 sedute a settimana contro 5-6`, `3.1 Principi`, `3.2 Tabella per livello e obiettivo`, `3.3 Rampa di volume: formula e arrotondamenti` (+802 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 901 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Schermata Oggi · js/ui/oggi.js + annulla.js, impostazioni.js` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, traduttore.js +2`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, gesti.js, aggiungi-allenamento.js +8`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + mi-sento-male.js, sessione.js, seduta.js +6`, `Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, scambio.js, copia-settimana.js +2`, `Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + stato.js, metodi-momenti.js, dolore-mattina.js +7`, `Tab Storico · js/ui/storico.js + sessione-completata.js, traduttore.js, pagine.js`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, il-coach.js, metodi-momenti.js +15`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `3.10 Rotazione degli esercizi`, `3.11 2-3 sedute a settimana contro 5-6`, `3.1 Principi` to the rest of the system?**
  _807 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + ricerca-obiettivi-e-programmi.md, coach-v2-decisioni.md, ricerca-cardio-nutrizione.md +2` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `aggiornaDopoScambio()` connect `Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, scambio.js, copia-settimana.js +2` to `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, gesti.js, aggiungi-allenamento.js +8`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +10`, `Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + stato.js, metodi-momenti.js, dolore-mattina.js +7`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `collaudo-generatore.js · tools/collaudo-generatore.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + stato.js, metodi-momenti.js, dolore-mattina.js +7` to `Carico progressivo · js/coach/carichi/progressivo.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, mappa-per-agenti.md +3`, `Progressi: peso corporeo · js/ui/progressi/peso.js + repertorio.js, ricerca-psicologia-aderenza.md, psicologia.js`, `Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, ricette.js, regole-ricerca.js +4`, `Coach: prontezza prima della seduta · js/coach/prontezza.js + repertorio.js, questionario-decisioni.js, costanti.js +4`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, gesti.js, aggiungi-allenamento.js +8`, `Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2`, `Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, scambio.js, copia-settimana.js +2`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +3`, `Schermata Oggi · js/ui/oggi.js + annulla.js, impostazioni.js`, `Tab Storico · js/ui/storico.js + sessione-completata.js, traduttore.js, pagine.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +10`, `Dati: importazione dei progressi · js/ui/importa-progressi.js + seduta-libera.js, importa-csv.js, backup.js +6`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +3`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +4`, `Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, parametri.js, archivio.js +1`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `Guida interattiva · js/ui/guida-interattiva.js + foto.js, termina-e-cardio.js, pagine.js +1` be split into smaller, more focused modules?**
  _Cohesion score 0.08032786885245902 - nodes in this community are weakly interconnected._