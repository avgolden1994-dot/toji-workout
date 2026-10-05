# Metodo illustrazioni esercizi — app train track (toji.html)

Documento di passaggio. Contiene **solo la logica**: la lista degli esercizi va letta ogni volta da `EXERCISE_LIBRARY` in `toji.html` (l'ordine della libreria = numerazione NN).

---

## 1. Flusso di lavoro

1. L'utente scrive **"continua capitano"** → Claude manda il prompt del **prossimo** esercizio (uno alla volta, un unico blocco pronto da copiare in Quiver AI).
2. L'utente genera in Quiver e salva in `senza banner/esercizi/` come `ex-NN-nome-breve-a.svg` (b, c, d per altre varianti), poi scrive **"fatto"**.
3. Claude apre il file, lo renderizza in PNG e lo **controlla visivamente**: anatomia, esecuzione corretta, attrezzo presente in entrambe le pose, movimento visibile.
4. Se va bene → Claude crea il file finale animato `ex-NN-nome-breve.svg` (senza lettera) nella stessa cartella.
   Se una posa è sbagliata → Claude tiene quella buona e manda un prompt **solo per la posa mancante**.
5. Claude aggiorna il file di stato del progetto e manda subito il prompt successivo.
6. A fine sessione le varianti con lettera (`-a`, `-su-a`, `-giu-a`, `-v2-a`) vanno spostate in `senza banner/esercizi-scarti/`. In `esercizi/` restano solo i file finali.

Risposte a Cristhian: brevi, in italiano, spiegate in modo semplice, con una **domanda di verifica** alla fine.

---

## 2. Principi visivi

- **Solo atleta realistico + attrezzo.** Niente testi, frecce, icone o pannelli nell'immagine. Le spiegazioni (esecuzione, errori, respirazione) stanno come testo nell'app.
- **Stile:** illustrazione anatomica realistica da atlante di allenamento. Proporzioni corrette, ombreggiatura vettoriale morbida, pelle grigio-beige neutra, nessun dettaglio del viso.
- **Muscoli:** primari arancione `#fb8b3c`, secondari arancione chiaro `#fdba8c`, gli altri color pelle. Forma anatomica reale e direzione delle fibre.
- **Attrezzi:** metallo grigio `#8a919c`, imbottiture e dischi neri.
- **Atleta alternato:** esercizi **pari = donna**, **dispari = uomo** (si può derogare se l'esercizio lo suggerisce).
  - Uomo: capelli corti scuri, torso nudo, pantaloncini neri, scarpe nere.
  - Donna: coda di cavallo scura, top sportivo nero, leggings neri, scarpe nere.
- **Camera: il movimento deve essere perpendicolare allo sguardo**, altrimenti non si vede.
  - Spinte o tirate in avanti (macchine, cavi, dip, push-up, rematori) → **PROFILO**.
  - Panche con bilanciere o manubri → **3/4 dall'alto dal lato dei piedi**.
  - Movimenti ad arco laterale (croci, alzate laterali, pec deck) → **FRONTALE** o dal fondo della panca.
  - I dischi non devono mai coprire il petto.

---

## 3. Modello di prompt (due pose affiancate, una sola generazione)

Si cambiano solo i blocchi tra `< >`. Il resto resta identico.

```
Realistic anatomical fitness illustration in SVG, premium training-app style
(professional strength-training anatomy atlas).

EXERCISE: <nome inglese dell'esercizio>.

LAYOUT — TWO FRAMES SIDE BY SIDE, SAME ATHLETE, SAME CAMERA
- viewBox="0 0 800 300", transparent background.
- LEFT frame (x 0–400): <START / posa iniziale>. RIGHT frame (x 400–800): <END / posa finale>.
- IDENTICAL in everything (athlete, equipment, camera, scale, position in the frame)
  EXCEPT <le parti che si muovono> — the difference must be obvious.
- Athlete + equipment FILL each frame (about 90% of its height).
- Each frame's content stays INSIDE its own half: nothing crosses x=400.
- <ATTREZZO> PRESENT AND HELD IN BOTH FRAMES.
- NO background panel, NO stripes, NO labels, NO text, NO white rectangles.

CAMERA
- <PROFILO / 3/4 dal lato dei piedi / FRONTALE>, <altezza camera>, <verso dell'atleta>.
- <parti del corpo che devono restare ben visibili>.

POSITIONS
- START (left): <descrizione tecnica precisa: angoli, presa, appoggi>.
- END (right): <descrizione tecnica precisa>.
- Both: <postura comune: scapole, piedi, core>.

ATHLETE
- Realistic athletic <MALE/FEMALE>, correct proportions, defined natural musculature,
  soft vector shading. Neutral grey-beige skin, no face details, <capelli/abbigliamento>.
  Complete body in both frames.
- Target muscles as visible anatomy with fibre direction:
  PRIMARY bright orange #fb8b3c: <muscoli primari>.
  SECONDARY light orange #fdba8c: <muscoli secondari>.
  All other muscles skin-coloured.

EQUIPMENT
<descrizione attrezzo: metallo grigio #8a919c, imbottiture/dischi neri>.

SCENE
Only athlete + equipment in each frame. No arrows, no icons, no divider line.
Soft grey floor shadow ellipse. Clean hand-editable SVG, no bitmaps, no text, no external fonts.
```

**Prompt per una sola posa mancante:** stesso stile, `viewBox="0 0 400 300"`. Si descrive la **composizione dell'immagine già esistente** (inquadratura, posizione di testa, piedi e attrezzo, dove sta il pacco pesi…), così le due pose combaciano. Poi la sola posizione da disegnare.

Salvataggio varianti: `ex-NN-nome-breve-a.svg`; pose singole `-giu-a` / `-su-a`; rifacimenti `-v2-a`.

---

## 4. Lavorazione del file (lato Claude)

Quiver ignora id, gruppi e articolazioni, quindi l'animazione si costruisce dopo:

1. **Pulizia:** togliere i `rect` bianchi o semitrasparenti di sfondo, le strisce, le scritte START/END (spesso sono forme, non testo). Gestire `<g opacity>` (ombre) e `<g transform="matrix(...)">` (coordinate interne).
2. **Separare i due fotogrammi** in base al centro x dell'elemento (< 400 = sinistra, ≥ 400 = destra). Per gli oggetti a cavallo della linea (es. un manubrio aperto) usare anche la y.
3. **Allineare:** traslare il fotogramma destro di circa −150 in modo che l'attrezzo fermo combaci. Il valore si trova confrontando il bordo x minimo dell'attrezzo o sovrapponendo i render. Se le pose vengono da due file diversi, servono anche scala e traslazione.
4. **Inquadrare:** viewBox finale in **4:3**, stretto sul contenuto, senza tagliare piedi, attrezzo o manubri.
5. **Animazione:** dissolvenza CSS tra i due fotogrammi, circa 3,2 s, con `prefers-reduced-motion`:

```
<style>
.fr{animation:3.2s ease-in-out infinite}
#f-giu{animation-name:giu} #f-su{animation-name:su}
@keyframes giu{0%,30%{opacity:1}45%,80%{opacity:0}95%,100%{opacity:1}}
@keyframes su{0%,30%{opacity:0}45%,80%{opacity:1}95%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.fr{animation:none}#f-su{opacity:0}}
</style>
<g id="f-giu" class="fr"> …posa iniziale… </g>
<g id="f-su" class="fr" transform="translate(-dx 0)"> …posa finale… </g>
```

6. **Verifica:** render dei due fotogrammi separati e sovrapposti al 50%, per controllare che l'attrezzo resti fermo e si muova solo il corpo.

---

## 5. Collegamento nell'app

- `toji.html` → tabella `IMMAGINI_ESERCIZI`: nome dell'esercizio senza emoji → `'esercizi/ex-NN-nome.svg'`. Compare nella scheda "Come si fa".
- `sw.js` (cache `toji-workout-v3`) → aggiungere ogni file finale ad `ASSETS`, altrimenti offline non si vede.
- GitHub: caricare la cartella `esercizi` accanto a `toji.html`, insieme a `toji.html` e `sw.js` aggiornati. Aspettare la spunta verde in Actions, poi sul telefono: Opzioni → Informazioni → Cerca aggiornamenti.
- Nell'app vanno **solo** i file senza lettera.

---

## 6. Mappa muscolare (già fatta)

La tavola anatomica fronte/retro (`mappa-muscoli.svg`) è già dentro `toji.html` (`MC_PARTS`, `renderBodyMap()`). Ogni muscolo ha `class="bm-muscle"` e `data-g` (petto, spalle, braccia, core, schiena, glutei, gambe). Niente colori fissi: li decide il CSS dell'app, così si accende solo il gruppo dell'esercizio scelto.

---

## 7. Dove eravamo rimasti

- Esercizi 01–09 completati e in `esercizi/`.
- Il prossimo da fare è il **10** della libreria attuale (donna). Va ricontrollato su `EXERCISE_LIBRARY`, perché la lista è cambiata.
- Da ritoccare a fine lista, se avanzano crediti: 04 (stile meno dettagliato), 08 (testa poco definita nella posa finale), 09 (gambe innaturali).
