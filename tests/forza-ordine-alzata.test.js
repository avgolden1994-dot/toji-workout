/* INT-2f (revisione indipendente dell'onda 2e, MAGGIORE 3): nel powerlifting l'alzata del giorno e il primo esercizio della seduta.
   strOrdina (ABB-01, richiamata dopo forzaSedute da completaSettimana, strFinale, volume e tempo) metteva prima i multiarticolari con tipoCarico «pesante» e non conosceva `alzata`: con «panca-meta» o «panca-chiusura»
   circa 280 sedute su 960 programmi attivi aprivano con il Military Press o il Rematore con Bilanciere prima della Panca Presa Stretta (che tipoCarico dava come «macchina»), e senza punti deboli 74 programmi su 960 avevano una
   seduta con un altro multiarticolare prima dell alzata (il Military Press prima dello squat pesante: avanzato, 3 giorni, 30 minuti). Le prove sotto falliscono su e6ac7ad. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const a = caricaApp({ ora: LUNEDI });
const se = n => a.g('senzaEmoji')(n);

test('strOrdina: l alzata (e.alzata) sta in testa, nel suo ordine, prima di ogni altro multiarticolare; il resto come prima', () => {
  const nome = n => a.g('nomeInLibreria')(n);
  const lista = [{ name: nome('Military Press') }, { name: nome('Panca Presa Stretta'), alzata: 'panca', fisso: true }, { name: nome('Rematore con Bilanciere') }, { name: nome('Squat con Bilanciere'), alzata: 'squat', fisso: true }, { name: nome('Curl su Panca Scott') }];
  a.ctx.__l = a.g('JSON.parse(' + JSON.stringify(JSON.stringify(lista)) + ')');
  const ordinata = a.json('strOrdina(__l, "upper", []).map(e => senzaEmoji(e.name))');
  assert.deepStrictEqual(ordinata.slice(0, 2), ['Panca Presa Stretta', 'Squat con Bilanciere'], 'le alzate in testa, nel loro ordine: ' + ordinata.join(', '));
  assert.deepStrictEqual(ordinata.slice(2), ['Military Press', 'Rematore con Bilanciere', 'Curl su Panca Scott'], 'poi i multiarticolari pesanti e gli isolamenti, come prima');
  /* senza alzate l ordine e quello di sempre */
  const senza = [{ name: nome('Curl su Panca Scott') }, { name: nome('Panca Piana Bilanciere') }, { name: nome('Military Press') }];
  a.ctx.__s = a.g('JSON.parse(' + JSON.stringify(JSON.stringify(senza)) + ')');
  assert.deepStrictEqual(a.json('strOrdina(__s, "upper", []).map(e => senzaEmoji(e.name))'), ['Panca Piana Bilanciere', 'Military Press', 'Curl su Panca Scott']);
});

test('tipoCarico: la Panca Presa Stretta e un fondamentale pesante col bilanciere (classe A negli attributi), non «macchina»', () => {
  assert.strictEqual(a.json('tipoCarico(nomeInLibreria("Panca Presa Stretta"))'), 'pesante');
  assert.strictEqual(a.json('attributi(nomeInLibreria("Panca Presa Stretta")).classe'), 'A');
});

test('powerlifting: in ogni seduta con un alzata, la prima e l alzata del giorno (matrice di profili e punti deboli)', () => {
  const PUNTI = [[], ['panca-meta'], ['panca-chiusura'], ['squat-buca'], ['stacco-terra'], ['panca-meta', 'squat-uscita']];
  const out = a.json('(function () { const o = []; ' +
    'const PUNTI = ' + JSON.stringify(PUNTI) + ';' +
    '["intermedio", "avanzato"].forEach(level => [3, 4, 5].forEach(days => [30, 60, 90].forEach(minutes => PUNTI.forEach((pd, k) => {' +
    'const d = { goals: ["forza"], goal: "forza", level: level, days: days, minutes: minutes, luogo: "palestra", fastidi: [], sex: k % 2 ? "F" : "M", age: 30, sonno: "bene", attrezzi: "indifferente", usaProfilo: false, freq: "auto", parq: "no", forzaTipo: "powerlifting", puntiDeboli: pd, seme: "alz" + level + days + minutes + k };' +
    'const prog = buildProgram(d); const attiva = prog.sedute.some(s => s.esercizi.some(e => e.alzata));' +
    'o.push({ id: [level, days, minutes, pd.join("+") || "-"].join("|"), attiva: attiva, ko: prog.sedute.filter(s => s.esercizi.some(e => e.alzata) && !s.esercizi[0].alzata).map(s => senzaEmoji(s.esercizi[0].name) + " prima di " + senzaEmoji(s.esercizi.find(e => e.alzata).name)) }); })))); return o; })()');
  assert.strictEqual(out.length, 108);
  const attivi = out.filter(x => x.attiva);
  assert.ok(attivi.length >= 100, 'quasi tutti hanno la modalita Forza: ' + attivi.length);
  const ko = attivi.filter(x => x.ko.length).map(x => x.id + ': ' + x.ko.join(', '));
  assert.deepStrictEqual(ko, [], 'sedute in cui un altro esercizio precede l alzata del giorno');
});
