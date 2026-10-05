# Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+)

**Copertura: 18 ricerche web riuscite; il resto da conoscenza del modello.** Il tetto di 200 ricerche per sessione, condiviso con gli altri agenti, si è esaurito a metà lavoro: gli adolescenti sono ben coperti, gli over 65 solo in parte (sarcopenia, dose-risposta, proteine), mentre cadute, potenza, ossa, ipertensione, farmaci, artrosi, cognizione, test funzionali e norme, PAR-Q+/ACSM e le posizioni dei divulgatori **non sono stati cercati** e sono scritti da conoscenza del modello. Ogni riga lo dichiara.

Ambito: come cambiano parametri, tecniche, esercizi, test e soglie di rinvio al medico con l'età, e cosa fa oggi il coach (`js/coach/`, `js/ui/onboarding*.js`). Tocca **PRG-14/18/19/31/34/37**, **CAR-04/06**, **RIC-05**, **ESI-03**, **MET-04**, **INT-01/02**, **PAR-01..05**, **COR-01/03**, il cap. 14 «Salvaguardie» di `docs/coach-mappa-regole.md` e il PAR-Q (7 domande). Codice nuovo proposto: **ETA** (area libera: nessun `ETA-` in `docs/`, `js/`, `tests/` al 2026-10-05). Questa nota **approfondisce l'età** e rimanda, senza ripeterle, a `docs/ricerca-recupero-infortuni-popolazioni.md` (sicurezza generale, REC-06 respiro, REC-10 riscaldamento, REC-11 adolescenti), `docs/ricerca-cardio-nutrizione.md` (NUT-01, niente numeri per <18 e over 65), `docs/ricerca-forza-progressione.md` (1RM, potenza nell'anziano), `docs/ricerca-psicologia-aderenza.md` (CST-11) e `docs/ricerca-metodi-coach-pratici.md` (dose minima, §5.5). Donne e menopausa: **solo rimando** (la nota sulle donne non è ancora in `docs/`; il tema è in `ricerca-recupero-infortuni-popolazioni.md` §4).

Data della ricerca: **2026-10-05**. Canale: solo WebSearch (WebFetch, curl e browser bloccati: `.claude/skills/ricerca-fitness/references/rete.md`). Quello che si legge è il **riassunto del risultato** (titolo, URL, snippet), non lo studio.

**Come si legge.** Provenienza: **[V]** visto nei risultati di questa sessione (titolo, URL, PMID affidabili; numeri di seconda mano, citati come compaiono); **[CM]** «Conoscenza del modello (non verificata sul web)», con forza al massimo «Moderata (da verificare)» o «Convenzione» e intervalli al posto di numeri precisi; **[R]** già nel repo (codice o docs letti). Forza: **Solida** / **Moderata** / **Convenzione**, più la bandiera **Contrastata** (come in `docs/ricerca-struttura-e-intensita.md`). Nelle tabelle dei parametri ogni cella porta forza e provenienza, es. «2-3 · Mod [V]». Nessuna posizione è attribuita a una persona senza una fonte vista.

## In una pagina

1. **Minori.** I pesi sono raccomandati e sicuri se c'è tecnica e supervisione; i casi di fratture della cartilagine di accrescimento si legano a errori, carichi inadatti e assenza di un adulto qualificato [V]. Oggi l'app **non ha un'età minima né regole per i minori** (gap-analysis B24; `onboarding.js:363`): un quindicenne riceve un programma adulto con tecniche al cedimento, consigli su proteine e creatina e, in dimagrimento, su deficit e passi. Proposto: soglia a 14 anni (decisione di prodotto), «profilo minore» senza cedimento né massimali, RIR ≥2, 8-15 ripetizioni, niente numeri su peso, grasso, calorie, proteine e creatina, sonno 8-10 ore, avviso di supervisione (ETA-01..07).
2. **Over 65 sani: troppo limitati.** RIR 3-4 permanente, 8-12 ripetizioni, esigenza bloccata al 100% e nessuna progressione di intensità (cap. 14; `regole-ricerca.js:64`, `ricette.js:202`, `esigenza.js:15`). Le revisioni sulla sarcopenia mostrano miglioramenti di forza e funzione con i pesi (presa +2,95 kg, velocità del passo +0,15 m/s, 5 alzate dalla sedia -1,79 s) [V]; il dose-risposta negli anziani sani indica 2-3 serie per esercizio, 7-9 ripetizioni, 2-3 sedute, riposo 120 s [V]. Proposto: base prudente di 6-8 settimane, poi RIR 2-3 e 6-12 ripetizioni (ETA-08).
3. **Over 65: troppo permissivi dove conta.** Il **drop set a un 68enne** (gap-analysis B3, confermato leggendo `ricette.js:353-368`: il ramo «poco tempo» non guarda l'età); equilibrio ridotto a una frase («5 minuti», `ricette.js:382`) senza esercizi in libreria e con una dose lontana da quella dei programmi anticaduta [CM]; nessuna domanda su cadute, osteoporosi, anticoagulanti; la libreria contiene crunch, sit-up, Russian Twist, Woodchop e Good Morning, che con osteoporosi vanno filtrati [CM]; nessun test funzionale (ETA-10..13).
4. **Il testo del cap. 14 non coincide col codice.** «Aumenti dei carichi dimezzati» per gli over 65: in `regole-ricerca.js:111` `prudente = pc.sonnoMale || pc.prudente`, **senza l'età**; gli aumenti si dimezzano solo con PAR-Q positivo o sonno scarso (verificato leggendo righe 111 e 154).
5. **Dove le fonti non concordano**: massimale nei ragazzi (AAP vecchia vs AAP 2020/Lloyd 2014), carichi dei giovani (dosi moderate vs 80-89% 1RM negli atleti giovani), ipertrofia in adolescenza (effetto piccolo vs controlli passivi, grande vs attivi), creatina sotto i 18 anni, intensità negli anziani (51-69% 1RM «più efficace nel complesso» vs 70-85% delle posizioni), osteoporosi (evitare flessione sotto carico vs LIFTMOR), proteine (resistenza anabolica vs «versioni più vecchie di sé»).

## 1. Cosa dicono le fonti

### 1.1 Minori (13-17)

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Sicurezza e cartilagine di accrescimento | Le fratture della cartilagine di accrescimento nei resoconti di caso si attribuiscono a uso scorretto dell'attrezzo, carico inadatto, tecnica sbagliata o assenza di un adulto qualificato; un programma ben costruito «non dovrebbe stressare in modo eccessivo» le cartilagini; né l'altezza adulta né la lunghezza dei segmenti risultano compromesse nei ragazzi esposti a forze elevate. Titolo di una revisione: «There is no need to avoid resistance training (weight lifting) until physeal closure» | **Solida** (posizioni ufficiali concordi, snippet) | Lloyd e altri 2014, consenso internazionale (Br J Sports Med); PMID 24393806 (titolo e snippet) [V] |
| Età minima | Il consenso 2014 non indica un'età minima: conta che il ragazzo sia pronto fisicamente e mentalmente, in particolare che **sappia seguire le istruzioni**; competenza tecnica nelle abilità di base prima di aggiungere carico esterno | **Solida** | Lloyd 2014 (snippet su pagine che lo riassumono) [V] |
| Posizione AAP | Dichiarazione 2008 «Strength Training by Children and Adolescents» (Pediatrics 121(4):835) e rapporto clinico 2020 «Resistance Training for Children and Adolescents» (Pediatrics 145(6):e20201011), **riconfermato a novembre 2024**: i pesi sono sicuri con supervisione e tecnica corretta; contro powerlifting e bodybuilding agonistici; equilibrio e controllo posturale maturano verso i 7-8 anni | **Solida** | AAP 2008 e 2020 (titoli, snippet) [V] |
| Efficacia sulla forza | Revisione ombrello: efficacia dei pesi nei giovani provata «a livello alto di evidenza» su potenza, sprint e agilità; effetti da medi a grandi sulla forza nei giovani atleti | **Solida** | «Effects of Resistance Training on Physical Fitness in Healthy Children and Adolescents: An Umbrella Review», Sports Med 2020 (PMID 32757164) [V] |
| Dose nei giovani atleti | Meta-analisi su **giovani atleti**: periodo >23 settimane, 5 serie per esercizio, 6-8 ripetizioni, **80-89% di 1RM**, riposo 3-4 minuti risultano i più efficaci per la forza; sopra l'80% con più serie meglio | **Moderata** (atleti, supervisione di allenatore; non è il principiante generico) | «Effects and dose-response relationships of resistance training on physical performance in youth athletes: a systematic review and meta-analysis» (PMID 26851290) [V] |
| Dose raccomandata dalle posizioni | 1-3 serie, 6-15 ripetizioni, 2-3 giorni non consecutivi, istruttore qualificato, rapporto istruttori/ragazzi circa 1:10; carico leggero all'inizio | **Moderata (da verificare)** | NSCA 2009 (aggiornamento della posizione sui giovani), a memoria [CM] |
| Ipertrofia in adolescenza | 23 studi, 1.443 partecipanti: contro controlli **passivi** effetto da trascurabile a piccolo (prepuberi d = 0,16, IC -0,04/0,36; peripuberi d = 0,30, IC 0,01/0,58; postpuberi d = 0,01, IC -0,31/0,33); contro controlli **attivi** grande nei maschi (d = 1,26, IC 0,29/2,22). Nelle ragazze risposta più variabile e aumenti di dimensione minori; nei prepuberi la forza sale soprattutto per adattamenti nervosi | **Moderata + Contrastata** (IC molto larghi) | Sports Med 2026 (s40279-026-02499-0), revisione sistematica e meta-analisi; scoping review PMC12540516 (titolo) [V] |
| Ragazze: prevenzione del crociato | Allenamento neuromuscolare (pliometria, forza, equilibrio, tecnica di atterraggio): riduzione del rischio di lesione del crociato anteriore **40-70%** nelle atlete; sotto i 18 anni **-72%**, sopra i 18 **-16%**; predittori: età, dose, varietà di esercizi, feedback verbale; la costanza (compliance) migliora l'effetto | **Solida** (più meta-analisi concordi) per l'effetto; **Moderata** per il confronto per età (una meta-analisi, snippet) | Meta-analisi PMID 19760399; meta-regressione PMID 27251898; «influence of age...» PMID 23048042; compliance PMC3499896; Sports Med 2025 (s40279-025-02190-w) [V] |
| Infortuni | Nei pesi: sollevamento olimpico 2,4-3,3 infortuni per 1.000 ore, bodybuilding 0,24-1, strongman 4,5-6,1, Highland Games 7,5; negli adolescenti in media 2,64 per 1.000 ore tra gli sport (calcio 7,21). Nei ragazzi le distorsioni e gli strappi da pesi sono meno frequenti che negli adulti; la maggior parte degli infortuni giovanili da pesi è **accidentale** | **Moderata** (sorveglianza, definizioni diverse) | «The Epidemiology of Injuries Across the Weight-Training Sports» (Sports Med 2016); PMC4034275; PMC8125505 [V] |
| Test del massimale | AAP (versione citata dagli snippet): niente sollevamenti massimali ripetuti, il singolo massimale «non raccomandato fino alla maturità scheletrica» e Tanner 5; **AAP 2020**: il test di 1RM «può essere sicuro» con supervisione qualificata e linee guida; studi con 1RM singolo senza infortuni su macchine a misura di bambino. Alternative per chi ha poca esperienza: test a più ripetizioni (RM) | **Contrastata** | Stricker e altri 2020 (Pediatrics 145(6):e20201011); PMC3445252 [V] |
| Steroidi e integratori | Uso di steroidi anabolizzanti: circa 1,6% degli studenti dell'ultimo anno (USA) una volta nella vita; 1,5-5,9% nei maschi delle superiori (USA e Australia); 4-12% nei maschi e 0,5-2% nelle femmine (fonte datata). Integratori per la massa: 12,7% dei ragazzi negli ultimi 3 mesi; in un campione australiano 49,8% proteine in polvere, 8,4% creatina, 4,2% steroidi. Si associano a **insoddisfazione corporea** e ideale muscolare interiorizzato; dismorfia muscolare: 16,2% uso di steroidi nella vita nei ragazzi australiani con diagnosi | **Moderata** (sondaggi, stime molto diverse) | PMC10516554; PMC7043030; PMC4856064; PMC12893016; Springer 2025 (s40337-025-01435-3) [V] |
| Disturbi alimentari e RED-S | L'adolescenza è un periodo vulnerabile a disturbi alimentari e bassa disponibilità energetica; screening: storia guidata (attività, infortuni, dieta, **ciclo mestruale**); DESA-6 (6 item, sensibilità 92%, specificità 85,96% contro il colloquio clinico); in ginnaste adolescenti il 20,2% supera la soglia dell'EDE-Q | **Moderata** (atlete, strumenti per sport) | PMC9724109; PMC7885388; PMC12114068 [V] |
| Sonno | Atleti adolescenti con **meno di 8 ore** per notte: rischio di infortunio **x1,7** (altro studio su 122 atleti: +65%); l'AASM raccomanda **8-10 ore**; gli atleti adolescenti ne fanno in media circa 6,3 | **Moderata** (osservazionale) | PMC9496483; PMC10745648; PMC9960533 [V] |
| Creatina | Posizione ISSN: con precauzioni e supervisione accettabile negli atleti adolescenti, alternativa a farmaci anabolizzanti; «nessuno studio ha mostrato effetti avversi nei bambini»; l'avviso «sotto i 18 anni no» sulle confezioni è una cautela **legale**. Ma nello stesso riassunto: «nessuno studio pubblicato» sulla sicurezza in giovani atleti sani | **Contrastata** | ISSN 2017 (PMC5469049); PMID 30547033; PMC7922146 [V] |
| Competenza tecnica | Esiste una batteria di abilità di sollevamento per adolescenti («Resistance Training Skill Battery»), adattata e validata in cinese; **solo titolo visto** | **Convenzione** (titolo) | PMC12713556 [V] |
| Crescita, picco di velocità e dolori da crescita | Fasi di crescita rapida con maggiore rischio di dolori da trazione tendinea (ginocchio sotto la rotula, tallone) e di sovraccarico; programmazione secondo maturazione | **Convenzione** | Conoscenza del modello (non verificata sul web) [CM] |

### 1.2 Giovani adulti (18-29) e 30-49

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Popolazione di riferimento | La maggior parte delle meta-analisi su volume, frequenza e carichi riguarda **giovani maschi sani**: per questa fascia valgono le note già in `docs/` (struttura, ipertrofia, forza) | **Solida** per i giovani adulti, bandiera rossa per le altre età | [R] `ricerca-struttura-e-intensita.md`, `ricerca-ipertrofia-programmazione.md` |
| Dismorfia muscolare e steroidi fino ai giovani adulti | Il problema non finisce a 18 anni: revisioni su dismorfia muscolare in adolescenti **e giovani adulti**; intenzione di usare steroidi in ragazzi e uomini con probabili disturbi alimentari e dismorfia | **Moderata** | PMC12893016; Springer 2025 (s40337-025-01435-3) (titoli e snippet) [V] |
| Maturazione fino ai 25 anni circa | Massa ossea e sistema muscolo-scheletrico completano la maturazione fino alla fine dell'adolescenza e oltre; il picco di massa ossea arriva verso i 20-30 anni | **Convenzione** | Conoscenza del modello [CM] |
| Calo di massa muscolare dopo i 30-40 | Perdita lenta, ordine di grandezza **3-8% per decennio** dopo i 30 (numeri da verificare); la forza cala meno della massa fino ai 50 anni | **Moderata (da verificare)** | Conoscenza del modello [CM] |
| Poco tempo (30-49: lavoro, figli, stress) | Dosi minime: poche serie ben fatte 2 volte a settimana mantengono e aumentano forza; attività di rinforzo muscolare associata a **circa 10-20% di mortalità in meno** con 30-60 minuti a settimana (osservazionale) | **Moderata (da verificare)** | Iversen 2021 (revisione sul tempo), Momma 2022 (Br J Sports Med), a memoria [CM]; matrice minuti x giorni in `ricerca-metodi-coach-pratici.md` §5.5 [R] |
| Stress, sonno e momenti di vita | Già coperti da prontezza (PRZ), momenti di vita (MOM) e dalla nota sulla psicologia; nessuna regola per età | n.d. | [R] |
| Tendini | I problemi tendinei diventano più frequenti dai 35-40 anni; riscaldamento progressivo e carico graduale | **Convenzione** | Conoscenza del modello [CM] |

### 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Ritmo di perdita | Dopo i 50 anni la forza cala più della massa; ordine di grandezza **1-3% l'anno** (più veloce dopo i 60); la **potenza** cala prima e più della forza | **Moderata (da verificare)** | Conoscenza del modello [CM] |
| Resistenza anabolica | La risposta della sintesi proteica a una dose di proteine è **spostata a destra** con l'età e l'inattività: giovani 0,24 g/kg/pasto, anziani **0,40 g/kg/pasto** (circa 30-40 g); dopo i pesi 20 g bastano nei giovani allenati, fino a 40 g negli anziani non allenati | **Moderata** (sintesi acuta, esiti indiretti) | «Skeletal muscle protein metabolism in the elderly: Interventions to counteract the "anabolic resistance" of ageing» (PMC3201893); PMC11333332 [V] |
| Proteine al giorno | Con 2 sedute a settimana di pesi progressivi, **1,0-1,3 g/kg/giorno** riducono la perdita di massa legata all'età e sembrano ottimizzare la funzione fisica | **Moderata** (revisione) | «Protein Requirements and Recommendations for Older People: A Review» (PMC4555150) [V] |
| Atleti master | Titolo di una revisione sui master: «Just Older Versions of Their Younger Selves» (contenuto non visto: probabile sostegno a fabbisogni relativi simili ai giovani) | **Convenzione** (solo titolo) | PMC8566396 [V, solo titolo] |
| Menopausa | Fuori ambito qui: **solo rimando** alla nota sulle donne (osso, ormoni, forza) | n.d. | - |

### 1.4 65-74 e 75+: forza, potenza, cadute, ossa

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Sarcopenia | Più meta-analisi 2025-2026: i pesi migliorano **forza e funzione**; effetto sulla **massa** limitato. Differenze medie: presa +2,95 kg, velocità del passo +0,15 m/s, massa appendicolare +0,25 kg/m², 5 alzate dalla sedia -1,79 s; dose «ottimale» 1.220 MET-min/settimana per la presa, «minima efficace» 600 MET-min/settimana per la velocità del passo | **Solida** (forza e funzione), **Moderata** (massa; dosi: modello bayesiano singolo) | BMC Geriatrics 2026 (PMID 42304276); Eur Rev Aging Phys Act 2025 (s11556-025-00399-2); PMC12883749 [V] |
| Dose-risposta | Meta-analisi su anziani sani: più efficaci nel complesso **50-53 settimane**, **3 sedute** a settimana, **2-3 serie** per esercizio, **7-9 ripetizioni**, **51-69% di 1RM**, tempo sotto tensione 6,0 s, **riposo 120 s**, 2,5 s tra le ripetizioni; per la sola forza **2 sedute** a settimana e 4,0 s tra le ripetizioni. Limiti dichiarati: qualità metodologica scarsa, forte eterogeneità; la morfologia (massa) solo su nove studi | **Moderata** (qualità bassa) | Borde, Hortobágyi, Granacher 2015 (Sports Med, PMID 26420238) [V] |
| Volume settimanale | Esiste una revisione sul **numero di serie settimanali** e la risposta della massa muscolare negli anziani; contenuto non visto | **Convenzione** (titolo) | PMID 34658936 [V, solo titolo] |
| Pesi pesanti negli anziani | Carichi alti (circa 70-85% di 1RM, fino all'80% in uno studio storico su ultranovantenni in casa di riposo) sono stati usati senza problemi se supervisionati; le posizioni professionali (NSCA 2019) raccomandano progressione fino a carichi elevati più lavoro di potenza (citate dalla gap-analysis, da verificare) | **Moderata (da verificare)** | Fiatarone 1990/1994, Fragala 2019 (NSCA), a memoria [CM]; [R] gap-analysis §14 |
| Potenza | Allenare la velocità della fase concentrica con carichi leggeri-moderati (circa 30-70% di 1RM) migliora la funzione quanto o più della forza «lenta»; la potenza cala prima della forza | **Moderata (da verificare)** | Meta-analisi sulla potenza negli anziani, a memoria [CM]; [R] `ricerca-forza-progressione.md` (30-70%) |
| Cadute | L'esercizio riduce il **tasso di cadute di circa un quinto-un quarto**; programmi con equilibrio e funzione (tipo **Otago**, circa un terzo in meno nelle persone più anziane, da verificare) sono i più efficaci; la **dose** conta (indicativamente ≥3 ore a settimana di esercizio con sfida all'equilibrio) | **Moderata (da verificare)** | Revisione Cochrane 2019 (Sherrington e altri), Robertson 2001 (Otago), a memoria [CM] |
| Indicazioni OMS | Pesi ≥2 giorni a settimana a tutte le età; **dai 65**: attività multicomponente con equilibrio funzionale e forza a intensità moderata o più su **≥3 giorni** a settimana; 5-17 anni: attività che rinforzano muscoli e ossa ≥3 giorni a settimana | **Solida** (posizione ufficiale), citata a memoria | OMS 2020 [CM] |
| RIR e RPE | Stima della riserva meno precisa in chi è nuovo ai pesi (errore medio circa 1 ripetizione e più preciso con ≤12 ripetizioni: dato generale, non per età); uno studio 2026 sull'«allenabilità» della stima del RIR in giovani e anziani (solo titolo) | **Convenzione** | `ricerca-forza-progressione.md` riga 41 [R]; [V] solo titolo |
| Riposo tra le serie | 120 s tra le serie nella meta-analisi di Borde [V]; per i multiarticolari pesanti riposi più lunghi sono pratica comune | **Moderata** | Borde 2015 [V] |
| Recupero più lento? | Dopo una pausa gli over 65 perdono di più (già nel repo: giorni x2); sul recupero tra le sedute gli studi sono misti | **Contrastata** | [R] `ricerca-recupero-infortuni-popolazioni.md` (PMID 23347054); [CM] |
| Ossa: LIFTMOR | RCT su donne in postmenopausa con densità bassa: 8 mesi, 2 sedute a settimana **supervisionate**, 5 serie da 5 a ≥85% di 1RM (stacco, squat, overhead press) + salti: **densità lombare in aumento** contro calo nel gruppo di controllo (ordine di grandezza di pochi punti percentuali), nessun evento avverso importante riportato | **Moderata (da verificare)** | Watson e altri 2018 (J Bone Miner Res), a memoria [CM] |
| Osteoporosi: cosa evitare | Prudenza condivisa su flessione ripetuta e rotazione **sotto carico** della colonna e su impatti non graduati se c'è osteoporosi o frattura vertebrale; le prove di danno diretto sono deboli, è una posizione di consenso | **Convenzione + Contrastata** (vedi LIFTMOR) | Posizione australiana su osteoporosi ed esercizio (ESSA, Beck 2017), Sinaki 1984, a memoria [CM] |
| Pressione e Valsalva | Lo sforzo con apnea alza molto la pressione per pochi secondi; con carichi moderati e respirazione continua il rischio si riduce; i pesi a lungo termine tendono ad abbassare la pressione a riposo di pochi mmHg | **Convenzione** (acuto), **Moderata (da verificare)** (cronico) | Conoscenza del modello [CM]; PAR-Q positivo già «niente apnea» (ACSM) [R] |
| Artrosi di ginocchio e anca | L'esercizio (pesi inclusi) è il **trattamento di prima linea**; evitare di togliere i movimenti: modificare ampiezza e carico | **Solida (da verificare)** | Linee guida OARSI 2019, Cochrane (Fransen 2015), a memoria [CM]; coerente con REC-04 [R] |
| Farmaci | **Statine**: dolore muscolare insolito, debolezza o urine scure vanno riferiti al medico; **beta-bloccanti** (e altri): la frequenza cardiaca non guida lo sforzo, si usa la scala dello sforzo percepito; **polifarmacia**: più rischio di capogiri e cadute (alzarsi lentamente) | **Convenzione** | Conoscenza del modello [CM] |
| Cognizione | Programmi con pesi si associano a miglioramenti di funzioni esecutive e cognizione globale negli over 50 e nel deficit lieve | **Moderata (da verificare)** | Northey 2018 (Br J Sports Med), a memoria [CM] |
| Obesità sarcopenica | Pesi + proteine sufficienti + deficit moderato conservano muscolo e funzione; deficit aggressivo nell'anziano toglie muscolo | **Moderata (da verificare)** | Villareal 2011 (N Engl J Med), consenso ESPEN/EASO 2022, a memoria [CM] |
| Programmi a casa | Programmi a domicilio con sedia, elastici e peso corporeo funzionano per forza e funzione; l'Otago è nato a domicilio con visite di un fisioterapista | **Moderata (da verificare)** | Conoscenza del modello [CM] |
| Fragilità | Programmi multicomponente (forza, potenza, equilibrio, cammino) migliorano funzione e riducono cadute nei fragili; pesi anche all'80% di 1RM in ultraottantenni residenti in struttura, sotto supervisione | **Moderata (da verificare)** | Fiatarone 1994, programma Vivifrail (Cadore e altri), a memoria [CM] |

### 1.5 Screening prima di iniziare (ACSM e PAR-Q+)

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| ACSM 2015 (confermato nelle linee guida 2018) | L'idoneità si decide con tre elementi: già ci si allena con regolarità? malattia cardiovascolare, metabolica o renale nota? **sintomi** (dolore al petto, fiato corto a riposo o per sforzi lievi, capogiri, edemi alle caviglie, palpitazioni, claudicazione)? Chi **non ha malattie né sintomi** può iniziare un'attività leggera-moderata gradualmente **senza visita**; l'**età da sola non** è un motivo di visita | **Solida (da verificare)** | Riebe e altri, Med Sci Sports Exerc 2015, a memoria [CM] |
| PAR-Q classico e PAR-Q+ | Il PAR-Q classico (7 domande, età 15-69) chiedeva la visita medica **sopra i 69 anni se poco abituati a muoversi**; il PAR-Q+ (aggiornamenti 2011-2023) ha domande di approfondimento per patologia | **Convenzione (da verificare)** | Warburton e altri, a memoria [CM]; [R] le 7 domande dell'app ricalcano il PAR-Q classico (`onboarding.js:221`) |

### 1.6 Divulgatori: cosa non è stato verificato

Non è stato possibile cercare (tetto web) Schoenfeld sugli anziani, Layne Norton, Andy Galpin, Mike Israetel sui «masters», Barbell Medicine e Austin Baraki, Jeremy Ethier. **Non si attribuisce loro nessuna frase.** Visto solo: Stuart Phillips e colleghi (resistenza anabolica, 0,40 g/kg/pasto negli anziani; titolo su atleti master) [V]. Ricerche pronte in Appendice B.

## 2. Dove le fonti non concordano

| # | Posizione A | Posizione B | Cosa adotta il coach e perché |
|---|---|---|---|
| **E1** Massimale nei ragazzi | **AAP, versione citata negli snippet**: niente massimali fino alla maturità scheletrica (Tanner 5) [V] | **AAP 2020, Lloyd 2014**: il test di 1RM può essere sicuro con supervisione qualificata e protocollo [V] | **Nessun test di 1RM ai minori**: l'app non può garantire supervisione e protocollo; si usano serie a più ripetizioni e stima dallo storico. Contrastata, scelta di prudenza |
| **E2** Carichi dei giovani | **Posizioni**: 1-3 serie, 6-15 ripetizioni, carico moderato, 2-3 giorni [CM] | **Meta-analisi su giovani atleti**: 5 serie, 6-8 ripetizioni, 80-89% di 1RM, 3-4 minuti [V] | **Moderato**: la meta-analisi riguarda atleti con allenatore; per un minore senza supervisione garantita il margine di errore tecnico pesa di più dell'ultimo punto di efficacia |
| **E3** Ipertrofia in adolescenza | Effetto **piccolo** contro controlli passivi (d 0,16-0,30; postpuberi 0,01) [V] | **Grande** contro controlli attivi nei maschi (d = 1,26, IC molto largo) [V] | Non promettere crescita muscolare; promettere forza, tecnica e salute. Contrastata |
| **E4** Creatina sotto i 18 anni | **ISSN**: accettabile con supervisione, nessun effetto avverso visto [V] | **Etichette** «no sotto i 18» (cautela legale); «nessuno studio» su giovani atleti sani [V] | **L'app non nomina la creatina ai minori** (oggi `repertorio.js:249` la mostra a tutti): non si porta un integratore a chi è in età di pressione sugli steroidi [V]. Prudenza |
| **E5** Intensità negli anziani | **Borde 2015**: 51-69% di 1RM più efficace nel complesso; frequenza 2/settimana per la forza, 3 per l'insieme [V] | **Posizioni NSCA 2019 e studi su fragili**: fino a 70-85% (o 80%) di 1RM con supervisione [CM] | **Progressione per gradi**: base moderata (8-12, RIR 3-4) poi 6-12 con RIR 2-3 in sani senza segnali; mai cedimento; la supervisione degli studi con carichi alti non c'è in un'app. Moderata (da verificare) |
| **E6** Osteoporosi | **Prudenza**: evitare flessione e rotazione sotto carico e impatti [CM] | **LIFTMOR**: 5x5 a ≥85% di 1RM con stacco e salti, supervisionati, aumentano la densità senza eventi avversi [CM] | Nessun carico alto assiale e nessun impatto in app senza visita; con osteoporosi dichiarata **filtro** dei movimenti con flessione/rotazione sotto carico e rinvio. Contrastata |
| **E7** Proteine nell'anziano | **Resistenza anabolica**: 0,40 g/kg/pasto, 1,0-1,3 g/kg/giorno [V] | **Atleti master «versioni più vecchie dei giovani»** (titolo) e Nunes 2022: più proteine servono poco nei sani già a ≥1,2 g/kg [R] | Solo informazione qualitativa («proteine a ogni pasto») con rinvio per reni e patologie; niente grammi per over 65 finché NUT-01 non è deciso. Contrastata |
| **E8** Equilibrio: quanto | Prescrizione dell'app: **5 minuti a fine seduta** [R] | Programmi anticaduta efficaci: dosi di **ore a settimana** [CM] | Un blocco di equilibrio con progressione **e** mini-sedute a casa nei giorni senza pesi (ETA-11); la dose esatta resta da verificare |
| **E9** Scarico programmato | Pratica per fragili e principianti [R] | Nessun vantaggio dimostrato sui sani allenati (RCT 2024) [R] | Come in `ricerca-recupero-infortuni-popolazioni.md` D6: tenere lo scarico per over 65 e minori principianti (costa poco); Convenzione + Contrastata |
| **E10** Recupero negli anziani | Più lento, serve più riposo [CM, opinione diffusa] | Studi misti [CM] | Non cambiare i numeri: giorni di pausa x2 sopra i 65 (R) e ≥48 ore tra sedute dello stesso muscolo; domanda aperta |

## 3. Parametri per fascia d'età

Valori di **partenza** per una persona sana (PAR-Q negativo, nessun segnale rosso), neutri per sesso. Se la fascia non indica altro, valgono i parametri adulti già nel repo ([R] `ricette.js`, `regole-ricerca.js`, `docs/ricerca-struttura-e-intensita.md`). Le cifre marcate «Conv» sono scelte del coach, non risultati di studi. PAR-Q positivo e dolore hanno sempre la precedenza.

### 3.1 Dose

| Fascia | Serie per esercizio | Serie/settimana per muscolo | Sedute di pesi/settimana | Ripetizioni | RIR minimo (tetto di sforzo) |
|---|---|---|---|---|---|
| **14-17** | 1-3 · Mod [CM] (la meta-analisi su atleti dice 5: Contr [V]) | 6-10 · Conv | 2-3 non consecutive (max 3) · Mod [CM] | 8-15 · Mod [CM] (6-15 NSCA) | **≥2** sui multiarticolari, ≥1 su macchine e isolamenti; **mai cedimento** · Conv |
| **18-29** | come adulti [R] | come adulti [R] | come adulti [R] | come adulti [R] | come adulti [R] |
| **30-39** | come adulti [R]; con poco tempo, dose minima [R] | come adulti; dose minima 6-10 · Mod [CM] | 2-4 · Conv | come adulti | come adulti; ultima serie ≥1 sui pesanti · Conv |
| **40-49** | come adulti, 2-3 sui fondamentali pesanti · Conv | come adulti | 2-4, ≥48 h tra sedute dello stesso muscolo · Conv | come adulti | ≥1 sui multiarticolari pesanti · Conv |
| **50-64** | 2-3 · Conv | 8-12 · Conv | 2-3 · Mod [V Borde per la forza: 2] | 6-12 multi, 8-15 isolamenti · Conv | ≥1-2 sui multi; cedimento solo su macchine · Conv |
| **65-74** | **2-3** · Mod [V] | 6-10 · Conv | **2-3** · Mod [V] | **6-12** (Borde 7-9) · Mod [V]; oggi 8-12 [R] | **base 6-8 settimane RIR 3-4, poi RIR 2-3**; mai cedimento · Mod (da verificare) / Conv |
| **75+** | 1-2 per le prime 4 settimane, poi 2-3 · Conv [CM] | 4-8 · Conv | 2 + equilibrio quasi ogni giorno · Conv [CM] | 8-12 · Conv | **≥3** (sforzo percepito ≤7/10) · Conv |

### 3.2 Riposo, tempo, tecniche, esercizi, riscaldamento, scarico

| Fascia | Riposo tra le serie | Tempo (ritmo) | Tecniche ammesse / vietate | Esercizi da favorire / evitare | Riscaldamento | Scarico |
|---|---|---|---|---|---|---|
| **14-17** | 60-90 s isolamenti, 90-150 s multi · Conv | 2 s giù, 1 s su, controllato · Conv | **Ammesse**: serie normali, tempo, superserie di antagonisti. **Vietate**: drop, AMRAP, calibrazione al cedimento, forzate, negative, riposo-pausa, 8x8, piramide verso il massimale, schema 6x3 e 5x5 pesanti · Conv | **Favorire**: multiarticolari a corpo libero o leggeri, macchine ben regolate, lavoro su un arto, tecnica di atterraggio. **Evitare**: massimali; sollevamenti olimpici senza istruttore (competenza tecnica prima) · Mod [V]/[CM] | 8-10 min dinamico con equilibrio e atterraggio (tipo prevenzione del crociato) · Mod [V] | Nessuno a calendario; riduzione per esami, sonno <8 h, dolore · Conv |
| **18-29** | come adulti [R] | come adulti | come adulti [R] | come adulti | 5 min + serie progressive (REC-10) · Mod [R] | come adulti [R] (Contr) |
| **30-49** | come adulti [R] | come adulti | come adulti [R] | come adulti; prese neutre e macchine se dolore (REC-04) | 5-8 min + serie progressive · Conv | come adulti [R] |
| **50-64** | 90-150 s multi · Conv | 2 s giù · Conv | Ammesse come adulti; **drop e forzate solo su macchine**, mai sui pesanti liberi · Conv | **Favorire**: cerniera d'anca, rematori, spinte con presa neutra, lavoro su un arto, polpacci. **Evitare**: balistici con dolore articolare · Conv | 8-10 min con mobilità e serie progressive · Conv | Ogni 4-6 settimane o reattivo (prontezza) · Conv |
| **65-74** | **≥90 s** multi, **120 s** pesanti · Mod [V Borde] | 2-3 s in discesa; salita veloce **solo** nella tecnica «potenza» con carico leggero · Conv / [V] ambiguo | **Ammesse**: serie normali, cluster, potenza leggera, tempo lento. **Vietate**: drop, AMRAP, calibrazione, forzate, negative, riposo-pausa, 8x8, parziali, piramide pesante · Conv | **Favorire**: leg press, alzata dalla sedia, step-up basso con appoggio, rematore, chest press a macchina, abduzione d'anca, polpacci in piedi con appoggio, trasporti di carichi. **Evitare**: salti, transizioni dal pavimento senza appoggio, flessione/rotazione sotto carico con osteoporosi, pesi sopra la testa pesanti · Conv/[CM] | 10 min: mobilità, 1-2 serie progressive · Conv | Ogni 4ª settimana (-35%) [R] + reattivo · Conv |
| **75+** | ≥90 s, seduti se serve · Conv | 2-3 s in discesa; potenza **da seduti** · Conv | Solo serie normali, cluster e potenza leggera da seduti · Conv | **Favorire**: esercizi seduti o con appoggio, sedia, macchine guidate, camminata. **Evitare**: ogni transizione al pavimento, liberi sopra la testa, unilaterali senza appoggio · Conv | 10 min lenti con mobilità · Conv | Ogni 4ª settimana e dopo malattia · Conv |

### 3.3 Equilibrio e potenza, test, soglie di rinvio

| Fascia | Equilibrio / potenza | Batteria di test | Soglie di rinvio al medico (oltre PAR-Q e dolore) |
|---|---|---|---|
| **14-17** | Equilibrio e atterraggio nel riscaldamento (ragazze: priorità) · Mod [V]; salti solo con istruttore · Conv | Competenza tecnica (squat, hinge, spinta, tirata, atterraggio) e prove ripetute a corpo libero; **nessun 1RM** · Conv | Dolore ≥3/10 oltre 1 settimana o che zoppica; **dolore sotto la rotula o al tallone in crescita**; svenimenti, dolore al petto; ciclo irregolare o assente (ragazze); segnali di disturbi alimentari; pressione a usare steroidi o integratori · Conv [CM] |
| **18-29** | Facoltativo · Conv | Progressi dell'app (stima del massimale dallo storico) [R] | PAR-Q; ciclo assente per mesi (donne) → medico [R] |
| **30-49** | Facoltativo · Conv | come sopra | PAR-Q; sintomi cardiologici → 112/medico [R] |
| **50-64** | Lavoro su un arto 1-2 volte; potenza leggera facoltativa · Conv (la potenza cala prima: Mod [CM]) | **30-s alzate dalla sedia**, equilibrio su un piede, presa (facoltativa) · Conv | PAR-Q; pressione alta non controllata o cambio di farmaci; dolore notturno o a riposo [R] |
| **65-74** | **Equilibrio ≥3 volte a settimana** con progressione + potenza sul primo multiarticolare · Mod (da verificare) [CM] | 30-s alzate dalla sedia, 5 alzate, TUG, equilibrio su un piede; velocità del passo e presa se possibile; ogni 8-12 settimane · Mod [CM] | **≥1 caduta con danno o ≥2 cadute in 12 mesi**; capogiri all'alzarsi; osteoporosi o frattura vertebrale; anticoagulanti; perdita di peso involontaria; fiato corto o palpitazioni nuovi; gonfiore articolare · Conv [CM] |
| **75+** | **Equilibrio quasi ogni giorno** (10-15 min) + potenza da seduti · Mod (da verificare) [CM] | come sopra; se non si alza senza le mani, è un segnale | Come sopra; in più **visita prima di iniziare** se non si fa attività da tempo (PAR-Q classico, sopra i 69) · Conv [CM] |

## 4. Test funzionali e norme

Tutti i valori sono **a memoria, da verificare** [CM] salvo dove scritto; servono come soglie **di segnalazione e di rinvio**, non come diagnosi. Fonti da ritrovare: CDC STEADI (cadute), Rikli e Jones (Senior Fitness Test), Bohannon 2006 (5 alzate e TUG), EWGSOP2 2019 (sarcopenia), Studenski 2011 (velocità del passo), Springer 2007 e Vellas 1997 (equilibrio).

| Test | Come | Norme e soglie (da verificare) | Fattibile in app? | Uso nel coach |
|---|---|---|---|---|
| **30-s alzate dalla sedia** | Sedia senza braccioli, braccia incrociate, quante alzate complete in 30 s | «Sotto la media» (tabella STEADI): 60-64 anni uomini <14, donne <12; 65-69 <12 / <11; 70-74 <12 / <10; 75-79 <11 / <10; 80-84 <10 / <9; 85-89 <8 / <8; 90-94 <7 / <4. **Ricontrollare ogni cella.** | Sì (sedia, timer) | Base e ogni 8-12 settimane; sotto la media → equilibrio e cadute (ETA-12) |
| **5 alzate dalla sedia (5xSTS)** | Tempo per 5 alzate il più veloce possibile | Medie: 60-69 anni circa **11,4 s**, 70-79 circa **12,6 s**, 80-89 circa **14,8 s** (Bohannon 2006); **>15 s** = segnale (rischio di cadute ripetute, soglia di sarcopenia EWGSOP2). Dai pesi nelle sarcopeniche: -1,79 s in media [V] | Sì | Idem; >15 s o impossibile senza le mani → modo «fragile» |
| **TUG** | Alzarsi, camminare 3 m, tornare, sedersi | Medie circa **8,1 s** (60-69), **9,2 s** (70-79), **11,3 s** (80+) (Bohannon 2006); **≥12 s** = rischio di cadute (STEADI); ≥20 s grave (EWGSOP2) | Sì (3 m e timer) | Come sopra |
| **Equilibrio su un piede** | Occhi aperti, mani sui fianchi, secondi | Sotto i **5 s** associato a cadute con lesioni (Vellas 1997); i valori per età (decine di secondi a 60-69, calo marcato dopo i 80) da verificare | Sì | Livello dell'equilibrio (ETA-11) |
| **Velocità del passo** | 4 m a passo abituale | **≤0,8 m/s** = soglia di sarcopenia/fragilità (EWGSOP2); predice la sopravvivenza (Studenski 2011); +0,15 m/s dai pesi nelle sarcopeniche [V] | Sì (4 m, timer) | Marcatore di progresso e di fragilità |
| **Forza di presa** | Dinamometro | Sarcopenia probabile: **<27 kg uomini, <16 kg donne** (EWGSOP2); +2,95 kg dai pesi [V] | **No** (serve lo strumento): campo facoltativo a mano | Solo registrazione |
| **SPPB** | Equilibrio, passo, 5 alzate | ≤8 = bassa prestazione (EWGSOP2) | Parziale | Facoltativo |
| **Adolescenti** | Competenza tecnica (batteria di abilità: titolo visto [V]) | Nessuna norma; non si fa il massimale | Sì (video-guida) | Passa a carichi maggiori solo con tecnica approvata |
| **18-49** | Ripetizioni massime a corpo libero (piegamenti, squat, plank) ripetute ogni 8 settimane | **Nessuna norma usata**: confronto con sé stessi; le norme per fascia (tipo Cooper Institute) non sono state cercate | Sì | Livello e progressi; il livello oggi è solo «da storico» (`livelloStimato`: gap-analysis B20) |

Nota sul **livello**: oggi parte dall'allenamento dichiarato e dallo storico, mai dalla prestazione (B20, `repertorio.js:30`). Per gli over 65 il livello utile non è «principiante/avanzato» ma **capacità funzionale** (batteria sopra).

## 5. Minori: regole speciali

**Principi (fonti viste):** i pesi sono sicuri e raccomandati con tecnica e supervisione [V]; niente età minima, ma capacità di seguire istruzioni [V]; prima la competenza tecnica, poi il carico [V]. L'app **non può garantire la supervisione**: perciò si sceglie la versione più prudente tra le posizioni (E1, E2).

**Cosa cambia per un minore (14-17):**
1. **Nessuna tecnica al cedimento e nessun massimale**: vietate calibrazione, AMRAP, drop, forzate, negative, riposo-pausa, 8x8, piramide verso il massimale; niente schema forza 5x5 o 6x3 (`ricette.js:194-195`); niente test di 1RM.
2. **RIR ≥2** sui multiarticolari e ≥1 su macchine e isolamenti; 8-15 ripetizioni; 1-3 serie per esercizio; 2-3 sedute non consecutive; pause 60-150 s.
3. **Nessun consiglio su corpo, peso e integratori**: niente giudizi sulla massa grassa dalla BIA (BIA-02), niente deficit calorico né passi-obiettivo (COR-01, `repertorio.js`), niente grammi di proteine (NUT-01), **niente creatina** (`repertorio.js:249` oggi per tutti). L'obiettivo «dimagrimento» si presenta come «salute e forza» con rinvio a un adulto e al medico. Motivo: vulnerabilità ai disturbi alimentari e alla pressione verso steroidi e integratori [V].
4. **Sonno**: 8-10 ore (AASM) [V]; sotto le 8 ore l'app tratta il sonno come scarso (volume ridotto). Oggi l'onboarding chiama «Bene» «7 ore o più» (`onboarding.js:223`).
5. **Riscaldamento neuromuscolare** (atterraggio, ginocchio sopra il piede, equilibrio, squat e affondi a corpo libero) 2-3 volte a settimana, con priorità per le ragazze [V].
6. **Dolori da crescita**: dolore sotto la rotula o al tallone in fase di crescita → modifica e visita se dura più di una settimana [CM].
7. **Esami e scuola**: momento di vita «esami» già presente (MOM) [R]; per i minori propone volume ridotto senza chiedere.

**Testi di sicurezza (bozza in italiano):**
- Primo avvio, 14-17: «Hai meno di 18 anni e il tuo corpo sta ancora crescendo. I pesi fanno bene e sono sicuri se impari bene la tecnica e ti alleni con un adulto o un istruttore che ti guarda. Qui non troverai massimali né serie al limite: lascia sempre qualche ripetizione in riserva. Dormi 8-10 ore. Se hai dolore forte o che non passa, senti male al petto, ti gira la testa o svieni, fermati e parlane con un adulto e con un medico.»
- Ragazze: «Se il ciclo salta o diventa irregolare, o se mangi poco per paura di ingrassare, parlane con un medico: non è colpa tua e si può sistemare.»
- Sotto i 14 anni (se la soglia sarà 14): «3in non è pensata per chi ha meno di 14 anni. Chiedi a un genitore o a un istruttore di sport come muoverti in sicurezza.»
- Pressione a usare steroidi o integratori: «Nessun integratore ti serve per crescere bene. Se qualcuno ti spinge a prendere steroidi o prodotti per i muscoli, parlane con un medico o con un adulto di cui ti fidi.»

**Soglia dell'età minima.** L'informativa privacy ha ancora «[ETÀ MINIMA, da decidere]» (`docs/privacy-policy-bozza.md`, cap. 8) e il questionario di età di App Store Connect è collegato. In Italia il consenso digitale autonomo è dai 14 anni (da verificare con un legale) [CM]. Proposta: **14** come minimo; tra 14 e 17 «profilo minore» con avviso.

## 6. Anziani fragili: regole speciali

**Chi è «fragile» per l'app** (definizione operativa [CM]; l'età da sola **non** basta): da 75 anni **oppure** qualsiasi età ≥65 con almeno uno tra: **≥2 cadute in 12 mesi** o una con lesione; **non si alza dalla sedia senza usare le mani**; **5xSTS >15 s** o TUG **≥20 s**; **velocità del passo ≤0,8 m/s**; perdita di peso involontaria; difficoltà dichiarata con le scale o con le borse della spesa. Il «pre-fragile» (un solo criterio lieve, TUG ≥12 s) rinforza equilibrio e invita al fisioterapista ma resta nel profilo 65-74.

**Cosa cambia:**
1. **Prima la visita**: «Parla con il medico o il fisioterapista prima di iniziare e portagli la scheda.» L'app non parte con carichi finché la persona non conferma (annullabile).
2. **Sedute brevi** (≤40 minuti), **2 a settimana** più **equilibrio quasi ogni giorno** (10-15 minuti, Otago-like); sedute di forza con **macchine guidate, sedia e appoggio**.
3. **1-2 serie** nelle prime 4 settimane, poi 2-3; 8-12 ripetizioni; **RIR ≥3** (sforzo percepito ≤7/10); **nessun cedimento**, nessuna tecnica «intensa».
4. **Potenza solo da seduti** (alzata dalla sedia veloce in salita, lenta in discesa) con carico leggero.
5. **Niente pesi liberi sopra la testa, niente transizioni dal pavimento, niente salti**; alzarsi lentamente dopo ogni serie (capogiri con farmaci per la pressione e polifarmacia) [CM].
6. **Nutrizione**: nessun obiettivo di calo di peso automatico; messaggio qualitativo («proteine a ogni pasto, soprattutto se mangi poco») e rinvio al medico o al dietista per reni, diabete o perdita di peso involontaria [V per la base, Conv per il testo].
7. **Scarico** ogni 4ª settimana e dopo malattia; rientro con giorni di pausa x2 [R].

**Testo di sicurezza (bozza):** «Dai 65 anni i pesi sono tra le cose migliori per forza, equilibrio e autonomia. Si parte piano e si sale per gradi. Tieni un appoggio vicino e alzati lentamente dopo ogni serie. Fermati e senti il medico se hai dolore al petto, fiato corto insolito, svenimenti o capogiri, o se sei caduto più volte di recente. Non sono un medico e non faccio diagnosi.»

**Soglie «medico» per gli over 65** (da applicare oltre a quelle dei cap. 14 e REC): una caduta con danno o ≥2 cadute in 12 mesi; capogiri o quasi-svenimenti quando ci si alza; osteoporosi o frattura vertebrale nota (prima di carichi sulla colonna); farmaci anticoagulanti (rischio emorragico in caso di caduta); perdita di peso involontaria; fiato corto o palpitazioni nuovi; gonfiore o blocco articolare; dolore ≥4/10 che non migliora in una settimana; dolore notturno; dolore muscolare insolito con urine scure (statine, rabdomiolisi) [CM].

## 7. Audit delle regole esistenti

Esiti: **Giusto**, **Prudente** (più cauto delle fonti, accettabile), **Non supportato**, **Mancante**, **Da rivedere**. Righe di codice lette in questa sessione; citazioni dalla gap-analisi (`lacune-coach.md`) tra virgolette.

| Regola / punto | Cosa fa oggi | Confronto con le fonti | Esito |
|---|---|---|---|
| **Età: campo opzionale** (`onboarding.js:363`, listener riga 410; `il-coach.js:20`; `profiloCoach` in `regole-ricerca.js:40`; `ricette.js:74`) | L'età è nel passo BIA («Quello che il referto non dice»), facoltativa, **senza limiti**; `Number(p.age) \|\| 0` → **età mancante = adulto** (nessuna salvaguardia per età). Gap-analisi B24: «No age bounds (under-18s get adult programs and creatine information)» | Mancano limite inferiore, avviso minori, e gestione dell'età non dichiarata | **Mancante** (ETA-01) |
| **Minori in generale** (cap. 14) | Nessuna regola; §14 gap-analisi: «the age input has no lower bound and no rule for under-18s. Creatine information is shown to everyone.» Il solo cenno è `intensita.js:54` (`eta >= 18`: il riferimento dell'angolo di fase non si usa sotto i 18) | Posizioni AAP e Lloyd: tecnica e supervisione [V]; rischio steroidi e disturbi alimentari [V] | **Mancante** (ETA-02..07); `intensita.js:54` **Giusto** |
| **Consigli di corpo a tutti** (`repertorio.js`, righe ~236-249) | Proteine «circa X g (2 g per kg)», passi 10-12 mila in deficit, **creatina 3-5 g «sicura ed efficace»**, tutto senza condizione d'età (riga 249 incondizionata) | Per i minori: contrastata (E4); per over 65: nessuna fonte vista sui grammi (NUT-01 già propone «niente numeri») | **Non supportato** per minori e over 65 (ETA-04, ETA-15) |
| **Over 65: max 3 serie** (`ricette.js:202`, `:333`; `COACH_PARAMETRI.serieMaxPrudente`) | Tetto di 3 serie per esercizio | Borde: **2-3 serie** per esercizio [V] | **Giusto** (per esercizio); il volume per **muscolo** non è controllato |
| **Over 65: 8-12 ripetizioni** (`ricette.js:202`) | Sempre 8-12 (`Math.max(8, Math.min(12, reps))`) | Borde: 7-9 ripetizioni più efficaci [V]; posizioni: fino a carichi elevati [CM]; la gap-analisi: «Permanent RIR 3-4 and 8-12 reps contrast with current guidance (NSCA 2019)» | **Prudente**, **Da rivedere** come limite permanente (ETA-08) |
| **Over 65: RIR 3-4 per sempre** (`regole-ricerca.js:64`: `pc.prudente \|\| pc.eta >= 65`) | Stesso ramo per PAR-Q positivo e per età; nessuna progressione | Nessuna fonte vista che richieda RIR 3-4 permanente in sani; fino a RIR 2-3 con le dosi di Borde [V] e le posizioni [CM] | **Prudente**, **Da rivedere**; si confonde «sano di 66 anni» con «PAR-Q positivo» |
| **ESI-03 esigenza esclusa** (`esigenza.js:15`) | Over 65 sempre a 100%: il coach non adatta mai lo sforzo né verso l'alto né verso il basso | Nessuna fonte vista | **Prudente**, **Da rivedere** (ETA-08) |
| **Pause per età** (`ricette.js:184-207`, `agente-consigli.js:36`) | Nessuna regola di riposo per età (le donne ×0,85); il consiglio dice «pause brevi da recuperare con calma» (ambiguo e opposto a Borde: 120 s [V]) | Riposo ≥90-120 s sui multiarticolari | **Da rivedere** (ETA-09) |
| **Over 65: «potenza» sul primo multiarticolare** (`ricette.js:364`) | Tecnica «potenza» (40-60%, salita veloce) sul primo multiarticolare; `else if` → nessun «cluster» sui pesanti per chi ha «potenza» | La potenza è l'indirizzo giusto [CM]; il rischio è la velocità su un esercizio con equilibrio (squat con bilanciere) senza supervisione | **Giusto** nell'idea; **Da rivedere** nella scelta dell'esercizio (macchina o da seduti) |
| **Drop set a un 68enne** (`ricette.js:353-368`, ramo «poco tempo»; gap-analisi §8 e B3) | Il ramo `poco` assegna `drop` all'ultimo isolamento **senza controllo di età, livello o PAR-Q**; il codice letto lo conferma (solo `over65 && primo` riceve «potenza»). Contraddice la nota «niente cedimento» (`ricette.js:382`) | Vietato dalla stessa regola dell'app [R]; nessuna fonte a favore negli over 65 | **Non supportato / bug** (ETA-10) |
| **Aumenti dimezzati per gli over 65** (cap. 14, CAR-06 vs `regole-ricerca.js:111`) | Il testo dice «aumenti dei carichi dimezzati» per over 65; il codice usa `prudente = pc.sonnoMale \|\| pc.prudente`, **senza età** | Per sani di 65-74 incrementi normali + autoregolazione dallo sforzo sono coerenti con le fonti viste (nessuna dice di dimezzare) | **Da rivedere**: allineare testo e codice (scelta: lasciare il codice, correggere il testo, o aggiungere l'età per 75+) |
| **Carico di partenza** (`partenza.js:61`) | ×0,85 da 65 anni, ×0,95 da 50 | Nessuna fonte vista; plausibile come prudenza; per minori nulla | **Prudente** (Convenzione), **Mancante** per minori |
| **Detraining x2 sopra i 65** (`regole-nuove.js:32-36` RIC-05; `regole-ricerca.js:97-98` CAR-04) | Giorni di pausa contati il doppio | Effetto dello stop maggiore sopra i 65; massa tiene 12-24 settimane [R] | **Giusto/Prudente** |
| **«Sopra i 60 anni serve un po' più volume»** (`metodi-momenti.js:58`, MOM Mantenimento) | Frase senza regola; soglia 60 diversa dai 65 del resto del coach | Nessuna fonte vista; stride con il tetto di 3 serie | **Non supportato** (togliere o fondare) |
| **Equilibrio** (`ricette.js:382`, `agente-consigli.js:36`; gap-analisi §17: «power/plyo (… sit-to-stand for older adults)» mancano) | «5 minuti di equilibrio» a fine seduta, **solo testo**: nessun esercizio in libreria, nessuna progressione, nessun tracciamento; cercando per nome in `libreria-esercizi.js` non compaiono esercizi di equilibrio né alzate dalla sedia (c'è solo `Step-up su Panca`) | Programmi anticaduta: dose di ore e sfida all'equilibrio [CM]; 5 min x 2-3 sedute = circa 10-15 min a settimana | **Mancante** / dose insufficiente (ETA-11) |
| **Salvaguardie del PAR-Q** (`onboarding.js:221`) | 7 domande ricalcano il PAR-Q classico; sì = «modalità prudente» per tutto | Nessuna domanda su **cadute**, **osteoporosi**, **anticoagulanti**, età minima; il PAR-Q classico chiede la visita sopra i 69 se inattivi [CM] | **Prudente**, **Mancante** (ETA-13) |
| **Filtro movimenti con osteoporosi** (`motore.js:39 RISCHIO`) | Nessuno; gli esercizi con flessione/rotazione sotto carico (Crunch a Terra, Crunch al Cavo, Crunch alla Macchina, Sit-up a Ginocchia Piegate, Russian Twist, Woodchop ai Cavi) non sono filtrati per età | Prudenza di consenso, Contrastata [CM]; gap-analisi §14: «no osteoporosis/sarcopenia logic» | **Mancante** (ETA-13) |
| **Respirazione** (`biomeccanica.js:34 respiroPer`) | Niente apnea solo con PAR-Q positivo; per gli altri «puoi trattenere il fiato 1-2 secondi» | Gli over 65 sono «cauti» altrove ma qui no | **Da rivedere** (REC-06, ETA-14) |
| **Test funzionali** (`biomeccanica.js:54 TEST_FAI_DA_TE`: caviglia, spalle, squat «stance») | Tre prove di mobilità/posizione per scegliere varianti; nessun test di forza, equilibrio o funzione | Marcatori per cadute e sarcopenia [V per l'effetto dei pesi; CM per norme] | **Mancante** (ETA-12) |
| **Scarico** (`motore.js:15 strutturaProgramma`) | Ogni 4ª settimana per principianti e intermedi, 6ª per avanzati: **non guarda l'età** | Costa poco per over 65 e minori principianti; D6 di `ricerca-recupero...` | **Prudente** |
| **Sonno nell'onboarding** (`onboarding.js:222-226`) | «Bene» = 7 ore o più | Adolescenti 8-10 ore [V] | **Da rivedere** per i minori (ETA-05) |
| **Metodi per «cauto»** (`compone.js:45-49`; MET-04) | Over 65 o PAR-Q positivo escludono i metodi ad alta intensità | Opportuno; i minori non rientrano | **Giusto**; esteso ai minori (ETA-02) |
| **Livello** (gap-analisi B20, `repertorio.js:30 livelloStimato`) | Solo da allenamento dichiarato e storico | Per gli anziani conta la capacità funzionale | **Mancante** (ETA-12) |

## 8. Regole proposte

Codice di area **ETA**. Ogni regola va aggiunta come riga `- **ETA-NN** ...` nel cap. 19 di `docs/coach-mappa-regole.md`, a `REGOLE_SPEGNIBILI` in `js/coach/parametri.js` (i valori in `COACH_PARAMETRI`), con motivo nelle tre lingue (`js/lingue/en|es|de.js`) e un test in `tests/browser/regole-nuove.js`; un esercizio nuovo in `js/dati/libreria-esercizi.js` richiede anche immagine e inventario. **Nessuna regola va implementata senza la verifica dei punti [CM] marcati.** Le salvaguardie (PAR-Q, over 65, principianti, dolore, scarico) hanno sempre la precedenza. ETA-02..07 **ampliano e sostituiscono REC-11**; ETA-14 si appoggia a REC-06; ETA-15 a NUT-01; ETA-12 usa il test (gap B20).

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **ETA-01** età minima e dichiarata | Onboarding e Opzioni > Il coach | Età **obbligatoria** prima del programma (intero 14-99, controlli di intervallo); **<14**: nessun programma, messaggio; **14-17**: bandiera «minore»; età mancante: adulto «non dichiarato» con avviso e invito a inserirla. Il valore si cambia anche dopo: i controlli valgono in `setCoach('age')` | «Mi serve la tua età per scegliere pesi e ritmo giusti. Sotto i 14 anni 3in non è adatta.» | Convenzione (prudenza); base [V] (Lloyd, AAP: supervisione e capacità di seguire istruzioni); soglia 14 = decisione di prodotto/legale [CM] | L'età è autodichiarata e si può falsificare: limite onesto; obbligare rallenta l'avvio | `js/ui/onboarding.js` (`#onb-age`, riga 363 e 410), `js/ui/opzioni/il-coach.js:20`, `js/coach/regole-ricerca.js:40 profiloCoach` |
| **ETA-02** profilo minore: sforzo e tecniche | `eta` 14-17 | Come «cauto»: **vieta** calibrazione, AMRAP, drop, forzate, negative, riposo-pausa, 8x8, piramide pesante, schemi 5x5/6x3; **RIR ≥2** (multi) e ≥1 (macchine/isolamenti); 8-15 ripetizioni; ≤3 serie per esercizio; ≤3 sedute di pesi a settimana; esigenza fissa 100%; metodi ad alta intensità esclusi; nessun test di 1RM | «Alla tua età conta imparare bene i movimenti: niente massimali né serie al limite, lascia sempre 2-3 ripetizioni in riserva.» | **Moderata** (posizioni concordi [V]); numeri = Convenzione | Meno stimolo per chi si allena con un istruttore (aggiungere l'opzione «ho un istruttore» solo se deciso); spegnibile | `ricette.js:74-75, 115, 184-207, 327-333, 353-368`, `regole-ricerca.js:64 rirBersaglioBase`, `compone.js:45-49`, `esigenza.js:15`, `regole-nuove.js:63, 86` |
| **ETA-03** supervisione e tecnica prima | Primo avvio con `eta` <18 e nelle note del programma | Avviso fisso «allenati con un adulto o un istruttore»; sblocca carichi maggiori solo dopo una settimana di tecnica con RIR ≥3; link a «Mi sento male» | Testo del cap. 5 | **Solida** (posizioni ufficiali concordi [V]) | Nessuno (solo testo) | `onboarding-risultato.js`, `ricette.js` (note), `agente-consigli.js` |
| **ETA-04** niente numeri su corpo, calorie, proteine, creatina ai minori | `eta` <18 | Nasconde: giudizi BIA sulla massa grassa (BIA-02), deficit e passi-obiettivo, grammi di proteine, riga della creatina; «dimagrimento» → «salute e forza»; segnali di disturbi alimentari → rinvio | «Alla tua età non do numeri su peso o cibo: sono cose da parlare con un medico o un dietista. Se pensi spesso al peso o salti i pasti, parlane con qualcuno di cui ti fidi.» | **Convenzione (prudenza)**, base [V] (insoddisfazione corporea → steroidi; vulnerabilità ai disturbi alimentari) + Contrastata per la creatina | Perde concretezza per chi chiede davvero; nessun danno | `repertorio.js` (righe ~236-249, riga 249), `js/ui/progressi/peso.js`, `intensita.js` (BIA), `onboarding.js` (obiettivi) |
| **ETA-05** sonno 8-10 ore per i minori | `eta` <18 | La voce sonno dell'onboarding e della prontezza considera «scarso» sotto 8 ore: stessi effetti di `sonnoMale` (meno serie, aumenti prudenti); testo sul sonno | «Alla tua età servono 8-10 ore di sonno: dormendo meno ti fai male più facilmente.» | **Moderata** (osservazionale [V]: <8 h x1,7 infortuni; AASM 8-10 h) | Basso | `onboarding.js:222-226 ONB_SONNO`, `prontezza.js:13 PRONTEZZA_VOCI`, `regole-ricerca.js:40` |
| **ETA-06** riscaldamento neuromuscolare | `eta` 14-18, soprattutto sesso F | Nota di riscaldamento di 8-10 min (squat e affondi a corpo libero con ginocchio in linea, atterraggio morbido, equilibrio su un piede), 2-3 volte a settimana | «Prima dei pesi: ginocchia in linea con i piedi, atterraggi morbidi, equilibrio su un piede. Riduce i problemi al ginocchio.» | **Moderata/Solida** per atlete [V]; per un utente generico: Moderata | Falsa sicurezza: dire «riduce il rischio», non «previene» | `js/ui/allenamento/seduta.js` (`addWarmup`), `biomeccanica.js` (`cueEsercizio`) |
| **ETA-07** dolore da crescita e segnali | `eta` <18 e dolore ≥3/10 oltre 1 settimana, o dolore sotto la rotula/al tallone, o zoppia | Messaggio «pediatra o medico dello sport», sostituzione dell'esercizio con una variante senza dolore | «Nel periodo di crescita alcuni punti (sotto la rotula, tallone) si irritano: se il dolore dura più di una settimana, fatti vedere.» | Convenzione [CM] | Falsi positivi accettabili | `questionario-decisioni.js` (`STRESS_ZONA`, DEC-03), `dolore-mattina.js` |
| **ETA-08** over 65 sani: base e poi progressione | `eta` ≥65, PAR-Q negativo, nessun dolore recente | **Prime 6-8 settimane** come oggi (RIR 3-4, 8-12); poi, se completa ≥70% delle sedute, RIR **2-3**, **6-12** ripetizioni (macchine e manubri, mai pesanti liberi favoriti), esigenza che può **ridursi** ma non salire oltre il 100% per età; mai cedimento; `prudente` per PAR-Q resta RIR 3-4 | «Dopo le prime settimane puoi spingere un po' di più: restano 2-3 ripetizioni in riserva e nessun cedimento.» | **Moderata (da verificare)**: Borde [V] + posizioni [CM]; soglia a 6-8 settimane = Convenzione | Rischio di sovrastima del recupero: reattivo di scarico e dolore attivi; spegnibile; separare `eta >= 65` da `prudente` | `regole-ricerca.js:64 rirBersaglioBase`, `ricette.js:202`, `esigenza.js:15`, `parametri.js` (`etaBaseSett`) |
| **ETA-09** riposo minimo e testo coerente | `eta` ≥65 | Riposo minimo 90 s sui multiarticolari, 120 s sui pesanti, 60 s sugli isolamenti; toglie la frase «pause brevi» | «Riposa almeno un minuto e mezzo tra le serie dei movimenti grandi: ti serve per respirare e per restare stabile.» | **Moderata** (Borde 120 s [V]); numeri minori = Convenzione | Nessuno | `ricette.js:184-207`, `agente-consigli.js:36` |
| **ETA-10** tecniche vietate sopra i 65 | `eta` ≥65 (o minore o PAR-Q positivo) | Funzione `tecnicaAdatta(es, profilo)` che blocca drop, AMRAP, calibrazione, forzate, negative, riposo-pausa, 8x8, parziali e piramide pesante; **corregge il bug del ramo «poco tempo»** (gap B3) | «Alla tua età niente serie al limite: la stessa crescita arriva con più ripetizioni in riserva.» | **Convenzione** (prudenza) coerente con la regola già scritta dall'app | Nessuno: toglie, non aggiunge | `ricette.js:353-368`, `regole-nuove.js:86 limitaTecnicheIntense`, `compone.js:67 TOCCHI` |
| **ETA-11** equilibrio e potenza veri | `eta` ≥65 | Blocco di equilibrio con 4 livelli (piedi uniti, semi-tandem, tandem, un piede, con appoggio vicino) e **mini-sedute a casa** di 10-15 min nei giorni senza pesi (≥3 volte a settimana); alzata dalla sedia «veloce in salita» come potenza; **richiede esercizi nuovi in libreria** (alzata dalla sedia, equilibrio su un piede, cammino in tandem, talloni con appoggio, step-up basso) | «Equilibrio un po' ogni giorno: 10 minuti riducono il rischio di cadere.» | **Moderata (da verificare)** [CM]; dose = Convenzione | Rischio di caduta nell'esercizio: appoggio sempre vicino; spegnibile | `libreria-esercizi.js` (nuovi nomi, un nome = un file), `ricette.js:382`, `agente-consigli.js:36` |
| **ETA-12** test funzionali di fascia | `eta` ≥50 (≥65 obbligatorio) | Batteria: 30-s alzate dalla sedia, 5 alzate, TUG, equilibrio su un piede (+ passo 4 m e presa facoltativi); all'inizio e ogni 8-12 settimane; esito → livello funzionale, equilibrio, segnali (TUG ≥12 s, 5xSTS >15 s, equilibrio <5 s → fisioterapista) | «Questi test misurano se i pesi funzionano per la vita di ogni giorno: alzarti, camminare, restare in equilibrio.» | **Moderata** (effetto dei pesi sui test [V]); soglie [CM] da verificare | Soglie sbagliate = inutili rinvii o falsa tranquillità: verificare prima di mostrarle; mai come diagnosi | `biomeccanica.js:54 TEST_FAI_DA_TE`, `onboarding.js:299`, `js/ui/progressi/`, `repertorio.js:30` |
| **ETA-13** domande su cadute e ossa | `eta` ≥65, o «ossa o articolazioni» sì | 4 domande: cadute negli ultimi 12 mesi; osteoporosi o frattura vertebrale; anticoagulanti; capogiri all'alzarsi. Risposte → «a rischio» (equilibrio e visita), filtro di flessione/rotazione sotto carico (Crunch a Terra, Crunch al Cavo, Crunch alla Macchina, Sit-up a Ginocchia Piegate, Russian Twist, Woodchop ai Cavi) e nessun impatto, rinvio prima di carichi alti | «Con osteoporosi o cadute recenti conviene un parere medico: intanto evito i movimenti che piegano o torcono la colonna sotto carico.» | **Convenzione + Contrastata** (E6) | Esclude esercizi utili; modificare prima di escludere se lieve; sempre annullabile | `onboarding.js:217-226` (`PARQ_DOMANDE`), `motore.js:39-45 RISCHIO/consentito`, `questionario-decisioni.js:50 SOSTITUZIONI` |
| **ETA-14** respirazione e alzarsi con calma | `eta` ≥65 o PAR-Q positivo o «pressione alta» | Testo «espira mentre sollevi» (REC-06) + «alzati lentamente»; siediti se ti gira la testa | «Niente apnea: espira mentre sollevi. Alzati con calma tra le serie.» | Convenzione [CM] | Nullo | `biomeccanica.js:34 respiroPer`, `schede-tecniche.js` |
| **ETA-15** nutrizione e peso nell'anziano | `eta` ≥65 | Nessun deficit automatico né giudizio sul grasso; messaggio qualitativo «proteine a ogni pasto» con base [V]; rinvio a medico/dietista per reni, diabete, perdita di peso involontaria | «Per tenere i muscoli aiutano proteine a ogni pasto e i pesi. Se vuoi dimagrire o perdi peso senza volerlo, parlane con il medico.» | **Moderata** (0,40 g/kg/pasto, 1,0-1,3 g/kg/giorno [V]) per la base; testo = Convenzione | Nessun numero per rispettare NUT-01 | `repertorio.js:236-249`, `progressi/peso.js` |
| **ETA-16** 40+: riscaldamento e recupero | `eta` ≥40 | Estende REC-10: 8-10 min con serie progressive e ≥48 h tra sedute dello stesso muscolo; testo sui tendini | «Con gli anni i tendini vogliono più riscaldamento: sali di carico a gradi.» | **Convenzione** [CM] | Nullo | `seduta.js` (`addWarmup`), `motore.js` (distribuzione dei giorni) |
| **ETA-17** modo «fragile» | Da 75 anni o criteri della sez. 6 | Sedute ≤40 min, 2 a settimana, 1-2 serie (poi 2-3), macchine e sedia, RIR ≥3, potenza da seduti, scarico ogni 4ª settimana, **visita prima di iniziare** | Testo sez. 6 | **Moderata (da verificare)** [CM] | Falsi positivi → più prudenza; falsi negativi → resta nel profilo 65-74: i test e le domande lo riducono | `ricette.js` (terzo livello di `cauto`), `parametri.js`, `motore.js:15` |
| **ETA-18** pulizia di testi e documenti | Subito (nessun codice di regola) | (a) Cap. 14 e CAR-06: dire che gli aumenti si dimezzano solo con PAR-Q o sonno scarso, oppure aggiungere l'età per 75+; (b) togliere «Sopra i 60 anni serve un po' più volume» (`metodi-momenti.js:58`) o fondarla; (c) allineare il testo «pause brevi» (ETA-09) | - | - | Nessuno | `docs/coach-mappa-regole.md`, `metodi-momenti.js:58`, `agente-consigli.js:36` |

**Ordine consigliato:** prima ciò che riduce un rischio oggi presente e non richiede verifica (ETA-10 bug del drop set, ETA-01, ETA-02, ETA-03, ETA-04, ETA-18), poi ETA-05..07 e ETA-09, poi ETA-08/11/12/13/17 dopo la verifica delle ricerche in Appendice B.

## 9. Domande aperte

**Decisioni di prodotto**
1. Età minima: **14**? (consenso digitale, App Store, informativa privacy: `docs/privacy-policy-bozza.md` cap. 8). Con un genitore o un istruttore dichiarato (opzione «ho un istruttore») si possono ammettere carichi maggiori?
2. L'età è facoltativa (passo BIA): renderla obbligatoria rallenta l'avvio ma è l'unico modo per applicare le salvaguardie.
3. Gli over 65 sani ricevono la progressione di ETA-08: dopo quante settimane? Il PAR-Q classico dice «visita sopra i 69 se inattivi»: lo adottiamo come avviso?
4. Gli esercizi nuovi (alzata dalla sedia, equilibrio) richiedono immagini e inventario: vanno decisi insieme alla nota sulla biomeccanica.

**Da verificare con ricerca (Appendice B)**
5. Posizioni NSCA 2019 sugli anziani e ACSM 2026: dosi, intensità, potenza; la gap-analisi cita «70-85%» senza che io l'abbia ritrovato qui.
6. Tabelle di norme (30-s alzate, 5xSTS, TUG, presa, equilibrio, passo): tutte a memoria.
7. Cadute: Cochrane 2019 e Otago (percentuali, dose in ore).
8. LIFTMOR e linee guida su osteoporosi: movimenti da filtrare, impatti, pesi pesanti.
9. Ipertensione e Valsalva; soglie di pressione per la visita; PAR-Q+ 2023 e ACSM 2015/2018.
10. Recupero più lento negli anziani? RIR/RPE negli anziani? Riposo tra le serie? Volume settimanale (PMID 34658936)?
11. Artrosi, statine, beta-bloccanti, polifarmacia, cognizione, obesità sarcopenica, programmi a casa.
12. Divulgatori (Phillips, Schoenfeld, Israetel, Galpin, Norton, Barbell Medicine, Baraki, Ethier): nessuna posizione è stata verificata.
13. Adolescenti: prevalenza di dolori da crescita (Osgood-Schlatter, Sever), spondilolisi e dolore lombare nei sollevatori, soglia di 1RM, rapporto istruttori, età biologica contro cronologica.
14. La nota sulle donne non è ancora in `docs/`: menopausa e osso sono solo un rimando.

## 10. Limiti onesti

- **18 ricerche sole su circa 60 pianificate**: il tetto web è finito. Gli adolescenti hanno la copertura migliore; gli over 65 hanno solo sarcopenia, dose-risposta e proteine; il resto è a memoria. Una riga marcata [CM] **non è una prova**.
- **Solo snippet**: nomi di autori, n e popolazioni spesso mancano; i numeri sono di seconda mano. Studi citati per titolo, rivista, anno o PMID visti nel risultato. Una frase degli snippet sull'AAP («fino alla maturità scheletrica, Tanner 5») non si riesce ad attribuire con certezza alla versione 2008 o 2020: trattata come versione vecchia.
- **Popolazioni**: meta-analisi sui giovani atleti con allenatore, non su adolescenti sedentari; Borde 2015 è di qualità metodologica bassa; le meta-analisi sulla sarcopenia riguardano chi ha già una diagnosi; LIFTMOR è su donne in postmenopausa con supervisione.
- **Osservazionali**: sonno e infortuni, uso di steroidi e integratori, mortalità e rinforzo muscolare.
- **Nessuna certezza su norme e soglie** (alzate dalla sedia, TUG, 5xSTS, presa): scritte a memoria con intervalli.
- **Nessuna persona citata senza fonte vista**: le posizioni dei divulgatori non sono state ritrovate.
- **Autodichiarazione**: l'età, il sesso e le malattie sono dichiarati dall'utente; l'app non può verificare né supervisionare.
- **Codice**: righe lette direttamente (`ricette.js`, `regole-ricerca.js`, `regole-nuove.js`, `esigenza.js`, `partenza.js`, `agente-consigli.js`, `repertorio.js`, `onboarding.js`, `il-coach.js`, `intensita.js`, `metodi-momenti.js`, `biomeccanica.js`, `libreria-esercizi.js`); `tests/` e `js/ui/progressi/` non aperti.

## Appendice A. Le 18 ricerche riuscite

Tutte con WebSearch; le prime sei di studi con `allowed_domains` PubMed/PMC/Springer, le altre come indicato.

| # | Query (sintesi) | Cosa ha dato |
|---|---|---|
| 1 | Youth resistance training position statement NSCA 2014 safety efficacy | Lloyd 2014 (BJSM): errori di supervisione e carico dietro i casi di fratture; umbrella review 2020 (PMID 32757164); PMC4861005 |
| 2 | RT children adolescents growth plate injury risk systematic review | PMID 24393806 «no need to avoid until physeal closure»; PMC5532191 |
| 3 | Youth RT meta-analysis dose-response volume intensity | PMID 26851290: >23 sett, 5 serie, 6-8 rip, 80-89%, 3-4 min (atleti); PMC6113383 |
| 4 | Adolescent hypertrophy puberty muscle mass | Sports Med 2026 s40279-026-02499-0 (23 studi, 1.443; d per stadio); PMC3787286 |
| 5 | Neuromuscular training ACL female adolescents meta-analysis | PMID 19760399, 27251898, 23048042; effetto 40-70%, <18 anni -72% vs -16% |
| 6 | AAP strength training children adolescents policy statement | Pediatrics 2008 (121:835), 2020 (145:e20201011), riconfermato 2024 |
| 7 | Stricker 2020 AAP 1RM testing no minimum age | 1RM «può essere sicuro» con supervisione; non indica età minima rigida |
| 8 | 1RM testing children safety | PMC3445252; test a più ripetizioni come alternativa; AAP «non raccomandato fino alla maturità» (versione non chiara) |
| 9 | Steroids and supplements adolescents muscle dysmorphia | PMC10516554, PMC7043030, PMC4856064, PMC12893016; prevalenze e legami con l'insoddisfazione corporea |
| 10 | Eating disorders adolescent athletes RED-S screening | PMC9724109, PMC7885388 (DESA-6), PMC12114068 |
| 11 | Adolescent athletes sleep injury | PMC9496483, PMC10745648; <8 h x1,7; 8-10 h AASM |
| 12 | Creatine adolescents safety ISSN | ISSN 2017 (PMC5469049); PMID 30547033; PMC7922146 |
| 13 | Lloyd 2014 no minimum age technical competency supervision | «No minimum age», competenza tecnica e capacità di seguire istruzioni; s40279-018-0914-4 (ragazze) |
| 14 | RT hypertrophy children 2026 maturational stage | Conferma di #4; obesi adolescenti (s40798-022-00501-3) |
| 15 | RT injury rates youth weightlifting | Sports Med 2016 (infortuni per 1.000 h); PMC4034275; PMID 38606635 |
| 16 | Sarcopenia RT older adults meta-analysis | PMID 42304276, s11556-025-00399-2, PMC12883749: differenze medie e dosi |
| 17 | Anabolic resistance protein older adults | PMC3201893, PMC4555150, PMC8566396 (titolo), PMC11333332 |
| 18 | Dose-response RT healthy old adults Borde 2015 | PMID 26420238: 2-3 serie, 7-9 rip, 51-69% 1RM, 120 s, 2-3 sedute; PMID 34658936 (titolo); PMC10818109 |

## Appendice B. Query pronte (da rilanciare con il tetto alzato; `allowed_domains` PubMed/PMC/Springer salvo dove indicato)

1. `Fragala 2019 NSCA position statement resistance training older adults`
2. `Faigenbaum 2009 youth resistance training updated position statement NSCA`
3. `ACSM position stand exercise physical activity older adults` (anche aggiornamento 2026)
4. `WHO 2020 guidelines physical activity older adults muscle strengthening` (senza filtri)
5. `Cochrane 2019 exercise falls prevention community-dwelling older adults Sherrington`
6. `Otago exercise programme falls randomised trial meta-analysis`
7. `power training older adults meta-analysis physical function velocity`
8. `high-intensity versus low-intensity resistance training older adults meta-analysis`
9. `high-intensity resistance training frail elderly adverse events safety Fiatarone`
10. `RIR RPE accuracy older adults resistance training` e `repetitions in reserve trainability young and older BMC Sports Sci Med Rehabil 2026`
11. `rest interval between sets older adults resistance training meta-analysis`
12. `recovery after resistance exercise older versus young adults muscle damage meta-analysis`
13. `resistance training frequency older adults one versus two versus three days per week`
14. `weekly sets volume muscle mass older individuals` (PMID 34658936)
15. `LIFTMOR Watson 2018 high-intensity resistance impact training bone density postmenopausal`
16. `exercise osteoporosis position statement spinal flexion vertebral fracture`
17. `resistance training hypertension blood pressure Valsalva older adults`
18. `exercise knee hip osteoarthritis guideline OARSI Cochrane`
19. `statin muscle symptoms exercise STRIDE trial`
20. `beta blockers exercise prescription heart rate perceived exertion`
21. `polypharmacy fall risk increasing drugs exercise older adults`
22. `resistance training cognitive function older adults meta-analysis mild cognitive impairment`
23. `sarcopenic obesity resistance training protein meta-analysis ESPEN EASO consensus`
24. `home-based resistance exercise older adults meta-analysis`
25. `menopause resistance training bone muscle` (solo rimando alla nota donne)
26. `PAR-Q+ 2023 Warburton` e `ACSM preparticipation health screening 2015 Riebe`
27. `30-second chair stand test norms older adults Rikli Jones CDC STEADI`
28. `five times sit to stand reference values Bohannon cut-off falls`
29. `handgrip strength norms by age sex Dodds EWGSOP2 2019 cut-offs`
30. `timed up and go reference values meta-analysis cut-off fall risk`
31. `gait speed survival Studenski 2011 sarcopenia 0.8 m/s`
32. `frailty resistance training multicomponent exercise Vivifrail Cochrane`
33. `muscle-strengthening activity mortality dose-response Momma 2022`
34. `time-efficient resistance training minimal dose Iversen 2021`
35. `middle-aged adults resistance training tendon injury risk after 40`
36. `master athletes resistance training volume recovery Israetel` (con `allowed_domains ["youtube.com"]`)
37. `Stuart Phillips older adults resistance training protein` (YouTube e sito del podcast)
38. `Schoenfeld older adults hypertrophy resistance training`
39. `Barbell Medicine older lifters strength training aging Baraki`
40. `Layne Norton Andy Galpin Jeremy Ethier older lifters training` (YouTube)
41. `Osgood-Schlatter Sever disease resistance training adolescents`
42. `spondylolysis low back pain adolescent weightlifters`
43. `Resistance Training Skills Battery adolescents` (PMC12713556)
44. `peak height velocity training windows long-term athlete development`
45. `IOC consensus 2023 relative energy deficiency in sport adolescent female`
46. `steroid prevention program adolescent athletes ATLAS ATHENA`
47. `chair-based resistance exercise very old frail nursing home`
48. `blood flow restriction older adults safety`
49. `slow versus fast velocity resistance training older adults`
50. `machines versus free weights older adults strength function`
