/* Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()).
   Non e un test (non finisce in `npm test`): lo usano i test dell'ondata (tests/*.test.js) con
   `const { caricaApp } = require('./aiuto-app');`. Funziona con qualunque modifica dell'app: legge index.html (una volta per processo)
   e carica gli script nel suo ordine, tranne js/avvio.js.

   Come il modello .claude/skills/implementa-regola-coach/references/modello-test-regola.js, ma in piu:
   - il TEMPO e controllabile (`ora`): `Date`, `new Date()` e `Date.now()` dentro l'app danno l'ora scelta, cosi una prova non
     dipende dal giorno della settimana in cui gira (la prova in browser intensita-bia.js falliva ogni lunedi per questo);
   - `Math.random` e deterministico (`casuale`, default 1) salvo `casuale: false`;
   - `currentMode` e gia 'toji' (nel modello della skill resta null: le chiavi diventavano coach_plus_profile_null), consenso acceso, lingua italiana;
   - `console.error` dell'app e registrato in `app.errori` (non stampato);
   - aiutanti per profilo, storico, programma, aggiusti, regole spente e per le FIXTURE di programmi salvati
     (tests/fixture/programmi-v1/*.json: lo stato di un telefono, come lo scriveva la v1).

   Uso minimo:
     const { caricaApp } = require('./aiuto-app');
     const app = caricaApp({ ora: '2026-10-05T12:00:00' });                  // o caricaApp({ fixture: 'over65-parq' }): stato e ora della fixture
     app.profilo({ level: 'principiante', sex: 'F', age: 30 });              // parq e un BOOLEANO nel profilo salvato
     const r = app.chiama('caricoProssimo', '💪 Panca Piana Bilanciere', 40, 8, 3);     // risultato nel mondo dell'app
     assert.strictEqual(app.dati(r).tipo, 'nuovo');                                      // .dati() lo riporta in node
   Cosa c'e in `app`: g(espressione) valuta nel contesto (anche `let`/`const` globali dell'app); json(espressione) e dati(valore) riportano
   in node (assert.deepStrictEqual fallisce tra mondi diversi: i prototipi non coincidono); chiama(nome, ...args); ora(x) / giorniFa(n) / ymd(x);
   chiave('PROFILE_KEY'|'progKey'|'AGG_KEY'|'dataKey'|'historyKey'...), leggi(k) / scrivi(k, v) sullo store; profilo, storia, programma, aggiusti,
   seduta(giorniFa, [{ nome, serie: [[peso, rip, fatta, rpe]] }]), pianoSalvato(), giorniAllenamento(); consenso(si), spegni([codici]), riaccendi();
   caricaStato(fixture), salvaStato(); store (il localStorage), errori (console.error), erroriCaricamento (script che non si caricano).
   Per il DOM vero (schermate, tocchi, traduttore sulla pagina) servono le prove in tests/browser/ (Playwright). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..');
const CARTELLA_FIXTURE_V1 = path.join(__dirname, 'fixture', 'programmi-v1');

/* i sorgenti si leggono una volta sola per processo: sei caricaApp() di fila costano come uno */
let _sorgenti = null;
function sorgenti() {
  if (_sorgenti) return _sorgenti;
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
  const file = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => f !== 'js/avvio.js');
  _sorgenti = file.map(f => ({ file: f, testo: fs.readFileSync(path.join(R, f), 'utf8') }));
  return _sorgenti;
}

/* eseguito nel contesto prima di tutti gli script: orologio governabile e caso ripetibile */
const PRELUDIO = `(function () {
  var RD = Date;
  class DataApp extends RD {
    constructor(...a) { if (a.length === 0) super(__ora.t === null ? RD.now() : __ora.t); else super(...a); }
    static now() { return __ora.t === null ? RD.now() : __ora.t; }
  }
  Date = DataApp;
  if (__seme !== null) {
    var s = __seme >>> 0;
    Math.random = function () { s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
})();`;

const aTempo = x => (x === null || x === undefined) ? null : (x instanceof Date ? x.getTime() : (typeof x === 'number' ? x : new Date(x).getTime()));

/* Opzioni: ora (data/ISO/ms; default: l'ora vera), consenso (default true: coachAttivo()), lingua ('it'), modalita ('toji'),
   casuale (seme di Math.random; false = quello vero), fixture (nome di un file di tests/fixture/programmi-v1, o l'oggetto),
   chiaviIniziali (oggetto chiave -> valore messo nello store PRIMA di caricare gli script: per le pulizie che girano al caricamento) */
function caricaApp(opz) {
  const o = Object.assign({ ora: null, consenso: true, lingua: 'it', modalita: 'toji', casuale: 1, fixture: null, chiaviIniziali: null }, opz || {});
  const nulla = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : nulla, apply: () => nulla, construct: () => nulla });
  const store = {}, errori = [];
  const ctx = {
    console: { log: console.log, info: console.info, warn: console.warn, debug() {}, error: (...a) => { errori.push(a.map(String).join(' ')); } },
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {}, requestAnimationFrame: () => 0,
    document: nulla, addEventListener() {}, removeEventListener() {}, MutationObserver: class { observe() {} disconnect() {} },
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; }, clear: () => { Object.keys(store).forEach(k => delete store[k]); }, key: i => Object.keys(store)[i] || null, get length() { return Object.keys(store).length; } },
    navigator: { userAgent: 'node', language: 'it' }, location: { href: '', search: '', hash: '' },
    __ora: { t: aTempo(o.ora) }, __seme: o.casuale === false ? null : Number(o.casuale)
  };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  if (o.chiaviIniziali) Object.keys(o.chiaviIniziali).forEach(k => { store[k] = String(o.chiaviIniziali[k]); });
  vm.createContext(ctx);
  vm.runInContext(PRELUDIO, ctx, { filename: 'aiuto-app:prelud' });
  const erroriCaricamento = [];
  sorgenti().forEach(s => { try { vm.runInContext(s.testo, ctx, { filename: s.file }); } catch (e) { erroriCaricamento.push(s.file + ': ' + e.message); } });
  store.tz_consenso = o.consenso ? 'si' : 'no'; store.tz_lingua = o.lingua; store.tz_app_mode = o.modalita;
  vm.runInContext('currentMode = ' + JSON.stringify(o.modalita), ctx);

  const g = s => vm.runInContext(s, ctx);
  /* porta un valore dal mondo dell'app a quello di node (altrimenti assert.deepStrictEqual vede prototipi diversi) */
  const dati = x => { if (x === undefined) return undefined; const j = JSON.stringify(x); return j === undefined ? undefined : JSON.parse(j); };
  const app = {
    ctx, store, g, dati, errori, erroriCaricamento, scriptCaricati: sorgenti().length,
    /* valuta un'espressione e la riporta in node; chiama(nome, ...args) chiama una funzione globale dell'app (gli argomenti oggetto
       vengono copiati nel mondo dell'app) e restituisce il risultato com'e */
    json: espressione => dati(g('(' + espressione + ')')),
    chiama: (nome, ...args) => { ctx.__args = vm.runInContext('JSON.parse(' + JSON.stringify(JSON.stringify(args)) + ')', ctx); return g(nome + '(...__args)'); },

    /* --- tempo --- */
    ora: x => { if (x !== undefined) ctx.__ora.t = aTempo(x); return ctx.__ora.t === null ? Date.now() : ctx.__ora.t; },
    giorniFa: n => app.ora() - n * 86400000,
    ymd: x => g('ymd(new Date(' + aTempo(x === undefined ? app.ora() : x) + '))'),

    /* --- chiavi e dati salvati (le chiavi vere, per modalita) --- */
    chiave: nomeFunzione => g(nomeFunzione + '()'),   /* chiave('PROFILE_KEY'), chiave('progKey'), chiave('AGG_KEY'), chiave('dataKey'), chiave('historyKey') */
    leggi: k => { const v = store[k]; if (v === undefined) return null; try { return JSON.parse(v); } catch (e) { return v; } },
    scrivi: (k, v) => { store[k] = typeof v === 'string' ? v : JSON.stringify(v); },
    /* parq e un BOOLEANO nel profilo salvato (la stringa 'no' conta come modalita prudente: !!'no' e vero) */
    profilo: p => { app.scrivi(g('PROFILE_KEY()'), Object.assign({ level: 'intermedio', age: 30, sex: 'M', goals: ['massa'], priorita: [], parq: false }, p)); },
    storia: lista => { app.scrivi(g('historyKey()'), lista); },
    programma: p => { app.scrivi(g('progKey()'), p); },
    aggiusti: a => { app.scrivi(g('AGG_KEY()'), a); },
    pianoSalvato: () => app.leggi(g('dataKey()')),   /* il piano della settimana: { 'Lunedì': [esercizio, ...], ... } (loadData) */
    giorniAllenamento: () => app.dati(g("DAYS.filter(d => (loadData()[d] || []).length && !isRestDay(d))")),
    /* una seduta passata: nome, serie [[peso, ripetizioni, fatta, rpe], ...] */
    seduta: (giorniFa, esercizi, extra) => Object.assign({ id: app.giorniFa(giorniFa), day: 'Lunedì', date: g('formatNow()'), minuti: 50, prontezza: 80,
      sessione: esercizi.map(e => ({ name: e.nome, rest: e.rest || 120, sets: e.serie.map(s => ({ weight: s[0], reps: s[1], done: s[2] !== false, wasBerserk: false, rpe: s[3] || null })) })), exercises: [] }, extra || {}),

    /* --- consenso e regole spegnibili --- */
    consenso: si => { store.tz_consenso = si ? 'si' : 'no'; },
    spegni: codici => { store.tz_regole_spente = JSON.stringify(codici); },
    riaccendi: () => { delete store.tz_regole_spente; },

    /* --- fixture: lo stato salvato di un telefono (tests/fixture/programmi-v1/) --- */
    caricaStato: stato => {
      const f = typeof stato === 'string' ? leggiFixture(stato) : stato;
      if (f.riferimento) app.ora(f.riferimento);
      Object.keys(f.chiavi).forEach(k => app.scrivi(k, f.chiavi[k]));
      if (f.modalita) { store.tz_app_mode = f.modalita; vm.runInContext('currentMode = ' + JSON.stringify(f.modalita), ctx); }
      return f;
    },
    /* tutte le chiavi coach_plus_* e tz_* come oggetto (i valori JSON letti): e il formato delle fixture */
    salvaStato: () => {
      const out = {};
      Object.keys(store).sort().filter(k => /^(coach_plus|tz_)/.test(k)).forEach(k => { out[k] = app.leggi(k); });
      return out;
    }
  };
  if (o.fixture) app.fixture = app.caricaStato(o.fixture);
  return app;
}

/* Vettori di prova per i carichi: docs/ricerca-algoritmi-carichi-e-app.md 3.11 e 3.14 (base [C]: calcolati nella nota, non misurati).
   Sono solo DATI: le funzioni arrivano dopo (e1rm e caricoDaE1rm con W1-T3, passo e arrotondamento con W3-T1, tendenza e scarico con
   W3-T5) e i loro test li leggono da qui invece di ricopiare i numeri. Epley: massimale = peso x (1 + ripetizioni / 30), con le
   ripetizioni efficaci = fatte + ripetizioni in riserva (RIR); una serie al cedimento (wasBerserk) ha RIR 0. */
const VETTORI_CARICHI = {
  e1rmStima: [
    { serie: { weight: 80, reps: 8, rpe: 8 }, atteso: 106.7 },
    { serie: { weight: 80, reps: 8 }, rirAssunto: 2, atteso: 106.7 },
    { serie: { weight: 80, reps: 8, wasBerserk: true }, atteso: 101.3 }
  ],
  caricoDaE1rm: [
    { e1rm: 106.7, reps: 5, rir: 2, atteso: 86.5, conPasso: { passo: 2.5, atteso: 87.5 } },
    { da: { weight: 100, reps: 5, rir: 2 }, reps: 12, rir: 2, atteso: 84.1, nota: 'non 90 kg: dodici ripetizioni non si fanno col carico di cinque' }
  ],
  /* stesso esercizio piu volte nella settimana di scarico: il carico e quello di lavoro x dose, uguale in tutte le sedute (MES-06) */
  scaricoPiuSedute: { caricoLavoro: 100, doseCarico: 0.9, atteso: [90, 90, 90], oggiSbagliato: [90, 81, 72.9] },
  /* trend e1RM (Theil-Sen, % a settimana del valore mediano): giorni 0, 4, 8, 12, 17, 21 */
  tendenza: [
    { giorni: [0, 4, 8, 12, 17, 21], e1rm: [100, 101.5, 100.5, 101, 100, 101], pendenzaPctSett: 0.0, esito: 'stallo' },
    { giorni: [0, 4, 8, 12, 17, 21], e1rm: [100, 103, 104.5, 107, 108.5, 111], pendenzaPctSett: 3.3, esito: 'in salita' },
    { giorni: [0, 4, 8, 12, 17, 21], e1rm: [104, 103, 100, 101, 98, 97], pendenzaPctSett: -2.3, esito: 'calo' }
  ],
  /* passo appreso dai carichi usati */
  passo: [{ carichi: [60, 62.5, 65], atteso: 2.5 }, { carichi: [8, 9, 10], atteso: 1 }]
};

function elencoFixture() {
  return fs.readdirSync(CARTELLA_FIXTURE_V1).filter(f => /\.json$/.test(f)).sort().map(f => f.replace(/\.json$/, ''));
}
function leggiFixture(nome) {
  return JSON.parse(fs.readFileSync(path.join(CARTELLA_FIXTURE_V1, nome + '.json'), 'utf8'));
}

module.exports = { caricaApp, elencoFixture, leggiFixture, VETTORI_CARICHI, CARTELLA_FIXTURE_V1, radice: R };
