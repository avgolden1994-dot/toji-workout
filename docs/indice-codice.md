# Indice del codice

File generato da `tools/indice.js` (`npm run indice`): non si modifica a mano.
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

## js/dati

### 9. `js/dati/schede-pronte.js` — Libreria delle schede pronte

`WORKOUT_TEMPLATES`

### 10. `js/dati/libreria-esercizi.js` — Libreria esercizi con metadati

`MUSCLE_GROUPS` · `EXERCISE_LIBRARY` · `buildExerciseSelect()` · `findExercise()`

## js/coach

### 11. `js/coach/parametri.js` — Parametri del coach: tutte le soglie e i fattori in un posto solo

`COACH_PARAMETRI` · `REGOLE_SPEGNIBILI` · `REGOLE_SPENTE_KEY` · `window.regolaAttiva()`

### 12. `js/coach/catalogo-regole.js` — Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da

`COACH_REGOLE` · `window.regolaDescritta()`

### 13. `js/coach/suggeritore.js` — Motore del coach: suggerimento del prossimo esercizio

`suggestNextExercises()`

## js/core

### 14. `js/core/stato-condiviso.js` — Stato condiviso di timer, cedimento e musica

`recoveryInterval` · `recoveryRemaining` · `recoveryTotal` · `recoveryMuted` · `RECOVERY_RING_CIRCUMFERENCE` · `dropInterval` · `dropRemaining` · `dropActive` · `armedSet` · `activeSourceTab` · `currentWebMode` · `AUDIO_DB_NAME` · `AUDIO_DB_VERSION` · `AUDIO_STORE` · `failureTracks` · `selectedTrackId` · `selectedTrackUrl` · `ytPlayer` · `ytPlayerReady` · `spotifyController` · `spotifyReady` · `webDuration`

### 15. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati

`dataKey` · `historyKey` · `titlesKey` · `leggiJSON()` · `loadTitles` · `saveTitles` · `getDayTitle()` · `normalizeExerciseRecord()` · `loadData()` · `saveData` · `normalizeHistoryEntry()` · `loadHistory()` · `saveHistory` · `migrateLegacyDataIfNeeded()` · `seedDefaultsIfNeeded()`

## js/ui

### 16. `js/ui/piano/schede-pronte.js` — Selettore schede pronte e titolo della giornata

`window.openTemplatePicker()` · `window.closeTemplatePicker()` · `window.applyTemplate()` · `window.renameDayTitle()`

## js/core

### 17. `js/core/modalita.js` — Modalita (id interno dei dati)

`getStoredMode()` · `window.chooseMode()` · `activateMode()`

### 18. `js/core/navigazione.js` — Navigazione: giorni e tab

`daysContainer` · `renderDayBar()` · `window.selectDay()`

## js/ui

### 19. `js/ui/oggi.js` — Schermata Oggi

`CATEGORIE` · `categoriaDi()` · `window.obiettiviSettimana()` · `window.settimaneDiFila()` · `window.renderOggi()` · `window.iniziaOggi()` · `window.switchTab()`

## js/core

### 20. `js/core/utility.js` — Utility

`escapeHtml()` · `nomeSicuro()` · `pulisciDeep()` · `jsArg()` · `formatMMSS()` · `formatNow()` · `handleSelectExercise()` · `audioCtx` · `getAudioCtx()`

### 21. `js/core/audio-silenzioso.js` — Suono con il telefono in silenzioso

`SILENZIO_WAV` · `mediaKeeper`

### 22. `js/core/musica-altre-app.js` — Convivenza con la musica delle altre app

`tipoSessione()` · `avviaCanaleMultimediale()` · `fermaCanaleMultimediale()` · `window.lampeggia()` · `unlockAudio()` · `playTone()` · `playBeep()` · `window.testSound()` · `playTick()` · `playEnd()` · `window.stepValue()`

## js/ui

### 23. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata

`syncBuildingLine()` · `window.backToPlanDays()` · `window.openPlanDayScreen()` · `planEditMode` · `applicaModalitaGiorno()` · `window.enterPlanEdit()` · `window.exitPlanEdit()` · `renderDayView()` · `aggiornaIngressoAgente()` · `planMapGruppo` · `renderPlanMap()` · `window.planMapSelect()` · `window.toccaTesta()` · `renderPlanMapList()` · `window.aggiungiPerGruppo()` · `renderPlanDayPicker()` · `window.openAddEx()` · `window.closeAddEx()` · `window.openReco()` · `window.closeReco()`

### 24. `js/ui/piano/aggiungi-allenamento.js` — Aggiungi allenamento alla settimana

`awStep` · `awSource` · `awDays` · `awMode` · `awEsercizi()` · `awNome()` · `awPath` · `awGroups` · `awCustom` · `window.openAddWeek()` · `window.closeAddWeek()` · `window.awBack()` · `window.awChoosePath()` · `window.awToggleGroup()` · `window.awToggleCustom()` · `window.awPickSource()` · `window.awToggleDay()` · `window.awQuick()` · `window.awSetMode()` · `window.awNext()` · `renderAddWeek()` · `applicaAllaSettimana()` · `window.openWeekSheet()` · `window.closeWeekSheet()` · `renderWeekOverview()` · `window.openPlanDay()` · `renderPiano()`

### 25. `js/ui/piano/selezione-multipla.js` — Selezione multipla e azioni di massa

`selectMode` · `selectedIdx` · `window.toggleSelectMode()` · `window.togglePick()` · `window.selectAllPlan()` · `syncBulkBar()` · `window.deleteSelected()` · `window.clearDay()` · `window.copyDayTo()` · `window.toggleReorderMode()` · `window.moveExercise()` · `window.duplicateExercise()` · `window.toggleSuperset()` · `window.startWorkoutFromPlan()` · `editingExerciseIdx` · `planDayOpen` · `window.toggleManualForm()` · `window.startEditExercise()` · `window.cancelEditExercise()` · `window.deletePianoExercise()`

### 26. `js/ui/allenamento/seduta.js` — Tab Allenamento e seduta piu ricca

`RPE_VALORI` · `ultimaVoltaTesto()` · `unoRM()` · `migliorUnoRM()` · `controllaRecord()` · `window.updateSetRpe()` · `window.addWarmup()` · `window.removeWarmup()` · `window.updateWarmup()` · `window.toggleWarmup()` · `DISCHI` · `COLORE_DISCO` · `window.dischiPerLato()` · `dischiBil` · `window.openPlates()` · `window.closePlates()` · `window.setBilanciere()` · `window.renderPlates()` · `sedutaTimer` · `avviaTempoSeduta()` · `fermaTempoSeduta()` · `renderAllenamento()` · `window.addSetTo()` · `window.removeSetFrom()` · `window.toggleSkipExercise()`

### 27. `js/ui/allenamento/macchinario-occupato.js` — Macchinario occupato: sostituzione per oggi

`ETICHETTA_ATTREZZO` · `ICONA_SCAMBIO` · `ICONA_FRECCIA_GIU` · `occupatoAperto` · `occupatoOpzioni` · `prefsOccupato()` · `alternativeOggi()` · `copiaRecord()` · `htmlSostituito()` · `htmlOccupato()` · `window.toggleOccupato()` · `window.sostituisciOggi()` · `window.ripristinaOriginale()` · `ripristinaSostituzioni()` · `pulisciSostituzioniVecchie()` · `window.updateSetField()` · `window.toggleSetDone()` · `window.annullaCedimento()` · `window.armDropTarget()` · `refreshDropButtonState()`

### 28. `js/ui/allenamento/sessione.js` — Allenamento: prima il giorno, poi la sessione

`window.backToDayPicker()` · `fattoQuestaSettimana()` · `renderWorkoutDayPicker()` · `window.openWorkoutDay()`

### 29. `js/ui/allenamento/timer-recupero.js` — Timer di recupero e orologio

`updateRecoveryRing()` · `recoveryEndAt` · `recoveryLastShown` · `secondiRimasti()` · `fineRecupero()` · `tickRecupero()` · `avviaTickRecupero()`

## js/core

### 30. `js/core/nativo.js` — Ponte verso il telefono (Capacitor)

`NOTIFICA_RECUPERO` · `window.Nativo()`

## js/ui

### 31. `js/ui/allenamento/timer-pannello.js` — Pannello del timer di recupero

`recoveryEtichetta` · `avvisaTelefonoRecupero()` · `window.openRecoveryPanel()` · `window.closeRecoveryPanel()` · `window.adjustRecoveryTimer()` · `window.toggleRecoveryMute()` · `window.toggleRecoveryExpand()` · `window.startManualRecovery()`

### 32. `js/ui/allenamento/cedimento-canzone.js` — Cedimento: la canzone si sceglie una volta

`MUSIC_KEY` · `musicaRipristinata` · `leggiMusica()` · `window.salvaMusica()` · `nomeMusica()` · `aggiornaRiassuntoMusica()` · `window.ripristinaMusica()` · `window.clearCedimentoAudio()` · `window.openMusicSheet()` · `window.closeMusicSheet()` · `window.switchAudioSourceTab()` · `getResolvedAudioMode()`

### 33. `js/ui/musica/lettore-fisso.js` — Lettore musicale sempre raggiungibile

`IS_IOS` · `ytSbloccato` · `dockStatoAttuale` · `attesaAvvio` · `inizioSegmento()` · `dockApertoAMano` · `dockChiama` · `dockDaAprire()` · `window.dockStato()` · `window.posizionaDock()` · `window.toggleDock()` · `aggiornaAvvisoDock()` · `window.ytStatoCambiato()` · `controllaAvvioMusica()`

### 34. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set)

`sessioneCanzoneAttiva()` · `rilasciaSessioneCanzone()` · `startDropAudio()` · `stopDropAudio()` · `updateDropTimerDisplay()` · `updateFireModeState()` · `window.onDropVolumeInput()` · `window.startDropSet()` · `dropEndAt` · `tickCedimento()` · `finishDropSet()` · `window.stopDropSet()`

### 35. `js/ui/musica/mp3-locale.js` — Libreria MP3 locale (IndexedDB)

`openAudioDB()` · `dbAddTrack()` · `dbGetAllTracks()` · `dbDeleteTrack()` · `readAudioDuration()` · `window.handleAudioUpload()` · `refreshFailureTracks()` · `renderFailureTracks()` · `window.selectTrack()` · `updateMp3SegmentLabel()` · `window.onMp3RangeInput()` · `window.deleteTrack()`

### 36. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify)

`parseWebAudioUrl()` · `setWebStatus()` · `configureWebSegment()` · `updateWebSegmentLabel()` · `window.onWebRangeInput()` · `window.nudgeWebSegment()` · `window.previewWebSegment()` · `window.handleWebLinkSubmit()` · `ensureYouTubeApi()` · `YT_ERRORS` · `loadYouTubePlayer()` · `readYouTubeDuration()` · `ensureSpotifyApi()` · `loadSpotifyPlayer()`

### 37. `js/ui/gesti.js` — Swipe, rotella dei numeri e trascinamento

`attachSwipe()` · `wheelTarget` · `window.openWheel()` · `window.pickWheel()` · `window.closeWheel()` · `attachRepsField()` · `attachNumberDrag()`

### 38. `js/ui/annulla.js` — Snackbar con Annulla

`snackTimer` · `lastUndo` · `window.showUndo()` · `window.hideSnackbar()`

### 39. `js/ui/riposo-settimane.js` — Giorni di riposo e settimane salvate

`restKey` · `loadRestDays` · `saveRestDays` · `window.isRestDay()` · `window.toggleRestDay()` · `syncRestToggle()` · `weeksKey` · `loadWeeks` · `saveWeeks` · `isoWeekLabel()` · `window.saveWeekSnapshot()` · `window.restoreWeek()` · `window.deleteWeek()` · `renderWeeks()`

### 40. `js/ui/gruppi-muscolari.js` — Schermata gruppi muscolari

`selectedGroups` · `window.toggleGroup()` · `sheetGroup` · `sheetOrder` · `sheetExpanded` · `suggestedExpanded` · `suggestedOrder` · `suggestedOrderKey` · `window.toggleGroupInPlan()` · `window.toggleSuggestedExpanded()` · `pickRow()` · `window.togglePickExercise()` · `renderSuggested()` · `window.openGroupSheet()` · `window.closeGroupSheet()` · `renderSheetExercises()` · `window.toggleSheetExpanded()` · `window.removeExerciseByName()` · `window.clearGroupSelection()`

### 41. `js/ui/figura-anatomica.js` — Figura anatomica

`MG_VISTA` · `_figCache` · `window.muscleFigure()` · `muscleFigureNuova()` · `window.muscleCard()` · `MC_PARTS` · `MC_VIEWBOX` · `renderBodyMap()` · `DEFAULT_SETS` · `DEFAULT_REPS` · `REPS_MIN` · `REPS_MAX` · `TIME_MIN` · `TIME_MAX` · `window.isTimeBased()` · `window.perLato()` · `window.corpoLibero()` · `window.repsRange()` · `window.defaultRepsFor()` · `window.weekUsage()` · `window.usageState()` · `usageBadge()` · `usageRank()` · `VOL_MIN_UTILE` · `VOL_MAX_UTILE` · `window.weeklyVolumeByGroup()` · `volLevel()` · `volLabel()` · `renderGruppi()` · `window.addLibraryExercise()` · `window.applyTemplateFromGroups()`

## js/coach

### 42. `js/coach/pannello.js` — Pannello coach nel tab Piano

`renderCoach()`

## js/ui

### 43. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio

`ultimaChiusuraSeduta` · `CARDIO_TIPI` · `cardioKey` · `cardioCorrente()` · `cardioAperto` · `nomeCardio()` · `window.renderCardio()` · `window.toggleCardio()` · `window.aggiungiCardio()` · `window.togliCardio()` · `minutiCardioSettimana()` · `window.renderCardioStat()` · `window.endWorkout()`

### 44. `js/ui/storico.js` — Tab Storico

`rigaSeduta()` · `htmlStoricoOrdinato()` · `renderStorico()` · `window.openAllSessions()` · `window.closeAllSessions()` · `renderProgressiTop()` · `window.clearHistory()`

### 45. `js/ui/onboarding.js` — Schermata iniziale: creazione del programma

`ONB_KEY` · `PROFILE_KEY` · `onbStep` · `onbData` · `ONB_GOALS` · `ONB_LEVELS` · `splitFor()` · `splitPerFrequenza()` · `SLOT_PRIORITA` · `ricettaPunti()` · `schemeFor()` · `exerciseCountFor()` · `window.startOnboarding()` · `nuovoOnbData()` · `window.onbSkipAll()` · `window.onbPrev()` · `ONB_ULTIMO` · `window.onbNext()` · `onbStepValid()` · `ONB_FREQ` · `window.onbSetTest()` · `window.onbPick()` · `window.onbToggleGoal()` · `window.onbTogglePriorita()` · `window.onbToggleFastidio()` · `ONB_LUOGHI` · `ONB_FASTIDI` · `ONB_PARQ` · `PARQ_DOMANDE` · `ONB_SONNO` · `ONB_ATTREZZI` · `chip()` · `renderOnb()` · `optHtml()` · `renderBiaStep()` · `onbManuale` · `window.onbToggleManuale()` · `biaField()` · `bindBiaInputs()` · `ensurePdfJs()`

## js/coach

### 46. `js/coach/bia/lettore.js` — Lettore BIA a struttura

`numIt()` · `window.parseInBody()` · `window.parseBiaText()` · `window.handleBiaPdf()` · `window.applyBiaValues()` · `window.analyzeBia()`

### 47. `js/coach/programma/motore.js` — Coach engine: costruzione del programma

`strutturaProgramma()` · `fasiProgramma()` · `attrezzoDi()` · `RISCHIO` · `consentito()` · `sostituto()` · `schemaMisto()`

### 48. `js/coach/programma/schemi.js` — Schemi di movimento e regole di costruzione

`SCHEMI_MOV` · `schemaDi()` · `ISOLAMENTI` · `isolamentoDi()` · `IN_ALLUNGAMENTO` · `IN_ALLUNGAMENTO_NUOVI` · `SCAMBI_ALLUNGAMENTO_NUOVI` · `inAllungamento()` · `scambiAllungamento()` · `SCAMBI_ALLUNGAMENTO` · `SCHIENA_PESANTE` · `GLUTEI_FAMIGLIE` · `VOLUME_LIVELLO` · `GRUPPI_PRINCIPALI` · `libNome()`

### 49. `js/coach/programma/ricette.js` — Variazione del coach: ricette a slot e buildProgram

`rngDa()` · `_n` · `SLOT_DEF` · `RICETTE` · `PRIORI` · `window.buildProgram()`

## js/ui

### 50. `js/ui/onboarding-risultato.js` — Risultato del programma generato

`renderOnbResult()`

## js/coach

### 51. `js/coach/programma/archivio.js` — Programma e BIA salvati

`progKey` · `biaKey` · `window.getProgramma()` · `window.getBiaStorico()` · `window.aggiungiBia()`

### 52. `js/coach/programma/alternative.js` — Alternative e applicazione del programma

`window.altraVariante()` · `alternativeDi()` · `altScelte` · `window.apriAlternative()` · `window.chiudiAlternative()` · `window.sceltaAlternativa()` · `window.applicaAlternative()` · `window.rimescolaAlternative()` · `renderAlternative()` · `window.applyGeneratedProgram()`

## js/ui

### 53. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo

`APP_VERSIONE` · `DISCHI_KEY` · `NOME_KEY` · `window.cercaAggiornamento()` · `window.getNome()` · `window.salvaNome()` · `statsPeriodo` · `dataSessione()` · `pesoSessione()` · `window.calcolaStatistiche()` · `window.tutteLeSedute()` · `volumeSeduta()` · `window.blocchiQuattroSettimane()` · `window.calcolaBlocco()` · `window.setStatsPeriodo()` · `window.openStats()` · `window.closeStats()` · `reportBloccoHtml()` · `window.renderStats()`

## js/coach

### 54. `js/coach/carichi/progressivo.js` — Carico progressivo

`arrotonda()` · `incrementoPer()` · `ultimeSessioni()` · `esito()` · `window.settimanaProgramma()` · `frenoBia()`

### 55. `js/coach/carichi/partenza.js` — Carico di partenza dai dati del corpo

`PARAM_PARTENZA` · `MOTIVI_STIMA` · `contestoCarichi()` · `scalaDaCorpo()` · `scalaDaStorico()` · `arrotondaPartenza()` · `window.stimaCaricoIniziale()` · `pesoPartenza()`

### 56. `js/coach/questionario-decisioni.js` — Questionario di fine allenamento e decisioni

`AGG_KEY` · `window.aggiustiCoach()` · `salvaAggiusti()` · `ZONE_DOLORE` · `ZONA_ART` · `zonaA()` · `zonaIl()` · `STRESS_ZONA` · `SOSTITUZIONI` · `senzaEmoji` · `nomeInLibreria()` · `fbState` · `window.apriQuestionario()` · `window.fbSet()` · `window.fbZona()` · `window.fbEsercizio()` · `window.fbLivello()` · `etichettaDolore()` · `fbScelta()` · `renderQuestionario()` · `window.chiudiQuestionario()` · `window.decisioniCoach()` · `applicaDecisioni()` · `window.riduciFrequenza()` · `window.inviaQuestionario()`

### 57. `js/coach/prontezza.js` — Prontezza prima della seduta

`PRONTEZZA_KEY` · `PRONTEZZA_VOCI` · `VOCE_CICLO` · `vociProntezza()` · `prontezzaStato` · `leggiProntezza()` · `prontezzaOggi()` · `punteggioProntezza()` · `renderProntezza()` · `window.sceltaProntezza()` · `window.saltaProntezza()` · `window.applicaProntezza()`

### 58. `js/coach/mi-sento-male.js` — Mi sento male in seduta

`window.apriMiSentoMale()` · `window.chiudiMiSentoMale()` · `window.chiudiSedutaInterrotta()` · `minutiSeduta()`

### 59. `js/coach/repertorio.js` — Coach 2: repertorio completo

`STANDARD_FORZA` · `ALZATE_BASE` · `pesoCorporeo()` · `window.livelloStimato()` · `prefsCoach()` · `sostituisciNelPiano()` · `cambiaSerieNelPiano()` · `conAnnulla()` · `window.azioneCoach()` · `bloccoCorrente()` · `eserciziFermi()` · `strainSettimane()` · `controlloSchemi()` · `azioniCoach()` · `corpoCoach()` · `sedutaSaltata()` · `prossimoGiornoLibero()` · `htmlSedutaSaltata()` · `window.sceltaSaltata()` · `aderenzaDueSettimane()` · `htmlAderenza()` · `window.rispostaAderenza()` · `htmlOrario()` · `verdettoCiclo()` · `htmlFineCiclo()` · `window.nuovoCiclo()`

### 60. `js/coach/dolore-mattina.js` — Controllo del dolore la mattina dopo

`controlloDoloreDaFare()` · `htmlControlloDolore()` · `window.rispostaDolore()` · `consumaAggiusti()` · `window.caricoProssimo()`

### 61. `js/coach/regole-ricerca.js` — Coach 2: regole nuove dalla ricerca

`TECNICHE` · `profiloCoach()` · `BIL_PESANTI` · `tipoCarico()` · `RIR_TIPO` · `rirBersaglio()` · `rirBersaglioBase()` · `livelloFatica()` · `DOSE_SCARICO` · `storicoProntezza()` · `rpeBersaglio()` · `testoRir()` · `e1rmSerie()` · `e1rmSeduta()` · `sessioniConData()` · `rientroDopoPausa()` · `fmtKg` · `caricoProssimoBase()` · `window.applicaCaricoProgressivo()` · `imparaDallaSeduta()`

### 62. `js/coach/regole-nuove.js` — Regole del coach aggiunte dalla ricerca (RIC-01..05)

`TECNICHE_INTENSE` · `sedutePassate()` · `giorniDallUltimaSeduta()` · `prontezzaRecente()` · `rientroPiano()` · `settimanaCentraleBlocco()` · `gruppoInPriorita()` · `mancavaSoloUltimaSerie()` · `_caricoProssimoPrima` · `window.caricoProssimo()` · `limitaTecnicheIntense()` · `_applicaCaricoPrima` · `window.applicaCaricoProgressivo()` · `_applicaProntezzaPrima` · `window.applicaProntezza()`

### 63. `js/coach/agente-consigli.js` — Agente coach e consigli del coach 2

`deltaTesto()` · `consigliCoach2()` · `consigliAgente()` · `window.openAgent()` · `window.closeAgent()` · `window.renderAgent()`

### 64. `js/coach/bia/opzioni.js` — BIA nelle opzioni

`biaLetta` · `window.openBiaSheet()` · `window.closeBiaSheet()` · `rigaBia()` · `renderBiaSheet()` · `window.toggleBiaManuale()` · `window.salvaBiaLetta()` · `window.eliminaBia()` · `window.agentBiaPdf()` · `window.compilaBiaAgente()` · `window.salvaBiaAgente()` · `window.restartOnboarding()` · `window.getProfile()`

## js/core

### 65. `js/core/consenso.js` — Consenso ai dati

`CONSENT_KEY` · `CONSENT_VERSION` · `window.consenso()` · `window.coachAttivo()` · `window.chiediConsensoSeServe()`

## js/ui

### 66. `js/ui/guida-interattiva.js` — Guida interattiva

`GUIDA_KEY` · `guidaPasso` · `guidaTimer` · `guidaFoto` · `guidaUltimoCambio` · `GUIDA` · `guidaEl()` · `guidaDatiDemo()` · `guidaPreparaProva()` · `guidaRipristina()` · `window.avviaGuida()` · `window.offriGuida()` · `guidaPosiziona()` · `guidaRidotto()` · `guidaVisibile()` · `guidaServeScroll()` · `guidaScorriVerso()` · `guidaMostra()` · `window.guidaAvanti()` · `window.chiudiGuida()` · `guidaSeguiT` · `guidaSegui()` · `window.setConsenso()` · `window.revocaConsenso()` · `INFORMATIVA` · `renderInformativa()` · `window.openConsentText()` · `window.closeConsentText()`

### 67. `js/ui/opzioni/impostazioni.js` — Impostazioni

`THEME_KEY` · `SOUND_KEY` · `COUNTDOWN_KEY` · `AUTOCLOSE_KEY` · `BYPASS_KEY` · `FLASH_KEY` · `window.getSetting()` · `window.setSetting()` · `window.isOn()` · `window.applyTheme()` · `window.setTheme()` · `ZOOM_KEY` · `window.applicaZoom()` · `window.openSettings()` · `window.closeSettings()` · `window.toggleSetting()` · `segHtml()` · `toggleHtml()`

### 68. `js/ui/opzioni/stile-iphone.js` — Opzioni in stile Impostazioni di iPhone

`SET_ICO` · `setIco()` · `setRow()` · `setRowSwitch()` · `setGroup()`

### 69. `js/ui/opzioni/il-coach.js` — Opzioni: il coach

`FASI_CORPO` · `ATTREZZI_PALESTRA` · `chipCoach()` · `paginaCoach()` · `toggleCoach()` · `window.setCoach()` · `window.setFreqCoach()` · `window.toggleCoachLista()` · `window.togliPreferenza()`

### 70. `js/ui/fogli.js` — Fogli e scambio di file

`foglioDati` · `apriFoglio()` · `window.chiudiFoglio()` · `scegliFile()` · `scaricaFile()` · `dataOra()`

## js/core

### 71. `js/core/schermo-acceso.js` — Schermo acceso durante la seduta

`WAKE_KEY` · `wakeLock` · `wakeVoluto` · `window.tieniSchermoAcceso()` · `sedutaAperta()`

### 72. `js/core/backup.js` — Backup e ripristino

`CHIAVI_APP` · `CHIAVI_TEMPORANEE` · `CHIAVI_NON_RIPRISTINABILI` · `valorePulito()` · `chiaviApp()` · `fotografia()` · `window.esportaBackup()` · `contaAllenamenti()` · `window.ripristinaBackup()` · `applicaFotografia()` · `ricaricaApp()` · `window.confermaRipristino()`

## js/ui

### 73. `js/ui/importa-csv.js` — Importazione CSV di altre app

`leggiCSV()` · `MESI_EN` · `dataDaCSV()` · `numeroCSV()` · `secondiCSV()` · `ALIAS_ESTERI` · `nomeDaEstero()` · `leggiExport()` · `sedutaImportata()` · `window.importaCSV()`

### 74. `js/ui/importa-progressi.js` — Importa i tuoi progressi

`personalizzatiKey` · `eserciziPersonalizzati()` · `normNome()` · `indiceNomiCache` · `indiceNomi()` · `riconosciEsercizio()` · `MESI_NOMI` · `dataInRiga()` · `serieInRiga()` · `leggiTestoLibero()` · `testoDaPdfRighe()` · `leggiFileProgressi()` · `analizzaProgressi()` · `window.importaProgressi()` · `mostraAnteprimaImport()` · `window.confermaImportProgressi()` · `window.confermaImport()`

### 75. `js/ui/seduta-libera.js` — Seduta libera e sedute extra

`SPEC_KEY` · `specialeAttiva()` · `window.sedutaPassataAttiva()` · `ripristinaSpeciale()` · `window.annullaSpeciale()` · `liberaSel` · `liberaTipo` · `liberaFiltro` · `liberaCerca` · `liberaQuando` · `window.apriSedutaLibera()` · `ultimoUso()` · `FILTRI_ATTREZZI` · `renderSedutaLibera()` · `htmlListaLibera()` · `window.renderListaLibera()` · `window.liberaToggle()` · `eserciziDaNomi()` · `window.liberaDaScelta()` · `window.liberaDaStorico()` · `window.liberaDaGiorno()` · `avviaSpeciale()` · `renderSpecialeBox()` · `renderSeduteExtra()` · `arrotondaCarico()` · `window.aggiungiExtra()` · `window.aggiornaExtra()` · `window.togliExtra()` · `window.spuntaExtra()` · `htmlExtra()`

### 76. `js/ui/lavoro-cronometro.js` — Cronometro di lavoro e info esercizio

`infoEsercizio()` · `lavoro` · `window.fermaLavoro()` · `window.avviaLavoro()` · `tickLavoro()` · `htmlLavoro()`

### 77. `js/ui/progressi/riepilogo.js` — Prossima seduta, fatica muscolare e anno

`prossimaSerie()` · `aggiornaProssima()` · `htmlProssimaSeduta()` · `faticaMuscoli()` · `renderFatica()` · `renderAnno()` · `annoRiassunto()`

### 78. `js/ui/progressi/pagine.js` — Progressi: pagine e pesate

`PG_PAGINE` · `PG_ICO` · `pgPagina` · `renderPgTiles()` · `window.apriPagProgressi()` · `window.chiudiPagProgressi()` · `pesateTutte` · `htmlPesate()`

### 79. `js/ui/progressi/foto.js` — Foto dei progressi

`FOTO_DB` · `FOTO_STORE` · `fotoDB()` · `fotoTutte()` · `fotoSalva()` · `fotoTogli()` · `fotoUltimaKey` · `fotoPromemoria()` · `fotoRiduci()` · `window.aggiungiFoto()` · `fotoUrl` · `fotoConfronto` · `window.renderFoto()` · `window.avviaConfronto()` · `window.toccaFoto()` · `mostraFoto()` · `window.chiudiFoto()` · `window.eliminaFoto()`

### 80. `js/ui/progressi/peso.js` — Peso corporeo

`pesoKey` · `pesoObKey` · `pesiTutti()` · `tendenzaPeso()` · `faseCorpo()` · `consiglioPeso()` · `graficoPeso()` · `renderPesoCard()` · `window.registraPeso()` · `window.salvaObiettivoPeso()`

### 81. `js/ui/stampa-scheda.js` — Condividi e stampa la scheda

`righeScheda()` · `testoScheda()` · `window.condividiScheda()` · `window.stampaScheda()`

## js/coach

### 82. `js/coach/metodi-momenti.js` — Metodi di allenamento e momenti

`FB` · `UL4` · `METODI` · `metodoDa()` · `MOMENTI` · `momentoDa()` · `momentoAttivo()` · `applicaMomento()` · `momentoInAttesa` · `window.chiediMomento()` · `window.confermaMomento()` · `window.setMomento()` · `terminaMomento()` · `window.verificaMomento()` · `window.vaiAlMomento()` · `window.fineMomento()` · `prontezzaBassaSettimana()` · `htmlMomento()`

### 83. `js/coach/compone.js` — Il coach compone

`fattoreFisico()` · `metodoAmmesso()` · `sceltaMetodo()` · `TOCCHI` · `metodiPerTe()` · `htmlMetodi()` · `window.apriTuttiMetodi()` · `htmlIspirazioni()`

### 84. `js/coach/stato.js` — Stato del coach

`renderPianoCoach()` · `htmlMomentoBreve()` · `ultimoGiornoAllenamento()` · `momentoDaChiedere()` · `htmlDomandaMomento()`

### 85. `js/coach/biomeccanica.js` — Biomeccanica del coach

`CUE_SCHEMA` · `cueEsercizio()` · `respiroPer()` · `stabile()` · `htmlProva()` · `TEST_FAI_DA_TE` · `window.setTest()` · `htmlTestFaiDaTe()` · `bonusBiomecc()` · `SCALE_DOLORE`

### 86. `js/coach/esigenza.js` — Esigenza del coach

`ESIGENZA_INIZIO` · `esigenzaEsclusa()` · `window.esigenzaCoach()` · `window.aggiornaEsigenza()` · `segnaDoloreEsigenza()` · `htmlEsigenza()`

### 87. `js/coach/psicologia.js` — Psicologia: chi ha davanti il coach

`PSICO_DOMANDE` · `psicoCoach()` · `ritrattoCoach()` · `window.onbPsico()` · `window.setPsico()` · `htmlDomandePsico()` · `renderPsicoStep()` · `window.onbMomento()` · `htmlPrimiPassi()` · `sedutaPianoB()` · `TEMI` · `renderSettings()` · `setPagina` · `SET_PAGINE` · `window.openSetPage()` · `window.closeSetPage()` · `renderSetPage()` · `window.switchProtocol()`

## js/ui

### 88. `js/ui/schede-esercizio.js` — Schede esercizio: disegno e spiegazione

`arto()` · `tronco()` · `testa()` · `bilanciere()` · `manubrio()` · `freccia()` · `suolo()` · `wrapSvg()` · `inPiedi()` · `accosciato()` · `piegato()` · `sdraiato()` · `PATTERN_DRAW` · `PATTERN_INFO` · `PATTERN_RULES` · `window.patternFor()` · `VIDEO_VERIFICATI` · `VIDEO_PLAYLIST` · `window.videoLinkFor()`

## js/dati

### 89. `js/dati/disegni-esercizi.js` — Disegni degli esercizi

`window.slugEsercizio()` · `IMMAGINI_ESERCIZI` · `window.immagineEsercizio()` · `slotImmagine()`

## js/ui

### 90. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni

`exInfoNome` · `exInfoTab` · `seduteEsercizio()` · `window.setExInfoTab()` · `exVuoto()` · `paneStorico()` · `paneGrafico()` · `paneRecord()`

## js/dati

### 91. `js/dati/schede-tecniche.js` — Schede tecniche per esercizio

`TECNICA` · `RESPIRO` · `GLOSSARIO` · `schedaTecnica()` · `pausaConsigliata()` · `preferenzaEsercizio()` · `window.preferisci()` · `window.openExerciseInfo()` · `window.closeExerciseInfo()`

### 92. `js/dati/scheda-unica.js` — Scheda unica per esercizio: tutto quello che l'app sa di un esercizio, in un oggetto solo

`window.schedaUnica()` · `window.bucchiNelleSchede()`

## js/ui

### 93. `js/ui/calendario/mese.js` — Calendario del mese

`calKey` · `loadCal` · `saveCal` · `mcAnno` · `mcMese` · `ymd()` · `daYmd()` · `lunediDi()` · `giorniTra()` · `piuGiorni()` · `giornoSettimana()` · `voceDaPiano()` · `mettiSettimana()` · `copiaSettimana()` · `settimaneDelMese()`

### 94. `js/ui/calendario/gruppi.js` — Gruppi muscolari nel calendario

`GRUPPO_COLORE` · `GRUPPI_ORDINE` · `_mcStorico` · `gruppiDelGiorno()` · `puntiniGruppi()` · `renderLegendaGruppi()` · `renderMonthCal()` · `window.mcMove()`

### 95. `js/ui/calendario/scambio.js` — Scambiare i giorni trascinandoli

`swapAppenaTrascinato` · `attachSwapDrag()` · `window.mcSwapDays()` · `window.mcCellClick()` · `scambiaNelCalendario()` · `aggiornaDopoScambio()` · `window.planSwapDays()` · `window.planDayClick()`

### 96. `js/ui/calendario/copia-settimana.js` — Copiare una settimana come blocco

`mcCopySrc` · `mcCopyTargets` · `etichettaSettimana()` · `settimanaPiena()` · `window.mcSelectWeek()` · `window.mcToggleTarget()` · `window.mcRepeat()` · `window.mcCancelCopy()` · `window.mcPaste()` · `renderCopyBar()` · `attachWeekDrag()` · `window.mcCopyWeeks()` · `window.mcPlaceTemplate()` · `window.mcFillMonth()`

### 97. `js/ui/menu-settimana.js` — Menu della settimana

`wmLunedi` · `window.openWeekMenu()` · `window.closeWeekMenu()` · `renderWeekMenu()` · `window.wmCancellaGiorno()` · `window.wmSvuotaSettimana()` · `window.wmCopiaProssima()` · `window.wmSelezionaPerCopiare()` · `window.mcClearMonth()` · `window.mcOpenDay()` · `window.mcCloseDay()` · `window.mcPlanDay()` · `window.mcRemoveDay()` · `window.segnaFattoNelCalendario()`

### 98. `js/ui/sessione-completata.js` — Sessione gia completata

`mostraSessione()` · `window.openDoneView()`

## js/coach

### 99. `js/coach/coach-ia.js` — Coach IA

`COACH_IA_URL` · `IA_CONSENT_KEY` · `IA_DEVICE_KEY` · `TESTI_IA` · `window.coachIAAttivo()` · `window.setCoachIA()` · `htmlPrivacyIA()` · `deviceIA()` · `serieCompatte()` · `nomePulito()` · `contestoSeduta()` · `chiamaCoachIA()` · `iaInCorso` · `window.iaErrore()` · `window.commentaSeduta()` · `aggiornaBoxIA()` · `window.htmlCommentoIA()` · `window.openHistoryDetail()` · `window.closeDoneView()`

## js/ui

### 100. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)

`icsEscape()` · `icsFold()` · `icsData()` · `window.buildIcs()` · `window.exportIcs()` · `linkGoogle()` · `aggiornaAiutoIcs()`

## js

### 101. `js/avvio.js` — Avvio: ultimo file caricato

_solo istruzioni, nessun nome pubblico_
