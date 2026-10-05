# Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso

**Copertura: 10 ricerche web riuscite (su almeno 35 richieste: il tetto di 200 interrogazioni per sessione, condiviso da tutti gli agenti, si è esaurito); il resto da conoscenza del modello.** Ogni riga è marcata con l'origine (legenda sotto). Le sezioni che reggono senza il web sono la 3 (algoritmo), la 6 (audit del codice) e la 7 (regole ALG): poggiano su codice letto, calcoli dichiarati e fonti viste. Le righe «Conoscenza del modello» hanno forza «Convenzione» o «Moderata (da verificare)» e **non diventano regole senza la verifica indicata nell'appendice A**.

Ambito: come si calcola il carico della seduta dopo (per livello, classe di esercizio e attrezzo), come si stima il massimale con il RIR, come si corregge il carico dentro la seduta, come si rileva uno stallo, cosa fare dopo pause e scarichi, come lo fanno le app più rispettate e cosa piace o dispiace agli utenti. Tocca le aree **CAR, PRO, PAR, STA, INT, RIC** (cap. 8, 10, 11, 19 di `docs/coach-mappa-regole.md`) e le aree 2 «Progression» e 4 «RIR and autoregulation» della analisi delle lacune (bug B6, B7, B8, B10, B11, B12, B17, B21). Data della ricerca: **2026-10-05**. Codice delle regole proposte: **ALG** (verificato libero con grep su `docs/` e `js/`).

**Rapporto con le altre note.** `docs/ricerca-forza-progressione.md` (29 ricerche) ha già: scale S1/S2/S3 per esercizio (PGR-01), percentuali di aumento per classe (par. 3.1), range di ripetizioni (3.4), Epley con RIR (3.3, 3.5), regole PGR-02..04, AUT-01/02, STD-01/02, TAP-01. **Questa nota non le rifà**: le usa come base e va oltre su cinque punti che quella non copre: (1) l'algoritmo unico in pseudo-codice con i dati che oggi mancano nello storico, (2) la correzione dentro la seduta e il profilo di caduta tra le serie, (3) il rilevamento degli stalli per tendenza, (4) un difetto nuovo trovato nel codice sugli scarichi e sulla ripresa (par. 6, U15), (5) il confronto con le app e i reclami sui piani generati da IA. Dove sono in disaccordo con quella nota lo dico (par. 2, punti D e G).

**Legenda delle origini** (colonna «Fonte»): **[W]** visto in un risultato di WebSearch di questa sessione (titolo, URL e riassunto; il riassunto è scritto da un modello su frammenti: titoli, anni e PMID sono affidabili, i numeri vanno ricontrollati sul testo); **[R]** visto nel repo (codice o altre note di ricerca, che a loro volta citano risultati web); **[M]** Conoscenza del modello (non verificata sul web): autore e anno solo dove il ricordo è sicuro, numeri in intervalli; **[C]** calcolo mio (aritmetica sulle formule, riproducibile). **Forza**: Solida / Moderata / Convenzione, più **Contrastata** (stessa scala di `docs/ricerca-struttura-e-intensita.md`).

## 1. Cosa dicono le fonti

### 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Precisione generale della stima del RIR | I partecipanti sono imperfetti nel predire quanto sono vicini al cedimento, **indipendentemente dal livello di allenamento**; la stima migliora un po' quando è fatta vicino al cedimento e quando le ripetizioni totali sono poche; parte alta o bassa del corpo non cambiano l'esito; variazione tra persone contenuta (DS 1,45 ripetizioni). Gli autori lasciano aperto se questo errore sia accettabile | Moderata | Halperin 2022 (Sports Med, scoping review + meta-analisi esplorativa) [W riassunto]; la nota sorella vi legge 13 pubblicazioni e 414 persone [R] |
| RIR e esperienza | Un titolo dice che la capacità di predire le ripetizioni al cedimento «non è perfetta ma migliora con l'esperienza»; Halperin 2022 non vede effetto del livello | **Contrastata** | Steele 2017 (PeerJ, PMC5712461) [W titolo]; Halperin 2022 [W] |
| Isolamenti e macchine | 27 uomini (22 anni, 66 mesi di allenamento medi) e 31 donne (20 anni, 22 mesi): 5RM su curl, pushdown e rematore seduto, poi 4 serie al cedimento al 72,5% di 1RM predicendo il RIR a ogni ripetizione da quando percepivano 5 RIR. **Né sesso, né esperienza, né esperienza con la scala RIR** hanno cambiato la differenza stima-realtà | Moderata (uno studio, n = 58) | Percept Mot Skills 2023, PubMed 37036795 [W riassunto; autori non nel riassunto] |
| Panca al 75% di 1RM | In allenati errore medio 0,65 ± 0,78 ripetizioni, senza effetto di sesso, esperienza o forza relativa | Convenzione (il riassunto non dice da quale studio) | riassunto di ricerca [W, non attribuito] |
| Carico e direzione dell'errore | Accuratezza maggiore con carichi dell'85% di 1RM, poi 75%, poi 65%; con 75% e 65% è sempre più probabile **sottostimare** il RIR di oltre 1 ripetizione (si finisce per fare meno volume del voluto). A 8 ripetizioni al 70% la DS è 1,2 ripetizioni: due terzi dei sollevatori dichiarano un RIR tra 2 e 4, alcuni 1 o 5 | Convenzione (riassunto non attribuito a uno studio) | riassunto di ricerca [W, non attribuito] |
| Scala RIR-RPE | RPE 10 = 0 ripetizioni in riserva, 9 = 1... Correlazione tra velocità del bilanciere e RPE r = -0,88 negli esperti e -0,77 nei principianti (squat); gli esperti sono stati più spesso accurati a 1RM | Moderata | Zourdos 2016 (JSCR 30(1):267-275) [W riassunto] |
| Come si chiede lo sforzo | Bodybuilder (panca e squat; 5 serie al 70% di 1RM, 10 ripetizioni o cedimento, 5 minuti di pausa): l'RPE dichiarato restava sotto 10 anche al cedimento, ma le ripetizioni rimaste erano stimate bene e meglio vicino al cedimento. Da qui una scala con **descrittori di ripetizioni in riserva per 5-10** e descrittori di sforzo per 1-4 | Moderata | Hackett 2012 [W riassunto]; Helms 2016 «Application of the RIR-based RPE scale» (PMC4961270) [W titolo] |
| Validità dell'RPE contro velocità e %1RM | Revisione sistematica: le scale OMNI-RES e RIR correlano con velocità e %1RM; r = 0,88-0,91 tra %1RM e RPE in ciascuna alzata | Moderata | PMC11569527 «Validity of RPE scales...» [W titolo; i numeri sono nel riassunto e non attribuiti con certezza] |
| RIR-velocità e variabilità | Il legame tra velocità media e RIR dipende dall'esercizio e ha forte variabilità tra persone: servono aggiustamenti individuali; esistono modelli individuali RIR-velocità | Moderata | PMC10901726; PMC12360324; PubMed 40125884 [W titoli e riassunti] |
| La stima si può allenare | Esiste uno studio 2026 sull'«allenabilità» della stima del RIR in giovani e anziani | Convenzione (solo titolo) | BMC Sports Sci Med Rehabil 2026, s13102-026-01997-y [W titolo] |
| RPE contro %1RM per forza e massa | RPE basato sul RIR «alla pari o meglio» della %1RM | Moderata | PMC5877330 (Helms 2018, titolo «RPE vs. Percentage 1RM Loading in Periodized Programs Matched for Sets and Repetitions») [W titolo] + riassunto [R] |
| Autoregolazione: effetto sul 1RM | Meta-analisi di 15 studi: nessuna differenza significativa tra autoregolato e standard; rete di confronti: APRE, RPE e velocità davanti alla %1RM | **Contrastata** | Sports Med Open 2021 (PMC8762534); PMID 40791980 [R riassunti]; titoli «Autoregulation in Resistance Training: Addressing the Inconsistencies» (Sports Med 2020) e PMC7810043 (revisione sistematica) [W titoli] |
| APRE (Autoregulatory Progressive Resistance Exercise) | Quattro serie per esercizio, la 3ª e la 4ª fino al cedimento: una **tabella** decide il carico della 4ª serie in base alle ripetizioni fatte nella 3ª (più o meno del previsto = carico su o giù). Sei settimane, giocatori di football universitari: APRE meglio della periodizzazione lineare sul 1RM di panca; **ma il gruppo lineare partiva più forte** in panca. n = 23 | Moderata (n piccolo, 6 settimane, squilibrio iniziale) | Mann 2010 (JSCR; Mann, Thyfault, Ivey, Sayers) [W riassunto] + n [R] |

### 1.2 Massimale stimato (e1RM)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Errore e numero di ripetizioni | Le equazioni sono più accurate con meno di 10 ripetizioni a fatica; in equazioni lineari non conviene usarne più di 10. Test fatti a carichi che permettono 10 o più ripetizioni danno spesso previsioni povere (differenze individuali tra forza e resistenza) | Moderata | rassegne e studi citati nei riassunti [W]; Sport Sci Health 2025, s11332-024-01264-y [W] |
| Quale equazione | Lombardi: errore assoluto medio normalizzato più basso (5,8%) su 10 esercizi per gli arti inferiori, ICC 0,99; le equazioni «ripetizioni al cedimento» **sovrastimano** il 1RM del 3,4-4,1% | Moderata (uno studio) | Sport Sci Health 2025 [W riassunto] |
| Origine delle formule | Epley da una tabella di carichi di un manuale per atleti di Nebraska; Brzycki da un articolo divulgativo senza studio empirico; Mayhew su 435 studenti, panca, modello esponenziale | Convenzione | riassunto di ricerca [W] |
| Equazione tarata su dati reali | Un Epley generalizzato in cui il fattore per ripetizione dipende dal carico (303.494 serie vicine al cedimento, 388 esercizi, dati Fitbod) riduce l'incoerenza interna del 17-22% rispetto a Brzycki, Epley, Wathen e Mayhew; il guadagno va da +1% sui bilancieri pesanti a +40% su manubri e cavi leggeri. Con carichi leggeri **ogni ripetizione in più vale una frazione maggiore** del massimale che con carichi pesanti. **Preprint (2026), autore dipendente dell'azienda, unità di misura del carico non chiare nel riassunto: non adottare** | Convenzione (preprint) | Marzagao 2026, arXiv 2603.17495 / SportRxiv 768 [W riassunto] |
| Epley con RIR contro tabella RPE | La tabella RPE di Tuchscherer equivale a Epley applicato a «ripetizioni + RIR» entro 0,6 punti percentuali (5 ripetizioni: 85,7 / 81,1 / 76,9% contro 86,3 / 81,1 / 77,4% a RPE 10 / 8 / 6) | Convenzione (tabella di terzi + calcolo) | calcolatori RPE [R, terzi] + calcolo [C] |
| Ripetizioni a una data %1RM | Meta-regressione di 269 studi, 7.289 persone: sesso, età e livello influiscono poco; la panca fa 8,8 ripetizioni all'80%, la leg press 13,1; in media 14,8 ripetizioni al 70% (più della tabella storica) | Solida | Sports Med 2024;54:303-321 (PMC10933212) [R riassunto] |
| Valore di una ripetizione | Con Epley una ripetizione di scarto vale il 3,0% del carico a 3 ripetizioni, 2,9% a 5, 2,6% a 8, 2,5% a 10, 2,4% a 12; quindi **un punto di RPE vale 2,4-3,0%** del carico | Convenzione (calcolo, errore RIR ±1 ripetizione ≈ ±3%) | [C]; tabella del par. 3.4 |
| Epley e Brzycki divergono | A 10 ripetizioni coincidono (75,0%); a 5 danno 85,7 e 88,9%; a 12 danno 71,4 e 69,4%; a 15 danno 66,7 e 61,1%. Sopra 12 ripetizioni una conversione di carico tra formule non è affidabile | Convenzione (calcolo) | [C] |

### 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Perdita di velocità | Dose-risposta: massimo guadagno di forza con perdita di velocità del 20-30% della serie (altre sintesi 10-30% o 10-20%); la velocità contro la %1RM non cambia la forza massimale. Serve un sensore o la fotocamera: non applicabile a 3in senza hardware | Moderata | PMC9914552; PMC12870409; PMC9399433 [R riassunti] |
| Sostituti senza sensore | Il RIR stesso (relazione RIR-velocità, titoli sopra); la **perdita di ripetizioni** rispetto alla prima serie a carico costante come regola di stop; l'RPE per serie | Convenzione | [W titoli] + ragionamento mio [M] |
| Caduta di ripetizioni a carico costante | Con serie vicine al cedimento e pause di 1-3 minuti le ripetizioni calano da una serie all'altra; il calo è maggiore con pause brevi, tra la 1ª e la 2ª serie, e con più ripetizioni. Ordine di grandezza che ricordo: sui pesanti con 3-5 minuti 0-1 ripetizione per serie; sugli isolamenti con 60-90 secondi 2-4 ripetizioni tra la 1ª e la 3ª serie | Convenzione (intervalli: non verificati) | Conoscenza del modello (non verificata sul web) |
| Back-off e percentuale di fatica | Dopo una serie pesante (top set) le serie seguenti con un carico ridotto del 3-10% («fatigue percent»): pratica di Tuchscherer (RTS) e di altri; il repo usa già -5% (CAR-13) | Convenzione | RTS [M]; CAR-13 [R] |
| Deriva dell'RPE | A carico costante l'RPE sale da una serie all'altra (di circa 0,5-1 punto a serie nelle serie vicine al cedimento, intervallo mio): l'**RPE medio** di un esercizio non è l'RPE della serie finale | Convenzione (da verificare) | Conoscenza del modello (non verificata sul web) |
| Velocità con lo smartphone | Esistono app che stimano la velocità del bilanciere con la fotocamera e validazioni contro encoder lineari (ricordo lavori di Balsalobre-Fernández, da verificare); precisione migliore su alzate verticali con inquadratura fissa | Moderata (da verificare) | Conoscenza del modello (non verificata sul web) |

### 1.4 Progressione: regole, passi, finestre di ripetizioni

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Regola ACSM dei «2 in più» | Principianti: aumenti del 2-10% quando si fanno 1-2 ripetizioni sopra il bersaglio (testo letto per intero nella nota precedente) | Solida | ACSM 2009; ACSM 2026 [R: `ricerca-struttura-e-intensita.md`, 1.3] |
| Carichi e ripetizioni per la massa | Tutti i carichi dal 30% al 100% di 1RM vanno bene se si arriva vicino al cedimento; per la forza servono carichi alti (80% o più): la finestra di ripetizioni per la massa è quindi una scelta pratica, non un vincolo | Solida | ACSM 2026 [R] |
| Principiante | Aumento a ogni seduta finché sostenibile (2-6 mesi); StrongLifts: +2,5 kg a seduta (stacco +5 kg), **3 mancati di fila a pari peso = -10%**; Starting Strength: dopo 1-2 scarichi senza ripresa si cambia scala | Convenzione | [R: `ricerca-forza-progressione.md`, 1.4] (siti di terzi) |
| Intermedio | Progressione settimanale; Stronger By Science: tre strategie (aumento fisso a settimana, APRE, progressione da RPE): «non si progredisce ogni settimana, ma con costanza il progresso arriva» | Convenzione | SBS [R riassunto] |
| Avanzato | 5/3/1: +5 lb alla parte alta e +10 lb alla bassa a fine ciclo di 4 settimane, ultima serie AMRAP, settimana 4 di scarico | Convenzione | siti di terzi [R] |
| Doppia progressione | Si parte da un carico che permette il bersaglio più basso del range, si aggiungono ripetizioni fino alla cima, poi si sale di carico e si riparte dal fondo; è la regola più diffusa tra i coach basati sull'evidenza per gli isolamenti e le macchine (la nota sorella la trova in Helms, da riassunto di terzi; tra le app la usano Liftosaur e, a quanto ricordo, Alpha Progression e Dr. Muscle: da verificare) | Convenzione (nessun RCT noto a me su doppia contro fissa) | Helms [R riassunto terzi]; app [M] |
| Aumento relativo contro assoluto | Un passo fisso pesa in modo diverso a seconda del carico: 2,5 kg sono il 12,5% di 20 kg e l'1,8% di 140 kg. La progressione per percentuale con passo minimo dell'attrezzo evita che i principianti leggeri saltino e che gli avanzati vadano troppo in fretta | Convenzione (calcolo) | [C]; par. 3.5 |
| Dischi e microcarichi | Il calcolatore di 3in conosce dischi da 25, 20, 15, 10, 5, 2,5, 1,25 kg per lato: il passo minimo del bilanciere è **2,5 kg totali**; con dischi frazionari da 0,5 kg (rari) il passo scende a 1 kg | Convenzione | `DISCHI` in `js/ui/allenamento/seduta.js:98` [R]; dischi frazionari [M] |
| Manubri, macchine, cavi | Manubri in rack: 1 kg fino a circa 10 kg, poi 2 kg (convenzione del repo PAR-04) o 2,5 kg; pile delle macchine 4-5 kg a placchetta (talvolta con micro-placchette da 1-2,5 kg); cavi 2,5-5 kg a placchetta. A 10-30 kg un passo da 2 kg vale il 7-20% del carico: la progressione va fatta con le **ripetizioni** | Convenzione | `arrotondaPartenza` in `js/coach/carichi/partenza.js` [R]; il resto [M] |
| Corpo libero ed elastici | Regola Reddit Bodyweight Fitness: 3 serie da 5-8, a 3x8 si passa alla variante più difficile e si riparte da 3x5; oltre circa 12-20 ripetizioni conviene una variante o una zavorra. Elastici: si progredisce per colore/resistenza e tempo, non si stima il massimale (la forza dell'elastico dipende dall'allungamento) | Convenzione | [R: `ricerca-metodi-coach-pratici.md`, 2.18]; elastici [M] |

### 1.5 Stalli, mancati, pause e scarichi

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Rumore del massimale | ±1 ripetizione di errore di RIR = ±2,4-3,0% sul massimale; con un errore di equazione dell'ordine del 3-6% [W: Lombardi 5,8%] una differenza sotto circa il 3% tra due sedute non si distingue dal rumore | Convenzione (calcolo) | [C]; Sport Sci Health 2025 [W] |
| Falso allarme di «tre massimali in calo» | Se il massimale cambia solo per rumore, tre valori **strettamente decrescenti** capitano 1 volta su 6 (16,7%) a ogni valutazione; simulazione Monte Carlo (200.000 prove per caso, rumore gaussiano del 2-4% sul massimale): 16,6-16,7% con carico fermo; 10-13% con +0,5% a seduta; 6-11% con +1%; 2-6% con +2% | Convenzione (calcolo; lo script non è nel repo, si rifà in dieci righe) | [C] |
| Stima della tendenza | La pendenza robusta (Theil-Sen: mediana delle pendenze tra coppie di sedute) regge meglio dei minimi quadrati con pochi punti e un valore anomalo; con 4-6 punti e una soglia sotto il rumore non si può dire «fermo» | Convenzione | metodo statistico noto [M]; applicazione mia [C] |
| Velocità di progresso attesa | Principiante: ogni seduta o settimana per mesi; intermedio: ogni 1-4 settimane; avanzato: a blocchi. Barbell Medicine: circa 1-5% a settimana senza uscire dagli RPE bersaglio | Convenzione | [R: `ricerca-forza-progressione.md`, 1.4] |
| Pausa dall'allenamento | In allenati la forza si conserva in buona parte per circa 2-3 settimane e cala di più oltre 4; il recupero è più veloce del guadagno originale («memoria muscolare»). Ricordo meta-analisi sulla cessazione dell'allenamento (Bosquet 2013) e studi con pause di 3 settimane (Ogasawara 2013): **da verificare** | Moderata (da verificare) | Conoscenza del modello (non verificata sul web); titolo SBS sul rientro [R] |
| Scarico | Dose dal bisogno (poca, media o molta fatica); consenso Delphi tra professionisti; riduzione di volume del 40-60% con intensità invariata per 1-2 settimane è la forma «taper» (Bosquet 2007, ricordo medio-sicuro) | Moderata (da verificare) | Bell 2024 [R]; Bosquet 2007 [M, da verificare] |

## 2. Dove le fonti non concordano

**A. Il RIR migliora con l'esperienza?** A: sì (Steele 2017 [W titolo]; Zourdos 2016: gli esperti più accurati a 1RM [W]). B: no, conta la vicinanza al cedimento e il numero di ripetizioni (Halperin 2022 [W]; PubMed 37036795 su isolamenti [W]). *Adotta il coach:* errore di circa 1 ripetizione per tutti; i principianti usano l'RPE solo come **freno**, non come acceleratore, salvo le prime sedute di un esercizio (CAR-16); l'RPE oltre 4 RIR o oltre 12 ripetizioni non cambia il carico.

**B. L'autoregolazione batte la progressione fissa?** A: nessuna differenza sul 1RM in 15 studi (Sports Med Open 2021 [R]). B: APRE, RPE e velocità davanti alla %1RM (rete di confronti [R]); Mann 2010 vede un vantaggio dell'APRE ma con squilibrio iniziale e n = 23 [W]. Chi pratica: Helms, Tuchscherer e Israetel regolano su RPE/RIR; Rippetoe e StrongLifts aumentano a passi fissi per i principianti; Nuckols (SBS) offre tre strategie a seconda del livello [R]. *Adotta:* regola fissa semplice per i principianti, autoregolazione da intermedi in poi, perché **individualizza a costo zero**, senza promettere un vantaggio misurabile.

**C. Quante serie mancate prima di ridurre.** A: tre mancati di fila a pari peso = -10% (StrongLifts [R]). B: uno o due scarichi senza ripresa e poi si cambia scala (Starting Strength [R]); GZCLP cambia prima lo schema (5x3, 6x2, 10x1) [R]; il codice oggi riduce dopo il secondo mancato per tutti (CAR-07). *Adotta (ALG-13):* due per S1, tre per S2/S3, e solo dopo aver provato il gradino più economico (`PCO-01` in `ricerca-metodi-coach-pratici.md`); più rapido (-5%/-7,5% al primo mancato) solo se grave (PGR-04): ridurre il carico è la direzione prudente, ridurlo troppo spesso toglie progresso.

**D. Quanto vale un punto di RPE.** A: +4% per punto (+5% in calibrazione), tetto 10-15% (codice, citato come Helms 2018, testo non letto). B: 2,4-3,0% per punto (Epley con RIR [C]; tabella di Tuchscherer entro 0,6 punti [R]). *Adotta:* 2,5-3% per punto, tetto 6% (due punti) come AUT-01 della nota sorella. Aggiungo: con DS di 1,2-1,45 ripetizioni di errore [W] un salto del 4% per punto è dello stesso ordine del rumore: ipotesi (da confermare con un test) che due letture «serie facili» consecutive possano far oscillare il carico.

**E. Lineare per seduta oppure settimanale oltre il principiante.** A: Rippetoe: a ogni seduta finché si può; B: SBS e Barbell Medicine: non salire solo perché si può, i salti rapidi creano picchi di volume; aspettare un calo sostenuto di RPE [R]. *Adotta:* S1/S2/S3 per esercizio misurati dalla velocità reale (PGR-01 della nota sorella), non dal livello dichiarato.

**F. La media dell'RPE o la serie finale decide il carico?** Zourdos 2016 e Helms 2016 definiscono il RIR **a fine serie** [W]; il codice confronta la **media** dell'RPE di tutte le serie con un bersaglio pensato per la serie finale (par. 6, U5). *Adotta:* la serie finale (ALG-08).

**G. La calibrazione del RIR di 3in è corretta?** La nota sorella la dà come «Tenere» (CAR-14) perché coerente con Halperin 2022 (errore di circa 1 ripetizione). L'analisi delle lacune (B10) e io, leggendo `imparaDallaSeduta` (`js/coach/regole-ricerca.js:277-286`), diciamo il contrario: confronta le ripetizioni **oltre il bersaglio nella serie finale al cedimento** con l'RPE delle serie **precedenti**; la fatica accumulata fa risultare il RIR «vero» sistematicamente più basso di quello stimato, quindi `rirBias` va verso valori negativi e l'RPE dichiarato viene poi *aumentato* (`x - bias`). L'idea di calibrare è giusta (Halperin 2022), il protocollo no: lo studio di riferimento fa predire il RIR **durante la stessa serie** (PubMed 37036795 [W]). *Adotta:* ALG-09.

**H. Rampa di ritorno dopo una pausa.** A: le fonti che ricordo dicono che in 2-3 settimane la forza si conserva e si recupera in fretta (Moderata, da verificare [M]); B: il repo scende del 10-50% con un passo fisso (CAR-04, citato come SBS) e poi risale +1 passo a seduta. *Adotta:* tenere la tabella prudente di CAR-04 (la sicurezza vince) **ma** aggiungere una rampa di ritorno veloce (ALG-14), altrimenti l'utente resta sottocaricato per settimane.

## 3. Algoritmo di carico proposto

Tutto in italiano nei nomi e nei testi, un nome = un file (`npm test`). I numeri sono **default proposti** in `COACH_PARAMETRI` (`js/coach/parametri.js:10`); ogni punto dice se poggia su **evidenza** [W]/[R] o su **convenzione** [M]/[C]. Le salvaguardie (prudente, over 65, dolore, scarico, sonno scarso, freno BIA) **hanno sempre la precedenza**: non scatta nessuna accelerazione.

### 3.1 Ingressi per serie e cosa manca oggi nello storico

La voce di storico (`js/ui/allenamento/termina-e-cardio.js:106-109`) salva per esercizio solo `name, rest, sets[{reps, weight, done, wasBerserk, rpe}]`, `riscaldamento`, `extra`. Mancano i tre dati che servono a quasi tutto il resto.

| Dato per serie o per esercizio | Oggi | Proposta | Perché |
|---|---|---|---|
| `weight`, `reps`, `done` | sì | invariati | base |
| `rpe` (6-10, mezzi punti, facoltativo) | sì (`seduta.js:16`) | invariato; in più una domanda unica a fine esercizio (par. 3.7) | un tocco a fine esercizio costa meno di uno a serie; il RIR serve sulla serie finale |
| `wasBerserk` (cedimento: RIR 0 certo) | sì | usato come **dato ancorato** per e1RM e per la calibrazione | è l'unica serie con RIR vero |
| `repsTarget` (bersaglio dell'esercizio quella seduta) | **no** | aggiungere | oggi il bersaglio si ricava dalle serie non fatte: impossibile per sedute complete; serve per il cambio di bersaglio (B7/B8) |
| `fase` (carico / scarico / rientro) | **no** | aggiungere | oggi uno scarico è indistinguibile da una seduta normale: effetto su e1RM, stalli, esigenza e sul carico successivo (U15) |
| `tipo` (`coachTipo`: su, fermo, giu, scarico, nuovo) e `tecnica` | no (c'è solo sull'esercizio in corso: `regole-ricerca.js:253`) | aggiungere | per sapere se il carico era previsto o corretto a mano |
| recupero reale tra le serie | no (c'è solo `rest` previsto) | facoltativo: durata effettiva dal timer (`timer-recupero.js`) | la caduta di ripetizioni dipende dal recupero (par. 1.3) |
| compatibilità | - | le voci vecchie senza i campi valgono `fase = 'carico'`, `repsTarget = ripetizioni più frequenti` | nessuna migrazione dei dati |

### 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico)

Sostituisce `e1rmSerie`/`e1rmSeduta` (`regole-ricerca.js:86-87`) **e** `unoRM` (`seduta.js:27`): oggi esistono due implementazioni con tagli diversi. Il massimale stimato è un **indice relativo** dello stesso esercizio nel tempo (stesse formule, finestre simili), non un 1RM da mostrare come verità.

```
RIR_serie(s, esercizio):
    se s.wasBerserk                 → 0                          // cedimento: RIR noto
    se s.rpe in [6 .. 10]           → clamp(10 − s.rpe − bias(classe, reps), 0, 4)   // bias: par. 3.8
    altrimenti                      → null

reps_eff(s)   = s.reps + (RIR_serie(s) ?? RIR_assunto(esercizio))   // RIR_assunto = punto medio di rirBersaglio(nome); conf = 'stimata'
e1rm(s)       = se reps_eff ≤ 1 → s.weight
                altrimenti s.weight · (1 + reps_eff / 30)           // Epley; valida per reps_eff ≤ 12
                se 12 < reps_eff ≤ 15 → valore 'largo' (solo per mostrare, non per decidere)
                se reps_eff > 15      → null
e1rmSeduta(es) = massimo di e1rm(s) tra le serie fatte con weight ≥ 0.9 · weight_max_seduta (esclude riscaldamento e back-off)
e1rmRif(nome)  = media dei due migliori e1rmSeduta delle ultime 3 sedute di lavoro (par. 3.6) entro 42 giorni
```

- **Evidenza**: le equazioni sono affidabili sotto circa 10 ripetizioni [W]; Epley con RIR coincide con la tabella RPE entro 0,6 punti [R+C]; RIR assunto da 0 a 4 e 12 ripetizioni o meno come limite della stima [W Halperin; R].
- **Convenzione**: la media dei due migliori (rumore: par. 1.5), la finestra di 42 giorni, la soglia 0,9 per escludere il back-off, il RIR assunto quando manca l'RPE (con RIR assunto costante l'indice si riduce a «carico per ripetizioni», come oggi, ma senza il falso guadagno del 9% in 4 settimane nei blocchi con RIR che scende, PRG-38: vedi nota sorella 3.5).
- Formula in `COACH_PARAMETRI.e1rmFormula = 'epley'`: Brzycki e Lombardi sono accettabili sotto 10 ripetizioni; l'equazione del preprint Fitbod **non** si adotta (preprint, azienda, unità incerte).

### 3.3 Dal massimale al carico (`caricoDaE1rm`)

```
pct(R)                     = 1 / (1 + R / 30)                      // R = ripetizioni + RIR
caricoDaE1rm(e1, reps, rir) = e1 · pct(reps + rir)
passo                      = passoAttrezzo(nome)                   // par. 3.5
risultato                  = arrotondaAlPasso(valore, passo, modo)
    modo = 'difetto'   se la conversione supera 3 ripetizioni di scarto tra la serie origine e il bersaglio, oppure se l'RPE manca
    modo = 'vicino'    altrimenti
tetto: carico nuovo ≤ carico_lavoro · 1,10  (1,15 nelle prime 3 sedute: CAR-16); ≥ carico_lavoro · 0,70
```

Esempio verificato [C]: 80 kg × 8 a RPE 8 (RIR 2) → R = 10 → e1RM 106,7 kg (101,3 kg se si ignora il RIR: -5%). Per 5 ripetizioni a RIR 2: 106,7 · 0,811 = 86,5 kg, arrotondato al passo da 2,5 kg = **87,5 kg** (+9,4%, sotto il tetto).

### 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test)

| R = ripetizioni + RIR | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|
| Epley, % del massimale | 100 (per convenzione) | 93,8 | 90,9 | 88,2 | 85,7 | 83,3 | 78,9 | 75,0 | 71,4 | 66,7 |
| Brzycki, % del massimale | 100 | 97,2 | 94,4 | 91,7 | 88,9 | 86,1 | 80,6 | 75,0 | 69,4 | 61,1 |
| Valore di 1 ripetizione, % del carico (Epley) | - | - | 3,0 | - | 2,9 | - | 2,6 | 2,5 | 2,4 | - |

Cambi di bersaglio tipici a RIR 2 (rapporto di carico, Epley): 5 → 8 ripetizioni = 0,925 (-7,5%); 8 → 12 (RIR 1) = 0,907; 5 → 12 = **0,841 (-16%)**; 10 → 15 (RIR 1) = 0,891; 8 → 5 = 1,081 (+8%). Sopra 12 ripetizioni di R le formule divergono (Brzycki darebbe 5 → 12 = -23%): per bersagli di 13 o più ripetizioni **non si converte**, si parte dall'ultimo carico meno 10-15% e si lascia fare alla calibrazione.

### 3.5 Classi, attrezzi, passi e finestre

Classe di esercizio (tutto già nel codice: `tipoCarico` in `regole-ricerca.js:44` e `attrezzoDi` in `motore.js:28`): **pesante** (bilanciere multiarticolare), **macchina** (multiarticolari a macchina o con manubri), **isolamento**, **corpo libero**, **tempo** (isometrici). Il livello per esercizio è la scala **S1/S2/S3** di PGR-01 (nota sorella 3.8: quante delle ultime 6 volte hanno dato un aumento; 5-6 → S1, 2-4 → S2, 0-1 → S3; senza storia vale il livello del profilo).

**Passo minimo reale per attrezzo** (modificabile dall'utente in Opzioni; se manca, **si impara dallo storico**: la differenza positiva minima tra due carichi distinti usati su quell'esercizio, almeno 3 valori distinti, arrotondata a 0,25 kg):

| Attrezzo | Passo di default | Passo fine (se disponibile) | Costo del passo (% del carico) | Convenzione/evidenza |
|---|---|---|---|---|
| Bilanciere (barra 20 kg) | 2,5 kg totali (1,25 per lato: i dischi di `DISCHI`) | 1 kg (0,5 per lato) con microdischi | 12,5% a 20 kg; 6,3% a 40; 4,2% a 60; 2,5% a 100; 1,8% a 140 | [R] `DISCHI`; [C]; microdischi [M] |
| Manubri (per manubrio) | 1 kg sotto 10 kg, 2 kg da 10 kg (PAR-04) | 0,5-1 kg con dischetti, solo regolabili | 10% a 10 kg con 1 kg; 20% a 10 kg con 2 kg; 10% a 20 kg; 6,7% a 30 kg | [R] PAR-04; [C] |
| Macchine a pila e cavi | 2,5 kg (come PAR-04; 5 kg se la pila lo impone) | 1-1,25 kg con micro-placchette | 25% a 20 kg con 5 kg; 10% a 50 kg; 5% a 100 kg | [M]; [C] |
| Macchine a dischi (leg press, hack) | 5 kg totali (2,5 per lato); +10 kg se si usano dischi da 5 | 2,5 kg | piccolo ai carichi tipici | [M] |
| Corpo libero | nessun carico: ripetizioni, poi variante, poi zavorra da 1-2,5 kg | tempo e pausa | - | [R] Reddit RR; [M] |
| Elastici | nessun carico: ripetizioni, tempo, poi colore successivo | - | - | [M] |
| Isometrici (tempo) | +5 s fino a 30 s, poi +10%; tetto 45-60 s, poi variante più difficile | - | - | Convenzione [M] |

**Costo di un passo in ripetizioni**: `ripEquiv = (passo / carico) / 0,027` (1 ripetizione ≈ 2,7% del carico, Epley, tra 3 e 12 ripetizioni [C]). Esempi: 2,5 kg su 60 kg = 1,5 ripetizioni; 2,5 kg su 30 kg = 3,1; 1 kg su 8 kg (alzate laterali) = 4,6; 5 kg su 20 kg di cavo = 9,3.

**Finestra di ripetizioni** `[lo, hi]` (valori base dalla nota sorella 3.4; qui solo la regola per larghezza e ripartenza):
- larghezza = `max(3, ceil(ripEquiv) + 1)`, al massimo 6 (isolamenti con passi grossi: 12-18; calf raise e alzate laterali 12-20 [M]); pesanti 2-3;
- dopo un salto di carico di frazione `f`, il bersaglio riparte da `max(lo, hi − round(f / 0,027))`, **non** sempre da `lo`: salto del 5% → 2 ripetizioni in meno; del 12,5% → 5 (Epley, errore ±1 ripetizione) [C].

### 3.6 Il carico della seduta dopo (pseudo-codice)

```
caricoProssimoAlg(nome, base, repsTarget, setsBase):
    // 0. casi speciali, invariati rispetto a oggi
    se isTimeBased(nome)         → ramo tempo (par. 3.10)
    se corpo libero (peso 0)     → ramo corpo libero (par. 3.10)
    cls    = classe(nome);  passo = passoAttrezzo(nome);  [lo, hi] = finestra(nome, obiettivo, passo)
    scala  = scalaProgressione(nome)                        // S1 | S2 | S3 (PGR-01)
    P      = sedutePerLavoro(nome, 6)     // escluse: interrotte, fase 'scarico', prima seduta dopo un rientro; solo stessa «classe di ripetizioni»
                                           // (stesso repsTarget ±1); le altre alimentano solo e1rmRif
    se non esiste alcuna storia          → ramo «nuovo» (PAR-01..05, INT-04), invariato

    // 1. ricalcolo dal massimale
    L = P[0] oppure ultima seduta qualsiasi se P è vuota
    se |L.repsTarget − repsTarget| ≥ 2 oppure P è vuota   → cambioBersaglio()     // par. 3.8
    se giorniDa(ultima seduta con questo esercizio) ≥ soglia → rientro()          // par. 3.9

    // 2. scarico
    se fase == 'scarico':
         Wrif = caricoLavoro(ultima seduta con fase ≠ 'scarico')                   // non la precedente seduta di scarico (U15)
         ritorna { carico: arrotondaAlPasso(Wrif · dose.carico, passo, 'vicino'), serie: base · dose.serie, RIR + 2 }

    // 3. giudizio dell'ultima seduta di lavoro
    W      = caricoLavoro(L)             // il carico più frequente tra le serie fatte (a parità, il più alto): NON il massimo
    esito  = giudica(L, W, repsTarget, tolleranza)
              //  'ok'     tutte le serie fatte a ≥ W con ripetizioni ≥ repsTarget (l'ultima serie: ≥ repsTarget − tolleranza)
              //  'lieve'  tutte fatte, una serie sotto di 1 ripetizione, oppure solo l'ultima sotto
              //  'grave'  più serie sotto, o una sotto di 2+ ripetizioni, o serie non fatte (≥ 40%)
              //  'saltato' nessuna serie fatta
    rirU   = RIR dell'ultima serie di lavoro registrato (rpe o cedimento), null se manca            // ALG-08
    seg    = se rirU = null → 'neutro'; se rirU ≥ rirBers.max + 1,5 → 'facile'; se rirU ≤ rirBers.min − 1 → 'duro'; altrimenti 'giusto'

    // 4. decisione
    caso esito == 'ok':
        se salvaguardia attiva (prudente, over 65, sonno scarso, freno BIA)          → W (o W + passo/2), nota
        se seg == 'duro'                                                              → W («consolida»)
        se scala == S1 e cls ≠ 'isolamento' e passo/W ≤ 5%:                            // principiante su pesante
             W' = W + max(passo, arrotonda(W · pctScala[cls]))                         // 2,5-5%, tetto della classe (nota sorella 3.1)
        altrimenti:                                                                    // doppia progressione per tutto il resto
             m = minimo delle ripetizioni delle serie di lavoro
             se m ≥ hi:  W' = W + passoScala;  repsNuove = max(lo, hi − round(frazione(W→W') / 0,027))
             altrimenti: W' = W;               repsNuove = min(hi, m + 1)
        se seg == 'facile' e non principiante (o calibrazione CAR-16):
             Wsalto = caricoDaE1rm(e1rmRif, repsNuove, rirBers.medio)                  // 2,5-3% per punto, tetto 6%
             W' = max(W', Wsalto)
        se scala ≥ S2 e giorniDa(ultimo aumento) < (S2: 7, S3: 21)                     → W' = W   (intervallo minimo)
    caso esito == 'lieve':   W, +45 s di pausa (RIC-02), conta come «mancato lieve»
    caso esito == 'grave':   W · (1 − 5%) (principiante) | W · (1 − 7,5%) (altri), subito (PGR-04)
    caso 'saltato':          W invariato

    // 5. contatori e scala di stallo
    mancati di fila a pari carico: S1 → alla seconda volta; S2/S3 → alla terza volta:     // ALG-13
         gradino successivo della scala degli stalli (PCO-01: schema, poi -5/-10%)
    se trendE1rm(nome) == 'stallo'   → gradino della scala (par. 3.11)
    se trendE1rm(nome) == 'calo'     → scarico mirato sull'esercizio (CAR-08 sostituito)

    arrotonda W' con arrotondaAlPasso(.., passo, 'vicino')                                // mai 0,5 kg per tutti (B17)
```

**Evidenza contro convenzione, in una riga**: [evidenza] RIR e RPE con errore di circa 1 ripetizione [W]; e1RM con RIR [W+R+C]; regola ACSM 2-10% [R]; carichi 30-100% per la massa [R]; APRE come tipo di correzione [W]. [convenzione] tutte le soglie numeriche (S1/S2/S3, intervalli minimi 7/21 giorni, larghezze di finestra, tolleranza, 2 contro 3 mancati, tetti 10/15%).

### 3.7 Dentro la seduta (serie dopo serie)

Tutto **opzionale e come suggerimento** (un tocco per accettare), mai silenzioso; non per principianti, prudenti, over 65, scarico (nell'evidenza non c'è un vantaggio dimostrato dell'autoregolazione sul 1RM: par. 2B).

1. **Correzione tipo APRE dopo la prima serie di lavoro** (Mann 2010 [W]: la tabella corregge il carico della serie successiva dalle ripetizioni della serie precedente). Se la prima serie ha ripetizioni ≥ bersaglio + 2 e RPE ≤ bersaglio − 1,5 → suggerisce `+1 passo` per le serie dopo; se ripetizioni ≤ bersaglio − 2 (o RPE 10 con ripetizioni sotto il bersaglio) → suggerisce `-ceil(scarto · 2,7%)` arrotondato al passo. *Convenzione.*
2. **Back-off** (CAR-13: -5%): confermato; con RPE della top set ≥ 9,5 → -7,5/-10% [M, RTS]. Il carico di lavoro dell'esercizio resta quello della **top set**.
3. **Perdita di ripetizioni come regola di stop** (sostituto della perdita di velocità [R]): solo sui pesanti e come suggerimento: se la serie k ha almeno il 25-30% di ripetizioni in meno della 1ª a carico costante, «puoi fermarti: le serie seguenti non aggiungono stimolo utile». *Convenzione* (la soglia viene dalla perdita di velocità del 20-30% [R], la traduzione in ripetizioni non è validata).
4. **Domanda unica a fine esercizio** (invece dell'RPE su ogni serie): «Sull'ultima serie quante ripetizioni avevi ancora? 0-1 / 2-3 / 4 o più» (descrittori di ripetizioni in riserva: Hackett 2012 [W]). Mappa su RPE 9,5 / 7,5 / 6 (per lo storico). Un tocco; è il dato che serve (par. 2F).
5. **Profilo di caduta personale** (ALG-11): per ogni esercizio e classe il coach impara la mediana di `reps_k / reps_1` sulle serie vicine al cedimento (RPE della serie finale ≥ 9) e la usa per **non chiamare «mancato»** una caduta normale: oggi `esito` (`progressivo.js:37`) esige che *ogni* serie raggiunga il bersaglio, mentre con RIR 0-1 sulla serie finale la caduta è inevitabile (par. 6, A6). Default finché non c'è storia: tolleranza di 1 ripetizione sull'ultima serie per macchina e isolamento, 0 per pesante.

### 3.8 Cambio di bersaglio di ripetizioni (`cambioBersaglio`)

Casi oggi senza ricalcolo (B7, B8): giorno con bersaglio diverso per lo stesso esercizio (UL + FB, PHUL), `alteRip` (CAR-11), tecnica piramide a 20 ripetizioni, passaggio forza ↔ ipertrofia (CIC-02), 5x3 del principiante.

```
cambioBersaglio(nome, repsTarget):
    e1 = e1rmRif(nome)                                       // anche da sedute con altro bersaglio, escluse scarico e rientro
    se repsTarget + rirBers > 12:  W' = Wlavoro · (1 − 0,10 … 0,15), modo 'difetto', nota «prima volta con più ripetizioni: calibro»
    altrimenti:                    W' = caricoDaE1rm(e1, repsTarget, rirBers.medio)   // par. 3.3, con i tetti
    Wlavoro rimane la base del tetto; per la **prima** seduta con il nuovo bersaglio: RIR bersaglio + 1 (come INT-04)
```
Esempio [C]: 100 kg × 5 a RIR 2 → e1RM 123,3 kg; per 12 ripetizioni a RIR 2: **84,1 kg (-16%)**. La regola attuale CAR-11 (`dolore-mattina.js:69`) mette ≥ 12 ripetizioni con solo ×0,9 = 90 kg: da quel carico il cedimento arriva a circa 11 ripetizioni, quindi 12 a RIR 2 è **impossibile**.

### 3.9 Seduta o pausa saltata

- **Una seduta saltata o una settimana senza quell'esercizio** (fino a 9 giorni): nessun taglio; nessuna serie in più per «recuperare» (principio in `ricerca-psicologia-aderenza.md`, 3.1).
- **Da 10 giorni**: la tabella CAR-04/RIC-05 resta (10-20 giorni -10%, ≤ 28 -20%, ≤ 90 -30%, oltre -50%; over 65 giorni ×2; serie -25%): è più prudente di ciò che ricordo dalla letteratura sulla pausa in allenati (par. 1.5, da verificare), e la sicurezza vince.
- **Rampa di ritorno** (nuova, ALG-14): il carico prima della pausa `Wpre` si salva (campo `rampa` negli aggiusti dell'esercizio, 3 sedute). Dopo la prima seduta di rientro riuscita (`ok`): `W' = min(Wpre, W · 1,05)` (principiante o over 65: `1,025`), poi di nuovo la scala normale. *Convenzione*: serve a non restare sottocaricati per settimane con +2,5 kg a seduta; la «memoria muscolare» è un'idea con base da verificare [M].
- La prima seduta dopo la pausa: RIR bersaglio +1 (già: «3 ripetizioni in riserva» in CAR-04).

### 3.10 Corpo libero, elastici, cavi, tempo

- **Corpo libero** (oggi CAR-05: +1 ripetizione senza limite): finestra `[lo, hi]` con `hi` = 15 (massa/salute) o 12 (forza); al raggiungimento di `hi` su tutte le serie → **variante più difficile** (STA-02) e riparti da `lo`; se non esiste, pausa o tempo lento; o zavorra 1-2,5 kg dove ha senso. È PGR-03 della nota sorella: stessa regola.
- **Elastici**: nessun e1RM; progressione per ripetizioni nella finestra, poi tempo (discesa di 3-4 s), poi colore successivo; restare sul colore se la tecnica cede [M].
- **Cavi e macchine a pila**: doppia progressione con finestra larga (`ripEquiv` grande); il passo si impara dallo storico (par. 3.5).
- **Tempo** (plank ecc.; oggi +5 s illimitato, CAR-01): +5 s fino a 30 s, poi +10%; a 45-60 s variante più difficile [M].
- **Unilaterali**: il carico è per lato e si aumenta quando **entrambi** i lati completano; il lato debole decide [M].

### 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni

```
trendE1rm(nome):
    S = ultime 6 sedute di lavoro (fase 'carico', stessa classe di ripetizioni, escluse prima del rientro e scarichi)   // minimo 4
    se |S| < 4 o durata < 21 giorni → null
    y_i = e1rmSeduta(S_i) con reps_eff ≤ 10 ;  t_i = giorno della seduta
    pendenza = mediana di (y_j − y_i)/(t_j − t_i) per tutte le coppie i<j      // Theil-Sen; in % del valore mediano a settimana
    rumore   = max(3%, MAD(y) / mediana(y))
    se pendenza ≤ −1,0%/sett  e  ultimo y < 0,97 · max(ultimi 4 y)  e  |pendenza · durata| > rumore    → 'calo'
    se pendenza ≤ +0,25%/sett e  durata ≥ 21 giorni (e ≥ 4 sedute)                                      → 'stallo'
    altrimenti 'in salita'
```
Vettori di prova [C] (giorni 0, 4, 8, 12, 17, 21): e1RM 100; 101,5; 100,5; 101; 100; 101 → **0,0%/sett: stallo**. 100; 103; 104,5; 107; 108,5; 111 → +3,3%/sett: in salita. 104; 103; 100; 101; 98; 97 → -2,3%/sett (e -6,9% in 3 settimane, sopra il rumore del 3%): calo.

Perché sostituire CAR-08 («tre massimali strettamente in calo»): con solo rumore scatta 1 volta su 6 a ogni valutazione [C], e il ramo di CAR-08 si raggiunge solo dopo un «mancato» singolo (`regole-ricerca.js:222-229`), cioè in sedute in cui il massimale è già basso: la frequenza reale è più bassa ma **non misurata**; in più `e1rmSerie` ignora il RIR e le sedute di scarico non sono escluse (B11).

**Cosa fa il coach allo stallo** (ordine dal più economico al più costoso, stessa scala di `ricerca-metodi-coach-pratici.md` 5.1 e PCO-01): 0 controlla prontezza e sonno; 1 stesso carico e più ripetizioni (+45 s di pausa); 2 passi più piccoli (microcarico o ripetizioni); 3 cambia schema a pari carico (3x10 → 3x8 → 3x6); 4 -5/-10%; 5 scarico mirato; 6 più serie solo se si recupera bene; 7 variante. **Lo stallo da tendenza decide il gradino (2 o 3), il calo decide il 5**, e l'intera scala vale solo per chi non è prudente, over 65 o con dolore (lì solo i gradini 0, 1 e 4).

### 3.12 Scarico e ripresa

Dose invariata (`DOSE_SCARICO`, `regole-ricerca.js:81`: volume -35/-50/-70%, carico ×0,95/0,9). **Cambia la base di calcolo**: il carico dello scarico è `Wrif · dose.carico` con `Wrif` = carico di lavoro dell'ultima seduta **non** di scarico (dato `fase`, par. 3.1); non si compone più su un'altra seduta di scarico della stessa settimana. **Dopo lo scarico** la prima seduta normale riparte da `Wrif` (non da `Wscarico + passo`); se il segnale è «facile», +1 passo. Durante lo scarico non si aggiornano e1RM di riferimento, tendenza, stalli, esigenza (ESI) e conteggi di mancati (B11). Evidenza: la dose viene dal consenso Bell 2024 [R]; la forma «taper» (volume -40/-60%, intensità invariata) ha supporto da verificare [M]; per **gli scarichi reattivi** (DEC-06, PRZ-04, CAR-10) valgono gli stessi `Wrif`.

### 3.13 Calibrazione del RIR corretta (`rirBias`)

Protocollo «predici e poi cedi sulla **stessa serie**» (è quello degli studi [W PubMed 37036795]): una volta per blocco, sull'ultima serie di **un** isolamento a macchina o cavo (stabile, mai bilanciere), a circa 3 ripetizioni dal bersaglio compare «Quante pensi di averne ancora?» (0 / 1 / 2 / 3 / 4+): poi la serie continua al cedimento e `errore = ripetizioni dopo la domanda − risposta` (positivo = sottostima, ha più riserva di quanto crede). `rirBias[classe] = 0,7 · vecchio + 0,3 · errore`, tra -1,5 e +2; classi: pesante, macchina, isolamento (la precisione dipende dal carico e dalle ripetizioni [W]). Si applica solo con RPE ≥ 7 (RIR ≤ 3) e fino a 12 ripetizioni; con RPE ≤ 6 il RIR non si usa (oltre 4 RIR l'errore cresce [R]). **Salvaguardie**: mai principianti nelle prime 2 settimane, over 65, PAR-Q positivo, dolore attivo, scarico; esercizi instabili solo con almeno 1 RIR (BIO-03), quindi mai al cedimento.

### 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test

| Parametro | Default | Origine | Nota |
|---|---|---|---|
| `e1rmFormula` | `epley` | [W+R] | Brzycki/Lombardi alternativi sotto 10 ripetizioni |
| `e1rmRepsMax` (decisioni / mostrare) | 12 / 15 | [W] | più alto = rumore |
| `rumoreE1rmPct` | 3 | [C] | ±1 ripetizione RIR |
| `scambioRipPct` | 2,7 | [C] | 1 ripetizione ≈ 2,7% (2,4-3,0) |
| `tettoSaltoPct` / `tettoSaltoCalibrazionePct` | 6 (RPE) · 10 totale | [C]/[R] | AUT-01; CAR-16 15% solo prime 3 sedute |
| `tettoCambioBersaglioPct` | +10 / -30 | convenzione | |
| `intervalloAumentoGiorni` | S1: 0 · S2: 7 · S3: 21 | convenzione [R] | PGR-01 |
| `mancatiPerRiduzione` | S1: 2 · S2/S3: 3 | convenzione, **Contrastata** | par. 2C |
| `riduzioneMancatoGravePct` | 5 (principiante) · 7,5 (altri) | convenzione [R] | PGR-04 |
| `trendFinestra` / `trendMinSedute` / `trendMinGiorni` | 6 / 4 / 21 | convenzione | |
| `trendSogliaStalloPctSett` / `trendSogliaCaloPctSett` | +0,25 / -1,0 | convenzione | |
| `ripresaRampaPct` | +5 (+2,5 principiante/over 65) | convenzione | par. 3.9 |
| `cadutaTolleranzaDefault` | 1 (macchina, isolamento) · 0 (pesante) | convenzione | par. 3.7 |
| `stopPerditaRipPct` | 25-30 | convenzione | solo suggerimento, solo pesanti |

Vettori di prova (da copiare in `tests/browser/regole-nuove.js`) [C]: (1) `e1rmStima({weight:80,reps:8,rpe:8})` = 106,7; con `rpe` assente e RIR assunto 2: 106,7; con `wasBerserk`: 101,3. (2) `caricoDaE1rm(106,7, 5, 2)` = 86,5 → 87,5 con passo 2,5. (3) 100 × 5 a RIR 2 → bersaglio 12 a RIR 2 = 84,1 kg (non 90). (4) Stesso esercizio due volte nella settimana di scarico con carico di lavoro 100 kg, `dose.carico` 0,9: prima seduta 90 kg, **seconda seduta 90 kg** (oggi 81). (5) Tendenza: i tre vettori di 3.11. (6) Passo: carichi usati 60, 62,5, 65 → passo appreso 2,5; carichi 8, 9, 10 (manubri) → 1.

## 4. Confronto con le app

Per le app **non ho potuto fare ricerche** (tetto esaurito): le righe sono **Conoscenza del modello (non verificata sul web)**, tranne dove indicato; quando una caratteristica viene da materiale commerciale lo scrivo «dichiarato dall'azienda». Forza di tutta la tabella: **Convenzione** (nessuna prova indipendente), salvo le righe [W]/[R]. Le persone e le aziende citate sono quelle indicate nella consegna.

| App | Cosa fa meglio | Cosa fa male | Idea da rubare per 3in | Forza dell'informazione |
|---|---|---|---|---|
| **Dr. Muscle** (Carl Juneau) | Raccomandazione di peso e ripetizioni a ogni seduta con stili di serie (normali, back-off, rest-pause...), sedute leggere e scarichi automatici dopo stallo; dichiarato dall'azienda come «motore adattivo» | Scatola nera: poco spiegato perché quel peso; costo; i reclami che ricordo riguardano pesi troppo prudenti o aggressivi (non verificati) | Lo **scarico mirato per esercizio** (3in lo ha già: CAR-08) e la **seduta leggera dopo un mancato**; mostrare sempre il perché (par. 5) | Convenzione; algoritmo esatto: da verificare (domanda aperta 1) |
| **RP Hypertrophy App** (Renaissance Periodization) | Volume per muscolo regolato dal feedback dopo la seduta (dolenzia, pump, prestazione), RIR che scende nel mesociclo, scarico a fine blocco; dichiarato dall'azienda | Costo; segue il modello MV/MEV/MAV/MRV, che è **euristico** (`fonti.md`); sui carichi, a quanto ricordo, lascia più libertà all'utente (da verificare) | Il **feedback per muscolo** (PCO-03 lo propone); RIR per settimana come bersaglio del carico | Convenzione; da verificare |
| **Juggernaut AI** (Chad Wesley Smith) | Onde di ripetizioni (10, 8, 5, 3) con serie AMRAP: le ripetizioni fatte aggiornano il massimale di allenamento della onda successiva | Orientato al powerlifting; a pagamento; poco adatto a chi cerca ipertrofia | Il **massimale di riferimento aggiornato dagli AMRAP** (3in lo fa a pezzi in CAR-06); `e1rmRif` come stato per esercizio | Convenzione; da verificare |
| **Fitbod** | Piani generati su attrezzatura, storico e recupero muscolare; azienda con grande base di dati (preprint 2026 su 37,7 milioni di serie loggate da circa 66.000 utenti e 505 esercizi [W]); dichiarato: personalizzazione dei pesi | Reclami ricorrenti che ricordo: pesi consigliati lontani dalla realtà, esercizi che cambiano troppo, progressione poco leggibile (non verificati) | Usare i **dati reali** per tarare i coefficienti (PAR-02, e1RM): in 3in servirebbe un export anonimo con consenso, non adesso | Preprint [W] (azienda, non rivisto); resto da verificare |
| **Strong** | Registro rapidissimo, colonna «precedente» in ogni riga, timer, record personali, calcolo dischi (da verificare per versione) | Nessun suggerimento di progressione; modello a pagamento per le funzioni avanzate | Nulla da aggiungere: 3in ha «Ultima volta» (`seduta.js:18`), timer, dischi, record; **tenere il numero di tocchi basso** | Convenzione |
| **Hevy** | Registro + componente sociale, tipi di record (peso, ripetizioni, stimato; da verificare), statistiche per gruppo muscolare | Poco motore di progressione; molte funzioni sociali non servono a 3in | **Serie settimanali per muscolo** (conteggio frazionario) come grafico: 3in ha `DETTAGLI`/`MUSCOLI` ma non lo mostra | Convenzione; da verificare |
| **JEFIT** | Archivio molto ampio di esercizi con illustrazioni, programmi di comunità, misure del corpo | Interfaccia densa, pubblicità e livelli a pagamento (da verificare) | Nulla di nuovo: 3in ha libreria e illustrazioni | Convenzione |
| **Liftosaur** (open source) | Programmi come testo con **regole di progressione dichiarate** per esercizio (lineare, doppia, somma delle ripetizioni, script liberi), supporto RPE, impostazioni di attrezzatura con arrotondamenti reali dei pesi | Richiede di imparare un linguaggio di script; poco adatto a chi vuole «dimmi cosa fare» | **Tipo di progressione per esercizio dichiarato e visibile** (S1/S2/S3 con una frase) e **passo per attrezzo** (par. 3.5); il codice dei suoi esempi è la fonte da leggere (domanda aperta 2) | Convenzione; ricordo con buona sicurezza i tipi lineare/doppia/somma; sintassi esatta non ricordata |
| **Boostcamp** | Libreria di programmi di allenatori noti, pesi calcolati dai massimali inseriti, timer | Progressione per lo più fissa (percentuali, nessuna lettura dello sforzo, da verificare) | **Spiegazione del programma** in due righe e percentuali dal `e1rmRif` | Convenzione; da verificare |
| **Stronger By Science** (articoli, non un'app) | Tre strategie esplicite per salire di settimana in settimana: aumento fisso, APRE, progressione da RPE [R riassunto]; articoli sull'accuratezza del RIR | I calcolatori che ricordo sono semplici; non ho visto le pagine | Dare all'utente la **strategia in parole** («salgo ogni settimana di 2,5 kg se...») | [R] riassunto (livello 2) |
| **Strength Level** | Standard di forza per percentili da dati **autodichiarati** (5/20/50/80/95%) [R: `ricerca-forza-progressione.md`, 1.5] | Dati senza controllo, età base 25-40 anni | Usarli solo come controllo (STD-01), non per prescrivere | [R] terzi, livello 3 |
| **Alpha Progression** | Dichiarato: suggerimenti di progressione dal RIR e dalla doppia progressione, periodizzazione, analisi del volume per muscolo | Non so (da verificare) | **Bersaglio «ripetizioni + RIR»** per serie e suggerimento dopo ogni serie (par. 3.7) | Dichiarato dall'azienda; da verificare |
| **Gymshark, Freeletics, Whoop** (coach IA, categoria) | Percorsi guidati, a corpo libero (Freeletics); Whoop lega allenamento e recupero con i dati del braccialetto | Piani poco personalizzabili sul carico; non conosco i dettagli | Nessuna idea sicura | Da verificare |
| **Trainerize, TrueCoach, TrainHeroic** (strumenti per coach) | L'umano nel ciclo: il coach assegna carichi, risponde, controlla i check-in; messaggi | Il carico lo decide la persona: nessun motore | **Check-in settimanale** di una domanda e note del coach; esportare la seduta | Convenzione; da verificare |

## 5. Funzioni che gli utenti amano e odiano

Origine: **Conoscenza del modello (non verificata sul web)**, da recensioni e discussioni che ricordo in modo generico; nessuna citazione di persone, nessuna percentuale. Da verificare con le query dell'appendice A (voci 28-34). Colonna «3in oggi» letta nel codice.

### 5.1 Funzioni molto apprezzate

| Funzione | Perché piace | 3in oggi | Azione proposta |
|---|---|---|---|
| Colonna «precedente» in ogni serie | Si sa subito cosa battere | Sì: `ultimaVoltaTesto` (`seduta.js:18`) | Aggiungere accanto il **bersaglio del giorno** e il motivo |
| Registro con pochi tocchi (pesi e ripetizioni precompilati, timer che parte alla spunta) | La seduta non rallenta | Sì (timer ad anello, `timer-recupero.js`; riempie dal coach) | Non aggiungere domande per serie: una sola a fine esercizio (par. 3.7) |
| Record personali con tipi diversi (peso, ripetizioni a quel peso, stimato) | Più occasioni di festeggiare senza falsi positivi | Parziale: solo massimale stimato, senza RIR, due implementazioni (`controllaRecord`, `seduta.js:44`) | ALG-17 |
| Calcolo dischi | Evita errori e conti a mente | Sì (`dischiPerLato`, `seduta.js:101`); con un carico non caricabile mostra solo «restano X kg per lato» (per 104 kg: 0,75 kg), cioè lo segnala **dopo** che il coach l'ha proposto | Passo reale nel generatore (ALG-06): il coach non propone più 104 kg |
| Generatore di riscaldamento | Una serie di avvicinamento senza pensarci | Parziale: 3 tocchi manuali (`addWarmup`, 50/70/85%) | Rampa automatica scalata sul carico (pochi o niente su macchine e isolamenti); a bassa priorità |
| Avviso di scarico spiegato | L'utente capisce perché alleggerisce | Parziale: nota «Settimana di scarico...» | Una frase con il dato («il massimale stimato scende da 3 sedute») |
| Scambio esercizio / macchinario occupato | Evita di bloccare la seduta | Sì (`macchinario-occupato.js`) | Il carico del sostituto parte da e1RM dell'esercizio origine (ALG-05) |
| Spiegazione del programma e del carico | Fiducia | Parziale: `coachNote` con motivo | «Perché questo peso» con il numero (ALG-16) |
| Volume per muscolo (grafico) | Capire se manca qualcosa | No | Fuori da questa nota (area volume), ma serve il conteggio frazionario |
| Importazione ed esportazione dati | Nessun blocco in un'app | Importazione sì (`importa-csv.js`, `importa-progressi.js`); esportazione: da verificare | Nessuna |
| Funzionamento offline | Palestre senza campo | Sì (PWA) | Nessuna |

### 5.2 Funzioni odiate o fonte di reclami

| Cosa dispiace | Perché capita | 3in oggi | Come evitarlo |
|---|---|---|---|
| Pesi consigliati assurdi o non caricabili | Arrotondamento generico, nessuna impostazione dell'attrezzatura | Sì, il difetto c'è: passo 0,5 kg per tutti (B17); l'esempio è 100 kg + 4% = 104 kg con dischi da 1,25 kg per lato | ALG-06 |
| Aumenti troppo grandi sui carichi bassi | Passo fisso | Sì: +5 kg di gambe e +2,5 kg di parte alta a ogni seduta | PGR-01/02 + ALG-07 |
| Obbligo di inserire lo sforzo su ogni serie | Attrito | Facoltativo (nessun obbligo) | Una domanda a fine esercizio |
| Suggerimenti senza spiegazione («scatola nera») | Poca fiducia | `coachNote` presente | ALG-16 |
| Paywall sulle funzioni base e pubblicità | Modello di business | n.a. | Nessuna |
| Notifiche e serie di giorni che fanno sentire in colpa | Gamification aggressiva | Trattato in `ricerca-psicologia-aderenza.md` | Vedere quella nota |
| Impossibilità di annullare una decisione dell'app | Rigidità | «Ripristina» esiste (cap. 10) | Mantenere |
| Piani generati senza progressione («stesso peso ogni settimana») | Testo generato una volta | Motore presente, con i difetti del par. 6 | ALG-02..07 |

### 5.3 Reclami sui piani generati da IA e come si evitano

Origine: conoscenza generale dei difetti noti dei piani prodotti da modelli di linguaggio, **non verificati sul web**; la letteratura sulla qualità di piani di allenamento generati da IA non l'ho potuta cercare (appendice A, voce 33).

| Reclamo | Perché succede | 3in oggi | Cosa manca |
|---|---|---|---|
| Volume «spazzatura» (30 e più serie per seduta, 5 esercizi per lo stesso muscolo) | Il modello elenca esercizi senza budget di serie | Tetto di 11 serie per muscolo per seduta (PRG-30), ridondanza (ABB-02) | Volume per muscolo corretto (analisi lacune §1: petto 8, polpacci 2 serie a settimana) |
| Nessuna progressione tra le settimane | Testo statico | Motore di carico (par. 6) | Difetti ALG-01..07 |
| Scelta strana degli esercizi (macchine non disponibili, esercizi esotici, rischiosi per un'articolazione dolente) | Nessun vincolo di attrezzatura e sicurezza | Ricette per slot, `consentito` (`motore.js:45`), 140 esercizi fissi | Attributi per esercizio (lacune §3) |
| Tempi sbagliati («45 minuti» che sono 90) | Nessun modello di tempo | Modello di tempo (`ricette.js:337`) | Sedute sottoriempite e superserie contate male (B1, B5) |
| Pesi e ripetizioni incoerenti con il livello | Nessuna misura dell'utente | Carico di partenza stimato (PAR) | e1RM con RIR (ALG-04) |
| Nessun adattamento al dolore e al recupero | Conversazione senza memoria | Dolore, prontezza, scarico reattivo | Tarare le soglie (B9) |
| Nomi di esercizi inventati | Allucinazione | Libreria chiusa | Nessuna: tenere chiusa |
| Tono eccessivo o promesse | Stile del modello | Messaggi scritti a mano | Nessuna |

## 6. Audit del motore attuale

Letto il 2026-10-05: `js/coach/regole-ricerca.js`, `js/coach/carichi/{progressivo,partenza}.js`, `js/coach/{dolore-mattina,regole-nuove,intensita}.js`, `js/ui/allenamento/{seduta,termina-e-cardio}.js`. **Non ho eseguito prove sul motore** (non si toccava il codice): dove scrivo «da confermare con un test» è un ragionamento sul codice. Esito: **Giusto** (da tenere), **Non supportato** (da cambiare, con la regola che lo fa), **Manca**.

| # | Voce (file:riga) | Cosa fa oggi | Giudizio | Confronto, evidenza e bug dell'analisi lacune | Regola |
|---|---|---|---|---|---|
| A1 | CAR-06 isolamenti, doppia progressione (`regole-ricerca.js:182-190`) | +1 ripetizione fino a bersaglio +3, poi +passo e riparte dal bersaglio | Giusto | Coerente con la pratica (par. 1.4); manca solo la ripartenza dal punto giusto dopo un salto (par. 3.5) | ALG-07 |
| A2 | Micro-incrementi (`:191-201`) | Se il passo supera il 5%: prima ripetizioni fino a bersaglio +2, poi il passo | Giusto, con tetto corto | Passo 2 kg su 10-20 kg vale 10-20%: serve finestra più larga (par. 3.5) | ALG-07 |
| A3 | CAR-16/17 calibrazione delle prime 3 sedute (`:129`, `:205-212`) | Salto più veloce se facile; -5% subito se molto sotto | Giusto | Coerente con INT-04 e con l'errore di RIR [W]; `test` esistenti in `tests/browser/carichi-evoluzione.js` | - |
| A4 | CAR-04 rientro (`:97-104`, `:137-144`) | -10/-20/-30/-50% per giorni di pausa | Giusto ma incompleto | Prudente [par. 2H]; **manca** la rampa di ritorno: dopo il rientro si risale di +1 passo a seduta | ALG-14 |
| A5 | Dose di scarico (`:71-81`) | Volume -35/-50/-70%, carico ×0,95/0,9 dalla fatica | Giusto (Bell 2024 [R]) | Vedi U15 sulla **base di calcolo** | ALG-03 |
| A6 | `esito` (`progressivo.js:37-43`) | «ok» solo se **tutte** le serie hanno ≥ ripetizioni bersaglio | Giusto per schemi a ripetizioni fisse; **in conflitto** con RIR 0-1 sulla serie finale | Con RIR bersaglio 0-1 (isolamenti) la caduta tra serie è inevitabile (par. 1.3): sessioni normali diventano «mancato» | ALG-11 |
| A7 | Calcolo dischi (`seduta.js:98-106`) | Dischi 25...1,25 kg, passo 2,5 kg totali | Giusto | Il generatore non lo rispetta (U7) | ALG-06 |
| U1 | RPE: +4% per punto, tetto 10% (`regole-ricerca.js:165-170`) | `pct = min(0,1, -delta · 0,04)` (0,05/0,15 in calibrazione) | Non supportato | Epley con RIR: 2,4-3,0% per punto [C]; con DS di 1,2-1,45 ripetizioni [W] il +4% insegue il rumore | AUT-01 (nota sorella) |
| U2 | CAR-11 `alteRip` (`dolore-mattina.js:69`) | ≥ 12 ripetizioni con **solo ×0,9** | Non supportato (B7) | 5 → 12 ripetizioni a RIR 2 richiede ×0,84; col ×0,9 il cedimento è a circa 11 ripetizioni [C] | ALG-05 |
| U3 | CAR-08 scarico mirato (`regole-ricerca.js:222-229`) | Tre massimali **strettamente** in calo | Non supportato | 1 su 6 con solo rumore [C]; `e1rmSerie` ignora il RIR; non esclude gli scarichi (B11) | ALG-12 |
| U4 | Calibrazione del RIR (`:272-290`, ma anche `:157-158`) | Confronta ripetizioni oltre bersaglio nella serie al cedimento con l'RPE delle serie **precedenti** | Non supportato (B10) | Bias sistematico per fatica; la nota sorella la dà «Tenere»: **disaccordo** (par. 2G) | ALG-09 |
| U5 | Segnale di sforzo (`:158-164`) | Media dell'RPE di tutte le serie contro il bersaglio `10 − media(RIR)` | Da decidere | Il RIR bersaglio vale a fine serie [W]; con 3 serie a 7,5/8,5/9,5 la media (8,5) supera la soglia «facile» di isolamenti (9,5 − 1) | ALG-08 |
| U6 | CAR-07, due mancati = -10% (`:213-221`) | Per tutti, anche chi sale una volta a settimana | Non supportato / Contrastata | StrongLifts 3 mancati; SS cambia scala [R]; gravità non distinta | ALG-13, PGR-04 |
| U7 | Arrotondamento 0,5 kg (`progressivo.js:16`, usato in `:122`, `:134`, `:167`...) | Un solo passo per tutti gli attrezzi | Non supportato (B17) | Il coach può proporre 104 kg con dischi da 1,25 kg per lato (non caricabili: restano 0,75 kg per lato), manubri da 21,5 kg che non esistono, carichi di pila che non sono multipli del passo | ALG-06 |
| U8 | `incrementoPer` (`progressivo.js:18-24`) | +5/+2,5/+2,5/+1 kg per classe, uguali a ogni livello e carico | Non supportato | A 50 kg di squat +5 kg è 10% a seduta; a 150 kg è 3,3% (nota sorella 4) | PGR-01 |
| U9 | Un solo motore per tutti i livelli (`caricoProssimoBase`) | Lineare per seduta per tutti | Non supportato (lacune §6) | S1/S2/S3 per esercizio | PGR-01, ALG-06 |
| U10 | `pesoUltimo = massimo` (`regole-ricerca.js:127`) | Il carico di riferimento è il massimo tra le serie fatte | Non supportato (nuovo) | Se l'utente abbassa il peso a metà seduta per finire le serie, la seduta risulta «ok» a quel massimo e il carico **sale**; se lo alza, il riferimento sale: da confermare con un test | ALG-02 |
| U11 | CAR-05 corpo libero (`:147-150`) | +1 ripetizione senza tetto | Non supportato | Oltre 12-20 ripetizioni serve una variante (PGR-03) | ALG-15 |
| U12 | `blocca` (`dolore-mattina.js:66`) | Toglie un passo anche se l'aumento era «+1 ripetizione» | Non supportato (B6) | Il carico **scende**; con aumento da RPE non torna uguale | ALG-02 |
| U13 | `ultimeSessioni` per nome (`progressivo.js:27-35`) | Stesso esercizio in giorni con bersagli diversi condivide la storia | Non supportato (B8) | Manca `repsTarget` nello storico (par. 3.1) | ALG-01, ALG-05 |
| U14 | Scarico a ogni 4ª settimana ai principianti (`motore.js:21`) | Interrompe la scala S1 | Da decidere (B21) | StrongLifts/SS scaricano solo se in stallo [R] | PGR-01 (nota sorella) |
| **U15** | **Scarico e ripresa** (`regole-ricerca.js:134-135`, `:127`, `dolore-mattina.js:56-61`) | Nello scarico `peso = pesoUltimo × dose.carico`, dove `pesoUltimo` è il massimo della **seduta precedente dell'esercizio**, anche se era già di scarico | **Non supportato (nuovo, non nell'analisi lacune)** | (a) un esercizio che compare **due volte** nella settimana di scarico (UL+FB, frequenza 2, PHUL) riceve la dose due volte: 100 → 90 → **81 kg** (dose «alta» o «media»), 0,95² = 90,3% con dose «bassa»; con tre sedute a settimana 73%; (b) lo scarico reattivo di 2 sedute (CAR-10 / DEC-06, `dolore-mattina.js:56`) idem; (c) la prima seduta dopo lo scarico parte da `Wscarico + passo` (la seduta di scarico risulta «ok»), non dal peso di prima: ~-7,5% (-16% con la doppia dose). L'RPE basso dello scarico può far saltare il carico (U1), ma solo se registrato. **Da confermare con un test**: una storia con una seduta di scarico a 90 kg e `settimanaProgramma().fase === 'scarico'` | ALG-01, ALG-03 |
| U16 | Due implementazioni del massimale (`regole-ricerca.js:86`, `seduta.js:27`) e record senza RIR | Tagli diversi (≤ 12 contro tetto a 12), nessun RIR | Non supportato | Un nome = un file; record «falsi» passando da RPE 7 a RPE 10 a pari peso | ALG-04, ALG-17 |
| U17 | RIR bersaglio dei principianti (`regole-ricerca.js:58`, `esigenza.js:12`, `intensita.js` INT-02) | Con esigenza iniziale 1,2 (nessuna bandiera BIA) e `esigenza ≥ 1,15` il bersaglio perde 1 RIR sui non pesanti: isolamenti **[0, 0]**, macchine **[0, 1]**, anche per un principiante assoluto (B12) | Non supportato | I coach consigliano ai principianti almeno 2-3 RIR e nessun cedimento nelle prime settimane [R: nota SBS nel riassunto della nota sorella; `ricerca-metodi-coach-pratici.md`, H-24, Convenzione]; la stima del RIR sbaglia di circa 1 ripetizione per tutti [W] e **per difetto** a carichi leggeri [W non attribuito]: il principiante a «0 RIR» in realtà va oltre il cedimento voluto | ALG-18 |
| M1 | Dati dello storico (`termina-e-cardio.js:106-109`) | Nessun `repsTarget`, `fase`, `tipo` | **Manca** | Quasi tutto il resto dipende da questi tre campi | ALG-01 |
| M2 | Ricalcolo dal massimale al cambio di bersaglio / dopo pausa | - | **Manca** (B7, B8) | par. 3.8 | ALG-05, ALG-14 |
| M3 | Stalli per tendenza con soglia di rumore | - | **Manca** | par. 3.11 | ALG-12 |
| M4 | Correzione dentro la seduta | - | **Manca** (lacune §5) | par. 3.7 | ALG-10 |
| M5 | Profilo di caduta tra serie | - | **Manca** | par. 3.7 | ALG-11 |
| M6 | Passo per attrezzo e passo appreso dallo storico | `arrotondaPartenza` lo fa solo per il **partenza** (`partenza.js`) | **Manca** nella progressione | B17 | ALG-06 |
| M7 | Spiegazione numerica del carico | `coachNote` con testo | **Manca** il numero | par. 5 | ALG-16 |
| M8 | Rampa di riscaldamento automatica | Tre tocchi manuali | **Manca** (bassa priorità) | lacune §11 | fuori da ALG |

Interazioni tra i tre involucri di `caricoProssimo` (dolore-mattina → regole-nuove → intensita): per ALG-03 la correzione sulla base `Wrif` va fatta **dentro** `caricoProssimoBase`, non in un quarto involucro (altrimenti RIC-01, RIC-02 e INT-04 agiscono su un valore già composto). La regola di ordine di caricamento (`regole-nuove.js` e `intensita.js` avvolgono `caricoProssimo`) resta valida.

## 7. Regole proposte

Codici **ALG-01..ALG-18** controllati con `grep` su `docs/` e `js/` (liberi al 2026-10-05; altri sotto-agenti usano PGR, AUT, STD, TAP, PCO, IPE: non li riuso, li cito). Altri agenti possono aver scelto ALG: **riconfermare prima di scrivere nel cap. 19 di `docs/coach-mappa-regole.md`**. Tutte spegnibili (`REGOLE_SPEGNIBILI`, `js/coach/parametri.js:35`) con `regolaAttiva('ALG-xx')`, solo con `coachAttivo()`, **mai** con modalità prudente, over 65, dolore o scarico per le accelerazioni, e **annullabili** dove cambiano il piano. Priorità: P1 correggono un difetto del motore; P2 migliorano la qualità; P3 rifiniture. Ordine consigliato di implementazione: ALG-01 → 03 → 04 → 06 → 18 → 05 → 02 → 08 → 07 → 12 → 13 → 14 → 09 → 11 → 10 → 15 → 16 → 17. ALG-18 è indipendente dalle altre e si può fare subito.

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **ALG-01** (P1) Storico completo | A ogni chiusura di seduta | Salva per esercizio `repsTarget`, `fase` (carico/scarico/rientro), `tipo` e `tecnica`; le voci vecchie valgono `carico` e le ripetizioni più frequenti | (nessuno: dato interno) | Convenzione (ingegneria) | Aumento minimo dello spazio; nessuna migrazione; `fase` vale anche per l'analisi delle statistiche | `js/ui/allenamento/termina-e-cardio.js:106-109`; lettori in `progressivo.js` (`ultimeSessioni`), `repertorio.js`, `esigenza.js` |
| **ALG-02** (P1) Carico di lavoro robusto | Calcolo del carico dopo una seduta con carichi diversi tra le serie | `W` = carico più frequente tra le serie fatte (non il massimo); «ok» solo se le serie a quel carico raggiungono il bersaglio; `blocca` non toglie un passo se l'aumento era «+1 ripetizione» | «Hai cambiato peso a metà seduta: parto dal peso con cui hai fatto più serie» | Convenzione | Meno aumenti «regalati»; da confermare U10 con un test | `regole-ricerca.js:127`, `progressivo.js:37 esito`, `dolore-mattina.js:66` |
| **ALG-03** (P1) Scarico senza compounding e ripresa | Settimana di scarico, scarico reattivo, prima seduta dopo lo scarico | `Wrif` = ultima seduta non di scarico; scarico = `Wrif · dose`; dopo lo scarico si riparte da `Wrif`; tendenza, e1RM, stalli, esigenza ignorano sedute di scarico (B11) | «Settimana di scarico: 90 kg, il 10% sotto i 100 kg che usi di solito. Dopo ripartiamo da 100 kg» | Convenzione (dose da Bell 2024 [R]) | U15 da confermare con un test; il fix è prudente (carichi più alti rispetto a oggi **solo** dopo lo scarico) | `caricoProssimoBase` (`regole-ricerca.js:134`), `dolore-mattina.js:56-61`, `esigenza.js:44`, `repertorio.js:137` |
| **ALG-04** (P1) Massimale con RIR, un solo nome | Ogni calcolo di massimale (STA-01, CAR-08, CIC-01, `scalaDaStorico`, record) | `e1rmStima(set)` come in 3.2; sostituisce `e1rmSerie`, `e1rmSeduta`, `unoRM`; considera `wasBerserk` come ancoraggio; **equivale a AUT-02** della nota sorella (fonderle) | «Massimale stimato: 106,7 kg (80 × 8 con 2 ripetizioni di scorta)» | Convenzione ([W+R+C]) | Cambia i conteggi di STA-01/CIC-01: rivedere le soglie (rumore 3%) | `regole-ricerca.js:86-87`, `seduta.js:27-41`, `partenza.js scalaDaStorico`, `repertorio.js` |
| **ALG-05** (P1) Ricalcolo dal massimale | Bersaglio di ripetizioni diverso di 2 o più dalla volta scorsa, esercizio sostituito, dopo una pausa, nuovo ciclo (CIC-02) | `caricoDaE1rm(e1rmRif, repsTarget, rirBers)` con tetti +10%/-30% e arrotondamento per difetto in dubbio; sopra 12 di R non converte (-10/-15%) | «Passi da 5 a 12 ripetizioni: calcolo il peso dal tuo massimale stimato (84 kg)» | Convenzione ([W] equazioni affidabili sotto 10 ripetizioni; [R] tabella RPE; [C]) | Se il massimale è vecchio (> 42 giorni) o con RIR assunto: prima volta con RIR +1; mai per prudenti/over 65 senza dimezzare i salti | `caricoProssimoBase` (nuovo ramo), `dolore-mattina.js:69` (CAR-11), `compone.js:69` (piramide) |
| **ALG-06** (P1) Passo reale per attrezzo | A ogni arrotondamento di un carico generato | `arrotondaAlPasso(x, passo, modo)` con `passoAttrezzo(nome)` (tabella 3.5); passo modificabile in Opzioni e **appreso dallo storico**; mai pesi non caricabili con i dischi di `DISCHI` | «Ho arrotondato a 105 kg: con i dischi che hai non si fa 104» | Convenzione ([R] `DISCHI`; PAR-04) | Una nuova impostazione in Opzioni (frasi in en/es/de); il passo appreso può sbagliare con pochi dati: minimo 3 valori distinti | `progressivo.js:16 arrotonda` (nuova firma), `partenza.js arrotondaPartenza` (riuso), chiamanti di `arrotonda` in `regole-ricerca.js`, `dolore-mattina.js`, `prontezza.js` |
| **ALG-07** (P2) Finestra per classe e ripartenza | Doppia progressione (isolamenti, macchine, S2/S3, passi grossi) | Larghezza = `max(3, ceil(ripEquiv)+1)` (max 6); dopo il salto riparte da `hi − round(f/0,027)` | «Passi da 8 a 9 kg: è il 12,5% in più, quindi riparti da 13 ripetizioni, non da 12» | Convenzione ([C] scambio ripetizione-carico) | Può far partire troppo alto: errore ±1 ripetizione; mai sopra `hi` | `regole-ricerca.js:182-201` |
| **ALG-08** (P2) Segnale dalla serie finale | Calcolo del carico con RPE registrato o domanda a fine esercizio | Usa l'RPE (o il RIR dichiarato) dell'**ultima serie** per `seg`; con una sola risposta a fine esercizio, quella; la media resta solo come ripiego | «Sull'ultima serie avevi 3 ripetizioni di scorta: il bersaglio era 1; alzo il peso» | Moderata ([W] RIR definito a fine serie, Zourdos/Helms; la scelta della serie finale è convenzione) | I principianti usano il segnale solo come freno | `regole-ricerca.js:156-171`, `seduta.js:208` (nuova domanda), `rpeBersaglio` |
| **ALG-09** (P2) Taratura del RIR sulla stessa serie | Una volta per blocco, isolamento a macchina o cavo, non per principianti nelle prime 2 settimane, over 65, prudenti, scarico | Domanda a metà serie, poi cedimento; `rirBias[classe]`; sostituisce la logica di `imparaDallaSeduta` | «Sulla serie di prova pensavi di averne 3 e ne hai fatte 4: ti restava di più di quanto credi» | Moderata ([W] protocollo di PubMed 37036795; errore ~1 ripetizione) | Cedimento: solo su macchine/cavi stabili; frase che rassicura | `regole-ricerca.js:272-290`, `:157-158`, `js/ui/allenamento/cedimento.js` |
| **ALG-10** (P3) Correzione tipo APRE dopo la prima serie | Intermedi e avanzati, seduta con carico già impostato | Suggerisce `+1 passo` o `-n%` per le serie dopo (par. 3.7); un tocco per accettare; back-off -7,5/-10% con top set a RPE ≥ 9,5 | «Prima serie facile (10 su 8): vuoi 2,5 kg in più per le prossime?» | Convenzione ([W] Mann 2010, n = 23; meta-analisi senza differenza [R]) | Mai silenzioso; mai con prudente, over 65, scarico, principiante | `js/ui/allenamento/seduta.js` (`updateSetRpe`/spunta), `TECNICHE.backoff` |
| **ALG-11** (P2) Profilo di caduta e tolleranza | Esercizio con almeno 6 sedute e serie finali a RPE ≥ 9 | Impara la mediana di `reps_k / reps_1`; `esito` accetta quella caduta come «ok»; default 1 ripetizione sull'ultima serie (macchina/isolamento) | «La tua ultima serie scende di 1-2 ripetizioni: è normale vicino al cedimento, non è un mancato» | Convenzione (par. 1.3 [M]) | Può nascondere un vero mancato: tolleranza massima 2 ripetizioni; non per pesanti | `progressivo.js:37 esito`, `regole-ricerca.js` |
| **ALG-12** (P1) Stallo per tendenza | Esercizio con ≥ 4 sedute di lavoro in ≥ 21 giorni | `trendE1rm` (Theil-Sen, soglie 3.11) sostituisce CAR-08 e alimenta STA-01 e CIC-01; stallo → gradino 2-3 della scala; calo → scarico mirato | «Il tuo massimale stimato non sale da 3 settimane: prima provo passi più piccoli» | Convenzione ([C] rumore; falso allarme 1 su 6) | Meno scarichi inutili; più «fermo» segnalati se le soglie sono basse: soglie in `COACH_PARAMETRI` | `regole-ricerca.js:222-229`, `repertorio.js:137 eserciziFermi`, `verdettoCiclo` |
| **ALG-13** (P2) Mancati per scala | Mancato (non lieve o ripetuto) | 2 mancati per S1, 3 per S2/S3 prima di ridurre; il mancato grave riduce subito (PGR-04); poi la scala `PCO-01` | «Due volte senza riuscirci: stesso peso, cambio lo schema (3×8) invece di togliere subito il 10%» | Convenzione, **Contrastata** (par. 2C) | Più sedute prima del calo: limitato dal gradino «grave»; prudenti/over 65: come oggi (2) | `regole-ricerca.js:213-221` |
| **ALG-14** (P2) Rampa di ritorno | Prima seduta `ok` dopo un rientro (CAR-04) | `W' = min(Wpre, W · 1,05)` (1,025 per principianti e over 65) per 3 sedute | «Bentornato: risali del 5% a seduta fino ai 100 kg di prima» | Convenzione (base da verificare [M]) | Salvaguardie di CAR-04 e RIC-05 invariate; RIR +1 la prima volta | `regole-ricerca.js:137-144`, aggiusti dell'esercizio |
| **ALG-15** (P2) Corpo libero, elastici, tempo | Esercizi senza carico o a tempo | Finestra con tetto 12-15, poi variante o zavorra; tempo: +5 s fino a 30 s, poi +10%; elastici: ripetizioni, tempo, colore | «Hai superato le 15 ripetizioni: ora una variante più difficile» | Convenzione | È PGR-03 della nota sorella: fonderle | `regole-ricerca.js:116-119`, `:146-150`; `STA-02` |
| **ALG-16** (P2) «Perché questo peso» | Ogni nota `coachNote` con carico | Una frase con il numero: «Massimale stimato 106 kg · bersaglio 5 con 2 di scorta → 87,5 kg» + un tocco per dire «troppo pesante / giusto / troppo leggero» sulla prima serie, che alimenta la calibrazione | «Perché 87,5 kg: dal tuo massimale stimato (106 kg), 5 ripetizioni con 2 di scorta» | Convenzione (UX delle app, [M]) | I principianti non devono vedere formule: versione semplice | `regole-ricerca.js:252` (`coachNote`), `seduta.js:174` |
| **ALG-17** (P3) Record intelligenti | Spunta di una serie fatta | Tipi di record: peso massimo, ripetizioni a quel peso, massimale stimato (con RIR, ≤ 10 ripetizioni); nessun record in scarico o dopo una pausa; stessa funzione di ALG-04 | «Record: 105 kg × 5 (massimale stimato 123 kg)» | Convenzione ([M] app) | Meno festeggiamenti falsi; mai «record» il giorno dopo un rientro | `seduta.js:44 controllaRecord`, `migliorUnoRM` |
| **ALG-18** (P1) RIR bersaglio per livello | Principiante (livello dichiarato o meno di 8 sedute con quell'esercizio) o prime 2 settimane del programma | Il bersaglio non scende mai sotto **[2, 3]** su pesanti e macchine e **[1, 2]** su isolamenti; il «-1 RIR per esigenza ≥ 1,15» (`regole-ricerca.js:58`) non si applica; sopra 4 RIR di scorta si resta comunque dentro il range delle stime affidabili | «Per ora lascia 2-3 ripetizioni di scorta: la tecnica prima, il cedimento dopo» | Convenzione (coach basati sull'evidenza, Moderata sulla direzione: la stima del RIR sbaglia di circa 1 ripetizione per tutti [W]) | Più prudente di oggi, nessun effetto su avanzati; può rallentare un principiante che si sottovaluta: l'RPE «facile» alza comunque il carico nelle prime 3 sedute (CAR-16) | `rirBersaglio` / `rirBersaglioBase` (`regole-ricerca.js:50-69`), `esigenza.js` |

## 8. Domande aperte

1. **Dr. Muscle: spiegazione pubblica dell'algoritmo** (Carl Juneau): quali regole (ripetizioni nel range, serie di back-off, sedute leggere, scarico) e con quali soglie. Query: «Dr. Muscle how the algorithm works Carl Juneau progression», «Dr. Muscle deload light session explained» (domini `dr-muscle.com`, `youtube.com` per i titoli).
2. **Liftosaur: script di progressione** (open source): leggere gli esempi di programmi e la documentazione dei tipi lineare/doppia/somma. Si può cercare con WebSearch (`liftosaur.com`) e leggere i file grezzi via `raw.githubusercontent.com` (raggiungibile per i repo pubblici: `references/rete.md`, livello 3, licenza da controllare); non l'ho fatto per rispettare la consegna «solo WebSearch».
3. **RP Hypertrophy App**: come calcola il carico oltre al volume; query «Renaissance Periodization hypertrophy app weight recommendation RIR».
4. **Caduta di ripetizioni tra le serie**: numeri per classe e pausa (Willardson, Senna e altri); query «repetitions across multiple sets rest interval 1 3 minutes bench press squat».
5. **Valore di un punto di RPE in carico**: risultati di Helms 2018 (PMID 29628895 e 29786623, solo titoli nella nota sorella).
6. **Pausa e ripresa**: meta-analisi sulla cessazione dell'allenamento e rientro (Bosquet 2013; pause di 3 settimane, Ogasawara 2013): quale rampa di ritorno ha supporto.
7. **Velocità con lo smartphone**: validità delle app (PowerLift, My Lift e simili) contro encoder; se serve un modulo opzionale.
8. **Piani generati da IA**: studi sulla qualità dei piani di allenamento prodotti da modelli di linguaggio; errori più frequenti.
9. **Recensioni reali** (App Store e Google Play, forum): che cosa dicono gli utenti di Fitbod, Dr. Muscle, Alpha Progression sulla correttezza dei pesi consigliati; senza accesso a Reddit tramite fetch resta solo WebSearch.
10. **Decisione di progetto**: 2 o 3 mancati (ALG-13); se mostrare il «massimale stimato» ai principianti; se la domanda a fine esercizio sostituisce l'RPE per serie.
11. **Dati di 3in** (nessuna fonte esterna li dà): la mediana reale di caduta tra le serie, l'errore medio di RIR dopo la taratura corretta, quante serie hanno l'RPE registrato. Serve un'analisi locale delle sedute reali (con consenso), non ricerca.
12. **Preprint Fitbod** (arXiv 2603.17495): attendere la revisione; unità del carico e se vale anche per carichi in kg.
13. **U15 e U10 da confermare con un test** prima di toccare il codice (storia di due sedute di scarico nella stessa settimana; seduta con peso abbassato a metà).
14. **Ripresa dopo lo scarico per gli esercizi della scala S3** (aumento a blocco): la regola «riparti da `Wrif`» vale anche lì, o va scelta una rampa diversa? Serve un test con un blocco completo di 4-5 settimane.
15. **RIR bersaglio dei principianti** (ALG-18): 2-3 per tutte le classi è convenzione dei coach (nota `ricerca-metodi-coach-pratici.md`, H-24; SBS «almeno 3 RIR» nel riassunto della nota sorella): serve un controllo con l'indolenzimento e l'abbandono dei principianti reali di 3in.

## 9. Limiti onesti

- **Rete e budget**: solo WebSearch (WebFetch, curl e browser bloccati); 10 ricerche riuscite su almeno 35 richieste, perché il tetto di sessione è finito. La parte sulle app, sui reclami degli utenti, sulla caduta tra serie, sulla pausa e sul tapering è **Conoscenza del modello (non verificata sul web)**, con forza «Convenzione» o «Moderata (da verificare)».
- **Riassunti, non testi**: ogni cifra di [W] viene da un riassunto di WebSearch, non dal testo dello studio (n, errori, correlazioni compresi). Le righe «non attribuite» (panca al 75%, effetto del carico sull'accuratezza) non hanno una fonte singola identificata.
- **Calcoli miei [C]**: tabelle di conversione, 2,4-3,0% per ripetizione, 1 su 6 di falso allarme (simulazione), esempi dei test: sono aritmetica, non risultati di studi, e vanno ricontrollati nei test.
- **Nessuna prova eseguita sul motore**: l'audit è lettura del codice; U10 e U15 sono ragionamenti da confermare.
- **Disaccordo con la nota sorella** su CAR-14 (par. 2G): non è un errore di nessuno dei due, ma di lettura; va deciso con una prova (come per le due righe sopra).
- **Popolazione**: gli studi su RIR e autoregolazione riguardano giovani maschi e femmine sani, in gran parte allenati o atleti universitari; per over 65, principianti assoluti e popolazioni particolari la prudenza resta quella già nel repo.
- **App**: nessuna caratteristica di un'app è stata verificata sulla sua pagina; «dichiarato dall'azienda» è il marketing. Nessuna idea qui copia codice o testi di terzi.
- **Preprint**: Marzagao 2026 non rivisto e con conflitto di interesse (autore dell'azienda che vende l'app).

## Appendice A. Query pronte (da rilanciare con il tetto di ricerca alzato)

Le ricerche che avrei fatto e non ho potuto. Ordine: impatto sul generatore. `allowed_domains` consigliati tra parentesi (PubMed/PMC/Springer per studi; siti esperti per articoli). Ogni numero va incrociato con una seconda fonte indipendente.

**Scienza (domini: pubmed.ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov, link.springer.com)**
1. `Helms 2018 RPE volume autoregulation periodized program results`
2. `RPE vs percentage 1RM loading matched sets repetitions Helms results strength`
3. `percent load change per RPE point powerlifters RIR prescription`
4. `Refalo accuracy of intraset repetitions in reserve predictions bench press resistance-trained results`
5. `Remmert 2023 intraset repetitions in reserve prediction accuracy six weeks bench press`
6. `Steele 2017 ability to predict repetitions to momentary failure results novices`
7. `RIR accuracy lower body squat leg press novices trained meta-analysis`
8. `1RM prediction equations accuracy by repetitions Epley Brzycki Lombardi Wathan O'Connor Mayhew systematic review`
9. `estimating 1RM from RPE repetitions in reserve load-velocity powerlifters equation`
10. `Reynolds 2006 prediction of one repetition maximum strength from multiple repetition maximum testing`
11. `Maximal number of repetitions at percentages of 1RM meta-regression table squat bench deadlift` (PMC10933212)
12. `APRE autoregulatory progressive resistance exercise Mann 2010 chart DAPRE Knight`
13. `APRE versus linear periodization trained lifters meta-analysis`
14. `load autoregulation volume autoregulation meta-analysis strength hypertrophy 2021 2025`
15. `repetitions across multiple sets rest interval 1 3 minutes bench press squat repetition drop-off`
16. `repetition performance across sets rest interval Willardson Senna`
17. `velocity loss threshold 20% 40% Pareja-Blanco strength hypertrophy results`
18. `smartphone app barbell velocity validity linear encoder PowerLift My Lift`
19. `double progression resistance training rep range load increase randomized`
20. `rep range hypertrophy low load high load Schoenfeld 2017 Lopez 2021 network meta-analysis`
21. `percentage load increase novice trained progression ACSM 2-10% rule`
22. `training cessation meta-analysis strength decline weeks Bosquet 2013`
23. `short-term resistance training break 3 weeks muscle strength retention Ogasawara Grgic`
24. `muscle memory retraining strength regain after detraining`
25. `deload strength training systematic review load vs volume reduction`
26. `tapering strength Bosquet 2007 meta-analysis volume reduction intensity maintained`
27. `strength gain rates novice intermediate advanced lifters training age`
28. `plateau detection e1RM trend resistance training statistics`

**App e prodotti (siti ufficiali e blog; domini suggeriti)**
29. `Dr. Muscle how it works algorithm progression light session deload` (dr-muscle.com)
30. `Dr. Muscle Carl Juneau explains progression rep range back-off sets` (youtube.com per titoli)
31. `Renaissance Periodization hypertrophy app how it works load recommendation soreness pump performance` (rpstrength.com)
32. `Juggernaut AI how it works AMRAP training max wave` (jtsstrength.com)
33. `Fitbod algorithm how weights are recommended` (fitbod.me)
34. `Fitbod problems recommended weights complaints review`
35. `Alpha Progression app progression suggestions RIR double progression review`
36. `Liftosaur progress types linear double sum Liftoscript documentation` (liftosaur.com)
37. `Liftosaur open source repository programs examples` (github.com)
38. `Boostcamp app programs auto-regulation RPE how it works`
39. `Hevy PR types set volume 1RM weight records`
40. `Strong app warm-up calculator plate calculator PR`
41. `JEFIT features smart workout planner review`
42. `StrengthLevel methodology standards percentiles formula` (strengthlevel.com)
43. `Stronger By Science how to choose the right load progression strategy` (strongerbyscience.com)
44. `Stronger By Science autoregulation RPE RIR article` (strongerbyscience.com)
45. `Trainerize TrueCoach TrainHeroic features RPE auto-regulation percentage loading`
46. `best workout tracker apps progressive overload suggestions 2026`
47. `AI generated workout plan problems junk volume no progression review`
48. `ChatGPT exercise prescription study quality evaluation ACSM guidelines`
49. `LLM generated resistance training programs systematic comparison coaches`
50. `Mike Israetel progressive overload not just weight reps RIR` (youtube.com)
51. `Eric Helms autoregulation intermediate advanced RPE vs fixed progression` (youtube.com)
52. `Mike Tuchscherer fatigue percent RPE back-off sets explained`
53. `Greg Nuckols RIR accuracy rep in reserve article` (strongerbyscience.com)
54. `Menno Henselmans progression double progression rep range` (mennohenselmans.com)
55. `Barbell Medicine progressive loading RPE novice intermediate advanced` (barbellmedicine.com)

## Appendice B. Registro delle 10 ricerche riuscite (cosa hanno dato)

| # | Query (sintesi) | Filtri | Esito |
|---|---|---|---|
| 1 | Halperin 2022 accuratezza nel predire le ripetizioni al cedimento | PubMed, PMC, Springer | Titolo e URL dello studio (Sports Med, s40279-021-01559-x) e riassunto: imprecisione indipendente dal livello, DS 1,45 |
| 2 | Accuratezza del RIR in allenati, panca e squat, Refalo | PubMed, PMC, Springer | Elenco di studi (PubMed 37036795, PMC11556642, PubMed 33337690, 28933716, PMC13215226...) senza numeri |
| 3 | Zourdos 2016 scala RPE basata sul RIR | PubMed, PMC, Springer | Conferma titolo, rivista, r = -0,88 / -0,77; Helms 2016 (PMC4961270) |
| 4 | Hackett 2012 RPE e %1RM in panca | PubMed, PMC, Springer | Dettagli del protocollo (bodybuilder, 70% 1RM, 5 serie) e scala con descrittori RIR |
| 5 | Prescrizione del carico da RPE, validità, tabelle | PubMed, PMC, Springer | r = 0,88-0,91 tra %1RM e RPE; esperti più accurati; confronto con %1RM |
| 6 | Accuratezza del RIR intraserie in isolamenti e multiarticolari | PubMed, PMC, Springer | Disegno di PubMed 37036795 (27 uomini, 31 donne, 72,5% di 1RM) e assenza di effetti di sesso/esperienza |
| 7 | Preprint «Weight-Dependent 1RM Prediction Equation» (Fitbod) | nessuno | Formula, 303.494 serie / 388 esercizi, +1% a +40%, 37,7 milioni di serie loggate da circa 66.000 utenti |
| 8 | Equazioni del 1RM: errore per numero di ripetizioni | PubMed, PMC, Springer | Sotto 10 ripetizioni più accurate; Lombardi 5,8%; sovrastima del 3,4-4,1% |
| 9 | Stima del 1RM dal RIR e relazione carico-ripetizioni | PubMed, PMC, Springer | Accuratezza per carico (85% > 75% > 65%), DS 1,2; errore 0,65 ± 0,78 in panca; relazione RIR-velocità individuale |
| 10 | Mann 2010 APRE contro periodizzazione lineare | PubMed, PMC, Springer | Disegno dell'APRE (set 3 → carico del set 4), 6 settimane, squilibrio iniziale; titoli delle revisioni sull'autoregolazione |
