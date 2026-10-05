# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1663 nodes · 5529 edges · 79 communities (69 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 70 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `48939c6a`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, scheda-unica.js, storage.js +2
- Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + struttura-pro.js, ricerca-struttura-e-intensita.md, compone.js
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +5
- Ricerca su struttura e intensità (documento) · docs/ricerca-struttura-e-intensita.md + coach-mappa-regole.md, onboarding-risultato.js
- BIA nelle opzioni · js/coach/bia/opzioni.js + archivio.js, guida-interattiva.js
- Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1
- Strumento: mappa dei simboli globali · tools/simboli.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, utility.js
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + aggiungi-allenamento.js, gruppi-muscolari.js, giorno.js +14
- Statistiche dei carichi · js/ui/statistiche.js + copia-settimana.js, mese.js, menu-settimana.js +19
- Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + questionario-decisioni.js, repertorio.js, regole-ricerca.js
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, psicologia.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Manifest della PWA · manifest.json
- Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, riposo-settimane.js +28
- Coach: prontezza prima della seduta · js/coach/prontezza.js
- Tema chiaro «Braci su pietra» · docs/tema-chiaro.md
- Test: struttura e avvio · tests/struttura.test.js + avvio.test.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8
- Strumento: aggiornamento del grafo · tools/grafo.js
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + importa-progressi.js, backup.js, importa-csv.js +6
- package.json (script npm) · package.json
- Seduta libera e sedute extra · js/ui/seduta-libera.js + psicologia.js
- Coach: schemi di movimento · js/coach/programma/schemi.js
- Strumento: indice del codice · tools/indice.js
- Coach: biomeccanica · js/coach/biomeccanica.js + struttura-pro.js, ricette.js, schemi.js +1
- Ponte nativo (Capacitor) · js/core/nativo.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, onboarding.js
- package.json (script npm) (parte 2) · package.json
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + agente-consigli.js, regole-nuove.js, opzioni.js +7
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js +1
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + biomeccanica.js, schemi.js, repertorio.js +1
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Progressi: foto · js/ui/progressi/foto.js + peso.js, pagine.js, storage.js
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, impostazioni.js
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + parametri.js, coach-mappa-regole.md, progressivo.js +3
- Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js
- Coach IA (Worker, con consenso) · js/coach/coach-ia.js + piano-lancio-appstore.md, 04-sicurezza-privacy.md, utility.js +1
- 3in · README.md
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricette.js, onboarding.js, schemi.js +3
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js

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
- `0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo` --references--> `getAudioCtx()`  [INFERRED]
  docs/piano-lancio-appstore.md → js/core/utility.js
- `6. Mappa muscolare (già fatta)` --references--> `renderBodyMap()`  [INFERRED]
  docs/metodo-illustrazioni-esercizi.md → js/ui/figura-anatomica.js
- `Nomi in posti inattesi` --references--> `renderSettings()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/psicologia.js
- `Nomi in posti inattesi` --references--> `imparaDallaSeduta()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/regole-ricerca.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (79 total, 10 thin omitted)

### Community 0 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.26
Nodes (9): EPO-03 Arnold: schema a 6 giorni, EPO-04 Gironda 8x8, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+1 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, scheda-unica.js, storage.js +2"
Cohesion: 0.14
Nodes (27): consigliCoach2(), esito(), frenoBia(), incrementoPer(), ultimeSessioni(), caricoProssimoBase(), DOSE_SCARICO, e1rmSeduta() (+19 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3"
Cohesion: 0.08
Nodes (58): analyzeBia(), applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), fattoreFisico() (+50 more)

### Community 3 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + struttura-pro.js, ricerca-struttura-e-intensita.md, compone.js"
Cohesion: 0.17
Nodes (19): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-09 stacchi da terra al massimo 3 serie, ABB-06 superserie solo tra antagonisti, mai con un pesante (+11 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +5"
Cohesion: 0.12
Nodes (34): Tema all'avvio (niente flash), vaiAlMomento(), closeSetPage(), openSetPage(), renderSetPage(), renderSettings(), SET_PAGINE, setPsico() (+26 more)

### Community 5 - "Ricerca su struttura e intensità (documento) · docs/ricerca-struttura-e-intensita.md + coach-mappa-regole.md, onboarding-risultato.js"
Cohesion: 0.14
Nodes (3): ABB-05 3 giorni = Upper / Lower / Full Body, INT-01 stato del corpo dalla BIA (angolo di fase, ECW/TBW): bandiere di prudenza, TEC-02 negative

### Community 6 - "BIA nelle opzioni · js/coach/bia/opzioni.js + archivio.js, guida-interattiva.js"
Cohesion: 0.28
Nodes (13): closeBiaSheet(), eliminaBia(), openBiaSheet(), renderBiaSheet(), rigaBia(), salvaBiaAgente(), salvaBiaLetta(), toggleBiaManuale() (+5 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js"
Cohesion: 0.13
Nodes (33): GUIDA_BACKUP, guidaApplicaFoto(), aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), nomeCardio() (+25 more)

### Community 8 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1"
Cohesion: 0.13
Nodes (32): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), GLOSSARIO, openExerciseInfo(), EMOJI_TESTA, exInfoNome (+24 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + lavoro-cronometro.js, utility.js"
Cohesion: 0.27
Nodes (14): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+6 more)

### Community 11 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + aggiungi-allenamento.js, gruppi-muscolari.js, giorno.js +14"
Cohesion: 0.05
Nodes (106): arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza(), scalaDaCorpo(), scalaDaStorico(), stimaCaricoIniziale() (+98 more)

### Community 12 - "Statistiche dei carichi · js/ui/statistiche.js + copia-settimana.js, mese.js, menu-settimana.js +19"
Cohesion: 0.05
Nodes (132): Come cercare (in quest'ordine), Mappa per agenti, Nomi in posti inattesi, Schermate (tab) → funzione d'ingresso → file, Stile, aggiornaEsigenza(), segnaDoloreEsigenza(), fineMomento() (+124 more)

### Community 13 - "Coach: dolore la mattina dopo · js/coach/dolore-mattina.js + questionario-decisioni.js, repertorio.js, regole-ricerca.js"
Cohesion: 0.31
Nodes (12): consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), AGG_KEY(), aggiustiCoach(), applicaDecisioni(), salvaAggiusti() (+4 more)

### Community 15 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + compone.js, psicologia.js"
Cohesion: 0.20
Nodes (18): apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento(), chiediMomento() (+10 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.12
Nodes (19): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+11 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js"
Cohesion: 0.17
Nodes (10): Catalogo delle regole generato dalla mappa (npm run catalogo), Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), COACH_REGOLE (+2 more)

### Community 20 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.24
Nodes (17): apriQuestionario(), chiudiQuestionario(), decisioniCoach(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+9 more)

### Community 21 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, riposo-settimane.js +28"
Cohesion: 0.05
Nodes (154): restartOnboarding(), terminaMomento(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), applyGeneratedProgram(), switchProtocol() (+146 more)

### Community 22 - "Coach: prontezza prima della seduta · js/coach/prontezza.js"
Cohesion: 0.42
Nodes (12): applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato, punteggioProntezza(), renderProntezza() (+4 more)

### Community 23 - "Tema chiaro «Braci su pietra» · docs/tema-chiaro.md"
Cohesion: 0.22
Nodes (8): Aperti, non verificati, idee, Come è stato verificato, Commit di riferimento, Decisione, Dove vive, Regole d'uso (per chi modifica i colori), Tema chiaro «Braci su pietra», Valori del chiaro

### Community 24 - "Test: struttura e avvio · tests/struttura.test.js + avvio.test.js"
Cohesion: 0.11
Nodes (15): assert, fs, path, test, acorn, assert, fs, html (+7 more)

### Community 25 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 26 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8"
Cohesion: 0.07
Nodes (91): Flussi principali, mediaKeeper, SILENZIO_WAV, FAILURE_SET_SECONDS, avviaCanaleMultimediale(), fermaCanaleMultimediale(), tipoSessione(), activeSourceTab (+83 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (25): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+17 more)

### Community 28 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js"
Cohesion: 0.24
Nodes (18): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+10 more)

### Community 29 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + importa-progressi.js, backup.js, importa-csv.js +6"
Cohesion: 0.06
Nodes (74): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ricaricaApp(), ripristinaBackup() (+66 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.18
Nodes (11): scripts, catalogo, controlla, grafo, grafo:verifica, indice, simboli, sw (+3 more)

### Community 31 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + psicologia.js"
Cohesion: 0.36
Nodes (13): sedutaPianoB(), apriSedutaLibera(), eserciziDaNomi(), FILTRI_ATTREZZI, htmlListaLibera(), liberaDaScelta(), liberaDaStorico(), liberaSel (+5 more)

### Community 32 - "Coach: schemi di movimento · js/coach/programma/schemi.js"
Cohesion: 0.31
Nodes (8): GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, ISOLAMENTI, isolamentoDi(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), VOLUME_LIVELLO

### Community 33 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 34 - "Coach: biomeccanica · js/coach/biomeccanica.js + struttura-pro.js, ricette.js, schemi.js +1"
Cohesion: 0.19
Nodes (18): bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), htmlProva(), SCALE_DOLORE, stabile(), TEST_FAI_DA_TE, _n() (+10 more)

### Community 35 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.43
Nodes (7): annullaFineRecupero(), attivitaRecupero(), attivo(), Nativo, plugin(), programmaFineRecupero(), vibra()

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md"
Cohesion: 0.29
Nodes (5): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search

### Community 37 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + biomeccanica.js, onboarding.js"
Cohesion: 0.35
Nodes (12): htmlTestFaiDaTe(), setTest(), PROFILE_KEY(), ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach(), setCoach() (+4 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.20
Nodes (8): codici, dest, doppi, fs, md, path, R, voci

### Community 40 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + agente-consigli.js, regole-nuove.js, opzioni.js +7"
Cohesion: 0.16
Nodes (30): closeAgent(), consigliAgente(), deltaTesto(), openAgent(), renderAgent(), getProfile(), settimanaProgramma(), getProgramma() (+22 more)

### Community 41 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js +1"
Cohesion: 0.27
Nodes (8): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode(), setConsenso()

### Community 42 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 43 - "Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.33
Nodes (5): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa

### Community 45 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + biomeccanica.js, schemi.js, repertorio.js +1"
Cohesion: 0.25
Nodes (9): respiroPer(), SCHEMI_MOV, controlloSchemi(), closeExerciseInfo(), pausaConsigliata(), preferenzaEsercizio(), RESPIRO, schedaTecnica() (+1 more)

### Community 49 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 50 - "Progressi: foto · js/ui/progressi/foto.js + peso.js, pagine.js, storage.js"
Cohesion: 0.15
Nodes (30): leggiJSON(), aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci() (+22 more)

### Community 51 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, impostazioni.js"
Cohesion: 0.24
Nodes (21): RECOVERY_RING_CIRCUMFERENCE, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+13 more)

### Community 52 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 53 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + parametri.js, coach-mappa-regole.md, progressivo.js +3"
Cohesion: 0.21
Nodes (15): TEC-07 tetto alle tecniche al cedimento (RIC-04), arrotonda(), caricoProssimo(), COACH_PARAMETRI, regolaAttiva(), REGOLE_SPEGNIBILI, inAllungamento(), giorniDallUltimaSeduta() (+7 more)

### Community 55 - "Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js"
Cohesion: 0.13
Nodes (19): alt(), assert, bersaglio(), c, DETTAGLI, famiglia(), fs, g() (+11 more)

### Community 56 - "Coach IA (Worker, con consenso) · js/coach/coach-ia.js + piano-lancio-appstore.md, 04-sicurezza-privacy.md, utility.js +1"
Cohesion: 0.09
Nodes (37): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni, XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG (+29 more)

### Community 59 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + ricette.js, onboarding.js, schemi.js +3"
Cohesion: 0.18
Nodes (18): alternativeStessoMuscolo(), attrezzoDi(), consentito(), fasiProgramma(), RISCHIO, schemaMisto(), sostituto(), strutturaProgramma() (+10 more)

### Community 60 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 63 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 65 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 67 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 72 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 73 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

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

### Community 79 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 81 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 85 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 86 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 87 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 90 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js"
Cohesion: 0.32
Nodes (12): esigenzaCoach(), esigenzaEsclusa(), htmlEsigenza(), bilancioPrimeSedute(), esigenzaIniziale(), FA_MEDIA, faRiferimento(), PARAM_INTENSITA (+4 more)

## Knowledge Gaps
- **273 isolated node(s):** `Come cercare (in quest'ordine)`, `Stile`, `assert`, `fs`, `http` (+268 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 321 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderPiano()` connect `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, riposo-settimane.js +28` to `Coach: biomeccanica · js/coach/biomeccanica.js + struttura-pro.js, ricette.js, schemi.js +1`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, schede-tecniche.js +1`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + aggiungi-allenamento.js, gruppi-muscolari.js, giorno.js +14`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `Come cercare (in quest'ordine)`, `Stile`, `assert` to the rest of the system?**
  _273 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + progressivo.js, scheda-unica.js, storage.js +2` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._
- **Why does `planSwapDays()` connect `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, riposo-settimane.js +28` to `Statistiche dei carichi · js/ui/statistiche.js + copia-settimana.js, mese.js, menu-settimana.js +19`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + importa-progressi.js, backup.js, importa-csv.js +6`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.08143839238498149 - nodes in this community are weakly interconnected._
- **Why does `aggiornaDopoScambio()` connect `Statistiche dei carichi · js/ui/statistiche.js + copia-settimana.js, mese.js, menu-settimana.js +19` to `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + seduta.js, selezione-multipla.js, riposo-settimane.js +28`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +5` be split into smaller, more focused modules?**
  _Cohesion score 0.11740890688259109 - nodes in this community are weakly interconnected._