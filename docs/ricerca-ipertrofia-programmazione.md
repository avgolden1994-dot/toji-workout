# Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

**Copertura: 42 ricerche web riuscite; il resto da conoscenza del modello (marcata [K]).**

Ambito: estende e in alcuni punti corregge `docs/ricerca-struttura-e-intensita.md` (che resta valido dove non è citato qui). Tocca le regole **PRG-03, PRG-10, PRG-23..30, PRG-33/34, PRG-38**, **ABB-03/05/06/10**, **RIC-01/04**, **CAR-03** e i parametri in `js/coach/parametri.js`. Le proposte hanno il codice nuovo **IPE** (ipertrofia/programmazione; controllato: non usato in `docs/` né in `js/`). Data della ricerca: **2026-10-05**.

**Come si legge.** Forza = Solida / Moderata / Convenzione, più la bandiera **Contrastata** (stessa scala di `docs/ricerca-struttura-e-intensita.md`). Marcatori sulle fonti:

- **[S]** visto solo nel riassunto di WebSearch o in una pagina di terzi: numeri da ricontrollare, non usarli in una regola senza un secondo riscontro;
- **[T]** visto solo titolo e URL (PMID/PMC): l'esito NON è stato visto, non uso numeri;
- **[P]** preprint non rivisto;
- **[3]** fonte di livello 3 (sito commerciale, calcolatore, riassunto di blog): serve a capire la pratica, non è prova;
- **[K]** **Conoscenza del modello (non verificata sul web)**: scritta dall'autore della nota (il modello) a memoria perché il budget di ricerca è finito. Forza solo **Convenzione** o **Moderata (da verificare)**; autori e anni solo se ricordati con sicurezza, altrimenti dichiarati incerti; intervalli al posto di cifre precise; nessun DOI o PMID non visto in un risultato.

**Come è stata fatta.** Solo WebSearch (WebFetch/curl bloccati, `references/rete.md`), con `allowed_domains` PubMed/PMC/Springer per titoli e PMID. Circa **42 interrogazioni riuscite** (volume, frequenza, cedimento/RIR, pause, ROM e lunghezza muscolare, tecniche, superserie, minimal dose, scarico, split, esperti). Poi il **budget di sessione di WebSearch (200 chiamate, condiviso con gli altri agenti) è finito**: restano senza ricerca, o con soli titoli, principianti, over 65, donne, polpacci/avambracci/addome/collo/deltoidi/glutei nello specifico, tempo ed eccentrica, intervallo di ripetizioni, varietà degli esercizi, macchine contro pesi liberi, unilaterale (vedi 1.9, 1.10 e sezione 6). Su indicazione del coordinatore non ho insistito con la ricerca: questi temi sono completati con la **conoscenza del modello** (1.10), marcata **[K]**, e nei «numeri per il generatore» sono Convenzione o Moderata (da verificare). Le query per rifarli sono nell'appendice (sezione 8).

---

## 1. Cosa dicono le fonti

### 1.1 Volume settimanale per muscolo

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Curva volume-ipertrofia | Più volume, più crescita, con rendimenti decrescenti; probabilità posteriore che la pendenza del volume superi zero = 100% per ipertrofia e forza; i rendimenti decrescenti sono molto più marcati per la **forza**. 67 studi, 2058 partecipanti (79,1% uomini, 20,9% donne, età media 25,16 ± 5,22) | Solida | Pelland, Remmert, Robinson, Hinson, Zourdos, Sports Med 2026;56(2):481-505, PMID 41343037 (online 2025). Concordi: Schoenfeld, Ogborn, Krieger 2017 (PMID 27433992: ≥10 serie/settimana per gruppo per massimizzare); Baz-Valle 2022 |
| Come contare le serie | Il metodo **frazionario** (serie indiretta = 0,5, diretta = 1) ha l'evidenza relativa più forte rispetto a «totale» (indirette = 1) e «solo dirette» (indirette = 0); per questo è il modello principale della meta-regressione | Moderata (un solo lavoro che confronta i metodi) | Pelland 2026 (stesso PMID); riassunti [S] in BarBend e FitChef [3] |
| Soglie numeriche della curva | Sotto circa 4 serie frazionarie a settimana la crescita è appena misurabile; 5-10 è il tratto più efficiente per serie; la crescita continua oltre 40 serie ma più lenta | Moderata **[S]** | Solo in riassunti di terzi (BarBend, FitChef [3]) della meta-regressione di Pelland 2026; il testo non è stato letto. **Il «+0,24% per serie a 12 serie frazionarie» del doc esistente non è stato ritrovato in questa sessione: da ricontrollare** |
| Allenati: basso, medio, alto | 7 RCT (6 nell'analisi quantitativa), ≥6 settimane, ≥1 anno di esperienza, 18-35 anni; categorie <12, 12-20, >20 serie/settimana. Nessuna differenza tra volume moderato e alto per quadricipiti e bicipiti; il volume alto sembra meglio per i **tricipiti** | Moderata (pochi studi) | Baz-Valle et al. 2022, J Hum Kinet, PMID 35291645 (PMC8884877) |
| Volume molto alto in atleti | 27 atleti di forza uomini; 10 settimane di allenamento, poi 7 settimane in cui il gruppo «extra» (n=15) fa 1,5 volte le serie (obiettivo ~60/settimana) contro il gruppo normale (n=12): nessuna differenza di massa muscolare; nello stacco il volume minore va meglio; la non-risposta non cambia | Moderata (un RCT, n piccolo) | DOI 10.1007/s42978-026-00387-7 (2026) |
| Aumento brusco di volume | 25 allenati (uomini e donne, 18-35 anni), 8 settimane, design unilaterale entro-soggetto: +120% di volume non riduce l'ipertrofia rispetto a +20%; i marcatori molecolari non differiscono | Moderata (n=25, 8 settimane) | J Appl Physiol 2026, PMID 42461790 (versione bioRxiv 2026 **[P]** e un precedente preprint 2025 **[T]**) |
| Perché i dati sugli allenati divergono | La revisione narrativa elenca i limiti dei confronti: gruppo muscolare ed esercizi scelti, volume precedente non controllato, calcoli di potenza ottimistici, variabilità tra soggetti. Titoli collegati **[T]**: «Muscle Hypertrophy Response Is Affected by Previous RT Volume in Trained Individuals» (PMID 32108724), «Training volume increases or maintenance based on previous volume» (PMID 39665246) | Moderata | Eur J Appl Physiol 2025, PMID 40883636 |
| Landmark RP (MV, MEV, MAV, MRV) | MV circa 4-8 serie; MEV circa 6-8 dirette; MAV 12-18; MRV 20-25; principiante 10-12, intermedio 12-16, avanzato 16-20 o più. Sono **euristiche** | Convenzione **[3][S]** | Siti di terzi (arvo.guru, maxfit.ee, fitnessvolt); non il testo di Israetel (la pagina «MV, MEV, MAV, MRV explained» di drmikeisraetel.com compare solo come titolo) |
| Helms / 3DMJ | 10-20 serie a settimana per gruppo o movimento, un po' meno se gli esercizi si sovrappongono | Convenzione **[S]** | Riassunto di ricerca sulle pagine 3DMJ (2025-2026) |
| ACSM 2026 | Circa 10 serie «dure» per muscolo a settimana come soglia per l'ipertrofia, con 15-20 se il recupero lo permette | Solida come posizione, **cifra vista solo in riassunti di terzi [S]** | ACSM (titolo «Landmark 2026 Resistance Training Guidelines — First Update in 17 Years» sul sito acsm.org); riassunti nfpt.com, gymlog.eu (che nel titolo cita 137 studi, come il doc esistente) |

### 1.2 Serie per seduta e frequenza

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Serie per seduta | Relazione dose-risposta positiva con rendimenti decrescenti; il «punto di non rilevabile superiorità» (PUOS) è a circa **2 serie dirette per la forza** e circa **11 serie frazionarie per l'ipertrofia**. PUOS = oltre quel punto non si riesce a vedere un vantaggio; non è un tetto fisiologico | Moderata **[P]** | Remmert, Pelland, Robinson, Hinson, Zourdos (FAU), SportRxiv 2025, «Is There Too Much of a Good Thing?». Il doc esistente lo attribuisce a «Pelland»: il primo autore è Remmert |
| Tetto per seduta secondo i divulgatori | «5 serie» dalla ricerca sui roditori, «circa 10» dalla meta-analisi di Krieger: oltre, meglio spostare le serie in un'altra seduta | Convenzione **[S][3]** | Riassunto di ricerca su pagine e video di Nippard («How Much Training Volume Do You Really Need?», titolo visto **[T]**); Biolayne Reps n. 36 «Too Much Muscle Math?» **[T]** |
| Frequenza a volume pari | Nella meta-regressione solo la **forza** mostra effetti di frequenza identificabili; per l'ipertrofia l'effetto è piccolo e incoerente (Henselmans riferisce una probabilità del 91% che frequenze più alte diano più crescita, ma effetto piccolo) | Solida (frequenza poco rilevante a volume pari) | Pelland 2026 (abstract visto); Henselmans (sito) **[S]** |
| 2 volte contro 1 | A volume pari, allenare un muscolo 2 volte a settimana dà più ipertrofia di 1; se 3 sia meglio di 2 resta una domanda aperta | Solida | Schoenfeld e coll. 2019, PMID 30558493 **[S]** (riassunto dell'abstract). ACSM 2026: 2-3 sedute per muscolo **[S]** |
| Frequenza negli allenati | Titoli: «Equal-Volume Strength Training With Different Training Frequencies Induces Similar Muscle Hypertrophy... in Trained Participants» (PMC8766679) **[T]**; recensioni di Henselmans «5x beats 2x» e «Bro splits optimal after all?» **[T]** (due studi con esiti opposti) | Contrastata | vedi sezione 2 |
| Full body contro split (RCT) | 50 donne non allenate, stessi esercizi e stesse serie (3 × 8-12RM), full body 2 volte contro upper/lower 4 sedute: nessuna differenza in forza e massa. Uomini allenati: il total body è meglio per la forza e lo split sembra meglio per la massa **[S]**. 23 uomini ben allenati, 75 serie/settimana, 8 settimane: il full body (5 giorni) fa perdere più grasso | Moderata (n piccoli, risultati non concordi) | PMC9107721 (2022); J Strength Cond Res PMID 32168178 (titolo «A Comparison Between Total Body and Split Routine... in Trained Men») **[S]**; PMID 38874955 |

### 1.3 Vicinanza al cedimento, carico e pause

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| RIR e ipertrofia | Meta-regressioni: per la **forza** la pendenza sul RIR stimato è nulla; per l'**ipertrofia** la crescita aumenta quanto più ci si ferma vicino al cedimento (pendenza negativa sul RIR). Modelli corretti per carico, metodo di pareggio del volume, durata e livello | Moderata | Robinson, Pelland et al. 2024, Sports Med, DOI 10.1007/s40279-024-02069-2 |
| Cedimento contro non cedimento | Vantaggio banale del cedimento di serie: effetto 0,19 (IC 95% 0,00-0,37); sottogruppo cedimento muscolare momentaneo: 0,12 (IC −0,13-0,37); 15 studi; autori: nessuna prova che il cedimento sia superiore, forse relazione non lineare | Moderata | Refalo et al. 2023, PMC9935748 |
| Cedimento secondo ACSM 2026 | Basta arrivare a circa 2-3 ripetizioni dal cedimento; il cedimento non dà vantaggi in forza, ipertrofia o potenza; carichi dal 30% al 100% di 1RM vanno bene se la serie è vicina al cedimento | Solida come posizione **[S]** | Riassunti di terzi dell'ACSM 2026 (nfpt.com, gymlog.eu, moveyourbonespt.com) |
| «Ripetizioni efficaci» | Modello Beardsley: solo le ultime circa 5 ripetizioni prima del cedimento (alto reclutamento e alta tensione) stimolano; con 6-15RM o 16-30RM il reclutamento è simile se la vicinanza al cedimento è la stessa (entro 5 RIR); fermarsi 1-2 ripetizioni prima riduce la fatica | Convenzione (meccanismo) **[S][3]** | Post su Patreon di Beardsley; la risposta critica di Stronger By Science «The Evidence is Lacking for "Effective Reps"» compare solo come titolo **[T]** |
| RPE per l'ipertrofia secondo SBS | Per la massa lavorare a RPE 7-9 sugli esercizi di ipertrofia, RPE 5-8 per i fondamentali accessori | Convenzione **[S]** | Riassunto su pagine Stronger By Science |
| Pause tra le serie | Meta-analisi bayesiana: 19 misure da 9 studi; pause brevi SMD 0,48 (IC credibile 95% 0,19-0,81), pause lunghe SMD 0,56 (0,24-0,86): forte sovrapposizione, eterogeneità elevata. Un preprint 2025 su <60 s contro >60 s in uomini con >1 anno di esperienza esiste **[P][T]** | Moderata | Singer et al. 2024, PMID 39205815 (PMC11349676); medRxiv 2025 |
| Pause secondo ACSM 2026 | 2-3 minuti tra le serie per l'ipertrofia | Solida come posizione, **[S]** | Riassunti di terzi; **contrasta** con il doc esistente (vedi sezione 2) |

### 1.4 Lunghezza muscolare, ROM e selezione per muscolo

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Femorali: leg curl seduto contro prono | RCT entro-soggetto, 20 adulti sani, 12 settimane, 70% di 1RM, volume muscolare con RM: volume totale dei femorali +14,1% (seduto) contro +9,3% (prono); il bicipite femorale cresce circa 2,2 volte di più col seduto, il semitendinoso circa 1,2 volte | Moderata (un RCT, n=20) | Maeo et al. 2021, PMC7969179 |
| Tricipiti: sopra la testa contro neutro | RCT: crescita dei tricipiti «sostanzialmente maggiore» con l'estensione sopra la testa che con quella a braccio neutro (pushdown) | Moderata **[S]** (numeri non visti) | Maeo et al. 2023, Eur J Sport Sci 23(7):1240-1250 |
| Polpacci: ROM | 42 giovani donne, 8 settimane, 3 volte a settimana, calf raise in ROM completo (−25° / +25°), parziale iniziale (−25° / 0°, muscolo allungato) o parziale finale (0° / +25°): più crescita del gastrocnemio col parziale in allungamento (nello snippet: +15,2% di spessore del gastrocnemio mediale dopo il parziale iniziale) | Moderata (n=42, donne giovani) | Kassiano et al. 2023, PMID 37015016 |
| Polpacci: in piedi o seduto; oltre il cedimento | Titolo: «Triceps surae muscle hypertrophy is greater after standing versus seated calf-raise training» **[T]** (PMC10753835). Parziali oltre il cedimento nei polpacci di allenati: due studi 2025 **[T]** (PMC12375417, PMC11847862). «Bigger Calves from Doing Higher Resistance Training Volume?» **[T]** (PMID 38684187) | Moderata (solo titoli) | vedi PMC indicati |
| Bicipiti | Titolo: «Training in the Initial ROM Promotes Greater Muscle Adaptations Than at Final in the Arm Curl» **[T]** (PMC9960616). RCT su 8 settimane di parziali a lunghezza lunga sui flessori del gomito in allenati **[T]** (PMID 41247250) | Moderata (solo titoli) | PMC9960616 (autori e anno non visti); PMID 41247250 (2025) |
| Dorsali, petto | Lat machine, allenati: parziali in allungamento e ROM completo danno miglioramenti simili (supporto «moderato» dei fattori di Bayes per l'uguaglianza). Petto: capitolo «Full ROM and Lengthened Partial ROM on Chest Hypertrophy and Strength» **[T]** | Moderata | PMC11829627 / PMID 39959841 (2025); capitolo Springer 10.1007/978-981-95-9653-9_53 **[T]** |
| ROM completo contro parziale | Wolf 2023: SMD banale a favore del ROM completo sul parziale in generale; parziali iniziali contro ROM completo −0,28 (IC −0,81 a 0,16). Un'analisi del 2025 su parziali a lunghezza lunga contro corta: l'ipertrofia regionale (distale e centrale) è favorita dalla lunghezza lunga. Revisione sistematica sulla crescita longitudinale: la lunghezza muscolare lunga «può» essere superiore ma le prove sono miste | Contrastata | Wolf et al. 2023 **[S]**; Sport Sci Health 2025 (DOI 10.1007/s11332-025-01586-5) **[S]**; PMID 41646176 **[S]**; una revisione (Springer 10.1007/s42978-024-00301-z, titolo «Does Performing Resistance Exercise with a Partial ROM at Long Muscle Lengths Maximize...?») conclude che non ci sono dati convincenti che la parziale a lunghezza lunga batta il ROM completo, ma può dare più crescita distale **[S]** |
| Estensione del ginocchio contro leg press | Titolo: «Hypertrophic Effects of Single- versus Multi-Joint Exercise: Knee Extension and Leg Press» **[T]** (PMC13215645) | n.d. | non letto |

### 1.5 Tecniche d'intensità, superserie, minimal dose

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Sistemi avanzati in ricreativi | Forza: effetto moderato a favore dei metodi avanzati (g = 0,351); ipertrofia: piccolo e non significativo (g = 0,046). Rest-pause con il coefficiente maggiore, vicino alla significatività; drop set, tempo controllato e cluster uguali alle serie normali a volume e sforzo pari | Solida (due meta-analisi concordi) | MDPI (ISSN 2411-5142) vol. 11(1):80, anno non visto (probabile 2026), PMID 41718208 (PMC12922048); Comparison of Traditional and Advanced RT Paradigms in Trained, PMID 38654909: 10 studi, spessore muscolare SMD 0,05 (IC −0,20-0,29), massa magra −0,01, area di sezione −0,07, tutte le misure −0,00: nessuna differenza, rischio di bias non chiaro in quasi tutti |
| Drop set | Meta-analisi 2023: 6 studi, 142 partecipanti (28 donne, 114 uomini, 19,2-27 anni), risultati comparabili alle serie tradizionali; i drop set alzano sforzo percepito e lattato | Moderata | Sports Med Open 2023, PMID 37523092 |
| Rest-pause e drop set in allenati | 28 maschi allenati, 8 settimane, volume pareggiato: ipertrofia simile; rest-pause leggermente meglio per la forza | Moderata (n=28) | PMID 34260860 |
| Cluster set | 10 allenati (7 uomini, 3 donne), 8 settimane, 2 sedute/settimana, 5 × 12 leg press e leg extension, pareggiati per RIR: spessore muscolare e massa magra simili | Moderata (n=10) | Vargas-Molina et al., Eur J Appl Physiol 2025, PMID 39932536 |
| Myo-reps | Titolo «Similar Strength and Hypertrophic Adaptations in Less Time? Myo-Reps vs Traditional Straight-Sets in Resistance-Trained Men» **[T]** | n.d. | PMID 42112925 |
| Superserie | Meta-analisi 2025, 19 studi, 313 persone: numero di ripetizioni e carico totale simili con una seduta più corta; le coppie agonista-antagonista permettono più ripetizioni; a 8-12RM al cedimento circa metà del tempo; costi: più sforzo percepito, più danno muscolare | Moderata (una meta-analisi + revisione narrativa Iversen 2021) | Sports Med 2025, PMID 39903375 (DOI 10.1007/s40279-025-02176-8) |
| Minimal dose / tempo | Revisione narrativa: esercizi multiarticolari bilaterali a ROM completo; almeno uno squat o leg press, una tirata e una spinta per la parte alta; **almeno 4 serie a settimana per muscolo** con 6-15RM; il volume conta più della frequenza | Moderata | Iversen, Norum, Schoenfeld, Fimland, Sports Med 2021, PMC8449772 |
| 1, 3 o 5 serie per esercizio | 34 uomini allenati, 3 volte/settimana, 8 settimane: tempo medio per seduta circa 13, 40 e 68 minuti; 1RM allo squat senza differenze; per l'ipertrofia prove a favore di 5 serie rispetto a 1. Meta-analisi di Krieger 2010: serie multiple circa +40% di effetto rispetto a 1 serie, 2-3 contro 4-6 senza differenza significativa | Solida (Krieger) / Moderata (RCT) | PMC6303131 **[S]**; Krieger 2010, PMID 20300012 **[S]**; doc esistente |

### 1.6 Mesociclo, progressione e scarico

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Struttura RP | Mesociclo di 4-6 settimane di accumulo e una settimana di scarico; RIR 3 alla settimana 1, 2, 1, poi 0-1; il volume sale verso l'MRV | Convenzione **[3]** | Siti di terzi (arvo.guru, mesostrength) |
| Progressione per serie | Lavoro «Mesocycle Progression in Hypertrophy: Volume Versus Intensity»: gli autori propongono di dare la priorità alla progressione del numero di serie sulla progressione della % di 1RM | Convenzione **[S]** | Strength Cond J 2020 (con lettere di risposta); autori non visti |
| Pratica dello scarico | Sondaggio su atlete e atleti di forza e fisico: 47,2% scarico programmato, 13,4% autoregolato, 39,4% misto; durata media 6,4 ± 1,7 giorni, ogni 5,6 ± 2,3 settimane | Convenzione (pratica, non esito) | Bell et al. 2024, Sports Med Open, PMID 38499934 |
| Consenso degli esperti | Delphi internazionale: l'autoregolazione può migliorare forza e ipertrofia e prevenire la maladattamento, servono studi sull'autoregolato contro il programmato; allenatori intervistati: «lo scarico non è necessario per progredire», forte variabilità individuale (alcuni ne hanno bisogno alla sesta settimana, altri non anche dopo 12) | Convenzione | Bell et al. 2023, Sports Med Open 9:87 (DOI 10.1186/s40798-023-00633-0); PMC9811819 |
| Effetto dello scarico | RCT entro-soggetto 2026, 8 settimane, giovani **non allenati**: scarico (circa 18% di serie in meno) e allenamento continuo danno ipertrofia e resistenza di forza simili. Studio di 9 settimane con una settimana di stop completo a metà: effetto minimo su ipertrofia, resistenza e potenza, nessuna supercompensazione; secondo un riassunto la forza degli arti inferiori ne risente | Moderata (pochi studi, non allenati o brevi) | PMC13031491 (2026); PMC10809978 **[S]** |
| Blocchi di Stronger By Science | Programmi da 21 settimane in tre blocchi da 7 con scarico alle settimane 7, 14 e 21 | Convenzione **[3]** | Riassunto su un sito di vendita (liftvault) |

### 1.7 Cosa dicono i praticanti

| Persona | Posizione, come l'ho vista | Forza | Fonte |
|---|---|---|---|
| Israetel / RP | MV, MEV, MAV, MRV; rampa di volume nel mesociclo, RIR a scendere, scarico; progressione per serie | Convenzione | siti di terzi **[3][S]**; Strength Cond J 2020 (titolo) |
| Helms / 3DMJ | Piramide: aderenza, poi volume e intensità, progressione, selezione, pause, tempo; 10-20 serie/settimana; 2-3 volte/settimana; la frequenza serve a tenere la qualità delle serie senza sedute interminabili; esercizi che stressano articolazioni e tessuti molli non sono candidati a alta frequenza/volume; cicli di specializzazione per un muscolo (titolo «Muscle Group Specialization Cycles: Why and How» **[T]**) | Convenzione | pagine 3DMJ **[S]** |
| Henselmans | La frequenza più alta che entra nel calendario, quindi full body; da 1 a 2 volte il beneficio è grande, oltre 3 meno; distribuire le serie nella settimana per averle più fresche | Convenzione | mennohenselmans.com **[S]**; titoli di recensioni su varietà degli esercizi, volume massimo, «Did high-volume training just get debunked?» **[T]** |
| Nippard | Volume con relazione dose-risposta; tetto indicativo di 5-10 serie per seduta | Convenzione | riassunto su pagine di prodotto e video **[S][3]** |
| Nuckols / SBS | Per la massa almeno 20 serie dirette per gruppo **[S]**; RPE 7-9; critica delle «ripetizioni efficaci» **[T]**; articolo «How to select exercises for muscle growth» **[T]** | Convenzione | strongerbyscience.com |
| Beardsley | Ripetizioni stimolanti; fermarsi a 1-2 ripetizioni dal cedimento per ridurre la fatica | Convenzione | Patreon **[S][3]** |
| Schoenfeld | ≥10 serie/settimana (2017); coautore di Iversen 2021 (tempo) | Solida (2017) | PMID 27433992, PMC8449772 |
| Norton / Biolayne | Articoli «The King of Volume Metas» e «Too Much Muscle Math?» sul volume per seduta | n.d. | Biolayne Reps **[T]** |

### 1.8 Correzioni e aggiunte a `docs/ricerca-struttura-e-intensita.md`

1. **Volume per seduta**: il preprint è di **Remmert** e coautori (Pelland, Robinson, Hinson, Zourdos), non di Pelland; ~11 serie frazionarie è un PUOS, non un tetto.
2. **Pelland**: pubblicato in Sports Med 2026;56(2):481-505; la cifra «+0,24% per serie» non è stata ritrovata in nessun risultato: marcarla «da ricontrollare».
3. **Pause**: il doc dice «oltre 90 secondi nessuna differenza»; ACSM 2026 (riassunti) raccomanda 2-3 minuti. Dati di Singer: SMD 0,48 (brevi) e 0,56 (lunghe) con ampia sovrapposizione. Vedi sezione 2.
4. **Frequenza ACSM 2026**: «2-3 sedute per muscolo» nei riassunti, il doc scrive «almeno 2».
5. **Cedimento**: aggiungere Robinson 2024 (la crescita sale avvicinandosi al cedimento; per la forza no) accanto a Refalo 2023 (effetto 0,19, IC 0,00-0,37).
6. **Superserie e tecniche avanzate**: il doc le dà «Solida»; qui la meta-analisi sulle superserie è una (19 studi) più una revisione narrativa: Moderata; per le tecniche avanzate (drop, rest-pause, cluster) ci sono due meta-analisi concordi: nessun vantaggio per l'ipertrofia (Solida).
7. **Conteggio frazionario**: confermato (indirette 0,5), ma applicato **per muscolo**: il generatore lo applica a 6 gruppi (vedi 3.1).

### 1.9 Cosa NON è stato cercato (budget finito) o è solo titolo

| Tema | Stato |
|---|---|
| Principianti (prime 8-12 settimane, volume, tecnica) | non cercato; uso il doc esistente (ACSM 2009/2026, Damas 2016) e Iversen 2021 (≥4 serie/muscolo) |
| Over 65 | solo titoli **[T]**: «Higher RT volume offsets muscle hypertrophy nonresponsiveness in older individuals» (J Appl Physiol 2024), «Strength Training Volume to Increase Muscle Mass Responsiveness in Older Individuals: Weekly Sets Based Approach» (PMC8514686), «Influence of RT Variables... in Sarcopenia: meta-regressions» (PMC12688407). I titoli suggeriscono che gli anziani possano aver bisogno di **più** volume, non meno: da leggere (sezione 6) |
| Donne | un RCT su donne non allenate (full body contro split, sopra); il 79,1% del campione di Pelland è maschile; titolo «RT alters body composition in middle-aged women depending on menopause» **[T]**. Nessun dato su risposta relativa o volume specifico |
| Glutei, avambracci, addome, collo, deltoide laterale e posteriore | non cercato (solo conoscenza generale, quindi Convenzione) |
| Tempo, eccentrica, intervallo di ripetizioni 5-30 oltre l'ACSM | non cercato |
| Varietà e rotazione degli esercizi | solo titolo di Henselmans («Fixed or varied exercise selection: which is better?») **[T]** |
| Macchine contro pesi liberi; unilaterale contro bilaterale | solo titoli **[T]**: BMC Sports Sci Med Rehabil 2023 (DOI 10.1186/s13102-023-00713-4); Sports Med 2024 (DOI 10.1007/s40279-024-02169-z) |
| Doppia progressione, PHUL, PHAT, frecce, bro split | non cercato: convenzione |
| Qualità dei piani generati da IA | titolo «A professional assessment of training plans for muscle hypertrophy and maximal strength developed by generative AI» **[T]** (PMC12492345): utile come confronto per il generatore, da leggere |

### 1.10 Conoscenza del modello (non verificata sul web)

Quanto segue **non è stato visto in nessun risultato di ricerca**: è ciò che ricordo, scritto con prudenza. Va usato solo come Convenzione o Moderata (da verificare), mai come base di una regola senza prima eseguire le query dell'appendice.

| Tema | Cosa ricordo | Forza | Incertezza |
|---|---|---|---|
| Ripetizioni e carico | A parità di sforzo vicino al cedimento l'ipertrofia è simile da circa 5 a 30 ripetizioni; la forza massimale favorisce i carichi pesanti. Ricordo una meta-analisi di Schoenfeld e colleghi (circa 2017) su carichi bassi contro alti e una rete di confronti di Lopez e colleghi (circa 2021) | Moderata (da verificare) **[K]** | Autori e anni a memoria; l'ACSM 2026 **[S]** visto nei riassunti è coerente (30-100% di 1RM) |
| Tempo di esecuzione | Durate di ripetizione tra circa 0,5 e 8 secondi danno ipertrofia simile; ripetizioni molto lente (oltre circa 10 secondi) sembrano peggiori. Ricordo una meta-analisi di Schoenfeld e colleghi (circa 2015) | Moderata (da verificare) **[K]** | Soglie esatte non sicure |
| Eccentrica | Fase di discesa controllata (circa 2-3 s); il sovraccarico eccentrico dà un piccolo vantaggio (già nel doc esistente, ACSM 2026) | Moderata (da verificare) **[K]** | - |
| Principianti | Crescono più in fretta; un volume basso basta (le fasce di 3.2); le prime settimane sono in gran parte adattamenti neurali e di coordinazione; tecnica prima del carico; 2-3 sedute full body | Moderata (da verificare) **[K]**; base ACSM 2009 nel doc esistente (Solida) | Quanto volume serve nelle prime 8-12 settimane: non verificato |
| Over 65 | La capacità di crescere resta, con «resistenza anabolica» (risposta più bassa allo stimolo); si consigliano almeno 2 sedute a settimana, carichi moderati-alti e attenzione a proteine e recupero; i titoli visti **[T]** fanno pensare che servano più serie in totale, non meno | Convenzione **[K]** | Dimensione dell'effetto e volumi: non verificati |
| Donne | Ricordo una meta-analisi (Roberts, Nuckols, Krieger, circa 2020) in cui l'ipertrofia relativa è simile tra i sessi; il corpo con più massa magra assoluta guadagna più in valore assoluto | Moderata (da verificare) **[K]** | Autori e anno a memoria, esito da ricontrollare; nessun dato visto su volume specifico per sesso |
| Glutei | EMG alti nell'hip thrust non provano la crescita; ricordo uno studio (Plotkin e colleghi, circa 2022-2023) in cui hip thrust e squat danno crescita dei glutei simile | Moderata (da verificare) **[K]** | Autori e anno incerti |
| Polpacci | Gastrocnemio (gamba tesa) e soleo (gamba piegata); sopportano frequenze alte e volumi medio-alti; pratica comune 8-16 serie a settimana | Convenzione **[K]** | Numero di serie non verificato |
| Deltoidi laterali e posteriori | Ricevono poco dalle spinte e dalle tirate; pratica 6-12 serie dirette a settimana, alte ripetizioni | Convenzione **[K]** | - |
| Avambracci, addome, collo | Gli avambracci lavorano con le prese; addominali e collo si allenano per estetica o funzione; non ci sono prove che servano per far crescere gli altri muscoli. Nessuna indicazione sul collo nel generatore | Convenzione **[K]** | Nessuna ricerca |
| Varietà e rotazione | Risultati misti nella letteratura che ricordo; pratica: fondamentali stabili per tutto il blocco (progressione misurabile), accessori che ruotano a ogni blocco | Convenzione **[K]** | Nessun autore sicuro |
| Macchine e pesi liberi | A parità di sforzo l'ipertrofia è simile; le macchine sono più stabili e più sicure da portare al cedimento | Moderata (da verificare) **[K]** | Titolo visto **[T]**, esito no |
| Unilaterale | Crescita simile a parità di volume; utile per asimmetrie e per tenere l'ampiezza | Convenzione **[K]** | Titolo della meta-analisi visto **[T]**, esito no |
| Doppia progressione | Prima si sale di ripetizioni dentro un intervallo, poi di carico: è già il metodo del coach per gli isolamenti (CAR-06) | Convenzione **[K]** | - |
| Specializzazione | Più serie (circa +25-50%) per 1-2 muscoli per 6-8 settimane, gli altri a mantenimento | Convenzione **[K]** | Titolo di Helms visto **[T]** |
| PHUL, PHAT, frecce, bro split | Strutture di pratica: PHUL alterna giorno forza e giorno ipertrofia; bro split = 1 seduta a settimana per muscolo; nessuna prova diretta | Convenzione **[K]** | - |

---

## 2. Dove le fonti non concordano

| Tema | Posizione A | Posizione B | Cosa adotta il coach e perché |
|---|---|---|---|
| **Volume ottimo per l'ipertrofia** | Stronger By Science: almeno 20 serie dirette **[S]**; RP: MAV 12-18, MRV 20-25 **[3]**; Pelland 2026: crescita oltre 40 serie, più lenta **[S]** | Helms 10-20 **[S]**; ACSM ≥10, fino a 15-20 **[S]**; Baz-Valle 2022: 12-20 uguale a >20 (tranne tricipiti); RCT 2026 su ~60 serie: nessun guadagno | Fasce **10-16** (intermedio) e **12-20** (avanzato); mai spingere oltre 20 di default: il costo in tempo e recupero cresce e l'evidenza sugli allenati non mostra guadagno. Contrastata |
| **Tetto per seduta** | Preprint Remmert 2025: PUOS ≈ 11 frazionarie **[P]** | Nippard/Krieger: 5-10 **[S][3]** | Obiettivo morbido 8, tetto duro 11 frazionarie. Contrastata |
| **Frequenza** | Henselmans: la più alta possibile (full body); SBS/Helms/ACSM: 2-3 | Pelland: effetto piccolo e incoerente; RCT su uomini allenati con esiti opposti (5x contro 2x; bro split non peggiore) | ≥2 volte per tutti (Solida); 3 volte solo per priorità o volume >16 (Moderata); scelta dello split per giorni e minuti |
| **Pause** | ACSM 2026: 2-3 minuti **[S]** | Singer 2024: brevi e lunghe sovrapposte; doc esistente: >60 s piccolo vantaggio | Multiarticolari pesanti 2-3 minuti, macchine 90-120 s, isolamenti 60-90 s; accorciare solo se serve tempo. Contrastata |
| **Ripetizioni efficaci e cedimento** | Beardsley: contano le ultime ~5 ripetizioni **[S][3]**; Robinson 2024: più vicino al cedimento, più crescita | SBS: prove carenti sulle «efficaci» **[T]**; Refalo 2023: cedimento non superiore | RIR 0-3 per tipo di esercizio, mai 0 programmato sui multiarticolari pesanti; scalare nel blocco. Contrastata |
| **Parziali in allungamento** | Maeo 2021 e 2023, Kassiano 2023 (femorali, tricipiti, polpacci); un riassunto di una revisione 2025 favorisce la lunghezza lunga | Wolf 2023: ROM completo banalmente meglio; lat machine in allenati: simili; revisione che non trova prove convincenti | Scegliere **varianti** in allungamento per tricipiti, femorali, polpacci, bicipiti (Moderata); le **parziali** solo opzionali come tecnica finale. Contrastata |
| **Scarico** | RP, SBS: programmato ogni 4-7 settimane **[3]** | RCT senza vantaggio per l'ipertrofia; allenatori: non necessario, forte variabilità | Reattivo prima, programmato ogni 5-6 settimane (intermedio/avanzato), solo reattivo nelle prime 7 settimane del principiante. Convenzione, Contrastata |
| **Braccia dirette** | Doc esistente (Barbalho): con panca e lat machine il volume equivalente non aggiunge, studi piccoli | Baz-Valle 2022: più crescita dei tricipiti con >20 serie; pratica dei bodybuilder | Pavimento di 4 serie dirette per bicipiti e tricipiti per l'ipertrofia, dentro il conteggio frazionario. Contrastata |
| **Split (trained)** | Total body meglio per la forza **[S]** | Split meglio per la massa **[S]** (un RCT) | Nessun vantaggio dimostrato a volume pari: decidono giorni, minuti e tetto per seduta |
| **Rest-pause e tecniche** | Rest-pause con il coefficiente più alto, non significativo | Altre tecniche = serie normali | Solo per risparmiare tempo, mai promesse di più crescita |

---

## 3. Numeri per il generatore

Conteggio: serie dirette = 1; serie indiretta da un multiarticolare = 0,5 (Pelland 2026), **per muscolo** (bicipiti, tricipiti, deltoidi anteriori/laterali/posteriori, quadricipiti, femorali, polpacci, glutei, petto, dorsali). Dati e secondari per esercizio esistono già in `DETTAGLI` (`dettaglioEsercizio(nome).bersaglio` e `.secondari`, `js/dati/dettagli-esercizi.js:262-276`).

### 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05)

Eseguita leggendo il codice in un contesto Node (nessuna modifica all'app): uomo di 30 anni, obiettivo massa, palestra, seme «audit», metodo «coach». Serie dirette a settimana per gruppo; tra parentesi le frazionarie del gruppo. Sono fatti sul codice, non prove.

| Configurazione | Esercizi × serie per seduta | petto | schiena | spalle | gambe | glutei | braccia dirette (frazionarie) |
|---|---|---|---|---|---|---|---|
| Intermedio, 3 giorni, 30 min | 5 esercizi, 10-11 serie (quasi tutti a 2 serie) | 4 (5) | 6 (6) | 4 (9) | 11 (13) | 4 (6,5) | **0** (6) |
| Intermedio, 3 giorni, 45 min | 5 esercizi, 13-16 serie | 7 (8,5) | 9 (9) | 5 (13) | 14 (17) | 6 (10) | **0** (9,5) |
| Intermedio, 2 giorni, 45 min | 3 esercizi, 15 serie | 5 (7,5) | 10 (10) | 5 (12,5) | 5 (7,5) | 5 (7,5) | **0** (10) |
| Intermedio, 4 giorni, 60 min | 6 esercizi, 14-20 serie | 8 (12) | 14 (14) | 12 (23) | 17 (22) | 10 (15,5) | 4 (19) |
| Principiante, 3 giorni, 45 min | 4-5 esercizi, 11-13 serie | 6 (7,5) | 9 (9) | 5 (12,5) | 7 (10) | 6 (7,5) | 0 (9) |
| Avanzato, 5 giorni, 60 min | 5-6 esercizi, 15-17 serie | 12 (15) | 15 (15) | 10 (23,5) | 20 (27) | 14 (21) | 4 (20,5) |

Cinque fatti ricavati:

1. **Il taglio per il tempo domina il volume.** Con 30-45 minuti molti esercizi finiscono a 2 serie (la regola PRG-33 toglie serie dopo che PRG-25 le ha aggiunte): i muscoli grandi restano a 4-9 serie dirette a settimana; con 2 giorni e 30 minuti sono 3.
2. **I gruppi sono troppo grossi.** `braccia` somma bicipiti e tricipiti (le spinte credite ai tricipiti e le tirate ai bicipiti finiscono nello stesso numero), `gambe` somma quadricipiti, femorali e polpacci, `spalle` somma anteriori, laterali e posteriori e prende 0,5 da ogni spinta e tirata. «Spalle 13» o «braccia 9,5 frazionarie» nascondono 0 alzate laterali e 0 serie dirette di braccia (campione intermedio 3 giorni, 45 min: nessuna alzata laterale, nessun curl o tricipite diretto).
3. **ABB-03 aggiunge le braccia dirette solo da 4 giorni**, con 2+2 serie; con 3 giorni a 45 minuti il generatore non ne mette.
4. **Giornata «forza» del PHUL dentro 45 minuti**: bilanciere e military 3 × 5 con 180 s di pausa occupano circa 20 dei 48 minuti stimati; il modello del tempo (8 minuti + serie × (35 s + pausa)) non conta riscaldamento né cambi di attrezzo, quindi la seduta reale supera il tempo dichiarato.
5. **PRG-23 non aggiunge le alzate laterali a 30-45 minuti.** `aggiungiRegione` (`ricette.js` ~r. 247) salta la seduta se ha già più di `nEs` esercizi: `nEs` è 3 a 30-45 minuti e ABB-03 ha già aggiunto polpacci, deltoidi posteriori e core (5 esercizi da 2 serie); a 60 minuti `nEs` è 4 e le laterali compaiono (osservato: intermedio 3 giorni, 60 min). Il numero reale di esercizi a 30 minuti (5) viene quindi da 3 + 2 aggiunte, non da `exerciseCountFor` (r. 110, che qui darebbe 3).

### 3.2 Serie settimanali per muscolo (conteggio frazionario)

| Livello | Ipertrofia | Fitness generale / salute | Forza | Note |
|---|---|---|---|---|
| Principiante (<6 mesi) | **6-10** (centro 8), 2-3 sedute | **4-8** | Moderata | Pavimento 4 (Iversen 2021, Pelland 2026 **[S]**); il doc esistente e il codice (8-10) sono nella fascia |
| Intermedio | **10-16** (centro 12-14) | **6-10** | Solida per ≥10 (Schoenfeld 2017, ACSM 2026 **[S]**); Convenzione **[K]** per la parte alta | `VOLUME_LIVELLO` 10-14: ok, alzare il tetto a 16 solo dove il tempo c'è |
| Avanzato | **12-20** (centro 14-18); muscolo prioritario fino a 20-24, **massimo 2 prioritari** | **8-12** | Moderata e Contrastata (sezione 2) | Oltre 20 nessun guadagno mostrato negli allenati (Baz-Valle 2022, RCT 2026) |
| Mantenimento di muscoli non prioritari (specializzazione) | **≥6** (mai sotto 4) | - | Convenzione **[K]** | MV 4-8 solo da siti di terzi **[3]**; sotto ~4 serie frazionarie la crescita è appena misurabile **[S]** |

Pavimenti di **serie dirette** (oltre al conteggio frazionario) per i muscoli che i multiarticolari allenano poco, obiettivo ipertrofia, intermedio e avanzato:

| Muscolo | Dirette/settimana (interm. / avanz.) | Scelta preferita | Ripetizioni | Forza |
|---|---|---|---|---|
| Tricipiti | 4-6 / 6-8 | estensione sopra la testa (Maeo 2023) | 10-15 | Moderata (Maeo 2023; Baz-Valle 2022 sul volume) |
| Bicipiti | 4-6 / 6-8 | curl su panca inclinata o Scott | 8-15 | Moderata **[T]** (PMC9960616), Convenzione **[K]** sul numero |
| Deltoide laterale | 4-6 / 6-10 | alzate laterali ai cavi o manubri | 12-20 | Convenzione **[K]** (non cercato) |
| Deltoide posteriore | 3-4 / 4-8 | reverse pec deck, face pull | 12-20 | Convenzione **[K]** (non cercato) |
| Femorali | 4-6 / 6-8 | **leg curl seduto** (+ stacco rumeno, valore frazionario) | 8-15 | Moderata (Maeo 2021) |
| Polpacci | 6-8 / 8-10, 2-3 sedute | calf raise **in piedi**, pausa in basso | 8-15 | Moderata **[T]** (standing > seduto, Kassiano 2023), Convenzione **[K]** sul numero |
| Quadricipiti | 6-8 / 8-12 (squat, press e affondi contano) | leg extension per il retto femorale | 8-15 | Convenzione **[K]** |
| Glutei | 6-10 / 8-14 | spinta d'anca, affondi bulgari, stacco rumeno | 8-12 | Convenzione **[K]** (EMG non è crescita; non cercato) |
| Addominali, avambracci, collo | 0-6 / 0-4 / 0 | opzionali | 10-20 | Convenzione **[K]**, nessuna prova che servano per crescere |

### 3.3 Serie per seduta e frequenza

| Parametro | Default | Forza |
|---|---|---|
| Serie frazionarie per muscolo per seduta | obiettivo morbido **≤8**, tetto **11**; conteggiare anche le indirette | Moderata **[P]** (Remmert 2025) |
| Serie per esercizio | principiante e over 65 ≤3; multiarticolare 3-4; isolamento 2-3; stacchi ≤3 (ABB-09) | Moderata (Krieger 2010: 2-3 contro 4-6 senza differenza; doc esistente) |
| Frequenza | ≥2 sedute/settimana per ogni muscolo principale; 3 per i prioritari o oltre 16 serie/settimana; 1 solo se l'utente la sceglie (tetto 11 per seduta) | Solida (≥2); Moderata (3) |
| Distribuzione dei muscoli «piccoli» | deltoidi laterali/posteriori, braccia e polpacci in almeno 2 sedute | Convenzione **[K]** |
| Esercizi per seduta (grandi muscoli) | un multiarticolare di ogni schema, almeno uno squat o leg press, una spinta, una tirata | Moderata (Iversen 2021) |

### 3.4 Ripetizioni, sforzo e pause per tipo di esercizio

| Tipo | Ripetizioni | RIR (serie di lavoro) | Pausa | Forza |
|---|---|---|---|---|
| Multiarticolare pesante col bilanciere | 5-10 | 1-3 | 150-180 s (120 s per ipertrofia in poco tempo) | Carico: Solida (ACSM 2026 30-100% di 1RM **[S]**); pausa: Contrastata |
| Multiarticolare a macchina o manubri | 8-12 | 0-2 | 90-120 s | Moderata |
| Isolamento (non polpacci/deltoidi) | 10-15 | 0-1 sull'ultima serie | 60-90 s | Moderata (Robinson 2024) |
| Polpacci, deltoidi laterali, avambracci | 12-20 | 0-1 | 45-60 s | Convenzione **[K]** |
| Superserie antagoniste | come sopra | come sopra | 75-90 s tra una coppia e l'altra | Moderata (meta-analisi 2025) |
| Tecnica d'intensità (drop, rest-pause, myo-reps, cluster) | solo ultimo isolamento | 0 | breve | Solida come **risparmio di tempo**, nessun vantaggio di crescita |

L'intervallo di ripetizioni 5-30 e il tempo/eccentrica **non sono stati cercati**; per il carico vale l'ACSM 2026 (tutti i carichi 30-100% vanno bene se vicini al cedimento).

### 3.5 RIR bersaglio per settimana del blocco (ipertrofia)

| Livello | Sett. 1 | 2 | 3 | 4 | 5 | Scarico | Forza |
|---|---|---|---|---|---|---|---|
| Principiante | 3-4 | 3 | 3 | 2-3 | 2-3 | 4 | Convenzione **[K]** (le stime di RIR sbagliano di circa 1 ripetizione, doc esistente) |
| Intermedio (multi / isolamento) | 3 / 2-3 | 2-3 / 2 | 2 / 1-2 | 1-2 / 1 | 1 / 0-1 | 4 / 3-4 | Convenzione **[K]** + Moderata (Robinson 2024) |
| Avanzato (esistente) | 3 | 2 | 2 | 1 | 0 (solo isolamenti) | 4 | Convenzione **[K]** (RP, Helms) |

Oggi solo l'avanzato ha la rampa (`rirSett`, esempio rilevato 3,2,2,1,0,4); l'intermedio ha un RIR fisso per tipo (isolamento 0-1 già dalla prima settimana).

### 3.6 Scarico: quando e come

| Elemento | Default | Forza |
|---|---|---|
| Blocco | principiante: 8 settimane, scarico programmato solo alla fine; intermedio: 12 settimane in 2 blocchi da 5+1; avanzato: 5+1 (invariato) | Convenzione + Contrastata; sondaggio: ogni 5,6 ± 2,3 settimane (Bell 2024) |
| Segnali reattivi | prontezza <50 (media delle ultime 2-3 sedute); sRPE medio ≥9 nelle ultime 3 sedute; due «mancati» di fila su 2 o più esercizi principali; dolore che persiste o peggiora (già in `livelloFatica`, CAR-07/08, DEC); nuovo: sonno «male» per 2 settimane | Convenzione **[K]** |
| Contenuto | stessi esercizi; serie −35% a −50%; carico −5% a −10% (come CAR-03); RIR 4; 5-7 giorni | Convenzione **[K]** (6,4 ± 1,7 giorni: Bell 2024); nessuno studio su ipertrofia mostra un vantaggio dello scarico |
| Salvaguardie | le regole di sicurezza (dolore, PAR-Q, over 65) vincono sempre e possono anticipare lo scarico | - |

### 3.7 Split per giorni e per minuti

| Giorni | Principiante | Intermedio | Avanzato | Frequenza per muscolo | Forza |
|---|---|---|---|---|---|
| 2 | Full body A/B | Full body A/B | Full body A/B | 2 | Solida (≥2) |
| 3 | Full body 3 volte (A/B/A) | Upper / Lower / Full (ABB-05) oppure full body A/B/C se ≤45 min | Upper / Lower / Full | 2 (3 per i prioritari nel full body) | Moderata (a volume pari conta poco) |
| 4 | Upper / Lower | Upper / Lower × 2 | Upper / Lower × 2 | 2 | Moderata |
| 5 | Upper / Lower + 1 giorno «punti deboli» | Upper / Lower + Push / Pull / Legs | Push / Pull / Legs + Upper / Lower | 2 | Convenzione **[K]** |
| 6 | non consigliato | Push / Pull / Legs × 2 | Push / Pull / Legs × 2 | 2 | Convenzione **[K]** |
| Bro split (1 volta) | solo ispirazione | solo se scelto | solo se scelto | 1 | Contrastata (frequenza 1 inferiore a 2 a volume pari) |

PHUL, PHAT e «frecce» non sono stati cercati: restano Convenzione.

### 3.8 Esercizi e serie per seduta in base ai minuti

Calcolo da modello (6 minuti di riscaldamento, 1 minuto per cambio di esercizio, 40 s per serie più pausa di 100 s in media), **non una cifra di letteratura**; il modello attuale di PRG-33 è 8 minuti + serie × (35 s + pausa) e non conta i cambi.

| Minuti | Esercizi | Serie di lavoro | Con superserie antagoniste | Pausa multi / iso | Forza |
|---|---|---|---|---|---|
| 30 | 4 (2-3 multiarticolari + 1-2 isolamenti) | 8-10 | 12-14 | 90-120 / 45-60 | Convenzione **[K]** (calcolo) |
| 45 | 5 | 12-15 | 18-20 | 90-120 / 60 | Convenzione **[K]** |
| 60 | 6 | 16-20 | 22-24 | 120-150 / 60-75 | Convenzione **[K]** |
| 75 | 7 | 20-24 | - | 120-150 / 75 | Convenzione **[K]** |
| 90 | 8 (massimo) | 24-28 | - | 150-180 / 75 | Convenzione **[K]** |

Regola d'uso: se dopo il taglio per il tempo un muscolo resta sotto **4 serie frazionarie a settimana**, il programma non è da ipertrofia per quel muscolo (Pelland 2026 **[S]**, Iversen 2021): scriverlo nella nota. Con 2 giorni da 30 minuti il volume totale (circa 18-20 serie a settimana per tutto il corpo) supera appena 3 serie per muscolo.

### 3.9 Principianti, over 65, donne

| Popolazione | Default | Forza |
|---|---|---|
| Principiante | 2-3 sedute full body, 6-10 serie frazionarie per muscolo, 2-3 serie per esercizio, 8-12 ripetizioni, RIR 3 poi 2-3, doppia progressione, nessuna tecnica d'intensità, scarico solo reattivo prima della settimana 8 | Solida per la base (ACSM 2009 e 2026, doc esistente); Convenzione **[K]** per il resto |
| Over 65 | mantenere le salvaguardie (≤3 serie per esercizio, RIR 3-4); **non scendere sotto 6 serie frazionarie per muscolo**; verificare se servono più serie in totale (più esercizi o più sedute) | Convenzione **[K]**; titoli **[T]** suggeriscono più volume, non meno |
| Donne | stesse fasce relative di volume degli uomini; enfasi su glutei e parte bassa se è l'obiettivo (PRG-22, 9-15 serie); pause −15% già in PRG-20 | Convenzione **[K]**: nessun dato di risposta o di volume specifico per sesso visto |

---

## 4. Audit delle regole esistenti (confronto con il codice)

Letto il codice con `trova` e la simulazione di 3.1 (2026-10-05). Verdetto: **T** tenere, **C** cambiare, **V** da verificare. Le fonti sono quelle di questa nota; dove non c'è fonte vista lo dico (**[K]** = conoscenza del modello).

| Regola e codice | Cosa fa oggi | Confronto con le fonti | Verdetto e azione |
|---|---|---|---|
| **PRG-25** `VOLUME_LIVELLO` (`js/coach/programma/schemi.js:41`) | Per gruppo: principiante 8-10, intermedio 10-14, avanzato 14-20; salute 6-12 | Coerente con ≥10 serie (Schoenfeld 2017, ACSM 2026 **[S]**) e con 12-20 ≈ >20 negli allenati (Baz-Valle 2022) | **T** le fasce; **C** l'unità di conteggio (IPE-01) |
| **PRG-28** conteggio frazionario (`ricette.js` ~r. 292, `MUSCLE_GROUPS.synergists`) | 1 per il gruppo, 0,5 per i gruppi sinergisti dei multiarticolari, su 6 gruppi | Pelland 2026: 0,5 per i muscoli che aiutano, ma per muscolo; qui `braccia`, `gambe` e `spalle` sono sommati e le spalle prendono 0,5 da ogni spinta e tirata | **C** conteggio per muscolo con `dettaglioEsercizio().secondari` (IPE-01) |
| **PRG-30** tetto di 11 serie per seduta (`COACH_PARAMETRI.serieMaxMuscoloSeduta`, ciclo `conta[g]` ~r. 322) | Conta solo le serie dirette del gruppo | Remmert 2025 **[P]**: ~11 serie **frazionarie** (PUOS, non un tetto fisiologico) | **T** il numero, **C** il conteggio e aggiungere l'obiettivo morbido 8 (IPE-06) |
| **PRG-33** taglio per il tempo (`minutiDi` in `buildProgram`, ~r. 340) | 8 min + serie × (35 s + pausa); toglie serie (minimo 2) e poi l'ultimo isolamento | Simulazione: con 30-45 minuti molti esercizi finiscono a 2 serie; nessun pavimento per muscolo; riscaldamento e cambi non contati. Superserie meta-analisi 2025 (stesso volume in meno tempo) | **C**: prima pause e superserie, poi tagli, mai sotto 4 serie frazionarie per muscolo (IPE-03, IPE-14) |
| **PRG-03** `exerciseCountFor` (`js/ui/onboarding.js:110`) | `floor((minuti − 10) / (serie × (35 + pausa) / 60))`, minimo 3, massimo 7 | A 30 minuti dà 3; il 5 osservato viene da 3 + 2 aggiunte ABB-03 | **T** il principio; **V** se ridurre le aggiunte a 30 minuti |
| **PRG-23** copertura per regioni (`aggiungiRegione`, `ricette.js` ~r. 247) | Leg curl, leg extension, alzate laterali, curl Scott/spider, ognuno 2 serie, ma solo se la seduta non supera `nEs` esercizi | Maeo 2021 (femorali seduto) Moderata; per laterali e retto femorale non ho visto fonti | **C**: le alzate laterali non compaiono a 30-45 minuti (osservato); passano per il pavimento di IPE-02 |
| **ABB-03** `strCopri` (`struttura-pro.js:72`) | Polpacci, deltoide posteriore, core da 3 giorni; curl e tricipite diretti solo da 4 giorni, 2-3 serie, `protetto` | Baz-Valle 2022 (tricipiti, volume alto); Barbalho (doc esistente): braccia crescono anche con i soli multiarticolari: **Contrastata** | **C**: 4-6 serie dirette per bicipiti e tricipiti da 3 giorni per ipertrofia (IPE-02) |
| **ABB-05 / PRG-02** `splitFor` (`onboarding.js:37`) | Principiante 3 gg full body, 4+ upper/lower (anche con 5-6 giorni); intermedio/avanzato 3 gg Upper/Lower/Full, 4 gg U/L ×2, 5 gg PPL+UL, 6 gg PPL ×2 | Frequenza ≥2 Solida; a volume pari lo split conta poco (Pelland 2026, RCT misti) | **T** |
| **PRG-12/13/16** ripetizioni e `RIR_TIPO` (`regole-ricerca.js:49`) | Pesante 5-8, macchina 8+, isolamento 10+ (giorno ipertrofia 8/10/12); RIR 1-3 / 0-2 / 0-1 costanti per non avanzati | Coerente con ACSM 2026 **[S]** e Robinson 2024; manca la rampa nel blocco per intermedi (e per principianti RIR 3→2-3) | **T** i valori, **C** la rampa (IPE-05) |
| **PRG-11/16** giorno «forza» PHUL | Intermedio: bilanciere e military 3 × 5 con 180 s nel giorno forza, anche in 45 minuti (osservato) | Per la massa il carico conta poco se vicino al cedimento (ACSM 2026 **[S]**); pausa contrastata (Singer 2024) | **C** sotto i 60 minuti (IPE-04) |
| **PRG-13** pause | Massa 150/75 s; pesanti = recupero multi; macchina max(90, 75%); isolamento max(60, …) | Contrastata (ACSM 2026 2-3 min **[S]** contro Singer 2024) | **T**; accorciare solo per il tempo (IPE-03) |
| **PRG-34 / ABB-06 / RIC-04** tecniche e superserie | Superserie e drop set se ≤45 minuti, una sola tecnica intensa per seduta, mai in scarico | Superserie meta-analisi 2025 (stesso volume in meno tempo); tecniche avanzate: nessun vantaggio di ipertrofia (due meta-analisi) | **T**; **C** il testo: «risparmia tempo, non fa crescere di più» (IPE-11) |
| **PRG-38** mesociclo avanzati (`rirSett`, osservato 3,2,2,1,0,4) | RIR a scendere nelle settimane di carico | Convenzione (RP, Helms **[S]**); Robinson 2024 per la direzione | **T**; estendere a intermedi (IPE-05) |
| **PRG-01** blocchi (`strutturaProgramma`, `motore.js:15`) | Principiante 8 sett. (3+1 ×2), intermedio 12 (3+1 ×3), avanzato 12 (5+1 ×2) | Scarico ogni ~5,6 ± 2,3 settimane nella pratica (Bell 2024); nessun vantaggio per l'ipertrofia visto nei due RCT; allenatori: non necessario | **C** bassa priorità, **Contrastata** (IPE-07) |
| **CAR-03** scarico dosato (`DOSE_SCARICO`) | Serie ×0,65 / ×0,5 / ×0,3 e carico ×0,95 / ×0,9 secondo la fatica | Serie −35/−50% in linea con la pratica; il carico −10% non ha fonti viste **[K]** | **T** |
| **RIC-01** +1 serie a metà blocco (`regole-nuove.js`) | Solo i muscoli prioritari, prontezza ≥70 | Coerente con la progressione per serie (Israetel SCJ 2020 **[S]**) e con l'RCT +120% (n=25) | **T**; estendere (IPE-08) |
| **RIC-03** allungamento petto, dorsali, glutei (`schemi.js:IN_ALLUNGAMENTO_NUOVI`) | Croci, pullover, affondi bulgari, stacco rumeno preferiti come «in allungamento» | Visti solo titoli per petto e glutei; per i dorsali un RCT negli allenati con risultati simili al ROM completo | **V**: tenerla come Convenzione, non presentarla come prova |
| **PRG-10** `SCAMBI_ALLUNGAMENTO` | Pushdown → sopra la testa, leg curl sdraiato → seduto, French press → sopra la testa | Maeo 2021 (femorali) e 2023 (tricipiti): Moderata | **T** (la promuoverei a Moderata) |
| **PRG-29** specializzazione | Prioritario ×1,2 (×1,5 avanzato); altri min 6, max vMin | Convenzione (Helms, titolo **[T]**) | **T**; massimo 2 prioritari (IPE-13) |
| **PRG-18/19/31** principianti e over 65 max 3 serie per esercizio (`serieMaxPrudente`) | Tetto per esercizio | Salvaguardia; i titoli visti per gli anziani **[T]** suggeriscono più volume totale | **T** (salvaguardia); **V** il volume totale over 65 |
| **PRG-20** donne: pause −15% | Recupero ridotto del 15% (min 60 s) citando PeerJ 2025 | Nessuna fonte vista in questa sessione su pause per sesso | **V** (non ricontrollata) |
| **PRG-26/27** fattore fisico e «esigenza» +20% | Volume ×1,2 con FFMI basso, ×0,85 con massa magra in calo; +20% iniziale senza bandiere BIA | Nessuna fonte vista **[K]**; il +20% andrebbe legato al volume precedente (Eur J Appl Physiol 2025 **[S]**, titoli sul volume pregresso **[T]**) | **V**; collegare a IPE-08 |

---

## 5. Regole proposte

Tutte le regole sono **spegnibili** (`REGOLE_SPEGNIBILI`, `regolaAttiva`), agiscono solo con `coachAttivo()`, non scattano per principianti, over 65, PAR-Q positivo, dolore o scarico dove il rischio lo richiede, hanno il motivo scritto in italiano nella nota del programma e sono annullabili come le altre decisioni del coach. Parametri nuovi in `COACH_PARAMETRI` (`js/coach/parametri.js`). Ordine per impatto atteso.

| Codice proposto | Quando scatta | Cosa fa | Motivo (testo italiano per l'utente) | Forza | Rischio / salvaguardia | File / funzione da toccare |
|---|---|---|---|---|---|---|
| **IPE-01** volume per muscolo | Sempre nella costruzione del programma (non salute) | Sostituisce `perGruppo` (6 gruppi) con un conteggio per **muscolo bersaglio** (bicipiti, tricipiti, deltoidi ant./lat./post., quadricipiti, femorali, polpacci, glutei, petto, dorsali): dirette 1, secondari 0,5 da `dettaglioEsercizio().secondari`; fasce di 3.2 | «Conto le serie muscolo per muscolo, i muscoli che aiutano valgono mezza serie: così braccia e spalle non restano indietro (Pelland 2026).» | Moderata | Più serie in alcuni muscoli piccoli: il tetto di tempo (IPE-03) e il tetto per seduta (IPE-06) restano; per principianti solo i muscoli grandi | `js/coach/programma/ricette.js` (`perGruppo`, `GRUPPI_PRINCIPALI`, ~r. 292); `js/coach/programma/schemi.js` (`VOLUME_LIVELLO` → tabella per muscolo); `js/dati/dettagli-esercizi.js` (`MUSCOLI`, `dettaglioEsercizio`) |
| **IPE-02** pavimento di dirette | Ipertrofia o ricomposizione, non principiante, ≥3 giorni | Garantisce 4-6 serie dirette a settimana (3.2) per tricipiti, bicipiti, deltoide laterale, femorali, polpacci; da 3 giorni (oggi ABB-03 le dà da 4); le mette in superserie antagonista (bicipiti + tricipiti) a fine seduta; distribuite in almeno 2 sedute | «Alzate laterali, curl e tricipiti a parte: i grossi esercizi allenano poco questi muscoli, servono serie dedicate (Baz-Valle 2022, Maeo 2023).» | Moderata (tricipiti, femorali) / Convenzione (resto) | Seduta più lunga: compensare con IPE-03; metodi «essenziale» (Golden Six, HIT) non toccati | `js/coach/programma/struttura-pro.js` (`strCopri`, ABB-03); `ricette.js` (`aggiungiRegione` PRG-23) |
| **IPE-03** tempo prima dei tagli | Quando `minutiDi(sd)` supera i minuti dichiarati | Ordine di intervento: (1) pause 150→120 s sui multiarticolari e 75→60 s sugli isolamenti; (2) superserie antagoniste (ABB-06) anche sopra 45 minuti; (3) solo poi taglio di serie, **mai sotto 4 serie frazionarie per muscolo a settimana**; se non basta, nota «con questi minuti il volume è da mantenimento»; il modello del tempo include 6 min di riscaldamento e 1 min per cambio | «Per far stare tutto nei tuoi minuti accorcio prima le pause e abbino esercizi opposti: lo stesso volume in meno tempo (meta-analisi sulle superserie, 2025).» | Moderata (superserie, pause) + Convenzione (modello tempo) | Pause corte con carichi pesanti: non scattano sui pesanti col bilanciere a 5 ripetizioni; superserie mai con fondamentali pesanti (ABB-06) | `ricette.js` (blocco `minutiDi` ~r. 340, `strSuperserie` r. 358); `js/coach/programma/struttura-pro.js` (`strSuperserie`); `js/ui/onboarding.js` (`exerciseCountFor`) |
| **IPE-04** giorno «forza» corto | Intermedio con PHUL (PRG-11), minuti ≤45 | Il giorno «forza» usa 6-8 ripetizioni e 120-150 s invece di 3 × 5 a 180 s; il 5 × 5 resta dai 60 minuti | «In 45 minuti 3 serie da 5 con 3 minuti di pausa consumano metà seduta; per la massa conta la serie vicina al cedimento, non il carico massimo (ACSM 2026).» | Moderata **[S]** (ACSM 2026) + Singer 2024 | Meno forza massimale: l'obiettivo massa non la richiede; per obiettivo forza non scatta | `ricette.js` (PRG-11, PRG-16); `js/ui/onboarding.js` (`schemeFor`) |
| **IPE-05** rampa di RIR | Intermedio (come l'avanzato oggi), principiante RIR 3→2-3 | Estende `p.rirSett` a intermedio e principiante con la tabella 3.5; l'isolamento non parte da 0-1 alla settimana 1 | «Parti con più ripetizioni in riserva e ti avvicini al cedimento di settimana in settimana: più crescita a fine blocco con meno fatica all'inizio (Robinson 2024).» | Convenzione + Moderata | Stima del RIR imprecisa (±1 ripetizione, doc esistente): resta CAR-14 per la calibrazione; non per prudente, over 65 (RIR 3-4 già fisso) | `js/coach/programma/motore.js` (`strutturaProgramma`, `fasiProgramma`); `js/coach/regole-ricerca.js` (`rirBersaglioBase`, ~r. 62) |
| **IPE-06** tetto per seduta frazionario | Sempre | `serieMaxMuscoloSeduta` passa a contare dirette + 0,5 indirette: soft 8 (si sposta la serie nell'altra seduta se c'è), duro 11; con frequenza 1 resta 11 | «Oltre circa 11 serie frazionarie in una seduta non si vede più vantaggio: meglio dividerle (Remmert 2025, preprint).» | Moderata **[P]** | Preprint: parametro regolabile, spegnibile | `js/coach/parametri.js` (`serieMaxMuscoloSeduta`); `ricette.js` (ciclo `conta[g]` ~r. 322) |
| **IPE-07** scarico più reattivo | Programma nuovo; blocchi di `strutturaProgramma` | Principiante: 8 settimane con scarico programmato solo alla fine; intermedio: 12 settimane in 2 blocchi da 5+1; scarico reattivo invariato (DEC-06, CAR-03) | «Lo scarico a tempo non è dimostrato per la crescita: ti faccio lavorare di più tra uno scarico e l'altro e lo anticipo se sei stanco, ti fa male qualcosa o dormi male (Bell 2023-2024).» | Convenzione + Contrastata | Più settimane consecutive: gli stessi segnali (prontezza, sRPE, dolore) anticipano lo scarico; parametro `bloccoIntermedio`, `bloccoPrincipiante` | `js/coach/programma/motore.js` (`strutturaProgramma`, r. 15) |
| **IPE-08** rampa di volume nel blocco | Non principiante, volume sotto il tetto del livello | Settimana 1 al ~80% delle serie target (parte dal volume precedente), +1 serie per muscolo a settimana fino al target, scarico a −35/−50%; estende RIC-01 (che aggiunge +1 serie a metà blocco solo ai prioritari) | «Il volume sale un po' alla volta lungo il blocco e poi si scarica (Israetel 2020, Pelland 2026).» | Convenzione (Israetel) + Moderata (RCT +120% non peggiora, n=25) | Salita brusca nei primi blocchi: parte dal volume dell'ultimo programma se noto; RIC-01 e prontezza ≥70 restano condizione | `ricette.js`; `js/coach/regole-nuove.js` (RIC-01); `js/coach/carichi/progressivo.js` (CAR-03) |
| **IPE-09** varianti in allungamento | Ipertrofia; esercizi con alternative consentite | Priorità a: leg curl seduto, estensione tricipiti sopra la testa, calf raise in piedi con pausa in basso, curl su panca inclinata o Scott; leg extension per il retto femorale (già PRG-23) | «Femorali, tricipiti e polpacci crescono di più se il muscolo lavora allungato (Maeo 2021 e 2023, Kassiano 2023).» | Moderata | Una sola variante per muscolo a settimana; con fastidio alla spalla/gomito resta l'alternativa (RISCHIO) | `js/coach/programma/schemi.js` (`SCAMBI_ALLUNGAMENTO`, `IN_ALLUNGAMENTO`); `js/dati/dettagli-esercizi.js` |
| **IPE-10** parziali allungate opzionali | Avanzato, ultima serie di un isolamento (polpacci, tricipiti, bicipiti, dorsali), prontezza ≥70, non scarico | Suggerisce, come una delle tecniche al cedimento (RIC-04: massimo una per seduta), 5-8 parziali in allungamento dopo il cedimento | «Alla fine dell'ultima serie, qualche mezza ripetizione nel tratto allungato: facoltativo, può aiutare polpacci e tricipiti (Kassiano 2023); non è dimostrato che batta il ROM completo (Wolf 2023).» | Contrastata | Solo testo suggerito, mai obbligatorio; non con dolore | `js/coach/regole-ricerca.js` (`TECNICHE`); `js/coach/regole-nuove.js` (RIC-04) |
| **IPE-11** tecniche come risparmio di tempo | Quando una tecnica (drop, rest-pause, myo-reps, cluster) è assegnata | Cambia il testo: «non fa crescere di più, serve a risparmiare tempo»; assegnata solo sull'ultimo isolamento e con minuti ≤45 o con scelta dell'utente | «Drop set e rest-pause danno la stessa crescita delle serie normali: li uso solo per accorciare la seduta (meta-analisi 2026).» | Solida (nessun vantaggio di crescita) | Aumentano sforzo percepito: già RIC-04 e esclusi per intensità psicologica bassa | `js/coach/regole-ricerca.js` (`TECNICHE`); `ricette.js` (PRG-34) |
| **IPE-12** dose minima per poco tempo | Giorni ≤2 o minuti ≤30 | Struttura full body con almeno uno squat o leg press, una spinta, una tirata, un hinge; 6-15 ripetizioni, 2-3 serie, superserie; mostra «obiettivo realistico: 4-6 serie per muscolo» | «Con poco tempo contano pochi multiarticolari ben fatti: almeno 4 serie a settimana per muscolo bastano a crescere (Iversen 2021).» | Moderata | Non promettere ipertrofia massima: messaggio onesto; metodo `minimo` esistente (MET-01) | `js/coach/programma/ricette.js`; metodo `minimo` in `js/coach/metodi*.js`; `exerciseCountFor` |
| **IPE-13** specializzazione chiara | Avanzato con priorità | Massimo 2 muscoli prioritari (+25-50% serie), gli altri ≥6 serie frazionarie (mai <4), ciclo di 6-8 settimane poi si ricalcola | «Un muscolo in più, gli altri in mantenimento per un blocco (Helms, 3DMJ).» | Convenzione **[K]** | Calo degli altri muscoli: pavimento 6 | `ricette.js` (PRG-29, `specializza`) |
| **IPE-14** modello tempo e messaggio | Alla creazione e all'apertura della seduta | Aggiunge al calcolo del tempo riscaldamento e cambi; mostra durata stimata realistica e segnala se supera di >10% i minuti dichiarati | «La seduta stimata dura circa N minuti: ho contato riscaldamento e cambi di attrezzo.» | Convenzione (calcolo) | Solo informazione | `ricette.js` (`minutiDi`); `js/ui/allenamento/seduta.js` |

---

## 6. Domande aperte

1. **Testo completo di Pelland 2026** (Sports Med 56(2):481-505): curva esatta volume-ipertrofia, ritrovare o cancellare il «+0,24% per serie», soglie 4/5-10/40 serie viste solo in riassunti di terzi; valore della frequenza per l'ipertrofia (probabilità 91% secondo Henselmans, effetto piccolo).
2. **Testo dell'ACSM 2026**: pause (2-3 minuti, riassunti) contro il doc esistente; frequenza (2 o 2-3 sedute); serie per muscolo; carichi e RIR. Nessuno è stato letto nell'originale.
3. **Maeo 2023 (tricipiti)**: dimensione dell'effetto e n; replica dell'effetto; analisi 2025 sulle parziali a lunghezza lunga contro corta (n, SMD); per petto, dorsali e glutei (RIC-03) ho visto solo titoli: il doc esistente cita Maeo e Pedrosa per questi muscoli, ma l'evidenza specifica sui glutei, sul petto e sui dorsali non è stata ritrovata. Declassare RIC-03 a Convenzione finché non si legge.
4. **Principianti**: quanto volume serve nelle prime 8-12 settimane; ruolo di tecnica e familiarizzazione; rischio di troppe serie. Nessuna ricerca qui.
5. **Over 65**: se più volume per muscolo (titoli) si concilia con il limite di 3 serie per esercizio del coach; leggere PMC8514686 e J Appl Physiol 2024.
6. **Donne**: risposta relativa all'allenamento, volume specifico, effetto della menopausa, enfasi su glutei e parte bassa; nessun dato sul sesso visto.
7. **Muscoli specifici non cercati**: volume dei polpacci (titolo «Bigger Calves... Higher Volume?»), deltoidi laterali e posteriori, avambracci, addome, collo, glutei.
8. **Tempo, eccentrica, intervallo di ripetizioni, varietà e rotazione degli esercizi, macchine contro pesi liberi, unilaterale, ordine degli esercizi aggiornato**: non cercati o solo titoli.
9. **Scarico**: leggere Bell 2023 (Delphi) e i due RCT (PMC13031491, PMC10809978) per i dettagli; esiste uno studio su allenati? Il carico −10% nello scarico (CAR-03) ha una base? Non vista.
10. **Video e podcast** (da verificare, mai citati come prova): Nippard «How Much Training Volume Do You Really Need? (Science Explained)» (YouTube, titolo visto); Henselmans e SBS sulle ripetizioni efficaci; Helms sulla specializzazione. Servono trascrizioni (rete da sbloccare, `references/rete.md`).
11. **Confronto con piani generati da IA** (PMC12492345): potrebbe dare un benchmark di qualità per il generatore.
12. **Frequenza**: due titoli di Henselmans sugli RCT in allenati con esiti opposti (5x contro 2x; bro split non peggiore): cercare i due studi originali.
13. **Prova automatica**: una prova che i programmi generati rispettino i pavimenti 3.2 (per muscolo) a 30/45/60/90 minuti, come la simulazione di 3.1.

## 7. Limiti onesti

- **Rete**: solo WebSearch; i riassunti sono scritti da un modello su snippet. Circa 42 interrogazioni riuscite, poi il budget di sessione (200 chiamate, condiviso) si è esaurito: i temi della sezione 1.9 sono scoperti e sono stati completati a memoria (1.10, marcati **[K]**), che è meno affidabile di una fonte letta.
- **Doppia fonte**: ho incrociato la curva del volume (Pelland, Schoenfeld, Baz-Valle, RCT 2026), cedimento (Robinson, Refalo, ACSM [S]), pause (Singer, ACSM [S]), tecniche (tre lavori), superserie (meta-analisi + Iversen), scarico (sondaggio, Delphi, due RCT). Il resto è fonte unica o solo titolo.
- **Popolazione**: le meta-analisi sono su adulti di circa 25 anni, in maggioranza uomini; gli RCT su allenati hanno n tra 10 e 34; i risultati su uomini allenati contro non allenati non sono intercambiabili.
- **Preprint**: il tetto di 11 serie per seduta (Remmert 2025) e le versioni bioRxiv/medRxiv non sono rivisti.
- **Autori e testi non visti**: Maeo 2023, Wolf 2023, Israetel SCJ 2020 e molti titoli sono noti solo come titolo o riassunto; numeri marcati [S] o [T].
- **Fonti commerciali**: RP, SBS, Nippard e Beardsley vendono programmi, app o abbonamenti: sono livello 2-3.
- **Simulazione del generatore (3.1)**: un solo seme, un solo profilo (uomo di 30 anni, metodo «coach»); con metodi famosi, donne o altri semi i numeri cambiano.

---

## 8. Appendice: query pronte per un'altra sessione con il tetto alzato

Da lanciare con WebSearch; `allowed_domains` PubMed/PMC/Springer/Europe PMC per titolo e PMID, poi una ricerca libera con `blocked_domains ["gumroad.com","tiktok.com","pinterest.com"]` per la pratica. Un numero entra in una regola solo con 2 fonti indipendenti. Dopo ogni query, aggiornare i marcatori [K], [S], [T] della nota.

**Volume e frequenza**
1. `Pelland 2026 resistance training dose response weekly volume frequency meta-regression sets per week fractional` (verificare «+0,24% per serie», soglie 4 / 5-10 / 40)
2. `Remmert Pelland per-session volume hypertrophy meta-regression point of undetectable outcome superiority published`
3. `ACSM 2026 resistance training position stand hypertrophy sets per muscle per week frequency rest interval proximity to failure`
4. `Schoenfeld 2019 resistance training frequency meta-analysis volume equated twice versus three times per week`
5. `Baz-Valle 2022 volume trained individuals triceps >20 sets` e `volume-dependent muscle-specific hypertrophy quadriceps biceps triceps`
6. `competitive physique athletes weekly sets per muscle group quantification` (PMC12345604)
7. `previous training volume hypertrophy response trained individuals volume increase maintenance` (PMID 32108724, 39665246)

**Sforzo, carico, pause, tempo**
8. `Robinson 2024 proximity to failure meta-regression repetitions in reserve hypertrophy dose-response` (verificare pendenze)
9. `repetitions in reserve accuracy compound versus isolation exercises error trained novice`
10. `low-load versus high-load resistance training hypertrophy meta-analysis Schoenfeld Lopez network` (verificare autori e anni di 1.10)
11. `repetition duration tempo hypertrophy meta-analysis eccentric concentric duration` (verificare soglie 1.10)
12. `inter-set rest interval hypertrophy trained men 60 seconds versus 2 minutes randomized 2025`
13. `eccentric overload hypertrophy meta-analysis`

**Lunghezza muscolare, ROM, selezione per muscolo**
14. `Maeo 2023 triceps overhead extension versus pushdown hypertrophy` (effetto e n)
15. `partial range of motion long muscle length meta-analysis 2025 hypertrophy regional` (DOI 10.1007/s11332-025-01586-5)
16. `standing versus seated calf raise hypertrophy` (PMC10753835), `calf muscle volume training frequency randomized`
17. `incline curl versus preacher curl hypertrophy lengthened` e `lateral raise cable versus dumbbell deltoid hypertrophy`
18. `hip thrust versus back squat gluteal hypertrophy randomized`
19. `leg extension rectus femoris hypertrophy region knee extension versus leg press` (PMC13215645)
20. `unilateral versus bilateral resistance training hypertrophy meta-analysis` (DOI 10.1007/s40279-024-02169-z)
21. `free weights versus machines hypertrophy` (DOI 10.1186/s13102-023-00713-4)
22. `exercise variation versus fixed selection muscle thickness randomized`

**Tecniche, superserie, tempo**
23. `myo-reps versus straight sets resistance-trained hypertrophy` (PMID 42112925)
24. `rest-pause drop set cluster hypertrophy meta-analysis 2026 recreationally trained` (PMID 41718208)
25. `superset agonist antagonist hypertrophy trained time efficiency meta-analysis` (PMID 39903375)
26. `minimal dose resistance training hypertrophy one weekly session trained` e `time-efficient training 30 minutes hypertrophy`

**Scarico, mesociclo, progressione**
27. `deload week trained lifters hypertrophy randomized controlled trial` (PMC13031491, PMC10809978)
28. `Bell 2023 deloading Delphi consensus recommendations strength physique sports` (Sports Med Open 9:87)
29. `mesocycle volume progression hypertrophy sets versus load progression Israetel` (autori e anno)
30. `double progression repetition range hypertrophy load increase randomized`

**Popolazioni**
31. `older adults resistance training volume hypertrophy weekly sets nonresponders` (J Appl Physiol 2024; PMC8514686)
32. `sarcopenia resistance training variables muscle mass meta-regression` (PMC12688407)
33. `sex differences resistance training hypertrophy meta-analysis women relative` (autori di 1.10)
34. `women resistance training volume menopause hypertrophy`
35. `beginners resistance training first 12 weeks volume hypertrophy untrained dose response`

**Split e pratica**
36. `full body versus split routine trained men hypertrophy randomized equated volume` (PMID 32168178)
37. `training frequency 5 times versus 2 times per week trained men muscle thickness` e `high frequency versus low frequency well-trained men` (recensioni di Henselmans)
38. `Henselmans optimal program design` / `Stronger By Science how to select exercises for muscle growth` (`allowed_domains` dei singoli siti)
39. `Helms muscle group specialization cycles` (3dmusclejourney.com)
40. `generative AI training plans hypertrophy professional assessment` (PMC12492345): benchmark per il generatore

