// Scrive docs/prompt-esercizi/ex-48-shoulder-press-machine.md con i prompt esatti (da prompt-ex48.json) e le quote (da geometria-ex48.json).
const fs = require('fs');
const P = JSON.parse(fs.readFileSync(__dirname + '/prompt-ex48.json', 'utf8'));
const G = JSON.parse(fs.readFileSync(__dirname + '/geometria-ex48.json', 'utf8'));
const out = process.argv[2];
const n = k => P.out[k].length, nr = k => (P.REF + '\n\n' + P.out[k]).length;
const t = G.tab, R = v => Math.round(v);
const riga = (nome, k, rif) => {
  const p = t[k], ex = R(p.E.x), ey = R(p.E.y), inc = p.avambraccioDaVerticale;
  const av = Math.abs(inc) < 0.5 ? 'verticale' : `${Math.abs(inc).toFixed(0)} gradi ${inc < 0 ? "verso l'interno" : "verso l'esterno"}`;
  const ang = k === 'end' ? 165 : R(p.gom);
  return `| ${nome} | ${p.gy} | ${ex}, ${ey} | ${1000 - ex} | ${ang} | ${p.braccio > 0 ? '+' : ''}${R(p.braccio)} | ${av} | ${rif} |`;
};
const md = `# ex-48 Shoulder Press Machine: prompt v2 (Quiver)

Metodo: \`docs/metodo-immagini-v2.md\` (una posa per generazione, canvas quadrato 1000x1000, blocchi identici).
Il vecchio prompt "sprite sheet a 5 pose" del n. 48 e' superato: non va usato.
Revisione del 10/10/2026: scala unica, ginocchia, posizione di partenza, braccia, muscoli e presa ricalcolati (elenco in fondo, "Cosa e' cambiato").

## Dati dell'esercizio

| Voce | Valore |
|---|---|
| Libreria (\`js/dati/libreria-esercizi.js\`) | \`Shoulder Press Machine\`: spalle, compound, 3x12, 25 kg, recupero 75 s |
| Scheda (\`dettagli-esercizi.js\`) | macchina; maniglie neutre o prone, seduto |
| Primari | deltoide anteriore e laterale |
| Secondario | tricipite |
| Tecnica (\`schede-tecniche.js\`) | sedile con le maniglie all'altezza delle spalle, schiena appoggiata; spingi fino quasi a distendere; scendi controllato fino all'altezza delle spalle; polsi dritti; spalle basse |
| Errori da non disegnare | spalle verso le orecchie, schiena staccata |
| Atleta | donna (numero pari) |
| Posizione di partenza disegnata | prese al mento, cioe' con il pugno appena sopra la linea delle spalle (la scheda dice "fino all'altezza delle spalle") |

## Vista: frontale

- La spinta avviene nel piano frontale. Con la camera di fronte le maniglie salgono dritte e braccio e avambraccio ruotano **nel piano dell'immagine** (spalla e gomito): il movimento si legge bene e si anima con rotazioni pulite, senza scorci.
- Si vedono **entrambe** le braccia e i due deltoidi (anteriore e laterale, cioe' i primari), simmetrici.
- Il **viso resta libero**: le mani salgono ai lati della testa. Di profilo (ex-45, ex-46) il braccio copriva il viso e si fondeva con la testa.
- Unico svantaggio: di fronte sedile e schienale si leggono meno. Si compensa con uno schienale alto, visibile sopra la testa, e con due montanti laterali che portano carrelli e maniglie.
- 3/4 scartata: rotazioni fuori dal piano e prospettiva aumentano gli errori tra le pose.

## Scala e anatomia (una sola scala per tutte le quote)

Donna di 170 cm = 820 px in piedi (4,82 px/cm), alta 7,5 teste: testa 109 px. Altezze e segmenti con i rapporti di Winter (Drillis-Contini), H = 820; suola della scarpa 12 px (2,5 cm). Canvas 1000, y verso il basso.

| Punto | Quota | Come si ricava |
|---|---|---|
| Cima della testa | y=300 | ancora |
| Occhi, naso, mento | y circa 355, 377, 409 | testa di 109 px |
| Spalle (giunti) | y=450; x=415 e 585 | 0,182 H sotto la cima della testa; 170 px = 35 cm tra i giunti |
| Spalle (bordo esterno dei deltoidi) | x=390-610 | 220 px = 45 cm, donna atletica |
| Fondo del reggiseno | y circa 558 | 0,13 H sotto le spalle |
| Anche (giunti) | y=685 | 0,288 H sotto le spalle |
| Piano del sedile | y=730 | anche + 0,055 H (ischi e tessuti compressi); coincide con il sotto-coscia vicino al ginocchio (popliteo) |
| Ginocchia (centro) | y=705; x circa 440 e 560 | 950 - 12 - 0,285 H: 25 px sopra il piano del sedile, perche' la coscia appoggia sul sedile |
| Caviglie | y=906 | 950 - 12 - 0,039 H |
| Suole e base | y=950 | ancora |

Controlli incrociati: dal sedile alla cima della testa 430 px = 0,525 H (altezza da seduti); dalla suola al sedile 220 px = 0,268 H (popliteo con la scarpa); dal ginocchio alla caviglia 201 px = 0,246 H (gamba).

Braccio: spalla-gomito **152 px** (0,186 H); gomito-centro della presa **155 px** = avambraccio 120 (0,146 H) + 0,4 della mano 89 (0,108 H), perche' l'impugnatura passa a meta' palmo.

## Macchina (semplice, identica in tutte le pose)

| Parte | Descrizione |
|---|---|
| Sedile | imbottito, ardesia \`#34373D\`, su un montante d'acciaio; piano a y=730 |
| Schienale | imbottito \`#34373D\` con cuciture, largo quanto le spalle (x 390-610); bordo alto a y=270, sopra la testa (cima della testa a y=300) |
| Montanti | due, verticali, in acciaio \`#8a919c\` con bulloni, a x=190 e x=810, su un telaio di base a terra (y=950), uniti da una traversa a y=70 |
| Carrelli | uno per montante, scorrono solo in su e in giu'; ciascuno porta una maniglia orizzontale rivolta verso l'interno, con impugnatura nera rigata \`#201E1E\`; centro della presa a x=310 e x=690 (380 px = 79 cm) |

- Pacco pesi: nascosto dietro lo schienale (non disegnato), quindi nessuna parte della macchina cambia forma.
- Si muovono solo carrelli e maniglie, in traslazione verticale. Per l'animazione e' il caso piu' semplice.

## Geometria delle pose (cinematica inversa a due segmenti)

Lato destro dell'immagine; il sinistro e' lo specchio, x' = 1000 - x. Spalla S = (585, 450), braccio a = 152, gomito-presa b = 155, presa sempre su x=690 (105 px fuori dalla spalla).

- START, avambraccio verticale (gomito sotto la presa): yP = 450 - 155 + radq(152^2 - 105^2) = **405**.
- END, gomito a 165 gradi: d = radq(a^2 + b^2 - 2ab cos 165) = 304,4; yP = 450 - radq(d^2 - 105^2) = **164**.
- Riserve: presa a passi uguali (60 px); gomito sempre sul ramo "in basso e in fuori". La presa non passa mai sopra la spalla, quindi il gomito non cambia ramo (il difetto di ex-49 nella ricerca).

| Posa | Presa y (x=310 e 690) | Gomito destro (x, y) | Gomito sinistro x | Angolo del gomito | Braccio sull'orizzontale | Avambraccio | Punto di riferimento |
|---|---|---|---|---|---|---|---|
${riga('START (bottom)', 'start', 'prese al mento, gomiti al fondo del reggiseno')}
${riga('25% (riserva)', 'q1', 'prese agli occhi, gomiti sotto le spalle')}
${riga('MID (riserva)', 'mid', 'prese appena sopra la testa, gomiti alle spalle')}
${riga('75% (riserva)', 'q3', 'prese una mano sopra la testa, gomiti al naso')}
${riga('END (top)', 'end', 'braccia quasi tese a V leggera, gomiti alla fronte')}

Angoli: gomito = angolo interno (180 = teso); braccio: + sopra l'orizzontale. Con le quote arrotondate l'angolo END risulta 165,6.

**Rig START -> END** (lato destro; il sinistro specchiato):

- braccio: ruota di **109 gradi** attorno al giunto della spalla (a schermo in senso antiorario, \`rotate(-109)\` in SVG; lato sinistro \`rotate(109)\`);
- gomito: da 44 a 165 gradi (+122);
- avambraccio: +13 gradi netti verso l'esterno, ma non in modo monotono (fino a 17 gradi verso l'interno a meta' corsa): braccio con \`ik2\`, avambraccio con \`aim\` verso il polso, come nella ricerca;
- mano, maniglia e carrello: solo traslazione verticale di **-241 px**; il polso assorbe i 13-17 gradi di differenza;
- spazi liberi: gomito al massimo a x=737 (piu' circa 20 di spessore) contro il bordo interno del montante a x=798: 41 px; carrello in alto a y circa 134 contro il bordo basso della traversa a y circa 82: 52 px; mani sempre ad almeno 120 px dal viso; braccia sempre davanti allo schienale, nessun cambio di ordine di disegno.

**Perche' questa partenza** (prima: prese al naso, y=370, x=275/725):

1. Tecnica: la scheda dice "scendi fino all'altezza delle spalle". Con le prese al mento il pugno arriva sulla linea delle spalle; al naso stava 11-16 cm piu' su (mezza ripetizione).
2. Avambracci verticali con i gomiti sotto le prese: facili da disegnare e da controllare, ed e' la posizione insegnata (polsi sopra i gomiti).
3. Prese a 79 cm invece di 93: la vecchia presa (2,4 volte la distanza tra i giunti delle spalle) apriva molto la V in alto.
4. Rig: corsa del carrello piu' ampia (241 px contro 205), avambraccio che ruota poco (13 gradi netti contro 18), gomito sempre sullo stesso ramo.

Prezzo da pagare: in START il gomito e' molto chiuso (44 gradi), e braccio e avambraccio si sovrappongono per circa 50 px vicino al gomito. Per questo il blocco stile chiede forme separate con estremita' arrotondate; nel build serve il cerchio di copertura al gomito (ricerca §2.7).

Schema visivo (non e' un prompt e non va allegato in Quiver): \`esercizi-bozze/riferimenti/ex-48-guida-quote.svg\`, 2 pannelli 1000x1000 con passo 1050 (START a sinistra, END a destra). Verde = spalla, rosso = gomito, blu = centro presa; nel pannello END il percorso di presa e gomito con le pose di riserva.

## Muscoli in vista frontale

- **Primari** (deltoide anteriore e laterale): una cupola arancione \`#fb8b3c\` sul giunto della spalla, disegnata sul braccio. Di fronte si vedono bene il capo anteriore e quello laterale. E' una cupola attorno al perno della rotazione: il rig la ruota con il braccio (109 gradi) senza mandarla sul collo; se serve, frazione di rotazione e schiacciamento come nella ricerca (§2.3).
- **Secondario** (tricipite): di fronte non si vede "da dietro", ma in questa posa si'. Con il braccio aperto e ruotato in fuori (avambraccio verticale) la camera vede il lato interno del braccio: bicipite sul bordo di sopra, tricipite sul bordo di sotto. Quindi: una banda arancio chiaro \`#fdba8c\` lungo il lato di sotto del braccio. Sta dentro il solo segmento "braccio" e, ruotando, resta sul lato di sotto in tutte le pose, come nella realta'.
- Niente trapezio (farebbe pensare alle spalle alzate, l'errore da evitare) e niente pettorale (non e' nei dati dell'app).

## Come procedere (ordine e file)

Allineato a \`docs/ricerca-animazione-fluida.md\`: l'animazione e' un rig che muove **un solo disegno START diviso in parti**. END serve solo come riferimento per angoli e ampiezza.

1. **START, il disegno principale.** Genera 4 varianti e salvale come \`esercizi-bozze/ex-48-donna-start-{a,b,c,d}.svg\`. Controllo §7.1 del metodo piu' la lista "Controllo delle 4 varianti di START" qui sotto. L'agente sceglie la variante.
2. L'agente crea il riferimento e legge \`controlli_v2\` nel JSON (poi guarda il PNG):

   \`\`\`
   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_PATH=/opt/node-tools/node_modules \\
     node esercizi-bozze/riferimenti/crea-riferimento.js <start scelta> --png esercizi-bozze/riferimenti/ex-48-start.png --size 1024
   \`\`\`
3. **END, il riferimento per il rig**: una generazione, basta una variante buona (\`ex-48-donna-end-{a,b}.svg\`). Se Quiver permette di allegare un'immagine, allega \`ex-48-start.png\` e incolla **in testa** la riga REF. Lo stile puo' essere meno curato: END non finisce nel disegno animato. Usa **lo stesso modello** di START (vedi l'avviso sul ritiro di Arrow 1.x nel metodo, §6).
4. **MID, 25%, 75%: di riserva.** Con il rig non servono. Si generano solo se il controllo del rig (\`verifica-rig.js\` o controllo a occhio alla massima ampiezza) mostra un problema che serve vedere disegnato (\`ex-48-donna-mid-…\`, \`ex-48-donna-q1-…\`, \`ex-48-donna-q3-…\`).
5. Se una posa fallisce: rigenera **solo quella**, con la correzione di una riga (sotto) in coda al prompt.

Costo previsto: 2 generazioni (START, END), piu' un eventuale rifacimento mirato. Ripiego: se END fallisce due volte, il rig usa gli angoli della tabella, riportati sulle lunghezze di braccio e avambraccio misurate in START (la corsa della macchina e' nota).

Riga REF (solo con l'immagine allegata, da mettere in testa; ${P.REF.length} caratteri):
\`\`\`
${P.REF}
\`\`\`

## Prompt START: bottom of the press (${n('start')} caratteri)
\`\`\`
${P.out.start}
\`\`\`

## Prompt END, riferimento per il rig: top of the press (${n('end')} caratteri; ${nr('end')} con la riga REF)
\`\`\`
${P.out.end}
\`\`\`

## Prompt MID, di riserva: halfway up (${n('mid')} caratteri)
\`\`\`
${P.out.mid}
\`\`\`

## Prompt 25%, di riserva (${n('q1')} caratteri)
\`\`\`
${P.out.q1}
\`\`\`

## Prompt 75%, di riserva (${n('q3')} caratteri)
\`\`\`
${P.out.q3}
\`\`\`

I cinque prompt hanno identici, carattere per carattere, i paragrafi su inquadratura, donna, macchina, appoggi e presa, muscoli e stile: cambia solo il paragrafo "Position". Nessuno contiene i nomi delle pose, percentuali o simboli di grado.

## Controllo delle 4 varianti di START (oltre alla lista del metodo)

1. Prese all'altezza del mento (y circa 380-430), avambracci verticali, gomiti proprio sotto le prese all'altezza del fondo del reggiseno; i due lati uguali.
2. Ginocchia appena sopra il sedile (y circa 705), stinchi verticali e lunghi (dal ginocchio alla suola circa 245 px, piu' di un terzo della distanza tra cima della testa e suole), piedi piatti.
3. Mani chiuse sulle impugnature: quattro dita ricurve davanti, pollice sotto; nessuna mano aperta, cinque dita in tutto.
4. Braccio, avambraccio e mano come forme separate con estremita' arrotondate; braccia staccate dal busto; cupola arancione sulla spalla, banda arancio chiaro solo sotto il braccio.
5. Macchina completa (due montanti dalla base alla traversa, carrelli con le maniglie attaccate, sedile, schienale); spalle basse, viso libero, nessuna scritta.

END: braccia quasi tese ma non bloccate, a V leggera, gomiti all'altezza della fronte, mani piu' larghe delle spalle; proporzioni e scala come START (lunghezze di braccio e avambraccio entro il 10%).

## Correzioni di una riga (ex-48)

| Difetto | Riga da aggiungere in coda al prompt della sola posa da rifare |
|---|---|
| Montanti o carrelli mancanti | \`Both vertical steel posts are fully visible from the base to the crossbar, each with its sliding carriage and handle.\` |
| Maniglie staccate | \`Each grip is fixed to the carriage on its post; her hands hold the grips.\` |
| Busto inclinato in avanti | \`Her whole back touches the backrest.\` |
| Ginocchia basse o stinchi corti | \`Her knees are at y=705, just above the seat top; long vertical shins go down to her feet at y=950.\` |
| Gambe confuse (vista di fronte) | \`Her knees point at the viewer, shins vertical, feet flat in front of the seat.\` |
| Prese troppo strette o troppo larghe | \`The grip centres are at x=310 and x=690, wider than her shoulders.\` |
| START: mani troppo alte | \`The grips are level with her chin at y=405, just above her shoulders.\` |
| START: avambracci inclinati | \`Forearms exactly vertical, each elbow directly below its grip.\` |
| Mani aperte o dita sbagliate | \`Each hand is a closed fist around its grip: four curled fingers in front, the thumb below.\` |
| Tricipite su tutto il braccio | \`Only a thin light orange band on the underside of each upper arm.\` |
| END con gomiti bloccati o braccia verticali | \`Elbows softly bent at 165 degrees, arms forming a slight V.\` |
| Quota sbagliata | \`The grip centres are exactly at y=<valore della tabella>, level with her <riferimento>.\` |

## Cosa e' cambiato (revisione del 10/10/2026)

| Punto | Prima | Dopo | Perche' |
|---|---|---|---|
| Ginocchia | y=760, 35 px **sotto** il sedile (y=725); ginocchio-suola 190 px = 39 cm | y=705, 25 px sopra il sedile (y=730); ginocchio-suola 245 px = 51 cm | la coscia appoggia sul sedile: il centro del ginocchio sta mezza coscia sopra; stinco a scala (0,285 H) |
| Spalle | giunti x=405/595 (39 cm), bordo esterno circa 49 cm | giunti x=415/585 (35 cm), bordo esterno 390-610 (45 cm) | 49 cm e' una larghezza da uomo medio |
| Braccio, gomito-presa | 155, 160 | 152, 155 | rapporti di Winter con H=820 |
| START | prese (275/725, 370) al naso; gomiti (272/728, 530); braccio -30, gomito 58 | prese (310/690, 405) al mento; gomiti (310/690, 560); braccio -46, gomito 44 | tecnica "fino alle spalle", presa realistica, corsa piu' ampia |
| END | prese y=165; gomiti (326/674, 317); tabella 165, quote 168 | prese y=164; gomiti (345/655, 315); 165 | quote e angolo coerenti |
| Presa (mani) | "palms facing forward, four fingers curled over the front, thumbs underneath" | "Overhand grip, palms forward: from the front we see four curled fingers across each grip and the thumb tip below them" | corretta anche prima, ora descrive cosa vede la camera |
| Muscoli | "triceps light orange" senza posizione (di fronte il tricipite "da dietro" non si vede) | deltoidi come cupola sul giunto, sul braccio; tricipite come banda sul lato di sotto del braccio | colori visibili e dentro un solo segmento |
| Prompt | "feet flat on the floor" contro "no floor"; "short handle" che non arriva a x=690 | "feet flat"; maniglia senza "short" | niente contraddizioni |
`;
fs.writeFileSync(out, md);
console.log('scritto', out, md.length, 'caratteri');
