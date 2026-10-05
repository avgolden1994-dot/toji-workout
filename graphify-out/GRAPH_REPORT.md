# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2998 nodes · 8192 edges · 161 communities (152 shown, 9 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 610 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `df13af9b`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +5
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md
- Onboarding: creazione del programma · js/ui/onboarding.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, repertorio.js, traduttore.js +5
- Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +2
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, archivio.js +11
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, regole-ricerca.js
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + calibrazione.js, costanti.js, schede-pronte.js
- Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + stato.js, oggi.js, metodi-momenti.js +9
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, costanti.js
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + ricerca-ipertrofia-programmazione.md, progressivo.js, tempo.js
- Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, calibrazione.js, parametri.js +1
- Manifest della PWA · manifest.json
- Coach: schemi di movimento · js/coach/programma/schemi.js + ricette.js, struttura-pro.js, repertorio.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, seduta-libera.js, storage.js +11
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js
- Test: struttura e avvio · tests/struttura.test.js + indice.js, avvio.test.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +4
- Piano: scelta del giorno · js/ui/piano/giorno.js + figura-anatomica.js, aggiungi-allenamento.js, riposo-settimane.js +2
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md + onboarding.js
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js
- integra-onda.js · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, soglie-partenza.js, calibrazione.js +1
- Partenza bassa per le donne e calibrazione rapida (W2-T8, piano coach v2 capitolo D, prove D.8) · tests/partenza-donne.test.js + aiuto-atleta.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + CLAUDE.md, regole-ricerca.js
- package.json (script npm) (parte 2) · package.json
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + scheda-quattro-sezioni.js, schede-esercizio.js, schede-varianti.js
- Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, storage.js, navigazione.js +3
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +3
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + coach-v2-decisioni.md, ricerca-algoritmi-carichi-e-app.md
- cancello-collaudo.js · tools/cancello-collaudo.js + ricerca-casa-poco-tempo.md
- Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + tecniche.js, ricette.js, tempo.js +12
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, audio-silenzioso.js, stato-condiviso.js +1
- Massimale stimato e carico dal massimale (ALG-04, W1-T3) · js/coach/carichi/e1rm.js + ricerca-algoritmi-carichi-e-app.md, regole-ricerca.js, ricerca-forza-progressione.md +1
- Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri · tests/revisione-onda1.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js
- Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + mi-sento-male.js, costanti.js, seduta.js +19
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js +1
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, generatore-onda1.test.js +3
- Dati: importazione dei progressi · js/ui/importa-progressi.js + biomeccanica.js, ricerca-riscaldamento-mobilita-prevenzione.md, questionario-decisioni.js +3
- Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- Calibrazione rapida dei carichi stimati (CAR-18, CAR-19) · js/coach/carichi/calibrazione.js + partenza.js, progressivo.js
- Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md
- Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6) · js/coach/regia/genera.js + piano-coach-v2.md, volume.js, coach-v2-decisioni.md +4
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md + mappa-per-agenti.md, motore.js, partenza.js +1
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, scarico.js, regole-ricerca.js +3
- Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +10
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md, ricette.js +1
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +7
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +2
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Coach: prontezza prima della seduta · js/coach/prontezza.js
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + peso.js, ricerca-cardio-nutrizione.md, ricerca-obiettivi-e-programmi.md +6
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Sicurezza e segnali (piano coach v2, onda 0, W0-T5): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/sicurezza-onda0.test.js
- Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js + soglie.test.js
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 2) · docs/ricerca-metodi-avanzati-intensita.md + regole-nuove.js, coach-mappa-regole.md, ricerca-struttura-e-intensita.md
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Backup e ripristino · js/core/backup.js + fogli.js, importa-csv.js
- Alternative e applicazione del programma · js/coach/programma/alternative.js
- Progressi: foto · js/ui/progressi/foto.js + pagine.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Disegni degli esercizi · js/dati/disegni-esercizi.js + scheda-unica.js, schede-esercizio.js, traduttore.js
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, regole-ricerca.js
- elenco-soglie.js · tools/elenco-soglie.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Mesociclo: durata, blocchi, scarichi e RIR per settimana (PRN-03, ETA-02) · js/coach/programma/mesociclo.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-ipertrofia-programmazione.md, ricerca-obiettivi-e-programmi.md +1
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Volume per muscolo: conteggio delle serie, volume della settimana e tetti (VOL-01, VOL-02, SES-01, REC-01, ESI-01) · js/coach/volume/volume.js + tempo.js, mappa-per-agenti.md, parametri.js +1
- 3in · README.md
- Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js
- Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04) · js/dati/attributi-esercizi.js + struttura-pro.js
- Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + catalogo-regole.js, soglie-coach.md, ARCHITETTURA.md
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 3) · docs/ricerca-metodi-avanzati-intensita.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md
- Importazione CSV di altre app · js/ui/importa-csv.js
- Soglie della regia del coach (REG-01, REG-04) · js/coach/regia/soglie-regia.js
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 3) · docs/ricerca-biomeccanica-esercizi.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js
- Coach: psicologia (parte 2) · js/coach/psicologia.js + onboarding.js, lettore.js, onboarding-risultato.js
- 04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md + utility.js, piano-lancio-appstore.md
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 2) · docs/ricerca-casa-poco-tempo.md
- Condividi e stampa la scheda · js/ui/stampa-scheda.js + traduttore.js, fogli.js, schede-esercizio.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md
- Coach: biomeccanica · js/coach/biomeccanica.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js
- Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3) · js/coach/regia/fasi.js + regole-ricerca.js
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 4) · docs/ricerca-metodi-avanzati-intensita.md

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 107 edges
2. `renderAllenamento()` - 93 edges
3. `Novità del coach v2` - 79 edges
4. `findExercise()` - 75 edges
5. `currentDay` - 74 edges
6. `renderPiano()` - 72 edges
7. `showUndo()` - 67 edges
8. `ymd()` - 66 edges
9. `getProfile()` - 59 edges
10. `senzaEmoji()` - 57 edges

## Surprising Connections (you probably didn't know these)
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `E.1 Regressioni ammesse del cancello (meccanismo e voci)` --references--> `schienaLombare()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/programma/schemi.js
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

## Communities (161 total, 9 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +5"
Cohesion: 0.10
Nodes (47): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), escapeHtml(), jsArg(), buildExerciseSelect(), MUSCLE_GROUPS, azzeraSezioniEsercizi() (+39 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.37
Nodes (12): 3.4 RIR per settimana e per tipo di esercizio, A. Struttura del blocco, inDeficitCalorico(), MES_RIR, pavimentoRirMinorenni(), pisoRirEsigenza(), primaSettimanaBlocco(), profiloCoach() (+4 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js"
Cohesion: 0.15
Nodes (32): biaField(), chip(), etaPerProgramma(), MSG_ETA_SOTTO_MINIMO, nuovoOnbData(), ONB_ATTREZZI, ONB_FASTIDI, ONB_FREQ (+24 more)

### Community 3 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, repertorio.js, traduttore.js +5"
Cohesion: 0.20
Nodes (24): applyGeneratedProgram(), chiudiQuestionario(), inviaQuestionario(), riduciFrequenza(), conAnnulla(), rispostaAderenza(), leggiJSON(), formatNow() (+16 more)

### Community 4 - "Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +2"
Cohesion: 0.19
Nodes (22): vaiAlMomento(), closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE (+14 more)

### Community 5 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, archivio.js +11"
Cohesion: 0.14
Nodes (37): E.1 Onda 0 — strumenti e bug netti, Appendice B. Simulazioni eseguite (riproducibili), C. Igiene dei dati: lo scarico non è un dato di forma, D. Tra i blocchi, pause, specializzazione, 7. Regole proposte, getProfile(), settimanaProgramma(), segnaDoloreEsigenza() (+29 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.04
Nodes (41): ABBR, ATTREZZI_OK, ATTREZZI_QUASI, cacheEs, CATEGORIA_ATTREZZO, CONTROINDICAZIONI, CRITERI, DIRETTE_MIN_MUSCOLO (+33 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + ripristino-guida.js"
Cohesion: 0.17
Nodes (22): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), GUIDA, guidaAttiva(), guidaAvanti() (+14 more)

### Community 8 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, regole-ricerca.js"
Cohesion: 0.20
Nodes (18): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia() (+10 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.06
Nodes (36): 0. Come si legge, B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati (+28 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + calibrazione.js, costanti.js, schede-pronte.js"
Cohesion: 0.25
Nodes (23): recordPianoDi(), DAYS, WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays (+15 more)

### Community 12 - "Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + stato.js, oggi.js, metodi-momenti.js +9"
Cohesion: 0.16
Nodes (34): 5. Regole proposte, fineMomento(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), verificaMomento(), sedutaPianoB(), carichiDelGiorno() (+26 more)

### Community 13 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, costanti.js"
Cohesion: 0.17
Nodes (18): MODE_META, sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, applicaZoom(), applyTheme(), AUTOCLOSE_KEY, BYPASS_KEY (+10 more)

### Community 14 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + ricerca-ipertrofia-programmazione.md, progressivo.js, tempo.js"
Cohesion: 0.07
Nodes (32): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+24 more)

### Community 15 - "Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.06
Nodes (46): 3.9 Seduta o pausa saltata, Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), acorn, AGGIUSTI, assert, BIA (+38 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, calibrazione.js, parametri.js +1"
Cohesion: 0.18
Nodes (23): calibrazioneNellaSeduta(), faseCalibrazione(), storiaCalibrazione(), aggiornaEsigenza(), esigenzaCoach(), esigenzaEsclusa(), htmlEsigenza(), rpeBersaglioSeduta() (+15 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Coach: schemi di movimento · js/coach/programma/schemi.js + ricette.js, struttura-pro.js, repertorio.js"
Cohesion: 0.12
Nodes (27): adattoAllaSeduta(), componiSedute(), GRUPPI_DELLA_SEDUTA, _n(), RICETTE, rngDa(), SCHEMI_ATTESI, SLOT_DEF (+19 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js"
Cohesion: 0.26
Nodes (20): normalizeExerciseRecord(), trEs(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato() (+12 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, seduta-libera.js, storage.js +11"
Cohesion: 0.13
Nodes (58): 5.1 Funzioni molto apprezzate, pesoPartenza(), prontezzaDiOggi(), applicaDecisioni(), cambiaSerieNelPiano(), sostituisciNelPiano(), currentDay, selectDay() (+50 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 23 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js"
Cohesion: 0.45
Nodes (12): accosciato(), arto(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW, piegato(), sdraiato() (+4 more)

### Community 24 - "Test: struttura e avvio · tests/struttura.test.js + indice.js, avvio.test.js"
Cohesion: 0.08
Nodes (22): assert, fs, path, test, acorn, assert, fs, html (+14 more)

### Community 25 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +4"
Cohesion: 0.07
Nodes (84): FAILURE_SET_SECONDS, activeSourceTab, AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, currentWebMode, dropActive, dropInterval (+76 more)

### Community 26 - "Piano: scelta del giorno · js/ui/piano/giorno.js + figura-anatomica.js, aggiungi-allenamento.js, riposo-settimane.js +2"
Cohesion: 0.16
Nodes (27): planDayClick(), VOL_MAX_UTILE, VOL_MIN_UTILE, volLabel(), volLevel(), closeWeekSheet(), openPlanDay(), aggiungiPerGruppo() (+19 more)

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

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md + onboarding.js"
Cohesion: 0.13
Nodes (15): 2. Dove le fonti non concordano, 3.3 Struttura per giorni a settimana, 4. Primo giorno, 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie, 6. Audit delle regole esistenti (+7 more)

### Community 32 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.11
Nodes (18): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+10 more)

### Community 33 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + schede-esercizio.js"
Cohesion: 0.18
Nodes (12): 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere), 3.1 Ingressi (tutti già disponibili nel codice), 3.2 Classi di esercizio, 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W), 3.4 Riduzioni («quando saltare»), 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra), 3.6 Arrotondamento e tetto di tempo, 3.7 Riscaldamento generale (minuti) (+4 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, soglie-partenza.js, calibrazione.js +1"
Cohesion: 0.17
Nodes (27): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, personaCalibrazione(), applicaPartenze(), arrotondaPartenza(), classePartenza(), contestoCarichi() (+19 more)

### Community 36 - "Partenza bassa per le donne e calibrazione rapida (W2-T8, piano coach v2 capitolo D, prove D.8) · tests/partenza-donne.test.js + aiuto-atleta.js"
Cohesion: 0.06
Nodes (35): ancora(), ANCORE_DONNE_KG65, ANCORE_VERE_DONNE, arrotonda05(), atletaVirtuale(), CONTROLLO, fra(), GIORNI_PIANO (+27 more)

### Community 37 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md + CLAUDE.md, regole-ricerca.js"
Cohesion: 0.12
Nodes (13): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search, 2. Dove le fonti non concordano, 4. Confronto con le app, 8. Domande aperte (+5 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.12
Nodes (16): 10. Limiti onesti, 2. Dove le fonti non concordano, 3.1 Classi di esercizio (come agganciarle al codice), 3.2 Tecnica contro classe di esercizio, 3.3 Tecnica contro livello, età e vincoli, 3. Matrice di idoneità, 5.1 Lezioni da «Mentzer contro Arnold», 5.2 Professionisti contro naturali: cosa è trasferibile (+8 more)

### Community 40 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + scheda-quattro-sezioni.js, schede-esercizio.js, schede-varianti.js"
Cohesion: 0.17
Nodes (18): closeExerciseInfo(), GLOSSARIO, openExerciseInfo(), pausaConsigliata(), preferenzaEsercizio(), preferisci(), schedaTecnica(), TECNICA (+10 more)

### Community 41 - "Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js + genera-golden.test.js, genera-stadi.test.js"
Cohesion: 0.08
Nodes (40): ATTREZZI_PALESTRA, BIA, { caricaApp }, conScelte(), costruisciConProfilo(), GRUPPI, idMetodi(), MOMENTI_PROVA (+32 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.10
Nodes (19): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima, 1. Cosa dicono le fonti (+11 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, storage.js, navigazione.js +3"
Cohesion: 0.13
Nodes (35): daysContainer, renderDayBar(), getDayTitle(), loadTitles(), saveTitles(), titlesKey(), avviaTempoSeduta(), openWorkoutDay() (+27 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +3"
Cohesion: 0.14
Nodes (47): faseSedutaSalvata(), settimanaDellaSeduta(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks() (+39 more)

### Community 45 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + coach-v2-decisioni.md, ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.20
Nodes (14): A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), A. Collisioni e doppioni, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, attrezzoDiCasaMancante() (+6 more)

### Community 46 - "cancello-collaudo.js · tools/cancello-collaudo.js + ricerca-casa-poco-tempo.md"
Cohesion: 0.19
Nodes (23): 5.7 Algoritmo del risolutore dei tempi (proposta), autotest(), chiudi(), codiceDi(), comeSoglia(), cp, daCollaudo(), daPrima() (+15 more)

### Community 47 - "Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + tecniche.js, ricette.js, tempo.js +12"
Cohesion: 0.14
Nodes (36): segnaEsercizioTaratura(), TOCCHI, METODI, completaSettimana(), eCernieraFemorali(), NOTA_REMATORE_INVERSO, ordinaSedute(), rinforzaFemorali() (+28 more)

### Community 48 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.09
Nodes (22): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+14 more)

### Community 50 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.10
Nodes (20): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+12 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, audio-silenzioso.js, stato-condiviso.js +1"
Cohesion: 0.18
Nodes (20): mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale(), lampeggia(), playBeep(), playEnd(), playTick() (+12 more)

### Community 52 - "Massimale stimato e carico dal massimale (ALG-04, W1-T3) · js/coach/carichi/e1rm.js + ricerca-algoritmi-carichi-e-app.md, regole-ricerca.js, ricerca-forza-progressione.md +1"
Cohesion: 0.32
Nodes (12): 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale, 7. Regole proposte, 4. Audit delle regole esistenti (confronto con il codice), 5. Regole proposte, caricoPer(), e1rmSeduta(), e1rmSerie() (+4 more)

### Community 53 - "Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri · tests/revisione-onda1.test.js"
Cohesion: 0.15
Nodes (15): app, assert, BASE, { caricaApp }, costruisci(), FASI, griglia(), nomiSeduta() (+7 more)

### Community 54 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.06
Nodes (30): 0. Come si legge, 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa») (+22 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js + ricerca-specializzazione-punti-deboli.md"
Cohesion: 0.07
Nodes (31): 8. Regole proposte, alt(), app5, assert, ATTR5, bersaglio(), c, carica() (+23 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js"
Cohesion: 0.18
Nodes (26): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR (+18 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js"
Cohesion: 0.15
Nodes (14): a_tempo(), app(), assert, BASE, { caricaApp }, costruisci(), mulberry32(), profili() (+6 more)

### Community 58 - "Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + mi-sento-male.js, costanti.js, seduta.js +19"
Cohesion: 0.10
Nodes (34): restartOnboarding(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), PRONTEZZA_KEY(), switchProtocol(), AGG_KEY() (+26 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js +1"
Cohesion: 0.26
Nodes (20): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+12 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, intensita-onda0.test.js, generatore-onda1.test.js +3"
Cohesion: 0.05
Nodes (40): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+32 more)

### Community 61 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + biomeccanica.js, ricerca-riscaldamento-mobilita-prevenzione.md, questionario-decisioni.js +3"
Cohesion: 0.14
Nodes (24): 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 8. Regole proposte, 6. Audit delle regole esistenti, 7. Regole proposte, bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), stabile() (+16 more)

### Community 62 - "Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm · tests/generatore-onda0b.test.js"
Cohesion: 0.21
Nodes (12): app(), assert, { caricaApp }, costruisci(), gruppo(), nomi(), pulito(), schema() (+4 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Calibrazione rapida dei carichi stimati (CAR-18, CAR-19) · js/coach/carichi/calibrazione.js + partenza.js, progressivo.js"
Cohesion: 0.25
Nodes (10): calibrazioneChiusa(), decisioneCalibrazione(), esposizioniCalibrazione(), percentualeSalto(), pesoDopoSalto(), rigaSalto(), rpeCalibrazione(), virgola() (+2 more)

### Community 65 - "Il coach compone · js/coach/compone.js + ricerca-metodi-coach-pratici.md"
Cohesion: 0.57
Nodes (6): 6. Regole proposte, apriTuttiMetodi(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo()

### Community 66 - "Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6) · js/coach/regia/genera.js + piano-coach-v2.md, volume.js, coach-v2-decisioni.md +4"
Cohesion: 0.13
Nodes (28): F.2 Riordino delle ondate (le ondate restano rilasciabili), B.3 Le catene: ordine fisso e scritto, E.2 Onda 1 — fondamenta, E.3 Onda 2 — il generatore, F.1 Invarianti (ogni integrazione li verifica), F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni, F.4 Ogni onda resta rilasciabile (+20 more)

### Community 67 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md + mappa-per-agenti.md, motore.js, partenza.js +1"
Cohesion: 0.18
Nodes (16): Come cercare (in quest'ordine), Flussi principali, Mappa per agenti, Stile, 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), 5.4 Tag sospetti o da rivedere [V salvo diversa nota] (+8 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md"
Cohesion: 0.08
Nodes (23): 0. Stato della ricerca (leggere prima), 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti (+15 more)

### Community 70 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, scarico.js, regole-ricerca.js +3"
Cohesion: 0.13
Nodes (25): Nomi in posti inattesi, 3.6 Scarico: quando e come, 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti (+17 more)

### Community 71 - "Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js"
Cohesion: 0.08
Nodes (24): app, assert, ATTR, { caricaApp }, CTRL, DETT, DIFFERENZE, differenzeVere() (+16 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.12
Nodes (16): 0. In breve, 2. Dove le fonti non concordano, 3.1 Metodo, parametri, assunzioni, 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg), 3.4 Peso corporeo e massa magra, 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante), 3.6 Fattore prudente e sblocco rapido (DON-04), 3.7 Pavimento della barra e alternative (+8 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.13
Nodes (14): 1. Riepilogo numeri, 2. Tabella completa, 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno), 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file (+6 more)

### Community 76 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md"
Cohesion: 0.11
Nodes (19): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach (+11 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md, ricette.js +1"
Cohesion: 0.10
Nodes (28): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+20 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.10
Nodes (20): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+12 more)

### Community 81 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md + biomeccanica.js, schede-tecniche.js"
Cohesion: 0.18
Nodes (12): 2. Dove le fonti non concordano, 4. Regole per popolazioni, 6. Audit delle regole esistenti, 7. Regole proposte, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rieseguire con il tetto alzato), Come si legge (+4 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.15
Nodes (13): confronta(), costruisciRisultato(), creaAmbiente(), ctx, dirUscita(), gitInfo(), main(), mdReport() (+5 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 85 - "Seduta: termina allenamento e cardio · js/ui/allenamento/termina-e-cardio.js"
Cohesion: 0.45
Nodes (11): aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio(), obiettivoSeduta(), renderCardio() (+3 more)

### Community 86 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 89 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js"
Cohesion: 0.44
Nodes (8): giorniDallUltimaSeduta(), gruppoInPriorita(), mancavaSoloUltimaSerie(), prontezzaRecente(), regoleRicAlCarico(), rientroPiano(), sedutePassate(), settimanaCentraleBlocco()

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +7"
Cohesion: 0.09
Nodes (49): loadHistory(), normalizeHistoryEntry(), LOCALE(), minutiCardioSettimana(), renderCardioStat(), confermaImportProgressi(), mostraAnteprimaImport(), htmlPesate() (+41 more)

### Community 91 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, metodi-momenti.js +2"
Cohesion: 0.15
Nodes (15): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+7 more)

### Community 92 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.11
Nodes (18): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+10 more)

### Community 93 - "Coach: prontezza prima della seduta · js/coach/prontezza.js"
Cohesion: 0.39
Nodes (11): applicaProntezza(), leggiProntezza(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato, punteggioProntezza(), renderProntezza(), saltaProntezza() (+3 more)

### Community 94 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 95 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.70
Nodes (5): hash32(), matrice(), mulberry32(), profilo(), scegli()

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.08
Nodes (24): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+16 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + peso.js, ricerca-cardio-nutrizione.md, ricerca-obiettivi-e-programmi.md +6"
Cohesion: 0.14
Nodes (29): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice), 6. Audit delle regole esistenti, 4. Audit delle regole esistenti, frenoBia(), fattoreFisico() (+21 more)

### Community 100 - "collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.20
Nodes (12): autotest(), contesto(), controindicato(), coperturaLibreria(), dacautela(), infoEs(), rirPianificato(), stressZona() (+4 more)

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

### Community 105 - "Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js + soglie.test.js"
Cohesion: 0.06
Nodes (30): assert, BLOCCATE, BLOCCATE_IN_PARTE, catalogoVero(), contesto(), fs, G, JSON_W1T1 (+22 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.10
Nodes (19): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 109 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 2) · docs/ricerca-metodi-avanzati-intensita.md + regole-nuove.js, coach-mappa-regole.md, ricerca-struttura-e-intensita.md"
Cohesion: 0.22
Nodes (8): TEC-07 tetto alle tecniche al cedimento (RIC-04), 4.1 Budget per seduta e per settimana, 4.2 Posizione nel blocco, 4.3 Parametri delle singole tecniche (da usare nel testo della tecnica), 4. Come e quando usarle nel mesociclo, 8. Regole proposte, limitaTecnicheIntense(), TECNICHE_INTENSE

### Community 111 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.22
Nodes (19): apriQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+11 more)

### Community 112 - "Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js"
Cohesion: 0.36
Nodes (8): apprendiTaraturaRir(), consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), aggiustiCoach(), salvaAggiusti(), contaStalli()

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.10
Nodes (19): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 117 - "Backup e ripristino · js/core/backup.js + fogli.js, importa-csv.js"
Cohesion: 0.29
Nodes (13): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ripristinaBackup(), valorePulito() (+5 more)

### Community 118 - "Alternative e applicazione del programma · js/coach/programma/alternative.js"
Cohesion: 0.47
Nodes (9): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+1 more)

### Community 119 - "Progressi: foto · js/ui/progressi/foto.js + pagine.js"
Cohesion: 0.23
Nodes (21): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+13 more)

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

### Community 124 - "Disegni degli esercizi · js/dati/disegni-esercizi.js + scheda-unica.js, schede-esercizio.js, traduttore.js"
Cohesion: 0.33
Nodes (9): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), bucchiNelleSchede(), schedaUnica(), EMOJI_TESTA, PATTERN_RULES (+1 more)

### Community 125 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 126 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + il-coach.js, compone.js, regole-ricerca.js"
Cohesion: 0.19
Nodes (20): htmlIspirazioni(), applicaMomento(), chiediMomento(), confermaMomento(), metodoDa(), MOMENTI, momentoDa(), momentoInAttesa (+12 more)

### Community 127 - "elenco-soglie.js · tools/elenco-soglie.js"
Cohesion: 0.20
Nodes (14): caricaSoglie(), cella(), FORZE_AMMESSE, fs, generaElenco(), main(), path, R (+6 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.22
Nodes (9): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+1 more)

### Community 130 - "Mesociclo: durata, blocchi, scarichi e RIR per settimana (PRN-03, ETA-02) · js/coach/programma/mesociclo.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-ipertrofia-programmazione.md, ricerca-obiettivi-e-programmi.md +1"
Cohesion: 0.36
Nodes (8): 5. Regole proposte, 3.5 Carico e ripetizioni settimana per settimana, 5. Audit delle regole esistenti, 7. Regole proposte, fasiProgramma(), pianoMesociclo(), strutturaProgramma(), schemeFor()

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 133 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, 3. Sicurezza e privacy

### Community 134 - "Volume per muscolo: conteggio delle serie, volume della settimana e tetti (VOL-01, VOL-02, SES-01, REC-01, ESI-01) · js/coach/volume/volume.js + tempo.js, mappa-per-agenti.md, parametri.js +1"
Cohesion: 0.20
Nodes (22): Novità del coach v2, COACH_PARAMETRI, vincoliSicurezza(), numeroEsercizi(), PARAM_NUMERO_ESERCIZI, pausaMediaPerTipo(), serieEffettive(), stimaEsercizi() (+14 more)

### Community 136 - "Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js"
Cohesion: 0.15
Nodes (9): assert, { caricaApp, radice }, COMMENTO, filesDi(), fs, ORFANE, path, SEMINA_ORFANE (+1 more)

### Community 137 - "Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04) · js/dati/attributi-esercizi.js + struttura-pro.js"
Cohesion: 0.15
Nodes (21): strSquatDoppio(), ATTREZZI_ESERCIZIO, ATTRIBUTI, attributi(), _attributiEspansi(), classeTecnica(), CLASSI_TECNICA, contaVolume() (+13 more)

### Community 138 - "Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + catalogo-regole.js, soglie-coach.md, ARCHITETTURA.md"
Cohesion: 0.19
Nodes (16): Catalogo delle regole generato dalla mappa (npm run catalogo), Soglie del coach, `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia), `SOGLIE_REGIA` — `js/coach/regia/soglie-regia.js` (regista), COACH_REGOLE, COACH_REGOLE_PER_CODICE, COACH_SQUADRA, regolaDescritta() (+8 more)

### Community 139 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 3) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.22
Nodes (9): 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali, 1.8 Cosa programmano per i naturali gli allenatori contemporanei (+1 more)

### Community 140 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.22
Nodes (9): 3. Matrice fastidio → modifica, Anca, Caviglia (non cercato sul web: conoscenza del modello, Convenzione), Collo (assente oggi dal coach; base [V] solo sull'esercizio per il dolore cronico, il resto conoscenza del modello, Convenzione), Ginocchio, Gomito, Polso, Schiena bassa (+1 more)

### Community 141 - "collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.29
Nodes (7): analizza(), costruisci(), datiPerBuild(), eseguiMatrice(), pesoProfilo(), r1(), tabellaSettimana()

### Community 142 - "Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js"
Cohesion: 0.36
Nodes (8): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), bindBiaInputs(), ensurePdfJs()

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.15
Nodes (13): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+5 more)

### Community 144 - "Importazione CSV di altre app · js/ui/importa-csv.js"
Cohesion: 0.44
Nodes (8): ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV(), secondiCSV()

### Community 147 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 148 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 3) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.25
Nodes (8): 3.1 Petto, 3.2 Schiena, 3.3 Spalle, 3.4 Braccia, 3.5 Gambe e glutei, 3.6 Core, 3.7 Casa: set minimi, 3. Matrice muscolo → esercizi migliori

### Community 149 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati (parte 2) · docs/ricerca-specializzazione-punti-deboli.md + onboarding.js"
Cohesion: 0.22
Nodes (9): 5.1 Chi ci può accedere (SPE-03), 5.2 La ricetta, in otto passi, 5.3 Come innestarla su ogni split, 5.4 Esercizi per priorità (nomi della libreria attuale `libreria-esercizi.js`), 5.5 Durata e regola di uscita (SPE-08), 5. Programma di specializzazione, 7. Audit delle regole esistenti, ricettaPunti() (+1 more)

### Community 150 - "Coach: psicologia (parte 2) · js/coach/psicologia.js + onboarding.js, lettore.js, onboarding-risultato.js"
Cohesion: 0.36
Nodes (8): analyzeBia(), onbMomento(), onbPsico(), renderPsicoStep(), onbData, onbPick(), optHtml(), renderOnbResult()

### Community 151 - "04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md + utility.js, piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (12): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.2 Dati sul dispositivo, import e XSS (+4 more)

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 153 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) (parte 2) · docs/ricerca-casa-poco-tempo.md"
Cohesion: 0.29
Nodes (7): 4.1 Kit a gradini ([M], Convenzione), 4.2 Cosa si allena bene e cosa no, per muscolo ([M]), 4.3 Manubri regolabili: cosa chiedere all'utente, 4.4 Sicurezza senza spotter ([M], Convenzione, coerente con l'errore di stima del RIR [R]), 4.5 Kettlebell (programmi noti, nessuno verificato), 4.6 Viaggio e hotel, 4. Kit minimi e cosa si può allenare

### Community 154 - "Condividi e stampa la scheda · js/ui/stampa-scheda.js + traduttore.js, fogli.js, schede-esercizio.js"
Cohesion: 0.42
Nodes (8): I18N, tr(), scaricaFile(), testoRicercaVideo(), condividiScheda(), righeScheda(), stampaScheda(), testoScheda()

### Community 155 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 156 - "Coach: biomeccanica · js/coach/biomeccanica.js"
Cohesion: 0.53
Nodes (5): htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), TEST_FAI_DA_TE

### Community 157 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 4) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.40
Nodes (5): 5.1 Scala del dolore, 5.2 Prontezza e tetti di sforzo, 5.3 Rampe di rientro, 5.4 Quando il coach deve dire «medico», 5. Soglie di prudenza

### Community 158 - "collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (5): contaSerie(), gruppoDi(), modello(), secTut(), stimaMinuti()

### Community 159 - "Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3) · js/coach/regia/fasi.js + regole-ricerca.js"
Cohesion: 0.60
Nodes (4): eseguiFasi(), FASI_PUNTI, fasiRegistrate(), applicaCaricoProgressivo()

### Community 160 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 4) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.50
Nodes (4): 7.1 Tabella, 7.2 I casi della gap analysis, spiegati dal codice, 7.3 Cosa il codice fa già bene, 7. Audit delle regole esistenti

## Knowledge Gaps
- **932 isolated node(s):** `ATTR`, `0. Come si legge`, `B10. Over 65`, `B11. Modello dei tempi`, `B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08)` (+927 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1041 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + mi-sento-male.js, costanti.js, seduta.js +19` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, repertorio.js, traduttore.js +5`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +2`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +7`, `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + stato.js, oggi.js, metodi-momenti.js +9`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +3`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +4`, `Piano: scelta del giorno · js/ui/piano/giorno.js + figura-anatomica.js, aggiungi-allenamento.js, riposo-settimane.js +2`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 78 inferred relationships involving `Novità del coach v2` (e.g. with `e1rm()` and `e1rmSeduta()`) actually correct?**
  _`Novità del coach v2` has 78 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ATTR`, `0. Come si legge`, `B10. Over 65` to the rest of the system?**
  _932 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +5` be split into smaller, more focused modules?**
  _Cohesion score 0.10087082728592163 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + stato.js, oggi.js, metodi-momenti.js +9` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +5`, `Piano: scelta del giorno · js/ui/piano/giorno.js + figura-anatomica.js, aggiungi-allenamento.js, riposo-settimane.js +2`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + mi-sento-male.js, costanti.js, seduta.js +19`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + regole-ricerca.js, ricerca-mesocicli-periodizzazione-scarichi.md, archivio.js +11`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +2`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + calibrazione.js, costanti.js, schede-pronte.js`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, storage.js, navigazione.js +3`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +3`, `Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + tecniche.js, ricette.js, tempo.js +12`, `Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + taratura.js, questionario-decisioni.js, regole-ricerca.js`, `Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, calibrazione.js, parametri.js +1`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, seduta-libera.js, storage.js +11`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, riepilogo.js +7`, `Disegni degli esercizi · js/dati/disegni-esercizi.js + scheda-unica.js, schede-esercizio.js, traduttore.js`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14772727272727273 - nodes in this community are weakly interconnected._
- **Why does `renderPiano()` connect `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, seduta-libera.js, storage.js +11` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, libreria-esercizi.js +5`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Schede tecniche per esercizio · js/dati/schede-tecniche.js + scheda-quattro-sezioni.js, schede-esercizio.js, schede-varianti.js`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, storage.js, navigazione.js +3`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + calibrazione.js, costanti.js, schede-pronte.js`, `Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + tecniche.js, ricette.js, tempo.js +12`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js`, `Piano: scelta del giorno · js/ui/piano/giorno.js + figura-anatomica.js, aggiungi-allenamento.js, riposo-settimane.js +2`, `Dati: importazione dei progressi · js/ui/importa-progressi.js + biomeccanica.js, ricerca-riscaldamento-mobilita-prevenzione.md, questionario-decisioni.js +3`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._