# Metodo immagini v2: una posa per prompt, canvas quadrato

Stato: proposta, prima applicazione su ex-48 (`docs/prompt-esercizi/ex-48-shoulder-press-machine.md`).
Sostituisce, per i nuovi esercizi, il "foglio a 5 pose" (viewBox 2000x300) descritto in `docs/inventario-esercizi-immagini.md`.
La parte animazione (come si muovono le pose) e' in `docs/ricerca-animazione-fluida.md` (agente parallelo, vedi §8).
Revisione del 10/10/2026: scala anatomica unica per le figure sedute (§3), muscoli scelti per la vista (§4), fonti delle notizie su Quiver segnate come verificate o no (§1, §6), controllo automatico che riconosce le scritte disegnate come tracciati e non toglie piu' l'acciaio come ombra (§7.2).

## 0. In breve

- Quiver disegna sempre dentro un **quadrato**: se chiediamo un foglio largo con 5 figure, le 5 figure finiscono strette nel quadrato centrale, alte circa 121 px su 300 e con poco dettaglio (§1).
- v2: **una figura per generazione** su canvas quadrato `0 0 1000 1000`, con ancore fisse (asse, suola, cima della testa, attrezzo). La figura e' circa 2,4 volte piu' alta e ha circa 4-6 volte piu' dettaglio.
- Ogni prompt e' fatto di **blocchi identici** (inquadratura, personaggio, attrezzo, stile). Cambia solo il paragrafo della posa, con quote numeriche e punti di riferimento sul corpo.
- Pose da comprare, allineate alla ricerca sull'animazione (`docs/ricerca-animazione-fluida.md`, vincitore: rig che muove **un solo disegno START diviso in parti**):
  - **START**, il disegno principale: 1 generazione, si sceglie la migliore delle 4 varianti;
  - **END**, solo riferimento per angoli e ampiezza del rig: 1 generazione, basta una variante buona; facoltativo per le rotazioni di un solo segmento, necessario per i movimenti a due segmenti (§8);
  - MID solo se il busto si flette (crunch) o se il controllo del rig chiede di vedere disegnata una posa intermedia;
  - 25% e 75%: di norma no, le ricava il rig; i loro prompt restano di riserva per lo stesso caso del MID (§8).
- START e' anche il **riferimento**: tutto il disegno animato viene da START e, se Quiver lo permette, il suo PNG si allega al prompt di END per tenere scala e inquadratura (§6).
- Ogni variante passa un **controllo di 10 secondi** (§7). Se una posa e' sbagliata si rifa' solo quella, aggiungendo al prompt una riga di correzione.

## 1. Verifica sui dati (157 bozze misurate)

Misure fatte in Chromium (Playwright): riquadro del disegno senza fondo, ombre, scritte e tratti decorativi, piu' maschera rasterizzata per contare le figure e misurarne l'altezza.

| Formato chiesto | Bozze | Dove disegna Quiver | Altezza figura (mediana) | Coordinate di path per figura | Elementi per figura |
|---|---|---|---|---|---|
| 1 posa, 400x300 (ex-02 `su-a`) | 1 | quadrato x 50-350 | 285 px (95%) | 3.223 | 206 |
| 2 pose, 800x300, stile "realistic anatomical" (ex-10..25) | 64 | quadrato x 250-550 | 221 px (74%, tutte le 2 pose) | 1.365 | 83 |
| 2 pose, 800x300, stile "flat" (ex-26..39) | 48 | quadrato x 250-550 | (come sopra) | 890 | 32 |
| 3 pose, 1200x300 (ex-40, 41) | 8 | quadrato x 450-750 | 145 px (48%) | 632 | 17,5 |
| 5 pose, 2000x300 (ex-42..50) | 36 | quadrato x 850-1150 | 121 px (40%); in piedi 114-153 px contro 225 chiesti | 562 | 20,5 |

- A parita' di soggetto (figura in piedi in START): 2 pose 212-282 px (ex-23, 24, 25, 30, 34), 3 pose 185-204 px (ex-40), 5 pose 114-153 px (ex-45, 47, 49, 50). Meno figure per foglio danno figure piu' grandi.
- **153 bozze su 157** hanno tutto il disegno dentro il quadrato centrale di lato pari all'altezza del viewBox. Il rect di fondo (presente in 148 su 157) e' proprio quel quadrato: `x=(W-300)/2`, largo 300.
- Nei fogli a 5 pose il passo tra le figure e' di 60 px (mediana 60,3, da 53 a 68,5), cioe' 300/5, contro i 400 chiesti. **Nessuna** bozza a 3 o 5 pose ha rispettato le colonne.
- **Canvas nativo**: 677 trasformazioni `matrix(3.75 0 0 3.75 X 0)` (in 17 bozze) indicano un quadrato interno di 80 unita', ingrandito a 300 e centrato (X = 850, 450, 250). Una bozza (ex-28-b) ha `matrix(.293…)`, cioe' un quadrato interno di 1024. Le schede di terzi su Arrow 2 indicherebbero 1024x1024 come formato predefinito (**non verificato**: nessuna fonte nei file del repo).
- **Eccezione**: le 4 bozze di ex-31 (e lo stile di ex-28) sono SVG "scritti come codice", con gruppi dal nome leggibile (`left-seated-person`, `right-extended-leg`, `left-moving-lever`…) e forme geometriche semplici. Solo queste hanno occupato 500-570 px di larghezza. Probabilmente vengono da un altro modello o modalita' di Quiver: sono piu' semplici, ma gia' divise in parti, cosa utile per animare (domanda aperta 1).
- Il **budget di disegno per generazione e' quasi costante** (da 6 a 36 KB per bozza, 8 su 10 tra 11 e 31 KB, qualunque sia il numero di figure). Il dettaglio per figura e' quindi inversamente proporzionale al numero di figure.
- Il lessico "flat colors only" **dimezza il dettaglio** rispetto a "realistic anatomical … shading" (890 contro 1.365 coordinate per figura, sempre a 2 pose), pero' azzera i gradienti (0 su 92 bozze, contro 10 su 64).
- **Lunghezza del prompt**: accettati fino a 7.900 caratteri (ex-44), rifiutato a 9.144 (ex-45, "Request needs changes"). Le versioni brevi da 1.400 a 2.600 caratteri funzionano. (Dati delle sessioni precedenti: nel repo non ci sono i prompt ne' la risposta di Quiver.)
- **Ricontrollo del 10/10/2026** (Chromium/Playwright, pulizie simili a quelle di `crea-riferimento.js`, figure separate per colonne vuote): ex-02 `su-a` 284 px (95%); 2 pose 216 px (72%) contando le due figure piu' grandi di ogni bozza; 3 pose 142 px (47%); 5 pose 121 px (40%); START in piedi 211-282 px a 2 pose, 185-204 a 3 (senza ex-40-b, dove tratti vaganti arrivano al bordo), 113-152 a 5. Gli scarti dalla tabella (al massimo 2-3%) vengono dal modo di separare le figure: le conclusioni restano. Dentro il quadrato centrale: 153 bozze su 157 con 2 unita' di tolleranza (152 con 1: ex-43-b sborda di 2 unita'), fuori le 4 di ex-31.

**Conclusione.** Una figura per generazione su canvas quadrato:

| | Una figura per generazione rispetto al foglio a 5 |
|---|---|
| Altezza | circa 2,4 volte (285 px contro 121) |
| Area | circa 5,5 volte |
| Dettaglio | circa 4 volte per il solo numero di figure (da 5 a 2: x1,6 nello stile flat; da 2 a 1: x2,4 nello stile realistico); circa 5,7 volte insieme al lessico dettagliato (3.223 contro 562 coordinate) |

Con 2 figure per foglio l'altezza tiene (74%) solo per soggetti stretti, ma il dettaglio si dimezza e le parti ferme cambiano comunque tra le due meta' (ex-22, 27, 30, 32, 34, 39). La configurazione migliore e' quindi **1 figura per generazione**.

## 2. Catalogo errori (causa e prevenzione)

Legenda "dove": P = prompt, C = canvas/inquadratura, B = build (pulizia/montaggio), Q = controllo qualita', A = tecnica di animazione.

| # | Errore | Esempi | Causa | Prevenzione | Dove |
|---|---|---|---|---|---|
| 1 | Figure piccole, layout ignorato | tutte le bozze 40-50 (passo 60 px) | Quiver compone in un quadrato e lo centra nel viewBox chiesto | 1 figura per generazione, canvas quadrato | C |
| 2 | Poco dettaglio: mani senza dita, manubri a macchia, braccia "a pala" | ex-49 (braccia ad ala), ex-50-a, ex-45 (braccio a tubo), ex-47 | budget diviso per 5 e lessico "flat only" | 1 figura + stile cel shading + 4-6 dettagli nominati (dita, cuciture, bulloni, lacci) | C, P |
| 3 | Progressione irregolare tra le pose | ex-42 (passi 13/13/6/4), ex-45 (8/19/13/11), ex-47 (11/-1/37/7), ex-50 (8/11/16/4), ex-43 a/b/d | Quiver non rispetta quote numeriche tra figure dello stesso foglio | quote per posa con angoli e punti di riferimento sul corpo; comprare solo le pose chiave e ricavare le intermedie | P, B, A |
| 4 | Parti ferme diverse tra le pose (macchina, panca, busto, testa) | ex-22, 27, 30, 32, 33, 34, 39; ex-44/45 (testa ±3 u) | ogni figura e' ridisegnata da capo, nessun seed | blocchi di testo identici + riferimento START; nel build le parti ferme **sempre** da START | P, B |
| 5 | Effetto fantasma nella dissolvenza | tutti i finali (doppio disco ex-45, doppie braccia ex-47 e 49, busto ex-40, corpo intero ex-19 e 24) | dissolvenza tra disegni diversi e grandi spostamenti | tecnica di animazione (rotazione di parti rigide); parti mobili disegnate separate | A |
| 6 | Testa staccata, collo mancante | ex-49 (colli aggiunti a mano) | figura minuscola | "A visible neck joins head and shoulders" nella scheda personaggio + controllo | P, Q |
| 7 | Viso coperto, braccio fuso con la testa | ex-45 (fotogrammi 4-5), ex-46 (dal 25%), ex-47 START | vista di profilo per spinte sopra la testa | vista in cui il braccio non passa davanti al viso (frontale per spinte e alzate); "her face stays fully visible" | P, C |
| 8 | Muscolo primario che sparisce a fine corsa, arancioni fuori palette | ex-49 (deltoidi dal 75%), ex-47, ex-20, ex-16, ex-18; #FF8E3E, #F97522 | muscolo coperto o rimpicciolito, troppi secondari, colori inventati | 1-2 primari e al massimo 2 secondari, "on both shoulders in every position"; il build ricolora | P, B, Q |
| 9 | Pelle piatta o incoerente | ex-45 (8 toni), ex-49 (6), ex-40/41/44 (un solo tono: braccio confuso col busto), ex-50 (braccia #fdba8c, viso #D2B8A3) | toni inventati da Quiver; il build ha appiattito tutto o mappato la pelle chiara sul colore del secondario | palette con base e ombra per materiale; il build mappa per materiale (2 toni di pelle) e mai pelle verso arancione | P, B |
| 10 | Elementi spuri: fondo, ombre, tratti, cerchi bianchi, scritte | fondo in 148 su 157; ombre quasi sempre (chieste dal prompt); tratti in 48 su 157 (ex-45-d 21, ex-49-b 39, ex-33-b 32); scritte in 15 bozze su 157: come `<text>` in ex-40-a (12), ex-50-b/d, come tracciati ("Start", "END", "25%") in ex-16-b/c/d, ex-27-a/b/d, ex-35-a..d, ex-50-a/c | abitudini di Quiver; il prompt chiedeva le ombre e nominava START/MID/END | non chiedere ombre, non scrivere nomi di posa o percentuali, una sola frase "no text"; il build rimuove il resto (non eliminabile del tutto) | P, B |
| 11 | Vista o variante sbagliata | ex-47 (seduto/profilo), ex-42-b (sgabello), ex-41-c (ponte su una gamba), ex-24-d (barra lungo l'asse) | nome dell'esercizio ambiguo, abitudini del modello | descrivere appoggi, postura e geometria, non solo il nome; vista nella prima frase | P, Q |
| 12 | Presa o rotazione del polso illeggibili | ex-47, ex-16 (supina), ex-24 (mani non sulla barra), ex-49 | mani di 5-10 px | figura grande; dire cosa vede la camera della mano (dita sopra la maniglia, pollice sotto) | C, P |
| 13 | Attrezzi incoerenti o irrealistici | ex-27 (6 dischi contro 5), ex-31/33 (leva staccata), ex-37 (disco alto), pacchi pesi fermi | geometria non specificata | attrezzo descritto con i collegamenti (cosa e' fissato a cosa) e le misure relative; parti mobili dichiarate | P, B |
| 14 | Ampiezza del movimento ridotta | ex-34/35 (alzata allargata a mano), ex-39, ex-41, ex-42, ex-44 (42 gradi invece di 45) | il modello tende a una posa "media" | quote con punti di riferimento, leggera esagerazione a fine corsa, misura nel controllo | P, Q, B |
| 15 | Errori di tecnica | ex-28/39 (ginocchio oltre la caviglia), ex-46 (START davanti al mento), ex-21, ex-15 | il prompt descrive l'obiettivo e non i vincoli | vincoli presi da `js/dati/schede-tecniche.js`, scritti in positivo nella posa | P |
| 16 | Prompt rifiutato | ex-45 (9.144 caratteri) | lunghezza | al massimo circa 2.400 caratteri (circa 2.550 con la riga REF), "degrees" invece del simbolo di grado, solo caratteri ASCII | P |
| 17 | Animazione a 2 pose troppo povera | ex-15..39 | tecnica | rig da START (piu' END di riferimento): moto continuo, intermedie calcolate (§8) | A |
| 18 | Difetti della pipeline | reduced-motion senza `!important` (ex-42..47), esagono da interpolazione (ex-42), divisione per x sbagliata (ex-27-b), pelle uniformata | regole del build | una posa per file (niente divisione), mappa colori per materiale, `.fr{animation:none!important}`, controllo visivo | B |

**Cosa il prompt non puo' prevenire**, e quindi resta compito del build e del controllo:

- fondo e ombre;
- tratti spuri residui;
- piccoli scarti tra disegni separati (posizione e scala di circa ±3-5%, dettagli);
- colori non esatti;
- progressione esatta tra le pose;
- effetto fantasma della dissolvenza.

## 3. Canvas e ancore

- **Una figura per generazione.** Il prompt chiede `Square canvas, viewBox 0 0 1000 1000`. Se Quiver ha un selettore di formato, scegliere 1:1 (1024x1024).
- **Ancore fisse**, identiche in tutti i prompt dell'esercizio: asse della figura `x=500`, suole e base dell'attrezzo a `y=950`, cima della testa a una `y` fissa, parte piu' alta dell'attrezzo a una `y` fissa. Si inquadra l'**inviluppo** di tutto il movimento: la posa piu' alta (per esempio le braccia sopra la testa) deve stare dentro anche quando si genera START. Cosi' la scala resta la stessa in tutte le pose.
- **Scala di riferimento**, figura alta 7,5 teste:

| Situazione | Altezza in piedi (H) | Cima della testa | Note |
|---|---|---|---|
| In piedi, braccia sotto la testa | 820 | y=130 | |
| In piedi, braccia o attrezzo sopra la testa | 680 | y=270 | le mani arrivano a circa y=100 |
| Seduto su macchina o panca | 820 | y=300 | spalle y=450, sedile y=730, ginocchia y=705 (ex-48) |
| Sdraiato, vista laterale | figura lunga circa 800 | | x da 100 a 900, piano d'appoggio a y≈700-800 |

  Il file dell'esercizio fissa i numeri esatti.
- **Quote anatomiche da una sola scala** (rapporti di Winter, H = statura in px; con H=820 una donna di 170 cm ha 4,82 px/cm e la testa e' 109 px, 7,5 teste). Figura seduta, a partire dalla cima della testa T e dalla suola Y (scarpa 12 px):

| Punto | Formula | ex-48 (T=300, Y=950) |
|---|---|---|
| Mento | T + H/7,5 | 409 |
| Spalle (giunti) | T + 0,182 H | 450 |
| Anche (giunti) | spalle + 0,288 H | 685 |
| Piano del sedile | anche + 0,055 H | 730 |
| Centro del ginocchio | Y - 12 - 0,285 H | 705 |
| Caviglia | Y - 12 - 0,039 H | 906 |
| Braccio, avambraccio, mano | 0,186 H, 0,146 H, 0,108 H | 152, 120, 89 |
| Gomito -> centro della presa | avambraccio + 0,4 mano | 155 |

  Controlli: dal sedile alla cima della testa circa 0,525 H; dalla suola al sedile circa 0,27 H. Se le cosce appoggiano sul sedile, il centro del ginocchio sta **sopra** il piano del sedile (di circa mezza coscia), mai sotto: il primo prompt di ex-48 aveva le ginocchia 35 px sotto il sedile e stinchi corti del 23%.
- **Vista**: perpendicolare al piano del movimento. Scegliere la vista in cui le parti mobili **ruotano nel piano dell'immagine**:
  - profilo per gambe e busto sul piano sagittale (squat, stacchi, leg extension, curl, rematori);
  - frontale per spinte sopra la testa, alzate laterali, abductor, lat machine.

  La vista 3/4 si evita: rotazioni fuori piano e prospettiva aumentano gli errori tra le pose.

## 4. Scheda personaggio, attrezzi, stile

I blocchi vanno incollati **identici** (carattere per carattere) in tutti i prompt di un esercizio. Esercizi pari: donna; dispari: uomo.

Donna (330 caratteri):
```
The woman: late 20s, athletic and toned, 7.5 heads tall. Dark brown hair #2B211C in a high ponytail. Skin #D2B8A3. Black sports bra #201E1E with thin seams, slate grey high-waist leggings #5B5E66, dark grey trainers #2F3237 with white soles and laces. Calm face with small simple features. A visible neck joins head and shoulders.
```
Uomo (296 caratteri):
```
The man: about 30, athletic and muscular, 7.5 heads tall. Short dark brown hair #2B211C. Skin #D2B8A3. Bare torso, black athletic shorts #201E1E with a side seam, dark grey trainers #2F3237 with white soles and laces. Calm face with small simple features. A visible neck joins head and shoulders.
```
Stile, in fondo a ogni prompt; si cambiano solo i muscoli (con la loro posizione) e i segmenti mobili:
```
Muscles painted on her skin: <primary, with shape and place, e.g. front and side deltoids as a rounded bright orange #fb8b3c cap over each shoulder joint, on the upper arm>; <secondary, e.g. triceps as a light orange #fdba8c band along the underside of each upper arm>; fine separation lines. Style: realistic proportions, crisp cel shading with one darker shade per colour, thin dark outlines, five distinct fingers per hand; <moving segments, e.g. upper arms, forearms and hands> as separate shapes with rounded ends overlapping at the joints. Plain transparent background: no floor, no shadow, no other objects, no text.
```
La frase "as separate shapes with rounded ends overlapping at the joints" serve all'animazione: le parti mobili vanno ritagliate e ruotate attorno ai giunti (§8). Si nominano solo i segmenti che si muovono.

Muscoli: per ognuno si dice **forma e posto sul segmento** (cupola, banda, lato di sotto), e solo se si vede dalla vista scelta. Un muscolo che dalla vista non si vede non va solo nominato, perche' Quiver lo inventa (il primo prompt di ex-48 diceva "triceps light orange" in vista frontale): si dipinge la parte visibile (in ex-48 la banda sul lato di sotto del braccio) o si omette.

Requisiti del disegno START per il rig (da `docs/ricerca-animazione-fluida.md` §5), da tradurre nel prompt dell'esercizio:

- ogni segmento mobile e' una forma chiusa a se' (braccio, avambraccio, mano o pugno con l'attrezzo, coscia, gamba, piede); l'attrezzo e' separato;
- giunti arrotondati che si sovrappongono un poco;
- muscoli evidenziati dentro un solo segmento: il deltoide come cupola centrata sul giunto della spalla e disegnata sul braccio (cosi' ruota con il braccio restando al suo posto), non meta' sul busto e meta' sul braccio;
- in START gli arti sono staccati dal busto, se possibile;
- c'e' spazio vuoto per tutta la corsa;
- l'attrezzo e' gia' impugnato con l'orientamento che manterra'.

Ombre a due toni sugli arti che ruotano: vanno bene se il lato in ombra resta in basso per tutta la corsa (vale per spinte e alzate nel piano frontale: il lato di sotto del braccio resta il lato di sotto). Altrimenti il build le appiattisce, dopo il controllo alla massima ampiezza. E' una scelta voluta, diversa dalla ricerca (§5.8 chiede colori piatti sugli arti che ruotano): il due toni da' il dettaglio chiesto dall'utente, e il rischio si controlla posa per posa.

Convenzioni per gli attrezzi (da usare nel blocco attrezzo):

| Parte | Colore e dettagli |
|---|---|
| Acciaio | `#8a919c`, con tappi e bulloni |
| Imbottiture | ardesia scuro `#34373D` con cuciture; non nero, per staccarle dal reggiseno e dai capelli |
| Impugnature, dischi, gomma | nero `#201E1E`, con rigatura |
| Dischi | anello centrale in acciaio |
| Bilanciere | zigrinatura sulle zone di presa |
| Cavo | grigio scuro sottile, con carrucole visibili |

Per ogni parte mobile della macchina va detto **come e' collegata** e **come si muove**.

Palette del build: per ogni materiale una base e un'ombra. Pelle `#D2B8A3`/`#B8997F`, arancio `#fb8b3c`/`#D96A22`, arancio chiaro `#fdba8c`/`#E9A272`, acciaio `#8a919c`/`#6B727D`, imbottitura `#34373D`/`#26282C`, nero `#201E1E`, leggings `#5B5E66`/`#474A51`, scarpe `#2F3237` con suola `#EDEDED`.

**Dettaglio ottenibile.** Con un prompt di 2.000-2.500 caratteri e una figura che riempie il canvas, Quiver arriva a circa 200 elementi per figura (ex-02 `su-a`): dita e nocche, lacci e suole, linee dei muscoli, cuciture, bulloni, dischi con anello.

Non si ottengono in modo affidabile:
- viso identico tra generazioni diverse;
- scritte e loghi;
- numeri esatti di oggetti (per esempio "6 dischi");
- meccanismi complessi (cavi che girano su piu' carrucole);
- simmetria perfetta.

Regola di priorita', quando il testo e' troppo lungo: prima la geometria (contatti e quote), poi la palette, infine al massimo 4-6 dettagli nominati. Se serve tagliare, si tagliano i dettagli, mai le quote.

**Stile scelto.** Contorno sottile e due toni, come ex-01..ex-25 e la bozza ex-02 `su-a`, che sono le immagini piu' dettagliate. Le dita restano leggibili anche nel riquadro dell'app: circa 340x187 px CSS, densita' 3x. Se l'utente preferisce lo stile piatto delle ultime immagini, basta togliere "thin dark outlines" dal blocco stile.

## 5. Modello di prompt per una posa

Ordine dei blocchi:

1. riga di riferimento, solo se si allega START;
2. inquadratura;
3. scheda personaggio;
4. attrezzo;
5. corpo fermo: appoggi, giunti fissi, presa, simmetria, viso (blocco identico in tutte le pose);
6. **posizione**: l'unico paragrafo che cambia;
7. muscoli e stile.

```
[REF] Attached image: the same illustration in another position. Keep the <woman>, outfit, colours, <machine>, camera, framing and scale; only <her arms and the two carriages> move.

Detailed vector illustration for a premium fitness app: one athletic <woman> <on a … / doing …>, strict <front | side> view<, facing right>, camera at <chest | hip> height. Square canvas, viewBox 0 0 1000 1000, one figure centred on x=500. <Shoe soles and … base> on y=950, top of her head at y=<Y>, <highest fixed part> at y=<Y>.

<CHARACTER BLOCK>

<EQUIPMENT BLOCK: parts, colours, positions (x, y), connections, which parts move and how>

<BODY BLOCK: support (what touches what), fixed joints with coordinates (shoulders, knees), what the camera sees of hands and feet, technique cue in positive form, both arms mirror each other, her face stays fully visible>

Position, <descriptive name>: <moving point> at x=…, y=…, <body landmark>. <Joint> at x=…, y=…, <landmark>; <segment> <N> degrees <above/below> horizontal; <joint> angle <N> degrees.

<MUSCLES + STYLE BLOCK>
```

Regole:

- Tra i prompt dello stesso esercizio cambia **solo** il paragrafo "Position". Il resto e' copia-incolla, carattere per carattere.
- Ogni quota va data in due modi: coordinata e punto di riferimento sul corpo ("y=405, level with her chin").
- Il punto mobile principale (in ex-48 la presa) e' **strettamente monotono** e avanza a passi uguali. Le altre quote e gli angoli si calcolano con la geometria (cinematica inversa a due segmenti, come nel file di ex-48), non si inventano; possono non essere monotoni (in ex-48 il gomito va prima in fuori e poi rientra).
- Angoli: "elbow angle" e' l'angolo interno (180 = braccio teso); i segmenti si danno rispetto all'orizzontale. Si scrive "degrees", mai il simbolo di grado. Con un gomito molto chiuso (sotto i 60 gradi) si descrive la posa ("forearms vertical, elbows directly below the grips") invece di scrivere l'angolo, che si puo' leggere come flessione.
- Pose bilaterali in vista frontale: coordinate specchiate (x e 1000-x) piu' la frase "both arms mirror each other".
- Mai i nomi START, MID, END o le percentuali nel testo (portano a etichette disegnate). Si scrive "bottom of the press", "halfway up", "top of the press".
- Frasi in positivo; una sola frase "no …", quella nel blocco stile. Mai chiedere ombre, pavimento, etichette o piu' figure, e niente frasi che la contraddicono ("feet flat on the floor" insieme a "no floor": si scrive "feet flat").
- Lunghezza: al massimo circa 2.400 caratteri senza la riga REF (ex-48: 2.345-2.381) e circa 2.550 con la riga REF; si misura con `wc -c` (prompt solo ASCII). Il rifiuto e' arrivato a 9.144.

## 6. Coerenza tra pose generate separatamente

Con il rig (§8) il disegno animato viene **tutto da START**: busto, testa, gambe e attrezzo fermo come base, e le parti mobili di START ruotate. END non entra nel disegno; serve solo che abbia **proporzioni, scala e inquadratura simili**, per leggerne angoli e ampiezza. Il rischio di differenze tra pose generate separatamente quindi scende molto. I punti sotto servono a tenere END (e un'eventuale MID) leggibile e confrontabile.

1. **Testo.** Blocchi identici, stesse ancore, stessa vista, stessa descrizione dell'attrezzo. Quiver non espone un seed.
2. **Riferimento da START** (da provare su ex-48).
   - Scelta la variante START, l'agente la pulisce e crea il PNG: `node esercizi-bozze/riferimenti/crea-riferimento.js <start.svg> --png esercizi-bozze/riferimenti/ex-NN-start.png` (servono `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` e `NODE_PATH=/opt/node-tools/node_modules`). Lo script toglie fondo, ombre, scritte e tratti chiari e rende il quadrato su fondo bianco.
   - L'utente lo allega in Quiver al prompt di END (ed eventualmente di MID), con la riga `[REF]` in testa.
   - Le API di Quiver accetterebbero "references" (immagini, come URL o base64), quindi l'app probabilmente ha un pulsante "allega immagine". **Non verificato oggi**: la fonte e' il riassunto di una ricerca web del 5/10/2026 sulla documentazione (docs.quiver.ai, "Text to SVG"), citato in una sessione precedente; il 10/10/2026 docs.quiver.ai non e' raggiungibile da questo ambiente (il proxy risponde 403). **Da chiedere all'utente** (domanda 1).
   - Prova: la prima generazione END con riferimento.
     - Se, dopo la registrazione, le parti ferme di END coincidono con START (sovrapposizione della sagoma di gambe, busto e macchina di almeno 0,9) → si adotta il riferimento.
     - Altrimenti → si resta al solo testo.
3. **Modifica di un SVG esistente** (Arrow 2 permetterebbe di modificare e animare SVG gia' fatti; **non verificato**: lo dice solo il titolo di un articolo di terzi, tech.ifeng.com, trovato con una ricerca web il 10/10/2026): se l'app permette "Edit" su una bozza, si puo' provare a chiedere su START "move only her arms to …". E' la strada piu' coerente possibile; costa una generazione di prova.
4. **Build, sempre.** Il disegno animato viene da START. END si registra su START (traslazione e scala dalle parti ferme: base, sedile, scarpe) solo per leggere gli angoli finali dei segmenti. Se la scala si scosta di piu' del 10% o le proporzioni degli arti sono diverse, gli angoli si leggono male → si rigenera END una volta; se fallisce ancora, per le macchine con corsa nota si usano gli angoli calcolati (§8).
5. **Calendario (avviso da tenere).** I modelli Arrow 1.x (arrow-1, arrow-preview, arrow-1.1, arrow-1.1-max) verrebbero ritirati il 16 ottobre 2026 alle 08:00 UTC, cioe' tra 6 giorni. **Non verificato oggi**: la frase viene dalla documentazione di Quiver (pagina dei modelli) come riportata da una ricerca web del 5/10/2026 in una sessione precedente; nei file del repo non c'e' fonte, il 10/10/2026 docs.quiver.ai e' bloccato dal proxy (403) e la ricerca web non ritrova la pagina. Conseguenze pratiche: se l'app usa ancora Arrow 1.1, il comportamento (quadrato, stile a tracciato) potra' cambiare; START ed END di uno stesso esercizio vanno generati **con lo stesso modello** (entrambi prima del 16/10 oppure entrambi con Arrow 2). La prima START di ex-48 serve anche da taratura: canvas, dettaglio, struttura.

## 7. Controllo qualita'

### 7.1 Controllo per variante (10 secondi, passa/non passa)

1. Una sola figura, intera, con l'attrezzo intero e niente tagliato. La figura e' grande: almeno l'80% dell'altezza prevista.
2. Vista giusta (frontale o profilo). Se l'esercizio e' bilaterale, i due lati sono simmetrici.
3. Persona giusta: genere, capelli, abiti e colori della scheda personaggio.
4. Posa giusta: il punto mobile e' al livello indicato (per esempio "maniglie all'altezza del mento"), gli angoli sono plausibili e i due lati sono uguali.
5. Mani con le dita visibili e sull'attrezzo; piedi a terra o sulla pedana.
6. Testa collegata dal collo; viso visibile e non coperto.
7. Primari arancioni ben visibili su entrambi i lati; secondari presenti.
8. Attrezzo completo e coerente con la descrizione (parti e collegamenti).
9. Nessuna scritta o etichetta. Fondo, ombre e tratti chiari sono ammessi solo se non coprono la figura.
10. Solo START (disegno principale): i segmenti mobili sono forme separate con giunti arrotondati; gli evidenziati stanno dentro un solo segmento; gli arti sono staccati dal busto.
11. Solo END ed eventuale MID (riferimenti): stesse proporzioni e scala di START, con gli angoli leggibili. La sovrapposizione la verifica l'agente.

Si tiene la variante con piu' voci superate. Colori inesatti, fondo e ombre non contano: li corregge il build.

### 7.2 Controllo automatico (agente)

Si lancia `crea-riferimento.js` sulla bozza (stampa un JSON; per le bozze quadrate il campo `controlli_v2` riassume le soglie):

- riempimento in altezza di almeno 0,8 dell'inviluppo previsto;
- bordo basso a 950 ±25 sul canvas 1000 e centro x a 500 ±30 (`base_a_950`, `centro_x_500`);
- `scritte` e `scritte_tracciate` = 0 (`nessuna_scritta`): Quiver scrive le etichette anche come tracciati, non solo come `<text>`;
- gradienti e filtri vanno segnalati (`senza_gradienti_filtri`);
- `simmetria_iou` di almeno 0,8 per le pose frontali simmetriche;
- `figure_separate` = 1 (`una_figura`).

Le pulizie sono euristiche: come ombre toglie solo forme basse e larghe (almeno il 12% del lato) nella parte bassa del canvas, chiare o trasparenti, quindi l'acciaio pieno (traverse, basi, telai `#8a919c`) resta; come scritte tracciate toglie forme scure, piccole e isolate che formano una parola o una fila di lettere. Provato il 10/10/2026 su tutte le 157 bozze: nessun errore, etichette trovate in 15 bozze, nessun pezzo di figura o di macchina tolto nelle bozze guardate (ex-02 `su-a`, ex-15-a, ex-26-a, ex-43-b, ex-50-a). Il PNG va comunque guardato prima di allegarlo.

Per END (ed eventuale MID), inoltre, dopo la registrazione su START:

- scala entro ±10%;
- lunghezze di braccio e avambraccio entro ±10% di START, altrimenti gli angoli finali si leggono male.

Sovrapposizione delle parti ferme di almeno 0,9: serve solo per decidere se il riferimento allegato funziona (§6).

### 7.3 Correzioni di una riga

Si aggiunge la riga in coda al prompt **della sola posa** da rifare. Al massimo un nuovo tentativo con la correzione; se fallisce ancora, la posa la sistema il build (con la geometria o da START/END) oppure decide l'utente.

| Difetto | Riga da aggiungere |
|---|---|
| Figura piccola | `The figure and the machine fill the canvas from y=<top> to y=950.` |
| Vista sbagliata | `Strict front view: both shoulders, both arms and both knees equally visible, body square to the viewer.` |
| Piu' figure o oggetti in piu' | `Exactly one person and one machine, nothing else.` |
| Dita assenti | `Each hand clearly shows four curled fingers over the front of the grip and the thumb under it.` |
| Mani staccate | `Both hands are closed firmly around the grips.` |
| Lati asimmetrici | `Both arms are exact mirror images; both grips at exactly the same height.` |
| Quota sbagliata | `The grips are exactly at y=<Y>, level with her <landmark>.` |
| Gomito troppo tirato | `Elbows clearly bent at <N> degrees.` |
| Gomito non disteso (END) | `Arms almost straight with soft elbows, elbow angle 165 degrees.` |
| Testa staccata | `Her neck clearly connects her head to her shoulders.` |
| Viso coperto | `Her face is fully visible between her arms.` |
| Muscoli poco visibili | `Both <muscles> are large, clearly orange #fb8b3c shapes, fully visible.` |
| Spalle alzate | `Shoulders pressed down, far from the ears.` |
| Schiena staccata | `Her whole back touches the backrest.` |
| Scritte o etichette | `The image contains only the drawing of the woman and the machine; all space around them stays empty.` |
| Gradienti o sfocature | `Solid flat colour fills with crisp edges only.` |
| Tratti o forme di sfondo | `All space around the woman and the machine stays empty and transparent.` |
| Attrezzo diverso o incompleto | ripetere il blocco attrezzo senza modifiche e allegare il riferimento START |

## 8. Quante pose generare

Allineato a `docs/ricerca-animazione-fluida.md`. Vincitore: un **rig a trasformazioni** che anima **un solo disegno START diviso in parti**, con perni ai giunti, cinematica inversa e un unico avanzamento con easing. Numeri della ricerca:

| Tecnica | Fantasmi | Indice di scatto |
|---|---|---|
| Crossfade a 5 pose (attuale) | 50,9% | 0,081 |
| Crossfade a 9 pose | 52,3% | 0,085 |
| Rig a trasformazioni | 0,3% | 0,023 |

Il rig pesa circa 13-20 KB. Le pose intermedie sono geometria vera: **non si comprano**.

| Tipo di movimento | Esempi | Da generare in Quiver | Note |
|---|---|---|---|
| Rotazione rigida attorno a un giunto | alzate laterali e frontali, slanci, abductor, kickback, calf raise | START (4 varianti) + END di riferimento (facoltativo, 1-2 varianti) | END utile per controllare ampiezza e anatomia |
| Flessione a due segmenti | spinte (ex-48), curl, rematori, tirate, tricipiti, lat machine, leg extension/curl | START (4) + END di riferimento (1-2), **necessario** per l'angolo finale | MID, 25% e 75% solo di riserva |
| Corpo intero o busto | squat, stacchi, affondi, push-up, hip thrust, good morning | START (4) + END (1-2) | + MID solo se il busto si flette (crunch) |
| Macchine e cavi | leg press, pulley, croci ai cavi, pectoral, macchine a leva | START (4, macchina completa con parti mobili separate) + END (1-2) | leva, cavo e pacco pesi animati dal rig |

- **START** e' l'unico disegno che finisce nell'animazione: tutto il budget di dettaglio va li'. Requisiti in §4.
- **END** e' un riferimento per angoli e ampiezza: puo' essere meno curato, ma con le stesse proporzioni. Per le macchine con corsa nota (maniglia o carrello su una guida) gli angoli finali si possono anche calcolare con la geometria del file dell'esercizio, riportata sulle lunghezze di braccio e avambraccio misurate in START: END resta il controllo dell'anatomia e dell'ampiezza; se fallisce due volte, il rig usa gli angoli calcolati invece di una terza generazione.
- Le quote delle pose di riserva (MID, 25%, 75%) si calcolano con la stessa geometria. Il file di ex-48 le contiene gia', nel caso il controllo del rig chieda di vedere disegnata una posa intermedia.
- Limiti del rig (dalla ricerca): parti rigide, quindi niente pieghe, muscoli che si deformano, pronazione del polso o busto che si flette; lo stile e' da "cartone a ritaglio" fluido. Per movimenti fuori dal piano (rotazione del polso nell'Arnold press) servono piccoli scambi di dettaglio o un'altra vista.

## 9. Cambiamenti nella pipeline (alto livello)

1. Nomi dei file: `esercizi-bozze/ex-NN-slug-<posa>-{a..d}.svg`, con posa = `start`, `end`, oppure le riserve `mid`, `q1`, `q3`. Il riferimento va in `esercizi-bozze/riferimenti/ex-NN-start.png`.
2. Pulizia di START, come prima. Non serve piu' dividere le figure per colonne.
3. Palette per materiale, con base e ombra. Mai pelle verso arancione. I gradienti diventano il loro colore medio.
4. Divisione di START in parti con id (busto, testa, gambe, braccio, avambraccio, mano o attrezzo, deltoide). Se Quiver ha unito due segmenti: taglio con `clipPath` e cerchio di copertura al giunto (piano B della ricerca).
5. Rig JSON: perni dai giunti di START, angoli finali letti da END registrata su START. Poi `esercizi-bozze/prototipi-v2/rig-anim.js` genera l'SVG animato e `verifica-rig.js` lo controlla (peso al massimo 60 KB, riduzione movimento = START, giunzione del ciclo, scatti).
6. Controllo a occhio alla massima ampiezza (ingrandimenti dei giunti) e foglio di contatto. Le ombre degli arti che ruotano devono restare plausibili; se no si appiattiscono.
7. Inquadratura finale sull'inviluppo del movimento, rapporto 4:3 (con arti a lunghezza costante la posa alta puo' uscire dal riquadro della bozza).
8. Le immagini gia' pubblicate a crossfade restano come sono finche' l'utente non decide; per quelle si applicano i miglioramenti senza nuove generazioni indicati nella ricerca (§10 di quel file).

## 10. Costo e flusso per esercizio

| Fase | Generazioni | Varianti |
|---|---|---|
| START, disegno principale | 1 | 4 (si sceglie la migliore, l'agente crea il PNG di riferimento) |
| END, riferimento | 1 | 1-2, col PNG allegato se possibile |
| MID (solo crunch o su richiesta del build) | 0-1 | 1-2 |
| Eventuale rifacimento mirato di una sola posa | 0-1 | |

- Totale tipico: **2 generazioni** (circa 5-6 varianti se l'app permette di sceglierne il numero, 8 se ne fa sempre 4), contro 1 generazione da 4 varianti del foglio a 5 pose. Circa 1,3-2 volte i crediti, ma con il disegno animato 4-6 volte piu' dettagliato, zero fantasmi e pose rifacibili una per una.
- Come risparmiare:
  - riusare la stessa START (stessa persona e macchina) negli esercizi gemelli (15/16 lat machine, 13/14 trazioni);
  - generare MID e le altre riserve solo se il controllo del rig lo chiede.
- Ordine: START, poi controllo, scelta e PNG di riferimento; poi END e il suo controllo; infine il build (rig).

## 11. Domande aperte per l'utente

1. In Quiver: c'e' un pulsante per allegare un'immagine di riferimento? Si possono scegliere il formato 1:1 e il numero di varianti? Quale modello usi (Arrow 1.1, Arrow 2, Arrow 2 Telos)? Per ex-28 ed ex-31 era diverso? Urgente se e' Arrow 1.1: il ritiro annunciato per il 16/10/2026 (non verificato, §6) cadrebbe tra START ed END di ex-48.
2. Stile: va bene tornare al look dettagliato delle prime immagini (contorno sottile e ombre a due toni, come ex-01..ex-25), anche se diverso dalle ultime, piu' piatte?
3. Budget: vanno bene 2 generazioni per esercizio (START con 4 varianti, END di riferimento con 1-2), piu' un eventuale rifacimento di una sola posa?

## 12. Strumenti di supporto

Gli script della revisione del 10/10/2026 sono in `esercizi-bozze/riferimenti/strumenti/` (`misura_bozze.js` e `render.js` usano Playwright, con le stesse variabili di `crea-riferimento.js`; `analizza.py` usa numpy e Pillow):

- `geometria-ex48.js` (scrive `geometria-ex48.json`): scala anatomica (donna di 170 cm = 820 px) e cinematica inversa a due segmenti, con le quote delle cinque pose (START, 25%, MID, 75%, END).
- `genera-guida.js <out.svg>`: disegna la guida delle quote `ex-48-guida-quote.svg` (pannelli START ed END) dal JSON della geometria.
- `render.js <in.svg> <out.png> [larghezza]`: trasforma un SVG in PNG con Chromium, per guardare la guida.
- `prompt-ex48.js` (scrive `prompt-ex48.json`): assembla i blocchi identici e il paragrafo della posa, conta i caratteri e segnala le parole vietate (START, MID, END, "%", simbolo dei gradi, caratteri non ASCII).
- `scrivi-ex48-md.js <out.md>`: scrive `docs/prompt-esercizi/ex-48-shoulder-press-machine.md` dai due JSON; dopo la generazione il file e' stato ritoccato a mano in tre punti, quindi confrontare prima di rigenerarlo.
- `misura_bozze.js <bozze.svg...>`: riquadro del disegno di ogni bozza senza fondo, ombre, scritte e tratti decorativi, piu' maschera PNG; scrive in `strumenti/misure/` (cartella da non committare).
- `analizza.py` (dopo `misura_bozze.js`): separa le figure per colonne vuote e controlla il quadrato centrale; scrive `misure/analisi.json`.
- `dettaglio.py` (dopo `analizza.py`): medie per regime della tabella di §1 (elementi e coordinate di path per figura).
