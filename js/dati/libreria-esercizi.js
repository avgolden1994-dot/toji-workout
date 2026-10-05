/* Libreria esercizi con metadati
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   LIBRERIA ESERCIZI CON METADATI
   Serve al motore Coach e alla schermata Gruppi: ogni esercizio sa
   a che gruppo appartiene, se e' multiarticolare o di isolamento, e
   quali sono i suoi parametri di partenza sensati.
   ============================================================ */
const MUSCLE_GROUPS = {
  petto:   { label: 'Petto',   emoji: '\u{1F4AA}', antagonist: 'schiena', synergists: ['spalle', 'braccia'] },
  schiena: { label: 'Schiena', emoji: '\u{1F3F9}', antagonist: 'petto',   synergists: ['braccia', 'spalle'] },
  gambe:   { label: 'Gambe',   emoji: '\u{1F9B5}', antagonist: null,      synergists: ['glutei'] },
  glutei:  { label: 'Glutei',  emoji: '\u{1F351}', antagonist: null,      synergists: ['gambe'] },
  spalle:  { label: 'Spalle',  emoji: '\u{1F6E1}\uFE0F', antagonist: 'schiena', synergists: ['petto', 'braccia'] },
  braccia: { label: 'Braccia', emoji: '\u{1F9BE}', antagonist: null,      synergists: ['petto', 'schiena'] },
  core:    { label: 'Core',    emoji: '\u{1F3AF}', antagonist: null,      synergists: [] }
};

const EXERCISE_LIBRARY = [
  { name: '💪 Panca Piana Bilanciere', group: 'petto', type: 'compound', sets: 4, reps: 8, weight: 40, rest: 120 },
  { name: '💪 Panca Inclinata Bilanciere', group: 'petto', type: 'compound', sets: 4, reps: 8, weight: 35, rest: 120 },
  { name: '💪 Panca Inclinata Manubri', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 14, rest: 90 },
  { name: '💪 Panca Declinata', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 35, rest: 90 },
  { name: '💪 Chest Press Machine', group: 'petto', type: 'compound', sets: 3, reps: 12, weight: 40, rest: 75 },
  { name: '💪 Dip alle Parallele', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 90 },
  { name: '💪 Piegamenti a Terra (Push-up)', group: 'petto', type: 'compound', sets: 3, reps: 15, weight: 0, rest: 60 },
  { name: '💪 Croci ai Cavi', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 12, rest: 60 },
  { name: '💪 Croci su Panca Manubri', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 60 },
  { name: '💪 Pectoral Machine (Butterfly)', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 30, rest: 60 },

  { name: '🏹 Stacco da Terra (Deadlift)', group: 'schiena', type: 'compound', sets: 4, reps: 6, weight: 60, rest: 150 },
  { name: '🏹 Trazioni alla Sbarra (Pull-ups)', group: 'schiena', type: 'compound', sets: 4, reps: 8, weight: 0, rest: 120 },
  { name: '🏹 Trazioni Presa Inversa (Chin-up)', group: 'schiena', type: 'compound', sets: 3, reps: 8, weight: 0, rest: 105 },
  { name: '🏹 Lat Machine', group: 'schiena', type: 'compound', sets: 4, reps: 10, weight: 40, rest: 90 },
  { name: '🏹 Lat Machine Presa Inversa', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 35, rest: 75 },
  { name: '🏹 Rematore con Bilanciere', group: 'schiena', type: 'compound', sets: 4, reps: 8, weight: 35, rest: 90 },
  { name: '🏹 Rematore con Manubrio', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 16, rest: 75, lato: true },
  { name: '🏹 T-Bar Row', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 30, rest: 90 },
  { name: '🏹 Pulley Basso', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 35, rest: 75 },
  { name: '🏹 Pullover ai Cavi', group: 'schiena', type: 'isolation', sets: 3, reps: 12, weight: 20, rest: 60 },
  { name: '🏹 Hyperextension (Lombari)', group: 'schiena', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 60 },

  { name: '🦵 Squat con Bilanciere', group: 'gambe', type: 'compound', sets: 4, reps: 8, weight: 50, rest: 150 },
  { name: '🦵 Front Squat', group: 'gambe', type: 'compound', sets: 4, reps: 8, weight: 35, rest: 135 },
  { name: '🦵 Goblet Squat', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 16, rest: 75 },
  { name: '🦵 Hack Squat', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 60, rest: 105 },
  { name: '🦵 Leg Press', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 80, rest: 90 },
  { name: '🦵 Affondi Manubri', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 12, rest: 75, lato: true },
  { name: '🦵 Affondi in Camminata', group: 'gambe', type: 'compound', sets: 3, reps: 14, weight: 10, rest: 75, lato: true },
  { name: '🦵 Step-up su Panca', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 10, rest: 60, lato: true },
  { name: '🦵 Leg Extension', group: 'gambe', type: 'isolation', sets: 3, reps: 12, weight: 30, rest: 60 },
  { name: '🦵 Leg Curl Sdraiato', group: 'gambe', type: 'isolation', sets: 3, reps: 12, weight: 25, rest: 60 },
  { name: '🦵 Leg Curl Seduto', group: 'gambe', type: 'isolation', sets: 3, reps: 12, weight: 28, rest: 60 },
  { name: '🦵 Calf Raise in Piedi', group: 'gambe', type: 'isolation', sets: 4, reps: 15, weight: 30, rest: 45 },
  { name: '🦵 Calf Raise Seduto', group: 'gambe', type: 'isolation', sets: 4, reps: 18, weight: 25, rest: 45 },

  { name: '🍑 Hip Thrust', group: 'glutei', type: 'compound', sets: 4, reps: 12, weight: 45, rest: 90 },
  { name: '🍑 Stacco Rumeno', group: 'glutei', type: 'compound', sets: 3, reps: 10, weight: 40, rest: 90 },
  { name: '🍑 Stacco Sumo', group: 'glutei', type: 'compound', sets: 3, reps: 8, weight: 45, rest: 120 },
  { name: '🍑 Affondi Bulgari', group: 'glutei', type: 'compound', sets: 3, reps: 12, weight: 12, rest: 75, lato: true },
  { name: '🍑 Good Morning', group: 'glutei', type: 'compound', sets: 3, reps: 12, weight: 25, rest: 75 },
  { name: '🍑 Ponte Glutei', group: 'glutei', type: 'isolation', sets: 3, reps: 20, weight: 0, rest: 45 },
  { name: '🍑 Abductor Machine', group: 'glutei', type: 'isolation', sets: 3, reps: 15, weight: 25, rest: 45 },
  { name: '🍑 Kickback ai Cavi', group: 'glutei', type: 'isolation', sets: 3, reps: 15, weight: 10, rest: 45, lato: true },
  { name: '🍑 Slanci Laterali a Terra', group: 'glutei', type: 'isolation', sets: 3, reps: 20, weight: 0, rest: 40, lato: true },

  { name: '🛡️ Military Press', group: 'spalle', type: 'compound', sets: 4, reps: 8, weight: 25, rest: 120 },
  { name: '🛡️ Lento Avanti Manubri', group: 'spalle', type: 'compound', sets: 3, reps: 10, weight: 12, rest: 90 },
  { name: '🛡️ Arnold Press', group: 'spalle', type: 'compound', sets: 3, reps: 10, weight: 12, rest: 90 },
  { name: '🛡️ Shoulder Press Machine', group: 'spalle', type: 'compound', sets: 3, reps: 12, weight: 25, rest: 75 },
  { name: '🛡️ Tirate al Mento (Upright Row)', group: 'spalle', type: 'compound', sets: 3, reps: 12, weight: 20, rest: 60 },
  { name: '🛡️ Alzate Laterali', group: 'spalle', type: 'isolation', sets: 3, reps: 12, weight: 6, rest: 60 },
  { name: '🛡️ Alzate Frontali', group: 'spalle', type: 'isolation', sets: 3, reps: 12, weight: 6, rest: 60 },
  { name: '🛡️ Alzate Posteriori (Reverse Fly)', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 5, rest: 45 },
  { name: '🛡️ Face Pull', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 12, rest: 60 },
  { name: '🛡️ Scrollate (Shrug)', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 30, rest: 60 },

  { name: '🦾 Curl Bilanciere Bicipiti', group: 'braccia', type: 'isolation', sets: 3, reps: 10, weight: 20, rest: 60 },
  { name: '🦾 Curl Manubri Alternato', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 60, lato: true },
  { name: '🦾 Hammer Curl', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 45 },
  { name: '🦾 Curl su Panca Scott', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 60 },
  { name: '🦾 Curl ai Cavi', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 45 },
  { name: '🦾 Curl di Concentrazione', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 45, lato: true },
  { name: '🦾 Pushdown Tricipiti ai Cavi', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 20, rest: 60 },
  { name: '🦾 French Press', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 60 },
  { name: '🦾 Panca Presa Stretta', group: 'braccia', type: 'compound', sets: 3, reps: 10, weight: 30, rest: 90 },
  { name: '🦾 Dip su Panca', group: 'braccia', type: 'compound', sets: 3, reps: 12, weight: 0, rest: 60 },
  { name: '🦾 Kickback Tricipiti', group: 'braccia', type: 'isolation', sets: 3, reps: 15, weight: 6, rest: 45, lato: true },

  /* esercizi aggiunti dalla ricerca (Coach 2): allungamento, meno fatica, piu opzioni */
  { name: '💪 Panca Piana Manubri', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 20, rest: 120 },
  { name: '💪 Croci ai Cavi dal Basso', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 60 },
  { name: '💪 Piegamenti Inclinati (Mani Rialzate)', group: 'petto', type: 'compound', sets: 3, reps: 12, weight: 0, rest: 60 },
  { name: '🏹 Rematore alla Macchina', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 40, rest: 90 },
  { name: '🏹 Pulldown a Braccia Tese', group: 'schiena', type: 'isolation', sets: 3, reps: 12, weight: 20, rest: 60 },
  { name: '🏹 Trazioni Assistite (Macchina)', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 90 },
  { name: '🏹 Rematore Inverso (Corpo Libero)', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 75 },
  { name: '🦵 Squat a Corpo Libero', group: 'gambe', type: 'compound', sets: 3, reps: 15, weight: 0, rest: 60 },
  { name: '🦵 Affondi Inversi', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 10, rest: 75, lato: true },
  { name: '🦵 Nordic Curl', group: 'gambe', type: 'isolation', sets: 3, reps: 6, weight: 0, rest: 90 },
  { name: '🦵 Wall Sit', group: 'gambe', type: 'isolation', sets: 3, reps: 40, weight: 0, rest: 60, tempo: true },
  { name: '🍑 Pull-Through ai Cavi', group: 'glutei', type: 'compound', sets: 3, reps: 12, weight: 20, rest: 75 },
  { name: '🍑 Ponte Glutei a una Gamba', group: 'glutei', type: 'isolation', sets: 3, reps: 12, weight: 0, rest: 45, lato: true },
  { name: '🍑 Abduzioni ai Cavi', group: 'glutei', type: 'isolation', sets: 3, reps: 15, weight: 5, rest: 45, lato: true },
  { name: '🛡️ Landmine Press', group: 'spalle', type: 'compound', sets: 3, reps: 10, weight: 15, rest: 90, lato: true },
  { name: '🛡️ Y-Raise su Panca Inclinata', group: 'spalle', type: 'isolation', sets: 3, reps: 12, weight: 3, rest: 60 },
  { name: '🦾 Curl con Bilanciere EZ', group: 'braccia', type: 'isolation', sets: 3, reps: 10, weight: 20, rest: 60 },
  { name: '🦾 Spider Curl', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 60 },
  { name: '🦾 Pushdown con Corda', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 18, rest: 60 },
  { name: '🎯 Pallof Press', group: 'core', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 45, lato: true },
  { name: '🎯 Dead Bug', group: 'core', type: 'isolation', sets: 3, reps: 10, weight: 0, rest: 45 },
  { name: '🎯 Bird Dog', group: 'core', type: 'isolation', sets: 3, reps: 10, weight: 0, rest: 45 },
  { name: '🎯 Farmer Walk', group: 'core', type: 'isolation', sets: 3, reps: 40, weight: 20, rest: 90, tempo: true },
  { name: '🦾 Estensione Tricipiti sopra la Testa ai Cavi', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 60 },
  { name: '🦾 Estensione Tricipiti sopra la Testa con Manubrio', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 12, rest: 60 },
  { name: '🦾 Curl su Panca Inclinata', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 60 },
  { name: '🦾 Curl Bayesiano ai Cavi', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 60, lato: true },
  { name: '🛡️ Alzate Laterali ai Cavi', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 5, rest: 60, lato: true },
  { name: '🛡️ Reverse Pec Deck', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 20, rest: 60 },
  { name: '🏹 Rematore con Petto Appoggiato', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 20, rest: 90 },
  { name: '🏹 Lat Machine a un Braccio', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 20, rest: 75, lato: true },
  { name: '🦵 Pendulum Squat', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 40, rest: 120 },
  { name: '🦵 Squat al Multipower', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 40, rest: 120 },
  { name: '🦵 Calf Raise alla Leg Press', group: 'gambe', type: 'isolation', sets: 4, reps: 15, weight: 60, rest: 60 },
  { name: '🦵 Stacco con Trap Bar', group: 'gambe', type: 'compound', sets: 4, reps: 6, weight: 60, rest: 150 },
  { name: '🍑 Hip Thrust alla Macchina', group: 'glutei', type: 'compound', sets: 3, reps: 12, weight: 40, rest: 90 },
  { name: '🍑 Hyperextension a 45° per Glutei', group: 'glutei', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 60 },
  { name: '🍑 Affondi al Multipower (Piede Rialzato)', group: 'glutei', type: 'compound', sets: 3, reps: 10, weight: 20, rest: 90, lato: true },
  { name: '💪 Croci ai Cavi da Seduto', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 60 },

  { name: '🎯 Plank', group: 'core', type: 'isolation', sets: 3, reps: 45, weight: 0, rest: 45 },
  { name: '🎯 Plank Laterale', group: 'core', type: 'isolation', sets: 3, reps: 30, weight: 0, rest: 45, lato: true },
  { name: '🎯 Crunch a Terra', group: 'core', type: 'isolation', sets: 3, reps: 20, weight: 0, rest: 45 },
  { name: '🎯 Crunch al Cavo', group: 'core', type: 'isolation', sets: 3, reps: 15, weight: 20, rest: 45 },
  { name: '🎯 Leg Raise alla Sbarra', group: 'core', type: 'isolation', sets: 3, reps: 12, weight: 0, rest: 45 },
  { name: '🎯 Leg Raise a Terra', group: 'core', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45 },
  { name: '🎯 Russian Twist', group: 'core', type: 'isolation', sets: 3, reps: 20, weight: 5, rest: 45 },
  { name: '🎯 Mountain Climber', group: 'core', type: 'isolation', sets: 3, reps: 30, weight: 0, rest: 40 },
  { name: '🎯 Hollow Hold', group: 'core', type: 'isolation', sets: 3, reps: 30, weight: 0, rest: 45 },
  { name: '🎯 Ab Wheel', group: 'core', type: 'isolation', sets: 3, reps: 12, weight: 0, rest: 60 },

  /* varianti dove l attacco o la presa cambiano il muscolo (dettagli in js/dati/dettagli-esercizi.js) e
     alcuni classici dell epoca d oro (Golden Six di Arnold, curl Zottman, sissy squat di Gironda) */
  { name: '🏹 Pulley Basso Barra Larga (Presa Prona)', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 30, rest: 75 },
  { name: '🏹 Pulley Basso Presa Inversa', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 30, rest: 75 },
  { name: '🏹 Pulley Basso a un Braccio', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 15, rest: 75, lato: true },
  { name: '🏹 Lat Machine Triangolo (Presa Neutra)', group: 'schiena', type: 'compound', sets: 3, reps: 12, weight: 35, rest: 75 },
  { name: '🏹 Rematore Presa Inversa (Yates)', group: 'schiena', type: 'compound', sets: 3, reps: 8, weight: 30, rest: 90 },
  { name: '🏹 Trazioni Presa Neutra', group: 'schiena', type: 'compound', sets: 3, reps: 8, weight: 0, rest: 105 },
  { name: '💪 Croci ai Cavi Alti (Parte Bassa)', group: 'petto', type: 'isolation', sets: 3, reps: 12, weight: 8, rest: 60 },
  { name: '💪 Piegamenti Declinati (Piedi Rialzati)', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 60 },
  { name: '🦾 Piegamenti a Diamante', group: 'braccia', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 60 },
  { name: '🦵 Adductor Machine', group: 'gambe', type: 'isolation', sets: 3, reps: 15, weight: 25, rest: 45 },
  { name: '🦵 Calf Raise a un Piede (Corpo Libero)', group: 'gambe', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45, lato: true },
  { name: '🦵 Sissy Squat', group: 'gambe', type: 'isolation', sets: 3, reps: 10, weight: 0, rest: 75 },
  { name: '🛡️ Alzate Laterali alla Macchina', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 15, rest: 45 },
  { name: '🛡️ Pike Push-up', group: 'spalle', type: 'compound', sets: 3, reps: 8, weight: 0, rest: 75 },
  { name: '🦾 Curl ai Cavi con Corda (Presa Martello)', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 12, rest: 45 },
  { name: '🦾 Curl Inverso con Bilanciere EZ', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 45 },
  { name: '🦾 Curl alla Macchina (Scott)', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 20, rest: 45 },
  { name: '🦾 Curl Zottman', group: 'braccia', type: 'isolation', sets: 3, reps: 10, weight: 8, rest: 60 },
  { name: '🦾 Pushdown Presa Inversa', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 60 },
  { name: '🦾 Pushdown con Barra V', group: 'braccia', type: 'isolation', sets: 3, reps: 12, weight: 20, rest: 60 },
  { name: '🦾 Dip alla Macchina (Tricipiti)', group: 'braccia', type: 'compound', sets: 3, reps: 10, weight: 30, rest: 75 },
  { name: '🎯 Crunch alla Macchina', group: 'core', type: 'isolation', sets: 3, reps: 15, weight: 20, rest: 45 },
  { name: '🎯 Woodchop ai Cavi (Rotazioni)', group: 'core', type: 'isolation', sets: 3, reps: 12, weight: 10, rest: 45, lato: true },
  { name: '🎯 Leg Raise alla Sedia Romana', group: 'core', type: 'isolation', sets: 3, reps: 12, weight: 0, rest: 45 },
  { name: '🎯 Sit-up a Ginocchia Piegate', group: 'core', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45 },
  /* adduttori: l alternativa a carico libero dell Adductor Machine (e viceversa) */
  { name: '🦵 Squat Sumo', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 16, rest: 75 },
  /* W1-T5 (CAS-13, SEL-03, SEL-04, D-P2, D-P3): esercizi che chiudono i buchi della libreria: hinge e flessione del ginocchio a casa, deltoide laterale e posteriore,
     adduttori, tibiale, core in anti-flessione laterale, varianti con la pausa, e gli attrezzi nuovi (elastici, kettlebell, anelli, scatola). Nessun disegno (D-P2):
     la scheda mostra «Immagine in arrivo» e ha la scheda tecnica completa. Gli attributi stanno in attributi-esercizi.js, i dettagli in dettagli-esercizi.js */
  { name: '💪 Floor Press con Manubri', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 14, rest: 90 },
  { name: '💪 Chest Press Inclinata alla Macchina', group: 'petto', type: 'compound', sets: 3, reps: 10, weight: 30, rest: 90 },
  { name: '💪 Panca con Pausa', group: 'petto', type: 'compound', sets: 3, reps: 6, weight: 35, rest: 120 },
  { name: '🏹 Trazioni Negative', group: 'schiena', type: 'compound', sets: 3, reps: 4, weight: 0, rest: 120 },
  { name: '🏹 Seal Row', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 14, rest: 90 },
  { name: '🏹 Lat Pulldown con Elastico', group: 'schiena', type: 'compound', sets: 3, reps: 15, weight: 0, rest: 60 },
  { name: '🏹 Rematore agli Anelli', group: 'schiena', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 75 },
  { name: '🏹 Stacco in Deficit', group: 'schiena', type: 'compound', sets: 3, reps: 5, weight: 50, rest: 150 },
  { name: '🦵 Leg Curl con Asciugamano', group: 'gambe', type: 'isolation', sets: 3, reps: 10, weight: 0, rest: 60 },
  { name: '🦵 Leg Curl in Piedi', group: 'gambe', type: 'isolation', sets: 3, reps: 12, weight: 15, rest: 60, lato: true },
  { name: '🦵 Belt Squat', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 40, rest: 105 },
  { name: '🦵 Squat con Pausa', group: 'gambe', type: 'compound', sets: 3, reps: 6, weight: 40, rest: 150 },
  { name: '🦵 Cossack Squat', group: 'gambe', type: 'compound', sets: 3, reps: 8, weight: 0, rest: 60, lato: true },
  { name: '🦵 Squat su Scatola', group: 'gambe', type: 'compound', sets: 3, reps: 10, weight: 0, rest: 60 },
  { name: '🦵 Step-up Basso', group: 'gambe', type: 'compound', sets: 3, reps: 12, weight: 0, rest: 60, lato: true },
  { name: '🦵 Sit-to-Stand dalla Panca', group: 'gambe', type: 'compound', sets: 3, reps: 8, weight: 0, rest: 60 },
  { name: '🦵 Calf Raise con Manubrio sul Gradino', group: 'gambe', type: 'isolation', sets: 3, reps: 15, weight: 12, rest: 45 },
  { name: '🦵 Tibialis Raise', group: 'gambe', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45 },
  { name: '🦵 Copenhagen Plank', group: 'gambe', type: 'isolation', sets: 3, reps: 20, weight: 0, rest: 45, lato: true, tempo: true },
  { name: '🍑 Stacco Rumeno con Manubri', group: 'glutei', type: 'compound', sets: 3, reps: 10, weight: 14, rest: 90 },
  { name: '🍑 Stacco Rumeno a una Gamba', group: 'glutei', type: 'compound', sets: 3, reps: 8, weight: 10, rest: 75, lato: true },
  { name: '🍑 Hip Thrust con Manubrio', group: 'glutei', type: 'compound', sets: 3, reps: 12, weight: 20, rest: 75 },
  { name: '🍑 Kettlebell Swing', group: 'glutei', type: 'compound', sets: 3, reps: 15, weight: 16, rest: 60 },
  { name: '🛡️ Alzate Laterali con Elastico', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45 },
  { name: '🛡️ Alzate Laterali Inclinate', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 5, rest: 60, lato: true },
  { name: '🛡️ Extrarotazione al Cavo', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 5, rest: 45, lato: true },
  { name: '🛡️ Face Pull con Elastico', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 0, rest: 45 },
  { name: '🛡️ Scrollate con Manubri', group: 'spalle', type: 'isolation', sets: 3, reps: 15, weight: 16, rest: 60 },
  { name: '🎯 Suitcase Carry', group: 'core', type: 'isolation', sets: 3, reps: 30, weight: 14, rest: 60, lato: true, tempo: true },
  /* D-P11: il pullover coi manubri allena i dorsali (bersaglio in DETTAGLI), quindi gruppo schiena. In fondo all elenco di proposito: buildProgram
     lo pesca per ultimo come riserva della tirata verticale (SCHEMI_MOV), dopo trazioni e lat machine */
  { name: '💪 Pullover con Manubrio', group: 'schiena', type: 'isolation', sets: 3, reps: 12, weight: 14, rest: 60 }
];

/* Il menu a tendina si genera dalla libreria: una sola fonte di verita',
   cosi non puo' mai succedere che un esercizio esista in una scheda ma
   non sia selezionabile a mano. */
function buildExerciseSelect() {
  const sel = document.getElementById('exercise-select');
  if (!sel) return;
  let html = '<option value="">-- Seleziona un esercizio --</option>';
  Object.keys(MUSCLE_GROUPS).forEach(gid => {
    const g = MUSCLE_GROUPS[gid];
    const items = EXERCISE_LIBRARY.filter(e => e.group === gid);
    if (!items.length) return;
    html += '<optgroup label="' + g.label + '">';
    items.forEach(e => {
      html += '<option value="' + escapeHtml(e.name) + '">' + escapeHtml(e.name) + '</option>';
    });
    html += '</optgroup>';
  });
  sel.innerHTML = html;
}

function findExercise(name) {
  return EXERCISE_LIBRARY.find(e => e.name === name) || null;
}
