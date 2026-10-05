# Graph Report - 3in  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1630 nodes · 5411 edges · 81 communities (72 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eee73a43`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Navigazione: giorni e tab · js/core/navigazione.js + schede-pronte.js, costanti.js, figura-anatomica.js
- Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, consenso.js +8
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md +2
- Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6
- Coach: agente dei consigli · js/coach/agente-consigli.js + repertorio.js, esigenza.js, regole-ricerca.js +9
- Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + scheda-quattro-sezioni.js, schede-esercizio.js, disegni-esercizi.js +2
- Strumento: mappa dei simboli globali · tools/simboli.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + utility.js, impostazioni.js
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +5
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, annulla.js, storage.js +11
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, psicologia.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md
- Manifest della PWA · manifest.json
- Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, regole-ricerca.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +6
- Mappa per agenti · docs/mappa-per-agenti.md
- Tema chiaro «Braci su pietra» · docs/tema-chiaro.md + opzioni.js, peso.js, storage.js +3
- Test: struttura e avvio · tests/struttura.test.js + avvio.test.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Suono con il telefono in silenzioso · js/core/audio-silenzioso.js + musica-altre-app.js, impostazioni.js
- Strumento: aggiornamento del grafo · tools/grafo.js
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, 04-sicurezza-privacy.md, piano-lancio-appstore.md +2
- package.json (script npm) · package.json
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, fogli.js, stampa-scheda.js +2
- Strumento: indice del codice · tools/indice.js
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, schemi.js, compone.js +3
- Ponte nativo (Capacitor) · js/core/nativo.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, psicologia.js, onboarding.js
- package.json (script npm) (parte 2) · package.json
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, stato.js, metodi-momenti.js +5
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +6
- Coach IA (Worker, con consenso) · js/coach/coach-ia.js + termina-e-cardio.js, mi-sento-male.js, sessione-completata.js +2
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + gruppi.js, mese.js, scambio.js +2
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3
- Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js
- Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, psicologia.js
- 3in · README.md
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Coach: intensità (INT) · js/coach/intensita.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, traduttore.js +2
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Coach: prontezza prima della seduta · js/coach/prontezza.js + regole-nuove.js, coach-mappa-regole.md, ricerca-struttura-e-intensita.md +1
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Coach: carico di partenza · js/coach/carichi/partenza.js + libreria-esercizi.js, figura-anatomica.js, lavoro-cronometro.js
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Schermata Oggi · js/ui/oggi.js + termina-e-cardio.js, importa-progressi.js, regole-ricerca.js +3
- Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + biomeccanica.js, questionario-decisioni.js, onboarding.js +1
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Calendario: menu della settimana · js/ui/menu-settimana.js + esporta-ics.js, mese.js, scambio.js +1
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Coach: schemi di movimento · js/coach/programma/schemi.js + parametri.js, riepilogo.js
- Sicurezza (documento) · docs/SICUREZZA.md
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js

## God Nodes (most connected - your core abstractions)
1. `loadData()` - 105 edges
2. `renderAllenamento()` - 93 edges
3. `currentDay` - 73 edges
4. `renderPiano()` - 72 edges
5. `showUndo()` - 64 edges
6. `ymd()` - 63 edges
7. `buildProgram()` - 61 edges
8. `getProfile()` - 54 edges
9. `findExercise()` - 53 edges
10. `escapeHtml()` - 52 edges

## Surprising Connections (you probably didn't know these)
- `0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo` --references--> `getAudioCtx()`  [INFERRED]
  docs/piano-lancio-appstore.md → js/core/utility.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderSettings()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/psicologia.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderAllenamento()`  [INFERRED]
  docs/mappa-per-agenti.md → js/ui/allenamento/seduta.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderMonthCal()`  [INFERRED]
  docs/mappa-per-agenti.md → js/ui/calendario/gruppi.js
- `Schermate (tab) → funzione d'ingresso → file` --references--> `renderPiano()`  [INFERRED]
  docs/mappa-per-agenti.md → js/ui/piano/aggiungi-allenamento.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (81 total, 9 thin omitted)

### Community 0 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.08
Nodes (26): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+18 more)

### Community 1 - "Navigazione: giorni e tab · js/core/navigazione.js + schede-pronte.js, costanti.js, figura-anatomica.js"
Cohesion: 0.24
Nodes (9): currentTab, DEFAULT_MONDAY_PROGRAM, daysContainer, renderDayBar(), selectDay(), applyTemplateFromGroups(), applyTemplate(), closeTemplatePicker() (+1 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, consenso.js +8"
Cohesion: 0.07
Nodes (65): analyzeBia(), applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), fattoreFisico() (+57 more)

### Community 3 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md +2"
Cohesion: 0.18
Nodes (18): Tema all'avvio (niente flash), sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, temaRisolto(), THEME_KEY, applicaZoom(), applyTheme() (+10 more)

### Community 5 - "Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6"
Cohesion: 0.14
Nodes (42): getDayTitle(), escapeHtml(), jsArg(), closePlates(), planDayClick(), weeklyVolumeByGroup(), closeWeekSheet(), openWeekSheet() (+34 more)

### Community 6 - "Coach: agente dei consigli · js/coach/agente-consigli.js + repertorio.js, esigenza.js, regole-ricerca.js +9"
Cohesion: 0.14
Nodes (32): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), getProfile(), settimanaProgramma() (+24 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js"
Cohesion: 0.10
Nodes (43): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), GUIDA, guidaAttiva(), guidaAvanti() (+35 more)

### Community 8 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + scheda-quattro-sezioni.js, schede-esercizio.js, disegni-esercizi.js +2"
Cohesion: 0.10
Nodes (38): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusEsercizio(), lavoroDaSostituire(), MULTIARTICOLARI_TOTALI (+30 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (29): acorn, aggiungiUso(), alCaricamento, analizzaUsi(), appFiles, ast, datiJson, defs (+21 more)

### Community 10 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + utility.js, impostazioni.js"
Cohesion: 0.28
Nodes (12): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+4 more)

### Community 11 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +5"
Cohesion: 0.08
Nodes (53): Schermate (tab) → funzione d'ingresso → file, 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti (+45 more)

### Community 12 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.33
Nodes (3): PAR: carico di partenza dai dati del corpo, INT-01 stato del corpo dalla BIA (angolo di fase, ECW/TBW): bandiere di prudenza, PAR-01..05 carico di partenza stimato da massa muscolare e storico

### Community 13 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, annulla.js, storage.js +11"
Cohesion: 0.15
Nodes (34): restartOnboarding(), applyGeneratedProgram(), riduciFrequenza(), azioneCoach(), cambiaSerieNelPiano(), conAnnulla(), prefsCoach(), rispostaAderenza() (+26 more)

### Community 15 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, psicologia.js"
Cohesion: 0.18
Nodes (20): apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento(), chiediMomento() (+12 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md"
Cohesion: 0.17
Nodes (13): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, MET: metodi famosi e scelta della struttura, PRG: costruzione del programma (+5 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js"
Cohesion: 0.17
Nodes (10): Catalogo delle regole generato dalla mappa (npm run catalogo), Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), COACH_REGOLE (+2 more)

### Community 20 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, regole-ricerca.js"
Cohesion: 0.15
Nodes (27): caricoProssimo(), consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), AGG_KEY(), aggiustiCoach(), applicaDecisioni() (+19 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +6"
Cohesion: 0.15
Nodes (45): currentDay, activateMode(), armedSet, loadData(), saveData(), seedDefaultsIfNeeded(), annullaCedimento(), toggleSetDone() (+37 more)

### Community 22 - "Mappa per agenti · docs/mappa-per-agenti.md"
Cohesion: 0.40
Nodes (4): Come cercare (in quest'ordine), Mappa per agenti, Nomi in posti inattesi, Stile

### Community 23 - "Tema chiaro «Braci su pietra» · docs/tema-chiaro.md + opzioni.js, peso.js, storage.js +3"
Cohesion: 0.09
Nodes (38): Aperti, non verificati, idee, Come è stato verificato, Commit di riferimento, Decisione, Dove vive, Regole d'uso (per chi modifica i colori), Tema chiaro «Braci su pietra», Valori del chiaro (+30 more)

### Community 24 - "Test: struttura e avvio · tests/struttura.test.js + avvio.test.js"
Cohesion: 0.11
Nodes (15): assert, fs, path, test, acorn, assert, fs, html (+7 more)

### Community 25 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 26 - "Suono con il telefono in silenzioso · js/core/audio-silenzioso.js + musica-altre-app.js, impostazioni.js"
Cohesion: 0.50
Nodes (4): mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), BYPASS_KEY

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 29 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + importa-csv.js, 04-sicurezza-privacy.md, piano-lancio-appstore.md +2"
Cohesion: 0.07
Nodes (40): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+32 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.18
Nodes (11): scripts, catalogo, controlla, grafo, grafo:verifica, indice, simboli, sw (+3 more)

### Community 31 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, fogli.js, stampa-scheda.js +2"
Cohesion: 0.10
Nodes (46): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ricaricaApp(), ripristinaBackup() (+38 more)

### Community 33 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 34 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, schemi.js, compone.js +3"
Cohesion: 0.16
Nodes (31): TOCCHI, buildProgram(), _n(), PRIORI, RICETTE, rngDa(), SLOT_DEF, schemaDi() (+23 more)

### Community 35 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, psicologia.js, onboarding.js"
Cohesion: 0.31
Nodes (13): htmlTestFaiDaTe(), setTest(), ritrattoCoach(), PROFILE_KEY(), ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach() (+5 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.20
Nodes (8): codici, dest, doppi, fs, md, path, R, voci

### Community 40 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, stato.js, metodi-momenti.js +5"
Cohesion: 0.16
Nodes (28): fineMomento(), momentoAttivo(), prontezzaBassaSettimana(), aderenzaDueSettimane(), corpoCoach(), htmlAderenza(), htmlOrario(), htmlSedutaSaltata() (+20 more)

### Community 41 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.31
Nodes (19): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+11 more)

### Community 43 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +6"
Cohesion: 0.07
Nodes (88): Flussi principali, FAILURE_SET_SECONDS, fermaCanaleMultimediale(), tipoSessione(), activeSourceTab, AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE (+80 more)

### Community 45 - "Coach IA (Worker, con consenso) · js/coach/coach-ia.js + termina-e-cardio.js, mi-sento-male.js, sessione-completata.js +2"
Cohesion: 0.13
Nodes (34): 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, aggiornaBoxIA(), chiamaCoachIA(), closeDoneView(), coachIAAttivo(), commentaSeduta(), contestoSeduta(), deviceIA() (+26 more)

### Community 46 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + gruppi.js, mese.js, scambio.js +2"
Cohesion: 0.17
Nodes (32): alert(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcFillMonth() (+24 more)

### Community 49 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 51 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.26
Nodes (20): Nativo, RECOVERY_RING_CIRCUMFERENCE, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero() (+12 more)

### Community 52 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 54 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3"
Cohesion: 0.11
Nodes (29): respiroPer(), arrotonda(), esito(), frenoBia(), incrementoPer(), ultimeSessioni(), mancavaSoloUltimaSerie(), applicaCaricoProgressivo() (+21 more)

### Community 55 - "Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js"
Cohesion: 0.13
Nodes (19): alt(), assert, bersaglio(), c, DETTAGLI, famiglia(), fs, g() (+11 more)

### Community 57 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, psicologia.js"
Cohesion: 0.20
Nodes (24): sedutaPianoB(), avviaTempoSeduta(), fermaTempoSeduta(), backToDayPicker(), openWorkoutDay(), renderWorkoutDayPicker(), annullaSpeciale(), apriSedutaLibera() (+16 more)

### Community 59 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js"
Cohesion: 0.23
Nodes (22): normalizeExerciseRecord(), trEs(), alternativeOggi(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato() (+14 more)

### Community 60 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 61 - "Coach: intensità (INT) · js/coach/intensita.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md"
Cohesion: 0.26
Nodes (11): INT: intensità da BIA e prime sedute, INT-02 esigenza di partenza 120/100/95%, INT-04 prima volta con un esercizio: una serie in meno, +1 RIR, INT-03 una ripetizione in riserva in più con due bandiere, esigenzaIniziale(), FA_MEDIA, faRiferimento(), PARAM_INTENSITA (+3 more)

### Community 62 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, traduttore.js +2"
Cohesion: 0.12
Nodes (34): LOCALE(), graficoPeso(), renderAnno(), APP_VERSIONE, blocchiQuattroSettimane(), calcolaBlocco(), calcolaStatistiche(), cercaAggiornamento() (+26 more)

### Community 63 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 64 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + regole-nuove.js, coach-mappa-regole.md, ricerca-struttura-e-intensita.md +1"
Cohesion: 0.19
Nodes (21): TEC-07 tetto alle tecniche al cedimento (RIC-04), COACH_PARAMETRI, applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato (+13 more)

### Community 65 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 66 - "Coach: carico di partenza · js/coach/carichi/partenza.js + libreria-esercizi.js, figura-anatomica.js, lavoro-cronometro.js"
Cohesion: 0.26
Nodes (14): arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza(), scalaDaCorpo(), scalaDaStorico(), stimaCaricoIniziale() (+6 more)

### Community 67 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 68 - "Schermata Oggi · js/ui/oggi.js + termina-e-cardio.js, importa-progressi.js, regole-ricerca.js +3"
Cohesion: 0.30
Nodes (14): sessioniConData(), strainSettimane(), loadHistory(), minutiCardioSettimana(), renderCardioStat(), confermaImportProgressi(), mostraAnteprimaImport(), categoriaDi() (+6 more)

### Community 69 - "Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js"
Cohesion: 0.26
Nodes (16): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, setPsico() (+8 more)

### Community 72 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 74 - "07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 75 - "08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 76 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 77 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + biomeccanica.js, questionario-decisioni.js, onboarding.js +1"
Cohesion: 0.16
Nodes (19): bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), htmlProva(), SCALE_DOLORE, stabile(), TEST_FAI_DA_TE, alternativeStessoMuscolo() (+11 more)

### Community 79 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 80 - "Calendario: menu della settimana · js/ui/menu-settimana.js + esporta-ics.js, mese.js, scambio.js +1"
Cohesion: 0.20
Nodes (24): daYmd(), loadCal(), saveCal(), scambiaNelCalendario(), aggiornaAiutoIcs(), buildIcs(), exportIcs(), icsData() (+16 more)

### Community 81 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 83 - "Coach: schemi di movimento · js/coach/programma/schemi.js + parametri.js, riepilogo.js"
Cohesion: 0.17
Nodes (13): regolaAttiva(), REGOLE_SPEGNIBILI, GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, inAllungamento(), ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO (+5 more)

### Community 85 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 87 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 89 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.53
Nodes (5): attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

## Knowledge Gaps
- **271 isolated node(s):** `1. Flusso di lavoro`, `2. Principi visivi`, `3. Modello di prompt (due pose affiancate, una sola generazione)`, `4. Lavorazione del file (lato Claude)`, `5. Collegamento nell'app` (+266 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 317 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `switchTab()` connect `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, annulla.js, storage.js +11` to `Navigazione: giorni e tab · js/core/navigazione.js + schede-pronte.js, costanti.js, figura-anatomica.js`, `Schermata Oggi · js/ui/oggi.js + termina-e-cardio.js, importa-progressi.js, regole-ricerca.js +3`, `Coach: psicologia · js/coach/psicologia.js + stile-iphone.js, impostazioni.js`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +6`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + gruppi.js, mese.js, scambio.js +2`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + sessione.js, seduta.js, psicologia.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, traduttore.js +2`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `1. Flusso di lavoro`, `2. Principi visivi`, `3. Modello di prompt (due pose affiancate, una sola generazione)` to the rest of the system?**
  _271 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1` be split into smaller, more focused modules?**
  _Cohesion score 0.07549361207897794 - nodes in this community are weakly interconnected._
- **Why does `renderOggi()` connect `Schermata Oggi · js/ui/oggi.js + termina-e-cardio.js, importa-progressi.js, regole-ricerca.js +3` to `Coach: carico di partenza · js/coach/carichi/partenza.js + libreria-esercizi.js, figura-anatomica.js, lavoro-cronometro.js`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, schemi.js, compone.js +3`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6`, `Coach: agente dei consigli · js/coach/agente-consigli.js + repertorio.js, esigenza.js, regole-ricerca.js +9`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + mese.js, stato.js, metodi-momenti.js +5`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + scheda-quattro-sezioni.js, schede-esercizio.js, disegni-esercizi.js +2`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +5`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + repertorio.js, annulla.js, storage.js +11`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + gruppi.js, mese.js, scambio.js +2`, `Calendario: menu della settimana · js/ui/menu-settimana.js + esporta-ics.js, mese.js, scambio.js +1`, `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + dolore-mattina.js, regole-ricerca.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +6`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, traduttore.js +2`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, fogli.js, stampa-scheda.js +2`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, consenso.js +8` be split into smaller, more focused modules?**
  _Cohesion score 0.0676056338028169 - nodes in this community are weakly interconnected._
- **Why does `renderAllenamento()` connect `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, lavoro-cronometro.js, seduta-libera.js +6` to `Coach: carico di partenza · js/coach/carichi/partenza.js + libreria-esercizi.js, figura-anatomica.js, lavoro-cronometro.js`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, schemi.js, compone.js +3`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, tema-iniziale.js, tema-chiaro.md +2`, `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6`, `Coach: agente dei consigli · js/coach/agente-consigli.js + repertorio.js, esigenza.js, regole-ricerca.js +9`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + scheda-quattro-sezioni.js, schede-esercizio.js, disegni-esercizi.js +2`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +6`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + gruppi-muscolari.js, metodo-illustrazioni-esercizi.md, elenco-esercizi.js +5`, `Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + biomeccanica.js, questionario-decisioni.js, onboarding.js +1`, `Coach IA (Worker, con consenso) · js/coach/coach-ia.js + termina-e-cardio.js, mi-sento-male.js, sessione-completata.js +2`, `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, storico.js, traduttore.js +2`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `Piano: scelta del giorno · js/ui/piano/giorno.js + selezione-multipla.js, aggiungi-allenamento.js, utility.js +6` be split into smaller, more focused modules?**
  _Cohesion score 0.13535353535353536 - nodes in this community are weakly interconnected._