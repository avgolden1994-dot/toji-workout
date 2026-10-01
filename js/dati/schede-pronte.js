/* Libreria delle schede pronte
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   LIBRERIA SCHEDE PRONTE
   Costruite su protocolli classici (push/pull/legs, upper/lower,
   full body per principianti, focus glutei/gambe). Volumi e recuperi:
   multiarticolari pesanti = recuperi lunghi (90-120s), complementari
   e isolamento = recuperi corti (45-75s).
   ============================================================ */
const WORKOUT_TEMPLATES = [
  {
    id: 'push', title: 'Push — Petto, Spalle, Tricipiti', tag: 'Forza',
    desc: 'Fondamentali pesanti + complementari. 3 giorni/sett con Pull e Legs.',
    exercises: [
      { name: '💪 Panca Piana Bilanciere', sets: 4, reps: 8, weight: 40, rest: 120 },
      { name: '🛡️ Military Press', sets: 4, reps: 8, weight: 25, rest: 120 },
      { name: '💪 Panca Inclinata Manubri', sets: 3, reps: 10, weight: 14, rest: 75 },
      { name: '🛡️ Alzate Laterali', sets: 3, reps: 12, weight: 6, rest: 60 },
      { name: '💪 Dip alle Parallele', sets: 3, reps: 10, weight: 0, rest: 75 },
      { name: '🦾 French Press', sets: 3, reps: 12, weight: 15, rest: 60 }
    ]
  },
  {
    id: 'pull', title: 'Pull — Schiena e Bicipiti', tag: 'Forza',
    desc: 'Stacco e trazioni come base, poi spessore dorsale e braccia.',
    exercises: [
      { name: '🏹 Stacco da Terra (Deadlift)', sets: 4, reps: 6, weight: 60, rest: 150 },
      { name: '🏹 Trazioni alla Sbarra (Pull-ups)', sets: 4, reps: 8, weight: 0, rest: 120 },
      { name: '🏹 Rematore con Bilanciere', sets: 4, reps: 8, weight: 35, rest: 90 },
      { name: '🏹 Pulley Basso', sets: 3, reps: 12, weight: 35, rest: 75 },
      { name: '🛡️ Face Pull', sets: 3, reps: 15, weight: 12, rest: 60 },
      { name: '🦾 Curl Bilanciere Bicipiti', sets: 3, reps: 10, weight: 20, rest: 60 }
    ]
  },
  {
    id: 'legs', title: 'Legs — Gambe complete', tag: 'Forza',
    desc: 'Squat dominante ginocchio + catena posteriore, chiusura polpacci.',
    exercises: [
      { name: '🦵 Squat con Bilanciere', sets: 4, reps: 8, weight: 50, rest: 150 },
      { name: '🍑 Stacco Rumeno', sets: 3, reps: 10, weight: 40, rest: 90 },
      { name: '🦵 Leg Press', sets: 3, reps: 12, weight: 80, rest: 90 },
      { name: '🦵 Affondi Manubri', sets: 3, reps: 12, weight: 12, rest: 75 },
      { name: '🦵 Leg Curl Sdraiato', sets: 3, reps: 12, weight: 25, rest: 60 },
      { name: '🦵 Calf Raise in Piedi', sets: 4, reps: 15, weight: 30, rest: 45 }
    ]
  },
  {
    id: 'upper', title: 'Upper — Parte alta', tag: 'Upper/Lower',
    desc: 'Spinta e trazione insieme. Si alterna con Lower, 4 giorni/sett.',
    exercises: [
      { name: '💪 Panca Piana Bilanciere', sets: 4, reps: 8, weight: 40, rest: 120 },
      { name: '🏹 Lat Machine', sets: 4, reps: 10, weight: 40, rest: 90 },
      { name: '🛡️ Military Press', sets: 3, reps: 10, weight: 22, rest: 90 },
      { name: '🏹 Rematore con Bilanciere', sets: 3, reps: 10, weight: 35, rest: 90 },
      { name: '🦾 Curl Bilanciere Bicipiti', sets: 3, reps: 12, weight: 18, rest: 60 },
      { name: '🦾 Pushdown Tricipiti ai Cavi', sets: 3, reps: 12, weight: 20, rest: 60 }
    ]
  },
  {
    id: 'lower', title: 'Lower — Parte bassa', tag: 'Upper/Lower',
    desc: 'Quadricipiti e catena posteriore bilanciati, come vuole la regola.',
    exercises: [
      { name: '🦵 Squat con Bilanciere', sets: 4, reps: 8, weight: 50, rest: 150 },
      { name: '🍑 Hip Thrust', sets: 4, reps: 12, weight: 50, rest: 90 },
      { name: '🍑 Stacco Rumeno', sets: 3, reps: 10, weight: 40, rest: 90 },
      { name: '🦵 Leg Extension', sets: 3, reps: 12, weight: 30, rest: 60 },
      { name: '🦵 Leg Curl Sdraiato', sets: 3, reps: 12, weight: 25, rest: 60 },
      { name: '🦵 Calf Raise in Piedi', sets: 4, reps: 15, weight: 30, rest: 45 }
    ]
  },
  {
    id: 'fullbody', title: 'Full Body — Principianti', tag: 'Principianti',
    desc: '3 volte a settimana: ogni muscolo 3 volte. La scelta migliore per iniziare.',
    exercises: [
      { name: '🦵 Squat con Bilanciere', sets: 3, reps: 10, weight: 30, rest: 120 },
      { name: '💪 Panca Piana Bilanciere', sets: 3, reps: 10, weight: 30, rest: 90 },
      { name: '🏹 Lat Machine', sets: 3, reps: 10, weight: 30, rest: 90 },
      { name: '🛡️ Military Press', sets: 3, reps: 10, weight: 18, rest: 90 },
      { name: '🎯 Plank', sets: 3, reps: 30, weight: 0, rest: 45 }
    ]
  },
  {
    id: 'glutei', title: 'Glutei & Gambe', tag: 'Glutei',
    desc: 'Hip thrust e squat come motori, poi monopodalico e isolamento.',
    exercises: [
      { name: '🍑 Hip Thrust', sets: 4, reps: 12, weight: 45, rest: 90 },
      { name: '🦵 Squat con Bilanciere', sets: 4, reps: 12, weight: 30, rest: 90 },
      { name: '🍑 Affondi Bulgari', sets: 3, reps: 12, weight: 12, rest: 75 },
      { name: '🍑 Stacco Rumeno', sets: 3, reps: 12, weight: 30, rest: 75 },
      { name: '🍑 Abductor Machine', sets: 3, reps: 15, weight: 25, rest: 45 },
      { name: '🍑 Ponte Glutei', sets: 3, reps: 20, weight: 0, rest: 45 }
    ]
  },
  {
    id: 'upper-tono', title: 'Upper — Tonificazione', tag: 'Glutei',
    desc: 'Parte alta a ripetizioni medio-alte, da alternare ai giorni gambe.',
    exercises: [
      { name: '🏹 Lat Machine', sets: 3, reps: 12, weight: 30, rest: 75 },
      { name: '💪 Panca Inclinata Manubri', sets: 3, reps: 12, weight: 10, rest: 75 },
      { name: '🛡️ Alzate Laterali', sets: 3, reps: 15, weight: 4, rest: 45 },
      { name: '🏹 Pulley Basso', sets: 3, reps: 12, weight: 30, rest: 60 },
      { name: '🦾 Hammer Curl', sets: 3, reps: 12, weight: 8, rest: 45 },
      { name: '🎯 Plank', sets: 3, reps: 40, weight: 0, rest: 45 }
    ]
  },
  {
    id: 'core', title: 'Core & Addome', tag: 'Extra',
    desc: 'Sessione breve da aggiungere a fine allenamento o nei giorni scarichi.',
    exercises: [
      { name: '🎯 Plank', sets: 3, reps: 45, weight: 0, rest: 45 },
      { name: '🎯 Crunch al Cavo', sets: 3, reps: 15, weight: 20, rest: 45 },
      { name: '🎯 Leg Raise alla Sbarra', sets: 3, reps: 12, weight: 0, rest: 45 },
      { name: '🍑 Ponte Glutei', sets: 3, reps: 20, weight: 0, rest: 30 }
    ]
  }
];
