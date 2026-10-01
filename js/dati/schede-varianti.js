/* Schede tecniche delle varianti (presa, attacco) e dei classici aggiunti
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDE TECNICHE DELLE VARIANTI
   Dove il movimento e lo stesso dell esercizio base (stessi passi, stessi
   errori) la variante lo riprende da lui con `da`, cosi la scheda resta una
   sola e le frasi gia tradotte si riusano. Cambiano la partenza, i muscoli
   e il consiglio: e li che la presa o l attacco fanno la differenza.
   Ogni scheda finisce dentro TECNICA (schede-tecniche.js), come le altre.
   ============================================================ */
(function () {
  const V = {
    'Pulley Basso Barra Larga (Presa Prona)': {
      m: 'Primari: trapezio medio e inferiore, romboidi, deltoide posteriore · Secondari: gran dorsale, bicipite',
      s: 'Seduto, piedi sulla pedana, ginocchia leggermente flesse, busto dritto, barra larga con presa prona.',
      e: ['Tira la barra verso la parte bassa del petto, con i gomiti larghi e all’altezza del busto.', 'Stringi le scapole 1 secondo.', 'Torna distendendo le braccia e lasciando le scapole andare avanti, senza piegare la schiena.'],
      da: 'Pulley Basso', c: 'Pensa di aprire il petto: tira con i gomiti, non con le mani.'
    },
    'Pulley Basso Presa Inversa': {
      m: 'Primari: gran dorsale (parte bassa), bicipite · Secondari: romboidi',
      s: 'Seduto, piedi sulla pedana, ginocchia leggermente flesse, busto dritto, barra con presa supina (palmi verso l’alto).',
      e: ['Tira la barra verso l’ombelico, con i gomiti vicini ai fianchi.', 'Stringi le scapole 1 secondo.', 'Torna distendendo le braccia e lasciando le scapole andare avanti, senza piegare la schiena.'],
      da: 'Pulley Basso', c: 'Con la presa supina il bicipite aiuta di più: tieni i gomiti ai fianchi e le spalle basse.'
    },
    'Pulley Basso a un Braccio': {
      m: 'Primari: gran dorsale · Secondari: romboidi, bicipite, obliqui',
      s: 'Seduto, piedi sulla pedana, una maniglia singola in una mano con presa neutra, busto dritto, l’altra mano sul ginocchio.',
      e: ['Tira la maniglia verso il fianco, con una leggera rotazione del busto verso il braccio che tira.', 'Stringi le scapole 1 secondo.', 'Torna distendendo le braccia e lasciando le scapole andare avanti, senza piegare la schiena.'],
      x: ['Ruotare troppo il busto: perdi il controllo del lavoro.', 'Dondolare il busto avanti e indietro.'],
      da: 'Pulley Basso', c: 'Lavora un lato alla volta: così pareggi le differenze tra destra e sinistra.'
    },
    'Lat Machine Triangolo (Presa Neutra)': {
      m: 'Primari: gran dorsale (parte bassa), grande rotondo · Secondari: bicipite, brachioradiale',
      s: 'Cosce bloccate sotto i rulli, triangolo con presa neutra stretta, busto appena inclinato indietro (10–20°), petto alto.',
      e: ['Abbassa prima le scapole, poi tira il triangolo verso la parte alta del petto.', 'I gomiti scendono verso i fianchi, un po’ indietro.', 'Risali lentamente fino a braccia distese, lasciando salire le scapole.'],
      da: 'Lat Machine', c: 'Con la presa neutra i gomiti scendono lungo il busto: spesso è la più comoda per spalle e gomiti.'
    },
    'Rematore Presa Inversa (Yates)': {
      m: 'Primari: gran dorsale (parte bassa), romboidi · Secondari: bicipite, erettori spinali',
      s: 'Stacca il bilanciere con presa supina, piega le anche (hip hinge) fino a busto a circa 45° da terra, ginocchia morbide, schiena neutra.',
      da: 'Rematore con Bilanciere', c: 'Con la presa supina i gomiti restano vicini ai fianchi e il bicipite aiuta: tira verso l’addome basso.'
    },
    'Trazioni Presa Neutra': {
      m: 'Primari: gran dorsale, bicipite · Secondari: brachioradiale, romboidi',
      s: 'Maniglie parallele, presa neutra (palmi che si guardano), braccia tese, core contratto e gambe unite.',
      da: 'Trazioni alla Sbarra (Pull-ups)', c: 'Se la presa prona o supina ti dà fastidio ai gomiti, prova questa.'
    },
    'Croci ai Cavi Alti (Parte Bassa)': {
      m: 'Primari: gran pettorale (fasci bassi) · Secondari: deltoide anteriore',
      s: 'Cavi alti, un passo avanti, busto leggermente inclinato, gomiti appena flessi e bloccati.',
      e: ['Porta le mani una verso l’altra con un arco verso il basso, fino all’altezza dell’ombelico.', 'Stringi il petto 1 secondo quando le mani si incontrano.', 'Torna indietro lentamente finché senti un buon allungamento, senza superare la linea delle spalle.'],
      da: 'Croci ai Cavi', c: 'Pensa di spingere le mani verso il bacino mentre il petto si stringe.'
    },
    'Piegamenti Declinati (Piedi Rialzati)': {
      m: 'Primari: gran pettorale (fasci alti), deltoide anteriore · Secondari: tricipite, core',
      s: 'Piedi su una panca, mani poco più larghe delle spalle, corpo in linea da testa a talloni: glutei e addome contratti.',
      da: 'Piegamenti a Terra (Push-up)', c: 'Più i piedi sono alti, più lavora la parte alta del petto e delle spalle.'
    },
    'Piegamenti a Diamante': {
      m: 'Primari: tricipite · Secondari: gran pettorale, deltoide anteriore',
      s: 'Mani vicine sotto il petto con pollici e indici a forma di diamante, corpo in linea da testa a talloni.',
      da: 'Piegamenti a Terra (Push-up)', c: 'Tieni i gomiti vicini al busto: se i polsi protestano, allarga un po’ le mani.'
    },
    'Adductor Machine': {
      m: 'Primari: adduttori · Secondari: gracile',
      s: 'Seduto, schiena appoggiata, cuscinetti all’interno delle ginocchia, gambe aperte in modo comodo.',
      e: ['Chiudi le gambe spingendo verso l’interno.', 'Tieni 1 secondo a gambe chiuse.', 'Torna lentamente senza far toccare i pesi.'],
      x: ['Usare lo slancio.', 'Partire con le gambe troppo aperte: stress sull’inguine.'],
      c: 'Parti da un’apertura che senti senza fastidio: gli adduttori si allungano molto.'
    },
    'Calf Raise a un Piede (Corpo Libero)': {
      m: 'Primari: gemelli · Secondari: soleo',
      s: 'Un piede sul bordo di un gradino, l’altra gamba sollevata, una mano appoggiata a un muro.',
      da: 'Calf Raise in Piedi'
    },
    'Sissy Squat': {
      m: 'Primari: quadricipiti (retto femorale) · Secondari: flessori d’anca',
      s: 'In piedi, una mano appoggiata a un sostegno, talloni sollevati, corpo in linea dalle ginocchia alle spalle.',
      e: ['Porta le ginocchia in avanti mentre i talloni restano alti e il busto si inclina all’indietro.', 'Scendi finché il quadricipite è molto allungato, senza forzare le ginocchia.', 'Risali spingendo con le ginocchia e riporta il busto in verticale.'],
      x: ['Piegare le anche invece delle ginocchia: perdi il lavoro sul quadricipite.', 'Scendere troppo con le ginocchia sensibili.'],
      c: 'Esercizio duro per le ginocchia: parti con mezza ampiezza e aumenta poco alla volta.'
    },
    'Alzate Laterali alla Macchina': {
      m: 'Primari: deltoide laterale · Secondari: trapezio',
      s: 'Seduto, schiena appoggiata, cuscini sui gomiti, sedile regolato in modo che le spalle siano all’altezza dell’asse della macchina.',
      da: 'Alzate Laterali', c: 'Spingi con i gomiti, non con le mani: il cuscino sul gomito toglie l’aiuto dell’avambraccio.'
    },
    'Pike Push-up': {
      m: 'Primari: deltoide anteriore e laterale · Secondari: tricipite, trapezio',
      s: 'Appoggio su mani e piedi, fianchi alti a V rovesciata, mani poco più larghe delle spalle, testa tra le braccia.',
      e: ['Piega i gomiti portando la testa verso il pavimento, davanti alle mani.', 'Scendi finché la testa sfiora il suolo, con i gomiti a circa 45° dal busto.', 'Spingi il pavimento lontano e torna alla V.'],
      x: ['Gomiti spalancati a T.', 'Inarcare la schiena invece di tenere i fianchi alti.'],
      c: 'Per renderlo più difficile avvicina i piedi alle mani o rialzali su una panca.'
    },
    'Curl ai Cavi con Corda (Presa Martello)': {
      m: 'Primari: brachiale, brachioradiale · Secondari: bicipite brachiale',
      s: 'In piedi davanti al cavo basso, corda con presa neutra (palmi che si guardano), gomiti vicino ai fianchi.',
      da: 'Hammer Curl', c: 'Tieni la corda come un martello.'
    },
    'Curl Inverso con Bilanciere EZ': {
      m: 'Primari: brachioradiale, estensori dell’avambraccio · Secondari: brachiale, bicipite brachiale',
      s: 'In piedi, barra EZ con presa prona (palmi verso il basso), gomiti vicino ai fianchi.',
      da: 'Curl con Bilanciere EZ', c: 'Usa un carico più leggero del curl normale e tieni i polsi dritti.'
    },
    'Curl alla Macchina (Scott)': {
      m: 'Primari: bicipite brachiale (capo corto) · Secondari: brachiale',
      s: 'Seduto, ascelle contro il bordo del cuscino, braccia appoggiate, sedile regolato in modo che i gomiti siano all’altezza dell’asse.',
      da: 'Curl su Panca Scott'
    },
    'Curl Zottman': {
      m: 'Primari: bicipite brachiale, brachioradiale · Secondari: brachiale, avambracci',
      s: 'In piedi, manubri lungo i fianchi, palmi verso le cosce.',
      e: ['Sali con i palmi verso l’alto (supinazione) come in un curl.', 'In alto ruota i polsi con i palmi verso il basso.', 'Scendi lentamente con la presa prona, poi riporta i palmi verso l’alto.'],
      x: ['Slanciare i manubri.', 'Ruotare i polsi a metà salita.'],
      c: 'La discesa con la presa prona lavora brachioradiale e avambracci: usa un carico leggero.'
    },
    'Pushdown Presa Inversa': {
      m: 'Primari: tricipite brachiale (capo lungo e mediale)',
      s: 'Cavo alto con barra dritta, presa supina (palmi verso l’alto), gomiti vicino ai fianchi, busto leggermente inclinato.',
      da: 'Pushdown Tricipiti ai Cavi', c: 'Con la presa supina il carico è minore: gomiti ai fianchi e polsi dritti.'
    },
    'Pushdown con Barra V': {
      m: 'Primari: tricipite brachiale (tutti i capi)',
      s: 'Cavo alto con barra a V, presa prona stretta, gomiti vicino ai fianchi, busto leggermente inclinato.',
      da: 'Pushdown Tricipiti ai Cavi', c: 'La barra a V è più comoda per i polsi della barra dritta.'
    },
    'Dip alla Macchina (Tricipiti)': {
      m: 'Primari: tricipite brachiale · Secondari: gran pettorale, deltoide anteriore',
      s: 'Seduto, schiena appoggiata, maniglie all’altezza del petto, gomiti vicini al busto.',
      e: ['Spingi le maniglie verso il basso distendendo i gomiti.', 'Stringi i tricipiti in fondo.', 'Risali controllato fino a gomiti a 90°.'],
      x: ['Gomiti che si allontanano dal corpo.', 'Spalle che salgono verso le orecchie.'],
      c: 'Regola il sedile in modo che i gomiti partano a 90°, non più in basso.'
    },
    'Crunch alla Macchina': {
      m: 'Primari: retto dell’addome · Secondari: obliqui',
      s: 'Seduto, schiena appoggiata, maniglie o cuscino all’altezza delle spalle, piedi bloccati.',
      e: ['Arrotola la parte alta del busto portando le costole verso il bacino.', 'Il bacino resta fermo: si muove la colonna.', 'Torna lentamente.'],
      da: 'Crunch a Terra'
    },
    'Woodchop ai Cavi (Rotazioni)': {
      m: 'Primari: obliqui · Secondari: retto dell’addome, gran dorsale, glutei',
      s: 'In piedi di lato al cavo alto, maniglia a due mani, piedi larghi come le spalle, busto dritto.',
      e: ['Tira la maniglia in diagonale dall’alto verso il basso, ruotando busto e fianchi.', 'Le braccia restano quasi tese: la rotazione parte dal centro del corpo.', 'Torna lentamente senza lasciarti trascinare dal cavo.'],
      x: ['Fare il movimento solo con le braccia.', 'Usare lo slancio.'],
      c: 'Pensa di ruotare l’ombelico, non le mani.'
    },
    'Leg Raise alla Sedia Romana': {
      m: 'Primari: retto dell’addome (parte bassa), flessori dell’anca · Secondari: obliqui',
      s: 'Avambracci sui supporti, schiena appoggiata allo schienale, spalle basse, gambe unite.',
      da: 'Leg Raise alla Sbarra'
    },
    'Sit-up a Ginocchia Piegate': {
      m: 'Primari: retto dell’addome · Secondari: flessori dell’anca, obliqui',
      s: 'Supino, ginocchia piegate, piedi appoggiati o bloccati, mani sul petto.',
      e: ['Arrotola il busto fino a sederti, portando i gomiti verso le ginocchia.', 'Scendi lentamente, vertebra dopo vertebra.', 'Respira senza trattenere il fiato.'],
      x: ['Tirare la testa con le mani.', 'Usare lo slancio.'],
      c: 'Nel Golden Six di Arnold si faceva con i piedi bloccati: se la schiena protesta, passa al crunch a terra.'
    }
  };
  Object.keys(V).forEach(k => {
    const v = V[k], b = v.da ? TECNICA[v.da] : null;
    TECNICA[k] = { m: v.m || (b && b.m) || '', s: v.s || (b && b.s) || '', e: v.e || (b && b.e) || [], x: v.x || (b && b.x) || [], c: v.c || (b && b.c) || '' };
  });
})();
