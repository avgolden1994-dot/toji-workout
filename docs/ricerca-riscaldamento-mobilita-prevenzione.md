# Ricerca: riscaldamento, mobilità, prevenzione e defaticamento

**Copertura: 23 ricerche web riuscite; il resto da conoscenza del modello** (la sessione ha raggiunto il tetto di 200 ricerche WebSearch, condiviso da tutti gli agenti: non ho insistito né aggirato il limite).

Ambito: riscaldamento generale e specifico (serie progressive), stretching, foam rolling e pistole da massaggio, mobilità e ROM, prehab per zona, respirazione e bracing, defaticamento, età e temperatura. Approfondisce il solo §1.2 «Riscaldamento e stretching» di `docs/ricerca-recupero-infortuni-popolazioni.md` (dolore e infortuni in generale restano lì). Tocca: `addWarmup` (`js/ui/allenamento/seduta.js:63`), il modello dei tempi `minutiDi` (`js/coach/programma/ricette.js:337`), **BIO-01/04/05/06** (`js/coach/biomeccanica.js`), **PRG-19/37** (over 65, equilibrio), cap. 9, 10 e 14 di `docs/coach-mappa-regole.md`. Codice nuovo proposto: **RIS** (area libera: nessun `RIS-` in `docs/`, `js/`, `tests/` al 2026-10-05; ricontrollare prima di assegnarlo, altre note sono in lavorazione in parallelo).

Data della ricerca: **2026-10-05**. Canale: solo WebSearch (WebFetch, curl e browser bloccati, vedi `.claude/skills/ricerca-fitness/references/rete.md`). Ciò che si legge è il **riassunto del risultato** (titolo, URL, snippet), non il testo dello studio.

## Come si legge

Forza: **Solida** (meta-analisi o posizione ufficiale concordi), **Moderata** (pochi studi controllati, o risultati che cambiano con la popolazione), **Convenzione** (pratica dei coach senza prove dirette), **+ Contrastata** (fonti di pari livello non concordano). Stesso schema di `docs/ricerca-struttura-e-intensita.md`.

Stato di verifica scritto accanto a ogni fonte:

- **[V]** visto nei risultati di WebSearch di questa sessione (titolo, rivista, anno, PMID/PMC dagli URL; gli snippet con numeri sono di seconda mano e lo dico). Gli autori sono nominati solo se compaiono nel risultato.
- **[R]** già scritto nel repo o nella nota REC (visto in una sessione precedente, non ricontrollato qui).
- **[N]** **Conoscenza del modello (non verificata sul web)**: mai base di una regola da sola; forza massima «Convenzione» oppure «Moderata (da verificare)». Dove ricordo un autore o un anno con sicurezza lo scrivo, altrimenti no; non do DOI né PMID che non ho visto; i numeri sono intervalli.

Le tabelle delle sezioni 3-5 (algoritmo, blocchi, prehab) sono **proposte di prodotto** costruite sopra le fonti sotto: dove una cifra è una scelta e non un risultato lo dichiaro («parametro del coach, Convenzione»).

## In una pagina

1. **Riscaldarsi migliora la prestazione, ma «previene gli infortuni» è un'altra cosa.** L'unica prevenzione con prove viste è quella di **programmi multicomponente** (FIFA 11+: rischio relativo 0,70 su 6 RCT e 6.344 giocatori, snippet [V]) e di **allenamento di forza** progressivo (Lauersen 2014 e 2018 [V titoli], cifre 30-70% solo da riassunto secondario); la stessa ricerca sui ricreativi adulti dice che i programmi **supervisionati** riducono gli infortuni (rischio relativo 0,71 in totale; -33% se supervisionati) mentre per quelli **non supervisionati non c'è prova** [V, snippet]. L'app è «non supervisionata»: non deve promettere protezione.
2. **Serie progressive: servono, e non affaticano.** Un riscaldamento di serie progressive (circa 40-90% del carico) aiuta le ripetizioni e la velocità [R, V]; uno studio su 14 allenati non trova differenze di ripetizioni o di volume tra un riscaldamento di 8 ripetizioni al 45% di 1RM e serie più pesanti o veloci (nessun vantaggio dalla serie «potenziante»; Souza, PeerJ 2024, PMC11243969 [V]); che le serie leggere non affatichino è inferito dai carichi, non misurato contro l'assenza di riscaldamento. Quante serie e a che percentuale resta **Convenzione**: i coach divergono (3 serie 45/65/85%; 1-3 serie; il metodo 12-8-4; «3-5 serie» a rampa) [V, tutte fonti secondarie].
3. **Lo statico lungo prima del sollevamento no, quello breve sì.** Nessun calo con tenute **<30 s**; calo (circa 4-7,5% di forza e potenza) con **≥60 s per muscolo** (Kay e Blazevich 2012, PMID 21659901, snippet [V]; PMC11336295 [V]). Se lo stretching entra in un riscaldamento completo con attività dinamica i deficit si attenuano (Behm 2016 [V]).
4. **Foam rolling e pistola da massaggio: ROM a breve termine, nessun costo sulla prestazione, DOMS poco o nulla.** Foam rolling (Wiewelhove 2019, 21 studi): sprint +0,7% (ES 0,28, P=0,06), effetti trascurabili su salto e forza [V, snippet]; pistole: ROM e flessibilità migliorano nel breve, «nessun beneficio chiaro» su recupero della forza e DOMS (meta-analisi sui dosaggi, PMC13488264 [V]).
5. **Per il ROM bastano i pesi a tutta ampiezza**: pari allo stretching (Afonso 2021: stretching «appena favorito»; pesi a lunghezze muscolari lunghe con effetto comparabile [V]; ES 0,73 per i pesi [R]). La mobilità dedicata serve a chi ha una limitazione concreta, non a tutti.
6. **Il prehab «a pezzi» (cuffia, glutei, VMO, Y-T-W) ha prove deboli come prevenzione negli allenati sani**; ha prove come terapia quando c'è dolore [R]. Cosa ha senso: forza progressiva, equilibrio per over 50-65, e routine brevi legate al contenuto della seduta (§4-5).
7. **Il defaticamento (cool-down) e lo stretching dopo non danno recupero misurabile** [N, da verificare]: va bene come scelta personale, non come regola.
8. **L'app ha già**: tre serie manuali 50/70/85% × 10/6/3 (`addWarmup`), tre prove fai-da-te (BIO-04), il testo McGill (BIO-06), 5 minuti di equilibrio per over 65 (PRG-37). **Manca**: riscaldamento generale, ripetizioni e numero di serie per classe di esercizio, riposi, quando saltarlo, mobilità e il tempo per tutto ciò.

## 1. Cosa dicono le fonti

### 1.1 Riscaldamento: prestazione e infortuni

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Riscaldamento e prestazione (meta-analisi) | Esiste la meta-analisi di riferimento sugli effetti del riscaldamento sulla prestazione; **nei risultati compare solo il titolo, nessun numero**. [N] Ricordo che la maggioranza degli studi inclusi (ordine di tre quarti, quattro quinti) mostra miglioramento, con eterogeneità alta per tipo di riscaldamento | Moderata (da verificare) | Fradkin 2010, JSCR [V titolo]; contenuto: Conoscenza del modello (non verificata sul web) [N] |
| Riscaldamento e infortuni (RCT) | Esiste la revisione degli RCT sul riscaldamento come prevenzione; nei risultati **solo titolo e citazioni**. [N] Ricordo che la conclusione era di prove insufficienti per un riscaldamento generico | Contrastata (da verificare) | Fradkin 2006 [V titolo]; conclusione: Conoscenza del modello (non verificata sul web) [N] |
| Riscaldamento della parte alta | Esiste una revisione sistematica sugli effetti del riscaldamento della parte alta su prestazione e infortuni; **contenuto non visto** | Lacuna | McCrary 2015, BJSM [V titolo] |
| Cosa pensano i coach | Indagine sui coach di forza e condizionamento: obiettivi principali del riscaldamento «prevenzione degli infortuni» **88%**, «prestazione» **86%**, «preparazione mentale» **64%** (snippet) | Convenzione (credenza diffusa, non prova) | «Current practices of warm-up during strength training and conditioning based on coaching experience», Sport Sci Health 2025 (s11332-025-01341-w) [V] |
| Stretching come prevenzione | Revisioni sistematiche sullo stretching (statico, nel riscaldamento) e infortuni: titoli visti (PMID 18785063, 25401202, 12909434); **conclusioni non viste**. Meta-analisi più recente: «Stretching intervention can prevent muscle injuries» (Sport Sci Health 2024, s11332-024-01213-9), conclusione nel titolo, dettagli non visti. [N] Le revisioni più vecchie trovavano effetto nullo o piccolo sugli infortuni complessivi | Contrastata | [V titoli]; sintesi vecchie: Conoscenza del modello (non verificata sul web) [N] |
| Riscaldamento nei lavoratori | Esiste una revisione sistematica sul riscaldamento contro i disturbi muscoloscheletrici da lavoro; **risultati non visti** | Lacuna | PMC10163487 [V titolo] |
| Programma multicomponente (FIFA 11+) | Meta-analisi di **6 RCT, 6.344 giocatori**: infortuni **-30%**, rischio relativo **0,70** (IC 95% 0,52-0,93); caviglia: **3 RCT, 3.833 partecipanti**, rate ratio **0,67** (0,46-0,96); arto inferiore RR 0,70 (0,53-0,93); riduzioni dal 30 al 46% a seconda delle squadre. Dura **circa 20 minuti**, senza attrezzatura: corsa e movimenti dinamici, forza/pliometria/equilibrio con 3 livelli, corse a velocità. Il beneficio passa da controllo neuromuscolare, tronco e anca, eccentrico, allineamento in atterraggio. Studi su **calcio** | Moderata-Solida in squadra; per un frequentatore di palestra **estrapolazione** | PMC12856364, PMC12371935, PMC5704377 (s13102-017-0083-z), PMID 28087568 [V, numeri da snippet]; aderenza e FIFA 11+: PMID 41981827 [V titolo] |
| Programmi per ricreativi adulti | **16 studi**: rischio relativo **0,71** in totale; i programmi **supervisionati riducono gli infortuni del 33%**, per i **non supervisionati non c'è prova**; correlazione inversa tra tasso di infortuni e **aderenza**; vale per uomini e donne. Altra meta-analisi su 44 studi su supervisione, età e sesso | Moderata (snippet) | «The Effects of Exercise-Based Injury Prevention Programmes on Injury Risk in Adult Recreational Athletes», Sports Med 2023 (s40279-023-01950-w); PMID 37283040 [V] |
| Forza come prevenzione | Il rinforzo riduce il rischio di infortuni acuti e da sovraccarico (riassunto secondario: **circa 30-70%**, con relazione dose-risposta: più volume di forza, meno infortuni); le due meta-analisi sono la 2014 («The effectiveness of exercise interventions to prevent sports injuries», BJSM 48:871-877) e la 2018 («Strength training as superior, dose-dependent and safe prevention...», BJSM). Le cifre arrivano da un capitolo/riassunto, **non dal testo** | Moderata (cifre da verificare) | Lauersen 2014 e 2018 [V titoli]; adesione alla forza e infortuni negli sport di contatto: PMC12099121 [V titolo] |
| Nordic hamstring | Programmi che includono il Nordic riducono gli infortuni ai femorali (**fino al 51%** a lungo termine; «dimezza» su **8.459 atleti**, snippet); una network meta-analisi più recente (**11 RCT, 9.282 partecipanti**) trova per il Nordic una stima favorevole ma **non significativa** rispetto ad altri interventi | Moderata + Contrastata | Sports Med (s40279-016-0638-2) [V]; Sports Med Open (s40798-026-01087-w) [V]; PMID 37139743 (core e femorali) [V titolo] |

### 1.2 Serie progressive e riscaldamento specifico

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Serie progressive e ripetizioni | Serie con carichi **45-90% di 1RM** aumentano le ripetizioni a 70-75%; **2 serie da 6 ripetizioni al 40% e all'80% del carico di lavoro**, a massima velocità intenzionale, migliorano le prime ripetizioni di squat e panca | Moderata | PMID 25153744; scoping review s42978-025-00361-9; PMC12357318 [R, nota REC] |
| Specifico contro generale | Per la forza isometrica di squat, un riscaldamento di movimento conserva la forza meglio di una mobilità generale di pari durata (pilota, n piccolo). Snippet: **generale + specifico** migliora l'1RM di leg press più del solo specifico; una serie da 6 ripetizioni all'**80% di 1RM** potenzia lo squat più del 40% in allenati | Moderata-debole | PMID 41384426 [R, V]; snippet su 1RM e 80%/40% (studi non nominati) [V] |
| Serie leggere o con poche ripetizioni | 40 uomini allenati (19-30 anni), 3 × 6 all'80% dopo tre riscaldamenti: le forze erano ottimizzate da un riscaldamento specifico più carico nello squat; «**riscaldarsi con poche ripetizioni e carichi bassi non basta**» per ottimizzare squat e panca | Moderata-debole (un RCT, uomini giovani) | «The Role of Specific Warm-up during Bench Press and Squat Exercises: A Novel Approach», PMC7558980 (2020) [V] |
| Serie «potenzianti» pesanti | 14 uomini allenati: **1 × 3 al 90% di 1RM**, **1 × 6 al 45% a massima velocità** o **8 × 45% controllato**: **nessuna differenza** in ripetizioni totali (p=0,17) né volume-carico (p=0,15) su più serie di squat a cedimento; solo la **prima serie** con più volume dopo la serie pesante (p=0,04) | Moderata-debole (n=14, giovani) | Souza e colleghi, PeerJ 2024 (PMC11243969) [V]; nello stesso filone PMC12194115, s11332-025-01518-3 [V titoli] |
| Una serie di riscaldamento fa fatica? | Nessuna differenza tra protocolli con 8 ripetizioni al 45% e serie più pesanti (riga sopra); **nessuno studio visto confronta con l'assenza di riscaldamento**, quindi l'assenza di fatica è inferita dai carichi leggeri. **Re-warm-up** (riscaldarsi di nuovo dopo una pausa) ha una scoping review dedicata; **contenuto non visto** | Convenzione (inferenza) | Souza 2024 [V]; s42978-025-00361-9, PMC12115624 [V titoli] |
| Numero di serie (pratica) | Fonti secondarie: «3-5 serie a rampa» (rampa 40/60/75/85%, riposo 1-2 min tra le leggere e 2-3 min prima della prima serie di lavoro: sito di un coach); **Nippard** (riportato da un riassunto su un suo programma, da verificare): serie variabili, **1 serie ~60% × 6-10**, **2 serie 50% e 70%**, **3 serie 45/65/85%**, riscaldamento totale 5-10 minuti; **Renaissance Periodization** (riportato da riassunti di terzi, da verificare): metodo **12-8-4** (12 con il peso del 30RM, 8 con il 20RM, 4 con il 10RM) sul primo esercizio, poi **una serie da 8 con il 20RM** sui successivi; **Tuchscherer/RTS** (sito terzo, da verificare): riscaldamento a percentuale del carico di lavoro, senza RPE; con serie previste a RPE 7-8 ci si ferma quando i carichi iniziano a sembrare un RPE 7 | Convenzione (fonti livello 2-3, secondarie) | strengthlog.com; riassunti su programma di Nippard; riassunti RP (Scribd, BarBend); bspnova.com [V solo snippet] |
| Riscaldamento solo sul primo esercizio? | RP: non serve per ogni esercizio, specie se i muscoli sono simili; Nippard: riscaldamento specifico per esercizio. **Divergenza** (sezione 2) | Convenzione + Contrastata | come sopra [V] |

### 1.3 Stretching prima: statico, dinamico, PNF

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Statico: dose e deficit di forza | Effetto **dose-risposta** indipendente da compito e muscolo: **<30 s** nessun calo significativo; **30-45 s** circa -1,9% non significativo; **≥60 s** per muscolo **-4,0/-7,5%** di forza e potenza; il deficit è meno chiaro per la forza eccentrica (pochi studi). Una meta-analisi recente conferma il calo sulla forza massima per tenute **>60 s** ma **non conferma** danni su velocità, salto, sprint e lanci | Solida per la forza massima ≥60 s | Kay e Blazevich 2012 (PMID 21659901); PMC11336295; PMC6895680; [R, V] |
| Statico dentro un riscaldamento completo | Prolungati statico e PNF possono ridurre forza e potenza **se non inseriti in un riscaldamento completo**; dinamico e balistico di solito aumentano o non cambiano forza e potenza | Moderata | Behm e colleghi 2016, Appl Physiol Nutr Metab 41(1) [V] |
| Dinamico | Su salto verticale **+3,32%** e sprint **+1,05%** più veloce rispetto al controllo (snippet); una network meta-analisi indica lo stretching dinamico come il metodo più stabile per la forza esplosiva degli arti inferiori, con **7-10 minuti** come durata migliore. Nelle **serie di forza a ripetizioni** (non nell'esplosivo) prove dirette non viste | Moderata per l'esplosivo; lacuna per i pesi | Sports Med 2017 (s40279-017-0797-9); BMC Sports Sci Med Rehabil (s13102-023-00703-6); PMC10407730 [V, numeri snippet] |
| PNF contro statico | Nel ROM acuto sono **comparabili**; entrambi superiori a balistico e dinamico (snippet di una meta-analisi 2023); un'altra meta-analisi (Thomas 2018, snippet) dà lo statico **superiore** a balistico e PNF. Solo il PNF riduce in modo significativo la rigidità muscolare in uno studio | Moderata + Contrastata | Behm e colleghi, Sports Med Open 2023 (s40798-023-00652-x); PMC10645614 [V] |
| Stretching non locale | Lo stretching di un muscolo può cambiare il ROM di un altro: esistono meta-analisi sul ROM e sulla forza «non locali» | Lacuna (non letta) | s40279-020-01422-5, s00421-021-04657-w [V titoli] |

### 1.4 Foam rolling e pistola da massaggio

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Foam rolling e prestazione | 21 studi: effetti minimi, dipendenti dal contesto; sprint **+0,7%** (ES 0,28, P=0,06), **negligibili** su salto e forza: **nessun costo** sulla prestazione | Moderata | Wiewelhove 2019 (PMC6465761) [V, snippet] |
| Foam rolling e ROM | Esistono meta-analisi sugli effetti **acuti** sul ROM (Sports Med, s40279-019-01205-7), **dell'allenamento** sul ROM (s40279-022-01699-8), contro lo stretching statico (PMC11393112), combinato con stretching (PMC8256518) e con vibrazione (PMC8413912); **risultati non visti**. [N] Ricordo effetti acuti piccoli-moderati sul ROM, senza perdita di forza | Moderata (da verificare) | [V titoli]; sintesi: Conoscenza del modello (non verificata sul web) [N] |
| Recupero e DOMS (foam rolling) | Esiste la revisione di riferimento su ROM, recupero e prestazione con rullo e roller massager; **risultati non visti**. [N] Ricordo effetti piccoli sulla dolenzia | Moderata (da verificare) | Cheatham 2015, Int J Sports Phys Ther 10(6):827-838 [V titolo]; sintesi: Conoscenza del modello (non verificata sul web) [N] |
| Pistole da massaggio | ROM, flessibilità e dolore migliorano **nel breve**; l'effetto acuto su ROM, torque passivo e rigidità è **comparabile allo stretching statico**; forza massima per lo più invariata; la meta-analisi sui dosaggi (recupero dopo danno): **possibile aiuto sul salto (CMJ) e sulla CK, nessun beneficio chiaro su recupero della forza e DOMS**. Una revisione più vecchia (39 studi, citata nello snippet) diceva «riducono i DOMS»: **contrasto** | Moderata + Contrastata | PMC13488264 (meta-analisi 2026), PMC10532323, s11332-026-01830-6 [V, snippet] |

### 1.5 Mobilità, ROM, stretching come metodo

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Forza contro stretching per il ROM | Effetti **simili**, «appena favorito» lo stretching; l'allenamento di forza a **lunghezze muscolari lunghe** migliora il ROM con grandezza comparabile; i pesi a tutta ampiezza: ES **0,73**, nessuna differenza dallo stretching | Solida (meta-analisi concordi) | Afonso 2021, Healthcare 9:427 (PMC8067745) [V]; Sports Med 2022 (s40279-022-01804-x) [R]; PMC11841725 [V titolo] |
| «Devo fare stretching?» | Editoriale: distinguere «**posso?**» da «**devo?**» (lo stretching non è obbligatorio per il ROM se si usa tutta l'ampiezza con carico). Esiste un **consenso Delphi** di esperti internazionali sullo stretching e un articolo che separa ROM e flessibilità; **contenuti non visti** | Moderata (opinione di esperti) | PMID 34366900; PMC12305623; PMC13457238 [V titoli] |
| Dose per il ROM | Esiste una meta-analisi dose-risposta sulla dose ottimale per il ROM dei femorali accorciati (PMID 42551249) **non letta**. [N] Ordine di grandezza ricordato: tenute di **30-60 s**, almeno **circa 5-10 minuti a settimana per muscolo**, 2-3 volte a settimana | Convenzione (da verificare) | PMID 42551249 [V titolo]; dose: Conoscenza del modello (non verificata sul web) [N] |
| ROM e pausa | Settimane di stretching danno **grandi aumenti** di ROM, in media **mantenuti sopra il livello iniziale dopo circa 4,3 settimane** di stop (media di 8,7 settimane di stretching) | Moderata | s40798-025-00935-5 [R] |
| Stretching come metodo di crescita | Effetti **piccoli ma significativi** su forza massima e ipertrofia (più grandi con tenute più lunghe, più tempo totale, più varietà). Warneke: stretching di **polpacci** con ortesi, **30 min-2 h al giorno** per 6 settimane, alternativa al rinforzo per forza massima e spessore muscolare (RCT). Studio sul **pettorale** (8 settimane, supervisionato): risultati non visti. Meta-analisi su **animali** (stretching prolungato e ipertrofia): non estendibile | Moderata (RCT piccoli, dosi non realistiche per un'app) | s40798-024-00706-8 [R]; Warneke, Eur J Appl Physiol 2023 (s00421-023-05184-6) [V]; pettorale: s00421-023-05413-y [V titolo, autori non visti]; s42978-022-00191-z [V titolo, animali: bandiera rossa] |
| Stretching dopo | Esiste una meta-analisi su stretching **dopo** l'esercizio contro nessuno sul recupero e la prestazione degli arti inferiori: **risultati non visti**. [N] Ricordo che sulla dolenzia (DOMS) l'effetto è trascurabile (Herbert e collaboratori, Cochrane 2011: differenze di pochi mm su una scala da 100) | Moderata (da verificare) | PMID 41103301 [V titolo]; Herbert 2011: Conoscenza del modello (non verificata sul web) [N] |

### 1.6 Prehab per zona (cosa si sa e cosa no)

| Zona | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Spalla: cuffia, scapola | Come **terapia** (dolore da cuffia) l'esercizio è la prima linea, nessun tipo è chiaramente il migliore; FIMPACT: chirurgia non meglio di esercizio fino a 10 anni | Solida (terapia) | PMC13471655, PMC11846222, PMC6052435, PMC12670246 [R] |
| Spalla: prevenzione in sani (rotazione esterna, face pull, Y-T-W) | **Nessuna prova di prevenzione degli infortuni** vista; [N] i dati sono di EMG e di riabilitazione. Il rapporto tirate:spinte è una Convenzione (ABB-04 del repo) | Convenzione | Conoscenza del modello (non verificata sul web) [N]; ABB-04 [R] |
| Glutei: «attivazione» | Un riscaldamento «gluteo a basso carico» è stato studiato sul salto (PMC4519208, titolo visto; **risultato non visto**). La serie pesante «potenziante» **non** migliora il volume multi-serie (Souza 2024 [V]). [N] I glutei non «si spengono»: l'attivazione è una ripetizione di movimento, non un requisito | Moderata-debole | PMC4519208 [V titolo]; PMC11243969 [V]; resto: Conoscenza del modello (non verificata sul web) [N] |
| Caviglia: dorsiflessione e squat | [N] Il test del ginocchio al muro misura la dorsiflessione; con ROM limitato i talloni rialzati e le varianti guidate sono valide. Non ho visto in questa sessione studi sull'effetto della mobilità di caviglia sulla profondità o sugli infortuni | Convenzione | Conoscenza del modello (non verificata sul web) [N]; BIO-04/05 [R] |
| Torace: estensione e sopra la testa | [N] La mobilità toracica migliora il ROM toracico nel breve; non ho visto prove sulla prevenzione di dolore di spalla con spinte sopra la testa | Convenzione | Conoscenza del modello (non verificata sul web) [N] |
| Ginocchio | Dolore femororotuleo: **combinazione di esercizi per anca e ginocchio**, non mobilizzazioni isolate (consenso 2018). [N] Il vasto mediale obliquo (VMO) **non si attiva in modo selettivo** con un esercizio: «esercizi per il VMO» è un mito | Solida (consenso) per anca+ginocchio; VMO: Moderata (da verificare) | PMID 29925502 [R]; VMO: Conoscenza del modello (non verificata sul web) [N] |
| Schiena bassa: bracing, McGill Big 3 | Cochrane 2021: nessun tipo di esercizio è chiaramente migliore; **nessuno studio** sulle «Big 3» visto, solo pagine di cliniche; paura-evitamento e flessione lombare | Convenzione + Contrastata | PMC8477273, PMC8120682 [R] |
| Tendini | HSR ≈ eccentrico (Beyer 2015, 47 persone, Achille); isometrici **non superiori** all'isotonico e analgesia incostante. Per i sani: nessun prehab specifico visto | Moderata + Contrastata | PMC7406028, PMC7496962 [R] |
| Equilibrio, propriocezione | RCT su **riscaldamento e infortuni alla caviglia** in giovani cestiste (PMC6843671, titolo visto, risultato non visto); FIFA 11+: **-33% di infortuni alla caviglia** (rate ratio 0,67) [V]. [N] Negli over 65 l'esercizio riduce le cadute (Cochrane, Sherrington e collaboratori, 2019: ordine di **20-25%** nel tasso di cadute, da verificare) | Moderata (equilibrio negli over 65 e nello sport); nulla visto per l'allenato sano | PMC12371935, PMC6843671 [V]; cadute: Conoscenza del modello (non verificata sul web) [N] |
| Collo, scrivania | L'esercizio di resistenza dà effetti a breve termine sul dolore al collo; esercizi di flessione cranio-cervicale; studio su impiegati | Moderata | PMC10568903, PMC6093121 [R] |

### 1.7 Respirazione, bracing, defaticamento, età, temperatura

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Valsalva e bracing | [N] La manovra di Valsalva alza molto e in modo transitorio la pressione arteriosa durante lo sforzo (studi storici con apnea sui carichi massimali); in sani è considerata accettabile su serie brevi, ma **non** con ipertensione, malattie cardiache, PAR-Q positivo, over 65 non valutati. Il «bracing» (irrigidire il tronco a 360°, non «risucchiare» l'ombelico) è una pratica di coach con basi di biomeccanica | Convenzione | Conoscenza del modello (non verificata sul web) [N]; PAR-Q [R] |
| Defaticamento (cool-down) | [N] Una revisione narrativa (Van Hooren e Peake, Sports Med 2018) non trova un beneficio solido del defaticamento su infortuni, prestazione successiva o dolenzia; resta come scelta soggettiva (calma, ritorno della frequenza cardiaca) | Moderata (da verificare) | Conoscenza del modello (non verificata sul web) [N] |
| Età: serve più tempo? | [N] Negli over 60-65 la pratica è riscaldarsi più a lungo (più rigidità, conduzione nervosa più lenta); nessuna prova diretta vista sulla durata ottimale | Convenzione | Conoscenza del modello (non verificata sul web) [N] |
| Temperatura e ora del giorno | [N] La prestazione di forza è in media un poco più alta nel pomeriggio-sera che al mattino (differenza di pochi punti percentuali), e il riscaldamento attivo alza la temperatura muscolare (ordine di 2-5% di prestazione per grado, Bishop 2003, da verificare). Con freddo ambientale il riscaldamento va allungato e i vestiti tenuti addosso | Moderata (da verificare) | Conoscenza del modello (non verificata sul web) [N] |
| Pausa e re-warm-up | Dopo una pausa lunga tra le serie o durante la seduta il beneficio del riscaldamento svanisce: esiste una scoping review sul re-warm-up. [N] Ordine di **10-20 minuti** per perdere l'effetto | Convenzione | s42978-025-00361-9 [V titolo]; tempi: Conoscenza del modello (non verificata sul web) [N] |

### 1.8 Cosa dicono i coach (verificato poco)

- **Verificato solo in forma indiretta** (riassunti di terzi, **da verificare**): **Nippard** (serie variabili 1-3 con 45-85%, 5-10 minuti totali), **Renaissance Periodization / Dr. Mike Israetel** (12-8-4 poi una serie sui successivi), **Tuchscherer** (percentuali sul carico di lavoro, stop a RPE 7), siti di coach (rampa 3-5 serie, 5-3-1). Nessuna trascrizione letta.
- **Non verificati in questa sessione** (tetto di ricerca): Contreras, Kelly Starrett (livello 3: mobilità «prima di tutto», basi deboli: **Convenzione**), Tom Goom, Barbell Medicine, Nuckols, Helms, McGill (visto solo il programma Big 3 attraverso fonti di livello 3, vedi nota REC). Non attribuisco loro frasi.
- Vedi «Query pronte» (appendice) per ripetere la ricerca.

## 2. Dove le fonti non concordano

| # | Posizione A | Posizione B | Cosa adotta il coach e perché |
|---|---|---|---|
| R1 | **Il riscaldamento previene gli infortuni**: 88% dei coach lo indica come primo obiettivo [V] | **Prove**: solo i programmi multicomponente (FIFA 11+: RR 0,70 [V]) e la forza (Lauersen [V]) mostrano effetto; per un riscaldamento generico le revisioni sono insufficienti [N, da verificare]; i programmi **non supervisionati** non hanno prova [V] | Dire che il riscaldamento **prepara** e migliora le prime serie; **non promettere prevenzione** (RIS-13). Contrastata |
| R2 | **Statico prima** per aumentare il ROM | **Statico ≥60 s toglie 4-7,5%** di forza e potenza [V]; sotto 30 s no [V]; nel riscaldamento completo i deficit si attenuano [V] | Nessuna tenuta statica >30 s prima dei sollevamenti (RIS-05); lo statico lungo solo **dopo** o in giorni dedicati. Solida per la direzione |
| R3 | **Serie «potenzianti» pesanti** (PAPE) come riscaldamento (3 × 90%) | Nessuna differenza in ripetizioni e volume-carico totali (Souza 2024 [V]); vantaggio solo sulla **prima serie** | Niente serie pesanti dedicate: la rampa arriva fino a circa 85-90% **del carico di lavoro**, non oltre. Moderata-debole |
| R4 | **Riscaldamento specifico su ogni esercizio** (Nippard, riassunto [V]) | **Solo sul primo** per muscoli simili (RP, riassunto [V]) | Compromesso: rampa piena sul primo esercizio del gruppo/schema; 0-1 serie sui successivi (§3.4). Convenzione + Contrastata |
| R5 | **Quante serie**: «1-3» (Nippard) / «3-5» (rampa) / 12-8-4 (RP) / «fino a sentire un 7» (RTS) [V, secondarie] | Nessuno studio visto confronta i protocolli | Tabella per intensità relativa (§3.3): più serie quanto più il carico è vicino al massimo. Convenzione |
| R6 | **Pistola da massaggio** «riduce i DOMS» (revisione più vecchia, snippet) | Meta-analisi più recente: **nessun beneficio chiaro** su DOMS e forza [V] | Non proporla come recupero; semmai come comfort, dichiarando che non fa recuperare di più. Contrastata |
| R7 | **PNF migliore** per il ROM | **Statico superiore** a balistico e PNF (Thomas 2018, snippet [V]); altri: comparabili (Behm 2023 [V]) | Non introdurre il PNF (richiede un partner o spazi); se serve ROM: statico 30-60 s. Moderata + Contrastata |
| R8 | **Mobilità prima di tutto** (approcci tipo Starrett, [N] livello 3) | Pesi a tutta ampiezza = stretching per il ROM (Afonso 2021, ES 0,73 [V, R]); «posso?» non è «devo?» [V] | Mobilità **solo se serve** (test caviglia/spalle, dolore, scrivania, età) e **breve**; ampiezza piena con carico come prima scelta. Moderata |
| R9 | **McGill Big 3** come base della schiena | Cochrane 2021: nessun tipo migliore; la paura di flettere è un rischio (PMC8120682) | Opzionale e a basso rischio, senza dire che «cura» (nota REC D1). Contrastata |
| R10 | **Nordic hamstring dimezza** gli infortuni (snippet) | Network meta-analisi: stima favorevole **non significativa** vs altri interventi [V] | Non proporlo come fisso in app generalista; esercizi per femorali in posizione allungata già nel repo (stacco rumeno, leg curl seduto: RIC-03) coprono il lavoro eccentrico. Moderata + Contrastata |
| R11 | **Foam rolling per la mobilità** | Effetti sul ROM brevi, nessun costo, ma niente sulla prestazione [V] | Se lo si propone: 30-60 s per zona prima, opzionale, mai obbligatorio |
| R12 | **Età**: «un over 65 deve riscaldarsi più a lungo» | Nessuna prova diretta vista | +2 minuti generali e una serie di ripresa lenta: costa poco, rischio nullo (Convenzione) |

## 3. Riscaldamento automatico

Proposta di prodotto, **Convenzione** su numero di serie e percentuali (con base **Moderata** per l'uso di serie progressive del 40-90% [R, V]). Tutto sul carico di lavoro del primo set, nessun massimale richiesto. Le serie di riscaldamento **non contano** nei carichi e nelle statistiche (come oggi: `termina-e-cardio.js:110` salva solo quelle fatte; `:156` le azzera al ciclo).

### 3.1 Ingressi (tutti già disponibili nel codice)

| Dato | Da dove |
|---|---|
| W, peso del primo set di lavoro; R, ripetizioni bersaglio | `e.weight`, `e.completedSets[0]` in `seduta.js` |
| Attrezzo: `bilanciere`, `manubri`, `macchine`, `corpo` | `attrezzoDi(nome)` (`js/coach/programma/motore.js:28`) |
| Tipo: `compound` o `isolation`, gruppo | `findExercise(nome).type`, `.group` (`js/dati/libreria-esercizi.js:195`) |
| Schema: `squat`, `hinge`, `spintaO`, `tirataO`, `spintaV`, `tirataV`, `null` | `schemaDi(nome)` (`js/coach/programma/schemi.js:20`) |
| A tempo (plank ecc.) | `isTimeBased(nome)` |
| Età, livello, PAR-Q, fastidi, test caviglia/spalle | `profiloCoach()` (`js/coach/regole-ricerca.js:38`) |
| Intensità stimata | `unoRM(W, R + 2)` (già usata da `controllaRecord`) |

**Intensità relativa:** `I = W / unoRM(W, R + 2)` = `1 / (1 + (R + 2) / 30)` con la formula di Epley (RIR 2 supposto). Valori: R 3 → 0,86; 5 → 0,81; 6 → 0,79; 8 → 0,75; 10 → 0,71; 12 → 0,68; 15 → 0,64; 20 → 0,58. È una stima (errore crescente sopra le 10-12 ripetizioni), usata **solo** per scegliere quante serie; una soglia sbagliata costa una serie in più o in meno.

### 3.2 Classi di esercizio

| Classe | Come si riconosce | Serie base `n` per intensità `I` |
|---|---|---|
| **P** pesante libero | `compound` + `bilanciere` | `I ≥ 0,80` → 4; `0,70 ≤ I < 0,80` → 3; `I < 0,70` → 2 |
| **P-manubri** | `compound` + `manubri` | come P **meno 1** (minimo 1): i manubri hanno carichi per braccio più piccoli e salti più lenti |
| **M** macchina guidata | `compound` + `macchine` (leg press, chest press, lat machine...) | `I ≥ 0,80` → 3; `0,70-0,79` → 2; `< 0,70` → 1 |
| **I** isolamento | `type === 'isolation'` | 1 se è il primo esercizio per quel gruppo **e** `W ≥ 12 kg`; altrimenti 0 |
| **C** corpo libero | `corpo` con `W = 0` | 1 serie leggera di `ceil(R/2)` ripetizioni (minimo 3), una variante più facile se serve; solo sul primo schema del giorno; altrimenti 0 |
| **C zavorrato** | `corpo` con `W > 0` (dip, trazioni zavorrate) | `I ≥ 0,75` → 2 (a: corpo libero `ceil(R/2)`; b: 50-60% di W × 4); altrimenti 1 |
| **T** a tempo | `isTimeBased` | 0 (il riscaldamento generale basta) |

### 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W)

| `n` | Serie (percentuale di W × ripetizioni) | Riposo dopo ogni serie | Note |
|---|---|---|---|
| 4 | 40% × 8, 60% × 5, 75% × 3, **90% × 2** | 45, 60, 90, **120 s** | solo classe P con `I ≥ 0,80` |
| 3 | 50% × 8, 70% × 5, **85% × 3** | 45, 60, 90 s | come il pulsante attuale (50/70/85%) ma 8/5/3 al posto di 10/6/3 |
| 2 | 50% × 8, **80% × 4** | 45, 90 s | coerente con «40% e 80% del carico di lavoro» [R] |
| 1 | **65% × 6** | 60 s | Nippard: ~60% × 6-10 (riassunto [V]) |
| 0 | nessuna | | la prima serie di lavoro parte piano |

Perché non si va oltre il 90% di W: con `I ≈ 0,8` il 90% di W è circa il 72% di 1RM, un carico che non affatica e fa «sentire» il peso; una serie vicina a W sarebbe già una serie di lavoro (Souza 2024: la serie pesante non aggiunge volume totale [V]). Riposi: 1-2 minuti tra le leggere, 2-3 prima della prima serie di lavoro **pesante** (sito di un coach, [V secondario]); qui ridotti perché W è raramente vicino al massimale (Convenzione). Se `I < 0,70` i riposi scendono a 30, 45, 60 s.

### 3.4 Riduzioni («quando saltare»)

| Condizione | Effetto su `n` |
|---|---|
| Un composto precedente della stessa **regione** (alto: petto, schiena, spalle, braccia; basso: gambe, glutei) con ≥ 2 serie di lavoro fatte | −1 (classi P, M) |
| Stesso **gruppo** già caricato con ≥ 2 serie di lavoro nella seduta | −2 (min 0) |
| Stesso **schema** (`schemaDi` uguale, es. squat poi leg press) | massimo 1 serie, o 0 |
| Isolamento sul gruppo già lavorato nella seduta | 0 |
| Isolamento con `W < 12 kg` | 0 |
| Classe T, o serie di back-off, drop set, serie extra | 0 |
| Barra: se il 40-50% di W è sotto il peso del bilanciere (20 kg) la prima serie **è** la barra; con `W ≤ 40 kg` al massimo 2 serie, con `W ≤ 25 kg` 1 serie | tetto |
| Due serie consecutive che arrotondano allo stesso carico, o salto minore del passo (barra: 5 kg) | si toglie la più leggera |
| L'utente tocca «Salta» | sempre possibile; la regola non obbliga |

### 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra)

Si aggiunge **una** serie (massimo 5 per esercizio) se: età ≥ 65 o PAR-Q positivo; età 50-64 con `I ≥ 0,75`; freddo (<10 °C) o ora < 9:00 con `I ≥ 0,70`; **fastidio nella zona** (BIO-06 / dolore recente): in questo caso il tetto della rampa scende a **80% di W**; principiante sul primo composto di ogni schema; rientro dopo ≥ 21 giorni di pausa (CAR-04). Convenzione, rischio nullo.

### 3.6 Arrotondamento e tetto di tempo

Passo del carico: **bilanciere 2,5 kg** (come `addWarmup` oggi), **manubri 2 kg**, **macchine 5 kg** (2,5 kg se `W < 30`); mai sotto la barra. Tetto totale della rampa per seduta, secondo i minuti dichiarati (`d.minutes`): **≤45 min → 5 min; 46-75 → 8 min; >75 → 10 min**; si taglia dagli ultimi esercizi, mai dal primo di ogni regione.

### 3.7 Riscaldamento generale (minuti)

`G = min(8, max(3, 4 + età + freddo + ora + pesante + rientro))`, con: età **<40: 0; 40-59: +1; ≥60: +2**; freddo **<10 °C: +2; 10-15 °C: +1; ≥28 °C: −1**; ora **< 9:00: +1**; pesante **+1** se il primo composto ha `I ≥ 0,80`; rientro **+1** dopo ≥ 21 giorni di stop; zona dolente **+1**. Esempi: 28 anni, palestra a 20 °C, ore 18, ipertrofia → **4 min**; 52 anni, garage a 8 °C, ore 7:30, squat pesante → 4+1+2+1+1 = 9 → **8 min** (tetto); over 65, 20 °C, ore 10, seduta leggera → **6 min**.

Cosa fare: 3-8 minuti di movimento a bassa intensità (cyclette, vogatore, camminata veloce; a casa marcia sul posto, jumping jack, corda) a **RPE 3-4 su 10**: il respiro sale, si riesce a parlare, si sente un po' di calore; poi 2-3 movimenti dinamici dello schema del giorno (§3.8). Con freddo: tenere addosso uno strato. Se si è arrivati camminando o in bici per ≥ 10 minuti e fa caldo, bastano 2 minuti: scelta dell'utente. Basi: la temperatura muscolare e il movimento specifico aiutano la prestazione [V parziale, N]; i minuti sono un parametro del coach (Convenzione).

### 3.8 Movimenti di preparazione per schema (1-2 minuti, 2-3 esercizi; Convenzione)

| Schema | Con attrezzi | A corpo libero |
|---|---|---|
| squat | ginocchio al muro 2 × 8 per lato (se test caviglia «Non tocca»), goblet squat leggero × 5 con pausa in basso | squat a corpo libero con pausa 2-3 s × 6-8 (appoggiandosi a un palo) |
| hinge | ponte glutei × 10 (tenuta 2 s), hip hinge col bastone × 8 | good morning a corpo libero × 8, ponte × 10 |
| spintaO | pull-apart con elastico × 15, piegamento scapolare × 8-10 | piegamenti lenti inclinati × 5-8, «Y-T» a terra × 6 |
| spintaV | estensione toracica sulla panca × 6-8, wall slide × 8-10 | wall slide, braccia sopra la testa controllate × 3 per verso |
| tirataO | pull-apart × 15, retrazioni scapolari × 8-10, gatto-cammello × 6 | gatto-cammello, retrazioni scapolari con le mani in alto |
| tirataV | sospensione attiva (scapole in basso) 2 × 10-15 s, scap pull-up × 6-8 | sospensione da una porta/barra |

Solo il **movimento specifico** ha una prova (pilota, n piccolo: conserva la forza meglio di una mobilità generale di pari durata, PMID 41384426 [R]).

### 3.9 Costo in tempo

Tempo di una rampa: `T = Σ (ripetizioni × 3 s) + Σ riposi` (il cambio dei dischi sta dentro al riposo). Con le tabelle sopra, calcolato con uno script di verifica:

| Serie `n` | Ripetizioni | Riposi | Totale |
|---|---|---|---|
| 1 | 6 | 60 s | **circa 1,3 min** |
| 2 | 12 | 135 s | **circa 2,9 min** |
| 3 | 16 | 195 s | **circa 4,1 min** |
| 4 | 18 | 315 s | **circa 6,2 min** |

Stima di sessione (calcolata a mano con le regole di §3.4): **superiore** (panca 60 × 8 → 4,1; rematore con bilanciere dopo la panca → 2,9; lento avanti manubri → 1,3; lat machine, curl → 0) circa **8,3 min** di rampa; **inferiore** (squat 100 × 5 → 6,2; leg press dopo lo squat → 0; stacco rumeno → 2,9; leg curl, polpacci → 0) circa **9,1 min**. A questi si sommano **3-8 min** di riscaldamento generale: **totale 11-17 minuti** per una seduta completa, contro la base fissa di **8 min** di `minutiDi` (`ricette.js:337`: `8 + Σ sets × (35 + rest) / 60`). Il pulsante manuale attuale non è contato. Proposta: `base = G + Σ T_rampa` (RIS-12), con il tetto del §3.6, altrimenti una seduta da 45 minuti dichiarati si riempie di riscaldamento.

### 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere)

| Esercizio | I | n | Serie (kg × ripetizioni) |
|---|---|---|---|
| Squat 100 kg × 5 | 0,81 | 4 | 40×8, 60×5, 75×3, 90×2 |
| Panca 60 × 8 | 0,75 | 3 | 30×8, 42,5×5, 50×3 |
| Stacco 120 × 6 | 0,79 | 3 | 60×8, 85×5, 102,5×3 |
| Lento avanti col bilanciere 30 × 8 | 0,75 | 2 (tetto barra) | 20×8, 25×4 |
| Leg press 160 × 12 | 0,68 | 1 (0 dopo lo squat) | 105×6 |
| Curl con manubri 10 × 12 | 0,68 | 0 (isolamento sotto 12 kg) | nessuna |
| Squat principiante 40 × 10 | 0,71 | 2 | 20×8, 32,5×4 |

## 4. Blocchi di mobilità

Otto routine di **3-6 minuti**. Il blocco **sostituisce** i movimenti di preparazione dello schema (§3.8), non si somma al riscaldamento generale. Tutti **opzionali**, spiegano a cosa servono e quando smettere. Prima del sollevamento: movimento attivo e tenute **≤30 s** (sotto la soglia del deficit di forza [V]); lo statico più lungo, se si vuole, **dopo** la seduta o in un altro momento. Forza dell'insieme: **Convenzione** (il ROM migliora con stretching e con pesi a tutta ampiezza [V]; nessuna prova di prevenzione degli infortuni).

| Blocco | Quando lo propone il coach | Esercizi e dosaggio | Senza attrezzi |
|---|---|---|---|
| **M1 Caviglia e anca per lo squat** (4-5 min) | schema `squat` nel programma; test caviglia «Non tocca»; fastidio alle ginocchia; età ≥ 50 | ginocchio al muro 2 × 8 per lato (tenuta 2 s, tallone a terra); squat profondo con appoggio, tenuta 20-30 s × 2; 90/90 dell'anca × 6 per lato; affondo basso con glutei contratti 20-30 s per lato | tutto a corpo libero, palo o sedia per appoggio |
| **M2 Spalle e dorso per spinte sopra la testa e panca** (4-5 min) | schema `spintaV`; test spalle «No»; fastidio alle spalle; lavoro seduto ≥ 6 h | estensione toracica su foam o bordo panca × 8 (2 s); «open book» a terra × 6 per lato; wall slide × 8-10; pull-apart con elastico × 15; rotazione esterna leggera × 10-12 per lato (facoltativa) | open book, wall slide, «Y-T» a terra × 6 |
| **M3 Anca e catena posteriore per stacco e hinge** (3-4 min) | schema `hinge`; fastidio alla schiena bassa (con M4); lavoro seduto | gatto-cammello × 8; ponte glutei 2 × 10 (tenuta 2 s); hip hinge col bastone × 8; oscillazioni della gamba × 10 per lato; bird dog × 5 per lato (tenuta 5 s) | ponte glutei, hip hinge senza bastone, bird dog |
| **M4 Schiena bassa e core (McGill)** (4-5 min) | fastidio alla schiena (BIO-06 già esiste) | curl-up, plank laterale, bird dog, **tenute 8-6-4 s** (1-2 giri): come **riscaldamento facoltativo**, non come cura (nota REC D1) | identici |
| **M5 Polso, gomito, avambraccio** (3 min) | panca, piegamenti, front squat, curl; fastidio al polso; lavoro con tastiera | cerchi del polso × 10 per verso; flessione/estensione del polso × 12-15 (a mani vuote o peso minimo); preghiera e preghiera inversa 20 s; apertura delle dita con elastico × 15 | tutto a mani vuote |
| **M6 Collo e dorso per chi sta seduto** (3-5 min; versione «spuntino» di 1 min ogni 45-60 min) | profilo con lavoro seduto ≥ 6 h; fastidio al collo | chin tuck × 10 (tenuta 2-3 s); retrazioni scapolari × 12; stretching del petto allo stipite 2 × 20-30 s; estensione toracica sulla sedia × 8; 1-2 min di camminata | identici (sedia, stipite) |
| **M7 Equilibrio e piedi** (5 min, a fine seduta) | età ≥ 65 (già PRG-37), età ≥ 50 su scelta | stare su un piede 3 × 20-30 s per lato vicino a un appoggio; camminata tallone-punta 2 × 10 passi; alzate sulle punte × 10-15; sedia-in-piedi × 8-10; step-up basso × 6-8 | identici |
| **M8 Ginocchio e anca laterale** (3 min) | fastidio lieve alle ginocchia (da integrare con REC-04) | alza-punte (tibiale) × 15; step-down lento (discesa 3 s) × 6-8 per lato; camminata laterale con elastico × 10 passi | step-down da un gradino, camminata laterale senza elastico |

**Per chi vuole più ROM** (separato dalla seduta): 2-3 volte a settimana, 2-3 tenute di 30-60 s per muscolo, circa 5-10 minuti a settimana per muscolo [N, da verificare; Afonso 2021 e il consenso Delphi (titoli [V]) dicono che i pesi a tutta ampiezza fanno lo stesso]. Non promettere ipertrofia dallo stretching (le prove sono piccole e con dosi poco realistiche: 30 min-2 h al giorno [V]).

**Come propone il coach:** (1) in base al programma: `schemaDi` presente → M1, M2, M3 (una sola per seduta, la più pertinente al primo esercizio; le altre sono suggerite come «preparazione» dentro §3.8); (2) in base ai fastidi (`fastidi` del profilo, ZONE_DOLORE): spalle → M2, schiena → M4, ginocchia → M1 e M8, polso/collo (zone da aggiungere, REC-03) → M5, M6; (3) in base alle prove: caviglia «Non tocca» → M1; spalle «No» → M2; ripetere la prova dopo 4 settimane (RIS-07); (4) in base alla scrivania: nuova domanda di profilo (RIS-10) → M6; (5) in base all'età: ≥ 65 → M7 e riscaldamento più lungo.

## 5. Prehab per sicurezza

| Intervento | Ha prove? | Prescrizione minima proposta | Cosa NON dire |
|---|---|---|---|
| **Forza progressiva** (il programma stesso) | **Sì**, la più forte: Lauersen 2014/2018 [V titoli], dose-risposta; adesione e supervisione contano [V] | Nessuna aggiunta: seguire il programma e aumentare gradualmente (aumenti già dimezzati per cauti, CAR-06) | «Con questa scheda non ti infortuni» |
| **Programma multicomponente** (tipo FIFA 11+: corsa, forza, pliometria, equilibrio, 20 min) | **Sì in sport di squadra** (RR 0,70 [V]); per un frequentatore di palestra è estrapolazione | Solo se l'utente dichiara uno sport di squadra (campo oggi assente): 2-3 volte a settimana come riscaldamento [N, da verificare] | «Riduce gli infortuni del 30%» (dato da calcio, non da palestra) |
| **Nordic hamstring** | Moderata + Contrastata (R10) | Non fisso; stacco rumeno e leg curl seduto (RIC-03) coprono la parte eccentrica | «Previene gli strappi» |
| **Rotazione esterna, face pull, Y-T-W** | Terapia sì [R]; **prevenzione negli allenati: nessuna prova vista** [N] | 1-2 volte a settimana 2 × 12-15 leggeri, dentro il volume delle tirate (ABB-04 già c'è) | «Proteggono la cuffia» |
| **Attivazione dei glutei** | Debole: la serie «potenziante» non aiuta [V]; [N] mito che i glutei «dormano» | Ponte glutei × 10 dentro §3.8 come ripetizione del movimento | «Se non li attivi fai male alla schiena» |
| **Dorsiflessione di caviglia** | Nessuna prova di prevenzione vista; il ROM migliora con lavoro mirato [N] | M1 (2 × 8 per lato); talloni rialzati sono una scelta valida, non una colpa | «Hai la caviglia rigida: rischi il ginocchio» |
| **Mobilità toracica** | Debole [N] | M2 | «Previene il dolore di spalla» |
| **VMO** | Mito [N] | M8 (anca + ginocchio insieme, consenso 2018 [R]) | «Rinforza il vasto mediale» |
| **McGill Big 3, bracing** | Convenzione + Contrastata [R] | M4 facoltativo, tenute 8-6-4 | «Cura il mal di schiena», «mai flettere la schiena» |
| **Tendini** | HSR ≈ eccentrico; isometrici non superiori [R]; per i sani nessun prehab specifico visto | Aumentare i carichi gradualmente, lavoro lento e progressivo | «L'isometrico toglie il dolore» |
| **Equilibrio e propriocezione** | **Sì** per caviglia nello sport (RR 0,67 [V]) e, [N], per le cadute negli over 65 | M7: 5 minuti 2-3 volte a settimana per over 65 (PRG-37 già dice 5 min) | «Evita le cadute» (dire «può aiutare») |
| **Respirazione** | Convenzione + salute: nessuna apnea per cauti [R] | REC-06 della nota REC | — |
| **Screening di mobilità (FMS e simili)** | [N] valore predittivo sugli infortuni debole; le tre prove del repo servono a scegliere gli esercizi, **non** a stimare il rischio | Mantenerle come aiuto alla scelta; dire che «Non tocca» non è un difetto | «Il test dice che sei a rischio» |
| **Foam rolling / pistola da massaggio** | ROM breve, nessun costo, DOMS poco [V] | Opzionale 30-60 s per zona prima, o dopo | «Fa recuperare più in fretta» |
| **Defaticamento e stretching dopo** | Nessun beneficio solido su recupero e dolenzia [N, da verificare] | 2-3 minuti di camminata, a scelta; nessun obbligo | «Fai stretching per non avere dolori» |

**Regola generale (Convenzione + salute):** il coach **informa** e propone, non diagnostica; ogni routine ha un'uscita («se il dolore sale oltre 3/10 o compare formicolio, fermati e parlane con un medico»), come nel cap. 14 e nella nota REC §5.4.

## 6. Audit delle regole esistenti

Esiti: **Giusto**, **Prudente**, **Non supportato**, **Mancante**, **Da rivedere**.

| Regola o funzione | Cosa fa oggi | Confronto con le fonti | Esito |
|---|---|---|---|
| **`addWarmup`** (`js/ui/allenamento/seduta.js:63-72`) | Fino a 3 serie manuali: 50/70/85% di `e.weight` × 10/6/3, arrotondato a 2,5 kg; max 3; senza timer di riposo; le righe «R» non contano nei carichi | Le percentuali sono dentro 40-90% [R, V]; l'assenza di fatica è inferita dai carichi leggeri | **Giusto** nelle percentuali; **Da rivedere**: (a) stesse serie per ogni esercizio, (b) base `e.weight` e non il primo set reale se l'utente lo cambia, (c) arrotondamento a 2,5 kg anche per macchine e manubri e **sotto il peso della barra**, (d) con `W = 0` (corpo libero) crea righe da 0 kg, (e) nessun riposo suggerito, (f) tetto 3 (non permette il «set 0»), (g) il pulsante resta disabilitato dopo 3 |
| **Riscaldamento generale** | Non esiste | Il riscaldamento attivo e specifico migliora la prestazione [V, R] | **Mancante** (RIS-03) |
| **Riscaldamento per classe e per ordine di esercizio** | Non esiste: nessuna riduzione sui successivi | RP/Nippard divergono [V]; è una Convenzione | **Mancante** (RIS-01, RIS-02) |
| **`minutiDi`** (`js/coach/programma/ricette.js:337`) | `8 + Σ sets × (35 + rest) / 60`: 8 minuti fissi per tutto (riscaldamento, spostamenti, dischi) | Un riscaldamento reale costa 11-17 minuti (§3.9); 8 è una costante, non una stima | **Non supportato** come costante; **Da rivedere** (RIS-12) |
| **BIO-01 `cueEsercizio`** | «talloni su due dischi sottili» con caviglia rigida | Valido (talloni rialzati, ROM) [N] | **Giusto** (**Mancante**: link a M1 e nuova prova) |
| **BIO-04 prove** (`TEST_FAI_DA_TE`, `biomeccanica.js:54`) | Caviglia 12 cm, spalle (braccia al muro), larghezza squat | Screening: valore predittivo debole [N]; uso come aiuto alla scelta, accettabile | **Prudente** (**Mancante**: nuova prova dopo il blocco, RIS-07; messaggio «non è un difetto») |
| **BIO-05 `bonusBiomecc`** | Caviglia rigida: squat guidati +2, bilanciere −2; spalle «No»: military/lento/Arnold −3, landmine +3 | Nessuna prova diretta che l'overhead sia pericoloso con ROM limitato [R] | **Convenzione**, rischio basso; evitare tono di divieto |
| **BIO-06 `SCALE_DOLORE.schiena`** | «riscaldamento McGill (curl-up, plank laterale, bird dog), tenute 8-6-4 s» | Convenzione + Contrastata (R9) | **Convenzione**; **Da rivedere** il testo (non è una cura) |
| **PRG-37 / `agente-consigli.js:36`** | Over 65: «5 minuti di equilibrio a fine seduta (stare su un piede, camminare sulla linea)» | Equilibrio negli over 65: moderata [N]; FIFA 11+ include equilibrio [V] | **Giusto**; **Mancante**: esercizi e dosi (M7) e un riscaldamento più lungo |
| **PRG-19 over 65 / «cauto»** | Max 3 serie, 8-12 ripetizioni, niente cedimento | Coerente | **Giusto**; **Mancante**: +2 min di riscaldamento generale e «set 0» lento |
| **Stretching** | Nessuno prima della seduta | Statico ≥60 s toglie 4-7,5% [V] | **Giusto** (guardrail RIS-05) |
| **Defaticamento** | Nessuno | Nessun beneficio solido [N] | **Giusto** |
| **Lavoro seduto / scrivania** | Nessun campo nel profilo (verificato con grep su `js/ui/onboarding*.js` e `js/coach/*.js`) | Esercizio per il collo con effetto breve [R] | **Mancante** (RIS-10) |
| **Zone** (onboarding: spalle, ginocchia, schiena) | Il riscaldamento non sa nulla delle zone dolenti | Vedi REC-03/04 della nota REC | **Mancante** (RIS-09) |

## 7. Regole proposte

Codice di area **RIS**. Ogni regola va aggiunta come riga `- **RIS-NN** ...` in `docs/coach-mappa-regole.md` (cap. 19 o un nuovo capitolo), a `REGOLE_SPEGNIBILI` in `js/coach/parametri.js` (con i valori in `COACH_PARAMETRI`: soglie di `I`, tabella di §3.3, passi del carico, tetti di minuti), con il motivo nelle tre lingue (`js/lingue/en|es|de.js`) e un test in `tests/browser/regole-nuove.js`. **File nuovo** (consigliato: `js/coach/riscaldamento.js` con la funzione pura `pianoRiscaldamento(ex, ctx)` e `js/dati/blocchi-mobilita.js` per i testi): riga in `index.html` al posto giusto + `npm run sw` + alzare `CACHE_NAME`. Le salvaguardie esistenti (prudente, over 65, principianti, dolore, scarico) hanno **sempre la precedenza**; agiscono solo con `coachAttivo()`. **RIS-01 assorbe REC-10** della nota REC (non implementarle due volte).

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **RIS-01** rampa automatica | Seduta aperta, esercizio con `W > 0` (non a tempo) | Precompila `e.riscaldamento` con la tabella §3.3 secondo classe e intensità (non fatte, non contano); il pulsante «+ Risc.» chiede la stessa rampa invece di 50/70/85 fissi; tetto a 4 (5 con il «set 0») | «Prima della prima serie fai {n} serie leggere ({kg} × {rip}): ti servono per sentire il movimento, non ti stancano.» | Moderata (percentuali [R, V]); numero di serie Convenzione | Basso: serie leggere; arrotondamenti; spegnibile; mai oltre 90% di W | `seduta.js` (`addWarmup`), nuovo `riscaldamento.js` (`pianoRiscaldamento`), `parametri.js` |
| **RIS-02** riduzione sui successivi | Esercizio dello stesso gruppo, schema o regione già fatto nella seduta (§3.4) | Scende `n` di 1-2 (0 per isolamenti sullo stesso gruppo) | «Il muscolo è già caldo dall'esercizio di prima: qui ti basta {n}.» | Convenzione (RP vs Nippard divergono) | Nullo; l'utente può sempre aggiungere con «+ Risc.» | `riscaldamento.js` (`ridu`) |
| **RIS-03** riscaldamento generale | Avvio seduta | Mostra una scheda con `G` minuti (§3.7) e cosa fare a RPE 3-4; saltabile; senza dati di temperatura usa il valore normale | «Prima di sollevare: {G} minuti di movimento leggero. Quando senti un po' di calore sei pronto.» | Moderata sull'effetto del riscaldamento attivo; i minuti sono Convenzione | Nullo; con freddo/età solo più tempo | `js/ui/allenamento/sessione.js` (avvio seduta, individuare con `npm run -s trova`), Opzioni (domanda «fa freddo dove ti alleni?») |
| **RIS-04** movimenti per schema | Primo esercizio di ogni schema con `schemaDi ≠ null` | Mostra 2-3 movimenti di §3.8 (con e senza attrezzi) sotto l'esercizio | «Per questo movimento scalda così: {drill}. È la parte più utile del riscaldamento.» | Moderata-debole (pilota PMID 41384426 [R]); drill Convenzione | Nullo | `riscaldamento.js`, `biomeccanica.js` (`cueEsercizio`), `js/dati/blocchi-mobilita.js` |
| **RIS-05** niente statico lungo prima | Sempre, prima dei sollevamenti | Il coach non propone tenute statiche >30 s prima della seduta; nei blocchi pre-seduta tenute ≤30 s; lo statico lungo compare solo come opzione dopo o in giorni dedicati | «Prima di sollevare niente stiramenti lunghi: oltre 60 secondi tolgono un po' di forza. Meglio muoverti.» | **Solida** (direzione) | Nullo | testi in `blocchi-mobilita.js`, `biomeccanica.js` |
| **RIS-06** blocchi di mobilità | Triggers di §4 (programma, fastidi, prove, scrivania, età) | Propone un solo blocco (M1-M8) di 3-6 min **al posto** dei movimenti di §3.8; opzionale; conta nei minuti | «{Blocco}: {durata} per {scopo}. Se non ti serve, salta.» | Convenzione (ROM migliora [V], prevenzione non provata) | Basso; uscita per dolore ≥ 4/10 o formicolio (cap. 14) | `blocchi-mobilita.js`, `sessione.js`, `ricette.js` (tempo) |
| **RIS-07** nuova prova | Dopo 4 settimane da M1 o M2 | Rifà il test caviglia/spalle; «Tocca/Sì» → smette di proporre il blocco | «Sono passate 4 settimane: rifacciamo la prova? Se ci riesci togliamo il blocco.» | Convenzione | Nullo | `biomeccanica.js` (`TEST_FAI_DA_TE`, `setTest`), Opzioni |
| **RIS-08** over 50 e over 65 | `eta ≥ 50` (+1 min), `eta ≥ 65` o PAR-Q positivo (+2 min, «set 0» lento 30-40% × 10 con discesa in 3 s) | Allunga il riscaldamento generale e aggiunge M7 a fine seduta (già PRG-37) | «Con l'età le articolazioni hanno bisogno di più tempo: scaldiamo un po' di più e chiudiamo con 5 minuti di equilibrio.» | Convenzione ([N], nessuna prova diretta) | Nullo; **precedenza** alla modalità prudente | `riscaldamento.js`, `agente-consigli.js:36`, `blocchi-mobilita.js` (M7) |
| **RIS-09** zona con fastidio | Fastidio dichiarato (`fastidi`) o dolore del dopo-seduta (DEC-01..04) sulla zona dell'esercizio | +1 serie leggera, tetto rampa 80% di W, propone il blocco della zona (M2/M4/M5/M8); mai «cura» | «Hai segnalato [zona]: scaldo di più e tengo il carico leggero. Non sostituisce il parere di un medico.» | Convenzione; la prudenza ha precedenza | Più prudente di oggi | `riscaldamento.js`, `questionario-decisioni.js` (`ZONE_DOLORE`), `biomeccanica.js` (`SCALE_DOLORE`) |
| **RIS-10** scrivania e spuntini | Nuova domanda di profilo «Stai seduto ≥ 6 ore al giorno?» | Propone M6 (1 min ogni 45-60 min come promemoria testuale; non push) e M2/M3 come blocco di seduta | «Dopo ore di scrivania, 1 minuto di movimento ogni tanto aiuta collo e schiena.» | Moderata-debole (esercizio per collo [R]; riscaldamento per lavoratori: titolo visto) | Basso | `js/ui/onboarding.js` (domanda), `js/ui/oggi.js` (scheda), `blocchi-mobilita.js` |
| **RIS-11** defaticamento | Fine seduta | Testo opzionale «2-3 minuti di camminata se ti va»; nessuno stretching come promessa anti-dolenzia | «Camminare un po' a fine seduta va bene se ti piace; non serve per recuperare di più né per evitare la dolenzia.» | Moderata (da verificare, [N]) | Nullo | `termina-e-cardio.js` (messaggio di fine seduta), `prontezza.js` (testo DOMS) |
| **RIS-12** tempo del riscaldamento | `minutiDi` | `base = G + Σ T_rampa` (tetto §3.6) al posto di `8` | «Il riscaldamento è nel conto: la seduta resta nei {d.minutes} minuti.» | Convenzione | Evitare sedute troppo lunghe; la rampa si taglia per prima sugli ultimi esercizi | `ricette.js:337` (`minutiDi`) |
| **RIS-13** linguaggio prudente | Tutti i testi su riscaldamento, mobilità e prehab | Divieto di frasi «previene gli infortuni», «cura», «sblocca»; si usa «prepara», «può aiutare», «a molte persone serve» | (regola di scrittura, non mostrata) | Moderata (R1: programmi non supervisionati senza prova [V]; prevenzione da riscaldamento generico non provata) | Evita promesse non provate | `blocchi-mobilita.js`, `biomeccanica.js`, `js/lingue/*` |

**Correzioni di testo e dettagli, senza regola nuova:** (a) `addWarmup`: non creare righe con `W = 0`; (b) la barra come minimo; (c) arrotondamento per attrezzo; (d) togliere il tetto fisso di 3 serie o alzarlo a 5; (e) BIO-06: scrivere che il riscaldamento McGill non è un trattamento (nota REC); (f) BIO-04: aggiungere «non è un difetto, ti aiuta a scegliere».

## 8. Domande aperte

**Decisioni di prodotto:**
- La rampa si precompila da sola all'avvio (più rapido) o solo al tocco di «+ Risc.» (meno invasivo)? Quante righe in più su un telefono: massimo 5 per esercizio.
- Chiedere la temperatura: una domanda «fa freddo dove ti alleni?» in Opzioni è sufficiente? (Le API meteo non sono nell'app.)
- Il «set 0» per età/freddo/zona dolente aggiunge tempo: tenere il tetto di §3.6?
- Una serie di ripresa dopo >20 minuti di pausa (re-warm-up): serve il dato dell'ora delle serie, oggi non salvato. Vale la pena?
- Spegnere RIS-01 per chi ha già preferenze (es. utenti avanzati con ritmo proprio)? Opzione «non suggerire riscaldamento».
- I blocchi M1-M8 come scheda a parte («Prima di iniziare») o dentro l'esercizio?

**Da verificare (non fatto per il tetto di ricerca):** vedi appendice. In particolare: numeri di Fradkin 2010 e McCrary 2015; Lauersen 2014 (n e RR) e 2018; contenuto delle meta-analisi su foam rolling e ROM; dose ottimale di stretching per il ROM; evidenza sulla dorsiflessione di caviglia e la profondità dello squat; Cochrane 2019 sulle cadute; Van Hooren e Peake 2018 sul defaticamento; Herbert 2011 sulla dolenzia; ora del giorno e temperatura; riscaldamento negli over 65; posizioni dirette di Contreras, Starrett, Goom, Barbell Medicine, Nuckols, Helms, McGill e Israetel (trascrizioni).

## 9. Limiti onesti

- **Copertura**: 23 ricerche web riuscite; **le sezioni su prehab per zona, respirazione, defaticamento, età, temperatura, coach e tutta la parte «cosa dicono» di FMS/glutei/VMO sono in gran parte conoscenza del modello** e sono marcate così. Non usarle come prova.
- **Solo WebSearch**: ogni dato è un riassunto di snippet; nomi di autori, n e popolazioni spesso mancano. Per Lauersen, Fradkin, McCrary e Cheatham ho visto **solo titolo e anno**, non i numeri; le cifre «30-70%» e «fino al 51%» vengono da riassunti secondari.
- **Studi su giovani maschi allenati o su calciatori**: FIFA 11+ e Nordic sono in sport di squadra; Souza 2024 ha n=14; lo studio sul riscaldamento specifico ha 40 uomini giovani. L'estensione a donne, over 50 e principianti è una scelta di prudenza.
- **Fonti secondarie e conflitti di interessi**: Nippard, RP, RTS vendono programmi o app; li ho visti solo tramite riassunti di terzi. Starrett è livello 3.
- **Parametri del coach** (soglie di `I`, tabella §3.3, minuti `G`, tetti): **Convenzione**, costruiti per costare poco e non avere controindicazioni; non sono esiti di studi.
- **Verifica numerica**: gli esempi di §3.10 e i tempi di §3.9 sono calcolati con uno script di prova (non codice dell'app) e a mano per le sedute intere.
- **Nessun cambio di codice**: questa nota non tocca `js/`, `css/`, `index.html`, `sw.js`, `tests/`.

## Appendice: query pronte (da ripetere con il tetto di ricerca alzato)

Per gli studi usare `allowed_domains ["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","link.springer.com"]`; per i video `["youtube.com"]` e dire «riportato da <persona> (video), da verificare».

1. `Fradkin 2010 effects of warming-up on physical performance systematic review meta-analysis` (numeri e n).
2. `McCrary 2015 upper body warm-up performance injury systematic review` (risultati).
3. `Lauersen 2014 effectiveness of exercise interventions to prevent sports injuries RR strength training` (RR e n); `Lauersen 2018 strength training superior dose-dependent prevention`.
4. `generic warm-up injury prevention randomised trials insufficient evidence` (Fradkin 2006, conclusione).
5. `static stretching before exercise injury risk muscle strains systematic review` (conclusioni delle tre revisioni viste).
6. `warm-up sets resistance training repetitions performance first set fatigue randomized` e `ramp-up warm-up number of sets 1RM bench press squat trained`.
7. `re-warm-up resistance training between sets performance` (contenuto della scoping review).
8. `warm-up older adults resistance training duration muscle temperature` e `warm-up cold environment performance muscle temperature`.
9. `time of day resistance training performance morning evening Chtourou` e `Bishop warm-up muscle temperature performance 2-5% per degree`.
10. `warm-up passive heating versus active warm-up strength performance`.
11. `foam rolling range of motion acute meta-analysis` (effect sizes); `foam rolling DOMS meta-analysis Cheatham results`.
12. `massage gun DOMS recovery meta-analysis 2025` (confermare il contrasto R6).
13. `stretching ROM dose-response meta-analysis minutes per week` e `Delphi consensus stretching Behm 2025 recommendations`.
14. `post-exercise stretching DOMS Cochrane Herbert` e `cool-down review Van Hooren Peake 2018`.
15. `ankle dorsiflexion range of motion squat depth heel elevated squat study`.
16. `thoracic spine mobility overhead press shoulder pain exercise`.
17. `rotator cuff external rotation exercise injury prevention overhead athletes meta-analysis` e `face pull Y-T-W scapular exercises injury prevention`.
18. `glute activation warm-up squat performance meta-analysis` e `glute activation myth Contreras`.
19. `vastus medialis oblique selective activation exercise myth` e `patellofemoral pain hip strengthening knee exercise`.
20. `McGill big 3 curl-up side bridge bird dog trial low back pain` e `lumbar flexion lifting injury risk evidence`.
21. `abdominal bracing versus hollowing intra-abdominal pressure lifting` e `Valsalva blood pressure resistance exercise safety hypertension`.
22. `Functional Movement Screen predictive validity injury meta-analysis`.
23. `balance training falls older adults Cochrane 2019 Sherrington` e `FIFA 11+ ankle injuries adherence`.
24. `warm-up routine workers musculoskeletal disorders systematic review results` e `mobility snacks desk workers exercise breaks neck pain`.
25. `Nordic hamstring injury prevention recreational lifters evidence` e `heavy slow resistance prevention healthy tendons`.
26. Coach: `Bret Contreras warm-up glute activation`; `Kelly Starrett mobility criticism evidence`; `Tom Goom warm-up injury prevention running physio`; `Barbell Medicine warm-up sets`; `Greg Nuckols warm-up sets stronger by science`; `Eric Helms warm-up sets`; `Stuart McGill warm-up spine`; `Mike Israetel warm-up 12-8-4 video` (con `allowed_domains ["youtube.com"]`).
