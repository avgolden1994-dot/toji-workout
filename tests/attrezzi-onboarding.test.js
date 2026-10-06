/* INT-2f (revisione indipendente dell'onda 2e, MAGGIORE 1): la domanda sugli attrezzi in onboarding e in Opzioni.
   In palestra i quattro attrezzi principali partono tutti accesi (palestra completa) e il tocco li TOGLIE, ma il testo diceva «Tocca quello che trovi»: chi toccava Bilanciere, Manubri e Sbarra (quello che trova)
   dichiarava gli attrezzi opposti (`attrezziPalestra = ["macchine"]`). La riga «Altro, se c e» ha chip spenti che il tocco ACCENDE: due righe con significati opposti sotto la stessa frase.
   Inoltre «nessuno di questi» (palestra) e «solo i manubri» (casa, senza la panca) non avevano un tocco proprio: il caso `[]` si raggiungeva solo toccando e ritoccando un chip.
   Le prove sotto falliscono su b9b7860. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const onb = (a, extra) => a.g('onbData = Object.assign(nuovoOnbData(), ' + JSON.stringify(Object.assign({ goals: ['massa'], goal: 'massa', level: 'intermedio', days: 4, minutes: 60, sex: 'uomo', age: 30 }, extra || {})) + ')');
const gruppi = html => (html.match(/<div class="aw-groups">[\s\S]*?<\/div>/g) || []);
const chips = g => (g.match(/<button class="aw-group[^"]*"[^>]*>[^<]*<\/button>/g) || []).map(b => ({ on: /aw-group on/.test(b), testo: b.replace(/<[^>]+>/g, ''), onclick: (b.match(/onclick="([^"]+)"/) || [])[1] }));

test('CAS-01 (palestra): il testo dice cio che fa il tocco: i quattro attrezzi partono accesi e il tocco toglie quello che non si trova', () => {
  const a = caricaApp({ ora: LUNEDI });
  onb(a, { luogo: 'palestra' });
  const html = a.g('htmlAttrezziOnboarding()');
  const [principali] = gruppi(html).map(chips);
  assert.deepStrictEqual(principali.map(c => c.on), [true, true, true, true], 'senza risposta la palestra e completa: tutto acceso');
  assert.ok(/Togli quello che non trovi/.test(html), 'il testo dice di TOGLIERE: ' + html.slice(0, 400));
  assert.ok(!/Tocca quello che trovi \(facoltativo\)/.test(html), 'non dice piu «Tocca quello che trovi» sopra chip tutti accesi');
  /* chi toglie quello che non trova (la sbarra) ottiene gli altri tre; chi li tocca tutti e tre (bilanciere, manubri, sbarra) non puo piu credere di averli «dichiarati» */
  a.g('onbToggleAttrezzoPalestra("sbarra")');
  assert.deepStrictEqual(a.json('onbData.attrezziPalestra'), ['bilanciere', 'manubri', 'macchine']);
  a.g('onbToggleAttrezzoPalestra("sbarra")');
  assert.strictEqual(a.json('onbData.attrezziPalestra'), null, 'rimessa la sbarra: di nuovo palestra completa (nessun elenco)');
  /* la riga degli altri attrezzi ha un altra frase, che dice il contrario (tocca = aggiunge) */
  assert.ok(/Altro, se c’è: tocca quello che trovi/.test(html), 'la riga «Altro» dice di toccare quello che c e');
});

test('CAS-01 (palestra): «Nessuno di questi» e un tocco che dichiara che di elastici, kettlebell e anelli non c e niente; un altro tocco lo toglie; un attrezzo toccato lo disattiva', () => {
  const a = caricaApp({ ora: LUNEDI });
  onb(a, { luogo: 'palestra' });
  const extra = () => gruppi(a.g('htmlAttrezziOnboarding()')).map(chips)[1];
  assert.deepStrictEqual(extra().map(c => c.testo), ['Elastici', 'Kettlebell', 'Anelli', 'Nessuno di questi']);
  assert.deepStrictEqual(extra().map(c => c.on), [false, false, false, false], 'senza risposta niente e acceso');
  a.g('onbNessunoExtraPalestra()');
  assert.deepStrictEqual(a.json('onbData.extraPalestra'), [], 'dichiarato: niente di tutto questo');
  assert.deepStrictEqual(extra().map(c => c.on), [false, false, false, true], '«Nessuno di questi» acceso');
  a.g('onbToggleExtraPalestra("kettlebell")');
  assert.deepStrictEqual(a.json('onbData.extraPalestra'), ['kettlebell']);
  assert.deepStrictEqual(extra().map(c => c.on), [false, true, false, false], 'toccato il kettlebell, «Nessuno di questi» si spegne');
  a.g('onbNessunoExtraPalestra()');
  assert.deepStrictEqual(a.json('onbData.extraPalestra'), [], 'il tocco su «Nessuno di questi» azzera l elenco');
  a.g('onbNessunoExtraPalestra()');
  assert.strictEqual(a.json('onbData.extraPalestra'), null, 'un secondo tocco toglie la risposta: come chi non risponde');
});

test('CAS-01 (casa con i manubri): «Solo i manubri» dichiara che non c e altro (niente panca); a corpo libero «Nessuno di questi»; senza risposta il testo dice cosa si conta', () => {
  const a = caricaApp({ ora: LUNEDI });
  onb(a, { luogo: 'manubri' });
  const casa = () => gruppi(a.g('htmlAttrezziOnboarding()')).map(chips)[0];
  assert.deepStrictEqual(casa().map(c => c.testo), ['Sbarra', 'Panca', 'Elastici', 'Kettlebell', 'Anelli', 'Solo i manubri']);
  assert.ok(/penso ai manubri e a una panca/.test(a.g('htmlAttrezziOnboarding()')), 'senza risposta il testo dice che la panca e contata (e come la luogo «manubri e una panca» di prima)');
  a.g('onbNessunoAttrezzoCasa()');
  assert.deepStrictEqual(a.json('onbData.attrezziCasa'), [], 'dichiarato: solo i manubri');
  assert.strictEqual(casa()[5].on, true);
  a.g('onbToggleAttrezzoCasa("panca")');
  assert.deepStrictEqual(a.json('onbData.attrezziCasa'), ['panca']);
  assert.strictEqual(casa()[5].on, false, 'toccata la panca, «Solo i manubri» si spegne');
  a.g('onbNessunoAttrezzoCasa(); onbNessunoAttrezzoCasa()');
  assert.strictEqual(a.json('onbData.attrezziCasa'), null, 'un secondo tocco toglie la risposta');
  /* a corpo libero la frase e un altra */
  onb(a, { luogo: 'corpo' });
  assert.strictEqual(casa()[5].testo, 'Nessuno di questi');
});

test('CAS-01: la risposta «solo i manubri» arriva al programma: niente esercizio che chiede una panca (la panca non c e), e «nessuno di questi» in palestra toglie elastici, kettlebell e anelli', () => {
  const a = caricaApp({ ora: LUNEDI });
  const nomi = d => a.json('(function () { const p = buildProgram(Object.assign(nuovoOnbData(), ' + JSON.stringify(d) + ')); return [].concat.apply([], p.sedute.map(s => s.esercizi.map(e => senzaEmoji(e.name)))); })()');
  const base = { goals: ['massa'], goal: 'massa', level: 'intermedio', days: 4, minutes: 60, sex: 'donna', age: 30, sonno: 'bene', attrezzi: 'indifferente', fastidi: [], parq: 'no', freq: 'auto', seme: 'int2f' };
  const BANCO = /Panca (Piana|Inclinata) Manubri|Croci su Panca|Curl su Panca|Dip su Panca|Hip Thrust con Manubrio|Rematore con Petto Appoggiato|Seal Row|Spider Curl|Y-Raise su Panca/;
  const senza = nomi(Object.assign({}, base, { luogo: 'manubri', attrezziCasa: [] }));
  assert.deepStrictEqual(senza.filter(n => BANCO.test(n)), [], 'con «solo i manubri» nessun esercizio da panca: ' + senza.join(', '));
  const pal = nomi(Object.assign({}, base, { luogo: 'palestra', extraPalestra: [] }));
  assert.deepStrictEqual(pal.filter(n => /Elastico|Kettlebell|Anelli/i.test(n)), [], 'con «nessuno di questi» niente elastici, kettlebell e anelli');
});

test('CAS-01 (Opzioni › Il coach): lo stesso «Nessuno di questi» in palestra e «Solo i manubri» a casa; il tocco scrive il profilo, un secondo lo toglie', () => {
  const a = caricaApp({ ora: LUNEDI });
  a.profilo({ goals: ['massa'], goal: 'massa', level: 'intermedio', age: 30, luogo: 'palestra' });
  assert.ok(/Togli quello che non trovi/.test(a.g('htmlAttrezziCoach(getProfile())')), 'in palestra i chip partono accesi: il testo dice di togliere');
  assert.ok(/Nessuno di questi/.test(a.g('htmlAttrezziCoach(getProfile())')));
  a.g('setNessunoCoach("extraPalestra")');
  assert.deepStrictEqual(a.leggi(a.chiave('PROFILE_KEY')).extraPalestra, []);
  a.g('setNessunoCoach("extraPalestra")');
  assert.ok(!('extraPalestra' in a.leggi(a.chiave('PROFILE_KEY'))), 'il secondo tocco toglie la risposta');
  a.profilo({ goals: ['massa'], goal: 'massa', level: 'intermedio', age: 30, luogo: 'manubri' });
  assert.ok(/Solo i manubri/.test(a.g('htmlAttrezziCoach(getProfile())')));
  a.g('setNessunoCoach("attrezziCasa")');
  assert.deepStrictEqual(a.leggi(a.chiave('PROFILE_KEY')).attrezziCasa, []);
});
