/* Metodi dell'epoca d'oro del culturismo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   METODI DELL EPOCA D ORO
   Golden Six e 5x5 di Reg Park, schema a 6 giorni di Arnold, 8x8 di Gironda; Reeves e Yates
   come ispirazione. Come gli altri metodi il coach non li copia: ne tiene la struttura e
   corregge cio che le prove di oggi non reggono (la voce `attenzione` dice cosa).
   Le sedute pronte corrispondenti sono in js/dati/schede-epoca-oro.js, le fonti in
   docs/ricerca-struttura-e-intensita.md. Codici EPO-01..06 in docs/coach-mappa-regole.md.
   ============================================================ */
METODI.push(
  { id: 'goldensix', nome: 'Golden Six', fonte: 'Reg Park e Arnold Schwarzenegger', livelli: ['principiante', 'intermedio'], giorni: [3], intensita: 'media', struttura: 'rigida', varieta: 0, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['massa', 'forza', 'ricomposizione', 'salute'], applicabile: true,
    come: 'Tre volte a settimana, tutto il corpo, sei esercizi: squat 4×10, panca 3×10, trazioni, press 4×10, curl 3×10, addominali. Pause di 2 minuti sullo squat e 90 secondi sul resto; si aumenta il carico quando fai 12-13 ripetizioni.',
    perChi: 'Chi comincia o riparte: pochi esercizi, ogni muscolo 3 volte a settimana.', attenzione: 'Dopo qualche mese il volume è basso. Il press dietro la nuca è sostituito dal press normale. Se cominci, parti con 3 serie sullo squat.',
    split: () => ({ nome: 'Full Body (Golden Six)', giorni: FB(3) }), nEs: () => 6, essenziale: true, ripeti: true,
    ricette: { fullbody: k => ['squat', 'spintaO', 'tirataV', 'spintaV', 'isoBic', 'core'] },
    schema: (e, i) => { const r = [[4, 10, 120], [3, 10, 90], [3, 8, 90], [4, 10, 90], [3, 10, 90], [3, 15, 60]][i] || [3, 10, 90]; e.sets = r[0]; e.reps = r[1]; e.rest = r[2]; } },
  { id: 'park', nome: '5×5 di Reg Park', fonte: 'Reg Park', livelli: ['intermedio'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['forza', 'massa'], applicabile: true,
    come: 'Full body A/B a giorni alterni. Giorno A: squat, trazioni, panca 5×5. Giorno B: squat (front), rematore, press 5×5 e stacco 3×5. Polpacci 2×15. Pause lunghe.',
    perChi: 'Intermedi che vogliono forza e una base di massa con pochi esercizi.', attenzione: 'Il volume per i muscoli piccoli è basso e serve recupero (3 minuti sui pesanti).',
    split: () => ({ nome: 'Full Body A/B (Park)', giorni: FB(3) }), nEs: () => 5, essenziale: true, pesanti: true, ripeti: true,
    ricette: { fullbody: k => k % 2 ? ['squat', 'tirataO', 'spintaV', 'hinge', 'isoPolp'] : ['squat', 'tirataV', 'spintaO', 'isoPolp'] },
    schema: (e) => {
      if (/calf/i.test(e.name)) { e.sets = 2; e.reps = 15; e.rest = 60; } else if (/stacco|good morning/i.test(e.name)) { e.sets = 3; e.reps = 5; e.rest = 180; } else { e.sets = 5; e.reps = 5; e.rest = 180; }
    } },
  { id: 'arnold6', nome: 'Arnold: schema a 6 giorni', fonte: 'Arnold Schwarzenegger, Enciclopedia del culturismo', livelli: ['avanzato'], giorni: [6], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: true,
    come: 'Petto e schiena in superserie, spalle e braccia, gambe: due volte a settimana. Piramide sui fondamentali (carico che sale, ripetizioni che scendono), pause brevi.',
    perChi: 'Avanzati che recuperano bene e hanno tempo ogni giorno.', attenzione: 'Il volume originale è altissimo: il coach lo porta a 4 serie sul fondamentale e 3 sul resto, con pausa di 90 secondi.',
    split: () => ({ nome: 'Arnold: Petto e Schiena / Spalle e Braccia / Gambe x2', giorni: ['petto-schiena', 'spalle-braccia', 'legs', 'petto-schiena', 'spalle-braccia', 'legs'] }), nEs: () => 6, essenziale: true, ripeti: true,
    schema: (e, i, sd) => {
      const comp = (findExercise(e.name) || {}).type === 'compound';
      e.sets = comp && i < 4 ? 4 : 3; e.reps = comp ? 10 : 12; e.rest = 90;
      if (comp && !isTimeBased(e.name)) e.tecnica = 'piramide';
      /* petto e schiena: i primi quattro esercizi a coppie (spinta, tirata), come nell Enciclopedia */
      if (sd.tipo === 'petto-schiena') e.superset = (i === 1 || i === 3);
    } },
  { id: 'gironda', nome: 'Gironda 8×8', fonte: 'Vince Gironda', livelli: ['intermedio', 'avanzato'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0.5, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['massa', 'ricomposizione'], applicabile: true,
    come: 'Push / Pull / Legs: un esercizio per seduta in 8 serie da 8 con 30 secondi di pausa e circa il 70% del carico delle 8 ripetizioni, poi 3 esercizi da 3×12.',
    perChi: 'Chi ha tecnica solida e vuole sedute dense e brevi.', attenzione: 'Sotto i 60 secondi di pausa il volume cala e la crescita ne risente un poco (Singer 2024): per questo si usano carichi leggeri e macchine, mai il bilanciere pesante.',
    split: () => ({ nome: 'Push / Pull / Legs (Gironda)', giorni: ['push', 'pull', 'legs'] }), nEs: () => 4, leggeri: true, essenziale: true, ripeti: true,
    ricette: { push: k => ['spintaO', 'spintaV', 'isoDeltL', 'isoTri'], pull: k => ['tirataV', 'tirataO', 'isoDeltP', 'isoBic'], legs: k => ['squat', 'isoFem', 'unilaterale', 'isoPolp'] },
    schema: (e, i) => {
      if (i === 0 && (findExercise(e.name) || {}).type === 'compound') { e.sets = 8; e.reps = 8; e.rest = 30; e.tecnica = 'ottoperotto'; e.fattoreCarico = 0.7; }
      else { e.sets = 3; e.reps = 12; e.rest = 75; }
    } },
  { id: 'reeves', nome: 'Steve Reeves', fonte: 'Steve Reeves', livelli: ['principiante', 'intermedio'], giorni: [3], intensita: 'media', struttura: 'rigida', varieta: 0, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: false,
    come: 'Tutto il corpo tre volte a settimana, 3 serie da 8-12, pause brevi, dai muscoli piccoli ai grandi.', perChi: 'Chi ama la routine e l’estetica classica.',
    attenzione: 'Ispirazione: oggi si fanno prima i multiarticolari (si solleva di più): il coach lo fa con il Full Body del metodo del coach.' },
  { id: 'yates', nome: 'Dorian Yates', fonte: 'Dorian Yates, Blood & Guts', livelli: ['avanzato'], giorni: [4], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: false,
    come: 'Poche serie al cedimento (2 di lavoro nel 1987-92, una sola più tardi) con riscaldamento progressivo, riposo-pausa, forzate e negative; ogni muscolo una volta ogni 6-7 giorni.', perChi: 'Esperti che si allenano già vicino al cedimento.',
    attenzione: 'Ispirazione: il cedimento su tutto richiede molto recupero. Il coach usa il riposo-pausa e il drop set (stessa crescita in meno tempo) in una sola tecnica per seduta.' }
);
