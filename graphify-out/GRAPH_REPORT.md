# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2566 nodes · 7193 edges · 133 communities (125 shown, 8 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 462 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `070c89bb`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + parametri.js, ricette.js, schemi.js +1
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + regole-ricerca.js, seduta.js, ricerca-forza-progressione.md +5
- Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, repertorio.js +9
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + intensita.js, regole-nuove.js, regole-ricerca.js +20
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1
- Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + statistiche.js, oggi.js, riepilogo.js +13
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +4
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + onboarding.js, progressivo.js
- Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, parametri.js
- Manifest della PWA · manifest.json
- Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + mappa-per-agenti.md
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +7
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Test: struttura e avvio · tests/struttura.test.js + indice.js, genera-catalogo.js
- Strumento: elenco file del service worker · tools/genera-sw.js + sw.js, ARCHITETTURA.md
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md + onboarding.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js
- cancello-collaudo.js · tools/cancello-collaudo.js
- integra-onda.js · tools/integra-onda.js
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md, figura-anatomica.js +4
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Coach: mi sento male in seduta · js/coach/mi-sento-male.js + navigazione.js, costanti.js, seduta.js +14
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5
- Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, riposo-settimane.js, mappa-per-agenti.md +5
- Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-metodi-avanzati-intensita.md, libreria-esercizi.js +7
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, utility.js, audio-silenzioso.js +2
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-metodi-avanzati-intensita.md, scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md +4
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + coach-mappa-regole.md, ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-struttura-e-intensita.md
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js
- Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md, stile-iphone.js
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + ricerca-obiettivi-e-programmi.md, coach-v2-decisioni.md, motore.js +1
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, dolore-mattina.js, ricerca-recupero-infortuni-popolazioni.md +1
- Opzioni: il coach · js/ui/opzioni/il-coach.js + psicologia.js, biomeccanica.js
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Progressi: foto · js/ui/progressi/foto.js + pagine.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +9
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js, utility.js +1
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js +1
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md
- Libreria MP3 locale (IndexedDB) · js/ui/musica/mp3-locale.js + stato-condiviso.js
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi, · tests/intensita-onda0.test.js + integrazione-onda0.test.js, avvio.test.js
- Tab Storico · js/ui/storico.js
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Consenso ai dati · js/core/consenso.js + modalita.js, guida-interattiva.js, avvio.js +3
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + costanti.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md + motore.js
- Documenti di architettura · docs/ARCHITETTURA.md
- Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, progressivo.js +1
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js
- Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding-risultato.js, onboarding.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Alternative e applicazione del programma · js/coach/programma/alternative.js
- Condividi e stampa la scheda · js/ui/stampa-scheda.js + fogli.js
- Lettore BIA a struttura (parte 2) · js/coach/bia/lettore.js + onboarding.js, opzioni.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +4
- Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- 04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md
- Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md
- Sicurezza (documento) · docs/SICUREZZA.md
- Carico progressivo · js/coach/carichi/progressivo.js + catalogo-regole.js, regole-ricerca.js, ARCHITETTURA.md +2
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 4) · docs/ricerca-algoritmi-carichi-e-app.md
- 3in · README.md

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 106 edges
2. `renderAllenamento()` - 93 edges
3. `buildProgram()` - 80 edges
4. `currentDay` - 74 edges
5. `renderPiano()` - 72 edges
6. `showUndo()` - 68 edges
7. `ymd()` - 66 edges
8. `findExercise()` - 61 edges
9. `getProfile()` - 58 edges
10. `escapeHtml()` - 53 edges

## Surprising Connections (you probably didn't know these)
- `7. Regole proposte` --references--> `carico()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → tests/carichi-onda0.test.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `1.4 Progressione: regole, passi, finestre di ripetizioni` --references--> `arrotondaPartenza()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → js/coach/carichi/partenza.js
- `E.5 Onda 4 — sicurezza, recupero, popolazioni` --references--> `consentito()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js
- `2. Dove le fonti non concordano` --references--> `imparaDallaSeduta()`  [INFERRED]
  docs/ricerca-algoritmi-carichi-e-app.md → js/coach/regole-ricerca.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (133 total, 8 thin omitted)

### Community 0 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + parametri.js, ricette.js, schemi.js +1"
Cohesion: 0.26
Nodes (21): COACH_PARAMETRI, limitaVolumePerMuscolo(), schemaDi(), STR_PESI, strAntagonisti(), strBilancia(), strChiave(), strCopri() (+13 more)

### Community 1 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + regole-ricerca.js, seduta.js, ricerca-forza-progressione.md +5"
Cohesion: 0.23
Nodes (20): E.2 Onda 1 — fondamenta, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 3.7 Dentro la seduta (serie dopo serie), 6. Audit del motore attuale, 7. Regole proposte, 6. Regole proposte, 4. Audit delle regole esistenti (confronto con il codice), 5. Regole proposte (+12 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js"
Cohesion: 0.16
Nodes (35): onbMomento(), onbPsico(), renderPsicoStep(), biaField(), chip(), etaPerProgramma(), MSG_ETA_SOTTO_MINIMO, nuovoOnbData() (+27 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, repertorio.js +9"
Cohesion: 0.15
Nodes (36): applyGeneratedProgram(), applicaDecisioni(), inviaQuestionario(), riduciFrequenza(), conAnnulla(), rispostaAderenza(), sostituisciNelPiano(), DAYS (+28 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3"
Cohesion: 0.13
Nodes (34): closeSetPage(), openSetPage(), renderSetPage(), renderSettings(), SET_PAGINE, setPsico(), TEMI, MODE_META (+26 more)

### Community 5 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + intensita.js, regole-nuove.js, regole-ricerca.js +20"
Cohesion: 0.08
Nodes (76): E.1 Onda 0 — strumenti e bug netti, Appendice B. Simulazioni eseguite (riproducibili), C. Igiene dei dati: lo scarico non è un dato di forma, D. Tra i blocchi, pause, specializzazione, 8. Regole proposte, 6. Audit delle regole esistenti, 7. Regole proposte, 7. Regole proposte (+68 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.04
Nodes (41): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheEs, CATEGORIA_ATTREZZO, CONTROINDICAZIONI, CRITERI, DIRETTE_MIN_MUSCOLO (+33 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js"
Cohesion: 0.12
Nodes (32): GUIDA_BACKUP, guidaApplicaFoto(), aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio() (+24 more)

### Community 8 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2"
Cohesion: 0.05
Nodes (61): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+53 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (21): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+13 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.06
Nodes (35): 0. Come si legge, B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati (+27 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1"
Cohesion: 0.20
Nodes (26): getDayTitle(), WORKOUT_TEMPLATES, applyTemplateFromGroups(), applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays (+18 more)

### Community 12 - "Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + statistiche.js, oggi.js, riepilogo.js +13"
Cohesion: 0.13
Nodes (46): 5. Regole proposte, faseSedutaSalvata(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), psicoCoach(), aderenzaDueSettimane(), htmlAderenza() (+38 more)

### Community 13 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +4"
Cohesion: 0.10
Nodes (47): renderCoach(), suggestNextExercises(), jsArg(), MUSCLE_GROUPS, azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati(), sezEsAperte (+39 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + onboarding.js, progressivo.js"
Cohesion: 0.06
Nodes (41): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+33 more)

### Community 15 - "Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js"
Cohesion: 0.21
Nodes (11): GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), SCHEMI_MOV (+3 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, parametri.js"
Cohesion: 0.11
Nodes (20): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+12 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Variazione del coach: ricette a slot e buildProgram · js/coach/programma/ricette.js + mappa-per-agenti.md"
Cohesion: 0.22
Nodes (24): Novità del coach v2, adattoAlCincoPerCinque(), adattoAllaSeduta(), buildProgram(), creditoSerie(), FRAZIONARI_NON_CONTATI, frazionarieSettimana(), GRUPPI_DELLA_SEDUTA (+16 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js"
Cohesion: 0.26
Nodes (20): normalizeExerciseRecord(), trEs(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato() (+12 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +7"
Cohesion: 0.16
Nodes (42): cambiaSerieNelPiano(), currentDay, armedSet, loadData(), saveData(), annullaCedimento(), toggleSetDone(), updateSetField() (+34 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 23 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.26
Nodes (9): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+1 more)

### Community 24 - "Test: struttura e avvio · tests/struttura.test.js + indice.js, genera-catalogo.js"
Cohesion: 0.07
Nodes (26): acorn, assert, fs, html, path, R, scripts, stili (+18 more)

### Community 25 - "Strumento: elenco file del service worker · tools/genera-sw.js + sw.js, ARCHITETTURA.md"
Cohesion: 0.14
Nodes (12): Service worker: elenco dei file generato (npm run sw), ASSETS, fs, html, lista, mancanti, nuovo, path (+4 more)

### Community 26 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js"
Cohesion: 0.27
Nodes (21): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, aggiornaRiassuntoMusica(), clearCedimentoAudio(), getResolvedAudioMode(), leggiMusica() (+13 more)

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

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md + onboarding.js"
Cohesion: 0.05
Nodes (42): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+34 more)

### Community 32 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js"
Cohesion: 0.07
Nodes (27): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+19 more)

### Community 33 - "cancello-collaudo.js · tools/cancello-collaudo.js"
Cohesion: 0.21
Nodes (22): autotest(), chiudi(), codiceDi(), comeSoglia(), cp, daCollaudo(), daPrima(), elenco() (+14 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.12
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md, figura-anatomica.js +4"
Cohesion: 0.13
Nodes (25): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+17 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.07
Nodes (28): 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»), 1.8 Allenare due obiettivi insieme (+20 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.08
Nodes (25): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+17 more)

### Community 40 - "Coach: mi sento male in seduta · js/coach/mi-sento-male.js + navigazione.js, costanti.js, seduta.js +14"
Cohesion: 0.12
Nodes (25): restartOnboarding(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), chiudiQuestionario(), currentTab, DEFAULT_MONDAY_PROGRAM (+17 more)

### Community 41 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js"
Cohesion: 0.23
Nodes (17): webDuration, caricaPlayerWebSalvato(), configureWebSegment(), ensureSpotifyApi(), ensureYouTubeApi(), handleWebLinkSubmit(), loadSpotifyPlayer(), loadYouTubePlayer() (+9 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.08
Nodes (24): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima, 1. Cosa dicono le fonti (+16 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js"
Cohesion: 0.20
Nodes (24): avviaTempoSeduta(), openWorkoutDay(), renderWorkoutDayPicker(), iniziaOggi(), annullaSpeciale(), apriSedutaLibera(), avviaSpeciale(), eserciziDaNomi() (+16 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5"
Cohesion: 0.15
Nodes (47): sceltaSaltata(), LOCALE(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks() (+39 more)

### Community 45 - "Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, riposo-settimane.js, mappa-per-agenti.md +5"
Cohesion: 0.15
Nodes (36): Schermate (tab) → funzione d'ingresso → file, controlloSchemi(), escapeHtml(), planDayClick(), weeklyVolumeByGroup(), renderPiano(), aggiungiPerGruppo(), applicaModalitaGiorno() (+28 more)

### Community 46 - "Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-metodi-avanzati-intensita.md, libreria-esercizi.js +7"
Cohesion: 0.10
Nodes (28): 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 5.6 Cue: stato nell'app [V], 7. Regole proposte, Parte A (da fatti del codice), Parte B (bloccate: dipendono da [NV]), 7.1 Tabella, 7.2 I casi della gap analysis, spiegati dal codice, 7.3 Cosa il codice fa già bene (+20 more)

### Community 47 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js"
Cohesion: 0.17
Nodes (12): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+4 more)

### Community 48 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js"
Cohesion: 0.19
Nodes (17): cercaAggiornamento(), closeStats(), getNome(), graficoFrequenzaHtml(), mostraPeriodoAttivo(), poligonoFrequenzaSvg(), renderStatsPagina(), scelteStatsPeriodo() (+9 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+15 more)

### Community 50 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js"
Cohesion: 0.22
Nodes (17): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia() (+9 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, utility.js, audio-silenzioso.js +2"
Cohesion: 0.13
Nodes (24): Come cercare (in quest'ordine), Flussi principali, Mappa per agenti, Stile, mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale() (+16 more)

### Community 52 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.15
Nodes (13): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+5 more)

### Community 53 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-metodi-avanzati-intensita.md, scheda-unica.js, ricerca-recupero-infortuni-popolazioni.md +4"
Cohesion: 0.13
Nodes (18): 3.1 Classi di esercizio (come agganciarle al codice), 3.2 Tecnica contro classe di esercizio, 3.3 Tecnica contro livello, età e vincoli, 3. Matrice di idoneità, 6. Audit delle regole esistenti, In una pagina, respiroPer(), inAllungamento() (+10 more)

### Community 54 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + coach-mappa-regole.md, ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-struttura-e-intensita.md"
Cohesion: 0.15
Nodes (19): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04), 3.4 RIR per settimana e per tipo di esercizio, A. Struttura del blocco (+11 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.09
Nodes (23): 8. Regole proposte, alt(), assert, bersaglio(), c, carica(), ctx, { caricaApp } (+15 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js"
Cohesion: 0.18
Nodes (29): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N (+21 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md, stile-iphone.js"
Cohesion: 0.21
Nodes (19): 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, aggiornaBoxIA(), chiamaCoachIA(), closeDoneView(), coachIAAttivo(), commentaSeduta(), contestoSeduta(), deviceIA() (+11 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, migrazione-v1.test.js"
Cohesion: 0.09
Nodes (23): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+15 more)

### Community 61 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 62 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + ricerca-obiettivi-e-programmi.md, coach-v2-decisioni.md, motore.js +1"
Cohesion: 0.13
Nodes (16): E. Copertura del collaudo (40 criteri falliti su 48), 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti, 3.5 Carico e ripetizioni settimana per settimana (+8 more)

### Community 63 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js"
Cohesion: 0.26
Nodes (13): htmlIspirazioni(), applicaMomento(), chiediMomento(), confermaMomento(), FB(), METODI, metodoDa(), MOMENTI (+5 more)

### Community 64 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, dolore-mattina.js, ricerca-recupero-infortuni-popolazioni.md +1"
Cohesion: 0.11
Nodes (40): 7. Regole proposte, consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY() (+32 more)

### Community 65 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + psicologia.js, biomeccanica.js"
Cohesion: 0.26
Nodes (13): htmlTestFaiDaTe(), htmlDomandePsico(), PSICO_DOMANDE, ritrattoCoach(), ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach() (+5 more)

### Community 66 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.29
Nodes (7): B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.3 Le catene: ordine fisso e scritto, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md"
Cohesion: 0.23
Nodes (16): 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5. Audit della libreria, alternativeStessoMuscolo(), attrezzoDi() (+8 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.08
Nodes (23): 0. Stato della ricerca (leggere prima), 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti (+15 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.14
Nodes (13): 2. Dove le fonti non concordano, 4. Scala di intervento sugli stalli, 6. Regole proposte, 7. Domande aperte, 8. Limiti onesti, Appendice A. Query pronte per una sessione con il tetto alzato, B. Scarico, Coordinamento con le altre note del repo (+5 more)

### Community 71 - "Progressi: foto · js/ui/progressi/foto.js + pagine.js"
Cohesion: 0.23
Nodes (21): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+13 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.06
Nodes (31): 0. In breve, 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti (+23 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 76 - "Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md"
Cohesion: 0.15
Nodes (12): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), C. Innovazioni (in ordine di valore; ★ = le cinque più importanti), F.1 Invarianti (ogni integrazione li verifica), F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni, F.4 Ogni onda resta rilasciabile, F. Rischi e invarianti (+4 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js, utility.js +1"
Cohesion: 0.42
Nodes (13): FAILURE_SET_SECONDS, dropActive, dropInterval, dropRemaining, formatMMSS(), apriCedimento(), chiudiCedimento(), finishDropSet() (+5 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js +1"
Cohesion: 0.24
Nodes (21): currentWebMode, spotifyController, spotifyReady, ytPlayer, ytPlayerReady, avviaWebPronto(), closeMusicSheet(), startDropAudio() (+13 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (11): confronta(), costruisciRisultato(), dirUscita(), gitInfo(), main(), mdReport(), opzioni(), profiloCompatto() (+3 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md"
Cohesion: 0.57
Nodes (6): 6. Regole proposte, apriTuttiMetodi(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo()

### Community 85 - "Libreria MP3 locale (IndexedDB) · js/ui/musica/mp3-locale.js + stato-condiviso.js"
Cohesion: 0.32
Nodes (10): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), handleAudioUpload() (+2 more)

### Community 86 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Intensità e analisi pulite (W0-T4, onda 0 del coach v2): RIR di partenza, esigenza dei principianti, scarico fuori dalle analisi, · tests/intensita-onda0.test.js + integrazione-onda0.test.js, avvio.test.js"
Cohesion: 0.09
Nodes (12): assert, fs, path, test, assert, BASE, { caricaApp }, test (+4 more)

### Community 90 - "Tab Storico · js/ui/storico.js"
Cohesion: 0.48
Nodes (6): clearHistory(), closeAllSessions(), htmlStoricoOrdinato(), openAllSessions(), renderStorico(), rigaSeduta()

### Community 91 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.10
Nodes (13): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+5 more)

### Community 92 - "Consenso ai dati · js/core/consenso.js + modalita.js, guida-interattiva.js, avvio.js +3"
Cohesion: 0.20
Nodes (11): switchProtocol(), chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode() (+3 more)

### Community 93 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + costanti.js"
Cohesion: 0.39
Nodes (8): currentMode, aggiornaAiutoIcs(), buildIcs(), exportIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 94 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.25
Nodes (9): analizza(), autotest(), contesto(), costruisci(), datiPerBuild(), rirPianificato(), tipoObiettivo(), valuta() (+1 more)

### Community 95 - "collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.31
Nodes (9): eseguiMatrice(), hash32(), matrice(), mulberry32(), pesoProfilo(), profilo(), r1(), scegli() (+1 more)

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md + motore.js"
Cohesion: 0.11
Nodes (19): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+11 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md"
Cohesion: 0.33
Nodes (5): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test)

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, progressivo.js +1"
Cohesion: 0.28
Nodes (15): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, frenoBia(), fattoreFisico(), consiglioPeso(), faseCorpo(), graficoPeso() (+7 more)

### Community 100 - "collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.25
Nodes (8): contaSerie(), coperturaLibreria(), gruppoDi(), infoEs(), modello(), secTut(), stimaMinuti(), verificheModello()

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

### Community 105 - "Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding-risultato.js, onboarding.js"
Cohesion: 0.67
Nodes (3): analyzeBia(), ONB_GOALS, renderOnbResult()

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

### Community 111 - "Condividi e stampa la scheda · js/ui/stampa-scheda.js + fogli.js"
Cohesion: 0.60
Nodes (5): scaricaFile(), condividiScheda(), righeScheda(), stampaScheda(), testoScheda()

### Community 112 - "Lettore BIA a struttura (parte 2) · js/coach/bia/lettore.js + onboarding.js, opzioni.js"
Cohesion: 0.36
Nodes (8): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), bindBiaInputs(), ensurePdfJs()

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

### Community 117 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +4"
Cohesion: 0.10
Nodes (40): XSS, import e CSP, 3.2 Dati sul dispositivo, import e XSS, applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia() (+32 more)

### Community 118 - "Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md"
Cohesion: 0.50
Nodes (4): A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), A. Collisioni e doppioni

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 121 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 122 - "04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 123 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 124 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.33
Nodes (6): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3. Sicurezza e privacy

### Community 125 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 127 - "Piano coach v2: la squadra del coach (parte 4) · docs/piano-coach-v2.md"
Cohesion: 0.29
Nodes (7): E.0 Protocollo di lavoro (vale per ogni task), E.3 Onda 2 — il generatore, E.4 Onda 3 — carichi e autoregolazione, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Carico progressivo · js/coach/carichi/progressivo.js + catalogo-regole.js, regole-ricerca.js, ARCHITETTURA.md +2"
Cohesion: 0.31
Nodes (12): Catalogo delle regole generato dalla mappa (npm run catalogo), Nomi in posti inattesi, caricoRiferimento(), esercizioInScarico(), pesoUltimoDi(), sedutePerEsercizio(), ultimeSessioni(), COACH_REGOLE (+4 more)

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 134 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 4) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.17
Nodes (11): 2. Dove le fonti non concordano, 4. Confronto con le app, 5.1 Funzioni molto apprezzate, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, 8. Domande aperte, 9. Limiti onesti (+3 more)

## Knowledge Gaps
- **793 isolated node(s):** `0. Come si legge`, `B10. Over 65`, `B11. Modello dei tempi`, `B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08)`, `B13. Polpacci` (+788 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 881 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + navigazione.js, costanti.js, seduta.js +14` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, repertorio.js +9`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3`, `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + statistiche.js, oggi.js, riepilogo.js +13`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, riposo-settimane.js, mappa-per-agenti.md +5`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js, utility.js +1`, `Tab Storico · js/ui/storico.js`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `0. Come si legge`, `B10. Over 65`, `B11. Modello dei tempi` to the rest of the system?**
  _793 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, repertorio.js +9` be split into smaller, more focused modules?**
  _Cohesion score 0.14935988620199148 - nodes in this community are weakly interconnected._
- **Why does `renderPiano()` connect `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, riposo-settimane.js, mappa-per-agenti.md +5` to `Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md, figura-anatomica.js +4`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +4`, `Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-metodi-avanzati-intensita.md, libreria-esercizi.js +7`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +7`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.1282051282051282 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + statistiche.js, oggi.js, riepilogo.js +13` to `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, dolore-mattina.js, ricerca-recupero-infortuni-popolazioni.md +1`, `Carico progressivo · js/coach/carichi/progressivo.js + catalogo-regole.js, regole-ricerca.js, ARCHITETTURA.md +2`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + parametri.js, ricette.js, schemi.js +1`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, questionario-decisioni.js, repertorio.js +9`, `Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + partenza.js, ricerca-donne-carichi-iniziali.md, figura-anatomica.js +4`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + intensita.js, regole-nuove.js, regole-ricerca.js +20`, `Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, disegni-esercizi.js +2`, `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + navigazione.js, costanti.js, seduta.js +14`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +5`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, riposo-settimane.js, mappa-per-agenti.md +5`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +4`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +7`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Should `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + intensita.js, regole-nuove.js, regole-ricerca.js +20` be split into smaller, more focused modules?**
  _Cohesion score 0.07563291139240506 - nodes in this community are weakly interconnected._