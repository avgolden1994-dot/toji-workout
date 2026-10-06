/* Aiuto per le prove che dipendono dalle soglie della scelta degli esercizi (W2-T6): carica js/coach/programma/soglie-selezione.js se index.html non lo cita ancora (prima dell integrazione INT lo aggiunge la riga
   `script` di docs/in-arrivo/W2-T6.json; dopo, `typeof SOGLIE_SELEZIONE` c e e la funzione non fa niente). Stesso metodo di tests/aiuto-mesociclo.js.
   Non e un test (non finisce in `npm test`): `const { conSoglieSelezione } = require('./aiuto-selezione');` */
'use strict';
const fs = require('fs'), path = require('path');
const FILE_SOGLIE = path.join(__dirname, '..', 'js', 'coach', 'programma', 'soglie-selezione.js');

function conSoglieSelezione(app) {
  if (app.g('typeof SOGLIE_SELEZIONE') === 'undefined') app.g(fs.readFileSync(FILE_SOGLIE, 'utf8'));
  return app;
}
module.exports = { conSoglieSelezione, FILE_SOGLIE };
