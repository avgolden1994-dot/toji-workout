# Piano coach v2: la squadra del coach

> Documento di progetto del 5 ottobre 2026 (ramo `claude/fitness-expertise-development-2pptmr`, dopo `f555dc4`). **Non cambia codice**: decide architettura, innovazioni, la regola «partenza bassa per le donne» e il lavoro a ondate (32 task + 6 integrazioni + revisione finale).
> Ingressi letti: gap analysis (24 bug B1-B24, 16 aree), `docs/coach-mappa-regole.md`, `docs/PIANO.md`, `docs/ARCHITETTURA.md`, `docs/mappa-per-agenti.md`, testa di `docs/mappa-simboli.md`, storia `git log` del coach, il codice di `js/coach/` e `js/dati/`, le note `docs/ricerca-*.md` (ipertrofia, forza, metodi avanzati, metodi dei coach, recupero e popolazioni, riscaldamento, psicologia, cardio e nutrizione, obiettivi, biomeccanica), lo strumento `tools/collaudo-generatore.js` e la skill `implementa-regola-coach`.

## 0. Cosa non si ridiscute e cosa non si rifà

**Decisioni prese (restano):** la BIA è una bandiera di prudenza, mai un motore di decisioni sui carichi (INT-01..03); il Coach IA commenta e non decide numeri, e non riceve dati nuovi senza cambiare `TESTI_IA`; tutto resta sul telefono e dietro `coachAttivo()`; ogni suggerimento ha un motivo scritto in italiano ed è annullabile; nuova decisione dell'utente: **carichi di partenza bassi per le donne fino al livello intermedio**, poi salita rapida (capitolo D).

**Già fatto, da non rifare:** un file per area e nomi globali (fase 1); catalogo generato dalla mappa, `COACH_PARAMETRI`, `regolaAttiva`, scheda unica (fase 2); RIC-01..05 spegnibili (fase 3); consenso del Coach IA completo (fase 4); ABB-01..10, INT-01..05, EPO/TEC (fase 4b); alternative e sostituti **solo con lo stesso muscolo bersaglio** (`alternativeStessoMuscolo`, commit `8f69a8d`); copia di sicurezza `backup/prima-del-riordino-coach-2026-10-01`. Il piano tiene questi principi e li porta sugli attributi degli esercizi.

**Codici:** le note di ricerca hanno già proposto prefissi liberi (IPE, PGR, AUT, STD, TAP, MAV, PCO, REC, RIS, CST, AER, NUT, PES, DCA, OBI, SEL). Il piano **usa quei codici** e ne aggiunge solo quattro: **REG** (regia), **FRZ** (modalità forza), **EST** (modalità estetica) e le estensioni **PAR-06..09**, **CAR-18..19** (donne). I codici esistenti non si rinumerano mai. Attenzione: lo strumento di collaudo ha un suo spazio di nomi (ERR, VOL, REC, TEC…): nel piano si scrive sempre «collaudo VOL-01» per distinguerli dalle regole.

---

## A. Diagnosi in 15 righe (in ordine di danno per l'utente)

1. **Il volume si conta su 7 gruppi grossi** con sinergisti sbagliati, mentre il modello a 24 muscoli (`MUSCOLI`/`DETTAGLI`) è ignorato: a 45 minuti 0 serie dirette di braccia, polpacci a 2 serie, petto a 8 (simulazione; collaudo MIS-01, DIR-01, MOD-07).
2. **Il tempo decide tutto ma è stimato male**: 8 min + serie × (35 s + pausa), senza riscaldamento, cambi, unilaterali; superserie aggiunte dopo i tagli. Sedute che sforano a 45 minuti e sprecano a 90 (B1, B5, collaudo DUR-01/02, MOD-08).
3. **Una sola settimana tipo ripetuta per 8-12 settimane**: nessuna rampa di volume, rampa di RIR solo per gli avanzati, principianti scaricati ogni 4ª settimana (B21, MOD-06, collaudo RIR-01).
4. **Un solo motore di carico per tutti**: incrementi assoluti, arrotondamento a 0,5 kg per ogni attrezzo, nessuna conversione carico↔ripetizioni, storico per nome e non per obiettivo di ripetizioni (B6, B7, B8, B17).
5. **Sforzo di base troppo aggressivo e segnali tarati male**: isolamenti a RIR 0 dalla seconda seduta per i principianti; «Dura» = seduta pesante = scarico; le settimane di scarico inquinano esigenza e stalli; +1 serie a ogni prontezza «normale» (B9, B11, B12, B18).
6. **Tecniche intense senza cancello di idoneità**: drop su Dead Bug, parziali sul Pallof, drop a 68 anni (B3, collaudo TEC-01).
7. **La conoscenza sugli esercizi sta in 14 tabelle e in regex sui nomi**: hinge = hip thrust, trap bar = quadricipiti, «corpo libero» che richiede la sbarra; nessun attributo (profilo di resistenza, stabilità, fatica, abilità, stress articolare) (B15, B16, MOD-01/04, P1-P17 della nota di biomeccanica).
8. **Sicurezza per esclusione e contraddittoria**: 3 zone di fastidio su 8, `RISCHIO` contro `STRESS_ZONA` contro `SCALE_DOLORE`, sostituzioni per dolore che cambiano muscolo, nessuna regola per i minorenni (B13, B14, B24, collaudo SAF-01, MOD-02/03).
9. **«Forza» non è powerlifting**: panca e squat pesanti una volta a settimana, nessuna onda, `STANDARD_FORZA` mai usata, livello che sale e non scende mai (B20, collaudo GOA-01).
10. **Le priorità lavorano su gruppi grossi**: «spalle» aggiunge serie di military invece di alzate laterali; nessun punto debole letto dai dati (collaudo PRI-01).
11. **Popolazioni ridotte a due interruttori** (cauto, over 65) e un fattore donne: partenza dei carichi non abbastanza prudente per le donne (decisione dell'utente), anziani bloccati a RIR 3-4 per sempre, nulla per gravidanza, ipertensione, obesità.
12. **Calibrazione del RIR sbagliata nel metodo** (ultima serie a cedimento contro l'RPE delle serie precedenti) e sRPE a 4 bottoni (B10).
13. **Niente cardio prescritto né regole anti-interferenza**, riscaldamento solo a mano, soglie doppie su grasso e massa magra (B23).
14. **Spiegazioni sparse**: il motivo è una stringa concatenata da strati che si avvolgono, senza legame codice→numero; i motivi di RIC-01/02/05 non sono tradotti.
15. **Architettura che rallenta ogni passo**: tre wrapper in catena con ordine di caricamento nascosto, `buildProgram` monolitico di 370 righe, soglie in sei tabelle diverse, nessun oggetto condiviso tra le parti del coach.

---

## B. Architettura di arrivo: la squadra del coach

### B.1 La squadra (8 sotto-coach e un regista)

Ogni regola (codice) appartiene a **un solo** sotto-coach. Il Regista non decide numeri di allenamento: fissa l'ordine, applica le precedenze, verifica il risultato e scrive il «perché».

| id | Nome | Missione (una riga per l'utente) | Codici che possiede | File (esistenti → nuovi) |
|---|---|---|---|---|
| `regista` | **Il Regista** | «Metto insieme il lavoro della squadra, controllo che il programma regga e ti spiego perché.» | LIV-01..02, CIC-01..02, STD-01..02, **REG-01..06** | → `js/coach/regia/` (brief, genera, fasi, perche, migrazione) |
| `architetto` | **L'Architetto** | «Decido i giorni, la divisione, il ciclo di settimane e quali esercizi entrano.» | PRG-01..11, PRG-21..24, PRG-35, PRG-39, MET-01..06, EPO-01..07, ABB-01..10, SCH-01, STA-03, IPE-05, IPE-07, IPE-09, PCO-02, PCO-05, PCO-07, PCO-09, OBI-01, OBI-03, OBI-10, OBI-12, SEL-03..04, SEL-06..08, SEL-13, SEL-15..16 | `js/coach/programma/*`, `compone.js`, `metodi-momenti.js` (METODI), `metodi-epoca-oro.js`, `js/ui/onboarding.js` (split) |
| `dosatore` | **Il Dosatore** | «Decido quante serie fa ogni muscolo, ripetizioni e pause, e faccio stare tutto nei tuoi minuti.» | PRG-12..20, PRG-25..34, PRG-36..38, RIC-01, ESI-01..03, IPE-01..04, IPE-06, IPE-08, IPE-10..14, PCO-03..04, OBI-04, SEL-01, SEL-05, CST-08 | `esigenza.js` → `js/coach/volume/` |
| `bilancia` | **La Bilancia** | «Decido quanto sollevi: il carico di partenza, quando salire e di quanto.» | PAR-01..05, **PAR-06..09**, PRO-01..04, CAR-01..02, CAR-04..07, CAR-09, CAR-11..17, **CAR-18..19**, INT-04..05, RIC-02, STA-01..02, PGR-01..04, AUT-01..03, PCO-01, PCO-06 | `js/coach/carichi/*`, `regole-ricerca.js` (progressione), `dolore-mattina.js` (aggiusti) |
| `sentinella` | **La Sentinella** | «Controllo che ti alleni al sicuro e che recuperi: dolori, fatica, scarichi, età e salute.» | PRG-07, PRZ-01..05, DEC-01..10, DOL-01, BIO-02..03, BIO-06, INT-01..03, CAR-03, CAR-08, CAR-10, RIC-04..05, STR-01, MAV-01..14, MAV-16, REC-01..15, SEL-10..11, PCO-08, CST-01..02, CST-07, CST-09, DCA-01 | `prontezza.js`, `questionario-decisioni.js`, `mi-sento-male.js`, `intensita.js` (INT-01..03) → `js/coach/sicurezza/` |
| `tecnico` | **Il Tecnico** | «Conosco gli esercizi: muscoli, varianti, esecuzione, riscaldamento.» | SUG-01..08, BIO-01, BIO-04..05, BIO-07, TEC-01..07, SEL-02, SEL-12, RIS-01..13 (assorbono REC-10 e PCO-10) | `js/dati/*`, `biomeccanica.js`, `suggeritore.js`, `pannello.js`, `motore.js` (alternative) → `js/coach/tecnica/` |
| `preparatore` | **Il Preparatore** | «Penso al resto della settimana: cardio, passi, peso e composizione, solo come informazione.» | COR-01..03, BIA-01..03, MET-03, PRG-26 (da ritirare), AER-01..04, NUT-01..02, PES-01..04, DCA-02..03, OBI-02, OBI-05..09, OBI-11, OBI-17 | `js/coach/bia/*`, `repertorio.js` (corpoCoach), `compone.js` (fattoreFisico) → `js/coach/corpo/` |
| `motivatore` | **Il Motivatore** | «Ti conosco: come ti alleni meglio, cosa fare quando salti, il periodo che stai vivendo.» | PSI-01..12, MOM-01..06, SAL-01, ADE-01, ORA-01, IA-01..05, PRG-36, CST-03..06, CST-10..12, OBI-18 | `psicologia.js`, `metodi-momenti.js` (MOMENTI), `stato.js`, `coach-ia.js` → `js/coach/mente/` |
| `specialista` | **Lo Specialista** | «Se vuoi forza da powerlifting o un fisico da bodybuilding, preparo il percorso dedicato.» | **FRZ-01..10**, TAP-01, **EST-01..06**, MAV-15 | → `js/coach/specialita/` |

Le missioni sono le frasi che compaiono all'utente (Opzioni › Il coach › «La squadra del coach»).

### B.2 Il contratto: un `brief` che attraversa la squadra

Un oggetto semplice, passato come argomento (nessuna variabile globale nuova), costruito una volta per programma e, in forma leggera, a ogni apertura di seduta. Compatibile con gli script classici: sono solo funzioni globali che ricevono e restituiscono oggetti.

```js
/* js/coach/regia/brief.js — W1-T4 */
briefCoach(d, prof0) → {
  versione: 2, seme,
  chi:   { sesso: 'F'|'M'|null, donna, eta /* 0 = sconosciuta */, minorenne /* eta > 0 && eta < 18 */, over65,
           livello /* dichiarato o corretto da LIV/STD */, principiante, parq, cauto /* parq || over65 */ },
  obiettivi: { lista, primo, scheme /* schemaMisto */, fase /* OBI-02: deficit|massa|mantenimento|ricomposizione */,
               modalita: 'generale'|'forza'|'estetica' /* FRZ-01, EST-01 */, prioritaUnita: [] /* max 2, EST-02 */ },
  agenda: { giorni, minuti, luogo, attrezziPalestra, passiPalestra /* W3-T1 */, freqScelta, indiciGiorni },
  preferenze: { graditi, odiati, attrezzi, varieta },
  corpo: { fis /* fattoreFisico: solo prudenza */, statoBia /* INT-01 */, massa /* contestoCarichi */ },
  mente: { ps /* psicoCoach */, momento /* momentoAttivo */, esigenza },
  sicurezza: { fastidi, vincoli: null /* riempito da vincoliSicurezza(brief), Sentinella */ },
  metodo: { attivo, tocco, ispirazioni },
  test: { /* prove fai-da-te */ },
  perche: []            /* aggiungiPerche(brief, codice, testo): note del programma con codice */
}
briefOggi(giorno) → { chi, obiettivi, programma, settimana /* numero, fase, piano della settimana */,
                      prontezza, aggiusti, momento, esigenza, vincoli }
```

`brief.sicurezza.vincoli` (Sentinella) è il **solo** canale dei limiti:

```js
{ vietati: { nome: motivo }, modifiche: { nome: { nota, carico, rirMin, rom } },
  rirMin: { A, B, C, D, E, F }, serieMaxEsercizio, gruppiTecniche: ['G1', 'G1b', ...] /* MAV 3.3 */,
  tettoCarico /* ≤ 1 */, motivi: [{ codice, testo }] }
```

**Precedenze (REG-01).** Quando due sotto-coach non sono d'accordo vince, in quest'ordine: (1) **Sentinella** (limiti assoluti); (2) **Motivatore** per i momenti di vita (volume ×, RIR +); (3) **Specialista** quando la modalità è attiva; (4) **Architetto, Dosatore, Bilancia** (proposte); (5) **Preparatore e Tecnico** (aggiunte e informazioni, mai sostituzioni). Si realizza così: ogni catena finisce con la fase «tetti» della Sentinella, che può solo **abbassare** e scrive il suo codice nel perché. Un test (W1-T3) verifica che, per i profili prudenti, nessuna fase dopo i tetti alzi carico, serie o vicinanza al cedimento.

### B.3 Le catene: ordine fisso e scritto

**Creazione del programma** (`window.buildProgram(d)`, spostata in `js/coach/regia/genera.js`, W1-T4). Ogni passo è una funzione con nome stabile; le onde successive riscrivono il **corpo** della funzione nel suo file, non `genera.js`.

| # | Funzione | Sotto-coach | File | Onda che la riscrive |
|---|---|---|---|---|
| 1 | `briefCoach(d, prof0)` | Regista | `regia/brief.js` | W1-T4 |
| 2 | `vincoliSicurezza(brief)` | Sentinella | `sicurezza/vincoli.js` | W1-T4 (legacy) → W4-T2 |
| 3 | `specialitaStruttura(brief)` | Specialista | `regia/genera.js` (smista) → `specialita/forza.js` | W2-T5, W2-T7 |
| 4 | `pianoMesociclo(brief)` | Architetto | `programma/mesociclo.js` | W2-T4 |
| 5 | `scegliSplit(brief)` + `giorniSettimana(brief, split)` | Architetto | `ui/onboarding.js`, `regia/genera.js` | W2-T5 |
| 6 | `componiSedute(brief, split)` | Architetto (+Tecnico) | `programma/ricette.js` | W2-T6 |
| 7 | `completaSettimana(brief, sedute)` | Architetto | `programma/completamenti.js` | W2-T6 |
| 8 | `prescriviSerie(brief, sedute)` | Dosatore | `volume/serie-ripetizioni.js` | W2-T2, W3-T1 |
| 9 | `assegnaVolume(brief, sedute)` | Dosatore | `volume/volume.js` | W2-T1 |
| 10 | `adattaAlTempo(brief, sedute)` | Dosatore | `volume/tempo.js` | W2-T2 |
| 11 | `strFinale` / `strBilancia` (ABB-04/08/09) | Architetto | `programma/struttura-pro.js` | W2-T6 |
| 12 | metodo e tocco (`metodoAttivo.schema`, `TOCCHI`) | Architetto | `regia/genera.js`, `compone.js` | — |
| 13 | `assegnaTecniche(brief, sedute)` (dopo metodo e tocco: filtra anche le loro tecniche) | Dosatore + Sentinella | `volume/tecniche.js` + `sicurezza/tecnica-adatta.js` | W2-T3 |
| 14 | scelte dell'utente (PRG-39, CST-12) | Motivatore | `regia/genera.js` | W5-T2 |
| 15 | `applicaPartenze(brief, sedute)` | Bilancia | `carichi/partenza.js` | W3-T2 |
| 16 | `pianoCardio(brief)` | Preparatore | `corpo/cardio.js` | W5-T3 |
| 17 | `verificaProgramma(brief, prog)`: chiama `validaVolume`, `validaTempo`, `validaTecniche`, `validaSicurezza` se definite | Regista | `regia/genera.js` | ogni onda aggiunge il suo `valida*` |

**Apertura della seduta e carichi.** `caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta` smettono di essere avvolte: diventano catene di fasi registrate con `registraFase(punto, ordine, codice, fn)` (`js/coach/regia/fasi.js`, W1-T3). L'ordine è un **numero scritto**, non l'ordine degli script.

```
punto 'carico'  (caricoProssimo: una fase riceve r e { nome, base, repsTarget, setsBase, brief })
  10 BIL  modello di progressione (v1: caricoProssimoBase; v2: modelli.js)      W1-T3 / W3-T1
  15 BIL  calibrazione rapida (CAR-18/19)                                         W3-T2
  20 BIL  ricalcolo dal massimale quando cambiano le ripetizioni (B7, B8)         W3-T1
  30 SEN  scarico pianificato o reattivo (dose unica)                             W3-T5
  40 DOS  rampa della settimana e volume autoregolato (IPE-08, PCO-03)           W3-T4
  50 AGG  aggiusti del questionario (DEC/DOL) + testoRir (come oggi)             W1-T3
  60 RIC  RIC-01/02/05 (RIC-05 diventa «rientro» in W4-T2)                       W1-T3 / W4-T2
  70 INT  INT-04 prima volta                                                       W1-T3
  90 SEN  tetti della Sentinella (popolazioni, fastidi, prontezza)                W4-T1 / W4-T2
  99 REG  perche → motivo (testoPerche)                                            W1-T1
punto 'apertura' (applicaCaricoProgressivo): 10 carichi per esercizio · 20 RIC-04/MAV budget tecniche · 30 riscaldamento (RIS)
punto 'prontezza' (applicaProntezza): 10 PRZ · 20 budget tecniche · 30 dolore di oggi e malattia (REC-05/07) · 40 dolenzia per muscolo (PCO-03)
punto 'dopoSeduta' (imparaDallaSeduta): 10 stalli · 20 taratura RIR (CAR-14) · 30 INT-05 · 40 segnali per muscolo · 50 stato della calibrazione (CAR-18)
```

W1-T3 converte i wrapper di oggi **a comportamento identico** (fasi 10, 50, 60, 70 nello stesso ordine della catena attuale), provato da un test «golden» registrato prima della modifica.

### B.4 Spostare i file o tenere un registro? Decisione

| | (i) Spostare e rinominare in `js/coach/<sottocoach>/` | (ii) Registro logico + cartelle solo per il codice nuovo |
|---|---|---|
| Costo | ~33 file del coach da spostare; ~110 righe di `index.html` da riordinare con i vincoli dei wrapper ancora vivi; `sw.js` e `CACHE_NAME`; riscrivere `mappa-per-agenti.md`, `ARCHITETTURA.md`, cap. 20 della mappa, `CLAUDE.md`, le due skill, i puntatori `dove` del collaudo; storia `git blame` spezzata; ogni task parallelo in conflitto con lo spostamento | una tabella nella mappa (cap. 0) letta dal generatore del catalogo; cartelle nuove per il codice nuovo; nessun file esistente si muove |
| Rischio | alto: rompere l'ordine dei wrapper prima di averli tolti; conflitti di merge in tutte le onde | basso: niente cambia per il codice che già funziona |
| Beneficio | chiarezza delle cartelle | la stessa chiarezza dove serve (pannello, mappa, catalogo, `trova`), più ordine progressivo con le cartelle nuove |

**Decisione: (ii).** Nessun file esistente cambia nome o cartella in questo piano. Il codice nuovo nasce in cartelle per argomento, coerenti con quelle che già ci sono (`programma/`, `carichi/`, `bia/`):

| Cartella | Sotto-coach | Nasce in |
|---|---|---|
| `js/coach/regia/` | Regista | W1 |
| `js/coach/volume/` | Dosatore | W1 (contenitori legacy) |
| `js/coach/sicurezza/` | Sentinella | W1 |
| `js/coach/tecnica/` | Tecnico (parte in seduta: riscaldamento) | W4 |
| `js/coach/corpo/` | Preparatore | W5 |
| `js/coach/mente/` | Motivatore | W5 |
| `js/coach/specialita/` | Specialista | W2 |

Un riordino fisico dei file vecchi (es. dividere `regole-ricerca.js` e `repertorio.js`) diventa possibile **dopo** W1-T3 (niente più wrapper) e resta fuori da questo piano: si decide alla revisione finale.

**Il registro.** In `docs/coach-mappa-regole.md` nasce il **capitolo 0 «La squadra del coach»**: una tabella `| id | Nome | Missione | Codici |` (intervalli come `PRG-01..11` o prefissi interi come `IPE-*`). `tools/genera-catalogo.js` (W1-T1) la legge e scrive in `js/coach/catalogo-regole.js`: `COACH_SQUADRA` e, per ogni regola, `sottoCoach`; `--check` fallisce se un codice del catalogo non ha sotto-coach o ne ha due. La regex accetta anche due lettere (`IA-01..05` entrano nel catalogo). Una riga di regola che contiene «(spegnibile)» produce `spegnibile: true`: `regolaAttiva(codice)` accetta i codici di `REGOLE_SPEGNIBILI` **oppure** quelli segnati così (W1-T1). Così i task non toccano `parametri.js` per rendere spegnibile una regola nuova.

**Le soglie.** Ogni numero nuovo vive in un file `soglie-<argomento>.js` nella cartella del suo sotto-coach (`const SOGLIE_<ARGOMENTO> = {...}`), una voce per numero:

```js
const SOGLIE_VOLUME = {
  minimoFrazionario: { v: 4, forza: 'Solida', fonte: 'Pelland 2026; Iversen 2021 (ricerca-ipertrofia §3.2)', regole: ['IPE-01'] },
  ...
};
```

Forze ammesse: `Solida`, `Moderata`, `Contrastata`, `Convenzione`, `Decisione` (scelta di prodotto), `Provvisoria` (numero di partenza in attesa di verifica). Si leggono solo durante l'esecuzione (mai al caricamento: niente vincoli d'ordine). `tests/soglie.test.js` (W1-T1) cerca tutti i `js/**/soglie-*.js` e fallisce se una voce non ha `v`, `forza` e `fonte`; `tools/elenco-soglie.js` genera `docs/soglie-coach.md` (tabella di tutte le soglie con forza e fonte, controllato da `npm run controlla`). Le tabelle vecchie (`COACH_PARAMETRI`, `PARAM_PARTENZA`, `PARAM_INTENSITA`, `STR_PESI`, `DOSE_SCARICO`, `RIR_TIPO`) si portano nei file soglie quando il task che possiede quel file le tocca. La skill `implementa-regola-coach` (§2.3, «nel codice non esiste un campo forza») va aggiornata a questa convenzione in INT-1.

### B.5 Come si vede

| Dove | Cosa cambia | Task |
|---|---|---|
| Seduta (`seduta.js`, nota dell'esercizio) | Il motivo diventa una lista di «perché» brevi, ognuno con la piccola etichetta del sotto-coach («Bilancia · serie facili, +2,5 kg»); tocco su «Perché?» apre il foglio con codice, sotto-coach e testo | W5-T1 |
| Foglio «Il tuo coach» (`renderAgent`, `agente-consigli.js`) | Sezioni per sotto-coach: Programma (Regista/Architetto), **Volume della settimana muscolo per muscolo** (Dosatore: barre serie fatte/bersaglio), Carichi della prossima seduta (Bilancia), Sicurezza (Sentinella: modifiche attive, gradino del dolore), Corpo e cardio (Preparatore), Costanza (Motivatore). Ogni consiglio e azione con l'etichetta | W5-T1 |
| Oggi (`oggi.js`) | Le schede del coach (controllo del dolore, seduta saltata, momento, fine ciclo, aggiornamento del coach) portano l'etichetta del sotto-coach | W5-T2 |
| Piano (`pannello.js`, «Da dove partire») | Etichetta «Tecnico» | W5-T1 |
| Risultato del programma (`onboarding-risultato.js`) | Note raggruppate per sotto-coach, con la durata stimata della seduta e il volume per muscolo | W5-T1 |
| Opzioni › Il coach (`il-coach.js`) | «La squadra del coach»: 9 righe (nome, missione, cosa ha deciso per te), interruttori delle regole spegnibili raggruppati per sotto-coach; muscoli prioritari scelti tra le unità fini (max 2) | W5-T1 |
| Mappa e catalogo | Cap. 0 squadra; capitoli nuovi 21-32 (sotto); `COACH_SQUADRA`, `sottoCoach`, `spegnibile` nel catalogo | W1-T1, INT |
| `docs/soglie-coach.md` | Tutte le soglie con forza e fonte (generato) | W1-T1 |

Capitoli nuovi della mappa (creati vuoti in INT-1 perché i task vi aggiungano righe): 21 Volume e tempo (IPE), 22 Progressione dei carichi v2 (PGR, AUT, STD), 23 Tecniche: idoneità e budget (MAV), 24 Recupero, dolore e popolazioni (REC), 25 Riscaldamento e mobilità (RIS), 26 Costanza e comunicazione (CST), 27 Cardio, nutrizione e peso (AER, NUT, PES, DCA), 28 Dall'obiettivo al programma (OBI), 29 Scelta degli esercizi (SEL), 30 Pratiche dei coach (PCO), 31 Specialista (FRZ, EST, TAP), 32 Regia (REG). PAR-06..09 e CAR-18..19 vanno nel cap. 8 (carico di partenza).

### B.6 Regole della regia (REG)

- **REG-01** precedenze (B.2).
- **REG-02** verifica finale: dopo l'ultimo taglio il programma passa i controlli di volume, tempo, tecniche e sicurezza; ciò che non si ripara diventa una nota con la causa («Polpacci 4 serie: con 30 minuti non entra di più»).
- **REG-03** perché: ogni numero cambiato porta codice e sotto-coach (`aggiungiPerche`); il motivo mostrato è `testoPerche(perche)`.
- **REG-04** versione: `prog.versione = 2` per i programmi nuovi; quelli salvati prima continuano con le regole di prima, tranne le correzioni dei bug (onda 0).
- **REG-05** stesso seme, stesso programma (anche con le parti nuove).
- **REG-06** l'aggiornamento al coach nuovo si propone, non si impone: una scheda in Oggi, con «Annulla» che ripristina tutto.

---

## C. Innovazioni (in ordine di valore; ★ = le cinque più importanti)

| # | Cosa | Perché (prova e pratica) | Dove si aggancia | Rischio | Taglia | Task |
|---|---|---|---|---|---|---|
| ★1 | **Motore del volume per muscolo**: 15 unità di conteggio (petto, dorsali, spessore della schiena, deltoide anteriore, laterale, posteriore, bicipiti, tricipiti, quadricipiti, femorali, grande gluteo, adduttori, abduttori, polpacci, addome), conteggio frazionario dagli attributi (1 diretto, 0,5 secondario «vero motore»), fasce per livello e obiettivo, pavimenti di serie dirette per i muscoli piccoli, tetto per seduta frazionario (morbido 8, duro 11), verifica dopo **ogni** taglio | Dose-risposta per muscolo (Pelland 2026, Solida); conteggio frazionario (Moderata); pavimenti di dirette (Maeo 2023, Baz-Valle 2022: Moderata; resto Convenzione); tetto per seduta (Remmert 2025, preprint) | `volume/volume.js` (stadio 9), attributi W1-T2 | Sedute più lunghe: si risolve insieme al tempo (★3) | L | W1-T2, W2-T1 |
| ★2 | **Mesociclo vero**: piano settimana per settimana per tutti i livelli (rampa di RIR, rampa di volume dall'80% al bersaglio, scarico pianificato per livello: principiante solo alla 8ª; intermedio 5+1; avanzato 5+1) + scarico reattivo con **una** dose | Rampa RIR (Robinson 2024 + RP, Convenzione/Moderata); scarico ogni 5,6 ± 2,3 settimane in pratica (Bell 2024); i novizi non programmano scarichi (Contrastata) | `programma/mesociclo.js` (stadio 4) → `prog.piano`; fase 'carico' 40 in seduta | Più settimane di fila: gli stessi segnali anticipano lo scarico | L | W2-T4, W3-T4, W3-T5 |
| ★3 | **Bilancia v2**: scala di progressione per esercizio (S1 ogni seduta, S2 settimanale, S3 a blocco, misurata dagli aumenti reali), incrementi relativi arrotondati all'attrezzo vero (dischi 1,25/2,5, manubri a 1-2 kg, pacchi da 2,5/5, impostabili), doppia progressione con range, massimale con «ripetizioni + RIR», ricalcolo del carico quando cambia il bersaglio di ripetizioni, stalli a gradini (3×10 → 3×8 → 3×6 prima del reset) | PGR-01..04, AUT-01..02, PCO-01 (Convenzione da 4 fonti; RIR ±1 ripetizione: Halperin 2022, Moderata) | `carichi/modelli.js`, `attrezzi.js`, `e1rm.js` (fasi 10 e 20) | Cambia la progressione di chi è a metà programma: v2 solo per `prog.versione ≥ 2` | L | W1-T3, W3-T1 |
| ★4 | **Modello degli esercizi + cancello delle tecniche**: attributi per i ~170 esercizi (classe A-F della nota sui metodi avanzati, schema, crediti per muscolo, profilo di resistenza, stabilità, fatica sistemica, abilità 1-3, unilaterale, stress per 8 zone, attrezzo e «serve»); le tecniche passano dalla matrice tecnica × classe × livello × vincoli, con budget per seduta e settimana e posizione nel blocco | MAV-01..13 (prassi e sicurezza, Convenzione; «nessun vantaggio di crescita, solo tempo»: Solida); SEL-01..16 | `dati/attributi-esercizi.js`, `sicurezza/tecnica-adatta.js` (stadio 13, fase 'apertura' 20) | Dati da scrivere bene una volta: revisione Opus | L + M | W1-T2, W2-T3 |
| ★5 | **Modifica, non escludere**: fastidi su 8 zone con livello verde/giallo/rosso, matrice fastidio → modifica (carico −10/−20%, RIR ≥3, ampiezza senza dolore, variante a minor stress con **lo stesso muscolo**), controllo del mattino a gradini, rientro a 4 fasi guidato dal dolore, domande d'allarme con rinvio al medico | Silbernagel 2007 (Moderata), Smith 2017, Cochrane 2021 per la schiena (Solida per «esercizio sì»), prassi cliniche (Convenzione) | `sicurezza/fastidi.js`, `consentito` → `consenteEsercizio`, `questionario-decisioni.js`, `dolore-mattina.js` | Più esercizi tenuti con fastidio: sempre con modifica scritta e soglia di stop 3/10 | L | W4-T1 |
| 6 | **Il tempo torna**: modello con riscaldamento (RIS 3.9), cambi, unilaterali; prima si accorciano le pause dentro la fascia, poi superserie antagoniste, solo poi tagli, mai sotto i pavimenti; dose minima per 30/45/60/90 minuti | IPE-03/12/14, PCO-04; superserie: meta-analisi 2025 (Solida per l'efficienza) | `volume/tempo.js` (stadio 10) | Modello di tempo «nostro»: tarato sullo strumento di collaudo | M | W2-T2 |
| 7 | **Partenza bassa per le donne + calibrazione rapida** | Decisione dell'utente; prudenza (Convenzione) | `carichi/partenza.js`, fase 'carico' 15 | Partire troppo basse: la salita la recupera in 2-3 esposizioni | M | W3-T2 (capitolo D) |
| 8 | **Volume autoregolato per muscolo** (stile RP): dolenzia del muscolo prima della seduta, prestazione, prontezza → ±1 serie a settimana dentro MEV-MAV; «spingi» solo a condizioni (CST-08) | PCO-03 (Convenzione, pratica RP); dose-risposta (Solida) | `volume/autoregolazione.js`, `prontezza.js` | Domande in più: facoltative, un tocco | M | W3-T4 |
| 9 | **Popolazioni**: adolescenti, over 65 con progressione verso carichi alti e potenza, donne dai 50 anni (osso), gravidanza e post-parto come bandiera separata, ipertensione, obesità, malattia «sopra il collo», rientro a gradini | REC-06..15, CST-01/02, DCA-01 (posizioni ufficiali ricordate: Convenzione/Moderata da verificare) | `sicurezza/popolazioni.js`, `sicurezza/vincoli.js` | Messaggi medici: solo prudenza e rinvio, mai diagnosi | M | W0-T2 (minorenni), W4-T2 |
| 10 | **Modalità Forza** (powerlifting): squat 2×, panca 2-3×, stacco 1× + variante; onda giornaliera pesante/media/leggera; massimale di lavoro e onda a percentuali con tetto di RPE; AMRAP di appoggio; varianti e accessori per punto debole; nessun 1RM per chi non è avanzato; taper spento finché non verificato | FRZ (pratica 5/3/1, RTS, Candito: Convenzione); STD-01/02; TAP-01 (da verificare) | `specialita/forza.js`, `forza-carichi.js` | Programmi famosi diversi tra loro: il coach usa uno schema solo, dichiarato | L | W2-T7, W3-T6 |
| 11 | **Modalità Estetica** (bodybuilding): massimo 2 muscoli prioritari a MAV alta, mantenimento ≥6 serie per gli altri, coppie regionali (allungato + accorciato) per i prioritari, punti deboli letti dai log, rotazione a blocchi | IPE-09/13 (Maeo 2021-23: Moderata; specializzazione: Convenzione) | `volume/volume.js`, `programma/ricette.js`, `specialita/estetica.js` | Proposte sbagliate da dati scarsi: solo con 2 blocchi di dati, sempre proposta | M | W2-T1, W2-T6, W5-T4 |
| 12 | **Riscaldamento automatico e mobilità**: rampa dal carico e dall'intensità relativa, riduzioni per esercizi successivi, riscaldamento generale in minuti, blocchi di mobilità per over 50/65, scrivania e prove fai-da-te | RIS-01..13 (rampa: Moderata/Convenzione) | `tecnica/riscaldamento.js`, fase 'apertura' 30 | Tempo: tetto per seduta (5/8/10 min) | M | W4-T3 |
| 13 | **Costanza**: pausa del calendario, rampa di rientro, settimana minima dopo i salti, serie di settimane «a finestra», lessico senza colpa, domanda «cosa ti frena» ampliata, punti di scelta autonomi | CST (autodeterminazione, Teixeira 2012: Moderata) | `mente/costanza.js`, `oggi.js` | Tono: frasi riviste in quattro lingue | M | W4-T2, W5-T2 |
| 14 | **Preparatore**: cardio per obiettivo e dove metterlo (dopo i pesi o a ≥3 ore, corsa lontano dal giorno gambe), passi unici e realistici, proteine per kg di peso, tendenza del peso su 4+ pesate, BIA con contesto, massa magra in calo solo con conferma, guardie contro i disturbi alimentari | AER, NUT, PES, DCA (Schumann 2022, OMS 2020: Solida/Moderata) | `corpo/cardio.js`, `corpo/peso.js`, `repertorio.js` | Linguaggio sensibile: frasi controllate | M | W5-T3 |
| 15 | **Spiega perché**: traccia strutturata di ogni numero, etichetta del sotto-coach, foglio «Perché?», volume per muscolo visibile | Trasparenza = fiducia e aderenza (PSI-07, Convenzione) | `regia/perche.js`, UI | Testi: tutti tradotti | M | W1-T1, W5-T1 |
| 16 | **Collaudo come cancello**: soglie per onda sullo strumento esistente + atleta virtuale per i carichi (convergenza, nessun carico oltre la capacità) | Prova automatica su 10.800-64.800 profili | `tools/cancello-collaudo.js`, `tests/aiuto-atleta.js` | Il modello «misura sé stesso»: i criteri restano quelli del collaudo esterno | M | W0-T1, W3-T2 |

**Fuori da questo piano (proposte delle note da decidere poi):** nuovi obiettivi OBI-13 (correre 5K), OBI-14 (abilità), OBI-15 (schiena, collo e spalle), OBI-16 (sport e stagione); SEL-05 parte B, SEL-09, SEL-10 come regola autonoma (assorbita da REC-04), SEL-14 (due id per i femorali: bloccata da prove mancanti); BFR oltre al testo (MAV-14 resta solo informazione); simmetria destra/sinistra (serve registrare i lati); velocità del bilanciere.

---

## D. Regola «partenza bassa per le donne» (PAR-06..09, CAR-18..19)

### D.1 Ambito
- **Chi**: profilo con sesso donna (`'F'` o `'donna'`, come `contestoCarichi`) e livello **principiante o intermedio** (quello del brief: dichiarato o corretto da LIV/STD). Le avanzate restano come oggi (solo `sessoParteAlta` 0,9 sulla parte alta).
- **Cosa**: ogni carico **stimato** (PAR-01..05: creazione del programma, esercizi nuovi o sostituiti, «Macchinario occupato», seduta libera, aggiunta dalla libreria). Mai un carico che viene dallo storico di quell'esercizio.
- **Quando si spegne**: con lo storico (PAR-07), esercizio per esercizio con la calibrazione (CAR-18), o con l'interruttore (`(spegnibile)`).

### D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`)

```
kCorpo = (massa / riferimento) × livello × età × PAR-Q × prudenza 0,85            (PAR-02 com'è, SENZA sessoParteAlta per donne ≤ intermedie)
k      = misto(kStorico, kCorpo, w = min(1, nEserciziInStorico / 4)), limitato a [0,45; 1,8]   (PAR-03 com'è)
fD     = PARTENZA_DONNE[livello][classe]                                          (PAR-06; 1 se non si applica)
fEff   = 1 − (1 − fD) × (1 − w)                                                  (PAR-07: lo storico personale assorbe lo sconto)
peso   = arrotondaPartenza(nome, libreria.weight × k × fEff, verso = 'giù')       (PAR-04, arrotondato per difetto)
```

Con W3-T1 la stima tiene conto anche del bersaglio di ripetizioni (`opz.reps`, `opz.rir`): il peso di libreria vale per le sue ripetizioni e si converte con `caricoPer(e1rm, reps, rir)`; il fattore donne si applica dopo, identico.

### D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`, forza **Decisione**, fonte «decisione dell'utente 2026-10-05; prudenza per abilità e stabilità»)

La classe è quella della matrice di idoneità (attributo `classe`, W1-T2); «alto/basso» dall'unità bersaglio (quadricipiti, femorali, glutei, adduttori, abduttori, polpacci = basso).

| Classe | Esempi | Principiante | Intermedia |
|---|---|---|---|
| A alto: bilanciere libero, parte alta | Panca Piana Bilanciere, Military Press, Rematore con Bilanciere | **0,65** | **0,80** |
| A basso: bilanciere libero, gambe e anca | Squat con Bilanciere, Stacco da Terra, Stacco Rumeno, Good Morning | **0,70** | **0,85** |
| B: multiarticolari liberi non pesanti | Panca Manubri, affondi, Goblet Squat, Hip Thrust, Rematore con Manubrio | **0,70** | **0,85** |
| C: multiarticolari guidati | Leg Press, Chest Press, Lat Machine, Pulley Basso, Hack Squat | **0,80** | **0,90** |
| D: isolamenti a macchina o cavo | Leg Extension, Leg Curl, Pushdown, Alzate ai Cavi | **0,80** | **0,90** |
| E: isolamenti liberi | Curl con Manubri, Alzate Laterali, Croci Manubri | **0,75** | **0,85** |
| F: core, a tempo, corpo libero a 0 kg | Plank, Dead Bug, Piegamenti, Trazioni | nessun fattore: variante facilitata (PAR-09) | nessun fattore |

Perché questi numeri: lo sconto è più grande dove servono più tecnica e stabilità (bilanciere libero, parte alta), più piccolo sulle macchine; la parte bassa ha già lo sconto più piccolo perché, a parità di massa magra, le gambe delle donne non sono meno forti (lo diceva già PAR-02). Esempio: donna 60 kg senza BIA, principiante: `kCorpo` = 60 × 0,74 / 61,5 × 1 × 0,85 ≈ 0,61; panca 40 kg di libreria → 40 × 0,61 × 0,65 ≈ 15,9 kg → sotto la barra (PAR-08); leg press 80 kg → 80 × 0,61 × 0,80 ≈ 39,3 → 37,5 kg (per difetto, passi da 2,5).

### D.4 Barra e corpo libero
- **PAR-08 sotto la barra**: se il peso stimato di un esercizio col bilanciere è sotto la barra (20 kg) meno 2,5 kg: (a) nella scelta degli esercizi la Bilancia dà `penalitaPartenza(x, brief)` = −3 al bilanciere in quel posto (non esclusione: vince la variante con manubri o macchina **dello stesso muscolo**, `alternativeStessoMuscolo`); (b) se il bilanciere resta (forza, modalità Forza, metodo famoso), si parte dalla barra vuota con le ripetizioni più basse del range e un RIR in più. Testo: «Per ora basta il bilanciere vuoto: poche ripetizioni, tecnica pulita».
- **PAR-09 corpo libero**: per le principianti, piegamenti e trazioni partono dalla variante facilitata del Tecnico (piegamenti inclinati, trazioni assistite o lat machine); si passa alla completa a 12 ripetizioni pulite (PGR-03).

### D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19)
Fase 'carico' 15, file `js/coach/carichi/calibrazione.js`. Vale per gli esercizi del piano con `e.partenzaBassa = { fD }` (scritto da `applicaPartenze`) per le **prime 4 esposizioni** (contate dallo storico) e finché non «si chiude».

Dopo ogni esposizione, se tutte le serie sono fatte con almeno le ripetizioni previste:

| RPE segnato (media delle serie fatte, corretta da `rirBias`) | Azione |
|---|---|
| RIR osservato ≥ RIR bersaglio + 2 | Ricarico dal massimale: `nuovo = caricoPer(e1rm(peso, reps, min(4, RIRoss)), repsBersaglio, RIRbersaglio)`, con tetto per salto `T = Tcal(classe) + (1/fD − 1)/2`, dove `Tcal` = 10% gambe, 7,5% parte alta (ricerca-forza §3.3.5); minimo un passo dell'attrezzo; per difetto |
| RIR osservato = bersaglio + 1 | +max(2 passi, 7,5%), stesso tetto `T` |
| RIR osservato entro ±1 dal bersaglio | **Si chiude**: «Carico tarato: da qui la progressione normale» |
| Nessun RPE segnato | +2 incrementi standard, al massimo +15%; la nota chiede l'RPE (CAR-19) |
| Serie mancate | CAR-17 come oggi (−5% se molto sotto) e **si chiude** |

`T` vale ≈ 34,5% con fD 0,65 (A alto principiante), ≈ 20% con fD 0,80, ≈ 13% con fD 0,90: lo sconto voluto si restituisce in **due salti**, ma solo se l'RPE lo conferma. Il RIR oltre 4 conta come 4 (affidabilità della stima: ricerca-forza §3.3). Salvaguardie (fase 90, Sentinella): dolore su quell'esercizio nell'ultima seduta → nessun salto; PAR-Q o over 65 → tetto dimezzato; prontezza < 50 → nessun salto quel giorno.

**CAR-19 promemoria**: finché l'esercizio è in calibrazione e l'ultima esposizione non ha RPE, la nota dice «Segna quanto è stata dura la prima serie (RPE): con il dato il carico sale più in fretta». Nessuna modifica all'interfaccia della seduta.

Convergenza attesa: partenza a 0,65 della capacità → 0,87 → 1,0: **alla terza esposizione** con l'RPE; alla quarta o quinta senza.

### D.6 Interazioni

| Con | Cosa succede |
|---|---|
| PAR-01 (dati del corpo) | Invariato: SMM > FFM > peso × grasso > peso. La BIA cambia solo la massa usata, mai il fattore |
| PAR-02 | `sessoParteAlta` 0,9 si applica solo alle donne **avanzate**; per le altre lo sostituisce la tabella (niente doppio sconto) |
| PAR-03/07 | Con 4 esercizi in storico lo sconto sparisce (fEff = 1); con 2 è dimezzato |
| PAR-04 | Arrotondamento per difetto per le stime scontate |
| INT-01..03 (bandiere BIA) | Nessun effetto sul carico (decisione presa); INT-03 aggiunge un RIR → il bersaglio della calibrazione si sposta di conseguenza |
| INT-04 (prima volta) | Resta: −1 serie, +1 RIR. La calibrazione confronta l'RPE con il bersaglio **di quella seduta** (registrato in `obiettivo.rir` da W0-T3) |
| INT-05 (bilancio prime sedute) e ESI-02 (esigenza) | Le serie degli esercizi in calibrazione **non contano** come «serie facili» (si contano per il completamento): una partenza bassa voluta non deve alzare l'esigenza |
| CAR-16/17 | CAR-18 sostituisce CAR-16 per gli esercizi con `partenzaBassa`; CAR-16 resta per tutti gli altri; CAR-17 invariata |
| Principianti uomini | Nessun cambiamento (prudenza 0,85 di PAR-02 e CAR-16). Estendere CAR-18 a tutti i principianti è una decisione aperta (H) |
| Gironda 8×8 (`fattoreCarico` 0,7) | Si applica dopo, come oggi |
| Sostituzioni (DEC-09, STA-02, macchinario occupato) | Passano da `pesoPartenza` → stessa regola |

### D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`)
- Nota del programma: «Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento, poi il coach sale in fretta.»
- Nota dell'esercizio (tipo «nuovo»): «Partenza bassa voluta: impari il movimento, poi si sale in fretta»
- Salto con RPE: «Calibrazione: RPE # contro # previsto, si sale a # kg (+#%)»
- Salto senza RPE: «Calibrazione: serie complete, +# kg» • «Segna quanto è stata dura la prima serie (RPE): con il dato il carico sale più in fretta»
- Chiusura: «Carico tarato: da qui la progressione normale»
- Sotto la barra: «Per ora basta il bilanciere vuoto: poche ripetizioni, tecnica pulita» / «Il bilanciere vuoto pesa 20 kg: per iniziare la stessa spinta con i manubri»
- Corpo libero: «Versione facilitata per partire: si passa alla completa a # ripetizioni pulite»

### D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`)
1. Donna principiante 60 kg senza BIA: panca, leg press, curl = valore di un uomo con la stessa massa magra × fattore della classe (calcolato nel test), arrotondato per difetto sui passi veri.
2. Donna intermedia: fattori 0,80-0,90; donna avanzata: valori di oggi (golden); uomo principiante: identico a prima (golden).
3. Storico con 2 e 4 esercizi: sconto dimezzato e nullo.
4. Nessun carico fuori dalla griglia dell'attrezzo; nessun bilanciere sotto la barra senza la nota.
5. PAR-08: in 200 profili di principianti donne, quando la panca col bilanciere è sotto la barra il posto ha una variante con lo stesso `bersaglioDi`.
6. CAR-18: RPE 6 su bersaglio 8 → salto dal massimale entro `T`; senza RPE → +2 incrementi con promemoria; RPE nel bersaglio → chiusura; mancato → CAR-17 e chiusura; dolore → niente salto; PAR-Q → tetto dimezzato.
7. INT-05 ed ESI-02 ignorano le serie facili degli esercizi in calibrazione.
8. `(spegnibile)`: con PAR-06 spento i valori sono quelli di prima; senza consenso nessun effetto.
9. Atleta virtuale (`tests/aiuto-atleta.js`): 500 atlete simulate (capacità vera estratta, RPE con rumore ±1, 30% senza RPE): esposizioni per arrivare entro ±10% del carico vero ≤ 3 in mediana e ≤ 5 al 95° percentile; **zero** prescrizioni sopra la capacità al RIR bersaglio − 1.
10. Traduzioni: ogni frase di D.7 passa `controlla-traduzioni.js`.

---

## E. Piano a ondate

### E.0 Protocollo di lavoro (vale per ogni task)

1. **Prima**: leggere `CLAUDE.md`, la skill `implementa-regola-coach`, i capitoli B e D di questo documento, la sezione della nota di ricerca citata dal task. Cercare con `GRAPH_REPORT.md` e `npm run -s trova`.
2. **Ramo**: `coach-v2/<task>` dalla punta dell'onda. Si committano **solo i file elencati** nel task.
3. **File condivisi** (`index.html`, `sw.js`, `package.json`, `js/lingue/en|es|de.js`, `docs/coach-mappa-regole.md`, `js/coach/catalogo-regole.js`, `js/coach/parametri.js`, `docs/mappa-simboli.md`, `docs/indice-codice.md`, `docs/soglie-coach.md`, `graphify-out/`, `docs/mappa-per-agenti.md`, `docs/ARCHITETTURA.md`, `docs/PIANO.md`, `CLAUDE.md`, le skill): li tocca **solo** l'integrazione, salvo dove un task li elenca esplicitamente. Il task scrive cosa serve in `docs/in-arrivo/<task>.json`:

```json
{ "task": "W3-T2",
  "script": [{ "src": "js/coach/carichi/calibrazione.js", "dopo": "js/coach/carichi/partenza.js" }],
  "frasi": { "Carico tarato: da qui la progressione normale": { "en": "...", "es": "...", "de": "..." } },
  "regole": [{ "capitolo": 8, "riga": "- **CAR-18** (spegnibile) calibrazione rapida ... (decisione 2026-10-05)" }],
  "squadra": [{ "sottoCoach": "bilancia", "codici": "CAR-18..19" }],
  "mappaAgenti": ["calibrazione rapida: js/coach/carichi/calibrazione.js (fase 'carico' 15)"] }
```

4. **Verifica nel task**: `node tools/integra-onda.js --prova docs/in-arrivo/<task>.json` applica le modifiche condivise in una copia di lavoro, lancia `npm run controlla` e i test, poi le toglie; `npm run collaudo:schede -- --matrice rapida --out /tmp/<task>.json` e `--confronta` con l'istantanea dell'onda.
5. **Consegna**: report con cosa è cambiato, tabella prima/dopo dei criteri di collaudo del task, prove aggiunte, frasi nuove.
6. **Modelli** (CLAUDE.md): implementazione **Sonnet 5.5**; dove scritto «Opus» il task è guidato da **Opus 5.5** (contratti, semantica difficile) oppure ha la revisione Opus prima del merge.

**Integrazione di fine onda (INT-N, Sonnet esegue, Opus rivede):**
1. Unisce i rami nell'ordine delle dipendenze; un conflitto in un file generato si risolve **rigenerando**, mai a mano.
2. `node tools/integra-onda.js docs/in-arrivo/*.json`: righe in `index.html`, frasi nei tre dizionari, righe e capitoli della mappa, tabella della squadra; poi cancella `docs/in-arrivo/`.
3. Rigenera: `npm run sw`, `npm run catalogo`, `npm run indice`, `npm run simboli`, `npm run soglie` (da INT-1); alza `CACHE_NAME` **una volta** (`3in-v11` → `v12`, ...); poi `npm run grafo` (per ultimo).
4. Prove: `npm run controlla`; `npm run test:browser` (da W0 le esegue tutte); `npm run collaudo:schede -- --matrice standard --etichetta onda-N` e `npm run cancello -- <json> onda-N` (soglie dell'onda in `tools/cancello-collaudo.json`). Le istantanee del collaudo restano **fuori dal repo** (regola della skill `collaudo-generatore-schede`): il «prima» si rigenera lanciando il collaudo sull'etichetta dell'onda precedente in un worktree temporaneo; nel repo restano le soglie del cancello e una riga di sintesi per onda in `docs/PIANO.md`. Un criterio nuovo del collaudo si aggiunge solo qui, con la procedura della sua skill (§4) e `VERSIONE_CRITERI` alzata.
5. Documenti a mano: capitoli toccati della mappa (cap. 17 «incoerenze» aggiornato), `mappa-per-agenti.md` (sotto-coach → file, nomi in posti inattesi), `ARCHITETTURA.md`, `PIANO.md` (fase 6), skill se cambiano convenzioni.
6. Revisione Opus: diff contro gli invarianti (F), cancello di collaudo, lettura «da coach» di 20 programmi campione (rubrica: struttura, volume per muscolo, tempo, sicurezza, spiegazioni).
7. Etichetta `coach-v2-onda-N` (punto di ritorno).

### E.1 Onda 0 — strumenti e bug netti

Ordine: **W0-T1 da solo**, poi W0-T2..T6 in parallelo.

| Bug | Task | Bug | Task |
|---|---|---|---|
| B1 numero di esercizi | W0-T2 (ponte), W2-T2 (risolutivo) | B13 ginocchio: leg extension | W0-T5, W4-T1 |
| B2 giorno PHUL ipertrofia | W0-T2 | B14 sostituzioni che cambiano muscolo | W0-T5, W4-T1 |
| B3 tecniche non idonee | W0-T2 (ponte), W2-T3 | B15 hinge con hip thrust | W0-T6 |
| B4 volume non riverificato, gruppi | W2-T1 | B16 tag di squat, leg press, RDL | W0-T6 (tag), W1-T2 (crediti) |
| B5 tempo e superserie | W2-T2 | B17 arrotondamento 0,5 kg | W3-T1 |
| B6 «blocca» abbassa il carico | W0-T3 | B18 +1 serie a prontezza 70 | W0-T4, W3-T4 |
| B7 ripetizioni alte con ×0,9 | W0-T3, W3-T1 (ricalcolo) | B19 Starting Strength | W0-T2 |
| B8 storico per nome | W0-T3 (dati), W3-T1 | B20 livello solo in salita | W0-T4 |
| B9 «Dura» = scarico | W0-T5, W3-T5 (scala 0-10) | B21 scarico ogni 4 ai principianti | W0-T5 |
| B10 calibrazione RIR | W0-T4 (ponte), W3-T3 | B22 testo TOCCHI | W0-T2 |
| B11 scarichi nelle analisi | W0-T4 | B23 soglie doppie | W3-T5 (scarichi), W5-T3 (grasso, massa magra) |
| B12 RIR 0 ai principianti | W0-T4 | B24 età | W0-T2, W0-T4 (creatina), W4-T2 |

**W0-T1 · Banco di prova · Sonnet · M**
- File: `package.json`, `tools/integra-onda.js` (nuovo), `tools/cancello-collaudo.js` (nuovo), `tools/cancello-collaudo.json` (nuovo: soglie per onda, tabella G come ultima colonna), `tests/aiuto-app.js` (nuovo: carica l'app in `vm` come il modello della skill), `tests/fixture/programmi-v1/*.json` (6 stati salvati: principiante donna a casa, intermedio PHUL, avanzato 6 giorni, over 65 PAR-Q, con BIA, con aggiusti e scarico attivi), `tests/migrazione-v1.test.js`, `tests/browser/intensita-bia.js` (solo se la prova è vecchia).
- Cosa: script `test` = `node --test tests/*.test.js`; `test:browser` esegue **tutti** i file e riassume (oggi si ferma al primo); `collaudo:schede` c'è già (non toccarlo); `cancello` (legge il JSON che il collaudo scrive fuori dal repo e fallisce oltre le soglie dell'onda); `integra` (`--prova`, `--controlla`, applica). Etichetta git `coach-v2-onda-0-prima` sul punto di partenza (per rigenerare il «prima»). Diagnosi di `intensita-bia.js`: prova vecchia → correggerla; difetto del codice → scriverlo per INT-0.
- Accettazione: `npm run controlla` verde con le prove nuove; `integra --controlla` respinge un JSON con una frase senza `de`; `cancello` esce 1 su un'istantanea artificiale oltre soglia; le 6 fixture aprono una seduta (`applicaCaricoProgressivo`) senza errori.

**W0-T2 · Generatore: bug netti · Sonnet · M** — B1, B2, B3 (ponte), B19, B22, B24 (parte), REC-11 (parte prudente)
- File: `js/ui/onboarding.js`, `js/coach/programma/ricette.js`, `js/coach/metodi-momenti.js`, `js/coach/compone.js`.
- Cosa: `exerciseCountFor` con le serie effettive (tetto principianti 3) e la pausa media per tipo; giorno «ipertrofia» del PHUL che riporta le serie allo schema (niente 6×8 o 5×8 a 180 s; il 5×5 «fisso» solo nei giorni forza); tecniche al cedimento mai su core, a tempo, peso 0, stacchi da terra, e mai a principianti, over 65, PAR-Q, minorenni; Starting Strength A = squat 3×5, panca 3×5, stacco 1×5 e B = squat 3×5, military 3×5, stacco 1×5 (nota: power clean assente); testo di `TOCCHI.isolamenti` = codice; età: sotto 13 nessun programma («Sotto i 13 anni il coach non crea programmi: allenati con un adulto esperto»), 13-17 = profilo minorenne (massimo 3 serie, nessuna tecnica, nota «allenati con un adulto o un istruttore»), campo con `min`/`max`.
- Accettazione: collaudo EXN-01 = 0, TEC-01 = 0, DUR-02 pesato almeno dimezzato rispetto a `coach-v2-onda-0-prima`; `tests/generatore-onda0.test.js` con i casi sopra su 300 profili (seme fisso).

**W0-T3 · Carichi in seduta: bug netti e dati · Sonnet · S** — B6, B7, B8 (dati)
- File: `js/coach/dolore-mattina.js`, `js/coach/carichi/progressivo.js`, `js/ui/allenamento/termina-e-cardio.js`.
- Cosa: «blocca» riporta peso **e** ripetizioni dell'ultima volta (helper `pesoUltimoDi(nome)` in progressivo.js) invece di togliere un incremento; «extra» solo se il «su» era di carico; «alte ripetizioni» non alza più a 12 (non supportato: ricerca-recupero §7): resta il −10% con «ampiezza senza dolore, RIR almeno 3»; la seduta salvata porta `settimana: { numero, fase }` e, per esercizio, `obiettivo: { reps, sets, rir, tecnica, coachTipo }`.
- Accettazione: `tests/carichi-onda0.test.js` (blocca dopo +1 ripetizione → stesso carico; dopo +2,5 kg → carico di prima; extra dopo +1 ripetizione → niente kg in più; storico con i campi nuovi; backup e ripristino li conservano).

**W0-T4 · Intensità e analisi pulite · Sonnet · M** — B10 (ponte), B11, B12, B18, B20 (STD-01), B24 (creatina)
- File: `js/coach/regole-ricerca.js`, `js/coach/esigenza.js`, `js/coach/repertorio.js`, `js/coach/prontezza.js`, `js/coach/intensita.js`.
- Cosa: principiante RIR [2,3] su tutte le classi; l'esigenza non toglie RIR ai principianti né in deficit; `inScarico(h)` (usa `h.settimana` se c'è, altrimenti le fasi del programma) ed esclusione delle settimane di scarico da ESI-02, CAR-08, `eserciziFermi`, `verdettoCiclo`; calibrazione RIR: niente nuovo apprendimento dal confronto tra serie diverse, `rirBias` dimezzato a ogni calibrazione fino a W3-T3; PRZ-03 solo con prontezza ≥ 85, non principiante, non prima settimana del blocco; `livelloStimato` con `STANDARD_FORZA` (STD-01: proposta di salita solo se anzianità e 2 alzate su 4 concordano; proposta di revisione se un avanzato dichiarato è sotto il livello 2 ovunque); `corpoCoach` senza creatina e proteine per `eta > 0 && eta < 18`.
- Accettazione: collaudo RIR-03 = 0; `tests/intensita-onda0.test.js` (principiante isolamento RIR ≥ 2; seduta di scarico con RPE basso non alza l'esigenza; avanzato dichiarato con numeri da principiante → proposta di revisione, annullabile).

**W0-T5 · Sicurezza e segnali · Sonnet · S** — B9, B13, B14, B21 (IPE-07 parte)
- File: `js/coach/questionario-decisioni.js`, `js/coach/programma/motore.js`, `js/coach/biomeccanica.js`.
- Cosa: risposte sRPE = 3/6/8/10; «pesante» = sRPE ≥ 10 oppure arrivato stanco con sRPE ≥ 8 (le vecchie risposte 9 contano come 8); sostituzione per dolore = `alternativeStessoMuscolo` con penalità alle voci di `STRESS_ZONA[zona]`; se non ce n'è, stesso esercizio −20% con «ampiezza senza dolore, discesa in 3 s» (mai un altro muscolo); `RISCHIO.ginocchia` senza leg extension e leg press (restano con la nota di `SCALE_DOLORE`), coerente con `STRESS_ZONA`; principiante: 8 settimane, scarico solo all'8ª.
- Accettazione: `tests/sicurezza-onda0.test.js` (Dura, Dura, Giusta → nessuno scarico; Al limite ×2 → scarico; per ogni voce di `STRESS_ZONA` la sostituzione ha lo stesso `bersaglioDi` o è lo stesso esercizio scontato); collaudo SAF-01 non peggiora; DEL-01 dei principianti: INT-0 aggiorna la soglia del collaudo (IPE-07) alzando `VERSIONE_CRITERI`.

**W0-T6 · Dati degli esercizi · Sonnet · S** — B15, B16 (tag), SEL-02, P10, P12
- File: `js/dati/dettagli-esercizi.js`, `js/dati/libreria-esercizi.js`, `js/coach/programma/schemi.js`, `tests/muscoli.test.js`.
- Cosa: hip thrust e ponte glutei fuori da `SCHEMI_MOV.hinge`; femorali tolti dai secondari di squat e leg press; Stacco con Trap Bar fuori dalla classe dei quadricipiti (resta in `catena_totale`); coppia Pullover ai Cavi → Pullover con Manubrio tolta da `SCAMBI_ALLUNGAMENTO_NUOVI`; `IN_ALLUNGAMENTO` senza «da seduto» generico. Il bersaglio dello Stacco Rumeno **non** cambia qui (i crediti di W1-T2 risolvono il conteggio senza rompere le alternative).
- Accettazione: `muscoli.test.js` verde e aggiornato; collaudo PAT-01 in palestra = 0 (a casa resta finché W1-T5 non aggiunge lo stacco rumeno con manubri: scriverlo nel report).

**INT-0**: come E.0; in più aggiorna i criteri del collaudo toccati da decisioni prese (DEL-01 principianti, con la skill del collaudo). Cancello: nessun criterio peggiora rispetto a `coach-v2-onda-0-prima`; ERR-01 = 0, TEC-01 = 0, RIR-03 = 0, EXN-01 = 0.

### E.2 Onda 1 — fondamenta

Ordine: W1-T1, T2, T3, T4 in parallelo; W1-T5 dopo T2.

**W1-T1 · Regia: perché, squadra, soglie · Opus · M** — REG-01..06 (testo), convenzioni B.4
- File: `js/coach/parametri.js`, `tools/genera-catalogo.js`, `tools/elenco-soglie.js` (nuovo), `js/coach/regia/perche.js` (nuovo: `aggiungiPerche`, `testoPerche`, `sottoCoachDi`, `nomeSottoCoach`), `js/coach/regia/soglie-regia.js` (nuovo), `tests/soglie.test.js`, `tests/catalogo.test.js`.
- In arrivo: capitolo 0 con la tabella della squadra (B.1), capitoli vuoti 21-32, righe REG-01..06, testo per la skill `implementa-regola-coach` (§2.2, §2.3, §2.4: niente wrapper nuovi, fasi registrate, file soglie, «(spegnibile)»).
- Accettazione: `npm run catalogo -- --check` fallisce se un codice non ha sotto-coach; `regolaAttiva` spegne una regola segnata «(spegnibile)» senza toccare `parametri.js`; `docs/soglie-coach.md` generato; `IA-01..05` nel catalogo.

**W1-T2 · Modello degli esercizi · Sonnet, revisione Opus · L** — SEL-01 (dati), SEL-03 (dati), SEL-06 (dati), MOD-01/04
- File: `js/dati/attributi-esercizi.js` (nuovo), `tests/attributi.test.js` (nuovo).
- Cosa: `ATTRIBUTI` per ogni esercizio della libreria: `classe` (A-F, ricerca-metodi-avanzati §3.1: il Pallof è F), `schema` (squat, hinge, spintaAnca, spintaO, spintaV, tirataO, tirataV, affondo, isolamento, core, trasporto), `muscoli` (crediti per unità: bersaglio 1, secondario motore 0,5, eccezioni con motivo: femorali 0 in squat e leg press, Kubo 2019), `profilo` (allungato/medio/accorciato/piatto), `stabilita` 1-3, `fatica` 1-3, `abilita` 1-3 (SEL-06), `unilaterale`, `stress` per 8 zone (spalla, gomito, polso, schiena, anca, ginocchio, caviglia, collo; 0-2), `attrezzo` (bilanciere/manubri/macchina/cavo/corpo/kettlebell/elastico), `serve` (sbarra, panca, parallele, ancoraggio, ruota, sedia romana), `setup` (secondi). Funzioni: `attributi(nome)`, `creditoMuscoli(nome)`, `UNITA_VOLUME` (15 unità + mappa da `MUSCOLI`), `contaVolume(sedute)` → `{ unita: { frazionarie, dirette, sedute } }`, `classeTecnica(nome)`, `livelloAbilita(nome)`, `stressArticolare(nome, zona)`, `serveAttrezzo(nome)`. Nessun consumatore cambia ancora.
- Accettazione: ogni esercizio ha tutti i campi; il credito 1 cade sull'unità del `bersaglioDi` (eccezioni elencate); report di confronto con `tipoCarico`, `stabile`, `attrezzoDi`, `RISCHIO`, `STRESS_ZONA` (differenze = correzioni volute, una riga ciascuna); fonte per voce dai capitoli 3-5 di `ricerca-biomeccanica-esercizi.md`.

**W1-T3 · Catene dei carichi senza wrapper · Sonnet, revisione Opus · L** — nessun cambiamento di comportamento
- File: `js/coach/regia/fasi.js` (nuovo: `registraFase`, `eseguiFasi`, `fasiRegistrate`), `js/coach/carichi/e1rm.js` (nuovo: `e1rm(peso, reps, rir)`, `caricoPer(e1rmKg, reps, rir)`; spostati `e1rmSerie`, `e1rmSeduta`), `js/coach/carichi/taratura.js` (nuovo: apprendimento CAR-14 spostato), `js/coach/sicurezza/scarico.js` (nuovo: spostati `DOSE_SCARICO`, `livelloFatica`; `scaricoReattivo(motivo, sedute)` usato da chi oggi scrive `ag.scarico`), `js/coach/dolore-mattina.js`, `js/coach/regole-nuove.js`, `js/coach/intensita.js`, `js/coach/regole-ricerca.js`, `js/coach/prontezza.js`, `js/coach/questionario-decisioni.js`, `js/ui/allenamento/seduta.js` (`unoRM` → `e1rm`), `tests/carichi-golden.test.js` + `tests/dati/carichi-golden.json`.
- Cosa: registrare **prima** il golden (500 casi: livelli × storici × aggiusti × scarico × prontezza × RIC/INT accesi e spenti → `caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta`); poi convertire le quattro catene in fasi (B.3) con lo stesso ordine; nessuna riassegnazione di funzioni di un altro file.
- Accettazione: golden identico (anche i testi); `npm run -s trova -- caricoProssimo` senza «riassegnato»; `fasi.js` caricato subito dopo `parametri.js`.

**W1-T4 · Generatore a stadi e brief · Sonnet, revisione Opus · L** — OBI-02 (fase), nessun altro cambiamento di comportamento
- File: `js/coach/regia/brief.js` (nuovo: `briefCoach`, `briefOggi`, `faseCorpo`), `js/coach/regia/genera.js` (nuovo: `window.buildProgram`, `giorniSettimana`, `verificaProgramma`, smistamento `specialitaStruttura`), `js/coach/sicurezza/vincoli.js` (nuovo: `vincoliSicurezza` con le regole di oggi), `js/coach/programma/ricette.js` (solo posti e scelta: `componiSedute`), `js/coach/programma/completamenti.js` (nuovo), `js/coach/programma/mesociclo.js` (nuovo: `pianoMesociclo`; spostati `strutturaProgramma`, `fasiProgramma`), `js/coach/programma/motore.js`, `js/coach/volume/serie-ripetizioni.js` (nuovo: `prescriviSerie`), `js/coach/volume/volume.js` (nuovo: `assegnaVolume` di oggi, `pavimentoVolume` → 0, `aggiungiSerieUtile` → nulla, `validaVolume` → nulla), `js/coach/volume/tempo.js` (nuovo: `durataSeduta` = formula di oggi, `adattaAlTempo`, `stimaEsercizi` = `exerciseCountFor` spostata), `js/coach/volume/tecniche.js` (nuovo: `assegnaTecniche` di oggi, dopo metodo e tocco), `js/coach/carichi/partenza.js` (`applicaPartenze`), `js/ui/onboarding.js`, `tests/genera-golden.test.js` + `tests/dati/genera-golden.json`.
- Accettazione: per 300 profili con seme fisso il JSON del programma è identico byte per byte a prima; collaudo standard identico a quello dell'etichetta `coach-v2-onda-0`; `tests/browser/coerenza-schede.js` verde.

**W1-T5 · Libreria che chiude i buchi · Sonnet · M** (dopo W1-T2) — SEL-03..04 (dati), ricerca-biomeccanica §5.5
- File: `js/dati/libreria-esercizi.js`, `js/dati/dettagli-esercizi.js`, `js/dati/attributi-esercizi.js`, `js/dati/schede-tecniche.js`, `tests/muscoli.test.js`.
- Cosa: circa 30 esercizi: Stacco Rumeno con Manubri, Stacco Rumeno a una Gamba, Hip Thrust con Manubrio, Leg Curl con Asciugamano, Leg Curl in Piedi, Trazioni Negative, Alzate Laterali con Elastico, Alzate Laterali Inclinate, Floor Press con Manubri, Chest Press Inclinata alla Macchina, Calf Raise con Manubrio sul Gradino, Tibialis Raise, Cossack Squat, Copenhagen Plank, Reverse Crunch, Suitcase Carry, Wrist Curl, Reverse Wrist Curl, Extrarotazione al Cavo, Reverse Nordic, Belt Squat, Seal Row, Squat con Pausa, Panca con Pausa, Stacco in Deficit, Sit-to-Stand dalla Panca (potenza per over 65), Scrollate con Manubri (P13). Nomi tradotti in arrivo. Disegni: mancanti (decisione H5).
- Accettazione: collaudo MOD-12 senza buchi per hinge, femorali in flessione, deltoide laterale e posteriore a casa con manubri; `tests/browser/dettagli-esercizi.js` e `traduzioni-esercizi.js` verdi.

**INT-1**: in più: `CLAUDE.md` (riga «Dove sta cosa»: `buildProgram` in `regia/genera.js`, catene in `regia/fasi.js`), regola 2 di `ARCHITETTURA.md` (niente wrapper: fasi registrate), `mappa-per-agenti.md` (nomi spostati), skill aggiornate, `npm run soglie` in `controlla`. Cancello: collaudo identico a quello di `coach-v2-onda-0` (stessa versione dei criteri).

### E.3 Onda 2 — il generatore

Ordine: **2a** = T1, T2, T3, T4 in parallelo → INT-2a (solo unione e prove) → **2b** = T5, T6, T7 in parallelo → INT-2.

**W2-T1 · Volume per muscolo · Sonnet, revisione Opus · L** — IPE-01, IPE-02, IPE-06, IPE-13, SEL-01, SEL-05, OBI-04; PRG-25..30 riscritte, PRG-26 ritirata, RIC-01 tenuta
- File: `js/coach/volume/volume.js`, `js/coach/volume/soglie-volume.js` (nuovo), `js/coach/esigenza.js`, `js/coach/intensita.js`, `tests/volume.test.js`.
- Cosa: `bersagliVolume(brief)` per unità (fasce di ricerca-ipertrofia §3.2: principiante 6-10, intermedio 10-16, avanzato 12-20; generale 4-8 / 6-10 / 8-12; pavimento 4; dirette §3.2; prioritari max 2 fino a 20-24, gli altri ≥ 6); solutore goloso: unità con il deficit relativo più alto → esercizio con più credito per minuto e meno «sbordo» → +1 serie (tetti per esercizio, per seduta 8 morbido / 11 duro, tempo da `durataSeduta`); se un'unità non ha esercizi, chiede un posto all'Architetto (`aggiungiSerieUtile` nella seduta con più tempo); `validaVolume` scrive la nota con la causa; l'esigenza sposta solo il punto di partenza dentro la fascia (mai oltre), non in deficit (OBI-04). Spenta IPE-01 → algoritmo di oggi (tenuto in `assegnaVolumeGruppi`, stesso file).
- Accettazione (con il tempo di W2-T2, misurata a INT-2a): collaudo MIS-01 = 0; VOL-01 ≤ 2% pesato e sempre con nota; VOL-02 = 0 oltre tolleranza; DIR-01 = 0 (intermedio/avanzato, ipertrofia, ≥ 3 giorni, ≥ 45 min); SES-01 = 0; PRI-01 = 0.

**W2-T2 · Il tempo · Sonnet · M** — IPE-03, IPE-04, IPE-12, IPE-14, PCO-04; PRG-03, PRG-33 riscritte
- File: `js/coach/volume/tempo.js`, `js/coach/volume/soglie-tempo.js` (nuovo), `js/coach/volume/serie-ripetizioni.js`, `tests/tempo.test.js`.
- Cosa: `durataEsercizio` = setup + serie × (ripetizioni × 3 s × (2 se unilaterale) + pausa) − ultima pausa + rampa di riscaldamento (RIS 3.9) per il primo esercizio dello schema + riscaldamento generale (RIS 3.7); `adattaAlTempo`: (1) pause al minimo della fascia della classe, (2) superserie antagoniste se fanno risparmiare (ABB-06 invariata), (3) tagli di serie (prima isolamenti non prioritari), mai sotto `pavimentoVolume`; se resta tempo ≥ 10%, `aggiungiSerieUtile`; `stimaEsercizi` dalla tabella ricerca-ipertrofia §3.8; giorno «forza» del PHUL sotto i 60 minuti a 6-8 ripetizioni (IPE-04); nota «la seduta dura circa # minuti».
- Accettazione: collaudo DUR-01 = 0; DUR-02 ≤ 3% delle sedute; EXN-01/02 = 0; SS-01/02 = 0; prova: durate di 6 sedute campione = calcolo a mano ±1 minuto.

**W2-T3 · Cancello delle tecniche · Sonnet · M** — MAV-01..09, MAV-11..14, MAV-16, IPE-10, IPE-11; PRG-34, RIC-04 riscritte
- File: `js/coach/sicurezza/tecnica-adatta.js` (nuovo: `tecnicaAdatta(tecnica, nome, brief, ctx)`, `budgetTecniche(brief, settimana)`), `js/coach/sicurezza/soglie-tecniche.js` (nuovo), `js/coach/volume/tecniche.js`, `js/coach/regole-nuove.js` (`limitaTecnicheIntense` → budget), `js/coach/regole-ricerca.js` (solo testi `TECNICHE` onesti: «non fa crescere di più, risparmia tempo»), `tests/tecniche.test.js`.
- Cosa: matrice tecnica × classe (§3.2) e gruppi G1-G5 × livello, età, PAR-Q, dolore, scarico, prontezza, poco tempo (§3.3); budget (§4.1: principiante 0, intermedio 1 per seduta e 2 a settimana, avanzato 2 e 6); posizione nel blocco (§4.2) da `prog.piano`; quanto conta nel volume (drop = 2 serie, rest-pause/myo = 3); filtro anche delle tecniche messe da metodo e tocco.
- Accettazione: collaudo TEC-01 = 0; prova sulla matrice standard: 0 tecniche su classe F, 0 G2 a principianti, over 65, PAR-Q, minorenni, scarico o prontezza < 50, budget mai superato.

**W2-T4 · Mesociclo · Sonnet · M** — IPE-05, IPE-07, IPE-08 (piano), PCO-02, PCO-07, OBI-03, OBI-10; PRG-01, PRG-38 riscritte
- File: `js/coach/programma/mesociclo.js`, `js/coach/programma/soglie-struttura.js` (nuovo), `js/coach/programma/alternative.js` (salva `versione`, `piano`, `volume`, `perche`, `modalita`, `cardio` nel programma), `tests/mesociclo.test.js`.
- Cosa: `prog.piano = { versione: 2, settimane: [{ n, fase: 'carico'|'scarico'|'test', rir: { A, B, C, D, E }, volume /* 0,8 → 1 */, tecniche: 'G1'|'G2', nota }] }`: principiante 8 settimane, scarico all'8ª, RIR 3-4 → 2-3, prime 2 settimane +1 RIR e massimo 2-3 serie (PCO-07); intermedio 2 × (5+1) con la tabella §3.5; avanzato 5+1; RIR per obiettivo (OBI-03: salute [2,3], forza sui pesanti [2,4] salvo AMRAP); `fasi` e `rirSett` derivati per chi li legge ancora.
- Accettazione: collaudo DEL-01 = 0, RIR-01 = 0, RIR-02 = 0, RIR-03 = 0; prova: forma del piano per 12 combinazioni livello × obiettivo.

**W2-T5 · Split e giorni · Sonnet · M** — PRG-02, ABB-05, OBI-01, OBI-12, PCO-09; FRZ-01 (attivazione)
- File: `js/ui/onboarding.js` (split per giorni e minuti, §3.7; domanda «Che forza?» generale/powerlifting; avviso massa + dimagrimento), `js/coach/regia/genera.js` (`giorniSettimana`: niente stesso grande muscolo in giorni consecutivi, al massimo 4 giorni di fila; aggancio `specialitaStruttura`), `js/coach/compone.js` (spareggio per aderenza, PCO-09), `js/coach/programma/soglie-split.js` (nuovo), `tests/split.test.js`.
- Accettazione: collaudo SPL-01/02 = 0, FRQ-01 = 0 (salvo frequenza 1 scelta), REC-01 = 0, REC-03 = 0.

**W2-T6 · Scelta per attributi · Sonnet, revisione Opus · L** — PRG-05..10 riscritte, IPE-09, RIC-03 (Convenzione), SEL-03, SEL-04, SEL-06..08, SEL-13, SEL-15, SEL-16, EST-04 (coppie regionali)
- File: `js/coach/programma/ricette.js`, `js/coach/programma/schemi.js`, `js/coach/programma/completamenti.js`, `js/coach/programma/struttura-pro.js`, `js/coach/programma/motore.js`, `js/coach/programma/soglie-selezione.js` (nuovo), `tests/selezione.test.js`.
- Cosa: `SLOT_DEF`, `SCHEMI_MOV`, `ISOLAMENTI`, `IN_ALLUNGAMENTO`, `SCHIENA_PESANTE` derivati dagli attributi (stessi nomi, per chi li usa); punteggio = `PRIORI` + stimolo/fatica (fatica 3 penalizzata per la massa) + profilo allungato per l'ipertrofia + abilità ≤ livello (SEL-06) + setup corto con poco tempo + `penalitaPartenza` della Bilancia (se definita, D.4); `consentito` rispetta `serveAttrezzo` (SEL-03); classe larga se il muscolo non ha alternative (SEL-04); core con un movimento «anti» e uno di flessione (SEL-07); polpacci in piedi sempre, seduto solo con ≥ 6 serie (SEL-08); per i prioritari una variante allungata e una accorciata (EST-04).
- Accettazione: collaudo EQ-01..03, ORD-01..04, RID-01/02, PAT-01, SES-03, SAF-03..05 = 0; RX-01..04 non peggiorano.

**W2-T7 · Specialista Forza: struttura · Sonnet, revisione Opus · M** — FRZ-01..05, STD-02 (testo)
- File: `js/coach/specialita/forza.js` (nuovo: `SPEC_FORZA = { attiva, split, sedute, varianti, accessori }`), `js/coach/specialita/soglie-forza.js` (nuovo), `tests/forza-struttura.test.js`.
- Cosa: 3 giorni (A/B/C: squat ×2, panca ×3, stacco ×1 + variante), 4 giorni (2 sedute squat, 2 panca pesante/volume, stacco + variante), 5 giorni; onda giornaliera pesante/media/leggera (FRZ-05); varianti e accessori per punto debole dichiarato (FRZ-03/04: «fermo in buca» → squat con pausa; «fermo a metà panca» → panca presa stretta e tricipiti); nessun test 1RM (STD-02).
- Accettazione: profili powerlifting con ≥ 3 giorni: squat ≥ 2×, panca ≥ 2×, stacco ≥ 1× a settimana; collaudo GOA-01 = 0 e DUR-01 = 0 su questi profili.

**INT-2**: cancello sulla matrice standard: MIS-01, VOL-02, SES-01, DUR-01, EXN-01/02, TEC-01, PAT-01, SPL-01/02, FRQ-01, REC-01, DEL-01, RIR-01..03 = 0; VOL-01 ≤ 2% pesato; DUR-02 ≤ 3%; `gravi_pesata` ≤ 1%. I programmi nuovi hanno `versione: 2`.

### E.4 Onda 3 — carichi e autoregolazione

Tutti in parallelo (W3-T6 usa l'aggancio di W3-T1 per nome: `modelloForza` se definita).

**W3-T1 · Bilancia v2 · Opus · L** — PGR-01..04, AUT-01..02, PCO-01, PCO-06, MOD-05; PRO-01, CAR-06/07/09 riscritte; B7, B8, B17
- File: `js/coach/carichi/modelli.js` (nuovo: `modelloProgressione(nome, brief)`, lineare/doppia/rpe/onda), `js/coach/carichi/attrezzi.js` (nuovo: `passoAttrezzo(nome, prof)`, `arrotondaAttrezzo(nome, kg, verso)`), `js/coach/carichi/soglie-progressione.js` (nuovo), `js/coach/regole-ricerca.js` (`caricoProssimoBase`: v1 invariato + smistamento v2), `js/coach/carichi/progressivo.js` (incremento = max(passo, % × carico) con scala S1/S2/S3 misurata sulle ultime 6 volte; `ultimeSessioni(nome, n, banda)`), `js/coach/carichi/e1rm.js` (ripetizioni + RIR, migliore di due sedute, rumore 3%), `js/coach/volume/serie-ripetizioni.js` (range `ripRange` per classe e obiettivo, ricerca-forza §3.4), `js/ui/opzioni/il-coach.js` («Pesi della tua palestra»: microdischi, passo manubri, passo macchine, manubrio più pesante a casa), `js/dati/scheda-unica.js`, `tests/bilancia-v2.test.js`.
- Cosa: fase 'carico' 10 v2 per `versione ≥ 2`; fase 20: se il bersaglio di ripetizioni cambia di ≥ 2 rispetto all'ultima volta (o la banda è diversa), carico = `caricoPer(e1rm recente, reps, RIR)` per difetto (risolve B7, B8, TOCCHI piramide, cambio di blocco); arrotondamento all'attrezzo vero per tutti i programmi (B17).
- Accettazione: 0 carichi fuori griglia; scala per esercizio con intervalli 0/7/21 giorni; conversione 5→8 ripetizioni entro ±2,5% del calcolo; AUT-01 mai oltre 2 punti di RPE (≈ 6%); principianti: l'RPE frena e non accelera (salvo calibrazione); programmi v1: golden invariato salvo arrotondamento (differenze elencate).

**W3-T2 · Partenza bassa per le donne · Sonnet, revisione Opus · M** — PAR-06..09, CAR-18..19 (capitolo D)
- File: `js/coach/carichi/partenza.js` (PAR-06..09, `penalitaPartenza`, già chiamata da `ricette.js` dopo W2-T6), `js/coach/carichi/calibrazione.js` (nuovo), `js/coach/carichi/soglie-partenza.js` (nuovo), `js/coach/intensita.js` (INT-05 esclude la calibrazione), `js/coach/esigenza.js` (ESI-02 idem), `tests/partenza-donne.test.js`, `tests/aiuto-atleta.js` (nuovo: `atletaVirtuale({ sesso, livello, capacita: { nome: e1rmVero }, rumoreRpe, quotaSenzaRpe, seme })` → `{ eseguiSeduta(voci del piano) → serie con ripetizioni e RPE }`, capacità che cresce con la scala del livello).
- Accettazione: D.8 per intero.

**W3-T3 · Taratura del RIR e autoregolazione in seduta · Sonnet · M** — CAR-14 riscritta, CAR-13 riscritta (serie di punta + back-off per il modello rpe), MAV-04, MAV-10, AUT-03
- File: `js/ui/allenamento/seduta.js`, `js/coach/carichi/taratura.js`, `js/coach/carichi/soglie-taratura.js` (nuovo), `css/allenamento.css`, `tests/taratura.test.js`, `tests/browser/taratura.js` (nuovo).
- Cosa: serie di taratura con previsione **sulla stessa serie** («Arrivato a # ripetizioni: quante ne faresti ancora?» poi fino al cedimento; bias = previsto − vero, media mobile) solo su classi D/E e per chi può (MAV-04); dopo la prima serie, con RPE ≥ bersaglio + 1,5 la seduta propone −5% (un tocco, annullabile), con RPE ≤ bersaglio − 2 propone +2,5-5% (AUT-03); pulsanti manuali Drop e Rest-pause con il testo onesto (MAV-10).
- Accettazione: nessun apprendimento da serie diverse; suggerimento in seduta mai per principianti in aumento, mai in scarico; prova in browser a 360×640.

**W3-T4 · Volume che si adatta e rampa in seduta · Sonnet, revisione Opus · M** — IPE-08 (in seduta), PCO-03, CST-07, CST-08; PRZ-01..03 riscritte, RIC-01 assorbita
- File: `js/coach/volume/autoregolazione.js` (nuovo: fase 'carico' 40, `decidiVolumeSettimana()`), `js/coach/volume/soglie-autoregolazione.js` (nuovo), `js/coach/prontezza.js` (voci sonno, stress, dolenzia, energia 0-8 non pesate; «voglia» a parte; facoltativa «Quali muscoli sono ancora indolenziti?» con le unità di oggi), `tests/autoregolazione.test.js`.
- Cosa: serie della settimana = serie base × `piano.volume` + delta per unità; delta +1 se nelle ultime 2 sedute dell'unità serie tutte fatte, RPE ≥ 1 sotto il bersaglio, prontezza ≥ 70 e nessuna dolenzia; −1 se dolenzia forte prima dell'unità in 2 delle ultime 3 sedute o massimale in calo oltre il 3%; sempre tra pavimento e MRV; messaggio del lunedì con Annulla.
- Accettazione: programmi v1 invariati; prove su storici sintetici per i tre esiti; mai +1 a principianti nelle prime 4 settimane, a prudenti, in deficit con prontezza < 70.

**W3-T5 · Scarichi e controlli periodici · Sonnet · M** — CAR-03, CAR-08, CAR-10, DEC-05/06, STR-01, STA-01..03, CIC-01, CST-09, PCO-05, B9 (scala 0-10), B23 (dosi)
- File: `js/coach/sicurezza/scarico.js` (`DOSE_SCARICO` unica per pianificato e reattivo: serie −40/−50%, carico −5/−10%, RIR 4; `serveScarico()` con i segnali di ricerca-ipertrofia §3.6), `js/coach/sicurezza/soglie-scarico.js` (nuovo), `js/coach/questionario-decisioni.js` (sRPE 0-10 a cursore senza valore iniziale), `js/coach/repertorio.js` (strain con i minuti di cardio; stalli e verdetto col migliore di due sedute e soglia 3%; rotazione accessori solo se serve, PCO-05; stanchezza persistente → riposo e rinvio al medico, CST-09), `tests/scarichi.test.js`.
- Accettazione: una sola tabella di dose usata da tutti (prova con `grep` nel test); cap. 17 n. 3 della mappa chiuso per gli scarichi.

**W3-T6 · Specialista Forza: carichi · Sonnet, revisione Opus · M** — FRZ-06..10, TAP-01 (spenta di base)
- File: `js/coach/specialita/forza-carichi.js` (nuovo: `modelloForza(nome, brief, storia)`), `js/coach/specialita/soglie-forza-carichi.js` (nuovo), `tests/forza-carichi.test.js`.
- Cosa: massimale di lavoro = 90% dell'e1RM; onda di 3 settimane + scarico con percentuali e tetto di RPE; AMRAP di appoggio sull'ultima serie (mai sugli stacchi, MAV-06) che aggiorna il massimale di lavoro (+2,5 kg alto / +5 kg basso, fermo o −10%); settimana di test con 5RM o e1RM solo per avanzati (STD-02); taper TAP-01 spento finché la nota non è verificata.
- Accettazione: atleta virtuale powerlifting (`tests/aiuto-atleta.js` di W3-T2: questo ramo si unisce dopo W3-T2): nessuna serie sopra la capacità a RPE 9; massimale di lavoro che segue la capacità entro ±5% in 12 settimane.

**INT-3**: cancello: atleta virtuale (D.8 punto 9 e W3-T6), 0 carichi fuori griglia, golden v1 con sole differenze elencate.

### E.5 Onda 4 — sicurezza, recupero, popolazioni

Tutti in parallelo.

**W4-T1 · Modifica, non escludere · Sonnet, revisione Opus · L** — REC-01..08, PCO-08, SEL-10..11; DEC-01..04, DOL-01, BIO-02, BIO-06, PRG-07 riscritte
- File: `js/coach/sicurezza/fastidi.js` (nuovo: `livelloFastidio`, `consenteEsercizio(nome, brief)` → `{ ok, modifica, alternativa, motivo }`, matrice per 8 zone da ricerca-recupero §3 e dagli attributi `stress`), `js/coach/sicurezza/soglie-fastidi.js` (nuovo), `js/coach/programma/motore.js` (`consentito` delega), `js/coach/questionario-decisioni.js` (domande d'allarme REC-01, gradini), `js/coach/dolore-mattina.js` (controllo del mattino per ogni livello e gradino, REC-02; rientro a 4 fasi, REC-08), `js/coach/biomeccanica.js` (`SCALE_DOLORE` → fastidi.js; respirazione cauta, REC-06), `js/ui/onboarding.js` (8 zone e 4 domande per zona, REC-03/04), `js/coach/prontezza.js` (dolore di oggi e «sto male», REC-05/07), `tests/fastidi.test.js`.
- Accettazione: collaudo SAF-01 = 0, SAF-02 sempre con nota di modifica, SAF-06 = 0, MOD-02 e MOD-03 «ok»; per ogni zona verde/gialla ogni unità ha almeno un esercizio; ogni segnale rosso porta il testo «Non sono un medico e non faccio diagnosi» e il rinvio.

**W4-T2 · Popolazioni e rientro · Sonnet, revisione Opus · M** — REC-09..15, CST-01, CST-02, DCA-01; CAR-04, RIC-05 riscritte
- File: `js/coach/sicurezza/popolazioni.js` (nuovo: `vincoliPopolazione(brief)`, `pianoRientro()`, fase 'carico' 90), `js/coach/sicurezza/vincoli.js`, `js/coach/sicurezza/soglie-popolazioni.js` (nuovo), `js/coach/regole-nuove.js`, `js/coach/regole-ricerca.js`, `js/ui/opzioni/il-coach.js` (gravidanza o post-parto, pressione alta, lavoro seduto), `tests/popolazioni.test.js`.
- Cosa: minorenni (REC-11 completa); over 65 (REC-13: dopo 6 settimane senza problemi RIR 2 sulle macchine e potenza sul primo multiarticolare stabile; aumenti dimezzati **anche per età**, come dice il cap. 14 e il codice oggi non fa); donne dai 50 anni (REC-14: progressione verso carichi alti dopo 8 settimane, per l'osso); gravidanza e post-parto (REC-12); ipertensione (RPE ≤ 7, niente apnea); obesità (REC-15: macchine con schienale, niente transizioni dal pavimento sotto carico); rabdomiolisi e dolenzia (REC-09); rientro unico (CST-01/02 + CAR-04: −25%, −10%, piano; carichi per esercizio; +1 RIR per 2 sedute; «Sto bene: come da piano»); guardia su deficit e peso per minorenni, IMC < 18,5, gravidanza (DCA-01).
- Accettazione: prove per popolazione; collaudo SAF-05 = 0; la matrice completa (sesso × età) senza nuove violazioni.

**W4-T3 · Riscaldamento e mobilità · Sonnet · M** — RIS-01..13 (assorbe REC-10, PCO-10)
- File: `js/coach/tecnica/riscaldamento.js` (nuovo: `rampaRiscaldamento`, `riscaldamentoGenerale`, `bloccoMobilita`; fase 'apertura' 30), `js/coach/tecnica/soglie-riscaldamento.js` (nuovo), `js/ui/allenamento/seduta.js` (righe di rampa automatiche con «Salta»; `addWarmup` usa la rampa), `js/coach/volume/tempo.js` (legge le stesse soglie), `tests/riscaldamento.test.js`.
- Accettazione: gli esempi di ricerca-riscaldamento §3.10 riprodotti esatti; tetto di tempo 5/8/10 minuti; nessuna rampa sugli isolamenti dopo un multiarticolare dello stesso gruppo.

**INT-4**: cancello: SAF-01..06 = 0, MOD-01..12 «ok» o «info», matrice completa senza errori.

### E.6 Onda 5 — mente, corpo, interfaccia, traduzioni

Tutti in parallelo (W5-T5 usa l'aggancio di W5-T2 in `oggi.js`: `htmlAggiornaCoach()` se definita).

**W5-T1 · Perché e squadra in vista · Sonnet · M** — REG-03 (interfaccia), SEL-12, OBI-18
- File: `js/coach/agente-consigli.js`, `js/ui/opzioni/il-coach.js` (squadra, interruttori per sotto-coach, muscoli prioritari fini max 2), `js/ui/onboarding-risultato.js`, `js/ui/allenamento/seduta.js` (etichette e foglio «Perché?»), `js/coach/biomeccanica.js` (cue specifico + cue di schema, SEL-12), `css/componenti-coach.css`, `tests/browser/squadra.js` (nuovo).
- Accettazione: ogni nota di esercizio con almeno un perché e un'etichetta; il foglio «Perché?» mostra codice, sotto-coach e testo; a 360×640 nessuno sbordo; nessuna frase senza traduzione (`controlla-traduzioni.js` sui testi della prova).

**W5-T2 · Il Motivatore: costanza e scelte · Sonnet · M** — CST-03..06, CST-10..12, PSI-11 (domande riproposte a ogni nuovo ciclo), PSI-12 (gradimento per esercizio dopo la seduta → graditi/odiati), ADE-01 → CST-12
- File: `js/coach/mente/costanza.js` (nuovo), `js/coach/mente/soglie-mente.js` (nuovo), `js/coach/psicologia.js`, `js/coach/stato.js`, `js/ui/oggi.js`, `js/coach/programma/alternative.js` (punti di scelta: 1 su 2 per 2-3 posti per seduta), `tests/costanza.test.js`.
- Accettazione: nessuna parola vietata (lista di ricerca-psicologia §3.3) nei testi del coach (prova sul codice); settimana minima senza cambiare i carichi; serie «N settimane attive su 12».

**W5-T3 · Il Preparatore · Sonnet · M** — AER-01..04, NUT-01..02, PES-01..04, DCA-02..03, OBI-05..09, OBI-11, OBI-17; COR-01..03, BIA-02, MET-03, PRO-04 riscritte; PRG-26 ritirata; B23 (grasso, massa magra)
- File: `js/coach/corpo/cardio.js` (nuovo: `pianoCardio`, `minutiCardioSettimana`, collocazione), `js/coach/corpo/peso.js` (nuovo: `tendenzaPeso`), `js/coach/corpo/soglie-corpo.js` (nuovo), `js/coach/repertorio.js` (`corpoCoach`, mantenimento a fine ciclo OBI-11), `js/coach/compone.js` (`fattoreFisico` solo prudenza, una soglia di grasso alto), `js/coach/bia/lettore.js` (categorie descrittive separate dalle soglie decisionali; domande di contesto PES-02), `js/coach/carichi/progressivo.js` (`frenoBia` con conferma, PES-03), `tests/preparatore.test.js`.
- Accettazione: cap. 17 n. 3 della mappa chiuso (una soglia per concetto); nessuna caloria prescritta; nessun numero per minorenni, gravidanza, patologie.

**W5-T4 · Specialista Estetica · Sonnet · M** — EST-01..03, EST-05..06, MAV-15
- File: `js/coach/specialita/estetica.js` (nuovo: `SPEC_ESTETICA`, `puntiDeboli()`), `js/coach/specialita/soglie-estetica.js` (nuovo), `tests/estetica.test.js`.
- Cosa: indice di progresso per unità (mediana della variazione di e1RM degli esercizi dell'unità ogni 4 settimane, scarichi esclusi) contro la mediana dell'utente; ultimo quarto per 2 blocchi e non prioritario → proposta «Priorità: <muscolo>» (un tocco, annullabile); specializzazione a blocchi di 4-6 settimane, poi rotazione o blocco bilanciato; tecniche nella specializzazione (MAV-15).
- Accettazione: nessuna proposta con meno di 2 blocchi di dati, mai in deficit per gli avanzati; prove con storici sintetici.

**W5-T5 · Aggiornamento al coach nuovo · Sonnet · S** — REG-04, REG-06
- File: `js/coach/regia/migrazione.js` (nuovo: `htmlAggiornaCoach`, `aggiornaAlCoachNuovo`), `tests/migrazione.test.js`.
- Cosa: per un programma senza `versione`: scheda in Oggi («Il coach ha imparato cose nuove: vuoi rifare il programma con le stesse preferenze?»), una volta per ciclo; fotografia delle chiavi `coach_plus_*` della modalità, nuovo programma da lunedì, Annulla che ripristina tutto.
- Accettazione: 6/6 fixture v1: scheda visibile una volta, aggiornamento riuscito, annulla = archivio identico byte per byte.

**INT-5**: cancello: tutte le frasi del campione (≥ 500 testi generati sulla matrice) tradotte; `tests/browser/` tutti verdi.

### E.7 Revisione finale

**F-1 · Revisione completa · Opus · M**: collaudo sulla matrice completa (64.800 profili) contro la tabella G; lettura «da coach» di 30 programmi (rubrica di INT); revisione del diff da `coach-v2-onda-0` contro gli invarianti F; documenti: mappa delle regole (tutti i capitoli coerenti, cap. 17 svuotato o aggiornato), `mappa-per-agenti.md` (sezione «Sotto-coach → file»), `ARCHITETTURA.md`, `PIANO.md` (fase 6 fatta), `CLAUDE.md`, le due skill; elenco del codice morto per F-2; decisione sul riordino fisico dei file vecchi (B.4).
**F-2 · Pulizia · Sonnet · S**: toglie i rami legacy ormai inutili (`assegnaVolumeGruppi`, tabelle regex sostituite dagli attributi, html di SAL/ADE non più chiamati), solo dopo che G è verde; rigenera tutto.

### E.8 Proprietà dei file che passano tra onde

| File | O0 | O1 | O2 | O3 | O4 | O5 |
|---|---|---|---|---|---|---|
| `js/coach/programma/ricette.js` | T2 | T4 | T6 | — | — | — |
| `js/ui/onboarding.js` | T2 | T4 | T5 | — | T1 | — |
| `js/coach/regole-ricerca.js` | T4 | T3 | T3 | T1 | T2 | — |
| `js/coach/regole-nuove.js` | — | T3 | T3 | — | T2 | — |
| `js/coach/intensita.js` | T4 | T3 | T1 | T2 | — | — |
| `js/coach/esigenza.js` | T4 | — | T1 | T2 | — | — |
| `js/coach/prontezza.js` | T4 | T3 | — | T4 | T1 | — |
| `js/coach/questionario-decisioni.js` | T5 | T3 | — | T5 | T1 | — |
| `js/coach/dolore-mattina.js` | T3 | T3 | — | — | T1 | — |
| `js/coach/repertorio.js` | T4 | — | — | T5 | — | T3 |
| `js/coach/programma/motore.js` | T5 | T4 | T6 | — | T1 | — |
| `js/coach/biomeccanica.js` | T5 | — | — | — | T1 | T1 |
| `js/coach/compone.js` | T2 | — | T5 | — | — | T3 |
| `js/coach/carichi/progressivo.js` | T3 | — | — | T1 | — | T3 |
| `js/coach/carichi/partenza.js` | — | T4 | — | T2 | — | — |
| `js/ui/allenamento/seduta.js` | — | T3 | — | T3 | T3 | T1 |
| `js/ui/opzioni/il-coach.js` | — | — | — | T1 | T2 | T1 |
| `js/coach/programma/alternative.js` | — | — | T4 | — | — | T2 |
| `js/coach/volume/tempo.js` | — | T4 | T2 | — | T3 | — |
| `js/coach/volume/serie-ripetizioni.js` | — | T4 | T2 | T1 | — | — |
| `js/dati/attributi-esercizi.js` | — | T2→T5 | — | — | — | — |

In ogni onda (e sotto-onda 2a/2b) nessun file compare in due task.

---

## F. Rischi e invarianti

### F.1 Invarianti (ogni integrazione li verifica)
1. **Ordine di caricamento**: i file nuovi non usano nomi di altri file al caricamento, tranne `registraFase` (con `fasi.js` subito dopo `parametri.js`). `npm run simboli -- --check` lo controlla.
2. **Niente wrapper nuovi**: dopo W1-T3 nessun file riassegna una funzione di un altro file; una regola nuova registra una fase. Un `const` di primo livello non è una proprietà di `window`: i moduli facoltativi si cercano con `typeof X === 'function'`.
3. **Un nome, un file** (`npm test`); i nomi nuovi in italiano, verbo + oggetto.
4. **Chiavi dei dati**: **nessuna chiave nuova** di `localStorage`; lo stato nuovo vive in campi nuovi di oggetti esistenti (programma, profilo, aggiusti, storia della prontezza, sedute). `_toji` e `@tojiworkout` non cambiano.
5. **Consenso**: ogni punto d'ingresso nuovo controlla `coachAttivo()`; senza consenso il coach non legge né scrive.
6. **Precedenza della Sentinella**: fase 90 sempre ultima prima del testo; prova dedicata per i prudenti.
7. **Perché e annulla**: ogni cambiamento scritto nel piano ha codice, sotto-coach, testo e Annulla.
8. **Traduzioni**: ogni frase nuova (anche i pezzi del motivo tra « • ») nei tre dizionari, numeri come `#`; frasi nuove con accenti e apostrofo tipografico.
9. **File generati** mai a mano; `CACHE_NAME` alzato una volta per onda, prima del grafo.
10. **Età**: «minorenne» = `eta > 0 && eta < 18` (0 = sconosciuta); `parq` nel profilo è un booleano.
11. **Seme**: stesso seme, stesso programma; un cambiamento nell'ordine dei punteggi cambia i programmi: il golden si aggiorna solo nei task che lo dichiarano.
12. **Il collaudo non si «aggiusta»**: le sue soglie cambiano solo in INT, con motivo e `VERSIONE_CRITERI` alzata.

### F.2 Rischi e rimedi

| Rischio | Dove | Rimedio |
|---|---|---|
| Rompere le catene dei carichi togliendo i wrapper | W1-T3 | golden registrato prima; revisione Opus; nessun altro task tocca quei file in W1 |
| Programma diverso «in silenzio» durante la scomposizione | W1-T4 | golden byte per byte su 300 profili + collaudo identico |
| Volume e tempo che si contendono le serie | W2-T1/T2 | interfacce `pavimentoVolume` e `aggiungiSerieUtile` fissate in W1; misura congiunta in INT-2a |
| Dati degli attributi sbagliati moltiplicati ovunque | W1-T2 | revisione Opus con le note di ricerca; confronto con le tabelle vecchie; correzioni elencate una per una |
| Chi è a metà programma vede cambiare progressione e volume | W2-W3 | tutto il nuovo solo con `prog.versione ≥ 2`; ai vecchi solo i bug dell'onda 0 e l'arrotondamento all'attrezzo |
| Merge in conflitto su file condivisi | tutte | file condivisi solo in INT tramite `docs/in-arrivo/` |
| Messaggi medici oltre il dovuto | W4 | solo prudenza e rinvio; frasi dalla nota di ricerca; «Non sono un medico e non faccio diagnosi» |
| Partenza troppo bassa che scoraggia | W3-T2 | calibrazione in 2-3 esposizioni, testo che lo spiega, promemoria dell'RPE |
| Prestazioni (solutori con cicli) | W2 | cicli limitati; collaudo misura il tempo: mediana < 50 ms per programma |
| Prove in browser che non girano (catena ferma a `intensita-bia.js`) | W0 | W0-T1 le fa girare tutte |
| Grafo non rigenerabile senza rete | INT | regola della skill: niente modifiche a mano, scriverlo nel commit |

### F.3 Programmi già salvati sui telefoni
- **Campi nuovi, tutti facoltativi**: programma (`versione`, `piano`, `volume`, `perche`, `modalita`, `cardio`), voci del piano (`slot`, `ripRange`, `partenzaBassa`, `perche`), sedute (`settimana`, `obiettivo`), aggiusti (`volumeUnita`, `rientro`, `calibrazione`, `fastidi`), profilo (`modalita`, `prioritaUnita`, `passiPalestra`, `gravidanza`, `pressioneAlta`, `lavoroSeduto`, `fastidiDettaglio`). Chi legge usa un valore di base se manca.
- **Compatibilità all'indietro**: `fasi` e `rirSett` restano scritti (derivati dal piano), così ogni lettore vecchio funziona; un backup nuovo ripristinato su un'app vecchia ignora i campi sconosciuti.
- **Nessuna riscrittura automatica**: un programma senza `versione` continua con le regole v1 fino al prossimo ciclo (`nuovoCiclo`) o all'aggiornamento proposto (W5-T5) con Annulla.
- **Prove**: le 6 fixture v1 di W0-T1 girano in ogni onda (`tests/migrazione-v1.test.js`).

### F.4 Ogni onda resta rilasciabile
- Ogni regola nuova è «(spegnibile)»: in caso di problema in produzione si spegne la regola, non si torna indietro di un'onda.
- Ogni algoritmo riscritto tiene il ramo vecchio come comportamento «spento» fino a F-2.
- Etichette `coach-v2-onda-N` dopo ogni INT: punti di ritorno.
- Un'onda che non passa il suo cancello non si unisce: si corregge nel ramo del task.

---

## G. Definizione di fatto (tutta la revisione)

Misure sulla **matrice completa** del collaudo (64.800 profili, pesi della popolazione) e sulle prove; valori da raggiungere in F-1.

| Area | Bersaglio |
|---|---|
| Robustezza | collaudo ERR-01 = 0, SAN-01 = 0; `gravi_pesata` ≤ 0,5% |
| Volume | MIS-01 = 0; VOL-01 ≤ 2% pesato e 100% con nota della causa; 0 in palestra con ≥ 45 min e ≥ 3 giorni; VOL-02 = 0; SES-01 = 0; DIR-01 = 0 (intermedio/avanzato, ipertrofia, ≥ 3 giorni, ≥ 45 min); PRI-01 = 0; nessun muscolo sotto 4 serie frazionarie senza nota |
| Frequenza e struttura | FRQ-01 = 0 (salvo frequenza 1 scelta); FRQ-02 ≤ 5%; SPL-01/02, REC-01..03, EQ-01..03, PAT-01, SES-03, ORD-01..04, RID-01/02, SS-01/02 = 0 gravi |
| Tempo | DUR-01 = 0 (nessuna seduta oltre +10%); DUR-02 ≤ 3% delle sedute; mediana dello scarto tra durata stimata e minuti dichiarati ≤ 7%; EXN-01/02 = 0 |
| Sforzo e tecniche | TEC-01 = 0; RIR-01..03 = 0; DEL-01 = 0; 0 violazioni della matrice di idoneità (MAV) e del budget |
| Sicurezza | SAF-01 = 0; SAF-02 100% con nota di modifica; SAF-03..06 = 0; MOD-01..12 «ok» o «info» |
| Forza | GOA-01 = 0; profili powerlifting: squat ≥ 2×, panca ≥ 2×, stacco ≥ 1× a settimana |
| Carichi (atleta virtuale, ≥ 500 per gruppo) | 0 carichi fuori dalla griglia dell'attrezzo; 0 prescrizioni sopra la capacità al RIR bersaglio − 1; convergenza entro ±10%: mediana ≤ 3 esposizioni per le donne con partenza bassa, ≤ 2 per gli altri, 95° percentile ≤ 5 |
| Partenza bassa donne | 100% delle stime idonee con PAR-06 applicata; 0 per avanzate e uomini |
| Spiegazioni | 100% delle voci del piano e delle note del programma con almeno un perché e un codice del catalogo; 100% dei codici del catalogo con un sotto-coach |
| Traduzioni | 0 pezzi mancanti in en, es, de su ≥ 500 testi generati (`controlla-traduzioni.js`) |
| Soglie | 100% delle voci con `forza` e `fonte`; 0 «Provvisoria» nelle soglie della Sentinella; ≤ 10% «Provvisoria» in totale |
| Migrazione | 6/6 fixture v1 aprono e chiudono una seduta senza errori; v1 invariato salvo correzioni elencate; aggiornamento annullato = archivio identico |
| Codice | `npm run controlla` verde; tutte le prove di `tests/browser/` verdi; `npm run grafo:verifica` verde; nessun wrapper tra file |
| Prestazioni | `buildProgram` mediana < 50 ms e 95° percentile < 150 ms in node; apertura di una seduta con 8 esercizi < 30 ms |

---

## H. Decisioni che servono davvero all'utente

1. **Calibrazione rapida (CAR-18) per tutti i principianti, uomini compresi?** Consiglio: sì (stessa logica, partenza normale). Senza, gli uomini principianti restano con CAR-16.
2. **Disegni per i ~30 esercizi nuovi** (W1-T5): si pubblicano senza illustrazione (scheda testuale) e i disegni arrivano dopo, oppure si aspetta? Consiglio: senza, con le schede tecniche complete.
3. **Attrezzi di casa in più** (elastici, kettlebell, panca, anelli) tra le attrezzature selezionabili: consiglio sì, servono a coprire deltoidi, bicipiti e femorali a casa.
4. **Modalità Forza**: tenere spento il taper prima di una gara (TAP-01) finché la ricerca non è verificata? Consiglio: sì, spento.
5. **Aggiornamento dei programmi già salvati**: proposta con Annulla (consigliato) o passaggio automatico al prossimo ciclo soltanto?
6. **Nuovi obiettivi** (correre 5K, abilità come «prima trazione», schiena-collo-spalle, sport di squadra): fuori da questo piano, da fare in un'onda 6?
7. **Pause più corte per le donne (PRG-20, una sola fonte)**: tenerle come oggi (−15%) o portarle alla fascia normale della classe? Consiglio: tenerle, scritte come «Moderata, fonte unica».
