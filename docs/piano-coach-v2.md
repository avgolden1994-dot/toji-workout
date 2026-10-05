# Piano coach v2: la squadra del coach

> Documento di progetto del 5 ottobre 2026 (ramo `claude/fitness-expertise-development-2pptmr`, dopo `f555dc4`). **Non cambia codice**: decide architettura, innovazioni, la regola «partenza bassa per le donne» e il lavoro a ondate (32 task + 6 integrazioni + revisione finale).
> Ingressi letti: gap analysis (24 bug B1-B24, 16 aree), `docs/coach-mappa-regole.md`, `docs/PIANO.md`, `docs/ARCHITETTURA.md`, `docs/mappa-per-agenti.md`, testa di `docs/mappa-simboli.md`, storia `git log` del coach, il codice di `js/coach/` e `js/dati/`, le note `docs/ricerca-*.md` (ipertrofia, forza, metodi avanzati, metodi dei coach, recupero e popolazioni, riscaldamento, psicologia, cardio e nutrizione, obiettivi, biomeccanica), lo strumento `tools/collaudo-generatore.js` e la skill `implementa-regola-coach`.
> **Registro delle decisioni:** `docs/coach-v2-decisioni.md` mette d'accordo questo piano con **tutte le 18 note** e con il collaudo del codice di oggi; **dove i due documenti non coincidono vale il registro**. Ogni task lo legge prima (E.0).

### Registro delle modifiche

| Data | Cosa cambia | Perché |
|---|---|---|
| 2026-10-05 | Prima versione (architetto) | — |
| 2026-10-05 | **Coach IA rimosso il 2026-10-05** (decisione del proprietario): `IA-01..05` e `coach-ia.js` escono dalla tabella della squadra (Motivatore) e dal catalogo; i codici sono ritirati nel registro A.3 (stato «rimossa»); la riga di accettazione di W1-T1 sul catalogo è aggiornata. La storia resta nel capitolo 13 della mappa | Il Coach IA era l'unico invio di dati fuori dal telefono |
| 2026-10-05 | **Revisione del caporedattore** con il registro `docs/coach-v2-decisioni.md`: (1) codici: le regole dei principianti diventano **PRN** (collisione con il collaudo PRI-01); «REC-13..15» del piano rimappati su ETA-08, DON-13, PRN-15; doppioni unificati (MES-02 rampa di RIR, MES-03 rampa di serie, MES-01/PRN-03 blocchi, CAS-05..08 tempo, MES-06 scarico, AUT-02, PGR-04, RIS, MAV-03, EST); tabella B.1 riscritta; (2) **cap. D** riscritto con i numeri della nota donne (0,60/0,65/0,75 principiante, 0,85 intermedia) e una tabella di salti per la calibrazione (il ricarico dal massimale non poteva convergere); (3) **cap. H deciso** (D-P1..D-P18 nel registro); (4) **cancello delle regole bloccate** nel protocollo E.0 (16 regole, 7 in parte); (5) ogni task ha la riga **«Leggere prima»** con le sezioni esatte delle note; (6) le soglie di accettazione portano i numeri **«prima»** del collaudo (`base`, commit `0e71714`) e coprono tutti i 40 criteri che oggi falliscono (registro E); (7) riordino: onda 0 più larga (SAF-01, attrezzi a casa, femorali, pavimenti del RIR, scarico composto), **partenza bassa W3-T2 → W2-T8**, PCO-08 da W4-T1 a W2-T6, **W4-T2 ristretto** alle parti non bloccate; (8) tabella E.8 delle proprietà dei file rifatta sugli elenchi «File» (nessun file in due task della stessa onda o sotto-onda); (9) G con i «prima» per ogni area; F.3 senza il campo `pressioneAlta` | note arrivate dopo la prima versione (principianti, mesocicli, algoritmi, specializzazione, casa, donne, età) e collaudo completato |

## 0. Cosa non si ridiscute e cosa non si rifà

**Decisioni prese (restano):** la BIA è una bandiera di prudenza, mai un motore di decisioni sui carichi (INT-01..03); il Coach IA commenta e non decide numeri, e non riceve dati nuovi senza cambiare `TESTI_IA` (aggiornato il 2026-10-05: il Coach IA è stato rimosso per intero, la clausola non vale più); tutto resta sul telefono e dietro `coachAttivo()`; ogni suggerimento ha un motivo scritto in italiano ed è annullabile; nuova decisione dell'utente: **carichi di partenza bassi per le donne fino al livello intermedio**, poi salita rapida (capitolo D).

**Già fatto, da non rifare:** un file per area e nomi globali (fase 1); catalogo generato dalla mappa, `COACH_PARAMETRI`, `regolaAttiva`, scheda unica (fase 2); RIC-01..05 spegnibili (fase 3); consenso del Coach IA completo (fase 4; superato il 2026-10-05: Coach IA rimosso); ABB-01..10, INT-01..05, EPO/TEC (fase 4b); alternative e sostituti **solo con lo stesso muscolo bersaglio** (`alternativeStessoMuscolo`, commit `8f69a8d`); copia di sicurezza `backup/prima-del-riordino-coach-2026-10-01`. Il piano tiene questi principi e li porta sugli attributi degli esercizi.

**Codici:** le note di ricerca hanno già proposto prefissi liberi (IPE, PGR, AUT, STD, TAP, MAV, PCO, REC, RIS, CST, AER, NUT, PES, DCA, OBI, SEL, MES, ALG, CAS, ETA, più DON, SPE e PRI). Il piano **usa quei codici** e ne aggiunge solo quattro: **REG** (regia), **FRZ** (modalità forza), **EST** (modalità estetica) e le estensioni **PAR-06..09**, **CAR-18..19** (donne). Le regole dei principianti PRI-xx diventano **PRN-xx** (collisione con il collaudo PRI-01); DON e SPE confluiscono in PAR/CAR e in EST; i doppioni tra note hanno **un solo codice finale**: la tabella completa vecchio → finale → sotto-coach → task è nel registro (`docs/coach-v2-decisioni.md` A.3) e vale per tutti i task. I codici esistenti non si rinumerano mai. Attenzione: lo strumento di collaudo ha un suo spazio di nomi (ERR, VOL, REC, TEC, PRI…): nel piano si scrive **sempre** «collaudo VOL-01» per distinguerli dalle regole; un codice senza «collaudo» davanti è una regola del coach.

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
| `regista` | **Il Regista** | «Metto insieme il lavoro della squadra, controllo che il programma regga e ti spiego perché.» | LIV-01..02, CIC-01..02, STD-01..02, **REG-01..06**, MES-09, MES-12..13 | → `js/coach/regia/` (brief, genera, fasi, perche, migrazione) |
| `architetto` | **L'Architetto** | «Decido i giorni, la divisione, il ciclo di settimane e quali esercizi entrano.» | PRG-01..11, PRG-21..24, PRG-35, PRG-39, MET-01..06, EPO-01..07, ABB-01..10, SCH-01, IPE-09, MES-01..02, MES-14 (riscrive STA-03), PRN-03, PRN-14..15, PCO-09, OBI-01, OBI-03, OBI-12, SEL-03..04, SEL-06..08, SEL-13, SEL-15..16, CAS-01, CAS-14 | `js/coach/programma/*`, `compone.js`, `metodi-momenti.js` (METODI), `metodi-epoca-oro.js`, `js/ui/onboarding.js` (split) |
| `dosatore` | **Il Dosatore** | «Decido quante serie fa ogni muscolo, ripetizioni e pause, e faccio stare tutto nei tuoi minuti.» | PRG-12..20, PRG-25..34, PRG-36..38, RIC-01, ESI-01..03, IPE-01..02, IPE-04, IPE-06, IPE-12, MES-03, MES-11, PRN-01, PCO-03..04, OBI-04, CAS-05..08, CAS-10, CAS-18 | `esigenza.js` → `js/coach/volume/` |
| `bilancia` | **La Bilancia** | «Decido quanto sollevi: il carico di partenza, quando salire e di quanto.» | PAR-01..05, **PAR-06..09**, PRO-01..04, CAR-01..02, CAR-04..07, CAR-09, CAR-11..17, **CAR-18..19**, INT-04..05, RIC-02, STA-01..02, PGR-01..02, PGR-04, AUT-01..03, ALG-02, ALG-05..06, ALG-08, ALG-11, ALG-14, ALG-17, PCO-01, PCO-06, MES-06, CAS-02, CAS-15 | `js/coach/carichi/*`, `regole-ricerca.js` (progressione), `dolore-mattina.js` (aggiusti) |
| `sentinella` | **La Sentinella** | «Controllo che ti alleni al sicuro e che recuperi: dolori, fatica, scarichi, età e salute.» | PRG-07, PRZ-01..05, DEC-01..10, DOL-01, BIO-02..03, BIO-06, INT-01..03, CAR-03, CAR-08, CAR-10, RIC-04..05, STR-01, MAV-01..11, MAV-13..14, MAV-16, REC-01..09, REC-12, ETA-01..05, ETA-07..08, ETA-11..13, ETA-17..18, DON-13, MES-05, MES-07..08, MES-10, MES-19, ALG-12, SEL-11, PCO-08, CST-01..02, CST-07, CST-09, DCA-01 (bloccate in tutto o in parte: REC-06, REC-07, REC-09, REC-12, ETA-07, ETA-08, ETA-11..13, ETA-17, DON-13, MAV-14: registro C) | `prontezza.js`, `questionario-decisioni.js`, `mi-sento-male.js`, `intensita.js` (INT-01..03) → `js/coach/sicurezza/` |
| `tecnico` | **Il Tecnico** | «Conosco gli esercizi: muscoli, varianti, esecuzione, riscaldamento.» | SUG-01..08, BIO-01, BIO-04..05, BIO-07, TEC-01..07, SEL-02, SEL-12, RIS-01..13 (assorbono REC-10, PCO-10, ETA-06, ETA-16) | `js/dati/*`, `biomeccanica.js`, `suggeritore.js`, `pannello.js`, `motore.js` (alternative) → `js/coach/tecnica/` |
| `preparatore` | **Il Preparatore** | «Penso al resto della settimana: cardio, passi, peso e composizione, solo come informazione.» | COR-01..03, BIA-01..03, MET-03, PRG-26 (da ritirare), AER-01..04, NUT-01..02, PES-01..04, DCA-02..03, OBI-02, OBI-05..08, OBI-11, OBI-17 (bloccata) | `js/coach/bia/*`, `repertorio.js` (corpoCoach), `compone.js` (fattoreFisico) → `js/coach/corpo/` |
| `motivatore` | **Il Motivatore** | «Ti conosco: come ti alleni meglio, cosa fare quando salti, il periodo che stai vivendo.» | PSI-01..12, MOM-01..06, SAL-01, ADE-01, ORA-01, PRG-36, CST-03..06, CST-08, CST-10..12, OBI-18, PRN-19 | `psicologia.js`, `metodi-momenti.js` (MOMENTI), `stato.js` → `js/coach/mente/` |
| `specialista` | **Lo Specialista** | «Se vuoi forza da powerlifting o un fisico da bodybuilding, preparo il percorso dedicato.» | **FRZ-01..10**, TAP-01 (bloccata, spenta), **EST-01..06**, MAV-15 | → `js/coach/specialita/` |

I codici assorbiti (IPE-03/05/07/08/10/11/13/14, PGR-03, PCO-02/05/07/10, SEL-01/05/10, MES-04/15..18, ALG-01/03/04/07/09/10/13/15/16/18, PRI-xx non sopravvissuti, DON-xx, SPE-xx, CAS-03/04/09/11..13, MAV-12, ETA-06/09/10/14..16, OBI-09/10/13..16, REC-10/11) **non entrano nel catalogo**: il registro A.3 dice dove vive ciascuno.

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
| 15 | `applicaPartenze(brief, sedute)` | Bilancia | `carichi/partenza.js` | W2-T8 (ex W3-T2) |
| 16 | `pianoCardio(brief)` | Preparatore | `corpo/cardio.js` | W5-T3 |
| 17 | `verificaProgramma(brief, prog)`: chiama `validaVolume`, `validaTempo`, `validaTecniche`, `validaSicurezza` se definite | Regista | `regia/genera.js` | ogni onda aggiunge il suo `valida*` |

**Apertura della seduta e carichi.** `caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta` smettono di essere avvolte: diventano catene di fasi registrate con `registraFase(punto, ordine, codice, fn)` (`js/coach/regia/fasi.js`, W1-T3). L'ordine è un **numero scritto**, non l'ordine degli script.

```
punto 'carico'  (caricoProssimo: una fase riceve r e { nome, base, repsTarget, setsBase, brief })
  10 BIL  modello di progressione (v1: caricoProssimoBase; v2: modelli.js)      W1-T3 / W3-T1
  15 BIL  calibrazione rapida (CAR-18/19), tutti i principianti e donne ≤ interm. W2-T8
  20 BIL  ricalcolo dal massimale quando cambiano le ripetizioni (ALG-05; B7, B8) W3-T1
  30 SEN  scarico pianificato o reattivo (dose unica MES-05, riferimento MES-06)  W0-T3/T4 (ponte) → W3-T5
  40 DOS  rampa della settimana e volume autoregolato (MES-03, PCO-03)           W3-T4
  50 AGG  aggiusti del questionario (DEC/DOL) + testoRir (come oggi)             W1-T3
  60 RIC  RIC-01/02/05 (RIC-05 diventa «rientro» in W4-T2)                       W1-T3 / W4-T2
  70 INT  INT-04 prima volta                                                       W1-T3
  90 SEN  tetti della Sentinella (popolazioni, fastidi, prontezza)                W4-T1 / W4-T2
  99 REG  perche → motivo (testoPerche)                                            W1-T1
punto 'apertura' (applicaCaricoProgressivo): 10 carichi per esercizio · 20 RIC-04/MAV budget tecniche · 30 riscaldamento (RIS)
punto 'prontezza' (applicaProntezza): 10 PRZ (CST-07) · 20 budget tecniche · 30 dolore di oggi e malattia (REC-05, REC-07 parte a) · 40 dolenzia per muscolo (PCO-03)
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

Capitoli nuovi della mappa (creati vuoti in INT-1 perché i task vi aggiungano righe): 21 Volume e tempo (IPE, CAS), 22 Progressione dei carichi v2 (PGR, AUT, STD, ALG), 23 Tecniche: idoneità e budget (MAV), 24 Recupero, dolore e popolazioni (REC, ETA, DON-13), 25 Riscaldamento e mobilità (RIS), 26 Costanza e comunicazione (CST), 27 Cardio, nutrizione e peso (AER, NUT, PES, DCA), 28 Dall'obiettivo al programma (OBI), 29 Scelta degli esercizi (SEL), 30 Pratiche dei coach (PCO), 31 Specialista (FRZ, EST, TAP), 32 Regia (REG), 33 Mesociclo e scarichi (MES), 34 Principianti (PRN). PAR-06..09 e CAR-18..19 vanno nel cap. 8 (carico di partenza). Le regole bloccate (registro C) hanno la loro riga con «(bloccata)».

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
| ★1 | **Motore del volume per muscolo**: 15 unità di conteggio (petto, dorsali, spessore della schiena, deltoide anteriore, laterale, posteriore, bicipiti, tricipiti, quadricipiti, femorali, grande gluteo, adduttori, abduttori, polpacci, addome), conteggio frazionario dagli attributi (1 diretto, 0,5 secondario «vero motore», 0 con eccezione scritta), fasce per unità, livello e obiettivo (tabella `VOLUME_UNITA` del registro B6: fasce IPE per petto, dorsali, quadricipiti; fasce per muscolo della nota specializzazione per gli altri), pavimenti di serie dirette per giorni (femorali compresi), tetto per seduta frazionario (morbido 8, duro 11; 8/6 in specializzazione), verifica dopo **ogni** taglio | Dose-risposta per muscolo (Pelland 2026, Solida); conteggio frazionario (Moderata); pavimenti di dirette (Maeo 2023, Baz-Valle 2022: Moderata; resto Convenzione); tetto per seduta (Remmert 2025, preprint) | `volume/volume.js` (stadio 9), attributi W1-T2 | Sedute più lunghe: si risolve insieme al tempo (★3) | L | W1-T2, W2-T1 |
| ★2 | **Mesociclo vero**: piano settimana per settimana per tutti i livelli (rampa di RIR MES-02, rampa di serie MES-03 dal 70-75% al picco, scarico pianificato per livello: principiante 12 settimane con controllo all'8ª e verifica alla 12ª (PRN-03); intermedio 5+1; avanzato 5+1) + scarico reattivo con **una** dose (MES-07) e carico di riferimento che non si compone (MES-06) | Rampa RIR (Robinson 2024 + RP, Convenzione/Moderata); scarico ogni 5,6 ± 2,3 settimane in pratica (Bell 2024); i novizi non programmano scarichi (Contrastata); registro B4-B5 | `programma/mesociclo.js` (stadio 4) → `prog.piano`; fase 'carico' 40 in seduta | Più settimane di fila: gli stessi segnali anticipano lo scarico | L | W0-T3/T4 (scarico composto), W2-T4, W3-T4, W3-T5 |
| ★3 | **Bilancia v2**: scala di progressione per esercizio (S1 ogni seduta, S2 settimanale, S3 a blocco, misurata dagli aumenti reali), incrementi relativi arrotondati all'attrezzo vero (dischi 1,25/2,5, manubri a 1-2 kg, pacchi da 2,5/5, impostabili), doppia progressione con range, massimale con «ripetizioni + RIR», ricalcolo del carico quando cambia il bersaglio di ripetizioni, stalli a gradini (3×10 → 3×8 → 3×6 prima del reset) | PGR-01..04, AUT-01..02, PCO-01 (Convenzione da 4 fonti; RIR ±1 ripetizione: Halperin 2022, Moderata) | `carichi/modelli.js`, `attrezzi.js`, `e1rm.js` (fasi 10 e 20) | Cambia la progressione di chi è a metà programma: v2 solo per `prog.versione ≥ 2` | L | W1-T3, W3-T1 |
| ★4 | **Modello degli esercizi + cancello delle tecniche**: attributi per i ~170 esercizi (classe A-F della nota sui metodi avanzati, schema, crediti per muscolo, profilo di resistenza, stabilità, fatica sistemica, abilità 1-3, unilaterale, stress per 8 zone, attrezzo e «serve»); le tecniche passano dalla matrice tecnica × classe × livello × vincoli, con budget per seduta e settimana e posizione nel blocco | MAV-01..13 (prassi e sicurezza, Convenzione; «nessun vantaggio di crescita, solo tempo»: Solida); SEL-01..16 | `dati/attributi-esercizi.js`, `sicurezza/tecnica-adatta.js` (stadio 13, fase 'apertura' 20) | Dati da scrivere bene una volta: revisione Opus | L + M | W1-T2, W2-T3 |
| ★5 | **Modifica, non escludere**: fastidi su 8 zone con livello verde/giallo/rosso, matrice fastidio → modifica (carico −10/−20%, RIR ≥3, ampiezza senza dolore, variante a minor stress con **lo stesso muscolo**), controllo del mattino a gradini, rientro a 4 fasi guidato dal dolore, domande d'allarme con rinvio al medico | Silbernagel 2007 (Moderata), Smith 2017, Cochrane 2021 per la schiena (Solida per «esercizio sì»), prassi cliniche (Convenzione) | `sicurezza/fastidi.js`, `consentito` → `consenteEsercizio`, `questionario-decisioni.js`, `dolore-mattina.js` | Più esercizi tenuti con fastidio: sempre con modifica scritta e soglia di stop 3/10 | L | W4-T1 |
| 6 | **Il tempo torna**: modello con riscaldamento (RIS 3.6-3.9), cambi, unilaterali, coppie e fattore personale (CAS-05, CAS-18); prima si accorciano le pause dentro la fascia, poi superserie antagoniste, solo poi tagli, mai sotto i pavimenti (CAS-07); il tempo è un tetto, non un obiettivo (registro D-P10); dose minima per 20/30/45/60/90 minuti | CAS-05..08, IPE-04, IPE-12, PCO-04; superserie: meta-analisi 2025 (Solida per l'efficienza) | `volume/tempo.js` (stadio 10) | Modello di tempo «nostro»: tarato sullo strumento di collaudo e poi sulle durate reali (CAS-18) | M | W0-T2 (ponte), W2-T2 |
| 7 | **Partenza bassa per le donne + calibrazione rapida per tutti i principianti** | Decisione dell'utente; numeri della nota donne (Convenzione [D]); registro B1 | `carichi/partenza.js`, fase 'carico' 15 | Partire troppo basse: la salita la recupera in 2-4 esposizioni | M | **W2-T8** (capitolo D; ex W3-T2) |
| 8 | **Volume autoregolato per muscolo** (stile RP): dolenzia del muscolo prima della seduta, prestazione, prontezza → ±1 serie a settimana dentro MEV-MAV; «spingi» solo a condizioni (CST-08) | PCO-03 (Convenzione, pratica RP); dose-risposta (Solida) | `volume/autoregolazione.js`, `prontezza.js` | Domande in più: facoltative, un tocco | M | W3-T4 |
| 9 | **Popolazioni**: minori (età obbligatoria, sotto 13 nessun programma), over 65 con base di 8 settimane e poi RIR 2-3 sulle macchine, gravidanza e post-parto come bandiera separata con rinvio, sovrappeso, malattia (solo «con febbre oggi riposo»), rientro a gradini. **Bloccate finché la ricerca non le conferma** (registro C): pressione alta, «sopra il collo», carichi alti e potenza oltre i 65, donne dai 50 anni e osso, istruzioni per la gravidanza, test funzionali, cadute, modo fragile | ETA-01..05, ETA-08 (parte a), REC-06/07/09/12 (parte a), PRN-15, CST-01/02, DCA-01 | `sicurezza/popolazioni.js`, `sicurezza/vincoli.js` | Messaggi medici: solo prudenza e rinvio, mai diagnosi | M | W0-T2/T4 (minorenni, over 65), W4-T2 |
| 10 | **Modalità Forza** (powerlifting): squat 2×, panca 2-3×, stacco 1× + variante; onda giornaliera pesante/media/leggera; massimale di lavoro e onda a percentuali con tetto di RPE; AMRAP di appoggio; varianti e accessori per punto debole; nessun 1RM per chi non è avanzato; taper spento finché non verificato | FRZ (pratica 5/3/1, RTS, Candito: Convenzione); STD-01/02; TAP-01 (da verificare) | `specialita/forza.js`, `forza-carichi.js` | Programmi famosi diversi tra loro: il coach usa uno schema solo, dichiarato | L | W2-T7, W3-T6 |
| 11 | **Modalità Estetica** (bodybuilding): massimo 2 unità prioritarie (EST-02) con +25% (intermedio) o +40-50% (avanzato) e tetto per seduta 8/6, gli altri a `max(mantenimento, 50% dello standard)` con carico invariato, coppie regionali (allungato + accorciato) per i prioritari, punti deboli letti dai log solo come proposta (EST-01), blocchi di 4-8 settimane, al massimo 2 di fila (EST-06) | IPE-09, EST (ex SPE-01..12, IPE-13, MES-16: Maeo 2021-23 Moderata; specializzazione Convenzione); registro B19 | `volume/volume.js`, `programma/ricette.js`, `specialita/estetica.js` | Proposte sbagliate da dati scarsi: solo con 2 blocchi di dati, sempre proposta | M | W2-T1, W2-T6, W5-T4 |
| 12 | **Riscaldamento automatico e mobilità**: rampa dal carico e dall'intensità relativa, riduzioni per esercizi successivi, riscaldamento generale in minuti, blocchi di mobilità per over 50/65, scrivania e prove fai-da-te | RIS-01..13 (rampa: Moderata/Convenzione) | `tecnica/riscaldamento.js`, fase 'apertura' 30 | Tempo: tetto per seduta (5/8/10 min) | M | W4-T3 |
| 13 | **Costanza**: pausa del calendario, rampa di rientro, settimana minima dopo i salti, serie di settimane «a finestra», lessico senza colpa, domanda «cosa ti frena» ampliata, punti di scelta autonomi | CST (autodeterminazione, Teixeira 2012: Moderata) | `mente/costanza.js`, `oggi.js` | Tono: frasi riviste in quattro lingue | M | W4-T2, W5-T2 |
| 14 | **Preparatore**: cardio per obiettivo e dove metterlo (dopo i pesi o a ≥3 ore, corsa lontano dal giorno gambe), passi unici e realistici, proteine per kg di peso, tendenza del peso su 4+ pesate, BIA con contesto, massa magra in calo solo con conferma, guardie contro i disturbi alimentari | AER, NUT, PES, DCA (Schumann 2022, OMS 2020: Solida/Moderata) | `corpo/cardio.js`, `corpo/peso.js`, `repertorio.js` | Linguaggio sensibile: frasi controllate | M | W5-T3 |
| 15 | **Spiega perché**: traccia strutturata di ogni numero, etichetta del sotto-coach, foglio «Perché?», volume per muscolo visibile | Trasparenza = fiducia e aderenza (PSI-07, Convenzione) | `regia/perche.js`, UI | Testi: tutti tradotti | M | W1-T1, W5-T1 |
| 16 | **Collaudo come cancello**: soglie per onda sullo strumento esistente + atleta virtuale per i carichi (convergenza, nessun carico oltre la capacità) | Prova automatica su 10.800-64.800 profili; numeri «prima» dell'etichetta `base` (registro E) | `tools/cancello-collaudo.js`, `tests/aiuto-atleta.js` | Il modello «misura sé stesso»: i criteri restano quelli del collaudo esterno, cambiano solo in INT con `VERSIONE_CRITERI` | M | W0-T1, W2-T8 |

**Fuori da questo piano (proposte delle note da decidere poi):** nuovi obiettivi OBI-13 (correre 5K), OBI-14 (abilità), OBI-15 (schiena, collo e spalle), OBI-16 (sport e stagione) (registro D-P6: il modello dei dati non deve impedirli); SEL-09 (coperta da PRG-10), SEL-14 (due id per i femorali); OBI-09 (schermata «cosa tracciare»), SPE-13 (simmetria: serve registrare i lati), SPE-15 (misure), DON-16 (taratura locale), CAS-03 (test in onboarding), CAS-16/17 (viaggio, micro-seduta), PRI-17 (ritorno dopo anni); velocità del bilanciere. **Bloccate** (non si implementano, registro C): REC-06/07/09/12 parte b, DON-13, DCA-03 parte b, DON-10 parte b, ETA-07, ETA-08 parte b, ETA-11..13, ETA-17, MAV-14 (BFR, anche come testo), TAP-01, OBI-17.

---

## D. Regola «partenza bassa per le donne» (PAR-06..09, CAR-18..19)

> **Riscritto il 2026-10-05** con i numeri della nota `ricerca-donne-carichi-iniziali.md` (§3) e la decisione D-P1 del registro (motivi in registro B1). Leggere prima: nota donne §0, §1.1-1.6, §2, §3.1-3.7, §5, §6 (DON-01..09); nota forza §3.3; nota principianti §3.6.

### D.1 Ambito
- **Chi (fattore di partenza bassa, PAR-06)**: profilo con sesso donna (`'F'` o `'donna'`, come `contestoCarichi`) e livello **principiante o intermedio** (quello del brief: dichiarato o corretto da LIV/STD; se manca, **principiante**: PAR-01, D-P12). Le avanzate restano come oggi. Gli uomini: **carichi di partenza invariati** (D-P1).
- **Chi (calibrazione rapida, CAR-18)**: **tutti i principianti** (uomini compresi, D-P1) e le donne intermedie con fattore attivo.
- **Cosa**: ogni carico **stimato** (PAR-01..05: creazione del programma, esercizi nuovi o sostituiti, «Macchinario occupato», seduta libera, aggiunta dalla libreria). Mai un carico che viene dallo storico di quell'esercizio.
- **Quando si spegne**: con lo storico (PAR-07), esercizio per esercizio con la calibrazione (CAR-18), o con l'interruttore (`(spegnibile)`).

### D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`)

```
kCorpo = (massa / riferimento) × livello × età × PAR-Q × prudenza 0,85 × sessoParteAlta   (PAR-02 COM'È: 0,9 sulla parte alta delle donne)
         per le donne con fattore attivo l'effetto della BIA (SMM o massa magra) resta entro ±15% del valore dal solo peso (DON-01)
k      = misto(kStorico, kCorpo, w = min(1, nEserciziInStorico / 4)), limitato a [0,45; 1,8]   (PAR-03; kStorico solo da esercizi con calibrazione chiusa o RPE ≥ 7, due mediane alto/basso: PAR-07, DON-05)
fD     = PARTENZA_DONNE[livello][distretto][tipo]                                (PAR-06; 1 se non si applica)
fEff   = 1 − (1 − fD) × (1 − w)                                                  (PAR-07: lo storico personale assorbe lo sconto)
peso   = arrotondaPartenza(nome, libreria.weight × k × fEff, verso = 'giù')       (PAR-04, arrotondato per difetto)
```

Il fattore si applica **dopo** il limite [0,45; 1,8]: il limite non annulla lo sconto (il problema segnalato dalla nota donne §0 punto 3). Con W3-T1 la stima tiene conto anche del bersaglio di ripetizioni (`opz.reps`, `opz.rir`): il peso di libreria vale per le sue ripetizioni e si converte con `caricoPer(e1rm, reps, rir)`; il fattore donne si applica dopo, identico.

### D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»)

Distretto come `sessoParteAlta` di PAR-02: **basso** = esercizi di gambe e glutei, **alto** = tutto il resto (così lo stacco da terra, gruppo «schiena», è «alto»). Tipo: multiarticolare o isolamento (`m.type`). Non serve la classe A-F degli attributi: la tabella funziona già sui dati di oggi.

| Distretto e tipo | Esempi | Principiante | Intermedia | Avanzata |
|---|---|---|---|---|
| Multiarticolari della parte alta (bilanciere, manubri, macchine) e stacco da terra | Panca Piana Bilanciere, Chest Press, Lat Machine, Rematore con Manubrio, Military Press | **0,60** | **0,85** | 1 |
| Multiarticolari di gambe e glutei | Squat con Bilanciere, Leg Press, Goblet Squat, Affondi, Stacco Rumeno, Hip Thrust | **0,65** | **0,85** | 1 |
| Isolamenti (tutti) | Curl, Alzate Laterali, Pushdown, Leg Extension, Leg Curl, Abductor | **0,75** | **0,85** | 1 |
| Core, a tempo, corpo libero a 0 kg (classe F) | Plank, Dead Bug, Piegamenti, Trazioni | nessun fattore: variante facilitata (PAR-09) | nessun fattore | — |

Perché questi numeri (registro B1): con PAR di oggi una donna di 65 kg principiante riceve sulla parte alta con bilanciere e macchine **l'85-120% di un massimale tipico** per serie da 8-12 ripetizioni (lat machine 96%, chest press 85%, military 123%); sulle gambe il 65-95%, sugli isolamenti a cavo il 50-60% (nota donne §3.2). Il carico giusto per una prima seduta a 3-4 ripetizioni di riserva è circa il 60% di PAR sulla parte alta, il 65% su gambe e glutei, il 75% sugli isolamenti. Le macchine della parte alta **non** hanno lo sconto più piccolo: il loro valore di libreria è già vicino al massimale. Esempio: donna 60 kg senza BIA, principiante: `kCorpo` = 60 × 0,74 / 61,5 × 1 × 0,85 ≈ 0,61 (× 0,9 sulla parte alta ≈ 0,55); panca 40 kg di libreria → 40 × 0,55 × 0,60 ≈ 13,2 kg → sotto la barra (PAR-08); leg press 80 kg → 80 × 0,61 × 0,65 ≈ 31,7 → 30 kg (per difetto, passi da 2,5); curl con manubri 10 kg → 10 × 0,55 × 0,75 ≈ 4,1 → 4 kg. Valori di controllo della nota (65 kg): panca 15, chest press 15, lat machine 15, squat 22,5, leg press 35, hip thrust 20 kg (test D.8 punto 1).

### D.4 Barra e corpo libero
- **PAR-08 sotto la barra**: se il peso stimato di un esercizio col bilanciere è sotto **0,9 × peso della barra** (18 kg con la barra da 20): (a) nella scelta degli esercizi la Bilancia dà `penalitaPartenza(x, brief)` = −3 al bilanciere in quel posto (non esclusione: vince la variante con manubri o macchina **dello stesso muscolo**, `alternativeStessoMuscolo`; per una stima fuori dalla generazione, es. «Macchinario occupato», si propone direttamente la variante); (b) se il bilanciere resta (obiettivo forza, modalità Forza, metodo famoso, esercizio gradito), si parte dalla **barra vuota con 6-8 ripetizioni e una serie in meno** (DON-03). Testo: «Per ora basta il bilanciere vuoto: poche ripetizioni, tecnica pulita». Nessun campo «barra più leggera» (D-P13).
- **PAR-09 corpo libero**: per le principianti, piegamenti e trazioni partono dalla variante facilitata del Tecnico (piegamenti inclinati, trazioni assistite o lat machine); si sale lungo la scala di CAS-02 (W3-T1).

### D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19)
Fase 'carico' 15, file `js/coach/carichi/calibrazione.js`. Vale per gli esercizi del piano con carico **stimato** di un **principiante** (uomo o donna, D-P1) o di una donna con `e.partenzaBassa = { fD }` (scritto da `applicaPartenze`), per le **prime 4 esposizioni** (contate dallo storico) e finché non «si chiude». Sostituisce CAR-16 per questi esercizi; CAR-16 resta per gli altri carichi stimati.

**Perché non il ricarico dal massimale** (prima versione di questo capitolo): con il RIR contato al massimo 4, lo scarto tra RIR osservato e bersaglio è di 1-2 ripetizioni, cioè **3-6% di carico per esposizione** (Epley): troppo poco per restituire uno sconto del 25-40%. Serve una tabella di salti (nota donne §3.6, scelta di prodotto, Convenzione), resa sicura da tetti, chiusura e salvaguardie.

**Ingresso**: RPE della **prima serie** se c'è (per i principianti il tocco a 3 scelte dopo la prima serie: facile = 6, giusta = 8, dura = 9,5; W3-T3, D-P16), altrimenti la media delle serie; corretto da `rirBias`. **Scarto** = RPE bersaglio della seduta (registrato in `obiettivo.rir` da W0-T3) − RPE osservato.

Dopo ogni esposizione, se tutte le serie sono fatte con almeno le ripetizioni previste:

| Scarto (punti di RPE sotto il bersaglio) | Partenza bassa (fD < 1): alto / basso / isolamento | Partenza normale (fD = 1, principianti uomini) |
|---|---|---|
| ≥ 3 | +20% / +25% / +20% | +10% |
| 2 | +15% / +20% / +15% | +7,5% |
| 1 | +10% | +5% |
| entro ±0,5 | **si chiude**: «Carico tarato: da qui la progressione normale» | si chiude |
| sopra il bersaglio di 1 o più | nessun salto e **si chiude** | idem |
| nessun RPE segnato | +10% / +15% / +10% (al massimo 2 volte) e promemoria CAR-19 | +5% (al massimo 2 volte) |
| serie mancate | CAR-17 come oggi (−5% se molto sotto) e **si chiude** | idem |

Ogni salto: almeno un passo dell'attrezzo, arrotondato per difetto, mai oltre +25%. Si chiude anche alla quarta esposizione. Salvaguardie (fase 90, Sentinella): dolore su quell'esercizio nell'ultima seduta → nessun salto; PAR-Q o over 65 → salti dimezzati; prontezza < 50 o settimana di scarico → nessun salto quel giorno.

**CAR-19 promemoria**: finché l'esercizio è in calibrazione e l'ultima esposizione non ha RPE, la nota dice «Segna quanto è stata dura la prima serie (RPE): con il dato il carico sale più in fretta».

Convergenza attesa (rispetto al carico giusto della persona, non a PAR): la donna media parte a circa il 75% del suo carico giusto (25° percentile: nota donne §3.1) e lo raggiunge in **2-3 esposizioni** con l'RPE; la più forte del 95° percentile in 4-5. Costo dichiarato dalla nota: circa 4 sedute (1,5-2 settimane) nel caso peggiore.

### D.6 Interazioni

| Con | Cosa succede |
|---|---|
| PAR-01 (dati del corpo) | SMM > FFM > peso × grasso > peso, come oggi. La BIA cambia solo la massa usata, mai il fattore; per le donne con fattore attivo il suo effetto resta entro ±15% del valore dal peso (DON-01). Livello mancante = principiante (D-P12). `fracMagra.F` resta 0,74 (i moltiplicatori sono calcolati su quel valore: niente sconti sommati) |
| PAR-02 | **Invariata**: `sessoParteAlta` 0,9 resta per tutte le donne; la tabella D.3 è calcolata sopra di essa |
| PAR-03/07 | Con 4 esercizi in storico lo sconto sparisce (fEff = 1); con 2 è dimezzato; il rapporto dallo storico usa solo esercizi con calibrazione chiusa o RPE ≥ 7 e due mediane (alto, basso) |
| PAR-04 | Arrotondamento per difetto per le stime scontate |
| INT-01..03 (bandiere BIA) | Nessun effetto sul carico (decisione presa); INT-03 aggiunge un RIR → il bersaglio della calibrazione si sposta di conseguenza |
| INT-04 (prima volta) | Resta: −1 serie, +1 RIR. La calibrazione confronta l'RPE con il bersaglio **di quella seduta** (registrato in `obiettivo.rir` da W0-T3) |
| INT-05 (bilancio prime sedute) e ESI-02 (esigenza) | Le serie degli esercizi in calibrazione **non contano** come «serie facili» (si contano per il completamento): una partenza bassa voluta non deve alzare l'esigenza |
| CAR-16/17 | CAR-18 sostituisce CAR-16 per i principianti e per gli esercizi con `partenzaBassa`; CAR-16 resta per tutti gli altri carichi stimati; CAR-17 invariata |
| Principianti uomini | Carichi di partenza **invariati** (prudenza 0,85 di PAR-02); calibrazione CAR-18 con la riga «partenza normale» (decisione D-P1) |
| PGR/AUT-01 | Durante la calibrazione l'RPE accelera (unica eccezione alla regola «per i principianti l'RPE è solo un freno»); chiusa la calibrazione vale AUT-01 |
| Gironda 8×8 (`fattoreCarico` 0,7) | Si applica dopo, come oggi |
| Sostituzioni (DEC-09, STA-02, macchinario occupato) | Passano da `pesoPartenza` → stessa regola |

### D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`)
- Nota del programma: «Carichi di partenza bassi di proposito: le prime sedute servono a imparare il movimento, poi il coach sale in fretta.»
- Nota dell'esercizio (tipo «nuovo»): «Partenza bassa voluta: impari il movimento, poi si sale in fretta»
- Prima esposizione per tutti (PAR-05 riscritta, ex DON-07): «Oggi si parte leggeri apposta: non è un test. L'obiettivo è finire con 3-4 ripetizioni in più»
- Tocco dopo la prima serie (principianti, W3-T3): «Com'era? Facile / Giusta / Dura»
- Salto con RPE: «Calibrazione: RPE # contro # previsto, si sale a # kg (+#%)»
- Salto senza RPE: «Calibrazione: serie complete, +# kg» • «Segna quanto è stata dura la prima serie (RPE): con il dato il carico sale più in fretta»
- Chiusura: «Carico tarato: da qui la progressione normale»
- Sotto la barra: «Per ora basta il bilanciere vuoto: poche ripetizioni, tecnica pulita» / «Il bilanciere vuoto pesa 20 kg: per iniziare la stessa spinta con i manubri»
- Corpo libero: «Versione facilitata per partire: si passa alla completa a # ripetizioni pulite»

### D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`)
1. Donna principiante 65 kg senza BIA: panca, chest press, lat machine, squat, leg press, hip thrust, curl = valore di PAR di oggi × fattore della tabella D.3, arrotondato per difetto sui passi veri; scarto massimo di un passo dai valori di controllo della nota donne §3.3.
2. Donna intermedia: fattore 0,85; donna avanzata: valori di oggi (golden); **uomo principiante: carichi di partenza identici a prima (golden)**, calibrazione CAR-18 attiva con la riga «partenza normale».
3. Storico con 2 e 4 esercizi: sconto dimezzato e nullo; esercizi in calibrazione non aperta esclusi dal rapporto.
4. Nessun carico fuori dalla griglia dell'attrezzo; nessun bilanciere sotto 0,9 × barra senza la variante o la nota.
5. PAR-08: in 200 profili di principianti donne, quando la panca col bilanciere è sotto la soglia il posto ha una variante con lo stesso `bersaglioDi`.
6. CAR-18: scarto 3 → +20/25/20%; scarto 1 → +10%; nel bersaglio → chiusura; sopra → chiusura senza salto; senza RPE → +10/15/10% al massimo 2 volte con promemoria; mancato → CAR-17 e chiusura; dolore → niente salto; PAR-Q → salti dimezzati; uomo principiante → salti della riga «partenza normale»; chiusura alla quarta esposizione.
7. INT-05 ed ESI-02 ignorano le serie facili degli esercizi in calibrazione.
8. `(spegnibile)`: con PAR-06 spento i valori sono quelli di prima; senza consenso nessun effetto.
9. Atleta virtuale (`tests/aiuto-atleta.js`): 500 atlete e 500 principianti uomini simulati. **La capacità vera si estrae dalle àncore della nota donne §3.1 (1RM tipico × peso, deviazione ±25%) e per gli uomini da §3.5, non da PAR** (altrimenti il coach misura sé stesso); RPE con rumore ±1, 30% senza RPE. Esposizioni per arrivare entro ±10% del carico giusto: **mediana ≤ 3, 95° percentile ≤ 5** (donne); mediana ≤ 2 (uomini); **zero** prescrizioni sopra la capacità al RIR bersaglio − 1 in tutte le esposizioni.
10. Traduzioni: ogni frase di D.7 passa `controlla-traduzioni.js`.

---

## E. Piano a ondate

### E.0 Protocollo di lavoro (vale per ogni task)

0. **Cancello delle regole bloccate (prima di tutto).** Il task apre `docs/coach-v2-decisioni.md` §C. Una regola **bloccata** (o la sua «parte b») **non si implementa**, nemmeno come testo, flag spento o funzione vuota: si implementa solo la «parte a» indicata e nel report si scrive «XXX-NN parte b: bloccata, non implementata». Un agente non sblocca una regola: la sblocca solo una nota di ricerca aggiornata con le query di §C.2 (due fonti indipendenti) **e** una riga datata nel registro. Nel catalogo una regola bloccata porta «(bloccata)» e `regolaAttiva()` restituisce sempre `false` (W1-T1). La revisione Opus di ogni INT controlla il diff e `docs/in-arrivo/` contro l'elenco di §C.2 e respinge il ramo che ne implementa una. Le regole con numeri «Convenzione» (§C.4) scrivono `forza: 'Convenzione'` nelle soglie: il foglio «Perché?» mostra l'etichetta.
1. **Prima**: leggere `CLAUDE.md`, la skill `implementa-regola-coach`, i capitoli B e D di questo documento, **il registro** (`docs/coach-v2-decisioni.md`: A.3 per i codici, C per le regole bloccate, la riga del task in E) e **le sezioni delle note elencate nella riga «Leggere prima» del task** (sono la fonte dei numeri: un numero che non è lì o nel registro non si inventa). Cercare con `GRAPH_REPORT.md` e `npm run -s trova`. Nei criteri di accettazione un codice con «collaudo» davanti è un criterio di `tools/collaudo-generatore.js`; un codice nudo è una regola del coach.
2. **Ramo**: `coach-v2/<task>` dalla punta dell'onda. Si committano **solo i file elencati** nel task.
3. **File condivisi** (`index.html`, `sw.js`, `package.json`, `js/lingue/en|es|de.js`, `docs/coach-mappa-regole.md`, `js/coach/catalogo-regole.js`, `js/coach/parametri.js`, `docs/mappa-simboli.md`, `docs/indice-codice.md`, `docs/soglie-coach.md`, `graphify-out/`, `docs/mappa-per-agenti.md`, `docs/ARCHITETTURA.md`, `docs/PIANO.md`, `CLAUDE.md`, le skill): li tocca **solo** l'integrazione, salvo dove un task li elenca esplicitamente. Il task scrive cosa serve in `docs/in-arrivo/<task>.json`:

```json
{ "task": "W2-T8",
  "script": [{ "src": "js/coach/carichi/calibrazione.js", "dopo": "js/coach/carichi/partenza.js" }],
  "frasi": { "Carico tarato: da qui la progressione normale": { "en": "...", "es": "...", "de": "..." } },
  "regole": [{ "capitolo": 8, "riga": "- **CAR-18** (spegnibile) calibrazione rapida ... (decisione 2026-10-05)" }],
  "squadra": [{ "sottoCoach": "bilancia", "codici": "CAR-18..19" }],
  "mappaAgenti": ["calibrazione rapida: js/coach/carichi/calibrazione.js (fase 'carico' 15)"] }
```

4. **Verifica nel task**: `node tools/integra-onda.js --prova docs/in-arrivo/<task>.json` applica le modifiche condivise in una copia di lavoro, lancia `npm run controlla` e i test, poi le toglie; `npm run collaudo:schede -- --matrice rapida --out /tmp/<task>.json` e `--confronta` con l'istantanea dell'onda.
5. **Consegna**: report con cosa è cambiato, tabella prima/dopo dei criteri di collaudo del task (il «prima» è quello del registro E, etichetta `base`, salvo dove il task cita l'onda precedente), prove aggiunte, frasi nuove, regole bloccate non implementate.
6. **Modelli** (CLAUDE.md): implementazione **Sonnet 5.5**; dove scritto «Opus» il task è guidato da **Opus 5.5** (contratti, semantica difficile) oppure ha la revisione Opus prima del merge.

**Integrazione di fine onda (INT-N, Sonnet esegue, Opus rivede):**
1. Unisce i rami nell'ordine delle dipendenze; un conflitto in un file generato si risolve **rigenerando**, mai a mano.
2. `node tools/integra-onda.js docs/in-arrivo/*.json`: righe in `index.html`, frasi nei tre dizionari, righe e capitoli della mappa, tabella della squadra; poi cancella `docs/in-arrivo/`.
3. Rigenera: `npm run sw`, `npm run catalogo`, `npm run indice`, `npm run simboli`, `npm run soglie` (da INT-1); alza `CACHE_NAME` **una volta** (`3in-v11` → `v12`, ...); poi `npm run grafo` (per ultimo).
4. Prove: `npm run controlla`; `npm run test:browser` (da W0 le esegue tutte); `npm run collaudo:schede -- --matrice standard --etichetta onda-N` e `npm run cancello -- <json> onda-N` (soglie dell'onda in `tools/cancello-collaudo.json`). Le istantanee del collaudo restano **fuori dal repo** (regola della skill `collaudo-generatore-schede`): il «prima» si rigenera lanciando il collaudo sull'etichetta dell'onda precedente in un worktree temporaneo; nel repo restano le soglie del cancello e una riga di sintesi per onda in `docs/PIANO.md`. Un criterio nuovo del collaudo si aggiunge solo qui, con la procedura della sua skill (§4) e `VERSIONE_CRITERI` alzata.
5. Documenti a mano: capitoli toccati della mappa (cap. 17 «incoerenze» aggiornato), `mappa-per-agenti.md` (sotto-coach → file, nomi in posti inattesi), `ARCHITETTURA.md`, `PIANO.md` (fase 6), skill se cambiano convenzioni.
6. Revisione Opus: diff contro gli invarianti (F), cancello di collaudo, **cancello delle regole bloccate (E.0 punto 0)**, lettura «da coach» di 20 programmi campione (rubrica: struttura, volume per muscolo, tempo, sicurezza, spiegazioni).
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

Difetti trovati dopo la prima versione (note arrivate dopo, collaudo `base`; numeri nel registro E):

| Difetto | Fonte | Task |
|---|---|---|
| B25 buchi di RISCHIO: Pike Push-up con la spalla, Front Squat e Rematore Presa Inversa con la schiena (collaudo SAF-01: 3.600 + 755 programmi) | collaudo MOD-03 | W0-T5 |
| B26 scarico che si compone tra le sedute della stessa settimana (60 → 54 → 48,5 → 43,5 kg) e progressione che riparte dal carico di scarico | algoritmi U15, mesocicli N1-N2 | W0-T3 + W0-T4 (MES-06) |
| B27 verdetto di ciclo sull'ultima seduta, sempre di scarico (+1,5% a settimana = «stallo»); strain che chiede un secondo scarico subito dopo il primo; esigenza calcolata con il bersaglio della settimana corrente | mesocicli N3, N5, N4 | W0-T4 (MES-12, MES-10, MES-11) |
| B28 trazioni e attrezzi che non ci sono a casa (collaudo SAF-04: tutti i programmi con manubri o a corpo libero) | casa H-08, collaudo | W0-T5 (CAS-01 guardia, CAS-14 ponte) |
| B29 femorali: una seduta sola, un leg curl da 2 serie, rapporto con i quadricipiti (collaudo VOL-01 57,4%, FRQ-01 31,4%, EQ-03 38,2% pesati) | collaudo | W0-T2 (ponte), W2-T1, W2-T6 |
| B30 RIR 0 sullo squat nelle settimane 5 e 11 degli avanzati; isolamenti a RIR 0-1 nella prima settimana degli intermedi | collaudo RIR-02, RIR-03 | W0-T4 |
| B31 testo del respiro con l'apnea agli over 65 (cauti altrove); aumenti non dimezzati oltre i 65 contro il cap. 14 | recupero REC-06, età ETA-18 | W0-T5, W0-T4 |
| B32 punteggi contraddittori: croci ai cavi +0,5 (BIO-05) contro croci coi manubri +1,5 e scambio (RIC-03); PRG-23 aggiunge lo Scott invece del curl inclinato | biomeccanica D1, D8 | W0-T5, W0-T6, W0-T2 (registro D-P8) |
| B33 quadricipiti a zero con le ginocchia dolenti a casa (collaudo MIS-01: 2.473 programmi) | collaudo | W0-T5 |
| B34 5×5 su goblet e squat a corpo libero; 158 s di pausa su Hyperextension e Ponte Glutei | collaudo RX-01, RX-02, casa H-04 | W0-T2 (5×5), W2-T2 (pause) |
| B35 `pesoUltimo` = massimo tra le serie (chi abbassa il peso a metà seduta vede salire il carico) | algoritmi U10 | W3-T1 (prima la prova) |
| B36 stima della durata nell'interfaccia senza gli 8 minuti fissi (24 minuti mostrati contro 33 stimati) | casa H-03 | W2-T2 |

**W0-T1 · Banco di prova · Sonnet · M**
- File: `package.json`, `tools/integra-onda.js` (nuovo), `tools/cancello-collaudo.js` (nuovo), `tools/cancello-collaudo.json` (nuovo: soglie per onda, tabella G come ultima colonna), `tests/aiuto-app.js` (nuovo: carica l'app in `vm` come il modello della skill), `tests/fixture/programmi-v1/*.json` (6 stati salvati: principiante donna a casa, intermedio PHUL, avanzato 6 giorni, over 65 PAR-Q, con BIA, con aggiusti e scarico attivi), `tests/migrazione-v1.test.js`, `tests/browser/intensita-bia.js` (solo se la prova è vecchia).
- Cosa: script `test` = `node --test tests/*.test.js`; `test:browser` esegue **tutti** i file e riassume (oggi si ferma al primo); `collaudo:schede` c'è già (non toccarlo); `cancello` (legge il JSON che il collaudo scrive fuori dal repo e fallisce oltre le soglie dell'onda); `integra` (`--prova`, `--controlla`, applica). Etichetta git `coach-v2-onda-0-prima` sul punto di partenza (per rigenerare il «prima»). Diagnosi di `intensita-bia.js`: prova vecchia → correggerla; difetto del codice → scriverlo per INT-0.
- Leggere prima: skill `collaudo-generatore-schede` (§1-§4); registro E (tutti i criteri e le soglie per onda: diventano `tools/cancello-collaudo.json`); `ricerca-algoritmi-carichi-e-app.md` §3.14 (vettori di prova per i test dei carichi).
- In più: `tools/cancello-collaudo.json` porta per ogni criterio la colonna «prima» del registro E (etichetta `base`, commit `0e71714`: per esempio collaudo SAF-01:spalle 15,3%, VOL-01:femorali 57,4%, DUR-02 82,8% pesati; `gravi_pesata` 35,8%) e le soglie di ogni INT.
- Accettazione: `npm run controlla` verde con le prove nuove; `integra --controlla` respinge un JSON con una frase senza `de`; `cancello` esce 1 su un'istantanea artificiale oltre soglia; le 6 fixture aprono una seduta (`applicaCaricoProgressivo`) senza errori; `npm run collaudo:schede -- --etichetta coach-v2-onda-0-prima` riproduce i numeri «prima» del registro E entro 0,5 punti.

**W0-T2 · Generatore: bug netti · Sonnet · M** — B1, B2, B3 (ponte: MAV-02/03), B19, B22, B24 (ETA-01..03), B29 (ponte femorali), B32 (PRG-23), B34 (5×5)
- File: `js/ui/onboarding.js`, `js/coach/programma/ricette.js`, `js/coach/metodi-momenti.js`, `js/coach/compone.js`, `js/ui/opzioni/il-coach.js` (solo il controllo dell'età in `setCoach('age')`).
- Leggere prima: `ricerca-ipertrofia-programmazione.md` §3.1, §3.2 (pavimenti dei femorali), §3.8; `ricerca-casa-poco-tempo.md` §5.2-5.3 e §6 H-01; `ricerca-metodi-avanzati-intensita.md` §3.1-3.3 e §7.1-7.2; `ricerca-fasce-di-eta.md` §5 e §8 (ETA-01..04); `ricerca-principianti-12-settimane.md` §6 (righe PRG-03, PRG-34); `ricerca-metodi-coach-pratici.md` §2.15; registro B9, D-P8, D-P9.
- Cosa: `exerciseCountFor` con le serie effettive (tetto principianti 3) e la pausa media per tipo; giorno «ipertrofia» del PHUL che riporta le serie allo schema (niente 6×8 o 5×8 a 180 s; il 5×5 «fisso» solo nei giorni forza e **solo su bilanciere o macchine pesanti**, mai su goblet o corpo libero); tecniche al cedimento mai su core, a tempo, peso 0, stacchi da terra, e mai a principianti, over 65, PAR-Q, minorenni («potenza» degli over 65 solo su macchina o alzata dalla sedia); Starting Strength A = squat 3×5, panca 3×5, stacco 1×5 e B = squat 3×5, military 3×5, stacco 1×5 (nota: power clean assente); testo di `TOCCHI.isolamenti` = codice; età (D-P9): **obbligatoria** prima del programma, sotto 13 nessun programma («Sotto i 13 anni il coach non crea programmi: allenati con un adulto esperto»), 13-17 = profilo minorenne (massimo 3 serie, nessuna tecnica, RIR ≥ 2, nota «allenati con un adulto o un istruttore»), campo con `min`/`max` anche in Opzioni; **ponte dei femorali** (B29): ogni seduta lower e full body ha un hinge **o** una flessione del ginocchio, `aggiungiRegione` aggiunge il leg curl da 2 giorni con 3 serie (2 per i principianti), anche con obiettivo salute; PRG-23 aggiunge il curl su panca inclinata e non lo Scott (D-P8); a casa senza sbarra il posto `tirataV` prende Pullover con Manubrio (dorsali dopo W0-T6) o, se manca, una serie in più di rematore, con la nota «Senza sbarra la schiena si allena con rematori e pullover: meno completo» (CAS-14 ponte).
- Accettazione (prima = `base`, registro E): collaudo EXN-01 = 0 (prima 2,4%), TEC-01 = 0 (prima drop 14,1%, amrap 4,7%, parziali 3,3%), RX-01:ipertrofia/macchina = 0 (prima 2,8%), DUR-02 pesato ≤ 41% (prima 82,8%), DUR-01 non peggiora (5,9%), VOL-01:femorali ≤ 30% (57,4%), FRQ-01:femorali ≤ 10% (31,4%), EQ-03:rapporto ≤ 15% (38,2%), MIS-01:femorali = 0 (4,9%), SES-03:lower/hinge = 0 in palestra (22,4% in tutto); `tests/generatore-onda0.test.js` con i casi sopra su 300 profili (seme fisso), compresa un'età mancante (nessun programma) e un 15enne (profilo minore).

**W0-T3 · Carichi in seduta: bug netti e dati · Sonnet · S** — B6 (ALG-02 parte «blocca»), B7, B8 (dati: MES-09), B26 (MES-06, parte in questo file)
- File: `js/coach/dolore-mattina.js`, `js/coach/carichi/progressivo.js`, `js/ui/allenamento/termina-e-cardio.js`.
- Leggere prima: `ricerca-algoritmi-carichi-e-app.md` §3.1, §3.6, §6 (U12, U13, U15, M1), §8 punto 13; `ricerca-mesocicli-periodizzazione-scarichi.md` §3.6.1, §5 righe 4, 5, 7, 19, §6 MES-06 e MES-09 (con il test suggerito); `ricerca-recupero-infortuni-popolazioni.md` §6 riga DEC-02 e §7 «correzioni di testo» (a).
- Cosa: «blocca» riporta peso **e** ripetizioni dell'ultima volta (helper `pesoUltimoDi(nome)` in progressivo.js) invece di togliere un incremento; «extra» solo se il «su» era di carico; «alte ripetizioni» non alza più a 12 (non supportato: ricerca-recupero §7): resta il −10% con «ampiezza senza dolore, RIR almeno 3»; la seduta salvata porta `settimana: { numero, fase }` e, per esercizio, `obiettivo: { reps, sets, rir, tecnica, coachTipo }` (MES-09); **carico di riferimento** (MES-06): helper `caricoRiferimento(nome)` = carico massimo dell'ultima seduta di quell'esercizio **non di scarico** entro 28 giorni; `ultimeSessioni(nome, n, { senzaScarico })` per la progressione; lo scarico del coach (CAR-10, `dolore-mattina.js`) usa il riferimento, non il carico già progredito. Prima della correzione, una prova riproduce il difetto (storico 60 kg × 8, tre sedute nella settimana di scarico: oggi 54 → 48,5 → 43,5).
- Accettazione: `tests/carichi-onda0.test.js` (blocca dopo +1 ripetizione → stesso carico; dopo +2,5 kg → carico di prima; extra dopo +1 ripetizione → niente kg in più; storico con i campi nuovi; backup e ripristino li conservano; con W0-T4 in INT-0: tre sedute di scarico a 54 kg, la prima dopo lo scarico a 60 kg).

**W0-T4 · Intensità e analisi pulite · Sonnet · M** — B10 (ponte), B11, B12 (PRN-01, MES-02 pavimenti), B18 (PRZ-03), B20 (STD-01), B24 (ETA-04), B26 (MES-06, parte in `caricoProssimoBase`), B27 (MES-10..12), B30, B31 (ETA-18)
- File: `js/coach/regole-ricerca.js`, `js/coach/esigenza.js`, `js/coach/repertorio.js`, `js/coach/prontezza.js`, `js/coach/intensita.js`.
- Leggere prima: `ricerca-algoritmi-carichi-e-app.md` §2G, §6 (U4, U15, U17), §7 ALG-18; `ricerca-mesocicli-periodizzazione-scarichi.md` §3.4, §3.6.1, §5 (righe 2, 4, 9, 11-13), §6 MES-06, MES-10..12; `ricerca-principianti-12-settimane.md` §6 (righe PRG-27/INT-02, PRZ-03, CAR-07), §7 PRI-01 (= PRN-01), PRI-07, PRI-12; `ricerca-forza-progressione.md` §3.6, §4 (CIC-01, STA-01, CAR-08); `ricerca-fasce-di-eta.md` §7 (consigli di corpo; aumenti dimezzati) ed ETA-04, ETA-18; `ricerca-psicologia-aderenza.md` §4 (PRZ-03); registro B2, B5, B10, D-P14.
- Cosa: principiante RIR [2,3] su tutte le classi; **intermedio nella prima settimana del blocco almeno 2 su macchine e isolamenti; pavimento 1 sui pesanti col bilanciere anche con `rirSett`** (collaudo RIR-02, RIR-03); l'esigenza non toglie RIR ai principianti né in deficit e il principiante parte da 1,0 (PRN-01, niente «Coach esigente»); `inScarico(h)` (usa `h.settimana` se c'è, altrimenti le fasi del programma) ed esclusione delle settimane di scarico da ESI-02, CAR-08, `eserciziFermi`, `verdettoCiclo` (soglia 3%, migliori sedute di carico: MES-12) e `strainSettimane` (niente secondo scarico entro 14 giorni: MES-10); ESI-02 confronta l'RPE con il RIR **salvato** nella seduta (`obiettivo.rir`, MES-11); nello scarico `caricoProssimoBase` usa `caricoRiferimento(nome)` di W0-T3 × dose, uguale in tutte le sedute della settimana, e la prima seduta dopo riparte dal riferimento con RIR +1 (MES-06; aggancio per nome con `typeof`); calibrazione RIR: niente nuovo apprendimento dal confronto tra serie diverse, `rirBias` dimezzato a ogni calibrazione fino a W3-T3; PRZ-03: niente serie in più ai principianti, e per gli altri solo con prontezza ≥ 85 e non nella prima settimana del blocco (ritirata del tutto in W3-T4, D-P14); stallo del principiante: lo schema 5×3 → 6×2 → 10×1 solo con obiettivo forza, altrimenti stesso peso, +30 s, poi −5% (ex PRI-12); aumenti dimezzati anche per `eta >= 65`, come dice il cap. 14 (ETA-18); `livelloStimato` con `STANDARD_FORZA` (STD-01: proposta di salita solo se anzianità e 2 alzate su 4 concordano; proposta di revisione se un avanzato dichiarato è sotto il livello 2 ovunque); `corpoCoach` senza creatina e proteine per `eta > 0 && eta < 18`.
- Accettazione: collaudo RIR-03 = 0 (prima: principiante 35,9%, intermedio 31,6% pesati), RIR-02 = 0 (prima 11,7%); `tests/intensita-onda0.test.js` (principiante isolamento RIR ≥ 2; seduta di scarico con RPE basso non alza l'esigenza; avanzato dichiarato con numeri da principiante → proposta di revisione, annullabile; verdetto di un intermedio che sale dell'1,5% a settimana = «buono», oggi «stallo»; 68enne: aumento dimezzato; esercizio presente 3 volte nella settimana di scarico: stesso carico in tutte e tre).

**W0-T5 · Sicurezza e segnali · Sonnet · M** — B9 (MES-08), B13, B14, B21 (ponte di PRN-03), B25 (SAF-01), B28 (CAS-01 guardia, CAS-14 ponte), B31 (REC-06 parte a), B32 (BIO-05 croci), B33, SEL-11 (ponte)
- File: `js/coach/questionario-decisioni.js`, `js/coach/programma/motore.js`, `js/coach/biomeccanica.js`.
- Leggere prima: `ricerca-recupero-infortuni-popolazioni.md` §3 (matrice), §6 (DEC-03, PRG-07, BIO-02, BIO-06); `ricerca-biomeccanica-esercizi.md` §5.3 (P4, P8, P9, P11), §7 SEL-03 e SEL-11; `ricerca-casa-poco-tempo.md` §6 H-08, §7 CAS-01, CAS-14; `ricerca-mesocicli-periodizzazione-scarichi.md` §5 riga 6, MES-08; `ricerca-fasce-di-eta.md` §7 (respirazione); registro B4, D-P5, D-P8, D-P11; collaudo `base` SAF-01, SAF-04, MIS-01, MOD-03 (registro E).
- Cosa: risposte sRPE = 3/6/8/10; «pesante» = sRPE ≥ 10 oppure arrivato stanco con sRPE ≥ 8 (le vecchie risposte 9 contano come 8); sostituzione per dolore = `alternativeStessoMuscolo` con penalità alle voci di `STRESS_ZONA[zona]`; se non ce n'è, stesso esercizio −20% con «ampiezza senza dolore, discesa in 3 s» (mai un altro muscolo); `RISCHIO.ginocchia` senza leg extension e leg press (restano con la nota di `SCALE_DOLORE`), coerente con `STRESS_ZONA`, e con le ginocchia dolenti resta almeno un esercizio per i quadricipiti (Wall Sit, leg extension isometrica, squat a corpo libero ad ampiezza senza dolore) con la nota di modifica; **buchi di RISCHIO** (B25): spalle + Pike Push-up; schiena + Front Squat, Rematore Presa Inversa (Yates), Sit-up, Russian Twist, Crunch a Terra (SEL-11); **attrezzi a casa** (B28): con luogo «manubri» o «corpo» `consentito` esclude ciò che `DETTAGLI[nome][1]` dice richiedere sbarra, parallele, sedia romana o panca per lombari, finché l'utente non dichiara l'attrezzo (W2-T5); il posto della tirata verticale senza sbarra lo riempie W0-T2 (CAS-14 ponte); BIO-05 senza il +0,5 alle croci ai cavi (D-P8); `respiroPer`: niente apnea anche per `eta >= 65` (REC-06 parte a); principiante: 8 settimane, scarico solo all'8ª (**solo per i programmi creati dopo l'onda 0**: D-P5; il v2 farà 12 settimane, W2-T4).
- Accettazione (prima = `base`): collaudo SAF-01 = 0 (prima spalle 15,3%, schiena 6,9% pesati), SAF-04 = 0 (manubri 20,4%, corpo 14,9%), MIS-01:quadricipiti = 0 (5,9%), PAT-01 non peggiora (dipende da W0-T6: misurato in INT-0); `tests/sicurezza-onda0.test.js` (Dura, Dura, Giusta → nessuno scarico; Al limite ×2 → scarico; per ogni voce di `STRESS_ZONA` la sostituzione ha lo stesso `bersaglioDi` o è lo stesso esercizio scontato; a casa senza sbarra nessuna trazione; 68enne senza PAR-Q: testo del respiro senza apnea; un programma salvato prima dell'onda 0 tiene le sue settimane di scarico); DEL-01 dei principianti: INT-0 aggiorna la soglia del collaudo alzando `VERSIONE_CRITERI`.

**W0-T6 · Dati degli esercizi · Sonnet · S** — B15, B16 (tag), SEL-02, P10, P12, B32 (RIC-03 croci, IN_ALLUNGAMENTO dei bicipiti), D-P11 (pullover)
- File: `js/dati/dettagli-esercizi.js`, `js/dati/libreria-esercizi.js`, `js/coach/programma/schemi.js`, `tests/muscoli.test.js`.
- Leggere prima: `ricerca-biomeccanica-esercizi.md` §2 (D1, D8), §4, §5.3-5.4 (P2, P6, P10, P12), §7 SEL-02; registro D-P8, D-P11.
- Cosa: hip thrust e ponte glutei fuori da `SCHEMI_MOV.hinge`; femorali tolti dai secondari di squat e leg press (adduttori tra i muscoli di squat profondo e leg press); Stacco con Trap Bar fuori dalla classe dei quadricipiti (resta in `catena_totale`); coppia Pullover ai Cavi → Pullover con Manubrio tolta da `SCAMBI_ALLUNGAMENTO_NUOVI`; **Pullover con Manubrio con bersaglio dorsali** (petto secondario) e nello schema della tirata verticale (D-P11); croci coi manubri e ai cavi alla pari: niente scambio né +1,5 «allungamento» per le croci (D-P8); `IN_ALLUNGAMENTO` senza «da seduto» generico, con curl su panca inclinata e curl Bayesiano (non Scott né Spider). Il bersaglio dello Stacco Rumeno **non** cambia qui (i crediti di W1-T2 risolvono il conteggio senza rompere le alternative).
- Accettazione: `muscoli.test.js` verde e aggiornato; collaudo PAT-01 in palestra = 0 (a casa resta finché W1-T5 non aggiunge lo stacco rumeno con manubri: scriverlo nel report); le alternative di Pullover con Manubrio sono tutte dorsali.

**INT-0**: come E.0; in più aggiorna i criteri del collaudo toccati da decisioni prese (con la skill del collaudo e `VERSIONE_CRITERI`): DEL-01 (principianti: scarico solo all'8ª per i programmi nuovi), PAT-01 (a casa senza sbarra la tirata verticale vale con pullover o elastico), TEC-01 (anche minori e over 65). Cancello (prima = `base`, registro E): nessun criterio peggiora; ERR-01 = 0; SAF-01, SAF-04, TEC-01, RIR-02, RIR-03, EXN-01, MIS-01:quadricipiti, MIS-01:femorali = 0; DUR-02 ≤ 41%; VOL-01:femorali ≤ 30%; FRQ-01:femorali ≤ 10%; EQ-03:rapporto ≤ 15%; `gravi_pesata` ≤ 21,5% (prima 35,8%); prova congiunta W0-T3 + W0-T4 dello scarico (MES-06).

### E.2 Onda 1 — fondamenta

Ordine: W1-T1, T2, T3, T4 in parallelo; W1-T5 dopo T2.

**W1-T1 · Regia: perché, squadra, soglie · Opus · M** — REG-01..06 (testo), convenzioni B.4
- File: `js/coach/parametri.js`, `tools/genera-catalogo.js`, `tools/elenco-soglie.js` (nuovo), `js/coach/regia/perche.js` (nuovo: `aggiungiPerche`, `testoPerche`, `sottoCoachDi`, `nomeSottoCoach`), `js/coach/regia/soglie-regia.js` (nuovo), `tests/soglie.test.js`, `tests/catalogo.test.js`.
- Leggere prima: registro A (codici e sotto-coach), C (regole bloccate), C.4 (etichette «Convenzione»); skill `implementa-regola-coach` §2.2-2.4.
- In arrivo: capitolo 0 con la tabella della squadra (B.1), capitoli vuoti 21-34, righe REG-01..06, righe «(bloccata)» per le regole del registro C.2, testo per la skill `implementa-regola-coach` (§2.2, §2.3, §2.4: niente wrapper nuovi, fasi registrate, file soglie, «(spegnibile)», «(bloccata)», cancello E.0 punto 0).
- In più: una riga con «(bloccata)» produce `bloccata: true` nel catalogo e `regolaAttiva(codice)` restituisce sempre `false` per quel codice; le forze ammesse nelle soglie restano quelle di B.4 e `perche.js` espone `etichettaForza(forza)` («Scelta prudente del coach (Convenzione): non è un risultato di studi», «Decisione di prodotto», «Numero di partenza, in verifica») per il foglio «Perché?» di W5-T1.
- Accettazione: `npm run catalogo -- --check` fallisce se un codice non ha sotto-coach o se un codice assorbito del registro A.3 compare come regola; `regolaAttiva` spegne una regola segnata «(spegnibile)» senza toccare `parametri.js` e non accende mai una regola «(bloccata)»; `docs/soglie-coach.md` generato; `IA-01..05` nel catalogo (superato il 2026-10-05: il Coach IA è stato rimosso, IA-01..05 sono codici ritirati nel registro A.3 e il catalogo non li contiene più; l'accettazione di W1-T1 resta valida per tutti gli altri codici).

**W1-T2 · Modello degli esercizi · Sonnet, revisione Opus · L** — SEL-01 (dati), SEL-03 (dati), SEL-06 (dati), MOD-01/04
- File: `js/dati/attributi-esercizi.js` (nuovo), `tests/attributi.test.js` (nuovo).
- Leggere prima: `ricerca-biomeccanica-esercizi.md` §3 (matrice), §4 (classi di equivalenza), §5.3-5.4; `ricerca-metodi-avanzati-intensita.md` §3.1 (classi A-F); `ricerca-ipertrofia-programmazione.md` §3 (conteggio); `ricerca-specializzazione-punti-deboli.md` §3.2 (solo per le eccezioni: i crediti restano 0/0,5/1, registro B6); `ricerca-recupero-infortuni-popolazioni.md` §3 (stress per zona); `ricerca-casa-poco-tempo.md` §4.1-4.2 (attrezzi e `serve`); `ricerca-principianti-12-settimane.md` §3.4 (abilità per i principianti); registro B6, D-P3.
- Cosa: `ATTRIBUTI` per ogni esercizio della libreria: `classe` (A-F, ricerca-metodi-avanzati §3.1: il Pallof è F), `schema` (squat, hinge, spintaAnca, spintaO, spintaV, tirataO, tirataV, affondo, isolamento, core, trasporto), `muscoli` (crediti per unità: bersaglio 1, secondario motore 0,5, eccezioni 0 con motivo: femorali 0 in squat e leg press, Kubo 2019; **niente pesi intermedi**, registro B6), `profilo` (allungato/medio/accorciato/piatto), `stabilita` 1-3, `fatica` 1-3, `abilita` 1-3 (SEL-06, con la tabella dei principianti), `unilaterale`, `stress` per 8 zone (spalla, gomito, polso, schiena, anca, ginocchio, caviglia, collo; 0 nessuno, 1 cautela, 2 controindicato: sono le **etichette di controindicazione per zona** che il collaudo MOD-01 chiede; il Pike Push-up è 2 sulla spalla, il Front Squat 2 sulla schiena), `attrezzo` (bilanciere/manubri/macchina/cavo/corpo/kettlebell/elastico/anelli), `serve` (sbarra, panca, parallele, ancoraggio, ruota, sedia romana, anelli, elastico, kettlebell: D-P3), `setup` (secondi). Funzioni: `attributi(nome)`, `creditoMuscoli(nome)`, `UNITA_VOLUME` (15 unità + mappa da `MUSCOLI`), `contaVolume(sedute)` → `{ unita: { frazionarie, dirette, sedute } }`, `classeTecnica(nome)`, `livelloAbilita(nome)`, `stressArticolare(nome, zona)`, `serveAttrezzo(nome)`. Nessun consumatore cambia ancora.
- Accettazione: ogni esercizio ha tutti i campi; il credito 1 cade sull'unità del `bersaglioDi` (eccezioni elencate); `stress` = 2 per ogni coppia esercizio-zona dell'elenco esperto del collaudo (CONTROINDICAZIONI di `tools/collaudo-generatore.js`): MOD-01 «ok»; report di confronto con `tipoCarico`, `stabile`, `attrezzoDi`, `RISCHIO`, `STRESS_ZONA` (differenze = correzioni volute, una riga ciascuna); fonte per voce dai capitoli 3-5 di `ricerca-biomeccanica-esercizi.md`.

**W1-T3 · Catene dei carichi senza wrapper · Sonnet, revisione Opus · L** — nessun cambiamento di comportamento
- File: `js/coach/regia/fasi.js` (nuovo: `registraFase`, `eseguiFasi`, `fasiRegistrate`), `js/coach/carichi/e1rm.js` (nuovo: `e1rm(peso, reps, rir)`, `caricoPer(e1rmKg, reps, rir)`; spostati `e1rmSerie`, `e1rmSeduta`), `js/coach/carichi/taratura.js` (nuovo: apprendimento CAR-14 spostato), `js/coach/sicurezza/scarico.js` (nuovo: spostati `DOSE_SCARICO`, `livelloFatica`; `scaricoReattivo(motivo, sedute)` usato da chi oggi scrive `ag.scarico`), `js/coach/dolore-mattina.js`, `js/coach/regole-nuove.js`, `js/coach/intensita.js`, `js/coach/regole-ricerca.js`, `js/coach/prontezza.js`, `js/coach/questionario-decisioni.js`, `js/ui/allenamento/seduta.js` (`unoRM` → `e1rm`), `tests/carichi-golden.test.js` + `tests/dati/carichi-golden.json`.
- Leggere prima: `ricerca-algoritmi-carichi-e-app.md` §3.2-3.3 (stimatore del massimale, `caricoDaE1rm`) e §6 (interazioni tra i tre involucri); `ricerca-forza-progressione.md` §3.3, §3.5; `ricerca-mesocicli-periodizzazione-scarichi.md` §3.6.1 (riferimento dello scarico, già portato in onda 0).
- Cosa: registrare **prima** il golden (500 casi: livelli × storici × aggiusti × scarico × prontezza × RIC/INT accesi e spenti → `caricoProssimo`, `applicaCaricoProgressivo`, `applicaProntezza`, `imparaDallaSeduta`); poi convertire le quattro catene in fasi (B.3) con lo stesso ordine; nessuna riassegnazione di funzioni di un altro file.
- Accettazione: golden identico (anche i testi); `npm run -s trova -- caricoProssimo` senza «riassegnato»; `fasi.js` caricato subito dopo `parametri.js`.

**W1-T4 · Generatore a stadi e brief · Sonnet, revisione Opus · L** — OBI-02 (fase), nessun altro cambiamento di comportamento
- File: `js/coach/regia/brief.js` (nuovo: `briefCoach`, `briefOggi`, `faseCorpo`), `js/coach/regia/genera.js` (nuovo: `window.buildProgram`, `giorniSettimana`, `verificaProgramma`, smistamento `specialitaStruttura`), `js/coach/sicurezza/vincoli.js` (nuovo: `vincoliSicurezza` con le regole di oggi), `js/coach/programma/ricette.js` (solo posti e scelta: `componiSedute`), `js/coach/programma/completamenti.js` (nuovo), `js/coach/programma/mesociclo.js` (nuovo: `pianoMesociclo`; spostati `strutturaProgramma`, `fasiProgramma`), `js/coach/programma/motore.js`, `js/coach/volume/serie-ripetizioni.js` (nuovo: `prescriviSerie`), `js/coach/volume/volume.js` (nuovo: `assegnaVolume` di oggi, `pavimentoVolume` → 0, `aggiungiSerieUtile` → nulla, `validaVolume` → nulla), `js/coach/volume/tempo.js` (nuovo: `durataSeduta` = formula di oggi, `adattaAlTempo`, `stimaEsercizi` = `exerciseCountFor` spostata), `js/coach/volume/tecniche.js` (nuovo: `assegnaTecniche` di oggi, dopo metodo e tocco), `js/coach/carichi/partenza.js` (`applicaPartenze`), `js/ui/onboarding.js`, `tests/genera-golden.test.js` + `tests/dati/genera-golden.json`.
- Leggere prima: `ricerca-obiettivi-e-programmi.md` §0.1 (cosa fa oggi ogni obiettivo) e OBI-02; registro D-P6 (obiettivi futuri).
- Accettazione: per 300 profili con seme fisso il JSON del programma è identico byte per byte a prima; collaudo standard identico a quello dell'etichetta `coach-v2-onda-0`; `tests/browser/coerenza-schede.js` verde; un profilo con un obiettivo sconosciuto (es. `corsa5k`) produce il programma di «salute» e il profilo conserva l'obiettivo (D-P6).

**W1-T5 · Libreria che chiude i buchi · Sonnet · M** (dopo W1-T2) — SEL-03..04 (dati), CAS-13, ricerca-biomeccanica §5.5, D-P2, D-P3
- File: `js/dati/libreria-esercizi.js`, `js/dati/dettagli-esercizi.js`, `js/dati/attributi-esercizi.js`, `js/dati/schede-tecniche.js`, `tests/muscoli.test.js`, `docs/inventario-esercizi-immagini.md`, `tests/browser/disegni-mancanti.js` (nuovo).
- Leggere prima: `ricerca-biomeccanica-esercizi.md` §5.5 (movimenti mancanti), §6 (cue); `ricerca-casa-poco-tempo.md` §3 (scale: le varianti da avere), §4.1-4.2, CAS-13, CAS-14; `ricerca-principianti-12-settimane.md` §3.4 (prime scelte del principiante); `ricerca-fasce-di-eta.md` §6 (alzata dalla sedia); `ricerca-metodi-coach-pratici.md` §5.6; registro D-P2, D-P3.
- Cosa: circa 30 esercizi: Stacco Rumeno con Manubri, Stacco Rumeno a una Gamba, Hip Thrust con Manubrio, Leg Curl con Asciugamano, Leg Curl in Piedi, Trazioni Negative, Alzate Laterali con Elastico, Alzate Laterali Inclinate, Floor Press con Manubri, Chest Press Inclinata alla Macchina, Calf Raise con Manubrio sul Gradino, Tibialis Raise, Cossack Squat, Copenhagen Plank, Reverse Crunch, Suitcase Carry, Wrist Curl, Reverse Wrist Curl, Extrarotazione al Cavo, Reverse Nordic, Belt Squat, Seal Row, Squat con Pausa, Panca con Pausa, Stacco in Deficit, Sit-to-Stand dalla Panca (potenza per over 65), Scrollate con Manubri (P13); per gli attrezzi nuovi (D-P3): Lat Pulldown con Elastico, Face Pull con Elastico, Kettlebell Swing, Rematore agli Anelli, Squat su Scatola, Step-up Basso. Nomi tradotti in arrivo. **Disegni: nessuno (D-P2)**, ogni esercizio ha la scheda tecnica completa (`TECNICA`: muscoli, passi, errori, cue).
- Verifica dei disegni mancanti (D-P2, già fatta sul codice: `slotImmagine` mostra «Immagine in arrivo» con `onerror`): la prova in browser apre la scheda di ogni esercizio nuovo e controlla il riquadro `.ex-img-slot.vuoto` con il testo tradotto, nessun errore in console, e che nessun consumatore di `schedaUnica(nome).img` presuma che il file esista; `docs/inventario-esercizi-immagini.md` elenca i nuovi come «senza immagine».
- Accettazione: collaudo MOD-12 senza buchi per hinge, femorali in flessione, deltoide laterale e posteriore a casa con manubri (prima: 6 celle vuote, registro E); `tests/browser/dettagli-esercizi.js`, `traduzioni-esercizi.js` e `disegni-mancanti.js` verdi.

**INT-1**: in più: `CLAUDE.md` (riga «Dove sta cosa»: `buildProgram` in `regia/genera.js`, catene in `regia/fasi.js`), regola 2 di `ARCHITETTURA.md` (niente wrapper: fasi registrate), `mappa-per-agenti.md` (nomi spostati), skill aggiornate, `npm run soglie` in `controlla`; criteri del collaudo SAF-01/SAF-02 che leggono l'attributo `stress` invece della lista interna (`VERSIONE_CRITERI`). Cancello in due passi: (1) uniti T1-T4, collaudo identico a quello di `coach-v2-onda-0` (stessa versione dei criteri) salvo i criteri riscritti, che danno lo stesso esito sui programmi di `coach-v2-onda-0`; golden di W1-T3 e W1-T4 identici; (2) unito W1-T5 (esercizi nuovi = programmi diversi per costruzione), INT-1 **rigenera il golden di `buildProgram`** (dichiarato qui, F.1 punto 11) e controlla che nessun criterio del collaudo peggiori e che MOD-12 e SES-03 a casa migliorino.

### E.3 Onda 2 — il generatore

Ordine: **2a** = T1, T2, T3, T4 in parallelo → INT-2a (unione, prove e criteri del collaudo da aggiornare: registro E) → **2b** = T5, T6, T7, **T8** in parallelo → INT-2. (T8 è la partenza bassa, anticipata dall'onda 3: registro F.2.)

**W2-T1 · Volume per muscolo · Sonnet, revisione Opus · L** — IPE-01 (assorbe SEL-01, SEL-05, SPE-02), IPE-02 (assorbe SPE-09, SPE-10), IPE-06, OBI-04 (assorbe MES-17 per il volume), PRN-01, EST-02/03/05/06 (parte volume, ex IPE-13, SPE-01, SPE-03..06, MES-16), REG-02 (nota, ex CAS-09); PRG-25..30 riscritte, PRG-26 ritirata, RIC-01 tenuta
- File: `js/coach/volume/volume.js`, `js/coach/volume/soglie-volume.js` (nuovo), `js/coach/esigenza.js`, `js/coach/intensita.js`, `tests/volume.test.js`.
- Leggere prima: registro **B6** (tabella `VOLUME_UNITA` e pavimenti per giorni: è la fonte dei numeri), B7, B19, D-P17; `ricerca-ipertrofia-programmazione.md` §3.1-3.3 e §5 (IPE-01, IPE-02, IPE-06); `ricerca-specializzazione-punti-deboli.md` §3.1, §5.1-5.3, §6; `ricerca-obiettivi-e-programmi.md` §3.1 (volume nel deficit) e OBI-04; `ricerca-mesocicli-periodizzazione-scarichi.md` §3.2 (fase di taglio); `ricerca-principianti-12-settimane.md` §3.2 (serie dirette nelle 12 settimane) e PRI-01; `ricerca-casa-poco-tempo.md` §5.4-5.6 (messaggi onesti).
- Cosa: `bersagliVolume(brief)` per unità con la tabella del registro B6 (fasce IPE per petto, dorsali, quadricipiti; fasce per muscolo per le altre unità; femorali ≥ 0,6 × quadricipiti con almeno una flessione del ginocchio a settimana; generale, forza e deficit come in B6; pavimenti di serie dirette per giorni); prioritari al massimo 2 (EST-02) con +25% (intermedio) o +40-50% (avanzato), tetto 20 (22 per deltoidi e polpacci, 18 tricipiti), gli altri a `max(mantenimento, 50% dello standard)`; solutore goloso: unità con il deficit relativo più alto → esercizio con più credito per minuto e meno «sbordo» → +1 serie (tetti per esercizio, per seduta 8 morbido / 11 duro, in specializzazione 8 duro e 6 per le unità piccole, tempo da `durataSeduta`); ogni unità con serie dirette in almeno 2 sedute quando i giorni sono ≥ 3 (collaudo FRQ-02); se un'unità non ha esercizi, chiede un posto all'Architetto (`aggiungiSerieUtile` nella seduta con più tempo); `validaVolume` scrive la nota con la causa (REG-02: «Polpacci 4 serie: con 30 minuti non entra di più»; sotto 4 frazionarie «con questi minuti è un programma di mantenimento»); l'esigenza sposta solo il punto di partenza dentro la fascia (mai oltre), per il principiante parte da 1,0 (PRN-01), non in deficit (OBI-04: 85-90% del picco). Spenta IPE-01 → algoritmo di oggi (tenuto in `assegnaVolumeGruppi`, stesso file).
- Accettazione (con il tempo di W2-T2, misurata a INT-2a; prima = `base`, registro E): collaudo MIS-01 = 0 (prima fino a 5,9% pesato); VOL-01 ≤ 2% pesato e sempre con nota (prima femorali 57,4%, petto 26,0%); VOL-02 = 0 oltre la tolleranza del +10% (prima glutei 35,0%, schiena 29,2%); DIR-01 = 0 nel perimetro G (prima 18,9-23,1%); FRQ-01 = 0 salvo frequenza 1 (con W2-T5); FRQ-02 ≤ 5% (prima 15,5%); EQ-03 = 0 (38,2%); SES-01 = 0 (6,6%); collaudo PRI-01 = 0 (6,2%). INT-2a aggiorna le soglie VOL-01/VOL-02/DIR-01 del collaudo alla tabella B6.

**W2-T2 · Il tempo · Sonnet · M** — CAS-05 (assorbe IPE-14, RIS-12 come calcolo, MAV-09 per il tempo), CAS-06 (riga principiante ex PRI-08), CAS-07 (ex IPE-03), CAS-08 (ex MAV-12), CAS-18, IPE-04, IPE-12, PCO-04; PRG-03, PRG-13 (tabella pause, ex CAS-04 ed ETA-09), PRG-20 (D-P7), PRG-33 riscritte; B34 (pause), B36
- File: `js/coach/volume/tempo.js`, `js/coach/volume/soglie-tempo.js` (nuovo), `js/coach/volume/serie-ripetizioni.js`, `js/coach/metodi-momenti.js` (solo i metodi `rr`, coppie per muscolo antagonista e non per indice, e `minimo`, con giorni [2, 3] e minuti [20, 45]: PCO-04, CAS-10), `js/ui/oggi.js`, `js/ui/piano/giorno.js`, `js/ui/piano/aggiungi-allenamento.js` (solo le stime di durata: stessa funzione del generatore), `tests/tempo.test.js`.
- Leggere prima: `ricerca-casa-poco-tempo.md` §5 (5.1-5.7: costanti, capacità, scala di priorità, risolutore), §6 (H-01..H-04, H-07, H-13), §7 CAS-04..08, CAS-18; `ricerca-ipertrofia-programmazione.md` §3.4, §3.8, IPE-04, IPE-12; `ricerca-riscaldamento-mobilita-prevenzione.md` §3.6-3.9 (minuti del riscaldamento); `ricerca-metodi-coach-pratici.md` §5.5 e PCO-04; `ricerca-metodi-avanzati-intensita.md` §4.1, §4.3 (tempo delle tecniche e delle superserie); `ricerca-principianti-12-settimane.md` §3.2 (durata), PRI-08; `ricerca-donne-carichi-iniziali.md` §4 (pause) e DON-08; `ricerca-fasce-di-eta.md` §3.2 (pause oltre i 65); registro B8, B11, B12, D-P7, D-P10.
- Cosa: `durataEsercizio` con le costanti di CAS-05 (tempo per serie per classe, cambi, unilaterali ×2 + 10 s, coppie `T_coppia`) + rampa di riscaldamento (RIS 3.9) per il primo esercizio dello schema + riscaldamento generale (RIS 3.7), con i tetti di RIS 3.6; fattore personale CAS-18 (mediana minuti reali / stimati, 0,8-1,4, dopo 3 sedute); **la stessa funzione** per il generatore e per le stime di Oggi, Giorno e Aggiungi allenamento (oggi l'interfaccia toglie 8 minuti: B36); pause dalla tabella per classe e obiettivo del registro B8 (oltre i 65 almeno 90/120 s; donne −15% solo su D, E e su B, C con ≥ 8 ripetizioni, etichetta «Convenzione»: D-P7); `adattaAlTempo` (CAS-07): (1) pause al minimo della classe, (2) coppie antagoniste se fanno risparmiare, anche sopra i 45 minuti (ABB-06 invariata: mai con un pesante), (3) tolti tecniche, core, braccia dirette, (4) serie 3 → 2 sui non prioritari, (5) isolamenti dei piccoli uno alla volta, mai sotto `pavimentoVolume` né sotto i 4 schemi base × 2 serie; se resta tempo, `aggiungiSerieUtile` **solo finché un'unità è sotto fascia** (il tempo è un tetto: D-P10); `stimaEsercizi` = capacità di CAS-06 (minimo 4, massimo 8, 10 con coppie; principianti 4-6 esercizi e al massimo 40 minuti nelle settimane 1-2 e 50 dopo); prescrizione per classe e obiettivo (`prescriviSerie`): obiettivo forza con i multiarticolari pesanti a ≤ 6 ripetizioni (collaudo GOA-01), 5×5 solo classe A, ripetizioni e pause nella fascia (collaudo RX-01/02); giorno «forza» del PHUL sotto i 60 minuti a 6-8 ripetizioni (IPE-04); metodo `rr`: «3 × 5-8, a 3 × 8 variante più difficile» davvero e coppie antagoniste (collaudo SS-01); nota «la seduta dura circa # minuti» e, se il volume utile è completo prima, «il lavoro utile per te è già tutto qui».
- Accettazione (prima = `base`, registro E; criterio DUR-02 nella definizione v2 di INT-2a): collaudo DUR-01 = 0 (prima 5,9% pesato, 727 sforamenti su 862 a 30 minuti); DUR-02 ≤ 3% (prima 82,8%); EXN-01/02 = 0 (2,4% / 13,8%); SS-01/02 = 0 (2,0% / 1,0%); RX-01 = 0, RX-02 = 0 (fino a 3,5% / 2,8%); GOA-01 = 0 (9,5%); prova: durate di 6 sedute campione = calcolo a mano ±1 minuto; Oggi e il generatore mostrano lo stesso numero.

**W2-T3 · Cancello delle tecniche · Sonnet · M** — MAV-01..09, MAV-11, MAV-13, MAV-16 (MAV-02 assorbe CAS-12; MAV-03 assorbe ETA-10, PRI-06, PRI-16; MAV-07 assorbe IPE-10; MAV-16 assorbe IPE-11); ETA-02 (matrice per i minori); aggancio di MES-02 in `rirBersaglioBase`; PRG-34, RIC-04 riscritte. **MAV-14 (BFR) bloccata**: non si scrive, nemmeno come testo (registro C.2 n. 14)
- File: `js/coach/sicurezza/tecnica-adatta.js` (nuovo: `tecnicaAdatta(tecnica, nome, brief, ctx)`, `budgetTecniche(brief, settimana)`), `js/coach/sicurezza/soglie-tecniche.js` (nuovo), `js/coach/volume/tecniche.js`, `js/coach/regole-nuove.js` (`limitaTecnicheIntense` → budget), `js/coach/regole-ricerca.js` (testi `TECNICHE` onesti: «non fa crescere di più, risparmia tempo»; AMRAP «fermati a 1 ripetizione dal cedimento» (MAV-06); e l'aggancio `typeof rirPianoSettimana === 'function'` in `rirBersaglioBase`, che legge la tabella di W2-T4), `tests/tecniche.test.js`.
- Leggere prima: `ricerca-metodi-avanzati-intensita.md` §1 «In una pagina», §3 (classi e matrici), §4 (budget e posizione), §7 (audit), §8 (MAV); `ricerca-ipertrofia-programmazione.md` IPE-10, IPE-11; `ricerca-casa-poco-tempo.md` CAS-12; `ricerca-fasce-di-eta.md` §3.2 (tecniche per età) ed ETA-02; `ricerca-principianti-12-settimane.md` PRI-06; registro A.2 (tecniche), C.2 n. 14.
- Cosa: matrice tecnica × classe (§3.2) e gruppi G1-G5 × livello, età (minori come principianti; 50-64 solo D/E per G2; ≥ 65 solo G1, cluster e potenza leggera), PAR-Q, dolore, scarico, prontezza, poco tempo (§3.3); budget (§4.1: principiante 0, intermedio 1 per seduta e 2 a settimana, avanzato 2 e 6, specializzazione 8); posizione nel blocco (§4.2) da `prog.piano`; quanto conta nel volume (drop = 2 serie, rest-pause/myo = 3); filtro anche delle tecniche messe da metodo e tocco; RIC-04 tiene la tecnica più sicura, non la prima della lista (MAV-05).
- Accettazione: collaudo TEC-01 = 0 (resta 0 da INT-0); prova sulla matrice standard: 0 tecniche su classe F, 0 G2 a principianti, over 65, PAR-Q, minorenni, scarico o prontezza < 50, budget mai superato; con `rirPianoSettimana` assente `rirBersaglioBase` dà i valori di oggi (golden).

**W2-T4 · Mesociclo · Sonnet · M** — MES-01 (ex IPE-07), MES-02 (ex IPE-05, PCO-02, PCO-07, PRI-02, OBI-10, ALG-18, CAS-11), MES-03 (piano; ex IPE-08, PRI-04), PRN-03 (12 settimane), OBI-03; PRG-01, PRG-38 riscritte; MOD-06, MOD-09
- File: `js/coach/programma/mesociclo.js` (anche `rirPianoSettimana(nome, data)`, letta da `rirBersaglioBase` con l'aggancio di W2-T3), `js/coach/programma/soglie-struttura.js` (nuovo), `js/coach/programma/alternative.js` (salva `versione`, `piano`, `volume`, `perche`, `modalita`, `cardio` nel programma), `tests/mesociclo.test.js`.
- Leggere prima: registro **B4, B5** (sono la fonte delle tabelle) e D-P15; `ricerca-mesocicli-periodizzazione-scarichi.md` «In una pagina», §3.1-3.6, §3.11, §6 A (MES-01..03); `ricerca-principianti-12-settimane.md` §3.1-3.3 (tabella delle 12 settimane, struttura per giorni) e PRI-02..04; `ricerca-ipertrofia-programmazione.md` §3.5-3.6; `ricerca-metodi-coach-pratici.md` §5.3-5.4; `ricerca-obiettivi-e-programmi.md` OBI-03; `ricerca-casa-poco-tempo.md` CAS-11.
- Cosa: `prog.piano = { versione: 2, settimane: [{ n, fase: 'carico'|'scarico'|'test'|'controllo', rir: { A, B, C, D, E }, volume /* fattore della rampa */, tecniche: 'G1'|'G2', nota }] }`: **principiante non prudente 12 settimane** (PRN-03: settimane 1-11 di carico, 12ª di verifica con serie −30/−35%, RIR 3-4, carico invariato; all'8ª «controllo»: diventa scarico «basso» solo se la fatica è «media» o «alta» o un segnale di MES-07 è acceso); principianti prudenti (over 65, PAR-Q, minori) 3+1 come oggi; serie del principiante 2/2 nelle settimane 1-2, poi 3 sui primi tre esercizi, 3 su tutti dalla 5ª; intermedio 2 × (5+1) con rampa 0,75 · 0,85 · 0,95 · 1 · 1; avanzato 5+1 (anticipabile a 4+1) con rampa 0,70 · 0,80 · 0,90 · 1 · 1 e +1 serie ai prioritari dalla 3ª; RIR per settimana e classe dalla tabella del registro B5 (principiante [3,4] settimane 1-2, [2,3] poi, isolamenti stabili [1,2] dalla 7ª, [3,4] alla 12ª; pavimento 1 sui pesanti; pavimento 2 sugli instabili a casa senza assistenza; il RIR non supera mai 4); modificatori OBI-03 (salute [2,3]; forza sui pesanti [2,4] salvo AMRAP; deficit pavimento 2 sui pesanti); niente rampa per prudenti e over 65; la durata del programma viene dal piano (`schemeFor.settimane` tolta o letta: collaudo MOD-09); `fasi` e `rirSett` derivati per chi li legge ancora.
- Accettazione (prima = `base`): collaudo RIR-01 = 0 (prima 40,0% pesato), RIR-02 = 0, RIR-03 = 0 (restano 0 da INT-0), DEL-01 = 0 con la soglia aggiornata in INT-2 (principianti 12 settimane); MOD-06 e MOD-09 «ok»; prova: forma del piano per 12 combinazioni livello × obiettivo, più principiante prudente e principiante con fatica alta all'8ª.

**W2-T5 · Split, giorni e attrezzi · Sonnet · M** — PRG-02, ABB-05, OBI-01, OBI-07 (testo), OBI-12, PCO-09, CAS-01 (domanda), CAS-10, EST-05 (giorno di priorità, ex SPE-18), ETA-05 (sonno dei minori nell'onboarding); FRZ-01 (attivazione); D-P3
- File: `js/ui/onboarding.js` (split per giorni e minuti, §3.7; domanda «Che forza?» generale/powerlifting; avviso massa + dimagrimento; **domanda sugli attrezzi** di casa e palestra: sbarra, panca, elastici, kettlebell, anelli, manubri e kg del più pesante; opzione **20 minuti** e nuovo testo dei minuti; sottotitolo «tonificare» della ricomposizione; per i minori «Bene» = 8 ore o più), `js/ui/opzioni/il-coach.js` (gli stessi attrezzi in Opzioni: `ATTREZZI_PALESTRA` e attrezzi di casa), `js/coach/regia/genera.js` (`giorniSettimana`: niente stesso grande muscolo in giorni consecutivi, al massimo 4 giorni di fila; aggancio `specialitaStruttura`), `js/coach/compone.js` (spareggio per aderenza, PCO-09; `metodoAmmesso` accetta il `minimo` a 20-45 minuti e 2-3 giorni: la voce del metodo la cambia W2-T2 in 2a), `js/coach/programma/soglie-split.js` (nuovo), `tests/split.test.js`.
- Leggere prima: `ricerca-ipertrofia-programmazione.md` §3.7; `ricerca-principianti-12-settimane.md` §3.3 (struttura per giorni; 5-6 giorni diventano 4, detto all'utente); `ricerca-casa-poco-tempo.md` §2 (righe «poche sedute lunghe o molte brevi», «sotto la mezz'ora»), §5.5, §7 CAS-01, CAS-10; `ricerca-obiettivi-e-programmi.md` §4 (combinare obiettivi), OBI-01, OBI-07, OBI-12; `ricerca-specializzazione-punti-deboli.md` §5.3 e SPE-18; `ricerca-metodi-coach-pratici.md` §3 H-01..H-04; `ricerca-fasce-di-eta.md` §5 punto 4 (sonno); registro D-P3; collaudo `base` REC-01..03, SPL-01, FRQ-01 (registro E).
- Accettazione (prima = `base`): collaudo SPL-01/02 = 0 (SPL-01 prima 6,7%: i principianti con 5-6 giorni ricevono 4 sedute **con la nota**), FRQ-01 = 0 salvo frequenza 1 scelta (prima femorali 31,4%, quadricipiti 7,5%), REC-01 = 0 (prima spalle 13,4%: frequenza 3 con 4 giorni), REC-02 = 0 (3,9%), REC-03 = 0 (7,3%: 6 giorni lunedì-sabato); gli attrezzi dichiarati arrivano a `consentito` (W2-T6) tramite il brief.

**W2-T6 · Scelta per attributi · Sonnet, revisione Opus · L** — PRG-05..10 riscritte, PRG-22 riscritta (ex DON-11, SPE-16), IPE-09, RIC-03 (Convenzione), SEL-03 (+ CAS-01, CAS-13), SEL-04, SEL-06 (+ ex PRI-05), SEL-07, SEL-08 (+ ex SPE-10), SEL-13, SEL-15, SEL-16 (Convenzione), EST-04 (coppie regionali, ex SPE-07), CAS-14, PRN-15, PCO-08 (spostata da W4-T1); D-P8; MOD-04, MOD-12
- File: `js/coach/programma/ricette.js`, `js/coach/programma/schemi.js`, `js/coach/programma/completamenti.js`, `js/coach/programma/struttura-pro.js`, `js/coach/programma/motore.js`, `js/coach/programma/soglie-selezione.js` (nuovo), `tests/selezione.test.js`.
- Leggere prima: `ricerca-biomeccanica-esercizi.md` §2 (D1-D10), §3, §4, §7 parte A; `ricerca-ipertrofia-programmazione.md` IPE-09; `ricerca-principianti-12-settimane.md` §3.4 (prime scelte ed esclusi del principiante), PRI-05, PRI-15; `ricerca-specializzazione-punti-deboli.md` §5.4 e SPE-07; `ricerca-casa-poco-tempo.md` §4.2, CAS-13, CAS-14; `ricerca-metodi-coach-pratici.md` §3 H-08 (PCO-08); `ricerca-donne-carichi-iniziali.md` §4 (parte alta) e DON-09, DON-11; `ricerca-fasce-di-eta.md` §3.2 (esercizi da favorire ed evitare oltre i 65); registro D-P3, D-P8; collaudo `base` (registro E).
- Cosa: `SLOT_DEF`, `SCHEMI_MOV`, `ISOLAMENTI`, `IN_ALLUNGAMENTO`, `SCHIENA_PESANTE` derivati dagli attributi (stessi nomi, per chi li usa); punteggio = `PRIORI` + stimolo/fatica (fatica 3 penalizzata per la massa) + profilo allungato per l'ipertrofia (bicipiti: curl inclinato o Bayesiano come primo, Scott e Spider come secondo; croci ai cavi e coi manubri alla pari: D-P8) + abilità ≤ livello (SEL-06; principianti: niente bonus +3 al bilanciere al primo posto salvo obiettivo forza, prime scelte della tabella principianti §3.4, un solo esercizio di abilità 2 per seduta, mai 3) + setup corto con poco tempo + `penalitaPartenza` della Bilancia (se definita, D.4); `consentito` rispetta `serveAttrezzo` e gli attrezzi dichiarati (SEL-03, CAS-01) e i livelli di `stress` per zona; tirata verticale senza sbarra (CAS-14: elastico, pullover, una serie in più di rematore, con la nota); classe larga se il muscolo non ha alternative (SEL-04); core con un movimento «anti» e uno di flessione (SEL-07); polpacci in piedi sempre, seduto da 6 serie (SEL-08); ogni seduta lower e full body con uno squat e un hinge o una flessione del ginocchio (collaudo SES-03); per i prioritari una variante allungata e una accorciata (EST-04); IMC ≥ 30: esercizi con appoggio, niente salti né transizioni a terra, nessun consiglio su calorie (PRN-15, Convenzione); spalla delicata: rotazione esterna o face pull 1-2 volte a settimana e spinte alternate (PCO-08, collaudo SAF-06); enfasi sui glutei solo da obiettivo o priorità, mai dal sesso (PRG-22); Scrollate con due voci (bilanciere, manubri) e `attrezzoDi` coerente (collaudo MOD-04); bilanciamento spinta/tirata con gli attributi (ABB-04: collaudo EQ-01); ordine per grandezza del muscolo (collaudo ORD-03).
- Accettazione (prima = `base`, registro E): collaudo EQ-01 = 0 (11,5%), EQ-02 = 0, EQ-03 = 0 (38,2%), ORD-01..04 = 0 (ORD-03 17,6%), RID-01 ≤ 5% (23,4%), RID-02 ≤ 5% (13,8%), PAT-01 = 0, SES-03 = 0 (22,4%), SAF-03..06 = 0 (SAF-04 20,4%, SAF-05 20,4%, SAF-06 10,5%); MOD-04 e MOD-12 «ok»; RX-01..04 non peggiorano.

**W2-T7 · Specialista Forza: struttura · Sonnet, revisione Opus · M** — FRZ-01..05, STD-02 (testo)
- File: `js/coach/specialita/forza.js` (nuovo: `SPEC_FORZA = { attiva, split, sedute, varianti, accessori }`), `js/coach/specialita/soglie-forza.js` (nuovo), `tests/forza-struttura.test.js`.
- Leggere prima: `ricerca-forza-progressione.md` §1.4, §1.6 (righe frequenza, punti deboli: Convenzione), §2C, §3.7-3.8; `ricerca-metodi-coach-pratici.md` §2.7-2.12 (5/3/1, GZCL, nSuns, Candito, Sheiko, RTS), §3 H-18..H-21; `ricerca-obiettivi-e-programmi.md` §3.1 riga «Forza».
- Cosa: 3 giorni (A/B/C: squat ×2, panca ×3, stacco ×1 + variante), 4 giorni (2 sedute squat, 2 panca pesante/volume, stacco + variante), 5 giorni; onda giornaliera pesante/media/leggera (FRZ-05); varianti e accessori per punto debole dichiarato (FRZ-03/04: «fermo in buca» → squat con pausa; «fermo a metà panca» → panca presa stretta e tricipiti); nessun test 1RM (STD-02).
- Accettazione: profili powerlifting con ≥ 3 giorni: squat ≥ 2×, panca ≥ 2×, stacco ≥ 1× a settimana; collaudo GOA-01 = 0 e DUR-01 = 0 su questi profili.

**W2-T8 · Partenza bassa per le donne e calibrazione rapida · Sonnet, revisione Opus · M** (ex W3-T2, anticipato: registro F.2) — PAR-01 riscritta (livello mancante, D-P12), PAR-05 riscritta (testo, ex DON-07), PAR-06..09 (ex DON-01, DON-03, DON-05, DON-09), CAR-18..19 (ex DON-04, PRI-09), capitolo D
- File: `js/coach/carichi/partenza.js` (PAR-01, PAR-05..09, `penalitaPartenza`, letta da `ricette.js` di W2-T6 con `typeof`), `js/coach/carichi/calibrazione.js` (nuovo: fase 'carico' 15 con `registraFase`), `js/coach/carichi/soglie-partenza.js` (nuovo), `js/coach/intensita.js` (INT-05 esclude la calibrazione), `js/coach/esigenza.js` (ESI-02 idem), `tests/partenza-donne.test.js`, `tests/aiuto-atleta.js` (nuovo: `atletaVirtuale({ sesso, livello, capacita: { nome: e1rmVero }, rumoreRpe, quotaSenzaRpe, seme })` → `{ eseguiSeduta(voci del piano) → serie con ripetizioni e RPE }`, capacità estratte dalle àncore della nota donne §3.1 e §3.5, capacità che cresce con la scala del livello).
- Leggere prima: **capitolo D di questo piano** (riscritto) e registro **B1**, B3, B22, D-P1, D-P12, D-P13, D-P16; `ricerca-donne-carichi-iniziali.md` §0, §1.1-1.6, §2, §3.1-3.8, §5, §6 (DON-01..09); `ricerca-forza-progressione.md` §3.3 (punto 5) e §3.5; `ricerca-principianti-12-settimane.md` §3.6 (calibrazione nelle sedute 1-3) e PRI-09; `ricerca-algoritmi-carichi-e-app.md` §2A (l'RPE dei principianti come freno).
- Dipende da: W1-T3 (`registraFase`, `e1rm.js`), W1-T4 (`applicaPartenze`), W0-T3 (`obiettivo.rir` nella seduta). In 2b `partenza.js`, `intensita.js`, `esigenza.js` non sono di altri task.
- Accettazione: D.8 per intero; G riga «Partenza bassa donne» e riga «Carichi» per i principianti.

**INT-2**: in più aggiorna i criteri del collaudo DEL-01 (principianti 12 settimane) e SPL-01 (con la nota non è un fallimento). Cancello sulla matrice standard (prima = `base`, registro E): MIS-01, VOL-02, SES-01, SES-03, DUR-01, EXN-01/02, TEC-01, PAT-01, SPL-01/02, FRQ-01, REC-01..03, DEL-01, RIR-01..03, EQ-01..03, ORD-01..04, SS-01/02, RX-01/02, GOA-01, collaudo PRI-01, SAF-01, SAF-03..06 = 0; VOL-01 ≤ 2% pesato; DUR-02 ≤ 3%; FRQ-02, RID-01, RID-02 ≤ 5%; `gravi_pesata` ≤ 1% (prima 35,8%); D.8 punto 9 (atleta virtuale). I programmi nuovi hanno `versione: 2`.

### E.4 Onda 3 — carichi e autoregolazione

Tutti in parallelo (W3-T6 usa l'aggancio di W3-T1 per nome: `modelloForza` se definita; W3-T5 usa l'aggancio di W3-T1 per nome: `valutaCaloEsercizio` se definita). La partenza bassa (ex W3-T2) è già in onda 2 (W2-T8): l'atleta virtuale c'è.

**W3-T1 · Bilancia v2 · Opus · L** — PGR-01, PGR-02 (ex ALG-07, DON-06, PRI-11), PGR-04 (ex ALG-13), AUT-01, AUT-02 (ex ALG-04), PCO-01 (ex PRI-12), PCO-06, ALG-02, ALG-05, ALG-06, ALG-08, ALG-11, CAS-02 (ex PGR-03, ALG-15), CAS-15, testo del «perché questo peso» (ex ALG-16), MOD-05; PRO-01, CAR-06/07/09 riscritte; B7, B8, B17, B35
- Leggere prima: registro **B3**, B16; `ricerca-forza-progressione.md` §2 (A, D, E, G), §3.1-3.5, §3.8, §4, §5; `ricerca-algoritmi-carichi-e-app.md` §2, §3 (tutto: pseudo-codice, tabelle 3.4-3.5, vettori di prova 3.14), §6, §7 (ALG-02, 05, 06, 07, 08, 11, 15, 16); `ricerca-metodi-coach-pratici.md` §5.1-5.2, §5.6, PCO-01, PCO-06; `ricerca-casa-poco-tempo.md` §3 (scale), §3.8 (elastici), CAS-02, CAS-15; `ricerca-principianti-12-settimane.md` §3.5, PRI-11, PRI-12; `ricerca-donne-carichi-iniziali.md` DON-06.
- In più: `js/dati/scale-corpo.js` (nuovo: scale di leve per schema, CAS-02); `W` = carico più frequente tra le serie fatte (ALG-02; prima la prova che riproduce U10); gradini dello stallo come nel registro B16; aggancio `typeof valutaCaloEsercizio === 'function'` per lo stallo per tendenza di W3-T5 (ALG-12); la nota del carico porta il numero («Massimale stimato 106 kg · 5 con 2 di scorta → 87,5 kg», versione semplice per i principianti).
- File: `js/coach/carichi/modelli.js` (nuovo: `modelloProgressione(nome, brief)`, lineare/doppia/rpe/onda), `js/coach/carichi/attrezzi.js` (nuovo: `passoAttrezzo(nome, prof)`, `arrotondaAttrezzo(nome, kg, verso)`), `js/coach/carichi/soglie-progressione.js` (nuovo), `js/coach/regole-ricerca.js` (`caricoProssimoBase`: v1 invariato + smistamento v2), `js/coach/carichi/progressivo.js` (incremento = max(passo, % × carico) con scala S1/S2/S3 misurata sulle ultime 6 volte; `ultimeSessioni(nome, n, banda)`), `js/coach/carichi/e1rm.js` (ripetizioni + RIR, migliore di due sedute, rumore 3%), `js/coach/volume/serie-ripetizioni.js` (range `ripRange` per classe e obiettivo, ricerca-forza §3.4), `js/ui/opzioni/il-coach.js` («Pesi della tua palestra»: microdischi, passo manubri, passo macchine, manubrio più pesante a casa), `js/dati/scheda-unica.js`, `tests/bilancia-v2.test.js`.
- Cosa: fase 'carico' 10 v2 per `versione ≥ 2`; fase 20: se il bersaglio di ripetizioni cambia di ≥ 2 rispetto all'ultima volta (o la banda è diversa), carico = `caricoPer(e1rm recente, reps, RIR)` per difetto (risolve B7, B8, TOCCHI piramide, cambio di blocco); arrotondamento all'attrezzo vero per tutti i programmi (B17).
- Accettazione: 0 carichi fuori griglia (ALG-06, anche a casa con i manubri dichiarati); scala per esercizio con intervalli 0/7/21 giorni; conversione 5→8 ripetizioni entro ±2,5% del calcolo; AUT-01 tra 2,4 e 2,9% per punto di RPE e mai oltre 6% (registro B3); prova che riproduce U10 **prima** della correzione ALG-02 e la vede sparire dopo; principianti: l'RPE frena e non accelera (salvo calibrazione CAR-18); collaudo MOD-05 «ok» (`ripRange` presente); atleta virtuale (W2-T8) con la stessa convergenza di D.8 punto 9 anche con la bilancia v2; programmi v1: golden invariato salvo arrotondamento (differenze elencate).

**W3-T2** · spostato in onda 2 come **W2-T8** (registro F.2): la partenza bassa e l'atleta virtuale servono già al cancello di INT-2.

**W3-T3 · Taratura del RIR e autoregolazione in seduta · Sonnet · M** — CAR-14 riscritta (assorbe ALG-09; registro B2), CAR-13 riscritta (serie di punta + back-off per il modello rpe), MAV-04, MAV-10, AUT-03 (assorbe ALG-10), ALG-17 (record intelligenti), tocco a 3 scelte (D-P16, ex PRI-09 in seduta)
- Leggere prima: registro **B2**, D-P16; `ricerca-algoritmi-carichi-e-app.md` §2A, §2G, §3.7, §3.13, ALG-09, ALG-10, ALG-17; `ricerca-forza-progressione.md` §2A; `ricerca-mesocicli-periodizzazione-scarichi.md` audit 17 (quando tarare); `ricerca-principianti-12-settimane.md` §3.6 e §6 (RPE dei principianti), PRI-06, PRI-09; `ricerca-metodi-avanzati-intensita.md` MAV-04, MAV-10.
- File: `js/ui/allenamento/seduta.js`, `js/coach/carichi/taratura.js`, `js/coach/carichi/soglie-taratura.js` (nuovo), `css/allenamento.css`, `tests/taratura.test.js`, `tests/browser/taratura.js` (nuovo).
- Cosa: serie di taratura con previsione **sulla stessa serie** («Arrivato a # ripetizioni: quante ne faresti ancora?» poi fino al cedimento; bias = previsto − vero, media mobile) una volta per blocco **nella settimana 2-3**, su un isolamento a macchina o cavo, solo per chi può (MAV-04: intermedi e avanzati sotto i 65, non PAR-Q, non minori, prontezza ≥ 50); principianti solo dalla settimana 8, facoltativa, su macchina; dopo la prima serie, con RPE ≥ bersaglio + 1,5 la seduta propone −5% (un tocco, annullabile), con RPE ≤ bersaglio − 2 propone +2,5-5% (AUT-03); per i principianti nelle prime 3 esposizioni a un esercizio il tocco a 3 scelte dopo la prima serie (facile / giusta / dura = RPE 6 / 8 / 9,5) che alimenta CAR-18 di W2-T8 (già unito); record solo su serie confrontabili (stesse ripetizioni ±2, e1RM, niente record in scarico, ALG-17); pulsanti manuali Drop e Rest-pause con il testo onesto (MAV-10).
- Accettazione: nessun apprendimento da serie diverse; nessuna taratura nell'ultima settimana del blocco né per chi è escluso da MAV-04 (prova su ogni esclusione); suggerimento in seduta mai per principianti in aumento, mai in scarico; tocco a 3 scelte visibile solo nelle prime 3 esposizioni dei principianti; 0 record da serie non confrontabili; prova in browser a 360×640.

**W3-T4 · Volume che si adatta e rampa in seduta · Sonnet, revisione Opus · M** — MES-03 (in seduta; ex IPE-08), PCO-03, CST-07, CST-08 (cancello del +1 di PCO-03), ETA-05 (sonno dei minori nella prontezza); PRZ-01 riscritta (CST-07), PRZ-02 riscritta, **PRZ-03 ritirata** (D-P14; ponte già in W0-T4), RIC-01 assorbita
- Leggere prima: registro **B18**, B6, D-P14; `ricerca-psicologia-aderenza.md` §3.2, CST-07, CST-08; `ricerca-metodi-coach-pratici.md` H-12, PCO-03; `ricerca-mesocicli-periodizzazione-scarichi.md` §3.3 (rampa e arrotondamenti); `ricerca-recupero-infortuni-popolazioni.md` §5.2; `ricerca-principianti-12-settimane.md` §3.7, PRI-07; `ricerca-fasce-di-eta.md` ETA-05.
- File: `js/coach/volume/autoregolazione.js` (nuovo: fase 'carico' 40, `decidiVolumeSettimana()`), `js/coach/volume/soglie-autoregolazione.js` (nuovo), `js/coach/prontezza.js` (voci sonno, stress, dolenzia, energia 0-8 non pesate; «voglia» a parte; facoltativa «Quali muscoli sono ancora indolenziti?» con le unità di oggi; per i minori sonno < 8 h = scarso, ETA-05), `tests/autoregolazione.test.js`.
- Cosa: serie della settimana = serie base × fattore della rampa MES-03 (letto dal piano di W2-T4) + delta per unità; delta +1 (PCO-03) solo se valgono anche le condizioni di CST-08: nelle ultime 2 sedute dell'unità serie tutte fatte, RPE ≥ 1 sotto il bersaglio, prontezza ≥ 70 e nessuna dolenzia; −1 se dolenzia forte prima dell'unità in 2 delle ultime 3 sedute o massimale in calo oltre il 3%; sempre tra pavimento e tetto della tabella VOLUME_UNITA (registro B6) e sotto il tetto per seduta (B7); nessun «+1» dalla prontezza del giorno; messaggio del lunedì con Annulla.
- Accettazione: programmi v1 invariati; prove su storici sintetici per i tre esiti; mai +1 ai principianti (PRI-07), a prudenti, in deficit con prontezza < 70; 0 settimane sopra il tetto dell'unità o sotto il pavimento (collaudo VOL-01/VOL-02 restano ai valori di INT-2); prontezza «tutto normale» non aggiunge serie (prova del caso B18).

**W3-T5 · Scarichi e controlli periodici · Sonnet · M** — MES-05 (dose e testo; assorbe CAR-03; corregge N6), MES-07 (scarico reattivo unico: sostituisce come cause DEC-06, PRZ-04, STR-01, CAR-10), MES-08 (parte della dose; «Dura» già in W0-T5), MES-10 (completamento: scarico fuori da STA-01, CAR-08, STR-01), MES-13 (passaggio di blocco), MES-14 (rotazione al confine del blocco: assorbe STA-03, PCO-05), MES-19 (scala degli stalli con diagnosi F/S/T, registro B16), ALG-12 (stallo per tendenza: `valutaCaloEsercizio`), CST-09, STD-01 (criteri di passaggio G1-G5, ex PRI-13), PRN-14 (sblocco del bilanciere, proposta annullabile), PRN-19 (primo mese elastico); CAR-08, DEC-05, STA-01..02, CIC-01 riscritte; B9 (scala 0-10), B23 (dosi)
- Leggere prima: registro **B16**, **B17** (scarico reattivo), B4 (controllo all'8ª settimana dei principianti); `ricerca-mesocicli-periodizzazione-scarichi.md` §3.6-3.10, §4, §5, §6 (MES-05, 07, 08, 10, 13, 14, 19; bug N6); `ricerca-algoritmi-carichi-e-app.md` §3.11-3.12, ALG-12; `ricerca-psicologia-aderenza.md` §3.5, CST-09; `ricerca-principianti-12-settimane.md` §3.8 (G1-G5), PRI-13, PRI-14, PRI-19; `ricerca-forza-progressione.md` §3.6-3.7.
- File: `js/coach/sicurezza/scarico.js` (`DOSE_SCARICO` unica per pianificato e reattivo, con le dosi di **MES-05**: fatica 'bassa' serie ×0,65 e carico ×0,95, 'media' ×0,50 e ×0,90, 'alta' ×0,40 e ×0,90; minimo 2 serie per gli esercizi da ≥ 3; esercizi da 2 serie: si tolgono gli isolamenti finali, 1 ogni 3; RIR mostrato ≥ 3-4 / ≥ 4 / ≥ 5; 'alta' solo con prontezza < 50 o sRPE medio ≥ 9,5; prudenti e over 65: 'media'; `segnaliFatica()` → `scaricoReattivo()` di MES-07 con le protezioni di distanza; controllo dell'8ª settimana dei principianti, B4), `js/coach/sicurezza/soglie-scarico.js` (nuovo), `js/coach/questionario-decisioni.js` (sRPE 0-10 a cursore senza valore iniziale), `js/coach/repertorio.js` (strain con i minuti di cardio; `eserciziFermi` e verdetto col migliore di due sedute, soglia 3%, scarichi esclusi; `valutaCaloEsercizio(nome)` di ALG-12, letta da W3-T1 con `typeof`; diagnosi MES-19; rotazione MES-14; carry-over MES-13 in `nuovoCiclo`; ADE-01 elastico nelle settimane 1-4 dei principianti, PRN-19; proposta del bilanciere PRN-14; stanchezza persistente 14 giorni → riposo e rinvio al medico, CST-09), `js/coach/esigenza.js` (ESI-02 non penalizza i principianti nelle settimane 1-4, PRN-19; in scarico l'esigenza non cambia, MES-10), `tests/scarichi.test.js`.
- Accettazione: una sola tabella di dose usata da tutti (prova con `grep` nel test); per esercizi da 3-6 serie le dosi 'media' e 'alta' danno serie diverse almeno da 4 serie in su e un esercizio da 2 serie viene davvero alleggerito (N6 chiuso); mai scarico reattivo da un solo segnale, nelle prime 2 settimane del blocco o entro 14 giorni dall'ultimo (prove per ogni protezione); testo dello scarico senza «ripartire più forte»; principianti: nessuna penalità di aderenza nelle settimane 1-4; 0 rotazioni di fondamentali o di esercizi graditi; cap. 17 n. 3 della mappa chiuso per gli scarichi.

**W3-T6 · Specialista Forza: carichi · Sonnet, revisione Opus · M** — FRZ-06..10 (l'onda della modalità Forza assorbe MES-04), TAP-01 (= MES-18) **bloccata e spenta** (registro C.2 n. 15, D-P4): si scrive solo l'interruttore con «(bloccata)», nessun numero di taper
- Leggere prima: registro A.2 (onda di carico), C.2 n. 15, D-P4; `ricerca-forza-progressione.md` §2, §3.6-3.9, App. A; `ricerca-mesocicli-periodizzazione-scarichi.md` MES-04, MES-18; `ricerca-metodi-avanzati-intensita.md` MAV-06 (niente AMRAP sugli stacchi); `ricerca-algoritmi-carichi-e-app.md` §3 (aggancio a `modelloProgressione` di W3-T1).
- File: `js/coach/specialita/forza-carichi.js` (nuovo: `modelloForza(nome, brief, storia)`), `js/coach/specialita/soglie-forza-carichi.js` (nuovo), `tests/forza-carichi.test.js`.
- Cosa: massimale di lavoro = 90% dell'e1RM; onda di 3 settimane + scarico con percentuali e tetto di RPE; AMRAP di appoggio sull'ultima serie (mai sugli stacchi, MAV-06) che aggiorna il massimale di lavoro (+2,5 kg alto / +5 kg basso, fermo o −10%); settimana di test con 5RM o e1RM solo per avanzati (STD-02); taper TAP-01 bloccato: `regolaAttiva('TAP-01')` resta false finché la sessione di ricerca R-1 non lo sblocca (registro G).
- Accettazione: atleta virtuale powerlifting (`tests/aiuto-atleta.js` di W2-T8, già unito in onda 2): nessuna serie sopra la capacità a RPE 9; massimale di lavoro che segue la capacità entro ±5% in 12 settimane; 0 AMRAP sugli stacchi; TAP-01 mai attivo (prova).

**INT-3**: cancello: atleta virtuale (D.8 punto 9 rifatto con la bilancia v2 e lo scarico di W3-T5; W3-T6 per la modalità Forza); 0 carichi fuori griglia; golden v1 con sole differenze elencate; collaudo sulla matrice standard non peggiore di INT-2 su nessun criterio (prima = `base`, registro E), con RIR-01..03 e DEL-01 = 0; regole bloccate ancora spente (cancello E.0 punto 0).

### E.5 Onda 4 — sicurezza, recupero, popolazioni

Tutti in parallelo.

**W4-T1 · Modifica, non escludere · Sonnet, revisione Opus · L** — REC-01..05, REC-04 (assorbe SEL-10), REC-07 parte a (voce «sto male»: proposta di riposo annullabile), REC-08, REC-09 parte a (solo la frase «la dolenzia è normale e non misura i progressi»), SEL-11; DEC-01..04, DOL-01, BIO-02, BIO-06, PRG-07 riscritte. **Non qui**: PCO-08 (cuffia, spostata in W2-T6), REC-06 a (già in W0-T5), REC-07 b e REC-09 b (**bloccate**, registro C.2)
- Leggere prima: registro **C** (criterio, elenco, cancello), A.3 famiglia REC; `ricerca-recupero-infortuni-popolazioni.md` §3 (zone), §5.1, §5.4, §6, §7, REC-01..09; `ricerca-biomeccanica-esercizi.md` SEL-10, SEL-11; `ricerca-riscaldamento-mobilita-prevenzione.md` §5; `ricerca-fasce-di-eta.md` §3.3.
- File: `js/coach/sicurezza/fastidi.js` (nuovo: `livelloFastidio`, `consenteEsercizio(nome, brief)` → `{ ok, modifica, alternativa, motivo }`, matrice per 8 zone da ricerca-recupero §3 e dagli attributi `stress` di W1-T2), `js/coach/sicurezza/soglie-fastidi.js` (nuovo), `js/coach/programma/motore.js` (`consentito` delega), `js/coach/questionario-decisioni.js` (domande d'allarme REC-01, gradini), `js/coach/dolore-mattina.js` (controllo del mattino per ogni livello e gradino, REC-02; rientro a 4 fasi, REC-08), `js/coach/biomeccanica.js` (`SCALE_DOLORE` → fastidi.js), `js/ui/onboarding.js` (8 zone e 4 domande per zona, REC-03/04), `js/coach/prontezza.js` (dolore di oggi e «sto male», REC-05/07 a), `tests/fastidi.test.js`.
- Accettazione: collaudo SAF-01 resta 0 (da W0-T5; prima 15,3% + 6,9%); SAF-02 al 100% con nota di modifica (prima: schiena 16,1%, ginocchia 14,5%, spalle 10,7% senza nota); SAF-06 resta 0 (da W2-T6; prima 10,5%); MOD-02 «ok» (prima «manca»), MOD-01 e MOD-03 restano «ok»; per ogni zona verde/gialla ogni unità ha almeno un esercizio; ogni segnale rosso porta il testo «Non sono un medico e non faccio diagnosi» e il rinvio; nessun testo delle parti bloccate (REC-07 b, REC-09 b) nel codice né nei dizionari (prova con `grep` nel test).

**W4-T2 · Popolazioni e rientro · Sonnet, revisione Opus · M** (ristretto: registro F.2 punto 5) — CST-01 (assorbe MES-15), CST-02, CAR-04 riscritta, RIC-05 riscritta, ALG-14 (risalita), REC-12 parte a (bandiera gravidanza o post-parto), ETA-08 parte a (over 65 dopo la base), DCA-01 (aggiunge ≥ 65 senza deficit automatico, ex ETA-15). **Non qui, perché bloccate** (registro C.2; cancello E.0 punto 0): REC-06 b (pressione alta), REC-07 b, REC-09 b, REC-12 b (= DON-12), DON-13 (ex «REC-14»), ETA-08 b, ETA-11..13, ETA-17. Già altrove: minori (ETA-01..04, ex REC-11) in W0-T2/W0-T4; aumenti dimezzati ≥ 65 (ETA-18) in W0-T4; sovrappeso (PRN-15, ex «REC-15») in W2-T6
- Leggere prima: registro **C** (tutto), **B10**, **B20**, D-P9, D-P18; `ricerca-recupero-infortuni-popolazioni.md` §4 (popolazioni), §5.3 (rampe di rientro), REC-06, REC-12; `ricerca-fasce-di-eta.md` §3.1-3.3, §6, ETA-08, ETA-15, ETA-18; `ricerca-psicologia-aderenza.md` §3.1, CST-01, CST-02; `ricerca-mesocicli-periodizzazione-scarichi.md` MES-15; `ricerca-algoritmi-carichi-e-app.md` ALG-14; `ricerca-cardio-nutrizione.md` DCA-01.
- File: `js/coach/sicurezza/popolazioni.js` (nuovo: `vincoliPopolazione(brief)`, `pianoRientro()`, fase 'carico' 90), `js/coach/sicurezza/vincoli.js`, `js/coach/sicurezza/soglie-popolazioni.js` (nuovo), `js/coach/regole-nuove.js`, `js/coach/regole-ricerca.js`, `js/ui/opzioni/il-coach.js` (bandiera gravidanza o post-parto; lavoro seduto per RIS-10; **nessun** campo «pressione alta»), `tests/popolazioni.test.js`.
- Cosa: over 65 (ETA-08 a, registro B10: base di 8 settimane con RIR 3-4, 8-12 ripetizioni e aumenti dimezzati; poi, con ≥ 70% delle sedute fatte e nessun dolore recente, RIR 2-3 **solo** sulle classi C e D, ripetizioni 8-12, aumenti normali; «potenza» solo su macchina o alzata dalla sedia; mai cedimento né tecniche); gravidanza e post-parto (REC-12 a: bandiera separata nel PAR-Q, messaggio fisso «parla con ostetrica o medico», modalità prudente, niente tecniche, niente deficit; **nessun** esercizio da evitare né rampa del post-parto, che sono bloccati); rientro unico (registro B20: CST-01 congela il calendario con le soglie di MES-15, ≤ 6 / 7-13 / 14-27 / ≥ 28 giorni; CAR-04 −10/−20/−30/−50% con giorni doppi oltre i 65; CST-02 serie −25%, −10%, poi piano e +1 RIR per 2 sedute; ALG-14 risale del 5% a seduta, 2,5% per principianti e over 65; «Sto bene: come da piano»); guardia su deficit e peso per minorenni, IMC < 18,5 («Convenzione»), gravidanza e over 65 (DCA-01).
- Accettazione: prove per popolazione e per ogni soglia del rientro; collaudo SAF-05 resta 0 (da W2-T6; prima 20,4% principianti, 11,9% prudenti); over 65: 0 serie a RIR < 3 nelle prime 8 settimane e 0 serie a RIR < 2 dopo, 0 pesi liberi a RIR 2; la matrice completa (sesso × età) senza nuove violazioni; nessun testo delle regole bloccate nel codice né nei dizionari (prova con `grep` nel test).

**W4-T3 · Riscaldamento e mobilità · Sonnet · M** — RIS-01..13 (RIS-01 assorbe REC-10; RIS-03 assorbe PCO-10; RIS-08 assorbe ETA-06 ed ETA-16, **senza** la frase «i tendini vogliono più riscaldamento», che è [CM]); il costo in minuti è già nel modello dei tempi di W2-T2 (registro B11): qui si scrive la rampa vera e la si fa leggere a `tempo.js` dalle stesse soglie
- Leggere prima: registro **B11**, A.2 (riscaldamento); `ricerca-riscaldamento-mobilita-prevenzione.md` §2, §3 (tutto, esempi §3.10), §4 (blocchi di mobilità, M6 per il lavoro seduto), §5, §7; `ricerca-fasce-di-eta.md` §3.2, ETA-06, ETA-16; `ricerca-metodi-coach-pratici.md` PCO-10; `ricerca-recupero-infortuni-popolazioni.md` §1.2, REC-10.
- File: `js/coach/tecnica/riscaldamento.js` (nuovo: `rampaRiscaldamento`, `riscaldamentoGenerale`, `bloccoMobilita`; fase 'apertura' 30), `js/coach/tecnica/soglie-riscaldamento.js` (nuovo), `js/ui/allenamento/seduta.js` (righe di rampa automatiche con «Salta»; `addWarmup` usa la rampa), `js/coach/volume/tempo.js` (legge le stesse soglie), `tests/riscaldamento.test.js`.
- Accettazione: gli esempi di ricerca-riscaldamento §3.10 riprodotti esatti; tetto di tempo 5/8/10 minuti; nessuna rampa sugli isolamenti dopo un multiarticolare dello stesso gruppo; collaudo DUR-01 e DUR-02 restano ai valori di INT-2 (0 e ≤ 3%; prima 5,9% e 82,8%) con la rampa vera al posto della stima; MOD-08 resta «ok».

**INT-4**: cancello sulla matrice **completa** (64.800 profili; prima = `base`, registro E): SAF-01, SAF-03..06 = 0 e SAF-02 = 0 senza nota di modifica (prima, sottoclasse peggiore: SAF-01 15,3%, SAF-02 16,1%, SAF-03 0, SAF-04 20,4%, SAF-05 20,4%, SAF-06 10,5%); MOD-01..12 «ok» o «info»; `gravi_pesata` ≤ 0,5% (target G); nessun criterio peggiore di INT-3; regole bloccate ancora spente (E.0 punto 0); matrice completa senza errori del generatore.

### E.6 Onda 5 — mente, corpo, interfaccia, traduzioni

Tutti in parallelo (W5-T5 usa l'aggancio di W5-T2 in `oggi.js`: `htmlAggiornaCoach()` se definita).

**W5-T1 · Perché e squadra in vista · Sonnet · M** — REG-03 (interfaccia; assorbe ALG-16: il foglio mostra il «perché questo peso» con il numero, testo scritto da W3-T1), SEL-12, OBI-18 (Convenzione), EST-02 (interfaccia: massimo 2 unità prioritarie tra le unità fini, D-P17); etichetta di forza della regola (Solida/Moderata/Convenzione/Decisione/Provvisoria, da `etichettaForza` di W1-T1) nel foglio «Perché?»
- Leggere prima: registro **C.4** (numeri «Convenzione» con etichetta visibile), D-P17, A.3 (ALG-16, SPE-01); questo piano B.5; `ricerca-algoritmi-carichi-e-app.md` §5 (funzioni amate e odiate), ALG-16; `ricerca-biomeccanica-esercizi.md` SEL-12; `ricerca-obiettivi-e-programmi.md` OBI-18; `ricerca-specializzazione-punti-deboli.md` §5.1, SPE-01.
- File: `js/coach/agente-consigli.js`, `js/ui/opzioni/il-coach.js` (squadra, interruttori per sotto-coach, muscoli prioritari fini max 2), `js/ui/onboarding-risultato.js`, `js/ui/allenamento/seduta.js` (etichette e foglio «Perché?»), `js/coach/biomeccanica.js` (cue specifico + cue di schema, SEL-12), `css/componenti-coach.css`, `tests/browser/squadra.js` (nuovo).
- Accettazione: ogni nota di esercizio con almeno un perché e un'etichetta; il foglio «Perché?» mostra codice, sotto-coach, testo ed etichetta di forza; ogni numero dell'elenco C.4 del registro mostra «Convenzione»; mai più di 2 unità prioritarie selezionabili; a 360×640 nessuno sbordo; nessuna frase senza traduzione (`controlla-traduzioni.js` sui testi della prova).

**W5-T2 · Il Motivatore: costanza e scelte · Sonnet · M** — CST-03..05, CST-04 (una sola lista di parole vietate: assorbe DON-15, SPE-14 per il lessico, DCA-02 per le frasi sul corpo), CST-06 (primo mese; assorbe PRI-10), CST-10 (rinvio generico), CST-12, PSI-11 (domande riproposte a ogni nuovo ciclo), PSI-12 (gradimento per esercizio dopo la seduta → graditi/odiati), ADE-01 → CST-12 (le settimane 1-4 dei principianti restano elastiche come in W3-T5, PRN-19)
- Leggere prima: registro A.2 (lessico), A.3 famiglia CST; `ricerca-psicologia-aderenza.md` §1.6, §3.1, §3.3 (lista delle parole), §3.4, §3.6, §5 (CST-03..06, CST-10, CST-12); `ricerca-donne-carichi-iniziali.md` DON-15; `ricerca-specializzazione-punti-deboli.md` SPE-14; `ricerca-cardio-nutrizione.md` DCA-02; `ricerca-principianti-12-settimane.md` §1.12, PRI-10.
- File: `js/coach/mente/costanza.js` (nuovo), `js/coach/mente/soglie-mente.js` (nuovo), `js/coach/psicologia.js`, `js/coach/stato.js`, `js/ui/oggi.js`, `js/ui/sessione-completata.js` (gradimento per esercizio a fine seduta, PSI-12; il contatore del primo mese di CST-06 resta in `htmlPrimiPassi` di `psicologia.js`), `js/coach/programma/alternative.js` (punti di scelta: 1 su 2 per 2-3 posti per seduta), `tests/costanza.test.js`.
- Accettazione: nessuna parola vietata (lista di ricerca-psicologia §3.3, più DON-15, SPE-14, DCA-02) nei testi del coach e nei tre dizionari (prova sul codice); settimana minima senza cambiare i carichi; serie «N settimane attive su 12»; nessun invito di ADE-01 a un principiante nelle settimane 1-4.

**W5-T3 · Il Preparatore · Sonnet · M** — AER-01 (con la riga principiante, ex PRI-18), AER-02..04 (AER-04: circa 7.000 passi per la salute; numeri del dimagrimento «Convenzione»), NUT-01 (1,6 g/kg, 2,0-2,4 in deficit; assorbe COR-03; **nessun numero** sotto i 18, oltre i 65, in gravidanza, con malattie renali o metaboliche: registro B21, ETA-15), NUT-02, PES-01..04, DCA-02, DCA-03 parte a (togliere la frase «sotto il 17% di grasso»), CST-11 (salvaguardie sul peso), ETA-04 (niente creatina, grammi, deficit, giudizi BIA ai minori: completamento sul peso), OBI-05, OBI-06, OBI-08, OBI-11; COR-01, COR-02, BIA-02, MET-03, PRO-04 riscritte; PRG-26 ritirata; B23 (grasso, massa magra). **Non qui**: OBI-09 (rinviata, D-P18), OBI-17 e DCA-03 b (= DON-14) (**bloccate**, registro C.2)
- Leggere prima: registro **B21**, C (DCA-03 b, OBI-17), D-P18; `ricerca-cardio-nutrizione.md` §1, §2, §3 (tutto), §4, §5; `ricerca-obiettivi-e-programmi.md` §1.1-1.3, §3.2, §5.5, OBI-05..11; `ricerca-psicologia-aderenza.md` CST-11; `ricerca-fasce-di-eta.md` ETA-04, ETA-15; `ricerca-principianti-12-settimane.md` §1.14, PRI-18.
- File: `js/coach/corpo/cardio.js` (nuovo: `pianoCardio`, `minutiCardioSettimana`, collocazione), `js/coach/corpo/peso.js` (nuovo: `tendenzaPeso`), `js/coach/corpo/soglie-corpo.js` (nuovo), `js/coach/repertorio.js` (`corpoCoach`, mantenimento a fine ciclo OBI-11), `js/coach/compone.js` (`fattoreFisico` solo prudenza, una soglia di grasso alto), `js/coach/bia/lettore.js` (categorie descrittive separate dalle soglie decisionali; domande di contesto PES-02; via la frase del 17%, DCA-03 a), `js/coach/carichi/progressivo.js` (`frenoBia` con conferma, PES-03), `js/ui/progressi/peso.js` (peso obiettivo: sotto IMC 18,5 niente data di arrivo né consigli di calo, CST-11; nulla per i minori, ETA-04), `js/ui/allenamento/termina-e-cardio.js` (minuti di cardio letti da `minutiCardioSettimana`, AER-01), `tests/preparatore.test.js`.
- Accettazione: cap. 17 n. 3 della mappa chiuso (una soglia per concetto); nessuna caloria prescritta; nessun numero (proteine, calorie, ritmo di calo) per minorenni, over 65, gravidanza, patologie (prova per ognuno); nessun testo delle parti bloccate (OBI-17, DCA-03 b) nel codice né nei dizionari; numeri «Convenzione» con l'etichetta visibile (registro C.4).

**W5-T4 · Specialista Estetica · Sonnet · M** — EST-01 (proposta di priorità dai dati, mai automatica; ex SPE-11, SPE-12), EST-03 (chi può specializzare, ex SPE-03; nessuna specializzazione con segnali di insoddisfazione, ex SPE-14), EST-05 (dose, rampa, tetto per seduta dell'unità prioritaria: duro 8, 6 per deltoidi, braccia, polpacci, addome; ex SPE-04, SPE-06, IPE-13, MES-16), EST-06 (mantenimento degli altri, durata, uscita; ex SPE-05, SPE-08; riscrive CIC-02), MAV-15. La parte di volume di EST-02/03/05/06 è già in W2-T1, l'interfaccia di EST-02 in W5-T1, EST-04 in W2-T6. Rinviate: SPE-13, SPE-15 (D-P18)
- Leggere prima: registro **B19**, B6 (fasce), B7 (tetto 8/6), D-P17; `ricerca-specializzazione-punti-deboli.md` §1, §2, §4, §5 (tutto), §8 (SPE-03..14); `ricerca-mesocicli-periodizzazione-scarichi.md` §1.7, MES-16; `ricerca-metodi-avanzati-intensita.md` MAV-15; `ricerca-psicologia-aderenza.md` §3.3 (lessico).
- File: `js/coach/specialita/estetica.js` (nuovo: `SPEC_ESTETICA`, `puntiDeboli()`), `js/coach/specialita/soglie-estetica.js` (nuovo), `tests/estetica.test.js`.
- Cosa: indice di progresso per unità (mediana della variazione di e1RM degli esercizi dell'unità ogni 4 settimane, scarichi esclusi) contro la mediana dell'utente; ultimo quarto per 2 blocchi e non prioritario → proposta «Priorità: <muscolo>» (un tocco, annullabile); specializzazione a blocchi di 4-8 settimane (6 di base), massimo 2 blocchi di fila sullo stesso muscolo, poi almeno 4 settimane standard; altri muscoli a `max(mantenimento della tabella B6, 50% del picco standard)` con carico e RIR invariati (registro B19); tecniche nella specializzazione (MAV-15).
- Accettazione: nessuna proposta con meno di 2 blocchi di dati, mai in deficit per gli avanzati; mai più di 2 unità prioritarie; nessun altro muscolo sotto il mantenimento B6; nell'unità prioritaria mai oltre 8 serie frazionarie per seduta (6 per i muscoli piccoli; registro B7), negli altri il tetto generale; prove con storici sintetici.

**W5-T5 · Aggiornamento al coach nuovo · Sonnet · S** — REG-04, REG-06; D-P5
- Leggere prima: registro **D-P5**, D-P18; questo piano F.1 (punto 4, chiavi), F.3; `ricerca-psicologia-aderenza.md` §1.3 (autonomia).
- File: `js/coach/regia/migrazione.js` (nuovo: `htmlAggiornaCoach`, `aggiornaAlCoachNuovo`), `tests/migrazione.test.js`.
- Cosa: per un programma senza `versione`: scheda in Oggi («Il coach ha imparato cose nuove: vuoi rifare il programma con le stesse preferenze?»), una volta per ciclo; fotografia delle chiavi `coach_plus_*` della modalità, nuovo programma da lunedì, Annulla che ripristina tutto. Regola D-P5: mai cambiare in silenzio; le correzioni di sicurezza e di calcolo della seduta (già attive dalle onde 0-4) compaiono come una riga nel «perché» e, se cambiano un esercizio, come proposta con Annulla all'apertura della seduta; quelle di struttura (giorni, esercizi, scarichi, durata) solo con questa scheda o al prossimo ciclo.
- Accettazione: 6/6 fixture v1: scheda visibile una volta, aggiornamento riuscito, annulla = archivio identico byte per byte; nessun programma v1 con giorni, esercizi o settimane di scarico cambiati senza la scheda (prova sulle 6 fixture); nessuna chiave nuova di `localStorage`.

**INT-5**: cancello: tutte le frasi del campione (≥ 500 testi generati sulla matrice) tradotte; `tests/browser/` tutti verdi (salvo `intensita-bia.js`, che fallisce già da prima, finché non lo si ripara); collaudo sulla matrice completa non peggiore di INT-4 su nessun criterio; 0 parole vietate (CST-04) nel campione; regole bloccate ancora spente (E.0 punto 0).

### E.7 Revisione finale

**F-1 · Revisione completa · Opus · M**: legge prima il registro `docs/coach-v2-decisioni.md` per intero (le decisioni B e D sono il metro della revisione; la tabella E dà il «prima» di ogni criterio); collaudo sulla matrice completa (64.800 profili) contro la tabella G e contro la colonna «Fatto» del registro E; controllo che ogni regola **bloccata** del registro C.2 sia ancora spenta o sbloccata con una fonte vista (sessione R-1, registro G); lettura «da coach» di 30 programmi (rubrica di INT); revisione del diff da `coach-v2-onda-0` contro gli invarianti F; documenti: mappa delle regole (tutti i capitoli coerenti, cap. 17 svuotato o aggiornato), `mappa-per-agenti.md` (sezione «Sotto-coach → file»), `ARCHITETTURA.md`, `PIANO.md` (fase 6 fatta), `CLAUDE.md`, le due skill; elenco del codice morto per F-2; decisione sul riordino fisico dei file vecchi (B.4).
**F-2 · Pulizia · Sonnet · S**: toglie i rami legacy ormai inutili (`assegnaVolumeGruppi`, tabelle regex sostituite dagli attributi, html di SAL/ADE non più chiamati), solo dopo che G è verde; rigenera tutto.

### E.8 Proprietà dei file che passano tra onde

| File | O0 | O1 | O2 (2a / 2b) | O3 | O4 | O5 |
|---|---|---|---|---|---|---|
| `js/coach/programma/ricette.js` | T2 | T4 | — / T6 | — | — | — |
| `js/ui/onboarding.js` | T2 | T4 | — / T5 | — | T1 | — |
| `js/coach/regole-ricerca.js` | T4 | T3 | T3 / — | T1 | T2 | — |
| `js/coach/regole-nuove.js` | — | T3 | T3 / — | — | T2 | — |
| `js/coach/intensita.js` | T4 | T3 | T1 / T8 | — | — | — |
| `js/coach/esigenza.js` | T4 | — | T1 / T8 | T5 | — | — |
| `js/coach/prontezza.js` | T4 | T3 | — | T4 | T1 | — |
| `js/coach/questionario-decisioni.js` | T5 | T3 | — | T5 | T1 | — |
| `js/coach/dolore-mattina.js` | T3 | T3 | — | — | T1 | — |
| `js/coach/repertorio.js` | T4 | — | — | T5 | — | T3 |
| `js/coach/programma/motore.js` | T5 | T4 | — / T6 | — | T1 | — |
| `js/coach/programma/schemi.js` | T6 | — | — / T6 | — | — | — |
| `js/coach/programma/completamenti.js` | — | T4 | — / T6 | — | — | — |
| `js/coach/programma/mesociclo.js` | — | T4 | T4 / — | — | — | — |
| `js/coach/programma/alternative.js` | — | — | T4 / — | — | — | T2 |
| `js/coach/regia/genera.js` | — | T4 | — / T5 | — | — | — |
| `js/coach/biomeccanica.js` | T5 | — | — | — | T1 | T1 |
| `js/coach/compone.js` | T2 | — | — / T5 | — | — | T3 |
| `js/coach/metodi-momenti.js` | T2 | — | T2 / — | — | — | — |
| `js/coach/carichi/progressivo.js` | T3 | — | — | T1 | — | T3 |
| `js/coach/carichi/partenza.js` | — | T4 | — / T8 | — | — | — |
| `js/coach/carichi/e1rm.js` | — | T3 | — | T1 | — | — |
| `js/coach/carichi/taratura.js` | — | T3 | — | T3 | — | — |
| `js/coach/sicurezza/scarico.js` | — | T3 | — | T5 | — | — |
| `js/coach/sicurezza/vincoli.js` | — | T4 | — | — | T2 | — |
| `js/coach/volume/volume.js` | — | T4 | T1 / — | — | — | — |
| `js/coach/volume/tecniche.js` | — | T4 | T3 / — | — | — | — |
| `js/coach/volume/tempo.js` | — | T4 | T2 / — | — | T3 | — |
| `js/coach/volume/serie-ripetizioni.js` | — | T4 | T2 / — | T1 | — | — |
| `js/ui/allenamento/seduta.js` | — | T3 | — | T3 | T3 | T1 |
| `js/ui/allenamento/termina-e-cardio.js` | T3 | — | — | — | — | T3 |
| `js/ui/oggi.js` | — | — | T2 / — | — | — | T2 |
| `js/ui/opzioni/il-coach.js` | T2 | — | — / T5 | T1 | T2 | T1 |
| `js/dati/libreria-esercizi.js`, `js/dati/dettagli-esercizi.js`, `tests/muscoli.test.js` | T6 | T5 | — | — | — | — |
| `js/dati/attributi-esercizi.js` | — | T2→T5 | — | — | — | — |

In ogni onda (e sotto-onda 2a/2b) nessun file compare in due task (controllo rifatto sugli elenchi «File» dopo il riordino del registro F.2; unica eccezione dichiarata: `attributi-esercizi.js` passa da W1-T2 a W1-T5 in sequenza). I file nuovi di un solo task non sono elencati.

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
| Partenza troppo bassa che scoraggia | W2-T8 (ex W3-T2) | calibrazione CAR-18 con la tabella dei salti (registro B1), tocco a 3 scelte per i principianti (W3-T3, D-P16), testo che lo spiega, promemoria dell'RPE |
| Una regola bloccata finisce nel codice | tutte | cancello E.0 punto 0: `regolaAttiva` sempre false per le «(bloccata)», prova con `grep` dei loro testi nei dizionari a ogni INT; si sbloccano solo dopo la sessione R-1 (registro G.4) |
| Il collaudo misura sé stesso (criteri scritti dallo stesso modello) | INT | soglie cambiate solo in INT con motivo e `VERSIONE_CRITERI`; «prima» fisso all'etichetta `base`; lettura «da coach» di 20-30 programmi (registro G.5) |
| Prestazioni (solutori con cicli) | W2 | cicli limitati; collaudo misura il tempo: mediana < 50 ms per programma |
| Prove in browser che non girano (catena ferma a `intensita-bia.js`) | W0 | W0-T1 le fa girare tutte |
| Grafo non rigenerabile senza rete | INT | regola della skill: niente modifiche a mano, scriverlo nel commit |

### F.3 Programmi già salvati sui telefoni
- **Campi nuovi, tutti facoltativi**: programma (`versione`, `piano`, `volume`, `perche`, `modalita`, `cardio`), voci del piano (`slot`, `ripRange`, `partenzaBassa`, `perche`), sedute (`settimana`, `obiettivo`), aggiusti (`volumeUnita`, `rientro`, `calibrazione`, `fastidi`), profilo (`modalita`, `prioritaUnita`, `passiPalestra`, attrezzi di casa e palestra di W2-T5, `gravidanza`, `lavoroSeduto`, `fastidiDettaglio`; **nessun** `pressioneAlta`: REC-06 b è bloccata). Chi legge usa un valore di base se manca.
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

Misure sulla **matrice completa** del collaudo (64.800 profili, pesi della popolazione) e sulle prove; valori da raggiungere in F-1. Tra parentesi il **prima** (etichetta `base`, commit `0e71714`, sottoclasse peggiore pesata; tabella completa nel registro E). Ogni numero di soglia che il registro C.4 chiama «Convenzione» esce nell'app con l'etichetta visibile.

| Area | Bersaglio |
|---|---|
| Robustezza | collaudo ERR-01 = 0, SAN-01 = 0 (già 0); `gravi_pesata` ≤ 0,5% (prima 35,8%; 69,4% dei programmi non pesati con almeno un fallimento grave; 12,8 fallimenti per programma) |
| Volume (tabella `VOLUME_UNITA`, registro B6) | MIS-01 = 0 (prima 5,9%); VOL-01 ≤ 2% pesato e 100% con nota della causa; 0 in palestra con ≥ 45 min e ≥ 3 giorni (prima femorali 57,4%, 6.233 programmi; petto 26,0%); VOL-02 = 0 oltre +10% (prima glutei 35,0%); SES-01 = 0 (prima 6,6%); DIR-01 = 0 (intermedio/avanzato, ipertrofia, ≥ 3 giorni, ≥ 45 min; prima 18,9-23,1%); collaudo PRI-01 = 0 (prima 6,2%); femorali ≥ 0,6 dei quadricipiti (collaudo EQ-03; prima 38,2%); nessun muscolo sotto 4 serie frazionarie senza nota |
| Frequenza, split e calendario | FRQ-01 = 0 salvo frequenza 1 scelta (prima femorali in una sola seduta 31,4%, 4.347 programmi); FRQ-02 ≤ 5% (prima 15,5%); collaudo REC-01..03 = 0 (prima spalle 13,4%, 1.414; 6 giorni di fila 7,3%, 1.754; lombari 3,9%); SPL-01 = 0 senza nota (prima 6,7%, 777); SPL-02, EQ-01..03, PAT-01, ORD-01..04, SS-01/02 = 0 gravi; SES-03 = 0 (prima lower senza hinge 22,4%, 3.993); RID-01/02 ≤ 5% (prima 23,4% e 13,8%) |
| Tempo (il tempo è un tetto: D-P10, registro B12) | DUR-01 = 0, nessuna seduta oltre +10% (prima 5,9%, 862 programmi); DUR-02 nella **definizione v2** (spreco solo se un'unità è sotto la sua fascia e la seduta usa < 75% dei minuti; principianti esclusi entro la loro durata massima) ≤ 3% (prima, definizione v1: 82,8%, 8.660 programmi); mediana dello scarto tra durata stimata e minuti dichiarati ≤ 7% **tra le sedute che hanno ancora unità sotto fascia**; EXN-01/02 = 0 (prima 2,4% e 13,8%) |
| Sforzo e tecniche | TEC-01 = 0 (prima 14,1%, 1.949 programmi con drop ai principianti); RIR-01 = 0 (prima 40,0%: intermedi senza rampa); RIR-02 = 0 (prima 11,7%: RIR 0 sullo squat); RIR-03 = 0 (prima 35,9% e 31,6%: settimana 1 troppo dura); DEL-01 = 0 nei criteri aggiornati (12 settimane per i principianti); RX-01/02 = 0 (prima fino a 3,5% e 2,8%: 5×5 su goblet e squat a corpo libero, 827; pause di 158 s, 790); 0 violazioni della matrice di idoneità (MAV) e del budget |
| Sicurezza | SAF-01 = 0 (prima 15,3%, 3.600 con Pike Push-up; 6,9% con Front Squat); SAF-02 100% con nota di modifica (prima 16,1% senza); SAF-03 = 0 (già 0); SAF-04 = 0 (prima 20,4%: trazioni a casa con soli manubri); SAF-05 = 0 (prima 20,4%); SAF-06 = 0 (prima 10,5%); MOD-01..12 «ok» o «info» (prima: etichette di controindicazione per zona, intervalli di ripetizioni, zone di dolore «manca»; `schemeFor.settimane` mai letta); 0 testi delle regole bloccate (registro C.2) |
| Forza | GOA-01 = 0 (prima 9,5%, 2.300 programmi); profili powerlifting: squat ≥ 2×, panca ≥ 2×, stacco ≥ 1× a settimana |
| Carichi (atleta virtuale, ≥ 500 per gruppo) | 0 carichi fuori dalla griglia dell'attrezzo; 0 prescrizioni sopra la capacità al RIR bersaglio − 1; convergenza entro ±10% (D.8 punto 9): mediana ≤ 3 esposizioni per le donne con partenza bassa, ≤ 2 per gli uomini e per chi parte normale, 95° percentile ≤ 5; AUT-01 tra 2,4 e 2,9% per punto di RPE, mai oltre 6% (registro B3) |
| Partenza bassa donne (capitolo D, registro B1) | 100% delle stime idonee (principianti e intermedie, tabella D.3) con PAR-06 applicata; 0 per avanzate e uomini; 0 sulle classi F |
| Spiegazioni | 100% delle voci del piano e delle note del programma con almeno un perché e un codice del catalogo; 100% dei codici del catalogo con un sotto-coach |
| Traduzioni | 0 pezzi mancanti in en, es, de su ≥ 500 testi generati (`controlla-traduzioni.js`) |
| Soglie | 100% delle voci con `forza` e `fonte`; 0 «Provvisoria» nelle soglie della Sentinella; ≤ 10% «Provvisoria» in totale; 100% dei numeri dell'elenco C.4 del registro con forza «Convenzione» ed etichetta visibile nel foglio «Perché?»; 16 regole bloccate (registro C.2) spente o sbloccate con una fonte vista |
| Migrazione | 6/6 fixture v1 aprono e chiudono una seduta senza errori; v1 invariato salvo correzioni elencate; aggiornamento annullato = archivio identico |
| Codice | `npm run controlla` verde; tutte le prove di `tests/browser/` verdi; `npm run grafo:verifica` verde; nessun wrapper tra file |
| Prestazioni | `buildProgram` mediana < 50 ms e 95° percentile < 150 ms in node; apertura di una seduta con 8 esercizi < 30 ms |

---

## H. Decisioni che servono davvero all'utente — **DECISE**

Tutte prese il 2026-10-05 (carta bianca dell'utente, più la sua decisione sulle donne); testo completo, motivo e punti del piano nel registro `docs/coach-v2-decisioni.md`, capitolo **D** (D-P1..D-P18). Qui solo l'esito.

1. **Calibrazione rapida per tutti i principianti** → **sì** (D-P1): CAR-18 per tutti i principianti; il fattore di partenza bassa solo per le donne fino all'intermedio; carichi degli uomini invariati (riga «partenza normale» della tabella D.5). W2-T8.
2. **Disegni degli esercizi nuovi** → **si esce senza disegno**, con la scheda tecnica (D-P2): verificato che l'app mostra già «Immagine in arrivo» (tradotto) quando il disegno manca; inventario e prova in W1-T5.
3. **Attrezzi di casa in più** → **sì** (D-P3): elastici, kettlebell, panca, anelli, più sbarra e manubri con il kg del più pesante. W1-T2, W1-T5, W2-T5, W2-T6; ponte in W0-T5.
4. **Taper TAP-01** → **spento e bloccato** (D-P4; registro C.2 n. 15). W3-T6.
5. **Programmi già salvati** → **mai cambiati in silenzio** (D-P5): correzioni di sicurezza e di calcolo subito, con riga nel «perché» e proposta con Annulla se cambia un esercizio; correzioni di struttura solo con la scheda «Aggiorna il programma» (W5-T5) o al prossimo ciclo.
6. **Nuovi obiettivi** → **fuori da questo piano** (D-P6), in un'onda dopo la v2; il modello dei dati resta aperto (prova in W1-T4).
7. **Pause più corte per le donne** → **tenute ma ristrette** (D-P7): −15% solo su isolamenti D/E e su B/C con ≥ 8 ripetizioni; mai classe A né ≤ 6 ripetizioni; minimi 45/60/75 s; etichetta «Convenzione». W2-T2.

Decisioni **aggiunte** dal registro (D-P8..D-P18): bicipiti in allungamento prima e croci alla pari (D-P8); età minima 13 anni ed età obbligatoria (D-P9); il tempo è un tetto (D-P10); pullover come dorsali (D-P11); livello mancante = principiante (D-P12); niente campo «barra più leggera» (D-P13); PRZ-03 ritirata (D-P14); principianti 12 settimane con controllo all'8ª (D-P15); tocco a 3 scelte dopo la prima serie (D-P16); massimo 2 muscoli prioritari (D-P17); rinviate le funzioni che chiedono chiavi nuove (D-P18).

**Ancora aperte** (registro G): soglia legale dell'età (13 o 14, da un legale prima del rilascio); carichi di partenza degli uomini (da riaprire con dati locali); àncore della partenza bassa da una sola fonte; 16 regole bloccate (sessione di ricerca R-1 prima di W4-T2).
