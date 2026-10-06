/* Il piano si esegue in seduta (P3-B, piano coach v2 W3-T4, versione snella: MES-03 in seduta, solo programmi con prog.versione 2).
   Prima di P3-B il piano del mesociclo (prog.piano) si leggeva in seduta solo per il RIR e le tecniche: il fattore di volume della rampa (w.volume) e le serie del
   principiante (w.serie) nessuna funzione le leggeva, e la seduta aveva sempre le serie del picco. Ora la fase 'carico' ordine 40 (js/coach/volume/rampa-settimana.js)
   porta le serie della seduta a quelle della settimana: intermedio 0,75 · 0,85 · 0,95 · 1 · 1, avanzato 0,70 · 0,80 · 0,90 · 1 · 1, principiante 2/2, 3/2, 3/3 (primi tre esercizi / altri),
   mai meno di 2 serie per esercizio e mai sopra il picco; i programmi della v1 (senza piano) e i prudenti (nessuna rampa) restano com erano.
   Cio che questa prova NON dice: «volume autoregolato» (PCO-03: qui il piano si esegue, non si autoregola), il +1 ai prioritari dell avanzato (w.prioritari: resta RIC-01), e il collaudo
   (VOL-01/VOL-02 misurano la settimana piena, cioe il picco: non descrivono la settimana 1).
   Ogni prova e scritta per fallire sul codice di coach-v2-onda-2g (senza rampa-settimana.js). Prove in node con l app vera in vm (tests/aiuto-app.js, orologio finto). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const H = require('./aiuto-atleta-piano');

const FB = srpe => ({ srpe: srpe, arrivo: 'normale', carichi: 'giusti', dolore: false, zone: [], livello: 0, esercizi: [] });
const LIVELLI = ['principiante', 'intermedio', 'avanzato'];
const OBIETTIVI = ['massa', 'forza', 'dimagrimento', 'salute'];
const COMBINAZIONI = [];
LIVELLI.forEach(l => OBIETTIVI.forEach(o => COMBINAZIONI.push({ nome: l + ' · ' + o, d: { level: l, goals: [o] } })));
COMBINAZIONI.push({ nome: 'principiante prudente (PAR-Q positivo)', d: { level: 'principiante', goals: ['massa'], parq: 'si' } });

/* chi si e gia allenato con questi esercizi: la «prima volta» di INT-04 (una serie in meno alla prima esposizione) non e della rampa, e dopo 14 giorni senza sedute RIC-05 (rientro)
   toglie un quarto delle serie: una seduta di tre giorni prima del lunedi della settimana `n`, con tutti gli esercizi del piano (e `extra`) */
function conStoriaDiPrima(a, n, extra) {
  const nomi = (extra || []).slice();
  a.json('DAYS').forEach(g => (a.json('loadData()')[g] || []).forEach(e => { if (nomi.indexOf(e.name) === -1) nomi.push(e.name); }));
  const t = new Date(2026, 9, 5 + 7 * ((n || 1) - 1) - 3, 12, 0, 0).getTime();
  a.storia([{ id: t, day: 'Venerdì', date: '02/10/2026', minuti: 50, prontezza: 80, exercises: [], feedback: FB(6),
    sessione: nomi.map(nome => ({ name: nome, rest: 90, sets: [1, 2, 3].map(() => ({ weight: 20, reps: 10, done: true, wasBerserk: false, rpe: 8 })) })) }]);
}
/* l orologio sul lunedi della settimana n, con la seduta di tre giorni prima */
function vai(a, n, extra) { H.vaiA(a, n, 0); conStoriaDiPrima(a, n, extra); }
/* le serie attese dal piano per l esercizio in posizione `pos` della seduta: la stessa formula della nota (ricerca-mesocicli §3.3, ricerca-principianti §3.2), scritta qui a parte */
function attese(w, setsBase, pos) {
  if (setsBase <= 2) return setsBase;                                  /* nessuna rampa se il picco e 2 o meno */
  if (w.serie && w.volume < 1) return Math.min(setsBase, Math.max(2, w.serie[pos < 3 ? 'multi' : 'altri']));
  return Math.min(setsBase, Math.max(2, Math.round(setsBase * w.volume)));
}

/* ============ le serie in seduta sono quelle del piano, settimana per settimana ============ */

COMBINAZIONI.forEach(c => {
  test('serie in seduta = piano, settimana per settimana, mai meno di 2: ' + c.nome, () => {
    const { a, p } = H.telefono({ d: c.d });
    assert.strictEqual(p.versione, 2);
    const giorni = H.giorniDiAllenamento(a);
    let confrontati = 0, ridotti = 0;
    for (let n = 1; n <= p.settimane; n++) {
      const w = p.piano.settimane[n - 1];
      if (w.fase !== 'carico') continue;                               /* lo scarico e la verifica: tests/scarichi.test.js */
      vai(a, n);
      giorni.forEach(g => {
        const voci = H.apriGiorno(a, g);
        voci.forEach((e, pos) => {
          const prev = attese(w, e.setsBase, pos);
          assert.strictEqual(e.sets, prev, c.nome + ' settimana ' + n + ' ' + g + ' ' + e.name + ': picco ' + e.setsBase + ', piano ' + prev + ', in seduta ' + e.sets);
          if (e.setsBase >= 2) assert.ok(e.sets >= 2, 'mai meno di 2 serie: ' + e.name);
          assert.ok(e.sets <= e.setsBase, 'mai sopra il picco');
          confrontati++; if (e.sets < e.setsBase) ridotti++;
        });
      });
    }
    assert.ok(confrontati > 0);
    if (c.d.parq === 'si') assert.strictEqual(ridotti, 0, 'il prudente non ha rampa: ' + ridotti + ' voci ridotte');
    else assert.ok(ridotti > 0, 'la rampa ha ridotto almeno qualche serie nelle prime settimane');
  });
});

test('la rampa dell intermedio e quella della nota: picco 3, 4, 5 e 6 serie nelle cinque settimane del blocco', () => {
  /* docs/ricerca-mesocicli-periodizzazione-scarichi.md 3.3: intermedio 0,75 · 0,85 · 0,95 · 1 · 1; picco 3 -> 2·3·3·3·3, 4 -> 3·3·4·4·4, 5 -> 4·4·5·5·5, 6 -> 5·5·6·6·6 */
  const NOTA = { 3: [2, 3, 3, 3, 3], 4: [3, 3, 4, 4, 4], 5: [4, 4, 5, 5, 5], 6: [5, 5, 6, 6, 6] };
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  Object.keys(NOTA).forEach(picco => {
    const sets = [1, 2, 3, 4, 5].map(n => { vai(a, n, ['🦵 Leg Press']); return a.json('caricoProssimo("🦵 Leg Press", 100, 10, ' + picco + ').sets'); });
    assert.deepStrictEqual(sets, NOTA[picco], 'picco ' + picco);
  });
});

test('la rampa dell avanzato e quella della nota: picco 3, 4, 5 e 6 serie (0,70 · 0,80 · 0,90 · 1 · 1)', () => {
  const NOTA = { 3: [2, 2, 3, 3, 3], 4: [3, 3, 4, 4, 4], 5: [4, 4, 5, 5, 5], 6: [4, 5, 5, 6, 6] };
  const { a } = H.telefono({ d: { level: 'avanzato' } });
  Object.keys(NOTA).forEach(picco => {
    const sets = [1, 2, 3, 4, 5].map(n => { vai(a, n, ['🦵 Leg Press']); return a.json('caricoProssimo("🦵 Leg Press", 100, 10, ' + picco + ').sets'); });
    assert.deepStrictEqual(sets, NOTA[picco], 'picco ' + picco);
  });
});

test('il principiante: 2/2 nelle settimane 1-2, 3 sui primi tre esercizi e 2 sugli altri nelle 3-4, 3 su tutti dalla 5a; un picco di 2 serie non si tocca', () => {
  const { a, p } = H.telefono({ d: { level: 'principiante' } });
  const g = H.giorniDiAllenamento(a)[0];
  const per = n => { vai(a, n); return H.apriGiorno(a, g); };
  const w1 = per(1), w3 = per(3), w5 = per(5);
  const picco = w5.map(e => e.setsBase);
  assert.ok(picco.some(x => x === 3) && picco.some(x => x === 2), 'il programma ha esercizi da 3 e da 2 serie: ' + picco);
  w1.forEach(e => assert.strictEqual(e.sets, Math.min(e.setsBase, 2), 'settimana 1: ' + e.name));
  w3.forEach((e, i) => assert.strictEqual(e.sets, Math.min(e.setsBase, i < 3 ? 3 : 2), 'settimana 3, posizione ' + i + ': ' + e.name));
  w5.forEach(e => assert.strictEqual(e.sets, e.setsBase, 'settimana 5: serie del picco, ' + e.name));
  assert.deepStrictEqual(p.piano.settimane.slice(0, 5).map(w => w.volume), [0.7, 0.7, 0.85, 0.85, 1]);
});

/* ============ chi non deve cambiare non cambia ============ */

test('un programma v1 (senza piano) non cambia in nessuna settimana: le serie sono quelle del picco, come prima', () => {
  const { a, p } = H.telefono({ v1: true, d: { level: 'intermedio' } });
  const giorni = H.giorniDiAllenamento(a);
  for (let n = 1; n <= p.settimane; n++) {
    if (p.fasi[n - 1] !== 'carico') continue;
    vai(a, n);
    giorni.forEach(g => H.apriGiorno(a, g).forEach(e => assert.strictEqual(e.sets, e.setsBase, 'v1 settimana ' + n + ' ' + e.name)));
  }
});

test('con la regola MES-03 spenta o senza il consenso la seduta ha le serie del picco', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  conStoriaDiPrima(a);
  const g = H.giorniDiAllenamento(a)[0];
  H.vaiA(a, 1, 0);
  a.spegni(['MES-03']);
  H.apriGiorno(a, g).forEach(e => assert.strictEqual(e.sets, e.setsBase, 'regola spenta: ' + e.name));
  a.riaccendi();
  a.consenso(false);
  assert.strictEqual(a.chiama('applicaCaricoProgressivo', g), 0, 'senza consenso il coach non tocca la seduta');
  H.apriGiorno(a, g).forEach(e => assert.strictEqual(e.sets, e.setsBase, 'senza consenso: ' + e.name));
});

test('il minorenne e chi ha il PAR-Q positivo non hanno rampa (volume 1 nel piano): serie del picco', () => {
  [{ level: 'intermedio', age: 16 }, { level: 'intermedio', parq: 'si' }, { level: 'avanzato', age: 70 }].forEach(d => {
    const { a, p } = H.telefono({ d: d });
    const g = H.giorniDiAllenamento(a)[0];
    for (let n = 1; n <= Math.min(5, p.settimane); n++) {
      if (p.piano.settimane[n - 1].fase !== 'carico') continue;
      vai(a, n);
      H.apriGiorno(a, g).forEach(e => assert.strictEqual(e.sets, e.setsBase, JSON.stringify(d) + ' settimana ' + n + ': ' + e.name));
    }
  });
});

/* ============ il motivo: ogni numero cambiato dice perche ============ */

test('la serie ridotta dalla rampa ha il suo motivo con il codice MES-03 (il perche: sotto-coach dosatore) e la nota della seduta lo dice', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  conStoriaDiPrima(a);
  H.vaiA(a, 1, 0);
  const g = H.giorniDiAllenamento(a)[0];
  const voci = H.apriGiorno(a, g);
  const ridotta = voci.find(e => e.sets < e.setsBase);
  assert.ok(ridotta, 'settimana 1: almeno un esercizio con meno serie del picco');
  assert.ok(/settimana 1 di 5 del blocco/.test(ridotta.coachNote) && /serie/.test(ridotta.coachNote), ridotta.coachNote);
  const r = a.dati(a.chiama('caricoProssimo', ridotta.name, 50, 10, ridotta.setsBase));
  assert.ok(r.perche.some(x => x.codice === 'MES-03' && x.sottoCoach === 'dosatore'), JSON.stringify(r.perche));
  const piena = voci.find(e => e.sets === e.setsBase && e.setsBase > 2);
  if (piena) assert.ok(!/blocco/.test(piena.coachNote || ''), 'senza riduzione nessuna frase sulla rampa');
});

test('la rampa agisce prima di RIC-05 (rientro): dopo una pausa lunga le serie scendono ancora ma mai sotto 2', () => {
  const { a } = H.telefono({ d: { level: 'intermedio' } });
  conStoriaDiPrima(a);
  H.vaiA(a, 4, 0);                           /* lunedi 26 ottobre: 24 giorni dopo l ultima seduta (2 ottobre), rientro dopo una pausa del piano */
  const g = H.giorniDiAllenamento(a)[0];
  H.apriGiorno(a, g).forEach(e => { assert.ok(e.sets >= Math.min(2, e.setsBase), 'mai sotto 2: ' + e.name + ' ' + e.sets); assert.ok(e.sets <= e.setsBase); });
});
