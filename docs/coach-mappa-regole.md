# Mappa delle regole del coach

> **Fotografia del codice al 1 ottobre 2026** (commit `611ea0c`). Copia di sicurezza dell'app prima del riordino: ramo `backup/prima-del-riordino-coach-2026-10-01`.
> Questo documento **descrive** cosa fa oggi il coach: non propone e non cambia nulla. Il codice vive in `js/coach/` (vedi la tabella «Dove sta il codice» in fondo e `docs/indice-codice.md`): per ritrovare una regola cerca il nome della funzione. Eventuali numeri di riga citati sotto si riferiscono alla vecchia versione in un solo file e non valgono più.

## 1. Come leggere la mappa

Ogni regola ha un **codice** (tre lettere e un numero): il codice indica l'area, la riga dice **quando scatta**, **cosa fa** e, tra parentesi, la **fonte** citata nel codice. Quando una frase dice "da verificare", l'ho letta nel codice ma non l'ho provata in uso.

| Codice | Area | Quando agisce | Funzioni principali |
|---|---|---|---|
| SUG | Aiuto alla scelta manuale degli esercizi | mentre costruisci la scheda | `suggestNextExercises` |
| PRG | Costruzione del programma | creazione o rifacimento del programma | `buildProgram`, `splitFor`, `schemeFor`, `consentito`, `sostituto` |
| MET | Metodi famosi e scelta della struttura | creazione del programma | `METODI`, `metodiPerTe`, `sceltaMetodo`, `fattoreFisico` |
| PRZ | Prontezza prima della seduta | prima di iniziare | `applicaProntezza` |
| PAR | Carico di partenza dai dati del corpo (dal 1 ottobre) | creazione programma, esercizi nuovi o sostituiti | `stimaCaricoIniziale`, `contestoCarichi`, `pesoPartenza` |
| PRO, CAR | Carico della prossima seduta | all'apertura della seduta | `caricoProssimo`, `caricoProssimoBase`, `applicaCaricoProgressivo` |
| BIO | Biomeccanica e prove fai-da-te | programma, scelta esercizi, seduta | `cueEsercizio`, `bonusBiomecc`, `TEST_FAI_DA_TE` |
| DEC, DOL | Questionario di fine seduta, decisioni, dolore | dopo la seduta e la mattina dopo | `decisioniCoach`, `applicaDecisioni`, `rispostaDolore` |
| LIV, STA, STR, SCH | Controlli periodici (livello, stalli, strain, schemi) | pannello del coach e Oggi | `azioniCoach`, `eserciziFermi`, `strainSettimane`, `livelloStimato` |
| COR, BIA | Corpo e alimentazione (solo informazione) | pannello del coach | `corpoCoach`, `analyzeBia` |
| SAL, ADE, ORA, CIC | Costanza, seduta saltata, fine ciclo | schermata Oggi | `sedutaSaltata`, `htmlAderenza`, `verdettoCiclo`, `nuovoCiclo` |
| ESI | Esigenza del coach | ogni lunedi | `aggiornaEsigenza` |
| PSI | Psicologia: chi ha davanti il coach | in tutto il resto | `psicoCoach`, `ritrattoCoach` |
| MOM | Momenti di vita | in tutto il resto | `MOMENTI`, `setMomento` |
| IA | Coach IA (commenti scritti) | fine seduta | `commentaSeduta` |
| ABB, INT, EPO, TEC, RIC | Struttura professionale, intensità dal corpo, epoca d'oro, tecniche, regole dalla ricerca | creazione del programma e seduta | `struttura-pro.js`, `intensita.js`, `metodi-epoca-oro.js`, `regole-nuove.js` |
| ALG, MES, PRN, STD | Carico di riferimento e ripresa dopo lo scarico (ALG-02, MES-06, MES-09), RIR di partenza e scarico fuori dalle analisi (MES-02, MES-10..12), principiante (PRN-01), tabelle di forza (STD-01) | onda 0 del coach v2 | `caricoRiferimento`, `rirBersaglioBase`, `inScarico`, `livelloStandardForza` |
| MAV, ETA, CAS | Tecniche al cedimento vietate a chi non può (MAV-02, MAV-03), età e minorenni (ETA-01..04, ETA-18), casa senza sbarra (CAS-14) | creazione del programma, onboarding, corpo | `senzaCedimento`, `etaPerProgramma`, `corpoCoach` |
| SEL | Selezione degli esercizi: un esercizio non si propone al posto di uno di un altro muscolo | scelta e alternative | `alternativeStessoMuscolo`, `SCHEMI_MOV`, `DETTAGLI` |

## 2. Panoramica: il percorso di un allenamento

```
Questionario (obiettivi, livello, giorni, minuti, luogo, fastidi, sonno, salute,
prove fisiche, psicologia, BIA)
        |
        v
PROGRAMMA          PRG + MET  (sedute, esercizi, serie, ripetizioni, recuperi, blocchi, scarichi)
        |
        v   ogni volta che alleni:
PRONTEZZA          PRZ        (4 tocchi: sonno, stress, dolenzia, voglia -> carichi di oggi)
        |
        v
APERTURA SEDUTA    CAR        (carico, ripetizioni, serie e recupero di ogni esercizio, col motivo)
        |
        v
SEDUTA             BIO        (suggerimenti di esecuzione, ripetizioni in riserva, "mi sento male")
        |
        v
FINE SEDUTA        DEC + DOL  (4 domande -> decisioni annullabili; la mattina dopo il controllo del dolore)
        |
        v   ogni settimana / blocco / ciclo:
CONTROLLI          ESI, STA, STR, LIV, SAL, ADE, CIC  (esigenza, stalli, carico settimanale, aderenza, nuovo ciclo)
```

**Consenso.** Tutto il coach si spegne senza il consenso ai dati (`coachAttivo()`): niente questionario, prontezza, carico progressivo o consigli; l'app resta utilizzabile a mano. I dati restano sul telefono. L'unica parte che esce dal telefono e il **Coach IA**, con un consenso separato (capitolo 13).

**Principio dichiarato nel codice:** il coach e un sistema di regole, non una rete neurale; ogni suggerimento ha il suo motivo scritto (campo `motivo`/`reason`) ed e annullabile. Il Coach IA commenta ma "i numeri li decide sempre il coach delle regole".

## 3. Cosa sa il coach di te (ingressi)

| Dato | Come arriva | Dove pesa |
|---|---|---|
| Obiettivi (fino a 3: massa, dimagrimento, forza, ricomposizione, salute, glutei) | questionario | PRG-04, PRG-13...22, MET |
| Livello (principiante, intermedio, avanzato) | questionario; il coach lo ri-stima dai numeri (LIV-01) | PRG-01/02/18, STA, CAR-07 |
| Giorni a settimana, minuti per seduta | questionario | PRG-02/03/33, MET |
| Dove ti alleni (palestra, casa con manubri, corpo libero), attrezzi della palestra, attrezzi preferiti | questionario, Opzioni > Il coach | `consentito`, PRG-07 |
| Fastidi (spalle, ginocchia, schiena bassa) | questionario | `RISCHIO`, BIO-05/06 |
| Sonno (bene, cosi cosi, male) | questionario | PRG-32, CAR-06 |
| Esercizi graditi e odiati, muscoli prioritari, frequenza per muscolo | Opzioni > Il coach | PRG-02/06/29 |
| Sesso, eta, peso, altezza | questionario | PRG-19/20, COR-03 |
| BIA (massa grassa, massa magra, acqua, metabolismo) | referto caricato | PRO-04, MET-03, COR, BIA |
| Salute: 7 domande PAR-Q (problemi al cuore o pressione alta; dolore al petto; capogiri o svenimenti; problemi a ossa e articolazioni; farmaci per cuore o pressione; gravidanza o parto recente; sconsigliato dal medico). Un "si" = **modalita prudente** | questionario | PRG-19/34, CAR-06, BIO-02, ESI-03, IA-03 |
| Prove fai-da-te: caviglia, spalle, larghezza dello squat | questionario o Opzioni | BIO-04/05 |
| 8 domande psicologiche + periodo di vita | questionario o Opzioni | PSI, MOM |
| Orario abituale, fase del corpo (massa, mantenimento, deficit, ricomposizione), traccia del ciclo | Opzioni > Il coach | ORA-01, COR, PRZ-01 |
| Storico: serie, carichi, RPE, durata, feedback a fine seduta, prontezza giornaliera, calendario | si accumula usando l'app | CAR, DEC, STA, STR, ESI, ADE, CIC |

## 4. Aiuto alla scelta manuale degli esercizi

Quando costruisci a mano una seduta, il coach propone cosa aggiungere.

Punteggio per ogni esercizio della libreria non gia in scheda; vince il punteggio piu alto, max 2 per gruppo, default 3 proposte.

- **SUG-01** multiarticolare a inizio seduta: <2 esercizi gia in scheda +40 ("multiarticolare da fare a inizio seduta"); <2 multiarticolari +25 ("serve ancora un multiarticolare"); altrimenti +8
- **SUG-02** isolamento: se ci sono gia >=3 esercizi +30 ("isolamento adatto alla seconda parte"), altrimenti -15
- **SUG-03** saturazione gruppo: >=3 esercizi dello stesso gruppo -45 ("gruppo gia molto allenato oggi"); ==2 -12
- **SUG-04** continuita: stesso gruppo di partenza (se <3) +28; antagonista +22; sinergico +16 (mappa MUSCLE_GROUPS: petto<->schiena, spalle->schiena, ecc.)
- **SUG-05** core: >=4 esercizi gia in scheda +26 ("ottimo per chiudere la seduta"), altrimenti -30
- **SUG-06** non due multiarticolari uguali di fila sullo stesso gruppo: -8
- **SUG-07** gia previsto in un altro giorno della settimana: -20 per giorno ("gia previsto in un altro giorno")
- **SUG-08** diversita: al massimo 2 proposte per gruppo

Nota: il commento in testa elenca 5 regole, il codice ne applica 8.


## 5. Costruzione del programma

### Struttura e durata

- **PRG-01** durata e blocchi per livello (strutturaProgramma(livello, prudente)): principiante 8 sett. con UN solo scarico, all'8a (PRN-03 ponte, B21, D-P5: vale solo per i programmi creati dopo l'onda 0, un programma salvato tiene le sue fasi; il v2 passera a 12 settimane); principiante prudente (over 65, PAR-Q positivo, minorenne) blocco 4 = 3+1 come prima, se chi chiama passa `prudente`; intermedio 12 sett. (blocco 4); avanzato 12 sett. (blocco 6 = 5+1). Fasi: ogni ultima settimana del blocco = 'scarico'. (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **PRG-02** divisione settimanale (splitFor / splitPerFrequenza): <=2 giorni Full Body; principiante 3 gg Full Body 3x, 4+ Upper/Lower; intermedio e avanzato 3 Upper/Lower/Full Body (ABB-05; il PPL una volta sola resta per chi sceglie la frequenza 1), 4 Upper/Lower x2, 5 PPL+UL, 6 PPL x2; avanzato (stessi schemi per 3-6 gg). Se l'utente sceglie la frequenza (1x, 2x, 3x a settimana per muscolo) si rispetta (Schoenfeld 2019, Ramos-Campo 2024): 1x -> PPL/Upper-Lower + "punti deboli"; 2x -> Upper/Lower/FullBody...; 3x -> Full Body ecc.
- **PRG-03** numero di esercizi per seduta (`exerciseCountFor(minuti, schema, { level, prudente })` in onboarding.js; B1, ponte di W0-T2: il risolutore del tempo è di W2-T2): n = floor((minuti - 8) / (serieEffettive * (35 + pausaMedia) / 60)), min 3, max 7 (5 per chi inizia). `serieEffettive` = il minimo tra le serie dello schema, il tetto dello schema e 3 (3,5 per la forza: serie realmente fatte, misurate sul collaudo), al massimo 3 per principianti, minorenni, over 65 e modalità prudente (`COACH_PARAMETRI.serieMaxPrudente`). `pausaMediaPerTipo` pesa le pause dei tre tipi (fondamentale 25%, macchina 35%, isolamento 40%: Convenzione, `PARAM_NUMERO_ESERCIZI`) invece di contare tutte le serie con la pausa del solo fondamentale. Principiante con poca fiducia (psico) e >3 esercizi: -1. Tetto dopo le aggiunte (EXN-02): 8 esercizi per seduta, 6 per chi inizia, tranne le aggiunte protette. (storica: sempre accesa, è un calcolo)

### Obiettivi (schemeFor) — serie x ripetizioni, recuperi

forza 5x5, rec. multi 210 s / iso 90 s, 8 sett. (Robinson 2024, ACSM 2026); massa 4x10, 150/75, 10 sett. (Pelland 2025, Singer 2024); dimagrimento 3x12, 105/60, 8 sett. (Roth 2023); ricomposizione 3x10, 120/75, 12 sett.; glutei 3x12, 120/60, 10 sett.; salute 3x10, 90/60, 8 sett. (ACSM 2026)

- **PRG-04** mescola fino a 3 obiettivi (schemaMisto): il primo decide lo schema; forza come secondario -> il primo multiarticolare diventa 5x5 pesante; massa secondario -> isolamenti 3x12; ricomposizione o salute secondari -> tetto 4 serie; dimagrimento -> nota cardio.

> Incoerenza nei commenti: l'intestazione di `schemaMisto` dice "dimagrimento -> recuperi piu brevi e una nota sul cardio", un commento nel codice dice "col dimagrimento le pause NON si accorciano" e il codice imposta solo la nota sul cardio. Come obiettivo principale, invece, lo schema ha gia pause piu corte (105/60 s contro 150/75 s della massa).

### Scelta degli esercizi (ricette a slot)

- **PRG-05** ogni giorno e una "ricetta": lista di posti (spinta orizzontale, tirata verticale, hinge, squat, isolamenti...). Ricette: push, pull (2 varianti), legs, upper (2 varianti), lower (2 varianti), fullbody (3 varianti), punti deboli (dalle priorita dell'utente).
- **PRG-06** per ogni posto: candidati = esercizi della libreria che rispondono alla definizione del posto (SLOT_DEF: 17 definizioni); punteggio = classifica degli esperti (PRIORI, ~60 esercizi, 1.5-3) + bonus +3 per il bilanciere pesante al primo posto (non se cauto, -3 se cauto) + bonus biomeccanico (bonusBiomecc) + gradito +3 + in allungamento +1.5 - gia usato in settimana (-1 principiante, -4 altri) + variazione casuale controllata da un seme (0-1 principiante, 0-2.5 altri, moltiplicata per il fattore varieta psicologico) - 2 al bilanciere se "a disagio".
- **PRG-07** vincoli: attrezzi della palestra, luogo (casa con manubri / corpo libero), esercizi odiati, fastidi (RISCHIO: spalle, ginocchia, schiena) tramite consentito(); al massimo 1 esercizio pesante per la schiena a seduta (SCHIENA_PESANTE). Onda 0 (W0-T5): RISCHIO chiude i buchi SAF-01 (spalle: Pike Push-up; schiena: Front Squat, Rematore Presa Inversa/Yates) e SEL-11 (schiena: Sit-up, Russian Twist, Crunch a Terra); ginocchia SENZA leg extension e leg press (REC-04 ponte, B13: restano con la nota di SCALE_DOLORE), con l'eccezione dello squat a corpo libero quando non ci sono macchine (B33: i quadricipiti non restano a zero); CAS-01 guardia (B28): a casa (manubri o corpo libero) niente esercizi che per DETTAGLI richiedono sbarra, parallele, sedia romana, panca per lombari o a 45 gradi, ruota addominale (e con i soli manubri nemmeno sbarra bassa o anelli) finche l'utente non dichiara l'attrezzo (W2-T5). (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **PRG-08** con obiettivo forza il primo esercizio pesante e FISSO (niente variazione): la forza e specifica dello strumento.
- **PRG-09** se l'esercizio migliore non e consentito si registra la sostituzione ("Evito X: uso Y").
- **PRG-10** allungamento (SCAMBI_ALLUNGAMENTO): dove provato, si scambia la variante (es. pushdown -> estensione sopra la testa, leg curl sdraiato -> seduto, French press -> sopra la testa) se consentita (Maeo 2021-2023).
- **PRG-11** PHUL: l'intermedio (senza metodo famoso) con upper/lower: la prima seduta e "forza", la seconda "ipertrofia". Con 3 giorni (Upper / Lower / Full Body) upper e lower sono "forza" e il full body e "ipertrofia": ogni muscolo prova carichi alti e carichi medi.

### Serie, ripetizioni e recuperi per ogni esercizio

- **PRG-12** tipo di carico (tipoCarico): isolamento (non multiarticolare), macchina (multiarticolare non nell'elenco), pesante (BIL_PESANTI: squat, front squat, stacchi, panche col bilanciere, military, rematore col bilanciere, T-bar, good morning).
- **PRG-13** ripetizioni: pesante 5 se forza, altrimenti max 8; macchina 8+ (8 se forza; con obiettivo forza max 4 serie); isolamento 10+ (con forza max 3 serie). Recupero: pesante = recupero multi dell'obiettivo; macchina = max(90, 75%); isolamento = max(60, recupero iso).
- **PRG-14** primo multiarticolare con forza come secondo obiettivo: 5x5 «fisso» con 180 s solo se è un fondamentale col bilanciere pesante (`adattoAlCincoPerCinque`: BIL_PESANTI, peso > 0, non a tempo; mai goblet, manubri, macchine guidate o corpo libero: B34, collaudo RX-01), non sopra i 65 anni, non ai minorenni e non nel giorno «ipertrofia» (con le serie capate a 3 o a 4 dagli altri tetti, resta «fisso»). Il giorno «ipertrofia» (PHUL e intermedi senza metodo) riparte dallo schema della massa (`schemeFor('massa')`: al massimo 4 serie, fondamentale da 8 ripetizioni a 150 s, macchina 10 a 120 s, isolamento 12 a 75 s) invece di ereditare 6x8 o 5x8 a 180 s dal giorno di forza (B2). (storica: sempre accesa, è una correzione)
- **PRG-15** forza come primo obiettivo, non principiante, esercizio pesante, non cauto: 6x3 con 180 s.
- **PRG-16** giorno 'forza' (PHUL): pesante 4 serie, recupero >=180; giorno 'ipertrofia': pesante 8 rip, altri multi 10, isolamenti 12.
- **PRG-17** massa come secondario: isolamenti 3x12. Tetto serie dell'obiettivo (4 con ricomposizione/salute).
- **PRG-18** principiante: max 3 serie (2-3 serie impegnative, Barbell Medicine).
- **PRG-19** over 65 e minorenni (13-17 anni, ETA-02): max 3 serie; over 65 8-12 ripetizioni, minorenni 8-15. PAR-Q positivo: multiarticolari 8-12 rip (60-80% del carico, niente apnea; ACSM). «cauto» = over 65, PAR-Q positivo oppure minorenne: niente pesanti favoriti, niente metodi ad alta intensità (`sceltaMetodo`), niente tecniche al cedimento (MAV-03), il numero di esercizi per seduta conta al massimo 3 serie ciascuno (PRG-03). (storica: sempre accesa, è una salvaguardia)
- **PRG-20** donne: recupero -15% (min 60 s) (PeerJ 2025). A tempo (plank ecc.): ripetizioni = valore della libreria (secondi). Recupero arrotondato a 15 s.

### Completamenti settimanali

- **PRG-21** schemi di movimento mancanti (piramide di Helms): ogni settimana servono i 6 schemi (squat, hinge, spinta/tirata orizzontale, spinta/tirata verticale); se manca, si aggiunge nella seduta più vuota adatta (3 serie max; cauto/principiante: meno pesanti). Non con i metodi «essenziale». Il Landmine Press conta come spinta verticale. Senza sbarra né macchine (casa, o palestra con solo bilanciere e manubri) il posto della tirata verticale prende il «Pullover con Manubrio» (D-P11, riserva della tirata verticale: se c'è, PRG-21 non ne aggiunge un secondo; CAS-14). Un controllo finale (`SCHEMI_ATTESI`) tiene in ogni seduta gli schemi che il suo tipo richiede (spinta e tirata nell'upper e nel full body, squat e hinge nel lower: SES-03) anche dopo i tagli per il tempo e per il tetto di esercizi; una seduta con meno di 3 esercizi (EXN-01) si riempie con esercizi dei muscoli della sua giornata. (storica: sempre accesa, è una correzione)
- **PRG-22** glutei: se l'obiettivo include glutei, le 4 famiglie ogni settimana (spinta d'anca, squat/affondi, stacchi, abduzioni) 3x12, 75 s.
- **PRG-23** copertura per regioni (Schoenfeld, Maeo, Pedrosa): se >=3 giorni e obiettivo non salute: leg extension (retto femorale) per massa o glutei; alzate laterali se c'è panca e obiettivo massa/ricomposizione. Bicipite (D-P8, B32): se >=2 curl e nessuno è su panca inclinata o ai cavi (Bayesiano), l'ultimo diventa «Curl su Panca Inclinata» (o Bayesiano) con la nota «Bicipite: un curl su panca inclinata, con il muscolo allungato…»; lo Scott e lo Spider non si aggiungono più al suo posto (Pedrosa 2025: il muscolo lavora allungato). Femorali (B29, ponte di W0-T2; il risolutore è di W2-T1/W2-T6): da 2 giorni, anche per la salute, ogni seduta di gambe (lower, legs, full body) ha uno stacco o una flessione del ginocchio: dove manca, un leg curl da 3 serie (2 ai principianti), e almeno uno a settimana; `rinforzaFemorali` porta le sedute di gambe con almeno 1,5 serie frazionarie di femorali a 2 e il volume al minimo di tabella (serie fino a 4, 5 avanzati, 3 prudenti), solo se la seduta resta nei minuti. Con le ginocchia dolenti il Nordic Curl resta ammesso con una nota (cuscino, discesa lenta; la modifica per zona è di W4-T1). Le altre aggiunte sono da 2 serie, 75 s. (storica: sempre accesa, è una correzione)
- **PRG-24** note sui fastidi (SCALE_DOLORE) aggiunte al programma per ogni fastidio dichiarato.

### Volume per muscolo

- **PRG-25** volume settimanale (serie): VOLUME_LIVELLO principiante 8-10, intermedio 10-14, avanzato 14-20; salute 6-12.
- **PRG-26** fattore fisico: massa magra bassa (FFMI basso) e non dimagrimento: x1,2; massa magra in calo: x0,85.
- **PRG-27** esigenza del coach (ESIGENZA_INIZIO, ora `esigenzaIniziale`, INT-02): +20% di volume all'inizio solo senza bandiere dalla BIA (100% con una, 95% con due), segue l'andamento; =1 se cauto, principiante (PRN-01) o con un "momento di vita" attivo che riduce volume o aumenta RIR; >=1,15 aggiunge la nota "Coach esigente" (mai al principiante). <1 riduce min e max. (storica, corretta nell'onda 0)
- **PRG-28** conteggio frazionario: 1 serie per il muscolo principale, 0,5 per sinergisti nei multiarticolari (Pelland 2025). Aggiusta le serie (+1 al meno carico, max 5; -1 al più carico, min 2, senza toccare i «fissi») finché il volume è dentro min-max. Poi `limitaVolumePerMuscolo` (ponte di W0-T2, tabelle `PARAM_TEMPO.volumeMax` e `volumeMin` per tipo di obiettivo e livello: Convenzione, nel file perché parametri.js è condiviso): toglie una serie alla volta all'esercizio che carica di più il muscolo oltre il massimo (minimo 2 serie, mai un fisso, mai sotto il minimo di un altro gruppo, senza rompere il rapporto tirate/spinte di EQ-01); non con i metodi famosi. (storica: sempre accesa, è una correzione)
- **PRG-29** priorita: gruppo prioritario x1,2 (x1,5 se avanzato che specializza); avanzato che specializza: gli altri gruppi min 6, max = vMin.
- **PRG-30** tetto di 11 serie per muscolo per seduta (si tolgono serie dagli esercizi non fissi, min 2).

### Aggiustamenti finali del programma

- **PRG-31** principianti e over 65: mai piu di 3 serie per esercizio (ripetuta: gia in PRG-18/19).
- **PRG-32** poco sonno ("male"): -1 serie sugli accessori (non il primo esercizio, non i "fissi"), minimo 2.
- **PRG-33** la seduta deve stare nei minuti dichiarati (+5% di tolleranza) con lo stesso modello del collaudo (`stimaMinutiSeduta`: 3,5 s a ripetizione, 10 s di preparazione, 60 s di cambio, 6 min di riscaldamento + 2×45 s per fino a 2 fondamentali pesanti, unilaterali ×2; `PARAM_TEMPO`): si tolgono serie agli esercizi non prioritari, prima gli isolamenti; se non basta l'ultimo isolamento (se restano >3 esercizi). Poi, senza metodo famoso (B1, DUR-02, ponte di W2-T2: il tempo è un tetto, non un obiettivo, D-P10): una seduta sotto l'82% dei minuti allunga le pause (+15 s, dentro i tetti per tipo e obiettivo), poi +1 serie sugli isolamenti (non core né spalle, dentro il massimo di volume), poi un isolamento in più del muscolo sotto il minimo, fino al tetto di esercizi. (storica: sempre accesa, è una correzione)
- **PRG-34** tecniche (con i cancelli MAV-02 e MAV-03): poco tempo (<=45 min) -> superserie spinta+tirata e, solo se le tecniche al cedimento sono ammesse, drop set sull'ultimo isolamento che non sia core, a tempo, a peso zero o uno stacco (non se intensità psicologica bassa); over 65 -> «potenza» sul primo multiarticolare su macchina; PAR-Q positivo o over 65 (non i minorenni) -> «cluster» sui pesanti; chi può andare al cedimento e primo esercizio pesante (non uno stacco) -> avanzato «back-off», intermedio «AMRAP» (non se intensità bassa); avanzato o intermedio con intensità alta (non poco tempo): «parziali» su un isolamento. I metodi famosi con l'AMRAP nello schema e il tocco AMRAP lo perdono dove non è ammesso. (storica: sempre accesa, è una correzione)
- **PRG-35** il metodo scelto (schede famose) decide serie, ripetizioni e pause; il "tocco" secondario applica una piccola modifica; alcuni metodi impongono le superserie.
- **PRG-36** regola del picco e della fine: chi non ama la fatica (intensita bassa) -> -1 serie sull'ultimo esercizio.
- **PRG-37** note aggiunte al programma: poco tempo (superserie -37% di tempo; «e drop set sull'ultimo isolamento» solo se il drop set c'è davvero, altrimenti a chi non può andare al cedimento: «Per ora niente serie al cedimento: la tecnica viene prima…»), over 65 (2-3 serie da 8-12, niente cedimento, 5 minuti di equilibrio; «il primo esercizio veloce in salita per la potenza» solo se c'è un multiarticolare su macchina), minorenni (ETA-03), donne (pause più corte), femorali (PRG-23), curl inclinato (PRG-23), casa senza sbarra (CAS-14), dimagrimento (10-12 mila passi, +500-1000 a settimana, il cardio non toglie muscolo). (storica: sempre accesa, è una correzione)
- **PRG-38** avanzati: mesociclo con RIR 3,2,1,0 nelle settimane di carico, 4 nello scarico.
- **PRG-39** esercizi alternativi scelti dall'utente: sostituiti nello stesso posto, peso di partenza dalla libreria.

### Abbinamenti e struttura professionale (ABB)

Cosa controlla un coach dopo aver scelto gli esercizi. Prove e forza di ogni affermazione: `docs/ricerca-struttura-e-intensita.md`. Codice in `js/coach/programma/struttura-pro.js`, agganciato a `buildProgram`. Le salvaguardie (principianti, over 65, dolore) non cambiano. I metodi famosi (MET) tengono il loro ordine e le loro coppie; la ridondanza (ABB-02) vale per tutti.

- **ABB-01** ordine della seduta (`strOrdina`): prima i multiarticolari (i pesanti col bilanciere davanti alle macchine), poi gli isolamenti dei grandi muscoli, poi quelli dei piccoli (deltoidi, braccia, polpacci), il core sempre in fondo. Il giorno "punti deboli" resta nell'ordine di priorita dell'utente. Motivo: ACSM 2009 (grandi prima dei piccoli, multi prima dei mono); per la forza migliora di piu l'esercizio fatto per primo (Nunes 2021); per la massa l'ordine conta poco.
- **ABB-02** niente esercizi doppi (`strRidondante`): due esercizi con stesso gruppo, stessa parte del muscolo (SOTTOGRUPPI), stesso tipo e stesso schema fanno lo stesso lavoro, e la seconda panca piana diventa una inclinata. Penalita di 4 punti nella scelta del posto. Fanno eccezione lo squat (macchina dopo il bilanciere: 2) e i glutei multiarticolari (2).
- **ABB-03** copertura della settimana (`strCopri`): per massa o ricomposizione, non principianti, da 3 giorni: un esercizio per i polpacci se si allenano le gambe, uno per i deltoidi posteriori se ci sono spinte (convenzione dei coach, prove dirette scarse); da 4 giorni anche un curl per il bicipite e un tricipite diretto (studi piccoli: le braccia crescono anche con i soli multiarticolari, l'isolamento sposta la crescita su altre regioni); con 3 giorni o piu e non salute: un esercizio di core a fine seduta (convenzione). Le aggiunte hanno 2-3 serie, `protetto: true` (non si tolgono per il tempo: si tagliano serie agli altri) e fanno crescere la seduta di al massimo due esercizi. Non vale per i metodi "essenziale".
- **ABB-04** tirate non meno del 90% delle spinte (`strBilancia`): con almeno 8 serie tra spinte e tirate, prima +1 serie alle tirate (al massimo 4, 3 per principianti e over 65), poi -1 alle spinte (minimo 2), infine un esercizio di spinta doppione (lo stesso schema due volte nella stessa seduta: sedute diverse sono la frequenza 2 e non si toccano) diventa una tirata dello stesso tipo di carico (stesso piano se c'e, altrimenti l'altro). Non vale con un metodo famoso. Convenzione dei coach per l'equilibrio delle spalle. Nota alla scheda.
- **ABB-05** 3 giorni per intermedi e avanzati: Upper / Lower / Full Body invece di Push / Pull / Legs (`splitFor`, onboarding.js). Ogni muscolo 2 volte a settimana (ACSM 2026) e nessun muscolo oltre le circa 11 serie frazionarie in una seduta (Pelland, preprint 2025). Chi sceglie la frequenza 1 tiene il Push / Pull / Legs.
- **ABB-06** superserie sicure (`strSuperserie`): solo antagonisti (spinta-tirata, petto-schiena, bicipiti-tricipiti, quadricipiti-femorali), adiacenti, mai con un fondamentale pesante, a tempo o di core; gli esercizi si avvicinano nell'ordine senza uscire dal loro gruppo (multiarticolari con multiarticolari, isolamenti con isolamenti). Antagonisti: stesso volume e crescita in circa un terzo di tempo in meno (meta-analisi 2025, 19 studi); coppie dello stesso muscolo: meno volume. Si usano con poco tempo (<=45 minuti), con il "tocco" superserie e con i metodi "superserie" (tranne la Recommended Routine, che ha le sue coppie).
- **ABB-07** schiena pesante due giorni di fila: se il giorno prima c'era un esercizio di `SCHIENA_PESANTE` o lo stacco rumeno, la scelta dei posti penalizza di 5 punti gli stessi esercizi (convenzione). Non vale con un metodo.
- **ABB-08** il fondamentale (primo multiarticolare pesante) non ha meno serie degli altri multiarticolari non pesanti della seduta (un secondo fondamentale pesante, come nella forza, ha le sue) (`strFinale`, dopo il taglio del tempo): le serie si spostano (+1 al fondamentale, -1 all'altro, minimo 2), non si aggiungono. Non vale per i "fissi" ne per gli stacchi (ABB-09).
- **ABB-09** gli stacchi da terra (stacco da terra, sumo, trap bar, good morning) al massimo 3 serie: molta fatica sistemica per lo stimolo che danno (Israetel, Helms: convenzione).
- **ABB-10** priorita: a parita di tipo, il gruppo prioritario dell'utente per primo (principio della priorita di Arnold; le prestazioni migliorano di piu negli esercizi fatti all'inizio, Nunes 2021).

Uscita: programma con sedute, giorni, note, sostituzioni, fasi, RIR a settimana, seme (ripetibile).


## 6. Metodi famosi e scelta della struttura

- **MET-01** catalogo di 25 metodi (8 non applicabili: solo ispirazione). Tabella estratta dal codice:

| id | nome | livelli | giorni | intensita | minuti | luoghi | obiettivi | applicabile |
|---|---|---|---|---|---|---|---|---|
| coach | Il metodo del coach | principiante/intermedio/avanzato | 2,3,4,5,6 | media | 30-90 | palestra/manubri/corpo | massa/forza/dimagrimento/salute/ricomposizione/glutei | si |
| startingstrength | Starting Strength | principiante | 3 | alta | 45-75 | palestra | forza | si |
| stronglifts | StrongLifts 5×5 | principiante | 3 | alta | 45-75 | palestra | forza/massa | si |
| greyskull | GreySkull LP | principiante | 3 | alta | 45-60 | palestra | forza/massa/ricomposizione | si |
| gzclp | GZCLP | principiante/intermedio | 4 | alta | 60-75 | palestra | forza/massa | si |
| phul | PHUL | intermedio/avanzato | 4 | alta | 60-75 | palestra | massa/forza | si |
| gbr | Generic Bulking Routine | intermedio | 4 | media | 60-75 | palestra | massa | si |
| hatfield | Metodo Hatfield | intermedio/avanzato | 3,4 | alta | 60-90 | palestra | massa | si |
| redditppl | Reddit PPL | principiante/intermedio | 6,3 | alta | 60-90 | palestra | massa/forza | si |
| minimo | Dose minima | principiante/intermedio/avanzato | 2 | media | 30-45 | palestra/manubri/corpo | salute/massa/dimagrimento/ricomposizione/forza/glutei | si |
| mantenimento | Mantenimento | principiante/intermedio/avanzato | 1,2 | bassa | 20-40 | palestra/manubri/corpo | salute/massa/forza/dimagrimento/ricomposizione/glutei | si |
| rr | Recommended Routine (corpo libero) | principiante/intermedio | 3 | media | 45-60 | corpo/manubri | salute/massa/forza/ricomposizione | si |
| hit | Alta intensità (HIT) | intermedio/avanzato | 2,3 | alta | 30-45 | palestra | massa | si |
| 531 | 5/3/1 | intermedio/avanzato | 3,4 | media | 45-75 | palestra | forza | no (solo ispirazione) |
| madcow | Madcow 5×5 / Texas Method | intermedio | 3 | alta | 60-90 | palestra | forza | no (solo ispirazione) |
| conjugate | Coniugato (Westside) per tutti | avanzato | 4 | alta | 60-90 | palestra | forza | no (solo ispirazione) |
| kettlebell | Simple & Sinister | principiante/intermedio | 5,6 | media | 20-30 | manubri/corpo | salute/forza | no (solo ispirazione) |
| gvt | German Volume Training 10×10 | avanzato | 4 | alta | 60-75 | palestra | massa | no (solo ispirazione) |
| brosplit | Bro split (un muscolo al giorno) | intermedio/avanzato | 5 | alta | 60-90 | palestra | massa | no (solo ispirazione) |
| goldensix | Golden Six | principiante/intermedio | 3 | media | 45-75 | palestra | massa/forza/ricomposizione/salute | si |
| park | 5×5 di Reg Park | intermedio | 3 | alta | 60-90 | palestra | forza/massa | si |
| arnold6 | Arnold: schema a 6 giorni | avanzato | 6 | alta | 60-90 | palestra | massa | si |
| gironda | Gironda 8×8 | intermedio/avanzato | 3 | alta | 45-75 | palestra | massa/ricomposizione | si |
| reeves | Steve Reeves | principiante/intermedio | 3 | media | 60-90 | palestra | massa | no (solo ispirazione) |
| yates | Dorian Yates | avanzato | 4 | alta | 45-75 | palestra | massa | no (solo ispirazione) |

_totale 25 | con tocco: stronglifts->amrap, greyskull->amrap, gzclp->amrap, gbr->isolamenti, hatfield->piramide, redditppl->amrap, minimo->superserie_

- **MET-02** punteggio di un metodo per te (metodiPerTe): luogo non adatto = escluso; livello adatto +3 (altrimenti -4); giorni adatti +2 (altrimenti -1); obiettivo principale adatto +2 (altrimenti -2); minuti disponibili: sotto il minimo del metodo -2, dentro il range (+15) +1; intensita uguale a quella psicologica +2 (se intensita bassa e metodo alto: -4); routine (varieta 0) con metodo rigido +2; chi ama cambiare (varieta>1): +2 con metodi variabili, -1 con quelli senza variazione; fiducia bassa: +2 per metodi flessibili da <=45 minuti, -2 per intensita alta; disagio in palestra: +2 a corpo libero/dose minima, -2 ai metodi con fondamentali pesanti; motivazione "piacere": +1 ai metodi con record/AMRAP; tutto-o-niente: +2 se sedute <=30 min; corpo libero: +3 alla Recommended Routine; "momento di vita": Mantenimento +6/+8 se volume <=0,6/0,5, Dose minima +4, -3 ai metodi ad alta intensita se il volume e ridotto, +1 ai rigidi per chi ha ansia; il metodo del coach +1; non applicabili -1.
- **MET-03** fattore fisico sulla scelta (sceltaMetodo): massa magra bassa +2 a GBR, Hatfield, Reddit PPL, PHUL; grasso alto +1 a coach/minimo/GBR e -1 ai metodi con pesanti; massa magra in calo -2 ai metodi ad alta intensita.
- **MET-04** ammissione (metodoAmmesso): applicabile, livello, giorni, luogo, obiettivo, cauto (PAR-Q o over 65) esclude alta intensita; Recommended Routine solo a corpo libero; Mantenimento solo con un periodo di vita a volume <=0,6; Dose minima solo con periodo difficile, <=35 minuti, fiducia bassa o tutto-o-niente; HIT solo con intensita psicologica alta; minuti disponibili almeno il minimo-5.
- **MET-05** la STRUTTURA cambia solo se un metodo batte chiaramente quello del coach (+2 punti); un secondo metodo (fino a -3 punti dal coach) può dare un «tocco» e il testo dice quello che il codice fa (B22, `TOCCHI` in compone.js): AMRAP sull'ultima serie del primo fondamentale (solo per chi può andare al cedimento: MAV-03; mai su stacchi), ultimo isolamento (non core) leggero da 20 ripetizioni (piramide), isolamenti da almeno 15 ripetizioni, superserie spinte+tirate. Starting Strength (B19): A = squat 3×5, panca 3×5, stacco da terra 1×5; B = squat 3×5, military press 3×5, stacco da terra 1×5 (il power clean non c'è in libreria: lo dice l'avvertenza del metodo). (storica: sempre accesa, è una correzione)
- **MET-06** cosa decide un metodo applicato: split, numero di esercizi, ricette dei posti, schema (serie, ripetizioni, recuperi, tecniche), superserie, PHUL, luogo. Il programma mostra "da dove ha preso spunto" con i motivi (fino a 3).

### Epoca d'oro: schede, metodi e tecniche (EPO, TEC)

Fonti e giudizio moderno di ogni scheda: `docs/ricerca-struttura-e-intensita.md`, capitolo 2. Codice: `js/coach/metodi-epoca-oro.js` (metodi), `js/dati/schede-epoca-oro.js` (13 sedute pronte, tag "Epoca d'oro", con il giudizio di oggi nella descrizione), `TECNICHE` in `regole-ricerca.js` (tecniche). Come per gli altri metodi, il coach ne tiene la struttura e corregge cio che non regge (voce `attenzione` di ogni metodo).

- **EPO-01** Golden Six (`goldensix`, Reg Park e Arnold): 3 giorni, full body, 6 posti (squat, spinta orizzontale, tirata verticale, spinta verticale, curl, core), serie e ripetizioni 4x10, 3x10, 3x8, 4x10, 3x10, 3x15, pause 120 s sullo squat e 90 s sul resto (60 sul core); il press dietro la nuca e il press normale. Stessa seduta ogni volta (EPO-07). Nessuna aggiunta del coach (`essenziale`).
- **EPO-02** 5x5 di Reg Park (`park`, intermedi): full body A/B, 3 giorni. A: squat, tirata verticale, spinta orizzontale 5x5 e polpacci 2x15; B: squat, tirata orizzontale, spinta verticale 5x5, stacco 3x5 e polpacci. Pause 180 s. Fondamentali pesanti favoriti (`pesanti`).
- **EPO-03** Arnold a 6 giorni (`arnold6`, avanzati, 6 giorni): Petto e Schiena / Spalle e Braccia / Gambe, due volte; 4 serie sui fondamentali dei primi quattro posti e 3 sul resto (l'originale ne ha di piu: il coach toglie una serie), 90 s, tecnica "piramide" sui multiarticolari, petto e schiena in superserie (spinta + tirata). Due sedute nuove nelle ricette: `petto-schiena` e `spalle-braccia`.
- **EPO-04** Gironda 8x8 (`gironda`, intermedi e avanzati, 3 giorni Push / Pull / Legs): un multiarticolare per seduta in 8 serie da 8 con 30 s di pausa e il 70% del carico (`fattoreCarico` 0,7, applicato dopo la stima dai dati del corpo), poi 3 esercizi da 3x12 a 75 s. Mai bilancieri pesanti (`leggeri`): sotto i 60 s di pausa il volume cala e la crescita ne risente un poco (Singer 2024). Tecnica "ottoperotto".
- **EPO-05** Heavy Duty di Mentzer (metodo `hit`, rivisto): 2 serie (non una: Krieger 2010) al cedimento, 8 ripetizioni per la parte alta e 15 per gambe e glutei (Mentzer: 6-10 e 12-20), pausa 120 s; con 3 giorni split Petto e Schiena / Gambe / Spalle e Braccia, cosi ogni muscolo riposa 7 giorni (Mentzer: 4-7); l'ultimo esercizio non pesante ha "riposo-pausa" (Prestes 2019: stessa crescita, meno tempo). Il fondamentale resta per primo: il pre-affaticamento non da piu crescita (Gentil e altri). Senza aggiunte del coach (`essenziale`). Con un metodo non si applicano le superserie e il drop set del poco tempo.
- **EPO-06** Reeves e Yates: solo ispirazione (`applicabile: false`) e sedute pronte. Reeves parte dai muscoli piccoli (contro ABB-01); Yates porta tutto al cedimento (le fonti sulle sue serie divergono: 2 di lavoro nel 1987-92, una dopo).
- **EPO-07** `ripeti`: i metodi con la stessa seduta ogni volta (Golden Six, Park, Arnold, Gironda) non penalizzano l'esercizio gia usato in settimana (-4): ogni giorno uguale ha gli stessi esercizi.
- **TEC-01** piramide: carico che sale, ripetizioni che scendono (12, 10, 8, 6). Assegnata da `arnold6`; le sedute pronte di Arnold la portano. Non e tra le tecniche al cedimento.
- **TEC-02** negative: l'ultima serie scende in 4-5 secondi con un compagno che aiuta a salire. Il sovraccarico eccentrico da un piccolo vantaggio sulla massa (Schoenfeld 2017; ACSM 2026). Solo testo: nessun metodo la assegna da solo.
- **TEC-03** ripetizioni forzate: un compagno aiuta per 1-2 ripetizioni oltre il cedimento, su panca o macchine. Solo testo.
- **TEC-04** riposo-pausa: al cedimento 15 secondi e ancora qualche ripetizione, due volte. Assegnata al `hit` sull'ultimo esercizio non pesante e di non-core; le sedute di Mentzer la portano.
- **TEC-05** contrazione di picco: 2 secondi di stretta in cima a ogni ripetizione. Solo testo.
- **TEC-06** Gironda 8x8 (`ottoperotto`): 8 serie da 8, 30 secondi, circa il 70% del carico delle 8 ripetizioni.
- **TEC-07** le tecniche al cedimento (negative, forzate, riposo-pausa, oltre a drop, AMRAP, parziali e calibrazione) contano per il tetto di RIC-04: al massimo una per seduta, nessuna in scarico o con prontezza sotto 50.

Attenzione: nel motore dei carichi (caricoProssimo) non ho trovato diramazioni per metodo: le regole di progressione descritte nei metodi (es. Starting Strength "+2,5 kg a ogni seduta; due mancate = -5%", StrongLifts "mancato piu volte = -10%", GZCLP "6x2, poi 10x1") sono "come" testuali; la progressione reale e quella unica di G.

Fattore fisico (fattoreFisico): da BIA (massa grassa %, FFMI): grasso alto = >32% donne / >25% uomini; FFMI basso = <15 donne / <18 uomini e non grasso alto; massa magra in calo = -0,5 kg nell'ultima BIA (nota: il freno ai carichi PRO-04 scatta a -1 kg, due soglie diverse per lo stesso fenomeno). Testi: massa magra bassa -> piu serie (x1,2 PRG-26); grasso sopra la media -> si tengono i carichi, passi 8-10 mila e cardio leggero; massa magra in calo -> volume -15% e carichi fermi; proteine 2,35 g/kg di massa magra.


## 7. Prontezza prima della seduta

- **PRZ-01** punteggio = media pesata: sonno 30, stress 25, dolenzia 25, voglia 20 (FitnessVolt, Hooper); voce facoltativa "ciclo" peso 15 (trattata come sonno e stress: niente programmazione per fasi, Colenso-Semple 2023). Ogni risposta vale 0, 1 o 2 su 2.
- **PRZ-02** fattore sul carico dei multiarticolari non ancora iniziati: >=70% come da piano; 50-69% x0,96 ("un RIR in piu", -4%); <50% x0,9 ("seduta leggera", -10%). Gli isolamenti non si toccano (il sonno scarso cala la forza solo nei multiarticolari, Knowles 2018).
- **PRZ-03** ritirata (decisione D-P14 del registro del coach v2): una giornata ottima (>=70%) non aggiunge più serie. "Tutto normale" vale circa 78 e la serie in più sugli isolamenti scattava quasi ogni giorno, oltre il tetto di 3 serie dei principianti (B18). Resta solo il +1 settimanale per unità di volume (PCO-03, W3-T4). (storica, ritirata nell'onda 0)
- **PRZ-04** stanchezza persistente: 3 giorni consecutivi negli ultimi 7 sotto il 50% -> scarico anticipato per 2 sedute (Hooper), se non c'e gia.
- **PRZ-05** "Mi sento male" (Harvard Health): ferma tutto, dice cosa fare e chiude la seduta come interrotta; una seduta interrotta non conta per i carichi.

Si puo saltare; si mostra solo prima di aver fatto una serie; ogni modifica e annullabile dal messaggio.


## 8. Il carico della prossima seduta

- **PRO-01** incremento (incrementoPer): gambe/glutei multiarticolare +5 kg, isolamento +2,5 kg; resto multiarticolare +2,5 kg, isolamento +1 kg. Arrotondamento a 0,5 kg.
- **PRO-02** esito di una seduta per esercizio (esito): 'saltato' se nessuna serie fatta; 'ok' se tutte le serie fatte con almeno le ripetizioni previste; altrimenti 'mancato'.
- **PRO-03** (da commento) stesso carico finche tutte le serie arrivano alle ripetizioni; poi aumento; mancato una volta = stesso carico e si punta a piu ripetizioni; mancato due volte di fila = -10% (il principiante -5%, vedi sotto); scarico = serie -40% e carico -10%. (la logica effettiva e in caricoProssimo, sezione E)
- **PRO-04** freno della BIA (frenoBia): se la massa magra e scesa di almeno 1 kg tra le ultime due misure, niente aumenti ("per ora tengo fermi i carichi e punto al recupero").

Settimana del programma (settimanaProgramma): numero e fase (carico/scarico/finito) dalla data di inizio del programma.


Si applica all'apertura di una seduta (solo con il consenso, solo se non ci sono serie gia fatte) a ogni esercizio: scrive peso, ripetizioni, serie, recupero, e una nota con il MOTIVO (coachNote) e un tipo (su / fermo / giu / scarico / nuovo).

Ordine di valutazione in caricoProssimoBase:

- **CAR-01** esercizi a tempo (plank ecc.): tenuta completata = +5 secondi; altrimenti stessa durata.
- **CAR-02** mai fatto: carico del programma, che dal 1 ottobre e una stima dai dati del corpo (vedi PAR); in scarico x0,9.
- **CAR-03** settimana di scarico del programma: serie = serie base x dose, carico = ultimo x dose; la dose dipende dalla fatica (livelloFatica, Bell 2024): bassa (RPE medio <7 e prontezza >=70) volume -35% (carico x0,95); media volume -50% e carico -10%; alta (RPE medio >=9,5, cioè quasi sempre «Al limite», o prontezza <50: MES-08) volume -70% e carico -10%. "Mai stop totale: la forza calerebbe".
- **CAR-04** rientro dopo una pausa su QUELL'esercizio (detraining, SBS): 10-20 giorni -10%; 21-28 giorni -20%; fino a 90 giorni -30%; oltre -50%. I giorni sono quelli veri per tutti, anche sopra i 65 anni (prima contavano il doppio: 5 giorni davano «Rientro dopo 5 giorni: -10%»; chi ha più di 65 anni resta protetto da RIR 3-4, aumenti dimezzati e ripresa al 95%). Con "3 ripetizioni in riserva". Dopo uno scarico riuscito il calo si applica al carico di riferimento (MES-06). (storica, corretta nell'onda 0)
- **CAR-05** corpo libero (carico 0): tutte le serie complete = +1 ripetizione; altrimenti stesse ripetizioni.
- **CAR-06** tutte le serie complete ("ok"): 
  - freno della BIA: carico invariato (PRO-04);
  - incremento = incrementoPer (PRO-01), dimezzato (min 0,5 kg) in modalita prudente o sonno scarso;
  - autoregolazione dall'RPE segnato (Helms 2018, con correzione "rirBias" imparata dalla calibrazione): RPE medio >= bersaglio+1 -> stesso carico ("consolida"); RPE medio <= bersaglio-1 -> aumento maggiore (+4% per punto di scarto, max +10%, mai meno dell'incremento standard);
  - esercizi pesanti con serie finale AMRAP (nSuns): se tutte le serie sono fatte e l'ultima ha >=2 ripetizioni in piu, il salto e 2,5 kg con 2-3 in piu; con 4-5 in piu 2,5 kg (5 kg gambe e glutei); con 6 o piu 5 kg (7,5 kg gambe e glutei); mai meno dell'incremento standard, dimezzato in modalita prudente;
  - isolamenti: doppia progressione, prima +1 ripetizione fino alla cima del range (ripetizioni previste +3), poi +incremento e si riparte;
  - micro-incrementi: se l'incremento supera il 5% del carico, prima +1 ripetizione (fino a previste +2), poi il peso;
  - altrimenti +incremento.
- **CAR-07** due volte di fila "mancato" (una seduta di scarico non conta come mancata): principiante su un pesante già in stallo una volta e con obiettivo forza -> stesso peso, schema 5x3 (poi 6x2 e 10x1, GZCLP); principiante con gli altri obiettivi -> stesso peso con 30 secondi in più (CAR-09) e poi -5%; tutti gli altri -10% ("si ricostruisce"). Contatore stalli per esercizio (PCO-01, riga del principiante). (storica, corretta nell'onda 0)
- **CAR-08** scarico mirato: massimale stimato in calo per due sedute di fila, ognuna di oltre il 3% (il rumore del RIR) e senza contare le sedute di scarico (MES-10) -> -10% e metà serie solo su quell'esercizio (Dr. Muscle). (storica, corretta nell'onda 0)
- **CAR-09** un solo "mancato": principiante stesso peso con +30 s di pausa; altri stesso carico, "punta a piu ripetizioni".

Poi, in caricoProssimo (aggiusti del coach, vedi D/F):

- **CAR-10** scarico deciso dal coach attivo (aggiusti.scarico): carico = carico di riferimento (MES-06: l'ultima seduta dell'esercizio non di scarico, entro 28 giorni; mai più di quello che il motore proponeva) x0,9 e serie = 60% della base (min 2); le sedute di scarico seguenti ripartono dallo stesso riferimento, non da un carico già ridotto.
- **CAR-11** aggiusto per esercizio: fattore (dolore, reset) -> carico x fattore; "blocca" -> nessun aumento, quindi carico e ripetizioni dell'ultima volta (ALG-02); "extra" -> +1 incremento in più solo se il «su» era un aumento di carico (non dopo +1 ripetizione); "alte ripetizioni" (gomito/ginocchio) -> resta il -10% con il motivo «ampiezza senza dolore, almeno 3 ripetizioni in riserva»: le ripetizioni non si alzano più a 12 (senza base nelle fonti, ricerca-recupero §6 DEC-02).
- **CAR-12** a ogni esercizio con carico si aggiunge il bersaglio di ripetizioni in riserva (testoRir).
- **CAR-13** tecnica "back-off": dopo la prima serie le altre a -95%.
- **CAR-14** calibrazione del RIR (ponte dell'onda 0 fino alla taratura nuova di W3-T3): nell'ultima settimana di carico di ogni blocco, l'ultima serie del primo isolamento (mai del core) va a cedimento, solo per intermedi e avanzati adulti sotto i 65 anni e senza modalità prudente. Il confronto tra quella serie e l'RPE delle serie prima, già stanche, ha sempre lo stesso segno: non si impara più niente e ogni taratura dimezza la correzione già appresa (rirBias), che così si spegne. (storica, corretta nell'onda 0)
- **CAR-15** dopo la seduta (imparaDallaSeduta): conta gli stalli e aggiorna la correzione.

RIR bersaglio (rirBersaglio): pesante 1-3, macchina 0-2, isolamento 0-1; modalita prudente (PAR-Q positivo) o over 65: sempre 3-4; avanzati: RIR dal mesociclo (3,2,1,0, scarico 4); +1 se l'intensita psicologica e "bassa"; + il valore del "momento di vita" attivo; esigenza >=1,15 (non sui pesanti): -1; se l'esercizio non e "stabile" almeno 1.

Ciclo di vita degli "aggiusti" (coach_plus_aggiusti_<modalita>): ogni aggiusto ha un contatore "sedute"; a fine seduta (consumaAggiusti) ogni esercizio fatto scala di 1 e quando arriva a 0 sparisce; lo scarico del coach scala di 1 per seduta. Campi: esercizi{fattore|blocca|extra|nota, sedute, alteRip, motivo}, scarico{sedute, motivo}, controlloDolore, stalli{esercizio:n}, rirBias, ruotatoBlocco, aderenzaChiesta.


### Carico di partenza dai dati del corpo (aggiunto il 1 ottobre) e sua evoluzione

Prima un esercizio mai fatto partiva dal valore generico della libreria (pensato per un uomo di 75 kg, principiante). Ora parte da una **stima per te**, che nelle sedute successive passa dai dati della BIA a quello che sollevi davvero. I coefficienti sono approssimazioni prudenti da affinare con i dati reali (tabella `PARAM_PARTENZA`), non misure.

- **PAR-01** dati del corpo (`contestoCarichi`): si usano i dati appena inseriti, altrimenti l'ultima BIA salvata. Ordine di preferenza: massa muscolare scheletrica (SMM, riferimento 34 kg) > massa magra (FFM, riferimento 61,5 kg) > peso x massa grassa % > solo peso (x0,82 uomini, x0,74 donne). Valori fuori scala vengono ignorati.
- **PAR-02** fattore dal corpo (`scalaDaCorpo`) = massa / riferimento x livello (principiante 1, intermedio 1,3, avanzato 1,6) x sesso (donne, solo parte alta del corpo: 0,9; gambe e glutei no) x eta (50-64 anni 0,95; da 65 anni 0,85) x PAR-Q positivo 0,85 x prudenza 0,85 (si parte sotto il limite). Limiti 0,45-1,8.
- **PAR-03** dallo storico (`scalaDaStorico`): mediana, sugli esercizi gia fatti, del rapporto tra il massimale stimato (Epley) e quello del valore di libreria. Il peso dello storico cresce con il numero di esercizi fatti: a 4 esercizi la stima si fonda solo sulle sedute e la BIA non conta piu.
- **PAR-04** peso finale = valore di libreria x fattore, arrotondato a pesi reali: barra da 20 kg (mai sotto, salvo esercizi con default inferiore), manubri e corpo libero a passi di 1 kg (2 kg da 10 kg), macchine e cavi a 2,5 kg. Esercizi a corpo libero o a tempo: nessuna stima.
- **PAR-05** dove si applica: creazione del programma (tutte le sedute, comprese le aggiunte per schemi mancanti, regioni e glutei), esercizi nuovi o sostituiti dal coach (dolore, azione "cambia variante", rotazione accessori), "Macchinario occupato", seduta libera e aggiunta dalla libreria. Senza consenso ai dati o senza dati del corpo resta il valore di libreria. Il record porta il segno `stimato` e la nota col motivo, che compare alla prima seduta ("Carico di partenza stimato dalla tua massa muscolare...").
- **CAR-16** calibrazione, serie facili: nelle prime sedute con un esercizio (meno di 3 in storico) l'autoregolazione dall'RPE sale piu in fretta: +5% per punto di scarto dal bersaglio (massimo +15%) invece di +4% (massimo +10%).
- **CAR-17** calibrazione, carico troppo alto: nelle prime sedute, se le serie sono molto sotto il previsto (meno del 60% completate, oppure ripetizioni medie di almeno 3 sotto il bersaglio) il carico scende subito del 5% senza aspettare il secondo errore. Un errore piccolo non cambia il carico.
- **ALG-02** (spegnibile) carico di lavoro robusto, parte «blocca» ed «extra» (W0-T3; il carico più frequente tra le serie, U10, è di W3-T1): «blocca» (carichi pesanti e seduta al limite) = nessun aumento, quindi carico e ripetizioni dell'ultima volta (`pesoUltimoDi`) e non più «un incremento in meno»: con +1 ripetizione il carico finiva un passo sotto quello di prima, con un aumento da RPE restava sopra. «extra» dà un incremento in più solo se il «su» era un aumento di carico. Forza: Convenzione (ricerca-algoritmi §6 U12, bug B6).
- **MES-06** (spegnibile) carico di riferimento e ripresa dopo lo scarico (W0-T3 + W0-T4: un solo calcolo, in `caricoProssimoBase` di `regole-ricerca.js`, sul `caricoRiferimento(nome)` di `progressivo.js`): riferimento = carico massimo delle serie fatte nell'ultima seduta dell'esercizio non di scarico, entro 28 giorni; lo scarico del programma e quello deciso dal coach (CAR-10, in `dolore-mattina.js`) valgono riferimento x dose in tutte le sedute della settimana (60 → 54 → 54, prima 60 → 54 → 48,5 → 43,5); la prima seduta dopo uno scarico riuscito (tutte le serie fatte alle ripetizioni previste) riparte dal riferimento, non dal carico di scarico più un incremento, con una ripetizione in riserva in più (`ripresaDopoScarico` alza il RIR, `testoRir` lo dice: «lascia 3–4 ripetizioni in riserva, una in più dopo lo scarico»); dal 95% per prudenti, over 65, sonno scarso o prontezza media sotto 60; se lo scarico è mancato il carico resta com'era e decide il motore; dati vecchi con lo scarico già composto (24,5 → 22 → 20 → 18 kg): si risale per gradi, al massimo +25% sull'ultima seduta; il rientro dopo una pausa (CAR-04) si applica al riferimento; senza riferimento (esercizio fatto solo in scarico) l'ultimo carico di scarico si ripete, la dose non si applica due volte. Una seduta è di scarico se lo dice `obiettivo.coachTipo`, `settimana.fase` (anche «scarico-…») o le fasi del programma: `esercizioInScarico` di `progressivo.js`, la stessa definizione che usa MES-10 (`inScarico`) con il suo interruttore; `ultimeSessioni(nome, n, { senzaScarico: true })` salta gli scarichi. Motivo: «Dopo lo scarico riparti dal carico che avevi prima». Forza: Convenzione + Moderata (1-2 settimane ridotte mantengono la forza, PMID 28328712). Fonte: ricerca-mesocicli §3.6.1 e bug N1-N2, ricerca-algoritmi §3.12 e U15.
- **MES-09** (spegnibile) etichetta di fase sulla seduta salvata (dato interno, nessun testo): a ogni seduta del programma `endWorkout` salva `settimana: { numero, fase }` e, per ogni esercizio, `obiettivo: { reps, sets, rir, tecnica, coachTipo }` (RIR bersaglio e tipo del coach al momento della seduta). Campi facoltativi: le voci vecchie non li hanno e la fase si ricava dal programma attuale e dalla data (`faseSedutaSalvata`, `esercizioInScarico`). Non si salvano per le sedute libere o passate. Prerequisito di MES-06, MES-10, MES-11, MES-12. Fonte: ricerca-mesocicli §5 riga 19 (N9) e §6 MES-09.

## 9. Biomeccanica e prove fai-da-te

- **BIO-01** suggerimenti esterni (cueEsercizio): per ogni schema di movimento una frase (squat "spingi via il pavimento con tutto il piede"; hinge "fianchi indietro come per chiudere una porta"; spinta orizzontale "allontana il peso da te"; spinta verticale "verso il soffitto e passa con la testa sotto"; tirata orizzontale "gomiti verso i fianchi"; tirata verticale "gomiti verso le tasche"); per gli isolamenti "senti il muscolo che lavora: discesa in 2-3 secondi"; per tutti "stessa ampiezza a ogni seduta". Se nelle prove la larghezza dello squat e stata scelta: la ricorda; se la caviglia e rigida: "talloni su due dischi sottili".
- **BIO-02** respirazione (respiroPer): con PAR-Q positivo, oppure con 65 anni o piu (REC-06 parte a, B31), sui multiarticolari "non trattenere il fiato, 8-12 ripetizioni, carichi moderati". La parte b (pressione alta dichiarata) e bloccata dal registro: nessun campo nuovo. (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **BIO-03** cedimento solo su varianti stabili (stabile): isolamenti e macchine; i pesi liberi multiarticolari restano ad almeno 1 RIR.
- **BIO-04** prove fai-da-te (TEST_FAI_DA_TE, Horschig/Movement Fix): caviglia (ginocchio al muro a 12 cm), spalle (braccia al muro), larghezza dello squat. DAL 01/10 le istruzioni sono esplicite (passi, risultato, sicurezza, a cosa serve).
- **BIO-05** bonus nella scelta degli esercizi (bonusBiomecc): caviglia rigida -> squat guidati (hack, leg press, pendulum, goblet, multipower) +2, squat/front squat col bilanciere -2; spalle "no" o fastidio alle spalle -> landmine press +3, military/lento avanti/Arnold -3; fastidio alle spalle sulle spinte orizzontali: manubri, chest press, presa stretta +1,5; calf raise in piedi +1 (gastrocnemio cresce il doppio, Kinoshita 2023). Croci: nessun punteggio (D-P8, B32, onda 0): il +0,5 delle croci ai cavi contraddiceva il +1,5 "allungamento" delle croci coi manubri di RIC-03; cavi e manubri alla pari, decide l'ordine di PRIORI. (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **BIO-06** scale di modifica per zona (SCALE_DOLORE, Lehman): spalle (spinte con presa stretta o manubri a presa neutra), ginocchia (leg extension isometrica 5x45 s, dolore max 3/10, discesa 3-4 s), schiena bassa (riscaldamento McGill: curl-up, plank laterale, bird dog; tenute 8-6-4 s). Si aggiungono come note al programma.
- **BIO-07** copertura per regioni: vedi PRG-23.
- **SEL-02** (regola dei dati, sempre attiva) un esercizio non si propone al posto di uno di un altro muscolo: «Stacco con Trap Bar» non è più nella classe dei quadricipiti (bersaglio erettori come lo stacco da terra, quadricipiti tra i secondari, resta nella famiglia `catena_totale` con stacco da terra e sumo); «Pullover con Manubrio» è dei dorsali (D-P11: bersaglio dorsali, petto e tricipite secondari, gruppo schiena) e non propone né è proposto dalla panca o dalle croci; niente coppie di scambio per allungamento che attraversano gruppi (biomeccanica P2, P6). Insieme: hip thrust e ponte glutei non contano come hinge (B15), squat e leg press senza femorali tra i muscoli e con gli adduttori tra quelli che lavorano (B16, P12), `IN_ALLUNGAMENTO` senza «da seduto» generico (P10).


## 10. Dopo la seduta: questionario, decisioni, dolore


Il questionario (4 domande): fatica della seduta (Facile RPE 1-4 / Giusta 5-7 / Dura 8-9 / Al limite 10), come ci sei arrivato (riposato/normale/stanco), come hai sentito i carichi (leggeri/giusti/pesanti), dolore (si/no; dove: 7 zone; da 1 a 10; durante quali esercizi). decisioniCoach(fb, storico) e una FUNZIONE PURA (verificabile).

- **DEC-01** dolore fino a 3/10: si continua e si osserva ("se domattina e peggio, segnalalo") — Silbernagel 2007.
- **DEC-02** dolore 4-5/10: carico -10% sugli esercizi coinvolti per 2 sedute (zone gomito/ginocchio: segnale "alte ripetizioni"); la mattina dopo il coach chiede se e tornato normale (vedi controllo dolore).
- **DEC-03** dolore >=6/10, oppure tornato nella stessa zona (>=4/10) nelle ultime 2 sedute: l'esercizio si SOSTITUISCE con una variante dello STESSO muscolo bersaglio (o della stessa famiglia per gli stacchi: alternativeStessoMuscolo), che non sia tra gli esercizi che caricano di piu quella zona (STRESS_ZONA), con attrezzi e fastidi consentiti e non gia presente in quel giorno (B14, onda 0: la vecchia tabella SOSTITUZIONI cambiava muscolo, per esempio squat -> hip thrust, ed e stata tolta). Se non c'e, resta lo stesso esercizio a -20% per 2 sedute con la nota "ampiezza senza dolore, discesa in 3 s" (mai un altro muscolo). Con >=6/10 anche l'avviso "fatti vedere da un medico o fisioterapista". (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **DEC-04** dolore che cresce per tre sedute di fila nella stessa zona: "fatti vedere da un fisioterapista".
- **DEC-05** seduta "pesante" = RPE di sessione "Al limite" (10) oppure arrivato stanco con "Dura" (>=8). Le risposte sono 3 / 6 / 8 / 10 (Facile, Giusta, Dura, Al limite; le vecchie risposte 9 contano 8) (MES-08, B9, Convenzione). 3 sedute su 4 pesanti (con almeno 3 feedback precedenti): propone di togliere un allenamento a settimana (Bell 2022). (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **DEC-06** almeno 2 sedute su 3 pesanti (vedi DEC-05: una "Dura" da sola non conta): la prossima seduta e di SCARICO (serie -40%, carico -10%). (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **DEC-07** altrimenti: carichi "pesanti" e RPE di sessione >=8 (Dura o piu; anche il vecchio 9) -> nessun aumento la prossima volta; carichi "leggeri" e RPE <=5 senza dolore -> un aumento extra dove hai completato tutte le serie. (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **DEC-08** nessuna regola scattata: "Seduta nella norma: il programma prosegue come previsto."
- **DEC-09** applicazione (applicaDecisioni): scrive gli "aggiusti" per esercizio (fattore, sedute, motivo con l'eventuale nota "ampiezza senza dolore, discesa in 3 s"), lo scarico, e per la sostituzione cambia il nome in TUTTI i giorni del piano (peso della libreria, serie non fatte, nota "Variante scelta dal coach"; se si passa da ripetizioni a tempo, o viceversa, anche il bersaglio e quello della libreria). Tutto annullabile (ripristina dati, aggiusti, giorni di riposo). (storica: sempre accesa, e una correzione di sicurezza o di calcolo)
- **DEC-10** riduciFrequenza: se i giorni di allenamento sono piu di 2, il giorno con meno serie diventa riposo (annullabile); se sono 2 o meno: "meglio ridurre le serie che i giorni".

Tabelle di conoscenza di questa sezione: ZONE_DOLORE (spalla, gomito, polso, schiena bassa, anca, ginocchio, caviglia), STRESS_ZONA (quali esercizi caricano ogni zona; dall'onda 0 anche i dip e i piegamenti a diamante o declinati per gomito e polso, i declinati per la spalla). La tabella SOSTITUZIONI non c'è più (cambiava il muscolo): la variante la sceglie `varianteStessoMuscolo` con `alternativeStessoMuscolo` (DEC-03).


## 11. Controlli periodici, corpo, costanza e fine ciclo

### Livello e stalli

- **LIV-01** livello stimato dai numeri (livelloStimato; serve almeno 6 sedute): mesi regolari = settimane con >=2 sedute / 4,33; frequenza = sedute / settimane attive; difficolta = media per seduta di (+0,5 se c'e un esercizio "pesante", +0,2 se ci sono tecniche/extra, +0,3 se >=5 esercizi). Principiante <6 mesi regolari; intermedio >=6 mesi e >=2 sedute/sett.; avanzato >=24 mesi, >=3 sedute/sett., difficolta >=0,5 (NSCA, Helms). Se il livello stimato e piu alto di quello del profilo, e le tabelle di forza non lo smentiscono (STD-01), propone "Aggiorna il livello", che si annulla; un avanzato dichiarato sotto il livello 2 in tutte le alzate misurate riceve la proposta di rivedere il livello (STD-01). (storica, corretta nell'onda 0)
- **LIV-02** tabelle STANDARD_FORZA (squat, stacco, panca, military come multipli del peso corporeo, 5 livelli, uomini/donne) e ALZATE_BASE: dall'onda 0 le legge STD-01 (`livelloStandardForza`) come controllo di coerenza del livello, mai per deciderlo da sole. (storica, corretta nell'onda 0)
- **STA-01** esercizio fermo (eserciziFermi): servono >=3 sedute con massimale stimato (e1RM). Soglia per livello: principiante 2 sedute (finestra: ultime 3), intermedio 4 settimane, avanzato 8 settimane. E' fermo se l'ultimo e1RM <= quello piu vecchio della finestra e <= il migliore precedente. Le sedute di scarico e la prima seduta dopo non contano (MES-10). (storica, corretta nell'onda 0)
- **STA-02** azioni sul fermo (max 3 esercizi): se recuperi bene (media degli ultimi 5 punteggi di prontezza >=60, o nessun dato) "+20% serie", altrimenti "-20% serie"; sempre "Cambia variante"; per i pesanti anche "Reset -10%" (si ricostruisce, stile 5/3/1). Serie nel piano limitate a 2-6.
- **STA-03** rotazione accessori: all'inizio di ogni blocco (settimana 1 + k*blocco), se non gia fatta in quel blocco e l'obiettivo non e forza: propone di ruotare gli isolamenti (non i fondamentali) con equivalenti.
- **STR-01** strain (Foster): carico settimanale = somma(RPE di sessione x minuti); monotonia = media giornaliera / deviazione standard; strain = carico x monotonia. Se lo strain sale per due settimane di fila e la fatica media >=8 e non c'e gia uno scarico (la settimana di scarico non e una base di confronto e non se ne propone un altro entro 14 giorni dall'ultimo: MES-10): propone due sedute di scarico. (storica, corretta nell'onda 0)
- **SCH-01** controllo schemi nel piano: manca uno dei 6 schemi di movimento; squilibri: spinte orizzontali senza tirate orizzontali, spinte verticali senza tirate verticali.

### Corpo e alimentazione (solo informazione, "non prescrizione")

- **COR-01** in deficit calorico: calo di peso a settimana (da due misure BIA/peso) < -1% = troppo in fretta (rischio perdere muscolo); da -0,5% a -1% = ritmo ideale; altrimenti "scende poco".
- **COR-02** ricomposizione: realistica se principiante o massa grassa alta (>32% donne, >25% uomini); altrimenti meglio fasi separate.
- **COR-03** proteine: con massa magra nota 2,35-2,75 g per kg di massa magra; altrimenti 2 g/kg di peso (1,75 per le donne). Passi: deficit 10-12 mila (+500-1000 a settimana), altrimenti 6-8 mila. Obiettivo salute: minuti di pesi della settimana (30-60 min bastano) + 150-300 min di aerobica moderata (OMS). Creatina 3-5 g (informazione facoltativa). Sotto i 18 anni niente numeri su peso, cibo e integratori (ETA-04). (storica, corretta nell'onda 0)

### Seduta saltata e aderenza

- **SAL-01** seduta saltata: un giorno pianificato di questa settimana, gia passato, non fatto, non riposo, non spostato. Scelte: seduta corta ora / 20 minuti a casa (secondo il "piano B" psicologico), sposta al prossimo giorno libero della settimana, slitta la settimana di un giorno (l'ultima seduta puo uscire), salta. Per chi ha senso di colpa o "tutto o niente": frase "Un allenamento saltato non cancella i progressi".
- **ADE-01** aderenza: se negli ultimi 14 giorni le sedute fatte sono <70% delle previste (almeno 4 previste) e non lo ha gia chiesto negli ultimi 14 giorni: "Cosa ti frena?" Tempo -> toglie l'ultimo isolamento di ogni giorno con piu di 3 esercizi; Voglia -> un giorno in meno (riduciFrequenza) e invita a scegliere esercizi graditi; Dolori -> invita a segnalarlo a fine seduta.
- **ORA-01** orario abituale: se l'ora e passata di oltre 1 ora dall'orario scelto (e prima delle 23) e la seduta di oggi non e fatta: "Di solito ti alleni alle HH:MM: oggi tocca a ...".

### Fine ciclo

- **CIC-01** verdetto (verdettoCiclo, MES-12): aderenza = sedute fatte / previste nel ciclo; quota = esercizi la cui media delle 3 migliori sedute di carico degli ultimi 2 blocchi supera di oltre il 3% quella delle 3 prime (le sedute di scarico non contano) / esercizi con >=2 misure. Esito: aderenza <70% -> 'aderenza'; quota >=50% o meno di 2 esercizi misurabili -> 'buono'; altrimenti 'stallo'. (storica, corretta nell'onda 0)
- **CIC-02** nuovo ciclo (nuovoCiclo): buono = stesso schema; stallo = alterna blocco ipertrofia/forza e cambia gli accessori (gli isolamenti diventano "odiati temporanei"); aderenza = un giorno in meno (o -15 minuti, min 30); livello aggiornato se stimato piu alto e confermato dalle tabelle di forza (STD-01); avanzati con priorita: dopo 3 cicli di specializzazione uno bilanciato. (storica, corretta nell'onda 0)

### Dolore: controllo la mattina dopo (Silbernagel 2007)

- **DOL-01** dopo un dolore moderato (fattore >=0,9) il giorno dopo il coach chiede "stamattina e tornato come prima?": si -> toglie il -10%; no -> il carico resta ridotto e segna il dato per l'esigenza del coach; consiglia il fisioterapista se continua a crescere.

### Azioni sul piano (comuni)

Tutte le azioni (azioneCoach) passano da conAnnulla: ripristina dati e aggiusti; "sostituisciNelPiano" cambia il nome in tutti i giorni dove l'esercizio non ha serie fatte, con peso della libreria; "cambiaSerieNelPiano" = serie x fattore (min 2, max 6).


### Composizione corporea (BIA)

- **BIA-01** BMI = peso / altezza^2; FFMI = massa magra / altezza^2.
- **BIA-02** massa grassa %: uomini atleta <=15, norma <=20, sopra la media <=25, oltre = "elevata: meglio parlarne con un professionista"; donne <=22 / <=30 / <=35 / oltre. Donne sotto il 17%: "la funzione mestruale puo risentirne: da monitorare con un medico".
- **BIA-03** acqua corporea % del peso (nota informativa).

Soglie di "grasso alto" ripetute altrove con valori DIVERSI: analisi BIA donne 30 (sopra la media) e 35 (elevata); fattoreFisico (grassoAlto) e ricomposizione realistica: >32% donne, >25% uomini. Tre tagli diversi per le donne (30, 32, 35) per lo stesso concetto.


### Esigenza del coach


- **ESI-01** parte al 120% senza bandiere dalla BIA (100% per il principiante: PRN-01), al 100% con una e al 95% con due (INT-02); a 120% piu volume dentro il range del livello e un RIR in meno su macchine e isolamenti; limiti 90-130%; si corregge ogni settimana (aggiornaEsigenza, si calcola il lunedi per la settimana precedente). (storica, corretta nell'onda 0)
- **ESI-02** variazioni settimanali: aderenza <70% (sedute fatte / giorni previsti): -10%; RPE medio sopra il bersaglio di almeno 1 (con >=3 serie con RPE): -5%; altrimenti prontezza media <50: -5%; altrimenti serie facili (RPE <= bersaglio-1, tutte le serie fatte, >=3 con RPE, nessun altro calo): +5%; dolore che non passa nella settimana: -10%. La settimana di scarico non cambia l'esigenza per sforzo e prontezza, la prima settimana dopo lo scarico non conta "RPE sopra il bersaglio" e lo sforzo si confronta con il RIR bersaglio salvato nella seduta (MES-10, MES-11). (storica, corretta nell'onda 0)
- **ESI-03** esclusi (esigenza = 100%): modalita prudente (PAR-Q), over 65, principiante (PRN-01), "momento di vita" attivo che riduce volume o aumenta RIR. (storica, corretta nell'onda 0)

### Intensita dal corpo e dalle prime sedute (INT)

Il coach non parte piu da un +20% uguale per tutti. Prove e limiti: `docs/ricerca-struttura-e-intensita.md`, capitolo 1.3. Codice: `js/coach/intensita.js`. Parametri in `PARAM_INTENSITA`. Nessuno studio dice di prescrivere i carichi dalla BIA: angolo di fase e ECW/TBW sono **bandiere di prudenza** e dicono se la lettura e affidabile.

- **INT-01** stato del corpo dalla BIA (`statoBia`): angolo di fase basso = sotto la media di eta e sesso di piu di 1,3 gradi (circa il 5 percentile, riferimenti a 50 kHz di Bosy-Westphal 2006, interpolati sopra i 50 anni) o sotto 5,04 uomini / 4,20 donne (soglia dove la funzione fisica peggiora, OR 3,07: molto basso); ECW/TBW da 0,40 in su = acqua extracellulare alta (normale 0,36-0,39; da 0,39 a 0,40 solo una nota sul modo di misurare). Livello di prudenza = numero di bandiere (angolo basso 1, molto basso 2, ECW alto 1; massimo 2). Valori fuori scala (angolo fuori 2-12, rapporto fuori 0,3-0,5) si ignorano. Le note spiegano numeri, limite e che non e una diagnosi, e consigliano di ripetere la BIA a digiuno e a riposo.
- **INT-02** esigenza di partenza (`esigenzaIniziale`): 120% senza bandiere, 100% con una, 95% con due. Si usa alla creazione del programma e quando il profilo non ha ancora un'esigenza. Non cambia per cauto, over 65 o periodi difficili (ESI-03). Per il principiante parte da 100% (PRN-01). (storica, corretta nell'onda 0)
- **INT-03** con due bandiere (livello 2) una ripetizione in riserva in piu su tutti gli esercizi (`rirExtraIntensita`, usata da `rirBersaglio`). Motivo: le stime di RIR sbagliano gia di circa una ripetizione, per difetto (Halperin 2022; Refalo 2023).
- **INT-04** prima volta con un esercizio (nessuna seduta in storico, spegnibile): una serie in meno (minimo 2) e una ripetizione in riserva in piu. Motivo: le prime sedute fanno piu indolenzimento (effetto della seduta ripetuta) e il carico di partenza e una stima (PAR-01..05). Il carico si corregge piu in fretta con CAR-16 e CAR-17.
- **INT-05** bilancio delle prime due sedute del programma (spegnibile, `bilancioPrimeSedute`, chiamato a fine seduta): con le prime due sedute registrate dall'inizio del programma, confronta serie fatte, sforzo (RPE rispetto al bersaglio) e prontezza. Meno del 75% delle serie fatte, o RPE medio di almeno 1 sopra il bersaglio, o prontezza sotto 50 (-5 invece di -10): esigenza -10 punti. Almeno il 95% delle serie fatte e RPE medio di almeno 1,5 sotto: +10 punti. Altrimenti resta. Limiti 90-130%. Si fa una volta per programma e il lunedi la correzione settimanale (ESI-02) non conta due volte lo sforzo e la prontezza della stessa settimana. Mostra un messaggio breve. Il principiante resta dentro: il bilancio lo può solo abbassare (tetto 100%, PRN-01). (storica, corretta nell'onda 0)


## 12. Chi hai davanti: psicologia e momenti di vita

Otto domande brevi e facoltative, ognuna da uno strumento validato: motivazione (BREQ-3, autodeterminazione, Teixeira 2012), preferenza di intensita (PRETIE-Q, Ekkekakis 2005), tolleranza alla fatica, autoefficacia (McAuley), reazione al salto di un allenamento (tutto-o-niente, BMC 2025), disagio in palestra (Frontiers 2026), varieta (Kassiano 2022), piano B (intenzioni di implementazione, PLOS One 2018).

Da risposte a profilo (psicoCoach):

- **PSI-01** intensita: punteggio = preferenza (tranquilli 0, impegnativi 1, durissimi 2) + tolleranza (mi fermo 0, continuo 1, spingo 2); <=1 bassa, >=3 alta, altrimenti media (risposta mancante vale 1).
- **PSI-02** fiducia bassa ("poco") -> principiante con >3 esercizi: -1 esercizio (PRG-03); primo mese con sedute un po' piu corte.
- **PSI-03** tutto-o-niente ("spesso mollo"): se salti, subito una seduta corta (SAL-01). Colpa ("mi sento in colpa" o motivazione "dovere"): messaggio "niente sensi di colpa: contano le settimane".
- **PSI-04** disagio in palestra: -2 al bilanciere nella scelta degli esercizi (PRG-06), esercizi semplici con manubri e macchine, pochi cambi di postazione; "osservato": ogni esercizio ha la sua scheda tecnica.
- **PSI-05** varieta: "sempre gli stessi" = fattore 0 (nessuna variazione casuale), "un po' di tutto" = 1, "cambiare spesso" = 1,6 (moltiplica la variazione di PRG-06).
- **PSI-06** intensita bassa: niente drop/AMRAP/back-off (PRG-34), +1 ripetizione in riserva (limite 4-5), -1 serie sull'ultimo esercizio (PRG-36); intensita alta: tecniche intense ammesse, il cedimento resta sugli isolamenti.
- **PSI-07** motivazione: piacere -> sfide e record; valore -> ogni scelta col suo perche; altri -> piccoli traguardi visibili.
- **PSI-08** piano B: corta (20 minuti, primi 3 esercizi x 2 serie), casa (20 minuti a corpo libero: squat, piegamenti, ponte glutei, affondi inversi, plank x 2 serie), sposta (primo giorno libero).
- **PSI-09** ritratto (ritrattoCoach): fino a 4 righe nel programma che dicono quali regole sono cambiate per te.
- **PSI-10** "primi passi" (htmlPrimiPassi): per fiducia bassa, tutto-o-niente, motivazione "altri" o principianti, nei primi 28 giorni del programma: contatore x/8 allenamenti, "Obiettivo: 2 sedute a settimana" (studio 2026 su 389 mila utenti).


Elenco dei 10 periodi (volume = fattore sulle serie di TUTTO il piano; RIR = ripetizioni in riserva in piu; durata in settimane; tecniche intense):

 stress (lavoro/esami) vol 0,7, +1 RIR, 3 sett., niente tecniche (recupero 48->96 ore, Stults-Kolehmainen 2014; Bartholomew 2008)

 rottura (fine di una relazione) 0,85, +1, 4 sett., niente tecniche, con "guardia" e "aiuto" (Niente massimali; occhio al sonno; parlarne aiuta)

 lutto 0,5, +2, 6 sett., niente tecniche, "aiuto"

 giu (giu di morale) 0,7, +1, 4 sett., niente tecniche, "guardia" e "aiuto" (Gordon 2018; Noetel 2024: se dura >2 settimane, medico)

 ansia 0,85, +1, 4 sett., "routine" (stessi esercizi e orari; Gordon 2020)

 sonno (dormo poco) 0,8, +1, 2 sett., niente tecniche (Knowles 2018)

 bambino (nuovo bambino in casa) 0,6, +1, 12 sett., niente tecniche (sedute da 30 minuti; dopo il parto 12 sett. di attivita leggera)

 pieno (periodo pienissimo) 0,4, +1, 3 sett., niente tecniche (mantenimento con un terzo del volume, Bickel 2011)

 rientro (da malattia o infortunio) 0,6, +2, 2 sett., niente tecniche

 carica (voglio dare tutto) 1, RIR 0, 4 sett., "guardia" (tiene i giorni del programma e avvisa se esageri)

- **MOM-01** attivare un periodo: le serie di tutti gli esercizi del piano x fattore volume (min 1); si tolgono le tecniche se "niente tecniche"; si salva una copia (nome, serie, tecnica) per tornare indietro; fine prevista = oggi + settimane.
- **MOM-02** effetti: RIR bersaglio +RIR del periodo (rirBersaglio); esigenza del coach = 100% (ESI-03); volume del programma (PRG-27).
- **MOM-03** chiusura: alla fine del periodo "Come va?" -> "Sto meglio" (ripristina le serie dalla copia) o "Ancora due settimane". Un periodo attivo non si chiude per sbaglio: dalle Opzioni serve una conferma. Ogni 7 giorni "verifica".
- **MOM-04** salvaguardia ("guardia"): se in 7 giorni ci sono piu allenamenti dei previsti +1: "Anche il riposo fa crescere. Se allenarti diventa un obbligo o ti fa stare in ansia quando salti, parlane con qualcuno."
- **MOM-05** aiuto ("aiuto"): messaggio "Se il malessere non passa o diventa pesante, parlane con il medico o con uno psicologo".
- **MOM-06** settimana pesante: se la prontezza media degli ultimi 8 giorni (>=3 misure) e <50, il coach chiede "Cosa succede?" e propone di segnare un periodo (Hooper: >7 giorni = segnale).


## 13. Coach IA

- **IA-01** serve un consenso a parte (tz_consenso_ia) oltre a quello ai dati; attivabile solo se il coach (consenso ai dati) e attivo.

- **IA-02** un solo tipo di richiesta oggi: 'commento' (due righe da allenatore dopo la seduta, anche in automatico a fine seduta se non interrotta e non "passata"). Server: Worker Cloudflare (coach-allenamento.avgolden1994.workers.dev) che nasconde la chiave e conta i consulti (limite mensile mostrato nelle Opzioni: usati/limite).

- **IA-03** cosa viene inviato (contestoSeduta): obiettivi, livello, fase del corpo (deficit/massa...), "Modalita prudente attiva (questionario di salute)" se il PAR-Q e positivo, settimana del programma, titolo/data/durata della seduta, punteggio di prontezza, esercizi saltati, per ogni esercizio le serie fatte (ripetizioni x carico, RPE, cedimento) e la volta precedente; lingua dell'app; un identificativo anonimo casuale del dispositivo (UUID). Niente nome, niente BIA.

- **IA-04** COERENZA CON IL CONSENSO (da decidere): il testo che l'utente accetta dice "serie fatte, obiettivi e livello, niente nome e niente BIA". Il codice invia anche: fase del corpo, stato "modalita prudente" (deriva dal questionario di salute PAR-Q), punteggio di prontezza, durata, settimana del programma, identificativo del dispositivo. Il dato legato alla salute (modalita prudente) non e citato nel consenso.

- **IA-05** errori mai bloccanti: offline, rete, formato; timeout 25 s; il commento si puo richiedere a mano dalla seduta.


## 14. Salvaguardie e messaggi di salute

Dove il coach si ferma, rallenta o invia dal medico (utile per una revisione di sicurezza):

- **Modalita prudente** (PAR-Q positivo) e **over 65**: niente cedimento, 3-4 ripetizioni in riserva, tecniche "cluster"/"potenza", 8-12 ripetizioni, esigenza al 100%, aumenti dei carichi dimezzati (PRG-19/34, CAR-06, BIO-02, ESI-03, ETA-18, MAV-03).
- **Minorenni (13-17 anni)**: età obbligatoria, sotto i 13 anni nessun programma; al massimo 3 serie, 8-15 ripetizioni, nessuna tecnica, almeno 2 ripetizioni in riserva, nota «allenati con un adulto o un istruttore»; niente numeri su peso, cibo e integratori (ETA-01..04). Le salvaguardie MAV-02, MAV-03 ed ETA-01..03 sono sempre accese.
- **Dolore** durante la seduta: 4-5/10 riduce il carico, >=6/10 sostituisce l'esercizio e invita a vedere medico o fisioterapista; dolore in crescita su tre sedute: "fatti vedere da un fisioterapista" (DEC-01..04); controllo la mattina dopo (DOL-01).
- **"Mi sento male"**: ferma tutto e chiude la seduta come interrotta, che non conta per i carichi (PRZ-05).
- **Momenti di vita** con "guardia" (troppi allenamenti in 7 giorni) e "aiuto" (invito a parlare con medico o psicologo) (MOM-04/05).
- **BIA**: donne sotto il 17% di massa grassa, "da monitorare con un medico" (BIA-02); massa magra in calo: carichi fermi (PRO-04, MET-03).
- **Nutrizione**: proteine, passi e creatina sono "informazione, non prescrizione" (COR-03).
- **Riduzione della frequenza**: se la fatica resta alta per 3 sedute su 4 il coach propone di togliere un giorno (DEC-05), mai da solo.
- **Tutto annullabile**: le decisioni del questionario, le azioni del pannello e le modifiche della prontezza passano da un messaggio con "Annulla" (ripristina dati e aggiusti; non ripristina giorni di riposo spostati da altre azioni).

## 15. Memoria del coach (dove salva le cose, sul telefono)

| Chiave | Contenuto |
|---|---|
| `tz_consenso`, `tz_consenso_ia` | consenso ai dati / al Coach IA (con data e versione) |
| `tz_onboarded` | questionario iniziale gia fatto o saltato |
| `coach_plus_profile_<modalita>` | profilo: obiettivi, livello, fastidi, prove, psicologia, momento di vita, esigenza (valore e storia), orario, fase, cicli |
| `coach_plus_programma_<modalita>` | programma attivo: sedute, settimane, blocchi, fasi, RIR per settimana, inizio |
| `coach_plus_aggiusti_<modalita>` | aggiusti del coach: carichi ridotti o bloccati, scarico, controllo del dolore, stalli, correzione RIR, aderenza chiesta |
| `coach_plus_prontezza_<modalita>`, `coach_plus_prontezza_storia_<modalita>` | check di oggi e ultimi 14 giorni |
| `coach_plus_bia_<modalita>` | referti BIA |
| `coach_plus_history`, `coach_plus_data`, `coach_plus_cal_`, `coach_plus_rest_` | storico sedute con feedback, piano, calendario, giorni di riposo |

## 16. Dove la conoscenza sugli esercizi e scritta (tabelle e regex)

Le regole non leggono una scheda unica per esercizio: la stessa conoscenza ("quali sono i pesanti col bilanciere", "cosa carica la spalla") e ripetuta in piu tabelle. Questa e la causa del bug trovato il 1 ottobre (7 esercizi classificati male da `attrezzoDi`).

| Tabella | Riga | Cosa contiene |
|---|---|---|
| `EXERCISE_LIBRARY` | 3338 | 140 esercizi: gruppo, tipo, serie/ripetizioni/peso/recupero di partenza |
| `DETTAGLI` (js/dati/dettagli-esercizi.js) | — | una riga per esercizio: sezione (macchinari e cavi, pesi liberi, corpo libero), attrezzo, presa o attacco, sottogruppo, focus, muscoli secondari e la nota sul perche l'attacco conta (con la fonte). La sezione deve combaciare con `attrezzoDi`: lo controlla `tests/browser/dettagli-esercizi.js` |
| `SOTTOGRUPPI` | — | le parti di ogni gruppo muscolare (per esempio schiena: dorsali larghezza, spessore, lombari): ordinano gli elenchi e dicono cosa copre una seduta |
| `NOTE_ATTACCO` | — | 13 note su presa e attacco (rematore seduto, pulldown, pushdown, curl ai cavi, croci, leg extension, pressa, calf, leg curl...), con le prove EMG e la loro forza |
| `TECNICA` + `schede-varianti.js` | — | le varianti (presa o attacco diversi) riprendono passi ed errori dell'esercizio base e cambiano partenza, muscoli e consiglio |
| `WORKOUT_TEMPLATES` + `schede-epoca-oro.js` | — | 8 sedute pronte classiche (push, pull, legs, upper, lower, full body, glutei, core) e 13 sedute dell'epoca d'oro (Golden Six, Park A/B, Arnold, Mentzer, Yates, Reeves) con il giudizio di oggi nella descrizione |
| `MUSCLE_GROUPS` | 3328 | 7 gruppi: antagonisti e sinergisti |
| `attrezzoDi` | 8802 | attrezzo (bilanciere, manubri, macchine, corpo) dal nome, con regex |
| `RISCHIO` | 8812 | esercizi a rischio per spalle, ginocchia, schiena (fastidi dichiarati) |
| `SCHEMI_MOV` | 8871 | 6 schemi di movimento (squat, hinge, spinte, tirate), con regex |
| `ISOLAMENTI` | 8880 | 6 isolamenti (quadricipiti, femorali, bicipiti, tricipiti, deltoidi, polpacci) |
| `SLOT_DEF` | 8915 | 17 definizioni dei posti nelle ricette |
| `PRIORI` | 8944 | classifica di ~60 esercizi (1,5-3) |
| `IN_ALLUNGAMENTO` | 8887 | esercizi in allungamento (bonus) |
| `SCAMBI_ALLUNGAMENTO` | 8888 | varianti in allungamento da preferire |
| `SCHIENA_PESANTE` | 8890 | esercizi pesanti per la schiena (max 1 a seduta) |
| `GLUTEI_FAMIGLIE` | 8891 | 4 famiglie per l'obiettivo glutei |
| `BIL_PESANTI` | 10866 | esercizi "pesanti" col bilanciere (tipoCarico) |
| `ALZATE_BASE` | 10344 | 4 fondamentali (letta da STD-01, `livelloStandardForza`) |
| `STANDARD_FORZA` | 10340 | standard di forza come multipli del peso corporeo (letta da STD-01, `livelloStandardForza`) |
| `ZONE_DOLORE` | 9961 | 7 zone del dolore |
| `STRESS_ZONA` | 9970 | esercizi che caricano ogni zona (dall'onda 0 anche dip, piegamenti a diamante e declinati) |
| `SCALE_DOLORE` | 13923 | modifiche per fastidio dichiarato (spalle, ginocchia, schiena) |
| `CUE_SCHEMA` | 13826 | suggerimenti esterni per schema |
| `TECNICA` | 14832 | scheda tecnica con muscoli primari/secondari (usata solo dalla scheda esercizio) |

Tassonomie diverse per le zone del corpo: i **fastidi** del questionario sono 3 (spalle, ginocchia, schiena bassa); le **zone del dolore** a fine seduta sono 7 (spalla, gomito, polso, schiena bassa, anca, ginocchio, caviglia); `RISCHIO` usa le prime, `STRESS_ZONA` e `SOSTITUZIONI` le seconde.

## 17. Incoerenze e punti da decidere

Elenco in ordine di importanza. Sono fatti letti nel codice, non ancora corretti.

1. ~~Consenso del Coach IA incompleto~~ — risolto: il testo elenca tutto ciò che esce dal telefono (`TESTI_IA` in `js/coach/coach-ia.js`) e un test controlla che sia tradotto. Resta da verificare lato Worker se i dati vengono conservati.
2. **Conoscenza degli esercizi ripetuta** in 14 tabelle (capitolo 16). ~~Due tabelle mai usate, `STANDARD_FORZA` e `ALZATE_BASE`~~ — risolto nell'onda 0: le legge STD-01 (`livelloStandardForza`) come controllo di coerenza del livello. In parte risolta anche la ripetizione: hip thrust e ponte glutei non sono più nell'hinge, i femorali non sono più tra i secondari di squat e leg press (dati e scheda tecnica), il Pullover con Manubrio ha bersaglio dorsali (SEL-02). La scheda tecnica con muscoli primari e secondari (`TECNICA`) e usata solo per mostrare la scheda dell'esercizio, non dalle regole.
3. **Soglie diverse per lo stesso concetto.**
   - Massa grassa alta nelle donne: 30% e 35% in `analyzeBia`, 32% in `fattoreFisico` e nella ricomposizione (BIA, MET-03, COR-02).
   - Massa magra in calo: -0,5 kg riduce il volume del 15% (`fattoreFisico`), -1 kg ferma gli aumenti (`frenoBia`).
   - Due definizioni di scarico: il "reattivo" (da questionario, prontezza o strain) usa serie x0,6 e carico x0,9; quello di programma usa una dose per fatica (volume -35%, -50% o -70%; carico x0,95 o x0,9) (CAR-03/10, DEC-06). Onda 0: la definizione di «seduta di scarico» nello storico è una sola (`esercizioInScarico`, usata da MES-06, MES-10 e dalle analisi); le due dosi restano.
4. **Commenti che non corrispondono al codice.** L'intestazione del suggeritore elenca 5 regole, il codice ne applica 8 (SUG). L'intestazione di `schemaMisto` dice che col dimagrimento "i recuperi sono piu brevi", un commento nel codice dice che "le pause NON si accorciano" (PRG-04). ~~Il commento del motore dei carichi dice "-10% dopo due mancate", ma per i principianti il codice applica -5% (CAR-07)~~ — risolto nell'onda 0 (il commento e la riga CAR-07 dicono -5% per il principiante e -10% per gli altri).
5. **Regole di progressione dei metodi famosi solo descritte.** Starting Strength, StrongLifts, GZCLP e altri dichiarano le loro regole di progressione; nel motore dei carichi non ho trovato diramazioni per metodo: vale sempre la progressione unica (MET-06). Da verificare con una prova.
6. **Sostituzioni "per sempre" e continuita dei progressi.** Le sostituzioni del coach (dolore, azione "cambia variante", rotazione accessori) cambiano il nome dell'esercizio in tutti i giorni e usano il carico di partenza stimato dai dati del corpo (dal 1 ottobre; prima il valore di default della libreria); lo storico e i massimali restano legati al nome vecchio, quindi per il nuovo esercizio la progressione riparte da quella stima ("prima volta"). Il nuovo "Macchinario occupato" e invece temporaneo.
7. ~~Regola ripetuta~~ — risolto: il limite di 3 serie usa un solo parametro (`serieMaxPrudente`).
8. ~~Numeri magici sparsi~~ — in parte risolto: i principali sono in `js/coach/parametri.js`; restano soglie minori dentro le funzioni.
9. ~~Il codice del coach era mescolato al resto~~ — risolto: ora sta in `js/coach/` (una cartella, un file per argomento).
10. **Giorni doppi sopra i 65 anni solo in RIC-05.** Dall'onda 0 CAR-04 (rientro dopo una pausa su un esercizio) conta i giorni veri per tutti; RIC-05 (rientro del piano intero, `rientroPiano` in `regole-nuove.js`: 14 giorni, 7 oltre i 65) e il testo del registro (B20) li contano ancora doppi. Da allineare in W4-T2 (CST-01, CST-02, MES-15).
11. **Salvaguardie e interruttori.** MAV-02, MAV-03 ed ETA-01..03 sono salvaguardie sempre accese; ETA-04 (niente numeri su peso e cibo ai minorenni) è invece in `REGOLE_SPEGNIBILI` per scelta di W0-T4. Da uniformare quando W1-T1 legge «(spegnibile)» dalla riga della mappa.
12. **Età minima.** La logica del coach usa 13 anni (decisione dell'utente, D-P9); la soglia legale per i dati personali (14 in Italia) è da verificare con un legale prima del rilascio (registro G.1).

## 18. Come usare questa mappa

1. Leggila e segna le regole da **tenere**, **cambiare** o **togliere** (ad esempio con T / C / X accanto al codice).
2. Decidi i punti del capitolo 17, a cominciare dall'1 (consenso del Coach IA).
3. Il riordino consigliato parte da qui: una scheda per esercizio al posto delle tabelle (capitolo 16), un catalogo unico di regole con i parametri in una tabella, e test sui casi noti. Questa mappa diventa l'elenco dei casi da provare.

## 19. Regole aggiunte dalla ricerca (RIC)

Cinque regole nuove, ognuna spegnibile (`regolaAttiva`, vedi `js/coach/parametri.js`; spegnibili anche INT-04, INT-05, ALG-02, MES-02, MES-06, MES-09..12, PRN-01, STD-01, ETA-04 e CAS-14). In fondo al capitolo ci sono le regole dell'onda 0 del coach v2: sono «spegnibili» solo quelle segnate così; MAV-02, MAV-03 ed ETA-01..03 sono salvaguardie (tolgono o riducono) e restano sempre accese, con il motivo scritto nella nota dell'esercizio. Non toccano le salvaguardie: modalità prudente, over 65, principianti, dolore e scarico hanno la precedenza (le regole RIC-01 e RIC-02 non scattano per loro). Codice in `js/coach/regole-nuove.js` e, per RIC-03, in `js/coach/programma/schemi.js`.

- **RIC-01** serie in più nelle settimane centrali del blocco (Pelland 2025, Bell 2024): in una settimana di carico che non è né la prima né l'ultima prima dello scarico, +1 serie (massimo 5) sugli esercizi dei muscoli prioritari, se la prontezza media delle ultime due sedute registrate è almeno 70 (o non c'è alcun dato). Con lo scarico si torna alle serie del programma.
- **RIC-02** pausa prima di abbassare il carico (Singer 2024): se nell'ultima seduta tutte le serie tranne l'ultima erano complete (almeno 3 serie) e il carico resta fermo, +45 secondi di pausa. Prima lo faceva solo il principiante (+30).
- **RIC-03** (spegnibile) posizione allungata per schiena e glutei (Maeo 2021-2023, Pedrosa 2025): pullover coi manubri, affondi bulgari e stacco rumeno contano come esercizi in allungamento (preferiti nella scelta). Le croci, ai cavi e coi manubri, stanno alla pari: niente +1,5 per le croci su panca e nessuno scambio tra «Croci ai Cavi» e «Croci su Panca Manubri» (D-P8, 2026-10-05). Nessuna coppia di scambio nuova: «Pullover ai Cavi» -> «Pullover con Manubrio» è tolta (SEL-02: cambiava gruppo).
- **RIC-04** tetto alle tecniche al cedimento (Robinson 2024): al massimo una tecnica intensa (drop set, AMRAP, parziali, calibrazione) per seduta; nessuna nella settimana di scarico o con prontezza sotto 50. La tecnica del programma resta: per quel giorno non compare.
- **RIC-05** rientro per tutto il piano (detraining, SBS): se dall'ultima seduta sono passati almeno 14 giorni (7 sopra i 65 anni), la prima seduta ha il 25% di serie in meno su ogni esercizio (minimo 2) in aggiunta al calo di carico per esercizio di CAR (rientro dopo una pausa). Il carico per esercizio c'era già: la novità è il volume.
- **MAV-02** (storica: sempre accesa, ponte di W0-T2; la matrice completa tecnica x classe è di W2-T3) niente cedimento sul core, sugli esercizi a tempo, a peso zero e sugli stacchi (`senzaCedimento`, ABB-09): le tecniche `TECNICHE_AL_CEDIMENTO` (drop, parziali, AMRAP, back-off, calibrazione, riposo-pausa) non vi vengono mai messe, nemmeno dai metodi famosi (GreySkull, GZCLP, Reddit PPL) o dai tocchi.
- **MAV-03** (storica: sempre accesa, ponte di W0-T2) le tecniche al cedimento non si danno ai principianti, ai minorenni (13-17), agli over 65 e in modalità prudente (PAR-Q): `tecnicheOk` in `buildProgram`. Over 65: «potenza» solo su macchina (la libreria non ha l'alzata dalla sedia), «cluster» solo agli adulti. I metodi con l'AMRAP nello schema lo perdono per chi non può e la loro avvertenza lo dice (`ATTENZIONE_AMRAP` in metodi-momenti.js); il tocco AMRAP non si prende per chi non può.
- **ETA-01** (storica: sempre accesa, D-P9, ponte di W0-T2; assorbe REC-11) l'età è obbligatoria prima del programma: nel passo «Preferenze» dell'onboarding il campo «Quanti anni hai?» (da 13 a 99, `etaPerProgramma`) tiene spento «Avanti» e `onbNext` riporta al passo se manca; in Opzioni il campo ha min e max e `setCoach('age')` rifiuta un valore non valido col messaggio. Sotto i 13 anni nessun programma: «Sotto i 13 anni il coach non crea programmi: allenati con un adulto esperto» (`buildProgram` lancia un errore per età da 1 a 12; un'età non detta in un profilo già salvato conta come adulto, così i programmi di prima non cambiano).
- **ETA-02** (storica: sempre accesa, D-P9, ponte di W0-T2) profilo minorenne, 13-17 anni: al massimo 3 serie per esercizio, 8-15 ripetizioni, nessuna tecnica (niente AMRAP, drop, parziali, cluster, potenza), niente 5x5 «fisso» né 6x3, niente metodi ad alta intensità (`sceltaMetodo` lo tratta come prudente), ripetizioni in riserva almeno 2 (`rirSett` = 2, 4 nello scarico; lo legge `rirBersaglioBase`), niente mesociclo che scende a RIR 0. Non fatto: al massimo 3 sedute con i pesi a settimana (matrice per i minori di W2-T3).
- **ETA-03** (storica: sempre accesa, D-P9, ponte di W0-T2) note al minorenne: «Alla tua età conta imparare bene i movimenti: niente massimali né serie al limite, lascia sempre 2-3 ripetizioni in riserva.» e «Allenati con un adulto o un istruttore: la tecnica viene prima dei carichi.»
- **CAS-14** (spegnibile) (ponte di W0-T2, D-P11; con la regola spenta il posto della tirata verticale resta com'era, lo riempie solo il blocco «schemi mancanti» di PRG-21) senza sbarra (casa, o palestra con solo bilanciere e manubri) il posto della tirata verticale prende il «Pullover con Manubrio» (dorsali, riserva della tirata verticale) oppure, se non c'è, una serie in più di rematore (al massimo 4, 3 per chi inizia), con la nota «Senza sbarra la schiena si allena con rematori e pullover: meno completo.». La tabella degli equivalenti da casa è di W1-T5.
- **PRN-01** (spegnibile) esigenza del principiante (ex PRI-01): il principiante parte da 100% (`esigenzaIniziale`), non sale oltre il 100% (`tettoEsigenza`), non perde il RIR dell'esigenza e non vede la nota "Coach esigente"; il bilancio delle prime due sedute (INT-05) lo può solo abbassare (minimo 90%). Motivo: nelle prime settimane si impara a muoversi senza stare vicino al cedimento (Convenzione; le stime del RIR sbagliano di circa una ripetizione, Halperin 2022). Codice in `esigenza.js` e `intensita.js`.
- **MES-02** (spegnibile) RIR di partenza per livello (ponte dell'onda 0: la tabella completa è di W2-T4; `MES_RIR`, `rirBersaglioBase(nome, sett)` in `regole-ricerca.js`): principiante 3-4 ripetizioni in riserva nelle prime due settimane e 2-3 dopo, mai 0; intermedio e avanzato almeno 2 nella prima settimana del blocco su ogni tipo di esercizio e almeno 1 sui fondamentali pesanti col bilanciere anche con la rampa dell'avanzato (rirSett); il -1 RIR dell'esigenza non scende sotto questi pavimenti e non si applica in dimagrimento (Convenzione + Moderata: Halperin 2022, Refalo 2023, Robinson 2024). Chiude i controlli RIR-02 e RIR-03 del collaudo.
- **MES-10** (spegnibile) lo scarico fuori dalle analisi (`inScarico`, `faseDelGiorno` in `regole-ricerca.js`): le sedute della settimana di scarico, o scaricate dal coach, non contano per l'esigenza (ESI-02), gli esercizi fermi (STA-01), lo scarico mirato (CAR-08, con la soglia del 3%), il verdetto del ciclo (CIC-01) e lo strain (STR-01: nessun secondo scarico entro 14 giorni). Per le sedute senza etichetta la fase si ricostruisce dal programma e dalla data. Convenzione (rumore del RIR, circa 3%).
- **MES-11** (spegnibile) l'esigenza si calcola con il RIR bersaglio della seduta (`rpeBersaglioSeduta`: `obiettivo.rir` salvato nella seduta, altrimenti quello della settimana in cui è stata fatta) e non con quello di oggi: al passaggio dall'ultima settimana di carico allo scarico l'RPE giusto della settimana prima risultava 4 punti sopra il bersaglio nuovo e dava un -5% spurio (bug N4). Convenzione (correzione di un errore).
- **MES-12** (spegnibile) verdetto di ciclo senza scarichi: l'ultima seduta di un ciclo è sempre di scarico, quindi un intermedio che saliva dell'1,5% a settimana risultava in "stallo"; ora per esercizio si confronta la media delle 3 migliori sedute di carico degli ultimi 2 blocchi con quella delle 3 prime e conta solo una salita oltre il 3% (vedi CIC-01). Convenzione + ragionamento (bug N3).
- **STD-01** (spegnibile) tabelle di forza come controllo di coerenza del livello (`livelloStandardForza`, `proposteLivello` in `repertorio.js`): "Aggiorna il livello" solo se LIV-01 e almeno 2 alzate su 4 raggiungono la soglia del livello (3 intermedio, 4 avanzato); con meno di 2 alzate misurate, o con il peso fuori da 55-110 kg (uomini) e 45-90 kg (donne), le tabelle non decidono e resta LIV-01; un avanzato dichiarato sotto il livello 2 in tutte le alzate misurate (almeno 2) riceve la proposta "Passa a intermedio" (rivedere il livello o il peso di partenza). Il livello cambia solo col tocco dell'utente, si annulla, e dopo "Lascia com'è" la proposta non si ripete per 28 giorni. Convenzione (tabelle di una fonte di terzi, livello 3).
- **ETA-04** (spegnibile) guardia di sicurezza: sotto i 18 anni niente numeri su peso, cibo e integratori: `corpoCoach` non dà proteine, passi, ritmo di calo né creatina e rimanda a un medico o a un dietista; `statoBia` non dà giudizi sulla BIA (i riferimenti sono da adulti). Convenzione (prudenza; vulnerabilità ai disturbi alimentari e pressione verso gli integratori: Lloyd, AAP).
- **ETA-18** (storica, correzione) aumenti dimezzati dopo i 65 anni: il capitolo 14 diceva «aumenti dimezzati» per gli over 65 ma il codice li dimezzava solo con PAR-Q o sonno scarso; ora `caricoProssimoBase` li dimezza anche per età >= 65 (anche quelli a percentuale dell'RPE), con il motivo scritto "aumento dimezzato: dopo i 65 anni si sale più piano".

## 20. Dove sta il codice

| Area | File |
|---|---|
| Suggerimento del prossimo esercizio (SUG) | `js/coach/suggeritore.js` |
| Costruzione del programma (PRG, MET, PRZ) | `js/coach/programma/motore.js`, `schemi.js`, `ricette.js` (contiene `buildProgram`), `alternative.js`, `archivio.js` |
| Abbinamenti e struttura professionale (ABB) | `js/coach/programma/struttura-pro.js` (ABB-05 in `splitFor`, `js/ui/onboarding.js`) |
| Intensita dal corpo e dalle prime sedute (INT) | `js/coach/intensita.js` |
| Metodi e schede dell'epoca d'oro (EPO, TEC) | `js/coach/metodi-epoca-oro.js`, `js/dati/schede-epoca-oro.js`, `TECNICHE` in `js/coach/regole-ricerca.js` |
| Carichi (CAR) | `js/coach/carichi/progressivo.js`, `partenza.js` |
| Questionario e decisioni (DEC, STR) | `js/coach/questionario-decisioni.js` |
| Prontezza, «mi sento male», dolore (PAR, LIV, DOL) | `js/coach/prontezza.js`, `mi-sento-male.js`, `dolore-mattina.js` |
| Repertorio e regole dalla ricerca | `js/coach/repertorio.js`, `regole-ricerca.js`, `regole-nuove.js` (RIC) |
| Parametri e catalogo | `js/coach/parametri.js`, `catalogo-regole.js` (generato dalla mappa) |
| Selezione degli esercizi (SEL) e dati degli esercizi | `js/dati/dettagli-esercizi.js`, `libreria-esercizi.js`, `js/coach/programma/schemi.js` (`SCHEMI_MOV`, `SCHEMI_RISERVA`), `alternative.js` |
| Età, tecniche al cedimento e tetti del generatore (ETA, MAV, CAS) | `js/ui/onboarding.js` (`etaPerProgramma`), `js/coach/programma/ricette.js` (`senzaCedimento`, `SCHEMI_ATTESI`), `js/coach/compone.js` (`TOCCHI`) |
| Carico di riferimento e storico per fase (ALG, MES) | `js/coach/carichi/progressivo.js` (`caricoRiferimento`, `esercizioInScarico`), `js/coach/regole-ricerca.js` (`caricoProssimoBase`, `inScarico`) |
| Consigli e agente | `js/coach/agente-consigli.js` |
| Dati del corpo (BIA) | `js/coach/bia/lettore.js`, `opzioni.js` |
| Biomeccanica, esigenza, psicologia, metodi e momenti | `js/coach/biomeccanica.js`, `esigenza.js`, `psicologia.js`, `metodi-momenti.js`, `compone.js` |
| Stato e pannello del coach | `js/coach/stato.js`, `pannello.js` |
| Coach IA (IA) | `js/coach/coach-ia.js` |
