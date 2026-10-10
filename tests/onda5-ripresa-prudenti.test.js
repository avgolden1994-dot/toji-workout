/* ALG-19 (onda 5, D-P26): con il RIR fisso (minorenni, over 65, PAR-Q positivo, gravidanza) il peso deve SALIRE in 12 settimane.
   Difetto M1 della revisione indipendente dell onda 4: senza la rampa del RIR (ALG-05 non ricalcola mai) il peso saliva solo con la doppia progressione, che chiede 3-4 sedute
   in un blocco di 3 settimane di lavoro; dopo lo scarico la ripresa prudente ripartiva dal -5% (lo stesso peso dello scarico «basso») e dalle ripetizioni dello scarico: in 12
   settimane il peso non saliva (minorenni 84-89% delle coppie esercizio-bersaglio, over 65 36-39%) e il 5% finiva sotto il carico di partenza (Lat Machine 40 -> 37,5 -> 35 kg).
   Ogni prova e stata scritta PRIMA della correzione e fallisce sul codice del tag coach-v2-onda-4-bis (i numeri di «prima:» sono letti li con la regola spenta, che da lo stesso codice).
   Come lavora: l app VERA in vm (tests/aiuto-app.js) e telefoni con un programma v2 vero (tests/aiuto-atleta-piano.js): l atleta fa tutte le serie come scritte, con l RPE uguale al
   bersaglio, per 12 settimane (8 per il principiante prudente). Si guarda in DUE direzioni: nessun carico scende tra due sedute di lavoro, e ogni coppia esercizio-bersaglio seguita
   per 9 settimane o piu sale almeno una volta (escluso il tetto legittimo del manubrio); in piu nessun salto oltre il tetto di +25% (salvo il primo passo della griglia) e il peso
   finale sopra quello iniziale.
   INT-5d (D-P26): la correzione A1 aveva un costo (i principianti prudenti con carichi piccoli restavano fermi per la guardia del +25% di CAR-18, che con una griglia grossa non
   ammette nessun peso sopra il carico). Ora la guardia lascia passare esattamente un passo di griglia quando il +25% non ne contiene nessuno (passoUnicoOltreTetto): le eccezioni
   «ferme per la guardia» sono tolte, i principianti (seguiti 5 sedute su 6 settimane) e gli adulti principianti (m3) sono nelle prove e nessuna coppia resta ferma. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const H = require('./aiuto-atleta-piano');

const PALESTRA = { minutes: 60, luogo: 'palestra', fastidi: [], priorita: [] };
const STORIE = {
  over66: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 3, goals: ['salute'], sex: 'M', age: 66, parq: 'no', seme: 'o66-no-salute-intermedio-3-palestra' }), prof: { parq: false } },
  over72principiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 2, goals: ['salute'], sex: 'F', age: 72, parq: 'no', seme: 'o72-no-salute-principiante-2-palestra' }), prof: { parq: false } },
  minorenne: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 3, goals: ['massa'], sex: 'M', age: 15, parq: 'no', seme: 'm15-no-massa-intermedio-3-palestra' }), prof: { parq: false } },
  parq: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 4, goals: ['forza'], sex: 'F', age: 31, parq: 'si', seme: 'ctrl-si-forza-intermedio-4-palestra' }), prof: { parq: true } },
  gravidanza: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 3, goals: ['salute'], sex: 'F', age: 31, parq: 'si', seme: 'grav-si-salute-intermedio-3-palestra' }), prof: { parq: true, gravidanza: true } },
  over66manubri: { d: { level: 'intermedio', days: 3, minutes: 60, goals: ['massa'], sex: 'M', age: 66, parq: 'no', luogo: 'manubri', fastidi: [], priorita: [], seme: 'o66-no-massa-intermedio-3-manubri' }, prof: { parq: false, luogo: 'manubri', manubriKg: 16 } },
  adulto: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 3, goals: ['massa'], sex: 'M', age: 31, parq: 'no', seme: 'ctrl-no-massa-intermedio-3-palestra' }), prof: { parq: false } },
  /* i principianti con pesi piccoli (pile da 2,5 kg): lo scarico «basso» (x0,95) arrotondato alla griglia coincide con il riferimento (revisione finale, A1) */
  parqPrincipiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 2, goals: ['salute'], sex: 'F', age: 31, parq: 'si', seme: 'ctrl-si-salute-principiante-2-palestra' }), prof: { parq: true } },
  gravidanzaPrincipiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 3, goals: ['salute'], sex: 'F', age: 31, parq: 'si', seme: 'grav-si-salute-principiante-3-palestra' }), prof: { parq: true, gravidanza: true } },
  minorennePrincipiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 3, goals: ['massa'], sex: 'M', age: 15, parq: 'no', seme: 'm15-no-massa-principiante-3-palestra' }), prof: { parq: false } },
  /* INT-5d: l over 66 che comincia (pile da 2,5 kg) e l adulto principiante senza RIR fisso (m3: Alzate Laterali ai Cavi a 2,5 kg) */
  over66principiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 2, goals: ['salute'], sex: 'F', age: 66, parq: 'no', seme: 'o66-no-salute-principiante-2-palestra' }), prof: { parq: false } },
  adultoPrincipiante: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 4, goals: ['dimagrire'], sex: 'F', age: 31, parq: 'no', seme: 'ctrl-no-dimagrire-principiante-4-palestra' }), prof: { parq: false } },
  gravidanzaPrincipiante3: { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 2, goals: ['salute'], sex: 'F', age: 31, parq: 'si', seme: 'grav-si-salute-principiante-2-palestra' }), prof: { parq: true, gravidanza: true } },
  parqIntermedio: { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 2, goals: ['salute'], sex: 'F', age: 31, parq: 'si', seme: 'ctrl-si-salute-intermedio-2-palestra' }), prof: { parq: true } }
};

/* le settimane vissute: { rec: [{ n, g, name, w, reps, base, fase, tipo, nota, rir }], settimane } nell ordine delle sedute */
function storia(S, opz) {
  const o = Object.assign({ spente: null }, opz || {});
  const { a, p } = H.telefono({ d: S.d, profilo: S.prof });
  if (o.spente) a.spegni(o.spente);
  const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), rec = [];
  const W = Math.min(12, p.settimane || 12);
  for (let n = 1; n <= W; n++) giorni.forEach(g => {
    H.vaiA(a, n, nomi.indexOf(g));
    const fase = (a.json('settimanaProgramma()') || {}).fase;
    H.vivi(a, g, { rpe: 'bersaglio' }).voci.forEach(e => {
      const rir = a.json('rirBersaglio(' + JSON.stringify(e.name) + ')');
      rec.push({ n: n, g: g, name: e.name, w: Number(e.weight) || 0, reps: Number(e.reps) || 0, base: e.repsBase, fase: fase, tipo: e.coachTipo || '', nota: e.coachNote || '', rir: rir });
    });
  });
  return { rec: rec, settimane: W, a: a };
}
/* le coppie esercizio-bersaglio con carico: solo le sedute di lavoro (fase carico, non di scarico) */
function coppie(rec) {
  const per = {};
  rec.filter(r => r.w > 0 && r.fase === 'carico' && r.tipo !== 'scarico').forEach(r => { const k = r.name + '|' + r.base; (per[k] = per[k] || []).push(r); });
  return per;
}
const alTetto = (L, tetto) => tetto > 0 && Math.abs(L[0].w - tetto) < 1e-9 || L.some(x => /manubrio più pesante/.test(x.nota));
/* la misura in due direzioni (e le altre promesse): { seguite, maiSalite, cali, saltiOltreTetto, saltiOltre10, finaleSottoIniziale, finaleSopraIniziale }; seguite = almeno 5 sedute di lavoro su 6 settimane */
function misura(rec, tetto, W) {
  const span = Math.min(8, (W || 12) - 2);   /* 12 settimane: seguita per 9 o piu; il principiante prudente ha 8 settimane: per 7 o piu */
  const m = { seguite: 0, maiSalite: [], cali: [], saltiOltreTetto: [], saltiOltre10: 0, finaleSottoIniziale: [], finaleSopraIniziale: 0 };
  Object.entries(coppie(rec)).forEach(([k, L]) => {
    for (let i = 1; i < L.length; i++) {
      const p = L[i - 1], s = L[i];
      if (s.w < p.w - 1e-9) m.cali.push(k + ' s' + s.n + ' ' + p.w + ' -> ' + s.w + ' [' + s.nota.slice(0, 80) + ']');
      /* il tetto di +25% (limitaSalitaBase): oltre solo quando la griglia non ha nessun peso dentro il tetto e si prende il primo passo (la pila dei cavi da 2,5 kg: 2,5 -> 5) */
      if (s.w > p.w * 1.25 + 1e-9 && s.w - p.w > 2.5 + 1e-9) m.saltiOltreTetto.push(k + ' s' + s.n + ' ' + p.w + ' -> ' + s.w);
      if (s.w > p.w * 1.10 + 1e-9) m.saltiOltre10++;
    }
    if (L.length < 5 || L[L.length - 1].n - L[0].n < span) return;
    m.seguite++;
    const max = Math.max.apply(null, L.map(x => x.w));
    if (max <= L[0].w + 1e-9 && !alTetto(L, tetto)) m.maiSalite.push(k + ' ' + L.map(x => 's' + x.n + ':' + x.w + 'x' + x.reps).join(' '));
    if (L[L.length - 1].w < L[0].w - 1e-9) m.finaleSottoIniziale.push(k);
    if (L[L.length - 1].w > L[0].w + 1e-9 || alTetto(L, tetto)) m.finaleSopraIniziale++;
  });
  return m;
}

/* INT-5d: nessuna coppia resta ferma, nemmeno con carichi piccoli (pile da 2,5 kg: 5 -> 7,5 kg e +50%, il passo che la guardia del +25% di CAR-18 ora lascia passare) */
['over66', 'over72principiante', 'minorenne', 'parq', 'gravidanza', 'over66manubri', 'parqPrincipiante', 'gravidanzaPrincipiante', 'gravidanzaPrincipiante3', 'over66principiante', 'parqIntermedio', 'minorennePrincipiante'].forEach(chi => {
  test('ALG-19 / CAR-18: ' + chi + ' con tutte le serie complete e l RPE sul bersaglio: il peso SALE (anche con i carichi piccoli: un passo di griglia), non scende mai tra due sedute di lavoro, nessun salto oltre +25% (salvo il primo passo della griglia)', () => {
    const S = STORIE[chi], tetto = S.prof.manubriKg || 0;
    const r = storia(S), m = misura(r.rec, tetto, r.settimane);
    assert.ok(m.seguite >= 4, chi + ': coppie seguite ' + m.seguite);
    assert.deepStrictEqual(m.maiSalite, [], chi + ': coppie mai salite (escluso il tetto del manubrio):\n' + m.maiSalite.join('\n'));
    assert.deepStrictEqual(m.cali, [], chi + ': carichi scesi tra due sedute di lavoro:\n' + m.cali.join('\n'));
    assert.deepStrictEqual(m.saltiOltreTetto, [], chi + ': salti oltre +25%:\n' + m.saltiOltreTetto.join('\n'));
    assert.deepStrictEqual(m.finaleSottoIniziale, [], chi + ': coppie finite sotto il carico di partenza: ' + m.finaleSottoIniziale.join(', '));
    assert.strictEqual(m.finaleSopraIniziale, m.seguite, chi + ': coppie finite sopra il carico di partenza ' + m.finaleSopraIniziale + ' su ' + m.seguite);
    /* un salto oltre +25% e al piu UN passo di griglia: mai di piu (la guardia lascia passare solo il primo passo) */
    const passo = (nome, kg) => r.a.chiama('passoAttrezzo', nome, { kg: kg });
    const piuDiUnPasso = [];
    Object.entries(coppie(r.rec)).forEach(([k, L]) => { for (let i = 1; i < L.length; i++) if (L[i].w > L[i - 1].w * 1.25 + 1e-9 && L[i].w - L[i - 1].w > passo(L[i].name, L[i - 1].w) + 1e-9) piuDiUnPasso.push(k + ' s' + L[i].n + ' ' + L[i - 1].w + ' -> ' + L[i].w); });
    assert.deepStrictEqual(piuDiUnPasso, [], chi + ': salti oltre +25% e oltre un passo di griglia:\n' + piuDiUnPasso.join('\n'));
  });
});

test('ALG-19 spenta: torna il comportamento di prima (over 66: Lat Machine 40 -> 37,5 -> 35 kg, coppie mai salite e carichi che scendono senza scarico di mezzo)', () => {
  const r = storia(STORIE.over66, { spente: ['ALG-19'] });
  const m = misura(r.rec, 0);
  assert.ok(m.maiSalite.length >= 3, 'prima: 14 coppie mai salite su 22 (ora ' + m.maiSalite.length + ')');
  assert.ok(m.cali.length >= 3, 'prima: carichi che scendono alla ripresa (ora ' + m.cali.length + ')');
  const lat = r.rec.filter(x => x.name === '🏹 Lat Machine' && x.fase === 'carico').map(x => x.w);
  assert.ok(lat[0] === 40 && lat.indexOf(37.5) !== -1 && lat.indexOf(35) !== -1, 'prima: 40, 37,5, 35 kg; ora ' + lat.join(' '));
});

test('ALG-19: la seduta dopo lo scarico riparte dal carico di riferimento (100%) e dalle ripetizioni della seduta di lavoro, con il RIR in piu di MES-06 e il perche', () => {
  const r = storia(STORIE.over66);
  const lat = r.rec.filter(x => x.name === '🏹 Lat Machine');
  const s3 = lat.find(x => x.n === 3), s4 = lat.find(x => x.n === 4), s5 = lat.find(x => x.n === 5), s6 = lat.find(x => x.n === 6);
  assert.strictEqual(s4.fase, 'scarico');
  assert.ok(s4.w < s3.w, 'lo scarico riduce il carico: ' + s3.w + ' -> ' + s4.w);
  assert.strictEqual(s5.w, s3.w, 'la ripresa e al 100% del riferimento (prima: ' + (s3.w * 0.95) + ')');
  assert.strictEqual(s5.reps, s3.reps, 'le ripetizioni della ripresa sono quelle della seduta di lavoro (prima: ' + s4.reps + ' dello scarico)');
  assert.ok(s5.reps > s4.reps, 'la seduta di lavoro era avanti nella doppia progressione');
  assert.ok(/Dopo lo scarico riparti dal carico che avevi prima/.test(s5.nota), s5.nota);
  assert.ok(/e dalle ripetizioni raggiunte prima dello scarico \(\d+\): la doppia progressione continua da lì/.test(s5.nota), s5.nota);
  assert.ok(/una in più dopo lo scarico/.test(s5.nota), 'il RIR in piu di MES-06 resta: ' + s5.nota);
  assert.ok(!/-5%/.test(s5.nota), 'niente -5% per eta o PAR-Q: ' + s5.nota);
  assert.ok(s6.w > s5.w, 'la seduta dopo la ripresa sale di peso (cima della scala raggiunta): ' + s5.w + ' -> ' + s6.w);
});

test('ALG-19: il -5% della ripresa resta con il sonno scarso (fatica vera), anche per un over 65', () => {
  const S = { d: STORIE.over66.d, prof: Object.assign({}, STORIE.over66.prof, { prefs: { sonno: 'male' } }) };
  const r = storia(S);
  const lat = r.rec.filter(x => x.name === '🏹 Lat Machine');
  const s3 = lat.find(x => x.n === 3), s5 = lat.find(x => x.n === 5);
  assert.ok(s5.w < s3.w, 'con il sonno scarso la ripresa e sotto il riferimento: ' + s3.w + ' -> ' + s5.w);
  assert.ok(/-5%/.test(s5.nota) || /per gradi/.test(s5.nota) || /Doppia progressione|ripetizione in piu/.test(s5.nota), s5.nota);
});

test('ALG-19 non tocca gli adulti senza RIR fisso: 12 settimane identiche con la regola accesa e spenta (e il peso sale gia)', () => {
  const con = storia(STORIE.adulto).rec, senza = storia(STORIE.adulto, { spente: ['ALG-19'] }).rec;
  assert.deepStrictEqual(con, senza);
  const m = misura(con, 0);
  assert.deepStrictEqual(m.maiSalite, []);
});

test('ALG-19 vale solo per i programmi v2: un programma v1 di un over 72 e identico con la regola accesa e spenta', () => {
  const S = { d: Object.assign({}, PALESTRA, { level: 'intermedio', days: 3, goals: ['salute'], sex: 'M', age: 72, parq: 'no', seme: 'o72-no-salute-intermedio-3-palestra' }), prof: { parq: false } };
  const vivi = spente => {
    const { a } = H.telefono({ d: S.d, profilo: S.prof, v1: true });
    if (spente) a.spegni(spente);
    const giorni = a.giorniAllenamento(), nomi = a.json('DAYS'), rec = [];
    for (let n = 1; n <= 12; n++) giorni.forEach(g => { H.vaiA(a, n, nomi.indexOf(g)); H.vivi(a, g, { rpe: 'bersaglio' }).voci.forEach(e => rec.push([n, e.name, e.weight, e.reps, e.coachNote])); });
    return rec;
  };
  assert.deepStrictEqual(vivi(null), vivi(['ALG-19']));
});

/* A1 (revisione finale dell onda 5): la ripresa dopo lo scarico riparte dal riferimento anche quando lo scarico arrotondato alla griglia COINCIDE col riferimento
   (dose «bassa» x0,95 su pile da 2,5 kg sotto ~25 kg, manubri da 2 kg: i principianti). Prima la ripresa non scattava (da > pesoUltimo falso) e la doppia progressione,
   con le ripetizioni della seduta di lavoro gia al tetto, saliva di un passo SOPRA il riferimento nella prima seduta dopo lo scarico (+50% su 5 kg), col RIR in piu di MES-06.
   Misurato prima della correzione: riprese sopra il riferimento PAR-Q 2,3% (principianti 11,5%), gravidanza 4,0% (20,6%), 15 anni 8,1% (32,1%), over 66/72/78 circa 3% (12-13%). */
function riprese(rec) {
  const out = { n: 0, sopra: [] };
  const per = {};
  rec.filter(r => r.w > 0).forEach(r => { const k = r.name + '|' + r.base; (per[k] = per[k] || []).push(r); });
  Object.entries(per).forEach(([k, L]) => {
    const sc = r => r.fase === 'scarico' || r.tipo === 'scarico';
    for (let i = 1; i < L.length; i++) {
      if (!sc(L[i - 1]) || sc(L[i])) continue;
      let j = i - 1; while (j >= 0 && sc(L[j])) j--;
      if (j < 0) continue;
      out.n++;
      if (L[i].w > L[j].w + 1e-9) out.sopra.push(k + ' riferimento s' + L[j].n + ':' + L[j].w + ' -> ripresa s' + L[i].n + ':' + L[i].w + ' [' + L[i].nota.slice(0, 110) + ']');
    }
  });
  return out;
}

test('ALG-19 (A1) e CAR-18 (INT-5d): Pull-Through ai Cavi di una principiante PAR-Q con pile da 2,5 kg: s5 riparte da 5x12 «dal carico che avevi prima» (mai sopra il riferimento), s6 sale di UN passo a 7,5 kg e poi continua', () => {
  const r = storia(STORIE.parqPrincipiante);
  const pt = r.rec.filter(x => /Pull-Through/.test(x.name));
  const s = n => pt.find(x => x.n === n);
  assert.strictEqual(s(4).fase, 'scarico');
  assert.strictEqual(s(3).w, 5, 'riferimento 5 kg: ' + s(3).w);
  assert.strictEqual(s(4).w, 5, 'lo scarico arrotondato alla griglia coincide col riferimento: ' + s(4).w);
  assert.strictEqual(s(5).w, 5, 'prima di A1: 7,5 kg (' + s(5).nota + ')');
  assert.strictEqual(s(5).reps, 12, 'ripetizioni della seduta di lavoro (prima: 10)');
  assert.ok(/riparti dal carico che avevi prima/.test(s(5).nota), s(5).nota);
  assert.ok(!/Arrivato a|\+2,5 kg/.test(s(5).nota), 'nessun aumento nella ripresa: ' + s(5).nota);
  /* INT-5d: 5 -> 7,5 kg e' +50% ma il +25% (6,25 kg) non contiene nessun peso della pila da 2,5 kg: la guardia di CAR-18 lascia passare il primo passo, non di piu.
     Prima della correzione (6d97d8e) la coppia restava a 5 kg per tutte le 8 settimane (reps 10-11-12, scarico, 12-11-12, scarico). */
  assert.strictEqual(s(6).w, 7.5, 'dopo la ripresa sale di un passo: ' + s(6).nota);
  assert.strictEqual(s(6).tipo, 'su');
  assert.ok(/Arrivato a 12 ripetizioni: ora \+2.5 kg e si riparte da 10/.test(s(6).nota), s(6).nota);
  assert.strictEqual(s(6).reps, 10);
  assert.strictEqual(s(7).w, 7.5, 'e poi continua dal nuovo peso con le ripetizioni: ' + s(7).nota);
  assert.ok(s(7).reps > s(6).reps, 'una ripetizione in piu: ' + s(6).reps + ' -> ' + s(7).reps);
  assert.ok(pt.filter(x => x.n <= 5).every(x => x.w <= 5 + 1e-9), 'mai sopra il riferimento di 5 kg prima della salita: ' + pt.map(x => x.w).join(' '));
  assert.ok(pt.every((x, i) => i === 0 || pt[i - 1].fase === 'scarico' || x.fase === 'scarico' || x.w >= pt[i - 1].w - 1e-9), 'il peso non scende tra due sedute di lavoro: ' + pt.map(x => x.w).join(' '));
});

/* m3 per gli adulti: INT-5d lo MISURA e non lo chiude. Le coppie ferme degli adulti principianti (Alzate Laterali ai Cavi a 2,5 kg, Alzate Laterali con manubri da 2 kg, Curl su Panca Inclinata
   da 3 kg: 16 su 294 nella scansione di 1.008 simulazioni, prima e dopo la correzione) NON sono tenute dalla guardia del +25%: la calibrazione e gia chiusa quando arrivano alla cima delle
   ripetizioni (13, alla settimana 7) e il passo di peso cade sulla settimana di scarico, poi la doppia progressione degli adulti riparte dalle ripetizioni dello scarico (11). Estendere ad
   adulti la ripresa di ALG-19 (le ripetizioni di lavoro continuano) violerebbe «byte-identici»: decisione del proprietario (D-P26). La prova fissa il residuo e la sua causa: puo solo calare. */
test('m3 (INT-5d): un adulto principiante senza RIR fisso: la sola coppia ferma e l isolamento al minimo (2,5 kg al cavo) che arriva alla cima delle ripetizioni e cade nello scarico, non la guardia del +25%', () => {
  const r = storia(STORIE.adultoPrincipiante), m = misura(r.rec, 0, r.settimane);
  assert.ok(m.seguite >= 4, 'coppie seguite ' + m.seguite);
  assert.strictEqual(m.maiSalite.length, 1, 'coppie ferme (m3 residuo, misurato 1): ' + m.maiSalite.join('\n'));
  assert.ok(/Alzate Laterali ai Cavi/.test(m.maiSalite[0]), m.maiSalite[0]);
  const al = r.rec.filter(x => /Alzate Laterali ai Cavi/.test(x.name));
  assert.strictEqual(al.find(x => x.fase === 'carico').w, 2.5, 'parte dal minimo della pila');
  const cima = al.filter(x => x.fase === 'carico' && x.reps === x.base + 3);
  assert.ok(cima.length >= 1, 'arriva alla cima delle ripetizioni (' + al.map(x => 's' + x.n + ':' + x.w + 'x' + x.reps + x.fase[0]).join(' ') + ')');
  assert.ok(al.filter(x => x.n === cima[0].n + 1)[0].fase === 'scarico', 'la settimana dopo la cima e di scarico: il passo di peso cade li');
  assert.ok(!al.some(x => /salto del/.test(x.nota) && x.n > 5), 'non e la guardia del +25% (la calibrazione e chiusa alla settimana 7): ' + al.map(x => x.nota.slice(0, 40)).join(' | '));
});

['parqPrincipiante', 'gravidanzaPrincipiante', 'minorennePrincipiante', 'over72principiante', 'over66', 'minorenne', 'parq', 'gravidanza'].forEach(chi => {
  test('ALG-19 (A1): ' + chi + ' mai una ripresa SOPRA il carico di riferimento (anche quando lo scarico coincide col riferimento)', () => {
    const r = riprese(storia(STORIE[chi]).rec);
    assert.ok(r.n >= 4, chi + ': riprese osservate ' + r.n);
    assert.deepStrictEqual(r.sopra, [], chi + ': riprese sopra il riferimento:\n' + r.sopra.join('\n'));
  });
});

test('ALG-19 (A1): gli adulti senza RIR fisso restano come prima, anche i principianti (nessuna fase di ALG-19)', () => {
  const S = { d: Object.assign({}, PALESTRA, { level: 'principiante', days: 2, goals: ['salute'], sex: 'F', age: 31, parq: 'no', seme: 'ctrl-no-salute-principiante-2-palestra' }), prof: { parq: false } };
  assert.deepStrictEqual(storia(S).rec, storia(S, { spente: ['ALG-19'] }).rec);
});
