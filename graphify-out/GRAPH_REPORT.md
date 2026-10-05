# Graph Report - toji-workout  (2026-10-05)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1653 nodes · 5518 edges · 83 communities (73 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 68 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb8794d3`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-momenti.js, metodi-epoca-oro.js +2
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3
- Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + compone.js, schemi.js, questionario-decisioni.js +2
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, statistiche.js
- Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, oggi.js, esigenza.js +9
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + opzioni.js, archivio.js, costanti.js +10
- Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, seduta.js +2
- Strumento: mappa dei simboli globali · tools/simboli.js
- Piano: gruppi muscolari · js/ui/gruppi-muscolari.js + elenco-esercizi.js, figura-anatomica.js, schede-pronte.js +3
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + scambio.js, giorno.js, figura-anatomica.js +8
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, annulla.js +5
- Seduta libera e sedute extra · js/ui/seduta-libera.js + storage.js, navigazione.js, sessione.js +4
- Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + compone.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Manifest della PWA · manifest.json
- Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, dolore-mattina.js +2
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, storage.js, seduta-libera.js +10
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js, selezione-multipla.js
- Opzioni in stile Impostazioni di iPhone · js/ui/opzioni/stile-iphone.js + coach-ia.js, psicologia.js, impostazioni.js +1
- Test: struttura e avvio · tests/struttura.test.js + avvio.test.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8
- Strumento: aggiornamento del grafo · tools/grafo.js
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Dati: importazione dei progressi · js/ui/importa-progressi.js + coach-ia.js, importa-csv.js, backup.js +8
- package.json (script npm) · package.json
- Seduta libera e sedute extra (parte 2) · js/ui/seduta-libera.js + libreria-esercizi.js, psicologia.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, traduttore.js
- Strumento: indice del codice · tools/indice.js
- Coach: biomeccanica · js/coach/biomeccanica.js + schemi.js, questionario-decisioni.js
- Coach: psicologia · js/coach/psicologia.js + metodi-momenti.js, statistiche.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + mappa-per-agenti.md, tema-iniziale.js
- Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js
- package.json (script npm) (parte 2) · package.json
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + agente-consigli.js, progressivo.js, psicologia.js +3
- Consenso ai dati · js/core/consenso.js + guida-interattiva.js, utility.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- Pannello coach nel tab Piano · js/coach/pannello.js + suggeritore.js, mappa-per-agenti.md, utility.js
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, seduta.js, aggiungi-allenamento.js +6
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +8
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + nativo.js, timer-pannello.js, timer-recupero.js +3
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md, parametri.js
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, termina-e-cardio.js +5
- Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js
- 04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- 3in · README.md
- Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, ricette.js, struttura-pro.js +1
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + metodo-illustrazioni-esercizi.md
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, parametri.js, archivio.js +1

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
- `0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo` --references--> `getAudioCtx()`  [INFERRED]
  docs/piano-lancio-appstore.md → js/core/utility.js
- `Flussi principali` --references--> `sceltaMetodo()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/compone.js
- `Flussi principali` --references--> `alternativeDi()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/programma/alternative.js
- `Flussi principali` --references--> `alternativeStessoMuscolo()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/programma/motore.js
- `Flussi principali` --references--> `sostituto()`  [INFERRED]
  docs/mappa-per-agenti.md → js/coach/programma/motore.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (83 total, 10 thin omitted)

### Community 0 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-momenti.js, metodi-epoca-oro.js +2"
Cohesion: 0.07
Nodes (29): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+21 more)

### Community 1 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3"
Cohesion: 0.13
Nodes (29): respiroPer(), arrotonda(), esito(), incrementoPer(), ultimeSessioni(), caricoProssimo(), applicaCaricoProgressivo(), caricoProssimoBase() (+21 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3"
Cohesion: 0.08
Nodes (58): analyzeBia(), applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), fattoreFisico() (+50 more)

### Community 3 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + compone.js, schemi.js, questionario-decisioni.js +2"
Cohesion: 0.24
Nodes (22): TOCCHI, schemaDi(), STR_PESI, strAntagonisti(), strBilancia(), strChiave(), strCopri(), strEspinta() (+14 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, statistiche.js"
Cohesion: 0.19
Nodes (16): sedutaAperta(), tieniSchermoAcceso(), WAKE_KEY, applicaZoom(), AUTOCLOSE_KEY, BYPASS_KEY, COUNTDOWN_KEY, getSetting() (+8 more)

### Community 5 - "Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, oggi.js, esigenza.js +9"
Cohesion: 0.20
Nodes (26): getProfile(), aggiornaEsigenza(), segnaDoloreEsigenza(), fineMomento(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), terminaMomento() (+18 more)

### Community 6 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + opzioni.js, archivio.js, costanti.js +10"
Cohesion: 0.07
Nodes (55): closeBiaSheet(), eliminaBia(), openBiaSheet(), renderBiaSheet(), rigaBia(), salvaBiaAgente(), salvaBiaLetta(), toggleBiaManuale() (+47 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js"
Cohesion: 0.10
Nodes (44): GUIDA_BACKUP, guidaApplicaFoto(), avviaGuida(), chiudiGuida(), closeConsentText(), GUIDA, guidaAttiva(), guidaAvanti() (+36 more)

### Community 8 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, seduta.js +2"
Cohesion: 0.12
Nodes (35): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), GLOSSARIO, openExerciseInfo(), EMOJI_TESTA, controllaRecord() (+27 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Piano: gruppi muscolari · js/ui/gruppi-muscolari.js + elenco-esercizi.js, figura-anatomica.js, schede-pronte.js +3"
Cohesion: 0.16
Nodes (28): getDayTitle(), azzeraSezioniEsercizi(), htmlEserciziOrganizzati(), sezEsAperte, toggleSezioneEsercizi(), applyTemplateFromGroups(), renderGruppi(), usageRank() (+20 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + scambio.js, giorno.js, figura-anatomica.js +8"
Cohesion: 0.15
Nodes (39): controlloSchemi(), DAYS, escapeHtml(), MUSCLE_GROUPS, WORKOUT_TEMPLATES, aggiornaDopoScambio(), attachSwapDrag(), planDayClick() (+31 more)

### Community 12 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, annulla.js +5"
Cohesion: 0.14
Nodes (48): sceltaSaltata(), alert(), hideSnackbar(), showUndo(), attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc (+40 more)

### Community 13 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + storage.js, navigazione.js, sessione.js +4"
Cohesion: 0.16
Nodes (21): applyGeneratedProgram(), daysContainer, renderDayBar(), selectDay(), leggiJSON(), loadTitles(), saveTitles(), titlesKey() (+13 more)

### Community 15 - "Coach: metodi di allenamento e momenti (parte 2) · js/coach/metodi-momenti.js + compone.js"
Cohesion: 0.23
Nodes (14): apriTuttiMetodi(), htmlIspirazioni(), htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), applicaMomento(), chiediMomento() (+6 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.10
Nodes (20): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+12 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Documenti di architettura · docs/ARCHITETTURA.md + catalogo-regole.js, sw.js"
Cohesion: 0.17
Nodes (10): Catalogo delle regole generato dalla mappa (npm run catalogo), Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), COACH_REGOLE (+2 more)

### Community 20 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, dolore-mattina.js +2"
Cohesion: 0.09
Nodes (52): consumaAggiusti(), controlloDoloreDaFare(), htmlControlloDolore(), rispostaDolore(), apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta() (+44 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, storage.js, seduta-libera.js +10"
Cohesion: 0.16
Nodes (45): applicaDecisioni(), cambiaSerieNelPiano(), sostituisciNelPiano(), currentDay, activateMode(), armedSet, dataKey(), loadData() (+37 more)

### Community 22 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js, selezione-multipla.js"
Cohesion: 0.23
Nodes (22): normalizeExerciseRecord(), trP(), alternativeOggi(), chiudiOccupato(), copiaRecord(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato() (+14 more)

### Community 23 - "Opzioni in stile Impostazioni di iPhone · js/ui/opzioni/stile-iphone.js + coach-ia.js, psicologia.js, impostazioni.js +1"
Cohesion: 0.30
Nodes (11): htmlPrivacyIA(), setCoachIA(), TESTI_IA, renderSettings(), FLASH_KEY, SET_ICO, setGroup(), setIco() (+3 more)

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

### Community 28 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 29 - "Dati: importazione dei progressi · js/ui/importa-progressi.js + coach-ia.js, importa-csv.js, backup.js +8"
Cohesion: 0.06
Nodes (71): XSS, import e CSP, 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.2 Dati sul dispositivo, import e XSS, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice (+63 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.18
Nodes (11): scripts, catalogo, controlla, grafo, grafo:verifica, indice, simboli, sw (+3 more)

### Community 31 - "Seduta libera e sedute extra (parte 2) · js/ui/seduta-libera.js + libreria-esercizi.js, psicologia.js"
Cohesion: 0.28
Nodes (15): sedutaPianoB(), buildExerciseSelect(), EXERCISE_LIBRARY, apriSedutaLibera(), eserciziDaNomi(), FILTRI_ATTREZZI, htmlListaLibera(), liberaDaScelta() (+7 more)

### Community 32 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, traduttore.js"
Cohesion: 0.31
Nodes (15): riduciFrequenza(), confirm(), deleteWeek(), isoWeekLabel(), loadRestDays(), loadWeeks(), renderWeeks(), restKey() (+7 more)

### Community 33 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 34 - "Coach: biomeccanica · js/coach/biomeccanica.js + schemi.js, questionario-decisioni.js"
Cohesion: 0.24
Nodes (11): bonusBiomecc(), CUE_SCHEMA, cueEsercizio(), htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), stabile() (+3 more)

### Community 35 - "Coach: psicologia · js/coach/psicologia.js + metodi-momenti.js, statistiche.js"
Cohesion: 0.26
Nodes (11): vaiAlMomento(), closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), ritrattoCoach(), SET_PAGINE (+3 more)

### Community 36 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + mappa-per-agenti.md, tema-iniziale.js"
Cohesion: 0.14
Nodes (11): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search, Come cercare (in quest'ordine), Mappa per agenti, Nomi in posti inattesi (+3 more)

### Community 37 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js"
Cohesion: 0.36
Nodes (10): TECNICHE, ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach(), setCoach(), setFreqCoach(), toggleCoach() (+2 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json"
Cohesion: 0.20
Nodes (9): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+1 more)

### Community 39 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.20
Nodes (8): codici, dest, doppi, fs, md, path, R, voci

### Community 40 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + agente-consigli.js, progressivo.js, psicologia.js +3"
Cohesion: 0.13
Nodes (32): closeAgent(), consigliAgente(), consigliCoach2(), deltaTesto(), openAgent(), renderAgent(), settimanaProgramma(), psicoCoach() (+24 more)

### Community 41 - "Consenso ai dati · js/core/consenso.js + guida-interattiva.js, utility.js"
Cohesion: 0.36
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, formatNow(), revocaConsenso(), setConsenso()

### Community 42 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 43 - "Pannello coach nel tab Piano · js/coach/pannello.js + suggeritore.js, mappa-per-agenti.md, utility.js"
Cohesion: 0.33
Nodes (4): Schermate (tab) → funzione d'ingresso → file, renderCoach(), suggestNextExercises(), jsArg()

### Community 45 - "Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, seduta.js, aggiungi-allenamento.js +6"
Cohesion: 0.12
Nodes (37): restartOnboarding(), closeExerciseInfo(), closePlates(), COLORE_DISCO, renderPlates(), setBilanciere(), iniziaOggi(), switchTab() (+29 more)

### Community 49 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.14
Nodes (13): 1. Riepilogo numeri, 2. Tabella completa, 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file, Da rivedere a fine lavoro (+5 more)

### Community 50 - "Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js"
Cohesion: 0.22
Nodes (18): LOCALE(), htmlPesate(), consiglioPeso(), faseCorpo(), graficoPeso(), pesiTutti(), pesoKey(), pesoObKey() (+10 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + nativo.js, timer-pannello.js, timer-recupero.js +3"
Cohesion: 0.10
Nodes (43): lampeggia(), playBeep(), playEnd(), playTick(), playTone(), preparaAudio(), sospendiAudioDopo(), stepValue() (+35 more)

### Community 52 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 53 - "Coach: regole RIC dalla ricerca · js/coach/regole-nuove.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md, parametri.js"
Cohesion: 0.26
Nodes (10): TEC-07 tetto alle tecniche al cedimento (RIC-04), COACH_PARAMETRI, giorniDallUltimaSeduta(), gruppoInPriorita(), limitaTecnicheIntense(), mancavaSoloUltimaSerie(), prontezzaRecente(), rientroPiano() (+2 more)

### Community 54 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, termina-e-cardio.js +5"
Cohesion: 0.15
Nodes (34): fattoQuestaSettimana(), minutiCardioSettimana(), renderCardioStat(), lunediDi(), piuGiorni(), settimaneDiFila(), annoRiassunto(), faticaMuscoli() (+26 more)

### Community 55 - "Test: muscolo bersaglio e alternative (parte 2) · tests/muscoli.test.js"
Cohesion: 0.13
Nodes (19): alt(), assert, bersaglio(), c, DETTAGLI, famiglia(), fs, g() (+11 more)

### Community 56 - "04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 59 - "Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, ricette.js, struttura-pro.js +1"
Cohesion: 0.13
Nodes (27): alternativeStessoMuscolo(), attrezzoDi(), consentito(), fasiProgramma(), RISCHIO, schemaMisto(), sostituto(), strutturaProgramma() (+19 more)

### Community 60 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 61 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

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

### Community 69 - "Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js"
Cohesion: 0.33
Nodes (12): arrotondaPartenza(), contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza(), scalaDaCorpo(), scalaDaStorico(), stimaCaricoIniziale() (+4 more)

### Community 70 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 72 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 73 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + metodo-illustrazioni-esercizi.md"
Cohesion: 0.12
Nodes (24): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html) (+16 more)

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

### Community 90 - "Coach: intensità (INT) · js/coach/intensita.js + esigenza.js, parametri.js, archivio.js +1"
Cohesion: 0.23
Nodes (16): esigenzaCoach(), esigenzaEsclusa(), htmlEsigenza(), bilancioPrimeSedute(), esigenzaIniziale(), FA_MEDIA, faRiferimento(), PARAM_INTENSITA (+8 more)

## Knowledge Gaps
- **267 isolated node(s):** `assert`, `fs`, `http`, `MIME`, `path` (+262 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 314 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderAllenamento()` connect `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + selezione-multipla.js, storage.js, seduta-libera.js +10` to `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + compone.js, schemi.js, questionario-decisioni.js +2`, `Gesti: swipe, rotella e trascinamento · js/ui/gesti.js`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, oggi.js, esigenza.js +9`, `Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js`, `Coach: carico di partenza · js/coach/carichi/partenza.js + figura-anatomica.js, libreria-esercizi.js, lavoro-cronometro.js`, `Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js + scheda-quattro-sezioni.js, disegni-esercizi.js, seduta.js +2`, `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + metodo-illustrazioni-esercizi.md`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, statistiche.js`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + scambio.js, giorno.js, figura-anatomica.js +8`, `Pannello coach nel tab Piano · js/coach/pannello.js + suggeritore.js, mappa-per-agenti.md, utility.js`, `Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + nativo.js, timer-pannello.js, timer-recupero.js +3`, `Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js + prontezza.js, termina-e-cardio.js, dolore-mattina.js +2`, `Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js + storage.js, traduttore.js, selezione-multipla.js`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8`, `Coach: schemi di movimento · js/coach/programma/schemi.js + motore.js, ricette.js, struttura-pro.js +1`, `Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `assert`, `fs`, `http` to the rest of the system?**
  _267 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-momenti.js, metodi-epoca-oro.js +2` be split into smaller, more focused modules?**
  _Cohesion score 0.0696969696969697 - nodes in this community are weakly interconnected._
- **Why does `switchTab()` connect `Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, seduta.js, aggiungi-allenamento.js +6` to `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + questionario-decisioni.js, traduttore.js`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, oggi.js, esigenza.js +9`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, annulla.js +5`, `Progressi: peso corporeo · js/ui/progressi/peso.js + storico.js, traduttore.js, pagine.js`, `Opzioni in stile Impostazioni di iPhone · js/ui/opzioni/stile-iphone.js + coach-ia.js, psicologia.js, impostazioni.js +1`, `Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + stato-condiviso.js, cedimento-canzone.js, cedimento.js +8`, `Dati: importazione dei progressi · js/ui/importa-progressi.js + coach-ia.js, importa-csv.js, backup.js +8`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `Coach: regole dalla ricerca · js/coach/regole-ricerca.js + schede-tecniche.js, progressivo.js, scheda-unica.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._
- **Why does `renderSetPage()` connect `Coach: psicologia · js/coach/psicologia.js + metodi-momenti.js, statistiche.js` to `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + schermo-acceso.js, statistiche.js`, `Coach: metodi di allenamento e momenti · js/coach/metodi-momenti.js + stato.js, oggi.js, esigenza.js +9`, `Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + mappa-per-agenti.md, tema-iniziale.js`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + opzioni.js, archivio.js, costanti.js +10`, `Guida interattiva · js/ui/guida-interattiva.js + foto.js, pagine.js, ripristino-guida.js`, `Consenso ai dati · js/core/consenso.js + guida-interattiva.js, utility.js`, `Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js`, `Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + scambio.js, giorno.js, figura-anatomica.js +8`, `Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + giorno.js, seduta.js, aggiungi-allenamento.js +6`, `Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + nativo.js, timer-pannello.js, timer-recupero.js +3`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, termina-e-cardio.js +5`, `Opzioni in stile Impostazioni di iPhone · js/ui/opzioni/stile-iphone.js + coach-ia.js, psicologia.js, impostazioni.js +1`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Should `Onboarding: creazione del programma · js/ui/onboarding.js + alternative.js, lettore.js, psicologia.js +3` be split into smaller, more focused modules?**
  _Cohesion score 0.0814207650273224 - nodes in this community are weakly interconnected._