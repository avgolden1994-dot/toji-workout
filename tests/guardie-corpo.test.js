/* Guardie del corpo (P4-C, coach v2, W5-T3 ridotta alle sole guardie): nutrizione e composizione corporea.
   Due cose, dette dal piano (W5-T3: NUT-01, ETA-04, DCA-03 parte a) e dal registro (B21, C.2):
   1. Minorenni, over 65 e gravidanza/post-parto NON ricevono grammi di proteine ne calorie: al loro posto un testo prudente
      («parlane con il medico o con un dietista»). Si guardano tutti i punti dove il coach scrive un numero di cibo:
      fattoreFisico (compone.js, anche nella nota del programma), corpoCoach (repertorio.js) e consiglioPeso (progressi/peso.js).
      Per un adulto (18-64 anni, non in gravidanza) l output resta identico, parola per parola (numeri «Convenzione»: COR-03,
      js/coach/bia/soglie-bia.js: NON sono validati, solo etichettati).
      Il campo `ffm` di fattoreFisico e il `bmr` di analyzeBia sono MISURE della BIA inserite dall utente (non fabbisogni scritti dal
      coach): non contano come «numeri di proteine o calorie» e questa prova non li guarda.
   2. La frase «Sotto il 17% di massa grassa la funzione mestruale puo risentirne...» (DCA-03 parte a) non c e piu ne nel codice ne nei
      dizionari: la parte b di DCA-03 (segnali con significato clinico) e BLOCCATA (registro C.2 n. 6): non c e nessun testo che la anticipi.
   La bandiera di gravidanza e quella di P4-S: `inGravidanza(profilo)` se la funzione esiste, altrimenti il campo `profilo.gravidanza`. */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), vm = require('vm');
const { caricaApp } = require('./aiuto-app');

const R = path.join(__dirname, '..');
const ORA = '2026-10-05T12:00:00';
const FILE_SOGLIE = path.join(R, 'js', 'coach', 'bia', 'soglie-bia.js');
const MANIFEST = path.join(R, 'docs', 'in-arrivo', 'P4-C.json');

const nuovaApp = () => caricaApp({ ora: ORA });

/* ---- che cosa e «un numero di proteine o di calorie» ---- */
const parlaDiCibo = s => /protein|calori|kcal/i.test(s);
const tutteLeStringhe = x => {
  if (typeof x === 'string') return [x];
  if (Array.isArray(x)) return x.reduce((a, y) => a.concat(tutteLeStringhe(y)), []);
  if (x && typeof x === 'object') return Object.keys(x).reduce((a, k) => a.concat(tutteLeStringhe(x[k])), []);
  return [];
};
/* una stringa con «protein*», «calori*» o «kcal» E una cifra: «Proteine: circa 132 g», «togli 200-300 kcal», «2,35-2,75 g per kg di massa magra» */
const numeriDiCibo = x => tutteLeStringhe(x).filter(s => parlaDiCibo(s) && /\d/.test(s));
/* i campi: una chiave che parla di proteine o calorie con un valore numerico (o una stringa con cifre) */
const campiDiCibo = (x, via) => {
  via = via || '$';
  if (!x || typeof x !== 'object') return [];
  return Object.keys(x).reduce((a, k) => {
    const v = x[k], p = via + '.' + k;
    if (/prote|calor|kcal/i.test(k) && (typeof v === 'number' || (typeof v === 'string' && /\d/.test(v)))) a.push(p + '=' + v);
    return a.concat(campiDiCibo(v, p));
  }, []);
};

const BIA = { peso: 70, altezza: 175, fmPerc: 20, ffm: 56 };
const GRUPPI = {
  minorenne: [{ age: 13 }, { age: 16 }, { age: 17 }],
  over65: [{ age: 65 }, { age: 70 }, { age: 82 }],
  gravidanza: [{ age: 30, gravidanza: true }, { age: 28, sex: 'F', gravidanza: true }]
};
const ADULTI = [{ age: 18 }, { age: 30 }, { age: 40, sex: 'F' }, { age: 64 }];
const tuttiIGruppi = f => Object.keys(GRUPPI).forEach(g => GRUPPI[g].forEach(p => f(g, p)));

const TESTO_PER = {
  minorenne: /^Alla tua età non do numeri su peso o cibo/,
  over65: /^Alla tua età non do grammi di proteine né calorie/,
  gravidanza: /^In gravidanza o dopo il parto non do grammi di proteine né calorie/
};
const verso = (g, testi) => assert.ok(testi.some(t => TESTO_PER[g].test(t)), g + ': manca il testo prudente in ' + JSON.stringify(testi));

/* ============================================================ fattoreFisico (compone.js) e nota del programma */
test('fattoreFisico: minorenni, over 65 e gravidanza non ricevono grammi di proteine: al loro posto il testo prudente', () => {
  const app = nuovaApp();
  tuttiIGruppi((g, p) => {
    const f = app.dati(app.chiama('fattoreFisico', Object.assign({ sex: 'M', bia: BIA }, p), {}));
    assert.deepStrictEqual(numeriDiCibo(f), [], g + ' ' + JSON.stringify(p) + ': numeri di cibo in ' + JSON.stringify(f.testi));
    assert.deepStrictEqual(campiDiCibo(f), [], g + ': campi di cibo');
    verso(g, f.testi);
  });
});
test('fattoreFisico: la gravidanza si legge anche dal profilo salvato (prof0) e da inGravidanza(profilo) di P4-S, se la funzione esiste', () => {
  const app = nuovaApp();
  const dalProfilo = app.dati(app.chiama('fattoreFisico', { age: 30, sex: 'F', bia: BIA }, { gravidanza: true, age: 30 }));
  assert.deepStrictEqual(numeriDiCibo(dalProfilo), []); verso('gravidanza', dalProfilo.testi);
  /* nessuna bandiera: adulto come sempre */
  const senza = app.dati(app.chiama('fattoreFisico', { age: 30, sex: 'F', bia: BIA }, { age: 30 }));
  assert.ok(numeriDiCibo(senza).length === 1);
  /* P4-S: una funzione inGravidanza(profilo) vera vale, anche senza il campo */
  app.g('globalThis.inGravidanza = function (p) { return !!(p && p.incinta); }');
  const hook = app.dati(app.chiama('fattoreFisico', { age: 30, sex: 'F', bia: BIA, incinta: true }, {}));
  assert.deepStrictEqual(numeriDiCibo(hook), []); verso('gravidanza', hook.testi);
  app.g('delete globalThis.inGravidanza');
  /* una funzione che lancia non rompe il programma */
  app.g('globalThis.inGravidanza = function () { throw new Error("P4-S non pronto"); }');
  const rotta = app.dati(app.chiama('fattoreFisico', { age: 30, sex: 'F', bia: BIA }, {}));
  assert.ok(numeriDiCibo(rotta).length === 1, 'adulto invariato anche se inGravidanza lancia');
});
test('fattoreFisico: per un adulto l output e identico a prima (stesse parole, stessi numeri: 2,35 g per kg di massa magra)', () => {
  const app = nuovaApp();
  ADULTI.forEach(p => {
    [[56, 132], [60, 141], [44, 103], [70.5, 166]].forEach(([ffm, g]) => {
      const f = app.dati(app.chiama('fattoreFisico', Object.assign({ sex: 'M', bia: Object.assign({}, BIA, { ffm }) }, p), {}));
      /* le altre frasi del fattore fisico (massa magra bassa, grasso alto) non c entrano: si guarda la riga delle proteine */
      assert.deepStrictEqual(f.testi.filter(t => /^Proteine/.test(t)), ['Proteine: circa ' + g + ' g al giorno (2,35 g per kg di massa magra).'], JSON.stringify(p) + ' ffm ' + ffm);
    });
  });
});
test('buildProgram: la nota «Proteine: circa ...» sparisce per i tre gruppi, resta per l adulto', () => {
  const app = nuovaApp();
  const base = { goals: ['massa'], level: 'intermedio', days: 3, minutes: 60, luogo: 'palestra', sex: 'M', fastidi: [], parq: 'no', sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, seme: 'guardie-corpo', bia: BIA };
  tuttiIGruppi((g, p) => {
    const prog = app.dati(app.chiama('buildProgram', Object.assign({}, base, p)));
    assert.deepStrictEqual(numeriDiCibo(prog.note), [], g + ' ' + JSON.stringify(p) + ': numeri di cibo nelle note');
    assert.deepStrictEqual(numeriDiCibo(prog), [], g + ': numeri di cibo in tutto il programma');
    verso(g, prog.note);
  });
  ADULTI.forEach(p => {
    const prog = app.dati(app.chiama('buildProgram', Object.assign({}, base, p)));
    assert.ok(prog.note.indexOf('Proteine: circa 132 g al giorno (2,35 g per kg di massa magra).') !== -1, JSON.stringify(p) + ': la nota dell adulto c e');
  });
});

/* ============================================================ corpoCoach (repertorio.js) */
function conBia(app, profilo, voci) {
  app.profilo(profilo);
  voci.forEach(v => app.chiama('aggiungiBia', v.valori, v.data));
}
const DUE_BIA = [{ data: '2026-09-01', valori: { peso: 75, altezza: 175, fmPerc: 20, ffm: 60 } }, { data: '2026-09-15', valori: { peso: 74, altezza: 175, fmPerc: 19, ffm: 60 } }];
test('corpoCoach: nessun grammo di proteine per i tre gruppi, con la massa magra della BIA e con il solo peso; niente passi né creatina', () => {
  tuttiIGruppi((g, p) => {
    [DUE_BIA, []].forEach((bia, i) => {
      const app = nuovaApp();
      conBia(app, Object.assign({ sex: 'M', weight: 75, goals: ['dimagrimento'], fase: 'deficit' }, p), bia);
      const out = app.dati(app.chiama('corpoCoach'));
      assert.deepStrictEqual(numeriDiCibo(out), [], g + ' ' + JSON.stringify(p) + (i ? ' (solo peso)' : ' (con BIA)') + ': ' + JSON.stringify(out));
      verso(g, out);
      /* INT-4: dei tre gruppi resta solo il testo prudente: niente ritmo di calo, passi in deficit né creatina (tests/integrazione-onda4.test.js) */
      assert.ok(!out.some(t => /^Passi|^Creatina/.test(t)), g + ': nessun numero di passi o di integratori');
    });
  });
});
test('corpoCoach: per un adulto le righe di proteine sono quelle di prima (2,35-2,75 g per kg di massa magra; 2 g/kg, 1,75 per le donne, senza BIA)', () => {
  ADULTI.forEach(p => {
    const app = nuovaApp();
    conBia(app, Object.assign({ sex: 'M', weight: 75, goals: ['dimagrimento'], fase: 'deficit' }, p), DUE_BIA);
    const out = app.dati(app.chiama('corpoCoach'));
    assert.ok(out.indexOf('Proteine: circa 141-165 g al giorno (2,35-2,75 g per kg di massa magra). Informazione, non prescrizione.') !== -1, JSON.stringify(p) + ' ' + JSON.stringify(out));
    assert.ok(out.indexOf('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo ne forza.') !== -1);
  });
  const uomo = nuovaApp(); conBia(uomo, { age: 30, sex: 'M', weight: 80, goals: ['massa'] }, []);
  assert.ok(uomo.dati(uomo.chiama('corpoCoach')).indexOf('Proteine: circa 160 g al giorno (2 g per kg). Informazione, non prescrizione.') !== -1);
  const donna = nuovaApp(); conBia(donna, { age: 30, sex: 'F', weight: 60, goals: ['massa'] }, []);
  assert.ok(donna.dati(donna.chiama('corpoCoach')).indexOf('Proteine: circa 105 g al giorno (1,75 g per kg). Informazione, non prescrizione.') !== -1);
});
test('corpoCoach: con ETA-04 spenta un minorenne non riceve comunque grammi di proteine (la guardia nuova non e spegnibile)', () => {
  const app = nuovaApp();
  conBia(app, { age: 16, sex: 'M', weight: 60, goals: ['massa'] }, DUE_BIA);
  app.spegni(['ETA-04']);
  const out = app.dati(app.chiama('corpoCoach'));
  assert.deepStrictEqual(numeriDiCibo(out), [], JSON.stringify(out));
  verso('minorenne', out);
});

/* ============================================================ consiglioPeso (ui/progressi/peso.js) */
const TENDENZE = { deficitTroppoVeloce: { fase: 'deficit', perc: -1.4 }, deficitFermo: { fase: 'deficit', perc: -0.1 }, massaFerma: { fase: 'massa', perc: 0.05 }, mantenimentoSale: { fase: 'mantenimento', perc: 0.8 } };
test('consiglioPeso: nessuna caloria (ne numeri) per i tre gruppi nei consigli di aggiungere o togliere cibo; per un adulto restano quelli di prima', () => {
  const ATTESI_ADULTO = {
    deficitTroppoVeloce: 'Scendi più dell 1% a settimana: rischi di perdere muscolo. Aggiungi qualche caloria, soprattutto proteine.',
    deficitFermo: 'Il peso è quasi fermo: togli 200-300 kcal al giorno o aggiungi passi.',
    massaFerma: 'Il peso non sale: aggiungi 200-300 kcal al giorno.',
    mantenimentoSale: 'Il peso si sta muovendo: se vuoi mantenerlo, controlla le calorie.'
  };
  const consiglio = (p, k) => {
    const app = nuovaApp();
    app.profilo(Object.assign({ sex: 'M', weight: 75, goals: ['dimagrimento'], fase: TENDENZE[k].fase }, p));
    return app.dati(app.chiama('consiglioPeso', { settimana: 0, perc: TENDENZE[k].perc }));
  };
  tuttiIGruppi((g, p) => Object.keys(TENDENZE).forEach(k => {
    const t = consiglio(p, k);
    assert.deepStrictEqual(numeriDiCibo(t), [], g + ' ' + k + ': ' + t);
    assert.ok(TESTO_PER[g].test(t), g + ' ' + k + ': ' + t);
  }));
  ADULTI.forEach(p => Object.keys(TENDENZE).forEach(k => assert.strictEqual(consiglio(p, k), ATTESI_ADULTO[k], JSON.stringify(p) + ' ' + k)));
});

/* ============================================================ soglie «Convenzione» */
test('soglie-bia.js: i g/kg di proteine di COR-03 sono «Convenzione» (non validati), non sono stati alzati', () => {
  assert.ok(fs.existsSync(FILE_SOGLIE), 'manca js/coach/bia/soglie-bia.js');
  const app = nuovaApp();
  const S = app.dati(app.g('SOGLIE_BIA'));
  const ATTESI = { proteineMassaMagraMin: 2.35, proteineMassaMagraMax: 2.75, proteinePesoUomo: 2, proteinePesoDonna: 1.75 };
  Object.keys(ATTESI).forEach(k => {
    assert.ok(S[k], 'manca la voce ' + k);
    assert.strictEqual(S[k].v, ATTESI[k], k + ': il valore non si alza ne si abbassa in questo pacchetto');
    assert.strictEqual(S[k].forza, 'Convenzione', k + ': senza fonte verificata = Convenzione, mai «validato»');
    assert.ok(/non validato/i.test(S[k].fonte) && /COR-03/.test(S[k].fonte), k + ': la fonte dice che non e validato');
    assert.deepStrictEqual(S[k].regole, ['COR-03'], k);
    assert.strictEqual(app.g('proteineGKg(' + JSON.stringify(k) + ')'), ATTESI[k], k + ': il lettore dà il valore delle soglie');
  });
});

/* ============================================================ le frasi nuove hanno la voce in en, es e de */
function dizionario(lingua) {
  const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(R, 'js/lingue/' + lingua + '.js'), 'utf8'), ctx);
  const d = Object.assign({}, (ctx.window.I18N && ctx.window.I18N[lingua]) || {});
  if (fs.existsSync(MANIFEST)) { const frasi = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).frasi || {}; Object.keys(frasi).forEach(k => { if (frasi[k][lingua]) d[k] = frasi[k][lingua]; }); }
  return d;
}
const FRASI_NUOVE = ['TESTO_NUTRIZIONE_MINORENNE', 'TESTO_NUTRIZIONE_OVER65', 'TESTO_NUTRIZIONE_GRAVIDANZA', 'TESTO_BIA_GRASSO_BASSO'];
test('le quattro frasi (tre di nutrizione, una della BIA) sono tradotte in en, es e de (dizionari o docs/in-arrivo/P4-C.json) senza numeri e senza rinvii inventati', () => {
  const app = nuovaApp();
  FRASI_NUOVE.forEach(nome => {
    const it = app.g(nome);
    assert.ok(typeof it === 'string' && it.length > 20, nome + ' non e definita');
    assert.ok(!/\d/.test(it), nome + ': nessuna cifra (nemmeno un età o una percentuale)');
    ['en', 'es', 'de'].forEach(l => {
      const t = dizionario(l)[it];
      assert.ok(t && t !== it, l + ': manca la traduzione di «' + it.slice(0, 50) + '»');
      assert.ok(!/\d/.test(t), l + ': la traduzione non ha cifre');
    });
  });
  /* il rinvio c e in ogni lingua: medico (o ostetrica) o dietista */
  const rinvio = { en: /doctor|dietitian|dietician|midwife/i, es: /médic|dietista|matrona/i, de: /Arzt|Ärzt|Ernährungs|Hebamme/i };
  FRASI_NUOVE.forEach(nome => ['en', 'es', 'de'].forEach(l => assert.ok(rinvio[l].test(dizionario(l)[app.g(nome)]), l + ' ' + nome + ': manca il rinvio al medico o al dietista')));
});

/* ============================================================ la frase del 17% (DCA-03 parte a) */
const codiceApp = () => fs.readdirSync(path.join(R, 'js'), { recursive: true }).map(f => 'js/' + String(f).split(path.sep).join('/')).filter(f => /\.js$/.test(f));
test('la frase del 17% non c e piu: ne nel codice ne nei dizionari (en, es, de) ne nel manifest', () => {
  const file = codiceApp().filter(f => !/^js\/coach\/catalogo-regole\.js$/.test(f));   /* il catalogo e generato dalla mappa: lo rigenera l integratore (vedi sotto) */
  const trovati = [];
  file.forEach(f => {
    const t = fs.readFileSync(path.join(R, f), 'utf8');
    if (/17\s?%|funzione mestruale|menstrual (?:cycle|function)|Menstruationszyklus|función menstrual/i.test(t)) trovati.push(f);
  });
  assert.deepStrictEqual(trovati, [], 'la frase del 17% sulla funzione mestruale e ancora in: ' + trovati.join(', '));
  /* il catalogo (generato dalla riga BIA-02 della mappa): o e gia pulito, o la riga che lo pulisce e nel manifest in attesa dell integrazione */
  const catalogo = fs.readFileSync(path.join(R, 'js/coach/catalogo-regole.js'), 'utf8');
  if (/17\s?%/.test(catalogo.split('\n').filter(r => /"BIA-02"/.test(r)).join('\n'))) {
    assert.ok(fs.existsSync(MANIFEST), 'il catalogo ha ancora il 17% e non c e il manifest che lo toglie');
    const m = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
    const bia02 = (m.regole || []).find(r => /^- \*\*BIA-02\*\* /.test(r.riga));
    assert.ok(bia02 && bia02.sostituisce === true, 'il manifest riscrive la riga BIA-02');
    assert.ok(!/17\s?%/.test(bia02.riga), 'la riga BIA-02 del manifest non ha il 17%');
  }
  if (fs.existsSync(MANIFEST)) assert.ok(!/17\s?%|mestrua/i.test(JSON.stringify((JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).frasi) || {})), 'il manifest non porta la frase del 17%');
});
test('analyzeBia: nessuna nota con il 17% per nessuna massa grassa; una nota prudente (senza ciclo e senza numeri) solo nella fascia piu bassa, per donne e uomini', () => {
  const app = nuovaApp();
  const note = (sex, fmPerc) => app.dati(app.chiama('analyzeBia', { peso: 60, altezza: 165, fmPerc }, sex)).note.filter(n => !/acqua corporea/.test(n));
  const frase = app.g('TESTO_BIA_GRASSO_BASSO');
  /* donne: fascia bassa = «Livello da atleta» (22 e meno), uomini 15 e meno: le soglie di BIA-02 di prima, nessun numero nuovo */
  [10, 16, 17, 18, 22].forEach(v => assert.deepStrictEqual(note('donna', v), [frase], 'donna ' + v + '%'));
  [23, 30, 36].forEach(v => assert.deepStrictEqual(note('donna', v), [], 'donna ' + v + '%'));
  [8, 12, 15].forEach(v => assert.deepStrictEqual(note('uomo', v), [frase], 'uomo ' + v + '%'));
  [16, 22, 30].forEach(v => assert.deepStrictEqual(note('uomo', v), [], 'uomo ' + v + '%'));
  assert.ok(!/mestru|ciclo|\d/.test(frase), 'la frase non parla di ciclo e non ha numeri');
  assert.ok(/medico/.test(frase) && /dietista/.test(frase) && /stima/.test(frase), 'dice che la BIA e una stima e rinvia a un medico o dietista');
  /* le altre uscite di analyzeBia non cambiano */
  const a = app.dati(app.chiama('analyzeBia', { peso: 60, altezza: 165, fmPerc: 20, ffm: 48, tbw: 33 }, 'donna'));
  assert.strictEqual(a.fmTesto, 'Livello da atleta'); assert.strictEqual(a.bmi, 22); assert.strictEqual(a.ffmi, 17.6);
});

/* ============================================================ regole BLOCCATE (registro C.2): nessun testo che le anticipi */
test('DCA-03 parte b (segnali clinici: ciclo, RED-S, ferro, fratture da stress) e le altre regole bloccate di quest area non sono nel codice ne nei dizionari', () => {
  const RX = /amenorre|assenza di mestruazioni|ciclo (?:e|è) (?:sparito|scomparso)|RED-S|fratture da stress|carenza di ferro|disponibilit[àa] energetica|BFR|occlusione vascolare/i;
  const trovati = [];
  codiceApp().filter(f => !/^js\/(lingue\/|coach\/catalogo-regole\.js$)/.test(f)).forEach(f => { const t = fs.readFileSync(path.join(R, f), 'utf8'); if (RX.test(t)) trovati.push(f); });
  assert.deepStrictEqual(trovati, [], 'testo di una regola bloccata nel codice');
  ['en', 'es', 'de'].forEach(l => Object.keys(dizionario(l)).forEach(k => assert.ok(!RX.test(k), l + ': chiave di una regola bloccata: ' + k.slice(0, 60))));
  if (fs.existsSync(MANIFEST)) assert.ok(!RX.test(JSON.stringify(JSON.parse(fs.readFileSync(MANIFEST, 'utf8')).frasi || {})), 'il manifest non ha frasi delle regole bloccate');
});
