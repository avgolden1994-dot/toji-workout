# Graph Report - toji-workout  (2026-10-10)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 4093 nodes · 11249 edges · 191 communities (182 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 896 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8eeab29d`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, coach-mappa-regole.md, ricerca-struttura-e-intensita.md +6
- Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, guida-interattiva.js, onboarding-risultato.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, navigazione.js, questionario-decisioni.js +11
- Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + pannello.js, suggeritore.js, giorno.js +9
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3
- Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +1
- BIA nelle opzioni · js/coach/bia/opzioni.js + lettore.js, archivio.js, onboarding.js
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, stato.js, ricerca-metodi-coach-pratici.md +1
- Coach: mi sento male in seduta · js/coach/mi-sento-male.js + costanti.js, seduta.js, annulla.js +12
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md
- Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, piano-onda5.md, regole-ricerca.js +5
- Manifest della PWA · manifest.json
- Coach: schemi di movimento · js/coach/programma/schemi.js + coach-v2-decisioni.md, struttura-pro.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + brief.js, storage.js, traduttore.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + repertorio.js, lavoro-cronometro.js, seduta-libera.js +9
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, soglie-progressione.js +2
- Test: onda 5, over 65 ed esercizi da evitare (ETA-19) · tests/onda5-over65-esercizi.test.js + forza-attivazione.test.js, forza-modalita.test.js, attrezzi-onboarding.test.js +6
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js +1
- Coach: prontezza prima della seduta · js/coach/prontezza.js + dolore-mattina.js, fasi.js, questionario-decisioni.js +4
- Strumento: aggiornamento del grafo · tools/grafo.js
- Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, oggi.js
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, riepilogo.js, ricerca-psicologia-aderenza.md +6
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js
- Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md
- Test: modalità Forza, struttura del powerlifting (FRZ-02, FRZ-03) · tests/forza-struttura.test.js + attrezzi-dichiarati.test.js
- Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md
- package.json (script npm) (parte 2) · package.json + integrazione-onda4.test.js
- Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js + tempo.test.js, genera-golden.test.js, genera-stadi.test.js +1
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, dettagli-esercizi.js, seduta.js
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1
- Coach: popolazioni e rientro dopo una pausa (over 65, gravidanza, rampa) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js, regole-ricerca.js +1
- Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + completamenti.js, schede-tecniche.js, volume.js +20
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- Test: guardie del corpo (nutrizione e composizione corporea) · tests/guardie-corpo.test.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + audio-silenzioso.js, utility.js, cedimento.js +2
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 2) · docs/ricerca-casa-poco-tempo.md
- Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + integrazione-3a.test.js, hip-hinge-ripiego.test.js, ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + guida-interattiva.js, stampa-scheda.js, ripristino-guida.js +4
- Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, revisione-onda2d-giorni.test.js, aiuto-selezione.js +1
- Schermata Oggi · js/ui/oggi.js + storico.js, sessione-completata.js, storage.js +1
- Timer di recupero e orologio · js/ui/allenamento/timer-recupero.js + timer-pannello.js, stato-condiviso.js, impostazioni.js
- Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, bmr-minorenni-viste.test.js +7
- Coach: ricette a slot e composizione delle sedute (componiSedute) · js/coach/programma/ricette.js + serie-ripetizioni.js, importa-progressi.js, ricerca-biomeccanica-esercizi.md +7
- Strumento: cancello del collaudo del generatore · tools/cancello-collaudo.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js
- Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + genera.js, soglie-tempo.js, mappa-per-agenti.md +1
- Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + soglie-selezione.js, vincoli.js, memoria-chiamata.js +2
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-specializzazione-punti-deboli.md, partenza.js +2
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Strumento: indice del codice · tools/indice.js
- Test: attributi degli esercizi (classe, schema, crediti) · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- Checklist App Store 01: decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +7
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + coach-v2-decisioni.md, popolazioni.test.js
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Coach: specialista Forza, struttura del powerlifting (FRZ-02..05) · js/coach/specialita/forza.js + soglie-forza.js
- Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + elenco-soglie.js, soglie.test.js, collaudo-attrezzi.test.js +1
- Strumento: elenco file del service worker · tools/genera-sw.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 3) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, termina-e-cardio.js, riepilogo.js +2
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 4) · docs/ricerca-casa-poco-tempo.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js
- Test: cancello delle tecniche · tests/tecniche.test.js
- Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js
- Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + pagine.js, ricerca-cardio-nutrizione.md
- Strumento: collaudo del generatore di schede (parte 4) · tools/collaudo-generatore.js
- Test: popolazioni e rientro dopo una pausa (P4-S) · tests/popolazioni.test.js + aiuto-atleta-piano.js
- Checklist App Store 07: rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- Checklist App Store 08: monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Test: mesociclo · tests/mesociclo.test.js + integrazione-onda2b.test.js, sicurezza-onda0.test.js, integrazione-onda0.test.js +1
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js, lettore-fisso.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 3) · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js
- Progressi: foto · js/ui/progressi/foto.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- Checklist App Store 02: tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Test: scarico unico e protezioni (P3-B) · tests/scarichi.test.js + tecniche.test.js
- Checklist App Store 06: qualità e test · docs/checklist-appstore/06-qualita-test.md
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, metodi-momenti.js, psicologia.js +5
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 4) · docs/ricerca-donne-carichi-iniziali.md + partenza.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md + partenza.js
- Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js, ricerca-ipertrofia-programmazione.md
- Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js
- Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, soglie-coach.md +7
- README del progetto · README.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + integrazione-onda4.test.js
- Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js
- Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +3
- Test: programma azzerato, progressi e carichi salvati (P3-M) · tests/conserva-progressi.test.js
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + carichi-golden.test.js, mesociclo.test.js
- Test: volume per muscolo · tests/volume.test.js
- Coach: soglie della regia · js/coach/regia/soglie-regia.js
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) (parte 2) · docs/ricerca-metodi-coach-pratici.md
- Coach: scarico (dose unica, fatica, protezioni) · js/coach/sicurezza/scarico.js + rampa-settimana.js, ricerca-mesocicli-periodizzazione-scarichi.md, repertorio.js +6
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + carichi-golden.test.js
- Test: aiuto per le prove del piano in seduta e dello scarico unico · tests/aiuto-atleta-piano.js + onda5-calendario.test.js, integrazione-onda4.test.js
- Test: integrazione dell'onda 4 (INT-4) · tests/integrazione-onda4.test.js
- Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js + compone.js, ricerca-obiettivi-e-programmi.md, bmr-minorenni.js +6
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + disegni-esercizi.js, traduttore.js
- Coach: soglie del carico di partenza e della calibrazione rapida · js/coach/carichi/soglie-partenza.js
- Test: fastidi e modifica scritta della scheda (P4-F) · tests/fastidi.test.js
- Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md + piano-coach-v2.md, PIANO.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js
- Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js
- Test: generatore, residui dell'onda 1 · tests/generatore-onda1.test.js
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, repertorio.js, ricerca-algoritmi-carichi-e-app.md +5
- Strumento: integrazione delle onde del coach v2 (parte 2) · tools/integra-onda.js
- Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md
- Test: Forza, carichi dei giorni medi e leggeri (FRZ-11) · tests/forza-carichi.test.js
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Test: split, giorni e attrezzi (PRG-02, OBI-01, CAS-01) · tests/split.test.js + senza-coach-ia.test.js, struttura.test.js, aiuto-selezione.js +3
- Test: scelta degli esercizi per attributi (W2-T6) · tests/selezione.test.js
- Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js
- Test: integrazione dell'onda 2c (INT-2b) · tests/integrazione-onda2c.test.js
- Test: difetti trovati dalla revisione dell'onda 3a (INT-3b) · tests/revisione-onda3a.test.js
- Strumento: collaudo del generatore di schede (parte 7) · tools/collaudo-generatore.js
- Soglie del coach · docs/soglie-coach.md + split.test.js
- Coach: griglia dei pesi per attrezzo (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js + progressivo.js, regole-ricerca.js, coach-v2-decisioni.md +6
- Coach: catalogo delle regole (generato) · js/coach/catalogo-regole.js + parametri.js, ARCHITETTURA.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) (parte 3) · docs/ricerca-metodi-coach-pratici.md
- Test: distribuzione dei muscoli piccoli e flessione del ginocchio (P3-G) · tests/distribuzione.test.js
- Coach: alternative e applicazione del programma · js/coach/programma/alternative.js
- Coach: specialista Forza, il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + soglie-forza-carichi.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md
- Coach: soglie della divisione e dei giorni (split) · js/coach/programma/soglie-split.js + onboarding.js, ricerca-specializzazione-punti-deboli.md
- Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js
- Test: onda 5, il peso sale con il RIR fisso (ALG-19) · tests/onda5-ripresa-prudenti.test.js
- Test: il piano si esegue in seduta (MES-03) · tests/piano-in-seduta.test.js
- Coach: fastidi e modifica scritta della scheda (REC-04, SAF-02) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js, attributi-esercizi.js
- Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js
- Test: rifiniture della revisione dell'onda 2e/2f (INT-2g) · tests/revisione-onda2g.test.js
- Mappa per agenti · docs/mappa-per-agenti.md

## God Nodes (most connected - your core abstractions)
1. `Novità del coach v2` - 198 edges
2. `loadData()` - 111 edges
3. `caricaApp()` - 94 edges
4. `renderAllenamento()` - 93 edges
5. `findExercise()` - 90 edges
6. `regolaAttiva()` - 87 edges
7. `getProfile()` - 75 edges
8. `senzaEmoji()` - 74 edges
9. `currentDay` - 74 edges
10. `renderPiano()` - 73 edges

## Surprising Connections (you probably didn't know these)
- `3.12 Concatenare i blocchi in 6-12 mesi` --references--> `corpoCoach()`  [INFERRED]
  docs/ricerca-mesocicli-periodizzazione-scarichi.md → js/coach/repertorio.js
- `3.8 Come devono trattare lo scarico le altre regole` --references--> `ultimeSessioni()`  [INFERRED]
  docs/ricerca-mesocicli-periodizzazione-scarichi.md → js/coach/carichi/progressivo.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `B.6 Regole della regia (REG)` --references--> `aggiungiPerche()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/regia/perche.js
- `3.6 Fattore prudente e sblocco rapido (DON-04)` --references--> `caricoProssimoBase()`  [INFERRED]
  docs/ricerca-donne-carichi-iniziali.md → js/coach/regole-ricerca.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (191 total, 9 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8"
Cohesion: 0.07
Nodes (74): XSS, import e CSP, 3.2 Dati sul dispositivo, import e XSS, escapeHtml(), handleSelectExercise(), jsArg(), nomeSicuro(), pulisciDeep(), MUSCLE_GROUPS (+66 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, coach-mappa-regole.md, ricerca-struttura-e-intensita.md +6"
Cohesion: 0.08
Nodes (51): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04), A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), 3.10 Rotazione degli esercizi (+43 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, guida-interattiva.js, onboarding-risultato.js"
Cohesion: 0.10
Nodes (59): onbMomento(), onbPsico(), renderPsicoStep(), offriGuida(), biaField(), bindBiaInputs(), chip(), descSonnoBene() (+51 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, navigazione.js, questionario-decisioni.js +11"
Cohesion: 0.12
Nodes (37): applyGeneratedProgram(), inviaQuestionario(), riduciFrequenza(), daysContainer, renderDayBar(), CHIAVI_COACH_IA_RIMOSSO, historyKey(), leggiJSON() (+29 more)

### Community 4 - "Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + pannello.js, suggeritore.js, giorno.js +9"
Cohesion: 0.15
Nodes (32): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), currentDay, selectDay(), armedSet, focusEsercizio(), alert() (+24 more)

### Community 5 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3"
Cohesion: 0.13
Nodes (34): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, TEMI (+26 more)

### Community 6 - "Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js"
Cohesion: 0.03
Nodes (56): ABBR, ATT_DICHIARABILI, ATT_EXTRA_PALESTRA, ATTREZZI_OK, ATTREZZI_QUASI, cacheCrediti, cacheEs, cacheUsabili (+48 more)

### Community 7 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, fogli.js +1"
Cohesion: 0.11
Nodes (34): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ripristinaBackup(), valorePulito() (+26 more)

### Community 8 - "BIA nelle opzioni · js/coach/bia/opzioni.js + lettore.js, archivio.js, onboarding.js"
Cohesion: 0.19
Nodes (19): analyzeBia(), applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), closeBiaSheet() (+11 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (29): acorn, aggiungiUso(), alCaricamento, analizzaUsi(), appFiles, ast, datiJson, defs (+21 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.09
Nodes (23): B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati, B17. Scarico reattivo (+15 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1"
Cohesion: 0.20
Nodes (26): getDayTitle(), WORKOUT_TEMPLATES, applyTemplateFromGroups(), applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays (+18 more)

### Community 12 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, stato.js, ricerca-metodi-coach-pratici.md +1"
Cohesion: 0.14
Nodes (28): 6. Regole proposte, apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento() (+20 more)

### Community 13 - "Coach: mi sento male in seduta · js/coach/mi-sento-male.js + costanti.js, seduta.js, annulla.js +12"
Cohesion: 0.15
Nodes (22): restartOnboarding(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), switchProtocol(), chiudiQuestionario(), currentMode (+14 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.18
Nodes (10): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 6. Audit delle regole esistenti, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte da lanciare con il tetto alzato (+2 more)

### Community 15 - "Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js"
Cohesion: 0.08
Nodes (34): acorn, AGGIUSTI, assert, BIA, cala(), { caricaApp, VETTORI_CARICHI }, corto(), costruisciStato() (+26 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, piano-onda5.md, regole-ricerca.js +5"
Cohesion: 0.13
Nodes (32): Non si fa (motivo), Ordine e chiusura, Piano dell'onda 5 (coach v2) — snello, Punti scelti (in ordine di valore; chi li fa; file di proprietà; accettazione), Stato (aggiornato a ogni passo), segnaEsercizioTaratura(), aggiornaEsigenza(), esigenzaCoach() (+24 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Coach: schemi di movimento · js/coach/programma/schemi.js + coach-v2-decisioni.md, struttura-pro.js"
Cohesion: 0.21
Nodes (12): E.1 Regressioni ammesse del cancello (meccanismo e voci), GLUTEI_FAMIGLIE, ISOLAMENTI, isolamentoDi(), libNome(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento() (+4 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + brief.js, storage.js, traduttore.js"
Cohesion: 0.24
Nodes (21): attrezziSalvati(), normalizeExerciseRecord(), trEs(), alternativeOggi(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO (+13 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + repertorio.js, lavoro-cronometro.js, seduta-libera.js +9"
Cohesion: 0.12
Nodes (50): Flussi principali, 5.1 Funzioni molto apprezzate, sostituto(), applicaDecisioni(), azioneCoach(), cambiaSerieNelPiano(), conAnnulla(), controlloSchemi() (+42 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.25
Nodes (18): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), famigliaTotaleDi(), focusConTipo(), lavoroDaSostituire(), MULTIARTICOLARI_TOTALI, MUSCOLI (+10 more)

### Community 23 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, soglie-progressione.js +2"
Cohesion: 0.05
Nodes (60): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+52 more)

### Community 24 - "Test: onda 5, over 65 ed esercizi da evitare (ETA-19) · tests/onda5-over65-esercizi.test.js + forza-attivazione.test.js, forza-modalita.test.js, attrezzi-onboarding.test.js +6"
Cohesion: 0.03
Nodes (43): assert, { caricaApp }, chips(), test, assert, fs, path, test (+35 more)

### Community 25 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js +1"
Cohesion: 0.20
Nodes (27): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, formatMMSS(), aggiornaRiassuntoMusica(), clearCedimentoAudio(), closeMusicSheet() (+19 more)

### Community 26 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + dolore-mattina.js, fasi.js, questionario-decisioni.js +4"
Cohesion: 0.14
Nodes (29): 7. Regole proposte, apprendiTaraturaRir(), consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), applicaProntezza(), leggiProntezza() (+21 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, oggi.js"
Cohesion: 0.36
Nodes (8): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), caricoProssimo(), stimaSeduta()

### Community 29 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.10
Nodes (21): 2.10 Candito 6 settimane, 2.11 Sheiko, 2.12 RTS: Reactive Training Systems (Mike Tuchscherer), 2.13 Barbell Medicine, 2.14 PHUL e PHAT, 2.15 Starting Strength, StrongLifts, GreySkull e perché smettono di funzionare, 2.16 Lyle McDonald: Generic Bulking Routine, 2.17 Metodi di nicchia: Dan John, Pavel, Cressey, Thibaudeau, Beardsley, HIT (+13 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.13
Nodes (15): scripts, cancello, catalogo, collaudo:schede, controlla, grafo, grafo:verifica, indice (+7 more)

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (8): 2. Dove le fonti non concordano, 4. Primo giorno, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 15 ricerche riuscite, Appendice B. Query pronte (da rilanciare con il tetto alzato), In una pagina, Ricerca: le prime 12 settimane del principiante e la prima seduta

### Community 32 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, riepilogo.js, ricerca-psicologia-aderenza.md +6"
Cohesion: 0.17
Nodes (29): 5. Regole proposte, sedutaPianoB(), aderenzaDueSettimane(), ALZATE_BASE, htmlAderenza(), htmlOrario(), htmlSedutaSaltata(), livelloStandardForza() (+21 more)

### Community 33 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.26
Nodes (9): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+1 more)

### Community 34 - "Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js"
Cohesion: 0.16
Nodes (20): aggiungiVoci(), CAMPI, conta(), creaCapitolo(), esiste(), FINTI, fs, inserisciRegola() (+12 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js"
Cohesion: 0.21
Nodes (22): applicaPartenze(), arrotondaPartenza(), classePartenza(), esercizioAffidabilePerLoStorico(), FACILITATE_PAR09, fattorePartenza(), fonteBase(), FRASI_FONTE_STIMA (+14 more)

### Community 36 - "Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js"
Cohesion: 0.04
Nodes (52): ancora(), ANCORE_DONNE_KG65, ANCORE_VERE_DONNE, arrotonda05(), atletaVirtuale(), CONTROLLO, FILE_BILANCIA_V2, fra() (+44 more)

### Community 37 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.12
Nodes (16): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 4. Confronto con le app (+8 more)

### Community 38 - "Test: modalità Forza, struttura del powerlifting (FRZ-02, FRZ-03) · tests/forza-struttura.test.js + attrezzi-dichiarati.test.js"
Cohesion: 0.08
Nodes (28): assert, { caricaApp }, PROFILI, test, TUTTI_CASA, app(), assert, { caricaApp } (+20 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.06
Nodes (34): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+26 more)

### Community 40 - "package.json (script npm) (parte 2) · package.json + integrazione-onda4.test.js"
Cohesion: 0.18
Nodes (10): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+2 more)

### Community 41 - "Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js + tempo.test.js, genera-golden.test.js, genera-stadi.test.js +1"
Cohesion: 0.05
Nodes (62): ATTREZZI_PALESTRA, BIA, { caricaApp }, conScelte(), costruisciConProfilo(), GRUPPI, idMetodi(), MOMENTI_PROVA (+54 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.07
Nodes (27): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima (+19 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, dettagli-esercizi.js, seduta.js"
Cohesion: 0.20
Nodes (24): etichettaAttrezzo(), avviaTempoSeduta(), openWorkoutDay(), renderWorkoutDayPicker(), annullaSpeciale(), apriSedutaLibera(), avviaSpeciale(), eserciziDaNomi() (+16 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1"
Cohesion: 0.15
Nodes (40): attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcFillMonth(), mcPaste() (+32 more)

### Community 45 - "Coach: popolazioni e rientro dopo una pausa (over 65, gravidanza, rampa) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js, regole-ricerca.js +1"
Cohesion: 0.14
Nodes (35): giorniDallUltimaSeduta(), gruppoInPriorita(), mancavaSoloUltimaSerie(), prontezzaRecente(), regoleRicAlCarico(), rientroPiano(), sedutePassate(), settimanaCentraleBlocco() (+27 more)

### Community 46 - "Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js"
Cohesion: 0.53
Nodes (10): aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio(), renderCardio(), __sedutaInterrotta (+2 more)

### Community 47 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + completamenti.js, schede-tecniche.js, volume.js +20"
Cohesion: 0.08
Nodes (75): Nomi in posti inattesi, stabile(), voceAttrezzo(), TOCCHI, coppiePerMuscolo(), completaSettimana(), copriCuffia(), CUFFIA_ESERCIZI (+67 more)

### Community 48 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+15 more)

### Community 50 - "Test: guardie del corpo (nutrizione e composizione corporea) · tests/guardie-corpo.test.js"
Cohesion: 0.09
Nodes (23): ADULTI, assert, BIA, campiDiCibo(), { caricaApp }, codiceApp(), DUE_BIA, FILE_SOGLIE (+15 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + audio-silenzioso.js, utility.js, cedimento.js +2"
Cohesion: 0.17
Nodes (21): mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale(), lampeggia(), playBeep(), playEnd(), playTick() (+13 more)

### Community 52 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 2) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.20
Nodes (10): 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei), 3.4 Catena posteriore: anca (glutei, femorali, schiena) e flessione del ginocchio (femorali), 3.5 Tirata orizzontale (dorsali, romboidi, bicipiti, deltoide posteriore), 3.6 Tirata verticale (dorsali, bicipiti), 3.7 Tricipiti (dip e estensioni), polpacci, core (+2 more)

### Community 53 - "Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js"
Cohesion: 0.14
Nodes (16): app, assert, BASE, { caricaApp }, { conSoglieSelezione }, costruisci(), FASI, griglia() (+8 more)

### Community 54 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.17
Nodes (11): 2. Dove le fonti non concordano, 3.1 Struttura: giorni, split, serie, ripetizioni, riposo, RIR, 3.2 Cardio, progressione, cosa tracciare, tempi attesi, cosa NON fare, 3.3 Le prime 4 settimane, per obiettivo (modelli di lavoro, Convenzione), 3.4 Metriche (riassunto in una riga per obiettivo), 3. Matrice obiettivo -> programma, 8. Domande aperte, 9. Limiti onesti (+3 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + integrazione-3a.test.js, hip-hinge-ripiego.test.js, ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.04
Nodes (45): 8. Regole proposte, a, assert, BASE, { caricaApp }, G, test, assert (+37 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + guida-interattiva.js, stampa-scheda.js, ripristino-guida.js +4"
Cohesion: 0.08
Nodes (55): ricaricaApp(), GUIDA_BACKUP, guidaApplicaFoto(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G (+47 more)

### Community 57 - "Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, revisione-onda2d-giorni.test.js, aiuto-selezione.js +1"
Cohesion: 0.06
Nodes (35): conSoglieSelezione(), a_tempo(), app(), assert, BASE, { caricaApp }, { conSoglieSelezione }, costruisci() (+27 more)

### Community 58 - "Schermata Oggi · js/ui/oggi.js + storico.js, sessione-completata.js, storage.js +1"
Cohesion: 0.22
Nodes (17): loadHistory(), normalizeHistoryEntry(), LOCALE(), categoriaDi(), CATEGORIE, obiettiviSettimana(), renderOggi(), settimaneDiFila() (+9 more)

### Community 59 - "Timer di recupero e orologio · js/ui/allenamento/timer-recupero.js + timer-pannello.js, stato-condiviso.js, impostazioni.js"
Cohesion: 0.27
Nodes (18): recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), openRecoveryPanel(), startManualRecovery() (+10 more)

### Community 60 - "Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, bmr-minorenni-viste.test.js +7"
Cohesion: 0.03
Nodes (62): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+54 more)

### Community 61 - "Coach: ricette a slot e composizione delle sedute (componiSedute) · js/coach/programma/ricette.js + serie-ripetizioni.js, importa-progressi.js, ricerca-biomeccanica-esercizi.md +7"
Cohesion: 0.14
Nodes (32): 5.6 Cue: stato nell'app [V], Parte A (da fatti del codice), 6. Audit delle regole esistenti, bonusBiomecc(), cueEsercizio(), NOTA_REMATORE_INVERSO, cerniereConCaricoConsentite(), adattoAllaSeduta() (+24 more)

### Community 62 - "Strumento: cancello del collaudo del generatore · tools/cancello-collaudo.js"
Cohesion: 0.17
Nodes (25): autotest(), chiudi(), codiceDi(), comeSoglia(), cp, daCollaudo(), daPrima(), dateIso() (+17 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js"
Cohesion: 0.28
Nodes (12): calibrazioneChiusa(), calibrazioneNellaSeduta(), decisioneCalibrazione(), esposizioniCalibrazione(), percentualeSalto(), personaCalibrazione(), pesoDopoSalto(), recordPianoDi() (+4 more)

### Community 65 - "Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + genera.js, soglie-tempo.js, mappa-per-agenti.md +1"
Cohesion: 0.11
Nodes (61): Novità del coach v2, riconciliaNote(), verificaProgramma(), forzaPotaAlTempo(), SOGLIE_TEMPO, adattaAlTempo(), antagonistiPerMuscolo(), _cacheFattore (+53 more)

### Community 66 - "Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + soglie-selezione.js, vincoli.js, memoria-chiamata.js +2"
Cohesion: 0.12
Nodes (27): sogliaSelezione(), SOGLIE_SELEZIONE, risolviMetodo(), applicaScelteUtente(), buildProgram(), conflittiDeiGiorni(), generaProgramma(), GIORNI_PER_SEDUTE (+19 more)

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricerca-biomeccanica-esercizi.md, ricerca-specializzazione-punti-deboli.md, partenza.js +2"
Cohesion: 0.14
Nodes (25): 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5. Audit della libreria, 4. Rilevazione dei punti deboli, passoCarico() (+17 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.14
Nodes (13): 0. Stato della ricerca (leggere prima), 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti (+5 more)

### Community 70 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

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

### Community 76 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + coach-v2-decisioni.md, popolazioni.test.js"
Cohesion: 0.13
Nodes (15): A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A. Collisioni e doppioni, 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), C. Innovazioni (in ordine di valore; ★ = le cinque più importanti), F.1 Invarianti (ogni integrazione li verifica), F.3 Programmi già salvati sui telefoni (+7 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.10
Nodes (13): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+5 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Coach: specialista Forza, struttura del powerlifting (FRZ-02..05) · js/coach/specialita/forza.js + soglie-forza.js"
Cohesion: 0.18
Nodes (27): FORZA_AGGETTIVO, FORZA_ALZATE_BARRA, FORZA_CAMPI_TIPO, FORZA_NOTA_PUNTI, FORZA_NOTA_REQUISITI, FORZA_PUNTI_TESTI, FORZA_TIPI_TESTI, FORZA_TITOLO (+19 more)

### Community 82 - "Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (14): confronta(), costruisciRisultato(), creaAmbiente(), ctx, dirUscita(), gitInfo(), main(), mdReport() (+6 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 85 - "Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + elenco-soglie.js, soglie.test.js, collaudo-attrezzi.test.js +1"
Cohesion: 0.04
Nodes (56): assert, BLOCCATE, BLOCCATE_IN_PARTE, catalogoVero(), contesto(), fs, G, JSON_W1T1 (+48 more)

### Community 86 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 3) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js"
Cohesion: 0.22
Nodes (9): 5.1 Modello dei tempi (formule che il generatore può calcolare), 5.2 Costo di un esercizio da 3 serie e confronto con il modello di oggi, 5.3 Capacità: quante serie entrano, 5.4 Scala di priorità: cosa tenere quando i minuti sono pochi (e cosa aggiungere quando crescono), 5.5 Modelli per minuti e giorni (calcolati con il modello di 5.1), 5.6 Messaggi onesti da mostrare all'utente (testi proposti), 5.7 Algoritmo del risolutore dei tempi (proposta), 5. Come riempire il tempo (+1 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, termina-e-cardio.js, riepilogo.js +2"
Cohesion: 0.15
Nodes (30): GRUPPI_PRINCIPALI, minutiCardioSettimana(), renderCardioStat(), faticaMuscoli(), renderFatica(), blocchiQuattroSettimane(), calcolaBlocco(), calcolaStatistiche() (+22 more)

### Community 91 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 92 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) (parte 4) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.29
Nodes (7): 4.1 Kit a gradini ([M], Convenzione), 4.2 Cosa si allena bene e cosa no, per muscolo ([M]), 4.3 Manubri regolabili: cosa chiedere all'utente, 4.4 Sicurezza senza spotter ([M], Convenzione, coerente con l'errore di stima del RIR [R]), 4.5 Kettlebell (programmi noti, nessuno verificato), 4.6 Viaggio e hotel, 4. Kit minimi e cosa si può allenare

### Community 93 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js"
Cohesion: 0.06
Nodes (35): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+27 more)

### Community 94 - "Test: cancello delle tecniche · tests/tecniche.test.js"
Cohesion: 0.08
Nodes (27): adatta(), AL_CEDIMENTO, app(), assert, attr(), budget(), { caricaApp }, ESERCIZI (+19 more)

### Community 95 - "Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (7): hash32(), matrice(), matriceAttrezzi(), matriceForza(), mulberry32(), profilo(), scegli()

### Community 96 - "Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.20
Nodes (10): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+2 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + pagine.js, ricerca-cardio-nutrizione.md"
Cohesion: 0.23
Nodes (18): 4. Audit delle regole esistenti, 5. Regole proposte, apriPagProgressi(), chiudiPagProgressi(), htmlPesate(), PG_ICO, PG_PAGINE, pgPagina (+10 more)

### Community 100 - "Strumento: collaudo del generatore di schede (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.13
Nodes (21): analizza(), autotest(), contesto(), controindicato(), controlloOttavaEseguito(), copertoDaDichiarati(), coperturaLibreria(), costruisci() (+13 more)

### Community 101 - "Test: popolazioni e rientro dopo una pausa (P4-S) · tests/popolazioni.test.js + aiuto-atleta-piano.js"
Cohesion: 0.10
Nodes (23): conP3B(), acorn, appP4S(), assert, BLOCCATE, { caricaApp }, CODICI_NUOVI, conP4S() (+15 more)

### Community 102 - "Checklist App Store 07: rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 103 - "Checklist App Store 08: monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 104 - "Test: mesociclo · tests/mesociclo.test.js + integrazione-onda2b.test.js, sicurezza-onda0.test.js, integrazione-onda0.test.js +1"
Cohesion: 0.04
Nodes (36): conSoglieStruttura(), FILE_SOGLIE, fs, path, senzaSoglie(), assert, BASE, { caricaApp } (+28 more)

### Community 105 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.23
Nodes (15): codiceNellaVoce(), costruisciCatalogo(), espandiCodici(), fs, leggiBloccate(), leggiRegole(), leggiRepo(), leggiRitirati() (+7 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.15
Nodes (12): 2. Dove le fonti non concordano, 3.1 Cardio e passi (minuti a settimana, camminata compresa, pesi esclusi), 3.2 Proteine (in g per kg di **peso corporeo**; la massa magra da BIA solo come controllo), 3.3 Calorie e ritmo di variazione del peso, 3.4 Lettura di BIA e peso (regole di prudenza: prassi, **non** risultati di questa ricerca), 3.5 Frasi sicure già utilizzabili, 3. Numeri per il coach, 6. Domande aperte (+4 more)

### Community 109 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js, lettore-fisso.js"
Cohesion: 0.17
Nodes (27): spotifyController, spotifyReady, webDuration, ytPlayer, ytPlayerReady, avviaWebPronto(), caricaPlayerWebSalvato(), startDropAudio() (+19 more)

### Community 111 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.22
Nodes (19): apriQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+11 more)

### Community 112 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.33
Nodes (6): B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

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
Cohesion: 0.43
Nodes (7): annullaFineRecupero(), attivitaRecupero(), attivo(), Nativo, plugin(), programmaFineRecupero(), vibra()

### Community 121 - "Checklist App Store 02: tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 122 - "Test: scarico unico e protezioni (P3-B) · tests/scarichi.test.js + tecniche.test.js"
Cohesion: 0.10
Nodes (18): ALTA, assert, BASSA, conPrimaSedutaCoach(), conScaricoDiGiorniFa(), dodiciSettimane(), FB(), fs (+10 more)

### Community 123 - "Checklist App Store 06: qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 124 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.12
Nodes (19): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+11 more)

### Community 125 - "Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 126 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, metodi-momenti.js, psicologia.js +5"
Cohesion: 0.15
Nodes (32): getProfile(), CUE_SCHEMA, htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), TEST_FAI_DA_TE, fineMomento() (+24 more)

### Community 127 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 4) · docs/ricerca-donne-carichi-iniziali.md + partenza.js"
Cohesion: 0.53
Nodes (6): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, contestoCarichi(), PARAM_PARTENZA, scalaDaCorpo()

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Piano coach v2: la squadra del coach (parte 3) · docs/piano-coach-v2.md + partenza.js"
Cohesion: 0.18
Nodes (11): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+3 more)

### Community 130 - "Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js, ricerca-ipertrofia-programmazione.md"
Cohesion: 0.16
Nodes (28): 5. Regole proposte, arrotonda2(), CAUSE_CONTROLLO_OTTAVA, classeRirDi(), CLASSI_PIANO, colonnaDelBlocco(), contestoPiano(), controlloOttavaPrincipiante() (+20 more)

### Community 131 - "Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 133 - "Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js"
Cohesion: 0.10
Nodes (17): assert, BASE, { caricaApp }, ES_CLASSI, FASTIDI, GIORNI, GOAL_SET, LIVELLI (+9 more)

### Community 134 - "Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, soglie-coach.md +7"
Cohesion: 0.09
Nodes (55): B.3 Le catene: ordine fisso e scritto, E.0 Protocollo di lavoro (vale per ogni task), E.2 Onda 1 — fondamenta, E.3 Onda 2 — il generatore, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate (+47 more)

### Community 136 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+15 more)

### Community 137 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + integrazione-onda4.test.js"
Cohesion: 0.25
Nodes (6): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search, controlla()

### Community 138 - "Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js"
Cohesion: 0.36
Nodes (8): COACH_SQUADRA, codiceInSquadra(), etichettaForza(), ETICHETTE_FORZA, fasePerche(), nomeSottoCoach(), sottoCoachDi(), testoPerche()

### Community 139 - "Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +3"
Cohesion: 0.08
Nodes (50): strSquatDoppio(), limitaTecnicheIntense(), SOGLIE_TECNICHE, briefTecnicheOggi(), budgetTecniche(), CLASSI_PER_TECNICA, esercizioCaricaIlFastidio(), esercizioSenzaCedimento() (+42 more)

### Community 140 - "Test: programma azzerato, progressi e carichi salvati (P3-M) · tests/conserva-progressi.test.js"
Cohesion: 0.16
Nodes (23): assert, { caricaApp, elencoFixture, leggiFixture }, caricoDiLavoro(), chiaviApp(), conCarico(), creaBase(), DATI_PERSONALI, FUORI() (+15 more)

### Community 141 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js"
Cohesion: 0.58
Nodes (10): FAILURE_SET_SECONDS, dropActive, dropInterval, dropRemaining, apriCedimento(), chiudiCedimento(), finishDropSet(), tickCedimento() (+2 more)

### Community 142 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, 3. Sicurezza e privacy

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + carichi-golden.test.js, mesociclo.test.js"
Cohesion: 0.13
Nodes (16): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+8 more)

### Community 144 - "Test: volume per muscolo · tests/volume.test.js"
Cohesion: 0.12
Nodes (14): assert, BASE, bersagli(), brief(), { caricaApp }, FILE_NUOVI, fs, nuovaApp() (+6 more)

### Community 146 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) (parte 2) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.17
Nodes (11): 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato), 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»), 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti, 3. Regole pratiche dei coach (SE ... ALLORA ..., usabili dal generatore), 4.1 Folklore e bandiere rosse trovate, 4. Dove i coach non concordano, 7. Domande aperte (+3 more)

### Community 147 - "Coach: scarico (dose unica, fatica, protezioni) · js/coach/sicurezza/scarico.js + rampa-settimana.js, ricerca-mesocicli-periodizzazione-scarichi.md, repertorio.js +6"
Cohesion: 0.12
Nodes (37): 3.7 Scarico reattivo: segnali e soglie numeriche, B. Scarico, D. Tra i blocchi, pause, specializzazione, settimanaProgramma(), COACH_REGOLE, storicoProntezza(), azioniCoach(), bloccoCorrente() (+29 more)

### Community 148 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + carichi-golden.test.js"
Cohesion: 0.40
Nodes (5): Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), scarico(), scaricoMancato()

### Community 149 - "Test: aiuto per le prove del piano in seduta e dello scarico unico · tests/aiuto-atleta-piano.js + onda5-calendario.test.js, integrazione-onda4.test.js"
Cohesion: 0.14
Nodes (21): apriGiorno(), BASE, { caricaApp }, FILE_P3B, fs, giorniDiAllenamento(), path, R (+13 more)

### Community 150 - "Test: integrazione dell'onda 4 (INT-4) · tests/integrazione-onda4.test.js"
Cohesion: 0.09
Nodes (17): ADULTI, assert, { caricaApp }, conGravidanza(), DUE_BIA, fileJs(), fs, GRUPPI (+9 more)

### Community 151 - "Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js + compone.js, ricerca-obiettivi-e-programmi.md, bmr-minorenni.js +6"
Cohesion: 0.11
Nodes (32): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice), 0. Come si legge, 4. Combinare due obiettivi, 6. Audit delle regole esistenti, bmrNascostoPerEta(), SOGLIE_BIA, fattoreFisico() (+24 more)

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + disegni-esercizi.js, traduttore.js"
Cohesion: 0.28
Nodes (11): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), EMOJI_TESTA, aggiornaAiutoIcs(), buildIcs(), icsData() (+3 more)

### Community 154 - "Test: fastidi e modifica scritta della scheda (P4-F) · tests/fastidi.test.js"
Cohesion: 0.10
Nodes (15): app, assert, BASE, { caricaApp }, conRec04Spenta(), ETICHETTA, fs, FUORI (+7 more)

### Community 155 - "Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md + piano-coach-v2.md, PIANO.md"
Cohesion: 0.13
Nodes (12): 0. Come si legge, C.1 Criterio, C.2 Elenco (16 regole; 7 sono bloccate solo in parte), C.3 Non bloccate, anche se toccano popolazioni o salute (motivo in una riga), C.4 Numeri che escono come «Convenzione» con etichetta visibile, C. Regole bloccate dalla verifica, E. Copertura del collaudo (40 criteri falliti su 48), F.1 Le 12 modifiche che contano di più (qualità e sicurezza), in ordine (+4 more)

### Community 156 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 157 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js"
Cohesion: 0.49
Nodes (10): currentWebMode, aggiornaAvvisoDock(), attesaAvvio, controllaAvvioMusica(), dockDaAprire(), dockStato(), posizionaDock(), toggleDock() (+2 more)

### Community 158 - "Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (9): contaSerie(), creditiAttributi(), creditoGruppo(), eseguiMatrice(), gruppoDi(), pesoProfilo(), r1(), tabellaSettimana() (+1 more)

### Community 159 - "Test: generatore, residui dell'onda 1 · tests/generatore-onda1.test.js"
Cohesion: 0.27
Nodes (8): app(), assert, { caricaApp }, costruisci(), GIORNI, pulito(), puntiLombari(), test

### Community 160 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, repertorio.js, ricerca-algoritmi-carichi-e-app.md +5"
Cohesion: 0.11
Nodes (35): E.1 Onda 0 — strumenti e bug netti, E.4 Onda 3 — carichi e autoregolazione, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale, 7. Regole proposte, 4. Audit delle regole esistenti (confronto con il codice), 5. Regole proposte, 2. Dove le fonti non concordano (+27 more)

### Community 161 - "Strumento: integrazione delle onde del coach v2 (parte 2) · tools/integra-onda.js"
Cohesion: 0.32
Nodes (12): autotest(), comandoApplica(), comandoControlla(), comandoProva(), copiaDiLavoro(), elencoJson(), leggiBatch(), main() (+4 more)

### Community 162 - "Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 163 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md"
Cohesion: 0.20
Nodes (10): 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento), 3.2 Quando tenere, ripetere, scaricare o riportare indietro, 3.3 Dal RIR o RPE al carico della seduta dopo, 3.4 Range di ripetizioni per obiettivo (doppia progressione: si sale di carico quando tutte le serie arrivano alla cima), 3.5 Massimale stimato (e1RM): formula, intervallo valido, rumore, 3.6 STANDARD_FORZA: proposta (LIV-02), 3.7 Quando proporre un test di forza, 3.8 Decisione: lineare, doppia progressione o onda, per livello (+2 more)

### Community 164 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.33
Nodes (5): 2. Dove le fonti non concordano, 6. Domande aperte, 7. Limiti onesti, 8. Appendice: query pronte per un'altra sessione con il tetto alzato, Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

### Community 165 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 2) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.20
Nodes (10): 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»), 1.8 Allenare due obiettivi insieme (+2 more)

### Community 166 - "Test: Forza, carichi dei giorni medi e leggeri (FRZ-11) · tests/forza-carichi.test.js"
Cohesion: 0.12
Nodes (19): A, assert, atleta(), { caricaApp }, conForzaCarichi(), conto(), controllaOrdine(), dodiciSettimane() (+11 more)

### Community 167 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 168 - "Test: split, giorni e attrezzi (PRG-02, OBI-01, CAS-01) · tests/split.test.js + senza-coach-ia.test.js, struttura.test.js, aiuto-selezione.js +3"
Cohesion: 0.04
Nodes (34): conBilanciaV2(), FILE_SOGLIE, fs, path, nuovaApp(), nuovaApp(), assert, { caricaApp, radice } (+26 more)

### Community 169 - "Test: scelta degli esercizi per attributi (W2-T6) · tests/selezione.test.js"
Cohesion: 0.14
Nodes (17): abilita(), app, assert, ATTR, BASE, { caricaApp }, costruisci(), fs (+9 more)

### Community 170 - "Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (6): causaDichiarata(), conflittiRecupero(), consecutivi(), minutiEffettivi(), noteFalse(), unitaRiempibile()

### Community 171 - "Test: integrazione dell'onda 2c (INT-2b) · tests/integrazione-onda2c.test.js"
Cohesion: 0.25
Nodes (6): app, assert, { caricaApp }, haFlessione(), nomi(), test

### Community 172 - "Test: difetti trovati dalla revisione dell'onda 3a (INT-3b) · tests/revisione-onda3a.test.js"
Cohesion: 0.13
Nodes (13): assert, { caricaApp }, CASA20, { conBilanciaV2, inGrigliaBase }, FASI, H, nonSalgono(), PROG_V2 (+5 more)

### Community 173 - "Strumento: collaudo del generatore di schede (parte 7) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (3): bandaB6(), pavimentoDiretteB6(), volumeGruppi()

### Community 174 - "Soglie del coach · docs/soglie-coach.md + split.test.js"
Cohesion: 0.11
Nodes (17): `SOGLIE_BIA` — `js/coach/bia/soglie-bia.js` (preparatore), Soglie del coach, `SOGLIE_FORZA_CARICHI` — `js/coach/specialita/soglie-forza-carichi.js` (specialista), `SOGLIE_FORZA` — `js/coach/specialita/soglie-forza.js` (specialista), `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia), `SOGLIE_POPOLAZIONI` — `js/coach/sicurezza/soglie-popolazioni.js` (sentinella), `SOGLIE_PROGRESSIONE` — `js/coach/carichi/soglie-progressione.js` (bilancia), `SOGLIE_RAMPA` — `js/coach/volume/soglie-rampa.js` (dosatore) (+9 more)

### Community 175 - "Coach: griglia dei pesi per attrezzo (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js + progressivo.js, regole-ricerca.js, coach-v2-decisioni.md +6"
Cohesion: 0.13
Nodes (34): D. Decisioni di prodotto (prese; rispondono al cap. H del piano), 7. Regole proposte, alTettoDeiManubri(), arrotondaAttrezzo(), esercizioConManubri(), faseGrigliaETetto(), fmtPeso(), fraseGrigliaPiuVicino() (+26 more)

### Community 176 - "Coach: catalogo delle regole (generato) · js/coach/catalogo-regole.js + parametri.js, ARCHITETTURA.md"
Cohesion: 0.38
Nodes (5): Catalogo delle regole generato dalla mappa (npm run catalogo), COACH_REGOLE_PER_CODICE, regolaDescritta(), regolaAttivaCalcolo(), REGOLE_SPEGNIBILI

### Community 177 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea (parte 2) · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.29
Nodes (7): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti

### Community 178 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) (parte 3) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.29
Nodes (7): 5.1 Scala degli stalli (dal più economico al più costoso), 5.2 Rotazione degli esercizi, 5.3 Struttura del mesociclo (cosa fanno le fonti), 5.4 Prime 4 settimane del principiante (modello di lavoro), 5.5 Dose minima: matrice minuti × giorni (derivata dal modello di tempo dell'app, non da una fonte), 5.6 Casa: manubri e corpo libero, 5. Come cambiare le schede nel tempo

### Community 179 - "Test: distribuzione dei muscoli piccoli e flessione del ginocchio (P3-G) · tests/distribuzione.test.js"
Cohesion: 0.18
Nodes (10): app, assert, BASE, { caricaApp }, costruisci(), CREDITI, fraz(), griglia() (+2 more)

### Community 180 - "Coach: alternative e applicazione del programma · js/coach/programma/alternative.js"
Cohesion: 0.47
Nodes (9): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+1 more)

### Community 181 - "Coach: specialista Forza, il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + soglie-forza-carichi.js"
Cohesion: 0.29
Nodes (12): FORZA_FRASI_GIORNO, FORZA_RANGO_ONDA, forzaBaseReps(), forzaCaricoGiorno(), forzaCatenaFinoA(), forzaEsposizioni(), forzaPesoEsposizione(), forzaRango() (+4 more)

### Community 182 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) (parte 3) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.29
Nodes (7): 5.1 «Correre» (5K, 10K): supporto, non allenatore di corsa, 5.2 Abilità: «prima trazione», «10 piegamenti», «squat completo», «toccarmi le punte», «plank 60 s», 5.3 Sport (squadra e combattimento): «supporto alla stagione», 5.4 «Schiena, collo e spalle» (postura e lavoro d'ufficio), 5.5 Mantenimento (fase dopo il calo o dopo un ciclo), 5.6 Altri obiettivi ovvi (lista, senza programma qui), 5. Obiettivi che l'app non ha ancora

### Community 183 - "Coach: soglie della divisione e dei giorni (split) · js/coach/programma/soglie-split.js + onboarding.js, ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.40
Nodes (4): 7. Audit delle regole esistenti, SOGLIE_SPLIT, ricettaPunti(), SLOT_PRIORITA

### Community 184 - "Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js"
Cohesion: 0.40
Nodes (5): chiaveSpec(), firme(), mulberry32(), norm(), ricampiona()

### Community 185 - "Test: onda 5, il peso sale con il RIR fisso (ALG-19) · tests/onda5-ripresa-prudenti.test.js"
Cohesion: 0.24
Nodes (8): alTetto(), assert, coppie(), H, misura(), PALESTRA, STORIE, test

### Community 186 - "Test: il piano si esegue in seduta (MES-03) · tests/piano-in-seduta.test.js"
Cohesion: 0.22
Nodes (9): assert, COMBINAZIONI, conStoriaDiPrima(), FB(), H, LIVELLI, OBIETTIVI, test (+1 more)

### Community 187 - "Coach: fastidi e modifica scritta della scheda (REC-04, SAF-02) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js, attributi-esercizi.js"
Cohesion: 0.34
Nodes (12): applicaNoteFastidi(), datiNotaFastidio(), eNotaDelFastidio(), esclusoDalFastidio(), FASTIDI_ZONE, fastidiAttivi(), nomiDelProgramma(), notaCautelaFastidio() (+4 more)

### Community 188 - "Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js"
Cohesion: 0.36
Nodes (8): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), openAudioDB()

### Community 189 - "Test: rifiniture della revisione dell'onda 2e/2f (INT-2g) · tests/revisione-onda2g.test.js"
Cohesion: 0.22
Nodes (7): a, assert, { caricaApp }, firma(), PL, se(), test

### Community 190 - "Mappa per agenti · docs/mappa-per-agenti.md"
Cohesion: 0.50
Nodes (3): Come cercare (in quest'ordine), Mappa per agenti, Stile

## Knowledge Gaps
- **1297 isolated node(s):** `CREDITI`, `ATTR`, `3.10 Rotazione degli esercizi`, `3.11 2-3 sedute a settimana contro 5-6`, `3.1 Principi` (+1292 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1517 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderOggi()` connect `Schermata Oggi · js/ui/oggi.js + storico.js, sessione-completata.js, storage.js +1` to `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, riepilogo.js, ricerca-psicologia-aderenza.md +6`, `Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, repertorio.js, ricerca-algoritmi-carichi-e-app.md +5`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + guida-interattiva.js, stampa-scheda.js, ripristino-guida.js +4`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, termina-e-cardio.js, riepilogo.js +2`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, stato.js, ricerca-metodi-coach-pratici.md +1`, `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + costanti.js, seduta.js, annulla.js +12`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + completamenti.js, schede-tecniche.js, volume.js +20`, `Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, piano-onda5.md, regole-ricerca.js +5`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + repertorio.js, lavoro-cronometro.js, seduta-libera.js +9`, `Esportazione verso calendari (.ics) · js/ui/esporta-ics.js + disegni-esercizi.js, traduttore.js`, `Coach: prontezza prima della seduta · js/coach/prontezza.js + dolore-mattina.js, fasi.js, questionario-decisioni.js +4`, `Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, oggi.js`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 197 inferred relationships involving `Novità del coach v2` (e.g. with `arrotondaAttrezzo()` and `faseGrigliaETetto()`) actually correct?**
  _`Novità del coach v2` has 197 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CREDITI`, `ATTR`, `3.10 Rotazione degli esercizi` to the rest of the system?**
  _1297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8` be split into smaller, more focused modules?**
  _Cohesion score 0.07205452775073028 - nodes in this community are weakly interconnected._
- **Why does `switchTab()` connect `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + costanti.js, seduta.js, annulla.js +12` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + storage.js, navigazione.js, questionario-decisioni.js +11`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js`, `Schermata Oggi · js/ui/oggi.js + storico.js, sessione-completata.js, storage.js +1`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, coach-mappa-regole.md, ricerca-struttura-e-intensita.md +6` be split into smaller, more focused modules?**
  _Cohesion score 0.07617051013277429 - nodes in this community are weakly interconnected._
- **Why does `renderPiano()` connect `Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + pannello.js, suggeritore.js, giorno.js +9` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, utility.js +8`, `Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + genera.js, soglie-tempo.js, mappa-per-agenti.md +1`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, storage.js, schede-pronte.js +1`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, dettagli-esercizi.js, seduta.js`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + completamenti.js, schede-tecniche.js, volume.js +20`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + repertorio.js, lavoro-cronometro.js, seduta-libera.js +9`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js`, `Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js, scheda-quattro-sezioni.js, soglie-progressione.js +2`, `Coach: ricette a slot e composizione delle sedute (componiSedute) · js/coach/programma/ricette.js + serie-ripetizioni.js, importa-progressi.js, ricerca-biomeccanica-esercizi.md +7`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._