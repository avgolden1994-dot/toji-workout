# Graph Report - toji-workout  (2026-10-05)

## Corpus Check
- 148 files · ~325,801 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 13, (none) 3)

## Summary
- 1151 nodes · 1932 edges · 85 communities (59 shown, 26 thin omitted)
- Extraction: 74% EXTRACTED · 26% INFERRED · 0% AMBIGUOUS · INFERRED: 502 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d77438e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- struttura-pro.js
- regole-ricerca.js
- onboarding.js
- indice.js
- 80. `js/ui/importa-progressi.js` — Importa i tuoi progressi
- repertorio.js
- traduttore.js
- guida-interattiva.js
- schede-esercizio.js
- 17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati
- playwright-core
- questionario-decisioni.js
- 101. `js/ui/calendario/mese.js` — Calendario del mese
- seduta-libera.js
- ref_path
- schemi.js
- cedimento.test.js
- coach-mappa-regole.md (mappa delle regole)
- manifest.json
- metodi-momenti.js
- allenamento/macchinario-occupato.js
- seduta.js
- figura-anatomica.js
- 38. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify)
- struttura.test.js
- genera-sw.js
- 57. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo
- Indice del codice
- js/coach
- importa-csv.js
- aggiungi-allenamento.js
- 85. `js/ui/progressi/foto.js` — Foto dei progressi
- js/ui
- js/lingue
- 22. `js/core/utility.js` — Utility
- 36. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set)
- CLAUDE.md
- 86. `js/ui/progressi/peso.js` — Peso corporeo
- package.json
- genera-catalogo.js
- carichi-evoluzione.js
- macchinario-occupato-tendina.js
- schede-tecniche.js
- 25. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata
- avvio.test.js
- 54. `js/ui/onboarding-risultato.js` — Risultato del programma generato
- ref_fs
- nativo.js
- scripts
- muscoli.test.js
- 46. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio
- 108. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)
- 97. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni
- 55. `js/coach/programma/archivio.js` — Programma e BIA salvati
- costanti.js
- browser/elenco-esercizi.js
- ripetizioni.js
- 19. `js/core/modalita.js` — Modalita (id interno dei dati)
- 96. `js/dati/disegni-esercizi.js` — Disegni degli esercizi
- 21. `js/ui/oggi.js` — Schermata Oggi
- coerenza-schede.js
- guida-tocchi.js
- intensita-bia.js
- browser/macchinario-occupato.js
- browser/regole-nuove.js
- browser/scheda-unica.js
- sicurezza.js
- 45. `js/coach/pannello.js` — Pannello coach nel tab Piano
- js/coach
- js/core
- stato-condiviso.js
- ui/elenco-esercizi.js

## God Nodes (most connected - your core abstractions)
1. `Indice del codice` - 33 edges
2. `playwright-core` - 22 edges
3. `64. `js/coach/repertorio.js` — Coach 2: repertorio completo` - 20 edges
4. `17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati` - 16 edges
5. `48. `js/ui/onboarding.js` — Schermata iniziale: creazione del programma` - 16 edges
6. `66. `js/coach/regole-ricerca.js` — Coach 2: regole nuove dalla ricerca` - 16 edges
7. `29. `js/ui/allenamento/macchinario-occupato.js` — Macchinario occupato: sostituzione per oggi` - 15 edges
8. `72. `js/ui/guida-interattiva.js` — Guida interattiva` - 15 edges
9. `coach-mappa-regole.md (mappa delle regole)` - 15 edges
10. `101. `js/ui/calendario/mese.js` — Calendario del mese` - 14 edges

## Surprising Connections (you probably didn't know these)
- `92. `js/coach/biomeccanica.js` — Biomeccanica del coach` --references--> `cueEsercizio()`  [INFERRED]
  docs/indice-codice.md → js/coach/biomeccanica.js
- `92. `js/coach/biomeccanica.js` — Biomeccanica del coach` --references--> `respiroPer()`  [INFERRED]
  docs/indice-codice.md → js/coach/biomeccanica.js
- `92. `js/coach/biomeccanica.js` — Biomeccanica del coach` --references--> `stabile()`  [INFERRED]
  docs/indice-codice.md → js/coach/biomeccanica.js
- `92. `js/coach/biomeccanica.js` — Biomeccanica del coach` --references--> `htmlProva()`  [INFERRED]
  docs/indice-codice.md → js/coach/biomeccanica.js
- `92. `js/coach/biomeccanica.js` — Biomeccanica del coach` --references--> `htmlTestFaiDaTe()`  [INFERRED]
  docs/indice-codice.md → js/coach/biomeccanica.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (85 total, 26 thin omitted)

### Community 0 - "struttura-pro.js"
Cohesion: 0.07
Nodes (35): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+27 more)

### Community 1 - "regole-ricerca.js"
Cohesion: 0.11
Nodes (36): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-02 negative, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04), 66. `js/coach/regole-ricerca.js` — Coach 2: regole nuove dalla ricerca (+28 more)

### Community 2 - "onboarding.js"
Cohesion: 0.09
Nodes (39): 48. `js/ui/onboarding.js` — Schermata iniziale: creazione del programma, 94. `js/coach/psicologia.js` — Psicologia: chi ha davanti il coach, htmlDomandePsico(), htmlPrimiPassi(), PSICO_DOMANDE, psicoCoach(), renderPsicoStep(), renderSetPage() (+31 more)

### Community 3 - "indice.js"
Cohesion: 0.05
Nodes (40): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), 107. `js/coach/coach-ia.js` — Coach IA, 77. `js/core/schermo-acceso.js` — Schermo acceso durante la seduta (+32 more)

### Community 4 - "80. `js/ui/importa-progressi.js` — Importa i tuoi progressi"
Cohesion: 0.09
Nodes (35): 80. `js/ui/importa-progressi.js` — Importa i tuoi progressi, 82. `js/ui/lavoro-cronometro.js` — Cronometro di lavoro e info esercizio, 83. `js/ui/progressi/riepilogo.js` — Prossima seduta, fatica muscolare e anno, 84. `js/ui/progressi/pagine.js` — Progressi: pagine e pesate, 87. `js/ui/stampa-scheda.js` — Condividi e stampa la scheda, js/ui, analizzaProgressi(), dataInRiga() (+27 more)

### Community 5 - "repertorio.js"
Cohesion: 0.19
Nodes (22): 64. `js/coach/repertorio.js` — Coach 2: repertorio completo, aderenzaDueSettimane(), ALZATE_BASE, azioniCoach(), bloccoCorrente(), cambiaSerieNelPiano(), conAnnulla(), controlloSchemi() (+14 more)

### Community 6 - "traduttore.js"
Cohesion: 0.13
Nodes (18): avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR, I18N_ORIG, I18N_SEP (+10 more)

### Community 7 - "guida-interattiva.js"
Cohesion: 0.09
Nodes (38): 72. `js/ui/guida-interattiva.js` — Guida interattiva, 73. `js/ui/opzioni/impostazioni.js` — Impostazioni, 74. `js/ui/opzioni/stile-iphone.js` — Opzioni in stile Impostazioni di iPhone, 75. `js/ui/opzioni/il-coach.js` — Opzioni: il coach, 76. `js/ui/fogli.js` — Fogli e scambio di file, js/ui, apriFoglio(), dataOra() (+30 more)

### Community 8 - "schede-esercizio.js"
Cohesion: 0.27
Nodes (17): 95. `js/ui/schede-esercizio.js` — Schede esercizio: disegno e spiegazione, accosciato(), arto(), bilanciere(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW (+9 more)

### Community 9 - "17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati"
Cohesion: 0.35
Nodes (16): 17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati, dataKey(), getDayTitle(), historyKey(), leggiJSON(), loadData(), loadHistory(), loadTitles() (+8 more)

### Community 10 - "playwright-core"
Cohesion: 0.12
Nodes (8): playwright-core, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }

### Community 11 - "questionario-decisioni.js"
Cohesion: 0.27
Nodes (15): 61. `js/coach/questionario-decisioni.js` — Questionario di fine allenamento e decisioni, AGG_KEY(), applicaDecisioni(), etichettaDolore(), fbScelta(), nomeInLibreria(), renderQuestionario(), salvaAggiusti() (+7 more)

### Community 12 - "101. `js/ui/calendario/mese.js` — Calendario del mese"
Cohesion: 0.09
Nodes (36): 101. `js/ui/calendario/mese.js` — Calendario del mese, 102. `js/ui/calendario/gruppi.js` — Gruppi muscolari nel calendario, 103. `js/ui/calendario/scambio.js` — Scambiare i giorni trascinandoli, 104. `js/ui/calendario/copia-settimana.js` — Copiare una settimana come blocco, 105. `js/ui/menu-settimana.js` — Menu della settimana, 106. `js/ui/sessione-completata.js` — Sessione gia completata, js/ui, attachWeekDrag() (+28 more)

### Community 13 - "seduta-libera.js"
Cohesion: 0.30
Nodes (14): 81. `js/ui/seduta-libera.js` — Seduta libera e sedute extra, arrotondaCarico(), avviaSpeciale(), eserciziDaNomi(), FILTRI_ATTREZZI, htmlExtra(), htmlListaLibera(), liberaSel (+6 more)

### Community 14 - "ref_path"
Cohesion: 0.15
Nodes (8): { chromium }, os, path, url, { chromium }, os, path, url

### Community 15 - "schemi.js"
Cohesion: 0.08
Nodes (31): 49. `js/coach/bia/lettore.js` — Lettore BIA a struttura, 50. `js/coach/programma/motore.js` — Coach engine: costruzione del programma, 51. `js/coach/programma/schemi.js` — Schemi di movimento e regole di costruzione, 52. `js/coach/programma/ricette.js` — Variazione del coach: ricette a slot e buildProgram, js/coach, numIt(), alternativeStessoMuscolo(), attrezzoDi() (+23 more)

### Community 16 - "cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "coach-mappa-regole.md (mappa delle regole)"
Cohesion: 0.07
Nodes (35): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, INT: intensità da BIA e prime sedute, MET: metodi famosi e scelta della struttura (+27 more)

### Community 18 - "manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "metodi-momenti.js"
Cohesion: 0.08
Nodes (38): 88. `js/coach/metodi-momenti.js` — Metodi di allenamento e momenti, 89. `js/coach/metodi-epoca-oro.js` — Metodi dell'epoca d'oro del culturismo, 90. `js/coach/compone.js` — Il coach compone, 91. `js/coach/stato.js` — Stato del coach, 92. `js/coach/biomeccanica.js` — Biomeccanica del coach, js/coach, bonusBiomecc(), CUE_SCHEMA (+30 more)

### Community 20 - "allenamento/macchinario-occupato.js"
Cohesion: 0.12
Nodes (30): 27. `js/ui/piano/selezione-multipla.js` — Selezione multipla e azioni di massa, 29. `js/ui/allenamento/macchinario-occupato.js` — Macchinario occupato: sostituzione per oggi, 30. `js/ui/allenamento/sessione.js` — Allenamento: prima il giorno, poi la sessione, 31. `js/ui/allenamento/timer-recupero.js` — Timer di recupero e orologio, js/ui, alternativeOggi(), chiudiOccupato(), copiaRecord() (+22 more)

### Community 21 - "seduta.js"
Cohesion: 0.32
Nodes (11): 28. `js/ui/allenamento/seduta.js` — Tab Allenamento e seduta piu ricca, avviaTempoSeduta(), COLORE_DISCO, controllaRecord(), DISCHI, fermaTempoSeduta(), migliorUnoRM(), renderAllenamento() (+3 more)

### Community 22 - "figura-anatomica.js"
Cohesion: 0.35
Nodes (11): 44. `js/ui/figura-anatomica.js` — Figura anatomica, _figCache, MC_PARTS, MG_VISTA, muscleFigureNuova(), renderBodyMap(), renderGruppi(), usageBadge() (+3 more)

### Community 23 - "38. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify)"
Cohesion: 0.40
Nodes (12): 38. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify), configureWebSegment(), ensureSpotifyApi(), ensureYouTubeApi(), loadSpotifyPlayer(), loadYouTubePlayer(), parseWebAudioUrl(), playerWebCaricato() (+4 more)

### Community 24 - "struttura.test.js"
Cohesion: 0.18
Nodes (9): acorn, assert, fs, html, path, R, scripts, stili (+1 more)

### Community 25 - "genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 26 - "57. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo"
Cohesion: 0.16
Nodes (17): 57. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo, 58. `js/ui/statistiche-grafico.js` — Statistiche: poligono di frequenza degli allenamenti, 69. `js/coach/agente-consigli.js` — Agente coach e consigli del coach 2, js/ui, consigliAgente(), consigliCoach2(), deltaTesto(), dataSessione() (+9 more)

### Community 27 - "Indice del codice"
Cohesion: 0.13
Nodes (14): 109. `js/avvio.js` — Avvio: ultimo file caricato, 16. `js/core/stato-condiviso.js` — Stato condiviso di timer, cedimento e musica, 18. `js/ui/piano/schede-pronte.js` — Selettore schede pronte e titolo della giornata, 32. `js/core/nativo.js` — Ponte verso il telefono (Capacitor), 71. `js/core/consenso.js` — Consenso ai dati, Indice del codice, js, js/coach (+6 more)

### Community 28 - "js/coach"
Cohesion: 0.09
Nodes (30): PAR: carico di partenza dai dati del corpo, PAR-01..05 carico di partenza stimato da massa muscolare e storico, 60. `js/coach/carichi/partenza.js` — Carico di partenza dai dati del corpo, 62. `js/coach/prontezza.js` — Prontezza prima della seduta, 63. `js/coach/mi-sento-male.js` — Mi sento male in seduta, 65. `js/coach/dolore-mattina.js` — Controllo del dolore la mattina dopo, 70. `js/coach/bia/opzioni.js` — BIA nelle opzioni, js/coach (+22 more)

### Community 29 - "importa-csv.js"
Cohesion: 0.40
Nodes (10): 79. `js/ui/importa-csv.js` — Importazione CSV di altre app, ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV() (+2 more)

### Community 30 - "aggiungi-allenamento.js"
Cohesion: 0.38
Nodes (10): 26. `js/ui/piano/aggiungi-allenamento.js` — Aggiungi allenamento alla settimana, applicaAllaSettimana(), awCustom, awDays, awEsercizi(), awGroups, awNome(), renderAddWeek() (+2 more)

### Community 31 - "85. `js/ui/progressi/foto.js` — Foto dei progressi"
Cohesion: 0.40
Nodes (10): 85. `js/ui/progressi/foto.js` — Foto dei progressi, fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva(), fotoTogli(), fotoTutte(), fotoUltimaKey() (+2 more)

### Community 32 - "js/ui"
Cohesion: 0.07
Nodes (45): 33. `js/ui/allenamento/timer-pannello.js` — Pannello del timer di recupero, 34. `js/ui/allenamento/cedimento-canzone.js` — Cedimento: la canzone si sceglie una volta, 35. `js/ui/musica/lettore-fisso.js` — Lettore musicale sempre raggiungibile, 37. `js/ui/musica/mp3-locale.js` — Libreria MP3 locale (IndexedDB), 39. `js/ui/gesti.js` — Swipe, rotella dei numeri e trascinamento, 40. `js/ui/annulla.js` — Snackbar con Annulla, 41. `js/ui/riposo-settimane.js` — Giorni di riposo e settimane salvate, 42. `js/ui/gruppi-muscolari.js` — Schermata gruppi muscolari (+37 more)

### Community 33 - "js/lingue"
Cohesion: 0.33
Nodes (6): 1. `js/lingue/en.js` — Traduzioni en: una voce per riga. Chiave = testo italiano, valore = traduzione., 2. `js/lingue/es.js` — Traduzioni es: una voce per riga. Chiave = testo italiano, valore = traduzione., 3. `js/lingue/de.js` — Traduzioni de: una voce per riga. Chiave = testo italiano, valore = traduzione., 4. `js/lingue/traduttore.js` — Traduttore automatico dell interfaccia (it/en/es/de), 5. `js/lingue/avvio-traduttore.js` — Accende il traduttore appena il dizionario e il markup sono pronti, js/lingue

### Community 34 - "22. `js/core/utility.js` — Utility"
Cohesion: 0.18
Nodes (21): 22. `js/core/utility.js` — Utility, 23. `js/core/audio-silenzioso.js` — Suono con il telefono in silenzioso, 24. `js/core/musica-altre-app.js` — Convivenza con la musica delle altre app, js/core, avviaCanaleMultimediale(), fermaCanaleMultimediale(), playBeep(), playEnd() (+13 more)

### Community 35 - "36. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set)"
Cohesion: 0.47
Nodes (11): 36. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set), avviaWebPronto(), caricaPlayerWebSalvato(), chiudiCedimento(), finishDropSet(), rilasciaAudioCedimento(), sessioneCanzoneAttiva(), startDropAudio() (+3 more)

### Community 36 - "CLAUDE.md"
Cohesion: 0.40
Nodes (3): Delegation, Model routing, Project context & code search

### Community 37 - "86. `js/ui/progressi/peso.js` — Peso corporeo"
Cohesion: 0.51
Nodes (9): 86. `js/ui/progressi/peso.js` — Peso corporeo, consiglioPeso(), faseCorpo(), graficoPeso(), pesiTutti(), pesoKey(), pesoObKey(), renderPesoCard() (+1 more)

### Community 38 - "package.json"
Cohesion: 0.22
Nodes (8): description, devDependencies, acorn, playwright-core, name, private, version, acorn

### Community 39 - "genera-catalogo.js"
Cohesion: 0.17
Nodes (10): Catalogo delle regole generato dalla mappa (npm run catalogo), COACH_REGOLE, codici, dest, doppi, fs, md, path (+2 more)

### Community 44 - "schede-tecniche.js"
Cohesion: 0.24
Nodes (11): 100. `js/dati/scheda-unica.js` — Scheda unica per esercizio: tutto quello che l'app sa di un esercizio, in un oggetto solo, 98. `js/dati/schede-tecniche.js` — Schede tecniche per esercizio, 99. `js/dati/schede-varianti.js` — Schede tecniche delle varianti (presa, attacco) e dei classici aggiunti, js/dati, GLOSSARIO, htmlDettaglioScheda(), pausaConsigliata(), preferenzaEsercizio() (+3 more)

### Community 45 - "25. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata"
Cohesion: 0.50
Nodes (8): 25. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata, aggiornaIngressoAgente(), applicaModalitaGiorno(), renderDayView(), renderPlanDayPicker(), renderPlanMap(), renderPlanMapList(), syncBuildingLine()

### Community 47 - "avvio.test.js"
Cohesion: 0.29
Nodes (4): assert, fs, path, test

### Community 49 - "54. `js/ui/onboarding-risultato.js` — Risultato del programma generato"
Cohesion: 0.50
Nodes (3): 54. `js/ui/onboarding-risultato.js` — Risultato del programma generato, js/ui, renderOnbResult()

### Community 50 - "ref_fs"
Cohesion: 0.33
Nodes (3): { chromium }, fs, path

### Community 51 - "nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 52 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, catalogo, controlla, indice, sw, test, test:browser

### Community 55 - "muscoli.test.js"
Cohesion: 0.05
Nodes (37): 10. `js/dati/libreria-esercizi.js` — Libreria esercizi con metadati, 11. `js/dati/schede-epoca-oro.js` — Schede dell'epoca d'oro del culturismo, 12. `js/dati/dettagli-esercizi.js` — Dettagli per esercizio: attrezzo, presa o attacco, sottogruppo e focus muscolare, 9. `js/dati/schede-pronte.js` — Libreria delle schede pronte, js/dati, DETTAGLI, MULTIARTICOLARI_TOTALI, MUSCOLI (+29 more)

### Community 56 - "46. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio"
Cohesion: 0.25
Nodes (12): 46. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio, 47. `js/ui/storico.js` — Tab Storico, js/ui, CARDIO_TIPI, cardioCorrente(), cardioKey(), minutiCardioSettimana(), nomeCardio() (+4 more)

### Community 58 - "108. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)"
Cohesion: 0.43
Nodes (7): 108. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics), js/ui, aggiornaAiutoIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 62 - "97. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni"
Cohesion: 0.62
Nodes (6): 97. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni, exVuoto(), paneGrafico(), paneRecord(), paneStorico(), seduteEsercizio()

### Community 72 - "55. `js/coach/programma/archivio.js` — Programma e BIA salvati"
Cohesion: 0.27
Nodes (8): 55. `js/coach/programma/archivio.js` — Programma e BIA salvati, 56. `js/coach/programma/alternative.js` — Alternative e applicazione del programma, js/coach, alternativeDi(), altScelte, renderAlternative(), biaKey(), progKey()

### Community 73 - "costanti.js"
Cohesion: 0.50
Nodes (3): DAYS, DEFAULT_MONDAY_PROGRAM, MODE_META

### Community 81 - "19. `js/core/modalita.js` — Modalita (id interno dei dati)"
Cohesion: 0.25
Nodes (7): 19. `js/core/modalita.js` — Modalita (id interno dei dati), 20. `js/core/navigazione.js` — Navigazione: giorni e tab, js/core, activateMode(), getStoredMode(), daysContainer, renderDayBar()

### Community 83 - "96. `js/dati/disegni-esercizi.js` — Disegni degli esercizi"
Cohesion: 0.40
Nodes (4): 96. `js/dati/disegni-esercizi.js` — Disegni degli esercizi, js/dati, IMMAGINI_ESERCIZI, slotImmagine()

### Community 85 - "21. `js/ui/oggi.js` — Schermata Oggi"
Cohesion: 0.40
Nodes (4): 21. `js/ui/oggi.js` — Schermata Oggi, js/ui, categoriaDi(), CATEGORIE

### Community 99 - "45. `js/coach/pannello.js` — Pannello coach nel tab Piano"
Cohesion: 0.50
Nodes (3): 45. `js/coach/pannello.js` — Pannello coach nel tab Piano, js/coach, renderCoach()

### Community 100 - "js/coach"
Cohesion: 0.33
Nodes (5): 13. `js/coach/parametri.js` — Parametri del coach: tutte le soglie e i fattori in un posto solo, 14. `js/coach/catalogo-regole.js` — Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da, 15. `js/coach/suggeritore.js` — Motore del coach: suggerimento del prossimo esercizio, js/coach, suggestNextExercises()

### Community 101 - "js/core"
Cohesion: 0.33
Nodes (5): 6. `js/core/service-worker.js` — Registrazione del service worker (uso offline), 7. `js/core/ripristino-guida.js` — Ripristino dei dati veri se la guida viene interrotta, 8. `js/core/costanti.js` — Costanti e stato globale, js/core, guidaApplicaFoto()

## Knowledge Gaps
- **266 isolated node(s):** `CUE_SCHEMA`, `TEST_FAI_DA_TE`, `SCALE_DOLORE`, `PARAM_PARTENZA`, `MOTIVI_STIMA` (+261 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 327 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Indice del codice` connect `Indice del codice` to `indice.js`, `80. `js/ui/importa-progressi.js` — Importa i tuoi progressi`, `guida-interattiva.js`, `101. `js/ui/calendario/mese.js` — Calendario del mese`, `schemi.js`, `metodi-momenti.js`, `allenamento/macchinario-occupato.js`, `57. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo`, `js/coach`, `js/ui`, `js/lingue`, `22. `js/core/utility.js` — Utility`, `schede-tecniche.js`, `54. `js/ui/onboarding-risultato.js` — Risultato del programma generato`, `muscoli.test.js`, `46. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio`, `108. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)`, `55. `js/coach/programma/archivio.js` — Programma e BIA salvati`, `19. `js/core/modalita.js` — Modalita (id interno dei dati)`, `96. `js/dati/disegni-esercizi.js` — Disegni degli esercizi`, `21. `js/ui/oggi.js` — Schermata Oggi`, `45. `js/coach/pannello.js` — Pannello coach nel tab Piano`, `js/coach`, `js/core`?**
  _High betweenness centrality (0.701) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `64. `js/coach/repertorio.js` — Coach 2: repertorio completo` (e.g. with `aderenzaDueSettimane()` and `azioniCoach()`) actually correct?**
  _`64. `js/coach/repertorio.js` — Coach 2: repertorio completo` has 19 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CUE_SCHEMA`, `TEST_FAI_DA_TE`, `SCALE_DOLORE` to the rest of the system?**
  _266 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `struttura-pro.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07039187227866474 - nodes in this community are weakly interconnected._
- **Why does `js/coach` connect `metodi-momenti.js` to `coach-mappa-regole.md (mappa delle regole)`, `onboarding.js`, `Indice del codice`?**
  _High betweenness centrality (0.263) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati` (e.g. with `dataKey()` and `getDayTitle()`) actually correct?**
  _`17. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati` has 15 INFERRED edges - model-reasoned connections that need verification._
- **Should `regole-ricerca.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10897435897435898 - nodes in this community are weakly interconnected._