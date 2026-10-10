/* Onda 5 (aperto di onda-4, CST-01 seguito): «controlloOttavaPrincipiante, faseDelGiorno e le sedute vecchie senza settimana leggono ancora il calendario».
   settimanaProgramma toglie le settimane della pausa (CST-01), ma faseDelGiorno (esigenza, scarico reattivo «programmato», strain), settimanaDellaSeduta (RPE bersaglio di una seduta
   vecchia senza la settimana salvata) e il controllo dell 8ª settimana del principiante (mesociclo.js) contavano le settimane del calendario: dopo una pausa dicevano una fase diversa da
   quella che la scheda mostra. Ora tutti leggono settimanaDelGiorno (sicurezza/popolazioni.js): la settimana del programma di un giorno, con le pause fino a quel giorno tolte.
   Prima (coach-v2-onda-4-bis): dopo una pausa di 25 giorni la scheda diceva «settimana 1» e faseDelGiorno(oggi) dava la fase della settimana 8 del calendario; il controllo dell 8ª
   scattava alla settimana 8 del calendario (la 4ª vissuta). Prove in node con l app vera in vm e storie vissute giorno per giorno (tests/aiuto-atleta-piano.js). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { telefono, vivi } = require('./aiuto-atleta-piano');

const J = JSON.stringify;
/* vive il programma giorno per giorno: `pausa` = { da: giorno (0 = il lunedi della settimana 1), giorni } senza nessuna seduta; `fino` = ultimo giorno vissuto; ritorna le righe
   { day, sett (settimanaProgramma), faseScheda, faseGiorno (faseDelGiorno(oggi)), settSeduta (settimanaDellaSeduta della seduta appena salvata, senza la settimana salvata) } */
function storia(d, pausa, fino, opz) {
  const { a } = telefono({ d: d, profilo: (opz || {}).profilo });
  const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), off = giorni.map(g => nomi.indexOf(g)), righe = [];
  for (let day = 0; day <= fino; day++) {
    if (off.indexOf(day % 7) === -1 || (pausa && day >= pausa.da && day < pausa.da + pausa.giorni)) continue;
    a.ora(new Date(2026, 9, 5 + day, 12));
    const sett = a.json('settimanaProgramma()');
    const faseGiorno = a.json('faseDelGiorno(new Date())');
    const faseDomani7 = a.json('faseDelGiorno(piuGiorni(new Date(), 7))');
    vivi(a, nomi[day % 7], { rpe: 'bersaglio' });
    /* la seduta appena salvata, SENZA la settimana salvata (come le voci vecchie): la settimana la ricava settimanaDellaSeduta */
    const settSeduta = a.json('(function () { const h = JSON.parse(JSON.stringify(loadHistory()[0])); delete h.settimana; return settimanaDellaSeduta(h); })()');
    righe.push({ day: day, sett: sett.numero, faseScheda: sett.fase, faseGiorno: faseGiorno, faseDomani7: faseDomani7, settSeduta: settSeduta, controllo: a.json('(getProgramma().piano || {}).controllo || null') });
  }
  return { a: a, righe: righe };
}
const INTERMEDIO = { level: 'intermedio', days: 3, minutes: 60, goals: ['massa'], sex: 'M', age: 30, parq: 'no', seme: 'o5-cal-int' };
const PRINCIPIANTE = { level: 'principiante', days: 3, minutes: 60, goals: ['massa'], sex: 'M', age: 30, parq: 'no', seme: 'o5-cal-pri' };

test('senza pause: faseDelGiorno(oggi), settimanaDellaSeduta e la scheda dicono la stessa settimana del calendario (come prima)', () => {
  const { a, righe } = storia(INTERMEDIO, null, 7 * 12 - 1);
  const fasi = a.json('getProgramma().fasi');
  righe.forEach(r => {
    assert.strictEqual(r.sett, Math.floor(r.day / 7) + 1, 'giorno ' + r.day);
    assert.strictEqual(r.faseGiorno, r.faseScheda, 'giorno ' + r.day + ': faseDelGiorno(oggi) = la fase della scheda');
    assert.strictEqual(r.faseDomani7, fasi[r.sett] || null, 'giorno ' + r.day + ': tra 7 giorni la settimana dopo');
    assert.strictEqual(r.settSeduta, r.sett, 'giorno ' + r.day + ': la seduta senza settimana salvata');
  });
});

test('con una pausa di 25 giorni (intermedio, 3 sedute): dopo la pausa la scheda riparte dalla settimana 1 e faseDelGiorno, la settimana tra 7 giorni e le sedute vecchie la seguono', () => {
  const { a, righe } = storia(INTERMEDIO, { da: 7 * 4, giorni: 25 }, 7 * 16 - 1);   /* 16 settimane di calendario: 12 vissute piu la pausa */
  const fasi = a.json('getProgramma().fasi');
  const dopo = righe.filter(r => r.day >= 7 * 4 + 25);
  assert.ok(dopo.length >= 10);
  assert.strictEqual(dopo[0].sett, 1, 'prima: la scheda gia diceva 1; il calendario direbbe ' + (Math.floor(dopo[0].day / 7) + 1));
  righe.forEach(r => {
    assert.strictEqual(r.faseGiorno, r.faseScheda, 'giorno ' + r.day + ' (scheda: settimana ' + r.sett + '): faseDelGiorno(oggi) ' + r.faseGiorno + ' contro ' + r.faseScheda + ' [prima: il calendario]');
    assert.strictEqual(r.faseDomani7, fasi[r.sett] || null, 'giorno ' + r.day + ': tra 7 giorni la settimana ' + (r.sett + 1));
    assert.strictEqual(r.settSeduta, r.sett, 'giorno ' + r.day + ': la seduta vecchia senza settimana salvata [prima: il calendario]');
  });
  /* le settimane di scarico viste dalla scheda e da faseDelGiorno coincidono anche contate */
  const scarichiScheda = righe.filter(r => r.faseScheda === 'scarico').length, scarichiGiorno = righe.filter(r => r.faseGiorno === 'scarico').length;
  assert.strictEqual(scarichiGiorno, scarichiScheda);
  assert.ok(scarichiScheda >= 3, 'lo scarico (settimana 6 del blocco 5+1) vissuto dopo la pausa, tre sedute: ' + scarichiScheda);
});

test('un giorno passato prima della pausa tiene la sua settimana: faseDelGiorno di una data vecchia non cambia dopo la pausa', () => {
  const { a, righe } = storia(INTERMEDIO, { da: 7 * 4, giorni: 25 }, 7 * 12 - 1);
  const fasi = a.json('getProgramma().fasi');
  /* oggi e alla fine: il giovedi della settimana 3 del calendario (giorno 17) era la settimana 3 del programma */
  const w3 = a.json('settimanaDelGiorno(new Date(2026, 9, 5 + 17, 12))');
  assert.strictEqual(w3, 3, 'prima della pausa la settimana 3 resta 3 (' + w3 + ')');
  assert.strictEqual(a.json('faseDelGiorno(new Date(2026, 9, 5 + 17, 12))'), fasi[2]);
  /* il primo giorno dopo la pausa e la settimana 1 */
  const primo = righe.find(r => r.day >= 7 * 4 + 25);
  assert.strictEqual(a.json('settimanaDelGiorno(new Date(2026, 9, 5 + ' + primo.day + ', 12))'), 1);
});

test('il controllo dell 8ª settimana del principiante scatta all 8ª settimana VISSUTA, non all 8ª del calendario, quando c e stata una pausa', () => {
  const { righe } = storia(PRINCIPIANTE, { da: 7 * 3, giorni: 25 }, 7 * 17 - 1);   /* la pausa riporta alla settimana 1 (blocco unico): l 8ª vissuta arriva alla 12ª del calendario */
  const conControllo = righe.filter(r => r.controllo);
  assert.ok(conControllo.length > 0, 'il controllo arriva');
  const primo = conControllo[0];
  assert.strictEqual(primo.controllo.settimana, 8);
  assert.strictEqual(primo.sett, 8, 'prima: scattava alla settimana 8 del calendario (la ' + righe.find(r => Math.floor(r.day / 7) + 1 === 8 && r.day >= 7 * 3 + 25).sett + 'ª vissuta); ora alla settimana 8 vissuta (giorno ' + primo.day + ', calendario ' + (Math.floor(primo.day / 7) + 1) + ')');
  righe.filter(r => r.sett < 8).forEach(r => assert.strictEqual(r.controllo, null, 'giorno ' + r.day + ': nessun controllo prima dell 8ª vissuta'));
});

test('con CST-01 spenta tutto legge il calendario, come prima (anche dopo una pausa)', () => {
  const { a } = telefono({ d: INTERMEDIO });
  a.spegni(['CST-01']);
  const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), off = giorni.map(g => nomi.indexOf(g));
  for (let day = 0; day < 7 * 9; day++) {
    if (off.indexOf(day % 7) === -1 || (day >= 28 && day < 53)) continue;
    a.ora(new Date(2026, 9, 5 + day, 12));
    const sett = a.json('settimanaProgramma()');
    assert.strictEqual(sett.numero, Math.floor(day / 7) + 1);
    assert.strictEqual(a.json('settimanaDelGiorno(new Date())'), sett.numero);
    assert.strictEqual(a.json('faseDelGiorno(new Date())'), sett.fase);
    vivi(a, nomi[day % 7], { rpe: 'bersaglio' });
  }
});
