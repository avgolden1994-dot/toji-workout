# Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche)

Copertura: 37 ricerche web riuscite; il resto da conoscenza del modello.

Ambito: schede e metodi dei coach più seguiti (Renaissance Periodization, Nippard, Helms, Henselmans, Stronger By Science, Wendler, GZCL, nSuns, Candito, Sheiko, RTS, Barbell Medicine, PHUL/PHAT, Starting Strength e simili, Lyle McDonald, Dan John, Pavel, Cressey, Thibaudeau, Beardsley, calisthenics) e le **euristiche di decisione** che usano (come scelgono lo split, gli esercizi, come gestiscono stalli, scarico, principianti, tempo poco). Tocca le aree PRG (cap. 5), MET/EPO (cap. 6), CAR/STA/RIC (cap. 8, 10, 11, 19) di `docs/coach-mappa-regole.md`. Le schede dell'epoca d'oro, le regole ABB e INT **non sono rifatte** (sono in `docs/ricerca-struttura-e-intensita.md`). Codice area delle regole proposte: **PCO** (pratiche dei coach; verificato libero con grep su docs/ e js/).

Data della ricerca: 2026-10-05. Forza dell'evidenza come in `ricerca-struttura-e-intensita.md`: **Solida** / **Moderata** / **Convenzione**, più la bandiera **Contrastata**. Regola di questa nota: quasi tutto ciò che dicono i coach è **Convenzione** (pratica o opinione senza prova diretta); sale di grado solo dove ho visto uno studio. Tutto ciò che viene da video, podcast, siti di terzi è «riportato da ..., da verificare».

**Limite di rete e di budget (leggi prima):** in questa sessione WebSearch è l'unico canale (rete.md) e il contatore di sessione (200 ricerche) si è esaurito dopo **37 ricerche riuscite**; le ultime 4 sono state rifiutate dallo strumento. Quindi **non coperti da ricerca nuova**: donne contro uomini, over 65, pause tra le serie oltre al già noto, «junk volume», velocità di sovraccarico progressivo, consenso sullo scarico (Bell 2024), struttura esatta di diversi programmi (Starting Strength, StrongLifts, Texas Method, Westside e altri), PPL di Nippard. Per questi temi la sezione 1.3, la sezione 2.20 e le regole H-36..H-50 usano la **«Conoscenza del modello (non verificata sul web)»**, con forza Convenzione o Moderata (da verificare); dove non ricordo un dettaglio con sicurezza lo scrivo come incerto e non lo invento. Le query per verificarle sono nell'**Appendice A**.

**Colonna «Origine» (usata dove serve):** **Web** = visto nei risultati di WebSearch di questa sessione (riassunti di siti di terzi, titoli di studi); **Repo** = già documentato in `docs/` o nel codice di 3in; **Modello** = Conoscenza del modello (non verificata sul web). Nessuna citazione di persone, DOI o numeri precisi è stata aggiunta senza averla vista.

## 1. Cosa dicono le fonti

### 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato)

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Cedimento o no | Meta-analisi di 15 studi: allenarsi a cedimento di serie contro non cedimento dà un vantaggio **banale** sulla massa, effetto 0,19 (IC 95% 0,00-0,37). Coerente con ACSM 2026 e Grgic 2022 già nel repo | Solida | Refalo 2023 (PMC9935748, 15 studi; rivista non mostrata nei risultati) |
| Cedimento o RIR, allenati | Titolo visto: 8 settimane, ipertrofia simile tra cedimento muscolare e ripetizioni in riserva in persone allenate. Solo titolo, n e effetto non visti | Moderata (RCT singolo) | PubMed 38393985 (titolo) |
| Dose minima, forza | 1 serie a esercizio, 1-3 volte a settimana, 6-12 ripetizioni circa al 70-85% di 1RM con sforzo alto, 8-12 settimane: aumenti **significativi** di 1RM in uomini già allenati. Riassunto di terzi: media circa 12 kg, squat circa 17, panca circa 8 (non letto nell'originale). «Subottimale ma reale». Solo forza, solo uomini allenati | Moderata | Androulakis-Korakakis e altri (PMID 31797219; rivista e anno non mostrati nei risultati) |
| Variare gli esercizi | RCT con 21 uomini allenati, 8 settimane, 4 sedute a settimana, 3 serie x 6 esercizi: esercizi fissi contro esercizi cambiati a caso a ogni seduta. Stesso guadagno di forza (panca, squat) e di spessore muscolare (vasto laterale, retto femorale); **più motivazione** con la variazione | Moderata (n piccolo, uomini) | Baz-Valle 2019 (PMC6934277) |
| Variare, altri titoli | Titoli visti senza esito: «Muscle hypertrophy and strength adaptations to systematically varying resistance exercises» (PMID 39388663); «Does varying resistance exercises for the same muscle group promote greater strength gains?» (PMID 35481889); «Changes in exercises are more effective than in loading schemes to improve muscle strength» (PMID 24832974) | da leggere | PubMed (solo titoli) |
| Pause tra le serie | Titolo visto: revisione sistematica con meta-analisi bayesiana sull'effetto della pausa tra le serie sull'ipertrofia (conferma l'esistenza di Singer 2024, già nel repo con >60 s piccolo vantaggio e oltre 90 s nessuna differenza) | Moderata (già nel repo) | PubMed 39205815 (titolo) |
| Volume e frequenza | Titolo visto: meta-regressioni su volume settimanale e frequenza per ipertrofia e forza (la base di Pelland 2025, già nel repo) | Solida (già nel repo) | Pelland (titolo, ResearchGate) |
| Periodizzazione | Titoli visti: confronto lineare contro ondulata giornaliera sull'ipertrofia (PMC5571788) e mini-revisione sulla periodizzazione per ipertrofia e forza (PMC6351492); RPE contro %1RM in programmi pari per serie e ripetizioni (PMC5877330). Esiti non visti | da leggere | PMC (solo titoli) |
| Stretching dopo l'allenamento | Titolo visto: revisione sistematica con meta-analisi di RCT su stretching a fine seduta e recupero di forza, mobilità e dolenzia; **rischio di bias alto in circa il 70% degli studi**. Il riassunto ottenuto parla di meno dolenzia con lo stretching, ma con qualità degli studi bassa; l'esito vero non l'ho letto | Convenzione | PMC8133317 (rivista, anno e autori non confermati dai risultati) |
| Riscaldamento RAMP | Il quadro Raise-Activate-Mobilise-Potentiate è di Jeffreys (2007): è un modello di pratica, non un esito di trial. Un sito di terzi cita «meta-analisi 2023 di 14 RCT: -20% infortuni con RAMP»: **non ritrovata, da non usare** | Convenzione | Jeffreys 2007 (Professional Strength and Conditioning 6, 12-18; titolo) |
| Split contro full body | Titolo visto: RCT split contro full body in donne non allenate (PMC9107721). Esito non visto: domanda aperta (donne) | da leggere | PMC9107721 (titolo) |

### 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»)

I riassunti sono di siti di terzi (Lift Vault, Boostcamp, Legion, Coachway, siti di app): **mai il testo dell'autore**. Per tutti la forza è Convenzione salvo dove scritto.

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Volume per muscolo, RP | Quattro «landmark»: MV (mantenere) circa 6 serie a settimana con almeno 2 sedute; MEV (minimo per crescere) 6-8 serie per i più; MAV 12-18; MRV 20-25 e oltre. Tabella per muscolo su siti di terzi: petto MEV 8 / MAV 12-20 / MRV 22+; schiena 8 / 12-20 / 25+; spalle 6 / 12-20 / 25+; bicipiti 6 / 10-16 / 20+; tricipiti 4 / 8-14 / 18+; quadricipiti 6 / 10-18 / 20+; femorali 4 / 8-14 / 16+; glutei 4 / 8-16 / 20+. Per livello: principiante verso 8-12, intermedio 12-18, avanzato 18-22 | Convenzione (euristica; rete.md: non esiti di studi) | Riportato da Israetel/RP (rpstrength.com, riassunti di terzi), da verificare |
| Mesociclo, RP | 4-6 settimane di accumulo (serie in aumento di settimana in settimana, intensità in lieve salita: «volume prima») e poi una settimana di scarico. RIR 3, 2, 1, 0-1 in 4 settimane; variante 4, 3, 2, 1 | Convenzione | Riportato da RP (rpstrength.com «Progressing for hypertrophy»), da verificare |
| Autoregolazione del volume, RP | L'app RP chiede dopo la seduta voti 1 / 0 / -1 (facile / medio / molto duro) e risposte su dolenzia («guarita in tempo»), pump e carico di lavoro: con un «1» (facile) la settimana dopo **compaiono più serie**; con carico al limite non se ne aggiungono o se ne tolgono | Convenzione | Riportato da RP Hypertrophy App (pagina RP e community di supporto), da verificare |
| Piramide di Helms | Ordine di importanza: 1 aderenza; 2 volume, intensità, frequenza; 3 progressione; 4 scelta degli esercizi; 5 pause; 6 tempo di esecuzione. «Padroneggia ogni livello prima del successivo» | Convenzione (quadro concettuale) | Helms, The Muscle and Strength Pyramid (libri; sito dei libri e recensioni) |
| Tetto di volume per seduta | Henselmans: probabile massimo produttivo 9-13 serie per muscolo a seduta; la meta-analisi (Pelland) dice circa 11. Con 2-3 sedute a settimana: full body e il volume in eccesso va spostato in un'altra seduta. Suo intervallo settimanale 10-30 serie | Moderata (tetto 11 = preprint Pelland nel repo; la tesi pratica è di Henselmans) | Henselmans (mennohenselmans.com, articoli «Is there a maximum productive training volume per session?» e «This is the max volume you should do per workout»; anno non mostrato) |
| Scelta dello split | Regola di massima: 2-3 giorni full body, 4 upper/lower, 5-6 PPL o per muscolo. Principianti e chi dorme male o è stressato: meno sedute, più piene. **L'aderenza è lo spareggio**: lo split che il cliente fa davvero batte quello «migliore». Lo split è solo il calendario: cresce il volume di serie dure | Convenzione | Coachway, NASM (guide per istruttori), siti di terzi |
| Rapporto stimolo/fatica (SFR) | Concetto reso popolare da Israetel: preferire esercizi che danno molto stimolo e poca fatica (stacchi da terra e rack pull: SFR basso per l'ipertrofia; affondi bulgari: alto). Le serie a cedimento fanno più fatica con gli stessi risultati: meglio RPE 7-8 per la maggior parte | Convenzione («concetto teorico», dicono le fonti stesse) | Riassunti di terzi (Outlift, Hevy Coach, Mirafit) su Israetel |
| Tensione meccanica | Beardsley: l'ipertrofia dipende dalla tensione meccanica sulle fibre; stress metabolico e danno sono sottoprodotti; contano le ripetizioni «stimolanti» (alta reclutazione e alta tensione: le ultime vicino al cedimento), valide tra circa 6 e 30 ripetizioni | Moderata (coerente con carichi 30-100% di ACSM 2026 nel repo); il meccanismo non è un esito | Riportato da Beardsley (Strength Science Research; riassunti di terzi di livello basso), da verificare |
| Stalli: cosa fa un coach | Passi, in ordine: controllare cibo, sonno e tecnica; passi di carico più piccoli; cambiare schema (3x5 in 5x3 alla panca: stesso numero di ripetizioni, carico più alto, meno fatica); dividere in giorno pesante e giorno di volume; scarico; solo dopo passare a programma da intermedio. «Saltare subito all'intermedio è l'errore più comune e costoso» | Convenzione | Rippetoe (startingstrength.com, «Limits of Linear Progression», «Don't jump ship», titoli) e riassunti di terzi, da verificare |
| Stalli: reset e scarico | Rippetoe e Baker (2014): a un plateau -10% sui pesi; se il massimale scende: serie -50% e pesi -10%; Pritchard (2015): volume -30/-70% per 1-4 settimane. Variazione: onde di ripetizioni ogni 3-4 settimane (6-8, 8-12, 10-15), cambio di variante o di angolo, aggiunta graduale di serie fino a 10-15 a settimana | Convenzione | Riportato da Dr. Muscle (Carl Juneau, dr-muscle.com: sito di un'app), da verificare; Pritchard e Rippetoe non visti |
| Quando finisce la progressione lineare | Finisce quando non si riesce ad aumentare a ogni seduta nemmeno dopo uno scarico; «3 fallimenti allo stesso peso dopo il reset»; dura 3-9 mesi (5-10 libbre a seduta); a 6 settimane di stallo è quasi sempre tecnica, recupero o cibo | Convenzione | Riassunti di terzi (Barbell Logic, fitnesscalcs, lift5x5) su Rippetoe |
| Livello (training age) | Rippetoe: principiante recupera da seduta a seduta, intermedio da settimana a settimana, avanzato da mese a mese. Nuckols: intermedio = tecnica costante sui fondamentali e progressione lineare già finita. Per età cronologica **non ho trovato nulla** (non ricercato) | Convenzione | Riassunti di terzi su Rippetoe e Stronger By Science |
| Principianti: prime 4 settimane | 2-3 sedute full body non consecutive; 1-3 serie impegnative; RIR 3-4 all'inizio (RPE 6-7) e poi 1-3; **ripetizioni fisse nei primi 3-6 mesi**, RIR solo dopo aver provato il vero cedimento; niente cedimento. Barbell Medicine: 2-3 serie impegnative per esercizio | Convenzione (fonti di livello basso: siti di app) | Barbell Medicine (The Beginner Prescription); BetterMe, Fitbod (siti di terzi) |
| Riscaldamento | RAMP 8-12 minuti: 2-3 min per alzare temperatura, circa 2 di attivazione, circa 3 di mobilità, 1-2 di serie di avvicinamento; per i pesi: serie crescenti verso il primo carico di lavoro (esempio 50% x 8, 60% x 5, 70% x 3, 80% x 1). Cressey: il riscaldamento prepara il contesto del lavoro che segue; il lavoro più importante per primo | Convenzione | Jeffreys 2007; Cressey (ericcressey.com, «Programming principles») |
| Defaticamento | Nessuna prova solida di vantaggio per la crescita o la forza; sulla dolenzia il riassunto ottenuto è favorevole ma la qualità degli studi è bassa (bias alto in circa il 70%, vedi 1.1) | Convenzione | Meta-analisi su stretching post-esercizio (PMC8133317) |
| Pause | Lyle McDonald: 3 min per esercizi da 6-8 ripetizioni, 2 min per 10-12, 90 s per 12-15. Reddit RR: circa 90 s. Gironda: 15-30 s (già nel repo). Singer 2024: oltre 60-90 s poca differenza sulla massa | Moderata (Singer) / Convenzione (coach) | Lyle McDonald (Legion, Lift Vault); redditbwf wiki; Singer 2024 (nel repo) |
| «Junk volume» | Il termine non compare nei risultati. L'idea equivalente: oltre il tetto per seduta (Henselmans circa 9-13, Pelland circa 11) le serie in più rendono poco; una critica a nSuns dice «un programma upper/lower tipico ha 3-10 serie di lavoro per seduta» | Convenzione | Henselmans; Pelland (nel repo); recensione di nSuns (characterstrength.co.uk) |
| Rotazione degli esercizi | Un solo RCT visto (Baz-Valle 2019): variare non migliora la crescita ma migliora la motivazione. I coach consigliano di cambiare angolo, ROM o variante quando uno stallo dura | Moderata (RCT piccolo) | Baz-Valle 2019; Dr. Muscle |
| Donne contro uomini, over 65 | **Non ricercato** (budget esaurito). Resta quanto già nel repo (pause -15% per le donne, PeerJ 2025; over 65 più prudenti, ACSM 2026) | n.d. | vedi sezione 7 |

### 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web)

Tabella scritta senza fonti viste: ogni riga è Convenzione o Moderata (da verificare). Non contiene numeri precisi di studi, né citazioni.

| Tema | Cosa so | Dubbi / cosa non ricordo | Forza | Origine |
|---|---|---|---|---|
| Donne e uomini | Stessa struttura di programma, stesse fasce di ripetizioni, stessa logica di volume. In letteratura l'ipertrofia relativa è simile, la forza assoluta della parte alta è inferiore, e a pari carico relativo le donne si affaticano meno e recuperano spesso più in fretta tra le serie (quindi pause un po' più brevi vanno bene). Il ciclo mestruale: il repo lo tratta come sonno e stress (Colenso-Semple 2023) | Entità delle differenze e qualità degli studi (pochi, quasi tutti brevi): non ricordo numeri | Moderata (da verificare) | Modello + Repo (PRG-20, PRZ-01) |
| Over 65 | Le linee guida abituali (NSCA, ACSM, OMS) chiedono 2-3 sedute a settimana sui grandi gruppi, 1-3 serie, intensità moderata che cresce piano, lavoro di potenza leggero e veloce quando è sicuro, equilibrio, più riposo e proteine adeguate | Percentuali di 1RM e ripetizioni esatte non le riporto | Moderata (da verificare) | Modello + Repo (ACSM 2026, PRG-19) |
| «Junk volume» | Termine di pratica per il volume che non stimola: serie lontane dal cedimento (oltre circa 4-5 ripetizioni in riserva) o oltre il tetto per seduta. È coerente con le meta-regressioni sulla prossimità al cedimento (Robinson 2024: solo titolo visto) | Soglia esatta di RIR oltre la quale una serie «non conta» | Convenzione | Modello + Web (titolo) |
| Pause tra le serie | Pesanti 2-3 minuti; macchine 90-120 s; isolamenti 60-90 s; sotto 60 s si perdono ripetizioni nelle serie successive; per la massa oltre 60-90 s la differenza è piccola (Singer 2024: già nel repo) | Cifre per la forza massima | Moderata (da verificare) | Modello + Repo |
| Velocità di sovraccarico | Principiante: aumenti a ogni seduta o ogni settimana per mesi; intermedio: ogni 1-4 settimane; avanzato: ogni mesi. Passi piccoli (2,5 kg al bilanciere, 1-2 kg ai manubri), doppia progressione sugli isolamenti | Tempi esatti di rallentamento | Convenzione | Modello (+ Rippetoe, web, per seduta/settimana/mese) |
| Scarico | Ogni 4-8 settimane negli intermedi e avanzati, o quando compaiono segnali (prestazioni in calo, dolori articolari, sonno peggiore, voglia a zero); riduzione di volume del 30-50% tenendo i carichi, oppure carico -10% | Consenso formale (Bell 2024 è nel repo: non riletto qui) | Moderata (da verificare) | Modello + Repo (CAR-03) |
| Età cronologica e di allenamento | La cronologica decide recupero, prudenza e scelta delle articolazioni; quella di allenamento (anni di costanza e velocità di progresso) decide struttura e volume. Un 50enne che comincia è principiante; chi riprende dopo anni sale in fretta nelle prime settimane | Nessuna misura | Convenzione | Modello |
| Esercizi con un infortunio | Si sostituiscono con varianti che caricano meno l'articolazione (carico guidato, ampiezza dolce, presa neutra, unilaterale) tenendo il resto dell'allenamento; dolore accettabile fino a circa 3/10 se non peggiora il giorno dopo (Silbernagel 2007, già in DEC-01); oltre soglia: rinvio a un professionista | Tabella per articolazione (già in SOSTITUZIONI) | Moderata (nel repo) | Repo + Modello |
| Attrezzatura limitata | Si coprono comunque i 6 schemi di movimento: macchine guidate per chi comincia; con elastici o manubri leggeri si alzano le ripetizioni, si accorciano le pause e si rallenta la discesa | Equivalenze di carico | Convenzione | Modello |
| Dimagrimento | Si mantengono carichi e un volume di mantenimento (non si riduce a zero), proteine adeguate e più passi: il lavoro di forza protegge la massa | Entità del deficit (informazione, non prescrizione: COR-03) | Moderata (da verificare) | Modello + Repo (COR-01/03) |

## 2. Schede e metodi: struttura esatta

Ogni tabella: cosa risulta dai riassunti di terzi (non dai libri). Dove il repo già dichiara il metodo (`js/coach/metodi-momenti.js`) lo scrivo. Verdetto = cosa farne in 3in.

### 2.1 Renaissance Periodization (modello generale, non un'unica scheda)

| Voce | Contenuto |
|---|---|
| Per chi | Livelli diversi con volumi diversi (principiante verso 8-12 serie per muscolo, intermedio 12-18, avanzato 18-22: siti di terzi). Template ufficiali non letti |
| Frequenza | Ogni muscolo almeno 2 volte (la definizione di MV lo assume) |
| Struttura | Serie settimanali per muscolo dentro MEV-MAV-MRV; si parte vicino al MEV e si sale |
| Progressione | Mesociclo 4-6 settimane: +serie e/o +carico; RIR 3 → 2 → 1 → 0-1; voti 1/0/-1 dopo ogni seduta decidono se aggiungere o togliere serie |
| Scarico | Una settimana a fine mesociclo, «obbligatoria» |
| Pregi | Autoregolazione del volume per muscolo; facile da automatizzare; chiede poco all'utente |
| Difetti | Landmark euristici (non esiti di studi); MRV 20-25+ è alto per chi non è avanzato; conflitto di interessi (vende app e programmi) |
| Verdetto 3in | In parte già dentro (RIR 3-2-1-0 per gli avanzati PRG-38, +1 serie a metà blocco RIC-01). Manca il **taglio** di serie per gruppo quando il recupero è scarso (PCO-03) e la rampa RIR per gli intermedi (PCO-02). I landmark per muscolo non si adottano: restano 8-10 / 10-14 / 14-20 di PRG-25, più prudenti e coerenti con il conteggio frazionario di Pelland |
| Forza | Convenzione |

### 2.2 Jeff Nippard: Fundamentals Hypertrophy (tre versioni da 8 settimane)

| Voce | Contenuto |
|---|---|
| Per chi | «Dal principiante all'intermedio» (descrizione di terzi); programma a pagamento |
| Frequenza | 3 giorni (Full Body 1-2-3, lun-mer-ven), 4 giorni (Upper 1, Lower 1, riposo, Upper 2, Lower 2) o 5 giorni (Petto+Tricipiti, Gambe+Addome, Schiena+Bicipiti, riposo, Gambe+Addome, Spalle+Braccia) |
| Struttura | Di norma 3 serie per esercizio; fondamentali verso 6 ripetizioni (squat 3x6), isolamenti 8-15 |
| Progressione | Ogni settimana pesi, volume o intensità salgono (dettaglio non visto) |
| Scarico | Non visto |
| Pregi | Stesso formato di 8 settimane per 3, 4 o 5 giorni: la scelta dipende solo dai giorni disponibili |
| Difetti | Contenuti dettagliati dietro pagamento: non verificabili qui |
| Verdetto 3in | Conferma lo schema già in PRG-02 (3 FB, 4 U/L, 5 e 6 giorni split). Blocchi di **8 settimane** per principianti coerenti con PRG-01 (8 sett.). Nulla da aggiungere |
| Forza | Convenzione |

### 2.3 Jeff Nippard: Minimalist (3 giorni, 35-45 minuti)

| Voce | Contenuto |
|---|---|
| Per chi | Chi ha poco tempo; «alta intensità, basso volume» |
| Frequenza | 3 sedute full body non consecutive, 35-45 minuti |
| Struttura | 1-2 serie dure per esercizio, spesso a cedimento; indicazioni di RIR per ogni giorno; parte pesante e parte leggera per parte alta e bassa |
| Progressione | Non vista |
| Scarico | Non visto |
| Pregi | Poco volume = meno rischio di sovraccarico, aderenza alta |
| Difetti | Con 1-2 serie ogni serie deve essere dura: per il principiante è un'indicazione rischiosa |
| Verdetto 3in | Estendere la «Dose minima» (oggi solo 2 giorni) a **3 giorni** (PCO-04). Titolo YouTube «The Best Science-Based Minimalist Workout Plan (Under 45 Mins)» visto, contenuto non visto: riportato da Nippard (video), da verificare |
| Forza | Convenzione (la base di forza è Androulakis-Korakakis, Moderata) |

### 2.4 Eric Helms: Muscle & Strength Pyramid (quadro, non scheda)

| Voce | Contenuto |
|---|---|
| Per chi | Tutti: serve a decidere **in che ordine** curare le cose |
| Frequenza / struttura | Livello 2: volume, intensità, frequenza; livello 4: scelta degli esercizi |
| Progressione | Livello 3, dopo volume e frequenza |
| Pregi | Dice cosa **non** perfezionare troppo presto (pause, tempo, ordine) |
| Difetti | Quadro di sintesi, non un esito di studi; Helms vende programmi |
| Verdetto 3in | Già applicato: 6 schemi di movimento ogni settimana (PRG-21), aderenza trattata da ADE-01 e dal profilo psicologico (MET-02). Aggiungere lo **spareggio per aderenza** tra due strutture quasi pari (PCO-09) |
| Forza | Convenzione |

### 2.5 Menno Henselmans (full body, tetto per seduta)

| Voce | Contenuto |
|---|---|
| Per chi | Frequenza 2-3 volte per muscolo |
| Frequenza | Full body quando ci si allena 2-3 volte a settimana |
| Struttura | 10-30 serie per muscolo a settimana; **9-13 serie per muscolo per seduta al massimo**: oltre, spostare il volume in un'altra seduta |
| Progressione | Non vista |
| Pregi | Regola semplice per distribuire il volume |
| Difetti | Opinioni forti; il tetto di 11 è un preprint (Pelland 2025) |
| Verdetto 3in | Già in PRG-30 (11 serie) e ABB-05. Nulla da aggiungere |
| Forza | Moderata (tetto 11 preprint) |

### 2.6 Stronger By Science (Greg Nuckols)

| Voce | Contenuto |
|---|---|
| Per chi | Principianti (meno di 1 anno): SBS Linear Progression o Novice Hypertrophy; intermedi: varianti RTF o RIR. Sei programmi da 21 settimane e un «Program Builder» |
| Frequenza | Dipende dal programma (non vista) |
| Struttura | Fondamentali del powerlifting (panca, squat, stacco) con volume e frequenza scelti dall'utente |
| Progressione | **RTF**: 4 serie normali + una serie finale a cedimento; se si batte il target di ripetizioni sull'ultima serie il «training max» sale, se si manca scende. **RIR**: il training max sale (+2% di default) se si fanno più serie della soglia alta, scende (-5%) se meno della soglia bassa |
| Scarico | Non visto |
| Pregi | Autoregolazione con un feedback chiaro a ogni seduta |
| Difetti | Specifico per i fondamentali della forza; pochi dettagli sull'ipertrofia |
| Verdetto 3in | Già l'idea di CAR-06 (AMRAP e RPE) e CAR-14 (calibrazione RIR). Regola utile: **restare con la progressione da principiante finché è difficile aumentare «senza grinding»: di solito 2-6 mesi** (riportato da Lift Vault su SBS). Conferma LIV-01 |
| Forza | Convenzione |

### 2.7 Wendler 5/3/1 (con BBB e FSL)

| Voce | Contenuto |
|---|---|
| Per chi | Intermedi e avanzati pazienti (nel repo `531` è «solo ispirazione») |
| Frequenza | 4 giorni (BBB): un fondamentale a giorno (squat, panca, stacco, press) |
| Struttura | Onda di 4 settimane sul «training max» (80-90% di 1RM): sett. 1 5 ripetizioni al 65/75/85%; sett. 2 3 ripetizioni al 70/80/90%; sett. 3 5/3/1 al 75/85/95%; sett. 4 scarico 40/50/60% |
| Supplementari | **BBB**: 5x10 al 50% del TM (cicli 1-2), 55% (cicli 5-6): per la massa. **FSL**: 5x5 alla percentuale della prima serie: più pesante, meno volume, per tenere la forza |
| Progressione | +2,5/5 kg a ciclo (dal repo; non rivisto qui); l'ultima serie è AMRAP |
| Scarico | Settimana 4 programmata |
| Pregi | Progressi lenti ma per anni; scarico incorporato |
| Difetti | Poco volume per le braccia e per i muscoli piccoli se non si aggiungono accessori |
| Verdetto 3in | Resta ispirazione: il coach ha già onde di RIR e scarico. L'idea «BBB» (volume di base su un fondamentale) coincide con la 5x10 a carico basso, ma in 3in basta il volume del programma |
| Forza | Convenzione |

### 2.8 GZCL e GZCLP (Cody LeFever)

| Voce | Contenuto |
|---|---|
| Per chi | GZCLP: principianti e primi intermedi, 4 giorni a settimana |
| Livelli (metodo) | **T1** 85-100% del massimale di lavoro, 10-15 ripetizioni totali, 1-3 per serie; **T2** 65-85%, 20-30 ripetizioni totali, 5-8 per serie; **T3** leggero, 10 o più ripetizioni, 30 o più totali. Rapporto indicativo 1:2:3. Ordine fisso: T1, poi T2, poi T3 |
| Struttura GZCLP | T1 5x3+ (ultima serie AMRAP) a circa l'85% del proprio 5RM; T2 3x10 a circa il 75% del peso T1; T3 3x15+ |
| Progressione | **T1**: 5x3+ → 6x2+ → 10x1+ a ogni fallimento (stesso peso); dopo 10x1+ si riparte da 5x3+ a circa l'85-90% di un nuovo 5RM. **T2**: 3x10 → 3x8 → 3x6; dopo il 3x6 si riparte da 3x10 con l'ultimo peso 3x10 + 7,5 kg. **T3**: si aggiunge peso quando l'ultima serie arriva a 25 ripetizioni |
| Scarico | Nessuno programmato: la «scala» di fallimenti fa da scarico |
| Pregi | Regole chiare per ogni stallo; i tre livelli coprono forza, volume e ipertrofia |
| Difetti | Per chi vuole solo ipertrofia 6x2 e 10x1 non sono adatti; le singole ripetizioni non vanno bene per over 65 e PAR-Q positivo |
| Verdetto 3in | Già `gzclp` e CAR-07 (principiante: 5x3, 6x2, 10x1). Proposta: **estendere la scala T2 (3x10 → 3x8 → 3x6)** a chi non è principiante e non ha come obiettivo la forza (PCO-01) |
| Forza | Convenzione |

### 2.9 nSuns 5/3/1 LP

| Voce | Contenuto |
|---|---|
| Per chi | Intermedi di powerlifting che tollerano molto volume |
| Frequenza | 4, 5 o 6 giorni; la base è un upper/lower a 4 giorni |
| Struttura | «Wendler davanti, Sheiko dietro»: rampa 5/3/1 fino a un AMRAP pesante e poi 6 serie di volume. 17 serie di lavoro sui fondamentali per seduta (9 sul principale, 8 sul secondario), tra il 65% e il 95% del TM |
| Progressione | L'AMRAP settimanale regola il TM: 0-1 ripetizioni nessun aumento; 2-3 +5 lb; 4-5 +5-10 lb; oltre 5 +10-15 lb |
| Scarico | Nessuno nel programma |
| Pregi | Progressi rapidi per un po'; tabella semplice |
| Difetti | Volume eccessivo secondo i critici: «un upper/lower tipico ha 3-10 serie di lavoro a seduta»; senza scarico molti registri finiscono a circa 10 settimane con tendiniti o stanchezza (aneddoto di un sito di terzi) |
| Verdetto 3in | La **tabella dell'AMRAP è già in CAR-06** (versione in kg). Programma non adottabile: troppo volume per utenti generici |
| Forza | Convenzione |

### 2.10 Candito 6 settimane

| Voce | Contenuto |
|---|---|
| Per chi | Intermedi con 6-18 mesi di allenamento costante che conoscono i propri carichi |
| Frequenza | 5 giorni nelle prime due settimane, poi fino a 3 sedute dure |
| Struttura | Sett. 1 condizionamento muscolare; sett. 2 ipertrofia; sett. 3 «linear max OT»; sett. 4 pesi alti ed esplosività; sett. 5 forza intensa; sett. 6 scarico. Obiettivo: i tre fondamentali |
| Progressione | A blocchi: accumulo (volume), intensificazione, picco |
| Scarico | Settimana 6 |
| Pregi | Mostra bene un blocco «volume → intensità → picco → scarico» |
| Difetti | Pensato per la gara (picco); 5 giorni all'inizio |
| Verdetto 3in | Non adottare. Come modello di blocco conferma che 4-6 settimane con scarico finale sono normali (5.3) |
| Forza | Convenzione |

### 2.11 Sheiko

| Voce | Contenuto |
|---|---|
| Per chi | Intermedi avanzati e avanzati di powerlifting, anche in preparazione alla gara |
| Frequenza | Altissima sui fondamentali (panca 3 volte, squat 2 a settimana, nei programmi 29-32) |
| Struttura | Volume molto alto, serie quasi tutte tra circa il 68% e l'80% di 1RM, ripetizioni veloci e tecniche |
| Progressione | Cicli programmati, non autoregolati |
| Scarico | Inserito nei cicli (non visto in dettaglio) |
| Pregi | Meno rischio di infortunio con carichi sub-massimali |
| Difetti | Sedute fino a circa 2 ore con 2-3 minuti di pausa; critiche: troppo poca esposizione a intensità sopra il 90%; complesso per i principianti |
| Verdetto 3in | Non adottare (powerlifting e tempo). Conferma che le **pause lunghe e il volume alto** non sono compatibili con 45-60 minuti |
| Forza | Convenzione |

### 2.12 RTS: Reactive Training Systems (Mike Tuchscherer)

| Voce | Contenuto |
|---|---|
| Per chi | Powerlifter intermedi; esiste un programma intermedio gratuito di 9 settimane |
| Frequenza | Non vista |
| Struttura | Si lavora a RPE; si sale fino a una serie «iniziale» (esempio 500x5 @ RPE 9) |
| Progressione | **Fatigue percent**: si toglie una percentuale fissa (0%, 2%, 5% o 7%) dalla serie iniziale e si fanno serie a quel carico finché ripetizioni e RPE tornano uguali alla iniziale |
| Scarico | Non visto |
| Pregi | Regola semplice di back-off autoregolata |
| Difetti | Richiede stima affidabile dell'RPE (errore medio circa 1 ripetizione, già nel repo) |
| Verdetto 3in | **CAR-13 (back-off a -95%) equivale a un fatigue percent del 5%**. Nulla da aggiungere |
| Forza | Convenzione |

### 2.13 Barbell Medicine

| Voce | Contenuto |
|---|---|
| Per chi | Principianti (Beginner Traditional Template, 3 giorni a settimana, bilanciere) e post-principianti (7-Week Hypertrophy Template) |
| Frequenza | Principiante: 3 giorni. Ipertrofia: non vista |
| Struttura | Principiante: 2-3 serie «impegnative» per esercizio, regolabili. Ipertrofia: lavoro principale a 6 ripetizioni con RPE 6, 7, 8 nelle settimane; accessori 12-16 ripetizioni a RPE 8 |
| Progressione | Per RPE (RPE 6 = 4 ripetizioni in riserva, RPE 8 = 2, RPE 10 = massimo) |
| Scarico | Non visto |
| Pregi | Linguaggio chiaro e prudente; usato anche per salute |
| Difetti | Tono polemico del podcast; template a pagamento |
| Verdetto 3in | Già in PRG-18 (principiante max 3 serie). Conferma RIR progressivo |
| Forza | Convenzione |

### 2.14 PHUL e PHAT

| Voce | Contenuto |
|---|---|
| Per chi | PHUL intermedi (nel repo, Brandon Campbell). PHAT (Layne Norton) intermedi avanzati con tempo e recupero |
| Frequenza | PHUL 4 giorni (U/L due volte: una seduta di forza e una di ipertrofia). PHAT 5 giorni: Power Upper, Power Lower, riposo, Ipertrofia Schiena e Spalle, Ipertrofia Gambe, Ipertrofia Petto e Braccia |
| Struttura | Ogni muscolo 2 volte: una volta pesante (3-5 ripetizioni) e una con più ripetizioni |
| Progressione | Non vista |
| Pregi | Frequenza 2 con due fasce di ripetizioni |
| Difetti | PHAT: «circa il 90% di ripetizioni in più di PHUL» (sito di terzi): più recupero e più tempo |
| Verdetto 3in | PHUL c'è già (PRG-11). **PHAT non si aggiunge**: 5 giorni con 3 sedute di volume sono troppo per l'utente medio; il caso 5 giorni è coperto da PPL+UL |
| Forza | Convenzione |

### 2.15 Starting Strength, StrongLifts, GreySkull e perché smettono di funzionare

| Voce | Contenuto |
|---|---|
| Per chi | Principianti assoluti (repo: `startingstrength`, `stronglifts`, `greyskull`, dettagli di struttura non riverificati qui) |
| Frequenza | 3 sedute a settimana, full body A/B |
| Struttura | Pochi fondamentali col bilanciere, 5 ripetizioni per serie (3x5 oppure 5x5), AMRAP nel GreySkull; pause lunghe |
| Progressione | **Lineare**: +5-10 libbre a seduta (nel repo +2,5 kg); fallimento = stesso peso, poi reset del 5-10% |
| Scarico | Nessuno programmato: il reset dopo il fallimento fa da scarico |
| Quando smette | Quando non si riesce ad aumentare a ogni seduta nemmeno dopo lo scarico; circa 3 fallimenti allo stesso peso dopo il reset; dura 3-9 mesi. Sotto le 6 settimane di stallo: controlla tecnica, cibo e sonno prima del programma |
| Cosa fare prima di cambiare | Passi più piccoli (microcarichi); a panca e press passare da 3x5 a 5x3 (stesso numero di ripetizioni, carico più alto, meno fatica); dividere in un movimento pesante e uno di volume; solo dopo programma da intermedio (progressione settimanale o mensile) |
| Pregi | Semplicità; progressi enormi nei primi mesi |
| Difetti | Poco volume per la massa; pochissima varietà; noioso |
| Verdetto 3in | Già presenti. La **scala degli stalli** di 5.1 è l'applicazione generale di queste regole. Conferma STA-01 (stalli per livello) |
| Forza | Convenzione |

### 2.16 Lyle McDonald: Generic Bulking Routine

| Voce | Contenuto |
|---|---|
| Per chi | Intermedi in massa |
| Frequenza | 4 giorni: lun, mar, gio, ven; i due giorni inferiori sono uguali, i due superiori uguali; ciclo di 6-8 settimane |
| Struttura | **Gambe:** squat 3-4x6-8 (3 min); stacco a gambe tese o leg curl 3-4x6-8 (3 min); leg press 2-3x10-12 e leg curl 2-3x10-12 (2 min); calf in piedi 3-4x6-8; calf seduto 2-3x10-12. **Parte alta:** panca piana 3-4x6-8; rematore 3-4x6-8; inclinata o military 2-3x10-12; lat machine o trazioni 2-3x10-12; tricipiti 1-2x12-15 e bicipiti 1-2x12-15 (90 s) |
| Progressione | Sett. 1 all'80-85% del massimale di ripetizioni; sett. 2-4 +5% a settimana; dalla sett. 5 si aggiunge peso **solo quando si arriva al tetto delle ripetizioni con 1-2 in riserva** (+1-2,5 kg sui grandi, +0,5-1 kg sui piccoli) |
| Scarico | Non visto |
| Pregi | Regola di progressione chiara; pause diverse per fascia di ripetizioni |
| Difetti | Braccia con 1-2 serie: poche per chi vuole specializzare |
| Verdetto 3in | Già `gbr` (4x8 / 3x12 / 2x15). La **regola «aumenta solo al tetto con 1-2 RIR»** è la doppia progressione già in CAR-06 |
| Forza | Convenzione |

### 2.17 Metodi di nicchia: Dan John, Pavel, Cressey, Thibaudeau, Beardsley, HIT

| Metodo | Cosa risulta | Forza | Verdetto 3in |
|---|---|---|---|
| Dan John, Easy Strength (40 giorni, con Pavel) | 3-5 movimenti, **non più di 10 ripetizioni totali per movimento al giorno**, leggeri, per 40 giorni, «mai mancare una ripetizione»; per i full body «regola del 10», per mezzi movimenti 15-25 (avanzati) | Convenzione (nessuno studio visto) | Non adottare. Idea utile: sedute brevi e leggere sono sostenibili per molto tempo (mantenimento) |
| Pavel, Grease the Groove | Un solo movimento a corpo libero (trazioni, piegamenti), serie sub-massimali molte volte al giorno, almeno 15 minuti tra una serie e l'altra, 40-80% delle ripetizioni massime (circa metà), 4-6 serie al giorno, **mai a cedimento (2-5 in riserva)**. Errore tipico: aggiungere ripetizioni «perché si sta bene» e stallare in due settimane | Convenzione (nessun RCT visto) | Solo come suggerimento facoltativo per chi non riesce a fare una trazione o un piegamento completi |
| Eric Cressey | Il lavoro più importante all'inizio; il riscaldamento prepara il lavoro; spalle sane: spinte con scapola libera e fissa (landmine, piegamenti, cavi), rotazione esterna della cuffia anche solo 1 volta a settimana 3 serie; «pre-work» 2-3 priorità per atleta, fino a 15-20 serie a settimana in riempitivi | Convenzione | PCO-08 (cuffia e spalle per chi ha fastidio alla spalla) |
| Christian Thibaudeau, Neurotype | 5 tipi (1A, 1B, 2A, 2B, 3): 1A pesi alti e poco volume; 2A il volume più alto con un mix; 2B tecniche da bodybuilding sopra 8-10 ripetizioni e sotto l'80%; 3 serie vicine al massimo, 8-15 ripetizioni. Nei risultati: **nessuna critica pubblicata e nessuna validazione**; un coach cita dubbi sul «livello di neurotrasmettitori» senza misure | Convenzione, **folklore** (tipologia non validata) | Non adottare |
| Chris Beardsley | Tensione meccanica come motore, ripetizioni «stimolanti» le ultime vicino al cedimento, valido tra 6 e 30 ripetizioni; la fatica fine a sé stessa è inutile | Moderata (meccanismo, coerente con ACSM 2026) | Conferma RIR 1-3 e che i carichi bassi vanno bene vicino al cedimento (utile per la casa) |
| HIT (Mentzer, Yates) | Già in `ricerca-struttura-e-intensita.md` | già noto | Invariato |

### 2.18 Calisthenics: Reddit RR e Convict Conditioning

| Voce | Reddit Bodyweight Fitness, Recommended Routine | Convict Conditioning (Paul Wade) |
|---|---|---|
| Per chi | Chi si allena a casa o a corpo libero (repo: metodo `rr`) | Chi vuole progressioni lente a corpo libero («Big Six») |
| Frequenza | 3 sedute a settimana, giorni non consecutivi | Non vista |
| Struttura | Riscaldamento 5-10 min (slancio spalle, polsi, squat), lavoro di abilità, **tre coppie di superserie antagoniste** e un trio per il core, defaticamento; dentro un'ora | Sei movimenti con 10 gradini ciascuno |
| Progressione | **3 serie da 5-8 ripetizioni** (pausa circa 90 s); quando si fanno 3x8 con buona tecnica si passa alla progressione più difficile e si riparte da 3x5 | Passare di gradino a standard fissi |
| Pregi | Regola chiara; il passo di progressione è piccolo; coppie antagoniste = tempo | Tempo lento e passi piccoli aiutano i tendini (aneddotico) |
| Difetti | Serve una sbarra per le trazioni | Critiche: alcuni gradini sono insensati o rischiosi (dal piegamento a una mano alla trazione a una mano il salto è troppo grande; squat considerato il più debole); per un principiante settimane o mesi restano sul gradino più facile |
| Verdetto 3in | **RR già nel repo (`rr`) con la stessa regola 3x5-8**: adottare la regola di passaggio (3x8 → variante più difficile) come regola per tutto il corpo libero (PCO-06) | Usare solo come fonte di nomi di varianti, mai come piano |
| Forza | Convenzione (RR è la «scheda» di una comunità, nessuno studio) | Convenzione |

### 2.19 Già noti (non rifatti)

Golden Six, 5x5 di Reg Park, Reeves, Arnold a 6 giorni, Gironda 8x8, Mentzer (HIT), Yates: vedi `ricerca-struttura-e-intensita.md` cap. 2 e `metodi-epoca-oro.js`. Starting Strength, StrongLifts, GreySkull, GZCLP, PHUL, GBR, Hatfield, Reddit PPL, Dose minima, Mantenimento, RR, HIT: in `metodi-momenti.js`.

### 2.20 Altri programmi: struttura dalla Conoscenza del modello (non verificata sul web)

Descrivo solo ciò che ricordo con sicurezza; i dettagli incerti sono nella colonna dedicata. Forza di tutte le righe: Convenzione. Nessuna fonte vista in questa sessione per questa tabella.

| Programma | Per chi e giorni | Struttura che conosco | Progressione e stallo | Dettagli incerti | Verdetto 3in |
|---|---|---|---|---|---|
| Starting Strength (Rippetoe) | Principianti; 3 giorni non consecutivi, sedute A e B alternate | A: squat 3x5, panca 3x5, stacco 1x5. B: squat 3x5, press 3x5, stacco 1x5 (o power clean in alternativa) | Aumento a ogni seduta (di solito più piccolo alle spinte, più grande a squat e stacco); dopo fallimenti ripetuti reset di circa il 10% | Alternanza esatta panca/press; entità dei salti; quante mancate prima del reset (il repo scrive «due mancate = -5%») | Già `startingstrength` |
| StrongLifts 5x5 (Mehdi) | Principianti; 3 giorni | A: squat, panca, rematore col bilanciere 5x5. B: squat, military press 5x5, stacco 1x5 | +2,5 kg a seduta (stacco +5 kg); dopo 3 fallimenti allo stesso peso -10% | Passi più piccoli dopo i primi mesi; accessori facoltativi | Già `stronglifts` |
| GreySkull LP (Sheaffer) | Principianti; 3 giorni, sedute A/B | Panca e press alternati, squat, stacco; **due serie da 5 e una serie finale AMRAP (5+)**; accessori a 8-12 ripetizioni | Aumenti piccoli; se nell'AMRAP si fanno 10 ripetizioni o più l'aumento è doppio; stallo: -10% e si riparte | Serie esatte dello stacco e delle trazioni; regola esatta del raddoppio | Già `greyskull` |
| Texas Method | Intermedi appena finita la progressione lineare; 3 giorni | Lunedì volume (5x5 circa al 90% del proprio 5RM); mercoledì recupero (carico e volume ridotti); venerdì intensità (una serie da 5 al massimo, il record della settimana) | Il record del venerdì sale ogni settimana; quando si ferma: cambiare schema | Percentuali esatte e quanto leggero è il mercoledì | Nel repo è `madcow` («solo ispirazione»); la logica pesante/leggera è già in PHUL e GZCLP |
| Madcow 5x5 | Intermedi; 3 giorni | Lunedì serie crescenti 5x5 (rampa fino a una serie top); mercoledì più leggero; venerdì rampa con una serie top da 3 e un back-off da 8 | Il carico sale a settimana | Tutta la parte del venerdì | Come sopra |
| Reddit PPL (Metallicadpa) | Principianti e intermedi; 6 giorni (Pull, Push, Legs due volte) o 3 | Pull: stacco 1x5+, rematori, trazioni o lat machine, curl. Push: panca e press. Legs: squat. Fondamentale a serie da 5 con ultima serie AMRAP; accessori 3x8-12 | +2,5 kg a seduta sui fondamentali; doppia progressione sugli accessori | Serie ed esercizi esatti di ogni giorno | Già `redditppl` |
| Wendler 5/3/1, incrementi | Intermedi e avanzati; 3-4 giorni | Vedi 2.7 (onda di 4 settimane) | **+2,5 kg alla parte alta e +5 kg alle gambe per ciclo** sul training max; se non si fanno le ripetizioni minime ci si ferma e si scende del 10% | La regola esatta del reset | Ispirazione (2.7) |
| Westside, metodo coniugato (Louie Simmons) | Avanzati di powerlifting; 4 giorni | Massimale su parte bassa, massimale su parte alta, giorno dinamico (velocità) su parte bassa e alta; varianti dei fondamentali per i massimali ruotate ogni 1-3 settimane; accessori sui punti deboli | Si cerca un nuovo massimale della variante; si cambia variante per evitare lo stallo | Serie x ripetizioni dei giorni dinamici; uso di bande e catene | Ispirazione (`conjugate`): prove dirette scarse (fonti.md) |
| Nippard PPL e powerbuilding | Intermedi | So che Nippard pubblica schede split e PPL con circa 3 serie per esercizio e RIR indicato; **non ricordo la struttura esatta** | n.d. | Tutto | Nessuno |
| Dan John, Mass Made Simple; Candito Linear; PHAT (esercizi e serie) | n.d. | **Non ricordo la struttura con sicurezza**: non la descrivo | n.d. | Tutto | Nessuno |

## 3. Regole pratiche dei coach (SE ... ALLORA ..., usabili dal generatore)

Colonna «In 3in»: già implementato (codice) o manca. Forza = di chi lo dice, non del mio giudizio. Colonna «Origine»: Web, Repo o Modello (vedi in testa alla nota); H-36..H-50 sono in gran parte Conoscenza del modello (non verificata sul web).

| # | SE | ALLORA | Forza | Chi lo dice | In 3in | Origine |
|---|---|---|---|---|---|---|
| H-01 | Giorni a settimana 2 o 3, oppure principiante, oppure dorme male o è stressato | Full body (ogni muscolo 2-3 volte con poche sedute piene) | Convenzione (la frequenza 2 minima è Solida: ACSM 2026) | Coachway/NASM; Henselmans | Sì: PRG-02, ABB-05 | Web + Repo |
| H-02 | 4 giorni | Upper/Lower due volte | Convenzione | Nippard (FH 4 giorni), Lyle McDonald, PHUL | Sì: PRG-02 | Web |
| H-03 | 5-6 giorni | PPL (o PPL+UL), ogni muscolo circa 2 volte | Convenzione | Coachway, Nippard (5 giorni split) | Sì: PRG-02 | Web |
| H-04 | Due strutture hanno quasi lo stesso punteggio | Scegli quella con **più probabilità di essere seguita** (meno giorni, sedute più corte, esercizi graditi) | Convenzione (la piramide mette l'aderenza alla base) | Helms; Coachway | Parziale (psicologia in MET-02): spareggio esplicito PCO-09 | Web |
| H-05 | Un muscolo supererebbe 9-13 serie in una seduta | Sposta il volume in un'altra seduta | Moderata (circa 11, preprint Pelland) | Henselmans; Pelland | Sì: PRG-30 | Web + Repo |
| H-06 | A parità di muscolo si può scegliere tra esercizi diversi | Prendi quello con **miglior stimolo/fatica**: macchine, supporto, unilaterali; stacchi da terra e rack pull ridotti (al massimo 3 serie) | Convenzione (SFR è «teorico») | Israetel (riassunti di terzi) | Sì: PRIORI, ABB-09 | Web |
| H-07 | Un esercizio è fermo da settimane o dà fastidio | Cambia variante: angolo, ROM, posizione allungata | Convenzione (allungamento: Moderata, Maeo) | Dr. Muscle; repo | Sì: STA-02, PRG-10 | Web + Repo |
| H-08 | Fastidio alla spalla | Alterna spinte a scapola libera e fissa (piegamenti, landmine, cavi) e aggiungi rotazione esterna della cuffia almeno una volta a settimana, 3 serie | Convenzione | Cressey | No: PCO-08 | Web |
| H-09 | In ogni seduta | Il lavoro più importante per primo | Solida (forza) / Convenzione | Cressey; ACSM 2009; Nunes 2021 (nel repo) | Sì: ABB-01 | Web + Repo |
| H-10 | Solo manubri a casa | Gambe: goblet squat, affondi/step-up, stacco rumeno con manubri; spinta orizzontale con manubri o piegamenti; rematore a un braccio; press sopra la testa; isolamenti (alzate laterali, curl, tricipiti) | Convenzione (**non visto nei risultati**: pratica comune, da verificare) | Siti di terzi | Sì: libreria + PRG-07 | Modello |
| H-11 | Si imposta il volume iniziale | Parti dal minimo efficace (6-8 serie per muscolo per la maggioranza) e sali durante il mesociclo | Convenzione | RP (riassunti di terzi) | Sì: PRG-25, ESI-01 | Web |
| H-12 | La dolenzia è guarita prima della seduta successiva dello stesso muscolo, il pump è buono, il carico è gestibile | **Aggiungi** serie la settimana dopo (fino al massimo del livello); se la dolenzia resta o le prestazioni calano: tieni o **togli** | Convenzione | RP Hypertrophy App (riportato) | Parziale: solo +1 e solo sui prioritari (RIC-01); manca il taglio. PCO-03 | Web |
| H-13 | Con 1-2 serie per esercizio (dose minima) | Le serie devono essere dure (RIR 0-2) e il carico al 70-85% di 1RM; 2-3 giorni a settimana | Moderata (forza, uomini allenati) | Androulakis-Korakakis; Nippard | Parziale: `minimo` ha 2 serie ma RIR di tipo. PCO-04 | Web |
| H-14 | 10 o più serie per muscolo a settimana | Cresce più che con meno di 5 (rendimenti decrescenti) | Solida | Pelland 2025 (nel repo) | Sì: PRG-25/28 | Repo |
| H-15 | Mesociclo di 4-6 settimane | RIR 3 → 2 → 1 → 0-1 (o 4 → 1) e poi scarico | Convenzione | RP | Parziale: solo avanzati (PRG-38). PCO-02 | Web |
| H-16 | Si programma il cedimento | Non serve in generale (vantaggio banale, 0,19); tienilo per l'ultima serie di isolamenti e macchine; limita le serie a cedimento (più fatica a pari risultato) | Solida (vantaggio) / Convenzione (come usarlo) | Refalo 2023; SFR | Sì: RIR_TIPO, RIC-04 | Web + Repo |
| H-17 | Carichi leggeri (casa, manubri) | Vanno bene vicino al cedimento: efficaci tra circa 6 e 30 ripetizioni | Solida (30-100% di 1RM, ACSM 2026 nel repo) / Moderata (Beardsley) | ACSM 2026; Beardsley | Parziale. PCO-06 | Repo + Web |
| H-18 | Principiante con bilanciere e obiettivo forza | Progressione lineare: aumenta a ogni seduta finché riesce (3-9 mesi) | Convenzione | Rippetoe, StrongLifts, GZCLP | Parziale (progressione unica, vedi cap. 17 punto 5) | Web |
| H-19 | Isolamenti e macchine, obiettivo massa | Doppia progressione: sali nelle ripetizioni fino al tetto (con 1-2 RIR) e **poi** aggiungi peso | Convenzione | Lyle McDonald; Dr. Muscle; siti di app | Sì: CAR-06 | Web |
| H-20 | Una serie finale AMRAP | La tabella delle ripetizioni in più decide il salto di carico | Convenzione | nSuns; SBS (RTF) | Sì: CAR-06 | Web |
| H-21 | Una serie mancata | Stesso peso, punta a più ripetizioni; due volte di fila: cambia schema o torna indietro del 5-10% | Convenzione | GZCLP; Rippetoe | Sì: CAR-07/09 (solo reset); PCO-01 aggiunge lo schema | Web |
| H-22 | Dopo 4-6 settimane da intermedio/avanzato | Settimana di scarico programmata | Convenzione | RP; Wendler (settimana 4); Candito (settimana 6) | Sì: PRG-01 | Web |
| H-23 | Stallo di un esercizio | Scarico mirato: serie -50% e peso -10% (Rippetoe e Baker 2014; Pritchard 2015: volume -30/-70% per 1-4 settimane, riportati da Dr. Muscle) | Convenzione | Dr. Muscle (riportato) | Sì: CAR-08/CAR-03 | Web |
| H-24 | Principiante, prime settimane | 2-3 serie per esercizio, RIR 3-4, ripetizioni fisse, nessun cedimento | Convenzione | Barbell Medicine; siti di terzi | Parziale: INT-04/05 (solo prima volta e prime due sedute). PCO-07 | Web |
| H-25 | La progressione lineare del principiante non regge più | Prima controlla cibo, sonno, tecnica; poi passi più piccoli; poi 5x3 invece di 3x5; poi giorno pesante/leggero; solo infine programma da intermedio | Convenzione | Rippetoe e riassunti | Parziale (vedi scala 5.1) | Web |
| H-26 | Poco tempo (≤ 45 min) | Superserie antagoniste (stesso volume in circa un terzo di tempo in meno); sedute full body; 1-2 serie dure per esercizio | Solida (superserie, meta-analisi 2025 nel repo) / Convenzione | Meta-analisi 2025; Nippard | Sì: ABB-06, PRG-34 | Repo + Web |
| H-27 | Scelta della pausa | 3 min per 6-8 ripetizioni; 2 min per 10-12; 90 s per 12-15 | Moderata (>60-90 s poca differenza, Singer 2024) / Convenzione | Lyle McDonald; Singer 2024 | Sì: PRG-13 | Web + Repo |
| H-28 | Inizio della seduta | Riscaldamento breve (RAMP 3-5 minuti: alza, mobilita) e **serie di avvicinamento** al primo fondamentale (50% x 8, 60% x 5, 70% x 3, 80% x 1 nei pesanti) | Convenzione | Jeffreys 2007; Cressey | Parziale: 3 serie di riscaldamento (50/70/85%) già in `seduta.js`; nota generale PCO-10 | Web |
| H-29 | Fine seduta | Defaticamento facoltativo: 3-5 minuti a bassa intensità e stretching a piacere; non promette crescita né meno dolenzia con prove solide | Convenzione | Meta-analisi su stretching (qualità bassa) | Sì: `termina-e-cardio.js` | Web |
| H-30 | Fine blocco, utente con alta motivazione al cambiamento | Ruota gli accessori, **non** i fondamentali; la crescita non cambia ma la motivazione sì | Moderata | Baz-Valle 2019 | Sì: STA-03 (sempre a inizio blocco). PCO-05 la rende condizionata | Web |
| H-31 | Giorni dichiarati ma ci si salta delle sedute | Meno giorni o sedute più corte prima che più varietà | Convenzione | Helms (aderenza) | Sì: ADE-01 | Web |
| H-32 | Valutare il livello | Per tecnica costante e velocità di progressione (seduta a seduta = principiante, settimana a settimana = intermedio, mese a mese = avanzato), non per età né per dichiarazione | Convenzione | Rippetoe; Nuckols | Sì: LIV-01 (sedute e mesi regolari) | Web |
| H-33 | Un coach vuole usare l'RPE | Calibra l'utente: l'errore di stima è circa 1 ripetizione, minore vicino al cedimento e sotto 12 ripetizioni | Moderata | Halperin 2022; Refalo 2023 (nel repo) | Sì: CAR-14 | Repo |
| H-34 | Si usa il back-off | Meno 5% dopo la serie principale (fatigue percent moderato) | Convenzione | RTS | Sì: CAR-13 | Web |
| H-35 | Obiettivo solo mantenere (periodo difficile) | Pochi esercizi, 1-2 sedute, stessi carichi: i muscoli restano con molto meno volume | Moderata (Bickel 2011, già nel repo) | Bickel 2011; Dan John (idea simile) | Sì: `mantenimento` | Repo |
| H-36 | Cliente donna | Stessa struttura, stesse fasce di ripetizioni e stessa logica di volume degli uomini; carichi guidati da RIR e prestazioni, non «più leggeri per principio»; pause un po' più brevi vanno bene; niente programmazione per fase del ciclo salvo richiesta | Moderata (da verificare) | Conoscenza del modello (pratica comune dei coach basati sull'evidenza, nessun nome verificato); repo: pause -15% (PeerJ 2025), ciclo come sonno e stress (Colenso-Semple 2023) | Sì: PRG-20, PRZ-01 | Modello + Repo |
| H-37 | Over 65 | 2-3 sedute a settimana, 1-3 serie da 8-12 ripetizioni a carico moderato, lavoro di potenza leggero e veloce solo se sicuro, equilibrio, progressione lenta, più riposo | Moderata (da verificare) | Conoscenza del modello (linee guida su adulti anziani, non verificate sul web); repo: ACSM 2026 | Sì: PRG-19, PRG-34, PRG-37 | Modello + Repo |
| H-38 | Principiante adulto (40+ o dopo anni di stop) | Meno serie e più RIR all'inizio, aumenti ogni 1-2 settimane invece che a ogni seduta | Convenzione | Conoscenza del modello | Parziale: CAR-04, RIC-05, INT-04 | Modello |
| H-39 | Serie lontane dal cedimento (oltre circa 4-5 RIR) o oltre il tetto per seduta | Non contarle come volume utile: meglio meno serie vicine al cedimento che molte facili | Convenzione (Robinson 2024: solo titolo visto) | Conoscenza del modello; Robinson 2024 (titolo) | Parziale: PRG-30 conta il tetto per seduta, non la prossimità al cedimento | Modello + Web |
| H-40 | Scelta delle pause | Pesanti 2-3 minuti, macchine 90-120 s, isolamenti 60-90 s | Moderata (da verificare) | Conoscenza del modello; Singer 2024 (titolo, repo) | Sì: PRG-13 | Modello + Repo |
| H-41 | Velocità di progresso attesa | Principiante: sale a ogni seduta o ogni settimana per mesi; intermedio: ogni 1-4 settimane; avanzato: ogni mesi. Un principiante che non sale: prima recupero, tecnica e cibo, poi il programma | Convenzione | Conoscenza del modello; Rippetoe (seduta/settimana/mese, riassunti web) | Sì: STA-01 (soglie 2 sedute, 4 settimane, 8 settimane) | Modello + Web |
| H-42 | Frequenza dello scarico | Ogni 4-8 settimane per intermedi e avanzati, o su segnali (prestazioni in calo, dolori articolari, sonno peggiore, zero voglia); volume -30/-50% tenendo i carichi, oppure carico -10% | Moderata (da verificare) | Conoscenza del modello; RP (web); Bell 2024 (repo) | Sì: PRG-01, PRZ-04, DEC-06, STR-01 | Modello + Web + Repo |
| H-43 | Dolore durante un esercizio | Cambia variante o ampiezza nella zona senza dolore e continua il resto; accettabile fino a circa 3/10 se non peggiora il giorno dopo; oltre soglia, rinvio a un professionista | Moderata (Silbernagel 2007, nel repo) | Repo | Sì: DEC-01..04, DOL-01 | Repo |
| H-44 | Attrezzatura limitata (solo macchine, solo bilanciere e rack, solo elastici) | Copri i 6 schemi di movimento con ciò che c'è; macchine guidate per chi comincia; con carichi leggeri alza ripetizioni, accorcia le pause, rallenta la discesa | Convenzione | Conoscenza del modello | Sì: PRG-07 | Modello |
| H-45 | Obiettivo dimagrimento | Mantieni carichi e un volume di mantenimento (non ridurre a zero), proteine adeguate, più passi: il lavoro di forza protegge la massa | Moderata (da verificare) | Conoscenza del modello; repo COR-01/COR-03 | Sì | Modello + Repo |
| H-46 | Seduta da 20 minuti (piano B) | 3-4 multiarticolari in superserie, 2 serie, RIR 1-2, niente isolamenti | Convenzione | Conoscenza del modello | Sì: SAL-01 | Modello |
| H-47 | Ritorno dopo una pausa | Riparti dal 70-90% dei carichi e da meno volume; risali in 1-3 settimane | Moderata (da verificare) | Conoscenza del modello; repo CAR-04, RIC-05 | Sì | Modello + Repo |
| H-48 | Età cronologica e di allenamento | La cronologica decide recupero, prudenza e articolazioni; la di allenamento (anni di costanza e velocità di progresso) decide struttura e volume | Convenzione | Conoscenza del modello | Sì: LIV-01 (training age) e PRG-19/PAR-02 (età) sono già separati | Modello |
| H-49 | Esercizi in posizione allungata | A pari fatica preferisci varianti che caricano il muscolo allungato | Moderata (Maeo 2021-2023, Pedrosa 2025: nel repo) | Repo | Sì: PRG-10, RIC-03 | Repo |
| H-50 | Principiante che vuole «un programma qualunque» | Full body 3 volte, un esercizio per schema, 2-3 serie, 8-12 ripetizioni, carico che sale piano: la costanza conta più della scheda | Convenzione | Conoscenza del modello; Helms (aderenza, web) | Sì: PRG-02, PRG-18 | Modello + Web |

## 4. Dove i coach non concordano

| Tema | Posizione A | Posizione B | Cosa adotta 3in e perché |
|---|---|---|---|
| Cedimento | HIT (Mentzer, Yates), Nippard Minimalist (1-2 serie spesso a cedimento), Beardsley (le ripetizioni utili sono le ultime vicino al cedimento) | RP (rampa RIR 3 → 0-1), Helms (RPE), SFR («mostly RPE 7-8») e Refalo 2023 (vantaggio 0,19, IC 0,00-0,37) | **Contrastata**. RIR 1-3 sui pesanti, 0-2 su macchine, 0-1 su isolamenti; con 2 serie per esercizio (dose minima) le serie contano di più: RIR 0-2 (PCO-04) |
| Volume massimo | RP: MRV 20-25+ per muscolo; Henselmans 10-30 | Critica a nSuns: «3-10 serie a seduta»; Nippard Minimalist 1-2 serie; Pelland: rendimenti decrescenti oltre 10-12 | **Contrastata**. 3in resta a 8-10 / 10-14 / 14-20 (PRG-25): i valori RP sono per avanzati e sono euristiche |
| Frequenza | Bro split (un muscolo a seduta, anche Mentzer/Yates con 4-7 giorni) | 2 volte (ACSM 2026; Henselmans con full body) | Frequenza 2 (Solida) e rispetto della scelta dell'utente (PRG-02) |
| Scarico | Programmato (RP, 5/3/1 settimana 4, Candito settimana 6) | Reattivo: nessun scarico programmato per i principianti, solo reset dopo il fallimento (SS, StrongLifts, GZCLP; Dr. Muscle: al plateau) | **Contrastata**. Intermedi e avanzati programmato (PRG-01) con dose sulla fatica (CAR-03); per i principianti la dose bassa di CAR-03 (-35% di volume) è già un compromesso. Domanda aperta (sezione 7) |
| Stacco da terra | Israetel: SFR basso per l'ipertrofia (poca crescita per la fatica che costa) | Starting Strength, StrongLifts, GZCLP: fondamentale di ogni scheda | Massimo 3 serie, una volta a settimana, non il giorno dopo un altro carico pesante sulla schiena (ABB-07/09). Chi vuole forza lo tiene |
| Progressione | Lineare a ogni seduta (SS, SL, GreySkull, Reddit PPL, GZCLP) | Settimanale o a blocchi (5/3/1, SBS, Candito, RP) e doppia progressione (isolamenti) | Non è un conflitto: dipende dal livello. 3in ha una sola progressione (cap. 17 punto 5): le due strade si sovrappongono con PCO-01 |
| Variare gli esercizi | Dr. Muscle e Westside: cambia per superare gli stalli | Starting Strength e StrongLifts: esercizi fissi per misurare i progressi; Baz-Valle 2019: crescita uguale | Fondamentali fissi; accessori ruotati solo quando serve (PCO-05) |
| Pause | Gironda 15-30 s; Reddit RR 90 s | Lyle McDonald 2-3 min; Sheiko 2-3 min | Singer 2024 (poca differenza oltre 60-90 s per la massa): pause per tipo di esercizio (PRG-13) |
| Quanto dura il blocco | RP 4-6 settimane; Wendler 4; Candito 6 | Nippard 8 settimane; SBS 21 settimane; Lyle 6-8 settimane | 4 settimane (intermedio) / 6 (avanzato) / 8 (principiante) già in PRG-01: dentro la forchetta |
| Tipologie (neurotipo) | Thibaudeau: 5 tipi con volume e carichi diversi | Nessuna validazione trovata | Non usare: **folklore** |
| Meccanismo (pump e dolenzia) | RP: pump e dolenzia come feedback per aggiungere serie | Beardsley: stress metabolico e danno sono sottoprodotti, non il motore | Usare pump e dolenzia come **segnale di recupero** (euristica), non come prova di crescita |
| Progressioni a corpo libero | RR: 3x5-8 e passaggio a 3x8 | Convict Conditioning: 10 gradini molto lenti | RR (regola più semplice e già nel repo) |
| Definizione di livello | Rippetoe: per capacità di recupero | Per anni di allenamento; Nuckols: tecnica e fine della progressione lineare | Misurare dai dati (LIV-01) |

### 4.1 Folklore e bandiere rosse trovate

- Neurotipi di Thibaudeau: tipologia non validata.
- «Meta-analisi 2023: RAMP -20% infortuni»: citata da un solo sito di terzi, non ritrovata; non usare.
- «PHAT ha il 90% di ripetizioni in più»: è un conteggio, non un risultato.
- «La dolenzia = crescita» e «pump = crescita»: meccanismo non provato (Beardsley); usarli solo come segnale di recupero.
- Grease the Groove e Easy Strength: nessuno studio visto; sono metodi di pratica per la forza relativa.
- Convict Conditioning: progressioni con passi insensati o rischiosi secondo recensioni; aneddoti su tendini «blindati».
- «Molti registri nSuns finiscono a 10 settimane con tendiniti»: aneddoto.
- Programmi a pagamento (Nippard, RP, Barbell Medicine, Candito) descritti da siti di terzi: i dettagli non sono verificabili qui.

## 5. Come cambiare le schede nel tempo

### 5.1 Scala degli stalli (dal più economico al più costoso)

| Gradino | Cosa fa il coach | Chi lo dice | In 3in |
|---|---|---|---|
| 0 | **Controlla recupero e tecnica**: sonno, cibo, dolore; se la prontezza è sotto 60, non cambiare il programma ma alleggerire | Rippetoe e riassunti (a 6 settimane di stallo quasi sempre tecnica, recupero o cibo) | Sì: PRZ-02, PRZ-04 |
| 1 | Una serie mancata: stesso peso, più ripetizioni (+30-45 s di pausa) | GZCLP, Rippetoe | Sì: CAR-09, RIC-02 |
| 2 | Passi di carico più piccoli (microcarichi) | Rippetoe | Sì: CAR-06 |
| 3 | **Cambia lo schema di serie e ripetizioni a pari carico**: T2: 3x10 → 3x8 → 3x6; T1 (forza): 5x3+ → 6x2+ → 10x1+; panca e press: 3x5 → 5x3 | GZCLP; Rippetoe | Solo principianti sui pesanti (CAR-07). PCO-01 |
| 4 | Reset del carico: -10% (-5% principiante), oppure ripartenza dall'85-90% di un nuovo 5RM; per l'ipertrofia l'ultimo peso 3x10 più un incremento | Rippetoe e Baker 2014; GZCLP | Sì: CAR-07 |
| 5 | Scarico: serie -50% e peso -10%, oppure volume -30/-70% per 1-4 settimane | Dr. Muscle (riportato); Pritchard 2015 (non visto) | Sì: CAR-03/08/10 |
| 6 | Se la crescita è l'obiettivo: **aggiungi serie** (fino a 10-15 per settimana per muscolo) quando si recupera bene | Dr. Muscle; RP | Parziale: STA-02 (+20% serie), RIC-01 |
| 7 | Cambia variante (angolo, ROM, posizione allungata) o onda di ripetizioni (6-8, 8-12, 10-15 ogni 3-4 settimane) | Dr. Muscle (riportato) | Sì: STA-02; onde non presenti |
| 8 | Passa a una struttura da intermedio (giorno pesante e giorno di volume: GZCLP, PHUL, onda 5/3/1), **solo se ogni gradino sopra è stato provato** | Rippetoe («saltare subito all'intermedio è l'errore più comune») | Parziale: CIC-02 alterna blocco ipertrofia e forza |

### 5.2 Rotazione degli esercizi

- Fondamentali fissi per tutto il blocco (misurabilità del progresso; PRG-08 per la forza).
- Accessori: crescita uguale con o senza variazione (Baz-Valle 2019, n=21, 8 settimane, uomini allenati) ma la motivazione è più alta con la variazione. Quindi rotare **quando serve** (stallo, noia, fastidio) e non per principio.
- Costo della rotazione in 3in: lo storico e i massimali restano legati al nome vecchio, quindi per l'esercizio nuovo la progressione riparte dalla stima di partenza (cap. 17 punto 6). Questo è un motivo concreto per rotare meno.

### 5.3 Struttura del mesociclo (cosa fanno le fonti)

| Fonte | Lunghezza | Contenuto | Scarico |
|---|---|---|---|
| RP | 4-6 settimane di accumulo | +serie, RIR 3 → 0-1 | 1 settimana |
| Wendler 5/3/1 | 4 settimane | 5s, 3s, 5/3/1 con AMRAP | settimana 4 |
| Candito | 6 settimane | condizionamento, ipertrofia, forza, picco | settimana 6 |
| Lyle (GBR) | 6-8 settimane | sett. 1 all'80-85%, +5% a settimana per 3 settimane, poi aumenti al tetto | non visto |
| Nippard (FH) | 8 settimane | 3, 4 o 5 giorni | non visto |
| SBS | 21 settimane | programmi lunghi con TM che sale o scende | non visto |
| 3in | 8 settimane (principiante, blocco 3+1), 12 (intermedio, 3+1), 12 (avanzato, 5+1) | RIR 3-2-1-0 (solo avanzati) | ultima settimana del blocco |

### 5.4 Prime 4 settimane del principiante (modello di lavoro)

Fonti: Barbell Medicine (2-3 serie impegnative), siti di terzi (RIR 3-4 all'inizio, ripetizioni fisse nei primi mesi), ACSM 2009/2026 nel repo (8-12 ripetizioni massime, 2-3 sedute, aumenti del 2-10% quando si fanno 1-2 ripetizioni sopra il bersaglio). Il modello sotto è una **mia composizione (Conoscenza del modello, non verificata sul web)**: Convenzione.

| Settimana | Serie per esercizio | RIR | Carico | Note |
|---|---|---|---|---|
| 1 | 2 (primo esercizio di ogni schema: 2-3) | 3-4 | Leggero: il carico è una stima (PAR-01..05); si corregge in fretta (CAR-16/17) | Tecnica; 3 sedute full body non consecutive; nessun cedimento |
| 2 | 2-3 | 3 | +2-5% se l'ultima serie è facile | Si impara a stimare il RIR |
| 3 | 3 | 2-3 | Doppia progressione 8-12 | Introduce il bilancio INT-05 (già dopo la seconda seduta) |
| 4 | 3 | 2 (una serie di calibrazione solo su un isolamento: CAR-14) | Aumento solo se tutte le serie fatte | **Scarico (PRG-01)**: dose bassa di CAR-03 se la fatica è bassa. Contrastata: SS, StrongLifts e GZCLP non programmano scarichi per i novizi |

Variante forza con bilanciere (sedute A/B, 3x5, aumento a ogni seduta): la progressione lineare dura 3-9 mesi (siti di terzi su Rippetoe); poi si passa ai gradini della scala 5.1.

### 5.5 Dose minima: matrice minuti × giorni (derivata dal modello di tempo dell'app, non da una fonte)

Modello PRG-33: 8 minuti di base più, per ogni serie, 35 s di lavoro e la pausa (media 90 s). Serie utili per seduta senza superserie: **30 min circa 10, 45 min circa 18, 60 min circa 25, 90 min circa 39** (con superserie antagoniste circa +30-50%, ABB-06). Il tetto per seduta (circa 11 serie per muscolo, PRG-30) vale sempre.

| Minuti | 2 giorni | 3 giorni | 4 giorni | 5-6 giorni |
|---|---|---|---|---|
| 30 | Full body x2, 5 esercizi x 2 serie (circa 20 serie a settimana: 3-4 per gruppo). È `minimo` | **Full body x3, 4-5 esercizi x 2 serie** (24-30 serie) in superserie antagoniste, RIR 0-2: PCO-04 | Upper/Lower x2, 5 esercizi x 2 serie (40) | PPL-lite o U/L/Push/Pull/Legs, 5 esercizi x 2 serie (50-60): meno giorni più lunghi è meglio per l'aderenza |
| 45 | Full body x2, 6 esercizi x 3 serie (36: circa 6 per gruppo) | Full body x3 o Upper/Lower/Full body (ABB-05), 6 esercizi x 3 (54) | Upper/Lower x2, 6 esercizi x 3 (72) | PPL+UL, 5-6 esercizi x 3 (75-110) |
| 60 | Full body x2, 7 esercizi x 3-4 (50) | Upper/Lower/Full body, 7 esercizi x 3 (circa 63) | Upper/Lower x2, 7 esercizi x 3-4 (84-112) | PPL (+UL) con 6-7 esercizi x 3 (90-125) |
| 90 | Non consigliato (troppe serie per seduta: sopra il tetto di 11 per muscolo) | Upper/Lower/Full body con 7 esercizi e pause lunghe sui pesanti | Upper/Lower x2 o PHUL | PPL x2 (6 giorni) o PPL+UL: qui contano recupero e aderenza |

Aspettative oneste da dire all'utente: con 2 giorni da 30 minuti si raggiunge il minimo (salute, mantenere, crescita da principiante); per crescere in modo evidente servono almeno 10 serie per muscolo (Pelland 2025): 3 giorni da 45 minuti arrivano a circa 9 serie dirette per gruppo principale, più il lavoro dei sinergisti nei multiarticolari.

### 5.6 Casa: manubri e corpo libero

Manubri (3 giorni full body A/B/A, B/A/B; **Conoscenza del modello, non verificata sul web**: schema di lavoro mio, Convenzione): A: goblet squat, stacco rumeno con manubri, panca/pavimento o piegamenti, rematore a un braccio, press sopra la testa, plank; B: affondi o step-up, hip thrust a terra o ponte, piegamenti inclinati o declinati, rematore inverso/chinato, alzate laterali + curl, core. 3 serie, 8-12 ripetizioni (doppia progressione), RIR 1-3.

Quando il manubrio più pesante non basta (tutte le serie al tetto delle ripetizioni): (1) sali di ripetizioni fino a 15-20 vicino al cedimento (ACSM 2026: l'ipertrofia si ottiene dal 30% al 100% di 1RM); (2) poi variante più difficile o unilaterale (goblet squat → bulgaro, piegamenti → piedi rialzati); (3) tempo lento in discesa (3 s) e pause. L'ordine è Convenzione; il passo (1) è Solido (ACSM 2026). Va chiesto il manubrio più pesante all'utente (PCO-06).

Corpo libero (Reddit RR): 3 serie da 5-8, quando si fanno 3x8 si passa alla variante più difficile e si riparte da 3x5, coppie antagoniste, 90 s di pausa, 5-10 minuti di riscaldamento.

## 6. Regole proposte

Tutte spegnibili (`REGOLE_SPEGNIBILI`), con consenso, non per cauto, over 65, PAR-Q positivo, dolore o scarico dove indicato, con motivo scritto in italiano (frasi nuove anche in `en.js`, `es.js`, `de.js`) e annullabili. **Nessuna è ancora stata scritta nel codice.**

| Codice proposto | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **PCO-01** scala a gradini prima del reset | Un esercizio multiarticolare pesante o a macchina è «mancato» due volte di fila (CAR-07) e non è già nello stallo del principiante; obiettivo massa/ricomposizione/salute | Tiene lo stesso carico e cambia schema: 3x10 → 3x8 → 3x6 (poi riparte da 3x10 con l'ultimo carico 3x10 più un incremento). Con obiettivo forza: 5x5 → 5x3 → reset del 10% (6x2 e 10x1 restano solo ai principianti, CAR-07). Dopo l'ultimo gradino: reset come oggi | «Il peso non sale da due sedute: tengo lo stesso carico e passo a meno ripetizioni (3x8). È la scala di GZCLP: prima si cambia lo schema, poi si scende di peso.» | Convenzione (GZCLP, Rippetoe) | Non per cauto, over 65 o dolore (solo reset). Serve un contatore di gradino per esercizio (campo in `aggiusti.stalli`). Annullabile. Test in `regole-nuove.js` | `js/coach/regole-ricerca.js` `caricoProssimoBase` (blocco CAR-07/09 intorno a riga 215), `imparaDallaSeduta` (riga 272); soglia in `js/coach/parametri.js` |
| **PCO-02** rampa RIR da intermedio e limite sui pesanti | Programma da intermedio (oggi senza `rirSett`); in più, per tutti i livelli con `rirSett`, esercizi «pesanti» | Intermedi: RIR 3, 2, 1 nelle tre settimane di carico del blocco, 4 nello scarico (oggi solo gli avanzati). Per tutti: sui pesanti il limite inferiore è 1 (oggi l'ultima settimana avanzata dà [0,1] anche allo squat) | «Nelle settimane del blocco ti avvicino piano al limite: 3, 2, 1 ripetizioni in riserva. Sui fondamentali pesanti resti a 1 in riserva: il cedimento rende poco e costa fatica.» | Convenzione (RP: RIR 3 → 0-1); il limite sui pesanti è coerente con Refalo 2023 (0,19) | Non per cauto, over 65, principianti, dolore. Rischio: più fatica nelle settimane 3 | `js/coach/programma/ricette.js` (blocco `rirSett`, riga 388-393); `js/coach/regole-ricerca.js` `rirBersaglioBase` (riga 57) |
| **PCO-03** feedback per gruppo: aggiungi o togli serie | Intermedio/avanzato; il gruppo muscolare G ha 2 sedute a settimana. Aggiungi: nelle ultime 2 sedute di G tutte le serie fatte, RPE medio almeno 1 sotto il bersaglio, prontezza media ≥70 e dolenzia 0. Togli: dolenzia «ancora forte» dichiarata prima di G in 2 delle ultime 3 sedute oppure e1RM in calo | +1 serie sull'ultimo esercizio di G nella settimana seguente (massimo del livello di PRG-25, non oltre 11 serie per seduta, mai nella settimana prima dello scarico); oppure -1 serie (minimo 2) | «Il petto era recuperato e le serie ti sono sembrate facili: questa settimana una serie in più. / Era ancora dolorante: una serie in meno finché non recuperi.» | Convenzione (RP: feedback pump/dolenzia/carico, riportato) | Serve **un dato nuovo**: dove sei dolorante (una domanda con 6 chip, solo se la dolenzia è alta). Non per cauto, over 65, principianti, dolore (il dolore ha DEC). RIC-01 resta come caso particolare (prioritari a metà blocco) | `js/coach/prontezza.js` (`PRONTEZZA_VOCI`, `applicaProntezza`); `js/coach/regole-nuove.js` (`caricoProssimo` e `gruppoInPriorita`, riga 46-59); parametri in `parametri.js` |
| **PCO-04** dose minima a 3 giorni e serie dure | Metodo `minimo` (oggi solo 2 giorni, ≤35 min o periodo difficile) con 3 giorni scelti | Il metodo accetta anche 3 giorni (full body x3, 4-5 esercizi x 2 serie, superserie antagoniste); con 2 serie per esercizio i pesanti hanno RIR 1-2 e macchine/isolamenti 0-2, non il 3 | «Hai 30-45 minuti: con 3 sedute e 2 serie vere per esercizio si ottiene tanto. Con poche serie ogni serie deve essere impegnativa.» | Moderata (Androulakis-Korakakis: forza, uomini allenati); Convenzione per l'ipertrofia (Nippard) | Principianti: RIR resta ≥2 (non si porta a cedimento chi comincia). Cauto/over 65: RIR 3-4 invariato | `js/coach/metodi-momenti.js` (id `minimo`: `giorni: [2]`, `split: FB(2)`); `js/coach/compone.js` `metodoAmmesso` (riga 34); `rirBersaglio` |
| **PCO-05** rotazione degli accessori condizionata | Inizio blocco (STA-03) | Ruota gli accessori solo se almeno uno: un accessorio è fermo (STA-01), l'utente ama cambiare (varietà > 1), un fastidio ricorre. Altrimenti li tiene per un secondo blocco | «Tengo gli stessi esercizi complementari: i tuoi progressi restano misurabili. Variare non fa crescere di più (Baz-Valle 2019), ma se ti annoi dimmelo e li cambio.» | Moderata (RCT n=21) | Costo basso. Rispetta «Cambiare spesso» del profilo | `js/coach/repertorio.js` (`azioniCoach`, riga 199; tipo `'ruota'` riga 106; `bloccoCorrente` riga 134) |
| **PCO-06** casa: scala quando il manubrio finisce, e regola RR | Luogo «manubri» o «corpo»: tutte le serie al tetto e (manubri) peso uguale al manubrio più pesante dichiarato | Gradini: ripetizioni fino a 15-20 → variante unilaterale o più difficile → tempo lento (3 s in discesa) e pause. Corpo libero: 3x8 → variante più difficile e si riparte da 3x5 (regola RR a tutto il corpo libero) | «Hai raggiunto il manubrio più pesante: prima salgo di ripetizioni (fino a 15-20 vicino al limite), poi passo a una variante più difficile.» | Moderata (carichi 30-100% di 1RM: Solida, ACSM 2026; l'ordine dei gradini è Convenzione) | Serve chiedere il manubrio massimo (campo nuovo nell'onboarding casa). Over 65: niente unilaterali instabili senza appoggio | `js/coach/regole-ricerca.js` `caricoProssimoBase` (CAR-05/CAR-06 isolamenti); `js/ui/onboarding*.js` (nuovo campo); `js/coach/metodi-momenti.js` metodo `rr` |
| **PCO-07** prime 2 settimane del principiante | Principiante, prime 2 settimane del programma, ogni esercizio (non solo la prima volta con quell'esercizio come INT-04) | RIR +1 su tutti gli esercizi e al massimo 2-3 serie; dalla settimana 3 serie piene | «Nelle prime due settimane stai più lontano dal limite: impari i movimenti e il muscolo si abitua senza troppa dolenzia.» | Convenzione (Barbell Medicine, siti di terzi) | Costo quasi nullo (meno stimolo, più aderenza). Spegnibile | `js/coach/intensita.js` (`rirExtraIntensita`, INT-04); `js/coach/regole-ricerca.js` `rirBersaglio` |
| **PCO-08** spalle sane (Cressey) | Fastidio «spalle» dichiarato e giorno con spinte | Aggiunge 2-3 serie di rotazione esterna o face pull una o due volte a settimana e alterna spinte con scapola libera e fissa (piegamenti, landmine, cavi) | «Con la spalla delicata aggiungo un lavoro leggero per la cuffia dei rotatori e alterno i tipi di spinta.» | Convenzione (Cressey) | Non cura: resta la soglia di rinvio al medico (DEC-03/04: dolore ≥6/10 o in aumento, formicolii, perdita di forza improvvisa). Non più di 2 esercizi aggiunti | `js/coach/programma/ricette.js` (`buildProgram`, `prefs.fastidi`); `SCALE_DOLORE` (PRG-24); `js/coach/biomeccanica.js` |
| **PCO-09** spareggio per aderenza | Due metodi o split hanno punteggio entro 1 punto (`metodiPerTe`, MET-02) | Sceglie quello con meno giorni o sedute più corte, a parità di obiettivo | «Tra due schede quasi uguali scelgo quella più facile da seguire: la costanza batte la scheda perfetta.» | Convenzione (Helms: l'aderenza è la base della piramide) | Nessuno | `js/coach/compone.js` `metodiPerTe`/`sceltaMetodo` |
| **PCO-10** nota di riscaldamento generale | Prima seduta del giorno, prima serie del primo fondamentale | Testo di 3-5 minuti: alza la temperatura (cyclette/camminata/corda), mobilità delle articolazioni che lavorano, poi le serie di avvicinamento già presenti | «Prima del primo fondamentale: 3-5 minuti per scaldarti, poi le serie di avvicinamento.» | Convenzione (RAMP, Jeffreys 2007; Cressey). **Non usare** il dato «-20% infortuni» (non verificato) | Nessuno | `js/ui/allenamento/seduta.js` (sezione riscaldamento, riga 62-90) |

## 7. Domande aperte

1. **Temi non ricercati per esaurimento del budget WebSearch (200/200).** Donne contro uomini, over 65, pause, junk volume, velocità di progressione, scarico, struttura esatta di Starting Strength, StrongLifts, Texas Method, Westside, Nippard PPL, PHAT: sezione 1.3, 2.20 e H-36..H-50 sono Conoscenza del modello. Le query per verificarle sono nell'**Appendice A**.
2. **Scarico programmato per i principianti.** SS, StrongLifts e GZCLP non lo programmano; RP, 5/3/1 e Candito lo prevedono per gli intermedi; nessuno studio visto sui novizi. Da cercare: `deload novice trainees randomized`.
3. **Landmark RP per muscolo.** Servirebbe il testo di RP (rpstrength.com «Training volume landmarks», non apribile) per sapere come sono stati ricavati e se hanno un autore o un anno. Finché non si legge, restano euristiche.
4. **Video e podcast.** Visti solo i titoli: Nippard «The Best Science-Based Minimalist Workout Plan (Under 45 Mins)» (YouTube), Legion Athletics ep. 604 «Menno Henselmans on the Benefits of Full-Body Workouts». Tutto ciò che si dice di loro è «riportato da ..., da verificare»: mancano trascrizioni (rete.md, sezione 4).
5. **Stretching dopo l'allenamento.** Esito della meta-analisi PMC8133317 non visto in modo affidabile: serve l'abstract (titolo e rischio di bias visti).
6. **Esercizi a carico del solo corpo.** Numeri di Pelland sui volumi sono per pesi; per il corpo libero (RR) e per le sedute con manubri leggeri non c'è un dato di volume equivalente.
7. **Dati richiesti dalle regole proposte**: dolenzia per gruppo (PCO-03) e manubrio più pesante disponibile (PCO-06).

## 8. Limiti onesti

- **Copertura:** 37 ricerche web riuscite; il resto è Conoscenza del modello (non verificata sul web), marcata come tale (sezioni 1.3, 2.20, H-36..H-50, 5.4, 5.6, colonna «Origine»).
- **Una sola via di ricerca (WebSearch)** e 37 ricerche utili: ogni numero è il riassunto di un risultato scritto da un modello su snippet di siti di terzi (Lift Vault, Boostcamp, Legion, Coachway, siti di app); mai un testo dell'autore. I numeri sono citati come comparivano.
- **Quasi tutto è Convenzione**: le schede dei coach non sono esiti di studi. Gli unici studi visti sono Refalo 2023, Androulakis-Korakakis (PMID 31797219), Baz-Valle 2019 e titoli (Singer 2024, Pelland, periodizzazione, stretching), tutti in forma di riassunto di un risultato.
- **Programmi a pagamento** (Nippard, RP, Barbell Medicine): dei risultati sono comparsi anche PDF diffusi senza autorizzazione; non li ho usati né li cito, e i dettagli di esercizi e progressione dei programmi commerciali non sono ripresi qui.
- **Conflitti di interessi**: RP, Nippard, Helms, Dr. Muscle, Barbell Medicine, Thibaudeau vendono programmi o app; Dr. Muscle è il sito di un'app.
- **Popolazione**: quasi tutto riguarda uomini giovani allenati; per donne e over 65 la nota non aggiunge nulla (sezione 7).
- **Cifre di Pritchard 2015 e Rippetoe e Baker 2014** compaiono solo come citazioni riportate da Dr. Muscle: non viste.
- **Il modello di tempo della sezione 5.5** è calcolo mio sul codice, non fonte esterna.

## Appendice A. Query pronte (da lanciare in una sessione con il tetto alzato)

Metodo come in `.claude/skills/ricerca-fitness/SKILL.md`: prima senza filtri per orientarsi, poi con `allowed_domains` PubMed/PMC per identificare lo studio, poi `["youtube.com"]` per titoli di video. Per ogni risultato annotare n, popolazione, effetto, anno, conflitti. «Chiarisce» = cosa deve confermare o smentire la query.

| # | Query | Dominio consigliato | Chiarisce | Tocca |
|---|---|---|---|---|
| 1 | `Renaissance Periodization hypertrophy template male physique exercises sets reps` | rpstrength.com | Struttura esatta dei template RP, livelli | 2.1 |
| 2 | `Renaissance Periodization volume landmarks how derived MEV MAV MRV Israetel` | rpstrength.com | Origine dei landmark, autore, anno | H-11, PRG-25 |
| 3 | `RP Hypertrophy App soreness pump workload feedback add remove sets algorithm` | rpstrength.com | Regola esatta del feedback 1/0/-1 | PCO-03 |
| 4 | `Jeff Nippard push pull legs program structure sets reps RIR` | jeffnippard.com | Struttura PPL e powerbuilding | 2.20 |
| 5 | `Jeff Nippard Fundamentals Hypertrophy progression deload weeks` | jeffnippard.com | Progressione e scarico | 2.2 |
| 6 | `Eric Helms RIR RPE recommendations beginners intermediates 3DMJ` | senza filtro | Quando usare RIR con i principianti | PCO-07, H-24 |
| 7 | `Henselmans full body versus split training frequency recommendation` | mennohenselmans.com | Regola su frequenza e split | H-01, H-05 |
| 8 | `Stronger By Science how fast should you progress rate of progress intermediates` | strongerbyscience.com | Velocità di sovraccarico per livello | H-41 |
| 9 | `Stronger By Science novice hypertrophy program structure linear progression` | strongerbyscience.com | Struttura dei programmi per principianti | 2.6 |
| 10 | `Wendler 5/3/1 progression increments reset rules` | senza filtro | Incrementi e regola di reset | 2.7 |
| 11 | `GZCL Jacked and Tan 2.0 structure` | senza filtro | Metodo GZCL oltre GZCLP | 2.8 |
| 12 | `nSuns 5/3/1 LP original rules deload` | senza filtro | Scarico e tabella AMRAP originale | 2.9, CAR-06 |
| 13 | `Candito linear program novice structure` | senza filtro | Struttura | 2.10 |
| 14 | `Sheiko routine 29 sets percentages structure` | senza filtro | Struttura e percentuali | 2.11 |
| 15 | `RTS General Intermediate program structure RPE ranges fatigue percent` | reactivetrainingsystems.com | Struttura e regole di carico | 2.12 |
| 16 | `Barbell Medicine Powerlifting Basics template structure` | barbellmedicine.com | Struttura e RPE per livello | 2.13 |
| 17 | `PHAT workout exercises sets reps power day hypertrophy day` | senza filtro | Esercizi e serie esatti | 2.14 |
| 18 | `Starting Strength novice program exact sets reps progression reset rules` | startingstrength.com | Struttura e passi di carico esatti | 2.15, 2.20 |
| 19 | `StrongLifts 5x5 progression deload rules` | stronglifts.com | Regole di fallimento e scarico | 2.20 |
| 20 | `GreySkull LP rules AMRAP double increment` | senza filtro | Regola del raddoppio | 2.20 |
| 21 | `Texas Method percentages volume day recovery day intensity day` | senza filtro | Percentuali | 2.20 |
| 22 | `Reddit PPL Metallicadpa exact program days exercises` | senza filtro | Esercizi e serie | 2.20 |
| 23 | `Westside conjugate method dynamic effort sets reps percentages` | senza filtro | Giorni dinamici | 2.20 |
| 24 | `Dan John Mass Made Simple program structure` | senza filtro | Struttura | 2.17, 2.20 |
| 25 | `sex differences resistance training hypertrophy women recovery volume systematic review` | PubMed/PMC/Europe PMC | Differenze reali, n, effetto | H-36 |
| 26 | `split-body versus full-body resistance training women randomized trial` | PubMed/PMC | Esito di PMC9107721 | H-36, H-01 |
| 27 | `NSCA position statement resistance training older adults Fragala 2019` | PubMed/PMC | Raccomandazioni su serie, frequenza, potenza | H-37 |
| 28 | `resistance training older adults power training meta-analysis sarcopenia Phillips` | PubMed/PMC | Prove per over 65 | H-37, PRG-19 |
| 29 | `deloading Bell 2024 Delphi consensus strength conditioning` | PubMed/PMC | Frequenza e dose di scarico | H-42, CAR-03 |
| 30 | `Pritchard 2015 deloading volume reduction review` | PubMed/PMC | Cifra «volume -30/-70%» | 5.1 gradino 5 |
| 31 | `deload novice trainees linear progression randomized` | PubMed/PMC | Scarico programmato per principianti | Domande aperte 2 |
| 32 | `inter-set rest interval hypertrophy Bayesian meta-analysis Singer 2024` | PubMed/PMC | Soglie di pausa | H-27, H-40 |
| 33 | `Robinson 2024 meta-regression proximity to failure hypertrophy strength` | PubMed/PMC | Effetto per RIR | H-16, H-39, PCO-02 |
| 34 | `systematically varying resistance exercises muscle hypertrophy strength 2024` | PubMed/PMC (PMID 39388663) | Esito della variazione | PCO-05 |
| 35 | `minimal dose resistance training Iversen 2021 time-efficient hypertrophy` | PubMed/PMC | Base di `minimo` | PCO-04 |
| 36 | `RAMP warm-up meta-analysis injury prevention 2023` | PubMed/PMC | Verifica del «-20% infortuni» | PCO-10 |
| 37 | `post-exercise stretching delayed onset muscle soreness meta-analysis results` | PubMed/PMC (PMC8133317) | Esito reale sullo stretching | H-29 |
| 38 | `training age definition novice intermediate advanced strength progression` | strongerbyscience.com | Definizione di livello | H-32, H-48 |
| 39 | `heavy versus light loads hypertrophy trained dumbbell home training` | PubMed/PMC | Carichi leggeri a casa | PCO-06, H-17 |
| 40 | Titoli video: `Jeff Nippard minimalist workout`, `Mike Israetel how to program volume`, `Eric Helms RPE autoregulation`, `Menno Henselmans full body` | youtube.com | Solo titoli e URL: ogni affermazione resta «riportato da ..., da verificare» | 2.3, 1.2 |
