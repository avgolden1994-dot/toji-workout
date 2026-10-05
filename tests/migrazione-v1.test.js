/* Migrazione: i programmi salvati dalla v1 devono aprirsi in ogni versione dell'app (piano coach v2, F.3 e cap. G «Migrazione»).
   Le 6 fixture di tests/fixture/programmi-v1/ sono lo stato di un telefono (localStorage: profilo, programma, piano, storico,
   aggiusti, calendario...) prodotto dal codice v1 vero e fotografato al tag coach-v2-onda-0-prima, con orologio fisso.
   Qui NON si controllano i numeri della v1 (le correzioni dell'onda 0 e le regole nuove li cambiano apposta): si controlla che
   ogni archivio si apra e si chiuda senza errori, con piani sensati, e che il coach senza consenso non tocchi nulla.
   Il banco di prova e tests/aiuto-app.js (app vera in vm, orologio fisso: la prova non dipende dal giorno in cui gira). */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp, elencoFixture, leggiFixture, VETTORI_CARICHI } = require('./aiuto-app');

const ATTESE = ['aggiusti-scarico', 'avanzato-6-giorni', 'con-bia', 'intermedio-phul', 'over65-parq', 'principiante-donna-casa'];
const TIPI_COACH = ['su', 'fermo', 'giu', 'scarico', 'nuovo'];

/* l'ultimo carico (massimo tra le serie fatte) con cui l'esercizio compare nello storico, o null */
function ultimoCarico(storia, nome) {
  for (const h of storia) {
    const e = (h.sessione || []).find(x => x.name === nome);
    if (!e) continue;
    const pesi = e.sets.filter(s => s.done).map(s => Number(s.weight) || 0);
    if (pesi.length) return Math.max(...pesi);
  }
  return null;
}

test('banco di prova: orologio e caso sono controllati', () => {
  const a = caricaApp({ ora: '2026-10-05T12:00:00' }), b = caricaApp({ ora: '2026-10-07T09:30:00' });
  assert.strictEqual(a.g('ymd(new Date())'), '2026-10-05');
  assert.strictEqual(b.g('ymd(new Date())'), '2026-10-07');
  assert.strictEqual(a.g('Date.now()'), new Date('2026-10-05T12:00:00').getTime());
  assert.strictEqual(a.g('new Date(2020, 1, 3).getFullYear()'), 2020, 'le date esplicite restano quelle date');
  assert.deepStrictEqual([a.g('Math.random()'), a.g('Math.random()')], [caricaApp().g('Math.random()'), (x => (x.g('Math.random()'), x.g('Math.random()')))(caricaApp())]);
  assert.strictEqual(a.g('currentMode'), 'toji');
  assert.strictEqual(a.g('coachAttivo()'), true);
  assert.deepStrictEqual(a.erroriCaricamento, [], 'ogni script dell app si carica');
});

test('banco di prova: i vettori di prova dei carichi tornano con la formula di Epley', () => {
  const epley = (w, r) => w * (1 + r / 30), tondo = x => Math.round(x * 10) / 10;
  const V = VETTORI_CARICHI;
  V.e1rmStima.forEach(v => assert.strictEqual(tondo(epley(v.serie.weight, v.serie.reps + (v.serie.wasBerserk ? 0 : (v.rirAssunto !== undefined ? v.rirAssunto : 10 - 8)))), v.atteso));
  assert.strictEqual(tondo(V.caricoDaE1rm[0].e1rm / (1 + (V.caricoDaE1rm[0].reps + V.caricoDaE1rm[0].rir) / 30)), V.caricoDaE1rm[0].atteso);
  const d = V.caricoDaE1rm[1], e1 = epley(d.da.weight, d.da.reps + d.da.rir);
  assert.strictEqual(tondo(e1 / (1 + (d.reps + d.rir) / 30)), d.atteso);
  /* Theil-Sen: mediana delle pendenze a coppie, in % del valore mediano, a settimana */
  const med = a => { const s = [...a].sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  V.tendenza.forEach(v => {
    const p = []; for (let i = 0; i < v.e1rm.length; i++) for (let j = i + 1; j < v.e1rm.length; j++) p.push((v.e1rm[j] - v.e1rm[i]) / (v.giorni[j] - v.giorni[i]));
    assert.ok(Math.abs(med(p) / med(v.e1rm) * 700 - v.pendenzaPctSett) < 0.06, 'pendenza ' + v.esito);
  });
  assert.deepStrictEqual(V.scaricoPiuSedute.atteso, [1, 1, 1].map(() => V.scaricoPiuSedute.caricoLavoro * V.scaricoPiuSedute.doseCarico));
});

test('le fixture v1 ci sono tutte e hanno la forma attesa', () => {
  assert.deepStrictEqual(elencoFixture(), ATTESE);
  ATTESE.forEach(nome => {
    const f = leggiFixture(nome);
    assert.strictEqual(f.nome, nome);
    assert.strictEqual(f.versione, 'v1');
    assert.ok(!isNaN(new Date(f.riferimento).getTime()), nome + ': riferimento');
    ['coach_plus_profile_toji', 'coach_plus_programma_toji', 'coach_plus_data_toji', 'coach_plus_history_toji'].forEach(k => assert.ok(f.chiavi[k], nome + ' manca ' + k));
    /* v1: nessun campo del piano v2 */
    assert.strictEqual(f.chiavi.coach_plus_programma_toji.versione, undefined, nome + ': un programma v1 non ha `versione`');
    assert.ok(Object.keys(f.chiavi).every(k => /^(coach_plus_|tz_)/.test(k)), nome + ': chiavi coach_plus_* o tz_*');
  });
  /* le sei persone del piano: principiante donna a casa, intermedio PHUL, avanzato 6 giorni, over 65 PAR-Q, con BIA, con aggiusti e scarico */
  const F = n => leggiFixture(n).chiavi;
  assert.deepStrictEqual([F('principiante-donna-casa').coach_plus_profile_toji.level, F('principiante-donna-casa').coach_plus_profile_toji.sex, F('principiante-donna-casa').coach_plus_profile_toji.luogo], ['principiante', 'donna', 'manubri']);
  assert.strictEqual(F('intermedio-phul').coach_plus_programma_toji.ispirazioni[0].id, 'phul');
  assert.strictEqual(F('avanzato-6-giorni').coach_plus_profile_toji.days, 6);
  assert.deepStrictEqual([F('over65-parq').coach_plus_profile_toji.age >= 65, F('over65-parq').coach_plus_profile_toji.parq], [true, true]);
  assert.ok(F('con-bia').coach_plus_bia_toji.length >= 2 && F('con-bia').coach_plus_profile_toji.bia, 'con-bia: referti BIA nel profilo e nello storico');
  const ag = F('aggiusti-scarico').coach_plus_aggiusti_toji;
  assert.ok(ag.scarico && ag.scarico.sedute > 0 && Object.values(ag.esercizi).some(x => x.fattore), 'aggiusti-scarico: scarico e carico ridotto attivi');
});

ATTESE.forEach(nome => {
  const apri = opz => caricaApp(Object.assign({ fixture: nome }, opz));

  test(nome + ': l\'app legge lo stato salvato', () => {
    const app = apri();
    assert.deepStrictEqual(app.erroriCaricamento, []);
    const prog = app.json('getProgramma()'), profilo = app.json('getProfile()'), storia = app.json('loadHistory()'), giorni = app.giorniAllenamento();
    assert.ok(prog && prog.inizio && prog.settimane >= 4, 'programma');
    assert.ok(profilo && profilo.level && profilo.age, 'profilo');
    assert.ok(storia.length >= 10 && storia.every(h => Array.isArray(h.sessione)), 'storico con le serie');
    assert.ok(giorni.length >= 2, 'giorni di allenamento nel piano: ' + giorni);
    const st = app.json('settimanaProgramma()');
    assert.ok(st && st.numero >= 0, 'settimana del programma alla data di riferimento');
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': apre ogni giorno di allenamento (applicaCaricoProgressivo) con piani sensati', () => {
    const app = apri();
    const storia = app.json('loadHistory()');
    app.giorniAllenamento().forEach(giorno => {
      app.g('currentDay = ' + JSON.stringify(giorno));
      const prima = app.pianoSalvato()[giorno];
      const n = app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')');
      assert.strictEqual(typeof n, 'number', giorno + ': applicaCaricoProgressivo restituisce il numero di esercizi aggiornati');
      assert.ok(n >= 1 && n <= prima.length, giorno + ': ' + n + ' esercizi aggiornati su ' + prima.length);
      const dopo = app.pianoSalvato()[giorno];
      assert.strictEqual(dopo.length, prima.length, giorno + ': nessun esercizio perso o aggiunto');
      dopo.forEach(e => {
        const id = giorno + ' / ' + e.name;
        assert.ok(Number.isFinite(e.weight) && e.weight >= 0, id + ': carico ' + e.weight);
        assert.ok(Number.isInteger(e.sets) && e.sets >= 1 && e.sets <= 12, id + ': serie ' + e.sets);
        assert.ok(Number(e.reps) >= 1 && Number(e.reps) <= 120, id + ': ripetizioni ' + e.reps);
        assert.strictEqual(e.completedSets.length, e.sets, id + ': una riga per serie');
        assert.ok(e.completedSets.every(s => !s.done && Number.isFinite(s.weight)), id + ': serie ancora da fare');
        assert.ok(typeof e.coachNote === 'string' && e.coachNote.length > 0, id + ': motivo del coach');
        assert.ok(TIPI_COACH.includes(e.coachTipo), id + ': tipo ' + e.coachTipo);
        assert.ok(Number.isFinite(e.rest) && e.rest >= 0, id + ': pausa ' + e.rest);
        /* nessun salto assurdo rispetto all'ultimo carico usato (scarichi e aumenti stanno largamente dentro) */
        const ultimo = ultimoCarico(storia, e.name);
        if (ultimo && ultimo >= 5 && e.weight > 0) assert.ok(e.weight >= ultimo * 0.4 && e.weight <= ultimo * 1.35, id + ': da ' + ultimo + ' a ' + e.weight + ' kg');
      });
    });
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': caricoProssimo risponde per ogni esercizio del piano', () => {
    const app = apri();
    const piano = app.pianoSalvato();
    app.giorniAllenamento().forEach(giorno => piano[giorno].forEach(e => {
      const r = app.dati(app.chiama('caricoProssimo', e.name, e.weight, e.reps, e.sets));
      assert.ok(r && Number.isFinite(r.weight) && Number.isFinite(r.sets) && TIPI_COACH.includes(r.tipo) && typeof r.motivo === 'string', e.name + ': ' + JSON.stringify(r));
    }));
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': aprire due volte la stessa seduta dà lo stesso piano', () => {
    const app = apri();
    const giorno = app.giorniAllenamento()[0];
    app.g('currentDay = ' + JSON.stringify(giorno));
    app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')');
    const una = JSON.stringify(app.pianoSalvato()[giorno]);
    app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')');
    assert.strictEqual(JSON.stringify(app.pianoSalvato()[giorno]), una);
  });

  test(nome + ': senza consenso il coach non tocca il piano', () => {
    const app = apri({ consenso: false });
    const prima = app.store[app.g('dataKey()')];
    assert.strictEqual(app.g('coachAttivo()'), false);
    app.giorniAllenamento().forEach(giorno => assert.strictEqual(app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')'), 0));
    assert.strictEqual(app.store[app.g('dataKey()')], prima, 'il piano salvato e identico');
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': chiude una seduta (endWorkout) e lo storico cresce di una', () => {
    const app = apri();
    const giorno = app.giorniAllenamento()[0];
    app.g('currentDay = ' + JSON.stringify(giorno));
    app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')');
    const piano = app.pianoSalvato();
    piano[giorno].forEach(e => e.completedSets.forEach(s => { s.done = true; s.rpe = 8; }));
    app.scrivi(app.g('dataKey()'), piano);
    const nStoria = app.json('loadHistory().length'), agPrima = app.json('aggiustiCoach()');
    app.g('endWorkout()');
    const storia = app.json('loadHistory()');
    assert.strictEqual(storia.length, nStoria + 1, 'una seduta in piu nello storico');
    assert.strictEqual(storia[0].day, giorno);
    assert.deepStrictEqual(storia[0].sessione.map(e => e.name), piano[giorno].map(e => e.name), 'le stesse serie nello stesso ordine');
    assert.ok(storia[0].sessione.every(e => e.sets.every(s => s.done)), 'serie fatte');
    assert.ok(app.pianoSalvato()[giorno].every(e => e.completedSets.every(s => !s.done)), 'il piano torna da fare');
    /* uno scarico deciso dal coach vale una seduta: dopo averla fatta si consuma */
    if (agPrima.scarico) { const dopo = app.json('aggiustiCoach()').scarico; assert.ok(!dopo || dopo.sedute < agPrima.scarico.sedute, 'scarico consumato'); }
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': il questionario di fine seduta decide e si annulla (archivio identico)', () => {
    const app = apri();
    const giorno = app.giorniAllenamento()[0];
    const nomi = app.pianoSalvato()[giorno].map(e => e.name);
    const fb = { srpe: 9, arrivo: 'stanco', carichi: 'pesanti', dolore: true, zone: ['spalla'], livello: 4, coinvolti: [nomi[0]], esercizi: nomi };
    app.ctx.__fb = app.g('JSON.parse(' + JSON.stringify(JSON.stringify(fb)) + ')');
    const chiavi = [app.g('dataKey()'), app.g('AGG_KEY()'), app.g('restKey()')];
    const prima = chiavi.map(k => app.store[k]);
    const dec = app.dati(app.g('decisioniCoach(__fb, [])'));
    assert.ok(Array.isArray(dec) && dec.length >= 1 && dec.every(d => typeof d.tipo === 'string' && typeof d.testo === 'string'), 'decisioni con testo');
    app.ctx.__dec = app.g('decisioniCoach(__fb, [])');
    const annulla = app.g('applicaDecisioni(__dec, __fb)');
    assert.strictEqual(typeof annulla, 'function', 'applicaDecisioni restituisce la funzione di annulla');
    annulla();
    assert.deepStrictEqual(chiavi.map(k => app.store[k]), prima, 'dopo Annulla piano, aggiusti e giorni di riposo sono identici');
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': le analisi del coach leggono lo storico senza errori', () => {
    const app = apri();
    const v = app.json('verdettoCiclo()');
    assert.ok(v && typeof v.esito === 'string' && Number.isFinite(v.aderenza) && Number.isFinite(v.quota), 'verdetto di ciclo ' + JSON.stringify(v));
    const l = app.json('livelloStimato()');
    assert.ok(l === null || typeof l.livello === 'string', 'livello stimato');
    app.g('eserciziFermi()'); app.g('aggiornaEsigenza()'); app.g('bilancioPrimeSedute()'); app.g('strainSettimane()');
    assert.deepStrictEqual(app.errori, []);
  });

  test(nome + ': al prossimo ciclo il programma si rifà dal profilo salvato (nuovoCiclo)', () => {
    const app = apri();
    const prima = { storia: app.json('loadHistory().length'), profilo: app.json('getProfile()'), vecchio: app.json('getProgramma()') };
    app.g('nuovoCiclo(true)');
    const prog = app.json('getProgramma()'), profilo = app.json('getProfile()');
    assert.ok(prog && prog.settimane >= 4 && prog.inizio >= prima.vecchio.inizio, 'nuovo programma salvato');
    assert.ok(app.giorniAllenamento().length >= 2, 'piano della settimana ricostruito');
    assert.strictEqual(app.json('loadHistory().length'), prima.storia, 'lo storico non si tocca');
    ['sex', 'age', 'luogo', 'parq'].forEach(k => assert.strictEqual(profilo[k], prima.profilo[k], k + ' del profilo conservato'));
    assert.deepStrictEqual(app.errori, []);
  });
});
