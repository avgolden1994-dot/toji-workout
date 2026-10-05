# Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue)

**Copertura: 0 ricerche web riuscite; il resto da conoscenza del modello (non verificata sul web) e dal confronto con il codice del repo.**

Ambito: come il coach sceglie e sostituisce gli esercizi (`js/coach/biomeccanica.js` BIO-01..07, `js/coach/programma/{motore,schemi,ricette}.js` PRG-10/21/22/23/28, RIC-03, SUG-01..08, `js/coach/questionario-decisioni.js` SOSTITUZIONI) e cosa contiene la libreria (`js/dati/libreria-esercizi.js`, `dettagli-esercizi.js`, `schede-tecniche.js`). Data: 2026-10-05, ramo `claude/fitness-expertise-development-2pptmr`. Codice area proposto per le regole nuove: **SEL** (selezione esercizi; non compare in `docs/`, `js/coach/` né nel catalogo regole: controllato con grep il 2026-10-05).

## 0. STATO DELLA RICERCA: leggere prima di usare questa nota

**Questa nota NON contiene ricerca web nuova.** Il tetto di 200 ricerche web per sessione (condiviso da tutti gli agenti) era già esaurito quando l'agente è partito («used its web search budget (200 of 200)»). Le 4 interrogazioni tentate (PubMed: tricipite sopra la testa, leg curl seduto/sdraiato, hip thrust contro squat, calf raise in piedi/seduto) sono state rifiutate dallo strumento; il coordinatore ha poi confermato il tetto e chiesto di non insistere. Le altre vie (WebFetch, curl, browser) sono bloccate dalla rete (`references/rete.md`): non le ho riprovate né aggirate. **Ricerche riuscite: 0 su 30 richieste.** Per rifare la parte scientifica serve alzare `CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`: le query pronte sono nell'**Appendice A**.

Cosa c'è quindi in questa nota, con etichette che compaiono in ogni tabella:

| Etichetta | Significato | Può diventare regola? |
|---|---|---|
| **[V]** | Verificato leggendo o eseguendo il codice del repo il 2026-10-05 (fatto, non opinione) | Sì (sezione 7, parte A) |
| **[R]** | Citazione già scritta nel repo (`js/`, `docs/`): non ricontrollata in questa sessione | Come già nel repo |
| **[NV]** = «Conoscenza del modello (non verificata sul web)» | Cosa ricordo dalla letteratura: nessun risultato di ricerca lo ha confermato. Cito autore e anno solo dove li ricordo con sicurezza; altrimenti scrivo «autori da ritrovare». **Nessun PMID, DOI, percentuale o citazione di persone.** Solo la direzione dell'effetto | **No**, finché non è ritrovato con titolo, anno, popolazione ed effetto; vale al massimo «Convenzione» |
| **[FIS]** | Ragionamento di meccanica di base (leve, profilo di resistenza), non uno studio | Solo come ragionamento |

Forza: **Solida / Moderata / Convenzione**, più la bandiera **Contrastata** (come in `docs/ricerca-struttura-e-intensita.md`). Per ogni riga [NV] la forza attuale è «Convenzione · Conoscenza del modello (non verificata sul web)»; tra parentesi «ipotesi: X» è il grado che mi aspetto dopo la verifica («Moderata, da verificare»), non quello attuale. Nessun esperto è citato per frase detta: i ruoli sono quelli di `references/fonti.md`.

## 1. Cosa dicono le fonti

### 1.1 Lunghezza muscolare, ROM, profilo di resistenza

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Carico nella parte allungata | Studi con allenamento a lunghezze diverse (stesso muscolo, stessa durata) indicano crescita uguale o maggiore quando il carico cade nella posizione allungata: femorali (leg curl da seduto con anca flessa), tricipite (estensione sopra la testa), gastrocnemio (parziali in allungamento) | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata: RCT singoli, giovani, 8-12 settimane) | Maeo 2021 (femorali), Maeo 2022-23 (tricipite), Pedrosa 2022, Kassiano 2023: conoscenza del modello, non verificata sul web. Nel repo: Maeo 2021 per il leg curl [R] (`NOTE_ATTACCO.legcurl`) |
| Il repo applica già l'allungamento | PRG-10 scambia pushdown→sopra la testa, leg curl sdraiato→seduto, French press→sopra la testa; RIC-03 aggiunge croci/pullover manubri, bulgari, rumeno; `IN_ALLUNGAMENTO` dà +1,5 nella scelta | Come nel repo | [V] `schemi.js:28-34`, `ricette.js:149,168` |
| ROM completo contro parziale | Revisioni sistematiche sul ROM: il ROM completo è almeno pari al parziale; il vantaggio del ROM pieno è più chiaro dove significa più allungamento (arti inferiori); parziali in allungamento competitivi | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Schoenfeld & Grgic 2020; Wolf 2023 (meta-analisi): conoscenza del modello, non verificata sul web |
| Profondità e muscoli dello squat | Il repo scrive che in squat e leg press i femorali quasi non lavorano. Conoscenza del modello (non verificata): squat profondo e parziale fanno crescere quadricipiti, grande gluteo e adduttore magno | Femorali: come nel repo. Il resto: Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Kubo 2019 [R] (commento in `dettagli-esercizi.js:78-79`; il testo del repo non nomina l'adduttore) |
| Profilo di resistenza dell'attrezzo | Peso libero: la tensione dipende dal braccio di leva (alzata laterale: minima in basso, massima in alto). Cavo: quasi costante, spostabile con l'altezza della puleggia. Macchina: dipende dalla camma | Meccanica di base [FIS] | Ragionamento, nessuno studio |
| Cavo e tensione costante | «Croci ai cavi: tensione su tutto il ROM» (+0,5 in `bonusBiomecc`) | Come nel repo; fonte «Menno» non ritrovata | [R] `biomeccanica.js:106` |

### 1.2 Regioni e capi, muscolo per muscolo

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Petto alto/medio/basso | EMG: le fibre claveari lavorano un po' di più a panca inclinata (circa 30°) che a panca piana; le differenze sono piccole. Non ricordo uno studio di training che mostri crescita regionale diversa. EMG non prova la crescita (bandiera rossa di `fonti.md`) | Convenzione · Conoscenza del modello (non verificata sul web) · **Contrastata** (da verificare; ipotesi: Convenzione) | Barnett 1995, Lauver 2016 (autore e anno ricordati con una certa sicurezza); altri studi EMG: autori da ritrovare |
| Petto «basso» (dip, declinata, croci dall'alto) | Pratica comune; EMG deboli; nessuna prova di crescita regionale | Convenzione | Pratica |
| Pullover | EMG: lavora pettorale e gran dorsale; nessun dato di crescita ricordato. Nel repo lo stesso movimento è una volta «petto» e una volta «dorsali» [V, sezione 5] | Convenzione · Conoscenza del modello (non verificata sul web) | EMG: conoscenza del modello, non verificata sul web |
| Dorsali: trazioni e lat machine | EMG sovrapponibili; larghezza e orientamento della presa cambiano poco l'attivazione | Come nel repo (EMG 2025, sette varianti) | [R] `NOTE_ATTACCO.lat` |
| Spessore: presa del pulley | Presa stretta: più dorsali; larga: trapezio e deltoidi posteriori; supina: bicipite | Come nel repo (Padovan 2026, EMG) | [R] `NOTE_ATTACCO.pulley` |
| Deltoide laterale | Il manubrio carica soprattutto in alto; il cavo (puleggia bassa) sposta tensione in basso. Lavoro in allungamento (alzate con ROM parziale in basso) discusso | Meccanica [FIS]; allungamento Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Ragionamento; studi sul lavoro allungato: autori da ritrovare |
| Deltoide anteriore | Riceve già molto dalle spinte; le alzate frontali sono ridondanti per chi spinge | Convenzione. Il repo lo scrive già nel cue delle alzate frontali | [V] `schede-tecniche.js` (cue «Alzate Frontali») |
| Deltoide posteriore e cuffia | Reverse fly, pec deck inverso e face pull lavorano deltoide posteriore, romboidi e extrarotatori; la funzione «cuffia» del face pull è per convenzione | Convenzione | Pratica; EMG: conoscenza del modello, non verificata sul web |
| Tricipite: capo lungo | Estensione sopra la testa > pushdown per la crescita complessiva del tricipite, soprattutto capo lungo | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Maeo 2022-23: conoscenza del modello, non verificata sul web. Nota del repo senza fonte [R] `NOTE_ATTACCO.tricipitisopra` |
| Tricipite: attacchi | Barra dritta e corda: capi laterale e mediale; avambraccio supinato: più capo lungo, meno ripetizioni | Come nel repo | [R] Villalba 2024 (`NOTE_ATTACCO.pushdown`) |
| Bicipite: capi e posizione | La panca inclinata (braccio dietro il busto) allunga il capo lungo; Scott e Spider caricano la parte accorciata. «Capo lungo» e «capo corto» non si isolano davvero: è lessico di palestra | Convenzione; il repo usa Pedrosa 2025 per Scott/Spider [R] | [R] `NOTE_ATTACCO.curlinclinato`, PRG-23 |
| Gomito: articolazione singola contro multipla | Per i flessori del gomito l'esercizio a una sola articolazione fa crescere più del multiarticolare (trazioni, rematori) | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Mannarino 2021: conoscenza del modello, non verificata sul web |
| Brachiale e brachioradiale | Presa neutra e corda aumentano il lavoro di brachiale e brachioradiale | Come nel repo (EMG 2023) | [R] `NOTE_ATTACCO.curlcavo` |
| Quadricipiti: retto femorale | Con schienale reclinato (anca circa 40°) il leg extension carica di più il retto femorale; i vasti non cambiano | Come nel repo (Larsen 2024) | [R] `NOTE_ATTACCO.legext` |
| Femorali: flessione del ginocchio e estensione dell'anca | Leg curl e stacchi/rumeno caricano parti diverse dei femorali; servono entrambi | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | studi su stacco, leg curl e Nordic con misura dell'ipertrofia dei femorali: autori da ritrovare |
| Nordic curl e infortuni dei femorali | Riduce gli strappi in modo marcato nelle meta-analisi, ma l'aderenza è bassa | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | van Dyk 2019 (meta-analisi): conoscenza del modello, non verificata sul web |
| Glutei: hip thrust contro squat | Hip thrust e squat portano crescita simile del grande gluteo in RCT; l'hip thrust ha EMG alto nella parte alta del movimento | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) · **Contrastata** (EMG contro crescita) | Contreras 2015 (EMG), Plotkin 2023 (RCT; anno da confermare): conoscenza del modello, non verificata sul web |
| Medio gluteo | Abduzioni, plank laterale, affondi: lavoro del medio gluteo; poca prova di crescita diretta | Convenzione | Pratica |
| Adduttori | Il repo mette gli adduttori tra i secondari di squat e leg press (`DETTAGLI`). Conoscenza del modello (non verificata): l'adduttore magno è anche un estensore dell'anca e cresce con lo squat, non è solo «interno coscia» | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Kubo 2019 (dal repo [R], a proposito del solo squat); autori degli altri studi da ritrovare |
| Polpacci: gambe tese e piegate | In piedi: gastrocnemio; da seduto (ginocchio piegato): soleo. Il repo scrive che in piedi il gastrocnemio cresce «il doppio» | Come nel repo; non ricontrollata | [R] Kinoshita 2023 (`biomeccanica.js:107`). Kassiano 2023 (parziali in allungamento sul gastrocnemio; autore e anno da confermare): conoscenza del modello, non verificata sul web |
| Addominali | EMG alto per ab wheel, hanging leg raise con inclinazione del bacino, crunch al cavo. Non esistono parti «alta» e «bassa» davvero distinte. Prove di crescita dell'addome con lavoro diretto: scarse | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Convenzione) | studi EMG su esercizi addominali: autori da ritrovare |
| Core: anti-estensione, anti-rotazione | Plank, dead bug, bird dog, Pallof, side plank sono la base «McGill» per la schiena; prova diretta di prevenzione del mal di schiena limitata | Convenzione; il repo cita McGill [R] | [R] `SCALE_DOLORE.schiena`; McGill: conoscenza del modello, non verificata sul web |

### 1.3 Tecnica, leve, antropometria

| Tema | Cosa risulta | Forza | Fonte (anno) |
|---|---|---|---|
| Larghezza dei piedi e angolo delle punte nello squat | Cambiano poco l'attivazione di quadricipiti e glutei; larghezza maggiore: un po' più adduttori/glutei. La scelta migliore è quella in cui si scende più in basso senza fastidi (BIO-04) | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata per «differenze piccole») | studi EMG sulla larghezza dei piedi nello squat: autori da ritrovare |
| Bilanciere alto o basso | Basso: busto più inclinato, più anca e lombare. Alto: più ginocchio e quadricipiti, busto più dritto | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Glassbrook 2017: conoscenza del modello, non verificata sul web |
| Stacco sumo contro convenzionale | Sumo: busto più eretto, momento lombare minore, più quadricipiti e adduttori; convenzionale: più erettori e femorali. Scelta per leve e comfort | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | studi biomeccanici sumo contro convenzionale: autori da ritrovare |
| Presa alla panca | Presa larga: ROM più corto, più pettorale e deltoide; stretta: più tricipite e gomiti | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | studi sulla larghezza della presa alla panca: autori da ritrovare |
| Angolo della panca inclinata | Circa 30° tiene il lavoro sul petto alto; angoli alti spostano sul deltoide anteriore | Convenzione · Conoscenza del modello (non verificata sul web) | Lauver 2016: conoscenza del modello, non verificata sul web. Il repo usa già 30° [V] |
| Schiena neutra nello stacco | Il rischio della flessione lombare «sotto carico» è discusso: la posizione neutra resta il default insegnato, ma piccole flessioni non sono di per sé un pericolo | Convenzione · Conoscenza del modello (non verificata sul web) · **Contrastata** | Barbell Medicine (ruolo da `fonti.md`), McGill: da verificare |
| Antropometria (femore, busto, braccia) | Le lunghezze dei segmenti spiegano solo una parte della forza nello squat; la «regola del femore lungo» è in gran parte folklore: si adatta posizione e inclinazione | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Vigotsky (squat e determinanti antropometrici; anno da confermare): conoscenza del modello, non verificata sul web |

### 1.4 Scelta dello strumento

| Tema | Cosa risulta | Forza | Fonte (atteso) |
|---|---|---|---|
| Macchine contro pesi liberi (ipertrofia) | Crescita simile; i pesi liberi danno più trasferimento di forza nei test specifici | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Schwanbeck 2020; una revisione più recente sul tema: autori da ritrovare. Conoscenza del modello, non verificata sul web |
| Unilaterale contro bilaterale | Ipertrofia simile a volume pari; l'unilaterale riduce il carico sulla schiena e aiuta la correzione dei lati; non è per la forza massima | Convenzione · Conoscenza del modello (non verificata sul web) | Pratica; revisioni: da cercare |
| Catena chiusa contro aperta | Squat e leg extension fanno crescere entrambi i quadricipiti; il leg extension aggiunge il retto femorale; lo squat da solo non fa crescere i femorali (Kubo 2019 [R]) | Come nel repo | [R] PRG-23 |
| Varietà degli esercizi | Variare esercizi dentro lo stesso muscolo può aiutare la crescita regionale; non serve cambiare spesso | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Kassiano 2022 (revisione; autore e anno da confermare): conoscenza del modello, non verificata sul web |

### 1.5 Core, cuffia, collo, avambracci

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Prevenzione alla spalla (extrarotazioni, face pull) | Programmi di rinforzo riducono infortuni di spalla in atleti overhead; negli allenati «da palestra» la prova è debole | Convenzione · Conoscenza del modello (non verificata sul web) | Revisioni: da cercare |
| Collo | Nessuna prova ricordata con sicurezza; pratica di lotta/rugby | Convenzione · Conoscenza del modello (non verificata sul web) | Da cercare |
| Avambracci e presa | Il lavoro dell'avambraccio arriva da farmer walk, trazioni, stacchi; curl da polso: pratica comune | Convenzione | Pratica |

### 1.6 Cue e attenzione

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Focus esterno e interno | L'attenzione a un effetto sull'ambiente (il peso, il pavimento) migliora prestazione e apprendimento motorio più dell'attenzione al corpo | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Solida per la prestazione motoria; Moderata per la forza) | Wulf 2013 (revisione): conoscenza del modello, non verificata sul web |
| «Mind-muscle» per l'ipertrofia | Attenzione al muscolo: crescita maggiore sul bicipite (isolamento), non sul quadricipite (multiarticolare); EMG maggiore sul pettorale/tricipite con attenzione al muscolo a carichi bassi | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata, n piccolo) | Schoenfeld 2018; Calatayud 2016: conoscenza del modello, non verificata sul web |
| Come il repo lo applica | Esterno sui fondamentali, «senti il muscolo» sugli isolamenti, 2-3 s di discesa | Come nel repo | [V] BIO-01 (`biomeccanica.js:14-33`) |
| Tempo di ripetizione | Crescita simile tra tempi da circa 0,5 a 8 s a parità di sforzo; 2-3 s in discesa è una scelta prudente per principianti | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Schoenfeld 2015 (revisione): conoscenza del modello, non verificata sul web |

### 1.7 Casa e attrezzatura minima

| Tema | Cosa risulta | Forza | Fonte |
|---|---|---|---|
| Carichi bassi con ripetizioni alte | A parità di vicinanza al cedimento, carichi leggeri e pesanti fanno crescere in modo simile: rende utili manubri leggeri e corpo libero | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Solida) | Meta-analisi sui carichi bassi e alti (Schoenfeld; anno 2017 da confermare); il registro di `SKILL.md` ne cita una del 2017 senza il titolo |
| Push-up contro panca | Crescita del pettorale simile a parità di sforzo | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | Kikuchi & Nakazato 2017: conoscenza del modello, non verificata sul web |
| Elastici contro pesi | Con volume e sforzo equiparati le differenze di crescita sono piccole | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata) | studi e revisioni su elastici e pesi: autori da ritrovare. Conoscenza del modello, non verificata sul web |
| Set minimo per casa | Manubri regolabili + panca regolabile + sbarra per trazioni coprono ogni regione; con elastici si coprono i vuoti (dorsali, laterali, bicipiti) | Convenzione [FIS] | Sezione 3 |

## 2. Dove le fonti non concordano

| # | Posizione A | Posizione B | Cosa adotta il coach e perché |
|---|---|---|---|
| D1 | **Il repo contro se stesso sulle croci.** BIO-05 premia i cavi (+0,5: tensione costante). RIC-03 premia le croci coi manubri (+1,5 «allungamento») e scambia «Croci ai Cavi» con «Croci su Panca Manubri» [V `biomeccanica.js:106`, `schemi.js:30-31,33`] | Dibattito pubblico noto: tensione costante (cavo) contro tensione nella parte allungata (manubri, macchina con camma): [NV] | **Decisione da prendere** (sezione 8). Proposta prudente: nessuno dei due vince; ordinare per PRIORI e lasciare la scelta a chi ha l'attrezzo. Forza: Contrastata |
| D2 | Il petto ha 3 regioni distinte (alto/medio/basso): è così nelle classi del repo (`MUSCOLI.petto_*`) | EMG: differenze piccole, nessuna prova di crescita regionale [NV] | Tenere le 3 etichette per spiegare, ma **non usarle come muro** nelle alternative (sezione 4): a casa un push-up non ha alternative [V] |
| D3 | Hip thrust come fondamentale dei glutei (Contreras: area di competenza da `fonti.md`) | Crescita simile a squat e affondi a parità di volume (RCT 2023 [NV]); i movimenti che allungano il gluteo (bulgari, rumeno, squat profondo) contano | Tenere hip thrust ≥1 a settimana per l'obiettivo glutei (PRG-22 [R]) e almeno un movimento «allungato». Forza: Contrastata |
| D4 | Gambe tese e piegate sono due muscoli (gemello e soleo) | Il repo li mette nella stessa classe `polpacci` e li scambia [V] | Tenere entrambi nel piano; se ne entra uno solo, quello a gambe tese (BIO-05 [R]) |
| D5 | Schiena neutra sempre (testo delle schede) | Flessione lombare non è di per sé pericolosa; contano carico e progressione [NV] | Tenere «schiena neutra» come regola didattica per principianti; non usare toni di allarme |
| D6 | Cue interno («senti il muscolo») sugli isolamenti | Cue esterno sempre migliore per la prestazione (Wulf) [NV] | Come ora: esterno sui fondamentali, interno sugli isolamenti |
| D7 | Capi del bicipite e del tricipite «isolabili» con presa e posizione | Gli EMG non separano i capi; contano la posizione di allungamento e il ROM [NV] | Parlare di «posizione allungata» e non di «capo corto/picco» |
| D8 | Il bicipite: il repo spinge insieme l'allungato (incline, Bayesiano: +1,5) e l'accorciato (Scott/Spider: PRG-23 «Pedrosa 2025») [V] | Un solo asse (allungamento) con prove migliori [NV] | Da decidere con la fonte di PRG-23 in mano (sezione 8) |
| D9 | Alzate frontali e tirate al mento nella libreria e nelle alternative [V] | Ridondanti (frontali) e a rischio per la spalla (tirate al mento): pratica prudente [NV] | Frontali e tirate al mento in fondo alla classifica; mai come alternativa automatica delle alzate laterali |
| D10 | Addominali con lavoro diretto (crunch, leg raise) | Lavoro «anti» (plank, Pallof, ab wheel): più sicuro per la schiena; il lavoro diretto serve per l'obiettivo estetico | Entrambi nel core, poco volume (2-6 serie); non vendere «addome basso» |

Persone da cercare per i disaccordi (ruolo da `fonti.md`; **nessuna posizione è attribuita**, non ho potuto leggere nulla): Contreras (glutei, EMG; D3), Beardsley (meccanismi, tensione e lunghezza; D1, D7), Nippard (riassunti di studi recenti; D1), Henselmans (scelta esercizi; D2, D9), Israetel (euristiche di volume e tier list; D2), Nuckols (articoli lunghi e critici; D1, D6), Baraki (scetticismo; D5).

## 3. Matrice muscolo → esercizi migliori

Come leggerla. «Classifica» = ordine proposto con la ragione; i nomi sono quelli della libreria (chiave di `DETTAGLI`); **(manca)** = non esiste nella libreria. Le colonne P / M / C sono palestra, solo manubri (+panca regolabile), corpo libero e casa (elastici dove serve). Forza di tutta la matrice: Convenzione, a meno di [R] o [V]. Il profilo di resistenza è ragionamento di meccanica [FIS].

### 3.1 Petto

| Regione | Classifica (e perché) | Profilo di resistenza | Varianti | Da includere sempre |
|---|---|---|---|---|
| Fasci alti (claveari) | 1 Panca Inclinata Manubri (30°, ROM lungo); 2 Panca Inclinata Bilanciere; 3 Piegamenti Declinati (Piedi Rialzati); 4 Croci ai Cavi dal Basso; 5 Landmine Press (spalle) | Manubri: tensione in basso (allungamento) e meno in alto; cavo dal basso: tensione in alto | P: tutte; M: Panca Inclinata Manubri, Piegamenti Declinati; C: Piegamenti Declinati (serve un rialzo); (manca) chest press inclinata alla macchina | Un movimento inclinato (30°) se il piano ha 2+ esercizi di petto |
| Medio (sternale) | 1 Panca Piana Manubri (scende più in basso del bilanciere); 2 Panca Piana Bilanciere; 3 Chest Press Machine; 4 Piegamenti a Terra (Push-up); 5 Pectoral Machine (Butterfly) | Bilanciere: leva massima a metà; macchina: camma | P: tutte; M: Panca Piana Manubri, Piegamenti; C: Piegamenti a Terra, Piegamenti Inclinati (regressione); (manca) Floor press manubri (senza panca) | Una spinta orizzontale multiarticolare (PRG-21 [R]) |
| Fasci bassi | 1 Dip alle Parallele (busto in avanti: da spalle sane); 2 Panca Declinata; 3 Piegamenti Inclinati (Mani Rialzate); 4 Croci ai Cavi Alti (Parte Bassa) | Dip: carico del corpo, tensione in basso | P: tutte; M: nessuna (Dip su Panca è per il tricipite); C: Piegamenti Inclinati, Dip (serve parallele) | Nessuno obbligatorio: i fasci bassi lavorano già nella panca piana |
| Aperture (allungamento) | 1 Croci su Panca Manubri; 2 Croci ai Cavi da Seduto; 3 Croci ai Cavi; 4 Pectoral Machine (Butterfly); 5 Pullover con Manubrio | Manubri: massimo in basso, nulla in alto; cavo: costante | P: tutte; M: Croci su Panca Manubri; C: (manca) croci con elastico | Un movimento che carichi il pettorale allungato (panca manubri profonda o croci) per chi cerca massa: D1 |

### 3.2 Schiena

| Regione | Classifica | Profilo di resistenza | Varianti | Da includere sempre |
|---|---|---|---|---|
| Dorsali (tirata verticale) | 1 Trazioni alla Sbarra / Presa Neutra (ROM completo, discesa fino a braccia quasi tese); 2 Lat Machine (+ Triangolo, + a un Braccio); 3 Trazioni Assistite (Macchina); 4 Lat Machine Presa Inversa; 5 Pulldown a Braccia Tese / Pullover ai Cavi (isolamento) | Pulldown: tensione costante; trazione: massima in basso | P: tutte; M: solo trazioni (**serve la sbarra**); C: trazioni, Rematore Inverso; (manca) Trazioni con elastico, Lat pulldown con elastico, Pullover manubrio come dorsali | Una tirata verticale a settimana (PRG-21 [R]) |
| Spessore (tirata orizzontale) | 1 Rematore con Petto Appoggiato; 2 Rematore alla Macchina; 3 Pulley Basso (+ varianti di presa); 4 Rematore con Manubrio; 5 Rematore con Bilanciere / T-Bar Row | Rematore a petto appoggiato: meno fatica sui lombari (rapporto stimolo/fatica, pratica) | P: tutte; M: Rematore con Manubrio, Rematore con Petto Appoggiato (panca inclinata); C: Rematore Inverso (barra bassa o anelli) | Una tirata orizzontale (PRG-21 [R]) |
| Erettori | 1 Hyperextension (Lombari); 2 Stacco da Terra; 3 Stacco Rumeno / Good Morning (carico leggero) | Isometrici in rematori e stacchi | P: tutte; M: (manca) good morning a manubri; C: Bird Dog, Hyperextension (serve panca) | Nessuno obbligatorio: lavorano già in stacchi e rematori |
| Trapezio (alto, medio, basso) | 1 Scrollate (Shrug) (unica); 2 Face Pull (medio); 3 Y-Raise su Panca Inclinata (basso); 4 Rematore a gomiti larghi | Scrollate: carico verticale | P: tutte; M: Scrollate (**manca la versione a manubri**), Y-Raise; C: nessuna | Il trapezio medio e basso arriva da tirate e face pull; scrollate solo se obiettivo estetico |

### 3.3 Spalle

| Regione | Classifica | Profilo di resistenza | Varianti | Da includere sempre |
|---|---|---|---|---|
| Anteriore | 1 Lento Avanti Manubri; 2 Shoulder Press Machine; 3 Military Press; 4 Landmine Press (spalla che non tollera l'overhead); 5 Alzate Frontali (ultima: ridondante) | Press: tutto il ROM | P: tutte; M: Lento Avanti, Arnold, Alzate Frontali, Pike Push-up; C: Pike Push-up (**unica**) | Una spinta verticale a settimana (PRG-21 [R]); niente isolamento frontale necessario |
| Laterale | 1 Alzate Laterali ai Cavi; 2 Alzate Laterali alla Macchina; 3 Alzate Laterali (manubri); 4 Alzate laterali da seduto/inclinate (manca); mai come sostituto automatico: Tirate al Mento | Manubrio: tensione minima in basso; cavo bassa puleggia: tensione in basso | P: tutte; M: **solo Alzate Laterali** (nessuna alternativa); C: **nessuna** (manca elastico) | Una alzata laterale per chi cerca spalle larghe (PRG-23 [R]) |
| Posteriore e cuffia | 1 Reverse Pec Deck; 2 Alzate Posteriori (Reverse Fly); 3 Face Pull; 4 Y-Raise su Panca Inclinata; (manca) extrarotazione con elastico/cavo | Pec deck: traiettoria guidata | P: tutte; M: Alzate Posteriori, Y-Raise; C: **nessuna** | Posteriore ≥1 nella seduta di tirate (`isoDeltP` [V]) |

### 3.4 Braccia

| Regione | Classifica | Profilo di resistenza | Varianti | Da includere sempre |
|---|---|---|---|---|
| Bicipite | 1 Curl Bayesiano ai Cavi; 2 Curl su Panca Inclinata (allungato); 3 Curl su Panca Scott o Spider Curl (accorciato: D8); 4 Curl con Bilanciere EZ; 5 Curl ai Cavi | Inclinato/Bayesiano: tensione in allungamento; Scott: massima a metà-basso | P: tutte; M: Curl su Panca Inclinata, Spider Curl, Curl Manubri Alternato; C: **nessuna** (manca elastico, Rematore Inverso presa supina) | Un curl in allungamento a settimana; PRG-23 aggiunge Scott/Spider [R] |
| Brachiale/brachioradiale | 1 Hammer Curl; 2 Curl ai Cavi con Corda (Presa Martello); 3 Curl Inverso con Bilanciere EZ | Neutra: più brachiale (EMG 2023 [R]) | P: tutte; M: Hammer Curl (**nessuna alternativa**); C: nessuna | Non necessario se ci sono trazioni a presa neutra e curl |
| Tricipite | 1 Estensione Tricipiti sopra la Testa ai Cavi; 2 Estensione sopra la Testa con Manubrio; 3 Pushdown con Corda; 4 French Press; 5 Panca Presa Stretta / Dip su Panca | Sopra la testa: tensione in allungamento (capo lungo) | P: tutte; M: Estensione sopra la Testa con Manubrio, Kickback, French Press (**manca la versione a manubri**); C: Dip su Panca, Piegamenti a Diamante | Almeno un'estensione sopra la testa (PRG-10 e PRIORI 3 già lo spingono [R]) |
| Avambracci/presa | 1 Farmer Walk; 2 Curl Inverso con Bilanciere EZ; 3 (manca) wrist curl e reverse wrist curl; 4 (manca) dead hang | Costante | P/M: Farmer Walk; C: (manca) dead hang | Facoltativo |

### 3.5 Gambe e glutei

| Regione | Classifica | Profilo di resistenza | Varianti | Da includere sempre |
|---|---|---|---|---|
| Quadricipiti (vasti) | 1 Hack Squat; 2 Pendulum Squat; 3 Leg Press (profondità massima senza staccare il bacino); 4 Squat con Bilanciere; 5 Affondi Bulgari / Affondi Manubri | Hack/Pendulum: carico in profondità con schiena protetta | P: tutte; M: Goblet Squat, Affondi, Step-up; C: Squat a Corpo Libero, Affondi Inversi, Sissy Squat | Un multiarticolare di ginocchio (PRG-21 [R]) |
| Retto femorale | 1 Leg Extension (schienale reclinato [R]); 2 Sissy Squat; 3 (manca) Reverse Nordic | Leg extension: massimo in estensione | P: Leg Extension; M/C: Sissy Squat, Wall Sit | Leg Extension per massa o glutei (PRG-23 [R]) |
| Femorali: flessione del ginocchio | 1 Leg Curl Seduto (allungato [R]); 2 Leg Curl Sdraiato; 3 Nordic Curl (difficile; infortuni) | Seduto: femorale allungato | P: tutte; M: **solo Nordic Curl** (serve ancoraggio); C: Nordic (manca leg curl con scivolamento) | Un leg curl (PRG-23 [R]) |
| Femorali: estensione dell'anca | 1 Stacco Rumeno; 2 Good Morning (carico leggero); 3 Stacco da Terra / Trap Bar; 4 Pull-Through ai Cavi; (manca) Stacco Rumeno a manubri e a una gamba | Rumeno: massimo in basso (allungamento) | P: tutte; M/C: **nessuna** (tutti sono bilanciere o cavo); (manca) RDL manubri | Un hinge a settimana (PRG-21 [R]) |
| Grande gluteo | 1 Hip Thrust (e alla Macchina); 2 Affondi Bulgari (+ Multipower piede rialzato); 3 Stacco Rumeno; 4 Squat profondo; 5 Pull-Through ai Cavi | Hip thrust: massimo in alto (accorciato) | P: tutte; M: Affondi Bulgari, Ponte Glutei, Hyperextension 45° (serve panca); (manca) **Hip Thrust a manubri**; C: Ponte Glutei a una Gamba | Un movimento in alto (hip thrust) + uno allungato (bulgari/rumeno): D3 |
| Medio gluteo | 1 Abductor Machine; 2 Abduzioni ai Cavi; 3 Slanci Laterali a Terra; 4 Plank Laterale | Macchina: guidata | P: tutte; M/C: Slanci Laterali a Terra (**unica**); (manca) cammino laterale con elastico | Facoltativo; utile con affondi e squat unilaterali |
| Adduttori | 1 Adductor Machine; 2 Squat Sumo (manubri); 3 Squat/Leg Press profondi (adduttore magno) [R]; (manca) Cossack squat, Copenhagen | Macchina: guidata | P: Adductor Machine; M: Squat Sumo (**nessuna alternativa**); C: **nessuna** | Non necessario con squat profondi |
| Polpacci | 1 Calf Raise in Piedi (o a un Piede, con manubrio manca); 2 Calf Raise alla Leg Press; 3 Calf Raise Seduto (soleo) | In piedi: massimo in allungamento | P: tutte; M: Calf Raise a un Piede (Corpo Libero) (**unica**); C: stessa | Gambe tese sempre; piegate solo se ci sono ≥2 esercizi o ≥6 serie/settimana (SEL-08) |
| Tibiale anteriore | (manca) Tibialis raise | | | Facoltativo |

### 3.6 Core

| Regione | Classifica | Profilo | Varianti | Da includere sempre |
|---|---|---|---|---|
| Retto dell'addome | 1 Crunch al Cavo; 2 Ab Wheel (anti-estensione); 3 Leg Raise alla Sbarra (inclinare il bacino); 4 Hollow Hold; 5 Crunch a Terra | Cavo: carico progressivo | P: tutte; M: Crunch a Terra, Hollow Hold; C: Hollow Hold, Leg Raise a Terra; (manca) reverse crunch | Un movimento anti-estensione + uno di flessione a settimana (SEL-07) |
| Obliqui/anti-rotazione | 1 Pallof Press; 2 Plank Laterale; 3 Woodchop ai Cavi (Rotazioni); 4 Russian Twist (da evitare con mal di schiena); (manca) suitcase carry | Pallof: isometrico | P: tutte; M/C: Plank Laterale; | Un movimento «anti» a settimana |
| Stabilità | 1 Dead Bug; 2 Bird Dog; 3 Plank; 4 Farmer Walk | Isometrico/controllato | tutti: Dead Bug, Bird Dog, Plank | Base per principianti e schiena (BIO-06 [R]) |

### 3.7 Casa: set minimi

| Set | Cosa copre bene | Buchi nella libreria attuale | Aggiunte a più alto rendimento |
|---|---|---|---|
| Manubri + panca regolabile | Petto (piana/inclinata), spalle, spessore (rematore a un braccio), quadricipiti (goblet, bulgari, affondi), bicipiti, tricipiti | Hinge e glutei (nessun RDL o hip thrust a manubri), femorali, dorsali, laterale (1 esercizio), polpacci | Hip Thrust a manubrio, RDL a manubri (anche a una gamba), Floor Press, Calf Raise a manubrio, Scrollate a manubri |
| + sbarra per trazioni | Dorsali (trazioni, presa neutra), bicipiti (chin-up) | Con la sbarra ci sono solo 3 esercizi dorsali (tutte trazioni); regressioni assenti | Trazioni negative, Rematore Inverso presa supina |
| Elastici (non nel setup dell'app) | Chiude i vuoti: dorsali, laterale, posteriore, bicipiti, tricipiti, glutei | Intera categoria assente (`ATTREZZI_PALESTRA` ha solo bilanciere, manubri, macchine, sbarra) | Lat pulldown, alzate laterali, face pull, curl, estensioni, abduzioni, croci con elastico |
| Corpo libero puro | Gambe, petto (push-up), core | Zero esercizi per deltoide laterale e posteriore, bicipiti, brachioradiale, adduttori, trapezio; un solo esercizio per petto medio, petto alto, deltoide anteriore, polpacci, femorali (Nordic) | Elastici o asciugamano: leg curl con scivolamento, Rematore Inverso presa supina |
| Sospensione (TRX/anelli) | Rematore, push-up, face pull, leg curl, squat assistito | Intera categoria assente | Non prioritaria finché non ci sono gli elastici |

## 4. Classi di equivalenza e sostituti

**Come usare questa tabella.** Oggi `alternativeStessoMuscolo` (`motore.js:79`) confronta l'id di `MUSCOLI` (23 classi): vale per palestra, ma a casa molte classi restano con 1 solo esercizio e quindi **nessuna alternativa** [V]. Proposta (SEL-04): se la classe stretta dà meno di 2 alternative nell'ambiente, scendere alla **classe larga** qui sotto, con penalità e con l'etichetta «stesso movimento, regione vicina». Le colonne «Stretta» sono gli id di `MUSCOLI` che la compongono.

| Classe larga | Stretta (id `MUSCOLI`) | Membri (libreria) in ordine di preferenza come sostituti | Non scambiare perché |
|---|---|---|---|
| EQ-PETTO-SPINTA | petto_medio, petto_alto, petto_basso | Panca Piana Manubri, Chest Press Machine, Panca Piana Bilanciere, Panca Inclinata Manubri, Piegamenti a Terra, Piegamenti Inclinati, Piegamenti Declinati, Dip alle Parallele | Dip e declinata: non con spalla dolente (RISCHIO) |
| EQ-PETTO-APERTURA | petto_medio (isolamento) | Croci su Panca Manubri, Croci ai Cavi da Seduto, Croci ai Cavi, Pectoral Machine (Butterfly) | Con Pullover solo se si decide la classe (P1) |
| EQ-DORSALI-VERT | dorsali | Trazioni (tutte le prese), Lat Machine (tutte), Lat Machine a un Braccio, Trazioni Assistite; fallback: Pulldown a Braccia Tese, Pullover ai Cavi | Pulldown braccia tese: isolamento, non sostituisce una tirata pesante |
| EQ-SPESSORE | schiena_spessore | Rematore con Petto Appoggiato, Rematore alla Macchina, Pulley Basso (e varianti), Rematore con Manubrio, T-Bar Row, Rematore con Bilanciere, Rematore Inverso | Con schiena bassa dolente: no bilanciere/T-Bar (RISCHIO) |
| EQ-SQUAT-BILAT | quadricipiti (multi) | Hack Squat, Pendulum Squat, Leg Press, Squat con Bilanciere, Squat al Multipower, Front Squat, Goblet Squat, Squat a Corpo Libero | Con caviglia rigida: no bilanciere/front (BIO-05) |
| EQ-AFFONDO-UNILAT | quadricipiti/grande_gluteo (lato) | Affondi Inversi, Affondi Manubri, Affondi in Camminata, Step-up su Panca, Affondi Bulgari, Affondi al Multipower | Ginocchio dolente: no affondi in avanti |
| EQ-QUAD-ISO | quadricipiti (iso) | Leg Extension, Sissy Squat, Wall Sit | Wall Sit è isometrico: non scambia con Leg Extension a pari carico |
| EQ-HINGE-ANCA | grande_gluteo/femorali (hinge) | Stacco Rumeno, Pull-Through ai Cavi, Good Morning (carico leggero), (manca) RDL manubri/una gamba | Mai Stacco da Terra come sostituto con schiena dolente |
| EQ-STACCO-TOTALE | famiglia `catena_totale` | Stacco da Terra, Stacco con Trap Bar, Stacco Sumo | **Non** come alternativa dei soli quadricipiti (P2) |
| EQ-GLUTEO-SPINTA | grande_gluteo (spinta) | Hip Thrust, Hip Thrust alla Macchina, Ponte Glutei, Ponte Glutei a una Gamba, Hyperextension a 45° per Glutei | |
| EQ-FEM-GINOCCHIO | femorali (ginocchio) | Leg Curl Seduto, Leg Curl Sdraiato, Nordic Curl | **Non** Good Morning (P5) |
| EQ-POLP-TESI | polpacci (gambe tese) | Calf Raise in Piedi, Calf Raise alla Leg Press, Calf Raise a un Piede (Corpo Libero) | |
| EQ-POLP-PIEGATE | polpacci (soleo) | Calf Raise Seduto | Non sostituisce quelli a gambe tese |
| EQ-ABDUTTORI | abduttori | Abductor Machine, Abduzioni ai Cavi, Slanci Laterali a Terra | |
| EQ-ADDUTTORI | adduttori | Adductor Machine, Squat Sumo | |
| EQ-SPINTA-VERT | deltoide_anteriore (spinte) | Shoulder Press Machine, Lento Avanti Manubri, Military Press, Arnold Press, Landmine Press, Pike Push-up | Spalla dolente: Landmine, manubri neutri (BIO-05 [R]); le Alzate Frontali sono isolamento |
| EQ-DELT-LAT | deltoide_laterale | Alzate Laterali ai Cavi, Alzate Laterali alla Macchina, Alzate Laterali | Tirate al Mento solo manuale (P9) |
| EQ-DELT-POST | deltoide_posteriore | Reverse Pec Deck, Alzate Posteriori, Face Pull, Y-Raise su Panca Inclinata | |
| EQ-TRI-ALTO | tricipiti (sopra la testa) | Estensione sopra la Testa ai Cavi, Estensione sopra la Testa con Manubrio | |
| EQ-TRI-GENERALE | tricipiti | Pushdown con Corda, Pushdown Tricipiti ai Cavi, Pushdown con Barra V, Pushdown Presa Inversa, French Press, Kickback Tricipiti, Panca Presa Stretta, Dip su Panca, Piegamenti a Diamante, Dip alla Macchina | Gomito dolente: no French Press, Panca Presa Stretta |
| EQ-BICIPITE-ALLUNGATO | bicipiti | Curl Bayesiano ai Cavi, Curl su Panca Inclinata | |
| EQ-BICIPITE-GENERALE | bicipiti | Curl Bilanciere EZ, Curl Bilanciere, Curl ai Cavi, Curl Manubri Alternato, Curl su Panca Scott, Spider Curl, Curl di Concentrazione, Curl alla Macchina (Scott), Curl Zottman | |
| EQ-FLESSORI-GOMITO | bicipiti + brachioradiale | tutti i curl, Hammer Curl, Curl Inverso | **Fallback**: Hammer Curl oggi non ha alternative a casa (P3) |
| EQ-CORE-FLESSIONE | addome, addome_basso | Crunch al Cavo, Crunch alla Macchina, Crunch a Terra, Sit-up, Leg Raise (sbarra, terra, sedia), Hollow Hold, Ab Wheel | Mal di schiena: no Sit-up (SEL-11) |
| EQ-CORE-ANTI | obliqui, stabilita | Pallof Press, Plank Laterale, Woodchop ai Cavi, Plank, Dead Bug, Bird Dog, Farmer Walk | Russian Twist con mal di schiena: no |

Sostituti per zona del dolore (informazione, non diagnosi: dolore acuto, che peggiora, formicolii o perdita di forza → medico, come in `docs/coach-mappa-regole.md` cap. 14). Forza: Convenzione. Il confronto con `SOSTITUZIONI` (`questionario-decisioni.js:50-69`) è nella sezione 5.

| Zona | Cosa evitare di default | Sostituto che mantiene il muscolo | Oggi nell'app | Giudizio |
|---|---|---|---|---|
| Spalla | Dip, Military Press, tirate al mento, Panca Piana Bilanciere | Chest Press Machine, Panca Piana Manubri (presa neutra), Landmine Press, Shoulder Press Machine, Face Pull | Dip → Pushdown (cambia muscolo) | Dip → Chest Press Machine o Piegamenti Inclinati |
| Ginocchio | Squat, affondi in avanti, Leg Extension | Leg Press con ROM senza dolore, Wall Sit, Leg Extension a ROM ridotto (isometrico), Affondi Inversi, Step-up bassi | Quasi tutto → Hip Thrust o Rumeno (si perdono i quadricipiti) | Mantenere un esercizio per i quadricipiti prima di dirottare sui glutei (SEL-10, bloccata) |
| Schiena bassa | Stacco, rematore con bilanciere, Good Morning, Hyperextension | Rematore con Petto Appoggiato, Pulley Basso, Hip Thrust, Leg Press, Plank/Bird Dog | Stacco → Hip Thrust; Rematore → Pulley | Corretto per i carichi; aggiungere Sit-up e Russian Twist agli esercizi da evitare (P11) |
| Gomito | French Press, Panca Presa Stretta, Curl bilanciere dritto | Pushdown con corda, Curl con Bilanciere EZ, Hammer Curl | Curl bilanciere → Hammer Curl; French → Pushdown | Corretto |
| Polso | Front Squat, Curl bilanciere dritto, Push-up a terra | Goblet Squat, Curl EZ, Chest Press Machine, Push-up su maniglie | Front Squat → Goblet | Corretto |
| Anca | Squat profondo, Bulgari, Sumo | Leg Press, Stacco Rumeno, Ponte Glutei | Come ora | Corretto |
| Caviglia | Calf in piedi, affondi, step-up | Calf Raise Seduto, Leg Press | Calf in piedi → seduto | Cambia muscolo (soleo): dirlo |

## 5. Audit della libreria

### 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05)

Totale **140 esercizi** (il cap. 16 di `coach-mappa-regole.md` dice 139: da correggere). Ogni esercizio ha una riga in `DETTAGLI` (140/140) e un muscolo bersaglio.

| Per gruppo | n | Per tipo | n | Per attrezzo (`attrezzoDi`) | n | Per sezione | n |
|---|---|---|---|---|---|---|---|
| petto | 17 | multiarticolare | 63 | macchine e cavi | 55 | M (macchinari e cavi) | 55 |
| schiena | 23 | isolamento | 77 | corpo | 38 | L (pesi liberi) | 47 |
| gambe | 25 | unilaterali (`lato`) | 23 | manubri | 25 | C (corpo libero) | 38 |
| glutei | 15 | | | bilanciere | 22 | | |
| spalle | 16 | | | | | | |
| braccia | 26 | | | | | | |
| core | 18 | | | | | | |

Per muscolo bersaglio (id `MUSCOLI`): quadricipiti 16, schiena_spessore 11, grande_gluteo 11, dorsali 10, petto_medio 9, tricipiti 12, bicipiti 11, deltoide_anteriore 7, addome 6, stabilita 5, femorali 4, polpacci 4, petto_alto 4, petto_basso 4, deltoide_laterale 4, deltoide_posteriore 4, obliqui 4, abduttori 3, brachioradiale 3, addome_basso 3, erettori 2, adduttori 2, **trapezio 1**. Per schema di movimento (`SCHEMI_MOV`): squat 15, hinge 11, spinta orizzontale 11, tirata orizzontale 11, tirata verticale 8, spinta verticale 5; **79 esercizi senza schema** (quasi tutti gli isolamenti, il core, Landmine Press, Panca Presa Stretta, Dip su Panca, Dip alla Macchina, Pull-Through).

**Tag che esistono:** gruppo, tipo (multi/iso), unilaterale (`lato`), a tempo (`tempo`), serie/ripetizioni/peso/recupero di partenza; in `DETTAGLI`: sezione, attrezzo, presa/attacco, sottogruppo, focus, muscoli secondari (testo e id), nota-attacco, bersaglio; in tabelle a parte: schema (regex), isolamento (regex), allungamento (regex), rischio per 3 fastidi (regex), stress per 7 zone (elenchi), sostituzione per zona, preferenza `PRIORI` (60 voci), schiena pesante, bilanciere pesante, famiglie glutei, famiglia stacco; `TECNICA` (muscoli, passi, errori, cue) per **114 su 140**.
**Tag che non esistono:** difficoltà o livello per esercizio (grep: nessuno; nessun filtro per livello nella scelta); attrezzo reale richiesto (panca, sbarra, parallele, ancoraggio, ruota, sedia romana: l'attrezzo è dedotto dal nome con regex `attrezzoDi`); pesi frazionari per esercizio; elastici, kettlebell, anelli; zona del dolore unica (3 fastidi in `RISCHIO`, 7 zone in `STRESS_ZONA`); profilo di resistenza (allungato/accorciato) per esercizio.

### 5.2 Regole in uso (sintesi)

BIO-01 cue per schema (esterno sui fondamentali, «senti il muscolo» sugli isolamenti); BIO-03 cedimento solo su macchine e isolamenti; BIO-04 test caviglia, spalle, larghezza squat; BIO-05 bonus (caviglia rigida → hack/leg press +2; spalle → Landmine +3, Military/Arnold -3; croci ai cavi +0,5; calf in piedi +1); BIO-06 scale di dolore; PRG-10 scambi in allungamento; PRG-21 6 schemi a settimana; PRG-22 4 famiglie glutei; PRG-23 copertura per regioni (femorali, retto femorale, laterali, bicipite); PRG-28 conteggio frazionario 0,5; RIC-03 allungamento per petto, schiena, glutei; SUG-01..08 suggeritore; `alternativeStessoMuscolo` (stesso bersaglio; famiglia per gli stacchi).

### 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta)

| # | Problema | Dove | Effetto | Proposta |
|---|---|---|---|---|
| P1 | **Il conteggio frazionario guarda i gruppi, non i muscoli.** `perGruppo` dà 0,5 se il gruppo dell'esercizio ha il gruppo contato tra i `synergists` di `MUSCLE_GROUPS`. Esempi: stacco da terra (gruppo schiena) conta 0,5 a **braccia e spalle** e **0 a glutei e gambe**; Panca Presa Stretta, Dip su Panca, Diamante, Dip alla Macchina (gruppo braccia) contano 0,5 alla **schiena**; hip thrust conta 0,5 a **gambe** (quadricipiti); rematori contano 0,5 a tutte le **spalle** (solo il posteriore lavora) | `ricette.js:292-299`; `libreria-esercizi.js:10-18` | Volume di glutei/gambe sottostimato con lo stacco; braccia e spalle sovrastimate; il coach aggiunge meno serie dirette di quelle che servono | SEL-01 |
| P2 | **Stacco con Trap Bar ha bersaglio «quadricipiti»** e compare come alternativa «stesso muscolo» di Leg Extension (solo bilanciere) e di Goblet Squat (con fastidio al ginocchio) | `dettagli-esercizi.js:161`; probe su `alternativeStessoMuscolo` | Si propone un carico pesante di anca/schiena al posto di un isolamento o di uno squat leggero | SEL-02 |
| P3 | **Classi troppo strette a casa.** Con soli manubri 8 esercizi non hanno alternative (Alzate Laterali, Hammer Curl, Squat Sumo, Nordic Curl, Hyperextension, Scrollate, Slanci Laterali, Calf Raise a un Piede); a corpo libero 8 (Piegamenti a Terra, Rematore Inverso, Pike Push-up, Nordic, Piegamenti Declinati, Hyperextension, Slanci, Calf Raise). Nessun esercizio per **deltoide laterale e posteriore, bicipiti, adduttori, trapezio** a corpo libero | `motore.js:79-96`; stats | L'utente a casa vede «Nessuna alternativa adatta» o nessun lavoro per quei muscoli | SEL-04; aggiunte in 5.5 |
| P4 | **«Corpo libero» include esercizi che richiedono attrezzi**: Dip alle Parallele, Trazioni (3), Hyperextension (2), Rematore Inverso, Leg Raise alla Sbarra e alla Sedia Romana, Ab Wheel, Step-up su Panca, Dip su Panca, Nordic Curl. Per `luogo === 'corpo'` entrano tutti; il controllo «sbarra» c'è solo se l'utente ha dichiarato le attrezzature della palestra | `motore.js:28-37,45-54`; `il-coach.js:8` (le attrezzature sono solo bilanciere, manubri, macchine e cavi, sbarra) | Un utente a casa senza nulla riceve Dip alle Parallele o Leg Raise alla Sedia Romana | SEL-03 |
| P5 | **Good Morning (femorali) è alternativa di Leg Curl.** Flessione del ginocchio e estensione dell'anca sono movimenti diversi per i femorali, e il good morning carica la schiena | `dettagli-esercizi.js:168`; probe: «Leg Curl Sdraiato → Leg Curl Seduto, Nordic Curl, Good Morning» | Con schiena sana il sostituto cambia il lavoro; con schiena dolente è escluso | SEL-14 (bloccata) |
| P6 | **Pullover in due classi.** «Pullover con Manubrio» è `petto_medio` (alternative: croci, Panca Piana Bilanciere!), «Pullover ai Cavi» è `dorsali`. La coppia RIC-03 `['Pullover ai Cavi','Pullover con Manubrio']` attraversa i gruppi (schiena→petto): è inerte solo perché `schemaDi` non mette il pullover in nessuno slot | `dettagli-esercizi.js:115`; `schemi.js:31`; `ricette.js:168` | Una sostituzione automatica cambierebbe il muscolo bersaglio | SEL-02 |
| P7 | **Polpacci: una classe per due muscoli.** «Calf Raise Seduto» (soleo) e «Calf Raise in Piedi» (gemelli) hanno lo stesso bersaglio `polpacci` e si propongono a vicenda; se la seduta ha solo il seduto il gemello resta senza lavoro | `dettagli-esercizi.js:152-153`; probe | Buco di copertura | SEL-08 |
| P8 | **Tabelle in contrasto sul ginocchio.** `STRESS_ZONA.ginocchio` elenca Leg Press, `RISCHIO.ginocchia` no: con fastidio al ginocchio il generatore lascia la Leg Press (e la propone come alternativa a Goblet Squat); `SCALE_DOLORE.ginocchia` consiglia leg extension isometrica mentre `RISCHIO` toglie Leg Extension dal programma | `motore.js:39-43`; `questionario-decisioni.js:45`; `biomeccanica.js:113` | Messaggi che si contraddicono | Decidere una sola fonte (SEL-10) |
| P9 | **Tirate al Mento (Upright Row)** è nella classe del deltoide laterale: seconda/terza alternativa automatica alle alzate laterali (`Alzate Laterali → ai Cavi, alla Macchina, Tirate al Mento`). Nessuna voce in `PRIORI` (peso 1) | probe; `PRIORI` | Esercizio da prudenza (RISCHIO spalle) proposto come alternativa | Penalità o fuori dalle alternative automatiche |
| P10 | **`IN_ALLUNGAMENTO`:** il pezzo `da seduto` cattura «Croci ai Cavi da Seduto» (+1,5 «allungamento» e la scheda lo dice «anche in allungamento»), il pezzo `panca inclinata \(` non cattura nessun nome (nessuna voce ha parentesi dopo «Panca Inclinata»), e Scott/Spider non sono in elenco ma PRG-23 li aggiunge | `schemi.js:28` | Punteggi incoerenti con la dichiarazione | Decisione D1/D8, poi pulizia della regex |
| P11 | **RISCHIO.schiena non esclude** Sit-up, Russian Twist, Leg Raise, Crunch, mentre `SCALE_DOLORE.schiena` cita il protocollo McGill (curl-up, side plank, bird dog) | `motore.js:39-43`; `biomeccanica.js:114` | Un utente con mal di schiena riceve Sit-up e Russian Twist | SEL-11 |
| P12 | **Squat: muscoli secondari incoerenti.** La scheda tecnica elenca «ischiocrurali» tra i secondari dello Squat con Bilanciere e della Leg Press; `dettagli-esercizi.js:78-79` dice che i femorali quasi non lavorano (Kubo 2019 [R]); `DETTAGLI` elenca gli adduttori tra i secondari (e la mia conoscenza non verificata è che l'adduttore magno lavora) | `schede-tecniche.js:12` (riga di Squat); `dettagli-esercizi.js:141,145` | Spiegazione all'utente in contrasto con la regola | Allineare: adduttori tra i muscoli principali, femorali tolti |
| P13 | **Scrollate (Shrug)**: `DETTAGLI` dice «Bilanciere», `attrezzoDi` dice «manubri» (regex `scrollate`). Con «solo bilanciere» scompare; con «solo manubri» resta ma l'esercizio è descritto con il bilanciere. Unico trapezio: nessuna alternativa | `dettagli-esercizi.js:190`; `motore.js:35` | Unico esercizio del trapezio inaccessibile | Due voci (bilanciere / manubri) |
| P14 | **Nessun livello di difficoltà.** Nordic Curl (unico femorale a corpo libero e a soli manubri), Pike Push-up (unico spinta verticale a casa), Sissy Squat, Ab Wheel, Hollow Hold, Dip, Leg Raise alla Sbarra possono arrivare a un principiante o a un over 65; non c'è regressione (Nordic eccentrico con aiuto, Pike a mani rialzate, ecc.) | `ricette.js` (nessun filtro per livello sulle voci; `serieMaxPrudente` taglia solo le serie) | Esercizi troppo duri per l'utente | SEL-06 |
| P15 | **Ordine di preferenze non spiegato per le croci:** `PRIORI` dà 3 a «Croci ai Cavi da Seduto», 2,5 al Pectoral, 2 a «dal Basso», nulla alle croci manubri (PRIORI 1) e RIC-03 le premia | `ricette.js:65`; `schemi.js:30` | Il +1,5 allungamento e il PRIORI si contraddicono | D1 |
| P16 | **Singoli esercizi per regione**: erettori (2), adduttori (2), trapezio (1); gli adduttori hanno solo macchina e squat sumo, il trapezio solo scrollate | stats | Nessun ricambio | 5.5 |
| P17 | **Conteggio per gruppo e non per muscolo**: «braccia» è un contatore solo (bicipiti + tricipiti + avambracci); 10-14 serie possono essere tutte di tricipiti | `ricette.js:292-309`; PRG-25 | Nessuna garanzia di equilibrio bicipite/tricipite; il repo la ottiene in parte con PRG-23 | Monitor per muscolo (SEL-05) |

### 5.4 Tag sospetti o da rivedere [V salvo diversa nota]

| Esercizio | Tag oggi | Cosa non torna | Proposta |
|---|---|---|---|
| Pullover con Manubrio | bersaglio `petto_medio`; focus «Gran pettorale, gran dorsale»; secondari `dorsali tricipiti` | Pullover ai Cavi è `dorsali` (P6) | Classe condivisa o bersaglio unico |
| Stacco con Trap Bar | bersaglio `quadricipiti` | P2 | Togliere dalla classe dei quadricipiti; resta nella famiglia `catena_totale` |
| Hammer Curl, Curl ai Cavi con Corda (Presa Martello), Curl Inverso EZ | bersaglio `brachioradiale` (eccezione voluta) | Nessuna alternativa con soli manubri; i normali curl non sono alternative | Classe larga `EQ-FLESSORI-GOMITO` come fallback |
| Calf Raise Seduto | `polpacci` | P7 | Aggiungere un id soleo, o regola di copertura |
| Stacco Rumeno / Good Morning | `grande_gluteo` / `femorali`; schema `hinge` | Stesso movimento in due classi; rumeno = «glutei» per `GLUTEI_FAMIGLIE` | Co-bersaglio (1 serie a glutei e 0,5 a femorali, oppure l'inverso): SEL-01 |
| Leg Press, Squat con Bilanciere | secondari includono `femorali` | P12 | Togliere femorali; aggiungere adduttori ai primari |
| Panca Presa Stretta, Dip su Panca, Piegamenti a Diamante, Dip alla Macchina | gruppo braccia, multiarticolare | P1 | SEL-01 |
| Scrollate (Shrug) | attrezzo Bilanciere / `attrezzoDi` manubri | P13 | Due voci |
| Abductor Machine | bersaglio `abduttori`, secondario grande gluteo | Coerente | Nessuna |
| Landmine Press | bersaglio `deltoide_anteriore`, `petto_alto` secondario; è nello slot spintaV | Coerente | Tenere come alternativa «amica della spalla» |
| Wall Sit | `isolation`, `tempo` | Isometrico a tempo: non scambia con Leg Extension a pari ripetizioni | Nessuna: già in un ordine basso di preferenza |
| Piegamenti Inclinati (Mani Rialzate) | `petto_basso` | Regressione facile, non «petto basso» come classe di allenamento | Classe larga EQ-PETTO-SPINTA |
| Y-Raise su Panca Inclinata | `deltoide_posteriore`; sub «posteriori e cuffia» | Il cue dice «trapezio inferiore»: bersaglio vero è il trapezio basso | Id `trapezio` basso o nota |
| Tirate al Mento | `deltoide_laterale` | P9 | Fuori dalle alternative automatiche |

### 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio)

| Regione | Movimento mancante | Perché | Dove serve | Prio |
|---|---|---|---|---|
| Glutei / hinge | Hip Thrust a manubrio (o su una gamba) | Oggi a casa i glutei hanno solo ponte e bulgari | Manubri, casa | A |
| Femorali (anca) | Stacco Rumeno a manubri; Stacco Rumeno a una gamba | Con soli manubri non esiste alcun hinge | Manubri, casa | A |
| Femorali (ginocchio) | Leg curl con scivolamento/asciugamano; Leg Curl in piedi | A casa il solo esercizio (Nordic) è molto difficile | Casa | A |
| Dorsali | Trazioni negative o con elastico; pulldown con elastico; Pullover come dorsali (decisione P6) | A soli manubri l'unica scelta sono le trazioni | Manubri, casa | A |
| Deltoide laterale | Alzate laterali con elastico; da seduto/inclinate | Solo manubri: 1 esercizio, corpo libero: 0 | Manubri, casa | A |
| Deltoide posteriore, bicipiti | Con elastico; Rematore Inverso presa supina (bicipite) | A corpo libero: 0 | Casa | A |
| Petto | Floor Press manubri; Chest Press inclinata alla macchina; Panca inclinata al Multipower | Casa senza panca; macchina con 30° | Casa, palestra | A/B |
| Polpacci | Calf Raise a manubrio (gradino); Donkey Calf; Tibialis raise | A soli manubri una sola voce | Manubri, palestra | B |
| Adduttori | Cossack squat, Copenhagen | Corpo libero 0, manubri 1 | Casa | B |
| Core | Reverse crunch, Suitcase carry, Side bend | Manca anti-flessione laterale e flessione bassa senza sbarra | Tutti | B |
| Avambracci | Wrist curl, reverse wrist curl, dead hang | Un solo esercizio di presa (farmer) | Tutti | B |
| Cuffia (prehab) | Extrarotazione con cavo/elastico/manubrio, serratus push-up plus | Nessun esercizio mirato alla cuffia oltre al face pull | Tutti | B |
| Quadricipiti | Reverse Nordic; Squat con rialzo piede anteriore | Opzioni in allungamento per il retto femorale | Casa, palestra | B |
| Gambe palestra | Belt squat, Safety bar squat | Alternative a bilanciere sulla schiena | Palestra | B |
| Schiena palestra | Chest-supported T-bar, Seal row | Alternative a rematori pesanti (schiena dolente) | Palestra | B |
| Collo | Flessione/estensione/laterale del collo (facoltativo) | Nessuna prova ricordata con sicurezza | Facoltativo | B |

### 5.6 Cue: stato nell'app [V]

- `cueEsercizio` (BIO-01) dà una riga per schema (6) e solo ai multiarticolari; agli isolamenti dice «senti il muscolo». Il cue specifico (`TECNICA.c`) compare solo nella scheda esercizio.
- **26 esercizi senza `TECNICA`**: le 6 varianti di pulley/lat/rematore (Pulley Basso Barra Larga, Pulley Basso Presa Inversa, Pulley Basso a un Braccio, Lat Machine Triangolo, Rematore Presa Inversa (Yates), Trazioni Presa Neutra), Croci ai Cavi Alti, Piegamenti Declinati, Piegamenti a Diamante, Adductor Machine, Calf Raise a un Piede, Sissy Squat, Alzate Laterali alla Macchina, Pike Push-up, Curl ai Cavi con Corda (Presa Martello), Curl Inverso EZ, Curl alla Macchina (Scott), Curl Zottman, Pushdown Presa Inversa, Pushdown con Barra V, Dip alla Macchina, Crunch alla Macchina, Woodchop, Leg Raise alla Sedia Romana, Sit-up, Squat Sumo.
- Cue discutibili (tutti Convenzione): «Punte dei piedi verso di te: senti meglio la contrazione» (Leg Extension), «Busto leggermente in avanti: senti di più il gluteo» (Abductor Machine), «È la variante che fa crescere di più il capo lungo» e «uno dei curl più efficaci» (affermazioni forti, senza fonte nel testo), «uno degli esercizi più efficaci per i femorali e per prevenirne gli strappi» (Nordic). Suggerisco di renderli meno assoluti o di aggiungere la fonte quando verificata.
- Cue buoni da tenere: «Spingi il pavimento lontano da te» (stacco), «Spingi il pavimento allargandolo con i piedi» (squat), «Chiudi una porta con il sedere» (rumeno), «Costole giù» (pullover), «Gomiti verso il muro davanti a te» (front squat).

## 6. Cue consigliati

Cue brevi in italiano, nel tono delle schede esistenti. Tipo: **E** = esterno (effetto sul peso o sul pavimento), **I** = interno (muscolo o corpo). Evidenza di tutta la tabella: principio di Wulf (esterno per la prestazione) e «mind-muscle» sugli isolamenti [NV]: Convenzione. «App» = giudizio sul cue attuale [V].

| Esercizio | Cue consigliato | Tipo | Errore comune → correzione | App |
|---|---|---|---|---|
| Squat con Bilanciere | «Spingi il pavimento via con tutto il piede; scendi tra i talloni, ginocchia sopra le punte» | E | Ginocchia dentro, talloni su → piedi più larghi o scarpe piatte | Buono; aggiungere «scendi quanto riesci a tenere i talloni a terra» |
| Front Squat / Goblet Squat | «Gomiti avanti e alti, peso sul centro del piede» | E | Crollo in avanti → carico più leggero, gomiti più alti | Buono |
| Leg Press | «Bacino incollato allo schienale: scendi finché il bacino si stacca» | E | Bacino che si arrotola in fondo → fermarsi prima | Buono |
| Hack / Pendulum Squat | «Spingi la pedana via, schiena appoggiata; scendi profondo se i talloni restano giù» | E | Talloni che si alzano → pedana più alta o più larga | Buono |
| Affondi / Bulgari | «Scendi dritto come in un ascensore; busto un po' avanti se vuoi più gluteo» | E | Passo troppo corto, ginocchio che crolla → passo più lungo | Buono |
| Stacco Rumeno | «Chiudi la porta con il sedere; barra attaccata alle gambe; sali spingendo i fianchi avanti» | E | Barra lontana, schiena che si arrotonda → barra più vicina, ROM più corto | Buono |
| Stacco da Terra | «Spingi il pavimento via; stringi le ascelle prima di tirare; barra strisciante sulle gambe» | E | Strappo, schiena che cede → «togli il gioco», carico più basso | Buono; evitare toni di allarme sulla flessione (D5) |
| Hip Thrust | «Costole giù, mento al petto; spingi la barra al soffitto con i talloni; in alto bacino in retroversione» | E/I | Lombare inarcata in alto → bacino indietro, non spingere oltre la linea | Buono («sguardo avanti») |
| Panca Piana | «Spalle giù e indietro, piedi forti a terra; barra al petto basso, poi spingi verso il soffitto» | E | Gomiti a 90°, glutei che si staccano → gomiti a 45-70° | Buono; «attiva i dorsali» è affermazione senza fonte |
| Panca Inclinata Manubri (30°) | «Scendi finché senti allungare il petto, non la spalla; avvicina i manubri in alto» | I/E | Panca troppo alta → 30° | Buono |
| Piegamenti a Terra | «Corpo tavola; gomiti a 45°; spingi il pavimento lontano» | E | Bacino che cede → ginocchia a terra o rialzo | Buono |
| Dip alle Parallele | «Busto leggermente avanti; scendi finché la spalla resta sopra il gomito» | I | Spalle in avanti e giù → fermarsi prima | Buono |
| Military Press / Lento Avanti | «Spingi il peso sopra le orecchie; glutei e addome fermi» | E | Lombare inarcata → addome in tensione | Buono |
| Landmine Press | «Spingi lungo l'arco, tronco fermo» | E | Rotazione del tronco → piedi più larghi | Buono |
| Alzate Laterali | «Porta i gomiti verso fuori, non le mani; ferma a livello spalle» | I/E | Scrollata, slancio → carico più basso | Buono |
| Face Pull / Reverse Fly | «Gomiti larghi, tira verso gli occhi aprendo i polsi» | E | Tirare con le mani, schiena che si inarca | Buono |
| Trazioni / Lat Machine | «Gomiti verso le tasche, petto verso la sbarra; scendi fino a braccia quasi tese» | E/I | Dondolio, spalle alle orecchie → spalle giù | Buono; aggiungere discesa completa |
| Rematore (bilanciere, manubrio, cavo) | «Tira il gomito verso l'anca, non la mano al petto; busto fermo» | I | Slancio, busto che sale → carico più basso | Buono |
| Rematore a petto appoggiato / macchina | «Petto fermo sul cuscino, gomiti indietro, stringi le scapole» | I | Collo che spinge in avanti | Buono |
| Curl (bilanciere, EZ, manubri) | «Gomiti fermi accanto al busto; scendi lento fino al braccio quasi disteso» | I | Dondolio, gomiti avanti → carico più basso | Buono |
| Curl su Panca Inclinata / Bayesiano | «Gomito dietro il corpo, fermo; scendi finché senti allungare il bicipite» | I | Spalla che si porta avanti | Buono; togliere «uno dei curl più efficaci» |
| Estensione sopra la Testa | «Gomiti vicini alla testa e fermi; scendi fino a sentire allungare il tricipite» | I | Gomiti che si aprono | Buono; togliere «fa crescere di più» |
| Pushdown | «Gomiti incollati ai fianchi; spingi fino a tendere il gomito» | I | Busto che si piega, spalle che salgono | Buono |
| Leg Curl (seduto/sdraiato) | «Bacino contro l'imbottitura; scendi lento fino a quasi disteso» | I | Bacino che si alza → carico più basso | Buono |
| Leg Extension | «Schienale reclinato se possibile; estendi senza scatto; scendi lento» | I | Scatto in alto, bacino che si alza | Cue attuale «punte verso di te» da rivedere |
| Calf Raise | «Scendi fino al massimo allungamento, pausa 1 s; sali alto» | I | Rimbalzi → pausa | Buono |
| Crunch al Cavo / Hollow Hold | «Avvicina le costole al bacino; schiena arrotondata, non tirare con le braccia» | I | Anca che si piega al posto dell'addome | Buono |
| Plank / Dead Bug | «Costole giù, bacino leggermente indietro; respira senza perdere la posizione» | I | Lombare che cede | Buono |
| Pallof Press | «Resisti alla rotazione: bacino e spalle fermi, braccia tese» | E | Rotazione del busto | Buono |
| Ab Wheel | «Bacino indietro, costole giù; vai solo dove i lombari restano piatti» | I | Lombare che cede → ROM corto | Buono |
| Scrollate | «Spalle dritte verso le orecchie, pausa in alto, non ruotare» | I | Rotazione della spalla | Buono |

Cue per i 26 esercizi senza scheda (da aggiungere in `schede-tecniche.js`, Convenzione):

| Esercizio | Cue |
|---|---|
| Pulley Basso Barra Larga (Presa Prona) | «Gomiti larghi, porta la barra verso lo sterno alto» |
| Pulley Basso Presa Inversa | «Gomiti vicini al busto, tira verso l'ombelico» |
| Pulley Basso a un Braccio | «Spalla ferma, tira il gomito verso l'anca» |
| Lat Machine Triangolo (Presa Neutra) | «Gomiti verso le tasche, petto alto» |
| Rematore Presa Inversa (Yates) | «Busto a 45°, tira la barra verso l'ombelico» |
| Trazioni Presa Neutra | «Petto alla sbarra, gomiti verso le tasche» |
| Croci ai Cavi Alti (Parte Bassa) | «Mani verso l'ombelico, gomiti leggermente piegati» |
| Piegamenti Declinati (Piedi Rialzati) | «Corpo tavola, spingi il pavimento via; piedi bassi se la spalla pizzica» |
| Piegamenti a Diamante | «Gomiti vicini al busto; mani sotto lo sterno» |
| Adductor Machine | «Chiudi senza scatto; cosce che spingono verso il centro, schiena appoggiata» |
| Calf Raise a un Piede (Corpo Libero) | «Tallone nel vuoto, pausa in basso; mano a un appoggio» |
| Sissy Squat | «Ginocchia avanti, busto che segue; scendi solo dove non senti dolore al ginocchio» |
| Alzate Laterali alla Macchina | «Spingi i gomiti verso fuori, senza spalle in alto» |
| Pike Push-up | «Fianchi alti, testa tra le braccia; spingi il pavimento via» |
| Curl ai Cavi con Corda (Presa Martello) | «Polsi neutri, gomiti fermi» |
| Curl Inverso con Bilanciere EZ | «Polsi dritti, gomiti fermi; carico leggero» |
| Curl alla Macchina (Scott) | «Braccia ferme sul cuscino; non staccare le ascelle» |
| Curl Zottman | «Su in supinazione, giù in pronazione lenta» |
| Pushdown Presa Inversa | «Gomiti incollati ai fianchi, polsi dritti» |
| Pushdown con Barra V | «Gomiti fermi, estendi fino in fondo» |
| Dip alla Macchina (Tricipiti) | «Gomiti vicini al busto, spalle giù» |
| Crunch alla Macchina | «Costole verso il bacino, senza spingere con le gambe» |
| Woodchop ai Cavi (Rotazioni) | «Ruota dai fianchi, braccia tese come leve» |
| Leg Raise alla Sedia Romana | «Arrotola il bacino, schiena appoggiata, niente slancio» |
| Sit-up a Ginocchia Piegate | «Sali dalle costole, non tirare il collo; con mal di schiena preferisci il crunch» |
| Squat Sumo | «Punte in fuori, ginocchia sopra le punte; scendi dritto» |

## 7. Regole proposte

Codice area **SEL**. **Parte A**: si basa su fatti del codice [V] (non su studi): implementabile subito, ognuna spegnibile con `regolaAttiva` come RIC. **Parte B**: dipende da affermazioni [NV]: **bloccata** finché lo studio non è ritrovato (sezione 8). Tutte rispettano le salvaguardie esistenti (prudente, over 65, principianti, dolore, scarico hanno la precedenza) e non toccano la parte medica: dolore acuto o persistente, formicolii o perdita di forza → medico.

### Parte A (da fatti del codice)

| Codice | Quando scatta | Cosa fa | Motivo (testo italiano per l'utente) | Forza | Rischio / salvaguardia | File / funzione |
|---|---|---|---|---|---|---|
| SEL-01 | Sempre, nel calcolo di PRG-28 | Il conteggio frazionario usa i **secondari dell'esercizio** (`DETTAGLI`, ultima colonna) invece dei gruppi sinergisti: 1 serie al gruppo del bersaglio, 0,5 al gruppo di ogni muscolo secondario che è un vero motore (esclusi `stabilita`, `avambracci`, `flessori_anca`, `trapezio` e, se non è bersaglio, `erettori`); max 0,5 per gruppo, mai doppio | «Lo stacco da terra allena anche glutei e gambe: lo conto nel volume. I rematori contano per il bicipite e il deltoide posteriore, non per le spalle intere.» | Convenzione (coerenza interna, 0,5 già in PRG-28 [R]) | I volumi per gruppo cambiano: stacco aggiunge a glutei/gambe, toglie a braccia/spalle; verificare con un test su 3 programmi | `ricette.js:292` `perGruppo`; dati in `dettagli-esercizi.js` |
| SEL-02 | Costruzione e alternative | (a) togliere «Stacco con Trap Bar» dalla classe quadricipiti (resta in `catena_totale`); (b) togliere dai `SCAMBI_ALLUNGAMENTO_NUOVI` la coppia Pullover ai Cavi → Pullover con Manubrio finché la classe del pullover non è decisa | «Non propongo come alternativa un esercizio che cambia muscolo.» | Convenzione [V] | Nessuna: meno alternative | `dettagli-esercizi.js:161`; `schemi.js:31` |
| SEL-03 | `luogo === 'corpo'` o attrezzature dichiarate | Nuovo tag «serve» in `DETTAGLI` (sbarra, panca, parallele, ancoraggio, ruota, sedia romana) e controllo in `consentito`: a corpo libero solo senza «serve», o con l'attrezzo dichiarato; aggiungere «panca», «elastici», «kettlebell» a `ATTREZZI_PALESTRA` | «Non ti propongo esercizi che richiedono attrezzi che non hai.» | Convenzione [V] | Meno esercizi a casa: va con SEL-04 e le aggiunte | `motore.js:45`; `il-coach.js:8`; `dettagli-esercizi.js` |
| SEL-04 | `alternativeStessoMuscolo` restituisce meno di 2 alternative | Scendere alla **classe larga** (sezione 4) con penalità e nota «stesso movimento, regione vicina» | «Non c'è un altro esercizio per questo muscolo con i tuoi attrezzi: ti propongo uno molto simile.» | Convenzione | Nessuna: solo mostra; la scelta resta all'utente | `motore.js:79` `alternativeStessoMuscolo`; nuova tabella classi |
| SEL-06 | Principiante, over 65, PAR-Q positivo | Tag `liv` per esercizio (1 accessibile, 2 richiede tecnica o forza, 3 avanzato): per questi utenti niente `liv` 3 come scelta di slot; catena di regressione (Nordic → leg curl o ponte con scivolamento; Pike → push-up inclinato; Sissy Squat → squat a corpo libero) | «Questo esercizio è difficile per iniziare: ti propongo la versione più semplice.» | Convenzione (rende più prudente) | Solo più prudente | `libreria-esercizi.js` (tag), `ricette.js` (scelta slot) |
| SEL-07 | Piano con core | Almeno un movimento «anti» (Pallof, plank laterale, dead bug) e uno di flessione o anti-estensione (cavo, ab wheel) a settimana, 2-6 serie | «Il core serve a tenere la schiena stabile: alterno movimenti diversi.» | Convenzione (McGill, NV) | Con mal di schiena: no Sit-up e Russian Twist (SEL-11) | `ricette.js` slot `core`; `schemi.js` |
| SEL-08 | Slot polpacci | Gambe tese sempre; aggiungere il seduto (soleo) solo se ≥2 esercizi o ≥6 serie/settimana di polpacci | «Il gemello lavora a gambe tese, il soleo a gambe piegate: se ne fai uno solo, scelgo quello più utile.» | Come nel repo (Kinoshita 2023 [R]) | Nessuna | `biomeccanica.js:107` `bonusBiomecc`; `ricette.js` |
| SEL-11 | Fastidio alla schiena | Aggiungere a `RISCHIO.schiena`: Sit-up, Russian Twist, Leg Raise, Crunch a Terra | «Con la schiena sensibile preferisco plank, dead bug e bird dog.» | Convenzione (McGill, NV) | Più prudente | `motore.js:39-43` |
| SEL-12 | Scheda esercizio | Mostrare `TECNICA.c` insieme al cue di schema in `cueEsercizio`; aggiungere le 26 voci mancanti (sezione 6); togliere gli aggettivi assoluti non verificati | «Un cue breve e chiaro per ogni esercizio.» | Convenzione | Nessuna | `biomeccanica.js:22`; `schede-tecniche.js` |
| SEL-13 | Fallback del curl | `EQ-FLESSORI-GOMITO`: Hammer Curl ha come alternative i curl normali quando non ce n'è altra | «Il curl a martello e il curl normale lavorano gli stessi muscoli del braccio.» | Convenzione | Nessuna | `motore.js` (classi) |
| SEL-15 | Spalla | Tirate al Mento fuori dalle alternative automatiche (restano scelta manuale); penalità `PRIORI` | «Preferisco le alzate laterali: sono più gentili con la spalla.» | Convenzione · Conoscenza del modello (non verificata sul web) | Più prudente | `ricette.js` `PRIORI`; `motore.js` |

### Parte B (bloccate: dipendono da [NV])

| Codice | Quando scatta | Cosa fa | Motivo | Forza | Rischio | File |
|---|---|---|---|---|---|---|
| SEL-05 | Piano ≥3 giorni | Monitor di volume per **muscolo** (non gruppo) per i muscoli «a rischio buco»: bicipite contro tricipite, femorali, polpacci, deltoide laterale e posteriore, adduttori | «Controllo che ogni muscolo abbia le sue serie.» | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata, Pelland) | Complessità; va dopo SEL-01 | `ricette.js:292` |
| SEL-09 | Esercizi tricipiti ≥2 | Almeno un'estensione sopra la testa | Già coperto da PRG-10 e PRIORI 3: nessuna regola nuova | Convenzione · Conoscenza del modello (non verificata sul web) (Maeo 2022-23) | | |
| SEL-10 | Fastidio ginocchio | Mantenere un esercizio per i quadricipiti (Leg Press a ROM senza dolore, Wall Sit, Leg Extension isometrico) prima di dirottare su hip thrust o rumeno; unificare `RISCHIO.ginocchia` e `STRESS_ZONA.ginocchio` | «Il ginocchio sensibile non significa niente quadricipiti: li alleno con carichi che non fanno male.» | Convenzione · Conoscenza del modello (non verificata sul web) (isometria nella tendinopatia, studio da trovare) | Con dolore che peggiora → medico | `questionario-decisioni.js:45-69`; `motore.js:39` |
| SEL-14 | Slot femorali | Separare `femorali` in due id (ginocchio, anca); good morning e rumeno non sostituiscono il leg curl e viceversa | «Leg curl e stacco rumeno allenano i femorali in modo diverso: ne tengo uno per tipo.» | Convenzione · Conoscenza del modello (non verificata sul web) (da verificare; ipotesi: Moderata, Bourne 2017) | Dati da riscrivere | `dettagli-esercizi.js` |
| SEL-16 | Piano glutei | Un movimento «in alto» (hip thrust) e uno «allungato» (bulgari, rumeno, squat profondo) a settimana | «Per i glutei servono entrambi gli stimoli.» | Contrastata (D3) | | `ricette.js` PRG-22 |

## 8. Domande aperte

### 8.1 Decisioni da prendere (non scientifiche)

1. **D1 croci**: premiare cavo (BIO-05 +0,5) o manubri (RIC-03 +1,5 e scambio)? Proposta: nessun bonus fisso, ordine da `PRIORI`.
2. **D8 bicipite**: tenere insieme allungato (incline, Bayesiano) e accorciato (Scott, Spider)? Dipende dalla lettura di «Pedrosa 2025» in PRG-23.
3. **P6 pullover**: classe `dorsali` o `petto`? Dipende da cosa si vuole insegnare.
4. **P8 ginocchio**: una sola tabella (`RISCHIO` o `STRESS_ZONA`).
5. Aggiungere elastici, kettlebell, panca e anelli alle attrezzature: sì o no.

### 8.2 Piano di ricerca (query pronte per quando il budget sarà ripristinato)

`allowed_domains`: **P** = `["pubmed.ncbi.nlm.nih.gov","pmc.ncbi.nlm.nih.gov","europepmc.org"]`; **E** = un solo sito esperto (`strongerbyscience.com`, `mennohenselmans.com`, `sciencerelatedtostrength` non incluso nella lista, solo dove indicato nelle fonti); **S** = nessun filtro. Ogni numero in due fonti indipendenti; mai citare ciò che non è nel risultato.

| # | Domanda | Query | Filtri | Decisione dell'app che cambia |
|---|---|---|---|---|
| 1 | Tricipite sopra la testa o pushdown | `triceps brachii hypertrophy overhead versus neutral arm position elbow extension training` | P | PRG-10, PRIORI tricipite |
| 2 | Femorali seduto o sdraiato | `hamstrings hypertrophy long versus short muscle length leg curl Maeo` | P | PRG-10, `NOTE_ATTACCO.legcurl` |
| 3 | Hip thrust contro squat | `hip thrust back squat gluteus maximus hypertrophy randomized trial` | P | PRG-22, SEL-16 |
| 4 | Polpacci in piedi e seduti | `standing seated calf raise gastrocnemius soleus hypertrophy` | P | BIO-05, SEL-08 |
| 5 | Parziali in allungamento (gastrocnemio, bicipite) | `partial range of motion long muscle length hypertrophy Pedrosa Kassiano` | P | RIC-03, D8 |
| 6 | ROM completo contro parziale | `range of motion hypertrophy meta-analysis partial full` | P | RIC-03, BIO-01 |
| 7 | Petto: inclinata e piana | `incline bench press flat bench pectoralis hypertrophy regional` | P | classi petto (D2) |
| 8 | Petto: croci contro panca | `chest fly versus bench press hypertrophy pectoralis` | P | D1 |
| 9 | Pullover: dorsale o pettorale | `dumbbell pullover latissimus dorsi pectoralis major EMG hypertrophy` | P | P6 |
| 10 | Dorsali: trazioni contro lat machine | `pull-up lat pulldown latissimus dorsi EMG hypertrophy` | P | EQ-DORSALI-VERT |
| 11 | Presa e dorsali | `grip width pulldown latissimus activation` | P | `NOTE_ATTACCO.lat` |
| 12 | Rematori e posizione | `row variations EMG latissimus rhomboids chest-supported` | P | EQ-SPESSORE |
| 13 | Deltoide laterale cavo contro manubri | `lateral raise cable dumbbell deltoid hypertrophy resistance profile` | P | EQ-DELT-LAT |
| 14 | Deltoide posteriore | `rear deltoid reverse fly face pull EMG` | P | EQ-DELT-POST |
| 15 | Bicipite: curl inclinato e Scott | `incline curl preacher curl biceps hypertrophy lengthened` | P | D8 |
| 16 | Articolazione singola contro multipla (braccia) | `single-joint versus multi-joint elbow flexors hypertrophy` | P | EQ-FLESSORI-GOMITO |
| 17 | Quadricipiti: leg extension e retto femorale | `leg extension rectus femoris hypertrophy squat vastus` | P | PRG-23 |
| 18 | Squat: profondità | `squat depth hypertrophy lower limb muscle volume adductor magnus` | P | P12, BIO-01 |
| 19 | Squat: larghezza e angolo dei piedi | `stance width squat quadriceps gluteus EMG hypertrophy` | P | BIO-04 |
| 20 | Squat: bilanciere alto e basso | `high-bar low-bar squat biomechanics systematic review` | P | cue squat |
| 21 | Stacco sumo contro convenzionale | `sumo versus conventional deadlift biomechanics EMG` | P | `catena_totale` |
| 22 | Stacco: flessione lombare e infortunio | `lumbar flexion deadlift injury risk` | P | testi di sicurezza (D5) |
| 23 | Hinge e femorali: Nordic, rumeno, leg curl | `hamstring architecture Nordic hip extension exercise hypertrophy regional` | P | SEL-14 |
| 24 | Nordic curl e infortuni | `Nordic hamstring exercise injury prevention meta-analysis` | P | SEL-06 |
| 25 | Panca: larghezza della presa | `bench press grip width muscle activation` | P | cue panca |
| 26 | Unilaterale contro bilaterale | `unilateral versus bilateral resistance training hypertrophy meta-analysis` | P | EQ-AFFONDO-UNILAT |
| 27 | Macchine contro pesi liberi | `free weights versus machines hypertrophy strength meta-analysis` | P | punteggi attrezzo |
| 28 | Catena chiusa contro aperta | `open chain closed chain exercise quadriceps hypertrophy` | P | PRG-23 |
| 29 | Addome e core | `abdominal exercises rectus abdominis EMG hypertrophy trained` | P | SEL-07 |
| 30 | Core e mal di schiena | `core stability exercise low back pain prevention meta-analysis` | P | SEL-11 |
| 31 | Prevenzione spalla | `shoulder injury prevention exercise external rotation program` | P | prehab |
| 32 | Collo e avambracci | `neck strengthening injury concussion; forearm hypertrophy wrist curl` | P | facoltativo |
| 33 | Focus esterno e interno | `attentional focus strength resistance training hypertrophy internal external` | P | cue |
| 34 | Tempo di ripetizione | `repetition tempo hypertrophy systematic review` | P | BIO-01 |
| 35 | Casa: push-up, elastici, carichi leggeri | `push-up versus bench press hypertrophy; elastic band versus conventional resistance training` | P | SEL-03/04 e aggiunte |
| 36 | Dolore al ginocchio e carico | `patellofemoral pain tendinopathy exercise isometric loading` | P | SEL-10 |
| 37 | Esperti: Henselmans, Nuckols, Beardsley, RP (lista di articoli per esercizio) | `best exercise biceps chest back triceps` | E | D1..D9 |
| 38 | Podcast e video citati (titoli e studi) | `exercise selection hypertrophy podcast` | `["youtube.com"]` | solo «riportato da... da verificare» |

## 9. Limiti onesti

- **Nessuna ricerca web eseguita** (budget esaurito): tutta la parte scientifica è [NV] o [R]; nulla è «Solida» o «Moderata» oggi.
- Il giudizio sugli esperti (Contreras, Nippard, Henselmans, Israetel, Beardsley, Baraki, Nuckols) è assente: non ho letto nessuna loro frase.
- Gli audit [V] sono su dati e funzioni caricati in un ambiente di prova (script nella scratchpad): le funzioni di `ricette.js` che dipendono dal browser non sono state eseguite; le alternative sono ricalcolate dal codice reale di `motore.js`.
- Le priorità delle aggiunte (5.5) e le classifiche della matrice (sezione 3) sono giudizio da coach, non da studi: Convenzione.
- Numeri di effetto e di n non compaiono perché non li ho visti: andranno scritti solo dopo la ricerca.
- Il registro della skill (`SKILL.md`) non è stato aggiornato: proposta di riga da aggiungere a chi ha il permesso: `2026-10-05 | WebSearch con budget per sessione (CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION, qui 200) | a budget esaurito ogni chiamata viene rifiutata («Web search was not performed»): controllare prima di avviare più agenti in parallelo.`
