/* INT-2e, ABB-03 e il taglio per il tempo (volume/tempo.js, scalaDelTempo): un esercizio protetto che copre da solo un buco della settimana non lascia il posto nemmeno nell ultima risorsa (DUR-01).
   Trovato da tests/browser/coerenza-schede.js (1 profilo su 735: avanzato, 4 giorni, massa + forza, 45 minuti, palestra, nel browser e non in node: l ordine dei pari merito tra due motori e diverso) dopo la correzione di ABB-04 di INT-2e:
   due tricipiti in due sedute, uno non protetto e uno protetto (strCopri); il taglio normale toglieva il primo, l ultima risorsa toglieva anche il secondo e la settimana restava senza tricipiti diretti.
   La prova parte dalle sedute DOPO limitaVolume come le ha il browser (la fotografia dello stadio) e chiede ad adattaAlTempo il suo lavoro: indipendente dall ordine dei pari merito dello stadio che sceglie gli esercizi. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const D = { level: 'avanzato', days: 4, goals: ['massa', 'forza'], luogo: 'palestra', minutes: 45, sex: 'M', age: 30, seme: 'audit', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };
const SEDUTE = [
  ['Lunedì', 'upper', [['Panca Piana Bilanciere', 5, 'F'], ['Trazioni alla Sbarra (Pull-ups)', 4], ['Shoulder Press Machine', 4], ['Rematore con Petto Appoggiato', 4], ['Curl su Panca Inclinata', 4, 'P'], ['Estensione Tricipiti sopra la Testa ai Cavi', 3], ['Reverse Pec Deck', 2, 'P']]],
  ['Martedì', 'lower', [['Squat con Bilanciere', 5, 'F'], ['Stacco Rumeno', 4], ['Affondi Bulgari', 3], ['Leg Curl Seduto', 4], ['Calf Raise in Piedi', 4], ['Pallof Press', 2, 'P']]],
  ['Giovedì', 'upper', [['Rematore con Bilanciere', 5, 'F'], ['Military Press', 4], ['Panca Piana Manubri', 4], ['Trazioni Assistite (Macchina)', 4], ['Alzate Laterali ai Cavi', 4], ['Estensione Tricipiti sopra la Testa con Manubrio', 4, 'P']]],
  ['Venerdì', 'lower', [['Pull-Through ai Cavi', 3], ['Hack Squat', 5], ['Leg Curl con Asciugamano', 3], ['Calf Raise alla Leg Press', 6, 'P'], ['Crunch al Cavo', 2]]]
];

function esegui(a) {
  return a.json('(function () { const d = ' + JSON.stringify(D) + ', brief = briefCoach(d, {}); brief.sicurezza.vincoli = vincoliSicurezza(brief); risolviMetodo(brief); const L = brief.lavoro; L.prefs = prefsDelBrief(brief);' +
    'const spec = specialitaStruttura(brief); pianoMesociclo(brief); let split = (spec && spec.split) || scegliSplit(brief); L.split = split; L.nEs = numeroEsercizi(brief); giorniSettimana(brief, split);' +
    'const sedute = ' + JSON.stringify(SEDUTE) + '.map(([giorno, tipo, es]) => ({ giorno: giorno, tipo: tipo, titolo: tipo, esercizi: es.map(([n, sets, f]) => { const nome = nomeInLibreria(n), m = findExercise(nome) || {}; return Object.assign({ name: nome, sets: sets, reps: m.reps || 10, weight: m.weight || 0, rest: m.rest || 75 }, f === "F" ? { fisso: true } : {}, f === "P" ? { protetto: true } : {}); }) }));' +
    'memoriaApri(); try { adattaAlTempo(brief, sedute); } finally { memoriaChiudi(); }' +
    'return sedute.map(sd => sd.esercizi.map(e => senzaEmoji(e.name))); })()');
}

test('ABB-03: il taglio per il tempo non toglie l unico tricipite diretto della settimana, anche se e protetto e l ultima risorsa lo cerca', () => {
  const a = caricaApp({ ora: LUNEDI });
  const dopo = esegui(a);
  const tutti = [].concat.apply([], dopo);
  const tricipiti = tutti.filter(n => /Estensione Tricipiti/.test(n));
  assert.ok(tricipiti.length >= 1, 'almeno un tricipite diretto resta nella settimana: ' + JSON.stringify(dopo));
  /* gli altri buchi della settimana restano coperti come prima: polpacci, deltoidi posteriori, bicipiti, core */
  assert.ok(tutti.some(n => /Calf Raise/.test(n)) && tutti.some(n => /Reverse Pec Deck|Face Pull|Alzate Posteriori|Y-Raise/.test(n)) && tutti.some(n => /Curl/.test(n)) && tutti.some(n => /Pallof|Crunch|Plank|Dead Bug/.test(n)), JSON.stringify(dopo));
});
