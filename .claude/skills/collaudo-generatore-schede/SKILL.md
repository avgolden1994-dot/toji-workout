---
name: collaudo-generatore-schede
description: Collaudo sistematico e ripetibile del generatore di schede di 3in (buildProgram) con i criteri di un preparatore esperto di forza e ipertrofia - volume per muscolo, frequenza, serie per seduta, durata, ordine degli esercizi, ridondanza, sicurezza con fastidi e attrezzatura, prescrizione (ripetizioni, pause, RIR), scarico, divisione dei giorni. Dice come lanciare lo strumento tools/collaudo-generatore.js (npm run collaudo:schede), leggere il report, aggiungere un criterio, trasformare una classe di fallimento in una correzione del generatore e confrontare prima e dopo. Da caricare quando si valuta la qualita delle schede o si vuole migliorare il generatore. Trigger - collaudo schede, audit generatore, qualità programma, valuta la scheda, valuta il programma, audit buildProgram, quanto è buono il generatore, criteri del preparatore, regressione schede, prima e dopo, collaudo generatore, workout generator audit, program quality audit.
---

# Collaudo del generatore di schede di 3in

Scopo: **misurare** quanto è buona la scheda che `buildProgram()` (`js/coach/programma/ricette.js`) produce a partire dalle risposte del questionario, con gli occhi di un preparatore che conosce la letteratura, e ripetere la misura dopo ogni modifica. Il collaudo **non è un controllo bloccante** (esce sempre con codice 0): è un audit. Non sostituisce `coerenza-schede.js` (regole ABB, 735 profili, in browser): lo allarga a volume, tempo, sicurezza e prescrizione, senza browser.

Salta questa skill se la domanda riguarda solo UI o carichi di una seduta già in corso (`caricoProssimo`, `docs/coach-mappa-regole.md` cap. 8).

## 0. Come lavora (in due righe)

`tools/collaudo-generatore.js` carica in un contesto `vm` tutti gli script di `index.html` tranne `avvio.js` (lo stesso metodo di `tests/muscoli.test.js`, con `coachAttivo` e `getProfile` finti: la struttura non cambia, i carichi di partenza non si stimano), genera un programma per ogni profilo della matrice, ne ricava un **modello della settimana** (serie dirette e frazionarie per muscolo e per seduta, durata, schemi di movimento, RIR pianificato) e applica ~50 criteri. Un criterio che scatta dà una **classe di fallimento** (`CODICE` oppure `CODICE:muscolo`). Le classi si ordinano per **impatto = percentuale pesata di programmi colpiti x peso della severità** (1, 2, 4, 8, 16 per severità 1..5).

## 1. Lanciarlo

```
npm run collaudo:schede                                  # matrice "standard": 10.800 profili, circa 95 s
npm run collaudo:schede -- --matrice rapida              # 1.800 profili, circa 15 s (per iterare)
npm run collaudo:schede -- --matrice completa            # 64.800 profili, circa 10 minuti (con sesso e fascia d'età)
npm run collaudo:schede -- --etichetta prima --out /tmp/collaudo   # file chiamati collaudo-generatore-prima.md/.json
npm run collaudo:schede -- --profilo '{"level":"intermedio","days":4,"goals":["massa"],"minutes":60,"luogo":"palestra","fastidi":["spalle"]}'
npm run collaudo:schede -- --solo VOL-01,DUR-02 --matrice rapida   # solo alcuni criteri
npm run collaudo:schede -- --autotest                    # ogni criterio sa scattare? (programmi costruiti a mano)
npm run collaudo:schede -- --confronta prima.json dopo.json
```

- **Dove scrive**: mai nel repo (se `--out` cade dentro il repo, lo sposta in `os.tmpdir()`). Ordine di scelta: `--out`, poi `COLLAUDO_OUT_DIR`, `CLAUDE_SCRATCHPAD_DIR`, `SCRATCHPAD_DIR`, poi la cartella temporanea del sistema (`.../collaudo-generatore/`). Accanto al `.md` c'è un `.json` con gli stessi numeri.
- **Dipendenze**: nessuna (solo Node). Non serve `npm install`.
- **Matrice**: obiettivo (8 combinazioni, anche con due obiettivi) x livello x giorni (2-6) x minuti (30-90) x luogo x fastidi (nessuno, spalle, ginocchia, schiena e coppie) x sesso x fascia d'età. Le dimensioni minori (sonno, attrezzi preferiti, frequenza scelta, PAR-Q, priorità, attrezzi della palestra, risposte psicologiche, seme) si assegnano con un generatore fisso per profilo: **ripetibile**. Per riprodurre un profilo: `--profilo` con gli stessi campi (l'esempio nel report è già in quel formato).
- **Un profilo solo** (`--profilo`) stampa la settimana e i fallimenti: è il modo di riprodurre un esempio del report prima di toccare il codice.

## 2. Leggere il report

1. **Totali**: profili, errori del generatore, quanti programmi hanno almeno un fallimento di severità alta (>= 4), quanti usano un metodo famoso. «100% con fallimenti» non dice nulla da solo: leggi le classi.
2. **Classi per impatto**: ogni riga ha severità (1-5), forza della prova, programmi colpiti, **% matrice** (ogni profilo uno) e **% pesata** (pesi plausibili della popolazione, `PESI_POPOLAZIONE` in cima al file: sono **assunzioni**, non dati; `--pesi uniformi` le spegne). L'impatto usa la % pesata: la matrice sovrarappresenta i fastidi e il corpo libero.
3. **Esempi** (le prime classi): 3 profili diversi per livello, luogo e obiettivo, ognuno con il profilo di input, la settimana in tabella (serie x ripetizioni, recupero, `SS` = superserie col precedente, `[tecnica]`, minuti stimati, serie frazionarie per muscolo) e «Cosa non va». Sopra gli esempi: `Dove guardare` (file:funzione), `Dove cade di più` (livello, minuti, luogo, giorni) e `Più frequenti` (gli esercizi o le coppie colpevoli).
4. **Dove cadono i fallimenti**: % di programmi con fallimenti gravi per ogni valore di ogni dimensione. Se un solo valore (es. 30 minuti) spiega tutto, il difetto è di tempo, non di regola.
5. **Verifiche sul modello dati** (`MOD-xx`): cosa il collaudo **non può** calcolare perché il dato manca (controindicazioni, intervallo di ripetizioni, prescrizione per settimana...). Un `manca` qui è un risultato, non una svista dello strumento.
6. **Copertura della libreria**: per ogni schema, quanti esercizi restano per luogo e per fastidio. Uno 0 spiega da solo molti fallimenti (es. nessuno stacco rumeno con manubri a casa).
7. **Criteri superati**: cosa il generatore fa bene (nessun fallimento in tutta la matrice). Va letto con `--autotest`, che prova che il criterio saprebbe scattare.

**Come si dà fiducia a una classe**: riproduci un esempio con `--profilo`, controlla i numeri a mano (serie frazionarie = bersaglio x 1 + secondari x 0,5, da `DETTAGLI`), poi guarda la funzione indicata. Tre cose da non confondere: *il criterio è una convenzione* (forza scritta), *il modello del collaudo è prudente* (durata, conteggio per muscolo) e *il generatore ha un difetto*. Dove i criteri e il generatore divergono per il modo di contare (es. volume per gruppo contro volume per muscolo) il difetto è di **misura nel generatore**.

## 3. I criteri e i principi esperti

Forza della prova come in `docs/ricerca-struttura-e-intensita.md`: **Solida** (meta-analisi o posizione ufficiale), **Moderata** (pochi studi, preprint, risultati che cambiano con la popolazione), **Convenzione** (pratica dei coach, nessuna prova diretta: il collaudo lo dice). Ogni soglia numerica ha nome e fonte in cima a `tools/collaudo-generatore.js` (sezione 1); sotto, i principi.

| Area | Criteri | Principio dell'esperto | Forza |
|---|---|---|---|
| Volume | MIS-01, VOL-01, VOL-02, DIR-01, EQ-03 | Conta **per muscolo**: 1 serie per il bersaglio, 0,5 per i sinergisti (Pelland 2025). Intermedio 10-16 serie frazionarie a settimana, avanzato 12-20, principiante 6-10; salute 6-10; sotto 5 la crescita è minima. Pavimento di serie **dirette** per braccia (4-6), deltoidi laterali (4-6), posteriori (3-4), polpacci (6-8) (`docs/ricerca-ipertrofia-programmazione.md` 3.2). Femorali almeno metà dei quadricipiti, con una flessione del ginocchio (leg curl: Maeo 2021) | Solida (>= 10) / Moderata (frazionario, braccia) / Convenzione (resto) |
| Frequenza e recupero | FRQ-01, FRQ-02, REC-01, REC-02, REC-03, SPL-01, SPL-02 | Ogni grande gruppo almeno 2 volte a settimana (ACSM 2026); il numero di sedute è quello dichiarato; 48 ore tra due sedute pesanti dello stesso muscolo; non oltre 4 giorni di fila; con 2-3 giorni niente divisioni a muscolo singolo | Solida (>= 2) / Moderata (48 ore) / Convenzione (resto) |
| Seduta | SES-01, SES-03, DUR-01, DUR-02, EXN-01, EXN-02 | Tetto di circa 11 serie frazionarie per muscolo in una seduta (preprint 2025); un multiarticolare di ogni schema per seduta di quel tipo; la seduta sta nei minuti dichiarati (+10%) e non ne spreca oltre il 25%; 3-8 esercizi (principianti fino a 6) | Moderata / Convenzione |
| Ordine e coppie | ORD-01..04, SS-01, SS-02 | Multiarticolari per primi (Nunes 2021: per la forza l'ordine conta, per la massa no); niente pre-affaticamento (Gentil: nessun vantaggio, meno ripetizioni); superserie solo tra antagonisti e mai con un fondamentale pesante (meta-analisi 2025, Paz 2017) | Solida (forza, superserie) / Moderata / Convenzione |
| Ridondanza ed equilibrio | RID-01, RID-02, EQ-01, EQ-02, PAT-01 | Non due esercizi dello stesso muscolo e tipo nella stessa seduta; non lo stesso esercizio 3 volte a settimana; tirate almeno pari alle spinte (rapporto >= 0,9); tirate sia verticali sia orizzontali; i sei schemi di base ogni settimana | Convenzione |
| Prescrizione | RX-01..04, GOA-01, TEC-01, PRI-01 | Forza: 1-6 ripetizioni, pause 2-5 minuti sui fondamentali (ACSM 2009/2026); ipertrofia: tutti i carichi vicino al cedimento (ACSM 2026), per prassi 5-10 sui pesanti col bilanciere, 8-20 sugli isolamenti, pausa >= 60-90 s (Singer 2024); 2-6 serie per esercizio (Krieger 2010, Ralston 2017); isolamenti non sotto le ripetizioni dei multiarticolari; tecniche al cedimento non ai principianti; la priorità dichiarata dà serie in più | Solida (serie per esercizio) / Moderata (pause) / Convenzione |
| Mesociclo | DEL-01, RIR-01, RIR-02, RIR-03 | Scarico entro 8 settimane; RIR che scende nel blocco; niente RIR 0 sui fondamentali col bilanciere; alla settimana 1 RIR >= 3 (principiante), >= 2 (altri): le stime del RIR sbagliano di circa 1 ripetizione (Halperin 2022, Refalo 2023) | Moderata / Convenzione |
| Sicurezza | SAF-01..06 | Esercizio controindicato con un fastidio dichiarato (elenco del collaudo `CONTROINDICAZIONI`, **non** quello dell'app: serve a trovare i buchi di `RISCHIO`); attrezzatura che non c'è (casa con manubri e panca, corpo libero, attrezzi della palestra); sbarra e parallele non garantite a casa; esercizi tecnici ai principianti o in modalità prudente; cuffia dei rotatori con spalla dolente (Cressey) | Convenzione (non è consulenza medica) |
| Robustezza | ERR-01, SAN-01 | Il generatore non lancia errori; nessun esercizio doppio o fuori libreria | - |

Elenco completo, con severità e fonte di ognuno, nella sezione «Criteri e soglie usati» del report e nel campo `criteri` del JSON.

## 4. Aggiungere (o cambiare) un criterio

Tutto sta in `tools/collaudo-generatore.js`; in ordine:

1. **Soglia**: una costante con nome in cima (sezione 1), con commento `fonte | forza` (Solida/Moderata/Convenzione). Mai numeri nel corpo del criterio. Se la soglia viene da una nota di ricerca, cita il paragrafo (es. `docs/ricerca-ipertrofia-programmazione.md 3.2`).
2. **Criterio**: un oggetto in `CRITERI` con `id` (3 lettere + 2 cifre, unico), `nome`, `sev` (1 bassa, 2 media-bassa, 3 media, 4 alta, 5 critica: la 5 è solo per la sicurezza), `forza`, `fonte`, `dove` (lista di `file: funzione` del generatore, come in `docs/mappa-per-agenti.md`) e `check(m, c)`.
   - `m` = modello: `m.sedute[]` (con `es[]`: `nome`, `pulito`, `sets`, `reps`, `rest`, `superset`, `tecnica`, `inf` = `bers`, `sec`, `tipo`, `carico`, `mov`, `att`, `gruppoLib`; e `grp`/`dir` = serie frazionarie e dirette per gruppo in quella seduta, `minuti`, `gi` = giorno 0-6), `m.vol` e `m.dir` (settimana), `m.mov` (serie per schema), `m.rir1`, `m.rirPesante`.
   - `c` = contesto: profilo (`level`, `days`, `minutes`, `luogo`, `fastidi`, `goals`, `priorita`, `cauto`), `c.prof` (anche `freq`, `parq`...), `c.prog` (il programma vero: `fasi`, `rirSett`, `note`, `prefs`, `metodo`), `c.tipoObiettivo` (`ipertrofia`/`forza`/`generale`), `c.fattibile` (lo schema è possibile con luogo e fastidi?).
   - Ritorna `[{ sub?, sev?, msg, tag?, gravita }]`. `sub` divide la classe (muscolo, luogo...), `sev` la corregge per quella classe, `tag` fa comparire l'esercizio tra i «più frequenti», `gravita` sceglie l'esempio peggiore.
   - **Non contare due volte** lo stesso difetto in due criteri (se un criterio ne assorbe un altro, saltalo come fa `volumeGruppi`).
3. **Autotest**: una riga `fixture(...)` in `FIXTURES` con un programma a mano che deve far scattare il criterio (`attese`) e, se serve, uno che non deve (`assenti`). `npm run collaudo:schede -- --autotest` deve dare 0 falliti e «Criteri senza una prova: nessuno».
4. **Versione**: alza `VERSIONE_CRITERI` se cambi una soglia o il significato di un criterio: i confronti prima/dopo valgono a pari versione.
5. **Provalo** su `--matrice rapida` e guarda 3 esempi a mano. Un criterio che scatta sul 95% dei profili o su nessuno è quasi sempre scritto male (o misura un difetto reale del generatore: verificalo con `--profilo`).

Non aggiungere criteri su tutto: ognuno deve rispondere a «quale decisione del generatore cambierebbe?».

## 5. Dalla classe di fallimento alla correzione del generatore

Flusso (un argomento per volta, come chiede `docs/PIANO.md`):

1. **Riproduci**: `--profilo` con il profilo dell'esempio; annota i numeri.
2. **Localizza**: la riga `Dove guardare` del report, poi `npm run -s trova -- <nome>` (serve `npm install` una volta) e `docs/mappa-per-agenti.md`. Apri solo il `file:riga` indicato.
3. **Scegli dove** con l'albero di `.claude/skills/implementa-regola-coach/SKILL.md` §1: un numero va in `COACH_PARAMETRI`, la struttura in `struttura-pro.js`, la scelta di esercizi e serie in `ricette.js`, le tabelle di conoscenza in `motore.js`/`schemi.js`, gli esercizi in `js/dati/`. Una regola nuova ha codice, motivo, fonte, è annullabile e spegnibile (stessa skill; nota di ricerca con la forza in `.claude/skills/ricerca-fitness/SKILL.md`).
4. **Controlla con `--matrice rapida`** la classe e le vicine (una correzione che migliora il volume può peggiorare la durata).
5. **Chiudi** con la lista di fatto della skill `implementa-regola-coach` §7 (`npm run controlla`, mappa delle regole, grafo) e con il confronto prima/dopo (§6).

Mappa delle cause più probabili (verificate il 2026-10-05 sul codice; `dove` completo nel report):

| Famiglia di fallimenti | Causa nel codice | Dove |
|---|---|---|
| Volume per muscolo sotto il minimo (petto, quadricipiti, glutei) con serie che il generatore crede sufficienti | il volume si conta **per gruppo** con le sinergie di gruppo (`MUSCLE_GROUPS[g].synergists`: i deltoidi contano 0,5 per il petto), non per muscolo con i `secondari` di `DETTAGLI` | `ricette.js`: `buildProgram` (blocco «volume per muscolo», `perGruppo`, `GRUPPI_PRINCIPALI`); `schemi.js`: `VOLUME_LIVELLO` |
| Femorali poco allenati e una sola volta; polpacci, deltoidi laterali e posteriori, braccia con poche serie dirette | `RICETTE.lower` alterna `isoFem` e `isoQuad`; i full body non hanno `isoFem`; le aggiunte (`aggiungiRegione`, `strCopri`) mettono 2-3 serie in una sola seduta e solo da 3-4 giorni | `ricette.js`: `RICETTE`, `aggiungiRegione`; `struttura-pro.js`: `strCopri` |
| Sedute che sprecano tempo o lo sforano | `minutiDi` = 8 min + serie x (35 s + recupero): solo **taglia**, non aggiunge mai; max 7 esercizi; minimo 3 esercizi da 2 serie con 150 s di recupero (sforano a 30 minuti) | `ricette.js`: `buildProgram` (taglio per il tempo); `onboarding.js`: `exerciseCountFor` |
| Esercizi in conflitto con un fastidio (`Pike Push-up` con la spalla, `Front Squat` con la schiena) | `RISCHIO` è una regex sul nome per 3 regioni; la libreria non ha etichette; le regex non coprono `pike`, `front squat`, `yates` | `motore.js`: `RISCHIO`, `consentito`; `js/dati/libreria-esercizi.js` (nessun campo) |
| Ripetizioni e recuperi anomali su certi esercizi (isolamento con recupero da macchina, 5x5 su un goblet squat) | il blocco «schemi mancanti» (PRG-21) assegna reps e recupero senza passare dal calcolo per tipo; `forzaSulPrimo` (PRG-14) vale per qualunque multiarticolare | `ricette.js`: `buildProgram` (schemi mancanti; `scheme.forzaSulPrimo`) |
| RIR a 0 dalla prima settimana; RIR 0 sui fondamentali degli avanzati | `RIR_TIPO` ignora il livello e la settimana; `rirBersaglioBase` con `rirSett` ignora il tipo | `regole-ricerca.js`: `RIR_TIPO`, `rirBersaglioBase`; `ricette.js`: `rirSett` |
| Casa e corpo libero: niente hinge, femorali, sbarra non garantita | libreria senza stacco rumeno con manubri né rematore/trazione senza sbarra; il questionario non chiede la sbarra | `js/dati/libreria-esercizi.js`, `dettagli-esercizi.js`; `onboarding.js`: `ONB_LUOGHI` |
| Divisione e giorni (full body + upper/lower con 4 giorni e frequenza 3; principiante con 5-6 giorni → 4 sedute) | `splitPerFrequenza` e `splitFor`; `mappaGiorni` fissa (lun-mar-gio-ven, lun-sab) | `onboarding.js`; `ricette.js`: `mappaGiorni` |

Proposte di regole già scritte, con forza e salvaguardie: `docs/ricerca-ipertrofia-programmazione.md` cap. 4 (IPE-01 volume per muscolo, IPE-02 pavimento di dirette, IPE-03 tempo prima dei tagli, IPE-05 rampa di RIR...) e `docs/ricerca-metodi-coach-pratici.md` cap. 6.

## 6. Prima e dopo

1. **Prima** di toccare il generatore: `npm run collaudo:schede -- --etichetta prima` (matrice standard, nessun `--solo`, stessi pesi).
2. Modifica il generatore (§5).
3. **Dopo**: `npm run collaudo:schede -- --etichetta dopo`, poi `npm run collaudo:schede -- --confronta .../collaudo-generatore-prima.json .../collaudo-generatore-dopo.json`. Il confronto mostra, per ogni classe, la % di matrice e la % pesata prima e dopo, e avvisa se la versione dei criteri, la matrice o i pesi sono diversi.
4. **Regola di non regressione**: nessuna classe di severità >= 3 deve salire di oltre 2 punti percentuali pesati senza una ragione scritta; le classi di sicurezza (SAF-01, SAF-03) non devono salire affatto; `ERR-01` e `SAN-01` restano a zero.
5. **Cosa si salva nel repo**: solo i **numeri compatti**, non il report: crea (o aggiorna) `docs/collaudo-generatore-storico.md` con una riga per esecuzione: data, commit, versione dei criteri, matrice, `profili`, `conGravi` (e `gravi_pesata`), e le 10 classi in testa con la loro % pesata (sono nel campo `riepilogo` del JSON: `classi_pesata`). Il report completo e il JSON restano fuori dal repo (sono grandi e cambiano a ogni seme).
6. Con graphify: se hai toccato `tools/` o `docs/`, `npm run grafo` dopo gli altri passi (vedi `CLAUDE.md`).

## 7. Limiti onesti

- **I criteri sono un secondo parere, non la verità**: molte soglie sono Convenzione (scritta accanto). Dove le fonti non concordano (scarico a tempo, frequenza 1 contro 2, ordine per la massa) il collaudo segue il repo (`docs/ricerca-*.md`) e lo dice.
- **I pesi della popolazione sono assunzioni** (`PESI_POPOLAZIONE`): usali per ordinare, non per citare percentuali di utenti.
- **Il modello della durata è un'ipotesi** (3,5 s per ripetizione, 1 minuto tra gli esercizi, 6 minuti di riscaldamento, unilaterali doppi): sposta DUR-01/02 di qualche punto, non la graduatoria.
- **`coachAttivo` è finto a falso**: il collaudo non vede i carichi di partenza, le regole RIC/INT che agiscono solo con il consenso (calibrazione delle prime sedute: la vede solo come presenza della funzione, `MOD-11`) né la progressione delle settimane successive (`caricoProssimo`): il programma salva sedute identiche per tutte le settimane. Il RIR per settimana lo chiede a `rirBersaglioBase` con programma e settimana finti.
- **L'elenco delle controindicazioni è del collaudo** e non è consulenza medica: serve a trovare ciò che il generatore lascia passare.
- **Il metodo famoso** è scelto dal coach solo in pochi casi (nella matrice quasi solo `rr` a corpo libero): le schede dei metodi (GZCLP, PHUL, Hatfield...) sono poco coperte; per provarle forza `d.metodo` con `--profilo` (campo `metodo`).
- **Il collaudo non gira nel browser**: `tests/browser/coerenza-schede.js` resta il controllo delle regole ABB.

## Registro degli apprendimenti

Chi usa questa skill aggiunge **in coda** una riga per ciò che ha funzionato o no. Formato: `- AAAA-MM-GG | cosa | esito / consiglio`.

- 2026-10-05 | Prima versione dello strumento (criteri v1.0), caricamento in `vm` di tutti gli script di `index.html` tranne `avvio.js` | Funziona in circa 110 programmi al secondo senza dipendenze; servono solo stub di `addEventListener` e `MutationObserver` oltre a quelli di `tests/muscoli.test.js`.
- 2026-10-05 | Campione «rapida» con `indice % 6` | Errore: cadeva sempre sullo stesso valore dei fastidi (nessun fastidio) e nascondeva tutti i problemi di sicurezza. Il campione si fa per hash del profilo.
- 2026-10-05 | Conteggio frazionario sommando i muscoli di un gruppo | Errore: le trazioni contano dorsali (1) e romboidi (0,5) nello stesso gruppo «schiena» = 1,5 per serie. Si conta una volta per gruppo (1 se il bersaglio è nel gruppo, altrimenti 0,5).
- 2026-10-05 | Soglie di volume per i muscoli piccoli uguali a quelle dei grandi | Troppo rumore: i piccoli prendono molto dai multiarticolari. Fascia a parte e pavimento di serie **dirette** (docs/ricerca-ipertrofia-programmazione.md 3.2).
- 2026-10-05 | Programma di controllo fatto a mano (3 giorni full body da 7 esercizi, 60 minuti) | Il collaudo lo segna con 11 classi, tutte di severità 2-3 (femorali al 70% del minimo, serie dirette appena sotto il pavimento, polpacci e deltoidi in una sola seduta, RIR fisso), contro una media di circa 13 classi per programma generato e il 70% dei programmi con almeno un fallimento di severità >= 4: la taratura non è troppo severa.
- 2026-10-05 | Prima esecuzione sulla matrice standard (10.800 profili, criteri v1.0, commit dc74c2a e successivi) | Vedi la riga «baseline» qui sotto.
