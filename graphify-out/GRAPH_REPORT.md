# Graph Report - toji-workout  (2026-10-06)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 3330 nodes · 9219 edges · 179 communities (168 shown, 11 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 710 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `231a8f91`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, lavoro-cronometro.js
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, archivio.js, repertorio.js +5
- Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, soglie-coach.md, lettore.js +4
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, costanti.js, traduttore.js +9
- Piano: scelta del giorno · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +10
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, costanti.js
- Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, ricerca-psicologia-aderenza.md +2
- Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js
- Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + intensita.js, esigenza.js, parametri.js +1
- Manifest della PWA · manifest.json
- Coach: schemi di movimento · js/coach/programma/schemi.js + scheda-unica.js, coach-v2-decisioni.md, struttura-pro.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + mi-sento-male.js, sessione.js, utility.js +3
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, repertorio.js +13
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js
- Test: mesociclo · tests/mesociclo.test.js
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js
- Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + selezione-multipla.js, navigazione.js, schede-pronte.js +6
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js
- Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, calibrazione.js
- Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + fasi.js, regole-ricerca.js
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md
- Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js
- Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + seduta.js, sessione.js
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md + motore.js
- Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, volume.js +18
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + utility.js, stato-condiviso.js, impostazioni.js
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, regole-ricerca.js, coach-v2-decisioni.md +8
- Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js
- Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js
- Tab Storico · js/ui/storico.js + pagine.js, sessione-completata.js, traduttore.js
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, senza-coach-ia.test.js, intensita-onda0.test.js +5
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +4
- Test: generatore, correzioni dell'onda 0 (W0-T7) · tests/generatore-onda0b.test.js + ricerca-casa-poco-tempo.md
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js + partenza.js, soglie-partenza.js, regole-ricerca.js
- Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, volume.js
- Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + piano-coach-v2.md, vincoli.js, memoria-chiamata.js +9
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, biomeccanica.js, ricerca-riscaldamento-mobilita-prevenzione.md +2
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Test: attributi degli esercizi (classe, schema, crediti) · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- Checklist App Store 01: decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +2
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js
- Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- Test: integrazione dell'onda 2b (volume, tempo, tecniche, mesociclo) · tests/integrazione-onda2b.test.js + struttura.test.js, indice.js, aiuto-mesociclo.js +1
- Strumento: elenco file del service worker · tools/genera-sw.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + intensita.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, regole-ricerca.js +7
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Coach: prontezza prima della seduta · js/coach/prontezza.js
- Test: cancello delle tecniche · tests/tecniche.test.js
- Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js
- Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, progressivo.js +1
- Strumento: collaudo del generatore di schede (parte 4) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- Checklist App Store 07: rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- Checklist App Store 08: monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Test: sicurezza e segnali (onda 0) · tests/sicurezza-onda0.test.js + integrazione-onda0.test.js, aiuto-mesociclo.js
- Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + soglie.test.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 3) · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js
- Progressi: foto · js/ui/progressi/foto.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- Checklist App Store 02: tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Checklist App Store 06: qualità e test · docs/checklist-appstore/06-qualita-test.md
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + schede-varianti.js
- Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, stato.js +3
- Strumento: elenco delle soglie del coach · tools/elenco-soglie.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md + partenza.js
- Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js, coach-v2-decisioni.md, ricerca-ipertrofia-programmazione.md +5
- Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js + tecniche.test.js
- Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +1
- README del progetto · README.md
- Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js, ARCHITETTURA.md
- Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +1
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +3
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js
- Test: volume per muscolo · tests/volume.test.js
- Coach: soglie della regia · js/coach/regia/soglie-regia.js
- Test: tempo della seduta · tests/tempo.test.js
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md
- Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md
- Test: golden dei carichi (le quattro catene del coach) (parte 3) · tests/carichi-golden.test.js + ricerca-algoritmi-carichi-e-app.md
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md
- Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 2) · docs/ricerca-psicologia-aderenza.md
- Condividi e stampa la scheda · js/ui/stampa-scheda.js + fogli.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md + coach-v2-decisioni.md, e1rm.js, seduta.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js
- Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js
- Test: generatore, residui dell'onda 1 · tests/generatore-onda1.test.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 3) · docs/ricerca-specializzazione-punti-deboli.md + muscoli.test.js
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 4) · docs/ricerca-algoritmi-carichi-e-app.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md
- Coach: biomeccanica · js/coach/biomeccanica.js
- Test: golden dei carichi (le quattro catene del coach) (parte 4) · tests/carichi-golden.test.js
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 4) · docs/ricerca-obiettivi-e-programmi.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md
- Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js
- Mappa per agenti · docs/mappa-per-agenti.md
- Strumento: collaudo del generatore di schede (parte 7) · tools/collaudo-generatore.js
- Strumento: collaudo del generatore di schede (parte 8) · tools/collaudo-generatore.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 4) · docs/ricerca-specializzazione-punti-deboli.md
- Test: golden dei carichi (le quattro catene del coach) (parte 5) · tests/carichi-golden.test.js
- Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js
- Test: muscolo bersaglio e alternative (parte 3) · tests/muscoli.test.js
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js

## God Nodes (most connected - your core abstractions)
1. `Novità del coach v2` - 114 edges
2. `loadData()` - 108 edges
3. `renderAllenamento()` - 93 edges
4. `findExercise()` - 83 edges
5. `currentDay` - 74 edges
6. `renderPiano()` - 73 edges
7. `ymd()` - 68 edges
8. `showUndo()` - 68 edges
9. `senzaEmoji()` - 64 edges
10. `getProfile()` - 62 edges

## Surprising Connections (you probably didn't know these)
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `3.6 Fattore prudente e sblocco rapido (DON-04)` --references--> `caricoProssimoBase()`  [INFERRED]
  docs/ricerca-donne-carichi-iniziali.md → js/coach/regole-ricerca.js
- `6. Mappa muscolare (già fatta)` --references--> `renderBodyMap()`  [INFERRED]
  docs/metodo-illustrazioni-esercizi.md → js/ui/figura-anatomica.js
- `D.1 Ambito` --references--> `contestoCarichi()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js
- `D.4 Barra e corpo libero` --references--> `alternativeStessoMuscolo()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (179 total, 11 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, lavoro-cronometro.js"
Cohesion: 0.11
Nodes (42): azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati(), sezEsAperte, toggleSezioneEsercizi(), applyTemplateFromGroups(), corpoLibero(), DEFAULT_REPS (+34 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, archivio.js, repertorio.js +5"
Cohesion: 0.18
Nodes (29): 3.4 RIR per settimana e per tipo di esercizio, A. Struttura del blocco, D. Tra i blocchi, pause, specializzazione, 6. Regole proposte, 7. Regole proposte, settimanaProgramma(), segnaEsercizioTaratura(), getProgramma() (+21 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, soglie-coach.md, lettore.js +4"
Cohesion: 0.07
Nodes (65): Soglie del coach, `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia), `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista), `SOGLIE_STRUTTURA` — `js/coach/programma/soglie-struttura.js` (architetto), `SOGLIE_TECNICHE` — `js/coach/sicurezza/soglie-tecniche.js` (sentinella), `SOGLIE_TEMPO` — `js/coach/volume/soglie-tempo.js` (dosatore), `SOGLIE_VOLUME` — `js/coach/volume/soglie-volume.js` (dosatore), analyzeBia() (+57 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, costanti.js, traduttore.js +9"
Cohesion: 0.10
Nodes (37): restartOnboarding(), switchProtocol(), AGG_KEY(), currentMode, currentTab, DEFAULT_MONDAY_PROGRAM, activateMode(), CHIAVI_COACH_IA_RIMOSSO (+29 more)

### Community 4 - "Piano: scelta del giorno · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +10"
Cohesion: 0.16
Nodes (24): Schermate (tab) → funzione d'ingresso → file, renderCoach(), controlloSchemi(), suggestNextExercises(), DAYS, escapeHtml(), MUSCLE_GROUPS, renderWorkoutDayPicker() (+16 more)

### Community 5 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, costanti.js"
Cohesion: 0.19
Nodes (17): MODE_META, sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, applicaZoom(), applyTheme(), AUTOCLOSE_KEY, closeSettings() (+9 more)

### Community 6 - "Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js"
Cohesion: 0.03
Nodes (51): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheCrediti, cacheEs, cacheUsabili, CATEGORIA_ATTREZZO, CONTROINDICAZIONI (+43 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js"
Cohesion: 0.17
Nodes (21): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), guidaAttiva(), guidaAvanti(), guidaConsente() (+13 more)

### Community 8 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js"
Cohesion: 0.22
Nodes (17): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia() (+9 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.06
Nodes (32): 0. Come si legge, B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati (+24 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.31
Nodes (19): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+11 more)

### Community 12 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, ricerca-psicologia-aderenza.md +2"
Cohesion: 0.18
Nodes (24): 5. Regole proposte, htmlPrimiPassi(), psicoCoach(), aderenzaDueSettimane(), ALZATE_BASE, htmlAderenza(), htmlFineCiclo(), htmlOrario() (+16 more)

### Community 13 - "Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1"
Cohesion: 0.21
Nodes (20): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, setPsico() (+12 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js"
Cohesion: 0.05
Nodes (57): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+49 more)

### Community 15 - "Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js"
Cohesion: 0.10
Nodes (20): acorn, AGGIUSTI, assert, BIA, { caricaApp, VETTORI_CARICHI }, DIMENSIONI, ES, FASI (+12 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + intensita.js, esigenza.js, parametri.js +1"
Cohesion: 0.12
Nodes (30): CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, RIC: regole dalla ricerca (spegnibili), INT-05 bilancio delle prime due sedute, INT-02 esigenza di partenza 120/100/95% (+22 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Coach: schemi di movimento · js/coach/programma/schemi.js + scheda-unica.js, coach-v2-decisioni.md, struttura-pro.js"
Cohesion: 0.15
Nodes (16): E.1 Regressioni ammesse del cancello (meccanismo e voci), GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, inAllungamento(), ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI (+8 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + mi-sento-male.js, sessione.js, utility.js +3"
Cohesion: 0.14
Nodes (25): apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), formatNow(), stopDropSet(), alternativeOggi(), chiudiOccupato() (+17 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, repertorio.js +13"
Cohesion: 0.11
Nodes (67): applyGeneratedProgram(), applicaDecisioni(), inviaQuestionario(), riduciFrequenza(), azioneCoach(), cambiaSerieNelPiano(), conAnnulla(), prefsCoach() (+59 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 23 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js"
Cohesion: 0.45
Nodes (12): accosciato(), arto(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW, piegato(), sdraiato() (+4 more)

### Community 24 - "Test: mesociclo · tests/mesociclo.test.js"
Cohesion: 0.14
Nodes (10): app, assert, BASE, { caricaApp, elencoFixture }, { conSoglieStruttura, senzaSoglie }, costruisci(), ESERCIZI, { profili } (+2 more)

### Community 25 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js"
Cohesion: 0.16
Nodes (33): activeSourceTab, AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, failureTracks, RECOVERY_RING_CIRCUMFERENCE, selectedTrackId, selectedTrackUrl (+25 more)

### Community 26 - "Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + selezione-multipla.js, navigazione.js, schede-pronte.js +6"
Cohesion: 0.13
Nodes (35): chiudiQuestionario(), daysContainer, renderDayBar(), selectDay(), getDayTitle(), jsArg(), closePlates(), closeWeekSheet() (+27 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.20
Nodes (10): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+2 more)

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
Cohesion: 0.18
Nodes (10): 10. Limiti onesti, 2. Dove le fonti non concordano, 4. Rilevazione dei punti deboli, 6.1 Pavimento di serie **dirette** a settimana, 6.2 Regole di posto, 6. Muscoli trascurati: prescrizioni minime, 9. Domande aperte, Appendice A. Registro delle 16 ricerche riuscite (+2 more)

### Community 33 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js"
Cohesion: 0.18
Nodes (12): 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere), 3.1 Ingressi (tutti già disponibili nel codice), 3.2 Classi di esercizio, 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W), 3.4 Riduzioni («quando saltare»), 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra), 3.6 Arrotondamento e tetto di tempo, 3.7 Riscaldamento generale (minuti) (+4 more)

### Community 34 - "Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, calibrazione.js"
Cohesion: 0.22
Nodes (23): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, personaCalibrazione(), applicaPartenze(), arrotondaPartenza(), contestoCarichi(), esercizioAffidabilePerLoStorico() (+15 more)

### Community 36 - "Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js"
Cohesion: 0.06
Nodes (35): ancora(), ANCORE_DONNE_KG65, ANCORE_VERE_DONNE, arrotonda05(), atletaVirtuale(), CONTROLLO, fra(), GIORNI_PIANO (+27 more)

### Community 37 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + fasi.js, regole-ricerca.js"
Cohesion: 0.15
Nodes (13): 2. Dove le fonti non concordano, 4. Confronto con le app, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rilanciare con il tetto di ricerca alzato), Appendice B. Registro delle 10 ricerche riuscite (cosa hanno dato), Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso, eseguiFasi() (+5 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.06
Nodes (34): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+26 more)

### Community 40 - "Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js"
Cohesion: 0.29
Nodes (11): openExerciseInfo(), exInfoNome, exVuoto(), paneGrafico(), paneRecord(), paneStorico(), setExInfoTab(), PATTERN_INFO (+3 more)

### Community 41 - "Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js"
Cohesion: 0.07
Nodes (41): ATTREZZI_PALESTRA, BIA, { caricaApp }, conScelte(), costruisciConProfilo(), GRUPPI, idMetodi(), MOMENTI_PROVA (+33 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.08
Nodes (24): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima, 1. Cosa dicono le fonti (+16 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + seduta.js, sessione.js"
Cohesion: 0.24
Nodes (22): avviaTempoSeduta(), openWorkoutDay(), annullaSpeciale(), apriSedutaLibera(), avviaSpeciale(), eserciziDaNomi(), FILTRI_ATTREZZI, htmlListaLibera() (+14 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2"
Cohesion: 0.16
Nodes (44): fattoQuestaSettimana(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcFillMonth() (+36 more)

### Community 45 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md + motore.js"
Cohesion: 0.20
Nodes (11): 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice), 0. Come si legge, 2. Dove le fonti non concordano, 4. Combinare due obiettivi, 6. Audit delle regole esistenti, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 8 ricerche riuscite (+3 more)

### Community 46 - "Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js"
Cohesion: 0.53
Nodes (10): aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio(), renderCardio(), __sedutaInterrotta (+2 more)

### Community 47 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, volume.js +18"
Cohesion: 0.09
Nodes (79): stabile(), TOCCHI, coppiePerMuscolo(), COACH_PARAMETRI, completaSettimana(), eCernieraFemorali(), FLESSIONI_GINOCCHIO, NOTA_FEMORALI_SENZA_LEG_CURL (+71 more)

### Community 48 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.09
Nodes (22): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+14 more)

### Community 50 - "Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js"
Cohesion: 0.36
Nodes (8): apprendiTaraturaRir(), consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), aggiustiCoach(), salvaAggiusti(), contaStalli()

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + utility.js, stato-condiviso.js, impostazioni.js"
Cohesion: 0.21
Nodes (15): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+7 more)

### Community 52 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, regole-ricerca.js, coach-v2-decisioni.md +8"
Cohesion: 0.08
Nodes (46): A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), A. Collisioni e doppioni, E.1 Onda 0 — strumenti e bug netti, E.4 Onda 3 — carichi e autoregolazione, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale (+38 more)

### Community 53 - "Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js"
Cohesion: 0.15
Nodes (15): app, assert, BASE, { caricaApp }, costruisci(), FASI, griglia(), nomiSeduta() (+7 more)

### Community 54 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.20
Nodes (10): 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»), 1.8 Allenare due obiettivi insieme (+2 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js"
Cohesion: 0.09
Nodes (21): app5, assert, ATTR5, c, { caricaApp }, DETT5, DETTAGLI, fs (+13 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js"
Cohesion: 0.18
Nodes (29): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N (+21 more)

### Community 57 - "Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Tab Storico · js/ui/storico.js + pagine.js, sessione-completata.js, traduttore.js"
Cohesion: 0.20
Nodes (18): LOCALE(), apriPagProgressi(), chiudiPagProgressi(), PG_ICO, PG_PAGINE, pgPagina, renderPgTiles(), closeDoneView() (+10 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, senza-coach-ia.test.js, intensita-onda0.test.js +5"
Cohesion: 0.04
Nodes (51): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+43 more)

### Community 61 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +4"
Cohesion: 0.09
Nodes (44): XSS, import e CSP, 3.2 Dati sul dispositivo, import e XSS, applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia() (+36 more)

### Community 62 - "Test: generatore, correzioni dell'onda 0 (W0-T7) · tests/generatore-onda0b.test.js + ricerca-casa-poco-tempo.md"
Cohesion: 0.19
Nodes (13): 6. Audit delle regole esistenti, app(), assert, { caricaApp }, costruisci(), gruppo(), nomi(), pulito() (+5 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js + partenza.js, soglie-partenza.js, regole-ricerca.js"
Cohesion: 0.19
Nodes (16): calibrazioneChiusa(), calibrazioneNellaSeduta(), decisioneCalibrazione(), esposizioniCalibrazione(), faseCalibrazione(), percentualeSalto(), pesoDopoSalto(), recordPianoDi() (+8 more)

### Community 65 - "Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, volume.js"
Cohesion: 0.12
Nodes (56): Novità del coach v2, SOGLIE_TEMPO, adattaAlTempo(), antagonistiPerMuscolo(), _cacheFattore, classePausa(), coppiaValida(), durataCoppia() (+48 more)

### Community 66 - "Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + piano-coach-v2.md, vincoli.js, memoria-chiamata.js +9"
Cohesion: 0.09
Nodes (38): Nomi in posti inattesi, E.0 Protocollo di lavoro (vale per ogni task), E.2 Onda 1 — fondamenta, E.3 Onda 2 — il generatore, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate (+30 more)

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, biomeccanica.js, ricerca-riscaldamento-mobilita-prevenzione.md +2"
Cohesion: 0.11
Nodes (30): 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5.6 Cue: stato nell'app [V], 5. Audit della libreria (+22 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.08
Nodes (23): 0. Stato della ricerca (leggere prima), 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti (+15 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.20
Nodes (10): 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti, 3.6 Disegno dello scarico: cosa si taglia, 3.8 Come devono trattare lo scarico le altre regole (+2 more)

### Community 71 - "Test: attributi degli esercizi (classe, schema, crediti) · tests/attributi.test.js"
Cohesion: 0.08
Nodes (24): app, assert, ATTR, { caricaApp }, CTRL, DETT, DIFFERENZE, differenzeVere() (+16 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.22
Nodes (8): 0. In breve, 2. Dove le fonti non concordano, 4. Regole per le donne oltre ai carichi, 7. Domande aperte, 8. Limiti onesti, Appendice A. Registro delle 20 ricerche riuscite, Appendice B. Query pronte per ripeterle con il tetto alzato, Ricerca: donne, carichi di partenza prudenti e allenamento al femminile

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.13
Nodes (14): 1. Riepilogo numeri, 2. Tabella completa, 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno), 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file (+6 more)

### Community 76 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md"
Cohesion: 0.14
Nodes (13): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach (+5 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +2"
Cohesion: 0.05
Nodes (36): coach-mappa-regole.md (mappa delle regole), ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body (+28 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js"
Cohesion: 0.18
Nodes (12): 2. Dove le fonti non concordano, 4. Regole per popolazioni, 6. Audit delle regole esistenti, 7. Regole proposte, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rieseguire con il tetto alzato), Come si legge (+4 more)

### Community 82 - "Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.19
Nodes (14): confronta(), controlloOttavaEseguito(), costruisciRisultato(), dirUscita(), gitInfo(), main(), mdReport(), opzioni() (+6 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 85 - "Test: integrazione dell'onda 2b (volume, tempo, tecniche, mesociclo) · tests/integrazione-onda2b.test.js + struttura.test.js, indice.js, aiuto-mesociclo.js +1"
Cohesion: 0.05
Nodes (34): conSoglieStruttura(), FILE_SOGLIE, fs, path, assert, fs, path, test (+26 more)

### Community 86 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + intensita.js"
Cohesion: 0.36
Nodes (9): sedutePrimeDelProgramma(), giorniDallUltimaSeduta(), gruppoInPriorita(), mancavaSoloUltimaSerie(), prontezzaRecente(), regoleRicAlCarico(), rientroPiano(), sedutePassate() (+1 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, regole-ricerca.js +7"
Cohesion: 0.10
Nodes (45): faseSedutaSalvata(), aggiornaEsigenza(), faseDelGiorno(), inScarico(), settimanaDellaSeduta(), livelloStimato(), scaricoRecente(), strainSettimane() (+37 more)

### Community 91 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 92 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.20
Nodes (9): 2. Dove le fonti non concordano, 4. Blocchi di mobilità, 5. Prehab per sicurezza, 8. Domande aperte, 9. Limiti onesti, Appendice: query pronte (da ripetere con il tetto di ricerca alzato), Come si legge, In una pagina (+1 more)

### Community 93 - "Coach: prontezza prima della seduta · js/coach/prontezza.js"
Cohesion: 0.37
Nodes (13): applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaDiOggi(), prontezzaOggi(), prontezzaStato, punteggioProntezza() (+5 more)

### Community 94 - "Test: cancello delle tecniche · tests/tecniche.test.js"
Cohesion: 0.08
Nodes (27): adatta(), AL_CEDIMENTO, app(), assert, attr(), budget(), { caricaApp }, ESERCIZI (+19 more)

### Community 95 - "Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.31
Nodes (9): eseguiMatrice(), hash32(), matrice(), mulberry32(), pesoProfilo(), profilo(), r1(), scegli() (+1 more)

### Community 96 - "Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.20
Nodes (10): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+2 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, progressivo.js +1"
Cohesion: 0.30
Nodes (14): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, frenoBia(), corpoCoach(), consiglioPeso(), graficoPeso(), pesiTutti() (+6 more)

### Community 100 - "Strumento: collaudo del generatore di schede (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (18): analizza(), autotest(), contesto(), controindicato(), coperturaLibreria(), costruisci(), dacautela(), datiPerBuild() (+10 more)

### Community 101 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 102 - "Checklist App Store 07: rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 103 - "Checklist App Store 08: monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 104 - "Test: sicurezza e segnali (onda 0) · tests/sicurezza-onda0.test.js + integrazione-onda0.test.js, aiuto-mesociclo.js"
Cohesion: 0.11
Nodes (13): senzaSoglie(), assert, BASE, { caricaApp }, { conSoglieStruttura, senzaSoglie }, test, assert, BASE (+5 more)

### Community 105 - "Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + soglie.test.js"
Cohesion: 0.06
Nodes (30): assert, BLOCCATE, BLOCCATE_IN_PARTE, catalogoVero(), contesto(), fs, G, JSON_W1T1 (+22 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.15
Nodes (12): 2. Dove le fonti non concordano, 3.1 Cardio e passi (minuti a settimana, camminata compresa, pesi esclusi), 3.2 Proteine (in g per kg di **peso corporeo**; la massa magra da BIA solo come controllo), 3.3 Calorie e ritmo di variazione del peso, 3.4 Lettura di BIA e peso (regole di prudenza: prassi, **non** risultati di questa ricerca), 3.5 Frasi sicure già utilizzabili, 3. Numeri per il coach, 6. Domande aperte (+4 more)

### Community 109 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js"
Cohesion: 0.17
Nodes (26): spotifyController, spotifyReady, webDuration, ytPlayer, ytPlayerReady, avviaWebPronto(), caricaPlayerWebSalvato(), onDropVolumeInput() (+18 more)

### Community 111 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.22
Nodes (19): apriQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+11 more)

### Community 112 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js"
Cohesion: 0.22
Nodes (9): 5.1 Chi ci può accedere (SPE-03), 5.2 La ricetta, in otto passi, 5.3 Come innestarla su ogni split, 5.4 Esercizi per priorità (nomi della libreria attuale `libreria-esercizi.js`), 5.5 Durata e regola di uscita (SPE-08), 5. Programma di specializzazione, 7. Audit delle regole esistenti, ricettaPunti() (+1 more)

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.14
Nodes (13): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+5 more)

### Community 117 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 3) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.25
Nodes (8): 3.1 Metodo, parametri, assunzioni, 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg), 3.4 Peso corporeo e massa magra, 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante), 3.6 Fattore prudente e sblocco rapido (DON-04), 3.7 Pavimento della barra e alternative, 3.8 Come tarare con dati reali (senza inviare nulla), 3. Carichi di partenza: tabelle

### Community 118 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js"
Cohesion: 0.25
Nodes (8): 4. Audit delle regole esistenti (confronto con il codice), 3.3 Struttura per giorni a settimana, 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie, 6. Audit delle regole esistenti, splitFor()

### Community 119 - "Progressi: foto · js/ui/progressi/foto.js"
Cohesion: 0.35
Nodes (15): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+7 more)

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 121 - "Checklist App Store 02: tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 122 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.23
Nodes (15): codiceNellaVoce(), costruisciCatalogo(), espandiCodici(), fs, leggiBloccate(), leggiRegole(), leggiRepo(), leggiRitirati() (+7 more)

### Community 123 - "Checklist App Store 06: qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 124 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + schede-varianti.js"
Cohesion: 0.36
Nodes (6): closeExerciseInfo(), GLOSSARIO, pausaConsigliata(), preferenzaEsercizio(), schedaTecnica(), TECNICA

### Community 125 - "Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 126 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, stato.js +3"
Cohesion: 0.12
Nodes (41): getProfile(), apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento() (+33 more)

### Community 127 - "Strumento: elenco delle soglie del coach · tools/elenco-soglie.js"
Cohesion: 0.20
Nodes (14): caricaSoglie(), cella(), FORZE_AMMESSE, fs, generaElenco(), main(), path, R (+6 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md + partenza.js"
Cohesion: 0.20
Nodes (10): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+2 more)

### Community 130 - "Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js, coach-v2-decisioni.md, ricerca-ipertrofia-programmazione.md +5"
Cohesion: 0.13
Nodes (34): D. Decisioni di prodotto (prese; rispondono al cap. H del piano), 5. Regole proposte, 3.5 Carico e ripetizioni settimana per settimana, 7. Regole proposte, arrotonda2(), CAUSE_CONTROLLO_OTTAVA, classeRirDi(), CLASSI_PIANO (+26 more)

### Community 131 - "Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 133 - "Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js + tecniche.test.js"
Cohesion: 0.09
Nodes (18): assert, BASE, { caricaApp }, ES_CLASSI, FASTIDI, GIORNI, GOAL_SET, LIVELLI (+10 more)

### Community 134 - "Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +1"
Cohesion: 0.12
Nodes (41): B.3 Le catene: ordine fisso e scritto, F.2 Rischi e rimedi, strSquatDoppio(), SOGLIE_VOLUME, aggiungiSerieUtile(), assegnaVolume(), bersagliVolume(), creditiUnita() (+33 more)

### Community 136 - "Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js"
Cohesion: 0.43
Nodes (7): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), EMOJI_TESTA, PATTERN_RULES, patternFor()

### Community 137 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 138 - "Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js, ARCHITETTURA.md"
Cohesion: 0.27
Nodes (13): Catalogo delle regole generato dalla mappa (npm run catalogo), COACH_REGOLE, COACH_REGOLE_PER_CODICE, COACH_SQUADRA, regolaDescritta(), aggiungiPerche(), codiceInSquadra(), etichettaForza() (+5 more)

### Community 139 - "Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +1"
Cohesion: 0.08
Nodes (51): limitaTecnicheIntense(), SOGLIE_TECNICHE, briefTecnicheOggi(), budgetTecniche(), CLASSI_PER_TECNICA, condizioneClasse(), esercizioCaricaIlFastidio(), esercizioSenzaCedimento() (+43 more)

### Community 140 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.22
Nodes (9): 3. Matrice fastidio → modifica, Anca, Caviglia (non cercato sul web: conoscenza del modello, Convenzione), Collo (assente oggi dal coach; base [V] solo sull'esercizio per il dolore cronico, il resto conoscenza del modello, Convenzione), Ginocchio, Gomito, Polso, Schiena bassa (+1 more)

### Community 141 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +3"
Cohesion: 0.26
Nodes (20): Flussi principali, mediaKeeper, SILENZIO_WAV, FAILURE_SET_SECONDS, avviaCanaleMultimediale(), fermaCanaleMultimediale(), tipoSessione(), dropActive (+12 more)

### Community 142 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, 3. Sicurezza e privacy

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js"
Cohesion: 0.15
Nodes (14): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+6 more)

### Community 144 - "Test: volume per muscolo · tests/volume.test.js"
Cohesion: 0.12
Nodes (14): assert, BASE, bersagli(), brief(), { caricaApp }, FILE_NUOVI, fs, nuovaApp() (+6 more)

### Community 146 - "Test: tempo della seduta · tests/tempo.test.js"
Cohesion: 0.18
Nodes (16): app(), assert, BASE, { caricaApp }, costruisci(), dur(), E(), fs (+8 more)

### Community 147 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.29
Nodes (7): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti

### Community 148 - "Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.29
Nodes (7): Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), cala(), meta(), scarico(), scaricoMancato()

### Community 149 - "Test: golden dei carichi (le quattro catene del coach) (parte 3) · tests/carichi-golden.test.js + ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.29
Nodes (7): 3.9 Seduta o pausa saltata, incompleta(), mancato(), moltoSotto(), ok(), rep(), soloUltima()

### Community 150 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.29
Nodes (7): 5.1 «Correre» (5K, 10K): supporto, non allenatore di corsa, 5.2 Abilità: «prima trazione», «10 piegamenti», «squat completo», «toccarmi le punte», «plank 60 s», 5.3 Sport (squadra e combattimento): «supporto alla stagione», 5.4 «Schiena, collo e spalle» (postura e lavoro d'ufficio), 5.5 Mantenimento (fase dopo il calo o dopo un ciclo), 5.6 Altri obiettivi ovvi (lista, senza programma qui), 5. Obiettivi che l'app non ha ancora

### Community 151 - "Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js"
Cohesion: 0.35
Nodes (12): briefCoach(), briefOggi(), chiDa(), conLivelloNoto(), faseCorpo(), faseDaObiettivi(), LIVELLI_NOTI, livelloConosciuto() (+4 more)

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 153 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 2) · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.29
Nodes (7): 3.1 Cosa fare dopo sedute o settimane saltate (default proposti), 3.2 Prontezza: punteggio difendibile e soglie riduci / mantieni / spingi, 3.3 Scala del tono dei messaggi (linee guida), 3.4 Dieci messaggi nella voce dell'app, 3.5 Bandiere rosse e risposta sicura, 3.6 Per chi (uomini, donne, anziani, giovani), 3. Numeri e testi per il coach

### Community 154 - "Condividi e stampa la scheda · js/ui/stampa-scheda.js + fogli.js"
Cohesion: 0.60
Nodes (5): scaricaFile(), condividiScheda(), righeScheda(), stampaScheda(), testoScheda()

### Community 155 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md + coach-v2-decisioni.md, e1rm.js, seduta.js"
Cohesion: 0.20
Nodes (11): F.1 Le 12 modifiche che contano di più (qualità e sicurezza), in ordine, F.2 Riordino delle ondate (le ondate restano rilasciabili), F. Priorità reale, 5.1 Funzioni molto apprezzate, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, caricoPer() (+3 more)

### Community 156 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 157 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js"
Cohesion: 0.44
Nodes (11): currentWebMode, aggiornaAvvisoDock(), attesaAvvio, controllaAvvioMusica(), dockDaAprire(), dockStato(), inizioSegmento(), posizionaDock() (+3 more)

### Community 158 - "Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (5): contaSerie(), creditiAttributi(), creditoGruppo(), gruppoDi(), volumeUnitaDiverso()

### Community 159 - "Test: generatore, residui dell'onda 1 · tests/generatore-onda1.test.js"
Cohesion: 0.27
Nodes (8): app(), assert, { caricaApp }, costruisci(), GIORNI, pulito(), puntiLombari(), test

### Community 160 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 3) · docs/ricerca-specializzazione-punti-deboli.md + muscoli.test.js"
Cohesion: 0.29
Nodes (7): 3.1 Serie frazionarie a settimana per muscolo, 3.2 Contributo diretto e indiretto dei composti (pesi per serie dura), 3. Tabella volumi minimi e di specializzazione per muscolo, 8. Regole proposte, bersaglio(), famiglia(), stessoLavoro()

### Community 161 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.22
Nodes (9): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+1 more)

### Community 162 - "Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 163 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 4) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 164 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.33
Nodes (5): 2. Dove le fonti non concordano, 6. Domande aperte, 7. Limiti onesti, 8. Appendice: query pronte per un'altra sessione con il tetto alzato, Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

### Community 165 - "Coach: biomeccanica · js/coach/biomeccanica.js"
Cohesion: 0.53
Nodes (5): htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), TEST_FAI_DA_TE

### Community 166 - "Test: golden dei carichi (le quattro catene del coach) (parte 4) · tests/carichi-golden.test.js"
Cohesion: 0.25
Nodes (8): corto(), costruisciStato(), eseguiCaso(), leggi(), pianoCorto(), programma(), provaStadio(), scrivi()

### Community 167 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 168 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 4) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.40
Nodes (5): 3.1 Struttura: giorni, split, serie, ripetizioni, riposo, RIR, 3.2 Cardio, progressione, cosa tracciare, tempi attesi, cosa NON fare, 3.3 Le prime 4 settimane, per obiettivo (modelli di lavoro, Convenzione), 3.4 Metriche (riassunto in una riga per obiettivo), 3. Matrice obiettivo -> programma

### Community 169 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.40
Nodes (5): 5.1 Scala del dolore, 5.2 Prontezza e tetti di sforzo, 5.3 Rampe di rientro, 5.4 Quando il coach deve dire «medico», 5. Soglie di prudenza

### Community 170 - "Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (6): causaDichiarata(), conflittiRecupero(), consecutivi(), minutiEffettivi(), noteFalse(), unitaRiempibile()

### Community 171 - "Mappa per agenti · docs/mappa-per-agenti.md"
Cohesion: 0.50
Nodes (3): Come cercare (in quest'ordine), Mappa per agenti, Stile

### Community 173 - "Strumento: collaudo del generatore di schede (parte 8) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (3): bandaB6(), pavimentoDiretteB6(), volumeGruppi()

### Community 174 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 4) · docs/ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.40
Nodes (5): 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti

### Community 175 - "Test: golden dei carichi (le quattro catene del coach) (parte 5) · tests/carichi-golden.test.js"
Cohesion: 0.40
Nodes (5): chiaveSpec(), firme(), mulberry32(), norm(), ricampiona()

### Community 177 - "Test: muscolo bersaglio e alternative (parte 3) · tests/muscoli.test.js"
Cohesion: 0.83
Nodes (4): alt(), g(), nomeLib(), pulito()

## Knowledge Gaps
- **1024 isolated node(s):** `ATTR`, `0. Come si legge`, `B10. Over 65`, `B11. Modello dei tempi`, `B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08)` (+1019 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1161 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, ricerca-psicologia-aderenza.md +2` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, lavoro-cronometro.js`, `Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, volume.js`, `Piano: scelta del giorno (parte 2) · js/ui/piano/giorno.js + selezione-multipla.js, navigazione.js, schede-pronte.js +6`, `Piano: scelta del giorno · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +10`, `Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + fasi.js, regole-ricerca.js`, `Tab Storico · js/ui/storico.js + pagine.js, sessione-completata.js, traduttore.js`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, costanti.js, traduttore.js +9`, `Disegni degli esercizi · js/dati/disegni-esercizi.js + schede-esercizio.js, traduttore.js`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, volume.js +18`, `Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, repertorio.js +13`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js, schede-esercizio.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, regole-ricerca.js +7`, `Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +4`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, stato.js +3`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Are the 113 inferred relationships involving `Novità del coach v2` (e.g. with `e1rm()` and `e1rmSeduta()`) actually correct?**
  _`Novità del coach v2` has 113 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ATTR`, `0. Come si legge`, `B10. Over 65` to the rest of the system?**
  _1024 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, lavoro-cronometro.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10909090909090909 - nodes in this community are weakly interconnected._
- **Why does `aggiornaDopoScambio()` connect `Piano: scelta del giorno · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +10` to `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, ricerca-psicologia-aderenza.md +2`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, macchinario-occupato.js, repertorio.js +13`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, stato.js +3`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, soglie-coach.md, lettore.js +4` be split into smaller, more focused modules?**
  _Cohesion score 0.0711849957374254 - nodes in this community are weakly interconnected._
- **Why does `renderMonthCal()` connect `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +2` to `Piano: scelta del giorno · js/ui/piano/giorno.js + scambio.js, pannello.js, suggeritore.js +10`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, regole-ricerca.js +7`, `Calendario: gruppi muscolari · js/ui/calendario/gruppi.js`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, ricerca-psicologia-aderenza.md +2`, `Esportazione verso calendari (.ics) · js/ui/esporta-ics.js`, `Tab Storico · js/ui/storico.js + pagine.js, sessione-completata.js, traduttore.js`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, stato.js +3`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._