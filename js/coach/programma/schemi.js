/* Schemi di movimento e regole di costruzione
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEMI DI MOVIMENTO E REGOLE DI COSTRUZIONE (Coach 2)
   Piramide di Helms: ogni settimana i 6 schemi (squat, hinge, spinta e
   tirata orizzontale, spinta e tirata verticale) piu gli isolamenti per
   quadricipiti, femorali, bicipiti, tricipiti, deltoidi laterali, polpacci.
   ============================================================ */
const SCHEMI_MOV = [
  ['squat', /squat|leg press|affondi|step-up|pendulum/i, 'Squat'],
  ['hinge', /stacco|good morning|hip thrust|ponte glutei|hyperextension/i, 'Hinge'],
  ['spintaO', /panca (piana|inclinata|declinata)|chest press|piegamenti|dip alle/i, 'Spinta orizzontale'],
  ['tirataO', /rematore|t-bar|pulley basso/i, 'Tirata orizzontale'],
  ['spintaV', /military|lento avanti|arnold|shoulder press|pike push/i, 'Spinta verticale'],
  ['tirataV', /trazioni|lat machine/i, 'Tirata verticale']
];
/* fuori dagli schemi: gli isolamenti col nome di un multiarticolare ("Calf Raise alla Leg Press",
   "Sissy Squat"); \balzate perche "Mani Rialzate" sono piegamenti, non alzate */
function schemaDi(nome) { const n = senzaEmoji(nome); if (/curl|croci|french|estensione|\balzate|y-raise|kickback|calf raise|sissy/i.test(n)) return null; const x = SCHEMI_MOV.find(sc => sc[1].test(n)); return x ? x[0] : null; }
const ISOLAMENTI = [
  ['quadricipiti', /leg extension/i], ['femorali', /leg curl|nordic curl|stacco rumeno|good morning/i], ['bicipiti', /curl/i],
  ['tricipiti', /pushdown|french press|estensione tricipiti|kickback tricipiti|presa stretta|dip su panca/i],
  ['deltoidi', /alzate laterali/i], ['polpacci', /calf raise/i]
];
function isolamentoDi(nome) { const n = senzaEmoji(nome); const x = ISOLAMENTI.find(i => i[1].test(n)); return x ? x[0] : null; }
/* esercizi in allungamento con prove (Maeo 2021-2023) */
const IN_ALLUNGAMENTO = /sopra la testa|leg curl seduto|panca inclinata \(|curl su panca inclinata|bayesiano|da seduto|piede rialzato/i;
/* RIC-03: petto, schiena e glutei (Maeo 2021-2023, Pedrosa 2025): croci e pullover coi manubri, affondi bulgari, stacco rumeno */
const IN_ALLUNGAMENTO_NUOVI = /croci su panca|pullover con manubrio|affondi bulgari|stacco rumeno/i;
const SCAMBI_ALLUNGAMENTO_NUOVI = [['Croci ai Cavi', 'Croci su Panca Manubri'], ['Pullover ai Cavi', 'Pullover con Manubrio']];
function inAllungamento(nome) { return IN_ALLUNGAMENTO.test(nome) || (regolaAttiva('RIC-03') && IN_ALLUNGAMENTO_NUOVI.test(nome)); }
function scambiAllungamento() { return regolaAttiva('RIC-03') ? SCAMBI_ALLUNGAMENTO.concat(SCAMBI_ALLUNGAMENTO_NUOVI) : SCAMBI_ALLUNGAMENTO; }
const SCAMBI_ALLUNGAMENTO = [['Pushdown Tricipiti ai Cavi', 'Estensione Tricipiti sopra la Testa ai Cavi'], ['Leg Curl Sdraiato', 'Leg Curl Seduto'], ['French Press', 'Estensione Tricipiti sopra la Testa con Manubrio']];
/* stimolo/fatica: al massimo uno di questi per seduta */
const SCHIENA_PESANTE = /Stacco da Terra|Squat con Bilanciere|Rematore con Bilanciere|Good Morning|T-Bar Row|Stacco Sumo/;
const GLUTEI_FAMIGLIE = [
  ['spinta', /hip thrust|ponte glutei/i, 'Hip Thrust'], ['squat', /squat|affondi|leg press/i, 'Affondi Bulgari'],
  ['stacco', /stacco|hyperextension|good morning/i, 'Stacco Rumeno'], ['abduzione', /abductor|slanci|kickback ai cavi/i, 'Abductor Machine']
];
const VOLUME_LIVELLO = { principiante: [8, 10], intermedio: [10, 14], avanzato: [14, 20] };
const GRUPPI_PRINCIPALI = ['petto', 'schiena', 'gambe', 'spalle', 'braccia', 'glutei'];
function libNome(pulito) { return nomeInLibreria(pulito) || pulito; }
