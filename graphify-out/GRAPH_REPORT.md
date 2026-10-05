# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2593 nodes · 7272 edges · 132 communities (124 shown, 8 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 461 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `436dc1c2`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + regole-nuove.js, coach-mappa-regole.md, parametri.js
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-algoritmi-carichi-e-app.md, ricerca-mesocicli-periodizzazione-scarichi.md, progressivo.js +5
- Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, lettore.js, onboarding-risultato.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, storage.js, traduttore.js +1
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, seduta-libera.js
- Esigenza del coach · js/coach/esigenza.js + repertorio.js, intensita.js, ricerca-mesocicli-periodizzazione-scarichi.md +6
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, oggi.js +11
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +5
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + onboarding.js, generatore-onda0b.test.js
- Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3
- Manifest della PWA · manifest.json
- Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + questionario-decisioni.js, riepilogo.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +19
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js
- cancello-collaudo.js · tools/cancello-collaudo.js
- Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, genera-catalogo.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 2) · docs/ricerca-casa-poco-tempo.md
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, motore.js, onboarding.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + intensita.js, parametri.js, ricerca-struttura-e-intensita.md
- integra-onda.js · tools/integra-onda.js
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Piano: scelta del giorno · js/ui/piano/giorno.js + mi-sento-male.js, selezione-multipla.js, aggiungi-allenamento.js +9
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + lavoro-cronometro.js, schede-pronte.js, sessione.js +3
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-riscaldamento-mobilita-prevenzione.md
- Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js, metodi-momenti.js
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 3) · docs/ricerca-casa-poco-tempo.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + stato-condiviso.js, utility.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-metodi-avanzati-intensita.md, scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md +11
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, catalogo-regole.js, ricerca-obiettivi-e-programmi.md +7
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js
- Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js
- Dati: importazione dei progressi · js/ui/importa-progressi.js
- Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, storage.js +3
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, regole-ricerca.js
- Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-algoritmi-carichi-e-app.md, seduta-libera.js
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +7
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Costanti e stato globale · js/core/costanti.js + avvio.js, psicologia.js, modalita.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Test: struttura e avvio · tests/struttura.test.js + integrazione-onda0.test.js, avvio.test.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +5
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, figura-anatomica.js
- Consenso ai dati · js/core/consenso.js + onboarding.js, modalita.js, guida-interattiva.js
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + piano-coach-v2.md, ricerca-cardio-nutrizione.md, ricerca-obiettivi-e-programmi.md +3
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 4) · docs/ricerca-obiettivi-e-programmi.md
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md + ricerca-obiettivi-e-programmi.md, motore.js
- Alternative e applicazione del programma · js/coach/programma/alternative.js
- Condividi e stampa la scheda · js/ui/stampa-scheda.js + figura-anatomica.js, fogli.js
- Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Backup e ripristino · js/core/backup.js + fogli.js, importa-progressi.js, importa-csv.js +2
- Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi, · tests/intensita-onda0.test.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- 04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md + piano-lancio-appstore.md, utility.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Carico progressivo · js/coach/carichi/progressivo.js + mappa-per-agenti.md, regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md +4
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Importazione CSV di altre app · js/ui/importa-csv.js
- 3in · README.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 3) · docs/ricerca-cardio-nutrizione.md
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 106 edges
2. `renderAllenamento()` - 93 edges
3. `buildProgram()` - 84 edges
4. `currentDay` - 74 edges
5. `renderPiano()` - 72 edges
6. `showUndo()` - 68 edges
7. `ymd()` - 66 edges
8. `findExercise()` - 64 edges
9. `getProfile()` - 59 edges
10. `escapeHtml()` - 53 edges

## Surprising Connections (you probably didn't know these)
- `E.5 Onda 4 — sicurezza, recupero, popolazioni` --references--> `consentito()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js
- `7. Regole proposte` --references--> `carico()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → tests/carichi-onda0.test.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `E. Copertura del collaudo (40 criteri falliti su 48)` --references--> `schemeFor()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/ui/onboarding.js
- `3.8 Come progredire gli elastici (non hanno chilogrammi)` --references--> `arrotonda()`  [INFERRED]
  docs/ricerca-casa-poco-tempo.md → js/coach/carichi/progressivo.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (132 total, 8 thin omitted)

### Community 0 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + regole-nuove.js, coach-mappa-regole.md, parametri.js"
Cohesion: 0.17
Nodes (15): TEC-07 tetto alle tecniche al cedimento (RIC-04), E.0 Protocollo di lavoro (vale per ogni task), E.3 Onda 2 — il generatore, E.4 Onda 3 — carichi e autoregolazione, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate (+7 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-algoritmi-carichi-e-app.md, ricerca-mesocicli-periodizzazione-scarichi.md, progressivo.js +5"
Cohesion: 0.17
Nodes (30): E.1 Onda 0 — strumenti e bug netti, E.2 Onda 1 — fondamenta, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale, 7. Regole proposte, 4. Audit delle regole esistenti (confronto con il codice), 5. Regole proposte, 3.7 Scarico reattivo: segnali e soglie numeriche (+22 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, lettore.js, onboarding-risultato.js"
Cohesion: 0.16
Nodes (34): analyzeBia(), onbMomento(), onbPsico(), renderPsicoStep(), biaField(), chip(), etaPerProgramma(), MSG_ETA_SOTTO_MINIMO (+26 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, storage.js, traduttore.js +1"
Cohesion: 0.29
Nodes (16): riduciFrequenza(), leggiJSON(), confirm(), revocaConsenso(), deleteWeek(), isoWeekLabel(), loadRestDays(), loadWeeks() (+8 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, seduta-libera.js"
Cohesion: 0.18
Nodes (18): sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, applicaZoom(), applyTheme(), AUTOCLOSE_KEY, closeSettings(), COUNTDOWN_KEY (+10 more)

### Community 5 - "Esigenza del coach · js/coach/esigenza.js + repertorio.js, intensita.js, ricerca-mesocicli-periodizzazione-scarichi.md +6"
Cohesion: 0.19
Nodes (23): Appendice B. Simulazioni eseguite (riproducibili), D. Tra i blocchi, pause, specializzazione, settimanaProgramma(), aggiornaEsigenza(), esigenzaCoach(), esigenzaEsclusa(), htmlEsigenza(), rpeBersaglioSeduta() (+15 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.04
Nodes (41): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheEs, CATEGORIA_ATTREZZO, CONTROINDICAZIONI, CRITERI, DIRETTE_MIN_MUSCOLO (+33 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js"
Cohesion: 0.10
Nodes (43): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), GUIDA, guidaAttiva(), guidaAvanti() (+35 more)

### Community 8 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2"
Cohesion: 0.05
Nodes (62): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+54 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (21): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+13 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.05
Nodes (39): 0. Come si legge, A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A. Collisioni e doppioni, B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci (+31 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.29
Nodes (20): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+12 more)

### Community 12 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, oggi.js +11"
Cohesion: 0.12
Nodes (49): 5. Regole proposte, getProfile(), segnaDoloreEsigenza(), fineMomento(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), terminaMomento() (+41 more)

### Community 13 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +5"
Cohesion: 0.10
Nodes (52): suggestNextExercises(), escapeHtml(), buildExerciseSelect(), MUSCLE_GROUPS, azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati(), sezEsAperte (+44 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + onboarding.js, generatore-onda0b.test.js"
Cohesion: 0.10
Nodes (24): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 5.1 Modello dei tempi (formule che il generatore può calcolare), 5.2 Costo di un esercizio da 3 serie e confronto con il modello di oggi, 5.3 Capacità: quante serie entrano, 5.4 Scala di priorità: cosa tenere quando i minuti sono pochi (e cosa aggiungere quando crescono) (+16 more)

### Community 15 - "Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js"
Cohesion: 0.21
Nodes (11): GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), SCHEMI_MOV (+3 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +3"
Cohesion: 0.05
Nodes (36): coach-mappa-regole.md (mappa delle regole), ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body (+28 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + questionario-decisioni.js, riepilogo.js"
Cohesion: 0.17
Nodes (34): adattoAllaSeduta(), buildProgram(), creditoSerie(), frazGruppoSeduta(), FRAZIONARI_NON_CONTATI, frazionarieSettimana(), giornoSeduta(), GRUPPI_DELLA_SEDUTA (+26 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js"
Cohesion: 0.33
Nodes (14): alternativeOggi(), chiudiOccupato(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato(), impostaOccupato(), occupatoOpzioni (+6 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +19"
Cohesion: 0.11
Nodes (71): Schermate (tab) → funzione d'ingresso → file, 5.1 Funzioni molto apprezzate, renderCoach(), applyGeneratedProgram(), currentDay, activateMode(), selectDay(), armedSet (+63 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js"
Cohesion: 0.24
Nodes (18): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+10 more)

### Community 23 - "cancello-collaudo.js · tools/cancello-collaudo.js"
Cohesion: 0.21
Nodes (22): autotest(), chiudi(), codiceDi(), comeSoglia(), cp, daCollaudo(), daPrima(), elenco() (+14 more)

### Community 24 - "Strumento: elenco file del service worker · tools/genera-sw.js + indice.js, genera-catalogo.js"
Cohesion: 0.07
Nodes (27): codici, dest, doppi, fs, md, path, R, voci (+19 more)

### Community 25 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 26 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 2) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.20
Nodes (10): 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei), 3.4 Catena posteriore: anca (glutei, femorali, schiena) e flessione del ginocchio (femorali), 3.5 Tirata orizzontale (dorsali, romboidi, bicipiti, deltoide posteriore), 3.6 Tirata verticale (dorsali, bicipiti), 3.7 Tricipiti (dip e estensioni), polpacci, core (+2 more)

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

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, motore.js, onboarding.js"
Cohesion: 0.08
Nodes (26): 4. Audit delle regole esistenti (confronto con il codice), 2. Dove le fonti non concordano, 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.3 Struttura per giorni a settimana, 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3 (+18 more)

### Community 32 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js"
Cohesion: 0.08
Nodes (26): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+18 more)

### Community 33 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + intensita.js, parametri.js, ricerca-struttura-e-intensita.md"
Cohesion: 0.15
Nodes (19): CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, RIC: regole dalla ricerca (spegnibili), INT-05 bilancio delle prime due sedute, INT-02 esigenza di partenza 120/100/95% (+11 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md"
Cohesion: 0.17
Nodes (20): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+12 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.20
Nodes (10): 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»), 1.8 Allenare due obiettivi insieme (+2 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.07
Nodes (29): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+21 more)

### Community 40 - "Piano: scelta del giorno · js/ui/piano/giorno.js + mi-sento-male.js, selezione-multipla.js, aggiungi-allenamento.js +9"
Cohesion: 0.11
Nodes (33): restartOnboarding(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), closeExerciseInfo(), alert(), stopDropSet() (+25 more)

### Community 41 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.25
Nodes (7): 0. Come si legge, 2. Dove le fonti non concordano, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 8 ricerche riuscite, Appendice B. Query pronte per la seconda passata (tetto alzato), Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.07
Nodes (27): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima (+19 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + lavoro-cronometro.js, schede-pronte.js, sessione.js +3"
Cohesion: 0.12
Nodes (37): daysContainer, renderDayBar(), getDayTitle(), loadTitles(), saveTitles(), avviaTempoSeduta(), fermaTempoSeduta(), backToDayPicker() (+29 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5"
Cohesion: 0.13
Nodes (50): faseSedutaSalvata(), sceltaSaltata(), fattoQuestaSettimana(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets (+42 more)

### Community 45 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.43
Nodes (7): aggiornaAiutoIcs(), buildIcs(), exportIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 46 - "Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.29
Nodes (9): 5.6 Cue: stato nell'app [V], Parte A (da fatti del codice), 6. Audit delle regole esistenti, bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), htmlProva(), SCALE_DOLORE (+1 more)

### Community 47 - "Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js, metodi-momenti.js"
Cohesion: 0.23
Nodes (17): vaiAlMomento(), closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), ritrattoCoach() (+9 more)

### Community 48 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 3) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.29
Nodes (7): 4.1 Kit a gradini ([M], Convenzione), 4.2 Cosa si allena bene e cosa no, per muscolo ([M]), 4.3 Manubri regolabili: cosa chiedere all'utente, 4.4 Sicurezza senza spotter ([M], Convenzione, coerente con l'errore di stima del RIR [R]), 4.5 Kettlebell (programmi noti, nessuno verificato), 4.6 Viaggio e hotel, 4. Kit minimi e cosa si può allenare

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+15 more)

### Community 50 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js"
Cohesion: 0.20
Nodes (18): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia() (+10 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + stato-condiviso.js, utility.js"
Cohesion: 0.33
Nodes (11): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+3 more)

### Community 52 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.10
Nodes (20): 2. Dove le fonti non concordano, 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`) (+12 more)

### Community 53 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-metodi-avanzati-intensita.md, scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md +11"
Cohesion: 0.10
Nodes (29): 3.5 Classi, attrezzi, passi e finestre, 3.1 Classi di esercizio (come agganciarle al codice), 7.1 Tabella, 7.2 I casi della gap analysis, spiegati dal codice, 7.3 Cosa il codice fa già bene, 7. Audit delle regole esistenti, 6. Audit delle regole esistenti, In una pagina (+21 more)

### Community 54 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, catalogo-regole.js, ricerca-obiettivi-e-programmi.md +7"
Cohesion: 0.09
Nodes (30): Catalogo delle regole generato dalla mappa (npm run catalogo), A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), 5. Regole proposte, 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo (+22 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.10
Nodes (23): 8. Regole proposte, alt(), assert, bersaglio(), c, carica(), ctx, { caricaApp } (+15 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js"
Cohesion: 0.18
Nodes (29): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N (+21 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md"
Cohesion: 0.23
Nodes (18): 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, aggiornaBoxIA(), chiamaCoachIA(), closeDoneView(), coachIAAttivo(), commentaSeduta(), contestoSeduta(), deviceIA() (+10 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.26
Nodes (20): Nativo, RECOVERY_RING_CIRCUMFERENCE, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero() (+12 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js"
Cohesion: 0.08
Nodes (23): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+15 more)

### Community 61 - "Dati: importazione dei progressi · js/ui/importa-progressi.js"
Cohesion: 0.27
Nodes (13): analizzaProgressi(), dataInRiga(), eserciziPersonalizzati(), importaProgressi(), indiceNomi(), leggiFileProgressi(), leggiTestoLibero(), MESI_NOMI (+5 more)

### Community 62 - "Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js"
Cohesion: 0.22
Nodes (11): app(), assert, { caricaApp }, costruisci(), gruppo(), nomi(), pulito(), serie() (+3 more)

### Community 63 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js"
Cohesion: 0.23
Nodes (14): apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento(), chiediMomento() (+6 more)

### Community 64 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, storage.js +3"
Cohesion: 0.08
Nodes (61): 7. Regole proposte, consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY() (+53 more)

### Community 65 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, regole-ricerca.js"
Cohesion: 0.29
Nodes (12): htmlTestFaiDaTe(), setTest(), TECNICHE, ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach(), setCoach() (+4 more)

### Community 66 - "Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md"
Cohesion: 0.29
Nodes (7): B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.3 Le catene: ordine fisso e scritto, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-algoritmi-carichi-e-app.md, seduta-libera.js"
Cohesion: 0.17
Nodes (20): 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio) (+12 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.12
Nodes (16): 0. Stato della ricerca (leggere prima), 2. Dove le fonti non concordano, 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento), 3.2 Quando tenere, ripetere, scaricare o riportare indietro, 3.3 Dal RIR o RPE al carico della seduta dopo, 3.4 Range di ripetizioni per obiettivo (doppia progressione: si sale di carico quando tutte le serie arrivano alla cima), 3.5 Massimale stimato (e1RM): formula, intervallo valido, rumore, 3.6 STANDARD_FORZA: proposta (LIV-02) (+8 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.13
Nodes (14): 2. Dove le fonti non concordano, 4. Scala di intervento sugli stalli, 6. Regole proposte, 7. Domande aperte, 8. Limiti onesti, A. Struttura del blocco, Appendice A. Query pronte per una sessione con il tetto alzato, B. Scarico (+6 more)

### Community 71 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md"
Cohesion: 0.29
Nodes (7): 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.06
Nodes (31): 0. In breve, 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti (+23 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 76 - "Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md"
Cohesion: 0.13
Nodes (12): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), C. Innovazioni (in ordine di valore; ★ = le cinque più importanti), F.1 Invarianti (ogni integrazione li verifica), F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni, F.4 Ogni onda resta rilasciabile, F. Rischi e invarianti (+4 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.29
Nodes (7): 5.1 «Correre» (5K, 10K): supporto, non allenatore di corsa, 5.2 Abilità: «prima trazione», «10 piegamenti», «squat completo», «toccarmi le punte», «plank 60 s», 5.3 Sport (squadra e combattimento): «supporto alla stagione», 5.4 «Schiena, collo e spalle» (postura e lavoro d'ufficio), 5.5 Mantenimento (fase dopo il calo o dopo un ciclo), 5.6 Altri obiettivi ovvi (lista, senza programma qui), 5. Obiettivi che l'app non ha ancora

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8"
Cohesion: 0.07
Nodes (90): Flussi principali, mediaKeeper, SILENZIO_WAV, FAILURE_SET_SECONDS, avviaCanaleMultimediale(), fermaCanaleMultimediale(), tipoSessione(), activeSourceTab (+82 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (11): confronta(), costruisciRisultato(), dirUscita(), gitInfo(), main(), mdReport(), opzioni(), profiloCompatto() (+3 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Costanti e stato globale · js/core/costanti.js + avvio.js, psicologia.js, modalita.js"
Cohesion: 0.29
Nodes (5): switchProtocol(), DEFAULT_MONDAY_PROGRAM, MODE_KEY, MODE_META, getStoredMode()

### Community 85 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 86 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Test: struttura e avvio · tests/struttura.test.js + integrazione-onda0.test.js, avvio.test.js"
Cohesion: 0.09
Nodes (17): assert, fs, path, test, assert, BASE, { caricaApp }, test (+9 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +5"
Cohesion: 0.11
Nodes (43): LOCALE(), minutiCardioSettimana(), renderCardioStat(), piuGiorni(), settimaneDiFila(), annoRiassunto(), faticaMuscoli(), renderAnno() (+35 more)

### Community 91 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + schemi.js, compone.js, figura-anatomica.js"
Cohesion: 0.24
Nodes (22): TOCCHI, schemaDi(), SCHEMI_RISERVA, STR_PESI, strAntagonisti(), strBilancia(), strChiave(), strCopri() (+14 more)

### Community 92 - "Consenso ai dati · js/core/consenso.js + onboarding.js, modalita.js, guida-interattiva.js"
Cohesion: 0.22
Nodes (12): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, chooseMode(), offriGuida(), setConsenso(), nuovoOnbData() (+4 more)

### Community 93 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.33
Nodes (6): 3.1 Cardio e passi (minuti a settimana, camminata compresa, pesi esclusi), 3.2 Proteine (in g per kg di **peso corporeo**; la massa magra da BIA solo come controllo), 3.3 Calorie e ritmo di variazione del peso, 3.4 Lettura di BIA e peso (regole di prudenza: prassi, **non** risultati di questa ricerca), 3.5 Frasi sicure già utilizzabili, 3. Numeri per il coach

### Community 94 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 95 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.36
Nodes (8): autotest(), contesto(), hash32(), matrice(), mulberry32(), profilo(), scegli(), tipoObiettivo()

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.07
Nodes (26): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+18 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + piano-coach-v2.md, ricerca-cardio-nutrizione.md, ricerca-obiettivi-e-programmi.md +3"
Cohesion: 0.26
Nodes (16): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 5. Regole proposte, 6. Audit delle regole esistenti, fattoreFisico(), corpoCoach(), guidaDatiDemo(), consiglioPeso(), faseCorpo() (+8 more)

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

### Community 105 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 4) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.40
Nodes (5): 3.1 Struttura: giorni, split, serie, ripetizioni, riposo, RIR, 3.2 Cardio, progressione, cosa tracciare, tempi attesi, cosa NON fare, 3.3 Le prime 4 settimane, per obiettivo (modelli di lavoro, Convenzione), 3.4 Metriche (riassunto in una riga per obiettivo), 3. Matrice obiettivo -> programma

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md + ricerca-obiettivi-e-programmi.md, motore.js"
Cohesion: 0.22
Nodes (9): 2. Dove le fonti non concordano, 4. Audit delle regole esistenti, 6. Domande aperte, 7. Limiti onesti, Appendice A. Registro delle 22 ricerche riuscite, Appendice B. Query pronte per la seconda passata (da lanciare con budget ripristinato), Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea, 4. Combinare due obiettivi (+1 more)

### Community 109 - "Alternative e applicazione del programma · js/coach/programma/alternative.js"
Cohesion: 0.47
Nodes (9): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+1 more)

### Community 111 - "Condividi e stampa la scheda · js/ui/stampa-scheda.js + figura-anatomica.js, fogli.js"
Cohesion: 0.48
Nodes (6): perLato(), scaricaFile(), condividiScheda(), righeScheda(), stampaScheda(), testoScheda()

### Community 112 - "Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js"
Cohesion: 0.36
Nodes (8): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), bindBiaInputs(), ensurePdfJs()

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

### Community 117 - "Backup e ripristino · js/core/backup.js + fogli.js, importa-progressi.js, importa-csv.js +2"
Cohesion: 0.20
Nodes (20): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ripristinaBackup(), valorePulito() (+12 more)

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

### Community 125 - "04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md + piano-lancio-appstore.md, utility.js"
Cohesion: 0.11
Nodes (19): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+11 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Carico progressivo · js/coach/carichi/progressivo.js + mappa-per-agenti.md, regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md +4"
Cohesion: 0.19
Nodes (21): Come cercare (in quest'ordine), Mappa per agenti, Nomi in posti inattesi, Novità del coach v2, Stile, 3.8 Come devono trattare lo scarico le altre regole, 4. Rilevazione dei punti deboli, arrotonda() (+13 more)

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 134 - "Importazione CSV di altre app · js/ui/importa-csv.js"
Cohesion: 0.44
Nodes (8): ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV(), secondiCSV()

### Community 137 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 3) · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.29
Nodes (7): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti

### Community 141 - "collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.50
Nodes (4): eseguiMatrice(), pesoProfilo(), r1(), tabellaSettimana()

## Knowledge Gaps
- **796 isolated node(s):** `E.0 Protocollo di lavoro (vale per ogni task)`, `E.7 Revisione finale`, `E.8 Proprietà dei file che passano tra onde`, `0. Come si legge`, `A.1 Collisioni di nomi (stesso codice, due significati)` (+791 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 887 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Piano: scelta del giorno · js/ui/piano/giorno.js + mi-sento-male.js, selezione-multipla.js, aggiungi-allenamento.js +9` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, storage.js, traduttore.js +1`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + lavoro-cronometro.js, schede-pronte.js, sessione.js +3`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, oggi.js +11`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js, metodi-momenti.js`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8`, `Backup e ripristino · js/core/backup.js + fogli.js, importa-progressi.js, importa-csv.js +2`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +5`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `E.0 Protocollo di lavoro (vale per ogni task)`, `E.7 Revisione finale`, `E.8 Proprietà dei file che passano tra onde` to the rest of the system?**
  _796 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `collaudo-generatore.js · tools/collaudo-generatore.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Why does `renderSettings()` connect `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js, metodi-momenti.js` to `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, seduta-libera.js`, `Esigenza del coach · js/coach/esigenza.js + repertorio.js, intensita.js, ricerca-mesocicli-periodizzazione-scarichi.md +6`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +5`, `Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + metodi-momenti.js, stato.js, oggi.js +11`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +5`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8`, `BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js`, `Backup e ripristino · js/core/backup.js + fogli.js, importa-progressi.js, importa-csv.js +2`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js`, `Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md`, `Dati: importazione dei progressi · js/ui/importa-progressi.js`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09929078014184398 - nodes in this community are weakly interconnected._
- **Why does `openWorkoutDay()` connect `Seduta libera e sedute extra · js/ui/seduta-libera.js + lavoro-cronometro.js, schede-pronte.js, sessione.js +3` to `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, storage.js +3`, `Carico progressivo · js/coach/carichi/progressivo.js + mappa-per-agenti.md, regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md +4`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, storage.js, traduttore.js +1`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, seduta-libera.js`, `Piano: scelta del giorno · js/ui/piano/giorno.js + mi-sento-male.js, selezione-multipla.js, aggiungi-allenamento.js +9`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +5`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, seduta-libera.js +19`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._