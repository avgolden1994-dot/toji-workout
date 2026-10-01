/* Schede dell'epoca d'oro del culturismo
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDE DELL EPOCA D ORO
   Le sedute di Reg Park, Steve Reeves, Arnold Schwarzenegger, Mike Mentzer
   e Dorian Yates come le riportano i libri e le rassegne (le fonti secondarie
   differiscono di qualche serie: i numeri sono quelli piu ricorrenti).
   Dove l esercizio originale non e in libreria (press dietro la nuca, clean
   and press, polsi) si usa il piu vicino, e la descrizione lo dice.
   Ogni descrizione porta il giudizio di oggi: cosa regge e cosa no
   (docs/ricerca-struttura-e-intensita.md). I nomi si scrivono senza emoji
   e si risolvono sulla libreria. `superset: true` = in coppia con l esercizio
   sopra; `tecnica` = una delle tecniche di TECNICHE (piramide, riposopausa, drop...).
   ============================================================ */
(function() {
  const EPOCA = "Epoca d'oro";
  const risolvi = (pulito) => { const m = EXERCISE_LIBRARY.find(e => e.name.replace(EMOJI_TESTA, '') === pulito); return m ? m.name : pulito; };
  /* [nome, serie, ripetizioni, kg, pausa, extra] */
  const righe = (lista) => lista.map(r => Object.assign({ name: risolvi(r[0]), sets: r[1], reps: r[2], weight: r[3], rest: r[4] }, r[5] || {}));
  const DUE = { superset: true };
  const PIR = { tecnica: 'piramide' };
  [
    { id: 'golden6', title: 'Golden Six — Reg Park e Arnold', tag: EPOCA,
      desc: 'Tre volte a settimana, tutto il corpo, sei esercizi: la scheda con cui Arnold iniziò. Ottima per partire; dopo qualche mese serve più volume. Il press dietro la nuca è il press normale (meno stress sulla spalla); aumenta il carico quando fai 12-13 ripetizioni.',
      exercises: righe([['Squat con Bilanciere', 4, 10, 40, 120], ['Panca Piana Bilanciere', 3, 10, 35, 90], ['Trazioni Presa Inversa (Chin-up)', 3, 8, 0, 90],
        ['Military Press', 4, 10, 20, 90], ['Curl Bilanciere Bicipiti', 3, 10, 20, 90], ['Sit-up a Ginocchia Piegate', 3, 15, 0, 60]]) },
    { id: 'park-a', title: 'Park A — squat, trazioni, panca 5×5', tag: EPOCA,
      desc: 'Reg Park, giorno A: tre fondamentali 5×5 a carichi alti, poi i polpacci. Si alterna con il giorno B tre volte a settimana. Allena la forza prima della massa: il volume per i muscoli piccoli è basso.',
      exercises: righe([['Squat con Bilanciere', 5, 5, 60, 180], ['Trazioni alla Sbarra (Pull-ups)', 5, 5, 0, 150], ['Panca Piana Bilanciere', 5, 5, 50, 180], ['Calf Raise in Piedi', 2, 15, 30, 60]]) },
    { id: 'park-b', title: 'Park B — front squat, rematore, press, stacco', tag: EPOCA,
      desc: 'Reg Park, giorno B: front squat, rematore e press 5×5, stacco 3×5, polpacci. Pause lunghe (3 minuti sui pesanti): è così che si tengono i carichi alti.',
      exercises: righe([['Front Squat', 5, 5, 40, 180], ['Rematore con Bilanciere', 5, 5, 40, 150], ['Military Press', 5, 5, 30, 150], ['Stacco da Terra (Deadlift)', 3, 5, 70, 180], ['Calf Raise in Piedi', 2, 15, 30, 60]]) },
    { id: 'petto-schiena', title: 'Petto e Schiena — Arnold', tag: EPOCA,
      desc: 'Lo schema a 6 giorni dell’Enciclopedia: petto e schiena in superserie, piramide 15-12-10-6. Ogni muscolo 2 volte a settimana. Volume molto alto per avanzati: parti con una serie in meno per esercizio.',
      exercises: righe([['Panca Piana Bilanciere', 4, 10, 40, 90, PIR], ['Trazioni alla Sbarra (Pull-ups)', 4, 8, 0, 90, Object.assign({}, PIR, DUE)], ['Panca Inclinata Bilanciere', 4, 10, 35, 90, PIR],
        ['Rematore con Bilanciere', 4, 10, 35, 90, Object.assign({}, PIR, DUE)], ['Pullover con Manubrio', 3, 12, 14, 75], ['Stacco da Terra (Deadlift)', 3, 6, 60, 150], ['Crunch a Terra', 4, 25, 0, 45]]) },
    { id: 'spalle-braccia', title: 'Spalle e Braccia — Arnold', tag: EPOCA,
      desc: 'Arnold: spalle e braccia, il giorno con più isolamenti. I polsi (wrist curl) non sono in libreria. Come il giorno petto e schiena, è per chi recupera bene.',
      exercises: righe([['Military Press', 4, 10, 25, 90, PIR], ['Alzate Laterali', 4, 12, 6, 60, PIR], ['Tirate al Mento (Upright Row)', 3, 10, 20, 75], ['Curl Bilanciere Bicipiti', 4, 10, 20, 60, PIR],
        ['Panca Presa Stretta', 4, 10, 30, 90, Object.assign({}, PIR, DUE)], ['Hammer Curl', 3, 12, 8, 60], ['Estensione Tricipiti sopra la Testa con Manubrio', 3, 12, 12, 60, DUE], ['Leg Raise a Terra', 4, 20, 0, 45]]) },
    { id: 'gambe-arnold', title: 'Gambe — Arnold', tag: EPOCA,
      desc: 'Arnold: squat e affondi, poi catena posteriore, polpacci 5 serie. Stacco rumeno e good morning a ripetizioni basse: portali a 8-10 se non sei esperto.',
      exercises: righe([['Squat con Bilanciere', 4, 10, 50, 120, PIR], ['Affondi Manubri', 4, 10, 12, 90], ['Leg Curl Sdraiato', 4, 12, 25, 75], ['Stacco Rumeno', 3, 6, 40, 120], ['Good Morning', 3, 8, 20, 120], ['Calf Raise in Piedi', 5, 15, 30, 45]]) },
    { id: 'mentzer-ps', title: 'Mentzer — Petto e Schiena', tag: EPOCA,
      desc: 'Heavy Duty: una serie al cedimento per esercizio dopo il riscaldamento, 6-10 ripetizioni, ogni muscolo una volta ogni 4-7 giorni. Una serie sola cresce meno di più serie (Krieger 2010): puoi farne due. Il pre-affaticamento non dà più crescita (Gentil e altri).',
      exercises: righe([['Croci su Panca Manubri', 1, 8, 10, 30], ['Panca Inclinata Bilanciere', 1, 8, 35, 120, DUE], ['Pulldown a Braccia Tese', 1, 8, 20, 30], ['Lat Machine Presa Inversa', 1, 8, 40, 120, DUE], ['Stacco da Terra (Deadlift)', 1, 8, 60, 180]]) },
    { id: 'mentzer-g', title: 'Mentzer — Gambe', tag: EPOCA,
      desc: 'Heavy Duty, giorno gambe: 12-20 ripetizioni (Mentzer usava più ripetizioni per le gambe). Leg extension e leg press in coppia, poi polpacci e addominali, tutto al cedimento.',
      exercises: righe([['Leg Extension', 1, 15, 30, 30], ['Leg Press', 1, 15, 80, 120, DUE], ['Calf Raise in Piedi', 1, 15, 30, 90], ['Sit-up a Ginocchia Piegate', 1, 15, 0, 60]]) },
    { id: 'mentzer-sb', title: 'Mentzer — Spalle e Braccia', tag: EPOCA,
      desc: 'Heavy Duty, giorno spalle e braccia: tre coppie, una serie a testa al cedimento. Il coach consiglia di arrivare a 2 serie se non hai un compagno che ti assista.',
      exercises: righe([['Alzate Laterali', 1, 8, 6, 30], ['Alzate Posteriori (Reverse Fly)', 1, 8, 5, 90, DUE], ['Curl Bilanciere Bicipiti', 1, 8, 20, 30], ['Lat Machine Presa Inversa', 1, 8, 40, 90, DUE],
        ['Pushdown Tricipiti ai Cavi', 1, 8, 20, 30], ['Dip alle Parallele', 1, 8, 0, 90, DUE]]) },
    { id: 'yates-pbt', title: 'Yates — Petto, Bicipiti, Tricipiti', tag: EPOCA,
      desc: 'Dorian Yates (1987-92): 2 serie di lavoro al cedimento per esercizio, 6-12 ripetizioni, pause di 45-60 secondi (sui multiarticolari ne lasci 90). Drop set sulle croci. Cedimento su tutto: è per esperti e richiede molto riposo.',
      exercises: righe([['Panca Piana Bilanciere', 2, 8, 40, 90], ['Panca Inclinata Bilanciere', 2, 8, 35, 90], ['Croci su Panca Manubri', 2, 10, 10, 60, { tecnica: 'drop' }], ['Curl di Concentrazione', 2, 10, 8, 60],
        ['Curl Bilanciere Bicipiti', 2, 8, 20, 60], ['Hammer Curl', 2, 10, 8, 60], ['Pushdown Tricipiti ai Cavi', 2, 10, 20, 60], ['French Press', 2, 8, 15, 60], ['Estensione Tricipiti sopra la Testa con Manubrio', 2, 10, 12, 60]]) },
    { id: 'yates-g', title: 'Yates — Gambe', tag: EPOCA,
      desc: 'Yates, giorno gambe: sei esercizi, 2 serie di lavoro ciascuno, la leg extension come pre-affaticamento (le prove non lo supportano, ma scalda il ginocchio). Giorno pesante: 6-10 ripetizioni.',
      exercises: righe([['Leg Extension', 2, 12, 30, 60, { tecnica: 'drop' }], ['Leg Press', 2, 10, 80, 90], ['Hack Squat', 2, 10, 50, 90], ['Leg Curl Sdraiato', 2, 10, 25, 60], ['Stacco Rumeno', 2, 10, 40, 90], ['Calf Raise in Piedi', 3, 12, 30, 60]]) },
    { id: 'yates-sp', title: 'Yates — Schiena e Spalle', tag: EPOCA,
      desc: 'Yates: la schiena prima di tutto (trazioni, rematore presa inversa), poi le spalle. 2 serie al cedimento per esercizio. Se non ti alleni vicino al cedimento da anni, parti da 1-2 ripetizioni in riserva.',
      exercises: righe([['Lat Machine Triangolo (Presa Neutra)', 2, 10, 40, 75], ['Trazioni alla Sbarra (Pull-ups)', 2, 8, 0, 90], ['Rematore Presa Inversa (Yates)', 2, 8, 35, 90], ['Hyperextension (Lombari)', 2, 12, 0, 60],
        ['Lento Avanti Manubri', 2, 8, 14, 90], ['Alzate Laterali', 2, 10, 6, 60], ['Alzate Posteriori (Reverse Fly)', 2, 12, 5, 60], ['Scrollate (Shrug)', 2, 10, 20, 60]]) },
    { id: 'reeves', title: 'Full Body — Steve Reeves', tag: EPOCA,
      desc: 'Reeves: tutto il corpo tre volte a settimana, 3 serie da 8-12, pause brevi. Partiva dai muscoli piccoli ai grandi; oggi si preferisce l’ordine inverso (si solleva di più sui multiarticolari).',
      exercises: righe([['Tirate al Mento (Upright Row)', 3, 10, 20, 60], ['Panca Piana Bilanciere', 3, 10, 35, 90], ['Rematore con Manubrio', 3, 10, 14, 75], ['Alzate Laterali', 3, 12, 6, 60], ['Panca Inclinata Bilanciere', 3, 10, 30, 90],
        ['Pushdown Tricipiti ai Cavi', 3, 12, 20, 60], ['Curl Bilanciere Bicipiti', 3, 10, 20, 60], ['Squat con Bilanciere', 3, 10, 40, 120], ['Pullover con Manubrio', 3, 12, 14, 75], ['Stacco da Terra (Deadlift)', 3, 8, 60, 150]]) }
  ].forEach(t => { t.epoca = true; WORKOUT_TEMPLATES.push(t); });
})();
