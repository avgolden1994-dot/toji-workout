# ex-48 Shoulder Press Machine: valutazione delle 4 varianti START (donna)

Data: 11/10/2026. Bozze: `esercizi-bozze/ex-48-donna-start-{a,b,c,d}.svg` (copie identiche dei file caricati dall'utente, viewBox `0 0 1000 1000`), generate con il prompt START di `docs/prompt-esercizi/ex-48-shoulder-press-machine.md`. Metodo: `docs/metodo-immagini-v2.md` (§7); animazione: `docs/ricerca-animazione-fluida.md`.
Misure in Chromium (Playwright): `getBBox`, contorni campionati con `getPointAtLength` (cerchio adattato al gomito, assi di braccio e avambraccio), `esercizi-bozze/riferimenti/crea-riferimento.js`. Coordinate nel canvas 1000; "sinistra" = lato sinistro dell'immagine (braccio destro di lei).

## In breve

- **Scelta: variante a.** E' l'unica con i colori della scheda personaggio, il file e' pulito (niente fondo, niente tratti vaganti), ha tutti i dettagli chiesti (impugnature rigate, quattro dita e pollice, lacci) e le due braccia sono speculari al mezzo pixel. Le altre tre hanno la stessa posa e la stessa costruzione, con un difetto in piu' ciascuna.
- **Non serve rigenerare START.** In nessuna variante braccio e avambraccio sono forme separate (4 su 4: un solo tracciato dalla spalla al polso), ma il taglio al gomito (piano B) funziona: la prova statica fatta col disegno di a da' una posa di fine spinta credibile (`esercizi-bozze/riferimenti/ex-48-anteprima-rig-a.png`). Costo: circa 4-5 ore di build invece di 1,5-2.
- **Ancore ignorate, rapporti rispettati.** Quiver ha riempito il canvas (macchina da y=4 a y=928, suole a y=969): la donna e' circa 1,37 volte piu' grande del previsto e spostata in alto (cima della testa a 78 invece di 300, prese a 258 invece di 405). Tutti i rapporti col corpo pero' sono giusti: prese al mento, avambracci verticali, gomiti al fondo del reggiseno, braccio a 45 gradi sotto l'orizzontale, gomito a 47 gradi.
- **Manca spazio in alto per la fine della spinta.** Con le braccia misurate la presa sale di 237 px, fino a y=20: le mani restano nel canvas, ma i carrelli arriverebbero a y=-66, sopra la traversa (y 25-57) e sopra le cime dei montanti (y=4). Il build alza traversa e cime di 165 px, allunga i montanti e porta il viewBox a circa `170 -175 660 1160`. Nell'inquadratura finale la figura e' 0,86 volte la bozza, ma occupa il 77% dell'altezza: piu' di quanto prevedeva il prompt (circa 70%).
- **END**: prompt calibrato sulla variante a (§8, 2.373 caratteri), **senza** riga REF: qui l'immagine allegata spingerebbe Quiver a tenere l'inquadratura di START, dove i carrelli alzati non ci stanno.

## 1. Le quattro varianti

| Variante | Elementi (KB) | Cose da sapere |
|---|---|---|
| a | 188 (27) | nessun fondo, nessun tratto vagante; capelli castano scuro, top nero; deltoide disegnato **dietro** al braccio, con sopra una toppa color pelle |
| b | 206 (29) | rect di fondo bianco al 70%; capelli castano chiaro; tricipite arancio al 50% (il piu' chiaro); tappi delle impugnature diversi (a punta e piatto) |
| c | 162 (25) | 2 tratti grigi vaganti negli angoli alti; impugnature lisce, senza rigatura; montanti interi, ma con il manicotto del carrello fuso nel montante |
| d | 199 (29) | rect di fondo + 9 tratti bianchi spessi ai lati; capelli neri e top grigio-blu; tappi delle impugnature uguali |

Le quattro bozze sono lo stesso disegno con piccole varianti: tutte le quote coincidono entro 2-4 px (§4) e le braccia sono costruite allo stesso modo (§6).

## 2. Controllo qualita' (metodo §7.1 e lista di ex-48)

| Voce | a | b | c | d |
|---|---|---|---|---|
| 1. Una figura intera, attrezzo intero, figura grande | OK: 1 figura, 890 px dalla cima della testa alle suole (137% del previsto); la macchina tocca quasi il bordo alto (y=4) | OK, idem | OK, idem | OK, idem |
| 2. Vista frontale, lati simmetrici | OK: braccia speculari entro 0,5 px, IoU 0,951; tappi delle impugnature diversi (tondo e disco) | OK con riserva: braccia sfalsate 3-5 px, IoU 0,971; tappi a punta e piatto | OK: IoU 0,985; tappi a punta e a disco | OK: braccia speculari, tappi uguali, IoU 0,940 |
| 3. Persona e colori della scheda | OK: capelli #402D22, top #2D2D2D, leggings #50545A, scarpe #3D454F con suola e lacci bianchi | NO (lieve): capelli castano chiaro #69482D | OK: capelli #4F3223 (castano caldo), leggings piu' chiari #646D75 | NO: capelli neri #2B2B2B, top grigio-blu #3D4857 |
| 4. Posa: prese al mento, avambracci verticali, gomiti sotto le prese, lati uguali | OK: centro presa y=258 (mento 252), avambraccio a 2 gradi dalla verticale, gomito 7 px fuori dalla presa, a y=430 (fondo reggiseno 429) | OK, idem (entro 2 px) | OK, idem | OK, idem |
| 5. Mani con le dita sull'attrezzo, piedi a terra | OK: pugno chiuso, 4 dita sopra l'impugnatura, pollice sotto; piedi piatti | OK | OK | OK |
| 6. Collo e viso | OK: collo visibile (circa 30 px), viso libero | OK | OK | OK |
| 7. Muscoli | OK: cupola arancione su tutte e due le spalle; banda del tricipite sotto il braccio, ma arancio pieno #EF8944 invece di arancio chiaro | OK: banda arancio al 50%, la piu' vicina all'arancio chiaro | OK: banda arancio pieno | OK: banda arancio pieno |
| 8. Attrezzo completo e coerente | OK: 2 montanti, traversa, carrelli con piastra, bulloni e maniglia, sedile su montante, schienale, base con piedini. Schienale fino alle sopracciglia (il prompt lo voleva sopra la testa) | OK, idem | NO (lieve): impugnature lisce, senza rigatura | OK, idem |
| 9. Niente scritte; fondo e tratti | OK: niente da togliere | OK: togliere il fondo (rect 0) | OK: togliere 2 tratti (0, 1) | OK: togliere il fondo (0) e 9 tratti (1-9) |
| 10. Segmenti mobili separati (solo START) | NO: braccio e avambraccio in un solo tracciato (82, 88); mano, deltoide e tricipite separati | NO, idem | NO, idem | NO, idem |
| ex-48 1. Prese al mento, avambracci verticali, gomiti al fondo del reggiseno | OK | OK | OK | OK |
| ex-48 2. Ginocchia appena sopra il sedile, stinchi lunghi, piedi piatti | OK: ginocchia circa y=590, sedile 609; ginocchio-suola circa 380 px = 0,43 dell'altezza testa-suole | OK | OK | OK |
| ex-48 3. Mani chiuse, cinque dita in tutto | OK | OK | OK | OK |
| ex-48 4. Forme separate; cupola sulla spalla; banda arancio chiaro sotto il braccio | NO (forme e colore della banda); cupola e posizione della banda OK | NO (forme); banda quasi OK | NO (forme e colore) | NO (forme e colore) |
| ex-48 5. Macchina completa, spalle basse, viso libero, niente scritte | OK: spalle basse (dal lobo dell'orecchio alla cima del deltoide 74 px = 0,42 teste) | OK | OK (senza rigatura) | OK |
| Ancore del prompt (testa, prese, traversa, sedile) | NO (§4) | NO | NO | NO |

Esito: **a** supera tutte le voci tranne la 10 (comune a tutte) e le ancore (comuni a tutte). **b** perde la 3 e ha un'asimmetria visibile nelle impugnature; **c** perde la rigatura; **d** perde la 3. Colori, fondo e tratti li corregge il build e per il metodo non contano nella scelta, ma con a non serve nessuna correzione di colore della persona.

Nessuna ombra a terra in nessuna variante.

## 3. Controllo automatico (`crea-riferimento.js`)

| | a | b | c | d |
|---|---|---|---|---|
| Riquadro del disegno (canvas 1000) | x 190-808, y 4-969 | 192-810, 4-969 | 191-811, 3-972 | 190-809, 6-970 |
| Riempimento in altezza | 0,965 | 0,966 | 0,969 | 0,964 |
| Tolti: fondo / ombre / scritte | 0 / 0 / 0 | 1 / 0 / 0 | 0 / 0 / 0 | 1 / 0 / 0 |
| Tolti come "decorazioni" | 16 (tutti lacci) | 34 (lacci) | 18 (2 tratti + 16 lacci) | 31 (9 tratti + 22 lacci) |
| Elementi del disegno, colori | 172, 43 | 171, 40 | 144, 42 | 167, 44 |
| Simmetria (IoU) | 0,951 | 0,971 | 0,985 | 0,940 |
| Figure separate | 1 | 1 | 1 | 1 |
| `controlli_v2` (base a 950, centro a 500, niente scritte, una figura, niente gradienti o filtri) | tutti veri | tutti veri | tutti veri | tutti veri |

**Difetto dello script.** In tutte e quattro le bozze toglie i **lacci bianchi delle scarpe** (tratti chiari senza riempimento) come "decorazioni": e' un falso positivo, i lacci li chiede il prompt. Per il PNG di riferimento e' un danno piccolo; nel build questa regola non va usata cosi' com'e'. Correzione proposta: non togliere un tratto chiaro se il suo punto medio cade dentro una forma piena del disegno (per esempio `document.elementsFromPoint` sul centro del tratto, ignorando il fondo).

## 4. Misure e confronto con il prompt

| Punto | Prompt | a | b, c, d | Scarto di a |
|---|---|---|---|---|
| Cima della testa (capelli) | 300 | 78 | 79-80 | -222 |
| Mento | 409 | 252 | 251-253 | -157 |
| Testa con i capelli, altezza | 109 | 174 | 171-174 | +60% (figura stilizzata, testa grande) |
| Giunti delle spalle (centro della cupola del deltoide) | x 415/585, y 450 | x 400/600, y 323 (incertezza 8 px) | uguali | -127 in y |
| Bordo esterno dei deltoidi | 390-610 (220) | 354-646 (292) | 355-649 | +33% |
| Gomiti (perno, cerchio di raggio 22) | x 310/690, y 560 | x 292/708, y 430 | x 293-294 / 707-710, y 431 | -130 in y, 18 px piu' larghi per lato |
| Centro delle prese | x 310/690, y 405 | x 285/715, y 258 | x 286-287 / 716-719, y 257-258 | -147 in y, 25 px piu' larghe per lato |
| Fondo del reggiseno | 558 | 429 | 428-430 | -129 |
| Piano del sedile | 730 | 609 | 610-611 | -121 |
| Ginocchia | 705 | circa 590 | uguali | circa -115 |
| Suole | 950 | 969 | 969-972 | +19 |
| Base (piedini) | 950 | 928 | 928-932 | -22 |
| Traversa | 70 | 25-57 | 24-58 | circa -30 |
| Cime dei montanti | - | 4 | 3-6 | sul bordo del canvas |
| Montanti (asse) | 190/810 | 252/749 | uguali | 62 px piu' stretti; tutta la macchina va da 190 a 810 |
| Schienale, bordo alto | 270, sopra la testa | 173, alle sopracciglia | 172-174 | 95 px sotto la cima della testa |
| Carrelli (in START) | - | y 171-346 | uguali (c: 192-347, solo piastra) | |
| Braccio, spalla-gomito | 152 | 153 | 151-153 | +1% |
| Gomito-centro della presa | 155 | 174 | 173-174 | +12% |
| Angolo del gomito | 44 | 47 | 47-48 | +3 gradi |
| Braccio sotto l'orizzontale | 46 | 45 | 44-45 | -1 grado |
| Avambraccio dalla verticale | 0 | 2 (asse gomito-presa; 5 l'asse del solo avambraccio) | 2-5 | |

Lettura:
- Quiver ha **adattato la scena al canvas**: cima della macchina a y=4, suole a y=969, cioe' il 96,5% dell'altezza. Le ancore assolute che avrebbero lasciato spazio vuoto in alto (cima della testa a 300, traversa a 70) sono state ignorate; i numeri estremi (base a 950, montanti a 190/810) sono diventati i bordi del disegno.
- La figura e' 1,37 volte piu' grande dal capo ai piedi (1,29 dalle spalle ai piedi) e ha la testa grande: e' uno stile, coerente nelle 4 varianti.
- Sono stati rispettati **tutti i rapporti col corpo**: prese al livello del mento, gomiti al fondo del reggiseno, avambracci verticali con i gomiti sotto le prese, angoli di braccio e gomito, ginocchia appena sopra il sedile. Le lunghezze di braccio (153) e avambraccio piu' mano (174) sono vicine a quelle chieste in px, quindi anche la corsa (237 px) e' quasi quella prevista (241).

## 5. Corsa e spazio in alto (fine della spinta)

Cinematica inversa a due segmenti con le misure di a (spalla 400,323; gomito 292,431; presa 285,5/257,5; braccio 152,7; gomito-presa 173,6; la presa resta su x=285,5 perche' il carrello scorre in verticale):

| Avanzamento | Presa y | Gomito (x, y) | Angolo del gomito | Avambraccio (+ = presa piu' esterna del gomito) |
|---|---|---|---|---|
| 0 (START) | 257,5 | 292, 431 | 47 | +2,1 |
| 0,2 | 210,1 | 259, 382 | 59 | -8,8 |
| 0,4 | 162,6 | 248, 332 | 74 | -12,6 |
| 0,5 | 138,9 | 248, 308 | 83 | -12,5 |
| 0,6 | 115,2 | 252, 286 | 93 | -11,2 |
| 0,8 | 67,8 | 271, 241 | 118 | -4,7 |
| 1 (165 gradi) | 20,4 | 326,6, 189 | 165 | +13,7 |

Elenco completo a 10 passi in `esercizi-bozze/riferimenti/ex-48-rig-misure.json`. A fine corsa: braccio ruotato di 106,3 gradi attorno alla spalla, braccio 61 gradi sopra l'orizzontale, gomiti all'altezza degli occhi (y 189, occhi 184), prese una mano sopra la testa. A meta' corsa i gomiti escono fino a x=248 e passano davanti ai montanti (x 231-273): il braccio resta davanti, l'ordine di disegno non cambia e nella prova si legge in modo naturale.

**Spazio che manca.** Il carrello va da 86 px sopra la presa a 89 px sotto: a fine corsa occupa y da -66 a 109. La traversa e' a y 25-57 e le cime dei montanti a y=4: mancano 123 px piu' un margine di circa 40 px, cioe' **circa 165 px**. Le mani invece restano dentro il canvas (presa a y=20).

| Soluzione | Cosa fa il build | viewBox | Figura rispetto alla bozza | Giudizio |
|---|---|---|---|---|
| A. Alzare la traversa (consigliata) | montanti allungati fino a y=-161, traversa e cime alzate di 165 px (traversa a y da -140 a -108), carrello a fine corsa 42 px sotto la traversa | `170 -175 660 1160` | 0,86 (77% dell'altezza del riquadro) | la macchina resta quella disegnata; montanti un po' piu' alti, realistici |
| B. Togliere la traversa | montanti allungati solo fino a y circa -90, con i tappi | `170 -100 660 1085` | 0,92 | cambia l'aspetto della macchina (niente telaio chiuso) |
| C. Accorciare la corsa | nessuna modifica alla macchina | `0 0 1000 1000` | 1 | il carrello si ferma sotto la traversa con la presa a y 153, gomito a circa 80 gradi: meta' spinta. Scartata |

Nell'app l'immagine sta in un riquadro 300:165 con `object-fit: contain`, quindi conta l'altezza dell'inviluppo: con A la figura e' alta 890 unita' su 1160. Nel piano del prompt (figura di 650 in un inviluppo di circa 920) era il 70%: con A la figura risulta piu' grande del previsto, non piu' piccola.

## 6. Come sono costruite le braccia e costo del rig

| | a | b | c | d |
|---|---|---|---|---|
| Braccio + avambraccio + polso | un tracciato: 82 / 88 | un tracciato: 127 / 106 | un tracciato: 82 / 98 | un tracciato: 129 / 106 |
| Attacco sotto il busto, fino a x | 417 (bordo del busto 416) | 421 | 443 | 442 |
| Deltoide | 80 / 86, **dietro** al braccio, coperto in parte da una toppa pelle 81 / 87 | 128 / 107, sopra il braccio | 84 / 100, sopra, senza contorno | 131 / 108, sopra, con contorno |
| Tricipite | 83 / 89, arancio pieno | 129 / 108, arancio al 50% | 83 / 99, arancio pieno | 130 / 107, arancio pieno |
| Pugno e pollice | 126-129 e 130 / 137-140 e 141 | forme separate | forme separate | forme separate |
| Maniglia e carrello | separati; costole 144-150 / 151-157 disegnate sopra i pugni | separati | separati; manicotto fuso nel montante | separati |
| Montante dietro al carrello | manca (da y 193 a 345): va aggiunto | manca | c'e', ma col manicotto: va ridisegnato | manca |

**Prova del piano B** (statica, solo per stimare costo e rischio; script provvisorio, da rifare con `esercizi-bozze/prototipi-v2/rig-anim.js`):
- il tracciato del braccio clonato due volte, ognuna con un `clipPath` a semipiano passante per il perno del gomito lungo la bisettrice tra avambraccio e braccio (direzione 0,367, -0,930 a sinistra); cerchio di copertura di raggio 23 color pelle col contorno, sotto i due pezzi;
- braccio `rotate(106.3, 400, 323)`; avambraccio `translate(gomito nuovo - gomito vecchio) rotate(-11.6, 292, 431)`; mani, maniglie e carrelli `translate(0, -237)`; montanti nuovi dietro e parti alte `translate(0, -165)`. Lato destro specchiato.

Risultato (`esercizi-bozze/riferimenti/ex-48-anteprima-rig-a.png`: START, meta' corsa, fine corsa, ingrandimento di spalla e gomito a fine corsa):
- la posa si legge bene in tutte e tre le fasi, la macchina allungata e' pulita, il viso resta libero;
- **gomito**: il cerchio di copertura fa un bozzo tondo sul lato interno, e l'angolo della piega (dove in START l'avambraccio tocca il braccio, vicino a 312,400) diventa una punta sul bordo del braccio. Va rifinito il contorno (circa 20 px) e la linea della piega 131 / 142 va spenta entro il 30% della corsa (o tolta);
- **spalla**: l'angolo dell'ascella (406,357) diventa un "becco" sotto il braccio alzato, e in a il deltoide (dietro al braccio) e la toppa pelle 81 si scoprono come una linguetta. In c e d (deltoide sopra) il deltoide fermo resta un fiocco arancione sull'attacco del braccio. In tutte serve: attacco del braccio arrotondato (taglio con un cerchio di circa 34 px attorno al perno della spalla e contorno ridisegnato) e deltoide rifatto come cappuccio sopra il braccio che segue il 40-55% della rotazione con uno schiacciamento verso la spalla, come in ex-49 nella ricerca.

**Costo e rischio** (variante a): taglio al gomito, copertura e piega 1 ora; spalla (attacco tondo e cappuccio del deltoide ricostruito dalla cupola 80 mascherata con 81 e 82) 1-1,5 ore, circa mezz'ora in piu' di c e d; macchina, ordine di disegno e palette 0,5 ore; JSON del rig, generazione, `verifica-rig.js` e ingrandimenti 1-1,5 ore. **Totale 4-5 ore.** Rischio visivo: medio alla spalla (va guardata a meta' e a fine corsa), medio-basso al gomito, basso a polso e macchina.

**Prompt.** La frase "upper arms, forearms and hands as separate shapes with rounded ends overlapping at the joints" ha dato mani, deltoide, tricipite e maniglie separati, non braccio e avambraccio (4 su 4): Quiver disegna l'arto piegato come una sola sagoma; la mano e' separata perche' sta sopra l'impugnatura. Non credo che una frase in piu' basti in modo affidabile, quindi **non conviene rigenerare START** (la variante a e' ottima in tutto il resto e il piano B costa meno di una generazione rifatta e rivalutata). Da provare gratis alla prossima START di un esercizio nuovo, in coda al blocco stile: `Each forearm is its own outlined shape layered over the end of its upper arm, with a rounded elbow end.`

## 7. Classifica (in parole semplici)

1. **a** (scelta)
   - Pro: colori giusti (capelli castano scuro, top nero, leggings grigi, scarpe grigio scuro con suola e lacci bianchi); file pulito, niente da togliere; dettagli completi e braccia identiche a specchio.
   - Contro: braccio e avambraccio sono un pezzo unico (come in tutte), va tagliato al gomito; il muscolo della spalla e' disegnato dietro al braccio, per l'animazione va rifatto sopra (mezz'ora in piu'); i tappi delle due impugnature sono diversi (si corregge copiandone uno).
2. **d**
   - Pro: disegno ricco e simmetrico, anche le impugnature; muscolo della spalla gia' sopra il braccio, col contorno: il piu' comodo da animare; impugnature rigate.
   - Contro: capelli neri e top grigio-blu invece di castano e nero; fondo bianco e 9 tratti bianchi spessi da togliere; braccio e avambraccio uniti.
3. **c**
   - Pro: la piu' simmetrica alla misura automatica; colori giusti; muscolo della spalla sopra il braccio.
   - Contro: impugnature lisce, senza la rigatura chiesta; 2 tratti grigi vaganti e montante da ridisegnare; tappi delle impugnature diversi (punta e disco).
4. **b**
   - Pro: fascia del tricipite piu' chiara, la piu' vicina all'arancio chiaro chiesto; mani molto ben disegnate; muscolo della spalla sopra il braccio.
   - Contro: capelli castano chiaro invece di castano scuro; impugnature con estremita' diverse (una a punta, una piatta), si vede; fondo semitrasparente da togliere.

## 8. Prompt END, riferimento per il rig (calibrato sulla variante a)

Blocchi ricalibrati su quello che Quiver ha disegnato davvero in a (colori di capelli, abiti, scarpe, acciaio, imbottiture e impugnature; forma della macchina). Le coordinate seguono il comportamento visto in START: Quiver riempie il canvas, quindi i numeri descrivono la scena intera (macchina allungata) adattata al canvas, con la figura a 0,853 della scala di START (cima dei montanti y=5, suole y=968). Sono coerenti tra loro: angolo del gomito 164,7, rapporto avambraccio/braccio 1,138 come in START, braccio 61 gradi sopra l'orizzontale, avambraccio 13,7 gradi in fuori. Il blocco muscoli e stile e' identico a START carattere per carattere; tra eventuali END rifatti tutti i blocchi restano identici a questi. 2.373 caratteri, solo ASCII, niente nomi di posa, una sola frase con "no".

```
Detailed vector illustration for a premium fitness app: one athletic woman on a seated shoulder press machine, strict front view, camera at chest height. Square canvas, viewBox 0 0 1000 1000, one figure centred on x=500. Whole machine in view: crossbar at y=25 to 50, top of her head at y=210, shoe soles at y=965.

The woman: late 20s, athletic and toned. Dark brown hair #402D22 in a high ponytail with a small bun. Skin #E8B89D. Black sports bra #2D2D2D, slate grey high-waist leggings #50545A, dark grey trainers #3D454F with white soles and laces. Calm face with small simple features. A visible neck joins head and shoulders.

The machine, steel #828D98 with bolts: two tall square posts at x=288 and x=712 on floor feet, joined low by a bar and at the top by the crossbar. Seat and backrest in dark slate #3E4750; seat top at y=662, on a steel post; backrest as wide as her shoulders, up to her eyebrows. Each post has a sliding carriage: a bolted steel plate with a horizontal handle pointing inward, covered by a black ribbed grip #383F46. Only the carriages move, straight up and down the posts.

She sits upright, her whole back on the backrest. Shoulder joints at x=415 and x=585, y=418, kept low, away from the ears. Knees bent 90 degrees, just above the seat top; shins vertical; feet flat. Overhand grip, palms forward: from the front we see four curled fingers across each grip and the thumb below them; wrists straight. Both arms mirror each other; her face stays fully visible.

Position, top of the press: carriage tops at y=86, a clear gap below the crossbar. Grip centres at x=317 and x=683, y=160, both hands about one hand-height above the top of her head. Arms almost straight with soft elbows, elbow angle 165 degrees, forming a slight V; elbows at x=352 and x=648, y=304, level with her eyes; forearms tilted slightly outward.

Muscles painted on her skin: front and side deltoids as a rounded bright orange #fb8b3c cap over each shoulder joint, on the upper arm; triceps as a light orange #fdba8c band along the underside of each upper arm; fine separation lines. Style: realistic proportions, crisp cel shading with one darker shade per colour, thin dark outlines, five distinct fingers per hand; upper arms, forearms and hands as separate shapes with rounded ends overlapping at the joints. Plain transparent background: no floor, no shadow, no other objects, no text.
```

**File**: una generazione con lo stesso modello di START; salvare le varianti come `esercizi-bozze/ex-48-donna-end-a.svg` e `ex-48-donna-end-b.svg` (se Quiver ne da' 4, anche `-c` e `-d`; ne basta una buona).

**Riga REF: no, per questo END.** La riga del file ex-48 chiede di tenere "framing and scale" di START, che qui e' impossibile: in quell'inquadratura i carrelli alzati non stanno sotto la traversa, e un'immagine allegata spinge Quiver a copiarne la composizione (rischio: corsa accorciata, cioe' proprio l'angolo finale sbagliato). I colori e la macchina sono gia' nel testo ricalibrato, e END non entra nel disegno animato. Per questo il PNG `ex-48-start.png` non e' stato creato; se si vuole provarlo su un altro esercizio, la posa finale deve stare nell'inquadratura di START (per esempio alzate laterali), e il PNG va controllato perche' oggi lo script toglie i lacci (§3).

**Controllo di END** (oltre a §7.1): gomito tra 155 e 170 gradi, V leggera con le mani piu' larghe dei gomiti, carrelli sotto la traversa con uno spazio, lati uguali, spalle basse, viso libero, niente scritte; e soprattutto la forma di spalla, deltoide e ascella con il braccio alzato, che serve da modello per ridisegnare il cappuccio nel build. La scala sara' circa 0,85 di START: si registra END su START con traslazione **e scala** sulle parti ferme (sedile, scarpe, base) e si confrontano gli angoli e il rapporto avambraccio/braccio (START 1,14, tolleranza 10%), non la scala assoluta.

Correzioni di una riga per END (una sola per tentativo):

| Difetto | Riga da aggiungere in coda |
|---|---|
| Carrelli contro la traversa o prese basse | `The posts are tall: the carriage tops stay at y=86, below the crossbar, and the grips are one hand above her head at y=160.` |
| Gomiti troppo piegati | `Arms almost straight, elbow angle 165 degrees, elbows level with her eyes.` |
| Gomiti bloccati o braccia verticali | `Elbows softly bent at 165 degrees, arms forming a slight V.` |
| Scena tagliata o troppo grande | `The whole machine, from the crossbar to the floor feet, and her raised hands fit inside the canvas.` |

Se END fallisce due volte, il rig usa gli angoli calcolati del §5 (la corsa della macchina e' nota).

## 9. Piano di build del rig (variante a)

Misure e gruppi anche in `esercizi-bozze/riferimenti/ex-48-rig-misure.json` (indici = ordine nel documento delle foglie `path, rect, circle, ellipse, polygon, polyline, line, text, image, use`). Lato destro dell'immagine = specchio di x.

1. **Pulizia**: niente fondo, ombre o tratti da togliere. **Tenere i lacci** 50-57 e 62-69 (la regola "decorazioni" di `crea-riferimento.js` li toglierebbe). Spostare le costole delle impugnature 144 e 151 sotto i pugni (oggi tagliano il bordo del pugno) o toglierle. Facoltativo: copiare il tappo sinistro (124, 125) sul lato destro (135, 136) per avere le impugnature uguali.
2. **Palette per materiale** (metodo §4): tricipite 83 / 89 da #EF8944 a #fdba8c (ombra #E9A272); deltoide 80 / 86 a #fb8b3c (ombra #D96A22); pelle a due toni (braccia #E8BDA4 e busto #E8B89D oggi quasi uguali); acciaio #828D98 / #646E78; imbottiture #3E4750 e #262D34; nero; leggings; scarpe.
3. **Macchina**: due montanti nuovi dietro a tutto, rettangoli x 231,2-272,6 e 727,4-770,5, y da -161 a 350 (fill #828D98, stroke #2E3136, 2,857); `translate(0,-165)` su cime dei montanti 9 / 16, tappi 14 / 21, giunte 15 / 22 e traversa 23 (traversa a y -140 / -108). A fine corsa il carrello arriva a y=-66, 42 px sotto la traversa.
4. **Parti mobili**:
   - carrello + mano, solo traslazione verticale (0 -> -237): sinistra 10, 11, 12, 13, 118, 119, 122-125, 144-150 e 126-130; destra 17-20, 120, 121, 133-136, 151-157 e 137-141;
   - braccio (copia tagliata di 82 / 88) con 83, 84, 85, 132 / 89, 90, 91, 143: perno spalla (400, 323) / (600, 323), `ik2` con angolo finale +106,3 / -106,3 gradi (a schermo orario a sinistra);
   - avambraccio (copia tagliata di 82 / 88) con 131 / 142: perno gomito (292, 431) / (708, 431), `aim` verso il polso; inclinazione non monotona (+2, -13 a meta' corsa, +13,7 a fine corsa); rotazione netta -11,6 / +11,6;
   - deltoide: cappuccio nuovo sopra il braccio = cupola 80 / 86 mascherata con 81 + 82 / 87 + 88 (in START identico a oggi); segue il 40-55% della rotazione del braccio con schiacciamento verso la spalla (da tarare); toppa 81 / 87 ferma sotto il braccio (riempie l'ascella a braccio alzato).
5. **Taglio al gomito**: semipiano per il perno del gomito, direzione (0,367, -0,930) a sinistra e (-0,367, -0,930) a destra; pezzo avambraccio = lato che contiene la presa. Cerchio di copertura r=23 (fill #E8BDA4, stroke #624A42 2,857) sotto i due pezzi, centrato sul gomito che si muove. Rifinire l'angolo della piega sul pezzo braccio (vicino a 312, 387-417; a destra 688) e ridisegnare circa 20 px di contorno; piega 131 / 142 spenta entro il 30% della corsa o tolta.
6. **Spalla**: tagliare il pezzo braccio con semipiano + cerchio di circa 34 px attorno al perno, cosi' l'angolo dell'ascella (406, 357) non sporge; ridisegnare l'arco di contorno dove resta scoperto. L'attacco resta dietro al busto (ordine invariato).
7. **Polso**: la mano copre la fine dell'avambraccio; controllare a +-14 gradi, se si apre un vuoto aggiungere un cerchio di copertura al polso.
8. **Inquadratura**: viewBox `170 -175 660 1160` (o un 4:3 che contenga lo stesso inviluppo); riduzione del movimento = START.
9. **Tempo**: come nella ricerca (6/40/46/95 del ciclo, easing `cubic-bezier(.47,0,.53,1)` in salita, `(.42,0,.58,1)` in discesa).
10. **Controlli**: `verifica-rig.js` (al massimo 60 KB, riduzione movimento, giunzione del ciclo, scatti), ingrandimenti di spalla, gomito e polso a meta' e a fine corsa, foglio di contatto; confronto con END per la forma della spalla.

## 10. Proposte per il metodo

1. **Ancore**: Quiver adatta la scena al canvas (cima della macchina circa y=4, suole circa y=969) e ignora le coordinate assolute che lascerebbero spazio vuoto; rispetta invece i rapporti col corpo. Per le START con corsa verso l'alto: descrivere gia' in START la macchina alta quanto serve alla posa finale, in teste e non in y (per esempio `The crossbar is two head-heights above the top of her head.`), dare coordinate compatibili col riempimento (cima della macchina y 10-50, suole y circa 965) e lasciare i margini al build.
2. **Forme separate**: la frase funziona per mani, deltoide, tricipite e maniglie, non per braccio e avambraccio (4 su 4). Il taglio al gomito diventa il passo standard dei movimenti a due segmenti: nel preventivo 4-5 ore invece di 1,5-2. La frase alternativa del §6 si prova senza costi alla prossima START nuova.
3. **Deltoide**: nel build va sempre ricostruito come cappuccio sopra il braccio, con frazione di rotazione e schiacciamento; nel prompt aggiungere "drawn on top of the upper arm" (3 varianti su 4 l'hanno fatto da sole).
4. **Tricipite**: 3 varianti su 4 l'hanno colorato con l'arancio del deltoide; lo ricolora il build, il prompt resta com'e'.
5. **`crea-riferimento.js`**: correggere la regola che toglie i lacci (§3) e citarla nel §7.2 del metodo.
6. **END e riferimento**: se la posa finale non sta nell'inquadratura di START, END si fa solo col testo, con i blocchi ricalibrati su START; la regola "scala entro +-10%" (§7.2) diventa "registrazione con scala sulle parti ferme; rapporto avambraccio/braccio entro 10%".
7. **Blocchi ricalibrati**: dopo la scelta di START, i blocchi personaggio e attrezzo delle pose successive si riscrivono con i colori e le forme disegnati davvero, poi restano identici tra loro.

## 11. Domande aperte per l'utente

1. Vuoi generare END (1 generazione: serve soprattutto a vedere come Quiver disegna spalla e deltoide con le braccia alzate) oppure risparmiare i crediti e lasciare al build gli angoli calcolati del §5?
2. Va bene che nell'animazione la macchina sia piu' alta (montanti allungati, traversa piu' in alto) e la figura circa il 14% piu' piccola della bozza (soluzione A)? In alternativa si toglie la traversa (soluzione B, figura 8% piu' piccola).

## 12. File

- `esercizi-bozze/ex-48-donna-start-{a,b,c,d}.svg`: le quattro bozze START (copie dei file dell'utente).
- `esercizi-bozze/riferimenti/ex-48-anteprima-rig-a.png`: prova statica del rig da START (START, meta' corsa, fine corsa, ingrandimento dei giunti), senza ritocchi.
- `esercizi-bozze/riferimenti/ex-48-rig-misure.json`: perni, lunghezze, percorso a 10 passi, gruppi di elementi, estensione della macchina, viewBox.
- Non creato: `esercizi-bozze/riferimenti/ex-48-start.png` (riga REF sconsigliata per questo END, §8).
