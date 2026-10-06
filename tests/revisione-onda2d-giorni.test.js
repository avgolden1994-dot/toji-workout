/* INT-2d, M2 della revisione dell onda 2b/2c: sei giorni, la settimana e un anello. 6 sedute in 7 giorni sono SEMPRE sei giorni di fila (venerdi-mercoledi, il giovedi di riposo non spezza niente), domenica e lunedi sono
   giorni consecutivi, e le 48 ore dei grandi muscoli, il tipo di seduta e l ordine devono contare anche attraverso il lunedi. Misurato sul codice di coach-v2-onda-2c su 1.152 programmi da 6 giorni: 12 con un grande muscolo a
   fondo (4 serie frazionarie o piu) sia domenica sia lunedi, 33 con la stessa coppia in giorni consecutivi in tutto. Le prove falliscono su ec06469. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const LUNEDI = '2026-10-05T12:00:00';
const GIORNI_SEI = ['Lunedì', 'Martedì', 'Mercoledì', 'Venerdì', 'Sabato', 'Domenica'];

test('M2: tipiAdiacenti e riordinaSenzaAdiacenti contano anche domenica-lunedi (prima solo i giorni consecutivi da lunedi a domenica)', () => {
  const a = caricaApp({ ora: LUNEDI });
  const ind = [0, 1, 2, 4, 5, 6];
  assert.strictEqual(a.json('tipiAdiacenti(["push","pull","legs","push","pull","push"], ' + JSON.stringify(ind) + ')'), true, 'push di domenica e push di lunedi: giorni consecutivi');
  assert.strictEqual(a.json('tipiAdiacenti(["push","pull","legs","push","pull","legs"], ' + JSON.stringify(ind) + ')'), false, 'push pull legs due volte: nessuna coppia uguale in giorni consecutivi');
  assert.strictEqual(a.json('tipiAdiacenti(["push","pull","legs","upper","lower","push"], ' + JSON.stringify(ind) + ')'), true);
  /* i posti sono sei giorni di fila Ven-Sab-Dom-Lun-Mar-Mer (il giovedi non separa niente: il mercoledi e il venerdi non sono consecutivi) */
  const vicini = (o) => o.every((t, i) => o.every((u, j) => j <= i || t !== u || !a.json('giorniAdiacenti(' + ind[i] + ', ' + ind[j] + ')')));
  const quattro = a.json('riordinaSenzaAdiacenti(["push","push","push","push","pull","legs"], ' + JSON.stringify(ind) + ')');
  assert.strictEqual(quattro, null, 'quattro push su sei posti: due sono per forza in giorni consecutivi');
  [['push', 'pull', 'legs', 'push', 'pull', 'legs'], ['push', 'push', 'pull', 'pull', 'legs', 'legs'], ['push', 'pull', 'push', 'legs', 'push', 'pull']].forEach(tipi => {
    const ordine = a.json('riordinaSenzaAdiacenti(' + JSON.stringify(tipi) + ', ' + JSON.stringify(ind) + ')');
    assert.ok(ordine && ordine.length === 6, tipi.join(',') + ' -> ' + JSON.stringify(ordine));
    assert.ok(vicini(ordine), 'giorni consecutivi, domenica e lunedi compresi, con tipi diversi: ' + ordine.join(','));
    assert.deepStrictEqual(ordine.slice().sort(), tipi.slice().sort(), 'stesse sedute, altro ordine');
  });
  /* il caso che prima passava: ultimo e primo uguali, in giorni consecutivi */
  assert.strictEqual(a.json('tipiAdiacenti(["push","pull","legs","upper","lower","push"], ' + JSON.stringify(ind) + ')'), true);
});

test('M2: recuperoOk e giorniAdiacenti: domenica e lunedi sono consecutivi (48 ore del petto a fondo)', () => {
  const a = caricaApp({ ora: LUNEDI });
  assert.strictEqual(a.json('giorniAdiacenti(6, 0)'), true);
  assert.strictEqual(a.json('giorniAdiacenti(0, 6)'), true);
  assert.strictEqual(a.json('giorniAdiacenti(0, 1) && giorniAdiacenti(3, 4)'), true);
  assert.strictEqual(a.json('giorniAdiacenti(0, 5) || giorniAdiacenti(2, 4) || giorniAdiacenti(0, 0)'), false);
  const sed = (giorno, nome, sets) => ({ giorno: giorno, esercizi: [{ name: nome, sets: sets, reps: 8, rest: 90 }] });
  const dom = sed('Domenica', 'Panca Piana Bilanciere', 4), lun = sed('Lunedì', 'Panca Inclinata Manubri', 1), ven = sed('Venerdì', 'Panca Inclinata Manubri', 1);
  assert.strictEqual(a.json('recuperoOk(' + JSON.stringify(lun) + ', ' + JSON.stringify([dom, lun]) + ', "Panca Inclinata Manubri", 3)'), false, 'lunedi dopo domenica: 4 serie di petto il giorno prima (attraverso la fine della settimana)');
  assert.strictEqual(a.json('recuperoOk(' + JSON.stringify(ven) + ', ' + JSON.stringify([dom, ven]) + ', "Panca Inclinata Manubri", 3)'), true, 'venerdi, due giorni prima di domenica: va bene');
  assert.strictEqual(a.json('recuperoRispettato(' + JSON.stringify([sed('Domenica', 'Panca Piana Bilanciere', 4), sed('Lunedì', 'Panca Inclinata Manubri', 4)]) + ')'), false);
  assert.strictEqual(a.json('recuperoRispettato(' + JSON.stringify([sed('Venerdì', 'Panca Piana Bilanciere', 4), sed('Lunedì', 'Panca Inclinata Manubri', 4)]) + ')'), true);
});

test('M2: su 288 programmi da 6 giorni (uno ogni quattro dei 1.152 della griglia) nessun grande muscolo e a fondo sia domenica sia lunedi, le sedute stanno su lun-mar-mer-ven-sab-dom, e la nota dice la verita sui sei giorni di fila', { timeout: 280000 }, () => {
  const a = caricaApp({ ora: LUNEDI });
  a.g(`globalThis.__sei = function (p) { const prog = buildProgram(p); let anello = 0, tutti = 0;
    prog.sedute.forEach((x, i) => prog.sedute.forEach((y, j) => { if (j > i) { const d = Math.abs(DAYS.indexOf(x.giorno) - DAYS.indexOf(y.giorno)); if (d !== 1 && d !== 6) return;
      GRUPPI_RECUPERO.forEach(g => { if (frazGruppoSeduta(x, g) >= PARAM_TEMPO.serieMinRecupero && frazGruppoSeduta(y, g) >= PARAM_TEMPO.serieMinRecupero) { tutti++; if (d === 6) anello++; } }); } }));
    return { n: prog.sedute.length, giorni: prog.sedute.map(s => s.giorno), anello: anello, tutti: tutti, rec: recuperoRispettato(prog.sedute), note: prog.note.filter(n => /^Con 6 giorni|^Petto, schiena, gambe e glutei non lavorano/.test(n)) }; }`);
  const GOALS = [['massa'], ['forza'], ['ricomposizione'], ['salute']], LIV = ['intermedio', 'avanzato'], MIN = [30, 60, 90], LU = ['palestra', 'manubri'], PR = [[], ['petto'], ['spalle', 'braccia'], ['gambe']], FQ = ['auto', '1', '2'];
  let tot = 0, conAnello = 0, conRec = 0, i = 0, breve = 0, lunga = 0, cinque = 0;
  const falsi = [];
  GOALS.forEach(g => LIV.forEach(l => MIN.forEach(m => LU.forEach(lu => PR.forEach(pr => FQ.forEach(fq => ['M', 'F'].forEach(sx => {
    const p = { goals: g, level: l, days: 6, minutes: m, luogo: lu, fastidi: [], sex: sx, age: 30, freq: fq, parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: pr, usaProfilo: false, seme: 'w' + i };
    if (i++ % 4) return;
    const r = a.dati(a.chiama('__sei', p)); tot++;
    if (r.anello) conAnello++;
    if (r.tutti) conRec++;
    if (r.n === 6) {
      if (JSON.stringify(r.giorni) !== JSON.stringify(GIORNI_SEI)) falsi.push('giorni ' + r.giorni.join(','));
      const prima = r.note[0] || '';
      if (!/^Con 6 giorni hai un solo giorno di riposo: le sedute sono sei di fila, da venerdì a mercoledì, e il giovedì si riposa\.$/.test(prima) || r.note.length > 2) falsi.push('nota: ' + r.note.join(' | '));
      if ((r.note.length === 2 && r.note[1] === 'Petto, schiena, gambe e glutei non lavorano a fondo in due giorni consecutivi.') !== r.rec) falsi.push('la seconda nota e le 48 ore non coincidono: rec=' + r.rec + ' ' + r.note.join(' | '));
      if (r.note.length === 2) lunga++; else breve++;
    } else { cinque++; if (!r.note.length) falsi.push('5 sedute senza nota'); }
  })))))));
  assert.strictEqual(tot, 288);
  assert.deepStrictEqual(falsi.slice(0, 5), [], 'giorni e note');
  assert.strictEqual(conAnello, 0, 'nessun grande muscolo a fondo sia domenica sia lunedi (2c: 12 programmi su 1.152)');
  assert.strictEqual(lunga + breve + cinque, 288);
  assert.deepStrictEqual({ conAnello, conRec, breve, lunga, cinque }, { conAnello: 0, conRec: 8, breve: 8, lunga: 280, cinque: 0 }, 'numeri misurati: nessun anello (domenica-lunedi), 8 programmi con una coppia a fondo in giorni consecutivi non d anello (Mar-Mer) che riceve la nota breve, 280 con la garanzia');
});
