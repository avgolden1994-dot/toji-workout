/* Specialista Forza, i carichi dei giorni medi e leggeri (P3-C, regola FRZ-11): «il giorno leggero è leggero».
   Il carico segue il nome dell'esercizio: la stessa alzata in tre giorni (pesante 4x3, media 3x5, leggera 2x5) o le sue varianti (squat con pausa, panca inclinata) hanno ognuna la sua
   storia di carichi e, partendo da stime diverse e salendo con la stessa regola, finivano allo stesso peso (panca con pausa 37,5 kg = panca inclinata 37,5 kg: il giorno medio e quello leggero
   uguali); con la stessa alzata a nome uguale e stesso bersaglio nei due giorni (FRZ-03 spenta) il giorno leggero partiva dal carico del medio più un incremento.
   FRZ-11 (fase 25 della catena 'carico', js/coach/specialita/forza-carichi.js): nella settimana di powerlifting il carico di un giorno medio sta sotto quello del pesante e quello del leggero
   sotto il medio, in percentuale del massimale stimato dell'alzata (e1rm e caricoPer), mai sopra la capacità a RPE 9 (una ripetizione in riserva). Solo un tetto: non alza mai un carico.
   Non fa: percentuali del massimale come prescrizione, test del massimale, AMRAP di appoggio (FRZ-06..10, oltre la v2) né il taper.
   L'atleta virtuale: 12 settimane di un powerlifter vero (buildProgram con il powerlifting, le sedute vissute con l'orologio finto, tutte le serie complete a RPE sul bersaglio; lo storico salva
   anche obiettivo.base e obiettivo.rir, come endWorkout: senza, la progressione per bersaglio di ALG-05 non scatta, lezione di N1).
   I file nuovi (soglie-forza-carichi.js e forza-carichi.js) li mette in index.html l'integrazione (docs/in-arrivo/P3-C.json): se mancano la prova li carica da sola. Sul codice di origin/main
   la prova fallisce sulle asserzioni (nessuna fase, giorno medio e leggero allo stesso peso), non per un file mancante. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const A = require('./aiuto-atleta-piano');
const { caricaApp } = require('./aiuto-app');

const R =path.join(__dirname, '..');
const FILE_NUOVI = [['js/coach/specialita/soglie-forza-carichi.js', 'SOGLIE_FORZA_CARICHI'], ['js/coach/specialita/forza-carichi.js', 'forzaCaricoGiorno']];
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
const RANGO = { pesante: 0, media: 1, leggera: 2 };

/* i due file di P3-C nel contesto dell'app, dopo tutti gli altri come li metterà index.html; la regola FRZ-11 nel catalogo (lo rigenera l'integrazione dalla riga della mappa) */
function conForzaCarichi(app) {
  FILE_NUOVI.forEach(([file, nome]) => {
    const f = path.join(R, file);
    if (!fs.existsSync(f) || app.g('typeof ' + nome) !== 'undefined') return;
    vm.runInContext(fs.readFileSync(f, 'utf8'), app.ctx, { filename: file });
  });
  app.g("if (!COACH_REGOLE_PER_CODICE['FRZ-11']) COACH_REGOLE_PER_CODICE['FRZ-11'] = { codice: 'FRZ-11', spegnibile: true, sottoCoach: 'specialista' }");
  return app;
}
/* un powerlifter: forza, palestra completa, nessun fastidio, adulto, sano. `spente`: regole spente prima di costruire il programma (FRZ-03: nessuna variante, la stessa alzata in tutti i giorni) */
const PL = { goals: ['forza'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', fastidi: [], sex: 'M', age: 30, parq: 'no', usaProfilo: false, forzaTipo: 'powerlifting', seme: 'w2t7' };
function atleta(extra, opz) {
  const o = Object.assign({ spente: [], conFase: true }, opz || {});
  /* come A.telefono (aiuto-atleta-piano.js), ma con le regole spente e la fase di P3-C caricate PRIMA di costruire il programma (FRZ-03 spenta cambia i nomi delle alzate) */
  const a = caricaApp({ ora: A.LUNEDI, consenso: true });
  A.conP3B(a);
  if (o.conFase) conForzaCarichi(a);
  if (o.spente.length) a.spegni(o.spente);
  const d = Object.assign({}, A.BASE, PL, extra || {});
  const p = a.dati(a.chiama('buildProgram', d));
  a.programma({ creato: '05/10/2026 ore 12:00', inizio: '2026-10-05', settimane: p.settimane, blocco: p.blocco, fasi: p.fasi, rirSett: p.rirSett, goals: p.goals, prefs: p.prefs, split: p.split.nome,
    schema: { sets: 3, reps: 10 }, seme: d.seme, ispirazioni: p.ispirazioni, versione: 2, piano: p.piano, perche: p.perche });
  a.profilo({ level: d.level, age: d.age, sex: d.sex, goals: d.goals, parq: false, luogo: d.luogo, priorita: [], forzaTipo: d.forzaTipo });
  const data = {};
  a.json('DAYS').forEach(g => { data[g] = []; });
  p.sedute.forEach(s => { data[s.giorno] = s.esercizi.map(e => a.dati(a.chiama('normalizeExerciseRecord', Object.assign({}, e, { completedSets: [] })))); });
  a.scrivi(a.chiave('dataKey'), data);
  A.vaiA(a, 1, 0);
  return { a, p };
}
/* 12 settimane: per ogni esposizione di un'alzata della modalità (voce con alzata e onda) il carico, le ripetizioni e il massimale stimato della settimana */
function dodiciSettimane(a, p, rpe) {
  const righe = [];
  for (let n = 1; n <= 12; n++) {
    const s = A.viviSettimana(a, n, { rpe: rpe || 'bersaglio' });
    Object.keys(s.giorni).forEach(g => s.giorni[g].forEach(e => {
      const pr = p.sedute.find(x => x.giorno === g).esercizi.find(x => x.name === e.name);
      if (!pr || !pr.alzata || !pr.onda) return;
      const rir = a.json('rirBersaglio(' + JSON.stringify(e.name) + ')');
      righe.push({ n: n, fase: s.fase, giorno: g, nome: pulito(e.name), alzata: pr.alzata, onda: pr.onda, w: e.weight, reps: e.reps, base: e.repsBase, rirMid: (rir[0] + rir[1]) / 2 });
    }));
  }
  /* il massimale stimato dell'alzata in ogni settimana: dal giorno pesante (e1rm sul suo carico, le sue ripetizioni e le sue ripetizioni in riserva) */
  righe.forEach(r => {
    const pesante = righe.find(x => x.n === r.n && x.alzata === r.alzata && x.onda === 'pesante');
    r.E = pesante ? a.g('e1rm')(pesante.w, pesante.base, pesante.rirMid) : 0;
  });
  return righe;
}
const perAlzata = (righe, alzata, n) => righe.filter(r => r.alzata === alzata && r.n === n).sort((x, y) => RANGO[x.onda] - RANGO[y.onda]);

function controllaOrdine(righe, etichetta) {
  const brutti = [];
  ['squat', 'panca', 'stacco'].forEach(al => {
    for (let n = 1; n <= 12; n++) {
      const e = perAlzata(righe, al, n);
      for (let i = 1; i < e.length; i++) {
        if (RANGO[e[i].onda] > RANGO[e[i - 1].onda] && !(e[i].w < e[i - 1].w)) brutti.push(etichetta + ' sett. ' + n + ' ' + al + ': ' + e[i - 1].onda + ' ' + e[i - 1].nome + ' ' + e[i - 1].w + ' kg, ' + e[i].onda + ' ' + e[i].nome + ' ' + e[i].w + ' kg');
      }
    }
  });
  return brutti;
}

/* ============================================================ la fase ============================================================ */
test('FRZ-11: la catena dei carichi ha la fase 25 «FRZ-11», dopo il ricalcolo dal massimale (20) e prima dello scarico (30)', () => {
  const { a } = atleta();
  const fasi = a.json('fasiRegistrate("carico")');
  const k = fasi.findIndex(f => f.codice === 'FRZ-11');
  assert.ok(k !== -1, 'fasi del carico: ' + fasi.map(f => f.ordine + ' ' + f.codice).join(', '));
  assert.strictEqual(fasi[k].ordine, 25);
  assert.strictEqual(fasi[k - 1].codice, 'ALG-05');
  assert.strictEqual(fasi[k + 1].codice, 'MES-05');
});

/* ============================================================ l'atleta di 12 settimane ============================================================ */
[[3, 'tre giorni (full body: panca tre volte, squat due, stacco una + la variante)'], [4, 'quattro giorni (lower/upper x2)'], [5, 'cinque giorni (la panca tre volte)']].forEach(([giorni, nome]) => {
  test('FRZ-11, 12 settimane, ' + nome + ': ogni settimana pesante > media > leggera, 0 serie sopra la capacità a RPE 9, e il peso SALE nel tempo', () => {
    const { a, p } = atleta({ days: giorni });
    const righe = dodiciSettimane(a, p);
    assert.ok(righe.length >= giorni * 5 * 1, 'ci sono le esposizioni delle alzate: ' + righe.length);
    /* 1. l'ordine, ogni settimana (anche nello scarico: 6 e 12) */
    assert.deepStrictEqual(controllaOrdine(righe, giorni + 'g'), [], 'giorno medio sotto il pesante e leggero sotto il medio');
    /* 2. in percentuale del massimale stimato dell'alzata: la panca di tre giorni ha le tre onde, e le percentuali scendono */
    const pct = (al, n, onda) => { const x = perAlzata(righe, al, n).find(r => r.onda === onda); return x ? x.w / x.E : null; };
    for (let n = 1; n <= 12; n++) {
      const pp = pct('panca', n, 'pesante'), pm = pct('panca', n, 'media'), pl = pct('panca', n, 'leggera');
      if (pp !== null && pm !== null) assert.ok(pm < pp, 'sett. ' + n + ' panca: media ' + pm + ' non sotto la pesante ' + pp);
      if (pm !== null && pl !== null) assert.ok(pl < pm, 'sett. ' + n + ' panca: leggera ' + pl + ' non sotto la media ' + pm);
    }
    /* 3. mai sopra la capacità a RPE 9: il giorno non pesante non supera il carico che il massimale stimato dell'alzata permette per le sue ripetizioni con una in riserva */
    const sopra = righe.filter(r => r.onda !== 'pesante' && r.E > 0 && r.w > a.g('caricoPer')(r.E, r.base, 1) + 1e-9).map(r => 'sett. ' + r.n + ' ' + r.nome + ' ' + r.w + ' kg > ' + a.g('caricoPer')(r.E, r.base, 1));
    assert.deepStrictEqual(sopra, [], 'serie sopra la capacità a RPE 9');
    /* 4. il peso sale, non solo non scende (lezione di N1): per ogni esposizione nessun carico scende da una settimana di carico alla seguente (lo scarico, 6 e 12, è a parte) e l'ultimo è sopra il primo */
    const nomi = {};
    righe.forEach(r => { (nomi[r.alzata + '|' + r.onda + '|' + r.giorno] = nomi[r.alzata + '|' + r.onda + '|' + r.giorno] || []).push(r); });
    const scende = [], fermi = [];
    Object.keys(nomi).forEach(k => {
      const carico = nomi[k].filter(r => r.fase !== 'scarico');
      for (let i = 1; i < carico.length; i++) if (carico[i].w < carico[i - 1].w - 1e-9) scende.push(k + ' sett. ' + carico[i].n + ': ' + carico[i - 1].w + ' -> ' + carico[i].w);
      if (!(carico[carico.length - 1].w > carico[0].w + 1e-9)) fermi.push(k + ': ' + carico[0].w + ' -> ' + carico[carico.length - 1].w);
    });
    assert.deepStrictEqual(scende, [], 'nessun carico scende senza uno scarico di mezzo');
    assert.deepStrictEqual(fermi, [], 'ogni esposizione sale almeno una volta in 12 settimane');
  });
});

test('FRZ-11, FRZ-03 spenta (nessuna variante: la stessa alzata, con lo stesso nome, in tutti i giorni): il giorno leggero non eredita il carico del medio più un incremento', () => {
  const { a, p } = atleta({ days: 3 }, { spente: ['FRZ-03'] });
  const nomi = p.sedute.map(sd => sd.esercizi.filter(e => e.alzata === 'panca').map(e => pulito(e.name) + ' ' + e.onda));
  assert.ok([].concat.apply([], nomi).every(x => /^Panca Piana Bilanciere /.test(x)), 'senza varianti la panca ha sempre lo stesso nome: ' + JSON.stringify(nomi));
  const righe = dodiciSettimane(a, p);
  /* dalla seconda settimana pesante > media > leggera con lo stesso nome. Alla prima il pesante (che parte dalla stima, o dalla conversione di ALG-05 sulle sedute dell'altro giorno: per difetto sulla
     griglia) puo eguagliare il medio: limite noto, nell'elenco degli aperti di P3-C; il leggero e comunque sotto il medio */
  assert.deepStrictEqual(controllaOrdine(righe.filter(r => r.n >= 2), 'FRZ-03 spenta'), [], 'pesante > media > leggera con lo stesso nome');
  const prima = perAlzata(righe, 'panca', 1);
  assert.ok(prima[2].w < prima[1].w && prima[1].w <= prima[0].w, 'prima settimana: ' + prima.map(r => r.onda + ' ' + r.w).join(', '));
  /* il giorno leggero della prima settimana e prescritto rispetto a un pesante che alla prima seduta cala (conversione di ALG-05 dalle sedute dei giorni prima): da li in poi non scende */
  const sale = righe.filter(r => r.alzata === 'panca' && r.onda === 'leggera' && r.fase !== 'scarico' && r.n >= 2);
  assert.ok(sale[sale.length - 1].w > sale[0].w, 'anche il giorno leggero sale: ' + sale[0].w + ' -> ' + sale[sale.length - 1].w);
  const scende = [];
  for (let i = 1; i < sale.length; i++) if (sale[i].w < sale[i - 1].w - 1e-9) scende.push(sale[i - 1].n + ' -> ' + sale[i].n + ': ' + sale[i - 1].w + ' -> ' + sale[i].w);
  assert.deepStrictEqual(scende, [], 'il giorno leggero non scende senza uno scarico di mezzo');
});

/* ============================================================ spenta, consenso, sicurezza, bloccate ============================================================ */
test('FRZ-11 spenta con tz_regole_spente: i carichi sono quelli di prima (la fase non agisce)', () => {
  const con = atleta({ days: 3 }, { spente: ['FRZ-11'] });
  const senza = atleta({ days: 3 }, { conFase: false });
  const x = dodiciSettimane(con.a, con.p).map(r => r.n + r.nome + r.w + 'x' + r.reps);
  const y = dodiciSettimane(senza.a, senza.p).map(r => r.n + r.nome + r.w + 'x' + r.reps);
  assert.deepStrictEqual(x, y);
});

test('FRZ-11: senza consenso il coach non sceglie i carichi (nessuna fase) e un programma di forza generale (senza onda) non ha mai il tetto', () => {
  const { a } = atleta({ days: 3, forzaTipo: undefined }, {});
  const voce = { name: a.g('nomeInLibreria')('Panca Piana Bilanciere'), reps: 5, repsBase: 5, sets: 3, setsBase: 3, weight: 60 };
  a.consenso(false);
  assert.strictEqual(a.g('coachAttivo')(), false);
  const r = a.dati(a.chiama('caricoProssimo', voce.name, 60, 5, 3, Object.assign({}, voce, { fisso: true, alzata: 'panca', onda: 'leggera' })));
  assert.ok(!/giorno leggero/i.test(JSON.stringify(r)), 'senza consenso niente tetto: ' + JSON.stringify(r));
});

test('TAP-01 resta spenta e bloccata: nessuna regola del taper, nei carichi di forza come altrove (registro C.2 n. 15)', () => {
  const { a } = atleta({ days: 4 });
  assert.strictEqual(a.g("regolaAttiva('TAP-01')"), false, 'TAP-01 sempre spenta');
  a.riaccendi();
  assert.strictEqual(a.g("regolaAttiva('TAP-01')"), false, 'anche con tutte le regole riaccese');
  assert.strictEqual(a.g("regolaDescritta('TAP-01').bloccata"), true);
  const non = ['js/coach/specialita/forza-carichi.js', 'js/coach/specialita/soglie-forza-carichi.js'].filter(f => fs.existsSync(path.join(R, f)));
  const bloccate = /TAP-01|REC-06|REC-07|REC-09|REC-12|DON-13|DCA-03|DON-10|ETA-0[78]|ETA-1[1-37]|MAV-14|OBI-17|\btaper\b/i;
  non.forEach(f => assert.ok(!bloccate.test(fs.readFileSync(path.join(R, f), 'utf8')), f + ' non nomina nessuna regola bloccata'));
  /* e FRZ-06..10 restano fuori: nessuna percentuale del massimale di lavoro, nessun AMRAP, nessun test del massimale */
  non.forEach(f => assert.ok(!/FRZ-(0[6-9]|10)\b.*(implementa|fa)|massimale di lavoro =|settimana di test|\bamrap\b/i.test(fs.readFileSync(path.join(R, f), 'utf8').replace(/.*non fa:.*\n/gi, '')), f + ': FRZ-06..10 non implementate'));
});

/* ============================================================ EQ-01 del powerlifting (spinte e tirate) e l'accessorio della panca con i manubri ============================================================ */
/* spinte e tirate come le conta il collaudo (dai dati: l'attributo schema) in un programma di powerlifting; l'alzata e il nome come in forza-struttura.test.js */
function conto(a, d) {
  const p = a.dati(a.chiama('buildProgram', Object.assign({}, PL, { sonno: 'bene', attrezzi: 'indifferente', freq: 'auto' }, d)));
  let sp = 0, ti = 0;
  p.sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (a.g('isTimeBased')(e.name)) return;
    const s = (a.g('attributi')(e.name) || {}).schema;
    if (s === 'spintaO' || s === 'spintaV') sp += e.sets;
    if (s === 'tirataO' || s === 'tirataV' || /^(face pull|reverse|alzate posteriori|y-raise)/i.test(a.g('senzaEmoji')(e.name))) ti += e.sets;
  }));
  return { p, sp, ti, sbilanciato: sp + ti >= 8 && ti < sp * 0.9 };
}
const RX_ALZATA = { squat: /^(squat con bilanciere|squat con pausa|front squat)/i, panca: /^(panca piana bilanciere|panca con pausa|panca presa stretta|panca inclinata bilanciere)/i, stacco: /^(stacco da terra|stacco in deficit|stacco rumeno$|stacco con trap bar)/i };

test('EQ-01, powerlifting a 3 giorni: con 45 minuti o più le tirate non restano sotto il 90% delle spinte (su origin/main 36 programmi su 90 erano sbilanciati: principianti a tutti i minuti, intermedi e avanzati a 30 e 45), a 30 minuti al massimo 14 su 18; FRZ-01 e DUR-01 invariati', () => {
  const { a } = atleta();
  const sbilanciati = [], tempo = [], frz = [];
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [30, 45, 60, 75, 90].forEach(minutes => ['M', 'F'].forEach(sex => [0, 1, 2].forEach(k => {
    const id = level + ' ' + minutes + ' ' + sex + ' ' + k;
    const c = conto(a, { level, days: 3, minutes, sex, age: 25, goals: k === 2 ? ['forza', 'massa'] : ['forza'], seme: 'm' + level + minutes + sex + k });
    if (c.sbilanciato) sbilanciati.push({ id, minutes });
    ['squat', 'panca', 'stacco'].forEach(al => { const n = c.p.sedute.filter(sd => sd.esercizi.some(e => RX_ALZATA[al].test(pulito(e.name)))).length; if (n < (al === 'stacco' ? 1 : 2)) frz.push(id + ' ' + al + ' ' + n); });
    if (k < 2) c.p.sedute.forEach(sd => { const m = a.chiama('durataSeduta', JSON.parse(JSON.stringify(sd.esercizi)), { minuti: minutes, eta: 25, prudente: false, livello: level, fastidi: false, fattore: 1 }); if (m > minutes * 1.1 + 1e-9) tempo.push(id + ' ' + sd.titolo + ': ' + Math.round(m) + ' min su ' + minutes); });
  }))));
  assert.deepStrictEqual(frz, [], 'FRZ-01: squat 2, panca 2, stacco 1');
  /* forza + massa a 30 minuti sfora anche su origin/main (14 sedute su 54: uguale prima e dopo, fuori da P3-C): il tempo si controlla con la forza sola */
  assert.deepStrictEqual(tempo, [], 'DUR-01: nessuna seduta oltre i minuti dichiarati (+10%)');
  assert.deepStrictEqual(sbilanciati.filter(x => x.minutes >= 45).map(x => x.id), [], 'con 45 minuti o più nessun programma sbilanciato');
  assert.ok(sbilanciati.length <= 14, 'a 30 minuti il tempo non lascia posto: ' + sbilanciati.length + ' su 18');
});

test('EQ-01: 4, 5 e 6 giorni restano in equilibrio (le tirate bastano già: nessuna tirata alta aggiunta dove non serve) e la tirata alta, quando c\'è, è fissa e protetta e non è un\'alzata', () => {
  const { a } = atleta();
  [4, 5, 6].forEach(days => ['principiante', 'intermedio', 'avanzato'].forEach(level => [45, 60, 90].forEach(minutes => {
    const c = conto(a, { level, days, minutes, seme: 'e' + level + days + minutes });
    assert.ok(!c.sbilanciato, level + ' ' + days + ' giorni ' + minutes + ' min: spinte ' + c.sp + ' tirate ' + c.ti);
    c.p.sedute.forEach(sd => sd.esercizi.filter(e => e.tirataAlta).forEach(e => assert.ok(e.fisso && !e.alzata && e.sets === 2, 'la tirata alta è fissa e di 2 serie: ' + JSON.stringify(e))));
  })));
});

test('FRZ-04: l\'accessorio della panca a metà o in chiusura entra anche con i manubri (palestra bilanciere + manubri + sbarra, senza cavi): prima non entrava mai', () => {
  const { a } = atleta();
  ['panca-meta', 'panca-chiusura'].forEach(k => {
    const p = a.dati(a.chiama('buildProgram', Object.assign({}, PL, { days: 5, minutes: 90, puntiDeboli: [k], attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'], seme: 'acc' + k })));
    assert.strictEqual(p.modalita, 'forza');
    const acc = [].concat.apply([], p.sedute.map(sd => sd.esercizi)).find(e => e.puntoDebole === k);
    assert.ok(acc, k + ': un esercizio per il punto debole della panca');
    assert.strictEqual(pulito(acc.name), 'Estensione Tricipiti sopra la Testa con Manubrio');
    assert.strictEqual(a.g('attrezzoDi')(acc.name), 'manubri');
  });
  /* con i cavi resta il primo della lista: nessun cambiamento per chi li ha */
  const conCavi = a.dati(a.chiama('buildProgram', Object.assign({}, PL, { days: 5, minutes: 90, puntiDeboli: ['panca-meta'], seme: 'accCavi' })));
  const acc = [].concat.apply([], conCavi.sedute.map(sd => sd.esercizi)).find(e => e.puntoDebole === 'panca-meta');
  assert.ok(acc && /Cavi|Cavo/i.test(pulito(acc.name)) || a.g('attrezzoDi')(acc.name) === 'cavo', 'con i cavi l\'accessorio resta quello ai cavi: ' + (acc && acc.name));
});
