# Ricerca: forza, powerlifting, S&C e progressione dei carichi

**Copertura: 29 ricerche web riuscite (più 2 ricerche di codice su GitHub per gli standard di forza); il resto da conoscenza del modello.** Le righe che non poggiano su risultati visti sono marcate «Conoscenza del modello (non verificata sul web)» e hanno forza «Convenzione» o «Moderata (da verificare)»: non vanno trasformate in regole senza una verifica (appendice A, «Query pronte»).

Ambito: come cresce un carico nel tempo (per livello, per tipo di esercizio e di attrezzo), come si converte uno sforzo percepito (RIR/RPE) nel carico successivo, come si stima e si usa il massimale (1RM), come si decide tra progressione lineare, doppia e a onde, e come sistemare la tabella inutilizzata `STANDARD_FORZA`. Tocca le aree **CAR** (carico della prossima seduta, cap. 8), **PRO**, **PAR**, **LIV** (LIV-01, LIV-02), **STA**, **STR**, **CIC**, **INT**, **PRG-13..16 e PRG-38** della mappa `docs/coach-mappa-regole.md`. Non rifà ciò che sta già in `docs/ricerca-struttura-e-intensita.md` (volume, frequenza, cedimento, pause, ordine, superserie, BIA).

Data della ricerca: **2026-10-05**. Forza dell'evidenza come nella nota precedente: **Solida** (meta-analisi o posizione ufficiale concordi), **Moderata** (pochi studi o risultati che cambiano con la popolazione), **Convenzione** (pratica dei coach senza prove dirette), più la bandiera **Contrastata** quando fonti di pari livello non concordano.

Sigle nella colonna «Fonte»: **(riassunto)** = visto solo nel riassunto che WebSearch restituisce, non nel testo dello studio; **(titolo)** = visto solo titolo/URL/PMID; **(terzi)** = pagina o repo di terzi che cita un'altra fonte, livello 3; **NV** = «Conoscenza del modello (non verificata sul web)»: affermazione scritta dalla conoscenza dell'autore della nota, senza risultato di ricerca davanti. Autori e anni delle righe NV sono dati solo quando il ricordo è sicuro e sono sempre segnati «da verificare»; non ci sono PMID o DOI inventati (i PMID in questa nota sono tutti comparsi nei risultati), e dove non ricordo un numero preciso c'è un intervallo.

## 0. Stato della ricerca (leggere prima)

- Il tetto di sessione di WebSearch (200 interrogazioni, condiviso con gli altri sotto-agenti) si è esaurito dopo **29 interrogazioni utili** per questo tema: meno delle 30 richieste. Sono coperti: periodizzazione, autoregolazione (RPE, RIR, APRE, velocità), accuratezza del RIR, equazioni e tabelle del 1RM, sicurezza del test, programmi per livello (Starting Strength, StrongLifts, Texas, 5/3/1, SBS, Barbell Medicine, Helms), standard di forza (solo via frammenti di ricerca codice su GitHub).
- **Non coperti** (nessuna interrogazione possibile): frequenza e volume specifici per la forza, riposo per la forza, tapering e peaking (Bosquet, Mujika), punti deboli e accessori, tecnica per antropometria, potenza/pliometria/derivati olimpici, kettlebell e corpo libero, forza di presa, equilibrio e mobilità, programmi minimi a 2-3 giorni, Candito, Sheiko, Smolov, GZCL, nSuns. Per questi temi la nota non afferma nulla: sono elencati in «Domande aperte» con la query da lanciare.
- Un tentativo di leggere via `raw.githubusercontent.com` alcuni file pubblici di repo di terzi (tabelle di standard di forza) è stato interrotto dal sistema di permessi dopo la lettura di due file; i file sono stati cancellati e **nessun numero preso da lì è usato** in questa nota. I frammenti di ricerca codice mostrati dallo strumento GitHub (livello 3) sono invece citati come «(terzi)».

## 1. Cosa dicono le fonti

### 1.1 Periodizzazione (forza e ipertrofia)

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Periodizzato contro non periodizzato, forza | Effetto moderato sul 1RM a favore del periodizzato; il miglioramento è maggiore nei non allenati; più frequenza settimanale e studi più lunghi danno più forza. Conclusione degli autori: la variazione degli stimoli sembra importante | Solida | Williams 2017 (Sports Med 47:2083-2100, meta-analisi) (riassunto) |
| Stesso confronto a volume pareggiato | 35 studi: effetto sul 1RM a favore del periodizzato (ES 0,31, P=0,02); l'ipertrofia **non** cambia | Solida per la forza; nessun effetto sulla massa | Meta-analisi Sports Med 2022 (PMID 35044672; cercata come «Moesgaard 2022», l'autore non compare nel riassunto) (riassunto) |
| Lineare contro ondulato, forza | Harries 2015: nessuna differenza significativa, tendenza a favore dell'ondulato sulla leg press. Meta-analisi 2022: effetto sul 1RM a favore dell'ondulato, **solo nei già allenati**; nei non allenati nessuna differenza. Meta-analisi 2026 (29 studi fino a luglio 2025): forza arti superiori simile, nessuna differenza significativa per gli inferiori | **Contrastata** | Harries 2015 (JSCR 29:1113-1125); PMID 35044672; PMC12999919 / PMID 41869632 (riassunti) |
| Lineare contro ondulato giornaliero, ipertrofia | Nessuna differenza | Solida | Grgic 2017 (PMC5571788, PMID 28848690); PMID 35044672 (riassunti) |
| Affidabilità della ricerca sulla periodizzazione | Esistono critiche sulla definizione di «periodizzazione» e sul disegno degli studi | Convenzione (solo titoli) | PMC5358028 «Is Empirical Research on Periodization Trustworthy?»; Sports Med 2020 «Periodization: Variation in the Definition and Discrepancies in Study Design» (titoli) |

### 1.2 Autoregolazione, RIR e RPE

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Scala RIR-RPE | RPE 10 = 0 ripetizioni in riserva, 9 = 1, 8 = 2... Su 29 squatter (15 con più di 1 anno di esperienza, 14 principianti) la correlazione inversa tra velocità del bilanciere e RPE era r = -0,88 negli esperti e -0,77 nei principianti; tra i due gruppi ci sono differenze «con implicazioni importanti» | Moderata | Zourdos 2016 (JSCR 30(1):267-275) (riassunto) |
| Carico dall'RPE o dalla %1RM | RPE basato sul RIR «alla pari o meglio» della %1RM per forza e massa; piccolo vantaggio sul 1RM nella maggioranza delle persone | Moderata | «RPE vs. Percentage 1RM Loading in Periodized Programs Matched for Sets and Repetitions» (PMID 29628895, PMC5877330) (riassunto) |
| Autoregolazione in generale | Meta-analisi di 15 studi (6 sul carico, 9 sul volume): **nessuna differenza significativa** sul 1RM tra autoregolato e standard | Moderata | Sports Med Open 2021 (PMC8762534) (riassunto) |
| Autoregolazione, rete di confronti | APRE, VBT e RPE più efficaci della %1RM sul 1RM di squat; APRE primo, poi RPE, VBT, %1RM | Moderata (anno incerto: il riassunto dice 2024, il PMID è più recente) | PMID 40791980 «Autoregulated resistance training for maximal strength enhancement: network meta-analysis» (riassunto) |
| APRE | 6 settimane, 23 giocatori universitari (12 APRE, 11 lineare): APRE migliore su 1RM di panca, 1RM stimato di squat e ripetizioni a 225 lb | Moderata (n piccolo, breve) | Mann 2010 (PMID 20543732) (riassunto) |
| Perdita di velocità | Dose-risposta: massimo guadagno di forza con perdita di velocità del 20-30% (altre sintesi: 10-30% o 10-20%); velocità contro %1RM: nessuna differenza significativa sulla forza massimale. Serve un sensore: non applicabile all'app | Moderata | PMC9914552 (dati fino a gennaio 2023); PMC12870409; PMC9399433 (riassunti) |
| Accuratezza del RIR | 13 pubblicazioni (12 studi, 414 persone) nella meta-analisi: la stima migliora vicino al cedimento e con 12 ripetizioni o meno; **lo stato di allenamento non sembra influire** | Moderata | Halperin 2022 (Sports Med) (riassunto) |
| Accuratezza del RIR e livello | Remmert 2023: nessun effetto dello stato di allenamento; errori maggiori a 4 RIR che a 2 RIR. Steele 2017: l'esperienza migliora la stima (gli esperti sottostimano di 1-2 ripetizioni, i meno esperti di 4-5, cifre dal riassunto) | **Contrastata** | Halperin 2022; Remmert 2023 (citato nel riassunto); Steele 2017 (PMC5712461) |
| Il RIR si può allenare | Esiste uno studio 2026 sulla «allenabilità» della stima del RIR in giovani e anziani | Convenzione (solo titolo) | BMC Sports Sci Med Rehabil 2026 (link.springer.com, s13102-026-01997-y) (titolo) |
| Lontano dal cedimento si stima peggio | Errore maggiore a 4 RIR che a 2 RIR | Moderata | Riassunto di ricerca su Remmert 2023 e studi collegati |

### 1.3 1RM, %1RM, ripetizioni, test

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Equazioni del 1RM | Tutte correlano con il 1RM misurato (r > 0,95) ma l'errore assoluto cresce sopra 10 ripetizioni; LeSuer 1997 (67 non allenati, panca, squat, stacco, 7 equazioni): **tutte sottostimano lo stacco**. Brzycki valida per la panca fino a 10 ripetizioni (r = 0,98); Lombardi con errore medio normalizzato 5,8% in 10 esercizi per gli arti inferiori | Moderata | LeSuer 1997 e rassegne (riassunto); Sport Sci Health 2025 (s11332-024-01264-y) (riassunto) |
| Test a 5RM | Il 5RM dà la previsione più accurata (R² 0,993 panca, 0,974 leg press); l'accuratezza peggiora a ripetizioni alte | Moderata | Rassegna citata nel riassunto di ricerca (fonte primaria non identificata) |
| Equazione tarata su dati reali | Preprint 2026: 303.494 serie vicine al cedimento, 14.966 utenti, 388 esercizi (dati Fitbod); un Epley generalizzato riduce l'incoerenza interna del 17-22% rispetto a Brzycki, Epley, Wathen, Mayhew; il miglioramento va da +1% sui bilancieri pesanti a +40% su manubri e cavi leggeri. **Preprint, autore e dati dell'azienda che vende l'app**: non basta per «Solida» | Convenzione (preprint 2026) | Marzagao 2026, arXiv 2603.17495 / SportRxiv 768 (riassunto) |
| Ripetizioni a una data %1RM | Meta-regressione di 269 studi, 7.289 persone, 952 test: sesso, età e stato di allenamento influiscono poco; servono tabelle separate per panca e leg press. Panca: 8,8 ripetizioni all'80%; leg press: 13,1 all'80%; su tutti gli esercizi in media **14,8 ripetizioni al 70%**, più della tabella storica degli anni '90 (12) | Solida | Sports Med 2024;54:303-321 (PMC10933212); Stronger By Science «How many reps can people really do at specific 1RM percentages?» (riassunti) |
| Squat contro panca ai carichi leggeri | Al 60% di 1RM si fanno più ripetizioni nello squat che in panca o nel curl, in allenati e non; a 80-90% le differenze si riducono | Moderata | PMID 17194239 (titolo e riassunto) |
| Il test di 1RM | Affidabilità test-retest buona: ICC 0,64-0,99 (mediana 0,97; 92% degli ICC almeno 0,90), indipendente da esperienza, esercizio, sesso, età. Ma: indolenzimento e danno muscolare importanti nei principianti, rischio acuto con carichi molto alti, chi è poco esperto migliora tra una prova e l'altra (servono più sedute di prova). Il test a 10RM è proposto come alternativa più sicura | Moderata | Rassegna sistematica Sports Med Open 2020 (PMC7367986); PMC11441898 (titolo, 10RM in giovani non allenati) (riassunti) |
| Tabella RPE di Tuchscherer | È una tabella ripetizioni x RPE → %1RM. Calcolatori di terzi riportano per 5 ripetizioni: RPE 10 = 86,3%, RPE 8 = 81,1%, RPE 6 = 77,4%. Calcolo mio: Epley applicato a «ripetizioni + RIR» dà 85,7%, 81,1%, 76,9%, cioè entro 0,6 punti: la tabella equivale a Epley con RIR aggiunto | Convenzione | Calcolatori RPE (fitnessvolt, repraptor e simili) (terzi, riassunto) |

### 1.4 Progressione per livello: cosa fanno i programmi noti

Nessun programma di questa tabella ha RCT diretti trovati: la forza è **Convenzione** (esperienza di allenatori), con la convergenza tra fonti indipendenti come unico controllo.

| Livello | Cosa si fa | Forza | Fonte |
|---|---|---|---|
| Principiante | Starting Strength: +5 lb a seduta su squat, panca e press (il press scende presto a +2,5 lb), stacco +10 lb poi +5, power clean +5; per i maschi 18-35 anni le prime 5-6 sedute di squat salgono di 10 lb; di norma 3-6 mesi. StrongLifts: +2,5 kg a seduta su squat, panca, rematore, military; stacco +5 kg; tre sedute fallite sullo stesso peso = -10% e si riparte | Convenzione | Starting Strength (sito e riassunti di terzi); StrongLifts (liftcodex, stronglifts.com) (terzi, riassunti) |
| Principiante, quanto dura | Restare con la scheda da principiante finché diventa difficile aggiungere peso da una settimana all'altra senza «grinding»: da 2 a 6 mesi. Stare ad almeno 3 ripetizioni dal cedimento e fermarsi quando cambia la tecnica; carichi 60-80% di 1RM | Convenzione | Stronger By Science, Complete Strength Training Guide (Nuckols) (riassunto) |
| Principiante, definizione | Il principiante è chi può aggiungere peso **a ogni seduta in modo sostenibile**: non conta quanto solleva. «Se non hai mai fatto una progressione lineare sei un principiante fino a prova contraria». Aspettativa media: circa 1-5% a settimana senza superare gli RPE bersaglio | Convenzione | Barbell Medicine (blog «Novice, Intermediate, and Advanced Strength Training»; «Progressive Loading») (riassunto) |
| Intermedio | Passa a progressione **settimanale**. Texas Method: lunedì volume (5x5 al 90% del 5RM), mercoledì recupero, venerdì una serie da 5 con +5 lb a settimana (squat, stacco), panca e press alternati (+2,5 lb a settimana ciascuno). Stronger By Science, «progressione arbitraria»: +2,5 o +5 kg a settimana; «solo perché puoi aggiungere 10 kg non devi farlo: i salti rapidi creano picchi di volume» | Convenzione | Texas Method (powerliftingtowin, setforset, Barbell Medicine «12 ways to skin the Texas Method» titolo) (terzi); SBS «How to choose the right load progression strategy» (riassunto) |
| Intermedio, autoregolazione | SBS: tre strategie per salire di settimana in settimana: aggiunta fissa, APRE, progressione RPE (RPE più basso = salto maggiore, RPE più alto = salto minore o stesso carico). «Non si progredisce ogni settimana, ma con costanza il progresso arriva». Helms: l'autoregolazione è più adatta a intermedi e avanzati che ai principianti | Convenzione | SBS (riassunto); Helms / 3DMJ (riassunto di Boostcamp e RippedBody, terzi) |
| Avanzato | 5/3/1 (Wendler): training max = 90% del 1RM stimato; a fine ciclo (4 settimane) +10 lb sui movimenti della parte bassa (squat, stacco) e +5 lb su quelli della parte alta; ultima serie AMRAP; settimana 4 di scarico | Convenzione | Siti di terzi sul 5/3/1 (typeatraining, train531, norma-athletics) (terzi, riassunti) |
| Isolamenti | Doppia progressione: partire con un carico vicino a 15 ripetizioni, aggiungere ripetizioni fino a 3x15, poi aumentare il carico | Convenzione | Helms / 3DMJ (riassunto, terzi) |
| Detraining e rientro | Esiste un articolo SBS sul rientro dopo una pausa | Convenzione (solo titolo) | SBS «Practical strategies for returning to training after a break» (titolo) |

### 1.5 Standard di forza (multipli del peso corporeo)

Nessuno standard di forza è un dato scientifico: sono distribuzioni di sollevatori che registrano i loro carichi (Strength Level) o formule tarate sui record di powerlifting (Symmetric Strength). Le fonti sotto sono **tutte di terzi**, viste come frammenti di ricerca codice.

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Livelli di Strength Level | 5 livelli definiti come percentili di chi registra i carichi: Beginner più forte del 5%, Novice 20%, Intermediate 50%, Advanced 80%, Elite 95%; dati **autodichiarati** (panca piana: 48,7 milioni di sollevamenti 2014-2026, 10,9 milioni validi); base d'età 25-40 anni, correzione sotto 25 e sopra 40. Esempio panca a 57 kg di peso corporeo: 34,0 / 49,4 / 67,8 / 90,2 / 113,6 kg, cioè 0,60 / 0,87 / 1,19 / 1,58 / 1,99 volte il peso corporeo | Convenzione (livello 3) | Nota di un repo personale che trascrive le pagine di Strength Level (HelpMe-Pls/Life-Engineering) (terzi) |
| Symmetric Strength, metodo | Punteggio = un quarto del Wilks ipotetico per quell'alzata, correzione per età solo sotto 23 e sopra 40; soglie: Untrained da 30, Novice 45, Intermediate 60, Proficient 75, Advanced 87,5, Exceptional 100, Elite 112,5, World class 125. I rapporti tra alzate vengono da record di powerlifting a secco (mediane: uomini squat/stacco 87%, panca/stacco 65%; donne 84% e 57%) | Convenzione (livello 3) | Note di terzi che citano symmetricstrength.com/about (Life-Engineering, Heartwood) (terzi) |
| Ancora «non allenato» (la maggioranza della popolazione) | Uomo di 180 lb: squat 135 lb, panca 100 lb, stacco 155 lb (0,75 / 0,56 / 0,86 volte il peso corporeo). Donna di 130 lb: 80 / 55 / 95 lb (0,62 / 0,42 / 0,73). | Convenzione (livello 3) | Commento di uno script di terzi che cita Symmetric Strength (M-M-FITNESS-TRACKER) (terzi) |
| Altre app che usano lo stesso schema | Stacco uomini per untrained / novice / intermediate / advanced / elite: 1,00 / 1,35 / 1,75 / 2,25 / 2,75; squat uomini: 0,50 / 1,00 / 1,75 / 2,50 / 3,00 (con un livello «beginner» a 1,25 inserito tra novice e intermediate) | Convenzione (livello 3) | RichHank/workout-log; alhibi/unified-life-forge (terzi) |
| Peso corporeo | Gli standard a rapporto fisso favoriscono chi pesa tanto o poco a seconda del metodo: Symmetric Strength usa il Wilks, Strength Level le tabelle per peso | Convenzione | come sopra |

## 2. Dove le fonti non concordano

**A. Il RIR migliora con l'esperienza?** Posizione A: sì (Steele 2017; Zourdos 2016 vede differenze principianti/esperti). Posizione B: no, l'accuratezza dipende da quanto si è vicini al cedimento e dal numero di ripetizioni, non dal livello (Halperin 2022; Remmert 2023). *Il coach adotta:* trattare il RIR come stima con errore di circa 1 ripetizione per tutti (come INT-03), tarata dalla CAR-14; per i principianti usare l'RPE solo come **freno** («consolida»), non come acceleratore, salvo nelle prime sedute di calibrazione.

**B. L'autoregolazione batte la %1RM?** A: nessuna differenza sul 1RM in 15 studi (Sports Med Open 2021). B: APRE, RPE e velocità sono meglio della %1RM nella rete di confronti (PMID 40791980) e Mann 2010 vede un vantaggio dell'APRE (n = 23). *Adotta:* usare l'autoregolazione perché individualizza e perché il costo è nullo, senza prometterne la superiorità.

**C. Lineare o ondulato.** A: l'ondulato è meglio nei già allenati (meta-analisi 2022; Williams 2017). B: nessuna differenza (Harries 2015; meta-analisi 2026 con 29 studi). Sulla massa nessuno vede differenze. *Adotta:* per principianti la forma conta poco (nei non allenati nessuna differenza); per intermedi e avanzati l'ondulato settimanale (pesante / medio / leggero) è un'impostazione a basso rischio, già presente nel PHUL (PRG-11) e nel 3 giorni Upper / Lower / Full Body (ABB-05).

**D. Quanto aumentare, e quanto in fretta.** Rippetoe / StrongLifts: a ogni seduta, +2,5 kg o +5 lb anche subito. SBS: non salire di 10 kg solo perché si può, i picchi di volume non servono ai principianti. Barbell Medicine: 1-5% a settimana senza uscire dagli RPE bersaglio, e aspettare un calo di RPE sostenuto (da 8 a 7 a 6) prima di aumentare. *Adotta:* aumenti in percentuale con tetto e passo minimo (par. 3.1), freno da RPE.

**E. Quanto vale un punto di RPE in carico.** Il codice usa +4% per punto (+5% nelle prime sedute) con tetto 10-15% (`caricoProssimoBase`, citato come Helms 2018; il testo di quello studio non è stato letto). La tabella RPE di Tuchscherer e il calcolo Epley danno circa **2,3-3,0% per punto** (par. 1.3); un titolo del forum di Barbell Medicine dice che «5% per 1 RPE non funziona» (solo titolo). *Adotta:* 2,5-3% per punto, tetto 6% (due punti): vedi AUT-01. Il +4% è sopra la tabella e, con RIR stimato con errore di 1 ripetizione, rischia di far saltare il carico troppo.

**F. Cos'è un «livello».** NSCA/Helms (mesi di allenamento regolare, LIV-01), Barbell Medicine (velocità di progressione sostenibile, non carico), Symmetric Strength / Strength Level (multipli del peso o percentili). *Adotta:* la velocità di progressione per esercizio è l'unica misura già disponibile nell'app e coincide con la definizione di Barbell Medicine (PGR-01); `STANDARD_FORZA` serve come controllo di coerenza (STD-01), non come definizione.

**G. Formule del 1RM.** Epley, Brzycki, Lombardi sono tutte buone sotto le 10 ripetizioni; sottostimano lo stacco (LeSuer 1997). Il preprint Fitbod migliora la previsione soprattutto su manubri e cavi leggeri (+40%) e quasi nulla sui bilancieri pesanti (+1%): quindi il difetto di Epley riguarda soprattutto serie lunghe e leggere. *Adotta:* Epley, valido da 2 a 10 ripetizioni (12 come massimo assoluto, come oggi).

**H. Test di 1RM.** Affidabile (ICC mediano 0,97) ma rischioso e indolenzente per i principianti. *Adotta:* mai per principianti, over 65, PAR-Q positivo; per gli altri un massimale **stimato** da serie a 3-8 ripetizioni (par. 3.7).

**Dove i praticanti concordano e dove no.** Concordano: si aggiunge peso in modo sistematico; i principianti salgono a ogni seduta, poi a ogni settimana, poi a ogni ciclo; l'autoregolazione è più utile da intermedi in poi; gli isolamenti salgono con la doppia progressione; dopo fallimenti ripetuti si scarica il 10% (StrongLifts) o si cambia schema (Starting Strength: dopo 1-2 scarichi senza ripresa si passa al settimanale). Non concordano: la velocità iniziale (Rippetoe contro SBS e Barbell Medicine, punto D), il valore del RPE per punto (punto E) e il ruolo dei livelli. **Non coperti** da questa ricerca: Candito, Sheiko, Zourdos oltre alla scala RIR-RPE.

## 3. Numeri per il generatore

Tutti i valori sono **default proposti** (Convenzione) pensati per convergere con le fonti del par. 1.4 e per stare nei parametri `COACH_PARAMETRI` (`js/coach/parametri.js`). Nessuno è validato da studi: vanno confrontati con lo storico reale degli utenti dell'app.

### 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento)

Tre «scale» di tempo, come nei programmi noti (1.4): **S1 a ogni seduta riuscita**, **S2 una volta a settimana** (intervallo minimo 7 giorni tra due aumenti dello stesso esercizio), **S3 una volta per blocco** (intervallo minimo 21 giorni, in pratica a inizio blocco). La scala dipende dalla **velocità reale** su quell'esercizio (par. 3.8), con il livello del profilo come punto di partenza.

| Classe di esercizio | Passo minimo | S1 principiante | S2 intermedio | S3 avanzato | Tetto per aumento |
|---|---|---|---|---|---|
| Bilanciere gambe (squat, front squat, stacco rumeno, hip thrust) | 2,5 kg | 4% (circa +2,5 kg a 60 kg, +5 kg da 125 kg) | 2% (minimo 2,5 kg) | 2,5-3% (circa +5 kg) | 5 kg |
| Stacchi da terra e trap bar | 2,5 kg | 5% | 2,5% | 2,5-3% (circa +5 kg) | 5 kg |
| Bilanciere parte alta (panca, military, rematore, lento avanti) | 2,5 kg (1 kg con microdischi) | 2,5% | 1,5-2% | 2,5% (circa +2,5 kg) | 2,5 kg |
| Manubri multiarticolari (panca, lento, rematore, affondi) | 1 kg per manubrio sotto 10 kg, 2 kg sopra | 4% | 2% | per blocco | 1 passo (2 se RPE molto basso) |
| Macchine e cavi multiarticolari | passo dello stack (2,5 kg di default) | 5% | 2,5% | per blocco | 5 kg |
| Isolamenti (macchine, cavi, manubri) | 1-2,5 kg | doppia progressione sempre (+1 ripetizione fino alla cima del range, poi un passo) | come S1 | come S1 | 1 passo |
| Corpo libero | - | +1 ripetizione fino a 12-15, poi variante più difficile o zavorra (PGR-03) | idem | idem | - |

Regole collegate:
- **Passo troppo grosso** (passo minimo oltre il 5% del carico, oltre l'8% se macchina o manubri con salti di 2 kg): prima ripetizioni dentro il range (cima del range = bersaglio + 3 per i multiarticolari, + 4 con passo oltre l'8%), poi il passo. Estende i «micro-incrementi» di CAR-06 (oggi tetto + 2) (PGR-02).
- **Sesso ed età**: le percentuali valgono per tutti (la meta-analisi 2024 vede poca influenza di sesso ed età sul rapporto ripetizioni/%1RM, par. 1.3); gli kg assoluti si adattano da soli perché dipendono da `L`. Resta il dimezzamento esistente per modalità prudente, over 65 e sonno scarso (`incrementoPer(nome)/2`).
- **Esempi**: squat 60 kg principiante, 4% = 2,4 kg → +2,5 kg; squat 120 kg intermedio, 2% = 2,4 → +2,5 kg; squat 150 kg avanzato, 2,75% = 4,1 → +5 kg a inizio blocco; panca 30 kg principiante, 2,5% = 0,75 kg → passo minimo 2,5 kg = 8%: prima ripetizioni (cima del range), poi +2,5 kg (o +1 kg con microdischi); stacco 100 kg principiante, 5% = 5 kg → +5 kg.
- **Tempi attesi** (per messaggi, non per promesse): principiante da 2 a 6 mesi di salita a ogni seduta o quasi (SBS; i riassunti su Starting Strength dicono «3-6 mesi per la maggior parte»), poi settimanale, poi a ciclo di 4 settimane. Un solo riassunto di terzi attribuisce a Nuckols «circa 5 lb a settimana da intermedio e 5 lb al mese da avanzato» (fonte unica, Convenzione).

### 3.2 Quando tenere, ripetere, scaricare o riportare indietro

| Situazione dell'ultima volta | Azione | Stato nel codice | Forza |
|---|---|---|---|
| Tutte le serie complete, RPE medio nel bersaglio (entro 0,5) | un aumento della scala in vigore (3.1) | CAR-06 (+incremento fisso) | Convenzione |
| Tutte complete, RPE medio di 1 o più **sotto** il bersaglio | aumento di 1-2 passi, convertito dal RPE (AUT-01): circa 2,5-3% per punto, tetto 6%; mai meno di un passo | CAR-06: +4% per punto, tetto 10% | Convenzione |
| Tutte complete, RPE medio di 1 o più **sopra** il bersaglio | stesso carico («consolida»); due volte di seguito: passare alla scala più lenta (S1→S2→S3) | CAR-06 solo la prima parte | Convenzione |
| Serie complete tranne l'ultima, o una serie sotto di 1 ripetizione | tenere il carico, +30/45 s di pausa (RIC-02), puntare a più ripetizioni | CAR-09, RIC-02 | Convenzione |
| Più serie mancate o ripetizioni sotto di 2 o più | ridurre subito 5% (principiante) o 7,5-10% (altri): stesso trattamento della calibrazione CAR-17 | oggi solo dopo il **secondo** mancato (CAR-07) | Convenzione |
| Secondo mancato di seguito sullo stesso peso | principiante: -5% (come oggi); stallo ripetuto: schema 5x3 poi 6x2 e 10x1 (GZCLP, come oggi); altri: -10% | CAR-07 | Convenzione (StrongLifts: 3 mancati = -10%; Starting Strength: 1-2 scarichi, poi si cambia scala) |
| Massimale stimato in calo di oltre il 3% (rumore del RIR) per due sedute | scarico mirato -10% e metà serie sull'esercizio | CAR-08: «strettamente in calo» senza soglia | Convenzione, calcolo mio (par. 3.5) |
| Fine blocco (3a o 5a settimana di carico) | scarico di programma con dose dalla fatica | PRG-01, CAR-03 | Moderata (Bell 2024, già in repo) |
| Pausa da quell'esercizio | -10% / -20% / -30% / -50% per 10-20 / 21-28 / fino a 90 / oltre 90 giorni | CAR-04 | Convenzione (SBS, già in repo) |

### 3.3 Dal RIR o RPE al carico della seduta dopo

1. **Mappa RPE → RIR**: RIR = 10 - RPE (Zourdos 2016, Helms 2016). Si considera attendibile solo con **RIR da 0 a 4** (oltre, l'errore cresce: Remmert 2023; Halperin 2022) e **12 ripetizioni o meno** (Halperin 2022). Fuori da questi limiti l'RPE non cambia il carico.
2. **Massimale stimato dalla serie**: `e1RM = carico x (1 + (ripetizioni + RIR) / 30)` (Epley con RIR aggiunto).
3. **Carico bersaglio**: `carico = e1RM / (1 + (ripetizioni bersaglio + RIR bersaglio) / 30)`. Esempio: 5 ripetizioni a RPE 8 con 100 kg → e1RM 123,3 → per 5 ripetizioni a RPE 9: 102,8 kg (+2,8%). A 10 ripetizioni un punto di RPE vale circa 2,4%, a 3 ripetizioni circa 2,9%.
4. **Tetto**: al massimo 2 punti di RPE (circa 6%) in un colpo solo; il passo minimo dell'attrezzo è il pavimento. Con errore di 1 ripetizione (circa 3% sul massimale) non ha senso inseguire variazioni più piccole.
5. **Principianti**: l'RPE può solo frenare (consolida), salvo la calibrazione delle prime 3 sedute di un esercizio (CAR-16): tetto +10% gambe, +7,5% parte alta.

### 3.4 Range di ripetizioni per obiettivo (doppia progressione: si sale di carico quando tutte le serie arrivano alla cima)

| Obiettivo | Multiarticolari pesanti (bilanciere) | Macchine e manubri | Isolamenti | Note |
|---|---|---|---|---|
| Forza | 3-6 (bersaglio 5, cima 6; 4-6 per chi è oltre S1), RIR 1-3, carico 80% o più di 1RM | 6-10 | 8-12 | ACSM 2026 e ricerca precedente: per la forza servono carichi alti; serie AMRAP finale solo da intermedio in su |
| Massa | 6-10 (bersaglio 8, cima 10-11) | 8-12 | 10-15 | tutti i carichi dal 30% al 100% vanno bene se vicini al cedimento (ACSM 2026, già in repo) |
| Principiante / salute | 8-12 | 10-15 | 12-15 | almeno 3 RIR, 60-80% di 1RM, stop alla prima perdita di tecnica (SBS) |
| Dimagrimento | 8-12 | 10-15 | 12-15 | come massa, meno pausa |
| Over 65 / PAR-Q positivo | 8-12 a 60-80% | 10-15 | 12-15 | come oggi (PRG-19), RIR 3-4 |

La cima del range di un multiarticolare è oggi bersaglio + 2 (isolamenti + 3): resta; il tetto + 2 si alza a + 4 solo se il passo è oltre l'8% del carico (3.1).

### 3.5 Massimale stimato (e1RM): formula, intervallo valido, rumore

- **Formula**: Epley, `carico x (1 + ripetizioni / 30)`, come oggi (`e1rmSerie`). **Intervallo valido**: da 2 a 10 ripetizioni (da 11 a 12 con peso dimezzato nelle decisioni); sopra 12 non si calcola (come oggi). Brzycki e Epley sono entrambi accettabili sotto 10 ripetizioni (LeSuer, Sport Sci Health 2025). Per lo stacco da terra le equazioni sottostimano: **non** correggere.
- **Con RPE registrato** si usa «ripetizioni + RIR» al posto delle ripetizioni (3.3). Motivo: oggi `e1rmSerie` conta solo le ripetizioni fatte, quindi sale da sola di circa 2,4-2,9% per ogni ripetizione in meno di riserva. Nei mesocicli avanzati con RIR 3-2-1-0 (PRG-38) il massimale «sale» di circa il 9% in 4 settimane **senza** guadagno di forza: falsa i conteggi di STA-01, CAR-08 e CIC-01 (quota con crescita oltre il 2%).
- **Rumore**: ±1 ripetizione di errore sul RIR vale circa ±2,4-2,9% sul massimale. Sotto circa il **3%** una differenza non è distinguibile dall'errore. Conseguenze: STA-01 (fermo) e CAR-08 vanno valutati su finestra di almeno 3 sedute con confronto del **migliore di due sedute**, non della singola serie migliore (la serie migliore tra quelle fatte distorce al rialzo); CIC-01 conta un esercizio «in salita» solo oltre il 3%, non il 2%. Calcolo derivato dalla formula di Epley (non dalle fonti).

### 3.6 STANDARD_FORZA: proposta (LIV-02)

Il codice (`js/coach/repertorio.js`, righe 13-17) contiene già cinque soglie per squat, stacco, panca e military, per uomini e donne, ma **nessuno le usa** (`trova STANDARD_FORZA`: nessun chiamante). Il controllo con le ancore viste dà un esito rassicurante: i valori esistenti sono **coerenti** con le due ancore «non allenato» di Symmetric Strength e con i livelli di Strength Level (par. 1.5). Perciò la proposta **non cambia i numeri esistenti** dove trovano riscontro, ne corregge la semantica e ne aggiunge due righe a bassa sicurezza.

Soglie = rapporto 1RM / peso corporeo da raggiungere per entrare nel livello; livelli 1-5 = untrained, novice, intermediate, advanced, elite nello schema di Symmetric Strength e di Strength Level.

| Alzata | Sesso | Soglie esistenti (1 → 5) | Riscontro visto | Esito |
|---|---|---|---|---|
| Squat | M | 0,50 / 1,00 / 1,50 / 2,00 / 2,50 | non allenato medio 0,75 (Symmetric): tra livello 1 e 2; un'altra app: 0,50 / 1,00 / 1,75 / 2,50 / 3,00 (livelli 3-5 più alti) | Tenere; livelli 3-5 più bassi di altre app: serve un controllo con i dati |
| Squat | F | 0,50 / 0,75 / 1,25 / 1,50 / 2,00 | non allenata media 0,62: tra livello 1 e 2 | Tenere; livello 1 uguale agli uomini: valutare 0,40 |
| Stacco | M | 0,75 / 1,25 / 1,75 / 2,25 / 2,75 | non allenato medio 0,86; un'altra app: 1,00 / 1,35 / 1,75 / 2,25 / 2,75 | Tenere (livelli 3-5 identici a un'altra app) |
| Stacco | F | 0,50 / 1,00 / 1,50 / 2,00 / 2,50 | non allenata media 0,73: tra livello 1 e 2 | Tenere |
| Panca | M | 0,50 / 0,75 / 1,25 / 1,50 / 2,00 | non allenato medio 0,56; Strength Level a 57 kg: 0,60 / 0,87 / 1,19 / 1,58 / 1,99 | Tenere: ottimo riscontro (a pesi più alti i rapporti tendono a scendere: validità consigliata 55-110 kg) |
| Panca | F | 0,35 / 0,50 / 0,75 / 1,00 / 1,25 | non allenata media 0,42: tra livello 1 e 2 | Tenere |
| Military | M / F | 0,35 / 0,55 / 0,75 / 1,00 / 1,25 e 0,20 / 0,35 / 0,50 / 0,65 / 0,80 | nessun riscontro visto | Convenzione: circa 0,6-0,7 volte la panca |
| Rematore con bilanciere | M / F | non presente | nessun riscontro visto (NV) | Proposta di lavoro: circa 0,8 volte la panca dello stesso livello (regola pratica, NV) |
| Trazioni alla sbarra (ripetizioni stretto) | M / F | non presente | nessun riscontro visto (NV) | Proposta di lavoro, da verificare: M 1 / 5 / 10 / 15 / 20; F 0 (assistite) / 1 / 3 / 6 / 10 |

**Uso corretto** (STD-01): il livello non si decide dai multipli (Barbell Medicine: non è il carico a definire il principiante; LIV-01: «livello = quanto e come ti alleni»). I multipli servono a **bloccare errori**: «Aggiorna il livello» solo se LIV-01 è già positivo **e** almeno 2 delle 4 alzate raggiungono la soglia 3 (intermedio) o 4 (avanzato); se un avanzato dichiarato non raggiunge la soglia 2 su nessuna alzata, proporre di rivedere il livello o il peso di partenza. Il peso corporeo da usare è quello del profilo; fuori da 55-110 kg (uomini) e 45-90 kg (donne) il confronto è solo indicativo.

### 3.7 Quando proporre un test di forza

- **Mai un 1RM** per principianti (meno di circa 3 mesi regolari), over 65, PAR-Q positivo, dolore attivo o scarico. Motivi: indolenzimento e danno muscolare importante, rischio di infortunio con carichi molto alti, tecnica ancora instabile; chi è poco esperto migliora tra una prova e l'altra (Sports Med Open 2020, riassunto).
- **Intermedi**: nessun test. Il massimale si stima ogni settimana da una serie a 3-8 ripetizioni con RIR dichiarato (3.3-3.5); la serie AMRAP finale dei metodi che la usano è già un test.
- **Avanzati**: test opzionale **una volta a fine blocco**, la settimana dopo lo scarico, solo con bilanciere, rampa di riscaldamento e sicurezza (rack o spotter); meglio un **5RM** (previsione più accurata, rischio minore) che un 1RM.
- Il test a 10RM è proposto in letteratura come alternativa più sicura per i non allenati (PMC11441898, titolo): possibile per la **taratura iniziale** di un esercizio nuovo, in aggiunta alla stima dai dati del corpo (PAR).

### 3.8 Decisione: lineare, doppia progressione o onda, per livello

| Livello (misurato) | Multiarticolari pesanti | Macchine e manubri | Isolamenti | Settimana |
|---|---|---|---|---|
| **Principiante** (aumenta a ogni seduta o quasi; fino a circa 2-6 mesi) | Progressione lineare S1 (3.1), RIR 3 o più, mai autoregolazione che accelera | doppia progressione | doppia progressione | Full body 2-3 volte; stessi carichi in tutte le sedute |
| **Intermedio** (aumenta ogni 1-4 settimane) | S2 con RPE come freno e acceleratore (AUT-01); alternanza pesante / media / leggera nella settimana (onda giornaliera) | doppia progressione | doppia progressione | Upper / Lower / Full Body o PHUL (già così) |
| **Avanzato** (aumenta a blocchi) | S3: salto a inizio blocco, dentro il blocco RIR che scende (PRG-38), AMRAP di appoggio; stallo → cambio variante (STA-02) | doppia progressione | doppia progressione | blocchi di 3-5 settimane + scarico |

**Come si misura la scala (PGR-01)**: per ogni esercizio, delle ultime 6 volte in cui compare, quante hanno dato un aumento. Cinque o sei → S1; da 2 a 4 → S2; una o nessuna → S3. In mancanza di storia (meno di 3 volte) vale il livello del profilo (principiante S1, intermedio S2, avanzato S3). Una sola classe di esercizio alla volta: l'utente può essere S1 sullo squat e S2 sulla panca (Barbell Medicine: il principiante è tale per esercizio, non per persona; le stesse persone fermano prima la panca dello squat).

### 3.9 Tapering e settimana di test

**Non verificato in questa sessione** (Bosquet 2007, Mujika, la meta-analisi sul tapering nella forza non sono stati ritrovati: tetto di ricerca esaurito). La consegna indica «ridurre il volume del 40-60% e mantenere intensità e frequenza» per 7-14 giorni: coerente con la dose di scarico di CAR-03 (volume -50% con carico -10%) a parte il carico, che nel taper resta invariato. **Non diventa regola** finché non si ritrova la base (par. 5, domanda 2). Fino ad allora il test a fine blocco (3.7) si fa dopo la settimana di scarico già prevista.

## 4. Regole proposte

Codici controllati con `grep` su `docs/coach-mappa-regole.md` e su `js/`: **PGR, AUT, STD, TAP** sono liberi (usati: ABB, ADE, BIA, BIO, CAR, CIC, COR, DEC, DOL, EPO, ESI, INT, LIV, MET, MOM, ORA, PAR, PRG, PRO, PRZ, PSI, RIC, SAL, SCH, STA, STR, SUG, TEC). Altri sotto-agenti possono aver scelto gli stessi: riconfermare prima di scrivere in `coach-mappa-regole.md`. Tutte spegnibili (`REGOLE_SPEGNIBILI`) e con `regolaAttiva('...')`; nessuna tocca le salvaguardie (principianti e prudenti: nessuna accelerazione; over 65 e dolore: dimezzamento esistente).

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **PGR-01** | A ogni calcolo del carico di un esercizio con peso | Sostituisce l'incremento fisso con `max(passo minimo, % x carico)`, arrotondato all'attrezzo, con tetto, e fa valere la scala S1 / S2 / S3 con intervallo minimo 0 / 7 / 21 giorni tra aumenti (par. 3.1, 3.8) | «Aumento del 4%: sali di 2,5 kg perché stai migliorando a ogni seduta» / «Ti alleni da tempo su questo esercizio: aumento a settimana, non a ogni seduta (Barbell Medicine, Stronger By Science)» | Convenzione (convergenza di 4 fonti di livello 2-3, nessun RCT) | Aumenti più lenti del solito per intermedi: intenzionale. Nessun aumento con BIA in calo (PRO-04), nessuno nello scarico. Prudente, over 65, sonno scarso: metà come oggi | `incrementoPer` in `js/coach/carichi/progressivo.js:18` (nuova firma con carico e scala); chiamanti: `regole-ricerca.js:154`, `dolore-mattina.js:64`, `js/dati/scheda-unica.js:26`; parametri in `COACH_PARAMETRI` |
| **PGR-02** | Passo minimo dell'attrezzo oltre il 5% del carico (oltre l'8% con manubri o macchine a salti di 2 kg) | Prima ripetizioni dentro il range (cima = bersaglio + 3, o + 4 con passo oltre l'8%), poi il passo e si riparte dal bersaglio | «Un salto di 2 kg sono il 10%: prima una ripetizione in più» | Convenzione (estende CAR-06, SBS «non salire solo perché puoi») | Nessuno: è più prudente | `caricoProssimoBase`, ramo micro-incrementi (`regole-ricerca.js:191-201`) |
| **PGR-03** | Corpo libero con tutte le serie complete e ripetizioni già a 12-15 | Smette di aggiungere ripetizioni: propone la variante più difficile (es. piegamenti con mani rialzate in meno, a un braccio, con zavorra) o, se non c'è, pausa o tempo lento | «Hai superato le 15 ripetizioni: ora una variante più difficile o un tempo più lento dà più stimolo di altre ripetizioni» | Convenzione (NV: nessuna fonte vista; pratica standard del corpo libero) | Oggi CAR-05 aggiunge +1 ripetizione **senza limite**: oltre le 20 la serie diventa resistenza, non forza | `caricoProssimoBase`, ramo corpo libero (`regole-ricerca.js:146-150`); `STA-02` (cambia variante) per la variante |
| **PGR-04** | Mancato (una o più serie non fatte) | Mancato lieve (solo l'ultima serie, o 1 ripetizione): tiene il carico e passa alla scala più lenta; mancato grave (più serie o 2 o più ripetizioni sotto): -5% (principiante) o -7,5% (altri) già al **primo** mancato; il «-10%» dopo due mancati resta | «Quasi: stesso peso, aumenti più piccoli» / «Serie molto sotto: tolgo il 5% e si risale» | Convenzione (StrongLifts: 3 mancati; Starting Strength: 1-2 scarichi; CAR-17 già lo fa in calibrazione) | Un calo troppo duro si recupera in 1-2 sedute; mai sotto -10% | `caricoProssimoBase` righe 205-221 (`regole-ricerca.js`), CAR-07/09/17 |
| **AUT-01** | Serie con RPE registrato (RIR da 0 a 4, 12 ripetizioni o meno) | Calcola il carico bersaglio con Epley inverso (3.3): circa 2,5-3% per punto di RPE, al massimo 2 punti (circa 6%), mai meno di un passo; principianti: solo freno | «Serie facili (RPE 6, bersaglio 8): +2,8% per punto, +5,6 kg» | Convenzione (tabella RPE di Tuchscherer/Helms ≈ Epley con RIR; RIR stimato con errore circa 1 ripetizione: Halperin 2022) | Sostituisce il +4% per punto (tetto 10%): scende il rischio di saltare troppo | `regole-ricerca.js:156-171` (autoregolazione dall'RPE), `rpeBersaglio`, `COACH_PARAMETRI` |
| **AUT-02** | Calcolo del massimale (STA-01, CAR-08, CIC-01, `scalaDaStorico`) | `e1rmSerie` usa «ripetizioni + RIR» quando c'è l'RPE; confronta il migliore di due sedute; ignora variazioni sotto il 3% | «Il massimale stimato cambia di meno del 3%: è nel margine di errore della stima» | Convenzione, calcolo derivato da Epley e dall'errore RIR di circa 1 ripetizione (Halperin 2022) | Meno falsi «fermo» e meno falsi «in salita» nei blocchi con RIR che scende (PRG-38) | `e1rmSerie`, `e1rmSeduta` (`regole-ricerca.js:86-87`), `eserciziFermi` (`repertorio.js:137`), `verdettoCiclo` (`repertorio.js:~390`), CAR-08 |
| **STD-01** | Calcolo del livello stimato (LIV-01) con almeno 6 sedute registrate | Confronta i massimali stimati con `STANDARD_FORZA` (3.6): propone «Aggiorna il livello» solo se LIV-01 e almeno 2 alzate su 4 concordano; se un livello dichiarato è molto sopra i numeri, suggerisce di rivederlo | «Hai raggiunto il livello intermedio in squat e stacco, e ti alleni da più di 6 mesi: aggiorniamo il livello?» | Convenzione (standard di livello 3; LIV-01 resta il criterio primario) | Può spingere un livello più alto del giusto: perciò richiede **due** segnali. Peso corporeo fuori 55-110 kg (M) o 45-90 kg (F): solo indicativo | `livelloStimato` e `STANDARD_FORZA` in `js/coach/repertorio.js:13-54` |
| **STD-02** | Richiesta di «testa il massimale» o proposta di fine blocco | Principianti, over 65, PAR-Q positivo, dolore, scarico: mai 1RM, solo serie a 5-10 ripetizioni con e1RM; intermedi: nessun test (AMRAP); avanzati: test opzionale a fine blocco con 5RM | «Per stimare la tua forza non serve il massimale: una serie da 5-8 ripetizioni dà lo stesso numero con meno rischio» | Moderata (rassegna sistematica del 1RM, riassunto; sicurezza coerente con ACSM) | Priorità alle salvaguardie esistenti | UI test: nuovo file (riga in `index.html` + `npm run sw`); dati da `e1rmSeduta` |
| **TAP-01** | Solo avanzati con data di test/gara dichiarata | Ultima settimana: serie -40-60%, carico e frequenza invariati | «Scarico pre-test: stesso peso, metà volume» | Convenzione **(non verificata: NV)**; da lasciare spenta | Nessuna base letta in questa sessione | `fasiProgramma` (`js/coach/programma/motore.js:21`) |

## 5. Domande aperte

Per ogni voce: **cosa decide nel generatore** e **query da lanciare** (con `allowed_domains` PubMed/PMC o dei siti degli esperti).

1. **Percentili reali di forza** (STD-01, STANDARD_FORZA): serve una fonte primaria e non una pagina di terzi. Query: «OpenPowerlifting raw squat bench deadlift bodyweight ratio percentile age sex», «Symmetric Strength standards squat male 180 lb novice intermediate», «Strength Level standards by bodyweight methodology». Anche rematore e trazioni, oggi senza riscontro.
2. **Tapering e peaking** (TAP-01): Bosquet 2007 e Mujika (indicati nella consegna, non ritrovati), meta-analisi sul tapering nella forza. Query: «Bosquet 2007 tapering meta-analysis performance», «tapering resistance training strength meta-analysis».
3. **RPE per punto di carico**: il codice cita Helms 2018 per il +4%; PMID 29786623 («Rating of Perceived Exertion as a Method of Volume Autoregulation Within a Periodized Program») e PMID 29628895 sono visti solo come titolo. Leggerne i risultati (AUT-01).
4. **Tabelle %1RM per ripetizioni** (par. 1.3): serve la tabella completa 5-95% di PMC10933212 per squat, stacco e panca (decide la mappa carico → ripetizioni di `esercizi` pesanti; oggi non c'è).
5. **Frequenza e volume per la forza, per alzata** (PRG-25, PRG-28): Grgic 2018 (frequenza) e Ralston 2017 (volume) sono citati solo a memoria della consegna, non verificati. Query: «resistance training frequency strength gains meta-analysis», «weekly set volume muscular strength meta-analysis».
6. **Riposo per la forza**: già in repo (Schoenfeld 2016, Singer 2024); non riverificato qui.
7. **Punti deboli e accessori** (PRG-23, alternative per esercizio): sticking point di squat, panca, stacco; varianti con pausa, tempo, box, deficit, front squat, stacco rumeno, presa stretta. Nessuna ricerca eseguita.
8. **Tecnica per antropometria** (`js/coach/biomeccanica.js`): ampiezza della posizione, presa, lunghezza del femore: separare evidenza e tradizione. Nessuna ricerca eseguita.
9. **Potenza, pliometria e derivati olimpici** per popolazione generale e over 65 (PRG-34 usa già «potenza» sul primo multiarticolare dell'over 65). Query: «power training older adults meta-analysis», «Olympic weightlifting derivatives vs traditional training».
10. **Corpo libero e kettlebell**: progressioni di piegamento, trazione, squat con variante; soglia di ripetizioni oltre cui passare a una variante (PGR-03). Query: «push-up progression strength training», «kettlebell training strength meta-analysis».
11. **Forza di presa, equilibrio, mobilità come prerequisiti** (salute, over 65): «grip strength mortality PURE», «ankle dorsiflexion squat depth», test funzionali. Nessuna ricerca eseguita.
12. **Programmi minimi a 2-3 giorni** (dose minima efficace per la forza): query «minimal dose resistance training once per week strength», «single set versus multiple sets strength».
13. **Livelli dell'app** (PAR-02): i moltiplicatori 1 / 1,3 / 1,6 per livello vengono applicati sopra la massa muscolare (e forse la contano due volte). Confrontarli con lo storico reale: è una decisione di dati, non di ricerca.
14. **Donne e over 65**: nessuna fonte vista sulla velocità di progressione per sesso o per età; le percentuali di 3.1 sono uguali per tutti.
15. **Periodizzazione a blocchi e coniugato** (Issurin, Bartolomei, Simmons): nessuna ricerca eseguita. Il coach non ne ha bisogno finché l'avanzato resta a 12 settimane con 5 + 1.
16. **Programmi noti**: Starting Strength e StrongLifts sono stati letti solo da riassunti di terzi; GreySkull, Candito, Sheiko, Smolov, GZCL, nSuns non sono stati cercati.

## 6. Limiti onesti

- **Rete e budget**: solo WebSearch (WebFetch, curl e browser sono bloccati); la quota di 200 interrogazioni per sessione è finita a 29 interrogazioni utili su questo tema. Quasi ogni fonte è un riassunto di WebSearch: titoli, anni e PMID sono affidabili, i numeri vanno ricontrollati sul testo prima di diventare regole.
- **Nessun numero di questa nota proviene da un testo scientifico letto per intero.** Le cifre di Zourdos 2016 (n = 29, r = -0,88 e -0,77), Halperin 2022 (414 persone), Mann 2010 (n = 23), la meta-regressione 2024 (269 studi) e la meta-analisi 2022 (35 studi) sono nei riassunti dei risultati. Gli autori di PMID 35044672 e PMID 29628895 non compaiono nei riassunti.
- **Programmi per livello e standard di forza**: livello 3 (siti di terzi, repo personali, calcolatori); le tabelle di Strength Level e di Symmetric Strength sono state viste solo come trascrizioni parziali; i dati di Strength Level sono autodichiarati da persone che registrano i carichi.
- **Calcoli miei** (marcati): equivalenza tra tabella RPE e Epley con RIR, 2,4-2,9% per ripetizione, rumore del 3%, esempi di aumento. Sono aritmetica sulla formula, non risultati di studi.
- **Preprint**: Marzagao 2026 (arXiv 2603.17495 / SportRxiv 768) non rivisto; conflitto di interesse (dati dell'azienda che vende l'app).
- **Popolazione**: le meta-analisi su periodizzazione e autoregolazione riguardano in prevalenza giovani maschi sani, spesso atleti universitari; non si estendono a donne, over 65 e a chi si allena a casa senza dirlo.
- **Un tentativo di leggere file di terzi via raw GitHub** è stato interrotto dal sistema di permessi; i file letti sono stati cancellati e non sono stati usati.
