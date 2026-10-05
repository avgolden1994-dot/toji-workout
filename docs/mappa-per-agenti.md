# Mappa per agenti

Dove sta ogni funzione dell'app e come scorrono i flussi principali, per toccare solo i file giusti.
Scritta a mano (verificata con `npm run trova`): se sposti una funzione, aggiorna la riga qui.
Righe esatte e chiamanti: `npm run -s trova -- nome` (o `docs/mappa-simboli.md`), mai a memoria.

## Come cercare (in quest'ordine)

1. `graphify-out/GRAPH_REPORT.md`: aree del codice (community con nomi italiani) e nodi più collegati.
2. Un nome preciso: `npm run -s trova -- apriCedimento` → `file:riga`, chi lo usa (anche `onclick`), cosa usa, se è riassegnato altrove.
3. Un'area o un concetto: `graphify explain "nome"`, `graphify query "parole chiave" --budget 1500`, `graphify path "A" "B"`.
4. Apri solo il file indicato, solo l'intervallo di righe che serve.
5. Per una funzione dentro un'altra (non globale): `grep -n "nome" js/percorso/file.js`.

## Schermate (tab) → funzione d'ingresso → file

`switchTab(tab)` (js/ui/oggi.js) mostra il pannello `#tab-<tab>` di `index.html` e chiama:

| Tab | Funzione | File principali |
|---|---|---|
| Oggi | `renderOggi()` | js/ui/oggi.js; avvio rapido `iniziaOggi()` |
| Piano | `backToPlanDays()` → `renderPiano()` | js/ui/piano/giorno.js, aggiungi-allenamento.js (`renderPiano`), selezione-multipla.js, schede-pronte.js; js/ui/gruppi-muscolari.js; js/coach/pannello.js (`renderCoach`) |
| Allenamento | `backToDayPicker()` → `openWorkoutDay(giorno)` → `renderAllenamento()` | js/ui/allenamento/sessione.js, seduta.js |
| Calendario | `renderMonthCal()` (in calendario/gruppi.js) | js/ui/calendario/*.js, js/ui/menu-settimana.js, js/ui/esporta-ics.js |
| Progressi | `renderStorico()`, `renderWeeks()` | js/ui/storico.js, riposo-settimane.js, statistiche*.js, progressi/*.js, importa-*.js |
| Opzioni | `renderSettings()` (in coach/psicologia.js) | js/ui/opzioni/*.js, js/coach/bia/opzioni.js, js/core/backup.js, js/ui/fogli.js |

Avvio: `js/avvio.js` (IIFE `boot`) → `chooseMode()` (js/core/modalita.js) → onboarding (`startOnboarding()`, js/ui/onboarding.js) o app.

## Nomi in posti inattesi

| Nome | Sta in | Nota |
|---|---|---|
| `toggleSetDone()`, `annullaCedimento()` | js/ui/allenamento/macchinario-occupato.js | spunta della serie e tolta della fiamma |
| `renderPiano()` | js/ui/piano/aggiungi-allenamento.js | |
| `renderMonthCal()` | js/ui/calendario/gruppi.js | il calendario del mese |
| `renderSettings()` | js/coach/psicologia.js | la schermata Opzioni |
| `getProfile()` | js/coach/bia/opzioni.js | profilo utente, usato da ~70 punti |
| `ymd()` | js/ui/calendario/mese.js | data `AAAA-MM-GG`, usata ovunque |
| `alert()`, `confirm()`, `tr()` | js/lingue/traduttore.js | `alert`/`confirm` sostituiti per tradurre i testi |
| `caricoProssimo()` | js/coach/dolore-mattina.js | **avvolto** da regole-nuove.js e poi da intensita.js: vale l'ultima versione |
| `applicaCaricoProgressivo()`, `imparaDallaSeduta()` | js/coach/regole-ricerca.js | avvolti da regole-nuove.js / intensita.js |
| `applicaProntezza()` | js/coach/prontezza.js | avvolto da regole-nuove.js |

## Flussi principali

**Seduta.** `openWorkoutDay(giorno)` (sessione.js; chiamato da `iniziaOggi`, piano, seduta libera) → `applicaCaricoProgressivo` (coach) → `renderAllenamento()` (seduta.js: serie, RPE, fiamma 🔥) → spunta `toggleSetDone()` → timer di recupero `openRecoveryPanel()` (timer-pannello.js) con `avviaTickRecupero()` (timer-recupero.js) → fine `endWorkout()` (termina-e-cardio.js) → `apriQuestionario()` (coach/questionario-decisioni.js: dolore, decisioni, aggiusti) → seduta salvata nello storico; vista a posteriori `openDoneView()` (sessione-completata.js) con commento `commentaSeduta()` (coach/coach-ia.js, solo con consenso). Stato in memoria: `currentDay`, `armedSet` (js/core/costanti.js, stato-condiviso.js).

**Cedimento (drop set) e audio.** Fiamma in `renderAllenamento` → `onclick="apriCedimento(es, serie)"` → js/ui/allenamento/cedimento.js: `apriCedimento` → `startDropAudio()` (canzone scelta in cedimento-canzone.js: MP3 locale in js/ui/musica/mp3-locale.js, YouTube/Spotify in player-web.js, lettore fisso lettore-fisso.js) → `tickCedimento()` (anche da timer-pannello.js) → `finishDropSet()` → `chiudiCedimento()` → `rilasciaAudioCedimento()`. L'audio delle altre app non va bloccato: `tipoSessione()`, `avviaCanaleMultimediale()`, `fermaCanaleMultimediale()` in js/core/musica-altre-app.js. Variabili condivise (`dropActive`, `dropInterval`, `dropRemaining`, `dropAudioAttivo`, `currentWebMode`, `selectedTrackId`) in js/core/stato-condiviso.js. `chiudiCedimento` è chiamato anche da `switchTab` e `backToDayPicker`; `stopDropSet` = alias. Test: tests/cedimento.test.js.

**Programma del coach.** `startOnboarding()` → `renderOnb()` (onboarding.js, domande, BIA con coach/bia/lettore.js) → `renderOnbResult()` (onboarding-risultato.js) → `buildProgram()` (coach/programma/ricette.js: slot, `schemaDi` da schemi.js, regole ABB da struttura-pro.js, scelta del metodo `sceltaMetodo` da coach/compone.js e metodi-momenti.js) → `applyGeneratedProgram()` (coach/programma/alternative.js) → salvato con `getProgramma()`/archivio.js. Nuovo ciclo: `nuovoCiclo()` in coach/repertorio.js. Regole e soglie: js/coach/parametri.js (`regolaAttiva`), catalogo generato js/coach/catalogo-regole.js da docs/coach-mappa-regole.md.

**Alternative per muscolo bersaglio.** `alternativeStessoMuscolo()` (js/coach/programma/motore.js) filtra `EXERCISE_LIBRARY` (js/dati/libreria-esercizi.js) con `bersaglioDi()`, `famigliaTotaleDi()` (js/dati/dettagli-esercizi.js, dove stanno anche `muscoloBersaglio()` e `MUSCOLI`). Chiamata da: macchinario occupato `alternativeOggi()` (js/ui/allenamento/macchinario-occupato.js, menu a tendina), `alternativeDi()` (coach/programma/alternative.js), `sostituto()` (motore.js; usato da repertorio.js e dati/schede-tecniche.js). Test: tests/muscoli.test.js, tests/browser/macchinario-occupato*.js.

**Carichi.** Prossimo carico `caricoProssimo()` (dolore-mattina.js, poi avvolto) e `applicaCaricoProgressivo()` (regole-ricerca.js); partenza da dati del corpo js/coach/carichi/partenza.js; evoluzione js/coach/carichi/progressivo.js; intensità/RIR js/coach/intensita.js, esigenza.js.

**Dati e salvataggio.** `loadData()`/`saveData()`, `loadHistory()`/`saveHistory()`, chiavi `dataKey()`/`historyKey()` in js/core/storage.js (localStorage `coach_plus_*` e `tz_*`, per modalità: js/core/modalita.js). Backup/ripristino js/core/backup.js; importazioni js/ui/importa-csv.js, importa-progressi.js; MP3 e foto in IndexedDB (mp3-locale.js, progressi/foto.js). Una chiave nuova va anche nel backup.

**Lingue.** Testo italiano nel codice; `tr()` e il traduttore automatico in js/lingue/traduttore.js cercano la frase nei dizionari js/lingue/en|es|de.js (una frase nuova va in tutti e tre: lo controlla `npm test`).

## Stile

`css/` un file per area, nell'ordine di `index.html` (l'ultimo vince): base, shell, calendario, componenti-coach, oggi-e-lettore, piano, scheda-esercizio, impostazioni, onboarding, componenti, figura-e-gruppi, allenamento, navigazione-e-fire, chiaro (solo i ritocchi del tema chiaro: i token stanno in `base.css`).
