# Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente)

Copertura: 8 ricerche web riuscite (su almeno 35 richieste: il tetto di 200 ricerche condiviso dalla sessione si è esaurito); il resto da conoscenza del modello, marcato con il simbolo † e mai presentato come risultato di ricerca.

Ambito: per ciascun obiettivo che l'app offre (`ONB_GOALS` in `js/ui/onboarding.js:21`: massa, dimagrimento, forza, ricomposizione, salute, glutei) e per gli obiettivi ovvi che mancano (tonificare come etichetta, corsa 5K, abilità, sport, schiena/collo/postura, mantenimento, umore e sonno), cosa prescrivono evidenza e coach per la parte di **allenamento** (con il minimo di cardio e nutrizione in sicurezza). Tocca i codici esistenti PRG (04, 13-20, 25-28, 37), COR (01-03), ESI, INT, CIC e propone i codici nuovi **OBI-01..OBI-18** (grep su `js/`, `docs/`, `tests/` il 2026-10-05: liberi; ricontrollare all'implementazione). Va letta insieme a `docs/ricerca-cardio-nutrizione.md` (cardio, proteine, ritmo di calo: non lo ripeto), `docs/ricerca-recupero-infortuni-popolazioni.md` (dolore, popolazioni), `docs/ricerca-metodi-coach-pratici.md` (schede, prime 4 settimane del principiante, dose minima) e `docs/ricerca-psicologia-aderenza.md` (obiettivi, aderenza).

Data: **2026-10-05**. Metodo: skill `ricerca-fitness` (solo WebSearch; letti i riassunti dei risultati, mai le pagine). Forza come da skill: **Solida / Moderata / Convenzione**, con bandiera **Contrastata**.

## 0. Come si legge

- **[V]** visto nei risultati di WebSearch di questa sessione (titolo, link, riassunto del risultato: nessun full text). Numeri citati come compaiono.
- **[R]** già scritto nel repo o in un'altra nota `docs/ricerca-*.md` (non ricontrollato qui; lo stato di verifica sta nella nota di origine).
- **†** **Conoscenza del modello (non verificata sul web)**. Autore e anno compaiono solo se li ricordo con sicurezza; i numeri sono ordini di grandezza, mai percentuali precise; nessun DOI né PMID inventato. Forza massima **Moderata (da verificare)**, di regola **Convenzione**. **Nessuna riga † è pronta per diventare regola senza una nuova passata di ricerca.**
- Nelle matrici le abbreviazioni sono Sol / Mod / Conv / Contr.

### 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice)

| Obiettivo | Cosa cambia nel programma (file) | Cosa NON cambia |
|---|---|---|
| `massa` | `schemeFor`: 4x10, pause 150/75 s, 10 settimane (`onboarding.js:96`); altrove: leg extension e alzate laterali (PRG-23, `ricette.js:258-270`); ABB-03 e struttura-pro | Nessun surplus calorico dato; ritmo di peso 0,25-0,5%/sett solo in `progressi/peso.js` (Convenzione) |
| `dimagrimento` | `schemeFor`: 3x12, pause 105/60 s, 8 sett.; flag `cardio` in `schemaMisto` (`motore.js:104-113`) che stampa solo la riga «15-20 minuti di cardio leggero dopo la seduta» (`onboarding-risultato.js:28`); nota passi 10-12 mila (`ricette.js:384`); fase `deficit` (`repertorio.js:222`) | Volume per livello **identico** a massa (`VOLUME_LIVELLO`, `schemi.js:41`); esigenza di partenza 120% (`intensita.js:68`) anche in deficit; nessun cardio settimanale in minuti |
| `forza` | 5x5, pause 210/90 s, 8 sett.; non principianti: 6x3 sui pesanti (`ricette.js:195`); primo pesante fisso (PRG-08) | RIR dichiarato 3-5 nel testo, usato 1-3 dal codice (vedi 6, A4) |
| `ricomposizione` | `schemeFor`: 3x10, pause 120/75 s, 12 sett.; come secondario `tettoSerie` 4; solo COR-02 (`repertorio.js:233-238`) | Nessun cardio, nessun passo mirato, nessuna metrica (vita, foto), nessun orizzonte temporale |
| `salute` | `schemeFor`: 3x10, pause 90/60 s; volume 6-12 (`ricette.js:282`); niente copertura per regioni (`ricette.js:258`); COR-03 mostra pesi della settimana e 150-300 min OMS | Il testo «2-3 RIR» non è applicato (`rirBersaglioBase`, `regole-ricerca.js:62`, non guarda l'obiettivo) |
| `glutei` | `schemeFor`: 3x12, pause 120/60 s; PRG-22: 4 famiglie ogni settimana, 3x12 a 75 s (`ricette.js:233`) | Nessun legame con massa o dimagrimento; nessuna metrica specifica |

Altri fatti utili: il **primo** obiettivo decide lo schema, gli altri correggono (`schemaMisto`, `motore.js:104`); fino a 3 obiettivi (`onbToggleGoal`, `onboarding.js:183`) **senza controllo dei conflitti**; il **livello** e i **giorni** pesano più dell'obiettivo sulla struttura (`splitFor`, `onboarding.js:37`); `faseCorpo()` (`progressi/peso.js:27`) e `corpoCoach()` (`repertorio.js:222`) leggono **solo il primo obiettivo**, mentre la nota passi di `ricette.js:384` scatta se `dimagrimento` è **in qualunque posizione**.

## 1. Cosa dicono le fonti

### 1.1 Dimagrimento: allenamento nel deficit, cardio, miti

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Pesi nel deficit: massa magra e forza | Meta-analisi con meta-regressione: un deficit (nel riassunto, 500 kcal al giorno) peggiora i **guadagni di massa magra** ottenuti con i pesi, ma **non in modo significativo i guadagni di forza**; costruire massa magra nel deficit è «difficile». Il riassunto non riporta n, effetto né popolazione | Moderata [V, solo riassunto] | Murphy e Koehler, «Energy Deficiency Impairs Resistance Training Gains in Lean Mass but Not Strength», Scand J Med Sci Sports (anno 2022 ricordato †) |
| Pesi e perdita di massa magra in restrizione calorica (obesi anziani) | Meta-analisi di RCT: i pesi hanno ridotto del **93,5%** la perdita di massa magra indotta dalla restrizione (dal riassunto). Popolazione: anziani obesi, non si estende | Moderata [V] | PMC5946208, «Resistance Training Prevents Muscle Loss Induced by Caloric Restriction in Obese Elderly Individuals: SR and MA» |
| Volume dei pesi nel deficit (allenati) | RCT su maschi allenati, 5 serie contro 3 serie per esercizio (n=38 nel riassunto): il volume **non** cambia la conservazione di massa magra. Visti due titoli (PubMed 36114738 e Eur J Appl Physiol, «Lean mass sparing in resistance-trained athletes during caloric restriction: the role of resistance training volume»): non ho potuto stabilire se sono lo stesso lavoro; anno 2022 nei link, 2023 nel riassunto | Moderata (RCT singolo, soli uomini, breve) [V] | PMID 36114738; doi Springer s00421-022-04896-5 |
| Deficit continuo o intermittente in allenati | RCT con 27 allenati (maschi e femmine), 4 sedute di pesi a settimana per 7 settimane: il titolo dice che la restrizione **intermittente attenua** la perdita di massa libera da grasso. Esito numerico non letto | Moderata-bassa (solo titolo e riassunto) [V] | PMC7739314 |
| Quale allenamento per la massa grassa | Nei riassunti, concordi in 3 risultati: **aerobico e combinato** riducono massa corporea e grassa più dei **soli pesi**; il combinato non riduce più grasso dell'aerobico da solo pur richiedendo **il doppio del tempo**; pesi e combinato **aumentano la massa magra** più del solo aerobico | Moderata [V] | Willis 2012 (J Appl Physiol, PMC3544497: titolo visto, autore e anno ricordati); PMC12107660 (SR+MA 2025 per ID, «concurrent, resistance, or aerobic on body fat loss»); PMC11989159 (mezza età e anziani) |
| HIIT o cardio continuo per il grasso | Con tempo o energia uguali, HIIT e continuo riducono il grasso in modo **simile e piccolo**: 31 studi, 873 partecipanti (riassunto); in un riassunto di fonte non identificata -1,50% di grasso con intervalli e -1,44% con continuo. Una meta-analisi ha nel titolo «HIIT is not superior». La meta-analisi più citata a favore dell'HIIT (Viana 2019, BJSM, PMID 30765340) ha una **expression of concern** (PMID 31248869) | Moderata [V] | Wewege 2017 (Obesity Reviews, dal riassunto); PMC10624584; PMID 31248869. Altre revisioni più favorevoli all'HIIT (vs controlli, non vs continuo) in `ricerca-cardio-nutrizione.md` 1.2 [R] |
| «Zona brucia-grassi» (Fatmax) | Fatmax = intensità con la massima ossidazione dei grassi, circa 41-46% del VO2max (riassunto). L'allenamento a Fatmax riduce peso e grasso in obesi (meta-analisi di RCT: -4,30 kg di peso, -4,03 kg di grasso, -3,34 cm di vita: non è chiaro se rispetto a controlli); nel riassunto: l'alta intensità dà un calo di grasso più marcato. **Nessun lavoro visto mostra che l'intensità bassa batta l'alta a parità di energia**. Conoscenza †: la zona misura la quota di grassi bruciati *durante* la seduta, non il grasso perso nel tempo, che dipende dal bilancio energetico totale | Moderata (la «zona magica» non regge) [V] + † | PMC7663534; PMC8290478 («Scientific Challenges on Theory of Fat Burning by Exercise», titolo) |
| Dimagrimento localizzato | **Contrastato.** RCT recente (maschi adulti, 10 settimane, 4 giorni/sett., corsa + esercizi addominali) conclude che lo «spot reduction esiste» (più grasso del tronco perso del controllo); RCT con ecografia su donne obese (addominali + dieta): **nessun calo** del sottocutaneo addominale oltre la dieta da sola; meta-analisi: aerobico, pesi e combinato riducono tutti il grasso sottocutaneo addominale (effetto generale, non locale) | Contrastata (a favore c'è un singolo RCT piccolo) [V] | PMC10680576 / PMID 38010201; PMID 25766455; PMC7849939; PMC8038840 (titolo) |
| EPOC («effetto post-combustione») | Acuto: EPOC maggiore dopo HIIT e circuito che dopo continuo isocalorico (319 e 329 contro 168,5 mL nel riassunto: unità ed equivalente in kcal non chiari); pesi e HIIT elevano il dispendio per ore (33 kcal/30 min a 14 h secondo il riassunto, da non usare). Conoscenza †: il contributo totale è una frazione piccola del costo della seduta (ordine: poche decine di kcal per seduta tipica) | Moderata † (da verificare) | PMC11035584, PMC12567725 (titoli), PMID 34567357 [V] |
| Compensazione: l'esercizio fa dimagrire meno del previsto | Revisioni e studi su compensazioni di fame, dispendio fuori dall'esercizio (NEAT) e metabolismo; in un riassunto la compensazione media è «18% ± 93%» (enorme variabilità; non ho potuto attribuirla a un lavoro) | Moderata [V] | PMC3696411; PMC4446773; PMC6230893; PMC8441008; PMC4561833 |
| Ritmo di calo, proteine, passi | 0,5-1% a settimana (0,7% meglio di 1,4% in atleti); 2,0-2,4 g/kg in deficit; 10-12 mila passi = Convenzione | Moderata / Convenzione [R] | Garthe 2011; Longland 2016; Helms 2014 (`ricerca-cardio-nutrizione.md` 1.3-1.4) |
| Mantenimento del peso dopo il calo | ACSM 2009 (position stand sull'attività fisica per perdita e mantenimento del peso): sotto 150 min/sett. effetto minimo, 150-250 modesto, oltre 250 min/sett. perdita clinicamente utile e mantenimento. Registro NWCR (osservazionale, autoselezione): in media circa 1 ora al giorno di attività (Catenacci 2008 †) | Moderata † (da verificare) | ACSM 2009 †; NWCR †. Revisione Swift 2014 † |
| «Pesi pesanti nel cut» | Riportato in generale da coach basati sull'evidenza (Helms, Nuckols, Henselmans, Israetel; da verificare, nessun testo letto): mantenere intensità e carichi, ridurre il volume solo se il recupero lo chiede, non fare «più serie» per compensare il deficit | Convenzione † | pratica |

### 1.2 Ricomposizione, «tonificare», massa magra

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Chi ottiene la ricomposizione | Plausibile in **principianti, chi riprende dopo una pausa, persone con molto grasso e proteine alte**; poco in allenati già magri (fasi separate). Rassegna «Body recomposition: can trained individuals build muscle and lose fat at the same time?» (Strength Cond J 2020 †). Nel repo: deficit del 40% + 2,4 g/kg + pesi/HIIT in giovani uomini: massa magra +1,2 kg [R]. Nel deficit i guadagni di massa magra calano [V, vedi 1.1] | Moderata † | Barakat 2020 †; Longland 2016 [R]; Murphy e Koehler [V] |
| Che cosa significa «tonificare» | Tradotto in fisiologia: **più massa muscolare con grasso basso-moderato**. Il «tono» (tensione di riposo del muscolo) non si «allena» con molte ripetizioni leggere. Non ho visto fonti in questa sessione | Convenzione † | conoscenza generale |
| Carichi leggeri contro pesanti | Ipertrofia **simile** tra carichi bassi (circa dal 30% di 1RM) e alti se le serie sono vicine al cedimento; la **forza** migliora di più con carichi alti. Nel repo: ACSM 2026, ipertrofia dal 30% al 100% di 1RM [R, `ricerca-metodi-coach-pratici.md` 5.6]. Meta-analisi sui carichi (Schoenfeld 2017 JSCR †; Lopez 2021 MSSE †) | Solida [R] / Moderata † | ACSM 2026 [R]; Schoenfeld 2017 †; Lopez 2021 † |
| Donne: crescita e «paura di diventare grosse» | Crescita muscolare **relativa** simile tra i sessi, **assoluta** minore (Roberts 2020, meta-analisi †). Dettagli nella nota sulle donne (parallela, non vista) | Moderata † | Roberts 2020 † |
| Surplus calorico | **Contrastata.** Utile agli avanzati, poco necessario ai principianti (Slater 2019, Front Nutr †). RCT in allenati con surplus piccolo e grande: visto il titolo «Effect of Small and Large Energy Surpluses on Strength, Muscle, and Skinfold Thickness in Resistance-Trained Individuals» (Sports Med Open 2023) [V, solo titolo]; il mio ricordo (esito: più plica cutanea col surplus grande senza più muscolo †) va verificato | Contrastata | Slater 2019 †; Sports Med Open 2023 [V titolo] |
| Ritmo di crescita muscolare | Modelli di pratica (McDonald, Aragon): ordine di 0,5-1 kg di muscolo al mese nel primo anno per un principiante maschio, la metà o meno per le donne, che **si dimezza ogni anno**. Non sono risultati di studi | Convenzione † | pratica |

### 1.3 Salute e longevità

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Linee guida di attività | 150-300 min/sett. aerobici moderati (75-150 intensi) + muscolo-rinforzo su tutti i grandi gruppi **≥2 giorni**; anche per malattie croniche; ridurre il tempo da seduti | Solida [R, V2 in `ricerca-cardio-nutrizione.md`] | OMS 2020 (Bull e altri, BJSM) |
| Fitness cardiorespiratoria e mortalità | Coorte di oltre 100.000 pazienti con test su tapis roulant: la mortalità cala con l'aumentare della fitness, **senza un livello oltre il quale il beneficio finisce**, il gruppo élite ha la più bassa; osservazionale (Mandsager 2018, JAMA Netw Open †). Meta-analisi: ogni +1 MET di fitness si associa a circa -13% di mortalità per tutte le cause (Kodama 2009, JAMA †) | Moderata † (osservazionale: associazione, non prova di causa) | Mandsager 2018 †; Kodama 2009 † |
| Pesi e mortalità | Meta-analisi di coorti: muscolo-rinforzo associato a circa 10-20% di mortalità più bassa; il massimo a circa 30-60 min/sett.; combinato con l'aerobico l'associazione è più forte (Momma 2022, BJSM †). Il testo di COR-03 «30-60 minuti bastano» sembra venire da qui [non verificato] | Moderata † | Momma 2022 † |
| Forza di presa | Predittore di mortalità in grandi coorti (Leong 2015, Lancet †) | Moderata † (osservazionale) | Leong 2015 † |
| Passi | Plateau a 6.000-8.000 (anziani) e 8.000-10.000 (giovani); flesso a 5.000-7.000 | Moderata [R] | Paluch 2022; Ding 2025 |
| Zona 2 | «Intensità ottimale» non dimostrata; serve intensità più alta con poco tempo | Contrastata [R] | PMID 40560504 (`ricerca-cardio-nutrizione.md` 1.2) |
| «Centenarian decathlon» | Idea di preparare le capacità fisiche che si vorranno a 80-90 anni: zona 2 per qualche ora a settimana, una seduta di lavoro al VO2max, forza 2-4 volte, stabilità. **Riportato da Peter Attia** (libro Outlive, 2023), **da verificare**; vista di pratica con sponsor e conflitti, non evidenza | Convenzione † | Attia 2023 † |
| Dose minima efficace | Revisioni sulla dose minima per forza e ipertrofia: poche serie ben fatte bastano a progredire/mantenere (Iversen 2021, Sports Med †; Androulakis-Korakakis 2020 †) | Moderata † | Iversen 2021 †; Androulakis-Korakakis 2020 † |

### 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Forza per corridori e ciclisti | Rassegne e meta-analisi: forza **massimale** (carichi pesanti, poche ripetizioni) migliora economia di corsa e prestazione sulla distanza senza aumentare molto la massa: ordine di qualche punto percentuale su economia e tempo (Rønnestad e Mujika 2014, Scand J Med Sci Sports †; Berryman 2018 †; Blagrove 2018, Sports Med †) | Moderata † (da verificare ordini di grandezza e dosi) | Rønnestad e Mujika 2014 †; Berryman 2018 †; Blagrove 2018 † |
| Dose per atleti di resistenza | Pratica: 2 sedute a settimana di 30-45 min, 3-5 ripetizioni a carico alto (circa 80-90% 1RM), 3-4 serie su 3-5 esercizi (squat o simili, stacco, step-up, polpacci) + pliometria leggera; da pochi mesi a stagione; stesse fonti | Moderata † / Convenzione † | stesse |
| Interferenza pesi + cardio | Ipertrofia e forza massimale non compromesse; si attenua la forza **esplosiva**, di più nella stessa seduta; la corsa pesa più della bici | Solida / Moderata [R] | Schumann 2022; Lundberg 2022; Huiberts 2023 (`ricerca-cardio-nutrizione.md` 1.1) |
| Pliometria | Meta-analisi su atleti: miglioramento di salto, sprint, agilità con 2 sedute a settimana per 6-12 settimane circa (de Villarreal 2009, JSCR †; Stojanović 2017, Sports Med †) | Moderata † | de Villarreal 2009 †; Stojanović 2017 † |
| In stagione (sport di squadra) | La forza si **mantiene** con 1 seduta a settimana a volume ridotto e intensità mantenuta (studi su calciatori professionisti, p.es. Rønnestad 2011 †; rassegne sul periodo di gare †); sedute lontane almeno 48 h dalla partita (pratica) | Moderata † / Convenzione † | Rønnestad 2011 † |
| Periodizzazione | Modelli periodizzati hanno un piccolo vantaggio sulla forza rispetto ai non periodizzati (Williams 2017, Sports Med †); Bompa, Verkhoshansky, Issurin: fasi (preparazione generale, specifica, gara) e blocchi: pratica | Moderata † (vantaggio piccolo) / Convenzione † | Williams 2017 †; Bompa, Verkhoshansky, Issurin (pratica) |
| Sport di combattimento | Poche prove specifiche; si applicano i principi di forza, potenza e condizionamento degli altri sport | Convenzione † | pratica |
| Programma di corsa per principianti (Couch to 5K e simili) | Non verificato in questa sessione. Conoscenza †: programmi di 8-9 settimane, 3 sedute, intervalli corsa/cammino. Studio olandese su principianti (Buist 2008, Am J Sports Med †): un programma **più graduale non ha ridotto** gli infortuni da corsa rispetto a uno più rapido (circa uno su cinque in entrambi); la «regola del 10%» non ha prove solide | Moderata † / Convenzione † | Buist 2008 † |

### 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Esercizio nel mal di schiena cronico | Più efficace di nessun trattamento, cure usuali o placebo; **nessun tipo** nettamente migliore (Pilates, McKenzie, funzionale appena sopra) | Solida [R, V in `ricerca-recupero-infortuni-popolazioni.md` 1.4] | Hayden 2021 (Cochrane) |
| «Correggere la postura» | La relazione tra postura statica e dolore è **debole**; il consiglio «siediti dritto» è messo in discussione (Slater e altri 2019, JOSPT «Sit up straight: time to re-evaluate» †). La varietà di movimento e la forza contano più della posizione perfetta. Credenze di paura-evitamento riducono la flessione lombare nel sollevare [R, PMC8120682, preprint]. McGill: **Contrastata** [R] | Moderata † / Contrastata | Slater 2019 †; PMC8120682 [R] |
| Dolore al collo | Esercizi di rinforzo e mobilità riducono il dolore con effetti da piccoli a moderati; nessun esercizio superiore agli altri (Cochrane, Gross 2015 †) | Moderata † | Gross 2015 † |
| Spalla | Esercizio progressivo come prima linea; dolore ≤3/10 [R] | Moderata [R] | `ricerca-recupero-infortuni-popolazioni.md` 1.5 |
| Chi sta seduto per lavoro | RCT su impiegati (gruppi danesi, Andersen †): esercizi di rinforzo specifici per collo/spalle in poche sedute a settimana riducono il dolore cronico; interrompere la seduta con pause di movimento ha effetti piccoli su marcatori cardiometabolici | Moderata † / Convenzione † | Andersen (diversi anni) † |

### 1.6 Mente, stress, sonno

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Esercizio per depressione, ansia, distress | Umbrella review di molte centinaia di studi (ordine): effetti **moderati** su depressione, ansia e distress (ordine di -0,4/-0,6 in unità SMD), più forti con **intensità maggiore** e interventi brevi (fino a 12 settimane); vale per vari tipi di attività (Singh 2023, Br J Sports Med †). Network meta-analysis (Noetel 2024, BMJ †): camminata/corsa, yoga, pesi, danza, misto efficaci; certezza dell'evidenza da bassa a moderata | Moderata † | Singh 2023 †; Noetel 2024 † |
| Pesi e depressione | Meta-analisi di RCT: i pesi riducono i sintomi depressivi in adulti (ordine di 0,5-0,7 SMD) (Gordon 2018, JAMA Psychiatry †) | Moderata † | Gordon 2018 † |
| Sonno | L'esercizio regolare migliora il sonno (effetto da piccolo a moderato; Kredlow 2015 †); l'esercizio serale non peggiora il sonno salvo l'attività intensa a ridosso del coricarsi (Stutz 2019 †). Sonno scarso peggiora la prestazione (-7,56% in media, snippet) [R] | Moderata † | Kredlow 2015 †; Stutz 2019 † |

### 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa»)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Specificità e progressione | Si migliora un'abilità praticando l'abilità o varianti progressivamente più difficili, con frequenza alta e volume sotto-massimale (principio generale della scienza dell'allenamento) | Solida † (principio) | testi di S&C † |
| Prima trazione | Nessuno studio visto. Scala di pratica: appesa, scapolari, negativi lenti (3-5 s), versione assistita (elastico o lat machine al 60-70% del peso), prima ripetizione. Gli eccentrici aumentano la forza (meta-analisi generali †) | Convenzione † | pratica |
| Flessibilità | L'allenamento di forza a ROM completo migliora la mobilità in modo simile allo stretching (revisione 2021 †: titolo ricordato, da verificare); pochi minuti a settimana per muscolo bastano ad aumentare il ROM (dose-risposta, Thomas 2018 †); lo stretching statico lungo (≥60 s) **subito prima** del sollevamento riduce forza/potenza di circa 4-7,5% [R]: si fa dopo o in giorno a parte | Moderata † | Afonso 2021 †; Thomas 2018 †; [R] |

### 1.8 Allenare due obiettivi insieme

Interferenza e ordine: vedi 1.4 e `ricerca-cardio-nutrizione.md` 1.1 [R]. Dal punto di vista del programma: massa e forza sono compatibili (stesso allenamento con zone di ripetizioni diverse); **massa e dimagrimento** hanno bilancio energetico opposto (fonti [V]: nel deficit i guadagni di massa magra calano); cardio e pesi: nessuna perdita di ipertrofia o forza massimale, forza esplosiva leggermente penalizzata [R].

### 1.9 Aspettative e obiettivi (rimando a `ricerca-psicologia-aderenza.md` 1.3)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Fissare obiettivi | Effetto medio sull'attività fisica (d = 0,55 nei riassunti); la dichiarazione ESSA critica l'uso meccanico di SMART e distingue obiettivi di processo, prestazione e apprendimento | Moderata + Contrastata [R] | ESSA 2025-26 [R] |
| Aspettative di calo irrealistiche | Persone in trattamento dell'obesità sperano perdite molto superiori a quelle ottenibili e le valutano deludenti anche se riuscite (Foster 1997 †) | Moderata † | Foster 1997 † |

## 2. Dove le fonti non concordano

Per ciascun punto: posizione A, posizione B, cosa adotta il coach e perché (prudenza).

1. **HIIT contro continuo per il grasso.** *A*: l'HIIT riduce il grasso e il tempo (revisioni favorevoli in `ricerca-cardio-nutrizione.md` 1.2; meta-analisi Viana 2019, **con expression of concern**). *B*: a parità di tempo o energia i due sono simili (Wewege 2017; PMC10624584). **Adotta B**: nessuna classifica; l'HIIT è «efficiente nel tempo», non «migliore per il grasso». Forza: Moderata.
2. **Zona brucia-grassi, zona 2 e alta intensità.** *A*: Fatmax e zona 2 come intensità ottimale (divulgazione, riportato da Attia e altri **da verificare**; Fatmax in obesi dà calo di peso, PMC7663534). *B*: serve intensità più alta con poco tempo (revisione 2025 [R]) e a parità di energia nessuna superiorità dell'intensità bassa. **Adotta**: il moderato come base (camminata inclusa), gli intervalli come opzione per sani e poco tempo; mai «ottimale». Contrastata.
3. **Dimagrimento localizzato.** *A*: un RCT 2023 su maschi adulti dice che esiste (PMC10680576). *B*: RCT con ecografia su donne obese, nessun effetto; effetto generale degli esercizi sul grasso sottocutaneo. **Adotta**: non promettere il dimagrimento localizzato e dire «non dimostrato»; il lavoro addominale serve per forza e stabilità. Contrastata (debole).
4. **Volume nel deficit.** *A* (pratica, Helms, Israetel, da verificare): se il recupero cala, riduci il volume e tieni l'intensità. *B*: un RCT trova lo stesso mantenimento di massa magra con 5 e con 3 serie per esercizio [V]; i fautori della ricomposizione spingono volume e proteine. **Adotta**: non aumentare il volume in deficit (OBI-04); non esiste prova che serva di più. Moderata (un RCT) + Convenzione.
5. **Ricomposizione per tutti o solo per principianti e chi riprende.** *A* (pratica popolare): si può sempre. *B* (rassegna Barakat 2020 †; Murphy e Koehler [V]): negli allenati magri i guadagni nel deficit sono modesti. **Adotta B** con orizzonte onesto (12-16 settimane) e fasi separate per gli allenati magri (OBI-08).
6. **Surplus calorico: serve?** *A*: sì, per massimizzare la crescita degli avanzati (Slater 2019 †). *B*: un surplus grande dà più grasso, non necessariamente più muscolo (Sports Med Open 2023, titolo visto, esito da verificare). **Adotta**: surplus piccolo come Convenzione, nessun numero di kcal.
7. **Pesi leggeri e alte ripetizioni «tonificano».** *A* (pratica): le ripetizioni alte «definiscono». *B*: la forma dipende da massa e grasso; ipertrofia simile tra carichi vicini al cedimento (Schoenfeld 2017 †; ACSM 2026 [R]). **Adotta B**: spiegarlo senza smentire con tono duro (OBI-07).
8. **Postura e dolore.** *A* (tradizione): correggere la postura e fare i «Big Three» di McGill. *B*: relazione debole, la varietà e la forza contano; Cochrane 2021: nessun tipo di esercizio è il migliore. **Adotta B** [R: D1 in `ricerca-recupero-infortuni-popolazioni.md`]: niente promesse sulla postura; esercizi di forza e movimento regolare.
9. **Forza per corridori: carichi pesanti o resistenza muscolare.** *A* (Rønnestad e Mujika, Berryman †): pesanti e poche ripetizioni. *B* (pratica da palestra): circuiti ad alte ripetizioni. **Adotta A** come Convenzione/Moderata †, perché a parità di tempo la forza massimale non aggiunge massa e migliora l'economia †.
10. **Pesi in stagione: quanto?** *A*: 1 seduta di mantenimento (calciatori †). *B* (pratica): 2 sedute. **Adotta**: 1-2 sedute brevi, mai nei 2 giorni prima della gara (Convenzione).
11. **Longevità.** *A* (Attia, Outlive †): zona 2 + VO2max + forza + stabilità, ben dosati. *B*: le associazioni con la mortalità sono osservazionali; la zona 2 «ottimale» è contestata [R]; i coach scettici come Barbell Medicine (Baraki) criticano l'hype della longevità (**da verificare**). **Adotta**: la dose OMS + forza 2 giorni come base solida; il resto come opzione.
12. **Passi: 10.000 o 7.000.** Vedi `ricerca-cardio-nutrizione.md` §2.4 [R]: 7.000 per la salute; per dimagrire si sale gradualmente.
13. **Quanti anni/quanto serve per mantenere.** *A*: un terzo del volume o della frequenza mantiene forza e massa (Bickel 2011 †). *B*: negli anziani serve di più. **Adotta**: mantenimento a 1/3-1/2 del volume con intensità invariata, più prudenza sopra i 65 anni (Convenzione).
14. **Esiste un solo «giusto» fra attività per l'umore?** Singh 2023 e Noetel 2024 † indicano che vari tipi funzionano, con intensità maggiore migliore: **adotta** la preferenza della persona (autonomia: Teixeira 2012 [R]).

## 3. Matrice obiettivo -> programma

Legenda: i valori sono **proposte di lavoro** per il generatore, non prescrizioni mediche. Tra parentesi la forza (Sol/Mod/Conv/Contr); † = conoscenza del modello da verificare. «Principiante» indica meno di 6 mesi di pesi. Per gli standard su volume, frequenza e RIR rimando alle note parallele: qui conta cosa **cambia per obiettivo**.

### 3.1 Struttura: giorni, split, serie, ripetizioni, riposo, RIR

| Obiettivo | Giorni / settimana | Split | Serie per muscolo a settimana | Ripetizioni | Riposo | RIR |
|---|---|---|---|---|---|---|
| **Massa** (`massa`) | 3 (princ.), 4 (interm.), 5-6 (avanz.) (Mod) | FB 3x, Upper/Lower x2, PPL/UL (Conv, PRG-02) | Princ. 6-10, interm. 10-16, avanz. 12-20; tetto circa 11 per muscolo per seduta (Mod, Pelland 2025 [R]) | 5-30, la maggior parte 6-15; isolamenti 10-20 (Sol per l'ampiezza dei carichi a parità di vicinanza al cedimento [R]) | Pesanti 2-3 min, macchine 90-120 s, isolamenti 60-90 s (Mod, ≥90 s [R]) | Fondamentali 1-3, macchine/isolamenti 0-2; principianti 2-3 ovunque (Mod/Conv) |
| **Dimagrimento** (`dimagrimento`) | 3 di pesi (minimo 2) + camminate/cardio negli altri giorni (Conv) | FB 3x o UL 4x, come massa (Conv) | **Volume di mantenimento del livello, non di più**: princ. 6-10, interm. 8-12, avanz. 10-16; meno se il recupero cala (Mod: un RCT sul volume [V]; Conv) | Fondamentali 5-10 **con i carichi invariati**, macchine 8-12, isolamenti 10-15 (Mod † per tenere i carichi; Conv) | ≥2 min sui fondamentali, 60-90 s sugli isolamenti; non accorciare per «bruciare di più» (Conv) | 1-3, **mai 0 sui fondamentali**; principianti 2-3 (Conv) |
| **Ricomposizione** (`ricomposizione`) | 3-4 (Conv) | FB 3x o UL 4x (Conv) | Princ. 8-12, interm. 10-14 (Mod †) | 6-15, fondamentali 5-10 (Conv) | Come massa (Conv) | 1-3 (Conv) |
| **«Tonificare»** (etichetta, non obiettivo oggi) | = ricomposizione; per molte donne con glutei e spalle in più | = ricomposizione | = ricomposizione | 8-15, vicino al cedimento controllato (Mod †) | = ricomposizione | 1-3 |
| **Forza** (`forza`) | 3-4, lo stesso fondamentale **2-3 volte a settimana** (Mod; la frequenza per fondamentale è una lacuna segnalata nell'analisi delle lacune del coach, non nel repo) | FB 3x (princ.), UL con ripetizione dei fondamentali o FB (Conv) | 3-6 serie dirette per fondamentale a settimana ripartite su 2-3 sedute + accessori 6-12 (Mod †) | Principali 1-6, accessori 6-12 (Mod [R]: Robinson 2024) | Principali 3-5 min, accessori 90-120 s (Mod †) | Serie di lavoro 1-3 (RPE 7-9); AMRAP o massimali solo di rado (Mod/Conv) |
| **Salute** (`salute`) | 2-3 di pesi (OMS: ≥2 giorni) + 150 min di movimento (Sol) | FB 2-3x (Conv) | 4-12 totali per gruppo (repo 6-12; Mod [R]) | 8-15 (Conv, ACSM 2026 [R]) | 60-120 s (Conv) | 2-3 (ACSM 2026 [R]); 3-4 sopra i 65 anni [R] |
| **Glutei** (`glutei`) | 3-4 giorni totali, con 2-3 sedute di gambe/glutei (Conv) | UL/FB con lower 2-3 volte (Conv) | 9-15 serie per i glutei a settimana (repo, Conv; ordini fino a 12-20 † per chi punta a crescere) | Hip thrust 6-12, squat/affondi 6-12, stacchi 6-10, abduzioni 12-25 (Conv †) | 90-150 s su thrust/squat, 60-90 s su abduzioni (Conv) | 0-3 (Conv) |
| **Corsa 5K** (nuovo, vedi 5.1) | 3 corse + 2 sedute di forza da 30-45 min (Conv; forza Mod †) | Forza FB 2x (Mod †) | 3-4 esercizi x 3-4 serie (circa 6-10 serie per muscolo) (Mod †) | Forza 3-6 a carico alto, accessori 8-12, pliometria leggera (Mod †) | 2-3 min (Conv) | 1-3 (Conv) |
| **Sport di squadra e combattimento** (nuovo, 5.3) | Fuori stagione 3, pre-stagione 2-3, in stagione 1-2 (Conv †) | FB o UL con potenza (Conv) | Fuori stagione 8-14; in stagione 3-6 con intensità invariata (Conv †) | Potenza 3-5 su carichi medi con velocità; forza 3-6; pliometria 3-6 salti x 3-5 serie (Mod †) | 2-3 min (Conv) | 1-3, mai al cedimento in stagione (Conv) |
| **Schiena, collo, postura** (nuovo, 5.4) | 2-3 sedute da 20-30 min + camminata quotidiana (Mod [R: Cochrane]; Conv) | FB leggero (Conv) | 4-8 per gruppo, tirate e cerniera dell'anca prioritarie (Conv) | 8-15 (Conv) | 60-90 s (Conv) | 2-4; dolore ≤3/10 [R] |
| **Abilità** (nuovo, 5.2) | 3-4 sedute brevi (10-20 min) (Conv) | Pratica dell'abilità + forza di base 2x (Conv) | Sotto-massimale, 3-6 serie dell'abilità (Conv) | Da 1 a 5 ripetizioni pulite; tenute di 10-30 s (Conv) | 60-180 s (Conv) | 2-3, mai al cedimento sulla tecnica (Conv) |
| **Mantenimento** (nuovo, 5.5) | 2 (Mod †) | FB (Conv) | 3-6 per gruppo, circa 1/3-1/2 del volume del ciclo precedente (Mod † Bickel 2011) | 5-12 con carichi invariati (Mod †) | 90-180 s (Conv) | 1-3 (Conv) |

### 3.2 Cardio, progressione, cosa tracciare, tempi attesi, cosa NON fare

| Obiettivo | Cardio e passi | Progressione | Cosa tracciare | Tempi attesi (ordini di grandezza) | Cosa NON fare |
|---|---|---|---|---|---|
| **Massa** | 90-150 min/sett. moderati o 6-8 mila passi; il cardio non frena l'ipertrofia [Sol/Mod, R]; corsa e intervalli non il giorno gambe | Doppia progressione per tutti (principianti: lineare per sessione); aumentare serie solo se la crescita si ferma (Mod [R]) | Peso (tendenza), e1RM o ripetizioni a carico fisso, circonferenze (braccio, coscia, torace), foto ogni 4 sett. | Principiante: forza ogni settimana, differenza visibile in 8-12 sett.; ritmo di peso 0,25-0,5%/sett. (Conv) | Surplus esagerato («dirty bulk»); salire di volume di colpo; evitare del tutto il cardio |
| **Dimagrimento** | Base: 150 min moderati a settimana (OMS [R]), salendo verso 250-300 se il recupero lo permette (ACSM 2009 † Mod); 1-2 sedute di intervalli per chi ha poco tempo (Mod [V: HIIT≈MICT]); passi: partire dalla propria media e salire di 500-1.000 a settimana (Conv); **niente «zona magica»** | Tenere o alzare lentamente i carichi; accettare piccoli cali di ripetizioni; scarico quando il recupero lo chiede | Peso (media settimanale; ritmo solo con ≥4 pesate in 14 giorni, PES-01 [R]), **circonferenza vita**, e1RM su 3 esercizi (forza che regge = muscolo tenuto), foto ogni 4 sett., fame e sonno | 0,5-1% del peso a settimana (Mod [R]); blocco di 8-12 sett. poi mantenimento o pausa (Conv); la prima settimana cala acqua | Dimagrimento localizzato; sudare «per bruciare»; azzerare i carichi per «tonificare» con tante ripetizioni; deficit rapidi; compensare gli sgarri con altro cardio |
| **Ricomposizione** | 150 min o 7.000 passi (OMS/Ding [R]); 1-2 sedute di cardio facoltative | Come massa, più lenta; doppia progressione | **Vita**, foto, e1RM; il peso può restare uguale (è normale); BIA solo come tendenza con le stesse condizioni (PES-02 [R]) | 12-16 settimane minimo; effetto visibile in 8-12 sett. per principianti (Conv †) | Giudicare dalla bilancia; deficit forte con volume alto; pretenderla da allenati magri |
| **Forza** | 60-150 min facili o camminata; corsa veloce lontano dalle sedute pesanti; pesi prima o ≥3 h dopo (Mod [R]) | Principianti: lineare per sessione (+2,5-5 kg, 3x5) finché possibile; interm.: settimanale (doppia progressione, DUP); avanz.: onde o blocchi (Conv †) | e1RM, record di ripetizioni, tecnica (video), RPE | Principianti: aumenti a ogni seduta per alcuni mesi (stime di 3-9 mesi dai siti di coach [R]); interm.: aumenti mensili (Conv) | Test del massimale ogni settimana; serie al cedimento sui pesanti; tecnica sacrificata al carico |
| **Salute** | 150-300 min moderati (Sol); 1 seduta più intensa facoltativa se sani; ~7.000 passi (Mod [R]) | Aggiungere ripetizioni poi carico; costanza prima di intensità | Sedute/sett., **minuti aerobici**, test: 5 alzate dalla sedia (tempo), piegamenti consecutivi, plank, passi, energia/umore 1-5 | Abitudine in 8-12 sett.; forma aerobica in 8-12 sett. (Conv †) | Estremi; dolori forti «da guadagno»; programmi da 6 giorni; confrontarsi con gli altri |
| **Glutei** | 6-8 mila passi; cardio leggero se vuole dimagrire | Doppia progressione su thrust e squat; più ROM; unilaterale (Conv) | Carico hip thrust a 8-10 ripetizioni, **circonferenza dei fianchi** (stesso punto), foto laterali, forza squat | 8-12 sett. per cambiamenti visibili (Conv †); dipende dal grasso sopra | Solo isolamenti; ignorare squat e stacchi; promettere «sollevare» o «rassodare» localmente |
| **Corsa 5K** | È l'obiettivo: 3 uscite/sett.; corsa dopo i pesi o a 6 h; intervalli solo dopo 6-8 sett. di base e per sani | Aumentare **prima la durata del tratto di corsa**, poi la frequenza; mai due variabili insieme (Conv) | Minuti continui, distanza, passo, RPE, dolore dopo la corsa 0-10, sedute complete | 8-12 settimane per correre 30 min continui partendo da zero (Conv †) | Aumenti rapidi di volume; correre con dolore che peggiora; intervalli al terzo giorno |
| **Sport** | Condizionamento specifico dello sport + pliometria bassa | Fuori stagione volume e forza; in stagione intensità mantenuta, volume ridotto | Salto in piedi, ripetizioni su carichi chiave, RPE, dolore | Forza di base in 8-12 sett. fuori stagione (Conv †) | Pesi pesanti il giorno prima della gara; volume alto in stagione |
| **Schiena, collo, postura** | Camminata quotidiana 20-30 min; pause di movimento ogni 30-60 min seduti (Conv †) | Aumentare prima il tempo/ripetizioni, poi il carico; dolore ≤3/10 [R] | **Dolore medio e massimo 0-10 a settimana**, 3 attività a scelta con punteggio 0-10, sedute fatte, segnali di allarme | Cambiamenti in 4-12 sett.; il dolore oscilla (Conv †) | Promettere di «correggere la postura» o «curare»; evitare di muoversi; esercizi con dolore che sale |
| **Abilità** | Quello che serve all'abilità; resto facoltativo | Scala di progressioni; passare al gradino successivo con 3 serie pulite del precedente (Conv) | Test ogni 2 settimane (ripetizioni, secondi), qualità | 6-16 settimane secondo il punto di partenza (Conv †) | Cedimento ogni giorno; saltare i gradini |
| **Mantenimento** | 150 min o ~7.000 passi (OMS [R]; ACSM 2009 † per chi ha perso peso) | Nessuna: carichi stabili con piccole salite | Peso (tendenza), vita, e1RM | Indefinito; verifiche ogni 4 sett. | Smettere con i pesi; abbassare anche i carichi |

### 3.3 Le prime 4 settimane, per obiettivo (modelli di lavoro, Convenzione)

Fondamento comune: tecnica prima, RIR alto all'inizio, volume che sale (modello per principianti in `ricerca-metodi-coach-pratici.md` 5.4 [R]). Nota: il codice oggi mette un **scarico alla 4ª settimana** per principianti e intermedi (PRG-01) e la rampa di RIR esiste solo per gli avanzati (`ricette.js:386-394`).

| Obiettivo | Settimana 1 | Settimana 2 | Settimana 3 | Settimana 4 |
|---|---|---|---|---|
| Dimagrimento | 3 sedute di pesi, RIR 3; **misura** la media dei passi 7 giorni, vita, foto; nessun cambio di dieta | +500-1.000 passi/giorno; 1 camminata o cardio da 20 min | Controlla la tendenza del peso (non prima di 14 giorni); RIR 2-3 | Confronta il ritmo con 0,5-1% a settimana: se è più veloce rallenta; se il peso non scende non alzare il cardio oltre +10-20% a settimana |
| Massa | 2-3 serie, RIR 3; stima del carico | 3 serie, RIR 3 | 3 serie, RIR 2 | RIR 1-2 sui multiarticolari; peso: tendenza 0,25-0,5%/sett. |
| Ricomposizione | Misure di partenza (vita, foto, e1RM, media del peso); tecnica | Volume 70%, RIR 3 | Volume 85-100%, RIR 2 | Nessun giudizio: la prima verifica è alla settimana 8-12 |
| Forza | Trova i carichi di lavoro (RPE 6-7), tecnica dei fondamentali | +2,5-5 kg a seduta se facile (principianti) | Come settimana 2 | Prima serie «top» a RPE 8; nessun test del massimale |
| Salute | 2 sedute da 30-40 min + 2 camminate da 20-30 min; test iniziali (5 alzate dalla sedia, piegamenti) | +10 min di movimento totale | 3a seduta facoltativa | Rivedi costanza e piacere; ritesta |
| Glutei | Pattern dell'hip thrust e del ponte con carico leggero, 9 serie/sett. | 10-12 serie | 12 serie, abduzioni | 12-15 serie; carico thrust a 8-10 ripetizioni come riferimento |
| Corsa 5K (esempio di scala, schema di lavoro mio) | 3 uscite: 8 x (1 min corsa / 2 min cammino) | 6 x (2 / 2) | 4 x (3 / 2) | 3 x (5 / 2): se qualcosa fa male, ripeti la settimana |
| Schiena e postura | Camminata 15-20 min ogni giorno; cerniera dell'anca con carico leggero, tirate; dolore di partenza annotato | + ponte dei glutei e plank laterale; dolore ≤3/10 | Aggiungi carico se il dolore non cresce | Confronta il dolore con la settimana 1; se non migliora o peggiora: professionista |
| Trazione (abilità) | Appeso 3 x 10-20 s; scapolari 3 x 5-8; rematore inverso | Negativi 3 x 3-5 (3-5 s) | Assistita (elastico o lat machine al 60-70% del peso) 3 x 5 | Primo tentativo di ripetizione; poi 5 serie singole sotto-massimali |

### 3.4 Metriche (riassunto in una riga per obiettivo)

Dimagrimento: tendenza del peso, vita, e1RM, passi (autodichiarati). Massa: tendenza del peso, ripetizioni a carico fisso, circonferenze. Ricomposizione: vita, foto, e1RM. Forza: e1RM e record. Salute: minuti aerobici e sedute, 5 alzate dalla sedia, energia. Glutei: carico del thrust, fianchi, foto. Corsa: minuti continui, dolore. Sport: salto in piedi, RPE. Schiena: dolore 0-10 settimanale e funzione. Abilità: test periodico. Mantenimento: tendenza del peso, vita, e1RM.

## 4. Combinare due obiettivi

**Regole di priorità (proposte, Convenzione salvo dove indicato).**

- **P1.** Sicurezza e aderenza battono l'obiettivo: PAR-Q, over 65, principianti, dolore e scarico hanno sempre la precedenza (cap. 14 di `coach-mappa-regole.md`).
- **P2.** Un obiettivo guida un blocco; il secondo è un **vincolo** (cambia una cosa sola); il terzo è una nota. Come già fa `schemaMisto`.
- **P3.** Obiettivi con bilancio energetico opposto (**massa + dimagrimento**) non si fanno insieme: l'app propone ricomposizione o fasi separate (OBI-01).
- **P4.** Cardio e pesi: i pesi hanno la priorità di collocazione quando l'obiettivo è forza o potenza; chi punta alla corsa mette la corsa in giorni distinti o dopo i pesi (≥6 h tra corsa intensa e pesi di gambe) (Mod [R] per il principio; le ore sono Convenzione).
- **P5.** In deficit nessun obiettivo chiede **più volume**: il volume e l'esigenza non salgono (OBI-04).
- **P6.** Se i minuti non bastano si taglia prima il secondario (ordine: volume accessori, poi giorni del secondario), mai la sicurezza.

| Coppia (primo + secondo) | Chi guida | Cosa prende l'altro | Rischio di interferenza | Regola |
|---|---|---|---|---|
| Forza + massa | Forza se c'è un numero da migliorare; altrimenti massa | Fondamentali pesanti 3-6 ripetizioni + accessori 8-15 (come già PRG-14/17) | Basso | Nessuna modifica |
| Forza + dimagrimento | Forza | Carichi invariati; volume di mantenimento; RIR ≥2 sui pesanti; cardio basso-moderato non il giorno gambe | Medio: recupero | OBI-04, OBI-05; aspettativa: forza **tenuta** (non sempre in crescita) negli allenati |
| Massa + dimagrimento | **Conflitto** | Ricomposizione o fasi separate (prima il grasso se il grasso è alto, prima la massa se è basso) | Alto | OBI-01 |
| Ricomposizione + dimagrimento | Ricomposizione se principiante o ripresa; altrimenti dimagrimento | Proteine più alte (informazione), volume moderato | Medio | OBI-08 |
| Salute + qualsiasi | L'altro | Obiettivo aerobico della settimana (150 min) e ≥2 sedute di pesi | Basso | OBI-05 |
| Glutei + massa | Massa | PRG-22 (4 famiglie, 9-15 serie) | Basso | Nessuna |
| Glutei + dimagrimento | Dimagrimento | PRG-22 a 3x12, passi | Medio (volume) | OBI-04 |
| Massa o forza + **corsa** (5.1) | Quello a cui l'utente dà più peso nella scelta; **se è la corsa**, la forza resta 2 sedute | Corse facili 2-3 a settimana, 20-40 min, dopo i pesi o a 6 h; un solo giorno di intervalli | Medio sulla forza esplosiva e sulle gambe [R] | OBI-13 |
| Corsa + salute | Corsa | 2 sedute di forza da 30 min (soddisfano il «≥2 giorni» OMS) | Basso | OBI-13 |
| Sport + forza | Sport | Settimana tipo con giorno partita; forza 1-2 sedute | Medio | OBI-16 |
| Dimagrimento + sport | Sport (in stagione) | Nessun deficit forte in stagione (Conv †) | Alto | OBI-16 |

Esempio di tre obiettivi: forza + massa + dimagrimento: l'app non lo propone come un solo piano (conflitto massa/dimagrimento); mostra la scelta di OBI-01.

## 5. Obiettivi che l'app non ha ancora

Per ciascuno: **programma minimo viabile**, metriche, soglie di arresto. Tutti con le salvaguardie esistenti (PAR-Q, over 65, principianti, dolore: `coachAttivo()`, `docs/coach-mappa-regole.md` cap. 14). Forza delle prescrizioni: Convenzione salvo dove indicato.

### 5.1 «Correre» (5K, 10K): supporto, non allenatore di corsa

- **Per chi**: sani, con PAR-Q negativo; con PAR-Q positivo o over 65: solo camminata (Conv).
- **Settimana**: 3 uscite a giorni alterni (corsa/cammino) + 2 sedute di forza di 30-45 min (FB con squat o simili, cerniera, step-up, polpacci; 3-4 serie da 3-6 ripetizioni a carico alto, con prudenza per principianti: partire da 8-10) + pliometria leggera dopo 4-6 settimane. Forza per corridori: Moderata † (Rønnestad e Mujika 2014; Berryman 2018).
- **Progressione**: una variabile alla volta; la scala della tabella 3.3; settimana di alleggerimento ogni 4 (la 4ª di ogni blocco come PRG-01).
- **Metriche**: minuti continui, distanza, RPE (CR-10), dolore dopo la corsa 0-10, sedute completate. Test: 30 minuti continui alla settimana 8-12.
- **Arresto**: dolore ≥4/10 durante o che peggiora il giorno dopo: torna alla camminata; stinchi, ginocchia, tendine d'Achille persistenti oltre 2 settimane: professionista (cap. di prudenza dell'altra nota).
- **Cosa non dice l'app**: tempi garantiti, «regola del 10%» come dogma (Buist 2008 †: non protegge).

### 5.2 Abilità: «prima trazione», «10 piegamenti», «squat completo», «toccarmi le punte», «plank 60 s»

- Tabella di **scale** in `js/dati/` (una per abilità: 5-7 gradini con criterio di passaggio: 3 serie pulite).
- **Frequenza**: 3-4 sedute brevi a settimana (10-20 min), sotto-massimali (Conv); più 2 sedute di forza generale.
- **Test**: ogni 2 settimane, un massimale pulito; si annota e basta.
- **Trazione**: scala in 3.3. **Punte**: cerniera dell'anca e squat profondo con carico leggero (ROM completo) + 5-10 min di stretching a fine seduta o in giorno a parte, ≥30-60 s per posizione; mai stretching statico lungo subito prima dei pesi [R]. **Squat completo**: goblet con caviglie, step progressivi di profondità, senza dolore.
- **Arresto**: dolore articolare acuto; si scala di un gradino.
- Evidenza specifica: Convenzione (nessuno studio visto sulle singole scale).

### 5.3 Sport (squadra e combattimento): «supporto alla stagione»

- Un solo campo nuovo nel profilo: **fase** (fuori stagione / pre-stagione / in stagione) e **giorno della partita**.
- **Fuori stagione**: 3 sedute (forza di base e ipertrofia se serve, cerniera, spinte/tirate, pliometria poche ripetizioni). **Pre-stagione**: 2-3 sedute, potenza e velocità. **In stagione**: 1 seduta di 30-40 min (1-2 sollevamenti pesanti da 2-3 serie, tirate/spinte, core), mai nelle 48 h prima della gara; se i giorni sono 2, la seconda è leggera (Conv †; Rønnestad 2011 †).
- **Metriche**: salto in piedi (misurato con uno smartphone o con un segno al muro), ripetizioni sui sollevamenti chiave, RPE, dolore.
- **Cosa non fa**: tecnica dello sport, tattica, programmi di gara; per sport di combattimento solo forza e condizionamento generale (Conv †).

### 5.4 «Schiena, collo e spalle» (postura e lavoro d'ufficio)

- Non è terapia: l'app non diagnostica e non cura (cap. 14, COR-03). Linguaggio: «mi muovo meglio e con meno fastidio»; mai «correggo la postura».
- **Settimana**: camminata quotidiana 20-30 min (anche 2 x 15), 2-3 sedute di 20-30 min (cerniera dell'anca con peso leggero, rematori e tirate, ponte dei glutei, plank laterale e bird dog come opzione a basso rischio, dolore ≤3/10), 1-2 pause di movimento da 2-5 min per ogni ora seduti (Conv †). Il tipo di esercizio conta poco (Hayden 2021, Solida [R]): vince quello che la persona fa.
- **Metriche**: dolore medio e massimo della settimana (0-10), 3 attività a scelta (sedersi 30 min, sollevare un oggetto, dormire) con punteggio 0-10, sedute fatte.
- **Arresto e rinvio** (da `ricerca-recupero-infortuni-popolazioni.md` 5.4): dolore notturno, trauma, formicolii o debolezza improvvisa, febbre, perdita di peso inspiegata, dolore che peggiora per 2 settimane: professionista; l'app non propone esercizi finché l'utente non ha detto che il dolore è tornato sotto 3/10.

### 5.5 Mantenimento (fase dopo il calo o dopo un ciclo)

- 2 sedute FB da 30-45 min, serie al 1/3-1/2, **carichi e RIR invariati** (Mod † Bickel 2011), 150 min di movimento o ~7.000 passi; verifica ogni 4 settimane di peso (tendenza), vita, e1RM. Se il peso sale >1% in 4 settimane: più camminata o pasti più semplici (informazione, non prescrizione). Evidenza: Moderata †.

### 5.6 Altri obiettivi ovvi (lista, senza programma qui)

- **Longevità**: alias di «Salute e forma» con test per autonomia (5 alzate dalla sedia, equilibrio su un piede, presa) e aerobico in 150-300 min; per over 65 vedi nota popolazioni.
- **Umore, stress e sonno**: **scheda informativa**, non obiettivo da programma (OBI-17). Camminata regolare, pesi 2 volte/sett., attività intensa non a ridosso del coricarsi (Singh 2023 †, Stutz 2019 †). Mai promettere di curare depressione o ansia; sintomi persistenti: medico.
- **Rientro dopo infortunio e dopo pausa**: già in `ricerca-recupero-infortuni-popolazioni.md` (CAR-04, RIC-05, rampe 5.3).
- **Gravidanza**: nota «donne» (parallela).

## 6. Audit delle regole esistenti

Esito: **Giusto** (coerente con le fonti viste), **Non supportato** (nessuna fonte vista; può essere Convenzione ragionevole), **Da correggere** (in contrasto o incoerente), **Mancante**.

| # | Regola / punto (file) | Oggi | Evidenza | Esito | Intervento |
|---|---|---|---|---|---|
| A1 | `ONB_GOALS.dimagrimento` descrizione «forza + cardio, ripetizioni medio-alte» (`onboarding.js:23`) | Dice «ripetizioni medio-alte»; il generatore dà 8 sui pesanti e 12 su macchine/isolamenti | Per salvare il muscolo si tengono i carichi e l'intensità (Murphy e Koehler [V] + pratica); le alte ripetizioni non servono | **Da correggere** (testo) | OBI-06 |
| A2 | Volume uguale per massa e dimagrimento (`VOLUME_LIVELLO`, `schemi.js:41`; `ricette.js:282`) | Solo `salute` ha 6-12; dimagrimento = 10-14 (interm.) | Un RCT: 3 e 5 serie danno lo stesso mantenimento di massa magra [V]; nel deficit il recupero cala (Conv) | **Non supportato** (spingere il volume in deficit) | OBI-04 |
| A3 | Esigenza di partenza 120% (`esigenzaIniziale`, `intensita.js:68`; ESI-01) | Vale anche in deficit; una sola riga per tutti gli obiettivi | Nessuna fonte per +20% in deficit; sopra i 65 e PAR-Q già esclusi (ESI-03) | **Non supportato** per `dimagrimento` | OBI-04 |
| A4 | RIR per obiettivo (`rirBersaglioBase`, `regole-ricerca.js:62`) | Non legge l'obiettivo: `RIR_TIPO` (pesante 1-3, macchina 0-2, isolamento 0-1) per tutti; `schemeFor('salute')` dice 2-3 RIR, `schemeFor('forza')` dice 3-5 RIR | Il testo cita ACSM 2026 e Robinson 2024 [R]; il codice no | **Da correggere** (testo e codice si contraddicono) | OBI-03 |
| A5 | Fase del corpo dal primo obiettivo (`faseCorpo`, `peso.js:27`; `corpoCoach`, `repertorio.js:222`) contro `ricette.js:384` (qualunque posizione) | Per [forza, dimagrimento]: la scheda Peso e il pannello coach parlano di mantenimento (passi 6-8 mila), il programma di 10-12 mila | Coerenza interna | **Da correggere** | OBI-02 |
| A6 | Flag `cardio` e nota passi (`motore.js:111`, `onboarding-risultato.js:28`, `ricette.js:384`) | Un testo di 15-20 min dopo la seduta; passi 10-12 mila (Conv, non verificato); nessun obiettivo settimanale in minuti | OMS 150-300 [R]; ACSM 2009 † per il peso; passi 7.000 [R] | **Non supportato** (10-12 mila) / **Mancante** (minuti per obiettivo) | OBI-05, AER-04 [R] |
| A7 | Frase «Il cardio non toglie muscolo» (`ricette.js:384`, `repertorio.js:243`) | Assoluta | Vale per ipertrofia e forza massimale, non per la forza esplosiva [R] | **Da correggere** | AER-03 [R] |
| A8 | `ricomposizione`: solo COR-02 (`repertorio.js:233`) | «Realistica» se principiante o grasso >25/32%; altrimenti «fasi separate»; nessuna misura, nessun orizzonte, niente chi riprende dopo pausa | Barakat 2020 † (ripresa e sovrappeso); soglie non verificate | **Non supportato** (soglie) / **Mancante** (vita, tempi) | OBI-08 |
| A9 | `schemaMisto`: `tettoSerie` 4 se il secondo è ricomposizione o salute (`motore.js:107-110`) | Taglia le serie per esercizio dei piani di forza o massa a 4 | Nessuna fonte; innocuo sulla massa (4x10 già) | **Non supportato** (arbitrario) | Rivedere in OBI-12 |
| A10 | Nessun controllo di conflitto fra obiettivi (`onbToggleGoal`, `onboarding.js:183`) | Massa + dimagrimento si può scegliere; produce 4x10 con nota cardio e testi contrastanti | Bilancio energetico opposto [V Murphy e Koehler] | **Mancante** | OBI-01 |
| A11 | COR-03 salute «tra 30 e 60 minuti di pesi si hanno i massimi benefici» (`repertorio.js:245`) | Citata come fatto | Sembra derivare da Momma 2022 † (associazione con la mortalità, osservazionale) | **Non supportato** in questa sessione | Riformulare con la fonte (OBI-05) |
| A12 | Glutei (`PRG-22`, `ricette.js:233`) | 4 famiglie 3x12 a 75 s; 9-15 serie settimanali dichiarate | Coerente con 10-20 serie/gruppo [R]; thrust e squat simili per i glutei (Plotkin 2023 †, non verificato) | **Giusto** (Conv) | Aggiungere metriche (OBI-09) |
| A13 | `salute` volume 6-12 (`ricette.js:282`) e `tettoSerie` | Con OMS ≥2 giorni e tutti i gruppi; 3x10 | Coerente con ACSM 2026 e OMS [R] | **Giusto** | RIR in A4 |
| A14 | Nessun obiettivo di mantenimento (`nuovoCiclo`, `repertorio.js:409`) | Dopo il ciclo: buono = stesso schema; stallo = alterna forza/ipertrofia; aderenza = un giorno in meno | Bickel 2011 †, ACSM 2009 † | **Mancante** | OBI-11 |
| A15 | Prime 4 settimane: rampa RIR solo per avanzati; scarico alla 4ª sett. per principianti (`ricette.js:386-394`, `motore.js:15`) | Un solo modello per livello | Convenzione (nota metodi 5.4: Contrastata sullo scarico) | **Mancante** (per obiettivo) | OBI-10 |
| A16 | Metriche per obiettivo (`js/ui/progressi/`) | Peso e BIA, e1RM, strain; nessun legame con l'obiettivo, nessuna vita, nessuna misura di salute | Convenzione | **Mancante** | OBI-09 |
| A17 | Obiettivi non offerti: corsa, abilità, sport, schiena, mantenimento, umore e sonno | - | vedi §5 | **Mancante** | OBI-13..17 |
| A18 | Realismo e tempi (`onboarding-risultato.js`) | Nessun orizzonte né ranges per obiettivo; la nota passi dà numeri | Foster 1997 †; ESSA [R] | **Mancante** | OBI-18 |
| A19 | `ONB_GOALS` etichette: nessun «Tonificare» | Chi cerca «tonificare» sceglie a caso fra 6 voci | Conv | **Mancante** (linguaggio) | OBI-07 |
| A20 | Strain e cardio (`strainSettimane`, `repertorio.js:156`) | Il cardio non entra nello strain | [lacuna segnalata nell'analisi delle lacune del coach, sezione cardio; il file non è nel repo] | **Mancante** (per corsa) | OBI-13 |

## 7. Regole proposte

Procedura: `ricerca-fitness` sez. 8 e cap. 19 di `coach-mappa-regole.md`. Tutte **spegnibili** (`REGOLE_SPEGNIBILI`, `js/coach/parametri.js:31`), attive solo con `coachAttivo()`, **annullabili** dove cambiano il piano, con le salvaguardie (PAR-Q, over 65, principianti, dolore, scarico) sempre prioritarie. **Nessuna riga è implementata.** Le righe con forza «†» richiedono una verifica prima del codice. File nuovi: riga in `index.html` + `npm run sw` + `CACHE_NAME` a mano; frasi nuove anche in `js/lingue/en|es|de.js`.

| Codice | Quando scatta | Cosa fa | Motivo (testo italiano per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **OBI-01** Conflitto massa + dimagrimento | Primo passo dell'onboarding con `massa` e `dimagrimento` insieme | Avviso non bloccante: propone ricomposizione o due fasi (ordine suggerito dalla massa grassa BIA); se conferma entrambi, il primo guida e il secondo diventa una nota | «Costruire muscolo e perdere grasso insieme funziona bene se inizi o riparti, molto meno se sei già allenato: hanno bisogno di cose opposte. Scegli una fase alla volta o la ricomposizione.» | Moderata (Murphy e Koehler [V]; Barakat 2020 †) | Non blocca; nessun cambio di piano senza conferma | `js/ui/onboarding.js` (`onbToggleGoal`, riga ~258) |
| **OBI-02** Fase del corpo da tutti gli obiettivi | Ogni lettura della fase (peso, pannello coach, nota passi) | Una sola funzione che dà `deficit`/`massa`/`mantenimento`/`ricomposizione` guardando **tutti** i goal (con la priorità di OBI-01) e usata ovunque | «Stesse indicazioni su passi e ritmo in tutta l'app.» | Convenzione (coerenza interna) | Basso; test su [forza, dimagrimento] | `js/coach/repertorio.js:222`, `js/ui/progressi/peso.js:27`, `ricette.js:384` |
| **OBI-03** RIR dichiarato = RIR usato | Sempre (nuova lettura dell'obiettivo in `rirBersaglioBase`) | `profiloCoach()` espone `goals`; `salute` = [2,3] su tutti i tipi (come il testo ACSM 2026); `forza` sui pesanti [2,4] (come il testo 3-5 RIR) tranne AMRAP/test; `dimagrimento` minimo RIR 1 sugli isolamenti e 2 nei primi 4 giorni di deficit | «Lasci qualche ripetizione in riserva: il progresso è uguale con meno rischio e meno fatica.» | Moderata (ACSM 2026, Robinson 2024 [R]; deficit: Conv) | Cambia i bersagli di `caricoProssimo` (avvolto 3 volte): test in `tests/browser/regole-nuove.js`; spegnibile; la progressione per RPE corregge in 1-2 sedute | `js/coach/regole-ricerca.js:38,50,62` |
| **OBI-04** Niente +20% in deficit | `goals[0]==='dimagrimento'` o `fase==='deficit'` (non cauto) | `esigenzaIniziale` ≤1,00; volume nella metà bassa del range per le prime 4 sett.; nessuna nota «Coach esigente» | «Mentre mangi meno recuperi più lentamente: l'obiettivo dei pesi è tenere i carichi e il muscolo, non fare di più. Uno studio su allenati ha visto lo stesso mantenimento con 3 o con 5 serie.» | Convenzione + Moderata (un RCT [V]) | Basso; ESI-03 già esclude prudente e over 65 | `js/coach/intensita.js:68`, `ricette.js:282-290` |
| **OBI-05** Cardio settimanale per obiettivo | Pannello «Corpo e alimentazione» e scheda Cardio, tutti gli obiettivi | Riga con il bersaglio dell'obiettivo (salute 150-300; dimagrimento 150 verso 250-300; massa/ricomposizione 90-150; forza 60-150) e i minuti registrati; nessun semaforo; estende AER-01..04 [R] | «L'OMS indica 150-300 minuti a settimana di attività aerobica moderata (anche camminare conta). Sono riferimenti, non obblighi: parti da dove sei.» | Solida (OMS) per salute; Moderata † per dimagrimento (ACSM 2009); Convenzione per massa/forza | Rischio di esercizio compensatorio: niente calorie bruciate, niente serie di giorni, niente cifre se compaiono i segnali DCA [R] | `js/coach/repertorio.js` (`corpoCoach`), `js/ui/allenamento/termina-e-cardio.js` |
| **OBI-06** Miti: zona brucia-grassi, localizzato, EPOC | Obiettivo dimagrimento, ricomposizione o glutei; una volta nel risultato dell'onboarding | Sostituisce «ripetizioni medio-alte» con «carichi tenuti»; aggiunge 2 frasi informative | «Non esiste una zona magica: conta quanto riesci a fare con costanza. Il grasso non si perde solo dove alleni: gli addominali rinforzano il core, la pancia scende col bilancio di tutto il corpo (non è dimostrato il contrario).» | Moderata (HIIT≈continuo [V]); localizzato: Contrastata | Basso; dire «non dimostrato», non «impossibile» | `js/ui/onboarding.js:21-27`, `onboarding-risultato.js`, `ricette.js:384` |
| **OBI-07** «Tonificare» | Schermata obiettivi | Sottotitolo di `ricomposizione`: «più muscolo, meno grasso: quello che molti chiamano tonificare»; testo: «pesi leggeri e tante ripetizioni non tonificano di più: conta avvicinarsi alla fatica» | «Tonificare significa avere un po' più di muscolo e meno grasso. Per farlo servono pesi progressivi, non solo tante ripetizioni.» | Moderata † (ACSM 2026 [R]; Schoenfeld 2017 †) | Nessuno; solo linguaggio | `js/ui/onboarding.js:21-27`, `js/lingue/*` |
| **OBI-08** Ricomposizione: criteri e orizzonte | Obiettivo ricomposizione | COR-02 considera anche «ripresa dopo pausa ≥8 sett.» e mostra l'orizzonte (12-16 sett.), la vita come misura e che il peso può restare fermo | «Con la ricomposizione la bilancia può restare uguale: guarda la vita, le foto e la forza ogni 4 settimane.» | Moderata † / Convenzione | Basso | `js/coach/repertorio.js:233-238`, `js/ui/progressi/peso.js` |
| **OBI-09** «Cosa tracciare» per obiettivo | Pannello Progressi, tutti gli obiettivi | Scheda con le 3-4 metriche di §3.4 e verifica a 4/8/12 sett.; input facoltativi (vita, test di salute, dolore 0-10) | «Per questo obiettivo contano queste misure. Il peso da solo non basta.» | Convenzione | Dati sensibili: salvare solo sul telefono (come il resto) | nuovo `js/ui/progressi/obiettivo.js` (+ `index.html`, `npm run sw`), `js/core/storage.js` |
| **OBI-10** Prime 4 settimane per obiettivo | Nuovo programma (tutti i livelli) | Rampa di RIR e volume per settimana (RIR 3→2, volume 70→100%) invece della sola rampa per avanzati; coordinata con INT-04 e con lo scarico alla 4ª settimana | «Le prime settimane servono a imparare e a non esagerare: poi sale.» | Convenzione (nota metodi 5.4) | Sovrapposizione con INT-04 e PRG-01: test | `js/coach/programma/ricette.js:386-394`, `motore.js:15-25` |
| **OBI-11** Mantenimento | Fine ciclo di dimagrimento, o obiettivo di peso raggiunto, o scelta manuale | `nuovoCiclo` propone 2 sedute con 1/3-1/2 delle serie e carichi invariati | «Per tenere ciò che hai ottenuto servono meno sedute di quelle per costruirlo, ma i carichi restano alti.» | Moderata † (Bickel 2011; ACSM 2009) | Basso; non per chi ha segnali DCA | `js/coach/repertorio.js:409`, `onboarding.js:96` (`schemeFor`) |
| **OBI-12** Priorità tra obiettivi | Generazione con 2-3 obiettivi | Codifica P1-P6: dimagrimento secondario → OBI-04; forza+dimagrimento → forza-primo, RIR ≥2; `tettoSerie` 4 solo dove serve (rivedere A9) | «Il primo obiettivo guida; gli altri cambiano un dettaglio.» | Convenzione | Test su 6 coppie | `js/coach/programma/motore.js:104-113` |
| **OBI-13** Obiettivo «Correre 5K» | Nuovo goal in `ONB_GOALS` | Piano 8-12 sett. della tabella 3.3 + 2 sedute di forza da 30-45 min; collocazione corsa/pesi; cardio nello strain | «Corri poco e spesso: prima il tempo, poi la distanza. Due sedute di forza a settimana ti aiutano a correre meglio e a infortunarti meno (le ricerche sono in parte da verificare).» | Convenzione (corsa); Moderata † (forza) | Infortuni da corsa: arresto a dolore ≥4/10; PAR-Q positivo o over 65: solo camminata | nuovo `js/coach/programma/corsa.js` (+ `index.html`, `npm run sw`), `ricette.js`, `repertorio.js:156` |
| **OBI-14** Obiettivi di abilità | Nuovo goal «Abilità» con scelta di una | Scala di gradini con criterio di passaggio; test ogni 2 sett.; sedute brevi | «Un gradino alla volta: quando fai 3 serie pulite, passi al successivo.» | Convenzione | Dolore articolare: scala indietro | nuovo `js/dati/progressioni-abilita.js`, `ricette.js` |
| **OBI-15** «Schiena, collo e spalle» | Nuovo goal | Programma 5.4; dolore 0-10; blocca con segnali di allarme | «Muoverti con regolarità e fare esercizi di forza aiuta il mal di schiena di lunga durata; non esiste una postura perfetta.» | Solida (esercizio per mal di schiena cronico [R]); postura: Moderata † | Non è una terapia: rinvio al medico (cap. 14; 5.4) | `onboarding.js`, `biomeccanica.js` (`SCALE_DOLORE`), `ricette.js` |
| **OBI-16** Sport e stagione | Nuovo campo `fase_stagione` | Frequenza e volume per fuori/pre/in stagione (5.3) | «In stagione bastano 1-2 sedute brevi per tenere la forza: tieni i carichi e riduci le serie.» | Convenzione † | Non nei 2 giorni prima della gara; nessun deficit forte in stagione | `motore.js:15` (`strutturaProgramma`), nuovo campo profilo |
| **OBI-17** Umore, stress e sonno | Nella scheda Corpo e nella notte di sonno scarso | Scheda informativa; nessun obiettivo | «Muoversi con regolarità aiuta umore e sonno (ricerche in gran parte da verificare). Se ti senti giù da tempo, parlane con il medico.» | Moderata † | Mai promettere cure; sintomi persistenti: medico | `js/coach/repertorio.js` (`corpoCoach`), `prontezza.js` |
| **OBI-18** Realismo degli obiettivi | Risultato dell'onboarding | Mostra orizzonte e intervalli («di solito servono 8-12 settimane per iniziare a vedere») e nessuna data precisa verso il peso (coerente con DCA-02 [R]) | «I cambiamenti reali sono più lenti di quelli promessi: la costanza vale più dell'intensità.» | Moderata † (Foster 1997; ESSA [R]) | Nessuno | `js/ui/onboarding-risultato.js`, `progressi/peso.js` |

## 8. Domande aperte

1. **Dose di cardio e passi per il dimagrimento** con pesi in deficit (ancora aperta in `ricerca-cardio-nutrizione.md` 6.1): quale compensazione (NEAT) negli allenati?
2. **Volume e frequenza nel deficit nelle donne** e negli allenati intermedi: il RCT 3 contro 5 serie vale solo per uomini allenati; serve un secondo studio.
3. **Ricomposizione**: quali soglie (grasso, pausa, sovrappeso) separano «fattibile» da «fasi separate»? Verificare Barakat 2020 e studi su chi riprende.
4. **«Tonificare»**: cosa intendono le persone (studi qualitativi) e quali etichette funzionano; verificare Schoenfeld 2017, Lopez 2021, Roberts 2020.
5. **Ritmo di crescita muscolare per anni di allenamento** (McDonald, Aragon, Iraki 2019): oggi solo modelli di pratica.
6. **Longevità**: leggere Mandsager 2018, Kodama 2009, Momma 2022, Leong 2015 (e le coorti di Kokkinos, non cercate) e verificare i numeri citati con †; le posizioni di Attia e dei critici (Baraki) sono **da verificare**: nessun testo letto.
7. **Corsa**: efficacia di Couch to 5K e dei programmi graduali; dose di forza per corridori (Rønnestad e Mujika 2014, Berryman 2018, Blagrove 2018, Llanos-Lagos 2024 se esiste); pliometria sicura per principianti.
8. **Sport**: mantenimento in stagione (1 contro 2 sedute), periodizzazione (Williams 2017), sport di combattimento.
9. **Postura e dolore**: Slater 2019, Gross 2015 (collo), studi sulle pause di movimento; è corretto dire «non dimostrato» per l'effetto della postura?
10. **Mente e sonno**: Singh 2023, Noetel 2024, Gordon 2018, Kredlow 2015, Stutz 2019: dose, intensità e tipo; verificare gli ordini di grandezza usati.
11. **Abilità**: nessuno studio sulle scale di trazione o sui piegamenti; serve almeno una revisione sulla progressione calistenica; flessibilità: Afonso 2021 e dose-risposta (Thomas 2018).
12. **Mantenimento**: dose minima (Bickel 2011), differenze per età; ACSM 2009 sulle dosi per mantenere il peso.
13. **Decisioni di prodotto** (non di ricerca): aggiungere nuovi obiettivi (corsa, abilità, sport, schiena) cambia la promessa dell'app (palestra e pesi); fino a dove va il coach? E il PAR-Q basta per la corsa?
14. **Pareri di esperti** (Helms, Nuckols, Henselmans, Israetel, Norton, Galpin, Attia, Baraki): **non cercati**; nessuna frase è attribuita a loro con parole mie.
15. **Verifiche del codice** prima di toccare `rirBersaglioBase` (A4): effetto sui test di `caricoProssimo` e su CAR-06/CAR-14.

## 9. Limiti onesti

- **Copertura**: 8 ricerche web riuscite su ≥35 richieste (tetto di sessione esaurito). Più di due terzi dei temi sono scritti da conoscenza del modello e marcati †: possono contenere errori di autore, anno e ordine di grandezza.
- **Solo riassunti** di WebSearch: nessun full text, nessun intervallo di confidenza oltre a quelli scritti; riassunti anche imprecisi (es. unità dell'EPOC; la «compensazione 18% ± 93%» non attribuita; data dello studio sul volume nel deficit).
- **Popolazioni**: Murphy e Koehler non dà popolazione nel riassunto; il RCT 3 contro 5 serie è su 38 maschi allenati, breve; gli altri studi su anziani obesi non si estendono.
- **Titoli senza dati**: PMC13341414, PMC7739314 (esito numerico), PMC8038840, PMC8290478 sono solo titoli.
- **Dissensi** non risolti: spot reduction, ricomposizione, surplus, zona 2.
- **Conflitti di interessi**: Attia e altri coach vendono libri, programmi o app; nessuna delle loro idee qui è usata come prova.
- **Le regole OBI** sono proposte da valutare: nessuna è implementata; le righe con forza † richiedono una nuova passata con il tetto alzato (Appendice B).

---

## Appendice A. Registro delle 8 ricerche riuscite

Filtro P = `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`, `link.springer.com`. Il tetto condiviso di 200 ricerche è stato raggiunto dopo la 8ª: le altre non sono state tentate (nessun aggiramento).

| N | Query (abbreviata) | Filtro | Esito utile |
|---|---|---|---|
| 1 | energy deficiency impairs RT gains lean mass but not strength meta-analysis | P | Titolo Murphy e Koehler (nel riassunto, non nei link), PMC13341414, PMC5867436, Sports Med Open 2023 sui surplus, Eur J Appl Physiol 2022 sul volume nel deficit |
| 2 | RT during caloric restriction lean mass retention trained, volume | P | PMID 36114738 (3 contro 5 serie, n=38), PMC7739314, PMC5946208 (93,5%), PMC12323239, PMC11926902 |
| 3 | aerobic vs resistance vs combined fat mass meta-analysis | P | PMC12107660, PMC11989159, PMC3544497, PMC10823366, PMC13471668 |
| 4 | HIIT vs MICT body fat meta-analysis Wewege Viana | P | Wewege 2017 (31 studi, 873 partecipanti), PMC10624584, PMID 31248869 (expression of concern), PMC10048683 |
| 5 | spot reduction localized fat loss | P | PMC10680576 / 38010201, PMID 25766455, PMC7849939, PMC8038840 |
| 6 | fat burning zone Fatmax long-term | P | PMC7663534, PMC8290478, PMC6796612, PMC6683615 |
| 7 | EPOC contribution to weight loss | P | PMC11035584, PMC12567725, PMID 34567357, PMC13348478 |
| 8 | exercise compensation constrained energy NEAT | P | PMC3696411, PMC4446773, PMC6230893, PMC8441008, PMC4561833, PMC10176969 |

## Appendice B. Query pronte per la seconda passata (tetto alzato)

Filtro consigliato: `pubmed.ncbi.nlm.nih.gov`, `pmc.ncbi.nlm.nih.gov`, `link.springer.com`; per i pareri di esperti: un sito alla volta (`strongerbyscience.com`, `mennohenselmans.com`, `rpstrength.com`, `biolayne.com`). Regola: ogni numero in 2 fonti indipendenti; poi cercare il dato opposto.

Dimagrimento
1. `resistance training energy deficit lean mass resistance-trained women randomized`
2. `daily steps weight loss intervention fat mass meta-analysis`
3. `ACSM position stand appropriate physical activity intervention strategies weight loss prevention of weight regain`
4. `National Weight Control Registry physical activity patterns`
5. `MATADOR intermittent energy restriction Byrne 2018` e `ICECAP diet break resistance-trained Peos`
6. `HIIT versus MICT body fat meta-analysis equated energy expenditure 2024`
7. `Fatmax training versus high intensity interval randomized fat mass equated energy`
8. `localized fat loss regional adiposity exercise systematic review`
9. `EPOC magnitude resistance exercise kilocalories 24 hours review`
10. `adaptive thermogenesis weight loss athletes review Trexler`
11. `unrealistic weight loss expectations Foster 1997 obesity treatment`

Ricomposizione, tonificare, massa, glutei
12. `body recomposition resistance-trained Barakat 2020`
13. `body recomposition detrained returning lifters older adults protein resistance training`
14. `low-load versus high-load resistance training hypertrophy meta-analysis Schoenfeld 2017` e `Lopez 2021 load network meta-analysis`
15. `women toned body muscular definition perception qualitative study`
16. `sex differences muscle hypertrophy relative gains Roberts 2020 meta-analysis`
17. `energy surplus hypertrophy Slater 2019` e `small versus large energy surplus resistance-trained 2023 results`
18. `rate of muscle gain training status natural lifters`
19. `hip thrust versus back squat gluteus maximus hypertrophy randomized Plotkin 2023`
20. `gluteus maximus hypertrophy weekly volume frequency`

Salute e longevità
21. `muscle-strengthening activities mortality meta-analysis Momma 2022`
22. `cardiorespiratory fitness long-term mortality Mandsager 2018` e `Kodama 2009 meta-analysis cardiorespiratory fitness all-cause mortality`
23. `grip strength mortality Leong 2015 PURE`
24. `Attia centenarian decathlon zone 2 VO2max Outlive critique` (nessun filtro; solo per mappare) e `barbellmedicine.com zone 2 longevity`
25. `minimum effective dose resistance training time-efficient Iversen 2021`
26. `4x4 interval training VO2max healthy adults Helgerud`
27. `older adults resistance training power sit-to-stand` (nota età)

Resistenza e sport
28. `strength training running economy meta-analysis Berryman 2018`, `Blagrove 2018 systematic review middle long distance`, `Llanos-Lagos 2024 runners`
29. `heavy strength training cyclists Rønnestad concurrent`
30. `plyometric training meta-analysis performance athletes de Villarreal Stojanović`
31. `in-season strength training frequency maintain strength soccer players`
32. `periodization strength meta-analysis Williams 2017` e `block periodization review Issurin`
33. `combat sports strength and conditioning systematic review`
34. `Couch to 5K evidence` e `graded training programme novice runners injuries Buist 2008`
35. `running injury novice progression 10 percent rule evidence`

Schiena, postura, lavoro d'ufficio
36. `posture and pain systematic review sit up straight re-evaluate`
37. `exercise for mechanical neck disorders Cochrane Gross 2015`
38. `workplace strength training neck shoulder pain office workers Andersen randomized`
39. `breaking up prolonged sitting meta-analysis cardiometabolic`
40. `graded activity graded exposure chronic low back pain randomized`
41. `Hayden 2021 exercise therapy chronic low back pain Cochrane` (conferma)

Mente e sonno
42. `Singh 2023 physical activity depression anxiety distress overview of reviews`
43. `Noetel 2024 exercise depression network meta-analysis BMJ`
44. `Gordon 2018 resistance exercise depressive symptoms meta-analysis`
45. `Kredlow 2015 exercise sleep meta-analysis` e `Stutz 2019 evening exercise sleep`

Abilità e mantenimento
46. `pull-up training progression randomized eccentric assisted`
47. `strength training versus stretching range of motion meta-analysis`
48. `stretching dose frequency range of motion Thomas 2018`
49. `greasing the groove submaximal frequency pull-up study`
50. `Bickel 2011 exercise dosing retain resistance training adaptations`

Esperti (solo per mappare, mai come prova)
51. `strongerbyscience.com cutting training volume intensity deficit`
52. `mennohenselmans.com cardio fat loss steps`
53. `rpstrength.com training volume dieting`
54. `biolayne.com training while dieting`
