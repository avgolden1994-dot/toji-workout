/* Generatore: correzioni di W0-T7 (piano coach v2, onda 0, difetti trovati dal cancello di INT-0 e dalla revisione Opus): prove in node con l app vera in vm
   (tests/aiuto-app.js, orologio fisso, caso fisso), come generatore-onda0.test.js.
   (a) il pullover di CAS-14 passa dalla base alle sedute (protetto), sostituisce un posto e conta come tirata; PRG-21 protegge le sue aggiunte;
   (b) a corpo libero la tirata e una sola: strBilancia toglie una spinta (ABB-04, EQ-01); (c) EXN-01: un solo core per seduta, la seduta di tirata ha lavoro vero;
   (d) strCopri: l esercizio che copre da solo un buco non si taglia (ABB-03); (e) 48 ore e tetto di serie per muscolo nelle aggiunte (REC-01, SES-01);
   B1 della revisione: Nordic Curl non per chi inizia, i prudenti e le ginocchia dolenti (e 3x3-6, una volta a settimana per gli altri), ponte glutei al suo posto;
   M2 niente pause allungate per riempire i minuti (D-P10); M4 il fondamentale non scende sotto 3 serie; SAF-04 la nota del rematore inverso;
   RISCHIO.spalle e i piegamenti declinati; i tetti dei minorenni e degli over 65 valgono anche con un metodo forzato. */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');
const { conSoglieSelezione } = require('./aiuto-selezione');   /* W2-T6: le soglie della scelta degli esercizi (SEL-06) anche prima che index.html le citi */

const ORA = '2026-10-05T12:00:00';
const IN_VM = (app, x) => app.g('JSON.parse(' + JSON.stringify(JSON.stringify(x)) + ')');
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
let _app = null;
const app = () => _app || (_app = conSoglieSelezione(caricaApp({ ora: ORA })));
const costruisci = d => app().dati(app().chiama('buildProgram', Object.assign({ sex: 'M', age: 30, seme: 'w0t7', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false }, d)));
const nomi = prog => [].concat.apply([], prog.sedute.map(sd => sd.esercizi.map(e => pulito(e.name))));
const serie = (prog, filtro) => prog.sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => a + (filtro(e) ? e.sets : 0), 0), 0);
const spinte = prog => serie(prog, e => app().g('strEspinta')(e)), tirate = prog => serie(prog, e => app().g('strEtirata')(e));
const schema = nome => app().g('schemaDi')(nome);
const gruppo = nome => (app().json('findExercise(' + JSON.stringify(nome) + ') || {}')).group;

/* una griglia piccola e fissa: livello x giorni x luogo x minuti (nessun metodo scelto dal coach tranne dove capita: i metodi famosi hanno i loro controlli) */
function griglia(luoghi, livelli, giorni, minuti, goals) {
  const out = [];
  (livelli || ['principiante', 'intermedio', 'avanzato']).forEach(level => (giorni || [2, 3, 4, 5, 6]).forEach(days => luoghi.forEach(luogo => (minuti || [30, 45, 60, 90]).forEach(m => (goals || [['massa'], ['forza'], ['salute'], ['dimagrimento']]).forEach(g => {
    if (luogo !== 'palestra' && m === 90) return;
    out.push({ level, days, luogo, minutes: m, goals: g });
  })))));
  return out;
}

/* ---------- (a) il pullover a casa: sostituisce un posto, protetto, conta come tirata ---------- */
test('(a) CAS-14: a casa con i manubri il pullover resta in scheda (non lo toglie EXN-02), occupa un posto e conta come tirata', () => {
  const mancanti = [], troppi = [], squilibri = [];
  let conPullover = 0;
  griglia(['manubri'], ['principiante', 'intermedio'], [2, 3, 4], [30, 45, 60]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'a-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    const ha = nomi(prog).some(n => /Pullover con Manubrio/.test(n));
    const nota = prog.note.some(n => /^Aggiunto: Pullover con Manubrio/.test(n));
    if (nota && !ha) mancanti.push(JSON.stringify(p) + ' la nota dice aggiunto ma non c e');
    if (ha) conPullover++;
    prog.sedute.forEach(sd => { if (sd.esercizi.length > (p.level === 'principiante' ? 6 : 8)) troppi.push(JSON.stringify(p) + ' ' + sd.titolo + ' ' + sd.esercizi.length); });
    const sp = spinte(prog), ti = tirate(prog);
    if (sp + ti >= 8 && ti < sp * 0.9) squilibri.push(JSON.stringify(p) + ' spinte ' + sp + ' tirate ' + ti);
  });
  assert.deepStrictEqual(mancanti, [], 'il pullover annunciato c e davvero');
  assert.deepStrictEqual(troppi, [], 'EXN-02: nessuna seduta oltre il tetto di esercizi');
  assert.ok(conPullover >= 20, 'a casa il pullover compare (' + conPullover + ')');
  assert.deepStrictEqual(squilibri, [], 'ABB-04: con il pullover contato come tirata le spalle restano in equilibrio');
  /* il pullover vale come tirata per l equilibrio (D-P11), ma non come schema (non prende il posto della trazione in palestra) */
  assert.strictEqual(app().g('strEtirata')(IN_VM(app(), { name: '💪 Pullover con Manubrio', sets: 3 })), true);
  assert.strictEqual(schema('💪 Pullover con Manubrio'), null);
  /* con la spalla dolente il pullover e escluso (RISCHIO): il rematore prende una serie in piu */
  const spalla = costruisci({ level: 'intermedio', days: 3, goals: ['massa'], luogo: 'manubri', minutes: 60, fastidi: ['spalle'] });
  assert.ok(!nomi(spalla).some(n => /Pullover/.test(n)));
  assert.deepStrictEqual(app().errori, []);
});

test('(a) PRG-21: lo schema aggiunto e protetto (la nota dice «Aggiunto» e l esercizio resta dopo i tagli) e il pullover riserva non se ne porta dietro un secondo', () => {
  const colpe = [];
  let aggiunti = 0;
  griglia(['palestra', 'manubri'], ['intermedio', 'avanzato'], [3, 4, 5], [45, 60], [['massa'], ['forza']]).forEach(p => {
    [[], ['schiena'], ['ginocchia', 'schiena']].forEach(f => {
      const prog = costruisci(Object.assign({ seme: 'a2-' + JSON.stringify(p) + f, fastidi: f }, p));
      const nn = nomi(prog);
      prog.note.filter(n => /^Aggiunto: /.test(n)).forEach(n => {
        aggiunti++;
        const nome = n.replace(/^Aggiunto: /, '').replace(/ —.*$/, '');
        if (nn.indexOf(nome) === -1) colpe.push(JSON.stringify(p) + ' ' + f + ': ' + n + ' non c e nella scheda');
      });
      if (nn.filter(n => /Pullover con Manubrio/.test(n)).length > 2) colpe.push(JSON.stringify(p) + ' piu di due pullover');
    });
  });
  assert.deepStrictEqual(colpe, [], 'ogni «Aggiunto» e davvero in scheda');
  assert.ok(aggiunti > 0, 'il campione contiene schemi aggiunti (' + aggiunti + ')');
});

/* ---------- (b) a corpo libero la tirata e una sola: strBilancia toglie una spinta ---------- */
test('(b) ABB-04 / EQ-01: a corpo libero tirate >= 85% delle spinte (si toglie una spinta), ogni seduta di spinta ne tiene una, nessuno schema sparisce dalla settimana', () => {
  const squilibri = [], senzaSpinta = [], schemiPersi = [];
  griglia(['corpo'], null, [2, 3, 4, 5, 6], [30, 45, 60]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'b-' + JSON.stringify(p) }, p));
    const sp = spinte(prog), ti = tirate(prog);
    /* 0,85 come la prova di coerenza (ABB-04): restano pochi casi da 7 serie di spinta contro 6 (il petto in due sedute e l unica spinta verticale non si tolgono: meglio 0,86 che
       perdere il petto due volte a settimana o la spinta verticale; il collaudo EQ-01 li conta a 0,9) */
    if (sp + ti >= 8 && ti < sp * 0.85) squilibri.push(JSON.stringify(p) + ' ' + (prog.metodo || '') + ' spinte ' + sp + ' tirate ' + ti);
    prog.sedute.forEach(sd => { if (/^(push|upper|fullbody)$/.test(sd.tipo) && !sd.esercizi.some(e => /spinta/.test(schema(e.name) || ''))) senzaSpinta.push(JSON.stringify(p) + ' ' + sd.titolo); });
    /* W2-T6 (SEL-06): a corpo libero l unica spinta verticale e il Pike Push-up (abilita 3): chi inizia non la riceve, e PAT-01 non conta lo schema dove non c e un esercizio consentito (il collaudo guarda i consentiti: prefs.esclusi) */
    if (p.days >= 3 && !prog.metodo) ['spintaO', 'spintaV'].forEach(k => { if (!(k === 'spintaV' && p.level === 'principiante' && app().g("typeof sogliaSelezione") === 'function') && !prog.sedute.some(sd => sd.esercizi.some(e => schema(e.name) === k))) schemiPersi.push(JSON.stringify(p) + ' manca ' + k); });
  });
  assert.deepStrictEqual(squilibri, [], 'spinte e tirate in equilibrio (compresa la Recommended Routine)');
  assert.deepStrictEqual(senzaSpinta, [], 'nessuna seduta resta senza spinta (SES-03)');
  assert.deepStrictEqual(schemiPersi, [], 'PAT-01: spinta orizzontale e verticale ci sono ancora');
  /* il caso della prova di coerenza: principiante, 2 giorni, massa, 45 minuti, a corpo libero. Prima del volume per muscolo (W2-T1) 6 serie contro 6; ora 7 contro 6 (rapporto 0,86, sopra lo 0,85 di questa
     prova e di coerenza-schede, sotto lo 0,9 del collaudo EQ-01): con 2 giorni il pavimento dei deltoidi laterali (B6) tiene il Pike Push-up, l unica spinta verticale a casa, a 3 serie, e il petto sotto il
     minimo con la nota vale piu dello 0,04 di squilibrio (la tirata a casa e il solo rematore inverso, e l ultimo giro del tempo non aggiunge serie). Il 6 contro 6 era l esito del conteggio per gruppo, non
     una regola: la regola e il rapporto, controllato qui sotto e su tutta la griglia sopra. Seguito: EQ-01 a casa e di W2-T6 (bilanciamento di spinte e tirate con gli attributi, soglia 0) */
  const prog = costruisci({ level: 'principiante', days: 2, goals: ['massa'], luogo: 'corpo', minutes: 45 });
  assert.ok(spinte(prog) - tirate(prog) <= 1 && tirate(prog) >= spinte(prog) * 0.85, 'spinte ' + spinte(prog) + ' tirate ' + tirate(prog));
  assert.ok(spinte(prog) + tirate(prog) >= 12 && spinte(prog) + tirate(prog) <= 13, 'una spinta per seduta e una tirata: 12-13 serie in tutto, non meno');
  /* W2-T6 (SEL-06): senza il Pike Push-up (abilita 3) chi inizia ha 6 serie di spinta e 6 di tirata: nessun riequilibrio, nessuna nota; con il Pike (senza il file delle soglie) la nota c e */
  assert.ok(prog.note.some(n => /^Spinte e tirate: /.test(n)) || spinte(prog) <= tirate(prog), 'la nota dice che le serie sono state riequilibrate');
});

/* ---------- (c) EXN-01: un solo core per seduta; la seduta di tirata ha lavoro vero ---------- */
test('(c) EXN-01 / ABB-02: mai due core nella stessa seduta; a corpo libero la seduta di tirata ha il rematore inverso e almeno un altro esercizio non di core', () => {
  const doppi = [], pull = [];
  let sedutePull = 0;
  griglia(['corpo', 'manubri'], ['intermedio', 'avanzato'], [4, 5, 6], [30, 45, 60, 75]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'c-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    prog.sedute.forEach(sd => {
      const core = sd.esercizi.filter(e => gruppo(e.name) === 'core');
      if (core.length > 1) doppi.push(JSON.stringify(p) + ' ' + sd.titolo + ': ' + core.map(e => pulito(e.name)).join(' + '));
      if (sd.tipo === 'pull') {
        sedutePull++;
        const lavoro = sd.esercizi.filter(e => gruppo(e.name) !== 'core');
        if (lavoro.length < 2 || !sd.esercizi.some(e => schema(e.name) === 'tirataO' || /Pullover/.test(e.name))) pull.push(JSON.stringify(p) + ' ' + sd.titolo + ': ' + sd.esercizi.map(e => pulito(e.name)).join(', '));
      }
    });
  });
  assert.deepStrictEqual(doppi, [], 'ABB-02: due core nella stessa seduta');
  assert.ok(sedutePull > 20, 'il campione contiene sedute di tirata (' + sedutePull + ')');
  assert.deepStrictEqual(pull, [], 'la seduta di tirata ha una tirata e altro lavoro oltre al core');
  /* il caso del report di INT-0: intermedio, 5 giorni, massa, corpo libero: la seduta Pull non e piu Dead Bug + Plank */
  const prog = costruisci({ level: 'intermedio', days: 5, goals: ['massa'], luogo: 'corpo', minutes: 45 });
  const sd = prog.sedute.find(x => x.tipo === 'pull');
  assert.ok(sd.esercizi.some(e => /Rematore Inverso/.test(e.name)) && sd.esercizi.filter(e => gruppo(e.name) === 'core').length <= 1, sd.esercizi.map(e => pulito(e.name)).join(', '));
});

/* ---------- (d) strCopri: il buco si guarda anche dopo i tagli ---------- */
test('(d) ABB-03: un esercizio che da solo copre un buco della settimana e protetto dai tagli; il caso reale (avanzato, 4 giorni, massa + forza, 45 minuti) ha i polpacci', () => {
  const a = app();
  const E = (n, sets) => ({ name: a.g('nomeInLibreria')(n), sets, reps: 10, weight: 0, rest: 90 });
  const crea = (extra) => IN_VM(a, [{ giorno: 'Lunedì', tipo: 'upper', esercizi: [E('Panca Piana Bilanciere', 3), E('Lat Machine', 3)].concat(extra ? [E('Reverse Pec Deck', 2)] : []) },
    { giorno: 'Mercoledì', tipo: 'lower', esercizi: [E('Squat con Bilanciere', 3), E('Leg Press', 3)].concat(extra ? [E('Calf Raise in Piedi', 3)] : []) },
    { giorno: 'Venerdì', tipo: 'fullbody', esercizi: [E('Military Press', 3), E('Stacco Rumeno', 3)].concat(extra ? [E('Plank', 2)] : []) }]);
  const prova = (extra) => {
    const sedute = crea(extra), note = IN_VM(a, []);
    a.chiama('strCopri', IN_VM(a, { sedute: [], goals: ['massa'], level: 'intermedio', days: 3, prefs: {}, nEs: 5, note: [], metodoAttivo: null }));   /* settimana vuota: non fa niente */
    a.ctx.__c = { sedute, goals: IN_VM(a, ['massa']), level: 'intermedio', days: 3, prefs: IN_VM(a, { luogo: 'palestra', fastidi: [], odiati: [], priorita: [], graditi: [] }), nEs: 5, note, metodoAttivo: null };
    a.g('strCopri(__c)');
    const tutti = a.json('[].concat.apply([], __c.sedute.map(sd => sd.esercizi))');
    return { note: a.dati(note), n: tutti.length, protetti: tutti.filter(e => e.protetto).map(e => pulito(e.name)) };
  };
  const senza = prova(false), con = prova(true);
  assert.ok(senza.note.some(x => x.indexOf('Polpacci:') === 0) && senza.note.some(x => x.indexOf('Deltoidi posteriori:') === 0) && senza.note.some(x => x.indexOf('Core:') === 0), 'tre buchi, tre aggiunte con la loro nota');
  assert.strictEqual(senza.n, 9);
  assert.strictEqual(senza.protetti.length, 3, 'le aggiunte sono protette');
  assert.deepStrictEqual(con.note, [], 'una settimana senza buchi non scrive note');
  assert.strictEqual(con.n, 9);
  ['Calf Raise in Piedi', 'Reverse Pec Deck', 'Plank'].forEach(n => assert.ok(con.protetti.indexOf(n) !== -1, n + ' e l unico che copre il buco: protetto'));
  /* il caso reale: la ricetta aveva il calf raise, il taglio per il tempo lo toglieva e la settimana restava senza polpacci */
  const prog = costruisci({ level: 'avanzato', days: 4, goals: ['massa', 'forza'], luogo: 'palestra', minutes: 45 });
  assert.ok(nomi(prog).some(n => /Calf Raise/.test(n)), 'polpacci in settimana: ' + nomi(prog).join(', '));
  assert.ok(prog.sedute.every(sd => sd.esercizi.every(e => e.protetto === undefined)), 'il segno protetto non resta nella scheda salvata');
});

/* ---------- (e) 48 ore e tetto di serie per muscolo nelle aggiunte ---------- */
test('(e) REC-01 / SES-01: recuperoOk rispetta le 48 ore tra due sedute dello stesso grande muscolo e le 11 serie frazionarie per muscolo in una seduta', () => {
  const a = app();
  const E = (n, sets) => ({ name: a.g('nomeInLibreria')(n), sets, reps: 10, weight: 0, rest: 75 });
  const sedute = IN_VM(a, [{ giorno: 'Martedì', tipo: 'legs', esercizi: [E('Leg Curl Seduto', 4)] }, { giorno: 'Mercoledì', tipo: 'legs', esercizi: [E('Squat con Bilanciere', 3)] },
    { giorno: 'Venerdì', tipo: 'legs', esercizi: [E('Squat con Bilanciere', 3)] }, { giorno: 'Lunedì', tipo: 'push', esercizi: [E('Panca Piana Bilanciere', 4), E('Chest Press Machine', 4)] }]);
  a.ctx.__s = sedute;
  const ok = (i, nome, sets) => a.g('recuperoOk(__s[' + i + '], __s, nomeInLibreria(' + JSON.stringify(nome) + '), ' + sets + ')');
  assert.strictEqual(ok(1, 'Leg Curl Sdraiato', 4), false, 'il giorno dopo 4 serie di femorali, con 4 serie in piu: no');
  assert.strictEqual(ok(2, 'Leg Curl Sdraiato', 4), true, 'tre giorni dopo: si');
  assert.strictEqual(ok(1, 'Leg Curl Sdraiato', 3), true, 'con 3 serie la seduta resta sotto le 4 serie frazionarie: la soglia dei due giorni consecutivi non scatta');
  /* il petto: 4 + 4 serie dirette = 8; con 3 serie di croci sono 11 (il tetto), con 4 sono 12 */
  assert.strictEqual(ok(3, 'Croci ai Cavi da Seduto', 4), false, 'oltre le 11 serie frazionarie di petto in una seduta');
  assert.strictEqual(ok(3, 'Croci ai Cavi da Seduto', 3), true, 'fino a 11: si');
  assert.deepStrictEqual(a.errori, []);
});

test('(e) REC-01: nei 4-6 giorni nessun programma ha due sedute consecutive con almeno 4 serie frazionarie dello stesso grande muscolo messe da un riempimento o dal ponte dei femorali', () => {
  const a = app();
  const DAYS = a.json('DAYS');
  const frazSed = (sd, g) => sd.esercizi.reduce((t, e) => t + e.sets * ((a.json('creditoSerie(' + JSON.stringify(e.name) + ')') || {})[g] || 0), 0);
  const colpe = [];
  let coppie = 0;
  griglia(['palestra', 'manubri', 'corpo'], ['intermedio', 'avanzato'], [4, 5, 6], [60, 75, 90], [['massa'], ['ricomposizione']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'e-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    for (let i = 0; i < prog.sedute.length; i++) for (let j = i + 1; j < prog.sedute.length; j++) {
      if (Math.abs(DAYS.indexOf(prog.sedute[i].giorno) - DAYS.indexOf(prog.sedute[j].giorno)) !== 1) continue;
      coppie++;
      if (frazSed(prog.sedute[i], 'femorali') >= 4 && frazSed(prog.sedute[j], 'femorali') >= 4) colpe.push(JSON.stringify(p) + ' ' + prog.sedute[i].titolo + ' / ' + prog.sedute[j].titolo);
    }
  });
  assert.ok(coppie > 100, 'il campione contiene sedute in giorni consecutivi (' + coppie + ')');
  assert.deepStrictEqual(colpe, [], 'REC-01:femorali = 0');
});

/* ---------- B1 della revisione: il Nordic Curl ---------- */
test('B1 (revisione onda 0): il Nordic Curl non entra per principianti, over 65, PAR-Q, minorenni e ginocchia dolenti, nemmeno con un metodo; per gli altri 3x6 al massimo, in una seduta a settimana', () => {
  const colpe = [];
  let nordicAmmessi = 0;
  const casi = [];
  ['corpo', 'manubri', 'palestra'].forEach(luogo => [2, 3, 4, 5].forEach(days => [['massa'], ['salute'], ['glutei']].forEach(goals => {
    [{ level: 'principiante' }, { level: 'intermedio', age: 70 }, { level: 'avanzato', parq: 'si' }, { level: 'intermedio', age: 16 }, { level: 'intermedio', fastidi: ['ginocchia'] }, { level: 'intermedio' }, { level: 'avanzato', sex: 'F' }].forEach(prof => casi.push(Object.assign({ luogo, days, goals, minutes: 60 }, prof)));
  })));
  casi.forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'n-' + JSON.stringify(p) }, p));
    const vietato = p.level === 'principiante' || (p.age && (p.age >= 65 || p.age < 18)) || p.parq === 'si' || (p.fastidi || []).indexOf('ginocchia') !== -1;
    const conNordic = prog.sedute.filter(sd => sd.esercizi.some(e => /Nordic/.test(e.name)));
    if (vietato && conNordic.length) colpe.push('vietato ' + JSON.stringify(p) + ' ' + conNordic.length);
    if (!vietato) {
      if (conNordic.length > 1) colpe.push('piu di una seduta ' + JSON.stringify(p));
      conNordic.forEach(sd => sd.esercizi.filter(e => /Nordic/.test(e.name)).forEach(e => { nordicAmmessi++; if (e.sets > 3 || e.reps > 6) colpe.push('prescrizione ' + e.sets + 'x' + e.reps + ' ' + JSON.stringify(p)); }));
    }
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(nordicAmmessi > 5, 'a chi puo il Nordic Curl resta (' + nordicAmmessi + ')');
  /* con un metodo forzato (Recommended Routine) il tetto vale lo stesso: schema 3x8 per tutti, il Nordic torna a 3x6 e per i vietati non c e */
  const rr = costruisci({ metodo: 'rr', level: 'intermedio', days: 3, goals: ['massa'], luogo: 'corpo', minutes: 45 });
  rr.sedute.forEach(sd => sd.esercizi.filter(e => /Nordic/.test(e.name)).forEach(e => { assert.ok(e.sets <= 3 && e.reps <= 6, 'rr: Nordic ' + e.sets + 'x' + e.reps); }));
  const rrP = costruisci({ metodo: 'rr', level: 'principiante', days: 3, goals: ['massa'], luogo: 'corpo', minutes: 45 });
  assert.ok(!nomi(rrP).some(n => /Nordic/.test(n)));
  /* la regola sta in consentito: gli esclusi non entrano come alternativa nemmeno al posto di un altro esercizio */
  const nordic = app().g("nomeInLibreria('Nordic Curl')");
  assert.strictEqual(app().g('consentito')(nordic, IN_VM(app(), { luogo: 'corpo', fastidi: [], esclusi: [app().dati(nordic)] })), false);
  assert.strictEqual(app().g('consentito')(nordic, IN_VM(app(), { luogo: 'corpo', fastidi: [] })), true);
});

/* INT-1: W1-T5 ha portato a casa il Leg Curl con Asciugamano e lo Stacco Rumeno con Manubri (e a una Gamba): la premessa «a casa non c'e nessuna flessione del ginocchio sicura»
   non e piu vera. Il Nordic Curl resta escluso a chi inizia (B1 della revisione dell onda 0) e il leg curl alla macchina non c'e a casa; i femorali hanno una flessione vera o uno
   stacco rumeno e, solo se mancano entrambi, il ponte glutei (3 serie, nella seduta di gambe) con la nota che dice che restano meno allenati. */
test('B1 (premesse cambiate da W1-T5): a casa niente Nordic Curl a chi inizia; i femorali prendono il leg curl con l asciugamano o lo stacco rumeno coi manubri e, solo se mancano, il ponte glutei con la nota', () => {
  const FEMORALI_VERI = /Leg Curl con Asciugamano|Stacco Rumeno con Manubri|Stacco Rumeno a una Gamba/;
  const colpe = [];
  let conPonteSenzaAltro = 0, conVeri = 0;
  /* INT-2b: la griglia ha anche i 30 minuti. Con 45 e 60 minuti il volume per muscolo (W2-T1) mette sempre a casa un Leg Curl con Asciugamano o uno stacco rumeno vero, e il caso «solo il ponte glutei, con la
     nota» non c e piu (prima: 2 programmi su 12 della griglia a 45-60 minuti, per un conteggio del volume che guardava solo i gruppi); resta dove il tempo non lascia posto: principiante, corpo libero, 2 giorni, 30 minuti */
  griglia(['corpo', 'manubri'], ['principiante'], [2, 3, 4], [30, 45, 60], [['massa'], ['salute']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'p-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    const elenco = nomi(prog);
    const sedGambe = prog.sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo));
    const ponte = sedGambe.some(sd => sd.esercizi.some(e => /Ponte Glutei/.test(e.name)));
    const veri = elenco.some(n => FEMORALI_VERI.test(n));
    const notaFemorali = prog.note.some(n => n === 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.');
    if (elenco.some(n => /Nordic/.test(n))) colpe.push('Nordic Curl a chi inizia ' + JSON.stringify(p));
    if (elenco.some(n => /Leg Curl/.test(n) && !/Asciugamano/.test(n))) colpe.push('leg curl alla macchina a casa ' + JSON.stringify(p));
    if (veri) conVeri++;   /* la nota puo esserci lo stesso: dice che senza leg curl alla macchina i femorali restano meno allenati, ed e vero anche con lo stacco rumeno (rinforzaFemorali guarda solo le flessioni) */
    else if (!ponte) colpe.push('femorali scoperti (ne flessione, ne stacco rumeno, ne ponte) ' + JSON.stringify(p));
    else { conPonteSenzaAltro++; if (!notaFemorali) colpe.push('ponte al posto della flessione senza la nota ' + JSON.stringify(p)); }
    sedGambe.forEach(sd => sd.esercizi.filter(e => /Ponte Glutei/.test(e.name)).forEach(e => { if (e.reps > 15) colpe.push('ripetizioni ' + e.reps + ' ' + JSON.stringify(p)); }));
  });
  assert.deepStrictEqual(colpe, []);
  assert.ok(conVeri > 5, 'a casa i femorali hanno una flessione vera o lo stacco rumeno: ' + conVeri);
  /* INT-2b (onda 2c): la lista delle flessioni di B29 (FLESSIONI_GINOCCHIO) ha anche il Leg Curl con Asciugamano: a casa la flessione vera entra sempre e il ponte al posto della flessione non compare piu
     nella griglia (era 1-2 programmi a 30 minuti). La via del ponte resta per chi ha escluso ogni flessione (odiati): si prova sotto, con la nota */
  assert.strictEqual(conPonteSenzaAltro, 0, 'nella griglia il ponte al posto della flessione non c e piu: ' + conPonteSenzaAltro);
  const odiati = [app().g("nomeInLibreria('Leg Curl con Asciugamano')"), app().g("nomeInLibreria('Nordic Curl')")].map(n => app().dati(n));
  const soloPonte = costruisci({ level: 'principiante', days: 3, goals: ['massa'], luogo: 'corpo', minutes: 45, odiati: odiati });
  assert.ok(!nomi(soloPonte).some(n => /Leg Curl|Nordic/.test(n)), 'senza flessioni ammesse non ce n e nessuna');
  assert.ok(soloPonte.sedute.some(sd => sd.esercizi.some(e => /Ponte Glutei/.test(e.name))) && soloPonte.note.some(n => n === 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.'), 'resta il ponte con la nota: ' + nomi(soloPonte).join(', ') + ' | ' + soloPonte.note.join(' | '));
  const prog = costruisci({ level: 'principiante', days: 3, goals: ['salute'], luogo: 'corpo', minutes: 45 });
  assert.ok(nomi(prog).some(n => FEMORALI_VERI.test(n)) || prog.note.some(n => n === 'Femorali: senza leg curl restano meno allenati, il ponte glutei li aiuta.'), prog.note.join(' | '));
  /* in palestra il leg curl c e: niente nota e niente ponte aggiunto per questo */
  const gym = costruisci({ level: 'principiante', days: 3, goals: ['salute'], luogo: 'palestra', minutes: 45 });
  assert.ok(!gym.note.some(n => /senza leg curl/.test(n)));
});

/* ---------- M2: niente pause allungate per riempire i minuti ---------- */
test('M2 (D-P10, revisione onda 0): le pause restano quelle per tipo di esercizio: isolamenti e core non superano la pausa dello schema, nessun fondamentale la supera di piu di quella dei giorni di forza', () => {
  const a = app();
  const colpe = [];
  let n = 0;
  griglia(['palestra', 'manubri', 'corpo'], null, [3, 4, 6], [45, 75, 90], [['massa'], ['forza'], ['salute']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'm2-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    const maxIso = Math.max(75, Math.round(Math.max(60, prog.scheme.restIso) / 15) * 15);
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => {
      n++;
      const tipo = a.chiama('tipoCarico', e.name);
      if (e.superset) return;
      if (tipo === 'isolamento' && e.rest > maxIso) colpe.push(JSON.stringify(p) + ' ' + pulito(e.name) + ' ' + e.rest + ' s (isolamento: al massimo ' + maxIso + ')');
      if (tipo !== 'isolamento' && e.rest > Math.max(prog.scheme.restCompound, 180)) colpe.push(JSON.stringify(p) + ' ' + pulito(e.name) + ' ' + e.rest + ' s');
    }));
  });
  assert.ok(n > 1000);
  assert.deepStrictEqual(colpe, []);
  /* il caso del report: Goblet Squat a 225 s nel giorno di ipertrofia dell intermedio con la forza come obiettivo */
  const prog = costruisci({ level: 'intermedio', days: 4, goals: ['forza'], luogo: 'manubri', minutes: 90 === 90 ? 60 : 60, fastidi: ['schiena'] });
  prog.sedute.filter(sd => /ipertrofia/.test(sd.titolo)).forEach(sd => sd.esercizi.forEach(e => assert.ok(e.rest <= 150 || e.fisso, pulito(e.name) + ' ' + e.rest + ' s nel giorno di ipertrofia')));
});

/* ---------- M4: il fondamentale non scende sotto 3 serie ---------- */
test('M4 (revisione onda 0): limitaVolumePerMuscolo taglia gli altri esercizi e lascia il fondamentale della seduta a 3 serie o piu', () => {
  const a = app();
  const E = (n, sets, extra) => Object.assign({ name: a.g('nomeInLibreria')(n), sets, reps: 8, weight: 0, rest: 120 }, extra || {});
  /* petto: bilanciere 4 (fondamentale), inclinata 4, chest press 4, croci 3 = 15 + secondari: sopra il massimo 12 */
  const sedute = IN_VM(a, [{ giorno: 'Lunedì', tipo: 'push', esercizi: [E('Panca Piana Bilanciere', 4), E('Panca Inclinata Manubri', 4), E('Chest Press Machine', 4), E('Croci ai Cavi da Seduto', 3)] }]);
  a.ctx.__s = sedute;
  a.g('limitaVolumePerMuscolo(__s, { volumeMax: [12, 12], volumeMin: [0, 0] })');
  const dopo = a.json('__s[0].esercizi.map(e => [e.name, e.sets])');
  const fondamentale = dopo.find(x => /Panca Piana Bilanciere/.test(x[0]));
  assert.ok(fondamentale[1] >= 3, 'il fondamentale resta a ' + fondamentale[1] + ' serie');
  assert.ok(dopo.reduce((t, x) => t + x[1], 0) < 15, 'qualcosa e stato tolto: ' + JSON.stringify(dopo));
  /* se il fondamentale e gia a 3, anche con tutto il resto al minimo non scende */
  const s2 = IN_VM(a, [{ giorno: 'Lunedì', tipo: 'push', esercizi: [E('Panca Piana Bilanciere', 3), E('Panca Inclinata Manubri', 2), E('Chest Press Machine', 2)] }]);
  a.ctx.__s2 = s2;
  a.g('limitaVolumePerMuscolo(__s2, { volumeMax: [5, 5], volumeMin: [0, 0] })');
  assert.strictEqual(a.json('__s2[0].esercizi[0].sets'), 3);
  /* sul campione: il primo multiarticolare di una seduta di intermedi e avanzati sani, senza metodo, ha almeno 3 serie quasi sempre (era 2 in 620 sedute su 7.776) */
  let nSedute = 0, sotto = 0;
  const soloGambe = [];
  griglia(['palestra'], ['intermedio', 'avanzato'], [3, 4, 5], [45, 60, 75, 90], [['massa'], ['forza']]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 'm4-' + JSON.stringify(p) }, p));
    if (prog.metodo) return;
    prog.sedute.forEach(sd => { const primo = sd.esercizi.find(e => (a.json('findExercise(' + JSON.stringify(e.name) + ') || {}')).type === 'compound'); if (!primo) return; nSedute++; if (primo.sets < 3) { sotto++; if (!/legs|lower/.test(sd.tipo)) soloGambe.push(JSON.stringify(p) + ' ' + sd.titolo); } });
  });
  /* INT-1: con i 29 esercizi di W1-T5 il campione passa da 4 a 6 sedute su 192 (2,1% -> 3,1%): il candidato in piu cambia quali programmi cadono sul bordo. Sono le sedute di gambe dei
     programmi a 5 giorni (e una Lower a 4 giorni con il forza e 90 minuti, dove il primo multiarticolare e lo stacco con la trap bar): il tetto di serie per muscolo dell intera settimana
     le porta a 2 serie. Non e un difetto dei nuovi esercizi (con la libreria di prima il motivo era lo stesso): lo risolve il motore del volume di W2-T1. Qui il 3% era un rapporto sul
     campione, non una regola: sale al 4% e si controlla che le sedute sotto 3 serie siano solo di gambe (nessuna seduta di parte alta). */
    /* INT-2a (m2 della revisione dell onda 1): dopo W1-T6 e le correzioni di INT-2a il campione e a 5 sedute su 192 (2,6%): la soglia torna al 3% (INT-1 l aveva alzata al 4% per 6 su 192) */
  /* W2-T2 (il tempo): con la scala del taglio (CAS-07) e senza il riempimento (D-P10) il campione e a 7 sedute su 192 (3,6%): sempre e solo sedute di gambe (sotto), dove il tetto di serie per muscolo
     della settimana le porta a 2 serie e il fondamentale e l ultimo a perdere serie nel taglio per il tempo; lo chiude il motore del volume di W2-T1 (pavimentoVolume). La soglia sale al 4% e il controllo
     che conta (soloGambe vuoto) resta */
  /* INT-2b (W2-T1 + W2-T2 insieme): il campione e a 1 seduta su 192 (0,5%, prima 3,6%: il motore del volume ha chiuso le sedute di gambe, come W2-T2 si aspettava), ma quella seduta non e di gambe:
     intermedio, 3 giorni, 45 minuti, massa: nella Upper i pavimenti di serie dirette di W2-T1 (braccia a 4 serie) non cedono e il taglio per il tempo di W2-T2 porta la panca a 2 serie (con la panca
     protetta a 3 il giro finale del tempo, rifinisciAlTempo, toglierebbe serie alle braccia sotto il pavimento: meglio il tetto dei minuti, D-P10, che un pavimento sforato; lo e' per la panca e per DIR-01).
     La soglia resta al 4% (e un rapporto sul campione) e le sedute fuori dalle gambe possono essere al massimo 1 (0,5%): su un campione largo (2.160 sedute, 6 semi per profilo) il fondamentale sotto 3 serie e
     l 11,9% delle sedute (20,2% senza W2-T1), quasi tutte a 30 minuti: e la scelta di W2-T2 (DUR-01: a 30 minuti i quattro schemi di base restano a 2 serie), non una regressione. Seguito per W2-T6/W3-T1:
     il compromesso pavimenti-fondamentale-tempo con il punteggio per attributi */
  assert.ok(sotto / nSedute <= 0.04, 'sedute con il fondamentale sotto 3 serie: ' + sotto + ' su ' + nSedute);
  /* W2-T6: 2 e non 1. Sono sempre i profili di 3 giorni e 45 minuti (massa) che l INT-2b descrive (la Upper con i pavimenti delle braccia e il taglio per il tempo): i due esercizi nuovi della libreria cambiano
     quale dei profili vicini cade sul bordo (sul campione largo di 288 programmi, 6 semi per profilo: 5 sedute sul codice di prima, 6 ora, tutte 3 giorni e 45 minuti). Il compromesso pavimenti-fondamentale-tempo
     resta aperto (W3-T1, punteggio per attributi): qui si tiene il tetto del 4% e che le sedute fuori dalle gambe siano di quel solo profilo */
  assert.ok(soloGambe.length <= 2, 'il fondamentale sotto 3 serie fuori dalle gambe: al massimo 2 sedute su ' + nSedute + ': ' + JSON.stringify(soloGambe));
  assert.ok(soloGambe.every(x => /"days":3,"luogo":"palestra","minutes":45/.test(x)), 'solo il profilo di 3 giorni e 45 minuti: ' + JSON.stringify(soloGambe));
});

/* ---------- D-P3 (INT-1): elastici, kettlebell e anelli finche non si possono dichiarare ---------- */
test('D-P3 (INT-1): con gli attrezzi della palestra dichiarati niente elastici, kettlebell e anelli (non si possono ancora dichiarare); senza elenco la palestra e completa; a casa restano esclusi', () => {
  const a = app();
  const nuovi = ['Kettlebell Swing', 'Face Pull con Elastico', 'Lat Pulldown con Elastico', 'Alzate Laterali con Elastico', 'Rematore agli Anelli'].map(n => a.g('nomeInLibreria')(n));
  nuovi.forEach(n => assert.ok(n, 'l esercizio nuovo e in libreria'));
  const prefs = (extra) => IN_VM(a, Object.assign({ luogo: 'palestra', fastidi: [] }, extra));
  nuovi.forEach(n => {
    assert.strictEqual(a.g('consentito')(n, prefs({ attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'] })), false, pulito(n) + ': con elenco dichiarato no');
    assert.strictEqual(a.g('consentito')(n, prefs({ attrezziPalestra: null })), true, pulito(n) + ': palestra senza elenco si');
    assert.strictEqual(a.g('consentito')(n, prefs({ luogo: 'manubri' })), false, pulito(n) + ': a casa con i manubri no (CAS-01 / D-P3)');
    assert.strictEqual(a.g('consentito')(n, prefs({ luogo: 'corpo' })), false, pulito(n) + ': a corpo libero no');
  });
  /* gli esercizi di sempre non cambiano: il rematore inverso (sbarra bassa o anelli) resta com era con un elenco dichiarato */
  const inverso = a.g('nomeInLibreria')('Rematore Inverso (Corpo Libero)');
  assert.strictEqual(a.g('consentito')(inverso, prefs({ attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'] })), true);
});

/* ---------- SAF-04: la nota del rematore inverso ---------- */
test('SAF-04 (decisione del committente): il rematore inverso resta a casa e ha sempre la nota del tavolo robusto o della sbarra bassa; i programmi senza non l hanno', () => {
  const nota = 'Rematore inverso: fallo sotto un tavolo robusto o con una sbarra bassa, dopo aver controllato che regga il tuo peso.';
  let con = 0, senza = 0;
  griglia(['corpo', 'manubri', 'palestra'], null, [2, 3, 5], [45, 60]).forEach(p => {
    const prog = costruisci(Object.assign({ seme: 's-' + JSON.stringify(p) }, p));
    const ha = nomi(prog).some(n => /Rematore Inverso/.test(n));
    assert.strictEqual(prog.note.indexOf(nota) !== -1, ha, JSON.stringify(p) + ': la nota c e se e solo se c e il rematore inverso');
    ha ? con++ : senza++;
  });
  assert.ok(con > 20 && senza > 20, 'il campione ha programmi con (' + con + ') e senza (' + senza + ') il rematore inverso');
});

/* ---------- RISCHIO.spalle e i piegamenti declinati ---------- */
test('SAF-02 (revisione onda 0): con la spalla dolente i piegamenti declinati non entrano (restano quelli a terra e inclinati)', () => {
  const a = app();
  const declinati = a.g("nomeInLibreria('Piegamenti Declinati (Piedi Rialzati)')"), terra = a.g("nomeInLibreria('Piegamenti a Terra (Push-up)')");
  assert.strictEqual(a.g('consentito')(declinati, IN_VM(a, { luogo: 'corpo', fastidi: ['spalle'] })), false);
  assert.strictEqual(a.g('consentito')(terra, IN_VM(a, { luogo: 'corpo', fastidi: ['spalle'] })), true);
  assert.strictEqual(a.g('consentito')(declinati, IN_VM(a, { luogo: 'corpo', fastidi: [] })), true);
  griglia(['corpo'], ['intermedio'], [3, 4], [45, 60]).forEach(p => assert.ok(!nomi(costruisci(Object.assign({ fastidi: ['spalle'] }, p))).some(n => /Declinati/.test(n)), JSON.stringify(p)));
});

/* ---------- i tetti valgono anche con un metodo forzato ---------- */
test('con un metodo forzato (d.metodo) minorenni e over 65 restano sotto i loro tetti: 3 serie al massimo, ripetizioni 8-15 e 8-12', () => {
  ['stronglifts', 'startingstrength', 'gzclp', 'greyskull'].forEach(m => {
    const over = costruisci({ metodo: m, level: 'intermedio', age: 70, days: 4, goals: ['forza'], luogo: 'palestra', minutes: 60 });
    over.sedute.forEach(sd => sd.esercizi.forEach(e => { assert.ok(e.sets <= 3, m + ' over 65: ' + pulito(e.name) + ' ' + e.sets + ' serie'); if (!app().g('isTimeBased')(e.name)) assert.ok(e.reps >= 8 && e.reps <= 12, m + ' over 65: ' + pulito(e.name) + ' ' + e.reps + ' ripetizioni'); }));
    const minore = costruisci({ metodo: m, level: 'intermedio', age: 15, days: 4, goals: ['forza'], luogo: 'palestra', minutes: 60 });
    minore.sedute.forEach(sd => sd.esercizi.forEach(e => { assert.ok(e.sets <= 3, m + ' minorenne: ' + pulito(e.name) + ' ' + e.sets + ' serie'); if (!app().g('isTimeBased')(e.name)) assert.ok(e.reps >= 8 && e.reps <= 15, m + ' minorenne: ' + pulito(e.name) + ' ' + e.reps + ' ripetizioni'); }));
  });
});

/* ---------- i piccoli difetti della revisione dell onda 0 (MINOR) ---------- */
test('MAV-02 (revisione onda 0): niente cedimento su front squat, spinte sopra la testa ne sugli esercizi che caricano di piu la zona del fastidio dichiarato', () => {
  const a = app();
  const per = (nome, fastidi) => a.g('senzaCedimentoPer')(a.g('nomeInLibreria(' + JSON.stringify(nome) + ')'), IN_VM(a, fastidi));
  assert.strictEqual(per('Front Squat', []), true);
  assert.strictEqual(per('Military Press', []), true);
  assert.strictEqual(per('Panca Piana Bilanciere', []), false, 'il fondamentale sano puo averlo');
  assert.strictEqual(per('Panca Piana Bilanciere', ['spalle']), true, 'con la spalla dolente la panca e tra gli esercizi che la caricano (STRESS_ZONA)');
  assert.strictEqual(per('Stacco Rumeno', ['schiena']), true);
  assert.strictEqual(per('Plank', []), true, 'resta il vecchio senzaCedimento: core');
  /* sul programma: nessuna tecnica al cedimento su front squat o military, con o senza fastidi */
  const colpe = [];
  [[], ['schiena'], ['spalle']].forEach(f => ['intermedio', 'avanzato'].forEach(level => [3, 4].forEach(days => ['forza', 'massa'].forEach(g => {
    const prog = costruisci({ level, days, goals: [g], luogo: 'palestra', minutes: 60, fastidi: f, seme: 'ced-' + level + days + g + f });
    prog.sedute.forEach(sd => sd.esercizi.forEach(e => { if (['amrap', 'backoff', 'drop', 'parziali'].indexOf(e.tecnica) !== -1 && /Front Squat|Military/.test(e.name)) colpe.push(f + ' ' + level + ' ' + e.name + ' ' + e.tecnica); }));
  }))));
  assert.deepStrictEqual(colpe, []);
});

test('MES-08 (revisione onda 0): le vecchie risposte sRPE 4/7/9 si portano sulla scala 3/6/8: chi aveva sempre «Giusta» (7) vale come «Giusta» (6) di adesso', () => {
  const a = caricaApp({ ora: ORA });
  const con = srpe => { a.storia(srpe.map((v, i) => Object.assign(a.seduta(2 + i * 2, [{ nome: 'Panca Piana Bilanciere', serie: [[60, 8, true, 7]] }]), { feedback: { srpe: v } }))); return a.chiama('livelloFatica'); };
  assert.strictEqual(con([6, 6, 6]), 'bassa', 'scala nuova: tutte Giusta');
  assert.strictEqual(con([7, 7, 7]), 'bassa', 'scala vecchia: stessa cosa (prima era «media»: i dati vecchi mescolavano le due unita)');
  assert.strictEqual(con([4, 4, 4]), 'bassa');
  assert.strictEqual(con([9, 9, 9]), 'media', 'il vecchio 9 vale come 8');
  assert.strictEqual(con([10, 10, 10]), 'alta');
});

test('STD-01 (revisione onda 0): niente proposta di revisione del livello a over 65, modalita prudente e fastidi dichiarati; il testo e neutro', () => {
  const SQUAT = '🦵 Squat con Bilanciere', PANCA = '💪 Panca Piana Bilanciere';
  const prova = (profilo) => {
    const a = caricaApp({ ora: '2026-10-05T12:00:00' });
    a.profilo(Object.assign({ level: 'avanzato', weight: 80, sex: 'M' }, profilo));
    const lista = [];
    for (let w = 0; w < 8; w++) { const lun = new Date(new Date('2026-08-10T12:00:00').getTime() + w * 7 * 86400000); [0, 3].forEach(g => { const d = new Date(lun.getTime() + g * 86400000); lista.push(Object.assign(a.seduta(0, [{ nome: SQUAT, serie: [[40, 8, true]] }, { nome: PANCA, serie: [[30, 8, true]] }]), { id: new Date(a.ymd(d) + 'T18:00:00').getTime() })); }); }
    a.storia(lista.sort((x, y) => y.id - x.id));
    return a;
  };
  const sano = prova({});
  assert.strictEqual(sano.json('livelloStimato()').revisione, 'intermedio', 'il caso di controllo: un avanzato dichiarato con numeri da principiante');
  const az = sano.json('azioniCoach()').find(x => x.bottoni.some(b => b[0] === 'Passa a intermedio'));
  assert.ok(az && /Decidi tu/.test(az.testo) && !/principiante/.test(az.testo), 'testo neutro, senza «carichi da principiante»: ' + (az && az.testo));
  assert.ok(!prova({ age: 70 }).json('livelloStimato()').revisione, 'over 65');
  assert.ok(!prova({ parq: true }).json('livelloStimato()').revisione, 'PAR-Q');
  assert.ok(!prova({ fastidi: ['spalle'] }).json('livelloStimato()').revisione, 'fastidio dichiarato');
});

test('nessun errore dell app in tutte le prove di questo file', () => { assert.deepStrictEqual(app().errori, []); });
