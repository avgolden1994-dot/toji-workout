/* Integrazione dell onda 2b, seconda parte (INT-2b «onda 2c»): i difetti letti nei programmi e misurati dal collaudo dopo l unione di W2-T1..T4.
   1) La flessione del ginocchio a 30 minuti (registro B6: i femorali almeno 0,6 volte i quadricipiti e almeno una flessione a settimana; collaudo EQ-03:flessione): la scala del tempo
      (scalaDelTempo) tiene l unica flessione della settimana come l unico piano di spinta o tirata, e prima di lei lasciano il posto un doppione dello schema e il core coperto altrove;
      la lista delle flessioni di B29 (FLESSIONI_GINOCCHIO) ha anche il leg curl con l asciugamano (casa); dove ogni seduta di gambe e piena la flessione prende il posto del secondo squat;
      il solutore del volume non toglie la cerniera vera se e l unica della settimana (PAT-01, B15). Prima: a 30 minuti in palestra 28 programmi su 720 della matrice standard senza flessione,
      6 su 1440 a casa coi manubri (misurato con lo strumento di collaudo); ora 0 (ogni profilo o ha una flessione o porta la nota onesta).
   Il banco di prova e tests/aiuto-app.js (l app vera in vm). I profili sono quelli della matrice del collaudo (stesso seme). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { caricaApp } = require('./aiuto-app');

const ORA = '2026-10-05T12:00:00';
const app = caricaApp({ ora: ORA });
const costruisci = d => app.dati(app.chiama('buildProgram', Object.assign({ usaProfilo: false, sonno: 'bene', attrezzi: 'indifferente', parq: 'no', priorita: [], fastidi: [] }, d)));
const nomi = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.map(e => app.chiama('senzaEmoji', e.name))));
const FLESSIONE = /leg curl|nordic/i, CERNIERA = /stacco|good morning|hyperextension \(lombari\)/i;
const NOTA_TEMPO = 'Femorali: con questi minuti la flessione del ginocchio (leg curl) non entra, lavorano solo con gli stacchi: meno completo.';
const haFlessione = p => nomi(p).some(n => FLESSIONE.test(n));
/* una flessione del ginocchio e disponibile per queste preferenze? (consentito, come la vede il generatore) */
const flessioneDisponibile = p => app.json('FLESSIONI_GINOCCHIO.map(nomeInLibreria).filter(n => n && consentito(n, ' + JSON.stringify(p.prefs) + '))').length > 0;

/* ---- 1) la flessione del ginocchio a 30 minuti ---- */
test('EQ-03:flessione, i tre casi letti nel collaudo: palestra 70 anni PAR-Q 3 giorni, glutei principiante PPL + punti deboli, casa coi manubri 5 giorni: a 30 minuti la settimana ha una flessione del ginocchio e il giorno di gambe tiene una cerniera vera', () => {
  const casi = [
    { goals: ['massa'], level: 'intermedio', days: 3, minutes: 30, luogo: 'palestra', sex: 'F', age: 70, parq: 'si', freq: 'auto', seme: 'collaudo|massa|intermedio|3|30|palestra|-|F|senior|0' },
    { goals: ['glutei'], level: 'principiante', days: 5, minutes: 30, luogo: 'palestra', fastidi: ['spalle'], sex: 'F', age: 45, sonno: 'medio', freq: '1', psico: { fiducia: 'poca' }, seme: 'collaudo|glutei|principiante|5|30|palestra|spalle|F|adulto|2' },
    { goals: ['massa'], level: 'intermedio', days: 5, minutes: 30, luogo: 'manubri', sex: 'F', age: 25, sonno: 'medio', attrezzi: 'macchine', freq: '2', psico: { palestra: 'disagio' }, seme: 'collaudo|massa|intermedio|5|30|manubri|-|F|giovane|0' },
    { goals: ['massa', 'forza'], level: 'intermedio', days: 5, minutes: 30, luogo: 'manubri', fastidi: ['spalle'], sex: 'M', age: 25, freq: '1', priorita: ['glutei'], seme: 'collaudo|massa+forza|intermedio|5|30|manubri|spalle|M|giovane|2' }
  ];
  casi.forEach(c => {
    const p = costruisci(c);
    assert.strictEqual(p.metodo, null, 'senza metodo famoso');
    assert.ok(haFlessione(p), JSON.stringify(c) + ': nessuna flessione del ginocchio: ' + nomi(p).join(', '));
    assert.ok(nomi(p).some(n => CERNIERA.test(n)), JSON.stringify(c) + ': nessuna cerniera vera nella settimana (PAT-01): ' + nomi(p).join(', '));
    const gambe = p.sedute.filter(sd => /lower|legs|fullbody/.test(sd.tipo));
    gambe.forEach(sd => assert.ok(sd.esercizi.length >= 3, 'almeno 3 esercizi'));
    assert.ok(!p.note.includes(NOTA_TEMPO), 'la flessione c e: niente nota del tempo');
  });
  /* il primo caso nel dettaglio: a 30 minuti il giorno di gambe tiene il leg curl (2 serie) e sta nei minuti */
  const p0 = costruisci(casi[0]);
  const lower = p0.sedute.find(sd => sd.tipo === 'lower');
  const curl = lower.esercizi.find(e => FLESSIONE.test(app.chiama('senzaEmoji', e.name)));
  assert.ok(curl && curl.sets >= 2, 'leg curl nel giorno lower: ' + lower.esercizi.map(e => e.name + ' ' + e.sets).join(', '));
  assert.ok(app.chiama('durataSeduta', lower.esercizi, { minuti: 30, eta: 70, prudente: true, livello: 'intermedio', fastidi: false, fattore: 1 }) <= 30 * 1.10, 'la seduta sta nei 30 minuti (+10%)');
  assert.deepStrictEqual(app.errori, []);
});

test('EQ-03:flessione sulla griglia dei 30 minuti (livello x giorni x luogo x obiettivo, 108 profili): nessun programma senza flessione dove una flessione e disponibile, salvo la nota onesta; ogni giorno di gambe con una flessione tiene una cerniera vera o e full body', () => {
  const colpe = [];
  let conFlessione = 0, conNota = 0, senzaDisponibile = 0, programmi = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 4, 5, 6].forEach(days => ['palestra', 'manubri', 'corpo'].forEach(luogo => [['massa'], ['glutei'], ['massa', 'forza']].forEach(goals => {
    const c = { goals, level, days, minutes: 30, luogo, sex: 'F', age: 32, seme: 'onda2c-30|' + level + '|' + days + '|' + luogo + '|' + goals.join('+') };
    const p = costruisci(c);
    if (p.metodo) return;
    programmi++;
    const fl = haFlessione(p);
    if (fl) conFlessione++;
    else if (!flessioneDisponibile(p)) senzaDisponibile++;
    else if (p.note.includes(NOTA_TEMPO)) conNota++;
    else colpe.push('senza flessione e senza nota: ' + JSON.stringify(c) + ' -> ' + nomi(p).join(', '));
    if (fl && p.note.includes(NOTA_TEMPO)) colpe.push('la nota del tempo con la flessione in scheda: ' + JSON.stringify(c));
    p.sedute.filter(sd => /lower|legs/.test(sd.tipo)).forEach(sd => { if (sd.esercizi.length < 3) colpe.push('meno di 3 esercizi: ' + JSON.stringify(c) + ' ' + sd.giorno); });
  }))));
  assert.deepStrictEqual(colpe, []);
  assert.ok(programmi >= 90 && conFlessione >= programmi - 6, 'quasi tutti con la flessione: ' + conFlessione + ' su ' + programmi + ' (nota del tempo ' + conNota + ', nessuna flessione disponibile ' + senzaDisponibile + ')');
  assert.deepStrictEqual(app.errori, []);
});

test('la scala del tempo (scalaDelTempo): l unica flessione della settimana non lascia il posto per il tempo; prima di lei escono il secondo esercizio dello stesso schema e il core coperto altrove; un leg curl in piu non e intoccabile', () => {
  const brief = app.g('(() => { const b = briefCoach(' + JSON.stringify({ goals: ['massa'], level: 'intermedio', days: 3, minutes: 30, luogo: 'palestra', sex: 'M', age: 30, usaProfilo: false, seme: 's' }) + ', {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); return b; })()');
  app.ctx.__b = brief;
  const E = (n, sets, reps, rest) => ({ name: app.chiama('nomeInLibreria', n), sets, reps, rest });
  /* una seduta di gambe troppo lunga per 30 minuti: leg press, stacco rumeno, affondi (secondo squat), leg curl, pallof (core, coperto da un altra seduta) */
  app.ctx.__sedute = app.g('(' + JSON.stringify([
    { giorno: 'Lunedì', tipo: 'upper', esercizi: [E('Panca Piana Manubri', 3, 8, 90), E('Lat Machine', 3, 8, 90), E('Shoulder Press Machine', 3, 8, 90), E('Rematore con Petto Appoggiato', 3, 8, 90), E('Plank', 2, 30, 60)] },
    { giorno: 'Mercoledì', tipo: 'lower', esercizi: [E('Leg Press', 3, 8, 120), E('Stacco Rumeno con Manubri', 3, 8, 120), E('Affondi Bulgari', 3, 10, 90), E('Leg Curl Seduto', 3, 12, 75), E('Pallof Press', 3, 12, 60)] }
  ]) + ')');
  app.g('__b.lavoro.note = []; impostaContestoTempo(opzioniTempo(__b)); __passi = { pause: 0, coppie: 0, tagli: 0 }; scalaDelTempo(__b, __sedute[1], __sedute, opzioniTempo(__b), 30, __passi)');
  const lower = app.json('__sedute[1].esercizi.map(e => [senzaEmoji(e.name), e.sets])');
  assert.ok(lower.some(x => /Leg Curl/.test(x[0])), 'il leg curl resta: ' + JSON.stringify(lower));
  assert.ok(!lower.some(x => /Pallof/.test(x[0])) || !lower.some(x => /Affondi/.test(x[0])), 'prima di lui sono usciti il doppione dello squat o il core: ' + JSON.stringify(lower));
  assert.ok(lower.some(x => /Leg Press/.test(x[0])) && lower.some(x => /Stacco Rumeno/.test(x[0])), 'squat e cerniera restano');
  assert.ok(app.g('durataSeduta(__sedute[1].esercizi, opzioniTempo(__b))') <= 30 * 1.10, 'la seduta sta nei minuti');
  /* con due flessioni nella settimana nessuna e intoccabile */
  app.ctx.__sedute2 = app.g('(' + JSON.stringify([
    { giorno: 'Lunedì', tipo: 'lower', esercizi: [E('Leg Press', 2, 8, 90), E('Stacco Rumeno con Manubri', 2, 8, 90), E('Leg Curl Sdraiato', 2, 12, 60)] },
    { giorno: 'Mercoledì', tipo: 'lower', esercizi: [E('Hack Squat', 3, 8, 120), E('Stacco Rumeno', 3, 8, 120), E('Leg Curl Seduto', 3, 12, 75), E('Leg Extension', 3, 12, 75), E('Calf Raise in Piedi', 3, 15, 60)] }
  ]) + ')');
  assert.strictEqual(app.g('unicaFlessioneSettimana(__b, __sedute2, __sedute2[1].esercizi[2])'), false, 'con un altra flessione nella settimana il leg curl non e l unico');
  assert.strictEqual(app.g('unicaFlessioneSettimana(__b, __sedute, __sedute[1].esercizi.find(e => /Leg Curl/.test(e.name)))'), true, 'nella prima settimana e l unico');
  app.g('liberaContestoTempo()');
});

test('FLESSIONI_GINOCCHIO: la lista delle flessioni di B29 ha le macchine, il leg curl con l asciugamano (casa) e il Nordic per ultimo; recuperoOk con obbligata ignora il tetto per seduta e i conflitti di 48 ore che c erano gia', () => {
  assert.deepStrictEqual(app.json('FLESSIONI_GINOCCHIO'), ['Leg Curl Seduto', 'Leg Curl Sdraiato', 'Leg Curl in Piedi', 'Leg Curl con Asciugamano', 'Nordic Curl']);
  app.json('FLESSIONI_GINOCCHIO').forEach(n => assert.ok(app.g('nomeInLibreria(' + JSON.stringify(n) + ')'), n + ' e in libreria'));
  const E = (n, sets) => ({ name: app.chiama('nomeInLibreria', n), sets });
  /* due giorni di fila con i glutei gia a 4 serie frazionarie: il leg curl (glutei 0,5) non crea il conflitto */
  app.ctx.__sed = app.g('(' + JSON.stringify([{ giorno: 'Giovedì', tipo: 'legs', esercizi: [E('Hip Thrust', 4), E('Affondi Bulgari', 4), E('Goblet Squat', 4), E('Squat a Corpo Libero', 4)] }, { giorno: 'Venerdì', tipo: 'punti', esercizi: [E('Hip Thrust con Manubrio', 4), E('Affondi in Camminata', 4)] }]) + ')');
  const curl = app.chiama('nomeInLibreria', 'Leg Curl con Asciugamano');
  assert.strictEqual(app.g('recuperoOk(__sed[0], __sed, ' + JSON.stringify(app.dati(curl)) + ', 3)'), false, 'di norma il tetto e le 48 ore lo fermano');
  assert.strictEqual(app.g('recuperoOk(__sed[0], __sed, ' + JSON.stringify(app.dati(curl)) + ', 3, { obbligata: true })'), true, 'obbligata: il conflitto c era gia e il tetto lo rimette il volume');
  /* un conflitto NUOVO lo ferma anche obbligata: femorali a 1 (lo stacco rumeno da 0,5 a serie) che salgono a 4 con un leg curl da 4 serie nel giorno accanto */
  app.ctx.__sed2 = app.g('(' + JSON.stringify([{ giorno: 'Giovedì', tipo: 'legs', esercizi: [E('Stacco Rumeno con Manubri', 2)] }, { giorno: 'Venerdì', tipo: 'punti', esercizi: [E('Leg Curl Seduto', 4)] }]) + ')');
  assert.strictEqual(app.g('recuperoOk(__sed2[0], __sed2, ' + JSON.stringify(app.dati(curl)) + ', 3, { obbligata: true })'), false);
});

/* ---- 2) il tetto del core (ABB-03, SEL-07; registro B6 addome) ---- */
test('core: nessun esercizio di core oltre 3 serie (serieMaxCore), l addome dentro il massimo di B6 a settimana; i due casi letti (Pallof Press 5x12) e una griglia di 72 programmi in palestra', () => {
  const casi = [
    { goals: ['massa'], level: 'intermedio', days: 4, minutes: 60, luogo: 'palestra', sex: 'M', age: 25, priorita: ['braccia'], psico: { preferenza: 'impegnativi' }, seme: 'collaudo|massa|intermedio|4|60|palestra|-|M|giovane|1' },
    { goals: ['massa'], level: 'intermedio', days: 4, minutes: 75, luogo: 'palestra', sex: 'F', age: 25, priorita: ['spalle', 'braccia'], seme: 'collaudo|massa|intermedio|4|75|palestra|-|F|giovane|2' }
  ];
  const core = p => [].concat.apply([], p.sedute.map(sd => sd.esercizi.filter(e => app.json('(findExercise(' + JSON.stringify(e.name) + ') || {}).group') === 'core')));
  const maxCore = app.g("sogliaVolume('serieMaxCore')");
  assert.strictEqual(maxCore, 3);
  casi.forEach(c => { const p = costruisci(c); const cs = core(p); assert.ok(cs.length >= 1, 'c e un core'); cs.forEach(e => assert.ok(e.sets <= maxCore, JSON.stringify(c) + ': ' + e.name + ' ' + e.sets + ' serie')); });
  let programmi = 0, conDueCore = 0, coreTot = 0;
  ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 4, 5, 6].forEach(days => [45, 60, 75, 90].forEach(minutes => [['massa'], ['ricomposizione']].forEach(goals => {
    const c = { goals, level, days, minutes, luogo: 'palestra', sex: 'M', age: 30, seme: 'onda2c-core|' + level + '|' + days + '|' + minutes + '|' + goals[0] };
    const p = costruisci(c);
    if (p.metodo) return;
    programmi++;
    const cs = core(p), vol = app.json('contaVolume(' + JSON.stringify(p.sedute) + ')'), b = app.json('(() => { const b = briefCoach(' + JSON.stringify(Object.assign({ usaProfilo: false, fastidi: [], priorita: [] }, c)) + ', {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); return bersagliVolume(b); })()');
    cs.forEach(e => { coreTot++; assert.ok(e.sets <= maxCore, JSON.stringify(c) + ': ' + e.name + ' ' + e.sets + ' serie'); });
    assert.ok(vol.addome.frazionarie <= b.unita.addome.max + 1e-9, JSON.stringify(c) + ': addome ' + vol.addome.frazionarie + ' oltre il massimo ' + b.unita.addome.max);
    if (cs.length >= 2) conDueCore++;
  }))));
  assert.ok(programmi >= 60 && coreTot >= programmi, 'il campione ha il core: ' + coreTot + ' esercizi su ' + programmi + ' programmi');
  assert.ok(conDueCore >= 5, 'dove serve piu volume per l addome il solutore mette un secondo esercizio in un altra seduta (adattoAllaSeduta): ' + conDueCore);
  assert.deepStrictEqual(app.errori, []);
});

/* ---- 3) spinte e tirate dentro B6 (ABB-04 e VOL-02) ---- */
test('strBilancia: la serie in piu a una tirata solo se l unita resta dentro il massimo (puoSalire); altrimenti scende una spinta. puoSalireVolume dice no a una tirata con la schiena al tetto', () => {
  const E = (n, sets) => ({ name: app.chiama('nomeInLibreria', n), sets, reps: 8, rest: 90 });
  const costruisciSedute = () => app.g('(' + JSON.stringify([
    { giorno: 'Lunedì', tipo: 'upper', esercizi: [E('Panca Piana Bilanciere', 3), E('Military Press', 3), E('Lat Machine', 2), E('Rematore con Petto Appoggiato', 2)] },
    { giorno: 'Giovedì', tipo: 'upper', esercizi: [E('Panca Inclinata Manubri', 3), E('Shoulder Press Machine', 3), E('Lat Machine', 2), E('Pulley Basso', 2)] }
  ]) + ')');
  const sets = (s) => app.json('__s.map(sd => sd.esercizi.map(e => [senzaEmoji(e.name), e.sets]))');
  /* spinte 12, tirate 8 (< 90%): senza vincoli una tirata sale */
  app.ctx.__s = costruisciSedute(); app.ctx.__note = app.g('[]');
  app.g("strBilancia({ sedute: __s, level: 'intermedio', over65: false, note: __note, metodoAttivo: null, prefs: { luogo: 'palestra', fastidi: [], priorita: [] } })");
  const libero = sets();
  assert.ok(libero.some(sd => sd.some(x => /Lat Machine|Rematore|Pulley/.test(x[0]) && x[1] > 2)), 'senza puoSalire una tirata sale: ' + JSON.stringify(libero));
  /* con puoSalire che dice sempre no (la schiena e al tetto): le tirate non salgono e scende una spinta */
  app.ctx.__s = costruisciSedute(); app.ctx.__note = app.g('[]');
  app.g("strBilancia({ sedute: __s, level: 'intermedio', over65: false, note: __note, metodoAttivo: null, prefs: { luogo: 'palestra', fastidi: [], priorita: [] }, puoSalire: () => false })");
  const vincolato = sets();
  assert.ok(vincolato.every(sd => sd.every(x => !/Lat Machine|Rematore|Pulley/.test(x[0]) || x[1] === 2)), 'le tirate restano a 2: ' + JSON.stringify(vincolato));
  const spinte = vincolato.reduce((t, sd) => t + sd.filter(x => /Panca|Military|Shoulder/.test(x[0])).reduce((a, x) => a + x[1], 0), 0);
  assert.ok(spinte < 12 && 8 >= spinte * 0.9, 'le spinte sono scese fino all equilibrio: ' + spinte);
  /* puoSalireVolume: un principiante di forza con la schiena gia al tetto di B6 */
  app.ctx.__b = app.g('(() => { const b = briefCoach(' + JSON.stringify({ goals: ['forza'], level: 'principiante', days: 3, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, usaProfilo: false, fastidi: [], priorita: [] }) + ', {}); b.sicurezza.vincoli = vincoliSicurezza(b); risolviMetodo(b); b.lavoro.prefs = prefsDelBrief(b); b.lavoro.volumeBersagli = bersagliVolume(b); return b; })()');
  const bersagli = app.json('__b.lavoro.volumeBersagli');
  /* il tetto di gruppo della schiena resta quello di W2-T1 (massimo tra dorsali e spessore): per i principianti di forza e di salute e sotto la somma dei due minimi di B6 (6 + 4 > 8), contraddizione scritta nella mappa cap. 17 e da decidere nel registro */
  assert.strictEqual(bersagli.gruppiLimite.schiena.max, Math.max(bersagli.unita.dorsali.max, bersagli.unita.schiena_spessore.max), JSON.stringify(bersagli.gruppiLimite));
  app.ctx.__s = app.g('(' + JSON.stringify([{ giorno: 'Lunedì', tipo: 'fullbody', esercizi: [E('Squat con Bilanciere', 3), E('Panca Piana Bilanciere', 3), E('Lat Machine', 3), E('Rematore con Petto Appoggiato', 3)] },
    { giorno: 'Mercoledì', tipo: 'fullbody', esercizi: [E('Stacco Rumeno', 3), E('Military Press', 3), E('Rematore alla Macchina', 3), E('Pulley Basso', 3)] }]) + ')');
  assert.strictEqual(app.g('puoSalireVolume(__b, __s, __s[0].esercizi[2])'), false, 'dorsali e spessore al tetto (12 serie di schiena con massimo ' + bersagli.gruppiLimite.schiena.max + '): la tirata non sale');
  assert.strictEqual(app.g('puoSalireVolume(__b, __s, __s[0].esercizi[1])'), true, 'la panca (petto 6 di 8) puo salire');
});

/* ---- 4) sei giorni: un giorno di riposo in sette, mai lo stesso tipo di seduta in due giorni di fila (collaudo REC-03, REC-01; anticipo di W2-T5) ---- */
test('6 giorni: lunedi-mercoledi e venerdi-domenica con il giovedi di riposo (PPL x2, Upper/Lower x3, Arnold); mai piu di 3 giorni di fila e mai lo stesso tipo in giorni consecutivi; con la frequenza 1 i tre giorni di punti deboli si riordinano', () => {
  const giorno = g => app.json('DAYS').indexOf(g);
  const diFila = p => { const gi = p.sedute.map(sd => giorno(sd.giorno)).sort((x, y) => x - y); let mx = 1, cur = 1; for (let i = 1; i < gi.length; i++) { cur = gi[i] - gi[i - 1] === 1 ? cur + 1 : 1; mx = Math.max(mx, cur); } return mx; };
  const adiacentiUguali = p => p.sedute.some((sd, i) => i > 0 && giorno(sd.giorno) - giorno(p.sedute[i - 1].giorno) === 1 && sd.tipo === p.sedute[i - 1].tipo);
  const casi = [
    { goals: ['massa'], level: 'avanzato', days: 6, minutes: 75, luogo: 'palestra', sex: 'M', age: 30, seme: 'sei-1' },
    { goals: ['massa'], level: 'intermedio', days: 6, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, freq: '1', seme: 'sei-2' },
    { goals: ['massa'], level: 'intermedio', days: 6, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, freq: '3', seme: 'sei-3' },
    { goals: ['massa'], level: 'avanzato', days: 6, minutes: 75, luogo: 'palestra', sex: 'M', age: 30, metodo: 'arnold6', seme: 'sei-5' },
    { goals: ['forza'], level: 'avanzato', days: 6, minutes: 60, luogo: 'manubri', sex: 'F', age: 28, seme: 'sei-6' }
  ];
  casi.forEach(c => {
    const p = costruisci(c);
    assert.strictEqual(p.sedute.length, 6, JSON.stringify(c) + ': 6 sedute');
    assert.deepStrictEqual(p.sedute.map(sd => giorno(sd.giorno)), [0, 1, 2, 4, 5, 6], JSON.stringify(c) + ': i giorni');
    assert.deepStrictEqual(p.riposo, ['Giovedì']);
    assert.ok(diFila(p) <= 3, 'al massimo 3 giorni di fila');
    assert.ok(!adiacentiUguali(p), JSON.stringify(c) + ': stesso tipo in due giorni di fila: ' + p.sedute.map(sd => sd.giorno.slice(0, 3) + ':' + sd.tipo).join(' '));
    assert.ok(!p.note.some(n => /6 giorni/.test(n)), 'le sedute restano 6: niente nota del ripiego');
  });
  const ppl = costruisci(casi[0]);
  assert.deepStrictEqual(ppl.sedute.map(sd => sd.tipo), ['push', 'pull', 'legs', 'push', 'pull', 'legs'], 'il PPL x2 resta nell ordine: ogni gruppo torna dopo 72 ore');
  const punti = costruisci(casi[1]);
  assert.strictEqual(punti.sedute.filter(sd => sd.tipo === 'punti').length, 3, 'i tre giorni di punti deboli ci sono tutti');
});

test('6 giorni, il ripiego: se nessun ordine evita lo stesso tipo in giorni consecutivi le sedute diventano 5 (lunedi, martedi, giovedi, venerdi, sabato) con la nota; riordinaSenzaAdiacenti e tipiAdiacenti', () => {
  assert.deepStrictEqual(app.json("riordinaSenzaAdiacenti(['push', 'pull', 'legs', 'punti', 'punti', 'punti'], [0, 1, 2, 4, 5, 6])"), ['push', 'pull', 'punti', 'punti', 'legs', 'punti']);
  assert.strictEqual(app.g("riordinaSenzaAdiacenti(['push', 'push', 'push', 'push', 'push', 'pull'], [0, 1, 2, 4, 5, 6])"), null, 'cinque spinte su sei posti non stanno senza giorni consecutivi');
  assert.deepStrictEqual(app.json("riordinaSenzaAdiacenti(['push', 'push', 'push', 'push', 'pull', 'legs'], [0, 1, 2, 4, 5, 6])"), ['push', 'pull', 'push', 'push', 'legs', 'push'], 'quattro spinte si: nei giorni 0, 2, 4 e 6');
  assert.strictEqual(app.g("tipiAdiacenti(['push', 'pull', 'legs', 'push', 'pull', 'legs'], [0, 1, 2, 3, 4, 5])"), false);
  assert.strictEqual(app.g("tipiAdiacenti(['push', 'pull', 'legs', 'punti', 'punti', 'punti'], [0, 1, 2, 4, 5, 6])"), true);
  /* il ripiego dentro giorniSettimana: una divisione impossibile da sistemare */
  app.ctx.__b = app.g('(() => { const b = briefCoach(' + JSON.stringify({ goals: ['massa'], level: 'intermedio', days: 6, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, usaProfilo: false, fastidi: [] }) + ', {}); b.lavoro.note = []; return b; })()');
  const indici = app.json("(() => { const split = { nome: 'prova', giorni: ['push', 'push', 'push', 'push', 'push', 'pull'] }; __b.lavoro.split = split; return giorniSettimana(__b, split); })()");
  assert.deepStrictEqual(indici, [0, 1, 3, 4, 5]);
  assert.strictEqual(app.g('__b.lavoro.split.giorni.length'), 5);
  assert.ok(app.json('__b.lavoro.note').some(n => /6 giorni/.test(n) && /giorni/.test(n)), 'la nota del ripiego c e e nomina i giorni (collaudo SPL-01)');
  assert.strictEqual(app.g('__b.agenda.giorni'), 6, 'i giorni dichiarati restano 6');
});

test('chi comincia con 5 o 6 giorni ha 4 sedute sui giorni delle 4 sedute (lunedi, martedi, giovedi, venerdi) con la nota che lo dice (PRG-02, ricerca principianti §3.3)', () => {
  const NOTA = 'Chi comincia cresce di più con 4 sedute a settimana: gli altri giorni sono riposo o una camminata.';
  [5, 6].forEach(days => {
    const p = costruisci({ goals: ['massa'], level: 'principiante', days, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, seme: 'quattro-' + days });
    assert.strictEqual(p.sedute.length, 4, days + ' giorni: 4 sedute');
    assert.deepStrictEqual(p.sedute.map(sd => sd.giorno), ['Lunedì', 'Martedì', 'Giovedì', 'Venerdì']);
    assert.ok(p.note.includes(NOTA), 'la nota: ' + p.note.join(' | '));
  });
  const quattro = costruisci({ goals: ['massa'], level: 'principiante', days: 4, minutes: 60, luogo: 'palestra', sex: 'F', age: 30, seme: 'quattro-4' });
  assert.ok(!quattro.note.includes(NOTA), 'con 4 giorni dichiarati nessuna nota');
  const tre = costruisci({ goals: ['massa'], level: 'intermedio', days: 5, minutes: 60, luogo: 'palestra', sex: 'M', age: 30, seme: 'cinque-i' });
  assert.strictEqual(tre.sedute.length, 5); assert.ok(!tre.note.includes(NOTA));
});

/* ---- 5) sicurezza: le aggiunte non caricano una zona dolente dichiarata (collaudo SAF-02, tolleranza zero nel cancello: D-P20) ---- */
test('SAF-02: nessun esercizio aggiunto dopo la ricetta (solutore del volume, riempimento del tempo, strCopri, aggiungiRegione) carica la zona dolente dichiarata (stress >= 1); il caso letto: spalla dolente a casa, niente «Aggiunto: Croci su Panca Manubri»', () => {
  const stress = (nome, zona) => app.g('stressArticolare(' + JSON.stringify(nome) + ', ' + JSON.stringify(zona) + ')') || 0;
  const colpe = [];
  let aggiunti = 0, programmi = 0;
  ['spalle', 'ginocchia', 'schiena'].forEach(f => ['principiante', 'intermedio', 'avanzato'].forEach(level => [3, 4].forEach(days => ['palestra', 'manubri'].forEach(luogo => [45, 60].forEach(minutes => {
    const c = { goals: ['massa'], level, days, minutes, luogo, fastidi: [f], sex: 'F', age: 30, seme: 'saf02|' + f + '|' + level + '|' + days + '|' + luogo + '|' + minutes };
    const p = costruisci(c);
    if (p.metodo) return;
    programmi++;
    p.note.forEach(n => {
      const m = /^Aggiunto: (.+?) — /.exec(n);
      if (!m) return;
      aggiunti++;
      const nome = app.chiama('nomeInLibreria', m[1]);
      if (nome && stress(nome, f) >= 1) colpe.push(JSON.stringify(c) + ': aggiunto ' + m[1] + ' con stress ' + stress(nome, f) + ' su ' + f);
    });
  })))));
  assert.deepStrictEqual(colpe, []);
  assert.ok(programmi >= 60 && aggiunti >= 30, 'il campione esercita le aggiunte: ' + aggiunti + ' su ' + programmi + ' programmi');
  const casa = costruisci({ goals: ['massa'], level: 'intermedio', days: 4, minutes: 45, luogo: 'manubri', fastidi: ['spalle'], sex: 'M', age: 30, seme: 'saf02-croci' });
  assert.ok(!casa.note.some(n => /^Aggiunto: Croci su Panca Manubri/.test(n)), casa.note.filter(n => /Aggiunto/.test(n)).join(' | '));
  /* il filtro in se: le croci coi manubri caricano la spalla (cautela), il pulley no */
  assert.strictEqual(app.g("esercizioCaricaIlFastidio(nomeInLibreria('Croci su Panca Manubri'), ['spalle'])"), true);
  assert.strictEqual(app.g("esercizioCaricaIlFastidio(nomeInLibreria('Pulley Basso'), ['spalle'])"), false);
  assert.deepStrictEqual(app.errori, []);
});
