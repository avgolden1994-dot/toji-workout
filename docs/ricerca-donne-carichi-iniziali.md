# Ricerca: donne, carichi di partenza prudenti e allenamento al femminile

Ambito: sostiene la decisione di prodotto «**carichi di partenza BASSI per le donne fino al livello intermedio**, poi salita rapida». Tocca `PAR-01..05` (`js/coach/carichi/partenza.js`), `CAR-16/17` e `INT-04` (calibrazione delle prime sedute), `PRG-20` (pause delle donne), `PRZ-01` (ciclo come voce di prontezza), `LIV-02`/`STANDARD_FORZA`, `COR-03`/`BIA-02` (soglie del corpo) e `REC-12` (gravidanza). Codici nuovi: **DON-01..DON-16**. Data della ricerca: 2026-10-05.

**Copertura: 20 ricerche web riuscite; il resto da conoscenza del modello.** Il tetto di 200 ricerche condiviso dalla sessione si è esaurito prima delle 35 richieste. Tutto ciò che non è stato visto in un risultato è marcato **[M]** e non diventa regola senza la verifica elencata in Appendice B.

Come si legge:
- **[V]** visto in un risultato di WebSearch di questa sessione (riassunto del risultato, mai il testo integrale; titolo e ID dai link).
- **[M]** *Conoscenza del modello (non verificata sul web)*. Autori e anni solo dove il ricordo è sicuro; numeri come intervalli.
- **[D]** derivato da un mio calcolo (formula e parametri in 3.1; script di controllo non versionato, nessun file dell'app toccato).
- **[R]** già nel repo, non riverificato. **[S]** visto da un altro agente nelle note parallele in `docs/ricerca-*.md`.
- Forza: **Solida / Moderata / Convenzione**, più la bandiera **Contrastata**. Le tabelle degli standard di forza sono di terzi (livello 3): **Convenzione**, come in `ricerca-forza-progressione.md` 1.5.

---

## 0. In breve

1. **La struttura di PAR è coerente con l'anatomia, la base è troppo alta.** Il rapporto muscolo/peso delle donne (30,6% contro 38,4% degli uomini, Janssen 2000 [V]) corrisponde a `fracMagra` 0,74/0,82 e a `sessoParteAlta` 0,9 (0,81 sulla parte alta, 0,90 sulla bassa). Ma il livello «principiante = 1» parte dai valori della libreria, pensati per un uomo di 75 kg che ha già alzato qualcosa: [D] corrispondono a un livello «Novice» di Strength Level, non a una persona **mai allenata**.
2. **Per una donna di 65 kg principiante, senza BIA, PAR oggi dà: panca con bilanciere 25 kg, lat machine 25 kg, squat 32,5 kg, military 20 kg, curl con bilanciere 20 kg.** Rispetto all'1RM tipico di una donna non allenata (àncore Symmetric Strength: squat 0,62, panca 0,42, stacco 0,73 volte il peso [V, terzi]) sono, sulla parte alta con barra o macchina, **l'85-120% di un massimale** per serie da 8-12 ripetizioni (sulle gambe 65-95%, su isolamenti a cavo e abduttori 50-60%) [D]. Il carico giusto per una prima seduta a 3-4 ripetizioni di riserva è circa **il 60% di quello di PAR sulla parte alta, il 65% su gambe e glutei, il 75% sugli isolamenti** [D].
3. **Il pavimento della barra (20 kg, PAR-04) e il limite inferiore del fattore (0,45, PAR-02) annullano da soli una partenza bassa**: con il fattore proposto la panca scende a 14-15 kg, sotto la barra vuota, e il limite 0,45 riporterebbe comunque a 18 kg. Vanno cambiati insieme (DON-01, DON-03).
4. **La partenza bassa costa poco**: con salti del 10-25% a seduta si torna al valore di PAR in 4-5 esposizioni (circa 1,5-2 settimane a 3 sedute) [D]. La calibrazione attuale (CAR-16: +5% per punto di RPE, tetto +15%; CAR-17: -5%) è troppo lenta in entrambe le direzioni per correggere un errore del 40-60% (DON-04).
5. **Le donne guadagnano forza e muscolo quanto gli uomini in valore relativo** (Refalo 2025: differenza relativa 0,69%; Roberts 2020; anziani: più forza relativa nella parte bassa) [V]: non servono volumi o schemi «da donna», servono carichi assoluti più bassi, soprattutto nella parte alta (donne al 50-60% degli uomini in forza assoluta; 60-70% nella parte bassa) [V].
6. **Le donne hanno più ripetizioni di riserva a pari % del massimale sotto l'80%** (più ripetizioni a 50-75% 1RM; recupero migliore) [V, riassunti con studi non identificati]: una partenza bassa sembrerà «troppo facile» e va risalita in fretta; non è un argomento per partire più pesanti.
7. **Ciclo mestruale: nessuna programmazione per fasi** (convergenza delle meta-analisi [M]; già così in PRZ-01; DON-10). Gravidanza, post-partum, menopausa, RED-S: l'app informa, rinvia e non prescrive (DON-12..14).
8. **Un'avvertenza onesta**: lo stesso metodo (stesse àncore) suggerisce che anche gli **uomini** partono troppo alti con PAR (circa -30%) [D]. La decisione «solo donne» è difendibile ma non è l'unica che i dati autorizzano (Domande aperte 1).

---

## 1. Cosa dicono le fonti

### 1.1 Differenze di sesso: massa e forza, parte alta e bassa

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Distribuzione del muscolo | Risonanza magnetica su 468 adulti 18-88 anni: muscolo scheletrico 33,0 kg (uomini) contro 21,0 kg (donne); 38,4% contro 30,6% del peso. Donne con **40% di muscolo in meno nella parte alta** e **33% in meno nella parte bassa** | Moderata (studio unico trasversale, riassunto visto; un secondo titolo sulla distribuzione in giovani giapponesi, PMC1751351, non letto) | Janssen e colleghi 2000, J Appl Physiol 89:81-88 [V] |
| Forza assoluta, parte alta | Forza delle donne **50-60%** di quella degli uomini; alcuni studi 40-55% su 1RM di panca e chest press; un'altra sintesi dice «uomini 90% più forti» (cioè donne circa 53%) | Moderata (riassunto di più fonti, non attribuibile a una sola) | Riassunto di una ricerca con più risultati, attribuzione ai singoli studi non verificabile; titoli tra i risultati: «Sex differences in resistance training: a brief narrative review» (Springer, DOI 10.1007/s11332-026-01650-8), PMC7930971, PMC11971925 (bambini e adolescenti) [V] |
| Forza assoluta, parte bassa | Donne **60-70%**; leg press e squat con bilanciere circa 60-65% | Moderata | stessa sintesi [V] |
| Forza e massa magra | 44 studenti (22 + 22), presa e salto: forza delle donne oltre il 50% di quella degli uomini, massa magra delle donne 55% di quella degli uomini; la forza di presa **non** correla con la massa magra nelle donne (r = -0,12; uomini r = 0,47). Conclusione degli autori: pesa il rapporto grasso/magro | Convenzione (n = 44, presa e salto, non pesi) | PMID 39501696 (2024) [V] |
| Forza per unità di muscolo | Forza per sezione trasversa simile nei due sessi; la differenza di forza segue soprattutto la massa muscolare | Convenzione | titolo «Gender differences in strength and muscle fiber characteristics» visto (Eur J Appl Physiol, BF00235103); autori e anno ricordati (Miller e colleghi, 1993) [V titolo / M contenuto] |
| Rapporto F/M per peso corporeo, 1RM | Dai tavoli degli standard: panca 0,60-0,66 (livelli bassi), squat 0,67-0,78, stacco 0,65-0,80; più alto nelle donne forti | Convenzione | Tabelle di app di terzi che citano Symmetric Strength e Strength Level [V, calcolo del rapporto [D]] |
| Distorsione dei dati | Nelle linee guida di allenamento con i pesi i dati sugli adulti sono per il **70% maschili**; 104 studi misti, 240 solo maschili, 44 solo femminili; donne il 13% degli autori di posizioni ufficiali | Solida (audit di 11 linee guida, oltre 104 milioni di partecipanti) | Sports Med 2023, PMID 37382828 [V] |

### 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Ipertrofia relativa | Meta-analisi bayesiana, 29 studi, adulti sani 18-45 anni, stesso programma: aumento **assoluto** di massa muscolare un po' maggiore negli uomini (SMD 0,19); aumento **relativo simile** (differenza 0,69%); ipertrofia assoluta maggiore negli uomini solo nella **parte alta**, non nella bassa; non influenzato dall'esperienza | Solida (meta-analisi concordante con Roberts 2020 e con i due studi primari sotto) | Refalo, Nuckols, Galpin e colleghi, PeerJ 2025, PMID 40028215 [V] |
| Forza e muscolo, meta-analisi precedente | Nessuna differenza significativa di ipertrofia relativa; forza relativa simile; maggiore resistenza alla fatica nelle donne | Moderata (riassunto del risultato; testo non letto) | Roberts, Nuckols, Krieger 2020, J Strength Cond Res [V] |
| Over 50 | 30 studi, 41 confronti, 1410 persone (651 uomini, 759 donne): le donne guadagnano **più forza relativa nella parte bassa**; nessuna differenza relativa nella parte alta né nella massa; gli uomini guadagnano di più in assoluto | Moderata (solo over 50) | Sports Med 2020 (10.1007/s40279-020-01388-4) [V] |
| Flessori del gomito, 10 settimane | 44 uomini e 47 donne, 2 giorni a settimana: +11,61% contro +11,76% (effetto 0,57 contro 0,56) | Moderata (un muscolo, un test) | PMC4756754 / PMID 26893958 [V] |
| Parte alta e bassa, 7 settimane | 18 studenti non allenati, curl e squat: differenze assolute a favore degli uomini, **nessuna differenza relativa** | Moderata-bassa (n = 18) | Sci Rep 2021, PMC8648816 [V] |
| Donne e velocità di salita per settimana | Meta-analisi su 31 studi e 621 donne «allenate»: nei livelli intermedio e avanzato la forza sale più in fretta nella parte bassa; **nei principianti nessuna differenza tra alto e basso**; carico migliore per la parte bassa: 1-6 ripetizioni; frequenza: parte bassa 2 volte a settimana, parte alta 2-3. Il riassunto riporta «7,2% e 5,2% a settimana», incoerente con gli altri numeri e col titolo: **da non usare** finché non si legge l'abstract | Moderata (esito ordinale); numeri per settimana: non utilizzabili | PLOS ONE 2023, PMID 37053143 [V] |
| Quando arriva la forza nei principianti | La maggior parte del guadagno nelle prime 4-8 settimane; guadagni dei primi giorni in gran parte neurali. Esempio: 10 donne non allenate, 4 giorni di lavoro isocinetico dell'avambraccio: coppia di picco da 19,53 a 22,47 N·m (+15%), **spessore muscolare invariato**, coattivazione dei flessori -7,8% | Moderata (n = 10, quattro giorni, un movimento) | PMID 42555436 [V]; riassunto sulle 4-8 settimane: più fonti non identificate [V] |
| Aumento tipico nei non allenati | Circa **+40%** di forza tra 4 settimane e 2 anni (media di molti studi) | Moderata | riassunto di ricerca, fonte primaria non identificata [V] |
| Esercizi tecnici: aumento in 8-12 settimane | +20-40% di 1RM su squat e panca con bilanciere, +30-60% su macchine, ordine di grandezza; una parte è apprendimento del movimento | Convenzione | [M] |
| Corpo libero contro squat con il bilanciere | 13 giovani donne sedentarie, 6 settimane, 2 sedute: progressioni a corpo libero contro squat al 60-80% 1RM: entrambi aumentano forza (coppia isometrica) e massa, senza differenza tra gruppi; il bilanciere migliore sul grasso | Moderata-bassa (n = 13) | Sci Rep 2023, PMC10439966 [V] |
| Full body contro split in donne non allenate | 50 donne, stessi esercizi e serie, full body 2 volte contro upper/lower 4 sedute: nessuna differenza in forza e massa | Moderata (RCT unico) | PMC9107721 (titolo [V]; esito [S] da `ricerca-ipertrofia-programmazione.md`) |

### 1.3 Standard di forza e carichi tipici (àncore usate in 3)

Nessuno standard è un dato scientifico: sono distribuzioni di sollevatori che registrano i carichi (Strength Level, autodichiarati) o formule tarate sui record di powerlifting (Symmetric Strength). Il metodo e le soglie sono già in `docs/ricerca-forza-progressione.md` 1.5 e 3.6: qui si aggiungono solo le tabelle femminili viste.

| Àncora | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| «Non allenata» (la maggioranza della popolazione), Symmetric Strength | Donna di 130 lb (59 kg): squat 80 lb, panca 55 lb, stacco 95 lb, cioè **0,62 / 0,42 / 0,73 volte il peso**. Uomo di 180 lb: 135 / 100 / 155 lb (0,75 / 0,56 / 0,86) | Convenzione (terzi; stesso frammento visto in due ricerche = **una** fonte) | [V] anche [S] in `ricerca-forza-progressione.md` |
| Strength Level, panca, donne, rapporto al peso | Beginner / Novice / Intermediate / Advanced / Elite: 0,30 / 0,50 / 0,75 / 1,10 / 1,45 (un'altra tabella: 0,30 / 0,45 / 0,75 / 1,15 / 1,5) | Convenzione | [V] |
| Strength Level, panca, donne, in kg per peso | 60 kg: 17 / 29 / 47 / 68 / 92; 50 kg: 12 / 24 / 40 / 59 / 82; 80 kg: 24 / 39 / 59 / 82 / 109. Il rapporto con il peso **sale** con il peso nei livelli bassi e **scende** nei livelli alti: la scala lineare vale per principianti, non per forti | Convenzione | [V] |
| Squat e stacco, donne (stesso schema) | Squat 0,50 / 0,75 / 1,25 / 1,75 / 2,25; stacco 0,65 / 0,95 / 1,50 / 2,00 / 2,50 | Convenzione | [V] |
| Altri esercizi, donna di 130 lb, Strength Level | Hip thrust 76 / 137 / 219 / 321 / 436 lb; lat pulldown 50 / 72 / 100 / 132 / 168 lb; curl con bilanciere 17 / 31 / 50 / 75 / 103 lb; leg press 1,0 / 1,5 / 2,0 / 2,75 / 3,5 volte il peso (dipende dalla macchina) | Convenzione | [V] |
| Che cosa significano i livelli | Strength Level: percentili di chi registra i carichi (Beginner più forte del 5%, Novice 20%, Intermediate 50%...): chi registra è **già un frequentatore di palestra** [S]. Symmetric Strength «Untrained» = la popolazione generale | Convenzione | [S] `ricerca-forza-progressione.md` 1.5 |
| Federazioni di powerlifting | Standard di Barbell Medicine su 809.986 gare in federazioni senza doping 1968-2022 (571.650 voci maschili, 238.336 femminili, 15 federazioni); giovani competitivi 18-35: i rapporti calano dopo i 30 anni | Convenzione per il non allenato (campione di gara, non di principianti) | barbellmedicine.com/blog/strength-standards [V] |
| Ripetizioni tra i sessi | Meta-regressione 2024: poca influenza di sesso ed età sulle ripetizioni a una data % di 1RM | Moderata (vista da altro agente) | [S] `ricerca-forza-progressione.md` 1.6 |

**Coerenza con il repo** [D]: `STANDARD_FORZA` femminile (squat 0,5 / 0,75 / 1,25..., stacco 0,5 / 1 / 1,5..., panca 0,35 / 0,5 / 0,75...) è in linea con le tabelle sopra (livello 1 = tra «non allenata» e «novice»).

### 1.4 Peso corporeo contro massa magra nella stima del carico

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Quale grandezza spiega la forza | Tra individui dello stesso sesso la forza segue la massa muscolare più del peso totale; la differenza di sesso si riduce molto ma non sparisce (parte alta) quando si corregge per la massa magra | Moderata | [M]; coerente con Janssen 2000 e con l'abstract PMID 39501696 [V] |
| Errore di una stima dal solo peso | Una donna con molto grasso ha meno muscolo per kg: con `fracMagra` 0,74 fisso, il «k» dal peso supera quello dalla massa magra del **3% (55 kg, 28% grasso), 8% (65 kg, 32%), 16% (75 kg, 38%)** | calcolo | [D] (3.4) |
| Rumore di una BIA di consumo | La massa magra e muscolare da impedenza cambia con idratazione, pasto, esercizio recente, ciclo: ±2-3 kg di massa magra è ordine di grandezza normale (circa 5% del valore) | Convenzione (già segnalato da `ricerca-cardio-nutrizione.md`: non verificato) | [M], [S] |
| Peso per principianti | Nei livelli bassi gli standard sono quasi **lineari** con il peso corporeo (panca Strength Level 60 → 80 kg: 29 → 39 kg), nei livelli alti sono sublineari | Convenzione | [V], rapporto [D] |
| Primo carico di una principiante | Il fattore dominante nelle prime sedute è l'**apprendimento del movimento** (neurale, 1.2); la variabilità tra persone (±30-40% a pari peso e massa magra) supera di molto la differenza tra stima da peso e da massa magra | Moderata (ragionamento da 1.2 e 1.1, non misurato) | [D] |

### 1.5 Partire troppo pesanti o troppo leggere: dolenzia, effetto della seduta ripetuta, aderenza

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Effetto della seduta ripetuta (RBE) | Una prima seduta di esercizio inusuale (soprattutto eccentrico) protegge dal danno muscolare e dalla dolenzia nelle successive, per settimane o mesi. Una prima seduta **leggera o breve** dà già una parte di questa protezione | Moderata | [M]: Nosaka e colleghi (primi anni 2000), McHugh 1999 (anni ricordati con incertezza) |
| La dolenzia non misura il progresso | Dolenzia (DOMS) e danno muscolare non sono un indicatore di efficacia della seduta | Moderata | PMID 12453160 [S] da `ricerca-recupero-infortuni-popolazioni.md` 4 |
| Ipertrofia dei primi giorni nei principianti | Nelle prime settimane parte dell'aumento di sezione è gonfiore da danno e da edema, non crescita contrattile; la crescita «vera» compare quando il danno si attenua | Moderata | [M]: Damas e colleghi (J Physiol 2016; Eur J Appl Physiol 2018, anni ricordati con buona sicurezza) |
| Sesso e danno muscolare | Ipotesi di protezione degli estrogeni (CK più basse nelle donne dopo eccentrico) | **Contrastata** (studi con esiti misti) | [M]: Enns e Tiidus 2010, Sports Med |
| Partire leggeri e piacere | Intensità scelta dall'utente più piacevole di una imposta; fermarsi a 1-2 ripetizioni dal cedimento dà meno disagio e simile crescita | Moderata (studi piccoli, non sul primo carico) | PMC11832030, PMID 40505704, PMC11843731 [S] da `ricerca-psicologia-aderenza.md` 1.4 |
| Abbandono per carico iniziale | **Nessuna fonte vista** sull'abbandono in funzione del primo carico o della dolenzia iniziale; il sesso come predittore di abbandono è contraddittorio [S] | Convenzione | [S] `ricerca-psicologia-aderenza.md` 1.1 |
| Asimmetria dei costi | Troppo leggero: una seduta in più per correggere. Troppo pesante: serie mancate, tecnica degradata, forte dolenzia 24-72 ore dopo, sfiducia nel programma | Convenzione (ragionamento) | [D] |
| Lineare e barra vuota | Starting Strength e i programmi lineari fanno partire tutti dalla barra vuota (donne comprese) e salire di 1-2,5 kg a seduta sulle gambe | Convenzione | [M] |

### 1.6 Fatica, ripetizioni a pari carico e recupero

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Isometria submassimale | Le donne sono di solito meno affaticabili: tempo di tenuta fino al **118% più lungo** a intensità basse e moderate; differenza legata ai meccanismi contrattili (non all'attivazione centrale) e alla forza assoluta | Moderata (molti studi piccoli) | «Sex differences in the fatigability of arm muscles depends on absolute force» (PMID 11717235); «Sex differences in fatigability of dynamic contractions» (PMID 26440505, PMC5777316) [V] |
| Contrazioni dinamiche | Meccanismi contrattili responsabili anche della differenza sulle dinamiche a bassa velocità e carico leggero | Moderata | stesse fonti [V] |
| Ripetizioni a pari % di 1RM | Le donne fanno più ripetizioni sotto l'80% di 1RM: panca al 50% circa 43,3 ripetizioni contro 25,2-28,1 degli uomini; in un protocollo al 75% 58,3 ± 27,3 contro 29,6 ± 10,6; stacco a resistenza critica 58 ± 12 contro 45 ± 14. **Studi non identificati**, quindi i numeri sono di seconda mano | Moderata (direzione) / Convenzione (numeri) | riassunto della ricerca (più fonti) [V]; titoli viste: PMC12790778, PMC10863198 |
| Recupero tra sedute | Dopo allenamento standard un vantaggio per le donne a 5 minuti, 24 e 48 ore nel recupero neuromuscolare | Moderata-bassa (allenati 18-35, riassunto) | PMC6206044 [V] |
| Dato contrario | Nessuna differenza di fatica a **30% di 1RM** (un set di intento massimo di velocità fino al cedimento); dopo debolezza da eccentrico la differenza di fatica scompare | **Contrastata** sui carichi molto leggeri | PMC12151235; PMID 36801454 (titoli) [V] |
| Perdita di velocità nelle donne | Esistono studi su soglie di perdita di velocità nelle donne (PMC11812168, PMC9012837); esito non letto | n.d. | titoli [V] |

### 1.7 Ipertrofia, volume, ripetizioni, emphasis parte bassa e glutei

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Volume e frequenza | Le curve volume-ipertrofia si basano per il 79,1% su uomini [S]; nessuna prova di intervalli diversi per sesso. Frequenza: nessuna differenza tra full body e split in donne non allenate (1.2) | Moderata | [S] `ricerca-ipertrofia-programmazione.md` 3.9; PMC9107721 |
| Carichi leggeri e pesanti | A parità di sforzo l'ipertrofia è simile tra carichi leggeri e pesanti; la forza massimale favorisce i carichi pesanti | Solida (nel complesso, popolazioni miste) | [M]: Schoenfeld 2017, J Strength Cond Res (PMID non verificato) |
| Preferenze di ripetizioni nelle donne | Nessun dato visto su preferenze o tolleranza per sesso | n.d. | - |
| Squat e hip thrust in donne allenate | Esiste un RCT: «Back Squat vs. Hip Thrust Resistance-training Programs in Well-trained Women»; **esito non visto**. Il file `lacune-coach.md` cita Plotkin 2023 (squat contro hip thrust, **non visto qui**) | n.d. | PMID 31975359 (titolo) [V] |
| Squat con trap bar contro mezzo squat | RCT di 8 settimane in donne attive; esito non visto | n.d. | PMC11140948 (titolo) [V] |
| Hip thrust, RDL, split squat, abduzioni | Attivazione EMG alta per hip thrust e abduzioni sui glutei; l'EMG **non** dimostra crescita; per i glutei una copertura di più famiglie (spinta d'anca, squat/affondi, stacchi, abduzioni) è pratica comune (PRG-22) | Convenzione | [M]; PRG-22 [R] |
| Atlete d'élite | Revisione sistematica sugli effetti dei pesi su forza e massa in atlete d'élite: titolo visto, esito non visto | n.d. | Sports Med 2023, PMC10432341 (titolo) [V] |

### 1.8 Parte alta: trazioni e piegamenti

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Difficoltà | La forza assoluta della parte alta delle donne è il 50-60% di quella degli uomini (1.1) mentre il peso corporeo da sollevare non lo è: una trazione stretta è molto più difficile; molte donne non allenate non ne fanno una | Convenzione | [V] sulla forza, [M] sulla trazione |
| Progressione trazioni | Gradini: lat machine (carico crescente) -> trazioni assistite con macchina o elastico -> negative lente (3-5 secondi in discesa) -> 1 trazione stretta -> serie. Criteri di salto: tre serie da 8-12 ripetizioni pulite sul gradino | Convenzione | [M] |
| Progressione piegamenti | Piegamenti con le mani su un piano alto (inclinati) -> piano più basso -> a terra, ginocchia -> piedi a terra -> piedi rialzati. Un piano più alto riduce la quota di peso corporeo spinta; salto quando 3 serie da 10-15 sono pulite | Convenzione | [M] |
| Esercizi già in libreria | Trazioni Assistite (Macchina), Rematore Inverso (Corpo Libero), Piegamenti Inclinati (Mani Rialzate), Lat Machine | - | `js/dati/libreria-esercizi.js` [R] |

### 1.9 Ciclo mestruale e contraccezione ormonale

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Fase del ciclo e prestazione | Meta-analisi: la prestazione può essere **trivialmente più bassa** nella prima fase follicolare; grande variabilità tra studi; qualità dei dati da bassa a moderata; raccomandano di **individualizzare** e non dare regole generali | Moderata (da verificare) | [M]: McNulty e colleghi 2020, Sports Med; Elliott-Sale e colleghi 2020 (stesso gruppo) |
| Fase del ciclo e adattamento ai pesi | Nessuna influenza della fase su forza acuta né sugli adattamenti all'allenamento | Moderata | Colenso-Semple 2023, Front Sports Act Living [R] (citata in PRZ-01), [M] |
| Contraccezione ormonale | Effetto sulla prestazione al massimo **banale**; qualità dei dati bassa; effetti su massa magra non chiari | Convenzione / Contrastata | [M]: Elliott-Sale e colleghi 2020 (anno ricordato con buona sicurezza) |
| Programmare per fasi («cycle syncing») | Raccomandazioni popolari (carichi alti in follicolare, volume basso in luteale ecc.); **nessuna base solida** | Convenzione, **Contrastata** | [M]; promosso da divulgatori come Stacy Sims (bassa evidenza) |
| Sintomi | Crampi, flusso abbondante, mal di testa, stanchezza modificano la giornata per alcune donne e non per altre | Convenzione | [M] |

### 1.10 Gravidanza e post-partum

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Sicurezza | In gravidanza senza complicazioni i pesi sono sicuri e raccomandati; intensità moderata (sforzo «a cui riesci ancora a parlare»); non iniziare esercizi nuovi molto intensi | Moderata (da verificare) | [M]: ACOG 2020 (Committee Opinion sull'attività in gravidanza e post-partum, numero ricordato con incertezza), linea guida canadese 2019 (Mottola e colleghi) |
| Cosa evitare | Contatto e rischio caduta, sdraiarsi sulla schiena a lungo dopo il primo trimestre, caldo eccessivo, apnea prolungata, aumentare l'intensità di colpo | Moderata (da verificare) | [M] |
| Segnali di stop | Sanguinamento vaginale, perdita di liquido, capogiri, dispnea prima dello sforzo, mal di testa, dolore al petto, gonfiore o dolore a un polpaccio, contrazioni regolari, diminuzione dei movimenti fetali | Moderata | [M] |
| Post-partum | Ripresa graduale, con parere del medico dopo parto cesareo o complicato; non c'è un giorno «via libera» uguale per tutte; segnali del pavimento pelvico (perdita di urina, pesantezza, sensazione di «sporgenza») -> ridurre carico e impatto e consultare un fisioterapista del pavimento pelvico | Convenzione / Moderata (da verificare) | [M]; per la corsa raccomandazioni di rientro dopo almeno 3 mesi (Goom e colleghi 2019, anno ricordato) |
| Stato nel repo | PAR-Q: «gravidanza o parto recente» è uno dei 7 sì che attivano la modalità prudente; MOM «Nuovo bambino» (12 settimane leggere) | - | [R]; `REC-12` proposta in `ricerca-recupero-infortuni-popolazioni.md` [S] |

### 1.11 Perimenopausa e menopausa, osso

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Osso e carichi alti | RCT in donne in postmenopausa con osteopenia e osteoporosi: 8 mesi di allenamento supervisionato ad alta intensità (stacco, military press, squat a carichi alti) più impatto controllato migliora densità di colonna e collo del femore e funzione; sicuro con supervisione | Moderata (RCT singolo, supervisionato, n circa 100) | [M]: Watson e colleghi 2018, LIFTMOR (J Bone Miner Res, ricordo sicuro) |
| Esercizio e osteoporosi | Il consenso raccomanda carichi progressivi, equilibrio, e **evitare flessione ripetuta o con carico della colonna e torsioni forzate** se c'è osteoporosi; in presenza di fratture precedenti, parere medico | Moderata (da verificare) | [M]: Giangregorio e colleghi 2014 |
| Composizione corporea | Dopo la menopausa aumentano grasso viscerale e perdita di massa magra e ossea; pesi e proteine adeguate aiutano | Moderata | titoli visti: PMC10306117, PMC12883749, studio RCT 12 settimane pesi liberi + proteine in postmenopausa (S1279770724004366) [V titoli], esiti non letti |
| Carichi e potenza | Per adulti più anziani, carichi progressivi fino a circa 70-85% di 1RM e potenza con carichi moderati | Moderata | NSCA 2019 (citato in `lacune-coach.md` [R]); [S] `ricerca-forza-progressione.md` 1.6 |

### 1.12 Energia disponibile (RED-S), amenorrea, ferro

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Quadro | La carenza energetica relativa nello sport (RED-S) colpisce ormoni, ossa, ciclo, sistema immunitario e prestazione; sostituisce il concetto di «triade»; consenso IOC 2014 e aggiornamenti 2018 e 2023 | Moderata (consenso) | [M]: Mountjoy e colleghi (IOC) |
| Soglia | Disponibilità energetica bassa: sotto circa 30 kcal per kg di massa magra al giorno | Moderata | [M] |
| Segnali di rinvio al medico | Assenza di mestruazioni per 3 mesi o più (senza gravidanza), fratture da stress, stanchezza persistente con calo della prestazione, infezioni frequenti, freddo costante, forte preoccupazione per cibo e peso | Moderata | [M] |
| «17% di grasso» | La soglia fissa di grasso per il ciclo è l'eco di un'ipotesi vecchia; conta la disponibilità energetica, non un numero | **Contrastata** | [M]; già segnalato da `ricerca-cardio-nutrizione.md` 4 [S] (BIA-02) |
| Ferro e stanchezza | La carenza di ferro è comune tra le atlete (percentuale molto variabile: ordine del 15-35%); fatica, affanno, calo di prestazione; **solo un esame del sangue** la conferma; l'integratore non va preso senza diagnosi | Moderata (da verificare) | [M] |

### 1.13 Immagine del corpo, «tonificare», linguaggio

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Mito del «diventare grossa» | Le donne guadagnano muscolo in valore relativo come gli uomini (1.2), ma con ormoni androgeni molto più bassi non crescono «per sbaglio»; «tonificare» = più muscolo e meno grasso, cioè stessi pesi progressivi | Moderata | Refalo 2025, Roberts 2020 [V]; ormoni [M] |
| Barriere | Esistono studi su barriere, pregiudizi e partecipazione femminile ai pesi: «Strength unseen: confronting prejudice in women's resistance and weight training» (PMC13097162), «Practices, Perceived Benefits, and Barriers to Resistance Training Among Women Enrolled in College» (PMC5955292), «Sex Difference in Participation in Muscle-Strengthening Activities» (PMC7502892); esiti non letti | n.d. | titoli [V] |
| Tono dei messaggi per sesso | Nessuna evidenza coerente per differenziare il tono per sesso | Convenzione | [S] `ricerca-psicologia-aderenza.md` 3.6 |
| Linguaggio che funziona | Obiettivi di prestazione e di capacità («più forte», «salire di carico», «energia») e scelta autonoma; evitare lessico di colpa o di «difetti» | Convenzione | [M]; coerente con [S] 1.3 |

### 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»)

| Persona | Cosa risulta (solo ciò che ho visto o ricordo con sicurezza) | Nota |
|---|---|---|
| Greg Nuckols (Stronger By Science) | Coautore di Roberts 2020 e di Refalo 2025 [V]; articolo «Strength Training for Women: Setting the Record Straight» [V titolo, non letto]. Posizione [M]: stessi principi per i due sessi, simile progresso relativo, differenze soprattutto nei carichi assoluti e nella resistenza alla fatica | Convenzione per la parte [M] |
| Bret Contreras | [M] Popolarizzatore dell'hip thrust e dell'allenamento dei glutei; lavori su EMG | EMG non prova la crescita; vende programmi |
| Starting Strength (Rippetoe) | [M] Stesso programma per donne e uomini: barra vuota e salti piccoli a seduta | Tono assoluto; nessuna prova diretta |
| Barbell Medicine | [V] Standard di forza costruiti su gare in federazioni senza doping (1.3); [M] enfasi su forza e salute come obiettivi, non sull'estetica | Il non allenato non è nel loro campione |
| Stacy Sims | [M] «Le donne non sono piccoli uomini»; programmazione secondo il ciclo, alimentazione e digiuno per le donne | **Bassa evidenza**: non si ritrova nelle meta-analisi sul ciclo; **Contrastata** |
| Stefanie Cohen, Jeff Nippard, Eric Helms, Mike Israetel (Dr Mike), Natalie Arbaugh | **Non cercati** (tetto di ricerche): nessuna affermazione attribuita | Da cercare (Appendice B) |

---

## 2. Dove le fonti non concordano

**A. Partire leggeri per tutti o solo per le donne?** Posizione A (donne come uomini): il metodo lineare (Starting Strength) fa partire tutti dalla barra vuota e sale a salti piccoli; la differenza di sesso è nei carichi assoluti, non nel metodo [M]. Posizione B (donne più basse): standard di forza e anatomia (1.1, 1.3) dicono che per la parte alta la barra da 20 kg è una frazione molto più grande del massimale. *Il coach adotta* il fattore basso per le donne (decisione di prodotto) **e** segnala che lo stesso criterio gioverebbe agli uomini (Domande aperte 1).

**B. Più ripetizioni per le donne?** Posizione A: le donne sono meno affaticabili e fanno più ripetizioni a pari % di 1RM sotto l'80% [V]; coach e divulgatori consigliano serie più lunghe e pause più corte [M]. Posizione B: a parità di sforzo l'ipertrofia è simile con carichi leggeri e pesanti e la forza e l'osso chiedono carichi pesanti [M]; a 30% di 1RM nessuna differenza di fatica [V titolo]. *Il coach adotta*: stessi intervalli di ripetizioni degli uomini, **RPE come ancora**, pause ridotte solo per carichi ≤80% (DON-08), almeno un esercizio pesante per schema dopo le prime sedute (DON-13 per le over 50).

**C. Programmare per fasi del ciclo.** Posizione A (Sims e il «cycle syncing», [M]): carichi e volumi diversi per fase. Posizione B (meta-analisi, [M]): effetto trascurabile, grande variabilità, individualizzare. *Il coach adotta* B: nessuna programmazione per fasi, nessun adattamento automatico (DON-10).

**D. Soglia del 17% di grasso e ciclo.** Posizione A: sotto il 17% la funzione mestruale è a rischio (BIA-02 oggi). Posizione B: conta la disponibilità energetica (RED-S) [M]. *Adotta* B: sostituire il numero con segnali e rinvio (DON-14; `DCA-03` in `ricerca-cardio-nutrizione.md`).

**E. Squat o hip thrust per i glutei.** EMG a favore dell'hip thrust [M]; RCT in donne allenate esistente ma non letto [V titolo]. *Il coach adotta* entrambe le famiglie come oggi (PRG-22), senza gerarchia.

**F. Tassi di progressione.** Il riassunto della meta-analisi PLOS ONE 2023 dà «7,2% e 5,2% a settimana» ma anche percentuali per frequenza/ripetizioni che non tornano come per settimana [V]. *Adotta*: nessun tasso per settimana da fonte; la salita rapida è guidata da RPE e ripetizioni (DON-04) e da priori [M] segnati Convenzione.

**G. Stima del carico: peso o massa magra.** Massa magra spiega meglio la forza tra persone [M], ma la BIA è rumorosa e il primo carico dipende soprattutto dall'apprendimento. *Adotta*: tenere PAR-01 con SMM > massa magra > peso e **limitare l'effetto del corpo a ±15%** intorno a un valore di base dal peso (DON-01), perché la calibrazione prende presto il comando.

---

## 3. Carichi di partenza: tabelle

### 3.1 Metodo, parametri, assunzioni

Carico di partenza della prima esposizione di una donna a un esercizio:

`carico = peso corporeo x T50 x p(ripetizioni, RIR) x f25`

- **T50** = 1RM tipico di una donna non allenata, in frazione del peso (àncore 1.3: squat 0,62, panca 0,42, stacco 0,73; gli altri esercizi sono **derivati** con rapporti ordine di grandezza da quelli: lat machine 0,40 ≈ livello tra beginner e novice; chest press 0,45; military 0,25 ≈ 0,6 della panca; leg press 1,0; hip thrust 0,70; RDL 0,45; leg extension 0,50; leg curl 0,35; manubri per mano = circa 0,40 del bilanciere per la panca e 0,55 per il curl, per il deficit bilaterale). **Derivati [D]: ognuno ha almeno ±25% di incertezza.**
- **p(ripetizioni, RIR) = 1 / (1 + (ripetizioni + RIR) / 30)** (Epley, già in uso): con RIR 3, 8 ripetizioni = 0,73; 10 = 0,70; 12 = 0,67; 15 = 0,63. Si usano le ripetizioni della libreria.
- **f25 = 0,75**: si parte dal 25° percentile, non dalla media: la variabilità tra non allenate è ampia e l'errore pesa di più per eccesso (1.5). Per l'intermedia (livello dichiarato, non verificato da `livelloStimato`) il fattore è 0,80 sulle àncore di livello intermedio (squat 1,25, stacco 1,5, panca 0,75, military 0,5: `STANDARD_FORZA`); nella tabella dei moltiplicatori (3.3) diventa un unico 0,85 sopra PAR, perché per l'intermedia PAR è già vicino a questo calcolo.
- **Conseguenza**: una donna media, che parte al 75% del suo 1RM atteso, avrà molta più riserva del previsto (1.6): è voluto («seduta di tecnica») e si corregge con DON-04 in 2-4 esposizioni.

Per applicarlo a tutti i 140 esercizi **senza una tabella per esercizio** si usa un moltiplicatore per classe sopra la formula esistente (3.3). Controllo: il rapporto «proposta / PAR attuale» è identico a 55, 65 e 75 kg (le due formule sono lineari nel peso) [D].

### 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg)

«Per mano» = carico di ogni manubrio. PAR attuale = formula di `partenza.js` con arrotondamenti e pavimento barra. DON principiante = moltiplicatori 0,60 / 0,65 / 0,75; DON intermedia = 0,85 [D]. **Valore con * = sotto il peso della barra (20 kg): si veda 3.7.**

| Esercizio | 1RM tipico [D] | PAR attuale princ. | PAR attuale interm. | **DON princ.** | **DON interm.** | DON princ. in % del peso | PAR princ. come % dell'1RM tipico |
|---|---|---|---|---|---|---|---|
| Panca piana bilanciere | 27 | 25 | 30 | **15*** | 27,5 | 0,23 | 92% |
| Chest press machine | 29 | 25 | 30 | **15** | 27,5 | 0,23 | 85% |
| Panca manubri (per mano) | 11 | 12 | 16 | **7** | 14 | 0,11 | 105% |
| Lat machine | 26 | 25 | 30 | **15** | 27,5 | 0,23 | 96% |
| Pulley basso | 29 | 20 | 27,5 | **12,5** | 22,5 | 0,19 | 68% |
| Rematore manubrio (per mano) | 11 | 10 | 12 | **6** | 10 | 0,09 | 90% |
| Rematore bilanciere | 20 | 20 | 27,5 | **12,5*** | 22,5 | 0,19 | 100% |
| Military press | 16 | 20 | 20 | **10*** | 17,5* | 0,14 | 123% |
| Lento avanti manubri (per mano) | 6,5 | 7 | 9 | **4** | 8 | 0,07 | 108% |
| Alzate laterali (per mano) | 4,6 | 4 | 5 | **3** | 4 | 0,04 | 88% |
| Curl manubri (per mano) | 7,5 | 6 | 8 | **4** | 7 | 0,07 | 80% |
| Curl con bilanciere | 12 | 20 | 20 | **10*** | 12,5* | 0,14 | 160% |
| Pushdown ai cavi | 23 | 12,5 | 15 | **10** | 12,5 | 0,14 | 55% |
| Squat con bilanciere | 40 | 32,5 | 42,5 | **22,5** | 37,5 | 0,33 | 81% |
| Goblet squat | 12 | 10 | 14 | **7** | 12 | 0,11 | 85% |
| Leg press | 65 | 52,5 | 70 | **35** | 60 | 0,53 | 81% |
| Affondi manubri (per mano) | 10 | 8 | 10 | **5** | 9 | 0,08 | 82% |
| Leg extension | 33 | 20 | 25 | **15** | 22,5 | 0,23 | 62% |
| Leg curl sdraiato | 23 | 17,5 | 22,5 | **12,5** | 17,5 | 0,19 | 77% |
| Hip thrust bilanciere | 45 | 30 | 40 | **20** | 32,5 | 0,30 | 66% |
| Stacco rumeno | 29 | 27,5 | 35 | **17,5*** | 30 | 0,27 | 94% |
| Stacco da terra | 47 | 35 | 47,5 | **22,5*** | 40 | 0,33 | 74% |
| Abductor machine | 36 | 17,5 | 22,5 | **12,5** | 17,5 | 0,19 | 49% |

Lettura:
- «PAR princ. come % dell'1RM tipico» è la quota del massimale **ipotetico** che PAR chiede per serie da 8-12 ripetizioni. A 8-12 ripetizioni con 3 di riserva servono 67-73%; oltre il 90% sono 3-4 ripetizioni vere. Sulla parte alta con barra o macchina PAR è già **vicino o oltre un massimale** per la donna non allenata media, su isolamenti a cavo e su glutei è sotto: la correzione non è uniforme, da cui le tre classi.
- Intermedia a 65 kg: PAR e DON sono vicini (la differenza media è -15%); sulla parte bassa gli standard di livello intermedio darebbero **più** di PAR (squat, hip thrust, stacco +10-30%): non si alza, perché il livello dichiarato non è verificato e la salita rapida è gratuita.
- Avanzata: PAR (fattore 1,6) resta sotto gli standard avanzati (panca 1,10, squat 1,75 volte il peso): nessuna modifica.
- Regola pratica per interfaccia o messaggi (principiante, 2-3 serie, 3-4 ripetizioni di riserva): macchine di spinta e tirata 0,22 x peso; manubri per mano 0,11 (press) e 0,09 (rematore) x peso; squat con barra 0,33 x peso; leg press 0,5 x peso; hip thrust 0,30 x peso; curl con manubri 0,07 x peso per mano; alzate laterali 0,04 x peso per mano [D].
- Pesi diversi da 65 kg: i valori scalano linearmente per i principianti (1.4) tra circa 45 e 90 kg; fuori da questo intervallo il valore è solo indicativo.

### 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica

Moltiplicatore applicato **dopo** la formula esistente (PAR-02, con `sessoParteAlta` e `prudenza` invariati) solo alle donne, solo sulla stima dal corpo; classe da `m.group` e `m.type` (già disponibili in `scalaDaCorpo`).

| Classe | Esercizi | Principiante | Intermedio | Avanzato | Scarto osservato (proposta/PAR, 55-75 kg) |
|---|---|---|---|---|---|
| **alto** | multiarticolari di petto, schiena, spalle, braccia (barra, manubri, macchine), stacco da terra | **0,60** | **0,85** | 1,00 | 0,47-0,76 (media 0,60) |
| **basso** | multiarticolari di gambe e glutei (squat, leg press, affondi, RDL, hip thrust, goblet) | **0,65** | **0,85** | 1,00 | 0,55-0,76 (media 0,63) |
| **iso** | isolamenti di ogni gruppo (curl, alzate, tricipiti, leg extension, leg curl, abduttori) | **0,75** | **0,85** | 1,00 | 0,62-1,01 (media 0,78) |

Parametri accessori: limite inferiore del fattore `limiti[0]` da 0,45 a **0,25** (altrimenti 0,45 riporta la panca a 18 kg); livello non dichiarato: **principiante**, non intermedio (`contestoCarichi`: `d.level || prof.level || 'intermedio'`).

Verifica [D]: con questi moltiplicatori la panca con bilanciere a 55 / 65 / 75 kg dà 12,5 / 15 / 17,5 kg (PAR: 20 / 25 / 27,5); squat 17,5 / 22,5 / 25 (PAR: 27,5 / 32,5 / 37,5); hip thrust 17,5 / 20 / 22,5 (PAR: 25 / 30 / 35); leg press 30 / 35 / 40 (PAR: 45 / 52,5 / 62,5); curl con manubri 4 / 4 / 5 per mano (PAR: 5 / 6 / 7); alzate laterali 2 / 3 / 3 (PAR: 3 / 4 / 4).

### 3.4 Peso corporeo e massa magra

| Donna | Massa magra | k dalla massa magra (PAR-01 `ffm`) | k dal solo peso (`fracMagra` 0,74) | Differenza |
|---|---|---|---|---|
| 55 kg, 28% grasso | 39,6 kg | 0,644 | 0,662 | -3% |
| 65 kg, 32% grasso | 44,2 kg | 0,719 | 0,782 | -8% |
| 75 kg, 38% grasso | 46,5 kg | 0,756 | 0,902 | -16% |

[D] `fracMagra.F` = 0,74 corrisponde al 26% di grasso, il valore di una donna attiva; per una donna sedentaria (30-35% di grasso) sarebbe 0,65-0,70 [M]. Proposta: `fracMagra.F` = **0,70** quando c'è solo il peso (≈ -5% di k) e **nessun** uso di BIA come fattore decisivo: SMM e massa magra spostano il fattore al massimo del **±15%** attorno al valore dal peso (DON-01), perché a) la BIA è rumorosa, b) SMM con riferimento 34 kg e massa magra con riferimento 61,5 kg danno già scale diverse per la stessa donna (SMM tipica di una donna di 65 kg circa 22 kg: k 0,65 contro 0,72-0,78 dagli altri due) [D].

### 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante)

| Esercizio | PAR attuale (uomo 75 kg) | Stesso metodo con àncora uomo «non allenato» (0,56 / 0,75 / 0,86 volte il peso) | Rapporto |
|---|---|---|---|
| Panca con bilanciere | 35 kg | 22,5 kg | 0,64 |
| Squat con bilanciere | 42,5 kg | 30 kg | 0,71 |
| Stacco da terra | 50 kg | 37,5 kg | 0,75 |

Donna 65 kg con il nuovo fattore contro uomo 75 kg con lo stesso metodo: panca 15 / 22,5 kg (67%), squat 22,5 / 30 kg (75%), stacco 22,5 / 37,5 kg (60%). Coerente con la forza assoluta delle donne al 50-60% (alto) e 60-70% (basso) degli uomini (1.1). [D]. Gli uomini sono per ora **fuori dalla proposta**.

### 3.6 Fattore prudente e sblocco rapido (DON-04)

Parametro: `COACH_PARAMETRI.avvioDonna = { esposizioni: 3, tetto: { alto: 0.20, basso: 0.25, iso: 0.20 } }`. Vale per una donna con il fattore DON attivo, per ogni esercizio, nelle **prime 3 esposizioni** (sedute con quell'esercizio).

Tabella salto (solo se **tutte** le serie sono state completate alla ripetizione bersaglio; RPE medio delle serie, o 10 - RIR dichiarato):

| RPE medio | Salto del carico alla seduta dopo (alto / basso / iso) | Motivo mostrato |
|---|---|---|
| ≤ 5 | +20% / +25% / +20% (almeno 1 passo) | «Troppo facile: salgo in fretta» |
| 6 | +15% / +20% / +15% | idem |
| 7 | +10% / +10% / +10% | «Giusto: salgo un po'» |
| 8 | +5% (almeno 1 passo) | «Quasi al limite: salgo piano» |
| ≥ 8,5, oppure serie mancate | 0%; se valgono le condizioni di CAR-17 (meno del 60% delle serie, o ripetizioni medie di almeno 3 sotto il bersaglio): -5% | CAR-17 resta com'è |

Senza RPE registrato (frequente nei principianti): se tutte le serie sono complete, +10% (alto e iso) e +15% (basso), al massimo 3 volte. **Stop** al primo RPE ≥ 8: l'esercizio passa alla progressione normale (`caricoProssimoBase`). **Passaggio di classe**: quando due esercizi della stessa classe hanno finito lo sblocco, i nuovi esercizi della classe partono dal rapporto reale (PAR-03 per classe, DON-05) e non dal moltiplicatore DON.

Esempio [D]: donna di 65 kg, chest press machine, passi di 2,5 kg. Seduta 1: 15 kg (RPE 5-6) -> seduta 2: 17,5 (+17%) -> seduta 3: 20 (+14%, RPE 6-7) -> seduta 4: 22,5 (+12%, RPE 7) -> seduta 5: 25 kg = **il valore di partenza di PAR**. Costo della partenza bassa: circa 4 sedute (circa 1,5-2 settimane). Squat con barra a 22,5 kg: 25 -> 30 -> 35 -> 37,5 (quarta seduta), con passi da 2,5 kg [D].

Perché non solo l'Epley con il RIR dichiarato: ogni punto di RIR in più vale solo circa +3-5% di carico (da `ricerca-forza-progressione.md` 3.5: ±1 ripetizione = ±2,4-2,9% sul massimale), troppo poco per recuperare una partenza del 40% sotto. La tabella sopra è quindi **una scelta di prodotto** (Convenzione), appoggiata a due fatti: la stima del RIR ha un errore medio di circa 1 ripetizione e tende a sottostimare la riserva (registro di `.claude/skills/ricerca-fitness/SKILL.md` [R]; non specifico per i principianti) e le donne hanno più riserva a pari %1RM sotto l'80% (1.6). Taratura con dati reali: 3.8.

### 3.7 Pavimento della barra e alternative

PAR-04 oggi: per un esercizio «bilanciere» mai sotto 20 kg (o sotto il valore di libreria se inferiore). Con DON il valore calcolato è spesso sotto: panca, rematore, military, curl con bilanciere, stacco rumeno e stacco da terra a 65 kg [D].

Proposta (DON-03), in ordine:
1. Se `valore calcolato < 0,9 x peso della barra`: sostituire con la **variante più leggera dello stesso muscolo e schema** già in libreria (panca con bilanciere -> panca manubri o chest press; rematore con bilanciere -> rematore con manubrio o pulley; military -> lento avanti con manubri o shoulder press; curl con bilanciere -> curl con manubri o ai cavi; stacco rumeno -> pull-through ai cavi o hip thrust), con nota «barra vuota troppo pesante per partire».
2. Se l'utente ha indicato una barra più leggera (campo nuovo: barra 20 / 15 / 10 kg; EZ circa 7-10 kg [M]) usare quel peso come pavimento.
3. Se l'esercizio è imposto (metodo scelto, preferito) mantenere la barra a 20 kg con **meno ripetizioni (6-8) e 1 serie in meno**, mai oltre.

### 3.8 Come tarare con dati reali (senza inviare nulla)

Le percentuali sono ordini di grandezza. Con il consenso ai dati il record del primo allenamento porta già il segno `stimato`: registrare **localmente** per esercizio il RPE medio della prima esposizione e se le serie sono state complete. Obiettivi di taratura [D, da validare]: RPE medio della prima esposizione fra 5,5 e 7; serie mancate inferiori al 10%; almeno il 60% di chi parte «facile» (RPE ≤ 6) sale alla seduta 2. Fuori da questi bordi: ±0,05 sul moltiplicatore della classe.

---

## 4. Regole per le donne oltre ai carichi

| Area | Cosa fare | Perché | Forza |
|---|---|---|---|
| Volume | Stessi intervalli relativi degli uomini (VOLUME_LIVELLO, PRG-25); nessun taglio della parte alta | Ipertrofia e forza relative simili (1.2); curve di volume costruite su uomini ma nessuna prova di intervalli diversi per sesso | Moderata |
| Ripetizioni | Intervallo ampio: multiarticolari 6-12 (dopo le prime sedute), isolamenti 10-20; dalla 7a-8a settimana almeno un esercizio pesante (≤ 8 ripetizioni) per schema se non ci sono controindicazioni | A pari sforzo ipertrofia simile; la forza massimale e l'osso chiedono carichi pesanti; donne con più riserva a pari %1RM (1.6, 1.7, 1.11) | Moderata [M] |
| Vicinanza al cedimento | Stessi RIR degli uomini; con RIR dichiarato ≤ 2 sugli isolamenti le donne spesso hanno più riserva reale: dare priorità a RPE e ripetizioni fatte | Meno affaticabili sotto l'80% di 1RM (1.6) | Moderata |
| Pause | -15% solo per carichi ≤ 80% (isolamenti, macchine, serie da ≥ 8 ripetizioni), minimo 60 s per isolamenti e 90 s per multiarticolari; carichi pesanti (≤ 5 ripetizioni): niente riduzione | Recupero e fatica migliori nelle donne a carichi sotto l'80%; nessuna prova a carichi massimali; PRG-20 è su un solo studio [R] | Convenzione, **Contrastata** (1.6) |
| Enfasi | **Nessun default per sesso**: volume della parte alta pari a quello degli uomini; glutei e gambe in più solo se l'utente li sceglie (obiettivo «glutei», PRG-22) | La stereotipia non ha base; l'enfasi è una preferenza | Convenzione |
| Parte alta | Per principianti, tirata verticale = lat machine, spinta = piegamenti inclinati o macchina; trazioni e dip a corpo libero solo quando le progressioni (1.8) sono completate | Rapporto forza/peso corporeo della parte alta più basso | Convenzione |
| Progressione | Doppia progressione sui carichi bassi; incrementi relativi (2-5%) con dischi piccoli; salto più grande nelle prime 3 esposizioni (DON-04) | Un +2,5 kg su 15 kg è il 17% | Convenzione |
| Frequenza | 2-3 sedute a settimana per muscolo, come gli uomini | Nessuna differenza tra full body e split in donne non allenate; la parte bassa in particolare 2 volte | Moderata |
| Cardio e concorrente | Nessuna regola per sesso | Interferenza sulla forza delle gambe solo negli uomini; nessuna differenza di sesso per la parte alta [S] | Moderata |
| Ciclo | Nessuna programmazione per fasi; voce facoltativa di prontezza; scelta manuale di una seduta più leggera con sintomi; nessun adattamento automatico | 1.9 | Moderata |
| Contraccezione ormonale | Nessuna regola; niente domande obbligatorie | Effetti banali e dati incerti | Convenzione |
| Gravidanza e post-partum | Bandiera separata, messaggio «parla con ostetrica o medico», RIR ≥ 3-4, 8-15 ripetizioni, niente apnea, niente posizione supina prolungata dopo il primo trimestre, niente impatto o contatto; post-partum: rampa e controllo dei sintomi del pavimento pelvico | 1.10 | Moderata/Convenzione (**da verificare**, [M]) |
| Perimenopausa e menopausa | Carichi che salgono nel tempo fino a 70-85% di 1RM sugli schemi principali dopo la fase di apprendimento; potenza con carichi moderati; con osteoporosi dichiarata: niente flessione o torsione della colonna con carico | 1.11 | Moderata [M] |
| Energia e ferro | Informazione e rinvio al medico su segnali (amenorrea, fratture da stress, stanchezza persistente con cali di prestazione); nessun consiglio di integratori | 1.12 | Moderata/Convenzione |
| Linguaggio | Obiettivi di capacità; niente «tonificare», «sgonfiare», «difetti», «da donna», «senza diventare grossa» | 1.13 | Convenzione |

---

## 5. Audit di PAR-01..05 e regole collegate

| Regola | Cosa fa oggi (`js/coach/carichi/partenza.js`) | Esito rispetto alla ricerca | Azione |
|---|---|---|---|
| **PAR-01** dati del corpo (`contestoCarichi`) | SMM (rif. 34 kg) > massa magra (rif. 61,5) > peso x (1 - grasso%) > peso x 0,82 (M) o 0,74 (F); livello di default `intermedio` | **Giusto** nella direzione (la forza segue il muscolo, Janssen). **Non supportato**: `fracMagra.F` 0,74 equivale al 26% di grasso (donna attiva); SMM e FFM danno scale diverse per la stessa persona (SMM ~10-15% più bassa); **livello di default intermedio** (x1,3) è la scelta meno prudente | `fracMagra.F` 0,70; default principiante; BIA ±15% (DON-01, DON-02) |
| **PAR-02** fattore (`scalaDaCorpo`) | k = massa/rif x livello (1 / 1,3 / 1,6) x 0,9 (donne, solo non gambe e glutei) x età x PAR-Q 0,85 x prudenza 0,85; limiti 0,45-1,8 | **Giusto**: 0,9 e 0,74/0,82 danno 0,81 sulla parte alta e 0,90 sulla bassa, coerente con 30,6% contro 38,4% di muscolo/peso (Janssen) e con 40%/33% di muscolo in meno. **Troppo piatto**: gli standard vanno da non allenata a intermedia di circa 1,8-2x, PAR di 1,3x. **Insufficiente** per le principianti: dà 75-120% di 1RM sulla parte alta. **Limite 0,45** annulla una partenza bassa. **Età 0,95 a 50-64 anni**: nessuna fonte vista, effetto piccolo, innocuo | DON-01 (moltiplicatori, limite 0,25) |
| **PAR-03** dallo storico (`scalaDaStorico`) | Mediana del rapporto tra 1RM (Epley sul solo carico e ripetizioni) e valore di libreria, su esercizi già fatti; a 4 esercizi comanda lo storico | **Giusto** l'idea (il miglior predittore è il suo carico). **Manca**: (a) con il carico basso DON il massimale stimato dalle ripetizioni **sottostima** l'1RM (le serie hanno molta riserva) e i nuovi esercizi partono ancora più bassi; (b) una sola mediana per alto e basso, mentre le donne hanno rapporto parte alta/bassa diverso dagli uomini | DON-05 (usa solo serie con RPE reale o sbloccate; due mediane) |
| **PAR-04** arrotondamento | Barra 20 kg (mai sotto, salvo default inferiore); manubri e corpo libero 1 kg sotto 10 kg, poi 2 kg; macchine e cavi 2,5 kg | **Pavimento barra**: contraddice una partenza bassa (3.7). Passi di 2,5 kg sulle macchine: spesso 5 kg di pila; con DON il 17% di salto per passo sui carichi di 15 kg | DON-03, DON-06 |
| **PAR-05** dove si applica | Programma, esercizi nuovi o sostituiti, macchinario occupato, seduta libera; nota «stimato» alla prima seduta | **Giusto**. **Manca** il messaggio sul perché si parte leggeri e sulla salita rapida (oggi: «prudente, si regola nelle prime sedute») | DON-07 |
| **CAR-16** calibrazione, serie facili | Prime 3 sedute: +5% per punto di RPE sotto il bersaglio, tetto +15% | Troppo lento per recuperare un errore del 40%: il bersaglio RPE e i tetti non conoscono la partenza deliberatamente bassa; richiede RPE registrato | DON-04 |
| **CAR-17** carico troppo alto | Meno del 60% delle serie o ripetizioni medie ≥ 3 sotto: -5% subito | **Troppo lento**: con una partenza del 60% troppo alta servono molte sedute; ma con DON-01 la partenza è già bassa | Resta; con DON-04 |
| **INT-04** prima volta | -1 serie (min 2), +1 RIR | **Giusto** (effetto della seduta ripetuta [M]); il carico però non cambia | Resta |
| **PRG-20** pause -15% | Donne: recupero x0,85, minimo 60 s, per ogni tipo di carico (PeerJ 2025 [R]) | **Parzialmente supportato**: più resistenza alla fatica sotto l'80% di 1RM (1.6); nessuna prova a carichi pesanti; **Contrastata** a 30% | DON-08 |
| **PRZ-01** ciclo | Voce facoltativa, trattata come sonno e stress, nessuna programmazione per fasi | **Giusto** (1.9) | Resta; DON-10 aggiunge solo la scelta manuale |
| **LIV-02** `STANDARD_FORZA` | Tabella F/M non usata | **Coerente** con le àncore viste (1.3) | Usare per controllo (STD-01 in `ricerca-forza-progressione.md`) |
| **COR-03** proteine 1,75 g/kg per le donne | Valore diverso per sesso | **Non supportato**: nessuna fonte per differenziare (già segnalato da `ricerca-cardio-nutrizione.md`) | Fuori ambito, vedi NUT-01 |
| **BIA-02** «<17%» | Messaggio sul ciclo | **Non supportato** come soglia (1.12) | DON-14, DCA-03 |

---

## 6. Regole proposte

Codice di area **DON** (donne). Formato come `RIC`: riga `- **DON-NN** ...` nel cap. 19 di `docs/coach-mappa-regole.md` (poi `npm run catalogo`), codice in `REGOLE_SPEGNIBILI` di `js/coach/parametri.js`, valori in `COACH_PARAMETRI`, `regolaAttiva('DON-NN')`, solo con `coachAttivo()`, motivo in italiano (e in `js/lingue/en|es|de.js`), annullabile, test in `tests/browser/carichi-partenza.js` e `regole-nuove.js`. **Le salvaguardie hanno la precedenza** (modalità prudente, over 65, dolore, scarico: i fattori si moltiplicano, mai si saltano). Per tutte: alzare `CACHE_NAME` in `sw.js` e rigenerare (`npm run controlla`). Le regole DON-12..14 toccano la salute: sono **informazione e rinvio**, bloccate dalla verifica in Appendice B.

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **DON-01** fattore di avvio prudente | Donna, esercizio mai fatto, stima dal corpo (PAR-02) | Moltiplica k per `avvioDonna[livello][classe]` (principiante 0,60 / 0,65 / 0,75 per alto / basso / iso; intermedio 0,85; avanzato 1); limite inferiore di k a 0,25; `fracMagra.F` 0,70; BIA con effetto massimo ±15% rispetto alla stima dal peso | «Parti leggera: i primi carichi servono a imparare il movimento. Salgo in fretta dalle prossime sedute» | Convenzione (àncore di terzi + 1.2) | Troppo leggero = una seduta in più; troppo pesante = dolenzia e serie mancate. Non agisce se manca il consenso ai dati | `js/coach/carichi/partenza.js`: `PARAM_PARTENZA`, `scalaDaCorpo`, `contestoCarichi`, `stimaCaricoIniziale` (limiti); `js/coach/parametri.js` |
| **DON-02** livello non dichiarato = principiante | `level` assente nel profilo o nei dati dell'onboarding | Usa `principiante` al posto di `intermedio` nel contesto dei carichi | (nessuno, interno) | Convenzione (prudenza) | Minima: più basso e si corregge | `contestoCarichi` (riga del default) |
| **DON-03** barra sotto soglia | Esercizio «bilanciere» con carico DON `< 0,9 x peso barra` per principiante o intermedia | Sostituisce con la variante più leggera dello stesso muscolo/schema già in libreria; se l'utente ha una barra più leggera, la usa come pavimento; se l'esercizio è imposto: barra con 6-8 ripetizioni e 1 serie in meno | «La barra da 20 kg per ora è troppo pesante per partire: uso manubri o macchina, e passo al bilanciere quando serve» | Convenzione | Cambia gli esercizi: annullabile («ripristina»); non scatta con metodi famosi scelti dall'utente | `partenza.js` `arrotondaPartenza`; `js/coach/programma/alternative.js`; `onboarding` (campo barra) |
| **DON-04** sblocco rapido | Prime 3 esposizioni dell'esercizio, donna con DON-01 | Tabella 3.6: salto per RPE medio (+20/25/20% fino a RPE ≤ 5; +15/20/15% a 6; +10% a 7; +5% a 8; 0 altrove); senza RPE: +10/15/10% se serie complete; stop al primo RPE ≥ 8; CAR-17 invariato | «Troppo facile: salgo in fretta. Poi la progressione diventa quella normale» | Convenzione (priori [M]; nessun tasso per settimana verificato) | Salto massimo 20-25%; non scatta con dolore, PAR-Q positivo, scarico, prontezza <50. Si ferma al primo RPE ≥ 8 | `js/coach/regole-ricerca.js` `caricoProssimoBase` (ramo `calibrazione`); `js/coach/regole-nuove.js` (avvolgimento) |
| **DON-05** storico corretto | Calcolo di `scalaDaStorico` per una donna con DON-01 | Usa solo esercizi con RPE medio ≥ 7 o con sblocco finito; due mediane (alto e basso) se ≥ 2 esercizi per lato | (interno) | Convenzione | Con pochi dati resta DON-01 | `partenza.js` `scalaDaStorico` |
| **DON-06** incrementi relativi sui carichi piccoli | Carico di lavoro < 30 kg (alto) o < 40 kg (basso) dopo lo sblocco | Incremento 2-5% con arrotondamento sul passo reale (manubri 1 kg, dischi piccoli); prima +1 ripetizione fino al tetto, poi il carico | «Salgo a piccoli passi: +1 ripetizione prima, poi un po' di peso» | Convenzione | Dischi piccoli non sempre disponibili: avviso | `js/coach/carichi/progressivo.js` `incrementoPer` / `arrotonda` |
| **DON-07** messaggio di prima seduta | Prima esposizione a un esercizio (donne e uomini, nota `stimato`) | Sostituisce il motivo con un testo che dice perché si parte leggeri e come si sale | «Oggi si parte leggeri apposta: non è un test. L'obiettivo è finire con 3-4 ripetizioni in più. La dolenzia dopo una seduta nuova è normale e non misura i progressi» | Convenzione | Nessuno | `MOTIVI_STIMA` in `partenza.js` |
| **DON-08** pause per carico | Donna, esercizio con carico previsto ≤ 80% di 1RM (isolamento, macchina, ≥ 8 ripetizioni) | Pause -15% (minimo 60 s isolamenti, 90 s multiarticolari); nessuna riduzione per ≤ 5 ripetizioni | «Pause un po' più corte sulle serie leggere: tra una serie e l'altra recuperi più in fretta» | Convenzione, **Contrastata** (1.6) | Annullabile; non si applica con PAR-Q | `js/coach/programma/ricette.js` (righe 182-207: `donna`, `rest`) |
| **DON-09** progressioni di parte alta | Donna principiante con obiettivo che include schiena o petto | Slot «tirata verticale» -> lat machine (non trazioni), «spinta» -> macchina o piegamenti inclinati; scala trazioni (macchina assistita -> negative -> trazione) e piegamenti (piano alto -> terra) con salto a 3 x 10-15 pulite | «Parti da un gradino che ti fa fare bene tutte le ripetizioni: salgo quando le fai pulite» | Convenzione | Basso | `ricette.js` `RICETTE`; `js/coach/programma/alternative.js`; `js/dati/libreria-esercizi.js` |
| **DON-10** ciclo mestruale | Voce di prontezza «ciclo» attiva | Nessuna programmazione per fasi; la risposta resta una voce come sonno e stress; aggiunge la scelta manuale «oggi seduta più leggera» (-10% carico, +1 RIR) con motivo; dopo ≥ 3 cicli registrati mostra **all'utente** (non al coach) se i suoi RPE cambiano con la fase | «Non cambio il piano per fase del ciclo: gli studi mostrano effetti piccoli e diversi da persona a persona. Se oggi ti senti giù, puoi fare una seduta più leggera» | Moderata [M, da verificare] | Nessun adattamento automatico; dato sensibile: resta locale, con consenso | `js/coach/prontezza.js` (`PRONTEZZA_VOCI`, `applicaProntezza`); `repertorio.js` |
| **DON-11** nessuna enfasi per sesso | Generazione di programma per una donna | Non aggiunge glutei né toglie parte alta per sesso: l'enfasi viene solo da obiettivo o priorità scelti (PRG-22, PRG-29) | (interno) | Convenzione | Nessuno | `ricette.js` (`donna`), `onboarding.js` `schemeFor` |
| **DON-12** gravidanza e post-partum | PAR-Q «gravidanza o parto recente» sì, oppure scelta esplicita | Messaggio fisso «parla con ostetrica o medico»; RIR ≥ 3-4, 8-15 ripetizioni, niente apnea, niente cedimento, niente supina prolungata (dopo il primo trimestre), niente impatto o contatto; in post-partum rampa -30/-20/-10/0% (come REC-08) e domanda sul pavimento pelvico («perdite, pesantezza, sporgenza» -> riduzione e rinvio a fisioterapista). **Estende REC-12**; bloccata dalla verifica | «Con una gravidanza o un parto recente parla con la tua ostetrica o il tuo medico prima di allenarti. Se hai sanguinamento, capogiri, dolore al petto o perdite, fermati e chiama» | Moderata/Convenzione [M] | **Alto**: solo prudenza, nessuna prescrizione | `partenza.js`, `ricette.js` (ramo `cauto`), `questionario-decisioni.js`, `regole-nuove.js` |
| **DON-13** menopausa e over 50 | Donna con età ≥ 50 e/o «menopausa» dichiarata; assente osteoporosi dichiarata | Dopo 8-12 settimane di base, un esercizio pesante (6-8 ripetizioni, RIR 2-3) per schema; potenza leggera sul primo multiarticolare (come PRG-34 per over 65); con osteoporosi dichiarata: niente flessione o torsione con carico (Crunch, Russian Twist, Good Morning) | «Carichi più pesanti, ben eseguiti, aiutano le ossa e i muscoli dopo la menopausa. Con osteoporosi evito i movimenti che piegano o torcono la schiena con peso» | Moderata [M, da verificare] | Over 65 mantengono le regole attuali; con fratture: parere medico | `ricette.js`, `motore.js` `RISCHIO`, `repertorio.js` |
| **DON-14** segnali di energia e di ferro | Risposta esplicita dell'utente (nuova domanda facoltativa): assenza di mestruazioni da ≥ 3 mesi, fratture da stress, stanchezza persistente con calo di prestazione, infezioni frequenti | Nessuna restrizione automatica del piano; messaggio di rinvio al medico; nessuna indicazione di integratori; con obiettivo dimagrimento attivo propone di **non** aumentare il deficit (DCA-01) | «Se hai assenza di mestruazioni, fratture da stress o stanchezza che non passa, parlane con il tuo medico: può dipendere da poca energia o da carenza di ferro. Io non posso diagnosticarlo» | Moderata/Convenzione [M] | **Alto**: informazione e rinvio; bloccata dalla verifica | `repertorio.js` `corpoCoach`, `bia/lettore.js` (sostituire il messaggio <17%), `psicologia.js` |
| **DON-15** linguaggio | Tutti i testi del coach e delle schede | Lessico: evitare «tonificare», «sgonfiare», «difetti», «da donna», «senza diventare grossa»; usare «più forte», «salire di carico», «energia», «scegli tu»; nessun tono diverso per sesso | (revisione dei testi) | Convenzione | Nessuno | `js/lingue/*.js`, `compone.js`, `onboarding.js` |
| **DON-16** taratura locale | Prima esposizione, consenso ai dati | Registra RPE medio e serie complete per esercizio, mostra a chi sviluppa le medie; nessun invio | (interno) | Convenzione | Privacy: solo locale, come il resto dei dati | `partenza.js`, `js/core/storage.js` |

Ordine di priorità: DON-01, DON-02, DON-03, DON-04 (le quattro insieme, altrimenti il limite 0,45 e la barra annullano l'effetto), poi DON-07, DON-05, DON-06, DON-08, DON-09, DON-10; DON-11, DON-15 sono revisioni di testo; DON-12..14 vanno verificate prima.

---

## 7. Domande aperte

1. **Anche gli uomini?** Lo stesso metodo dice -25/-35% per un uomo di 75 kg principiante (3.5). È una decisione di prodotto, non di sesso. Dati da guardare: RPE della prima seduta di uomini e donne (DON-16).
2. **Verifica delle àncore «non allenato»**: i 0,62 / 0,42 / 0,73 (donna) vengono da un frammento di terzi su Symmetric Strength (una sola fonte). Serve il testo originale o dati di popolazione (Strength Level non è una popolazione generale).
3. **I rapporti derivati** (lat machine, chest press, military, leg press, hip thrust, RDL, leg extension, leg curl, manubri per mano) sono ordini di grandezza miei: servono studi con 1RM misurato in donne non allenate sugli stessi esercizi.
4. **Tassi di salita** nei principianti per settimana, per sesso ed esercizio: il riassunto del PLOS ONE 2023 non è utilizzabile (1.2). Leggere l'abstract di PMID 37053143.
5. **Dolenzia e abbandono dopo la prima seduta**, in funzione del carico: nessuna fonte vista. Cercare studi su dose iniziale, DOMS e aderenza nelle donne.
6. **Fatica e RIR nelle donne**: un'accuratezza del RIR diversa per sesso? Gli studi su ripetizioni a pari % non sono stati identificati (1.6).
7. **Contraccezione ormonale e adattamento ai pesi**: la letteratura è scarsa e contrastata [M]; cercare le meta-analisi 2020-2025.
8. **Gravidanza e post-partum**: leggere ACOG, la linea guida canadese e le raccomandazioni sul pavimento pelvico per il testo di DON-12 (che cosa evitare e dopo quanto).
9. **Menopausa**: LIFTMOR è singolo, supervisionato; quanto si estende a un'app senza supervisione? Cercare meta-analisi su densità ossea e pesi in postmenopausa.
10. **RED-S**: soglia di 30 kcal/kg di massa magra, segnali, testo di rinvio. Verificare IOC 2023.
11. **Ferro**: prevalenza nelle donne che si allenano e testo sicuro.
12. **Barra più leggera**: quanti utenti hanno barre da 10-15 kg? Il campo «barra» in onboarding è utile solo se la risposta cambia le scelte.
13. **Sesso non dichiarato o non binario**: per ora `donna` = `F` o `donna`; chi non indica il sesso usa il fattore maschile. Valutare un fattore neutro prudente.
14. **Esperti non cercati**: Stefanie Cohen, Jeff Nippard, Eric Helms, Mike Israetel, Natalie Arbaugh sul tema donne e carichi di partenza.

---

## 8. Limiti onesti

- **Rete**: solo WebSearch (nessun testo integrale; rete.md); 20 ricerche riuscite; il resto da conoscenza del modello, marcata.
- **Fonti secondarie**: le tabelle di standard sono di app e blog di terzi; il frammento «donna di 130 lb: 80 / 55 / 95 lb» è lo stesso in due ricerche (una fonte).
- **Derivazione**: ogni numero della sezione 3 è un calcolo mio a partire da àncore di terzi e ordini di grandezza; le incertezze dei singoli rapporti sono ±25% e si compongono. Non sono misure.
- **Popolazioni**: le meta-analisi su guadagni relativi riguardano adulti sani 18-45 anni (Refalo) e over 50 (2020); le donne in gravidanza, postmenopausa con osteoporosi e atlete d'élite non sono coperte dai numeri sopra.
- **Un'affermazione incoerente scartata**: i tassi «7,2% e 5,2% a settimana» (PLOS ONE 2023).
- **Nessun dato su abbandono per carico iniziale** e nessuna taratura su utenti reali.
- **Salute**: tutto ciò che è etichettato [M] su gravidanza, menopausa, RED-S e ferro è **informazione prudente**, non verificata; non si implementa senza Appendice B.

---

## Appendice A. Registro delle 20 ricerche riuscite

| # | Interrogazione (sintesi) | Esito utile |
|---|---|---|
| 1 | differenze di sesso forza parte alta/bassa, meta-analisi (PubMed/PMC/Springer) | PMID 39501696, PMC11540993, revisione narrativa 2026, PMC7930971; forza 50-60% / 60-70% |
| 2 | Janssen 2000 distribuzione del muscolo | 33,0 contro 21,0 kg; -40% alto, -33% basso; titolo e rivista |
| 3 | Symmetric Strength standard donne e uomini | tabelle di app di terzi; àncora «non allenata» 130 lb: 80 / 55 / 95 |
| 4 | Strength Level panca donne | rapporti 0,30 / 0,50 / 0,75 / 1,10 / 1,45; kg per peso |
| 5 | forza e composizione corporea in studenti 2024 | PMID 39501696: n = 44; r = -0,12 / 0,47 |
| 6 | Roberts 2020 differenze di sesso | JSCR 2020; ipertrofia relativa simile; titoli (Sports Med 2020, audit linee guida, Bayesiana) |
| 7 | Symmetric Strength hip thrust, lat pulldown, leg press, curl | tabelle Strength Level 130 lb |
| 8 | Barbell Medicine standard di forza | 809.986 gare, 15 federazioni, 1968-2022 |
| 9 | Bayesiana differenze di sesso massa muscolare | Refalo 2025, PMID 40028215, 29 studi, SMD 0,19, 0,69% |
| 10 | audit linee guida con bias di sesso | PMID 37382828: 70% uomini adulti, 13% autrici |
| 11 | donne non allenate: prime settimane, neurale | PMC13405670, PMC10101404, riassunti 4-8 settimane |
| 12 | squat con corpo libero contro bilanciere in donne sedentarie | PMC10439966, n = 13, 6 settimane |
| 13 | PLOS ONE 2023: guadagni per settimana nelle donne | PMID 37053143: 31 studi, 621 donne (numeri per settimana incoerenti) |
| 14 | adattamenti precoci in donne non allenate | PMID 42555436: n = 10, +15% di coppia, spessore invariato |
| 15 | Hunter: fatica per sesso | PMID 26440505, PMC5777316, PMID 11717235: tenuta +118% |
| 16 | ripetizioni a pari % di 1RM nelle donne | numeri 43,3 contro 25,2-28,1; 58,3 contro 29,6; titoli PMC12790778, PMC10863198, PMC12151235 |
| 17 | verifica PLOS ONE 2023 (seconda formulazione) | stessi numeri, stessa incoerenza |
| 18 | «similar adaptations upper and lower body between sexes» | PMC8648816, n = 18, 7 settimane |
| 19 | forza della parte alta uomini e donne dopo 10 settimane | PMC4756754: 44 + 47, +11,61 contro +11,76% |
| 20 | differenze di sesso negli over 50, meta-analisi | Sports Med 2020: 30 studi, 1410 persone |

## Appendice B. Query pronte per ripeterle con il tetto alzato

Usare `allowed_domains ["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","link.springer.com"]` per titoli e PMID; senza filtri per i riassunti.

**Carichi e standard**
1. `Symmetric Strength about` (testo del metodo) e `strengthlevel.com female squat standards`.
2. `one repetition maximum untrained women bench press squat leg press lat pulldown normative data`.
3. `muscle strength normative data young women 1RM relative to body mass`.
4. `first session resistance training load selection untrained women 8-12 repetitions RPE`.
5. `repetitions in reserve accuracy novice women underestimation`.
6. `strength gains first 8 weeks untrained women 1RM percent change bench squat randomized`.
7. `learning effect strength testing novices 1RM familiarisation sessions`.
8. `lean mass versus body mass normalization strength women allometric scaling`.
9. `bioelectrical impedance skeletal muscle mass error hydration women menstrual cycle`.

**Dolenzia e aderenza**
10. `repeated bout effect light first bout protection eccentric exercise women`.
11. `sex differences exercise-induced muscle damage creatine kinase women estrogen meta-analysis`.
12. `muscle soreness dropout resistance training beginners adherence`.
13. `initial exercise intensity affect adherence women resistance training randomized`.
14. `Damas early resistance training edema muscle swelling hypertrophy`.

**Fatica, ripetizioni, pause**
15. `sex differences repetitions to failure percent 1RM bench press squat meta-analysis`.
16. `rest interval women resistance training strength hypertrophy sex differences`.
17. `women recover faster between sets velocity loss sex difference`.

**Ipertrofia e volume**
18. `Plotkin 2023 hip thrust back squat gluteus maximus hypertrophy` e `Back Squat vs Hip Thrust Well-trained Women results`.
19. `weekly volume hypertrophy women sets per week dose-response sex`.
20. `Schoenfeld 2017 low versus high load meta-analysis` (PMID).
21. `gluteus maximus hypertrophy hip thrust RDL split squat women training study`.

**Parte alta**
22. `assisted pull-up band negatives progression women first pull-up`.
23. `push-up incline percentage of body weight kinetic analysis Ebben`.

**Ciclo e ormoni**
24. `menstrual cycle phase resistance training meta-analysis McNulty Elliott-Sale`.
25. `Colenso-Semple 2023 menstrual cycle strength hypertrophy`.
26. `oral contraceptives resistance training lean mass strength meta-analysis`.

**Gravidanza e post-partum**
27. `ACOG committee opinion physical activity exercise pregnancy postpartum 804`.
28. `Canadian 2019 guideline physical activity throughout pregnancy Mottola`.
29. `postpartum return to exercise pelvic floor symptoms resistance training guideline Goom`.

**Menopausa**
30. `LIFTMOR Watson 2018 high-intensity resistance impact training postmenopausal`.
31. `resistance training bone mineral density postmenopausal women meta-analysis`.
32. `Giangregorio 2014 Too Fit To Fracture exercise recommendations osteoporosis`.
33. `perimenopause strength training muscle mass fat distribution randomized`.

**Energia, ferro, corpo**
34. `IOC consensus statement relative energy deficiency in sport 2023 update`.
35. `low energy availability 30 kcal per kg fat-free mass amenorrhea threshold`.
36. `iron deficiency prevalence female athletes ferritin fatigue narrative review`.
37. `toning myth women lifting weights bulky perceptions study`.
38. `body image resistance training women intervention`.

**Esperti (titoli e note)**
39. `strongerbyscience.com strength training for women` (testo integrale se la rete lo consente).
40. `Barbell Medicine women strength training`, `Eric Helms women`, `Jeff Nippard women training evidence`, `Stefanie Cohen women strength coach`, `Natalie Arbaugh`, `Stacy Sims cycle syncing criticism evidence` (con `allowed_domains ["youtube.com"]` per i titoli dei video).
