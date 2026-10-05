# Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea

Ambito: area **informativa e prudente** del coach di 3in: cardio e passi, compatibilità cardio-pesi, proteine ed energia (ritmo di calo e di aumento), lettura della BIA e del peso, salvaguardie contro i disturbi alimentari. Tocca i codici esistenti **COR** (01-03), **BIA** (01-03), **INT**, il generatore (`schemeFor('dimagrimento')`, flag `cardio` di `schemaMisto`), il registro cardio (`termina-e-cardio.js`) e la scheda Peso (`progressi/peso.js`). Codici proposti nuovi: **AER**, **NUT**, **PES**, **DCA** (controllati con grep su `docs/`, `js/`, `tests/`: liberi il 2026-10-05; ricontrollare al momento di implementare).

Data della ricerca: **2026-10-05**. Metodo: `ricerca-fitness` (solo WebSearch; nessuna pagina aperta per intero: ciò che si legge qui è il **riassunto dei risultati**, non il full text). La «forza» è quella della skill: **Solida / Moderata / Convenzione**, con bandiera **Contrastata** quando fonti di pari livello non concordano.

> **AVVISO SULLA COPERTURA (leggere prima).** Il budget di WebSearch della sessione (200 chiamate, condiviso) si è esaurito dopo **22 ricerche riuscite** di questo lavoro (richieste: almeno 30; due ulteriori tentativi sono stati rifiutati dallo strumento e non sono stati aggirati). Quindi:
> - **Coperti con fonti viste**: allenamento concorrente, linee guida OMS, passi, HIIT/SIT/zona 2, proteine (quantità, distribuzione, timing, vegetali, reni), ritmo di calo di peso (un RCT).
> - **NON coperti da ricerca in questa sessione**: creatina, caffeina, idratazione, alcol, integratori (HMB, BCAA, beta-alanina, citrullina, vitamina D), frequenza dei pasti, diet break/refeed (MATADOR, ICECAP), ricomposizione, ritmi di aumento muscolare per età di allenamento, FFMI/«limite naturale», range di grasso corporeo, errore della BIA e del DEXA, plicometria, ciclo mestruale, RED-S/amenorrea, disturbi alimentari e soglie minime di calorie, adolescenti e over 65 (nutrizione), pareri di Aragon, Helms, Trexler, Henselmans, Norton, Galpin, Huberman, Attia, Sigma. Per questi temi la nota dà solo: stato attuale del codice, **posizione prudente di progetto** (forza «Convenzione», dichiarata) e le **query pronte** per la seconda passata (Appendice B). Nessun numero di questi temi è presentato come risultato di ricerca.
> - Colonna **Stato** nelle tabelle: **V2** = visto in almeno due risultati indipendenti; **V1** = un solo risultato o riassunto; **T** = visto solo il titolo (nessun dato letto: non usare per una regola); **N** = non cercato (prassi o conoscenza generale dell'autore della nota, da verificare); **Repo** = già scritto nel repository e non ri-verificato.

## 1. Cosa dicono le fonti

### 1.1 Allenamento concorrente (cardio + pesi)

| Tema | Cosa risulta | Forza | Stato | Fonte (anno) |
|---|---|---|---|---|
| Effetto di interferenza, versione storica | Il cardio ridurrebbe ipertrofia, forza e potenza in modo dipendente da **frequenza e durata**; la **corsa** interferisce più della **bici** (componente eccentrica e danno muscolare) | Moderata (superata o ridimensionata dai lavori sotto) | V2 | Wilson 2012, come riportato in PMC5407958 («Concurrent exercise training: do opposites distract?») e PMC5093324 |
| Aggiornamento sull'ipertrofia e forza massimale | Il cardio **non compromette** ipertrofia e forza massimale; la forza **esplosiva** si attenua, di più quando cardio e pesi sono **nella stessa seduta** che quando sono separati da **almeno 3 ore** | Solida per ipertrofia e forza massimale; Moderata per forza esplosiva e per le 3 ore | V2 | Schumann 2022 (Sports Med 52:601-612, meta-analisi aggiornata); umbrella review 2026 (Sports Med, PMID 41762427: 17 meta-analisi, 144 studi, 1492 partecipanti sani: rispetto ai soli pesi, forza, potenza e ipertrofia «comparabili», capacità aerobica maggiore, SMD 0,77; rispetto al solo cardio, forza maggiore, SMD 0,59) |
| Ipertrofia delle fibre | Piccola attenuazione dell'ipertrofia **di fibra** con il cardio, più marcata con la **corsa** che con la bici (almeno per le fibre di tipo I) | Moderata | V1 | Lundberg 2022 (Sports Med 52:2391-2403; PMID 35476184) |
| Sesso e stato di allenamento | Nessuna differenza di sesso per forza della parte alta, potenza, VO2max. Piccola interferenza sulla forza delle **gambe negli uomini, non nelle donne**. Dati sull'ipertrofia insufficienti. Gli **allenati/atleti di endurance** non perdono VO2max con il concorrente; i **non allenati** guadagnano meno VO2max che col solo cardio | Moderata | V1 | Huiberts 2023 (Sports Med, PMC10933151) |
| Volume o intensità del cardio | Il **volume** totale del cardio sarebbe un mediatore dell'interferenza più importante dell'**intensità** (studio a breve termine) | Moderata, studio singolo | V1 | PMC5093324 (titolo: «Endurance Training Intensity Does Not Mediate Interference to Maximal Lower-Body Strength Gain during Short-Term Concurrent Training») |
| Ordine nella seduta (pesi prima o dopo) | Nessun effetto **significativo** dell'ordine su ipertrofia e forza massimale; tendenza a favore dei pesi prima per forza e qualità neuromuscolari (forza relativa, potenza) | Moderata (cautela: nel riassunto dell'umbrella i numeri sull'ordine sono incoerenti, p<0,001 ma «nessun effetto significativo»: non usati) | V1 | Umbrella review 2026 (PMID 41762427); revisione semisistematica 2026 sulle sequenze (PMID 41669271) |
| Cardio a intervalli (SIT) e interferenza | Esiste una meta-analisi 2026 su concorrente con SIT: **risultati non visti** | n.d. | T | PMID 41734815 (esiste una correzione, PMID 41927039) |
| Donne, over 50, adolescenti | Revisioni sistematiche dedicate esistenti: **solo titoli visti** (Sports Med 2023: donne, 10.1007/s40279-023-01955-5; adulti di mezza età e anziani, 10.1007/s40279-022-01764-2; composizione corporea in mezza età e over, PMC11989159) | n.d. | T | vedi sopra |

### 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio

| Tema | Cosa risulta | Forza | Stato | Fonte (anno) |
|---|---|---|---|---|
| Dose di attività per la salute | Tutti gli adulti: **150-300 min** a settimana di attività moderata, oppure **75-150 min** vigorosa, o combinazione; **muscolo-rinforzo a intensità moderata o maggiore, su tutti i grandi gruppi, 2 o più giorni** a settimana. Le linee guida includono anche persone con malattie croniche o disabilità | Solida (posizione ufficiale) | V2 | OMS 2020 (Bull e altri, Br J Sports Med, PMC7719906) |
| Passi e mortalità, curva | Il rischio di morte cala fino a un **plateau** a **6.000-8.000 passi/giorno negli anziani** e **8.000-10.000 nei più giovani**; nessuna associazione definita con la velocità oltre al numero di passi | Moderata (osservazionale, 15 coorti) | V2 | Paluch 2022 (Lancet Public Health 7:e219-e228) |
| Passi, aggiornamento | 57 studi (31 nelle meta-analisi): per mortalità, malattia cardiovascolare, demenza e cadute la curva ha **punti di flesso a 5.000-7.000 passi/giorno**; **7.000 vs 2.000 passi: rischio di morte per ogni causa più basso del 47%**; anche passare da 2.000 a 4.000 dà un guadagno significativo | Moderata (osservazionale) | V2 (articolo + sintesi di enti e testate; commenti sul Lancet «Reflections on daily steps and health outcomes» esistono: non letti) | Ding 2025 (Lancet Public Health, revisione sistematica e meta-analisi dose-risposta) |
| HIIT contro cardio continuo (MICT) per VO2max e grasso | Rispetto ai controlli: HIIT VO2max SMD 2,06 e MICT 1,26; HIIT riduce la massa grassa (SMD -0,69). Tra HIIT e MICT: in una meta-analisi HIIT meglio su circonferenza vita, % grasso e VO2peak; **nelle donne nessuna differenza di VO2max**; negli adolescenti sovrappeso a volte nessuna differenza di % grasso. Non è chiaro dal riassunto a quale meta-analisi appartenga ciascun numero | Moderata | V1 (più revisioni, riassunto unico) | PMC10048683; PMID 37084758; Frontiers Physiol 2025 (adolescenti); BMC Sports Sci Med Rehabil 2025 (10.1186/s13102-025-01519-2) |
| Tempo e dose del cardio | Meta-analisi dose-risposta sulla durata: l'HIIT è **molto più efficiente nel tempo** per la forma cardiorespiratoria, con benefici cardiometabolici **equivalenti** al cardio continuo | Moderata | V1 | Sports Med 2026 (10.1007/s40279-026-02528-y) |
| Sprint interval training (SIT) | Il numero di sprint per seduta **non** modifica gli aumenti di VO2max (meta-analisi): protocolli a basso volume bastano. In 6 settimane, adulti inattivi, cross-over: SIT autogestito +3,1 e HIIT a basso volume +2,7 mL/kg/min di VO2peak, nessuna differenza. Una umbrella review 2025 si chiede se il SIT sia «alternativa efficiente o promessa esagerata» (**solo titolo**) | Moderata | V1 | PMC13385658; PMC11835828; Eur J Appl Physiol 2025 (10.1007/s00421-025-05975-z, T) |
| «Zona 2» come intensità ottimale | Una revisione narrativa 2025 conclude che le prove **non** dimostrano la zona 2 come intensità ottimale per capacità mitocondriale e ossidazione dei grassi; l'indicazione nasce da dati osservazionali su atleti d'élite di endurance; **serve un'intensità più alta** per massimizzare la salute cardiometabolica soprattutto con volumi bassi; la definizione di zona 2 non è condivisa (coefficienti di variazione 6-29% tra i marcatori) | **Contrastata** | V2 | Much Ado About Zone 2 (Sports Med 2025, PMID 40560504); PMID 40225831; PMID 40010355 (T). A favore dell'80/20 polarizzato: Stöggl e Sperlich 2014, RCT in atleti di endurance allenati, 9 settimane, riportato da fonti secondarie; revisione sistematica PMC11679080 (V1, solo atleti) |
| Dose di cardio per il **dimagrimento** | Non cercata (budget): nessun dato letto | n.d. | N | - |

### 1.3 Proteine

| Tema | Cosa risulta | Forza | Stato | Fonte (anno) |
|---|---|---|---|---|
| Quantità giornaliera con i pesi | 49 studi, 1.863 partecipanti: gli integratori di proteine aggiungono **+0,30 kg** di massa magra (IC 0,09-0,52) e forza; il beneficio massimo è **vicino a 1,6 g/kg/giorno**. (Esiste una correzione pubblicata: PMID 32943392, contenuto non visto.) L'effetto è piccolo | Solida (meta-analisi), effetto piccolo | V2 | Morton 2018 (Br J Sports Med, PMID 28698222) |
| Proteine in deficit calorico con allenamento intenso | RCT in giovani uomini, deficit di circa il 40% (circa 33 kcal/kg di massa magra), RT + HIIT 6 giorni/settimana: **2,4 g/kg** contro **1,2 g/kg** → massa magra **+1,2 ± 1,0 kg** contro **+0,1 ± 1,0 kg** | Moderata (RCT singolo, giovani uomini, regime estremo) | V1 | Longland 2016 (Am J Clin Nutr 103:738-746) |
| Proteine per atleti magri in definizione | Raccomandazione: **2,3-3,1 g/kg di massa magra** al giorno, **15-30% delle calorie da grassi**, il resto carboidrati (bodybuilder natural in gara, revisione narrativa) | Moderata / Convenzione (revisione narrativa, popolazione molto magra) | V1 | Helms, Aragon, Fitschen 2014 (JISSN 11:20) |
| Più proteine servono davvero? | Nei sani, proteine in più hanno **poco o nessun effetto** su panca, presa e prove funzionali; l'80% degli studi aveva un'assunzione abituale di almeno 1,2 g/kg; pochi studi senza allenamento con i pesi. **Contestata** da lettere di commento | **Contrastata** | V1 | Nunes 2022 (J Cachexia Sarcopenia Muscle, PMC8978023); commenti PMC12677926, PMC12547074, PMID 40716105 (non letti) |
| Dose per pasto | 0,25 g/kg/pasto massimizza la sintesi proteica nei giovani; per prudenza **0,4 g/kg/pasto** su **almeno 4 pasti** per arrivare a 1,6 g/kg/giorno (fino a 0,55 g/kg/pasto per 2,2 g/kg). Il «tetto» di 20-25 g viene da prove acute con proteine veloci da sole | Moderata / Convenzione | V1 (fonte secondaria su Schoenfeld e Aragon 2018, titolo visto) | Schoenfeld e Aragon 2018 (JISSN, riportato da siti terzi) |
| «Finestra anabolica» | Dopo aver corretto per le covariate, l'**assunzione totale** è il predittore più forte; il momento attorno alla seduta **non** influenza l'ipertrofia. Una meta-analisi 2025 (5 studi, 6 resoconti): nessun effetto sulla panca, leg press meglio con le proteine **prima** che dopo, ma l'analisi per sottogruppi non è significativa | Moderata (pochi studi, effetti piccoli) | V2 | Schoenfeld, Aragon, Krieger 2013 (JISSN 10:53); Casuso e Goossens 2025 (PMID 40647175); ISSN nutrient timing 2017 (T) |
| Vegetali contro animali | A parità di dose e con pesi progressivi, soia e proteine animali danno gli stessi aumenti di massa e forza; una meta-analisi: la fonte non cambia massa magra assoluta né forza, con un piccolo vantaggio animale sulla massa magra **percentuale** soprattutto sotto i 50 anni | Moderata | V1 (due riassunti) | Messina 2018; Lim e altri 2021 (PMC7926405); PMC12166177 (T) |
| Sicurezza renale | Titolo di una meta-analisi: la funzione renale **non differisce** tra adulti sani con diete più ricche di proteine e diete normali o povere. **Letto solo il titolo.** Un RCT di 16 settimane su uomini allenati con marcatori di fegato e reni esiste (PMC10388821, T) | Moderata (da leggere) | T | PMC6236074 (Devries 2018) |
| Over 65, donne, proteine | **Non cercato** (budget) | n.d. | N | - |

### 1.4 Bilancio energetico, ritmo di calo e di aumento

| Tema | Cosa risulta | Forza | Stato | Fonte (anno) |
|---|---|---|---|---|
| Ritmo di calo di peso | 24 atleti d'élite, 4 settimane, 4 sedute di pesi a settimana: calo **0,7% del peso a settimana** (n=13) contro **1,4%** (n=11). Il gruppo veloce perde più peso e grasso ma ha **testosterone in calo** e SHBG in aumento; «il ritmo lento ha reso meglio» | Moderata (n piccolo, atleti, 4 settimane) | V1 (titolo + abstract) | Garthe 2011 (Int J Sport Nutr Exerc Metab 21:97-104) |
| Altre fonti sul calo | Revisioni e studi individuati solo per titolo: ISSN diete e composizione corporea 2017 (PMC5470183), «Achieving an Optimal Fat Loss Phase in Resistance-Trained Athletes» (PMID 34579132), «Nutritional Recommendations for Physique Athletes» (PMC7052702), «Reevaluating the definition of rapid weight loss in sports» (PMC12377160), «Rapid vs Slow Weight Loss» (PMC5702468), VLCD e muscolo (PMC10552824). Due studi con **titoli in apparente contrasto**: «A hypoenergetic diet with decreased protein intake does not reduce lean body mass in trained females» (PMC7892501) e «A 4-week caloric restriction with high volume RT and high-protein diet does not increase fat-free mass sparing but increases strength» (PMID 42103927) | n.d. | T | vedi titoli |
| Ritmo di aumento di peso e muscolo per età di allenamento, grandezza dell'eccedenza | Visto solo il titolo «Nutrition Recommendations for Bodybuilders in the Off-Season: A Narrative Review» (Sports 2019;7(7):154) | n.d. | T | - |
| Ricomposizione, volume e intensità in deficit, diet break (MATADOR, ICECAP), adattamento metabolico | **Non cercati** (budget) | n.d. | N | - |

### 1.5 Composizione corporea e misure (stato rispetto al repo)

Già nel repo (`ricerca-struttura-e-intensita.md` 1.3) e **non ri-verificato**: angolo di fase di riferimento a 50 kHz (Bosy-Westphal 2006), soglie 5,04° uomini e 4,20° donne (Akamatsu 2022, PMC12332989), ECW/TBW normale 0,36-0,39 e da 0,40 eccesso (PMC12844099, 9.717 adulti italiani), FFMI medio 19-20 uomini e 14-16 donne, oltre 25 raro (Kouri 1995). Il repo già dichiara che nessuno studio lega angolo di fase o ECW/TBW alla prescrizione di carichi.

Non cercati (budget): errore della BIA per idratazione, digiuno, esercizio, tipo di dispositivo, ciclo mestruale; DEXA; circonferenze, plicometria, foto; rumore della bilancia e finestra di lettura; range di grasso per sesso ed età; «limite naturale» (Kouri, Helms, Aragon); tempi realistici di crescita muscolare per sesso e anni di allenamento. Vedi Domande aperte.

### 1.6 Integratori, alcol, idratazione, salute (stato)

Nessuna ricerca eseguita. Nel repo c'è già: «Creatina 3-5 g al giorno: sicura ed efficace con i pesi. Solo un'informazione, facoltativa» (COR-03, **Repo**, non ri-verificato in questa sessione). Per caffeina, idratazione, alcol, HMB, BCAA, beta-alanina, citrullina, vitamina D, frequenza dei pasti, disturbi alimentari, RED-S e minimi calorici: **nessun dato letto**; la nota non propone numeri.

## 2. Dove le fonti non concordano

1. **Il cardio frena la crescita?** *Posizione A* (Wilson 2012): effetto negativo su ipertrofia, forza e potenza, dipendente da frequenza e durata, peggiore con la corsa. *Posizione B* (Schumann 2022; umbrella 2026; Lundberg 2022): ipertrofia e forza massimale non compromesse o appena attenuate; si attenua la **forza esplosiva**, di più nella stessa seduta; Huiberts 2023 trova una piccola interferenza sulle gambe negli uomini. **Il coach adotta B** (fonti più recenti, più numerose e concordi) **con la prudenza di A** su due punti: la corsa e gli intervalli lontano dalle gambe pesanti, e per chi punta a forza o potenza i pesi prima del cardio o a 3 ore.
2. **Ordine e distanza.** L'umbrella 2026 non trova un effetto significativo dell'ordine; la revisione semisistematica 2026 vede un vantaggio neuromuscolare con forza prima, ma nessuna differenza per ipertrofia e forza massimale. **Il coach non impone un ordine**; lo consiglia solo a chi ha obiettivo forza o potenza (Convenzione).
3. **Intensità del cardio.** *A*: la zona 2 è l'intensità «ottimale» (tesi diffusa nella divulgazione e nei podcast; **non letta qui, da verificare**: non si attribuisce a nessuno). *B*: revisione narrativa 2025, intensità più alte necessarie, specie con poco tempo; HIIT e SIT efficienti nel tempo; però l'80/20 polarizzato ha un RCT, in atleti di endurance. **Il coach non dice mai «ottimale»**: offre moderato come base e intervalli come opzione per chi ha poco tempo, solo per sani sotto i 65 e senza PAR-Q positivo (Convenzione di prudenza).
4. **Passi.** 10.000 (convenzione popolare) contro 5.000-7.000 di flesso (Ding 2025) e plateau 6.000-8.000 sopra i 60 e 8.000-10.000 sotto (Paluch 2022). Questi dati riguardano **mortalità e malattie, non perdita di grasso**: per il dimagrimento il repo usa 10-12 mila (Convenzione, non verificata). **Il coach**: 7.000 come riferimento di salute; per il dimagrimento un aumento graduale rispetto alla propria media, senza imporre 10-12 mila.
5. **Quante proteine.** Morton 2018: il beneficio si ferma vicino a 1,6 g/kg. Helms 2014 e Longland 2016: di più (2,3-3,1 g/kg di massa magra; 2,4 g/kg) per chi è magro e in deficit. Nunes 2022: proteine in più servono poco ai sani, ma è contestata; due studi (titoli) su donne allenate e su 4 settimane di restrizione non vedono vantaggi della dose alta. **Il coach**: 1,6 g/kg di base; 2,0-2,4 g/kg solo in deficit; mai oltre senza un professionista.
6. **Per pasto e timing.** Tetto di 20-25 g (prove acute) contro 0,4 g/kg/pasto (Schoenfeld e Aragon 2018, V1) e totale giornaliero come predittore (Schoenfeld 2013). Casuso e Goossens 2025: leg press meglio con proteine prima, ma non significativo. **Il coach non dà tetti per pasto né orari**: solo totale giornaliero e distribuzione su più pasti (Convenzione).
7. **HIIT contro continuo.** Più efficiente nel tempo (HIIT) ma equivalente per benefici cardiometabolici (meta-analisi 2026); nelle donne nessuna differenza di VO2max. **Il coach** non classifica: offre entrambi.
8. **Ritmo di calo.** 0,7%/sett meglio di 1,4%/sett (Garthe 2011, atleti, 4 settimane) contro la rilettura della definizione di «calo rapido» (titolo visto, non letto). **Il coach** tiene la banda 0,5-1% e il tetto 1%.

## 3. Numeri per il coach

Tutti i numeri sono **informazione generale, mai prescrizione**. La colonna «Stato» dice quanto è verificato.

### 3.1 Cardio e passi (minuti a settimana, camminata compresa, pesi esclusi)

| Obiettivo | Aerobico a settimana | Passi (solo testo: l'app non conta i passi) | Come si dice | Forza | Stato |
|---|---|---|---|---|---|
| Salute e forma | **150-300 min** moderati (o 75-150 intensi) + pesi ≥2 giorni | circa **7.000**, il beneficio si appiattisce dopo (6-8 mila oltre 60 anni, 8-10 mila sotto) | OMS 2020; Ding 2025; Paluch 2022 | Solida (OMS); Moderata (passi) | V2 |
| Massa, ricomposizione | almeno **150 min** moderati; corsa/intervalli al massimo 2 volte, non nel giorno gambe | 6-8 mila | Il cardio non frena crescita e forza massimale (Schumann 2022) | Solida (OMS); Moderata (collocazione) | V2 |
| Forza | come sopra; corsa veloce/sprint lontano dalle sedute pesanti; pesi prima o ≥3 h dopo | 6-8 mila | Può ridurre un poco la forza esplosiva (Schumann 2022) | Moderata | V1 |
| Dimagrimento | **150 min** come soglia bassa, salendo verso 300 solo se il recupero lo permette; cardio dopo i pesi (come oggi: 15-20 min) | partire dalla propria media e salire di 500-1.000 a settimana fino a 8-10 mila; **non** imporre 10-12 mila | dose per il dimagrimento non verificata | Convenzione | N |
| Principiante, over 65, modalità prudente | solo moderato; **nessun intervallo proposto** | come sopra, più piano | prudenza | Convenzione | N |
| Poco tempo (sani, <65, PAR-Q negativo) | 1-2 sedute a intervalli a settimana al posto di parte del moderato | - | HIIT/SIT efficienti nel tempo (V1) | Moderata | V1 |

### 3.2 Proteine (in g per kg di **peso corporeo**; la massa magra da BIA solo come controllo)

| Situazione | Numero | Forza | Stato |
|---|---|---|---|
| Base (pesi, salute, massa, forza, ricomposizione, mantenimento) | **1,6 g/kg/giorno** (il beneficio si ferma lì; usare 1,6-2,0 come intervallo mostrato) | Solida (effetto piccolo) | V2 |
| Dimagrimento con pesi | **2,0-2,4 g/kg/giorno** | Moderata | V1 (un RCT + una revisione narrativa) |
| Distribuzione | su 3-4 pasti; nessun tetto per pasto; nessun orario | Convenzione / Moderata | V1 |
| Vegetali | stesso obiettivo; attenzione alla quantità totale | Moderata | V1 |
| Non mostrare numeri se | età <18, gravidanza o allattamento, malattia renale o metabolica nota, over 65 (non cercato) → rinvio al medico/dietista | Convenzione (prudenza) | N |

### 3.3 Calorie e ritmo di variazione del peso

| Quantità | Valore | Forza | Stato |
|---|---|---|---|
| Calo di peso | **0,5-1% a settimana**, tetto 1%; Garthe 2011: 0,7% meglio di 1,4% in atleti; oltre l'1% per 2 settimane: invito a rallentare | Moderata | V1 |
| Aumento di peso (massa) | oggi 0,25-0,5%/settimana (`peso.js`); **non verificato**: mantenere come Convenzione | Convenzione | N |
| Aggiustamenti numerici di calorie («200-300 kcal») | **togliere dall'app** finché non ci sono minimi e guardie (DCA-01) | Convenzione (prudenza) | N |
| Minimi calorici per sesso | **non verificati**: non calcolare né mostrare obiettivi assoluti di kcal; se un domani servono, cercare le fonti (Appendice B) | - | N |
| Attesa di crescita muscolare per età di allenamento e sesso | **nessun numero** finché non verificato (McDonald, Aragon, Iraki: da cercare) | - | N |

### 3.4 Lettura di BIA e peso (regole di prudenza: prassi, **non** risultati di questa ricerca)

| Regola | Valore proposto | Forza | Stato |
|---|---|---|---|
| Quando una lettura BIA è «poco affidabile» | non a digiuno, allenamento o sauna nelle ore precedenti, molta acqua o alcol, dispositivo o orario diverso dalla misura precedente | Convenzione | N (il repo già consiglia digiuno e riposo) |
| Finestra di tendenza | per il **peso**: almeno **4 pesate in almeno 14 giorni** (meglio 28) prima di dire «ritmo»; per la **BIA**: confrontare solo letture nelle stesse condizioni, almeno 2 consecutive e coerenti | Convenzione | N |
| Ciclo mestruale | per chi traccia il ciclo: finestra di 4 settimane e nota che il peso varia con le fasi | Convenzione | N |
| Calo di massa magra | non reagire a variazioni di mezzo chilo tra due letture; chiedere conferma (seconda lettura standard) e un calo di forza | Convenzione | N (la soglia va tarata sull'errore tipico della BIA: domanda aperta) |
| FFMI | informazione; **mai** «sei al tuo limite naturale» né stime di quanto si potrà crescere | Convenzione | N |
| Forza come segnale | in deficit, e1RM stabile su più esercizi = muscolo tenuto; e1RM in calo su più esercizi + calo >1%/sett = rallentare | Convenzione | N |

### 3.5 Frasi sicure già utilizzabili

- Cardio: «Il cardio moderato non frena in modo rilevante la crescita dei muscoli né la forza massimale; può ridurre un poco la forza esplosiva, di più se lo fai subito dopo i pesi o con la corsa.» (Schumann 2022; Lundberg 2022)
- Passi: «Per la salute i benefici crescono fino a circa 7.000 passi al giorno e poi si appiattiscono: non serve arrivare a 10.000.» (Ding 2025; Paluch 2022: studi osservazionali sulla salute, non sul dimagrimento)
- Proteine: «Con i pesi il beneficio si ferma intorno a 1,6 g per kg di peso al giorno; in dimagrimento si usa di più (fino a circa 2,4 g/kg). Informazione generale, non una prescrizione.» (Morton 2018; Longland 2016)
- Ritmo: «Un calo di circa 0,5-1% del peso a settimana è un ritmo che aiuta a tenere massa e forza; più veloce non è consigliato.» (Garthe 2011, su atleti)
- Creatina: frase già nel repo, **non ri-verificata**. Caffeina: **nessuna frase proposta** (non cercata).

## 4. Audit delle regole esistenti

Esito: **Giusto** = coerente con le fonti viste; **Non supportato** = nessuna fonte vista (può essere Convenzione ragionevole); **Da correggere** = in contrasto o inaffidabile; **Mancante** = non c'è.

| Regola / punto (file) | Oggi | Evidenza vista | Esito | Intervento |
|---|---|---|---|---|
| **COR-01** ritmo di calo (`repertorio.js:225-232`) | Confronta le **ultime due letture BIA** (`valori.peso`), ritmo in %/sett con divisore `max(1, giorni/7)`; sotto -1% «troppo in fretta, rischi di perdere muscolo»; -0,5/-1% «ritmo ideale» | Banda 0,5-1% coerente con Garthe 2011 | **Giusto** nella banda, **Da correggere** nella misura: due punti BIA lontani o vicini (il divisore minimo 1 sottostima se le letture distano <7 giorni) e acqua che cambia danno ritmi falsi; esiste già `tendenzaPeso` (retta su 4 settimane) in `progressi/peso.js` | PES-01: usare la tendenza del peso con finestra minima |
| `consiglioPeso` (`progressi/peso.js:33-49`) | Deficit: sotto -1% «aggiungi qualche caloria, soprattutto proteine»; sopra -0,25% «togli 200-300 kcal al giorno o aggiungi passi». Massa: oltre +0,5% «si accumula soprattutto grasso»; sotto +0,1% «aggiungi 200-300 kcal» | Bande 0,5-1% (Moderata); le cifre di kcal e l'affermazione sul grasso: nessuna fonte vista | **Non supportato** (kcal, affermazione sul grasso) e **Da correggere** (prescrive calorie senza minimi né guardie; `tendenzaPeso` accetta 2 punti su 6 giorni) | NUT-02, PES-01, DCA-01 |
| **COR-02** ricomposizione (`repertorio.js:233-238`) | «Realistica» se principiante o grasso >32% donne / >25% uomini; altrimenti «fasi separate» | Non cercata | **Non supportato** in questa sessione; soglie incoerenti con BIA-02 (30/35) già segnalate al cap. 17 | Domande aperte (Appendice B) |
| **COR-03** proteine (`repertorio.js:239-242`, `compone.js:30`) | 2,35-2,75 g/kg di massa magra (BIA); senza BIA 2 g/kg (uomini) o 1,75 (donne) | Morton 2018: 1,6 g/kg è il punto di massimo; Helms 2014: 2,3-3,1 g/kg di massa magra per atleti **magri in definizione** | **Da correggere**: l'intervallo da deficit in atleta magro è mostrato a tutti gli obiettivi; la massa magra da BIA porta l'errore della BIA nel numero; 1,75 per le donne senza fonte vista; mancano età e patologie | NUT-01 |
| **COR-03** passi (`repertorio.js:243-244`, `ricette.js:384`, `compone.js:28`) | Tre numeri diversi per lo stesso concetto: 10-12 mila (deficit), 8-10 mila (grasso alto), 6-8 mila (altri), aumenti di 500-1.000/sett | Salute: 5-7 mila di flesso, plateau 6-10 mila (Ding 2025; Paluch 2022); dimagrimento non cercato | 6-8 mila **Giusto**; 10-12 mila **Non supportato** (Convenzione) | AER-04 |
| **COR-03** «Il cardio non toglie muscolo né forza» | Frase assoluta | Schumann 2022, umbrella 2026: vero per ipertrofia e forza massimale; **non** per la forza esplosiva; corsa interferisce più della bici | **Da correggere** (assoluta) | AER-03 |
| **COR-03** salute (`repertorio.js:245-248`) | Solo per obiettivo «salute»: minuti di pesi della settimana e «150-300 min di aerobica moderata (OMS)». «Tra 30 e 60 min di pesi si hanno i massimi benefici» | OMS 2020: 150-300 min e pesi ≥2 giorni (Solida). L'affermazione 30-60 min non cercata | 150-300 **Giusto**; 30-60 **Non supportato** in questa sessione; **Mancante** per gli altri obiettivi | AER-01 |
| **COR-03** creatina | «3-5 g al giorno: sicura ed efficace» | Non cercata (Repo: ISSN) | **Non verificato** | Appendice B |
| Flag `cardio` di `schemaMisto` (`motore.js:111`) e testo «15-20 minuti di cardio leggero dopo la seduta» (`onboarding-risultato.js:28`) | Solo se il primo o un altro obiettivo è dimagrimento; commento «recuperi più brevi» in testa a `schemaMisto` contraddetto dal codice (cap. 17 §4) | Cardio dopo i pesi coerente con Schumann 2022 (stessa seduta peggio per la forza esplosiva); dose settimanale non cercata | **Giusto** (collocazione), **Non supportato** (dose); **Mancante** per gli altri obiettivi | AER-01, AER-02 |
| Registro cardio (`termina-e-cardio.js`) | 6 tipi (pendenza, camminata, corsa, corsa veloce, bici, vogatore), minuti, statistica settimanale e media 4 settimane; commento nel codice cita IFPA e SwolMindset (fonti di livello 3) per «corsa veloce lontana dai giorni di gambe» | La regola è sostenuta in parte da Wilson 2012 e Lundberg 2022 (corsa interferisce di più) | **Giusto** come registro; **Mancante**: nessun confronto con i 150 min, nessun suggerimento di collocazione, nessuna intensità; fonte da aggiornare | AER-01, AER-02 |
| **BIA-02** soglie di grasso (`bia/lettore.js:283-290`) | Uomini 15/20/25; donne 22/30/35; donne <17%: «la funzione mestruale può risentirne» | Non cercate | **Non supportato** in questa sessione. Il 17% va ricontrollato: la letteratura sull'assenza di mestruo attribuisce un ruolo centrale alla **disponibilità energetica**, non a una soglia di % di grasso (**ipotesi dell'autore, non verificata**) | DCA-03, Appendice B |
| **BIA-01** FFMI e `ffmiBasso` (`compone.js:19`, `27`) | `ffmiBasso` se FFMI <18 (uomini) o <15 (donne) → «più serie» | Il repo cita medie 19-20 e 14-16 (Kouri 1995, Repo); le due soglie del codice non hanno fonte nel repo | **Non supportato**; FFMI da BIA porta l'errore di misura | Appendice B |
| `magraInCalo` (`compone.js:20-23`, `29`) e `frenoBia` (`carichi/progressivo.js:56-62`) | -0,5 kg tra due letture BIA → volume -15%; -1 kg ferma gli aumenti (incoerenza già al cap. 17 §3) | Nessuna fonte sull'errore tipico della BIA | **Da correggere** (inferenza): una variazione di mezzo chilo tra due letture può stare nel rumore di idratazione; la soglia cambia il programma | PES-02, PES-03 |
| INT-01..03 | Bandiere di prudenza da angolo di fase e ECW/TBW, dichiarate euristiche | Dichiarato nel repo | **Giusto** (non prescrive) | nessuno |
| Obiettivo di peso e data stimata (`peso.js:84`, `112-116`) | Obiettivo accettato se >25 kg; mostra «Di questo passo arrivi all'obiettivo verso [data]» | - | **Mancante**: nessun controllo di IMC dell'obiettivo né ritmo; la data stimata è una funzione sensibile | DCA-02 |
| Età, gravidanza, patologie nei consigli di corpo | `onb-age` senza limite minimo; PAR-Q ha la domanda su gravidanza o parto recente (attiva la modalità prudente) ma i consigli su deficit, proteine e passi restano | - | **Mancante**: nessun blocco o rinvio per minorenni, gravidanza, IMC basso | DCA-01 |
| Disturbi alimentari | Nessuna menzione nel codice o nei documenti (grep) | - | **Mancante** | DCA-01..03 |

## 5. Regole proposte

Modello e procedura: `ricerca-fitness` sez. 8 e cap. 19 di `coach-mappa-regole.md`. Tutte spegnibili (`REGOLE_SPEGNIBILI`), attive solo con `coachAttivo()`, **annullabili** dove cambiano il piano; le salvaguardie (PAR-Q, over 65, principianti, dolore, scarico) hanno sempre la precedenza. Nessuna riga implementata: sono proposte da far valutare. Le regole DCA sono di **prudenza di progetto** (rischio-beneficio), non conclusioni di studi.

| Codice | Quando scatta | Cosa fa | Motivo (testo italiano per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **AER-01** Cardio della settimana contro la soglia OMS | Scheda Cardio delle statistiche e pannello «Corpo e alimentazione», per **tutti** gli obiettivi (oggi solo «salute») | Mostra i minuti aerobici della settimana accanto a 150 (soglia bassa), senza semafori né colpa; per gli altri obiettivi riga informativa | «L'OMS indica 150-300 minuti a settimana di attività aerobica moderata (o 75-150 se intensa) e i pesi almeno 2 giorni (OMS 2020). Anche camminare conta. Sono riferimenti di salute, non un obbligo: parti da dove sei.» | Solida (soglie); la presentazione è Convenzione | Nessuna serie di giorni consecutivi o rosso/verde (rischio esercizio compensatorio); non scatta con messaggio DCA-01 attivo | `js/ui/allenamento/termina-e-cardio.js` (`renderCardioStat`, `minutiCardioSettimana`), `js/coach/repertorio.js` (`corpoCoach`) |
| **AER-02** Dove mettere il cardio | Quando si aggiunge cardio di tipo corsa/corsa veloce o in una seduta di gambe/full body; sempre per obiettivo forza | Nota (non blocca): dopo i pesi o ad almeno 3 ore; corsa e intervalli lontano dal giorno gambe | «Il cardio non frena la crescita né la forza massimale, ma può ridurre un poco la forza esplosiva, di più se lo fai subito dopo i pesi; la corsa pesa più della bici (Schumann 2022, Lundberg 2022).» | Moderata | Basso; mai impedire di registrare il cardio; modalità prudente/over 65: solo camminata o bici | `termina-e-cardio.js` (`aggiungiCardio`, `CARDIO_TIPI`), `onboarding-risultato.js` riga 28 |
| **AER-03** Frase corretta sul cardio | In ogni testo che oggi dice «il cardio non toglie muscolo né forza» | Sostituisce con la frase di 3.5 | come 3.5 | Solida/Moderata | Nessuno | `repertorio.js:243-244`, `ricette.js:384` |
| **AER-04** Passi realistici e uniformi | Dovunque compaiono passi (3 punti, 3 numeri diversi) | Un solo testo: riferimento di salute **circa 7.000**; per il dimagrimento aumento graduale sulla propria media (+500-1.000 a settimana) fino a 8-10 mila, mai 10-12 mila imposti; tutto «solo informazione» | «Per la salute i benefici crescono fino a circa 7.000 passi e poi si appiattiscono (Ding 2025; Paluch 2022). Se oggi ne fai pochi, anche 2.000 passi in più contano.» | Moderata (salute); Convenzione (dimagrimento) | Dati osservazionali sulla mortalità, non sul grasso; nessun obbligo; nessun conteggio nell'app | `repertorio.js:243-244`, `ricette.js:384`, `compone.js:28` |
| **NUT-01** Proteine per obiettivo, in g/kg di peso | Obiettivo/fase noti; la massa magra BIA resta solo controllo | Base 1,6 g/kg (mostrare 1,6-2,0); in deficit 2,0-2,4; stesso numero per sesso; nessun numero per <18 anni, gravidanza/allattamento, patologie renali o metaboliche, over 65 (rinvio) | «Con i pesi il beneficio si ferma intorno a 1,6 g per kg di peso al giorno; in dimagrimento si usa di più, fino a circa 2,4. Informazione generale, non una prescrizione. Con malattie ai reni, in gravidanza, sotto i 18 anni o dopo i 65 parlane con il medico.» | Moderata | Errore BIA fuori dal numero; reni: la meta-analisi (titolo) riguarda adulti sani | `repertorio.js:239-242`, `compone.js:30` (`fattoreFisico`) |
| **NUT-02** Niente calorie prescritte | `consiglioPeso` in deficit e massa | Elimina «200-300 kcal»; testo qualitativo («piccoli aggiustamenti di porzioni o passi; con dubbi, un professionista»); nessuna cifra assoluta di kcal | «Se il peso non si muove come speravi, di solito basta un piccolo aggiustamento e un po' di pazienza. Per numeri precisi serve un professionista.» | Convenzione (prudenza) | Perde concretezza; compensato da AER-04 e dal rinvio | `progressi/peso.js` (`consiglioPeso`) |
| **PES-01** Tendenza del peso con finestra minima | Calcolo del ritmo in COR-01 e in `consiglioPeso` | Mostra il ritmo solo con almeno 4 pesate in almeno 14 giorni (idealmente 28); sotto: «troppo presto per leggere la tendenza»; COR-01 usa `tendenzaPeso`, non due letture BIA | «Il peso cambia di giorno in giorno per acqua e sale: guardo la tendenza su almeno due settimane, meglio quattro.» | Convenzione (la banda 0,5-1% è Moderata, Garthe 2011) | Risposta più lenta; ok | `repertorio.js` (`corpoCoach`), `progressi/peso.js` (`tendenzaPeso`) |
| **PES-02** Contesto della lettura BIA | Alla registrazione di una BIA (PDF o manuale) | Tre domande facoltative (digiuno? allenamento nelle ultime ore? stesso dispositivo e orario?); se «no», la lettura va nello storico ma non attiva `magraInCalo`, `frenoBia`, COR-01 | «Questa misura è stata fatta in condizioni diverse dalle precedenti: la confronto con cautela.» | Convenzione | Attrito: domande saltabili; default «affidabile» | `js/coach/bia/opzioni.js`, `js/coach/compone.js` (`fattoreFisico`) |
| **PES-03** Calo di massa magra solo con conferma | `magraInCalo` e `frenoBia` | Una sola soglia (1 kg, la più prudente oggi) **e** conferma: seconda lettura affidabile o e1RM in calo su più esercizi; altrimenti solo informazione | «La massa magra risulta più bassa, ma la BIA oscilla con l'acqua: aspetto una seconda misura o un calo di forza prima di cambiare il piano.» | Convenzione (soglia da tarare, domanda aperta) | Meno falsi allarmi; ritardo di una misura | `compone.js:20-23`, `carichi/progressivo.js` (`frenoBia`) |
| **PES-04** Forza come segnale in deficit | Fase deficit, ≥3 esercizi con e1RM nelle ultime 3-4 settimane | e1RM stabile: «stai tenendo il muscolo»; e1RM in calo + peso che scende oltre 1%/sett: invito a rallentare e curare riposo; se la stanchezza persiste, parlare con un professionista | «Il peso scende e la forza regge: buon segno. Se la forza cala per più settimane, rallenta un po'.» | Convenzione | Non diagnostico; si ferma con DCA-01 | `compone.js`/`esigenza.js`, `repertorio.js` (`corpoCoach`) |
| **DCA-01** Guardia sul dimagrimento | Età <18; IMC <18,5 (da peso e altezza, soglia convenzionale non verificata qui); gravidanza o allattamento; ritmo >1%/sett per 2 settimane; obiettivo di peso con IMC <18,5 | Niente fase «deficit» con numeri, niente consigli di calo; il goal dimagrimento viene sostituito da forza/salute con spiegazione; messaggio con rinvio a medico o dietista | «Per minorenni, in gravidanza o con un peso già basso, il dimagrimento va seguito da un medico o un dietista: ti propongo un programma per forza e salute. L'app non fa diagnosi.» | Convenzione (prudenza) | Falsi positivi (muscolosi con IMC alto non toccati; magri veri sì): accettato; non umiliare, non mostrare soglie come «obiettivi» | `onboarding.js` (campi età/peso/altezza, `ONB_GOALS`), `compone.js`, `repertorio.js`, `progressi/peso.js` |
| **DCA-02** Funzioni sensibili e linguaggio | Obiettivo di peso con IMC <18,5, ritmo >1%/sett, o DCA-01 attivo | Nasconde la data stimata verso l'obiettivo; avvisa e non salva un obiettivo con IMC <18,5; vietati nei testi «cheat», «sgarro», «colpa», «bruciare le calorie», «ripagare» | «Questo obiettivo di peso è sotto un valore sano per la tua altezza: parlane con un professionista prima di impostarlo.» | Convenzione | Più codice in `salvaObiettivoPeso`; test sui testi vietati | `progressi/peso.js` (`renderPesoCard`, `salvaObiettivoPeso`), `js/lingue/*` |
| **DCA-03** Segnali e rinvio | Sempre, in fondo a «Corpo e alimentazione» e nel pannello BIA | Testo fisso con segnali e invito a parlarne; nessuna autodiagnosi; ritira la nota «<17% grasso» in favore di un messaggio sulla disponibilità energetica (da verificare prima) | «Se pensi al cibo o al peso quasi di continuo, salti i pasti per compensare gli allenamenti, ti alleni anche con dolore o malessere per paura di ingrassare o, per le donne, il ciclo è sparito da mesi: parlane con il medico di base o con un professionista. Questa app non fa diagnosi.» | Convenzione (prudenza) | Testo informativo: nessun rischio clinico; la parte sul 17% attende verifica | `repertorio.js` (`corpoCoach`), `bia/lettore.js:289-291` (`analyzeBia`) |

**Cosa l'app non deve fare** (Convenzione, tutte coerenti con COR-03 «informazione, non prescrizione»): obiettivi di calorie sotto i minimi; deficit per chi ha meno di 18 anni, è in gravidanza o ha IMC basso; ritmi di calo oltre l'1%/sett presentati come obiettivo; moralizzare cibo o allenamenti saltati; serie di giorni di cardio e conteggi di calorie «bruciate»; diagnosi di disturbi alimentari, amenorrea o carenze; presentare la BIA come verità (errore) o l'FFMI come limite.

## 6. Domande aperte

Tutte da risolvere con la seconda passata (Appendice B) prima di tradurre in regole i temi «N».

1. **Dose di cardio per il dimagrimento** e posto dei passi: esiste una dose supportata? Quanto compensa il corpo (NEAT, adattamento)? Fino a che punto 10-12 mila passi è sostenibile?
2. **Ricomposizione**: chi la ottiene (principianti, ritorno dopo pausa, sovrappeso, proteine alte)? Le soglie 25% e 32% reggono?
3. **Ritmo di aumento muscolare** per anni di allenamento e sesso, e grandezza dell'eccedenza (McDonald, Aragon, Iraki 2019): oggi `peso.js` dice 0,25-0,5%/sett **senza fonte**.
4. **Errore della BIA**: variazione tipica per idratazione, digiuno, esercizio, ciclo, dispositivo; soglia sotto cui una variazione di massa magra o grassa è rumore (risolve PES-03); DEXA e plicometria come confronto.
5. **FFMI**: quanto vale da BIA; «limite naturale» (Kouri, Helms, Aragon): se mostrarlo; soglie `ffmiBasso` del codice.
6. **Range di grasso corporeo** per sesso ed età (es. studi di Gallagher): le soglie BIA-02 sono allineate? Il **17%** nelle donne è una soglia vera o l'eco di un'ipotesi superata rispetto alla disponibilità energetica (RED-S, IOC)?
7. **Minimi di calorie** per sesso e adulti: valori citati dalle linee guida; metodi sicuri per non mostrare mai deficit sotto soglia; deficit nei minorenni e negli over 65.
8. **Disturbi alimentari e app**: dati su app di conteggio e sintomi (letteratura 2017-2025); cosa raccomandano le linee guida su linguaggio e rinvio.
9. **Creatina** (dose, donne, over 65, sicurezza; ISSN), **caffeina** (dose, tempo, sonno, sicurezza), **idratazione**, **alcol**, **integratori** (HMB, BCAA, beta-alanina, citrullina, vitamina D): cosa funziona e cosa è marketing.
10. **Diet break e refeed** (MATADOR, ICECAP): evidenza e se hanno senso in un'app informativa.
11. **Proteine e over 65**, **donne**, **vegetariani**; reni: leggere per intero Devries 2018 (oggi solo titolo) e Nunes 2022 con i commenti.
12. **Contraddizione tra titoli** (PMC7892501, PMID 42103927 contro Longland 2016): servono abstract e popolazioni.
13. **Pareri degli esperti** (Aragon, Helms, Trexler, Henselmans, Schoenfeld, Phillips, Norton, Galpin; Sigma Nutrition; Huberman e Attia): **non cercati**; nessuna affermazione attribuita a loro in questa nota, salvo il tema «zona 2 ottimale» indicato come tesi di divulgazione **da verificare**.
14. **Umbrella 2026 sull'ordine**: i numeri riportati nel riassunto sono incoerenti; leggere il full text prima di dare consigli sull'ordine.
15. **Meta-analisi 2026 su SIT e interferenza** (PMID 41734815): leggere l'abstract; il riassunto indica pubblicazione a settembre 2026 su Int J Sports Med, non verificabile da qui.

## 7. Limiti onesti

- **Copertura incompleta** (22 ricerche riuscite su ≥30 richieste, budget WebSearch della sessione esaurito); tutti i temi «N» non sono stati cercati.
- **Solo riassunti** di WebSearch: nessun full text, nessun n e nessun intervallo oltre a quelli scritti; i riassunti possono essere imprecisi. Dove un numero compare in una sola fonte secondaria è marcato V1.
- **Osservazionali** (passi): non dicono che camminare di più causa meno morti, e non riguardano il dimagrimento.
- **Popolazioni**: Garthe 2011 (24 atleti d'élite, 4 settimane), Longland 2016 (giovani uomini, regime estremo), Helms 2014 (atleti magri in gara) non si estendono senza dirlo a donne, over 65, minorenni, obesi.
- **Titoli visti ma non letti** (marcati T) non sono evidenza.
- **Fonti secondarie** (siti di sintesi, giornali) sono servite solo a orientarsi; la forza è stata assegnata sulla base della meta-analisi o della posizione ufficiale individuata.
- **Date 2026** (umbrella review, SIT, zona 2 come «Sports Med 2025»): le ho riportate come compaiono nei risultati; non ho potuto controllarle altrove.
- Le regole DCA sono di **prudenza di progetto**: non vengono da uno studio e le soglie convenzionali (IMC 18,5, età 18) non sono state verificate qui.

---

## Appendice A. Registro delle 22 ricerche riuscite

Filtri: P = `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov` (a volte `europepmc.org`, `link.springer.com`, `bjsm.bmj.com`); «libera» = senza filtro. Due ulteriori ricerche (proteine e over 65; proteine e reni) **rifiutate** dallo strumento: budget 200/200.

| N | Query (abbreviata) | Filtro | Esito utile |
|---|---|---|---|
| 1 | Wilson 2012 concurrent training interference meta-analysis | P+EPMC | PMC5407958, PMC5093324, PMC5752732, PMC11057620 |
| 2 | Schumann 2022 concurrent training meta-analysis | P+Springer | Sports Med 52:601-612 e 52:2391-2403; 2023 donne; umbrella 2026 |
| 3 | concurrent training order same session separated hours 2024 2025 | libera | Frontiers 2025, Medicine 2024, Huiberts 2023, Barbell Medicine, PMID 37847373 |
| 4 | WHO 2020 150-300 minutes, muscle-strengthening | libera | PMC7719906 |
| 5 | Umbrella review concurrent training 2026 | P+Springer | PMID 41762427; SIT interference PMID 41734815 |
| 6 | Concurrent training impact of sex and training status | P+Springer | PMC10933151 |
| 7 | HIIT vs MICT VO2max body fat 2024 2025 | P+bjsm | PMC10048683, PMID 37084758, 10.1186/s13102-025-01519-2 |
| 8 | Paluch 2022 steps mortality 15 cohorts | libera | Lancet Public Health 7:e219; JACC 2023 (T) |
| 9 | Ding 2025 steps health outcomes meta-analysis | libera | Lancet Public Health 2025, flessi 5-7 mila |
| 10 | Sprint interval training time-efficient VO2max meta-analysis | P+Springer | PMC13385658, PMC11835828, Eur J Appl Physiol 2025 (T) |
| 11 | zone 2 critique Attia polarized 80/20 | libera | Stöggl e Sperlich 2014 (secondaria), PMC11679080, rumore di blog |
| 12 | SIT interference in concurrent training meta-analysis 2026 | P+Springer | PMID 41734815 (+ correzione 41927039) |
| 13 | zone 2 narrative review Sports Med 2025 | P+Springer | PMID 40560504, 40225831, 40010355 |
| 14 | Morton 2018 protein supplementation meta-analysis | P+bjsm | PMID 28698222, correzione 32943392 |
| 15 | Helms 2014 natural bodybuilding contest prep protein | libera | JISSN 11:20, PMC4033492 |
| 16 | Garthe 2011 two weight-loss rates elite athletes | P | PMID 21558571 |
| 17 | Longland 2016 higher vs lower protein energy deficit | P | AJCN 103:738-746 e altri titoli (T) |
| 18 | Nunes 2022 protein intake meta-analysis | P | PMC8978023, commenti |
| 19 | protein per meal Schoenfeld Aragon 0.4 g/kg | libera | JISSN 2018 (secondaria) |
| 20 | Schoenfeld Aragon Krieger 2013 protein timing | P+Springer | JISSN 10:53, ISSN timing 2017 |
| 21 | Protein ingestion timing meta-analysis 2025 | P+Springer | PMID 40647175 |
| 22 | plant vs animal protein resistance training meta-analysis | P+Springer | PMC7926405, PMC12166177, PMC12509290 |

## Appendice B. Query pronte per la seconda passata (da lanciare con budget ripristinato)

Filtro consigliato: `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`, `link.springer.com`, `europepmc.org`. Regola: ogni numero in 2 fonti indipendenti; poi cercare il dato opposto («limitations», «no difference»).

1. cardio per il dimagrimento: «exercise training weight loss fat mass meta-analysis 2024 dose»; «steps per day weight loss intervention fat mass meta-analysis».
2. NEAT e adattamento: «NEAT compensation energy deficit adaptive thermogenesis resistance-trained».
3. over 65: «concurrent training older adults sarcopenia meta-analysis 2024»; «protein requirements older adults PROT-AGE resistance training lean mass».
4. proteine donne: «protein intake women resistance training lean mass meta-analysis sex differences».
5. ricomposizione: «Barakat 2020 body recomposition trained individuals»; «recomposition untrained overweight returning lifters resistance training protein».
6. deficit e muscolo: «resistance training volume energy deficit lean mass retention trained 2023»; «energy deficiency impairs resistance training gains lean mass but not strength».
7. ritmo di aumento: «rate of muscle gain training age McDonald Aragon»; «Iraki 2019 bodybuilders off-season nutrition»; «energy surplus required hypertrophy Slater 2019».
8. diet break: «MATADOR intermittent energy restriction Byrne 2018»; «ICECAP diet break Peos 2021 resistance-trained»; «refeed diet break meta-analysis weight loss».
9. adattamento metabolico: «metabolic adaptation to weight loss implications for the athlete Trexler»; «Biggest Loser metabolic adaptation Fothergill».
10. creatina: «ISSN position stand creatine safety efficacy»; «creatine supplementation women meta-analysis»; «creatine older adults resistance training Candow»; «creatine kidney hair loss misconceptions Antonio 2021».
11. caffeina: «ISSN position stand caffeine 2021 dose timing»; «caffeine sleep resistance training afternoon».
12. idratazione e alcol: «dehydration performance strength meta-analysis»; «alcohol muscle protein synthesis recovery resistance exercise».
13. integratori: «HMB supplementation resistance training meta-analysis»; «BCAA supplementation lean mass meta-analysis»; «beta-alanine ISSN position stand»; «citrulline malate resistance performance meta-analysis»; «vitamin D supplementation muscle strength meta-analysis athletes».
14. frequenza dei pasti e digiuno: «meal frequency body composition meta-analysis Schoenfeld»; «time-restricted eating resistance training lean mass meta-analysis».
15. BIA: «bioelectrical impedance analysis hydration fasting exercise measurement error guidelines»; «consumer BIA scale accuracy DXA»; «phase angle ECW/TBW interpretation hydration»; «BIA fat-free mass change detection resistance training agreement DXA».
16. DEXA e misure: «DXA measurement error hydration food least significant change»; «skinfold circumference body composition tracking trained».
17. peso e ciclo: «menstrual cycle body weight fluctuation water retention»; «daily weight fluctuation weighing frequency weight loss Orsama».
18. FFMI: «fat-free mass index natural limit Kouri 1995 normalized»; «Helms Aragon muscle gain potential natural trainees».
19. grasso corporeo: «healthy percentage body fat ranges by age sex BMI Gallagher 2000».
20. donne e RED-S: «IOC consensus relative energy deficiency in sport 2023 update»; «low energy availability threshold 30 kcal/kg FFM menstrual»; «female athlete triad body fat percentage threshold amenorrhea».
21. disturbi alimentari: «calorie tracking apps eating disorder symptoms»; «eating disorders strength training athletes screening referral»; «minimum calorie intake guidelines weight loss adults very low calorie diet».
22. giovani: «adolescents dieting resistance training eating disorders risk»; «youth resistance training safety position statement».
23. pareri degli esperti (solo per mappare, mai come prova): `allowed_domains` dei siti dei singoli esperti (Stronger By Science, Menno Henselmans, Sigma Nutrition) su proteine, zona 2, ritmo di calo, e «Huberman Attia protein 1 g per lb criticism».
