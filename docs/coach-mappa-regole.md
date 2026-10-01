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

- **PRG-01** durata e blocchi per livello (strutturaProgramma): principiante 8 sett. (blocco 4 = 3+1 scarico); intermedio 12 sett. (blocco 4); avanzato 12 sett. (blocco 6 = 5+1). Fasi: ogni ultima settimana del blocco = 'scarico'.
- **PRG-02** divisione settimanale (splitFor / splitPerFrequenza): <=2 giorni Full Body; principiante 3 gg Full Body 3x, 4+ Upper/Lower; intermedio 3 PPL, 4 Upper/Lower x2, 5 PPL+UL, 6 PPL x2; avanzato (stessi schemi per 3-6 gg). Se l'utente sceglie la frequenza (1x, 2x, 3x a settimana per muscolo) si rispetta (Schoenfeld 2019, Ramos-Campo 2024): 1x -> PPL/Upper-Lower + "punti deboli"; 2x -> Upper/Lower/FullBody...; 3x -> Full Body ecc.
- **PRG-03** numero di esercizi per seduta (exerciseCountFor): n = floor((minuti - 10) / (serie*(35+recupero multiarticolare)/60)), min 3, max 7. Principiante con poca fiducia (psico) e >3 esercizi: -1.

### Obiettivi (schemeFor) — serie x ripetizioni, recuperi

forza 5x5, rec. multi 210 s / iso 90 s, 8 sett. (Robinson 2024, ACSM 2026); massa 4x10, 150/75, 10 sett. (Pelland 2025, Singer 2024); dimagrimento 3x12, 105/60, 8 sett. (Roth 2023); ricomposizione 3x10, 120/75, 12 sett.; glutei 3x12, 120/60, 10 sett.; salute 3x10, 90/60, 8 sett. (ACSM 2026)

- **PRG-04** mescola fino a 3 obiettivi (schemaMisto): il primo decide lo schema; forza come secondario -> il primo multiarticolare diventa 5x5 pesante; massa secondario -> isolamenti 3x12; ricomposizione o salute secondari -> tetto 4 serie; dimagrimento -> nota cardio.

> Incoerenza nei commenti: l'intestazione di `schemaMisto` dice "dimagrimento -> recuperi piu brevi e una nota sul cardio", un commento nel codice dice "col dimagrimento le pause NON si accorciano" e il codice imposta solo la nota sul cardio. Come obiettivo principale, invece, lo schema ha gia pause piu corte (105/60 s contro 150/75 s della massa).

### Scelta degli esercizi (ricette a slot)

- **PRG-05** ogni giorno e una "ricetta": lista di posti (spinta orizzontale, tirata verticale, hinge, squat, isolamenti...). Ricette: push, pull (2 varianti), legs, upper (2 varianti), lower (2 varianti), fullbody (3 varianti), punti deboli (dalle priorita dell'utente).
- **PRG-06** per ogni posto: candidati = esercizi della libreria che rispondono alla definizione del posto (SLOT_DEF: 17 definizioni); punteggio = classifica degli esperti (PRIORI, ~60 esercizi, 1.5-3) + bonus +3 per il bilanciere pesante al primo posto (non se cauto, -3 se cauto) + bonus biomeccanico (bonusBiomecc) + gradito +3 + in allungamento +1.5 - gia usato in settimana (-1 principiante, -4 altri) + variazione casuale controllata da un seme (0-1 principiante, 0-2.5 altri, moltiplicata per il fattore varieta psicologico) - 2 al bilanciere se "a disagio".
- **PRG-07** vincoli: attrezzi della palestra, luogo (casa con manubri / corpo libero), esercizi odiati, fastidi (RISCHIO: spalle, ginocchia, schiena) tramite consentito(); al massimo 1 esercizio pesante per la schiena a seduta (SCHIENA_PESANTE).
- **PRG-08** con obiettivo forza il primo esercizio pesante e FISSO (niente variazione): la forza e specifica dello strumento.
- **PRG-09** se l'esercizio migliore non e consentito si registra la sostituzione ("Evito X: uso Y").
- **PRG-10** allungamento (SCAMBI_ALLUNGAMENTO): dove provato, si scambia la variante (es. pushdown -> estensione sopra la testa, leg curl sdraiato -> seduto, French press -> sopra la testa) se consentita (Maeo 2021-2023).
- **PRG-11** PHUL: l'intermedio (senza metodo famoso) con upper/lower: la prima seduta e "forza", la seconda "ipertrofia".

### Serie, ripetizioni e recuperi per ogni esercizio

- **PRG-12** tipo di carico (tipoCarico): isolamento (non multiarticolare), macchina (multiarticolare non nell'elenco), pesante (BIL_PESANTI: squat, front squat, stacchi, panche col bilanciere, military, rematore col bilanciere, T-bar, good morning).
- **PRG-13** ripetizioni: pesante 5 se forza, altrimenti max 8; macchina 8+ (8 se forza; con obiettivo forza max 4 serie); isolamento 10+ (con forza max 3 serie). Recupero: pesante = recupero multi dell'obiettivo; macchina = max(90, 75%); isolamento = max(60, recupero iso).
- **PRG-14** primo multiarticolare con forza come secondo obiettivo: 5x5 con 180 s (non sopra i 65 anni).
- **PRG-15** forza come primo obiettivo, non principiante, esercizio pesante, non cauto: 6x3 con 180 s.
- **PRG-16** giorno 'forza' (PHUL): pesante 4 serie, recupero >=180; giorno 'ipertrofia': pesante 8 rip, altri multi 10, isolamenti 12.
- **PRG-17** massa come secondario: isolamenti 3x12. Tetto serie dell'obiettivo (4 con ricomposizione/salute).
- **PRG-18** principiante: max 3 serie (2-3 serie impegnative, Barbell Medicine).
- **PRG-19** over 65: max 3 serie, 8-12 rip. PAR-Q positivo: multiarticolari 8-12 rip (60-80% del carico, niente apnea; ACSM). "cauto" = over 65 oppure PAR-Q positivo: niente pesanti favoriti.
- **PRG-20** donne: recupero -15% (min 60 s) (PeerJ 2025). A tempo (plank ecc.): ripetizioni = valore della libreria (secondi). Recupero arrotondato a 15 s.

### Completamenti settimanali

- **PRG-21** schemi di movimento mancanti (piramide di Helms): ogni settimana servono i 6 schemi (squat, hinge, spinta/tirata orizzontale, spinta/tirata verticale); se manca, si aggiunge nella seduta piu vuota adatta (3 serie max; cauto/principiante: meno pesanti). Non con i metodi "essenziale".
- **PRG-22** glutei: se l'obiettivo include glutei, le 4 famiglie ogni settimana (spinta d'anca, squat/affondi, stacchi, abduzioni) 3x12, 75 s.
- **PRG-23** copertura per regioni (Schoenfeld, Maeo, Pedrosa): se >=3 giorni e obiettivo non salute: femorali con flessione di ginocchio (leg curl) se ci sono gambe; leg extension (retto femorale) per massa o glutei; alzate laterali se c'e panca e obiettivo massa/ricomposizione; bicipite: se >=2 curl senza Scott/spider, un curl diventa Scott/Spider (Pedrosa 2025). Aggiunte da 2 serie, 75 s.
- **PRG-24** note sui fastidi (SCALE_DOLORE) aggiunte al programma per ogni fastidio dichiarato.

### Volume per muscolo

- **PRG-25** volume settimanale (serie): VOLUME_LIVELLO principiante 8-10, intermedio 10-14, avanzato 14-20; salute 6-12.
- **PRG-26** fattore fisico: massa magra bassa (FFMI basso) e non dimagrimento: x1,2; massa magra in calo: x0,85.
- **PRG-27** esigenza del coach (ESIGENZA_INIZIO): +20% di volume all'inizio, segue l'andamento; =1 se cauto o con un "momento di vita" attivo che riduce volume o aumenta RIR; >=1,15 aggiunge la nota "Coach esigente". <1 riduce min e max.
- **PRG-28** conteggio frazionario: 1 serie per il muscolo principale, 0,5 per sinergisti nei multiarticolari (Pelland 2025). Aggiusta le serie (+1 al meno carico, max 5; -1 al piu carico, min 2, senza toccare i "fissi") finche il volume e dentro min-max.
- **PRG-29** priorita: gruppo prioritario x1,2 (x1,5 se avanzato che specializza); avanzato che specializza: gli altri gruppi min 6, max = vMin.
- **PRG-30** tetto di 11 serie per muscolo per seduta (si tolgono serie dagli esercizi non fissi, min 2).

### Aggiustamenti finali del programma

- **PRG-31** principianti e over 65: mai piu di 3 serie per esercizio (ripetuta: gia in PRG-18/19).
- **PRG-32** poco sonno ("male"): -1 serie sugli accessori (non il primo esercizio, non i "fissi"), minimo 2.
- **PRG-33** la seduta deve stare nei minuti dichiarati (+5 di tolleranza; 8 min di base + serie*(35 s + recupero)): si tolgono serie dagli esercizi non prioritari, prima gli isolamenti; se non basta si toglie l'ultimo isolamento (se restano >3 esercizi).
- **PRG-34** tecniche: poco tempo (<=45 min) -> superserie spinta+tirata e drop set sull'ultimo isolamento (non se intensita psicologica bassa); over 65 -> primo multiarticolare "potenza"; PAR-Q positivo o over 65 -> "cluster" sui pesanti; non principiante e primo esercizio pesante -> avanzato "back-off", intermedio "AMRAP" (non se intensita bassa); avanzato o intermedio con intensita alta (non poco tempo): tecnica anche su un isolamento.
- **PRG-35** il metodo scelto (schede famose) decide serie, ripetizioni e pause; il "tocco" secondario applica una piccola modifica; alcuni metodi impongono le superserie.
- **PRG-36** regola del picco e della fine: chi non ama la fatica (intensita bassa) -> -1 serie sull'ultimo esercizio.
- **PRG-37** note aggiunte al programma: poco tempo (superserie -37% di tempo), over 65 (2-3 serie da 8-12, niente cedimento, 5 minuti di equilibrio), donne (pause piu corte), dimagrimento (10-12 mila passi, +500-1000 a settimana, il cardio non toglie muscolo).
- **PRG-38** avanzati: mesociclo con RIR 3,2,1,0 nelle settimane di carico, 4 nello scarico.
- **PRG-39** esercizi alternativi scelti dall'utente: sostituiti nello stesso posto, peso di partenza dalla libreria.

Uscita: programma con sedute, giorni, note, sostituzioni, fasi, RIR a settimana, seme (ripetibile).


## 6. Metodi famosi e scelta della struttura

- **MET-01** catalogo di 19 metodi (7 non applicabili: solo ispirazione). Tabella estratta dal codice:

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

_totale 19 | con tocco: stronglifts->amrap, greyskull->amrap, gzclp->amrap, gbr->isolamenti, hatfield->piramide, redditppl->amrap, minimo->superserie_

- **MET-02** punteggio di un metodo per te (metodiPerTe): luogo non adatto = escluso; livello adatto +3 (altrimenti -4); giorni adatti +2 (altrimenti -1); obiettivo principale adatto +2 (altrimenti -2); minuti disponibili: sotto il minimo del metodo -2, dentro il range (+15) +1; intensita uguale a quella psicologica +2 (se intensita bassa e metodo alto: -4); routine (varieta 0) con metodo rigido +2; chi ama cambiare (varieta>1): +2 con metodi variabili, -1 con quelli senza variazione; fiducia bassa: +2 per metodi flessibili da <=45 minuti, -2 per intensita alta; disagio in palestra: +2 a corpo libero/dose minima, -2 ai metodi con fondamentali pesanti; motivazione "piacere": +1 ai metodi con record/AMRAP; tutto-o-niente: +2 se sedute <=30 min; corpo libero: +3 alla Recommended Routine; "momento di vita": Mantenimento +6/+8 se volume <=0,6/0,5, Dose minima +4, -3 ai metodi ad alta intensita se il volume e ridotto, +1 ai rigidi per chi ha ansia; il metodo del coach +1; non applicabili -1.
- **MET-03** fattore fisico sulla scelta (sceltaMetodo): massa magra bassa +2 a GBR, Hatfield, Reddit PPL, PHUL; grasso alto +1 a coach/minimo/GBR e -1 ai metodi con pesanti; massa magra in calo -2 ai metodi ad alta intensita.
- **MET-04** ammissione (metodoAmmesso): applicabile, livello, giorni, luogo, obiettivo, cauto (PAR-Q o over 65) esclude alta intensita; Recommended Routine solo a corpo libero; Mantenimento solo con un periodo di vita a volume <=0,6; Dose minima solo con periodo difficile, <=35 minuti, fiducia bassa o tutto-o-niente; HIT solo con intensita psicologica alta; minuti disponibili almeno il minimo-5.
- **MET-05** la STRUTTURA cambia solo se un metodo batte chiaramente quello del coach (+2 punti); un secondo metodo (fino a -3 punti dal coach) puo dare un "tocco": AMRAP sull'ultima serie del primo fondamentale, ultimo isolamento da 15-20 (piramide), isolamenti da 12-15, superserie spinte+tirate.
- **MET-06** cosa decide un metodo applicato: split, numero di esercizi, ricette dei posti, schema (serie, ripetizioni, recuperi, tecniche), superserie, PHUL, luogo. Il programma mostra "da dove ha preso spunto" con i motivi (fino a 3).

Attenzione: nel motore dei carichi (caricoProssimo) non ho trovato diramazioni per metodo: le regole di progressione descritte nei metodi (es. Starting Strength "+2,5 kg a ogni seduta; due mancate = -5%", StrongLifts "mancato piu volte = -10%", GZCLP "6x2, poi 10x1") sono "come" testuali; la progressione reale e quella unica di G.

Fattore fisico (fattoreFisico): da BIA (massa grassa %, FFMI): grasso alto = >32% donne / >25% uomini; FFMI basso = <15 donne / <18 uomini e non grasso alto; massa magra in calo = -0,5 kg nell'ultima BIA (nota: il freno ai carichi PRO-04 scatta a -1 kg, due soglie diverse per lo stesso fenomeno). Testi: massa magra bassa -> piu serie (x1,2 PRG-26); grasso sopra la media -> si tengono i carichi, passi 8-10 mila e cardio leggero; massa magra in calo -> volume -15% e carichi fermi; proteine 2,35 g/kg di massa magra.


## 7. Prontezza prima della seduta

- **PRZ-01** punteggio = media pesata: sonno 30, stress 25, dolenzia 25, voglia 20 (FitnessVolt, Hooper); voce facoltativa "ciclo" peso 15 (trattata come sonno e stress: niente programmazione per fasi, Colenso-Semple 2023). Ogni risposta vale 0, 1 o 2 su 2.
- **PRZ-02** fattore sul carico dei multiarticolari non ancora iniziati: >=70% come da piano; 50-69% x0,96 ("un RIR in piu", -4%); <50% x0,9 ("seduta leggera", -10%). Gli isolamenti non si toccano (il sonno scarso cala la forza solo nei multiarticolari, Knowles 2018).
- **PRZ-03** giornata ottima (>=70%) in settimana di carico: +1 serie sugli isolamenti (max 5 serie).
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
- **CAR-03** settimana di scarico del programma: serie = serie base x dose, carico = ultimo x dose; la dose dipende dalla fatica (livelloFatica, Bell 2024): bassa (RPE medio <7 e prontezza >=70) volume -35% (carico x0,95); media volume -50% e carico -10%; alta (RPE >=9 o prontezza <50) volume -70% e carico -10%. "Mai stop totale: la forza calerebbe".
- **CAR-04** rientro dopo una pausa su QUELL'esercizio (detraining, SBS): 10-20 giorni -10%; 21-28 giorni -20%; fino a 90 giorni -30%; oltre -50%; sopra i 65 anni i giorni contano il doppio. Con "3 ripetizioni in riserva".
- **CAR-05** corpo libero (carico 0): tutte le serie complete = +1 ripetizione; altrimenti stesse ripetizioni.
- **CAR-06** tutte le serie complete ("ok"): 
  - freno della BIA: carico invariato (PRO-04);
  - incremento = incrementoPer (PRO-01), dimezzato (min 0,5 kg) in modalita prudente o sonno scarso;
  - autoregolazione dall'RPE segnato (Helms 2018, con correzione "rirBias" imparata dalla calibrazione): RPE medio >= bersaglio+1 -> stesso carico ("consolida"); RPE medio <= bersaglio-1 -> aumento maggiore (+4% per punto di scarto, max +10%, mai meno dell'incremento standard);
  - esercizi pesanti con serie finale AMRAP (nSuns): se tutte le serie sono fatte e l'ultima ha >=2 ripetizioni in piu, il salto e 2,5 kg con 2-3 in piu; con 4-5 in piu 2,5 kg (5 kg gambe e glutei); con 6 o piu 5 kg (7,5 kg gambe e glutei); mai meno dell'incremento standard, dimezzato in modalita prudente;
  - isolamenti: doppia progressione, prima +1 ripetizione fino alla cima del range (ripetizioni previste +3), poi +incremento e si riparte;
  - micro-incrementi: se l'incremento supera il 5% del carico, prima +1 ripetizione (fino a previste +2), poi il peso;
  - altrimenti +incremento.
- **CAR-07** due volte di fila "mancato": principiante su un pesante gia in stallo una volta -> stesso peso, schema 5x3 (poi 6x2 e 10x1, GZCLP); principiante -5%; tutti gli altri -10% ("si ricostruisce"). Contatore stalli per esercizio.
- **CAR-08** scarico mirato: massimale stimato in calo per due sedute di fila (3 punti) -> -10% e meta serie solo su quell'esercizio (Dr. Muscle).
- **CAR-09** un solo "mancato": principiante stesso peso con +30 s di pausa; altri stesso carico, "punta a piu ripetizioni".

Poi, in caricoProssimo (aggiusti del coach, vedi D/F):

- **CAR-10** scarico deciso dal coach attivo (aggiusti.scarico): carico x0,9 e serie = 60% della base (min 2).
- **CAR-11** aggiusto per esercizio: fattore (dolore, reset) -> carico x fattore; "blocca" -> toglie l'aumento; "extra" -> +1 incremento in piu; "alte ripetizioni" (gomito/ginocchio) -> almeno 12 ripetizioni.
- **CAR-12** a ogni esercizio con carico si aggiunge il bersaglio di ripetizioni in riserva (testoRir).
- **CAR-13** tecnica "back-off": dopo la prima serie le altre a -95%.
- **CAR-14** calibrazione del RIR: nell'ultima settimana di carico di ogni blocco, l'ultima serie del primo isolamento va a cedimento; il coach confronta il RIR stimato (10 - RPE medio delle altre serie) con quello vero e aggiorna una correzione (rirBias, media mobile 50%, limitata a -2..+3).
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

## 9. Biomeccanica e prove fai-da-te

- **BIO-01** suggerimenti esterni (cueEsercizio): per ogni schema di movimento una frase (squat "spingi via il pavimento con tutto il piede"; hinge "fianchi indietro come per chiudere una porta"; spinta orizzontale "allontana il peso da te"; spinta verticale "verso il soffitto e passa con la testa sotto"; tirata orizzontale "gomiti verso i fianchi"; tirata verticale "gomiti verso le tasche"); per gli isolamenti "senti il muscolo che lavora: discesa in 2-3 secondi"; per tutti "stessa ampiezza a ogni seduta". Se nelle prove la larghezza dello squat e stata scelta: la ricorda; se la caviglia e rigida: "talloni su due dischi sottili".
- **BIO-02** respirazione (respiroPer): con PAR-Q positivo "non trattenere il fiato, 8-12 ripetizioni, carichi moderati".
- **BIO-03** cedimento solo su varianti stabili (stabile): isolamenti e macchine; i pesi liberi multiarticolari restano ad almeno 1 RIR.
- **BIO-04** prove fai-da-te (TEST_FAI_DA_TE, Horschig/Movement Fix): caviglia (ginocchio al muro a 12 cm), spalle (braccia al muro), larghezza dello squat. DAL 01/10 le istruzioni sono esplicite (passi, risultato, sicurezza, a cosa serve).
- **BIO-05** bonus nella scelta degli esercizi (bonusBiomecc): caviglia rigida -> squat guidati (hack, leg press, pendulum, goblet, multipower) +2, squat/front squat col bilanciere -2; spalle "no" o fastidio alle spalle -> landmine press +3, military/lento avanti/Arnold -3; fastidio alle spalle sulle spinte orizzontali: manubri, chest press, presa stretta +1,5; croci ai cavi +0,5 (tensione su tutto il movimento, Menno); calf raise in piedi +1 (gastrocnemio cresce il doppio, Kinoshita 2023).
- **BIO-06** scale di modifica per zona (SCALE_DOLORE, Lehman): spalle (spinte con presa stretta o manubri a presa neutra), ginocchia (leg extension isometrica 5x45 s, dolore max 3/10, discesa 3-4 s), schiena bassa (riscaldamento McGill: curl-up, plank laterale, bird dog; tenute 8-6-4 s). Si aggiungono come note al programma.
- **BIO-07** copertura per regioni: vedi PRG-23.


## 10. Dopo la seduta: questionario, decisioni, dolore


Il questionario (4 domande): fatica della seduta (Facile RPE 1-4 / Giusta 5-7 / Dura 8-9 / Al limite 10), come ci sei arrivato (riposato/normale/stanco), come hai sentito i carichi (leggeri/giusti/pesanti), dolore (si/no; dove: 7 zone; da 1 a 10; durante quali esercizi). decisioniCoach(fb, storico) e una FUNZIONE PURA (verificabile).

- **DEC-01** dolore fino a 3/10: si continua e si osserva ("se domattina e peggio, segnalalo") — Silbernagel 2007.
- **DEC-02** dolore 4-5/10: carico -10% sugli esercizi coinvolti per 2 sedute (zone gomito/ginocchio: segnale "alte ripetizioni"); la mattina dopo il coach chiede se e tornato normale (vedi controllo dolore).
- **DEC-03** dolore >=6/10, oppure tornato nella stessa zona (>=4/10) nelle ultime 2 sedute: l'esercizio si SOSTITUISCE con una variante che carica meno l'articolazione (tabella SOSTITUZIONI), se esiste; altrimenti carico -20% per 2 sedute. Con >=6/10 anche l'avviso "fatti vedere da un medico o fisioterapista".
- **DEC-04** dolore che cresce per tre sedute di fila nella stessa zona: "fatti vedere da un fisioterapista".
- **DEC-05** seduta "pesante" = RPE di sessione >=9 oppure arrivato stanco. 3 sedute su 4 pesanti (con almeno 3 feedback precedenti): propone di togliere un allenamento a settimana (Bell 2022).
- **DEC-06** almeno 2 sedute su 3 pesanti: la prossima seduta e di SCARICO (serie -40%, carico -10%).
- **DEC-07** altrimenti: carichi "pesanti" e RPE >=9 -> nessun aumento la prossima volta; carichi "leggeri" e RPE <=5 senza dolore -> un aumento extra dove hai completato tutte le serie.
- **DEC-08** nessuna regola scattata: "Seduta nella norma: il programma prosegue come previsto."
- **DEC-09** applicazione (applicaDecisioni): scrive gli "aggiusti" per esercizio (fattore, sedute, motivo), lo scarico, e per la sostituzione cambia il nome in TUTTI i giorni del piano (peso della libreria, serie non fatte, nota "Variante scelta dal coach"). Tutto annullabile (ripristina dati, aggiusti, giorni di riposo).
- **DEC-10** riduciFrequenza: se i giorni di allenamento sono piu di 2, il giorno con meno serie diventa riposo (annullabile); se sono 2 o meno: "meglio ridurre le serie che i giorni".

Tabelle di conoscenza di questa sezione: ZONE_DOLORE (spalla, gomito, polso, schiena bassa, anca, ginocchio, caviglia), STRESS_ZONA (quali esercizi caricano ogni zona), SOSTITUZIONI (variante per zona).


## 11. Controlli periodici, corpo, costanza e fine ciclo

### Livello e stalli

- **LIV-01** livello stimato dai numeri (livelloStimato; serve almeno 6 sedute): mesi regolari = settimane con >=2 sedute / 4,33; frequenza = sedute / settimane attive; difficolta = media per seduta di (+0,5 se c'e un esercizio "pesante", +0,2 se ci sono tecniche/extra, +0,3 se >=5 esercizi). Principiante <6 mesi regolari; intermedio >=6 mesi e >=2 sedute/sett.; avanzato >=24 mesi, >=3 sedute/sett., difficolta >=0,5 (NSCA, Helms). Se il livello stimato e piu alto di quello del profilo, propone "Aggiorna il livello".
- **LIV-02** tabelle STANDARD_FORZA (squat, stacco, panca, military come multipli del peso corporeo, 5 livelli, uomini/donne) e ALZATE_BASE: definite per il livello "verificato sui numeri" — da verificare dove vengono usate (non risulta nella funzione livelloStimato).
- **STA-01** esercizio fermo (eserciziFermi): servono >=3 sedute con massimale stimato (e1RM). Soglia per livello: principiante 2 sedute (finestra: ultime 3), intermedio 4 settimane, avanzato 8 settimane. E' fermo se l'ultimo e1RM <= quello piu vecchio della finestra e <= il migliore precedente.
- **STA-02** azioni sul fermo (max 3 esercizi): se recuperi bene (media degli ultimi 5 punteggi di prontezza >=60, o nessun dato) "+20% serie", altrimenti "-20% serie"; sempre "Cambia variante"; per i pesanti anche "Reset -10%" (si ricostruisce, stile 5/3/1). Serie nel piano limitate a 2-6.
- **STA-03** rotazione accessori: all'inizio di ogni blocco (settimana 1 + k*blocco), se non gia fatta in quel blocco e l'obiettivo non e forza: propone di ruotare gli isolamenti (non i fondamentali) con equivalenti.
- **STR-01** strain (Foster): carico settimanale = somma(RPE di sessione x minuti); monotonia = media giornaliera / deviazione standard; strain = carico x monotonia. Se lo strain sale per due settimane di fila e la fatica media >=8 e non c'e gia uno scarico: propone due sedute di scarico.
- **SCH-01** controllo schemi nel piano: manca uno dei 6 schemi di movimento; squilibri: spinte orizzontali senza tirate orizzontali, spinte verticali senza tirate verticali.

### Corpo e alimentazione (solo informazione, "non prescrizione")

- **COR-01** in deficit calorico: calo di peso a settimana (da due misure BIA/peso) < -1% = troppo in fretta (rischio perdere muscolo); da -0,5% a -1% = ritmo ideale; altrimenti "scende poco".
- **COR-02** ricomposizione: realistica se principiante o massa grassa alta (>32% donne, >25% uomini); altrimenti meglio fasi separate.
- **COR-03** proteine: con massa magra nota 2,35-2,75 g per kg di massa magra; altrimenti 2 g/kg di peso (1,75 per le donne). Passi: deficit 10-12 mila (+500-1000 a settimana), altrimenti 6-8 mila. Obiettivo salute: minuti di pesi della settimana (30-60 min bastano) + 150-300 min di aerobica moderata (OMS). Creatina 3-5 g (informazione facoltativa).

### Seduta saltata e aderenza

- **SAL-01** seduta saltata: un giorno pianificato di questa settimana, gia passato, non fatto, non riposo, non spostato. Scelte: seduta corta ora / 20 minuti a casa (secondo il "piano B" psicologico), sposta al prossimo giorno libero della settimana, slitta la settimana di un giorno (l'ultima seduta puo uscire), salta. Per chi ha senso di colpa o "tutto o niente": frase "Un allenamento saltato non cancella i progressi".
- **ADE-01** aderenza: se negli ultimi 14 giorni le sedute fatte sono <70% delle previste (almeno 4 previste) e non lo ha gia chiesto negli ultimi 14 giorni: "Cosa ti frena?" Tempo -> toglie l'ultimo isolamento di ogni giorno con piu di 3 esercizi; Voglia -> un giorno in meno (riduciFrequenza) e invita a scegliere esercizi graditi; Dolori -> invita a segnalarlo a fine seduta.
- **ORA-01** orario abituale: se l'ora e passata di oltre 1 ora dall'orario scelto (e prima delle 23) e la seduta di oggi non e fatta: "Di solito ti alleni alle HH:MM: oggi tocca a ...".

### Fine ciclo

- **CIC-01** verdetto (verdettoCiclo): aderenza = sedute fatte / previste nel ciclo; quota = esercizi con e1RM in salita di oltre 2% / esercizi con >=2 misure. Esito: aderenza <70% -> 'aderenza'; quota >=50% -> 'buono'; altrimenti 'stallo'.
- **CIC-02** nuovo ciclo (nuovoCiclo): buono = stesso schema; stallo = alterna blocco ipertrofia/forza e cambia gli accessori (gli isolamenti diventano "odiati temporanei"); aderenza = un giorno in meno (o -15 minuti, min 30); livello aggiornato se stimato piu alto; avanzati con priorita: dopo 3 cicli di specializzazione uno bilanciato.

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


- **ESI-01** parte al 120% (piu volume dentro il range del livello, un RIR in meno su macchine e isolamenti); limiti 90-130%; si corregge ogni settimana (aggiornaEsigenza, si calcola il lunedi per la settimana precedente).
- **ESI-02** variazioni settimanali: aderenza <70% (sedute fatte / giorni previsti): -10%; RPE medio sopra il bersaglio di almeno 1 (con >=3 serie con RPE): -5%; altrimenti prontezza media <50: -5%; altrimenti serie facili (RPE <= bersaglio-1, tutte le serie fatte, >=3 con RPE, nessun altro calo): +5%; dolore che non passa nella settimana: -10%.
- **ESI-03** esclusi (esigenza = 100%): modalita prudente (PAR-Q), over 65, "momento di vita" attivo che riduce volume o aumenta RIR.


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

- **Modalita prudente** (PAR-Q positivo) e **over 65**: niente cedimento, 3-4 ripetizioni in riserva, tecniche "cluster"/"potenza", 8-12 ripetizioni, esigenza al 100%, aumenti dei carichi dimezzati (PRG-19/34, CAR-06, BIO-02, ESI-03).
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
| `EXERCISE_LIBRARY` | 3338 | 114 esercizi: gruppo, tipo, serie/ripetizioni/peso/recupero di partenza |
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
| `ALZATE_BASE` | 10344 | 4 fondamentali (NON USATA) |
| `STANDARD_FORZA` | 10340 | standard di forza come multipli del peso corporeo (NON USATA) |
| `ZONE_DOLORE` | 9961 | 7 zone del dolore |
| `STRESS_ZONA` | 9970 | esercizi che caricano ogni zona |
| `SOSTITUZIONI` | 9981 | variante per zona di dolore |
| `SCALE_DOLORE` | 13923 | modifiche per fastidio dichiarato (spalle, ginocchia, schiena) |
| `CUE_SCHEMA` | 13826 | suggerimenti esterni per schema |
| `TECNICA` | 14832 | scheda tecnica con muscoli primari/secondari (usata solo dalla scheda esercizio) |

Tassonomie diverse per le zone del corpo: i **fastidi** del questionario sono 3 (spalle, ginocchia, schiena bassa); le **zone del dolore** a fine seduta sono 7 (spalla, gomito, polso, schiena bassa, anca, ginocchio, caviglia); `RISCHIO` usa le prime, `STRESS_ZONA` e `SOSTITUZIONI` le seconde.

## 17. Incoerenze e punti da decidere

Elenco in ordine di importanza. Sono fatti letti nel codice, non ancora corretti.

1. **Consenso del Coach IA incompleto (privacy).** Il testo che l'utente accetta dice: serie fatte, obiettivi, livello, niente nome e niente BIA. Il codice (`contestoSeduta`) invia anche fase del corpo, **stato "modalita prudente" (che deriva dal questionario di salute)**, punteggio di prontezza, durata, settimana del programma e un identificativo anonimo del dispositivo (IA-03/04). Da decidere: o si toglie dall'invio, o si aggiunge al testo del consenso.
2. **Conoscenza degli esercizi ripetuta** in 14 tabelle (capitolo 16), e due tabelle mai usate: `STANDARD_FORZA` e `ALZATE_BASE` (pensate per il livello "dai numeri", ma `livelloStimato` non le legge). La scheda tecnica con muscoli primari e secondari (`TECNICA`) e usata solo per mostrare la scheda dell'esercizio, non dalle regole.
3. **Soglie diverse per lo stesso concetto.**
   - Massa grassa alta nelle donne: 30% e 35% in `analyzeBia`, 32% in `fattoreFisico` e nella ricomposizione (BIA, MET-03, COR-02).
   - Massa magra in calo: -0,5 kg riduce il volume del 15% (`fattoreFisico`), -1 kg ferma gli aumenti (`frenoBia`).
   - Due definizioni di scarico: il "reattivo" (da questionario, prontezza o strain) usa serie x0,6 e carico x0,9; quello di programma usa una dose per fatica (volume -35%, -50% o -70%; carico x0,95 o x0,9) (CAR-03/10, DEC-06).
4. **Commenti che non corrispondono al codice.** L'intestazione del suggeritore elenca 5 regole, il codice ne applica 8 (SUG). L'intestazione di `schemaMisto` dice che col dimagrimento "i recuperi sono piu brevi", un commento nel codice dice che "le pause NON si accorciano" (PRG-04). Il commento del motore dei carichi dice "-10% dopo due mancate", ma per i principianti il codice applica -5% (CAR-07).
5. **Regole di progressione dei metodi famosi solo descritte.** Starting Strength, StrongLifts, GZCLP e altri dichiarano le loro regole di progressione; nel motore dei carichi non ho trovato diramazioni per metodo: vale sempre la progressione unica (MET-06). Da verificare con una prova.
6. **Sostituzioni "per sempre" e continuita dei progressi.** Le sostituzioni del coach (dolore, azione "cambia variante", rotazione accessori) cambiano il nome dell'esercizio in tutti i giorni e usano il carico di partenza stimato dai dati del corpo (dal 1 ottobre; prima il valore di default della libreria); lo storico e i massimali restano legati al nome vecchio, quindi per il nuovo esercizio la progressione riparte da quella stima ("prima volta"). Il nuovo "Macchinario occupato" e invece temporaneo.
7. **Regola ripetuta.** Il limite di 3 serie per principianti e over 65 e applicato in tre punti diversi (PRG-18, PRG-19, PRG-31).
8. **Numeri magici sparsi.** Soglie e fattori (0,9, 0,6, 0,96, 0,8, 1,2, 11 serie, 70%...) sono scritti dentro le funzioni, senza una tabella unica dei parametri.
9. ~~Il codice del coach era mescolato al resto~~ — risolto: ora sta in `js/coach/` (una cartella, un file per argomento).

## 18. Come usare questa mappa

1. Leggila e segna le regole da **tenere**, **cambiare** o **togliere** (ad esempio con T / C / X accanto al codice).
2. Decidi i punti del capitolo 17, a cominciare dall'1 (consenso del Coach IA).
3. Il riordino consigliato parte da qui: una scheda per esercizio al posto delle tabelle (capitolo 16), un catalogo unico di regole con i parametri in una tabella, e test sui casi noti. Questa mappa diventa l'elenco dei casi da provare.

## 19. Dove sta il codice

| Area | File |
|---|---|
| Suggerimento del prossimo esercizio (SUG) | `js/coach/suggeritore.js` |
| Costruzione del programma (PRG, MET, PRZ) | `js/coach/programma/motore.js`, `schemi.js`, `ricette.js` (contiene `buildProgram`), `alternative.js`, `archivio.js` |
| Carichi (CAR) | `js/coach/carichi/progressivo.js`, `partenza.js` |
| Questionario e decisioni (DEC, STR) | `js/coach/questionario-decisioni.js` |
| Prontezza, «mi sento male», dolore (PAR, LIV, DOL) | `js/coach/prontezza.js`, `mi-sento-male.js`, `dolore-mattina.js` |
| Repertorio e regole dalla ricerca | `js/coach/repertorio.js`, `regole-ricerca.js` |
| Consigli e agente | `js/coach/agente-consigli.js` |
| Dati del corpo (BIA) | `js/coach/bia/lettore.js`, `opzioni.js` |
| Biomeccanica, esigenza, psicologia, metodi e momenti | `js/coach/biomeccanica.js`, `esigenza.js`, `psicologia.js`, `metodi-momenti.js`, `compone.js` |
| Stato e pannello del coach | `js/coach/stato.js`, `pannello.js` |
| Coach IA (IA) | `js/coach/coach-ia.js` |
