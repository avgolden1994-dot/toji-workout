/* m5 della revisione dell onda 4 (onda 5): la gravidanza detta nel questionario accende la bandiera «Gravidanza o parto recente» (REC-12 parte a), e con il PAR-Q positivo niente creatina (NUT-01).
   Prima: la bandiera si accendeva solo in Opzioni › Il coach; chi rispondeva «sì» al PAR-Q per una gravidanza aveva la modalità prudente in seduta ma creatina «sicura ed efficace»,
   grammi di proteine e kcal nel corpo (prove rosse su coach-v2-onda-4-bis). Prove in node con l app vera in vm (tests/aiuto-app.js): onbData come lo lascia il questionario, poi applyGeneratedProgram. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const RISPOSTE = { goals: ['salute'], goal: 'salute', level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', sonno: 'bene', attrezzi: 'indifferente', sex: 'donna', age: 31, parq: 'si', freq: 'auto', fastidi: [], weight: 62, height: 168 };
function crea(a, extra) {
  a.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(Object.assign({}, RISPOSTE, extra || {})) + ')');
  try { a.g('applyGeneratedProgram()'); } catch (e) { /* le schermate (DOM finto) possono lamentarsi DOPO aver scritto profilo e programma: contano i dati salvati */ }
  return a.leggi(a.chiave('PROFILE_KEY'));
}
const NUMERI = /\bg al giorno|kcal|[Cc]reatina|mila al giorno|% a settimana|g per kg/;

test('questionario: PAR-Q «sì» e «È per una gravidanza o un parto recente?» = sì accendono la bandiera (profilo.gravidanza) e la modalità prudente', () => {
  const a = caricaApp({ ora: LUNEDI });
  const p = crea(a, { gravidanza: 'si' });
  assert.strictEqual(p.gravidanza, true, 'prima: la bandiera non si accendeva dal questionario');
  assert.strictEqual(p.parq, true);
  assert.ok(!p.parqDaGravidanza, 'nel questionario non si sa se il PAR-Q ha altre ragioni: spenta la bandiera il PAR-Q resta «sì»');
  assert.strictEqual(a.json('inGravidanza(getProfile())'), true);
  const corpo = a.json('corpoCoach()');
  assert.ok(corpo.length && !corpo.some(t => NUMERI.test(t)), 'nessun numero di cibo o integratori: ' + JSON.stringify(corpo));
  const primo = a.json('loadData()')[a.giorniAllenamento()[0]][0].name;
  assert.ok(a.json('rirBersaglio(' + JSON.stringify(primo) + ')')[0] >= 3, 'RIR ≥ 3 in gravidanza');
});

test('questionario: PAR-Q «sì» con «No» (altre ragioni): modalità prudente, nessuna bandiera, niente creatina (guardia NUT-01), proteine e kcal come prima per un adulto', () => {
  const a = caricaApp({ ora: LUNEDI });
  const p = crea(a, { gravidanza: 'no' });
  assert.strictEqual(p.parq, true);
  assert.ok(!p.gravidanza);
  const corpo = a.json('corpoCoach()');
  assert.ok(!corpo.some(t => /[Cc]reatina/.test(t)), 'prima: «Creatina 3-5 g al giorno: sicura ed efficace» anche con il PAR-Q positivo: ' + JSON.stringify(corpo));
  assert.ok(corpo.some(t => /Proteine/.test(t)), 'le proteine restano a un adulto con il PAR-Q positivo (informazione, non prescrizione)');
});

test('questionario: PAR-Q «no»: nessuna domanda sulla gravidanza (la risposta non conta), profilo come prima e la creatina resta', () => {
  const a = caricaApp({ ora: LUNEDI });
  assert.strictEqual(a.g("(onbData = Object.assign(nuovoOnbData(), { parq: 'no' }), htmlDomandaGravidanzaOnb())"), '', 'con il PAR-Q «no» la domanda non si mostra');
  assert.ok(/È per una gravidanza o un parto recente\?/.test(a.g("(onbData.parq = 'si', htmlDomandaGravidanzaOnb())")), 'con il PAR-Q «sì» la domanda si mostra');
  const p = crea(a, { parq: 'no', gravidanza: 'si' });
  assert.strictEqual(p.parq, false);
  assert.ok(!p.gravidanza, 'senza il PAR-Q «sì» la risposta sulla gravidanza non vale: la bandiera resta spenta');
  assert.ok(a.json('corpoCoach()').some(t => /[Cc]reatina/.test(t)), 'un adulto senza PAR-Q ha la creatina come prima');
});

test('questionario rifatto: la bandiera già accesa resta (B1) e il questionario NON rifà la domanda: dice che si toglie solo in Opzioni (A2 della revisione finale)', () => {
  const a = caricaApp({ ora: LUNEDI });
  crea(a, { gravidanza: 'si' });
  /* A2: prima la domanda tornava precompilata a «sì», ma rispondere «No» non spegneva niente (la bandiera resta per gravidanzaDaRiportare): ora non c e domanda */
  assert.strictEqual(a.json('nuovoOnbData().gravidanza'), null, 'nessuna risposta precompilata');
  ['si', 'no'].forEach(parq => {
    const html = a.g("(onbData = Object.assign(nuovoOnbData(), { parq: '" + parq + "' }), htmlDomandaGravidanzaOnb())");
    assert.ok(!/È per una gravidanza o un parto recente\?/.test(html), 'PAR-Q «' + parq + '»: niente domanda con la bandiera accesa: ' + html);
    assert.ok(/Hai già segnato «Gravidanza o parto recente»/.test(html) && /solo in Opzioni › Il coach/.test(html), 'PAR-Q «' + parq + '»: la riga che dice dove si toglie: ' + html);
  });
  const p = crea(a, { gravidanza: 'no', parq: 'no' });
  assert.strictEqual(p.gravidanza, true, 'la bandiera si toglie solo in Opzioni › Il coach');
  assert.strictEqual(p.parq, true);
  /* spenta la bandiera (Opzioni) la domanda torna a comparire con il PAR-Q «sì» */
  a.g('(() => { const p = getProfile(); setGravidanzaCoach(p, false); localStorage.setItem(PROFILE_KEY(), JSON.stringify(p)); })()');
  assert.ok(/È per una gravidanza o un parto recente\?/.test(a.g("(onbData = Object.assign(nuovoOnbData(), { parq: 'si' }), htmlDomandaGravidanzaOnb())")), 'senza la bandiera la domanda c e');
});
