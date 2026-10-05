# Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati

**Copertura: 16 ricerche web riuscite; il resto da conoscenza del modello** (il tetto di 200 ricerche della sessione, condiviso con gli altri sotto-agenti, si è esaurito dopo la sedicesima; il piano era di oltre 35). Data: 2026-10-05.

Ambito: come il coach di 3in dovrebbe gestire i muscoli su cui l'utente vuole puntare, quelli che restano indietro e quelli che nessun programma allena abbastanza (deltoidi posteriori, polpacci, addome, avambracci, glutei, adduttori, trapezi, collo). Tocca le regole PRG-23, PRG-25..30, PRG-29 (priorità), ABB-03, ABB-10, RIC-01, CIC-02, il giorno «punti deboli» e il modello dei muscoli (`MUSCOLI`, `DETTAGLI`). Le regole nuove hanno il prefisso **SPE-**. Nessun codice dell'app è stato toccato.

**Come si leggono le etichette** (sono la parte più importante di questa nota):
- **[V]** = *visto* nei risultati di WebSearch in questa sessione: titolo, URL, a volte il numero (PMID / PMC) e un riassunto scritto da un modello. Non ho potuto aprire nessun articolo (rete: `references/rete.md`). I numeri [V] sono quelli del riassunto, copiati come compaiono.
- **[M]** = **Conoscenza del modello (non verificata sul web)**. Autori, anni e ordini di grandezza sono quelli che ricordo con ragionevole sicurezza; dove non lo sono, non ho scritto autore né anno. Nessun PMID o DOI è inventato: i PMID/PMC sotto sono solo quelli letti nei link dei risultati. Una riga [M] ha forza al massimo **Moderata (da verificare)**, di solito **Convenzione**.
- Forza: **Solida / Moderata / Convenzione**, più la bandiera **Contrastata** (come in `docs/ricerca-struttura-e-intensita.md`). «Solida» compare solo nella forma «secondo il repo», per la dose-risposta del volume (meta-analisi già citate nel repo, **non riverificate qui**): nessuna riga [M] è Solida.
- Le **cifre di serie per muscolo** della sezione 3 sono **stime di lavoro** (euristiche dei coach + studi visti sul tipo di esercizio), non esiti di studi: i «landmark» di Israetel (MV, MEV, MAV, MRV) sono euristiche anche per l'autore (`references/fonti.md`).

---

## 1. Cosa dicono le fonti

### 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Specializzazione secondo Renaissance Periodization | Si indicano 1-2 muscoli prioritari: il loro volume sale verso la fascia alta (MRV) invece di fermarsi al MAV; non più di due prioritari; si danno al muscolo 3-4 sedute a settimana per poter salire. Gli altri restano entro i loro limiti di volume (il riassunto non dà le serie di mantenimento) | Convenzione | [V] siti terzi su RP (bodyspec.com, pagina alibaba, pdf RP): livello 3, riassunto del risultato; da verificare su testo RP |
| Volume tipico secondo Henselmans | 10-15 serie per muscolo a settimana come regola generale; in interviste ha indicato 10-30 per la maggior parte delle persone, con alcuni che vanno oltre; meglio distribuire il volume nella settimana; regola pratica: non più di 6 serie per muscolo per seduta; la misura migliore del volume è il numero di serie di lavoro per muscolo a settimana | Convenzione (livello 2; studi sottostanti non visti) | [V] riassunto di pagine di mennohenselmans.com (titoli visti: «How to count training volume and design a sensible training split», «What's the upper limit of training volume», «16 vs. 24 vs. 32 sets per muscle per week: which is better?») |
| Muscolo in ritardo secondo Nuckols / SBS | Per i muscoli in ritardo, o con volume basso, alzare la frequenza; nei programmi SBS gli accessori vanno scelti sui punti deboli o sui muscoli che il lavoro principale non colpisce; esiste un articolo SBS sui muscoli e movimenti più trascurati (titolo non visto) | Convenzione | [V] riassunto di risultati (strongerbyscience.com, programmi SBS su liftvault.com): livello 2-3 |
| Dose-risposta del volume | Più serie settimanali = più ipertrofia fino a un tetto, con rendimenti decrescenti; la frequenza conta poco a parità di volume. Già base delle regole PRG-25/28 e RIC-01 | Moderata (da verificare qui); Solida secondo il repo | [M] Schoenfeld 2017 (PMID 27433992, dal registro di `SKILL.md`); Pelland 2025 meta-regressione (PMID 41343037, dal registro di `SKILL.md`): letti nel repo, **non riverificati in questa sessione** |
| Più di 20 serie per muscolo | Studi su uomini allenati con 24-32 serie/sett. hanno dato esiti discussi (titoli visti: «High resistance training volume enhances muscle thickness in resistance-trained men»; «Did high-volume training just get debunked?»). Non ho visto n, durata, esito | Contrastata (da verificare) | [V] solo titoli (mennohenselmans.com) |
| Mantenimento con volume ridotto | Un terzo del volume abituale basta a mantenere massa e forza per mesi; un nono non in tutti (ricordo: giovani e anziani, 32 settimane); la revisione sul «dosaggio minimo» conferma che frequenza e volume bassi mantengono se l'intensità resta alta | Moderata (da verificare) | [M] Bickel 2011 (MSSE); Spiering 2021 (revisione): titolo e anno ricordati, non cercati |
| Ordine nella seduta | Il muscolo allenato per primo migliora di più in forza; per la massa l'ordine conta poco. Già base di ABB-10 | Moderata (già nel repo) | Nunes 2021 (citato in `docs/coach-mappa-regole.md` ABB-01/10, non riverificato) |

### 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio

Regola di lettura: «regionale» = un esercizio fa crescere più una parte del muscolo (prossimale/distale, testa) di un altro, misurato con ecografia, RM o volume. EMG e risposte acute **non** sono crescita (bandiera rossa di `SKILL.md` sez. 3).

| Muscolo / regione | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Come si misura | La crescita varia fra regioni dello stesso muscolo; si vede solo con misure dirette (spessore, area, volume), e **un solo sito di misura non basta** | Moderata | [V] «Determining Changes in Muscle Size and Architecture After Exercise Training: One Site Does Not Fit all» (PubMed 38513182) |
| Quadricipiti: retto femorale vs vasti | Estensione del ginocchio: retto femorale **+13,2%** contro **+1,1%** della leg press; vasti e quadricipite totale simili. Lo squat fa crescere i vasti (vasto laterale, soprattutto distale) più del retto femorale | Moderata (due fonti concordi, n non visto) | [V] «Hypertrophic Effects of Single- versus Multi-Joint Exercise: A Direct Comparison between Knee Extension and Leg Press» (PMC13215645, PubMed 41630124; anno non visto); [V] Zabaleta-Korta 2021 RCT (riassunto: leg extension cresce le tre parti del retto femorale, lo squat no; il vasto laterale cresce con lo squat e non con la leg extension), con una lettera critica e una risposta (PubMed 34930094, 35291926). Il riassunto potrebbe mescolare più studi: da verificare |
| Quadricipiti: profondità dello squat | Squat profondo (ginocchio a 140°) contro mezzo squat (90°), 10 settimane, 2 sedute/sett.: grande gluteo **+6,7 ± 3,5%** contro **+2,2 ± 2,6%**; adduttore magno a favore della profondità; quadricipiti simili | Moderata (studio unico, riassunto) | [V] riassunto attribuito a Kubo 2019 (studio non aperto) |
| Femorali | Leg curl **seduto** contro prono, 20 adulti, 70% 1RM: volume dei femorali totale **+14% contro +9%**; biarticolari +8-24% contro +4-19%; capo corto del bicipite femorale +10% contro +9% (uguale). L'anca flessa allunga i biarticolari | Moderata | [V] Maeo e coll. (anno 2021 ricordato; PMC7969179, «Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection after Training at Long versus Short Muscle Lengths») |
| Femorali: Nordic e lavoro in allungamento | «L'ipertrofia dei femorali è specifica dell'esercizio»: Nordic contro eccentrico in stato allungato (esito non visto). La posizione della caviglia nel leg curl prono non cambia mioelettrico, forza e ipertrofia | Moderata (da verificare) | [V] PMC11419281 / PubMed 38857522; [V] PubMed 37194431 (solo titoli e conclusione del titolo) |
| Tricipite (capo lungo) | L'estensione sopra la testa fa crescere il tricipite **sostanzialmente più** della posizione neutra del braccio (numeri non visti) | Moderata (RCT unico; da verificare) | [V] Maeo e coll. 2023, Eur J Sport Sci 23(7):1240-1250 |
| Bicipite | Curl nell'ampiezza iniziale (allungato) contro finale, 19 giovani donne, 8 settimane, 3 sedute/sett.: area **maggiore al 70% della lunghezza** (p = 0,001), uguale al 50% (p = 0,311) e nella somma (p = 0,111): più crescita **distale** | Moderata | [V] Pedrosa e coll. 2023 (PMC9960616, PubMed 36828324). Un altro RCT: curl su panca inclinata contro curl alla Scott, 38 donne, 9 settimane (PubMed 37559762; il riassunto pone il dubbio se conti l'esercizio o la lunghezza del muscolo) |
| Polpacci: ginocchio esteso/flesso | Calf raise in piedi (ginocchio esteso) contro seduto (flesso), 14 adulti non allenati, 70% 1RM, 5 serie × 10 ripetizioni, 2 sedute/sett., 12 settimane: tutti i muscoli del tricipite della sura crescono tranne **i gastrocnemi nella gamba «seduta»**; crescita maggiore da in piedi | Moderata | [V] Kinoshita e coll. 2023 (PMC10753835). Il dato sul soleo non era nel riassunto |
| Polpacci: ampiezza | Gemello: il lavoro **solo nella parte allungata** ha dato più crescita di quello nella parte finale: laterale **14,9% contro 6,2%**; anche il mediale. 42 giovani donne, 8 settimane, 3 sedute/sett. Una meta-analisi sulle ripetizioni parziali in allungamento e un RCT su allenati con risultati simili alle ripetizioni complete esistono (titoli visti) | Moderata / Contrastata sulle parziali | [V] Kassiano e coll. 2023, J Strength Cond Res 37(9) (PubMed 37015016); titoli: Springer s11332-025-01586-5 (meta-analisi), PMC11829627 (trained: parziali allungate simili al ROM completo), PMC12375417 (parziali oltre il cedimento sul polpaccio) |
| Petto alto (fasci clavicolari) | L'inclinata attiva di più la testa clavicolare, la piana la sternocostale (EMG); in uno studio con ecografia panoramica le aree cambiano in modo disuniforme con l'inclinazione (risposta acuta). Un riassunto non attribuito dice che l'inclinata dà più spessore al petto alto; **non ho visto uno studio di crescita a lungo termine** | Moderata per l'attivazione; Convenzione per la crescita a lungo termine | [V] PubMed 36334406 e 34644424 (titoli «Non-uniform excitation of pectoralis major…»); riassunto senza autori |
| Dorsali: larghezza e spessore | Solo EMG: trazioni e lat machine attivano il gran dorsale; il rematore attiva di più romboidi e trapezio medio; lat machine davanti con centroide più laterale (letto come «larghezza» dagli autori dell'EMG); le varianti di trazione non differiscono nel dorsale. **Nessuno studio di crescita visto** su larghezza contro spessore | Convenzione | [V] PMC11057623, PMC13510307 (rassegna narrativa EMG), PMC449729; sperimentazione registrata (NCT07360236) senza risultati |
| Glutei: hip thrust contro squat | 9 settimane, giovani **non allenati**, RM: crescita dei glutei **simile**; stime lievemente a favore dell'hip thrust ma molto incerte; coscia più grossa con lo squat; trasferimento simile allo stacco | Moderata | [V] Plotkin e coll. 2023 (PMC10349977, bioRxiv 2023.06.21.545949, versione pubblicata PMC10593473); titoli: meta-analisi sull'ipertrofia del grande gluteo (PMC12018462), confronto in donne ben allenate (PubMed 31975359) |
| Deltoidi laterali/posteriori, trapezio, avambracci, adduttori (a parte il squat profondo), medio gluteo, addome, collo, serrato, erettori | **Nessuna ricerca riuscita su questi** | Convenzione | [M] vedi 1.3 |

### 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello

Tutte le righe sono **[M] Conoscenza del modello (non verificata sul web)**. Forza massima: Moderata (da verificare).

| Tema | Cosa ricordo | Forza | Fonte (anno), se la ricordo |
|---|---|---|---|
| «I polpacci sono testardi» | È in parte vero e in parte folklore: il polpaccio lavora ogni giorno (camminata) e il soleo ha una quota alta di fibre lente, ma lo studio visto (Kinoshita 2023, 10 serie/sett.) mostra che cresce con una dose normale. Ricette dei coach: frequenza 3+, ampiezza completa con pausa in allungamento, 8-15 ripetizioni (anche 15-20), due esercizi (ginocchio esteso e flesso). Nessuna prova che servano trucchi speciali | Convenzione | coach vari (Israetel, Nippard, Henselmans: da verificare) |
| Deltoidi laterali | Le spinte allenano soprattutto l'anteriore; il laterale cresce con le alzate (cavi o macchina: tensione già nella parte allungata); tollera molta frequenza (3+ sedute) e volume alto (le fasce di RP arrivano a oltre 20 serie, cifra ricordata) | Convenzione | RP / Nippard (da verificare) |
| Deltoidi posteriori | Rematori e tirate li coinvolgono, ma i coach prescrivono 1-2 esercizi diretti (reverse pec deck, alzate posteriori ai cavi, face pull) | Convenzione | Henselmans, RP, Nippard (da verificare) |
| Trapezio superiore | Risponde a carichi pesanti (stacchi, farmer walk) e a shrug; poca ricerca diretta | Convenzione | - |
| Avambracci e brachioradiale | Con presa pesante (trazioni, stacchi, rematori) ricevono molto; i coach aggiungono curl a martello e inversi (brachioradiale) e wrist curl; prove di crescita da lavoro diretto: poche | Convenzione | - |
| Addome | Il retto dell'addome è un muscolo come gli altri; gli studi sono quasi tutti EMG; la **visibilità** dipende dalla massa grassa (dimagrimento), non dal numero di crunch; il «dimagrimento localizzato» non funziona (RCT piccoli e revisioni) | Moderata (da verificare) per «niente dimagrimento localizzato»; Convenzione per il resto | revisione sul dimagrimento localizzato (anno non ricordato) |
| Obliqui e vita | I coach si dividono: carichi pesanti sugli obliqui ingrossano la vita (Reeves e i classici lo temevano) oppure l'effetto è trascurabile. Nessuna prova diretta ricordata | Convenzione / **Contrastata** | classici (Reeves, Gironda) e coach moderni (da verificare) |
| Collo | Cresce con isometria, bilanciere con imbracatura, macchina; utile per l'estetica (rapporto con spalle e vita) e in alcuni sport; tecnica e prudenza (rachide cervicale) contano | Convenzione | - |
| Serrato anteriore, erettori | Il serrato si allena con piegamenti «plus», pullover, spinte; gli erettori con stacchi, stacco rumeno, iperestensioni: copertura indiretta di norma sufficiente se il programma ha stacco/rematore | Convenzione | - |
| Grande gluteo contro medio gluteo | Il grande gluteo lavora in estensione d'anca (hip thrust, stacco rumeno, squat profondo, affondi); il medio in abduzione e in appoggio su una gamba (affondi, step-up, abductor, abduzioni ai cavi). Per le donne il gluteo è obiettivo estetico frequente: 12-20 serie efficaci su 2-3 sedute | Convenzione (EMG in prevalenza; il confronto squat/hip thrust è [V] in 1.2) | Contreras (EMG; da verificare) |
| Adduttori | L'adduttore magno cresce con lo squat profondo ([V] Kubo 2019); la macchina adduttori è un lavoro diretto; spesso dimenticati nei programmi | Moderata (da verificare) | vedi 1.2 |
| Vasto mediale («goccia») | Nessuna prova che esercizi specifici (estensioni terminali) lo facciano crescere separatamente dal resto del quadricipite; viene dal mondo della riabilitazione | Convenzione | - |
| Struttura delle ossa | Larghezza delle clavicole, lunghezza di femore/tronco/braccia, inserzioni muscolari **non si cambiano** e spiegano perché alcuni esercizi (panca, squat, stacco) risultano più comodi e per chi sono più utili. Consiglio comune: scegliere la variante che permette ampiezza completa e il muscolo bersaglio senza dolore | Convenzione | Henselmans, Nippard (da verificare) |
| Differenze genetiche nella risposta | La crescita dell'area del muscolo dopo lo stesso programma varia molto fra persone: da circa 0 a oltre +50% in un grande studio su 585 persone; esistono «responder» alti e bassi, ma la classificazione è instabile e dipende dalla misura | Moderata (da verificare) | Hubal 2005 (MSSE, ricordato); Morton e coll. 2016-2018 su responder (ricordato in modo vago) |
| Limiti naturali e formule | L'indice di massa magra (FFMI) di atleti natural arrivava in media a circa 25 nello studio di Kouri 1995 (campione di atleti, non una soglia di legge); le formule di Casey Butt (altezza, polso, caviglia) sono un modello di libro **non rivisto**; nessuna delle due va usata per dire a una persona «sei vicino al tuo limite» | Convenzione | Kouri 1995 (Clin J Sport Med); Butt (libro «Your Muscular Potential») |
| Rapporti estetici | Spalle/vita, il «numero aureo» 1,618, Reeves (braccio = collo = polpaccio): sono canoni di bodybuilding, non obiettivi di salute né misure di valore. La ricerca sulla bellezza (rapporto vita/spalle negli uomini e vita/fianchi nelle donne) mostra preferenze medie, con grandi differenze individuali | Convenzione | Hughes e Gallup 2003; Braun e Bryan 2006 (ricordati vagamente); canoni dei classici |
| Dismorfia muscolare | Descritta come forma di disturbo dell'immagine corporea (si sentono piccoli pur essendo grossi), più frequente fra chi solleva pesi; l'allenamento è spesso compulsivo; confronti e «difetti» da correggere ne sono fattori di rischio | Moderata (da verificare) | Pope e coll. 1997 (Psychosomatics, ricordato) |
| Donne e obiettivi estetici | Le donne crescono in modo relativo simile agli uomini, con più guadagni relativi nella forza della parte alta; «tonificare» = costruire muscolo e perdere grasso, non un'attività diversa; il grasso non si «mira» | Moderata (da verificare) | Roberts, Nuckols, Krieger 2020 (JSCR, ricordato) |
| Simmetria destra/sinistra | Piccole differenze (arto dominante un po' più forte/grosso) sono normali; nello sport si segnalano differenze oltre il 10-15% nel test di forza per arto; non esistono prove che per l'estetica serva «correggere» differenze lievi; allenare per primo il lato più debole e non superare le sue ripetizioni è la prassi più comune | Convenzione | S&C e riabilitazione; coach vari |
| Ampiezza completa e mobilità | La mobilità di caviglia (squat), anca, spalla e dorsale toracica limita la profondità; ampiezza completa o allungata dà risultati uguali o migliori delle parziali nelle meta-analisi che ricordo; si lavora con varianti adatte (macchine, rialzo del tacco, panca inclinata) più che con stretching | Moderata (da verificare) | Schoenfeld e Grgic 2020; Wolf e coll. 2023 (ricordati); Maeo/Kassiano/Pedrosa [V] sopra |
| Sindrome crociata superiore | Concetto di Janda (petto corto + dorsale lungo = spalle in avanti); le revisioni che ricordo trovano un legame **debole o assente** fra postura statica e dolore; rafforzare la schiena e allungare il petto non è dannoso ma non è una «cura» | Convenzione / **Contrastata** | revisioni su postura e dolore (autori non ricordati) |
| Lavoro diretto o indiretto per bicipiti, tricipiti, deltoidi | Gli studi sono piccoli e su pochi muscoli: aggiungere isolamenti a chi fa già composti cambia poco la crescita in alcuni studi; i coach prescrivono comunque lavoro diretto perché sposta la crescita su regioni diverse e dà più volume utile | Convenzione / **Contrastata** | Gentil e coll. (titoli ricordati vagamente); già citata in ABB-03 come «studi piccoli» |

### 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio)

Tutto [M] salvo dove indicato; forma «riportato da…, da verificare» (nessuna frase testuale).

| Persona | Posizione ricordata sul tema | Forza |
|---|---|---|
| Mike Israetel (RP) | Ciclo di specializzazione: 1-2 muscoli verso l'MRV, gli altri a mantenimento (MV); durata di uno o due mesocicli; i landmark sono per muscolo, non per gruppo [V parziale: siti terzi] | Convenzione |
| Menno Henselmans | Volume equilibrato 10-15 serie/muscolo/sett. per la maggioranza, ≤6 per seduta [V]; proporzioni estetiche come obiettivo di progettazione; differenze strutturali nella scelta degli esercizi (da verificare) | Convenzione |
| Greg Nuckols (SBS) | Per i muscoli in ritardo, più frequenza e più volume [V]; prima di dare la colpa alla genetica controllare che il muscolo riceva abbastanza lavoro (da verificare) | Convenzione |
| Eric Helms | Nella piramide, specializzazione e dettagli individuali stanno in cima: contano dopo aderenza, volume, intensità e progressione (`docs/ricerca-metodi-coach-pratici.md` §2.4) | Convenzione |
| Jeff Nippard | Classifiche di esercizi per muscolo basate su studi recenti (allungamento, ROM); consigli su «punti deboli» in video (titoli non cercati) | Convenzione |
| Bret Contreras | Glutei: più esercizi per estensione d'anca, abduzione; ricerca EMG; fa parte del dibattito hip thrust contro squat, dove [V] Plotkin 2023 dà risultato simile | Convenzione / Moderata |
| Chris Beardsley | Ragiona per meccanismi (tensione meccanica, lunghezza): per lui l'ipertrofia regionale dipende dal punto in cui il muscolo è più teso (da verificare) | Convenzione |
| Layne Norton | Nessuna posizione sulla specializzazione che io ricordi; è fonte per nutrizione (non toccata qui) | - |

---

## 2. Dove le fonti non concordano

1. **Quanto volume dare a un muscolo prioritario.** A) RP: sale verso l'MRV (fino a 20-26 serie per muscolo, cifre ricordate) mentre gli altri scendono a MV [V parziale + M]. B) Henselmans: 10-15 serie tipiche, ≤6 per seduta, e studi con 24-32 serie dibattuti [V titoli]. C) Meta-regressioni (Pelland 2025 nel repo): rendimenti decrescenti. **Adotta il coach**: per i prioritari +25-50% del volume standard, tetto assoluto 20 serie frazionarie (22 per deltoidi laterali/posteriori e polpacci), **tetto di 8 serie per seduta** (6 per i muscoli piccoli) per spingere la frequenza. Motivo: prudenza (infortuni, recupero) e perché oltre quella soglia i dati sono incerti.
2. **Frequenza.** Nuckols: più frequenza per i muscoli in ritardo [V]. Meta-analisi: a parità di volume la frequenza conta poco (nel repo). Non è una vera contraddizione: la frequenza serve a **distribuire** le serie sotto il tetto per seduta. **Adotta**: la frequenza sale perché le serie in più non stanno in una seduta, non perché sia una leva separata.
3. **Tutto il regionale.** L'idea di «un esercizio per ogni testa» è molto più solida per femorali (leg curl seduto), tricipite (sopra la testa), retto femorale (leg extension), polpacci (in piedi, allungato), bicipite (allungato) che per **petto alto** (solo attivazione e risposte acute viste) e **larghezza del dorso** (solo EMG). Un altro dubbio ([V] riassunto del confronto curl inclinato/Scott): l'effetto regionale potrebbe dipendere dalla lunghezza del muscolo e non dall'esercizio in sé; e ci sono dispute metodologiche (lettera su Zabaleta-Korta, «un sito non basta»). **Adotta**: scegliere sempre almeno un esercizio con picco di tensione in allungamento (come già RIC-03 e PRG-10) e un'inclinata nelle sedute di petto, **senza** dire che «l'inclinata fa crescere il petto alto» come fatto (si dice «probabile»).
4. **Hip thrust contro squat per i glutei.** Credenza diffusa: l'hip thrust è il re dei glutei. [V] Plotkin 2023: crescita simile da hip thrust e squat (non allenati, 9 settimane); [V] Kubo 2019: lo squat profondo fa crescere glutei e adduttori. **Adotta**: i due insieme (stacco rumeno e/o affondi per la parte allungata); nessuna gerarchia.
5. **Lavoro diretto per muscoli piccoli.** Studi piccoli: poco beneficio dell'isolamento aggiunto ai composti; coach: sempre un po' di lavoro diretto. **Adotta**: pavimento di serie dirette basso (2-3 serie per bicipiti, tricipiti, deltoidi laterali e posteriori, polpacci) perché costa poco e non ha controindicazioni (come ABB-03).
6. **Polpacci: da trattare in modo «speciale»?** Mito del polpaccio genetico (Convenzione) contro il dato che con 10 serie a settimana cresce in 12 settimane ([V] Kinoshita 2023, non allenati). **Adotta**: dose di muscolo normale (non meno di 8 serie a settimana) e due esercizi, ginocchio esteso e flesso.
7. **Obliqui e vita.** Allenare obliqui con carichi pesanti ingrossa la vita? Coach classici e alcuni moderni sì; altri dicono effetto trascurabile (nessuna prova ricordata). **Adotta**: niente sconsiglio né promessa; obliqui con anti-rotazione e plank laterale (carico leggero); chi vuole una vita stretta può togliere i carichi pesanti sugli obliqui senza costi.
8. **Ideali estetici e limiti naturali.** Canoni (1,618, Reeves) e formule (Butt, Kouri 25) contro il rischio per l'immagine corporea e la loro natura non rivista. **Adotta**: il coach **non** mostra ideali, soglie di «potenziale» né confronti; le misure sono solo andamento personale e facoltative.
9. **Simmetria.** Alcuni coach correggono ogni differenza con lavoro unilaterale extra; altri dicono che le differenze lievi sono normali. **Adotta**: segnala solo differenze persistenti oltre il 10% e con linguaggio neutro; mai «difetto».
10. **Durata della specializzazione.** RP: 1-2 mesocicli (4-12 settimane); il repo oggi: fino a tre cicli di 8-12 settimane, poi un ciclo bilanciato (CIC-02, `repertorio.js:431`). **Adotta**: blocchi di 4-8 settimane, al massimo due consecutivi sullo stesso muscolo.

---

## 3. Tabella volumi minimi e di specializzazione per muscolo

**Forza di tutta la sezione: Convenzione** (stime di lavoro costruite su euristiche dei coach e su pochi studi visti), salvo dove la colonna «Nota» dice [V]. La dose-risposta a livello di gruppo è Solida (Schoenfeld 2017, Pelland 2025: già nel repo, non riverificate qui); **le cifre per singolo muscolo non vengono da studi**. Servono a un motore che oggi lavora su 7 gruppi (`schemi.js:42 GRUPPI_PRINCIPALI`, `VOLUME_LIVELLO`) e dovrebbe lavorare sui 24 muscoli già descritti in `MUSCOLI` (`dettagli-esercizi.js:42`).

**Regola di conteggio (proposta).** Una serie conta solo se è **dura** (a non più di circa 3-4 ripetizioni dal cedimento, nello stesso spirito di RIC e della scala RIR del repo; riscaldamento e serie leggere no). Per il muscolo principale (`bersaglio` in `DETTAGLI`) conta 1; per gli altri conta il **peso** della tabella 3.2; senza peso specifico valgono i valori di oggi (0,5 per i sinergisti di un multiarticolare, `ricette.js:296`), con 0,25 per i secondari di un isolamento. Per i muscoli con regioni (petto, dorso, deltoidi, polpacci) il contatore del muscolo intero prende il peso **massimo** fra le regioni (niente conteggio triplo); il contatore regionale serve solo ai controlli di copertura (quota di petto alto, quota di tricipite sopra la testa, quota di leg curl seduto, quota di polpaccio in piedi).

### 3.1 Serie frazionarie a settimana per muscolo

Legenda: **Mant.** = mantenimento (vale quando un altro muscolo è in specializzazione e il tempo scarseggia; stima: circa un terzo-metà del volume standard con intensità e carico invariati [M] Bickel 2011 ricordato; MV di RP come riferimento). **Standard** = intermedio (principiante: bordo basso meno 2; avanzato: bordo alto). **Spec.** = specializzazione per 4-8 settimane. **Cap/seduta** = tetto di serie dure per muscolo in una seduta durante la specializzazione (Henselmans: ≤6 [V]; oggi il repo ha 11, `PRG-30`). **Freq.** = sedute a settimana (standard → specializzazione). Gli `id` sono quelli di `MUSCOLI`; `collo` e la divisione `gemelli`/`soleo` oggi mancano.

| Muscolo (id) | Mant. | Standard princ. | Standard int. | Standard avanz. | Spec. | Cap/seduta | Freq. | Nota ed evidenza |
|---|---|---|---|---|---|---|---|---|
| Petto (petto_alto + medio + basso) | 4-6 | 6-8 | 8-14 | 10-18 | 14-20 | 8 | 2→3 | Almeno un terzo delle serie su inclinata 30-45° (in spec. 40-50%): attivazione [V] Moderata, crescita regionale non vista (Convenzione) |
| Dorsali (dorsali) | 4-6 | 6-8 | 8-14 | 10-18 | 14-20 | 8 | 2→3 | Sia tirate verticali sia orizzontali; «larghezza contro spessore» solo EMG [V]: Convenzione |
| Spessore del dorso (schiena_spessore) | 2-4 | 4-6 | 6-10 | 8-14 | 10-16 | 8 | 2→3 | Rematori contano anche per i dorsali (peso 0,5-0,7) |
| Lombari (erettori) | 0-2 | 0-2 | 2-6 | 3-8 | 6-10 | 4 | 1-2 | Quasi tutto da stacchi, stacco rumeno, rematori; non è un obiettivo «da specializzare» (fatica alta) |
| Deltoide anteriore (deltoide_anteriore) | 0 | 0 | 2-6 | 3-8 | non specializzare | 6 | 2 | Riceve 6-12 serie indirette dalle spinte (Convenzione) |
| Deltoide laterale (deltoide_laterale) | 3-4 | 4-6 | 8-14 | 10-18 | 14-22 | 6-8 | 2-3→3-4 | Larghezza delle spalle; tollera frequenza alta; alzate ai cavi/macchina (tensione in allungamento): Convenzione |
| Deltoide posteriore (deltoide_posteriore) | 2-3 | 3-5 | 6-12 | 8-14 | 12-18 | 6 | 2→3 | Rematori danno una parte; 1-2 esercizi diretti: Convenzione |
| Trapezio superiore (trapezio) | 0-2 | 0-2 | 3-8 | 4-10 | 8-14 | 6 | 2 | Shrug, stacchi, farmer walk; Convenzione |
| Bicipiti (bicipiti) | 3-4 | 4-6 | 8-14 | 10-18 | 14-20 | 6-8 | 2→3 | Una variante in allungamento ([V] Pedrosa 2023: più crescita distale; curl su panca inclinata, Bayesiano, Scott) |
| Brachiale e brachioradiale (brachioradiale) | 0 | 0 | 2-5 | 3-6 | 6-10 | 4 | 2 | Curl a martello e inversi; i curl lo coprono in parte (peso 0,5) |
| Avambracci (avambracci) | 0 | 0 | 0-4 | 2-6 | 4-8 | 4 | 2-3 | Zero se si tira pesante ≥2 volte a settimana; altrimenti 2-3 serie: Convenzione |
| Tricipiti (tricipiti) | 3-4 | 4-6 | 6-12 | 8-16 | 12-18 | 6-8 | 2→3 | **Almeno la metà delle serie dirette sopra la testa** ([V] Maeo 2023: Moderata) |
| Quadricipiti (quadricipiti) | 4-6 | 6-8 | 8-14 | 10-18 | 14-20 | 8 | 2→2-3 | Squat e presse per i vasti; **leg extension per il retto femorale** ([V]: +13,2% contro +1,1%, Moderata): 3-6 serie di leg extension in standard |
| Femorali (femorali) | 3-4 | 4-6 | 6-12 | 8-14 | 12-16 | 8 | 2→3 | **Almeno metà delle serie come leg curl seduto** ([V] Maeo 2021: +14% contro +9%, Moderata); il resto con stacco rumeno (lavoro in allungamento) |
| Adduttori (adduttori) | 0-2 | 0-2 | 3-8 | 4-10 | 8-12 | 6 | 2 | Squat profondo, affondi, adductor machine ([V] Kubo 2019: l'adduttore magno segue la profondità, Moderata) |
| Polpacci (polpacci) | 4-6 | 4-6 | 8-12 | 10-16 | 12-20 | 8 | 3→3-4 | **Due esercizi** (ginocchio esteso e flesso), ampiezza completa con pausa in basso; in piedi cresce di più i gemelli ([V] Kinoshita 2023, 10 serie/sett. hanno fatto crescere i polpacci in 12 settimane): Moderata |
| Grande gluteo (grande_gluteo) | 0-3 | 3-6 | 6-12 (donne o obiettivo glutei: 8-16) | 8-16 (10-20) | 12-20 | 8 | 2→3 | Hip thrust e squat profondo danno risultati simili ([V] Plotkin 2023, Moderata); stacco rumeno/affondi per l'allungamento |
| Medio gluteo (abduttori) | 0 | 0-2 | 2-6 | 3-8 | 6-10 | 6 | 2 | Abductor machine, abduzioni ai cavi, affondi e step-up; solo EMG ricordata: Convenzione |
| Retto dell'addome (addome, addome_basso) | 0-2 | 2-4 | 4-8 | 6-10 | 8-12 | 6 | 2-3 | Prove di crescita dirette scarse; la visibilità dipende dalla massa grassa: Convenzione |
| Obliqui e anti-rotazione (obliqui) | 0-2 | 0-2 | 2-6 | 3-8 | 4-8 | 4 | 2 | Plank laterale, Pallof, rotazioni leggere; vedi sez. 2 punto 7 (Contrastata) |
| Collo (nuovo id `collo`) | 0 | 0 | 0-4 (facoltativo) | 0-4 | 4-6 | 3 | 2 | Solo se l'utente lo sceglie; progressione prudente: Convenzione |

**Tetti assoluti per muscolo in specializzazione** (per qualsiasi blocco): 20 serie frazionarie per i muscoli grandi, 22 per deltoidi laterali/posteriori e polpacci, 18 per tricipiti. Oltre non si va nemmeno se l'utente ha tempo: i dati su 24-32 serie sono incerti [V titoli] e il recupero conta (SPE-04).

**Budget quando il tempo non basta** (ordine di taglio, dal primo): 1) mai sotto **Mant.** per i muscoli del pavimento (sez. 6); 2) i muscoli non prioritari scendono verso il bordo basso dello standard; 3) i prioritari salgono verso il bordo alto; 4) solo poi si aggiunge ai muscoli non prioritari. Obiettivo forza: i pavimenti dei muscoli piccoli scendono a **Mant.**; salute e dimagrimento: basta un esercizio per muscolo coperto (come oggi, ABB-03 non vale per loro).

### 3.2 Contributo diretto e indiretto dei composti (pesi per serie dura)

**Forza: Convenzione, stima ragionata [M]** (non misurata; la fonte del valore piatto 0,5 è Pelland 2025 nel repo). Intervallo di fiducia ragionevole ±0,2: per questo i valori sono multipli di 0,1 e il motore può ridurli a 0,5/0,25 se non si vuole l'ipotesi. Ciò che nei dati visti è una prova diretta ha il segno [V].

| Famiglia (esempi dalla libreria) | Bersaglio = 1 | Indiretti (peso) |
|---|---|---|
| Panca piana (bilanciere, manubri, Chest Press, piegamenti) | petto (medio) | petto_alto 0,5; petto_basso 0,7; deltoide_anteriore 0,5; tricipiti 0,5 |
| Panca inclinata 30-45° | petto_alto | petto_medio 0,7; petto_basso 0,3; deltoide_anteriore 0,6; tricipiti 0,5 |
| Dip alle parallele, panca declinata | petto_basso | petto_medio 0,7; tricipiti 0,7 (dip) o 0,5; deltoide_anteriore 0,5 |
| Croci, pec deck, croci ai cavi | petto | deltoide_anteriore 0,2; petto_alto 0,4 (cavi dal basso) |
| Military, lento manubri, shoulder press, Arnold | deltoide_anteriore | deltoide_laterale 0,5; tricipiti 0,5; petto_alto 0,3; trapezio 0,3 |
| Alzate laterali (cavi, macchina, manubri) | deltoide_laterale | trapezio 0,3; deltoide_posteriore 0,2 |
| Alzate posteriori, reverse pec deck, face pull | deltoide_posteriore | schiena_spessore 0,4; trapezio 0,4 |
| Trazioni, lat machine (anche presa inversa) | dorsali | bicipiti 0,5; brachioradiale 0,5; schiena_spessore 0,3; deltoide_posteriore 0,3; avambracci 0,3 |
| Rematori (bilanciere, T-bar, cavo, manubrio, petto appoggiato) | schiena_spessore | dorsali 0,7 (petto appoggiato 0,5); deltoide_posteriore 0,5; bicipiti 0,5; trapezio 0,5; erettori 0,3 (0,5 col busto libero); avambracci 0,3 |
| Pullover | dorsali (0,8) | petto 0,5; tricipiti 0,3 |
| Shrug | trapezio | avambracci 0,3 |
| Curl (bilanciere, manubri, cavi, Scott, inclinata, Bayesiano) | bicipiti | brachioradiale 0,5; avambracci 0,3 |
| Hammer curl, curl inverso, Zottman | brachioradiale | bicipiti 0,5; avambracci 0,5 |
| Pushdown, French press, estensioni sopra la testa | tricipiti | nessuno |
| Panca presa stretta, dip alla macchina | tricipiti | petto 0,5; deltoide_anteriore 0,4 |
| Squat (bilanciere, front, hack, goblet, pendulum) | quadricipiti | grande_gluteo 0,6 (profondo; [V] Kubo 2019); adduttori 0,5 (profondo; [V] Kubo 2019); erettori 0,3; **femorali 0** (come la nota di Kubo già nel codice) |
| Leg press | quadricipiti | grande_gluteo 0,4; adduttori 0,3; femorali 0 |
| Leg extension | quadricipiti (retto femorale 1) | nessuno ([V]: la leg press dà al retto femorale solo +1,1%) |
| Affondi, bulgari, step-up, split squat | quadricipiti (0,9 nei bulgari) | grande_gluteo 0,8; adduttori 0,5; abduttori 0,4; femorali 0,2 |
| Stacco rumeno, good morning | femorali | grande_gluteo 0,8; erettori 0,6; adduttori 0,3 |
| Stacco da terra (convenzionale, sumo, trap bar) | grande_gluteo 0,7 | erettori 0,6 (trap bar 0,4); quadricipiti 0,5 (sumo/trap bar 0,7); femorali 0,5; trapezio 0,5; avambracci 0,5; adduttori 0,4 (sumo 0,6); dorsali 0,3 |
| Hip thrust, ponte glutei, iperestensione a 45° per glutei, pull-through | grande_gluteo | femorali 0,3; adduttori 0,3 (hip thrust); quadricipiti 0,2 (hip thrust) |
| Abductor machine, abduzioni ai cavi, slanci laterali | abduttori | grande_gluteo 0,3 |
| Adductor machine | adduttori | nessuno |
| Leg curl seduto / sdraiato / Nordic | femorali | nessuno (seduto: vedi quota ≥50%, [V] Maeo 2021) |
| Calf raise in piedi, alla leg press, a un piede | polpacci (gemelli 1; soleo 0,7) | nessuno |
| Calf raise seduto | polpacci (soleo 1; gemelli 0,3 [V]: i gemelli non crescono da seduti) | nessuno |
| Crunch, crunch al cavo, leg raise, ab wheel | addome | obliqui 0,3; flessori_anca 0,3 (leg raise 0,6) |
| Plank, hollow hold, dead bug, bird dog | stabilita | addome 0,4 |
| Pallof, woodchop, plank laterale, Russian twist | obliqui | stabilita 0,5 |
| Farmer walk | avambracci | trapezio 0,7; stabilita 0,5 |

Esempio da incollare per il motore (nomi di `MUSCOLI`; valori da calibrare, un solo punto di modifica in `COACH_PARAMETRI`):

```js
/* VOLUME_MUSCOLO: [min, max] di serie frazionarie a settimana. mant = mantenimento; spec = specializzazione; cap = serie dure per seduta in spec. */
const VOLUME_MUSCOLO = {
  petto:               { mant: [4, 6], std: { principiante: [6, 8],  intermedio: [8, 14],  avanzato: [10, 18] }, spec: [14, 20], cap: 8 },
  dorsali:             { mant: [4, 6], std: { principiante: [6, 8],  intermedio: [8, 14],  avanzato: [10, 18] }, spec: [14, 20], cap: 8 },
  schiena_spessore:    { mant: [2, 4], std: { principiante: [4, 6],  intermedio: [6, 10],  avanzato: [8, 14] },  spec: [10, 16], cap: 8 },
  deltoide_laterale:   { mant: [3, 4], std: { principiante: [4, 6],  intermedio: [8, 14],  avanzato: [10, 18] }, spec: [14, 22], cap: 6 },
  deltoide_posteriore: { mant: [2, 3], std: { principiante: [3, 5],  intermedio: [6, 12],  avanzato: [8, 14] },  spec: [12, 18], cap: 6 },
  bicipiti:            { mant: [3, 4], std: { principiante: [4, 6],  intermedio: [8, 14],  avanzato: [10, 18] }, spec: [14, 20], cap: 6 },
  tricipiti:           { mant: [3, 4], std: { principiante: [4, 6],  intermedio: [6, 12],  avanzato: [8, 16] },  spec: [12, 18], cap: 6 },
  quadricipiti:        { mant: [4, 6], std: { principiante: [6, 8],  intermedio: [8, 14],  avanzato: [10, 18] }, spec: [14, 20], cap: 8 },
  femorali:            { mant: [3, 4], std: { principiante: [4, 6],  intermedio: [6, 12],  avanzato: [8, 14] },  spec: [12, 16], cap: 8 },
  polpacci:            { mant: [4, 6], std: { principiante: [4, 6],  intermedio: [8, 12],  avanzato: [10, 16] }, spec: [12, 20], cap: 8 },
  grande_gluteo:       { mant: [0, 3], std: { principiante: [3, 6],  intermedio: [6, 12],  avanzato: [8, 16] },  spec: [12, 20], cap: 8 },
  addome:              { mant: [0, 2], std: { principiante: [2, 4],  intermedio: [4, 8],   avanzato: [6, 10] },  spec: [8, 12],  cap: 6 }
  /* ...gli altri muscoli della tabella 3.1 con gli stessi campi */
};
/* PESI_SERIE: contributo di una serie dura a un muscolo, oltre al bersaglio (1). Chiave = famiglia di esercizi. */
const PESI_SERIE = {
  'panca piana':        { petto_alto: 0.5, petto_basso: 0.7, deltoide_anteriore: 0.5, tricipiti: 0.5 },
  'panca inclinata':    { petto_medio: 0.7, petto_basso: 0.3, deltoide_anteriore: 0.6, tricipiti: 0.5 },
  'spinta verticale':   { deltoide_laterale: 0.5, tricipiti: 0.5, petto_alto: 0.3, trapezio: 0.3 },
  'tirata verticale':   { bicipiti: 0.5, brachioradiale: 0.5, schiena_spessore: 0.3, deltoide_posteriore: 0.3, avambracci: 0.3 },
  'rematore':           { dorsali: 0.7, deltoide_posteriore: 0.5, bicipiti: 0.5, trapezio: 0.5, erettori: 0.3, avambracci: 0.3 },
  'squat':              { grande_gluteo: 0.6, adduttori: 0.5, erettori: 0.3, femorali: 0 },
  'leg press':          { grande_gluteo: 0.4, adduttori: 0.3, femorali: 0 },
  'affondo':            { grande_gluteo: 0.8, adduttori: 0.5, abduttori: 0.4, femorali: 0.2 },
  'stacco rumeno':      { grande_gluteo: 0.8, erettori: 0.6, adduttori: 0.3 },
  'hip thrust':         { femorali: 0.3, adduttori: 0.3, quadricipiti: 0.2 }
};
```

---

## 4. Rilevazione dei punti deboli

**Principio** (Convenzione di Nuckols/Henselmans/Israetel, [V parziale] e [M]): un muscolo «indietro» è quasi sempre un muscolo che riceve poco lavoro, o lavoro poco adatto, prima di essere un fatto genetico. L'app deve quindi **controllare in quest'ordine** e fermarsi al primo problema trovato: 1) volume fatto, 2) distribuzione e frequenza, 3) vicinanza al cedimento e tecnica («non sento il muscolo»), 4) scelta dell'esercizio e ampiezza (esercizio in allungamento, mobilità), 5) recupero generale, 6) solo infine struttura e genetica (e mai come primo messaggio). La parola «debole» non compare mai davanti all'utente (sez. 8, SPE-14).

**Cosa si può misurare oggi.** Dati disponibili: storico sedute `loadHistory()` con serie (`done`, ripetizioni, carico) per esercizio (`ultimeSessioni`, `progressivo.js:27`), `findExercise(...).group`, tag `DETTAGLI` (bersaglio e secondari), prontezza per seduta, peso e BIA (`peso.js`, `getBiaStorico`), foto di progresso (`ui/progressi/foto.js`). Mancano: misure di circonferenza, ripetizioni per lato, giudizio per muscolo.

| # | Segnale | Come si calcola | Soglia di lavoro (Convenzione, da tarare) | Cosa significa | Cosa fa il coach | Limiti da dichiarare |
|---|---|---|---|---|---|---|
| D1 | Volume fatto per muscolo | Serie dure **completate** nelle ultime 4 settimane, frazionarie (tabella 3.2), per muscolo, divise per 4 | Sotto **Mant.** (tabella 3.1) per ≥3 delle 4 settimane con aderenza ≥75% | «Trascurato», non «debole» | Propone di aggiungere serie o di spostare un esercizio (scheda con un tocco), mai in automatico | Salta di sedute e tagli per il tempo sono la causa più frequente |
| D2 | Troppe serie in una seduta o frequenza 1 | Sedute/sett. con ≥2 serie dure per il muscolo; massimo di serie in una seduta | Volume ≥10 serie/sett. concentrato in 1 seduta, o >8 in una seduta | Rendimento calante nella seduta, recupero lungo | Propone di dividere su 2-3 sedute (stessa somma) | La frequenza conta poco a parità di volume (Solida, nel repo): è organizzazione, non magia |
| D3 | Andamento del carico per muscolo | Per ogni esercizio **principale** del muscolo (≥6 sedute in 8 settimane, stesso `tipoCarico`): pendenza % a settimana dell'e1RM (o delle ripetizioni a pari carico). Per il muscolo: mediana dei due esercizi con più dati. Indice = pendenza del muscolo − mediana di tutti i muscoli | ≥6 settimane di dati, ≥3 muscoli confrontabili, pendenza del muscolo < 50% della mediana **e** < +0,3%/sett., volume ≥ Mant., prontezza media ≥60, nessuno scarico nel periodo | «Andamento lento di forza»: vuoi dare più spazio? | Suggerisce (in ordine): più frequenza, un esercizio in allungamento, più serie fino al bordo alto dello standard, controllo del recupero | **La forza non è massa**: nelle prime 4-6 settimane domina l'apprendimento; macchine e isolamenti salgono con ritmi diversi dai bilancieri; confronta solo esercizi dello stesso tipo di carico; il rapporto fra variazione di forza e di dimensione muscolare nell'individuo è debole [M, ricordato] |
| D4 | Calo | e1RM in calo ≥5% in 3 sedute di fila | - | Fatica o interruzione, **non** punto debole | Passa alle regole di scarico e di prontezza esistenti (CAR/DEC) | Salvaguardia: precedenza sempre alla prudenza |
| D5 | Differenza destra/sinistra | Solo esercizi con `lato` (unilaterali). Oggi non si registra per lato: serve un **mini-test** una volta a ciclo («con lo stesso carico, quante ripetizioni per lato?») o campo facoltativo per lato | Differenza **>10%** di ripetizioni (o di carico) per 3 test consecutivi a ≥2 settimane di distanza, con ≥8 ripetizioni; <10% = normale | Asimmetria ricorrente (lievi differenze sono normali, specie nell'arto dominante) | Parte dal lato più debole, stesso numero di ripetizioni per i due lati (non si supera quello del debole) e +1 serie sul lato debole per un blocco; messaggio neutro | **Oltre 20%, o comparsa improvvisa, dolore, formicolio, perdita di forza**: invito a parlarne con un medico o un fisioterapista (soglia di rinvio, `SKILL.md` sez. 6). Nessuna prova che differenze lievi vadano «corrette» per l'estetica |
| D6 | Circonferenze (facoltative) | Punti fissi: braccio rilassato e contratto, avambraccio, torace, vita (ombelico), fianchi, coscia (metà), polpaccio (massimo), collo, spalle; mattina, stessa posizione, nastro non teso | Variazione «reale» ≥1 cm per arti, ≥2 cm per tronco (circa il doppio dell'errore tipico di 0,5 cm, [M] stima) | Andamento personale | **Solo tendenza**: mostra il cambio in cm insieme a peso e BIA; non decide nulla da sola | Il nastro misura anche il grasso e l'acqua; un solo sito non basta per la crescita regionale ([V] PubMed 38513182) |
| D7 | Foto di progresso | Già in `foto.js`: confronto affiancato, stessa luce e posa | - | Giudizio **dell'utente** | Alla fine del ciclo chiede «dove vuoi più lavoro nel prossimo ciclo?» con le foto davanti (se vuole); nessun giudizio automatico delle foto | Rischio per l'immagine corporea: la funzione è facoltativa e si può nascondere |
| D8 | Rapporti di forza | e1RM rematore con bilanciere / panca piana; lat machine / panca | Fuori da circa **0,7-0,9** (rematore/panca) per ≥4 settimane | Squilibrio spinte-tirate (ABB-04 lo copre già per le serie) | Messaggio morbido sul bilanciamento | **Convenzione debole**: nessuno studio visto; da non usare per «diagnosticare» |
| D9 | Autovalutazione | Fine ciclo (cap. CIC-01) e dopo la seduta: «quale muscolo hai sentito meno?» | Risposta ripetuta 2 volte per lo stesso muscolo | Possibile problema di scelta esercizio o tecnica | Cambia variante dentro lo stesso muscolo (come `alternativeStessoMuscolo`), rallenta la fase negativa, suggerisce un focus sul muscolo (concentrazione interna: studi piccoli su isolamenti, [M] Moderata da verificare) | Soggettivo |

**Falsi positivi da escludere prima del messaggio**: scarico o ripresa dopo pausa (RIC-05), cambio di esercizio recente (<3 sedute), dolore dichiarato in quella zona, programma con meno di 6 settimane, utente principiante (<8 settimane di storico), obiettivo dimagrimento (la forza stagna comunque).

**Soglie fornite dall'app e non dalla ricerca**: tutte quelle della tabella sono parametri di `COACH_PARAMETRI` da tarare con dati reali; nessuna ha una fonte primaria. Il test D3 si può provare sulle storie sintetiche già usate dai test (`tests/browser/regole-nuove.js`).

---

## 5. Programma di specializzazione

**Forza: Convenzione** (RP e Henselmans [V parziale], pratica comune [M]); le scelte di esercizio per regione sono Moderate dove la riga di 1.2 lo dice.

### 5.1 Chi ci può accedere (SPE-03)

Solo chi ha già una base: livello intermedio con almeno 12 mesi di allenamento regolare, o avanzato; aderenza almeno 75% nell'ultimo ciclo (CIC-01); non «cauto» (over 65, PAR-Q positivo); 18 anni o più (oggi l'app non ha un limite d'età, B24 dell'analisi delle lacune); nessun fastidio dichiarato nella zona; obiettivo diverso da dimagrimento (in deficit si mira a mantenere; è anche la regola di oggi, `goals[0] !== 'dimagrimento'`); nessun «momento di vita» che riduce il volume. Chi non rientra riceve la **priorità leggera**: il muscolo va per primo nella seduta (ABB-10), ha un esercizio con picco in allungamento (SPE-07) e sta nel bordo alto dello standard. I principianti non specializzano: i loro progressi vengono dal programma di base e il limite di 3 serie per esercizio (PRG-18) resta.

### 5.2 La ricetta, in otto passi

1. **Scelta**: al massimo **2** muscoli (RP: non più di due [V parziale]; l'interfaccia oggi ne ammette 3). Mai due muscoli dello stesso schema nello stesso blocco: petto + tricipiti (le spinte caricano gomito e tricipite due volte), dorsali + bicipiti, quadricipiti + glutei. Coppie ragionevoli: deltoidi laterali + polpacci, braccia + polpacci, glutei + deltoidi, dorsali + quadricipiti. Un terzo muscolo scelto dall'utente resta in «attenzione» (bordo alto dello standard).
2. **Dose**: dal volume standard attuale al valore «Spec.» della tabella 3.1, con **rampa** di +1-2 serie a settimana per muscolo (settimana 1 = standard + 2). Un +25% per l'intermedio e un +40-50% per l'avanzato sono il punto di partenza (Convenzione): per un volume standard di 12 serie significano 15-18. **Tetto assoluto** 20 serie frazionarie (22 per deltoidi laterali/posteriori e polpacci, 18 per tricipiti). La rampa si ferma se la prontezza media delle ultime 2 sedute del muscolo è sotto 60 o se c'è scarico (RIC-01 passa a far parte della rampa).
3. **Gli altri muscoli**: **50% dello standard**, mai sotto «Mant.» (circa un terzo-metà del volume: [M] Bickel 2011), con carico e vicinanza al cedimento invariati. Se l'utente ha tempo in più (≥15 minuti per seduta) si può tenere il 70-80%. Oggi invece il codice mette i non prioritari fra 6 e `vMin`: per un avanzato è «standard basso», non mantenimento (sez. 7, riga 3).
4. **Frequenza e tetto per seduta**: **3 sedute a settimana** per il muscolo prioritario se i giorni sono ≥4 (con 2-3 giorni: tutte le sedute disponibili più mini-dosi), con almeno 48 ore fra due sedute dello stesso muscolo grande; **tetto di 8 serie per muscolo per seduta (6 per i piccoli)**, perché a oltre 6-8 le serie aggiuntive rendono poco (Henselmans ≤6 [V]; il repo oggi arriva a 11, `serieMaxMuscoloSeduta`). La frequenza serve a stare sotto il tetto, non è una leva separata (sez. 2 punto 2).
5. **Esercizi**: da 3 a 4 esercizi diversi per il muscolo nella settimana, con **un'opzione in allungamento** e una a bassa fatica sistemica (macchina o cavo) per le serie in più; il multiarticolare pesante resta per primo. Scelta per regione: sez. 5.4.
6. **Intensità**: serie dure a 1-3 ripetizioni dal cedimento sui multiarticolari, 0-2 sugli isolamenti, **non** a cedimento su ogni serie (RIC-04 resta: al massimo una tecnica al cedimento per seduta). Progressione a doppia (ripetizioni poi carico) come oggi.
7. **Rotazione**: ogni blocco cambia 1-2 esercizi accessori; i fondamentali restano uguali per leggere l'andamento.
8. **Uscita** (SPE-08): vedi 5.5.

### 5.3 Come innestarla su ogni split

| Split di oggi | Dove sta il muscolo prioritario | Esempio (serie dure/sett.) | Cosa cambia per gli altri |
|---|---|---|---|
| Full Body 3 giorni (frequenza 3 scelta dall'utente, PRG-02) | In tutte e 3 le sedute: 4-6 serie per seduta | Deltoidi laterali 4+4+4 = 12 + indiretti ≈ 15 | Gli altri scendono verso il bordo basso: si tolgono prima gli accessori |
| Upper / Lower / Full Body (ABB-05) | Nei due giorni «upper» e nel Full Body; mini-dose nel «lower» se è una parte alta | Petto: 8 (Upper) + 8 (Full Body) + 3 (a fine lower) = 19 | Gambe a 50% se non prioritarie |
| Upper / Lower ×2 (4 giorni) | Parti alte: Upper A, Upper B (cap 8) + mini-dose di 3 sui due Lower. Parti basse: Lower A e Lower B (cap 8) + mini-dose di 3 a fine Upper (polpacci, addome, deltoidi, bicipiti, tricipiti vanno sempre bene) | Polpacci: 4+4 (Lower) + 3+3 (Upper) = 14 | Tempo: si tagliano gli accessori non prioritari (PRG-33 già lo fa: i prioritari si tagliano per ultimi, `ricette.js:341`) |
| PPL + Upper / Lower (5 giorni) | Nel suo giorno e nell'Upper/Lower collegato; mini-dose nel giorno non correlato (es. deltoidi posteriori nel giorno gambe) | Dorsali: 8 (Pull) + 8 (Upper) = 16 + 3 | - |
| PPL ×2 (6 giorni) | Due volte nel suo giorno (cap 8) + una mini-dose di 3 in un altro giorno | Tricipiti: 6 (Push) + 6 (Push) + 3 (Pull) = 15 | - |
| Full Body 2 giorni | In entrambe le sedute: +2-3 serie a seduta; **niente terza seduta** | Volume standard +25% al massimo (il tempo comanda) | Nessuno scende sotto il pavimento della sez. 6 |
| Frequenza scelta = 1 (PPL / «punti deboli», `onboarding.js:60-67`) | Una seduta sola da 11 serie è troppo (lo dice anche la nota di oggi, `ricette.js:330`): **tetto 8** nel giorno + mini-dosi di 2-3 in altri due giorni | Spalle: 8 (giorno punti deboli) + 3 + 3 | Il giorno «punti deboli» dà spazio ai piccoli (`ricettaPunti`) |

### 5.4 Esercizi per priorità (nomi della libreria attuale `libreria-esercizi.js`)

Forza: la prima colonna è Convenzione salvo dove c'è [V]; l'ordine è per il blocco di 6 settimane.

| Priorità | Esercizi (libreria) | Serie per seduta × sedute | Totale diretto | Nota |
|---|---|---|---|---|
| Deltoidi laterali (larghezza spalle) | Alzate Laterali ai Cavi, Alzate Laterali alla Macchina, Alzate Laterali (manubri) | 3-4 × 4 (due Upper e due Lower a fine seduta) | 12-16 | Frequenza alta, 10-20 ripetizioni; più sedute con poche serie |
| Petto (con petto alto) | Panca Inclinata Manubri, Panca Piana (bilanciere o manubri), Croci ai Cavi o Pectoral Machine, Dip alle Parallele | 6-8 × 2 + 3 | 15-19 | Almeno 40-50% delle serie inclinate: «probabile» più petto alto (attivazione [V]); crescita a lungo termine non verificata |
| Dorso (larghezza) | Lat Machine, Trazioni (assistite se serve), Lat Machine Presa Inversa, Pullover con Manubrio | 6-8 × 2 + 3 | 15-19 | «Larghezza» contro «spessore»: Convenzione (EMG); includere anche i rematori (spessore) |
| Dorso (spessore) | Rematore con Bilanciere o con Manubrio, T-Bar Row, Rematore ai Cavi, Reverse Pec Deck | 6-8 × 2 | 12-16 | I rematori contano 0,7 per i dorsali |
| Bicipiti | Curl su Panca Inclinata, Curl Bayesiano ai Cavi, Curl su Panca Scott o Spider Curl, Hammer Curl | 5 × 2 + 3 | 13-17 | Una variante in allungamento ([V] Pedrosa 2023: più crescita distale); l'altra a martello per il brachiale |
| Tricipiti | Estensione Tricipiti sopra la Testa ai Cavi o con Manubrio, Pushdown con Corda, Panca Presa Stretta o Dip alla Macchina | 5-6 × 2 + 3 | 13-15 | **≥50% delle serie sopra la testa** ([V] Maeo 2023) |
| Quadricipiti | Squat con Bilanciere, Hack Squat, Leg Press, Leg Extension, Affondi Bulgari | 8 × 2 | 16 | Leg extension per il retto femorale (3-6 serie, [V]); squat profondo per vasti e adduttori ([V]) |
| Femorali | Leg Curl Seduto, Stacco Rumeno, Leg Curl Sdraiato o Nordic Curl | 7-8 × 2 | 14-16 | **≥50% leg curl seduto** ([V] Maeo 2021) |
| Glutei | Hip Thrust (o alla macchina), Squat o Hack profondo, Affondi Bulgari, Stacco Rumeno, Abductor Machine | 8 × 2 + 3-4 | 18-20 | Hip thrust e squat danno crescita simile ([V] Plotkin 2023): usare entrambi |
| Polpacci | Calf Raise in Piedi, Calf Raise Seduto (o alla Leg Press) | 3-4 × 4 | 12-16 | Ampiezza completa, pausa in basso; ≥50% col ginocchio esteso ([V] Kinoshita 2023) |
| Addome | Crunch al Cavo, Leg Raise alla Sbarra, Ab Wheel; Plank come lavoro di stabilità | 3 × 3 | 8-9 | La visibilità dipende dalla massa grassa, non dal numero di serie |
| Avambracci / collo (solo su richiesta) | Hammer Curl, Curl Inverso; (collo: nuovo esercizio) | 2-3 × 2-3 | 4-8 | Convenzione; collo con carico basso e tecnica |

### 5.5 Durata e regola di uscita (SPE-08)

- **Durata**: blocco di 4-8 settimane; default **6** (coerente con il blocco di carico avanzato di PRG-01: 5 settimane + 1 di scarico). Mai più di **2 blocchi consecutivi** sullo stesso muscolo; poi almeno un blocco di 4 settimane a volume standard.
- **Uscita normale**: alla fine del blocco, scarico e «verifica» (foto e misure facoltative, andamento dei carichi): l'utente sceglie fra ripetere (una volta), cambiare muscolo, o tornare allo standard.
- **Uscita anticipata** (torna allo standard, senza colpa): (a) prestazioni del muscolo in calo in 2 sedute con prontezza media sotto 50; (b) dolore nella zona (le regole di dolore hanno sempre la precedenza, `SKILL.md` sez. 6); (c) aderenza sotto 70% nelle ultime 2 settimane; (d) richiesta dell'utente; (e) peso o massa magra in calo marcato (COR-01/PRO-04).
- **Oggi** `repertorio.js:431` conta i cicli (`cicliSpec`) e al quarto azzera le priorità: con cicli da 8-12 settimane sono **fino a 24-36 settimane** di volume ridotto sugli altri muscoli. Troppo.

---

## 6. Muscoli trascurati: prescrizioni minime

Obiettivo: **nessun programma di massa, ricomposizione o glutei lascia vuoti** deltoidi posteriori e laterali, polpacci, addome, glutei, adduttori. Oggi ABB-03 ne copre alcuni con 2-3 serie «protette», ma l'analisi SIM dà polpacci a **2 serie/settimana** in ogni profilo di ipertrofia e deltoidi laterali a 6-7,5 (analisi delle lacune §1).

### 6.1 Pavimento di serie **dirette** a settimana

| Muscolo | Massa / ricomposizione, ≥4 giorni | 3 giorni | 2 giorni | Forza | Salute / dimagrimento | Esercizi tipo |
|---|---|---|---|---|---|---|
| Deltoidi posteriori | 4-6 | 3-4 | 2 | 2 | 0-2 | Reverse Pec Deck, Alzate Posteriori, Face Pull |
| Deltoidi laterali | 6-8 | 4-6 | 3 | 2-3 | 0-2 | Alzate Laterali ai Cavi o alla Macchina |
| Polpacci | 8 (2 esercizi, 3 sedute) | 6 | 3-4 | 3 | 2 (un esercizio) | Calf Raise in Piedi + Seduto |
| Addome | 4-6 | 4 | 2 | 2 | 2 | Crunch al Cavo, Leg Raise, Plank |
| Glutei (frazionari, anche indiretti) | 6 | 6 | 4 | 4 | 4 | Hip Thrust, Stacco Rumeno, Affondi, squat profondo |
| Adduttori (frazionari) | 3 | 2 | 0-2 | 0 | 0 | Squat profondo, Affondi, Adductor Machine |
| Bicipiti diretti | 4-6 | 3-4 | 2 | 2 | 0-2 | Curl (una variante in allungamento) |
| Tricipiti diretti | 4-6 | 3-4 | 2 | 2 | 0-2 | Estensione sopra la testa, Pushdown |
| Trapezi | 3 | 0-3 | 0 | 0 | 0 | Scrollate (Shrug) o Farmer Walk |
| Avambracci | 0-3 (zero se tira pesante ≥2 volte) | 0-2 | 0 | 0 | 0 | Hammer Curl, Curl Inverso |
| Lombari | 0 se c'è stacco o stacco rumeno; altrimenti 2-3 | idem | idem | idem | idem | Hyperextension, Stacco Rumeno |
| Cuffia dei rotatori | 2-3 (articolazione, non estetica) | 2-3 | 2 | 2 | 2 | Face Pull, rotazioni esterne (`ricerca-metodi-coach-pratici.md`, tabella dei metodi di nicchia, riga di Cressey: da verificare) |
| Collo | facoltativo, su richiesta | - | - | - | - | - |

Costo in tempo, per orientarsi: pavimento completo di 4 giorni ≈ 25-30 minuti a settimana distribuiti in coda alle sedute (la stima del repo è 35 s + recupero per serie, `ricette.js:337`).

### 6.2 Regole di posto

- Le serie del pavimento hanno `protetto: true` (come ABB-03): il taglio per il tempo parte dagli altri esercizi, poi dalle serie del pavimento solo fino al valore «Mant.» di sez. 3.1 (mai a zero).
- Stanno **a fine seduta** (non rovinano i fondamentali) e si abbinano alle superserie antagoniste (ABB-06) quando il tempo è poco.
- La **verifica finale dopo `strFinale`** (`ricette.js:351`) ricalcola il volume per muscolo: se un muscolo del pavimento è finito sotto soglia dopo i tagli (principianti 3 serie, sonno, tempo, ABB-04/08), aggiunge la serie mancante o segnala. Oggi il volume è fissato **prima** dei tagli e non viene ricontrollato (B4).
- Il pavimento non vale per i principianti nelle prime 4 settimane (il programma è già pieno di multiarticolari: si introduce in settimana 5), per chi è in modalità prudente, per gli obiettivi salute e dimagrimento (basta un esercizio per muscolo).

---

## 7. Audit delle regole esistenti

Giudizio: **Giusta** = coerente con le fonti viste o con la pratica; **Non supportata** = senza base o contraria; **Mancante** = non esiste. Codice letto in questa sessione (solo lettura).

| # | Cosa fa oggi | Dove | Giudizio | Note |
|---|---|---|---|---|
| 1 | La priorità è una scelta fra **6 gruppi** (petto, schiena, gambe, spalle, braccia, glutei), massimo 3 | `schemi.js:42 GRUPPI_PRINCIPALI`, `onboarding.js:191`, `il-coach.js:27/86` | **Non supportata** (granularità) | «Gambe» = quadricipiti + femorali + adduttori + polpacci; «braccia» = bicipiti + tricipiti + avambracci; «spalle» = tre capi + trapezio. Il limite di 3 e il messaggio «se tutto è prioritario, niente lo è» sono giusti nello spirito; RP dice al massimo 2 [V parziale]. Il core non è selezionabile (non è in `GRUPPI_PRINCIPALI`) anche se `SLOT_PRIORITA` ha la voce 'core' |
| 2 | Priorità = volume ×1,2 (×1,5 se avanzato con specializzazione) sul min e sul max del gruppo | `ricette.js:299-305` | **Giusta nel principio, dose non supportata** | Più volume a ciò che conta: Solida (dose-risposta). Ma ×1,2 su 10-14 = circa +2 serie per l'intermedio (poco sopra il rumore); ×1,5 solo per l'avanzato; nessuna fonte per i fattori. Si moltiplica anche con l'esigenza (×1,2) e con RIC-01 |
| 3 | Con la specializzazione gli altri gruppi vanno «a mantenimento»: min 6, max `vMin` | `ricette.js:306`, nota `:328` | **Non supportata** | Per un avanzato `vMin` = 14 (fino a 17 con l'esigenza): è standard basso, non mantenimento (circa un terzo-metà). La nota mostrata all'utente («gli altri gruppi a mantenimento») è inesatta |
| 4 | La specializzazione esiste solo per `level === 'avanzato'` e obiettivo ≠ dimagrimento | `ricette.js:300` | **Giusta (prudenza) ma incompleta** | Coerente con PRG-18/19 e con la pratica; però l'intermedio con una priorità ottiene solo +2 serie: effetto nullo. **Mancante**: dose da intermedio |
| 5 | Il volume del gruppo conta 0,5 per ogni serie di multiarticolare di un gruppo «sinergista» | `ricette.js:293-298`, `libreria-esercizi.js:10-17` | **Non supportata (bug B4)** | `petto.synergists = [spalle, braccia]`, `schiena.synergists = [braccia, spalle]`: il volume di spalle e braccia riceve 0,5 da ogni serie di petto e dorso, quindi 16 serie di spinte e tirate regalano 8 serie a «spalle» e a «braccia». Una priorità «spalle» o «braccia» viene in parte soddisfatta senza serie dirette |
| 6 | La priorità **non cambia** la scelta degli esercizi né la frequenza | `priorita` usata solo in `ricettaPunti`, `strOrdina`, `perGruppo`, RIC-01 e nella nota | **Mancante** | Nessun bonus nel punteggio degli esercizi del muscolo prioritario, nessuna frequenza minima |
| 7 | ABB-10: a parità di tipo, il gruppo prioritario va per primo | `struttura-pro.js:41 strOrdina` | **Giusta** | Nunes 2021 (nel repo): la prestazione cresce di più negli esercizi fatti all'inizio; per la massa l'effetto è piccolo (ABB-01 lo dice) |
| 8 | Giorno «punti deboli» per chi sceglie frequenza 1: slot dai gruppi prioritari + riempitivi (deltoidi laterali/posteriori, bicipiti, tricipiti, polpacci, core) | `onboarding.js:60-93` | **Giusta in parte** | Buon'idea (copre i muscoli piccoli). Limiti: esiste solo con frequenza 1; `SLOT_PRIORITA` è per gruppo (petto senza inclinata, gambe senza adduttori); una sola seduta a settimana per muscolo contraddice il tetto di 8 |
| 9 | RIC-01: +1 serie (max 5) sugli esercizi dei gruppi prioritari nelle settimane centrali del blocco, se la prontezza è ≥70 | `regole-nuove.js:46-75` | **Giusta** (come rampa, Convenzione) | Coerente con la rampa di RP e con Bell 2024/Pelland 2025 citati nel repo; per gruppo, quindi «gambe» prioritarie aggiunge anche ai polpacci. Si integra nella rampa SPE-04 |
| 10 | ABB-03: polpacci, deltoidi posteriori, bicipite e tricipite (da 4 giorni) e core: 2-3 serie protette; non per principianti, <3 giorni, salute | `struttura-pro.js:72 strCopri` | **Giusta nel principio, dose troppo bassa** | Polpacci a **2 serie/sett.** (analisi SIM) contro 8-12 sensati e contro il dosaggio dello studio visto (10 serie/sett., [V] Kinoshita 2023: cresce); un solo esercizio per i polpacci. **Mancanti**: avambracci, trapezi, adduttori, collo, deltoidi laterali con pavimento proprio |
| 11 | PRG-23: leg curl, leg extension, alzate laterali, curl Scott/spider quando ≥3 giorni e massa | `ricette.js:244` | **Giusta** | Leg extension per il retto femorale ([V] Zabaleta-Korta 2021 e confronto con la leg press: +13,2% contro +1,1%, Moderata); PRG-10 scambia il leg curl sdraiato col seduto ([V] Maeo 2021: +14% contro +9%); per i bicipiti si può aggiungere la panca inclinata / Bayesiano ([V] Pedrosa 2023) |
| 12 | CIC-02: dopo 3 cicli di specializzazione, uno bilanciato | `repertorio.js:431` | **Non supportata** | Cicli da 8-12 settimane: fino a 24-36 settimane di squilibrio; la pratica (RP) usa 1-2 mesocicli (4-12 settimane) [M] |
| 13 | Rilevazione dei punti deboli | - | **Mancante** | Nessun volume per muscolo dai log, nessuna misura, nessuna simmetria: sez. 4 |
| 14 | PRG-26: massa magra bassa (FFMI < 18 uomini, < 15 donne) → volume ×1,2, con messaggio «Massa magra bassa per la tua altezza» | `compone.js:17-27`, `parametri.js` | **Non supportata (dose); rischio per l'immagine corporea (testo)** | Il ×1,2 non ha fonte (analisi delle lacune §1); il messaggio è un giudizio normativo da BIA. Da riformulare (SPE-14) |
| 15 | PRG-22: obiettivo glutei, 4 famiglie ogni settimana 3×12 | `ricette.js:233` | **Giusta** | 12 serie dirette: dentro lo standard 8-16 per donne/obiettivo glutei; manca la spec. fino a 20 e la divisione in 2-3 sedute |
| 16 | Volume e tetti per seduta: 11 serie per gruppo e per seduta | `ricette.js:315-325`, `COACH_PARAMETRI.serieMaxMuscoloSeduta` | **Contrastata** | Fonte: Pelland 2025 preprint nel repo. Per i prioritari proponiamo 6-8 (Henselmans ≤6 [V]); per tutti gli altri 11 può restare |
| 17 | Quote di regione (petto alto, tricipite sopra la testa, leg curl seduto, calf in piedi) | `SCAMBI_ALLUNGAMENTO` (PRG-10), RIC-03 | **Parzialmente giusta** | Coprono petto/schiena/glutei, tricipiti (French press → sopra la testa), femorali; **mancano** polpacci (in piedi/seduto), bicipiti (inclinata/Bayesiano) e le quote minime |
| 18 | Il coach non mostra rapporti ideali né «potenziale» | (nel codice, cercando «aureo», «golden», «ideale», «proporzion», non ci sono rapporti ideali; non ho letto tutti i testi di `analyzeBia`) | **Giusta** | Va mantenuto e scritto come regola (SPE-14) |

---

## 8. Regole proposte

Codici **SPE-01..18**. Tutte «spegnibili» (`REGOLE_SPEGNIBILI` in `js/coach/parametri.js`, `regolaAttiva('SPE-nn')`), con motivo scritto, annullabili dove cambiano il piano, solo con `coachAttivo()`, e senza toccare le salvaguardie (modalità prudente, over 65, principianti, dolore, scarico, PAR-Q: hanno sempre la precedenza). Frasi nuove anche in `js/lingue/en|es|de.js`. Dopo ogni modifica: `npm run catalogo`, `npm run simboli`, `npm run controlla`, CACHE_NAME in `sw.js`. **Forza**: nessuna è «Solida»; le cifre sono stime di lavoro (sez. 3).

| Codice | Quando scatta | Cosa fa | Motivo (testo per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| **SPE-01** priorità per muscolo | Onboarding e Il Coach, scelta dei muscoli su cui puntare | Le chip diventano muscoli (petto, dorsali, spessore dorso, spalle laterali, deltoidi posteriori, bicipiti, tricipiti, quadricipiti, femorali, glutei, polpacci, addome), massimo 3; i primi 2 sono «specializzazione» (se ammessi, SPE-03), il terzo «attenzione». Si salva anche il gruppo per compatibilità (`priorita`) | «Scegli i muscoli su cui vuoi più lavoro: ne bastano due. Se tutto è prioritario, niente lo è.» | Convenzione | Etichette neutre, ordine fisso (non per «difetto»); nessuna icona di giudizio | `onboarding.js:86-93,191,295`, `il-coach.js:27,86`, `alternative.js:99`, `repertorio.js:415` |
| **SPE-02** volume per muscolo | Ogni `buildProgram` | Sostituisce `perGruppo` con un contatore per muscolo (`VOLUME_MUSCOLO`, `PESI_SERIE` di sez. 3), usando `bersaglio` e `secondari` di `DETTAGLI`; ricalcola dopo `strFinale`; corregge i tag errati (B16) | «Il volume si conta per muscolo: lo stacco non allena il petto e le spinte da sole non bastano alle spalle.» | Convenzione (conteggio frazionario: Pelland 2025, nel repo) | Cambia i volumi di tutti i programmi: attivarla dietro regola spegnibile, provarla sui 17 profili dell'analisi SIM; mai sotto i minimi di sicurezza dei principianti | `ricette.js:282-325`, `schemi.js:41`, `parametri.js`, `dettagli-esercizi.js`, `libreria-esercizi.js:10-17` |
| **SPE-03** chi può specializzare | Priorità scelta e programma/ciclo generato | Specializzazione solo con i requisiti di 5.1; altrimenti «priorità leggera» (ordine, esercizio in allungamento, bordo alto dello standard) | «Per ora ti do più spazio con l'ordine e con gli esercizi; la specializzazione vera parte quando avrai qualche mese di costanza.» | Convenzione | Principianti, over 65, PAR-Q, minori, fastidio nella zona, dimagrimento, momento di vita: mai dose di specializzazione | `ricette.js:299-300`, `compone.js`, `repertorio.js` |
| **SPE-04** dose e rampa | Muscolo in specializzazione, in settimana di carico | Volume dal valore standard al valore «Spec.» (+25% intermedio, +40-50% avanzato) con rampa +1-2 serie/sett.; tetto assoluto 20 (22 deltoidi laterali/posteriori e polpacci, 18 tricipiti); ferma la rampa con prontezza media <60 nelle ultime 2 sedute; scarico = standard basso. Assorbe RIC-01 | «Più serie per [muscolo], un po' per volta: da 12 a 16-18 in poche settimane. Se ti senti scarico ci fermiamo.» | Convenzione (cifre); dose-risposta di fondo Solida | Sovraccarico e dolori: tetto e stop; dolore nella zona = esce (5.5) | `ricette.js:301-314`, `regole-nuove.js:46-75`, `parametri.js` (`COACH_PARAMETRI`) |
| **SPE-05** mantenimento vero | Mentre c'è una specializzazione | Gli altri muscoli a 50% dello standard (mai sotto «Mant.»; 70-80% se il tempo avanza), stessa intensità e carico; sostituisce `min = 6, max = vMin`; corregge il testo della nota | «Gli altri muscoli restano a mantenimento: bastano circa un terzo-metà delle serie per tenerli.» | Moderata (da verificare) ([M] Bickel 2011, Spiering 2021) | Perdere massa in principianti: non scatta senza SPE-03; mai sotto il pavimento di SPE-09 | `ricette.js:306,328` |
| **SPE-06** frequenza e innesto | Muscolo in specializzazione | ≥3 sedute/sett. se i giorni sono ≥4; tetto 8 serie/seduta (6 piccoli); mini-dosi di 2-4 serie a fine seduta di giorni non correlati; mai due muscoli dello stesso schema; ≥48 ore fra sedute dello stesso muscolo grande; con 2 giorni, +2-3 serie a seduta e niente terza seduta | «Per [muscolo] lavoriamo tre volte a settimana con poche serie per volta: è più comodo e si recupera meglio.» | Convenzione | Sedute più lunghe: il tempo vince (si tagliano gli altri muscoli, `ricette.js:337-348`) | `ricette.js:107,132,315-325`, `onboarding.js:60-93`, `struttura-pro.js` |
| **SPE-07** scelta per regione | Muscolo prioritario o a pavimento | Bonus di punteggio (+1,5 come PRG-10) e quota minima: bicipiti 1 variante allungata (inclinata, Bayesiano, Scott); tricipiti ≥50% sopra la testa; femorali ≥50% leg curl seduto; quadricipiti con leg extension (retto femorale); polpacci 2 esercizi (esteso e flesso); petto con inclinata; dorso con verticale e orizzontale; glutei con squat profondo/affondo + hip thrust. Fonte e anno nella nota | «Per il tricipite l'estensione sopra la testa ha dato più crescita di quella col braccio neutro (Maeo 2023).» | Moderata (femorali, tricipiti, retto femorale, polpacci); Convenzione (petto alto, larghezza dorso) | Non promettere la regione: «probabile»; mai scartare un esercizio che l'utente ama | `ricette.js:146`, `schemi.js SCAMBI_ALLUNGAMENTO`, `biomeccanica.js:99`, `dettagli-esercizi.js` (nuovo tag `regione`) |
| **SPE-08** durata e uscita | Blocco di specializzazione | Blocco di 4-8 settimane (6), poi scarico e «verifica»; max 2 blocchi di fila sullo stesso muscolo, poi ≥4 settimane standard; uscita anticipata (calo + prontezza <50; dolore; aderenza <70%; richiesta); sostituisce CIC-02 | «Blocco di 6 settimane su [muscolo]: poi si torna al lavoro normale per qualche settimana, così il resto non resta indietro.» | Convenzione | Nessuno squilibrio di mesi; l'utente può sempre uscire | `repertorio.js:431`, `motore.js:15,21` |
| **SPE-09** pavimento dei trascurati | Obiettivi massa, ricomposizione, glutei (non prudente) | Pavimento di serie dirette di sez. 6.1 per deltoidi posteriori e laterali, polpacci, addome, glutei, adduttori, bicipiti, tricipiti; `protetto`; verifica dopo `strFinale` e dopo i tagli | «Nel piano ci sono [X] serie per i [deltoidi posteriori] perché spinte e tirate non li allenano abbastanza.» | Convenzione | Tetto di +2 esercizi per seduta (come ABB-03); poi si tagliano gli altri; non per principianti nelle prime 4 settimane | `struttura-pro.js:72 strCopri`, `ricette.js:351` |
| **SPE-10** polpacci a dose normale | Massa, ricomposizione, glutei, ≥2 giorni con gambe | ≥8 serie/sett. su 2 esercizi (in piedi + seduto o alla leg press) in 2-3 sedute; ampiezza completa con pausa di 1-2 s in basso, 8-15 ripetizioni; progressione graduale | «I polpacci crescono come gli altri muscoli: servono almeno 8 serie a settimana, in piedi e da seduto, con pausa in basso.» | Moderata ([V] Kinoshita 2023: 10 serie/sett. in 12 settimane; Kassiano 2023) | Tendine d'Achille: dolore = stop e regola del dolore; principianti: partire da 4 | `struttura-pro.js:72`, `SLOT_DEF` (polpacci) in `ricette.js:19` |
| **SPE-11** poco volume per muscolo (D1/D2) | Ogni settimana, dai log completati | Se un muscolo resta sotto «Mant.» per 3 settimane su 4 con aderenza ≥75%, o ≥10 serie in una sola seduta, propone una modifica (aggiungere un esercizio, dividere le serie). Sempre con conferma | «[Muscolo] ha ricevuto N serie in 4 settimane: di solito basta un esercizio in più. Lo aggiungo?» | Convenzione | Mai «debole»; nessuna modifica senza conferma; non scatta in scarico o dopo pause | nuovo `js/coach/punti-deboli.js` (+ `index.html`, `npm run sw`), `pannello.js` |
| **SPE-12** andamento lento (D3) | Muscolo con ≥6 settimane di dati e condizioni di sez. 4 | Propone in ordine: più frequenza, esercizio in allungamento, serie fino al bordo alto dello standard, controllo del recupero; mai specializzazione automatica | «Per [muscolo] il carico sale più piano degli altri: proviamo a dargli più spazio, a cambiare esercizio o a controllare il recupero.» | Convenzione | La forza non è massa; non scatta nelle prime 8 settimane, in scarico o con prontezza bassa | `punti-deboli.js`, `ultimeSessioni` (`progressivo.js:27`) |
| **SPE-13** asimmetria (D5) | Una volta a ciclo, esercizi unilaterali (`lato`) | Mini-test per lato; se >10% per 3 test consecutivi: parte dal lato più debole, stesso numero di ripetizioni, +1 serie sul debole per un blocco. >20%, comparsa improvvisa, dolore, formicolio o perdita di forza: invito a parlarne con un medico o un fisioterapista, nessun programma | «Piccole differenze fra destra e sinistra sono normali. Se restano, partiamo dal lato più debole con lo stesso numero di ripetizioni.» | Convenzione | Ansia da simmetria: un messaggio per ciclo, opzione «non mostrare»; soglia di rinvio scritta | `punti-deboli.js`, `libreria-esercizi.js` (`lato`), schermata seduta (campo facoltativo) |
| **SPE-14** linguaggio e immagine corporea | Sempre | Mai «punto debole», «difetto», «sproporzionato»; niente ideali (1,618, Reeves), potenziale naturale (Butt, FFMI 25), confronti con altri; massimo 3 priorità, 2 con specializzazione; misure e foto facoltative e nascondibili; riformula il messaggio «Massa magra bassa» (`compone.js:27`); rinomina «punti deboli» in «giorno di priorità» (`onboarding.js:67,85`); se compaiono segnali ravvicinati (blocchi senza pausa, allenamenti oltre il previsto, misure inserite più volte a settimana, priorità cambiate ogni settimana, frasi di insoddisfazione) non propone specializzazione e mostra un messaggio neutro con invito a parlarne con un professionista (vedi `ricerca-psicologia-aderenza.md` §3.5, DCA-01..03 in `ricerca-cardio-nutrizione.md`) | «Più spazio» e «priorità» al posto di «punti deboli»; «Il tuo corpo cambia con la costanza; i confronti con gli altri non aiutano.» | Convenzione di prudenza | È la salvaguardia: la dismorfia muscolare è descritta fra chi solleva pesi ([M] Pope 1997); l'app informa e non diagnostica | `compone.js:27`, `il-coach.js`, `punti-deboli.js`, test di parole vietate in `npm test` |
| **SPE-15** misure e foto | Su richiesta dell'utente | Schermata facoltativa «Misure» (braccio, avambraccio, torace, vita, fianchi, coscia, polpaccio, collo, spalle); mostra solo il cambio personale in cm accanto a peso e BIA, mai confronti con ideali o rapporti; promemoria al massimo una volta al mese; nessuna decisione automatica | «Segui come cambiano le tue misure nel tempo, accanto al peso. Il metro misura anche il grasso: è un andamento, non un voto.» | Convenzione | Può alimentare l'ossessione: facoltativa, nascondibile; errore tipico ~0,5 cm ([M]) | nuovo `js/ui/progressi/misure.js`, chiave `coach_plus_misure_*` via `storage.js`, `peso.js` |
| **SPE-16** donne e obiettivi estetici | Sesso donna e/o obiettivo glutei | Glutei: standard 8-16, spec 12-20 su 2-3 sedute (hip thrust + squat profondo/affondi + stacco rumeno ± abduttori); testi con «costruire muscolo e perdere grasso» invece di «tonificare»; niente dimagrimento localizzato; nessuna promessa sulla vita con gli obliqui (Contrastata); i tempi per vedere i cambiamenti sono di mesi | «Per cambiare la forma serve costruire muscolo e, se vuoi, perdere grasso: dove lo perdi non si sceglie.» | Moderata (da verificare) | Aspettative irrealistiche: note con tempi realistici; PRG-20 (pause ×0,85) resta | `ricette.js:233`, `onboarding.js`, testi |
| **SPE-17** dati e libreria | Manutenzione | `MUSCOLI`: aggiungere `collo` (facoltativo) e distinguere gemelli/soleo (o un tag ginocchio esteso/flesso); correggere i tag (stacco rumeno bersaglio femorali; squat e leg press senza femorali; B15/B16); aggiungere wrist curl e estensione dei polsi, stacco rumeno con manubri, iperestensione per i lombari, un'inclinata alla macchina; nuovo campo `regione` | - | n/a (dati) | `npm test` controlla i tag (`tests/muscoli.test.js`) | `dettagli-esercizi.js`, `libreria-esercizi.js`, `scheda-unica.js` |
| **SPE-18** giorno «punti deboli» | Frequenza 1 e, come «slot di coda», frequenze 2-3 | `SLOT_PRIORITA` per muscolo e non per gruppo (petto con inclinata, gambe con adduttori e polpacci); tetto 8 serie per muscolo nel giorno; mini-dosi di 2-3 serie in altri due giorni | «Il giorno di priorità dà più spazio ai muscoli che scegli, e le serie in più stanno anche in altri giorni.» | Convenzione | Non diventa sempre una seduta più lunga: vale il tempo | `onboarding.js:60-93` |

Parametri da aggiungere a `COACH_PARAMETRI` (nomi proposti): `fattoreSpecIntermedio` 1,25; `fattoreSpecAvanzato` 1,4; `maxMuscoliSpec` 2; `capSerieSedutaSpec` 8; `capSerieSedutaSpecPiccoli` 6; `durataBloccoSpecSettimane` 6; `maxBlocchiSpecConsecutivi` 2; `fattoreAltriInSpec` 0,5; `sogliaAsimmetria` 0,10 e `sogliaAsimmetriaMedico` 0,20; `maxPrioritaUtente` 3.

---

## 9. Domande aperte

1. **Calibrare i pesi indiretti** (sez. 3.2): serve la meta-regressione che ha dato 0,5 (Pelland 2025: come conta le serie indirette, con quale peso, per quali muscoli) e studi che confrontino volume diretto e indiretto per bicipiti, tricipiti, deltoidi e glutei. Oggi i pesi per coppia sono stime ragionate.
2. **Specializzazione**: nessuno studio visto confronta un blocco di specializzazione con un programma bilanciato a parità di tempo. Cercare RCT su «specialization / muscle group priority» in allenati; capire se +25-50% rende più di +10-20%.
3. **Petto alto**: serve uno studio di crescita a lungo termine (12 settimane o più, ecografia o RM) inclinata contro piana; ho visto solo EMG e risposte acute.
4. **Larghezza del dorso** (verticale contro orizzontale), **brachiale**, **vasto mediale**, **medio gluteo**, **deltoidi laterali/posteriori**, **trapezi**, **avambracci**, **addome**, **collo**, **serrato**: nessuna ricerca riuscita.
5. **Soleo**: il riassunto di Kinoshita 2023 non dava il dato sul soleo (seduto contro in piedi); l'RCT sulle parziali di Kassiano su allenati ha dato risultati diversi (titoli PMC11829627, PMC12375417, meta-analisi Springer s11332-025-01586-5): leggerli.
6. **Mantenimento**: volumi minimi per muscolo in allenati (Bickel 2011, Spiering 2021, revisioni 2024-2025): la stima «un terzo-metà» è un ricordo.
7. **Rilevazione**: la validità di D3 (andamento del carico come proxy della crescita) è ignota; servono studi su correlazione fra variazione di forza e di massa a livello individuale; la soglia 10% di asimmetria viene dallo sport e dalla riabilitazione, non dalla crescita muscolare; la tolleranza dell'errore del metro (~0,5 cm) è una stima.
8. **Immagine corporea**: manca una revisione recente su app di allenamento, misure/foto e insoddisfazione corporea; capire se le funzioni facoltative (SPE-15) aiutano o fanno male.
9. **Donne**: dati specifici su glutei (volume, frequenza, regione); studio sui glutei in donne ben allenate (titolo PubMed 31975359) da leggere.
10. **Da verificare con trascrizioni** (quando la rete sarà aperta): posizioni di Israetel (specializzazione e landmark per muscolo), Henselmans (proporzioni e struttura ossea), Nippard (esercizi per regione), Contreras (glutei), Beardsley (regionale), Norton, Helms.
11. **Studi da leggere per intero**: Maeo 2021 (femorali), Maeo 2023 (tricipite, numeri), Kassiano 2023 (polpacci), Kinoshita 2023 (soleo), Pedrosa 2023 (bicipite), Plotkin 2023 (glutei), Kubo 2019 (adduttori e glutei), Zabaleta-Korta 2021 con la lettera (PubMed 34930094) e la risposta (35291926), e il confronto leg extension/leg press (PMC13215645).

---

## 10. Limiti onesti

- **Copertura: 16 ricerche web riuscite; il resto da conoscenza del modello.** Il piano era di oltre 35 ricerche; si sono fermate a 16 per il tetto di sessione condiviso fra gli agenti. Oltre la metà delle righe delle sezioni 1.3, 1.4, 3 e 4 sono [M].
- **Nessun articolo aperto**: i numeri [V] sono quelli del riassunto del risultato (un modello su snippet). Un riassunto può mescolare studi (come per Zabaleta-Korta/Kubo/Maeo nei risultati sul quadricipite): controllare titolo e anno dai link, non dal testo.
- **Popolazioni**: quasi tutti gli studi visti sono su giovani, spesso **non allenati**, spesso donne giovani (Kassiano, Pedrosa) o adulti (Maeo, Kinoshita), 8-12 settimane. Nessuno su over 65, e pochi su allenati. Estendere con cautela.
- **Meccanismo e EMG** (petto alto, larghezza del dorso, brachiale, medio gluteo) non sono crescita.
- **Conflitti di interessi**: RP, Henselmans, Nippard, Norton, Contreras, Helms e SBS vendono programmi, app o coaching (`references/fonti.md`).
- **Le cifre di serie per muscolo e i pesi indiretti** non vengono da studi: sono la sintesi del modello (heuristiche RP/Henselmans, studi visti sul tipo di esercizio). La sezione 3 è un punto di partenza da calibrare con i dati reali dell'app, non una verità.
- **Immagine corporea e salute**: la nota non dà indicazioni mediche; le soglie di rinvio (asimmetria, dolore, segnali) sono prudenziali. Le salvaguardie esistenti hanno sempre la precedenza.

---

## Appendice A. Registro delle 16 ricerche riuscite

Tutte con WebSearch; `allowed_domains` PubMed/PMC/Springer dove indicato. Esito = cosa è stato visto; i numeri sono nel riassunto, non nei testi.

| # | Query (abbreviata) | Filtro | Esito utile |
|---|---|---|---|
| 1 | hypertrophy specialization phase lagging muscle RP maintenance volume | - | RP: 1-2 muscoli prioritari verso l'MRV, max due, 3-4 sedute/sett.; manutenzione non quantificata (siti terzi) |
| 2 | Henselmans lagging muscle specialization sets per week | - | 10-15 serie/sett. tipiche (10-30 in interviste), ≤6 per seduta; titoli su 16/24/32 serie |
| 3 | Nuckols lagging muscle groups weak body part | - | Più frequenza per i muscoli in ritardo; articolo SBS sui muscoli trascurati (titolo non visto) |
| 4 | Zabaleta-Korta regional hypertrophy review | PubMed/PMC/Springer | Lettera (PubMed 34930094) e risposta (35291926); titoli su ipertrofia regionale |
| 5 | Kassiano 2023 gastrocnemius long muscle lengths | PubMed/PMC/Springer | PubMed 37015016; 14,9% contro 6,2% (laterale); titoli su parziali |
| 6 | Maeo 2023 triceps overhead versus neutral | PubMed/PMC/Springer | Eur J Sport Sci 23(7):1240-1250 (numeri non visti) |
| 7 | Maeo hamstrings seated versus lying leg curl | PubMed/PMC/Springer | PMC7969179: +14% contro +9%; PMC11419281 (Nordic contro eccentrico allungato) |
| 8 | incline versus flat bench upper chest regional hypertrophy | PubMed/PMC/Springer | PubMed 36334406, 34644424: EMG e risposte acute; nessuno studio di crescita lungo |
| 9 | Zabaleta-Korta RCT squat leg extension quadriceps | PubMed/PMC | Retto femorale/vasto laterale; PMC13215645; titoli (PMC9737272, PubMed 41379528) |
| 10 | regional hypertrophy review Costa 2024 | PubMed/PMC/Springer | PubMed 38513182 (un sito non basta); PubMed 37559762 (curl inclinato contro Scott) |
| 11 | lat pulldown vs pull-up vs row hypertrophy lat | PubMed/PMC/Springer | Solo EMG (PMC11057623, PMC13510307) |
| 12 | Pedrosa arm curl initial ROM regional | PubMed/PMC/Springer | PMC9960616 / PubMed 36828324: 70% della lunghezza p = 0,001 |
| 13 | Plotkin 2023 hip thrust vs back squat glutes | PubMed/PMC | PMC10349977: crescita dei glutei simile |
| 14 | Kinoshita 2023 standing vs seated calf raise | PubMed/PMC | PMC10753835: gastrocnemi non crescono da seduti |
| 15 | Kubo 2019 squat depth adductor magnus | PubMed/PMC | Glutei +6,7% contro +2,2%, adduttore magno a favore della profondità (riassunto) |
| 16 | rectus femoris leg extension vs squat | PubMed/PMC/Springer | Retto femorale +13,2% contro +1,1% (PMC13215645) |

## Appendice B. Query pronte per la seconda passata (da lanciare con il tetto alzato)

Quando serve il pieno valore: aprire i full text per i punti della sezione 9. Si possono incollare così.

**Specializzazione e volume**
1. `Israetel specialization phase mesocycle MV maintenance volume non-priority muscles`
2. `Helms Muscle and Strength Pyramid specialization lagging muscle` (poi `strongerbyscience.com`, `mennohenselmans.com`, `rpstrength.com` con `allowed_domains`)
3. `muscle group specialization resistance training randomized trial trained lifters arm specialization` (PubMed/PMC)
4. `maintenance resistance training reduced volume muscle size retained 2024 2025` e `Bickel 2011 exercise dosing retain adaptations young older adults`, `Spiering 2021 minimal dose maintain strength`
5. `Pelland 2025 meta-regression fractional set counting indirect sets` e `indirect volume biceps back training hypertrophy fractional sets study`
6. `Gentil adding single-joint exercises multi-joint upper body trained men` e `direct arm training biceps triceps hypertrophy compound exercises`

**Regioni e muscoli piccoli (PubMed/PMC)**
7. `incline bench press hypertrophy upper chest 12 weeks muscle thickness randomized`
8. `latissimus dorsi hypertrophy lat pulldown versus row ultrasound` e `vertical versus horizontal pulling hypertrophy`
9. `lateral raise deltoid hypertrophy cable versus dumbbell lengthened` e `rear deltoid reverse fly hypertrophy`
10. `upper trapezius shrug hypertrophy study`, `forearm wrist curl hypertrophy`, `rectus abdominis hypertrophy ultrasound abdominal training`, `neck muscle hypertrophy resistance training`
11. `gluteus medius hypertrophy abduction training`, `adductor magnus hypertrophy training`, `erector spinae hypertrophy deadlift`
12. `calf training frequency volume hypertrophy trained`, `soleus seated calf raise hypertrophy`, `Kassiano 2024 2025 calf lengthened partials trained`
13. `triceps overhead extension long head Maeo results`, `incline curl preacher curl regional hypertrophy results`, `brachialis hammer curl hypertrophy`
14. `Nordic hamstring versus leg curl hypertrophy biceps femoris long head`

**Genetica, estetica, immagine corporea**
15. `inter-individual variability resistance training hypertrophy responders Hubal 2005 Morton`
16. `FFMI natural limit Kouri 1995 criticism`, `Casey Butt formula validation natural muscular potential`
17. `shoulder to waist ratio attractiveness men`, `waist to hip ratio attractiveness women study`
18. `muscle dysmorphia prevalence weightlifters systematic review`, `strength training women body image fitness apps`
19. `sex differences hypertrophy women men relative Roberts Nuckols Krieger 2020`, `spot reduction abdominal exercise fat loss`

**Simmetria, mobilità, postura, misure**
20. `interlimb asymmetry hypertrophy unilateral training dominant limb muscle size`, `cross education unilateral training weaker limb`, `bilateral versus unilateral resistance training hypertrophy meta-analysis`
21. `range of motion hypertrophy meta-analysis Wolf 2023 partial full`, `ankle dorsiflexion limitation squat depth`
22. `upper crossed syndrome evidence systematic review`, `posture neck shoulder pain association systematic review`
23. `tape measure circumference validity muscle hypertrophy ultrasound DXA`, `photo-based physique assessment reliability`
24. `mind-muscle connection hypertrophy Schoenfeld 2018 attentional focus`

**Video e podcast** (`allowed_domains ["youtube.com"]`, `blocked_domains ["gumroad.com","tiktok.com","pinterest.com"]`)
25. `Nippard lagging muscle bring up weak points` ; `Israetel specialization cycle how to` ; `Henselmans weak points aesthetic proportions`: usare solo per titoli, poi cercare lo studio citato.
