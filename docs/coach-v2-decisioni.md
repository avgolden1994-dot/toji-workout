# Registro delle decisioni del coach v2

> Documento del 5 ottobre 2026 (ramo `claude/fitness-expertise-development-2pptmr`). **Non cambia codice.** Mette d'accordo il piano `docs/piano-coach-v2.md` (scritto quando erano arrivate circa 10 note) con **tutte** le 18 note `docs/ricerca-*.md`, con la gap analysis del coach (bug B1-B24) e con il collaudo del generatore sul codice di oggi (`npm run collaudo:schede`, commit `0e71714`: matrice standard 10.800 profili, completa 64.800; 0 errori del generatore; report fuori dal repo, come vuole la skill del collaudo).
> **Ha la precedenza sul piano** dove i due documenti non coincidono; il piano è stato aggiornato di conseguenza (vedi il suo «Registro delle modifiche»). Ogni agente che implementa un task legge prima le sezioni A (codici), C (regole bloccate) e la riga del suo task in E.

## 0. Come si legge

**Stato di un codice** (sezione A.3):

| Stato | Significato |
|---|---|
| **attiva** | si implementa nel task indicato, con questo codice |
| **assorbita → X** | lo stesso concetto vive nella regola X: il codice vecchio non entra nel catalogo; la nota di ricerca resta la fonte |
| **bloccata** | la regola (o la parte indicata) **non si implementa** finché una ricerca web non la conferma (sezione C) |
| **spenta** | si implementa ma esce spenta di base (oggi solo TAP-01, che è anche bloccata) |
| **rinviata** | fuori dalla v2; il modello dei dati non deve impedirla |
| **rimossa** | il codice ha avuto una regola e il prodotto l'ha tolta: non entra nel catalogo e non si riusa (oggi solo IA-01..05, 2026-10-05) |

**Base delle prove** (come nelle note): [V] visto in un risultato di ricerca della sessione (riassunto, non testo integrale); [R] già nel repo; [D]/[C] calcolo dichiarato; **[M] [N] [K] [CM] [NV] †** = *conoscenza del modello, non verificata sul web*: **non è una prova**. Le note dichiarano in testa la copertura: biomeccanica e mesocicli **0** ricerche riuscite, casa 4, obiettivi 8, algoritmi 10, metodi avanzati 11, principianti 15, specializzazione 16, fasce d'età 18, donne 20, cardio 22, riscaldamento 23, forza 29, psicologia 33, metodi dei coach 37, recupero 38, ipertrofia 42.

---

## A. Collisioni e doppioni

### A.1 Collisioni di nomi (stesso codice, due significati)

| Codice | Dove | Problema | Decisione |
|---|---|---|---|
| **PRI-xx** | nota principianti (PRI-01..19) contro `tools/collaudo-generatore.js:503` (collaudo **PRI-01** = «muscolo prioritario senza serie in più»), già usato nel piano (W2-T1, G) | due cose diverse con lo stesso nome; la nota stessa chiede di rinominare | Le regole dei principianti diventano **PRN-xx** (A.3). Il collaudo tiene PRI-01 |
| **REC-01..03** | regole REC (nota recupero) contro collaudo REC-01..03 (giorni consecutivi, lombari, giorni di fila) | nel piano W2-T5 accetta «collaudo REC-01 = 0» e W4-T1 implementa «REC-01» (domande d'allarme) | Si tiene REC per le regole (citato da 7 note). **Regola di scrittura (E.0 del piano):** un criterio del collaudo si scrive sempre «collaudo XXX-NN»; un codice nudo è una regola del coach |
| **TEC-01** | regola TEC-01 (piramide, cap. 11) contro collaudo TEC-01 (tecniche ai principianti) | idem | idem |
| **REC-13..15** | inventati dal piano (B.1, W4-T2): la nota REC si ferma a REC-12 | codici senza fonte | REC-13 → **ETA-08** (over 65), REC-14 → **DON-13** (donne dai 50 anni, bloccata), REC-15 → **PRN-15** (sovrappeso) |
| **SEL-10** | il piano la mette in B.1 e in W4-T1, ma nel cap. C dice «assorbita da REC-04» | contraddizione interna | **assorbita → REC-04** (W4-T1) |

Prefissi nuovi controllati con `grep` su `js/`, `tools/`, `tests/` e sulla mappa delle regole il 2026-10-05: **PRN, ETA, CAS, MES, ALG, REG, FRZ, EST** sono liberi; nessuno coincide con un criterio del collaudo (ERR, SAN, MIS, VOL, DIR, FRQ, SES, DUR, EXN, ORD, SS, RID, EQ, PAT, REC, SPL, RX, GOA, TEC, PRI, DEL, RIR, SAF, MOD).

### A.2 Doppioni: un concetto, un codice

Regola: sopravvive il codice della nota **più specifica** sul tema (quella che ha la tabella o il pseudo-codice più completi); gli altri codici diventano «assorbita» e la loro nota resta citata come fonte.

| Concetto | Codici nelle note e nel piano | Codice finale | Perché quello |
|---|---|---|---|
| Rampa di RIR nel blocco | IPE-05, PCO-02, MES-02, PRI-02, OBI-10, ALG-18, PRG-38, W2-T4 «+1 RIR per 2 settimane» (PCO-07) | **MES-02** (tabella per livello e tipo; riga dei principianti da PRI-02; modificatori per obiettivo in **OBI-03**) | MES-02 ha la tabella per tipo e i pavimenti; PRI-02 la riga 12 settimane |
| Rampa di serie nel blocco | IPE-08, MES-03, PRI-04, OBI-10, RIC-01 (forma «centrale»), PRZ-03 | **MES-03** (riga principianti da PRI-04); **PRZ-03 ritirata** | formula e arrotondamenti esplicitati (MES §3.3) |
| Struttura del blocco e scarico programmato | IPE-07, MES-01, PRI-03, PRG-01, W0-T5 | **MES-01** (intermedio, avanzato) + **PRN-03** (principiante 12 settimane) | B4 |
| Dose e disegno dello scarico | CAR-03, MES-05, piano W3-T5 | **MES-05** | corregge il bug N6 (dose «alta» = «media») |
| Scarico reattivo | DEC-06, PRZ-04, STR-01, CAR-10, MES-07 | **MES-07** (una funzione, una dose); **CST-09** resta il ramo «riposo e medico» | più segnali, mai uno solo (Saw 2016 [R]) |
| Carico di riferimento nello scarico, ripresa | ALG-03, MES-06 | **MES-06** | stessa correzione (ALG U15 = MES N1/N2) |
| Etichetta di fase e dati dello storico | ALG-01, MES-09, W0-T3 (`settimana`, `obiettivo`) | **MES-09** | |
| Massimale con RIR, rumore 3% | AUT-02, ALG-04 | **AUT-02** | |
| Mancati e gradini dello stallo | PGR-04, PCO-01, ALG-13, MES-19, PRI-12, CAR-07 | **PGR-04** (gravità e conteggio), **PCO-01** (gradini di schema, riga principiante da PRI-12), **MES-19** (diagnosi F/S/T) | tre pezzi diversi della stessa scala |
| Finestra di ripetizioni e salto | PGR-02, ALG-07, DON-06, PRI-11 | **PGR-02** | |
| Corpo libero, elastici, leve | PGR-03, ALG-15, CAS-02, CAS-15, DON-09 (parte scala) | **CAS-02** (scale), **CAS-15** (elastici) | la nota casa ha le scale complete |
| Autoregolazione in seduta | AUT-03, ALG-10 | **AUT-03** | |
| Taratura del RIR | CAR-14, ALG-09, PRI-06 (tempi), MAV-04 (chi), MES audit 17 (quando) | **CAR-14 riscritta** | B2 |
| Volume per muscolo | IPE-01, SEL-01, SEL-05, SPE-02 | **IPE-01** | B6 |
| Pavimenti di serie dirette | IPE-02, SPE-09, SPE-10 | **IPE-02** (tabella per giorni da SPE §6.1) | B6, B13 |
| Modello dei tempi | IPE-03, IPE-14, CAS-05..08, RIS-12, MAV-09 (tempo), MAV-12 | **CAS-05** (modello), **CAS-06** (capacità), **CAS-07** (ordine di intervento), **CAS-08** (coppie) | B12 |
| Pause tra le serie | PRG-13, CAS-04, ETA-09, PRG-20, DON-08, IPE §3.4 | **PRG-13** (tabella unica) + **PRG-20** (donne, riscritta) | B8, D-P7 |
| Riscaldamento | REC-10, RIS-01, PCO-10, ETA-06, ETA-16 | **RIS-01..13** | la nota riscaldamento è dedicata |
| Tecniche vietate a principianti, over 65, PAR-Q, minori | MAV-03, ETA-10, PRI-06, PRI-16 (parte), CAS-12 | **MAV-03** (+ **MAV-02** per core e corpo libero) | matrice MAV §3.3 |
| Parziali e onestà delle tecniche | IPE-10, MAV-07; IPE-11, MAV-16 | **MAV-07**, **MAV-16** | |
| Minori | REC-11, ETA-01..07, PRI-16 | **ETA-01..05** (ETA-06 → RIS-08, ETA-07 bloccata) | |
| Over 65 | piano «REC-13», ETA-08..17, PRI-16 | **ETA-08** (parte a), **MAV-03**, **PRG-13**, **RIS-08**; resto bloccato | B10 |
| Rientro dopo una pausa | CAR-04, RIC-05, CST-01, CST-02, MES-15, REC-08, ALG-14 | **CST-01** (calendario, con le soglie di MES-15), **CST-02** (serie), **CAR-04** (carichi), **ALG-14** (risalita), **REC-08** (solo dopo dolore) | B20 |
| Specializzazione | IPE-13, MES-16, SPE-01..08, SPE-11..12, EST-01..06, MAV-15 | **EST-01..06** (+ MAV-15) | A.3 |
| Partenza bassa e calibrazione | DON-01..09, PAR-06..09, CAR-16..19, PRI-09 | **PAR-01, PAR-05..09, CAR-18..19** | B1 |
| Lessico e parole vietate | CST-04, DON-15, SPE-14, DCA-02 | **CST-04** (una lista, una prova sui testi) | |
| Rotazione degli accessori | STA-03, PCO-05, MES-14 | **MES-14** | |
| Onda di carico per la forza | MES-04, FRZ-05..07 | **FRZ** (modalità Forza) | il generico «forza» resta lineare/doppia + RPE |
| Taper | TAP-01, MES-18 | **TAP-01** (bloccata, spenta) | D-P4 |
| Fase di taglio | MES-17, OBI-04 | **OBI-04** (volume) + **MES-02** (RIR in deficit) | |

### A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato)

Sotto-coach: REG Regista, ARC Architetto, DOS Dosatore, BIL Bilancia, SEN Sentinella, TEC Tecnico, PRE Preparatore, MOT Motivatore, SPC Specialista. «a/b» = parte sbloccata / parte bloccata dello stesso codice (il catalogo ha **un** codice; la parte b non si scrive).

**Ipertrofia (IPE)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| IPE-01 | IPE-01 | DOS | W2-T1 (dati W1-T2) | attiva (assorbe SEL-01, SEL-05, SPE-02) |
| IPE-02 | IPE-02 | DOS | W2-T1 | attiva (assorbe SPE-09, SPE-10) |
| IPE-03 | CAS-07 | DOS | W2-T2 | assorbita |
| IPE-04 | IPE-04 | DOS | W2-T2 | attiva |
| IPE-05 | MES-02 | ARC | W2-T4 | assorbita |
| IPE-06 | IPE-06 | DOS | W2-T1 | attiva |
| IPE-07 | MES-01 | ARC | W2-T4 | assorbita |
| IPE-08 | MES-03 | DOS | W2-T4 (piano), W3-T4 (seduta) | assorbita |
| IPE-09 | IPE-09 | ARC | W2-T6 | attiva (con D-P8) |
| IPE-10 | MAV-07 | SEN | W2-T3 | assorbita |
| IPE-11 | MAV-16 | SEN | W2-T3 | assorbita |
| IPE-12 | IPE-12 | DOS | W2-T2 | attiva |
| IPE-13 | EST-05 | SPC | W2-T1, W5-T4 | assorbita |
| IPE-14 | CAS-05 | DOS | W2-T2 | assorbita |

**Forza e progressione (PGR, AUT, STD, TAP)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| PGR-01 | PGR-01 | BIL | W3-T1 | attiva |
| PGR-02 | PGR-02 | BIL | W3-T1 | attiva (assorbe ALG-07, DON-06, PRI-11) |
| PGR-03 | CAS-02 | BIL | W3-T1 | assorbita |
| PGR-04 | PGR-04 | BIL | W3-T1 | attiva (assorbe ALG-13) |
| AUT-01 | AUT-01 | BIL | W3-T1 | attiva (B3) |
| AUT-02 | AUT-02 | BIL | W0-T4 (esclusione scarichi), W3-T1 | attiva (assorbe ALG-04) |
| AUT-03 | AUT-03 | BIL | W3-T3 | attiva (assorbe ALG-10) |
| STD-01 | STD-01 | REG | W0-T4 (ponte), W3-T5 | attiva (assorbe PRI-13, criteri G1-G5) |
| STD-02 | STD-02 | REG | W2-T7, W3-T6 | attiva |
| TAP-01 | TAP-01 | SPC | W3-T6 | **bloccata e spenta** (assorbe MES-18) |

**Psicologia e costanza (CST)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| CST-01 | CST-01 | SEN | W4-T2 | attiva (assorbe MES-15) |
| CST-02 | CST-02 | SEN | W4-T2 | attiva |
| CST-03..05 | idem | MOT | W5-T2 | attive |
| CST-06 | CST-06 | MOT | W5-T2 | attiva (assorbe PRI-10) |
| CST-07 | CST-07 | SEN | W3-T4 | attiva |
| CST-08 | CST-08 | MOT | W3-T4 | attiva come **cancello** del +1 settimanale di PCO-03 (D-P14) |
| CST-09 | CST-09 | SEN | W3-T5 | attiva |
| CST-10 | CST-10 | MOT | W5-T2 | attiva (rinvio generico, nessuna affermazione clinica) |
| CST-11 | CST-11 | MOT | W5-T3 (file `progressi/peso.js`) | attiva (guardia) |
| CST-12 | CST-12 | MOT | W5-T2 | attiva |

**Recupero, dolore, popolazioni (REC)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| REC-01 | REC-01 | SEN | W4-T1 | attiva (rinvio generico; schiena Moderata [V]) |
| REC-02, REC-03, REC-05, REC-08 | idem | SEN | W4-T1 | attive |
| REC-04 | REC-04 | SEN | W4-T1 (ponte W0-T5: B13) | attiva (assorbe SEL-10) |
| REC-06 | REC-06 a: over 65 come PAR-Q nel testo del respiro | SEN | W0-T5 | a sbloccata (contraddizione codice-testo) |
|  | REC-06 b: campo «pressione alta», RPE ≤ 7, regola clinica sull'apnea | SEN | W4-T2 | **b bloccata** |
| REC-07 | REC-07 a: voce «sto male»; febbre o dolori diffusi → proposta di riposo (annullabile) | SEN | W4-T1 | a sbloccata (guardia) |
|  | REC-07 b: «sopra il collo» → seduta leggera; giorni di ripresa | SEN | — | **b bloccata** |
| REC-09 | REC-09 a: «la dolenzia è normale e non misura i progressi» [V] | SEN | W4-T1 | a sbloccata |
|  | REC-09 b: rabdomiolisi, urine scure → pronto soccorso | SEN | — | **b bloccata** |
| REC-10 | RIS-01 | TEC | W4-T3 | assorbita |
| REC-11 | ETA-01..04 | SEN | W0-T2, W0-T4 | assorbita |
| REC-12 | REC-12 a: bandiera separata nel PAR-Q, messaggio fisso «parla con ostetrica o medico», modalità prudente, niente tecniche, niente deficit (DCA-01) | SEN | W4-T2 | a sbloccata (guardia) |
|  | REC-12 b (= DON-12): esercizi da evitare, posizione supina, rampa del post-parto, pavimento pelvico | SEN | — | **b bloccata** |
| «REC-13» (piano) | ETA-08 | SEN | W4-T2 | vedi ETA-08 |
| «REC-14» (piano) | DON-13 | SEN | — | **bloccata** |
| «REC-15» (piano) | PRN-15 | ARC | W2-T6 | attiva (guardia, Convenzione) |

**Cardio e nutrizione (AER, NUT, PES, DCA)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| AER-01 | AER-01 | PRE | W5-T3 | attiva (assorbe PRI-18) |
| AER-02..04 | idem | PRE | W5-T3 | attive (AER-04: numeri del dimagrimento «Convenzione») |
| NUT-01 | NUT-01 | PRE | W5-T3 | attiva (assorbe COR-03 proteine; nessun numero sotto i 18, oltre i 65, in gravidanza, con malattie renali o metaboliche) |
| NUT-02 | NUT-02 | PRE | W5-T3 | attiva |
| PES-01..04 | idem | PRE | W5-T3 | attive (Convenzione) |
| DCA-01 | DCA-01 | SEN | W4-T2 | attiva (guardia; IMC 18,5 «Convenzione»; aggiunge ≥ 65 senza deficit automatico, da ETA-15) |
| DCA-02 | DCA-02 | PRE | W5-T3 | attiva |
| DCA-03 | DCA-03 a: togliere la frase «sotto il 17% di grasso» (affermazione senza base) | PRE | W5-T3 | a sbloccata |
|  | DCA-03 b (= DON-14): lista dei segnali con significato clinico (RED-S, amenorrea, ferro) | PRE | — | **b bloccata** |

**Biomeccanica e scelta degli esercizi (SEL)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| SEL-01, SEL-05 | IPE-01 | DOS | W2-T1 | assorbite (SEL-05 era «bloccata» nella nota: sbloccata perché IPE-01 ha Pelland [S] Moderata) |
| SEL-02 | SEL-02 | TEC | W0-T6 | attiva |
| SEL-03 | SEL-03 | ARC | W0-T5 (guardia casa), W1-T2 (`serve`), W2-T6 | attiva (con CAS-01) |
| SEL-04, SEL-07, SEL-13, SEL-15 | idem | ARC | W2-T6 | attive |
| SEL-06 | SEL-06 | ARC | W1-T2 (dato `abilita`), W2-T6 | attiva (assorbe PRI-05) |
| SEL-08 | SEL-08 | ARC | W2-T6 | attiva (assorbe SPE-10) |
| SEL-09 | — | — | — | nessuna regola (PRG-10 la copre) |
| SEL-10 | REC-04 | SEN | W4-T1 | assorbita (base [V] della nota recupero) |
| SEL-11 | SEL-11 | SEN | W0-T5 (ponte), W4-T1 | attiva |
| SEL-12 | SEL-12 | TEC | W5-T1 | attiva |
| SEL-14 | — | — | — | rinviata (dati da riscrivere; non è sicurezza) |
| SEL-16 | SEL-16 | ARC | W2-T6 | attiva come **Convenzione, Contrastata** (non è sicurezza: il blocco della nota non si applica, vedi C.1) |

**Pratiche dei coach (PCO)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| PCO-01 | PCO-01 | BIL | W3-T1 | attiva (assorbe PRI-12) |
| PCO-02 | MES-02 | ARC | W0-T4 (pavimento 1 sui pesanti), W2-T4 | assorbita |
| PCO-03 | PCO-03 | DOS | W3-T4 | attiva (il +1 passa da CST-08) |
| PCO-04 | PCO-04 | DOS | W2-T2 | attiva |
| PCO-05 | MES-14 | ARC | W3-T5 | assorbita |
| PCO-06 | PCO-06 | BIL | W3-T1 | attiva |
| PCO-07 | MES-02, MES-03 (righe principiante) | ARC | W2-T4 | assorbita (il «+1 RIR» non si somma: è la riga delle settimane 1-2) |
| PCO-08 | PCO-08 | SEN | **W2-T6** (spostata da W4-T1: è scelta degli esercizi in `ricette.js`) | attiva |
| PCO-09 | PCO-09 | ARC | W2-T5 | attiva |
| PCO-10 | RIS-03 | TEC | W4-T3 | assorbita |

**Donne (DON) → famiglia PAR e CAR**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| DON-01 | PAR-06 | BIL | W2-T8 | attiva (B1) |
| DON-02 | PAR-01 riscritta (livello mancante = principiante nelle stime di carico) | BIL | W2-T8 | attiva (D-P12) |
| DON-03 | PAR-08 | BIL | W2-T8 (+ `penalitaPartenza` letta da W2-T6) | attiva |
| DON-04 | CAR-18 | BIL | W2-T8 | attiva (tabella dei salti di B1) |
| DON-05 | PAR-07 | BIL | W2-T8 | attiva |
| DON-06 | PGR-02 | BIL | W3-T1 | assorbita |
| DON-07 | PAR-05 riscritta (testo della prima esposizione, per tutti) | BIL | W2-T8 | attiva |
| DON-08 | PRG-20 riscritta | DOS | W2-T2 | attiva (D-P7) |
| DON-09 | PAR-09 (+ CAS-02) | BIL | W2-T8, W3-T1 | attiva |
| DON-10 | PRZ-01 invariata | SEN | — | **frase «gli studi mostrano effetti piccoli» e grafico RPE per fase bloccati**; nessuna programmazione per fasi (già oggi) |
| DON-11 | PRG-22 riscritta (enfasi glutei solo da obiettivo o priorità) | ARC | W2-T6 | attiva |
| DON-12 | REC-12 b | SEN | — | **bloccata** |
| DON-13 | DON-13 | SEN | — | **bloccata** |
| DON-14 | DCA-03 b | PRE | — | **bloccata** |
| DON-15 | CST-04 | MOT | W5-T2 | assorbita |
| DON-16 | — | — | — | rinviata (taratura locale: consenso e dati) |

**Principianti (PRI → PRN)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| PRI-01 | **PRN-01** (esigenza del principiante ≤ 1,0, niente «Coach esigente») | DOS | W0-T4 (ponte), W2-T1 | attiva (assorbe ALG-18 per l'esigenza) |
| PRI-02 | MES-02 (riga principiante) | ARC | W0-T4 (ponte), W2-T4 | assorbita |
| PRI-03 | **PRN-03** (12 settimane, controllo all'8ª) | ARC | W0-T5 (ponte 8 settimane), W2-T4 | attiva (B4) |
| PRI-04 | MES-03 (riga principiante) | DOS | W2-T4, W3-T4 | assorbita |
| PRI-05 | SEL-06 estesa | ARC | W2-T6 | assorbita |
| PRI-06 | MAV-03 + CAR-14 (quando) | SEN | W0-T2, W2-T3, W3-T3 | assorbita |
| PRI-07 | PRZ-03 ritirata | DOS | W0-T4 (ponte), W3-T4 | assorbita |
| PRI-08 | CAS-06 (riga principiante; durata massima 40/50 minuti) | DOS | W2-T2 | assorbita (D-P10) |
| PRI-09 | CAR-18 (ingresso: tocco a 3 scelte) | BIL | W2-T8 (regola), W3-T3 (interfaccia) | assorbita (D-P16) |
| PRI-10 | CST-06 | MOT | W5-T2 | assorbita |
| PRI-11 | PGR-02 (+ `ripRange`) | BIL | W3-T1 | assorbita |
| PRI-12 | PCO-01 (riga principiante: 5×3 solo con obiettivo forza) | BIL | W0-T4 (ponte), W3-T1 | assorbita |
| PRI-13 | STD-01 (criteri G1-G5) | REG | W3-T5 | assorbita |
| PRI-14 | **PRN-14** (sblocco del bilanciere, proposta annullabile) | ARC | W3-T5 | attiva |
| PRI-15 | **PRN-15** (IMC ≥ 30: esercizi con appoggio, niente salti né transizioni a terra; nessun consiglio su calorie) | ARC | W2-T6 | attiva (guardia, Convenzione) |
| PRI-16 | ETA-02 + MAV-03 («potenza» solo su macchina o alzata dalla sedia) | SEN | W0-T2 | assorbita |
| PRI-17 | — | — | — | rinviata (domanda nuova in onboarding) |
| PRI-18 | AER-01 (riga principiante) | PRE | W5-T3 | assorbita |
| PRI-19 | **PRN-19** (primo mese elastico: ADE-01 ed ESI-02 non penalizzano) | MOT | W3-T5 | attiva |

**Mesocicli e scarichi (MES)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| MES-01 | MES-01 | ARC | W2-T4 | attiva |
| MES-02 | MES-02 | ARC | W0-T4 (ponte: pavimenti), W2-T4 (tabella), W2-T3 (aggancio in `rirBersaglioBase`) | attiva |
| MES-03 | MES-03 | DOS | W2-T4, W3-T4 | attiva |
| MES-04 | FRZ (onda della modalità Forza) | SPC | W3-T6 | assorbita |
| MES-05 | MES-05 | SEN | W3-T5 | attiva |
| MES-06 | MES-06 | BIL | **W0-T3 + W0-T4** (ponte nel codice di oggi), poi fasi in W1-T3 | attiva (assorbe ALG-03) |
| MES-07 | MES-07 | SEN | W3-T5 | attiva |
| MES-08 | MES-08 | SEN | W0-T5 (B9), W3-T5 | attiva |
| MES-09 | MES-09 | REG | W0-T3 | attiva (assorbe ALG-01) |
| MES-10 | MES-10 | SEN | W0-T4, W3-T5 | attiva |
| MES-11 | MES-11 | DOS | W0-T4 | attiva (bug N4) |
| MES-12 | MES-12 | REG | W0-T4 | attiva (bug N3) |
| MES-13 | MES-13 | REG | W3-T5 | attiva |
| MES-14 | MES-14 | ARC | W3-T5 | attiva (assorbe STA-03, PCO-05) |
| MES-15 | CST-01 | SEN | W4-T2 | assorbita |
| MES-16 | EST-05, EST-06 | SPC | W2-T1, W5-T4 | assorbita |
| MES-17 | OBI-04 + MES-02 | DOS | W2-T1, W2-T4 | assorbita |
| MES-18 | TAP-01 | SPC | — | assorbita (bloccata) |
| MES-19 | MES-19 | SEN | W3-T5 | attiva |

**Algoritmi di carico (ALG)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| ALG-01 | MES-09 | REG | W0-T3 | assorbita |
| ALG-02 | ALG-02 | BIL | W0-T3 (B6, «blocca»), W3-T1 (carico più frequente, U10: prima la prova che riproduce il difetto) | attiva |
| ALG-03 | MES-06 | BIL | W0-T3/T4 | assorbita |
| ALG-04 | AUT-02 | BIL | W3-T1 | assorbita |
| ALG-05 | ALG-05 (ricalcolo dal massimale, fase 'carico' 20) | BIL | W3-T1 | attiva |
| ALG-06 | ALG-06 (passo reale per attrezzo, B17) | BIL | W3-T1 | attiva |
| ALG-07 | PGR-02 | BIL | W3-T1 | assorbita |
| ALG-08 | ALG-08 (segnale dall'ultima serie) | BIL | W3-T1 | attiva |
| ALG-09 | CAR-14 riscritta | BIL | W3-T3 | assorbita |
| ALG-10 | AUT-03 | BIL | W3-T3 | assorbita |
| ALG-11 | ALG-11 (profilo di caduta tra le serie) | BIL | W3-T1 | attiva |
| ALG-12 | ALG-12 (stallo per tendenza) | SEN | W3-T5 (aggancio in `caricoProssimoBase` scritto da W3-T1) | attiva |
| ALG-13 | PGR-04 | BIL | W3-T1 | assorbita |
| ALG-14 | ALG-14 (risalita dopo il rientro) | BIL | W4-T2 | attiva |
| ALG-15 | CAS-02 | BIL | W3-T1 | assorbita |
| ALG-16 | REG-03 (il perché del peso con il numero) | REG | W3-T1 (testo), W5-T1 (foglio) | assorbita |
| ALG-17 | ALG-17 (record intelligenti) | BIL | W3-T3 | attiva |
| ALG-18 | MES-02 (pavimenti) + PRN-01 | ARC | W0-T4 | assorbita |

**Metodi avanzati (MAV)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| MAV-01..09, MAV-11, MAV-13, MAV-16 | idem | SEN | W2-T3 | attive (MAV-03 assorbe ETA-10, PRI-06, PRI-16 parte; MAV-02 assorbe CAS-12; MAV-09: il tempo va in CAS-05, il conteggio del volume resta) |
| MAV-10 | MAV-10 | SEN | W3-T3 | attiva |
| MAV-12 | CAS-08 | DOS | W2-T2 | assorbita |
| MAV-14 | MAV-14 | SEN | — | **bloccata** (anche come solo testo: contiene controindicazioni) |
| MAV-15 | MAV-15 | SPC | W5-T4 | attiva |

**Specializzazione (SPE → EST e IPE)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| SPE-01 | EST-02 (massimo 2 unità prioritarie scelte tra le unità fini) | SPC | W2-T1 (volume), W5-T1 (interfaccia) | assorbita (D-P17) |
| SPE-02 | IPE-01 | DOS | W2-T1 | assorbita |
| SPE-03 | EST-03 (chi può specializzare) | SPC | W2-T1, W5-T4 | assorbita |
| SPE-04, SPE-06, SPE-18 | EST-05 (dose, rampa, frequenza, tetto per seduta 8/6, giorno di priorità) | SPC | W2-T1, W2-T5 (giorno di priorità), W5-T4 | assorbite |
| SPE-05, SPE-08 | EST-06 (mantenimento degli altri, durata, uscita; riscrive CIC-02) | SPC | W2-T1, W5-T4 | assorbite |
| SPE-07 | EST-04 (scelta per regione; coppie allungato e accorciato) | SPC | W2-T6 | assorbita |
| SPE-09, SPE-10 | IPE-02 / SEL-08 | DOS | W2-T1, W2-T6 | assorbite |
| SPE-11, SPE-12 | EST-01 (proposta di priorità dai dati, mai automatica) | SPC | W5-T4 | assorbite |
| SPE-13 | — | — | — | rinviata (serve registrare i lati) |
| SPE-14 | CST-04 (lessico) + EST-03 (nessuna specializzazione con segnali di insoddisfazione) | MOT/SPC | W5-T2, W5-T4 | assorbita |
| SPE-15 | — | — | — | rinviata (chiave nuova di dati: invariante F.1.4) |
| SPE-16 | PRG-22 riscritta + OBI-07 | ARC | W2-T6, W2-T5 | assorbita |
| SPE-17 | dati (nessun codice) | TEC | W0-T6, W1-T2, W1-T5 | — |

**Casa e poco tempo (CAS)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| CAS-01 | CAS-01 (inventario di casa) | ARC | W0-T5 (guardia), W1-T2 (`serve`), W2-T5 (domanda), W2-T6 (`consentito`) | attiva (D-P3) |
| CAS-02 | CAS-02 (scale di leve) | BIL | W3-T1 (+ dati `js/dati/scale-corpo.js`) | attiva |
| CAS-03 | — | — | — | rinviata (test in onboarding) |
| CAS-04 | PRG-13 riscritta | DOS | W2-T2 | assorbita |
| CAS-05..08 | idem | DOS | W2-T2 | attive |
| CAS-09 | REG-02 (nota con la causa) | REG | W2-T1 (`validaVolume`) | assorbita |
| CAS-10 | CAS-10 (opzione 20 minuti, testo) | DOS | W2-T5 | attiva |
| CAS-11 | MES-02 (pavimento sugli esercizi instabili senza assistenza) | ARC | W2-T4 | assorbita |
| CAS-12 | MAV-02 | SEN | W2-T3 | assorbita |
| CAS-13 | SEL-03 + libreria | ARC | W1-T5, W2-T6 | assorbita |
| CAS-14 | CAS-14 (tirata verticale senza sbarra) | ARC | W0-T5 (ponte), W2-T6 | attiva |
| CAS-15 | CAS-15 (elastici a livelli) | BIL | W3-T1 | attiva |
| CAS-16, CAS-17 | — | — | — | rinviate |
| CAS-18 | CAS-18 (fattore del tempo dal vissuto) | DOS | W2-T2 | attiva |

**Riscaldamento (RIS)**: RIS-01..13 attive, TEC, W4-T3 (RIS-01 assorbe REC-10; RIS-03 assorbe PCO-10; RIS-08 assorbe ETA-06 ed ETA-16, senza la frase «i tendini vogliono più riscaldamento» [CM]). Il costo in minuti (RIS 3.6-3.9) entra nel modello dei tempi già in W2-T2.

**Fasce d'età (ETA)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| ETA-01 | ETA-01 (età obbligatoria; sotto 13 nessun programma; 13-17 profilo minore) | SEN | W0-T2 | attiva (D-P9) |
| ETA-02 | ETA-02 | SEN | W0-T2, W2-T3 | attiva (assorbe REC-11, PRI-16) |
| ETA-03 | ETA-03 (supervisione) | SEN | W0-T2 | attiva (Solida [V]) |
| ETA-04 | ETA-04 (niente creatina, grammi, deficit, giudizi BIA ai minori) | SEN | W0-T4, W5-T3 | attiva (guardia) |
| ETA-05 | ETA-05 (sonno < 8 h = scarso per i minori) | SEN | W3-T4 (prontezza), W2-T5 (onboarding) | attiva (Moderata [V]) |
| ETA-06, ETA-16 | RIS-08 | TEC | W4-T3 | assorbite |
| ETA-07 | ETA-07 | SEN | — | **bloccata** |
| ETA-08 | ETA-08 a: base 8 settimane, poi RIR 2-3 solo su macchine e cavi (classi C, D), 8-12 ripetizioni | SEN | W4-T2 | a attiva (Borde [V]) |
|  | ETA-08 b: 6-12 ripetizioni, pesi liberi pesanti, carichi 70-85% | SEN | — | **b bloccata** |
| ETA-09 | PRG-13 (minimi 90/120 s oltre i 65) | DOS | W2-T2 | assorbita |
| ETA-10 | MAV-03 | SEN | W0-T2, W2-T3 | assorbita |
| ETA-11, ETA-12, ETA-13, ETA-17 | idem | SEN | — | **bloccate** (resta il blocco M7 e la nota di equilibrio di PRG-37, già in app) |
| ETA-14 | REC-06 a | SEN | W0-T5 | assorbita |
| ETA-15 | NUT-01, DCA-01 | PRE/SEN | W5-T3, W4-T2 | assorbita |
| ETA-18 | ETA-18 (aumenti dimezzati ≥ 65 come dice il cap. 14; via la frase «sopra i 60 serve più volume»; via «pause brevi») | SEN | W0-T4 | attiva |

**Obiettivi (OBI)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| OBI-01, OBI-12 | idem | ARC | W2-T5 | attive |
| OBI-02 | OBI-02 | PRE | W1-T4 | attiva |
| OBI-03 | OBI-03 (modificatori della tabella MES-02) | ARC | W2-T4 | attiva |
| OBI-04 | OBI-04 | DOS | W2-T1 | attiva (assorbe MES-17 per il volume) |
| OBI-05, OBI-06, OBI-08, OBI-11 | idem | PRE | W5-T3 | attive |
| OBI-07 | OBI-07 (testo «tonificare») | PRE | W2-T5 (onboarding) | attiva |
| OBI-09 | — | — | — | rinviata (schermata e dati nuovi) |
| OBI-10 | MES-02, MES-03 | ARC | W2-T4 | assorbita |
| OBI-13..16 | — | — | — | rinviate (D-P6) |
| OBI-17 | OBI-17 | PRE | — | **bloccata** |
| OBI-18 | OBI-18 | MOT | W5-T1 | attiva (Convenzione) |

**Coach IA (IA)**

| Vecchio | Finale | SC | Task | Stato |
|---|---|---|---|---|
| IA-01..05 | — | — | — | **rimossa** il 2026-10-05: Coach IA rimosso il 2026-10-05 per decisione del proprietario (client del Worker, consenso a parte, invio dei dati e commento a fine seduta); i cinque codici sono ritirati e non hanno piu un sotto-coach |

**Codici del piano**: REG-01..06 (REG, W1-T1 e W5), FRZ-01..10 (SPC, W2-T7 e W3-T6), EST-01..06 (SPC, come sopra), PAR-06..09 e CAR-18..19 (BIL, **W2-T8**, ex W3-T2). Codici PRN sopravvissuti: **PRN-01, PRN-03, PRN-14, PRN-15, PRN-19**.

---

## B. Conflitti tra note

Per ogni conflitto: posizioni, decisione, perché (con lo stato della prova) e modifica al piano.

### B1. Partenza bassa per le donne: numeri e calibrazione

- **Posizioni.** Nota donne (DON-01, DON-04): moltiplicatore **dopo** PAR-02, che resta com'è (con `sessoParteAlta` 0,9 sulla parte alta): principiante **0,60** multiarticolari della parte alta, **0,65** gambe e glutei, **0,75** isolamenti; intermedia **0,85**; salita con una tabella di salti per RPE (+20/25/20% a RPE ≤ 5, +15/20/15% a 6, +10% a 7, +5% a 8, stop al primo RPE ≥ 8). Piano cap. D: classi A-F, principiante **0,65-0,80**, intermedia **0,80-0,90**, `sessoParteAlta` tolto per non scontare due volte, calibrazione CAR-18 con «ricarico dal massimale» e tetto `T = Tcal + (1/fD − 1)/2`.
- **Decisione.** Meccanica del piano (fattore applicato **dopo** il limite [0,45; 1,8], storico che assorbe lo sconto, arrotondamento per difetto, sotto la barra, corpo libero) con i **numeri della nota donne**: `sessoParteAlta` resta (PAR-02 invariata), il fattore si legge per **distretto** (alto = tutto tranne gambe e glutei, lo stesso criterio di `sessoParteAlta`) e **tipo** (multi/isolamento). CAR-18 usa una **tabella di salti per scarto di RPE** (non il ricarico dal massimale). Tabella finale nel cap. D del piano.
- **Perché.** (1) I numeri della nota sono un calcolo dichiarato [D] su àncore viste [V, terzi: Symmetric Strength, una fonte] e mostrano che PAR oggi chiede **l'85-120% di un massimale tipico** sulla parte alta con bilanciere e macchine (lat machine 96%, chest press 85%): il fattore 0,80 del piano sulle macchine della parte alta lascerebbe la prima seduta vicina al cedimento, contro lo scopo della decisione dell'utente. I numeri del piano non hanno una derivazione. (2) **Il ricarico dal massimale del piano non può funzionare**: con il RIR contato al massimo 4 (oltre non è affidabile: Remmert, Halperin [V] nella nota forza §3.3) lo scarto massimo è di 1-2 ripetizioni, cioè **3-6% per esposizione** (Epley): la convergenza «0,65 → 0,87 → 1,0 alla terza esposizione» scritta nel piano è aritmeticamente impossibile. La nota donne lo dice (§3.6: «ogni punto di RIR vale solo +3-5%, troppo poco per recuperare il 40%»): la tabella dei salti è una **scelta di prodotto** (Convenzione), resa sicura dai tetti e dalla chiusura. (3) Togliere `sessoParteAlta` e rifare la classe A-F cambierebbe PAR-02 per tutte le donne (anche avanzate): tenerla riduce il golden da riscrivere.
- **Forza dichiarata**: «Decisione» (dell'utente) per **chi** parte basso; **Convenzione [D], ±25%** per i numeri. Etichetta visibile (C.4).
- **Modifica al piano**: cap. D riscritto (D.2-D.8); task **W2-T8** (ex W3-T2); G e D.8 con l'atleta virtuale le cui capacità vere si estraggono dalle àncore della nota donne (§3.1), non da PAR (altrimenti la prova misura il coach con il coach).

### B2. Taratura del RIR (CAR-14): tenere o correggere

- **Posizioni.** Nota forza §4: «Tenere» (coerente con Halperin 2022). Nota algoritmi §2G e U4, gap analysis B10, principianti §6, mesocicli audit 17, metodi avanzati §7.1: il **protocollo** è sbagliato (confronta la serie finale al cedimento con l'RPE delle serie precedenti, stanche: il bias va sempre nello stesso verso); cade nell'ultima settimana di carico (la peggiore per stimare); non filtra principianti, over 65, PAR-Q, core.
- **Decisione.** **Correggere** (ALG-09 → CAR-14 riscritta): previsione «quante ne faresti ancora?» **sulla stessa serie**, poi fino al cedimento, su un isolamento a macchina o cavo; una volta per blocco **nella settimana 2-3**, non nell'ultima; solo intermedi e avanzati sotto i 65, non PAR-Q, non minori, non core, prontezza ≥ 50 (MAV-04); principianti solo dalla settimana 8, facoltativa, su macchina (PRN, ex PRI-06).
- **Perché.** Il «Tenere» della nota forza riguarda il **principio** (calibrare, Halperin [V]); tre letture indipendenti del codice (`regole-ricerca.js:272-290`) mostrano il difetto del **metodo** (fatto del codice, non opinione). Lo studio di riferimento fa predire sulla stessa serie (PubMed 37036795 [V], nota algoritmi).
- **Modifica al piano**: W0-T4 (ponte: niente apprendimento da serie diverse) invariato; W3-T3 con le condizioni sopra.

### B3. Quanto vale un punto di RPE in carico

- **Posizioni.** Codice: +4% per punto (+5% in calibrazione), tetto 10-15%, citato come Helms 2018 (testo **non letto**). Note forza (AUT-01) e algoritmi (§2D): 2,4-3,0% per punto, da Epley con il RIR [C] e dalla tabella di Tuchscherer [R]; con un errore di stima di circa 1 ripetizione (Halperin [V]) il 4% insegue il rumore.
- **Decisione.** Nessuna percentuale fissa per punto: carico = `caricoPer(e1rm(peso, ripetizioni, RIR osservato), ripetizioni bersaglio, RIR bersaglio)` (dà 2,4-2,9% per punto), al massimo **2 punti (circa 6%)** per volta, mai meno di un passo; RPE considerato solo con RIR 0-4 e ≤ 12 ripetizioni; i principianti lo usano solo come **freno** (tranne CAR-18).
- **Perché.** È la stessa formula del massimale usata ovunque (coerenza aritmetica [C]); il 4% non ha una fonte letta.
- **Modifica al piano**: W3-T1 (AUT-01). La «calibrazione» di CAR-16 (+5% per punto) è sostituita da CAR-18 per tutti i principianti e per le donne fino a intermedie; CAR-16 resta per gli altri carichi stimati.

### B4. Scarico programmato o reattivo; durata del ciclo del principiante (8 o 12 settimane)

- **Posizioni.** IPE-07 e MES-01: principiante 8 settimane, scarico solo all'8ª (saltabile per MES); intermedio 5+1; avanzato 5+1 (MES: anticipabile a 4+1). PRI-03: principiante **12 settimane**, nessuno scarico prima della 12ª (verifica). Note recupero D6 ed età E9: tenere lo scarico come cautela per principianti e fragili. Codice oggi: 3+1 per principianti e intermedi (B21).
- **Decisione.** Intermedio e avanzato: **5+1** programmato, dose dalla fatica (MES-05), anticipabile dallo scarico reattivo unico (MES-07). Principiante non prudente: **12 settimane (PRN-03)**, settimane 1-11 di carico, 12ª di verifica (serie −30/−35%, RIR 3-4, carico invariato); **all'8ª settimana un controllo**: se la fatica è «media» o «alta» o un segnale di MES-07 è acceso, l'8ª diventa uno scarico «basso», altrimenti si continua. Prudenti (over 65, PAR-Q positivo, minori): blocchi 3+1 come oggi.
- **Perché.** Tutto è Convenzione o Contrastata: due RCT (2024, 2026 [R/V]) non vedono vantaggi dello scarico sulla massa; il sondaggio di Bell 2024 [R] (circa ogni 5,6 settimane) regge per chi è allenato; i programmi da principiante più usati non scaricano a calendario [R]. La nota principianti è l'unica con una tabella settimana per settimana per i novizi (fasi, aumento di volume alla 9ª, verifica e criteri di passaggio alla 12ª), e un ciclo più lungo riduce i cambi di esercizi e le nuove stime di carico (motivo concreto: nota metodi §5.2). Il controllo all'8ª recupera la prudenza di MES e delle note recupero ed età.
- **Modifica al piano**: W0-T5 tiene il ponte (8 settimane, scarico solo all'8ª, solo per i programmi creati dopo l'onda 0: D-P5); W2-T4 fa 12 settimane per i programmi v2; INT-0 e INT-2 aggiornano la soglia del collaudo DEL-01.

### B5. RIR di partenza e rampa (principianti compresi)

- **Posizioni.** PRI-02: [3,4] nelle settimane 1-2, poi [2,3], 12ª [3,4]. MES §3.4: principiante pesanti 4 → 2, macchine 3 → 2, isolamenti 3 → 1. ALG-18: pavimenti [2,3] e [1,2]. IPE §3.5: 3-4, 3, 3, 2-3, 2-3. Piano W2-T4: «RIR 3-4 → 2-3, prime 2 settimane +1 RIR (PCO-07)». Piano W0-T4: principiante [2,3] su tutte le classi.
- **Decisione.** Una tabella (MES-02, nel piano W2-T4) con:
  - principiante: [3,4] settimane 1-2; [2,3] settimane 3-11; dalla 7ª, ultima serie degli isolamenti su macchina o cavo [1,2]; 12ª [3,4]; mai 0;
  - intermedio: pesanti 3 → 1, macchine 3 → 1, isolamenti 3 → 0 (0 solo nell'ultima settimana, esercizi stabili, prontezza ≥ 60);
  - avanzato: pesanti 3 → 1, macchine 3 → 0, isolamenti 2 → 0;
  - pavimento **1 sui pesanti col bilanciere** sempre (PCO-02, collaudo RIR-02); pavimento **2** sugli esercizi instabili a casa senza assistenza (CAS-11);
  - il «+1 RIR» delle prime due settimane **non si somma**: è la riga 1-2; INT-04 (+1 alla prima esposizione) resta ma il RIR non supera mai 4;
  - modificatori per obiettivo (OBI-03): salute [2,3] ovunque; forza [2,4] sui pesanti salvo AMRAP o test; deficit: pavimento 2 sui pesanti (ex MES-17).
- **Perché.** Oltre 4 di riserva la stima peggiora (Remmert 2023, Halperin 2022 [V] nella nota forza): sommare +1 a 3-4 porterebbe a 4-5. La direzione della rampa è Convenzione + Moderata (Robinson 2024 [V]).
- **Modifica al piano**: W0-T4 (ponte: principiante [2,3] ovunque, intermedio settimana 1 almeno 2 su macchine e isolamenti, pavimento 1 sui pesanti), W2-T4 (tabella), W2-T3 (aggancio in `rirBersaglioBase`).

### B6. Volume per muscolo: fasce e conteggio

- **Posizioni.** IPE §3.2: fasce per livello uguali per tutti i muscoli (principiante 6-10, intermedio 10-16, avanzato 12-20; generale 4-8 / 6-10 / 8-12) e pavimenti di serie dirette. SPE §3.1: fasce diverse per muscolo (es. petto 8-14, polpacci 8-12, deltoide posteriore 6-12 per l'intermedio) e pesi indiretti graduati 0,2-0,8 (§3.2). Piano W2-T1: fasce IPE.
- **Decisione.** Tabella unica `VOLUME_UNITA` (serie frazionarie a settimana, ipertrofia; in `soglie-volume.js`):

| Unità | Principiante | Intermedio | Avanzato | Mantenimento (spec., poco tempo) | Note |
|---|---|---|---|---|---|
| Petto, dorsali, quadricipiti | 6-10 | 10-16 | 12-20 | 4-6 | fasce IPE (≥ 10 negli allenati: Solida [S]) |
| Grande gluteo | 4-8 | 8-14 | 10-16 | 0-3 | riceve molto indiretto; obiettivo glutei: 8-12 / 12-18 / 14-20 |
| Spessore della schiena | 4-8 | 6-12 | 8-14 | 2-4 | SPE |
| Femorali | 4-8 | 8-12 | 10-14 | 3-4 | ≥ 0,6 × quadricipiti e almeno una flessione del ginocchio a settimana (collaudo EQ-03) |
| Deltoide laterale | 4-6 | 8-14 | 10-18 | 3-4 | SPE |
| Deltoide posteriore | 3-5 | 6-12 | 8-14 | 2-3 | SPE |
| Bicipiti | 4-6 | 8-14 | 10-18 | 3-4 | SPE |
| Tricipiti | 4-6 | 6-12 | 8-16 | 3-4 | SPE |
| Polpacci | 4-6 | 8-12 | 10-16 | 4-6 | SPE |
| Adduttori | 0-2 | 3-8 | 4-10 | 0-2 | frazionari |
| Abduttori | 0-2 | 2-6 | 3-8 | 0 | |
| Addome | 2-4 | 4-8 | 6-10 | 0-2 | |
| Deltoide anteriore | nessun minimo | max 14 | max 16 | — | solo controllo dell'eccesso (collaudo VOL-02) |

  Obiettivo salute/generale: unità grandi 4-8 / 6-10 / 8-12, piccole nessun minimo diretto (≥ 2 frazionarie). Forza: unità grandi nella metà bassa della fascia, piccole a «mantenimento». Deficit (OBI-04): 85-90% del picco. **Conteggio**: credito 1 al bersaglio, **0,5** al secondario che è un vero motore, **0** con eccezione scritta (femorali in squat e leg press: Kubo 2019 [R]); niente pesi 0,2-0,8.
  **Pavimenti di serie dirette** (IPE-02, intermedio e avanzato, ipertrofia e ricomposizione; dalla tabella per giorni di SPE §6.1, con i femorali aggiunti da IPE):

| Unità | ≥ 4 giorni | 3 giorni | 2 giorni | Forza | Salute, dimagrimento |
|---|---|---|---|---|---|
| Deltoide laterale | 6-8 | 4-6 | 3 | 2-3 | 0-2 |
| Deltoide posteriore | 4-6 | 3-4 | 2 | 2 | 0-2 |
| Bicipiti, tricipiti | 4-6 | 4 | 2 | 2 | 0-2 |
| Polpacci (2 esercizi da 6 serie) | 8 | 6 | 3-4 | 3 | 2 |
| Femorali, flessione del ginocchio | 4-6 | 4 | 2 | 2 | 2 |
| Addome | 4-6 | 4 | 2 | 2 | 2 |

- **Perché.** L'unico numero con base Solida è «≥ 10 serie negli allenati» (Schoenfeld 2017, ACSM 2026 [S]) e vale per i muscoli grandi; le cifre per singolo muscolo di SPE sono «stime di lavoro» [M] (la nota lo dice) ma sono le uniche differenziate, e i muscoli piccoli ricevono già molto indiretto. I pesi graduati sono [M] con ±0,2 di incertezza, lo stesso ordine delle differenze tra loro: il valore piatto 0,5 ha almeno una meta-regressione dietro (Pelland [S], Moderata).
- **Modifica al piano**: W2-T1 usa questa tabella; W1-T2 crediti 0/0,5/1; INT-2a aggiorna le soglie del collaudo VOL-01/VOL-02/DIR-01 a questa tabella (con `VERSIONE_CRITERI` alzata).
- **Crediti coerenti (2026-10-05, INT-2a, M4 della revisione Opus dell'onda 1).** I crediti di `attributi-esercizi.js` devono essere coerenti prima che W2-T1 li usi: la nota biomeccanica (§296) ammette per la cerniera dell'anca due co-bersagli (gluteo 1 e femorali 0,5, oppure l'inverso) e il file ne usava due (Stacco Rumeno: gluteo; Good Morning: femorali), gonfiando i glutei (VOL-02:glutei) e sgonfiando i femorali (VOL-01:femorali). **Scelta**: in tutta la famiglia della cerniera (Stacco Rumeno col bilanciere, coi manubri, a una gamba; Good Morning) femorali 1 e gluteo 0,5; negli affondi (Bulgari e Multipower compresi) quadricipiti 1 e gluteo 0,5; l'Extrarotazione al Cavo 0,5 al deltoide posteriore (è la cuffia). Restano a gluteo 1 lo Swing (balistico) e lo Stacco Sumo. Le righe che non danno il credito pieno al bersaglio di `DETTAGLI` portano `eccezione` (la scelta degli esercizi tiene il gluteo come bersaglio). Forza: Convenzione (la nota ammette tutte e due le scelte).

### B7. Tetto di serie per muscolo e per seduta

- **Posizioni.** IPE-06: morbido 8, duro 11 frazionarie (Remmert 2025, preprint [P]). SPE §5.2: in specializzazione 8 (6 per i muscoli piccoli; Henselmans ≤ 6 [V]). PCO H-05: 9-13.
- **Decisione.** Generale: **morbido 8, duro 11**. Unità prioritaria in specializzazione: **duro 8** (6 per deltoidi, braccia, polpacci, addome). Frequenza 1 scelta dall'utente: duro 11.
- **Perché.** Il preprint è l'unica fonte quantitativa; il tetto più basso in specializzazione serve a distribuire le serie in più sedute (Contrastata, prudenza).
- **Modifica al piano**: W2-T1, W5-T4.

### B8. Pause tra le serie

- **Posizioni.** Codice: per tipo (pesante, macchina, isolamento), donne ×0,85. IPE §3.4: pesanti 150-180 s, macchine/manubri 90-120, isolamenti 60-90, polpacci e laterali 45-60. CAS-04 (casa): corpo libero 75 s, manubri 90, isolamenti 60, elastici e tenute 45. Età (ETA-09): oltre i 65 almeno 90 s sui multiarticolari, 120 s sui pesanti. Collaudo RX-02: 158 s su Hyperextension e Ponte Glutei.
- **Decisione.** Una tabella per **classe** (attributo W1-T2) e obiettivo, in `soglie-tempo.js`:

| Classe | Ipertrofia, ricomposizione | Forza | Salute, dimagrimento | Minimo (taglio per il tempo) |
|---|---|---|---|---|
| A bilanciere pesante | 120-180 s | 180-240 s | 120 s | 120 s (forza: nessun taglio) |
| B multiarticolare libero (manubri, corpo libero) | 90 s (corpo libero 75 s) | 120 s | 75 s | 60 s |
| C multiarticolare guidato | 90-120 s | 120 s | 90 s | 75 s |
| D, E isolamento | 60-90 s (polpacci e laterali 45-60 s) | 90 s | 60 s | 45 s |
| F core, tenute, elastici | 45 s | 45 s | 45 s | 30 s |

  Oltre i 65: almeno 90 s su B e C, 120 s su A. Donne: vedi D-P7.
- **Perché.** Singer 2024 (oltre 60-90 s poca differenza per la massa) contro ACSM 2026 (2-3 minuti [S]): Contrastata; per la forza con carichi alti le pause lunghe hanno base (ACSM 2009, Schoenfeld 2016 [R]). Accorciare le pause è il primo intervento per stare nel tempo (CAS-07).
- **Modifica al piano**: W2-T2.

### B9. Età minima

- **Posizioni.** ETA-01: soglia **14** (consenso digitale in Italia, [CM] da verificare con un legale). Decisione dell'utente: sotto **13** nessun programma, 13-17 profilo minore.
- **Decisione.** **13** (decisione dell'utente) per la logica di allenamento; la soglia legale dei dati (informativa privacy, cap. 8 «[ETÀ MINIMA, da decidere]») è un tema separato (G.1).
- **Modifica al piano**: W0-T2 invariato (13).

### B10. Over 65

- **Posizioni.** Codice: RIR 3-4 per sempre, 8-12 ripetizioni, aumenti **non** dimezzati per età (contro il cap. 14). Piano («REC-13»): dopo 6 settimane RIR 2 sulle macchine e potenza sul primo multiarticolare stabile, aumenti dimezzati per età. ETA-08: base 6-8 settimane, poi RIR 2-3 e 6-12 ripetizioni (Borde [V]: 2-3 serie, 7-9 ripetizioni, 120 s; posizioni NSCA [CM]). PRI-16: «potenza» solo su leg press o alzata dalla sedia.
- **Decisione.** Base di **8 settimane** (RIR 3-4, 8-12 ripetizioni, aumenti dimezzati); poi, se ≥ 70% delle sedute fatte e nessun dolore recente, **RIR 2-3 solo sulle classi C e D** (macchine e cavi), ripetizioni ancora 8-12, aumenti relativi normali (PGR-01); «potenza» solo su macchina o alzata dalla sedia; mai cedimento né tecniche G2-G5 (MAV-03); pause minime 90/120 s. Pesi liberi pesanti, 6-12 ripetizioni e carichi 70-85% **bloccati** (ETA-08 b). Dai 75 anni la base resta finché ETA-17 non è verificata.
- **Perché.** Aumentare lo stimolo a una popolazione vulnerabile si fa solo con prove viste: Borde [V] sostiene 2-3 serie e carichi moderati (51-69% «più efficace» nel complesso), non i carichi alti senza supervisione (le posizioni che li dicono sono [CM]). 8 settimane è il bordo prudente di ETA-08 e allinea il cambio al ciclo.
- **Modifica al piano**: W0-T4 (ETA-18: aumenti dimezzati ≥ 65 come nel cap. 14); W4-T2 (ETA-08 a).

### B11. Modello dei tempi

- **Posizioni.** Piano W2-T2: `setup + serie × (ripetizioni × 3 s × (2 se unilaterale) + pausa) − ultima pausa + rampa + riscaldamento generale`. IPE §3.8: 6 minuti di riscaldamento, 1 per cambio, 40 s + pausa per serie. CAS-05: tempo per serie `S = c + n × t_rip` per classe, cambi `X`, unilaterali, coppie (`T_coppia`), riscaldamento `W(M)`, fattore personale `f`. RIS-12: `G + Σ rampa` con tetti.
- **Decisione.** CAS-05 per serie, cambi, unilaterali e coppie; il riscaldamento è quello di RIS (§3.7 generale + §3.9 rampa, tetti §3.6) e non il `W(M)` di CAS (niente doppio conteggio); fattore personale CAS-18 dopo 3 sedute con durata registrata (0,8-1,4). Stesso modello per generatore e interfaccia (oggi l'interfaccia toglie 8 minuti: CAS H-03).
- **Modifica al piano**: W2-T2 (con `oggi.js`, `giorno.js`, `aggiungi-allenamento.js` tra i file, liberi in onda 2).

### B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08)

- **Posizioni.** Collaudo DUR-02: «la seduta spreca oltre il 25% del tempo» (82,8% pesato oggi; 99% a 90 minuti). CAS §5.4: «il tempo è un tetto, non un obiettivo: se le serie bastano, la seduta finisce prima». PRI-08: principianti al massimo 40 minuti (settimane 1-2) e 50.
- **Decisione.** D-P10: il tempo è un tetto. Il collaudo DUR-02 (in INT-2a, `VERSIONE_CRITERI`) conta uno spreco solo se **almeno un'unità è sotto la sua fascia** e la seduta usa meno del 75% dei minuti; esclude i principianti entro la loro durata massima. La seduta mostra «Dura circa # minuti: il lavoro utile per te è già tutto qui».
- **Modifica al piano**: W2-T2, INT-2a, G (tempo).

### B13. Polpacci

- **Posizioni.** SEL-08: il seduto (soleo) solo con ≥ 2 esercizi o ≥ 6 serie. SPE-10: sempre 2 esercizi, ≥ 8 serie. IPE: 6-8 / 8-10 dirette.
- **Decisione.** Pavimenti per giorni (B6): con 6 serie o più entrano in piedi e seduto (SEL-08), quindi da 3 giorni in su automaticamente; Kinoshita 2023 [V] (10 serie a settimana) sostiene la dose.

### B14. Bicipiti e croci (D-P8)

- **Posizioni.** Biomeccanica D1/D8: BIO-05 dà +0,5 alle croci ai cavi, RIC-03 +1,5 e lo scambio verso le croci coi manubri (contraddizione nel codice); PRG-23 aggiunge Scott/Spider («Pedrosa 2025») mentre il bonus «allungato» va all'inclinata.
- **Decisione.** D-P8 (sezione D).

### B15. Glutei: hip thrust o squat

- **Decisione.** Entrambe le famiglie, nessuna gerarchia (Plotkin 2023 [V] nella nota specializzazione; DON E); SEL-16 (un movimento «in alto» e uno «allungato» a settimana per l'obiettivo glutei) esce come Convenzione.

### B16. Scala degli stalli e numero di mancati

- **Posizioni.** CAR-07: due mancati = −10% per tutti. ALG-13: 2 per la scala S1, 3 per S2/S3. PGR-04: un mancato **grave** riduce subito (−5% principiante, −7,5% altri). PCO-01: prima cambia lo schema (3×10 → 3×8 → 3×6). MES-19: prima la diagnosi (fatica, stimolo, tecnica). PRI-12: lo schema 5×3 → 6×2 → 10×1 solo con obiettivo forza.
- **Decisione.** Una scala, nell'ordine: mancato lieve → stesso carico, +30-45 s, scala più lenta; mancato grave → −5%/−7,5% subito; ripetuto (2 in S1, 3 in S2/S3) → gradino di schema (PCO-01; per i principianti senza obiettivo forza: stesso peso, +30 s, poi −5%); stallo per tendenza (ALG-12) → diagnosi MES-19 (fatica → scarico; stimolo → variante o serie; tecnica → carico giù); infine reset −10%. Prudenti, over 65, dolore: come oggi (2 mancati, reset).

### B17. Scarico reattivo

- **Decisione.** MES-07 (≥ 2 segnali distinti, almeno uno tra prontezza, forza, deriva dell'RPE; protezioni di distanza) sostituisce DEC-06, PRZ-04, STR-01, CAR-10 come cause; CST-09 resta il ramo «stanchezza che dura 14 giorni: riposo e rinvio al medico» (Meeusen 2013 [V], Solida per lo spettro). B9 («Dura» = pesante) si corregge già in W0-T5 (MES-08).

### B18. Prontezza e «spingi»

- **Posizioni.** PRZ-01 pesi 30/25/25/20 (fonte divulgativa) contro CST-07 (quattro voci non pesate 0-8, «energia» al posto di «voglia»). PRZ-03 +1 serie a prontezza ≥ 70 contro CST-08 (+1 solo a condizioni), MES (ritirarlo: B18, «volume creep»), PRI-07 (mai ai principianti).
- **Decisione.** CST-07 (W3-T4). **PRZ-03 ritirata** come aggiunta giornaliera (D-P14): l'unico «+1» è quello settimanale per unità di PCO-03, che scatta solo se valgono anche le condizioni di CST-08.

### B19. Specializzazione: quanto agli altri muscoli

- **Posizioni.** IPE-13: altri ≥ 6 (mai < 4). SPE-05: 50% dello standard, mai sotto «mantenimento». MES-16: ≥ 1/3 e ≥ 4-6.
- **Decisione.** Altri muscoli: `max(mantenimento della tabella B6, 50% del picco standard)`; carico e RIR invariati; massimo 2 blocchi di 4-8 settimane (default 6) sullo stesso muscolo, poi almeno 4 settimane standard (EST-06). Bickel 2011 e Spiering 2021 sono [M]: Convenzione + Moderata (da verificare).

### B20. Rientro dopo una pausa

- **Decisione.** Una catena sola (W4-T2): CST-01 congela il calendario con le soglie di MES-15 (≤ 6 giorni nulla; 7-13 la rampa non avanza; 14-27 si riparte dalla settimana 1 del blocco e il calendario scorre; ≥ 28 nuovo blocco); CAR-04 riduce i carichi (−10/−20/−30/−50%, giorni doppi oltre i 65); CST-02 riduce le serie (−25%, −10%, poi piano) e aggiunge +1 RIR per 2 sedute; ALG-14 fa risalire del 5% a seduta (2,5% principianti e over 65) fino al carico di prima; REC-08 (4 fasi guidate dal dolore) vale solo dopo un fastidio. Tutto Convenzione con base [V] sul recupero rapido (PMID 32017951) e sullo stop di 2-4 settimane.
- **Deroga datata (2026-10-05, revisione Opus dell'onda 0; decisione del delegato del responsabile di prodotto).** Fino a W4-T2 i giorni di pausa sono i **giorni veri anche oltre i 65 anni**, sia per CAR-04 (carichi per esercizio) sia per RIC-05 (serie del piano: 14 giorni per tutti). *Motivo*: con il conteggio doppio 5 giorni di pausa, normali con 2 sedute a settimana, davano a un over 65 −10% di carico e −25% di serie; la catena completa con le sue soglie (CST-01 con MES-15: 7-13 giorni nulla) arriva in W4-T2 e riporta lì il trattamento dell'età. La riga «giorni doppi oltre i 65» di questa decisione resta l'obiettivo di W4-T2, non il comportamento dell'onda 0.

### B21. Proteine e passi

- **Decisione.** NUT-01 (1,6 g/kg di peso, 2,0-2,4 in deficit, stesso numero per sesso; Morton 2018 [V] V2) sostituisce COR-03 (2,35-2,75 g/kg di massa magra; 1,75 per le donne, senza fonte). AER-04 (circa 7.000 passi per la salute, Ding 2025 e Paluch 2022 [V]) sostituisce i 10-12 mila; per il dimagrimento l'aumento graduale sulla propria media è Convenzione.

### B22. Carichi di partenza degli uomini

- **Posizioni.** Nota donne §3.5 [D]: lo stesso metodo dice che anche gli uomini principianti partono circa il 30% troppo alti. Decisione dell'utente: carichi degli uomini invariati.
- **Decisione.** Invariati (D-P1). Il rischio è coperto dalla calibrazione rapida CAR-18 estesa a tutti i principianti (riga «partenza normale»), dall'INT-04 e da CAR-17. Domanda aperta G.2.

---

## C. Regole bloccate dalla verifica

### C.1 Criterio

Una regola (o una sua parte) è **bloccata** se **tutte e due** le condizioni valgono:
1. la sua base è solo conoscenza del modello ([M], [N], [K], [CM], [NV], †) o un ricordo «da verificare»;
2. tocca sicurezza, salute, gravidanza, minori, temi medici o nutrizionali **e** fa una di queste cose: afferma un fatto clinico o nutrizionale all'utente; prescrive numeri o esercizi a una popolazione vulnerabile; **aumenta** lo stimolo per una popolazione vulnerabile.

**Non** sono bloccate: le correzioni di fatti del codice (bug, contraddizioni tra testo e codice, guardie mancanti); le regole che **tolgono o riducono** (guardie: meno tecniche, meno numeri, niente deficit); i rinvii generici a un professionista **senza** affermazioni cliniche; le regole di allenamento che non toccano la salute (per quelle vale «Convenzione» con etichetta visibile, C.4). Per questo SEL-05, SEL-10, SEL-16 (che la nota biomeccanica chiama «bloccate») qui non lo sono: SEL-05 e SEL-10 sono assorbite da regole con base [V], SEL-16 non tocca la salute.

**Cancello** (protocollo E.0 del piano): un agente non implementa una regola bloccata né la sua parte b; la sblocca solo una nota di ricerca aggiornata con le query qui sotto (due fonti indipendenti) **e** una riga datata in questo registro. Nel catalogo una regola bloccata porta «(bloccata)» e `regolaAttiva()` restituisce sempre `false` (W1-T1).

### C.2 Elenco (16 regole; 7 sono bloccate solo in parte)

| # | Regola (parte) | Perché è bloccata | Query che la sbloccano (dalle appendici delle note) |
|---|---|---|---|
| 1 | **REC-06 b** pressione alta: campo nuovo, RPE ≤ 7, regola clinica sull'apnea | [N]; ipertensione | recupero App. A n. 1 `resistance training hypertension blood pressure Valsalva maneuver safe lifting`; n. 2 `AHA scientific statement resistance exercise cardiovascular disease`, `ACSM preparticipation health screening 2015 recommendations symptoms`; età App. B n. 17 `resistance training hypertension blood pressure Valsalva older adults`; riscaldamento n. 21 `Valsalva blood pressure resistance exercise safety hypertension` |
| 2 | **REC-07 b** «sopra il collo» → seduta leggera; giorni di ripresa dopo la febbre | [N]; malattia | recupero n. 17 `exercise during respiratory infection "above the neck" evidence`; `return to exercise after viral illness myocarditis guidance` |
| 3 | **REC-09 b** rabdomiolisi: «urine scure → pronto soccorso» | [N]; affermazione clinica | recupero n. 18 `exertional rhabdomyolysis resistance training risk factors beginners` |
| 4 | **REC-12 b** (= DON-12) gravidanza e post-parto: esercizi da evitare, posizione supina, rampa del post-parto, domande sul pavimento pelvico | [N]/[M]; gravidanza | recupero n. 10 `ACOG physical activity exercise pregnancy committee opinion`, `pregnancy resistance training safety systematic review`, `supine position exercise pregnancy guideline`; n. 11 `postpartum return to exercise guideline pelvic floor`, `returning to running postnatal guideline`; donne App. B n. 27-29 |
| 5 | **DON-13** (ex «REC-14») menopausa e osso: carichi alti dopo 8-12 settimane, potenza, filtro con osteoporosi | [M]; aumenta lo stimolo, tema medico | donne n. 30 `LIFTMOR Watson 2018 high-intensity resistance impact training postmenopausal`, n. 31 `resistance training bone mineral density postmenopausal women meta-analysis`, n. 32 `Giangregorio 2014 Too Fit To Fracture exercise recommendations osteoporosis`; recupero n. 6, n. 9; età n. 15, n. 16 |
| 6 | **DCA-03 b** (= DON-14) lista dei segnali con significato clinico (RED-S, amenorrea, ferro) | [M]; nutrizione e salute | cardio App. B n. 20 `IOC consensus relative energy deficiency in sport 2023 update`, `low energy availability threshold 30 kcal/kg FFM menstrual`, `female athlete triad body fat percentage threshold amenorrhea`; n. 21 `calorie tracking apps eating disorder symptoms`, `eating disorders strength training athletes screening referral`; donne n. 34-36 |
| 7 | **DON-10 b** frase «gli studi mostrano effetti piccoli» e grafico personale dell'RPE per fase del ciclo | [M]; dato di salute | donne n. 24 `menstrual cycle phase resistance training meta-analysis McNulty Elliott-Sale`, n. 25, n. 26; recupero n. 7 |
| 8 | **ETA-07** dolori da crescita (sotto la rotula, tallone) e rinvio a una settimana | [CM]; minori, affermazione clinica | età n. 41 `Osgood-Schlatter Sever disease resistance training adolescents`; n. 42 `spondylolysis low back pain adolescent weightlifters` |
| 9 | **ETA-08 b** over 65: 6-12 ripetizioni, pesi liberi pesanti, carichi 70-85% | [CM]; aumenta lo stimolo a una popolazione vulnerabile | età n. 1 `Fragala 2019 NSCA position statement resistance training older adults`, n. 3, n. 8 `high-intensity versus low-intensity resistance training older adults meta-analysis`, n. 9; recupero n. 4 |
| 10 | **ETA-11** equilibrio: dose (≥ 3 volte, mini-sedute) e frase «riduce il rischio di cadere» | [CM]; affermazione di salute | età n. 5 `Cochrane 2019 exercise falls prevention community-dwelling older adults Sherrington`, n. 6 `Otago exercise programme falls randomised trial meta-analysis`, n. 7; riscaldamento n. 23 |
| 11 | **ETA-12** test funzionali con norme e soglie di rinvio (TUG, 5 alzate, equilibrio, passo) | [CM]; soglie cliniche | età n. 27-31 (`30-second chair stand test norms older adults Rikli Jones CDC STEADI`, `five times sit to stand reference values Bohannon cut-off falls`, `handgrip strength norms by age sex Dodds EWGSOP2 2019 cut-offs`, `timed up and go reference values meta-analysis cut-off fall risk`, `gait speed survival Studenski 2011 sarcopenia 0.8 m/s`) |
| 12 | **ETA-13** domande su cadute, osteoporosi, anticoagulanti, capogiri; filtro di flessione e rotazione sotto carico | [CM]; screening medico | età n. 16 `exercise osteoporosis position statement spinal flexion vertebral fracture`, n. 21 `polypharmacy fall risk increasing drugs exercise older adults`, n. 26 `PAR-Q+ 2023 Warburton`; recupero n. 3, n. 6 |
| 13 | **ETA-17** modo «fragile» (criteri, visita prima di iniziare) | [CM]; tema medico | età n. 32 `frailty resistance training multicomponent exercise Vivifrail Cochrane`, n. 47, n. 26 |
| 14 | **MAV-14** BFR (anche come scheda informativa: contiene controindicazioni) | [N]; affermazioni cliniche | metodi avanzati App. A n. 18 `blood flow restriction position stand Patterson 2019 safety`, n. 19, n. 20, n. 22; età n. 48 |
| 15 | **TAP-01** (= MES-18) taper prima di test o gara | [M] (Bosquet 2007 ricordato) | forza App. A n. 5 `Bosquet 2007 tapering meta-analysis performance volume reduction`; `tapering resistance training strength meta-analysis`; `Mujika tapering strength athletes` |
| 16 | **OBI-17** umore, stress e sonno («muoversi aiuta umore e sonno») | †; affermazione di salute | obiettivi App. B n. 42 `Singh 2023 physical activity depression anxiety distress overview of reviews`, n. 43, n. 44, n. 45 |

Parti **sbloccate** delle regole 1-7 (si implementano): REC-06 a, REC-07 a, REC-09 a, REC-12 a, DCA-03 a, PRZ-01 invariata (A.3).

### C.3 Non bloccate, anche se toccano popolazioni o salute (motivo in una riga)

| Regola | Motivo |
|---|---|
| ETA-01..04 (minori: età, divieti, supervisione, niente numeri) | guardie (tolgono) + posizioni [V] (Lloyd, AAP) |
| ETA-05 (sonno 8-10 h ai minori) | [V] (AASM, osservazionale) |
| ETA-08 a (macchine dopo 8 settimane) | Borde [V] |
| ETA-18, REC-06 a | contraddizioni tra testo e codice |
| REC-01, REC-02, REC-04, REC-05, REC-08 | [V] (Silbernagel, Cochrane, consenso 2018) + rinvio generico |
| REC-07 a, REC-12 a, DCA-01, DCA-02, CST-10, CST-11, NUT-02, PRN-15, CAS-11, MAV-02, MAV-03 | guardie: tolgono, riducono o rinviano senza affermazioni cliniche |
| NUT-01, AER-01..03 | [V] (Morton 2018, OMS 2020, Schumann 2022) |
| CST-09 | [V] Meeusen 2013 (Solida per lo spettro); soglie Convenzione |
| DCA-03 a | toglie un'affermazione senza base |

### C.4 Numeri che escono come «Convenzione» con etichetta visibile

Ogni voce delle soglie porta `forza` (B.4 del piano). Per queste regole il foglio «Perché?» (W5-T1) mostra accanto al numero «**Scelta prudente del coach (Convenzione): non è un risultato di studi**»; per le «Decisione» «**Decisione di prodotto**»; per le «Provvisoria» «**Numero di partenza, in verifica**».

| Area | Regole e numeri |
|---|---|
| Carichi di partenza e calibrazione | PAR-06 (0,60/0,65/0,75/0,85: Decisione per il «se», Convenzione [D] ±25% per i numeri), PAR-08 (0,9 × barra), CAR-18 (tabella dei salti e tetti), PAR-01 (livello mancante = principiante) |
| Pause | PRG-13 (tabella B8), PRG-20 (−15% donne, fonte unica: D-P7) |
| Volume | `VOLUME_UNITA` e pavimenti (B6) tranne «≥ 10 negli allenati»; IPE-06 (8/11, preprint: «Provvisoria» finché non esce la versione rivista); EST-05/06 (dosi della specializzazione) |
| Tempo | CAS-05 (costanti S, X), CAS-18, RIS 3.6-3.9 (minuti), PRN durata massima 40/50 |
| Mesociclo e scarichi | MES-01/PRN-03 (5+1, 12 settimane), MES-02 (tabella RIR), MES-03 (fattori della rampa), MES-05 (dosi), MES-07 (soglie dei segnali), MES-13 |
| Progressione | PGR-01 (percentuali e scale S1-S3), PGR-02, PGR-04 (−5/−7,5%), PCO-01, ALG-11, ALG-12 (soglie della tendenza), ALG-14 (5%/2,5%), CAR-04 (−10/−20/−30/−50%), CST-02 |
| Prontezza e costanza | CST-07 (soglie 75/50/37%), CST-08, CST-09 (14 giorni), CST-10, PCO-03 |
| Sicurezza | REC-02/REC-04 (soglie 3/10 e 6 settimane), REC-08 (−30/−20/−10%), DCA-01 e CST-11 (IMC 18,5), PRN-15 (IMC 30), ETA-08 a (8 settimane) |
| Corpo | AER-04 (dimagrimento), PES-01 (4 pesate in 14 giorni), PES-03 (1 kg), OBI-04 (85-90%) |
| Tecniche | budget MAV §4.1, posizione nel blocco MAV §4.2 |
| Standard | STD-01 (tabelle di terzi, livello 3), criteri di passaggio G1-G5 |

---

## D. Decisioni di prodotto (prese; rispondono al cap. H del piano)

L'utente ha dato carta bianca («hai carta bianca»); le decisioni 1-9 sono state prese dal delegato del responsabile di prodotto il 2026-10-05; la 1 incorpora la decisione dell'utente dello stesso giorno («inizia con carichi bassi fino a livello intermedio nelle donne»).

| # | Decisione | Dove nel piano |
|---|---|---|
| **D-P1** | La **calibrazione rapida basata sull'RPE (CAR-18) vale per tutti i principianti, uomini compresi**; il **fattore di partenza bassa** vale **solo per le donne fino al livello intermedio**; i carichi di partenza degli uomini **non cambiano**. Per gli uomini CAR-18 usa la riga «partenza normale» (salti dimezzati) | cap. D, W2-T8 |
| **D-P2** | I circa 30 esercizi nuovi escono **con la scheda tecnica e senza disegno**. **Verifica fatta (2026-10-05)**: l'app gestisce già il disegno mancante: `slotImmagine` (`js/dati/disegni-esercizi.js:51`, chiamata solo da `openExerciseInfo` in `js/dati/schede-tecniche.js:121`) prova `img/<nome>.png`, e su `onerror` aggiunge la classe `vuoto` e mostra «Immagine in arrivo» (tradotta in en/es/de, `css/scheda-esercizio.css:59`); oggi 121 esercizi su 140 sono già senza disegno. Non serve un segnaposto nuovo. W1-T5 aggiunge una prova: la scheda di ogni esercizio nuovo mostra il riquadro vuoto senza errori in console, e nessun consumatore di `schedaUnica(nome).img` presume che il file esista | W1-T5 |
| **D-P3** | **Elastici, kettlebell, panca e anelli** diventano attrezzi selezionabili (palestra e casa), insieme a sbarra e manubri (kg del più pesante): esercizi nella libreria (W1-T5), attributo `serve` (W1-T2), domanda in onboarding e in Opzioni (W2-T5), filtro in `consentito` (W2-T6). Fino ad allora W0-T5 esclude a casa ciò che richiede sbarra, parallele, sedia romana o panca per lombari | W0-T5, W1-T2, W1-T5, W2-T5, W2-T6 |
| **D-P4** | Il **taper TAP-01 resta spento** di base (ed è bloccato, C.2 n. 15) | W3-T6 |
| **D-P5** | **Programmi salvati: mai cambiati in silenzio.** Una scheda in Oggi propone «Aggiorna il programma» con Annulla (W5-T5); altrimenti le regole nuove valgono dal **prossimo ciclo**. Classificazione: (a) correzioni **di sicurezza e di calcolo della seduta** (RIR troppo bassi, tecniche non idonee, carichi composti nello scarico, esercizio controindicato con un fastidio dichiarato) valgono subito, con una riga nel «perché» e, se cambiano un esercizio, come **proposta** con Annulla all'apertura della seduta; (b) correzioni **di struttura** (giorni, esercizi, settimane di scarico, durata) solo per i programmi creati dopo l'aggiornamento o al prossimo ciclo | REG-04, REG-06, W0, W5-T5 |
| **D-P6** | **Obiettivi nuovi** (correre 5K, abilità, schiena-collo-spalle, sport) rinviati a un'onda dopo la v2. Il modello dei dati non li impedisce: `profilo.obiettivi` accetta id sconosciuti e `buildProgram` ripiega su «salute» senza perderli; `prog.cardio` è generico (minuti per tipo); la modalità passa da `specialitaStruttura` (registro estendibile) | W1-T4 (prova), W2-T5 |
| **D-P7** | **Pause più corte per le donne** (PRG-20, −15%, fonte unica): solo sugli **isolamenti (D, E)** e sui multiarticolari B e C con **≥ 8 ripetizioni** (≈ sotto l'80% di 1RM); mai sulla classe A né con ≤ 6 ripetizioni; minimi 45 s (F), 60 s (D, E), 75 s (B, C); etichetta «Convenzione» | W2-T2 |
| **D-P8** | **Bicipiti**: priorità alle varianti in **allungamento** (curl su panca inclinata, curl Bayesiano ai cavi) come primo esercizio; Scott e Spider come secondo esercizio della settimana; PRG-23 aggiunge il curl inclinato, non lo Scott. **Croci**: tolti i punteggi contraddittori (BIO-05 +0,5 ai cavi e RIC-03 +1,5 e scambio verso i manubri): cavi e manubri **alla pari**, ordine da `PRIORI` | W0-T2, W0-T5, W0-T6, W2-T6 |
| **D-P9** | **Età**: sotto **13** anni nessun programma; **13-17** profilo minore (ETA-02..04); età **obbligatoria** in onboarding e controllata anche in Opzioni | W0-T2 |
| **D-P10** | **Il tempo è un tetto, non un obiettivo**: il risolutore si ferma al bersaglio di volume; il collaudo DUR-02 conta lo spreco solo con un'unità sotto la fascia (B12); principianti al massimo 40 minuti nelle settimane 1-2 e 50 dopo, anche se dichiarano di più, con il messaggio onesto (PRI-08). *Motivo*: riempire 90 minuti oltre il bisogno costa recupero e aderenza senza crescita (rendimenti decrescenti, Pelland [S]) | W2-T2, INT-2a |
| **D-P11** | **Pullover con Manubrio**: bersaglio **dorsali** (petto secondario). *Motivo*: oggi la sua classe è il petto e propone la panca come alternativa (biomeccanica P6); come dorsali diventa la tirata verticale di riserva a casa senza sbarra (CAS-14) | W0-T6 |
| **D-P12** | **Livello mancante = principiante** nelle stime di carico (oggi «intermedio», ×1,3). *Motivo*: guardia; non cambia i carichi di chi ha un profilo (l'onboarding chiede sempre il livello) | W2-T8 (PAR-01) |
| **D-P13** | **Niente campo «barra più leggera»** in v2 (DON-03 punto 2). *Motivo*: PAR-08 risolve con la variante dello stesso muscolo; una domanda in più rallenta l'avvio | W2-T8 |
| **D-P14** | **PRZ-03 ritirata**: nessuna serie in più dalla prontezza del giorno; l'unico «+1» è quello settimanale per unità (PCO-03) con le condizioni di CST-08. *Motivo*: «tutto normale» vale circa 78 e scatterebbe quasi ogni giorno (B18), scavalcando i tetti e il tetto dei principianti | W0-T4 (ponte), W3-T4 |
| **D-P15** | **Principianti: 12 settimane** con controllo all'8ª (B4) | W2-T4 |
| **D-P16** | **Tocco a 3 scelte dopo la prima serie** (facile / giusta / dura = RPE 6 / 8 / 9,5) per i principianti nelle prime 3 esposizioni a un esercizio: è l'ingresso di CAR-18. *Motivo*: senza RPE la calibrazione è lenta (CAR-19); la scala a 9 valori è troppo fine per chi non sa stimare il RIR (principianti §6) | W3-T3 |
| **D-P17** | **Muscoli prioritari: massimo 2**, scelti tra le unità fini (non tra 6 gruppi); nessun terzo muscolo «di attenzione». *Motivo*: RP «non più di due» [V parziale]; con 3 il volume extra non sta nel tempo | W2-T1, W5-T1 |
| **D-P18** | **Rinviate le funzioni che chiedono chiavi nuove di dati** (misure SPE-15, progressi per obiettivo OBI-09, taratura locale DON-16, test funzionali ETA-12). *Motivo*: invariante F.1.4 del piano (nessuna chiave nuova di `localStorage`) e consenso | — |
| **D-P19** | **Minorenni (13-17 anni): le superserie tra antagonisti non pesanti restano ammesse** (matrice di W2-T3: per i minori solo discesa controllata, picco e superserie; niente tecniche verso il cedimento, né cluster, né potenza). *Motivo*: la superserie non è una tecnica di cedimento ma una **disposizione** degli esercizi: due esercizi non pesanti di muscoli opposti (spinta con tirata, quadricipiti con femorali, bicipiti con tricipiti), a ritmo controllato, senza carichi massimali né serie al limite, che risparmia tempo senza alzare l'intensità; il RIR resta ≥ 2 (ETA-02) e la coppia non contiene mai un fondamentale pesante, il core né una tenuta (ABB-06, collaudo SS-01/SS-02). Decisione del delegato del responsabile di prodotto, **2026-10-05**, chiesta da W2-T3; provata in `tests/integrazione-onda2b.test.js` (D-P19) | W2-T3, INT-2b |

---

## E. Copertura del collaudo (40 criteri falliti su 48)

«Prima» = matrice standard, etichetta `base`, commit `0e71714`, criteri v1.0 (10.800 profili; la completa da 64.800 dà percentuali uguali entro 3 punti). Percentuale **pesata** (`PESI_POPOLAZIONE`) della sottoclasse peggiore, poi i programmi colpiti. Totale oggi: programmi con un fallimento di severità ≥ 4: **69,4%** della matrice, **35,8% pesata** (`gravi_pesata`); 112 classi; 12,8 fallimenti per programma. Criteri superati già oggi: ERR-01, SAN-01, ORD-04, SPL-02, RX-03, RX-04, DEL-01, SAF-03 (devono restare a 0).

| Criterio del collaudo (sottoclasse peggiore) | Prima | Task | Soglia all'INT del task | Fatto (cap. G) |
|---|---|---|---|---|
| SAF-01 (spalle: Pike Push-up; schiena: Front Squat, Rematore Presa Inversa) | 15,3% (3.600) + 6,9% (755) | **W0-T5** | 0 | 0 |
| VOL-01 (femorali; petto; quadricipiti) | 57,4% (6.233); 26,0%; 14,3% | W0-T2 ponte; **W2-T1** | INT-0: femorali ≤ 30%; INT-2a: ≤ 2% con nota | ≤ 2%, 100% con nota |
| VOL-02 (glutei; schiena; quadricipiti) | 35,0%; 29,2%; 13,4% | **W2-T1** | 0 oltre tolleranza (+10%) | 0 |
| DIR-01 (polpacci; tricipiti; bicipiti; laterali; posteriori; avambracci) | 23,1%; 20,6%; 20,1%; 20,0%; 18,9%; 3,5% | **W2-T1** | 0 nel perimetro G; ≤ 5% fuori | idem |
| FRQ-01 (femorali; quadricipiti; bicipiti) | 31,4% (4.347); 7,5%; 5,2% | W0-T2 ponte; **W2-T5**, W2-T1 | INT-0: femorali ≤ 10%; INT-2: 0 salvo frequenza 1 | 0 |
| RIR-03 (principiante; intermedio) | 35,9% (2.586); 31,6% (2.558) | **W0-T4** | 0 | 0 |
| DUR-02 (spreco > 25%) | 82,8% (8.660) | W0-T2 ponte; **W2-T2** | INT-0: ≤ 41%; INT-2a: ≤ 3% (definizione v2, B12) | ≤ 3% |
| SES-03 (lower/hinge; legs/hinge; lower/squat) | 22,4% (3.993); 8,7%; 4,0% | W0-T2 (palestra); W1-T5 + **W2-T6** (casa) | INT-0: 0 in palestra; INT-2: 0 | 0 |
| EQ-03 (rapporto femorali/quadricipiti; nessuna flessione) | 38,2% (4.090); 1,1% | W0-T2 ponte; **W2-T1**, W2-T6 | INT-0: ≤ 15%; INT-2: 0 | 0 |
| FRQ-02 (posteriori; polpacci; laterali; bicipiti; tricipiti) | 15,5%; 15,1%; 14,5%; 11,6%; 9,5% | **W2-T1** | ≤ 5% | ≤ 5% |
| MIS-01 (quadricipiti con ginocchia a casa; core; femorali) | 5,9% (2.473); 5,8%; 4,9% (1.367) | W0-T5 (quadricipiti), W0-T2 (femorali); **W2-T1** | INT-0: quadricipiti e femorali 0; INT-2: 0 | 0 |
| REC-01 (spalle: frequenza 3 con 4 giorni, full body lunedì + upper martedì; schiena) | 13,4% (1.414); 6,1% | **W2-T5** | 0 | 0 |
| TEC-01 (drop: Dead Bug, Calf Raise a un Piede, Nordic; amrap; parziali) | 14,1% (1.949); 4,7%; 3,3% | **W0-T2** | 0 | 0 |
| SAF-02 (schiena; ginocchia; spalle: cautela) | 16,1%; 14,5%; 10,7% | **W4-T1** | 100% con nota di modifica | idem |
| RIR-01 (intermedi senza rampa) | 40,0% (3.600) | **W2-T4** | 0 | 0 |
| RID-01 (grande gluteo; deltoide anteriore; quadricipiti) | 23,4%; 6,7%; 6,3% | **W2-T6** | ≤ 5% | ≤ 5% |
| SAF-04 (manubri: trazioni in tutti i 3.600 programmi; corpo) | 20,4%; 14,9% | **W0-T5** | 0 | 0 |
| SAF-05 (principiante; prudente) | 20,4%; 11,9% | **W2-T6** | 0 | 0 |
| PRI-01 (braccia; gambe; petto) | 6,2%; 5,3%; 5,1% | **W2-T1** | 0 | 0 |
| DUR-01 (sforo > 10%; 727 su 862 a 30 minuti) | 5,9% (862) | W0-T2 ponte; **W2-T2** | INT-0: non peggiora; INT-2a: 0 | 0 |
| RIR-02 (RIR 0 sullo squat nelle settimane 5 e 11 degli avanzati) | 11,7% (2.612) | **W0-T4** | 0 | 0 |
| EQ-01 (spinta > tirata) | 11,5% | **W2-T6** | 0 | 0 |
| GOA-01 (forza con poco lavoro pesante) | 9,5% (2.300) | **W2-T2** (prescrizione per obiettivo), W2-T7 | 0 | 0 |
| ORD-03 (spalle o braccia prima delle gambe) | 17,6% | **W2-T6** | 0 | 0 |
| SES-01 (> 11 frazionarie in una seduta: glutei) | 6,6% | **W2-T1** | 0 | 0 |
| RX-01 (5×5 su goblet e squat a corpo libero; generale/pesante; forza/pesante) | 2,8% (827); 3,5%; 1,4% | W0-T2 ponte; **W2-T2** | 0 | 0 |
| EXN-02 (troppi esercizi) | 13,8% | **W2-T2** | 0 | 0 |
| RID-02 (stesso esercizio in ≥ 3 sedute) | 13,8% | **W2-T6** | ≤ 5% | ≤ 5% |
| RX-02 (158 s su Hyperextension e Ponte Glutei; macchine) | 2,8% (790); 1,9%; 1,6% | **W2-T2** | 0 | 0 |
| SAF-06 (spalla senza cuffia né deltoidi posteriori) | 10,5% | **W2-T6** (PCO-08) | 0 | 0 |
| REC-03 (6 giorni lunedì-sabato) | 7,3% (1.754) | **W2-T5** | 0 | 0 |
| REC-02 (lombari due giorni di fila) | 3,9% | **W2-T5** | 0 | 0 |
| SPL-01 (principianti con 5-6 giorni → 4 sedute senza nota) | 6,7% (777) | **W2-T5** | 0 senza nota (criterio aggiornato in INT-2: con la nota non è un fallimento) | 0 |
| EXN-01 (meno di 3 esercizi) | 2,4% | **W0-T2** | 0 | 0 |
| SS-01 (metodo `rr`: Trazioni + Rematore inverso) | 2,0% (211) | **W2-T2** | 0 | 0 |
| SS-02 | 1,0% | **W2-T2** | 0 | 0 |
| ORD-01, ORD-02 | 0,3%; 0,1% | **W2-T6** | 0 | 0 |
| EQ-02 | 0,2% | **W2-T6** | 0 | 0 |
| PAT-01 (hinge) | 0,1% | W0-T6 (palestra), W1-T5 (casa) | 0 | 0 |
| `gravi_pesata` | 35,8% | tutte | INT-0: almeno −40% (≤ 21,5%); INT-2: ≤ 1% | ≤ 0,5% |

**Verifiche del modello dati** (collaudo MOD): MOD-01 etichette di controindicazione per zona (oggi «manca») → W1-T2 (`stress` per 8 zone); MOD-02 zone di dolore (manca) → W4-T1; MOD-03 buchi di RISCHIO (Pike, Front Squat, Yates) → W0-T5; MOD-04 Scrollate (incoerente) → W2-T6 (con la voce nuova di W1-T5); MOD-05 intervallo di ripetizioni (manca) → W3-T1 (`ripRange`); MOD-06 prescrizione per settimana (parziale) → W2-T4 (`prog.piano`; **«ok» a INT-2b**: 10.800 programmi su 10.800 hanno il piano); MOD-07 conteggio per gruppo (incoerente) → W2-T1 (**«ok» a INT-2b, misurato**: il collaudo 1.4 confronta `contaVolume` del generatore con il suo conteggio per unità su ogni programma senza metodo famoso, 0 diversi); MOD-08 riscaldamento e cambi nel tempo (manca) → W2-T2 (**«ok» a INT-2b, misurato**: tre prove su `durataSeduta`: riscaldamento e rampa, cambio, lato); MOD-09 `schemeFor.settimane` mai letta (8.100 programmi) → W2-T4 (la durata viene dal piano; **«ok» a INT-2b**: 0 programmi con le due durate diverse); MOD-12 copertura della libreria (hinge con manubri e a corpo libero, deltoidi, bicipiti e tricipiti a corpo libero) → W1-T5 + W2-T6.

**Criteri del collaudo da aggiornare** (solo in INT, con la skill del collaudo §4 e `VERSIONE_CRITERI` alzata): INT-0: DEL-01 (principianti: scarico solo all'8ª), PAT-01 (a casa senza sbarra la tirata verticale vale con pullover o elastico), TEC-01 (anche minori e over 65); INT-1: SAF-01/SAF-02 leggono l'attributo `stress` invece della lista interna; INT-2a: VOL-01, VOL-02, DIR-01 (tabella B6), DUR-02 (B12), RIR-03 (riga principiante [3,4]); INT-2: DEL-01 (principianti 12 settimane), SPL-01 (con nota). **INT-2b (2026-10-06, criteri 1.4, tutti di classe A con il motivo scritto in `tools/collaudo-generatore.js`):** VOL-01, VOL-02, DIR-01, MIS-01 e i criteri che contano le serie con la tabella B6 e i crediti degli attributi (VOL-02: tolleranza +10% invece di +15%, più stretto); VOL-01 non conta l'unità sotto fascia dichiarata dalla nota della causa se il fatto è vero nel modello del collaudo (più largo); DUR-02 solo se si poteva riempire la seduta (più largo); DEL-01 con il piano da 12 settimane del principiante e il controllo all'8ª (più largo); GOA-01 non chiede ripetizioni basse a minorenni e prudenti (più largo); RIR-01..03 e MOD-06 misurano la tabella del piano (neutro); MOD-07 e MOD-08 misurati e non più righe fisse. Esaminati e **non** cambiati: DUR-01 «con il modello CAS-05» (farebbe misurare il generatore con la sua stessa funzione) e SS-01 «per muscolo» (a 0 senza cambiarlo). Le soglie del cancello stanno in `tools/cancello-collaudo.json` (W0-T1).


### E.1 Regressioni ammesse del cancello (meccanismo e voci)

**Deroga datata (2026-10-05, INT-2a; richiesta dalla revisione Opus dell'onda 1, M2, e fissata dal coordinatore: il responsabile di prodotto la conferma o la toglie).** L'INT-1 introdusse nel cancello (`onde.<onda>.ammesse` in `tools/cancello-collaudo.json`) le regressioni *ammesse*: una classe può salire fino a un tetto se ha un motivo scritto. Il piano (E, INT-1) chiede che nessun criterio peggiori: il meccanismo è una **deroga**, e vale solo con queste condizioni, controllate dal cancello (`tools/cancello-collaudo.js`, autotest «regressioni ammesse con scadenza»):

1. ogni voce ha un **responsabile** (`risolve`: un task che esiste nella tabella A.3 o in questa tabella E, mai un nome inventato) e una **scadenza** (`scade`: l'onda di `ordineOnde` entro cui deve sparire);
2. valutando l'onda di scadenza (o una successiva) la voce è **scaduta**: il cancello fallisce, anche se il valore sta sotto il tetto, e la classe torna giudicata dalla tolleranza di 0,5 punti;
3. mai per la sicurezza (SAF-01, SAF-03) e mai per un criterio con una soglia a 0 senza un compito che la porta a 0;
4. una riga datata qui per ogni voce, e il motivo dice la causa vera (quella misurata), non una ipotesi.

| Voce (onda-1) | Tetto | Responsabile | Scade | Causa (misurata) | Stato |
|---|---|---|---|---|---|
| VOL-02:glutei | 32,5% | **W2-T1** (volume per muscolo con gli attributi) | onda-2a (soglia 0) | i crediti dei 29 esercizi nuovi, che il volume per gruppo non vede; a INT-2a i crediti sono allineati (M4) | aperta |
| VOL-02:tricipiti | 2,6% | **W2-T1** | onda-2a (soglia 0) | **rumore del sorteggio** (+0,56 su una tolleranza di 0,5): il motivo scritto prima (Floor Press e Panca con Pausa) era falso, non entrano in nessun programma (0 su 2.034) | aperta |
| FRQ-02:polpacci | 8,4% | **W2-T1** (serie dirette per muscolo) | onda-2a (soglia 5) | il Calf Raise con Manubrio sul Gradino entra in una sola seduta; in parte rumore (+0,55 su 0,5) | aperta |
| REC-01:spalle | 12,5% | **W2-T5** (divisione dei giorni e 48 ore) | onda-2 (soglia 0) | **rumore del sorteggio** (11,44% a onda-1, 11,75% e 12,19% dopo le integrazioni: +0,75 su una tolleranza di 0,5; i programmi colpiti sono 1336, 1342 e di nuovo 1336: cambia quali sono e il loro peso nella popolazione assunta); la causa strutturale non e toccata | aperta (aggiunta a INT-2a, 2026-10-05) |
| REC-02 | — | W1-T6 (stesso lavoro di W2-T5, anticipato) | — | lo stacco rumeno coi manubri a casa contato come lombare pesante: `schienaLombare` legge ora il dato degli attributi | **chiusa il 2026-10-05**: misurata 0,00%, voce tolta |
| RID-01:quadricipiti | — | W1-T6 (anticipo di W2-T6) | — | squat, affondi e squat su scatola nella stessa seduta: `strTerzoUguale` e, a INT-2a, `strSquatDoppio` (M5) | **chiusa il 2026-10-05**: misurata 0,00%, voce tolta |

Il responsabile di REC-02 e RID-01 nella versione di INT-1 era «W1-T6», un task che allora non esisteva ancora nel piano (l'onda 1 era chiusa con W1-T1..T5): è nato dopo, per questi residui, e li ha chiusi.

---

## F. Priorità reale

### F.1 Le 12 modifiche che contano di più (qualità e sicurezza), in ordine

| # | Modifica | Perché in alto (prima, collaudo standard) | Dove |
|---|---|---|---|
| 1 | **Esercizi controindicati con un fastidio**: buchi di RISCHIO (Pike Push-up, Front Squat, Yates), sostituzioni che cambiano muscolo (B14), ginocchio contraddittorio (B13), poi etichette per zona e «modifica, non escludere» | severità 5: 15,3% + 6,9% pesato | W0-T5 → W1-T2 → W4-T1 |
| 2 | **Cedimento e tecniche a chi non deve**: RIR 0 ai principianti (B12), RIR troppo basso in settimana 1 (35,9%/31,6%), RIR 0 sullo squat (11,7%), drop su core e corpo libero (14,1%), minori e over 65 | rischio e abbandono | W0-T2, W0-T4 → W2-T3 |
| 3 | **Femorali** (sotto il minimo nel 57,4%, una seduta sola nel 31,4%, rapporto con i quadricipiti nel 38,2%) | il muscolo più trascurato dal generatore | ponte W0-T2 → W2-T1/T6 |
| 4 | **Volume per muscolo** (petto, glutei e schiena fuori fascia, muscoli piccoli senza dirette) | qualità centrale dell'ipertrofia | W1-T2 → W2-T1 |
| 5 | **Tempo** (82,8% di sedute che sprecano più di un quarto; 862 che sforano, quasi tutte a 30 minuti) | promessa fatta all'utente | ponte W0-T2 → W2-T2 |
| 6 | **Scarichi che si compongono e tagliano i carichi per sempre** (ALG U15, MES N1-N3), «Dura» = scarico (B9) | bug di calcolo che toglie il 10-27% del carico | **W0-T3/T4/T5** (anticipato) |
| 7 | **Partenza bassa per le donne + calibrazione rapida per tutti i principianti** | decisione dell'utente; PAR oggi chiede l'85-120% di un massimale tipico sulla parte alta | **W2-T8** (anticipata dall'onda 3) |
| 8 | **Casa reale**: trazioni senza sbarra (100% dei programmi con manubri), lower senza hinge (22,4%), quadricipiti a zero con ginocchia dolenti a casa | metà degli utenti a casa | ponte W0-T5 → W1-T5 → W2-T5/T6 |
| 9 | **Età obbligatoria e minori** (B24) | sicurezza e legale | W0-T2, W0-T4 |
| 10 | **Principianti**: scelta degli esercizi (bilanciere al primo posto in 54 sedute su 69), rampa, 12 settimane | è la popolazione più numerosa e più fragile all'abbandono | W2-T4, W2-T6 |
| 11 | **Mesociclo vero** (40% senza rampa) e scarico reattivo unico | gestione della fatica | W2-T4, W3-T5 |
| 12 | **Calendario e split** (frequenza 3 con 4 giorni, 6 giorni di fila, principianti 5-6 giorni senza nota) | recupero tra le sedute | W2-T5 |

### F.2 Riordino delle ondate (le ondate restano rilasciabili)

1. **Onda 0 più larga** (solo correzioni piccole e ad alto valore, tutte nei file che i task dell'onda 0 già possiedono): SAF-01 nei regex, guardia degli attrezzi a casa e tirata verticale di riserva (W0-T5); ponte dei femorali e 5×5 solo col bilanciere (W0-T2); pavimenti del RIR, aumenti dimezzati oltre i 65, esigenza dei principianti, scarichi fuori dalle analisi, verdetto di ciclo e strain senza scarichi (W0-T4); carico di riferimento nello scarico (W0-T3 + W0-T4); classe del pullover e croci alla pari (W0-T6).
2. **Partenza bassa e calibrazione** passano da W3-T2 a **W2-T8** (sotto-onda 2b, accanto a W2-T5/T6/T7): dipendono solo da W1 (`applicaPartenze`, `registraFase`, `e1rm`, `caricoPer`); in 2b `partenza.js`, `intensita.js`, `esigenza.js` sono liberi. L'atleta virtuale arriva prima di W3-T6.
3. **PCO-08** (cuffia con spalla delicata) passa da W4-T1 a **W2-T6**: è scelta degli esercizi in `ricette.js` (collaudo SAF-06).
4. **Il motore del volume resta in W2-T1** (primo della sotto-onda 2a): non si anticipa in onda 0 perché ha bisogno dei crediti degli attributi (W1-T2) e di `assegnaVolume` a stadi (W1-T4), e l'onda 1 deve restare «comportamento identico» (golden byte per byte). Il danno più grave (femorali) è coperto dal ponte di onda 0.
5. **W4-T2 si restringe** (gran parte delle regole di popolazione è bloccata o bloccata in parte: REC-06 b, REC-12 b, DON-13, ETA-08 b, ETA-11..13, ETA-17): resta in onda 4 apposta, perché una **sessione di ricerca dedicata** (G.4) può sbloccare alcune regole prima che il task parta.

---

## G. Cose non risolte (e proposta)

1. **Età minima legale.** La soglia dei dati personali (consenso digitale, App Store, informativa) non è una scelta di allenamento: ETA-01 ricorda i 14 anni in Italia [CM, da verificare con un legale]. *Proposta*: la logica del coach usa 13 (decisione dell'utente); prima del rilascio un legale fissa la soglia dell'informativa; se è 14, l'onboarding blocca anche i 13 con lo stesso messaggio.
2. **Carichi di partenza degli uomini.** La nota donne [D] dice che anche loro partono circa il 30% troppo alti; la decisione dell'utente li lascia invariati. *Proposta*: la calibrazione rapida per tutti i principianti (D-P1) riduce il danno; dopo la v2, con il consenso, misurare localmente l'RPE della prima esposizione (DON-16, rinviata) e riaprire la decisione con i dati.
3. **Àncore della partenza bassa da una sola fonte di terzi** (Symmetric Strength, ±25% per esercizio). *Proposta*: tarare i moltiplicatori con l'atleta virtuale (D.8) e poi con i dati reali (±0,05 per classe, nota donne §3.8).
4. **16 regole bloccate** aspettano una ricerca web con il tetto alzato (`CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`). *Proposta*: una sessione di ricerca «R-1» in parallelo alle onde 0-1, una nota di ricerca per gruppo (ipertensione e screening; gravidanza; over 65 e osso; minori; RED-S; BFR; taper), che aggiorna le note e questo registro; W4-T2 parte dopo.
5. **Il collaudo misura il coach con criteri scritti dallo stesso modello**, e questo registro ne cambia alcune soglie (E). *Proposta*: le soglie cambiano solo in INT, con motivo e `VERSIONE_CRITERI`; i numeri «prima» restano quelli dell'etichetta `base`; la revisione Opus legge 20-30 programmi «da coach» (rubrica di INT).
6. **Difetti U10 e U15 dell'algoritmo** (peso massimo come riferimento; scarico composto) sono ragionamenti sul codice confermati in parte da simulazione (MES N1/N2). *Proposta*: W0-T3/T4 scrivono prima la prova che riproduce il difetto (nota algoritmi §8.13), poi la correzione.
