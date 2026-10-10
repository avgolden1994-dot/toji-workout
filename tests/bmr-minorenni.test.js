/* Il metabolismo basale in kcal (bmr, la misura della BIA inserita dall utente) non si mostra ai minorenni nel risultato dell onboarding
   (onboarding-risultato.js, ETA-04: decisione del proprietario, D-P26). Gli adulti (18 anni e piu) lo vedono come prima.
   Non si cancella il dato salvato e non si cambia analyzeBia: cambia solo ciò che la schermata mostra. Vale anche con il coach spento:
   un minorenne non vede le kcal in nessun caso.
   Esegue il codice vero dell app in node (vm), senza browser. Lancio: npm test
   Le prove devono FALLIRE sul codice di prima (il bmr compare anche ai 15enni) e passare dopo la correzione. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const BMR = 1650;
const BIA = { peso: 70, altezza: 175, fmPerc: 20, ffm: 56, bmr: BMR };
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', parq: 'no', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false };

/* il risultato dell onboarding (renderOnbResult, HTML) per una persona di questa eta, con una BIA che ha il bmr */
function risultato(eta, opzioni) {
  const app = caricaApp(Object.assign({ ora: ORA }, opzioni || {}));
  app.ctx.__d = JSON.parse(JSON.stringify(Object.assign({}, BASE, { age: eta, bia: BIA })));
  const html = app.g('(function(){ onbData = __d; return renderOnbResult(); })()');
  return { app, html };
}

const MOSTRA_BMR = /Metabolismo basale<\/span><b>1650 kcal<\/b>/;

test('ETA-04: il minorenne (13, 15, 17 anni) non vede il metabolismo basale in kcal nel risultato dell onboarding', () => {
  [13, 15, 17].forEach(eta => {
    const { html } = risultato(eta);
    assert.ok(!/Metabolismo basale/.test(html), eta + ' anni: l etichetta del metabolismo basale non deve comparire');
    assert.ok(html.indexOf(String(BMR)) === -1, eta + ' anni: il valore ' + BMR + ' kcal non deve comparire');
    /* si toglie solo il metabolismo: il resto della composizione (BMI) resta */
    assert.ok(/<span>BMI<\/span>/.test(html), eta + ' anni: il BMI della BIA resta visibile');
  });
});

test('ETA-04: adulti (18, 30, 64 anni) vedono il metabolismo basale come prima', () => {
  [18, 30, 64].forEach(eta => {
    const { html } = risultato(eta);
    assert.ok(MOSTRA_BMR.test(html), eta + ' anni: deve comparire «Metabolismo basale ' + BMR + ' kcal»');
  });
});

test('ETA-04: il limite e 18 anni (17 nascosto, 18 mostrato)', () => {
  assert.ok(!/Metabolismo basale/.test(risultato(17).html), '17 anni: nascosto');
  assert.ok(MOSTRA_BMR.test(risultato(18).html), '18 anni: mostrato');
});

test('ETA-04: con il coach spento il minorenne non vede le kcal; l adulto le vede come sempre', () => {
  const minore = risultato(15, { consenso: false });
  assert.ok(!/Metabolismo basale/.test(minore.html) && minore.html.indexOf(String(BMR)) === -1, 'coach spento, 15 anni: nessuna kcal del metabolismo');
  const adulto = risultato(30, { consenso: false });
  assert.ok(MOSTRA_BMR.test(adulto.html), 'coach spento, 30 anni: il metabolismo resta come prima');
});

test('ETA-04: il dato salvato e analyzeBia restano com erano: cambia solo ciò che la schermata mostra', () => {
  const { app } = risultato(15);
  assert.strictEqual(app.g('onbData.bia.bmr'), BMR, 'la BIA di onbData conserva il bmr');
  assert.strictEqual(app.json('analyzeBia(onbData.bia, onbData.sex).bmr'), BMR, 'analyzeBia riporta ancora il bmr');
});
