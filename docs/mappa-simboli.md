# Mappa dei simboli globali

File generato da `tools/simboli.js` (`npm run simboli`): non si modifica a mano (`npm run controlla` lo verifica).
Ogni riga: nome, dove e definito (`file:riga`), tipo, e **chi lo usa** negli altri file (`file:riga funzione`;
"(html)" = chiamato da un gestore `onclick="nome()"` in index.html o da una stringa di markup nel JS). In fondo alla riga, chi lo usa nello stesso file.
Cerca con `grep -n "nomeFunzione" docs/mappa-simboli.md`: la riga del nome dice chi lo usa; le altre righe in cui compare dicono cosa usa lui.
Esclusi i dizionari `js/lingue/en|es|de.js`. Tra i "chi lo usa" ci sono anche i test (`tests/`).

## Dipendenze al caricamento (ordine degli script)

Quasi tutto il codice gira solo dopo l avvio, quando ogni file e caricato. Questi file invece usano nomi di altri file
**mentre si caricano** (codice di primo livello o IIFE): il file a destra deve stare prima in `index.html`.
`npm run simboli -- --check` fallisce se l ordine non e rispettato.

- `js/lingue/avvio-traduttore.js` ← `js/lingue/traduttore.js` (avviaTraduttore, applicaGiorniSettimana, lingua)
- `js/coach/regia/perche.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/core/stato-condiviso.js` ← `js/core/costanti.js` (FAILURE_SET_SECONDS)
- `js/ui/onboarding.js` ← `js/lingue/traduttore.js` (ico)
- `js/coach/volume/rampa-settimana.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/specialita/forza.js` ← `js/coach/regia/genera.js` (registraSpecialita)
- `js/coach/specialita/forza-carichi.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/carichi/attrezzi.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/carichi/calibrazione.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/carichi/taratura.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/sicurezza/scarico.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/sicurezza/popolazioni.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/prontezza.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/dolore-mattina.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/regole-ricerca.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/regole-nuove.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/intensita.js` ← `js/coach/regia/fasi.js` (registraFase)
- `js/coach/metodi-epoca-oro.js` ← `js/coach/metodi-momenti.js` (METODI)
- `js/avvio.js` ← `js/dati/libreria-esercizi.js` (buildExerciseSelect) · `js/core/stato-condiviso.js` (recoveryMuted) · `js/core/modalita.js` (getStoredMode, chooseMode) · `js/ui/musica/mp3-locale.js` (refreshFailureTracks) · `js/ui/opzioni/impostazioni.js` (applyTheme)

## js/lingue

### `js/lingue/traduttore.js`

- `ICO_PATHS` js/lingue/traduttore.js:20 costante ← nessun altro file — nel file: ico
- `ico()` js/lingue/traduttore.js:65 funzione ← js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/ui/onboarding.js ×7 · js/coach/repertorio.js ×4 · js/coach/dolore-mattina.js ×1 · js/ui/seduta-libera.js ×4 · js/ui/lavoro-cronometro.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/compone.js ×2 · js/coach/stato.js ×2 · js/coach/psicologia.js ×1 · js/dati/schede-tecniche.js ×2 · js/ui/calendario/gruppi.js ×1 — nel file: emojiInIcone
- `EMOJI_ICO` js/lingue/traduttore.js:71 costante ← nessun altro file — nel file: emojiInIcone
- `EMOJI_RX` js/lingue/traduttore.js:82 costante ← nessun altro file — nel file: EMOJI_RX_G, emojiInIcone, trTesto
- `EMOJI_RX_G` js/lingue/traduttore.js:83 costante ← nessun altro file — nel file: senzaEmojiTesto
- `EMOJI_TESTA` js/lingue/traduttore.js:85 costante ← js/dati/schede-epoca-oro.js ×1 · js/dati/dettagli-esercizi.js ×1 · js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/coach/programma/ricette.js ×2 · js/ui/onboarding-risultato.js ×2 · js/ui/statistiche.js ×4 · js/coach/questionario-decisioni.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/schede-esercizio.js ×2 · js/dati/disegni-esercizi.js ×3 · js/dati/schede-tecniche.js ×2 · js/dati/scheda-unica.js ×1 · js/ui/menu-settimana.js ×1 · js/ui/sessione-completata.js ×2 · js/ui/esporta-ics.js ×2 · tests/browser/coerenza-schede.js ×3 · tests/browser/dettagli-esercizi.js ×2 · tests/browser/disegni-mancanti.js ×1 · tests/browser/traduzioni-esercizi.js ×1
- `senzaEmojiTesto()` js/lingue/traduttore.js:86 funzione ← nessun altro file — nel file: emojiInIcone, avviaTraduttore
- `LINGUA_KEY` js/lingue/traduttore.js:88 costante ← js/core/backup.js:60 ricaricaApp — nel file: linguaIniziale, setLingua
- `LINGUE` js/lingue/traduttore.js:89 costante ← js/core/backup.js:61 ricaricaApp · js/coach/psicologia.js:163 renderSettings, 253 renderSetPage — nel file: linguaIniziale, setLingua
- `LOCALI` js/lingue/traduttore.js:90 costante ← nessun altro file — nel file: LOCALE
- `I18N` js/lingue/traduttore.js:91 valore window ← js/ui/importa-progressi.js:27 indiceNomi · js/ui/schede-esercizio.js:368 testoRicercaVideo · tests/struttura.test.js:37, 40, 49 · tests/browser/gravidanza.js:30 pagina · tests/browser/metodi-epoca-oro.js:27 — nel file: tr
- `linguaIniziale()` js/lingue/traduttore.js:93 funzione ← nessun altro file — nel file: LINGUA
- `LINGUA` js/lingue/traduttore.js:99 variabile ← nessun altro file — nel file: lingua, LOCALE, trCore, tr, trTesto, trAlbero, avviaTraduttore, applicaGiorniSettimana, …
- `lingua()` js/lingue/traduttore.js:100 funzione window ← js/lingue/avvio-traduttore.js:2 · js/ui/oggi.js:109 renderOggi · js/ui/guida-interattiva.js:365 renderInformativa · js/core/backup.js:61 ricaricaApp · js/coach/psicologia.js:163 renderSettings, 253 renderSetPage · js/ui/schede-esercizio.js:366 testoRicercaVideo
- `LOCALE()` js/lingue/traduttore.js:101 funzione window ← js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×1 · js/ui/storico.js ×5 · js/ui/onboarding-risultato.js ×1 · js/ui/statistiche.js ×5 · js/ui/statistiche-grafico.js ×2 · js/coach/repertorio.js ×3 · js/coach/agente-consigli.js ×2 · js/coach/bia/opzioni.js ×2 · js/core/backup.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×3 · js/ui/progressi/riepilogo.js ×1 · js/ui/progressi/pagine.js ×1 · js/ui/progressi/foto.js ×3 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/psicologia.js ×2 · js/ui/scheda-quattro-sezioni.js ×5 · js/ui/calendario/gruppi.js ×2 · js/ui/calendario/scambio.js ×1 · js/ui/calendario/copia-settimana.js ×2 · js/ui/menu-settimana.js ×2 · js/ui/sessione-completata.js ×2 — nel file: applicaGiorniSettimana
- `I18N_SEP` js/lingue/traduttore.js:103 costante ← nessun altro file — nel file: trCore
- `trCore()` js/lingue/traduttore.js:104 funzione ← nessun altro file — nel file: tr
- `tr()` js/lingue/traduttore.js:130 funzione window ← js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×2 · js/ui/allenamento/macchinario-occupato.js ×11 · js/ui/allenamento/sessione.js ×1 · js/core/nativo.js ×2 · js/ui/allenamento/timer-pannello.js ×3 · js/ui/annulla.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/coach/programma/alternative.js ×4 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×2 · js/coach/bia/opzioni.js ×3 · js/ui/guida-interattiva.js ×6 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×2 · js/ui/stampa-scheda.js ×3 · js/coach/esigenza.js ×1 · js/ui/schede-esercizio.js ×2 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · tests/browser/disegni-mancanti.js ×2 · tests/browser/onboarding-attrezzi.js ×15 · tests/browser/onboarding-forza.js ×1 · tests/browser/traduzioni-esercizi.js ×1 — nel file: trP, trEs, emojiInIcone, trTesto, trAttr, traduciPagina, avviaTraduttore, ritraduciTutto
- `trP()` js/lingue/traduttore.js:144 funzione window ← js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×3 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/timer-pannello.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×3 · js/coach/intensita.js ×1 · js/coach/bia/opzioni.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/menu-settimana.js ×1
- `trEs()` js/lingue/traduttore.js:149 funzione window ← js/ui/piano/selezione-multipla.js:251 deletePianoExercise · js/ui/allenamento/seduta.js:259 removeSetFrom, 278 toggleSkipExercise · js/ui/allenamento/macchinario-occupato.js:83 htmlSostituito, 103 htmlOccupato, 177 sostituisciOggi, 193 ripristinaOriginale · js/ui/allenamento/timer-pannello.js:9 avvisaTelefonoRecupero · js/ui/gruppi-muscolari.js:176 removeExerciseByName · js/coach/pannello.js:30 renderCoach · js/coach/programma/alternative.js:46 renderAlternative · js/ui/importa-progressi.js:176 mostraAnteprimaImport
- `I18N_ATTR` js/lingue/traduttore.js:151 costante ← nessun altro file — nel file: trAttr, avviaTraduttore, ritraduciTutto
- `I18N_ORIG` js/lingue/traduttore.js:152 costante ← nessun altro file — nel file: emojiInIcone, trTesto, ritraduciTutto
- `emojiInIcone()` js/lingue/traduttore.js:155 funzione ← nessun altro file — nel file: trTesto
- `trTesto()` js/lingue/traduttore.js:179 funzione ← nessun altro file — nel file: trAlbero, avviaTraduttore
- `trAttr()` js/lingue/traduttore.js:191 funzione ← nessun altro file — nel file: trAlbero, avviaTraduttore
- `trAlbero()` js/lingue/traduttore.js:202 funzione ← nessun altro file — nel file: traduciPagina, avviaTraduttore
- `traduciPagina()` js/lingue/traduttore.js:214 funzione window ← tests/browser/gravidanza.js:82 — nel file: avviaTraduttore
- `I18N_ATTIVO` js/lingue/traduttore.js:216 variabile ← nessun altro file — nel file: avviaTraduttore
- `avviaTraduttore()` js/lingue/traduttore.js:217 funzione ← js/lingue/avvio-traduttore.js:2 — nel file: setLingua
- `alert()` js/lingue/traduttore.js:223 funzione window ← js/ui/piano/aggiungi-allenamento.js:302 openWeekSheet · js/ui/piano/selezione-multipla.js:67 clearDay, 84 copyDayTo, 147 toggleSuperset, 162 startWorkoutFromPlan · js/ui/allenamento/sessione.js:80 openWorkoutDay · js/ui/musica/mp3-locale.js:78 handleAudioUpload · js/ui/musica/player-web.js:67 previewWebSegment, 76 handleWebLinkSubmit · js/ui/riposo-settimane.js:52 saveWeekSnapshot · js/ui/allenamento/termina-e-cardio.js:96 endWorkout · js/coach/bia/opzioni.js:128 salvaBiaAgente, 138 restartOnboarding · js/ui/calendario/scambio.js:83 mcSwapDays · js/ui/calendario/copia-settimana.js:34 mcSelectWeek, 169 mcPlaceTemplate, 182 mcFillMonth · js/ui/menu-settimana.js:144 mcPlanDay · js/ui/esporta-ics.js:66 exportIcs · tests/revisione-onda1.test.js:182 (html), 185 (html) — nel file: avviaTraduttore
- `confirm()` js/lingue/traduttore.js:224 funzione window ← js/ui/piano/schede-pronte.js:48 applyTemplate · js/ui/piano/selezione-multipla.js:94 copyDayTo · js/ui/allenamento/sessione.js:77 openWorkoutDay · js/ui/musica/mp3-locale.js:174 deleteTrack · js/ui/riposo-settimane.js:16 toggleRestDay, 68 saveWeekSnapshot, 81 restoreWeek · js/ui/allenamento/termina-e-cardio.js:108 endWorkout · js/ui/storico.js:104 clearHistory · js/coach/bia/opzioni.js:142 restartOnboarding · js/ui/guida-interattiva.js:350 revocaConsenso — nel file: avviaTraduttore
- `prompt()` js/lingue/traduttore.js:225 funzione window ← js/ui/piano/schede-pronte.js:76 renameDayTitle · js/ui/piano/selezione-multipla.js:85 copyDayTo — nel file: avviaTraduttore
- `DOW_IT` js/lingue/traduttore.js:240 costante ← nessun altro file — nel file: applicaGiorniSettimana
- `applicaGiorniSettimana()` js/lingue/traduttore.js:241 funzione ← js/lingue/avvio-traduttore.js:2 — nel file: setLingua
- `ritraduciTutto()` js/lingue/traduttore.js:251 funzione ← nessun altro file — nel file: setLingua
- `setLingua()` js/lingue/traduttore.js:277 funzione window ← js/core/backup.js:61 ricaricaApp · js/coach/psicologia.js:253 renderSetPage (html)

### `js/lingue/avvio-traduttore.js`

_nessun nome globale_

## js/core

### `js/core/service-worker.js`

_nessun nome globale_

### `js/core/ripristino-guida.js`

- `GUIDA_BACKUP` js/core/ripristino-guida.js:11 costante ← js/ui/guida-interattiva.js:113 guidaPreparaProva, 124 guidaRipristina, 264 chiudiGuida — nel file: guidaApplicaFoto, (primo livello)
- `guidaApplicaFoto()` js/core/ripristino-guida.js:12 funzione ← js/ui/guida-interattiva.js:125 guidaRipristina — nel file: (primo livello)

### `js/core/costanti.js`

- `DAYS` js/core/costanti.js:7 costante ← js/core/storage.js ×2 · js/core/modalita.js ×1 · js/core/navigazione.js ×1 · js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×6 · js/ui/piano/aggiungi-allenamento.js ×10 · js/ui/piano/selezione-multipla.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/figura-anatomica.js ×2 · js/coach/programma/ricette.js ×2 · js/coach/volume/volume.js ×2 · js/coach/volume/rampa-settimana.js ×1 · js/coach/regia/genera.js ×7 · js/coach/programma/alternative.js ×2 · js/coach/carichi/calibrazione.js ×2 · js/coach/questionario-decisioni.js ×3 · js/coach/repertorio.js ×8 · js/coach/agente-consigli.js ×1 · js/ui/guida-interattiva.js ×3 · js/ui/importa-csv.js ×1 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×2 · tests/cedimento.test.js ×2 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/coerenza-schede.js ×2 · tests/browser/elenco-esercizi.js ×1 · tests/browser/gravidanza.js ×6 · tests/browser/macchinario-occupato-layout.js ×2 · tests/browser/macchinario-occupato-tendina.js ×2 · tests/browser/macchinario-occupato.js ×2 · tests/browser/metodi-epoca-oro.js ×2 · tests/browser/regole-nuove.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×5 — nel file: currentDay
- `currentDay` js/core/costanti.js:8 variabile ← js/coach/suggeritore.js ×1 · js/ui/piano/schede-pronte.js ×12 · js/core/modalita.js ×1 · js/core/navigazione.js ×4 · js/ui/piano/giorno.js ×9 · js/ui/piano/aggiungi-allenamento.js ×4 · js/ui/piano/selezione-multipla.js ×26 · js/ui/allenamento/seduta.js ×14 · js/ui/allenamento/macchinario-occupato.js ×13 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×5 · js/ui/gruppi-muscolari.js ×10 · js/ui/figura-anatomica.js ×6 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×5 · js/coach/programma/alternative.js ×1 · js/coach/prontezza.js ×5 · js/coach/regole-nuove.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×6 · js/ui/lavoro-cronometro.js ×2 · js/ui/progressi/riepilogo.js ×1 · tests/cedimento.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×2 · tests/browser/macchinario-occupato-tendina.js ×11 · tests/browser/macchinario-occupato.js ×12 · tests/browser/metodi-epoca-oro.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×1
- `currentMode` js/core/costanti.js:9 variabile ← js/coach/suggeritore.js ×1 · js/core/storage.js ×3 · js/core/modalita.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/onboarding.js ×1 · js/coach/programma/archivio.js ×2 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×2 · js/coach/regole-ricerca.js ×1 · js/ui/opzioni/impostazioni.js ×2 · js/core/backup.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×2 · js/coach/psicologia.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/esporta-ics.js ×2
- `currentTab` js/core/costanti.js:10 variabile ← js/lingue/traduttore.js:289 setLingua · js/core/navigazione.js:25 selectDay · js/ui/oggi.js:186 switchTab · js/ui/allenamento/cedimento-canzone.js:95 clearCedimentoAudio · js/ui/guida-interattiva.js:21 GUIDA · js/core/backup.js:28 esportaBackup · js/ui/importa-progressi.js:200 confermaImportProgressi, 217 confermaImport · js/coach/psicologia.js:205 closeSetPage · tests/browser/guida-tocchi.js:24
- `MODE_KEY` js/core/costanti.js:12 costante ← js/core/modalita.js:7 getStoredMode, 10 chooseMode · js/core/backup.js:62 ricaricaApp · js/coach/psicologia.js:289 switchProtocol
- `MODE_META` js/core/costanti.js:14 costante ← js/ui/opzioni/impostazioni.js:34 applyTheme
- `DEFAULT_MONDAY_PROGRAM` js/core/costanti.js:19 costante ← js/core/storage.js:145 seedDefaultsIfNeeded
- `FAILURE_SET_SECONDS` js/core/costanti.js:31 costante ← js/core/stato-condiviso.js:13 dropRemaining · js/ui/allenamento/cedimento.js:147 apriCedimento, 206 chiudiCedimento · js/ui/musica/mp3-locale.js:139 selectTrack, 158 updateMp3SegmentLabel · js/ui/musica/player-web.js:26 configureWebSegment, 41 updateWebSegmentLabel, 206 readYouTubeDuration

### `js/core/memoria-chiamata.js`

- `_memoriaChiamata` js/core/memoria-chiamata.js:16 variabile ← nessun altro file — nel file: memoriaApri, memoriaChiudi, memoriaTabella
- `_memoriaProfondita` js/core/memoria-chiamata.js:16 variabile ← nessun altro file — nel file: memoriaApri, memoriaChiudi
- `memoriaApri()` js/core/memoria-chiamata.js:17 funzione ← js/coach/regia/genera.js:339 buildProgram · tests/memoria-chiamata.test.js:33 (html), 46 (html) · tests/tempo-copertura.test.js:22 esegui (html)
- `memoriaChiudi()` js/core/memoria-chiamata.js:18 funzione ← js/coach/regia/genera.js:340 buildProgram · tests/memoria-chiamata.test.js:33 (html), 35 (html), 37 (html), 48 (html) · tests/tempo-copertura.test.js:22 esegui (html)
- `memoriaTabella()` js/core/memoria-chiamata.js:20 funzione ← js/dati/libreria-esercizi.js:233 findExercise · js/dati/dettagli-esercizi.js:306 _nomePulito, 315 dettaglioEsercizio · js/coach/parametri.js:48 regolaAttiva · js/ui/figura-anatomica.js:94 isTimeBased · js/coach/programma/motore.js:18 attrezzoDi, 123 consentito · js/coach/programma/schemi.js:34 schemaDi, 59 inAllungamento · js/coach/programma/struttura-pro.js:53 strChiave · js/coach/volume/volume.js:38 creditoSerie · js/coach/questionario-decisioni.js:56 senzaEmoji, 63 nomeInLibreria · js/coach/regole-ricerca.js:68 tipoCarico · tests/memoria-chiamata.test.js:16 (html), 18 (html), 23 (html), 29 (html), 31 (html), 34 (html), …

## js/dati

### `js/dati/schede-pronte.js`

- `WORKOUT_TEMPLATES` js/dati/schede-pronte.js:11 costante ← js/dati/schede-epoca-oro.js:70 · js/ui/piano/schede-pronte.js:11 openTemplatePicker, 42 applyTemplate · js/ui/piano/aggiungi-allenamento.js:24 awEsercizi, 36 awNome, 175 renderAddWeek · js/ui/figura-anatomica.js:240 renderGruppi · js/coach/programma/ricette.js:140 componiSedute · tests/browser/metodi-epoca-oro.js:15, 17

### `js/dati/libreria-esercizi.js`

- `MUSCLE_GROUPS` js/dati/libreria-esercizi.js:10 costante ← js/dati/dettagli-esercizi.js ×1 · js/coach/suggeritore.js ×2 · js/ui/piano/giorno.js ×4 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/gruppi-muscolari.js ×4 · js/ui/elenco-esercizi.js ×1 · js/ui/figura-anatomica.js ×5 · js/coach/pannello.js ×1 · js/ui/onboarding.js ×1 · js/coach/volume/volume.js ×3 · js/ui/opzioni/il-coach.js ×1 · js/ui/seduta-libera.js ×1 · js/ui/progressi/riepilogo.js ×3 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/gruppi.js ×4 — nel file: buildExerciseSelect
- `EXERCISE_LIBRARY` js/dati/libreria-esercizi.js:20 costante ← js/dati/schede-epoca-oro.js ×1 · js/dati/dettagli-esercizi.js ×1 · js/coach/suggeritore.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×2 · js/coach/programma/motore.js ×2 · js/coach/programma/ricette.js ×6 · js/coach/programma/struttura-pro.js ×2 · js/coach/programma/completamenti.js ×1 · js/coach/volume/volume.js ×1 · js/coach/volume/tempo.js ×1 · js/coach/sicurezza/vincoli.js ×2 · js/coach/carichi/partenza.js ×1 · js/coach/questionario-decisioni.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×2 · js/dati/scheda-unica.js ×1 · tests/browser/carichi-partenza.js ×1 · tests/browser/dettagli-esercizi.js ×4 · tests/browser/disegni-mancanti.js ×1 · tests/browser/elenco-esercizi.js ×2 · tests/browser/ripetizioni.js ×2 · tests/browser/scheda-unica.js ×2 · tests/browser/traduzioni-esercizi.js ×1 — nel file: buildExerciseSelect, findExercise
- `buildExerciseSelect()` js/dati/libreria-esercizi.js:215 funzione ← js/avvio.js:13
- `findExercise()` js/dati/libreria-esercizi.js:232 funzione ← js/dati/dettagli-esercizi.js ×2 · js/coach/suggeritore.js ×3 · js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×2 · js/ui/piano/aggiungi-allenamento.js ×3 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×4 · js/ui/gruppi-muscolari.js ×1 · js/ui/figura-anatomica.js ×7 · js/coach/programma/motore.js ×1 · js/coach/programma/ricette.js ×8 · js/coach/programma/struttura-pro.js ×3 · js/coach/programma/completamenti.js ×17 · js/coach/volume/serie-ripetizioni.js ×2 · js/coach/volume/volume.js ×20 · js/coach/volume/tempo.js ×17 · js/coach/volume/tecniche.js ×3 · js/coach/sicurezza/tecnica-adatta.js ×3 · js/coach/regia/genera.js ×3 · js/coach/specialita/forza.js ×12 · js/coach/carichi/progressivo.js ×1 · js/coach/carichi/partenza.js ×3 · js/coach/carichi/attrezzi.js ×2 · js/coach/carichi/calibrazione.js ×1 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×1 · js/coach/regole-ricerca.js ×3 · js/coach/regole-nuove.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×1 · js/coach/metodi-momenti.js ×6 · js/coach/metodi-epoca-oro.js ×2 · js/coach/compone.js ×1 · js/coach/biomeccanica.js ×4 · js/coach/psicologia.js ×2 · js/dati/schede-tecniche.js ×3 · js/dati/scheda-unica.js ×1 · js/ui/calendario/gruppi.js ×1 · tests/aiuto-atleta.js ×2 · tests/conserva-progressi.test.js ×2 · tests/forza-struttura.test.js ×1 · tests/generatore-onda0b.test.js ×2 · tests/generatore-onda1.test.js ×1 · tests/hip-hinge-ripiego.test.js ×1 · tests/integrazione-3a.test.js ×1 · tests/integrazione-onda2b.test.js ×2 · tests/integrazione-onda2c.test.js ×1 · tests/memoria-chiamata.test.js ×2 · tests/partenza-donne.test.js ×1 · tests/revisione-onda2d.test.js ×1 · tests/tempo-copertura.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/carichi-partenza.js ×1 · tests/browser/coerenza-schede.js ×3 · tests/browser/metodi-epoca-oro.js ×4

### `js/dati/schede-epoca-oro.js`

_nessun nome globale_

### `js/dati/dettagli-esercizi.js`

- `SEZIONI_ESERCIZI` js/dati/dettagli-esercizi.js:22 costante ← js/dati/schede-tecniche.js:184 htmlDettaglioScheda · tests/browser/traduzioni-esercizi.js:21 — nel file: organizzaEsercizi
- `SOTTOGRUPPI` js/dati/dettagli-esercizi.js:25 costante ← tests/browser/dettagli-esercizi.js:23 · tests/browser/traduzioni-esercizi.js:22 — nel file: organizzaEsercizi
- `MUSCOLI` js/dati/dettagli-esercizi.js:42 costante ← nessun altro file — nel file: muscoloBersaglio
- `MULTIARTICOLARI_TOTALI` js/dati/dettagli-esercizi.js:83 costante ← nessun altro file — nel file: famigliaTotaleDi, lavoroDaSostituire
- `NOTE_ATTACCO` js/dati/dettagli-esercizi.js:90 costante ← tests/browser/dettagli-esercizi.js:38 · tests/browser/traduzioni-esercizi.js:20 — nel file: dettaglioEsercizio
- `DETTAGLI` js/dati/dettagli-esercizi.js:106 costante ← tests/browser/dettagli-esercizi.js:37, 38 — nel file: dettaglioEsercizio, bersaglioDi
- `_nomePulito()` js/dati/dettagli-esercizi.js:305 funzione ← js/dati/attributi-esercizi.js:292 attributi — nel file: dettaglioEsercizio, bersaglioDi, famigliaTotaleDi, sezioneEsercizio, ordineEsercizi
- `dettaglioEsercizio()` js/dati/dettagli-esercizi.js:314 funzione window ← js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/allenamento/seduta.js ×1 · js/ui/elenco-esercizi.js ×1 · js/coach/programma/motore.js ×1 · js/coach/programma/ricette.js ×1 · js/coach/programma/struttura-pro.js ×4 · js/coach/volume/volume.js ×3 · js/ui/seduta-libera.js ×1 · js/ui/schede-esercizio.js ×2 · js/dati/schede-tecniche.js ×1 · tests/memoria-chiamata.test.js ×1 · tests/sicurezza-onda0.test.js ×2 · tests/browser/coerenza-schede.js ×1 · tests/browser/dettagli-esercizi.js ×1 · tests/browser/traduzioni-esercizi.js ×1 — nel file: sezioneEsercizio, etichettaAttrezzo, focusEsercizio, focusConTipo, organizzaEsercizi, variantiEsercizio
- `bersaglioDi()` js/dati/dettagli-esercizi.js:324 funzione window ← js/coach/programma/motore.js:188 alternativeStessoMuscolo · js/coach/programma/ricette.js:161 componiSedute · js/coach/programma/completamenti.js:140 completaSettimana · js/coach/volume/volume.js:296 volumeMotore · js/coach/volume/tempo.js:679 antagonistiPerMuscolo · js/coach/specialita/forza.js:326 forzaSedute, 423 forzaEquilibra · tests/forza-struttura.test.js:202 (html) · tests/memoria-chiamata.test.js:43 (html) · tests/partenza-donne.test.js:228 (html), 237 (html) · tests/browser/macchinario-occupato-tendina.js:112 — nel file: muscoloBersaglio
- `muscoloBersaglio()` js/dati/dettagli-esercizi.js:329 funzione window ← tests/browser/macchinario-occupato-tendina.js:41 — nel file: lavoroDaSostituire
- `famigliaTotaleDi()` js/dati/dettagli-esercizi.js:334 funzione window ← js/coach/programma/motore.js:188 alternativeStessoMuscolo · js/coach/questionario-decisioni.js:88 varianteStessoMuscolo — nel file: lavoroDaSostituire
- `lavoroDaSostituire()` js/dati/dettagli-esercizi.js:340 funzione window ← js/ui/allenamento/macchinario-occupato.js:97 htmlOccupato
- `sezioneEsercizio()` js/dati/dettagli-esercizi.js:347 funzione window ← nessun altro file — nel file: organizzaEsercizi
- `etichettaAttrezzo()` js/dati/dettagli-esercizi.js:354 funzione window ← js/ui/piano/aggiungi-allenamento.js:416 renderPiano · js/ui/allenamento/seduta.js:163 renderAllenamento · js/ui/seduta-libera.js:95 htmlListaLibera
- `focusEsercizio()` js/dati/dettagli-esercizi.js:358 funzione window ← js/ui/piano/aggiungi-allenamento.js:416 renderPiano · js/ui/allenamento/seduta.js:163 renderAllenamento
- `focusConTipo()` js/dati/dettagli-esercizi.js:363 funzione window ← nessun altro file
- `ordineEsercizi()` js/dati/dettagli-esercizi.js:370 funzione window ← js/ui/gruppi-muscolari.js:83 renderSuggested, 138 renderSheetExercises — nel file: organizzaEsercizi
- `organizzaEsercizi()` js/dati/dettagli-esercizi.js:379 funzione window ← js/ui/elenco-esercizi.js:28 htmlEserciziOrganizzati · tests/browser/dettagli-esercizi.js:39
- `variantiEsercizio()` js/dati/dettagli-esercizi.js:402 funzione window ← js/dati/schede-tecniche.js:185 htmlDettaglioScheda

### `js/dati/attributi-esercizi.js`

- `UNITA_VOLUME` js/dati/attributi-esercizi.js:48 costante ← js/coach/volume/volume.js:127 unitaPriorita, 163 bersagliVolume, 227 creditiUnita, 252 volumeMotore, 998 aggiungiSerieUtile — nel file: contaVolume
- `UNITA_DI_MUSCOLO` js/dati/attributi-esercizi.js:52 costante ← nessun altro file — nel file: unitaDiMuscolo
- `ZONE_STRESS` js/dati/attributi-esercizi.js:59 costante ← nessun altro file — nel file: _attributiEspansi, stressArticolare
- `ZONE_ALIAS` js/dati/attributi-esercizi.js:61 costante ← nessun altro file — nel file: stressArticolare
- `CLASSI_TECNICA` js/dati/attributi-esercizi.js:62 costante ← nessun altro file
- `SCHEMI_ESERCIZIO` js/dati/attributi-esercizi.js:64 costante ← nessun altro file
- `PROFILI_RESISTENZA` js/dati/attributi-esercizi.js:65 costante ← nessun altro file
- `ATTREZZI_ESERCIZIO` js/dati/attributi-esercizi.js:66 costante ← nessun altro file
- `SERVE_AMMESSI` js/dati/attributi-esercizi.js:67 costante ← nessun altro file
- `MOTIVI_ZERO` js/dati/attributi-esercizi.js:69 costante ← nessun altro file
- `SERIE_MIN_PER_SEDUTA` js/dati/attributi-esercizi.js:76 costante ← nessun altro file — nel file: contaVolume
- `ATTRIBUTI` js/dati/attributi-esercizi.js:78 costante ← nessun altro file — nel file: _attributiEspansi
- `_attributiCache` js/dati/attributi-esercizi.js:273 variabile ← nessun altro file — nel file: _attributiEspansi
- `_attributiEspansi()` js/dati/attributi-esercizi.js:275 funzione ← nessun altro file — nel file: attributi
- `attributi()` js/dati/attributi-esercizi.js:290 funzione window ← js/coach/catalogo-regole.js ×2 · js/coach/programma/motore.js ×2 · js/coach/programma/schemi.js ×2 · js/coach/programma/struttura-pro.js ×3 · js/coach/programma/mesociclo.js ×2 · js/coach/programma/completamenti.js ×6 · js/coach/volume/volume.js ×8 · js/coach/volume/tempo.js ×2 · js/coach/sicurezza/vincoli.js ×4 · js/coach/sicurezza/tecnica-adatta.js ×4 · js/coach/sicurezza/fastidi.js ×2 · js/coach/specialita/forza.js ×6 · js/coach/carichi/partenza.js ×2 · tests/attributi.test.js ×3 · tests/fastidi.test.js ×1 · tests/forza-equilibrio.test.js ×2 · tests/forza-ordine-alzata.test.js ×1 · tests/forza-struttura.test.js ×1 · tests/genera-stadi.test.js ×1 · tests/generatore-onda1.test.js ×2 · tests/hip-hinge-ripiego.test.js ×3 · tests/tecniche.test.js ×1 · tests/browser/dettagli-esercizi.js ×4 — nel file: creditoMuscoli, contaVolume, classeTecnica, livelloAbilita, stressArticolare, serveAttrezzo
- `creditoMuscoli()` js/dati/attributi-esercizi.js:295 funzione window ← js/coach/volume/tecniche.js:44 entraNelTetto, 51 muscoloDellEsercizio · tests/attributi.test.js:467 (html), 471 (html), 472 (html)
- `unitaDiMuscolo()` js/dati/attributi-esercizi.js:300 funzione window ← js/coach/volume/volume.js:231 creditiUnita · tests/attributi.test.js:186 (html), 187 (html)
- `contaVolume()` js/dati/attributi-esercizi.js:306 funzione window ← js/coach/volume/volume.js:240 volumeUnita, 937 puoSalireVolume, 975 limitaVolume · js/coach/volume/tempo.js:316 pavimentoOk · js/coach/volume/tecniche.js:46 entraNelTetto · tests/attributi.test.js:459 (html), 483 (html), 498 (html), 499 (html), 500 (html), 501 (html), … · tests/fastidi.test.js:124 (html), 184 (html) · tests/integrazione-onda2c.test.js:124 (html) · tests/volume.test.js:32 volume (html), 278 (html), 284 (html), 286 (html)
- `classeTecnica()` js/dati/attributi-esercizi.js:329 funzione window ← js/coach/programma/mesociclo.js:353 classeRirDi · js/coach/volume/tecniche.js:83 assegnaTecniche · js/coach/regia/genera.js:297 riconciliaNote · js/coach/sicurezza/popolazioni.js:67 pavimentoRirPopolazioni · tests/attributi.test.js:468 (html), 469 (html) · tests/popolazioni.test.js:98 (html) · tests/revisione-onda2d.test.js:184 (html)
- `livelloAbilita()` js/dati/attributi-esercizi.js:334 funzione window ← js/coach/programma/ricette.js:221 componiSedute · js/coach/carichi/partenza.js:273 varianteSenzaBilanciere · tests/attributi.test.js:140 (html), 141 (html)
- `stressArticolare()` js/dati/attributi-esercizi.js:339 funzione window ← js/coach/sicurezza/tecnica-adatta.js:88 esercizioCaricaIlFastidio · js/coach/sicurezza/fastidi.js:79 datiNotaFastidio · tests/attributi.test.js:93 (html), 264 (html), 265 (html), 266 (html), 279 (html), 283 (html), … · tests/fastidi.test.js:31 stress (html) · tests/integrazione-onda2c.test.js:229 (html)
- `serveAttrezzo()` js/dati/attributi-esercizi.js:345 funzione window ← js/coach/programma/motore.js:75 chiedeAttrezzo, 109 attrezziDichiaratiEsito · js/coach/volume/volume.js:515 volumeMotore · tests/attrezzi-dichiarati.test.js:83 serveDi (html) · tests/attributi.test.js:303 (html), 304 (html), 305 (html), 306 (html), 307 (html), 308 (html) · tests/selezione.test.js:145 (html)

## js/coach

### `js/coach/parametri.js`

- `COACH_PARAMETRI` js/coach/parametri.js:13 costante ← js/coach/programma/struttura-pro.js ×2 · js/coach/programma/completamenti.js ×3 · js/coach/volume/serie-ripetizioni.js ×3 · js/coach/volume/volume.js ×7 · js/coach/volume/tempo.js ×2 · js/coach/volume/tecniche.js ×1 · js/coach/sicurezza/vincoli.js ×1 · js/coach/sicurezza/tecnica-adatta.js ×1 · js/coach/regia/genera.js ×1 · js/coach/carichi/calibrazione.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/prontezza.js ×4 · js/coach/repertorio.js ×2 · js/coach/dolore-mattina.js ×2 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×1 · js/coach/esigenza.js ×1
- `REGOLE_SPEGNIBILI` js/coach/parametri.js:38 costante ← nessun altro file — nel file: regolaAttivaCalcolo
- `REGOLE_SPENTE_KEY` js/coach/parametri.js:46 costante ← tests/browser/intensita-bia.js:54 · tests/browser/regole-nuove.js:25 — nel file: regolaAttivaCalcolo
- `regolaAttiva()` js/coach/parametri.js:47 funzione window ← js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/onboarding.js ×6 · js/coach/programma/motore.js ×2 · js/coach/programma/schemi.js ×2 · js/coach/programma/ricette.js ×2 · js/coach/programma/mesociclo.js ×11 · js/coach/programma/completamenti.js ×2 · js/coach/volume/serie-ripetizioni.js ×2 · js/coach/volume/volume.js ×4 · js/coach/volume/tempo.js ×8 · js/coach/volume/tecniche.js ×2 · js/coach/volume/rampa-settimana.js ×3 · js/coach/sicurezza/vincoli.js ×1 · js/coach/sicurezza/fastidi.js ×2 · js/coach/regia/brief.js ×2 · js/coach/regia/genera.js ×2 · js/coach/specialita/forza.js ×7 · js/coach/specialita/forza-carichi.js ×1 · js/coach/carichi/partenza.js ×7 · js/coach/carichi/attrezzi.js ×1 · js/coach/carichi/calibrazione.js ×3 · js/coach/sicurezza/scarico.js ×6 · js/coach/sicurezza/popolazioni.js ×5 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×3 · js/coach/dolore-mattina.js ×3 · js/coach/regole-ricerca.js ×14 · js/coach/regole-nuove.js ×5 · js/coach/intensita.js ×5 · js/ui/opzioni/il-coach.js ×4 · js/coach/esigenza.js ×4 · tests/catalogo.test.js ×1 · tests/fastidi.test.js ×1 · tests/forza-carichi.test.js ×2 · tests/memoria-chiamata.test.js ×2 · tests/partenza-donne.test.js ×2
- `regolaAttivaCalcolo()` js/coach/parametri.js:54 funzione ← nessun altro file — nel file: regolaAttiva

### `js/coach/regia/fasi.js`

- `FASI_PUNTI` js/coach/regia/fasi.js:42 costante ← js/coach/specialita/forza-carichi.js:59 forzaCatenaFinoA — nel file: registraFase, fasiRegistrate, eseguiFasi
- `registraFase()` js/coach/regia/fasi.js:44 funzione ← js/coach/regia/perche.js ×2 · js/coach/volume/rampa-settimana.js ×1 · js/coach/specialita/forza-carichi.js ×2 · js/coach/carichi/attrezzi.js ×1 · js/coach/carichi/calibrazione.js ×1 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×1 · js/coach/sicurezza/popolazioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/dolore-mattina.js ×1 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×3 · js/coach/intensita.js ×2 · tests/bilancia-v2.test.js ×1 · tests/carichi-golden.test.js ×10 · tests/catalogo.test.js ×1
- `fasiRegistrate()` js/coach/regia/fasi.js:57 funzione ← tests/carichi-golden.test.js:361 (html), 368 (html), 377 (html), 378 (html), 392 (html) · tests/forza-carichi.test.js:95 (html)
- `eseguiFasi()` js/coach/regia/fasi.js:66 funzione ← js/coach/prontezza.js:67 applicaProntezza · js/coach/regole-ricerca.js:555 caricoProssimo, 669 applicaCaricoProgressivo, 705 imparaDallaSeduta · tests/carichi-golden.test.js:376 (html), 379 (html)

### `js/coach/catalogo-regole.js`

- `COACH_SQUADRA` js/coach/catalogo-regole.js:6 costante ← js/coach/regia/perche.js:40 sottoCoachDi, 48 nomeSottoCoach
- `COACH_REGOLE` js/coach/catalogo-regole.js:17 costante ← tests/browser/regole-nuove.js:46 — nel file: (primo livello)
- `COACH_REGOLE_PER_CODICE` js/coach/catalogo-regole.js:294 costante ← nessun altro file — nel file: (primo livello), regolaDescritta
- `regolaDescritta()` js/coach/catalogo-regole.js:296 funzione window ← js/coach/parametri.js:56 regolaAttivaCalcolo · js/coach/regia/perche.js:38 sottoCoachDi, 65 aggiungiPerche · tests/catalogo.test.js:209 (html), 210 (html), 211 (html) · tests/forza-carichi.test.js:179 (html) · tests/mesociclo.test.js:347 (html) · tests/partenza-donne.test.js:558 (html) · tests/split.test.js:311 catalogoConosce (html) · tests/browser/regole-nuove.js:46

### `js/coach/regia/soglie-regia.js`

- `SOGLIE_REGIA` js/coach/regia/soglie-regia.js:16 costante ← nessun altro file

### `js/coach/regia/perche.js`

- `SEPARATORE_PERCHE` js/coach/regia/perche.js:14 costante ← nessun altro file — nel file: testoPerche, fasePerche
- `SEPARATORE_ETICHETTA_PERCHE` js/coach/regia/perche.js:15 costante ← nessun altro file — nel file: testoPerche
- `ORDINE_FASE_PERCHE` js/coach/regia/perche.js:17 costante ← nessun altro file — nel file: (primo livello)
- `ETICHETTE_FORZA` js/coach/regia/perche.js:19 costante ← nessun altro file — nel file: etichettaForza
- `codiceInSquadra()` js/coach/regia/perche.js:26 funzione ← nessun altro file — nel file: sottoCoachDi
- `sottoCoachDi()` js/coach/regia/perche.js:37 funzione ← js/coach/catalogo-regole.js:284 COACH_REGOLE (html) · tests/catalogo.test.js:216 (html) — nel file: aggiungiPerche
- `nomeSottoCoach()` js/coach/regia/perche.js:47 funzione ← js/coach/catalogo-regole.js:284 COACH_REGOLE (html) · tests/catalogo.test.js:220 (html), 221 (html), 222 (html), 224 (html), 262 (html) — nel file: testoPerche
- `etichettaForza()` js/coach/regia/perche.js:54 funzione ← js/coach/catalogo-regole.js:284 COACH_REGOLE (html) · tests/soglie.test.js:116 (html), 119 (html)
- `aggiungiPerche()` js/coach/regia/perche.js:61 funzione ← js/coach/catalogo-regole.js:284 COACH_REGOLE (html) · js/coach/programma/mesociclo.js:221 pianoMesociclo, 308 controlloOttavaPrincipiante · js/coach/volume/tempo.js:628 adattaAlTempo, 725 validaTempo · js/coach/volume/tecniche.js:138 assegnaTecniche, 168 validaTecniche · js/coach/volume/rampa-settimana.js:66 rampaAlCarico · js/coach/specialita/forza.js:505 forzaNote · js/coach/specialita/forza-carichi.js:111 forzaTetto · js/coach/carichi/attrezzi.js:85 alTettoDeiManubri, 127 faseGrigliaETetto · js/coach/carichi/calibrazione.js:173 faseCalibrazione · js/coach/sicurezza/scarico.js:133 scaricoAlCarico · js/coach/sicurezza/popolazioni.js:223 fasePopolazioni · js/coach/regole-ricerca.js:579 caricoProgressione, 660 ricalcoloDalMassimale · js/coach/regole-nuove.js:78 regoleRicAlCarico · tests/catalogo.test.js:229 (html), 231 (html), 232 (html), 233 (html), 234 (html)
- `testoPerche()` js/coach/regia/perche.js:76 funzione ← js/coach/catalogo-regole.js:284 COACH_REGOLE (html) · tests/catalogo.test.js:236 (html), 237 (html), 238 (html), 239 (html) — nel file: fasePerche
- `fasePerche()` js/coach/regia/perche.js:92 funzione ← tests/catalogo.test.js:244 (html), 245 (html), 246 (html), 247 (html) — nel file: (primo livello)

### `js/coach/suggeritore.js`

- `suggestNextExercises()` js/coach/suggeritore.js:17 funzione ← js/coach/pannello.js:16 renderCoach

## js/core

### `js/core/stato-condiviso.js`

- `recoveryInterval` js/core/stato-condiviso.js:5 variabile ← js/ui/allenamento/timer-recupero.js:32 fineRecupero, 63 avviaTickRecupero · js/ui/allenamento/timer-pannello.js:34 closeRecoveryPanel, 47 adjustRecoveryTimer, 71
- `recoveryRemaining` js/core/stato-condiviso.js:6 variabile ← js/ui/allenamento/timer-recupero.js:9 updateRecoveryRing, 34 fineRecupero, 50 tickRecupero · js/ui/allenamento/timer-pannello.js:19 openRecoveryPanel, 36 closeRecoveryPanel, 60 adjustRecoveryTimer
- `recoveryTotal` js/core/stato-condiviso.js:7 variabile ← js/ui/allenamento/timer-recupero.js:9 updateRecoveryRing · js/ui/allenamento/timer-pannello.js:11 avvisaTelefonoRecupero, 17 openRecoveryPanel, 57 adjustRecoveryTimer
- `recoveryMuted` js/core/stato-condiviso.js:8 variabile ← js/ui/allenamento/timer-recupero.js:37 fineRecupero, 56 tickRecupero · js/ui/allenamento/timer-pannello.js:76 toggleRecoveryMute · js/ui/lavoro-cronometro.js:35 tickLavoro · js/avvio.js:15
- `RECOVERY_RING_CIRCUMFERENCE` js/core/stato-condiviso.js:9 costante ← js/ui/allenamento/timer-recupero.js:10 updateRecoveryRing
- `dropInterval` js/core/stato-condiviso.js:12 variabile ← js/ui/allenamento/timer-pannello.js:72 · js/ui/musica/lettore-fisso.js:120 ytStatoCambiato, 147 controllaAvvioMusica · js/ui/allenamento/cedimento.js:140 apriCedimento, 176 tickCedimento, 182 finishDropSet, 199 chiudiCedimento · tests/cedimento.test.js:96 stato
- `dropRemaining` js/core/stato-condiviso.js:13 variabile ← js/ui/allenamento/cedimento.js:118 updateDropTimerDisplay, 147 apriCedimento, 172 tickCedimento, 206 chiudiCedimento
- `dropActive` js/core/stato-condiviso.js:14 variabile ← js/ui/allenamento/cedimento.js:35, 36, 37, 55 avviaWebPronto, 122 updateFireModeState, 148 apriCedimento, … · js/ui/musica/mp3-locale.js:163 updateMp3SegmentLabel · js/ui/musica/player-web.js:179 loadYouTubePlayer, 266 loadSpotifyPlayer · tests/cedimento.test.js:96 stato
- `armedSet` js/core/stato-condiviso.js:15 variabile ← js/ui/piano/schede-pronte.js:65 applyTemplate · js/core/modalita.js:33 activateMode · js/core/navigazione.js:20 selectDay · js/ui/piano/giorno.js:37 openPlanDayScreen · js/ui/piano/selezione-multipla.js:54 deleteSelected, 70 clearDay, 123 moveExercise, 139 duplicateExercise, 246 deletePianoExercise · js/ui/allenamento/seduta.js:188 renderAllenamento, 256 removeSetFrom · js/ui/allenamento/macchinario-occupato.js:263 annullaCedimento · js/ui/allenamento/sessione.js:84 openWorkoutDay · js/ui/allenamento/cedimento.js:146 apriCedimento, 199 chiudiCedimento · js/ui/riposo-settimane.js:85 restoreWeek · js/ui/allenamento/termina-e-cardio.js:186 endWorkout · js/coach/programma/alternative.js:158 applyGeneratedProgram · tests/cedimento.test.js:96 stato
- `dropAudioAttivo` js/core/stato-condiviso.js:16 variabile ← js/core/musica-altre-app.js:79 preparaAudio, 94 playTone · js/ui/allenamento/cedimento.js:71 startDropAudio, 102 rilasciaAudioCedimento · tests/cedimento.test.js:96 stato
- `activeSourceTab` js/core/stato-condiviso.js:17 variabile ← js/ui/allenamento/cedimento-canzone.js:23 salvaMusica, 121 switchAudioSourceTab, 129 getResolvedAudioMode, 139 modoCanzone · tests/cedimento.test.js:270, 303
- `currentWebMode` js/core/stato-condiviso.js:18 variabile ← js/ui/allenamento/cedimento-canzone.js:27 salvaMusica, 73 ripristinaMusica, 82 clearCedimentoAudio, 130 getResolvedAudioMode · js/ui/musica/lettore-fisso.js:43 dockDaAprire, 49 dockStato, 108 aggiornaAvvisoDock, 144 controllaAvvioMusica · js/ui/allenamento/cedimento.js:58 avviaWebPronto · js/ui/musica/player-web.js:33 configureWebSegment, 61 previewWebSegment, 80 handleWebLinkSubmit
- `AUDIO_DB_NAME` js/core/stato-condiviso.js:21 costante ← js/ui/musica/mp3-locale.js:12 openAudioDB
- `AUDIO_DB_VERSION` js/core/stato-condiviso.js:22 costante ← js/ui/musica/mp3-locale.js:12 openAudioDB
- `AUDIO_STORE` js/core/stato-condiviso.js:23 costante ← js/ui/musica/mp3-locale.js:15 openAudioDB, 26 dbAddTrack, 35 dbGetAllTracks, 44 dbDeleteTrack
- `failureTracks` js/core/stato-condiviso.js:24 variabile ← js/ui/allenamento/cedimento-canzone.js:40 nomeMusica, 66 ripristinaMusica · js/ui/musica/mp3-locale.js:96 refreshFailureTracks, 104 renderFailureTracks, 123 selectTrack, 166 onMp3RangeInput · tests/cedimento.test.js:269, 302
- `selectedTrackId` js/core/stato-condiviso.js:25 variabile ← js/ui/allenamento/cedimento-canzone.js:24 salvaMusica, 66 ripristinaMusica, 81 clearCedimentoAudio, 129 getResolvedAudioMode · js/ui/musica/mp3-locale.js:115 renderFailureTracks, 125 selectTrack, 166 onMp3RangeInput, 176 deleteTrack
- `selectedTrackUrl` js/core/stato-condiviso.js:26 variabile ← js/ui/allenamento/cedimento-canzone.js:105 openMusicSheet · js/ui/allenamento/cedimento.js:79 startDropAudio · js/ui/musica/mp3-locale.js:126 selectTrack, 178 deleteTrack
- `ytPlayer` js/core/stato-condiviso.js:29 variabile ← js/ui/musica/lettore-fisso.js:124 ytStatoCambiato, 149 controllaAvvioMusica · js/ui/allenamento/cedimento.js:59 avviaWebPronto, 134 onDropVolumeInput · js/ui/musica/player-web.js:62 previewWebSegment, 95 liberaPlayerWeb, 107 playerWebCaricato, 157 loadYouTubePlayer, 203 readYouTubeDuration · tests/cedimento.test.js:347
- `ytPlayerReady` js/core/stato-condiviso.js:30 variabile ← js/ui/allenamento/cedimento.js:58 avviaWebPronto, 86 startDropAudio, 133 onDropVolumeInput · js/ui/musica/player-web.js:61 previewWebSegment, 99 liberaPlayerWeb, 142 loadYouTubePlayer · tests/cedimento.test.js:347
- `spotifyController` js/core/stato-condiviso.js:31 variabile ← js/ui/allenamento/cedimento.js:60 avviaWebPronto · js/ui/musica/player-web.js:64 previewWebSegment, 100 liberaPlayerWeb, 107 playerWebCaricato, 259 loadSpotifyPlayer
- `spotifyReady` js/core/stato-condiviso.js:32 variabile ← js/ui/allenamento/cedimento.js:86 startDropAudio · js/ui/musica/player-web.js:104 liberaPlayerWeb, 246 loadSpotifyPlayer
- `webDuration` js/core/stato-condiviso.js:33 variabile ← js/ui/musica/lettore-fisso.js:26 inizioSegmento · js/ui/musica/player-web.js:25 configureWebSegment, 40 updateWebSegmentLabel, 271 loadSpotifyPlayer

### `js/core/storage.js`

- `dataKey()` js/core/storage.js:7 funzione ← js/coach/questionario-decisioni.js:246 applicaDecisioni · js/coach/prontezza.js:72 prontezzaDiOggi · js/coach/repertorio.js:143 conAnnulla · tests/aiuto-app.js:107 caricaApp (html) · tests/carichi-golden.test.js:180 costruisciStato (html), 214 eseguiCaso (html) · tests/carichi-onda0.test.js:396 chiudiSeduta (html) · tests/conserva-progressi.test.js:30 riscritte (html), 275 (html) · tests/intensita-onda0.test.js:347 (html), 364 (html) · tests/migrazione-v1.test.js:142 (html), 145 (html), 156 (html), 176 (html) · tests/sicurezza-onda0.test.js:141 (html), 149 (html) — nel file: loadData, saveData, migrateLegacyDataIfNeeded
- `historyKey()` js/core/storage.js:8 funzione ← js/ui/storico.js:105 clearHistory · js/coach/volume/tempo.js:199 fattoreTempo · js/coach/programma/alternative.js:74 fissaFasiDelloStorico · js/coach/sicurezza/popolazioni.js:82 ricordaRientro · js/ui/importa-progressi.js:188 confermaImportProgressi, 210 confermaImport · tests/aiuto-app.js:104 caricaApp (html) · tests/carichi-onda0.test.js:455 (html) · tests/conserva-progressi.test.js:132 verifica (html), 229 (html), 257 (html), 275 (html), 322 (html) · tests/browser/senza-coach-ia.js:83 — nel file: loadHistory, saveHistory, migrateLegacyDataIfNeeded
- `titlesKey()` js/core/storage.js:9 funzione ← js/ui/guida-interattiva.js:74 guidaDatiDemo · tests/conserva-progressi.test.js:30 riscritte (html) — nel file: loadTitles, saveTitles
- `leggiJSON()` js/core/storage.js:13 funzione ← js/ui/riposo-settimane.js:7 loadRestDays, 37 loadWeeks · js/ui/allenamento/termina-e-cardio.js:42 cardioCorrente · js/ui/importa-progressi.js:15 eserciziPersonalizzati · js/ui/progressi/peso.js:11 pesiTutti, 101 registraPeso — nel file: loadTitles, loadData, loadHistory
- `loadTitles()` js/core/storage.js:22 funzione ← js/ui/piano/schede-pronte.js:58 applyTemplate, 78 renameDayTitle · js/ui/piano/aggiungi-allenamento.js:253 applicaAllaSettimana · js/ui/riposo-settimane.js:61 saveWeekSnapshot · js/coach/programma/alternative.js:91 applyGeneratedProgram · js/ui/seduta-libera.js:15 ripristinaSpeciale, 145 avviaSpeciale · js/ui/calendario/scambio.js:141 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13 — nel file: getDayTitle
- `saveTitles()` js/core/storage.js:23 funzione ← js/ui/piano/schede-pronte.js:61 applyTemplate, 82 renameDayTitle · js/ui/piano/aggiungi-allenamento.js:278 applicaAllaSettimana · js/ui/riposo-settimane.js:83 restoreWeek · js/coach/programma/alternative.js:99 applyGeneratedProgram · js/ui/seduta-libera.js:18 ripristinaSpeciale, 153 avviaSpeciale · js/ui/calendario/scambio.js:153 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/dettaglio-seduta.js:33 · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13 · tests/browser/senza-coach-ia.js:66
- `getDayTitle()` js/core/storage.js:24 funzione ← js/ui/piano/schede-pronte.js ×3 · js/core/navigazione.js ×2 · js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×8 · js/ui/piano/aggiungi-allenamento.js ×6 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/sessione.js ×5 · js/ui/riposo-settimane.js ×1 · js/ui/gruppi-muscolari.js ×1 · js/ui/figura-anatomica.js ×1 · js/ui/storico.js ×1 · js/ui/statistiche.js ×2 · js/coach/questionario-decisioni.js ×2 · js/ui/seduta-libera.js ×4 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/menu-settimana.js ×1 · js/ui/sessione-completata.js ×1
- `normalizeExerciseRecord()` js/core/storage.js:29 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/macchinario-occupato.js ×6 · js/ui/figura-anatomica.js ×1 · js/coach/programma/alternative.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×2 · js/coach/metodi-momenti.js ×2 · tests/cedimento.test.js ×1 · tests/forza-struttura.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-profilo.js ×1 · tests/browser/macchinario-occupato-tendina.js ×1 · tests/browser/macchinario-occupato.js ×1 · tests/browser/ripetizioni.js ×1 — nel file: loadData, seedDefaultsIfNeeded
- `loadData()` js/core/storage.js:66 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/oggi.js ×2 · js/ui/piano/giorno.js ×6 · js/ui/piano/aggiungi-allenamento.js ×7 · js/ui/piano/selezione-multipla.js ×16 · js/ui/allenamento/seduta.js ×12 · js/ui/allenamento/macchinario-occupato.js ×10 · js/ui/allenamento/sessione.js ×2 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×5 · js/ui/figura-anatomica.js ×4 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/volume/tempo.js ×1 · js/coach/volume/rampa-settimana.js ×1 · js/coach/specialita/forza-carichi.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/carichi/calibrazione.js ×1 · js/coach/questionario-decisioni.js ×3 · js/coach/prontezza.js ×2 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×1 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×8 · js/ui/lavoro-cronometro.js ×2 · js/ui/progressi/riepilogo.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/calendario/scambio.js ×1 · js/ui/calendario/copia-settimana.js ×2 · js/ui/sessione-completata.js ×1 · tests/aiuto-app.js ×1 · tests/aiuto-atleta-piano.js ×2 · tests/carichi-golden.test.js ×1 · tests/cedimento.test.js ×3 · tests/forza-attivazione.test.js ×1 · tests/forza-struttura.test.js ×1 · tests/integrazione-3a.test.js ×9 · tests/partenza-donne.test.js ×1 · tests/piano-in-seduta.test.js ×1 · tests/popolazioni.test.js ×1 · tests/scarichi.test.js ×1 · tests/tempo.test.js ×1 · tests/browser/carichi-evoluzione.js ×2 · tests/browser/elenco-esercizi.js ×2 · tests/browser/gravidanza.js ×4 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-tendina.js ×11 · tests/browser/macchinario-occupato.js ×12 · tests/browser/metodi-epoca-oro.js ×2 · tests/browser/regole-nuove.js ×3 · tests/browser/ripetizioni.js ×2 · tests/browser/sicurezza.js ×1 — nel file: seedDefaultsIfNeeded
- `saveData()` js/core/storage.js:75 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/piano/selezione-multipla.js ×12 · js/ui/allenamento/seduta.js ×10 · js/ui/allenamento/macchinario-occupato.js ×9 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×1 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×3 · js/coach/regole-ricerca.js ×1 · js/coach/regole-nuove.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×6 · js/coach/metodi-momenti.js ×2 · js/ui/calendario/scambio.js ×2 · tests/cedimento.test.js ×1 · tests/forza-struttura.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/gravidanza.js ×2 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-tendina.js ×2 · tests/browser/macchinario-occupato.js ×2 · tests/browser/metodi-epoca-oro.js ×3 · tests/browser/regole-nuove.js ×2 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×1 — nel file: seedDefaultsIfNeeded
- `normalizeHistoryEntry()` js/core/storage.js:77 funzione ← nessun altro file — nel file: loadHistory
- `loadHistory()` js/core/storage.js:109 funzione ← js/ui/oggi.js ×3 · js/ui/allenamento/seduta.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×2 · js/coach/programma/mesociclo.js ×2 · js/coach/volume/tempo.js ×1 · js/coach/specialita/forza-carichi.js ×1 · js/ui/statistiche.js ×1 · js/coach/carichi/progressivo.js ×1 · js/coach/carichi/partenza.js ×1 · js/coach/sicurezza/scarico.js ×4 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×5 · js/coach/regole-ricerca.js ×2 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×3 · js/ui/progressi/pagine.js ×1 · js/ui/calendario/gruppi.js ×1 · js/ui/sessione-completata.js ×2 · tests/carichi-onda0.test.js ×8 · tests/conserva-progressi.test.js ×1 · tests/migrazione-v1.test.js ×6 · tests/senza-coach-ia.test.js ×7 · tests/browser/macchinario-occupato.js ×1 · tests/browser/senza-coach-ia.js ×2 · tests/browser/statistiche.js ×1
- `saveHistory()` js/core/storage.js:113 funzione ← js/ui/allenamento/termina-e-cardio.js:167 endWorkout · js/coach/questionario-decisioni.js:314 inviaQuestionario · js/ui/guida-interattiva.js:97 guidaDatiDemo · js/ui/importa-progressi.js:192 confermaImportProgressi, 213 confermaImport · tests/carichi-onda0.test.js:450 (html) · tests/senza-coach-ia.test.js:99 (html) · tests/browser/carichi-evoluzione.js:32, 34, 38, 40, 43, 47, … · tests/browser/dettaglio-seduta.js:34 · tests/browser/intensita-bia.js:42, 44, 50, 55, 97, 107, … · tests/browser/regole-nuove.js:18, 24, 25, 28, 29, 31, … · tests/browser/senza-coach-ia.js:67
- `migrateLegacyDataIfNeeded()` js/core/storage.js:115 funzione ← js/core/modalita.js:29 activateMode
- `CHIAVI_COACH_IA_RIMOSSO` js/core/storage.js:130 costante ← nessun altro file — nel file: ripulisciChiaviCoachIA
- `ripulisciChiaviCoachIA()` js/core/storage.js:131 funzione ← nessun altro file — nel file: (primo livello)
- `seedDefaultsIfNeeded()` js/core/storage.js:138 funzione ← js/core/modalita.js:30 activateMode

## js/ui

### `js/ui/piano/schede-pronte.js`

- `openTemplatePicker()` js/ui/piano/schede-pronte.js:7 funzione window ← index.html:150 (html) · tests/integrazione-onda2b.test.js:163 (html)
- `closeTemplatePicker()` js/ui/piano/schede-pronte.js:37 funzione window ← index.html:788 (html) — nel file: applyTemplate
- `applyTemplate()` js/ui/piano/schede-pronte.js:41 funzione window ← js/ui/figura-anatomica.js:285 renderGruppi (html), 324 applyTemplateFromGroups · tests/browser/metodi-epoca-oro.js:79, 82 — nel file: openTemplatePicker
- `renameDayTitle()` js/ui/piano/schede-pronte.js:74 funzione window ← index.html:94 (html)

## js/core

### `js/core/modalita.js`

- `getStoredMode()` js/core/modalita.js:7 funzione ← js/avvio.js:18
- `chooseMode()` js/core/modalita.js:9 funzione window ← js/avvio.js:18 · tests/avvio.test.js:18
- `activateMode()` js/core/modalita.js:23 funzione ← js/core/backup.js:62 ricaricaApp · js/coach/psicologia.js:290 switchProtocol — nel file: chooseMode

### `js/core/navigazione.js`

- `daysContainer` js/core/navigazione.js:7 costante ← nessun altro file — nel file: renderDayBar
- `renderDayBar()` js/core/navigazione.js:9 funzione ← js/ui/piano/schede-pronte.js:67 applyTemplate, 83 renameDayTitle · js/core/modalita.js:36 activateMode · js/ui/piano/giorno.js:43 openPlanDayScreen · js/ui/allenamento/sessione.js:94 openWorkoutDay · js/ui/riposo-settimane.js:86 restoreWeek · js/coach/programma/alternative.js:161 applyGeneratedProgram — nel file: selectDay
- `selectDay()` js/core/navigazione.js:17 funzione window ← nessun altro file — nel file: renderDayBar

## js/ui

### `js/ui/oggi.js`

- `CATEGORIE` js/ui/oggi.js:11 costante ← nessun altro file — nel file: categoriaDi, obiettiviSettimana, renderOggi
- `categoriaDi()` js/ui/oggi.js:17 funzione ← tests/integrazione-3a.test.js:115 (html), 137 (html) — nel file: obiettiviSettimana
- `stimaSeduta()` js/ui/oggi.js:27 funzione ← tests/integrazione-3a.test.js:107 (html), 133 (html) — nel file: renderOggi
- `obiettiviSettimana()` js/ui/oggi.js:42 funzione window ← tests/integrazione-3a.test.js:103 (html), 136 (html) — nel file: renderOggi
- `settimaneDiFila()` js/ui/oggi.js:69 funzione window ← js/ui/storico.js:86 renderProgressiTop — nel file: renderOggi
- `renderOggi()` js/ui/oggi.js:78 funzione window ← js/coach/programma/mesociclo.js:318 controlloOttavaPrincipiante · js/coach/repertorio.js:425 sceltaSaltata, 466 rispostaAderenza, 557 nuovoCiclo · js/coach/dolore-mattina.js:38 rispostaDolore · js/coach/metodi-momenti.js:197 terminaMomento, 204 verificaMomento, 213 fineMomento · js/ui/calendario/scambio.js:134 aggiornaDopoScambio — nel file: switchTab
- `iniziaOggi()` js/ui/oggi.js:179 funzione window ← nessun altro file — nel file: renderOggi
- `switchTab()` js/ui/oggi.js:185 funzione window ← js/core/modalita.js ×1 · js/ui/piano/selezione-multipla.js ×1 · js/ui/riposo-settimane.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/agente-consigli.js ×1 · js/coach/bia/opzioni.js ×2 · js/ui/guida-interattiva.js ×1 · js/ui/opzioni/impostazioni.js ×2 · js/core/backup.js ×1 · js/ui/seduta-libera.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/coach/psicologia.js ×1 · index.html ×5 · tests/cedimento.test.js ×1 · tests/browser/dettaglio-seduta.js ×1 · tests/browser/elenco-esercizi.js ×2 · tests/browser/guida-tocchi.js ×4 · tests/browser/metodi-epoca-oro.js ×1 · tests/browser/senza-coach-ia.js ×2 · tests/browser/sicurezza.js ×2 · tests/browser/statistiche.js ×1 — nel file: renderOggi, iniziaOggi

## js/core

### `js/core/utility.js`

- `escapeHtml()` js/core/utility.js:7 funzione ← js/dati/libreria-esercizi.js ×2 · js/ui/piano/schede-pronte.js ×3 · js/ui/oggi.js ×6 · js/ui/piano/giorno.js ×7 · js/ui/piano/aggiungi-allenamento.js ×9 · js/ui/allenamento/seduta.js ×9 · js/ui/allenamento/macchinario-occupato.js ×14 · js/ui/allenamento/sessione.js ×3 · js/ui/musica/mp3-locale.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/ui/elenco-esercizi.js ×3 · js/ui/figura-anatomica.js ×3 · js/coach/pannello.js ×2 · js/ui/storico.js ×2 · js/ui/onboarding-risultato.js ×5 · js/coach/programma/alternative.js ×7 · js/ui/statistiche.js ×8 · js/ui/statistiche-grafico.js ×1 · js/coach/sicurezza/scarico.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/repertorio.js ×3 · js/coach/agente-consigli.js ×7 · js/ui/opzioni/il-coach.js ×2 · js/ui/importa-csv.js ×4 · js/ui/importa-progressi.js ×4 · js/ui/seduta-libera.js ×7 · js/ui/progressi/riepilogo.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/compone.js ×1 · js/coach/psicologia.js ×10 · js/dati/disegni-esercizi.js ×2 · js/dati/schede-tecniche.js ×16 · js/ui/menu-settimana.js ×4 · js/ui/sessione-completata.js ×3 — nel file: jsArg
- `nomeSicuro()` js/core/utility.js:12 funzione ← js/ui/importa-csv.js:158 nomeDaEstero, 205 sedutaImportata · js/ui/importa-progressi.js:195 confermaImportProgressi
- `pulisciDeep()` js/core/utility.js:16 funzione ← js/core/backup.js:14 valorePulito
- `jsArg()` js/core/utility.js:28 funzione ← js/ui/piano/giorno.js:113 renderDayView · js/ui/piano/aggiungi-allenamento.js:159 renderAddWeek, 426 renderPiano · js/ui/allenamento/seduta.js:172 renderAllenamento · js/ui/gruppi-muscolari.js:99 renderSuggested, 159 renderSheetExercises · js/coach/pannello.js:37 renderCoach · js/dati/schede-tecniche.js:195 htmlDettaglioScheda
- `formatMMSS()` js/core/utility.js:29 funzione ← js/ui/allenamento/seduta.js:138 avviaTempoSeduta · js/ui/allenamento/timer-recupero.js:13 updateRecoveryRing · js/ui/allenamento/cedimento.js:118 updateDropTimerDisplay · js/ui/musica/mp3-locale.js:112 renderFailureTracks, 160 updateMp3SegmentLabel · js/ui/musica/player-web.js:45 updateWebSegmentLabel, 207 readYouTubeDuration
- `formatNow()` js/core/utility.js:35 funzione ← js/ui/riposo-settimane.js:60 saveWeekSnapshot · js/ui/allenamento/termina-e-cardio.js:117 endWorkout · js/coach/programma/alternative.js:122 applyGeneratedProgram · js/ui/guida-interattiva.js:338 setConsenso · tests/aiuto-app.js:110 caricaApp (html) · tests/aiuto-atleta-piano.js:88 vivi (html) · tests/aiuto-atleta.js:202 simulaNellApp (html) · tests/partenza-donne.test.js:325 scenario (html) · tests/browser/carichi-evoluzione.js:28, 68 · tests/browser/intensita-bia.js:40, 95, 115 · tests/browser/regole-nuove.js:13
- `handleSelectExercise()` js/core/utility.js:39 funzione ← index.html:565 (html)
- `audioCtx` js/core/utility.js:49 variabile ← nessun altro file — nel file: getAudioCtx, sospendiAudioCtx
- `getAudioCtx()` js/core/utility.js:51 funzione ← js/core/musica-altre-app.js:82 preparaAudio, 95 playTone, 115 testSound
- `sospendiAudioCtx()` js/core/utility.js:63 funzione ← js/core/musica-altre-app.js:88 sospendiAudioDopo · js/ui/allenamento/cedimento.js:104 rilasciaAudioCedimento

### `js/core/audio-silenzioso.js`

- `SILENZIO_WAV` js/core/audio-silenzioso.js:15 costante ← js/core/musica-altre-app.js:34 avviaCanaleMultimediale
- `mediaKeeper` js/core/audio-silenzioso.js:16 variabile ← js/core/musica-altre-app.js:32 avviaCanaleMultimediale, 48 fermaCanaleMultimediale · tests/cedimento.test.js:315

### `js/core/musica-altre-app.js`

- `tipoSessione()` js/core/musica-altre-app.js:20 funzione ← js/ui/allenamento/cedimento.js:25 sessioneCanzoneAttiva, 36, 37, 114 rilasciaAudioCedimento — nel file: (primo livello), avviaCanaleMultimediale, fermaCanaleMultimediale, preparaAudio, playTone
- `avviaCanaleMultimediale()` js/core/musica-altre-app.js:28 funzione ← js/ui/allenamento/cedimento.js:73 startDropAudio
- `fermaCanaleMultimediale()` js/core/musica-altre-app.js:47 funzione ← js/ui/allenamento/cedimento.js:113 rilasciaAudioCedimento
- `lampeggia()` js/core/musica-altre-app.js:60 funzione window ← js/ui/allenamento/timer-recupero.js:39 fineRecupero — nel file: testSound
- `preparaAudio()` js/core/musica-altre-app.js:78 funzione window ← js/ui/allenamento/timer-pannello.js:16 openRecoveryPanel, 56 adjustRecoveryTimer · js/ui/lavoro-cronometro.js:20 avviaLavoro
- `sospendiAudioT` js/core/musica-altre-app.js:85 variabile ← nessun altro file — nel file: sospendiAudioDopo
- `sospendiAudioDopo()` js/core/musica-altre-app.js:86 funzione ← nessun altro file — nel file: preparaAudio, playTone
- `playTone()` js/core/musica-altre-app.js:91 funzione ← nessun altro file — nel file: playBeep, playTick, playEnd
- `playBeep()` js/core/musica-altre-app.js:111 funzione ← js/ui/lavoro-cronometro.js:44 tickLavoro
- `testSound()` js/core/musica-altre-app.js:114 funzione window ← js/coach/psicologia.js:236 renderSetPage (html)
- `playTick()` js/core/musica-altre-app.js:124 funzione ← js/ui/allenamento/timer-recupero.js:56 tickRecupero · js/ui/lavoro-cronometro.js:39 tickLavoro — nel file: testSound
- `playEnd()` js/core/musica-altre-app.js:125 funzione ← js/ui/allenamento/timer-recupero.js:37 fineRecupero · js/ui/lavoro-cronometro.js:49 tickLavoro — nel file: testSound
- `stepValue()` js/core/musica-altre-app.js:126 funzione window ← index.html:575 (html), 577 (html), 583 (html), 585 (html), 591 (html), 593 (html), …

## js/ui

### `js/ui/piano/giorno.js`

- `syncBuildingLine()` js/ui/piano/giorno.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:375 renderPiano · js/ui/figura-anatomica.js:208 renderGruppi
- `backToPlanDays()` js/ui/piano/giorno.js:17 funzione window ← js/ui/oggi.js:196 switchTab · index.html:89 (html)
- `openPlanDayScreen()` js/ui/piano/giorno.js:29 funzione window ← js/ui/piano/aggiungi-allenamento.js:340 renderWeekOverview (html), 354 openPlanDay · js/ui/calendario/scambio.js:165 planDayClick — nel file: renderPlanMapList, aggiungiPerGruppo
- `planEditMode` js/ui/piano/giorno.js:49 variabile ← js/ui/piano/aggiungi-allenamento.js:366 renderPiano — nel file: backToPlanDays, openPlanDayScreen, applicaModalitaGiorno, enterPlanEdit, exitPlanEdit
- `applicaModalitaGiorno()` js/ui/piano/giorno.js:51 funzione ← nessun altro file — nel file: openPlanDayScreen, enterPlanEdit, exitPlanEdit
- `enterPlanEdit()` js/ui/piano/giorno.js:58 funzione window ← index.html:109 (html)
- `exitPlanEdit()` js/ui/piano/giorno.js:66 funzione window ← index.html:117 (html)
- `renderDayView()` js/ui/piano/giorno.js:82 funzione ← js/ui/piano/aggiungi-allenamento.js:366 renderPiano — nel file: applicaModalitaGiorno
- `aggiornaIngressoAgente()` js/ui/piano/giorno.js:118 funzione ← nessun altro file — nel file: renderPlanDayPicker
- `planMapGruppo` js/ui/piano/giorno.js:130 variabile ← js/ui/guida-interattiva.js:29 GUIDA — nel file: renderPlanMap, planMapSelect, renderPlanMapList
- `renderPlanMap()` js/ui/piano/giorno.js:131 funzione ← nessun altro file — nel file: planMapSelect, renderPlanDayPicker
- `planMapSelect()` js/ui/piano/giorno.js:164 funzione window ← nessun altro file — nel file: renderPlanMap
- `toccaTesta()` js/ui/piano/giorno.js:170 funzione window ← nessun altro file — nel file: renderPlanMap
- `renderPlanMapList()` js/ui/piano/giorno.js:175 funzione ← nessun altro file — nel file: renderPlanMap
- `aggiungiPerGruppo()` js/ui/piano/giorno.js:195 funzione window ← nessun altro file — nel file: renderPlanMapList
- `renderPlanDayPicker()` js/ui/piano/giorno.js:200 funzione ← js/ui/piano/aggiungi-allenamento.js:283 applicaAllaSettimana, 365 renderPiano · js/ui/calendario/scambio.js:133 aggiornaDopoScambio — nel file: backToPlanDays, exitPlanEdit
- `openAddEx()` js/ui/piano/giorno.js:250 funzione window ← index.html:155 (html)
- `closeAddEx()` js/ui/piano/giorno.js:255 funzione window ← index.html:542 (html)
- `openReco()` js/ui/piano/giorno.js:259 funzione window ← index.html:163 (html)
- `closeReco()` js/ui/piano/giorno.js:267 funzione window ← index.html:620 (html)

### `js/ui/piano/aggiungi-allenamento.js`

- `awStep` js/ui/piano/aggiungi-allenamento.js:10 variabile ← tests/browser/elenco-esercizi.js:44 — nel file: openAddWeek, awBack, awChoosePath, awNext, renderAddWeek
- `awSource` js/ui/piano/aggiungi-allenamento.js:11 variabile ← nessun altro file — nel file: openAddWeek, awBack, awChoosePath, awToggleCustom, awPickSource, awNext, renderAddWeek, applicaAllaSettimana
- `awDays` js/ui/piano/aggiungi-allenamento.js:12 variabile ← nessun altro file — nel file: openAddWeek, awToggleDay, awQuick, awNext, renderAddWeek, applicaAllaSettimana
- `awMode` js/ui/piano/aggiungi-allenamento.js:13 variabile ← nessun altro file — nel file: openAddWeek, awSetMode, renderAddWeek, applicaAllaSettimana
- `awEsercizi()` js/ui/piano/aggiungi-allenamento.js:15 funzione ← nessun altro file — nel file: renderAddWeek, applicaAllaSettimana
- `awNome()` js/ui/piano/aggiungi-allenamento.js:30 funzione ← nessun altro file — nel file: renderAddWeek, applicaAllaSettimana
- `awPath` js/ui/piano/aggiungi-allenamento.js:42 variabile ← tests/browser/elenco-esercizi.js:44 — nel file: openAddWeek, awChoosePath, renderAddWeek
- `awGroups` js/ui/piano/aggiungi-allenamento.js:43 variabile ← tests/browser/elenco-esercizi.js:44 — nel file: awNome, openAddWeek, awToggleGroup, renderAddWeek
- `awCustom` js/ui/piano/aggiungi-allenamento.js:44 variabile ← nessun altro file — nel file: awEsercizi, openAddWeek, awToggleCustom, renderAddWeek
- `openAddWeek()` js/ui/piano/aggiungi-allenamento.js:46 funzione window ← index.html:76 (html) · tests/browser/elenco-esercizi.js:44
- `closeAddWeek()` js/ui/piano/aggiungi-allenamento.js:54 funzione window ← nessun altro file — nel file: awBack, applicaAllaSettimana
- `awBack()` js/ui/piano/aggiungi-allenamento.js:58 funzione window ← index.html:651 (html)
- `awChoosePath()` js/ui/piano/aggiungi-allenamento.js:65 funzione window ← nessun altro file — nel file: renderAddWeek
- `awToggleGroup()` js/ui/piano/aggiungi-allenamento.js:72 funzione window ← nessun altro file — nel file: renderAddWeek
- `awToggleCustom()` js/ui/piano/aggiungi-allenamento.js:78 funzione window ← nessun altro file — nel file: renderAddWeek
- `awPickSource()` js/ui/piano/aggiungi-allenamento.js:85 funzione window ← nessun altro file — nel file: renderAddWeek
- `awToggleDay()` js/ui/piano/aggiungi-allenamento.js:90 funzione window ← nessun altro file — nel file: renderAddWeek
- `awQuick()` js/ui/piano/aggiungi-allenamento.js:96 funzione window ← nessun altro file — nel file: renderAddWeek
- `awSetMode()` js/ui/piano/aggiungi-allenamento.js:103 funzione window ← nessun altro file — nel file: renderAddWeek
- `awNext()` js/ui/piano/aggiungi-allenamento.js:105 funzione window ← index.html:659 (html)
- `renderAddWeek()` js/ui/piano/aggiungi-allenamento.js:119 funzione ← tests/browser/elenco-esercizi.js:44 — nel file: openAddWeek, awBack, awChoosePath, awToggleGroup, awToggleCustom, awPickSource, awToggleDay, awQuick, …
- `applicaAllaSettimana()` js/ui/piano/aggiungi-allenamento.js:251 funzione ← nessun altro file — nel file: awNext
- `openWeekSheet()` js/ui/piano/aggiungi-allenamento.js:299 funzione window ← index.html:80 (html)
- `closeWeekSheet()` js/ui/piano/aggiungi-allenamento.js:309 funzione window ← js/ui/piano/giorno.js:30 openPlanDayScreen · index.html:676 (html)
- `renderWeekOverview()` js/ui/piano/aggiungi-allenamento.js:316 funzione ← js/ui/calendario/scambio.js:133 aggiornaDopoScambio — nel file: applicaAllaSettimana, openWeekSheet, renderPiano
- `openPlanDay()` js/ui/piano/aggiungi-allenamento.js:353 funzione window ← nessun altro file
- `renderPiano()` js/ui/piano/aggiungi-allenamento.js:357 funzione ← js/ui/piano/schede-pronte.js ×1 · js/core/modalita.js ×1 · js/core/navigazione.js ×1 · js/ui/piano/giorno.js ×5 · js/ui/piano/selezione-multipla.js ×15 · js/ui/allenamento/seduta.js ×3 · js/ui/allenamento/macchinario-occupato.js ×3 · js/ui/allenamento/sessione.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×3 · js/ui/figura-anatomica.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×4 · js/coach/repertorio.js ×2 · js/ui/seduta-libera.js ×1

### `js/ui/piano/selezione-multipla.js`

- `selectMode` js/ui/piano/selezione-multipla.js:9 variabile ← js/ui/piano/aggiungi-allenamento.js:437 renderPiano — nel file: toggleSelectMode
- `selectedIdx` js/ui/piano/selezione-multipla.js:10 variabile ← js/ui/piano/aggiungi-allenamento.js:406 renderPiano — nel file: toggleSelectMode, togglePick, selectAllPlan, syncBulkBar, deleteSelected
- `toggleSelectMode()` js/ui/piano/selezione-multipla.js:12 funzione window ← js/ui/piano/giorno.js:24 backToPlanDays, 68 exitPlanEdit · index.html:131 (html)
- `togglePick()` js/ui/piano/selezione-multipla.js:23 funzione window ← js/ui/piano/aggiungi-allenamento.js:408 renderPiano (html)
- `selectAllPlan()` js/ui/piano/selezione-multipla.js:30 funzione window ← index.html:137 (html)
- `syncBulkBar()` js/ui/piano/selezione-multipla.js:36 funzione ← js/ui/piano/aggiungi-allenamento.js:386 renderPiano
- `deleteSelected()` js/ui/piano/selezione-multipla.js:46 funzione window ← index.html:138 (html)
- `clearDay()` js/ui/piano/selezione-multipla.js:64 funzione window ← index.html:145 (html)
- `copyDayTo()` js/ui/piano/selezione-multipla.js:81 funzione window ← index.html:144 (html)
- `toggleReorderMode()` js/ui/piano/selezione-multipla.js:110 funzione window ← js/ui/piano/giorno.js:25 backToPlanDays, 69 exitPlanEdit · index.html:132 (html) — nel file: toggleSelectMode, startWorkoutFromPlan
- `moveExercise()` js/ui/piano/selezione-multipla.js:116 funzione window ← js/ui/piano/aggiungi-allenamento.js:408 renderPiano (html)
- `duplicateExercise()` js/ui/piano/selezione-multipla.js:128 funzione window ← js/ui/piano/aggiungi-allenamento.js:427 renderPiano (html)
- `toggleSuperset()` js/ui/piano/selezione-multipla.js:145 funzione window ← js/ui/piano/aggiungi-allenamento.js:426 renderPiano (html)
- `startWorkoutFromPlan()` js/ui/piano/selezione-multipla.js:159 funzione window ← index.html:110 (html), 151 (html)
- `editingExerciseIdx` js/ui/piano/selezione-multipla.js:171 variabile ← nessun altro file — nel file: (primo livello), startEditExercise, cancelEditExercise, deletePianoExercise
- `planDayOpen` js/ui/piano/selezione-multipla.js:172 variabile ← js/core/navigazione.js:19 selectDay · js/ui/piano/giorno.js:36 openPlanDayScreen · js/ui/piano/aggiungi-allenamento.js:397 renderPiano
- `toggleManualForm()` js/ui/piano/selezione-multipla.js:202 funzione window ← js/ui/piano/giorno.js:71 exitPlanEdit · index.html:562 (html) — nel file: startEditExercise
- `startEditExercise()` js/ui/piano/selezione-multipla.js:211 funzione window ← js/ui/piano/aggiungi-allenamento.js:428 renderPiano (html)
- `cancelEditExercise()` js/ui/piano/selezione-multipla.js:227 funzione window ← index.html:610 (html) — nel file: (primo livello), deletePianoExercise
- `deletePianoExercise()` js/ui/piano/selezione-multipla.js:240 funzione window ← js/ui/piano/aggiungi-allenamento.js:429 renderPiano (html)

### `js/ui/allenamento/seduta.js`

- `RPE_VALORI` js/ui/allenamento/seduta.js:16 costante ← nessun altro file — nel file: renderAllenamento
- `ultimaVoltaTesto()` js/ui/allenamento/seduta.js:18 funzione ← nessun altro file — nel file: renderAllenamento
- `migliorUnoRM()` js/ui/allenamento/seduta.js:26 funzione ← nessun altro file — nel file: controllaRecord
- `controllaRecord()` js/ui/allenamento/seduta.js:36 funzione ← js/ui/allenamento/macchinario-occupato.js:234 toggleSetDone
- `updateSetRpe()` js/ui/allenamento/seduta.js:46 funzione window ← nessun altro file — nel file: renderAllenamento
- `addWarmup()` js/ui/allenamento/seduta.js:55 funzione window ← nessun altro file — nel file: renderAllenamento
- `removeWarmup()` js/ui/allenamento/seduta.js:66 funzione window ← nessun altro file — nel file: renderAllenamento
- `updateWarmup()` js/ui/allenamento/seduta.js:73 funzione window ← nessun altro file — nel file: renderAllenamento
- `toggleWarmup()` js/ui/allenamento/seduta.js:80 funzione window ← nessun altro file — nel file: renderAllenamento
- `DISCHI` js/ui/allenamento/seduta.js:90 costante ← nessun altro file — nel file: dischiPerLato
- `COLORE_DISCO` js/ui/allenamento/seduta.js:91 costante ← nessun altro file — nel file: renderPlates
- `dischiPerLato()` js/ui/allenamento/seduta.js:93 funzione window ← nessun altro file — nel file: renderPlates
- `dischiBil` js/ui/allenamento/seduta.js:101 variabile ← nessun altro file — nel file: setBilanciere, renderPlates
- `openPlates()` js/ui/allenamento/seduta.js:102 funzione window ← nessun altro file — nel file: renderAllenamento
- `closePlates()` js/ui/allenamento/seduta.js:110 funzione window ← index.html:314 (html), 318 (html)
- `setBilanciere()` js/ui/allenamento/seduta.js:111 funzione window ← index.html:324 (html), 325 (html), 326 (html)
- `renderPlates()` js/ui/allenamento/seduta.js:112 funzione window ← index.html:321 (html) — nel file: openPlates, setBilanciere
- `sedutaTimer` js/ui/allenamento/seduta.js:127 variabile ← nessun altro file — nel file: avviaTempoSeduta, fermaTempoSeduta
- `avviaTempoSeduta()` js/ui/allenamento/seduta.js:128 funzione ← js/ui/allenamento/sessione.js:88 openWorkoutDay
- `fermaTempoSeduta()` js/ui/allenamento/seduta.js:143 funzione ← js/ui/allenamento/sessione.js:11 backToDayPicker · js/ui/allenamento/termina-e-cardio.js:170 endWorkout · js/ui/guida-interattiva.js:268 chiudiGuida · js/ui/seduta-libera.js:23 annullaSpeciale
- `renderAllenamento()` js/ui/allenamento/seduta.js:149 funzione ← js/ui/piano/schede-pronte.js ×1 · js/core/modalita.js ×1 · js/core/navigazione.js ×1 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/piano/selezione-multipla.js ×12 · js/ui/allenamento/macchinario-occupato.js ×7 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/cedimento.js ×2 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/prontezza.js ×3 · js/coach/repertorio.js ×2 · js/coach/regole-nuove.js ×2 · js/ui/opzioni/impostazioni.js ×1 · js/ui/seduta-libera.js ×3 · js/ui/lavoro-cronometro.js ×3 · js/ui/calendario/scambio.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-tendina.js ×3 · tests/browser/macchinario-occupato.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×2 — nel file: addWarmup, removeWarmup, toggleWarmup, addSetTo, removeSetFrom, toggleSkipExercise
- `addSetTo()` js/ui/allenamento/seduta.js:232 funzione window ← nessun altro file — nel file: renderAllenamento
- `removeSetFrom()` js/ui/allenamento/seduta.js:249 funzione window ← nessun altro file — nel file: renderAllenamento
- `toggleSkipExercise()` js/ui/allenamento/seduta.js:270 funzione window ← nessun altro file — nel file: renderAllenamento

### `js/ui/allenamento/macchinario-occupato.js`

- `ETICHETTA_ATTREZZO` js/ui/allenamento/macchinario-occupato.js:12 costante ← nessun altro file — nel file: htmlOccupato
- `ICONA_SCAMBIO` js/ui/allenamento/macchinario-occupato.js:13 costante ← nessun altro file — nel file: htmlSostituito, htmlOccupato
- `ICONA_FRECCIA_GIU` js/ui/allenamento/macchinario-occupato.js:14 costante ← nessun altro file — nel file: htmlOccupato
- `occupatoAperto` js/ui/allenamento/macchinario-occupato.js:15 variabile ← tests/browser/macchinario-occupato-tendina.js:133 — nel file: impostaOccupato, fuoriOccupato, tastoOccupato, htmlOccupato, toggleOccupato
- `occupatoOpzioni` js/ui/allenamento/macchinario-occupato.js:16 variabile ← tests/browser/carichi-evoluzione.js:85 — nel file: htmlOccupato, sostituisciOggi
- `occupatoAscolto` js/ui/allenamento/macchinario-occupato.js:17 variabile ← nessun altro file — nel file: impostaOccupato
- `impostaOccupato()` js/ui/allenamento/macchinario-occupato.js:23 funzione ← js/ui/allenamento/sessione.js:85 openWorkoutDay · js/ui/allenamento/termina-e-cardio.js:174 endWorkout · tests/browser/macchinario-occupato-tendina.js:130, 131 (html) — nel file: chiudiOccupato, fuoriOccupato, tastoOccupato, toggleOccupato, dopoSceltaOccupato
- `triggerOccupato()` js/ui/allenamento/macchinario-occupato.js:32 funzione ← nessun altro file — nel file: chiudiOccupato, fuoriOccupato, tastoOccupato
- `chiudiOccupato()` js/ui/allenamento/macchinario-occupato.js:33 funzione ← nessun altro file — nel file: fuoriOccupato, tastoOccupato, toggleOccupato
- `fuoriOccupato()` js/ui/allenamento/macchinario-occupato.js:39 funzione ← nessun altro file — nel file: impostaOccupato
- `tastoOccupato()` js/ui/allenamento/macchinario-occupato.js:46 funzione ← nessun altro file — nel file: impostaOccupato
- `prefsOccupato()` js/ui/allenamento/macchinario-occupato.js:63 funzione ← tests/split.test.js:172 (html) — nel file: alternativeOggi
- `alternativeOggi()` js/ui/allenamento/macchinario-occupato.js:72 funzione ← tests/browser/macchinario-occupato-profilo.js:13 · tests/browser/macchinario-occupato-tendina.js:122 · tests/browser/macchinario-occupato.js:22, 70 — nel file: htmlOccupato
- `copiaRecord()` js/ui/allenamento/macchinario-occupato.js:77 funzione ← nessun altro file — nel file: sostituisciOggi, ripristinaOriginale, ripristinaSostituzioni, pulisciSostituzioniVecchie
- `htmlSostituito()` js/ui/allenamento/macchinario-occupato.js:80 funzione ← js/ui/allenamento/seduta.js:165 renderAllenamento
- `htmlOccupato()` js/ui/allenamento/macchinario-occupato.js:87 funzione ← js/ui/allenamento/seduta.js:208 renderAllenamento
- `tastoApriOccupato()` js/ui/allenamento/macchinario-occupato.js:115 funzione window ← nessun altro file — nel file: htmlOccupato
- `toggleOccupato()` js/ui/allenamento/macchinario-occupato.js:122 funzione window ← tests/browser/macchinario-occupato.js:40, 42, 47, 52, 64, 74 — nel file: htmlOccupato, tastoApriOccupato
- `posizionaOccupato()` js/ui/allenamento/macchinario-occupato.js:137 funzione ← nessun altro file — nel file: toggleOccupato
- `dopoSceltaOccupato()` js/ui/allenamento/macchinario-occupato.js:147 funzione ← nessun altro file — nel file: sostituisciOggi, ripristinaOriginale
- `sostituisciOggi()` js/ui/allenamento/macchinario-occupato.js:155 funzione window ← tests/browser/carichi-evoluzione.js:85 · tests/browser/macchinario-occupato.js:44, 52, 53, 65 — nel file: htmlOccupato
- `ripristinaOriginale()` js/ui/allenamento/macchinario-occupato.js:184 funzione window ← nessun altro file — nel file: htmlOccupato
- `ripristinaSostituzioni()` js/ui/allenamento/macchinario-occupato.js:201 funzione ← js/ui/allenamento/termina-e-cardio.js:173 endWorkout
- `pulisciSostituzioniVecchie()` js/ui/allenamento/macchinario-occupato.js:205 funzione ← js/ui/allenamento/seduta.js:151 renderAllenamento
- `updateSetField()` js/ui/allenamento/macchinario-occupato.js:218 funzione window ← js/ui/allenamento/seduta.js:192 renderAllenamento (html)
- `toggleSetDone()` js/ui/allenamento/macchinario-occupato.js:228 funzione window ← js/ui/allenamento/seduta.js:195 renderAllenamento (html) · js/ui/lavoro-cronometro.js:52 tickLavoro · tests/browser/macchinario-occupato.js:54
- `annullaCedimento()` js/ui/allenamento/macchinario-occupato.js:259 funzione window ← js/ui/allenamento/seduta.js:194 renderAllenamento (html)

### `js/ui/allenamento/sessione.js`

- `backToDayPicker()` js/ui/allenamento/sessione.js:9 funzione window ← js/ui/oggi.js:197 switchTab · js/ui/allenamento/termina-e-cardio.js:192 endWorkout · js/ui/seduta-libera.js:168 renderSpecialeBox (html) · index.html:188 (html) · tests/cedimento.test.js:246
- `fattoQuestaSettimana()` js/ui/allenamento/sessione.js:23 funzione ← nessun altro file — nel file: renderWorkoutDayPicker
- `renderWorkoutDayPicker()` js/ui/allenamento/sessione.js:29 funzione ← js/ui/seduta-libera.js:24 annullaSpeciale — nel file: backToDayPicker
- `openWorkoutDay()` js/ui/allenamento/sessione.js:74 funzione window ← js/ui/oggi.js:182 iniziaOggi · js/ui/piano/selezione-multipla.js:168 startWorkoutFromPlan · js/ui/seduta-libera.js:157 avviaSpeciale, 175 renderSeduteExtra (html) · js/ui/sessione-completata.js:58 mostraSessione (html) · tests/cedimento.test.js:74 apri, 89 preparaSeduta · tests/browser/macchinario-occupato.js:64 — nel file: renderWorkoutDayPicker

### `js/ui/allenamento/timer-recupero.js`

- `updateRecoveryRing()` js/ui/allenamento/timer-recupero.js:7 funzione ← js/ui/allenamento/timer-pannello.js:25 openRecoveryPanel, 39 closeRecoveryPanel, 61 adjustRecoveryTimer — nel file: fineRecupero, tickRecupero
- `recoveryEndAt` js/ui/allenamento/timer-recupero.js:24 variabile ← js/ui/allenamento/timer-pannello.js:7 avvisaTelefonoRecupero, 18 openRecoveryPanel, 37 closeRecoveryPanel, 49 adjustRecoveryTimer — nel file: secondiRimasti
- `recoveryLastShown` js/ui/allenamento/timer-recupero.js:25 variabile ← js/ui/allenamento/timer-pannello.js:20 openRecoveryPanel, 38 closeRecoveryPanel, 50 adjustRecoveryTimer — nel file: tickRecupero
- `secondiRimasti()` js/ui/allenamento/timer-recupero.js:27 funzione ← js/ui/allenamento/timer-pannello.js:53 adjustRecoveryTimer — nel file: tickRecupero
- `fineRecupero()` js/ui/allenamento/timer-recupero.js:31 funzione ← nessun altro file — nel file: tickRecupero
- `tickRecupero()` js/ui/allenamento/timer-recupero.js:45 funzione ← js/ui/allenamento/timer-pannello.js:51 adjustRecoveryTimer, 71 — nel file: avviaTickRecupero
- `avviaTickRecupero()` js/ui/allenamento/timer-recupero.js:62 funzione ← js/ui/allenamento/timer-pannello.js:26 openRecoveryPanel, 62 adjustRecoveryTimer

## js/core

### `js/core/nativo.js`

- `NOTIFICA_RECUPERO` js/core/nativo.js:4 costante ← nessun altro file — nel file: Nativo
- `Nativo` js/core/nativo.js:6 valore window ← js/ui/allenamento/timer-pannello.js:10 avvisaTelefonoRecupero, 32 closeRecoveryPanel

## js/ui

### `js/ui/allenamento/timer-pannello.js`

- `recoveryEtichetta` js/ui/allenamento/timer-pannello.js:5 variabile ← nessun altro file — nel file: avvisaTelefonoRecupero, openRecoveryPanel
- `avvisaTelefonoRecupero()` js/ui/allenamento/timer-pannello.js:6 funzione ← nessun altro file — nel file: openRecoveryPanel, adjustRecoveryTimer
- `openRecoveryPanel()` js/ui/allenamento/timer-pannello.js:14 funzione window ← js/ui/allenamento/macchinario-occupato.js:252 toggleSetDone · js/ui/seduta-libera.js:224 spuntaExtra · tests/browser/recupero-contrasto.js:40 — nel file: startManualRecovery
- `closeRecoveryPanel()` js/ui/allenamento/timer-pannello.js:31 funzione window ← js/core/modalita.js:35 activateMode · js/ui/allenamento/macchinario-occupato.js:250 toggleSetDone · js/ui/allenamento/sessione.js:17 backToDayPicker · js/ui/allenamento/timer-recupero.js:41 fineRecupero · js/ui/allenamento/termina-e-cardio.js:188 endWorkout · js/coach/mi-sento-male.js:10 apriMiSentoMale · js/ui/guida-interattiva.js:267 chiudiGuida · js/ui/seduta-libera.js:225 spuntaExtra · js/ui/lavoro-cronometro.js:24 avviaLavoro · index.html:831 (html) · tests/cedimento.test.js:196 · tests/browser/macchinario-occupato-tendina.js:69
- `adjustRecoveryTimer()` js/ui/allenamento/timer-pannello.js:45 funzione window ← index.html:829 (html), 830 (html)
- `toggleRecoveryMute()` js/ui/allenamento/timer-pannello.js:75 funzione window ← index.html:820 (html)
- `toggleRecoveryExpand()` js/ui/allenamento/timer-pannello.js:81 funzione window ← index.html:817 (html)
- `startManualRecovery()` js/ui/allenamento/timer-pannello.js:87 funzione window ← index.html:201 (html)

### `js/ui/allenamento/cedimento-canzone.js`

- `MUSIC_KEY` js/ui/allenamento/cedimento-canzone.js:13 costante ← js/ui/musica/mp3-locale.js:173 deleteTrack — nel file: leggiMusica, salvaMusica, clearCedimentoAudio
- `musicaRipristinata` js/ui/allenamento/cedimento-canzone.js:14 variabile ← js/ui/musica/mp3-locale.js:98 refreshFailureTracks — nel file: ripristinaMusica
- `leggiMusica()` js/ui/allenamento/cedimento-canzone.js:16 funzione ← js/ui/musica/lettore-fisso.js:27 inizioSegmento · js/ui/allenamento/cedimento.js:47 caricaPlayerWebSalvato · js/ui/musica/mp3-locale.js:172 deleteTrack · js/ui/musica/player-web.js:30 configureWebSegment · tests/cedimento.test.js:352 — nel file: nomeMusica, ripristinaMusica, modoCanzone
- `salvaMusica()` js/ui/allenamento/cedimento-canzone.js:20 funzione window ← js/ui/allenamento/cedimento.js:127 onDropVolumeInput · js/ui/musica/mp3-locale.js:151 selectTrack, 168 onMp3RangeInput · js/ui/musica/player-web.js:48 onWebRangeInput, 86 handleWebLinkSubmit — nel file: closeMusicSheet, switchAudioSourceTab
- `nomeMusica()` js/ui/allenamento/cedimento-canzone.js:36 funzione ← js/coach/psicologia.js:159 renderSettings — nel file: aggiornaRiassuntoMusica
- `aggiornaRiassuntoMusica()` js/ui/allenamento/cedimento-canzone.js:49 funzione ← js/ui/allenamento/cedimento.js:157 apriCedimento · js/ui/musica/mp3-locale.js:99 refreshFailureTracks — nel file: salvaMusica, ripristinaMusica, clearCedimentoAudio
- `ripristinaMusica()` js/ui/allenamento/cedimento-canzone.js:60 funzione window ← js/ui/allenamento/sessione.js:86 openWorkoutDay · js/ui/musica/mp3-locale.js:98 refreshFailureTracks — nel file: openMusicSheet
- `clearCedimentoAudio()` js/ui/allenamento/cedimento-canzone.js:80 funzione window ← index.html:502 (html)
- `openMusicSheet()` js/ui/allenamento/cedimento-canzone.js:100 funzione window ← js/coach/psicologia.js:157 renderSettings (html) · tests/cedimento.test.js:289
- `closeMusicSheet()` js/ui/allenamento/cedimento-canzone.js:112 funzione window ← index.html:440 (html)
- `switchAudioSourceTab()` js/ui/allenamento/cedimento-canzone.js:120 funzione window ← index.html:446 (html), 447 (html) — nel file: ripristinaMusica
- `getResolvedAudioMode()` js/ui/allenamento/cedimento-canzone.js:128 funzione ← js/ui/allenamento/cedimento.js:129 onDropVolumeInput — nel file: modoCanzone
- `modoCanzone()` js/ui/allenamento/cedimento-canzone.js:136 funzione ← js/ui/allenamento/cedimento.js:67 startDropAudio

### `js/ui/musica/lettore-fisso.js`

- `IS_IOS` js/ui/musica/lettore-fisso.js:18 variabile ← nessun altro file — nel file: dockDaAprire, dockStato, aggiornaAvvisoDock
- `ytSbloccato` js/ui/musica/lettore-fisso.js:20 variabile ← js/ui/musica/player-web.js:143 loadYouTubePlayer — nel file: dockDaAprire, dockStato, aggiornaAvvisoDock, ytStatoCambiato
- `dockStatoAttuale` js/ui/musica/lettore-fisso.js:21 variabile ← nessun altro file — nel file: dockStato, posizionaDock, toggleDock, aggiornaAvvisoDock, ytStatoCambiato
- `attesaAvvio` js/ui/musica/lettore-fisso.js:22 variabile ← js/ui/allenamento/cedimento.js:101 rilasciaAudioCedimento — nel file: ytStatoCambiato, controllaAvvioMusica
- `inizioSegmento()` js/ui/musica/lettore-fisso.js:24 funzione ← js/ui/allenamento/cedimento.js:57 avviaWebPronto · js/ui/musica/player-web.js:171 loadYouTubePlayer — nel file: ytStatoCambiato
- `dockApertoAMano` js/ui/musica/lettore-fisso.js:33 variabile ← nessun altro file — nel file: dockDaAprire, dockStato, toggleDock, ytStatoCambiato
- `dockChiama` js/ui/musica/lettore-fisso.js:34 variabile ← nessun altro file — nel file: dockDaAprire, dockStato, aggiornaAvvisoDock, ytStatoCambiato
- `dockDaAprire()` js/ui/musica/lettore-fisso.js:41 funzione ← nessun altro file — nel file: dockStato
- `dockStato()` js/ui/musica/lettore-fisso.js:46 funzione window ← js/ui/allenamento/cedimento-canzone.js:94 clearCedimentoAudio, 110 openMusicSheet, 117 closeMusicSheet · js/ui/allenamento/cedimento.js:89 startDropAudio, 215 chiudiCedimento — nel file: toggleDock, aggiornaAvvisoDock, ytStatoCambiato, controllaAvvioMusica
- `posizionaDock()` js/ui/musica/lettore-fisso.js:67 funzione window ← nessun altro file — nel file: dockStato, (primo livello)
- `toggleDock()` js/ui/musica/lettore-fisso.js:96 funzione window ← index.html:687 (html)
- `aggiornaAvvisoDock()` js/ui/musica/lettore-fisso.js:102 funzione ← js/ui/musica/player-web.js:186 loadYouTubePlayer — nel file: dockStato, controllaAvvioMusica
- `ytStatoCambiato()` js/ui/musica/lettore-fisso.js:117 funzione window ← js/ui/musica/player-web.js:188 loadYouTubePlayer
- `controllaAvvioMusica()` js/ui/musica/lettore-fisso.js:142 funzione ← js/ui/allenamento/cedimento.js:63 avviaWebPronto, 90 startDropAudio

### `js/ui/allenamento/cedimento.js`

- `sessioneCanzoneAttiva()` js/ui/allenamento/cedimento.js:24 funzione ← nessun altro file — nel file: (primo livello), startDropAudio
- `dropEndAt` js/ui/allenamento/cedimento.js:40 variabile ← nessun altro file — nel file: apriCedimento, tickCedimento
- `dropChiudiTimer` js/ui/allenamento/cedimento.js:41 variabile ← tests/cedimento.test.js:96 stato — nel file: apriCedimento, finishDropSet, chiudiCedimento
- `DROP_CHIUSURA_MS` js/ui/allenamento/cedimento.js:42 costante ← nessun altro file — nel file: finishDropSet
- `caricaPlayerWebSalvato()` js/ui/allenamento/cedimento.js:45 funzione ← nessun altro file — nel file: startDropAudio
- `avviaWebPronto()` js/ui/allenamento/cedimento.js:54 funzione ← js/ui/musica/player-web.js:181 loadYouTubePlayer, 266 loadSpotifyPlayer — nel file: startDropAudio
- `startDropAudio()` js/ui/allenamento/cedimento.js:66 funzione ← nessun altro file — nel file: apriCedimento
- `rilasciaAudioCedimento()` js/ui/allenamento/cedimento.js:100 funzione ← nessun altro file — nel file: finishDropSet, chiudiCedimento
- `updateDropTimerDisplay()` js/ui/allenamento/cedimento.js:117 funzione ← nessun altro file — nel file: apriCedimento, tickCedimento, chiudiCedimento
- `updateFireModeState()` js/ui/allenamento/cedimento.js:120 funzione ← nessun altro file — nel file: onDropVolumeInput, apriCedimento, finishDropSet, chiudiCedimento
- `onDropVolumeInput()` js/ui/allenamento/cedimento.js:125 funzione window ← index.html:497 (html)
- `apriCedimento()` js/ui/allenamento/cedimento.js:139 funzione window ← js/ui/allenamento/seduta.js:194 renderAllenamento (html) · tests/cedimento.test.js:182
- `tickCedimento()` js/ui/allenamento/cedimento.js:170 funzione ← js/ui/allenamento/timer-pannello.js:72 — nel file: apriCedimento
- `finishDropSet()` js/ui/allenamento/cedimento.js:181 funzione ← nessun altro file — nel file: tickCedimento
- `chiudiCedimento()` js/ui/allenamento/cedimento.js:197 funzione ← js/ui/oggi.js:187 switchTab · js/ui/allenamento/sessione.js:10 backToDayPicker — nel file: apriCedimento, finishDropSet, stopDropSet
- `stopDropSet()` js/ui/allenamento/cedimento.js:219 funzione window = chiudiCedimento ← js/core/modalita.js:34 activateMode · js/core/navigazione.js:21 selectDay · js/ui/allenamento/macchinario-occupato.js:263 annullaCedimento · js/ui/allenamento/sessione.js:16 backToDayPicker · js/ui/musica/mp3-locale.js:149 selectTrack, 181 deleteTrack · js/ui/allenamento/termina-e-cardio.js:187 endWorkout · js/coach/mi-sento-male.js:11 apriMiSentoMale · js/ui/guida-interattiva.js:266 chiudiGuida · index.html:509 (html), 527 (html)

### `js/ui/musica/mp3-locale.js`

- `openAudioDB()` js/ui/musica/mp3-locale.js:6 funzione ← nessun altro file — nel file: dbAddTrack, dbGetAllTracks, dbDeleteTrack
- `dbAddTrack()` js/ui/musica/mp3-locale.js:23 funzione ← nessun altro file — nel file: handleAudioUpload
- `dbGetAllTracks()` js/ui/musica/mp3-locale.js:32 funzione ← nessun altro file — nel file: refreshFailureTracks
- `dbDeleteTrack()` js/ui/musica/mp3-locale.js:41 funzione ← nessun altro file — nel file: deleteTrack
- `readAudioDuration()` js/ui/musica/mp3-locale.js:50 funzione ← nessun altro file — nel file: handleAudioUpload
- `handleAudioUpload()` js/ui/musica/mp3-locale.js:74 funzione window ← index.html:455 (html)
- `refreshFailureTracks()` js/ui/musica/mp3-locale.js:95 funzione ← js/avvio.js:19 — nel file: handleAudioUpload, deleteTrack
- `renderFailureTracks()` js/ui/musica/mp3-locale.js:101 funzione ← js/ui/allenamento/cedimento-canzone.js:87 clearCedimentoAudio — nel file: refreshFailureTracks, selectTrack
- `selectTrack()` js/ui/musica/mp3-locale.js:122 funzione window ← js/ui/allenamento/cedimento-canzone.js:67 ripristinaMusica · tests/cedimento.test.js:270, 303 — nel file: handleAudioUpload, renderFailureTracks
- `updateMp3SegmentLabel()` js/ui/musica/mp3-locale.js:154 funzione ← nessun altro file — nel file: selectTrack, onMp3RangeInput
- `onMp3RangeInput()` js/ui/musica/mp3-locale.js:165 funzione window ← js/ui/allenamento/cedimento-canzone.js:69 ripristinaMusica · index.html:459 (html)
- `deleteTrack()` js/ui/musica/mp3-locale.js:171 funzione window ← nessun altro file — nel file: renderFailureTracks

### `js/ui/musica/player-web.js`

- `parseWebAudioUrl()` js/ui/musica/player-web.js:6 funzione ← js/ui/allenamento/cedimento-canzone.js:141 modoCanzone · js/ui/allenamento/cedimento.js:48 caricaPlayerWebSalvato — nel file: handleWebLinkSubmit
- `setWebStatus()` js/ui/musica/player-web.js:14 funzione ← nessun altro file — nel file: loadYouTubePlayer, readYouTubeDuration, loadSpotifyPlayer
- `configureWebSegment()` js/ui/musica/player-web.js:23 funzione ← nessun altro file — nel file: loadYouTubePlayer, readYouTubeDuration, loadSpotifyPlayer
- `updateWebSegmentLabel()` js/ui/musica/player-web.js:37 funzione ← nessun altro file — nel file: configureWebSegment, onWebRangeInput, nudgeWebSegment
- `onWebRangeInput()` js/ui/musica/player-web.js:48 funzione window ← index.html:484 (html)
- `nudgeWebSegment()` js/ui/musica/player-web.js:50 funzione window ← index.html:486 (html), 487 (html), 488 (html), 489 (html)
- `previewWebSegment()` js/ui/musica/player-web.js:59 funzione window ← index.html:491 (html)
- `handleWebLinkSubmit()` js/ui/musica/player-web.js:71 funzione window ← js/ui/allenamento/cedimento-canzone.js:74 ripristinaMusica · js/ui/allenamento/cedimento.js:49 caricaPlayerWebSalvato · index.html:470 (html)
- `webToken` js/ui/musica/player-web.js:92 variabile ← nessun altro file — nel file: liberaPlayerWeb, loadYouTubePlayer, loadSpotifyPlayer
- `liberaPlayerWeb()` js/ui/musica/player-web.js:93 funzione window ← js/ui/allenamento/cedimento-canzone.js:86 clearCedimentoAudio, 116 closeMusicSheet · js/ui/allenamento/cedimento.js:112 rilasciaAudioCedimento
- `playerWebCaricato()` js/ui/musica/player-web.js:107 funzione ← js/ui/allenamento/cedimento-canzone.js:73 ripristinaMusica · js/ui/allenamento/cedimento.js:88 startDropAudio
- `ensureYouTubeApi()` js/ui/musica/player-web.js:110 funzione ← nessun altro file — nel file: loadYouTubePlayer
- `onYouTubeIframeAPIReady()` js/ui/musica/player-web.js:116 funzione window ← nessun altro file — nel file: ensureYouTubeApi
- `YT_ERRORS` js/ui/musica/player-web.js:131 costante ← nessun altro file — nel file: loadYouTubePlayer
- `loadYouTubePlayer()` js/ui/musica/player-web.js:139 funzione ← nessun altro file — nel file: handleWebLinkSubmit
- `readYouTubeDuration()` js/ui/musica/player-web.js:201 funzione ← nessun altro file — nel file: loadYouTubePlayer
- `ensureSpotifyApi()` js/ui/musica/player-web.js:222 funzione ← nessun altro file — nel file: loadSpotifyPlayer
- `onSpotifyIframeApiReady()` js/ui/musica/player-web.js:227 funzione window ← nessun altro file
- `__spotifyIFrameApi` js/ui/musica/player-web.js:229 valore window = IFrameAPI ← nessun altro file — nel file: ensureSpotifyApi
- `loadSpotifyPlayer()` js/ui/musica/player-web.js:243 funzione ← nessun altro file — nel file: handleWebLinkSubmit

### `js/ui/gesti.js`

- `attachSwipe()` js/ui/gesti.js:13 funzione ← js/ui/piano/aggiungi-allenamento.js:440 renderPiano
- `wheelTarget` js/ui/gesti.js:60 variabile ← nessun altro file — nel file: openWheel, pickWheel, closeWheel
- `openWheel()` js/ui/gesti.js:62 funzione window ← nessun altro file — nel file: attachRepsField, attachNumberDrag
- `pickWheel()` js/ui/gesti.js:83 funzione window ← nessun altro file — nel file: openWheel
- `closeWheel()` js/ui/gesti.js:91 funzione window ← index.html:720 (html), 724 (html) · tests/browser/ripetizioni.js:39 — nel file: pickWheel
- `attachRepsField()` js/ui/gesti.js:102 funzione ← js/ui/allenamento/seduta.js:219 renderAllenamento
- `attachNumberDrag()` js/ui/gesti.js:116 funzione ← nessun altro file

### `js/ui/annulla.js`

- `snackTimer` js/ui/annulla.js:7 variabile ← nessun altro file — nel file: showUndo, hideSnackbar
- `lastUndo` js/ui/annulla.js:8 variabile ← nessun altro file — nel file: showUndo, hideSnackbar, (primo livello)
- `showUndo()` js/ui/annulla.js:10 funzione window ← js/ui/piano/giorno.js ×2 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/seduta.js ×3 · js/ui/allenamento/macchinario-occupato.js ×3 · js/ui/allenamento/cedimento-canzone.js ×1 · js/ui/musica/lettore-fisso.js ×1 · js/ui/riposo-settimane.js ×3 · js/ui/gruppi-muscolari.js ×2 · js/ui/allenamento/termina-e-cardio.js ×2 · js/coach/programma/mesociclo.js ×2 · js/coach/programma/alternative.js ×2 · js/coach/sicurezza/scarico.js ×2 · js/coach/questionario-decisioni.js ×3 · js/coach/prontezza.js ×2 · js/coach/mi-sento-male.js ×1 · js/coach/repertorio.js ×10 · js/coach/dolore-mattina.js ×2 · js/coach/intensita.js ×2 · js/coach/bia/opzioni.js ×3 · js/ui/guida-interattiva.js ×2 · js/ui/opzioni/il-coach.js ×4 · js/core/backup.js ×4 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/progressi/foto.js ×3 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×3 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×3 · js/ui/menu-settimana.js ×4 · js/ui/esporta-ics.js ×1
- `hideSnackbar()` js/ui/annulla.js:23 funzione window ← js/ui/oggi.js:188 switchTab — nel file: (primo livello)

### `js/ui/riposo-settimane.js`

- `restKey()` js/ui/riposo-settimane.js:6 funzione ← js/coach/questionario-decisioni.js:248 applicaDecisioni · tests/conserva-progressi.test.js:30 riscritte (html) · tests/migrazione-v1.test.js:176 (html) · tests/sicurezza-onda0.test.js:149 (html) — nel file: loadRestDays, saveRestDays
- `loadRestDays()` js/ui/riposo-settimane.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:254 applicaAllaSettimana · js/coach/questionario-decisioni.js:300 riduciFrequenza · js/ui/calendario/scambio.js:141 planSwapDays — nel file: isRestDay, toggleRestDay, saveWeekSnapshot
- `saveRestDays()` js/ui/riposo-settimane.js:8 funzione ← js/ui/piano/aggiungi-allenamento.js:279 applicaAllaSettimana · js/coach/programma/alternative.js:100 applyGeneratedProgram · js/coach/questionario-decisioni.js:300 riduciFrequenza · js/ui/guida-interattiva.js:75 guidaDatiDemo · js/ui/calendario/scambio.js:153 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/elenco-esercizi.js:63 · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13 · tests/browser/ripetizioni.js:31 — nel file: toggleRestDay, restoreWeek
- `isRestDay()` js/ui/riposo-settimane.js:9 funzione window ← js/ui/oggi.js:47 obiettiviSettimana, 104 renderOggi · js/ui/piano/giorno.js:34 openPlanDayScreen, 73 exitPlanEdit, 89 renderDayView, 159 renderPlanMap, 182 renderPlanMapList, 211 renderPlanDayPicker · js/ui/piano/aggiungi-allenamento.js:98 awQuick, 218 renderAddWeek, 321 renderWeekOverview, 368 renderPiano · js/ui/allenamento/sessione.js:53 renderWorkoutDayPicker, 76 openWorkoutDay · js/ui/gruppi-muscolari.js:61 renderSuggested · js/ui/figura-anatomica.js:119 weekUsage, 165 weeklyVolumeByGroup · js/coach/questionario-decisioni.js:297 riduciFrequenza · js/coach/repertorio.js:265 controlloSchemi · js/ui/progressi/riepilogo.js:32 htmlProssimaSeduta · js/ui/stampa-scheda.js:12 righeScheda · js/coach/stato.js:41 ultimoGiornoAllenamento · js/ui/calendario/mese.js:31 voceDaPiano · tests/aiuto-app.js:108 caricaApp (html) — nel file: syncRestToggle
- `toggleRestDay()` js/ui/riposo-settimane.js:11 funzione window ← index.html:121 (html)
- `syncRestToggle()` js/ui/riposo-settimane.js:27 funzione ← js/ui/piano/aggiungi-allenamento.js:362 renderPiano
- `weeksKey()` js/ui/riposo-settimane.js:36 funzione ← nessun altro file — nel file: loadWeeks, saveWeeks
- `loadWeeks()` js/ui/riposo-settimane.js:37 funzione ← nessun altro file — nel file: saveWeekSnapshot, restoreWeek, deleteWeek, renderWeeks
- `saveWeeks()` js/ui/riposo-settimane.js:38 funzione ← nessun altro file — nel file: saveWeekSnapshot, deleteWeek
- `isoWeekLabel()` js/ui/riposo-settimane.js:40 funzione ← nessun altro file — nel file: saveWeekSnapshot
- `saveWeekSnapshot()` js/ui/riposo-settimane.js:49 funzione window ← index.html:81 (html)
- `restoreWeek()` js/ui/riposo-settimane.js:78 funzione window ← nessun altro file — nel file: renderWeeks
- `deleteWeek()` js/ui/riposo-settimane.js:91 funzione window ← nessun altro file — nel file: renderWeeks
- `renderWeeks()` js/ui/riposo-settimane.js:106 funzione ← js/ui/oggi.js:193 switchTab · js/ui/progressi/pagine.js:43 apriPagProgressi — nel file: saveWeekSnapshot, deleteWeek

### `js/ui/gruppi-muscolari.js`

- `selectedGroups` js/ui/gruppi-muscolari.js:7 variabile ← js/ui/piano/giorno.js:38 openPlanDayScreen, 72 exitPlanEdit · js/ui/figura-anatomica.js:211 renderGruppi · js/coach/pannello.js:15 renderCoach · js/coach/programma/alternative.js:159 applyGeneratedProgram — nel file: toggleGroup, renderSuggested, openGroupSheet, clearGroupSelection
- `toggleGroup()` js/ui/gruppi-muscolari.js:12 funzione window ← nessun altro file
- `sheetGroup` js/ui/gruppi-muscolari.js:17 variabile ← js/ui/figura-anatomica.js:320 addLibraryExercise — nel file: openGroupSheet, closeGroupSheet, renderSheetExercises, removeExerciseByName
- `sheetOrder` js/ui/gruppi-muscolari.js:18 variabile ← nessun altro file — nel file: openGroupSheet, closeGroupSheet, renderSheetExercises
- `suggestedOrder` js/ui/gruppi-muscolari.js:19 variabile ← nessun altro file — nel file: renderSuggested, clearGroupSelection
- `suggestedOrderKey` js/ui/gruppi-muscolari.js:20 variabile ← js/ui/piano/giorno.js:39 openPlanDayScreen — nel file: renderSuggested, clearGroupSelection
- `toggleGroupInPlan()` js/ui/gruppi-muscolari.js:24 funzione window ← js/ui/piano/giorno.js:197 aggiungiPerGruppo
- `pickRow()` js/ui/gruppi-muscolari.js:30 funzione ← js/ui/piano/aggiungi-allenamento.js:159 renderAddWeek — nel file: renderSuggested, renderSheetExercises
- `togglePickExercise()` js/ui/gruppi-muscolari.js:49 funzione window ← nessun altro file — nel file: renderSuggested, renderSheetExercises
- `renderSuggested()` js/ui/gruppi-muscolari.js:56 funzione ← js/ui/piano/giorno.js:46 openPlanDayScreen, 61 enterPlanEdit, 253 openAddEx, 262 openReco · js/ui/piano/aggiungi-allenamento.js:374 renderPiano · js/ui/piano/selezione-multipla.js:55 deleteSelected, 71 clearDay — nel file: clearGroupSelection
- `openGroupSheet()` js/ui/gruppi-muscolari.js:105 funzione window ← js/ui/figura-anatomica.js:227 renderGruppi (html) · tests/browser/elenco-esercizi.js:18, 72 — nel file: toggleGroup, toggleGroupInPlan
- `closeGroupSheet()` js/ui/gruppi-muscolari.js:117 funzione window ← index.html:704 (html), 716 (html)
- `renderSheetExercises()` js/ui/gruppi-muscolari.js:125 funzione ← js/ui/figura-anatomica.js:320 addLibraryExercise — nel file: openGroupSheet, removeExerciseByName
- `removeExerciseByName()` js/ui/gruppi-muscolari.js:166 funzione window ← nessun altro file — nel file: togglePickExercise
- `clearGroupSelection()` js/ui/gruppi-muscolari.js:185 funzione window ← index.html:557 (html)

### `js/ui/elenco-esercizi.js`

- `sezEsAperte` js/ui/elenco-esercizi.js:13 costante ← nessun altro file — nel file: azzeraSezioniEsercizi, toggleSezioneEsercizi, htmlEserciziOrganizzati
- `azzeraSezioniEsercizi()` js/ui/elenco-esercizi.js:15 funzione window ← js/ui/piano/aggiungi-allenamento.js:49 openAddWeek · js/ui/gruppi-muscolari.js:108 openGroupSheet, 190 clearGroupSelection · js/ui/seduta-libera.js:30 apriSedutaLibera
- `toggleSezioneEsercizi()` js/ui/elenco-esercizi.js:18 funzione window ← nessun altro file — nel file: htmlEserciziOrganizzati
- `htmlEserciziOrganizzati()` js/ui/elenco-esercizi.js:27 funzione window ← js/ui/piano/aggiungi-allenamento.js:157 renderAddWeek · js/ui/gruppi-muscolari.js:96 renderSuggested, 156 renderSheetExercises · js/ui/seduta-libera.js:89 htmlListaLibera
- `htmlDettaglioRiga()` js/ui/elenco-esercizi.js:52 funzione window ← js/ui/gruppi-muscolari.js:42 pickRow

### `js/ui/figura-anatomica.js`

- `MG_VISTA` js/ui/figura-anatomica.js:15 costante ← nessun altro file — nel file: muscleFigureNuova, muscleCard
- `_figCache` js/ui/figura-anatomica.js:25 costante ← nessun altro file — nel file: muscleFigure
- `muscleFigure()` js/ui/figura-anatomica.js:26 funzione window ← js/ui/oggi.js:133 renderOggi · js/ui/piano/aggiungi-allenamento.js:415 renderPiano · js/ui/allenamento/seduta.js:162 renderAllenamento · js/ui/gruppi-muscolari.js:37 pickRow · js/ui/elenco-esercizi.js:39 htmlEserciziOrganizzati · js/ui/onboarding.js:433 renderOnb · js/ui/seduta-libera.js:94 htmlListaLibera · js/ui/progressi/riepilogo.js:70 renderFatica — nel file: muscleCard, renderGruppi
- `muscleFigureNuova()` js/ui/figura-anatomica.js:30 funzione ← nessun altro file — nel file: muscleFigure
- `muscleCard()` js/ui/figura-anatomica.js:35 funzione window ← js/ui/piano/aggiungi-allenamento.js:152 renderAddWeek
- `MC_PARTS` js/ui/figura-anatomica.js:53 costante ← nessun altro file — nel file: renderBodyMap
- `MC_VIEWBOX` js/ui/figura-anatomica.js:54 costante ← nessun altro file — nel file: muscleFigureNuova, renderBodyMap
- `renderBodyMap()` js/ui/figura-anatomica.js:55 funzione ← js/ui/piano/giorno.js:135 renderPlanMap · js/ui/gruppi-muscolari.js:112 openGroupSheet — nel file: muscleFigureNuova, renderGruppi
- `DEFAULT_SETS` js/ui/figura-anatomica.js:80 costante ← js/ui/piano/aggiungi-allenamento.js:20 awEsercizi · js/ui/gruppi-muscolari.js:40 pickRow, 92 renderSuggested — nel file: addLibraryExercise
- `DEFAULT_REPS` js/ui/figura-anatomica.js:81 costante ← js/ui/gruppi-muscolari.js:92 renderSuggested — nel file: defaultRepsFor
- `REPS_MIN` js/ui/figura-anatomica.js:82 costante ← nessun altro file — nel file: repsRange
- `REPS_MAX` js/ui/figura-anatomica.js:83 costante ← nessun altro file — nel file: repsRange
- `REPS_MIN_CORPO` js/ui/figura-anatomica.js:86 costante ← nessun altro file — nel file: repsRange
- `REPS_MAX_CORPO` js/ui/figura-anatomica.js:87 costante ← nessun altro file — nel file: repsRange
- `TIME_MIN` js/ui/figura-anatomica.js:91 costante ← nessun altro file — nel file: repsRange
- `TIME_MAX` js/ui/figura-anatomica.js:92 costante ← nessun altro file — nel file: repsRange
- `isTimeBased()` js/ui/figura-anatomica.js:93 funzione window ← js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×3 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/ricette.js ×2 · js/coach/programma/struttura-pro.js ×11 · js/coach/programma/completamenti.js ×7 · js/coach/volume/serie-ripetizioni.js ×2 · js/coach/volume/volume.js ×10 · js/coach/volume/tempo.js ×10 · js/coach/sicurezza/tecnica-adatta.js ×2 · js/coach/regia/genera.js ×2 · js/coach/specialita/forza.js ×3 · js/coach/specialita/forza-carichi.js ×1 · js/coach/carichi/partenza.js ×2 · js/coach/carichi/attrezzi.js ×1 · js/coach/carichi/calibrazione.js ×2 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×1 · js/coach/sicurezza/popolazioni.js ×2 · js/coach/questionario-decisioni.js ×2 · js/coach/repertorio.js ×1 · js/coach/dolore-mattina.js ×3 · js/coach/regole-ricerca.js ×5 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×1 · js/ui/importa-csv.js ×1 · js/ui/lavoro-cronometro.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×5 · js/coach/metodi-epoca-oro.js ×1 · js/coach/compone.js ×2 · js/dati/scheda-unica.js ×1 · tests/carichi-onda0.test.js ×1 · tests/conserva-progressi.test.js ×2 · tests/forza-equilibrio.test.js ×1 · tests/forza-struttura.test.js ×2 · tests/integrazione-onda2b.test.js ×1 · tests/memoria-chiamata.test.js ×1 · tests/popolazioni.test.js ×1 · tests/revisione-onda2d.test.js ×1 · tests/browser/coerenza-schede.js ×2 — nel file: repsRange, defaultRepsFor
- `perLato()` js/ui/figura-anatomica.js:101 funzione window ← js/ui/oggi.js:135 renderOggi · js/ui/lavoro-cronometro.js:9 infoEsercizio · js/ui/stampa-scheda.js:13 righeScheda
- `corpoLibero()` js/ui/figura-anatomica.js:103 funzione window ← js/ui/allenamento/seduta.js:192 renderAllenamento · js/coach/carichi/partenza.js:142 scalaDaStorico, 196 stimaCaricoIniziale · js/ui/lavoro-cronometro.js:10 infoEsercizio — nel file: repsCorporatura
- `repsCorporatura()` js/ui/figura-anatomica.js:105 funzione window ← nessun altro file — nel file: repsRange
- `repsRange()` js/ui/figura-anatomica.js:106 funzione window ← js/ui/allenamento/seduta.js:218 renderAllenamento · js/ui/allenamento/macchinario-occupato.js:164 sostituisciOggi · tests/browser/ripetizioni.js:16
- `defaultRepsFor()` js/ui/figura-anatomica.js:110 funzione window ← js/ui/piano/aggiungi-allenamento.js:20 awEsercizi · js/ui/gruppi-muscolari.js:33 pickRow — nel file: addLibraryExercise
- `weekUsage()` js/ui/figura-anatomica.js:115 funzione window ← js/coach/suggeritore.js:34 suggestNextExercises · js/ui/piano/schede-pronte.js:10 openTemplatePicker · js/ui/gruppi-muscolari.js:69 renderSuggested, 130 renderSheetExercises — nel file: usageState, renderGruppi
- `usageState()` js/ui/figura-anatomica.js:132 funzione window ← js/ui/gruppi-muscolari.js:81 renderSuggested, 136 renderSheetExercises
- `usageBadge()` js/ui/figura-anatomica.js:140 funzione ← nessun altro file
- `usageRank()` js/ui/figura-anatomica.js:148 funzione ← js/ui/gruppi-muscolari.js:81 renderSuggested, 136 renderSheetExercises
- `VOL_MIN_UTILE` js/ui/figura-anatomica.js:157 costante ← js/ui/piano/giorno.js:160 renderPlanMap — nel file: volLevel
- `VOL_MAX_UTILE` js/ui/figura-anatomica.js:158 costante ← js/ui/piano/giorno.js:160 renderPlanMap — nel file: volLevel
- `weeklyVolumeByGroup()` js/ui/figura-anatomica.js:160 funzione window ← js/ui/piano/giorno.js:134 renderPlanMap, 181 renderPlanMapList — nel file: renderGruppi
- `volLevel()` js/ui/figura-anatomica.js:187 funzione ← js/ui/piano/giorno.js:157 renderPlanMap — nel file: renderBodyMap, volLabel, renderGruppi
- `volLabel()` js/ui/figura-anatomica.js:194 funzione ← nessun altro file — nel file: renderGruppi
- `renderGruppi()` js/ui/figura-anatomica.js:206 funzione ← js/ui/piano/schede-pronte.js:70 applyTemplate · js/core/navigazione.js:25 selectDay · js/ui/piano/giorno.js:45 openPlanDayScreen, 61 enterPlanEdit, 253 openAddEx, 262 openReco · js/ui/piano/selezione-multipla.js:55 deleteSelected, 71 clearDay, 250 deletePianoExercise · js/ui/riposo-settimane.js:23 toggleRestDay, 86 restoreWeek · js/ui/gruppi-muscolari.js:122 closeGroupSheet, 175 removeExerciseByName, 192 clearGroupSelection · js/coach/programma/alternative.js:161 applyGeneratedProgram · tests/integrazione-onda2b.test.js:167 (html) · tests/browser/metodi-epoca-oro.js:87 — nel file: addLibraryExercise, applyTemplateFromGroups
- `addLibraryExercise()` js/ui/figura-anatomica.js:295 funzione window ← js/ui/gruppi-muscolari.js:53 togglePickExercise · js/coach/pannello.js:37 renderCoach (html)
- `applyTemplateFromGroups()` js/ui/figura-anatomica.js:323 funzione window ← nessun altro file — nel file: renderGruppi

## js/coach

### `js/coach/pannello.js`

- `renderCoach()` js/coach/pannello.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:384 renderPiano

## js/ui

### `js/ui/allenamento/termina-e-cardio.js`

- `ultimaChiusuraSeduta` js/ui/allenamento/termina-e-cardio.js:7 variabile ← nessun altro file — nel file: endWorkout
- `obiettivoSeduta()` js/ui/allenamento/termina-e-cardio.js:14 funzione ← nessun altro file — nel file: endWorkout
- `CARDIO_TIPI` js/ui/allenamento/termina-e-cardio.js:33 costante ← nessun altro file — nel file: nomeCardio, renderCardio
- `cardioKey()` js/ui/allenamento/termina-e-cardio.js:41 funzione ← js/ui/guida-interattiva.js:118 guidaPreparaProva — nel file: cardioCorrente, aggiungiCardio, togliCardio, endWorkout
- `cardioCorrente()` js/ui/allenamento/termina-e-cardio.js:42 funzione ← nessun altro file — nel file: renderCardio, aggiungiCardio, togliCardio, endWorkout
- `cardioAperto` js/ui/allenamento/termina-e-cardio.js:43 variabile ← js/ui/guida-interattiva.js:26 GUIDA — nel file: renderCardio, toggleCardio, aggiungiCardio, endWorkout
- `nomeCardio()` js/ui/allenamento/termina-e-cardio.js:44 funzione ← nessun altro file — nel file: renderCardio, aggiungiCardio, renderCardioStat
- `renderCardio()` js/ui/allenamento/termina-e-cardio.js:45 funzione window ← js/ui/allenamento/seduta.js:150 renderAllenamento — nel file: toggleCardio, aggiungiCardio, togliCardio, endWorkout
- `toggleCardio()` js/ui/allenamento/termina-e-cardio.js:58 funzione window ← nessun altro file — nel file: renderCardio
- `aggiungiCardio()` js/ui/allenamento/termina-e-cardio.js:59 funzione window ← nessun altro file — nel file: renderCardio
- `togliCardio()` js/ui/allenamento/termina-e-cardio.js:68 funzione window ← nessun altro file — nel file: renderCardio
- `minutiCardioSettimana()` js/ui/allenamento/termina-e-cardio.js:70 funzione ← nessun altro file — nel file: renderCardioStat
- `renderCardioStat()` js/ui/allenamento/termina-e-cardio.js:74 funzione window ← js/ui/progressi/pagine.js:44 apriPagProgressi
- `endWorkout()` js/ui/allenamento/termina-e-cardio.js:92 funzione window ← js/coach/mi-sento-male.js:18 chiudiSedutaInterrotta · index.html:207 (html) · tests/carichi-onda0.test.js:397 chiudiSeduta (html) · tests/migrazione-v1.test.js:158 (html) · tests/browser/macchinario-occupato.js:59
- `__sedutaInterrotta` js/ui/allenamento/termina-e-cardio.js:103 valore window (riassegnato anche in js/coach/mi-sento-male.js:17) ← nessun altro file — nel file: endWorkout

### `js/ui/storico.js`

- `rigaSeduta()` js/ui/storico.js:9 funzione ← nessun altro file — nel file: htmlStoricoOrdinato
- `htmlStoricoOrdinato()` js/ui/storico.js:27 funzione ← nessun altro file — nel file: renderStorico, openAllSessions
- `renderStorico()` js/ui/storico.js:54 funzione ← js/ui/oggi.js:193 switchTab · js/ui/importa-progressi.js:200 confermaImportProgressi, 217 confermaImport · js/ui/progressi/pagine.js:43 apriPagProgressi — nel file: clearHistory
- `openAllSessions()` js/ui/storico.js:67 funzione window ← nessun altro file
- `closeAllSessions()` js/ui/storico.js:74 funzione window ← index.html:356 (html)
- `renderProgressiTop()` js/ui/storico.js:77 funzione ← js/ui/progressi/pagine.js:44 apriPagProgressi — nel file: renderStorico
- `clearHistory()` js/ui/storico.js:103 funzione window ← js/coach/psicologia.js:181 renderSettings (html) · index.html:405 (html)

### `js/ui/onboarding.js`

- `ONB_KEY` js/ui/onboarding.js:15 costante ← js/coach/programma/alternative.js:149 applyGeneratedProgram · js/ui/guida-interattiva.js:344 setConsenso — nel file: startOnboarding, onbSkipAll
- `PROFILE_KEY()` js/ui/onboarding.js:16 funzione ← js/coach/programma/alternative.js ×2 · js/coach/repertorio.js ×4 · js/coach/intensita.js ×1 · js/coach/bia/opzioni.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/opzioni/il-coach.js ×9 · js/ui/progressi/peso.js ×1 · js/coach/metodi-momenti.js ×4 · js/coach/biomeccanica.js ×1 · js/coach/esigenza.js ×3 · js/coach/psicologia.js ×1 · js/dati/schede-tecniche.js ×1 · tests/aiuto-app.js ×1 · tests/conserva-progressi.test.js ×2 · tests/split.test.js ×1 · tests/browser/gravidanza.js ×1 · tests/browser/intensita-bia.js ×2 · tests/browser/macchinario-occupato-profilo.js ×1 · tests/browser/regole-nuove.js ×1
- `onbStep` js/ui/onboarding.js:18 variabile ← js/coach/bia/lettore.js:252 applyBiaValues · tests/browser/onboarding-attrezzi.js:16 · tests/browser/onboarding-forza.js:16 · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbPrev, onbNext, onbStepValid, renderOnb
- `onbData` js/ui/onboarding.js:19 variabile ← js/coach/bia/lettore.js:238 applyBiaValues · js/coach/regia/genera.js:343 generaProgramma · js/ui/onboarding-risultato.js:6 renderOnbResult · js/coach/programma/alternative.js:6 altraVariante, 20 apriAlternative, 29 applicaAlternative, 39 renderAlternative, 87 applyGeneratedProgram · js/coach/repertorio.js:551 nuovoCiclo · js/coach/psicologia.js:75 onbPsico, 93 renderPsicoStep, 98 onbMomento · tests/browser/onboarding-attrezzi.js:16, 22, 33, 39, 47, 50, … · tests/browser/onboarding-forza.js:16, 28, 35, 37, 42 · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbNext, onbStepValid, onbSetTest, onbPick, onbSetEta, onbToggleGoal, onbTogglePriorita, …
- `ONB_GOALS` js/ui/onboarding.js:21 costante ← js/ui/onboarding-risultato.js:8 renderOnbResult — nel file: renderOnb
- `ONB_LEVELS` js/ui/onboarding.js:30 costante ← nessun altro file — nel file: renderOnb
- `splitFor()` js/ui/onboarding.js:37 funzione ← nessun altro file — nel file: splitPerFrequenza
- `splitPerFrequenza()` js/ui/onboarding.js:60 funzione ← nessun altro file — nel file: scegliSplit
- `scegliSplit()` js/ui/onboarding.js:87 funzione ← js/coach/regia/genera.js:351 generaProgramma · tests/tempo-copertura.test.js:20 esegui (html)
- `SLOT_PRIORITA` js/ui/onboarding.js:91 costante ← nessun altro file — nel file: ricettaPunti
- `ricettaPunti()` js/ui/onboarding.js:93 funzione ← js/coach/programma/ricette.js:154 componiSedute · js/coach/programma/soglie-split.js:28 SOGLIE_SPLIT (html)
- `schemeFor()` js/ui/onboarding.js:101 funzione ← js/coach/catalogo-regole.js:39 COACH_REGOLE (html) · js/coach/programma/motore.js:213 schemaMisto · js/coach/volume/serie-ripetizioni.js:51 prescriviSeduta · tests/genera-stadi.test.js:260 (html) · tests/generatore-onda0.test.js:54 (html), 64 (html) · tests/tempo.test.js:330 (html)
- `PARAM_ETA` js/ui/onboarding.js:120 costante ← js/coach/sicurezza/tecnica-adatta.js:68 personaTecniche · js/coach/regia/brief.js:79 chiDa, 136 briefCoach · js/coach/specialita/forza.js:132 SPEC_FORZA · js/coach/carichi/calibrazione.js:49 personaCalibrazione · js/coach/regole-ricerca.js:64 profiloCoach · js/coach/regole-nuove.js:70 regoleRicAlCarico · js/ui/opzioni/il-coach.js:20 paginaCoach · js/coach/compone.js:35 guardiaNutrizione, 83 sceltaMetodo · js/coach/esigenza.js:26 esigenzaEsclusa — nel file: etaPerProgramma, renderOnb
- `MSG_ETA_SOTTO_MINIMO` js/ui/onboarding.js:121 costante ← js/coach/regia/brief.js:136 briefCoach — nel file: etaPerProgramma
- `MSG_ETA_MANCANTE` js/ui/onboarding.js:122 costante ← nessun altro file — nel file: etaPerProgramma
- `etaPerProgramma()` js/ui/onboarding.js:123 funzione ← js/coach/repertorio.js:529 nuovoCiclo · js/ui/opzioni/il-coach.js:129 setCoach — nel file: onbNext, onbStepValid, onbSetEta, descSonnoBene, renderOnb
- `startOnboarding()` js/ui/onboarding.js:131 funzione window ← js/core/modalita.js:14 chooseMode · js/coach/bia/opzioni.js:143 restartOnboarding · js/ui/guida-interattiva.js:343 setConsenso
- `nuovoOnbData()` js/ui/onboarding.js:141 funzione ← tests/attrezzi-onboarding.test.js:11 onb (html), 71 (html) · tests/forza-attivazione.test.js:11 conOnb (html), 76 (html), 86 (html) · tests/split.test.js:167 (html), 175 (html), 180 (html), 186 (html), 197 (html), 202 (html), … · tests/browser/onboarding-attrezzi.js:16 · tests/browser/onboarding-forza.js:16, 42 · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding
- `onbSkipAll()` js/ui/onboarding.js:154 funzione window ← index.html:772 (html) — nel file: onbPrev
- `onbPrev()` js/ui/onboarding.js:160 funzione window ← index.html:767 (html)
- `ONB_ULTIMO` js/ui/onboarding.js:166 costante ← nessun altro file — nel file: onbNext, renderOnb
- `onbNext()` js/ui/onboarding.js:168 funzione window ← index.html:777 (html) · tests/conserva-progressi.test.js:64 rifai (html) · tests/generatore-onda0.test.js:321 (html)
- `onbStepValid()` js/ui/onboarding.js:178 funzione ← tests/generatore-onda0.test.js:309 (html) — nel file: onbNext, onbSetEta, renderOnb
- `ONB_FREQ` js/ui/onboarding.js:187 costante ← js/ui/opzioni/il-coach.js:31 paginaCoach — nel file: renderOnb
- `onbSetTest()` js/ui/onboarding.js:193 funzione window ← nessun altro file — nel file: renderOnb
- `onbPick()` js/ui/onboarding.js:198 funzione window ← js/ui/onboarding-risultato.js:76 renderOnbResult (html) — nel file: optHtml
- `onbSetEta()` js/ui/onboarding.js:203 funzione window ← tests/split.test.js:347 (html), 349 (html) — nel file: renderOnb
- `onbToggleGoal()` js/ui/onboarding.js:217 funzione window ← nessun altro file — nel file: renderOnb
- `onbTogglePriorita()` js/ui/onboarding.js:225 funzione window ← nessun altro file — nel file: renderOnb
- `onbToggleFastidio()` js/ui/onboarding.js:231 funzione window ← nessun altro file — nel file: renderOnb
- `ONB_LUOGHI` js/ui/onboarding.js:239 costante ← nessun altro file — nel file: renderOnb
- `ONB_FASTIDI` js/ui/onboarding.js:244 costante ← nessun altro file — nel file: renderOnb
- `ONB_PARQ` js/ui/onboarding.js:251 costante ← nessun altro file — nel file: renderOnb
- `PARQ_DOMANDE` js/ui/onboarding.js:255 costante ← nessun altro file — nel file: renderOnb
- `ONB_SONNO` js/ui/onboarding.js:256 costante ← nessun altro file — nel file: descSonnoBene, renderOnb
- `ONB_ATTREZZI` js/ui/onboarding.js:261 costante ← nessun altro file — nel file: renderOnb
- `chip()` js/ui/onboarding.js:267 funzione ← js/coach/psicologia.js:93 renderPsicoStep — nel file: htmlAttrezziOnboarding, htmlForzaOnboarding, renderOnb
- `TESTO_AVVISO_MASSA_DIMAGRIMENTO` js/ui/onboarding.js:274 costante ← nessun altro file — nel file: htmlAvvisoObiettivi
- `TESTO_AVVISO_MASSA_DIMAGRIMENTO_SE_RESTANO` js/ui/onboarding.js:275 costante ← nessun altro file — nel file: htmlAvvisoObiettivi
- `htmlAvvisoObiettivi()` js/ui/onboarding.js:276 funzione ← tests/split.test.js:226 (html), 227 (html), 228 (html), 317 (html), 385 (html) — nel file: renderOnb
- `onbUsaRicomposizione()` js/ui/onboarding.js:285 funzione window ← tests/split.test.js:235 (html), 239 (html), 241 (html) — nel file: htmlAvvisoObiettivi
- `TESTO_TONIFICARE` js/ui/onboarding.js:294 costante ← nessun altro file — nel file: htmlNotaTonificare
- `htmlNotaTonificare()` js/ui/onboarding.js:295 funzione ← tests/split.test.js:251 (html), 252 (html), 386 (html) — nel file: renderOnb
- `htmlAvvisoGiorni()` js/ui/onboarding.js:299 funzione ← tests/split.test.js:278 (html), 279 (html), 280 (html), 281 (html), 387 (html) — nel file: renderOnb
- `descSonnoBene()` js/ui/onboarding.js:305 funzione ← tests/split.test.js:292 (html), 388 (html) — nel file: onbSetEta, renderOnb
- `ONB_ATTREZZI_NOMI` js/ui/onboarding.js:312 costante ← js/ui/opzioni/il-coach.js:74 htmlAttrezziCoach — nel file: htmlAttrezziOnboarding
- `NOTA_ULTIMO_ATTREZZO` js/ui/onboarding.js:315 costante ← js/ui/opzioni/il-coach.js:151 toggleCoachLista — nel file: htmlAttrezziOnboarding
- `onbAttrezziPalestra()` js/ui/onboarding.js:316 funzione ← nessun altro file — nel file: htmlAttrezziOnboarding, onbToggleAttrezzoPalestra
- `htmlAttrezziOnboarding()` js/ui/onboarding.js:317 funzione ← tests/attrezzi-onboarding.test.js:18 (html), 35 (html), 53 (html), 55 (html), 100 (html), 104 (html), … · tests/split.test.js:186 (html), 319 (html), 382 (html) — nel file: renderOnb
- `htmlForzaOnboarding()` js/ui/onboarding.js:345 funzione ← tests/forza-attivazione.test.js:18 (html) — nel file: renderOnb
- `onbTogglePuntoDebole()` js/ui/onboarding.js:355 funzione window ← tests/forza-attivazione.test.js:49 (html) — nel file: htmlForzaOnboarding
- `onbCambiaLista()` js/ui/onboarding.js:356 funzione ← nessun altro file — nel file: onbToggleAttrezzoPalestra, onbToggleExtraPalestra, onbToggleAttrezzoCasa
- `onbToggleAttrezzoPalestra()` js/ui/onboarding.js:361 funzione window ← tests/attrezzi-onboarding.test.js:24 (html), 26 (html), 101 (html), 105 (html), 109 (html), 112 (html) · tests/split.test.js:203 (html), 205 (html) — nel file: htmlAttrezziOnboarding
- `onbToggleExtraPalestra()` js/ui/onboarding.js:367 funzione window ← tests/attrezzi-onboarding.test.js:41 (html) · tests/split.test.js:203 (html) — nel file: htmlAttrezziOnboarding
- `onbToggleAttrezzoCasa()` js/ui/onboarding.js:368 funzione window ← tests/attrezzi-onboarding.test.js:59 (html) · tests/split.test.js:198 (html) — nel file: htmlAttrezziOnboarding
- `onbNessunoExtraPalestra()` js/ui/onboarding.js:370 funzione window ← tests/attrezzi-onboarding.test.js:38 (html), 44 (html), 46 (html) — nel file: htmlAttrezziOnboarding
- `onbNessunoAttrezzoCasa()` js/ui/onboarding.js:371 funzione window ← tests/attrezzi-onboarding.test.js:56 (html), 62 (html) — nel file: htmlAttrezziOnboarding
- `onbSetManubriKg()` js/ui/onboarding.js:372 funzione window ← tests/split.test.js:198 (html), 200 (html) — nel file: htmlAttrezziOnboarding
- `renderOnb()` js/ui/onboarding.js:377 funzione ← js/coach/bia/lettore.js:253 applyBiaValues · js/coach/programma/alternative.js:8 altraVariante, 31 applicaAlternative · js/coach/psicologia.js:77 onbPsico, 98 onbMomento · tests/split.test.js:328 (html) · tests/browser/onboarding-attrezzi.js:16 · tests/browser/onboarding-forza.js:16 · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbPrev, onbNext, onbSetTest, onbPick, onbToggleGoal, onbTogglePriorita, onbToggleFastidio, …
- `optHtml()` js/ui/onboarding.js:465 funzione ← nessun altro file — nel file: htmlForzaOnboarding, renderOnb
- `renderBiaStep()` js/ui/onboarding.js:479 funzione ← nessun altro file — nel file: renderOnb
- `onbManuale` js/ui/onboarding.js:533 variabile ← nessun altro file — nel file: renderBiaStep, onbToggleManuale
- `onbToggleManuale()` js/ui/onboarding.js:534 funzione window ← nessun altro file — nel file: renderBiaStep
- `biaField()` js/ui/onboarding.js:539 funzione ← nessun altro file — nel file: renderBiaStep
- `bindBiaInputs()` js/ui/onboarding.js:544 funzione ← nessun altro file — nel file: renderOnb
- `ensurePdfJs()` js/ui/onboarding.js:558 funzione ← js/coach/bia/lettore.js:221 handleBiaPdf · js/coach/bia/opzioni.js:101 agentBiaPdf · js/ui/importa-progressi.js:121 testoDaPdfRighe

## js/coach

### `js/coach/bia/soglie-bia.js`

- `SOGLIE_BIA` js/coach/bia/soglie-bia.js:12 costante ← js/coach/compone.js:21 proteineGKg

### `js/coach/bia/lettore.js`

- `numIt()` js/coach/bia/lettore.js:13 funzione ← nessun altro file — nel file: parseInBody
- `parseInBody()` js/coach/bia/lettore.js:15 funzione window ← nessun altro file — nel file: parseBiaText
- `parseBiaText()` js/coach/bia/lettore.js:100 funzione window ← js/coach/bia/opzioni.js:108 agentBiaPdf — nel file: handleBiaPdf
- `handleBiaPdf()` js/coach/bia/lettore.js:213 funzione window ← js/ui/onboarding.js:546 bindBiaInputs
- `applyBiaValues()` js/coach/bia/lettore.js:237 funzione window ← nessun altro file — nel file: handleBiaPdf
- `TESTO_BIA_GRASSO_BASSO` js/coach/bia/lettore.js:267 costante ← nessun altro file — nel file: analyzeBia
- `analyzeBia()` js/coach/bia/lettore.js:268 funzione window ← js/ui/onboarding-risultato.js:7 renderOnbResult · js/coach/compone.js:44 fattoreFisico

### `js/coach/programma/motore.js`

- `attrezzoDi()` js/coach/programma/motore.js:17 funzione ← js/dati/dettagli-esercizi.js ×1 · js/ui/allenamento/seduta.js ×1 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/figura-anatomica.js ×1 · js/coach/programma/ricette.js ×2 · js/coach/volume/tempo.js ×1 · js/coach/carichi/partenza.js ×6 · js/coach/carichi/attrezzi.js ×3 · js/coach/questionario-decisioni.js ×1 · js/ui/seduta-libera.js ×3 · js/coach/biomeccanica.js ×1 · js/dati/scheda-unica.js ×1 · tests/attrezzi-dichiarati.test.js ×1 · tests/memoria-chiamata.test.js ×1 · tests/scarichi.test.js ×1 · tests/browser/dettagli-esercizi.js ×1 · tests/browser/macchinario-occupato-profilo.js ×1 — nel file: consentitoCalcolo, sostituto, alternativeStessoMuscolo
- `attrezzoDiCalcolo()` js/coach/programma/motore.js:24 funzione ← nessun altro file — nel file: attrezzoDi
- `RISCHIO` js/coach/programma/motore.js:44 costante ← nessun altro file — nel file: consentitoCalcolo
- `ECCEZIONI_RISCHIO` js/coach/programma/motore.js:57 costante ← nessun altro file — nel file: eccezioneRischio
- `senzaMacchine()` js/coach/programma/motore.js:61 funzione ← nessun altro file — nel file: ECCEZIONI_RISCHIO
- `ATTREZZI_NON_DI_CASA` js/coach/programma/motore.js:69 costante ← nessun altro file — nel file: attrezzoDiCasaMancante
- `ATTREZZI_NON_CON_I_MANUBRI` js/coach/programma/motore.js:70 costante ← nessun altro file — nel file: attrezzoDiCasaMancante
- `attrezzoFisicoDi()` js/coach/programma/motore.js:71 funzione ← nessun altro file — nel file: attrezzoDiCasaMancante, consentitoCalcolo
- `chiedeAttrezzo()` js/coach/programma/motore.js:74 funzione ← nessun altro file — nel file: consentitoCalcolo
- `attrezzoDiCasaMancante()` js/coach/programma/motore.js:78 funzione ← nessun altro file — nel file: consentitoCalcolo
- `ATTREZZI_NON_DICHIARABILI_IN_PALESTRA` js/coach/programma/motore.js:85 costante ← nessun altro file — nel file: consentitoCalcolo
- `ATTREZZI_EXTRA_DEI_DATI` js/coach/programma/motore.js:92 costante ← nessun altro file — nel file: attrezzoExtraDi
- `attrezzoExtraDi()` js/coach/programma/motore.js:93 funzione ← nessun altro file — nel file: attrezziDichiaratiEsito, consentitoCalcolo
- `dichiaratiDi()` js/coach/programma/motore.js:98 funzione ← nessun altro file — nel file: attrezziDichiaratiEsito, consentitoCalcolo
- `attrezziDichiaratiEsito()` js/coach/programma/motore.js:101 funzione ← nessun altro file — nel file: consentitoCalcolo
- `eccezioneRischio()` js/coach/programma/motore.js:116 funzione ← nessun altro file — nel file: consentitoCalcolo
- `consentito()` js/coach/programma/motore.js:122 funzione ← js/coach/catalogo-regole.js ×1 · js/coach/programma/ricette.js ×7 · js/coach/programma/struttura-pro.js ×3 · js/coach/programma/completamenti.js ×9 · js/coach/volume/volume.js ×1 · js/coach/volume/tempo.js ×1 · js/coach/specialita/forza.js ×1 · js/coach/carichi/partenza.js ×1 · tests/attrezzi-dichiarati.test.js ×1 · tests/attributi.test.js ×1 · tests/fastidi.test.js ×10 · tests/forza-struttura.test.js ×1 · tests/hip-hinge-ripiego.test.js ×2 · tests/integrazione-onda2c.test.js ×1 · tests/memoria-chiamata.test.js ×1 — nel file: cerniereConCaricoConsentite, alternativeStessoMuscolo
- `cerniereConCaricoConsentite()` js/coach/programma/motore.js:136 funzione ← nessun altro file — nel file: consentitoCalcolo
- `consentitoCalcolo()` js/coach/programma/motore.js:139 funzione ← nessun altro file — nel file: consentito
- `sostituto()` js/coach/programma/motore.js:169 funzione ← js/coach/repertorio.js:157 azioneCoach · js/dati/schede-tecniche.js:224 preferisci
- `alternativeStessoMuscolo()` js/coach/programma/motore.js:187 funzione ← js/ui/allenamento/macchinario-occupato.js:75 alternativeOggi · js/coach/programma/alternative.js:16 alternativeDi · js/coach/carichi/partenza.js:272 varianteSenzaBilanciere · js/coach/questionario-decisioni.js:89 varianteStessoMuscolo · tests/aiuto-genera.js:75 conScelte (html) — nel file: sostituto
- `schemaMisto()` js/coach/programma/motore.js:212 funzione ← js/coach/regia/brief.js:150 briefCoach

### `js/coach/programma/schemi.js`

- `SCHEMI_MOV` js/coach/programma/schemi.js:22 costante ← js/coach/programma/completamenti.js:115 completaSettimana · js/coach/repertorio.js:266 controlloSchemi · js/dati/schede-tecniche.js:200 preferenzaEsercizio — nel file: schemaDi
- `SCHEMI_RISERVA` js/coach/programma/schemi.js:30 costante ← js/coach/programma/struttura-pro.js:95 strEtirata — nel file: schemaDi
- `schemaDi()` js/coach/programma/schemi.js:33 funzione ← js/coach/programma/motore.js:192 alternativeStessoMuscolo · js/coach/programma/ricette.js:20 SLOT_DEF · js/coach/programma/struttura-pro.js:56 strChiave, 93 strEspinta, 95 strEtirata, 169 strBilancia, 254 strAntagonisti · js/coach/programma/completamenti.js:31 schemaDiGambe, 106 completaSettimana, 282 rinforzaFemorali · js/coach/volume/volume.js:43 creditoSerie, 527 volumeMotore · js/coach/volume/tempo.js:74 infoTempo, 410 scalaDelTempoBase, 589 adattaAlTempo · js/coach/specialita/forza.js:218 forzaSchema, 414 forzaEquilibra · js/coach/repertorio.js:265 controlloSchemi · js/coach/biomeccanica.js:23 cueEsercizio · js/dati/schede-tecniche.js:200 preferenzaEsercizio · js/dati/scheda-unica.js:27 schedaUnica · tests/forza-equilibrio.test.js:25 (html) · tests/memoria-chiamata.test.js:17 (html), 43 (html) · tests/browser/coerenza-schede.js:38, 47, 65, 73, 80
- `ISOLAMENTI` js/coach/programma/schemi.js:42 costante ← nessun altro file — nel file: isolamentoDi
- `isolamentoDi()` js/coach/programma/schemi.js:47 funzione ← js/dati/scheda-unica.js:28 schedaUnica
- `IN_ALLUNGAMENTO` js/coach/programma/schemi.js:51 costante ← nessun altro file — nel file: inAllungamento
- `IN_ALLUNGAMENTO_NUOVI` js/coach/programma/schemi.js:54 costante ← nessun altro file — nel file: inAllungamento
- `SCAMBI_ALLUNGAMENTO_NUOVI` js/coach/programma/schemi.js:57 costante ← nessun altro file — nel file: scambiAllungamento
- `inAllungamento()` js/coach/programma/schemi.js:58 funzione ← js/coach/programma/motore.js:170 sostituto · js/coach/programma/ricette.js:194 componiSedute · js/dati/scheda-unica.js:29 schedaUnica · tests/browser/regole-nuove.js:44
- `scambiAllungamento()` js/coach/programma/schemi.js:65 funzione ← js/coach/programma/ricette.js:278 componiSedute
- `SCAMBI_ALLUNGAMENTO` js/coach/programma/schemi.js:66 costante ← nessun altro file — nel file: scambiAllungamento
- `SCHIENA_PESANTE` js/coach/programma/schemi.js:68 costante ← js/coach/programma/ricette.js:172 componiSedute · js/coach/volume/volume.js:512 volumeMotore — nel file: schienaLombare
- `schienaLombare()` js/coach/programma/schemi.js:73 funzione ← js/coach/programma/struttura-pro.js:27 strSchiena · js/coach/volume/volume.js:512 volumeMotore · tests/browser/coerenza-schede.js:65
- `GLUTEI_FAMIGLIE` js/coach/programma/schemi.js:78 costante ← js/coach/programma/completamenti.js:134 completaSettimana
- `VOLUME_LIVELLO` js/coach/programma/schemi.js:82 costante ← js/coach/volume/volume.js:1090 assegnaVolumeGruppi
- `GRUPPI_PRINCIPALI` js/coach/programma/schemi.js:83 costante ← js/ui/onboarding.js:442 renderOnb · js/coach/volume/volume.js:1108 assegnaVolumeGruppi · js/ui/opzioni/il-coach.js:26 paginaCoach · js/ui/progressi/riepilogo.js:44 faticaMuscoli
- `libNome()` js/coach/programma/schemi.js:84 funzione ← nessun altro file

### `js/coach/programma/ricette.js`

- `rngDa()` js/coach/programma/ricette.js:13 funzione ← nessun altro file — nel file: componiSedute
- `_n()` js/coach/programma/ricette.js:18 funzione ← nessun altro file — nel file: SLOT_DEF
- `SLOT_DEF` js/coach/programma/ricette.js:19 costante ← js/coach/programma/motore.js:137 cerniereConCaricoConsentite · js/coach/programma/struttura-pro.js:190 strBilancia, 265 strBassoMulti · js/coach/volume/tempo.js:596 adattaAlTempo · js/coach/specialita/forza.js:352 forzaSedute, 450 forzaFaSchema — nel file: componiSedute
- `RICETTE` js/coach/programma/ricette.js:40 costante ← nessun altro file — nel file: componiSedute
- `PRIORI` js/coach/programma/ricette.js:53 costante ← js/dati/dettagli-esercizi.js:372 ordineEsercizi · js/coach/programma/motore.js:199 alternativeStessoMuscolo · js/coach/programma/struttura-pro.js:192 strBilancia, 227 strCoreNuovo · js/coach/volume/volume.js:518 volumeMotore · js/coach/volume/tempo.js:555 serieSottoFascia · js/ui/importa-progressi.js:41 riconosciEsercizio — nel file: componiSedute
- `RIPIEGO_HINGE` js/coach/programma/ricette.js:73 costante ← js/coach/programma/motore.js:137 cerniereConCaricoConsentite, 143 consentitoCalcolo · js/coach/programma/struttura-pro.js:38 strRango · js/coach/volume/serie-ripetizioni.js:63 prescriviSeduta · js/coach/volume/volume.js:343 volumeMotore · js/coach/volume/tempo.js:596 adattaAlTempo · js/coach/regia/genera.js:258 chiudiProgramma — nel file: componiSedute
- `SCHEMI_ATTESI` js/coach/programma/ricette.js:74 costante ← nessun altro file — nel file: componiSedute
- `SLOT_PER_SCHEMA` js/coach/programma/ricette.js:75 costante ← js/coach/specialita/forza.js:451 forzaFaSchema — nel file: componiSedute
- `adattoAllaSeduta()` js/coach/programma/ricette.js:77 funzione ← js/coach/volume/volume.js:574 volumeMotore · js/coach/volume/tempo.js:549 serieSottoFascia — nel file: componiSedute
- `RIPETIZIONI_SETTIMANA_MAX` js/coach/programma/ricette.js:88 costante ← js/coach/programma/completamenti.js:185 completaSettimana — nel file: maxSettimana
- `PARAM_NORDIC` js/coach/programma/ricette.js:92 costante ← js/coach/programma/completamenti.js:183 completaSettimana, 275 rinforzaFemorali · js/coach/volume/serie-ripetizioni.js:62 prescriviSeduta · js/coach/volume/volume.js:342 volumeMotore · js/coach/regia/genera.js:189 applicaMetodo, 256 chiudiProgramma — nel file: maxSettimana, ripetizioniFlessione, componiSedute
- `RX_NORDIC` js/coach/programma/ricette.js:93 costante ← js/coach/programma/completamenti.js:175 completaSettimana, 275 rinforzaFemorali · js/coach/volume/serie-ripetizioni.js:62 prescriviSeduta · js/coach/volume/volume.js:342 volumeMotore · js/coach/volume/tempo.js:58 infoTempo, 557 serieSottoFascia · js/coach/regia/genera.js:189 applicaMetodo, 256 chiudiProgramma — nel file: maxSettimana, ripetizioniFlessione, componiSedute
- `maxSettimana()` js/coach/programma/ricette.js:94 funzione ← js/coach/programma/completamenti.js:180 completaSettimana, 272 rinforzaFemorali · js/coach/volume/volume.js:573 volumeMotore · js/coach/volume/tempo.js:548 serieSottoFascia — nel file: componiSedute
- `ripetizioniFlessione()` js/coach/programma/ricette.js:95 funzione ← js/coach/programma/completamenti.js:183 completaSettimana, 275 rinforzaFemorali · js/coach/volume/serie-ripetizioni.js:62 prescriviSeduta · js/coach/volume/tempo.js:557 serieSottoFascia · js/coach/regia/genera.js:189 applicaMetodo
- `GRUPPI_DELLA_SEDUTA` js/coach/programma/ricette.js:97 costante ← js/coach/volume/tempo.js:544 serieSottoFascia — nel file: adattoAllaSeduta, componiSedute
- `componiSedute()` js/coach/programma/ricette.js:110 funzione ← js/coach/regia/genera.js:358 generaProgramma

### `js/coach/programma/struttura-pro.js`

- `STR_PESI` js/coach/programma/struttura-pro.js:23 costante ← js/coach/volume/volume.js:261 volumeMotore, 1074 limitaVolumePerMuscolo · js/coach/specialita/forza.js:397 forzaEquilibra — nel file: strBilancia, strFinale
- `strMeta()` js/coach/programma/struttura-pro.js:25 funzione ← js/coach/programma/completamenti.js:318 ordinaSedute · js/coach/regia/genera.js:284 NOTE_REGIONALI — nel file: strTier, strOrdina, strChiave, strCopri, strBilancia, strCoreNuovo, strFinale, strAntagonisti, …
- `strSub()` js/coach/programma/struttura-pro.js:26 funzione ← js/coach/regia/genera.js:284 NOTE_REGIONALI — nel file: strTier, strCopri, strAntagonisti
- `strSchiena()` js/coach/programma/struttura-pro.js:27 funzione ← js/coach/programma/ricette.js:200 componiSedute
- `strTier()` js/coach/programma/struttura-pro.js:31 funzione ← nessun altro file — nel file: strRango, strSuperserie
- `strRango()` js/coach/programma/struttura-pro.js:38 funzione ← nessun altro file — nel file: strOrdina
- `strOrdina()` js/coach/programma/struttura-pro.js:42 funzione window ← js/coach/programma/ricette.js:284 componiSedute · js/coach/programma/completamenti.js:289 rinforzaFemorali · js/coach/volume/volume.js:855 volumeMotore · js/coach/volume/tempo.js:561 serieSottoFascia · tests/forza-ordine-alzata.test.js:17 (html), 23 (html), 30 (html), 34 (html) · tests/browser/coerenza-schede.js:133 — nel file: strCopri, strBilancia
- `strChiave()` js/coach/programma/struttura-pro.js:52 funzione ← tests/memoria-chiamata.test.js:43 (html) — nel file: strRidondante, strTerzoUguale
- `strRidondante()` js/coach/programma/struttura-pro.js:60 funzione window ← js/coach/programma/ricette.js:198 componiSedute · js/coach/volume/volume.js:575 volumeMotore · js/coach/volume/tempo.js:549 serieSottoFascia — nel file: strBilancia
- `strTerzoUguale()` js/coach/programma/struttura-pro.js:69 funzione window ← js/coach/programma/ricette.js:233 componiSedute
- `strSquatDoppio()` js/coach/programma/struttura-pro.js:78 funzione window ← js/coach/programma/ricette.js:172 componiSedute · js/coach/volume/volume.js:575 volumeMotore
- `strSerie()` js/coach/programma/struttura-pro.js:86 funzione ← js/coach/volume/volume.js:1073 limitaVolumePerMuscolo · js/coach/volume/tempo.js:471 scalaDelTempoBase, 520 serieSottoFascia, 652 rifinisciAlTempo — nel file: strBilancia
- `STR_FATICA` js/coach/programma/struttura-pro.js:90 costante ← js/coach/volume/volume.js:341 volumeMotore · js/coach/volume/tempo.js:524 serieSottoFascia · tests/browser/coerenza-schede.js:54, 58 — nel file: strFinale
- `STR_TIRATE_ALTE` js/coach/programma/struttura-pro.js:91 costante ← js/coach/regia/genera.js:283 NOTE_REGIONALI — nel file: strEtirata, strCopri
- `strEspinta()` js/coach/programma/struttura-pro.js:93 funzione ← js/coach/volume/volume.js:353 volumeMotore, 1073 limitaVolumePerMuscolo · js/coach/volume/tempo.js:471 scalaDelTempoBase, 520 serieSottoFascia, 652 rifinisciAlTempo · js/coach/specialita/forza.js:396 forzaEquilibra · tests/forza-equilibrio.test.js:36 conti (html) — nel file: strCopri, strBilancia
- `strEtirata()` js/coach/programma/struttura-pro.js:95 funzione ← js/coach/volume/volume.js:353 volumeMotore, 1072 limitaVolumePerMuscolo · js/coach/volume/tempo.js:432 scalaDelTempoBase, 520 serieSottoFascia, 645 rifinisciAlTempo · js/coach/specialita/forza.js:401 forzaEquilibra · tests/forza-equilibrio.test.js:36 conti (html) — nel file: strBilancia
- `strCopri()` js/coach/programma/struttura-pro.js:98 funzione window ← js/coach/programma/completamenti.js:249 completaSettimana · tests/generatore-onda0b.test.js:146 (html) · tests/browser/coerenza-schede.js:118
- `strBilancia()` js/coach/programma/struttura-pro.js:158 funzione window ← js/coach/regia/genera.js:195 applicaMetodo, 364 generaProgramma · tests/integrazione-onda2c.test.js:144 (html), 149 (html)
- `strCoreNuovo()` js/coach/programma/struttura-pro.js:225 funzione ← nessun altro file — nel file: strBilancia
- `STR_NOTA_TIRATE` js/coach/programma/struttura-pro.js:230 costante ← nessun altro file — nel file: strBilancia
- `strFinale()` js/coach/programma/struttura-pro.js:235 funzione window ← js/coach/regia/genera.js:369 generaProgramma
- `strAntagonisti()` js/coach/programma/struttura-pro.js:253 funzione ← js/coach/volume/tempo.js:683 coppiaValida — nel file: strSuperserie
- `strPuoSuperserie()` js/coach/programma/struttura-pro.js:261 funzione ← js/coach/volume/tempo.js:683 coppiaValida — nel file: strSuperserie
- `strPiccoloMulti()` js/coach/programma/struttura-pro.js:264 funzione window ← js/coach/programma/completamenti.js:318 ordinaSedute — nel file: strSuperserie
- `strBassoMulti()` js/coach/programma/struttura-pro.js:265 funzione window ← js/coach/programma/completamenti.js:321 ordinaSedute — nel file: strSuperserie
- `strSuperserie()` js/coach/programma/struttura-pro.js:267 funzione window ← js/coach/volume/tempo.js:401 scalaDelTempoBase · js/coach/volume/tecniche.js:89 assegnaTecniche · js/coach/regia/genera.js:199 applicaMetodo · js/coach/metodi-momenti.js:20 coppiePerMuscolo · js/coach/compone.js:108 TOCCHI

### `js/coach/programma/soglie-struttura.js`

- `SOGLIE_STRUTTURA` js/coach/programma/soglie-struttura.js:16 costante ← js/coach/programma/mesociclo.js:44 sogliaStruttura

### `js/coach/programma/soglie-selezione.js`

- `SOGLIE_SELEZIONE` js/coach/programma/soglie-selezione.js:11 costante ← nessun altro file — nel file: sogliaSelezione
- `sogliaSelezione()` js/coach/programma/soglie-selezione.js:34 funzione ← js/coach/programma/ricette.js:117 componiSedute · js/coach/programma/completamenti.js:42 squatOltreMax, 68 copriCuffia · js/coach/sicurezza/vincoli.js:48 vincoliSicurezza

### `js/coach/programma/soglie-split.js`

- `SOGLIE_SPLIT` js/coach/programma/soglie-split.js:11 costante ← js/coach/regia/genera.js:87 sogliaSplit

### `js/coach/programma/mesociclo.js`

- `STRUTTURA_V1` js/coach/programma/mesociclo.js:32 costante ← nessun altro file — nel file: strutturaProgramma
- `CLASSI_PIANO` js/coach/programma/mesociclo.js:39 costante ← nessun altro file — nel file: rirDellaSettimana, controlloOttavaPrincipiante
- `RIGA_RIR_DI_CLASSE` js/coach/programma/mesociclo.js:40 costante ← nessun altro file — nel file: rirDellaSettimana
- `sogliaStruttura()` js/coach/programma/mesociclo.js:43 funzione ← js/coach/sicurezza/scarico.js:67 doseDelLivello · tests/scarichi.test.js:73 (html) — nel file: pianoAttivo, strutturaProgramma, contestoPiano, doseInizialeScarico, rirDellaSettimana, fattoreVolumeSettimana, costruisciPiano, esitoControlloPrincipiante, …
- `copiaPiano()` js/coach/programma/mesociclo.js:46 funzione ← nessun altro file — nel file: costruisciPiano
- `pianoAttivo()` js/coach/programma/mesociclo.js:48 funzione ← nessun altro file — nel file: strutturaProgramma, pianoMesociclo, controlloOttavaPrincipiante, rirPianoSettimana
- `strutturaProgramma()` js/coach/programma/mesociclo.js:54 funzione ← js/coach/catalogo-regole.js:26 COACH_REGOLE (html) · tests/genera-stadi.test.js:221 (html) · tests/mesociclo.test.js:66 (html), 351 (html), 352 (html) · tests/sicurezza-onda0.test.js:302 (html), 303 (html), 305 (html), 306 (html), 307 (html), 308 (html), … — nel file: pianoMesociclo
- `fasiProgramma()` js/coach/programma/mesociclo.js:66 funzione ← tests/genera-stadi.test.js:221 (html) · tests/mesociclo.test.js:73 (html) · tests/sicurezza-onda0.test.js:303 (html), 306 (html) — nel file: pianoMesociclo
- `arrotonda2()` js/coach/programma/mesociclo.js:74 funzione ← nessun altro file — nel file: fattoreVolumeSettimana
- `colonnaDelBlocco()` js/coach/programma/mesociclo.js:77 funzione ← nessun altro file — nel file: rirDellaSettimana, fattoreVolumeSettimana
- `rirConPiso()` js/coach/programma/mesociclo.js:79 funzione ← nessun altro file — nel file: rirDellaSettimana, rirPianoSettimana
- `contestoPiano()` js/coach/programma/mesociclo.js:85 funzione ← nessun altro file — nel file: costruisciPiano, pianoMesociclo
- `doseInizialeScarico()` js/coach/programma/mesociclo.js:98 funzione ← nessun altro file — nel file: costruisciPiano
- `rirDellaSettimana()` js/coach/programma/mesociclo.js:104 funzione ← nessun altro file — nel file: costruisciPiano
- `fattoreVolumeSettimana()` js/coach/programma/mesociclo.js:139 funzione ← nessun altro file — nel file: costruisciPiano
- `costruisciPiano()` js/coach/programma/mesociclo.js:153 funzione ← nessun altro file — nel file: pianoMesociclo
- `notaDelPiano()` js/coach/programma/mesociclo.js:194 funzione ← nessun altro file — nel file: pianoMesociclo
- `pianoMesociclo()` js/coach/programma/mesociclo.js:210 funzione ← js/coach/regia/genera.js:350 generaProgramma · tests/tempo-copertura.test.js:20 esegui (html)
- `esitoControlloPrincipiante()` js/coach/programma/mesociclo.js:239 funzione ← tests/mesociclo.test.js:129 (html) — nel file: controlloOttavaPrincipiante
- `segnaliControlloOttava()` js/coach/programma/mesociclo.js:250 funzione ← nessun altro file — nel file: controlloOttavaPrincipiante
- `CAUSE_CONTROLLO_OTTAVA` js/coach/programma/mesociclo.js:263 costante ← nessun altro file — nel file: controlloOttavaPrincipiante
- `controlloOttavaPrincipiante()` js/coach/programma/mesociclo.js:275 funzione ← js/coach/carichi/progressivo.js:110 settimanaProgramma
- `settimanaDelPiano()` js/coach/programma/mesociclo.js:330 funzione ← nessun altro file — nel file: pianoDellaSettimana, rirPianoSettimana
- `pianoDellaSettimana()` js/coach/programma/mesociclo.js:345 funzione ← tests/mesociclo.test.js:323 (html)
- `classeRirDi()` js/coach/programma/mesociclo.js:352 funzione ← js/coach/volume/rampa-settimana.js:40 serieDellaSettimana — nel file: rirPianoSettimana
- `rirPianoSettimana()` js/coach/programma/mesociclo.js:362 funzione ← js/coach/catalogo-regole.js:208 COACH_REGOLE (html) · js/coach/regole-ricerca.js:137 rirDalPiano · tests/integrazione-onda2b.test.js:36 (html), 38 (html), 39 (html), 40 (html), 48 (html), 53 (html), … · tests/mesociclo.test.js:34 rir (html), 321 (html), 322 (html), 345 (html)

### `js/coach/programma/completamenti.js`

- `NOTA_REMATORE_INVERSO` js/coach/programma/completamenti.js:13 costante ← js/coach/regia/genera.js:261 chiudiProgramma
- `NOTA_FEMORALI_SENZA_LEG_CURL` js/coach/programma/completamenti.js:14 costante ← js/coach/regia/genera.js:311 riconciliaNote — nel file: completaSettimana
- `FLESSIONI_GINOCCHIO` js/coach/programma/completamenti.js:18 costante ← nessun altro file — nel file: completaSettimana, rinforzaFemorali
- `NOTA_FEMORALI_SERVE_FLESSIONE` js/coach/programma/completamenti.js:19 costante ← js/coach/regia/genera.js:312 riconciliaNote — nel file: completaSettimana
- `eCernieraFemorali()` js/coach/programma/completamenti.js:22 funzione ← nessun altro file — nel file: completaSettimana
- `schemaDiGambe()` js/coach/programma/completamenti.js:30 funzione ← nessun altro file — nel file: eMultiDiGambe, squatOltreMax, secondoDiGambe
- `eMultiDiGambe()` js/coach/programma/completamenti.js:35 funzione ← js/coach/programma/struttura-pro.js:265 strBassoMulti — nel file: squatOltreMax, secondoDiGambe
- `squatOltreMax()` js/coach/programma/completamenti.js:41 funzione ← js/coach/programma/ricette.js:172 componiSedute · js/coach/volume/volume.js:575 volumeMotore
- `secondoDiGambe()` js/coach/programma/completamenti.js:50 funzione ← js/coach/volume/tempo.js:362 scalaDelTempo — nel file: completaSettimana
- `CUFFIA_ESERCIZI` js/coach/programma/completamenti.js:63 costante ← nessun altro file — nel file: copriCuffia
- `CUFFIA_ROTAZIONE` js/coach/programma/completamenti.js:64 costante ← nessun altro file — nel file: copriCuffia
- `RX_CUFFIA` js/coach/programma/completamenti.js:65 costante ← js/coach/regia/genera.js:289 NOTE_REGIONALI — nel file: copriCuffia
- `NOTA_CUFFIA` js/coach/programma/completamenti.js:66 costante ← nessun altro file — nel file: copriCuffia
- `copriCuffia()` js/coach/programma/completamenti.js:67 funzione ← nessun altro file — nel file: completaSettimana
- `completaSettimana()` js/coach/programma/completamenti.js:99 funzione ← js/coach/regia/genera.js:361 generaProgramma
- `rinforzaFemorali()` js/coach/programma/completamenti.js:258 funzione ← js/coach/volume/tempo.js:616 adattaAlTempo
- `ordinaSedute()` js/coach/programma/completamenti.js:312 funzione ← js/coach/regia/genera.js:372 generaProgramma

### `js/coach/volume/serie-ripetizioni.js`

- `adattoAlCincoPerCinque()` js/coach/volume/serie-ripetizioni.js:19 funzione ← nessun altro file — nel file: prescriviSeduta
- `prescriviSeduta()` js/coach/volume/serie-ripetizioni.js:26 funzione ← js/coach/programma/ricette.js:295 componiSedute · js/coach/volume/volume.js:580 volumeMotore · js/coach/specialita/forza.js:333 forzaSedute, 420 forzaEquilibra — nel file: prescriviSerie
- `prescriviSerie()` js/coach/volume/serie-ripetizioni.js:76 funzione ← js/coach/regia/genera.js:359 generaProgramma

### `js/coach/volume/soglie-volume.js`

- `SOGLIE_VOLUME` js/coach/volume/soglie-volume.js:13 costante ← js/coach/volume/volume.js:87 sogliaVolume, 244 volumeNuovoAttivo

### `js/coach/volume/volume.js`

- `GRUPPI_FRAZIONARI` js/coach/volume/volume.js:28 costante ← js/coach/volume/tempo.js:510 sottoFascia, 529 serieSottoFascia — nel file: gruppoFrazionario, limitaVolumePerMuscolo
- `FRAZIONARI_NON_CONTATI` js/coach/volume/volume.js:34 costante ← nessun altro file — nel file: creditoSerie, creditiUnita
- `gruppoFrazionario()` js/coach/volume/volume.js:35 funzione ← nessun altro file — nel file: creditoSerie
- `creditoSerie()` js/coach/volume/volume.js:37 funzione ← js/coach/programma/completamenti.js:268 rinforzaFemorali · js/coach/volume/tempo.js:528 serieSottoFascia · tests/generatore-onda0b.test.js:183 (html) · tests/memoria-chiamata.test.js:43 (html) — nel file: frazionarieSettimana, frazGruppoSeduta, recuperoOk, volumeMotore, limitaVolumePerMuscolo
- `frazionarieSettimana()` js/coach/volume/volume.js:51 funzione ← js/coach/programma/completamenti.js:302 rinforzaFemorali · js/coach/volume/tempo.js:509 sottoFascia, 517 serieSottoFascia — nel file: limitaVolumePerMuscolo
- `GRUPPI_RECUPERO` js/coach/volume/volume.js:59 costante ← nessun altro file — nel file: recuperoRispettato, recuperoOk
- `frazGruppoSeduta()` js/coach/volume/volume.js:60 funzione ← tests/revisione-onda2d-giorni.test.js:48 (html) · tests/split.test.js:108 installaMisura (html) — nel file: recuperoRispettato, recuperoOk
- `giornoSeduta()` js/coach/volume/volume.js:61 funzione ← nessun altro file — nel file: recuperoRispettato, recuperoOk, volumeMotore
- `giorniAdiacenti()` js/coach/volume/volume.js:64 funzione ← js/coach/programma/ricette.js:146 componiSedute · js/coach/regia/genera.js:61 tipiAdiacenti, 68 riordinaSenzaAdiacenti, 107 conflittiDeiGiorni · tests/integrazione-onda2c.test.js:184 (html) · tests/revisione-onda2d-giorni.test.js:19 (html), 34 (html), 35 (html), 36 (html), 37 (html) · tests/split.test.js:109 installaMisura (html) — nel file: recuperoRispettato, recuperoOk, volumeMotore
- `recuperoRispettato()` js/coach/volume/volume.js:66 funzione ← js/coach/regia/genera.js:318 riconciliaNote · tests/revisione-onda2d-giorni.test.js:42 (html), 43 (html), 48 (html)
- `recuperoOk()` js/coach/volume/volume.js:73 funzione ← js/coach/programma/ricette.js:266 componiSedute · js/coach/programma/completamenti.js:180 completaSettimana, 272 rinforzaFemorali · js/coach/volume/tempo.js:531 serieSottoFascia · tests/generatore-onda0b.test.js:170 (html) · tests/integrazione-onda2c.test.js:101 (html), 102 (html), 105 (html) · tests/revisione-onda2d-giorni.test.js:40 (html), 41 (html)
- `sogliaVolume()` js/coach/volume/volume.js:87 funzione ← js/coach/volume/serie-ripetizioni.js:63 prescriviSeduta · js/coach/volume/tempo.js:348 frequenzaPersa · js/coach/regia/genera.js:258 chiudiProgramma · tests/integrazione-onda2c.test.js:115 (html) — nel file: unitaPriorita, bersagliVolume, volumeMotore, noteVolume
- `VOLUME_UNITA_GRANDI` js/coach/volume/volume.js:89 costante ← nessun altro file — nel file: bersagliVolume, volumeMotore, validaVolume
- `VOLUME_UNITA_GENERALE` js/coach/volume/volume.js:90 costante ← nessun altro file — nel file: bersagliVolume, validaVolume
- `VOLUME_ETICHETTE` js/coach/volume/volume.js:91 costante ← nessun altro file — nel file: volumeEtichetta
- `VOLUME_PRIORITA_UNITA` js/coach/volume/volume.js:95 costante ← nessun altro file — nel file: unitaPriorita, noteVolume
- `VOLUME_ZONA_UNITA` js/coach/volume/volume.js:98 costante ← nessun altro file — nel file: puoSpecializzare
- `VOLUME_GRUPPI_RECUPERO` js/coach/volume/volume.js:101 costante ← nessun altro file — nel file: volumeMotore
- `VOLUME_GRUPPI_SOMMA` js/coach/volume/volume.js:103 costante ← nessun altro file — nel file: volumeMotore
- `VOLUME_FREQUENZA_UNITA` js/coach/volume/volume.js:105 costante ← nessun altro file — nel file: volumeMotore
- `VOLUME_FREQUENZA_DIRETTE` js/coach/volume/volume.js:106 costante ← nessun altro file — nel file: volumeMotore
- `VOLUME_IMPORTANZA` js/coach/volume/volume.js:109 costante ← nessun altro file — nel file: volumeMotore
- `VOLUME_PESI` js/coach/volume/volume.js:116 costante ← nessun altro file — nel file: volumeMotore
- `volumeTipo()` js/coach/volume/volume.js:119 funzione ← nessun altro file — nel file: bersagliVolume
- `volumeEtichetta()` js/coach/volume/volume.js:120 funzione ← nessun altro file — nel file: noteVolume, validaVolume
- `unitaPriorita()` js/coach/volume/volume.js:124 funzione ← js/coach/catalogo-regole.js:272 COACH_REGOLE (html) · tests/volume.test.js:159 (html), 161 (html), 163 (html) — nel file: bersagliVolume, assegnaVolume
- `puoSpecializzare()` js/coach/volume/volume.js:135 funzione ← nessun altro file — nel file: bersagliVolume
- `bersagliVolume()` js/coach/volume/volume.js:148 funzione ← js/coach/catalogo-regole.js:222 COACH_REGOLE (html) · tests/integrazione-onda2c.test.js:124 (html), 155 (html) · tests/volume.test.js:30 bersagli (html) — nel file: assegnaVolume, puoSalireVolume, limitaVolume, pavimentoVolume, aggiungiSerieUtile, validaVolume
- `_creditiUnitaCache` js/coach/volume/volume.js:221 costante ← nessun altro file — nel file: creditiUnita
- `creditiUnita()` js/coach/volume/volume.js:222 funzione ← js/coach/volume/tempo.js:348 frequenzaPersa · tests/volume.test.js:34 seduteDirette (html) — nel file: volumeMotore, puoSalireVolume, limitaVolume
- `volumeUnita()` js/coach/volume/volume.js:240 funzione ← nessun altro file
- `volumeNuovoAttivo()` js/coach/volume/volume.js:243 funzione ← nessun altro file — nel file: assegnaVolume, puoSalireVolume, limitaVolume, pavimentoVolume, aggiungiSerieUtile, validaVolume
- `volumeMotore()` js/coach/volume/volume.js:250 funzione ← nessun altro file — nel file: assegnaVolume, limitaVolume, aggiungiSerieUtile, validaVolume
- `assegnaVolume()` js/coach/volume/volume.js:911 funzione ← js/coach/regia/genera.js:362 generaProgramma
- `puoSalireVolume()` js/coach/volume/volume.js:935 funzione ← js/coach/regia/genera.js:364 generaProgramma · tests/integrazione-onda2c.test.js:161 (html), 162 (html)
- `noteVolume()` js/coach/volume/volume.js:947 funzione ← js/coach/regia/genera.js:365 generaProgramma
- `limitaVolume()` js/coach/volume/volume.js:967 funzione ← js/coach/regia/genera.js:366 generaProgramma
- `pavimentoVolume()` js/coach/volume/volume.js:988 funzione ← js/coach/catalogo-regole.js:223 COACH_REGOLE (html) · js/coach/volume/tempo.js:322 pavimentoOk · tests/volume.test.js:93 (html), 94 (html), 95 (html), 97 (html)
- `aggiungiSerieUtile()` js/coach/volume/volume.js:997 funzione ← js/coach/volume/tempo.js:624 adattaAlTempo · tests/volume.test.js:280 (html), 285 (html), 288 (html)
- `NOTA_VOLUME_STRUTTURA` js/coach/volume/volume.js:1006 costante ← nessun altro file — nel file: validaVolume
- `NOTA_VOLUME_MANTENIMENTO` js/coach/volume/volume.js:1007 costante ← nessun altro file — nel file: validaVolume
- `validaVolume()` js/coach/volume/volume.js:1008 funzione ← js/coach/regia/genera.js:325 verificaProgramma · tests/integrazione-onda2c.test.js:276 (html)
- `limitaVolumePerMuscolo()` js/coach/volume/volume.js:1058 funzione ← tests/generatore-onda0b.test.js:301 (html), 309 (html) — nel file: limitaVolumeGruppi
- `assegnaVolumeGruppi()` js/coach/volume/volume.js:1087 funzione ← nessun altro file — nel file: assegnaVolume
- `limitaVolumeGruppi()` js/coach/volume/volume.js:1138 funzione ← nessun altro file — nel file: limitaVolume

### `js/coach/volume/tempo.js`

- `PARAM_NUMERO_ESERCIZI` js/coach/volume/tempo.js:21 costante ← js/coach/programma/ricette.js:256 componiSedute · js/coach/programma/struttura-pro.js:168 strBilancia · js/coach/programma/completamenti.js:197 completaSettimana · js/coach/specialita/forza.js:393 forzaEquilibra, 486 forzaPotaAlTempo — nel file: stimaEsercizi, adattaAlTempo
- `PARAM_TEMPO` js/coach/volume/tempo.js:28 costante ← js/coach/volume/volume.js:68 recuperoRispettato, 78 recuperoOk, 259 volumeMotore, 1144 limitaVolumeGruppi · js/coach/volume/tecniche.js:98 assegnaTecniche — nel file: durataSeduta, scalaDelTempo, scalaDelTempoBase, adattaAlTempo, rifinisciAlTempo
- `sogliaTempo()` js/coach/volume/tempo.js:36 funzione ← js/coach/volume/serie-ripetizioni.js:29 prescriviSeduta · js/coach/volume/volume.js:1032 validaVolume — nel file: serieEffettive, infoTempo, secSerieDa, durataCoppia, rampaDelleSerie, minutiRampa, minutiRiscaldamentoGenerale, fattoreTempo, …
- `tipoObiettivoDi()` js/coach/volume/tempo.js:38 funzione ← js/coach/volume/serie-ripetizioni.js:28 prescriviSeduta · js/coach/volume/volume.js:1144 limitaVolumeGruppi — nel file: obiettivoDellaSeduta, pausePerClasse, numeroEsercizi, scalaDelTempoBase, adattaAlTempo, riallineaPause
- `serieEffettive()` js/coach/volume/tempo.js:41 funzione ← nessun altro file — nel file: stimaEsercizi
- `round15()` js/coach/volume/tempo.js:47 funzione ← js/coach/volume/serie-ripetizioni.js:70 prescriviSeduta — nel file: limitiPausa
- `REGIONE_ALTO` js/coach/volume/tempo.js:52 costante ← nessun altro file — nel file: infoTempo
- `REGIONE_BASSO` js/coach/volume/tempo.js:52 costante ← nessun altro file — nel file: infoTempo
- `_infoTempo` js/coach/volume/tempo.js:53 costante ← nessun altro file — nel file: infoTempo
- `infoTempo()` js/coach/volume/tempo.js:54 funzione ← nessun altro file — nel file: durataEsercizio, durataCoppia, rampaDelleSerie, minutiRiscaldamentoGenerale, classePausa, limitiPausa, pavimentoOk, scalaDelTempoBase, …
- `secSerieDa()` js/coach/volume/tempo.js:81 funzione ← nessun altro file — nel file: durataEsercizio, durataCoppia, stimaEsercizi
- `pausaDi()` js/coach/volume/tempo.js:86 funzione ← nessun altro file — nel file: durataEsercizio, durataCoppia, durataSeduta
- `durataEsercizio()` js/coach/volume/tempo.js:88 funzione ← nessun altro file — nel file: durataSeduta
- `durataCoppia()` js/coach/volume/tempo.js:95 funzione ← nessun altro file — nel file: durataSeduta
- `rampaDelleSerie()` js/coach/volume/tempo.js:102 funzione ← nessun altro file — nel file: minutiRampa
- `minutiRampa()` js/coach/volume/tempo.js:132 funzione ← tests/tempo.test.js:89 (html), 96 (html), 98 (html) — nel file: durataSeduta
- `minutiRiscaldamentoGenerale()` js/coach/volume/tempo.js:147 funzione ← tests/tempo.test.js:89 (html), 96 (html), 98 (html) — nel file: durataSeduta
- `_contestoTempo` js/coach/volume/tempo.js:157 variabile ← nessun altro file — nel file: impostaContestoTempo, liberaContestoTempo, opzioniTempoCorrenti
- `impostaContestoTempo()` js/coach/volume/tempo.js:158 funzione ← tests/integrazione-onda2c.test.js:78 (html) — nel file: numeroEsercizi, adattaAlTempo, rifinisciAlTempo
- `liberaContestoTempo()` js/coach/volume/tempo.js:159 funzione ← tests/integrazione-onda2c.test.js:91 (html) — nel file: validaTempo
- `opzioniTempo()` js/coach/volume/tempo.js:160 funzione ← js/coach/programma/completamenti.js:201 completaSettimana · js/coach/volume/volume.js:1029 validaVolume · js/coach/specialita/forza.js:391 forzaEquilibra, 458 forzaAdattaAlTempo, 479 forzaPotaAlTempo · tests/integrazione-onda2c.test.js:78 (html), 83 (html) · tests/tempo.test.js:372 scala (html) — nel file: numeroEsercizi, adattaAlTempo, rifinisciAlTempo, validaTempo
- `opzioniTempoProfilo()` js/coach/volume/tempo.js:164 funzione ← nessun altro file — nel file: opzioniTempoCorrenti, fattoreTempo
- `opzioniTempoCorrenti()` js/coach/volume/tempo.js:170 funzione ← nessun altro file — nel file: durataSeduta
- `durataSeduta()` js/coach/volume/tempo.js:177 funzione ← js/coach/catalogo-regole.js ×1 · js/ui/piano/schede-pronte.js ×1 · js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/figura-anatomica.js ×1 · js/coach/programma/completamenti.js ×4 · js/coach/volume/volume.js ×9 · js/coach/volume/tecniche.js ×1 · js/coach/specialita/forza.js ×3 · tests/integrazione-3a.test.js ×1 · tests/integrazione-onda2b.test.js ×1 · tests/integrazione-onda2c.test.js ×1 · tests/revisione-onda2d.test.js ×1 · tests/tempo.test.js ×1 · tests/volume.test.js ×1 — nel file: fattoreTempo, scalaDelTempo, scalaDelTempoBase, serieSottoFascia, rifinisciAlTempo, validaTempo, stimaMinutiSeduta
- `_cacheFattore` js/coach/volume/tempo.js:194 variabile ← nessun altro file — nel file: fattoreTempo
- `mediana()` js/coach/volume/tempo.js:195 funzione ← nessun altro file — nel file: fattoreTempo
- `fattoreTempo()` js/coach/volume/tempo.js:196 funzione ← nessun altro file — nel file: opzioniTempo, opzioniTempoProfilo
- `classePausa()` js/coach/volume/tempo.js:227 funzione ← js/coach/volume/serie-ripetizioni.js:21 adattoAlCincoPerCinque — nel file: limitiPausa, scalaDelTempoBase
- `limitiPausa()` js/coach/volume/tempo.js:228 funzione ← js/coach/catalogo-regole.js:38 COACH_REGOLE (html) · js/coach/volume/serie-ripetizioni.js:66 prescriviSeduta · js/coach/specialita/forza.js:237 forzaPrescrizione — nel file: pausaPrescritta, pausePerClasse, scalaDelTempoBase, riallineaPause
- `pausaPrescritta()` js/coach/volume/tempo.js:248 funzione ← nessun altro file — nel file: serieSottoFascia
- `obiettivoDellaSeduta()` js/coach/volume/tempo.js:252 funzione ← nessun altro file — nel file: pausePerClasse, scalaDelTempoBase, riallineaPause
- `regoleDelCoach()` js/coach/volume/tempo.js:254 funzione ← nessun altro file — nel file: adattaAlTempo, validaTempo
- `pausePerClasse()` js/coach/volume/tempo.js:255 funzione ← nessun altro file — nel file: adattaAlTempo
- `minutiEffettivi()` js/coach/volume/tempo.js:270 funzione ← js/coach/volume/volume.js:1031 validaVolume · js/coach/specialita/forza.js:391 forzaEquilibra, 458 forzaAdattaAlTempo, 479 forzaPotaAlTempo · tests/revisione-onda2d.test.js:184 (html) — nel file: stimaEsercizi, adattaAlTempo, rifinisciAlTempo, validaTempo
- `durataMassimaPrincipiante()` js/coach/volume/tempo.js:274 funzione ← nessun altro file
- `obiettivoDaSchema()` js/coach/volume/tempo.js:275 funzione ← nessun altro file — nel file: stimaEsercizi
- `stimaEsercizi()` js/coach/volume/tempo.js:279 funzione ← nessun altro file — nel file: numeroEsercizi, exerciseCountFor
- `numeroEsercizi()` js/coach/volume/tempo.js:299 funzione ← js/coach/regia/genera.js:355 generaProgramma · tests/tempo-copertura.test.js:20 esegui (html)
- `pavimentoOk()` js/coach/volume/tempo.js:314 funzione ← js/coach/specialita/forza.js:426 forzaEquilibra — nel file: scalaDelTempoBase, rifinisciAlTempo
- `togliEsercizio()` js/coach/volume/tempo.js:326 funzione ← js/coach/programma/completamenti.js:285 rinforzaFemorali — nel file: scalaDelTempo, scalaDelTempoBase
- `eFlessioneGinocchio()` js/coach/volume/tempo.js:335 funzione ← nessun altro file — nel file: unicaFlessioneSettimana, scalaDelTempo
- `unicaFlessioneSettimana()` js/coach/volume/tempo.js:336 funzione ← tests/integrazione-onda2c.test.js:89 (html), 90 (html) — nel file: scalaDelTempo, scalaDelTempoBase, adattaAlTempo
- `NOTA_FEMORALI_TEMPO` js/coach/volume/tempo.js:340 costante ← js/coach/regia/genera.js:313 riconciliaNote — nel file: scalaDelTempoBase
- `frequenzaPersa()` js/coach/volume/tempo.js:347 funzione ← nessun altro file — nel file: scalaDelTempo
- `scalaDelTempo()` js/coach/volume/tempo.js:355 funzione ← tests/integrazione-onda2c.test.js:78 (html) — nel file: adattaAlTempo
- `scalaDelTempoBase()` js/coach/volume/tempo.js:383 funzione ← nessun altro file — nel file: scalaDelTempo
- `sottoFascia()` js/coach/volume/tempo.js:508 funzione ← nessun altro file — nel file: serieSottoFascia
- `serieSottoFascia()` js/coach/volume/tempo.js:512 funzione ← nessun altro file — nel file: adattaAlTempo
- `adattaAlTempo()` js/coach/volume/tempo.js:579 funzione ← js/coach/regia/genera.js:367 generaProgramma · tests/tempo-copertura.test.js:22 esegui (html) · tests/tempo.test.js:321 (html), 370 scala (html)
- `FRASE_TAGLIO_TEMPO` js/coach/volume/tempo.js:632 costante ← js/coach/regia/genera.js:303 riconciliaNote — nel file: adattaAlTempo
- `FRASE_TAGLIO_TEMPO_SENZA_COPPIE` js/coach/volume/tempo.js:634 costante ← js/coach/regia/genera.js:303 riconciliaNote
- `rifinisciAlTempo()` js/coach/volume/tempo.js:638 funzione ← js/coach/regia/genera.js:371 generaProgramma
- `FRASE_DURATA` js/coach/volume/tempo.js:664 costante ← nessun altro file — nel file: validaTempo
- `FRASE_LAVORO_UTILE` js/coach/volume/tempo.js:665 costante ← nessun altro file — nel file: validaTempo
- `FRASE_FATTORE_PIU` js/coach/volume/tempo.js:666 costante ← nessun altro file — nel file: validaTempo
- `FRASE_FATTORE_MENO` js/coach/volume/tempo.js:667 costante ← nessun altro file — nel file: validaTempo
- `FRASE_MANTENIMENTO` js/coach/volume/tempo.js:668 costante ← nessun altro file — nel file: validaTempo
- `FRASE_PRINCIPIANTE_DURATA` js/coach/volume/tempo.js:669 costante ← nessun altro file — nel file: validaTempo
- `FRASE_POCO_TEMPO` js/coach/volume/tempo.js:672 costante ← nessun altro file — nel file: validaTempo
- `RX_BERSAGLIO_SPINTA` js/coach/volume/tempo.js:675 costante ← nessun altro file — nel file: antagonistiPerMuscolo
- `RX_BERSAGLIO_TIRATA` js/coach/volume/tempo.js:675 costante ← nessun altro file — nel file: antagonistiPerMuscolo
- `antagonistiPerMuscolo()` js/coach/volume/tempo.js:678 funzione ← nessun altro file — nel file: coppiaValida
- `coppiaValida()` js/coach/volume/tempo.js:683 funzione ← nessun altro file — nel file: scalaDelTempoBase, riparaCoppie
- `riparaCoppie()` js/coach/volume/tempo.js:684 funzione ← tests/tempo.test.js:543 (html), 550 (html) — nel file: validaTempo
- `riallineaPause()` js/coach/volume/tempo.js:694 funzione ← tests/tempo.test.js:310 (html) — nel file: validaTempo
- `validaTempo()` js/coach/volume/tempo.js:708 funzione ← js/coach/regia/genera.js:329 verificaProgramma
- `exerciseCountFor()` js/coach/volume/tempo.js:730 funzione ← nessun altro file
- `stimaMinutiSeduta()` js/coach/volume/tempo.js:731 funzione ← nessun altro file

### `js/coach/volume/soglie-tempo.js`

- `SOGLIE_TEMPO` js/coach/volume/soglie-tempo.js:13 costante ← js/coach/volume/tempo.js:36 sogliaTempo, 628 adattaAlTempo, 725 validaTempo

### `js/coach/volume/tecniche.js`

- `TECNICHE_AL_CEDIMENTO` js/coach/volume/tecniche.js:21 costante ← js/coach/regia/genera.js:192 applicaMetodo
- `senzaCedimento()` js/coach/volume/tecniche.js:23 funzione ← nessun altro file
- `senzaCedimentoPer()` js/coach/volume/tecniche.js:25 funzione ← js/coach/regia/genera.js:192 applicaMetodo
- `filtraCoppie()` js/coach/volume/tecniche.js:28 funzione ← tests/tecniche.test.js:416 (html) — nel file: assegnaTecniche, validaTecniche
- `entraNelTetto()` js/coach/volume/tecniche.js:41 funzione ← tests/tecniche.test.js:210 (html) — nel file: assegnaTecniche
- `muscoloDellEsercizio()` js/coach/volume/tecniche.js:50 funzione ← nessun altro file — nel file: assegnaTecniche
- `distribuisciTecniche()` js/coach/volume/tecniche.js:59 funzione ← tests/tecniche.test.js:228 (html) — nel file: assegnaTecniche
- `assegnaTecniche()` js/coach/volume/tecniche.js:78 funzione ← js/coach/regia/genera.js:373 generaProgramma
- `validaTecniche()` js/coach/volume/tecniche.js:151 funzione ← js/coach/regia/genera.js:328 verificaProgramma

### `js/coach/volume/soglie-rampa.js`

- `SOGLIE_RAMPA` js/coach/volume/soglie-rampa.js:11 costante ← js/coach/volume/rampa-settimana.js:23 sogliaRampa

### `js/coach/volume/rampa-settimana.js`

- `sogliaRampa()` js/coach/volume/rampa-settimana.js:22 funzione ← nessun altro file — nel file: serieDellaSettimana
- `posizioneNelPiano()` js/coach/volume/rampa-settimana.js:27 funzione ← nessun altro file — nel file: rampaAlCarico, serieDelPianoQuestaSettimana
- `serieDellaSettimana()` js/coach/volume/rampa-settimana.js:35 funzione ← nessun altro file — nel file: rampaAlCarico, serieDelPianoQuestaSettimana
- `rampaAlCarico()` js/coach/volume/rampa-settimana.js:47 funzione ← nessun altro file — nel file: (primo livello)
- `serieDelPianoQuestaSettimana()` js/coach/volume/rampa-settimana.js:74 funzione ← js/ui/oggi.js:51 obiettiviSettimana

### `js/coach/sicurezza/vincoli.js`

- `vincoliSicurezza()` js/coach/sicurezza/vincoli.js:24 funzione ← js/coach/regia/brief.js:220 briefOggi · js/coach/regia/genera.js:345 generaProgramma · tests/genera-stadi.test.js:124 (html) · tests/integrazione-onda2c.test.js:70 (html), 124 (html), 155 (html), 257 (html) · tests/split.test.js:148 (html) · tests/tecniche.test.js:21 nuovaApp (html) · tests/tempo-copertura.test.js:19 esegui (html) · tests/tempo.test.js:320 (html), 368 scala (html) · tests/volume.test.js:26 brief (html)
- `tecnicheAlCedimentoAmmesse()` js/coach/sicurezza/vincoli.js:72 funzione ← js/coach/regia/brief.js:180 risolviMetodo · js/coach/regia/genera.js:183 applicaMetodo, 221 noteDelProgramma

### `js/coach/sicurezza/soglie-tecniche.js`

- `SOGLIE_TECNICHE` js/coach/sicurezza/soglie-tecniche.js:12 costante ← js/coach/volume/tecniche.js:80 assegnaTecniche · js/coach/sicurezza/tecnica-adatta.js:72 personaTecniche, 112 posizioneNelBlocco, 138 budgetTecniche, 256 serieEquivalentiTecnica · js/coach/regole-nuove.js:78 regoleRicAlCarico

### `js/coach/sicurezza/tecnica-adatta.js`

- `GRUPPO_TECNICA` js/coach/sicurezza/tecnica-adatta.js:27 costante ← js/coach/regole-nuove.js:110 limitaTecnicheIntense — nel file: tecnicaAdatta
- `CLASSI_PER_TECNICA` js/coach/sicurezza/tecnica-adatta.js:34 costante ← nessun altro file — nel file: tecnicaAdatta
- `ORDINE_CLASSI` js/coach/sicurezza/tecnica-adatta.js:39 costante ← nessun altro file — nel file: tecnicaAdatta
- `RISCHIO_CLASSE` js/coach/sicurezza/tecnica-adatta.js:41 costante ← nessun altro file — nel file: rischioTecnica
- `RISCHIO_TECNICA` js/coach/sicurezza/tecnica-adatta.js:42 costante ← nessun altro file — nel file: rischioTecnica
- `MOTIVI_TECNICHE` js/coach/sicurezza/tecnica-adatta.js:44 costante ← js/coach/volume/tecniche.js:138 assegnaTecniche — nel file: budgetTecniche, tecnicaAdatta
- `personaTecniche()` js/coach/sicurezza/tecnica-adatta.js:64 funzione ← nessun altro file — nel file: budgetTecniche, tecnicaAdatta
- `fastidiDelBrief()` js/coach/sicurezza/tecnica-adatta.js:74 funzione ← nessun altro file — nel file: tecnicaAdatta
- `vincoliDelBrief()` js/coach/sicurezza/tecnica-adatta.js:78 funzione ← nessun altro file — nel file: budgetTecniche
- `nomeCompletoTecnica()` js/coach/sicurezza/tecnica-adatta.js:83 funzione ← nessun altro file — nel file: esercizioSenzaCedimento, condizioneClasse
- `esercizioCaricaIlFastidio()` js/coach/sicurezza/tecnica-adatta.js:87 funzione ← js/coach/programma/struttura-pro.js:107 strCopri · js/coach/programma/completamenti.js:74 copriCuffia, 154 completaSettimana · js/coach/volume/volume.js:340 volumeMotore · js/coach/volume/tempo.js:486 scalaDelTempoBase, 547 serieSottoFascia · js/coach/specialita/forza.js:207 forzaAmmesso · tests/integrazione-onda2c.test.js:250 (html), 251 (html) · tests/revisione-onda2d.test.js:307 (html) — nel file: esercizioSenzaCedimentoPer, tecnicaAdatta
- `esercizioSenzaCedimento()` js/coach/sicurezza/tecnica-adatta.js:93 funzione ← js/coach/volume/tecniche.js:23 senzaCedimento — nel file: esercizioSenzaCedimentoPer, tecnicaAdatta
- `esercizioSenzaCedimentoPer()` js/coach/sicurezza/tecnica-adatta.js:101 funzione ← js/coach/volume/tecniche.js:25 senzaCedimentoPer — nel file: tecnicaAdatta
- `posizioneNelBlocco()` js/coach/sicurezza/tecnica-adatta.js:111 funzione ← nessun altro file — nel file: budgetTecniche
- `budgetTecniche()` js/coach/sicurezza/tecnica-adatta.js:136 funzione ← js/coach/catalogo-regole.js:199 COACH_REGOLE (html) · js/coach/volume/tecniche.js:81 assegnaTecniche, 152 validaTecniche · js/coach/regole-nuove.js:105 limitaTecnicheIntense · tests/popolazioni.test.js:327 (html) · tests/tecniche.test.js:31 nuovaApp (html) — nel file: tecnicaAdatta
- `condizioneClasse()` js/coach/sicurezza/tecnica-adatta.js:188 funzione ← nessun altro file — nel file: tecnicaAdatta
- `macchinaOCavo()` js/coach/sicurezza/tecnica-adatta.js:201 funzione ← nessun altro file — nel file: tecnicaAdatta
- `tecnicaAdatta()` js/coach/sicurezza/tecnica-adatta.js:205 funzione ← js/coach/catalogo-regole.js:233 COACH_REGOLE (html) · js/coach/volume/tecniche.js:33 filtraCoppie, 82 assegnaTecniche, 155 validaTecniche · js/coach/regole-nuove.js:111 limitaTecnicheIntense · tests/popolazioni.test.js:60 (html) · tests/tecniche.test.js:27 nuovaApp (html)
- `rischioTecnica()` js/coach/sicurezza/tecnica-adatta.js:244 funzione ← js/coach/volume/tecniche.js:98 assegnaTecniche, 159 validaTecniche · js/coach/regole-nuove.js:112 limitaTecnicheIntense
- `scegliTecnicheSicure()` js/coach/sicurezza/tecnica-adatta.js:249 funzione ← js/coach/volume/tecniche.js:61 distribuisciTecniche, 160 validaTecniche · js/coach/regole-nuove.js:114 limitaTecnicheIntense · tests/tecniche.test.js:218 (html), 221 (html)
- `serieEquivalentiTecnica()` js/coach/sicurezza/tecnica-adatta.js:255 funzione ← js/coach/volume/tecniche.js:42 entraNelTetto
- `tecnicaContaNelBudget()` js/coach/sicurezza/tecnica-adatta.js:260 funzione ← js/coach/volume/tecniche.js:159 validaTecniche · js/coach/regole-nuove.js:112 limitaTecnicheIntense
- `briefTecnicheOggi()` js/coach/sicurezza/tecnica-adatta.js:265 funzione ← js/coach/regole-nuove.js:103 limitaTecnicheIntense · tests/popolazioni.test.js:327 (html)

### `js/coach/sicurezza/soglie-fastidi.js`

- `SOGLIE_FASTIDI` js/coach/sicurezza/soglie-fastidi.js:9 costante ← nessun altro file — nel file: sogliaFastidi
- `sogliaFastidi()` js/coach/sicurezza/soglie-fastidi.js:24 funzione ← js/coach/sicurezza/fastidi.js:54 fastidiAttivi, 63 esclusoDalFastidio, 76 datiNotaFastidio

### `js/coach/sicurezza/fastidi.js`

- `FASTIDI_ZONE` js/coach/sicurezza/fastidi.js:20 costante ← nessun altro file — nel file: datiNotaFastidio, eNotaDelFastidio, applicaNoteFastidi
- `fastidiAttivi()` js/coach/sicurezza/fastidi.js:53 funzione ← js/coach/programma/motore.js:59 ECCEZIONI_RISCHIO — nel file: esclusoDalFastidio, applicaNoteFastidi
- `esclusoDalFastidio()` js/coach/sicurezza/fastidi.js:60 funzione ← js/coach/programma/motore.js:160 consentitoCalcolo
- `nomiDelProgramma()` js/coach/sicurezza/fastidi.js:67 funzione ← nessun altro file — nel file: datiNotaFastidio
- `datiNotaFastidio()` js/coach/sicurezza/fastidi.js:74 funzione ← tests/fastidi.test.js:69 (html), 108 (html) — nel file: applicaNoteFastidi
- `eNotaDelFastidio()` js/coach/sicurezza/fastidi.js:89 funzione ← nessun altro file — nel file: applicaNoteFastidi
- `applicaNoteFastidi()` js/coach/sicurezza/fastidi.js:95 funzione ← js/coach/regia/genera.js:320 riconciliaNote

### `js/coach/regia/brief.js`

- `OBIETTIVI_NOTI` js/coach/regia/brief.js:20 costante ← nessun altro file — nel file: obiettiviEffettivi
- `obiettiviDichiarati()` js/coach/regia/brief.js:23 funzione ← nessun altro file — nel file: briefCoach, briefOggi
- `obiettiviEffettivi()` js/coach/regia/brief.js:28 funzione ← tests/genera-stadi.test.js:31 (html) — nel file: briefCoach, briefOggi
- `faseDaObiettivi()` js/coach/regia/brief.js:44 funzione ← js/coach/volume/volume.js:138 puoSpecializzare, 153 bersagliVolume · js/coach/regia/genera.js:238 noteDelProgramma · tests/split.test.js:233 (html) — nel file: faseCorpo
- `faseCorpo()` js/coach/regia/brief.js:50 funzione ← js/coach/repertorio.js:317 corpoCoach · js/coach/regole-ricerca.js:88 inDeficitCalorico · js/ui/progressi/peso.js:30 consiglioPeso · js/coach/esigenza.js:34 esigenzaInDeficit · tests/genera-stadi.test.js:68 (html), 87 (html), 94 (html) — nel file: briefCoach, briefOggi
- `LIVELLI_NOTI` js/coach/regia/brief.js:58 costante ← nessun altro file — nel file: livelloConosciuto, conLivelloNoto
- `livelloConosciuto()` js/coach/regia/brief.js:59 funzione ← js/coach/volume/tempo.js:167 opzioniTempoProfilo · js/coach/compone.js:116 metodiPerTe — nel file: conLivelloNoto, chiDa
- `conLivelloNoto()` js/coach/regia/brief.js:70 funzione ← nessun altro file — nel file: briefCoach
- `chiDa()` js/coach/regia/brief.js:76 funzione ← js/coach/compone.js:36 guardiaNutrizione · tests/tecniche.test.js:21 nuovaApp (html), 412 (html) — nel file: briefCoach, briefOggi
- `ATTREZZI_CASA_IDS` js/coach/regia/brief.js:98 costante ← js/ui/onboarding.js:336 htmlAttrezziOnboarding · js/coach/programma/motore.js:111 attrezziDichiaratiEsito · js/ui/opzioni/il-coach.js:79 htmlAttrezziCoach — nel file: attrezziDichiarati
- `ATTREZZI_EXTRA_PALESTRA_IDS` js/coach/regia/brief.js:99 costante ← js/ui/onboarding.js:328 htmlAttrezziOnboarding · js/ui/opzioni/il-coach.js:73 htmlAttrezziCoach — nel file: attrezziDichiarati
- `listaAttrezziNota()` js/coach/regia/brief.js:101 funzione ← nessun altro file — nel file: attrezziDichiarati
- `attrezziDichiarati()` js/coach/regia/brief.js:103 funzione ← tests/split.test.js:133 (html), 320 (html) — nel file: attrezziSalvati, briefCoach
- `attrezziSalvati()` js/coach/regia/brief.js:120 funzione ← js/ui/allenamento/macchinario-occupato.js:66 prefsOccupato · js/coach/programma/alternative.js:142 applyGeneratedProgram · js/coach/repertorio.js:116 prefsCoach
- `briefCoach()` js/coach/regia/brief.js:130 funzione ← js/coach/regia/genera.js:344 generaProgramma · tests/forza-struttura.test.js:55 (html) · tests/genera-stadi.test.js:228 (html), 232 (html), 241 (html) · tests/integrazione-onda2c.test.js:70 (html), 124 (html), 155 (html), 205 (html), 257 (html) · tests/split.test.js:148 (html) · tests/tempo-copertura.test.js:19 esegui (html) · tests/tempo.test.js:308 (html), 320 (html), 368 scala (html) · tests/volume.test.js:26 brief (html)
- `risolviMetodo()` js/coach/regia/brief.js:170 funzione ← js/coach/regia/genera.js:346 generaProgramma · tests/integrazione-onda2c.test.js:70 (html), 124 (html), 155 (html) · tests/split.test.js:148 (html) · tests/tempo-copertura.test.js:19 esegui (html) · tests/tempo.test.js:320 (html), 368 scala (html) · tests/volume.test.js:26 brief (html)
- `prefsDelBrief()` js/coach/regia/brief.js:191 funzione ← js/coach/regia/genera.js:348 generaProgramma · tests/integrazione-onda2c.test.js:70 (html), 124 (html), 155 (html) · tests/split.test.js:148 (html) · tests/tempo-copertura.test.js:19 esegui (html) · tests/tempo.test.js:320 (html), 368 scala (html) · tests/volume.test.js:26 brief (html)
- `briefOggi()` js/coach/regia/brief.js:203 funzione ← js/coach/sicurezza/tecnica-adatta.js:266 briefTecnicheOggi · tests/genera-stadi.test.js:153 (html), 163 (html)

### `js/coach/regia/genera.js`

- `SPECIALITA_STRUTTURA` js/coach/regia/genera.js:36 costante ← nessun altro file — nel file: registraSpecialita, specialitaStruttura
- `registraSpecialita()` js/coach/regia/genera.js:37 funzione ← js/coach/catalogo-regole.js:277 COACH_REGOLE (html) · js/coach/specialita/forza.js:276 · tests/forza-struttura.test.js:42 (html) · tests/genera-stadi.test.js:230 (html)
- `specialitaStruttura()` js/coach/regia/genera.js:38 funzione ← tests/tempo-copertura.test.js:20 esegui (html) — nel file: generaProgramma
- `GIORNI_PER_SEDUTE` js/coach/regia/genera.js:50 costante ← nessun altro file — nel file: giorniSettimana
- `NOTA_SEI_GIORNI` js/coach/regia/genera.js:51 costante ← nessun altro file — nel file: giorniSettimana
- `NOTA_SEI_GIORNI_DI_FILA` js/coach/regia/genera.js:54 costante ← nessun altro file — nel file: giorniSettimana, riconciliaNote
- `NOTA_SEI_GIORNI_48_ORE` js/coach/regia/genera.js:55 costante ← nessun altro file — nel file: riconciliaNote
- `NOTA_PRINCIPIANTE_4_SEDUTE` js/coach/regia/genera.js:56 costante ← js/ui/onboarding.js:301 htmlAvvisoGiorni — nel file: giorniSettimana
- `tipiAdiacenti()` js/coach/regia/genera.js:58 funzione ← tests/integrazione-onda2c.test.js:202 (html), 203 (html) · tests/revisione-onda2d-giorni.test.js:15 (html), 16 (html), 17 (html), 29 (html) — nel file: giorniSettimana
- `riordinaSenzaAdiacenti()` js/coach/regia/genera.js:64 funzione ← tests/integrazione-onda2c.test.js:197 (html), 198 (html), 200 (html), 201 (html) · tests/revisione-onda2d-giorni.test.js:20 (html), 23 (html) — nel file: giorniSettimana
- `sogliaSplit()` js/coach/regia/genera.js:87 funzione ← js/coach/catalogo-regole.js:27 COACH_REGOLE (html) · js/ui/onboarding.js:300 htmlAvvisoGiorni, 306 descSonnoBene · js/coach/regia/brief.js:114 attrezziDichiarati — nel file: grandiDellaSeduta, giorniSenzaConflitti, giorniSettimana
- `grandiDellaSeduta()` js/coach/regia/genera.js:90 funzione ← nessun altro file — nel file: seduteInConflitto
- `seduteInConflitto()` js/coach/regia/genera.js:99 funzione ← nessun altro file — nel file: conflittiDeiGiorni
- `conflittiDeiGiorni()` js/coach/regia/genera.js:105 funzione ← tests/split.test.js:45 (html), 57 (html), 78 (html), 80 (html) — nel file: giorniSenzaConflitti
- `giorniDiFilaCiclici()` js/coach/regia/genera.js:111 funzione ← tests/split.test.js:37 (html), 46 (html), 83 (html) — nel file: giorniSenzaConflitti
- `ordiniDistinti()` js/coach/regia/genera.js:119 funzione ← nessun altro file — nel file: giorniSenzaConflitti
- `giorniSenzaConflitti()` js/coach/regia/genera.js:131 funzione ← nessun altro file — nel file: giorniSettimana
- `giorniSettimana()` js/coach/regia/genera.js:151 funzione ← tests/genera-stadi.test.js:241 (html) · tests/integrazione-onda2c.test.js:206 (html) · tests/split.test.js:21 giorni (html) · tests/tempo-copertura.test.js:20 esegui (html) — nel file: generaProgramma
- `applicaMetodo()` js/coach/regia/genera.js:181 funzione ← nessun altro file — nel file: generaProgramma
- `regolaDelPicco()` js/coach/regia/genera.js:204 funzione ← nessun altro file — nel file: generaProgramma
- `NOTA_POCO_TEMPO_SS` js/coach/regia/genera.js:210 costante ← nessun altro file — nel file: noteDelProgramma, riconciliaNote
- `NOTA_POCO_TEMPO_SS_DROP` js/coach/regia/genera.js:211 costante ← nessun altro file — nel file: noteDelProgramma, riconciliaNote
- `NOTA_OVER65_POTENZA` js/coach/regia/genera.js:213 costante ← nessun altro file — nel file: noteDelProgramma, riconciliaNote
- `NOTA_OVER65` js/coach/regia/genera.js:214 costante ← nessun altro file — nel file: noteDelProgramma, riconciliaNote
- `NOTA_SENZA_CEDIMENTO_SS` js/coach/regia/genera.js:215 costante ← nessun altro file — nel file: noteDelProgramma, riconciliaNote
- `NOTA_SENZA_CEDIMENTO` js/coach/regia/genera.js:216 costante ← nessun altro file — nel file: riconciliaNote
- `noteDelProgramma()` js/coach/regia/genera.js:219 funzione ← nessun altro file — nel file: generaProgramma
- `applicaScelteUtente()` js/coach/regia/genera.js:242 funzione ← nessun altro file — nel file: generaProgramma
- `chiudiProgramma()` js/coach/regia/genera.js:253 funzione ← nessun altro file — nel file: generaProgramma
- `NOTE_REGIONALI` js/coach/regia/genera.js:281 costante ← js/coach/volume/tempo.js:417 scalaDelTempoBase — nel file: riconciliaNote
- `riconciliaNote()` js/coach/regia/genera.js:291 funzione ← tests/revisione-onda2d.test.js:238 (html) — nel file: verificaProgramma
- `verificaProgramma()` js/coach/regia/genera.js:323 funzione ← nessun altro file — nel file: generaProgramma
- `buildProgram()` js/coach/regia/genera.js:338 funzione window ← js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×2 · tests/aiuto-genera.js ×1 · tests/attrezzi-dichiarati.test.js ×2 · tests/attrezzi-onboarding.test.js ×1 · tests/attributi.test.js ×1 · tests/avvio.test.js ×1 · tests/forza-attivazione.test.js ×1 · tests/forza-equilibrio.test.js ×1 · tests/forza-modalita.test.js ×1 · tests/forza-ordine-alzata.test.js ×1 · tests/genera-golden.test.js ×1 · tests/hip-hinge-ripiego.test.js ×6 · tests/integrazione-onda0.test.js ×1 · tests/integrazione-onda2b.test.js ×1 · tests/memoria-chiamata.test.js ×4 · tests/revisione-onda2d-giorni.test.js ×1 · tests/revisione-onda2d.test.js ×2 · tests/split.test.js ×2 · tests/volume.test.js ×1 · tests/browser/carichi-evoluzione.js ×3 · tests/browser/coerenza-schede.js ×3 · tests/browser/intensita-bia.js ×1 · tests/browser/metodi-epoca-oro.js ×8
- `generaProgramma()` js/coach/regia/genera.js:342 funzione ← nessun altro file — nel file: buildProgram

### `js/coach/specialita/soglie-forza.js`

- `SOGLIE_FORZA` js/coach/specialita/soglie-forza.js:13 costante ← js/coach/specialita/forza.js:22 sogliaForza, 505 forzaNote

### `js/coach/specialita/soglie-forza-carichi.js`

- `SOGLIE_FORZA_CARICHI` js/coach/specialita/soglie-forza-carichi.js:12 costante ← js/coach/specialita/forza-carichi.js:27 sogliaForzaCarichi

### `js/coach/specialita/forza.js`

- `sogliaForza()` js/coach/specialita/forza.js:22 funzione ← js/coach/catalogo-regole.js:277 COACH_REGOLE (html) · tests/forza-struttura.test.js:106 (html), 137 (html) — nel file: forzaPuntiDeboli, forzaCambiaPunto, SPEC_FORZA, forzaPrescrizione, specialitaForza, forzaSedute, forzaEquilibra, forzaAdattaAlTempo, …
- `FORZA_CAMPI_TIPO` js/coach/specialita/forza.js:27 costante ← nessun altro file — nel file: modalitaForzaDa, forzaSalvata
- `modalitaForzaDa()` js/coach/specialita/forza.js:28 funzione ← js/coach/regia/brief.js:151 briefCoach — nel file: forzaSalvata
- `forzaPuntiDeboli()` js/coach/specialita/forza.js:43 funzione ← nessun altro file — nel file: forzaSalvata, specialitaForza
- `FORZA_TIPI_TESTI` js/coach/specialita/forza.js:57 costante ← js/ui/onboarding.js:346 htmlForzaOnboarding · js/ui/opzioni/il-coach.js:89 htmlForzaCoach
- `FORZA_NOTA_REQUISITI` js/coach/specialita/forza.js:61 costante ← js/ui/onboarding.js:351 htmlForzaOnboarding · js/ui/opzioni/il-coach.js:92 htmlForzaCoach
- `FORZA_NOTA_PUNTI` js/coach/specialita/forza.js:62 costante ← js/ui/onboarding.js:352 htmlForzaOnboarding · js/ui/opzioni/il-coach.js:93 htmlForzaCoach
- `FORZA_PUNTI_TESTI` js/coach/specialita/forza.js:63 costante ← js/ui/onboarding.js:353 htmlForzaOnboarding · js/ui/opzioni/il-coach.js:92 htmlForzaCoach
- `forzaCambiaPunto()` js/coach/specialita/forza.js:69 funzione ← js/ui/onboarding.js:355 onbTogglePuntoDebole · js/ui/opzioni/il-coach.js:104 togglePuntoDeboleCoach · tests/forza-attivazione.test.js:37 (html)
- `forzaSalvata()` js/coach/specialita/forza.js:79 funzione ← js/coach/programma/alternative.js:143 applyGeneratedProgram
- `FORZA_NOTA_STRUTTURA` js/coach/specialita/forza.js:92 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_ONDA` js/coach/specialita/forza.js:93 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_PIATTA` js/coach/specialita/forza.js:94 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_PRINCIPIANTE` js/coach/specialita/forza.js:95 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_PRINCIPIANTE_TERZA` js/coach/specialita/forza.js:96 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_MINUTI` js/coach/specialita/forza.js:97 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_MASSIMALE` js/coach/specialita/forza.js:98 costante ← nessun altro file — nel file: forzaNote
- `FORZA_NOTA_PRUDENTE` js/coach/specialita/forza.js:99 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_ETA` js/coach/specialita/forza.js:101 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_GIORNI` js/coach/specialita/forza.js:102 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_FREQUENZA` js/coach/specialita/forza.js:103 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_FREQUENZA_SOSTITUITA` js/coach/specialita/forza.js:104 costante ← nessun altro file — nel file: specialitaForza
- `FORZA_NOTA_MOMENTO` js/coach/specialita/forza.js:105 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_ATTREZZI` js/coach/specialita/forza.js:106 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_NOTA_FASTIDIO` js/coach/specialita/forza.js:107 costante ← nessun altro file — nel file: SPEC_FORZA
- `FORZA_PERCHE_STRUTTURA` js/coach/specialita/forza.js:108 costante ← nessun altro file — nel file: forzaNote
- `FORZA_PERCHE_ONDA` js/coach/specialita/forza.js:109 costante ← nessun altro file — nel file: forzaNote
- `FORZA_PERCHE_VARIANTE` js/coach/specialita/forza.js:110 costante ← nessun altro file — nel file: forzaNote
- `FORZA_PERCHE_ACCESSORIO` js/coach/specialita/forza.js:111 costante ← nessun altro file — nel file: forzaNote
- `FORZA_ALZATE_BARRA` js/coach/specialita/forza.js:112 costante ← nessun altro file — nel file: SPEC_FORZA, forzaSedute, forzaNote
- `FORZA_TITOLO` js/coach/specialita/forza.js:114 costante ← nessun altro file — nel file: forzaTitolo
- `FORZA_AGGETTIVO` js/coach/specialita/forza.js:115 costante ← nessun altro file — nel file: forzaTitolo
- `SPEC_FORZA` js/coach/specialita/forza.js:126 costante ← nessun altro file — nel file: forzaPuntiDeboli, forzaCambiaPunto, forzaNomeGara, forzaElencoVarianti, specialitaForza, forzaSedute, forzaEquilibra, forzaNote
- `forzaAmmesso()` js/coach/specialita/forza.js:205 funzione ← nessun altro file — nel file: forzaNomeGara, forzaElencoVarianti, forzaSedute, forzaEquilibra
- `forzaNomeGara()` js/coach/specialita/forza.js:212 funzione ← nessun altro file — nel file: SPEC_FORZA, forzaSedute, forzaNote
- `forzaSchema()` js/coach/specialita/forza.js:218 funzione ← nessun altro file — nel file: forzaSedute
- `forzaElencoVarianti()` js/coach/specialita/forza.js:220 funzione ← nessun altro file — nel file: forzaSedute
- `forzaPrescrizione()` js/coach/specialita/forza.js:230 funzione ← nessun altro file — nel file: forzaSedute
- `forzaTitolo()` js/coach/specialita/forza.js:243 funzione ← nessun altro file — nel file: forzaSedute
- `specialitaForza()` js/coach/specialita/forza.js:257 funzione ← nessun altro file — nel file: (primo livello)
- `forzaSedute()` js/coach/specialita/forza.js:286 funzione ← nessun altro file — nel file: specialitaForza
- `forzaEquilibra()` js/coach/specialita/forza.js:390 funzione ← nessun altro file — nel file: forzaSedute
- `forzaFaSchema()` js/coach/specialita/forza.js:448 funzione ← nessun altro file — nel file: forzaSedute
- `forzaAdattaAlTempo()` js/coach/specialita/forza.js:457 funzione ← nessun altro file — nel file: forzaSedute
- `forzaPotaAlTempo()` js/coach/specialita/forza.js:478 funzione ← nessun altro file — nel file: forzaSedute
- `forzaNote()` js/coach/specialita/forza.js:495 funzione ← nessun altro file — nel file: forzaSedute

### `js/coach/specialita/forza-carichi.js`

- `sogliaForzaCarichi()` js/coach/specialita/forza-carichi.js:27 funzione ← nessun altro file — nel file: forzaTetto
- `FORZA_RANGO_ONDA` js/coach/specialita/forza-carichi.js:30 costante ← nessun altro file — nel file: forzaRango
- `FORZA_FRASI_GIORNO` js/coach/specialita/forza-carichi.js:32 costante ← nessun altro file — nel file: forzaTetto
- `forzaRango()` js/coach/specialita/forza-carichi.js:38 funzione ← nessun altro file — nel file: forzaEsposizioni, forzaTetto
- `forzaBaseReps()` js/coach/specialita/forza-carichi.js:41 funzione ← nessun altro file — nel file: forzaPesoEsposizione, forzaTetto
- `forzaRirMedio()` js/coach/specialita/forza-carichi.js:44 funzione ← nessun altro file — nel file: forzaTetto
- `forzaEsposizioni()` js/coach/specialita/forza-carichi.js:47 funzione ← nessun altro file — nel file: forzaTetto
- `forzaCatenaFinoA()` js/coach/specialita/forza-carichi.js:57 funzione ← nessun altro file — nel file: forzaPesoEsposizione
- `forzaPesoEsposizione()` js/coach/specialita/forza-carichi.js:65 funzione ← nessun altro file — nel file: forzaTetto
- `forzaTetto()` js/coach/specialita/forza-carichi.js:79 funzione ← nessun altro file — nel file: forzaPesoEsposizione, forzaCaricoGiorno
- `forzaCaricoGiorno()` js/coach/specialita/forza-carichi.js:116 funzione ← nessun altro file — nel file: (primo livello)

## js/ui

### `js/ui/onboarding-risultato.js`

- `renderOnbResult()` js/ui/onboarding-risultato.js:5 funzione ← js/ui/onboarding.js:459 renderOnb · tests/revisione-onda1.test.js:181 (html)

## js/coach

### `js/coach/programma/archivio.js`

- `progKey()` js/coach/programma/archivio.js:5 funzione ← js/coach/programma/mesociclo.js:309 controlloOttavaPrincipiante · js/coach/programma/alternative.js:129 applyGeneratedProgram · js/ui/guida-interattiva.js:356 revocaConsenso · tests/aiuto-app.js:105 caricaApp (html) · tests/conserva-progressi.test.js:30 riscritte (html), 276 (html) · tests/browser/gravidanza.js:47 · tests/browser/intensita-bia.js:94, 118 · tests/browser/regole-nuove.js:15, 27 — nel file: getProgramma
- `biaKey()` js/coach/programma/archivio.js:6 funzione ← js/coach/bia/opzioni.js:90 eliminaBia · js/ui/guida-interattiva.js:355 revocaConsenso · tests/carichi-golden.test.js:178 costruisciStato (html) · tests/conserva-progressi.test.js:104 seminaStoria (html), 242 (html), 244 (html), 246 (html), 275 (html) — nel file: getBiaStorico, aggiungiBia
- `getProgramma()` js/coach/programma/archivio.js:7 funzione window ← js/coach/programma/mesociclo.js ×4 · js/coach/sicurezza/tecnica-adatta.js ×2 · js/coach/regia/brief.js ×2 · js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×1 · js/ui/statistiche.js ×1 · js/ui/statistiche-grafico.js ×2 · js/coach/carichi/progressivo.js ×4 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×4 · js/coach/sicurezza/popolazioni.js ×2 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×9 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×2 · js/ui/opzioni/il-coach.js ×1 · js/coach/esigenza.js ×4 · js/coach/psicologia.js ×1 · tests/conserva-progressi.test.js ×4 · tests/forza-attivazione.test.js ×3 · tests/intensita-onda0.test.js ×2 · tests/mesociclo.test.js ×1 · tests/migrazione-v1.test.js ×3 · tests/sicurezza-onda0.test.js ×1 · tests/browser/onboarding-forza.js ×1
- `getBiaStorico()` js/coach/programma/archivio.js:8 funzione window ← js/coach/carichi/progressivo.js:123 frenoBia · js/coach/carichi/partenza.js:78 contestoCarichi · js/coach/repertorio.js:30 pesoCorporeo, 318 corpoCoach · js/coach/intensita.js:54 statoBia · js/coach/agente-consigli.js:87 consigliAgente, 202 renderAgent · js/coach/bia/opzioni.js:63 renderBiaSheet, 88 eliminaBia · js/ui/progressi/peso.js:10 pesiTutti · js/coach/compone.js:51 fattoreFisico · js/coach/psicologia.js:136 renderSettings — nel file: aggiungiBia
- `aggiungiBia()` js/coach/programma/archivio.js:9 funzione window ← js/coach/programma/alternative.js:146 applyGeneratedProgram · js/coach/bia/opzioni.js:79 salvaBiaLetta, 92 eliminaBia, 130 salvaBiaAgente

### `js/coach/programma/alternative.js`

- `altraVariante()` js/coach/programma/alternative.js:5 funzione window ← nessun altro file — nel file: rimescolaAlternative
- `alternativeDi()` js/coach/programma/alternative.js:15 funzione ← nessun altro file — nel file: renderAlternative
- `altScelte` js/coach/programma/alternative.js:18 variabile ← nessun altro file — nel file: apriAlternative, sceltaAlternativa, applicaAlternative, renderAlternative
- `apriAlternative()` js/coach/programma/alternative.js:19 funzione window ← js/ui/onboarding-risultato.js:46 renderOnbResult (html)
- `chiudiAlternative()` js/coach/programma/alternative.js:24 funzione window ← index.html:372 (html) — nel file: applicaAlternative, rimescolaAlternative
- `sceltaAlternativa()` js/coach/programma/alternative.js:25 funzione window ← nessun altro file — nel file: renderAlternative
- `applicaAlternative()` js/coach/programma/alternative.js:28 funzione window ← nessun altro file — nel file: renderAlternative
- `rimescolaAlternative()` js/coach/programma/alternative.js:35 funzione window ← nessun altro file — nel file: renderAlternative
- `renderAlternative()` js/coach/programma/alternative.js:36 funzione ← nessun altro file — nel file: apriAlternative
- `caricoDelloStorico()` js/coach/programma/alternative.js:61 funzione ← nessun altro file — nel file: applyGeneratedProgram
- `fissaFasiDelloStorico()` js/coach/programma/alternative.js:70 funzione ← nessun altro file — nel file: applyGeneratedProgram
- `applyGeneratedProgram()` js/coach/programma/alternative.js:86 funzione window ← js/ui/onboarding.js:171 onbNext · js/coach/repertorio.js:552 nuovoCiclo · tests/forza-attivazione.test.js:12 crea (html) · tests/genera-stadi.test.js:57 (html) · tests/mesociclo.test.js:291 (html) · tests/split.test.js:168 (html), 176 (html) · tests/browser/onboarding-forza.js:42

## js/ui

### `js/ui/statistiche.js`

- `APP_VERSIONE` js/ui/statistiche.js:12 costante ← js/core/backup.js:24 esportaBackup · js/coach/psicologia.js:183 renderSettings
- `DISCHI_KEY` js/ui/statistiche.js:13 costante ← js/ui/allenamento/seduta.js:205 renderAllenamento · js/ui/opzioni/impostazioni.js:58 toggleSetting · js/coach/psicologia.js:160 renderSettings
- `NOME_KEY` js/ui/statistiche.js:14 costante ← nessun altro file — nel file: getNome, salvaNome
- `cercaAggiornamento()` js/ui/statistiche.js:17 funzione window ← js/coach/psicologia.js:178 renderSettings (html)
- `getNome()` js/ui/statistiche.js:31 funzione window ← js/ui/oggi.js:88 renderOggi · js/coach/psicologia.js:130 renderSettings, 215 renderSetPage — nel file: renderStats
- `salvaNome()` js/ui/statistiche.js:32 funzione window ← js/coach/psicologia.js:216 renderSetPage (html)
- `statsPeriodo` js/ui/statistiche.js:34 variabile ← nessun altro file — nel file: setStatsPeriodo, openStats, renderStats
- `dataSessione()` js/ui/statistiche.js:36 funzione ← js/ui/oggi.js ×3 · js/ui/allenamento/termina-e-cardio.js ×4 · js/ui/storico.js ×3 · js/coach/programma/alternative.js ×1 · js/ui/statistiche-grafico.js ×1 · js/coach/carichi/progressivo.js ×2 · js/coach/carichi/calibrazione.js ×1 · js/coach/sicurezza/scarico.js ×3 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×2 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×3 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×5 · js/ui/seduta-libera.js ×1 · js/ui/progressi/riepilogo.js ×3 · js/coach/metodi-momenti.js ×1 · js/coach/stato.js ×1 · js/coach/esigenza.js ×1 · js/coach/psicologia.js ×1 · js/ui/scheda-quattro-sezioni.js ×1 — nel file: calcolaStatistiche, blocchiQuattroSettimane, calcolaBlocco
- `pesoSessione()` js/ui/statistiche.js:42 funzione ← nessun altro file — nel file: calcolaStatistiche, calcolaBlocco
- `inizioPeriodo()` js/ui/statistiche.js:54 funzione window ← js/ui/statistiche-grafico.js:21 frequenzaSettimanale — nel file: calcolaStatistiche
- `calcolaStatistiche()` js/ui/statistiche.js:60 funzione window ← tests/browser/statistiche.js:46 — nel file: renderStats
- `tutteLeSedute()` js/ui/statistiche.js:118 funzione window ← js/ui/allenamento/termina-e-cardio.js:72 minutiCardioSettimana, 82 renderCardioStat · js/ui/storico.js:80 renderProgressiTop · js/ui/statistiche-grafico.js:19 frequenzaSettimanale · js/coach/repertorio.js:48 livelloStandardForza, 86 livelloStimato · js/ui/progressi/riepilogo.js:45 faticaMuscoli, 79 renderAnno, 105 annoRiassunto · js/coach/metodi-momenti.js:226 htmlMomento · js/coach/stato.js:29 htmlMomentoBreve · js/coach/esigenza.js:61 aggiornaEsigenza · js/coach/psicologia.js:109 htmlPrimiPassi · js/ui/scheda-quattro-sezioni.js:22 seduteEsercizio — nel file: calcolaStatistiche, blocchiQuattroSettimane, calcolaBlocco
- `volumeSeduta()` js/ui/statistiche.js:138 funzione ← nessun altro file — nel file: calcolaBlocco
- `blocchiQuattroSettimane()` js/ui/statistiche.js:146 funzione window ← js/ui/storico.js:88 renderProgressiTop · js/ui/statistiche-grafico.js:18 frequenzaSettimanale, 115 scelteStatsPeriodo · tests/browser/statistiche.js:72 — nel file: calcolaBlocco, openStats
- `calcolaBlocco()` js/ui/statistiche.js:164 funzione window ← js/ui/storico.js:93 renderProgressiTop — nel file: reportBloccoHtml
- `setStatsPeriodo()` js/ui/statistiche.js:212 funzione window ← tests/browser/statistiche.js:96
- `openStats()` js/ui/statistiche.js:214 funzione window ← js/ui/storico.js:95 renderProgressiTop (html) · js/ui/statistiche-grafico.js:138 renderStatsPagina (html) · tests/browser/statistiche.js:68, 72, 85, 95
- `closeStats()` js/ui/statistiche.js:219 funzione window ← index.html:364 (html)
- `reportBloccoHtml()` js/ui/statistiche.js:224 funzione ← nessun altro file — nel file: renderStats
- `periodoTitolo()` js/ui/statistiche.js:289 funzione ← nessun altro file — nel file: renderStats
- `renderStats()` js/ui/statistiche.js:295 funzione window ← nessun altro file — nel file: setStatsPeriodo, openStats

### `js/ui/statistiche-grafico.js`

- `statsGrafPeriodo` js/ui/statistiche-grafico.js:12 variabile ← tests/browser/guida-tocchi.js:102 — nel file: setStatsGrafPeriodo, renderStatsPagina
- `STG` js/ui/statistiche-grafico.js:13 costante ← nessun altro file — nel file: poligonoFrequenzaSvg
- `frequenzaSettimanale()` js/ui/statistiche-grafico.js:17 funzione window ← nessun altro file — nel file: graficoFrequenzaHtml
- `poligonoFrequenzaSvg()` js/ui/statistiche-grafico.js:51 funzione ← nessun altro file — nel file: graficoFrequenzaHtml
- `graficoFrequenzaHtml()` js/ui/statistiche-grafico.js:97 funzione ← js/ui/statistiche.js:240 reportBloccoHtml, 319 renderStats — nel file: renderStatsPagina
- `scelteStatsPeriodo()` js/ui/statistiche-grafico.js:113 funzione ← js/ui/statistiche.js:300 renderStats — nel file: renderStatsPagina
- `mostraPeriodoAttivo()` js/ui/statistiche-grafico.js:123 funzione ← js/ui/statistiche.js:301 renderStats — nel file: renderStatsPagina
- `setStatsGrafPeriodo()` js/ui/statistiche-grafico.js:131 funzione window ← tests/browser/statistiche.js:53, 57, 60
- `renderStatsPagina()` js/ui/statistiche-grafico.js:132 funzione window ← js/ui/progressi/pagine.js:46 apriPagProgressi — nel file: setStatsGrafPeriodo

## js/coach

### `js/coach/carichi/progressivo.js`

- `arrotonda()` js/coach/carichi/progressivo.js:21 funzione ← js/coach/prontezza.js:80 prontezzaDiOggi · js/coach/dolore-mattina.js:85 aggiustiAlCarico · js/coach/regole-ricerca.js:288 caricoInGriglia, 293 caricoSalito, 306 caricoSceso · js/dati/schede-tecniche.js:12 TECNICA (html)
- `incrementoPer()` js/coach/carichi/progressivo.js:23 funzione ← js/coach/dolore-mattina.js:83 aggiustiAlCarico · js/coach/regole-ricerca.js:439 caricoProssimoBase · js/dati/scheda-unica.js:26 schedaUnica · tests/scarichi.test.js:199 (html)
- `faseSedutaSalvata()` js/coach/carichi/progressivo.js:33 funzione ← js/coach/sicurezza/scarico.js:208 scarichiReattiviRecenti — nel file: esercizioInScarico
- `esercizioInScarico()` js/coach/carichi/progressivo.js:45 funzione ← js/coach/dolore-mattina.js:69 aggiustiAlCarico · js/coach/regole-ricerca.js:215 inScarico, 225 sessioniConData — nel file: sedutePerEsercizio
- `sedutePerEsercizio()` js/coach/carichi/progressivo.js:52 funzione ← js/coach/carichi/calibrazione.js:57 esposizioniCalibrazione, 135 storiaCalibrazione · js/coach/sicurezza/scarico.js:167 eserciziInCalo · js/coach/dolore-mattina.js:68 aggiustiAlCarico — nel file: ultimeSessioni, caricoRiferimento
- `ultimeSessioni()` js/coach/carichi/progressivo.js:64 funzione ← js/coach/catalogo-regole.js:127 COACH_REGOLE (html) · js/ui/allenamento/seduta.js:19 ultimaVoltaTesto · js/ui/allenamento/macchinario-occupato.js:168 sostituisciOggi · js/coach/carichi/partenza.js:211 stimaCaricoIniziale · js/coach/carichi/attrezzi.js:88 alTettoDeiManubri · js/coach/sicurezza/scarico.js:120 scaricoAlCarico · js/coach/regole-ricerca.js:361 caricoProssimoBase, 577 caricoProgressione · js/coach/regole-nuove.js:56 mancavaSoloUltimaSerie · js/coach/intensita.js:89 rirExtraIntensita · tests/carichi-onda0.test.js:367 (html), 374 (html) · tests/conserva-progressi.test.js:118 lettura (html) — nel file: pesoUltimoDi
- `GIORNI_CARICO_RIFERIMENTO` js/coach/carichi/progressivo.js:69 costante ← nessun altro file — nel file: caricoRiferimento
- `caricoRiferimento()` js/coach/carichi/progressivo.js:70 funzione ← js/coach/catalogo-regole.js:127 COACH_REGOLE (html) · js/coach/programma/alternative.js:63 caricoDelloStorico · js/coach/sicurezza/scarico.js:119 scaricoAlCarico · js/coach/dolore-mattina.js:67 aggiustiAlCarico · js/coach/regole-ricerca.js:236 ripresaDopoScarico, 393 caricoProssimoBase · tests/carichi-onda0.test.js:275 (html), 343 (html), 366 (html), 429 (html), 437 (html), 459 (html) · tests/conserva-progressi.test.js:118 lettura (html) · tests/intensita-onda0.test.js:239 (html)
- `pesoUltimoDi()` js/coach/carichi/progressivo.js:84 funzione ← js/coach/specialita/forza-carichi.js:107 forzaTetto · js/coach/programma/alternative.js:63 caricoDelloStorico · js/coach/sicurezza/scarico.js:126 scaricoAlCarico · js/coach/dolore-mattina.js:84 aggiustiAlCarico · tests/carichi-onda0.test.js:382 (html) · tests/conserva-progressi.test.js:118 lettura (html)
- `esito()` js/coach/carichi/progressivo.js:93 funzione ← js/coach/carichi/calibrazione.js:93 decisioneCalibrazione · js/coach/regole-ricerca.js:333 esitoDiLavoro, 366 caricoProssimoBase
- `settimanaProgramma()` js/coach/carichi/progressivo.js:107 funzione window ← js/ui/piano/giorno.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/mesociclo.js ×2 · js/coach/volume/rampa-settimana.js ×2 · js/coach/regia/brief.js ×2 · js/coach/specialita/forza-carichi.js ×1 · js/ui/onboarding-risultato.js ×1 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×2 · js/coach/sicurezza/popolazioni.js ×2 · js/coach/repertorio.js ×3 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×2 · js/coach/agente-consigli.js ×2 · js/coach/stato.js ×1 · js/coach/psicologia.js ×1 · tests/aiuto-atleta-piano.js ×2 · tests/conserva-progressi.test.js ×2 · tests/integrazione-3a.test.js ×3 · tests/mesociclo.test.js ×1 · tests/migrazione-v1.test.js ×1 · tests/popolazioni.test.js ×7 · tests/revisione-onda2d.test.js ×14 · tests/revisione-onda3a.test.js ×1 · tests/scarichi.test.js ×3 · tests/sicurezza-onda0.test.js ×1
- `frenoBia()` js/coach/carichi/progressivo.js:122 funzione ← js/coach/carichi/calibrazione.js:191 faseCalibrazione · js/coach/regole-ricerca.js:385 caricoProssimoBase, 645 ricalcoloDalMassimale

### `js/coach/carichi/e1rm.js`

- `e1rm()` js/coach/carichi/e1rm.js:17 funzione ← js/ui/allenamento/seduta.js:30 migliorUnoRM, 39 controllaRecord · js/coach/specialita/forza-carichi.js:92 forzaTetto · js/coach/regole-ricerca.js:601 massimaleRecente · js/ui/scheda-quattro-sezioni.js:35 seduteEsercizio, 111 paneRecord · tests/carichi-golden.test.js:465 (html), 466 (html), 467 (html), 470 (html), 471 (html), 472 (html), …
- `caricoPer()` js/coach/carichi/e1rm.js:28 funzione ← js/coach/specialita/forza-carichi.js:98 forzaTetto · js/coach/regole-ricerca.js:347 salitaDaRpe, 630 ricalcoloDalMassimale · tests/carichi-golden.test.js:469 (html), 470 (html), 471 (html)
- `e1rmSerie()` js/coach/carichi/e1rm.js:38 funzione ← tests/carichi-golden.test.js:482 (html) — nel file: e1rmSeduta
- `e1rmSeduta()` js/coach/carichi/e1rm.js:39 funzione ← js/coach/carichi/partenza.js:143 scalaDaStorico · js/coach/sicurezza/scarico.js:171 eserciziInCalo · js/coach/repertorio.js:50 livelloStandardForza, 217 eserciziFermi, 495 verdettoCiclo · js/coach/regole-ricerca.js:529 caricoProssimoBase · js/coach/agente-consigli.js:50 consigliCoach2 · tests/carichi-golden.test.js:485 (html), 486 (html), 487 (html) · tests/conserva-progressi.test.js:118 lettura (html)

### `js/coach/carichi/soglie-partenza.js`

- `SOGLIE_PARTENZA` js/coach/carichi/soglie-partenza.js:14 costante ← js/coach/carichi/partenza.js:69 sogliaPartenza · js/coach/carichi/calibrazione.js:166 faseCalibrazione

### `js/coach/carichi/soglie-progressione.js`

- `SOGLIE_PROGRESSIONE` js/coach/carichi/soglie-progressione.js:12 costante ← js/coach/carichi/attrezzi.js:22 sogliaProgressione

### `js/coach/carichi/partenza.js`

- `PARAM_PARTENZA` js/coach/carichi/partenza.js:28 costante ← nessun altro file — nel file: contestoCarichi, scalaDaCorpo, stimaCaricoIniziale
- `FRASE_PRIMA_ESPOSIZIONE` js/coach/carichi/partenza.js:41 costante ← nessun altro file — nel file: (primo livello)
- `FRASE_PARTENZA_BASSA` js/coach/carichi/partenza.js:42 costante ← nessun altro file — nel file: (primo livello)
- `FRASI_FONTE_STIMA` js/coach/carichi/partenza.js:43 costante ← nessun altro file — nel file: (primo livello)
- `MOTIVI_STIMA` js/coach/carichi/partenza.js:50 costante ← js/coach/regole-ricerca.js:686 carichiDelGiorno — nel file: (primo livello), stimaCaricoIniziale
- `NOTE_PROGRAMMA_STIMA` js/coach/carichi/partenza.js:55 costante ← nessun altro file — nel file: applicaPartenze
- `NOTA_PARTENZA_BASSA` js/coach/carichi/partenza.js:62 costante ← nessun altro file — nel file: applicaPartenze
- `NOTA_BARRA_VUOTA` js/coach/carichi/partenza.js:63 costante ← nessun altro file — nel file: pesoPartenza, applicaPartenze
- `NOTA_SENZA_BARRA` js/coach/carichi/partenza.js:64 costante ← js/coach/carichi/attrezzi.js:120 faseGrigliaETetto — nel file: pesoPartenza, applicaPartenze
- `notaCorpoLiberoFacile()` js/coach/carichi/partenza.js:66 funzione ← tests/partenza-donne.test.js:645 (html) — nel file: applicaPartenze
- `sogliaPartenza()` js/coach/carichi/partenza.js:69 funzione ← js/coach/carichi/calibrazione.js:50 personaCalibrazione, 69 percentualeSalto, 77 pesoDopoSalto, 94 decisioneCalibrazione, 117 storiaCalibrazione, 195 faseCalibrazione — nel file: notaCorpoLiberoFacile, contestoCarichi, fattorePartenza, scalaDaCorpo, scalaDaStorico, esercizioAffidabilePerLoStorico, arrotondaPartenza, stimaCaricoIniziale, …
- `fonteBase()` js/coach/carichi/partenza.js:71 funzione ← nessun altro file — nel file: applicaPartenze
- `contestoCarichi()` js/coach/carichi/partenza.js:74 funzione ← js/coach/carichi/attrezzi.js:64 tettoManubriDi · js/coach/carichi/calibrazione.js:51 personaCalibrazione · tests/aiuto-atleta.js:185 simulaNellApp (html) · tests/partenza-donne.test.js:29 CTX (html), 103 (html), 105 (html), 125 (html), 128 (html), 141 (html), … · tests/browser/carichi-evoluzione.js:66 · tests/browser/carichi-partenza.js:21 — nel file: pesoPartenza, penalitaPartenza, applicaPartenze
- `classePartenza()` js/coach/carichi/partenza.js:105 funzione ← js/coach/carichi/calibrazione.js:99 decisioneCalibrazione, 119 storiaCalibrazione — nel file: fattorePartenza
- `fattorePartenza()` js/coach/carichi/partenza.js:111 funzione ← nessun altro file — nel file: stimaCaricoIniziale
- `scalaDaCorpo()` js/coach/carichi/partenza.js:118 funzione ← nessun altro file — nel file: stimaCaricoIniziale
- `scalaDaStorico()` js/coach/carichi/partenza.js:136 funzione ← tests/partenza-donne.test.js:140 (html), 141 (html), 157 (html), 161 (html), 164 (html) · tests/browser/carichi-evoluzione.js:73 — nel file: stimaCaricoIniziale, penalitaPartenza, applicaPartenze
- `esercizioAffidabilePerLoStorico()` js/coach/carichi/partenza.js:162 funzione ← nessun altro file — nel file: scalaDaStorico
- `kStoricoPer()` js/coach/carichi/partenza.js:168 funzione ← nessun altro file — nel file: stimaCaricoIniziale
- `arrotondaPartenza()` js/coach/carichi/partenza.js:174 funzione ← js/coach/regia/genera.js:266 chiudiProgramma · js/coach/carichi/attrezzi.js:51 arrotondaAttrezzo · tests/bilancia-v2.test.js:128 (html) — nel file: stimaCaricoIniziale
- `passoCarico()` js/coach/carichi/partenza.js:184 funzione ← js/coach/carichi/calibrazione.js:76 pesoDopoSalto · tests/bilancia-v2.test.js:128 (html)
- `stimaCaricoIniziale()` js/coach/carichi/partenza.js:194 funzione window ← tests/aiuto-atleta.js:188 simulaNellApp (html) · tests/partenza-donne.test.js:30 stima (html), 141 (html), 543 (html) · tests/browser/carichi-evoluzione.js:69, 72 · tests/browser/carichi-partenza.js:22 — nel file: pesoPartenza, penalitaPartenza, applicaPartenze
- `tettoManubri()` js/coach/carichi/partenza.js:228 funzione ← nessun altro file — nel file: stimaCaricoIniziale, pesoPartenza, applicaPartenze
- `pesoPartenza()` js/coach/carichi/partenza.js:234 funzione ← js/ui/allenamento/macchinario-occupato.js:170 sostituisciOggi · js/ui/figura-anatomica.js:312 addLibraryExercise · js/coach/questionario-decisioni.js:271 applicaDecisioni · js/coach/repertorio.js:125 sostituisciNelPiano · js/ui/seduta-libera.js:125 eserciziDaNomi · tests/attrezzi-dichiarati.test.js:148 (html), 151 (html), 152 (html), 154 (html) · tests/browser/carichi-partenza.js:28
- `_PARTENZA_PER_BRIEF` js/coach/carichi/partenza.js:250 costante ← nessun altro file — nel file: penalitaPartenza
- `penalitaPartenza()` js/coach/carichi/partenza.js:251 funzione ← js/coach/catalogo-regole.js:131 COACH_REGOLE (html) · js/coach/programma/ricette.js:126 componiSedute · tests/partenza-donne.test.js:247 (html)
- `varianteSenzaBilanciere()` js/coach/carichi/partenza.js:268 funzione ← nessun altro file — nel file: applicaPartenze
- `FACILITATE_PAR09` js/coach/carichi/partenza.js:277 costante ← nessun altro file — nel file: versioneFacilitata
- `versioneFacilitata()` js/coach/carichi/partenza.js:281 funzione ← nessun altro file — nel file: applicaPartenze
- `applicaPartenze()` js/coach/carichi/partenza.js:295 funzione ← js/coach/regia/genera.js:379 generaProgramma

### `js/coach/carichi/attrezzi.js`

- `sogliaProgressione()` js/coach/carichi/attrezzi.js:22 funzione ← js/coach/regole-ricerca.js:275 progressioneV2, 315 notaPesoVicino, 344 salitaDaRpe, 462 caricoProssimoBase, 569 sedutaStessaBase, 590 massimaleRecente, … — nel file: passoAttrezzo, alTettoDeiManubri
- `voceAttrezzo()` js/coach/carichi/attrezzi.js:25 funzione ← nessun altro file — nel file: passoAttrezzo, arrotondaAttrezzo
- `passoAttrezzo()` js/coach/carichi/attrezzi.js:33 funzione ← js/coach/regole-ricerca.js:283 pesoGriglia · tests/bilancia-v2.test.js:128 (html), 145 (html), 146 (html) · tests/popolazioni.test.js:275 (html) — nel file: arrotondaAttrezzo
- `arrotondaAttrezzo()` js/coach/carichi/attrezzi.js:43 funzione ← js/coach/specialita/forza-carichi.js:95 forzaTetto · js/coach/regole-ricerca.js:278 grigliaAttiva, 282 pesoGriglia, 310 caricoSceso · tests/bilancia-v2.test.js:128 (html), 141 (html) — nel file: faseGrigliaETetto
- `esercizioConManubri()` js/coach/carichi/attrezzi.js:59 funzione ← nessun altro file — nel file: arrotondaAttrezzo, tettoManubriDi
- `tettoManubriDi()` js/coach/carichi/attrezzi.js:62 funzione ← nessun altro file — nel file: faseGrigliaETetto
- `fmtPeso()` js/coach/carichi/attrezzi.js:69 funzione ← nessun altro file — nel file: fraseGrigliaPiuVicino, fraseTettoRipetizioni, fraseTettoCima, fraseTettoSali, fraseTettoNonOltre
- `fraseGrigliaPiuVicino()` js/coach/carichi/attrezzi.js:70 funzione ← js/coach/regole-ricerca.js:316 notaPesoVicino — nel file: faseGrigliaETetto
- `fraseTettoRipetizioni()` js/coach/carichi/attrezzi.js:71 funzione ← nessun altro file — nel file: alTettoDeiManubri
- `fraseTettoCima()` js/coach/carichi/attrezzi.js:72 funzione ← nessun altro file — nel file: alTettoDeiManubri
- `fraseTettoSali()` js/coach/carichi/attrezzi.js:73 funzione ← nessun altro file — nel file: alTettoDeiManubri
- `fraseTettoNonOltre()` js/coach/carichi/attrezzi.js:74 funzione ← nessun altro file — nel file: alTettoDeiManubri
- `alTettoDeiManubri()` js/coach/carichi/attrezzi.js:79 funzione ← nessun altro file — nel file: faseGrigliaETetto
- `faseGrigliaETetto()` js/coach/carichi/attrezzi.js:111 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/carichi/calibrazione.js`

- `FRASE_CARICO_TARATO` js/coach/carichi/calibrazione.js:29 costante ← nessun altro file — nel file: faseCalibrazione
- `FRASE_SALTO_TROPPO_GRANDE_PRIMA` js/coach/carichi/calibrazione.js:31 costante ← nessun altro file — nel file: faseCalibrazione
- `FRASE_SALTO_TROPPO_GRANDE_DOPO` js/coach/carichi/calibrazione.js:31 costante ← nessun altro file — nel file: faseCalibrazione
- `FRASE_PROMEMORIA_RPE` js/coach/carichi/calibrazione.js:32 costante ← nessun altro file — nel file: faseCalibrazione
- `virgola()` js/coach/carichi/calibrazione.js:33 funzione ← nessun altro file — nel file: faseCalibrazione
- `recordPianoDi()` js/coach/carichi/calibrazione.js:36 funzione ← nessun altro file — nel file: storiaCalibrazione
- `personaCalibrazione()` js/coach/carichi/calibrazione.js:46 funzione ← nessun altro file — nel file: storiaCalibrazione
- `esposizioniCalibrazione()` js/coach/carichi/calibrazione.js:56 funzione ← nessun altro file — nel file: storiaCalibrazione
- `rpeCalibrazione()` js/coach/carichi/calibrazione.js:60 funzione ← nessun altro file — nel file: decisioneCalibrazione
- `rigaSalto()` js/coach/carichi/calibrazione.js:65 funzione ← nessun altro file — nel file: percentualeSalto
- `percentualeSalto()` js/coach/carichi/calibrazione.js:67 funzione ← nessun altro file — nel file: decisioneCalibrazione
- `pesoDopoSalto()` js/coach/carichi/calibrazione.js:75 funzione ← nessun altro file — nel file: decisioneCalibrazione
- `decisioneCalibrazione()` js/coach/carichi/calibrazione.js:87 funzione ← nessun altro file — nel file: storiaCalibrazione
- `storiaCalibrazione()` js/coach/carichi/calibrazione.js:109 funzione ← nessun altro file — nel file: calibrazioneChiusa, calibrazioneNellaSeduta, faseCalibrazione
- `calibrazioneChiusa()` js/coach/carichi/calibrazione.js:146 funzione ← js/coach/carichi/partenza.js:163 esercizioAffidabilePerLoStorico
- `calibrazioneNellaSeduta()` js/coach/carichi/calibrazione.js:152 funzione ← js/coach/intensita.js:128 bilancioPrimeSedute · js/coach/esigenza.js:76 aggiornaEsigenza
- `faseCalibrazione()` js/coach/carichi/calibrazione.js:162 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/carichi/taratura.js`

- `segnaEsercizioTaratura()` js/coach/carichi/taratura.js:17 funzione ← js/coach/regole-ricerca.js:696 carichiDelGiorno
- `apprendiTaraturaRir()` js/coach/carichi/taratura.js:29 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/sicurezza/soglie-scarico.js`

- `SOGLIE_SCARICO` js/coach/sicurezza/soglie-scarico.js:13 costante ← js/coach/sicurezza/scarico.js:37 sogliaScarico

### `js/coach/sicurezza/scarico.js`

- `programmaConPiano()` js/coach/sicurezza/scarico.js:31 funzione ← js/coach/volume/rampa-settimana.js:50 rampaAlCarico, 77 serieDelPianoQuestaSettimana · js/coach/questionario-decisioni.js:231 decisioniCoach · js/coach/prontezza.js:92 prontezzaDiOggi · js/coach/repertorio.js:294 azioniCoach · js/coach/dolore-mattina.js:72 aggiustiAlCarico — nel file: doseDelLivello, scaricoAlCarico, voceScaricoReattivo, valutaScaricoReattivo, stanchezzaPersistente
- `sogliaScarico()` js/coach/sicurezza/scarico.js:36 funzione ← js/coach/questionario-decisioni.js:233 decisioniCoach · js/coach/prontezza.js:116 prontezzaDiOggi · js/coach/repertorio.js:294 azioniCoach — nel file: doseDelLivello, serieDiScarico, voceScaricoReattivo, eserciziInCalo, segnaliFatica, valutaScaricoReattivo, stanchezzaPersistente
- `SOGLIA_SRPE_ALTA` js/coach/sicurezza/scarico.js:42 costante ← nessun altro file — nel file: livelloFatica
- `livelloFatica()` js/coach/sicurezza/scarico.js:44 funzione ← js/coach/programma/mesociclo.js:281 controlloOttavaPrincipiante · js/coach/questionario-decisioni.js:231 decisioniCoach · js/coach/regole-ricerca.js:362 caricoProssimoBase · tests/integrazione-3a.test.js:59 (html) · tests/revisione-onda2d.test.js:37 (html), 73 (html), 94 (html), 107 (html), 132 (html) · tests/scarichi.test.js:113 (html), 135 (html) — nel file: doseDellaSettimana, voceScaricoReattivo
- `testoDose()` js/coach/sicurezza/scarico.js:60 funzione ← js/coach/dolore-mattina.js:79 aggiustiAlCarico — nel file: doseDelLivello, scaricoAlCarico
- `doseDelLivello()` js/coach/sicurezza/scarico.js:65 funzione ← nessun altro file — nel file: DOSE_SCARICO
- `DOSE_SCARICO` js/coach/sicurezza/scarico.js:73 costante ← js/coach/questionario-decisioni.js:231 decisioniCoach · js/coach/dolore-mattina.js:72 aggiustiAlCarico · js/coach/regole-ricerca.js:362 caricoProssimoBase — nel file: doseDellaSettimana
- `serieDiScarico()` js/coach/sicurezza/scarico.js:80 funzione ← js/coach/dolore-mattina.js:77 aggiustiAlCarico · tests/scarichi.test.js:95 (html) — nel file: serieDelloScarico
- `doseDellaSettimana()` js/coach/sicurezza/scarico.js:86 funzione ← nessun altro file — nel file: serieDelloScarico, scaricoAlCarico
- `serieDelloScarico()` js/coach/sicurezza/scarico.js:91 funzione ← js/coach/volume/rampa-settimana.js:81 serieDelPianoQuestaSettimana — nel file: scaricoAlCarico
- `scaricoAlCarico()` js/coach/sicurezza/scarico.js:101 funzione ← nessun altro file — nel file: (primo livello)
- `scaricoReattivo()` js/coach/sicurezza/scarico.js:144 funzione ← tests/carichi-golden.test.js:492 (html) — nel file: voceScaricoReattivo
- `voceScaricoReattivo()` js/coach/sicurezza/scarico.js:150 funzione ← js/coach/questionario-decisioni.js:264 applicaDecisioni · js/coach/prontezza.js:104 prontezzaDiOggi · js/coach/repertorio.js:188 azioneCoach
- `eserciziInCalo()` js/coach/sicurezza/scarico.js:159 funzione ← tests/scarichi.test.js:305 (html), 309 (html) — nel file: segnaliFatica
- `segnaliFatica()` js/coach/sicurezza/scarico.js:178 funzione ← js/coach/catalogo-regole.js:291 COACH_REGOLE (html) · tests/scarichi.test.js:310 (html), 316 (html), 319 (html) — nel file: valutaScaricoReattivo
- `NOMI_SEGNALI` js/coach/sicurezza/scarico.js:198 costante ← nessun altro file — nel file: testoSegnali
- `scarichiReattiviRecenti()` js/coach/sicurezza/scarico.js:202 funzione ← nessun altro file — nel file: valutaScaricoReattivo, stanchezzaPersistente
- `valutaScaricoReattivo()` js/coach/sicurezza/scarico.js:220 funzione ← js/coach/catalogo-regole.js:291 COACH_REGOLE (html) · js/coach/questionario-decisioni.js:228 decisioniCoach · js/coach/prontezza.js:102 prontezzaDiOggi · js/coach/repertorio.js:186 azioneCoach, 296 azioniCoach · tests/scarichi.test.js:261 (html), 278 (html), 288 (html), 295 (html), 306 (html), 322 (html), …
- `testoSegnali()` js/coach/sicurezza/scarico.js:251 funzione ← js/coach/questionario-decisioni.js:233 decisioniCoach
- `stanchezzaPersistente()` js/coach/sicurezza/scarico.js:257 funzione ← js/coach/catalogo-regole.js:256 COACH_REGOLE (html) — nel file: htmlStanchezzaPersistente
- `htmlStanchezzaPersistente()` js/coach/sicurezza/scarico.js:270 funzione ← js/coach/catalogo-regole.js:256 COACH_REGOLE (html) · js/coach/prontezza.js:46 renderProntezza · tests/scarichi.test.js:489 html (html)
- `nascondiStanchezza()` js/coach/sicurezza/scarico.js:279 funzione window ← tests/scarichi.test.js:534 (html), 542 (html) — nel file: htmlStanchezzaPersistente

### `js/coach/sicurezza/soglie-popolazioni.js`

- `SOGLIE_POPOLAZIONI` js/coach/sicurezza/soglie-popolazioni.js:13 costante ← js/coach/sicurezza/popolazioni.js:28 sogliaPopolazione · tests/browser/gravidanza.js:26 pagina

### `js/coach/sicurezza/popolazioni.js`

- `sogliaPopolazione()` js/coach/sicurezza/popolazioni.js:27 funzione ← nessun altro file — nel file: inBaseOver65, potenzaAmmessaOver65, pavimentoRirPopolazioni, giorniContatiPausa, giorniDoppiAttivi, giorniRientroPiano, statoRientro, rirExtraRientro, …
- `inGravidanza()` js/coach/sicurezza/popolazioni.js:33 funzione ← js/coach/catalogo-regole.js:246 COACH_REGOLE (html) · js/ui/opzioni/il-coach.js:118 htmlGravidanzaCoach · js/coach/compone.js:33 guardiaNutrizione · tests/guardie-corpo.test.js:72 (html) · tests/popolazioni.test.js:292 (html), 293 (html), 294 (html) · tests/browser/gravidanza.js:26 pagina — nel file: pavimentoRirPopolazioni, rirExtraRientro, fasePopolazioni
- `inBaseOver65()` js/coach/sicurezza/popolazioni.js:39 funzione ← nessun altro file — nel file: potenzaAmmessaOver65, pavimentoRirPopolazioni
- `potenzaAmmessaOver65()` js/coach/sicurezza/popolazioni.js:49 funzione ← js/coach/sicurezza/tecnica-adatta.js:218 tecnicaAdatta
- `pavimentoRirPopolazioni()` js/coach/sicurezza/popolazioni.js:60 funzione ← js/coach/regole-ricerca.js:130 rirBersaglio · tests/popolazioni.test.js:76 (html)
- `programmaV2Rientro()` js/coach/sicurezza/popolazioni.js:74 funzione ← nessun altro file — nel file: giorniDoppiAttivi, rirExtraRientro, settimaneFermePerPausa, fasePopolazioni
- `MEMORIA_RIENTRO` js/coach/sicurezza/popolazioni.js:79 costante ← nessun altro file — nel file: ricordaRientro
- `ricordaRientro()` js/coach/sicurezza/popolazioni.js:80 funzione ← nessun altro file — nel file: statoRientro, settimaneFermePerPausa
- `giorniContatiPausa()` js/coach/sicurezza/popolazioni.js:92 funzione ← nessun altro file — nel file: giorniPausaContati, giorniRientroPiano, statoRientro, rientroRecente
- `giorniDoppiAttivi()` js/coach/sicurezza/popolazioni.js:99 funzione ← nessun altro file — nel file: giorniPausaContati, giorniRientroPiano, statoRientro, rientroRecente
- `giorniPausaContati()` js/coach/sicurezza/popolazioni.js:104 funzione ← js/coach/regole-ricerca.js:242 rientroDopoPausa
- `giorniRientroPiano()` js/coach/sicurezza/popolazioni.js:110 funzione ← js/coach/regole-nuove.js:38 rientroPiano
- `statoRientro()` js/coach/sicurezza/popolazioni.js:118 funzione ← nessun altro file — nel file: rirExtraRientro, fasePopolazioni
- `rirExtraRientro()` js/coach/sicurezza/popolazioni.js:137 funzione ← js/coach/regole-ricerca.js:126 rirBersaglio — nel file: fasePopolazioni
- `primaSettimanaDelBlocco()` js/coach/sicurezza/popolazioni.js:146 funzione ← nessun altro file — nel file: settimaneFermePerPausa
- `settimaneFermePerPausa()` js/coach/sicurezza/popolazioni.js:158 funzione ← js/coach/carichi/progressivo.js:112 settimanaProgramma
- `rientroRecente()` js/coach/sicurezza/popolazioni.js:186 funzione ← nessun altro file — nel file: fasePopolazioni
- `FRASI_POPOLAZIONI` js/coach/sicurezza/popolazioni.js:202 costante ← nessun altro file — nel file: fasePopolazioni
- `fasePopolazioni()` js/coach/sicurezza/popolazioni.js:213 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/questionario-decisioni.js`

- `AGG_KEY()` js/coach/questionario-decisioni.js:28 funzione ← js/coach/sicurezza/scarico.js:280 nascondiStanchezza · js/coach/prontezza.js:97 prontezzaDiOggi · js/coach/repertorio.js:144 conAnnulla · tests/aiuto-app.js:106 caricaApp (html) · tests/conserva-progressi.test.js:232 (html), 259 (html), 275 (html) · tests/integrazione-3a.test.js:189 (html) · tests/migrazione-v1.test.js:176 (html) · tests/sicurezza-onda0.test.js:149 (html) — nel file: aggiustiCoach, salvaAggiusti, applicaDecisioni
- `aggiustiCoach()` js/coach/questionario-decisioni.js:29 funzione window ← js/coach/programma/mesociclo.js ×2 · js/coach/regia/brief.js ×2 · js/coach/carichi/calibrazione.js ×2 · js/coach/carichi/taratura.js ×1 · js/coach/sicurezza/scarico.js ×3 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×9 · js/coach/dolore-mattina.js ×4 · js/coach/regole-ricerca.js ×4 · tests/carichi-golden.test.js ×5 · tests/conserva-progressi.test.js ×1 · tests/intensita-onda0.test.js ×3 · tests/migrazione-v1.test.js ×2 · tests/scarichi.test.js ×1 · tests/sicurezza-onda0.test.js ×1 — nel file: applicaDecisioni
- `salvaAggiusti()` js/coach/questionario-decisioni.js:33 funzione ← js/coach/carichi/taratura.js:37 apprendiTaraturaRir · js/coach/sicurezza/scarico.js:283 nascondiStanchezza · js/coach/prontezza.js:105 prontezzaDiOggi · js/coach/repertorio.js:162 azioneCoach, 453 rispostaAderenza · js/coach/dolore-mattina.js:37 rispostaDolore, 49 consumaAggiusti · js/coach/regole-ricerca.js:713 contaStalli — nel file: applicaDecisioni
- `ZONE_DOLORE` js/coach/questionario-decisioni.js:35 costante ← js/coach/dolore-mattina.js:19 htmlControlloDolore — nel file: renderQuestionario, decisioniCoach
- `ZONA_ART` js/coach/questionario-decisioni.js:40 costante ← nessun altro file — nel file: zonaA, zonaIl
- `zonaA()` js/coach/questionario-decisioni.js:41 funzione ← nessun altro file — nel file: decisioniCoach
- `zonaIl()` js/coach/questionario-decisioni.js:42 funzione ← nessun altro file — nel file: decisioniCoach
- `STRESS_ZONA` js/coach/questionario-decisioni.js:45 costante ← nessun altro file — nel file: varianteStessoMuscolo, fbZona, decisioniCoach
- `senzaEmoji()` js/coach/questionario-decisioni.js:55 funzione ← js/lingue/traduttore.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/coach/programma/motore.js ×6 · js/coach/programma/schemi.js ×2 · js/coach/programma/ricette.js ×14 · js/coach/programma/struttura-pro.js ×11 · js/coach/programma/completamenti.js ×20 · js/coach/volume/serie-ripetizioni.js ×2 · js/coach/volume/volume.js ×10 · js/coach/volume/tempo.js ×10 · js/coach/sicurezza/tecnica-adatta.js ×1 · js/coach/sicurezza/fastidi.js ×1 · js/coach/regia/genera.js ×12 · js/coach/specialita/forza.js ×1 · js/ui/onboarding-risultato.js ×1 · js/coach/carichi/partenza.js ×2 · js/coach/carichi/attrezzi.js ×1 · js/coach/repertorio.js ×3 · js/coach/regole-ricerca.js ×2 · js/coach/agente-consigli.js ×1 · js/ui/opzioni/il-coach.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×4 · js/ui/seduta-libera.js ×4 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/biomeccanica.js ×4 · js/ui/scheda-quattro-sezioni.js ×3 · js/dati/schede-tecniche.js ×5 · tests/attrezzi-dichiarati.test.js ×1 · tests/attrezzi-onboarding.test.js ×1 · tests/forza-equilibrio.test.js ×2 · tests/forza-ordine-alzata.test.js ×6 · tests/hip-hinge-ripiego.test.js ×4 · tests/integrazione-onda2c.test.js ×2 · tests/memoria-chiamata.test.js ×3 · tests/tempo-copertura.test.js ×1 · tests/volume.test.js ×1 · tests/browser/coerenza-schede.js ×1 — nel file: nomeInLibreria, varianteStessoMuscolo, fbZona, renderQuestionario, decisioniCoach, applicaDecisioni
- `nomeInLibreria()` js/coach/questionario-decisioni.js:62 funzione ← js/coach/programma/schemi.js ×1 · js/coach/programma/ricette.js ×3 · js/coach/programma/struttura-pro.js ×1 · js/coach/programma/completamenti.js ×10 · js/coach/sicurezza/vincoli.js ×3 · js/coach/sicurezza/tecnica-adatta.js ×1 · js/coach/specialita/forza.js ×9 · js/coach/carichi/attrezzi.js ×1 · js/coach/regole-ricerca.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/importa-csv.js ×2 · js/coach/biomeccanica.js ×2 · js/coach/psicologia.js ×1 · tests/attrezzi-dichiarati.test.js ×5 · tests/fastidi.test.js ×4 · tests/forza-ordine-alzata.test.js ×2 · tests/genera-stadi.test.js ×4 · tests/generatore-onda0b.test.js ×7 · tests/hip-hinge-ripiego.test.js ×2 · tests/integrazione-onda2c.test.js ×3 · tests/popolazioni.test.js ×1 · tests/tempo-copertura.test.js ×1 · tests/browser/coerenza-schede.js ×1
- `REGIONE_RISCHIO_DOLORE` js/coach/questionario-decisioni.js:74 costante ← nessun altro file — nel file: varianteStessoMuscolo
- `varianteStessoMuscolo()` js/coach/questionario-decisioni.js:75 funzione ← nessun altro file — nel file: decisioniCoach
- `eserciziDeiGiorniCon()` js/coach/questionario-decisioni.js:94 funzione ← nessun altro file — nel file: decisioniCoach
- `PARAM_FATICA_SEDUTA` js/coach/questionario-decisioni.js:99 costante ← nessun altro file — nel file: sedutaPesante, renderQuestionario, decisioniCoach
- `FRASE_RINVIO_MEDICO` js/coach/questionario-decisioni.js:102 costante ← nessun altro file — nel file: decisioniCoach
- `NOTA_AMPIEZZA_SENZA_DOLORE` js/coach/questionario-decisioni.js:104 costante ← nessun altro file — nel file: decisioniCoach
- `sedutaPesante()` js/coach/questionario-decisioni.js:105 funzione ← js/coach/programma/mesociclo.js:255 segnaliControlloOttava · js/coach/sicurezza/scarico.js:192 segnaliFatica — nel file: decisioniCoach
- `fbState` js/coach/questionario-decisioni.js:107 variabile ← nessun altro file — nel file: apriQuestionario, fbSet, fbZona, fbEsercizio, fbLivello, fbScelta, renderQuestionario, chiudiQuestionario, …
- `apriQuestionario()` js/coach/questionario-decisioni.js:108 funzione window ← js/ui/allenamento/termina-e-cardio.js:197 endWorkout · tests/sicurezza-onda0.test.js:59 (html)
- `fbSet()` js/coach/questionario-decisioni.js:118 funzione window ← nessun altro file — nel file: fbScelta
- `fbZona()` js/coach/questionario-decisioni.js:123 funzione window ← nessun altro file — nel file: renderQuestionario
- `fbEsercizio()` js/coach/questionario-decisioni.js:132 funzione window ← nessun altro file — nel file: renderQuestionario
- `fbLivello()` js/coach/questionario-decisioni.js:138 funzione window ← nessun altro file — nel file: renderQuestionario
- `etichettaDolore()` js/coach/questionario-decisioni.js:139 funzione ← nessun altro file — nel file: fbLivello, renderQuestionario
- `fbScelta()` js/coach/questionario-decisioni.js:141 funzione ← nessun altro file — nel file: renderQuestionario
- `renderQuestionario()` js/coach/questionario-decisioni.js:146 funzione ← nessun altro file — nel file: apriQuestionario, fbSet, fbZona, fbEsercizio
- `chiudiQuestionario()` js/coach/questionario-decisioni.js:172 funzione window ← index.html:336 (html), 342 (html) — nel file: inviaQuestionario
- `decisioniCoach()` js/coach/questionario-decisioni.js:179 funzione window ← tests/fastidi.test.js:165 (html) · tests/migrazione-v1.test.js:178 (html), 180 (html) · tests/sicurezza-onda0.test.js:22 decidi (html), 146 (html), 161 (html) — nel file: inviaQuestionario
- `applicaDecisioni()` js/coach/questionario-decisioni.js:245 funzione ← tests/carichi-golden.test.js:495 (html) · tests/migrazione-v1.test.js:181 (html) · tests/sicurezza-onda0.test.js:152 (html), 166 (html) — nel file: inviaQuestionario
- `riduciFrequenza()` js/coach/questionario-decisioni.js:295 funzione window ← js/coach/repertorio.js:461 rispostaAderenza — nel file: inviaQuestionario
- `inviaQuestionario()` js/coach/questionario-decisioni.js:306 funzione window ← nessun altro file — nel file: apriQuestionario
- `__fbAnnulla()` js/coach/questionario-decisioni.js:323 funzione window ← nessun altro file

### `js/coach/prontezza.js`

- `PRONTEZZA_KEY()` js/coach/prontezza.js:19 funzione ← js/ui/allenamento/termina-e-cardio.js:199 endWorkout · tests/conserva-progressi.test.js:106 seminaStoria (html) · tests/partenza-donne.test.js:411 (html) — nel file: leggiProntezza, saltaProntezza, prontezzaDiOggi
- `PRONTEZZA_VOCI` js/coach/prontezza.js:20 costante ← nessun altro file — nel file: vociProntezza
- `VOCE_CICLO` js/coach/prontezza.js:27 costante ← nessun altro file — nel file: vociProntezza
- `vociProntezza()` js/coach/prontezza.js:28 funzione ← nessun altro file — nel file: punteggioProntezza, renderProntezza, sceltaProntezza
- `prontezzaStato` js/coach/prontezza.js:29 variabile ← nessun altro file — nel file: renderProntezza, sceltaProntezza, saltaProntezza, prontezzaDiOggi
- `leggiProntezza()` js/coach/prontezza.js:30 funzione ← js/coach/programma/mesociclo.js:381 rirPianoSettimana · js/coach/carichi/calibrazione.js:190 faseCalibrazione — nel file: prontezzaOggi, renderProntezza
- `prontezzaOggi()` js/coach/prontezza.js:31 funzione ← js/ui/allenamento/termina-e-cardio.js:121 endWorkout · js/coach/regole-nuove.js:103 limitaTecnicheIntense
- `punteggioProntezza()` js/coach/prontezza.js:35 funzione ← nessun altro file — nel file: prontezzaDiOggi
- `renderProntezza()` js/coach/prontezza.js:40 funzione ← js/ui/allenamento/sessione.js:93 openWorkoutDay · js/coach/sicurezza/scarico.js:284 nascondiStanchezza — nel file: sceltaProntezza, saltaProntezza, prontezzaDiOggi
- `sceltaProntezza()` js/coach/prontezza.js:54 funzione window ← nessun altro file — nel file: renderProntezza
- `saltaProntezza()` js/coach/prontezza.js:59 funzione window ← nessun altro file — nel file: renderProntezza
- `applicaProntezza()` js/coach/prontezza.js:66 funzione window ← tests/carichi-golden.test.js:210 eseguiCaso (html), 503 (html) · tests/integrazione-3a.test.js:31 (html), 39 (html), 51 (html) · tests/intensita-onda0.test.js:367 (html) — nel file: sceltaProntezza
- `prontezzaDiOggi()` js/coach/prontezza.js:69 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/mi-sento-male.js`

- `apriMiSentoMale()` js/coach/mi-sento-male.js:9 funzione window ← index.html:194 (html)
- `chiudiMiSentoMale()` js/coach/mi-sento-male.js:14 funzione window ← index.html:796 (html), 809 (html) — nel file: chiudiSedutaInterrotta
- `chiudiSedutaInterrotta()` js/coach/mi-sento-male.js:15 funzione window ← index.html:808 (html)
- `minutiSeduta()` js/coach/mi-sento-male.js:22 funzione ← js/ui/allenamento/termina-e-cardio.js:120 endWorkout

### `js/coach/repertorio.js`

- `STANDARD_FORZA` js/coach/repertorio.js:23 costante ← nessun altro file — nel file: livelloStandardForza
- `ALZATE_BASE` js/coach/repertorio.js:27 costante ← nessun altro file — nel file: livelloStandardForza
- `pesoCorporeo()` js/coach/repertorio.js:28 funzione ← nessun altro file — nel file: livelloStandardForza, corpoCoach
- `STD_SOGLIA_INTERMEDIO` js/coach/repertorio.js:38 costante ← nessun altro file — nel file: proposteLivello
- `STD_SOGLIA_AVANZATO` js/coach/repertorio.js:38 costante ← nessun altro file — nel file: proposteLivello
- `STD_MINIMO_ALZATE` js/coach/repertorio.js:38 costante ← nessun altro file — nel file: proposteLivello
- `COACH_GIORNI_REVISIONE_LIVELLO` js/coach/repertorio.js:39 costante ← nessun altro file — nel file: azioniCoach
- `livelloStandardForza()` js/coach/repertorio.js:40 funzione ← nessun altro file — nel file: proposteLivello
- `proposteLivello()` js/coach/repertorio.js:63 funzione ← nessun altro file — nel file: livelloStimato
- `livelloStimato()` js/coach/repertorio.js:85 funzione window ← js/ui/opzioni/il-coach.js:12 paginaCoach · tests/generatore-onda0b.test.js:431 (html), 434 (html), 435 (html), 436 (html) · tests/intensita-onda0.test.js:391 (html), 404 (html), 405 (html), 411 (html), 415 (html), 440 (html), … · tests/migrazione-v1.test.js:192 (html) — nel file: azioneCoach, azioniCoach, nuovoCiclo
- `prefsCoach()` js/coach/repertorio.js:113 funzione ← js/coach/questionario-decisioni.js:185 decisioniCoach · js/dati/schede-tecniche.js:224 preferisci · tests/split.test.js:171 (html) — nel file: azioneCoach
- `sostituisciNelPiano()` js/coach/repertorio.js:118 funzione ← js/dati/schede-tecniche.js:226 preferisci — nel file: azioneCoach
- `cambiaSerieNelPiano()` js/coach/repertorio.js:131 funzione ← nessun altro file — nel file: azioneCoach
- `conAnnulla()` js/coach/repertorio.js:142 funzione ← js/dati/schede-tecniche.js:226 preferisci · tests/integrazione-3a.test.js:186 (html) — nel file: azioneCoach, rispostaAderenza
- `azioneCoach()` js/coach/repertorio.js:152 funzione window ← tests/intensita-onda0.test.js:397 (html), 419 (html), 448 (html), 453 (html) — nel file: azioniCoach
- `bloccoCorrente()` js/coach/repertorio.js:210 funzione ← nessun altro file — nel file: azioneCoach, azioniCoach
- `eserciziFermi()` js/coach/repertorio.js:213 funzione ← tests/intensita-onda0.test.js:474 (html), 479 (html) · tests/migrazione-v1.test.js:194 (html) — nel file: azioniCoach
- `strainSettimane()` js/coach/repertorio.js:233 funzione ← tests/migrazione-v1.test.js:194 (html) — nel file: azioniCoach
- `scaricoRecente()` js/coach/repertorio.js:255 funzione ← js/coach/sicurezza/scarico.js:235 valutaScaricoReattivo — nel file: azioniCoach
- `controlloSchemi()` js/coach/repertorio.js:262 funzione ← js/coach/agente-consigli.js:169 renderAgent
- `azioniCoach()` js/coach/repertorio.js:274 funzione ← js/coach/agente-consigli.js:163 renderAgent · tests/generatore-onda0b.test.js:432 (html) · tests/intensita-onda0.test.js:395 (html), 406 (html), 443 (html), 444 (html), 454 (html), 457 (html), …
- `corpoCoach()` js/coach/repertorio.js:311 funzione ← js/coach/agente-consigli.js:175 renderAgent · tests/genera-stadi.test.js:86 (html) · tests/intensita-onda0.test.js:493 (html), 501 (html)
- `sedutaSaltata()` js/coach/repertorio.js:353 funzione ← nessun altro file — nel file: htmlSedutaSaltata
- `prossimoGiornoLibero()` js/coach/repertorio.js:364 funzione ← nessun altro file — nel file: htmlSedutaSaltata, sceltaSaltata
- `htmlSedutaSaltata()` js/coach/repertorio.js:372 funzione ← js/ui/oggi.js:114 renderOggi
- `sceltaSaltata()` js/coach/repertorio.js:389 funzione window ← nessun altro file — nel file: htmlSedutaSaltata
- `aderenzaDueSettimane()` js/coach/repertorio.js:430 funzione ← nessun altro file — nel file: htmlAderenza
- `htmlAderenza()` js/coach/repertorio.js:440 funzione ← js/ui/oggi.js:114 renderOggi
- `rispostaAderenza()` js/coach/repertorio.js:452 funzione window ← nessun altro file — nel file: htmlAderenza
- `htmlOrario()` js/coach/repertorio.js:470 funzione ← js/ui/oggi.js:115 renderOggi
- `verdettoCiclo()` js/coach/repertorio.js:480 funzione ← tests/intensita-onda0.test.js:183 (html), 198 (html) · tests/migrazione-v1.test.js:190 (html) — nel file: htmlFineCiclo, nuovoCiclo
- `htmlFineCiclo()` js/coach/repertorio.js:514 funzione ← js/ui/oggi.js:114 renderOggi
- `nuovoCiclo()` js/coach/repertorio.js:526 funzione window ← js/ui/opzioni/il-coach.js:61 paginaCoach (html) · tests/conserva-progressi.test.js:59 rifai (html), 71 creaBase (html), 256 (html) · tests/forza-attivazione.test.js:88 (html), 94 (html) · tests/intensita-onda0.test.js:424 (html) · tests/migrazione-v1.test.js:201 (html) — nel file: htmlFineCiclo

### `js/coach/dolore-mattina.js`

- `controlloDoloreDaFare()` js/coach/dolore-mattina.js:10 funzione ← nessun altro file — nel file: htmlControlloDolore
- `htmlControlloDolore()` js/coach/dolore-mattina.js:16 funzione ← js/ui/oggi.js:114 renderOggi
- `rispostaDolore()` js/coach/dolore-mattina.js:25 funzione window ← nessun altro file — nel file: htmlControlloDolore
- `consumaAggiusti()` js/coach/dolore-mattina.js:42 funzione ← js/ui/allenamento/termina-e-cardio.js:196 endWorkout
- `RIR_MIN_DOLORE` js/coach/dolore-mattina.js:53 costante ← nessun altro file — nel file: aggiustiAlCarico
- `aggiustiAlCarico()` js/coach/dolore-mattina.js:59 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/regole-ricerca.js`

- `TECNICHE` js/coach/regole-ricerca.js:42 costante ← js/ui/allenamento/seduta.js:167 renderAllenamento · js/ui/opzioni/il-coach.js:59 paginaCoach · tests/browser/metodi-epoca-oro.js:22, 34, 36
- `profiloCoach()` js/coach/regole-ricerca.js:59 funzione ← js/coach/carichi/calibrazione.js:48 personaCalibrazione · js/coach/carichi/taratura.js:18 segnaEsercizioTaratura · js/coach/sicurezza/popolazioni.js:101 giorniDoppiAttivi, 139 rirExtraRientro, 215 fasePopolazioni · js/coach/repertorio.js:65 proposteLivello, 214 eserciziFermi · js/coach/regole-nuove.js:67 regoleRicAlCarico · js/coach/agente-consigli.js:31 consigliCoach2 — nel file: pisoRirEsigenza, pavimentoRirMinorenni, pavimentoRirPrincipiante, rirDalPiano, rirBersaglioPerLivello, caricoProssimoBase, ricalcoloDalMassimale
- `BIL_PESANTI` js/coach/regole-ricerca.js:66 costante ← nessun altro file — nel file: tipoCarico
- `tipoCarico()` js/coach/regole-ricerca.js:67 funzione ← js/dati/attributi-esercizi.js ×1 · js/coach/programma/ricette.js ×6 · js/coach/programma/struttura-pro.js ×6 · js/coach/programma/mesociclo.js ×2 · js/coach/programma/completamenti.js ×3 · js/coach/volume/serie-ripetizioni.js ×1 · js/coach/volume/volume.js ×1 · js/coach/volume/tempo.js ×2 · js/coach/volume/tecniche.js ×2 · js/coach/carichi/taratura.js ×1 · js/coach/repertorio.js ×5 · js/coach/metodi-momenti.js ×1 · js/coach/compone.js ×3 · js/dati/schede-tecniche.js ×2 · js/dati/scheda-unica.js ×1 · tests/forza-ordine-alzata.test.js ×1 · tests/memoria-chiamata.test.js ×1 · tests/browser/coerenza-schede.js ×4 · tests/browser/metodi-epoca-oro.js ×1 — nel file: rirBersaglio, rirDalPiano, rirBersaglioPerLivello, caricoProssimoBase
- `RIR_TIPO` js/coach/regole-ricerca.js:75 costante ← nessun altro file — nel file: rirBersaglioPerLivello
- `MES_RIR` js/coach/regole-ricerca.js:80 costante ← nessun altro file — nel file: pisoRirEsigenza, pavimentoRirMinorenni, pavimentoRirPrincipiante, rirDalPiano, rirBersaglioPerLivello
- `primaSettimanaBlocco()` js/coach/regole-ricerca.js:82 funzione ← nessun altro file — nel file: pisoRirEsigenza, rirBersaglioPerLivello
- `inDeficitCalorico()` js/coach/regole-ricerca.js:87 funzione ← js/coach/programma/mesociclo.js:377 rirPianoSettimana · tests/genera-stadi.test.js:96 (html) — nel file: pisoRirEsigenza
- `pisoRirEsigenza()` js/coach/regole-ricerca.js:92 funzione ← tests/genera-stadi.test.js:103 (html) — nel file: rirBersaglio
- `pavimentoRirMinorenni()` js/coach/regole-ricerca.js:101 funzione ← tests/integrazione-onda2b.test.js:66 (html) · tests/tecniche.test.js:448 (html) — nel file: rirBersaglio, rirBersaglioBase
- `pavimentoRirPrincipiante()` js/coach/regole-ricerca.js:108 funzione ← nessun altro file — nel file: rirBersaglioBase
- `rirBersaglio()` js/coach/regole-ricerca.js:112 funzione ← js/ui/allenamento/termina-e-cardio.js:21 obiettivoSeduta · js/dati/schede-tecniche.js:204 preferenzaEsercizio · js/dati/scheda-unica.js:26 schedaUnica · tests/aiuto-atleta-piano.js:83 vivi (html) · tests/aiuto-atleta.js:197 simulaNellApp (html) · tests/bilancia-v2.test.js:193 rirMedio (html) · tests/forza-carichi.test.js:66 dodiciSettimane (html) · tests/popolazioni.test.js:148 fatta (html), 241 (html), 266 (html), 324 (html), 396 (html) · tests/revisione-onda3a.test.js:73 (html) · tests/browser/gravidanza.js:51, 63 · tests/browser/intensita-bia.js:43, 45, 47, 49, 54 — nel file: rpeBersaglio, testoRir, ricalcoloDalMassimale
- `rirDalPiano()` js/coach/regole-ricerca.js:136 funzione ← nessun altro file — nel file: rirBersaglioBase
- `rirBersaglioBase()` js/coach/regole-ricerca.js:150 funzione ← js/coach/specialita/forza-carichi.js:44 forzaRirMedio · tests/integrazione-onda2b.test.js:42 (html), 49 (html), 50 (html), 66 (html) · tests/mesociclo.test.js:326 (html) · tests/revisione-onda2d.test.js:254 rirDiTutte (html), 268 (html) · tests/tecniche.test.js:442 (html) — nel file: rirBersaglio
- `rirBersaglioPerLivello()` js/coach/regole-ricerca.js:151 funzione ← tests/integrazione-onda2b.test.js:66 (html) · tests/tecniche.test.js:448 (html), 461 (html), 466 (html) — nel file: rirBersaglioBase
- `storicoProntezza()` js/coach/regole-ricerca.js:168 funzione ← js/coach/programma/mesociclo.js:257 segnaliControlloOttava, 282 controlloOttavaPrincipiante · js/coach/sicurezza/scarico.js:46 livelloFatica, 182 segnaliFatica, 262 stanchezzaPersistente · js/coach/prontezza.js:93 prontezzaDiOggi · js/coach/repertorio.js:277 azioniCoach · js/coach/agente-consigli.js:34 consigliCoach2 · js/coach/metodi-momenti.js:219 prontezzaBassaSettimana · js/coach/esigenza.js:83 aggiornaEsigenza — nel file: caricoProssimoBase
- `rpeBersaglio()` js/coach/regole-ricerca.js:169 funzione ← js/coach/esigenza.js:41 rpeBersaglioSeduta · js/dati/scheda-unica.js:26 schedaUnica · tests/browser/intensita-bia.js:98 — nel file: rpeBersaglioDiQuellaSeduta
- `rpeBersaglioDiQuellaSeduta()` js/coach/regole-ricerca.js:173 funzione ← nessun altro file — nel file: caricoProssimoBase
- `testoRir()` js/coach/regole-ricerca.js:179 funzione ← js/coach/carichi/attrezzi.js:105 alTettoDeiManubri · js/coach/sicurezza/scarico.js:131 scaricoAlCarico · js/coach/dolore-mattina.js:104 aggiustiAlCarico · tests/revisione-onda3a.test.js:231 (html)
- `PARAM_ANALISI` js/coach/regole-ricerca.js:191 costante ← js/coach/repertorio.js:296 azioniCoach, 507 verdettoCiclo — nel file: caricoProssimoBase
- `faseDelGiorno()` js/coach/regole-ricerca.js:200 funzione ← js/coach/sicurezza/scarico.js:241 valutaScaricoReattivo · js/coach/repertorio.js:249 strainSettimane, 257 scaricoRecente · js/coach/esigenza.js:68 aggiornaEsigenza
- `settimanaDellaSeduta()` js/coach/regole-ricerca.js:206 funzione ← js/coach/esigenza.js:45 rpeBersaglioSeduta
- `inScarico()` js/coach/regole-ricerca.js:214 funzione ← js/coach/repertorio.js:49 livelloStandardForza, 217 eserciziFermi, 249 strainSettimane, 258 scaricoRecente, 496 verdettoCiclo · js/coach/esigenza.js:68 aggiornaEsigenza
- `sessioniConData()` js/coach/regole-ricerca.js:219 funzione ← js/coach/sicurezza/popolazioni.js:187 rientroRecente — nel file: ripresaDopoScarico, caricoProssimoBase, sedutaStessaBase, massimaleRecente, ricalcoloDalMassimale
- `ripresaDopoScarico()` js/coach/regole-ricerca.js:233 funzione ← js/coach/intensita.js:90 rirExtraIntensita — nel file: testoRir
- `rientroDopoPausa()` js/coach/regole-ricerca.js:241 funzione ← js/coach/carichi/calibrazione.js:139 storiaCalibrazione · js/coach/sicurezza/popolazioni.js:194 rientroRecente — nel file: caricoProssimoBase, ricalcoloDalMassimale
- `fmtKg()` js/coach/regole-ricerca.js:249 funzione ← js/coach/sicurezza/scarico.js:130 scaricoAlCarico · js/coach/sicurezza/popolazioni.js:208 FRASI_POPOLAZIONI — nel file: caricoProssimoBase, fraseRicalcolo
- `obiettivoForza()` js/coach/regole-ricerca.js:251 funzione ← nessun altro file — nel file: caricoProssimoBase
- `progressioneV2()` js/coach/regole-ricerca.js:273 funzione ← js/coach/specialita/forza-carichi.js:117 forzaCaricoGiorno — nel file: rpeBersaglioDiQuellaSeduta, caricoProssimoBase, sedutaStessaBase, caricoProgressione, ricalcoloDalMassimale
- `grigliaAttiva()` js/coach/regole-ricerca.js:278 funzione ← js/coach/specialita/forza-carichi.js:95 forzaTetto — nel file: caricoInGriglia, caricoSalito, caricoSceso, notaPesoVicino, caricoProssimoBase, ricalcoloDalMassimale
- `pesoGriglia()` js/coach/regole-ricerca.js:281 funzione ← nessun altro file — nel file: caricoInGriglia, caricoSalito, caricoSceso, ricalcoloDalMassimale
- `caricoInGriglia()` js/coach/regole-ricerca.js:286 funzione ← js/coach/sicurezza/scarico.js:122 scaricoAlCarico — nel file: caricoProssimoBase
- `caricoSalito()` js/coach/regole-ricerca.js:292 funzione ← js/coach/sicurezza/popolazioni.js:244 fasePopolazioni · js/coach/dolore-mattina.js:97 aggiustiAlCarico — nel file: caricoProssimoBase
- `caricoSceso()` js/coach/regole-ricerca.js:305 funzione ← js/coach/sicurezza/scarico.js:122 scaricoAlCarico · js/coach/sicurezza/popolazioni.js:222 fasePopolazioni · js/coach/prontezza.js:80 prontezzaDiOggi · js/coach/dolore-mattina.js:76 aggiustiAlCarico · tests/popolazioni.test.js:170 (html), 182 (html), 191 (html), 198 (html), 201 (html), 226 (html), … — nel file: caricoProssimoBase, carichiDelGiorno
- `notaPesoVicino()` js/coach/regole-ricerca.js:314 funzione ← js/coach/prontezza.js:83 prontezzaDiOggi — nel file: caricoProssimoBase
- `caricoDiLavoro()` js/coach/regole-ricerca.js:320 funzione ← js/coach/specialita/forza-carichi.js:70 forzaPesoEsposizione · js/coach/sicurezza/popolazioni.js:195 rientroRecente — nel file: caricoProssimoBase, caricoProgressione, massimaleRecente, ricalcoloDalMassimale
- `esitoDiLavoro()` js/coach/regole-ricerca.js:332 funzione ← nessun altro file — nel file: caricoProssimoBase, ricalcoloDalMassimale
- `FRASE_PESO_CAMBIATO` js/coach/regole-ricerca.js:337 costante ← nessun altro file — nel file: caricoProgressione
- `FRASE_SCOPO_SCARICO` js/coach/regole-ricerca.js:339 costante ← nessun altro file — nel file: caricoProssimoBase
- `salitaDaRpe()` js/coach/regole-ricerca.js:343 funzione ← tests/bilancia-v2.test.js:247 (html) — nel file: caricoProssimoBase
- `caricoProssimoBase()` js/coach/regole-ricerca.js:350 funzione ← js/coach/catalogo-regole.js:228 COACH_REGOLE (html) — nel file: caricoProgressione
- `caricoProssimo()` js/coach/regole-ricerca.js:554 funzione window ← js/ui/oggi.js:32 stimaSeduta · js/coach/agente-consigli.js:186 renderAgent · tests/integrazione-3a.test.js:60 (html), 72 (html), 144 nuovoEsercizio (html) · tests/piano-in-seduta.test.js:73 (html), 82 (html) · tests/scarichi.test.js:136 (html), 148 (html), 152 (html), 155 (html), 165 (html), 171 (html), … · tests/browser/carichi-evoluzione.js:32, 35, 38, 41, 44, 48 · tests/browser/intensita-bia.js:51, 52, 53, 54, 55 · tests/browser/regole-nuove.js:19, 20, 21, 22, 23, 24, … — nel file: carichiDelGiorno
- `sedutaStessaBase()` js/coach/regole-ricerca.js:563 funzione ← nessun altro file — nel file: caricoProgressione, ricalcoloDalMassimale
- `caricoProgressione()` js/coach/regole-ricerca.js:573 funzione ← nessun altro file — nel file: (primo livello)
- `massimaleRecente()` js/coach/regole-ricerca.js:589 funzione ← nessun altro file — nel file: ricalcoloDalMassimale
- `fraseRicalcolo()` js/coach/regole-ricerca.js:614 funzione ← nessun altro file — nel file: ricalcoloDalMassimale
- `ricalcoloDalMassimale()` js/coach/regole-ricerca.js:615 funzione ← nessun altro file — nel file: (primo livello)
- `applicaCaricoProgressivo()` js/coach/regole-ricerca.js:668 funzione window ← js/ui/allenamento/sessione.js:87 openWorkoutDay · tests/carichi-golden.test.js:203 eseguiCaso (html) · tests/carichi-onda0.test.js:393 chiudiSeduta (html) · tests/conserva-progressi.test.js:169 verifica (html), 311 (html), 357 (html) · tests/intensita-onda0.test.js:349 (html) · tests/migrazione-v1.test.js:97 (html), 134 (html), 136 (html), 144 (html), 153 (html)
- `carichiDelGiorno()` js/coach/regole-ricerca.js:671 funzione ← nessun altro file — nel file: (primo livello)
- `imparaDallaSeduta()` js/coach/regole-ricerca.js:704 funzione ← js/ui/allenamento/termina-e-cardio.js:172 endWorkout · tests/carichi-golden.test.js:232 eseguiCaso (html), 395 (html) · tests/intensita-onda0.test.js:331 (html), 336 (html)
- `contaStalli()` js/coach/regole-ricerca.js:707 funzione ← nessun altro file — nel file: (primo livello)

### `js/coach/regole-nuove.js`

- `TECNICHE_INTENSE` js/coach/regole-nuove.js:18 costante ← js/coach/sicurezza/tecnica-adatta.js:261 tecnicaContaNelBudget · tests/browser/metodi-epoca-oro.js:37
- `sedutePassate()` js/coach/regole-nuove.js:20 funzione ← js/coach/sicurezza/popolazioni.js:120 statoRientro, 160 settimaneFermePerPausa, 187 rientroRecente · js/coach/intensita.js:114 sedutePrimeDelProgramma — nel file: giorniDallUltimaSeduta, prontezzaRecente
- `giorniDallUltimaSeduta()` js/coach/regole-nuove.js:25 funzione ← js/coach/sicurezza/popolazioni.js:106 giorniPausaContati, 111 giorniRientroPiano — nel file: rientroPiano
- `prontezzaRecente()` js/coach/regole-nuove.js:30 funzione ← nessun altro file — nel file: regoleRicAlCarico
- `rientroPiano()` js/coach/regole-nuove.js:37 funzione ← nessun altro file — nel file: regoleRicAlCarico
- `settimanaCentraleBlocco()` js/coach/regole-nuove.js:43 funzione ← nessun altro file — nel file: regoleRicAlCarico
- `gruppoInPriorita()` js/coach/regole-nuove.js:50 funzione ← nessun altro file — nel file: regoleRicAlCarico
- `mancavaSoloUltimaSerie()` js/coach/regole-nuove.js:55 funzione ← nessun altro file — nel file: regoleRicAlCarico
- `regoleRicAlCarico()` js/coach/regole-nuove.js:64 funzione ← nessun altro file — nel file: (primo livello)
- `limitaTecnicheIntense()` js/coach/regole-nuove.js:99 funzione ← tests/browser/gravidanza.js:51, 63 · tests/browser/regole-nuove.js:40, 42 — nel file: (primo livello)

### `js/coach/intensita.js`

- `PARAM_INTENSITA` js/coach/intensita.js:27 costante ← nessun altro file — nel file: statoBia, esigenzaIniziale, rirExtraIntensita, bilancioPrimeSedute
- `FA_MEDIA` js/coach/intensita.js:40 costante ← nessun altro file — nel file: faRiferimento
- `faRiferimento()` js/coach/intensita.js:41 funzione ← nessun altro file — nel file: statoBia
- `_virg()` js/coach/intensita.js:47 funzione ← nessun altro file — nel file: statoBia
- `statoBia()` js/coach/intensita.js:50 funzione window ← js/coach/regia/genera.js:224 noteDelProgramma · js/ui/onboarding-risultato.js:48 renderOnbResult · tests/browser/intensita-bia.js:15 — nel file: esigenzaIniziale, rirExtraIntensita
- `esigenzaIniziale()` js/coach/intensita.js:78 funzione window ← js/coach/regia/brief.js:145 briefCoach · js/coach/esigenza.js:50 esigenzaCoach, 57 aggiornaEsigenza, 103 segnaDoloreEsigenza, 111 htmlEsigenza · tests/intensita-onda0.test.js:54 (html), 55 (html), 56 (html) · tests/browser/intensita-bia.js:15 — nel file: bilancioPrimeSedute
- `rirExtraIntensita()` js/coach/intensita.js:86 funzione window ← js/coach/regole-ricerca.js:118 rirBersaglio · tests/integrazione-3a.test.js:153 (html)
- `primaVoltaUnaSerieInMeno()` js/coach/intensita.js:96 funzione ← nessun altro file — nel file: (primo livello)
- `sedutePrimeDelProgramma()` js/coach/intensita.js:111 funzione ← nessun altro file — nel file: bilancioPrimeSedute
- `bilancioPrimeSedute()` js/coach/intensita.js:116 funzione window ← tests/intensita-onda0.test.js:66 (html) · tests/migrazione-v1.test.js:194 (html) · tests/partenza-donne.test.js:492 (html) · tests/browser/intensita-bia.js:97, 108, 110, 112 — nel file: (primo livello)

### `js/coach/agente-consigli.js`

- `deltaTesto()` js/coach/agente-consigli.js:11 funzione ← nessun altro file — nel file: renderAgent
- `consigliCoach2()` js/coach/agente-consigli.js:29 funzione ← nessun altro file — nel file: consigliAgente
- `consigliAgente()` js/coach/agente-consigli.js:83 funzione ← nessun altro file — nel file: renderAgent
- `openAgent()` js/coach/agente-consigli.js:123 funzione window ← index.html:51 (html)
- `closeAgent()` js/coach/agente-consigli.js:127 funzione window ← js/coach/repertorio.js:556 nuovoCiclo · index.html:432 (html) — nel file: renderAgent
- `renderAgent()` js/coach/agente-consigli.js:129 funzione window ← js/coach/repertorio.js:147 conAnnulla, 175 azioneCoach · js/coach/bia/opzioni.js:132 salvaBiaAgente — nel file: openAgent

### `js/coach/bia/opzioni.js`

- `biaLetta` js/coach/bia/opzioni.js:10 variabile ← nessun altro file — nel file: closeBiaSheet, renderBiaSheet, salvaBiaLetta, agentBiaPdf
- `openBiaSheet()` js/coach/bia/opzioni.js:12 funzione window ← js/coach/agente-consigli.js:218 renderAgent (html) · js/coach/psicologia.js:152 renderSettings (html)
- `closeBiaSheet()` js/coach/bia/opzioni.js:17 funzione window ← index.html:424 (html) — nel file: renderBiaSheet
- `rigaBia()` js/coach/bia/opzioni.js:23 funzione ← nessun altro file — nel file: renderBiaSheet
- `renderBiaSheet()` js/coach/bia/opzioni.js:28 funzione ← nessun altro file — nel file: openBiaSheet, salvaBiaLetta, eliminaBia, agentBiaPdf, salvaBiaAgente
- `toggleBiaManuale()` js/coach/bia/opzioni.js:72 funzione window ← nessun altro file — nel file: renderBiaSheet
- `salvaBiaLetta()` js/coach/bia/opzioni.js:77 funzione window ← nessun altro file — nel file: renderBiaSheet
- `eliminaBia()` js/coach/bia/opzioni.js:87 funzione window ← nessun altro file — nel file: renderBiaSheet
- `agentBiaPdf()` js/coach/bia/opzioni.js:95 funzione window ← nessun altro file — nel file: renderBiaSheet
- `compilaBiaAgente()` js/coach/bia/opzioni.js:118 funzione window ← nessun altro file
- `salvaBiaAgente()` js/coach/bia/opzioni.js:125 funzione window ← nessun altro file — nel file: renderBiaSheet
- `restartOnboarding()` js/coach/bia/opzioni.js:136 funzione window ← js/coach/agente-consigli.js:154 renderAgent (html) · js/coach/psicologia.js:222 renderSetPage (html) · index.html:82 (html) · tests/conserva-progressi.test.js:62 rifai (html), 265 (html)
- `getProfile()` js/coach/bia/opzioni.js:146 funzione window ← js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/onboarding.js ×24 · js/coach/programma/mesociclo.js ×2 · js/coach/volume/tempo.js ×2 · js/coach/sicurezza/tecnica-adatta.js ×2 · js/coach/regia/brief.js ×4 · js/coach/regia/genera.js ×2 · js/coach/programma/alternative.js ×16 · js/coach/carichi/partenza.js ×1 · js/coach/carichi/attrezzi.js ×1 · js/coach/carichi/calibrazione.js ×1 · js/coach/sicurezza/popolazioni.js ×4 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×11 · js/coach/regole-ricerca.js ×3 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×3 · js/coach/agente-consigli.js ×1 · js/ui/opzioni/il-coach.js ×8 · js/ui/seduta-libera.js ×2 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×7 · js/coach/compone.js ×1 · js/coach/stato.js ×2 · js/coach/biomeccanica.js ×3 · js/coach/esigenza.js ×4 · js/coach/psicologia.js ×4 · js/dati/schede-tecniche.js ×2 · tests/attrezzi-onboarding.test.js ×4 · tests/carichi-golden.test.js ×1 · tests/conserva-progressi.test.js ×1 · tests/intensita-onda0.test.js ×13 · tests/migrazione-v1.test.js ×3 · tests/partenza-donne.test.js ×2 · tests/popolazioni.test.js ×6 · tests/split.test.js ×3 · tests/browser/gravidanza.js ×1 · tests/browser/intensita-bia.js ×3 · tests/browser/onboarding-forza.js ×4

## js/core

### `js/core/consenso.js`

- `CONSENT_KEY` js/core/consenso.js:10 costante ← js/ui/guida-interattiva.js:337 setConsenso · js/coach/psicologia.js:257 renderSetPage — nel file: consenso
- `CONSENT_VERSION` js/core/consenso.js:11 costante ← js/ui/guida-interattiva.js:339 setConsenso
- `consenso()` js/core/consenso.js:13 funzione window ← js/coach/catalogo-regole.js:107 COACH_REGOLE (html) · tests/revisione-onda2d.test.js:112 (html) · tests/browser/sicurezza.js:28 (html) — nel file: coachAttivo, chiediConsensoSeServe
- `coachAttivo()` js/core/consenso.js:16 funzione window ← js/coach/catalogo-regole.js ×1 · js/core/modalita.js ×1 · js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/allenamento/termina-e-cardio.js ×3 · js/ui/onboarding.js ×1 · js/coach/programma/mesociclo.js ×2 · js/coach/volume/tempo.js ×2 · js/coach/volume/rampa-settimana.js ×4 · js/coach/specialita/forza-carichi.js ×1 · js/coach/programma/alternative.js ×2 · js/coach/carichi/partenza.js ×3 · js/coach/carichi/attrezzi.js ×1 · js/coach/carichi/calibrazione.js ×1 · js/coach/sicurezza/scarico.js ×2 · js/coach/sicurezza/popolazioni.js ×8 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×5 · js/coach/dolore-mattina.js ×1 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×1 · js/coach/bia/opzioni.js ×2 · js/coach/metodi-momenti.js ×1 · js/coach/stato.js ×2 · js/coach/esigenza.js ×1 · js/coach/psicologia.js ×11 · js/dati/schede-tecniche.js ×1 · tests/conserva-progressi.test.js ×1 · tests/migrazione-v1.test.js ×2 · tests/senza-coach-ia.test.js ×2 · tests/browser/senza-coach-ia.js ×1
- `chiediConsensoSeServe()` js/core/consenso.js:18 funzione window ← js/core/modalita.js:14 chooseMode

## js/ui

### `js/ui/guida-interattiva.js`

- `GUIDA_KEY` js/ui/guida-interattiva.js:12 costante ← nessun altro file — nel file: offriGuida, guidaAvanti, chiudiGuida
- `guidaPasso` js/ui/guida-interattiva.js:13 variabile ← tests/browser/guida-tocchi.js:23, 24, 82, 85 · tests/browser/guida.js:18, 19, 40 — nel file: avviaGuida, offriGuida, guidaPosiziona, guidaMostra, guidaAvanti, chiudiGuida, guidaSegui, guidaAttiva, …
- `guidaTimer` js/ui/guida-interattiva.js:13 variabile ← nessun altro file — nel file: guidaMostra, guidaAvanti, chiudiGuida
- `guidaFoto` js/ui/guida-interattiva.js:13 variabile ← nessun altro file — nel file: guidaPreparaProva, guidaRipristina, chiudiGuida
- `guidaUltimoCambio` js/ui/guida-interattiva.js:13 variabile ← nessun altro file — nel file: guidaMostra, guidaAvanti
- `GUIDA` js/ui/guida-interattiva.js:18 costante ← tests/browser/guida.js:23 — nel file: guidaPosiziona, guidaMostra, guidaAvanti, guidaConsente
- `guidaEl()` js/ui/guida-interattiva.js:41 funzione ← nessun altro file — nel file: avviaGuida, guidaMostra
- `guidaDatiDemo()` js/ui/guida-interattiva.js:54 funzione ← tests/browser/statistiche.js:19 — nel file: guidaPreparaProva
- `guidaPreparaProva()` js/ui/guida-interattiva.js:110 funzione ← nessun altro file — nel file: guidaAvanti
- `guidaRipristina()` js/ui/guida-interattiva.js:122 funzione ← nessun altro file — nel file: guidaPreparaProva, chiudiGuida
- `avviaGuida()` js/ui/guida-interattiva.js:128 funzione window ← js/coach/psicologia.js:177 renderSettings (html) · tests/browser/guida-tocchi.js:20 · tests/browser/guida.js:11 — nel file: offriGuida
- `offriGuida()` js/ui/guida-interattiva.js:136 funzione window ← js/core/modalita.js:15 chooseMode · js/ui/onboarding.js:157 onbSkipAll · js/coach/programma/alternative.js:163 applyGeneratedProgram — nel file: setConsenso
- `guidaPosiziona()` js/ui/guida-interattiva.js:143 funzione ← nessun altro file — nel file: guidaMostra, guidaSegui
- `guidaRidotto()` js/ui/guida-interattiva.js:170 funzione ← nessun altro file — nel file: guidaScorriVerso
- `guidaVisibile()` js/ui/guida-interattiva.js:171 funzione ← nessun altro file — nel file: guidaMostra
- `guidaServeScroll()` js/ui/guida-interattiva.js:174 funzione ← nessun altro file — nel file: guidaScorriVerso
- `guidaScorriVerso()` js/ui/guida-interattiva.js:191 funzione ← nessun altro file — nel file: guidaMostra
- `guidaMostra()` js/ui/guida-interattiva.js:197 funzione ← tests/browser/guida-tocchi.js:23, 82 — nel file: avviaGuida, guidaAvanti
- `guidaAvanti()` js/ui/guida-interattiva.js:235 funzione window ← nessun altro file — nel file: guidaMostra
- `chiudiGuida()` js/ui/guida-interattiva.js:256 funzione window ← nessun altro file — nel file: guidaMostra, guidaAvanti
- `guidaSeguiT` js/ui/guida-interattiva.js:274 variabile ← nessun altro file — nel file: guidaSegui
- `guidaSegui()` js/ui/guida-interattiva.js:275 funzione ← nessun altro file — nel file: guidaScorriVerso, (primo livello)
- `guidaAttiva()` js/ui/guida-interattiva.js:295 funzione window ← js/ui/calendario/scambio.js:82 mcSwapDays — nel file: guidaConsente, (primo livello)
- `guidaConsente()` js/ui/guida-interattiva.js:299 funzione ← tests/browser/guida-tocchi.js:32, 85, 91, 98 — nel file: (primo livello)
- `guidaCenno()` js/ui/guida-interattiva.js:313 funzione ← nessun altro file — nel file: (primo livello)
- `setConsenso()` js/ui/guida-interattiva.js:335 funzione window ← js/coach/psicologia.js:266 renderSetPage (html) · index.html:751 (html), 752 (html) — nel file: revocaConsenso
- `revocaConsenso()` js/ui/guida-interattiva.js:349 funzione window ← js/coach/psicologia.js:265 renderSetPage (html)
- `INFORMATIVA` js/ui/guida-interattiva.js:364 costante ← nessun altro file — nel file: renderInformativa
- `renderInformativa()` js/ui/guida-interattiva.js:365 funzione ← nessun altro file — nel file: openConsentText
- `openConsentText()` js/ui/guida-interattiva.js:366 funzione window ← js/coach/psicologia.js:174 renderSettings (html), 263 renderSetPage (html) · index.html:748 (html)
- `closeConsentText()` js/ui/guida-interattiva.js:367 funzione window ← index.html:758 (html)

### `js/ui/opzioni/impostazioni.js`

- `THEME_KEY` js/ui/opzioni/impostazioni.js:7 costante ← js/coach/psicologia.js:164 renderSettings, 243 renderSetPage — nel file: applyTheme, setTheme
- `SOUND_KEY` js/ui/opzioni/impostazioni.js:8 costante ← js/core/musica-altre-app.js:80 preparaAudio · js/ui/allenamento/timer-recupero.js:37 fineRecupero · js/ui/lavoro-cronometro.js:35 tickLavoro · js/coach/psicologia.js:140 renderSettings, 230 renderSetPage
- `COUNTDOWN_KEY` js/ui/opzioni/impostazioni.js:9 costante ← js/core/musica-altre-app.js:80 preparaAudio · js/ui/allenamento/timer-recupero.js:56 tickRecupero · js/coach/psicologia.js:231 renderSetPage
- `AUTOCLOSE_KEY` js/ui/opzioni/impostazioni.js:10 costante ← js/ui/allenamento/timer-recupero.js:40 fineRecupero · js/coach/psicologia.js:234 renderSetPage
- `BYPASS_KEY` js/ui/opzioni/impostazioni.js:11 costante ← js/core/musica-altre-app.js:29 avviaCanaleMultimediale · js/coach/psicologia.js:233 renderSetPage
- `FLASH_KEY` js/ui/opzioni/impostazioni.js:12 costante ← js/core/musica-altre-app.js:61 lampeggia · js/coach/psicologia.js:140 renderSettings, 232 renderSetPage
- `getSetting()` js/ui/opzioni/impostazioni.js:14 funzione window ← js/coach/psicologia.js:164 renderSettings, 243 renderSetPage — nel file: isOn, applyTheme
- `setSetting()` js/ui/opzioni/impostazioni.js:18 funzione window ← nessun altro file — nel file: setTheme, toggleSetting
- `isOn()` js/ui/opzioni/impostazioni.js:19 funzione window ← js/core/musica-altre-app.js:29 avviaCanaleMultimediale, 61 lampeggia, 80 preparaAudio · js/ui/allenamento/seduta.js:205 renderAllenamento · js/ui/allenamento/timer-recupero.js:37 fineRecupero, 56 tickRecupero · js/ui/opzioni/stile-iphone.js:45 setRowSwitch · js/core/schermo-acceso.js:9 tieniSchermoAcceso · js/ui/lavoro-cronometro.js:35 tickLavoro · js/coach/psicologia.js:140 renderSettings — nel file: applicaZoom, toggleSetting, toggleHtml
- `applyTheme()` js/ui/opzioni/impostazioni.js:21 funzione window ← js/core/modalita.js:27 activateMode · js/core/backup.js:63 ricaricaApp · js/coach/psicologia.js:291 switchProtocol · js/avvio.js:14 — nel file: setTheme
- `setTheme()` js/ui/opzioni/impostazioni.js:37 funzione window ← js/coach/psicologia.js:244 renderSetPage (html)
- `ZOOM_KEY` js/ui/opzioni/impostazioni.js:44 costante ← js/coach/psicologia.js:247 renderSetPage — nel file: applicaZoom, toggleSetting
- `applicaZoom()` js/ui/opzioni/impostazioni.js:45 funzione window ← nessun altro file — nel file: (primo livello), toggleSetting
- `openSettings()` js/ui/opzioni/impostazioni.js:53 funzione window ← nessun altro file
- `closeSettings()` js/ui/opzioni/impostazioni.js:54 funzione window ← nessun altro file
- `toggleSetting()` js/ui/opzioni/impostazioni.js:56 funzione window ← js/ui/opzioni/stile-iphone.js:46 setRowSwitch (html) — nel file: toggleHtml
- `segHtml()` js/ui/opzioni/impostazioni.js:64 funzione ← nessun altro file
- `toggleHtml()` js/ui/opzioni/impostazioni.js:70 funzione ← js/coach/psicologia.js:230 renderSetPage

### `js/ui/opzioni/stile-iphone.js`

- `SET_ICO` js/ui/opzioni/stile-iphone.js:10 costante ← nessun altro file — nel file: setIco
- `setIco()` js/ui/opzioni/stile-iphone.js:33 funzione ← js/coach/psicologia.js:157 renderSettings, 259 renderSetPage — nel file: setRow, setRowSwitch
- `setRow()` js/ui/opzioni/stile-iphone.js:37 funzione ← js/coach/psicologia.js:151 renderSettings, 222 renderSetPage
- `setRowSwitch()` js/ui/opzioni/stile-iphone.js:44 funzione ← js/coach/psicologia.js:160 renderSettings, 247 renderSetPage
- `setGroup()` js/ui/opzioni/stile-iphone.js:49 funzione ← js/ui/opzioni/il-coach.js:14 paginaCoach, 70 htmlAttrezziCoach, 91 htmlForzaCoach · js/ui/seduta-libera.js:51 renderSedutaLibera · js/coach/psicologia.js:150 renderSettings, 214 renderSetPage

### `js/ui/opzioni/il-coach.js`

- `FASI_CORPO` js/ui/opzioni/il-coach.js:7 costante ← nessun altro file — nel file: paginaCoach
- `ATTREZZI_PALESTRA` js/ui/opzioni/il-coach.js:8 costante ← js/ui/onboarding.js:325 htmlAttrezziOnboarding, 362 onbToggleAttrezzoPalestra — nel file: htmlAttrezziCoach, toggleCoachLista
- `chipCoach()` js/ui/opzioni/il-coach.js:9 funzione ← js/coach/biomeccanica.js:98 htmlTestFaiDaTe — nel file: paginaCoach, htmlAttrezziCoach, htmlForzaCoach
- `paginaCoach()` js/ui/opzioni/il-coach.js:10 funzione ← js/coach/psicologia.js:239 renderSetPage · tests/popolazioni.test.js:312 (html), 317 (html) · tests/browser/onboarding-forza.js:47, 49
- `htmlAttrezziCoach()` js/ui/opzioni/il-coach.js:66 funzione ← tests/attrezzi-onboarding.test.js:83 (html), 84 (html), 90 (html), 123 (html) · tests/split.test.js:211 (html), 213 (html), 215 (html), 321 (html), 383 (html) — nel file: paginaCoach
- `htmlForzaCoach()` js/ui/opzioni/il-coach.js:87 funzione ← tests/forza-attivazione.test.js:101 (html) — nel file: paginaCoach
- `setForzaTipoCoach()` js/ui/opzioni/il-coach.js:95 funzione window ← tests/forza-attivazione.test.js:108 (html), 112 (html), 115 (html) · tests/browser/onboarding-forza.js:52 — nel file: htmlForzaCoach
- `togglePuntoDeboleCoach()` js/ui/opzioni/il-coach.js:102 funzione window ← tests/forza-attivazione.test.js:108 (html) · tests/browser/onboarding-forza.js:50 (html) — nel file: htmlForzaCoach
- `toggleCoach()` js/ui/opzioni/il-coach.js:109 funzione ← nessun altro file — nel file: paginaCoach, htmlGravidanzaCoach
- `TESTO_GRAVIDANZA` js/ui/opzioni/il-coach.js:115 costante ← nessun altro file — nel file: htmlGravidanzaCoach
- `NOTA_PRUDENTE_GRAVIDANZA` js/ui/opzioni/il-coach.js:116 costante ← nessun altro file — nel file: setCoach
- `htmlGravidanzaCoach()` js/ui/opzioni/il-coach.js:117 funzione ← nessun altro file — nel file: paginaCoach
- `setGravidanzaCoach()` js/ui/opzioni/il-coach.js:123 funzione ← nessun altro file — nel file: setCoach
- `setCoach()` js/ui/opzioni/il-coach.js:127 funzione window ← js/coach/catalogo-regole.js:203 COACH_REGOLE (html) — nel file: paginaCoach, toggleCoach
- `setFreqCoach()` js/ui/opzioni/il-coach.js:138 funzione window ← nessun altro file — nel file: paginaCoach
- `toggleCoachLista()` js/ui/opzioni/il-coach.js:144 funzione window ← tests/attrezzi-onboarding.test.js:119 (html), 127 (html) · tests/split.test.js:217 (html) — nel file: paginaCoach, htmlAttrezziCoach
- `setNessunoCoach()` js/ui/opzioni/il-coach.js:158 funzione window ← tests/attrezzi-onboarding.test.js:85 (html), 87 (html), 91 (html) — nel file: htmlAttrezziCoach
- `setManubriKgCoach()` js/ui/opzioni/il-coach.js:164 funzione window ← tests/split.test.js:217 (html), 219 (html) — nel file: htmlAttrezziCoach
- `togliPreferenza()` js/ui/opzioni/il-coach.js:171 funzione window ← nessun altro file — nel file: paginaCoach

### `js/ui/fogli.js`

- `foglioDati` js/ui/fogli.js:13 variabile ← js/core/backup.js:42 ripristinaBackup, 67 confermaRipristino · js/ui/importa-csv.js:219 importaCSV · js/ui/importa-progressi.js:161 mostraAnteprimaImport, 187 confermaImportProgressi, 209 confermaImport
- `apriFoglio()` js/ui/fogli.js:14 funzione ← js/core/backup.js:44 ripristinaBackup · js/ui/importa-csv.js:224 importaCSV · js/ui/importa-progressi.js:167 mostraAnteprimaImport · js/ui/seduta-libera.js:82 renderSedutaLibera · js/coach/compone.js:159 apriTuttiMetodi
- `chiudiFoglio()` js/ui/fogli.js:30 funzione window ← js/core/backup.js:71 confermaRipristino · js/ui/importa-progressi.js:199 confermaImportProgressi, 216 confermaImport · js/ui/seduta-libera.js:155 avviaSpeciale — nel file: apriFoglio
- `scegliFile()` js/ui/fogli.js:31 funzione ← js/core/backup.js:36 ripristinaBackup · js/ui/importa-csv.js:212 importaCSV
- `scaricaFile()` js/ui/fogli.js:44 funzione ← js/core/backup.js:25 esportaBackup · js/ui/stampa-scheda.js:30 condividiScheda, 52 stampaScheda
- `dataOra()` js/ui/fogli.js:58 funzione ← js/ui/allenamento/termina-e-cardio.js:152 endWorkout · js/ui/guida-interattiva.js:92 guidaDatiDemo · js/ui/importa-csv.js:205 sedutaImportata

## js/core

### `js/core/schermo-acceso.js`

- `WAKE_KEY` js/core/schermo-acceso.js:6 costante ← js/ui/opzioni/impostazioni.js:60 toggleSetting · js/coach/psicologia.js:235 renderSetPage — nel file: tieniSchermoAcceso
- `wakeLock` js/core/schermo-acceso.js:7 variabile ← nessun altro file — nel file: tieniSchermoAcceso
- `wakeVoluto` js/core/schermo-acceso.js:7 variabile ← nessun altro file — nel file: tieniSchermoAcceso, (primo livello)
- `tieniSchermoAcceso()` js/core/schermo-acceso.js:8 funzione window ← js/ui/allenamento/sessione.js:12 backToDayPicker, 91 openWorkoutDay · js/ui/opzioni/impostazioni.js:60 toggleSetting — nel file: (primo livello)
- `sedutaAperta()` js/core/schermo-acceso.js:19 funzione ← js/ui/opzioni/impostazioni.js:60 toggleSetting · js/ui/seduta-libera.js:11 sedutaPassataAttiva · js/ui/progressi/riepilogo.js:19 aggiornaProssima

### `js/core/backup.js`

- `CHIAVI_APP` js/core/backup.js:6 costante ← nessun altro file — nel file: chiaviApp, ripristinaBackup, applicaFotografia
- `CHIAVI_TEMPORANEE` js/core/backup.js:7 costante ← nessun altro file — nel file: chiaviApp, applicaFotografia
- `CHIAVI_NON_RIPRISTINABILI` js/core/backup.js:11 costante ← nessun altro file — nel file: applicaFotografia
- `valorePulito()` js/core/backup.js:13 funzione ← nessun altro file — nel file: applicaFotografia
- `chiaviApp()` js/core/backup.js:17 funzione ← nessun altro file — nel file: fotografia, applicaFotografia
- `fotografia()` js/core/backup.js:22 funzione ← tests/carichi-onda0.test.js:453 (html) · tests/conserva-progressi.test.js:274 (html), 278 (html), 281 (html) · tests/senza-coach-ia.test.js:73 (html), 102 (html) · tests/browser/senza-coach-ia.js:83 — nel file: esportaBackup, ripristinaBackup, confermaRipristino
- `esportaBackup()` js/core/backup.js:23 funzione window ← js/coach/psicologia.js:167 renderSettings (html)
- `contaAllenamenti()` js/core/backup.js:30 funzione ← tests/conserva-progressi.test.js:278 (html) — nel file: ripristinaBackup
- `ripristinaBackup()` js/core/backup.js:35 funzione window ← js/coach/psicologia.js:168 renderSettings (html)
- `applicaFotografia()` js/core/backup.js:55 funzione ← tests/carichi-onda0.test.js:457 (html) · tests/conserva-progressi.test.js:288 (html), 296 (html) · tests/senza-coach-ia.test.js:107 (html), 120 (html) · tests/browser/sicurezza.js:22 — nel file: confermaRipristino
- `ricaricaApp()` js/core/backup.js:59 funzione ← nessun altro file — nel file: confermaRipristino
- `confermaRipristino()` js/core/backup.js:66 funzione window ← nessun altro file — nel file: ripristinaBackup

## js/ui

### `js/ui/importa-csv.js`

- `leggiCSV()` js/ui/importa-csv.js:6 funzione ← nessun altro file — nel file: leggiExport
- `MESI_EN` js/ui/importa-csv.js:30 costante ← nessun altro file — nel file: dataDaCSV
- `dataDaCSV()` js/ui/importa-csv.js:31 funzione ← nessun altro file — nel file: leggiExport
- `numeroCSV()` js/ui/importa-csv.js:42 funzione ← nessun altro file — nel file: secondiCSV, leggiExport
- `secondiCSV()` js/ui/importa-csv.js:43 funzione ← nessun altro file — nel file: leggiExport
- `ALIAS_ESTERI` js/ui/importa-csv.js:50 costante ← nessun altro file — nel file: nomeDaEstero
- `nomeDaEstero()` js/ui/importa-csv.js:153 funzione ← js/ui/importa-progressi.js:36 riconosciEsercizio — nel file: leggiExport
- `leggiExport()` js/ui/importa-csv.js:160 funzione ← js/ui/importa-progressi.js:150 analizzaProgressi · tests/browser/sicurezza.js:35 — nel file: importaCSV
- `sedutaImportata()` js/ui/importa-csv.js:202 funzione ← js/ui/importa-progressi.js:189 confermaImportProgressi, 211 confermaImport · tests/browser/sicurezza.js:35
- `importaCSV()` js/ui/importa-csv.js:211 funzione window ← nessun altro file

### `js/ui/importa-progressi.js`

- `personalizzatiKey()` js/ui/importa-progressi.js:14 funzione ← nessun altro file — nel file: eserciziPersonalizzati, confermaImportProgressi
- `eserciziPersonalizzati()` js/ui/importa-progressi.js:15 funzione ← nessun altro file — nel file: confermaImportProgressi
- `normNome()` js/ui/importa-progressi.js:16 funzione ← nessun altro file — nel file: indiceNomi, riconosciEsercizio
- `indiceNomiCache` js/ui/importa-progressi.js:20 variabile ← nessun altro file — nel file: indiceNomi
- `indiceNomi()` js/ui/importa-progressi.js:21 funzione ← nessun altro file — nel file: riconosciEsercizio
- `riconosciEsercizio()` js/ui/importa-progressi.js:31 funzione ← nessun altro file — nel file: leggiTestoLibero
- `MESI_NOMI` js/ui/importa-progressi.js:45 costante ← nessun altro file — nel file: dataInRiga
- `dataInRiga()` js/ui/importa-progressi.js:46 funzione ← nessun altro file — nel file: leggiTestoLibero
- `serieInRiga()` js/ui/importa-progressi.js:64 funzione ← nessun altro file — nel file: leggiTestoLibero
- `leggiTestoLibero()` js/ui/importa-progressi.js:93 funzione ← nessun altro file — nel file: analizzaProgressi
- `testoDaPdfRighe()` js/ui/importa-progressi.js:120 funzione ← nessun altro file — nel file: leggiFileProgressi
- `leggiFileProgressi()` js/ui/importa-progressi.js:132 funzione ← nessun altro file — nel file: importaProgressi
- `analizzaProgressi()` js/ui/importa-progressi.js:147 funzione ← nessun altro file — nel file: importaProgressi
- `importaProgressi()` js/ui/importa-progressi.js:155 funzione window ← js/coach/psicologia.js:169 renderSettings (html)
- `mostraAnteprimaImport()` js/ui/importa-progressi.js:156 funzione ← nessun altro file — nel file: importaProgressi
- `confermaImportProgressi()` js/ui/importa-progressi.js:186 funzione window ← nessun altro file — nel file: mostraAnteprimaImport
- `confermaImport()` js/ui/importa-progressi.js:208 funzione window ← js/ui/importa-csv.js:235 importaCSV (html)

### `js/ui/seduta-libera.js`

- `SPEC_KEY` js/ui/seduta-libera.js:6 costante ← nessun altro file — nel file: specialeAttiva, ripristinaSpeciale, avviaSpeciale
- `specialeAttiva()` js/ui/seduta-libera.js:7 funzione ← js/ui/allenamento/sessione.js:76 openWorkoutDay · js/ui/allenamento/termina-e-cardio.js:147 endWorkout — nel file: sedutaPassataAttiva, ripristinaSpeciale, avviaSpeciale, renderSpecialeBox, renderSeduteExtra
- `sedutaPassataAttiva()` js/ui/seduta-libera.js:11 funzione window ← js/ui/allenamento/timer-pannello.js:15 openRecoveryPanel
- `ripristinaSpeciale()` js/ui/seduta-libera.js:12 funzione ← js/ui/allenamento/termina-e-cardio.js:184 endWorkout — nel file: annullaSpeciale, avviaSpeciale
- `annullaSpeciale()` js/ui/seduta-libera.js:21 funzione window ← nessun altro file — nel file: renderSpecialeBox, renderSeduteExtra
- `liberaSel` js/ui/seduta-libera.js:26 variabile ← nessun altro file — nel file: apriSedutaLibera, renderSedutaLibera, htmlListaLibera, liberaToggle, liberaDaScelta
- `liberaTipo` js/ui/seduta-libera.js:26 variabile ← js/coach/repertorio.js:398 sceltaSaltata — nel file: apriSedutaLibera, renderSedutaLibera, liberaToggle, liberaDaScelta, avviaSpeciale
- `liberaFiltro` js/ui/seduta-libera.js:26 variabile ← nessun altro file — nel file: apriSedutaLibera, renderSedutaLibera, htmlListaLibera, renderListaLibera
- `liberaCerca` js/ui/seduta-libera.js:26 variabile ← nessun altro file — nel file: apriSedutaLibera, renderSedutaLibera, htmlListaLibera, renderListaLibera
- `liberaQuando` js/ui/seduta-libera.js:26 variabile ← nessun altro file — nel file: apriSedutaLibera, renderSedutaLibera, avviaSpeciale
- `apriSedutaLibera()` js/ui/seduta-libera.js:27 funzione window ← nessun altro file — nel file: renderSeduteExtra
- `ultimoUso()` js/ui/seduta-libera.js:34 funzione ← nessun altro file — nel file: eserciziDaNomi
- `FILTRI_ATTREZZI` js/ui/seduta-libera.js:41 costante ← nessun altro file — nel file: renderSedutaLibera
- `renderSedutaLibera()` js/ui/seduta-libera.js:42 funzione ← nessun altro file — nel file: apriSedutaLibera
- `htmlListaLibera()` js/ui/seduta-libera.js:85 funzione ← nessun altro file — nel file: renderSedutaLibera, renderListaLibera
- `renderListaLibera()` js/ui/seduta-libera.js:101 funzione window ← nessun altro file — nel file: renderSedutaLibera, liberaToggle
- `liberaToggle()` js/ui/seduta-libera.js:114 funzione window ← nessun altro file — nel file: htmlListaLibera
- `eserciziDaNomi()` js/ui/seduta-libera.js:121 funzione ← js/coach/psicologia.js:122 sedutaPianoB — nel file: liberaDaScelta
- `liberaDaScelta()` js/ui/seduta-libera.js:128 funzione window ← nessun altro file — nel file: renderSedutaLibera
- `liberaDaStorico()` js/ui/seduta-libera.js:129 funzione window ← nessun altro file — nel file: renderSedutaLibera
- `liberaDaGiorno()` js/ui/seduta-libera.js:137 funzione window ← nessun altro file — nel file: renderSedutaLibera
- `avviaSpeciale()` js/ui/seduta-libera.js:141 funzione ← js/coach/repertorio.js:399 sceltaSaltata — nel file: liberaDaScelta, liberaDaStorico, liberaDaGiorno
- `renderSpecialeBox()` js/ui/seduta-libera.js:159 funzione ← js/ui/allenamento/sessione.js:92 openWorkoutDay
- `renderSeduteExtra()` js/ui/seduta-libera.js:170 funzione ← js/ui/allenamento/sessione.js:30 renderWorkoutDayPicker
- `arrotondaCarico()` js/ui/seduta-libera.js:183 funzione ← nessun altro file — nel file: aggiungiExtra
- `aggiungiExtra()` js/ui/seduta-libera.js:187 funzione window ← js/ui/allenamento/seduta.js:206 renderAllenamento (html)
- `aggiornaExtra()` js/ui/seduta-libera.js:201 funzione window ← nessun altro file — nel file: htmlExtra
- `togliExtra()` js/ui/seduta-libera.js:208 funzione window ← nessun altro file — nel file: htmlExtra
- `spuntaExtra()` js/ui/seduta-libera.js:216 funzione window ← nessun altro file — nel file: htmlExtra
- `htmlExtra()` js/ui/seduta-libera.js:227 funzione ← js/ui/allenamento/seduta.js:198 renderAllenamento

### `js/ui/lavoro-cronometro.js`

- `infoEsercizio()` js/ui/lavoro-cronometro.js:6 funzione ← js/ui/allenamento/seduta.js:164 renderAllenamento
- `lavoro` js/ui/lavoro-cronometro.js:15 variabile ← nessun altro file — nel file: fermaLavoro, avviaLavoro, tickLavoro, htmlLavoro
- `fermaLavoro()` js/ui/lavoro-cronometro.js:16 funzione window ← js/ui/allenamento/sessione.js:13 backToDayPicker — nel file: avviaLavoro, tickLavoro
- `avviaLavoro()` js/ui/lavoro-cronometro.js:17 funzione window ← nessun altro file — nel file: htmlLavoro
- `tickLavoro()` js/ui/lavoro-cronometro.js:31 funzione ← nessun altro file — nel file: avviaLavoro
- `htmlLavoro()` js/ui/lavoro-cronometro.js:55 funzione ← js/ui/allenamento/seduta.js:194 renderAllenamento

### `js/ui/progressi/riepilogo.js`

- `prossimaSerie()` js/ui/progressi/riepilogo.js:6 funzione ← nessun altro file — nel file: aggiornaProssima
- `aggiornaProssima()` js/ui/progressi/riepilogo.js:16 funzione ← js/ui/allenamento/timer-pannello.js:27 openRecoveryPanel
- `htmlProssimaSeduta()` js/ui/progressi/riepilogo.js:25 funzione ← js/ui/oggi.js:121 renderOggi
- `faticaMuscoli()` js/ui/progressi/riepilogo.js:41 funzione ← nessun altro file — nel file: renderFatica
- `renderFatica()` js/ui/progressi/riepilogo.js:61 funzione ← js/ui/storico.js:57 renderStorico
- `renderAnno()` js/ui/progressi/riepilogo.js:74 funzione ← js/ui/storico.js:57 renderStorico
- `annoRiassunto()` js/ui/progressi/riepilogo.js:103 funzione ← nessun altro file

### `js/ui/progressi/pagine.js`

- `PG_PAGINE` js/ui/progressi/pagine.js:7 costante ← nessun altro file — nel file: renderPgTiles, apriPagProgressi
- `PG_ICO` js/ui/progressi/pagine.js:12 costante ← nessun altro file — nel file: renderPgTiles
- `pgPagina` js/ui/progressi/pagine.js:21 variabile ← js/ui/guida-interattiva.js:34 GUIDA — nel file: apriPagProgressi, chiudiPagProgressi
- `renderPgTiles()` js/ui/progressi/pagine.js:22 funzione ← js/ui/storico.js:57 renderStorico · js/ui/progressi/foto.js:69 aggiungiFoto — nel file: chiudiPagProgressi
- `apriPagProgressi()` js/ui/progressi/pagine.js:38 funzione window ← tests/browser/guida-tocchi.js:90, 97 · tests/browser/statistiche.js:82, 94, 99 — nel file: renderPgTiles
- `chiudiPagProgressi()` js/ui/progressi/pagine.js:49 funzione window ← js/ui/guida-interattiva.js:36 GUIDA · index.html:380 (html)
- `pesateTutte` js/ui/progressi/pagine.js:58 variabile ← nessun altro file — nel file: htmlPesate
- `htmlPesate()` js/ui/progressi/pagine.js:59 funzione ← js/ui/progressi/peso.js:88 renderPesoCard

### `js/ui/progressi/foto.js`

- `FOTO_DB` js/ui/progressi/foto.js:6 costante ← nessun altro file — nel file: fotoDB
- `FOTO_STORE` js/ui/progressi/foto.js:6 costante ← nessun altro file — nel file: fotoDB, fotoTutte, fotoSalva, fotoTogli
- `fotoDB()` js/ui/progressi/foto.js:7 funzione ← nessun altro file — nel file: fotoTutte, fotoSalva, fotoTogli
- `fotoTutte()` js/ui/progressi/foto.js:16 funzione ← nessun altro file — nel file: renderFoto, mostraFoto, eliminaFoto
- `fotoSalva()` js/ui/progressi/foto.js:26 funzione ← nessun altro file — nel file: aggiungiFoto, eliminaFoto
- `fotoTogli()` js/ui/progressi/foto.js:27 funzione ← nessun altro file — nel file: aggiungiFoto, eliminaFoto
- `fotoUltimaKey()` js/ui/progressi/foto.js:29 funzione ← nessun altro file — nel file: fotoPromemoria, aggiungiFoto
- `fotoPromemoria()` js/ui/progressi/foto.js:30 funzione ← js/ui/progressi/pagine.js:27 renderPgTiles — nel file: renderFoto
- `fotoRiduci()` js/ui/progressi/foto.js:38 funzione ← nessun altro file — nel file: aggiungiFoto
- `aggiungiFoto()` js/ui/progressi/foto.js:59 funzione window ← nessun altro file — nel file: renderFoto
- `fotoUrl` js/ui/progressi/foto.js:71 variabile ← nessun altro file — nel file: renderFoto, mostraFoto
- `fotoConfronto` js/ui/progressi/foto.js:72 variabile ← nessun altro file — nel file: renderFoto, avviaConfronto, toccaFoto
- `renderFoto()` js/ui/progressi/foto.js:73 funzione window ← js/ui/progressi/pagine.js:42 apriPagProgressi — nel file: aggiungiFoto, avviaConfronto, toccaFoto, eliminaFoto
- `avviaConfronto()` js/ui/progressi/foto.js:94 funzione window ← nessun altro file — nel file: renderFoto
- `toccaFoto()` js/ui/progressi/foto.js:95 funzione window ← nessun altro file — nel file: renderFoto
- `mostraFoto()` js/ui/progressi/foto.js:105 funzione ← nessun altro file — nel file: toccaFoto
- `chiudiFoto()` js/ui/progressi/foto.js:122 funzione window ← index.html:420 (html) — nel file: mostraFoto, eliminaFoto
- `eliminaFoto()` js/ui/progressi/foto.js:123 funzione window ← nessun altro file — nel file: mostraFoto

### `js/ui/progressi/peso.js`

- `pesoKey()` js/ui/progressi/peso.js:6 funzione ← js/ui/guida-interattiva.js:107 guidaDatiDemo · tests/conserva-progressi.test.js:105 seminaStoria (html), 275 (html) — nel file: pesiTutti, registraPeso
- `pesoObKey()` js/ui/progressi/peso.js:7 funzione ← js/ui/guida-interattiva.js:108 guidaDatiDemo — nel file: renderPesoCard, salvaObiettivoPeso
- `pesiTutti()` js/ui/progressi/peso.js:8 funzione ← js/ui/progressi/pagine.js:25 renderPgTiles — nel file: renderPesoCard
- `tendenzaPeso()` js/ui/progressi/peso.js:15 funzione ← nessun altro file — nel file: renderPesoCard
- `consiglioPeso()` js/ui/progressi/peso.js:28 funzione ← nessun altro file — nel file: renderPesoCard
- `graficoPeso()` js/ui/progressi/peso.js:47 funzione ← nessun altro file — nel file: renderPesoCard
- `renderPesoCard()` js/ui/progressi/peso.js:71 funzione ← js/ui/storico.js:57 renderStorico · js/ui/progressi/pagine.js:42 apriPagProgressi, 103 htmlPesate (html) — nel file: registraPeso, salvaObiettivoPeso
- `registraPeso()` js/ui/progressi/peso.js:94 funzione window ← nessun altro file — nel file: renderPesoCard
- `salvaObiettivoPeso()` js/ui/progressi/peso.js:109 funzione window ← nessun altro file — nel file: renderPesoCard

### `js/ui/stampa-scheda.js`

- `righeScheda()` js/ui/stampa-scheda.js:6 funzione ← nessun altro file — nel file: testoScheda, stampaScheda
- `testoScheda()` js/ui/stampa-scheda.js:17 funzione ← nessun altro file — nel file: condividiScheda
- `condividiScheda()` js/ui/stampa-scheda.js:27 funzione window ← js/coach/psicologia.js:225 renderSetPage (html)
- `stampaScheda()` js/ui/stampa-scheda.js:33 funzione window ← js/coach/psicologia.js:226 renderSetPage (html)

## js/coach

### `js/coach/metodi-momenti.js`

- `ATTENZIONE_AMRAP` js/coach/metodi-momenti.js:11 costante ← nessun altro file — nel file: METODI
- `FB()` js/coach/metodi-momenti.js:12 funzione ← js/coach/metodi-epoca-oro.js:16, 22 — nel file: METODI
- `UL4` js/coach/metodi-momenti.js:13 costante ← nessun altro file — nel file: METODI
- `coppiePerMuscolo()` js/coach/metodi-momenti.js:16 funzione ← nessun altro file — nel file: METODI
- `METODI` js/coach/metodi-momenti.js:22 costante ← js/ui/opzioni/il-coach.js:50 paginaCoach · js/coach/metodi-epoca-oro.js:12 · js/coach/compone.js:119 metodiPerTe, 159 apriTuttiMetodi · tests/browser/metodi-epoca-oro.js:38, 75 — nel file: metodoDa
- `metodoDa()` js/coach/metodi-momenti.js:107 funzione ← js/coach/regia/brief.js:174 risolviMetodo · js/coach/compone.js:164 htmlIspirazioni · tests/tempo.test.js:490 (html) · tests/browser/metodi-epoca-oro.js:31, 33, 69
- `MOMENTI` js/coach/metodi-momenti.js:109 costante ← js/ui/opzioni/il-coach.js:42 paginaCoach · js/coach/psicologia.js:96 renderPsicoStep — nel file: momentoDa
- `momentoDa()` js/coach/metodi-momenti.js:131 funzione ← js/coach/compone.js:80 sceltaMetodo, 115 metodiPerTe — nel file: momentoAttivo, setMomento
- `momentoAttivo()` js/coach/metodi-momenti.js:132 funzione ← js/coach/regia/brief.js:142 briefCoach, 218 briefOggi · js/coach/regole-ricerca.js:116 rirBersaglio · js/ui/opzioni/il-coach.js:41 paginaCoach · js/coach/stato.js:23 htmlMomentoBreve, 47 momentoDaChiedere, 60 htmlDomandaMomento · js/coach/esigenza.js:23 esigenzaEsclusa — nel file: chiediMomento, htmlMomento
- `applicaMomento()` js/coach/metodi-momenti.js:142 funzione ← nessun altro file — nel file: setMomento
- `momentoInAttesa` js/coach/metodi-momenti.js:155 variabile ← js/ui/opzioni/il-coach.js:43 paginaCoach — nel file: chiediMomento, confermaMomento, setMomento
- `chiediMomento()` js/coach/metodi-momenti.js:156 funzione window ← js/ui/opzioni/il-coach.js:42 paginaCoach (html)
- `confermaMomento()` js/coach/metodi-momenti.js:162 funzione window ← js/ui/opzioni/il-coach.js:45 paginaCoach (html)
- `setMomento()` js/coach/metodi-momenti.js:167 funzione window ← js/coach/programma/alternative.js:154 applyGeneratedProgram — nel file: chiediMomento, confermaMomento
- `terminaMomento()` js/coach/metodi-momenti.js:185 funzione ← nessun altro file — nel file: setMomento, fineMomento
- `verificaMomento()` js/coach/metodi-momenti.js:199 funzione window ← js/coach/stato.js:65 htmlDomandaMomento (html)
- `vaiAlMomento()` js/coach/metodi-momenti.js:207 funzione window ← js/coach/stato.js:66 htmlDomandaMomento (html)
- `fineMomento()` js/coach/metodi-momenti.js:211 funzione window ← js/coach/stato.js:64 htmlDomandaMomento (html) — nel file: htmlMomento
- `prontezzaBassaSettimana()` js/coach/metodi-momenti.js:218 funzione ← js/coach/stato.js:25 htmlMomentoBreve — nel file: htmlMomento
- `htmlMomento()` js/coach/metodi-momenti.js:222 funzione ← nessun altro file

### `js/coach/metodi-epoca-oro.js`

_nessun nome globale_

### `js/coach/compone.js`

- `TESTO_NUTRIZIONE_MINORENNE` js/coach/compone.js:17 costante ← js/coach/repertorio.js:315 corpoCoach — nel file: guardiaNutrizione
- `TESTO_NUTRIZIONE_OVER65` js/coach/compone.js:18 costante ← nessun altro file — nel file: guardiaNutrizione
- `TESTO_NUTRIZIONE_GRAVIDANZA` js/coach/compone.js:19 costante ← nessun altro file — nel file: guardiaNutrizione
- `proteineGKg()` js/coach/compone.js:21 funzione ← js/coach/repertorio.js:338 corpoCoach · tests/guardie-corpo.test.js:188 (html) — nel file: fattoreFisico
- `gravidanzaDichiarata()` js/coach/compone.js:22 funzione ← nessun altro file — nel file: guardiaNutrizione
- `guardiaNutrizione()` js/coach/compone.js:29 funzione ← js/coach/repertorio.js:337 corpoCoach · js/ui/progressi/peso.js:33 consiglioPeso — nel file: fattoreFisico
- `fattoreFisico()` js/coach/compone.js:39 funzione ← js/coach/regia/brief.js:141 briefCoach
- `metodoAmmesso()` js/coach/compone.js:67 funzione ← tests/split.test.js:264 (html) — nel file: sceltaMetodo
- `sceltaMetodo()` js/coach/compone.js:78 funzione ← js/coach/regia/brief.js:174 risolviMetodo
- `TOCCHI` js/coach/compone.js:103 costante ← js/coach/regia/brief.js:181 risolviMetodo · js/coach/regia/genera.js:196 applicaMetodo
- `metodiPerTe()` js/coach/compone.js:112 funzione ← tests/browser/metodi-epoca-oro.js:71, 73 — nel file: sceltaMetodo, htmlMetodi
- `htmlMetodi()` js/coach/compone.js:149 funzione ← nessun altro file — nel file: apriTuttiMetodi
- `apriTuttiMetodi()` js/coach/compone.js:158 funzione window ← js/ui/opzioni/il-coach.js:50 paginaCoach (html)
- `htmlIspirazioni()` js/coach/compone.js:162 funzione ← js/ui/onboarding-risultato.js:45 renderOnbResult · js/ui/opzioni/il-coach.js:49 paginaCoach

### `js/coach/stato.js`

- `renderPianoCoach()` js/coach/stato.js:8 funzione ← js/ui/piano/giorno.js:19 backToPlanDays · js/coach/metodi-momenti.js:204 verificaMomento · js/ui/calendario/scambio.js:136 aggiornaDopoScambio
- `htmlMomentoBreve()` js/coach/stato.js:22 funzione ← nessun altro file — nel file: renderPianoCoach
- `ultimoGiornoAllenamento()` js/coach/stato.js:36 funzione ← nessun altro file — nel file: momentoDaChiedere
- `momentoDaChiedere()` js/coach/stato.js:45 funzione ← nessun altro file — nel file: htmlDomandaMomento
- `htmlDomandaMomento()` js/coach/stato.js:57 funzione ← js/ui/oggi.js:114 renderOggi

### `js/coach/biomeccanica.js`

- `CUE_SCHEMA` js/coach/biomeccanica.js:14 costante ← nessun altro file — nel file: cueEsercizio
- `cueEsercizio()` js/coach/biomeccanica.js:22 funzione ← js/dati/schede-tecniche.js:174 schedaTecnica
- `respiroPer()` js/coach/biomeccanica.js:36 funzione ← js/dati/schede-tecniche.js:175 schedaTecnica · tests/sicurezza-onda0.test.js:267 (html), 280 (html), 281 (html), 282 (html)
- `stabile()` js/coach/biomeccanica.js:42 funzione ← js/coach/regole-ricerca.js:124 rirBersaglio · js/dati/schede-tecniche.js:61 (html) · tests/attributi.test.js:389 DIFFERENZE (html)
- `htmlProva()` js/coach/biomeccanica.js:49 funzione ← nessun altro file — nel file: TEST_FAI_DA_TE
- `TEST_FAI_DA_TE` js/coach/biomeccanica.js:56 costante ← js/ui/onboarding.js:448 renderOnb — nel file: htmlTestFaiDaTe
- `setTest()` js/coach/biomeccanica.js:88 funzione window ← nessun altro file — nel file: htmlTestFaiDaTe
- `htmlTestFaiDaTe()` js/coach/biomeccanica.js:95 funzione ← js/ui/opzioni/il-coach.js:39 paginaCoach
- `bonusBiomecc()` js/coach/biomeccanica.js:101 funzione ← js/coach/programma/ricette.js:192 componiSedute
- `SCALE_DOLORE` js/coach/biomeccanica.js:114 costante ← js/coach/programma/completamenti.js:250 completaSettimana · js/coach/sicurezza/fastidi.js:99 applicaNoteFastidi

### `js/coach/esigenza.js`

- `ESIGENZA_INIZIO` js/coach/esigenza.js:20 costante ← nessun altro file
- `esigenzaEsclusa()` js/coach/esigenza.js:22 funzione ← js/coach/intensita.js:119 bilancioPrimeSedute — nel file: esigenzaCoach, htmlEsigenza
- `esigenzaInDeficit()` js/coach/esigenza.js:31 funzione ← js/coach/intensita.js:83 esigenzaIniziale — nel file: tettoEsigenza
- `tettoEsigenza()` js/coach/esigenza.js:37 funzione ← js/coach/intensita.js:147 bilancioPrimeSedute — nel file: aggiornaEsigenza
- `rpeBersaglioSeduta()` js/coach/esigenza.js:40 funzione ← js/coach/intensita.js:133 bilancioPrimeSedute — nel file: aggiornaEsigenza
- `esigenzaCoach()` js/coach/esigenza.js:47 funzione window ← js/coach/regole-ricerca.js:120 rirBersaglio · tests/intensita-onda0.test.js:43 (html)
- `aggiornaEsigenza()` js/coach/esigenza.js:52 funzione window ← js/ui/oggi.js:81 renderOggi · tests/intensita-onda0.test.js:113 (html), 132 (html), 146 (html), 156 (html), 304 (html) · tests/migrazione-v1.test.js:194 (html) · tests/partenza-donne.test.js:514 (html) · tests/browser/intensita-bia.js:120
- `segnaDoloreEsigenza()` js/coach/esigenza.js:100 funzione ← js/coach/dolore-mattina.js:33 rispostaDolore
- `htmlEsigenza()` js/coach/esigenza.js:107 funzione ← js/ui/opzioni/il-coach.js:29 paginaCoach

### `js/coach/psicologia.js`

- `PSICO_DOMANDE` js/coach/psicologia.js:14 costante ← nessun altro file — nel file: htmlDomandePsico
- `psicoCoach()` js/coach/psicologia.js:32 funzione ← js/coach/regia/brief.js:140 briefCoach · js/coach/repertorio.js:378 htmlSedutaSaltata · js/coach/regole-ricerca.js:115 rirBersaglio · js/ui/opzioni/il-coach.js:52 paginaCoach · js/coach/compone.js:114 metodiPerTe · tests/split.test.js:263 (html) — nel file: htmlPrimiPassi
- `ritrattoCoach()` js/coach/psicologia.js:55 funzione ← js/coach/regia/genera.js:222 noteDelProgramma · js/ui/opzioni/il-coach.js:52 paginaCoach
- `onbPsico()` js/coach/psicologia.js:74 funzione window ← nessun altro file
- `setPsico()` js/coach/psicologia.js:79 funzione window ← nessun altro file
- `htmlDomandePsico()` js/coach/psicologia.js:86 funzione ← js/ui/opzioni/il-coach.js:53 paginaCoach — nel file: renderPsicoStep
- `renderPsicoStep()` js/coach/psicologia.js:90 funzione ← js/ui/onboarding.js:457 renderOnb
- `onbMomento()` js/coach/psicologia.js:98 funzione window ← nessun altro file — nel file: renderPsicoStep
- `htmlPrimiPassi()` js/coach/psicologia.js:100 funzione ← js/coach/stato.js:19 renderPianoCoach
- `sedutaPianoB()` js/coach/psicologia.js:116 funzione ← js/coach/repertorio.js:396 sceltaSaltata
- `TEMI` js/coach/psicologia.js:125 costante ← nessun altro file — nel file: renderSettings, renderSetPage
- `renderSettings()` js/coach/psicologia.js:127 funzione ← js/lingue/traduttore.js:289 setLingua · js/ui/oggi.js:194 switchTab · js/ui/allenamento/cedimento-canzone.js:95 clearCedimentoAudio · js/coach/bia/opzioni.js:20 closeBiaSheet · js/ui/guida-interattiva.js:346 setConsenso, 359 revocaConsenso · js/ui/opzioni/impostazioni.js:40 setTheme, 61 toggleSetting · js/core/backup.js:28 esportaBackup — nel file: closeSetPage, renderSetPage
- `setPagina` js/coach/psicologia.js:191 variabile ← nessun altro file — nel file: renderSettings, openSetPage, closeSetPage, renderSetPage
- `SET_PAGINE` js/coach/psicologia.js:192 costante ← nessun altro file — nel file: openSetPage
- `openSetPage()` js/coach/psicologia.js:196 funzione window ← js/coach/metodi-momenti.js:208 vaiAlMomento, 241 htmlMomento (html) · js/coach/stato.js:26 htmlMomentoBreve (html) · tests/browser/gravidanza.js:53, 82 · tests/browser/senza-coach-ia.js:51, 56 — nel file: renderSettings
- `closeSetPage()` js/coach/psicologia.js:202 funzione window ← js/ui/guida-interattiva.js:129 avviaGuida · js/ui/opzioni/il-coach.js:61 paginaCoach (html) · index.html:348 (html) · tests/browser/senza-coach-ia.js:55, 60 — nel file: renderSetPage
- `renderSetPage()` js/coach/psicologia.js:208 funzione ← js/lingue/traduttore.js:290 setLingua · js/ui/opzioni/il-coach.js:100 setForzaTipoCoach, 107 togglePuntoDeboleCoach, 129 setCoach, 142 setFreqCoach, 155 toggleCoachLista, 162 setNessunoCoach, … · js/coach/metodi-momenti.js:160 chiediMomento, 165 confermaMomento, 171 setMomento · js/coach/biomeccanica.js:93 setTest · tests/browser/gravidanza.js:74 — nel file: setPsico, renderSettings, openSetPage
- `switchProtocol()` js/coach/psicologia.js:287 funzione window ← nessun altro file

## js/ui

### `js/ui/schede-esercizio.js`

- `arto()` js/ui/schede-esercizio.js:19 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `tronco()` js/ui/schede-esercizio.js:36 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `testa()` js/ui/schede-esercizio.js:48 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `bilanciere()` js/ui/schede-esercizio.js:53 funzione ← js/dati/attributi-esercizi.js:177 ATTRIBUTI (html) · js/coach/catalogo-regole.js:208 COACH_REGOLE (html) · js/coach/carichi/soglie-progressione.js:25 SOGLIE_PROGRESSIONE (html) · tests/attributi.test.js:309 (html) · tests/carichi-onda0.test.js:145 (html), 242 (html) · tests/fastidi.test.js:116 (html) · tests/forza-ordine-alzata.test.js:37 (html) · tests/forza-struttura.test.js:295 (html) · tests/integrazione-3a.test.js:44 (html), 62 (html) · tests/intensita-onda0.test.js:215 (html), 298 (html) · tests/popolazioni.test.js:82 (html) — nel file: PATTERN_DRAW
- `manubrio()` js/ui/schede-esercizio.js:63 funzione ← js/dati/dettagli-esercizi.js:301 DETTAGLI (html) — nel file: PATTERN_DRAW
- `freccia()` js/ui/schede-esercizio.js:69 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `suolo()` js/ui/schede-esercizio.js:75 funzione ← nessun altro file — nel file: wrapSvg
- `wrapSvg()` js/ui/schede-esercizio.js:79 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `inPiedi()` js/ui/schede-esercizio.js:86 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `accosciato()` js/ui/schede-esercizio.js:103 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `piegato()` js/ui/schede-esercizio.js:116 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `sdraiato()` js/ui/schede-esercizio.js:129 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `PATTERN_DRAW` js/ui/schede-esercizio.js:143 costante ← nessun altro file
- `PATTERN_INFO` js/ui/schede-esercizio.js:259 costante ← js/dati/schede-tecniche.js:245 openExerciseInfo
- `PATTERN_RULES` js/ui/schede-esercizio.js:326 costante ← nessun altro file — nel file: patternFor
- `patternFor()` js/ui/schede-esercizio.js:344 funzione window ← js/dati/schede-tecniche.js:244 openExerciseInfo · js/dati/scheda-unica.js:31 schedaUnica
- `VIDEO_VERIFICATI` js/ui/schede-esercizio.js:356 costante ← js/dati/schede-tecniche.js:252 openExerciseInfo — nel file: videoLinkFor
- `VIDEO_PLAYLIST` js/ui/schede-esercizio.js:359 costante ← js/dati/schede-tecniche.js:277 openExerciseInfo
- `testoRicercaVideo()` js/ui/schede-esercizio.js:363 funzione window ← nessun altro file — nel file: videoLinkFor
- `videoLinkFor()` js/ui/schede-esercizio.js:374 funzione window ← js/ui/allenamento/seduta.js:173 renderAllenamento · js/dati/schede-tecniche.js:273 openExerciseInfo · js/dati/scheda-unica.js:33 schedaUnica

## js/dati

### `js/dati/disegni-esercizi.js`

- `slugEsercizio()` js/dati/disegni-esercizi.js:11 funzione window ← nessun altro file — nel file: immagineEsercizio
- `IMMAGINI_ESERCIZI` js/dati/disegni-esercizi.js:23 costante ← tests/browser/disegni-mancanti.js:47 — nel file: immagineEsercizio
- `immagineEsercizio()` js/dati/disegni-esercizi.js:44 funzione window ← js/dati/scheda-unica.js:17 schedaUnica — nel file: slotImmagine
- `slotImmagine()` js/dati/disegni-esercizi.js:51 funzione ← js/dati/schede-tecniche.js:250 openExerciseInfo

## js/ui

### `js/ui/scheda-quattro-sezioni.js`

- `exInfoNome` js/ui/scheda-quattro-sezioni.js:12 variabile ← js/dati/schede-tecniche.js:230 preferisci, 258 openExerciseInfo
- `exInfoTab` js/ui/scheda-quattro-sezioni.js:13 variabile ← nessun altro file — nel file: setExInfoTab
- `seduteEsercizio()` js/ui/scheda-quattro-sezioni.js:16 funzione ← js/dati/schede-tecniche.js:259 openExerciseInfo
- `setExInfoTab()` js/ui/scheda-quattro-sezioni.js:51 funzione window ← js/dati/schede-tecniche.js:263 openExerciseInfo (html)
- `exVuoto()` js/ui/scheda-quattro-sezioni.js:64 funzione ← nessun altro file — nel file: paneStorico, paneGrafico, paneRecord
- `paneStorico()` js/ui/scheda-quattro-sezioni.js:68 funzione ← js/dati/schede-tecniche.js:265 openExerciseInfo
- `paneGrafico()` js/ui/scheda-quattro-sezioni.js:75 funzione ← js/dati/schede-tecniche.js:266 openExerciseInfo
- `paneRecord()` js/ui/scheda-quattro-sezioni.js:105 funzione ← js/dati/schede-tecniche.js:267 openExerciseInfo

## js/dati

### `js/dati/schede-tecniche.js`

- `TECNICA` js/dati/schede-tecniche.js:12 costante ← js/dati/schede-varianti.js:169, 170 · js/dati/scheda-unica.js:16 schedaUnica · tests/browser/dettagli-esercizi.js:25 · tests/browser/traduzioni-esercizi.js:15 — nel file: (primo livello), schedaTecnica
- `RESPIRO` js/dati/schede-tecniche.js:143 costante ← js/coach/biomeccanica.js:39 respiroPer
- `GLOSSARIO` js/dati/schede-tecniche.js:148 costante ← nessun altro file — nel file: openExerciseInfo
- `schedaTecnica()` js/dati/schede-tecniche.js:160 funzione ← nessun altro file — nel file: openExerciseInfo
- `htmlDettaglioScheda()` js/dati/schede-tecniche.js:181 funzione ← nessun altro file — nel file: openExerciseInfo
- `pausaConsigliata()` js/dati/schede-tecniche.js:198 funzione ← js/dati/scheda-unica.js:26 schedaUnica — nel file: preferenzaEsercizio
- `preferenzaEsercizio()` js/dati/schede-tecniche.js:199 funzione ← nessun altro file — nel file: schedaTecnica
- `preferisci()` js/dati/schede-tecniche.js:216 funzione window ← nessun altro file — nel file: preferenzaEsercizio
- `openExerciseInfo()` js/dati/schede-tecniche.js:242 funzione window ← js/ui/piano/giorno.js:113 renderDayView (html) · js/ui/piano/aggiungi-allenamento.js:423 renderPiano (html) · js/ui/allenamento/seduta.js:170 renderAllenamento (html) · tests/browser/disegni-mancanti.js:62 · tests/browser/elenco-esercizi.js:52 — nel file: htmlDettaglioScheda, preferisci
- `closeExerciseInfo()` js/dati/schede-tecniche.js:286 funzione window ← index.html:295 (html) · tests/browser/disegni-mancanti.js:85

### `js/dati/schede-varianti.js`

_nessun nome globale_

### `js/dati/scheda-unica.js`

- `schedaUnica()` js/dati/scheda-unica.js:13 funzione window ← tests/browser/disegni-mancanti.js:46, 52 (html) · tests/browser/scheda-unica.js:10, 11 — nel file: bucchiNelleSchede
- `bucchiNelleSchede()` js/dati/scheda-unica.js:37 funzione window ← tests/browser/disegni-mancanti.js:42 · tests/browser/scheda-unica.js:11

## js/ui

### `js/ui/calendario/mese.js`

- `calKey()` js/ui/calendario/mese.js:12 funzione ← js/coach/repertorio.js:390 sceltaSaltata · js/ui/importa-progressi.js:188 confermaImportProgressi · js/ui/calendario/scambio.js:99 mcSwapDays, 158 planSwapDays · js/ui/calendario/copia-settimana.js:163 mcCopyWeeks, 177 mcPlaceTemplate, 193 mcFillMonth · js/ui/menu-settimana.js:76 wmSvuotaSettimana, 103 mcClearMonth · tests/conserva-progressi.test.js:30 riscritte (html), 143 verifica (html), 276 (html), 331 (html) · tests/intensita-onda0.test.js:181 (html), 196 (html) · tests/browser/guida-tocchi.js:61, 63, 66 — nel file: loadCal, saveCal
- `loadCal()` js/ui/calendario/mese.js:13 funzione ← js/ui/oggi.js ×2 · js/ui/allenamento/sessione.js ×1 · js/coach/programma/alternative.js ×1 · js/ui/statistiche.js ×3 · js/coach/repertorio.js ×5 · js/ui/progressi/riepilogo.js ×3 · js/coach/stato.js ×1 · js/ui/calendario/gruppi.js ×2 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×4 · js/ui/menu-settimana.js ×10 · js/ui/sessione-completata.js ×1 · js/ui/esporta-ics.js ×2 · tests/browser/dettaglio-seduta.js ×1 · tests/browser/guida-tocchi.js ×3
- `saveCal()` js/ui/calendario/mese.js:14 funzione ← js/coach/programma/alternative.js:119 applyGeneratedProgram · js/coach/repertorio.js:397 sceltaSaltata · js/ui/guida-interattiva.js:98 guidaDatiDemo · js/ui/calendario/scambio.js:96 mcSwapDays, 128 scambiaNelCalendario · js/ui/calendario/copia-settimana.js:160 mcCopyWeeks, 174 mcPlaceTemplate, 191 mcFillMonth · js/ui/menu-settimana.js:54 wmCancellaGiorno, 72 wmSvuotaSettimana, 101 mcClearMonth, 145 mcPlanDay, 152 mcRemoveDay, 175 segnaFattoNelCalendario · tests/browser/dettaglio-seduta.js:43
- `mcAnno` js/ui/calendario/mese.js:16 variabile ← js/ui/calendario/gruppi.js:59 renderMonthCal, 112 mcMove · js/ui/calendario/copia-settimana.js:175 mcPlaceTemplate · js/ui/menu-settimana.js:96 mcClearMonth — nel file: settimaneDelMese
- `mcMese` js/ui/calendario/mese.js:16 variabile ← js/ui/calendario/gruppi.js:59 renderMonthCal, 111 mcMove · js/ui/calendario/copia-settimana.js:175 mcPlaceTemplate · js/ui/menu-settimana.js:96 mcClearMonth — nel file: settimaneDelMese
- `ymd()` js/ui/calendario/mese.js:18 funzione ← js/ui/oggi.js ×6 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/allenamento/sessione.js ×1 · js/ui/storico.js ×1 · js/coach/programma/mesociclo.js ×2 · js/coach/regia/brief.js ×1 · js/coach/programma/archivio.js ×1 · js/coach/programma/alternative.js ×3 · js/coach/carichi/calibrazione.js ×1 · js/coach/sicurezza/scarico.js ×1 · js/coach/sicurezza/popolazioni.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/prontezza.js ×6 · js/coach/repertorio.js ×16 · js/coach/dolore-mattina.js ×1 · js/coach/intensita.js ×3 · js/ui/guida-interattiva.js ×2 · js/core/backup.js ×2 · js/ui/importa-csv.js ×2 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×7 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×3 · js/coach/metodi-momenti.js ×9 · js/coach/stato.js ×2 · js/coach/esigenza.js ×8 · js/ui/scheda-quattro-sezioni.js ×1 · js/ui/calendario/gruppi.js ×7 · js/ui/calendario/scambio.js ×6 · js/ui/calendario/copia-settimana.js ×2 · js/ui/menu-settimana.js ×4 · js/ui/esporta-ics.js ×2 · tests/aiuto-app.js ×1 · tests/migrazione-v1.test.js ×2 · tests/browser/dettaglio-seduta.js ×1 · tests/browser/gravidanza.js ×1 · tests/browser/intensita-bia.js ×5 · tests/browser/regole-nuove.js ×1 — nel file: mettiSettimana, copiaSettimana
- `daYmd()` js/ui/calendario/mese.js:21 funzione ← js/coach/programma/mesociclo.js ×3 · js/coach/programma/alternative.js ×1 · js/ui/statistiche.js ×4 · js/coach/carichi/progressivo.js ×2 · js/coach/sicurezza/scarico.js ×3 · js/coach/sicurezza/popolazioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×11 · js/coach/regole-ricerca.js ×2 · js/coach/agente-consigli.js ×2 · js/coach/bia/opzioni.js ×2 · js/ui/progressi/pagine.js ×3 · js/ui/progressi/foto.js ×5 · js/ui/progressi/peso.js ×6 · js/coach/metodi-momenti.js ×1 · js/coach/psicologia.js ×3 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×6 · js/ui/calendario/copia-settimana.js ×6 · js/ui/menu-settimana.js ×6 · js/ui/sessione-completata.js ×1 · js/ui/esporta-ics.js ×2
- `lunediDi()` js/ui/calendario/mese.js:22 funzione ← js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/coach/programma/mesociclo.js ×2 · js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×3 · js/ui/statistiche.js ×3 · js/ui/statistiche-grafico.js ×4 · js/coach/carichi/progressivo.js ×2 · js/coach/sicurezza/popolazioni.js ×1 · js/coach/repertorio.js ×5 · js/coach/regole-ricerca.js ×2 · js/coach/intensita.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/coach/stato.js ×2 · js/coach/esigenza.js ×4 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×4 · js/ui/calendario/copia-settimana.js ×2 · tests/browser/gravidanza.js ×1 · tests/browser/intensita-bia.js ×1 · tests/browser/regole-nuove.js ×1 — nel file: settimaneDelMese
- `giorniTra()` js/ui/calendario/mese.js:24 funzione ← js/coach/programma/mesociclo.js ×2 · js/coach/programma/alternative.js ×1 · js/ui/statistiche.js ×1 · js/ui/statistiche-grafico.js ×2 · js/coach/carichi/progressivo.js ×3 · js/coach/carichi/calibrazione.js ×1 · js/coach/sicurezza/scarico.js ×7 · js/coach/sicurezza/popolazioni.js ×11 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×10 · js/coach/regole-ricerca.js ×6 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×5 · js/ui/progressi/pagine.js ×1 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×1 · js/coach/psicologia.js ×1
- `piuGiorni()` js/ui/calendario/mese.js:25 funzione ← js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/termina-e-cardio.js ×3 · js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×3 · js/ui/statistiche.js ×5 · js/ui/statistiche-grafico.js ×2 · js/coach/sicurezza/scarico.js ×1 · js/coach/repertorio.js ×13 · js/coach/agente-consigli.js ×3 · js/ui/progressi/riepilogo.js ×4 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×3 · js/coach/metodi-momenti.js ×5 · js/coach/stato.js ×2 · js/coach/esigenza.js ×2 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×4 · js/ui/menu-settimana.js ×3 · js/ui/esporta-ics.js ×2 · tests/browser/gravidanza.js ×1 · tests/browser/intensita-bia.js ×5 · tests/browser/regole-nuove.js ×1 — nel file: mettiSettimana, copiaSettimana, settimaneDelMese
- `giornoSettimana()` js/ui/calendario/mese.js:26 funzione ← js/ui/menu-settimana.js:117 mcOpenDay — nel file: voceDaPiano
- `voceDaPiano()` js/ui/calendario/mese.js:29 funzione ← js/ui/menu-settimana.js:143 mcPlanDay — nel file: mettiSettimana
- `mettiSettimana()` js/ui/calendario/mese.js:42 funzione ← js/coach/programma/alternative.js:111 applyGeneratedProgram · js/ui/calendario/copia-settimana.js:173 mcPlaceTemplate, 189 mcFillMonth
- `copiaSettimana()` js/ui/calendario/mese.js:56 funzione ← js/ui/calendario/copia-settimana.js:159 mcCopyWeeks
- `settimaneDelMese()` js/ui/calendario/mese.js:74 funzione ← js/ui/calendario/gruppi.js:37 renderLegendaGruppi, 65 renderMonthCal · js/ui/calendario/copia-settimana.js:187 mcFillMonth

### `js/ui/calendario/gruppi.js`

- `GRUPPO_COLORE` js/ui/calendario/gruppi.js:10 costante ← nessun altro file — nel file: gruppiDelGiorno, puntiniGruppi, renderLegendaGruppi
- `GRUPPI_ORDINE` js/ui/calendario/gruppi.js:11 costante ← nessun altro file — nel file: gruppiDelGiorno, renderLegendaGruppi
- `_mcStorico` js/ui/calendario/gruppi.js:12 variabile ← nessun altro file — nel file: gruppiDelGiorno, renderMonthCal
- `gruppiDelGiorno()` js/ui/calendario/gruppi.js:13 funzione ← nessun altro file — nel file: puntiniGruppi, renderLegendaGruppi
- `puntiniGruppi()` js/ui/calendario/gruppi.js:28 funzione ← nessun altro file — nel file: renderMonthCal
- `renderLegendaGruppi()` js/ui/calendario/gruppi.js:33 funzione ← nessun altro file — nel file: renderMonthCal
- `renderMonthCal()` js/ui/calendario/gruppi.js:57 funzione ← js/ui/oggi.js:195 switchTab · js/coach/repertorio.js:425 sceltaSaltata · js/ui/calendario/scambio.js:135 aggiornaDopoScambio · js/ui/calendario/copia-settimana.js:39 mcSelectWeek, 47 mcToggleTarget, 57 mcRepeat, 63 mcCancelCopy, 144 attachWeekDrag, 161 mcCopyWeeks, … · js/ui/menu-settimana.js:55 wmCancellaGiorno, 73 wmSvuotaSettimana, 102 mcClearMonth, 146 mcPlanDay, 153 mcRemoveDay — nel file: mcMove
- `mcMove()` js/ui/calendario/gruppi.js:110 funzione window ← index.html:215 (html), 217 (html)

### `js/ui/calendario/scambio.js`

- `swapAppenaTrascinato` js/ui/calendario/scambio.js:15 variabile ← nessun altro file — nel file: attachSwapDrag, mcCellClick, planDayClick
- `attachSwapDrag()` js/ui/calendario/scambio.js:17 funzione ← js/ui/piano/giorno.js:229 renderPlanDayPicker · js/ui/calendario/gruppi.js:97 renderMonthCal
- `mcSwapDays()` js/ui/calendario/scambio.js:78 funzione window ← js/ui/calendario/gruppi.js:101 renderMonthCal
- `mcCellClick()` js/ui/calendario/scambio.js:103 funzione window ← js/ui/calendario/gruppi.js:79 renderMonthCal (html)
- `scambiaNelCalendario()` js/ui/calendario/scambio.js:110 funzione ← nessun altro file — nel file: planSwapDays
- `aggiornaDopoScambio()` js/ui/calendario/scambio.js:132 funzione ← nessun altro file — nel file: mcSwapDays, planSwapDays
- `planSwapDays()` js/ui/calendario/scambio.js:140 funzione window ← js/ui/piano/giorno.js:232 renderPlanDayPicker
- `planDayClick()` js/ui/calendario/scambio.js:163 funzione window ← js/ui/piano/giorno.js:162 renderPlanMap (html), 218 renderPlanDayPicker (html)

### `js/ui/calendario/copia-settimana.js`

- `mcCopySrc` js/ui/calendario/copia-settimana.js:17 variabile ← js/ui/calendario/gruppi.js:82 renderMonthCal · js/ui/calendario/scambio.js:105 mcCellClick — nel file: mcSelectWeek, mcToggleTarget, mcRepeat, mcCancelCopy, mcPaste, renderCopyBar, attachWeekDrag
- `mcCopyTargets` js/ui/calendario/copia-settimana.js:18 variabile ← js/ui/calendario/gruppi.js:82 renderMonthCal — nel file: mcSelectWeek, mcToggleTarget, mcRepeat, mcCancelCopy, mcPaste, renderCopyBar, attachWeekDrag
- `etichettaSettimana()` js/ui/calendario/copia-settimana.js:20 funzione ← js/ui/menu-settimana.js:26 renderWeekMenu — nel file: renderCopyBar, attachWeekDrag
- `settimanaPiena()` js/ui/calendario/copia-settimana.js:26 funzione ← nessun altro file — nel file: mcSelectWeek
- `mcSelectWeek()` js/ui/calendario/copia-settimana.js:31 funzione window ← js/ui/menu-settimana.js:90 wmSelezionaPerCopiare
- `mcToggleTarget()` js/ui/calendario/copia-settimana.js:42 funzione window ← js/ui/calendario/scambio.js:105 mcCellClick
- `mcRepeat()` js/ui/calendario/copia-settimana.js:52 funzione window ← index.html:233 (html), 234 (html), 235 (html), 236 (html)
- `mcCancelCopy()` js/ui/calendario/copia-settimana.js:60 funzione window ← index.html:239 (html) — nel file: mcSelectWeek
- `mcPaste()` js/ui/calendario/copia-settimana.js:66 funzione window ← index.html:240 (html)
- `renderCopyBar()` js/ui/calendario/copia-settimana.js:73 funzione ← js/ui/calendario/gruppi.js:106 renderMonthCal
- `attachWeekDrag()` js/ui/calendario/copia-settimana.js:91 funzione ← js/ui/calendario/gruppi.js:90 renderMonthCal
- `mcCopyWeeks()` js/ui/calendario/copia-settimana.js:154 funzione window ← js/ui/menu-settimana.js:84 wmCopiaProssima — nel file: mcPaste, attachWeekDrag
- `mcPlaceTemplate()` js/ui/calendario/copia-settimana.js:167 funzione window ← index.html:249 (html)
- `mcFillMonth()` js/ui/calendario/copia-settimana.js:180 funzione window ← index.html:250 (html)

### `js/ui/menu-settimana.js`

- `wmLunedi` js/ui/menu-settimana.js:10 variabile ← nessun altro file — nel file: openWeekMenu, closeWeekMenu, renderWeekMenu, wmCancellaGiorno, wmSvuotaSettimana, wmCopiaProssima, wmSelezionaPerCopiare
- `openWeekMenu()` js/ui/menu-settimana.js:12 funzione window ← js/ui/calendario/copia-settimana.js:139 attachWeekDrag
- `closeWeekMenu()` js/ui/menu-settimana.js:17 funzione window ← index.html:304 (html), 308 (html) — nel file: wmCopiaProssima, wmSelezionaPerCopiare
- `renderWeekMenu()` js/ui/menu-settimana.js:22 funzione ← nessun altro file — nel file: openWeekMenu, wmCancellaGiorno, wmSvuotaSettimana
- `wmCancellaGiorno()` js/ui/menu-settimana.js:49 funzione window ← nessun altro file — nel file: renderWeekMenu
- `wmSvuotaSettimana()` js/ui/menu-settimana.js:62 funzione window ← nessun altro file — nel file: renderWeekMenu
- `wmCopiaProssima()` js/ui/menu-settimana.js:80 funzione window ← nessun altro file — nel file: renderWeekMenu
- `wmSelezionaPerCopiare()` js/ui/menu-settimana.js:87 funzione window ← nessun altro file — nel file: renderWeekMenu
- `mcClearMonth()` js/ui/menu-settimana.js:93 funzione window ← index.html:251 (html)
- `mcOpenDay()` js/ui/menu-settimana.js:107 funzione window ← js/ui/calendario/scambio.js:105 mcCellClick
- `mcCloseDay()` js/ui/menu-settimana.js:139 funzione window ← index.html:665 (html) — nel file: mcPlanDay, mcRemoveDay
- `mcPlanDay()` js/ui/menu-settimana.js:141 funzione window ← nessun altro file — nel file: mcOpenDay
- `mcRemoveDay()` js/ui/menu-settimana.js:149 funzione window ← nessun altro file — nel file: mcOpenDay
- `segnaFattoNelCalendario()` js/ui/menu-settimana.js:158 funzione window ← js/ui/allenamento/termina-e-cardio.js:168 endWorkout · js/ui/guida-interattiva.js:99 guidaDatiDemo · js/ui/importa-progressi.js:193 confermaImportProgressi

### `js/ui/sessione-completata.js`

- `mostraSessione()` js/ui/sessione-completata.js:14 funzione ← nessun altro file — nel file: openDoneView, openHistoryDetail
- `openDoneView()` js/ui/sessione-completata.js:65 funzione window ← js/ui/oggi.js:122 renderOggi (html) · js/ui/allenamento/sessione.js:39 renderWorkoutDayPicker (html) · js/ui/menu-settimana.js:109 mcOpenDay · tests/browser/dettaglio-seduta.js:27, 90
- `openHistoryDetail()` js/ui/sessione-completata.js:81 funzione window ← js/ui/storico.js:15 rigaSeduta (html) · tests/browser/dettaglio-seduta.js:27, 63, 65 (html), 79, 86 · tests/browser/senza-coach-ia.js:36, 74
- `closeDoneView()` js/ui/sessione-completata.js:93 funzione window ← index.html:534 (html) · tests/browser/dettaglio-seduta.js:27, 61, 62 (html), 83 · tests/browser/senza-coach-ia.js:36, 80, 81 (html) — nel file: mostraSessione

### `js/ui/esporta-ics.js`

- `icsEscape()` js/ui/esporta-ics.js:14 funzione ← nessun altro file — nel file: buildIcs
- `icsFold()` js/ui/esporta-ics.js:19 funzione ← nessun altro file — nel file: buildIcs
- `icsData()` js/ui/esporta-ics.js:28 funzione ← nessun altro file — nel file: buildIcs, linkGoogle
- `buildIcs()` js/ui/esporta-ics.js:30 funzione window ← nessun altro file — nel file: exportIcs
- `exportIcs()` js/ui/esporta-ics.js:63 funzione window ← index.html:252 (html)
- `linkGoogle()` js/ui/esporta-ics.js:91 funzione ← js/ui/menu-settimana.js:132 mcOpenDay
- `aggiornaAiutoIcs()` js/ui/esporta-ics.js:102 funzione ← js/ui/calendario/gruppi.js:107 renderMonthCal

## js

### `js/avvio.js`

_nessun nome globale_
