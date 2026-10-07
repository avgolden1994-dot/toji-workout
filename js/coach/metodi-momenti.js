/* Metodi di allenamento e momenti
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   METODI DI ALLENAMENTO (le schede famose online) e
   MOMENTI DI VITA (stress, rottura, lutto, umore, ansia, sonno…)
   Il coach collega le due cose al profilo psicologico: chi hai
   davanti + cosa sta vivendo -> quale metodo e con quale dose.
   ============================================================ */
/* MAV-03 (W0-T2): GreySkull, GZCLP e Reddit PPL hanno l AMRAP nello schema; il coach lo toglie dove non e ammesso (buildProgram) e lo dice qui */
const ATTENZIONE_AMRAP = 'Con chi inizia, ai minorenni, sopra i 65 anni o in modalità prudente il coach toglie l’AMRAP: la serie finale resta a 1-2 ripetizioni dal cedimento.';
const FB = (n) => ['fullbody'].concat(Array(Math.max(0, n - 1)).fill('fullbody'));
const UL4 = { nome: 'Upper / Lower', giorni: ['upper', 'lower', 'upper', 'lower'] };
/* PCO-04 (W2-T2): le coppie del metodo `rr` per MUSCOLO antagonista, non per indice. Prima i multiarticolari delle gambe, poi quelli di spinta e tirata, poi gli isolamenti, il core e le tenute in fondo (i grandi gruppi
   prima dei piccoli e i multi prima dei mono: ORD-02, ORD-03; il core e le tenute mai in coppia: SS-02); poi strSuperserie accoppia gli antagonisti (spinta con tirata, quadricipiti con femorali), che a quel punto sono gia vicini */
function coppiePerMuscolo(sd) {
  const m = (e) => findExercise(e.name) || {}, nucleo = (e) => isTimeBased(e.name) || m(e).group === 'core', gambe = (e) => ['gambe', 'glutei'].indexOf(m(e).group) !== -1;
  const livello = (e) => nucleo(e) ? 3 : (m(e).type !== 'compound' ? 2 : (gambe(e) ? 0 : 1));
  sd.esercizi.sort((a, b) => livello(a) - livello(b));
  strSuperserie(sd);
}
const METODI = [
  { id: 'coach', nome: 'Il metodo del coach', fonte: 'Ricerca 2018-2026 (Pelland, Robinson, Helms)', livelli: ['principiante', 'intermedio', 'avanzato'], giorni: [2, 3, 4, 5, 6], intensita: 'media', struttura: 'flessibile', varieta: 1, minuti: [30, 90], luoghi: ['palestra', 'manubri', 'corpo'], obiettivi: ['massa', 'forza', 'dimagrimento', 'salute', 'ricomposizione', 'glutei'], applicabile: true,
    come: 'Volume per muscolo, ripetizioni per tipo di esercizio, RIR che scende nel blocco, scarico dosato sulla fatica.', perChi: 'Tutti: si adatta a te da solo.', attenzione: '' },
  { id: 'startingstrength', nome: 'Starting Strength', fonte: 'Mark Rippetoe', livelli: ['principiante'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['forza'], applicabile: true,
    come: 'Full body A/B: squat 3×5 a ogni seduta, panca o military 3×5, stacco da terra 1×5; +2,5 kg a ogni seduta; due mancate di fila = −5%.', perChi: 'Principianti che vogliono diventare forti con pochi esercizi.', attenzione: 'Poco volume per la massa; noioso per chi ama cambiare. Il power clean non c’è nella libreria: nel giorno B resta lo stacco.',
    split: () => ({ nome: 'Full Body A/B', giorni: FB(3) }), nEs: () => 3, pesanti: true, essenziale: true,
    /* B19: A = squat, panca, stacco; B = squat, military press, stacco (prima A aveva il rematore e B lo stacco rumeno a 3 serie) */
    ricette: { fullbody: k => k % 2 ? ['squat', 'spintaV', 'staccoTerra'] : ['squat', 'spintaO', 'staccoTerra'] },
    schema: (e, i) => { e.sets = /stacco/i.test(e.name) ? 1 : 3; e.reps = 5; e.rest = 180; } },
  { id: 'stronglifts', tocco: 'amrap', nome: 'StrongLifts 5×5', fonte: 'Mehdi Hadim', livelli: ['principiante'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['forza', 'massa'], applicabile: true,
    come: 'Full body A/B, 5×5 sui fondamentali (stacco 1×5), +2,5 kg a seduta; mancato più volte = −10%.', perChi: 'Principianti che amano la routine e i numeri che salgono.', attenzione: 'Più volume di Starting Strength: recupero da curare.',
    split: () => ({ nome: 'Full Body A/B', giorni: FB(3) }), nEs: () => 3, pesanti: true, essenziale: true,
    ricette: { fullbody: k => k % 2 ? ['squat', 'spintaV', 'staccoTerra'] : ['squat', 'spintaO', 'tirataO'] },   /* B19: nel giorno B lo stacco da terra 1x5, non il rumeno */
    schema: (e) => { e.sets = /stacco/i.test(e.name) ? 1 : 5; e.reps = 5; e.rest = 180; } },
  { id: 'greyskull', tocco: 'amrap', nome: 'GreySkull LP', fonte: 'John Sheaffer', livelli: ['principiante'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [45, 60], luoghi: ['palestra'], obiettivi: ['forza', 'massa', 'ricomposizione'], applicabile: true,
    come: '2×5 + ultima serie AMRAP sui fondamentali, accessori per braccia; se manchi, −10% e si batte il record di ripetizioni.', perChi: 'Principianti competitivi: ogni seduta un record da battere.', attenzione: ATTENZIONE_AMRAP,
    split: () => ({ nome: 'Full Body A/B', giorni: FB(3) }), nEs: () => 4, pesanti: true, essenziale: true,
    ricette: { fullbody: k => k % 2 ? ['squat', 'spintaV', 'hinge', 'isoBic'] : ['squat', 'spintaO', 'tirataO', 'isoTri'] },
    schema: (e, i) => { if (i < 3) { e.sets = 3; e.reps = 5; e.rest = 180; e.tecnica = 'amrap'; } else { e.sets = 3; e.reps = 12; e.rest = 75; } } },
  { id: 'gzclp', tocco: 'amrap', nome: 'GZCLP', fonte: 'Cody Lefever', livelli: ['principiante', 'intermedio'], giorni: [4], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 75], luoghi: ['palestra'], obiettivi: ['forza', 'massa'], applicabile: true,
    come: 'Tre livelli: T1 5×3 pesante con AMRAP, T2 3×10, T3 3×15. Se il T1 si ferma: 6×2, poi 10×1.', perChi: 'Chi vuole forza e massa con regole chiare per gli stalli.', attenzione: ATTENZIONE_AMRAP,
    split: () => UL4, nEs: () => 4,
    schema: (e, i) => { if (i === 0) { e.sets = 5; e.reps = 3; e.rest = 180; e.tecnica = 'amrap'; } else if (i === 1) { e.sets = 3; e.reps = 10; e.rest = 120; } else { e.sets = 3; e.reps = 15; e.rest = 60; } } },
  { id: 'phul', nome: 'PHUL', fonte: 'Brandon Campbell', livelli: ['intermedio', 'avanzato'], giorni: [4], intensita: 'alta', struttura: 'rigida', varieta: 0.5, minuti: [60, 75], luoghi: ['palestra'], obiettivi: ['massa', 'forza'], applicabile: true,
    come: 'Upper e Lower due volte: una seduta di forza (3-5 ripetizioni) e una di ipertrofia (8-15).', perChi: 'Intermedi che vogliono forza e massa insieme.', attenzione: '',
    split: () => UL4, phul: true },
  { id: 'gbr', tocco: 'isolamenti', nome: 'Generic Bulking Routine', fonte: 'Lyle McDonald', livelli: ['intermedio'], giorni: [4], intensita: 'media', struttura: 'rigida', varieta: 0.5, minuti: [60, 75], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: true,
    come: 'Upper/Lower: primo esercizio 3-4×6-8, secondo 2-3×10-12, isolamenti 1-2×12-15; aumenti quando resta 1-2 ripetizioni.', perChi: 'Intermedi in massa che vogliono un piano semplice e collaudato.', attenzione: '',
    split: () => UL4, nEs: () => 6,
    schema: (e, i) => { if (i === 0) { e.sets = 4; e.reps = 8; e.rest = 180; } else if (i === 1) { e.sets = 3; e.reps = 12; e.rest = 120; } else if ((findExercise(e.name) || {}).type === 'compound') { e.sets = 3; e.reps = 12; e.rest = 120; } else { e.sets = 2; e.reps = 15; e.rest = 90; } } },
  { id: 'hatfield', tocco: 'piramide', nome: 'Metodo Hatfield', fonte: 'Fred Hatfield (Project inVictus)', livelli: ['intermedio', 'avanzato'], giorni: [3, 4], intensita: 'alta', struttura: 'flessibile', varieta: 1, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: true,
    come: 'Per ogni muscolo tre esercizi: pesante 4-6 ripetizioni, medio 10-12, leggero 15-20.', perChi: 'Intermedi che si annoiano con una sola fascia di ripetizioni.', attenzione: 'Sedute lunghe.',
    schema: (e, i, sd) => {
      const g = (findExercise(e.name) || {}).group;
      const pos = sd.esercizi.slice(0, i).filter(x => (findExercise(x.name) || {}).group === g).length;
      const comp = (findExercise(e.name) || {}).type === 'compound';
      if (pos === 0 && comp) { e.reps = 6; e.rest = 180; e.sets = Math.min(e.sets, 4); } else if (!comp && pos < 2) { e.reps = 12; e.rest = 75; } else if (pos === 1) { e.reps = 12; e.rest = 120; } else { e.reps = 20; e.rest = 60; e.sets = Math.min(e.sets, 3); }
    } },
  { id: 'redditppl', tocco: 'amrap', nome: 'Reddit PPL', fonte: 'Metallicadpa', livelli: ['principiante', 'intermedio'], giorni: [6, 3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['massa', 'forza'], applicabile: true,
    come: 'Push/Pull/Legs: fondamentale 4×5 + 1×5+ AMRAP, accessori 3×8-12, +2,5 kg a seduta.',
    split: (g) => g >= 6 ? { nome: 'Push / Pull / Legs x2', giorni: ['push', 'pull', 'legs', 'push', 'pull', 'legs'] } : { nome: 'Push / Pull / Legs', giorni: ['push', 'pull', 'legs'] }, perChi: 'Chi ha tanto tempo e ama allenarsi spesso.', attenzione: '6 giorni: serve un buon recupero. ' + ATTENZIONE_AMRAP,
    schema: (e, i) => { if (i === 0) { e.sets = 5; e.reps = 5; e.rest = 180; e.tecnica = 'amrap'; } else { e.sets = 3; e.reps = 10; e.rest = 90; } } },
  { id: 'minimo', tocco: 'superserie', nome: 'Dose minima', fonte: 'Iversen 2021, ACSM 2026', livelli: ['principiante', 'intermedio', 'avanzato'], giorni: [2, 3], intensita: 'media', struttura: 'flessibile', varieta: 1, minuti: [20, 45], luoghi: ['palestra', 'manubri', 'corpo'], obiettivi: ['salute', 'massa', 'dimagrimento', 'ricomposizione', 'forza', 'glutei'], applicabile: true,
    come: 'Due o tre full body a settimana, 2 serie per esercizio da 6-15 ripetizioni vicino al cedimento, spinte e tirate in superserie.', perChi: 'Chi ha poco tempo o sta passando un periodo pieno.', attenzione: 'Progressi più lenti, ma veri.',
    /* PCO-04 e CAS-10 (W2-T2): anche 3 giorni (full body x3, 4-5 esercizi x 2 serie in coppia: ricerca-metodi-coach-pratici 5.5) e da 20 minuti; la pausa resta quella della classe (PRG-13), le coppie sono antagoniste (strSuperserie) */
    split: (g) => ({ nome: 'Full Body', giorni: FB(Math.min(3, Number(g) || 2)) }), nEs: (n) => Math.max(4, Math.min(5, n)), superserie: true,
    schema: (e) => { e.sets = 2; e.reps = isTimeBased(e.name) ? e.reps : 10; } },
  { id: 'mantenimento', nome: 'Mantenimento', fonte: 'Bickel 2011', livelli: ['principiante', 'intermedio', 'avanzato'], giorni: [1, 2], intensita: 'bassa', struttura: 'flessibile', varieta: 0, minuti: [20, 40], luoghi: ['palestra', 'manubri', 'corpo'], obiettivi: ['salute', 'massa', 'forza', 'dimagrimento', 'ricomposizione', 'glutei'], applicabile: true,
    come: 'Con un terzo (anche un nono) del volume e gli stessi carichi i muscoli restano. 1-2 sedute brevi.', perChi: 'Periodi difficili: lutto, esami, trasloco, nuovo bambino.', attenzione: 'Sopra i 60 anni serve un po’ più volume.',
    split: (g) => ({ nome: 'Full Body', giorni: FB(Math.min(2, g)) }), nEs: () => 4,
    schema: (e) => { e.sets = 2; e.rest = 90; } },
  { id: 'rr', nome: 'Recommended Routine (corpo libero)', fonte: 'r/bodyweightfitness', livelli: ['principiante', 'intermedio'], giorni: [3], intensita: 'media', struttura: 'rigida', varieta: 0, minuti: [45, 60], luoghi: ['corpo', 'manubri'], obiettivi: ['salute', 'massa', 'forza', 'ricomposizione'], applicabile: true,
    come: 'Coppie di esercizi opposti (spinta e tirata, quadricipiti e femorali), poi il core. 3×5-8; a 3×8 passi alla variante più difficile.', perChi: 'Chi si allena a casa o si sente a disagio in palestra.', attenzione: 'Serve una sbarra o un appiglio per tirare.',
    /* H-07 (W2-T2): 3 serie da 5-8 ripetizioni (si parte dalla prescrizione del coach, fra 5 e 8: la forza a 6, il resto a 8); le coppie le fa `schema` sull ultimo esercizio, per MUSCOLO antagonista (strSuperserie: spinta con tirata,
       quadricipiti con femorali; mai core ne tempi) e non per indice (prima: Rematore inverso + Ponte glutei, Squat + Piegamenti: collaudo SS-01). `superserie` e falso apposta: applicaMetodo non accoppia piu per indice.
       La pausa e quella della classe (PRG-13: il Plank non aspetta 90 s, H-04) */
    split: () => ({ nome: 'Full Body corpo libero', giorni: FB(3) }), luogo: 'corpo', superserie: false,
    schema: (e, i, sd) => {
      e.sets = 3;
      if (!isTimeBased(e.name)) e.reps = Math.min(8, Math.max(5, e.reps));
      if (i === sd.esercizi.length - 1) coppiePerMuscolo(sd);
    } },
  { id: 'hit', nome: 'Alta intensità (HIT)', fonte: 'Mike Mentzer, Heavy Duty', livelli: ['intermedio', 'avanzato'], giorni: [2, 3], intensita: 'alta', struttura: 'rigida', varieta: 0.5, minuti: [30, 45], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: true,
    come: 'Poche serie al cedimento, poi a casa. Mentzer: una serie per esercizio dopo il riscaldamento, 6-10 ripetizioni per la parte alta e 12-20 per le gambe, 4-7 giorni prima di rifare lo stesso muscolo.', perChi: 'Chi ama spingere al massimo e ha poco tempo.',
    attenzione: 'Una serie cresce meno di più serie (Krieger 2010): il coach ne tiene due. Tiene anche il fondamentale per primo: il pre-affaticamento non dà più crescita (Gentil e altri).',
    split: (g) => g >= 4 ? UL4 : (g === 3 ? { nome: 'Petto e Schiena / Gambe / Spalle e Braccia', giorni: ['petto-schiena', 'legs', 'spalle-braccia'] } : { nome: 'Full Body', giorni: FB(2) }), nEs: () => 6, essenziale: true,
    schema: (e, i, sd) => {
      const g = (findExercise(e.name) || {}).group;
      e.sets = 2; e.reps = isTimeBased(e.name) ? e.reps : ((g === 'gambe' || g === 'glutei') ? 15 : 8); e.rest = 120;
      /* riposo-pausa sull ultimo esercizio (Mentzer lo usava; stessa crescita, tempo dimezzato: Prestes 2019) */
      if (i === sd.esercizi.length - 1 && !isTimeBased(e.name) && tipoCarico(e.name) !== 'pesante' && g !== 'core') e.tecnica = 'riposopausa';
    } },
  { id: '531', nome: '5/3/1', fonte: 'Jim Wendler', livelli: ['intermedio', 'avanzato'], giorni: [3, 4], intensita: 'media', struttura: 'rigida', varieta: 0, minuti: [45, 75], luoghi: ['palestra'], obiettivi: ['forza'], applicabile: false,
    come: 'Massimale di allenamento al 90%, onde di 4 settimane (65-75-85%, 70-80-90%, 75-85-95%, scarico), +2,5/5 kg a ciclo.', perChi: 'Intermedi pazienti: progressi lenti ma per anni.', attenzione: 'Ispirazione: il coach usa già onde di RIR simili.' },
  { id: 'madcow', nome: 'Madcow 5×5 / Texas Method', fonte: 'Bill Starr, Glenn Pendlay', livelli: ['intermedio'], giorni: [3], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['forza'], applicabile: false,
    come: 'Giorno pesante, leggero e medio; il record si cerca una volta a settimana.', perChi: 'Chi ha finito la progressione da principiante.', attenzione: 'Ispirazione: si ottiene con GZCLP o PHUL.' },
  { id: 'conjugate', nome: 'Coniugato (Westside) per tutti', fonte: 'Louie Simmons', livelli: ['avanzato'], giorni: [4], intensita: 'alta', struttura: 'flessibile', varieta: 2, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['forza'], applicabile: false,
    come: 'Varianti che ruotano ogni 2-3 settimane, lavoro all’85-92%, accessori sui punti deboli.', perChi: 'Avanzati che si annoiano: variazione intelligente.', attenzione: 'Ispirazione: con "Cambiare spesso" il coach fa ruotare gli esercizi a ogni ciclo.' },
  { id: 'kettlebell', nome: 'Simple & Sinister', fonte: 'Pavel Tsatsouline', livelli: ['principiante', 'intermedio'], giorni: [5, 6], intensita: 'media', struttura: 'rigida', varieta: 0, minuti: [20, 30], luoghi: ['manubri', 'corpo'], obiettivi: ['salute', 'forza'], applicabile: false,
    come: '100 swing e 10 get-up quasi ogni giorno; si sale di kettlebell a piccoli passi.', perChi: 'Chi vuole poche decisioni e 30 minuti al giorno.', attenzione: 'Serve un kettlebell (non ancora nella libreria).' },
  { id: 'gvt', nome: 'German Volume Training 10×10', fonte: 'Poliquin', livelli: ['avanzato'], giorni: [4], intensita: 'alta', struttura: 'rigida', varieta: 0, minuti: [60, 75], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: false,
    come: '10 serie da 10 sullo stesso esercizio.', perChi: 'Solo come curiosità.', attenzione: 'Oltre 5 serie per esercizio non si cresce di più (Amirthalingam 2017): il coach non lo consiglia.' },
  { id: 'brosplit', nome: 'Bro split (un muscolo al giorno)', fonte: 'Bodybuilding classico', livelli: ['intermedio', 'avanzato'], giorni: [5], intensita: 'alta', struttura: 'rigida', varieta: 0.5, minuti: [60, 90], luoghi: ['palestra'], obiettivi: ['massa'], applicabile: false,
    come: 'Petto lunedì, schiena martedì… ogni muscolo una volta a settimana.', perChi: 'Chi ama le sedute dedicate.', attenzione: 'A volume pari funziona, ma oltre 11 serie per muscolo in una seduta si spreca: il coach preferisce 2 volte a settimana.' }
];
function metodoDa(id) { return METODI.find(m => m.id === id) || null; }

const MOMENTI = [
  { id: 'stress', nome: 'Lavoro o esami sotto pressione', vol: 0.7, rir: 1, settimane: 3, tecniche: false,
    testo: 'Con molto stress il recupero passa da 48 a 96 ore (Stults-Kolehmainen 2014) e la forza cresce meno (Bartholomew 2008): meno serie, stessi carichi, niente tecniche intense.' },
  { id: 'rottura', nome: 'Fine di una relazione', vol: 0.85, rir: 1, settimane: 4, tecniche: false, guardia: true, aiuto: true,
    testo: 'Dopo una rottura molti si allenano di più: va bene, ti dà routine e umore. Niente massimali per qualche settimana e occhio al sonno. Parlarne con qualcuno aiuta più di una serie in più.' },
  { id: 'lutto', nome: 'Un lutto', vol: 0.5, rir: 2, settimane: 6, tecniche: false, aiuto: true,
    testo: 'Nessuna pressione: sedute brevi quando te la senti, camminare conta. Il programma ti aspetta.' },
  { id: 'giu', nome: 'Periodo giù di morale', vol: 0.7, rir: 1, settimane: 4, tecniche: false, aiuto: true, guardia: true,
    testo: 'I pesi riducono i sintomi depressivi anche senza aumentare i carichi (Gordon 2018; Noetel 2024): conta esserci. Camminare aiuta altrettanto. Se dura più di due settimane, parlane con il medico.' },
  { id: 'ansia', nome: 'Ansia', vol: 0.85, rir: 1, settimane: 4, routine: true,
    testo: 'Due sedute di pesi a settimana riducono l’ansia (Gordon 2020, d 0,85). Stessi esercizi e stessi orari: la prevedibilità aiuta.' },
  { id: 'sonno', nome: 'Dormo poco', vol: 0.8, rir: 1, settimane: 2, tecniche: false,
    testo: 'Col sonno scarso cala la forza nei multiarticolari, non negli isolamenti (Knowles 2018): fondamentali più leggeri, accessori normali.' },
  { id: 'bambino', nome: 'Nuovo bambino in casa', vol: 0.6, rir: 1, settimane: 12, tecniche: false,
    testo: 'Sedute da 30 minuti, anche a casa. Dopo il parto parlane con l’ostetrica o con il medico prima di riprendere: il coach non dà un programma specifico per questo periodo.' },
  { id: 'pieno', nome: 'Periodo pienissimo (trasloco, viaggi)', vol: 0.4, rir: 1, settimane: 3, tecniche: false,
    testo: 'Mantenimento: con un terzo del volume e gli stessi carichi i muscoli restano (Bickel 2011).' },
  { id: 'rientro', nome: 'Rientro da malattia o infortunio', vol: 0.6, rir: 2, settimane: 2, tecniche: false,
    testo: 'Si riparte leggeri e si risale in fretta: la memoria muscolare riporta i carichi in circa metà del tempo di stop.' },
  { id: 'carica', nome: 'Voglio dare tutto', vol: 1, rir: 0, settimane: 4, guardia: true,
    testo: 'Bene la spinta, ma più sedute non vuol dire più risultati: il coach tiene i giorni del programma e ti avvisa se esageri.' }
];
function momentoDa(id) { return MOMENTI.find(m => m.id === id) || null; }
function momentoAttivo() {
  const p = getProfile() || {};
  const mo = p.momento;
  if (!mo || !mo.id) return null;
  const m = momentoDa(mo.id);
  const ult = mo.verificato || mo.dal;
  return m ? Object.assign({}, m, { dal: mo.dal, fino: mo.fino, scaduto: mo.fino && ymd(new Date()) > mo.fino,
    verifica: !!ult && ymd(new Date()) >= ymd(piuGiorni(daYmd(ult), 7)) }) : null;
}
/* volume ridotto su tutto il piano, con copia per tornare indietro */
function applicaMomento(m, data) {
  const backup = {};
  DAYS.forEach(g => {
    backup[g] = (data[g] || []).map(e => ({ name: e.name, sets: e.sets, tecnica: e.tecnica || null }));
    (data[g] || []).forEach(e => {
      if (m.vol < 1) { e.sets = Math.max(1, Math.round(e.sets * m.vol)); normalizeExerciseRecord(e); }
      if (m.tecniche === false) delete e.tecnica;
    });
  });
  return backup;
}
/* Un periodo attivo non si chiude per sbaglio: dalle Opzioni serve una conferma,
   nel Piano il coach lo chiede una volta a settimana. */
let momentoInAttesa = null;
window.chiediMomento = function(id) {
  const att = momentoAttivo();
  if (!att) { setMomento(id); return; }
  momentoInAttesa = id;
  renderSetPage();
};
window.confermaMomento = function(si) {
  const id = momentoInAttesa;
  momentoInAttesa = null;
  if (si) setMomento(id); else renderSetPage();
};
window.setMomento = function(id, silenzioso) {
  momentoInAttesa = null;
  const attuale = (getProfile() || {}).momento;
  if (attuale) terminaMomento(true);
  if (!id || (attuale && attuale.id === id)) { if (!silenzioso) { renderSetPage(); showUndo('Periodo chiuso: il piano torna com’era'); } return; }
  const m = momentoDa(id);
  if (!m) return;
  const data = loadData();
  const backup = applicaMomento(m, data);
  saveData(data);
  const p = getProfile() || {};
  p.momento = { id: id, dal: ymd(new Date()), fino: ymd(piuGiorni(new Date(), 7 * m.settimane)), backup: backup };
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  if (!silenzioso) {
    renderSetPage();
    showUndo(m.vol < 1 ? 'Volume al ' + Math.round(m.vol * 100) + '% per ' + m.settimane + ' settimane' : 'Il coach terrà d’occhio i tuoi giorni', () => setMomento(null, true));
  }
};
function terminaMomento(silenzioso) {
  const p = getProfile() || {};
  const mo = p.momento;
  if (!mo) return;
  const data = loadData();
  DAYS.forEach(g => (data[g] || []).forEach(e => {
    const b = ((mo.backup || {})[g] || []).find(x => x.name === e.name);
    if (b) { e.sets = b.sets; if (b.tecnica) e.tecnica = b.tecnica; normalizeExerciseRecord(e); }
  }));
  saveData(data);
  delete p.momento;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  if (!silenzioso && typeof renderOggi === 'function') renderOggi();
}
window.verificaMomento = function(passo) {
  const p = getProfile() || {};
  if (!p.momento || passo !== 'continua') return;
  p.momento.verificato = ymd(new Date());
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  try { renderOggi(); renderPianoCoach(); } catch (e) {}
};
/* il periodo si chiude solo dalle Opzioni, con conferma */
window.vaiAlMomento = function() {
  switchTab('impostazioni'); openSetPage('coach');
  setTimeout(() => { const el = document.getElementById('mo-anchor'); if (el) el.scrollIntoView({ block: 'center' }); }, 60);
};
window.fineMomento = function(ancora) {
  const p = getProfile() || {};
  if (ancora && p.momento) { p.momento.fino = ymd(piuGiorni(new Date(), 14)); p.momento.verificato = ymd(new Date()); localStorage.setItem(PROFILE_KEY(), JSON.stringify(p)); renderOggi(); return; }
  terminaMomento(false);
  showUndo('Bentornato al piano pieno');
};
/* una settimana di prontezza bassa: il coach chiede cosa succede (Hooper: >7 giorni = segnale) */
function prontezzaBassaSettimana() {
  const st = storicoProntezza().filter(x => typeof x.punteggio === 'number' && x.data >= ymd(piuGiorni(new Date(), -8)));
  return st.length >= 3 && st.reduce((a, x) => a + x.punteggio, 0) / st.length < 50;
}
function htmlMomento() {
  if (!coachAttivo()) return '';
  const m = momentoAttivo();
  if (m) {
    const giorni7 = tutteLeSedute().filter(h0 => { const d = dataSessione(h0); return d && d >= piuGiorni(new Date(), -7); }).length;
    const prev = ((getProfile() || {}).days) || 3;
    let h = '<div class="card og-saltata og-momento"><div class="og-dol-t">' + ico('cuore') + ' <span>' + m.nome + '</span></div>';
    if (m.scaduto) {
      return h + '<p>Come va? Il periodo che avevi segnato è finito.</p><div class="og-dol-b og-tre">' +
        '<button class="btn-main" onclick="fineMomento(false)">Sto meglio</button><button class="btn-archive" onclick="fineMomento(true)">Ancora due settimane</button></div></div>';
    }
    h += '<p class="og-muted">' + m.testo + '</p>';
    if (m.guardia && giorni7 > prev + 1) h += '<p><b>Sette giorni, ' + giorni7 + ' allenamenti.</b> <span>Anche il riposo fa crescere. Se allenarti diventa un obbligo o ti fa stare in ansia quando salti, parlane con qualcuno.</span></p>';
    if (m.aiuto) h += '<p class="og-muted"><span>Se il malessere non passa o diventa pesante, parlane con il medico o con uno psicologo: chiedere aiuto è un gesto di forza.</span></p>';
    return h + '<button class="og-link" onclick="fineMomento(false)">Il periodo è finito</button></div>';
  }
  if (prontezzaBassaSettimana()) {
    return '<div class="card og-saltata"><div class="og-dol-t">' + ico('cuore') + ' <span>Settimana pesante?</span></div>' +
      '<p>Da qualche giorno il check prima della seduta è basso. Se stai passando un periodo difficile, il coach adatta il piano.</p>' +
      '<div class="og-dol-b og-tre"><button class="btn-main" onclick="switchTab(\'impostazioni\'); openSetPage(\'coach\');">Dimmi cosa succede</button></div></div>';
  }
  return '';
}
