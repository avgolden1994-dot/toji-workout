/* Aiuto per le prove del mesociclo (piano coach v2, W2-T4): le soglie della struttura (js/coach/programma/soglie-struttura.js) entrano in index.html con
   l integrazione dell onda (docs/in-arrivo/w2-t4.json). Prima di allora, e dopo, una prova che parla del piano v2 le carica da sola se mancano:
   cosi passa con e senza la riga <script>. `senzaSoglie` simula l app senza quel file (il generatore ricade sulle regole della v1, senza piano).
   Non e un test (non finisce in `npm test`): `const { conSoglieStruttura, senzaSoglie } = require('./aiuto-mesociclo');` */
'use strict';
const fs = require('fs'), path = require('path');

const FILE_SOGLIE = path.join(__dirname, '..', 'js', 'coach', 'programma', 'soglie-struttura.js');

/* carica le soglie nell app se non ci sono gia (index.html le carica dopo l integrazione) */
function conSoglieStruttura(app) {
  if (app.g('typeof SOGLIE_STRUTTURA') === 'undefined') app.g(fs.readFileSync(FILE_SOGLIE, 'utf8'));
  return app;
}
/* l app come se soglie-struttura.js non ci fosse: sogliaStruttura non trova niente, pianoAttivo() e falso */
function senzaSoglie(app) {
  app.g('sogliaStruttura = function () { return undefined; }');
  return app;
}
module.exports = { conSoglieStruttura, senzaSoglie, FILE_SOGLIE };
