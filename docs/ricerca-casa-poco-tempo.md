# Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti)

**Copertura: 4 ricerche web riuscite; il resto da conoscenza del modello.** Il tetto di 200 ricerche di sessione (condiviso tra gli agenti) si è esaurito dopo le prime quattro, quindi quasi tutta la nota è scritta da conoscenza del modello e da altre note del repo, e lo dichiara riga per riga. Le parti più utili al generatore non richiedono il web: il **modello dei tempi** (sez. 5), le **scale di progressione** (sez. 3), l'**audit del codice con simulazioni reali** (sez. 6) e le **regole CAS** (sez. 7).

Ambito: (A) casa, poco materiale, corpo libero, elastici, manubri, kettlebell; (B) progettazione del tempo di seduta (20-30-45-60-90 minuti). Tocca PRG-03 (`exerciseCountFor`), PRG-07, PRG-21, PRG-30, PRG-33, PRG-34, ABB-06, MET-01/02/04 (`rr`, `minimo`, `mantenimento`, `kettlebell`) e le stime di durata mostrate all'utente. Codice area delle regole proposte: **CAS** (verificato libero con grep su `docs/` e `js/`). Data: 2026-10-05. Nessuna riga di app è stata toccata; nessun commit.

**Come si legge.** Forza = **Solida / Moderata / Convenzione**, più la bandiera **Contrastata** (stessa scala di `docs/ricerca-struttura-e-intensita.md`). Marcatori sulla fonte:

- **[V]** visto nei risultati di WebSearch di questa sessione (riassunto del risultato scritto da un modello su snippet: titolo e PMID affidabili, dettagli da ricontrollare);
- **[T]** visto solo il titolo (l'esito NON è stato letto: nessun numero usato);
- **[R]** preso da un'altra nota del repo (`docs/ricerca-*.md`), **non rivisto da me**;
- **[M]** *Conoscenza del modello (non verificata sul web)*: forza al massimo Convenzione o «Moderata (da verificare)»; autori e anni dati solo se ricordati con sicurezza, cifre sotto forma di intervalli, nessun DOI o PMID inventato.

Le righe [M] **non diventano regole** da sole: le regole CAS che dipendono da loro sono marcate e vanno confermate con le query dell'appendice A.

---

## 1. Cosa dicono le fonti

### 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Carico e massa muscolare | Meta-analisi di 21 studi: la forza al 1RM cresce di più con carichi alti; la forza isometrica no; **la crescita muscolare è simile** tra carichi bassi e alti. Conclusione degli autori: la forza massima vuole carichi pesanti, l'ipertrofia si ottiene in un ampio spettro di carichi | Solida per la massa (coerente con ACSM 2026, 30-100% di 1RM [R]); Solida per il 1RM (carichi alti meglio). Popolazione: soprattutto giovani uomini | Schoenfeld, Grgic, Ogborn, Krieger 2017 (J Strength Cond Res 31(12):3508-3523, PMID 28834797) [V]; titoli collegati: rete di meta-analisi sul carico (PMC8126497) e riesame del «continuo delle ripetizioni» (PMC7927075) [T]; ACSM 2026 [R] |
| Quanto leggero si può andare | RCT, 12 settimane, giovani uomini **non allenati**, un braccio (flessione del gomito) e una gamba (leg press) allenati con 20% di 1RM, l'arto opposto con 40, 60 o 80%, a volume di carico pari: tutte le intensità aumentano forza e dimensione, ma **80% meglio di 20%** (flessori del gomito e quadricipiti): il 20% risulta **subottimale**. Da verificare nel testo: se le serie erano portate a cedimento (con carichi molto leggeri conta) | Moderata (RCT singolo, non allenati) | Lasevicius e coll. 2018 (Eur J Sport Sci, PMID 29564973) [V] |
| Cedimento coi carichi leggeri | Titolo visto: «Muscle Failure Promotes Greater Muscle Hypertrophy in Low-Load but Not in High-Load Resistance Training» (PMID 31895290): suggerisce che col carico basso la prossimità al cedimento conta di più. Esito non letto. In coerenza: cedimento contro non cedimento è un vantaggio banale in generale (15 studi, effetto 0,19, IC 95% 0,00-0,37) | Moderata (da verificare) | PMID 31895290 [T]; Refalo 2023 [R] |
| Piegamenti contro panca | 23 uomini sani moderatamente allenati (23 ± 6,8 anni), piegamenti progressivi (n = 14) contro panca (n = 9), 3 giorni a settimana per 4 settimane: entrambi i gruppi migliorano il 1RM alla panca e la progressione dei piegamenti (di più il gruppo piegamenti); **spessore muscolare senza differenze significative**. Limiti: n piccolo, 4 settimane, solo uomini | Moderata | «Effect of Progressive Calisthenic Push-up Training on Muscle Strength and Thickness», J Strength Cond Res 2018, PMID 29466268 [V] (primo autore Kotarsky, da memoria [M]) |
| Elastici contro pesi, forza | 7 articoli, 224 persone di 15-88 anni: **nessuna superiorità** né per gli arti inferiori (SMD −0,11, IC 95% −0,40; 0,19) né per i superiori (SMD 0,09, IC 95% −0,18; 0,35). Misura: forza, **non massa** | Moderata | Lopes e coll. 2019 (SAGE Open Medicine) [V]; titoli: resistenza variabile contro costante (PMC9317775), elastici negli atleti 2024 [T] |
| Elastici e ipertrofia | Non ritrovata una prova diretta. L'elastico dà resistenza **crescente** nel movimento: poca tensione nella posizione allungata, massima in accorciamento; per la crescita contano tensione e vicinanza al cedimento (Beardsley, via [R]). Sensato come complemento e per viaggio, meno come unico stimolo per le gambe | Convenzione | [M] |
| Quanto pesano i piegamenti | Ordine di grandezza: il piegamento standard carica le mani con circa **due terzi** del peso corporeo; sulle ginocchia circa metà; piedi rialzati più di due terzi; mani rialzate meno. Esistono studi cinetici (Ebben e coll. 2011?) da ricontrollare | Convenzione (da verificare) | [M] |
| Progredire senza più carico | Leve in ordine di costo: ripetizioni nella finestra, leva (inclinazione, lunghezza), unilaterale, tempo (discesa 3-4 s) e pause, escursione (deficit, allungamento), densità (meno pausa), volume, zavorra (zaino). Il passaggio «3 × 8 → variante più difficile, si riparte da 3 × 5» è la regola della Recommended Routine (Reddit r/bodyweightfitness) | Convenzione; il «perché funziona» discende dal carico alto vicino al cedimento (riga 1) | RR [R: `ricerca-metodi-coach-pratici.md` 2.18]; [M] |
| Femorali senza macchine | I femorali sono biarticolari: servono estensione dell'anca **e** flessione del ginocchio. Leg curl da seduto contro prono (RCT, 20 adulti, 12 settimane): volume dei femorali +14,1% contro +9,3% [R]. A casa: stacco rumeno a una gamba, slider curl con asciugamano, Nordic curl (alcuni studi mostrano più lunghezza dei fascicoli e massa del bicipite femorale: Bourne e coll. 2017?) | Moderata (da verificare) | [R] seduto contro prono; [M] Nordic |
| Kettlebell | Swing: studi piccoli su forza massimale ed esplosiva (Lake e Lauder 2012?); costo energetico alto in uno studio finanziato da ACE (Porcari 2010?: circa 20 kcal/min); attivazione di glutei e femorali alta e carico lombare da gestire con la tecnica (McGill e Marshall 2012?). **Nessun dato di ipertrofia visto** | Convenzione | [M] |
| Sospensione (TRX, anelli) | Revisioni sistematiche: forza simile agli esercizi tradizionali nei non allenati, qualità bassa; pro: leva regolabile con il piede, anelli per tirate e piegamenti a gradini piccoli | Convenzione | [M] |
| Mantenere in viaggio | Con un terzo (anche un nono) del volume e gli **stessi carichi** i muscoli restano: già il metodo `mantenimento` (Bickel 2011 [R]); la revisione di Spiering e coll. 2021 sulla «dose minima» per preservare forza e massa va nella stessa direzione (da verificare) | Moderata | [R] `metodi-momenti.js:57`; [M] |
| Sicurezza senza spotter | Chi stima le ripetizioni in riserva sbaglia in media di circa una ripetizione, **per difetto** (cioè: «1 in riserva» può essere il cedimento); più preciso sotto le 12 ripetizioni e vicino al cedimento | Moderata | Halperin 2022; Refalo 2023 [R: `ricerca-struttura-e-intensita.md`, registro SKILL] |

### 1.2 Progettare il tempo (area B)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Dose minima per la forza | Una serie per esercizio, 1-3 volte a settimana, 6-12 ripetizioni circa al 70-85% di 1RM con sforzo alto: aumenti significativi di 1RM in uomini già allenati. «Subottimale ma reale». Solo forza, solo uomini allenati | Moderata | Androulakis-Korakakis e coll. (Sports Med, PMID 31797219) [R]; titolo «The Minimum Effective Training Dose Required to Increase 1RM Strength in Resistance-Trained Men» [M] |
| Programmi per chi ha poco tempo | Revisione narrativa: esercizi multiarticolari bilaterali a escursione completa; almeno uno squat o leg press, una tirata e una spinta; **almeno 4 serie a settimana per muscolo** con 6-15RM; il volume conta più della frequenza; superserie per comprimere | Moderata | Iversen, Norum, Schoenfeld, Fimland 2021 («No Time to Lift?», Sports Med, PMC8449772): titolo visto [T]; contenuto [R] |
| 1, 3 o 5 serie | 34 uomini allenati, 3 sedute a settimana, 8 settimane: tempo medio per seduta circa **13, 40 e 68 minuti**; 1RM allo squat senza differenze; per l'ipertrofia prove a favore di 5 contro 1 serie. Meta-analisi di Krieger 2010: più serie circa +40% di effetto rispetto a 1, 2-3 contro 4-6 senza differenza significativa | Solida (Krieger) / Moderata (RCT) | PMC6303131 [R] (autore Radaelli 2015 da memoria [M]); Krieger 2010, PMID 20300012 [R] |
| Soglie di volume | Più serie, più crescita, con rendimenti decrescenti: ≥ 10 serie a settimana meglio di < 5; sotto circa 4 serie frazionarie a settimana la crescita è appena misurabile; oltre circa 11 serie frazionarie **per seduta** nessun vantaggio visibile | Solida (≥ 10) / Moderata (4 e 11) | Schoenfeld 2017 dose-risposta (PMID 27433992) [R]; Pelland 2025/2026 [R] |
| Frequenza a volume pari | Poco effetto sull'ipertrofia; sulla forza qualche vantaggio; 2 volte meglio di 1. Quindi **dividere il volume in sedute brevi non costa nulla** (se il volume è pari) | Solida (effetto piccolo della frequenza) | Schoenfeld, Grgic, Krieger 2019 (PMID 30558493); Pelland [R] |
| Superserie | Meta-analisi 2025 (19 studi, 313 persone): stesso volume e stessa crescita (efficienza SMD 1,74, ipertrofia SMD −0,05) con una seduta più corta, circa **un terzo di tempo in meno** a 8-12RM; costi: sforzo percepito e danno muscolare più alti. Coppie agonista-antagonista: più ripetizioni | Moderata (una meta-analisi + revisione narrativa) | Sports Med 2025, PMID 39903375 [R]; Paz e coll. 2017 sulle serie in coppia antagonista [M]. «Weakley 2021» sulle superserie **non riconosciuto con certezza** (il Weakley visto come titolo è del 2023 sui carichi bassi, [T]) |
| Durata di una ripetizione | Durate da circa 0,5 a 8 s per ripetizione danno ipertrofia simile; molto lente (oltre circa 10 s) peggio. Quindi 2-4 s a ripetizione sono la norma e **non vanno forzate** | Moderata (da verificare) | Schoenfeld, Ogborn, Krieger 2015 (Sports Med) [M] |
| Pause tra le serie | Oltre 60-90 s differenza piccola sulla massa (Singer 2024, bayesiana: pause brevi SMD 0,48, lunghe 0,56, sovrapposte); ACSM 2026: 2-3 minuti [S]; un RCT su 21 uomini allenati (1 contro 3 minuti) a favore dei 3 minuti per forza e quadricipiti | Moderata + **Contrastata** | Singer 2024 [R]; ACSM 2026 [R]; Schoenfeld e coll. 2016 [M] |
| Densità (EDT) | Il metodo «Escalating Density Training» (blocchi a tempo, ripetizioni totali) è molto usato dai coach, **nessuno studio visto o ricordato**; ha senso come modo di fissare la seduta sul tempo invece che sulle serie | Convenzione | [M] |
| «Exercise snacks» e micro-allenamenti | Gli snack (1 minuto, 3 volte al giorno) sono studiati soprattutto per la capacità aerobica; per la forza dati scarsi. Titolo visto: protocollo di un RCT «Minute Calisthenics» (corpo libero giornaliero, basato sull'abitudine, BMC Public Health 2020) [T]: esito non visto. **Non ho trovato prova per «3 × 5 minuti»** | Convenzione | [T]; [M] |
| Riscaldamento | Modello RAMP (Jeffreys 2007): 8-12 minuti per sedute lunghe; per i pesi serie di avvicinamento crescenti. Non fa crescere di più: serve a prestazione e prontezza. Il dato «−20% infortuni» non è ritrovato: **non usare** | Convenzione | Jeffreys 2007; Cressey [R] |
| Poche serie, quanto sforzo | Con poche serie ogni serie deve contare: ma il cedimento non è necessario (Refalo 2023: effetto 0,19; ACSM 2026: basta 2-3 ripetizioni dal cedimento [S]). Il programma «Minimalist» di Nippard (35-45 minuti, 1-2 serie dure) è **riportato da Nippard (video), da verificare** | Moderata | Refalo 2023 [R]; [R] per Nippard |
| Cardio dopo i pesi | Interferenza e dosi già trattate: non rifatto qui | n.d. | `docs/ricerca-cardio-nutrizione.md` [R] |

---

## 2. Dove le fonti non concordano

| Tema | Posizione A | Posizione B | Cosa adotta il coach e perché |
|---|---|---|---|
| Carico leggero a corpo libero | L'ipertrofia è uguale a carichi bassi e alti se si arriva vicino al cedimento (Schoenfeld 2017 [V]) | A 20% di 1RM la crescita è subottimale e la forza massima vuole carichi alti (Lasevicius 2018, Schoenfeld 2017 [V]) | Finestra di lavoro **6-20 ripetizioni** (fino a 25 per elastici e isolamenti), mai oltre ~25-30 ripetizioni sulla stessa leva: passa alla leva successiva. Per l'obiettivo **forza** a casa dire onestamente che il corpo libero costruisce forza relativa, non il massimale al bilanciere. **Contrastata** |
| Cedimento col carico leggero | Il cedimento conta di più con il carico basso (titolo PMID 31895290 [T]) | Il cedimento non dà vantaggi nel complesso (Refalo 2023, ACSM 2026 [R]) | Corpo libero, elastici e manubri leggeri: **RIR 0-2** sugli esercizi sicuri (piegamenti, rematori, elastici); **RIR ≥ 2** dove il cedimento è rischioso senza spotter (sez. 4.4). **Contrastata** |
| Pause | 2-3 minuti (ACSM 2026 [S], un RCT del 2016 [M]) | Oltre 60-90 s piccola differenza (Singer 2024 [R]) | Casa e poco tempo: **75 s corpo libero, 90 s manubri, 60 s isolamenti, 45 s elastici e tenute**; 120 s o più solo per unilaterali pesanti o obiettivo forza con carico alto. Accorciare **prima** di tagliare serie. **Contrastata** |
| Una serie o più | 1 serie a esercizio dà aumenti reali di forza (Androulakis-Korakakis [R]) | Più serie danno più ipertrofia (Krieger 2010, Radaelli 2015 [R]) | **Minimo 2 serie** per schema; 1 serie solo nella modalità di emergenza da 15-20 minuti. Moderata |
| Superserie | Stesso volume in un terzo di tempo (meta-analisi 2025 [R]) | Più sforzo percepito e danno muscolare (stessa fonte) | Si usano quando i minuti sono pochi (≤ 45) e per l'accessorio; **mai** sul lavoro pesante né dove la qualità della serie conta (forza). Moderata |
| Poche sedute lunghe o molte brevi | A volume pari la frequenza conta poco (Pelland [R]): 4 × 20 minuti = 2 × 45 | Ogni seduta ha un costo fisso di 4-7 minuti (riscaldamento, cambi) e l'aderenza cala con troppe sedute | **3-4 giorni da 30-45 minuti**; 5-6 giorni sotto i 30 minuti sconsigliati. Convenzione |
| Tirata verticale senza sbarra | Servono trazioni (molti coach, [M]) | Rematori + pullover + elastico bastano per la schiena (altri coach, [M]) | **Nessuna fonte vista.** Il coach, senza sbarra, mette rematori inversi o con manubrio a più serie + lat pulldown con elastico + pullover, e dice che è un ripiego. Convenzione |
| Elastici | Forza uguale ai pesi (Lopes 2019 [V]) | Poca tensione nella posizione allungata, resistenza variabile, nessun dato di massa ([M]) | Elastici come **complemento** (alzate laterali, face pull, lat pulldown, viaggio), non come unico stimolo per gambe e petto. Convenzione |
| Kettlebell | Un solo attrezzo, 100 swing e 10 get-up «quasi ogni giorno» (Pavel, Simple & Sinister: nel repo `metodi-momenti.js:81`, non applicabile) | Poco volume e leggero per tanti giorni (Dan John, Easy Strength [R]); nessuna prova di ipertrofia | Non adottare i protocolli quotidiani; lo swing resta un **hinge opzionale** quando c'è un kettlebell. Convenzione |
| Scale a corpo libero | 3 × 5-8 e passaggio a 3 × 8 (RR, forza e abilità) | Si sale di ripetizioni fino a 15-20 prima di cambiare leva (logica dell'ipertrofia vicino al cedimento) | Due finestre per obiettivo: **forza/abilità 5-8, massa e salute 8-15** (sez. 3.0). Convenzione |
| «Sotto la mezz'ora lo stimolo è scarso» | Testo dell'onboarding (`onboarding.js` passo minuti) | Dose minima: 4 serie per muscolo a settimana bastano per crescere (Iversen [T/R]); 1 serie per la forza (Androulakis-Korakakis [R]) | Il testo **non è supportato**: va riscritto (CAS-10). Moderata |

---

## 3. Scale di progressione a corpo libero e con elastici

### 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V])

1. **Finestra di lavoro** per livello: livelli 1-3 **8 → 15** ripetizioni; livelli 4-6 **5 → 10**; tenute **20 → 45-60 s**. Obiettivo massa e salute: tetto 12-15; obiettivo forza o abilità: tetto 8 (regola RR).
2. **Per salire**: 3 serie al tetto, con 1-3 ripetizioni in riserva e tecnica pulita, **in due sedute di fila**; nel nuovo livello si riparte dal minimo della finestra.
3. **Per scendere**: due sedute senza arrivare al minimo (oppure < 5 ripetizioni nella prima serie) → livello precedente (mai «colpa»: è la leva giusta).
4. **Troppo facile**: se una serie a RIR 2 supera **20-25 ripetizioni**, la leva è troppo leggera (area di carico in cui il 20% di 1RM è risultato subottimale, Lasevicius 2018 [V]) → livello successivo anche prima del tetto.
5. **Ordine delle leve** quando non si può aggiungere peso: (1) ripetizioni, (2) leva/inclinazione, (3) unilaterale, (4) tempo e pause (discesa 3 s, pausa 1-2 s), (5) escursione (deficit, posizione allungata), (6) meno pausa (da 90 a 60 s a pari ripetizioni), (7) più serie, (8) zavorra (zaino con libri: 3-5 kg a passo).
6. Attrezzo: **C** niente, **P** parete, **T** tavolo/sedia robusta, **B** panca, **S** sbarra (porta o muro), **E** elastico, **M** manubri, **K** kettlebell, **A** anelli/cinghie, **Z** zaino.

Fonti: la struttura è Convenzione ([M] e RR [R]); il tetto di ripetizioni discende da Schoenfeld 2017 e Lasevicius 2018 [V]. Le scale **non sono studi**: sono un ordine di difficoltà ragionato.

### 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore)

| Liv. | Esercizio | Come si rende più difficile | Per salire | Attrezzo |
|---|---|---|---|---|
| 1 | Piegamenti al muro o su piano alto (cucina) | Mani più in basso, piedi più indietro; discesa 3 s | 3 × 15 | P/T |
| 2 | Piegamenti inclinati su tavolo o panca (60 → 40 → 30 cm) | Abbassa l'appoggio a ogni salita | 3 × 15 a 40 cm | T/B |
| 3 | Piegamenti a terra | Pausa 1-2 s sul petto; tempo 3-1-1 | 3 × 12-15 | C |
| 4 | Piegamenti declinati (piedi su sedia, 30 → 60 cm) o con zaino | Piedi più alti, zaino +3-5 kg | 3 × 10-12 | T/B/Z |
| 5 | Piegamenti a mani sfalsate o ad arciere; con deficit (mani su due libri) | Braccio d'appoggio più lungo, più escursione | 3 × 6-8 per lato | C/T |
| 6 | Piegamenti pseudo-planche (spalle avanti delle mani), anelli, negativi a una mano | Più inclinazione in avanti, instabilità | 3 × 5-8 | C/A |
| Ramo M | Panca piana o inclinata con manubri, floor press, croci su panca (allungamento) | Manubrio più pesante o tempo | 3 × 8-12 | M/B |
| Ramo E | Chest press con elastico ancorato dietro, croci con elastico | Elastico più duro, ancoraggio più lungo | 3 × 15-20 | E |

### 3.2 Spinta verticale (spalle, tricipiti)

| Liv. | Esercizio | Come si rende più difficile | Per salire | Attrezzo |
|---|---|---|---|---|
| 1 | Press sopra la testa con elastico (in piedi sull'elastico) o alzate laterali con elastico | Elastico più duro | 3 × 15-20 | E |
| 2 | Pike push-up a terra (fianchi alti) | Mani più vicine ai piedi | 3 × 12 | C |
| 3 | Pike push-up con piedi rialzati (30-50 cm) | Piedi più alti | 3 × 10-12 | T/B |
| 4 | Pike con piedi molto alti (spalle sopra le mani) o press con manubri | Più verticale, tempo | 3 × 8-10 | T/M |
| 5 | Verticale al muro, solo negativi o con testa su cuscino (escursione crescente) | Meno cuscino | 3 × 5 | P |
| 6 | Piegamenti in verticale al muro completi, con deficit (parallette) | Deficit | 3 × 5-6 | P/A |

Alzate laterali (deltoide laterale, che i multiarticolari colpiscono poco): manubri o elastico, **12-20 ripetizioni**; non hanno una scala di leva: si sale per ripetizioni, tempo e carico.

### 3.3 Squat (quadricipiti, glutei)

| Liv. | Esercizio | Come si rende più difficile | Per salire | Attrezzo |
|---|---|---|---|---|
| 1 | Squat a corpo libero con pausa e discesa 3 s; da seduti-in-piedi (sedia alta per over 65) | Più profondo, sedia più bassa | 3 × 15 | C/T |
| 2 | Goblet squat (manubrio o kettlebell) o squat con zaino | Carico, pausa in basso 2 s | 3 × 12-15 | M/K/Z |
| 3 | Affondo statico (split squat) | Carico, tempo | 3 × 12 per lato | C/M |
| 4 | Squat bulgaro con manubri (piede dietro su panca) | Carico, deficit sul piede avanti | 3 × 10 per lato | M/B |
| 5 | Skater squat o shrimp assistito (mano su un sostegno); bulgaro con pausa | Meno assistenza | 3 × 8 per lato | C/M |
| 6 | Pistol squat (su scatola → completo) o shrimp completo | Meno scatola, zavorra | 3 × 5-6 per lato | C |

Passo bilaterale → unilaterale quando le ripetizioni bilaterali superano 20 (sezione 3.0, punto 4). Con ginocchia delicate: i filtri `RISCHIO.ginocchia` (`motore.js:41`) tolgono squat, affondi, bulgari e pistol: vedi `ricerca-recupero-infortuni-popolazioni.md` per la modifica invece dell'esclusione.

### 3.4 Catena posteriore: anca (glutei, femorali, schiena) e flessione del ginocchio (femorali)

| Liv. | Anca | Per salire | Flessione del ginocchio | Per salire | Attrezzo |
|---|---|---|---|---|---|
| 1 | Ponte glutei a terra | 3 × 15-20 | Leg curl sdraiati con asciugamano o slider (due gambe) | 3 × 10-12 | C |
| 2 | Hip thrust a corpo libero (spalle su panca/divano) | 3 × 12-15 | Slider curl in posizione di ponte | 3 × 10 | B/C |
| 3 | Stacco rumeno con manubri o kettlebell (due mani) | 3 × 10-12 | Slider curl a una gamba (l'altra assiste) | 3 × 8 per lato | M/K |
| 4 | Hip thrust a una gamba con manubrio | 3 × 8-10 per lato | Nordic curl eccentrico assistito (elastico o mani) | 3 × 5-6 | M/B/E |
| 5 | Stacco rumeno a una gamba (manubrio o kettlebell) | 3 × 8-10 per lato | Nordic curl con braccia che frenano | 3 × 5-6 | M/K/C |
| 6 | Stacco a una gamba con tempo 3 s e carico alto; kettlebell swing come ramo balistico | 3 × 6-8 per lato | Nordic curl con discesa lenta (4-5 s) e poca spinta | 3 × 5-6 | M/K/C |

Nota: nella libreria attuale c'è **solo** il Nordic Curl (6 ripetizioni di base) e il ponte glutei: nessun hinge con manubri (sez. 6, H-09). Un Nordic da **12 ripetizioni** (visto in simulazione) è irrealistico per quasi tutti.

### 3.5 Tirata orizzontale (dorsali, romboidi, bicipiti, deltoide posteriore)

| Liv. | Esercizio | Come si rende più difficile | Per salire | Attrezzo |
|---|---|---|---|---|
| 1 | Rematore con elastico (seduti, piedi sull'elastico) | Elastico più duro | 3 × 15 | E |
| 2 | Rematore inverso inclinato alto (sotto un tavolo robusto o su una sbarra bassa, corpo a circa 60-70 gradi) | Corpo più orizzontale | 3 × 12 | T/S/A |
| 3 | Rematore inverso con corpo orizzontale e ginocchia piegate | Gambe tese | 3 × 10-12 | T/S/A |
| 4 | Rematore inverso a gambe tese, piedi rialzati | Pausa 1-2 s al petto | 3 × 8-10 | T/S/A |
| 5 | Rematore inverso a presa neutra (anelli) o ad arciere | Più asimmetria | 3 × 6-8 | A |
| 6 | Rematore inverso a un braccio, o front-lever tuck row | Meno aiuto dell'altro braccio | 3 × 5 per lato | A/S |
| Ramo M | Rematore a un braccio, rematore a petto appoggiato (panca inclinata) | Manubrio più pesante, pausa | 3 × 8-12 per lato | M/B |

Sicurezza: il rematore all'asciugamano su una porta chiusa non è un esercizio sicuro se la porta può aprirsi: usare un tavolo massiccio fissato o una sbarra bassa. Deltoide posteriore: **alzate posteriori** con manubri o elastico (face pull con elastico), 12-20 ripetizioni.

### 3.6 Tirata verticale (dorsali, bicipiti)

| Liv. | Esercizio | Come si rende più difficile | Per salire | Attrezzo |
|---|---|---|---|---|
| 1 | Lat pulldown con elastico ancorato in alto, o pullover con manubrio (allungamento) | Elastico più duro | 3 × 12-15 | E/M/B |
| 2 | Trazioni **negative** (salita con salto, discesa 4-5 s) | Discesa più lenta | 3 × 3-5 | S |
| 3 | Trazioni assistite con elastico (elastico sempre più sottile) o con i piedi su una sedia | Meno assistenza | 3 × 6-8 | S/E |
| 4 | Trazioni complete (prone o supine) | Pausa in alto 1-2 s, tempo 3 s | 3 × 5-8 → 3 × 8-10 | S |
| 5 | Trazioni con zaino, o con pausa e tempo | Più zavorra | 3 × 6-8 | S/Z |
| 6 | Trazioni ad arciere, L-sit pull-up, assistita a un braccio | Più asimmetria | 3 × 3-5 per lato | S |

**Senza sbarra** i livelli 2-6 non esistono: ripiego = rematori (sez. 3.5) a più serie + lat pulldown con elastico + pullover (CAS-14). Bicipiti: i chin-up e i rematori danno 0,5 serie ciascuno; curl con manubri, elastico o zaino per il diretto.

### 3.7 Tricipiti (dip e estensioni), polpacci, core

| Livello | Tricipiti | Polpacci | Core |
|---|---|---|---|
| 1 | Piegamenti a diamante inclinati; estensione con elastico (pushdown ancorato in alto) | Calf raise a due piedi su un gradino, 15-20 | Dead bug, bird dog (3 × 8-10 per lato) |
| 2 | Dip su panca con ginocchia piegate (spalla: cautela, `RISCHIO.spalle` li esclude) | Calf raise a un piede (mano al muro), 12-15 | Plank 30-45 s |
| 3 | Dip su panca a gambe tese o piedi rialzati; estensione sopra la testa con manubrio (allungamento) | A un piede con pausa 2 s in basso (escursione completa) | Plank con arti alternati, plank laterale |
| 4 | Dip alle parallele (negativi poi completi) | A un piede con manubrio o zaino | Hollow hold, leg raise a terra |
| 5 | Dip con zaino, tempo 3 s; piegamenti a diamante a piedi alzati | A un piede con carico + tempo 3-1-3 | Ab wheel dalle ginocchia, leg raise alla sbarra a ginocchia piegate |
| 6 | Dip agli anelli con zavorra | Seduti con zaino sulle ginocchia (soleo) in aggiunta | Leg raise alla sbarra a gambe tese, L-sit |
| Per salire | 3 × 10-12 (livelli 1-3), 3 × 5-8 (4-6) | 3 × 15-20 → carico | Tenute: **20 → 60 s poi cambia leva** (un plank oltre ~60 s non è più difficile: si cambia leva, non si aggiungono secondi) |

### 3.8 Come progredire gli elastici (non hanno chilogrammi)

- **Classe attrezzo propria**: il carico è un **livello** (1-6, dal colore) e non «kg»; la libreria non ha oggi elastici (nessun esercizio) e `arrotonda()` (`progressivo.js:16`) lavora a 0,5 kg.
- **Taratura**: la forza di un elastico dipende da spessore, larghezza e **allungamento** e le scale di colore cambiano da marca a marca [M]. Per questo si calibra sulle ripetizioni: si sceglie l'elastico con cui l'utente fa **15-25 ripetizioni a 2-3 in riserva** (RIR 2-3 secondo la stima dell'utente, che sbaglia di circa 1 [R]).
- **Leve**: (1) ripetizioni fino a 25; (2) più allungamento (ancoraggio più lontano o presa più corta); (3) elastico doppio; (4) livello successivo; (5) tempo (3 s al ritorno), pausa 1-2 s nel punto di massima tensione; (6) unilaterale.
- **Sicurezza** [M]: controllare ogni volta abrasioni e tagli, non tendere oltre il 200-300% della lunghezza, ancoraggi stabili, occhi lontani dalla linea dell'elastico.
- Un elastico dà **poca tensione in allungamento**: per petto e bicipiti combinare con piegamenti a deficit o manubri; per le alzate laterali e le tirate funziona bene.

---

## 4. Kit minimi e cosa si può allenare

### 4.1 Kit a gradini ([M], Convenzione)

| Kit | Contenuto | Sblocca | Resta difficile |
|---|---|---|---|
| **K0** | Niente: pavimento, muro, tavolo/sedia robusti, un gradino, uno zaino con libri | Piegamenti, squat unilaterali, ponte e slider (asciugamano), rematore inverso sotto un tavolo, polpacci su un gradino, core | Tirata verticale, femorali pesanti, spalle laterali, bicipiti |
| **K1** | + sbarra per trazioni (porta o muro) + set di elastici (tubi con maniglie, un anello) | Trazioni e chin-up (anche con elastico assistito), dip su sedie o parallele, face pull e alzate con elastico, lat pulldown | Polpacci e gambe pesanti, petto allungato |
| **K2** | + manubri regolabili (circa 2-24 kg a mano) o 2-3 coppie fisse | Goblet squat, stacco rumeno, rematore a un braccio, press sopra la testa, alzate laterali, curl, tricipiti | Gambe pesanti (i manubri finiscono presto), petto senza panca |
| **K3** | + panca regolabile (piana/inclinata) | Panca con manubri, croci, rematore a petto appoggiato, hip thrust, bulgaro, step-up | Tirata verticale pesante |
| **K4** | + kettlebell (uno solo da 12-24 kg) e/o anelli o cinghie | Swing (hinge balistico), get-up, goblet; rematori e piegamenti con leva regolabile; dip agli anelli | Isolamenti specifici |
| **K5** | Bilanciere + rack + piatti (garage) | Tutto il repertorio da palestra libera | Macchine e cavi (si sostituiscono con elastici) |

**Minimo consigliato** per allenare tutti i sei schemi e gli isolamenti principali: **K3 + K1** (manubri regolabili, panca regolabile, sbarra, elastici). Costo e marche: non valutati qui.

### 4.2 Cosa si allena bene e cosa no, per muscolo ([M])

| Muscolo | K0 (nessun attrezzo) | K1-K3 | Cosa è difficile e il miglior ripiego |
|---|---|---|---|
| Petto | Buono (piegamenti con scala) | Ottimo (panca con manubri, croci) | Posizione allungata: deficit con libri o croci con manubri |
| Dorsali | Discreto (rematore inverso) | Ottimo con sbarra | **Tirata verticale senza sbarra**: elastico + pullover + rematori a più serie |
| Spalle laterali e posteriori | Scarso | Buono (alzate con manubri o elastico) | Spalla laterale: alte ripetizioni (12-20); posteriori: alzate posteriori, face pull con elastico |
| Bicipiti | Scarso (chin-up, rematori) | Buono (curl) | Con sbarra: chin-up; senza: curl con zaino o elastico |
| Tricipiti | Discreto (diamante, dip su panca) | Buono | Spalla delicata: estensioni con manubrio o elastico |
| Quadricipiti | Discreto (unilaterali con scala) | Buono (bulgaro con manubri) | Le gambe superano presto i manubri: passare a unilaterali e tempo |
| Femorali | **Scarso** | Discreto (stacco rumeno a una gamba) | Slider curl, Nordic con scala; stacco rumeno a una gamba con manubrio |
| Glutei | Buono (ponte, hip thrust a una gamba) | Ottimo | Hip thrust a una gamba con zaino o manubrio |
| Polpacci | Discreto (un piede su un gradino, 15-30 ripetizioni) | Buono (con manubrio) | Escursione completa e pausa in basso |
| Addome e core | Ottimo (scala sez. 3.7) | Ottimo | Nessuno |

### 4.3 Manubri regolabili: cosa chiedere all'utente

Chiedere il **manubrio più pesante** (kg a mano) e se sono regolabili (PCO-06 di un'altra nota, qui CAS-01). Regola pratica [M]: se il goblet squat o lo stacco rumeno a due mani con il manubrio più pesante supera **15-20 ripetizioni** a 2 in riserva, il carico bilaterale non basta: passare a unilaterale (sez. 3.3, 3.4). Per la parte alta il manubrio pesante dura quasi sempre più a lungo.

### 4.4 Sicurezza senza spotter ([M], Convenzione, coerente con l'errore di stima del RIR [R])

| Tipo di esercizio | Cedimento | Come |
|---|---|---|
| Piegamenti, rematori inversi, elastici, ponti, plank | Pieno (RIR 0-1 accettabile) | Fermarsi quando la tecnica cede |
| Affondi, bulgari, step-up, goblet squat leggero | RIR 1-2 | Un sostegno (muro, sedia) a portata di mano; niente cedimento su pistol e shrimp |
| Press sopra la testa e panca con manubri **pesanti** | RIR **≥ 2** | Con la panca: ultime ripetizioni controllate, sapere come lasciare cadere i manubri di lato; mai da soli oltre il carico controllabile |
| Squat e panca con **bilanciere** | RIR ≥ 2 e **sempre** rack con supporti (safety pin) all'altezza giusta | Senza rack: non andare vicino al cedimento |
| Trazioni e dip con zavorra | RIR ≥ 1-2 | Sbarra o parallele fissate; mai su una porta con telaio debole |

Altre note ([M]): pavimento antiscivolo per slider, sbarra da porta con limite di portata, chiusura dei collari dei manubri regolabili, spazio libero intorno, vicini e rumore. In caso di dolore acuto o che peggiora, formicolii o perdita di forza improvvisa: fermarsi e sentire il medico (come nelle altre note del repo).

### 4.5 Kettlebell (programmi noti, nessuno verificato)

| Metodo | Cosa risulta | Forza | Verdetto 3in |
|---|---|---|---|
| Simple & Sinister (Pavel Tsatsouline) | Nel repo: 100 swing e 10 get-up quasi ogni giorno, `applicabile: false`, «serve un kettlebell, non ancora nella libreria» (`metodi-momenti.js:81`). Il pacchetto standard di kg (donne circa 16, uomini circa 32 per il livello «Simple») è da memoria [M] | Convenzione | Non adottare come piano; usare lo swing come hinge opzionale con K4 |
| Dan John, Easy Strength e simili | Pochi movimenti, **al massimo ~10 ripetizioni totali per movimento al giorno**, leggeri per settimane; già in `ricerca-metodi-coach-pratici.md` 2.17 [R] | Convenzione | Idea utile: sedute brevi e leggere sono sostenibili a lungo (mantenimento) |
| Gray Cook | **Nessuna linea guida verificata**: lo associo a «movimento prima del carico» e agli screening funzionali, ma non attribuisco regole specifiche | n.d. | Domanda aperta |

### 4.6 Viaggio e hotel

Seduta di **20-25 minuti** con K0 + un elastico + zaino (sez. 5.5, colonna 20-30): quattro schemi × 2-3 serie in coppie, RIR 1-3, intensità invariata ma volume a un terzo. Lo scopo è **mantenere** (Bickel 2011 [R], Spiering 2021 [M]): una settimana o due a un terzo del volume non fa perdere muscolo. Un'azione «Oggi sono in viaggio» che converte la seduta del giorno nella versione corpo libero (CAS-16) è la regola corrispondente.

---

## 5. Come riempire il tempo

### 5.1 Modello dei tempi (formule che il generatore può calcolare)

Convenzione: costanti **ragionate** (e verificate contro la stima che l'app usa oggi, vedi 5.2), da **tarare sul tempo reale** (`minuti: minutiSeduta()` è già salvato a fine seduta, `termina-e-cardio.js:103`).

**Tempo di una serie** (secondi): `S = c + n × t_rip` con `c = 5` (preparazione), `t_rip = 3 s` (manubri, macchine, isolamenti), `3,5 s` (multiarticolari), `4 s` (corpo libero con discesa controllata), `5 s` (Nordic, pausa a fine corsa). **Unilaterali**: `S = 2 × (c + n × t_rip) + 10` (le due parti più il cambio). **Tenute**: `S = durata + 5-10`. Durata di una ripetizione 2-4 s: [M] Schoenfeld 2015.

**Classi e costanti di riferimento** (secondi; ripetizioni tipiche):

| Classe | Esempi | Ripetizioni | S | Pausa R | Cambio X |
|---|---|---|---|---|---|
| `multi` bilaterale | piegamenti, squat, goblet, rematore, trazione | 10 | 40 | 90 | 30 |
| `uni` (per lato) | bulgaro, rematore a un braccio, ponte a una gamba | 10 per lato | 90 | 90 | 40 |
| `iso` isolamento | alzate laterali, curl, tricipiti, polpacci | 12-15 | 45 | 60 | 20 |
| `curl` femorali | slider curl, Nordic | 8-10 (4-5 s) | 45 | 60 | 20 |
| `hold` tenuta | plank, hollow, dead bug a tempo | 30-45 s | 40 | 45 | 15 |
| `elastico` | pulldown, face pull, croci | 15-20 | 55 | 45-60 | 25 |
| `pesante` (palestra) | squat, panca con bilanciere | 5 | 30 | 150-180 | 45-60 |

**Seduta**:

- Serie dritte: `T_esercizio = n × (S + R) + X`.
- **Coppia** (due esercizi A e B alternati, `n` giri): `T_coppia = n × (S_A + S_B + 15 + max(R_A, R_B)) + X_A + X_B`; il 15 è il passaggio tra i due. Per `multi + multi` il risparmio è circa **27%** e per `iso + iso` circa **20%**: coerente con «circa un terzo» della meta-analisi 2025 [R] (che misura 8-12RM a cedimento).
- **Seduta**: `T = W(M) + Σ T_unità − R_ultima`, con `W` = riscaldamento (min): **20 → 2, 30 → 3, 45 → 5, 60 → 6, 90 → 8** (1 serie leggera per schema + 30-60 s di mobilità; sopra i 60 minuti 2-3 serie di rampa sul primo carico pesante). Il riscaldamento non fa crescere di più: serve a prestazione e prontezza [R].
- **Fattore utente**: `f = mediana(minuti reali / minuti stimati)` sulle ultime 3 sedute, limitato a 0,8-1,4; `T_mostrato = T × f`.

### 5.2 Costo di un esercizio da 3 serie e confronto con il modello di oggi

| Classe | Minuti (3 serie, dritte) | In coppia | Modello attuale `n(35 + R)/60` per 3 serie (senza gli 8 min fissi) | Mio modello rispetto all'attuale |
|---|---|---|---|---|
| `multi` 10 ripetizioni, R 90 | 7,0 | 5,1 | 6,25 | +12% |
| `uni` 10 per lato, R 90 | 9,7 | 7,8 | 6,25 | **+55%** |
| `iso` 13 ripetizioni, R 60 | 5,6 | 4,5 | 4,75 | +18% |
| `hold` 40 s, R 45 | 4,5 | - | 4,0 | +12% |
| `elastico` 17 ripetizioni, R 50 | 5,7 | - | 4,25 | +34% |
| `pesante` 5 ripetizioni, R 150 | 9,8 | - | 9,25 | +6% |

(Il modello attuale conta 35 s per ogni serie, **qualunque** classe, più 8 minuti fissi per seduta.) Il risultato: la stima di oggi è circa 10% sotto il mio modello per i bilaterali, le tenute e gli isolamenti (10-15%), del **25-35% sotto per elastici e unilaterali** (e per i polpacci a un piede e le serie lunghe); le coppie sono **non contate** (sez. 6, H-02).

### 5.3 Capacità: quante serie entrano

`N_serie ≈ (M − W − n_esercizi × X) / c̄`, con `c̄` = costo medio di una serie (minuti): `multi` 2,17 dritta, 1,55 in coppia; `iso` 1,75 dritta, 1,4 in coppia; `uni` 3,0.

| Minuti | W | Serie dritte (`multi`/`iso`) | Serie con coppie | Esercizi a 3 serie (dritte) | Esercizi a 2-3 serie (coppie) |
|---|---|---|---|---|---|
| 20 | 2 | circa 8 | circa 11 | 3 | 4-5 |
| 30 | 3 | circa 12 | circa 16 | 4 | 6 |
| 45 | 5 | circa 17 | circa 24 | 6 | 8-9 |
| 60 | 6 | circa 23 | circa 33 | 8 | 10-11 |
| 90 | 8 | circa 35 | circa 50 | 11 | 12+ (il tetto è il volume, non il tempo) |

Confronto con `exerciseCountFor` oggi (tabella reale calcolata dalla formula, `onboarding.js:110`): **forza: sempre 3 esercizi** (a 30, 45, 60, 75 e 90 minuti); massa 3 / 3 / 4 / 5 / 6; ricomposizione e glutei 3 / 4 / 6 / 7 / 7; salute e dimagrimento 3 / 5 / 7 / 7 / 7 (minuti 30 / 45 / 60 / 75 / 90).

### 5.4 Scala di priorità: cosa tenere quando i minuti sono pochi (e cosa aggiungere quando crescono)

Convenzione, con la base [R] di Iversen 2021 (schemi e almeno 4 serie per muscolo) e dei rendimenti decrescenti per serie (Krieger 2010, Pelland [R]). Dal più prezioso al meno:

| Rango | Cosa | Costo con coppie | Perché |
|---|---|---|---|
| P1 | **Un esercizio per ciascuno dei 4 schemi base** (gambe-ginocchio, hinge/catena posteriore, spinta orizzontale, tirata) × **2 serie** | circa 11-13 min | Copre i muscoli grandi con il minimo di serie: 4 serie a settimana per muscolo a 2 giorni |
| P2 | **Terza serie** sui 4 schemi | circa 5 min | I rendimenti decrescono ma 2 → 3 pesa più di 3 → 4 |
| P3 | **Secondo schema di spinta e di tirata** (verticale se hai fatto orizzontale e viceversa) | circa 6-8 min | Completa i 6 schemi (PRG-21), spalle e dorsali |
| P4 | **Isolamenti dei muscoli poco colpiti dai multiarticolari**: alzate laterali, polpacci, flessione del ginocchio (femorali) | circa 4-5 min | Spalla laterale, polpacci e femorali restano a 2-4 serie nelle simulazioni dell'app |
| P5 | **Braccia dirette** (bicipiti + tricipiti in coppia, 2 serie ciascuno) | circa 4 min | Le braccia ricevono 0,5 serie da spinte e tirate: da 3 giorni in su le indirette bastano fino a 4-6 serie |
| P6 | **Core diretto** (tenute 2 serie) | circa 3 min | Il core lavora in tutti i multiarticolari; diretto solo se avanza tempo |
| P7 | 4ª serie in poi, **tecniche d'intensità** (drop, rest-pause) | variabile | Nessun vantaggio di crescita: solo risparmio di tempo (due meta-analisi [R]) |
| P8 | Cardio finale | - | Solo se avanzano minuti, mai prima dei pesi (altra nota) |

**Ordine di intervento quando i minuti NON bastano**, dal meno costoso al più costoso:
1. **Accorciare le pause** fino ai minimi di classe (`multi` 75 s, `iso` 45-60 s): costo quasi nullo sull'ipertrofia (Singer 2024 [R]); sulla forza con carichi alti **no**.
2. **Abbinare in coppie** (antagonisti: ABB-06; coppie non in competizione: Convenzione) e tenere insieme gli isolamenti.
3. Togliere **P7, P6, P5** (in quest'ordine).
4. Portare le serie da 3 a 2 sui non prioritari (mai sotto 2 con meno di 20 minuti).
5. Togliere P4 uno alla volta, **mai** prima di aver toccato i passi 1-4.
6. **Mai** sotto P1 × 2 serie: se non entra, **messaggio onesto** («con questi minuti è un programma di mantenimento») e proposta di più giorni (sez. 5.6).

**Ordine di riempimento quando i minuti AVANZANO**: P1 → P2 → P3 → P4 → P5 → P6, **fermandosi al bersaglio** di volume per muscolo (10-16 serie intermedio, 12-20 avanzato, [R] ricerca-ipertrofia-programmazione; tetto 11 per seduta, PRG-30). **Il tempo è un tetto, non un obiettivo**: se le serie bastano, la seduta finisce prima.

### 5.5 Modelli per minuti e giorni (calcolati con il modello di 5.1)

**Calcolati, non osservati su persone.** Insieme di esercizi per casa con manubri, panca e sbarra (K3 + K1); gli stessi schemi valgono con K0 (con le scale della sez. 3). Notazione: `PH` spinta orizzontale (piegamenti, panca), `PV` spinta verticale, `RH` tirata orizzontale, `VP` tirata verticale, `SQ` squat bilaterale, `SU` squat unilaterale, `HG` hinge (stacco rumeno), `GB` ponte/hip thrust, `HC` curl femorali, `CF` polpacci, `LR` alzate laterali, `BI` curl, `TR` tricipiti, `CO` core (tenute). `[A+B]3` = coppia A+B, 3 giri (3 serie ciascuno); `X4/120` = 4 serie dritte con pausa 120 s (altrimenti pause della classe). `[LR+BI]`, `[TR+CF]`, `[CF+HC]` sono coppie di muscoli **diversi non antagonisti** (stesso risparmio atteso, ma la meta-analisi 2025 copre gli antagonisti: Convenzione). Sedute: `FBa/FBb` full body A/B, `UP` upper, `LO` lower, `PU/PL/LG` push/pull/legs.

**Sedute** (min = stima del modello):

| Min | Seduta | Contenuto | Esercizi | Serie | Min |
|---|---|---|---|---|---|
| 20 | FBa | [PH+RH]2 · [SQ+HG]2 · CO2 | 5 | 10 | 19 |
| 20 | FBb | [PH+VP]2 · [SU+HG]2 · CO1 | 5 | 9 | 19 |
| 20 | UP | [PH+RH]3 · [PV+VP]2 | 4 | 10 | 18 |
| 20 | LO | [SQ+HG]3 · [SU+GB]2 | 4 | 10 | 20 |
| 20 | PU / PL / LG | PH3 · PV2 · TR2 / RH3 · VP2 · BI2 / SQ3 · HG3 · CF2 | 3 | 7-8 | 17-19 |
| 30 | FBa | [PH+RH]3 · [SQ+HG]3 · [LR+BI]2 | 6 | 16 | 29 |
| 30 | FBb | [PH+VP]3 · [SU+HG]3 · [TR+CF]1 | 6 | 14 | 29 |
| 30 | UP | [PH+RH]3 · [PV+VP]3 · [LR+BI]2 | 6 | 16 | 29 |
| 30 | LO | [SQ+HG]3 · [SU+GB]3 · CF2 | 5 | 14 | 29 |
| 30 | PU / PL / LG | PH3 PV3 LR3 TR3 / RH3 VP3 BI3 CO2 / SQ3 HG3 SU2 CF3 | 4 | 11-12 | 25-28 |
| 45 | FBa | [PH+RH]3 · [SQ+HG]3 · [PV+VP]2 · [LR+BI]2 · CO2 | 9 | 22 | 41 |
| 45 | FBb | [PH+VP]3 · [SU+GB]3 · [PV+RH]2 · [TR+CF]2 · CO2 | 9 | 22 | 44 |
| 45 | UP | [PH+RH]3 · [PV+VP]3 · [LR+BI]3 · TR2 | 7 | 20 | 37 |
| 45 | LO | [SQ+HG]3 · [SU+GB]3 · [CF+HC]3 · CO2 | 7 | 20 | 39 |
| 45 | PU / PL / LG | PH4 PV4 PH3 LR4 TR3 / RH4 VP4 RH3 BI4 CO2 / SQ4 HG3 SU3 CF3 HC3 | 5 | 16-18 | 40-42 |
| 60 | FBa | PH3 · RH3 · SQ3 · HG3 · PV2 · VP3 · [LR+BI]2 · [TR+CF]2 · CO1 | 11 | 26 | 59 |
| 60 | UP | PH4 · RH4 · PV4 · VP4 · [LR+BI]4 · TR3 | 7 | 27 | 59 |
| 60 | LO | SQ4 · HG4 · SU3 · GB3 · [CF+HC]4 · CO3 | 7 | 25 | 56 |
| 60 | PU / PL / LG | PH5/120 PV4 PH3 LR5 TR4 PV2 / RH5/120 VP4 RH3 BI5 CO3 VP2 / SQ5/120 HG4 SU4 [CF+HC]4 CO3 | 6 | 22-24 | 53-57 |
| 90 | FBa | PH4/120 · RH4/120 · SQ4/120 · HG4/120 · PV3 · VP3 · [LR+BI]3 · [TR+CF]3 · CO3 | 11 | 37 | 88 |
| 90 | UP | PH4/120 · RH4/120 · PV4/120 · VP4/120 · PH3 · RH3 · [LR+BI]4 · TR4 | 9 | 34 | 85 |
| 90 | LO | SQ4/120 · HG4/120 · SU4 · GB4 · [CF+HC]4 · SQ3 · CO3 | 8 | 30 | 75 |

**Settimana** (sequenze: 2 giorni = FBa FBb; 3 giorni = FBa FBb FBa fino a 45 minuti, UP LO FBa da 60; 4 giorni = UP LO UP LO; 5 giorni = PU PL LG UP LO; 6 giorni = PU PL LG PU PL LG). Serie frazionarie settimanali (diretta 1, secondaria 0,5) nell'ordine **petto / schiena / quadricipiti / femorali / glutei / spalle / bicipiti / tricipiti / polpacci**. Soglie: **< 4** sotto il pavimento (Iversen 2021, Pelland [R]); **4-5** pavimento; **6-9** MEV pratico (euristica RP, Convenzione [R]); **≥ 10** soglia solida (Schoenfeld 2017 [R]).

| Min | Giorni | Seduta | Serie / min a settimana | Serie settimanali (P/S/Q/F/G/Sp/B/T/Pl) | Giudizio sui 6 gruppi grandi |
|---|---|---|---|---|---|
| 20 | 2 | FBa FBb | 19 / 38 | 4/4/4/4/4/2/2/2/0 | 5 gruppi al pavimento (4-5), spalle < 4: **mantenimento/principiante**; niente polpacci |
| 20 | 3 | FBa FBb FBa | 29 / 56 | 6/6/6/6/6/3/3/3/0 | tutti 6, spalle < 4: **ok per principianti** |
| 20 | 4 | UP LO UP LO | 40 / 75 | 6/10/10/6/12/7/5/5/0 | tutti ≥ 6, 3 gruppi ≥ 10: **buono** |
| 20 | 5 | PU PL LG UP LO | 42 / 90 | 6/10/8/6/9/7/7/7/2 | ok, ma 5 sedute da 17-20 minuti: sconsigliato (costo fisso di 4-7 min per seduta) |
| 20 | 6 | PU PL LG PU PL LG | 44 / 104 | 6/10/6/6/6/7/9/9/4 | stesso volume del 4 giorni, più sedute: sconsigliato |
| 30 | 2 | FBa FBb | 30 / 57 | 6/6/6/6/6/5/5/4/1 | tutti ≥ 6 salvo spalle 5: **il minimo serio a 2 giorni** |
| 30 | 3 | FBa FBb FBa | 46 / 86 | 9/9/9/9/9/8,5/8,5/5,5/1 | tutti tra 8,5 e 9 (polpacci a parte): **ottimo rapporto** |
| 30 | 4 | UP LO UP LO | 60 / 115 | 6/12/12/6/15/13/10/6/4 | 4 gruppi ≥ 10: buono |
| 30 | 5 | PU PL LG UP LO | 64 / 138 | 6/12/11/6/11,5/14/11/9/5 | petto e femorali a 6: sedute da 25-29 min |
| 30 | 6 | PU PL LG PU PL LG | 68 / 161 | 6/12/10/6/8/15/12/12/6 | sconsigliato: 6 sedute per volume da 4 giorni |
| 45 | 2 | FBa FBb | 44 / 85 | 6/10/6/3/7,5/9/7/7/2 | **femorali < 4**: aggiungere HG in FBb o HC |
| 45 | 3 | FBa FBb FBa | 66 / 126 | 9/15/9/6/10,5/14,5/11,5/9,5/2 | 3 gruppi ≥ 10, tutti ≥ 6: **ottimo** |
| 45 | 4 | UP LO UP LO | 80 / 153 | 6/12/12/12/15/15/12/10/6 | 5 gruppi ≥ 10: **molto buono** |
| 45 | 5 | PU PL LG UP LO | 91 / 200 | 10/17/13/12/12,5/19/15,5/13,5/6 | 6/6 ≥ 10: sopra il bisogno di molti |
| 45 | 6 | PU PL LG PU PL LG | 102 / 247 | 14/22/14/12/10/23/19/17/6 | oltre 20 su schiena e spalle: si ferma al bersaglio |
| 60 | 2 | FBa FBb | 52 / 118 | 6/12/6/6/6/11/10/9/4 | tutti ≥ 6: bene; con 2 giorni il petto resta a 6 |
| 60 | 3 | UP LO FBa | 78 / 174 | 7/14/10/11/11,5/15,5/13/11,5/6 | 5/6 ≥ 10: **ottimo** |
| 60 | 4 | UP LO UP LO | 104 / 231 | 8/16/14/16/17/20/16/14/8 | oltre il bersaglio: tagliare |
| 60 | 5-6 | PU PL LG UP LO / x2 | 121-138 / 281-332 | 12-16/22-28/16-18/16/13-15/25-30/20-24/18-22/8 | oltre 20 quasi ovunque: **non serve** |
| 90 | 2 | FBa FBb | 74 / 177 | 8/14/8/8/8/16/13/13/6 | 2 giorni da 88 minuti: sotto 10 su 4 gruppi, sedute lunghissime: meglio 3 giorni da 45-60 |
| 90 | 3 | UP LO FBa | 101 / 248 | 11/18/15/12/15,5/19,5/16/16/7 | 6/6 ≥ 10 |
| 90 | 4-6 | UP LO ... | 128-162 / 319-405 | 14/22-28/22/16/23/23-31/19-30/19-28/8 | **troppo**: oltre 20 su quasi tutti |

**Quando si raggiunge ≥ 6 su tutti i sei gruppi grandi** (con coppie): **20 minuti → 3 giorni** (spalle < 4; 4 giorni per averla); **30 minuti → 2 giorni** (spalle 5; con 3 giorni tutti ≥ 8,5); **45 → 3 giorni** (2 giorni: femorali 3); **60 → 2 giorni**; **90 → 2 giorni** ma conviene 3 più brevi. **≥ 10 su tutti i sei**: 45 minuti → 5 giorni; 60 → 5 giorni; 90 → 3 giorni; con 30 minuti non si arriva a 6/6 in nessun caso con questa struttura. Sono capacità: il risolutore deve fermarsi al bersaglio.

Equivalenza **pendolare**: 4 × 20 minuti (40 serie in 75 minuti) = 2 × 45 (44 serie in 85 minuti): stesso volume, quindi la scelta è di aderenza (Convenzione). Due sedute da 20 minuti nello stesso giorno (mattina e sera) con lo stesso volume: nessuna prova vista, probabilmente equivalenti ([M]).

### 5.6 Messaggi onesti da mostrare all'utente (testi proposti)

- **Sotto il pavimento**: «Con questi minuti il programma tiene i muscoli e fa progredire un principiante: per crescere in modo evidente servono più sedute o sedute più lunghe (almeno 4 serie a settimana per muscolo bastano a cominciare, 10 per risultati chiari).»
- **Con 20 minuti**: «Venti minuti con coppie di esercizi bastano per mantenerti e per partire. Quando puoi, aggiungi una seduta o passa a 30 minuti.»
- **Pavimento ma non solido**: «Con 2 sedute da 45 minuti arrivi circa a 6-10 serie per muscolo: va bene per salute e crescita da principiante.»

### 5.7 Algoritmo del risolutore dei tempi (proposta)

```
risolvi(profilo, M, giorni):
  1. bersaglio[muscolo] = VOLUME per livello (pavimento 4; 10-16 interm.; 12-20 avanz.), tetto 11 per seduta (PRG-30)
  2. unità = lista dei 6 schemi + accessori, in ordine di priorità P1..P6 (sez. 5.4), classe (multi/uni/iso/hold/elastico) per esercizio
  3. riempi: parti da P1 x2 serie; aggiungi nell'ordine; dopo ogni aggiunta ricalcola T = W(M) + somma(T_unità) - R_ultima, con f utente
     - usa coppie se M <= 45 oppure se il tempo non basta (antagonisti, poi muscoli diversi)
     - fermati quando T > M (+5 min tolleranza) oppure bersaglio raggiunto per tutti i muscoli
  4. se T > M già con P1: applica l'ordine di intervento (pause -> coppie -> P7..P5 -> serie 3->2 -> P4)
  5. se un muscolo grande resta < 4 serie frazionarie alla settimana: nota «mantenimento» + proposta (più giorni, tabella 5.5)
  6. ritorna sedute, T per seduta, serie frazionarie per muscolo e messaggio onesto
```

Dove: `exerciseCountFor` (`onboarding.js:110`) diventa un wrapper di `risolvi`; `minutiDi` (`ricette.js:337`) e le stime UI (`oggi.js:109`, `giorno.js:98`, `aggiungi-allenamento.js:379`) usano la **stessa** funzione dei tempi.

---

## 6. Audit delle regole esistenti

Simulazioni **reali** con `buildProgram` (script che carica gli script classici di `index.html` in un contesto `vm` e lo chiama su profili casa; nessun file dell'app toccato). Esiti: **G** giusta e supportata; **N** non supportata; **M** mancante; **B** bug.

| ID | Regola o funzione | Esito | Evidenza | File:riga |
|---|---|---|---|---|
| H-01 | `exerciseCountFor` (PRG-03) | **B** | Usa `sets × restCompound` per **ogni** esercizio e non conosce classi: per la forza dà **3 esercizi a 30, 45, 60, 75 e 90 minuti**; massa a 45 minuti = 3. In simulazione `manubri, massa, intermedio, 3 giorni, 45 min` il minimo è 3 ma le sedute escono con 5 esercizi ciascuna (le regole PRG-21 e ABB-03 aggiungono dopo): il numero **non** governa la seduta reale. Conferma B1 della gap analysis | `js/ui/onboarding.js:110-114`; `ricette.js:79` |
| H-02 | Modello tempi PRG-33 (`minutiDi`) | **N/B** | 35 s per serie di qualsiasi classe + 8 minuti fissi: ok per bilaterali (±12%), sbaglia per unilaterali (−35%), tenute, elastici; non conta le coppie (B5): **il risparmio delle superserie non viene mai reinvestito**; il ciclo di taglio non tocca esercizi con ≤ 2 serie e si ferma con 3 esercizi | `ricette.js:337-348, 357-362` |
| H-03 | Stime di durata mostrate all'utente | **B** | Oggi e giorno usano `30 s + pausa` per serie **senza i 8 minuti**: l'utente vede 24 minuti dove il generatore ne stima 33; 30 contro 39 (corpo libero 45 min), 18 contro 27, 26 contro 35, 41 contro 50 | `js/ui/oggi.js:109`; `js/ui/piano/giorno.js:98`; `aggiungi-allenamento.js:379` |
| H-04 | Pause per classe a casa (PRG-13, `tipoCarico`) | **B** | `tipoCarico` conosce solo bilancieri pesanti: **ogni** multiarticolare a corpo libero o con manubri è «macchina»: pausa `max(90, 0,75 × recupero)`. Simulato: Dip alle parallele **5 × 8, 165 s**; Squat a corpo libero **4 × 8, 165 s**; Goblet squat 2 × 10, 120 s; Plank 3 × 45 s con pausa 90 s (metodo `rr`). Sono +5-8 minuti per seduta senza un motivo di recupero | `regole-ricerca.js:44-48`; `ricette.js:187`; `metodi-momenti.js:64` |
| H-05 | Ripetizioni e fattibilità a corpo libero | **B/M** | Ripetizioni fisse (8-10) qualunque sia la difficoltà: Squat a corpo libero **3 × 8** per un intermedio è lontanissimo dal cedimento; invece un principiante riceve **Trazioni alla Sbarra 3 × 10**, **Dip alle Parallele 3 × 10**, **Nordic Curl 2 × 12 e 3 × 10**: irrealistici. Nessuna scala di regressione né test di livello | simulazioni `corpo/manubri`; `ricette.js:186-207` |
| H-06 | Progressione dei pesi a zero | **M** | Esercizio a peso zero: `+1 ripetizione` **per sempre**, senza tetto né cambio di variante; tenuta `+5 s` per sempre (60 → 90 → 120 s di plank) | `regole-ricerca.js:146-150, 116-118` |
| H-07 | Metodo `rr` (MET-01) | **N** | Il testo promette «3 × 5-8; a 3 × 8 passi alla variante più difficile», ma `schema` imposta 8 ripetizioni dal primo giorno (`e.reps = 8`) e **nulla** implementa il passaggio; viene scelto in automatico per il corpo libero (MET-02, +3). Nel programma `corpo, intermedio, 3 giorni, 45 min` contiene **Hyperextension (Lombari)** (serve una panca per lombari) e Dip alle parallele; le coppie sono per indice, non per muscolo | `metodi-momenti.js:61-64`; `compone.js:97` |
| H-08 | Inventario attrezzi a casa | **M** | `ONB_LUOGHI` ha solo tre luoghi grossolani. Il pool `corpo` è tutto ciò che non corrisponde alle altre espressioni regolari: **trazioni ×3, dip alle parallele, leg raise alla sbarra, sedia romana, hyperextension, ab wheel, step-up e dip su panca** vengono prescritti a chi non ha una sbarra, una panca o un attrezzo. L'interruttore «Sbarra» esiste solo in Opzioni > Il coach («Attrezzi della tua palestra»); se tolto, **non resta alcuna tirata verticale** (lo slot `tirataV` ha solo le trazioni a casa). `DETTAGLI[nome][1]` (testo «Sbarra», «Parallele», «Panca per lombari», «Sbarra bassa o anelli») **conosce già** l'attrezzo fisico | `onboarding.js:205-209`; `motore.js:28-54`; `il-coach.js:8, 23-26`; `ricette.js:23`; `dettagli-esercizi.js:110,123,132,136` |
| H-09 | Hinge e femorali a casa | **B/M** | `SLOT_DEF.hinge` riconosce solo stacchi con bilanciere o macchina: a casa lo slot è **vuoto**; PRG-21 lo riempie con il ponte glutei perché `SCHEMI_MOV.hinge` include ponte e hyperextension. La libreria **non ha** stacco rumeno con manubri, a una gamba, slider curl, kettlebell swing | `ricette.js:26,33`; `schemi.js:12`; conferma B15 e libreria (cap. 17) |
| H-10 | Tecniche (PRG-34) a corpo libero | **B** | `[drop]` su Hyperextension, Squat a Corpo Libero, **Calf Raise a un Piede (corpo libero)**, Dead Bug, Nordic Curl 2 × 12; `[parziali]` su Nordic e calf raise: senza carico non si «riduce il carico». Conferma e allarga B3 | `ricette.js:357-367` |
| H-11 | Superserie (ABB-06) | **G/M** | Giusta e supportata (antagonisti, adiacenti, mai con pesanti). Mancano: usarle sopra i 45 minuti, contarle nel tempo (H-02), coppie non in competizione, e reinvestire il tempo guadagnato. Con il metodo `rr` le coppie sono per indice | `struttura-pro.js:174-205`; `ricette.js:86,357-358,372-375` |
| H-12 | Minuti e giorni (onboarding) | **N/M** | Durate 30-90: **manca 20**. Il testo «Sotto la mezz'ora lo stimolo rischia di essere scarso» non è supportato dalla dose minima (Iversen, Androulakis-Korakakis). `minimo` ammette 2 giorni e 30-45 minuti | `onboarding.js:270-276`; `metodi-momenti.js:53`; `compone.js:40-42` |
| H-13 | Unilaterali nel tempo | **M** | Il campo `lato` esiste (`libreria-esercizi.js`) ma tempo e conteggio non lo usano: un bulgaro 3 × 10 è stimato come un goblet 3 × 10, ma dura circa +55%. Come la scheda di seduta mostri «per lato»: non verificato (appare solo in stampa e seduta libera) | `ricette.js:337`; `stampa-scheda.js:23`; `seduta-libera.js:95` |
| H-14 | Elastici, kettlebell, anelli | **M** | Nessun esercizio in libreria; `kettlebell` (Simple & Sinister) è `applicabile: false` («non ancora nella libreria»); gli elastici non hanno unità di carico (`arrotonda` a 0,5 kg) | `metodi-momenti.js:81`; `progressivo.js:16` |
| H-15 | `mantenimento`, `minimo`, PRG-30, ABB-06, PRG-21, BIO-04 | **G** | Coerenti con Bickel 2011, Iversen 2021, Pelland e la meta-analisi 2025 (con i limiti di forza di queste fonti); PRG-30 tetto 11 serie per seduta a tempo | `metodi-momenti.js:53,57`; `ricette.js:315` |
| H-16 | Durata reale | **G (dato disponibile)** | La durata reale della seduta è già salvata (`minuti: minutiSeduta()`); manca solo il confronto con la stima per tarare il modello | `termina-e-cardio.js:103`; `seduta.js:140-146` |

**Bug di tempo della gap analysis (B1, B5)**: confermati da H-01 e H-02. In più (simulazioni a 60 minuti): `corpo, massa, avanzato, 4 giorni` esce a **42-56 minuti** stimati dal generatore (UI: 32-46) e `corpo, forza, intermedio, 4 giorni` a **39-52** (UI: 30-43), cioè **4-21 minuti sotto** il tempo dichiarato con 3-5 esercizi: `exerciseCountFor` paga ogni esercizio come un multiarticolare pesante e il tempo risparmiato (coppie, pause, serie corte) non viene reinvestito; la UI ne dichiara ancora meno.

---

## 7. Regole proposte

Tutte **spegnibili** (`REGOLE_SPEGNIBILI`), attive solo con `coachAttivo()`, con motivo in italiano (frasi nuove anche in `en.js`, `es.js`, `de.js`) e annullabili; **non** aumentano l'intensità per cauto, over 65, PAR-Q positivo, dolore o scarico (salvo dove scritto). **Nessuna è ancora stata scritta nel codice.** Le regole che poggiano su fonti [M] sono marcate e vanno confermate con le query dell'appendice A prima di essere implementate. Non ripeto le regole già proposte da altre note (IPE-01..14, PCO-01..10): dove si sovrappongono lo scrivo.

| Codice proposto | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **CAS-01** inventario attrezzi a casa | Luogo `manubri` o `corpo` | Nuova domanda (sbarra sì/no, panca o sedia robusta, elastici, manubri: kg a mano e se regolabili, kettlebell, anelli); salva `attrezziCasa`; `consentito()` filtra usando `DETTAGLI[nome][1]` (Sbarra, Parallele, Panca per lombari...) invece delle sole regex; nessun esercizio senza l'attrezzo | «Dimmi cosa hai in casa: ti propongo solo esercizi che puoi fare davvero.» | Convenzione (prerequisito di usabilità e sicurezza) | Un passo in più nell'onboarding; chi salta la domanda → K0 | `js/ui/onboarding.js` (`ONB_LUOGHI`, passo 4), `js/coach/programma/motore.js` (`consentito`, `attrezzoDi`), `js/ui/opzioni/il-coach.js` (`ATTREZZI_PALESTRA`), `js/dati/dettagli-esercizi.js` |
| **CAS-02** scale di leve a corpo libero e regola RR | Esercizio a peso zero o `rr` | Assegna a ogni pattern una scala 1-6 (sez. 3), salva il livello per esercizio; `caricoProssimoBase`: +1 ripetizione fino al tetto (12-15 massa/salute, 8 forza); a 3 × tetto con RIR 1-3 in due sedute → livello successivo e riparti dal minimo; 2 sedute sotto il minimo → livello precedente; tenute fino a 60 s poi cambio leva. `rr` implementa davvero «3 × 8 → variante più difficile e 3 × 5» | «Hai fatto 3 × 12 piegamenti puliti: passo ai piedi rialzati e ripartiamo da 3 × 6. Al corpo non si aggiungono grammi, si cambia la leva.» | Moderata (principio: carichi bassi vicino al cedimento, Schoenfeld 2017, Lasevicius 2018 [V]; l'ordine delle scale è Convenzione) | Spalle e ginocchia: i filtri `RISCHIO` restano; over 65: niente livelli instabili senza appoggio; annullabile | nuovo `js/dati/scale-corpo.js` (dopo `dettagli-esercizi.js`), `regole-ricerca.js:116-118, 146-150`, `ricette.js` (scelta per livello), `metodi-momenti.js:61-64` |
| **CAS-03** livello di partenza e vicinanza al cedimento a casa | Primo programma `corpo`/`manubri`; ogni seduta con esercizi a peso zero | Test brevi in onboarding (massimo di piegamenti puliti, sit-to-stand in 30 s, rematore inverso o trazione) → livello iniziale tale che il massimo pulito sia 8-20; se la serie finisce con RIR > 4 (RPE ≤ 6) in due sedute → livello successivo; non oltre 20-25 ripetizioni sulla stessa leva | «Ti faccio partire dal livello in cui le ultime ripetizioni costano fatica: se è troppo facile non stimola, se è troppo difficile non impari.» | Moderata (carichi bassi: [V]; RIR: Halperin/Refalo [R]) | Principianti e over 65: RIR ≥ 2-3, test facoltativo; PAR-Q: niente test a cedimento | `onboarding.js` (nuovo passo), `biomeccanica.js` (3 prove esistenti BIO-04/05), `regole-ricerca.js` (`rirBersaglioBase`) |
| **CAS-04** pause per classe a casa | Esercizio senza bilanciere pesante (corpo libero, manubri, elastici) | Pausa: corpo libero multi 75 s, manubri multi 90 s, isolamenti 60 s, elastici e tenute 45 s; 120 s solo per unilaterali pesanti o obiettivo forza con carico alto. Obiettivo forza **non** inventa 165 s per un piegamento | «A casa le serie ti affaticano meno: 60-90 secondi bastano e ti fanno risparmiare tempo.» | Moderata + **Contrastata** (Singer 2024 [R] contro ACSM 2026 [S] e [M] RCT 2016) | Allenati in forza: pause lunghe invariate sui carichi alti; donne ×0,85 resta (PRG-20) con minimo 45 s | `ricette.js:187`; `regole-ricerca.js:44 tipoCarico` (aggiungere classi `corpo`, `manubri`, `elastico`, `tenuta`) |
| **CAS-05** modello dei tempi unico | Sempre | Funzione `stimaMinutiSeduta(esercizi, opzioni)` con `S`, `R`, `X`, unilaterali, tenute, coppie e `W(M)` (sez. 5.1), usata da `exerciseCountFor`, `minutiDi` e dalle stime UI; fattore utente `f` dalla storia (`minuti` salvati) | «La seduta dura circa N minuti: ho contato riscaldamento, cambi e lato destro e sinistro.» | Convenzione (costanti da tarare; confronto con la formula attuale in 5.2) | Cambia numeri visibili: test del nuovo modello contro il vecchio su 20 profili; tolleranza invariata (+5) | nuovo `js/coach/programma/tempo.js` (prima di `ricette.js` e delle UI), `onboarding.js:110`, `ricette.js:337`, `oggi.js:109`, `giorno.js:98`, `aggiungi-allenamento.js:379` |
| **CAS-06** numero di esercizi da capacità | Costruzione del programma | Sostituisce `exerciseCountFor` con il risolutore di 5.7: parte dai 4 schemi base × 2 serie, riempie in ordine P1..P6, tetto 8 esercizi (10 con coppie); minimo 4 (i 4 schemi base) invece di 3 | «Con 45 minuti ti propongo 8 esercizi abbinati in coppie: stessi risultati in meno tempo.» | Moderata (Iversen 2021 per i contenuti minimi, superserie 2025 per il risparmio) + Convenzione (ordine) | Principianti: massimo 3 serie (invariato); IPE-03 è la stessa idea sul taglio | `onboarding.js:110-114`, `ricette.js:79,86,337-348` |
| **CAS-07** scala di priorità | `minutiDi > minuti` | Ordine di intervento di 5.4: pause nei minimi → coppie → P7..P5 → serie 3 → 2 → P4; **mai** sotto P1 × 2 serie: nota «con questi minuti è un programma di mantenimento» + proposta di più giorni | «Per farti stare nel tempo accorcio prima le pause e abbino esercizi opposti, poi tolgo il superfluo: gli schemi base restano sempre.» | Convenzione + Moderata (superserie) | Si sovrappone a IPE-03; unificare | `ricette.js:337-348`; `struttura-pro.js` (anticipare `strSuperserie`) |
| **CAS-08** coppie nel modello e reinvestimento del tempo | `poco` (≤ 45) o tocco superserie o tempo insufficiente | Le coppie entrano nel calcolo **prima** di decidere serie ed esercizi; il tempo guadagnato (circa 20-30%) aggiunge P4, P5 fino ai bersagli; coppie anche di muscoli diversi non antagonisti (alzate + curl) se non c'è altro | «Abbinare esercizi opposti ti fa fare più lavoro nello stesso tempo.» | Moderata (meta-analisi 2025 [R]); coppie non antagonisti: Convenzione | Mai con pesanti; sforzo percepito più alto: RIC-04 e intensità bassa restano | `ricette.js:357-362`; `struttura-pro.js:174-205 strAntagonisti/strSuperserie` |
| **CAS-09** pavimento di volume e messaggio onesto | Dopo `strFinale`, programma di ipertrofia o ricomposizione | Se un muscolo grande ha < 4 serie frazionarie a settimana: nota (5.6), proposta di tabella 5.5; se 4-5: «volume di partenza» | «Con questi minuti il petto riceve 3 serie a settimana: tiene ma non cresce granché.» | Moderata (4 serie: Iversen 2021, Pelland [R]) | Nessuna spinta oltre: solo informazione; non duplicare IPE-02 | `ricette.js` (dopo riga 351), nota del programma |
| **CAS-10** opzione 20 minuti e testo onboarding | Passo minuti | Aggiungere **20** (e opzionale 15); metodo `minimo` con `minuti [20, 45]` e `giorni [2, 3]` (con PCO-04); riscrivere «Sotto la mezz'ora lo stimolo rischia di essere scarso» in «Anche 20 minuti con esercizi in coppia mantengono e fanno partire: più sedute, più risultati» | «Con pochi minuti conta cosa metti: pochi esercizi completi, fatti bene e vicino al limite.» | Moderata (dose minima: Androulakis-Korakakis, Iversen [R]) | Principianti: RIR ≥ 2; non promettere ipertrofia massima | `onboarding.js:270-276`, `metodi-momenti.js:53`, `compone.js:40-42` |
| **CAS-11** cedimento sicuro senza spotter | Esercizi con carico che può cadere (press sopra la testa e panca con manubri pesanti, goblet pesante, unilaterali instabili) | RIR minimo 2 (1 per i leggeri); testo «fermati quando la tecnica cede»; niente drop/cluster/rest-pause su instabili; piegamenti, rematori ed elastici restano con RIR 0-1 | «Da solo in casa, lascia sempre qualche ripetizione in riserva sugli esercizi con pesi sopra di te.» | Convenzione (sicurezza), coerente con l'errore di stima del RIR di circa 1 ripetizione [R] | Solo prudenza, mai oltre | `regole-ricerca.js` (`rirBersaglioBase`), `biomeccanica.js:40 stabile`, `ricette.js:361` |
| **CAS-12** tecniche adatte al corpo libero | Assegnazione di drop/parziali/cluster | Niente `drop` o `parziali` su esercizi a peso zero senza zavorra/elastico, su Nordic, tenute e core; al loro posto «regressione» (le ultime ripetizioni in variante più facile) o nulla; stessa esclusione per over 65 e principianti ≤ 45 min | «Il drop set serve col peso: a corpo libero non serve, ti faccio fare più ripetizioni o una leva più facile.» | Convenzione (estende B3) | Nessuno | `ricette.js:357-367` (`tecnicaAdatta`), `regole-nuove.js:86 limitaTecnicheIntense` |
| **CAS-13** femorali e hinge a casa | `manubri` o `corpo` | Aggiunge alla libreria stacco rumeno con manubri, stacco rumeno a una gamba, slider curl, kettlebell swing (con K4) e Nordic con scala (assistito, 5-6 ripetizioni, mai 12); `SLOT_DEF.hinge` e `isoFem` li accettano; il ponte glutei resta `glutSpinta` | «A casa i femorali richiedono due esercizi: uno con l'anca (stacco) e uno con il ginocchio (curl).» | Moderata (da verificare: seduto contro prono [R]; Nordic [M]) | Schiena: stacco rumeno con controllo, `RISCHIO.schiena` invariato; Nordic: solo da livello 4 | `libreria-esercizi.js`, `dettagli-esercizi.js`, `schemi.js:12`, `ricette.js:26,33`, `motore.js:28 attrezzoDi` |
| **CAS-14** tirata verticale senza sbarra | `attrezziCasa` senza sbarra | Sostituisce `tirataV` con lat pulldown con elastico + pullover con manubrio e **una serie in più** di rematore; avvisa che non sostituisce le trazioni | «Senza sbarra la parte alta della schiena si allena con rematori, elastico e pullover: meno completo, ma funziona; una sbarra da porta cambia molto.» | Convenzione (nessuna fonte vista) | Nessuna spinta oltre; suggerimento neutro | `ricette.js:23 SLOT_DEF.tirataV`, `libreria-esercizi.js` |
| **CAS-15** elastici: livelli e taratura | Esercizi con elastico | Classe attrezzo `elastico`; il carico è un livello 1-6, non kg; taratura: livello con cui l'utente fa 15-25 ripetizioni a 2-3 in riserva; progressione: ripetizioni fino a 25 → livello/ancoraggio; `arrotonda` non usato per l'elastico | «L'elastico non ha chili: scelgo il livello con cui fai 15-25 ripetizioni vicino al limite.» | Moderata per l'equivalenza di forza (Lopes 2019 [V]); Convenzione per la taratura | Sicurezza: controllo dell'elastico (abrasioni, tagli) scritto nella scheda tecnica; niente oltre 200-300% di allungamento | `libreria-esercizi.js`, `dettagli-esercizi.js`, `progressivo.js:16`, `partenza.js:83` |
| **CAS-16** viaggio e hotel | Azione «Oggi sono in viaggio» o assenza prevista | Converte la seduta del giorno in una versione K0 + elastico + zaino di 20-25 minuti con gli stessi schemi (sez. 4.6); volume a un terzo, stessa intensità; non conta come seduta piena | «In viaggio mantieni quello che hai con 20 minuti a corpo libero: qualche giorno così non ti fa perdere nulla.» | Moderata (mantenimento: Bickel 2011 [R]); la conversione è Convenzione | Non per dolore o scarico; annullabile | `js/ui/seduta-libera.js`, `programma/alternative.js`, `metodi-momenti.js` `mantenimento` |
| **CAS-17** micro-seduta di emergenza | Seduta saltata o giorno pieno; ADE/PSI già in uso | Offre 8-10 minuti: una coppia di antagonisti × 2-3 serie; conta una **frazione** del volume e salva la serie di giorni senza inflazionare | «Meglio dieci minuti che niente: una coppia di esercizi e hai tenuto il filo.» | Convenzione (nessuna prova per «3 × 5 minuti» vista) | Non sostituisce la seduta; mai in scarico dolore | `js/coach/psicologia.js`, `repertorio.js` `azioniCoach` |
| **CAS-18** taratura del tempo dal vissuto | Almeno 3 sedute con durata registrata | Calcola `f = mediana(minuti reali / stimati)` per utente (0,8-1,4) e lo usa nella stima e nel risolutore | «Le tue sedute durano di solito il 20% più del previsto: adatto il programma alla tua velocità.» | Convenzione | Dati locali, solo informazione | nuovo `tempo.js`, `termina-e-cardio.js:103` |

Ordine di valore/rischio suggerito: **CAS-05 → CAS-06/07/08** (tempi: correggono B1/B5 e le stime UI) → **CAS-01 → CAS-02/03/04/12** (casa) → CAS-13/14/15 (libreria) → CAS-09/10/11/16/17/18.

---

## 8. Domande aperte

1. **Ipertrofia con elastici**: nessuna prova diretta vista (solo forza, Lopes 2019 [V]). Cercare studi in allenati e confronti per massa con lo stesso volume e vicinanza al cedimento.
2. **Conteggio del volume a corpo libero**: i dati di Pelland sono per pesi; per piegamenti e rematori inversi non c'è un volume «equivalente» (serie a RIR ≤ 3: da verificare). Cercare «bodyweight volume hypertrophy fractional sets».
3. **Letture da fare per intero**: Lasevicius 2018 (misura: ripetizioni e cedimento nelle braccia), PMID 31895290 (cedimento a carico basso), Kotarsky 2018 (spessore: ecografia?), Lopes 2019 (popolazioni), Schoenfeld 2015 (durata della ripetizione), Spiering 2021 (dose minima), Bourne 2017 (Nordic).
4. **«3 × 5 minuti» e snack**: nessuna prova trovata per la forza; cercare «resistance exercise snacks randomized strength» e «distributed training volume equated» (e il risultato dell'RCT Minute Calisthenics).
5. **Gray Cook e kettlebell**: nessuna linea guida verificata; cercare «Gray Cook kettlebell guidelines swing goblet get-up standards» e «kettlebell training hypertrophy study».
6. **«Weakley 2021»** sulle superserie citato dalla richiesta: non riconosciuto; da verificare l'autore e il titolo.
7. **Tirata verticale senza sbarra**: nessuna fonte vista su rematori, pullover ed elastici contro trazioni per il gran dorsale; cercare confronti.
8. **Costanti del modello dei tempi**: `t_rip`, `c`, `X`, `W` sono ragionate; vanno tarate sulle durate reali salvate (`minuti` nello storico) e su un campione di sedute casa; prima domanda: quanto durano davvero le sedute di 4 esercizi con coppie?
9. **Come la seduta mostra i lati** negli unilaterali (3 serie per lato o in tutto?): non verificato.
10. **Donne e over 65 a casa**: non cercato (scale con appoggio, sit-to-stand, equilibrio).
11. **EDT/densità**: nessuno studio; da cercare «density training hypertrophy randomized».
12. **Dose «pavimento»**: le soglie 4 (Iversen/Pelland) e 6-8 (RP) sono [R]/[S]; confermare con Pelland (full text) e RP.
13. **Più sedute nello stesso giorno** per i pendolari: nessuna prova vista.
14. **Zaino zavorrato**: quantificare i passi di carico (circa 3-5 kg) con una fonte.

---

## 9. Limiti onesti

- **Rete**: solo WebSearch (rete.md) e **4 ricerche riuscite** su un tetto di sessione di 200 condiviso e già esaurito. Quindi: ogni riga [V] è il riassunto di un risultato; ogni riga [M] è **conoscenza del modello non verificata**: autori e anni con punto interrogativo sono ricordati con incertezza, nessun PMID inventato (i PMID citati vengono dai risultati o da altre note del repo).
- **Fonti secondarie**: le righe [R] sono prese da altre note del repo e **non le ho ricontrollate**; le cifre di ACSM 2026 e la soglia di 4 serie frazionarie a settimana sono [S] (riassunti di terzi, via altre note).
- **Popolazione**: quasi tutti gli studi su giovani uomini, spesso non allenati; Lasevicius 2018 è su non allenati con un solo muscolo per arto; Kotarsky 2018 ha n = 23 e 4 settimane; Lopes 2019 misura forza, non massa.
- **Il modello dei tempi è un modello**: le costanti sono ragionate, non misurate; le tabelle 5.5 sono calcolate, non osservate su persone, e contano l'efficienza delle coppie con un risparmio che la meta-analisi misura a 8-12RM a cedimento. Le scale di progressione sono ordini di difficoltà, non studi.
- **Persone citate** (Pavel, Dan John, Gray Cook, Nippard, Henselmans, Barbell Medicine, Antranik, Calisthenicmovement, Hybrid Calisthenics): **nessuna cifra attribuita a loro in modo diretto**; le righe che li riguardano sono quelle già nel repo o domande aperte; coach con programmi a pagamento hanno conflitti di interessi.
- **Simulazioni**: fatte su profili scelti (casa, 30-60 minuti, 2-4 giorni); non coprono l'intero spazio dei profili. Il seme casuale cambia gli esercizi, non le conclusioni sulle regole.
- **Salute**: tutte le proposte alzano o mantengono la prudenza; dolore acuto o che peggiora, sintomi al petto, svenimenti, formicolii o perdita di forza improvvisa → fermarsi e sentire il medico.

---

## Appendice A. Query pronte da lanciare con il tetto alzato

Ordine di valore; `AD` = `allowed_domains ["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","link.springer.com"]`.

**Casa, corpo libero, elastici, kettlebell (area A)**

1. `Lasevicius 2019 muscle failure low-load high-load hypertrophy` (AD) → PMID 31895290: leggere esito.
2. `Kotarsky 2018 push-up bench press muscle thickness` (AD) → autori e metodo di misura.
3. `bodyweight resistance training hypertrophy systematic review calisthenics 2024` (AD).
4. `elastic band resistance training muscle hypertrophy randomized trained` (AD).
5. `push-up variations ground reaction force percent body weight Ebben` (AD) → carico dei piegamenti.
6. `Nordic hamstring exercise hypertrophy biceps femoris long head Bourne` (AD).
7. `single-leg Romanian deadlift hamstring hypertrophy`, `slider leg curl hamstring activation` (AD).
8. `inverted row lat pulldown pull-up muscle activation latissimus` (AD).
9. `calf raise hypertrophy bodyweight single leg standing seated Kassiano` (AD).
10. `unilateral vs bilateral squat hypertrophy Bulgarian split squat randomized` (AD).
11. `repetition duration hypertrophy Schoenfeld 2015 systematic review` (AD).
12. `weighted vest backpack resistance training hypertrophy bodyweight progression`.
13. `kettlebell swing training strength meta-analysis Lake Lauder`, `McGill Marshall kettlebell swing back hip muscle activation`, `Porcari kettlebell ACE study` (AD).
14. `Gray Cook kettlebell guidelines swing goblet squat get-up standards`; `Pavel Simple and Sinister protocol standards` (sito del coach, solo per capire).
15. `suspension training TRX systematic review strength hypertrophy` (AD).
16. `Henselmans home workout no equipment build muscle` (`allowed_domains ["mennohenselmans.com"]`); `Stronger By Science bodyweight training progress` (`["strongerbyscience.com"]`).
17. `Nippard home workout dumbbells only program` (`["youtube.com"]`, `blocked_domains ["gumroad.com","tiktok.com"]`); `Barbell Medicine home training minimal equipment`.
18. `Reddit bodyweight fitness recommended routine progression rules`, `Antranik calisthenics progressions`, `Calisthenicmovement beginner progression`, `Hybrid calisthenics`, `Overcoming Gravity progressions` (livello 3).
19. `resistance band tension kg color elongation Thera-Band Hughes` e `elastic resistance calibration` (AD) → taratura.
20. `home gym safety training to failure without spotter dumbbell press bailout`.
21. `travel hotel workout minimal equipment maintain muscle strength`, `Spiering 2021 minimal dose preserve strength muscle` (AD).
22. `Bickel 2011 maintaining muscle mass with reduced training volume` (AD).

**Tempo (area B)**

23. `Iversen 2021 No Time to Lift time-efficient training` (AD) → full text PMC8449772.
24. `Androulakis-Korakakis minimum effective training dose 1RM resistance-trained` (AD).
25. `single set versus multiple sets hypertrophy meta-analysis Krieger 2010`, `Radaelli 1 3 5 sets` (AD).
26. `antagonist paired set resistance training meta-analysis Paz 2017` (AD).
27. `superset resistance training systematic review meta-analysis 2025 time efficiency` (AD) → PMID 39903375.
28. `Weakley 2021 time-efficient resistance training supersets` e `Weakley low-load resistance training` (AD) → identificare l'autore citato.
29. `inter-set rest intervals hypertrophy Schoenfeld 2016 1 minute 3 minutes trained men` (AD); `Singer 2024 rest interval Bayesian` (AD).
30. `escalating density training study hypertrophy`, `density training time under tension hypertrophy`.
31. `exercise snacks resistance training strength randomized older adults`, `exercise snacks meta-analysis fitness 2024` (AD).
32. `distributed resistance training volume across day hypertrophy`, `grease the groove study strength` (AD).
33. `Minute Calisthenics randomized controlled trial results` (AD).
34. `warm-up sets strength performance number of warm-up sets study` (AD); `RAMP warm-up Jeffreys`.
35. `resistance training frequency volume-equated once weekly versus thrice weekly` (AD).
36. `time per set resistance training session duration average rest minutes`.
37. `minimum effective dose hypertrophy two sessions per week trained` (AD).
38. `time-efficient hypertrophy one set to failure Nippard minimalist program` (`["youtube.com"]`).
39. `concurrent training short sessions HIIT finishers hypertrophy interference` (già coperto da `ricerca-cardio-nutrizione.md`).
40. `split sessions same day twice daily training hypertrophy volume equated` (pendolari).

## Appendice B. Come sono state ottenute le simulazioni

Lo script (non nel repo, solo nella cartella di lavoro di sessione) legge `index.html`, esegue in un contesto `vm` tutti gli script classici tranne `js/avvio.js`, imposta `coachAttivo = () => false` e chiama `buildProgram` con i profili: `{goals:['massa'], level:'intermedio', days:3, minutes:45, luogo:'corpo'}` (esce il metodo `rr`), lo stesso con `luogo:'manubri'`, `{goals:['salute'], level:'principiante', days:2, minutes:30, luogo:'corpo'}`, `{goals:['massa'], level:'principiante', days:3, minutes:30, luogo:'manubri'}`, `{goals:['forza'], level:'intermedio', days:4, minutes:60, luogo:'corpo'}`, `{goals:['massa'], level:'avanzato', days:4, minutes:60, luogo:'corpo'}`. Per ogni seduta confronta il modello del generatore (`8 + Σ sets × (35 + rest)/60`) con quello della UI (`Σ sets × (30 + rest)/60`). I modelli di 5.1-5.5 sono in due piccoli script (costanti, formule, sedute, tabella settimanale) rieseguibili con `node`.
