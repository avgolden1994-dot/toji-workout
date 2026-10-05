/* Atleta virtuale per le prove dei carichi (W2-T8, piano coach v2 D.8 punto 9).
   Non e un test (non finisce in `npm test`): lo usano tests/partenza-donne.test.js e le prove di calibrazione che verranno.

   PERCHE ESISTE: il coach stima un carico di partenza (PAR) e lo corregge con le serie (CAR-18). Per sapere se converge davvero serve una persona che sollevi
   in un modo che il coach NON conosce: la capacita vera dell atleta si estrae dalle àncore delle note di ricerca (ricerca-donne-carichi-iniziali §3.1, §3.2 e
   §3.5: massimale tipico di una persona non allenata in frazione del peso corporeo), mai da PAR (altrimenti la prova misura il coach con il coach).
   Una persona vera si discosta dalla media: capacita = àncora × peso corporeo × (1 + scarto personale), scarto tra -25% e +25% (uniforme: «deviazione ±25%» del
   piano), piu una piccola variazione per esercizio. Le àncore degli esercizi derivati hanno da sole ±25% di incertezza (nota §3.1): sono un campione plausibile, non una misura.

   COME SOLLEVA (modello, tutto dichiarato qui sotto):
   - il massimale in ripetizioni: con un carico w e un massimale E (Epley, come la nota e il coach) si fanno al massimo 30 × (E / w − 1) ripetizioni; la serie k (0, 1, 2) ne ha
     `cadutaSerie` in meno per serie (la fatica tra le serie). Le ripetizioni in riserva (RIR) di una serie = quelle che avrebbe ancora - quelle fatte;
   - una serie e «fatta» alle ripetizioni previste se il massimale di quella serie le permette; altrimenti ne fa meno (mancato) e il RIR e 0;
   - la capacita cresce di `crescita` per esposizione (guadagni neurali dei primi giorni, nota §1.2): il carico giusto sale un po mentre si calibra;
   - l RPE che SEGNA: 10 - RIR vero (con il RIR oltre 10 contato 10), piu un rumore uniforme di ±`rumoreRpe` (le stime del RIR sbagliano di circa 1 ripetizione: Halperin 2022),
     arrotondato a mezzi punti e portato dentro la scala dell app (6-10: 6 = facile, quattro o piu ripetizioni di riserva: la scala di seduta.js). Con probabilita
     `quotaSenzaRpe` (il piano: 30%) in una esposizione non segna nessun RPE;
   - tutto e deterministico dato il `seme` (mulberry32): stessa atleta, stesse serie.
   Uso: const a = atletaVirtuale({ sesso: 'F', livello: 'principiante', pesoCorpo: 65, seme: 7 });
        a.capacita['💪 Chest Press Machine'] -> massimale vero in kg (all esposizione 0)
        const fatto = a.eseguiSeduta([{ nome, weight: 15, reps: 12, sets: 3 }]);   // -> [{ nome, serie: [[peso, rip, fatta, rpe], ...], rirPrima, rirUltima, completa }]
        a.caricoGiusto(nome, 12, 3.5)       // il carico con cui farebbe 12 ripetizioni con 3,5 in riserva, alla capacita di adesso
        a.caricoAlRir(nome, 12, 2.5)        // il massimo con cui ne ha ancora 2,5 (la «capacita» del piano D.8: sopra, la prescrizione e troppo pesante) */
'use strict';

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* Massimale tipico (1RM) di una persona non allenata, in frazione del peso corporeo.
   DONNE: squat 0,62, panca 0,42, stacco 0,73 sono le àncore vere (Symmetric Strength, «non allenata», donna di 130 lb = 59 kg: nota §1.3 e §3.1); gli altri esercizi sono i
   «1RM tipico» della tabella 3.2 della nota (donna di 65 kg), derivati [D] da quelle àncore con rapporti da ordine di grandezza: ognuno ±25%. Divisi per 65 kg.
   UOMINI (nota §3.5): panca 0,56, squat 0,75, stacco 0,86 volte il peso (uomo di 180 lb = 82 kg); gli altri esercizi sono quelli delle donne con il rapporto uomo/donna delle
   tre àncore (parte alta 0,56/0,42, parte bassa 0,75/0,62, stacchi 0,86/0,73). */
const NOMI_PER_PESO = 65;
const ANCORE_DONNE_KG65 = {
  '💪 Panca Piana Bilanciere': 27, '💪 Chest Press Machine': 29, '💪 Panca Piana Manubri': 11, '🏹 Lat Machine': 26, '🏹 Pulley Basso': 29, '🏹 Rematore con Manubrio': 11,
  '🏹 Rematore con Bilanciere': 20, '🛡️ Military Press': 16, '🛡️ Lento Avanti Manubri': 6.5, '🛡️ Alzate Laterali': 4.6, '🦾 Curl Manubri Alternato': 7.5, '🦾 Curl Bilanciere Bicipiti': 12,
  '🦾 Pushdown Tricipiti ai Cavi': 23, '🦵 Squat con Bilanciere': 40, '🦵 Goblet Squat': 12, '🦵 Leg Press': 65, '🦵 Affondi Manubri': 10, '🦵 Leg Extension': 33, '🦵 Leg Curl Sdraiato': 23,
  '🍑 Hip Thrust': 45, '🍑 Stacco Rumeno': 29, '🏹 Stacco da Terra (Deadlift)': 47, '🍑 Abductor Machine': 36
};
/* esercizi della libreria che nella tabella della nota hanno un altro nome, o che le somigliano: stessa àncora */
const SINONIMI_ANCORE = {
  '🦾 Curl su Panca Inclinata': '🦾 Curl Manubri Alternato', '🦵 Leg Curl Seduto': '🦵 Leg Curl Sdraiato', '🛡️ Shoulder Press Machine': '🛡️ Military Press',
  '💪 Panca Inclinata Manubri': '💪 Panca Piana Manubri', '🏹 Rematore con Petto Appoggiato': '🏹 Rematore con Manubrio', '🍑 Hip Thrust alla Macchina': '🍑 Hip Thrust',
  '🍑 Hip Thrust con Manubrio': '🍑 Hip Thrust'
};
/* parte alta / parte bassa / stacchi, per il rapporto uomo/donna */
const PARTE_BASSA = /Squat|Leg |Hip Thrust|Affondi|Abductor|Calf/;
const RAPPORTO_UOMO_DONNA = { alta: 0.56 / 0.42, bassa: 0.75 / 0.62, stacchi: 0.86 / 0.73 };
const SCALA_LIVELLO = { principiante: 1, intermedio: 1.8, avanzato: 2.4 };   /* dal rapporto panca delle donne 0,75 (intermedia) / 0,42 (non allenata), Strength Level: nota §1.3; avanzata 1,10/0,42 limitata */

/* le tre àncore vere (frazione del peso corporeo, donna non allenata: Symmetric Strength, nota §1.3): sono esatte, la tabella in kg e arrotondata */
const ANCORE_VERE_DONNE = { '💪 Panca Piana Bilanciere': 0.42, '🦵 Squat con Bilanciere': 0.62, '🏹 Stacco da Terra (Deadlift)': 0.73 };
function ancora(nome, sesso) {
  const n = SINONIMI_ANCORE[nome] || nome;
  const kg65 = ANCORE_DONNE_KG65[n];
  if (!kg65) return null;
  let r = ANCORE_VERE_DONNE[n] || kg65 / NOMI_PER_PESO;
  if (sesso === 'M') r *= /Stacco/.test(n) ? RAPPORTO_UOMO_DONNA.stacchi : (PARTE_BASSA.test(n) ? RAPPORTO_UOMO_DONNA.bassa : RAPPORTO_UOMO_DONNA.alta);
  return r;
}
const nomiConAncora = () => Object.keys(ANCORE_DONNE_KG65).concat(Object.keys(SINONIMI_ANCORE));

const arrotonda05 = x => Math.round(x * 2) / 2;
const fra = (x, a, b) => Math.max(a, Math.min(b, x));

/* opzioni: sesso 'F'|'M', livello, pesoCorpo (kg), seme, rumoreRpe (default 1), quotaSenzaRpe (0,3), deviazione (0,25), variazioneEsercizio (0,10), crescita (0,015 per esposizione),
   cadutaSerie (1 ripetizione per serie), capacita ({ nome: e1rmVero } per fissarla a mano: salta le àncore per quegli esercizi) */
function atletaVirtuale(opz) {
  const o = Object.assign({ sesso: 'F', livello: 'principiante', pesoCorpo: 65, rumoreRpe: 1, quotaSenzaRpe: 0.3, deviazione: 0.25, variazioneEsercizio: 0.10, crescita: 0.015, cadutaSerie: 1, seme: 1, capacita: {} }, opz || {});
  const rand = mulberry32(Number(o.seme) >>> 0);
  const scarto = (rand() * 2 - 1) * o.deviazione;      /* quanto si discosta dalla persona tipica: una sola volta per atleta */
  const scala = SCALA_LIVELLO[o.livello] || 1;
  const capacita = {};
  const esposizioni = {};                               /* quante volte ha fatto ogni esercizio: la capacita cresce */
  const stima = nome => {
    if (o.capacita[nome] > 0) return o.capacita[nome];
    if (capacita[nome] > 0) return capacita[nome];
    const r = ancora(nome, o.sesso);
    if (!r) return 0;
    const v = r * o.pesoCorpo * scala * (1 + scarto) * (1 + (rand() * 2 - 1) * o.variazioneEsercizio);
    capacita[nome] = v;
    return v;
  };
  /* il massimale di adesso (con la crescita delle esposizioni gia fatte) */
  const massimale = nome => stima(nome) * Math.pow(1 + o.crescita, esposizioni[nome] || 0);
  const maxRipetizioni = (nome, kg) => { const E = massimale(nome); return kg > 0 && E > 0 ? Math.min(60, 30 * (E / kg - 1)) : 0; };
  const carico = (nome, reps, rir) => { const E = massimale(nome); return E > 0 ? E / (1 + (reps + rir) / 30) : 0; };
  const atleta = {
    sesso: o.sesso, livello: o.livello, pesoCorpo: o.pesoCorpo, scarto: scarto, opzioni: o, capacita: capacita,
    haAncora: nome => stima(nome) > 0,
    massimale: massimale,
    maxRipetizioni: maxRipetizioni,
    caricoGiusto: (nome, reps, rir) => carico(nome, reps, rir === undefined ? 3.5 : rir),
    caricoAlRir: (nome, reps, rir) => carico(nome, reps, rir),
    /* voci: [{ nome, weight, reps, sets }] -> per ognuna le serie [peso, ripetizioni, fatta, rpe] e le ripetizioni in riserva (prima e ultima serie) */
    eseguiSeduta: (voci) => voci.map(v => {
      const senzaRpe = rand() < o.quotaSenzaRpe;
      const max = maxRipetizioni(v.nome, v.weight);
      const serie = [];
      let rirPrima = null, rirUltima = null, completa = true;
      for (let k = 0; k < (v.sets || 3); k++) {
        const maxK = max - o.cadutaSerie * k;
        const possibili = Math.floor(maxK + 1e-9);
        const fatte = Math.max(0, Math.min(v.reps, possibili));
        const rir = Math.max(0, maxK - fatte);
        if (fatte < v.reps) completa = false;
        if (k === 0) rirPrima = maxK - v.reps;
        rirUltima = maxK - v.reps;
        const vero = 10 - Math.min(rir, 10);
        const segnato = senzaRpe ? null : fra(arrotonda05(vero + (rand() * 2 - 1) * o.rumoreRpe), 6, 10);
        serie.push([v.weight, fatte, fatte > 0, segnato]);
      }
      esposizioni[v.nome] = (esposizioni[v.nome] || 0) + 1;
      return { nome: v.nome, serie: serie, rirPrima: rirPrima, rirUltima: rirUltima, completa: completa, senzaRpe: senzaRpe };
    })
  };
  return atleta;
}

/* ---------------------------------------------------------------------------------------------------------------------------------
   L atleta DENTRO L APP VERA (tests/aiuto-app.js): stima di partenza (stimaCaricoIniziale), piano con il segno `stimato`, caricoProssimo di ogni seduta (cioe tutta la
   catena: progressione, CAR-18, aggiusti, RIC, INT), la seduta che l atleta svolge e il suo storico, esposizione dopo esposizione, ogni tre giorni.
   opz: sesso 'F'|'M', livello, pesoCorpo, seme, esercizi (nomi della libreria con una àncora), esposizioni (6), rumoreRpe, quotaSenzaRpe, senzaCar18 (toglie la fase 15:
   serve a confrontare con la sola progressione di prima). Ritorna { atleta, nomi, reg: { nome: { start, esp: [{ w, tipo, motivo, giusto, cap, cap0, rirPrima, completa }] } } }.
   `giusto` = il carico con cui farebbe le ripetizioni con 3,5 in riserva (il RIR bersaglio dei principianti), `cap` = il massimo con cui ne ha ancora (RIR bersaglio della seduta - 1)
   (la «capacita al RIR bersaglio - 1» di D.8.9), `cap0` = il massimo con cui finisce le ripetizioni (RIR 0). Una prescrizione sopra `cap` e piu pesante del bersaglio di oltre un RIR. */
const CONTROLLO = ['💪 Chest Press Machine', '🏹 Lat Machine', '🦵 Leg Press', '🦵 Squat con Bilanciere', '🦵 Goblet Squat', '🏹 Rematore con Manubrio'];
const GIORNI_PIANO = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì'];
function simulaNellApp(app, opz) {
  const o = Object.assign({ sesso: 'F', livello: 'principiante', pesoCorpo: 65, seme: 1, esercizi: CONTROLLO, esposizioni: 6, rumoreRpe: 1, quotaSenzaRpe: 0.3, senzaCar18: false }, opz || {});
  const atleta = atletaVirtuale({ sesso: o.sesso, livello: o.livello, pesoCorpo: o.pesoCorpo, seme: o.seme, rumoreRpe: o.rumoreRpe, quotaSenzaRpe: o.quotaSenzaRpe });
  Object.keys(app.store).forEach(k => delete app.store[k]);
  app.consenso(true);
  if (o.senzaCar18) app.g('FASI_PUNTI.carico = FASI_PUNTI.carico.filter(f => f.codice !== "CAR-18")');
  app.profilo({ level: o.livello, sex: o.sesso, age: 30, weight: o.pesoCorpo, goals: ['massa'] });
  const nomi = o.esercizi.filter(n => atleta.haAncora(n));
  const ctxCorpo = 'contestoCarichi({ sex: ' + JSON.stringify(o.sesso) + ', level: ' + JSON.stringify(o.livello) + ', age: 30, weight: ' + o.pesoCorpo + ' }, {})';
  const reg = {}, dati = {};
  nomi.forEach((n, i) => {
    const s = app.g('(() => { const c = ' + ctxCorpo + '; c.storico = null; return stimaCaricoIniziale(' + JSON.stringify(n) + ', c); })()');
    const m = app.json('findExercise(' + JSON.stringify(n) + ')');
    reg[n] = { start: s.peso, base: s.peso, reps: m.reps, sets: 3, esp: [] };
    (dati[GIORNI_PIANO[i % 4]] = dati[GIORNI_PIANO[i % 4]] || []).push({ name: n, sets: 3, reps: m.reps, weight: s.peso, rest: 90, stimato: s.fonte });
  });
  app.scrivi(app.chiave('dataKey'), dati);
  const storia = [], T0 = Date.parse('2026-10-05T10:00:00');
  for (let t = 0; t < o.esposizioni; t++) {
    app.ora(T0 + t * 3 * 86400000);
    const voci = nomi.map(n => ({ n: n, r: app.dati(app.chiama('caricoProssimo', n, reg[n].base, reg[n].reps, reg[n].sets)), rir: app.json('rirBersaglio(' + JSON.stringify(n) + ')') }));
    const prima = voci.map(v => ({ giusto: atleta.caricoGiusto(v.n, reg[v.n].reps, 3.5), cap: atleta.caricoAlRir(v.n, reg[v.n].reps, (v.rir[0] + v.rir[1]) / 2 - 1), cap0: atleta.caricoAlRir(v.n, reg[v.n].reps, 0) }));
    const fatte = atleta.eseguiSeduta(voci.map(v => ({ nome: v.n, weight: v.r.weight, reps: v.r.reps, sets: v.r.sets })));
    fatte.forEach((f, i) => reg[voci[i].n].esp.push({ w: voci[i].r.weight, tipo: voci[i].r.tipo, motivo: voci[i].r.motivo, giusto: prima[i].giusto, cap: prima[i].cap, cap0: prima[i].cap0,
      rirPrima: f.rirPrima, completa: f.completa, senzaRpe: f.senzaRpe }));
    storia.unshift({ id: app.ora(), day: 'Lunedì', date: app.g('formatNow()'), minuti: 50, prontezza: 80, exercises: [],
      sessione: fatte.map((f, i) => ({ name: f.nome, rest: 90, sets: f.serie.map(x => ({ weight: x[0], reps: x[1], done: x[2], wasBerserk: false, rpe: x[3] })),
        obiettivo: { reps: voci[i].r.reps, sets: voci[i].r.sets, rir: voci[i].rir, coachTipo: voci[i].r.tipo } })) });
    app.storia(storia);
  }
  return { atleta: atleta, nomi: nomi, reg: reg };
}
/* il riassunto di D.8.9 su tante atlete: `risultati` = elenco di simulaNellApp(...). Esposizioni per arrivare entro ±10% del carico giusto (99 = mai nelle esposizioni
   simulate), prescrizioni sopra la capacita al RIR bersaglio - 1 (`sopra`) e oltre il massimo, cioe che non finisce le ripetizioni (`oltre`): la prima esposizione a parte
   (e il carico di partenza, deciso dalla tabella) e dalla seconda in poi (quelle che decide il coach) */
function riassunto(risultati) {
  const esp = [], q = { primo: { sopra: 0, oltre: 0, n: 0 }, dopo: { sopra: 0, oltre: 0, n: 0 } };
  risultati.forEach(r => r.nomi.forEach(n => {
    let arrivo = null;
    r.reg[n].esp.forEach((e, t) => {
      if (arrivo === null && Math.abs(e.w / e.giusto - 1) <= 0.10) arrivo = t + 1;
      if (t < 5) { const k = t === 0 ? q.primo : q.dopo; k.n++; if (e.w > e.cap + 1e-9) k.sopra++; if (e.w > e.cap0 + 1e-9) k.oltre++; }
    });
    esp.push(arrivo === null ? 99 : arrivo);
  }));
  esp.sort((a, b) => a - b);
  const pc = x => Math.round(1000 * x) / 10;
  return { n: esp.length, mediana: esp[Math.floor(esp.length / 2)], p95: esp[Math.floor(esp.length * 0.95)], mai: esp.filter(x => x === 99).length / esp.length,
    primoSopra: q.primo.sopra / q.primo.n, primoOltre: q.primo.oltre / q.primo.n, dopoSopra: q.dopo.sopra / q.dopo.n, dopoOltre: q.dopo.oltre / q.dopo.n, pc: pc };
}

module.exports = { atletaVirtuale, ancora, nomiConAncora, ANCORE_DONNE_KG65, SINONIMI_ANCORE, RAPPORTO_UOMO_DONNA, SCALA_LIVELLO, mulberry32, simulaNellApp, riassunto, CONTROLLO };
