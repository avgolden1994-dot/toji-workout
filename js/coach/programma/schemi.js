/* Schemi di movimento e regole di costruzione
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEMI DI MOVIMENTO E REGOLE DI COSTRUZIONE (Coach 2)
   Piramide di Helms: ogni settimana i 6 schemi (squat, hinge, spinta e
   tirata orizzontale, spinta e tirata verticale) piu gli isolamenti per
   quadricipiti, femorali, bicipiti, tricipiti, deltoidi laterali, polpacci.
   ============================================================ */
/* Ogni schema e un'espressione sul nome: schemaDi la usa per dire a che schema appartiene un esercizio, e buildProgram
   ("schemi mancanti", PRG-21) per pescare un esercizio quando la settimana non ha quello schema.
   - B15: hip thrust e ponte glutei NON sono hinge: sono spinte d anca da supini, la schiena resta ferma. Prima contavano come
     hinge e una settimana col solo hip thrust sembrava avere gia la cerniera d anca (nessuno stacco veniva aggiunto). Limite
     noto: con la schiena dolente RISCHIO toglie ogni hinge vero e "schemi mancanti" non ripiega piu sulla spinta d anca (era
     l effetto di B15): il ripiego va scritto in buildProgram (ricette.js), non qui.
   - D-P11: il pullover coi manubri (bersaglio dorsali) e la RISERVA della tirata verticale: lo pesca il blocco "schemi mancanti"
     per ultimo, quando nessuna trazione ne lat machine e possibile (casa senza sbarra, palestra senza sbarra ne macchine). schemaDi
     pero non lo conta come tirata verticale (SCHEMI_RISERVA): se la contasse prenderebbe il posto della trazione e del lat anche
     in palestra, e strBilancia lo conterebbe come una tirata vera (collaudo EQ-01, PAT-01). */
const SCHEMI_MOV = [
  ['squat', /squat|leg press|affondi|step-up|pendulum/i, 'Squat'],
  ['hinge', /stacco|good morning|hyperextension/i, 'Hinge'],
  ['spintaO', /panca (piana|inclinata|declinata)|chest press|piegamenti|dip alle/i, 'Spinta orizzontale'],
  ['tirataO', /rematore|t-bar|pulley basso/i, 'Tirata orizzontale'],
  ['spintaV', /military|lento avanti|arnold|shoulder press|pike push/i, 'Spinta verticale'],
  ['tirataV', /trazioni|lat machine|pullover con manubrio/i, 'Tirata verticale']
];
const SCHEMI_RISERVA = /pullover con manubrio/i;
/* fuori dagli schemi: gli isolamenti col nome di un multiarticolare ("Calf Raise alla Leg Press",
   "Sissy Squat"); \balzate perche "Mani Rialzate" sono piegamenti, non alzate; le riserve (SCHEMI_RISERVA) */
function schemaDi(nome) { const n = senzaEmoji(nome); if (SCHEMI_RISERVA.test(n) || /curl|croci|french|estensione|\balzate|y-raise|kickback|calf raise|sissy/i.test(n)) return null; const x = SCHEMI_MOV.find(sc => sc[1].test(n)); return x ? x[0] : null; }
const ISOLAMENTI = [
  ['quadricipiti', /leg extension/i], ['femorali', /leg curl|nordic curl|stacco rumeno|good morning/i], ['bicipiti', /curl/i],
  ['tricipiti', /pushdown|french press|estensione tricipiti|kickback tricipiti|presa stretta|dip su panca/i],
  ['deltoidi', /alzate laterali/i], ['polpacci', /calf raise/i]
];
function isolamentoDi(nome) { const n = senzaEmoji(nome); const x = ISOLAMENTI.find(i => i[1].test(n)); return x ? x[0] : null; }
/* esercizi in allungamento con prove (Maeo 2021-2023): estensioni sopra la testa, leg curl seduto, curl su panca inclinata e
   Bayesiano (bicipite allungato: D-P8; Scott e Spider no), affondi col piede rialzato. Niente «da seduto» generico (P10):
   prendeva le croci ai cavi da seduto, che non hanno un allungamento provato */
const IN_ALLUNGAMENTO = /sopra la testa|leg curl seduto|curl su panca inclinata|bayesiano|piede rialzato/i;
/* RIC-03: schiena e glutei (Maeo 2021-2023, Pedrosa 2025): pullover coi manubri, affondi bulgari, stacco rumeno.
   Le croci coi manubri e ai cavi stanno alla pari (D-P8): niente +1,5 e niente scambio tra le due */
const IN_ALLUNGAMENTO_NUOVI = /pullover con manubrio|affondi bulgari|stacco rumeno/i;
/* nessuna coppia: Croci ai Cavi -> Croci su Panca Manubri e tolta da D-P8 (alla pari), Pullover ai Cavi -> Pullover con
   Manubrio da SEL-02 (prima del pullover dei dorsali la coppia passava dai dorsali al petto: cambiava muscolo) */
const SCAMBI_ALLUNGAMENTO_NUOVI = [];
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
