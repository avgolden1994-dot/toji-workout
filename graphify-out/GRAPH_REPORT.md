# Graph Report - toji-workout  (2026-10-10)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 4094 nodes · 11305 edges · 196 communities (187 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 896 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `647bb6f2`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +5
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + piano-onda5.md, attrezzi.js, progressivo.js +3
- Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, onboarding-risultato.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, stampa-scheda.js, traduttore.js +11
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +4
- Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js
- Importazione CSV di altre app · js/ui/importa-csv.js + importa-progressi.js
- BIA nelle opzioni · js/coach/bia/opzioni.js + lettore.js, archivio.js, onboarding.js
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, navigazione.js, storage.js +1
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, compone.js, psicologia.js +3
- Coach: scarico (dose unica, fatica, protezioni) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, repertorio.js, archivio.js +5
- Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js + soglie-partenza.js
- Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js
- Manifest della PWA · manifest.json
- Coach: schemi di movimento · js/coach/programma/schemi.js + parametri.js, coach-v2-decisioni.md, intensita.js +1
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, lavoro-cronometro.js +9
- Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js
- Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-riscaldamento-mobilita-prevenzione.md, ricerca-fasce-di-eta.md
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js
- Test: onda 5, over 65 ed esercizi da evitare (ETA-19) · tests/onda5-over65-esercizi.test.js + forza-attivazione.test.js, forza-modalita.test.js, attrezzi-onboarding.test.js +6
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js
- Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js, traduttore.js
- Strumento: aggiornamento del grafo · tools/grafo.js
- Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + soglie-selezione.js
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + soglie-progressione.js, schede-esercizio.js
- Coach: mi sento male in seduta · js/coach/mi-sento-male.js + seduta.js, annulla.js, index.html +12
- Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js
- Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md
- Test: modalità Forza, struttura del powerlifting (FRZ-02, FRZ-03) · tests/forza-struttura.test.js + attrezzi-dichiarati.test.js
- Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md
- Strumento: elenco delle soglie del coach · tools/elenco-soglie.js
- Golden di buildProgram (piano coach v2, onda 1, W1-T4: «generatore a stadi e brief») · tests/genera-golden.test.js + aiuto-genera.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js
- Calendario del mese · js/ui/calendario/mese.js + menu-settimana.js, repertorio.js, scambio.js +5
- Coach: popolazioni e rientro dopo una pausa (over 65, gravidanza, rampa) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js, alternative.js +2
- Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, volume.js, serie-ripetizioni.js +15
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- Test: guardie del corpo (nutrizione e composizione corporea) · tests/guardie-corpo.test.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + audio-silenzioso.js, utility.js, cedimento.js +2
- Test: tempo della seduta · tests/tempo.test.js
- Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, riposo-settimane.js +4
- Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, utility.js, traduttore.js +4
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + hip-hinge-ripiego.test.js, ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js
- Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, revisione-onda2d-giorni.test.js, aiuto-selezione.js +1
- Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + backup.js, storico.js, mappa-per-agenti.md +7
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, bmr-minorenni-viste.test.js +8
- Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js
- Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js
- Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, forza.js
- Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + volume.js, vincoli.js, memoria-chiamata.js +4
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + motore.js, ricerca-biomeccanica-esercizi.md, partenza.js +5
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Test: struttura e avvio · tests/struttura.test.js + indice.js, package.json, integrazione-onda4.test.js
- Test: attributi degli esercizi (classe, schema, crediti) · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, regole-nuove.js, ricerca-obiettivi-e-programmi.md +7
- Checklist App Store 01: decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +7
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Coach: specialista Forza, struttura del powerlifting (FRZ-02..05) · js/coach/specialita/forza.js + soglie-forza.js, attrezzi.js, questionario-decisioni.js
- Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + questionario-decisioni.js, taratura.js, prontezza.js +2
- Collegamenti tra i pacchetti della sotto-onda 3a (INT-3a: P3-M, P3-A, P3-B, P3-G fusi), ognuno con la prova scritta PRIMA della correzione (rossa sul codice dei quattro · tests/integrazione-3a.test.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, repertorio.js +2
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- Generatore a stadi e brief (piano coach v2, onda 1, W1-T4): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/genera-stadi.test.js + aiuto-genera.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js
- Test: cancello delle tecniche · tests/tecniche.test.js
- Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js
- Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, ricerca-psicologia-aderenza.md +4
- Strumento: collaudo del generatore di schede (parte 4) · tools/collaudo-generatore.js
- Test: popolazioni e rientro dopo una pausa (P4-S) · tests/popolazioni.test.js + aiuto-atleta-piano.js
- Checklist App Store 07: rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- Checklist App Store 08: monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Test: mesociclo · tests/mesociclo.test.js + integrazione-onda2b.test.js, sicurezza-onda0.test.js, integrazione-onda0.test.js +1
- Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Coach: carico di partenza (parte 2) · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, calibrazione.js
- Coach: prontezza prima della seduta · js/coach/prontezza.js
- Progressi: foto · js/ui/progressi/foto.js + pagine.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- Checklist App Store 02: tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Test: scarico unico e protezioni (P3-B) · tests/scarichi.test.js + tecniche.test.js
- Checklist App Store 06: qualità e test · docs/checklist-appstore/06-qualita-test.md
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + metodi-momenti.js, biomeccanica.js, psicologia.js +5
- Carico progressivo · js/coach/carichi/progressivo.js + ricerca-algoritmi-carichi-e-app.md, dolore-mattina.js, alternative.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js
- Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js
- Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +5
- README del progetto · README.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + conserva-progressi.test.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md
- Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js, ARCHITETTURA.md, piano-coach-v2.md +1
- Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, genera.js +5
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js
- Test: volume per muscolo · tests/volume.test.js
- Coach: soglie della regia · js/coach/regia/soglie-regia.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Fondamenta: funzioni di utilità (testo sicuro, date, emoji) · js/core/utility.js + 04-sicurezza-privacy.md, piano-lancio-appstore.md
- Test: aiuto per le prove del piano in seduta e dello scarico unico · tests/aiuto-atleta-piano.js + onda5-calendario.test.js, integrazione-onda4.test.js
- Test: integrazione dell'onda 4 (INT-4) · tests/integrazione-onda4.test.js
- Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js + compone.js, bmr-minorenni.js, soglie-bia.js +3
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Test: fastidi e modifica scritta della scheda (P4-F) · tests/fastidi.test.js
- Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md + piano-coach-v2.md, PIANO.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 3) · docs/ricerca-biomeccanica-esercizi.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + repertorio.js, e1rm.js, ricerca-algoritmi-carichi-e-app.md +4
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md
- Test: integrazione dell'onda 2c (INT-2b) · tests/integrazione-onda2c.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- Test: Forza, carichi dei giorni medi e leggeri (FRZ-11) · tests/forza-carichi.test.js
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + soglie.test.js, collaudo-attrezzi.test.js, collaudo-forza.test.js +4
- Test: scelta degli esercizi per attributi (W2-T6) · tests/selezione.test.js + split.test.js
- Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js
- Ricerca su struttura e intensità (documento) · docs/ricerca-struttura-e-intensita.md + coach-mappa-regole.md
- Test: difetti trovati dalla revisione dell'onda 3a (INT-3b) · tests/revisione-onda3a.test.js
- Strumento: collaudo del generatore di schede (parte 7) · tools/collaudo-generatore.js
- Soglie del coach · docs/soglie-coach.md + split.test.js
- Coach: griglia dei pesi per attrezzo (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) (parte 2) · docs/ricerca-fasce-di-eta.md
- Schermata Oggi · js/ui/oggi.js
- Test: distribuzione dei muscoli piccoli e flessione del ginocchio (P3-G) · tests/distribuzione.test.js
- Coach: alternative e applicazione del programma · js/coach/programma/alternative.js
- Coach: specialista Forza, il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + CLAUDE.md, fasi.js, coach-v2-decisioni.md +5
- Coach: soglie della divisione e dei giorni (split) · js/coach/programma/soglie-split.js + onboarding.js, ricerca-specializzazione-punti-deboli.md
- Rampa del volume in seduta: le serie seguono il piano della settimana (MES-03) · js/coach/volume/rampa-settimana.js + soglie-rampa.js
- Test: onda 5, il peso sale con il RIR fisso (ALG-19) · tests/onda5-ripresa-prudenti.test.js
- Test: il piano si esegue in seduta (MES-03) · tests/piano-in-seduta.test.js
- Coach: fastidi e modifica scritta della scheda (REC-04, SAF-02) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js
- Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js
- Test: rifiniture della revisione dell'onda 2e/2f (INT-2g) · tests/revisione-onda2g.test.js
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + disegni-esercizi.js, scheda-unica.js, schede-esercizio.js +2
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md
- Mappa delle regole del coach (documento) (parte 5) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Strumento: aggiornamento del grafo (parte 2) · tools/grafo.js

## God Nodes (most connected - your core abstractions)
1. `Novità del coach v2` - 198 edges
2. `loadData()` - 111 edges
3. `renderAllenamento()` - 95 edges
4. `caricaApp()` - 94 edges
5. `findExercise()` - 90 edges
6. `regolaAttiva()` - 87 edges
7. `renderPiano()` - 75 edges
8. `getProfile()` - 75 edges
9. `senzaEmoji()` - 74 edges
10. `currentDay` - 74 edges

## Surprising Connections (you probably didn't know these)
- `D. Decisioni di prodotto (prese; rispondono al cap. H del piano)` --references--> `scarichi()`  [INFERRED]
  docs/coach-v2-decisioni.md → tests/mesociclo.test.js
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `4. Blocchi di mobilità` --references--> `schemaDi()`  [INFERRED]
  docs/ricerca-riscaldamento-mobilita-prevenzione.md → js/coach/programma/schemi.js
- `6. Mappa muscolare (già fatta)` --references--> `renderBodyMap()`  [INFERRED]
  docs/metodo-illustrazioni-esercizi.md → js/ui/figura-anatomica.js
- `D.1 Ambito` --references--> `contestoCarichi()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (196 total, 9 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +5"
Cohesion: 0.09
Nodes (51): renderCoach(), suggestNextExercises(), MUSCLE_GROUPS, azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati(), sezEsAperte, toggleSezioneEsercizi() (+43 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + piano-onda5.md, attrezzi.js, progressivo.js +3"
Cohesion: 0.12
Nodes (42): D. Decisioni di prodotto (prese; rispondono al cap. H del piano), Non si fa (motivo), Ordine e chiusura, Piano dell'onda 5 (coach v2) — snello, Punti scelti (in ordine di valore; chi li fa; file di proprietà; accettazione), Stato (aggiornato a ogni passo), 7. Regole proposte, arrotondaAttrezzo() (+34 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + psicologia.js, onboarding-risultato.js"
Cohesion: 0.10
Nodes (58): onbMomento(), onbPsico(), renderPsicoStep(), biaField(), bindBiaInputs(), chip(), descSonnoBene(), etaPerProgramma() (+50 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, stampa-scheda.js, traduttore.js +11"
Cohesion: 0.16
Nodes (36): applyGeneratedProgram(), sostituto(), riduciFrequenza(), azioneCoach(), cambiaSerieNelPiano(), conAnnulla(), prefsCoach(), rispostaAderenza() (+28 more)

### Community 4 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js"
Cohesion: 0.26
Nodes (20): attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcPaste(), mcRepeat() (+12 more)

### Community 5 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +4"
Cohesion: 0.12
Nodes (36): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, TEMI (+28 more)

### Community 6 - "Strumento: collaudo del generatore di schede · tools/collaudo-generatore.js"
Cohesion: 0.03
Nodes (56): ABBR, ATT_DICHIARABILI, ATT_EXTRA_PALESTRA, ATTREZZI_OK, ATTREZZI_QUASI, cacheCrediti, cacheEs, cacheUsabili (+48 more)

### Community 7 - "Importazione CSV di altre app · js/ui/importa-csv.js + importa-progressi.js"
Cohesion: 0.21
Nodes (16): ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV(), secondiCSV() (+8 more)

### Community 8 - "BIA nelle opzioni · js/coach/bia/opzioni.js + lettore.js, archivio.js, onboarding.js"
Cohesion: 0.20
Nodes (18): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), closeBiaSheet(), eliminaBia() (+10 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (29): acorn, aggiungiUso(), alCaricamento, analizzaUsi(), appFiles, ast, datiJson, defs (+21 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.09
Nodes (23): B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati, B17. Scarico reattivo (+15 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, navigazione.js, storage.js +1"
Cohesion: 0.16
Nodes (32): daysContainer, renderDayBar(), selectDay(), getDayTitle(), loadTitles(), saveTitles(), titlesKey(), WORKOUT_TEMPLATES (+24 more)

### Community 12 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, compone.js, psicologia.js +3"
Cohesion: 0.16
Nodes (24): htmlIspirazioni(), applicaMomento(), chiediMomento(), confermaMomento(), FB(), htmlMomento(), METODI, metodoDa() (+16 more)

### Community 13 - "Coach: scarico (dose unica, fatica, protezioni) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, repertorio.js, archivio.js +5"
Cohesion: 0.14
Nodes (34): E.4 Onda 3 — carichi e autoregolazione, 3.7 Scarico reattivo: segnali e soglie numeriche, B. Scarico, D. Tra i blocchi, pause, specializzazione, settimanaProgramma(), segnaEsercizioTaratura(), getProgramma(), progKey() (+26 more)

### Community 14 - "Coach: calibrazione rapida dei carichi stimati · js/coach/carichi/calibrazione.js + soglie-partenza.js"
Cohesion: 0.24
Nodes (13): calibrazioneChiusa(), calibrazioneNellaSeduta(), decisioneCalibrazione(), esposizioniCalibrazione(), faseCalibrazione(), percentualeSalto(), pesoDopoSalto(), recordPianoDi() (+5 more)

### Community 15 - "Test: golden dei carichi (le quattro catene del coach) · tests/carichi-golden.test.js"
Cohesion: 0.08
Nodes (32): acorn, AGGIUSTI, assert, BIA, { caricaApp, VETTORI_CARICHI }, chiaveSpec(), corto(), costruisciStato() (+24 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js"
Cohesion: 0.26
Nodes (16): aggiornaEsigenza(), esigenzaCoach(), esigenzaEsclusa(), esigenzaInDeficit(), htmlEsigenza(), rpeBersaglioSeduta(), tettoEsigenza(), bilancioPrimeSedute() (+8 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Coach: schemi di movimento · js/coach/programma/schemi.js + parametri.js, coach-v2-decisioni.md, intensita.js +1"
Cohesion: 0.12
Nodes (20): E.1 Regressioni ammesse del cancello (meccanismo e voci), E. Copertura del collaudo (40 criteri falliti su 48), primaVoltaUnaSerieInMeno(), regolaAttiva(), regolaAttivaCalcolo(), REGOLE_SPEGNIBILI, GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI (+12 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, lavoro-cronometro.js +9"
Cohesion: 0.10
Nodes (68): 5.1 Funzioni molto apprezzate, currentDay, armedSet, loadData(), normalizeExerciseRecord(), saveData(), seedDefaultsIfNeeded(), trEs() (+60 more)

### Community 21 - "Test: correzioni della revisione dell'onda 1 · tests/revisione-onda1.test.js"
Cohesion: 0.14
Nodes (16): app, assert, BASE, { caricaApp }, { conSoglieSelezione }, costruisci(), FASI, griglia() (+8 more)

### Community 22 - "Coach: biomeccanica · js/coach/biomeccanica.js + ricerca-biomeccanica-esercizi.md, ricerca-riscaldamento-mobilita-prevenzione.md, ricerca-fasce-di-eta.md"
Cohesion: 0.17
Nodes (14): 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 5.6 Cue: stato nell'app [V], 7. Regole proposte, Parte A (da fatti del codice), Parte B (bloccate: dipendono da [NV]), 8. Regole proposte, 6. Audit delle regole esistenti, 7. Regole proposte (+6 more)

### Community 23 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js"
Cohesion: 0.45
Nodes (12): accosciato(), arto(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW, piegato(), sdraiato() (+4 more)

### Community 24 - "Test: onda 5, over 65 ed esercizi da evitare (ETA-19) · tests/onda5-over65-esercizi.test.js + forza-attivazione.test.js, forza-modalita.test.js, attrezzi-onboarding.test.js +6"
Cohesion: 0.03
Nodes (44): assert, { caricaApp }, chips(), test, assert, { caricaApp }, conOnb(), crea() (+36 more)

### Community 25 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js"
Cohesion: 0.21
Nodes (26): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, formatMMSS(), aggiornaRiassuntoMusica(), clearCedimentoAudio(), closeMusicSheet() (+18 more)

### Community 26 - "Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, schede-tecniche.js, traduttore.js"
Cohesion: 0.21
Nodes (14): GLOSSARIO, openExerciseInfo(), I18N, exInfoNome, exVuoto(), paneGrafico(), paneRecord(), paneStorico() (+6 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (24): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+16 more)

### Community 28 - "Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + soglie-selezione.js"
Cohesion: 0.23
Nodes (15): completaSettimana(), copriCuffia(), CUFFIA_ESERCIZI, eCernieraFemorali(), eMultiDiGambe(), FLESSIONI_GINOCCHIO, NOTA_FEMORALI_SENZA_LEG_CURL, NOTA_FEMORALI_SERVE_FLESSIONE (+7 more)

### Community 29 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.05
Nodes (39): 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato), 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»), 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti, 2.10 Candito 6 settimane, 2.11 Sheiko, 2.12 RTS: Reactive Training Systems (Mike Tuchscherer), 2.13 Barbell Medicine (+31 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.08
Nodes (23): description, devDependencies, acorn, playwright-core, name, private, scripts, cancello (+15 more)

### Community 31 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 32 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + soglie-progressione.js, schede-esercizio.js"
Cohesion: 0.15
Nodes (13): 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere), 3.1 Ingressi (tutti già disponibili nel codice), 3.2 Classi di esercizio, 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W), 3.4 Riduzioni («quando saltare»), 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra), 3.6 Arrotondamento e tetto di tempo, 3.7 Riscaldamento generale (minuti) (+5 more)

### Community 33 - "Coach: mi sento male in seduta · js/coach/mi-sento-male.js + seduta.js, annulla.js, index.html +12"
Cohesion: 0.18
Nodes (19): restartOnboarding(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), switchProtocol(), chiudiQuestionario(), activateMode() (+11 more)

### Community 34 - "Strumento: integrazione delle onde del coach v2 · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js"
Cohesion: 0.24
Nodes (17): applicaPartenze(), classePartenza(), FACILITATE_PAR09, fattorePartenza(), fonteBase(), FRASI_FONTE_STIMA, kStoricoPer(), MOTIVI_STIMA (+9 more)

### Community 36 - "Test: partenza bassa per le donne e calibrazione rapida · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js"
Cohesion: 0.04
Nodes (52): ancora(), ANCORE_DONNE_KG65, ANCORE_VERE_DONNE, arrotonda05(), atletaVirtuale(), CONTROLLO, FILE_BILANCIA_V2, fra() (+44 more)

### Community 37 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.18
Nodes (10): 2. Dove le fonti non concordano, 4. Confronto con le app, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rilanciare con il tetto di ricerca alzato) (+2 more)

### Community 38 - "Test: modalità Forza, struttura del powerlifting (FRZ-02, FRZ-03) · tests/forza-struttura.test.js + attrezzi-dichiarati.test.js"
Cohesion: 0.08
Nodes (28): assert, { caricaApp }, PROFILI, test, TUTTI_CASA, app(), assert, { caricaApp } (+20 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati di bodybuilding · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.06
Nodes (34): 10. Limiti onesti, 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali (+26 more)

### Community 40 - "Strumento: elenco delle soglie del coach · tools/elenco-soglie.js"
Cohesion: 0.20
Nodes (14): caricaSoglie(), cella(), FORZE_AMMESSE, fs, generaElenco(), main(), path, R (+6 more)

### Community 41 - "Golden di buildProgram (piano coach v2, onda 1, W1-T4: «generatore a stadi e brief») · tests/genera-golden.test.js + aiuto-genera.js"
Cohesion: 0.17
Nodes (16): costruisciConProfilo(), preparaConProfilo(), assert, { caricaApp, ORA, profiliGolden, profiliMetodi, profiliConProfilo, preparaConProfilo, costruisciConProfilo }, costruisciGolden(), crypto, esito(), FILE (+8 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.20
Nodes (9): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 2. Dove le fonti non concordano, 4. Classi di equivalenza e sostituti, 6. Cue consigliati, 8.1 Decisioni da prendere (non scientifiche), 8. Domande aperte, 9. Limiti onesti, Appendice A: Query pronte (da ripetere in un'altra sessione con il tetto di ricerche alzato) (+1 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js"
Cohesion: 0.20
Nodes (24): avviaTempoSeduta(), openWorkoutDay(), renderWorkoutDayPicker(), iniziaOggi(), annullaSpeciale(), apriSedutaLibera(), avviaSpeciale(), eserciziDaNomi() (+16 more)

### Community 44 - "Calendario del mese · js/ui/calendario/mese.js + menu-settimana.js, repertorio.js, scambio.js +5"
Cohesion: 0.19
Nodes (35): aderenzaDueSettimane(), htmlSedutaSaltata(), prossimoGiornoLibero(), sceltaSaltata(), sedutaSaltata(), ultimoGiornoAllenamento(), fattoQuestaSettimana(), mcFillMonth() (+27 more)

### Community 45 - "Coach: popolazioni e rientro dopo una pausa (over 65, gravidanza, rampa) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js, alternative.js +2"
Cohesion: 0.17
Nodes (30): fissaFasiDelloStorico(), giorniDallUltimaSeduta(), sedutePassate(), settimanaCalendarioOProgramma(), fasePopolazioni(), FRASI_POPOLAZIONI, giorniContatiPausa(), giorniDoppiAttivi() (+22 more)

### Community 46 - "Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js"
Cohesion: 0.47
Nodes (11): aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio(), renderCardio(), renderCardioStat() (+3 more)

### Community 47 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, volume.js, serie-ripetizioni.js +15"
Cohesion: 0.10
Nodes (71): 6. Audit delle regole esistenti, TOCCHI, coppiePerMuscolo(), ordinaSedute(), rinforzaFemorali(), cerniereConCaricoConsentite(), consentito(), adattoAllaSeduta() (+63 more)

### Community 48 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.12
Nodes (16): 0. In breve, 2. Dove le fonti non concordano, 3.1 Metodo, parametri, assunzioni, 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg), 3.4 Peso corporeo e massa magra, 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante), 3.6 Fattore prudente e sblocco rapido (DON-04), 3.7 Pavimento della barra e alternative (+8 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.12
Nodes (15): 10. Limiti onesti, 2. Dove le fonti non concordano, 3.1 Dose, 3.2 Riposo, tempo, tecniche, esercizi, riscaldamento, scarico, 3.3 Equilibrio e potenza, test, soglie di rinvio, 3. Parametri per fascia d'età, 4. Test funzionali e norme, 5. Minori: regole speciali (+7 more)

### Community 50 - "Test: guardie del corpo (nutrizione e composizione corporea) · tests/guardie-corpo.test.js"
Cohesion: 0.09
Nodes (23): ADULTI, assert, BIA, campiDiCibo(), { caricaApp }, codiceApp(), DUE_BIA, FILE_SOGLIE (+15 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + audio-silenzioso.js, utility.js, cedimento.js +2"
Cohesion: 0.18
Nodes (20): mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale(), lampeggia(), playBeep(), playEnd(), playTick() (+12 more)

### Community 52 - "Test: tempo della seduta · tests/tempo.test.js"
Cohesion: 0.18
Nodes (16): app(), assert, BASE, { caricaApp }, costruisci(), dur(), E(), fs (+8 more)

### Community 53 - "Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, riposo-settimane.js +4"
Cohesion: 0.14
Nodes (37): controlloSchemi(), seduteAllaSettimana(), escapeHtml(), planDayClick(), renderPiano(), renderWeekOverview(), aggiornaIngressoAgente(), aggiungiPerGruppo() (+29 more)

### Community 54 - "Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, utility.js, traduttore.js +4"
Cohesion: 0.25
Nodes (13): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), caricoProssimo(), numeroLingua() (+5 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + hip-hinge-ripiego.test.js, ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.05
Nodes (37): 8. Regole proposte, a, assert, BASE, { caricaApp }, G, test, alt() (+29 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js"
Cohesion: 0.18
Nodes (26): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR (+18 more)

### Community 57 - "Test: generatore, bug netti (onda 0) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, revisione-onda2d-giorni.test.js, aiuto-selezione.js +1"
Cohesion: 0.06
Nodes (38): conSoglieSelezione(), FILE_SOGLIE, fs, path, a_tempo(), app(), assert, BASE (+30 more)

### Community 58 - "Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + backup.js, storico.js, mappa-per-agenti.md +7"
Cohesion: 0.08
Nodes (49): Come cercare (in quest'ordine), Flussi principali, Mappa per agenti, Schermate (tab) → funzione d'ingresso → file, Stile, applicaDecisioni(), inviaQuestionario(), applicaFotografia() (+41 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Test: aiuto per le prove in node (app vera in vm, senza browser) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, bmr-minorenni-viste.test.js +8"
Cohesion: 0.03
Nodes (70): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+62 more)

### Community 61 - "Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js"
Cohesion: 0.15
Nodes (9): assert, { caricaApp, radice }, COMMENTO, filesDi(), fs, ORFANE, path, SEMINA_ORFANE (+1 more)

### Community 62 - "Ricerca: allenarsi a casa con poco materiale e poco tempo (con il cancello di collaudo) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js"
Cohesion: 0.05
Nodes (60): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+52 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Test: aiuto per le prove del generatore (profili con seme fisso) · tests/aiuto-genera.js"
Cohesion: 0.22
Nodes (14): ATTREZZI_PALESTRA, BIA, conScelte(), GRUPPI, idMetodi(), MOMENTI_PROVA, mulberry32(), nomiLibreria() (+6 more)

### Community 65 - "Coach: tempo della seduta (minuti, pause, capacità) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, forza.js"
Cohesion: 0.11
Nodes (58): Novità del coach v2, forzaPotaAlTempo(), SOGLIE_TEMPO, adattaAlTempo(), antagonistiPerMuscolo(), _cacheFattore, classePausa(), coppiaValida() (+50 more)

### Community 66 - "Coach: generatore a stadi (buildProgram, giorni, verifica) · js/coach/regia/genera.js + volume.js, vincoli.js, memoria-chiamata.js +4"
Cohesion: 0.11
Nodes (34): Nomi in posti inattesi, risolviMetodo(), applicaScelteUtente(), buildProgram(), conflittiDeiGiorni(), generaProgramma(), GIORNI_PER_SEDUTE, giorniDiFilaCiclici() (+26 more)

### Community 67 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + motore.js, ricerca-biomeccanica-esercizi.md, partenza.js +5"
Cohesion: 0.08
Nodes (48): 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5. Audit della libreria, stabile(), passoCarico() (+40 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.08
Nodes (23): 0. Stato della ricerca (leggere prima), 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti (+15 more)

### Community 70 - "Test: struttura e avvio · tests/struttura.test.js + indice.js, package.json, integrazione-onda4.test.js"
Cohesion: 0.09
Nodes (20): acorn, stringheDi(), acorn, assert, fs, html, path, R (+12 more)

### Community 71 - "Test: attributi degli esercizi (classe, schema, crediti) · tests/attributi.test.js"
Cohesion: 0.08
Nodes (24): app, assert, ATTR, { caricaApp }, CTRL, DETT, DIFFERENZE, differenzeVere() (+16 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + regole-ricerca.js, regole-nuove.js, ricerca-obiettivi-e-programmi.md +7"
Cohesion: 0.08
Nodes (42): A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti, 3.4 RIR per settimana e per tipo di esercizio (+34 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.13
Nodes (14): 1. Riepilogo numeri, 2. Tabella completa, 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno), 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file (+6 more)

### Community 76 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md"
Cohesion: 0.12
Nodes (16): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach (+8 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.14
Nodes (10): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-09 stacchi da terra al massimo 3 serie, ABB-06 superserie solo tra antagonisti, mai con un pesante (+2 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Coach: specialista Forza, struttura del powerlifting (FRZ-02..05) · js/coach/specialita/forza.js + soglie-forza.js, attrezzi.js, questionario-decisioni.js"
Cohesion: 0.17
Nodes (29): voceAttrezzo(), nomeInLibreria(), FORZA_AGGETTIVO, FORZA_ALZATE_BARRA, FORZA_CAMPI_TIPO, FORZA_NOTA_PUNTI, FORZA_NOTA_REQUISITI, FORZA_PUNTI_TESTI (+21 more)

### Community 82 - "Strumento: collaudo del generatore di schede (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (14): confronta(), costruisciRisultato(), creaAmbiente(), ctx, dirUscita(), gitInfo(), main(), mdReport() (+6 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js"
Cohesion: 0.16
Nodes (22): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), guidaAttiva(), guidaAvanti(), guidaConsente() (+14 more)

### Community 85 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.23
Nodes (15): codiceNellaVoce(), costruisciCatalogo(), espandiCodici(), fs, leggiBloccate(), leggiRegole(), leggiRepo(), leggiRitirati() (+7 more)

### Community 86 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 88 - "Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + questionario-decisioni.js, taratura.js, prontezza.js +2"
Cohesion: 0.35
Nodes (11): apprendiTaraturaRir(), consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), prontezzaDiOggi(), AGG_KEY(), aggiustiCoach() (+3 more)

### Community 89 - "Collegamenti tra i pacchetti della sotto-onda 3a (INT-3a: P3-M, P3-A, P3-B, P3-G fusi), ognuno con la prova scritta PRIMA della correzione (rossa sul codice dei quattro · tests/integrazione-3a.test.js"
Cohesion: 0.18
Nodes (8): assert, { caricaApp }, conPianoDelGiorno(), FB(), H, PROFILI_OGGI, test, vaiConStoria()

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, repertorio.js +2"
Cohesion: 0.14
Nodes (30): livelloStimato(), annoRiassunto(), faticaMuscoli(), renderAnno(), seduteEsercizio(), blocchiQuattroSettimane(), calcolaBlocco(), calcolaStatistiche() (+22 more)

### Community 91 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 92 - "Generatore a stadi e brief (piano coach v2, onda 1, W1-T4): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/genera-stadi.test.js + aiuto-genera.js"
Cohesion: 0.16
Nodes (11): { caricaApp }, TUTTI_GLI_OBIETTIVI, app(), assert, BASE, brief(), { caricaApp, ORA, profili, TUTTI_GLI_OBIETTIVI }, { conSoglieStruttura } (+3 more)

### Community 93 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js"
Cohesion: 0.18
Nodes (12): 2. Dove le fonti non concordano, 4. Regole per popolazioni, 6. Audit delle regole esistenti, 7. Regole proposte, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rieseguire con il tetto alzato), Come si legge (+4 more)

### Community 94 - "Test: cancello delle tecniche · tests/tecniche.test.js"
Cohesion: 0.08
Nodes (27): adatta(), AL_CEDIMENTO, app(), assert, attr(), budget(), { caricaApp }, ESERCIZI (+19 more)

### Community 95 - "Strumento: collaudo del generatore di schede (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (7): hash32(), matrice(), matriceAttrezzi(), matriceForza(), mulberry32(), profilo(), scegli()

### Community 96 - "Checklist App Store 05: conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js"
Cohesion: 0.25
Nodes (20): currentWebMode, spotifyController, spotifyReady, ytPlayer, ytPlayerReady, avviaWebPronto(), startDropAudio(), aggiornaAvvisoDock() (+12 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, ricerca-psicologia-aderenza.md +4"
Cohesion: 0.24
Nodes (17): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, 5. Regole proposte, frenoBia(), sedutaPianoB(), htmlAderenza(), minutiCardioSettimana() (+9 more)

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

### Community 105 - "Test: golden dei carichi (le quattro catene del coach) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.15
Nodes (14): 3.9 Seduta o pausa saltata, Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), cala(), incompleta(), mancato(), meta() (+6 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.10
Nodes (19): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 109 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento.js"
Cohesion: 0.23
Nodes (17): webDuration, caricaPlayerWebSalvato(), configureWebSegment(), ensureSpotifyApi(), ensureYouTubeApi(), handleWebLinkSubmit(), loadSpotifyPlayer(), loadYouTubePlayer() (+9 more)

### Community 111 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.26
Nodes (9): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+1 more)

### Community 112 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.20
Nodes (9): 2. Dove le fonti non concordano, 4. Blocchi di mobilità, 5. Prehab per sicurezza, 8. Domande aperte, 9. Limiti onesti, Appendice: query pronte (da ripetere con il tetto di ricerca alzato), Come si legge, In una pagina (+1 more)

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (20): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+12 more)

### Community 117 - "Coach: carico di partenza (parte 2) · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, calibrazione.js"
Cohesion: 0.29
Nodes (13): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, personaCalibrazione(), arrotondaPartenza(), contestoCarichi(), esercizioAffidabilePerLoStorico(), PARAM_PARTENZA (+5 more)

### Community 118 - "Coach: prontezza prima della seduta · js/coach/prontezza.js"
Cohesion: 0.37
Nodes (12): applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato, punteggioProntezza(), renderProntezza() (+4 more)

### Community 119 - "Progressi: foto · js/ui/progressi/foto.js + pagine.js"
Cohesion: 0.23
Nodes (21): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+13 more)

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

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
Cohesion: 0.13
Nodes (17): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+9 more)

### Community 125 - "Metodo per le illustrazioni degli esercizi · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 126 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + metodi-momenti.js, biomeccanica.js, psicologia.js +5"
Cohesion: 0.17
Nodes (30): getProfile(), htmlTestFaiDaTe(), setTest(), segnaDoloreEsigenza(), fineMomento(), terminaMomento(), verificaMomento(), ritrattoCoach() (+22 more)

### Community 127 - "Carico progressivo · js/coach/carichi/progressivo.js + ricerca-algoritmi-carichi-e-app.md, dolore-mattina.js, alternative.js"
Cohesion: 0.38
Nodes (10): 6. Audit del motore attuale, caricoRiferimento(), esercizioInScarico(), faseSedutaSalvata(), incrementoPer(), pesoUltimoDi(), sedutePerEsercizio(), ultimeSessioni() (+2 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.22
Nodes (9): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+1 more)

### Community 130 - "Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js"
Cohesion: 0.17
Nodes (26): arrotonda2(), CAUSE_CONTROLLO_OTTAVA, classeRirDi(), CLASSI_PIANO, colonnaDelBlocco(), contestoPiano(), controlloOttavaPrincipiante(), copiaPiano() (+18 more)

### Community 131 - "Checklist App Store 03: audio e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.22
Nodes (9): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+1 more)

### Community 133 - "Test: correzioni della revisione dell'onda 2b/2c (INT-2d) · tests/revisione-onda2d.test.js"
Cohesion: 0.10
Nodes (17): assert, BASE, { caricaApp }, ES_CLASSI, FASTIDI, GIORNI, GOAL_SET, LIVELLI (+9 more)

### Community 134 - "Coach: volume per muscolo (fasce, solutore delle serie, tetti) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +5"
Cohesion: 0.09
Nodes (48): E.0 Protocollo di lavoro (vale per ogni task), E.3 Onda 2 — il generatore, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde, E. Piano a ondate, F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni (+40 more)

### Community 136 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + conserva-progressi.test.js"
Cohesion: 0.06
Nodes (47): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+39 more)

### Community 137 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.20
Nodes (10): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+2 more)

### Community 138 - "Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js, ARCHITETTURA.md, piano-coach-v2.md +1"
Cohesion: 0.24
Nodes (15): Catalogo delle regole generato dalla mappa (npm run catalogo), E.2 Onda 1 — fondamenta, COACH_REGOLE, COACH_REGOLE_PER_CODICE, COACH_SQUADRA, regolaDescritta(), aggiungiPerche(), codiceInSquadra() (+7 more)

### Community 139 - "Coach: cancello delle tecniche e attributi degli esercizi · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, genera.js +5"
Cohesion: 0.07
Nodes (54): B.3 Le catene: ordine fisso e scritto, strSquatDoppio(), riconciliaNote(), verificaProgramma(), limitaTecnicheIntense(), SOGLIE_TECNICHE, briefTecnicheOggi(), budgetTecniche() (+46 more)

### Community 140 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.25
Nodes (8): 3.1 Petto, 3.2 Schiena, 3.3 Spalle, 3.4 Braccia, 3.5 Gambe e glutei, 3.6 Core, 3.7 Casa: set minimi, 3. Matrice muscolo → esercizi migliori

### Community 141 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js"
Cohesion: 0.52
Nodes (11): FAILURE_SET_SECONDS, dropActive, dropInterval, dropRemaining, apriCedimento(), chiudiCedimento(), finishDropSet(), onDropVolumeInput() (+3 more)

### Community 142 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, 3. Sicurezza e privacy

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js"
Cohesion: 0.15
Nodes (14): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+6 more)

### Community 144 - "Test: volume per muscolo · tests/volume.test.js"
Cohesion: 0.12
Nodes (14): assert, BASE, bersagli(), brief(), { caricaApp }, FILE_NUOVI, fs, nuovaApp() (+6 more)

### Community 146 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.20
Nodes (10): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+2 more)

### Community 147 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.22
Nodes (19): apriQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+11 more)

### Community 148 - "Fondamenta: funzioni di utilità (testo sicuro, date, emoji) · js/core/utility.js + 04-sicurezza-privacy.md, piano-lancio-appstore.md"
Cohesion: 0.48
Nodes (6): XSS, import e CSP, 3.2 Dati sul dispositivo, import e XSS, handleSelectExercise(), jsArg(), nomeSicuro(), pulisciDeep()

### Community 149 - "Test: aiuto per le prove del piano in seduta e dello scarico unico · tests/aiuto-atleta-piano.js + onda5-calendario.test.js, integrazione-onda4.test.js"
Cohesion: 0.14
Nodes (21): apriGiorno(), BASE, { caricaApp }, FILE_P3B, fs, giorniDiAllenamento(), path, R (+13 more)

### Community 150 - "Test: integrazione dell'onda 4 (INT-4) · tests/integrazione-onda4.test.js"
Cohesion: 0.09
Nodes (17): ADULTI, assert, { caricaApp }, conGravidanza(), DUE_BIA, fileJs(), fs, GRUPPI (+9 more)

### Community 151 - "Coach: brief dell'utente (chi sei, cosa vuoi, limiti) · js/coach/regia/brief.js + compone.js, bmr-minorenni.js, soglie-bia.js +3"
Cohesion: 0.11
Nodes (30): bmrNascostoPerEta(), analyzeBia(), SOGLIE_BIA, apriTuttiMetodi(), fattoreFisico(), gravidanzaDichiarata(), guardiaNutrizione(), htmlMetodi() (+22 more)

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 153 - "Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.25
Nodes (6): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04)

### Community 154 - "Test: fastidi e modifica scritta della scheda (P4-F) · tests/fastidi.test.js"
Cohesion: 0.10
Nodes (15): app, assert, BASE, { caricaApp }, conRec04Spenta(), ETICHETTA, fs, FUORI (+7 more)

### Community 155 - "Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md + piano-coach-v2.md, PIANO.md"
Cohesion: 0.14
Nodes (11): 0. Come si legge, A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A. Collisioni e doppioni, C.1 Criterio, C.2 Elenco (16 regole; 7 sono bloccate solo in parte), C.3 Non bloccate, anche se toccano popolazioni o salute (motivo in una riga), C.4 Numeri che escono come «Convenzione» con etichetta visibile (+3 more)

### Community 156 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 157 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (8): 2. Dove le fonti non concordano, 4. Primo giorno, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 15 ricerche riuscite, Appendice B. Query pronte (da rilanciare con il tetto alzato), In una pagina, Ricerca: le prime 12 settimane del principiante e la prima seduta

### Community 158 - "Strumento: collaudo del generatore di schede (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (9): contaSerie(), creditiAttributi(), creditoGruppo(), eseguiMatrice(), gruppoDi(), pesoProfilo(), r1(), tabellaSettimana() (+1 more)

### Community 159 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 3) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.29
Nodes (7): 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima, 1. Cosa dicono le fonti

### Community 160 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 3) · docs/ricerca-mesocicli-periodizzazione-scarichi.md + repertorio.js, e1rm.js, ricerca-algoritmi-carichi-e-app.md +4"
Cohesion: 0.11
Nodes (31): E.1 Onda 0 — strumenti e bug netti, 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 7. Regole proposte, 4. Audit delle regole esistenti (confronto con il codice), 5. Regole proposte, 2. Dove le fonti non concordano, 4. Scala di intervento sugli stalli, 5. Audit delle regole esistenti (+23 more)

### Community 161 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 162 - "Checklist App Store 04: sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 163 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.22
Nodes (9): 3. Matrice fastidio → modifica, Anca, Caviglia (non cercato sul web: conoscenza del modello, Convenzione), Collo (assente oggi dal coach; base [V] solo sull'esercizio per il dolore cronico, il resto conoscenza del modello, Convenzione), Ginocchio, Gomito, Polso, Schiena bassa (+1 more)

### Community 164 - "Test: integrazione dell'onda 2c (INT-2b) · tests/integrazione-onda2c.test.js"
Cohesion: 0.25
Nodes (6): app, assert, { caricaApp }, haFlessione(), nomi(), test

### Community 165 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.06
Nodes (30): 0. Come si legge, 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa») (+22 more)

### Community 166 - "Test: Forza, carichi dei giorni medi e leggeri (FRZ-11) · tests/forza-carichi.test.js"
Cohesion: 0.12
Nodes (19): A, assert, atleta(), { caricaApp }, conForzaCarichi(), conto(), controllaOrdine(), dodiciSettimane() (+11 more)

### Community 167 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 168 - "Test: catalogo delle regole e squadra del coach · tests/catalogo.test.js + soglie.test.js, collaudo-attrezzi.test.js, collaudo-forza.test.js +4"
Cohesion: 0.04
Nodes (49): conBilanciaV2(), assert, fs, path, test, nuovaApp(), assert, BLOCCATE (+41 more)

### Community 169 - "Test: scelta degli esercizi per attributi (W2-T6) · tests/selezione.test.js + split.test.js"
Cohesion: 0.07
Nodes (26): app, assert, ATTR, BASE, { caricaApp }, costruisci(), fs, griglia() (+18 more)

### Community 170 - "Strumento: collaudo del generatore di schede (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (6): causaDichiarata(), conflittiRecupero(), consecutivi(), minutiEffettivi(), noteFalse(), unitaRiempibile()

### Community 172 - "Test: difetti trovati dalla revisione dell'onda 3a (INT-3b) · tests/revisione-onda3a.test.js"
Cohesion: 0.13
Nodes (13): assert, { caricaApp }, CASA20, { conBilanciaV2, inGrigliaBase }, FASI, H, nonSalgono(), PROG_V2 (+5 more)

### Community 173 - "Strumento: collaudo del generatore di schede (parte 7) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (3): bandaB6(), pavimentoDiretteB6(), volumeGruppi()

### Community 174 - "Soglie del coach · docs/soglie-coach.md + split.test.js"
Cohesion: 0.11
Nodes (18): `SOGLIE_BIA` — `js/coach/bia/soglie-bia.js` (preparatore), Soglie del coach, `SOGLIE_FASTIDI` — `js/coach/sicurezza/soglie-fastidi.js` (sentinella), `SOGLIE_FORZA_CARICHI` — `js/coach/specialita/soglie-forza-carichi.js` (specialista), `SOGLIE_FORZA` — `js/coach/specialita/soglie-forza.js` (specialista), `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia), `SOGLIE_POPOLAZIONI` — `js/coach/sicurezza/soglie-popolazioni.js` (sentinella), `SOGLIE_PROGRESSIONE` — `js/coach/carichi/soglie-progressione.js` (bilancia) (+10 more)

### Community 175 - "Coach: griglia dei pesi per attrezzo (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js"
Cohesion: 0.32
Nodes (12): 3.6 Disegno dello scarico: cosa si taglia, alTettoDeiManubri(), esercizioConManubri(), faseGrigliaETetto(), fmtPeso(), fraseGrigliaPiuVicino(), fraseTettoCima(), fraseTettoNonOltre() (+4 more)

### Community 176 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js"
Cohesion: 0.25
Nodes (8): 4. Audit delle regole esistenti (confronto con il codice), 3.3 Struttura per giorni a settimana, 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie, 6. Audit delle regole esistenti, splitFor()

### Community 177 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) (parte 2) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.29
Nodes (7): 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti

### Community 178 - "Schermata Oggi · js/ui/oggi.js"
Cohesion: 0.62
Nodes (6): categoriaDi(), CATEGORIE, obiettiviSettimana(), renderOggi(), settimaneDiFila(), stimaSeduta()

### Community 179 - "Test: distribuzione dei muscoli piccoli e flessione del ginocchio (P3-G) · tests/distribuzione.test.js"
Cohesion: 0.18
Nodes (10): app, assert, BASE, { caricaApp }, costruisci(), CREDITI, fraz(), griglia() (+2 more)

### Community 180 - "Coach: alternative e applicazione del programma · js/coach/programma/alternative.js"
Cohesion: 0.47
Nodes (9): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+1 more)

### Community 181 - "Coach: specialista Forza, il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + CLAUDE.md, fasi.js, coach-v2-decisioni.md +5"
Cohesion: 0.09
Nodes (28): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search, F.1 Le 12 modifiche che contano di più (qualità e sicurezza), in ordine, F.2 Riordino delle ondate (le ondate restano rilasciabili), F. Priorità reale (+20 more)

### Community 183 - "Coach: soglie della divisione e dei giorni (split) · js/coach/programma/soglie-split.js + onboarding.js, ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.40
Nodes (4): 7. Audit delle regole esistenti, SOGLIE_SPLIT, ricettaPunti(), SLOT_PRIORITA

### Community 184 - "Rampa del volume in seduta: le serie seguono il piano della settimana (MES-03) · js/coach/volume/rampa-settimana.js + soglie-rampa.js"
Cohesion: 0.43
Nodes (6): posizioneNelPiano(), rampaAlCarico(), serieDellaSettimana(), serieDelPianoQuestaSettimana(), sogliaRampa(), SOGLIE_RAMPA

### Community 185 - "Test: onda 5, il peso sale con il RIR fisso (ALG-19) · tests/onda5-ripresa-prudenti.test.js"
Cohesion: 0.24
Nodes (8): alTetto(), assert, coppie(), H, misura(), PALESTRA, STORIE, test

### Community 186 - "Test: il piano si esegue in seduta (MES-03) · tests/piano-in-seduta.test.js"
Cohesion: 0.22
Nodes (9): assert, COMBINAZIONI, conStoriaDiPrima(), FB(), H, LIVELLI, OBIETTIVI, test (+1 more)

### Community 187 - "Coach: fastidi e modifica scritta della scheda (REC-04, SAF-02) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js"
Cohesion: 0.36
Nodes (11): applicaNoteFastidi(), datiNotaFastidio(), eNotaDelFastidio(), esclusoDalFastidio(), FASTIDI_ZONE, fastidiAttivi(), nomiDelProgramma(), notaCautelaFastidio() (+3 more)

### Community 188 - "Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js"
Cohesion: 0.36
Nodes (8): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), openAudioDB()

### Community 189 - "Test: rifiniture della revisione dell'onda 2e/2f (INT-2g) · tests/revisione-onda2g.test.js"
Cohesion: 0.22
Nodes (7): a, assert, { caricaApp }, firma(), PL, se(), test

### Community 190 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + disegni-esercizi.js, scheda-unica.js, schede-esercizio.js +2"
Cohesion: 0.20
Nodes (14): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), bucchiNelleSchede(), schedaUnica(), closeExerciseInfo(), pausaConsigliata() (+6 more)

### Community 193 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, split, scarico) (parte 3) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.29
Nodes (6): 2. Dove le fonti non concordano, 5. Regole proposte, 6. Domande aperte, 7. Limiti onesti, 8. Appendice: query pronte per un'altra sessione con il tetto alzato, Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

### Community 194 - "Mappa delle regole del coach (documento) (parte 5) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.33
Nodes (3): PAR: carico di partenza dai dati del corpo, INT-01 stato del corpo dalla BIA (angolo di fase, ECW/TBW): bandiere di prudenza, PAR-01..05 carico di partenza stimato da massa muscolare e storico

### Community 195 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 199 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.40
Nodes (5): 5.1 Scala del dolore, 5.2 Prontezza e tetti di sforzo, 5.3 Rampe di rientro, 5.4 Quando il coach deve dire «medico», 5. Soglie di prudenza

### Community 200 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

## Knowledge Gaps
- **1297 isolated node(s):** `CREDITI`, `ATTR`, `Non si fa (motivo)`, `Ordine e chiusura`, `Stato (aggiornato a ogni passo)` (+1292 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1516 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderOggi()` connect `Schermata Oggi · js/ui/oggi.js` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +5`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, stampa-scheda.js, traduttore.js +11`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js, navigazione.js, storage.js +1`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, compone.js, psicologia.js +3`, `Coach: intensità (INT) · js/coach/intensita.js + esigenza.js`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, lavoro-cronometro.js +9`, `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + seduta.js, annulla.js, index.html +12`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, oggi.js`, `Calendario del mese · js/ui/calendario/mese.js + menu-settimana.js, repertorio.js, scambio.js +5`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, volume.js, serie-ripetizioni.js +15`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, riposo-settimane.js +4`, `Coach: agente dei consigli · js/coach/agente-consigli.js + regole-ricerca.js, utility.js, traduttore.js +4`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + backup.js, storico.js, mappa-per-agenti.md +7`, `Schede tecniche per esercizio · js/dati/schede-tecniche.js + disegni-esercizi.js, scheda-unica.js, schede-esercizio.js +2`, `Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + questionario-decisioni.js, taratura.js, prontezza.js +2`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, repertorio.js +2`, `Progressi: peso corporeo · js/ui/progressi/peso.js + ricerca-cardio-nutrizione.md, piano-coach-v2.md, ricerca-psicologia-aderenza.md +4`, `Opzioni: il coach · js/ui/opzioni/il-coach.js + metodi-momenti.js, biomeccanica.js, psicologia.js +5`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 197 inferred relationships involving `Novità del coach v2` (e.g. with `arrotondaAttrezzo()` and `faseGrigliaETetto()`) actually correct?**
  _`Novità del coach v2` has 197 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CREDITI`, `ATTR`, `Non si fa (motivo)` to the rest of the system?**
  _1297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, pannello.js +5` be split into smaller, more focused modules?**
  _Cohesion score 0.09350649350649351 - nodes in this community are weakly interconnected._
- **Why does `controlloOttavaPrincipiante()` connect `Coach: mesociclo (durata, blocchi, rampa di volume, scarico) · js/coach/programma/mesociclo.js + soglie-struttura.js` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, stampa-scheda.js, traduttore.js +11`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js`, `Coach: il perché di ogni numero e la squadra dei sotto-coach · js/coach/regia/perche.js + catalogo-regole.js, ARCHITETTURA.md, piano-coach-v2.md +1`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, compone.js, psicologia.js +3`, `Coach: popolazioni e rientro dopo una pausa (over 65, gravidanza, rampa) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js, alternative.js +2`, `Coach: scarico (dose unica, fatica, protezioni) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, repertorio.js, archivio.js +5`, `Calendario del mese · js/ui/calendario/mese.js + menu-settimana.js, repertorio.js, scambio.js +5`, `Schermata Oggi · js/ui/oggi.js`, `Coach: schemi di movimento · js/coach/programma/schemi.js + parametri.js, coach-v2-decisioni.md, intensita.js +1`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + backup.js, storico.js, mappa-per-agenti.md +7`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + piano-onda5.md, attrezzi.js, progressivo.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.12367864693446089 - nodes in this community are weakly interconnected._
- **Why does `switchTab()` connect `Coach: mi sento male in seduta · js/coach/mi-sento-male.js + seduta.js, annulla.js, index.html +12` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, stampa-scheda.js, traduttore.js +11`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +4`, `Calendario del mese · js/ui/calendario/mese.js + menu-settimana.js, repertorio.js, scambio.js +5`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js`, `Schermata Oggi · js/ui/oggi.js`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, riposo-settimane.js +4`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + backup.js, storico.js, mappa-per-agenti.md +7`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._