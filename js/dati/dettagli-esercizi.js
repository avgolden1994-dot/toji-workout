/* Dettagli per esercizio: attrezzo, presa o attacco, sottogruppo e focus muscolare
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   DETTAGLI PER ESERCIZIO
   Una riga per esercizio della libreria: dove si fa (macchina o cavo, pesi
   liberi, corpo libero), con quale attrezzo e quale presa o attacco (il cavo
   con barra, triangolo o corda non lavora allo stesso modo), in quale parte
   del muscolo cade il lavoro e quali muscoli lavorano davvero (focus).
   Le fonti delle note sono ricerche EMG e di ipertrofia; dove le prove sono
   deboli o contrastanti la nota lo dice.
   Riga: [sezione, attrezzo, presa o attacco, sottogruppo, focus, secondari, nota, bersaglio, muscoli secondari]
   sezione: M = macchinari e cavi, L = pesi liberi, C = corpo libero
   bersaglio: il muscolo che l esercizio allena di piu, un id di MUSCOLI (sotto).
     Regola: il sottogruppo, quando nomina un muscolo solo; altrimenti
     (Multiarticolari, Spinte, Aperture e isolamento, Glutei e femorali) il primo
     muscolo del focus. Eccezioni volute: Hammer Curl e Curl con corda (presa
     martello) vanno su brachiale e brachioradiale, come dice il loro focus.
   muscoli secondari: id di MUSCOLI separati da spazio (solo informazione:
     non servono a scegliere le alternative)
   ============================================================ */
const SEZIONI_ESERCIZI = [['M', 'Macchinari e cavi'], ['L', 'Pesi liberi'], ['C', 'Corpo libero']];

/* sottogruppi di ogni gruppo muscolare, nell ordine in cui si mostrano */
const SOTTOGRUPPI = {
  petto: ['Petto · fasci alti', 'Petto · fasci medi', 'Petto · fasci bassi', 'Aperture e isolamento'],
  schiena: ['Dorsali · larghezza', 'Spessore · dorsali e romboidi', 'Lombari e catena posteriore'],
  gambe: ['Multiarticolari', 'Quadricipiti', 'Femorali', 'Adduttori', 'Polpacci'],
  glutei: ['Glutei', 'Glutei e femorali', 'Medio gluteo'],
  spalle: ['Spinte', 'Deltoidi laterali', 'Deltoidi anteriori', 'Deltoidi posteriori e cuffia', 'Trapezio'],
  braccia: ['Bicipiti', 'Tricipiti', 'Avambracci'],
  core: ['Addominali', 'Obliqui e anti-rotazione', 'Stabilità']
};

/* Muscoli bersaglio: un livello sotto i gruppi di MUSCLE_GROUPS e i sottogruppi qui sopra.
   Ogni esercizio ne ha uno (ultima parte della riga in DETTAGLI): le alternative
   di "Macchinario occupato" devono avere lo stesso (per i multiarticolari totali, sotto,
   la stessa famiglia). gruppo = chiave di MUSCLE_GROUPS,
   sub = sottogruppo di SOTTOGRUPPI a cui corrisponde, nome = come si mostra.
   Adduttori (interno coscia) e abduttori (esterno anca, medio gluteo) sono separati:
   l Adductor Machine non scambia con l Abductor Machine. */
const MUSCOLI = {
  petto_alto:          { gruppo: 'petto',   sub: 'Petto · fasci alti', nome: 'Petto alto (gran pettorale, fasci alti)' },
  petto_medio:         { gruppo: 'petto',   sub: 'Petto · fasci medi', nome: 'Petto (gran pettorale)' },
  petto_basso:         { gruppo: 'petto',   sub: 'Petto · fasci bassi', nome: 'Petto basso (gran pettorale, fasci bassi)' },
  dorsali:             { gruppo: 'schiena', sub: 'Dorsali · larghezza', nome: 'Gran dorsale' },
  schiena_spessore:    { gruppo: 'schiena', sub: 'Spessore · dorsali e romboidi', nome: 'Spessore della schiena (romboidi, trapezio medio, dorsali)' },
  erettori:            { gruppo: 'schiena', sub: 'Lombari e catena posteriore', nome: 'Lombari (erettori spinali)' },
  quadricipiti:        { gruppo: 'gambe',   sub: 'Quadricipiti', nome: 'Quadricipiti' },
  femorali:            { gruppo: 'gambe',   sub: 'Femorali', nome: 'Femorali' },
  adduttori:           { gruppo: 'gambe',   sub: 'Adduttori', nome: 'Adduttori (interno coscia)' },
  polpacci:            { gruppo: 'gambe',   sub: 'Polpacci', nome: 'Polpacci (gemelli e soleo)' },
  grande_gluteo:       { gruppo: 'glutei',  sub: 'Glutei', nome: 'Grande gluteo' },
  abduttori:           { gruppo: 'glutei',  sub: 'Medio gluteo', nome: 'Abduttori (medio gluteo, esterno anca)' },
  deltoide_anteriore:  { gruppo: 'spalle',  sub: 'Deltoidi anteriori', nome: 'Deltoide anteriore' },
  deltoide_laterale:   { gruppo: 'spalle',  sub: 'Deltoidi laterali', nome: 'Deltoide laterale' },
  deltoide_posteriore: { gruppo: 'spalle',  sub: 'Deltoidi posteriori e cuffia', nome: 'Deltoide posteriore e cuffia' },
  trapezio:            { gruppo: 'spalle',  sub: 'Trapezio', nome: 'Trapezio superiore' },
  bicipiti:            { gruppo: 'braccia', sub: 'Bicipiti', nome: 'Bicipite brachiale' },
  brachioradiale:      { gruppo: 'braccia', sub: 'Avambracci', nome: 'Brachiale e brachioradiale' },
  tricipiti:           { gruppo: 'braccia', sub: 'Tricipiti', nome: 'Tricipite' },
  addome:              { gruppo: 'core',    sub: 'Addominali', nome: 'Retto dell’addome' },
  addome_basso:        { gruppo: 'core',    sub: 'Addominali', nome: 'Retto dell’addome (parte bassa)' },
  obliqui:             { gruppo: 'core',    sub: 'Obliqui e anti-rotazione', nome: 'Obliqui' },
  stabilita:           { gruppo: 'core',    sub: 'Stabilità', nome: 'Core profondo (stabilità)' },
  tibiale:             { gruppo: 'gambe',   sub: 'Polpacci', nome: 'Tibiale anteriore' },   /* W1-T5: Tibialis Raise (unico esercizio: nessuna alternativa) */
  /* solo come muscoli secondari */
  avambracci:          { gruppo: 'braccia', sub: 'Avambracci', nome: 'Avambracci (presa)' },
  flessori_anca:       { gruppo: 'core',    sub: 'Addominali', nome: 'Flessori dell’anca' }
};

/* Multiarticolari totali: esercizi che allenano INSIEME catena posteriore e tutte le gambe.
   Un muscolo bersaglio solo non li descrive: lo stacco da terra cambiato con un esercizio per i
   lombari perde gambe e glutei. Per loro l alternativa deve coprire tutto l insieme, quindi si
   scambiano solo tra loro (alternativeStessoMuscolo in coach/programma/motore.js).
   Il bersaglio di DETTAGLI resta e vale per gli esercizi di un muscolo solo: l Hyperextension
   (lombari) puo proporre lo stacco da terra e quello con la trap bar, che allenano anche i lombari; non il contrario.
   La trap bar ha il bersaglio dello stacco da terra (erettori), non i quadricipiti (SEL-02): cosi non compare
   come alternativa della leg extension o dello squat.
   muscoli: gli id di MUSCOLI che ogni esercizio della famiglia ha tra bersaglio e secondari (lo controlla npm test).
   Fuori, e perche: stacco rumeno e good morning (niente quadricipiti, ginocchia quasi ferme), hyperextension
   (niente quadricipiti, carico basso), squat e leg press (i femorali quasi non lavorano: Kubo 2019). */
const MULTIARTICOLARI_TOTALI = {
  catena_totale: { nome: 'Catena posteriore e gambe (multiarticolare totale)',
    muscoli: ['erettori', 'grande_gluteo', 'femorali', 'quadricipiti'],
    esercizi: ['Stacco da Terra (Deadlift)', 'Stacco con Trap Bar', 'Stacco Sumo', 'Stacco in Deficit'] }
};

/* perche l attacco o la presa contano: una nota per famiglia di esercizi, con la fonte */
const NOTE_ATTACCO = {
  pulley: 'Sul rematore seduto la presa stretta (triangolo) porta più lavoro ai dorsali; la presa larga a trapezio e deltoidi posteriori; la presa supina aggiunge il bicipite (EMG, Padovan 2026).',
  lat: 'Nel pulldown larghezza e orientamento della presa cambiano poco l’attivazione dei dorsali (EMG 2025, sette varianti): scegli la presa che senti meglio e che non ti dà fastidio a gomiti e spalle.',
  pushdown: 'Barra dritta e corda lavorano soprattutto i capi laterale e mediale del tricipite; con l’avambraccio supinato si attiva di più il capo lungo, ma si fanno meno ripetizioni (Villalba 2024).',
  curlcavo: 'La presa supina (barra) lavora il bicipite al massimo; con la corda e la presa neutra (martello) cresce il lavoro di brachiale e brachioradiale (EMG, 2023).',
  crocialti: 'Pulegge alte e mani che scendono: accento sulle fibre basse del pettorale. Pulegge basse e mani che salgono: fibre alte. Il pettorale lavora tutto in ogni caso: l’angolo sposta solo l’accento.',
  legext: 'Con lo schienale reclinato (anca a circa 40° invece di 90°) cresce di più il retto femorale; i vasti non cambiano (Larsen 2024).',
  pressa: 'Piedi in basso e vicini: più quadricipiti. Piedi in alto e larghi: più glutei e adduttori. Negli EMG le differenze sono piccole: conta di più la profondità raggiunta.',
  dip: 'Busto inclinato in avanti e gomiti larghi: più petto. Busto dritto e gomiti vicini: più tricipiti.',
  trazioni: 'Presa prona: più dorsali. Presa supina: più bicipite. Presa neutra: via di mezzo e spesso la più comoda per i gomiti.',
  calf: 'Gambe tese (in piedi): lavorano i gemelli. Ginocchia piegate (da seduto): lavora il soleo.',
  legcurl: 'Da seduto il femorale lavora allungato (anca flessa) e cresce di più (Maeo 2021).',
  tricipitisopra: 'Con le braccia sopra la testa il capo lungo del tricipite lavora allungato: è la posizione che lo fa crescere di più.',
  curlinclinato: 'Con le braccia dietro il busto il bicipite lavora allungato (capo lungo): posizione con le prove migliori per la crescita.'
};

const DETTAGLI = {
  /* ---------------- PETTO ---------------- */
  'Panca Piana Bilanciere': ['L', 'Bilanciere', 'Presa prona poco più larga delle spalle', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite', '', 'petto_medio', 'deltoide_anteriore tricipiti'],
  'Panca Inclinata Bilanciere': ['L', 'Bilanciere', 'Presa prona, panca a 30°', 'Petto · fasci alti', 'Gran pettorale (fasci alti)', 'Deltoide anteriore, tricipite', '', 'petto_alto', 'deltoide_anteriore tricipiti'],
  'Panca Inclinata Manubri': ['L', 'Manubri', 'Presa neutra o semiprona, panca a 30°', 'Petto · fasci alti', 'Gran pettorale (fasci alti)', 'Deltoide anteriore, tricipite', '', 'petto_alto', 'deltoide_anteriore tricipiti'],
  'Panca Declinata': ['L', 'Bilanciere', 'Presa prona, panca declinata', 'Petto · fasci bassi', 'Gran pettorale (fasci bassi)', 'Tricipite, deltoide anteriore', '', 'petto_basso', 'tricipiti deltoide_anteriore'],
  'Chest Press Machine': ['M', 'Macchina', 'Maniglie orizzontali', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite', '', 'petto_medio', 'deltoide_anteriore tricipiti'],
  'Dip alle Parallele': ['C', 'Parallele', 'Busto inclinato in avanti', 'Petto · fasci bassi', 'Gran pettorale (fasci bassi), tricipite', 'Deltoide anteriore', 'dip', 'petto_basso', 'tricipiti deltoide_anteriore'],
  'Piegamenti a Terra (Push-up)': ['C', 'Corpo libero', 'Mani sotto le spalle', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite, core', '', 'petto_medio', 'deltoide_anteriore tricipiti stabilita'],
  'Croci ai Cavi': ['M', 'Cavo', 'Maniglie singole, pulegge all’altezza delle spalle', 'Aperture e isolamento', 'Gran pettorale', 'Deltoide anteriore', 'crocialti', 'petto_medio', 'deltoide_anteriore'],
  'Croci su Panca Manubri': ['L', 'Manubri', 'Panca piana, presa neutra', 'Aperture e isolamento', 'Gran pettorale (allungato)', 'Deltoide anteriore', '', 'petto_medio', 'deltoide_anteriore'],
  'Pectoral Machine (Butterfly)': ['M', 'Macchina', 'Gomiti o avambracci sui cuscinetti', 'Aperture e isolamento', 'Gran pettorale', 'Deltoide anteriore', '', 'petto_medio', 'deltoide_anteriore'],
  'Pullover con Manubrio': ['L', 'Manubri', 'Un manubrio a due mani, braccia quasi tese', 'Dorsali · larghezza', 'Gran dorsale, gran pettorale', 'Tricipite (capo lungo)', '', 'dorsali', 'petto_medio tricipiti'],
  'Panca Piana Manubri': ['L', 'Manubri', 'Presa neutra o prona', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite', '', 'petto_medio', 'deltoide_anteriore tricipiti'],
  'Croci ai Cavi dal Basso': ['M', 'Cavo', 'Maniglie singole, pulegge basse, mani che salgono', 'Petto · fasci alti', 'Gran pettorale (fasci alti)', 'Deltoide anteriore', 'crocialti', 'petto_alto', 'deltoide_anteriore'],
  'Piegamenti Inclinati (Mani Rialzate)': ['C', 'Corpo libero', 'Mani su una panca o un rialzo', 'Petto · fasci bassi', 'Gran pettorale (fasci bassi)', 'Deltoide anteriore, tricipite', '', 'petto_basso', 'deltoide_anteriore tricipiti'],
  'Croci ai Cavi da Seduto': ['M', 'Cavo', 'Maniglie singole, seduto sulla panca', 'Aperture e isolamento', 'Gran pettorale', 'Deltoide anteriore', 'crocialti', 'petto_medio', 'deltoide_anteriore'],

  /* ---------------- SCHIENA ---------------- */
  'Stacco da Terra (Deadlift)': ['L', 'Bilanciere', 'Presa mista o prona', 'Lombari e catena posteriore', 'Erettori spinali, glutei, femorali', 'Quadricipiti, trapezio, gran dorsale, avambracci', '', 'erettori', 'grande_gluteo femorali quadricipiti trapezio dorsali avambracci'],
  'Trazioni alla Sbarra (Pull-ups)': ['C', 'Sbarra', 'Presa prona poco più larga delle spalle', 'Dorsali · larghezza', 'Gran dorsale', 'Bicipite, romboidi, trapezio inferiore', 'trazioni', 'dorsali', 'bicipiti schiena_spessore'],
  'Trazioni Presa Inversa (Chin-up)': ['C', 'Sbarra', 'Presa supina alla larghezza delle spalle', 'Dorsali · larghezza', 'Gran dorsale, bicipite', 'Romboidi, trapezio inferiore', 'trazioni', 'dorsali', 'bicipiti schiena_spessore'],
  'Lat Machine': ['M', 'Cavo', 'Barra lunga, presa prona larga', 'Dorsali · larghezza', 'Gran dorsale', 'Grande rotondo, bicipite', 'lat', 'dorsali', 'bicipiti'],
  'Lat Machine Presa Inversa': ['M', 'Cavo', 'Barra, presa supina stretta', 'Dorsali · larghezza', 'Gran dorsale, bicipite', 'Grande rotondo', 'lat', 'dorsali', 'bicipiti'],
  'Rematore con Bilanciere': ['L', 'Bilanciere', 'Presa prona, busto inclinato a 45°', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Erettori spinali, bicipite, deltoide posteriore', '', 'schiena_spessore', 'dorsali erettori bicipiti deltoide_posteriore'],
  'Rematore con Manubrio': ['L', 'Manubri', 'Un braccio, appoggio su una panca', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi', 'Bicipite, deltoide posteriore', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore'],
  'T-Bar Row': ['M', 'Macchina', 'Maniglia a V, presa neutra', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Erettori spinali, bicipite', '', 'schiena_spessore', 'dorsali erettori bicipiti'],
  'Pulley Basso': ['M', 'Cavo', 'Triangolo, presa neutra stretta', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore', 'pulley', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore'],
  'Pullover ai Cavi': ['M', 'Cavo', 'Barra dritta o corda, cavo alto', 'Dorsali · larghezza', 'Gran dorsale', 'Grande rotondo, tricipite (capo lungo)', '', 'dorsali', 'tricipiti'],
  'Hyperextension (Lombari)': ['C', 'Panca per lombari', 'Busto dritto, glutei e lombari', 'Lombari e catena posteriore', 'Erettori spinali', 'Glutei, femorali', '', 'erettori', 'grande_gluteo femorali'],
  'Rematore alla Macchina': ['M', 'Macchina', 'Petto appoggiato, maniglie neutre', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore'],
  'Pulldown a Braccia Tese': ['M', 'Cavo', 'Corda o barra dritta, cavo alto', 'Dorsali · larghezza', 'Gran dorsale', 'Grande rotondo, tricipite (capo lungo)', '', 'dorsali', 'tricipiti'],
  'Trazioni Assistite (Macchina)': ['M', 'Macchina', 'Presa prona larga, ginocchia sul cuscino', 'Dorsali · larghezza', 'Gran dorsale', 'Bicipite, romboidi', 'trazioni', 'dorsali', 'bicipiti schiena_spessore'],
  'Rematore Inverso (Corpo Libero)': ['C', 'Sbarra bassa o anelli', 'Presa prona, corpo teso', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore, core', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore stabilita'],
  'Rematore con Petto Appoggiato': ['L', 'Manubri', 'Panca inclinata, petto appoggiato', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore'],
  'Lat Machine a un Braccio': ['M', 'Cavo', 'Maniglia singola', 'Dorsali · larghezza', 'Gran dorsale', 'Grande rotondo, bicipite', 'lat', 'dorsali', 'bicipiti'],

  /* ---------------- GAMBE ---------------- */
  'Squat con Bilanciere': ['L', 'Bilanciere', 'Bilanciere sulle spalle', 'Multiarticolari', 'Quadricipiti, glutei, adduttori', 'Erettori spinali', '', 'quadricipiti', 'grande_gluteo adduttori erettori'],
  'Front Squat': ['L', 'Bilanciere', 'Bilanciere davanti, sulle clavicole', 'Multiarticolari', 'Quadricipiti', 'Glutei, core', '', 'quadricipiti', 'grande_gluteo stabilita'],
  'Goblet Squat': ['L', 'Manubri', 'Un manubrio davanti al petto', 'Multiarticolari', 'Quadricipiti, glutei', 'Core', '', 'quadricipiti', 'grande_gluteo stabilita'],
  'Hack Squat': ['M', 'Macchina', 'Schiena appoggiata, pedana inclinata', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori', 'pressa', 'quadricipiti', 'grande_gluteo adduttori'],
  'Leg Press': ['M', 'Macchina', 'Pedana inclinata a 45°', 'Multiarticolari', 'Quadricipiti, glutei, adduttori', '', 'pressa', 'quadricipiti', 'grande_gluteo adduttori'],
  'Affondi Manubri': ['L', 'Manubri', 'Passo avanti, un manubrio per mano', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori, femorali', '', 'quadricipiti', 'grande_gluteo adduttori femorali'],
  'Affondi in Camminata': ['C', 'Corpo libero o manubri', 'Passi lunghi, manubri facoltativi', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori, femorali', '', 'quadricipiti', 'grande_gluteo adduttori femorali'],
  'Step-up su Panca': ['C', 'Corpo libero o manubri', 'Un piede sulla panca, manubri facoltativi', 'Multiarticolari', 'Quadricipiti, glutei', 'Femorali', '', 'quadricipiti', 'grande_gluteo femorali'],
  'Leg Extension': ['M', 'Macchina', 'Seduto, rullo sulle tibie', 'Quadricipiti', 'Quadricipiti (retto femorale e vasti)', '', 'legext', 'quadricipiti'],
  'Leg Curl Sdraiato': ['M', 'Macchina', 'Prono, rullo sopra i talloni', 'Femorali', 'Bicipite femorale, semitendinoso, semimembranoso', 'Gemelli', 'legcurl', 'femorali', 'polpacci'],
  'Leg Curl Seduto': ['M', 'Macchina', 'Seduto, rullo sopra i talloni', 'Femorali', 'Bicipite femorale, semitendinoso, semimembranoso', 'Gemelli', 'legcurl', 'femorali', 'polpacci'],
  'Calf Raise in Piedi': ['M', 'Macchina', 'In piedi, spalle sui cuscini', 'Polpacci', 'Gemelli', 'Soleo', 'calf', 'polpacci'],
  'Calf Raise Seduto': ['M', 'Macchina', 'Seduto, cuscino sulle ginocchia', 'Polpacci', 'Soleo', 'Gemelli', 'calf', 'polpacci'],
  'Squat a Corpo Libero': ['C', 'Corpo libero', 'Piedi larghi come le spalle', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori, core', '', 'quadricipiti', 'grande_gluteo adduttori stabilita'],
  'Affondi Inversi': ['C', 'Corpo libero o manubri', 'Passo indietro, manubri facoltativi', 'Multiarticolari', 'Quadricipiti, glutei', 'Femorali', '', 'quadricipiti', 'grande_gluteo femorali'],
  'Nordic Curl': ['C', 'Corpo libero', 'Caviglie bloccate, discesa controllata', 'Femorali', 'Bicipite femorale, semitendinoso, semimembranoso', 'Gemelli, glutei', '', 'femorali', 'polpacci grande_gluteo'],
  'Wall Sit': ['C', 'Corpo libero', 'Schiena al muro, ginocchia a 90°', 'Quadricipiti', 'Quadricipiti', 'Glutei', '', 'quadricipiti', 'grande_gluteo'],
  'Pendulum Squat': ['M', 'Macchina', 'Schiena appoggiata, arco a pendolo', 'Multiarticolari', 'Quadricipiti', 'Glutei, adduttori', '', 'quadricipiti', 'grande_gluteo adduttori'],
  'Squat al Multipower': ['M', 'Multipower', 'Guide fisse, piedi leggermente avanti', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori', '', 'quadricipiti', 'grande_gluteo adduttori'],
  'Calf Raise alla Leg Press': ['M', 'Macchina', 'Punte sul bordo basso della pedana', 'Polpacci', 'Gemelli', 'Soleo', 'calf', 'polpacci'],
  'Stacco con Trap Bar': ['L', 'Trap bar', 'Maniglie neutre alte o basse', 'Multiarticolari', 'Erettori spinali, glutei, quadricipiti', 'Femorali, trapezio, avambracci', '', 'erettori', 'grande_gluteo quadricipiti femorali trapezio avambracci'],

  /* ---------------- GLUTEI ---------------- */
  'Hip Thrust': ['L', 'Bilanciere', 'Schiena sulla panca, bilanciere sul bacino', 'Glutei', 'Grande gluteo', 'Femorali, adduttori', '', 'grande_gluteo', 'femorali adduttori'],
  'Stacco Rumeno': ['L', 'Bilanciere', 'Gambe quasi tese, bilanciere vicino alle gambe', 'Glutei e femorali', 'Grande gluteo, femorali', 'Erettori spinali', '', 'grande_gluteo', 'femorali erettori'],
  'Stacco Sumo': ['L', 'Bilanciere', 'Piedi larghi, presa stretta', 'Glutei e femorali', 'Grande gluteo, adduttori', 'Quadricipiti, femorali, erettori spinali', '', 'grande_gluteo', 'adduttori quadricipiti femorali erettori'],
  'Affondi Bulgari': ['C', 'Corpo libero o manubri', 'Piede posteriore su una panca, manubri facoltativi', 'Glutei', 'Grande gluteo, quadricipiti', 'Adduttori, femorali', '', 'grande_gluteo', 'quadricipiti adduttori femorali'],
  'Good Morning': ['L', 'Bilanciere', 'Bilanciere sulle spalle, piegamento d’anca', 'Glutei e femorali', 'Femorali, grande gluteo', 'Erettori spinali', '', 'femorali', 'grande_gluteo erettori'],
  'Ponte Glutei': ['C', 'Corpo libero', 'Schiena a terra, piedi vicini ai glutei', 'Glutei', 'Grande gluteo', 'Femorali', '', 'grande_gluteo', 'femorali'],
  'Abductor Machine': ['M', 'Macchina', 'Seduto, cuscini all’esterno delle ginocchia', 'Medio gluteo', 'Medio gluteo, piccolo gluteo', 'Grande gluteo (fasci alti)', '', 'abduttori', 'grande_gluteo'],
  'Kickback ai Cavi': ['M', 'Cavo', 'Cavigliera, puleggia bassa', 'Glutei', 'Grande gluteo', 'Femorali', '', 'grande_gluteo', 'femorali'],
  'Slanci Laterali a Terra': ['C', 'Corpo libero', 'Sdraiato su un fianco', 'Medio gluteo', 'Medio gluteo', 'Piccolo gluteo', '', 'abduttori'],
  'Pull-Through ai Cavi': ['M', 'Cavo', 'Corda tra le gambe, piegamento d’anca', 'Glutei e femorali', 'Grande gluteo, femorali', 'Erettori spinali', '', 'grande_gluteo', 'femorali erettori'],
  'Ponte Glutei a una Gamba': ['C', 'Corpo libero', 'Una gamba tesa, schiena a terra', 'Glutei', 'Grande gluteo', 'Femorali, core', '', 'grande_gluteo', 'femorali stabilita'],
  'Abduzioni ai Cavi': ['M', 'Cavo', 'Cavigliera, puleggia bassa', 'Medio gluteo', 'Medio gluteo, piccolo gluteo', 'Tensore della fascia lata', '', 'abduttori'],
  'Hip Thrust alla Macchina': ['M', 'Macchina', 'Schiena sul cuscino, cintura sul bacino', 'Glutei', 'Grande gluteo', 'Femorali, adduttori', '', 'grande_gluteo', 'femorali adduttori'],
  'Hyperextension a 45° per Glutei': ['C', 'Panca a 45°', 'Busto leggermente arrotondato, spinta con i glutei', 'Glutei', 'Grande gluteo', 'Femorali, erettori spinali', '', 'grande_gluteo', 'femorali erettori'],
  'Affondi al Multipower (Piede Rialzato)': ['M', 'Multipower', 'Piede anteriore rialzato', 'Glutei', 'Grande gluteo, quadricipiti', 'Adduttori', '', 'grande_gluteo', 'quadricipiti adduttori'],

  /* ---------------- SPALLE ---------------- */
  'Military Press': ['L', 'Bilanciere', 'In piedi, presa prona poco più larga delle spalle', 'Spinte', 'Deltoide anteriore e laterale', 'Tricipite, trapezio', '', 'deltoide_anteriore', 'deltoide_laterale tricipiti trapezio'],
  'Lento Avanti Manubri': ['L', 'Manubri', 'Seduto, presa neutra o prona', 'Spinte', 'Deltoide anteriore e laterale', 'Tricipite, trapezio', '', 'deltoide_anteriore', 'deltoide_laterale tricipiti trapezio'],
  'Arnold Press': ['L', 'Manubri', 'Rotazione dei polsi durante la spinta', 'Spinte', 'Deltoide anteriore e laterale', 'Tricipite', '', 'deltoide_anteriore', 'deltoide_laterale tricipiti'],
  'Shoulder Press Machine': ['M', 'Macchina', 'Maniglie neutre o prone, seduto', 'Spinte', 'Deltoide anteriore e laterale', 'Tricipite', '', 'deltoide_anteriore', 'deltoide_laterale tricipiti'],
  'Tirate al Mento (Upright Row)': ['L', 'Bilanciere', 'Presa larga come le spalle, gomiti sopra i polsi', 'Deltoidi laterali', 'Deltoide laterale, trapezio superiore', 'Bicipite', '', 'deltoide_laterale', 'trapezio bicipiti'],
  'Alzate Laterali': ['L', 'Manubri', 'In piedi, braccia quasi tese', 'Deltoidi laterali', 'Deltoide laterale', 'Trapezio superiore', '', 'deltoide_laterale', 'trapezio'],
  'Alzate Frontali': ['L', 'Manubri', 'In piedi, palmi verso il basso', 'Deltoidi anteriori', 'Deltoide anteriore', 'Gran pettorale (fasci alti)', '', 'deltoide_anteriore', 'petto_alto'],
  'Alzate Posteriori (Reverse Fly)': ['L', 'Manubri', 'Busto inclinato in avanti', 'Deltoidi posteriori e cuffia', 'Deltoide posteriore', 'Romboidi, trapezio medio', '', 'deltoide_posteriore', 'schiena_spessore'],
  'Face Pull': ['M', 'Cavo', 'Corda, cavo all’altezza del viso', 'Deltoidi posteriori e cuffia', 'Deltoide posteriore, extrarotatori della cuffia', 'Romboidi, trapezio medio', '', 'deltoide_posteriore', 'schiena_spessore'],
  'Scrollate (Shrug)': ['L', 'Bilanciere', 'Presa prona, braccia tese', 'Trapezio', 'Trapezio superiore', 'Avambracci', '', 'trapezio', 'avambracci'],
  'Landmine Press': ['L', 'Bilanciere', 'Un braccio, bilanciere fissato a un angolo', 'Spinte', 'Deltoide anteriore, gran pettorale (fasci alti)', 'Tricipite, dentato anteriore', '', 'deltoide_anteriore', 'petto_alto tricipiti'],
  'Y-Raise su Panca Inclinata': ['L', 'Manubri', 'Petto appoggiato, braccia a Y', 'Deltoidi posteriori e cuffia', 'Trapezio inferiore, deltoide posteriore', 'Romboidi', '', 'deltoide_posteriore', 'schiena_spessore'],
  'Alzate Laterali ai Cavi': ['M', 'Cavo', 'Maniglia singola, puleggia bassa', 'Deltoidi laterali', 'Deltoide laterale', 'Trapezio superiore', '', 'deltoide_laterale', 'trapezio'],
  'Reverse Pec Deck': ['M', 'Macchina', 'Petto appoggiato, maniglie neutre', 'Deltoidi posteriori e cuffia', 'Deltoide posteriore', 'Romboidi, trapezio medio', '', 'deltoide_posteriore', 'schiena_spessore'],

  /* ---------------- BRACCIA ---------------- */
  'Curl Bilanciere Bicipiti': ['L', 'Bilanciere', 'Barra dritta, presa supina', 'Bicipiti', 'Bicipite brachiale', 'Brachiale, brachioradiale', '', 'bicipiti', 'brachioradiale'],
  'Curl Manubri Alternato': ['L', 'Manubri', 'In piedi, supinazione durante la salita', 'Bicipiti', 'Bicipite brachiale', 'Brachiale, brachioradiale', '', 'bicipiti', 'brachioradiale'],
  'Hammer Curl': ['L', 'Manubri', 'Presa neutra (martello)', 'Bicipiti', 'Brachiale, brachioradiale', 'Bicipite brachiale', 'curlcavo', 'brachioradiale', 'bicipiti'],
  'Curl su Panca Scott': ['L', 'Bilanciere', 'Barra EZ, braccia sul cuscino', 'Bicipiti', 'Bicipite brachiale (capo corto)', 'Brachiale', '', 'bicipiti', 'brachioradiale'],
  'Curl ai Cavi': ['M', 'Cavo', 'Barra dritta o EZ, presa supina, cavo basso', 'Bicipiti', 'Bicipite brachiale', 'Brachiale', 'curlcavo', 'bicipiti', 'brachioradiale'],
  'Curl di Concentrazione': ['L', 'Manubri', 'Seduto, gomito sulla coscia', 'Bicipiti', 'Bicipite brachiale (picco)', 'Brachiale', '', 'bicipiti', 'brachioradiale'],
  'Pushdown Tricipiti ai Cavi': ['M', 'Cavo', 'Barra dritta, presa prona, cavo alto', 'Tricipiti', 'Tricipite (capi laterale e mediale)', '', 'pushdown', 'tricipiti'],
  'French Press': ['L', 'Bilanciere', 'Barra EZ, sdraiato, verso la fronte', 'Tricipiti', 'Tricipite (tutti i capi)', 'Avambracci', '', 'tricipiti'],
  'Panca Presa Stretta': ['L', 'Bilanciere', 'Presa poco più stretta delle spalle', 'Tricipiti', 'Tricipite, gran pettorale', 'Deltoide anteriore', '', 'tricipiti', 'petto_medio deltoide_anteriore'],
  'Dip su Panca': ['C', 'Panca', 'Mani su una panca, gambe tese', 'Tricipiti', 'Tricipite', 'Deltoide anteriore, gran pettorale', '', 'tricipiti', 'deltoide_anteriore petto_medio'],
  'Kickback Tricipiti': ['L', 'Manubri', 'Busto inclinato, gomito fermo', 'Tricipiti', 'Tricipite (capo laterale)', '', '', 'tricipiti'],
  'Curl con Bilanciere EZ': ['L', 'Bilanciere', 'Barra EZ, presa supina semiaperta', 'Bicipiti', 'Bicipite brachiale', 'Brachiale, brachioradiale', '', 'bicipiti', 'brachioradiale'],
  'Spider Curl': ['L', 'Manubri', 'Petto su panca inclinata, braccia verticali', 'Bicipiti', 'Bicipite brachiale (capo corto)', 'Brachiale', '', 'bicipiti', 'brachioradiale'],
  'Pushdown con Corda': ['M', 'Cavo', 'Corda, presa neutra, mani che si aprono in fondo', 'Tricipiti', 'Tricipite (capi laterale e lungo)', '', 'pushdown', 'tricipiti'],
  'Estensione Tricipiti sopra la Testa ai Cavi': ['M', 'Cavo', 'Corda, braccia sopra la testa', 'Tricipiti', 'Tricipite (capo lungo)', '', 'tricipitisopra', 'tricipiti'],
  'Estensione Tricipiti sopra la Testa con Manubrio': ['L', 'Manubri', 'Un manubrio a due mani sopra la testa', 'Tricipiti', 'Tricipite (capo lungo)', '', 'tricipitisopra', 'tricipiti'],
  'Curl su Panca Inclinata': ['L', 'Manubri', 'Panca a 45–60°, braccia dietro il busto', 'Bicipiti', 'Bicipite brachiale (capo lungo)', 'Brachiale', 'curlinclinato', 'bicipiti', 'brachioradiale'],
  'Curl Bayesiano ai Cavi': ['M', 'Cavo', 'Maniglia singola, cavo basso, braccio dietro il corpo', 'Bicipiti', 'Bicipite brachiale (capo lungo)', 'Brachiale', 'curlinclinato', 'bicipiti', 'brachioradiale'],

  /* ---------------- CORE ---------------- */
  'Pallof Press': ['M', 'Cavo', 'Maniglia, in piedi di lato al cavo', 'Obliqui e anti-rotazione', 'Obliqui, trasverso dell’addome', 'Retto dell’addome', '', 'obliqui', 'stabilita addome'],
  'Dead Bug': ['C', 'Corpo libero', 'Schiena a terra, braccia e gambe alternate', 'Stabilità', 'Trasverso dell’addome, retto dell’addome', 'Flessori d’anca', '', 'stabilita', 'addome flessori_anca'],
  'Bird Dog': ['C', 'Corpo libero', 'In quadrupedia, braccio e gamba opposti', 'Stabilità', 'Erettori spinali, glutei', 'Trasverso dell’addome', '', 'stabilita', 'erettori grande_gluteo'],
  'Farmer Walk': ['L', 'Manubri', 'Camminata con un carico per mano', 'Stabilità', 'Core, trapezio superiore', 'Avambracci, glutei', '', 'stabilita', 'trapezio avambracci'],
  'Plank': ['C', 'Corpo libero', 'Appoggio sugli avambracci', 'Stabilità', 'Retto dell’addome, trasverso dell’addome', 'Glutei, deltoide anteriore', '', 'stabilita', 'addome'],
  'Plank Laterale': ['C', 'Corpo libero', 'Appoggio su un avambraccio', 'Obliqui e anti-rotazione', 'Obliqui, quadrato dei lombi', 'Medio gluteo', '', 'obliqui', 'abduttori'],
  'Crunch a Terra': ['C', 'Corpo libero', 'Schiena a terra, ginocchia piegate', 'Addominali', 'Retto dell’addome', 'Obliqui', '', 'addome', 'obliqui'],
  'Crunch al Cavo': ['M', 'Cavo', 'Corda, in ginocchio davanti al cavo alto', 'Addominali', 'Retto dell’addome', 'Obliqui', '', 'addome', 'obliqui'],
  'Leg Raise alla Sbarra': ['C', 'Sbarra', 'Appeso, gambe tese o piegate', 'Addominali', 'Retto dell’addome (parte bassa)', 'Flessori d’anca, avambracci', '', 'addome_basso', 'flessori_anca avambracci'],
  'Leg Raise a Terra': ['C', 'Corpo libero', 'Schiena a terra, gambe tese', 'Addominali', 'Retto dell’addome (parte bassa)', 'Flessori d’anca', '', 'addome_basso', 'flessori_anca'],
  'Russian Twist': ['C', 'Corpo libero', 'Seduto inclinato, rotazione del busto', 'Obliqui e anti-rotazione', 'Obliqui', 'Retto dell’addome', '', 'obliqui', 'addome'],
  'Mountain Climber': ['C', 'Corpo libero', 'Appoggio sulle mani, ginocchia al petto', 'Stabilità', 'Retto dell’addome, flessori d’anca', 'Deltoide anteriore', '', 'stabilita', 'addome flessori_anca'],
  'Hollow Hold': ['C', 'Corpo libero', 'Schiena a terra, braccia e gambe sollevate', 'Addominali', 'Retto dell’addome', 'Flessori d’anca', '', 'addome', 'flessori_anca'],
  'Ab Wheel': ['C', 'Ruota addominale', 'In ginocchio, estensione controllata', 'Addominali', 'Retto dell’addome', 'Gran dorsale, deltoide anteriore', '', 'addome', 'dorsali deltoide_anteriore'],

  /* ---------------- VARIANTI (attacco o presa che cambiano il muscolo) ---------------- */
  'Pulley Basso Barra Larga (Presa Prona)': ['M', 'Cavo', 'Barra larga, presa prona', 'Spessore · dorsali e romboidi', 'Trapezio medio e inferiore, romboidi, deltoide posteriore', 'Gran dorsale, bicipite', 'pulley', 'schiena_spessore', 'deltoide_posteriore dorsali bicipiti'],
  'Pulley Basso Presa Inversa': ['M', 'Cavo', 'Barra, presa supina', 'Spessore · dorsali e romboidi', 'Gran dorsale (parte bassa), bicipite', 'Romboidi', 'pulley', 'schiena_spessore', 'dorsali bicipiti'],
  'Pulley Basso a un Braccio': ['M', 'Cavo', 'Maniglia singola, presa neutra', 'Spessore · dorsali e romboidi', 'Gran dorsale', 'Romboidi, bicipite, obliqui', 'pulley', 'schiena_spessore', 'dorsali bicipiti obliqui'],
  'Lat Machine Triangolo (Presa Neutra)': ['M', 'Cavo', 'Triangolo, presa neutra stretta', 'Dorsali · larghezza', 'Gran dorsale (parte bassa), grande rotondo', 'Bicipite, brachioradiale', 'lat', 'dorsali', 'bicipiti brachioradiale'],
  'Rematore Presa Inversa (Yates)': ['L', 'Bilanciere', 'Presa supina, busto inclinato a circa 45°', 'Spessore · dorsali e romboidi', 'Gran dorsale (parte bassa), romboidi', 'Bicipite, erettori spinali', '', 'schiena_spessore', 'dorsali bicipiti erettori'],
  'Trazioni Presa Neutra': ['C', 'Sbarra', 'Maniglie parallele, presa neutra', 'Dorsali · larghezza', 'Gran dorsale, bicipite', 'Brachioradiale, romboidi', 'trazioni', 'dorsali', 'bicipiti brachioradiale'],
  'Croci ai Cavi Alti (Parte Bassa)': ['M', 'Cavo', 'Maniglie singole, pulegge alte, mani che scendono', 'Petto · fasci bassi', 'Gran pettorale (fasci bassi)', 'Deltoide anteriore', 'crocialti', 'petto_basso', 'deltoide_anteriore'],
  'Piegamenti Declinati (Piedi Rialzati)': ['C', 'Corpo libero', 'Piedi su una panca', 'Petto · fasci alti', 'Gran pettorale (fasci alti), deltoide anteriore', 'Tricipite, core', '', 'petto_alto', 'deltoide_anteriore tricipiti stabilita'],
  'Piegamenti a Diamante': ['C', 'Corpo libero', 'Mani vicine a forma di diamante', 'Tricipiti', 'Tricipite', 'Gran pettorale, deltoide anteriore', '', 'tricipiti', 'petto_medio deltoide_anteriore'],
  'Adductor Machine': ['M', 'Macchina', 'Seduto, cuscini all’interno delle ginocchia', 'Adduttori', 'Adduttori', 'Gracile', '', 'adduttori'],
  'Squat Sumo': ['L', 'Manubri', 'Piedi molto larghi, punte in fuori, un manubrio tra le gambe', 'Adduttori', 'Adduttori', 'Grande gluteo, quadricipiti', '', 'adduttori', 'grande_gluteo quadricipiti'],
  'Calf Raise a un Piede (Corpo Libero)': ['C', 'Gradino', 'Un piede sul gradino, tallone nel vuoto', 'Polpacci', 'Gemelli', 'Soleo', 'calf', 'polpacci'],
  'Sissy Squat': ['C', 'Corpo libero', 'Ginocchia in avanti, talloni alti, appoggio con una mano', 'Quadricipiti', 'Quadricipiti (retto femorale)', 'Flessori d’anca', '', 'quadricipiti', 'flessori_anca'],
  'Alzate Laterali alla Macchina': ['M', 'Macchina', 'Seduto, cuscini sui gomiti', 'Deltoidi laterali', 'Deltoide laterale', 'Trapezio superiore', '', 'deltoide_laterale', 'trapezio'],
  'Pike Push-up': ['C', 'Corpo libero', 'Fianchi alti a V rovesciata', 'Spinte', 'Deltoide anteriore e laterale', 'Tricipite, trapezio', '', 'deltoide_anteriore', 'deltoide_laterale tricipiti trapezio'],
  'Curl ai Cavi con Corda (Presa Martello)': ['M', 'Cavo', 'Corda, presa neutra, cavo basso', 'Bicipiti', 'Brachiale, brachioradiale', 'Bicipite brachiale', 'curlcavo', 'brachioradiale', 'bicipiti'],
  'Curl Inverso con Bilanciere EZ': ['L', 'Bilanciere', 'Barra EZ, presa prona', 'Avambracci', 'Brachioradiale, estensori dell’avambraccio', 'Brachiale, bicipite brachiale', 'curlcavo', 'brachioradiale', 'avambracci bicipiti'],
  'Curl alla Macchina (Scott)': ['M', 'Macchina', 'Braccia sul cuscino, maniglie supine', 'Bicipiti', 'Bicipite brachiale (capo corto)', 'Brachiale', '', 'bicipiti', 'brachioradiale'],
  'Curl Zottman': ['L', 'Manubri', 'Su in supinazione, giù in pronazione', 'Bicipiti', 'Bicipite brachiale, brachioradiale', 'Brachiale, avambracci', '', 'bicipiti', 'brachioradiale avambracci'],
  'Pushdown Presa Inversa': ['M', 'Cavo', 'Barra dritta, presa supina, cavo alto', 'Tricipiti', 'Tricipite (capo lungo e mediale)', '', 'pushdown', 'tricipiti'],
  'Pushdown con Barra V': ['M', 'Cavo', 'Barra a V, presa prona stretta', 'Tricipiti', 'Tricipite (tutti i capi)', '', 'pushdown', 'tricipiti'],
  'Dip alla Macchina (Tricipiti)': ['M', 'Macchina', 'Seduto, maniglie verticali, gomiti vicini', 'Tricipiti', 'Tricipite', 'Gran pettorale, deltoide anteriore', '', 'tricipiti', 'petto_medio deltoide_anteriore'],
  'Crunch alla Macchina': ['M', 'Macchina', 'Seduto, maniglie ai lati della testa', 'Addominali', 'Retto dell’addome', 'Obliqui', '', 'addome', 'obliqui'],
  'Woodchop ai Cavi (Rotazioni)': ['M', 'Cavo', 'Maniglia, dal cavo alto al basso in diagonale', 'Obliqui e anti-rotazione', 'Obliqui, retto dell’addome', 'Gran dorsale, glutei', '', 'obliqui', 'addome'],
  'Leg Raise alla Sedia Romana': ['C', 'Sedia romana', 'Avambracci sui supporti, schiena appoggiata', 'Addominali', 'Retto dell’addome (parte bassa)', 'Flessori d’anca', '', 'addome_basso', 'flessori_anca'],
  'Sit-up a Ginocchia Piegate': ['C', 'Corpo libero', 'Schiena a terra, ginocchia piegate, piedi bloccati', 'Addominali', 'Retto dell’addome', 'Flessori d’anca, obliqui', '', 'addome', 'flessori_anca obliqui'],

  /* ---------------- W1-T5: ESERCIZI CHE CHIUDONO I BUCHI (D-P2: senza disegno; D-P3: elastici, kettlebell, anelli) ---------------- */
  /* GLUTEI E HINGE */
  'Stacco Rumeno con Manubri': ['L', 'Manubri', 'Gambe quasi tese, un manubrio per mano vicino alle gambe', 'Glutei e femorali', 'Grande gluteo, femorali', 'Erettori spinali', '', 'grande_gluteo', 'femorali erettori'],
  'Stacco Rumeno a una Gamba': ['L', 'Manubri', 'In piedi su una gamba, un manubrio nella mano opposta, busto che si abbassa', 'Glutei e femorali', 'Grande gluteo, femorali', 'Erettori spinali, core', '', 'grande_gluteo', 'femorali erettori stabilita'],
  'Hip Thrust con Manubrio': ['L', 'Manubri', 'Schiena sulla panca, un manubrio sul bacino', 'Glutei', 'Grande gluteo', 'Femorali, adduttori', '', 'grande_gluteo', 'femorali adduttori'],
  'Kettlebell Swing': ['L', 'Kettlebell', 'Piedi larghi come le spalle, il kettlebell passa tra le gambe e sale con la spinta d’anca', 'Glutei e femorali', 'Grande gluteo, femorali', 'Erettori spinali, core', '', 'grande_gluteo', 'femorali erettori stabilita'],
  /* GAMBE */
  'Leg Curl con Asciugamano': ['C', 'Corpo libero', 'Talloni su un asciugamano che scivola, schiena a terra in posizione di ponte', 'Femorali', 'Bicipite femorale, semitendinoso, semimembranoso', 'Gemelli, glutei', '', 'femorali', 'polpacci grande_gluteo'],
  'Leg Curl in Piedi': ['M', 'Macchina', 'In piedi, cuscino sopra il tallone, una gamba alla volta', 'Femorali', 'Bicipite femorale, semitendinoso, semimembranoso', 'Gemelli', '', 'femorali', 'polpacci'],
  'Belt Squat': ['M', 'Macchina', 'Cintura con il carico sul bacino, nessun peso sulla schiena', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori', '', 'quadricipiti', 'grande_gluteo adduttori'],
  'Squat con Pausa': ['L', 'Bilanciere', 'Bilanciere sulle spalle, pausa di 1–2 secondi in fondo', 'Multiarticolari', 'Quadricipiti, glutei, adduttori', 'Erettori spinali', '', 'quadricipiti', 'grande_gluteo adduttori erettori'],
  'Cossack Squat': ['C', 'Corpo libero', 'Piedi molto larghi, scendi su una gamba mentre l’altra resta tesa', 'Adduttori', 'Adduttori, grande gluteo', 'Quadricipiti, core', '', 'adduttori', 'grande_gluteo quadricipiti stabilita'],
  'Squat su Scatola': ['C', 'Corpo libero', 'Piedi larghi come le spalle, ti siedi a ogni ripetizione su una scatola o una sedia robusta', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori, core', '', 'quadricipiti', 'grande_gluteo adduttori stabilita'],
  'Step-up Basso': ['C', 'Corpo libero', 'Un piede su un gradino basso (15–20 cm), l’altro sfiora solo il gradino', 'Multiarticolari', 'Quadricipiti, glutei', 'Femorali', '', 'quadricipiti', 'grande_gluteo femorali'],
  'Sit-to-Stand dalla Panca': ['C', 'Corpo libero', 'Seduto sul bordo di una panca o di una sedia stabile, piedi sotto le ginocchia', 'Multiarticolari', 'Quadricipiti, glutei', 'Adduttori, core', '', 'quadricipiti', 'grande_gluteo adduttori stabilita'],
  'Calf Raise con Manubrio sul Gradino': ['L', 'Manubri', 'In piedi sul bordo di un gradino, un manubrio per mano, tallone nel vuoto', 'Polpacci', 'Gemelli', 'Soleo', 'calf', 'polpacci'],
  'Tibialis Raise': ['C', 'Corpo libero', 'Schiena al muro, talloni a terra, le punte dei piedi che salgono', 'Polpacci', 'Tibiale anteriore', '', '', 'tibiale'],
  'Copenhagen Plank': ['C', 'Corpo libero', 'Di fianco, gamba superiore su una sedia o una panca, avambraccio a terra', 'Adduttori', 'Adduttori, obliqui', 'Medio gluteo, core', '', 'adduttori', 'obliqui abduttori'],
  /* SCHIENA */
  'Trazioni Negative': ['C', 'Sbarra', 'Presa prona, parti con il mento sopra la sbarra e scendi in 4–5 secondi', 'Dorsali · larghezza', 'Gran dorsale', 'Bicipite, romboidi, trapezio inferiore', 'trazioni', 'dorsali', 'bicipiti schiena_spessore'],
  'Seal Row': ['L', 'Manubri', 'A pancia in giù su una panca alta, braccia che pendono', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore'],
  'Lat Pulldown con Elastico': ['M', 'Elastico', 'Elastico ancorato in alto, in ginocchio sotto l’ancoraggio, presa prona larga', 'Dorsali · larghezza', 'Gran dorsale', 'Grande rotondo, bicipite', 'lat', 'dorsali', 'bicipiti'],
  'Rematore agli Anelli': ['C', 'Anelli', 'Presa neutra, corpo teso e inclinato, piedi a terra', 'Spessore · dorsali e romboidi', 'Gran dorsale, romboidi, trapezio medio', 'Bicipite, deltoide posteriore, core', '', 'schiena_spessore', 'dorsali bicipiti deltoide_posteriore stabilita'],
  'Stacco in Deficit': ['L', 'Bilanciere', 'Presa mista o prona, in piedi su un rialzo di 2–5 cm', 'Lombari e catena posteriore', 'Erettori spinali, glutei, femorali', 'Quadricipiti, trapezio, gran dorsale, avambracci', '', 'erettori', 'grande_gluteo femorali quadricipiti trapezio dorsali avambracci'],
  /* PETTO */
  'Floor Press con Manubri': ['L', 'Manubri', 'Sdraiato a terra, i gomiti si fermano sul pavimento', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite', '', 'petto_medio', 'deltoide_anteriore tricipiti'],
  'Chest Press Inclinata alla Macchina': ['M', 'Macchina', 'Schienale reclinato a circa 30°, maniglie in alto', 'Petto · fasci alti', 'Gran pettorale (fasci alti)', 'Deltoide anteriore, tricipite', '', 'petto_alto', 'deltoide_anteriore tricipiti'],
  'Panca con Pausa': ['L', 'Bilanciere', 'Presa prona poco più larga delle spalle, pausa di 1–2 secondi sul petto', 'Petto · fasci medi', 'Gran pettorale', 'Deltoide anteriore, tricipite', '', 'petto_medio', 'deltoide_anteriore tricipiti'],
  /* SPALLE E TRAPEZIO */
  'Alzate Laterali con Elastico': ['L', 'Elastico', 'In piedi sull’elastico, un’estremità per mano, braccia ai lati', 'Deltoidi laterali', 'Deltoide laterale', 'Trapezio superiore', '', 'deltoide_laterale', 'trapezio'],
  'Alzate Laterali Inclinate': ['L', 'Manubri', 'In piedi di lato a un montante, una mano si tiene e il busto si inclina lontano', 'Deltoidi laterali', 'Deltoide laterale', 'Trapezio superiore', '', 'deltoide_laterale', 'trapezio'],
  'Extrarotazione al Cavo': ['M', 'Cavo', 'Maniglia singola, puleggia all’altezza del gomito, gomito fermo al fianco', 'Deltoidi posteriori e cuffia', 'Extrarotatori della cuffia', 'Deltoide posteriore', '', 'deltoide_posteriore', ''],
  'Face Pull con Elastico': ['M', 'Elastico', 'Elastico ancorato all’altezza del viso, presa con i pollici verso di te', 'Deltoidi posteriori e cuffia', 'Deltoide posteriore, extrarotatori della cuffia', 'Romboidi, trapezio medio', '', 'deltoide_posteriore', 'schiena_spessore'],
  'Scrollate con Manubri': ['L', 'Manubri', 'In piedi, un manubrio per mano, braccia tese lungo i fianchi', 'Trapezio', 'Trapezio superiore', 'Avambracci', '', 'trapezio', 'avambracci'],
  /* BRACCIA E CORE */
  'Suitcase Carry': ['L', 'Manubri', 'Un solo manubrio (o kettlebell) pesante in una mano, camminata dritta', 'Obliqui e anti-rotazione', 'Obliqui, quadrato dei lombi', 'Trapezio superiore, avambracci', '', 'obliqui', 'trapezio avambracci']
};

/* lo stesso calcolo di senzaEmoji (questionario-decisioni.js): condividono lo spazio «senzaEmoji» della memoria di una chiamata */
function _nomePulito(nome) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('senzaEmoji') : null;
  if (t !== null) { const v = t.get(nome); if (v !== undefined) return v; }
  const r = String(nome).replace(EMOJI_TESTA, '');
  if (t !== null) t.set(nome, r);
  return r;
}

/* i dettagli di un esercizio, o null se non e della libreria (dentro buildProgram lo stesso oggetto per lo stesso nome: chi lo legge non lo modifica) */
window.dettaglioEsercizio = function(nome) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('dettaglioEsercizio') : null;
  if (t !== null) { const v = t.get(nome); if (v !== undefined) return v; }
  const r = DETTAGLI[_nomePulito(nome)];
  const out = !r ? null : { sez: r[0], att: r[1], attacco: r[2], sub: r[3], focus: r[4], sec: r[5] || '', nota: r[6] ? NOTE_ATTACCO[r[6]] : '', notaId: r[6] || '',
    bersaglio: r[7] || '', secondari: r[8] ? r[8].split(' ') : [] };
  if (t !== null) t.set(nome, out);
  return out;
};
/* il muscolo bersaglio (id di MUSCOLI), o '' se l esercizio non e della libreria */
window.bersaglioDi = function(nome) {
  const r = DETTAGLI[_nomePulito(nome)];
  return r && r[7] ? r[7] : '';
};
/* { id, gruppo, sub, nome } del muscolo bersaglio, per mostrarlo («Stesso muscolo: Bicipite brachiale») */
window.muscoloBersaglio = function(nome) {
  const id = bersaglioDi(nome);
  return id && MUSCOLI[id] ? Object.assign({ id: id }, MUSCOLI[id]) : null;
};
/* id della famiglia di MULTIARTICOLARI_TOTALI, o '' se l esercizio ha un muscolo bersaglio solo */
window.famigliaTotaleDi = function(nome) {
  const n = _nomePulito(nome);
  return Object.keys(MULTIARTICOLARI_TOTALI).find(id => MULTIARTICOLARI_TOTALI[id].esercizi.indexOf(n) !== -1) || '';
};
/* cosa devono allenare le alternative, per mostrarlo: la famiglia per i multiarticolari totali,
   altrimenti il muscolo bersaglio. { totale, nome } o null */
window.lavoroDaSostituire = function(nome) {
  const f = famigliaTotaleDi(nome);
  if (f) return { totale: true, nome: MULTIARTICOLARI_TOTALI[f].nome };
  const m = muscoloBersaglio(nome);
  return m ? { totale: false, nome: m.nome } : null;
};
/* M, L o C: da DETTAGLI; per gli esercizi fuori libreria si ricava dall attrezzo */
window.sezioneEsercizio = function(nome) {
  const d = dettaglioEsercizio(nome);
  if (d) return d.sez;
  const a = attrezzoDi(_nomePulito(nome));
  return a === 'macchine' ? 'M' : (a === 'corpo' ? 'C' : 'L');
};
/* «Cavo · Triangolo, presa neutra stretta» */
window.etichettaAttrezzo = function(nome) {
  const d = dettaglioEsercizio(nome);
  return d ? d.att + (d.attacco ? ' · ' + d.attacco : '') : '';
};
window.focusEsercizio = function(nome) {
  const d = dettaglioEsercizio(nome);
  return d ? d.focus : '';
};
/* da multiarticolare a isolamento: con piu focus si dice che e multiarticolare */
window.focusConTipo = function(nome) {
  const m = findExercise(nome), d = dettaglioEsercizio(nome);
  if (!d) return '';
  return (m && m.type === 'compound' ? 'Multiarticolare' : 'Isolamento') + ': ' + d.focus;
};

/* Ordine dentro una lista: prima i multiarticolari, poi per preferenza del coach (PRIORI), poi per nome */
window.ordineEsercizi = function(a, b) {
  if (a.type !== b.type) return a.type === 'compound' ? -1 : 1;
  const pa = (typeof PRIORI !== 'undefined' && PRIORI[_nomePulito(a.name)]) || 1, pb = (typeof PRIORI !== 'undefined' && PRIORI[_nomePulito(b.name)]) || 1;
  if (pa !== pb) return pb - pa;
  return _nomePulito(a.name).localeCompare(_nomePulito(b.name));
};
/* Mette in ordine una lista di esercizi della libreria: sezione (macchinari e cavi, pesi liberi, corpo libero),
   poi gruppo muscolare, poi sottogruppo; dentro il sottogruppo vale `cmp` (di norma ordineEsercizi).
   Ritorna [{ sez, titolo, gruppi: [{ gruppo, sottogruppi: [{ sub, items }] }] }]. */
window.organizzaEsercizi = function(lista, cmp) {
  const out = [];
  SEZIONI_ESERCIZI.forEach(([codice, titolo]) => {
    const dentro = lista.filter(e => sezioneEsercizio(e.name) === codice);
    if (!dentro.length) return;
    const gruppi = [];
    Object.keys(MUSCLE_GROUPS).forEach(g => {
      const delGruppo = dentro.filter(e => e.group === g);
      if (!delGruppo.length) return;
      const ordine = SOTTOGRUPPI[g] || [];
      const subs = {};
      delGruppo.forEach(e => { const d = dettaglioEsercizio(e.name); const s = d ? d.sub : ''; (subs[s] = subs[s] || []).push(e); });
      const chiavi = Object.keys(subs).sort((x, y) => {
        const ix = ordine.indexOf(x), iy = ordine.indexOf(y);
        return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy);
      });
      gruppi.push({ gruppo: g, sottogruppi: chiavi.map(s => ({ sub: s, items: subs[s].slice().sort(cmp || ordineEsercizi) })) });
    });
    out.push({ sez: codice, titolo: titolo, gruppi: gruppi });
  });
  return out;
};
/* le altre prese e attacchi dello stesso movimento (stessa nota, stesso gruppo): per passare dall una all altra */
window.variantiEsercizio = function(nome) {
  const d = dettaglioEsercizio(nome), m = findExercise(nome);
  if (!d || !d.notaId || !m) return [];
  return EXERCISE_LIBRARY.filter(e => e.name !== m.name && e.group === m.group && (dettaglioEsercizio(e.name) || {}).notaId === d.notaId);
};
