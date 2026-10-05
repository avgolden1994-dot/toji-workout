# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1660 nodes · 5518 edges · 89 communities (79 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8abc9d1d`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, schede-tecniche.js, scheda-unica.js +6
- Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, struttura-pro.js, compone.js
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md
- Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, aggiungi-allenamento.js, costanti.js +5
- BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js +4
- Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1
- Strumento: mappa dei simboli globali · tools/simboli.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, utility.js, stato-condiviso.js +1
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +6
- Prossima seduta, fatica muscolare e anno · js/ui/progressi/riepilogo.js + statistiche.js, repertorio.js, mese.js +8
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, costanti.js, questionario-decisioni.js +7
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + intensita.js, ricerca-struttura-e-intensita.md, esigenza.js +2
- Manifest della PWA · manifest.json
- Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, prontezza.js, regole-ricerca.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + seduta-libera.js, macchinario-occupato.js, storage.js
- Coach: prontezza prima della seduta · js/coach/prontezza.js + termina-e-cardio.js, mi-sento-male.js
- Tema chiaro «Braci su pietra» · docs/tema-chiaro.md
- Test: struttura e avvio · tests/struttura.test.js + avvio.test.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + costanti.js, stato-condiviso.js, cedimento.js
- Strumento: aggiornamento del grafo · tools/grafo.js
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + seduta-libera.js, psicologia.js, schermo-acceso.js +1
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, 04-sicurezza-privacy.md +5
- package.json (script npm) · package.json
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +2
- Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js
- Strumento: indice del codice · tools/indice.js
- Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, biomeccanica.js, struttura-pro.js +7
- Ponte nativo (Capacitor) · js/core/nativo.js + gesti.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, metodi-momenti.js, opzioni.js +4
- package.json (script npm) (parte 2) · package.json
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, traduttore.js +1
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js +1
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md, utility.js
- Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, copia-settimana.js, mappa-per-agenti.md +2
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + stato.js, annulla.js, impostazioni.js +2
- Timer di recupero e orologio · js/ui/allenamento/timer-recupero.js + timer-pannello.js, stato-condiviso.js, nativo.js
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md
- Coach: mi sento male in seduta · js/coach/mi-sento-male.js + index.html, questionario-decisioni.js, musica-altre-app.js +3
- Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + schede-pronte.js, navigazione.js, sessione.js +6
- 3in · README.md
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js, figura-anatomica.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + scambio.js, gruppi.js, mese.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Mappa per agenti · docs/mappa-per-agenti.md
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +4
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 105 edges
2. `renderAllenamento()` - 93 edges
3. `currentDay` - 74 edges
4. `renderPiano()` - 72 edges
5. `showUndo()` - 66 edges
6. `ymd()` - 65 edges
7. `buildProgram()` - 61 edges
8. `getProfile()` - 55 edges
9. `findExercise()` - 54 edges
10. `escapeHtml()` - 53 edges

## Surprising Connections (you probably didn't know these)
- `Come è stato verificato` --references--> `guidaDatiDemo()`  [INFERRED]
  docs/tema-chiaro.md → js/ui/guida-interattiva.js
- `6. Mappa muscolare (già fatta)` --references--> `renderBodyMap()`  [INFERRED]
  docs/metodo-illustrazioni-esercizi.md → js/ui/figura-anatomica.js
- `0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo` --references--> `getAudioCtx()`  [INFERRED]
  docs/piano-lancio-appstore.md → js/core/utility.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderSettings()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/psicologia.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderAllenamento()`  [INFERRED]
  docs/mappa-per-agenti.md → js/ui/allenamento/seduta.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (89 total, 10 thin omitted)

### Community 0 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.16
Nodes (14): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+6 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, schede-tecniche.js, scheda-unica.js +6"
Cohesion: 0.11
Nodes (35): consigliCoach2(), respiroPer(), arrotonda(), esito(), frenoBia(), incrementoPer(), ultimeSessioni(), caricoProssimo() (+27 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3"
Cohesion: 0.09
Nodes (56): analyzeBia(), applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), fattoreFisico() (+48 more)

### Community 3 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, struttura-pro.js, compone.js"
Cohesion: 0.11
Nodes (23): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+15 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md"
Cohesion: 0.22
Nodes (15): Tema all'avvio (niente flash), tieniSchermoAcceso(), WAKE_KEY, temaRisolto(), THEME_KEY, applicaZoom(), applyTheme(), AUTOCLOSE_KEY (+7 more)

### Community 5 - "Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, aggiungi-allenamento.js, costanti.js +5"
Cohesion: 0.14
Nodes (40): currentDay, selectDay(), armedSet, alert(), planDayClick(), closeWeekSheet(), openPlanDay(), renderPiano() (+32 more)

### Community 6 - "BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js +4"
Cohesion: 0.17
Nodes (24): closeAgent(), consigliAgente(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), eliminaBia(), openBiaSheet() (+16 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js"
Cohesion: 0.10
Nodes (43): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), GUIDA, guidaAttiva(), guidaAvanti() (+35 more)

### Community 8 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1"
Cohesion: 0.13
Nodes (32): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), GLOSSARIO, openExerciseInfo(), EMOJI_TESTA, exInfoNome (+24 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, utility.js, stato-condiviso.js +1"
Cohesion: 0.20
Nodes (17): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), testSound() (+9 more)

### Community 11 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +6"
Cohesion: 0.10
Nodes (55): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), escapeHtml(), jsArg(), buildExerciseSelect(), EXERCISE_LIBRARY, MUSCLE_GROUPS (+47 more)

### Community 12 - "Prossima seduta, fatica muscolare e anno · js/ui/progressi/riepilogo.js + statistiche.js, repertorio.js, mese.js +8"
Cohesion: 0.20
Nodes (25): aggiornaEsigenza(), htmlPrimiPassi(), livelloStimato(), sedutaSaltata(), strainSettimane(), ultimoGiornoAllenamento(), fattoQuestaSettimana(), minutiCardioSettimana() (+17 more)

### Community 13 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, costanti.js, questionario-decisioni.js +7"
Cohesion: 0.15
Nodes (33): progKey(), applicaDecisioni(), inviaQuestionario(), riduciFrequenza(), azioneCoach(), cambiaSerieNelPiano(), conAnnulla(), prefsCoach() (+25 more)

### Community 15 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js"
Cohesion: 0.22
Nodes (17): apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento(), chiediMomento() (+9 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + intensita.js, ricerca-struttura-e-intensita.md, esigenza.js +2"
Cohesion: 0.08
Nodes (34): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+26 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js"
Cohesion: 0.17
Nodes (10): Catalogo delle regole generato dalla mappa (npm run catalogo), Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), COACH_REGOLE (+2 more)

### Community 20 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, prontezza.js, regole-ricerca.js"
Cohesion: 0.16
Nodes (24): consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), applicaProntezza(), AGG_KEY(), aggiustiCoach(), apriQuestionario() (+16 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + seduta-libera.js, macchinario-occupato.js, storage.js"
Cohesion: 0.19
Nodes (31): loadData(), saveData(), annullaCedimento(), pulisciSostituzioniVecchie(), toggleSetDone(), updateSetField(), addSetTo(), addWarmup() (+23 more)

### Community 22 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + termina-e-cardio.js, mi-sento-male.js"
Cohesion: 0.22
Nodes (23): minutiSeduta(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato, punteggioProntezza(), renderProntezza() (+15 more)

### Community 23 - "Tema chiaro «Braci su pietra» · docs/tema-chiaro.md"
Cohesion: 0.22
Nodes (8): Aperti, non verificati, idee, Come è stato verificato, Commit di riferimento, Decisione, Dove vive, Regole d'uso (per chi modifica i colori), Tema chiaro «Braci su pietra», Valori del chiaro

### Community 24 - "Test: struttura e avvio · tests/struttura.test.js + avvio.test.js"
Cohesion: 0.11
Nodes (15): assert, fs, path, test, acorn, assert, fs, html (+7 more)

### Community 25 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 26 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + costanti.js, stato-condiviso.js, cedimento.js"
Cohesion: 0.22
Nodes (18): FAILURE_SET_SECONDS, webDuration, caricaPlayerWebSalvato(), configureWebSegment(), ensureSpotifyApi(), ensureYouTubeApi(), handleWebLinkSubmit(), loadSpotifyPlayer() (+10 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + seduta-libera.js, psicologia.js, schermo-acceso.js +1"
Cohesion: 0.11
Nodes (39): sedutaPianoB(), sedutaAperta(), bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo() (+31 more)

### Community 29 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, backup.js, 04-sicurezza-privacy.md +5"
Cohesion: 0.06
Nodes (57): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+49 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.18
Nodes (11): scripts, catalogo, controlla, grafo, grafo:verifica, indice, simboli, sw (+3 more)

### Community 31 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +2"
Cohesion: 0.14
Nodes (34): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N (+26 more)

### Community 32 - "Musica: lettore fisso · js/ui/musica/lettore-fisso.js + stato-condiviso.js, player-web.js, cedimento.js"
Cohesion: 0.23
Nodes (21): currentWebMode, RECOVERY_RING_CIRCUMFERENCE, spotifyController, spotifyReady, ytPlayer, ytPlayerReady, avviaWebPronto(), startDropAudio() (+13 more)

### Community 33 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 34 - "Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, biomeccanica.js, struttura-pro.js +7"
Cohesion: 0.08
Nodes (50): bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), htmlProva(), SCALE_DOLORE, stabile(), TEST_FAI_DA_TE, COACH_PARAMETRI (+42 more)

### Community 35 - "Ponte nativo (Capacitor) · js/core/nativo.js + gesti.js"
Cohesion: 0.23
Nodes (12): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra(), attachNumberDrag(), attachRepsField() (+4 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, metodi-momenti.js, opzioni.js +4"
Cohesion: 0.25
Nodes (18): getProfile(), htmlTestFaiDaTe(), setTest(), segnaDoloreEsigenza(), fineMomento(), terminaMomento(), setPsico(), TECNICHE (+10 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.20
Nodes (8): codici, dest, doppi, fs, md, path, R, voci

### Community 40 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, traduttore.js +1"
Cohesion: 0.18
Nodes (21): psicoCoach(), aderenzaDueSettimane(), ALZATE_BASE, corpoCoach(), htmlAderenza(), htmlFineCiclo(), htmlOrario(), htmlSedutaSaltata() (+13 more)

### Community 41 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.27
Nodes (21): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+13 more)

### Community 42 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 43 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js, utility.js +1"
Cohesion: 0.16
Nodes (34): activeSourceTab, AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, failureTracks, selectedTrackId, selectedTrackUrl, formatMMSS() (+26 more)

### Community 45 - "Coach IA (Worker, con consenso) · js/coach/coach-ia.js + sessione-completata.js, piano-lancio-appstore.md, utility.js"
Cohesion: 0.21
Nodes (19): 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, aggiornaBoxIA(), chiamaCoachIA(), closeDoneView(), coachIAAttivo(), commentaSeduta(), contestoSeduta(), deviceIA() (+11 more)

### Community 46 - "Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, copia-settimana.js, mappa-per-agenti.md +2"
Cohesion: 0.18
Nodes (29): Nomi in posti inattesi, mcFillMonth(), mcPlaceTemplate(), mcMove(), calKey(), copiaSettimana(), giornoSettimana(), loadCal() (+21 more)

### Community 49 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 50 - "Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + stato.js, annulla.js, impostazioni.js +2"
Cohesion: 0.20
Nodes (14): htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), vaiAlMomento(), verificaMomento(), htmlDomandaMomento(), htmlMomentoBreve(), momentoDaChiedere() (+6 more)

### Community 51 - "Timer di recupero e orologio · js/ui/allenamento/timer-recupero.js + timer-pannello.js, stato-condiviso.js, nativo.js"
Cohesion: 0.31
Nodes (18): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+10 more)

### Community 52 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 53 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md"
Cohesion: 0.27
Nodes (9): TEC-07 tetto alle tecniche al cedimento (RIC-04), giorniDallUltimaSeduta(), gruppoInPriorita(), limitaTecnicheIntense(), mancavaSoloUltimaSerie(), prontezzaRecente(), rientroPiano(), sedutePassate() (+1 more)

### Community 54 - "Coach: mi sento male in seduta · js/coach/mi-sento-male.js + index.html, questionario-decisioni.js, musica-altre-app.js +3"
Cohesion: 0.27
Nodes (8): apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), chiudiQuestionario(), stepValue(), closeExerciseInfo(), closePlates(), toggleRecoveryExpand()

### Community 55 - "Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js"
Cohesion: 0.13
Nodes (19): alt(), assert, bersaglio(), c, DETTAGLI, famiglia(), fs, g() (+11 more)

### Community 56 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 57 - "Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + schede-pronte.js, navigazione.js, sessione.js +6"
Cohesion: 0.16
Nodes (25): applyGeneratedProgram(), activateMode(), daysContainer, renderDayBar(), getDayTitle(), historyKey(), loadTitles(), migrateLegacyDataIfNeeded() (+17 more)

### Community 59 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js, figura-anatomica.js"
Cohesion: 0.23
Nodes (21): trEs(), alternativeOggi(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato() (+13 more)

### Community 60 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 61 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + scambio.js, gruppi.js, mese.js"
Cohesion: 0.32
Nodes (18): attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcPaste(), mcRepeat() (+10 more)

### Community 62 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js"
Cohesion: 0.17
Nodes (20): calcolaBlocco(), calcolaStatistiche(), cercaAggiornamento(), closeStats(), DISCHI_KEY, graficoFrequenzaHtml(), mostraPeriodoAttivo(), poligonoFrequenzaSvg() (+12 more)

### Community 63 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 64 - "Mappa per agenti · docs/mappa-per-agenti.md"
Cohesion: 0.50
Nodes (3): Come cercare (in quest'ordine), Mappa per agenti, Stile

### Community 65 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 66 - "Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js"
Cohesion: 0.30
Nodes (14): arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza(), scalaDaCorpo(), scalaDaStorico(), stimaCaricoIniziale() (+6 more)

### Community 67 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 69 - "Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1"
Cohesion: 0.22
Nodes (19): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, TEMI (+11 more)

### Community 70 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +4"
Cohesion: 0.23
Nodes (21): Flussi principali, mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale(), tipoSessione(), dropActive, dropInterval (+13 more)

### Community 71 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 72 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 74 - "07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 75 - "08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 76 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 77 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 78 - "Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js"
Cohesion: 0.21
Nodes (19): LOCALE(), htmlPesate(), consiglioPeso(), faseCorpo(), graficoPeso(), pesiTutti(), pesoKey(), pesoObKey() (+11 more)

### Community 79 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 80 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.43
Nodes (7): aggiornaAiutoIcs(), buildIcs(), exportIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 81 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 84 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 85 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 86 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 87 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

## Knowledge Gaps
- **273 isolated node(s):** `assert`, `fs`, `http`, `MIME`, `path` (+268 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 320 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `aggiornaDopoScambio()` connect `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + scambio.js, gruppi.js, mese.js` to `Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, aggiungi-allenamento.js, costanti.js +5`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, traduttore.js +1`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js`, `Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + stato.js, annulla.js, impostazioni.js +2`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + seduta-libera.js, macchinario-occupato.js, storage.js`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `assert`, `fs`, `http` to the rest of the system?**
  _273 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, schede-tecniche.js, scheda-unica.js +6` be split into smaller, more focused modules?**
  _Cohesion score 0.11153846153846154 - nodes in this community are weakly interconnected._
- **Why does `renderAllenamento()` connect `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + seduta-libera.js, macchinario-occupato.js, storage.js` to `Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, biomeccanica.js, struttura-pro.js +7`, `Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js`, `Ponte nativo (Capacitor) · js/core/nativo.js + gesti.js`, `Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, aggiungi-allenamento.js, costanti.js +5`, `Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, metodi-momenti.js, opzioni.js +4`, `BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js +4`, `Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + audio-silenzioso.js, musica-altre-app.js, stato-condiviso.js +4`, `Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, utility.js, stato-condiviso.js +1`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +6`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md`, `Coach: prontezza prima della seduta · js/coach/prontezza.js + termina-e-cardio.js, mi-sento-male.js`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + traduttore.js, figura-anatomica.js`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + seduta-libera.js, psicologia.js, schermo-acceso.js +1`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.08591466978375219 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + oggi.js, psicologia.js, traduttore.js +1` to `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, schede-tecniche.js, scheda-unica.js +6`, `Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, guida-interattiva.js, impostazioni.js +1`, `BIA nelle opzioni · js/coach/bia/opzioni.js + agente-consigli.js, archivio.js, repertorio.js +4`, `Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, elenco-esercizi.js, giorno.js +6`, `Prossima seduta, fatica muscolare e anno · js/ui/progressi/riepilogo.js + statistiche.js, repertorio.js, mese.js +8`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, costanti.js, questionario-decisioni.js +7`, `Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js`, `Calendario: menu della settimana · js/ui/menu-settimana.js + mese.js, copia-settimana.js, mappa-per-agenti.md +2`, `Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + stato.js, annulla.js, impostazioni.js +2`, `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, prontezza.js, regole-ricerca.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + seduta-libera.js, macchinario-occupato.js, storage.js`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + schede-pronte.js, navigazione.js, sessione.js +6`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + stampa-scheda.js, backup.js, avvio-traduttore.js +2`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, struttura-pro.js, compone.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10756302521008404 - nodes in this community are weakly interconnected._