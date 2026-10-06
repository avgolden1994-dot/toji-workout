# Indice del codice

File generato da `tools/indice.js` (`npm run indice`): non si modifica a mano.
Prima di leggere il codice consulta `graphify-out/GRAPH_REPORT.md`, poi il grafo (`graphify-out/graph.json`).
Chi usa un nome e cosa usa: `npm run -s trova -- nome` (o `docs/mappa-simboli.md`).
Gli script si caricano **in questo ordine** (lo stesso di `index.html`).

## js/lingue

### 1. `js/lingue/en.js` — Traduzioni en: una voce per riga. Chiave = testo italiano, valore = traduzione.

### 2. `js/lingue/es.js` — Traduzioni es: una voce per riga. Chiave = testo italiano, valore = traduzione.

### 3. `js/lingue/de.js` — Traduzioni de: una voce per riga. Chiave = testo italiano, valore = traduzione.

### 4. `js/lingue/traduttore.js` — Traduttore automatico dell interfaccia (it/en/es/de)

### 5. `js/lingue/avvio-traduttore.js` — Accende il traduttore appena il dizionario e il markup sono pronti

## js/core

### 6. `js/core/service-worker.js` — Registrazione del service worker (uso offline)

_solo istruzioni, nessun nome pubblico_

### 7. `js/core/ripristino-guida.js` — Ripristino dei dati veri se la guida viene interrotta

`GUIDA_BACKUP` · `guidaApplicaFoto()`

### 8. `js/core/costanti.js` — Costanti e stato globale

`DAYS` · `currentDay` · `currentMode` · `currentTab` · `MODE_KEY` · `MODE_META` · `DEFAULT_MONDAY_PROGRAM` · `FAILURE_SET_SECONDS`

### 9. `js/core/memoria-chiamata.js` — Memoria di una chiamata: tabelle di appoggio che vivono solo mentre il generatore lavora (velocità di buildProgram, INT-2b)

`_memoriaChiamata` · `_memoriaProfondita` · `memoriaApri()` · `memoriaChiudi()` · `memoriaTabella()`

## js/dati

### 10. `js/dati/schede-pronte.js` — Libreria delle schede pronte

`WORKOUT_TEMPLATES`

### 11. `js/dati/libreria-esercizi.js` — Libreria esercizi con metadati

`MUSCLE_GROUPS` · `EXERCISE_LIBRARY` · `buildExerciseSelect()` · `findExercise()`

### 12. `js/dati/schede-epoca-oro.js` — Schede dell'epoca d'oro del culturismo

_solo istruzioni, nessun nome pubblico_

### 13. `js/dati/dettagli-esercizi.js` — Dettagli per esercizio: attrezzo, presa o attacco, sottogruppo e focus muscolare

`SEZIONI_ESERCIZI` · `SOTTOGRUPPI` · `MUSCOLI` · `MULTIARTICOLARI_TOTALI` · `NOTE_ATTACCO` · `DETTAGLI` · `_nomePulito()` · `window.dettaglioEsercizio()` · `window.bersaglioDi()` · `window.muscoloBersaglio()` · `window.famigliaTotaleDi()` · `window.lavoroDaSostituire()` · `window.sezioneEsercizio()` · `window.etichettaAttrezzo()` · `window.focusEsercizio()` · `window.focusConTipo()` · `window.ordineEsercizi()` · `window.organizzaEsercizi()` · `window.variantiEsercizio()`

### 14. `js/dati/attributi-esercizi.js` — Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04)

`UNITA_VOLUME` · `UNITA_DI_MUSCOLO` · `ZONE_STRESS` · `ZONE_ALIAS` · `CLASSI_TECNICA` · `SCHEMI_ESERCIZIO` · `PROFILI_RESISTENZA` · `ATTREZZI_ESERCIZIO` · `SERVE_AMMESSI` · `MOTIVI_ZERO` · `SERIE_MIN_PER_SEDUTA` · `ATTRIBUTI` · `_attributiCache` · `_attributiEspansi()` · `window.attributi()` · `window.creditoMuscoli()` · `window.unitaDiMuscolo()` · `window.contaVolume()` · `window.classeTecnica()` · `window.livelloAbilita()` · `window.stressArticolare()` · `window.serveAttrezzo()`

## js/coach

### 15. `js/coach/parametri.js` — Parametri del coach: tutte le soglie e i fattori in un posto solo

`COACH_PARAMETRI` · `REGOLE_SPEGNIBILI` · `REGOLE_SPENTE_KEY` · `window.regolaAttiva()` · `regolaAttivaCalcolo()`

### 16. `js/coach/regia/fasi.js` — Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3)

`FASI_PUNTI` · `registraFase()` · `fasiRegistrate()` · `eseguiFasi()`

### 17. `js/coach/catalogo-regole.js` — Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da

`COACH_SQUADRA` · `COACH_REGOLE` · `COACH_REGOLE_PER_CODICE` · `window.regolaDescritta()`

### 18. `js/coach/regia/soglie-regia.js` — Soglie della regia del coach (REG-01, REG-04)

`SOGLIE_REGIA`

### 19. `js/coach/regia/perche.js` — Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03)

`SEPARATORE_PERCHE` · `SEPARATORE_ETICHETTA_PERCHE` · `ORDINE_FASE_PERCHE` · `ETICHETTE_FORZA` · `codiceInSquadra()` · `sottoCoachDi()` · `nomeSottoCoach()` · `etichettaForza()` · `aggiungiPerche()` · `testoPerche()` · `fasePerche()`

### 20. `js/coach/suggeritore.js` — Motore del coach: suggerimento del prossimo esercizio

`suggestNextExercises()`

## js/core

### 21. `js/core/stato-condiviso.js` — Stato condiviso di timer, cedimento e musica

`recoveryInterval` · `recoveryRemaining` · `recoveryTotal` · `recoveryMuted` · `RECOVERY_RING_CIRCUMFERENCE` · `dropInterval` · `dropRemaining` · `dropActive` · `armedSet` · `dropAudioAttivo` · `activeSourceTab` · `currentWebMode` · `AUDIO_DB_NAME` · `AUDIO_DB_VERSION` · `AUDIO_STORE` · `failureTracks` · `selectedTrackId` · `selectedTrackUrl` · `ytPlayer` · `ytPlayerReady` · `spotifyController` · `spotifyReady` · `webDuration`

### 22. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati

`dataKey` · `historyKey` · `titlesKey` · `leggiJSON()` · `loadTitles` · `saveTitles` · `getDayTitle()` · `normalizeExerciseRecord()` · `loadData()` · `saveData` · `normalizeHistoryEntry()` · `loadHistory()` · `saveHistory` · `migrateLegacyDataIfNeeded()` · `CHIAVI_COACH_IA_RIMOSSO` · `ripulisciChiaviCoachIA()` · `seedDefaultsIfNeeded()`

## js/ui

### 23. `js/ui/piano/schede-pronte.js` — Selettore schede pronte e titolo della giornata

`window.openTemplatePicker()` · `window.closeTemplatePicker()` · `window.applyTemplate()` · `window.renameDayTitle()`

## js/core

### 24. `js/core/modalita.js` — Modalita (id interno dei dati)

`getStoredMode()` · `window.chooseMode()` · `activateMode()`

### 25. `js/core/navigazione.js` — Navigazione: giorni e tab

`daysContainer` · `renderDayBar()` · `window.selectDay()`

## js/ui

### 26. `js/ui/oggi.js` — Schermata Oggi

`CATEGORIE` · `categoriaDi()` · `window.obiettiviSettimana()` · `window.settimaneDiFila()` · `window.renderOggi()` · `window.iniziaOggi()` · `window.switchTab()`

## js/core

### 27. `js/core/utility.js` — Utility

`escapeHtml()` · `nomeSicuro()` · `pulisciDeep()` · `jsArg()` · `formatMMSS()` · `formatNow()` · `handleSelectExercise()` · `audioCtx` · `getAudioCtx()` · `sospendiAudioCtx()`

### 28. `js/core/audio-silenzioso.js` — Suono con il telefono in silenzioso

`SILENZIO_WAV` · `mediaKeeper`

### 29. `js/core/musica-altre-app.js` — Convivenza con la musica delle altre app

`tipoSessione()` · `avviaCanaleMultimediale()` · `fermaCanaleMultimediale()` · `window.lampeggia()` · `window.preparaAudio()` · `sospendiAudioT` · `sospendiAudioDopo()` · `playTone()` · `playBeep()` · `window.testSound()` · `playTick()` · `playEnd()` · `window.stepValue()`

## js/ui

### 30. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata

`syncBuildingLine()` · `window.backToPlanDays()` · `window.openPlanDayScreen()` · `planEditMode` · `applicaModalitaGiorno()` · `window.enterPlanEdit()` · `window.exitPlanEdit()` · `renderDayView()` · `aggiornaIngressoAgente()` · `planMapGruppo` · `renderPlanMap()` · `window.planMapSelect()` · `window.toccaTesta()` · `renderPlanMapList()` · `window.aggiungiPerGruppo()` · `renderPlanDayPicker()` · `window.openAddEx()` · `window.closeAddEx()` · `window.openReco()` · `window.closeReco()`

### 31. `js/ui/piano/aggiungi-allenamento.js` — Aggiungi allenamento alla settimana

`awStep` · `awSource` · `awDays` · `awMode` · `awEsercizi()` · `awNome()` · `awPath` · `awGroups` · `awCustom` · `window.openAddWeek()` · `window.closeAddWeek()` · `window.awBack()` · `window.awChoosePath()` · `window.awToggleGroup()` · `window.awToggleCustom()` · `window.awPickSource()` · `window.awToggleDay()` · `window.awQuick()` · `window.awSetMode()` · `window.awNext()` · `renderAddWeek()` · `applicaAllaSettimana()` · `window.openWeekSheet()` · `window.closeWeekSheet()` · `renderWeekOverview()` · `window.openPlanDay()` · `renderPiano()`

### 32. `js/ui/piano/selezione-multipla.js` — Selezione multipla e azioni di massa

`selectMode` · `selectedIdx` · `window.toggleSelectMode()` · `window.togglePick()` · `window.selectAllPlan()` · `syncBulkBar()` · `window.deleteSelected()` · `window.clearDay()` · `window.copyDayTo()` · `window.toggleReorderMode()` · `window.moveExercise()` · `window.duplicateExercise()` · `window.toggleSuperset()` · `window.startWorkoutFromPlan()` · `editingExerciseIdx` · `planDayOpen` · `window.toggleManualForm()` · `window.startEditExercise()` · `window.cancelEditExercise()` · `window.deletePianoExercise()`

### 33. `js/ui/allenamento/seduta.js` — Tab Allenamento e seduta piu ricca

`RPE_VALORI` · `ultimaVoltaTesto()` · `migliorUnoRM()` · `controllaRecord()` · `window.updateSetRpe()` · `window.addWarmup()` · `window.removeWarmup()` · `window.updateWarmup()` · `window.toggleWarmup()` · `DISCHI` · `COLORE_DISCO` · `window.dischiPerLato()` · `dischiBil` · `window.openPlates()` · `window.closePlates()` · `window.setBilanciere()` · `window.renderPlates()` · `sedutaTimer` · `avviaTempoSeduta()` · `fermaTempoSeduta()` · `renderAllenamento()` · `window.addSetTo()` · `window.removeSetFrom()` · `window.toggleSkipExercise()`

### 34. `js/ui/allenamento/macchinario-occupato.js` — Macchinario occupato: sostituzione per oggi

`ETICHETTA_ATTREZZO` · `ICONA_SCAMBIO` · `ICONA_FRECCIA_GIU` · `occupatoAperto` · `occupatoOpzioni` · `occupatoAscolto` · `impostaOccupato()` · `triggerOccupato()` · `chiudiOccupato()` · `fuoriOccupato()` · `tastoOccupato()` · `prefsOccupato()` · `alternativeOggi()` · `copiaRecord()` · `htmlSostituito()` · `htmlOccupato()` · `window.tastoApriOccupato()` · `window.toggleOccupato()` · `posizionaOccupato()` · `dopoSceltaOccupato()` · `window.sostituisciOggi()` · `window.ripristinaOriginale()` · `ripristinaSostituzioni()` · `pulisciSostituzioniVecchie()` · `window.updateSetField()` · `window.toggleSetDone()` · `window.annullaCedimento()`

### 35. `js/ui/allenamento/sessione.js` — Allenamento: prima il giorno, poi la sessione

`window.backToDayPicker()` · `fattoQuestaSettimana()` · `renderWorkoutDayPicker()` · `window.openWorkoutDay()`

### 36. `js/ui/allenamento/timer-recupero.js` — Timer di recupero e orologio

`updateRecoveryRing()` · `recoveryEndAt` · `recoveryLastShown` · `secondiRimasti()` · `fineRecupero()` · `tickRecupero()` · `avviaTickRecupero()`

## js/core

### 37. `js/core/nativo.js` — Ponte verso il telefono (Capacitor)

`NOTIFICA_RECUPERO` · `window.Nativo()`

## js/ui

### 38. `js/ui/allenamento/timer-pannello.js` — Pannello del timer di recupero

`recoveryEtichetta` · `avvisaTelefonoRecupero()` · `window.openRecoveryPanel()` · `window.closeRecoveryPanel()` · `window.adjustRecoveryTimer()` · `window.toggleRecoveryMute()` · `window.toggleRecoveryExpand()` · `window.startManualRecovery()`

### 39. `js/ui/allenamento/cedimento-canzone.js` — Cedimento: la canzone si sceglie una volta

`MUSIC_KEY` · `musicaRipristinata` · `leggiMusica()` · `window.salvaMusica()` · `nomeMusica()` · `aggiornaRiassuntoMusica()` · `window.ripristinaMusica()` · `window.clearCedimentoAudio()` · `window.openMusicSheet()` · `window.closeMusicSheet()` · `window.switchAudioSourceTab()` · `getResolvedAudioMode()` · `modoCanzone()`

### 40. `js/ui/musica/lettore-fisso.js` — Lettore musicale sempre raggiungibile

`IS_IOS` · `ytSbloccato` · `dockStatoAttuale` · `attesaAvvio` · `inizioSegmento()` · `dockApertoAMano` · `dockChiama` · `dockDaAprire()` · `window.dockStato()` · `window.posizionaDock()` · `window.toggleDock()` · `aggiornaAvvisoDock()` · `window.ytStatoCambiato()` · `controllaAvvioMusica()`

### 41. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set)

`sessioneCanzoneAttiva()` · `dropEndAt` · `dropChiudiTimer` · `DROP_CHIUSURA_MS` · `caricaPlayerWebSalvato()` · `avviaWebPronto()` · `startDropAudio()` · `rilasciaAudioCedimento()` · `updateDropTimerDisplay()` · `updateFireModeState()` · `window.onDropVolumeInput()` · `window.apriCedimento()` · `tickCedimento()` · `finishDropSet()` · `chiudiCedimento()` · `window.stopDropSet()`

### 42. `js/ui/musica/mp3-locale.js` — Libreria MP3 locale (IndexedDB)

`openAudioDB()` · `dbAddTrack()` · `dbGetAllTracks()` · `dbDeleteTrack()` · `readAudioDuration()` · `window.handleAudioUpload()` · `refreshFailureTracks()` · `renderFailureTracks()` · `window.selectTrack()` · `updateMp3SegmentLabel()` · `window.onMp3RangeInput()` · `window.deleteTrack()`

### 43. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify)

`parseWebAudioUrl()` · `setWebStatus()` · `configureWebSegment()` · `updateWebSegmentLabel()` · `window.onWebRangeInput()` · `window.nudgeWebSegment()` · `window.previewWebSegment()` · `window.handleWebLinkSubmit()` · `webToken` · `window.liberaPlayerWeb()` · `playerWebCaricato()` · `ensureYouTubeApi()` · `YT_ERRORS` · `loadYouTubePlayer()` · `readYouTubeDuration()` · `ensureSpotifyApi()` · `loadSpotifyPlayer()`

### 44. `js/ui/gesti.js` — Swipe, rotella dei numeri e trascinamento

`attachSwipe()` · `wheelTarget` · `window.openWheel()` · `window.pickWheel()` · `window.closeWheel()` · `attachRepsField()` · `attachNumberDrag()`

### 45. `js/ui/annulla.js` — Snackbar con Annulla

`snackTimer` · `lastUndo` · `window.showUndo()` · `window.hideSnackbar()`

### 46. `js/ui/riposo-settimane.js` — Giorni di riposo e settimane salvate

`restKey` · `loadRestDays` · `saveRestDays` · `window.isRestDay()` · `window.toggleRestDay()` · `syncRestToggle()` · `weeksKey` · `loadWeeks` · `saveWeeks` · `isoWeekLabel()` · `window.saveWeekSnapshot()` · `window.restoreWeek()` · `window.deleteWeek()` · `renderWeeks()`

### 47. `js/ui/gruppi-muscolari.js` — Schermata gruppi muscolari

`selectedGroups` · `window.toggleGroup()` · `sheetGroup` · `sheetOrder` · `suggestedOrder` · `suggestedOrderKey` · `window.toggleGroupInPlan()` · `pickRow()` · `window.togglePickExercise()` · `renderSuggested()` · `window.openGroupSheet()` · `window.closeGroupSheet()` · `renderSheetExercises()` · `window.removeExerciseByName()` · `window.clearGroupSelection()`

### 48. `js/ui/elenco-esercizi.js` — Elenco ordinato degli esercizi: sezioni, gruppi muscolari, sottogruppi

`sezEsAperte` · `window.azzeraSezioniEsercizi()` · `window.toggleSezioneEsercizi()` · `window.htmlEserciziOrganizzati()` · `window.htmlDettaglioRiga()`

### 49. `js/ui/figura-anatomica.js` — Figura anatomica

`MG_VISTA` · `_figCache` · `window.muscleFigure()` · `muscleFigureNuova()` · `window.muscleCard()` · `MC_PARTS` · `MC_VIEWBOX` · `renderBodyMap()` · `DEFAULT_SETS` · `DEFAULT_REPS` · `REPS_MIN` · `REPS_MAX` · `REPS_MIN_CORPO` · `REPS_MAX_CORPO` · `TIME_MIN` · `TIME_MAX` · `window.isTimeBased()` · `window.perLato()` · `window.corpoLibero()` · `window.repsCorporatura()` · `window.repsRange()` · `window.defaultRepsFor()` · `window.weekUsage()` · `window.usageState()` · `usageBadge()` · `usageRank()` · `VOL_MIN_UTILE` · `VOL_MAX_UTILE` · `window.weeklyVolumeByGroup()` · `volLevel()` · `volLabel()` · `renderGruppi()` · `window.addLibraryExercise()` · `window.applyTemplateFromGroups()`

## js/coach

### 50. `js/coach/pannello.js` — Pannello coach nel tab Piano

`renderCoach()`

## js/ui

### 51. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio

`ultimaChiusuraSeduta` · `obiettivoSeduta()` · `CARDIO_TIPI` · `cardioKey` · `cardioCorrente()` · `cardioAperto` · `nomeCardio()` · `window.renderCardio()` · `window.toggleCardio()` · `window.aggiungiCardio()` · `window.togliCardio()` · `minutiCardioSettimana()` · `window.renderCardioStat()` · `window.endWorkout()`

### 52. `js/ui/storico.js` — Tab Storico

`rigaSeduta()` · `htmlStoricoOrdinato()` · `renderStorico()` · `window.openAllSessions()` · `window.closeAllSessions()` · `renderProgressiTop()` · `window.clearHistory()`

### 53. `js/ui/onboarding.js` — Schermata iniziale: creazione del programma

`ONB_KEY` · `PROFILE_KEY` · `onbStep` · `onbData` · `ONB_GOALS` · `ONB_LEVELS` · `splitFor()` · `splitPerFrequenza()` · `scegliSplit()` · `SLOT_PRIORITA` · `ricettaPunti()` · `schemeFor()` · `PARAM_ETA` · `MSG_ETA_SOTTO_MINIMO` · `MSG_ETA_MANCANTE` · `etaPerProgramma()` · `window.startOnboarding()` · `nuovoOnbData()` · `window.onbSkipAll()` · `window.onbPrev()` · `ONB_ULTIMO` · `window.onbNext()` · `onbStepValid()` · `ONB_FREQ` · `window.onbSetTest()` · `window.onbPick()` · `window.onbSetEta()` · `window.onbToggleGoal()` · `window.onbTogglePriorita()` · `window.onbToggleFastidio()` · `ONB_LUOGHI` · `ONB_FASTIDI` · `ONB_PARQ` · `PARQ_DOMANDE` · `ONB_SONNO` · `ONB_ATTREZZI` · `chip()` · `renderOnb()` · `optHtml()` · `renderBiaStep()` · `onbManuale` · `window.onbToggleManuale()` · `biaField()` · `bindBiaInputs()` · `ensurePdfJs()`

## js/coach

### 54. `js/coach/bia/lettore.js` — Lettore BIA a struttura

`numIt()` · `window.parseInBody()` · `window.parseBiaText()` · `window.handleBiaPdf()` · `window.applyBiaValues()` · `window.analyzeBia()`

### 55. `js/coach/programma/motore.js` — Coach engine: costruzione del programma

`attrezzoDi()` · `attrezzoDiCalcolo()` · `RISCHIO` · `ECCEZIONI_RISCHIO` · `senzaMacchine()` · `ATTREZZI_NON_DI_CASA` · `ATTREZZI_NON_CON_I_MANUBRI` · `attrezzoFisicoDi()` · `attrezzoDiCasaMancante()` · `ATTREZZI_NON_DICHIARABILI_IN_PALESTRA` · `eccezioneRischio()` · `consentito()` · `consentitoCalcolo()` · `sostituto()` · `alternativeStessoMuscolo()` · `schemaMisto()`

### 56. `js/coach/programma/schemi.js` — Schemi di movimento e regole di costruzione

`SCHEMI_MOV` · `SCHEMI_RISERVA` · `schemaDi()` · `ISOLAMENTI` · `isolamentoDi()` · `IN_ALLUNGAMENTO` · `IN_ALLUNGAMENTO_NUOVI` · `SCAMBI_ALLUNGAMENTO_NUOVI` · `inAllungamento()` · `scambiAllungamento()` · `SCAMBI_ALLUNGAMENTO` · `SCHIENA_PESANTE` · `schienaLombare()` · `GLUTEI_FAMIGLIE` · `VOLUME_LIVELLO` · `GRUPPI_PRINCIPALI` · `libNome()`

### 57. `js/coach/programma/ricette.js` — Variazione del coach: ricette a slot e composizione delle sedute (componiSedute)

`rngDa()` · `_n` · `SLOT_DEF` · `RICETTE` · `PRIORI` · `SCHEMI_ATTESI` · `SLOT_PER_SCHEMA` · `adattoAllaSeduta()` · `RIPETIZIONI_SETTIMANA_MAX` · `PARAM_NORDIC` · `RX_NORDIC` · `maxSettimana()` · `ripetizioniFlessione()` · `GRUPPI_DELLA_SEDUTA` · `componiSedute()`

### 58. `js/coach/programma/struttura-pro.js` — Struttura professionale della scheda (ABB-01..10)

`STR_PESI` · `strMeta()` · `strSub()` · `strSchiena()` · `strTier()` · `strRango()` · `window.strOrdina()` · `strChiave()` · `window.strRidondante()` · `window.strTerzoUguale()` · `window.strSquatDoppio()` · `strSerie()` · `STR_FATICA` · `STR_TIRATE_ALTE` · `strEspinta()` · `strEtirata()` · `window.strCopri()` · `window.strBilancia()` · `strCoreNuovo()` · `STR_NOTA_TIRATE` · `window.strFinale()` · `strAntagonisti()` · `strPuoSuperserie()` · `window.strSuperserie()`

### 59. `js/coach/programma/soglie-struttura.js` — Soglie della struttura del programma: blocchi, rampe, RIR e scarico (MES-01, MES-02, MES-03, PRN-03, OBI-03)

`SOGLIE_STRUTTURA`

### 60. `js/coach/programma/mesociclo.js` — Mesociclo: durata, blocchi, rampa di volume, RIR per settimana e scarico (MES-01..03, PRN-03, OBI-03, PRG-01, PRG-38)

`STRUTTURA_V1` · `CLASSI_PIANO` · `RIGA_RIR_DI_CLASSE` · `sogliaStruttura()` · `copiaPiano()` · `pianoAttivo()` · `strutturaProgramma()` · `fasiProgramma()` · `arrotonda2` · `colonnaDelBlocco()` · `rirConPiso()` · `contestoPiano()` · `doseInizialeScarico()` · `rirDellaSettimana()` · `fattoreVolumeSettimana()` · `costruisciPiano()` · `notaDelPiano()` · `pianoMesociclo()` · `esitoControlloPrincipiante()` · `segnaliControlloOttava()` · `CAUSE_CONTROLLO_OTTAVA` · `controlloOttavaPrincipiante()` · `settimanaDelPiano()` · `pianoDellaSettimana()` · `classeRirDi()` · `rirPianoSettimana()`

### 61. `js/coach/programma/completamenti.js` — Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29)

`NOTA_REMATORE_INVERSO` · `NOTA_FEMORALI_SENZA_LEG_CURL` · `FLESSIONI_GINOCCHIO` · `NOTA_FEMORALI_SERVE_FLESSIONE` · `eCernieraFemorali()` · `completaSettimana()` · `rinforzaFemorali()` · `ordinaSedute()`

### 62. `js/coach/volume/serie-ripetizioni.js` — Serie, ripetizioni e pause di ogni esercizio (PRG-13, PRG-14, PRG-20, IPE-04, ETA-02, B2, B34)

`adattoAlCincoPerCinque()` · `prescriviSeduta()` · `prescriviSerie()`

### 63. `js/coach/volume/soglie-volume.js` — Soglie del volume per muscolo (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, EST-05, EST-06)

`SOGLIE_VOLUME`

### 64. `js/coach/volume/volume.js` — Volume per muscolo: fasce per unità, solutore delle serie, tetti, verifica con la causa (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, REG-02, VOL-01, VOL-02, SES-01, REC-01, ESI-01)

`GRUPPI_FRAZIONARI` · `FRAZIONARI_NON_CONTATI` · `gruppoFrazionario()` · `creditoSerie()` · `frazionarieSettimana()` · `GRUPPI_RECUPERO` · `frazGruppoSeduta()` · `giornoSeduta()` · `giorniAdiacenti()` · `recuperoRispettato()` · `recuperoOk()` · `sogliaVolume()` · `VOLUME_UNITA_GRANDI` · `VOLUME_UNITA_GENERALE` · `VOLUME_ETICHETTE` · `VOLUME_PRIORITA_UNITA` · `VOLUME_ZONA_UNITA` · `VOLUME_GRUPPI_RECUPERO` · `VOLUME_GRUPPI_SOMMA` · `VOLUME_FREQUENZA_UNITA` · `VOLUME_FREQUENZA_DIRETTE` · `VOLUME_IMPORTANZA` · `VOLUME_PESI` · `volumeTipo()` · `volumeEtichetta()` · `unitaPriorita()` · `puoSpecializzare()` · `bersagliVolume()` · `_creditiUnitaCache` · `creditiUnita()` · `volumeUnita()` · `volumeNuovoAttivo()` · `volumeMotore()` · `assegnaVolume()` · `puoSalireVolume()` · `noteVolume()` · `limitaVolume()` · `pavimentoVolume()` · `aggiungiSerieUtile()` · `NOTA_VOLUME_STRUTTURA` · `NOTA_VOLUME_MANTENIMENTO` · `validaVolume()` · `limitaVolumePerMuscolo()` · `assegnaVolumeGruppi()` · `limitaVolumeGruppi()`

### 65. `js/coach/volume/tempo.js` — Tempo della seduta: modello dei minuti, pause per classe, capacita, scala del taglio e fattore personale (CAS-05..08, CAS-18, PRG-03, PRG-13, PRG-20, PRG-33, IPE-04, IPE-12)

`PARAM_NUMERO_ESERCIZI` · `PARAM_TEMPO` · `sogliaTempo()` · `tipoObiettivoDi()` · `serieEffettive()` · `round15()` · `REGIONE_ALTO` · `REGIONE_BASSO` · `_infoTempo` · `infoTempo()` · `secSerieDa()` · `pausaDi()` · `durataEsercizio()` · `durataCoppia()` · `rampaDelleSerie()` · `minutiRampa()` · `minutiRiscaldamentoGenerale()` · `_contestoTempo` · `impostaContestoTempo()` · `liberaContestoTempo()` · `opzioniTempo()` · `opzioniTempoProfilo()` · `opzioniTempoCorrenti()` · `durataSeduta()` · `_cacheFattore` · `mediana()` · `fattoreTempo()` · `classePausa()` · `limitiPausa()` · `pausaPrescritta()` · `obiettivoDellaSeduta()` · `regoleDelCoach()` · `pausePerClasse()` · `minutiEffettivi()` · `durataMassimaPrincipiante()` · `obiettivoDaSchema()` · `stimaEsercizi()` · `numeroEsercizi()` · `pavimentoOk()` · `togliEsercizio()` · `eFlessioneGinocchio()` · `unicaFlessioneSettimana()` · `NOTA_FEMORALI_TEMPO` · `scalaDelTempo()` · `sottoFascia()` · `serieSottoFascia()` · `adattaAlTempo()` · `FRASE_TAGLIO_TEMPO` · `FRASE_TAGLIO_TEMPO_SENZA_COPPIE` · `rifinisciAlTempo()` · `FRASE_DURATA` · `FRASE_LAVORO_UTILE` · `FRASE_FATTORE_PIU` · `FRASE_FATTORE_MENO` · `FRASE_MANTENIMENTO` · `FRASE_PRINCIPIANTE_DURATA` · `FRASE_POCO_TEMPO` · `RX_BERSAGLIO_SPINTA` · `RX_BERSAGLIO_TIRATA` · `antagonistiPerMuscolo()` · `coppiaValida()` · `riparaCoppie()` · `riallineaPause()` · `validaTempo()` · `exerciseCountFor()` · `stimaMinutiSeduta()`

### 66. `js/coach/volume/soglie-tempo.js` — Soglie del tempo: tempi per serie e per cambio, riscaldamento, pause per classe, capacita e durata massima (CAS-05..08, CAS-18, PRG-13, PRG-20, IPE-04, IPE-12)

`SOGLIE_TEMPO`

### 67. `js/coach/volume/tecniche.js` — Tecniche di intensita: drop set, myo-reps, superserie, AMRAP, back-off, potenza, cluster e parziali, dosate dal cancello (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02, ABB-06, PRG-34)

`TECNICHE_AL_CEDIMENTO` · `senzaCedimento()` · `senzaCedimentoPer()` · `filtraCoppie()` · `entraNelTetto()` · `muscoloDellEsercizio()` · `distribuisciTecniche()` · `assegnaTecniche()` · `validaTecniche()`

### 68. `js/coach/sicurezza/vincoli.js` — Vincoli di sicurezza del programma (SENTINELLA, MAV-02, MAV-03, B1)

`vincoliSicurezza()` · `tecnicheAlCedimentoAmmesse()`

### 69. `js/coach/sicurezza/soglie-tecniche.js` — Soglie delle tecniche di intensità: budget, posizione nel blocco, volume e limiti (MAV-01..09, MAV-13, ETA-02)

`SOGLIE_TECNICHE`

### 70. `js/coach/sicurezza/tecnica-adatta.js` — Cancello delle tecniche: quale tecnica, su quale esercizio, a chi e quando (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02)

`GRUPPO_TECNICA` · `CLASSI_PER_TECNICA` · `ORDINE_CLASSI` · `RISCHIO_CLASSE` · `RISCHIO_TECNICA` · `MOTIVI_TECNICHE` · `personaTecniche()` · `fastidiDelBrief()` · `vincoliDelBrief()` · `nomeCompletoTecnica()` · `esercizioCaricaIlFastidio()` · `esercizioSenzaCedimento()` · `esercizioSenzaCedimentoPer()` · `posizioneNelBlocco()` · `budgetTecniche()` · `condizioneClasse()` · `macchinaOCavo()` · `tecnicaAdatta()` · `rischioTecnica()` · `scegliTecnicheSicure()` · `serieEquivalentiTecnica()` · `tecnicaContaNelBudget()` · `briefTecnicheOggi()`

### 71. `js/coach/regia/brief.js` — Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6)

`OBIETTIVI_NOTI` · `obiettiviDichiarati()` · `obiettiviEffettivi()` · `faseDaObiettivi()` · `faseCorpo()` · `LIVELLI_NOTI` · `livelloConosciuto()` · `conLivelloNoto()` · `chiDa()` · `briefCoach()` · `risolviMetodo()` · `prefsDelBrief()` · `briefOggi()`

### 72. `js/coach/regia/genera.js` — Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6)

`SPECIALITA_STRUTTURA` · `registraSpecialita()` · `specialitaStruttura()` · `GIORNI_PER_SEDUTE` · `NOTA_SEI_GIORNI` · `NOTA_SEI_GIORNI_DI_FILA` · `NOTA_SEI_GIORNI_48_ORE` · `NOTA_PRINCIPIANTE_4_SEDUTE` · `tipiAdiacenti()` · `riordinaSenzaAdiacenti()` · `giorniSettimana()` · `applicaMetodo()` · `regolaDelPicco()` · `NOTA_POCO_TEMPO_SS` · `NOTA_POCO_TEMPO_SS_DROP` · `NOTA_OVER65_POTENZA` · `NOTA_OVER65` · `NOTA_SENZA_CEDIMENTO_SS` · `NOTA_SENZA_CEDIMENTO` · `noteDelProgramma()` · `applicaScelteUtente()` · `chiudiProgramma()` · `NOTE_REGIONALI` · `riconciliaNote()` · `verificaProgramma()` · `window.buildProgram()` · `generaProgramma()`

## js/ui

### 73. `js/ui/onboarding-risultato.js` — Risultato del programma generato

`renderOnbResult()`

## js/coach

### 74. `js/coach/programma/archivio.js` — Programma e BIA salvati

`progKey` · `biaKey` · `window.getProgramma()` · `window.getBiaStorico()` · `window.aggiungiBia()`

### 75. `js/coach/programma/alternative.js` — Alternative e applicazione del programma

`window.altraVariante()` · `alternativeDi()` · `altScelte` · `window.apriAlternative()` · `window.chiudiAlternative()` · `window.sceltaAlternativa()` · `window.applicaAlternative()` · `window.rimescolaAlternative()` · `renderAlternative()` · `window.applyGeneratedProgram()`

## js/ui

### 76. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo

`APP_VERSIONE` · `DISCHI_KEY` · `NOME_KEY` · `window.cercaAggiornamento()` · `window.getNome()` · `window.salvaNome()` · `statsPeriodo` · `dataSessione()` · `pesoSessione()` · `window.inizioPeriodo()` · `window.calcolaStatistiche()` · `window.tutteLeSedute()` · `volumeSeduta()` · `window.blocchiQuattroSettimane()` · `window.calcolaBlocco()` · `window.setStatsPeriodo()` · `window.openStats()` · `window.closeStats()` · `reportBloccoHtml()` · `periodoTitolo()` · `window.renderStats()`

### 77. `js/ui/statistiche-grafico.js` — Statistiche: poligono di frequenza degli allenamenti

`statsGrafPeriodo` · `STG` · `window.frequenzaSettimanale()` · `poligonoFrequenzaSvg()` · `graficoFrequenzaHtml()` · `scelteStatsPeriodo()` · `mostraPeriodoAttivo()` · `window.setStatsGrafPeriodo()` · `window.renderStatsPagina()`

## js/coach

### 78. `js/coach/carichi/progressivo.js` — Carico progressivo

`arrotonda()` · `incrementoPer()` · `faseSedutaSalvata()` · `esercizioInScarico()` · `sedutePerEsercizio()` · `ultimeSessioni()` · `GIORNI_CARICO_RIFERIMENTO` · `caricoRiferimento()` · `pesoUltimoDi()` · `esito()` · `window.settimanaProgramma()` · `frenoBia()`

### 79. `js/coach/carichi/e1rm.js` — Massimale stimato e carico dal massimale (ALG-04, W1-T3)

`e1rm()` · `caricoPer()` · `e1rmSerie()` · `e1rmSeduta()`

### 80. `js/coach/carichi/soglie-partenza.js` — Soglie del carico di partenza e della calibrazione rapida (PAR-06..09, CAR-18..19)

`SOGLIE_PARTENZA`

### 81. `js/coach/carichi/partenza.js` — Carico di partenza dai dati del corpo

`PARAM_PARTENZA` · `FRASE_PRIMA_ESPOSIZIONE` · `FRASE_PARTENZA_BASSA` · `FRASI_FONTE_STIMA` · `MOTIVI_STIMA` · `NOTE_PROGRAMMA_STIMA` · `NOTA_PARTENZA_BASSA` · `NOTA_BARRA_VUOTA` · `NOTA_SENZA_BARRA` · `notaCorpoLiberoFacile` · `sogliaPartenza()` · `fonteBase()` · `contestoCarichi()` · `classePartenza()` · `fattorePartenza()` · `scalaDaCorpo()` · `scalaDaStorico()` · `esercizioAffidabilePerLoStorico()` · `kStoricoPer()` · `arrotondaPartenza()` · `passoCarico()` · `window.stimaCaricoIniziale()` · `pesoPartenza()` · `_PARTENZA_PER_BRIEF` · `penalitaPartenza()` · `varianteSenzaBilanciere()` · `FACILITATE_PAR09` · `versioneFacilitata()` · `applicaPartenze()`

### 82. `js/coach/carichi/calibrazione.js` — Calibrazione rapida dei carichi stimati (CAR-18, CAR-19)

`FRASE_CARICO_TARATO` · `FRASE_SALTO_TROPPO_GRANDE_PRIMA` · `FRASE_SALTO_TROPPO_GRANDE_DOPO` · `FRASE_PROMEMORIA_RPE` · `virgola` · `recordPianoDi()` · `personaCalibrazione()` · `esposizioniCalibrazione()` · `rpeCalibrazione()` · `rigaSalto()` · `percentualeSalto()` · `pesoDopoSalto()` · `decisioneCalibrazione()` · `storiaCalibrazione()` · `calibrazioneChiusa()` · `calibrazioneNellaSeduta()` · `faseCalibrazione()`

### 83. `js/coach/carichi/taratura.js` — Taratura del RIR (CAR-14, W1-T3)

`segnaEsercizioTaratura()` · `apprendiTaraturaRir()`

### 84. `js/coach/sicurezza/scarico.js` — Scarico: dose, fatica e scarico deciso dal coach (CAR-03, CAR-10, MES-08, W1-T3)

`SOGLIA_SRPE_ALTA` · `livelloFatica()` · `DOSE_SCARICO` · `scaricoReattivo()`

### 85. `js/coach/questionario-decisioni.js` — Questionario di fine allenamento e decisioni

`AGG_KEY` · `window.aggiustiCoach()` · `salvaAggiusti()` · `ZONE_DOLORE` · `ZONA_ART` · `zonaA()` · `zonaIl()` · `STRESS_ZONA` · `senzaEmoji` · `nomeInLibreria()` · `REGIONE_RISCHIO_DOLORE` · `varianteStessoMuscolo()` · `eserciziDeiGiorniCon()` · `PARAM_FATICA_SEDUTA` · `NOTA_AMPIEZZA_SENZA_DOLORE` · `sedutaPesante()` · `fbState` · `window.apriQuestionario()` · `window.fbSet()` · `window.fbZona()` · `window.fbEsercizio()` · `window.fbLivello()` · `etichettaDolore()` · `fbScelta()` · `renderQuestionario()` · `window.chiudiQuestionario()` · `window.decisioniCoach()` · `applicaDecisioni()` · `window.riduciFrequenza()` · `window.inviaQuestionario()`

### 86. `js/coach/prontezza.js` — Prontezza prima della seduta

`PRONTEZZA_KEY` · `PRONTEZZA_VOCI` · `VOCE_CICLO` · `vociProntezza()` · `prontezzaStato` · `leggiProntezza()` · `prontezzaOggi()` · `punteggioProntezza()` · `renderProntezza()` · `window.sceltaProntezza()` · `window.saltaProntezza()` · `window.applicaProntezza()` · `prontezzaDiOggi()`

### 87. `js/coach/mi-sento-male.js` — Mi sento male in seduta

`window.apriMiSentoMale()` · `window.chiudiMiSentoMale()` · `window.chiudiSedutaInterrotta()` · `minutiSeduta()`

### 88. `js/coach/repertorio.js` — Coach 2: repertorio completo

`STANDARD_FORZA` · `ALZATE_BASE` · `pesoCorporeo()` · `STD_SOGLIA_INTERMEDIO` · `STD_SOGLIA_AVANZATO` · `STD_MINIMO_ALZATE` · `COACH_GIORNI_REVISIONE_LIVELLO` · `livelloStandardForza()` · `proposteLivello()` · `window.livelloStimato()` · `prefsCoach()` · `sostituisciNelPiano()` · `cambiaSerieNelPiano()` · `conAnnulla()` · `window.azioneCoach()` · `bloccoCorrente()` · `eserciziFermi()` · `strainSettimane()` · `scaricoRecente()` · `controlloSchemi()` · `azioniCoach()` · `corpoCoach()` · `sedutaSaltata()` · `prossimoGiornoLibero()` · `htmlSedutaSaltata()` · `window.sceltaSaltata()` · `aderenzaDueSettimane()` · `htmlAderenza()` · `window.rispostaAderenza()` · `htmlOrario()` · `verdettoCiclo()` · `htmlFineCiclo()` · `window.nuovoCiclo()`

### 89. `js/coach/dolore-mattina.js` — Controllo del dolore la mattina dopo

`controlloDoloreDaFare()` · `htmlControlloDolore()` · `window.rispostaDolore()` · `consumaAggiusti()` · `RIR_MIN_DOLORE` · `aggiustiAlCarico()`

### 90. `js/coach/regole-ricerca.js` — Coach 2: regole nuove dalla ricerca

`TECNICHE` · `profiloCoach()` · `BIL_PESANTI` · `tipoCarico()` · `RIR_TIPO` · `MES_RIR` · `primaSettimanaBlocco()` · `inDeficitCalorico()` · `pisoRirEsigenza()` · `pavimentoRirMinorenni()` · `pavimentoRirPrincipiante()` · `rirBersaglio()` · `rirDalPiano()` · `rirBersaglioBase()` · `rirBersaglioPerLivello()` · `storicoProntezza()` · `rpeBersaglio()` · `testoRir()` · `PARAM_ANALISI` · `faseDelGiorno()` · `settimanaDellaSeduta()` · `inScarico()` · `sessioniConData()` · `ripresaDopoScarico()` · `rientroDopoPausa()` · `fmtKg` · `obiettivoForza()` · `caricoProssimoBase()` · `window.caricoProssimo()` · `window.applicaCaricoProgressivo()` · `carichiDelGiorno()` · `imparaDallaSeduta()` · `contaStalli()`

### 91. `js/coach/regole-nuove.js` — Regole del coach aggiunte dalla ricerca (RIC-01..05)

`TECNICHE_INTENSE` · `sedutePassate()` · `giorniDallUltimaSeduta()` · `prontezzaRecente()` · `rientroPiano()` · `settimanaCentraleBlocco()` · `gruppoInPriorita()` · `mancavaSoloUltimaSerie()` · `regoleRicAlCarico()` · `limitaTecnicheIntense()`

### 92. `js/coach/intensita.js` — Intensità decisa dal corpo e dalle prime sedute (INT-01..05)

`PARAM_INTENSITA` · `FA_MEDIA` · `faRiferimento()` · `_virg` · `window.statoBia()` · `window.esigenzaIniziale()` · `window.rirExtraIntensita()` · `primaVoltaUnaSerieInMeno()` · `sedutePrimeDelProgramma()` · `window.bilancioPrimeSedute()`

### 93. `js/coach/agente-consigli.js` — Agente coach e consigli del coach 2

`deltaTesto()` · `consigliCoach2()` · `consigliAgente()` · `window.openAgent()` · `window.closeAgent()` · `window.renderAgent()`

### 94. `js/coach/bia/opzioni.js` — BIA nelle opzioni

`biaLetta` · `window.openBiaSheet()` · `window.closeBiaSheet()` · `rigaBia()` · `renderBiaSheet()` · `window.toggleBiaManuale()` · `window.salvaBiaLetta()` · `window.eliminaBia()` · `window.agentBiaPdf()` · `window.compilaBiaAgente()` · `window.salvaBiaAgente()` · `window.restartOnboarding()` · `window.getProfile()`

## js/core

### 95. `js/core/consenso.js` — Consenso ai dati

`CONSENT_KEY` · `CONSENT_VERSION` · `window.consenso()` · `window.coachAttivo()` · `window.chiediConsensoSeServe()`

## js/ui

### 96. `js/ui/guida-interattiva.js` — Guida interattiva

`GUIDA_KEY` · `guidaPasso` · `guidaTimer` · `guidaFoto` · `guidaUltimoCambio` · `GUIDA` · `guidaEl()` · `guidaDatiDemo()` · `guidaPreparaProva()` · `guidaRipristina()` · `window.avviaGuida()` · `window.offriGuida()` · `guidaPosiziona()` · `guidaRidotto()` · `guidaVisibile()` · `guidaServeScroll()` · `guidaScorriVerso()` · `guidaMostra()` · `window.guidaAvanti()` · `window.chiudiGuida()` · `guidaSeguiT` · `guidaSegui()` · `window.guidaAttiva()` · `guidaConsente()` · `guidaCenno()` · `window.setConsenso()` · `window.revocaConsenso()` · `INFORMATIVA` · `renderInformativa()` · `window.openConsentText()` · `window.closeConsentText()`

### 97. `js/ui/opzioni/impostazioni.js` — Impostazioni

`THEME_KEY` · `SOUND_KEY` · `COUNTDOWN_KEY` · `AUTOCLOSE_KEY` · `BYPASS_KEY` · `FLASH_KEY` · `window.getSetting()` · `window.setSetting()` · `window.isOn()` · `window.applyTheme()` · `window.setTheme()` · `ZOOM_KEY` · `window.applicaZoom()` · `window.openSettings()` · `window.closeSettings()` · `window.toggleSetting()` · `segHtml()` · `toggleHtml()`

### 98. `js/ui/opzioni/stile-iphone.js` — Opzioni in stile Impostazioni di iPhone

`SET_ICO` · `setIco()` · `setRow()` · `setRowSwitch()` · `setGroup()`

### 99. `js/ui/opzioni/il-coach.js` — Opzioni: il coach

`FASI_CORPO` · `ATTREZZI_PALESTRA` · `chipCoach()` · `paginaCoach()` · `toggleCoach()` · `window.setCoach()` · `window.setFreqCoach()` · `window.toggleCoachLista()` · `window.togliPreferenza()`

### 100. `js/ui/fogli.js` — Fogli e scambio di file

`foglioDati` · `apriFoglio()` · `window.chiudiFoglio()` · `scegliFile()` · `scaricaFile()` · `dataOra()`

## js/core

### 101. `js/core/schermo-acceso.js` — Schermo acceso durante la seduta

`WAKE_KEY` · `wakeLock` · `wakeVoluto` · `window.tieniSchermoAcceso()` · `sedutaAperta()`

### 102. `js/core/backup.js` — Backup e ripristino

`CHIAVI_APP` · `CHIAVI_TEMPORANEE` · `CHIAVI_NON_RIPRISTINABILI` · `valorePulito()` · `chiaviApp()` · `fotografia()` · `window.esportaBackup()` · `contaAllenamenti()` · `window.ripristinaBackup()` · `applicaFotografia()` · `ricaricaApp()` · `window.confermaRipristino()`

## js/ui

### 103. `js/ui/importa-csv.js` — Importazione CSV di altre app

`leggiCSV()` · `MESI_EN` · `dataDaCSV()` · `numeroCSV()` · `secondiCSV()` · `ALIAS_ESTERI` · `nomeDaEstero()` · `leggiExport()` · `sedutaImportata()` · `window.importaCSV()`

### 104. `js/ui/importa-progressi.js` — Importa i tuoi progressi

`personalizzatiKey` · `eserciziPersonalizzati()` · `normNome()` · `indiceNomiCache` · `indiceNomi()` · `riconosciEsercizio()` · `MESI_NOMI` · `dataInRiga()` · `serieInRiga()` · `leggiTestoLibero()` · `testoDaPdfRighe()` · `leggiFileProgressi()` · `analizzaProgressi()` · `window.importaProgressi()` · `mostraAnteprimaImport()` · `window.confermaImportProgressi()` · `window.confermaImport()`

### 105. `js/ui/seduta-libera.js` — Seduta libera e sedute extra

`SPEC_KEY` · `specialeAttiva()` · `window.sedutaPassataAttiva()` · `ripristinaSpeciale()` · `window.annullaSpeciale()` · `liberaSel` · `liberaTipo` · `liberaFiltro` · `liberaCerca` · `liberaQuando` · `window.apriSedutaLibera()` · `ultimoUso()` · `FILTRI_ATTREZZI` · `renderSedutaLibera()` · `htmlListaLibera()` · `window.renderListaLibera()` · `window.liberaToggle()` · `eserciziDaNomi()` · `window.liberaDaScelta()` · `window.liberaDaStorico()` · `window.liberaDaGiorno()` · `avviaSpeciale()` · `renderSpecialeBox()` · `renderSeduteExtra()` · `arrotondaCarico()` · `window.aggiungiExtra()` · `window.aggiornaExtra()` · `window.togliExtra()` · `window.spuntaExtra()` · `htmlExtra()`

### 106. `js/ui/lavoro-cronometro.js` — Cronometro di lavoro e info esercizio

`infoEsercizio()` · `lavoro` · `window.fermaLavoro()` · `window.avviaLavoro()` · `tickLavoro()` · `htmlLavoro()`

### 107. `js/ui/progressi/riepilogo.js` — Prossima seduta, fatica muscolare e anno

`prossimaSerie()` · `aggiornaProssima()` · `htmlProssimaSeduta()` · `faticaMuscoli()` · `renderFatica()` · `renderAnno()` · `annoRiassunto()`

### 108. `js/ui/progressi/pagine.js` — Progressi: pagine e pesate

`PG_PAGINE` · `PG_ICO` · `pgPagina` · `renderPgTiles()` · `window.apriPagProgressi()` · `window.chiudiPagProgressi()` · `pesateTutte` · `htmlPesate()`

### 109. `js/ui/progressi/foto.js` — Foto dei progressi

`FOTO_DB` · `FOTO_STORE` · `fotoDB()` · `fotoTutte()` · `fotoSalva()` · `fotoTogli()` · `fotoUltimaKey` · `fotoPromemoria()` · `fotoRiduci()` · `window.aggiungiFoto()` · `fotoUrl` · `fotoConfronto` · `window.renderFoto()` · `window.avviaConfronto()` · `window.toccaFoto()` · `mostraFoto()` · `window.chiudiFoto()` · `window.eliminaFoto()`

### 110. `js/ui/progressi/peso.js` — Peso corporeo

`pesoKey` · `pesoObKey` · `pesiTutti()` · `tendenzaPeso()` · `consiglioPeso()` · `graficoPeso()` · `renderPesoCard()` · `window.registraPeso()` · `window.salvaObiettivoPeso()`

### 111. `js/ui/stampa-scheda.js` — Condividi e stampa la scheda

`righeScheda()` · `testoScheda()` · `window.condividiScheda()` · `window.stampaScheda()`

## js/coach

### 112. `js/coach/metodi-momenti.js` — Metodi di allenamento e momenti

`ATTENZIONE_AMRAP` · `FB` · `UL4` · `coppiePerMuscolo()` · `METODI` · `metodoDa()` · `MOMENTI` · `momentoDa()` · `momentoAttivo()` · `applicaMomento()` · `momentoInAttesa` · `window.chiediMomento()` · `window.confermaMomento()` · `window.setMomento()` · `terminaMomento()` · `window.verificaMomento()` · `window.vaiAlMomento()` · `window.fineMomento()` · `prontezzaBassaSettimana()` · `htmlMomento()`

### 113. `js/coach/metodi-epoca-oro.js` — Metodi dell'epoca d'oro del culturismo

_solo istruzioni, nessun nome pubblico_

### 114. `js/coach/compone.js` — Il coach compone

`fattoreFisico()` · `metodoAmmesso()` · `sceltaMetodo()` · `TOCCHI` · `metodiPerTe()` · `htmlMetodi()` · `window.apriTuttiMetodi()` · `htmlIspirazioni()`

### 115. `js/coach/stato.js` — Stato del coach

`renderPianoCoach()` · `htmlMomentoBreve()` · `ultimoGiornoAllenamento()` · `momentoDaChiedere()` · `htmlDomandaMomento()`

### 116. `js/coach/biomeccanica.js` — Biomeccanica del coach

`CUE_SCHEMA` · `cueEsercizio()` · `respiroPer()` · `stabile()` · `htmlProva()` · `TEST_FAI_DA_TE` · `window.setTest()` · `htmlTestFaiDaTe()` · `bonusBiomecc()` · `SCALE_DOLORE`

### 117. `js/coach/esigenza.js` — Esigenza del coach

`ESIGENZA_INIZIO` · `esigenzaEsclusa()` · `esigenzaInDeficit()` · `tettoEsigenza()` · `rpeBersaglioSeduta()` · `window.esigenzaCoach()` · `window.aggiornaEsigenza()` · `segnaDoloreEsigenza()` · `htmlEsigenza()`

### 118. `js/coach/psicologia.js` — Psicologia: chi ha davanti il coach

`PSICO_DOMANDE` · `psicoCoach()` · `ritrattoCoach()` · `window.onbPsico()` · `window.setPsico()` · `htmlDomandePsico()` · `renderPsicoStep()` · `window.onbMomento()` · `htmlPrimiPassi()` · `sedutaPianoB()` · `TEMI` · `renderSettings()` · `setPagina` · `SET_PAGINE` · `window.openSetPage()` · `window.closeSetPage()` · `renderSetPage()` · `window.switchProtocol()`

## js/ui

### 119. `js/ui/schede-esercizio.js` — Schede esercizio: disegno e spiegazione

`arto()` · `tronco()` · `testa()` · `bilanciere()` · `manubrio()` · `freccia()` · `suolo()` · `wrapSvg()` · `inPiedi()` · `accosciato()` · `piegato()` · `sdraiato()` · `PATTERN_DRAW` · `PATTERN_INFO` · `PATTERN_RULES` · `window.patternFor()` · `VIDEO_VERIFICATI` · `VIDEO_PLAYLIST` · `window.testoRicercaVideo()` · `window.videoLinkFor()`

## js/dati

### 120. `js/dati/disegni-esercizi.js` — Disegni degli esercizi

`window.slugEsercizio()` · `IMMAGINI_ESERCIZI` · `window.immagineEsercizio()` · `slotImmagine()`

## js/ui

### 121. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni

`exInfoNome` · `exInfoTab` · `seduteEsercizio()` · `window.setExInfoTab()` · `exVuoto()` · `paneStorico()` · `paneGrafico()` · `paneRecord()`

## js/dati

### 122. `js/dati/schede-tecniche.js` — Schede tecniche per esercizio

`TECNICA` · `RESPIRO` · `GLOSSARIO` · `schedaTecnica()` · `htmlDettaglioScheda()` · `pausaConsigliata()` · `preferenzaEsercizio()` · `window.preferisci()` · `window.openExerciseInfo()` · `window.closeExerciseInfo()`

### 123. `js/dati/schede-varianti.js` — Schede tecniche delle varianti (presa, attacco) e dei classici aggiunti

_solo istruzioni, nessun nome pubblico_

### 124. `js/dati/scheda-unica.js` — Scheda unica per esercizio: tutto quello che l'app sa di un esercizio, in un oggetto solo

`window.schedaUnica()` · `window.bucchiNelleSchede()`

## js/ui

### 125. `js/ui/calendario/mese.js` — Calendario del mese

`calKey` · `loadCal` · `saveCal` · `mcAnno` · `mcMese` · `ymd()` · `daYmd()` · `lunediDi()` · `giorniTra()` · `piuGiorni()` · `giornoSettimana()` · `voceDaPiano()` · `mettiSettimana()` · `copiaSettimana()` · `settimaneDelMese()`

### 126. `js/ui/calendario/gruppi.js` — Gruppi muscolari nel calendario

`GRUPPO_COLORE` · `GRUPPI_ORDINE` · `_mcStorico` · `gruppiDelGiorno()` · `puntiniGruppi()` · `renderLegendaGruppi()` · `renderMonthCal()` · `window.mcMove()`

### 127. `js/ui/calendario/scambio.js` — Scambiare i giorni trascinandoli

`swapAppenaTrascinato` · `attachSwapDrag()` · `window.mcSwapDays()` · `window.mcCellClick()` · `scambiaNelCalendario()` · `aggiornaDopoScambio()` · `window.planSwapDays()` · `window.planDayClick()`

### 128. `js/ui/calendario/copia-settimana.js` — Copiare una settimana come blocco

`mcCopySrc` · `mcCopyTargets` · `etichettaSettimana()` · `settimanaPiena()` · `window.mcSelectWeek()` · `window.mcToggleTarget()` · `window.mcRepeat()` · `window.mcCancelCopy()` · `window.mcPaste()` · `renderCopyBar()` · `attachWeekDrag()` · `window.mcCopyWeeks()` · `window.mcPlaceTemplate()` · `window.mcFillMonth()`

### 129. `js/ui/menu-settimana.js` — Menu della settimana

`wmLunedi` · `window.openWeekMenu()` · `window.closeWeekMenu()` · `renderWeekMenu()` · `window.wmCancellaGiorno()` · `window.wmSvuotaSettimana()` · `window.wmCopiaProssima()` · `window.wmSelezionaPerCopiare()` · `window.mcClearMonth()` · `window.mcOpenDay()` · `window.mcCloseDay()` · `window.mcPlanDay()` · `window.mcRemoveDay()` · `window.segnaFattoNelCalendario()`

### 130. `js/ui/sessione-completata.js` — Sessione gia completata

`mostraSessione()` · `window.openDoneView()` · `window.openHistoryDetail()` · `window.closeDoneView()`

### 131. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)

`icsEscape()` · `icsFold()` · `icsData()` · `window.buildIcs()` · `window.exportIcs()` · `linkGoogle()` · `aggiornaAiutoIcs()`

## js

### 132. `js/avvio.js` — Avvio: ultimo file caricato

_solo istruzioni, nessun nome pubblico_
