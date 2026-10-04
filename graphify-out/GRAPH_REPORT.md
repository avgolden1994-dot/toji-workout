# Graph Report - toji-workout  (2026-10-02)

## Corpus Check
- 146 files · ~315,685 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 13, (none) 3)

## Summary
- 940 nodes · 1209 edges · 119 communities (67 shown, 52 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Struttura scheda (ABB) ed epoca d'oro
- Tecniche e regole spegnibili (TEC, RIC)
- Psicologia e primi passi
- Architettura e documentazione
- Utility e importazione
- Repertorio del coach
- Traduttore delle lingue
- Guida interattiva
- Schede esercizio (disegni)
- Storage dei dati
- Prove in browser: carichi
- Questionario e decisioni
- Calendario mensile
- Seduta libera
- Prove in browser: contrasto e statistiche
- Schemi di movimento
- Calendario: copia settimana
- Intensità da BIA (INT) e fonti
- Manifest della PWA
- Metodi e momenti
- Macchinario occupato
- Seduta: tempo e record
- Figura anatomica
- Player musica web
- Test di struttura
- Generatore del service worker
- Modulo statistiche
- Modulo biomeccanica
- Modulo prontezza
- Modulo importa-csv
- Modulo aggiungi-allenamento
- Modulo foto
- Riposo e settimane
- Indice del codice
- Modulo musica-altre-app
- Modulo cedimento
- Modulo mp3-locale
- Modulo peso
- Modulo package
- Modulo genera-catalogo
- Modulo progressivo
- Modulo partenza
- Modulo compone
- Modulo motore
- Modulo schede-tecniche
- Modulo giorno
- Modulo riepilogo
- Modulo avvio.test
- Modulo esigenza
- Modulo coach-mappa-regole
- Modulo metodi-epoca-oro
- Modulo nativo
- Modulo package
- Modulo coach-mappa-regole
- Modulo stato
- Modulo dettagli-esercizi
- Modulo termina-e-cardio
- Modulo timer-recupero
- Modulo esporta-ics
- Modulo gruppi-muscolari
- Modulo il-coach
- Modulo stile-iphone
- Modulo scheda-quattro-sezioni
- Modulo statistiche-grafico
- Modulo parametri
- Modulo libreria-esercizi
- Modulo cedimento-canzone
- Modulo lettore-fisso
- Modulo pagine
- Modulo storico
- Modulo dolore-mattina
- Modulo alternative
- Modulo costanti
- Modulo elenco-esercizi
- Modulo ripetizioni
- Modulo opzioni
- Modulo navigazione
- Modulo disegni-esercizi
- Modulo sessione
- Modulo oggi
- Modulo selezione-multipla
- Modulo stampa-scheda
- Modulo coerenza-schede
- Modulo dettagli-esercizi
- Modulo guida-tocchi
- Modulo intensita-bia
- Modulo macchinario-occupato
- Modulo regole-nuove
- Modulo scheda-unica
- Modulo sicurezza
- Modulo stato-condiviso
- Modulo elenco-esercizi

## God Nodes (most connected - your core abstractions)
1. `playwright-core` - 21 edges
2. `coach-mappa-regole.md (mappa delle regole)` - 15 edges
3. `ABB: abbinamenti e struttura professionale` - 11 edges
4. `caricoProssimoBase()` - 9 edges
5. `EPO: metodi dell'epoca d'oro` - 8 edges
6. `TEC: tecniche (piramide, negative, riposo-pausa...)` - 8 edges
7. `scripts` - 7 edges
8. `EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto)` - 7 edges
9. `rirBersaglio()` - 6 edges
10. `plugin()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `limitaTecnicheIntense()` --implements--> `TEC-07 tetto alle tecniche al cedimento (RIC-04)`  [EXTRACTED]
  js/coach/regole-nuove.js → docs/coach-mappa-regole.md
- `rirBersaglio()` --implements--> `INT-03 una ripetizione in riserva in più con due bandiere`  [EXTRACTED]
  js/coach/regole-ricerca.js → docs/coach-mappa-regole.md
- `splitFor()` --implements--> `ABB-05 3 giorni = Upper / Lower / Full Body`  [EXTRACTED]
  js/ui/onboarding.js → docs/coach-mappa-regole.md
- `ripristinaSpeciale()` --indirect_call--> `normalizeExerciseRecord()`  [INFERRED]
  js/ui/seduta-libera.js → js/core/storage.js
- `consigliCoach2()` --indirect_call--> `dataSessione()`  [INFERRED]
  js/coach/agente-consigli.js → js/ui/statistiche.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]

## Communities (119 total, 52 thin omitted)

### Community 0 - "Struttura scheda (ABB) ed epoca d'oro"
Cohesion: 0.06
Nodes (32): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-10 priorità: il gruppo prioritario per primo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie (+24 more)

### Community 1 - "Tecniche e regole spegnibili (TEC, RIC)"
Cohesion: 0.09
Nodes (30): TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-02 negative, TEC-05 contrazione di picco, TEC-01 piramide, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04), giorniDallUltimaSeduta() (+22 more)

### Community 2 - "Psicologia e primi passi"
Cohesion: 0.06
Nodes (29): htmlDomandePsico(), htmlPrimiPassi(), PSICO_DOMANDE, psicoCoach(), renderPsicoStep(), renderSetPage(), renderSettings(), SET_PAGINE (+21 more)

### Community 3 - "Architettura e documentazione"
Cohesion: 0.07
Nodes (24): Catalogo delle regole generato dalla mappa (npm run catalogo), Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), Il ripristino di un backup non imposta i consensi ne il codice del dispositivo (+16 more)

### Community 4 - "Utility e importazione"
Cohesion: 0.13
Nodes (16): escapeHtml(), jsArg(), pulisciDeep(), analizzaProgressi(), dataInRiga(), eserciziPersonalizzati(), indiceNomi(), leggiFileProgressi() (+8 more)

### Community 5 - "Repertorio del coach"
Cohesion: 0.13
Nodes (15): aderenzaDueSettimane(), ALZATE_BASE, azioniCoach(), bloccoCorrente(), corpoCoach(), eserciziFermi(), htmlAderenza(), htmlFineCiclo() (+7 more)

### Community 6 - "Traduttore delle lingue"
Cohesion: 0.13
Nodes (18): avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR, I18N_ORIG, I18N_SEP (+10 more)

### Community 7 - "Guida interattiva"
Cohesion: 0.19
Nodes (13): GUIDA, guidaDatiDemo(), guidaEl(), guidaMostra(), guidaPosiziona(), guidaPreparaProva(), guidaRidotto(), guidaRipristina() (+5 more)

### Community 8 - "Schede esercizio (disegni)"
Cohesion: 0.21
Nodes (13): accosciato(), arto(), inPiedi(), PATTERN_DRAW, PATTERN_INFO, PATTERN_RULES, piegato(), sdraiato() (+5 more)

### Community 9 - "Storage dei dati"
Cohesion: 0.27
Nodes (15): dataKey(), getDayTitle(), historyKey(), leggiJSON(), loadData(), loadHistory(), loadTitles(), migrateLegacyDataIfNeeded() (+7 more)

### Community 10 - "Prove in browser: carichi"
Cohesion: 0.12
Nodes (8): playwright-core, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }, { chromium }

### Community 11 - "Questionario e decisioni"
Cohesion: 0.21
Nodes (12): AGG_KEY(), applicaDecisioni(), etichettaDolore(), fbScelta(), nomeInLibreria(), renderQuestionario(), salvaAggiusti(), senzaEmoji() (+4 more)

### Community 12 - "Calendario mensile"
Cohesion: 0.25
Nodes (11): calKey(), copiaSettimana(), giornoSettimana(), loadCal(), lunediDi(), mettiSettimana(), piuGiorni(), saveCal() (+3 more)

### Community 13 - "Seduta libera"
Cohesion: 0.22
Nodes (11): avviaSpeciale(), eserciziDaNomi(), FILTRI_ATTREZZI, htmlListaLibera(), liberaSel, renderSedutaLibera(), renderSeduteExtra(), renderSpecialeBox() (+3 more)

### Community 14 - "Prove in browser: contrasto e statistiche"
Cohesion: 0.15
Nodes (8): { chromium }, os, path, url, { chromium }, os, path, url

### Community 15 - "Schemi di movimento"
Cohesion: 0.15
Nodes (7): GLUTEI_FAMIGLIE, GRUPPI_PRINCIPALI, ISOLAMENTI, SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, SCHEMI_MOV, VOLUME_LIVELLO

### Community 16 - "Calendario: copia settimana"
Cohesion: 0.23
Nodes (10): attachWeekDrag(), etichettaSettimana(), mcCopyTargets, renderCopyBar(), GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi() (+2 more)

### Community 17 - "Intensità da BIA (INT) e fonti"
Cohesion: 0.21
Nodes (6): INT: intensità da BIA e prime sedute, INT-02 esigenza di partenza 120/100/95%, INT-04 prima volta con un esercizio: una serie in meno, +1 RIR, INT-03 una ripetizione in riserva in più con due bandiere, FA_MEDIA, PARAM_INTENSITA

### Community 18 - "Manifest della PWA"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Metodi e momenti"
Cohesion: 0.24
Nodes (7): htmlMomento(), METODI, MOMENTI, momentoAttivo(), momentoDa(), prontezzaBassaSettimana(), UL4

### Community 20 - "Macchinario occupato"
Cohesion: 0.25
Nodes (8): alternativeOggi(), copiaRecord(), ETICHETTA_ATTREZZO, htmlOccupato(), occupatoOpzioni, prefsOccupato(), pulisciSostituzioniVecchie(), ripristinaSostituzioni()

### Community 21 - "Seduta: tempo e record"
Cohesion: 0.25
Nodes (8): COLORE_DISCO, controllaRecord(), DISCHI, migliorUnoRM(), renderAllenamento(), RPE_VALORI, ultimaVoltaTesto(), unoRM()

### Community 22 - "Figura anatomica"
Cohesion: 0.29
Nodes (8): _figCache, MC_PARTS, MG_VISTA, muscleFigureNuova(), renderBodyMap(), renderGruppi(), volLabel(), volLevel()

### Community 23 - "Player musica web"
Cohesion: 0.36
Nodes (9): configureWebSegment(), ensureSpotifyApi(), ensureYouTubeApi(), loadSpotifyPlayer(), loadYouTubePlayer(), readYouTubeDuration(), setWebStatus(), updateWebSegmentLabel() (+1 more)

### Community 24 - "Test di struttura"
Cohesion: 0.18
Nodes (9): acorn, assert, fs, html, path, R, scripts, stili (+1 more)

### Community 25 - "Generatore del service worker"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 26 - "Modulo statistiche"
Cohesion: 0.22
Nodes (3): consigliAgente(), consigliCoach2(), dataSessione()

### Community 27 - "Modulo biomeccanica"
Cohesion: 0.20
Nodes (3): CUE_SCHEMA, SCALE_DOLORE, TEST_FAI_DA_TE

### Community 28 - "Modulo prontezza"
Cohesion: 0.31
Nodes (9): leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaOggi(), prontezzaStato, punteggioProntezza(), renderProntezza(), VOCE_CICLO (+1 more)

### Community 29 - "Modulo importa-csv"
Cohesion: 0.33
Nodes (8): ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV(), secondiCSV()

### Community 30 - "Modulo aggiungi-allenamento"
Cohesion: 0.33
Nodes (9): applicaAllaSettimana(), awCustom, awDays, awEsercizi(), awGroups, awNome(), renderAddWeek(), renderPiano() (+1 more)

### Community 31 - "Modulo foto"
Cohesion: 0.31
Nodes (8): fotoDB(), fotoPromemoria(), fotoSalva(), fotoTogli(), fotoTutte(), fotoUltimaKey(), fotoUrl, mostraFoto()

### Community 32 - "Riposo e settimane"
Cohesion: 0.31
Nodes (7): loadRestDays(), loadWeeks(), renderWeeks(), restKey(), saveRestDays(), saveWeeks(), weeksKey()

### Community 33 - "Indice del codice"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 34 - "Modulo musica-altre-app"
Cohesion: 0.42
Nodes (8): avviaCanaleMultimediale(), fermaCanaleMultimediale(), playBeep(), playEnd(), playTick(), playTone(), tipoSessione(), unlockAudio()

### Community 35 - "Modulo cedimento"
Cohesion: 0.39
Nodes (8): finishDropSet(), rilasciaSessioneCanzone(), sessioneCanzoneAttiva(), startDropAudio(), stopDropAudio(), tickCedimento(), updateDropTimerDisplay(), updateFireModeState()

### Community 36 - "Modulo mp3-locale"
Cohesion: 0.36
Nodes (6): dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), openAudioDB(), refreshFailureTracks(), renderFailureTracks()

### Community 37 - "Modulo peso"
Cohesion: 0.42
Nodes (8): consiglioPeso(), faseCorpo(), graficoPeso(), pesiTutti(), pesoKey(), pesoObKey(), renderPesoCard(), tendenzaPeso()

### Community 38 - "Modulo package"
Cohesion: 0.22
Nodes (8): description, devDependencies, acorn, playwright-core, name, private, version, acorn

### Community 39 - "Modulo genera-catalogo"
Cohesion: 0.22
Nodes (8): codici, dest, doppi, fs, md, path, R, voci

### Community 41 - "Modulo partenza"
Cohesion: 0.29
Nodes (4): contestoCarichi(), MOTIVI_STIMA, PARAM_PARTENZA, pesoPartenza()

### Community 42 - "Modulo compone"
Cohesion: 0.36
Nodes (5): htmlMetodi(), metodiPerTe(), metodoAmmesso(), sceltaMetodo(), TOCCHI

### Community 43 - "Modulo motore"
Cohesion: 0.36
Nodes (4): attrezzoDi(), consentito(), RISCHIO, sostituto()

### Community 44 - "Modulo schede-tecniche"
Cohesion: 0.32
Nodes (6): GLOSSARIO, pausaConsigliata(), preferenzaEsercizio(), RESPIRO, schedaTecnica(), TECNICA

### Community 45 - "Modulo giorno"
Cohesion: 0.39
Nodes (6): aggiornaIngressoAgente(), applicaModalitaGiorno(), renderDayView(), renderPlanDayPicker(), renderPlanMap(), renderPlanMapList()

### Community 46 - "Modulo riepilogo"
Cohesion: 0.32
Nodes (4): aggiornaProssima(), faticaMuscoli(), prossimaSerie(), renderFatica()

### Community 47 - "Modulo avvio.test"
Cohesion: 0.25
Nodes (4): assert, fs, path, test

### Community 48 - "Modulo esigenza"
Cohesion: 0.33
Nodes (5): ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), ESI: esigenza del coach, INT-05 bilancio delle prime due sedute, esigenzaEsclusa(), htmlEsigenza()

### Community 49 - "Modulo coach-mappa-regole"
Cohesion: 0.29
Nodes (3): PAR: carico di partenza dai dati del corpo, INT-01 stato del corpo dalla BIA (angolo di fase, ECW/TBW): bandiere di prudenza, PAR-01..05 carico di partenza stimato da massa muscolare e storico

### Community 50 - "Modulo metodi-epoca-oro"
Cohesion: 0.29
Nodes (4): metodoDa(), { chromium }, fs, path

### Community 51 - "Modulo nativo"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 52 - "Modulo package"
Cohesion: 0.29
Nodes (7): scripts, catalogo, controlla, indice, sw, test, test:browser

### Community 53 - "Modulo coach-mappa-regole"
Cohesion: 0.33
Nodes (6): coach-mappa-regole.md (mappa delle regole), BIA: composizione corporea, MET: metodi famosi e scelta della struttura, PRG: costruzione del programma, PRZ: prontezza prima della seduta, PSI: psicologia e momenti di vita

### Community 54 - "Modulo stato"
Cohesion: 0.53
Nodes (5): htmlDomandaMomento(), htmlMomentoBreve(), momentoDaChiedere(), renderPianoCoach(), ultimoGiornoAllenamento()

### Community 55 - "Modulo dettagli-esercizi"
Cohesion: 0.33
Nodes (4): DETTAGLI, NOTE_ATTACCO, SEZIONI_ESERCIZI, SOTTOGRUPPI

### Community 56 - "Modulo termina-e-cardio"
Cohesion: 0.40
Nodes (3): CARDIO_TIPI, cardioCorrente(), cardioKey()

### Community 57 - "Modulo timer-recupero"
Cohesion: 0.67
Nodes (5): avviaTickRecupero(), fineRecupero(), secondiRimasti(), tickRecupero(), updateRecoveryRing()

### Community 59 - "Modulo gruppi-muscolari"
Cohesion: 0.47
Nodes (5): pickRow(), renderSheetExercises(), renderSuggested(), selectedGroups, suggestedOrder

### Community 60 - "Modulo il-coach"
Cohesion: 0.47
Nodes (5): ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, paginaCoach(), toggleCoach()

### Community 61 - "Modulo stile-iphone"
Cohesion: 0.47
Nodes (4): SET_ICO, setIco(), setRow(), setRowSwitch()

### Community 62 - "Modulo scheda-quattro-sezioni"
Cohesion: 0.53
Nodes (4): exVuoto(), paneGrafico(), paneRecord(), paneStorico()

### Community 63 - "Modulo statistiche-grafico"
Cohesion: 0.40
Nodes (3): graficoFrequenzaHtml(), poligonoFrequenzaSvg(), STG

### Community 64 - "Modulo parametri"
Cohesion: 0.40
Nodes (4): RIC: regole dalla ricerca (spegnibili), regole spegnibili (regolaAttiva): RIC-01..05, INT-04, INT-05, COACH_PARAMETRI, REGOLE_SPEGNIBILI

### Community 66 - "Modulo cedimento-canzone"
Cohesion: 0.60
Nodes (3): aggiornaRiassuntoMusica(), leggiMusica(), nomeMusica()

### Community 70 - "Modulo storico"
Cohesion: 0.70
Nodes (4): htmlStoricoOrdinato(), renderProgressiTop(), renderStorico(), rigaSeduta()

### Community 72 - "Modulo alternative"
Cohesion: 0.67
Nodes (3): alternativeDi(), altScelte, renderAlternative()

### Community 73 - "Modulo costanti"
Cohesion: 0.50
Nodes (3): DAYS, DEFAULT_MONDAY_PROGRAM, MODE_META

## Knowledge Gaps
- **219 isolated node(s):** `CUE_SCHEMA`, `TEST_FAI_DA_TE`, `SCALE_DOLORE`, `PARAM_PARTENZA`, `MOTIVI_STIMA` (+214 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 414 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **52 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `coach-mappa-regole.md (mappa delle regole)` connect `Modulo coach-mappa-regole` to `Struttura scheda (ABB) ed epoca d'oro`, `Modulo parametri`, `Tecniche e regole spegnibili (TEC, RIC)`, `Architettura e documentazione`, `Modulo progressivo`, `Modulo esigenza`, `Intensità da BIA (INT) e fonti`, `Modulo coach-mappa-regole`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `Catalogo delle regole generato dalla mappa (npm run catalogo)` connect `Architettura e documentazione` to `Modulo coach-mappa-regole`, `Modulo genera-catalogo`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `ABB: abbinamenti e struttura professionale` connect `Struttura scheda (ABB) ed epoca d'oro` to `Modulo coach-mappa-regole`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `CUE_SCHEMA`, `TEST_FAI_DA_TE`, `SCALE_DOLORE` to the rest of the system?**
  _219 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Struttura scheda (ABB) ed epoca d'oro` be split into smaller, more focused modules?**
  _Cohesion score 0.06079664570230608 - nodes in this community are weakly interconnected._
- **Should `Tecniche e regole spegnibili (TEC, RIC)` be split into smaller, more focused modules?**
  _Cohesion score 0.08502024291497975 - nodes in this community are weakly interconnected._
- **Should `Psicologia e primi passi` be split into smaller, more focused modules?**
  _Cohesion score 0.06477732793522267 - nodes in this community are weakly interconnected._