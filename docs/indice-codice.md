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

## js/dati

### 9. `js/dati/schede-pronte.js` — Libreria delle schede pronte

`WORKOUT_TEMPLATES`

### 10. `js/dati/libreria-esercizi.js` — Libreria esercizi con metadati

`MUSCLE_GROUPS` · `EXERCISE_LIBRARY` · `buildExerciseSelect()` · `findExercise()`

### 11. `js/dati/schede-epoca-oro.js` — Schede dell'epoca d'oro del culturismo

_solo istruzioni, nessun nome pubblico_

### 12. `js/dati/dettagli-esercizi.js` — Dettagli per esercizio: attrezzo, presa o attacco, sottogruppo e focus muscolare

`SEZIONI_ESERCIZI` · `SOTTOGRUPPI` · `MUSCOLI` · `MULTIARTICOLARI_TOTALI` · `NOTE_ATTACCO` · `DETTAGLI` · `_nomePulito()` · `window.dettaglioEsercizio()` · `window.bersaglioDi()` · `window.muscoloBersaglio()` · `window.famigliaTotaleDi()` · `window.lavoroDaSostituire()` · `window.sezioneEsercizio()` · `window.etichettaAttrezzo()` · `window.focusEsercizio()` · `window.focusConTipo()` · `window.ordineEsercizi()` · `window.organizzaEsercizi()` · `window.variantiEsercizio()`

### 13. `js/dati/attributi-esercizi.js` — Attributi degli esercizi: classe, schema, crediti per muscolo, stress per zona, attrezzo (SEL-01, SEL-03, SEL-06, MOD-01, MOD-04)

`UNITA_VOLUME` · `UNITA_DI_MUSCOLO` · `ZONE_STRESS` · `ZONE_ALIAS` · `CLASSI_TECNICA` · `SCHEMI_ESERCIZIO` · `PROFILI_RESISTENZA` · `ATTREZZI_ESERCIZIO` · `SERVE_AMMESSI` · `MOTIVI_ZERO` · `SERIE_MIN_PER_SEDUTA` · `ATTRIBUTI` · `_attributiCache` · `_attributiEspansi()` · `window.attributi()` · `window.creditoMuscoli()` · `window.unitaDiMuscolo()` · `window.contaVolume()` · `window.classeTecnica()` · `window.livelloAbilita()` · `window.stressArticolare()` · `window.serveAttrezzo()`

## js/coach

### 14. `js/coach/parametri.js` — Parametri del coach: tutte le soglie e i fattori in un posto solo

`COACH_PARAMETRI` · `REGOLE_SPEGNIBILI` · `REGOLE_SPENTE_KEY` · `window.regolaAttiva()`

### 15. `js/coach/regia/fasi.js` — Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3)

`FASI_PUNTI` · `registraFase()` · `fasiRegistrate()` · `eseguiFasi()`

### 16. `js/coach/catalogo-regole.js` — Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da

`COACH_SQUADRA` · `COACH_REGOLE` · `COACH_REGOLE_PER_CODICE` · `window.regolaDescritta()`

### 17. `js/coach/regia/soglie-regia.js` — Soglie della regia del coach (REG-01, REG-04)

`SOGLIE_REGIA`

### 18. `js/coach/regia/perche.js` — Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03)

`SEPARATORE_PERCHE` · `SEPARATORE_ETICHETTA_PERCHE` · `ORDINE_FASE_PERCHE` · `ETICHETTE_FORZA` · `codiceInSquadra()` · `sottoCoachDi()` · `nomeSottoCoach()` · `etichettaForza()` · `aggiungiPerche()` · `testoPerche()` · `fasePerche()`

### 19. `js/coach/suggeritore.js` — Motore del coach: suggerimento del prossimo esercizio

`suggestNextExercises()`

## js/core

### 20. `js/core/stato-condiviso.js` — Stato condiviso di timer, cedimento e musica

`recoveryInterval` · `recoveryRemaining` · `recoveryTotal` · `recoveryMuted` · `RECOVERY_RING_CIRCUMFERENCE` · `dropInterval` · `dropRemaining` · `dropActive` · `armedSet` · `dropAudioAttivo` · `activeSourceTab` · `currentWebMode` · `AUDIO_DB_NAME` · `AUDIO_DB_VERSION` · `AUDIO_STORE` · `failureTracks` · `selectedTrackId` · `selectedTrackUrl` · `ytPlayer` · `ytPlayerReady` · `spotifyController` · `spotifyReady` · `webDuration`

### 21. `js/core/storage.js` — Storage per modalita e normalizzazione dei dati

`dataKey` · `historyKey` · `titlesKey` · `leggiJSON()` · `loadTitles` · `saveTitles` · `getDayTitle()` · `normalizeExerciseRecord()` · `loadData()` · `saveData` · `normalizeHistoryEntry()` · `loadHistory()` · `saveHistory` · `migrateLegacyDataIfNeeded()` · `CHIAVI_COACH_IA_RIMOSSO` · `ripulisciChiaviCoachIA()` · `seedDefaultsIfNeeded()`

## js/ui

### 22. `js/ui/piano/schede-pronte.js` — Selettore schede pronte e titolo della giornata

`window.openTemplatePicker()` · `window.closeTemplatePicker()` · `window.applyTemplate()` · `window.renameDayTitle()`

## js/core

### 23. `js/core/modalita.js` — Modalita (id interno dei dati)

`getStoredMode()` · `window.chooseMode()` · `activateMode()`

### 24. `js/core/navigazione.js` — Navigazione: giorni e tab

`daysContainer` · `renderDayBar()` · `window.selectDay()`

## js/ui

### 25. `js/ui/oggi.js` — Schermata Oggi

`CATEGORIE` · `categoriaDi()` · `window.obiettiviSettimana()` · `window.settimaneDiFila()` · `window.renderOggi()` · `window.iniziaOggi()` · `window.switchTab()`

## js/core

### 26. `js/core/utility.js` — Utility

`escapeHtml()` · `nomeSicuro()` · `pulisciDeep()` · `jsArg()` · `formatMMSS()` · `formatNow()` · `handleSelectExercise()` · `audioCtx` · `getAudioCtx()` · `sospendiAudioCtx()`

### 27. `js/core/audio-silenzioso.js` — Suono con il telefono in silenzioso

`SILENZIO_WAV` · `mediaKeeper`

### 28. `js/core/musica-altre-app.js` — Convivenza con la musica delle altre app

`tipoSessione()` · `avviaCanaleMultimediale()` · `fermaCanaleMultimediale()` · `window.lampeggia()` · `window.preparaAudio()` · `sospendiAudioT` · `sospendiAudioDopo()` · `playTone()` · `playBeep()` · `window.testSound()` · `playTick()` · `playEnd()` · `window.stepValue()`

## js/ui

### 29. `js/ui/piano/giorno.js` — Tab Piano: scelta del giorno e sua schermata

`syncBuildingLine()` · `window.backToPlanDays()` · `window.openPlanDayScreen()` · `planEditMode` · `applicaModalitaGiorno()` · `window.enterPlanEdit()` · `window.exitPlanEdit()` · `renderDayView()` · `aggiornaIngressoAgente()` · `planMapGruppo` · `renderPlanMap()` · `window.planMapSelect()` · `window.toccaTesta()` · `renderPlanMapList()` · `window.aggiungiPerGruppo()` · `renderPlanDayPicker()` · `window.openAddEx()` · `window.closeAddEx()` · `window.openReco()` · `window.closeReco()`

### 30. `js/ui/piano/aggiungi-allenamento.js` — Aggiungi allenamento alla settimana

`awStep` · `awSource` · `awDays` · `awMode` · `awEsercizi()` · `awNome()` · `awPath` · `awGroups` · `awCustom` · `window.openAddWeek()` · `window.closeAddWeek()` · `window.awBack()` · `window.awChoosePath()` · `window.awToggleGroup()` · `window.awToggleCustom()` · `window.awPickSource()` · `window.awToggleDay()` · `window.awQuick()` · `window.awSetMode()` · `window.awNext()` · `renderAddWeek()` · `applicaAllaSettimana()` · `window.openWeekSheet()` · `window.closeWeekSheet()` · `renderWeekOverview()` · `window.openPlanDay()` · `renderPiano()`

### 31. `js/ui/piano/selezione-multipla.js` — Selezione multipla e azioni di massa

`selectMode` · `selectedIdx` · `window.toggleSelectMode()` · `window.togglePick()` · `window.selectAllPlan()` · `syncBulkBar()` · `window.deleteSelected()` · `window.clearDay()` · `window.copyDayTo()` · `window.toggleReorderMode()` · `window.moveExercise()` · `window.duplicateExercise()` · `window.toggleSuperset()` · `window.startWorkoutFromPlan()` · `editingExerciseIdx` · `planDayOpen` · `window.toggleManualForm()` · `window.startEditExercise()` · `window.cancelEditExercise()` · `window.deletePianoExercise()`

### 32. `js/ui/allenamento/seduta.js` — Tab Allenamento e seduta piu ricca

`RPE_VALORI` · `ultimaVoltaTesto()` · `migliorUnoRM()` · `controllaRecord()` · `window.updateSetRpe()` · `window.addWarmup()` · `window.removeWarmup()` · `window.updateWarmup()` · `window.toggleWarmup()` · `DISCHI` · `COLORE_DISCO` · `window.dischiPerLato()` · `dischiBil` · `window.openPlates()` · `window.closePlates()` · `window.setBilanciere()` · `window.renderPlates()` · `sedutaTimer` · `avviaTempoSeduta()` · `fermaTempoSeduta()` · `renderAllenamento()` · `window.addSetTo()` · `window.removeSetFrom()` · `window.toggleSkipExercise()`

### 33. `js/ui/allenamento/macchinario-occupato.js` — Macchinario occupato: sostituzione per oggi

`ETICHETTA_ATTREZZO` · `ICONA_SCAMBIO` · `ICONA_FRECCIA_GIU` · `occupatoAperto` · `occupatoOpzioni` · `occupatoAscolto` · `impostaOccupato()` · `triggerOccupato()` · `chiudiOccupato()` · `fuoriOccupato()` · `tastoOccupato()` · `prefsOccupato()` · `alternativeOggi()` · `copiaRecord()` · `htmlSostituito()` · `htmlOccupato()` · `window.tastoApriOccupato()` · `window.toggleOccupato()` · `posizionaOccupato()` · `dopoSceltaOccupato()` · `window.sostituisciOggi()` · `window.ripristinaOriginale()` · `ripristinaSostituzioni()` · `pulisciSostituzioniVecchie()` · `window.updateSetField()` · `window.toggleSetDone()` · `window.annullaCedimento()`

### 34. `js/ui/allenamento/sessione.js` — Allenamento: prima il giorno, poi la sessione

`window.backToDayPicker()` · `fattoQuestaSettimana()` · `renderWorkoutDayPicker()` · `window.openWorkoutDay()`

### 35. `js/ui/allenamento/timer-recupero.js` — Timer di recupero e orologio

`updateRecoveryRing()` · `recoveryEndAt` · `recoveryLastShown` · `secondiRimasti()` · `fineRecupero()` · `tickRecupero()` · `avviaTickRecupero()`

## js/core

### 36. `js/core/nativo.js` — Ponte verso il telefono (Capacitor)

`NOTIFICA_RECUPERO` · `window.Nativo()`

## js/ui

### 37. `js/ui/allenamento/timer-pannello.js` — Pannello del timer di recupero

`recoveryEtichetta` · `avvisaTelefonoRecupero()` · `window.openRecoveryPanel()` · `window.closeRecoveryPanel()` · `window.adjustRecoveryTimer()` · `window.toggleRecoveryMute()` · `window.toggleRecoveryExpand()` · `window.startManualRecovery()`

### 38. `js/ui/allenamento/cedimento-canzone.js` — Cedimento: la canzone si sceglie una volta

`MUSIC_KEY` · `musicaRipristinata` · `leggiMusica()` · `window.salvaMusica()` · `nomeMusica()` · `aggiornaRiassuntoMusica()` · `window.ripristinaMusica()` · `window.clearCedimentoAudio()` · `window.openMusicSheet()` · `window.closeMusicSheet()` · `window.switchAudioSourceTab()` · `getResolvedAudioMode()` · `modoCanzone()`

### 39. `js/ui/musica/lettore-fisso.js` — Lettore musicale sempre raggiungibile

`IS_IOS` · `ytSbloccato` · `dockStatoAttuale` · `attesaAvvio` · `inizioSegmento()` · `dockApertoAMano` · `dockChiama` · `dockDaAprire()` · `window.dockStato()` · `window.posizionaDock()` · `window.toggleDock()` · `aggiornaAvvisoDock()` · `window.ytStatoCambiato()` · `controllaAvvioMusica()`

### 40. `js/ui/allenamento/cedimento.js` — Modulo cedimento (drop set)

`sessioneCanzoneAttiva()` · `dropEndAt` · `dropChiudiTimer` · `DROP_CHIUSURA_MS` · `caricaPlayerWebSalvato()` · `avviaWebPronto()` · `startDropAudio()` · `rilasciaAudioCedimento()` · `updateDropTimerDisplay()` · `updateFireModeState()` · `window.onDropVolumeInput()` · `window.apriCedimento()` · `tickCedimento()` · `finishDropSet()` · `chiudiCedimento()` · `window.stopDropSet()`

### 41. `js/ui/musica/mp3-locale.js` — Libreria MP3 locale (IndexedDB)

`openAudioDB()` · `dbAddTrack()` · `dbGetAllTracks()` · `dbDeleteTrack()` · `readAudioDuration()` · `window.handleAudioUpload()` · `refreshFailureTracks()` · `renderFailureTracks()` · `window.selectTrack()` · `updateMp3SegmentLabel()` · `window.onMp3RangeInput()` · `window.deleteTrack()`

### 42. `js/ui/musica/player-web.js` — Player web (YouTube e Spotify)

`parseWebAudioUrl()` · `setWebStatus()` · `configureWebSegment()` · `updateWebSegmentLabel()` · `window.onWebRangeInput()` · `window.nudgeWebSegment()` · `window.previewWebSegment()` · `window.handleWebLinkSubmit()` · `webToken` · `window.liberaPlayerWeb()` · `playerWebCaricato()` · `ensureYouTubeApi()` · `YT_ERRORS` · `loadYouTubePlayer()` · `readYouTubeDuration()` · `ensureSpotifyApi()` · `loadSpotifyPlayer()`

### 43. `js/ui/gesti.js` — Swipe, rotella dei numeri e trascinamento

`attachSwipe()` · `wheelTarget` · `window.openWheel()` · `window.pickWheel()` · `window.closeWheel()` · `attachRepsField()` · `attachNumberDrag()`

### 44. `js/ui/annulla.js` — Snackbar con Annulla

`snackTimer` · `lastUndo` · `window.showUndo()` · `window.hideSnackbar()`

### 45. `js/ui/riposo-settimane.js` — Giorni di riposo e settimane salvate

`restKey` · `loadRestDays` · `saveRestDays` · `window.isRestDay()` · `window.toggleRestDay()` · `syncRestToggle()` · `weeksKey` · `loadWeeks` · `saveWeeks` · `isoWeekLabel()` · `window.saveWeekSnapshot()` · `window.restoreWeek()` · `window.deleteWeek()` · `renderWeeks()`

### 46. `js/ui/gruppi-muscolari.js` — Schermata gruppi muscolari

`selectedGroups` · `window.toggleGroup()` · `sheetGroup` · `sheetOrder` · `suggestedOrder` · `suggestedOrderKey` · `window.toggleGroupInPlan()` · `pickRow()` · `window.togglePickExercise()` · `renderSuggested()` · `window.openGroupSheet()` · `window.closeGroupSheet()` · `renderSheetExercises()` · `window.removeExerciseByName()` · `window.clearGroupSelection()`

### 47. `js/ui/elenco-esercizi.js` — Elenco ordinato degli esercizi: sezioni, gruppi muscolari, sottogruppi

`sezEsAperte` · `window.azzeraSezioniEsercizi()` · `window.toggleSezioneEsercizi()` · `window.htmlEserciziOrganizzati()` · `window.htmlDettaglioRiga()`

### 48. `js/ui/figura-anatomica.js` — Figura anatomica

`MG_VISTA` · `_figCache` · `window.muscleFigure()` · `muscleFigureNuova()` · `window.muscleCard()` · `MC_PARTS` · `MC_VIEWBOX` · `renderBodyMap()` · `DEFAULT_SETS` · `DEFAULT_REPS` · `REPS_MIN` · `REPS_MAX` · `REPS_MIN_CORPO` · `REPS_MAX_CORPO` · `TIME_MIN` · `TIME_MAX` · `window.isTimeBased()` · `window.perLato()` · `window.corpoLibero()` · `window.repsCorporatura()` · `window.repsRange()` · `window.defaultRepsFor()` · `window.weekUsage()` · `window.usageState()` · `usageBadge()` · `usageRank()` · `VOL_MIN_UTILE` · `VOL_MAX_UTILE` · `window.weeklyVolumeByGroup()` · `volLevel()` · `volLabel()` · `renderGruppi()` · `window.addLibraryExercise()` · `window.applyTemplateFromGroups()`

## js/coach

### 49. `js/coach/pannello.js` — Pannello coach nel tab Piano

`renderCoach()`

## js/ui

### 50. `js/ui/allenamento/termina-e-cardio.js` — Termina allenamento e cardio

`ultimaChiusuraSeduta` · `obiettivoSeduta()` · `CARDIO_TIPI` · `cardioKey` · `cardioCorrente()` · `cardioAperto` · `nomeCardio()` · `window.renderCardio()` · `window.toggleCardio()` · `window.aggiungiCardio()` · `window.togliCardio()` · `minutiCardioSettimana()` · `window.renderCardioStat()` · `window.endWorkout()`

### 51. `js/ui/storico.js` — Tab Storico

`rigaSeduta()` · `htmlStoricoOrdinato()` · `renderStorico()` · `window.openAllSessions()` · `window.closeAllSessions()` · `renderProgressiTop()` · `window.clearHistory()`

### 52. `js/ui/onboarding.js` — Schermata iniziale: creazione del programma

`ONB_KEY` · `PROFILE_KEY` · `onbStep` · `onbData` · `ONB_GOALS` · `ONB_LEVELS` · `splitFor()` · `splitPerFrequenza()` · `scegliSplit()` · `SLOT_PRIORITA` · `ricettaPunti()` · `schemeFor()` · `PARAM_ETA` · `MSG_ETA_SOTTO_MINIMO` · `MSG_ETA_MANCANTE` · `etaPerProgramma()` · `window.startOnboarding()` · `nuovoOnbData()` · `window.onbSkipAll()` · `window.onbPrev()` · `ONB_ULTIMO` · `window.onbNext()` · `onbStepValid()` · `ONB_FREQ` · `window.onbSetTest()` · `window.onbPick()` · `window.onbSetEta()` · `window.onbToggleGoal()` · `window.onbTogglePriorita()` · `window.onbToggleFastidio()` · `ONB_LUOGHI` · `ONB_FASTIDI` · `ONB_PARQ` · `PARQ_DOMANDE` · `ONB_SONNO` · `ONB_ATTREZZI` · `chip()` · `renderOnb()` · `optHtml()` · `renderBiaStep()` · `onbManuale` · `window.onbToggleManuale()` · `biaField()` · `bindBiaInputs()` · `ensurePdfJs()`

## js/coach

### 53. `js/coach/bia/lettore.js` — Lettore BIA a struttura

`numIt()` · `window.parseInBody()` · `window.parseBiaText()` · `window.handleBiaPdf()` · `window.applyBiaValues()` · `window.analyzeBia()`

### 54. `js/coach/programma/motore.js` — Coach engine: costruzione del programma

`attrezzoDi()` · `RISCHIO` · `ECCEZIONI_RISCHIO` · `senzaMacchine()` · `ATTREZZI_NON_DI_CASA` · `ATTREZZI_NON_CON_I_MANUBRI` · `attrezzoFisicoDi()` · `attrezzoDiCasaMancante()` · `ATTREZZI_NON_DICHIARABILI_IN_PALESTRA` · `eccezioneRischio()` · `consentito()` · `sostituto()` · `alternativeStessoMuscolo()` · `schemaMisto()`

### 55. `js/coach/programma/schemi.js` — Schemi di movimento e regole di costruzione

`SCHEMI_MOV` · `SCHEMI_RISERVA` · `schemaDi()` · `ISOLAMENTI` · `isolamentoDi()` · `IN_ALLUNGAMENTO` · `IN_ALLUNGAMENTO_NUOVI` · `SCAMBI_ALLUNGAMENTO_NUOVI` · `inAllungamento()` · `scambiAllungamento()` · `SCAMBI_ALLUNGAMENTO` · `SCHIENA_PESANTE` · `schienaLombare()` · `GLUTEI_FAMIGLIE` · `VOLUME_LIVELLO` · `GRUPPI_PRINCIPALI` · `libNome()`

### 56. `js/coach/programma/ricette.js` — Variazione del coach: ricette a slot e composizione delle sedute (componiSedute)

`rngDa()` · `_n` · `SLOT_DEF` · `RICETTE` · `PRIORI` · `SCHEMI_ATTESI` · `SLOT_PER_SCHEMA` · `adattoAllaSeduta()` · `RIPETIZIONI_SETTIMANA_MAX` · `PARAM_NORDIC` · `RX_NORDIC` · `maxSettimana()` · `ripetizioniFlessione()` · `GRUPPI_DELLA_SEDUTA` · `componiSedute()`

### 57. `js/coach/programma/struttura-pro.js` — Struttura professionale della scheda (ABB-01..10)

`STR_PESI` · `strMeta()` · `strSub()` · `strSchiena()` · `strTier()` · `strRango()` · `window.strOrdina()` · `strChiave()` · `window.strRidondante()` · `window.strTerzoUguale()` · `window.strSquatDoppio()` · `strSerie()` · `STR_FATICA` · `STR_TIRATE_ALTE` · `strEspinta()` · `strEtirata()` · `window.strCopri()` · `window.strBilancia()` · `strCoreNuovo()` · `STR_NOTA_TIRATE` · `window.strFinale()` · `strAntagonisti()` · `strPuoSuperserie()` · `window.strSuperserie()`

### 58. `js/coach/programma/mesociclo.js` — Mesociclo: durata, blocchi, scarichi e RIR per settimana (PRN-03, ETA-02)

`strutturaProgramma()` · `fasiProgramma()` · `pianoMesociclo()`

### 59. `js/coach/programma/completamenti.js` — Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29)

`NOTA_REMATORE_INVERSO` · `NOTA_FEMORALI_SENZA_LEG_CURL` · `eCernieraFemorali()` · `completaSettimana()` · `rinforzaFemorali()` · `ordinaSedute()`

### 60. `js/coach/volume/serie-ripetizioni.js` — Serie, ripetizioni e pause di ogni esercizio (PRG-14, PRG-20, ETA-02, B2, B34)

`adattoAlCincoPerCinque()` · `prescriviSeduta()` · `prescriviSerie()`

### 61. `js/coach/volume/volume.js` — Volume per muscolo: conteggio delle serie, volume della settimana e tetti (VOL-01, VOL-02, SES-01, REC-01, ESI-01)

`GRUPPI_FRAZIONARI` · `FRAZIONARI_NON_CONTATI` · `gruppoFrazionario()` · `creditoSerie()` · `frazionarieSettimana()` · `GRUPPI_RECUPERO` · `frazGruppoSeduta()` · `giornoSeduta()` · `recuperoOk()` · `limitaVolumePerMuscolo()` · `assegnaVolume()` · `noteVolume()` · `limitaVolume()` · `pavimentoVolume()` · `aggiungiSerieUtile()` · `validaVolume()`

### 62. `js/coach/volume/tempo.js` — Tempo della seduta: quanti esercizi, quanti minuti, adattamento ai minuti dichiarati (PRG-03, DUR, EXN-02, REC-01, SES-01)

`PARAM_NUMERO_ESERCIZI` · `serieEffettive()` · `pausaMediaPerTipo()` · `stimaEsercizi()` · `PARAM_TEMPO` · `tipoObiettivoDi()` · `durataSeduta()` · `riempiTempo()` · `exerciseCountFor()` · `stimaMinutiSeduta()` · `numeroEsercizi()` · `adattaAlTempo()` · `rifinisciAlTempo()`

### 63. `js/coach/volume/tecniche.js` — Tecniche di intensita: drop set, superserie, AMRAP, back-off, potenza e cluster (MAV-02, MAV-03, ETA-02, ABB-06)

`TECNICHE_AL_CEDIMENTO` · `senzaCedimento()` · `ZONA_DEL_FASTIDIO` · `senzaCedimentoPer()` · `assegnaTecniche()`

### 64. `js/coach/sicurezza/vincoli.js` — Vincoli di sicurezza del programma (SENTINELLA, MAV-02, MAV-03, B1)

`vincoliSicurezza()` · `tecnicheAlCedimentoAmmesse()`

### 65. `js/coach/regia/brief.js` — Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6)

`OBIETTIVI_NOTI` · `obiettiviDichiarati()` · `obiettiviEffettivi()` · `faseDaObiettivi()` · `faseCorpo()` · `LIVELLI_NOTI` · `livelloConosciuto()` · `chiDa()` · `briefCoach()` · `risolviMetodo()` · `prefsDelBrief()` · `briefOggi()`

### 66. `js/coach/regia/genera.js` — Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6)

`SPECIALITA_STRUTTURA` · `registraSpecialita()` · `specialitaStruttura()` · `GIORNI_PER_SEDUTE` · `giorniSettimana()` · `applicaMetodo()` · `regolaDelPicco()` · `noteDelProgramma()` · `applicaScelteUtente()` · `chiudiProgramma()` · `verificaProgramma()` · `window.buildProgram()`

## js/ui

### 67. `js/ui/onboarding-risultato.js` — Risultato del programma generato

`renderOnbResult()`

## js/coach

### 68. `js/coach/programma/archivio.js` — Programma e BIA salvati

`progKey` · `biaKey` · `window.getProgramma()` · `window.getBiaStorico()` · `window.aggiungiBia()`

### 69. `js/coach/programma/alternative.js` — Alternative e applicazione del programma

`window.altraVariante()` · `alternativeDi()` · `altScelte` · `window.apriAlternative()` · `window.chiudiAlternative()` · `window.sceltaAlternativa()` · `window.applicaAlternative()` · `window.rimescolaAlternative()` · `renderAlternative()` · `window.applyGeneratedProgram()`

## js/ui

### 70. `js/ui/statistiche.js` — Statistiche: progresso dei carichi nel tempo

`APP_VERSIONE` · `DISCHI_KEY` · `NOME_KEY` · `window.cercaAggiornamento()` · `window.getNome()` · `window.salvaNome()` · `statsPeriodo` · `dataSessione()` · `pesoSessione()` · `window.inizioPeriodo()` · `window.calcolaStatistiche()` · `window.tutteLeSedute()` · `volumeSeduta()` · `window.blocchiQuattroSettimane()` · `window.calcolaBlocco()` · `window.setStatsPeriodo()` · `window.openStats()` · `window.closeStats()` · `reportBloccoHtml()` · `periodoTitolo()` · `window.renderStats()`

### 71. `js/ui/statistiche-grafico.js` — Statistiche: poligono di frequenza degli allenamenti

`statsGrafPeriodo` · `STG` · `window.frequenzaSettimanale()` · `poligonoFrequenzaSvg()` · `graficoFrequenzaHtml()` · `scelteStatsPeriodo()` · `mostraPeriodoAttivo()` · `window.setStatsGrafPeriodo()` · `window.renderStatsPagina()`

## js/coach

### 72. `js/coach/carichi/progressivo.js` — Carico progressivo

`arrotonda()` · `incrementoPer()` · `faseSedutaSalvata()` · `esercizioInScarico()` · `sedutePerEsercizio()` · `ultimeSessioni()` · `GIORNI_CARICO_RIFERIMENTO` · `caricoRiferimento()` · `pesoUltimoDi()` · `esito()` · `window.settimanaProgramma()` · `frenoBia()`

### 73. `js/coach/carichi/e1rm.js` — Massimale stimato e carico dal massimale (ALG-04, W1-T3)

`e1rm()` · `caricoPer()` · `e1rmSerie()` · `e1rmSeduta()`

### 74. `js/coach/carichi/soglie-partenza.js` — Soglie del carico di partenza e della calibrazione rapida (PAR-06..09, CAR-18..19)

`SOGLIE_PARTENZA`

### 75. `js/coach/carichi/partenza.js` — Carico di partenza dai dati del corpo

`PARAM_PARTENZA` · `FRASE_PRIMA_ESPOSIZIONE` · `FRASE_PARTENZA_BASSA` · `FRASI_FONTE_STIMA` · `MOTIVI_STIMA` · `NOTE_PROGRAMMA_STIMA` · `NOTA_PARTENZA_BASSA` · `NOTA_BARRA_VUOTA` · `NOTA_SENZA_BARRA` · `notaCorpoLiberoFacile` · `sogliaPartenza()` · `fonteBase()` · `contestoCarichi()` · `classePartenza()` · `fattorePartenza()` · `scalaDaCorpo()` · `scalaDaStorico()` · `esercizioAffidabilePerLoStorico()` · `kStoricoPer()` · `arrotondaPartenza()` · `passoCarico()` · `window.stimaCaricoIniziale()` · `pesoPartenza()` · `_PARTENZA_PER_BRIEF` · `penalitaPartenza()` · `varianteSenzaBilanciere()` · `FACILITATE_PAR09` · `versioneFacilitata()` · `applicaPartenze()`

### 76. `js/coach/carichi/calibrazione.js` — Calibrazione rapida dei carichi stimati (CAR-18, CAR-19)

`FRASE_CARICO_TARATO` · `FRASE_SALTO_TROPPO_GRANDE_PRIMA` · `FRASE_SALTO_TROPPO_GRANDE_DOPO` · `FRASE_PROMEMORIA_RPE` · `virgola` · `recordPianoDi()` · `personaCalibrazione()` · `esposizioniCalibrazione()` · `rpeCalibrazione()` · `rigaSalto()` · `percentualeSalto()` · `pesoDopoSalto()` · `decisioneCalibrazione()` · `storiaCalibrazione()` · `calibrazioneChiusa()` · `calibrazioneNellaSeduta()` · `faseCalibrazione()`

### 77. `js/coach/carichi/taratura.js` — Taratura del RIR (CAR-14, W1-T3)

`segnaEsercizioTaratura()` · `apprendiTaraturaRir()`

### 78. `js/coach/sicurezza/scarico.js` — Scarico: dose, fatica e scarico deciso dal coach (CAR-03, CAR-10, MES-08, W1-T3)

`SOGLIA_SRPE_ALTA` · `livelloFatica()` · `DOSE_SCARICO` · `scaricoReattivo()`

### 79. `js/coach/questionario-decisioni.js` — Questionario di fine allenamento e decisioni

`AGG_KEY` · `window.aggiustiCoach()` · `salvaAggiusti()` · `ZONE_DOLORE` · `ZONA_ART` · `zonaA()` · `zonaIl()` · `STRESS_ZONA` · `senzaEmoji` · `nomeInLibreria()` · `REGIONE_RISCHIO_DOLORE` · `varianteStessoMuscolo()` · `eserciziDeiGiorniCon()` · `PARAM_FATICA_SEDUTA` · `NOTA_AMPIEZZA_SENZA_DOLORE` · `sedutaPesante()` · `fbState` · `window.apriQuestionario()` · `window.fbSet()` · `window.fbZona()` · `window.fbEsercizio()` · `window.fbLivello()` · `etichettaDolore()` · `fbScelta()` · `renderQuestionario()` · `window.chiudiQuestionario()` · `window.decisioniCoach()` · `applicaDecisioni()` · `window.riduciFrequenza()` · `window.inviaQuestionario()`

### 80. `js/coach/prontezza.js` — Prontezza prima della seduta

`PRONTEZZA_KEY` · `PRONTEZZA_VOCI` · `VOCE_CICLO` · `vociProntezza()` · `prontezzaStato` · `leggiProntezza()` · `prontezzaOggi()` · `punteggioProntezza()` · `renderProntezza()` · `window.sceltaProntezza()` · `window.saltaProntezza()` · `window.applicaProntezza()` · `prontezzaDiOggi()`

### 81. `js/coach/mi-sento-male.js` — Mi sento male in seduta

`window.apriMiSentoMale()` · `window.chiudiMiSentoMale()` · `window.chiudiSedutaInterrotta()` · `minutiSeduta()`

### 82. `js/coach/repertorio.js` — Coach 2: repertorio completo

`STANDARD_FORZA` · `ALZATE_BASE` · `pesoCorporeo()` · `STD_SOGLIA_INTERMEDIO` · `STD_SOGLIA_AVANZATO` · `STD_MINIMO_ALZATE` · `COACH_GIORNI_REVISIONE_LIVELLO` · `livelloStandardForza()` · `proposteLivello()` · `window.livelloStimato()` · `prefsCoach()` · `sostituisciNelPiano()` · `cambiaSerieNelPiano()` · `conAnnulla()` · `window.azioneCoach()` · `bloccoCorrente()` · `eserciziFermi()` · `strainSettimane()` · `scaricoRecente()` · `controlloSchemi()` · `azioniCoach()` · `corpoCoach()` · `sedutaSaltata()` · `prossimoGiornoLibero()` · `htmlSedutaSaltata()` · `window.sceltaSaltata()` · `aderenzaDueSettimane()` · `htmlAderenza()` · `window.rispostaAderenza()` · `htmlOrario()` · `verdettoCiclo()` · `htmlFineCiclo()` · `window.nuovoCiclo()`

### 83. `js/coach/dolore-mattina.js` — Controllo del dolore la mattina dopo

`controlloDoloreDaFare()` · `htmlControlloDolore()` · `window.rispostaDolore()` · `consumaAggiusti()` · `RIR_MIN_DOLORE` · `aggiustiAlCarico()`

### 84. `js/coach/regole-ricerca.js` — Coach 2: regole nuove dalla ricerca

`TECNICHE` · `profiloCoach()` · `BIL_PESANTI` · `tipoCarico()` · `RIR_TIPO` · `MES_RIR` · `primaSettimanaBlocco()` · `inDeficitCalorico()` · `pisoRirEsigenza()` · `pavimentoRirMinorenni()` · `rirBersaglio()` · `rirBersaglioBase()` · `rirBersaglioPerLivello()` · `storicoProntezza()` · `rpeBersaglio()` · `testoRir()` · `PARAM_ANALISI` · `faseDelGiorno()` · `settimanaDellaSeduta()` · `inScarico()` · `sessioniConData()` · `ripresaDopoScarico()` · `rientroDopoPausa()` · `fmtKg` · `obiettivoForza()` · `caricoProssimoBase()` · `window.caricoProssimo()` · `window.applicaCaricoProgressivo()` · `carichiDelGiorno()` · `imparaDallaSeduta()` · `contaStalli()`

### 85. `js/coach/regole-nuove.js` — Regole del coach aggiunte dalla ricerca (RIC-01..05)

`TECNICHE_INTENSE` · `sedutePassate()` · `giorniDallUltimaSeduta()` · `prontezzaRecente()` · `rientroPiano()` · `settimanaCentraleBlocco()` · `gruppoInPriorita()` · `mancavaSoloUltimaSerie()` · `regoleRicAlCarico()` · `limitaTecnicheIntense()`

### 86. `js/coach/intensita.js` — Intensità decisa dal corpo e dalle prime sedute (INT-01..05)

`PARAM_INTENSITA` · `FA_MEDIA` · `faRiferimento()` · `_virg` · `window.statoBia()` · `window.esigenzaIniziale()` · `window.rirExtraIntensita()` · `primaVoltaUnaSerieInMeno()` · `sedutePrimeDelProgramma()` · `window.bilancioPrimeSedute()`

### 87. `js/coach/agente-consigli.js` — Agente coach e consigli del coach 2

`deltaTesto()` · `consigliCoach2()` · `consigliAgente()` · `window.openAgent()` · `window.closeAgent()` · `window.renderAgent()`

### 88. `js/coach/bia/opzioni.js` — BIA nelle opzioni

`biaLetta` · `window.openBiaSheet()` · `window.closeBiaSheet()` · `rigaBia()` · `renderBiaSheet()` · `window.toggleBiaManuale()` · `window.salvaBiaLetta()` · `window.eliminaBia()` · `window.agentBiaPdf()` · `window.compilaBiaAgente()` · `window.salvaBiaAgente()` · `window.restartOnboarding()` · `window.getProfile()`

## js/core

### 89. `js/core/consenso.js` — Consenso ai dati

`CONSENT_KEY` · `CONSENT_VERSION` · `window.consenso()` · `window.coachAttivo()` · `window.chiediConsensoSeServe()`

## js/ui

### 90. `js/ui/guida-interattiva.js` — Guida interattiva

`GUIDA_KEY` · `guidaPasso` · `guidaTimer` · `guidaFoto` · `guidaUltimoCambio` · `GUIDA` · `guidaEl()` · `guidaDatiDemo()` · `guidaPreparaProva()` · `guidaRipristina()` · `window.avviaGuida()` · `window.offriGuida()` · `guidaPosiziona()` · `guidaRidotto()` · `guidaVisibile()` · `guidaServeScroll()` · `guidaScorriVerso()` · `guidaMostra()` · `window.guidaAvanti()` · `window.chiudiGuida()` · `guidaSeguiT` · `guidaSegui()` · `window.guidaAttiva()` · `guidaConsente()` · `guidaCenno()` · `window.setConsenso()` · `window.revocaConsenso()` · `INFORMATIVA` · `renderInformativa()` · `window.openConsentText()` · `window.closeConsentText()`

### 91. `js/ui/opzioni/impostazioni.js` — Impostazioni

`THEME_KEY` · `SOUND_KEY` · `COUNTDOWN_KEY` · `AUTOCLOSE_KEY` · `BYPASS_KEY` · `FLASH_KEY` · `window.getSetting()` · `window.setSetting()` · `window.isOn()` · `window.applyTheme()` · `window.setTheme()` · `ZOOM_KEY` · `window.applicaZoom()` · `window.openSettings()` · `window.closeSettings()` · `window.toggleSetting()` · `segHtml()` · `toggleHtml()`

### 92. `js/ui/opzioni/stile-iphone.js` — Opzioni in stile Impostazioni di iPhone

`SET_ICO` · `setIco()` · `setRow()` · `setRowSwitch()` · `setGroup()`

### 93. `js/ui/opzioni/il-coach.js` — Opzioni: il coach

`FASI_CORPO` · `ATTREZZI_PALESTRA` · `chipCoach()` · `paginaCoach()` · `toggleCoach()` · `window.setCoach()` · `window.setFreqCoach()` · `window.toggleCoachLista()` · `window.togliPreferenza()`

### 94. `js/ui/fogli.js` — Fogli e scambio di file

`foglioDati` · `apriFoglio()` · `window.chiudiFoglio()` · `scegliFile()` · `scaricaFile()` · `dataOra()`

## js/core

### 95. `js/core/schermo-acceso.js` — Schermo acceso durante la seduta

`WAKE_KEY` · `wakeLock` · `wakeVoluto` · `window.tieniSchermoAcceso()` · `sedutaAperta()`

### 96. `js/core/backup.js` — Backup e ripristino

`CHIAVI_APP` · `CHIAVI_TEMPORANEE` · `CHIAVI_NON_RIPRISTINABILI` · `valorePulito()` · `chiaviApp()` · `fotografia()` · `window.esportaBackup()` · `contaAllenamenti()` · `window.ripristinaBackup()` · `applicaFotografia()` · `ricaricaApp()` · `window.confermaRipristino()`

## js/ui

### 97. `js/ui/importa-csv.js` — Importazione CSV di altre app

`leggiCSV()` · `MESI_EN` · `dataDaCSV()` · `numeroCSV()` · `secondiCSV()` · `ALIAS_ESTERI` · `nomeDaEstero()` · `leggiExport()` · `sedutaImportata()` · `window.importaCSV()`

### 98. `js/ui/importa-progressi.js` — Importa i tuoi progressi

`personalizzatiKey` · `eserciziPersonalizzati()` · `normNome()` · `indiceNomiCache` · `indiceNomi()` · `riconosciEsercizio()` · `MESI_NOMI` · `dataInRiga()` · `serieInRiga()` · `leggiTestoLibero()` · `testoDaPdfRighe()` · `leggiFileProgressi()` · `analizzaProgressi()` · `window.importaProgressi()` · `mostraAnteprimaImport()` · `window.confermaImportProgressi()` · `window.confermaImport()`

### 99. `js/ui/seduta-libera.js` — Seduta libera e sedute extra

`SPEC_KEY` · `specialeAttiva()` · `window.sedutaPassataAttiva()` · `ripristinaSpeciale()` · `window.annullaSpeciale()` · `liberaSel` · `liberaTipo` · `liberaFiltro` · `liberaCerca` · `liberaQuando` · `window.apriSedutaLibera()` · `ultimoUso()` · `FILTRI_ATTREZZI` · `renderSedutaLibera()` · `htmlListaLibera()` · `window.renderListaLibera()` · `window.liberaToggle()` · `eserciziDaNomi()` · `window.liberaDaScelta()` · `window.liberaDaStorico()` · `window.liberaDaGiorno()` · `avviaSpeciale()` · `renderSpecialeBox()` · `renderSeduteExtra()` · `arrotondaCarico()` · `window.aggiungiExtra()` · `window.aggiornaExtra()` · `window.togliExtra()` · `window.spuntaExtra()` · `htmlExtra()`

### 100. `js/ui/lavoro-cronometro.js` — Cronometro di lavoro e info esercizio

`infoEsercizio()` · `lavoro` · `window.fermaLavoro()` · `window.avviaLavoro()` · `tickLavoro()` · `htmlLavoro()`

### 101. `js/ui/progressi/riepilogo.js` — Prossima seduta, fatica muscolare e anno

`prossimaSerie()` · `aggiornaProssima()` · `htmlProssimaSeduta()` · `faticaMuscoli()` · `renderFatica()` · `renderAnno()` · `annoRiassunto()`

### 102. `js/ui/progressi/pagine.js` — Progressi: pagine e pesate

`PG_PAGINE` · `PG_ICO` · `pgPagina` · `renderPgTiles()` · `window.apriPagProgressi()` · `window.chiudiPagProgressi()` · `pesateTutte` · `htmlPesate()`

### 103. `js/ui/progressi/foto.js` — Foto dei progressi

`FOTO_DB` · `FOTO_STORE` · `fotoDB()` · `fotoTutte()` · `fotoSalva()` · `fotoTogli()` · `fotoUltimaKey` · `fotoPromemoria()` · `fotoRiduci()` · `window.aggiungiFoto()` · `fotoUrl` · `fotoConfronto` · `window.renderFoto()` · `window.avviaConfronto()` · `window.toccaFoto()` · `mostraFoto()` · `window.chiudiFoto()` · `window.eliminaFoto()`

### 104. `js/ui/progressi/peso.js` — Peso corporeo

`pesoKey` · `pesoObKey` · `pesiTutti()` · `tendenzaPeso()` · `consiglioPeso()` · `graficoPeso()` · `renderPesoCard()` · `window.registraPeso()` · `window.salvaObiettivoPeso()`

### 105. `js/ui/stampa-scheda.js` — Condividi e stampa la scheda

`righeScheda()` · `testoScheda()` · `window.condividiScheda()` · `window.stampaScheda()`

## js/coach

### 106. `js/coach/metodi-momenti.js` — Metodi di allenamento e momenti

`ATTENZIONE_AMRAP` · `FB` · `UL4` · `METODI` · `metodoDa()` · `MOMENTI` · `momentoDa()` · `momentoAttivo()` · `applicaMomento()` · `momentoInAttesa` · `window.chiediMomento()` · `window.confermaMomento()` · `window.setMomento()` · `terminaMomento()` · `window.verificaMomento()` · `window.vaiAlMomento()` · `window.fineMomento()` · `prontezzaBassaSettimana()` · `htmlMomento()`

### 107. `js/coach/metodi-epoca-oro.js` — Metodi dell'epoca d'oro del culturismo

_solo istruzioni, nessun nome pubblico_

### 108. `js/coach/compone.js` — Il coach compone

`fattoreFisico()` · `metodoAmmesso()` · `sceltaMetodo()` · `TOCCHI` · `metodiPerTe()` · `htmlMetodi()` · `window.apriTuttiMetodi()` · `htmlIspirazioni()`

### 109. `js/coach/stato.js` — Stato del coach

`renderPianoCoach()` · `htmlMomentoBreve()` · `ultimoGiornoAllenamento()` · `momentoDaChiedere()` · `htmlDomandaMomento()`

### 110. `js/coach/biomeccanica.js` — Biomeccanica del coach

`CUE_SCHEMA` · `cueEsercizio()` · `respiroPer()` · `stabile()` · `htmlProva()` · `TEST_FAI_DA_TE` · `window.setTest()` · `htmlTestFaiDaTe()` · `bonusBiomecc()` · `SCALE_DOLORE`

### 111. `js/coach/esigenza.js` — Esigenza del coach

`ESIGENZA_INIZIO` · `esigenzaEsclusa()` · `tettoEsigenza()` · `rpeBersaglioSeduta()` · `window.esigenzaCoach()` · `window.aggiornaEsigenza()` · `segnaDoloreEsigenza()` · `htmlEsigenza()`

### 112. `js/coach/psicologia.js` — Psicologia: chi ha davanti il coach

`PSICO_DOMANDE` · `psicoCoach()` · `ritrattoCoach()` · `window.onbPsico()` · `window.setPsico()` · `htmlDomandePsico()` · `renderPsicoStep()` · `window.onbMomento()` · `htmlPrimiPassi()` · `sedutaPianoB()` · `TEMI` · `renderSettings()` · `setPagina` · `SET_PAGINE` · `window.openSetPage()` · `window.closeSetPage()` · `renderSetPage()` · `window.switchProtocol()`

## js/ui

### 113. `js/ui/schede-esercizio.js` — Schede esercizio: disegno e spiegazione

`arto()` · `tronco()` · `testa()` · `bilanciere()` · `manubrio()` · `freccia()` · `suolo()` · `wrapSvg()` · `inPiedi()` · `accosciato()` · `piegato()` · `sdraiato()` · `PATTERN_DRAW` · `PATTERN_INFO` · `PATTERN_RULES` · `window.patternFor()` · `VIDEO_VERIFICATI` · `VIDEO_PLAYLIST` · `window.testoRicercaVideo()` · `window.videoLinkFor()`

## js/dati

### 114. `js/dati/disegni-esercizi.js` — Disegni degli esercizi

`window.slugEsercizio()` · `IMMAGINI_ESERCIZI` · `window.immagineEsercizio()` · `slotImmagine()`

## js/ui

### 115. `js/ui/scheda-quattro-sezioni.js` — Scheda esercizio a quattro sezioni

`exInfoNome` · `exInfoTab` · `seduteEsercizio()` · `window.setExInfoTab()` · `exVuoto()` · `paneStorico()` · `paneGrafico()` · `paneRecord()`

## js/dati

### 116. `js/dati/schede-tecniche.js` — Schede tecniche per esercizio

`TECNICA` · `RESPIRO` · `GLOSSARIO` · `schedaTecnica()` · `htmlDettaglioScheda()` · `pausaConsigliata()` · `preferenzaEsercizio()` · `window.preferisci()` · `window.openExerciseInfo()` · `window.closeExerciseInfo()`

### 117. `js/dati/schede-varianti.js` — Schede tecniche delle varianti (presa, attacco) e dei classici aggiunti

_solo istruzioni, nessun nome pubblico_

### 118. `js/dati/scheda-unica.js` — Scheda unica per esercizio: tutto quello che l'app sa di un esercizio, in un oggetto solo

`window.schedaUnica()` · `window.bucchiNelleSchede()`

## js/ui

### 119. `js/ui/calendario/mese.js` — Calendario del mese

`calKey` · `loadCal` · `saveCal` · `mcAnno` · `mcMese` · `ymd()` · `daYmd()` · `lunediDi()` · `giorniTra()` · `piuGiorni()` · `giornoSettimana()` · `voceDaPiano()` · `mettiSettimana()` · `copiaSettimana()` · `settimaneDelMese()`

### 120. `js/ui/calendario/gruppi.js` — Gruppi muscolari nel calendario

`GRUPPO_COLORE` · `GRUPPI_ORDINE` · `_mcStorico` · `gruppiDelGiorno()` · `puntiniGruppi()` · `renderLegendaGruppi()` · `renderMonthCal()` · `window.mcMove()`

### 121. `js/ui/calendario/scambio.js` — Scambiare i giorni trascinandoli

`swapAppenaTrascinato` · `attachSwapDrag()` · `window.mcSwapDays()` · `window.mcCellClick()` · `scambiaNelCalendario()` · `aggiornaDopoScambio()` · `window.planSwapDays()` · `window.planDayClick()`

### 122. `js/ui/calendario/copia-settimana.js` — Copiare una settimana come blocco

`mcCopySrc` · `mcCopyTargets` · `etichettaSettimana()` · `settimanaPiena()` · `window.mcSelectWeek()` · `window.mcToggleTarget()` · `window.mcRepeat()` · `window.mcCancelCopy()` · `window.mcPaste()` · `renderCopyBar()` · `attachWeekDrag()` · `window.mcCopyWeeks()` · `window.mcPlaceTemplate()` · `window.mcFillMonth()`

### 123. `js/ui/menu-settimana.js` — Menu della settimana

`wmLunedi` · `window.openWeekMenu()` · `window.closeWeekMenu()` · `renderWeekMenu()` · `window.wmCancellaGiorno()` · `window.wmSvuotaSettimana()` · `window.wmCopiaProssima()` · `window.wmSelezionaPerCopiare()` · `window.mcClearMonth()` · `window.mcOpenDay()` · `window.mcCloseDay()` · `window.mcPlanDay()` · `window.mcRemoveDay()` · `window.segnaFattoNelCalendario()`

### 124. `js/ui/sessione-completata.js` — Sessione gia completata

`mostraSessione()` · `window.openDoneView()` · `window.openHistoryDetail()` · `window.closeDoneView()`

### 125. `js/ui/esporta-ics.js` — Esportazione verso calendari (.ics)

`icsEscape()` · `icsFold()` · `icsData()` · `window.buildIcs()` · `window.exportIcs()` · `linkGoogle()` · `aggiornaAiutoIcs()`

## js

### 126. `js/avvio.js` — Avvio: ultimo file caricato

_solo istruzioni, nessun nome pubblico_
