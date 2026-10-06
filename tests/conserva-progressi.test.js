/* Programma azzerato, progressi e carichi salvati (P3-M, D-P23).
   Decisione del proprietario (unico utente dell'app): azzerare e rigenerare il programma va bene, PURCHE si salvino i progressi
   (lo storico delle sedute) e i carichi (gli ultimi carichi e il massimale stimato di ogni esercizio). Nessuna migrazione dei programmi v1:
   si rifanno, e i dati personali restano.

   COSA PROVA (app vera in vm, tests/aiuto-app.js, orologio fisso: lunedi 2026-10-05):
   1. «Rifai il programma» (nuovoCiclo, il ciclo successivo) e il questionario rifatto da capo (restartOnboarding -> onbNext), anche cambiando livello,
      giorni, minuti, luogo e attrezzi: lo storico delle sedute resta byte per byte lo stesso, come tutte le chiavi coach_plus_* / tz_* che la
      rigenerazione non deve toccare (aggiusti, BIA, pesi, prontezza...); l'insieme delle chiavi non cambia (nessuna chiave nuova); i giorni gia fatti del
      calendario restano.
   2. Gli ultimi carichi e il massimale stimato per nome di esercizio si leggono ancora uguali; un esercizio gia svolto riparte dal suo ultimo carico (nel Piano e quando
      si apre la seduta, mai `nuovo`), un esercizio nuovo (senza storico) dalla stima di partenza con il suo motivo.
   3. I dati personali che la rigenerazione non chiede (sesso, peso, altezza, questionario sulla salute, fastidi, referto BIA) non si perdono: sono quelli che
      decidono prudenza ed esclusioni del programma nuovo.
   4. Il backup (js/core/backup.js) comprende storico, aggiusti e piano, e un backup fatto PRIMA di rifare il programma lo riporta com era.
   5. I 6 programmi salvati dalla v1 (tests/fixture/programmi-v1) si aprono e si rifanno con le stesse garanzie.
   NON prova: i numeri della progressione (carichi-golden), la bonta del programma nuovo (collaudo), una seduta a meta (le serie fatte ma non chiuse stanno nel piano
   e il piano si rifa: aperto), il browser (tests/browser). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp, elencoFixture, leggiFixture } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';   /* lunedi */
const GIORNI_STORIA = [0.2, 2, 5, 9, 12, 16, 19, 23, 26];   /* la prima e di stamattina; 9 sedute, la piu recente per prima */
const DATI_PERSONALI = ['sex', 'age', 'weight', 'height', 'parq', 'fastidi', 'graditi', 'odiati', 'psico', 'test', 'freq', 'esigenza'];

const chiaviApp = app => Object.keys(app.store).filter(k => /^(coach_plus_|tz_)/.test(k)).sort();
const grezzo = app => { const o = {}; chiaviApp(app).forEach(k => { o[k] = app.store[k]; }); return o; };
/* le sole chiavi che una rigenerazione riscrive: piano, titoli, riposo, calendario, programma, profilo, onboarding fatto */
const riscritte = app => app.g('[dataKey(), titlesKey(), restKey(), calKey(), progKey(), PROFILE_KEY(), ONB_KEY]');
const nomiPiano = piano => { const n = []; Object.keys(piano).forEach(g => piano[g].forEach(e => { if (n.indexOf(e.name) === -1) n.push(e.name); })); return n; };
const J = x => JSON.stringify(x);
/* «non risposto» puo stare come null, undefined o oggetto vuoto: sono lo stesso dato */
const vuotoOgetto = x => (x === null || x === undefined || (typeof x === 'object' && !Array.isArray(x) && !Object.keys(x).length)) ? null : x;

/* chi si e allenato: profilo, programma v2 di partenza (nuovoCiclo), orologio fisso */
const UTENTI = {
  'donna di 52 anni, PAR-Q positivo, fastidi alle ginocchia': { forza: 0.7, profilo: { level: 'intermedio', sex: 'donna', age: 52, weight: 64, height: 165, days: 3, minutes: 60, luogo: 'palestra', goals: ['massa'],
    fastidi: ['ginocchia'], sonno: 'bene', attrezzi: 'indifferente', freq: '2', parq: true, graditi: ['💪 Panca Piana Bilanciere'], odiati: ['🦵 Leg Extension'], psico: { sfida: 'si' }, test: { stance: 'media' } } },
  'uomo allenato di 34 anni': { forza: 1.3, profilo: { level: 'avanzato', sex: 'uomo', age: 34, weight: 82, height: 180, days: 4, minutes: 75, luogo: 'palestra', goals: ['massa'],
    fastidi: [], sonno: 'bene', attrezzi: 'liberi', freq: '2', parq: false, graditi: [], odiati: [] } },
  /* il caso della migrazione: il programma di adesso (iniziato il 7 settembre, scarico alla 4a settimana) ha appena avuto la sua settimana di scarico; le due sedute di scarico sono quelle
     piu recenti e lo storico non dice che erano di scarico (come le voci della v1): lo dice solo il programma, che si sta per buttare */
  'uomo di 41 anni appena uscito da una settimana di scarico': { forza: 1.2, giorni: [2, 5, 9, 12, 16, 19, 23, 26], scarichi: [0, 1], profilo: { level: 'intermedio', sex: 'uomo', age: 41, weight: 78, height: 176, days: 4, minutes: 60, luogo: 'palestra',
    goals: ['massa'], fastidi: [], sonno: 'bene', attrezzi: 'liberi', freq: '2', parq: false, graditi: [], odiati: [] } }
};
/* come si rifa il programma: da «Rifai il programma» / ciclo successivo, o rifacendo il questionario con qualche risposta cambiata
   (si risponde SOLO a cio che il questionario chiede per forza: obiettivi, livello, giorni, minuti, luogo, sonno, attrezzi, frequenza) */
const VARIANTI = [
  { id: 'ciclo successivo con lo stesso profilo (nuovoCiclo)', via: 'ciclo' },
  { id: 'questionario rifatto, stesse risposte', via: 'questionario', risposte: {} },
  { id: 'questionario: livello avanzato, 5 giorni', via: 'questionario', risposte: { level: 'avanzato', days: 5 } },
  { id: 'questionario: principiante, 2 giorni, 45 minuti', via: 'questionario', risposte: { level: 'principiante', days: 2, minutes: 45 } },
  { id: 'questionario: a casa con i manubri', via: 'questionario', risposte: { luogo: 'manubri', attrezzi: 'liberi' } },
  { id: 'questionario: a corpo libero', via: 'questionario', risposte: { luogo: 'corpo', attrezzi: 'indifferente' }, sovrapposti: 0 /* a corpo libero non torna nessun esercizio con il carico: restano leggibili per nome */ }
];

function rifai(app, v) {
  if (v.via === 'ciclo') { app.g('nuovoCiclo(true)'); return; }
  const p = app.leggi(app.chiave('PROFILE_KEY'));
  app.ctx.confirm = () => true; app.ctx.alert = () => {};
  app.g('restartOnboarding()');   /* conferma, poi startOnboarding(true): onbData ripartito dal profilo salvato */
  const risposte = Object.assign({ goals: p.goals, level: p.level, days: p.days, minutes: p.minutes, luogo: p.luogo, sonno: p.sonno, attrezzi: p.attrezzi, freq: p.freq }, v.risposte || {});
  app.g('Object.assign(onbData, ' + J(risposte) + '); onbStep = ONB_ULTIMO; onbNext()');   /* l ultimo passo del questionario */
}

function creaBase(utente) {
  const app = caricaApp({ ora: ORA });
  app.profilo(utente.profilo);
  app.scrivi('tz_onboarded', '1');
  app.g('nuovoCiclo(true)');
  return app;
}
/* gli esercizi con il carico (non a tempo, non a corpo libero) che compaiono nel piano */
const conCarico = (app, piano) => nomiPiano(piano).filter(n => piano[Object.keys(piano).find(g => piano[g].some(e => e.name === n))].find(e => e.name === n).weight > 0 && !app.g('isTimeBased(' + J(n) + ')'));

/* lo storico di chi si allena da 4 settimane: 9 sedute (la piu recente per prima), 3 serie ciascuno, carichi che salgono, RPE segnati.
   Gli esercizi sono quelli del vecchio piano e del nuovo (cosi alcuni tornano e altri no) */
function seminaStoria(app, nomi, utente, pianoVecchio) {
  const storia = [], cal = {}, giorni = utente.giorni || GIORNI_STORIA, scarichi = utente.scarichi || [];
  if (scarichi.length) {   /* il programma di adesso: iniziato il 7 settembre, scarico alla 4a settimana (28 settembre - 4 ottobre) */
    const pr = app.leggi(app.chiave('progKey'));
    pr.inizio = '2026-09-07'; pr.fasi = Array.from({ length: pr.settimane }, (_, i) => i === 3 ? 'scarico' : 'carico');
    app.scrivi(app.chiave('progKey'), pr);
  }
  giorni.forEach((g, i) => {
    const h = app.seduta(g, nomi.map((n, j) => {
      const m = app.json('findExercise(' + J(n) + ')') || { weight: 20, reps: 10 };
      const rec = Object.keys(pianoVecchio).map(d => pianoVecchio[d].find(e => e.name === n)).find(Boolean);
      const reps = Math.min(12, (rec && rec.reps) || m.reps || 10);   /* il massimale stimato (Epley) si calcola fino a 12 ripetizioni */
      const lavoro = Math.max(2.5, Math.round(m.weight * utente.forza / 2.5) * 2.5) + 2.5 * Math.floor((giorni.length - 1 - i) / 2);
      const w = scarichi.indexOf(i) !== -1 ? Math.round(lavoro * 0.9 * 2) / 2 : lavoro;   /* scarico: -10% */
      return { nome: n, serie: [[w, reps, true, 7.5], [w, reps, true, 8], [w, reps, true, 8.5]] };
    }), { day: ['Lunedì', 'Mercoledì', 'Venerdì'][i % 3] });
    storia.push(h);
    cal[app.ymd(h.id)] = { title: h.day, day: h.day, items: h.sessione.map(e => ({ name: e.name, sets: e.sets.length, reps: '' })), done: true, doneAt: h.date, historyId: h.id, sessione: h.sessione, summary: 'tutte le serie' };
  });
  app.storia(storia);
  /* il calendario ha gia le settimane del programma di partenza: i giorni fatti si aggiungono */
  const c0 = app.leggi(app.chiave('calKey')) || {};
  app.scrivi(app.chiave('calKey'), Object.assign(c0, cal));
  /* le altre cose che sono «progressi» e che il programma non deve toccare */
  app.aggiusti({ esercizi: {}, scarico: null, rirBias: 0.5, stalli: { [nomi[1]]: 1 } });
  app.scrivi(app.g('biaKey()'), [{ data: '2026-08-01', valori: { peso: 66, fmPerc: 27, ffm: 48 } }, { data: '2026-09-15', valori: { peso: 64.5, fmPerc: 26, ffm: 47.8 } }]);
  app.scrivi(app.g('pesoKey()'), [{ data: '2026-09-20', kg: 64.8 }, { data: '2026-09-29', kg: 64.4 }]);
  app.scrivi(app.g('PRONTEZZA_KEY()'), { data: '2026-10-04', day: 'Lunedì', punteggio: 75 });
  app.scrivi('coach_plus_prontezza_storia_toji', [{ data: '2026-10-01', punteggio: 80 }, { data: '2026-10-04', punteggio: 75 }]);
  app.scrivi('tz_ultimo_backup', '2026-09-30');
}

/* lo storico dopo una rigenerazione: gli stessi record; l unica aggiunta ammessa e `settimana` (settimana e fase) dove la voce non l aveva, cioe il fatto «era di scarico» che prima stava nel programma */
function storiaIntatta(prima, dopo, msg) {
  const a = JSON.parse(prima), b = JSON.parse(dopo);
  assert.strictEqual(b.length, a.length, msg + ': stesso numero di sedute');
  a.forEach((h, i) => { const x = JSON.parse(JSON.stringify(b[i])); if (h.settimana === undefined) delete x.settimana; assert.deepStrictEqual(x, h, msg + ': la seduta ' + i + ' e uguale'); });
  return b;
}
const lettura = (app, n) => app.dati(app.g('(() => { const n = ' + J(n) + ', u = ultimeSessioni(n, 1)[0]; return { ultimo: pesoUltimoDi(n), e1rm: u ? e1rmSeduta(u) : 0, riferimento: caricoRiferimento(n), sedute: ultimeSessioni(n, 99).length }; })()'));
/* il carico che il Piano mostra per un esercizio con lo storico: quello dell ultima seduta non di scarico (entro 28 giorni), altrimenti l ultimo usato */
const caricoDiLavoro = l => l.riferimento > 0 ? l.riferimento : l.ultimo.weight;
const proposta = (app, n, reps, serie) => app.dati(app.chiama('caricoProssimo', n, 0, reps, serie));
/* la fascia di una proposta dopo l ultimo carico: -10% (due mancati) o +5 kg (un passo delle gambe), con un po di margine */
const FUORI = (w, ult) => w < ult * 0.85 - 0.5 || w > ult * 1.1 + 5;

/* le garanzie, uguali per ogni utente e ogni modo di rifare il programma. `X` = gli esercizi con lo storico; `prima` = lo stato prima di rifare */
function verifica(app, X, prima, etichetta, opz) {
  opz = opz || {};
  const dopo = grezzo(app);
  assert.deepStrictEqual(app.errori, [], etichetta + ': nessun errore');
  /* 1. lo storico e le chiavi */
  const hk = app.g('historyKey()');
  const storiaDopo = storiaIntatta(prima.stato[hk], dopo[hk], etichetta + ': lo storico delle sedute');
  if (!opz.scarichi) assert.strictEqual(dopo[hk], prima.stato[hk], etichetta + ': lo storico delle sedute e identico, byte per byte');
  else {   /* le due sedute di scarico portano l etichetta, le altre no: il programma di prima non sapeva niente di loro */
    assert.deepStrictEqual(storiaDopo.map(h => h.settimana && h.settimana.fase), storiaDopo.map((h, i) => opz.scarichi.indexOf(i) !== -1 ? 'scarico' : 'carico'), etichetta + ': la fase di ogni seduta, dal programma di prima');
    assert.deepStrictEqual(storiaDopo.map(h => h.settimana.numero), [4, 4, 3, 3, 2, 2, 1, 1], etichetta + ': e la settimana');
  }
  assert.deepStrictEqual(Object.keys(dopo), Object.keys(prima.stato), etichetta + ': stesse chiavi coach_plus_* / tz_*, nessuna chiave nuova');
  const rs = riscritte(app);
  Object.keys(prima.stato).filter(k => rs.indexOf(k) === -1 && k !== hk).forEach(k => assert.strictEqual(dopo[k], prima.stato[k], etichetta + ': ' + k + ' non e toccata dalla rigenerazione'));
  /* i giorni gia fatti del calendario restano, con la seduta dentro */
  const cal0 = JSON.parse(prima.stato[app.g('calKey()')]), cal1 = JSON.parse(dopo[app.g('calKey()')]);
  const fatti = Object.keys(cal0).filter(k => cal0[k].done);
  assert.ok(fatti.length >= 8, etichetta + ': giorni fatti nel calendario di partenza ' + fatti.length);
  fatti.forEach(k => assert.deepStrictEqual(cal1[k], cal0[k], etichetta + ': il giorno fatto ' + k + ' resta'));
  /* 2. gli ultimi carichi e i massimali per nome di esercizio */
  X.forEach(n => assert.deepStrictEqual(lettura(app, n), prima.letture[n], etichetta + ': ultimo carico, massimale stimato e sedute di ' + n));
  assert.ok(X.every(n => prima.letture[n].ultimo && prima.letture[n].ultimo.weight > 0 && prima.letture[n].e1rm > 0 && prima.letture[n].sedute >= 8), etichetta + ': la prova parte da almeno 8 sedute per ogni esercizio con storico');
  /* il carico proposto riparte dall ultimo, anche per un esercizio che nel programma nuovo non c e piu (lo aggiunge a mano, o torna) */
  X.forEach(n => {
    const r = proposta(app, n, 10, 3), u = caricoDiLavoro(prima.letture[n]);
    assert.notStrictEqual(r.tipo, 'nuovo', etichetta + ': ' + n + ' ha lo storico');
    assert.ok(!FUORI(r.weight, u), etichetta + ': ' + n + ' propone ' + r.weight + ' kg dopo ' + u + ' kg');
    /* con lo stesso profilo (il ciclo successivo) la proposta e la stessa di prima di rifare il programma, kg per kg */
    if (opz.stessaProposta) assert.strictEqual(r.weight, prima.proposte[n].weight, etichetta + ': ' + n + ' propone lo stesso carico di prima (' + prima.proposte[n].weight + ' kg, ' + prima.proposte[n].tipo + ')');
  });
  /* 3. il piano nuovo: chi ha lo storico mostra il suo ultimo carico, chi e nuovo la stima di partenza */
  const piano = app.pianoSalvato(), anteprima = {};
  Object.keys(piano).forEach(g => piano[g].forEach(e => { anteprima[g + '|' + e.name] = e.weight; }));
  const nelPiano = nomiPiano(piano), conStorico = nelPiano.filter(n => X.indexOf(n) !== -1), nuovi = nelPiano.filter(n => X.indexOf(n) === -1);
  assert.ok(conStorico.length >= (opz.sovrapposti === undefined ? 2 : opz.sovrapposti), etichetta + ': nel programma nuovo tornano esercizi con lo storico (' + conStorico.length + ')');
  assert.ok(nuovi.length >= 2, etichetta + ': nel programma nuovo ci sono esercizi senza storico (' + nuovi.length + ')');
  Object.keys(piano).forEach(g => piano[g].filter(e => X.indexOf(e.name) !== -1).forEach(e =>
    assert.strictEqual(e.weight, caricoDiLavoro(prima.letture[e.name]), etichetta + ': nel Piano ' + e.name + ' mostra il suo carico di lavoro, non una stima (' + e.weight + ' kg)')));
  /* apertura di ogni giorno di allenamento (applicaCaricoProgressivo, come openWorkoutDay) */
  app.giorniAllenamento().forEach(g => {
    app.g('currentDay = ' + J(g));
    app.g('applicaCaricoProgressivo(' + J(g) + ')');
    app.pianoSalvato()[g].forEach(e => {
      const id = etichetta + ' / ' + g + ' / ' + e.name;
      if (X.indexOf(e.name) !== -1) {
        const u = caricoDiLavoro(prima.letture[e.name]);
        assert.notStrictEqual(e.coachTipo, 'nuovo', id + ': e un esercizio gia svolto');
        assert.ok(!FUORI(e.weight, u), id + ': apre con ' + e.weight + ' kg dopo ' + u + ' kg');
      } else {
        assert.strictEqual(e.coachTipo, 'nuovo', id + ': senza storico e nuovo');
        assert.strictEqual(e.weight, anteprima[g + '|' + e.name], id + ': parte dalla stima di partenza del programma');
        if (e.stimato) assert.strictEqual(e.coachNote, app.g('MOTIVI_STIMA[' + J(e.stimato) + ']'), id + ': dice che e una stima');
      }
    });
  });
  assert.deepStrictEqual(app.errori, [], etichetta + ': nessun errore aprendo le sedute');
  /* il programma e il piano sono veri e nuovi */
  const prog = app.json('getProgramma()');
  assert.ok(prog && prog.settimane >= 4 && prog.inizio, etichetta + ': programma salvato');
  assert.ok(app.giorniAllenamento().length >= 2, etichetta + ': piano della settimana ricostruito');
}

/* lo stato di partenza di un utente con lo storico e cio che si misura prima di rifare */
function preparaCaso(utente, variante) {
  /* gli esercizi dello storico: i primi 3 del piano di adesso e i primi 4 del piano che il programma nuovo scegliera (cosi qualcuno torna e qualcuno no) */
  const prova = creaBase(utente), vecchiTutti = conCarico(prova, prova.pianoSalvato());
  rifai(prova, variante);
  const nuoviTutti = conCarico(prova, prova.pianoSalvato());
  const nuoviEs = nuoviTutti.slice(0, 4);
  const vecchi = vecchiTutti.filter(n => nuoviEs.indexOf(n) === -1).slice(0, Math.max(3, 7 - nuoviEs.length));
  const X = vecchi.concat(nuoviEs);
  const app = creaBase(utente);
  seminaStoria(app, X, utente, app.pianoSalvato());
  const prima = { stato: grezzo(app), letture: {}, proposte: {}, profilo: app.leggi(app.chiave('PROFILE_KEY')) };
  X.forEach(n => { prima.letture[n] = lettura(app, n); prima.proposte[n] = proposta(app, n, 10, 3); });
  return { app, X, prima };
}

Object.keys(UTENTI).forEach(nomeUtente => {
  const utente = UTENTI[nomeUtente];
  VARIANTI.filter(v => !utente.scarichi || v.id.indexOf('stessa') !== -1 || v.via === 'ciclo').forEach(v => {
    test('«Rifai il programma» (' + v.id + ') per ' + nomeUtente + ': storico e carichi si conservano', () => {
      const { app, X, prima } = preparaCaso(utente, v);
      assert.strictEqual(X.length >= 5, true, 'almeno 5 esercizi con lo storico');
      rifai(app, v);
      verifica(app, X, prima, v.id, { sovrapposti: v.sovrapposti, scarichi: utente.scarichi, stessaProposta: v.via === 'ciclo' });
      /* il profilo: i dati che il questionario non chiede non si perdono (sono quelli che decidono prudenza ed esclusioni) */
      const p = app.leggi(app.chiave('PROFILE_KEY'));
      DATI_PERSONALI.forEach(k => { if (prima.profilo[k] !== undefined) assert.deepStrictEqual(vuotoOgetto(p[k]), vuotoOgetto(prima.profilo[k]), v.id + ': il profilo conserva ' + k); });
      const prog = app.json('getProgramma()');
      assert.deepStrictEqual(prog.prefs.fastidi, utente.profilo.fastidi.filter(f => f !== 'nessuno'), v.id + ': i fastidi stanno anche nel programma');
      if (utente.profilo.fastidi.length) assert.ok(prog.prefs.esclusi.length > 2, v.id + ': i fastidi escludono esercizi (' + prog.prefs.esclusi.length + ')');
    });
  });
});

test('il programma si rifa due volte di fila (ciclo e questionario) senza perdere niente', () => {
  const utente = UTENTI['uomo allenato di 34 anni'];
  const { app, X, prima } = preparaCaso(utente, VARIANTI[1]);
  rifai(app, VARIANTI[0]);
  rifai(app, VARIANTI[2]);
  const dopo = grezzo(app), hk = app.g('historyKey()');
  assert.strictEqual(dopo[hk], prima.stato[hk], 'storico identico dopo due rigenerazioni');
  X.forEach(n => assert.deepStrictEqual(lettura(app, n), prima.letture[n], n));
  assert.strictEqual(dopo[app.g('AGG_KEY()')], prima.stato[app.g('AGG_KEY()')], 'aggiusti identici');
  assert.deepStrictEqual(app.errori, []);
});

/* ---- il referto BIA e il profilo ---- */
test('rifare il programma non aggiunge misure BIA finte allo storico dei referti', () => {
  [VARIANTI[0], VARIANTI[1]].forEach(v => {
    const app = caricaApp({ ora: ORA });
    /* un referto inserito a mano non ha la data: il profilo lo tiene, lo storico dei referti ha la sua misura datata */
    app.profilo({ level: 'intermedio', sex: 'uomo', age: 35, weight: 80, height: 178, days: 3, minutes: 60, luogo: 'palestra', goals: ['massa'], fastidi: [], sonno: 'bene', attrezzi: 'indifferente', freq: '2', parq: false, bia: { peso: 80, fmPerc: 20, ffm: 64 } });
    app.scrivi(app.g('biaKey()'), [{ data: '2026-08-01', valori: { peso: 81, fmPerc: 21, ffm: 64 } }]);
    app.scrivi('tz_onboarded', '1');
    const prima = app.store[app.g('biaKey()')];
    rifai(app, v);
    assert.strictEqual(app.store[app.g('biaKey()')], prima, v.id + ': i referti BIA restano quelli di prima');
    assert.deepStrictEqual(app.json('getProfile().bia'), { peso: 80, fmPerc: 20, ffm: 64 }, v.id + ': il referto resta anche nel profilo');
    assert.deepStrictEqual(app.errori, []);
  });
});

test('senza il consenso del coach il programma si rifa lo stesso e lo storico resta (carichi della libreria, niente dati usati)', () => {
  const utente = UTENTI['uomo allenato di 34 anni'];
  const { app, X, prima } = preparaCaso(utente, VARIANTI[0]);
  app.consenso(false);
  app.g('nuovoCiclo(true)');
  const dopo = grezzo(app), hk = app.g('historyKey()');
  assert.strictEqual(dopo[hk], prima.stato[hk], 'storico identico');
  assert.strictEqual(dopo[app.g('AGG_KEY()')], prima.stato[app.g('AGG_KEY()')], 'aggiusti identici');
  assert.strictEqual(app.g('coachAttivo()'), false);
  X.forEach(n => assert.deepStrictEqual(lettura(app, n), prima.letture[n], n + ': ultimo carico e massimale ancora leggibili'));
  /* il questionario senza consenso non parte e non tocca niente */
  const stato = grezzo(app);
  app.ctx.alert = () => {}; app.ctx.confirm = () => true;
  app.g('restartOnboarding()');
  assert.deepStrictEqual(grezzo(app), stato, 'restartOnboarding senza consenso non scrive');
  assert.deepStrictEqual(app.errori, []);
});

/* ---- backup e ripristino ---- */
test('il backup comprende storico, aggiusti e carichi del piano, e un backup fatto prima di rifare il programma lo riporta com era', () => {
  const utente = UTENTI['donna di 52 anni, PAR-Q positivo, fastidi alle ginocchia'];
  const { app, X, prima } = preparaCaso(utente, VARIANTI[2]);
  const foto = app.dati(app.g('fotografia()'));
  const hk = app.g('historyKey()'), ak = app.g('AGG_KEY()'), dk = app.g('dataKey()'), bk = app.g('biaKey()'), pk = app.g('pesoKey()');
  [hk, ak, dk, bk, pk, app.g('progKey()'), app.g('PROFILE_KEY()'), app.g('calKey()')].forEach(k => assert.ok(k in foto, 'il backup comprende ' + k));
  assert.strictEqual(foto[hk], prima.stato[hk], 'lo storico nel backup e quello vero');
  assert.strictEqual(app.g('contaAllenamenti(fotografia())'), GIORNI_STORIA.length, 'il backup dice quanti allenamenti contiene');

  rifai(app, VARIANTI[2]);
  const nuovo = app.dati(app.g('fotografia()'));
  assert.strictEqual(nuovo[hk], prima.stato[hk], 'dopo aver rifatto il programma il backup ha ancora lo stesso storico');
  assert.notStrictEqual(nuovo[dk], foto[dk], 'il piano e cambiato');

  /* a) ripristino su un telefono vuoto: storico e carichi ci sono, le proposte sono le stesse */
  const altro = caricaApp({ ora: ORA });
  altro.ctx.__foto = altro.g('JSON.parse(' + J(J(nuovo)) + ')');
  altro.g('applicaFotografia(__foto, true)');
  assert.strictEqual(altro.store[hk], nuovo[hk], 'storico ripristinato');
  assert.strictEqual(altro.store[dk], nuovo[dk], 'piano ripristinato');
  altro.consenso(true);
  X.forEach(n => { assert.deepStrictEqual(lettura(altro, n), prima.letture[n], n + ': ultimo carico e massimale dopo il ripristino'); assert.deepStrictEqual(proposta(altro, n, 10, 3), proposta(app, n, 10, 3), n + ': stessa proposta di carico'); });

  /* b) ripristino del backup di PRIMA sul telefono dove il programma e stato rifatto: tutto com era (Annulla dopo il ripristino ha la stessa strada) */
  app.ctx.__prima = app.g('JSON.parse(' + J(J(foto)) + ')');
  app.g('applicaFotografia(__prima, true)');
  const tornato = grezzo(app);
  Object.keys(prima.stato).forEach(k => { if (!/^tz_consenso/.test(k)) assert.strictEqual(tornato[k], prima.stato[k], 'dopo il ripristino ' + k + ' e com era'); });
  assert.deepStrictEqual(Object.keys(tornato), Object.keys(prima.stato), 'stesse chiavi dopo il ripristino');
  assert.deepStrictEqual(app.errori, []);
});

/* ---- i programmi salvati dalla v1 ---- */
elencoFixture().forEach(nome => {
  ['ciclo', 'questionario'].forEach(via => {
    test('programma v1 «' + nome + '»: si apre e si rifa (' + via + ') senza perdere storico e carichi', () => {
      const app = caricaApp({ fixture: nome });
      const f = leggiFixture(nome);
      assert.strictEqual(app.json('getProgramma().versione'), undefined, 'e un programma v1');
      /* si apre come prima (nessun errore, piano coerente) */
      app.giorniAllenamento().forEach(g => { app.g('currentDay = ' + J(g)); assert.ok(app.g('applicaCaricoProgressivo(' + J(g) + ')') >= 1, g + ': si apre'); });
      assert.ok(app.json('settimanaProgramma()'), 'settimana del programma');
      assert.deepStrictEqual(app.errori, []);
      /* aprirlo ha riscritto il piano del giorno (carichi della seduta): lo stato vero e quello di adesso */
      const storia = app.json('loadHistory()'), conta = {};
      storia.forEach(h => (h.sessione || []).forEach(e => { if (e.sets.some(s => s.done)) conta[e.name] = (conta[e.name] || 0) + 1; }));
      const X = Object.keys(conta).filter(n => conta[n] >= 3 && app.json('findExercise(' + J(n) + ')') && !app.g('isTimeBased(' + J(n) + ')'));
      assert.ok(storia.length >= 10 && X.length >= 5, nome + ': storico di almeno 10 sedute su almeno 5 esercizi (' + storia.length + ', ' + X.length + ')');
      const prima = { stato: grezzo(app), letture: {}, proposte: {}, profilo: app.leggi(app.chiave('PROFILE_KEY')), fase: app.json('settimanaProgramma().fase') };
      X.forEach(n => { prima.letture[n] = lettura(app, n); prima.proposte[n] = proposta(app, n, 8, 3); });
      rifai(app, via === 'ciclo' ? { via: 'ciclo' } : { via: 'questionario' });   /* le stesse risposte di prima: livello, giorni, minuti, luogo, sonno, attrezzi */
      const dopo = grezzo(app), hk = app.g('historyKey()'), rs = riscritte(app);
      assert.deepStrictEqual(app.errori, [], 'nessun errore');
      /* lo storico e lo stesso; le voci della v1 non dicevano in che fase del programma erano e lo dicevano solo le settimane del programma di prima: ora la dicono loro */
      const storiaDopo = storiaIntatta(prima.stato[hk], dopo[hk], 'lo storico delle sedute');
      assert.ok(storiaDopo.filter(h => !JSON.parse(prima.stato[hk]).some(x => x.id === h.id && x.settimana)).every(h => h.settimana === undefined || (typeof h.settimana.fase === 'string' && h.settimana.numero >= 1)), 'solo settimana e fase si aggiungono');
      /* nessuna chiave sparisce e nessuna nasce, salvo `tz_onboarded` (la scrive la creazione di un programma: un telefono vero ce l ha gia) */
      assert.deepStrictEqual(Object.keys(prima.stato).filter(k => !(k in dopo)), [], 'nessuna chiave sparisce');
      assert.deepStrictEqual(Object.keys(dopo).filter(k => !(k in prima.stato)), (f.chiavi.tz_onboarded === undefined ? ['tz_onboarded'] : []), 'nessuna chiave nuova');
      Object.keys(prima.stato).filter(k => rs.indexOf(k) === -1 && k !== hk).forEach(k => assert.strictEqual(dopo[k], prima.stato[k], k + ' non e toccata'));
      const cal0 = JSON.parse(prima.stato[app.g('calKey()')]), cal1 = JSON.parse(dopo[app.g('calKey()')]);
      Object.keys(cal0).filter(k => cal0[k].done).forEach(k => assert.deepStrictEqual(cal1[k], cal0[k], 'giorno fatto ' + k));
      X.forEach(n => assert.deepStrictEqual(lettura(app, n), prima.letture[n], n + ': ultimo carico e massimale'));
      /* la proposta riparte dall ultimo carico (con scarichi e aggiusti del coach nella fixture: stessa fascia larga della prova di migrazione) */
      const nelPiano = nomiPiano(app.pianoSalvato()), scaricoDelCoach = app.json('((aggiustiCoach() || {}).scarico || {}).sedute > 0');
      X.forEach(n => {
        const r = proposta(app, n, 8, 3), u = prima.letture[n].ultimo.weight;
        assert.notStrictEqual(r.tipo, 'nuovo', n + ': ha lo storico');
        assert.ok(u < 5 || (r.weight >= u * 0.4 && r.weight <= u * 1.35), n + ' propone ' + r.weight + ' kg dopo ' + u + ' kg');
        /* con lo stesso profilo il carico proposto e lo stesso di prima, kg per kg (se nel programma di prima non era in corso una settimana di scarico, che il programma nuovo non ha, e se l esercizio e nel piano
           nuovo: la calibrazione rapida del carico stimato, CAR-18, vale solo per gli esercizi del piano) */
        if (via === 'ciclo' && prima.fase !== 'scarico' && nelPiano.indexOf(n) !== -1) assert.strictEqual(r.weight, prima.proposte[n].weight, n + ': stessa proposta di prima (' + prima.proposte[n].weight + ' kg, ' + prima.proposte[n].tipo + ')');
      });
      /* chi ha gia un carico nello storico lo ritrova nel piano nuovo e quando apre la seduta; chi e nuovo parte dalla stima */
      const piano = app.pianoSalvato();
      Object.keys(piano).forEach(g => piano[g].filter(e => X.indexOf(e.name) !== -1).forEach(e => assert.strictEqual(e.weight, caricoDiLavoro(prima.letture[e.name]), 'nel Piano ' + e.name + ' mostra il suo carico di lavoro')));
      app.giorniAllenamento().forEach(g => {
        app.g('currentDay = ' + J(g)); app.g('applicaCaricoProgressivo(' + J(g) + ')');
        /* uno scarico deciso dal coach (aggiusti, `aggiusti-scarico`) non e del programma e sopravvive: vale anche per un esercizio nuovo */
        app.pianoSalvato()[g].forEach(e => { if (X.indexOf(e.name) !== -1) assert.notStrictEqual(e.coachTipo, 'nuovo', g + ' / ' + e.name); else assert.ok(e.coachTipo === 'nuovo' || (scaricoDelCoach && e.coachTipo === 'scarico'), g + ' / ' + e.name + ': ' + e.coachTipo); });
      });
      /* il profilo che la v1 aveva scritto non perde i dati personali */
      const p = app.leggi(app.chiave('PROFILE_KEY'));
      DATI_PERSONALI.forEach(k => { if (prima.profilo[k] !== undefined) assert.deepStrictEqual(vuotoOgetto(p[k]), vuotoOgetto(prima.profilo[k]), 'il profilo conserva ' + k); });
      assert.deepStrictEqual(app.errori, []);
    });
  });
});
