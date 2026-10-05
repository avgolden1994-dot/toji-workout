# Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica

**Copertura: 0 ricerche web riuscite in questa nota (il tetto di 200 ricerche WebSearch condiviso tra gli agenti si era esaurito prima che iniziassi; non ho insistito). Il contenuto viene da: (a) fonti già viste nei risultati web dalle altre note del repo, riprese con il loro riferimento e marcate [R]; (b) conoscenza del modello, non verificata sul web, marcata [M]; (c) calcoli miei [C]; (d) lettura del codice e tre simulazioni locali in Chromium [V]. Le ricerche che avrei fatto sono in Appendice A.**

Ambito: come si progetta un mesociclo (lunghezza, rampa di serie, rampa di RIR, carico e ripetizioni settimana per settimana), come e quando si scarica (programmato e reattivo), cosa passa da un blocco al successivo, come si concatenano i blocchi in 6-12 mesi (specializzazione, mantenimento, taglio, pause, picco), e la scala da salire quando un esercizio si ferma. Tocca le aree **PRG-01** (struttura e durata), **CAR-03/07/08/10/14**, **DEC-06**, **PRZ-03/04**, **STR-01**, **STA-01/02/03**, **ESI-01..03**, **CIC-01/02**, **RIC-01/05** e `rirBersaglio` di `docs/coach-mappa-regole.md` (capp. 5, 7, 8, 10, 11, 19). Codice area delle regole proposte: **MES** (verificato libero con grep su `docs/`, `js/`, `tests/` il 2026-10-05; altre note in parallelo usano IPE, PCO, PGR, AUT, STD, TAP, CST, REC: riconfermare MES prima di scriverlo nel cap. 19).

Data: 2026-10-05. Le note gemelle già scritte (`ricerca-ipertrofia-programmazione.md`, `ricerca-forza-progressione.md`, `ricerca-metodi-coach-pratici.md`, `ricerca-recupero-infortuni-popolazioni.md`, `ricerca-psicologia-aderenza.md`) toccano lo stesso tema in parte (IPE-05/07/08/13, PCO-02/05, PGR-01, TAP-01, CST-07..09, REC-08): qui vado **più a fondo** sul disegno del blocco, sullo scarico e sul legame con le altre regole, e dico dove le mie proposte **sostituiscono** o **si sommano** alle loro (tabella «Coordinamento» in sezione 6).

**Come si legge.** Forza: **Solida** (meta-analisi o posizione ufficiale concordi), **Moderata** (pochi studi controllati, o risultati che cambiano con la popolazione), **Convenzione** (pratica dei coach senza prova diretta), **+ Contrastata** (fonti di pari livello non concordano). Stato di verifica accanto a ogni riga:

- **[R]** visto nei risultati web da un'altra nota del repo (nota e sezione indicate); non ricontrollato qui.
- **[M]** **Conoscenza del modello (non verificata sul web)**: autore e anno solo se li ricordo con sicurezza, numeri come intervalli; mai base di una regola da sola. Forza massima «Moderata (da verificare)».
- **[C]** calcolo o ragionamento mio (aritmetica su Epley, arrotondamenti del codice).
- **[V]** verificato leggendo il codice o simulando in Chromium (script nella scratchpad di sessione, nessun file del repo toccato).

---

## In una pagina

1. **Il codice ha un solo modello di blocco, uguale per tutti e piatto**: lo stesso modello settimanale per 8-12 settimane, uno scarico ogni 4 (principiante e intermedio) o 6 (avanzato) settimane, RIR a scendere solo per l'avanzato (un unico valore per tutti i tipi di esercizio), nessuna rampa di serie. Nessun passaggio di informazioni da un blocco al successivo oltre ai carichi nello storico.
2. **Tre difetti dello scarico verificati con simulazione [V]**: (a) i carichi dello scarico si **compongono tra sedute della stessa settimana** (60 kg, poi 54, 48,5, 43,5: -10%, -19%, -27,5%: caso «media», esercizio presente 3 volte nella settimana, come nel full body x3 dei principianti); (b) dopo lo scarico la progressione **riparte dal carico ridotto** (+1 ripetizione a 43,5 kg invece di 60): lo scarico taglia i carichi in modo permanente; (c) il verdetto di fine ciclo (CIC-01) confronta l'ultima seduta, che è **sempre di scarico** (la durata è multipla del blocco), con la prima: un intermedio che migliora dell'1,5% a settimana su ogni alzata (1 seduta a settimana per alzata) esce «**stallo**» (quota 0%), uno che migliora del 2% «buono». «Stallo» alterna il blocco ipertrofia/forza e manda in rotazione **tutti** gli isolamenti.
3. **Il segnale di scarico reattivo contraddice la prescrizione**: «Dura (RPE 8-9)» vale sRPE 9 e conta come seduta «pesante»; due su tre scatenano lo scarico, mentre il coach prescrive RIR 0-1 [V, simulazione: `decisioniCoach` con due «Dura» su tre dà `scarico`].
4. **La dose dello scarico è meno graduata di quanto dica il testo**: con il minimo di 2 serie, 'media' (x0,5) e 'alta' (x0,3) danno le **stesse** serie per esercizi da 3-4 serie; un esercizio da 2 serie non viene tagliato affatto [C su `regole-ricerca.js:114`]. Il «-70%» non esiste nella pratica.
5. **Le settimane di scarico inquinano altre regole** (esigenza ESI-02, esercizi fermi STA-01, scarico mirato CAR-08, strain STR-01, verdetto CIC-01): nessuna le esclude, la seduta salvata non porta nemmeno l'etichetta di fase.
6. **Che cosa regge nelle fonti**: lo scarico **non** è dimostrato come necessario né come potenziante (RCT 2024 e RCT 2026 [R]), ma la pratica è diffusa (sondaggio 2024: scarico di 6,4 ± 1,7 giorni circa ogni 5,6 ± 2,3 settimane [R]) e il consenso degli esperti è su **scarico individualizzato, anche reattivo** [R]. La periodizzazione come etichetta non cambia l'ipertrofia a volume pari; per la forza dà un vantaggio moderato [R]. Quindi: **organizzare il blocco per gestire la fatica e per dare un ritmo**, non per promettere più crescita.

### Il modello consigliato in 6 righe

1. **Principiante**: 8 settimane, 7 di carico e scarico **solo alla settimana 8** (saltabile se fatica bassa e nessun segnale); niente rampa di serie; RIR 3-4 → 2 (pavimento 2 su pesanti e macchine, 1 sugli isolamenti); progressione a ogni seduta; scarico reattivo prima di quello programmato.
2. **Intermedio**: blocchi **5+1** (12 settimane = 2 blocchi); serie al 75% → 100% del picco (circa +1 serie per muscolo a settimana); RIR 3 → 1 con pavimento 1 sui pesanti; carico che sale al massimo una volta a settimana per esercizio.
3. **Avanzato**: blocchi 5+1 anticipabili a 4+1; serie al 70% → 100% del picco più +1 serie sui prioritari; RIR 3 → 0 **solo** sugli isolamenti, pesanti mai sotto 1; scarico anticipato dai segnali.
4. **Scarico**: serie -35 / -50 / -60% secondo la fatica, carico -5 / -10% **rispetto al carico di riferimento prima dello scarico** (mai composto), RIR ≥4, stessa frequenza e stessi esercizi, 5-7 giorni, mai stop totale; si riprende al 100% del riferimento (95% se il motivo era una fatica alta non risolta).
5. **Scarico reattivo unico**: scatta con almeno 2 segnali distinti in 7 giorni (prontezza media <50, e1RM -5% su almeno 2 pesanti, RPE +1 sopra il bersaglio per 2 sedute, sonno o voglia a zero per 4 giorni su 7, sRPE «al limite» 2 volte su 3), non nelle prime 2 settimane del blocco, non a meno di 14 giorni dall'ultimo scarico; dose unica; sostituisce quello programmato se il blocco ha già 3 settimane di carico.
6. **Tra i blocchi**: il volume di picco sale di 1 serie per muscolo se il verdetto è «buono» (aderenza ≥80%, prontezza media ≥60), RIR e rampa ripartono dalla settimana 1, fondamentali fissi per 2-3 blocchi, un terzo-metà degli accessori ruotato al confine del blocco; specializzazione di 6-8 settimane con gli altri muscoli a ≥1/3 del volume (mai sotto 4-6 serie frazionarie) e **carico mantenuto**.

---

## 1. Cosa dicono le fonti

### 1.1 Periodizzazione: modelli e meta-analisi

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Periodizzato contro non periodizzato, forza | Effetto moderato sul 1RM a favore del periodizzato; il miglioramento è maggiore nei non allenati; più frequenza settimanale e studi più lunghi danno più forza | Solida | Williams 2017, Sports Med 47:2083-2100 [R: `ricerca-forza-progressione.md` 1.1] |
| Stesso confronto a volume pareggiato | 35 studi: effetto sul 1RM a favore del periodizzato (ES 0,31); l'ipertrofia **non cambia** | Solida per la forza; nessun effetto sulla massa | Moesgaard 2022, Sports Med, PMID 35044672 (nome dato dalla consegna; il PMID e i numeri sono visti in `ricerca-forza-progressione.md` 1.1) [R] |
| Lineare contro ondulato, forza | Harries 2015: nessuna differenza significativa. Meta-analisi 2022: ondulato meglio **solo nei già allenati**. Meta-analisi 2026 (29 studi): forza dei superiori simile, inferiori senza differenza significativa | **Contrastata** | Harries 2015, JSCR 29:1113-1125; PMID 35044672; PMC12999919 / PMID 41869632 [R: forza 1.1] |
| Lineare contro ondulato giornaliero, ipertrofia | Nessuna differenza | Solida | Grgic 2017, PeerJ (PMC5571788, PMID 28848690) [R: forza 1.1] |
| DUP contro lineare in 12 settimane (forza) | Un RCT classico di 12 settimane, con pochi partecipanti, trovò più forza con la DUP; non replicato in modo concorde (vedi riga sopra) | Convenzione (studio singolo, vecchio) | Rhea e coll. 2002, MSSE: **Conoscenza del modello (non verificata sul web)** [M] |
| Blocchi contro ondulazione settimanale, allenati | Studi piccoli su atleti a favore dei blocchi (concentrare una qualità alla volta); nessuna meta-analisi vista né cercata; l'idea poggia su Issurin e sul modello russo | Convenzione | Bartolomei, Issurin: **Conoscenza del modello (non verificata sul web)** [M]; la nota forza (par. 5, domanda 15) conferma «nessuna ricerca eseguita» [R] |
| Principianti | La forma del programma conta poco: con qualunque programma ragionevole la risposta è alta; il vantaggio dell'ondulato compare solo negli allenati | Moderata | meta-analisi 2022 (PMID 35044672) e Williams 2017 (maggior miglioramento nei non allenati) [R: forza 1.1] |
| Affidabilità della ricerca | Esistono critiche sulla definizione stessa di «periodizzazione» e sul disegno degli studi (programmi diversi per volume o per sforzo, non solo per «periodizzazione») | Convenzione (solo titoli) | PMC5358028; Sports Med 2020 «Periodization: Variation in the Definition and Discrepancies in Study Design» [R: forza 1.1] |
| Conseguenza per l'app | A volume e sforzo pari **il modo di distribuire** serie e carichi nel blocco cambia poco la massa e un poco la forza negli allenati: la rampa serve a **gestire fatica e aderenza** più che a crescere di più. Il codice può usare qualunque modello coerente (lineare, onda, blocchi) senza perdere crescita | Moderata (ragionamento su fonti Solide) | [C] a partire da Moesgaard 2022, Grgic 2017 [R] |

### 1.2 Volume nel mesociclo: base di partenza e rampa

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Curva volume-ipertrofia | Più volume, più crescita, con rendimenti decrescenti; molto più marcati per la forza. 67 studi, 2058 persone. ≥10 serie/settimana per gruppo per massimizzare | Solida | Pelland e coll., Sports Med 2026;56(2):481-505, PMID 41343037; Schoenfeld, Ogborn, Krieger 2017, PMID 27433992 [R: ipertrofia 1.1] |
| Volume molto alto in atleti | 27 uomini di forza: 10 settimane, poi 7 con serie x1,5 (circa 60/settimana) contro il normale: **nessuna differenza** di massa | Moderata (RCT, n piccolo) | DOI 10.1007/s42978-02… [R: ipertrofia 1.1] |
| Progressione di serie o di intensità nel blocco | Lavoro «Mesocycle Progression in Hypertrophy: Volume Versus Intensity»: gli autori propongono di dare priorità alla progressione del **numero di serie** su quella della %1RM (autori da memoria: gruppo RP, quindi con conflitto di interessi) | Convenzione | Strength Cond J 2020 [R: ipertrofia 1.6] + autori **Conoscenza del modello (non verificata sul web)** [M] |
| Rampa MEV → MRV | Mesociclo di 4-6 settimane di accumulo, +1-2 serie per muscolo a settimana, RIR 3 → 0-1, poi 1 settimana di scarico. Landmark per muscolo (MV circa 6, MEV 6-8, MAV 12-18, MRV 20-25+) sono euristiche, non esiti di studi | Convenzione | RP (rpstrength.com, riassunti di terzi) [R: metodi 1.2, 5.3] |
| La rampa è necessaria? | Nessuna RCT vista né cercata che confronti volume progressivo con volume costante a pari totale. L'effetto «nessuna differenza a volume pari» della periodizzazione (1.1) suggerisce che la rampa **non è necessaria per crescere** | Convenzione (assenza di prove, non prova di assenza) | [C] da Moesgaard 2022 [R]; ricerca non fatta (Appendice A, q. 3) |
| Perché partire sotto il picco | Le prime sedute con un carico di lavoro nuovo (esercizio o blocco) danno più dolenzia, che cala alle sedute successive («effetto della seduta ripetuta») | Moderata | Damas 2016 e revisioni [R: `ricerca-struttura-e-intensita.md` 1.3] |
| Tetto per seduta | Circa 11 serie frazionarie per muscolo in una seduta: oltre non si vede più un vantaggio (PUOS, non un tetto fisiologico) | Moderata (preprint 2025) | Remmert e coll., SportRxiv 2025 [R: ipertrofia 1.2] |
| Dose minima | 1 serie per esercizio, 1-3 volte a settimana, 8-12 settimane: aumenti significativi di 1RM in uomini già allenati; «subottimale ma reale» | Moderata | Androulakis-Korakakis e coll., Sports Med, PMID 31797219 [R: metodi 1.1] |

### 1.3 RIR e intensità lungo il blocco

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Precisione del RIR | Errore medio circa 1 ripetizione, per difetto; cala vicino al cedimento (circa 1,2 a 5 RIR, 0,46 a 1 RIR) e con serie sotto le 12 ripetizioni; l'esperienza pesa poco | Moderata | Halperin 2022; Refalo 2023; Zourdos 2016 [R: struttura 1.3] |
| Cedimento o no | Meta-analisi di 15 studi: vantaggio banale del cedimento sulla massa, effetto 0,19 (IC 95% 0,00-0,37) | Solida | Refalo 2023, Sports Med (PMC9935748) [R: metodi 1.1] |
| RIR e ipertrofia (meta-regressione) | Per la **forza** la pendenza sul RIR stimato è nulla; per l'**ipertrofia** la crescita aumenta quanto più ci si ferma vicino al cedimento | Moderata | Robinson e coll. 2024, Sports Med, DOI 10.1007/s40279-024-02069-2 [R: ipertrofia 1.3] |
| Scala RIR-RPE | Scala di RPE basata sulle ripetizioni in riserva per l'allenamento coi pesi; RPE «alla pari o meglio» della %1RM per forza e massa | Moderata | Zourdos 2016 (JSCR) e Helms 2016 (Strength Cond J) **Conoscenza del modello (non verificata sul web)** [M]; PMID 29628895 [R: forza 1.2] |
| Rampa di RIR nel blocco | RP: RIR 3, 2, 1, 0-1 in 4 settimane (variante 4, 3, 2, 1); Helms: RPE più basso all'inizio e più alto a fine blocco | Convenzione | RP [R: metodi 1.2]; Helms **Conoscenza del modello (non verificata sul web)** [M] |
| Equivalenza carico-RIR | Con ripetizioni fisse, scendere di 1 RIR equivale a circa +2,3-2,5% di carico (Epley: 8RM = 78,9%, 7RM = 81,1%, 6RM = 83,3%, 5RM = 85,7%, 4RM = 88,2%); la tabella RPE di Tuchscherer coincide entro 0,6 punti con Epley «ripetizioni + RIR» | Convenzione (aritmetica) | [C]; confronto con la tabella RPE in [R: forza 1.3] |

### 1.4 Fatica, supercompensazione e sovraccarico

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Modello fitness-fatica | La prestazione è la differenza tra una componente «forma» che cresce piano e decade piano e una «fatica» che cresce subito e decade in fretta (due funzioni esponenziali con costanti di tempo diverse); i parametri sono **individuali** e il modello è nato su atleti di resistenza e lanciatori, non su ipertrofia | Moderata (da verificare) per il concetto; Convenzione per ogni numero | Banister e coll. 1975; Chiu e Barnes 2003 (Strength Cond J): **Conoscenza del modello (non verificata sul web)** [M] |
| Cosa implica per i pesi | Tagliare il volume per alcuni giorni fa calare la fatica più in fretta della forma e quindi può «far emergere» la prestazione: è il fondamento del taper. Non dimostra che **un blocco successivo** cresca di più | Convenzione | [C] da Chiu e Barnes 2003 [M] |
| Supercompensazione dopo lo scarico | **Nessuna prova empirica** dell'effetto di potenziamento nel ciclo seguente; RCT con una settimana di stop a metà di 9 settimane: nessuna supercompensazione, ipertrofia e resistenza uguali, forza delle gambe cresciuta **meno**; RCT 2026 (8 settimane, non allenati, -18% di serie): ipertrofia e resistenza simili | Moderata (due RCT, popolazioni giovani; contro la pratica diffusa) | PeerJ 2024 e16777 (PMC10809978); PMC13031491 (2026) [R: recupero 1.1; ipertrofia 1.6] |
| Overreaching | Funzionale (calo di giorni o poche settimane, poi recupero), non funzionale (settimane senza miglioramento), sindrome da sovrallenamento (mesi). Si diagnostica per esclusione. Nessun test singolo distingue in modo affidabile; pochi studi nei pesi | Solida (definizioni) / Moderata (diagnosi) | Meeusen e coll. 2013 (ECSS-ACSM); revisione esplorativa DOI 10.1007/s40279-019-01242-2; PMC9460078 [R: psicologia 1.5; recupero 1.1] |
| Overreaching funzionale pianificato | Nella pratica S&C si spinge il volume verso il massimo recuperabile per 1-3 settimane e poi si scarica; nei pesi **non ho visto RCT** che mostrino che questo dia più crescita di un volume costante | Convenzione | RP (MRV, «push and deload») [R: metodi 1.2]; assenza di RCT [M] |

### 1.5 Scarico: cosa è, quanto, quando

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Come si fa nella pratica | Sondaggio su atleti di forza e fisico: 47,2% scarico programmato, 13,4% autoregolato, 39,4% misto; durata media **6,4 ± 1,7 giorni**, circa **ogni 5,6 ± 2,3 settimane** | Convenzione (pratica, non esito) | Bell e coll. 2024, Sports Med Open, PMID 38499934 [R: ipertrofia 1.6] |
| Consenso degli esperti | Delphi internazionale: serve **individualizzare**; l'autoregolazione può migliorare forza e ipertrofia e prevenire la maladattamento; mancano studi su autoregolato contro programmato | Convenzione | Bell e coll. 2023, Sports Med Open 9:87, DOI 10.1186/s40798-023-00633-0 [R: ipertrofia 1.6] |
| Interviste ai coach | Lo scarico dura di solito **una settimana**; è più spesso **reattivo per gli avanzati**, **programmato per principianti e intermedi**; i coach dicono che «non è necessario per progredire»; grande variabilità (alcuni lo vogliono alla sesta settimana, altri non dopo 12) | Convenzione | Bell e coll. 2022, Front Sports Act Living (PMC9811819) [R: psicologia 1.5; ipertrofia 1.6] |
| Contenuto tipico di una seduta di scarico | Sondaggio su 204 preparatori: 1-2 sedute, 30-60 minuti, **1-3 serie, 1-6 ripetizioni, 60-84% di 1RM** | Convenzione | PMID 39446750 [R: psicologia 1.5] |
| Cosa si taglia | La riduzione di volume (serie, ripetizioni) è il metodo più citato, quella di carico meno; frequenza e scelta degli esercizi di solito invariate | Convenzione | Bell 2022-2024 **Conoscenza del modello (non verificata sul web)** [M] (da verificare sul testo) |
| Revisione pratica | Distingue scarico, taper e stop completo | Convenzione | «A Practical Approach to Deloading», S&C J 2025 [R: recupero 1.1] |
| Effetto sull'ipertrofia | Una settimana senza allenamento in un RCT supervisionato: nessuna differenza di massa; il gruppo che non scaricava ebbe più forza (isometrica e dinamica) delle gambe e un piccolo vantaggio psicologico (prontezza). Nell'RCT 2026 con meno serie (-18%) risultati simili al continuo | Moderata | PeerJ 2024 (PMC10809978); PMC13031491 [R] |
| Cosa dicono i riferimenti pratici sulla dose | Wendler 5/3/1: settimana 4 con 3 serie da 5 al 40-50-60% del Training Max; Rippetoe e Baker 2014: al plateau -10% sui pesi; se il massimale cala, serie -50% e pesi -10%; Pritchard 2015: volume -30/-70% per 1-4 settimane | Convenzione | Wendler **Conoscenza del modello (non verificata sul web)** [M]; Rippetoe, Baker, Pritchard via Dr. Muscle [R: metodi 1.2] (non visti all'origine) |
| Scarico e novizi | Le scuole del «nessuno scarico programmato» (Starting Strength, StrongLifts, GZCLP) usano solo il reset dopo il fallimento; i coach intervistati dicono il contrario (programmato per principianti): **fonti di pari livello in disaccordo** | Convenzione + Contrastata | [R: metodi 4; psicologia 1.5] |

### 1.6 Taper, pausa e ritorno

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Taper (definizione) | Riduzione **progressiva** del carico di allenamento per 1-2 settimane prima di una gara o un test, con volume ridotto del 40-60% circa e **intensità e frequenza mantenute**; effetto piccolo-moderato sulla prestazione, prove soprattutto da sport di resistenza | Moderata (da verificare) | Bosquet e coll. 2007, MSSE (meta-analisi); Mujika e Padilla 2003: **Conoscenza del modello (non verificata sul web)** [M]; la consegna di `ricerca-forza-progressione.md` 3.9 riporta lo stesso intervallo ma non l'ha ritrovato [R] |
| Taper nei powerlifter | Pratica comune: 1-2 settimane, volume giù, singole pesanti fino a 4-7 giorni dalla gara; nessuna prova diretta vista | Convenzione | Sondaggi su powerlifter (Pritchard e coll.), RTS, Sheiko: **Conoscenza del modello (non verificata sul web)** [M] |
| Taper contro scarico | Scarico: serve a scaricare fatica **durante** un ciclo, taglia anche il carico, non ha una data fissa. Taper: serve a **rendere al massimo in un giorno**, mantiene l'intensità | Convenzione | [C] da [M]; S&C J 2025 [R] |
| Pausa breve | **2 settimane** di stop mantengono la forza in uomini allenati; altri risultati: fino a 4 settimane senza calo significativo della forza (con calo di resistenza) | Moderata + Contrastata | PMID 28328712; PMC6416502 [R: recupero 1.8] |
| Pausa più lunga | Meta-analisi sull'interruzione: forza submassimale SMD -0,62, massima -0,46, potenza peggiore; effetto più grande sopra i 65 anni e negli inattivi; 4 settimane di stop: -6/-9% di forza massima (snippet) | Moderata | PMID 23347054 [R: recupero 1.8] |
| Pause periodiche e crescita | Un RCT su giovani uomini: allenamento continuo di 6 mesi contro 3 mesi + 3 settimane di pausa + 3 mesi: crescita simile; la pausa di 3 settimane non pregiudica il lungo periodo | Moderata (da verificare) | Ogasawara e coll. 2013, Eur J Appl Physiol: **Conoscenza del modello (non verificata sul web)** [M] |
| Anziani e massa | Nessun calo significativo della massa dopo 12-24 settimane di stop; calo dopo 31-52 | Moderata | PMC9657634 [R: recupero 1.8] |
| Ritorno e «memoria» | Dopo 12 settimane di stop (anziani) forza e potenza in parte conservate e recupero rapido del 1RM; meccanismo (mionuclei) in conflitto | Moderata + Contrastata (meccanismo) | PMID 32017951; PMC9530508 [R: recupero 1.8] |
| Detraining generale | Revisione classica sulla perdita di adattamenti con l'interruzione: la forza cala più piano della resistenza e della potenza | Moderata (da verificare) | Mujika e Padilla 2000, Sports Med: **Conoscenza del modello (non verificata sul web)** [M] |

### 1.7 Mantenimento, specializzazione, taglio

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Dose minima per mantenere | Dopo 16 settimane di allenamento, giovani adulti hanno mantenuto massa e forza per circa 32 settimane con **un terzo o meno** del volume (frequenza ridotta), a patto di mantenere l'intensità; gli anziani ebbero bisogno di più | Moderata (da verificare) | Bickel e coll. 2011, MSSE: **Conoscenza del modello (non verificata sul web)** [M] |
| Dose minima, sintesi | Con intensità mantenuta la forza si conserva a lungo con frequenze molto basse (una seduta ogni 1-3 settimane) e volumi ridotti; il **muscolo** richiede un po' di più della forza | Moderata (da verificare) | Spiering e coll. 2021, JSCR (revisione): **Conoscenza del modello (non verificata sul web)** [M] |
| Landmark di mantenimento | MV circa 6 serie a settimana con almeno 2 sedute | Convenzione | RP [R: metodi 1.2] |
| Specializzazione | Un muscolo prioritario con +25-50% di serie per 6-8 settimane, gli altri a mantenimento; ciclo poi rivalutato. Nessuna RCT trovata sulla specializzazione come strategia | Convenzione | Helms (3DMJ) via [R: ipertrofia, IPE-13]; **Conoscenza del modello (non verificata sul web)** [M] |
| Taglio calorico | In deficit la **forza** si conserva, il guadagno di **massa magra** si riduce (meta-analisi); consigli pratici: carichi mantenuti, volume invariato o poco ridotto, più attenzione al recupero | Moderata (da verificare) | Murphy e Koehler 2022 (Scand J Med Sci Sports); Helms e coll. 2015 (J Sports Med Phys Fitness): **Conoscenza del modello (non verificata sul web)** [M]; la query è già in lista in `ricerca-cardio-nutrizione.md` [R] |

### 1.8 Variazione e rotazione degli esercizi

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Fissi contro variati | RCT con 21 uomini allenati, 8 settimane: esercizi fissi o cambiati a caso a ogni seduta: **stesso** guadagno di forza e di spessore muscolare; **più motivazione** con la variazione | Moderata (n piccolo, uomini) | Baz-Valle e coll. 2019 (PMC6934277) [R: metodi 1.1] |
| Altri titoli | «Changes in exercises are more effective than in loading schemes to improve muscle strength» (PMID 24832974); «Does varying resistance exercises for the same muscle group promote greater strength gains?» (PMID 35481889); «Muscle hypertrophy and strength adaptations to systematically varying resistance exercises» (PMID 39388663) | da leggere (solo titoli) | PubMed [R: metodi 1.1] |
| Specificità | Il guadagno di forza è molto specifico dell'esercizio e dell'attrezzo; per misurare la progressione e per la forza conviene tenere fissi i fondamentali | Convenzione | Starting Strength, SBS [R: metodi 4]; PRG-08 |

### 1.9 Segnali che dicono «fatica accumulata»

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Soggettivo contro oggettivo | In atleti, le misure **soggettive** (benessere, fatica, sonno) sono più sensibili e coerenti di quelle oggettive nel seguire il carico acuto e cronico | Moderata | Saw, Main, Gastin 2016, Br J Sports Med 50:281-291 [R: psicologia 1.5] |
| Indice di Hooper | Quattro voci (sonno, dolenzia, stress, fatica); in calciatori dopo una partita ha seguito la fatica meglio della HRV | Moderata-bassa (studio singolo) | PMID 30837890 [R: psicologia 1.5] |
| Segnali nei pesi | Revisione esplorativa su 22 studi: calo di prestazione in 8; fatica e dolenzia persistenti quasi ovunque; frequenza cardiaca a riposo molto eterogenea; nessun test singolo | Moderata-bassa | DOI 10.1007/s40279-019-01242-2; PMID 32679567 (sondaggio sui sintomi) [R: psicologia 1.5; recupero 1.1] |
| sRPE | Il voto 0-10 x minuti è valido e affidabile nei pesi; correlazione con frequenza cardiaca r 0,75-0,90 (secondo riassunto) | Moderata | PMID 29163016 [R: psicologia 1.5] |
| Sonno | Perdita di sonno: circa -7,56% di prestazione (snippet), circa -0,4% per ora di veglia; effetti più chiari nel pomeriggio | Solida per la direzione; numeri da snippet | Sports Med 2022 (PMC9584849) [R: recupero 1.1; psicologia 1.5] |
| HRV | L'allenamento guidato dalla HRV: effetti piccoli e non significativi, su atleti di resistenza; nei pesi lacuna | Moderata (resistenza) | PMC8507742 [R: recupero 1.1] |
| Indicatori pratici (RPE alla stessa serie, ripetizioni che calano a carico fisso, dolore articolare, voglia) | Sono i segnali che i coach usano per anticipare uno scarico; **non c'è validazione nei pesi** per soglie numeriche | Convenzione | Helms, Israetel, Tuchscherer (RPE a parità di carico): **Conoscenza del modello (non verificata sul web)** [M] |

### 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto)

| Coach | Posizione che il modello ricorda | Forza | Fonte |
|---|---|---|---|
| Israetel (RP) | Mesociclo = accumulo di 4-6 settimane con serie in salita e RIR in discesa, poi scarico; scarico circa metà delle serie con sforzo lontano dal cedimento; si scarica **prima** se la prestazione cala o il recupero non basta; landmark MV/MEV/MAV/MRV come euristiche | Convenzione (conflitto: vende app e programmi) | [R: metodi 1.2, 5.3] + **Conoscenza del modello (non verificata sul web)** [M] |
| Helms (3DMJ, MASS) | Priorità: aderenza, poi volume, sforzo e frequenza; RPE/RIR per autoregolare; scarico **quando serve** (autoregolato) o a cadenza per chi spinge forte; specializzazione di 6-8 settimane con mantenimento altrove | Convenzione (conflitto: vende programmi) | [R: metodi 1.2 piramide] + **Conoscenza del modello (non verificata sul web)** [M] |
| Nuckols (Stronger By Science) | Per la maggior parte dei sollevatori gli scarichi programmati non sono indispensabili; programmi lunghi (21 settimane in 3 blocchi da 7 con scarico alle settimane 7, 14, 21); aumenti arbitrari e piccoli per l'intermedio | Convenzione | liftvault [R: ipertrofia 1.6] + **Conoscenza del modello (non verificata sul web)** [M] |
| Tuchscherer (RTS) | Autoregolazione con RPE e «percentuale di fatica» (serie di back-off dopo una serie pesante a RPE 8); lo scarico segue la risposta, non il calendario; picco con RPE | Convenzione | [R: metodi 2.12] + **Conoscenza del modello (non verificata sul web)** [M] |
| Beardsley (SCR) | Tensione meccanica e ripetizioni «stimolanti»; **nessuna posizione sullo scarico attribuibile con sicurezza**. L'SFR è popolarizzato da Israetel (le fonti di terzi dicono così); se Beardsley lo tratti, **non verificato** | Convenzione | [R: metodi 1.2] |
| Zourdos | Scala RIR-RPE (2016); ricerca su autoregolazione e periodizzazione; coautore delle meta-regressioni sul volume | Moderata (ricerca) | Zourdos 2016 [R: struttura 1.3]; Pelland, Remmert, Robinson, Hinson, Zourdos 2026 [R: ipertrofia 1.1] |
| Baraki (Barbell Medicine) | Velocità di progressione per definire il livello; RPE; 1-5% a settimana; **posizione sullo scarico non verificata** | Convenzione | [R: forza 1.4] |
| Wendler (5/3/1) | Blocco di 4 settimane (5, 3, 5/3/1, scarico), Training Max al 90%, «protocollo della settima settimana» (scarico o test) nelle versioni più recenti | Convenzione | [R: forza 1.4] + **Conoscenza del modello (non verificata sul web)** [M] |

---

## 2. Dove le fonti non concordano

**A. Scarico programmato o reattivo.** *Posizione A (programmato):* RP, 5/3/1 (settimana 4), Candito (settimana 6), SBS (ogni 7); il 47,2% dei praticanti lo programma (Bell 2024 [R]); i coach intervistati lo usano per principianti e intermedi (Bell 2022 [R]). *Posizione B (reattivo):* StrongLifts, Starting Strength e GZCLP per i principianti; Nuckols e gli intervistati: «non è necessario per progredire»; RCT 2024 e 2026: nessun vantaggio sulla massa e un po' meno forza con la settimana di stop [R]; Delphi: individualizzare. *Adotta il coach:* **blocco programmato per ritmo e per prudenza nei livelli intermedio e avanzato, ma con la possibilità di anticiparlo e con dose graduata dalla fatica**; per i principianti nessuno scarico programmato prima della settimana 8 e solo reattivo prima. Motivo: l'app non può sapere chi ha bisogno di scaricare; un intermedio che si allena 3-4 giorni a 5-6 settimane ha un costo basso nello scaricare (una settimana) e un possibile beneficio su fastidi e aderenza. **Contrastata.**

**B. Scarico: taglio di serie, di carico o stop.** *A:* stop completo di una settimana (alcuni coach, RCT 2024) mantiene la massa; *B:* stop completo costa forza alle gambe (stesso RCT) e il taglio di serie con carico quasi invariato mantiene l'abilità motoria (Wendler 40-60% con 3 serie; sondaggio 60-84% 1RM, 1-3 serie [R]). *Adotta:* taglio di serie del 35-60% con carico -5/-10% e RIR ≥4 (mai stop totale). **Moderata.**

**C. Quanto lontano dal cedimento nelle ultime settimane.** *A:* RP e molti bodybuilder: RIR 0-1 in ultima settimana su tutto; *B:* Refalo 2023 (vantaggio del cedimento 0,19 [0,00-0,37]) e SFR: i pesanti pagano più fatica che stimolo. Robinson 2024 dice però che per l'**ipertrofia** la pendenza sul RIR è negativa (più vicino = più crescita) e per la forza nulla [R]. *Adotta:* pavimento 1 sui pesanti, 0 solo su isolamenti stabili nell'ultima settimana (avanzati). **Contrastata.**

**D. Rampa di volume sì o no.** *A:* RP e Israetel 2020: salire di serie dentro il blocco; *B:* a volume totale pari la periodizzazione non cambia la massa (Moesgaard 2022 [R]) e un RCT con +50% di serie non dà vantaggio [R]. *Adotta:* rampa **moderata** (da 70-75% a 100% del picco) come gestione di fatica e dolenzia, non come motore di crescita. **Convenzione + Contrastata.**

**E. Periodizzare per la forza: ondulato o lineare.** *A:* ondulato meglio negli allenati (meta-analisi 2022, Rhea 2002 [M]); *B:* nessuna differenza (Harries 2015; meta-analisi 2026 [R]). *Adotta:* qualunque struttura coerente va bene; per l'intermedio l'alternanza pesante/leggera nella settimana (come PHUL, già in app) senza promettere vantaggi. **Contrastata.**

**F. Rotazione degli esercizi.** *A:* Dr. Muscle e Westside: cambiare per superare gli stalli e per variare gli stimoli; *B:* Starting Strength: fissi per misurare; Baz-Valle 2019: stessa crescita, più motivazione [R]. *Adotta:* fondamentali fissi per 2-3 blocchi, un terzo-metà degli accessori ruotato **al confine del blocco**, quando serve o piace. **Moderata.**

**G. Quanto dura il blocco.** RP 4-6 settimane, Wendler 4, Candito 6, SBS 7, Nippard 8 (metodi 5.3 [R]); sondaggio 2024: uno scarico ogni 5,6 ± 2,3 settimane [R]. *Adotta:* 5+1 (mediana dei dati) per intermedio e avanzato; 7+1 per il principiante. **Convenzione.**

**H. Scarico e novizi.** Si veda A: pratica dei coach contro scuola SS. **Contrastata.**

**I. Specializzazione.** Helms e Henselmans (specializzare 1-2 muscoli per 6-8 settimane) contro chi tiene un volume uniforme per un anno. Nessuna RCT. *Adotta:* ammessa solo per avanzati con priorità, massimo 2 muscoli, con pavimento di mantenimento. **Convenzione.**

**J. Taper e picco.** Bosquet 2007 (volume -41/-60%, intensità e frequenza mantenute [M]) contro programmi di powerlifting che usano singole molto pesanti fino a 4-7 giorni dalla gara; nessuna prova diretta nei pesi. *Adotta:* nulla per default (regola spenta, MES-18).

**K. Chi stabilisce quando.** Delphi e Helms: autoregolazione; sondaggio: metà programma. L'app ha dati soggettivi (prontezza, sRPE) e oggettivi (carichi, ripetizioni, RPE per serie) sufficienti per un segnale a più voci (sezione 3.7), ma **nessuna soglia numerica è validata** (Saw 2016, revisione sul sovrallenamento [R]): le soglie di MES-07 sono Convenzione dichiarata.

---
## 3. Modello di mesociclo per il generatore

Tutto ciò che segue è **progetto** (Convenzione, con i punti di appoggio indicati): le fonti dicono che la forma del blocco conta poco per la crescita (1.1) e che lo scarico va individualizzato (1.5); il modello serve a dare al generatore un ritmo prevedibile e **sicuro**, non a promettere risultati. Le salvaguardie esistenti (modalità prudente/PAR-Q, over 65, dolore) hanno sempre la precedenza: per loro **niente rampa di serie**, RIR fisso 3-4 come oggi (`rirBersaglioBase`), scarico invariato.

### 3.1 Principi

1. **Il blocco contiene la fatica, non crea la crescita.** Rampa e scarico sono scelti per costo/beneficio sulla fatica e sull'aderenza (1.1, 1.5).
2. **Una sola leva sale per volta.** Non devono salire insieme serie, vicinanza al cedimento **e** carico a ogni seduta: la rampa di RIR fa già crescere lo sforzo. Per intermedi e avanzati il carico di un esercizio sale **al massimo una volta a settimana** (coerente con le scale S2/S3 di `ricerca-forza-progressione.md`, PGR-01).
3. **Il picco di volume è quello che il generatore già calcola** (con i tetti di tempo e le 11 serie per muscolo e seduta): la rampa va **sotto** il picco, non sopra. Così non si rompono i vincoli già verificati.
4. **Ogni riduzione è riferita a un carico di riferimento salvato** (l'ultimo carico di lavoro fuori da uno scarico), mai all'ultima seduta: corregge il difetto verificato N1/N2 (sezione 5).
5. **Una seduta di scarico non è un dato di forma**: non entra in esigenza, e1RM, stalli, strain e verdetto di ciclo (3.8).
6. **Tutto spegnibile, annullabile, con il motivo scritto** e la forza dichiarata (come RIC-01..05).

### 3.2 Tabella per livello e obiettivo

Obiettivo **massa / ricomposizione** (modello base). Con «picco» si intende il volume settimanale per esercizio già calcolato dal generatore (PRG-25, tetti inclusi).

| Elemento | Principiante | Intermedio | Avanzato |
|---|---|---|---|
| Durata del programma | 8 settimane | 12 settimane = 2 blocchi | 12 settimane = 2 blocchi (4+1 o 5+1) |
| Struttura del blocco | **7 di carico + 1 di scarico (solo la settimana 8)**; la settimana 8 diventa «consolidamento» se la fatica è bassa e nessun segnale è acceso | **5 di carico + 1 di scarico** | **5 + 1**, **anticipabile** a 4 + 1 dai segnali (3.7) o se il picco è al tetto del livello |
| Rampa di serie (fattore sul picco, settimane di carico) | nessuna (settimane 1-2: -1 serie sul primo contatto con l'esercizio, INT-04/PCO-07) | 0,75 · 0,85 · 0,95 · 1,00 · 1,00 (circa +1 serie per muscolo a settimana) | 0,70 · 0,80 · 0,90 · 1,00 · 1,00, più +1 serie sui prioritari dalla settimana 3 |
| RIR bersaglio (tabella 3.4) | 4→2 sui pesanti, 3→2 sulle macchine, 3→1 sugli isolamenti | 3→1 pesanti e macchine, 3→0 isolamenti (solo ultima settimana) | 3→1 pesanti, 3→0 macchine, 2→0 isolamenti |
| Progressione del carico | a ogni seduta se tutte le serie sono complete con RIR ≥ bersaglio (S1) | al massimo 1 volta a settimana per esercizio; doppia progressione sul range | idem; salto a inizio blocco ricalcolato dal massimale stimato |
| Scarico | settimana 8, saltabile; **prima** solo reattivo | fine blocco (settimana 6, 12), dose dalla fatica | fine blocco o prima, dose dalla fatica |
| Ondulazione nella settimana | no (stessi carichi in tutte le sedute) | facoltativa: giorno «pesante» e giorno «leggero» **solo se gli esercizi sono diversi** o se la progressione ha una chiave per giorno (B8) | idem |

Variazioni per **obiettivo** e **fase**:

| Obiettivo o fase | Cosa cambia rispetto al modello base | Forza |
|---|---|---|
| Forza | Sui pesanti di bilanciere un'**onda di carico**: ripetizioni 5, 5, 4, 3, 3 con RIR 3, 2, 2, 2, 1 (circa +2,3% di carico a settimana, tabella Epley in 3.5); accessori come in massa con volume -20%; scarico: 2 serie da 5 a -10% (MES-04, opzionale) | Convenzione (Wendler, Candito, Helms) + Moderata (periodizzare aiuta la forza: Moesgaard 2022 [R]) |
| Dimagrimento e salute | Rampa 0,80 → 1,00; RIR con pavimento 2 sui pesanti e 1 sul resto; nessuna tecnica d'intensità; scarico a fine blocco con dose 'bassa' se nessun segnale | Convenzione |
| Fase di taglio (deficit) | Vedi MES-17: picco x0,85-0,90, pavimento RIR 2 sui pesanti, carichi mantenuti, soglie reattive più sensibili | Convenzione + Moderata (da verificare) (Helms 2015, Murphy e Koehler 2022 [M]) |
| Modalità prudente, over 65, PAR-Q | **Nessuna rampa**: serie fisse, RIR 3-4 fisso, scarico 'media' a fine blocco; invariato rispetto a oggi | Convenzione (prudenza) |

### 3.3 Rampa di volume: formula e arrotondamenti

Per un esercizio con `setsBase` serie previste, nella settimana di carico *w* del blocco:

`serie(w) = max(2, round(setsBase x f[w]))`, con `serie(w) <= setsBase` (la rampa non supera il piano) e **nessuna rampa se `setsBase` <= 2**. Arrotondamento: mezzo verso l'alto. `f` è nella tabella 3.2. Ai muscoli **prioritari** si aggiunge 1 serie dalla settimana 3 (dalla 2 se la prontezza media delle ultime 2 sedute è ≥70), con massimo `setsBase + 1` e massimo 5 per esercizio (è RIC-01 spostato dove serve: vedi MES-03).

Risultato per `setsBase` 3-6 [C]:

| `setsBase` | Intermedio, sett. 1-5 | Avanzato, sett. 1-5 | Scarico 'media' (x0,5, min 2) |
|---|---|---|---|
| 3 | 2 · 3 · 3 · 3 · 3 | 2 · 2 · 3 · 3 · 3 | 2 |
| 4 | 3 · 3 · 4 · 4 · 4 | 3 · 3 · 4 · 4 · 4 | 2 |
| 5 | 4 · 4 · 5 · 5 · 5 | 4 · 4 · 5 · 5 · 5 | 3 |
| 6 | 5 · 5 · 6 · 6 · 6 | 4 · 5 · 5 · 6 · 6 | 3 |

Esempio per un muscolo con picco 12 serie frazionarie (intermedio): circa 9 · 10 · 11-12 · 12 · 12. Con picco 16 (avanzato): circa 11 · 13 · 14 · 16 · 16.

**Costo della rampa.** Il volume medio del blocco è circa il 91% (intermedio) o 88% (avanzato) del piatto: circa 1 serie in meno a settimana. Con la pendenza di circa +0,24% di muscolo per serie in più della meta-analisi 2025 [R: struttura 1.1], il costo è dell'ordine di **qualche decimo di punto percentuale** su un blocco [C]: trascurabile rispetto al beneficio di fatica e dolenzia.

### 3.4 RIR per settimana e per tipo di esercizio

Valore *r* = limite basso del bersaglio; il bersaglio è `[r, r+1]` (come oggi `rirBersaglioBase`: `[r, r+1]`; con *r* = 0 diventa `[0, 1]`). Tipi come in `tipoCarico` (pesante, macchina, isolamento).

| Livello e tipo | Sett. 1 | 2 | 3 | 4 | 5 | 6 | 7 | Scarico |
|---|---|---|---|---|---|---|---|---|
| Principiante, pesante | 4 | 3 | 3 | 3 | 2 | 2 | 2 | 4+ |
| Principiante, macchina | 3 | 3 | 3 | 2 | 2 | 2 | 2 | 4+ |
| Principiante, isolamento | 3 | 3 | 2 | 2 | 2 | 1 | 1 | 4+ |
| Intermedio, pesante | 3 | 3 | 2 | 2 | 1 | | | 4-5 |
| Intermedio, macchina | 3 | 2 | 2 | 1 | 1 | | | 4-5 |
| Intermedio, isolamento | 3 | 2 | 1 | 1 | 0* | | | 4-5 |
| Avanzato, pesante | 3 | 2 | 2 | 1 | 1 | | | 5 |
| Avanzato, macchina | 3 | 2 | 1 | 1 | 0* | | | 5 |
| Avanzato, isolamento | 2 | 1 | 1 | 0* | 0* | | | 5 |

\* solo su esercizi «stabili» (BIO-03: gli instabili restano ≥1) e con prontezza ≥60 nel giorno.

Perché: (1) l'errore di stima del RIR è di circa 1 ripetizione e **peggiora lontano dal cedimento** (circa 1,2 a 5 RIR) [R]: per questo i valori di partenza sono 3 e non 5; (2) il cedimento rende poco sulla massa (0,19 [R]) ma l'ipertrofia sale un po' avvicinandosi (Robinson 2024 [R]), quindi si arriva a 0 solo dove costa meno (isolamenti) e nell'ultima settimana; (3) il pavimento 1 sui pesanti è per fatica e tecnica (SFR, Convenzione); (4) lo scarico a ≥4 è il contenuto delle fonti pratiche (le serie si fermano lontano dal limite). Tutto **Convenzione** tranne i punti (1) e (2) (Moderata). **Interazione con l'esigenza:** il -1 RIR su macchine e isolamenti con esigenza ≥1,15 (`rirBersaglio`, regole-ricerca.js:58) si applica solo se il risultato resta sopra il **pavimento del livello** (principiante: macchine ≥2, isolamenti ≥1; vedi B12).

### 3.5 Carico e ripetizioni settimana per settimana

**Ipertrofia (ripetizioni fisse nel blocco).** Le ripetizioni previste (decise da `schemeFor` e dai metodi) **non cambiano** nel blocco; cambia il RIR. Con ripetizioni fisse, scendere da RIR 3 a RIR 1 equivale a circa **+5% di carico** (Epley: per 8 ripetizioni da 11RM = 73,2% a 9RM = 76,9%; per 12 ripetizioni da 15RM = 66,7% a 13RM = 69,8%) [C]: circa +1,2% a settimana, dentro l'intervallo 1-5% a settimana che Barbell Medicine indica per la progressione sostenibile [R: forza 1.4]. Il carico quindi non sale a ogni seduta: **si fissa alla settimana 1 per il RIR 3 e si alza quando tutte le serie arrivano alla cima del range con RIR ≥ bersaglio** (doppia progressione, già CAR-06), al massimo una volta a settimana.

**Forza (pesanti di bilanciere, MES-04, opzionale).** Onda di 5 settimane [C]:

| Settimana | Ripetizioni | RIR | Ripetizioni + RIR | %1RM (Epley) | Salto |
|---|---|---|---|---|---|
| 1 | 5 | 3 | 8 | 78,9% | |
| 2 | 5 | 2 | 7 | 81,1% | +2,2 |
| 3 | 4 | 2 | 6 | 83,3% | +2,2 |
| 4 | 3 | 2 | 5 | 85,7% | +2,4 |
| 5 | 3 | 1 | 4 | 88,2% | +2,5 |
| Scarico | 5 | 4-5 | 9-10 | 75-77% | 2 serie |

La %1RM è il **bersaglio**; l'RPE registrato lo corregge (CAR-06). Il massimale stimato parte dagli ultimi dati fuori scarico. È l'impianto di 5/3/1 e di Candito (Convenzione) con numeri ricavati dalla formula; nessuna prova che batta il lineare (2: E).

**Ondulazione nella settimana.** Giorno «pesante» (-2/-3 ripetizioni) e giorno «leggero» (+3/+4) per lo stesso muscolo: nessuna differenza di massa e al più un vantaggio di forza negli allenati (Grgic 2017, Harries 2015, meta-analisi 2022 [R]). **Non è una regola di crescita**: va usata solo dove l'app ha già due giorni diversi (PHUL, Upper/Lower) e **solo con esercizi diversi** o con la progressione per giorno, perché `ultimeSessioni` ha come chiave il solo nome (B8, B7).

### 3.6 Disegno dello scarico: cosa si taglia

**Confronto delle dosi nelle fonti** (tutte Convenzione, visibili in 1.5): serie -35% a -60% (RP, Dr. Muscle, 5/3/1: 3 serie), carico -5% a -10% (Rippetoe e Baker, Dr. Muscle) o 60-84% di 1RM nei preparatori, **RIR ≥4**, **5-7 giorni** (6,4 ± 1,7 giorni), stessi esercizi, frequenza invariata. Un solo RCT (stop completo) mostra che togliere tutto costa forza alle gambe [R]. Da qui il disegno:

| Elemento | Dose 'bassa' | Dose 'media' | Dose 'alta' | Note |
|---|---|---|---|---|
| Quando (`livelloFatica`) | sRPE medio <7 e prontezza ≥70 | tutto il resto | sRPE medio ≥9,5 oppure prontezza media <50 | con MES-08 la soglia di sRPE cambia (vedi) |
| Serie | x0,65 (-35%) | x0,50 (-50%) | x0,40 (-60%) | minimo 2 per esercizio da ≥3 serie; per esercizi da 2 serie: tenere 2 e togliere gli ultimi isolamenti (1 esercizio ogni 3) |
| Carico | x0,95 | x0,90 | x0,90 | **sul carico di riferimento** (3.6.1), uguale in tutte le sedute della settimana |
| RIR | ≥3-4 | ≥4 | ≥5 | oggi in scarico **non viene mostrato nessun RIR** (`caricoProssimo` non appende `testoRir` al tipo 'scarico'; per gli avanzati `rirSett` dà 4 solo al calcolo dell'RPE bersaglio): va mostrato |
| Frequenza e esercizi | invariati | invariati | invariati; 1-2 giorni di riposo in più consigliati | mai stop totale |
| Durata | 5-7 giorni (la settimana) | 5-7 giorni | 5-7 giorni | |
| Tecniche d'intensità | nessuna (RIC-04 già lo fa) | nessuna | nessuna | |

**Perché non -70%.** Oggi 'alta' è x0,3, ma con il minimo di 2 serie dà le **stesse** serie di 'media' per esercizi da 3-4 serie (3 → 2; 4 → 2) [C]: il -70% non si realizza e la dose 'alta' si distingue solo per il testo. Un taglio realistico del 60% (min 2) è più onesto; e per esercizi da 2 serie, dove oggi non si taglia nulla, si toglie lavoro togliendo gli ultimi isolamenti.

**3.6.1 Carico di riferimento e ripresa [V].** *Riferimento* `rif(e)` = il carico massimo delle serie fatte nell'**ultima seduta di quell'esercizio che non era di scarico** (entro 28 giorni). In scarico il carico è `rif x dose.carico` in **tutte** le sedute della settimana (non più `ultima x dose`, che si compone). **Ripresa**: la prima seduta dopo lo scarico programmato usa `rif` (100%) con RIR +1; dopo uno scarico reattivo o di dose 'alta', `rif x 0,95` se la prontezza media dei 3 giorni precedenti è <60 (altrimenti `rif`); da lì le regole normali (+incremento se tutte le serie sono complete). Motivo: una settimana di riduzione non fa perdere forza in chi è allenato (2 settimane di stop mantengono la forza: PMID 28328712 [R]) e riprendere al 100% è l'uso diffuso.

**3.6.2 Quando saltare lo scarico programmato.** Solo per il **principiante** alla settimana 8: se `livelloFatica` = 'bassa', prontezza media ≥70, nessuno stallo e nessun segnale (3.7), la settimana 8 è una settimana di carico normale (RIR 2) e il ciclo si chiude lì: il ciclo successivo parte subito dalla settimana 1, senza scarico in mezzo. Per intermedi e avanzati lo scarico non si salta mai (dose minima 'bassa'): l'ipotesi «non serve» è sostenuta da RCT su giovani non allenati o in numero piccolo, non da dati su allenati con volume alto [R].

### 3.7 Scarico reattivo: segnali e soglie numeriche

Principio: **più segnali distinti, mai uno solo**, perché nessuna misura singola dice se si è in overreaching e le misure soggettive sono le più sensibili (Saw 2016; revisione sul sovrallenamento [R]). Le soglie sono **Convenzione dichiarata** (nessuna validazione nei pesi).

| Codice | Segnale | Soglia | Dato dell'app |
|---|---|---|---|
| S1 | Prontezza bassa | media delle ultime 3 check-in <50, oppure 3 giorni su 7 <50 (già PRZ-04) | `storicoProntezza()` |
| S2 | Forza in calo | e1RM della seduta ≤ -5% rispetto al migliore delle ultime 3 settimane **non di scarico** su **≥2 multiarticolari**; oppure «mancato» a un carico già completato nelle 3 settimane precedenti, in 2 sedute di fila, su ≥2 multiarticolari (regressione, non stallo) | `e1rmSeduta`, `esito` |
| S3 | Deriva dell'RPE | RPE medio delle serie della seduta ≥ bersaglio **della settimana** +1,0 per 2 sedute di fila, con carico non salito più dell'incremento standard | RPE per serie + bersaglio salvato (MES-09) |
| S5 | Sonno | voce sonno «male» in ≥4 delle ultime 7 check-in | check di prontezza |
| S6 | Voglia | voce voglia «bassa» in ≥4 delle ultime 7 check-in; **non basta mai da sola** | check di prontezza |
| S7 | sRPE | «Al limite» (10) in ≥2 delle ultime 3 sedute, oppure «Dura» (9) **con** «Stanco» all'arrivo in ≥2 delle ultime 3 | questionario dopo seduta |
| (S4) | Dolore articolare | resta nelle regole DEC/DOL (scarico **locale** dell'esercizio); non conta come fatica generale | DEC-01..04 |

**Regola di scatto.** Scarico reattivo se (a) almeno **2 segnali distinti** tra S1, S2, S3, S5, S6, S7 e **almeno uno tra S1, S2, S3**; oppure (b) **forte**: S2 su ≥3 multiarticolari, oppure media delle ultime 3 prontezze <40.
**Protezioni:** non nelle prime 2 settimane del blocco (la dolenzia dei primi giorni non è fatica accumulata); non a meno di 14 giorni dall'ultimo scarico; al massimo uno ogni 3 settimane; se lo scarico programmato è entro 7 giorni si **anticipa quello** (nessun doppio scarico); bottone «Non ora» (annullabile).
**Dose:** serie x0,60 (min 2), carico x0,90 su `rif`, RIR ≥4, per le prossime **3 sedute o 7 giorni** (minimo 2 sedute), stessi esercizi. **Dopo:** ripresa come in 3.6.1.
**Orologio del blocco:** se lo scarico reattivo scatta dopo ≥3 settimane di carico del blocco, **vale come scarico del blocco** (il blocco successivo parte dalla settimana 1); altrimenti la rampa riprende dalla settimana *k-1* (minimo la 2) e lo scarico programmato resta, rinviato di non più di 3 settimane.

Le regole oggi separate (DEC-06 nel questionario, PRZ-04 nella prontezza, STR-01 nell'agente, CAR-10 che le applica) dovrebbero confluire in **una funzione** (`segnaliFatica()` → `scaricoReattivo()`), per avere **una dose e una durata** (oggi 1 seduta con x0,6/x0,9 in DEC-06, 2 sedute in PRZ-04 e STR-01).

### 3.8 Come devono trattare lo scarico le altre regole

| Regola | Oggi | In scarico (programmato o reattivo) | Dopo lo scarico |
|---|---|---|---|
| ESI-02 esigenza (`esigenza.js:22`) | confronta l'RPE con il bersaglio calcolato **adesso** (settimana corrente), non quello della seduta; in scarico RPE bassi danno «serie facili» +5% (B11) [V: lettura] | **Nessun aggiornamento** della settimana di scarico (esigenza invariata); RPE valutati con il RIR **salvato** della seduta (MES-09) | la prima settimana dopo lo scarico non conta «RPE sopra il bersaglio» (carichi di rientro) |
| INT-05, CAR-14 (calibrazione) | la calibrazione sta nell'**ultima** settimana di carico (`regole-ricerca.js:262`), cioè quella con più fatica accumulata (stima del RIR peggiore) | nessuna | spostarla alla settimana 2 o 3 del blocco (competenza della nota sul RIR) |
| CAR-06 progressione | `ultimeSessioni` prende anche le sedute di scarico: progressione che riparte dal carico ridotto [V] | niente aumenti | si progredisce dal **riferimento**, non dalla seduta di scarico |
| CAR-07, CAR-09 (mancato) | contano anche in scarico | non contano come «mancato» (carico/serie sono di scarico) | la **prima** seduta dopo lo scarico non viene giudicata contro il piano precedente |
| CAR-08 (scarico mirato) | tre e1RM strettamente decrescenti, scarichi inclusi, senza tolleranza | escluso | soglia -3% (rumore del RIR) invece di «strettamente in calo», scarichi esclusi |
| STA-01 (fermo) | e1RM ultimo ≤ il più vecchio della finestra: la settimana di scarico fa risultare «fermi» tutti gli esercizi (finestra di 3 sedute dei principianti) [V: lettura] | esclusa | esclusa la finestra dello scarico e la prima seduta dopo |
| STR-01 (strain) | `sw[0]>sw[1]>sw[2]` con la settimana di scarico come base: scatta per costruzione 2 settimane dopo uno scarico se l'sRPE è alto [V: lettura] | la settimana di scarico non è base di confronto | nessun nuovo scarico entro 14 giorni |
| CIC-01 (verdetto) | confronta l'ultima seduta (**sempre di scarico**) con la prima: falso «stallo» [V: simulazione] | esclusa | usa il migliore (o la media delle 3 migliori) delle sedute di carico degli ultimi 2 blocchi, soglia +3% |
| LIV-01 (livello) | usa frequenza e difficoltà, non e1RM | invariato | invariato |
| PRZ-02 / PRZ-03 | PRZ-03 non scatta in scarico (giusto) | PRZ-02 resta | PRZ-03 va ritirato (vedi B18) |
| RIC-01, RIC-04 | già esclusi in scarico | invariato | RIC-01 sostituito dalla rampa (MES-03) |
| RIC-05 / CAR-04 (rientro) | basati sui giorni dall'ultima seduta | **non** scattano per una pausa ≤13 giorni | idem |
| ADE-01 aderenza | conta tutte le sedute previste | in scarico le sedute saltate pesano la metà | nessun cambio |
| Statistiche | la settimana di scarico abbassa il volume | etichetta «scarico» sul grafico | |

### 3.9 Cosa passa da un blocco al successivo

| Elemento | Passa? | Come |
|---|---|---|
| Fondamentali (pesanti di bilanciere e macchine principali) | **Sì, fissi** per 2-3 blocchi (12-18 settimane) | cambio di variante solo al cambio di fase (massa ↔ forza) o per stallo (scala 4) |
| Accessori | in parte | si ruota **un terzo - metà** al confine del blocco (3.10) |
| Carichi | **sì**, dal massimale stimato | settimana 1 del nuovo blocco: carico = massimale stimato x %(ripetizioni+RIR) di Epley, con `e1RM` = migliore dei due ultimi blocchi **di carico**; mai dai carichi di scarico |
| Volume di picco | sì, con regola | `picco(n+1) = picco(n) + 1 serie per muscolo` solo se verdetto «buono» (aderenza ≥80%, ≥50% degli esercizi con e1RM +3%), prontezza media ≥60 e nessuno scarico reattivo oltre al programmato; invariato se l'aderenza è 70-80% o c'è 1 reattivo; **-10/-15%** (-1/-2 serie) se ≥2 reattivi o fatica 'alta'. Tetto: massimo del livello (PRG-25) e 11 per seduta |
| RIR e rampa di serie | no, **ripartono dalla settimana 1** | (3.3, 3.4) |
| Scarico | il blocco finisce con lo scarico; il nuovo parte dalla settimana 1 | non due scarichi di fila |
| Esigenza (ESI) | continua | non si azzera; esclusi i dati di scarico |
| Contatori di stallo (`aggiusti.stalli`) | per gli esercizi **ruotati** si azzerano; per i fondamentali restano | |
| Tecniche d'intensità | si rifanno | RIC-04 invariato |
| Priorità e specializzazione | `cicliSpec` | dopo 3 blocchi di specializzazione uno bilanciato (già in `nuovoCiclo`) |
| Tipo di blocco (ipertrofia / forza) | alterna | intermedi: solo su «stallo» corretto (MES-12); avanzati: ogni 2-3 blocchi (Convenzione) |

### 3.10 Rotazione degli esercizi

1. **Mai a metà blocco**: solo alla settimana 1 (volume basso, rampa che riparte, il costo «prima volta con l'esercizio» di INT-04 coincide con la settimana più leggera) o subito per **dolore** (DEC) o **macchinario occupato**.
2. **Cosa non ruota**: i fondamentali (esercizi 'pesante') per 2-3 blocchi; gli esercizi **graditi** dall'utente.
3. **Quanto**: un terzo - metà degli accessori, **solo** se almeno una condizione: accessorio fermo (STA-01), utente che ama la varietà, fastidio ricorrente, cambio di fase. Altrimenti si tengono per il secondo blocco (le prove: Baz-Valle 2019 [R]: nessun vantaggio di crescita dalla variazione, più motivazione).
4. **Con cosa**: stesso muscolo bersaglio e stesso schema di movimento, se possibile con la stessa «posizione» (allungata/accorciata), stesso attrezzo disponibile; il sostituto eredita il carico stimato dal massimale del precedente quando la famiglia è la stessa (oggi riparte dalla stima del corpo: cap. 17 punto 6).
5. **Scopo dichiarato**: motivazione e stimolo da angoli diversi (Convenzione); l'app non dice che «fa crescere di più».

### 3.11 2-3 sedute a settimana contro 5-6

| Elemento | 2-3 sedute (full body) | 4 sedute | 5-6 sedute |
|---|---|---|---|
| Rampa di serie | si aggiungono serie su **2-3 esercizi diversi** a settimana, non sedute; tetto 11 per muscolo e seduta | rampa sulle due sedute del muscolo | rampa distribuita su tutte le sedute del muscolo; occhio al tetto per seduta |
| Scarico | tutte le sedute **mantenute**, serie -35/-50% (2-3 stimoli a settimana: togliere sedute rompe la pratica) | idem | serie -40/-50%; in alternativa togliere **1 seduta** (6 → 5, 5 → 4) per chi è molto affaticato |
| Lunghezza del blocco | 5+1 (7+1 principianti) | 5+1 | 4+1 o 5+1 |
| Soglie reattive | standard | standard | prontezza <55 e S3 con 1 sola seduta (più volume totale, più fatica sistemica e articolare) |
| Dose di scarico di default | 'bassa' (volume per muscolo 6-12 serie: fatica bassa) | 'media' | 'media' |

Motivo: a volume pari la frequenza cambia poco la crescita (Pelland 2026 [R]); a pari volume con 2-3 sedute il costo di tagliare una seduta è un terzo-metà degli stimoli. Convenzione.

### 3.12 Concatenare i blocchi in 6-12 mesi

**Esempio intermedio, massa, 52 settimane** (6 settimane per blocco, l'ultima di scarico):

| Blocco | Settimane | Tipo | Cosa cambia |
|---|---|---|---|
| M1 | 1-6 | Base ipertrofia | picco al centro del range del livello; RIR 3 → 1; fondamentali scelti |
| M2 | 7-12 | Accumulo | picco +1 serie per muscolo se verdetto «buono»; ruota 1/3 degli accessori |
| M3 | 13-18 | Forza-ipertrofia | pesanti con onda 5, 5, 4, 3, 3 (MES-04); accessori 8-12; picco -10% |
| M4 | 19-26 (6 + 2) | Specializzazione (se c'è priorità) o Accumulo 2 | specializzazione: 1-2 muscoli a picco x1,25-1,5, altri a mantenimento (3.12.1) |
| Ponte | 27-28 | 1-2 settimane leggere, ferie o test | massimale stimato da AMRAP o serie 5-8, nuovo verdetto |
| M5-M8 | 29-52 | come M1-M4 con accessori nuovi e picco rivalutato | |

**Principiante:** 8 settimane x 3 (24 settimane) con progressione a ogni seduta, poi riesame del livello (LIV-01) e passaggio al modello intermedio; scarico solo a fine blocco. **Avanzato:** 4-5 blocchi in 6 mesi, specializzazioni alternate tra muscoli (la regola «dopo 3 specializzazioni uno bilanciato» è già in `nuovoCiclo`).

**3.12.1 Specializzazione e mantenimento (Convenzione + Moderata da verificare).**

| Elemento | Valore |
|---|---|
| Durata | 6-8 settimane (un blocco o un blocco e mezzo) |
| Muscoli | massimo 2 prioritari, +25-50% di serie sul picco (non oltre il tetto del livello e 11 frazionarie per seduta), frequenza 2-3 sedute |
| Altri muscoli | **≥1/3 del volume abituale e mai sotto 4-6 serie frazionarie** (2 sedute se ≥6 serie), **carico mantenuto**, RIR 2-3 |
| Perché | volume ridotto a circa 1/3 con intensità mantenuta conserva massa e forza per mesi nei giovani (Bickel 2011 [M]); sintesi: frequenza e volume molto bassi bastano a conservare la forza se l'intensità resta (Spiering 2021 [M]); landmark RP di mantenimento circa 6 serie [R] |
| Dopo | gli altri muscoli rientrano nella rampa normale dalla settimana 1; il muscolo prioritario torna al picco normale |
| Limite | nessuna RCT sulla specializzazione come strategia (1.7): **Convenzione** |

**Modalità «poco tempo» (mantenimento puro):** per periodi dichiarati di poco tempo o stress, `volume = max(4, 1/3 del picco)` per muscolo, almeno 1 seduta a settimana per muscolo (2 se ≥6 serie), carico mantenuto e RIR 2-3; fino a circa 8-12 settimane senza perdite apprezzabili nei già allenati (Bickel 2011, Spiering 2021 [M]; Androulakis-Korakakis [R] mostra che anche 1 serie a esercizio produce forza). Al ritorno: settimana 1 di un blocco nuovo.

**3.12.2 Fase di taglio (MES-17).** In deficit calorico la forza si conserva e la crescita di massa magra rallenta [M]. Modificatori: picco **x0,85-0,90**, pavimento RIR 2 sui pesanti e 1 sul resto, **carichi mantenuti** (non ridurli di proposito), soglie reattive **più sensibili** (S1 <55), blocco 4+1 per avanzati sopra le 8 settimane di deficit, nessuna specializzazione nuova. Forza: Convenzione + Moderata (da verificare). Il dato (`profilo.fase === 'deficit'`) esiste già (`corpoCoach`, repertorio.js:222).

**3.12.3 Pause, rientri, ferie e orologio del blocco (MES-15).**

| Pausa dall'ultima seduta | Cosa fa il coach | Base |
|---|---|---|
| ≤6 giorni | niente | normale |
| 7-13 giorni | **non avanza la rampa**: ripete la prescrizione dell'ultima settimana, +1 RIR la prima seduta | 2 settimane di stop mantengono la forza (PMID 28328712 [R]); prudenza |
| 14-27 giorni | il blocco **riparte dalla settimana 1** (rampa 0,75, RIR 3), carichi CAR-04 (-10/-20%), RIC-05 (-25% serie); il calendario si sposta di tutte le settimane saltate | detraining [R]: 4 settimane -6/-9% (snippet) |
| 28-90 giorni | nuovo blocco con carichi -30% (CAR-04), serie -25/-40% per le prime 2 sedute poi +1 serie a settimana, RIR ≥3 | CAR-04 [R]; rampa di rientro proposta in `ricerca-recupero-infortuni-popolazioni.md` 5.3 [R] |
| >90 giorni | come principiante (carico -50%, max 3 serie) | CAR-04 [R] |
| Ferie **pianificate ≤14 giorni** | contano come **scarico**: se il blocco aveva ≥3 settimane di carico, non si fa un altro scarico; al ritorno settimana 1 di un blocco nuovo | Ogasawara 2013 [M] (3 settimane di pausa senza perdita a lungo termine), PMID 28328712 [R] |
| Periodo «difficile» attivo (MOM) | **si ferma l'orologio del blocco** finché dura | ESI-03 già esclude l'esigenza |

Oggi `settimanaProgramma` (progressivo.js:46) conta le settimane dal calendario: **una pausa consuma il blocco** (si arriva alla settimana di scarico dopo 2 settimane di niente), e SAL-01 sposta al massimo di un giorno.

**3.12.4 Picco per powerlifter (MES-18, spenta di default).** Solo con una data di gara o di test **dichiarata** dall'utente (oggi non esiste il campo) e con livello avanzato: ultime 7-14 giorni con **serie -40/-60%** (taper), **intensità e frequenza mantenute**, ultime singole pesanti 4-7 giorni prima, niente nuovi esercizi. Base: Bosquet 2007 (soprattutto resistenza) e pratica dei powerlifter (Pritchard e coll., RTS, Sheiko) [M]; la nota forza (TAP-01) la propone allo stesso modo e la lascia spenta. **Forza: Convenzione (da verificare)**; nessun uso di 1RM per i non esperti (STD-02 della nota forza).

---

## 4. Scala di intervento sugli stalli

**Prima si classifica, poi si sale.** Quando STA-01 segnala «fermo» (principiante: 2 sedute; intermedio: 4 settimane; avanzato: 8 settimane; **fuori dagli scarichi**), il coach classifica lo stallo con i dati che ha:

| Tipo | Come si riconosce | Primo passo |
|---|---|---|
| **F (fatica)** | e1RM in calo ≥5% o RPE alto con prontezza media <60 o S2/S3 accesi | gradino 2 (scarico) **prima** di aggiungere volume |
| **S (stimolo)** | e1RM piatto (±3%), prontezza ≥60, RPE nel bersaglio | gradini 3-6 |
| **T (tecnica, dolore, dato)** | ripetizioni molto variabili, RPE incoerente, dolore, pochi dati | gradino 0-1 |

Soglia del rumore: l'errore del RIR è di circa 1 ripetizione, cioè circa il 3% del massimale stimato [C da R: struttura 1.3; forza 3.5]: una variazione sotto il 3% **non** è uno stallo né un calo.

| Gradino | Cosa fa il coach | Criterio per salire | Dove in 3in | Forza |
|---|---|---|---|---|
| 0 | **Controlla i dati**: ≥3 sedute con e1RM, serie ≤12 ripetizioni, scarichi esclusi, variazione >3% | dati sufficienti e variazione ≤3% per N sedute | `eserciziFermi` (con MES-10) | Convenzione |
| 1 | **Recupero e tecnica**: sonno, cibo, stress, dolore, esecuzione; con prontezza media <60 non si cambia il programma, si alleggerisce (PRZ-02) | prontezza ≥60 per 1 settimana e stallo persistente | PRZ-02/04, DEC | Convenzione (a 6 settimane di stallo è quasi sempre tecnica, recupero o cibo: Rippetoe, riassunti [R]) |
| 2 | **Scarico reattivo** (solo tipo F): 1 settimana, ripresa al riferimento | 2 settimane dopo la ripresa ancora fermo | MES-07 | Convenzione + Contrastata |
| 3 | **Passi più piccoli e ripetizioni al posto del carico** (microcarichi, doppia progressione: +1 ripetizione, poi carico) | 2 sedute senza aumento | CAR-06 (micro-incrementi) | Convenzione |
| 4 | **Cambia schema a pari carico**: massa 3×10 → 3×8 → 3×6; forza 5×5 → 5×3; principiante 5×3 → 6×2 → 10×1 (CAR-07) | 2 sedute senza aumento | PCO-01 (proposto) | Convenzione (GZCLP, Rippetoe [R]) |
| 5 | **Aggiungi volume**: +1-2 serie a settimana sul muscolo (STA-02: +20%), **solo** con prontezza ≥60, serie sotto il tetto del livello e delle 11 per seduta, mai nelle 2 settimane dopo uno scarico | 3-4 settimane | STA-02 (`piuSerie`) | Convenzione (RP, Dr. Muscle [R]); Solida in generale (più volume, più crescita: Pelland 2026 [R]) |
| 6 | **Cambia variante** (stesso muscolo, angolo, ROM, posizione allungata): subito per gli accessori; per i fondamentali solo dopo i gradini 3-5 | 4-6 settimane | STA-02 (`variante`) | Convenzione; Baz-Valle 2019 [R] (nessun danno) |
| 7 | **Reset del carico**: -10% (-5% principiante) e ricostruzione | stallo persistente di un fondamentale | CAR-07, STA-02 `reset` | Convenzione (Rippetoe e Baker 2014 [R]) |
| 8 | **Cambia fase**: massa ↔ forza, o passa a progressione settimanale/onda (intermedio) | stallo su più esercizi per un blocco | CIC-02, LIV-01 | Convenzione |
| 9 | **Stallo diffuso ≥2 blocchi**: controllo di salute e aderenza; 1 settimana di pausa completa e, se persiste, invito a sentire un professionista | tutti i gradini provati | messaggio (non diagnosi) | Convenzione (prudenza) |

Regole di cadenza: **un gradino alla volta**, almeno 2 settimane tra un gradino e il successivo (tranne il 2 per il tipo F, immediato); mai due gradini sullo stesso esercizio nella stessa settimana; ogni gradino ha il suo **motivo** scritto e il bottone di annullamento. Lo stallo del **principiante** (progressione lineare finita: dopo 3-9 mesi, riassunti su Rippetoe [R]) non è un guasto: è il passaggio al modello intermedio (gradino 8).

---

## 5. Audit delle regole esistenti

Giudizio: **Giusto** (fonte o pratica solida), **Giusto con riserva**, **Senza base** (nessuna fonte vista), **Bug** (comportamento diverso dalla dichiarazione, verificato), **Manca**. «B» = bug della gap analysis (`lacune-coach.md` cap. 18); «N» = nuovo, trovato qui. [V] = verificato con simulazione in Chromium (appendice B); [L] = letto nel codice, non simulato.

| # | Dove | Cosa fa oggi | Giudizio, motivo e prove | Proposta |
|---|---|---|---|---|
| 1 | `motore.js:15` `strutturaProgramma`, `:21` `fasiProgramma` (PRG-01; B21) | Principiante 8 settimane blocco 4 (3+1 x2); intermedio 12 settimane blocco 4 (3+1 x3); avanzato 12 settimane blocco 6 (5+1 x2); scarico a ogni `w % blocco === 0`; un solo modello settimanale ripetuto | **Senza base** per il principiante (25% di settimane di scarico; le scuole SS/SL/GZCLP non lo prevedono; i coach intervistati sì: Contrastata); **Giusto con riserva** per l'intermedio (3+1 è l'estremo basso della forchetta 4-7: 5,6 ± 2,3 settimane [R]); **Giusto** per l'avanzato (5+1). Il commento «ai principianti bastano blocchi corti (3+1)» non ha fonte. **Manca** la variazione dentro il blocco | MES-01 (5+1 intermedio, 7+1 principiante), MES-03 (rampa) |
| 2 | `ricette.js:386-394` `rirSett` + `regole-ricerca.js:62` `rirBersaglioBase` (RP) | Solo avanzati: RIR 3, 2, 2, 1, 0 e 4 in scarico, **uguale per tutti i tipi di esercizio** [V: formula] | **Giusto con riserva**: l'idea (rampa, RP) è in linea con le fonti pratiche; **Senza base** portare i **pesanti** (squat, stacco) a RIR 0-1 (Refalo 0,19; fatica, SFR: Convenzione) e **Manca** per principianti e intermedi (che hanno RIR fisso per tipo: isolamenti 0-1 già dalla settimana 1). Il testo della nota «3, 2, 1, 0» non coincide con 3, 2, 2, 1, 0 (blocco 6) | MES-02 |
| 3 | `regole-ricerca.js:71-81` `livelloFatica`, `DOSE_SCARICO` (CAR-03) | 'bassa' x0,65 serie e x0,95 carico; 'media' x0,5 e x0,9; 'alta' x0,3 e x0,9; `sets = max(2, round(setsBase x serie))`; 'alta' se sRPE medio ≥9 o prontezza <50 | **Giusto con riserva** (dose graduata sulla fatica: coerente con Delphi «individualizzare» [R]). **Bug N6** [C su `:114`]: con il minimo 2, 'media' e 'alta' danno le **stesse** serie per esercizi da 3-4 serie; un esercizio da 2 serie **non viene tagliato**: il «-70%» è solo testo. **Bug** B9 collegato: 'alta' scatta con tre «Dura» (sRPE 9). Nessun RIR indicato in scarico per i non avanzati | MES-05, MES-08 |
| 4 | `regole-ricerca.js:134-135`, `:107` `caricoProssimoBase` (scarico) | In scarico `peso = pesoUltimo x dose.carico`, dove `pesoUltimo` è quello dell'ultima seduta (qualunque) | **Bug N1** [V]: i carichi dello scarico si **compongono**: 60 → 54 → 48,5 → 43,5 kg (media: -10%, -19%, -27,5%) per un esercizio presente 3 volte nella settimana (full body x3: tutti i principianti); con 2 sedute -19% | MES-06 |
| 5 | `regole-ricerca.js:107-233` + `progressivo.js:27` `ultimeSessioni` | Dopo lo scarico `ultimeSessioni` restituisce la seduta di scarico come «ultima»: se completa, si aggiunge l'incremento a quel carico | **Bug N2** [V]: dopo lo scarico la progressione **riparte da 43,5 kg** (+1 ripetizione), non da 60: lo scarico taglia i carichi in modo **permanente** (-10% a -27%) e l'utente rifà in 2-5 settimane quello che ha tolto | MES-06 |
| 6 | `questionario-decisioni.js:153` `pesante`; `:186-199` fatica; `:221` (DEC-06; B9) | `pesante = srpe ≥9 \|\| arrivo==='stanco'`; 2 su 3 → scarico (serie x0,6, carico x0,9, **1 seduta**); 3 su 4 → proposta di togliere un allenamento | **Bug B9** [V]: «Dura (RPE 8-9)» vale 9, quindi due «Dura» su tre danno `scarico` mentre la prescrizione è RIR 0-1 (RPE 9-10) nelle ultime settimane. Il testo dice «serie -40%, carico -10%» (coincide con x0,6/x0,9). Reattivo **sensato** in principio (Delphi [R]), ma con segnale unico, dose di 1 seduta, nessuna distanza minima e **sovrapposto** allo scarico programmato | MES-07, MES-08 |
| 7 | `dolore-mattina.js:52-58` (CAR-10) | Lo scarico del coach applica x0,9 al carico **già progredito** e serie x0,6 su `setsBase`; `consumaAggiusti` lo scala di 1 per seduta | **Giusto con riserva**: dose in linea con la pratica (1.5); il x0,9 si applica a `r.weight` che può includere +incremento (carico di riferimento non salvato); nessuna ripresa definita | MES-06, MES-07 |
| 8 | `prontezza.js:80-87` (PRZ-04, Hooper) | 3 check-in consecutivi sotto 50 negli ultimi 7 giorni → scarico anticipato di 2 sedute | **Giusto con riserva**: più segnali soggettivi consecutivi sono il meglio che esista (Saw 2016 [R]); soglia 50 e «3 giorni» sono Convenzione; dipende dall'aver compilato il check | S1 di MES-07 |
| 9 | `repertorio.js:156-207` `strainSettimane` (STR-01, Foster) | strain = carico x monotonia; scatta se sale per due settimane di fila (`sw[0]>sw[1]>sw[2]`) e fatica media ≥8, senza scarico in corso | **Bug N5** [L]: dopo uno scarico `sw[2]` è la settimana di scarico (bassa) e le due settimane seguenti «salgono» per costruzione; con sRPE 'Dura'=9 la fatica ≥8 è quasi sempre vera: rischio di **un secondo scarico subito dopo il primo** | MES-10 |
| 10 | `regole-ricerca.js:222-228` (CAR-08) | 3 e1RM strettamente decrescenti → -10% e metà serie sul solo esercizio | **Giusto con riserva** (Dr. Muscle: Convenzione): nessuna tolleranza sul rumore (~3%) e conta anche le sedute di scarico | MES-10 |
| 11 | `repertorio.js:137-154` `eserciziFermi` (STA-01), `:186` (STA-02) | Soglie per livello (2 sedute, 4 settimane, 8 settimane); azioni +20%/-20% serie, variante, reset -10% | **Giusto** nelle soglie per livello (Rippetoe: il tempo di recupero cresce con l'esperienza [R]); **Bug N8** [L]: non esclude gli scarichi (con full body x3 la finestra di 3 sedute del principiante è tutta di scarico); **Manca** la diagnosi (fatica o stimolo) e lo scarico come gradino | Scala (sezione 4), MES-10, MES-19 |
| 12 | `esigenza.js:22-50` (ESI-02; B11, B12) | Ogni lunedì: aderenza <70% → -10%; RPE sopra il bersaglio ≥1 (≥3 serie) → -5%; prontezza <50 → -5%; serie facili → +5%; dolore → -10%; limiti 0,9-1,3 | **Giusto con riserva** nella struttura (autoregolazione dal feedback: RP, Helms [R]); **Bug N4** [L]: `rpeBersaglio(x.name)` è calcolato con la settimana **corrente**: per un avanzato al passaggio dall'ultima settimana di carico (RIR 0) allo scarico (RIR 4) l'RPE della settimana passata (9-10) risulta 4 punti sopra il bersaglio nuovo → **-5% spurio**. **Bug B11**: negli scarichi RPE bassi danno «serie facili» +5% | MES-10, MES-11 |
| 13 | `repertorio.js:381` `verdettoCiclo` (CIC-01), `:409` `nuovoCiclo` (CIC-02) | `esito`: 'aderenza' se <70%; 'buono' se quota di esercizi con e1RM +2% (**ultimo** contro **primo**) ≥50%; altrimenti 'stallo'; 'stallo' alterna massa/forza e rende «odiati temporanei» tutti gli isolamenti | **Bug N3** [V]: il programma finisce **sempre con uno scarico** (durata multipla del blocco): confronto con l'ultima seduta di scarico. Simulazione (intermedio, 1 seduta a settimana per alzata): +1,5% a settimana → **quota 0%, «stallo»**; +2% → «buono». Conseguenza: cambio di blocco e rotazione totale degli isolamenti **non motivati**. Inoltre 2% < rumore (~3%); e «si riparte dai carichi raggiunti» è falso (ripartono dai carichi di scarico, N2) | MES-12, MES-13 |
| 14 | `repertorio.js:200` (STA-03) | All'inizio di ogni blocco (non forza): propone di ruotare **tutti** gli isolamenti | **Giusto con riserva**: il **momento** (settimana 1) è quello giusto; la **portata** (tutti gli isolamenti) e la motivazione («angoli diversi») sono Convenzione e Baz-Valle 2019 [R] dice che non serve per crescere; il costo (progressione che riparte, INT-04) è reale | MES-14 |
| 15 | `prontezza.js:72-77` (PRZ-03; B18) | Prontezza ≥70 in carico: +1 serie su isolamenti (max 5) | **Senza base** (volume creep): «tutto normale» dà ~78 e quindi quasi ogni giorno; nessun tetto di volume lo vede | ritirare, sostituito da MES-03 |
| 16 | `regole-nuove.js:38-75` (RIC-01) | +1 serie nelle settimane centrali del blocco per i muscoli prioritari con prontezza ≥70 | **Giusto con riserva** (Convenzione RP + Pelland [R]); la forma è «a gobba» (non la prima né l'ultima): non è una rampa; esclude proprio l'ultima settimana, la più forte | MES-03 (priorità +1 dalla settimana 3) |
| 17 | `regole-ricerca.js:262-268` (CAR-14) | Nell'ultima settimana di carico l'ultima serie del primo isolamento va a cedimento | **Giusto con riserva** per la taratura (competenza nota RIR); dal punto di vista del blocco è la **settimana con più fatica accumulata**, dove la stima del RIR è peggiore (B10) | spostarla alla settimana 2-3 |
| 18 | `progressivo.js:46` `settimanaProgramma` | Il numero di settimana e la fase vengono dal **calendario** | **Manca** (N7): nessuna pausa o periodo difficile ferma il blocco: due settimane di ferie portano allo scarico senza aver caricato | MES-15 |
| 19 | `termina-e-cardio.js:97` `historyEntry` | La seduta salvata non porta la fase (carico/scarico), né la settimana, né il RIR bersaglio | **Manca** (N9): per ricostruire la fase serve il programma, che viene **sostituito** a ogni nuovo ciclo | MES-09 |
| 20 | `regole-ricerca.js:135`, `agente-consigli.js:91` (testi) | «per recuperare e ripartire più forte», «non è tempo perso, serve a ripartire più forte» | **Senza base** (N10): gli RCT visti non mostrano più crescita né più forza dopo lo scarico; uno mostra meno forza delle gambe [R] | riscrivere il testo (MES-05) |

**Riepilogo:** giusti nella sostanza: dose graduata sulla fatica (CAR-03, in principio), soglie di fermo per livello (STA-01), rientro (CAR-04, RIC-05), reattivo come idea, prontezza a più voci. Senza base: scarico ogni 4 settimane per i principianti, «ripartire più forte», +1 serie a prontezza ≥70, rotazione di tutti gli isolamenti, RIR 0-1 sui pesanti. Mancano: rampa di serie, RIR per livello e per tipo, riferimento di carico e ripresa, etichetta di fase, orologio del blocco, passaggio tra blocchi, scala degli stalli con diagnosi. Bug veri: N1, N2, N3, B9, N4 (con N5, N8 di rischio).

---
## 6. Regole proposte

Tutte **spegnibili** (`REGOLE_SPEGNIBILI` in `js/coach/parametri.js`, `regolaAttiva('MES-xx')`), attive solo con `coachAttivo()`, con **soglie e fattori in `COACH_PARAMETRI`**, motivo scritto in italiano nella nota dell'esercizio o nel messaggio (frasi nuove anche in `js/lingue/en.js`, `es.js`, `de.js`), **annullabili** dove cambiano il piano (`applicaDecisioni` / `conAnnulla`) e **non attive** (o con effetto più prudente) per modalità prudente/PAR-Q, over 65, dolore e principianti dove indicato. **Nessuna è stata scritta nel codice.** Un file nuovo richiede la riga in `index.html`, `npm run sw` e l'aumento a mano di `CACHE_NAME`; il codice MES va aggiunto al cap. 19 di `docs/coach-mappa-regole.md` prima di `npm run catalogo`.

### A. Struttura del blocco

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **MES-01** struttura per livello | Alla creazione del programma | `strutturaProgramma`: principiante `{settimane: 8, blocco: 8}` (scarico solo alla settimana 8), intermedio `{12, 6}` (5+1 x2), avanzato `{12, 6}` (invariato); parametri `bloccoPrincipiante/Intermedio/Avanzato`. Settimana 8 del principiante saltabile (3.6.2) | «Il programma è a blocchi: carichi per 5 settimane e poi una settimana più leggera. Chi comincia scarica solo alla fine, e solo se serve.» | Convenzione + Contrastata (Bell 2022, 2024; scuole SS/SL [R]) | Più settimane di fila per l'intermedio (5 invece di 3) e per il principiante (7): compensano i segnali di MES-07, il RIR 3-4 iniziale e INT-04. Non cambia per prudente/over 65 | `js/coach/programma/motore.js:15-25`; `parametri.js`; `ricette.js:433` (`blocco`); `js/ui/onboarding-risultato.js:9` (elenco scarichi) |
| **MES-02** rampa di RIR per livello e tipo | Programma con rampa (principiante, intermedio, avanzato; non prudente/over 65 che restano a 3-4) | Sostituisce `p.rirSett` (array unico) con tabella per tipo e livello (3.4), bersaglio `[r, r+1]`; pavimento 1 sui pesanti (0 solo su isolamenti/macchine stabili, ultima settimana, prontezza ≥60); il -1 dell'esigenza ≥1,15 solo sopra il pavimento del livello; RIR ≥4 mostrato in scarico | «Questa settimana lascia 3 ripetizioni in riserva (poi 2, poi 1): ti avvicini al limite piano piano. Sui fondamentali pesanti non scendo sotto 1.» | Convenzione + Moderata (errore del RIR e 0,19 [R]; Robinson 2024 [R]) | Stima del RIR ±1: partenza a 3 e pavimenti; per i principianti nessun cedimento (B12). **Sostituisce IPE-05 e PCO-02** | `ricette.js:386-394`; `regole-ricerca.js:49-69` (`RIR_TIPO`, `rirBersaglio`, `rirBersaglioBase`); `motore.js` |
| **MES-03** rampa di serie nel blocco | Settimana di carico, non principiante, non prudente/over 65/PAR-Q, `setsBase` >2 | `serie = max(2, round(setsBase x f[w]))` (3.3), mai sopra il piano; prioritari +1 dalla settimana 3 (dalla 2 con prontezza media ≥70), massimo `setsBase+1` e 5; la rampa si ferma se il muscolo scenderebbe sotto il minimo del livello (PRG-25). **Ritira PRZ-03** e la forma «centrale» di RIC-01 | «Il volume sale un po' alla volta nel blocco: questa settimana 3 serie invece di 4, poi si arriva al pieno. Parti più leggero e la dolenzia resta sotto controllo.» | Convenzione + Contrastata (RP; a volume pari la periodizzazione non cambia la massa [R]) | Meno volume totale (circa -9% / -12%: costo stimato di qualche decimo di punto di muscolo [C]); nessuna rampa per i prudenti. **Sostituisce IPE-08** | `js/coach/regole-nuove.js:38-75` (wrapper `caricoProssimo`, `settimanaCentraleBlocco`); `prontezza.js:72-77`; `parametri.js` (`rampaSerie`) |
| **MES-04** onda di carico per la forza (opzionale, **spenta di default**) | Obiettivo forza o blocco `forza`; intermedio/avanzato; esercizi 'pesante' di bilanciere | Ripetizioni 5, 5, 4, 3, 3 con RIR 3, 2, 2, 2, 1; carico = massimale stimato x %Epley(ripetizioni+RIR) (tabella 3.5); l'RPE registrato lo corregge (CAR-06); scarico: 2 serie da 5 a -10%; massimale dagli ultimi dati **fuori scarico** | «Nel blocco di forza le ripetizioni scendono (5, 5, 4, 3, 3) e il carico sale piano: la settimana 5 è la più pesante.» | Convenzione (5/3/1, Candito, Helms [M]) + Moderata (periodizzare aiuta la forza: Moesgaard 2022 [R]) | Richiede conversione carico ↔ ripetizioni (B7) e chiave di progressione per giorno (B8): **non attivare** prima di `caricoDaE1rm` (nota forza). Mai 1RM per principianti, over 65, PAR-Q | `regole-ricerca.js:107` (`caricoProssimoBase`), `ricette.js` (schema), `metodi-momenti.js` |

### B. Scarico

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **MES-05** scarico programmato: dose e disegno | Settimana di scarico del programma | Dose per `livelloFatica`: 'bassa' serie x0,65 e carico x0,95; 'media' x0,50 e x0,90; 'alta' x0,40 e x0,90 (min 2 per esercizi ≥3 serie); esercizi da 2 serie: si tengono e si toglie 1 esercizio ogni 3 (isolamenti finali); RIR ≥3-4 / ≥4 / ≥5 **mostrato**; stessa frequenza e stessi esercizi; **riscrive il testo** | «Settimana di scarico: meno serie e carichi un po' più leggeri, sempre lontano dal limite. Serve a scaricare la fatica e a prevenire i fastidi; non è dimostrato che ti faccia crescere di più, ma non perdi forza.» | Convenzione (dosi: Wendler, RP, preparatori [R/M]); Moderata per «mai stop completo» (RCT 2024 [R]) | Mai stop totale. 'Alta' solo con prontezza <50 o sRPE medio ≥9,5. Prudente/over 65: 'media' invariata. **Sostituisce `DOSE_SCARICO`** | `regole-ricerca.js:81` (`DOSE_SCARICO`), `:111-114`, `:134-135`; `agente-consigli.js:91`; `js/lingue/*.js` |
| **MES-06** carico di riferimento e ripresa | Scarico (programmato o reattivo) e **prima seduta dopo** | `rif` = carico massimo dell'ultima seduta **non di scarico** (entro 28 giorni); in scarico `rif x dose.carico`, uguale in tutte le sedute; `ultimeSessioni` per la progressione salta gli scarichi; ripresa al 100% di `rif` con RIR +1 (95% se prontezza media dei 3 giorni <60 o scarico 'alta'/reattivo con segnale persistente; sempre 95% per prudenti/over 65); poi regole normali | «Dopo lo scarico riparti dal carico che avevi prima: la settimana leggera non ti toglie nulla.» | Convenzione + Moderata (1-2 settimane ridotte o ferme mantengono la forza: PMID 28328712 [R]) | Riprendere al 100% con fatica non risolta: protezione 95% e RIR +1. **Corregge N1 e N2** (simulazione) | `regole-ricerca.js:107-135`; `carichi/progressivo.js:27` (`ultimeSessioni` con filtro per fase); `dolore-mattina.js:52-58` |
| **MES-07** scarico reattivo unico | Con segnali S1-S7 (3.7): ≥2 segnali distinti con almeno uno tra S1/S2/S3, oppure forte; non nelle prime 2 settimane del blocco; ≥14 giorni dall'ultimo scarico; max 1 ogni 3 settimane; se manca ≤7 giorni al programmato si anticipa quello | Una funzione `segnaliFatica()` → `scaricoReattivo()` che **sostituisce** DEC-06 (`pesanti3`), PRZ-04 e STR-01 come cause: serie x0,60 (min 2), carico x0,90 su `rif`, RIR ≥4, per 3 sedute o 7 giorni (min 2 sedute); se scatta dopo ≥3 settimane di carico vale come scarico del blocco, altrimenti la rampa riprende dalla settimana *k-1* (min 2); bottone «Non ora» | «Prontezza bassa e forza in calo da qualche giorno: una settimana più leggera adesso rende più che insistere. Dopo si riparte dai tuoi carichi.» | Convenzione + Contrastata (individualizzare: Delphi 2023; nessuna soglia validata nei pesi: Saw 2016, revisione 2019 [R]) | Falsi positivi: più segnali, protezioni e «Non ora». Il dolore resta in DEC/DOL (scarico locale). Non per principianti nelle prime 3 settimane salvo S1 forte | nuovo `js/coach/scarico-reattivo.js` (o in `regole-nuove.js`); `questionario-decisioni.js:186-199,221`; `prontezza.js:80-87`; `repertorio.js:156-207`; `dolore-mattina.js:52`; `parametri.js` |
| **MES-08** correzione di «Dura» e di `livelloFatica` | Questionario di fine seduta e calcolo della dose | `pesante = srpe===10 \|\| (srpe>=9 && arrivo==='stanco')`; 'alta' se sRPE medio ≥9,5 o prontezza media <50; nell'**ultima settimana di carico** niente scarico reattivo (è già previsto) | «Seduta dura ma nella norma: nelle ultime settimane del blocco è previsto arrivare vicino al limite. Ti propongo di scaricare solo se sei anche stanco o la forza cala.» | Convenzione (coerenza con la prescrizione RIR 0-1; B9) | Meno scarichi reattivi da questa sola via: compensato da MES-07 | `questionario-decisioni.js:153,186-199`; `regole-ricerca.js:71-79` |

### C. Igiene dei dati: lo scarico non è un dato di forma

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **MES-09** etichetta di fase sulla seduta | A ogni seduta salvata con programma attivo | Aggiunge alla voce di storico `fase` ('carico' / 'scarico' / 'scarico-reattivo'), `sett` (numero), `blocco`, `rirBers` (RIR bersaglio per esercizio); per le voci vecchie `faseDellaSeduta(h)` la ricava da `p.inizio` e dalla data finché il programma c'è | (interno, nessun testo) | n.d. (infrastruttura) | Pochi byte per seduta; retrocompatibile. **Prerequisito** di MES-06, 10, 11, 12 | `js/ui/allenamento/termina-e-cardio.js:97` (`historyEntry`); helper in `regole-ricerca.js` |
| **MES-10** lo scarico fuori dalle analisi | Ogni calcolo che usa lo storico | Esclude le sedute `fase` di scarico da: STA-01 (`eserciziFermi`, finestra e prima seduta dopo), CAR-08 (soglia **-3%** al posto di «strettamente in calo»), STR-01 (settimana di scarico non è base; nessun nuovo scarico entro 14 giorni), `ultimeSessioni` (MES-06); in scarico `aggiornaEsigenza` non cambia il valore; ADE-01 conta metà le sedute saltate in scarico | (interno; se serve: «La settimana di scarico non conta come stallo né come calo») | Convenzione + ragionamento (rumore del RIR ~3% [R/C]) | Storico vecchio senza etichetta: fallback `faseDellaSeduta`. **Corregge N5, N8, B11** | `repertorio.js:137,156`; `regole-ricerca.js:222`; `esigenza.js:22-50`; `progressivo.js:27` |
| **MES-11** esigenza con il bersaglio della seduta | Aggiornamento settimanale dell'esigenza (lunedì) | `aggiornaEsigenza` calcola lo scarto con il `rirBers` **salvato** nella seduta (MES-09) e non con `rpeBersaglio()` di adesso; la prima settimana dopo uno scarico non conta «RPE sopra il bersaglio» | (interno) | Convenzione (correzione di un errore) | Con storico senza `rirBers`: si usa il bersaglio della fase ricostruita. **Corregge N4** | `esigenza.js:22-50`; `regole-ricerca.js:83` (`rpeBersaglio`) |
| **MES-12** verdetto di ciclo senza scarichi | Fine programma (`htmlFineCiclo`, `nuovoCiclo`) | `verdettoCiclo` confronta, per esercizio, la media delle 3 migliori sedute di **carico** degli ultimi 2 blocchi con quella delle 3 prime; 'buono' se la quota con **+3%** ≥50% (soglia sopra il rumore); 'stallo' solo con quota <50% **e** aderenza ≥70%; l'alternanza massa/forza e la rotazione totale degli isolamenti scattano solo allora | «Ciclo concluso: la forza è salita sul 60% degli esercizi (non conto la settimana di scarico).» | Convenzione + ragionamento ([V]: +1,5% a settimana dava «stallo») | Meno cambi di blocco non motivati. Con meno di 2 esercizi misurabili: 'buono' per default. **Corregge N3** | `repertorio.js:381-407` |

### D. Tra i blocchi, pause, specializzazione

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **MES-13** passaggio di blocco (carry-over) | Creazione del ciclo successivo e inizio di ogni blocco | Regole di 3.9: carichi dalla settimana 1 con massimale stimato fuori scarico; `picco(n+1) = picco(n) + 1` per muscolo solo con verdetto 'buono', aderenza ≥80%, prontezza media ≥60 e nessun reattivo oltre il programmato; invariato con aderenza 70-80% o 1 reattivo; **-10/-15%** con ≥2 reattivi o fatica 'alta'; RIR e rampa dalla settimana 1; salva `profilo.mesoStato = {picco, e1rm, verdetto}`; mai due scarichi di fila | «Nuovo blocco: parti più leggero e rifai la rampa; il volume massimo sale di una serie perché lo scorso blocco è andato bene.» | Convenzione (RP: MEV che sale tra i blocchi [R]) | Il tetto del livello (PRG-25) e le 11 serie per seduta restano; prudenti/over 65: nessun aumento | `repertorio.js:409` (`nuovoCiclo`); `ricette.js` (volume); `profilo` |
| **MES-14** rotazione al confine del blocco | Settimana 1 di un blocco (sostituisce STA-03 e **PCO-05**) | Ruota **un terzo - metà** degli accessori, **solo** se: accessorio fermo (STA-01), utente che ama la varietà, fastidio ricorrente, cambio di fase; mai i fondamentali (2-3 blocchi) né gli esercizi graditi; sostituto con stesso muscolo e schema, stessa posizione se possibile; carico stimato dal precedente; contatori di stallo azzerati per i ruotati | «Cambio qualche esercizio complementare per stimolare i muscoli da angoli diversi; i fondamentali restano uguali così i tuoi progressi si misurano. Variare non fa crescere di più, ma aiuta a non annoiarsi.» | Moderata (Baz-Valle 2019, n=21 [R]); Convenzione per il resto | Costo «prima volta» (INT-04): settimana 1 è la più leggera. Rispetta «Cambiare spesso» del profilo | `repertorio.js:200` (STA-03), `azioniCoach`, `bloccoCorrente` |
| **MES-15** pausa lunga e orologio del blocco | Dall'apertura dell'app o a fine seduta, in base ai giorni dall'ultima seduta | Tabella 3.12.3: ≤6 giorni nulla; 7-13 giorni non avanza la rampa; 14-27 giorni il blocco riparte dalla settimana 1 e **si sposta il calendario** (`p.inizio` e giorni del piano) delle settimane saltate; ≥28 giorni nuovo blocco con CAR-04; ferie pianificate ≤14 giorni valgono come scarico; con un «momento» attivo l'orologio si ferma | «Sei stato fermo 3 settimane: riparto dalla settimana 1 del blocco, più leggero, e il calendario scorre di conseguenza. Nessuna fretta.» | Convenzione + Moderata (detraining [R]) | Spostare il calendario tocca `loadCal`/`progKey`: annullabile; con SAL-01 attivo non sovrapporre | `progressivo.js:46` (`settimanaProgramma`); `repertorio.js` (SAL-01); `regole-nuove.js` (RIC-05); `metodi-momenti.js:113` |
| **MES-16** specializzazione e mantenimento | Avanzato con priorità (max 2 muscoli) o periodo dichiarato di poco tempo | Specializzazione 6-8 settimane: prioritari picco x1,25-1,5 (tetti), altri **≥1/3 del volume e ≥4-6 serie frazionarie**, carico mantenuto, RIR 2-3; poi rientro nella rampa normale. «Poco tempo»: `max(4, 1/3 del picco)`, ≥1 seduta a settimana per muscolo, carico mantenuto | «Per 6 settimane il petto ha più lavoro; gli altri muscoli restano in mantenimento: con meno serie ma stessi carichi non perdi quello che hai costruito.» | Convenzione + Moderata (da verificare) (Bickel 2011, Spiering 2021 [M]); Helms [R] | Muscoli in mantenimento calano un po': pavimento 4-6 serie e carico mantenuto. **Allineata a IPE-13** | `ricette.js` (PRG-29 `specializza`); `repertorio.js:409` (`cicliSpec`) |
| **MES-17** fase di taglio | Profilo con fase `deficit` (o obiettivo dimagrimento in deficit) | Picco x0,85-0,90; pavimento RIR 2 sui pesanti, 1 sul resto; carichi **mantenuti**; S1 sensibile (<55); blocco 4+1 per avanzati oltre 8 settimane di deficit; nessuna nuova specializzazione | «In deficit il recupero è più lento: tengo i carichi ma riduco un poco le serie e resto più lontano dal limite, per non perdere muscolo.» | Convenzione + Moderata (da verificare) (Murphy e Koehler 2022, Helms 2015 [M]) | Informazione, non prescrizione dietetica (cap. 14); non scatta con PAR-Q positivo senza consenso | `ricette.js` (volume), `repertorio.js:222` (`fase`), `parametri.js` |
| **MES-18** picco per gara o test (**spenta**) | Data di gara o di test dichiarata, avanzato | Ultimi 7-14 giorni: serie -40/-60%, intensità e frequenza mantenute, ultime singole 4-7 giorni prima; nessun 1RM per non esperti | «Ultima settimana: meno serie, stesso peso: arrivi fresco al giorno del test.» | Convenzione (da verificare: Bosquet 2007 [M]) | Nessun campo data oggi; allineare a TAP-01 (nota forza) | `motore.js:21` (`fasiProgramma`); onboarding (campo nuovo) |
| **MES-19** scala degli stalli con diagnosi | STA-01 segnala «fermo» | Classifica F/S/T (sezione 4) e propone **un solo gradino** (cadenza di 2 settimane); il tipo F porta allo scarico (MES-07) prima di +20% di serie | «Il peso è fermo e ti vedo stanco: prima una settimana più leggera, poi si vede. Aggiungere serie ora peggiorerebbe.» | Convenzione (GZCLP, Rippetoe, Dr. Muscle [R]) | Non scatta per dolore (DEC), principianti sui primi 2 stalli (CAR-07/09) | `repertorio.js:137,186` (`eserciziFermi`, `azioniCoach`); **si somma a PCO-01** |

### Coordinamento con le altre note del repo

| Mia | Altra nota | Rapporto |
|---|---|---|
| MES-01 | IPE-07 | Allineata (stessa struttura 5+1 e scarico del principiante solo alla fine); in più: la settimana 8 saltabile e la condizione di dose |
| MES-02 | IPE-05, PCO-02 | **Sostituisce** (stessa idea; tabella per tipo e pavimenti più precisi): implementare una sola |
| MES-03 | IPE-08, RIC-01, PRZ-03 | **Sostituisce** IPE-08 (fattori diversi: 0,75/0,70 → 1,0); **ritira** PRZ-03 e la forma «centrale» di RIC-01 |
| MES-04 | PGR-01, AUT-01 | Si somma; dipende da `caricoDaE1rm` e dalle scale S1/S2/S3 |
| MES-05, 06 | CAR-03; TAP-01 | Sostituisce `DOSE_SCARICO`; TAP-01 resta spenta (MES-18) |
| MES-07 | CST-07..09, PRZ-04 | CST-07 cambia il punteggio di prontezza: MES-07 lo usa come S1; CST-09 (riposo 1 settimana + medico) resta la via per prontezza bassa persistente |
| MES-13, 14 | PCO-05, STA-03 | MES-14 **sostituisce** PCO-05 come regola di confine del blocco |
| MES-15 | REC-08, RIC-05, CAR-04 | Si somma (REC-08 riguarda il rientro da fastidio) |
| MES-16 | IPE-13 | Allineata; aggiunge i numeri del mantenimento |
| MES-19 | PCO-01, STA-02 | Si somma: PCO-01 è il gradino 4 della scala |

### Ordine di implementazione consigliato

1. **Correzioni senza rischio e ad alto valore** (bug verificati): MES-09 (etichetta), MES-06 (riferimento e ripresa: N1, N2), MES-12 (verdetto: N3), MES-10/11 (scarichi fuori dalle analisi: N4, N5, N8, B11), MES-08 (B9).
2. **Scarico**: MES-05 (dose e testi), MES-07 (reattivo unico).
3. **Struttura**: MES-01, MES-02, MES-03 (nello stesso rilascio, perché la rampa e il blocco 5+1 si tengono).
4. **Tra i blocchi**: MES-13, MES-14, MES-15, MES-19.
5. **Opzionali**: MES-16, MES-17, MES-04, MES-18 (spente o legate a campi nuovi).

### Test suggeriti (modello: `tests/browser/regole-nuove.js`)

- **MES-06:** profilo intermedio, programma con `fasi` e settimana 4 'scarico', storico `60 kg x 8 x 4` ok; chiamare `caricoProssimo` tre volte salvando ogni seduta: pesi uguali (54, 54, 54) e, in settimana 5, `weight === 60` (oggi: 54 → 48,5 → 43,5 → 43,5).
- **MES-12:** 12 settimane con 1 seduta a settimana per alzata, +1,5% a settimana nelle settimane di carico, -10% in scarico: `verdettoCiclo().esito === 'buono'` (oggi `'stallo'`, quota 0%).
- **MES-08:** `decisioniCoach` con due «Dura» (srpe 9, arrivo 'normale') su tre: nessun `scarico`; con due «Dura» e 'stanco': sì.
- **MES-07:** casi per ciascun segnale e per le protezioni (settimana 2 del blocco, 10 giorni dopo uno scarico, scarico programmato entro 7 giorni).
- **MES-03 e MES-02:** tabelle 3.3 e 3.4 come valori attesi per `setsBase` 3-6 e per le 5 settimane; pavimenti 1 sui pesanti; prudenti/over 65 invariati.

---

## 7. Domande aperte

1. **Testi originali non letti.** Bell 2023 (Delphi): enunciati di consenso su cause, durata, tipo di riduzione (volume/intensità/frequenza) e frequenza dello scarico; Bell 2024 (sondaggio): percentuali per tipo di riduzione; Bell 2022 (interviste). Servono per fissare con una fonte la dose di MES-05 e per sapere se «ogni 4-6 settimane» ha un consenso.
2. **RCT sullo scarico.** PeerJ 2024 (n, età, allenati o no, cosa significava «scarico»: stop completo?) e PMC13031491 (2026): esiste uno studio su **allenati con volume alto**? Il -10% di carico (CAR-03) ha una base diretta? Non vista.
3. **Rampa di volume contro volume costante** a pari totale, e **RIR fisso contro RIR decrescente**: nessuna RCT trovata né cercata. È la domanda principale per MES-02/03: da cercare («progressive volume versus constant volume mesocycle hypertrophy trained», «RIR progression within mesocycle»).
4. **Taper nei pesi.** Bosquet 2007 (meta-analisi), Mujika, meta-analisi sul taper nella forza, Pritchard sui powerlifter: non verificati. Serve per MES-18 e per distinguere taper e scarico con una fonte.
5. **Soglie numeriche dei segnali** (e1RM -5%, RPE +1, sonno e voglia 4 giorni su 7): nessuna validata nei pesi. Servono dati reali: una telemetria locale anonima (frequenza dei segnali, esito dopo lo scarico) permetterebbe di tararle.
6. **Mantenimento e specializzazione.** Bickel 2011, Spiering 2021, Graves 1988: testo e dati (volume e frequenza minimi per muscolo grande e piccolo). Nessuna RCT sulla specializzazione come strategia di programma.
7. **Taglio calorico.** Murphy e Koehler 2022, Helms 2015; interazione con lo scarico; diet break (MATADOR, ICECAP: «non cercati» in `ricerca-cardio-nutrizione.md`).
8. **Posizioni dei coach con testo originale.** Israetel/RP («deload», «mesocycle»), Helms (3DMJ), Nuckols/SBS («do you need a deload»), Tuchscherer/RTS (fatigue percent, picco), Beardsley (SFR? scarico?), Zourdos, Baraki/Barbell Medicine, Wendler (7th week). Tutti marcati «da verificare»: servono podcast e articoli, non i riassunti di terzi.
9. **Donne e over 65.** Durata del blocco e necessità dello scarico nei due gruppi: **non ricercato** (le meta-analisi su periodizzazione e scarico sono su giovani maschi). Colenso-Semple 2023 (nessuna programmazione per fasi del ciclo) è già nel repo [R].
10. **Scelte di prodotto.** (a) La rampa e la settimana 8 saltabile vanno **mostrate** (e spiegate) all'utente? (b) Il «consolidamento» del principiante è una scelta dell'utente? (c) Rinominare «Dura (RPE 8-9)» in «Dura (RPE 8)»? (d) Un campo «data di gara/test» in onboarding per MES-18? (e) Vale la pena un indicatore «settimana k di n» con rampa nella Home?
11. **Velocità.** L'app non misura la velocità del bilanciere: la perdita di velocità (Pareja-Blanco e altri) è un'alternativa all'RPE per scaricare, **non valutata**.

---

## 8. Limiti onesti

- **Nessuna ricerca web riuscita in questa nota.** Le righe [R] sono fonti viste da altri agenti nei risultati di WebSearch (titolo, snippet, PMID): **non le ho ricontrollate**; alcune cifre sono da snippet e lo dicono. Le righe [M] vengono dalla memoria del modello: autore e anno solo dove li ricordo con sicurezza (Rhea 2002, Banister 1975, Chiu e Barnes 2003, Bosquet 2007, Bickel 2011, Ogasawara 2013, Spiering 2021, Murphy e Koehler 2022, Helms 2015), **nessun PMID, DOI o percentuale non vista**; possono contenere errori e vanno verificate prima di diventare regola. Nessuna regola di questa nota poggia **solo** su [M].
- **Le soglie di MES-07 e i fattori delle rampe sono Convenzione dichiarata**: nessuna fonte vista le fissa; sono disegnate per essere prudenti, spiegabili e spegnibili.
- **La rampa di serie e di RIR non è dimostrata come necessaria per crescere**: a volume pari la periodizzazione non cambia la massa [R]; la rampa è una scelta di gestione della fatica.
- **Lo scarico non è dimostrato né come potenziante né come necessario** (due RCT su giovani, uno su non allenati, con 8-9 settimane); la pratica dei coach (sondaggio e Delphi) è un'altra cosa dall'effetto. Il coach lo dice nei testi.
- **Popolazione:** le fonti su periodizzazione e scarico riguardano giovani adulti sani, in prevalenza uomini; per donne, over 65 e chi si allena a casa il coach resta più prudente (ESI-03, prudente).
- **Simulazioni:** tre (S1-S3), in Chromium locale con `index.html` non modificato; coprono N1, N2, N3 e B9. N4, N5, N6, N8 sono da lettura/aritmetica del codice.
- **Strumenti:** solo WebSearch (WebFetch, curl e browser bloccati: `rete.md`); nessun testo intero letto.

---

## Appendice A. Query pronte per una sessione con il tetto alzato

Pattern della skill: `allowed_domains ["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","link.springer.com"]` per titoli e PMID; un sito esperto per gli articoli; anno corrente nelle query.

**Periodizzazione (6)**
1. `periodization resistance training meta-analysis strength hypertrophy trained untrained 2025`
2. `Williams 2017 periodized versus non-periodized resistance training strength meta-analysis`
3. `Moesgaard periodization volume-equated resistance training meta-analysis 2022`
4. `Harries linear versus undulating periodization strength meta-analysis`
5. `Grgic linear daily undulating periodization muscle hypertrophy meta-analysis`
6. `block periodization versus undulating periodization trained strength randomized`

**Volume e rampa nel mesociclo (5)**
7. `progressive volume increase mesocycle hypertrophy randomized trained men constant volume`
8. `Mesocycle Progression in Hypertrophy: Volume Versus Intensity Israetel Strength Conditioning Journal`
9. `weekly set volume progression across weeks versus fixed volume muscle growth`
10. `resistance training volume landmarks MEV MRV evidence critique`
11. `Scarpelli previous resistance training volume hypertrophy trained individuals`

**RIR e intensità (4)**
12. `repetitions in reserve progression across weeks mesocycle hypertrophy randomized`
13. `Robinson 2024 proximity to failure meta-regression strength hypertrophy`
14. `Zourdos RIR-based RPE scale resistance training`
15. `Helms application of RIR-based RPE scale resistance training Strength Conditioning Journal`

**Fatica, supercompensazione, overreaching (5)**
16. `fitness-fatigue model resistance training Chiu Barnes revisited`
17. `Banister impulse-response model strength training application limitations`
18. `functional overreaching resistance training hypertrophy strength randomized`
19. `overreaching resistance training systematic review markers performance`
20. `supercompensation resistance training deload evidence`

**Scarico (8)**
21. `deload Bell 2023 Delphi consensus strength physique sports`
22. `deloading practices survey strength physique athletes Bell 2024 Sports Medicine Open`
23. `coaches perceptions deloading strength physique sports Frontiers 2022 Bell`
24. `one-week deload period supervised resistance training muscular adaptations PeerJ 2024`
25. `deload week randomized trained hypertrophy strength 2025 2026`
26. `deload reduce volume versus intensity versus frequency comparison`
27. `reactive versus planned deload autoregulation resistance training`
28. `Stronger By Science do you need to deload` (`allowed_domains ["strongerbyscience.com"]`)

**Taper, pausa, ritorno (5)**
29. `Bosquet tapering meta-analysis performance volume reduction intensity frequency`
30. `tapering strength powerlifters Pritchard practices survey`
31. `strength retention 2 weeks detraining trained men` / `4 weeks resistance training cessation trained`
32. `Ogasawara periodic strength training 3-week break hypertrophy`
33. `retraining after detraining muscle memory trained strength recovery weeks`

**Mantenimento, specializzazione, taglio (5)**
34. `Bickel exercise dosing retain resistance training adaptations young older adults`
35. `Spiering minimum dose exercise preserve strength endurance maintenance`
36. `muscle specialization block hypertrophy lagging muscle volume increase randomized`
37. `energy deficit resistance training lean mass retention meta-analysis Murphy Koehler`
38. `Helms recommendations natural bodybuilding contest preparation resistance training`

**Variazione degli esercizi e stalli (3)**
39. `exercise variation hypertrophy strength systematic review Kassiano`
40. `plateau resistance training strategies evidence volume change exercise swap deload`
41. `Rippetoe limits of linear progression intermediate transition weekly progression`

**Segnali di fatica (3)**
42. `session RPE drift same load fatigue marker resistance training`
43. `subjective wellbeing questionnaires overreaching resistance training sensitivity`
44. `rep performance decline velocity loss fatigue monitoring resistance training`

**Coach (testi/podcast; `allowed_domains` dei rispettivi siti)** 45. `Renaissance Periodization deload when how` ; 46. `3DMJ Helms deload autoregulated` ; 47. `Reactive Training Systems deload RPE fatigue percent` ; 48. `Barbell Medicine deload recovery weeks`

---

## Appendice B. Simulazioni eseguite (riproducibili)

Procedura: Chromium locale (`/opt/pw-browsers/chromium`, `playwright-core` del repo), `index.html` aperto da `file://` con `tz_mode=toji`, `tz_consenso=si`; stato impostato via `localStorage` come in `tests/browser/regole-nuove.js` (`PROFILE_KEY()`, `progKey()`, `saveHistory`, `saveCal`); poi chiamate dirette alle funzioni dell'app. Nessun file del repo è stato modificato (gli script stanno nella scratchpad di sessione, non versionati).

**S1: scarico composto e ripresa (N1, N2).** Profilo intermedio; programma di 8 settimane (`fasi` = carico x3, scarico, carico x3, scarico), settimana corrente 4 (scarico); storico: una seduta di carico `60 kg x 8 x 4` (tutte fatte, RPE 8). Si chiama `caricoProssimo('Panca Piana Bilanciere', 60, 8, 4)`, si salva la seduta fatta con quel carico e si richiama, tre volte.

| Seduta nella settimana di scarico | Peso prescritto | Serie | Rispetto a 60 kg |
|---|---|---|---|
| 1 | 54 | 2 | -10% |
| 2 | 48,5 | 2 | -19% |
| 3 | 43,5 | 2 | -27,5% |
| 1ª seduta della settimana 5 (carico) | **43,5**, +1 ripetizione (9) | 4 | -27,5%: «+2,5 kg sarebbe un salto del 6%: prima una ripetizione in più» |

**S2: verdetto di ciclo con scarico finale (N3).** Intermedio, 12 settimane (`blocco` 4), una seduta a settimana per alzata (panca 60 kg, rematore 65 kg), 4 serie da 8 in carico, 2 in scarico, scarico a -10% del carico dell'ultima settimana di carico, calendario completato (aderenza 100%).

| Progressione nelle settimane di carico | `verdettoCiclo()` |
|---|---|
| +1,0% a settimana | quota 0%, **stallo** |
| +1,5% a settimana | quota 0%, **stallo** |
| +2,0% a settimana | quota 100%, buono |

**S3: DEC-06 (B9).** `decisioniCoach` con tre sedute `srpe 9`, `arrivo normale`, `carichi giusti`, senza dolore: due «Dura» su tre → `['scarico']`; una sola «Dura» → `['ok']`.

**Letti ma non simulati:** N4 (`esigenza.js:22-50` + `rirBersaglioBase`), N5 (`repertorio.js:206`), N6 (aritmetica su `regole-ricerca.js:114` e `DOSE_SCARICO`: serie con minimo 2: 'media' 3→2, 4→2, 5→3; 'alta' 3→2, 4→2, 5→2, 6→2; 2 serie → 2), N8 (`repertorio.js:137-154`), N9 (`termina-e-cardio.js:97`).
