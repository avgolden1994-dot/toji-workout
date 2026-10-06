# CLAUDE.md

Linee guida per Claude Code su questo repository (toji-workout).

## Delegation

- Never do the work yourself. Always dispatch a sub-agent.
- One sub-agent per task, plan first
- Run independent sub-agents in parallel
- Read the report, never the files

## Model routing

- Opus 5.5: architecture, hard bugs, review
- Sonnet 5.5: edits, tests, docs, refactors (also use Sonnet 5.5 for easier tasks)
- Haiku 4.5: lookups and summaries
- Pass `model` on every Agent call

## Project context & code search

- This file is the project context for toji-workout: it lives in the repo (saved locally and versioned).
- Always consult the graph report FIRST (`graphify-out/GRAPH_REPORT.md`), before re-reading any code.
- The report and the graph (`graphify-out/`) are versioned in the repo (gitignored: `graphify-out/cache/`, graphify's hidden local files `graphify-out/.graphify_*` and its dated backups) and are up to date with the code (`npm run grafo:verifica`).
- Use the graph (`graphify query` / `path` / `explain`) to search actively; read only the files/nodes actually needed. No broad reads of the code base.
- When modifying code: locate the affected nodes via the graph/report, then open only those files.
- If code changes make the graph stale, update it incrementally with `npm run grafo` (= `graphify update .` + global-name links + Italian community names; plain `graphify update .` loses the names), never rebuild from scratch, and commit the refreshed `graphify-out/` and `docs/mappa-simboli.md`.
- Delegation rules above still apply: sub-agents do the work and read reports, not files.

## Architettura in breve

- **App**: PWA "3in" senza build né server: `index.html` carica in ordine ~110 script classici (`<script src>`); niente moduli, tutto comunica con **nomi globali** (`function f`, `const X`, `window.f = function` per gli `onclick="f()"`). Un nome = un file (`npm test`). Testo e nomi in italiano; frasi nuove anche in `js/lingue/en|es|de.js`.
- **Strati** (ordine di caricamento): `js/lingue/` (traduttore, `tr()`) → `js/core/` (costanti, `stato-condiviso.js`, `storage.js`, modalità, navigazione, utility, audio, nativo, backup, consenso) → `js/dati/` (libreria esercizi, dettagli e muscolo bersaglio, schede pronte/tecniche, disegni) → `js/coach/` (motore a regole, una cartella per sotto-coach: `regia/` fasi-brief-genera-perché-soglie, `programma/` motore-schemi-ricette-struttura-pro-completamenti-mesociclo, `volume/`, `sicurezza/`, `carichi/`, `bia/`, regole) e `js/ui/` (schermate: oggi, piano/, allenamento/, musica/, calendario/, progressi/, opzioni/) → `js/avvio.js` per ultimo. Stile in `css/`, un file per area.
- **Ordine**: quasi tutto gira dopo l'avvio; i pochi vincoli al caricamento (oggi: `registraFase` di `js/coach/regia/fasi.js`, caricato subito dopo `parametri.js`) sono elencati in testa a `docs/mappa-simboli.md` e controllati da `npm run controlla`. **Niente wrapper**: nessun file riassegna una funzione di un altro file; le catene dei carichi (`caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta`) sono *fasi registrate* con un ordine scritto (`registraFase('carico', 60, 'RIC', fn)`). File nuovo = riga in `index.html` + `npm run sw`.
- **Dati**: localStorage `coach_plus_*`/`tz_*` via `js/core/storage.js` (non rinominare `_toji`); MP3 e foto in IndexedDB.
- **Dove sta cosa** (dettagli e flussi in `docs/mappa-per-agenti.md`): seduta `js/ui/allenamento/{sessione,seduta}.js`; cedimento `allenamento/cedimento*.js` + `js/ui/musica/` + `js/core/musica-altre-app.js`; macchinario occupato e spunta serie `allenamento/macchinario-occupato.js`; alternative per muscolo `js/coach/programma/motore.js` + `js/dati/dettagli-esercizi.js`; programma: `js/ui/onboarding*.js` → `buildProgram` in `js/coach/regia/genera.js` (a stadi: brief in `regia/brief.js`, posti in `programma/ricette.js`, completamenti in `programma/completamenti.js`, volume in `volume/volume.js`, tempo `volume/tempo.js`, serie `volume/serie-ripetizioni.js`, tecniche `volume/tecniche.js`, limiti di sicurezza `sicurezza/vincoli.js`, mesociclo `programma/mesociclo.js`); catene dei carichi in `js/coach/regia/fasi.js` (le fasi: `docs/mappa-per-agenti.md`); esercizi e attributi (classe, schema, crediti, stress per zona, attrezzo) `js/dati/libreria-esercizi.js` + `dettagli-esercizi.js` + `attributi-esercizi.js`; regole coach `js/coach/` + `docs/coach-mappa-regole.md`, il cui **capitolo 0** è la squadra dei sotto-coach (ogni codice ha il suo sotto-coach; `sottoCoachDi(codice)`). Un numero nuovo del coach va in un file `soglie-*.js` della cartella del suo sotto-coach (voce `{ v, forza, fonte, regole }`): `npm run soglie` scrive `docs/soglie-coach.md` e `npm run soglie -- --check` (dentro `controlla`) lo controlla.
- **Generati (non modificare a mano)**: `sw.js` (elenco file, `npm run sw`), `js/coach/catalogo-regole.js` (`npm run catalogo`), `docs/indice-codice.md` (`npm run indice`), `docs/mappa-simboli.md` (`npm run simboli`), `docs/soglie-coach.md` (`npm run soglie`), `graphify-out/` (`npm run grafo`; nomi community in `tools/grafo-nomi.json`). Cambiando file dell'app alza `CACHE_NAME` in `sw.js`.
- **Comandi**: `npm run controlla` (sw, catalogo, soglie, indice, mappa simboli + `npm test` + autotest di cancello e integrazione, ~4 minuti) prima di ogni commit; `npm run test:browser` prove lunghe (le esegue tutte, 26 file, tutti verdi, circa 3-4 minuti: **da sole**, in parallelo a un collaudo qualche prova in browser diventa instabile). Collaudo del generatore e cancello per onda: skill `collaudo-generatore-schede` (`npm run collaudo:schede`, `npm run cancello`). Grafo: `python3 -m venv /tmp/gfy && /tmp/gfy/bin/pip install graphifyy` una volta, poi `npm run grafo`; `npm run grafo:verifica` dice se è aggiornato (senza graphify).

### Come cercare (senza rileggere il codice)

1. `graphify-out/GRAPH_REPORT.md`: aree (community con nomi italiani) e nodi centrali.
2. Un nome: `npm run -s trova -- apriCedimento` → definizione `file:riga`, chi lo usa (anche `onclick`/markup), cosa usa, se è avvolto altrove. Un pezzo di nome elenca i simili.
3. Un concetto o un legame: `graphify explain "nome"`, `graphify query "parole" --budget 1500`, `graphify path "A" "B"` (binario: `/tmp/gfy/bin/graphify`).
4. Apri solo il `file:riga` indicato, con `offset`/`limit`; poi, se hai cambiato codice, `npm run simboli` (e `npm run grafo` se hai graphify).
