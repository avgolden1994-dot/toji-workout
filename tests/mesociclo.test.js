/* Mesociclo (piano coach v2, W2-T4: MES-01, MES-02, MES-03, PRN-03, OBI-03): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso).
   Numeri provati: la rampa di volume (intermedio 0,75 · 0,85 · 0,95 · 1 · 1, avanzato 0,70 · 0,80 · 0,90 · 1 · 1, principiante 2 serie poi 3), la tabella
   del RIR per livello, classe e settimana, i pavimenti e i modificatori dell obiettivo, la dose dello scarico (serie -35 / -50 / -60%, carico -5 / -10% sul
   riferimento di prima, 5-7 giorni, ripresa al 100%), le 12 settimane del principiante con il controllo all 8a, i campi del programma v2 salvato
   (versione, piano, volume, perche, modalita, cardio) e i programmi salvati dalla v1 (nessun piano: si leggono come prima, rirPianoSettimana ritorna null).
   Le soglie (soglie-struttura.js) le carica da sole tests/aiuto-mesociclo.js se index.html non le ha ancora (entrano con l integrazione dell onda). */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp, elencoFixture } = require('./aiuto-app');
const { profili } = require('./aiuto-genera');
const { conSoglieStruttura, senzaSoglie } = require('./aiuto-mesociclo');

const ORA = '2026-10-05T12:00:00';   /* lunedi */
const BASE = { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', priorita: [], usaProfilo: false, seme: 'mes' };
const app = conSoglieStruttura(caricaApp({ ora: ORA }));
const costruisci = (d, a) => (a || app).dati((a || app).chiama('buildProgram', Object.assign({}, BASE, d)));
const soglia = (nome) => app.json('SOGLIE_STRUTTURA.' + nome + '.v');
const carico = p => p.piano.settimane.filter(w => w.fase !== 'scarico');
const scarichi = p => p.fasi.map((f, i) => f === 'scarico' ? i + 1 : null).filter(Boolean);
const lo = r => r[0];

/* esercizi di prova, uno per classe (attributi-esercizi.js) */
const ESERCIZI = { A: 'Squat con Bilanciere', B: 'Panca Piana Manubri', C: 'Leg Press', D: 'Leg Extension', E: 'Curl Bilanciere Bicipiti', F: 'Plank' };

/* un telefono con il programma v2 salvato (come lo scrive applyGeneratedProgram) e il profilo; l orologio sulla settimana `sett` (1..N) */
function telefono(d, sett) {
  const a = conSoglieStruttura(caricaApp({ ora: ORA }));
  const p = costruisci(d, a);
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs,
    split: p.split.nome, versione: 2, piano: p.piano, schema: { sets: 3, reps: 10 }, seme: 'mes', ispirazioni: p.ispirazioni });
  a.profilo({ level: d.level || BASE.level, age: d.age || BASE.age, goals: d.goals || BASE.goals, parq: false, luogo: d.luogo || BASE.luogo });
  if (sett) a.ora(new Date(2026, 9, 5 + 7 * (sett - 1), 12, 0, 0));
  return { a, p };
}
const rir = (a, nome, data) => a.json('rirPianoSettimana(' + JSON.stringify(nome) + (data === undefined ? '' : ', ' + JSON.stringify(data)) + ')');

test('le classi di prova sono quelle dichiarate nei dati', () => {
  Object.keys(ESERCIZI).forEach(c => assert.strictEqual(app.chiama('classeTecnica', ESERCIZI[c]), c, ESERCIZI[c]));
});

test('soglie-struttura.js: ogni numero ha valore, forza e fonte; i numeri del registro (rampe, RIR, scarico)', () => {
  const t = app.json('SOGLIE_STRUTTURA');
  Object.keys(t).forEach(k => {
    assert.ok(t[k].v !== undefined, k + ': v');
    assert.ok(['Solida', 'Moderata', 'Contrastata', 'Convenzione', 'Decisione', 'Provvisoria'].indexOf(t[k].forza) !== -1, k + ': forza');
    assert.ok(t[k].fonte && t[k].fonte.length > 10, k + ': fonte');
    assert.ok(Array.isArray(t[k].regole) && t[k].regole.length, k + ': regole');
  });
  assert.deepStrictEqual(soglia('rampaVolumeIntermedio'), [0.75, 0.85, 0.95, 1, 1]);
  assert.deepStrictEqual(soglia('rampaVolumeAvanzato'), [0.70, 0.80, 0.90, 1, 1]);
  assert.deepStrictEqual(soglia('rampaVolumePrincipiante'), [0.70, 0.70, 0.85, 0.85, 1]);
  assert.deepStrictEqual(soglia('rirIntermedio'), { pesanti: [3, 3, 2, 2, 1], macchine: [3, 2, 2, 1, 1], isolamenti: [3, 2, 1, 1, 0] });
  assert.deepStrictEqual(soglia('rirAvanzato'), { pesanti: [3, 2, 2, 1, 1], macchine: [3, 2, 1, 1, 0], isolamenti: [2, 1, 1, 0, 0] });
  assert.deepStrictEqual(soglia('rirPrincipiante'), { inizio: [3, 4], inizioSettimane: 2, dopo: [2, 3], ultimaSerieIsolamenti: { dallaSettimana: 7, rir: [1, 2] }, verifica: [3, 4] });
  assert.strictEqual(soglia('rirMassimo'), 4, 'il RIR non supera mai 4');
  /* la dose dello scarico: serie -35 / -50 / -60%, carico -5 / -10% sul riferimento di PRIMA (mai composto), 5-7 giorni, ripresa al 100% */
  assert.deepStrictEqual(soglia('scaricoSerie'), { bassa: 0.65, media: 0.5, alta: 0.4 });
  assert.deepStrictEqual(soglia('scaricoCarico'), { bassa: 0.95, media: 0.9, alta: 0.9 });
  assert.deepStrictEqual(soglia('scaricoGiorni'), [5, 7]);
  assert.strictEqual(soglia('scaricoRipresa'), 1);
  assert.deepStrictEqual(soglia('verificaPrincipiante'), { serie: 0.65, carico: 1, rir: [3, 4] });
  assert.deepStrictEqual(soglia('seriePrincipiante').multi.slice(0, 5), [2, 2, 3, 3, 3]);
  assert.deepStrictEqual(soglia('seriePrincipiante').altri.slice(0, 5), [2, 2, 2, 2, 3]);
});

test('MES-01 e PRN-03: durata e blocchi per livello (strutturaProgramma, fasiProgramma compatibili con prima)', () => {
  const s = (l, p) => app.json('strutturaProgramma(' + JSON.stringify(l) + (p ? ', true' : '') + ')');
  assert.deepStrictEqual(s('principiante'), { settimane: 12, blocco: 12 }, 'PRN-03: 12 settimane, scarico solo alla 12a');
  assert.deepStrictEqual(s('intermedio'), { settimane: 12, blocco: 6 }, 'MES-01: 5+1 per due blocchi');
  assert.deepStrictEqual(s('avanzato'), { settimane: 12, blocco: 6 });
  assert.deepStrictEqual(s('principiante', true), { settimane: 8, blocco: 4 }, 'prudenti: 3+1 come prima');
  assert.deepStrictEqual(s('intermedio', true), { settimane: 12, blocco: 4 });
  assert.deepStrictEqual(s('avanzato', true), { settimane: 12, blocco: 6 });
  assert.deepStrictEqual(app.json("fasiProgramma({ settimane: 4, blocco: 2 })"), ['carico', 'scarico', 'carico', 'scarico']);
  [['principiante', [12]], ['intermedio', [6, 12]], ['avanzato', [6, 12]]].forEach(([l, att]) => {
    const p = costruisci({ level: l });
    assert.deepStrictEqual(scarichi(p), att, l);
    assert.strictEqual(p.scheme.settimane, p.settimane, l + ' MOD-09: la durata viene dal piano, schemeFor.settimane non la contraddice piu');
  });
});

test('MES-03: la rampa di volume del blocco (intermedio 0,75-1, avanzato 0,70-1), lo scarico, i prioritari dell avanzato', () => {
  const int = costruisci({ level: 'intermedio', days: 4 });
  assert.deepStrictEqual(int.piano.settimane.map(w => w.volume), [0.75, 0.85, 0.95, 1, 1, 0.5, 0.75, 0.85, 0.95, 1, 1, 0.5], 'l intermedio a 4 giorni: dose di scarico media (-50%)');
  const av = costruisci({ level: 'avanzato', days: 4 });
  assert.deepStrictEqual(av.piano.settimane.map(w => w.volume), [0.7, 0.8, 0.9, 1, 1, 0.5, 0.7, 0.8, 0.9, 1, 1, 0.5]);
  assert.deepStrictEqual(av.piano.settimane.map(w => w.prioritari), [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0], '+1 serie ai prioritari dalla 3a settimana del blocco (solo avanzato)');
  assert.ok(int.piano.settimane.every(w => w.prioritari === 0), 'l intermedio no: ha RIC-01');
  /* salute e dimagrimento: la rampa non parte sotto 0,80 */
  assert.deepStrictEqual(costruisci({ level: 'intermedio', goals: ['salute'] }).piano.settimane.slice(0, 5).map(w => w.volume), [0.8, 0.85, 0.95, 1, 1]);
  assert.deepStrictEqual(costruisci({ level: 'avanzato', goals: ['dimagrimento'] }).piano.settimane.slice(0, 5).map(w => w.volume), [0.8, 0.8, 0.9, 1, 1]);
  /* nessuna rampa per i prudenti: volume 1 e nessun +1 */
  [{ age: 70 }, { parq: 'si' }, { age: 16 }].forEach(x => ['intermedio', 'avanzato'].forEach(level => {
    const p = costruisci(Object.assign({ level }, x));
    assert.ok(carico(p).every(w => w.volume === 1 && w.prioritari === 0), level + ' ' + JSON.stringify(x));
  }));
});

test('PRN-03: le 12 settimane del principiante (serie 2 poi 3, ripetizioni, RIR 3-4 poi 2-3, controllo all 8a, verifica alla 12a)', () => {
  const p = costruisci({ level: 'principiante', days: 3 });
  const w = p.piano.settimane;
  assert.strictEqual(p.settimane, 12);
  assert.deepStrictEqual(p.fasi, Array(11).fill('carico').concat(['scarico']));
  assert.deepStrictEqual(w.map(x => x.fase), ['carico', 'carico', 'carico', 'carico', 'carico', 'carico', 'carico', 'controllo', 'carico', 'carico', 'carico', 'scarico']);
  assert.deepStrictEqual(w.map(x => x.serie.multi), [2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], 'serie sui primi tre esercizi: 2, 2, poi 3');
  assert.deepStrictEqual(w.map(x => x.serie.altri), [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2], 'serie sugli altri: 2 fino alla 4a, 3 dalla 5a');
  assert.deepStrictEqual(w.slice(0, 5).map(x => x.volume), [0.7, 0.7, 0.85, 0.85, 1]);
  assert.deepStrictEqual(w[0].rip, { multi: [10, 12], isolamento: [12, 15] });
  assert.deepStrictEqual(w[2].rip, { multi: [8, 12], isolamento: [10, 15] });
  /* RIR 3-4 nelle settimane 1-2, 2-3 dalla 3a alla 11a, mai 0; alla 12a (verifica) 3-4 */
  w.forEach(x => Object.keys(x.rir).forEach(c => {
    const atteso = x.n <= 2 || x.n === 12 ? [3, 4] : [2, 3];
    assert.deepStrictEqual(x.rir[c], atteso, 'settimana ' + x.n + ' classe ' + c);
  }));
  /* dalla 7a l ultima serie degli isolamenti a macchina o cavo (D) scende a 1-2 */
  assert.deepStrictEqual(w.map(x => x.rirUltima || null), [null, null, null, null, null, null, { D: [1, 2] }, { D: [1, 2] }, { D: [1, 2] }, { D: [1, 2] }, { D: [1, 2] }, null]);
  /* la 12a: verifica con le serie -35%, carico invariato, RIR 3-4 */
  assert.strictEqual(w[11].volume, 0.65);
  assert.strictEqual(w[11].carico, 1);
  assert.strictEqual(w[11].dose, 'bassa');
  assert.strictEqual(w[11].carico, soglia('verificaPrincipiante').carico);
  assert.ok(w.slice(0, 11).every(x => x.carico === null), 'in carico nessun fattore sul carico');
  assert.strictEqual(p.piano.struttura.controllo, 8);
  assert.deepStrictEqual(p.rirSett, [3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]);
  assert.ok(p.note.some(n => /^Programma di 12 settimane/.test(n)), 'la nota del programma');
  assert.ok(p.perche.some(x => x.codice === 'PRN-03'), 'il perche con il codice');
});

test('PRN-03 / B4: il controllo dell 8a settimana diventa uno scarico «basso» solo con fatica media o alta o un segnale di MES-07', () => {
  const c = (f, s) => app.json('esitoControlloPrincipiante(' + JSON.stringify(f) + ', ' + !!s + ')');
  assert.deepStrictEqual(c('alta', false), { fase: 'scarico', dose: 'bassa' }, 'fatica alta all 8a');
  assert.deepStrictEqual(c('media', false), { fase: 'scarico', dose: 'bassa' });
  assert.deepStrictEqual(c('bassa', true), { fase: 'scarico', dose: 'bassa' }, 'un segnale acceso basta');
  assert.deepStrictEqual(c('bassa', false), { fase: 'carico', dose: null }, 'altrimenti la settimana continua');
  /* la dose «bassa» e quella del registro: serie -35%, carico -5% */
  assert.deepStrictEqual([soglia('scaricoSerie').bassa, soglia('scaricoCarico').bassa], [0.65, 0.95]);
  /* il piano dice solo che l 8a e un controllo: la fase di calendario resta «carico» finche il controllo non decide */
  const p = costruisci({ level: 'principiante' });
  assert.strictEqual(p.fasi[7], 'carico');
  assert.strictEqual(p.piano.settimane[7].fase, 'controllo');
  assert.deepStrictEqual(app.json('SOGLIE_STRUTTURA.controlloOttava.v'), { scaricoSeFatica: ['media', 'alta'], dose: 'bassa' });
});

test('principiante prudente (over 65, PAR-Q positivo) e minorenne: 8 settimane a blocchi 3+1, nessuna rampa, RIR fisso 3-4; il minorenne mai sotto 2', () => {
  [{ age: 70 }, { parq: 'si' }].forEach(x => {
    const p = costruisci(Object.assign({ level: 'principiante' }, x));
    assert.strictEqual(p.settimane, 8);
    assert.deepStrictEqual(p.fasi, ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico']);
    assert.strictEqual(p.piano.modo, 'prudente');
    p.piano.settimane.forEach(w => {
      assert.ok(w.serie === undefined && w.rip === undefined, 'niente tabella delle serie del principiante');
      Object.keys(w.rir).forEach(c => assert.deepStrictEqual(w.rir[c], w.fase === 'scarico' ? [4, 5] : [3, 4], 'settimana ' + w.n));
      if (w.fase === 'scarico') assert.strictEqual(w.carico, 0.9, 'prudenti: dose media');
    });
    assert.deepStrictEqual(p.rirSett, [3, 3, 3, 4, 3, 3, 3, 4]);
    assert.ok(!p.note.some(n => /^Programma di/.test(n) || /^Mesociclo:/.test(n)), 'nessuna nota della rampa per i prudenti');
  });
  const m = costruisci({ level: 'principiante', age: 16 });
  assert.strictEqual(m.piano.modo, 'minore');
  assert.strictEqual(m.settimane, 8);
  m.piano.settimane.filter(w => w.fase === 'carico').forEach(w => Object.keys(w.rir).forEach(c => assert.ok(lo(w.rir[c]) >= 2, 'minorenne settimana ' + w.n + ' ' + c)));
  assert.deepStrictEqual(m.piano.settimane[0].rir.A, [3, 4]);
  assert.deepStrictEqual(m.piano.settimane[2].rir.A, [2, 3]);
  const mi = costruisci({ level: 'intermedio', age: 16 });
  mi.piano.settimane.filter(w => w.fase === 'carico').forEach(w => Object.keys(w.rir).forEach(c => assert.deepStrictEqual(w.rir[c], [2, 3])));
  assert.deepStrictEqual(mi.rirSett, [2, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4], 'come prima della v2');
});

test('MES-02: la tabella del RIR per livello, classe e settimana (intermedio, avanzato) con i pavimenti dei fondamentali', () => {
  const int = costruisci({ level: 'intermedio' }).piano.settimane;
  const col = (w, c, da, a) => w.slice(da, a).map(x => x.rir[c]);
  /* A = pesanti col bilanciere, C = macchine, D = isolamenti */
  assert.deepStrictEqual(col(int, 'A', 0, 6), [[3, 4], [3, 4], [2, 3], [2, 3], [1, 2], [4, 5]]);
  assert.deepStrictEqual(col(int, 'C', 0, 6), [[3, 4], [2, 3], [2, 3], [1, 2], [1, 2], [4, 5]]);
  assert.deepStrictEqual(col(int, 'D', 0, 6), [[3, 4], [2, 3], [1, 2], [1, 2], [0, 1], [4, 5]]);
  assert.deepStrictEqual(col(int, 'A', 6, 12), col(int, 'A', 0, 6), 'il secondo blocco riparte dalla settimana 1');
  const av = costruisci({ level: 'avanzato' }).piano.settimane;
  assert.deepStrictEqual(col(av, 'A', 0, 6), [[3, 4], [2, 3], [2, 3], [1, 2], [1, 2], [4, 5]]);
  assert.deepStrictEqual(col(av, 'C', 0, 6), [[3, 4], [2, 3], [1, 2], [1, 2], [0, 1], [4, 5]]);
  assert.deepStrictEqual(col(av, 'D', 0, 6), [[2, 3], [1, 2], [1, 2], [0, 1], [0, 1], [4, 5]]);
  /* INT-2d (minor 2 della revisione, MAV-02): core e tenute come gli isolamenti, ma mai a RIR 0 (pavimentoCore 1): prima la tabella dava [0, 1] a avanzato e intermedio dalla 4a-5a settimana */
  assert.deepStrictEqual(col(av, 'F', 0, 5), col(av, 'D', 0, 5).map(r => r[0] < 1 ? [1, 2] : r), 'core e tenute come gli isolamenti, con il pavimento 1');
  assert.ok([int, av].every(w => w.every(x => x.rir.F[0] >= 1)), 'il core non e mai a RIR 0');
  /* pavimento 1 sui pesanti col bilanciere (A) e sui multiarticolari liberi (B): mai RIR 0 */
  [int, av].forEach(w => w.forEach(x => { assert.ok(lo(x.rir.A) >= 1, 'A settimana ' + x.n); assert.ok(lo(x.rir.B) >= 1, 'B settimana ' + x.n); }));
  /* mai sopra 4 come limite basso, bersaglio sempre di due valori consecutivi */
  [int, av].forEach(w => w.forEach(x => Object.keys(x.rir).forEach(c => { assert.ok(lo(x.rir[c]) <= 4); assert.strictEqual(x.rir[c][1] - x.rir[c][0], 1); })));
  /* alla settimana 1 almeno 3 (principiante) o 2 (altri) su ogni classe (collaudo RIR-03) */
  [int, av].forEach(w => Object.keys(w[0].rir).forEach(c => assert.ok(lo(w[0].rir[c]) >= 2)));
});

test('OBI-03: salute mai sotto 2, forza [2, 4] sui pesanti, deficit pavimento 2 sui pesanti e 1 sul resto', () => {
  const salute = costruisci({ level: 'avanzato', goals: ['salute'] }).piano.settimane;
  salute.filter(w => w.fase === 'carico').forEach(w => Object.keys(w.rir).forEach(c => assert.ok(lo(w.rir[c]) >= 2, 'salute settimana ' + w.n + ' ' + c)));
  assert.deepStrictEqual(salute[0].rir.D, [2, 3], 'la tabella dell avanzato parte da 2: resta');
  const forza = costruisci({ level: 'intermedio', goals: ['forza'] }).piano.settimane;
  assert.deepStrictEqual(forza.slice(0, 5).map(w => w.rir.A), [[3, 4], [3, 4], [2, 4], [2, 4], [2, 4]], 'forza: pesanti [2, 4], la scorta di 3-4 delle prime settimane resta');
  assert.deepStrictEqual(forza[4].rir.D, [0, 1], 'gli isolamenti seguono la tabella');
  const taglio = costruisci({ level: 'avanzato', goals: ['dimagrimento'] }).piano.settimane;
  taglio.filter(w => w.fase === 'carico').forEach(w => {
    assert.ok(lo(w.rir.A) >= 2, 'deficit: pesanti almeno 2, settimana ' + w.n);
    ['B', 'C', 'D', 'E', 'F'].forEach(c => assert.ok(lo(w.rir[c]) >= 1, 'deficit: resto almeno 1, settimana ' + w.n + ' ' + c));
  });
  /* il primo obiettivo guida: massa + dimagrimento = deficit (OBI-02) */
  assert.ok(costruisci({ level: 'avanzato', goals: ['massa', 'dimagrimento'] }).piano.settimane.slice(0, 5).every(w => lo(w.rir.A) >= 2));
});

test('forma del piano: 12 combinazioni livello x obiettivo, scarico con dose, passaggio di blocco', () => {
  ['principiante', 'intermedio', 'avanzato'].forEach(level => ['massa', 'forza', 'salute', 'dimagrimento'].forEach(goal => {
    const p = costruisci({ level, goals: [goal], days: 3 }), pi = p.piano, et = level + ' ' + goal;
    assert.strictEqual(p.versione, 2, et);
    assert.strictEqual(pi.versione, 2);
    assert.deepStrictEqual([pi.livello, pi.modo, pi.obiettivo], [level, 'normale', goal], et);
    assert.strictEqual(pi.settimane.length, p.settimane, et);
    assert.deepStrictEqual(pi.struttura, { settimane: 12, blocco: level === 'principiante' ? 12 : 6, controllo: level === 'principiante' ? 8 : null,
      anticipabile: level === 'principiante' ? null : { settimaneCaricoMinime: 4 } }, et);
    assert.strictEqual(p.rirSett.length, p.settimane, et);
    pi.settimane.forEach((w, i) => {
      assert.strictEqual(w.n, i + 1);
      assert.strictEqual(w.fase === 'scarico', p.fasi[i] === 'scarico', et + ' settimana ' + w.n);
      assert.deepStrictEqual(Object.keys(w.rir), ['A', 'B', 'C', 'D', 'E', 'F']);
      assert.ok(['G1', 'G2'].indexOf(w.tecniche) !== -1);
      assert.ok(w.volume > 0 && w.volume <= 1, et + ' volume ' + w.volume);
      if (w.fase === 'scarico') assert.ok([0.95, 0.9, 1].indexOf(w.carico) !== -1 && ['bassa', 'media'].indexOf(w.dose) !== -1, et + ' scarico');
      else assert.deepStrictEqual([w.carico, w.dose], [null, null]);
      if (level === 'principiante') assert.ok(w.tecniche === 'G1', 'il principiante: niente G2');
    });
    /* tecniche: solo G1 nelle settimane 1-2 del blocco, dalla 3a G2 (intermedio e avanzato) */
    if (level !== 'principiante') assert.deepStrictEqual(pi.settimane.slice(0, 6).map(w => w.tecniche), ['G1', 'G1', 'G2', 'G2', 'G2', 'G1']);
    assert.strictEqual(pi.scarico.ripresa, 1);
    assert.deepStrictEqual(pi.scarico.giorni, [5, 7]);
    assert.deepStrictEqual(pi.scarico.rir, [4, 5]);
    assert.deepStrictEqual(pi.passaggio, { prioritaPiuSerie: 1, fondamentaliBlocchi: [2, 3], accessoriRuotati: [0.33, 0.5], rampaRiparte: true });
  }));
});

test('scarico: una dose sola (serie -35 / -50 / -60%, carico -5 / -10% sul riferimento di prima, 5-7 giorni, ripresa al 100%); la dose di partenza dipende dai giorni', () => {
  const dose = (d) => { const w = costruisci(d).piano.settimane.find(x => x.fase === 'scarico'); return { dose: w.dose, volume: w.volume, carico: w.carico }; };
  assert.deepStrictEqual(dose({ level: 'intermedio', days: 3 }), { dose: 'bassa', volume: 0.65, carico: 0.95 }, '3 giorni: bassa, serie -35%, carico -5%');
  assert.deepStrictEqual(dose({ level: 'intermedio', days: 4 }), { dose: 'media', volume: 0.5, carico: 0.9 }, '4 giorni: media, serie -50%, carico -10%');
  assert.deepStrictEqual(dose({ level: 'avanzato', days: 6 }), { dose: 'media', volume: 0.5, carico: 0.9 });
  assert.deepStrictEqual(dose({ level: 'intermedio', days: 3, age: 70 }), { dose: 'media', volume: 0.5, carico: 0.9 }, 'prudenti: media');
  const s = costruisci({ level: 'intermedio' }).piano.scarico;
  assert.deepStrictEqual(s.serie, { bassa: 0.65, media: 0.5, alta: 0.4 });
  assert.deepStrictEqual(s.carico, { bassa: 0.95, media: 0.9, alta: 0.9 });
  assert.deepStrictEqual([1 - s.serie.bassa, 1 - s.serie.media, 1 - s.serie.alta].map(x => Math.round(x * 100)), [35, 50, 60]);
  assert.deepStrictEqual([1 - s.carico.bassa, 1 - s.carico.media].map(x => Math.round(x * 100)), [5, 10]);
  /* mai composto: il fattore del carico e UNO, uguale per tutte le settimane di scarico (sul riferimento di prima, MES-06) */
  const w = costruisci({ level: 'intermedio' }).piano.settimane.filter(x => x.fase === 'scarico');
  assert.strictEqual(new Set(w.map(x => x.carico)).size, 1);
});

test('rirPianoSettimana: il RIR di un esercizio nella settimana, dal programma salvato (per classe, per numero di settimana, per data, per oggi)', () => {
  const { a } = telefono({ level: 'intermedio' }, 1);
  const att = { A: [[3, 4], [3, 4], [2, 3], [2, 3], [1, 2], [4, 5]], C: [[3, 4], [2, 3], [2, 3], [1, 2], [1, 2], [4, 5]], D: [[3, 4], [2, 3], [1, 2], [1, 2], [0, 1], [4, 5]] };
  Object.keys(att).forEach(c => att[c].forEach((r, i) => {
    assert.deepStrictEqual(rir(a, ESERCIZI[c], i + 1), r, 'classe ' + c + ' settimana ' + (i + 1) + ' (numero di settimana)');
    const giorno = new Date(2026, 9, 5 + 7 * i + 2, 12, 0, 0), ymd = a.ymd(giorno);
    assert.deepStrictEqual(rir(a, ESERCIZI[c], ymd), r, 'classe ' + c + ' settimana ' + (i + 1) + ' (data ' + ymd + ')');
    a.ora(giorno);
    assert.deepStrictEqual(rir(a, ESERCIZI[c]), r, 'classe ' + c + ' settimana ' + (i + 1) + ' (oggi)');
  }));
  assert.deepStrictEqual(rir(a, '💪 ' + ESERCIZI.A, 5), [1, 2], 'con o senza emoji nel nome');
  assert.strictEqual(rir(a, ESERCIZI.A, 13), null, 'oltre il programma: il RIR di prima');
  assert.strictEqual(rir(a, ESERCIZI.A, '2026-09-28'), null, 'prima dell inizio');
  assert.strictEqual(app.json('typeof rirPianoSettimana'), 'function');
});

test('rirPianoSettimana: pavimenti dell esercizio (pesi liberi almeno 1, in casa da soli almeno 2, RIR 0 solo con prontezza almeno 60)', () => {
  const pal = telefono({ level: 'intermedio', luogo: 'palestra' }, 5).a, casa = telefono({ level: 'intermedio', luogo: 'manubri' }, 5).a;
  assert.deepStrictEqual(rir(pal, ESERCIZI.B), [1, 2], 'palestra: Panca con manubri come le macchine alla 5a, ma mai 0 (pesi liberi)');
  assert.deepStrictEqual(rir(casa, ESERCIZI.B), [2, 3], 'CAS-11: a casa, da soli, sugli esercizi che possono cadere addosso almeno 2');
  assert.deepStrictEqual(rir(casa, ESERCIZI.A), [2, 3], 'bilanciere a casa: almeno 2');
  assert.deepStrictEqual(rir(casa, ESERCIZI.C), [1, 2], 'la macchina non cade addosso (a casa non c e, ma il dato e quello)');
  assert.deepStrictEqual(rir(casa, 'Piegamenti a Terra (Push-up)', 5), rir(casa, ESERCIZI.C, 5), 'il solo corpo libero (piegamenti, rematori) resta con la tabella');
  assert.deepStrictEqual(rir(pal, ESERCIZI.D), [0, 1], 'isolamento a macchina alla 5a settimana: 0-1');
  /* prontezza di oggi sotto 60: lo 0 diventa 1 */
  pal.scrivi(pal.chiave('PRONTEZZA_KEY'), { data: pal.ymd(), day: 'Lunedì', punteggio: 50 });
  assert.deepStrictEqual(rir(pal, ESERCIZI.D), [1, 2], 'prontezza 50: RIR 0 solo con almeno 60');
  pal.scrivi(pal.chiave('PRONTEZZA_KEY'), { data: pal.ymd(), day: 'Lunedì', punteggio: 70 });
  assert.deepStrictEqual(rir(pal, ESERCIZI.D), [0, 1], 'prontezza 70: resta');
  assert.deepStrictEqual(rir(pal, ESERCIZI.D, 5), [0, 1], 'per una data o una settimana precisa la prontezza di oggi non conta');
  /* deficit calorico: pavimento 2 sui pesanti */
  const taglio = telefono({ level: 'avanzato', goals: ['massa', 'dimagrimento'] }, 5).a;
  taglio.profilo({ level: 'avanzato', goals: ['massa', 'dimagrimento'] });
  assert.ok(lo(rir(taglio, ESERCIZI.A)) >= 2);
});

test('versione 2 salvata: applyGeneratedProgram scrive versione, piano, volume, perche, modalita, cardio; senza soglie il programma e quello della v1', () => {
  const salva = (a, d) => {
    a.g('onbData = Object.assign(onbData || {}, ' + JSON.stringify(Object.assign({}, BASE, d, { inizio: 'questa' })) + ')');
    a.g('applyGeneratedProgram()');
    assert.deepStrictEqual(a.errori, []);
    return a.leggi(a.chiave('progKey'));
  };
  const s = salva(conSoglieStruttura(caricaApp({ ora: ORA })), { level: 'intermedio' });
  assert.strictEqual(s.versione, 2);
  assert.strictEqual(s.piano.versione, 2);
  assert.strictEqual(s.piano.settimane.length, 12);
  assert.deepStrictEqual([s.settimane, s.blocco], [12, 6]);
  assert.deepStrictEqual(s.fasi.filter(f => f === 'scarico').length, 2);
  assert.strictEqual(s.volume, null, 'il volume per unita e di W2-T1: finche non c e, null');
  assert.ok(Array.isArray(s.perche) && s.perche.some(x => x.codice === 'MES-01' && x.sottoCoach === 'architetto'), 'il perche del mesociclo con il suo codice');
  assert.strictEqual(s.modalita, 'generale');
  assert.strictEqual(s.cardio, null);
  assert.deepStrictEqual(s.rirSett, [3, 3, 2, 2, 1, 4, 3, 3, 2, 2, 1, 4], 'i campi di prima ci sono ancora: chi li legge non cambia');
  ['creato', 'inizio', 'settimane', 'blocco', 'fasi', 'goals', 'prefs', 'split', 'rirSett', 'schema', 'seme', 'ispirazioni'].forEach(k => assert.ok(k in s, 'campo di sempre ' + k));
  /* senza soglie: il programma salvato e identico a quello della v1 (nessun campo nuovo) */
  const v1 = salva(senzaSoglie(caricaApp({ ora: ORA })), { level: 'intermedio' });
  ['versione', 'piano', 'volume', 'perche', 'modalita', 'cardio'].forEach(k => assert.ok(!(k in v1), 'v1: niente ' + k));
  assert.deepStrictEqual([v1.settimane, v1.blocco, v1.rirSett], [12, 4, null]);
});

test('programmi salvati dalla v1: nessun piano, nessun errore, rirPianoSettimana ritorna null e la settimana si legge come prima', () => {
  assert.ok(elencoFixture().length >= 6);
  elencoFixture().forEach(nome => {
    const a = conSoglieStruttura(caricaApp({ fixture: nome }));
    const p = a.json('getProgramma()');
    assert.ok(p && p.fasi && p.inizio, nome + ': programma');
    assert.strictEqual(p.piano, undefined, nome + ': un programma v1 non ha il piano');
    assert.strictEqual(p.versione, undefined);
    assert.strictEqual(a.json('rirPianoSettimana("Squat con Bilanciere")'), null, nome);
    assert.strictEqual(a.json('rirPianoSettimana("Leg Extension", 3)'), null, nome);
    assert.strictEqual(a.json('pianoDellaSettimana()'), null, nome);
    const st = a.json('settimanaProgramma()');
    assert.ok(st && st.numero >= 1, nome + ': settimanaProgramma');
    const r = a.json('rirBersaglioBase("Squat con Bilanciere")');
    assert.ok(Array.isArray(r) && r.length === 2 && r[0] >= 0, nome + ': rirBersaglioBase come prima ' + JSON.stringify(r));
    assert.deepStrictEqual(a.errori, [], nome);
  });
});

test('regole spente: MES-02 spenta = RIR di prima (rirPianoSettimana null, rirSett degli avanzati 3-2-1-0); senza soglie nessun piano', () => {
  const { a } = telefono({ level: 'intermedio' }, 3);
  assert.deepStrictEqual(rir(a, ESERCIZI.A), [2, 3]);
  a.spegni(['MES-02']);
  assert.strictEqual(rir(a, ESERCIZI.A), null, 'MES-02 spenta: vale il RIR di prima');
  a.riaccendi();
  const spenta = conSoglieStruttura(caricaApp({ ora: ORA }));
  spenta.spegni(['MES-02']);
  const av = costruisci({ level: 'avanzato' }, spenta);
  assert.deepStrictEqual(av.rirSett, [3, 2, 2, 1, 0, 4, 3, 2, 2, 1, 0, 4], 'rirSett e quello di prima: la rampa 3, 2, 1, 0 degli avanzati');
  assert.ok(av.piano.settimane.every(w => w.rir === null), 'nessuna tabella del RIR nel piano');
  const v1 = senzaSoglie(caricaApp({ ora: ORA }));
  assert.strictEqual(costruisci({ level: 'avanzato' }, v1).piano, undefined);
  assert.strictEqual(v1.json('rirPianoSettimana("Squat con Bilanciere", 1)'), null);
  /* le regole nuove, quando il catalogo le conosce (dopo l integrazione), si spengono una a una */
  const nelCatalogo = c => app.g("typeof regolaDescritta === 'function' && !!regolaDescritta('" + c + "')");
  if (['PRN-03', 'MES-01', 'MES-03', 'OBI-03'].every(nelCatalogo)) {
    const b = conSoglieStruttura(caricaApp({ ora: ORA }));
    b.spegni(['PRN-03', 'MES-01']);
    assert.deepStrictEqual(b.json("strutturaProgramma('principiante')"), { settimane: 8, blocco: 8 });
    assert.deepStrictEqual(b.json("strutturaProgramma('intermedio')"), { settimane: 12, blocco: 4 });
    b.riaccendi(); b.spegni(['MES-03']);
    assert.ok(costruisci({ level: 'intermedio' }, b).piano.settimane.every(w => w.volume === 1 || w.fase === 'scarico'), 'MES-03 spenta: nessuna rampa');
    b.riaccendi(); b.spegni(['OBI-03']);
    assert.deepStrictEqual(costruisci({ level: 'intermedio', goals: ['forza'] }, b).piano.settimane[4].rir.A, [1, 2], 'OBI-03 spenta: forza come la tabella');
  }
});

test('su 120 profili: il piano e coerente con le fasi, i RIR hanno i pavimenti, i prudenti non hanno rampa, i minorenni mai sotto 2', () => {
  const lista = profili(app, 120, 'mes');
  let principianti = 0, prudenti = 0, minori = 0;
  lista.forEach((d, i) => {
    const p = app.dati(app.chiama('buildProgram', d));
    const eta = d.age || 0, parq = d.parq === 'si' || d.parq === true;
    const minore = eta > 0 && eta < 18, over65 = eta >= 65, cauto = over65 || parq || minore;
    const et = 'profilo ' + i + ' ' + d.level + ' ' + (d.goals || [d.goal]).join('+') + ' eta ' + eta + ' parq ' + d.parq;
    assert.strictEqual(p.versione, 2, et);
    assert.strictEqual(p.piano.settimane.length, p.settimane, et);
    assert.strictEqual(p.rirSett.length, p.settimane, et);
    assert.strictEqual(p.scheme.settimane, p.settimane, et);
    assert.strictEqual(p.piano.modo, over65 || parq ? 'prudente' : (minore ? 'minore' : 'normale'), et);
    if (!cauto) assert.strictEqual(p.blocco, d.level === 'principiante' ? 12 : 6, et); else assert.strictEqual(p.blocco, d.level === 'avanzato' ? 6 : 4, et);
    p.piano.settimane.forEach((w, k) => {
      assert.strictEqual(w.fase === 'scarico', p.fasi[k] === 'scarico', et);
      Object.keys(w.rir).forEach(c => {
        assert.ok(lo(w.rir[c]) >= 0 && lo(w.rir[c]) <= 4 && w.rir[c][1] > w.rir[c][0], et + ' RIR ' + JSON.stringify(w.rir[c]));
        assert.ok(lo(w.rir.A) >= 1 && lo(w.rir.B) >= 1, et + ': mai RIR 0 sui pesanti e sui liberi');
        if (d.level === 'principiante' && !cauto) assert.ok(lo(w.rir[c]) >= 2, et + ': il principiante mai sotto 2');
        if (minore) assert.ok(lo(w.rir[c]) >= 2, et + ': minorenne mai sotto 2');
        if (w.fase === 'carico' && (over65 || parq)) assert.deepStrictEqual(w.rir[c], [3, 4], et + ': prudente 3-4 fisso');
      });
      if (cauto && w.fase === 'carico') { assert.strictEqual(w.volume, 1, et); assert.strictEqual(w.prioritari, 0, et); }
      if (w.fase === 'scarico') assert.ok(w.volume < 1 && w.carico > 0, et);
    });
    if (d.level === 'principiante') principianti++;
    if (over65 || parq) prudenti++;
    if (minore) minori++;
  });
  assert.ok(principianti >= 10 && prudenti >= 10 && minori >= 5, 'il campione tocca principianti ' + principianti + ', prudenti ' + prudenti + ', minorenni ' + minori);
  assert.deepStrictEqual(app.errori, []);
});
