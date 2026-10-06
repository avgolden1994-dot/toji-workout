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
