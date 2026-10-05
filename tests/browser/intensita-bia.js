/* Intensita dal corpo e dalle prime sedute (INT-01..05): la BIA decide la prudenza iniziale,
   le prime due sedute tarano l esigenza. Le soglie sono quelle di docs/ricerca-struttura-e-intensita.md. */
const { chromium } = require('playwright-core');
let problemi = 0;
const ok = (c, m) => { console.log((c ? '  ok  ' : '  MALE ') + m); if (!c) problemi++; };
(async () => {
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const p = await (await b.newContext({ serviceWorkers: 'block' })).newPage(); const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.addInitScript(() => { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'si'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); localStorage.setItem('tz_lingua', 'it'); });
await p.goto(require('url').pathToFileURL(require('path').join(__dirname, '..', '..', 'index.html')).href); await p.waitForTimeout(900);

const r = await p.evaluate(() => {
  const out = {};
  const sb = (bia, sex, age) => { const s = statoBia({ bia: bia, sex: sex, age: age }, {}); return { livello: s.livello, faBassa: s.faBassa, faMoltoBassa: s.faMoltoBassa, ecwAlto: s.ecwAlto, ecwLimite: s.ecwLimite, esig: esigenzaIniziale({ bia: bia, sex: sex, age: age }, {}), testi: s.testi.length, rapporto: s.rapporto, fa: s.fa };
  };
  out.nessuna = sb(null, 'M', 30);
  out.normale = sb({ phase: 8.0, ecw: 16, tbw: 42 }, 'M', 28);
  out.faBassa = sb({ phase: 5.9, ecw: 16, tbw: 42 }, 'M', 30);
  out.ecwAlto = sb({ phase: 7.9, ecw: 17.2, tbw: 42 }, 'M', 30);
  out.due = sb({ phase: 5.9, ecw: 17.2, tbw: 42 }, 'M', 30);
  out.moltoBassa = sb({ phase: 3.9, ecw: 16, tbw: 42 }, 'M', 30);
  out.limite = sb({ phase: 7.9, ecw: 16.4, tbw: 42 }, 'M', 30);
  out.donnaOk = sb({ phase: 6.1, ecw: 14, tbw: 36 }, 'F', 30);
  out.donnaBassa = sb({ phase: 4.8, ecw: 14, tbw: 36 }, 'F', 30);
  out.over70 = sb({ phase: 5.9, ecw: 16, tbw: 42 }, 'M', 72);
  out.fuoriScala = sb({ phase: 20, ecw: 5, tbw: 40 }, 'M', 30);
  /* la scheda: stessi dati, con o senza bandiere */
  const prog = (bia) => buildProgram({ sex: 'M', age: 30, seme: 'int', fastidi: [], sonno: 'bene', attrezzi: 'indifferente', usaProfilo: false, level: 'intermedio', days: 4, goals: ['massa'], luogo: 'palestra', minutes: 60, bia: bia });
  const serie = (pr) => pr.sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => a + e.sets, 0), 0);
  const norm = prog({ phase: 8.0, ecw: 16, tbw: 42 }), due = prog({ phase: 5.9, ecw: 17.2, tbw: 42 }), senza = prog(undefined);
  out.serieNorm = serie(norm); out.serieDue = serie(due); out.serieSenza = serie(senza);
  out.esigNorm = norm.note.some(x => /Coach esigente/.test(x)); out.esigDue = due.note.some(x => /Coach esigente/.test(x));
  out.noteDue = due.note.filter(x => /Angolo di fase|extracellulare|ripetizione in riserva in più/.test(x)).length;
  out.noteNorm = norm.note.filter(x => /Angolo di fase|extracellulare/.test(x)).length;

  /* RIR bersaglio: INT-03 (due bandiere) e INT-04 (prima volta) */
  const nome = '💪 Panca Piana Bilanciere';
  const profilo = (o) => localStorage.setItem(PROFILE_KEY(), JSON.stringify(Object.assign({ level: 'intermedio', age: 30, sex: 'M', goals: ['massa'] }, o)));
  const sess = (sets, giorniFa) => ({ id: Date.now() - giorniFa * 86400000, day: 'Lunedì', date: formatNow(), minuti: 50, prontezza: 80, sessione: [{ name: nome, rest: 120, sets: sets }], exercises: [] });
  const S = (w, reps, done, rpe) => ({ weight: w, reps: reps, done: done, rpe: rpe });
  profilo(); saveHistory([]);
  out.rirPrima = rirBersaglio(nome);
  saveHistory([sess([S(60, 8, true, 8), S(60, 8, true, 8), S(60, 8, true, 8)], 3)]);
  out.rirDopo = rirBersaglio(nome);
  profilo({ bia: { phase: 5.9, ecw: 17.2, tbw: 42 } });
  out.rirDue = rirBersaglio(nome);
  profilo({ bia: { phase: 5.9, ecw: 16, tbw: 42 } });
  out.rirUna = rirBersaglio(nome);
  profilo(); saveHistory([]);
  const c4 = caricoProssimo(nome, 40, 8, 4); out.c4 = { sets: c4.sets, tipo: c4.tipo, motivo: c4.motivo };
  out.c3 = caricoProssimo(nome, 40, 8, 3).sets; out.c2 = caricoProssimo(nome, 40, 8, 2).sets;
  out.tempo = caricoProssimo('🎯 Plank', 0, 30, 3).sets;
  localStorage.setItem(REGOLE_SPENTE_KEY, JSON.stringify(['INT-04'])); out.spenta = caricoProssimo(nome, 40, 8, 4).sets; out.rirSpenta = rirBersaglio(nome); localStorage.removeItem(REGOLE_SPENTE_KEY);
  saveHistory([sess([S(60, 8, true, 8)], 3)]); out.dopoUna = caricoProssimo(nome, 60, 8, 4).sets;
  return out;
});
console.log('INT-01 e INT-02: la BIA decide la prudenza iniziale');
ok(r.nessuna.livello === 0 && r.nessuna.esig === 1.2, 'senza BIA: nessuna bandiera, esigenza 120%');
ok(r.normale.livello === 0 && r.normale.esig === 1.2 && r.normale.testi === 0, 'angolo 8,0 e ECW/TBW 0,38: nessuna bandiera, 120%');
ok(r.faBassa.faBassa && !r.faBassa.faMoltoBassa && r.faBassa.livello === 1 && r.faBassa.esig === 1.0, 'angolo 5,9 a 30 anni (media 8,0): una bandiera, 100%');
ok(r.ecwAlto.ecwAlto && r.ecwAlto.livello === 1 && r.ecwAlto.esig === 1.0 && Math.abs(r.ecwAlto.rapporto - 0.41) < 0.01, 'ECW/TBW 0,41: una bandiera, 100%');
ok(r.due.livello === 2 && r.due.esig === 0.95 && r.due.testi === 3, 'angolo basso e ECW alto: due bandiere, 95%, tre note');
ok(r.moltoBassa.faMoltoBassa && r.moltoBassa.livello === 2, 'angolo sotto 5,04 (uomo): molto basso, due bandiere');
ok(r.limite.ecwLimite && !r.limite.ecwAlto && r.limite.livello === 0 && r.limite.testi === 1, 'ECW/TBW 0,39: solo una nota sul modo di misurare');
ok(!r.donnaOk.faBassa && r.donnaBassa.faBassa && !r.donnaBassa.faMoltoBassa, 'donna di 30 anni: 6,1 va bene (media 6,9), 4,8 e basso ma non molto basso (soglia 4,20)');
ok(!r.over70.faBassa, 'a 72 anni 5,9 e nella norma (la media scende con l eta)');
ok(r.fuoriScala.livello === 0 && r.fuoriScala.fa === null && r.fuoriScala.rapporto === null, 'valori fuori scala (angolo 20, rapporto 0,12): ignorati come errori di lettura');

console.log('Nella scheda');
ok(r.serieDue <= r.serieNorm && r.serieNorm === r.serieSenza, 'serie settimanali: con due bandiere ' + r.serieDue + ' contro ' + r.serieNorm + ' (nessun dato: ' + r.serieSenza + ')');
ok(r.esigNorm && !r.esigDue, 'senza bandiere la nota "Coach esigente", con due bandiere no');
ok(r.noteDue === 3 && r.noteNorm === 0, 'le note sulla BIA compaiono solo con le bandiere (' + r.noteDue + ' e ' + r.noteNorm + ')');

console.log('INT-03 e INT-04: ripetizioni in riserva');
ok(JSON.stringify(r.rirPrima) === '[2,4]' && JSON.stringify(r.rirDopo) === '[1,3]', 'bilanciere pesante: la prima volta 2-4 ripetizioni in riserva, dopo la prima seduta 1-3 (' + r.rirPrima + ' poi ' + r.rirDopo + ')');
ok(JSON.stringify(r.rirDue) === '[2,4]' && JSON.stringify(r.rirUna) === '[1,3]', 'con due bandiere +1 anche con lo storico (' + r.rirDue + '), con una no (' + r.rirUna + ')');
ok(r.c4.sets === 3 && r.c4.tipo === 'nuovo' && /prima volta/.test(r.c4.motivo), 'prima volta: da 4 a 3 serie, con il motivo (' + r.c4.motivo + ')');
ok(r.c3 === 2 && r.c2 === 2, 'prima volta: da 3 a 2 serie, mai sotto 2');
ok(r.tempo === 3, 'gli esercizi a tempo non cambiano');
ok(r.spenta === 4 && JSON.stringify(r.rirSpenta) === '[1,3]', 'INT-04 spenta (solo quella): serie e ripetizioni in riserva come prima... ' + r.spenta + ' ' + r.rirSpenta);
ok(r.dopoUna === 4, 'dalla seconda seduta torna il programma intero (' + r.dopoUna + ' serie)');

/* INT-05: il bilancio delle prime due sedute */
const q = await p.evaluate(() => {
  const out = {};
  const nome = '💪 Panca Piana Bilanciere';
  const S = (w, reps, done, rpe) => ({ weight: w, reps: reps, done: done, rpe: rpe });
  const lun = lunediDi(new Date()), lunS = ymd(lun);
  const profilo = (o) => localStorage.setItem(PROFILE_KEY(), JSON.stringify(Object.assign({ level: 'intermedio', age: 30, sex: 'M', goals: ['massa'], esigenza: { valore: 1.2, sett: lunS, storia: [] } }, o)));
  /* il programma e iniziato 14 giorni fa: le due sedute di prova (1 ora e 30 ore fa) ne fanno sempre parte.
     Con inizio = lunedi di questa settimana la prova falliva dal lunedi alle 00:00 al martedi alle 06:00 (la seduta di 30 ore fa
     cadeva prima dell inizio del programma): bilancioPrimeSedute() vedeva una seduta sola e non decideva. Il codice era giusto. */
  const programma = (creato) => localStorage.setItem(progKey(), JSON.stringify({ creato: creato || 'A', inizio: ymd(piuGiorni(lun, -14)), settimane: 12, fasi: Array(12).fill('carico') }));
  const sess = (sets, pront, ore) => ({ id: Date.now() - (ore || 0) * 3600000, day: 'Lunedì', date: formatNow(), minuti: 50, prontezza: pront, sessione: [{ name: nome, rest: 120, sets: sets }], exercises: [] });
  const set = (rpe, fatte) => [S(60, 8, fatte >= 1, rpe), S(60, 8, fatte >= 2, rpe), S(60, 8, fatte >= 3, rpe), S(60, 8, fatte >= 4, rpe)];
  const prova = (nomeProva, sedute, o) => { profilo(o); programma('P-' + nomeProva); saveHistory(sedute); const res = bilancioPrimeSedute(); const pf = getProfile(); out[nomeProva] = { res: res, valore: pf.esigenza.valore, storia: (pf.esigenza.storia || []).slice(-1)[0] }; };
  out.bersaglio = rpeBersaglio(nome);
  prova('facile', [sess(set(6, 4), 80, 1), sess(set(6, 4), 80, 30)]);
  prova('dura', [sess(set(9.5, 4), 80, 1), sess(set(9.5, 4), 80, 30)]);
  prova('incomplete', [sess(set(8, 2), 80, 1), sess(set(8, 2), 80, 30)]);
  prova('giusta', [sess(set(8, 4), 80, 1), sess(set(8, 4), 80, 30)]);
  prova('poca', [sess(set(8, 4), 40, 1), sess(set(8, 4), 40, 30)]);
  prova('unaSola', [sess(set(6, 4), 80, 1)]);
  prova('cauto', [sess(set(6, 4), 80, 1), sess(set(6, 4), 80, 30)], { parq: true });
  /* una volta per programma */
  profilo(); programma('X'); saveHistory([sess(set(6, 4), 80, 1), sess(set(6, 4), 80, 30)]);
  const prima = bilancioPrimeSedute(), seconda = bilancioPrimeSedute();
  out.unaVolta = { prima: !!prima, seconda: seconda === null, valore: getProfile().esigenza.valore };
  programma('Y'); out.nuovoProgramma = !!bilancioPrimeSedute();
  /* senza consenso il coach non usa i dati */
  localStorage.setItem('tz_consenso', 'no'); profilo(); programma('Z'); out.noConsenso = bilancioPrimeSedute() === null; localStorage.setItem('tz_consenso', 'si');
  /* la correzione del lunedi non conta due volte lo sforzo (ESI-02) */
  const settPrima = ymd(piuGiorni(lun, -14)), venerdi = piuGiorni(lun, -3).getTime() + 12 * 3600000;
  const sedSett = (k) => ({ id: venerdi - k * 3600000, day: 'Venerdì', date: formatNow(), minuti: 50, prontezza: 80, sessione: [{ name: nome, rest: 120, sets: set(6, 4) }], exercises: [] });
  const settimana = (calibrata) => {
    profilo({ days: 3, esigenza: { valore: 1.2, sett: settPrima, storia: [], calibrata: calibrata } });
    localStorage.setItem(progKey(), JSON.stringify({ creato: 'W', inizio: ymd(piuGiorni(lun, -14)), settimane: 12, fasi: Array(12).fill('carico') }));
    saveHistory([sedSett(0), sedSett(24), sedSett(48)]);
    aggiornaEsigenza();
    return getProfile().esigenza.valore;
  };
  out.lunediSenza = settimana(undefined);
  out.lunediGia = settimana(ymd(piuGiorni(lun, -3)));
  return out;
});
console.log('INT-05: bilancio delle prime due sedute');
ok(q.bersaglio === 8, 'bersaglio dello sforzo del bilanciere pesante: RPE 8');
ok(q.facile.res && q.facile.res.esito === 'bassa' && q.facile.valore === 1.3, 'serie tutte fatte con RPE 6 (bersaglio 8): intensita troppo bassa, esigenza da 120% a 130% (' + q.facile.valore + ')');
ok(q.dura.res && q.dura.res.esito === 'alta' && q.dura.valore === 1.1, 'RPE 9,5: troppo dura, esigenza a 110% (' + q.dura.valore + ')');
ok(q.incomplete.res && q.incomplete.res.esito === 'alta' && q.incomplete.res.completamento === 50 && q.incomplete.valore === 1.1, 'solo meta delle serie fatte: troppo dura, 110% (' + q.incomplete.valore + ')');
ok(q.giusta.res && q.giusta.res.esito === 'giusta' && q.giusta.valore === 1.2, 'RPE come il bersaglio: resta al 120%');
ok(q.poca.res && q.poca.valore === 1.15, 'prontezza 40 nelle due sedute: -5 punti (' + q.poca.valore + ')');
ok(q.unaSola.res === null && q.unaSola.valore === 1.2, 'con una sola seduta non decide ancora');
ok(q.cauto.res === null && q.cauto.valore === 1.2, 'modalita prudente (PAR-Q): esigenza ferma');
ok(q.facile.storia && /serie facili/.test(q.facile.storia.motivi[0]), 'il motivo e nella storia dell esigenza: ' + (q.facile.storia && q.facile.storia.motivi[0]));
ok(q.unaVolta.prima && q.unaVolta.seconda && q.unaVolta.valore === 1.3, 'una volta sola per programma');
ok(q.nuovoProgramma, 'un programma nuovo ha le sue prime due sedute');
ok(q.noConsenso, 'senza consenso ai dati il coach non valuta');
ok(q.lunediSenza === 1.25 && q.lunediGia === 1.2, 'il lunedi lo sforzo della settimana gia tarata non si conta due volte (' + q.lunediSenza + ' contro ' + q.lunediGia + ')');

ok(errs.length === 0, 'nessun errore di pagina ' + errs);
await b.close();
console.log(problemi ? 'PROBLEMI: ' + problemi : 'tutto ok');
process.exit(problemi ? 1 : 0);
})();
