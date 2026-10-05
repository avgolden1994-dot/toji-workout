/* Carichi in seduta, onda 0 (W0-T3): «blocca», «extra», ripetizioni alte, scarico che si compone, dati dello storico
   (ALG-02 parte «blocca», MES-06 carico di riferimento, MES-09 etichetta di fase). Come lavora: carica l'app VERA in vm
   (tests/aiuto-app.js, orologio fisso) e chiama caricoProssimo con tutti gli strati che lo avvolgono.
   Le prove del difetto (B6, B7, U15/N1/N2 del registro) sono scritte PRIMA della correzione, con i numeri che il codice di
   prima dava (nei commenti «prima:»): senza la correzione falliscono. Fonti: docs/ricerca-algoritmi-carichi-e-app.md (3.12, 3.14
   vettore 4, 6 U12 e U15), docs/ricerca-mesocicli-periodizzazione-scarichi.md (3.6.1, 5 righe 4-5-7-19, 6 MES-06 e MES-09). */
const test = require('node:test'), assert = require('node:assert');
const { caricaApp, leggiFixture, VETTORI_CARICHI } = require('./aiuto-app');

const PANCA = '💪 Panca Piana Bilanciere';      /* multiarticolare col bilanciere: +2,5 kg, tipo «pesante» */
const CURL = '🦾 Curl su Panca Inclinata';       /* isolamento: doppia progressione, prima le ripetizioni */
const TIPI_COACH = ['su', 'fermo', 'giu', 'scarico', 'nuovo'];

/* programma di 12 settimane che comincia lunedi 24 agosto 2026: la settimana 7 e dal 5 ottobre (carico), la 8 dal 12 (scarico), la 9 dal 19 */
const PROGRAMMA = {
  creato: '2026-08-24', inizio: '2026-08-24', settimane: 12, blocco: 4,
  fasi: ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico']
};
const LUN_SETT7 = '2026-10-05T10:00:00', LUN_SETT8 = '2026-10-12T10:00:00', MER_SETT8 = '2026-10-14T10:00:00', VEN_SETT8 = '2026-10-16T10:00:00', LUN_SETT9 = '2026-10-19T10:00:00';

function nuovaApp(profilo, ora) {
  const app = caricaApp({ ora: ora || LUN_SETT7 });
  app.profilo(Object.assign({ level: 'intermedio', age: 30, sex: 'M' }, profilo));
  app.programma(PROGRAMMA);
  return app;
}
/* aggiunge allo storico una seduta fatta `quando` (l'orologio dell'app resta com'era): kg e ripetizioni uguali su n serie; `opz.rpe`,
   `opz.obiettivo` (come lo salva la v2 su ogni esercizio) e `opz.voce` (campi della voce, per esempio `settimana`) sono facoltativi */
function registra(app, quando, nome, kg, reps, n, opz) {
  const o = opz || {}, prima = app.ora();
  app.ora(quando);
  const h = app.seduta(0, [{ nome: nome, serie: Array.from({ length: n }, () => [kg, reps, true, o.rpe || null]) }], o.voce);
  if (o.obiettivo) h.sessione[0].obiettivo = o.obiettivo;
  app.ora(prima);
  const lista = app.leggi(app.chiave('historyKey')) || [];
  lista.unshift(h);
  app.storia(lista);
  return h;
}
/* il carico che il coach propone `quando` (tutti gli strati: dolore-mattina, regole-nuove, intensita) */
function carico(app, quando, nome, base, reps, serie) {
  const prima = app.ora();
  if (quando) app.ora(quando);
  const r = app.dati(app.chiama('caricoProssimo', nome, base, reps, serie));
  app.ora(prima);
  return r;
}
const kg = r => r.weight;

/* ============================================================================================================
   B6 · «blocca» non abbassa il carico (ALG-02 parte b)
   ============================================================================================================ */
test('blocca dopo +1 ripetizione: stesso carico e stesse ripetizioni di prima (prima: 11 kg, un chilo sotto)', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', CURL, 12, 10, 3);
  const senza = carico(app, null, CURL, 12, 10, 3);
  assert.deepStrictEqual([senza.tipo, senza.weight, senza.reps], ['su', 12, 11], 'senza «blocca»: una ripetizione in più, stesso carico');
  app.aggiusti({ esercizi: { [CURL]: { blocca: true, sedute: 1 } }, scarico: null });
  const r = carico(app, null, CURL, 12, 10, 3);
  assert.deepStrictEqual([r.tipo, r.weight, r.reps], ['fermo', 12, 10], 'carico e ripetizioni dell\'ultima volta');
  assert.match(r.motivo, /Stesso carico: l ultima seduta era al limite/);
});
test('blocca dopo +2,5 kg: il carico di prima', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  assert.strictEqual(kg(carico(app, null, PANCA, 60, 8, 4)), 62.5, 'senza «blocca»: +2,5 kg');
  app.aggiusti({ esercizi: { [PANCA]: { blocca: true, sedute: 1 } }, scarico: null });
  const r = carico(app, null, PANCA, 60, 8, 4);
  assert.deepStrictEqual([r.tipo, r.weight, r.reps], ['fermo', 60, 8]);
});
test('blocca dopo un aumento da RPE basso (calibrazione, +10%): torna al carico di prima, non a 63,5 (prima: 66 - 2,5)', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4, { rpe: 6 });
  const senza = carico(app, null, PANCA, 60, 8, 4);
  assert.strictEqual(senza.tipo, 'su');
  assert.ok(senza.weight >= 65, 'aumento grande: ' + senza.weight);
  app.aggiusti({ esercizi: { [PANCA]: { blocca: true, sedute: 1 } }, scarico: null });
  assert.strictEqual(kg(carico(app, null, PANCA, 60, 8, 4)), 60);
});
test('blocca non fa nulla quando il motore già non aumenta', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 6, 4);   /* ripetizioni sotto il bersaglio: «mancato», stesso carico */
  const senza = carico(app, null, PANCA, 60, 8, 4);
  app.aggiusti({ esercizi: { [PANCA]: { blocca: true, sedute: 1 } }, scarico: null });
  assert.deepStrictEqual(carico(app, null, PANCA, 60, 8, 4), senza);
});
test('blocca: una nuova voce salvata dalla v2 (obiettivo.reps) riporta le ripetizioni previste, non quelle fatte', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', CURL, 12, 12, 3, { obiettivo: { reps: 10, sets: 3, coachTipo: 'fermo' } });   /* previste 10, fatte 12 */
  app.aggiusti({ esercizi: { [CURL]: { blocca: true, sedute: 1 } }, scarico: null });
  const r = carico(app, null, CURL, 12, 10, 3);
  assert.deepStrictEqual([r.weight, r.reps], [12, 10]);
});

/* ============================================================================================================
   B6 · «extra» solo se il «su» era di carico
   ============================================================================================================ */
test('extra dopo +1 ripetizione: niente kg in più (prima: +1 kg sopra la ripetizione in più)', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', CURL, 12, 10, 3);
  app.aggiusti({ esercizi: { [CURL]: { extra: true, sedute: 1 } }, scarico: null });
  const r = carico(app, null, CURL, 12, 10, 3);
  assert.deepStrictEqual([r.tipo, r.weight, r.reps], ['su', 12, 11]);
  assert.doesNotMatch(r.motivo, /kg in più/);
});
test('extra dopo +2,5 kg: un aumento in più, come prima', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  app.aggiusti({ esercizi: { [PANCA]: { extra: true, sedute: 1 } }, scarico: null });
  const r = carico(app, null, PANCA, 60, 8, 4);
  assert.deepStrictEqual([r.tipo, r.weight], ['su', 65]);
  assert.match(r.motivo, /\+2\.5 kg in più: l ultima volta era leggero/);
});

/* ============================================================================================================
   B7 · dolore al gomito o al ginocchio: -10% con «ampiezza senza dolore», niente salto a 12 ripetizioni
   ============================================================================================================ */
test('dolore con alteRip: resta il -10%, le ripetizioni restano quelle del programma (prima: 12) e il motivo dice «ampiezza senza dolore»', () => {
  const app = nuovaApp();
  registra(app, '2026-10-02T18:00:00', CURL, 12, 10, 3);
  app.aggiusti({ esercizi: { [CURL]: { fattore: 0.9, sedute: 2, alteRip: true, motivo: 'Dolore segnalato: carico ridotto (10%)' } }, scarico: null });
  const r = carico(app, null, CURL, 12, 10, 3);
  assert.strictEqual(r.tipo, 'giu');
  assert.strictEqual(r.weight, 11, '-10% di 12 kg, arrotondato a 0,5 kg');
  assert.strictEqual(r.reps, 11, 'le ripetizioni sono quelle del motore (una in più), non 12');
  assert.match(r.motivo, /Dolore segnalato: carico ridotto \(10%\)/);
  assert.match(r.motivo, /ampiezza senza dolore, almeno 3 ripetizioni in riserva/);
  assert.doesNotMatch(r.motivo, /ripetizioni alte/);
});

/* ============================================================================================================
   B26 · lo scarico non si compone e dopo lo scarico si riparte dal carico di prima (U15, N1, N2; MES-06)
   ============================================================================================================ */
test('settimana di scarico: tre sedute dello stesso esercizio, stesso carico in tutte (prima: 54 → 48,5 → 43,5) e poi riparte da 60 (prima: da 43,5 + 2,5)', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);   /* ultima seduta normale (settimana 6): voce del tipo v1, senza etichetta di fase */
  const pesi = [];
  [LUN_SETT8, MER_SETT8, VEN_SETT8].forEach(quando => {
    const r = carico(app, quando, PANCA, 60, 8, 4);
    assert.strictEqual(r.tipo, 'scarico', quando);
    assert.strictEqual(r.sets, 2, 'serie dimezzate (dose media)');
    pesi.push(r.weight);
    registra(app, quando, PANCA, r.weight, 8, r.sets);   /* si fa la seduta di scarico: completa */
  });
  assert.deepStrictEqual(pesi, [54, 54, 54]);
  const dopo = carico(app, LUN_SETT9, PANCA, 60, 8, 4);
  assert.deepStrictEqual([dopo.weight, dopo.reps, dopo.sets, dopo.tipo], [60, 8, 4, 'fermo'], 'la prima seduta dopo lo scarico riparte dal carico di prima');
  assert.match(dopo.motivo, /Dopo lo scarico riparti dal carico che avevi prima/);
  assert.match(dopo.motivo, /lascia \d–\d ripetizioni in riserva/);
  /* poi le regole normali: fatta la seduta a 60, la volta dopo +2,5 kg */
  registra(app, LUN_SETT9, PANCA, 60, 8, 4);
  const poi = carico(app, '2026-10-21T10:00:00', PANCA, 60, 8, 4);
  assert.deepStrictEqual([poi.tipo, poi.weight], ['su', 62.5]);
});
test('vettore di prova 4 della nota algoritmi: carico di lavoro 100 kg, dose 0,9 → 90, 90, 90 (prima: 90, 81, 72,9 → 73)', () => {
  const v = VETTORI_CARICHI.scaricoPiuSedute;
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, v.caricoLavoro, 8, 4);
  const pesi = [];
  [LUN_SETT8, MER_SETT8, VEN_SETT8].forEach(quando => {
    const r = carico(app, quando, PANCA, v.caricoLavoro, 8, 4);
    pesi.push(r.weight);
    registra(app, quando, PANCA, r.weight, 8, r.sets);
  });
  assert.deepStrictEqual(pesi, v.atteso);
});
test('scarico: le sedute salvate dalla v2 (obiettivo.coachTipo, settimana.fase) valgono come le voci vecchie', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4, { voce: { settimana: { numero: 6, fase: 'carico' } }, obiettivo: { reps: 8, sets: 4, rir: [1, 3], coachTipo: 'su' } });
  const pesi = [];
  [LUN_SETT8, MER_SETT8, VEN_SETT8].forEach(quando => {
    const r = carico(app, quando, PANCA, 60, 8, 4);
    pesi.push(r.weight);
    registra(app, quando, PANCA, r.weight, 8, r.sets, { voce: { settimana: { numero: 8, fase: 'scarico' } }, obiettivo: { reps: 8, sets: r.sets, rir: [3, 4], coachTipo: 'scarico' } });
  });
  assert.deepStrictEqual(pesi, [54, 54, 54]);
  assert.strictEqual(kg(carico(app, LUN_SETT9, PANCA, 60, 8, 4)), 60);
});
test('dopo lo scarico si riparte dal carico di prima solo se lo scarico è andato bene; se è mancato resta com\'era', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  registra(app, LUN_SETT8, PANCA, 54, 5, 2);   /* nemmeno il carico ridotto è riuscito: «mancato» */
  const r = carico(app, LUN_SETT9, PANCA, 60, 8, 4);
  assert.ok(r.weight <= 54, 'non si torna a 60 dopo uno scarico non riuscito: ' + r.weight + ' ' + r.tipo);
});
test('dopo lo scarico: prudenti e over 65 ripartono dal 95% del carico di prima, chi è in forma dal 100%', () => {
  const prepara = prof => {
    const app = nuovaApp(prof, LUN_SETT7);
    registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
    registra(app, VEN_SETT8, PANCA, 54, 8, 2);   /* tre giorni prima del lunedì della ripresa: niente rientro */
    return app;
  };
  assert.strictEqual(kg(carico(prepara({}), LUN_SETT9, PANCA, 60, 8, 4)), 60);
  assert.strictEqual(kg(carico(prepara({ age: 70 }), LUN_SETT9, PANCA, 60, 8, 4)), 57);
  assert.strictEqual(kg(carico(prepara({ parq: true }), LUN_SETT9, PANCA, 60, 8, 4)), 57);
  const stanco = prepara({});
  stanco.scrivi('coach_plus_prontezza_storia_toji', [{ punteggio: 40 }, { punteggio: 50 }, { punteggio: 55 }]);
  assert.strictEqual(kg(carico(stanco, LUN_SETT9, PANCA, 60, 8, 4)), 57, 'prontezza media sotto 60: -5%');
  const bene = prepara({});
  bene.scrivi('coach_plus_prontezza_storia_toji', [{ punteggio: 70 }, { punteggio: 80 }, { punteggio: 75 }]);
  assert.strictEqual(kg(carico(bene, LUN_SETT9, PANCA, 60, 8, 4)), 60);
  assert.match(carico(prepara({ age: 70 }), LUN_SETT9, PANCA, 60, 8, 4).motivo, /Dopo lo scarico riparti poco sotto il carico che avevi prima \(-5%\), per prudenza/);
});
test('scarico già composto nei dati vecchi (24,5 → 22 → 20 → 18 kg): la ripresa sale per gradi, al massimo +25% sull\'ultima seduta, e poi prosegue la progressione normale', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 24.5, 8, 4);
  [['2026-10-12T18:00:00', 22], ['2026-10-14T18:00:00', 20], ['2026-10-16T18:00:00', 18]].forEach(([q, w]) => registra(app, q, PANCA, w, 8, 2));
  const r = carico(app, LUN_SETT9, PANCA, 24.5, 8, 4);
  assert.deepStrictEqual([r.tipo, r.weight], ['su', 22.5], 'prima: 18 + 2,5 = 20,5; senza tetto sarebbe 24,5 (+36%)');
  assert.match(r.motivo, /Dopo lo scarico si risale per gradi verso il carico di prima: oggi \+25%/);
  registra(app, LUN_SETT9, PANCA, 22.5, 8, 4);
  const poi = carico(app, '2026-10-21T10:00:00', PANCA, 24.5, 8, 4);
  assert.deepStrictEqual([poi.tipo, poi.weight, poi.reps], ['su', 22.5, 9], 'poi la progressione normale (con un carico così basso prima una ripetizione in più): non ricade nello scarico');
});
test('dopo lo scarico e una pausa (rientro, doppia oltre i 65 anni): il -10% si applica al carico di prima, non a quello di scarico', () => {
  const prepara = prof => {
    const app = nuovaApp(prof, LUN_SETT7);
    registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
    registra(app, LUN_SETT8, PANCA, 54, 8, 2);   /* sette giorni prima: per un 70enne sono 14 giorni di pausa, -10% */
    return app;
  };
  const r = carico(prepara({ age: 70 }), LUN_SETT9, PANCA, 60, 8, 4);
  assert.deepStrictEqual([r.tipo, r.weight], ['giu', 54], 'prima: 54 x 0,9 = 48,5');
  assert.match(r.motivo, /Rientro dopo 7 giorni/);
  assert.strictEqual(kg(carico(prepara({}), LUN_SETT9, PANCA, 60, 8, 4)), 60, 'a 30 anni sette giorni non sono una pausa');
});
test('scarico deciso dal coach (CAR-10): il carico si calcola sul riferimento, non su quello già progredito, e non si compone tra le sedute', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  app.aggiusti({ esercizi: {}, scarico: { sedute: 2, motivo: 'fatica accumulata nelle ultime sedute' } });
  const r1 = carico(app, '2026-10-06T10:00:00', PANCA, 60, 8, 4);
  assert.deepStrictEqual([r1.tipo, r1.weight], ['scarico', 54], 'prima: 62,5 x 0,9 = 56,5');
  /* la seduta di scarico salvata dalla v2 porta il tipo: la volta dopo il riferimento resta 60 */
  registra(app, '2026-10-06T10:00:00', PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  const r2 = carico(app, '2026-10-08T10:00:00', PANCA, 60, 8, 4);
  assert.deepStrictEqual([r2.tipo, r2.weight], ['scarico', 54], 'prima: 54 + 2,5 = 56,5 x 0,9 = 51');
  /* esaurito lo scarico si riparte da 60 */
  app.aggiusti({ esercizi: {}, scarico: null });
  registra(app, '2026-10-08T10:00:00', PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  const r3 = carico(app, '2026-10-12T10:00:00', PANCA, 60, 8, 4);   /* lunedì della settimana 8: scarico del calendario, stesso carico */
  assert.strictEqual(r3.weight, 54);
  registra(app, MER_SETT8, PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  const r4 = carico(app, LUN_SETT9, PANCA, 60, 8, 4);
  assert.strictEqual(r4.weight, 60, 'nessun taglio permanente: dopo lo scarico si riparte da 60');
});
test('lo scarico del coach non alza mai il carico: se il motore propone già meno (dolore, rientro) si parte da quello', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-09-10T18:00:00', PANCA, 60, 8, 4);   /* 25 giorni fa: rientro -20% */
  app.aggiusti({ esercizi: {}, scarico: { sedute: 1, motivo: 'fatica accumulata nelle ultime sedute' } });
  const r = carico(app, null, PANCA, 60, 8, 4);
  assert.ok(r.weight <= 60 * 0.8 * 0.9 + 0.5, 'rientro e scarico insieme: ' + r.weight);
});

/* ============================================================================================================
   spegnibili: ALG-02, MES-06 e MES-09 sono regole nuove («(spegnibile)» nella mappa). Fino a W1-T1 l'elenco dei codici spegnibili
   e REGOLE_SPEGNIBILI (parametri.js, file condiviso): qui lo si completa nel contesto di prova, come farà l'integrazione.
   ============================================================================================================ */
function conSpegnibili(app) { app.g("REGOLE_SPEGNIBILI.push('ALG-02', 'MES-06', 'MES-09')"); return app; }
test('ALG-02 spenta: «blocca» ed «extra» tornano a com\'erano (un incremento in meno, un incremento in più)', () => {
  const app = conSpegnibili(nuovaApp());
  registra(app, '2026-10-02T18:00:00', CURL, 12, 10, 3);
  app.spegni(['ALG-02']);
  app.aggiusti({ esercizi: { [CURL]: { blocca: true, sedute: 1 } }, scarico: null });
  assert.deepStrictEqual([carico(app, null, CURL, 12, 10, 3).weight, carico(app, null, CURL, 12, 10, 3).tipo], [11, 'fermo']);
  app.aggiusti({ esercizi: { [CURL]: { extra: true, sedute: 1 } }, scarico: null });
  assert.strictEqual(carico(app, null, CURL, 12, 10, 3).weight, 13);
  app.riaccendi();
  assert.strictEqual(carico(app, null, CURL, 12, 10, 3).weight, 12);
});
test('MES-06 spenta: lo scarico torna a comporsi (è il ramo di prima, per tornare indietro in produzione) e riaccesa si ripara', () => {
  const app = conSpegnibili(nuovaApp({}, LUN_SETT7));
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  registra(app, LUN_SETT8, PANCA, 54, 8, 2);
  app.spegni(['MES-06']);
  assert.strictEqual(carico(app, MER_SETT8, PANCA, 60, 8, 4).weight, 48.5);
  app.riaccendi();
  assert.strictEqual(carico(app, MER_SETT8, PANCA, 60, 8, 4).weight, 54);
});
test('MES-09 spenta: la seduta salvata non porta settimana né obiettivo', () => {
  const app = conSpegnibili(caricaApp({ fixture: 'intermedio-phul' }));
  app.spegni(['MES-09']);
  const { storia } = chiudiSeduta(app, app.giorniAllenamento()[0]);
  assert.strictEqual(storia[0].settimana, undefined);
  assert.ok(storia[0].sessione.every(s => s.obiettivo === undefined));
});

/* ============================================================================================================
   i due aiutanti dei dati: caricoRiferimento (MES-06) e ultimeSessioni con senzaScarico
   ============================================================================================================ */
test('caricoRiferimento: massimo dell\'ultima seduta NON di scarico entro 28 giorni (0 se non c\'è)', () => {
  const app = nuovaApp({}, '2026-10-21T10:00:00');   /* settimana 9, di carico */
  const rif = nome => app.g('caricoRiferimento(' + JSON.stringify(nome) + ')');
  assert.strictEqual(rif(PANCA), 0, 'nessuna storia');
  registra(app, '2026-09-01T18:00:00', PANCA, 55, 8, 4);   /* 50 giorni fa: fuori finestra */
  assert.strictEqual(rif(PANCA), 0, 'oltre 28 giorni non vale');
  registra(app, '2026-09-28T18:00:00', PANCA, 60, 8, 4);   /* 23 giorni fa */
  assert.strictEqual(rif(PANCA), 60);
  registra(app, '2026-10-13T09:00:00', PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  assert.strictEqual(rif(PANCA), 60, 'una seduta di scarico non cambia il riferimento');
  registra(app, '2026-10-14T09:00:00', PANCA, 60, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'giu' } });
  assert.strictEqual(rif(PANCA), 60, 'neanche se la prontezza del giorno ha portato il tipo a «giu»: era comunque la settimana di scarico');
  registra(app, '2026-10-15T09:30:00', PANCA, 62.5, 8, 3, { voce: { interrotta: true } });
  assert.strictEqual(rif(PANCA), 60, 'una seduta interrotta non conta');
  registra(app, '2026-10-20T09:40:00', PANCA, 62.5, 8, 4);
  assert.strictEqual(rif(PANCA), 62.5, 'una seduta normale più recente sì');
  const lista = app.leggi(app.chiave('historyKey'));
  lista[0].sessione[0].sets.push({ weight: 65, reps: 3, done: true, wasBerserk: false, rpe: null }, { weight: 70, reps: 1, done: false, wasBerserk: false, rpe: null });
  app.storia(lista);
  assert.strictEqual(rif(PANCA), 65, 'massimo tra le serie fatte (la serie non fatta non conta)');
});
test('un esercizio con la voce di scarico del coach fuori dalla settimana di scarico (scarico deciso, mirato) vale come scarico', () => {
  const app = nuovaApp({}, '2026-10-08T10:00:00');   /* settimana 7, di carico */
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  registra(app, '2026-10-06T18:00:00', PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  assert.strictEqual(app.g('caricoRiferimento(' + JSON.stringify(PANCA) + ')'), 60);
  assert.deepStrictEqual(app.dati(app.g('ultimeSessioni(' + JSON.stringify(PANCA) + ', 2, { senzaScarico: true })')).map(e => e.sets[0].weight), [60]);
});
test('ultimeSessioni: senza opzione include lo scarico (come prima), con { senzaScarico: true } lo salta', () => {
  const app = nuovaApp({}, LUN_SETT9);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  registra(app, '2026-10-13T18:00:00', PANCA, 54, 8, 2);   /* nessuna etichetta: la settimana 8 del programma è di scarico */
  registra(app, '2026-10-15T18:00:00', PANCA, 54, 8, 2, { obiettivo: { reps: 8, sets: 2, coachTipo: 'scarico' } });
  const pesi = args => app.dati(app.g('ultimeSessioni(' + args + ')')).map(e => e.sets[0].weight);
  const n = JSON.stringify(PANCA);
  assert.deepStrictEqual(pesi(n + ', 3'), [54, 54, 60]);
  assert.deepStrictEqual(pesi(n + ', 3, { senzaScarico: true }'), [60]);
  assert.deepStrictEqual(pesi(n + ', 1'), [54]);
});
test('pesoUltimoDi: carico e ripetizioni dell\'ultima volta (null se manca la storia)', () => {
  const app = nuovaApp();
  const ult = () => app.json('pesoUltimoDi(' + JSON.stringify(CURL) + ')');
  assert.strictEqual(ult(), null);
  registra(app, '2026-10-02T18:00:00', CURL, 12, 10, 3);
  assert.deepStrictEqual(ult(), { weight: 12, reps: 10 });
});

/* ============================================================================================================
   MES-09 · la seduta salvata porta settimana e obiettivo (campi facoltativi: le voci vecchie non li hanno)
   ============================================================================================================ */
function chiudiSeduta(app, giorno) {
  app.g('currentDay = ' + JSON.stringify(giorno));
  app.g('applicaCaricoProgressivo(' + JSON.stringify(giorno) + ')');
  const piano = app.pianoSalvato();
  piano[giorno].forEach(e => e.completedSets.forEach(s => { s.done = true; s.rpe = 8; }));
  app.scrivi(app.g('dataKey()'), piano);
  app.g('endWorkout()');
  return { storia: app.json('loadHistory()'), piano: piano[giorno] };
}
test('endWorkout salva settimana e, per esercizio, obiettivo (ripetizioni, serie, RIR, tecnica, tipo del coach)', () => {
  const app = caricaApp({ fixture: 'intermedio-phul' });   /* 5 ottobre 2026: settimana 9 del programma, di carico */
  const giorno = app.giorniAllenamento()[0];
  const { storia, piano } = chiudiSeduta(app, giorno);
  assert.deepStrictEqual(storia[0].settimana, { numero: 9, fase: 'carico' });
  assert.strictEqual(storia[0].sessione.length, piano.length);
  storia[0].sessione.forEach((s, i) => {
    const o = s.obiettivo, id = s.name;
    assert.ok(o && typeof o === 'object', id + ': obiettivo');
    assert.strictEqual(o.reps, Number(piano[i].reps), id + ': ripetizioni previste');
    assert.strictEqual(o.sets, piano[i].sets, id + ': serie previste');
    assert.ok(TIPI_COACH.includes(o.coachTipo), id + ': tipo del coach ' + o.coachTipo);
    assert.ok(o.tecnica === undefined || typeof o.tecnica === 'string', id + ': tecnica');
    if (o.rir !== undefined) assert.ok(Array.isArray(o.rir) && o.rir.length === 2 && o.rir[0] <= o.rir[1] && o.rir[0] >= 0, id + ': RIR ' + o.rir);
  });
  assert.ok(storia[0].sessione.some(s => Array.isArray(s.obiettivo.rir)), 'il RIR bersaglio c\'è sugli esercizi con carico');
  assert.deepStrictEqual(app.errori, []);
});
test('endWorkout nella settimana di scarico: fase scarico e coachTipo «scarico» su ogni esercizio con carico', () => {
  const app = caricaApp({ fixture: 'intermedio-phul' });
  app.ora('2026-10-28T10:00:00');   /* settimana 12 di 12: scarico (la fixture porta il suo orologio: si sposta dopo averla caricata) */
  const giorno = app.giorniAllenamento()[0];
  const { storia } = chiudiSeduta(app, giorno);
  assert.deepStrictEqual(storia[0].settimana, { numero: 12, fase: 'scarico' });
  const conCarico = storia[0].sessione.filter(s => !app.g('isTimeBased(' + JSON.stringify(s.name) + ')'));
  assert.ok(conCarico.length >= 3);
  conCarico.forEach(s => assert.strictEqual(s.obiettivo.coachTipo, 'scarico', s.name));
  /* e il carico di riferimento li salta: la seduta appena fatta è di scarico */
  const nome = conCarico[0].name, w = Math.max(...conCarico[0].sets.map(x => x.weight));
  assert.notStrictEqual(app.g('caricoRiferimento(' + JSON.stringify(nome) + ')'), w, 'il riferimento non è il carico di scarico di oggi');
});
test('le voci vecchie (senza settimana né obiettivo) restano valide: nessun campo obbligatorio', () => {
  const app = nuovaApp({}, LUN_SETT7);
  registra(app, '2026-10-02T18:00:00', PANCA, 60, 8, 4);
  const [h] = app.json('loadHistory()');
  assert.strictEqual(h.settimana, undefined);
  assert.strictEqual(h.sessione[0].obiettivo, undefined);
  assert.strictEqual(app.json('caricoRiferimento(' + JSON.stringify(PANCA) + ')'), 60);
  assert.strictEqual(carico(app, null, PANCA, 60, 8, 4).weight, 62.5);
  assert.deepStrictEqual(app.errori, []);
});
test('i campi nuovi sopravvivono a rileggere e risalvare lo storico, al backup e al ripristino', () => {
  const app = nuovaApp({}, LUN_SETT9);
  const voce = { settimana: { numero: 8, fase: 'scarico' } }, obiettivo = { reps: 8, sets: 2, rir: [3, 4], tecnica: 'calibrazione', coachTipo: 'scarico' };
  registra(app, '2026-10-13T18:00:00', PANCA, 54, 8, 2, { voce, obiettivo });
  registra(app, '2026-10-14T18:00:00', CURL, 12, 10, 3);   /* una voce vecchia accanto */
  const atteso = app.json('loadHistory()');
  assert.deepStrictEqual(atteso.find(h => h.settimana).settimana, voce.settimana, 'loadHistory conserva settimana');
  assert.deepStrictEqual(atteso.find(h => h.settimana).sessione[0].obiettivo, obiettivo, 'e obiettivo');
  /* leggere e risalvare (lo fanno endWorkout e il questionario a ogni seduta) non deve far perdere nulla */
  app.g('saveHistory(loadHistory())'); app.g('saveHistory(loadHistory())');
  assert.deepStrictEqual(app.json('loadHistory()'), atteso);
  /* backup: la fotografia prende le chiavi coach_plus_*; ripristino su un telefono vuoto */
  const copia = app.json('fotografia()');
  const altra = nuovaApp({}, LUN_SETT9);
  altra.store[altra.g('historyKey()')] = '[]';
  altra.ctx.__d = altra.g('JSON.parse(' + JSON.stringify(JSON.stringify(copia)) + ')');
  altra.g('applicaFotografia(__d, true)');
  assert.deepStrictEqual(altra.json('loadHistory()'), atteso, 'dopo il ripristino lo storico è identico, campi nuovi compresi');
  assert.strictEqual(altra.g('caricoRiferimento(' + JSON.stringify(PANCA) + ')'), 0, 'e il riferimento salta la seduta di scarico ripristinata');
});

/* ============================================================================================================
   le fixture v1 aprono ancora una seduta con le regole nuove (nessun errore, carichi nel limite)
   ============================================================================================================ */
['aggiusti-scarico', 'intermedio-phul', 'over65-parq'].forEach(nome => {
  test(nome + ': caricoProssimo dopo la correzione resta in un intervallo sensato per ogni esercizio del piano', () => {
    const app = caricaApp({ fixture: nome });
    const piano = app.pianoSalvato(), storia = app.json('loadHistory()');
    app.giorniAllenamento().forEach(giorno => piano[giorno].forEach(e => {
      const r = app.dati(app.chiama('caricoProssimo', e.name, e.weight, e.reps, e.sets));
      assert.ok(r && Number.isFinite(r.weight) && r.weight >= 0 && TIPI_COACH.includes(r.tipo), e.name + ': ' + JSON.stringify(r));
      const ultimo = (storia.flatMap(h => h.sessione || []).find(x => x.name === e.name) || { sets: [] }).sets.filter(s => s.done).map(s => Number(s.weight) || 0);
      if (ultimo.length && Math.max(...ultimo) >= 5) assert.ok(r.weight >= Math.max(...ultimo) * 0.4 && r.weight <= Math.max(...ultimo) * 1.35, e.name + ': da ' + Math.max(...ultimo) + ' a ' + r.weight);
    }));
    assert.deepStrictEqual(app.errori, []);
  });
});
test('le fixture v1 non hanno i campi nuovi (sono voci vecchie)', () => {
  ['aggiusti-scarico', 'intermedio-phul'].forEach(n => {
    const h = leggiFixture(n).chiavi.coach_plus_history_toji;
    assert.ok(h.every(x => x.settimana === undefined && x.sessione.every(s => s.obiettivo === undefined)), n);
  });
});
