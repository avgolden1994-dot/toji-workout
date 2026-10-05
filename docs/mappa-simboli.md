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
- `js/core/stato-condiviso.js` ← `js/core/costanti.js` (FAILURE_SET_SECONDS)
- `js/ui/onboarding.js` ← `js/lingue/traduttore.js` (ico)
- `js/coach/regole-nuove.js` ← `js/coach/prontezza.js` (applicaProntezza) · `js/coach/dolore-mattina.js` (caricoProssimo) · `js/coach/regole-ricerca.js` (applicaCaricoProgressivo)
- `js/coach/intensita.js` ← `js/coach/dolore-mattina.js` (caricoProssimo) · `js/coach/regole-ricerca.js` (imparaDallaSeduta)
- `js/coach/metodi-epoca-oro.js` ← `js/coach/metodi-momenti.js` (METODI)
- `js/avvio.js` ← `js/dati/libreria-esercizi.js` (buildExerciseSelect) · `js/core/stato-condiviso.js` (recoveryMuted) · `js/core/modalita.js` (getStoredMode, chooseMode) · `js/ui/musica/mp3-locale.js` (refreshFailureTracks) · `js/ui/opzioni/impostazioni.js` (applyTheme)

## js/lingue

### `js/lingue/traduttore.js`

- `ICO_PATHS` js/lingue/traduttore.js:20 costante ← nessun altro file — nel file: ico
- `ico()` js/lingue/traduttore.js:65 funzione ← js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/ui/onboarding.js ×6 · js/coach/repertorio.js ×4 · js/coach/dolore-mattina.js ×1 · js/ui/seduta-libera.js ×4 · js/ui/lavoro-cronometro.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/compone.js ×2 · js/coach/stato.js ×2 · js/coach/psicologia.js ×1 · js/dati/schede-tecniche.js ×2 · js/ui/calendario/gruppi.js ×1 — nel file: emojiInIcone
- `EMOJI_ICO` js/lingue/traduttore.js:71 costante ← nessun altro file — nel file: emojiInIcone
- `EMOJI_RX` js/lingue/traduttore.js:82 costante ← nessun altro file — nel file: EMOJI_RX_G, emojiInIcone, trTesto
- `EMOJI_RX_G` js/lingue/traduttore.js:83 costante ← nessun altro file — nel file: senzaEmojiTesto
- `EMOJI_TESTA` js/lingue/traduttore.js:85 costante ← js/dati/schede-epoca-oro.js ×1 · js/dati/dettagli-esercizi.js ×1 · js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/coach/programma/ricette.js ×2 · js/ui/onboarding-risultato.js ×2 · js/ui/statistiche.js ×4 · js/coach/questionario-decisioni.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/schede-esercizio.js ×2 · js/dati/disegni-esercizi.js ×3 · js/dati/schede-tecniche.js ×2 · js/dati/scheda-unica.js ×1 · js/ui/menu-settimana.js ×1 · js/ui/sessione-completata.js ×2 · js/coach/coach-ia.js ×1 · js/ui/esporta-ics.js ×2 · tests/browser/coerenza-schede.js ×2 · tests/browser/dettagli-esercizi.js ×2 · tests/browser/traduzioni-esercizi.js ×1
- `senzaEmojiTesto()` js/lingue/traduttore.js:86 funzione ← js/coach/coach-ia.js:73 nomePulito — nel file: emojiInIcone, avviaTraduttore
- `LINGUA_KEY` js/lingue/traduttore.js:88 costante ← js/core/backup.js:58 ricaricaApp — nel file: linguaIniziale, setLingua
- `LINGUE` js/lingue/traduttore.js:89 costante ← js/core/backup.js:59 ricaricaApp · js/coach/psicologia.js:163 renderSettings, 254 renderSetPage — nel file: linguaIniziale, setLingua
- `LOCALI` js/lingue/traduttore.js:90 costante ← nessun altro file — nel file: LOCALE
- `I18N` js/lingue/traduttore.js:91 valore window ← js/ui/importa-progressi.js:27 indiceNomi · js/ui/schede-esercizio.js:368 testoRicercaVideo · tests/struttura.test.js:37, 40, 49, 66 · tests/browser/metodi-epoca-oro.js:27 — nel file: tr
- `linguaIniziale()` js/lingue/traduttore.js:93 funzione ← nessun altro file — nel file: LINGUA
- `LINGUA` js/lingue/traduttore.js:99 variabile ← nessun altro file — nel file: lingua, LOCALE, trCore, tr, trTesto, trAlbero, avviaTraduttore, applicaGiorniSettimana, …
- `lingua()` js/lingue/traduttore.js:100 funzione window ← js/lingue/avvio-traduttore.js:2 · js/ui/oggi.js:87 renderOggi · js/ui/guida-interattiva.js:366 renderInformativa · js/core/backup.js:59 ricaricaApp · js/coach/psicologia.js:163 renderSettings, 254 renderSetPage · js/ui/schede-esercizio.js:366 testoRicercaVideo · js/coach/coach-ia.js:101 contestoSeduta
- `LOCALE()` js/lingue/traduttore.js:101 funzione window ← js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×1 · js/ui/storico.js ×5 · js/ui/onboarding-risultato.js ×1 · js/ui/statistiche.js ×5 · js/ui/statistiche-grafico.js ×2 · js/coach/repertorio.js ×3 · js/coach/agente-consigli.js ×2 · js/coach/bia/opzioni.js ×2 · js/core/backup.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×3 · js/ui/progressi/riepilogo.js ×1 · js/ui/progressi/pagine.js ×1 · js/ui/progressi/foto.js ×3 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/psicologia.js ×2 · js/ui/scheda-quattro-sezioni.js ×5 · js/ui/calendario/gruppi.js ×2 · js/ui/calendario/scambio.js ×1 · js/ui/calendario/copia-settimana.js ×2 · js/ui/menu-settimana.js ×2 · js/ui/sessione-completata.js ×2 — nel file: applicaGiorniSettimana
- `I18N_SEP` js/lingue/traduttore.js:103 costante ← nessun altro file — nel file: trCore
- `trCore()` js/lingue/traduttore.js:104 funzione ← nessun altro file — nel file: tr
- `tr()` js/lingue/traduttore.js:130 funzione window ← js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×2 · js/ui/allenamento/macchinario-occupato.js ×11 · js/ui/allenamento/sessione.js ×1 · js/core/nativo.js ×2 · js/ui/allenamento/timer-pannello.js ×3 · js/ui/annulla.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/coach/programma/alternative.js ×4 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×2 · js/coach/bia/opzioni.js ×3 · js/ui/guida-interattiva.js ×6 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×2 · js/ui/stampa-scheda.js ×3 · js/coach/esigenza.js ×1 · js/ui/schede-esercizio.js ×2 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · js/coach/coach-ia.js ×1 · tests/browser/traduzioni-esercizi.js ×1 — nel file: trP, trEs, emojiInIcone, trTesto, trAttr, traduciPagina, avviaTraduttore, ritraduciTutto
- `trP()` js/lingue/traduttore.js:144 funzione window ← js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×3 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/timer-pannello.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×3 · js/coach/intensita.js ×1 · js/coach/bia/opzioni.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/menu-settimana.js ×1
- `trEs()` js/lingue/traduttore.js:149 funzione window ← js/ui/piano/selezione-multipla.js:251 deletePianoExercise · js/ui/allenamento/seduta.js:267 removeSetFrom, 286 toggleSkipExercise · js/ui/allenamento/macchinario-occupato.js:83 htmlSostituito, 103 htmlOccupato, 177 sostituisciOggi, 193 ripristinaOriginale · js/ui/allenamento/timer-pannello.js:9 avvisaTelefonoRecupero · js/ui/gruppi-muscolari.js:176 removeExerciseByName · js/coach/pannello.js:30 renderCoach · js/coach/programma/alternative.js:46 renderAlternative · js/ui/importa-progressi.js:176 mostraAnteprimaImport
- `I18N_ATTR` js/lingue/traduttore.js:151 costante ← nessun altro file — nel file: trAttr, avviaTraduttore, ritraduciTutto
- `I18N_ORIG` js/lingue/traduttore.js:152 costante ← nessun altro file — nel file: emojiInIcone, trTesto, ritraduciTutto
- `emojiInIcone()` js/lingue/traduttore.js:155 funzione ← nessun altro file — nel file: trTesto
- `trTesto()` js/lingue/traduttore.js:179 funzione ← nessun altro file — nel file: trAlbero, avviaTraduttore
- `trAttr()` js/lingue/traduttore.js:191 funzione ← nessun altro file — nel file: trAlbero, avviaTraduttore
- `trAlbero()` js/lingue/traduttore.js:202 funzione ← nessun altro file — nel file: traduciPagina, avviaTraduttore
- `traduciPagina()` js/lingue/traduttore.js:214 funzione window ← nessun altro file — nel file: avviaTraduttore
- `I18N_ATTIVO` js/lingue/traduttore.js:216 variabile ← nessun altro file — nel file: avviaTraduttore
- `avviaTraduttore()` js/lingue/traduttore.js:217 funzione ← js/lingue/avvio-traduttore.js:2 — nel file: setLingua
- `alert()` js/lingue/traduttore.js:223 funzione window ← js/ui/piano/aggiungi-allenamento.js:302 openWeekSheet · js/ui/piano/selezione-multipla.js:67 clearDay, 84 copyDayTo, 147 toggleSuperset, 162 startWorkoutFromPlan · js/ui/allenamento/sessione.js:80 openWorkoutDay · js/ui/musica/mp3-locale.js:78 handleAudioUpload · js/ui/musica/player-web.js:67 previewWebSegment, 76 handleWebLinkSubmit · js/ui/riposo-settimane.js:52 saveWeekSnapshot · js/ui/allenamento/termina-e-cardio.js:93 endWorkout · js/coach/bia/opzioni.js:128 salvaBiaAgente, 138 restartOnboarding · js/ui/calendario/scambio.js:83 mcSwapDays · js/ui/calendario/copia-settimana.js:34 mcSelectWeek, 169 mcPlaceTemplate, 182 mcFillMonth · js/ui/menu-settimana.js:144 mcPlanDay · js/coach/coach-ia.js:33 setCoachIA · js/ui/esporta-ics.js:66 exportIcs — nel file: avviaTraduttore
- `confirm()` js/lingue/traduttore.js:224 funzione window ← js/ui/piano/schede-pronte.js:48 applyTemplate · js/ui/piano/selezione-multipla.js:94 copyDayTo · js/ui/allenamento/sessione.js:77 openWorkoutDay · js/ui/musica/mp3-locale.js:174 deleteTrack · js/ui/riposo-settimane.js:16 toggleRestDay, 68 saveWeekSnapshot, 81 restoreWeek · js/ui/allenamento/termina-e-cardio.js:105 endWorkout · js/ui/storico.js:104 clearHistory · js/coach/bia/opzioni.js:142 restartOnboarding · js/ui/guida-interattiva.js:350 revocaConsenso · js/coach/coach-ia.js:34 setCoachIA — nel file: avviaTraduttore
- `prompt()` js/lingue/traduttore.js:225 funzione window ← js/ui/piano/schede-pronte.js:76 renameDayTitle · js/ui/piano/selezione-multipla.js:85 copyDayTo — nel file: avviaTraduttore
- `DOW_IT` js/lingue/traduttore.js:240 costante ← nessun altro file — nel file: applicaGiorniSettimana
- `applicaGiorniSettimana()` js/lingue/traduttore.js:241 funzione ← js/lingue/avvio-traduttore.js:2 — nel file: setLingua
- `ritraduciTutto()` js/lingue/traduttore.js:251 funzione ← nessun altro file — nel file: setLingua
- `setLingua()` js/lingue/traduttore.js:277 funzione window ← js/core/backup.js:59 ricaricaApp · js/coach/psicologia.js:254 renderSetPage (html)

### `js/lingue/avvio-traduttore.js`

_nessun nome globale_

## js/core

### `js/core/service-worker.js`

_nessun nome globale_

### `js/core/ripristino-guida.js`

- `GUIDA_BACKUP` js/core/ripristino-guida.js:11 costante ← js/ui/guida-interattiva.js:113 guidaPreparaProva, 124 guidaRipristina, 264 chiudiGuida — nel file: guidaApplicaFoto, (primo livello)
- `guidaApplicaFoto()` js/core/ripristino-guida.js:12 funzione ← js/ui/guida-interattiva.js:125 guidaRipristina — nel file: (primo livello)

### `js/core/costanti.js`

- `DAYS` js/core/costanti.js:7 costante ← js/core/storage.js ×2 · js/core/modalita.js ×1 · js/core/navigazione.js ×1 · js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×6 · js/ui/piano/aggiungi-allenamento.js ×10 · js/ui/piano/selezione-multipla.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/figura-anatomica.js ×2 · js/coach/programma/ricette.js ×2 · js/coach/programma/alternative.js ×2 · js/coach/questionario-decisioni.js ×3 · js/coach/repertorio.js ×8 · js/coach/agente-consigli.js ×1 · js/ui/guida-interattiva.js ×3 · js/ui/importa-csv.js ×1 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×2 · tests/cedimento.test.js ×2 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-layout.js ×2 · tests/browser/macchinario-occupato-tendina.js ×2 · tests/browser/macchinario-occupato.js ×2 · tests/browser/metodi-epoca-oro.js ×2 · tests/browser/regole-nuove.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×5 — nel file: currentDay
- `currentDay` js/core/costanti.js:8 variabile ← js/coach/suggeritore.js ×1 · js/ui/piano/schede-pronte.js ×12 · js/core/modalita.js ×1 · js/core/navigazione.js ×4 · js/ui/piano/giorno.js ×9 · js/ui/piano/aggiungi-allenamento.js ×4 · js/ui/piano/selezione-multipla.js ×26 · js/ui/allenamento/seduta.js ×14 · js/ui/allenamento/macchinario-occupato.js ×13 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×5 · js/ui/gruppi-muscolari.js ×10 · js/ui/figura-anatomica.js ×6 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×5 · js/coach/programma/alternative.js ×1 · js/coach/prontezza.js ×5 · js/coach/regole-nuove.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×6 · js/ui/lavoro-cronometro.js ×2 · js/ui/progressi/riepilogo.js ×1 · tests/cedimento.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×2 · tests/browser/macchinario-occupato-tendina.js ×11 · tests/browser/macchinario-occupato.js ×12 · tests/browser/metodi-epoca-oro.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×1
- `currentMode` js/core/costanti.js:9 variabile ← js/coach/suggeritore.js ×1 · js/core/storage.js ×3 · js/core/modalita.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/onboarding.js ×1 · js/coach/programma/archivio.js ×2 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×2 · js/coach/regole-ricerca.js ×1 · js/ui/opzioni/impostazioni.js ×2 · js/core/backup.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×2 · js/coach/psicologia.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/esporta-ics.js ×2
- `currentTab` js/core/costanti.js:10 variabile ← js/lingue/traduttore.js:289 setLingua · js/core/navigazione.js:25 selectDay · js/ui/oggi.js:168 switchTab · js/ui/allenamento/cedimento-canzone.js:95 clearCedimentoAudio · js/ui/guida-interattiva.js:21 GUIDA · js/core/backup.js:26 esportaBackup · js/ui/importa-progressi.js:200 confermaImportProgressi, 217 confermaImport · js/coach/psicologia.js:206 closeSetPage · tests/browser/guida-tocchi.js:24
- `MODE_KEY` js/core/costanti.js:12 costante ← js/core/modalita.js:7 getStoredMode, 10 chooseMode · js/core/backup.js:60 ricaricaApp · js/coach/psicologia.js:291 switchProtocol
- `MODE_META` js/core/costanti.js:14 costante ← js/ui/opzioni/impostazioni.js:34 applyTheme
- `DEFAULT_MONDAY_PROGRAM` js/core/costanti.js:19 costante ← js/core/storage.js:132 seedDefaultsIfNeeded
- `FAILURE_SET_SECONDS` js/core/costanti.js:31 costante ← js/core/stato-condiviso.js:13 dropRemaining · js/ui/allenamento/cedimento.js:147 apriCedimento, 206 chiudiCedimento · js/ui/musica/mp3-locale.js:139 selectTrack, 158 updateMp3SegmentLabel · js/ui/musica/player-web.js:26 configureWebSegment, 41 updateWebSegmentLabel, 206 readYouTubeDuration

## js/dati

### `js/dati/schede-pronte.js`

- `WORKOUT_TEMPLATES` js/dati/schede-pronte.js:11 costante ← js/dati/schede-epoca-oro.js:70 · js/ui/piano/schede-pronte.js:11 openTemplatePicker, 42 applyTemplate · js/ui/piano/aggiungi-allenamento.js:24 awEsercizi, 36 awNome, 175 renderAddWeek · js/ui/figura-anatomica.js:237 renderGruppi · js/coach/programma/ricette.js:339 buildProgram · tests/browser/metodi-epoca-oro.js:15, 17

### `js/dati/libreria-esercizi.js`

- `MUSCLE_GROUPS` js/dati/libreria-esercizi.js:10 costante ← js/dati/dettagli-esercizi.js ×1 · js/coach/suggeritore.js ×2 · js/ui/piano/giorno.js ×4 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/gruppi-muscolari.js ×4 · js/ui/elenco-esercizi.js ×1 · js/ui/figura-anatomica.js ×5 · js/coach/pannello.js ×1 · js/ui/onboarding.js ×1 · js/coach/programma/ricette.js ×3 · js/ui/opzioni/il-coach.js ×1 · js/ui/seduta-libera.js ×1 · js/ui/progressi/riepilogo.js ×3 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/gruppi.js ×4 — nel file: buildExerciseSelect
- `EXERCISE_LIBRARY` js/dati/libreria-esercizi.js:20 costante ← js/dati/schede-epoca-oro.js ×1 · js/dati/dettagli-esercizi.js ×1 · js/coach/suggeritore.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×2 · js/coach/programma/motore.js ×1 · js/coach/programma/ricette.js ×7 · js/coach/programma/struttura-pro.js ×1 · js/coach/questionario-decisioni.js ×1 · js/ui/importa-progressi.js ×1 · js/ui/seduta-libera.js ×2 · js/dati/scheda-unica.js ×1 · tests/browser/carichi-partenza.js ×1 · tests/browser/dettagli-esercizi.js ×4 · tests/browser/elenco-esercizi.js ×2 · tests/browser/ripetizioni.js ×2 · tests/browser/scheda-unica.js ×2 · tests/browser/traduzioni-esercizi.js ×1 — nel file: buildExerciseSelect, findExercise
- `buildExerciseSelect()` js/dati/libreria-esercizi.js:180 funzione ← js/avvio.js:13
- `findExercise()` js/dati/libreria-esercizi.js:197 funzione ← js/dati/dettagli-esercizi.js ×2 · js/coach/suggeritore.js ×3 · js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×2 · js/ui/piano/aggiungi-allenamento.js ×3 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×4 · js/ui/gruppi-muscolari.js ×1 · js/ui/figura-anatomica.js ×7 · js/coach/programma/motore.js ×1 · js/coach/programma/ricette.js ×48 · js/coach/programma/struttura-pro.js ×2 · js/coach/carichi/progressivo.js ×1 · js/coach/carichi/partenza.js ×3 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×1 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×1 · js/coach/metodi-momenti.js ×5 · js/coach/metodi-epoca-oro.js ×2 · js/coach/compone.js ×1 · js/coach/biomeccanica.js ×4 · js/coach/psicologia.js ×2 · js/dati/schede-tecniche.js ×3 · js/dati/scheda-unica.js ×1 · js/ui/calendario/gruppi.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/carichi-partenza.js ×1 · tests/browser/coerenza-schede.js ×2 · tests/browser/metodi-epoca-oro.js ×4

### `js/dati/schede-epoca-oro.js`

_nessun nome globale_

### `js/dati/dettagli-esercizi.js`

- `SEZIONI_ESERCIZI` js/dati/dettagli-esercizi.js:22 costante ← js/dati/schede-tecniche.js:55 htmlDettaglioScheda · tests/browser/traduzioni-esercizi.js:21 — nel file: organizzaEsercizi
- `SOTTOGRUPPI` js/dati/dettagli-esercizi.js:25 costante ← tests/browser/dettagli-esercizi.js:18 · tests/browser/traduzioni-esercizi.js:22 — nel file: organizzaEsercizi
- `MUSCOLI` js/dati/dettagli-esercizi.js:42 costante ← nessun altro file — nel file: muscoloBersaglio
- `MULTIARTICOLARI_TOTALI` js/dati/dettagli-esercizi.js:82 costante ← nessun altro file — nel file: famigliaTotaleDi, lavoroDaSostituire
- `NOTE_ATTACCO` js/dati/dettagli-esercizi.js:89 costante ← tests/browser/dettagli-esercizi.js:26 · tests/browser/traduzioni-esercizi.js:20 — nel file: dettaglioEsercizio
- `DETTAGLI` js/dati/dettagli-esercizi.js:105 costante ← tests/browser/dettagli-esercizi.js:25, 26 — nel file: dettaglioEsercizio, bersaglioDi
- `_nomePulito()` js/dati/dettagli-esercizi.js:263 funzione ← nessun altro file — nel file: dettaglioEsercizio, bersaglioDi, famigliaTotaleDi, sezioneEsercizio, ordineEsercizi
- `dettaglioEsercizio()` js/dati/dettagli-esercizi.js:266 funzione window ← js/ui/piano/aggiungi-allenamento.js:416 renderPiano · js/ui/allenamento/seduta.js:171 renderAllenamento · js/ui/elenco-esercizi.js:53 htmlDettaglioRiga · js/coach/programma/motore.js:72 attrezzoFisicoDi · js/coach/programma/ricette.js:91 adattoAllaSeduta, 144 creditoSerie, 241 riempiTempo · js/coach/programma/struttura-pro.js:26 strSub, 51 strChiave, 55 strRidondante · js/ui/seduta-libera.js:92 htmlListaLibera · js/ui/schede-esercizio.js:365 testoRicercaVideo · js/dati/schede-tecniche.js:53 htmlDettaglioScheda · tests/sicurezza-onda0.test.js:239 (html), 255 (html) · tests/browser/coerenza-schede.js:18 · tests/browser/dettagli-esercizi.js:15 · tests/browser/traduzioni-esercizi.js:15 — nel file: sezioneEsercizio, etichettaAttrezzo, focusEsercizio, focusConTipo, organizzaEsercizi, variantiEsercizio
- `bersaglioDi()` js/dati/dettagli-esercizi.js:273 funzione window ← js/coach/programma/motore.js:119 alternativeStessoMuscolo · js/coach/programma/ricette.js:359 buildProgram · tests/browser/macchinario-occupato-tendina.js:112 — nel file: muscoloBersaglio
- `muscoloBersaglio()` js/dati/dettagli-esercizi.js:278 funzione window ← tests/browser/macchinario-occupato-tendina.js:41 — nel file: lavoroDaSostituire
- `famigliaTotaleDi()` js/dati/dettagli-esercizi.js:283 funzione window ← js/coach/programma/motore.js:119 alternativeStessoMuscolo · js/coach/questionario-decisioni.js:78 varianteStessoMuscolo — nel file: lavoroDaSostituire
- `lavoroDaSostituire()` js/dati/dettagli-esercizi.js:289 funzione window ← js/ui/allenamento/macchinario-occupato.js:97 htmlOccupato
- `sezioneEsercizio()` js/dati/dettagli-esercizi.js:296 funzione window ← nessun altro file — nel file: organizzaEsercizi
- `etichettaAttrezzo()` js/dati/dettagli-esercizi.js:303 funzione window ← js/ui/piano/aggiungi-allenamento.js:416 renderPiano · js/ui/allenamento/seduta.js:171 renderAllenamento · js/ui/seduta-libera.js:95 htmlListaLibera
- `focusEsercizio()` js/dati/dettagli-esercizi.js:307 funzione window ← js/ui/piano/aggiungi-allenamento.js:416 renderPiano · js/ui/allenamento/seduta.js:171 renderAllenamento
- `focusConTipo()` js/dati/dettagli-esercizi.js:312 funzione window ← nessun altro file
- `ordineEsercizi()` js/dati/dettagli-esercizi.js:319 funzione window ← js/ui/gruppi-muscolari.js:83 renderSuggested, 138 renderSheetExercises — nel file: organizzaEsercizi
- `organizzaEsercizi()` js/dati/dettagli-esercizi.js:328 funzione window ← js/ui/elenco-esercizi.js:28 htmlEserciziOrganizzati · tests/browser/dettagli-esercizi.js:27
- `variantiEsercizio()` js/dati/dettagli-esercizi.js:351 funzione window ← js/dati/schede-tecniche.js:56 htmlDettaglioScheda

## js/coach

### `js/coach/parametri.js`

- `COACH_PARAMETRI` js/coach/parametri.js:10 costante ← js/ui/onboarding.js:125 serieEffettive · js/coach/programma/ricette.js:249 riempiTempo, 478 buildProgram · js/coach/programma/struttura-pro.js:121 strBilancia, 158 strFinale · js/coach/prontezza.js:61 applicaProntezza · js/coach/repertorio.js:421 htmlAderenza, 487 verdettoCiclo · js/coach/dolore-mattina.js:68 caricoProssimo · js/coach/regole-ricerca.js:227 caricoProssimoBase · js/coach/regole-nuove.js:73 caricoProssimo, 92 limitaTecnicheIntense · js/coach/esigenza.js:54 aggiornaEsigenza
- `REGOLE_SPEGNIBILI` js/coach/parametri.js:31 costante ← nessun altro file — nel file: regolaAttiva
- `REGOLE_SPENTE_KEY` js/coach/parametri.js:39 costante ← tests/browser/intensita-bia.js:54 · tests/browser/regole-nuove.js:25 — nel file: regolaAttiva
- `regolaAttiva()` js/coach/parametri.js:40 funzione window ← js/ui/allenamento/termina-e-cardio.js:154 endWorkout · js/coach/programma/schemi.js:48 inAllungamento, 49 scambiAllungamento · js/coach/programma/ricette.js:377 buildProgram · js/coach/repertorio.js:64 proposteLivello, 296 corpoCoach, 468 verdettoCiclo · js/coach/dolore-mattina.js:65 caricoProssimo · js/coach/regole-ricerca.js:82 pisoRirEsigenza, 107 rirBersaglioBase, 160 faseDelGiorno, 173 inScarico, 178 sessioniConData, 192 ripresaDopoScarico, … · js/coach/regole-nuove.js:64 caricoProssimo, 87 limitaTecnicheIntense · js/coach/intensita.js:55 statoBia, 77 esigenzaIniziale, 83 rirExtraIntensita, 92 caricoProssimo, 107 bilancioPrimeSedute · js/coach/esigenza.js:22 esigenzaEsclusa, 26 tettoEsigenza, 30 rpeBersaglioSeduta

### `js/coach/catalogo-regole.js`

- `COACH_REGOLE` js/coach/catalogo-regole.js:4 costante ← tests/browser/regole-nuove.js:44 — nel file: regolaDescritta
- `regolaDescritta()` js/coach/catalogo-regole.js:197 funzione window ← tests/browser/regole-nuove.js:44

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
- `armedSet` js/core/stato-condiviso.js:15 variabile ← js/ui/piano/schede-pronte.js:65 applyTemplate · js/core/modalita.js:33 activateMode · js/core/navigazione.js:20 selectDay · js/ui/piano/giorno.js:37 openPlanDayScreen · js/ui/piano/selezione-multipla.js:54 deleteSelected, 70 clearDay, 123 moveExercise, 139 duplicateExercise, 246 deletePianoExercise · js/ui/allenamento/seduta.js:196 renderAllenamento, 264 removeSetFrom · js/ui/allenamento/macchinario-occupato.js:263 annullaCedimento · js/ui/allenamento/sessione.js:84 openWorkoutDay · js/ui/allenamento/cedimento.js:146 apriCedimento, 199 chiudiCedimento · js/ui/riposo-settimane.js:85 restoreWeek · js/ui/allenamento/termina-e-cardio.js:187 endWorkout · js/coach/programma/alternative.js:121 applyGeneratedProgram · tests/cedimento.test.js:96 stato
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

- `dataKey()` js/core/storage.js:7 funzione ← js/coach/questionario-decisioni.js:225 applicaDecisioni · js/coach/prontezza.js:62 applicaProntezza · js/coach/repertorio.js:138 conAnnulla · tests/aiuto-app.js:104 caricaApp (html) · tests/carichi-onda0.test.js:396 chiudiSeduta (html) · tests/intensita-onda0.test.js:346 (html), 363 (html) · tests/migrazione-v1.test.js:142 (html), 145 (html), 156 (html), 176 (html) · tests/sicurezza-onda0.test.js:140 (html), 148 (html) — nel file: loadData, saveData, migrateLegacyDataIfNeeded
- `historyKey()` js/core/storage.js:8 funzione ← js/ui/storico.js:105 clearHistory · js/ui/importa-progressi.js:188 confermaImportProgressi, 210 confermaImport · tests/aiuto-app.js:101 caricaApp (html) · tests/carichi-onda0.test.js:455 (html) — nel file: loadHistory, saveHistory, migrateLegacyDataIfNeeded
- `titlesKey()` js/core/storage.js:9 funzione ← js/ui/guida-interattiva.js:74 guidaDatiDemo — nel file: loadTitles, saveTitles
- `leggiJSON()` js/core/storage.js:13 funzione ← js/ui/riposo-settimane.js:7 loadRestDays, 37 loadWeeks · js/ui/allenamento/termina-e-cardio.js:39 cardioCorrente · js/ui/importa-progressi.js:15 eserciziPersonalizzati · js/ui/progressi/peso.js:11 pesiTutti, 104 registraPeso — nel file: loadTitles, loadData, loadHistory
- `loadTitles()` js/core/storage.js:22 funzione ← js/ui/piano/schede-pronte.js:58 applyTemplate, 78 renameDayTitle · js/ui/piano/aggiungi-allenamento.js:253 applicaAllaSettimana · js/ui/riposo-settimane.js:61 saveWeekSnapshot · js/coach/programma/alternative.js:60 applyGeneratedProgram · js/ui/seduta-libera.js:15 ripristinaSpeciale, 145 avviaSpeciale · js/ui/calendario/scambio.js:141 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13 — nel file: getDayTitle
- `saveTitles()` js/core/storage.js:23 funzione ← js/ui/piano/schede-pronte.js:61 applyTemplate, 82 renameDayTitle · js/ui/piano/aggiungi-allenamento.js:278 applicaAllaSettimana · js/ui/riposo-settimane.js:83 restoreWeek · js/coach/programma/alternative.js:68 applyGeneratedProgram · js/ui/seduta-libera.js:18 ripristinaSpeciale, 153 avviaSpeciale · js/ui/calendario/scambio.js:153 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13
- `getDayTitle()` js/core/storage.js:24 funzione ← js/ui/piano/schede-pronte.js ×3 · js/core/navigazione.js ×2 · js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×8 · js/ui/piano/aggiungi-allenamento.js ×6 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/sessione.js ×5 · js/ui/riposo-settimane.js ×1 · js/ui/gruppi-muscolari.js ×1 · js/ui/figura-anatomica.js ×1 · js/ui/storico.js ×1 · js/ui/statistiche.js ×2 · js/coach/questionario-decisioni.js ×2 · js/ui/seduta-libera.js ×4 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/menu-settimana.js ×1 · js/coach/coach-ia.js ×2
- `normalizeExerciseRecord()` js/core/storage.js:29 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/macchinario-occupato.js ×6 · js/ui/figura-anatomica.js ×1 · js/coach/programma/alternative.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×2 · js/coach/metodi-momenti.js ×2 · tests/cedimento.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-profilo.js ×1 · tests/browser/macchinario-occupato-tendina.js ×1 · tests/browser/macchinario-occupato.js ×1 · tests/browser/ripetizioni.js ×1 — nel file: loadData, seedDefaultsIfNeeded
- `loadData()` js/core/storage.js:66 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/oggi.js ×2 · js/ui/piano/giorno.js ×6 · js/ui/piano/aggiungi-allenamento.js ×7 · js/ui/piano/selezione-multipla.js ×16 · js/ui/allenamento/seduta.js ×12 · js/ui/allenamento/macchinario-occupato.js ×10 · js/ui/allenamento/sessione.js ×2 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×5 · js/ui/figura-anatomica.js ×4 · js/coach/pannello.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×3 · js/coach/prontezza.js ×2 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×1 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×8 · js/ui/lavoro-cronometro.js ×2 · js/ui/progressi/riepilogo.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/mese.js ×1 · js/ui/calendario/scambio.js ×1 · js/ui/calendario/copia-settimana.js ×2 · js/ui/sessione-completata.js ×1 · tests/aiuto-app.js ×1 · tests/cedimento.test.js ×3 · tests/browser/carichi-evoluzione.js ×2 · tests/browser/elenco-esercizi.js ×2 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-tendina.js ×11 · tests/browser/macchinario-occupato.js ×12 · tests/browser/metodi-epoca-oro.js ×2 · tests/browser/regole-nuove.js ×3 · tests/browser/ripetizioni.js ×2 · tests/browser/sicurezza.js ×1 — nel file: seedDefaultsIfNeeded
- `saveData()` js/core/storage.js:75 funzione ← js/ui/piano/schede-pronte.js ×1 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/piano/selezione-multipla.js ×12 · js/ui/allenamento/seduta.js ×10 · js/ui/allenamento/macchinario-occupato.js ×9 · js/ui/allenamento/cedimento.js ×1 · js/ui/riposo-settimane.js ×1 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×3 · js/coach/regole-ricerca.js ×1 · js/coach/regole-nuove.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/seduta-libera.js ×6 · js/coach/metodi-momenti.js ×2 · js/ui/calendario/scambio.js ×2 · tests/cedimento.test.js ×1 · tests/browser/carichi-evoluzione.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-layout.js ×1 · tests/browser/macchinario-occupato-tendina.js ×2 · tests/browser/macchinario-occupato.js ×2 · tests/browser/metodi-epoca-oro.js ×3 · tests/browser/regole-nuove.js ×2 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×1 — nel file: seedDefaultsIfNeeded
- `normalizeHistoryEntry()` js/core/storage.js:77 funzione ← nessun altro file — nel file: loadHistory
- `loadHistory()` js/core/storage.js:108 funzione ← js/ui/oggi.js ×3 · js/ui/allenamento/seduta.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×2 · js/ui/statistiche.js ×1 · js/coach/carichi/progressivo.js ×1 · js/coach/carichi/partenza.js ×1 · js/coach/questionario-decisioni.js ×1 · js/coach/repertorio.js ×5 · js/coach/regole-ricerca.js ×3 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×3 · js/ui/progressi/pagine.js ×1 · js/ui/calendario/gruppi.js ×1 · js/ui/sessione-completata.js ×1 · js/coach/coach-ia.js ×6 · tests/carichi-onda0.test.js ×8 · tests/migrazione-v1.test.js ×6 · tests/browser/macchinario-occupato.js ×1 · tests/browser/statistiche.js ×1
- `saveHistory()` js/core/storage.js:112 funzione ← js/ui/allenamento/termina-e-cardio.js:164 endWorkout · js/coach/questionario-decisioni.js:293 inviaQuestionario · js/ui/guida-interattiva.js:97 guidaDatiDemo · js/ui/importa-progressi.js:192 confermaImportProgressi, 213 confermaImport · js/coach/coach-ia.js:139 commentaSeduta · tests/carichi-onda0.test.js:450 (html) · tests/browser/carichi-evoluzione.js:32, 34, 38, 40, 43, 47, … · tests/browser/intensita-bia.js:42, 44, 50, 55, 97, 107, … · tests/browser/regole-nuove.js:18, 24, 25, 28, 29, 31, …
- `migrateLegacyDataIfNeeded()` js/core/storage.js:114 funzione ← js/core/modalita.js:29 activateMode
- `seedDefaultsIfNeeded()` js/core/storage.js:125 funzione ← js/core/modalita.js:30 activateMode

## js/ui

### `js/ui/piano/schede-pronte.js`

- `openTemplatePicker()` js/ui/piano/schede-pronte.js:7 funzione window ← index.html:150 (html)
- `closeTemplatePicker()` js/ui/piano/schede-pronte.js:37 funzione window ← index.html:788 (html) — nel file: applyTemplate
- `applyTemplate()` js/ui/piano/schede-pronte.js:41 funzione window ← js/ui/figura-anatomica.js:282 renderGruppi (html), 321 applyTemplateFromGroups · tests/browser/metodi-epoca-oro.js:79, 82 — nel file: openTemplatePicker
- `renameDayTitle()` js/ui/piano/schede-pronte.js:74 funzione window ← index.html:94 (html)

## js/core

### `js/core/modalita.js`

- `getStoredMode()` js/core/modalita.js:7 funzione ← js/avvio.js:18
- `chooseMode()` js/core/modalita.js:9 funzione window ← js/avvio.js:18 · tests/avvio.test.js:18
- `activateMode()` js/core/modalita.js:23 funzione ← js/core/backup.js:60 ricaricaApp · js/coach/psicologia.js:292 switchProtocol — nel file: chooseMode

### `js/core/navigazione.js`

- `daysContainer` js/core/navigazione.js:7 costante ← nessun altro file — nel file: renderDayBar
- `renderDayBar()` js/core/navigazione.js:9 funzione ← js/ui/piano/schede-pronte.js:67 applyTemplate, 83 renameDayTitle · js/core/modalita.js:36 activateMode · js/ui/piano/giorno.js:43 openPlanDayScreen · js/ui/allenamento/sessione.js:94 openWorkoutDay · js/ui/riposo-settimane.js:86 restoreWeek · js/coach/programma/alternative.js:124 applyGeneratedProgram — nel file: selectDay
- `selectDay()` js/core/navigazione.js:17 funzione window ← nessun altro file — nel file: renderDayBar

## js/ui

### `js/ui/oggi.js`

- `CATEGORIE` js/ui/oggi.js:11 costante ← nessun altro file — nel file: categoriaDi, obiettiviSettimana, renderOggi
- `categoriaDi()` js/ui/oggi.js:17 funzione ← nessun altro file — nel file: obiettiviSettimana
- `obiettiviSettimana()` js/ui/oggi.js:24 funzione window ← nessun altro file — nel file: renderOggi
- `settimaneDiFila()` js/ui/oggi.js:47 funzione window ← js/ui/storico.js:86 renderProgressiTop — nel file: renderOggi
- `renderOggi()` js/ui/oggi.js:56 funzione window ← js/coach/repertorio.js:402 sceltaSaltata, 443 rispostaAderenza, 533 nuovoCiclo · js/coach/dolore-mattina.js:38 rispostaDolore · js/coach/metodi-momenti.js:181 terminaMomento, 188 verificaMomento, 197 fineMomento · js/ui/calendario/scambio.js:134 aggiornaDopoScambio — nel file: switchTab
- `iniziaOggi()` js/ui/oggi.js:161 funzione window ← nessun altro file — nel file: renderOggi
- `switchTab()` js/ui/oggi.js:167 funzione window ← js/core/modalita.js ×1 · js/ui/piano/selezione-multipla.js ×1 · js/ui/riposo-settimane.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/agente-consigli.js ×1 · js/coach/bia/opzioni.js ×2 · js/ui/guida-interattiva.js ×1 · js/ui/opzioni/impostazioni.js ×2 · js/core/backup.js ×1 · js/ui/seduta-libera.js ×1 · js/coach/metodi-momenti.js ×2 · js/coach/stato.js ×1 · js/coach/psicologia.js ×1 · index.html ×5 · tests/cedimento.test.js ×1 · tests/browser/elenco-esercizi.js ×2 · tests/browser/guida-tocchi.js ×4 · tests/browser/metodi-epoca-oro.js ×1 · tests/browser/sicurezza.js ×2 · tests/browser/statistiche.js ×1 — nel file: renderOggi, iniziaOggi

## js/core

### `js/core/utility.js`

- `escapeHtml()` js/core/utility.js:7 funzione ← js/dati/libreria-esercizi.js ×2 · js/ui/piano/schede-pronte.js ×3 · js/ui/oggi.js ×6 · js/ui/piano/giorno.js ×7 · js/ui/piano/aggiungi-allenamento.js ×9 · js/ui/allenamento/seduta.js ×9 · js/ui/allenamento/macchinario-occupato.js ×14 · js/ui/allenamento/sessione.js ×3 · js/ui/musica/mp3-locale.js ×1 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/ui/elenco-esercizi.js ×3 · js/ui/figura-anatomica.js ×3 · js/coach/pannello.js ×2 · js/ui/storico.js ×2 · js/ui/onboarding-risultato.js ×4 · js/coach/programma/alternative.js ×7 · js/ui/statistiche.js ×8 · js/ui/statistiche-grafico.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/repertorio.js ×3 · js/coach/agente-consigli.js ×7 · js/ui/opzioni/il-coach.js ×2 · js/ui/importa-csv.js ×4 · js/ui/importa-progressi.js ×4 · js/ui/seduta-libera.js ×7 · js/ui/progressi/riepilogo.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/compone.js ×1 · js/coach/psicologia.js ×10 · js/dati/disegni-esercizi.js ×2 · js/dati/schede-tecniche.js ×16 · js/ui/menu-settimana.js ×4 · js/ui/sessione-completata.js ×3 · js/coach/coach-ia.js ×3 — nel file: jsArg
- `nomeSicuro()` js/core/utility.js:12 funzione ← js/ui/importa-csv.js:158 nomeDaEstero, 205 sedutaImportata · js/ui/importa-progressi.js:195 confermaImportProgressi
- `pulisciDeep()` js/core/utility.js:16 funzione ← js/core/backup.js:12 valorePulito
- `jsArg()` js/core/utility.js:28 funzione ← js/ui/piano/giorno.js:113 renderDayView · js/ui/piano/aggiungi-allenamento.js:159 renderAddWeek, 426 renderPiano · js/ui/allenamento/seduta.js:180 renderAllenamento · js/ui/gruppi-muscolari.js:99 renderSuggested, 159 renderSheetExercises · js/coach/pannello.js:37 renderCoach · js/dati/schede-tecniche.js:66 htmlDettaglioScheda
- `formatMMSS()` js/core/utility.js:29 funzione ← js/ui/allenamento/seduta.js:146 avviaTempoSeduta · js/ui/allenamento/timer-recupero.js:13 updateRecoveryRing · js/ui/allenamento/cedimento.js:118 updateDropTimerDisplay · js/ui/musica/mp3-locale.js:112 renderFailureTracks, 160 updateMp3SegmentLabel · js/ui/musica/player-web.js:45 updateWebSegmentLabel, 207 readYouTubeDuration
- `formatNow()` js/core/utility.js:35 funzione ← js/ui/riposo-settimane.js:60 saveWeekSnapshot · js/ui/allenamento/termina-e-cardio.js:114 endWorkout · js/coach/programma/alternative.js:91 applyGeneratedProgram · js/ui/guida-interattiva.js:338 setConsenso · js/coach/coach-ia.js:39 setCoachIA, 138 commentaSeduta · tests/aiuto-app.js:107 caricaApp (html) · tests/browser/carichi-evoluzione.js:28, 68 · tests/browser/intensita-bia.js:40, 95, 115 · tests/browser/regole-nuove.js:13
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
- `testSound()` js/core/musica-altre-app.js:114 funzione window ← js/coach/psicologia.js:237 renderSetPage (html)
- `playTick()` js/core/musica-altre-app.js:124 funzione ← js/ui/allenamento/timer-recupero.js:56 tickRecupero · js/ui/lavoro-cronometro.js:39 tickLavoro — nel file: testSound
- `playEnd()` js/core/musica-altre-app.js:125 funzione ← js/ui/allenamento/timer-recupero.js:37 fineRecupero · js/ui/lavoro-cronometro.js:49 tickLavoro — nel file: testSound
- `stepValue()` js/core/musica-altre-app.js:126 funzione window ← index.html:575 (html), 577 (html), 583 (html), 585 (html), 591 (html), 593 (html), …

## js/ui

### `js/ui/piano/giorno.js`

- `syncBuildingLine()` js/ui/piano/giorno.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:375 renderPiano · js/ui/figura-anatomica.js:205 renderGruppi
- `backToPlanDays()` js/ui/piano/giorno.js:17 funzione window ← js/ui/oggi.js:178 switchTab · index.html:89 (html)
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
- `unoRM()` js/ui/allenamento/seduta.js:27 funzione ← js/ui/scheda-quattro-sezioni.js:35 seduteEsercizio, 111 paneRecord — nel file: migliorUnoRM, controllaRecord
- `migliorUnoRM()` js/ui/allenamento/seduta.js:34 funzione ← nessun altro file — nel file: controllaRecord
- `controllaRecord()` js/ui/allenamento/seduta.js:44 funzione ← js/ui/allenamento/macchinario-occupato.js:234 toggleSetDone
- `updateSetRpe()` js/ui/allenamento/seduta.js:54 funzione window ← nessun altro file — nel file: renderAllenamento
- `addWarmup()` js/ui/allenamento/seduta.js:63 funzione window ← nessun altro file — nel file: renderAllenamento
- `removeWarmup()` js/ui/allenamento/seduta.js:74 funzione window ← nessun altro file — nel file: renderAllenamento
- `updateWarmup()` js/ui/allenamento/seduta.js:81 funzione window ← nessun altro file — nel file: renderAllenamento
- `toggleWarmup()` js/ui/allenamento/seduta.js:88 funzione window ← nessun altro file — nel file: renderAllenamento
- `DISCHI` js/ui/allenamento/seduta.js:98 costante ← nessun altro file — nel file: dischiPerLato
- `COLORE_DISCO` js/ui/allenamento/seduta.js:99 costante ← nessun altro file — nel file: renderPlates
- `dischiPerLato()` js/ui/allenamento/seduta.js:101 funzione window ← nessun altro file — nel file: renderPlates
- `dischiBil` js/ui/allenamento/seduta.js:109 variabile ← nessun altro file — nel file: setBilanciere, renderPlates
- `openPlates()` js/ui/allenamento/seduta.js:110 funzione window ← nessun altro file — nel file: renderAllenamento
- `closePlates()` js/ui/allenamento/seduta.js:118 funzione window ← index.html:314 (html), 318 (html)
- `setBilanciere()` js/ui/allenamento/seduta.js:119 funzione window ← index.html:324 (html), 325 (html), 326 (html)
- `renderPlates()` js/ui/allenamento/seduta.js:120 funzione window ← index.html:321 (html) — nel file: openPlates, setBilanciere
- `sedutaTimer` js/ui/allenamento/seduta.js:135 variabile ← nessun altro file — nel file: avviaTempoSeduta, fermaTempoSeduta
- `avviaTempoSeduta()` js/ui/allenamento/seduta.js:136 funzione ← js/ui/allenamento/sessione.js:88 openWorkoutDay
- `fermaTempoSeduta()` js/ui/allenamento/seduta.js:151 funzione ← js/ui/allenamento/sessione.js:11 backToDayPicker · js/ui/allenamento/termina-e-cardio.js:167 endWorkout · js/ui/guida-interattiva.js:268 chiudiGuida · js/ui/seduta-libera.js:23 annullaSpeciale
- `renderAllenamento()` js/ui/allenamento/seduta.js:157 funzione ← js/ui/piano/schede-pronte.js ×1 · js/core/modalita.js ×1 · js/core/navigazione.js ×1 · js/ui/piano/aggiungi-allenamento.js ×2 · js/ui/piano/selezione-multipla.js ×12 · js/ui/allenamento/macchinario-occupato.js ×7 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/cedimento.js ×2 · js/ui/riposo-settimane.js ×2 · js/ui/gruppi-muscolari.js ×2 · js/ui/figura-anatomica.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/alternative.js ×1 · js/coach/questionario-decisioni.js ×2 · js/coach/prontezza.js ×2 · js/coach/repertorio.js ×2 · js/coach/regole-nuove.js ×2 · js/ui/opzioni/impostazioni.js ×1 · js/ui/seduta-libera.js ×3 · js/ui/lavoro-cronometro.js ×3 · js/ui/calendario/scambio.js ×1 · tests/browser/elenco-esercizi.js ×1 · tests/browser/macchinario-occupato-tendina.js ×3 · tests/browser/macchinario-occupato.js ×1 · tests/browser/ripetizioni.js ×1 · tests/browser/sicurezza.js ×2 — nel file: addWarmup, removeWarmup, toggleWarmup, addSetTo, removeSetFrom, toggleSkipExercise
- `addSetTo()` js/ui/allenamento/seduta.js:240 funzione window ← nessun altro file — nel file: renderAllenamento
- `removeSetFrom()` js/ui/allenamento/seduta.js:257 funzione window ← nessun altro file — nel file: renderAllenamento
- `toggleSkipExercise()` js/ui/allenamento/seduta.js:278 funzione window ← nessun altro file — nel file: renderAllenamento

### `js/ui/allenamento/macchinario-occupato.js`

- `ETICHETTA_ATTREZZO` js/ui/allenamento/macchinario-occupato.js:12 costante ← nessun altro file — nel file: htmlOccupato
- `ICONA_SCAMBIO` js/ui/allenamento/macchinario-occupato.js:13 costante ← nessun altro file — nel file: htmlSostituito, htmlOccupato
- `ICONA_FRECCIA_GIU` js/ui/allenamento/macchinario-occupato.js:14 costante ← nessun altro file — nel file: htmlOccupato
- `occupatoAperto` js/ui/allenamento/macchinario-occupato.js:15 variabile ← tests/browser/macchinario-occupato-tendina.js:133 — nel file: impostaOccupato, fuoriOccupato, tastoOccupato, htmlOccupato, toggleOccupato
- `occupatoOpzioni` js/ui/allenamento/macchinario-occupato.js:16 variabile ← tests/browser/carichi-evoluzione.js:85 — nel file: htmlOccupato, sostituisciOggi
- `occupatoAscolto` js/ui/allenamento/macchinario-occupato.js:17 variabile ← nessun altro file — nel file: impostaOccupato
- `impostaOccupato()` js/ui/allenamento/macchinario-occupato.js:23 funzione ← js/ui/allenamento/sessione.js:85 openWorkoutDay · js/ui/allenamento/termina-e-cardio.js:175 endWorkout · tests/browser/macchinario-occupato-tendina.js:130, 131 (html) — nel file: chiudiOccupato, fuoriOccupato, tastoOccupato, toggleOccupato, dopoSceltaOccupato
- `triggerOccupato()` js/ui/allenamento/macchinario-occupato.js:32 funzione ← nessun altro file — nel file: chiudiOccupato, fuoriOccupato, tastoOccupato
- `chiudiOccupato()` js/ui/allenamento/macchinario-occupato.js:33 funzione ← nessun altro file — nel file: fuoriOccupato, tastoOccupato, toggleOccupato
- `fuoriOccupato()` js/ui/allenamento/macchinario-occupato.js:39 funzione ← nessun altro file — nel file: impostaOccupato
- `tastoOccupato()` js/ui/allenamento/macchinario-occupato.js:46 funzione ← nessun altro file — nel file: impostaOccupato
- `prefsOccupato()` js/ui/allenamento/macchinario-occupato.js:63 funzione ← nessun altro file — nel file: alternativeOggi
- `alternativeOggi()` js/ui/allenamento/macchinario-occupato.js:72 funzione ← tests/browser/macchinario-occupato-profilo.js:13 · tests/browser/macchinario-occupato-tendina.js:122 · tests/browser/macchinario-occupato.js:22, 70 — nel file: htmlOccupato
- `copiaRecord()` js/ui/allenamento/macchinario-occupato.js:77 funzione ← nessun altro file — nel file: sostituisciOggi, ripristinaOriginale, ripristinaSostituzioni, pulisciSostituzioniVecchie
- `htmlSostituito()` js/ui/allenamento/macchinario-occupato.js:80 funzione ← js/ui/allenamento/seduta.js:173 renderAllenamento
- `htmlOccupato()` js/ui/allenamento/macchinario-occupato.js:87 funzione ← js/ui/allenamento/seduta.js:216 renderAllenamento
- `tastoApriOccupato()` js/ui/allenamento/macchinario-occupato.js:115 funzione window ← nessun altro file — nel file: htmlOccupato
- `toggleOccupato()` js/ui/allenamento/macchinario-occupato.js:122 funzione window ← tests/browser/macchinario-occupato.js:40, 42, 47, 52, 64, 74 — nel file: htmlOccupato, tastoApriOccupato
- `posizionaOccupato()` js/ui/allenamento/macchinario-occupato.js:137 funzione ← nessun altro file — nel file: toggleOccupato
- `dopoSceltaOccupato()` js/ui/allenamento/macchinario-occupato.js:147 funzione ← nessun altro file — nel file: sostituisciOggi, ripristinaOriginale
- `sostituisciOggi()` js/ui/allenamento/macchinario-occupato.js:155 funzione window ← tests/browser/carichi-evoluzione.js:85 · tests/browser/macchinario-occupato.js:44, 52, 53, 65 — nel file: htmlOccupato
- `ripristinaOriginale()` js/ui/allenamento/macchinario-occupato.js:184 funzione window ← nessun altro file — nel file: htmlOccupato
- `ripristinaSostituzioni()` js/ui/allenamento/macchinario-occupato.js:201 funzione ← js/ui/allenamento/termina-e-cardio.js:174 endWorkout
- `pulisciSostituzioniVecchie()` js/ui/allenamento/macchinario-occupato.js:205 funzione ← js/ui/allenamento/seduta.js:159 renderAllenamento
- `updateSetField()` js/ui/allenamento/macchinario-occupato.js:218 funzione window ← js/ui/allenamento/seduta.js:200 renderAllenamento (html)
- `toggleSetDone()` js/ui/allenamento/macchinario-occupato.js:228 funzione window ← js/ui/allenamento/seduta.js:203 renderAllenamento (html) · js/ui/lavoro-cronometro.js:52 tickLavoro · tests/browser/macchinario-occupato.js:54
- `annullaCedimento()` js/ui/allenamento/macchinario-occupato.js:259 funzione window ← js/ui/allenamento/seduta.js:202 renderAllenamento (html)

### `js/ui/allenamento/sessione.js`

- `backToDayPicker()` js/ui/allenamento/sessione.js:9 funzione window ← js/ui/oggi.js:179 switchTab · js/ui/allenamento/termina-e-cardio.js:193 endWorkout · js/ui/seduta-libera.js:168 renderSpecialeBox (html) · index.html:188 (html) · tests/cedimento.test.js:246
- `fattoQuestaSettimana()` js/ui/allenamento/sessione.js:23 funzione ← nessun altro file — nel file: renderWorkoutDayPicker
- `renderWorkoutDayPicker()` js/ui/allenamento/sessione.js:29 funzione ← js/ui/seduta-libera.js:24 annullaSpeciale — nel file: backToDayPicker
- `openWorkoutDay()` js/ui/allenamento/sessione.js:74 funzione window ← js/ui/oggi.js:164 iniziaOggi · js/ui/piano/selezione-multipla.js:168 startWorkoutFromPlan · js/ui/seduta-libera.js:157 avviaSpeciale, 175 renderSeduteExtra (html) · js/ui/sessione-completata.js:59 mostraSessione (html) · tests/cedimento.test.js:74 apri, 89 preparaSeduta · tests/browser/macchinario-occupato.js:64 — nel file: renderWorkoutDayPicker

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
- `closeRecoveryPanel()` js/ui/allenamento/timer-pannello.js:31 funzione window ← js/core/modalita.js:35 activateMode · js/ui/allenamento/macchinario-occupato.js:250 toggleSetDone · js/ui/allenamento/sessione.js:17 backToDayPicker · js/ui/allenamento/timer-recupero.js:41 fineRecupero · js/ui/allenamento/termina-e-cardio.js:189 endWorkout · js/coach/mi-sento-male.js:10 apriMiSentoMale · js/ui/guida-interattiva.js:267 chiudiGuida · js/ui/seduta-libera.js:225 spuntaExtra · js/ui/lavoro-cronometro.js:24 avviaLavoro · index.html:831 (html) · tests/cedimento.test.js:196 · tests/browser/macchinario-occupato-tendina.js:69
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
- `apriCedimento()` js/ui/allenamento/cedimento.js:139 funzione window ← js/ui/allenamento/seduta.js:202 renderAllenamento (html) · tests/cedimento.test.js:182
- `tickCedimento()` js/ui/allenamento/cedimento.js:170 funzione ← js/ui/allenamento/timer-pannello.js:72 — nel file: apriCedimento
- `finishDropSet()` js/ui/allenamento/cedimento.js:181 funzione ← nessun altro file — nel file: tickCedimento
- `chiudiCedimento()` js/ui/allenamento/cedimento.js:197 funzione ← js/ui/oggi.js:169 switchTab · js/ui/allenamento/sessione.js:10 backToDayPicker — nel file: apriCedimento, finishDropSet, stopDropSet
- `stopDropSet()` js/ui/allenamento/cedimento.js:219 funzione window = chiudiCedimento ← js/core/modalita.js:34 activateMode · js/core/navigazione.js:21 selectDay · js/ui/allenamento/macchinario-occupato.js:263 annullaCedimento · js/ui/allenamento/sessione.js:16 backToDayPicker · js/ui/musica/mp3-locale.js:149 selectTrack, 181 deleteTrack · js/ui/allenamento/termina-e-cardio.js:188 endWorkout · js/coach/mi-sento-male.js:11 apriMiSentoMale · js/ui/guida-interattiva.js:266 chiudiGuida · index.html:509 (html), 527 (html)

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
- `attachRepsField()` js/ui/gesti.js:102 funzione ← js/ui/allenamento/seduta.js:227 renderAllenamento
- `attachNumberDrag()` js/ui/gesti.js:116 funzione ← nessun altro file

### `js/ui/annulla.js`

- `snackTimer` js/ui/annulla.js:7 variabile ← nessun altro file — nel file: showUndo, hideSnackbar
- `lastUndo` js/ui/annulla.js:8 variabile ← nessun altro file — nel file: showUndo, hideSnackbar, (primo livello)
- `showUndo()` js/ui/annulla.js:10 funzione window ← js/ui/piano/giorno.js ×2 · js/ui/piano/aggiungi-allenamento.js ×1 · js/ui/piano/selezione-multipla.js ×4 · js/ui/allenamento/seduta.js ×3 · js/ui/allenamento/macchinario-occupato.js ×3 · js/ui/allenamento/cedimento-canzone.js ×1 · js/ui/musica/lettore-fisso.js ×1 · js/ui/riposo-settimane.js ×3 · js/ui/gruppi-muscolari.js ×2 · js/ui/allenamento/termina-e-cardio.js ×2 · js/coach/programma/alternative.js ×2 · js/coach/questionario-decisioni.js ×3 · js/coach/prontezza.js ×1 · js/coach/mi-sento-male.js ×1 · js/coach/repertorio.js ×9 · js/coach/dolore-mattina.js ×2 · js/coach/intensita.js ×2 · js/coach/bia/opzioni.js ×3 · js/ui/guida-interattiva.js ×2 · js/ui/opzioni/il-coach.js ×2 · js/core/backup.js ×4 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×3 · js/ui/progressi/foto.js ×3 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×3 · js/dati/schede-tecniche.js ×1 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×3 · js/ui/menu-settimana.js ×4 · js/coach/coach-ia.js ×1 · js/ui/esporta-ics.js ×1
- `hideSnackbar()` js/ui/annulla.js:23 funzione window ← js/ui/oggi.js:170 switchTab — nel file: (primo livello)

### `js/ui/riposo-settimane.js`

- `restKey()` js/ui/riposo-settimane.js:6 funzione ← js/coach/questionario-decisioni.js:227 applicaDecisioni · tests/migrazione-v1.test.js:176 (html) · tests/sicurezza-onda0.test.js:148 (html) — nel file: loadRestDays, saveRestDays
- `loadRestDays()` js/ui/riposo-settimane.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:254 applicaAllaSettimana · js/coach/questionario-decisioni.js:279 riduciFrequenza · js/ui/calendario/scambio.js:141 planSwapDays — nel file: isRestDay, toggleRestDay, saveWeekSnapshot
- `saveRestDays()` js/ui/riposo-settimane.js:8 funzione ← js/ui/piano/aggiungi-allenamento.js:279 applicaAllaSettimana · js/coach/programma/alternative.js:69 applyGeneratedProgram · js/coach/questionario-decisioni.js:279 riduciFrequenza · js/ui/guida-interattiva.js:75 guidaDatiDemo · js/ui/calendario/scambio.js:153 planSwapDays · tests/cedimento.test.js:86 preparaSeduta · tests/browser/elenco-esercizi.js:63 · tests/browser/macchinario-occupato-layout.js:11 · tests/browser/macchinario-occupato-tendina.js:20 · tests/browser/macchinario-occupato.js:13 · tests/browser/ripetizioni.js:31 — nel file: toggleRestDay, restoreWeek
- `isRestDay()` js/ui/riposo-settimane.js:9 funzione window ← js/ui/oggi.js:29 obiettiviSettimana, 82 renderOggi · js/ui/piano/giorno.js:34 openPlanDayScreen, 73 exitPlanEdit, 89 renderDayView, 159 renderPlanMap, 182 renderPlanMapList, 211 renderPlanDayPicker · js/ui/piano/aggiungi-allenamento.js:98 awQuick, 218 renderAddWeek, 321 renderWeekOverview, 368 renderPiano · js/ui/allenamento/sessione.js:53 renderWorkoutDayPicker, 76 openWorkoutDay · js/ui/gruppi-muscolari.js:61 renderSuggested · js/ui/figura-anatomica.js:116 weekUsage, 162 weeklyVolumeByGroup · js/coach/questionario-decisioni.js:276 riduciFrequenza · js/coach/repertorio.js:249 controlloSchemi · js/ui/progressi/riepilogo.js:32 htmlProssimaSeduta · js/ui/stampa-scheda.js:12 righeScheda · js/coach/stato.js:41 ultimoGiornoAllenamento · js/ui/calendario/mese.js:31 voceDaPiano · tests/aiuto-app.js:105 caricaApp (html) — nel file: syncRestToggle
- `toggleRestDay()` js/ui/riposo-settimane.js:11 funzione window ← index.html:121 (html)
- `syncRestToggle()` js/ui/riposo-settimane.js:27 funzione ← js/ui/piano/aggiungi-allenamento.js:362 renderPiano
- `weeksKey()` js/ui/riposo-settimane.js:36 funzione ← nessun altro file — nel file: loadWeeks, saveWeeks
- `loadWeeks()` js/ui/riposo-settimane.js:37 funzione ← nessun altro file — nel file: saveWeekSnapshot, restoreWeek, deleteWeek, renderWeeks
- `saveWeeks()` js/ui/riposo-settimane.js:38 funzione ← nessun altro file — nel file: saveWeekSnapshot, deleteWeek
- `isoWeekLabel()` js/ui/riposo-settimane.js:40 funzione ← nessun altro file — nel file: saveWeekSnapshot
- `saveWeekSnapshot()` js/ui/riposo-settimane.js:49 funzione window ← index.html:81 (html)
- `restoreWeek()` js/ui/riposo-settimane.js:78 funzione window ← nessun altro file — nel file: renderWeeks
- `deleteWeek()` js/ui/riposo-settimane.js:91 funzione window ← nessun altro file — nel file: renderWeeks
- `renderWeeks()` js/ui/riposo-settimane.js:106 funzione ← js/ui/oggi.js:175 switchTab · js/ui/progressi/pagine.js:43 apriPagProgressi — nel file: saveWeekSnapshot, deleteWeek

### `js/ui/gruppi-muscolari.js`

- `selectedGroups` js/ui/gruppi-muscolari.js:7 variabile ← js/ui/piano/giorno.js:38 openPlanDayScreen, 72 exitPlanEdit · js/ui/figura-anatomica.js:208 renderGruppi · js/coach/pannello.js:15 renderCoach · js/coach/programma/alternative.js:122 applyGeneratedProgram — nel file: toggleGroup, renderSuggested, openGroupSheet, clearGroupSelection
- `toggleGroup()` js/ui/gruppi-muscolari.js:12 funzione window ← nessun altro file
- `sheetGroup` js/ui/gruppi-muscolari.js:17 variabile ← js/ui/figura-anatomica.js:317 addLibraryExercise — nel file: openGroupSheet, closeGroupSheet, renderSheetExercises, removeExerciseByName
- `sheetOrder` js/ui/gruppi-muscolari.js:18 variabile ← nessun altro file — nel file: openGroupSheet, closeGroupSheet, renderSheetExercises
- `suggestedOrder` js/ui/gruppi-muscolari.js:19 variabile ← nessun altro file — nel file: renderSuggested, clearGroupSelection
- `suggestedOrderKey` js/ui/gruppi-muscolari.js:20 variabile ← js/ui/piano/giorno.js:39 openPlanDayScreen — nel file: renderSuggested, clearGroupSelection
- `toggleGroupInPlan()` js/ui/gruppi-muscolari.js:24 funzione window ← js/ui/piano/giorno.js:197 aggiungiPerGruppo
- `pickRow()` js/ui/gruppi-muscolari.js:30 funzione ← js/ui/piano/aggiungi-allenamento.js:159 renderAddWeek — nel file: renderSuggested, renderSheetExercises
- `togglePickExercise()` js/ui/gruppi-muscolari.js:49 funzione window ← nessun altro file — nel file: renderSuggested, renderSheetExercises
- `renderSuggested()` js/ui/gruppi-muscolari.js:56 funzione ← js/ui/piano/giorno.js:46 openPlanDayScreen, 61 enterPlanEdit, 253 openAddEx, 262 openReco · js/ui/piano/aggiungi-allenamento.js:374 renderPiano · js/ui/piano/selezione-multipla.js:55 deleteSelected, 71 clearDay — nel file: clearGroupSelection
- `openGroupSheet()` js/ui/gruppi-muscolari.js:105 funzione window ← js/ui/figura-anatomica.js:224 renderGruppi (html) · tests/browser/elenco-esercizi.js:18, 72 — nel file: toggleGroup, toggleGroupInPlan
- `closeGroupSheet()` js/ui/gruppi-muscolari.js:117 funzione window ← index.html:704 (html), 716 (html)
- `renderSheetExercises()` js/ui/gruppi-muscolari.js:125 funzione ← js/ui/figura-anatomica.js:317 addLibraryExercise — nel file: openGroupSheet, removeExerciseByName
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
- `muscleFigure()` js/ui/figura-anatomica.js:26 funzione window ← js/ui/oggi.js:115 renderOggi · js/ui/piano/aggiungi-allenamento.js:415 renderPiano · js/ui/allenamento/seduta.js:170 renderAllenamento · js/ui/gruppi-muscolari.js:37 pickRow · js/ui/elenco-esercizi.js:39 htmlEserciziOrganizzati · js/ui/onboarding.js:342 renderOnb · js/ui/seduta-libera.js:94 htmlListaLibera · js/ui/progressi/riepilogo.js:70 renderFatica — nel file: muscleCard, renderGruppi
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
- `isTimeBased()` js/ui/figura-anatomica.js:93 funzione window ← js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×3 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/gruppi-muscolari.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/coach/programma/ricette.js ×16 · js/coach/programma/struttura-pro.js ×6 · js/coach/carichi/partenza.js ×2 · js/coach/questionario-decisioni.js ×2 · js/coach/repertorio.js ×1 · js/coach/dolore-mattina.js ×3 · js/coach/regole-ricerca.js ×3 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×1 · js/ui/importa-csv.js ×1 · js/ui/lavoro-cronometro.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×4 · js/coach/metodi-epoca-oro.js ×1 · js/coach/compone.js ×2 · js/dati/scheda-unica.js ×1 · tests/carichi-onda0.test.js ×1 · tests/browser/coerenza-schede.js ×2 — nel file: repsRange, defaultRepsFor
- `perLato()` js/ui/figura-anatomica.js:98 funzione window ← js/ui/oggi.js:117 renderOggi · js/ui/lavoro-cronometro.js:9 infoEsercizio · js/ui/stampa-scheda.js:13 righeScheda
- `corpoLibero()` js/ui/figura-anatomica.js:100 funzione window ← js/ui/allenamento/seduta.js:200 renderAllenamento · js/coach/carichi/partenza.js:71 scalaDaStorico, 96 stimaCaricoIniziale · js/ui/lavoro-cronometro.js:10 infoEsercizio — nel file: repsCorporatura
- `repsCorporatura()` js/ui/figura-anatomica.js:102 funzione window ← nessun altro file — nel file: repsRange
- `repsRange()` js/ui/figura-anatomica.js:103 funzione window ← js/ui/allenamento/seduta.js:226 renderAllenamento · js/ui/allenamento/macchinario-occupato.js:164 sostituisciOggi · tests/browser/ripetizioni.js:16
- `defaultRepsFor()` js/ui/figura-anatomica.js:107 funzione window ← js/ui/piano/aggiungi-allenamento.js:20 awEsercizi · js/ui/gruppi-muscolari.js:33 pickRow — nel file: addLibraryExercise
- `weekUsage()` js/ui/figura-anatomica.js:112 funzione window ← js/coach/suggeritore.js:34 suggestNextExercises · js/ui/piano/schede-pronte.js:10 openTemplatePicker · js/ui/gruppi-muscolari.js:69 renderSuggested, 130 renderSheetExercises — nel file: usageState, renderGruppi
- `usageState()` js/ui/figura-anatomica.js:129 funzione window ← js/ui/gruppi-muscolari.js:81 renderSuggested, 136 renderSheetExercises
- `usageBadge()` js/ui/figura-anatomica.js:137 funzione ← nessun altro file
- `usageRank()` js/ui/figura-anatomica.js:145 funzione ← js/ui/gruppi-muscolari.js:81 renderSuggested, 136 renderSheetExercises
- `VOL_MIN_UTILE` js/ui/figura-anatomica.js:154 costante ← js/ui/piano/giorno.js:160 renderPlanMap — nel file: volLevel
- `VOL_MAX_UTILE` js/ui/figura-anatomica.js:155 costante ← js/ui/piano/giorno.js:160 renderPlanMap — nel file: volLevel
- `weeklyVolumeByGroup()` js/ui/figura-anatomica.js:157 funzione window ← js/ui/piano/giorno.js:134 renderPlanMap, 181 renderPlanMapList — nel file: renderGruppi
- `volLevel()` js/ui/figura-anatomica.js:184 funzione ← js/ui/piano/giorno.js:157 renderPlanMap — nel file: renderBodyMap, volLabel, renderGruppi
- `volLabel()` js/ui/figura-anatomica.js:191 funzione ← nessun altro file — nel file: renderGruppi
- `renderGruppi()` js/ui/figura-anatomica.js:203 funzione ← js/ui/piano/schede-pronte.js:70 applyTemplate · js/core/navigazione.js:25 selectDay · js/ui/piano/giorno.js:45 openPlanDayScreen, 61 enterPlanEdit, 253 openAddEx, 262 openReco · js/ui/piano/selezione-multipla.js:55 deleteSelected, 71 clearDay, 250 deletePianoExercise · js/ui/riposo-settimane.js:23 toggleRestDay, 86 restoreWeek · js/ui/gruppi-muscolari.js:122 closeGroupSheet, 175 removeExerciseByName, 192 clearGroupSelection · js/coach/programma/alternative.js:124 applyGeneratedProgram · tests/browser/metodi-epoca-oro.js:87 — nel file: addLibraryExercise, applyTemplateFromGroups
- `addLibraryExercise()` js/ui/figura-anatomica.js:292 funzione window ← js/ui/gruppi-muscolari.js:53 togglePickExercise · js/coach/pannello.js:37 renderCoach (html)
- `applyTemplateFromGroups()` js/ui/figura-anatomica.js:320 funzione window ← nessun altro file — nel file: renderGruppi

## js/coach

### `js/coach/pannello.js`

- `renderCoach()` js/coach/pannello.js:7 funzione ← js/ui/piano/aggiungi-allenamento.js:384 renderPiano

## js/ui

### `js/ui/allenamento/termina-e-cardio.js`

- `ultimaChiusuraSeduta` js/ui/allenamento/termina-e-cardio.js:7 variabile ← nessun altro file — nel file: endWorkout
- `obiettivoSeduta()` js/ui/allenamento/termina-e-cardio.js:14 funzione ← nessun altro file — nel file: endWorkout
- `CARDIO_TIPI` js/ui/allenamento/termina-e-cardio.js:30 costante ← nessun altro file — nel file: nomeCardio, renderCardio
- `cardioKey()` js/ui/allenamento/termina-e-cardio.js:38 funzione ← js/ui/guida-interattiva.js:118 guidaPreparaProva — nel file: cardioCorrente, aggiungiCardio, togliCardio, endWorkout
- `cardioCorrente()` js/ui/allenamento/termina-e-cardio.js:39 funzione ← nessun altro file — nel file: renderCardio, aggiungiCardio, togliCardio, endWorkout
- `cardioAperto` js/ui/allenamento/termina-e-cardio.js:40 variabile ← js/ui/guida-interattiva.js:26 GUIDA — nel file: renderCardio, toggleCardio, aggiungiCardio, endWorkout
- `nomeCardio()` js/ui/allenamento/termina-e-cardio.js:41 funzione ← nessun altro file — nel file: renderCardio, aggiungiCardio, renderCardioStat
- `renderCardio()` js/ui/allenamento/termina-e-cardio.js:42 funzione window ← js/ui/allenamento/seduta.js:158 renderAllenamento — nel file: toggleCardio, aggiungiCardio, togliCardio, endWorkout
- `toggleCardio()` js/ui/allenamento/termina-e-cardio.js:55 funzione window ← nessun altro file — nel file: renderCardio
- `aggiungiCardio()` js/ui/allenamento/termina-e-cardio.js:56 funzione window ← nessun altro file — nel file: renderCardio
- `togliCardio()` js/ui/allenamento/termina-e-cardio.js:65 funzione window ← nessun altro file — nel file: renderCardio
- `minutiCardioSettimana()` js/ui/allenamento/termina-e-cardio.js:67 funzione ← nessun altro file — nel file: renderCardioStat
- `renderCardioStat()` js/ui/allenamento/termina-e-cardio.js:71 funzione window ← js/ui/progressi/pagine.js:44 apriPagProgressi
- `endWorkout()` js/ui/allenamento/termina-e-cardio.js:89 funzione window ← js/coach/mi-sento-male.js:18 chiudiSedutaInterrotta · index.html:207 (html) · tests/carichi-onda0.test.js:397 chiudiSeduta (html) · tests/migrazione-v1.test.js:158 (html) · tests/browser/macchinario-occupato.js:59
- `__sedutaInterrotta` js/ui/allenamento/termina-e-cardio.js:100 valore window (riassegnato anche in js/coach/mi-sento-male.js:17) ← nessun altro file — nel file: endWorkout

### `js/ui/storico.js`

- `rigaSeduta()` js/ui/storico.js:9 funzione ← nessun altro file — nel file: htmlStoricoOrdinato
- `htmlStoricoOrdinato()` js/ui/storico.js:27 funzione ← nessun altro file — nel file: renderStorico, openAllSessions
- `renderStorico()` js/ui/storico.js:54 funzione ← js/ui/oggi.js:175 switchTab · js/ui/importa-progressi.js:200 confermaImportProgressi, 217 confermaImport · js/ui/progressi/pagine.js:43 apriPagProgressi — nel file: clearHistory
- `openAllSessions()` js/ui/storico.js:67 funzione window ← nessun altro file
- `closeAllSessions()` js/ui/storico.js:74 funzione window ← index.html:356 (html)
- `renderProgressiTop()` js/ui/storico.js:77 funzione ← js/ui/progressi/pagine.js:44 apriPagProgressi — nel file: renderStorico
- `clearHistory()` js/ui/storico.js:103 funzione window ← js/coach/psicologia.js:182 renderSettings (html) · index.html:405 (html)

### `js/ui/onboarding.js`

- `ONB_KEY` js/ui/onboarding.js:15 costante ← js/coach/programma/alternative.js:112 applyGeneratedProgram · js/ui/guida-interattiva.js:344 setConsenso — nel file: startOnboarding, onbSkipAll
- `PROFILE_KEY()` js/ui/onboarding.js:16 funzione ← js/coach/programma/alternative.js ×2 · js/coach/repertorio.js ×4 · js/coach/intensita.js ×1 · js/coach/bia/opzioni.js ×1 · js/ui/guida-interattiva.js ×1 · js/ui/opzioni/il-coach.js ×4 · js/ui/progressi/peso.js ×1 · js/coach/metodi-momenti.js ×4 · js/coach/biomeccanica.js ×1 · js/coach/esigenza.js ×3 · js/coach/psicologia.js ×1 · js/dati/schede-tecniche.js ×1 · tests/aiuto-app.js ×1 · tests/browser/intensita-bia.js ×2 · tests/browser/macchinario-occupato-profilo.js ×1 · tests/browser/regole-nuove.js ×1
- `onbStep` js/ui/onboarding.js:18 variabile ← js/coach/bia/lettore.js:252 applyBiaValues · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbPrev, onbNext, onbStepValid, renderOnb
- `onbData` js/ui/onboarding.js:19 variabile ← js/coach/bia/lettore.js:238 applyBiaValues · js/coach/programma/ricette.js:279 buildProgram · js/ui/onboarding-risultato.js:6 renderOnbResult · js/coach/programma/alternative.js:6 altraVariante, 20 apriAlternative, 29 applicaAlternative, 39 renderAlternative, 58 applyGeneratedProgram · js/coach/repertorio.js:527 nuovoCiclo · js/coach/psicologia.js:75 onbPsico, 93 renderPsicoStep, 98 onbMomento · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbNext, onbStepValid, onbSetTest, onbPick, onbSetEta, onbToggleGoal, onbTogglePriorita, …
- `ONB_GOALS` js/ui/onboarding.js:21 costante ← js/ui/onboarding-risultato.js:8 renderOnbResult — nel file: renderOnb
- `ONB_LEVELS` js/ui/onboarding.js:30 costante ← nessun altro file — nel file: renderOnb
- `splitFor()` js/ui/onboarding.js:37 funzione ← nessun altro file — nel file: splitPerFrequenza
- `splitPerFrequenza()` js/ui/onboarding.js:60 funzione ← js/coach/programma/ricette.js:294 buildProgram
- `SLOT_PRIORITA` js/ui/onboarding.js:86 costante ← nessun altro file — nel file: ricettaPunti
- `ricettaPunti()` js/ui/onboarding.js:88 funzione ← js/coach/programma/ricette.js:351 buildProgram
- `schemeFor()` js/ui/onboarding.js:96 funzione ← js/coach/catalogo-regole.js:26 COACH_REGOLE (html) · js/coach/programma/motore.js:144 schemaMisto · js/coach/programma/ricette.js:471 buildProgram · tests/generatore-onda0.test.js:53 (html), 67 (html)
- `PARAM_NUMERO_ESERCIZI` js/ui/onboarding.js:113 costante ← js/coach/programma/ricette.js:422 buildProgram — nel file: serieEffettive, pausaMediaPerTipo, exerciseCountFor
- `serieEffettive()` js/ui/onboarding.js:122 funzione ← nessun altro file — nel file: exerciseCountFor
- `pausaMediaPerTipo()` js/ui/onboarding.js:129 funzione ← nessun altro file — nel file: exerciseCountFor
- `exerciseCountFor()` js/ui/onboarding.js:133 funzione ← js/coach/catalogo-regole.js:15 COACH_REGOLE (html) · js/coach/programma/ricette.js:295 buildProgram
- `PARAM_ETA` js/ui/onboarding.js:143 costante ← js/coach/programma/ricette.js:286 buildProgram · js/ui/opzioni/il-coach.js:20 paginaCoach · js/coach/compone.js:50 sceltaMetodo — nel file: etaPerProgramma, renderOnb
- `MSG_ETA_SOTTO_MINIMO` js/ui/onboarding.js:144 costante ← js/coach/programma/ricette.js:286 buildProgram — nel file: etaPerProgramma
- `MSG_ETA_MANCANTE` js/ui/onboarding.js:145 costante ← nessun altro file — nel file: etaPerProgramma
- `etaPerProgramma()` js/ui/onboarding.js:146 funzione ← js/coach/repertorio.js:505 nuovoCiclo · js/ui/opzioni/il-coach.js:70 setCoach — nel file: onbNext, onbStepValid, onbSetEta, renderOnb
- `startOnboarding()` js/ui/onboarding.js:154 funzione window ← js/core/modalita.js:14 chooseMode · js/coach/bia/opzioni.js:143 restartOnboarding · js/ui/guida-interattiva.js:343 setConsenso
- `nuovoOnbData()` js/ui/onboarding.js:164 funzione ← tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding
- `onbSkipAll()` js/ui/onboarding.js:173 funzione window ← index.html:772 (html) — nel file: onbPrev
- `onbPrev()` js/ui/onboarding.js:179 funzione window ← index.html:767 (html)
- `ONB_ULTIMO` js/ui/onboarding.js:185 costante ← nessun altro file — nel file: onbNext, renderOnb
- `onbNext()` js/ui/onboarding.js:187 funzione window ← index.html:777 (html) · tests/generatore-onda0.test.js:314 (html)
- `onbStepValid()` js/ui/onboarding.js:197 funzione ← tests/generatore-onda0.test.js:302 (html) — nel file: onbNext, onbSetEta, renderOnb
- `ONB_FREQ` js/ui/onboarding.js:206 costante ← js/ui/opzioni/il-coach.js:32 paginaCoach — nel file: renderOnb
- `onbSetTest()` js/ui/onboarding.js:212 funzione window ← nessun altro file — nel file: renderOnb
- `onbPick()` js/ui/onboarding.js:217 funzione window ← js/ui/onboarding-risultato.js:76 renderOnbResult (html) — nel file: optHtml
- `onbSetEta()` js/ui/onboarding.js:222 funzione window ← nessun altro file — nel file: renderOnb
- `onbToggleGoal()` js/ui/onboarding.js:234 funzione window ← nessun altro file — nel file: renderOnb
- `onbTogglePriorita()` js/ui/onboarding.js:242 funzione window ← nessun altro file — nel file: renderOnb
- `onbToggleFastidio()` js/ui/onboarding.js:248 funzione window ← nessun altro file — nel file: renderOnb
- `ONB_LUOGHI` js/ui/onboarding.js:256 costante ← nessun altro file — nel file: renderOnb
- `ONB_FASTIDI` js/ui/onboarding.js:261 costante ← nessun altro file — nel file: renderOnb
- `ONB_PARQ` js/ui/onboarding.js:268 costante ← nessun altro file — nel file: renderOnb
- `PARQ_DOMANDE` js/ui/onboarding.js:272 costante ← nessun altro file — nel file: renderOnb
- `ONB_SONNO` js/ui/onboarding.js:273 costante ← nessun altro file — nel file: renderOnb
- `ONB_ATTREZZI` js/ui/onboarding.js:278 costante ← nessun altro file — nel file: renderOnb
- `chip()` js/ui/onboarding.js:284 funzione ← js/coach/psicologia.js:93 renderPsicoStep — nel file: renderOnb
- `renderOnb()` js/ui/onboarding.js:288 funzione ← js/coach/bia/lettore.js:253 applyBiaValues · js/coach/programma/alternative.js:8 altraVariante, 31 applicaAlternative · js/coach/psicologia.js:77 onbPsico, 98 onbMomento · tests/browser/prove-biomeccaniche.js:10 — nel file: startOnboarding, onbPrev, onbNext, onbSetTest, onbPick, onbToggleGoal, onbTogglePriorita, onbToggleFastidio, …
- `optHtml()` js/ui/onboarding.js:374 funzione ← nessun altro file — nel file: renderOnb
- `renderBiaStep()` js/ui/onboarding.js:388 funzione ← nessun altro file — nel file: renderOnb
- `onbManuale` js/ui/onboarding.js:442 variabile ← nessun altro file — nel file: renderBiaStep, onbToggleManuale
- `onbToggleManuale()` js/ui/onboarding.js:443 funzione window ← nessun altro file — nel file: renderBiaStep
- `biaField()` js/ui/onboarding.js:448 funzione ← nessun altro file — nel file: renderBiaStep
- `bindBiaInputs()` js/ui/onboarding.js:453 funzione ← nessun altro file — nel file: renderOnb
- `ensurePdfJs()` js/ui/onboarding.js:467 funzione ← js/coach/bia/lettore.js:221 handleBiaPdf · js/coach/bia/opzioni.js:101 agentBiaPdf · js/ui/importa-progressi.js:121 testoDaPdfRighe

## js/coach

### `js/coach/bia/lettore.js`

- `numIt()` js/coach/bia/lettore.js:13 funzione ← nessun altro file — nel file: parseInBody
- `parseInBody()` js/coach/bia/lettore.js:15 funzione window ← nessun altro file — nel file: parseBiaText
- `parseBiaText()` js/coach/bia/lettore.js:100 funzione window ← js/coach/bia/opzioni.js:108 agentBiaPdf — nel file: handleBiaPdf
- `handleBiaPdf()` js/coach/bia/lettore.js:213 funzione window ← js/ui/onboarding.js:455 bindBiaInputs
- `applyBiaValues()` js/coach/bia/lettore.js:237 funzione window ← nessun altro file — nel file: handleBiaPdf
- `analyzeBia()` js/coach/bia/lettore.js:267 funzione window ← js/ui/onboarding-risultato.js:7 renderOnbResult · js/coach/compone.js:15 fattoreFisico

### `js/coach/programma/motore.js`

- `strutturaProgramma()` js/coach/programma/motore.js:22 funzione ← js/coach/catalogo-regole.js:13 COACH_REGOLE (html) · js/coach/programma/ricette.js:296 buildProgram · tests/sicurezza-onda0.test.js:299 (html), 300 (html), 302 (html), 303 (html), 304 (html), 305 (html)
- `fasiProgramma()` js/coach/programma/motore.js:28 funzione ← js/coach/programma/ricette.js:767 buildProgram · tests/sicurezza-onda0.test.js:300 (html), 303 (html)
- `attrezzoDi()` js/coach/programma/motore.js:35 funzione ← js/dati/dettagli-esercizi.js:299 sezioneEsercizio · js/ui/allenamento/seduta.js:213 renderAllenamento · js/ui/allenamento/macchinario-occupato.js:107 htmlOccupato · js/ui/figura-anatomica.js:100 corpoLibero · js/coach/programma/ricette.js:386 buildProgram · js/coach/carichi/partenza.js:85 arrotondaPartenza · js/coach/questionario-decisioni.js:74 varianteStessoMuscolo · js/ui/seduta-libera.js:66 renderSedutaLibera, 110 renderListaLibera, 184 arrotondaCarico · js/coach/biomeccanica.js:44 stabile · js/dati/scheda-unica.js:23 schedaUnica · tests/browser/dettagli-esercizi.js:21 · tests/browser/macchinario-occupato-profilo.js:13 — nel file: consentito, sostituto, alternativeStessoMuscolo
- `RISCHIO` js/coach/programma/motore.js:52 costante ← nessun altro file — nel file: consentito
- `ECCEZIONI_RISCHIO` js/coach/programma/motore.js:61 costante ← nessun altro file — nel file: eccezioneRischio
- `senzaMacchine()` js/coach/programma/motore.js:62 funzione ← nessun altro file — nel file: ECCEZIONI_RISCHIO
- `ATTREZZI_NON_DI_CASA` js/coach/programma/motore.js:70 costante ← nessun altro file — nel file: attrezzoDiCasaMancante
- `ATTREZZI_NON_CON_I_MANUBRI` js/coach/programma/motore.js:71 costante ← nessun altro file — nel file: attrezzoDiCasaMancante
- `attrezzoFisicoDi()` js/coach/programma/motore.js:72 funzione ← nessun altro file — nel file: attrezzoDiCasaMancante
- `attrezzoDiCasaMancante()` js/coach/programma/motore.js:73 funzione ← nessun altro file — nel file: consentito
- `eccezioneRischio()` js/coach/programma/motore.js:78 funzione ← nessun altro file — nel file: consentito
- `consentito()` js/coach/programma/motore.js:83 funzione ← js/coach/catalogo-regole.js:19 COACH_REGOLE (html) · js/coach/programma/ricette.js:192 rinforzaFemorali, 262 riempiTempo, 367 buildProgram · js/coach/programma/struttura-pro.js:79 strCopri, 139 strBilancia — nel file: alternativeStessoMuscolo
- `sostituto()` js/coach/programma/motore.js:100 funzione ← js/coach/repertorio.js:150 azioneCoach · js/dati/schede-tecniche.js:95 preferisci
- `alternativeStessoMuscolo()` js/coach/programma/motore.js:118 funzione ← js/ui/allenamento/macchinario-occupato.js:75 alternativeOggi · js/coach/programma/alternative.js:16 alternativeDi · js/coach/questionario-decisioni.js:79 varianteStessoMuscolo — nel file: sostituto
- `schemaMisto()` js/coach/programma/motore.js:143 funzione ← js/coach/programma/ricette.js:281 buildProgram

### `js/coach/programma/schemi.js`

- `SCHEMI_MOV` js/coach/programma/schemi.js:20 costante ← js/coach/programma/ricette.js:501 buildProgram · js/coach/repertorio.js:250 controlloSchemi · js/dati/schede-tecniche.js:71 preferenzaEsercizio — nel file: schemaDi
- `SCHEMI_RISERVA` js/coach/programma/schemi.js:28 costante ← nessun altro file — nel file: schemaDi
- `schemaDi()` js/coach/programma/schemi.js:31 funzione ← js/coach/programma/motore.js:123 alternativeStessoMuscolo · js/coach/programma/ricette.js:20 SLOT_DEF, 147 creditoSerie, 492 buildProgram · js/coach/programma/struttura-pro.js:52 strChiave, 68 strEspinta, 69 strEtirata, 136 strBilancia, 175 strAntagonisti · js/coach/repertorio.js:249 controlloSchemi · js/coach/biomeccanica.js:23 cueEsercizio · js/dati/schede-tecniche.js:71 preferenzaEsercizio · js/dati/scheda-unica.js:27 schedaUnica · tests/browser/coerenza-schede.js:38, 46, 66, 73
- `ISOLAMENTI` js/coach/programma/schemi.js:32 costante ← nessun altro file — nel file: isolamentoDi
- `isolamentoDi()` js/coach/programma/schemi.js:37 funzione ← js/dati/scheda-unica.js:28 schedaUnica
- `IN_ALLUNGAMENTO` js/coach/programma/schemi.js:41 costante ← nessun altro file — nel file: inAllungamento
- `IN_ALLUNGAMENTO_NUOVI` js/coach/programma/schemi.js:44 costante ← nessun altro file — nel file: inAllungamento
- `SCAMBI_ALLUNGAMENTO_NUOVI` js/coach/programma/schemi.js:47 costante ← nessun altro file — nel file: scambiAllungamento
- `inAllungamento()` js/coach/programma/schemi.js:48 funzione ← js/coach/programma/motore.js:101 sostituto · js/coach/programma/ricette.js:383 buildProgram · js/dati/scheda-unica.js:29 schedaUnica · tests/browser/regole-nuove.js:42
- `scambiAllungamento()` js/coach/programma/schemi.js:49 funzione ← js/coach/programma/ricette.js:438 buildProgram
- `SCAMBI_ALLUNGAMENTO` js/coach/programma/schemi.js:50 costante ← nessun altro file — nel file: scambiAllungamento
- `SCHIENA_PESANTE` js/coach/programma/schemi.js:52 costante ← js/coach/programma/ricette.js:367 buildProgram · js/coach/programma/struttura-pro.js:27 strSchiena
- `GLUTEI_FAMIGLIE` js/coach/programma/schemi.js:53 costante ← js/coach/programma/ricette.js:520 buildProgram
- `VOLUME_LIVELLO` js/coach/programma/schemi.js:57 costante ← js/coach/programma/ricette.js:596 buildProgram
- `GRUPPI_PRINCIPALI` js/coach/programma/schemi.js:58 costante ← js/ui/onboarding.js:351 renderOnb · js/coach/programma/ricette.js:616 buildProgram · js/ui/opzioni/il-coach.js:27 paginaCoach · js/ui/progressi/riepilogo.js:44 faticaMuscoli
- `libNome()` js/coach/programma/schemi.js:59 funzione ← nessun altro file

### `js/coach/programma/ricette.js`

- `rngDa()` js/coach/programma/ricette.js:13 funzione ← nessun altro file — nel file: buildProgram
- `_n()` js/coach/programma/ricette.js:18 funzione ← nessun altro file — nel file: SLOT_DEF
- `SLOT_DEF` js/coach/programma/ricette.js:19 costante ← js/coach/programma/struttura-pro.js:139 strBilancia — nel file: buildProgram
- `RICETTE` js/coach/programma/ricette.js:40 costante ← nessun altro file — nel file: buildProgram
- `PRIORI` js/coach/programma/ricette.js:53 costante ← js/dati/dettagli-esercizi.js:321 ordineEsercizi · js/coach/programma/motore.js:130 alternativeStessoMuscolo · js/coach/programma/struttura-pro.js:141 strBilancia · js/ui/importa-progressi.js:41 riconosciEsercizio — nel file: riempiTempo, buildProgram
- `TECNICHE_AL_CEDIMENTO` js/coach/programma/ricette.js:72 costante ← nessun altro file — nel file: buildProgram
- `senzaCedimento()` js/coach/programma/ricette.js:74 funzione ← nessun altro file — nel file: buildProgram
- `adattoAlCincoPerCinque()` js/coach/programma/ricette.js:80 funzione ← nessun altro file — nel file: buildProgram
- `SCHEMI_ATTESI` js/coach/programma/ricette.js:84 costante ← nessun altro file — nel file: buildProgram
- `SLOT_PER_SCHEMA` js/coach/programma/ricette.js:85 costante ← nessun altro file — nel file: buildProgram
- `adattoAllaSeduta()` js/coach/programma/ricette.js:87 funzione ← nessun altro file — nel file: riempiTempo, buildProgram
- `RIPETIZIONI_SETTIMANA_MAX` js/coach/programma/ricette.js:97 costante ← nessun altro file — nel file: rinforzaFemorali, riempiTempo, buildProgram
- `GRUPPI_DELLA_SEDUTA` js/coach/programma/ricette.js:99 costante ← nessun altro file — nel file: adattoAllaSeduta, riempiTempo, buildProgram
- `PARAM_TEMPO` js/coach/programma/ricette.js:104 costante ← nessun altro file — nel file: stimaMinutiSeduta, riempiTempo, buildProgram
- `tipoObiettivoDi()` js/coach/programma/ricette.js:117 funzione ← nessun altro file — nel file: riempiTempo, buildProgram
- `stimaMinutiSeduta()` js/coach/programma/ricette.js:118 funzione ← nessun altro file — nel file: rinforzaFemorali, riempiTempo, buildProgram
- `GRUPPI_FRAZIONARI` js/coach/programma/ricette.js:134 costante ← nessun altro file — nel file: gruppoFrazionario, limitaVolumePerMuscolo, riempiTempo
- `FRAZIONARI_NON_CONTATI` js/coach/programma/ricette.js:140 costante ← nessun altro file — nel file: creditoSerie
- `gruppoFrazionario()` js/coach/programma/ricette.js:141 funzione ← nessun altro file — nel file: creditoSerie
- `creditoSerie()` js/coach/programma/ricette.js:143 funzione ← nessun altro file — nel file: frazionarieSettimana, limitaVolumePerMuscolo, rinforzaFemorali, riempiTempo
- `frazionarieSettimana()` js/coach/programma/ricette.js:153 funzione ← nessun altro file — nel file: limitaVolumePerMuscolo, rinforzaFemorali, riempiTempo
- `limitaVolumePerMuscolo()` js/coach/programma/ricette.js:162 funzione ← nessun altro file — nel file: buildProgram
- `rinforzaFemorali()` js/coach/programma/ricette.js:186 funzione ← nessun altro file — nel file: buildProgram
- `riempiTempo()` js/coach/programma/ricette.js:223 funzione ← nessun altro file — nel file: buildProgram
- `buildProgram()` js/coach/programma/ricette.js:278 funzione window ← js/ui/onboarding-risultato.js:6 renderOnbResult · js/coach/programma/alternative.js:39 renderAlternative, 58 applyGeneratedProgram · tests/avvio.test.js:18 · tests/browser/carichi-evoluzione.js:13, 14, 15 · tests/browser/coerenza-schede.js:24, 93, 103 · tests/browser/intensita-bia.js:29 · tests/browser/metodi-epoca-oro.js:43, 46, 51, 57, 62, 67, …

### `js/coach/programma/struttura-pro.js`

- `STR_PESI` js/coach/programma/struttura-pro.js:23 costante ← js/coach/programma/ricette.js:175 limitaVolumePerMuscolo — nel file: strBilancia, strFinale
- `strMeta()` js/coach/programma/struttura-pro.js:25 funzione ← nessun altro file — nel file: strTier, strOrdina, strChiave, strCopri, strBilancia, strFinale, strAntagonisti, strPuoSuperserie
- `strSub()` js/coach/programma/struttura-pro.js:26 funzione ← nessun altro file — nel file: strTier, strCopri, strAntagonisti
- `strSchiena()` js/coach/programma/struttura-pro.js:27 funzione ← js/coach/programma/ricette.js:388 buildProgram
- `strTier()` js/coach/programma/struttura-pro.js:30 funzione ← nessun altro file — nel file: strRango, strSuperserie
- `strRango()` js/coach/programma/struttura-pro.js:37 funzione ← nessun altro file — nel file: strOrdina
- `strOrdina()` js/coach/programma/struttura-pro.js:41 funzione window ← js/coach/programma/ricette.js:207 rinforzaFemorali, 274 riempiTempo, 444 buildProgram · tests/browser/coerenza-schede.js:105 — nel file: strCopri
- `strChiave()` js/coach/programma/struttura-pro.js:50 funzione ← nessun altro file — nel file: strRidondante
- `strRidondante()` js/coach/programma/struttura-pro.js:54 funzione window ← js/coach/programma/ricette.js:263 riempiTempo, 387 buildProgram — nel file: strBilancia
- `strSerie()` js/coach/programma/struttura-pro.js:62 funzione ← js/coach/programma/ricette.js:174 limitaVolumePerMuscolo — nel file: strBilancia
- `STR_FATICA` js/coach/programma/struttura-pro.js:66 costante ← tests/browser/coerenza-schede.js:53, 57 — nel file: strFinale
- `STR_TIRATE_ALTE` js/coach/programma/struttura-pro.js:67 costante ← nessun altro file — nel file: strEtirata, strCopri
- `strEspinta()` js/coach/programma/struttura-pro.js:68 funzione ← js/coach/programma/ricette.js:174 limitaVolumePerMuscolo — nel file: strCopri, strBilancia
- `strEtirata()` js/coach/programma/struttura-pro.js:69 funzione ← js/coach/programma/ricette.js:173 limitaVolumePerMuscolo — nel file: strBilancia
- `strCopri()` js/coach/programma/struttura-pro.js:72 funzione window ← js/coach/programma/ricette.js:592 buildProgram
- `strBilancia()` js/coach/programma/struttura-pro.js:118 funzione window ← js/coach/programma/ricette.js:643 buildProgram
- `STR_NOTA_TIRATE` js/coach/programma/struttura-pro.js:151 costante ← nessun altro file — nel file: strBilancia
- `strFinale()` js/coach/programma/struttura-pro.js:156 funzione window ← js/coach/programma/ricette.js:697 buildProgram
- `strAntagonisti()` js/coach/programma/struttura-pro.js:174 funzione ← nessun altro file — nel file: strSuperserie
- `strPuoSuperserie()` js/coach/programma/struttura-pro.js:182 funzione ← nessun altro file — nel file: strSuperserie
- `strSuperserie()` js/coach/programma/struttura-pro.js:184 funzione window ← js/coach/programma/ricette.js:717 buildProgram · js/coach/compone.js:75 TOCCHI

## js/ui

### `js/ui/onboarding-risultato.js`

- `renderOnbResult()` js/ui/onboarding-risultato.js:5 funzione ← js/ui/onboarding.js:368 renderOnb

## js/coach

### `js/coach/programma/archivio.js`

- `progKey()` js/coach/programma/archivio.js:5 funzione ← js/coach/programma/alternative.js:90 applyGeneratedProgram · js/ui/guida-interattiva.js:357 revocaConsenso · tests/aiuto-app.js:102 caricaApp (html) · tests/browser/intensita-bia.js:94, 118 · tests/browser/regole-nuove.js:15, 27 — nel file: getProgramma
- `biaKey()` js/coach/programma/archivio.js:6 funzione ← js/coach/bia/opzioni.js:90 eliminaBia · js/ui/guida-interattiva.js:356 revocaConsenso — nel file: getBiaStorico, aggiungiBia
- `getProgramma()` js/coach/programma/archivio.js:7 funzione window ← js/ui/onboarding-risultato.js ×1 · js/ui/statistiche.js ×1 · js/ui/statistiche-grafico.js ×2 · js/coach/carichi/progressivo.js ×3 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×8 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×2 · js/ui/opzioni/il-coach.js ×1 · js/coach/esigenza.js ×4 · js/coach/psicologia.js ×1 · tests/intensita-onda0.test.js ×2 · tests/migrazione-v1.test.js ×3 · tests/sicurezza-onda0.test.js ×1
- `getBiaStorico()` js/coach/programma/archivio.js:8 funzione window ← js/coach/carichi/progressivo.js:107 frenoBia · js/coach/carichi/partenza.js:39 contestoCarichi · js/coach/repertorio.js:28 pesoCorporeo, 299 corpoCoach · js/coach/intensita.js:50 statoBia · js/coach/agente-consigli.js:87 consigliAgente, 200 renderAgent · js/coach/bia/opzioni.js:63 renderBiaSheet, 88 eliminaBia · js/ui/progressi/peso.js:10 pesiTutti · js/coach/compone.js:22 fattoreFisico · js/coach/psicologia.js:136 renderSettings — nel file: aggiungiBia
- `aggiungiBia()` js/coach/programma/archivio.js:9 funzione window ← js/coach/programma/alternative.js:109 applyGeneratedProgram · js/coach/bia/opzioni.js:79 salvaBiaLetta, 92 eliminaBia, 130 salvaBiaAgente

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
- `applyGeneratedProgram()` js/coach/programma/alternative.js:57 funzione window ← js/ui/onboarding.js:190 onbNext · js/coach/repertorio.js:528 nuovoCiclo

## js/ui

### `js/ui/statistiche.js`

- `APP_VERSIONE` js/ui/statistiche.js:12 costante ← js/core/backup.js:22 esportaBackup · js/coach/psicologia.js:184 renderSettings
- `DISCHI_KEY` js/ui/statistiche.js:13 costante ← js/ui/allenamento/seduta.js:213 renderAllenamento · js/ui/opzioni/impostazioni.js:58 toggleSetting · js/coach/psicologia.js:160 renderSettings
- `NOME_KEY` js/ui/statistiche.js:14 costante ← nessun altro file — nel file: getNome, salvaNome
- `cercaAggiornamento()` js/ui/statistiche.js:17 funzione window ← js/coach/psicologia.js:179 renderSettings (html)
- `getNome()` js/ui/statistiche.js:31 funzione window ← js/ui/oggi.js:66 renderOggi · js/coach/psicologia.js:130 renderSettings, 216 renderSetPage — nel file: renderStats
- `salvaNome()` js/ui/statistiche.js:32 funzione window ← js/coach/psicologia.js:217 renderSetPage (html)
- `statsPeriodo` js/ui/statistiche.js:34 variabile ← nessun altro file — nel file: setStatsPeriodo, openStats, renderStats
- `dataSessione()` js/ui/statistiche.js:36 funzione ← js/ui/oggi.js ×3 · js/ui/allenamento/termina-e-cardio.js ×4 · js/ui/storico.js ×3 · js/ui/statistiche-grafico.js ×1 · js/coach/carichi/progressivo.js ×2 · js/coach/repertorio.js ×7 · js/coach/regole-ricerca.js ×2 · js/coach/regole-nuove.js ×1 · js/coach/agente-consigli.js ×3 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×5 · js/ui/seduta-libera.js ×1 · js/ui/progressi/riepilogo.js ×3 · js/coach/metodi-momenti.js ×1 · js/coach/stato.js ×1 · js/coach/esigenza.js ×1 · js/coach/psicologia.js ×1 · js/ui/scheda-quattro-sezioni.js ×1 · js/coach/coach-ia.js ×4 — nel file: calcolaStatistiche, blocchiQuattroSettimane, calcolaBlocco
- `pesoSessione()` js/ui/statistiche.js:42 funzione ← nessun altro file — nel file: calcolaStatistiche, calcolaBlocco
- `inizioPeriodo()` js/ui/statistiche.js:54 funzione window ← js/ui/statistiche-grafico.js:21 frequenzaSettimanale — nel file: calcolaStatistiche
- `calcolaStatistiche()` js/ui/statistiche.js:60 funzione window ← tests/browser/statistiche.js:46 — nel file: renderStats
- `tutteLeSedute()` js/ui/statistiche.js:118 funzione window ← js/ui/allenamento/termina-e-cardio.js:69 minutiCardioSettimana, 79 renderCardioStat · js/ui/storico.js:80 renderProgressiTop · js/ui/statistiche-grafico.js:19 frequenzaSettimanale · js/coach/repertorio.js:46 livelloStandardForza, 81 livelloStimato · js/ui/progressi/riepilogo.js:45 faticaMuscoli, 79 renderAnno, 105 annoRiassunto · js/coach/metodi-momenti.js:210 htmlMomento · js/coach/stato.js:29 htmlMomentoBreve · js/coach/esigenza.js:50 aggiornaEsigenza · js/coach/psicologia.js:109 htmlPrimiPassi · js/ui/scheda-quattro-sezioni.js:22 seduteEsercizio — nel file: calcolaStatistiche, blocchiQuattroSettimane, calcolaBlocco
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

- `arrotonda()` js/coach/carichi/progressivo.js:18 funzione ← js/coach/prontezza.js:68 applicaProntezza · js/coach/dolore-mattina.js:68 caricoProssimo · js/coach/regole-ricerca.js:227 caricoProssimoBase, 396 applicaCaricoProgressivo · js/dati/schede-tecniche.js:12 TECNICA (html)
- `incrementoPer()` js/coach/carichi/progressivo.js:20 funzione ← js/coach/dolore-mattina.js:75 caricoProssimo · js/coach/regole-ricerca.js:291 caricoProssimoBase · js/dati/scheda-unica.js:26 schedaUnica
- `faseSedutaSalvata()` js/coach/carichi/progressivo.js:30 funzione ← nessun altro file — nel file: esercizioInScarico
- `esercizioInScarico()` js/coach/carichi/progressivo.js:42 funzione ← js/coach/dolore-mattina.js:67 caricoProssimo · js/coach/regole-ricerca.js:173 inScarico, 183 sessioniConData — nel file: sedutePerEsercizio
- `sedutePerEsercizio()` js/coach/carichi/progressivo.js:49 funzione ← js/coach/dolore-mattina.js:66 caricoProssimo — nel file: ultimeSessioni, caricoRiferimento
- `ultimeSessioni()` js/coach/carichi/progressivo.js:61 funzione ← js/coach/catalogo-regole.js:114 COACH_REGOLE (html) · js/ui/allenamento/seduta.js:19 ultimaVoltaTesto · js/ui/allenamento/macchinario-occupato.js:168 sostituisciOggi · js/coach/regole-ricerca.js:217 caricoProssimoBase · js/coach/regole-nuove.js:52 mancavaSoloUltimaSerie · js/coach/intensita.js:83 rirExtraIntensita · tests/carichi-onda0.test.js:367 (html), 374 (html) — nel file: pesoUltimoDi
- `GIORNI_CARICO_RIFERIMENTO` js/coach/carichi/progressivo.js:66 costante ← nessun altro file — nel file: caricoRiferimento
- `caricoRiferimento()` js/coach/carichi/progressivo.js:67 funzione ← js/coach/catalogo-regole.js:114 COACH_REGOLE (html) · js/coach/dolore-mattina.js:65 caricoProssimo · js/coach/regole-ricerca.js:194 ripresaDopoScarico, 247 caricoProssimoBase · tests/carichi-onda0.test.js:275 (html), 343 (html), 366 (html), 429 (html), 437 (html), 459 (html) · tests/intensita-onda0.test.js:238 (html)
- `pesoUltimoDi()` js/coach/carichi/progressivo.js:78 funzione ← js/coach/dolore-mattina.js:76 caricoProssimo · tests/carichi-onda0.test.js:382 (html)
- `esito()` js/coach/carichi/progressivo.js:87 funzione ← js/coach/regole-ricerca.js:222 caricoProssimoBase
- `settimanaProgramma()` js/coach/carichi/progressivo.js:96 funzione window ← js/ui/piano/giorno.js:122 aggiornaIngressoAgente · js/ui/allenamento/termina-e-cardio.js:156 endWorkout · js/ui/onboarding-risultato.js:65 renderOnbResult · js/coach/repertorio.js:194 bloccoCorrente, 271 azioniCoach, 491 htmlFineCiclo · js/coach/regole-ricerca.js:84 pisoRirEsigenza, 106 rirBersaglioBase, 194 ripresaDopoScarico, 212 caricoProssimoBase, 403 applicaCaricoProgressivo · js/coach/regole-nuove.js:40 settimanaCentraleBlocco, 90 limitaTecnicheIntense · js/coach/agente-consigli.js:89 consigliAgente, 135 renderAgent · js/coach/stato.js:13 renderPianoCoach · js/coach/psicologia.js:131 renderSettings · js/coach/coach-ia.js:84 contestoSeduta · tests/migrazione-v1.test.js:86 (html) · tests/sicurezza-onda0.test.js:324 (html)
- `frenoBia()` js/coach/carichi/progressivo.js:106 funzione ← js/coach/regole-ricerca.js:239 caricoProssimoBase

### `js/coach/carichi/partenza.js`

- `PARAM_PARTENZA` js/coach/carichi/partenza.js:17 costante ← nessun altro file — nel file: contestoCarichi, scalaDaCorpo, stimaCaricoIniziale
- `MOTIVI_STIMA` js/coach/carichi/partenza.js:28 costante ← js/coach/regole-ricerca.js:391 applicaCaricoProgressivo — nel file: stimaCaricoIniziale
- `contestoCarichi()` js/coach/carichi/partenza.js:35 funzione ← js/coach/programma/ricette.js:788 buildProgram · tests/browser/carichi-evoluzione.js:66 · tests/browser/carichi-partenza.js:21 — nel file: pesoPartenza
- `scalaDaCorpo()` js/coach/carichi/partenza.js:55 funzione ← nessun altro file — nel file: stimaCaricoIniziale
- `scalaDaStorico()` js/coach/carichi/partenza.js:66 funzione ← js/coach/programma/ricette.js:789 buildProgram · tests/browser/carichi-evoluzione.js:73 — nel file: stimaCaricoIniziale
- `arrotondaPartenza()` js/coach/carichi/partenza.js:84 funzione ← js/coach/programma/ricette.js:806 buildProgram — nel file: stimaCaricoIniziale
- `stimaCaricoIniziale()` js/coach/carichi/partenza.js:94 funzione window ← js/coach/programma/ricette.js:792 buildProgram · tests/browser/carichi-evoluzione.js:69, 72 · tests/browser/carichi-partenza.js:22 — nel file: pesoPartenza
- `pesoPartenza()` js/coach/carichi/partenza.js:111 funzione ← js/ui/allenamento/macchinario-occupato.js:170 sostituisciOggi · js/ui/figura-anatomica.js:309 addLibraryExercise · js/coach/questionario-decisioni.js:250 applicaDecisioni · js/coach/repertorio.js:120 sostituisciNelPiano · js/ui/seduta-libera.js:125 eserciziDaNomi · tests/browser/carichi-partenza.js:28

### `js/coach/questionario-decisioni.js`

- `AGG_KEY()` js/coach/questionario-decisioni.js:28 funzione ← js/coach/repertorio.js:139 conAnnulla · tests/aiuto-app.js:103 caricaApp (html) · tests/migrazione-v1.test.js:176 (html) · tests/sicurezza-onda0.test.js:148 (html) — nel file: aggiustiCoach, salvaAggiusti, applicaDecisioni
- `aggiustiCoach()` js/coach/questionario-decisioni.js:29 funzione window ← js/coach/prontezza.js:82 applicaProntezza · js/coach/repertorio.js:155 azioneCoach, 272 azioniCoach, 420 htmlAderenza, 430 rispostaAderenza · js/coach/dolore-mattina.js:12 controlloDoloreDaFare, 26 rispostaDolore, 43 consumaAggiusti, 60 caricoProssimo · js/coach/regole-ricerca.js:294 caricoProssimoBase, 415 imparaDallaSeduta · tests/intensita-onda0.test.js:330 (html), 336 (html) · tests/migrazione-v1.test.js:157 (html), 166 (html) · tests/sicurezza-onda0.test.js:166 (html) — nel file: applicaDecisioni
- `salvaAggiusti()` js/coach/questionario-decisioni.js:33 funzione ← js/coach/prontezza.js:83 applicaProntezza · js/coach/repertorio.js:155 azioneCoach, 430 rispostaAderenza · js/coach/dolore-mattina.js:37 rispostaDolore, 49 consumaAggiusti · js/coach/regole-ricerca.js:427 imparaDallaSeduta — nel file: applicaDecisioni
- `ZONE_DOLORE` js/coach/questionario-decisioni.js:35 costante ← js/coach/dolore-mattina.js:19 htmlControlloDolore — nel file: renderQuestionario, decisioniCoach
- `ZONA_ART` js/coach/questionario-decisioni.js:40 costante ← nessun altro file — nel file: zonaA, zonaIl
- `zonaA()` js/coach/questionario-decisioni.js:41 funzione ← nessun altro file — nel file: decisioniCoach
- `zonaIl()` js/coach/questionario-decisioni.js:42 funzione ← nessun altro file — nel file: decisioniCoach
- `STRESS_ZONA` js/coach/questionario-decisioni.js:45 costante ← nessun altro file — nel file: varianteStessoMuscolo, fbZona, decisioniCoach
- `senzaEmoji()` js/coach/questionario-decisioni.js:54 funzione ← js/lingue/traduttore.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/piano/aggiungi-allenamento.js ×1 · js/coach/programma/motore.js ×4 · js/coach/programma/schemi.js ×2 · js/coach/programma/ricette.js ×26 · js/coach/programma/struttura-pro.js ×4 · js/ui/onboarding-risultato.js ×1 · js/coach/repertorio.js ×3 · js/coach/regole-ricerca.js ×2 · js/coach/agente-consigli.js ×1 · js/ui/opzioni/il-coach.js ×1 · js/ui/importa-csv.js ×1 · js/ui/importa-progressi.js ×4 · js/ui/seduta-libera.js ×4 · js/ui/progressi/riepilogo.js ×1 · js/ui/stampa-scheda.js ×1 · js/coach/biomeccanica.js ×4 · js/ui/scheda-quattro-sezioni.js ×3 · js/dati/schede-tecniche.js ×5 — nel file: nomeInLibreria, varianteStessoMuscolo, fbZona, renderQuestionario, decisioniCoach, applicaDecisioni
- `nomeInLibreria()` js/coach/questionario-decisioni.js:55 funzione ← js/coach/programma/schemi.js:59 libNome · js/coach/programma/ricette.js:192 rinforzaFemorali, 403 buildProgram · js/coach/programma/struttura-pro.js:79 strCopri · js/coach/regole-ricerca.js:59 tipoCarico · js/ui/guida-interattiva.js:58 guidaDatiDemo · js/ui/importa-csv.js:155 nomeDaEstero · js/coach/biomeccanica.js:24 cueEsercizio, 43 stabile · js/coach/psicologia.js:119 sedutaPianoB
- `REGIONE_RISCHIO_DOLORE` js/coach/questionario-decisioni.js:64 costante ← nessun altro file — nel file: varianteStessoMuscolo
- `varianteStessoMuscolo()` js/coach/questionario-decisioni.js:65 funzione ← nessun altro file — nel file: decisioniCoach
- `eserciziDeiGiorniCon()` js/coach/questionario-decisioni.js:84 funzione ← nessun altro file — nel file: decisioniCoach
- `PARAM_FATICA_SEDUTA` js/coach/questionario-decisioni.js:89 costante ← nessun altro file — nel file: sedutaPesante, renderQuestionario, decisioniCoach
- `NOTA_AMPIEZZA_SENZA_DOLORE` js/coach/questionario-decisioni.js:91 costante ← nessun altro file — nel file: decisioniCoach
- `sedutaPesante()` js/coach/questionario-decisioni.js:92 funzione ← nessun altro file — nel file: decisioniCoach
- `fbState` js/coach/questionario-decisioni.js:94 variabile ← nessun altro file — nel file: apriQuestionario, fbSet, fbZona, fbEsercizio, fbLivello, fbScelta, renderQuestionario, chiudiQuestionario, …
- `apriQuestionario()` js/coach/questionario-decisioni.js:95 funzione window ← js/ui/allenamento/termina-e-cardio.js:198 endWorkout · tests/sicurezza-onda0.test.js:58 (html)
- `fbSet()` js/coach/questionario-decisioni.js:105 funzione window ← nessun altro file — nel file: fbScelta
- `fbZona()` js/coach/questionario-decisioni.js:110 funzione window ← nessun altro file — nel file: renderQuestionario
- `fbEsercizio()` js/coach/questionario-decisioni.js:119 funzione window ← nessun altro file — nel file: renderQuestionario
- `fbLivello()` js/coach/questionario-decisioni.js:125 funzione window ← nessun altro file — nel file: renderQuestionario
- `etichettaDolore()` js/coach/questionario-decisioni.js:126 funzione ← nessun altro file — nel file: fbLivello, renderQuestionario
- `fbScelta()` js/coach/questionario-decisioni.js:128 funzione ← nessun altro file — nel file: renderQuestionario
- `renderQuestionario()` js/coach/questionario-decisioni.js:133 funzione ← nessun altro file — nel file: apriQuestionario, fbSet, fbZona, fbEsercizio
- `chiudiQuestionario()` js/coach/questionario-decisioni.js:159 funzione window ← index.html:336 (html), 342 (html) — nel file: inviaQuestionario
- `decisioniCoach()` js/coach/questionario-decisioni.js:166 funzione window ← tests/migrazione-v1.test.js:178 (html), 180 (html) · tests/sicurezza-onda0.test.js:21 decidi (html), 145 (html), 160 (html) — nel file: inviaQuestionario
- `applicaDecisioni()` js/coach/questionario-decisioni.js:224 funzione ← tests/migrazione-v1.test.js:181 (html) · tests/sicurezza-onda0.test.js:151 (html), 165 (html) — nel file: inviaQuestionario
- `riduciFrequenza()` js/coach/questionario-decisioni.js:274 funzione window ← js/coach/repertorio.js:438 rispostaAderenza — nel file: inviaQuestionario
- `inviaQuestionario()` js/coach/questionario-decisioni.js:285 funzione window ← nessun altro file — nel file: apriQuestionario
- `__fbAnnulla()` js/coach/questionario-decisioni.js:302 funzione window ← nessun altro file

### `js/coach/prontezza.js`

- `PRONTEZZA_KEY()` js/coach/prontezza.js:15 funzione ← js/ui/allenamento/termina-e-cardio.js:200 endWorkout — nel file: leggiProntezza, saltaProntezza, applicaProntezza
- `PRONTEZZA_VOCI` js/coach/prontezza.js:16 costante ← nessun altro file — nel file: vociProntezza
- `VOCE_CICLO` js/coach/prontezza.js:23 costante ← nessun altro file — nel file: vociProntezza
- `vociProntezza()` js/coach/prontezza.js:24 funzione ← nessun altro file — nel file: punteggioProntezza, renderProntezza, sceltaProntezza
- `prontezzaStato` js/coach/prontezza.js:25 variabile ← nessun altro file — nel file: renderProntezza, sceltaProntezza, saltaProntezza, applicaProntezza
- `leggiProntezza()` js/coach/prontezza.js:26 funzione ← nessun altro file — nel file: prontezzaOggi, renderProntezza
- `prontezzaOggi()` js/coach/prontezza.js:27 funzione ← js/ui/allenamento/termina-e-cardio.js:118 endWorkout · js/coach/regole-nuove.js:91 limitaTecnicheIntense
- `punteggioProntezza()` js/coach/prontezza.js:31 funzione ← nessun altro file — nel file: applicaProntezza
- `renderProntezza()` js/coach/prontezza.js:36 funzione ← js/ui/allenamento/sessione.js:93 openWorkoutDay — nel file: sceltaProntezza, saltaProntezza, applicaProntezza
- `sceltaProntezza()` js/coach/prontezza.js:49 funzione window ← nessun altro file — nel file: renderProntezza
- `saltaProntezza()` js/coach/prontezza.js:54 funzione window ← nessun altro file — nel file: renderProntezza
- `applicaProntezza()` js/coach/prontezza.js:59 funzione window (riassegnato anche in js/coach/regole-nuove.js:109) ← js/coach/regole-nuove.js:108 _applicaProntezzaPrima · tests/intensita-onda0.test.js:366 (html) — nel file: sceltaProntezza

### `js/coach/mi-sento-male.js`

- `apriMiSentoMale()` js/coach/mi-sento-male.js:9 funzione window ← index.html:194 (html)
- `chiudiMiSentoMale()` js/coach/mi-sento-male.js:14 funzione window ← index.html:796 (html), 809 (html) — nel file: chiudiSedutaInterrotta
- `chiudiSedutaInterrotta()` js/coach/mi-sento-male.js:15 funzione window ← index.html:808 (html)
- `minutiSeduta()` js/coach/mi-sento-male.js:22 funzione ← js/ui/allenamento/termina-e-cardio.js:117 endWorkout

### `js/coach/repertorio.js`

- `STANDARD_FORZA` js/coach/repertorio.js:21 costante ← nessun altro file — nel file: livelloStandardForza
- `ALZATE_BASE` js/coach/repertorio.js:25 costante ← nessun altro file — nel file: livelloStandardForza
- `pesoCorporeo()` js/coach/repertorio.js:26 funzione ← nessun altro file — nel file: livelloStandardForza, corpoCoach
- `STD_SOGLIA_INTERMEDIO` js/coach/repertorio.js:36 costante ← nessun altro file — nel file: proposteLivello
- `STD_SOGLIA_AVANZATO` js/coach/repertorio.js:36 costante ← nessun altro file — nel file: proposteLivello
- `STD_MINIMO_ALZATE` js/coach/repertorio.js:36 costante ← nessun altro file — nel file: proposteLivello
- `COACH_GIORNI_REVISIONE_LIVELLO` js/coach/repertorio.js:37 costante ← nessun altro file — nel file: azioniCoach
- `livelloStandardForza()` js/coach/repertorio.js:38 funzione ← nessun altro file — nel file: proposteLivello
- `proposteLivello()` js/coach/repertorio.js:61 funzione ← nessun altro file — nel file: livelloStimato
- `livelloStimato()` js/coach/repertorio.js:80 funzione window ← js/ui/opzioni/il-coach.js:12 paginaCoach · tests/intensita-onda0.test.js:390 (html), 403 (html), 404 (html), 410 (html), 414 (html), 439 (html), … · tests/migrazione-v1.test.js:192 (html) — nel file: azioneCoach, azioniCoach, nuovoCiclo
- `prefsCoach()` js/coach/repertorio.js:108 funzione ← js/coach/questionario-decisioni.js:172 decisioniCoach · js/dati/schede-tecniche.js:95 preferisci — nel file: azioneCoach
- `sostituisciNelPiano()` js/coach/repertorio.js:113 funzione ← js/dati/schede-tecniche.js:97 preferisci — nel file: azioneCoach
- `cambiaSerieNelPiano()` js/coach/repertorio.js:126 funzione ← nessun altro file — nel file: azioneCoach
- `conAnnulla()` js/coach/repertorio.js:137 funzione ← js/dati/schede-tecniche.js:97 preferisci — nel file: azioneCoach, rispostaAderenza
- `azioneCoach()` js/coach/repertorio.js:145 funzione window ← tests/intensita-onda0.test.js:396 (html), 418 (html), 447 (html), 452 (html) — nel file: azioniCoach
- `bloccoCorrente()` js/coach/repertorio.js:194 funzione ← nessun altro file — nel file: azioneCoach, azioniCoach
- `eserciziFermi()` js/coach/repertorio.js:197 funzione ← tests/intensita-onda0.test.js:473 (html), 478 (html) · tests/migrazione-v1.test.js:194 (html) — nel file: azioniCoach
- `strainSettimane()` js/coach/repertorio.js:217 funzione ← tests/migrazione-v1.test.js:194 (html) — nel file: azioniCoach
- `scaricoRecente()` js/coach/repertorio.js:239 funzione ← nessun altro file — nel file: azioniCoach
- `controlloSchemi()` js/coach/repertorio.js:246 funzione ← js/coach/agente-consigli.js:167 renderAgent
- `azioniCoach()` js/coach/repertorio.js:258 funzione ← js/coach/agente-consigli.js:161 renderAgent · tests/intensita-onda0.test.js:394 (html), 405 (html), 442 (html), 443 (html), 453 (html), 456 (html), …
- `corpoCoach()` js/coach/repertorio.js:292 funzione ← js/coach/agente-consigli.js:173 renderAgent · tests/intensita-onda0.test.js:492 (html), 500 (html)
- `sedutaSaltata()` js/coach/repertorio.js:330 funzione ← nessun altro file — nel file: htmlSedutaSaltata
- `prossimoGiornoLibero()` js/coach/repertorio.js:341 funzione ← nessun altro file — nel file: htmlSedutaSaltata, sceltaSaltata
- `htmlSedutaSaltata()` js/coach/repertorio.js:349 funzione ← js/ui/oggi.js:92 renderOggi
- `sceltaSaltata()` js/coach/repertorio.js:366 funzione window ← nessun altro file — nel file: htmlSedutaSaltata
- `aderenzaDueSettimane()` js/coach/repertorio.js:407 funzione ← nessun altro file — nel file: htmlAderenza
- `htmlAderenza()` js/coach/repertorio.js:417 funzione ← js/ui/oggi.js:92 renderOggi
- `rispostaAderenza()` js/coach/repertorio.js:429 funzione window ← nessun altro file — nel file: htmlAderenza
- `htmlOrario()` js/coach/repertorio.js:447 funzione ← js/ui/oggi.js:93 renderOggi
- `verdettoCiclo()` js/coach/repertorio.js:457 funzione ← tests/intensita-onda0.test.js:183 (html), 197 (html) · tests/migrazione-v1.test.js:190 (html) — nel file: htmlFineCiclo, nuovoCiclo
- `htmlFineCiclo()` js/coach/repertorio.js:490 funzione ← js/ui/oggi.js:92 renderOggi
- `nuovoCiclo()` js/coach/repertorio.js:502 funzione window ← js/ui/opzioni/il-coach.js:61 paginaCoach (html) · tests/intensita-onda0.test.js:423 (html) · tests/migrazione-v1.test.js:201 (html) — nel file: htmlFineCiclo

### `js/coach/dolore-mattina.js`

- `controlloDoloreDaFare()` js/coach/dolore-mattina.js:10 funzione ← nessun altro file — nel file: htmlControlloDolore
- `htmlControlloDolore()` js/coach/dolore-mattina.js:16 funzione ← js/ui/oggi.js:92 renderOggi
- `rispostaDolore()` js/coach/dolore-mattina.js:25 funzione window ← nessun altro file — nel file: htmlControlloDolore
- `consumaAggiusti()` js/coach/dolore-mattina.js:42 funzione ← js/ui/allenamento/termina-e-cardio.js:197 endWorkout
- `RIR_MIN_DOLORE` js/coach/dolore-mattina.js:53 costante ← nessun altro file — nel file: caricoProssimo
- `caricoProssimo()` js/coach/dolore-mattina.js:57 funzione window (riassegnato anche in js/coach/regole-nuove.js:59, js/coach/intensita.js:90) ← js/ui/oggi.js:112 renderOggi · js/coach/regole-ricerca.js:385 applicaCaricoProgressivo · js/coach/regole-nuove.js:58 _caricoProssimoPrima · js/coach/intensita.js:89 _caricoProssimoPrimaInt · js/coach/agente-consigli.js:184 renderAgent · tests/browser/carichi-evoluzione.js:32, 35, 38, 41, 44, 48 · tests/browser/intensita-bia.js:51, 52, 53, 54, 55 · tests/browser/regole-nuove.js:19, 20, 21, 22, 23, 24, …

### `js/coach/regole-ricerca.js`

- `TECNICHE` js/coach/regole-ricerca.js:36 costante ← js/ui/allenamento/seduta.js:175 renderAllenamento · js/ui/opzioni/il-coach.js:59 paginaCoach · tests/browser/metodi-epoca-oro.js:22, 34, 36
- `profiloCoach()` js/coach/regole-ricerca.js:52 funzione ← js/coach/repertorio.js:63 proposteLivello, 198 eserciziFermi · js/coach/regole-nuove.js:34 rientroPiano, 62 caricoProssimo · js/coach/agente-consigli.js:31 consigliCoach2 — nel file: pisoRirEsigenza, rirBersaglioBase, caricoProssimoBase, applicaCaricoProgressivo
- `BIL_PESANTI` js/coach/regole-ricerca.js:57 costante ← nessun altro file — nel file: tipoCarico
- `tipoCarico()` js/coach/regole-ricerca.js:58 funzione ← js/coach/programma/ricette.js:82 adattoAlCincoPerCinque, 121 stimaMinutiSeduta, 233 riempiTempo, 364 buildProgram · js/coach/programma/struttura-pro.js:37 strRango, 138 strBilancia, 163 strFinale, 182 strPuoSuperserie · js/coach/repertorio.js:92 livelloStimato, 162 azioneCoach, 267 azioniCoach, 434 rispostaAderenza, 521 nuovoCiclo · js/coach/metodi-momenti.js:76 METODI · js/coach/compone.js:72 TOCCHI · js/dati/schede-tecniche.js:69 pausaConsigliata, 76 preferenzaEsercizio · js/dati/scheda-unica.js:26 schedaUnica · tests/browser/coerenza-schede.js:49, 53, 54 · tests/browser/metodi-epoca-oro.js:59 — nel file: rirBersaglio, rirBersaglioBase, caricoProssimoBase, applicaCaricoProgressivo
- `RIR_TIPO` js/coach/regole-ricerca.js:63 costante ← nessun altro file — nel file: rirBersaglioBase
- `MES_RIR` js/coach/regole-ricerca.js:68 costante ← nessun altro file — nel file: pisoRirEsigenza, rirBersaglioBase
- `primaSettimanaBlocco()` js/coach/regole-ricerca.js:70 funzione ← nessun altro file — nel file: pisoRirEsigenza, rirBersaglioBase
- `inDeficitCalorico()` js/coach/regole-ricerca.js:74 funzione ← nessun altro file — nel file: pisoRirEsigenza
- `pisoRirEsigenza()` js/coach/regole-ricerca.js:81 funzione ← nessun altro file — nel file: rirBersaglio
- `rirBersaglio()` js/coach/regole-ricerca.js:88 funzione ← js/ui/allenamento/termina-e-cardio.js:18 obiettivoSeduta · js/dati/schede-tecniche.js:75 preferenzaEsercizio · js/dati/scheda-unica.js:26 schedaUnica · tests/browser/intensita-bia.js:43, 45, 47, 49, 54 — nel file: rpeBersaglio, testoRir
- `rirBersaglioBase()` js/coach/regole-ricerca.js:103 funzione ← js/coach/catalogo-regole.js:189 COACH_REGOLE (html) — nel file: rirBersaglio
- `SOGLIA_SRPE_ALTA` js/coach/regole-ricerca.js:121 costante ← nessun altro file — nel file: livelloFatica
- `livelloFatica()` js/coach/regole-ricerca.js:123 funzione ← nessun altro file — nel file: caricoProssimoBase
- `DOSE_SCARICO` js/coach/regole-ricerca.js:133 costante ← nessun altro file — nel file: caricoProssimoBase
- `storicoProntezza()` js/coach/regole-ricerca.js:134 funzione ← js/coach/prontezza.js:78 applicaProntezza · js/coach/repertorio.js:261 azioniCoach · js/coach/agente-consigli.js:34 consigliCoach2 · js/coach/metodi-momenti.js:203 prontezzaBassaSettimana · js/coach/esigenza.js:70 aggiornaEsigenza — nel file: livelloFatica, caricoProssimoBase
- `rpeBersaglio()` js/coach/regole-ricerca.js:135 funzione ← js/coach/esigenza.js:30 rpeBersaglioSeduta · js/dati/scheda-unica.js:26 schedaUnica · tests/browser/intensita-bia.js:98 — nel file: caricoProssimoBase
- `testoRir()` js/coach/regole-ricerca.js:137 funzione ← js/coach/dolore-mattina.js:91 caricoProssimo
- `e1rmSerie()` js/coach/regole-ricerca.js:143 funzione ← nessun altro file — nel file: e1rmSeduta
- `e1rmSeduta()` js/coach/regole-ricerca.js:144 funzione ← js/coach/carichi/partenza.js:72 scalaDaStorico · js/coach/repertorio.js:48 livelloStandardForza, 201 eserciziFermi, 472 verdettoCiclo · js/coach/agente-consigli.js:50 consigliCoach2 — nel file: caricoProssimoBase
- `PARAM_ANALISI` js/coach/regole-ricerca.js:149 costante ← js/coach/repertorio.js:278 azioniCoach, 483 verdettoCiclo — nel file: caricoProssimoBase
- `faseDelGiorno()` js/coach/regole-ricerca.js:158 funzione ← js/coach/repertorio.js:233 strainSettimane, 241 scaricoRecente · js/coach/esigenza.js:57 aggiornaEsigenza
- `settimanaDellaSeduta()` js/coach/regole-ricerca.js:164 funzione ← js/coach/esigenza.js:34 rpeBersaglioSeduta
- `inScarico()` js/coach/regole-ricerca.js:172 funzione ← js/coach/repertorio.js:47 livelloStandardForza, 201 eserciziFermi, 233 strainSettimane, 242 scaricoRecente, 473 verdettoCiclo · js/coach/esigenza.js:57 aggiornaEsigenza
- `sessioniConData()` js/coach/regole-ricerca.js:177 funzione ← nessun altro file — nel file: ripresaDopoScarico, caricoProssimoBase
- `ripresaDopoScarico()` js/coach/regole-ricerca.js:191 funzione ← js/coach/intensita.js:84 rirExtraIntensita — nel file: testoRir
- `rientroDopoPausa()` js/coach/regole-ricerca.js:197 funzione ← nessun altro file — nel file: caricoProssimoBase
- `fmtKg()` js/coach/regole-ricerca.js:204 funzione ← nessun altro file — nel file: caricoProssimoBase
- `obiettivoForza()` js/coach/regole-ricerca.js:206 funzione ← nessun altro file — nel file: caricoProssimoBase
- `caricoProssimoBase()` js/coach/regole-ricerca.js:211 funzione ← js/coach/dolore-mattina.js:58 caricoProssimo
- `applicaCaricoProgressivo()` js/coach/regole-ricerca.js:376 funzione window (riassegnato anche in js/coach/regole-nuove.js:103) ← js/ui/allenamento/sessione.js:87 openWorkoutDay · js/coach/regole-nuove.js:102 _applicaCaricoPrima · tests/carichi-onda0.test.js:393 chiudiSeduta (html) · tests/intensita-onda0.test.js:348 (html) · tests/migrazione-v1.test.js:97 (html), 134 (html), 136 (html), 144 (html), 153 (html)
- `imparaDallaSeduta()` js/coach/regole-ricerca.js:414 funzione (riassegnato anche in js/coach/intensita.js:144) ← js/ui/allenamento/termina-e-cardio.js:169 endWorkout · js/coach/intensita.js:143 _imparaDallaSedutaPrimaInt, 144 · tests/intensita-onda0.test.js:330 (html), 335 (html)

### `js/coach/regole-nuove.js`

- `TECNICHE_INTENSE` js/coach/regole-nuove.js:16 costante ← tests/browser/metodi-epoca-oro.js:37 — nel file: limitaTecnicheIntense
- `sedutePassate()` js/coach/regole-nuove.js:18 funzione ← js/coach/intensita.js:104 sedutePrimeDelProgramma — nel file: giorniDallUltimaSeduta, prontezzaRecente
- `giorniDallUltimaSeduta()` js/coach/regole-nuove.js:23 funzione ← nessun altro file — nel file: rientroPiano
- `prontezzaRecente()` js/coach/regole-nuove.js:28 funzione ← nessun altro file — nel file: caricoProssimo
- `rientroPiano()` js/coach/regole-nuove.js:33 funzione ← nessun altro file — nel file: caricoProssimo
- `settimanaCentraleBlocco()` js/coach/regole-nuove.js:39 funzione ← nessun altro file — nel file: caricoProssimo
- `gruppoInPriorita()` js/coach/regole-nuove.js:46 funzione ← nessun altro file — nel file: caricoProssimo
- `mancavaSoloUltimaSerie()` js/coach/regole-nuove.js:51 funzione ← nessun altro file — nel file: caricoProssimo
- `_caricoProssimoPrima` js/coach/regole-nuove.js:58 costante ← nessun altro file — nel file: caricoProssimo
- `limitaTecnicheIntense()` js/coach/regole-nuove.js:86 funzione ← tests/browser/regole-nuove.js:38, 40 — nel file: applicaCaricoProgressivo, applicaProntezza
- `_applicaCaricoPrima` js/coach/regole-nuove.js:102 costante ← nessun altro file — nel file: applicaCaricoProgressivo
- `_applicaProntezzaPrima` js/coach/regole-nuove.js:108 costante ← nessun altro file — nel file: applicaProntezza

### `js/coach/intensita.js`

- `PARAM_INTENSITA` js/coach/intensita.js:23 costante ← nessun altro file — nel file: statoBia, esigenzaIniziale, rirExtraIntensita, bilancioPrimeSedute
- `FA_MEDIA` js/coach/intensita.js:36 costante ← nessun altro file — nel file: faRiferimento
- `faRiferimento()` js/coach/intensita.js:37 funzione ← nessun altro file — nel file: statoBia
- `_virg()` js/coach/intensita.js:43 funzione ← nessun altro file — nel file: statoBia
- `statoBia()` js/coach/intensita.js:46 funzione window ← js/coach/programma/ricette.js:750 buildProgram · js/ui/onboarding-risultato.js:48 renderOnbResult · tests/browser/intensita-bia.js:15 — nel file: esigenzaIniziale, rirExtraIntensita
- `esigenzaIniziale()` js/coach/intensita.js:74 funzione window ← js/coach/programma/ricette.js:603 buildProgram · js/coach/esigenza.js:39 esigenzaCoach, 46 aggiornaEsigenza, 90 segnaDoloreEsigenza, 98 htmlEsigenza · tests/intensita-onda0.test.js:54 (html), 55 (html), 56 (html) · tests/browser/intensita-bia.js:15 — nel file: bilancioPrimeSedute
- `rirExtraIntensita()` js/coach/intensita.js:80 funzione window ← js/coach/regole-ricerca.js:94 rirBersaglio
- `_caricoProssimoPrimaInt` js/coach/intensita.js:89 costante ← nessun altro file — nel file: caricoProssimo
- `sedutePrimeDelProgramma()` js/coach/intensita.js:101 funzione ← nessun altro file — nel file: bilancioPrimeSedute
- `bilancioPrimeSedute()` js/coach/intensita.js:106 funzione window ← tests/intensita-onda0.test.js:66 (html) · tests/migrazione-v1.test.js:194 (html) · tests/browser/intensita-bia.js:97, 108, 110, 112 — nel file: (primo livello)
- `_imparaDallaSedutaPrimaInt` js/coach/intensita.js:143 costante ← nessun altro file — nel file: (primo livello)

### `js/coach/agente-consigli.js`

- `deltaTesto()` js/coach/agente-consigli.js:11 funzione ← nessun altro file — nel file: renderAgent
- `consigliCoach2()` js/coach/agente-consigli.js:29 funzione ← nessun altro file — nel file: consigliAgente
- `consigliAgente()` js/coach/agente-consigli.js:83 funzione ← nessun altro file — nel file: renderAgent
- `openAgent()` js/coach/agente-consigli.js:121 funzione window ← index.html:51 (html)
- `closeAgent()` js/coach/agente-consigli.js:125 funzione window ← js/coach/repertorio.js:532 nuovoCiclo · index.html:432 (html) — nel file: renderAgent
- `renderAgent()` js/coach/agente-consigli.js:127 funzione window ← js/coach/repertorio.js:142 conAnnulla, 168 azioneCoach · js/coach/bia/opzioni.js:132 salvaBiaAgente — nel file: openAgent

### `js/coach/bia/opzioni.js`

- `biaLetta` js/coach/bia/opzioni.js:10 variabile ← nessun altro file — nel file: closeBiaSheet, renderBiaSheet, salvaBiaLetta, agentBiaPdf
- `openBiaSheet()` js/coach/bia/opzioni.js:12 funzione window ← js/coach/agente-consigli.js:216 renderAgent (html) · js/coach/psicologia.js:152 renderSettings (html)
- `closeBiaSheet()` js/coach/bia/opzioni.js:17 funzione window ← index.html:424 (html) — nel file: renderBiaSheet
- `rigaBia()` js/coach/bia/opzioni.js:23 funzione ← nessun altro file — nel file: renderBiaSheet
- `renderBiaSheet()` js/coach/bia/opzioni.js:28 funzione ← nessun altro file — nel file: openBiaSheet, salvaBiaLetta, eliminaBia, agentBiaPdf, salvaBiaAgente
- `toggleBiaManuale()` js/coach/bia/opzioni.js:72 funzione window ← nessun altro file — nel file: renderBiaSheet
- `salvaBiaLetta()` js/coach/bia/opzioni.js:77 funzione window ← nessun altro file — nel file: renderBiaSheet
- `eliminaBia()` js/coach/bia/opzioni.js:87 funzione window ← nessun altro file — nel file: renderBiaSheet
- `agentBiaPdf()` js/coach/bia/opzioni.js:95 funzione window ← nessun altro file — nel file: renderBiaSheet
- `compilaBiaAgente()` js/coach/bia/opzioni.js:118 funzione window ← nessun altro file
- `salvaBiaAgente()` js/coach/bia/opzioni.js:125 funzione window ← nessun altro file — nel file: renderBiaSheet
- `restartOnboarding()` js/coach/bia/opzioni.js:136 funzione window ← js/coach/agente-consigli.js:152 renderAgent (html) · js/coach/psicologia.js:223 renderSetPage (html) · index.html:82 (html)
- `getProfile()` js/coach/bia/opzioni.js:146 funzione window ← js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/onboarding.js ×8 · js/coach/programma/ricette.js ×2 · js/coach/programma/alternative.js ×13 · js/coach/carichi/partenza.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×10 · js/coach/regole-ricerca.js ×4 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×3 · js/coach/agente-consigli.js ×1 · js/ui/opzioni/il-coach.js ×4 · js/ui/seduta-libera.js ×2 · js/ui/progressi/peso.js ×2 · js/ui/stampa-scheda.js ×1 · js/coach/metodi-momenti.js ×7 · js/coach/compone.js ×1 · js/coach/stato.js ×2 · js/coach/biomeccanica.js ×3 · js/coach/esigenza.js ×4 · js/coach/psicologia.js ×4 · js/dati/schede-tecniche.js ×2 · js/coach/coach-ia.js ×1 · tests/intensita-onda0.test.js ×13 · tests/migrazione-v1.test.js ×3 · tests/browser/intensita-bia.js ×3

## js/core

### `js/core/consenso.js`

- `CONSENT_KEY` js/core/consenso.js:10 costante ← js/ui/guida-interattiva.js:337 setConsenso · js/coach/psicologia.js:258 renderSetPage — nel file: consenso
- `CONSENT_VERSION` js/core/consenso.js:11 costante ← js/ui/guida-interattiva.js:339 setConsenso
- `consenso()` js/core/consenso.js:13 funzione window ← nessun altro file — nel file: coachAttivo, chiediConsensoSeServe
- `coachAttivo()` js/core/consenso.js:16 funzione window ← js/core/modalita.js ×1 · js/ui/oggi.js ×1 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/seduta.js ×2 · js/ui/allenamento/macchinario-occupato.js ×1 · js/ui/allenamento/termina-e-cardio.js ×3 · js/ui/onboarding.js ×1 · js/coach/programma/ricette.js ×1 · js/coach/carichi/partenza.js ×1 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×5 · js/coach/dolore-mattina.js ×1 · js/coach/regole-ricerca.js ×2 · js/coach/regole-nuove.js ×1 · js/coach/intensita.js ×2 · js/coach/agente-consigli.js ×1 · js/coach/bia/opzioni.js ×2 · js/coach/metodi-momenti.js ×1 · js/coach/stato.js ×2 · js/coach/esigenza.js ×1 · js/coach/psicologia.js ×11 · js/dati/schede-tecniche.js ×1 · js/coach/coach-ia.js ×2 · tests/migrazione-v1.test.js ×2
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
- `avviaGuida()` js/ui/guida-interattiva.js:128 funzione window ← js/coach/psicologia.js:178 renderSettings (html) · tests/browser/guida-tocchi.js:20 · tests/browser/guida.js:11 — nel file: offriGuida
- `offriGuida()` js/ui/guida-interattiva.js:136 funzione window ← js/core/modalita.js:15 chooseMode · js/ui/onboarding.js:176 onbSkipAll · js/coach/programma/alternative.js:126 applyGeneratedProgram — nel file: setConsenso
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
- `setConsenso()` js/ui/guida-interattiva.js:335 funzione window ← js/coach/psicologia.js:267 renderSetPage (html) · index.html:751 (html), 752 (html) — nel file: revocaConsenso
- `revocaConsenso()` js/ui/guida-interattiva.js:349 funzione window ← js/coach/psicologia.js:266 renderSetPage (html)
- `INFORMATIVA` js/ui/guida-interattiva.js:365 costante ← nessun altro file — nel file: renderInformativa
- `renderInformativa()` js/ui/guida-interattiva.js:366 funzione ← nessun altro file — nel file: openConsentText
- `openConsentText()` js/ui/guida-interattiva.js:367 funzione window ← js/coach/psicologia.js:175 renderSettings (html), 264 renderSetPage (html) · index.html:748 (html)
- `closeConsentText()` js/ui/guida-interattiva.js:368 funzione window ← index.html:758 (html)

### `js/ui/opzioni/impostazioni.js`

- `THEME_KEY` js/ui/opzioni/impostazioni.js:7 costante ← js/coach/psicologia.js:164 renderSettings, 244 renderSetPage — nel file: applyTheme, setTheme
- `SOUND_KEY` js/ui/opzioni/impostazioni.js:8 costante ← js/core/musica-altre-app.js:80 preparaAudio · js/ui/allenamento/timer-recupero.js:37 fineRecupero · js/ui/lavoro-cronometro.js:35 tickLavoro · js/coach/psicologia.js:140 renderSettings, 231 renderSetPage
- `COUNTDOWN_KEY` js/ui/opzioni/impostazioni.js:9 costante ← js/core/musica-altre-app.js:80 preparaAudio · js/ui/allenamento/timer-recupero.js:56 tickRecupero · js/coach/psicologia.js:232 renderSetPage
- `AUTOCLOSE_KEY` js/ui/opzioni/impostazioni.js:10 costante ← js/ui/allenamento/timer-recupero.js:40 fineRecupero · js/coach/psicologia.js:235 renderSetPage
- `BYPASS_KEY` js/ui/opzioni/impostazioni.js:11 costante ← js/core/musica-altre-app.js:29 avviaCanaleMultimediale · js/coach/psicologia.js:234 renderSetPage
- `FLASH_KEY` js/ui/opzioni/impostazioni.js:12 costante ← js/core/musica-altre-app.js:61 lampeggia · js/coach/psicologia.js:140 renderSettings, 233 renderSetPage
- `getSetting()` js/ui/opzioni/impostazioni.js:14 funzione window ← js/coach/psicologia.js:164 renderSettings, 244 renderSetPage — nel file: isOn, applyTheme
- `setSetting()` js/ui/opzioni/impostazioni.js:18 funzione window ← nessun altro file — nel file: setTheme, toggleSetting
- `isOn()` js/ui/opzioni/impostazioni.js:19 funzione window ← js/core/musica-altre-app.js:29 avviaCanaleMultimediale, 61 lampeggia, 80 preparaAudio · js/ui/allenamento/seduta.js:213 renderAllenamento · js/ui/allenamento/timer-recupero.js:37 fineRecupero, 56 tickRecupero · js/ui/opzioni/stile-iphone.js:45 setRowSwitch · js/core/schermo-acceso.js:9 tieniSchermoAcceso · js/ui/lavoro-cronometro.js:35 tickLavoro · js/coach/psicologia.js:140 renderSettings — nel file: applicaZoom, toggleSetting, toggleHtml
- `applyTheme()` js/ui/opzioni/impostazioni.js:21 funzione window ← js/core/modalita.js:27 activateMode · js/core/backup.js:61 ricaricaApp · js/coach/psicologia.js:293 switchProtocol · js/avvio.js:14 — nel file: setTheme
- `setTheme()` js/ui/opzioni/impostazioni.js:37 funzione window ← js/coach/psicologia.js:245 renderSetPage (html)
- `ZOOM_KEY` js/ui/opzioni/impostazioni.js:44 costante ← js/coach/psicologia.js:248 renderSetPage — nel file: applicaZoom, toggleSetting
- `applicaZoom()` js/ui/opzioni/impostazioni.js:45 funzione window ← nessun altro file — nel file: (primo livello), toggleSetting
- `openSettings()` js/ui/opzioni/impostazioni.js:53 funzione window ← nessun altro file
- `closeSettings()` js/ui/opzioni/impostazioni.js:54 funzione window ← nessun altro file
- `toggleSetting()` js/ui/opzioni/impostazioni.js:56 funzione window ← js/ui/opzioni/stile-iphone.js:46 setRowSwitch (html) — nel file: toggleHtml
- `segHtml()` js/ui/opzioni/impostazioni.js:64 funzione ← nessun altro file
- `toggleHtml()` js/ui/opzioni/impostazioni.js:70 funzione ← js/coach/psicologia.js:231 renderSetPage

### `js/ui/opzioni/stile-iphone.js`

- `SET_ICO` js/ui/opzioni/stile-iphone.js:10 costante ← nessun altro file — nel file: setIco
- `setIco()` js/ui/opzioni/stile-iphone.js:33 funzione ← js/coach/psicologia.js:157 renderSettings, 260 renderSetPage · js/coach/coach-ia.js:48 htmlPrivacyIA, 157 htmlCommentoIA — nel file: setRow, setRowSwitch
- `setRow()` js/ui/opzioni/stile-iphone.js:37 funzione ← js/coach/psicologia.js:151 renderSettings, 223 renderSetPage
- `setRowSwitch()` js/ui/opzioni/stile-iphone.js:44 funzione ← js/coach/psicologia.js:160 renderSettings, 248 renderSetPage
- `setGroup()` js/ui/opzioni/stile-iphone.js:49 funzione ← js/ui/opzioni/il-coach.js:14 paginaCoach · js/ui/seduta-libera.js:51 renderSedutaLibera · js/coach/psicologia.js:150 renderSettings, 215 renderSetPage · js/coach/coach-ia.js:47 htmlPrivacyIA

### `js/ui/opzioni/il-coach.js`

- `FASI_CORPO` js/ui/opzioni/il-coach.js:7 costante ← nessun altro file — nel file: paginaCoach
- `ATTREZZI_PALESTRA` js/ui/opzioni/il-coach.js:8 costante ← nessun altro file — nel file: paginaCoach, toggleCoachLista
- `chipCoach()` js/ui/opzioni/il-coach.js:9 funzione ← js/coach/biomeccanica.js:98 htmlTestFaiDaTe — nel file: paginaCoach
- `paginaCoach()` js/ui/opzioni/il-coach.js:10 funzione ← js/coach/psicologia.js:240 renderSetPage
- `toggleCoach()` js/ui/opzioni/il-coach.js:65 funzione ← nessun altro file — nel file: paginaCoach
- `setCoach()` js/ui/opzioni/il-coach.js:68 funzione window ← js/coach/catalogo-regole.js:184 COACH_REGOLE (html) — nel file: paginaCoach, toggleCoach
- `setFreqCoach()` js/ui/opzioni/il-coach.js:76 funzione window ← nessun altro file — nel file: paginaCoach
- `toggleCoachLista()` js/ui/opzioni/il-coach.js:82 funzione window ← nessun altro file — nel file: paginaCoach
- `togliPreferenza()` js/ui/opzioni/il-coach.js:93 funzione window ← nessun altro file — nel file: paginaCoach

### `js/ui/fogli.js`

- `foglioDati` js/ui/fogli.js:13 variabile ← js/core/backup.js:40 ripristinaBackup, 65 confermaRipristino · js/ui/importa-csv.js:219 importaCSV · js/ui/importa-progressi.js:161 mostraAnteprimaImport, 187 confermaImportProgressi, 209 confermaImport
- `apriFoglio()` js/ui/fogli.js:14 funzione ← js/core/backup.js:42 ripristinaBackup · js/ui/importa-csv.js:224 importaCSV · js/ui/importa-progressi.js:167 mostraAnteprimaImport · js/ui/seduta-libera.js:82 renderSedutaLibera · js/coach/compone.js:126 apriTuttiMetodi
- `chiudiFoglio()` js/ui/fogli.js:30 funzione window ← js/core/backup.js:69 confermaRipristino · js/ui/importa-progressi.js:199 confermaImportProgressi, 216 confermaImport · js/ui/seduta-libera.js:155 avviaSpeciale — nel file: apriFoglio
- `scegliFile()` js/ui/fogli.js:31 funzione ← js/core/backup.js:34 ripristinaBackup · js/ui/importa-csv.js:212 importaCSV
- `scaricaFile()` js/ui/fogli.js:44 funzione ← js/core/backup.js:23 esportaBackup · js/ui/stampa-scheda.js:30 condividiScheda, 52 stampaScheda
- `dataOra()` js/ui/fogli.js:58 funzione ← js/ui/allenamento/termina-e-cardio.js:149 endWorkout · js/ui/guida-interattiva.js:92 guidaDatiDemo · js/ui/importa-csv.js:205 sedutaImportata

## js/core

### `js/core/schermo-acceso.js`

- `WAKE_KEY` js/core/schermo-acceso.js:6 costante ← js/ui/opzioni/impostazioni.js:60 toggleSetting · js/coach/psicologia.js:236 renderSetPage — nel file: tieniSchermoAcceso
- `wakeLock` js/core/schermo-acceso.js:7 variabile ← nessun altro file — nel file: tieniSchermoAcceso
- `wakeVoluto` js/core/schermo-acceso.js:7 variabile ← nessun altro file — nel file: tieniSchermoAcceso, (primo livello)
- `tieniSchermoAcceso()` js/core/schermo-acceso.js:8 funzione window ← js/ui/allenamento/sessione.js:12 backToDayPicker, 91 openWorkoutDay · js/ui/opzioni/impostazioni.js:60 toggleSetting — nel file: (primo livello)
- `sedutaAperta()` js/core/schermo-acceso.js:19 funzione ← js/ui/opzioni/impostazioni.js:60 toggleSetting · js/ui/seduta-libera.js:11 sedutaPassataAttiva · js/ui/progressi/riepilogo.js:19 aggiornaProssima

### `js/core/backup.js`

- `CHIAVI_APP` js/core/backup.js:6 costante ← nessun altro file — nel file: chiaviApp, ripristinaBackup, applicaFotografia
- `CHIAVI_TEMPORANEE` js/core/backup.js:7 costante ← nessun altro file — nel file: chiaviApp, applicaFotografia
- `CHIAVI_NON_RIPRISTINABILI` js/core/backup.js:9 costante ← nessun altro file — nel file: applicaFotografia
- `valorePulito()` js/core/backup.js:11 funzione ← nessun altro file — nel file: applicaFotografia
- `chiaviApp()` js/core/backup.js:15 funzione ← nessun altro file — nel file: fotografia, applicaFotografia
- `fotografia()` js/core/backup.js:20 funzione ← tests/carichi-onda0.test.js:453 (html) — nel file: esportaBackup, ripristinaBackup, confermaRipristino
- `esportaBackup()` js/core/backup.js:21 funzione window ← js/coach/psicologia.js:167 renderSettings (html)
- `contaAllenamenti()` js/core/backup.js:28 funzione ← nessun altro file — nel file: ripristinaBackup
- `ripristinaBackup()` js/core/backup.js:33 funzione window ← js/coach/psicologia.js:168 renderSettings (html)
- `applicaFotografia()` js/core/backup.js:53 funzione ← tests/carichi-onda0.test.js:457 (html) · tests/browser/sicurezza.js:17 — nel file: confermaRipristino
- `ricaricaApp()` js/core/backup.js:57 funzione ← nessun altro file — nel file: confermaRipristino
- `confermaRipristino()` js/core/backup.js:64 funzione window ← nessun altro file — nel file: ripristinaBackup

## js/ui

### `js/ui/importa-csv.js`

- `leggiCSV()` js/ui/importa-csv.js:6 funzione ← nessun altro file — nel file: leggiExport
- `MESI_EN` js/ui/importa-csv.js:30 costante ← nessun altro file — nel file: dataDaCSV
- `dataDaCSV()` js/ui/importa-csv.js:31 funzione ← nessun altro file — nel file: leggiExport
- `numeroCSV()` js/ui/importa-csv.js:42 funzione ← nessun altro file — nel file: secondiCSV, leggiExport
- `secondiCSV()` js/ui/importa-csv.js:43 funzione ← nessun altro file — nel file: leggiExport
- `ALIAS_ESTERI` js/ui/importa-csv.js:50 costante ← nessun altro file — nel file: nomeDaEstero
- `nomeDaEstero()` js/ui/importa-csv.js:153 funzione ← js/ui/importa-progressi.js:36 riconosciEsercizio — nel file: leggiExport
- `leggiExport()` js/ui/importa-csv.js:160 funzione ← js/ui/importa-progressi.js:150 analizzaProgressi · tests/browser/sicurezza.js:29 — nel file: importaCSV
- `sedutaImportata()` js/ui/importa-csv.js:202 funzione ← js/ui/importa-progressi.js:189 confermaImportProgressi, 211 confermaImport · tests/browser/sicurezza.js:29
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
- `specialeAttiva()` js/ui/seduta-libera.js:7 funzione ← js/ui/allenamento/sessione.js:76 openWorkoutDay · js/ui/allenamento/termina-e-cardio.js:144 endWorkout — nel file: sedutaPassataAttiva, ripristinaSpeciale, avviaSpeciale, renderSpecialeBox, renderSeduteExtra
- `sedutaPassataAttiva()` js/ui/seduta-libera.js:11 funzione window ← js/ui/allenamento/timer-pannello.js:15 openRecoveryPanel
- `ripristinaSpeciale()` js/ui/seduta-libera.js:12 funzione ← js/ui/allenamento/termina-e-cardio.js:185 endWorkout — nel file: annullaSpeciale, avviaSpeciale
- `annullaSpeciale()` js/ui/seduta-libera.js:21 funzione window ← nessun altro file — nel file: renderSpecialeBox, renderSeduteExtra
- `liberaSel` js/ui/seduta-libera.js:26 variabile ← nessun altro file — nel file: apriSedutaLibera, renderSedutaLibera, htmlListaLibera, liberaToggle, liberaDaScelta
- `liberaTipo` js/ui/seduta-libera.js:26 variabile ← js/coach/repertorio.js:375 sceltaSaltata — nel file: apriSedutaLibera, renderSedutaLibera, liberaToggle, liberaDaScelta, avviaSpeciale
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
- `avviaSpeciale()` js/ui/seduta-libera.js:141 funzione ← js/coach/repertorio.js:376 sceltaSaltata — nel file: liberaDaScelta, liberaDaStorico, liberaDaGiorno
- `renderSpecialeBox()` js/ui/seduta-libera.js:159 funzione ← js/ui/allenamento/sessione.js:92 openWorkoutDay
- `renderSeduteExtra()` js/ui/seduta-libera.js:170 funzione ← js/ui/allenamento/sessione.js:30 renderWorkoutDayPicker
- `arrotondaCarico()` js/ui/seduta-libera.js:183 funzione ← nessun altro file — nel file: aggiungiExtra
- `aggiungiExtra()` js/ui/seduta-libera.js:187 funzione window ← js/ui/allenamento/seduta.js:214 renderAllenamento (html)
- `aggiornaExtra()` js/ui/seduta-libera.js:201 funzione window ← nessun altro file — nel file: htmlExtra
- `togliExtra()` js/ui/seduta-libera.js:208 funzione window ← nessun altro file — nel file: htmlExtra
- `spuntaExtra()` js/ui/seduta-libera.js:216 funzione window ← nessun altro file — nel file: htmlExtra
- `htmlExtra()` js/ui/seduta-libera.js:227 funzione ← js/ui/allenamento/seduta.js:206 renderAllenamento

### `js/ui/lavoro-cronometro.js`

- `infoEsercizio()` js/ui/lavoro-cronometro.js:6 funzione ← js/ui/allenamento/seduta.js:172 renderAllenamento
- `lavoro` js/ui/lavoro-cronometro.js:15 variabile ← nessun altro file — nel file: fermaLavoro, avviaLavoro, tickLavoro, htmlLavoro
- `fermaLavoro()` js/ui/lavoro-cronometro.js:16 funzione window ← js/ui/allenamento/sessione.js:13 backToDayPicker — nel file: avviaLavoro, tickLavoro
- `avviaLavoro()` js/ui/lavoro-cronometro.js:17 funzione window ← nessun altro file — nel file: htmlLavoro
- `tickLavoro()` js/ui/lavoro-cronometro.js:31 funzione ← nessun altro file — nel file: avviaLavoro
- `htmlLavoro()` js/ui/lavoro-cronometro.js:55 funzione ← js/ui/allenamento/seduta.js:202 renderAllenamento

### `js/ui/progressi/riepilogo.js`

- `prossimaSerie()` js/ui/progressi/riepilogo.js:6 funzione ← nessun altro file — nel file: aggiornaProssima
- `aggiornaProssima()` js/ui/progressi/riepilogo.js:16 funzione ← js/ui/allenamento/timer-pannello.js:27 openRecoveryPanel
- `htmlProssimaSeduta()` js/ui/progressi/riepilogo.js:25 funzione ← js/ui/oggi.js:99 renderOggi
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
- `htmlPesate()` js/ui/progressi/pagine.js:59 funzione ← js/ui/progressi/peso.js:91 renderPesoCard

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

- `pesoKey()` js/ui/progressi/peso.js:6 funzione ← js/ui/guida-interattiva.js:107 guidaDatiDemo — nel file: pesiTutti, registraPeso
- `pesoObKey()` js/ui/progressi/peso.js:7 funzione ← js/ui/guida-interattiva.js:108 guidaDatiDemo — nel file: renderPesoCard, salvaObiettivoPeso
- `pesiTutti()` js/ui/progressi/peso.js:8 funzione ← js/ui/progressi/pagine.js:25 renderPgTiles — nel file: renderPesoCard
- `tendenzaPeso()` js/ui/progressi/peso.js:15 funzione ← nessun altro file — nel file: renderPesoCard
- `faseCorpo()` js/ui/progressi/peso.js:27 funzione ← nessun altro file — nel file: consiglioPeso
- `consiglioPeso()` js/ui/progressi/peso.js:33 funzione ← nessun altro file — nel file: renderPesoCard
- `graficoPeso()` js/ui/progressi/peso.js:50 funzione ← nessun altro file — nel file: renderPesoCard
- `renderPesoCard()` js/ui/progressi/peso.js:74 funzione ← js/ui/storico.js:57 renderStorico · js/ui/progressi/pagine.js:42 apriPagProgressi, 103 htmlPesate (html) — nel file: registraPeso, salvaObiettivoPeso
- `registraPeso()` js/ui/progressi/peso.js:97 funzione window ← nessun altro file — nel file: renderPesoCard
- `salvaObiettivoPeso()` js/ui/progressi/peso.js:112 funzione window ← nessun altro file — nel file: renderPesoCard

### `js/ui/stampa-scheda.js`

- `righeScheda()` js/ui/stampa-scheda.js:6 funzione ← nessun altro file — nel file: testoScheda, stampaScheda
- `testoScheda()` js/ui/stampa-scheda.js:17 funzione ← nessun altro file — nel file: condividiScheda
- `condividiScheda()` js/ui/stampa-scheda.js:27 funzione window ← js/coach/psicologia.js:226 renderSetPage (html)
- `stampaScheda()` js/ui/stampa-scheda.js:33 funzione window ← js/coach/psicologia.js:227 renderSetPage (html)

## js/coach

### `js/coach/metodi-momenti.js`

- `ATTENZIONE_AMRAP` js/coach/metodi-momenti.js:11 costante ← nessun altro file — nel file: METODI
- `FB()` js/coach/metodi-momenti.js:12 funzione ← js/coach/metodi-epoca-oro.js:16, 22 — nel file: METODI
- `UL4` js/coach/metodi-momenti.js:13 costante ← nessun altro file — nel file: METODI
- `METODI` js/coach/metodi-momenti.js:14 costante ← js/ui/opzioni/il-coach.js:50 paginaCoach · js/coach/metodi-epoca-oro.js:12 · js/coach/compone.js:86 metodiPerTe, 126 apriTuttiMetodi · tests/browser/metodi-epoca-oro.js:38, 75 — nel file: metodoDa
- `metodoDa()` js/coach/metodi-momenti.js:91 funzione ← js/coach/programma/ricette.js:308 buildProgram · js/coach/compone.js:131 htmlIspirazioni · tests/browser/metodi-epoca-oro.js:31, 33, 69
- `MOMENTI` js/coach/metodi-momenti.js:93 costante ← js/ui/opzioni/il-coach.js:42 paginaCoach · js/coach/psicologia.js:96 renderPsicoStep — nel file: momentoDa
- `momentoDa()` js/coach/metodi-momenti.js:115 funzione ← js/coach/compone.js:47 sceltaMetodo, 82 metodiPerTe — nel file: momentoAttivo, setMomento
- `momentoAttivo()` js/coach/metodi-momenti.js:116 funzione ← js/coach/programma/ricette.js:601 buildProgram · js/coach/regole-ricerca.js:92 rirBersaglio · js/ui/opzioni/il-coach.js:41 paginaCoach · js/coach/stato.js:23 htmlMomentoBreve, 47 momentoDaChiedere, 60 htmlDomandaMomento · js/coach/esigenza.js:21 esigenzaEsclusa — nel file: chiediMomento, htmlMomento
- `applicaMomento()` js/coach/metodi-momenti.js:126 funzione ← nessun altro file — nel file: setMomento
- `momentoInAttesa` js/coach/metodi-momenti.js:139 variabile ← js/ui/opzioni/il-coach.js:43 paginaCoach — nel file: chiediMomento, confermaMomento, setMomento
- `chiediMomento()` js/coach/metodi-momenti.js:140 funzione window ← js/ui/opzioni/il-coach.js:42 paginaCoach (html)
- `confermaMomento()` js/coach/metodi-momenti.js:146 funzione window ← js/ui/opzioni/il-coach.js:45 paginaCoach (html)
- `setMomento()` js/coach/metodi-momenti.js:151 funzione window ← js/coach/programma/alternative.js:117 applyGeneratedProgram — nel file: chiediMomento, confermaMomento
- `terminaMomento()` js/coach/metodi-momenti.js:169 funzione ← nessun altro file — nel file: setMomento, fineMomento
- `verificaMomento()` js/coach/metodi-momenti.js:183 funzione window ← js/coach/stato.js:65 htmlDomandaMomento (html)
- `vaiAlMomento()` js/coach/metodi-momenti.js:191 funzione window ← js/coach/stato.js:66 htmlDomandaMomento (html)
- `fineMomento()` js/coach/metodi-momenti.js:195 funzione window ← js/coach/stato.js:64 htmlDomandaMomento (html) — nel file: htmlMomento
- `prontezzaBassaSettimana()` js/coach/metodi-momenti.js:202 funzione ← js/coach/stato.js:25 htmlMomentoBreve — nel file: htmlMomento
- `htmlMomento()` js/coach/metodi-momenti.js:206 funzione ← nessun altro file

### `js/coach/metodi-epoca-oro.js`

_nessun nome globale_

### `js/coach/compone.js`

- `fattoreFisico()` js/coach/compone.js:10 funzione ← js/coach/programma/ricette.js:307 buildProgram
- `metodoAmmesso()` js/coach/compone.js:34 funzione ← nessun altro file — nel file: sceltaMetodo
- `sceltaMetodo()` js/coach/compone.js:45 funzione ← js/coach/programma/ricette.js:308 buildProgram
- `TOCCHI` js/coach/compone.js:70 costante ← js/coach/programma/ricette.js:319 buildProgram
- `metodiPerTe()` js/coach/compone.js:79 funzione ← tests/browser/metodi-epoca-oro.js:71, 73 — nel file: sceltaMetodo, htmlMetodi
- `htmlMetodi()` js/coach/compone.js:116 funzione ← nessun altro file — nel file: apriTuttiMetodi
- `apriTuttiMetodi()` js/coach/compone.js:125 funzione window ← js/ui/opzioni/il-coach.js:50 paginaCoach (html)
- `htmlIspirazioni()` js/coach/compone.js:129 funzione ← js/ui/onboarding-risultato.js:45 renderOnbResult · js/ui/opzioni/il-coach.js:49 paginaCoach

### `js/coach/stato.js`

- `renderPianoCoach()` js/coach/stato.js:8 funzione ← js/ui/piano/giorno.js:19 backToPlanDays · js/coach/metodi-momenti.js:188 verificaMomento · js/ui/calendario/scambio.js:136 aggiornaDopoScambio
- `htmlMomentoBreve()` js/coach/stato.js:22 funzione ← nessun altro file — nel file: renderPianoCoach
- `ultimoGiornoAllenamento()` js/coach/stato.js:36 funzione ← nessun altro file — nel file: momentoDaChiedere
- `momentoDaChiedere()` js/coach/stato.js:45 funzione ← nessun altro file — nel file: htmlDomandaMomento
- `htmlDomandaMomento()` js/coach/stato.js:57 funzione ← js/ui/oggi.js:92 renderOggi

### `js/coach/biomeccanica.js`

- `CUE_SCHEMA` js/coach/biomeccanica.js:14 costante ← nessun altro file — nel file: cueEsercizio
- `cueEsercizio()` js/coach/biomeccanica.js:22 funzione ← js/dati/schede-tecniche.js:45 schedaTecnica
- `respiroPer()` js/coach/biomeccanica.js:36 funzione ← js/dati/schede-tecniche.js:46 schedaTecnica · tests/sicurezza-onda0.test.js:264 (html), 277 (html), 278 (html), 279 (html)
- `stabile()` js/coach/biomeccanica.js:42 funzione ← js/coach/regole-ricerca.js:100 rirBersaglio
- `htmlProva()` js/coach/biomeccanica.js:49 funzione ← nessun altro file — nel file: TEST_FAI_DA_TE
- `TEST_FAI_DA_TE` js/coach/biomeccanica.js:56 costante ← js/ui/onboarding.js:357 renderOnb — nel file: htmlTestFaiDaTe
- `setTest()` js/coach/biomeccanica.js:88 funzione window ← nessun altro file — nel file: htmlTestFaiDaTe
- `htmlTestFaiDaTe()` js/coach/biomeccanica.js:95 funzione ← js/ui/opzioni/il-coach.js:39 paginaCoach
- `bonusBiomecc()` js/coach/biomeccanica.js:101 funzione ← js/coach/programma/ricette.js:381 buildProgram
- `SCALE_DOLORE` js/coach/biomeccanica.js:114 costante ← js/coach/programma/ricette.js:593 buildProgram

### `js/coach/esigenza.js`

- `ESIGENZA_INIZIO` js/coach/esigenza.js:18 costante ← nessun altro file
- `esigenzaEsclusa()` js/coach/esigenza.js:20 funzione ← js/coach/intensita.js:109 bilancioPrimeSedute — nel file: esigenzaCoach, htmlEsigenza
- `tettoEsigenza()` js/coach/esigenza.js:26 funzione ← js/coach/intensita.js:133 bilancioPrimeSedute — nel file: aggiornaEsigenza
- `rpeBersaglioSeduta()` js/coach/esigenza.js:29 funzione ← js/coach/intensita.js:120 bilancioPrimeSedute — nel file: aggiornaEsigenza
- `esigenzaCoach()` js/coach/esigenza.js:36 funzione window ← js/coach/regole-ricerca.js:96 rirBersaglio · tests/intensita-onda0.test.js:43 (html)
- `aggiornaEsigenza()` js/coach/esigenza.js:41 funzione window ← js/ui/oggi.js:59 renderOggi · tests/intensita-onda0.test.js:113 (html), 132 (html), 146 (html), 156 (html), 303 (html) · tests/migrazione-v1.test.js:194 (html) · tests/browser/intensita-bia.js:120
- `segnaDoloreEsigenza()` js/coach/esigenza.js:87 funzione ← js/coach/dolore-mattina.js:33 rispostaDolore
- `htmlEsigenza()` js/coach/esigenza.js:94 funzione ← js/ui/opzioni/il-coach.js:30 paginaCoach

### `js/coach/psicologia.js`

- `PSICO_DOMANDE` js/coach/psicologia.js:14 costante ← nessun altro file — nel file: htmlDomandePsico
- `psicoCoach()` js/coach/psicologia.js:32 funzione ← js/coach/programma/ricette.js:304 buildProgram · js/coach/repertorio.js:355 htmlSedutaSaltata · js/coach/regole-ricerca.js:91 rirBersaglio · js/ui/opzioni/il-coach.js:52 paginaCoach · js/coach/compone.js:81 metodiPerTe — nel file: htmlPrimiPassi
- `ritrattoCoach()` js/coach/psicologia.js:55 funzione ← js/coach/programma/ricette.js:748 buildProgram · js/ui/opzioni/il-coach.js:52 paginaCoach
- `onbPsico()` js/coach/psicologia.js:74 funzione window ← nessun altro file
- `setPsico()` js/coach/psicologia.js:79 funzione window ← nessun altro file
- `htmlDomandePsico()` js/coach/psicologia.js:86 funzione ← js/ui/opzioni/il-coach.js:53 paginaCoach — nel file: renderPsicoStep
- `renderPsicoStep()` js/coach/psicologia.js:90 funzione ← js/ui/onboarding.js:366 renderOnb
- `onbMomento()` js/coach/psicologia.js:98 funzione window ← nessun altro file — nel file: renderPsicoStep
- `htmlPrimiPassi()` js/coach/psicologia.js:100 funzione ← js/coach/stato.js:19 renderPianoCoach
- `sedutaPianoB()` js/coach/psicologia.js:116 funzione ← js/coach/repertorio.js:373 sceltaSaltata
- `TEMI` js/coach/psicologia.js:125 costante ← nessun altro file — nel file: renderSettings, renderSetPage
- `renderSettings()` js/coach/psicologia.js:127 funzione ← js/lingue/traduttore.js:289 setLingua · js/ui/oggi.js:176 switchTab · js/ui/allenamento/cedimento-canzone.js:95 clearCedimentoAudio · js/coach/bia/opzioni.js:20 closeBiaSheet · js/ui/guida-interattiva.js:346 setConsenso, 360 revocaConsenso · js/ui/opzioni/impostazioni.js:40 setTheme, 61 toggleSetting · js/core/backup.js:26 esportaBackup · js/coach/coach-ia.js:41 setCoachIA — nel file: closeSetPage, renderSetPage
- `setPagina` js/coach/psicologia.js:192 variabile ← nessun altro file — nel file: renderSettings, openSetPage, closeSetPage, renderSetPage
- `SET_PAGINE` js/coach/psicologia.js:193 costante ← nessun altro file — nel file: openSetPage
- `openSetPage()` js/coach/psicologia.js:197 funzione window ← js/coach/metodi-momenti.js:192 vaiAlMomento, 225 htmlMomento (html) · js/coach/stato.js:26 htmlMomentoBreve (html) — nel file: renderSettings
- `closeSetPage()` js/coach/psicologia.js:203 funzione window ← js/ui/guida-interattiva.js:129 avviaGuida · js/ui/opzioni/il-coach.js:61 paginaCoach (html) · index.html:348 (html) — nel file: renderSetPage
- `renderSetPage()` js/coach/psicologia.js:209 funzione ← js/lingue/traduttore.js:290 setLingua · js/ui/opzioni/il-coach.js:70 setCoach, 80 setFreqCoach, 91 toggleCoachLista, 97 togliPreferenza · js/coach/metodi-momenti.js:144 chiediMomento, 149 confermaMomento, 155 setMomento · js/coach/biomeccanica.js:93 setTest — nel file: setPsico, renderSettings, openSetPage
- `switchProtocol()` js/coach/psicologia.js:289 funzione window ← nessun altro file

## js/ui

### `js/ui/schede-esercizio.js`

- `arto()` js/ui/schede-esercizio.js:19 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `tronco()` js/ui/schede-esercizio.js:36 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `testa()` js/ui/schede-esercizio.js:48 funzione ← nessun altro file — nel file: inPiedi, accosciato, piegato, sdraiato, PATTERN_DRAW
- `bilanciere()` js/ui/schede-esercizio.js:53 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `manubrio()` js/ui/schede-esercizio.js:63 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `freccia()` js/ui/schede-esercizio.js:69 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `suolo()` js/ui/schede-esercizio.js:75 funzione ← nessun altro file — nel file: wrapSvg
- `wrapSvg()` js/ui/schede-esercizio.js:79 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `inPiedi()` js/ui/schede-esercizio.js:86 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `accosciato()` js/ui/schede-esercizio.js:103 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `piegato()` js/ui/schede-esercizio.js:116 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `sdraiato()` js/ui/schede-esercizio.js:129 funzione ← nessun altro file — nel file: PATTERN_DRAW
- `PATTERN_DRAW` js/ui/schede-esercizio.js:143 costante ← nessun altro file
- `PATTERN_INFO` js/ui/schede-esercizio.js:259 costante ← js/dati/schede-tecniche.js:116 openExerciseInfo
- `PATTERN_RULES` js/ui/schede-esercizio.js:326 costante ← nessun altro file — nel file: patternFor
- `patternFor()` js/ui/schede-esercizio.js:344 funzione window ← js/dati/schede-tecniche.js:115 openExerciseInfo · js/dati/scheda-unica.js:31 schedaUnica
- `VIDEO_VERIFICATI` js/ui/schede-esercizio.js:356 costante ← js/dati/schede-tecniche.js:123 openExerciseInfo — nel file: videoLinkFor
- `VIDEO_PLAYLIST` js/ui/schede-esercizio.js:359 costante ← js/dati/schede-tecniche.js:148 openExerciseInfo
- `testoRicercaVideo()` js/ui/schede-esercizio.js:363 funzione window ← nessun altro file — nel file: videoLinkFor
- `videoLinkFor()` js/ui/schede-esercizio.js:374 funzione window ← js/ui/allenamento/seduta.js:181 renderAllenamento · js/dati/schede-tecniche.js:144 openExerciseInfo · js/dati/scheda-unica.js:33 schedaUnica

## js/dati

### `js/dati/disegni-esercizi.js`

- `slugEsercizio()` js/dati/disegni-esercizi.js:11 funzione window ← nessun altro file — nel file: immagineEsercizio
- `IMMAGINI_ESERCIZI` js/dati/disegni-esercizi.js:23 costante ← nessun altro file — nel file: immagineEsercizio
- `immagineEsercizio()` js/dati/disegni-esercizi.js:44 funzione window ← js/dati/scheda-unica.js:17 schedaUnica — nel file: slotImmagine
- `slotImmagine()` js/dati/disegni-esercizi.js:51 funzione ← js/dati/schede-tecniche.js:121 openExerciseInfo

## js/ui

### `js/ui/scheda-quattro-sezioni.js`

- `exInfoNome` js/ui/scheda-quattro-sezioni.js:12 variabile ← js/dati/schede-tecniche.js:101 preferisci, 129 openExerciseInfo
- `exInfoTab` js/ui/scheda-quattro-sezioni.js:13 variabile ← nessun altro file — nel file: setExInfoTab
- `seduteEsercizio()` js/ui/scheda-quattro-sezioni.js:16 funzione ← js/dati/schede-tecniche.js:130 openExerciseInfo
- `setExInfoTab()` js/ui/scheda-quattro-sezioni.js:51 funzione window ← js/dati/schede-tecniche.js:134 openExerciseInfo (html)
- `exVuoto()` js/ui/scheda-quattro-sezioni.js:64 funzione ← nessun altro file — nel file: paneStorico, paneGrafico, paneRecord
- `paneStorico()` js/ui/scheda-quattro-sezioni.js:68 funzione ← js/dati/schede-tecniche.js:136 openExerciseInfo
- `paneGrafico()` js/ui/scheda-quattro-sezioni.js:75 funzione ← js/dati/schede-tecniche.js:137 openExerciseInfo
- `paneRecord()` js/ui/scheda-quattro-sezioni.js:105 funzione ← js/dati/schede-tecniche.js:138 openExerciseInfo

## js/dati

### `js/dati/schede-tecniche.js`

- `TECNICA` js/dati/schede-tecniche.js:12 costante ← js/dati/schede-varianti.js:169, 170 · js/dati/scheda-unica.js:16 schedaUnica · tests/browser/dettagli-esercizi.js:20 · tests/browser/traduzioni-esercizi.js:15 — nel file: schedaTecnica
- `RESPIRO` js/dati/schede-tecniche.js:14 costante ← js/coach/biomeccanica.js:39 respiroPer
- `GLOSSARIO` js/dati/schede-tecniche.js:19 costante ← nessun altro file — nel file: openExerciseInfo
- `schedaTecnica()` js/dati/schede-tecniche.js:31 funzione ← nessun altro file — nel file: openExerciseInfo
- `htmlDettaglioScheda()` js/dati/schede-tecniche.js:52 funzione ← nessun altro file — nel file: openExerciseInfo
- `pausaConsigliata()` js/dati/schede-tecniche.js:69 funzione ← js/dati/scheda-unica.js:26 schedaUnica — nel file: preferenzaEsercizio
- `preferenzaEsercizio()` js/dati/schede-tecniche.js:70 funzione ← nessun altro file — nel file: schedaTecnica
- `preferisci()` js/dati/schede-tecniche.js:87 funzione window ← nessun altro file — nel file: preferenzaEsercizio
- `openExerciseInfo()` js/dati/schede-tecniche.js:113 funzione window ← js/ui/piano/giorno.js:113 renderDayView (html) · js/ui/piano/aggiungi-allenamento.js:423 renderPiano (html) · js/ui/allenamento/seduta.js:178 renderAllenamento (html) · tests/browser/elenco-esercizi.js:52 — nel file: htmlDettaglioScheda, preferisci
- `closeExerciseInfo()` js/dati/schede-tecniche.js:157 funzione window ← index.html:295 (html)

### `js/dati/schede-varianti.js`

_nessun nome globale_

### `js/dati/scheda-unica.js`

- `schedaUnica()` js/dati/scheda-unica.js:13 funzione window ← tests/browser/scheda-unica.js:10, 11 — nel file: bucchiNelleSchede
- `bucchiNelleSchede()` js/dati/scheda-unica.js:37 funzione window ← tests/browser/scheda-unica.js:11

## js/ui

### `js/ui/calendario/mese.js`

- `calKey()` js/ui/calendario/mese.js:12 funzione ← js/coach/repertorio.js:367 sceltaSaltata · js/ui/importa-progressi.js:188 confermaImportProgressi · js/ui/calendario/scambio.js:99 mcSwapDays, 158 planSwapDays · js/ui/calendario/copia-settimana.js:163 mcCopyWeeks, 177 mcPlaceTemplate, 193 mcFillMonth · js/ui/menu-settimana.js:76 wmSvuotaSettimana, 103 mcClearMonth · tests/intensita-onda0.test.js:181 (html), 195 (html) · tests/browser/guida-tocchi.js:61, 63, 66 — nel file: loadCal, saveCal
- `loadCal()` js/ui/calendario/mese.js:13 funzione ← js/ui/oggi.js:65 renderOggi · js/ui/allenamento/sessione.js:25 fattoQuestaSettimana · js/coach/programma/alternative.js:75 applyGeneratedProgram · js/ui/statistiche.js:100 calcolaStatistiche, 124 tutteLeSedute, 202 calcolaBlocco · js/coach/repertorio.js:332 sedutaSaltata, 352 htmlSedutaSaltata, 368 sceltaSaltata, 408 aderenzaDueSettimane, 461 verdettoCiclo · js/ui/progressi/riepilogo.js:27 htmlProssimaSeduta, 80 renderAnno, 106 annoRiassunto · js/coach/stato.js:37 ultimoGiornoAllenamento · js/ui/calendario/gruppi.js:60 renderMonthCal · js/ui/calendario/scambio.js:86 mcSwapDays, 113 scambiaNelCalendario · js/ui/calendario/copia-settimana.js:33 mcSelectWeek, 155 mcCopyWeeks, 170 mcPlaceTemplate, 183 mcFillMonth · js/ui/menu-settimana.js:23 renderWeekMenu, 50 wmCancellaGiorno, 63 wmSvuotaSettimana, 94 mcClearMonth, 108 mcOpenDay, 142 mcPlanDay, … · js/ui/sessione-completata.js:67 openDoneView · js/ui/esporta-ics.js:31 buildIcs, 64 exportIcs · tests/browser/guida-tocchi.js:48, 52, 54
- `saveCal()` js/ui/calendario/mese.js:14 funzione ← js/coach/programma/alternative.js:88 applyGeneratedProgram · js/coach/repertorio.js:374 sceltaSaltata · js/ui/guida-interattiva.js:98 guidaDatiDemo · js/ui/calendario/scambio.js:96 mcSwapDays, 128 scambiaNelCalendario · js/ui/calendario/copia-settimana.js:160 mcCopyWeeks, 174 mcPlaceTemplate, 191 mcFillMonth · js/ui/menu-settimana.js:54 wmCancellaGiorno, 72 wmSvuotaSettimana, 101 mcClearMonth, 145 mcPlanDay, 152 mcRemoveDay, 175 segnaFattoNelCalendario
- `mcAnno` js/ui/calendario/mese.js:16 variabile ← js/ui/calendario/gruppi.js:59 renderMonthCal, 112 mcMove · js/ui/calendario/copia-settimana.js:175 mcPlaceTemplate · js/ui/menu-settimana.js:96 mcClearMonth — nel file: settimaneDelMese
- `mcMese` js/ui/calendario/mese.js:16 variabile ← js/ui/calendario/gruppi.js:59 renderMonthCal, 111 mcMove · js/ui/calendario/copia-settimana.js:175 mcPlaceTemplate · js/ui/menu-settimana.js:96 mcClearMonth — nel file: settimaneDelMese
- `ymd()` js/ui/calendario/mese.js:18 funzione ← js/ui/oggi.js ×6 · js/ui/allenamento/macchinario-occupato.js ×2 · js/ui/allenamento/sessione.js ×1 · js/ui/storico.js ×1 · js/coach/programma/ricette.js ×1 · js/coach/programma/archivio.js ×1 · js/coach/programma/alternative.js ×3 · js/coach/questionario-decisioni.js ×2 · js/coach/prontezza.js ×6 · js/coach/repertorio.js ×15 · js/coach/dolore-mattina.js ×1 · js/coach/intensita.js ×3 · js/ui/guida-interattiva.js ×2 · js/core/backup.js ×2 · js/ui/importa-csv.js ×2 · js/ui/importa-progressi.js ×3 · js/ui/seduta-libera.js ×2 · js/ui/progressi/riepilogo.js ×7 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×3 · js/coach/metodi-momenti.js ×9 · js/coach/stato.js ×2 · js/coach/esigenza.js ×8 · js/ui/scheda-quattro-sezioni.js ×1 · js/ui/calendario/gruppi.js ×7 · js/ui/calendario/scambio.js ×6 · js/ui/calendario/copia-settimana.js ×2 · js/ui/menu-settimana.js ×4 · js/coach/coach-ia.js ×1 · js/ui/esporta-ics.js ×2 · tests/aiuto-app.js ×1 · tests/migrazione-v1.test.js ×2 · tests/browser/intensita-bia.js ×5 · tests/browser/regole-nuove.js ×1 — nel file: mettiSettimana, copiaSettimana
- `daYmd()` js/ui/calendario/mese.js:21 funzione ← js/ui/statistiche.js ×4 · js/coach/carichi/progressivo.js ×2 · js/coach/prontezza.js ×1 · js/coach/repertorio.js ×10 · js/coach/regole-ricerca.js ×2 · js/coach/agente-consigli.js ×2 · js/coach/bia/opzioni.js ×2 · js/ui/progressi/pagine.js ×3 · js/ui/progressi/foto.js ×5 · js/ui/progressi/peso.js ×6 · js/coach/metodi-momenti.js ×1 · js/coach/psicologia.js ×3 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×6 · js/ui/calendario/copia-settimana.js ×6 · js/ui/menu-settimana.js ×6 · js/ui/sessione-completata.js ×1 · js/ui/esporta-ics.js ×2
- `lunediDi()` js/ui/calendario/mese.js:22 funzione ← js/ui/oggi.js ×4 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/termina-e-cardio.js ×1 · js/ui/storico.js ×1 · js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×2 · js/ui/statistiche.js ×3 · js/ui/statistiche-grafico.js ×4 · js/coach/carichi/progressivo.js ×2 · js/coach/repertorio.js ×5 · js/coach/regole-ricerca.js ×2 · js/coach/intensita.js ×1 · js/coach/agente-consigli.js ×1 · js/ui/progressi/riepilogo.js ×1 · js/coach/stato.js ×2 · js/coach/esigenza.js ×4 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×4 · js/ui/calendario/copia-settimana.js ×2 · tests/browser/intensita-bia.js ×1 · tests/browser/regole-nuove.js ×1 — nel file: settimaneDelMese
- `giorniTra()` js/ui/calendario/mese.js:24 funzione ← js/ui/statistiche.js:151 blocchiQuattroSettimane · js/ui/statistiche-grafico.js:29 frequenzaSettimanale · js/coach/carichi/progressivo.js:34 faseSedutaSalvata, 71 caricoRiferimento, 99 settimanaProgramma · js/coach/prontezza.js:80 applicaProntezza · js/coach/repertorio.js:208 eserciziFermi, 230 strainSettimane, 242 scaricoRecente, 284 azioniCoach, 303 corpoCoach, 335 sedutaSaltata, … · js/coach/regole-ricerca.js:161 faseDelGiorno, 168 settimanaDellaSeduta, 262 caricoProssimoBase · js/coach/regole-nuove.js:25 giorniDallUltimaSeduta · js/coach/agente-consigli.js:40 consigliCoach2 · js/ui/progressi/pagine.js:67 htmlPesate · js/ui/progressi/foto.js:112 mostraFoto · js/ui/progressi/peso.js:20 tendenzaPeso · js/coach/psicologia.js:107 htmlPrimiPassi
- `piuGiorni()` js/ui/calendario/mese.js:25 funzione ← js/ui/oggi.js ×3 · js/ui/piano/giorno.js ×1 · js/ui/allenamento/sessione.js ×1 · js/ui/allenamento/termina-e-cardio.js ×3 · js/ui/onboarding-risultato.js ×1 · js/coach/programma/alternative.js ×3 · js/ui/statistiche.js ×5 · js/ui/statistiche-grafico.js ×2 · js/coach/repertorio.js ×13 · js/coach/agente-consigli.js ×3 · js/ui/progressi/riepilogo.js ×4 · js/ui/progressi/foto.js ×1 · js/ui/progressi/peso.js ×3 · js/coach/metodi-momenti.js ×5 · js/coach/stato.js ×2 · js/coach/esigenza.js ×2 · js/ui/calendario/gruppi.js ×3 · js/ui/calendario/scambio.js ×2 · js/ui/calendario/copia-settimana.js ×4 · js/ui/menu-settimana.js ×3 · js/ui/esporta-ics.js ×2 · tests/browser/intensita-bia.js ×5 · tests/browser/regole-nuove.js ×1 — nel file: mettiSettimana, copiaSettimana, settimaneDelMese
- `giornoSettimana()` js/ui/calendario/mese.js:26 funzione ← js/ui/menu-settimana.js:117 mcOpenDay — nel file: voceDaPiano
- `voceDaPiano()` js/ui/calendario/mese.js:29 funzione ← js/ui/menu-settimana.js:143 mcPlanDay — nel file: mettiSettimana
- `mettiSettimana()` js/ui/calendario/mese.js:42 funzione ← js/coach/programma/alternative.js:80 applyGeneratedProgram · js/ui/calendario/copia-settimana.js:173 mcPlaceTemplate, 189 mcFillMonth
- `copiaSettimana()` js/ui/calendario/mese.js:56 funzione ← js/ui/calendario/copia-settimana.js:159 mcCopyWeeks
- `settimaneDelMese()` js/ui/calendario/mese.js:74 funzione ← js/ui/calendario/gruppi.js:37 renderLegendaGruppi, 65 renderMonthCal · js/ui/calendario/copia-settimana.js:187 mcFillMonth

### `js/ui/calendario/gruppi.js`

- `GRUPPO_COLORE` js/ui/calendario/gruppi.js:10 costante ← nessun altro file — nel file: gruppiDelGiorno, puntiniGruppi, renderLegendaGruppi
- `GRUPPI_ORDINE` js/ui/calendario/gruppi.js:11 costante ← nessun altro file — nel file: gruppiDelGiorno, renderLegendaGruppi
- `_mcStorico` js/ui/calendario/gruppi.js:12 variabile ← nessun altro file — nel file: gruppiDelGiorno, renderMonthCal
- `gruppiDelGiorno()` js/ui/calendario/gruppi.js:13 funzione ← nessun altro file — nel file: puntiniGruppi, renderLegendaGruppi
- `puntiniGruppi()` js/ui/calendario/gruppi.js:28 funzione ← nessun altro file — nel file: renderMonthCal
- `renderLegendaGruppi()` js/ui/calendario/gruppi.js:33 funzione ← nessun altro file — nel file: renderMonthCal
- `renderMonthCal()` js/ui/calendario/gruppi.js:57 funzione ← js/ui/oggi.js:177 switchTab · js/coach/repertorio.js:402 sceltaSaltata · js/ui/calendario/scambio.js:135 aggiornaDopoScambio · js/ui/calendario/copia-settimana.js:39 mcSelectWeek, 47 mcToggleTarget, 57 mcRepeat, 63 mcCancelCopy, 144 attachWeekDrag, 161 mcCopyWeeks, … · js/ui/menu-settimana.js:55 wmCancellaGiorno, 73 wmSvuotaSettimana, 102 mcClearMonth, 146 mcPlanDay, 153 mcRemoveDay — nel file: mcMove
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
- `segnaFattoNelCalendario()` js/ui/menu-settimana.js:158 funzione window ← js/ui/allenamento/termina-e-cardio.js:165 endWorkout · js/ui/guida-interattiva.js:99 guidaDatiDemo · js/ui/importa-progressi.js:193 confermaImportProgressi

### `js/ui/sessione-completata.js`

- `mostraSessione()` js/ui/sessione-completata.js:14 funzione ← js/coach/coach-ia.js:175 openHistoryDetail — nel file: openDoneView
- `openDoneView()` js/ui/sessione-completata.js:66 funzione window ← js/ui/oggi.js:100 renderOggi (html) · js/ui/allenamento/sessione.js:39 renderWorkoutDayPicker (html) · js/ui/menu-settimana.js:109 mcOpenDay

## js/coach

### `js/coach/coach-ia.js`

- `COACH_IA_URL` js/coach/coach-ia.js:11 costante ← nessun altro file — nel file: chiamaCoachIA
- `IA_CONSENT_KEY` js/coach/coach-ia.js:12 costante ← nessun altro file — nel file: coachIAAttivo, setCoachIA, htmlPrivacyIA
- `IA_DEVICE_KEY` js/coach/coach-ia.js:13 costante ← nessun altro file — nel file: deviceIA
- `TESTI_IA` js/coach/coach-ia.js:18 costante ← nessun altro file — nel file: setCoachIA, htmlPrivacyIA
- `coachIAAttivo()` js/coach/coach-ia.js:28 funzione window ← js/ui/allenamento/termina-e-cardio.js:171 endWorkout · js/coach/psicologia.js:174 renderSettings — nel file: htmlPrivacyIA, commentaSeduta, htmlCommentoIA
- `setCoachIA()` js/coach/coach-ia.js:31 funzione window ← nessun altro file — nel file: htmlPrivacyIA
- `htmlPrivacyIA()` js/coach/coach-ia.js:43 funzione ← js/coach/psicologia.js:268 renderSetPage
- `deviceIA()` js/coach/coach-ia.js:55 funzione ← nessun altro file — nel file: chiamaCoachIA
- `serieCompatte()` js/coach/coach-ia.js:68 funzione ← nessun altro file — nel file: contestoSeduta
- `nomePulito()` js/coach/coach-ia.js:73 funzione ← nessun altro file — nel file: contestoSeduta
- `contestoSeduta()` js/coach/coach-ia.js:76 funzione ← nessun altro file — nel file: commentaSeduta
- `chiamaCoachIA()` js/coach/coach-ia.js:106 funzione ← nessun altro file — nel file: commentaSeduta
- `iaInCorso` js/coach/coach-ia.js:125 costante ← nessun altro file — nel file: commentaSeduta, htmlCommentoIA
- `iaErrore` js/coach/coach-ia.js:126 valore window ← nessun altro file — nel file: commentaSeduta, htmlCommentoIA
- `commentaSeduta()` js/coach/coach-ia.js:127 funzione window ← js/ui/allenamento/termina-e-cardio.js:172 endWorkout — nel file: htmlCommentoIA
- `aggiornaBoxIA()` js/coach/coach-ia.js:148 funzione ← nessun altro file — nel file: commentaSeduta
- `htmlCommentoIA()` js/coach/coach-ia.js:152 funzione window ← js/ui/sessione-completata.js:25 mostraSessione — nel file: aggiornaBoxIA
- `openHistoryDetail()` js/coach/coach-ia.js:170 funzione window ← js/ui/storico.js:15 rigaSeduta (html) — nel file: commentaSeduta
- `closeDoneView()` js/coach/coach-ia.js:182 funzione window ← js/ui/sessione-completata.js:59 mostraSessione (html) · index.html:534 (html)

## js/ui

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
