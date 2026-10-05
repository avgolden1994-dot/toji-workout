---
name: implementa-regola-coach
description: Implementa o modifica una regola del coach o il comportamento del generatore di schede di 3in (js/coach/) in modo coerente, testato e sicuro - dove va il codice (parametri, regole, generatore, testo), come si scrive una regola (codice, motivo, fonte, annullabile, consenso), invarianti dell'app (nomi globali, ordine di caricamento, file generati, CACHE_NAME), traduzioni en/es/de, test, sicurezza sui contenuti fitness e checklist finale. Da caricare PRIMA di scrivere codice. Trigger - aggiungi regola coach, nuova regola, nuova regola RIC, modifica generatore, modifica buildProgram, implementa ricerca nel coach, cambia soglia del coach, cambia caricoProssimo, add coach rule, change program generator.
---

# Implementare una regola del coach di 3in

Il coach è un **motore a regole** (non un'IA): ogni suggerimento ha un codice (`RIC-02`), un motivo scritto in italiano ed è annullabile. L'app è fatta di script classici che si parlano per **nomi globali**, con molti file generati e controlli che falliscono in silenzio. Questa skill dice dove mettere il codice e cosa non rompere. Verificata sul repo il 2026-10-05 (comandi provati, vedi «Registro»).

Se la regola nasce da una ricerca (studi, podcast, video) usa **prima** la skill `ricerca-fitness` (fonti, forza dell'evidenza, nota in `docs/`); qui si implementa. Vale `CLAUDE.md`: prima `graphify-out/GRAPH_REPORT.md`, poi `npm run -s trova -- <nome>`, apri solo il `file:riga` che serve, un sotto-agente per compito.

## 0. Prima di scrivere codice

```
npm install                          # una volta; senza node_modules `npm run controlla` muore con "Cannot find module 'acorn'"
npm run -s trova -- caricoProssimo   # dove è definito, chi lo usa, se è avvolto altrove ("riassegnato (avvolto) anche in")
grep -n "RIC-0" docs/coach-mappa-regole.md   # la riga della mappa della regola che tocchi (o dell'area vicina)
npm run controlla                    # baseline: se fallisce PRIMA di toccare nulla, annota quale passo e perché
```

Se la baseline fallisce per un file generato rimasto indietro (mappa dei simboli, grafo) rigeneralo col suo script; se fallisce un test, non è tua: segnalalo e non «aggiustarlo» nello stesso lavoro. Una PR = un argomento (`docs/PIANO.md`): non mescolare ristrutturazioni con regole.

## 1. Dove va il comportamento nuovo (albero decisionale)

| Cosa cambia | Dove | Esempio reale |
|---|---|---|
| Un **numero** (soglia, fattore, tetto) usato da più regole o file | `COACH_PARAMETRI` in `js/coach/parametri.js`, con il commento dei codici | `serieMaxPrudente` (PRG-18/19/31) usato da `ricette.js` e `struttura-pro.js`; `aderenzaMinima` (ESI/ADE) |
| Un numero di **una sola area** | la tabella dell'area, non sparso | `PARAM_INTENSITA` (intensita.js), `PARAM_PARTENZA` (carichi/partenza.js), `STR_PESI` (struttura-pro.js), `DOSE_SCARICO`/`RIR_TIPO` (regole-ricerca.js) |
| Come cambiano **carico, serie, ripetizioni, pausa, RIR** di un esercizio alla seduta (progressione) | `caricoProssimoBase` in `js/coach/regole-ricerca.js` (CAR-01..09, 16, 17) | CAR-17: prime sedute molto sotto il previsto, -5% subito |
| Un **correttivo spegnibile** sopra la progressione (ricerca recente, da provare) | wrapper in `js/coach/regole-nuove.js` (RIC) o `intensita.js` (INT), vedi §2.4 | RIC-02: `mancavaSoloUltimaSerie` → `r.piuPausa = 45` |
| **Decisioni dopo la seduta** (dolore, fatica) | `decisioniCoach` (funzione pura) e `applicaDecisioni` (con annulla) in `js/coach/questionario-decisioni.js`; il giorno dopo `dolore-mattina.js` | DEC-03: dolore ≥ 6/10 → variante che carica meno l'articolazione + invito al medico |
| **Prima della seduta** (sonno, stress, voglia) | `js/coach/prontezza.js` | PRZ-02: fattore sui multiarticolari con `COACH_PARAMETRI.prontezza*` |
| **Controlli periodici e azioni col pulsante Annulla** (stalli, strain, aderenza, fine ciclo, esigenza) | `js/coach/repertorio.js` (`azioniCoach`, `conAnnulla`), `esigenza.js` | STA-02: azioni sull'esercizio fermo |
| **Struttura della scheda**: ordine, doppioni, copertura, spinte/tirate, superserie | `js/coach/programma/struttura-pro.js` (`strOrdina`, `strBilancia`…) | ABB-04: tirate ≥ 90% delle spinte (`STR_PESI.tirateSuSpinte`) |
| **Quali esercizi, quante serie/ripetizioni** per obiettivo, livello, giorni | `js/coach/programma/ricette.js` (`buildProgram`) e le tabelle di conoscenza in `motore.js` / `schemi.js` (`SLOT_DEF`, `PRIORI`, `SCHEMI_MOV`…) | RIC-03: `IN_ALLUNGAMENTO_NUOVI` e `SCAMBI_ALLUNGAMENTO_NUOVI` in `schemi.js`, accesi da `regolaAttiva` dentro `inAllungamento()` |
| Un **metodo famoso**, una seduta pronta, una tecnica | `js/coach/metodi-momenti.js` / `metodi-epoca-oro.js` (`METODI`, voce `attenzione` onesta), `js/dati/schede-epoca-oro.js`, `TECNICHE` in regole-ricerca.js | EPO-03 `arnold6`; TEC-01 `piramide` |
| Un **fatto su un esercizio** (muscolo, attrezzo, presa) | `js/dati/dettagli-esercizi.js`, `libreria-esercizi.js` (cap. 16 della mappa: la stessa conoscenza è in più tabelle) | prove in `tests/muscoli.test.js` |
| Solo **testo o layout** (card, messaggio) | il file UI che lo mostra (`js/ui/oggi.js`, `js/coach/agente-consigli.js`…), niente codice di regola | `htmlControlloDolore` in dolore-mattina.js |
| Un **dato nuovo salvato** | `js/core/storage.js`, chiave `coach_plus_*` o `tz_*` (§3) | `coach_plus_aggiusti_<modalità>` |

Regole di scelta: (1) aggiungi un ramo alla funzione che già decide, invece di un nuovo wrapper (ogni wrapper è una dipendenza d'ordine nascosta); (2) se il generatore (`buildProgram`) tocca anche i **metodi famosi**, decidi e scrivi cosa succede con `prog.metodo` / `metodoAttivo` (ABB-07: «Non vale con un metodo»; la griglia di `coerenza-schede.js` salta i programmi con metodo, tranne `rr`); (3) una regola sui carichi e una sul generatore sono due consegne.

## 2. Anatomia di una regola

### 2.1 Codice e posto nella mappa
- **Formato**: tre lettere maiuscole + trattino + due cifre (`RIC-06`). Il catalogo lo legge con `^- \*\*([A-Z]{3}-\d{2})\*\* ` (`tools/genera-catalogo.js`): la riga deve stare **a inizio riga, su una riga sola**; due lettere (come `IA-01..05`) o tre cifre → **non entra** in `COACH_REGOLE` e `regolaDescritta()` dà null. Un codice ripetuto fa fallire `npm run catalogo`.
- **Non esiste un registro dei codici**: la mappa `docs/coach-mappa-regole.md` è l'unica fonte. Il titolo del capitolo `## N.` sotto cui metti la riga diventa l'`area` del catalogo. Prossimo numero: `grep -oE '^- \*\*RIC-[0-9]+' docs/coach-mappa-regole.md | tail -1`. Le regole da ricerca vanno nel cap. 19 (RIC); le altre nel capitolo della loro area (ABB cap. 5, EPO/TEC cap. 6, INT cap. 11…).
- **Area nuova** = prefisso di 3 lettere mai usato (`grep -c '\*\*XXX-' docs/coach-mappa-regole.md` deve dare 0), una riga nella tabella del cap. 1 (oggi non elenca ABB, INT, EPO, TEC, RIC: completala se ci passi) e una riga nel cap. 20 «Dove sta il codice».
- **Nel codice**: ogni punto che implementa la regola cita il codice in un commento (`/* RIC-05: ... */`) e il blocco di testa del file elenca i codici (come `regole-nuove.js`, `intensita.js`, `struttura-pro.js`). `grep -rn "RIC-06" js tests docs` deve ritrovare codice, mappa e prova.
- **File nuovo**: deve **iniziare** con `/* Titolo breve (CODICI)` e seconda riga `   (3in, parte di coach; ordine di caricamento: vedi index.html) */`; la prima riga diventa la descrizione in `docs/indice-codice.md` (senza asterischi dentro).

### 2.2 Campi che ogni regola porta
| Campo | Come |
|---|---|
| **Motivo** (italiano, per l'utente) | Nei carichi: `r.motivo += ' • ...'` (si vede come `coachNote` in `seduta.js`, passa da `escapeHtml`, solo con `coachAttivo()`); nelle decisioni: `testo`; nelle azioni: messaggio di `showUndo`. Dice cosa è cambiato e perché, in poche parole, senza numeri non spiegati. Esempio: `' • settimana centrale del blocco, muscolo prioritario: +1 serie (si torna indietro con lo scarico)'` |
| **Fonte** | Nella riga della mappa, tra parentesi, autore e anno (`Singer 2024`); la nota estesa in `docs/ricerca-*.md` |
| **Forza** (Solida / Moderata / Convenzione) | Nella colonna «Forza» della nota di ricerca (modello: `docs/ricerca-struttura-e-intensita.md`); se è Convenzione scrivi «(convenzione)» nella riga della mappa (come ABB-07). Nel codice non esiste un campo `forza`: non inventarlo. Fonte unica secondaria = Convenzione, non diventa regola che spinge oltre |
| **Annullabile** | Se la regola scrive dati: fotografa le chiavi prima (`localStorage.getItem(dataKey())`, `AGG_KEY()`, `restKey()`), restituisci la funzione di ripristino e mostra `showUndo(msg, annulla, ms)`. Modelli: `applicaDecisioni` (restituisce la funzione di annulla), `applicaProntezza`, `conAnnulla` in repertorio.js |
| **Consenso** | Agisce solo con `coachAttivo()` (`js/core/consenso.js`, `tz_consenso === 'si'`). Di norma lo controlla il punto d'ingresso (`applicaCaricoProgressivo`, `applicaProntezza`); `caricoProssimo` è chiamata anche da `renderOggi` e `renderAgent`, che controllano da sé. Una funzione nuova che scrive dati o è un nuovo ingresso controlla `coachAttivo()` lei (come `limitaTecnicheIntense`) |
| **Spegnibile** | Per le regole nuove da ricerca: codice in `REGOLE_SPEGNIBILI` (`parametri.js`) + `regolaAttiva('XXX-NN')`; aggiorna anche l'intro del cap. 19 («Cinque regole nuove…»). Le regole storiche restano sempre accese |
| **Salvaguardie** | Non scatta o attenua per chi è `cauto` (§6) |
| **Niente affermazioni mediche** | §6 |

### 2.3 Soglie
- Mai numeri magici nel corpo della funzione: una costante con nome in italiano, in `COACH_PARAMETRI` se la usano più regole/file, altrimenti nella tabella dell'area, con un commento `/* XXX-NN: cosa è, fonte */`. Non imitare `regole-nuove.js`, che ha ancora `14`, `0.75`, `45` in linea (`docs/PIANO.md`: «soglie minori dentro le funzioni» da portare via).
- Prima di aggiungere una soglia per un concetto che esiste già **cercalo**: `grep -rn "0\.3[0-9]\|32" js/coach` non basta, usa il nome del concetto. Il cap. 17 n. 3 della mappa elenca già «grasso alto» (30/32/35%), «massa magra in calo» (-0,5 e -1 kg) e due definizioni di scarico con soglie diverse: non crearne una quarta.
- Se cambi un valore, aggiorna la riga della mappa (che dice i numeri) e i commenti vicini: il cap. 17 n. 4 elenca commenti che contraddicono il codice (SUG, `schemaMisto`, -5%/-10% in CAR-07).

### 2.4 Avvolgere una funzione e l'ordine di caricamento
Catena attuale (vale **l'ultima versione caricata**):

```
caricoProssimoBase (regole-ricerca.js) → window.caricoProssimo (dolore-mattina.js: aggiusti, scarico del coach, testoRir)
   → wrapper regole-nuove.js (RIC-01/02/05) → wrapper intensita.js (INT-04)
applicaCaricoProgressivo: regole-ricerca.js → regole-nuove.js (limitaTecnicheIntense, RIC-04)
applicaProntezza: prontezza.js → regole-nuove.js        imparaDallaSeduta: regole-ricerca.js → intensita.js (INT-05)
```
- **Schema**: `const _fPrimaXxx = window.f; window.f = function(...a) { const r = _fPrimaXxx(...a); /* correttivo */ return r; };` oppure, per una `function f` dichiarata, `const _prima = f; f = function(...)` (intensita.js, `imparaDallaSeduta`).
- Il nome catturato (`_caricoProssimoPrima`) è **un nome globale**: deve essere unico in tutta l'app (intensita.js usa `_caricoProssimoPrimaInt` per questo). Due `const` uguali in file diversi = errore di sintassi al caricamento del secondo file.
- Il file che avvolge deve stare **dopo** quello che definisce la funzione (e dopo gli altri wrapper che vuoi vedere) in `index.html`. `npm run simboli -- --check` (dentro `npm run controlla`) fallisce se un file usa al caricamento un nome definito più avanti; **non sa** in che ordine stanno due wrapper tra loro: quello lo decidi tu. Un wrapper nuovo di `caricoProssimo` va in coda (dopo `intensita.js`) salvo ragioni scritte.
- Ogni strato vede il risultato dei precedenti: `r.motivo` contiene già i pezzi aggiunti prima (separati da ` • `, compreso `testoRir`), `r.tipo` può già essere `'scarico'`. Parti con le guardie di RIC: `if (!r || r.tipo === 'scarico' || isTimeBased(nome)) return r;`. Restituisci **la stessa forma** `{ weight, reps, sets, tipo ('su'|'fermo'|'giu'|'scarico'|'nuovo'), motivo, piuPausa?, stallo? }`: `applicaCaricoProgressivo` e le schermate la leggono.
- Dopo l'edit: `npm run -s trova -- <funzione>` deve mostrare il tuo file in «riassegnato (avvolto) anche in». Aggiorna a mano (non sono generati) la tabella «Nomi in posti inattesi» di `docs/mappa-per-agenti.md` e la regola 2 di `docs/ARCHITETTURA.md`; l'elenco in testa a `docs/mappa-simboli.md` lo rigenera `npm run simboli`.

## 3. Invarianti (si rompono in silenzio)
- **Script classici, nessun modulo**: niente `import`/`export`. Tutto comunica per nomi globali. Per gli `onclick="f()"` si scrive `window.f = function` (o `function f`); un `const f = () =>` non è nella convenzione.
- **Un nome = un file**: nessuna `function`/`const`/`let` di primo livello definita in due file (`tests/struttura.test.js`; **non** vede due `window.f = ...` uguali, né i nomi catturati dai wrapper: occhio tu).
- **File nuovo** = una riga `<script src>` in `index.html` al posto giusto dell'ordine + `npm run sw`. Ogni `js/` e `css/` non citato in `index.html` è «orfano» e fa fallire `npm test`. `js/avvio.js` resta ultimo.
- **`CACHE_NAME` in `sw.js`** (oggi `3in-v11`): si alza **a mano** (`3in-v12`) quando cambiano file dell'app (js, css, index.html, esercizi/), una volta per consegna; `npm run sw` riscrive solo l'elenco dei file e **non** lo cambia. Il service worker è network-first: il nome protegge le copie offline vecchie. Alzarlo dopo `npm run grafo` rende il grafo vecchio (l'impronta include `sw.js`): alzalo prima.
- **File generati, mai a mano**: `sw.js` (elenco asset), `js/coach/catalogo-regole.js`, `docs/indice-codice.md`, `docs/mappa-simboli.md`, `graphify-out/`. Si rigenerano con gli script (§7). `docs/mappa-simboli.md` contiene i **numeri di riga**: anche solo aggiungere una riga a un file js la invecchia.
- **Chiavi dati**: `coach_plus_*` o `tz_*` (per modalità: suffisso `_<currentMode>`). Il backup (`js/core/backup.js`) prende per **prefisso** `^(coach_plus|tz_)`: una chiave con altro prefisso non viene salvata; una chiave temporanea va in `CHIAVI_TEMPORANEE`; un consenso va in `CHIAVI_NON_RIPRISTINABILI`. **Non rinominare mai `_toji`** (identificativo storico: utenti perderebbero schede e storico) né l'UID `@tojiworkout`.
- **HTML**: ogni testo che arriva da dati (nomi di esercizio, titoli) passa da `escapeHtml()`; negli `onclick` con nomi usa `jsArg()` (`docs/SICUREZZA.md`, `tests/browser/sicurezza.js`).
- **Italiano nel codice**: testo e nomi in italiano. Il codice vecchio ha frasi senza accenti (`piu`, `l ultima`); le frasi **nuove** vanno con accenti e apostrofo tipografico (`più`, `l’ultima`) come in `intensita.js`. Non «correggere» una frase esistente senza cambiare la chiave nei tre dizionari (§4).

## 4. Frasi nuove e traduzioni (en, es, de)
- Il traduttore (`js/lingue/traduttore.js`) cerca la **frase italiana identica** come chiave in `js/lingue/en.js`, `es.js`, `de.js`. Una voce per riga: `"testo italiano": "traduzione",`. Si aggiunge **in fondo, prima di `};`**, e la vecchia ultima riga (che non ha la virgola) la prende. Virgolette interne con `\"`.
- Numeri: nella chiave diventano `#` (`"rientro dopo # giorni"`); lo stesso vale per `+20%` → `+#%`. Valori che non sono numeri (nomi, date): `trP('frase con %s', valore)` e `%s` nella chiave. Maiuscola/minuscola iniziale: basta una voce.
- Le frasi composte con ` • `, ` · `, ` — `, ` – `, ` → `, `: `, ` / `, `, ` si traducono **a pezzi**: aggiungi come voce il pezzo tra ` • ` (frase intera, traduzione naturale), con i numeri come `#`. Tutti i pezzi del `motivo` devono avere la voce, anche quelli aggiunti dagli altri strati.
- **Come si verifica (il rilevatore ufficiale è cieco)**: `npm test` controlla solo che en, es e de abbiano le **stesse chiavi** tra loro (en→es/de), non che una frase del codice abbia la voce. `window.__i18nMancanti` (usato da qualche prova in browser) registra una frase solo se **nessun** pezzo è tradotto: se un pezzo c'è e un altro no, `tr()` restituisce un misto italiano/inglese e il Set resta vuoto. Usa invece:

  ```
  node .claude/skills/implementa-regola-coach/references/controlla-traduzioni.js --frasi "frase uno" "frase due"
  node .claude/skills/implementa-regola-coach/references/controlla-traduzioni.js "(()=>{ /* prepara profilo e storico */ return caricoProssimo(nome,60,8,4).motivo; })()"
  ```
  Spezza come `trCore`, controlla en/es/de (browser con consenso acceso) ed esce con 1 se manca un pezzo. Eseguilo con **ogni** `motivo`/`testo` che la regola può produrre, nei rami principali.
- Traduci con le regole della salute (§6): stessa prudenza e stesso invito al medico in tutte le lingue, nessun termine diagnostico nuovo. In spagnolo non usare «agujetas» per la dolenzia (`tests/struttura.test.js`).

## 5. Test
**Cosa copre cosa**

| Comando | Cosa fa davvero |
|---|---|
| `npm test` (~30 s) | solo i 4 file elencati nello script `test` di `package.json`: `struttura.test.js` (sintassi, un nome un file, nessun file orfano, `sw.js`, parità en/es/de, consenso IA tradotto, regole audio), `muscoli.test.js` (vm), `avvio.test.js` (avvio in Chromium senza errori; saltato se manca il browser), `cedimento.test.js` |
| `npm run controlla` (~35 s) | `sw -- --check`, `catalogo -- --check`, `indice -- --check`, `simboli -- --check` (anche l'ordine degli script) e `npm test`. **Non** lancia `tests/browser/`, **non** controlla il grafo (`npm run grafo:verifica`), **non** controlla le traduzioni delle frasi nuove, **non** controlla `CACHE_NAME` |
| `npm run test:browser` | un file alla volta in `tests/browser/` (Playwright + Chromium) ma si **ferma al primo che fallisce**; `intensita-bia.js` fallisce già da prima (8 prove di INT-05 su `bilancioPrimeSedute`: non è una regressione) e viene prima di altri 13 file (`macchinario-occupato*` ×4, `metodi-epoca-oro`, `prove-biomeccaniche`, `recupero-contrasto`, `regole-nuove`, `ripetizioni`, `scheda-unica`, `sicurezza`, `statistiche`, `traduzioni-esercizi`), che così con questo comando non girano mai |

Per vedere tutto: `for f in tests/browser/*.js; do node "$f" >/dev/null 2>&1 || echo "FALLITO $f"; done` (alcuni minuti): deve restare solo `intensita-bia.js`. Una prova sola: `node tests/browser/regole-nuove.js` (2 s). Chromium: `CHROMIUM=/percorso` se non è in `/opt/pw-browsers/chromium`.

**Quasi nessuna regola ha un test in `npm test`.** Non hanno prove: `decisioniCoach`, `applicaDecisioni`, `applicaProntezza`, mi-sento-male, `eserciziFermi`, strain, `sedutaSaltata`, ciclo, `analyzeBia`, `corpoCoach`, `suggestNextExercises`. Se tocchi quell'area la prova la scrivi tu.

**Prova di una regola (stile unitario, senza browser)**: copia `references/modello-test-regola.js` in `tests/<nome>.test.js`, cambia i casi e **aggiungi il file allo script `test` di `package.json`** (altrimenti non parte mai). Carica tutti gli script dell'app in una `vm` con `document` finto e `localStorage` in memoria (provato: 108 script, parte in meno di un secondo) e chiama le funzioni vere (`caricoProssimo`, `buildProgram`, `decisioniCoach`) con tutti gli strati dei wrapper. Per ogni regola scrivi almeno: scatta nel caso giusto; non scatta al limite (un giorno/serie prima); non scatta per `cauto`/principiante/over 65 se è un aumento; spenta con `REGOLE_SPENTE_KEY` non scatta; senza consenso non agisce; il `motivo` c'è. Per DOM, tocchi e traduttore sulla pagina: stile `tests/browser/regole-nuove.js` (Playwright, `tz_consenso=si`, `tz_onb=1`, `tz_guida_vista=1`, `serviceWorkers:'block'`; ogni prova stampa `ok`/`FALLITO` e imposta `process.exitCode`).

**Fixture**: nel profilo salvato `parq` è un **booleano** (`true`/`false`); la stringa `'no'` conta come modalità prudente (`!!'no'` è vero in `profiloCoach()`). `buildProgram` invece accetta `'si'`/`'no'`/booleano. `profiloCoach().eta` vale **0 se l'età manca**: `eta < 18` include chi non l'ha detta. Le date: costruisci le sedute con `Date.now() - giorni*86400000`, mai date fisse.

**Esercitare la regola nella griglia dei profili** (`tests/browser/coerenza-schede.js`, ~500 profili: livello × giorni × obiettivi × luogo × minuti, `seme: 'audit'` fisso per ripetibilità): per una regola del **generatore** aggiungi un blocco dentro il ciclo `sed.forEach` (per seduta) o dopo `const tutti = ...` (per settimana), con il codice nel commento (`/* ABB-xx */`) e `segna('XXX-NN cosa non va', prof, dettaglio)` per ogni violazione (la prova fallisce se ce n'è una). La griglia **non varia** sesso, età, `parq`, fastidi, sonno (fissi: `M`, 30, nessuno, `bene`): se la tua regola ha rami di prudenza aggiungi una seconda griglia con `age: 70`, `parq: 'si'`, `sex: 'F'`, `fastidi: ['spalle']`, `sonno: 'male'`. Con un metodo famoso (`prog.metodo`) il ciclo esce prima: scrivi cosa ti aspetti.

## 6. Sicurezza dei contenuti fitness
L'app **informa, non diagnostica e non prescrive**; «non è un dispositivo medico: nessuna promessa di salute» (`docs/PIANO.md`, fase 5). Il cap. 14 della mappa elenca già le salvaguardie: modalità prudente, over 65, dolore, «Mi sento male», momenti di vita, BIA, nutrizione come informazione. Una regola nuova le **rispetta e non le scavalca**:
- **Conservativa per costruzione**: soglie che alzano la prudenza (più riposo, meno carico, invito a fermarsi), mai che spingono oltre. Nel dubbio il valore più prudente; la regola non scatta (o dimezza l'aumento, come CAR-06) per `cauto` = over 65 oppure PAR-Q positivo (`profiloCoach().prudente`), per `sonnoMale`, e per i principianti se aumenta carico, volume o intensità. Precedenza invariata: modalità prudente, over 65, principianti, dolore e scarico vincono sulle regole nuove (`esigenzaEsclusa()` in `esigenza.js` ne è il modello).
- **Soglia di rinvio al medico scritta nel motivo** per ogni segnale rosso: dolore acuto o che peggiora, dolore al petto, capogiri o svenimenti, fiato corto sproporzionato, formicolii o perdita di forza improvvisi, gonfiore articolare, urine scure dopo una seduta intensa. Formule già nel repo da riusare: «fatti vedere da un medico o da un fisioterapista» (DEC-03/04), «È una misura di prudenza, non una diagnosi» (INT-01), «parlane con il medico» (BIA, MOM-05). Il tipo `medico` di `decisioniCoach` è il modello.
- **Minorenni**: oggi nel coach **non c'è un ramo under 18** (ricevono un programma da adulto; `statoBia` ignora solo il riferimento dell'angolo di fase sotto i 18). Una regola che spinge volume, intensità, carichi massimali o dimagrimento deve **escludere `eta > 0 && eta < 18`** e non assumere l'adulto; suggerisci un adulto/tecnico qualificato nel testo.
- **Gravidanza e post-parto**: passa solo dal PAR-Q («gravidanza o parto recente» → modalità prudente). Nessun consiglio nuovo su addome, posizioni supine o intensità senza il via libera del medico (modello: il momento `bambino` in `MOMENTI`, `metodi-momenti.js`: «12 settimane di attività leggera… poi si riparte con il via libera del medico»).
- **Over 65**: 8-12 ripetizioni, niente cedimento, 3-4 RIR, aumenti dimezzati, giorni di pausa contati doppi (`rientroDopoPausa`): una regola nuova segue gli stessi numeri o è più prudente.
- **Infortuni e dolore**: mai alzare il carico su un esercizio che ha dato dolore (`aggiusti`), mai chiedere di «allenarsi attraverso» un dolore ≥ 4/10; il fastidio lieve (≤ 3/10) si osserva e si rivaluta la mattina dopo (DOL-01).
- **Disturbi alimentari**: nessun obiettivo calorico o di peso aggressivo, nessun «brucia», «punizione», «compensa»; niente rinforzo di perdite rapide o di bassa massa grassa (BIA-02: donne sotto il 17% → «da monitorare con un medico»). Il repo dà già un ritmo (COR-01: 0,5-1% a settimana, «il peso scende poco…»): **non estenderlo** e non aggiungere traguardi numerici nuovi; se un utente scende troppo in fretta o è già in fascia bassa, il messaggio frena e rinvia a un professionista.
- **Linguaggio**: mai vergogna, colpa, confronto o pressione («pigro», «devi», «hai fallito», «troppo grasso»). Modelli del repo: «Anche solo muoversi conta.», «chiedere aiuto è un gesto di forza», seduta saltata = scelte neutre (SAL-01). Un invito a fermarsi vale più di un obiettivo mancato.
- **Dati e invii**: ciò che esce dal telefono è solo il Coach IA con consenso separato (`TESTI_IA`, `tests/struttura.test.js`): una regola che aggiunge dati a quell'invio cambia il testo del consenso e le sue traduzioni.

## 7. Definizione di fatto (in quest'ordine)
Il catalogo si genera **dalla mappa**: la mappa va scritta prima. Il grafo tiene l'impronta di codice, `docs/` (tranne i due file generati) e `sw.js`: va generato **per ultimo**.

1. **Implementa** (§1-3): codice, parametro, commenti con il codice della regola; file nuovo = riga in `index.html` (al posto giusto) con intestazione del §2.1.
2. **Frasi** in `en.js`, `es.js`, `de.js` e `controlla-traduzioni.js` pulito (§4).
3. **Test** (§5): prova nuova + registrata in `package.json` se è `*.test.js`; `node tests/browser/<prova>.js` per quelle in browser.
4. **Documenti a mano**: `docs/coach-mappa-regole.md` (la riga `- **XXX-NN** ...` con quando scatta, cosa fa, fonte; il cap. 19 con intro e conteggio; cap. 1 e 20 se area o file nuovi; cap. 17 se togli o crei un'incoerenza), la nota `docs/ricerca-*.md` con la forza, `docs/mappa-per-agenti.md` / `ARCHITETTURA.md` se hai avvolto una funzione o cambiato il flusso.
5. **Rigenera**: `npm run catalogo` (dopo la mappa), `npm run indice` (nuove funzioni o file), `npm run simboli` (dopo ogni edit a un js o a un test: numeri di riga), `npm run sw` (se hai aggiunto o tolto file).
6. **`CACHE_NAME`** in `sw.js` +1 se hai cambiato file dell'app (§3).
7. **`npm run controlla`** deve passare (da solo non prova il browser: lancia anche le prove in browser dell'area che hai toccato).
8. **Grafo**: `npm run grafo` (rigenera anche `docs/mappa-simboli.md`, ~10 s) e poi `npm run grafo:verifica` → «grafo aggiornato». Serve graphify: `python3 -m venv /tmp/gfy && /tmp/gfy/bin/pip install graphifyy` una volta (provato: graphifyy 0.9.76 in ~10 s tramite il proxy); il binario si cerca in `$GRAPHIFY`, nel `PATH`, in `/tmp/gfy/bin/graphify`. Non basta `graphify update .` (perde i nomi italiani). **Se pip non raggiunge la rete**: (a) `curl -sS "$HTTPS_PROXY/__agentproxy/status"` e `/root/.ccr/README.md`; riprova con `PIP_CERT=/root/.ccr/ca-bundle.crt`; (b) cerca un binario già presente (`which graphify`, `ls /tmp/gfy/bin`) e usa `GRAPHIFY=/percorso npm run grafo`; (c) se non c'è modo, **non toccare `graphify-out/` a mano e non copiarlo da altrove**: lancia comunque `npm run simboli` e `npm run indice`, scrivi nel messaggio di commit e nel report che «`npm run grafo` è da fare» (`grafo:verifica` fallisce) e lascia il compito a chi ha la rete.
9. **Commit** (solo se richiesto), sul ramo indicato dal compito (`git branch --show-current` per controllare), mai su `main`, mai `--force`: messaggio in italiano, una riga senza punto finale, nella forma già usata nel log: `Area: cosa cambia` (`Coach: schede professionali, intensità da BIA e prime sedute, epoca d'oro`) oppure verbo alla terza persona (`Aggiunge…`, `Aggiorna…`, `Alza CACHE_NAME a 3in-v12 per…`); corpo con elenco puntato se serve; chiudi con le righe di attribuzione che l'ambiente richiede. Una consegna = un argomento. **Push** solo al ramo designato (`git push -u origin <ramo>`); PR solo se richiesta.

## 8. Errori tipici (visti in questo repo)
- **File generati lasciati indietro**: `docs/mappa-simboli.md` era già invecchiata dopo la PR #16 (cambiate le righe di `js/dati/disegni-esercizi.js`) e `npm run controlla` falliva; `CACHE_NAME` e grafo erano stati sistemati dopo, a parte (commit `4aa2078`, `e03e01c`, `76f0f31`). Il passo 5-8 del §7 si fa **sempre**, e si guarda l'esito.
- **Prova non registrata**: un `tests/*.test.js` fuori da `package.json` non gira; una prova in `tests/browser/` dopo `intensita-bia.js` non gira con `npm run test:browser`.
- **Motivo senza traduzione**: i motivi di RIC-01, RIC-02 e RIC-05 non hanno voce in en/es/de (nessun test se ne accorge): in inglese compaiono in italiano accanto alla parte tradotta.
- **Numeri magici e soglie doppie**: copiare lo stile di `regole-nuove.js` (14, 0.75, 45 in linea) crea il guaio del cap. 17 n. 3 (grasso alto a 30/32/35%).
- **Commenti che mentono**: SUG elenca 5 regole e il codice ne applica 8; `schemaMisto` si contraddice; CAR-07 dice -10% e il principiante prende -5%. Cambi il codice, cambi commento e riga della mappa.
- **Regola non spegnibile, senza consenso o non annullabile**: dimenticare `regolaAttiva`, `coachAttivo()` o lo snapshot dell'annulla; scrivere dati senza `showUndo`.
- **Wrapper**: nome catturato duplicato (`const _caricoProssimoPrima` due volte), file messo prima della funzione che avvolge, strato che ignora `r.tipo === 'scarico'` e manda in basso un carico già ridotto, forma del risultato cambiata.
- **`parq` stringa nel profilo** (`'no'` = prudente) ed **età 0 = minorenne** nei controlli `eta < 18`.
- **Frase italiana «corretta» senza il dizionario**: la chiave è il testo identico; cambiarlo disattiva le tre traduzioni senza errori.
- **Generatore e metodi famosi**: una regola di `buildProgram` che non dice cosa fa con `prog.metodo` / `essenziale` cambia schede famose senza che le prove lo dicano.
- **Prove che non esercitano il ramo di prudenza**: la griglia di `coerenza-schede.js` ha sempre adulto, uomo, sano; un ramo `cauto` nuovo resta non provato.
- **Edit a mano dei file generati** o `graphify update .` da solo: perdono nomi e legami; usa `npm run grafo`.
- **Mescolare argomenti** (ristrutturazione + regola + immagini nello stesso commit): contro `docs/PIANO.md`.

## Registro degli apprendimenti
Chi usa questa skill aggiunge **in coda** una riga: `- AAAA-MM-GG | cosa | esito / consiglio`.

- 2026-10-05 | `npm run controlla` sull'albero di partenza | Fallisce a `simboli -- --check`: `docs/mappa-simboli.md` non aggiornata (righe di `disegni-esercizi.js`, `immagineEsercizio`/`slotImmagine`). `sw`, `catalogo` (173 regole) e `indice` passano; `npm test` 43/43. Servono `npm install` (acorn, playwright-core) prima di tutto.
- 2026-10-05 | `npm run test:browser` | Si ferma a `intensita-bia.js` (8 prove INT-05 fallite, preesistente). Le altre 20 prove, lanciate una per una, passano.
- 2026-10-05 | `npm run grafo` in una copia di lavoro con graphify in un venv (`GRAPHIFY=<venv>/bin/graphify`) | ~10 s, «grafo aggiornato» alla verifica; dopo una modifica solo a `docs/coach-mappa-regole.md` `grafo:verifica` torna a fallire.
- 2026-10-05 | Prova unitaria in `vm` con tutti gli script (`references/modello-test-regola.js`) | 4/4 verdi; registrata in `package.json` fa salire `npm test` da 43 a 47 prove.
- 2026-10-05 | Rilevatore `__i18nMancanti` | Cieco alle frasi composte con un pezzo tradotto: usare `references/controlla-traduzioni.js`.
