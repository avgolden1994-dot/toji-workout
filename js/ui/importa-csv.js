/* Importazione CSV di altre app
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ============ 3. IMPORT CSV DA STRONG, HEVY, FITNOTES ============ */
function leggiCSV(testo) {
  testo = String(testo).replace(/^﻿/, '');
  const prima = testo.split(/\r?\n/)[0] || '';
  const conta = (c) => prima.split(c).length;
  const sep = conta(';') > conta(',') ? ';' : (conta('\t') > conta(',') ? '\t' : ',');
  const righe = [];
  let riga = [], campo = '', q = false;
  for (let i = 0; i < testo.length; i++) {
    const c = testo[i];
    if (q) {
      if (c === '"') { if (testo[i + 1] === '"') { campo += '"'; i++; } else q = false; }
      else campo += c;
    } else if (c === '"') q = true;
    else if (c === sep) { riga.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && testo[i + 1] === '\n') i++;
      riga.push(campo); campo = '';
      if (riga.length > 1 || riga[0] !== '') righe.push(riga);
      riga = [];
    } else campo += c;
  }
  if (campo !== '' || riga.length) { riga.push(campo); righe.push(riga); }
  return righe;
}
const MESI_EN = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
function dataDaCSV(s) {
  s = String(s || '').trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
  if (m) return new Date(+m[1], m[2] - 1, +m[3], +(m[4] || 12), +(m[5] || 0));
  m = s.match(/^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4}),? (\d{1,2}):(\d{2})/);
  if (m && MESI_EN[m[2].toLowerCase()] !== undefined) return new Date(+m[3], MESI_EN[m[2].toLowerCase()], +m[1], +m[4], +m[5]);
  m = s.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})(?:,? (\d{1,2}):(\d{2}))?/);
  if (m) return new Date(+m[3], m[2] - 1, +m[1], +(m[4] || 12), +(m[5] || 0));
  const t = Date.parse(s);
  return isNaN(t) ? null : new Date(t);
}
function numeroCSV(v) { const n = parseFloat(String(v || '').replace(',', '.')); return isNaN(n) ? 0 : n; }
function secondiCSV(v) {
  const s = String(v || '').trim();
  const m = s.match(/^(\d+):(\d{2})(?::(\d{2}))?$/);
  if (m) return m[3] !== undefined ? (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) : (+m[1]) * 60 + (+m[2]);
  return Math.round(numeroCSV(s));
}
/* nomi inglesi delle altre app -> i nostri (se non c e, resta il nome originale) */
const ALIAS_ESTERI = [
  [/incline.*(dumbbell)|dumbbell.*incline/i, 'Panca Inclinata Manubri'],
  [/incline bench/i, 'Panca Inclinata Bilanciere'],
  [/decline bench/i, 'Panca Declinata'],
  [/close.?grip bench/i, 'Panca Presa Stretta'],
  [/bench press.*dumbbell|dumbbell bench/i, 'Panca Piana Manubri'],
  [/bench press/i, 'Panca Piana Bilanciere'],
  [/chest press/i, 'Chest Press Machine'],
  [/pec deck|butterfly|chest fly.*machine/i, 'Pectoral Machine (Butterfly)'],
  [/reverse (fly|pec)|rear delt/i, 'Reverse Pec Deck'],
  [/cable (fly|crossover)|chest fly/i, 'Croci ai Cavi'],
  [/dumbbell fly/i, 'Croci su Panca Manubri'],
  [/chest dip|^dips?\b|triceps dip/i, 'Dip alle Parallele'],
  [/push.?up/i, 'Piegamenti a Terra (Push-up)'],
  [/romanian|rdl|stiff.?leg/i, 'Stacco Rumeno'],
  [/sumo deadlift/i, 'Stacco Sumo'],
  [/trap bar|hex bar/i, 'Stacco con Trap Bar'],
  [/deadlift/i, 'Stacco da Terra (Deadlift)'],
  [/assisted pull.?up|assisted chin/i, 'Trazioni Assistite (Macchina)'],
  [/chin.?up/i, 'Trazioni Presa Inversa (Chin-up)'],
  [/pull.?up/i, 'Trazioni alla Sbarra (Pull-ups)'],
  [/single arm lat|one arm lat/i, 'Lat Machine a un Braccio'],
  [/lat pulldown|pulldown/i, 'Lat Machine'],
  [/straight.?arm/i, 'Pulldown a Braccia Tese'],
  [/chest.?supported/i, 'Rematore con Petto Appoggiato'],
  [/t.?bar/i, 'T-Bar Row'],
  [/seated (cable )?row|cable row/i, 'Pulley Basso'],
  [/inverted row/i, 'Rematore Inverso (Corpo Libero)'],
  [/dumbbell row|one arm row|single arm row/i, 'Rematore con Manubrio'],
  [/machine row/i, 'Rematore alla Macchina'],
  [/bent over row|barbell row|pendlay/i, 'Rematore con Bilanciere'],
  [/front squat/i, 'Front Squat'],
  [/goblet/i, 'Goblet Squat'],
  [/hack squat/i, 'Hack Squat'],
  [/pendulum/i, 'Pendulum Squat'],
  [/smith.*squat/i, 'Squat al Multipower'],
  [/bulgarian|split squat/i, 'Affondi Bulgari'],
  [/walking lunge/i, 'Affondi in Camminata'],
  [/reverse lunge/i, 'Affondi Inversi'],
  [/lunge/i, 'Affondi Manubri'],
  [/step.?up/i, 'Step-up su Panca'],
  [/air squat|bodyweight squat/i, 'Squat a Corpo Libero'],
  [/squat/i, 'Squat con Bilanciere'],
  [/calf press/i, 'Calf Raise alla Leg Press'],
  [/leg press/i, 'Leg Press'],
  [/leg extension/i, 'Leg Extension'],
  [/seated leg curl/i, 'Leg Curl Seduto'],
  [/leg curl|hamstring curl/i, 'Leg Curl Sdraiato'],
  [/nordic/i, 'Nordic Curl'],
  [/seated calf/i, 'Calf Raise Seduto'],
  [/calf raise/i, 'Calf Raise in Piedi'],
  [/hip thrust.*machine/i, 'Hip Thrust alla Macchina'],
  [/hip thrust/i, 'Hip Thrust'],
  [/single leg glute bridge/i, 'Ponte Glutei a una Gamba'],
  [/glute bridge/i, 'Ponte Glutei'],
  [/hip abduct/i, 'Abductor Machine'],
  [/good morning/i, 'Good Morning'],
  [/back extension|hyperextension/i, 'Hyperextension (Lombari)'],
  [/pull.?through/i, 'Pull-Through ai Cavi'],
  [/arnold/i, 'Arnold Press'],
  [/landmine/i, 'Landmine Press'],
  [/seated.*(dumbbell).*press|dumbbell shoulder press/i, 'Lento Avanti Manubri'],
  [/shoulder press.*machine|machine shoulder/i, 'Shoulder Press Machine'],
  [/overhead press|military|shoulder press/i, 'Military Press'],
  [/cable lateral/i, 'Alzate Laterali ai Cavi'],
  [/lateral raise/i, 'Alzate Laterali'],
  [/front raise/i, 'Alzate Frontali'],
  [/face pull/i, 'Face Pull'],
  [/upright row/i, 'Tirate al Mento (Upright Row)'],
  [/shrug/i, 'Scrollate (Shrug)'],
  [/ez.?bar curl/i, 'Curl con Bilanciere EZ'],
  [/preacher/i, 'Curl su Panca Scott'],
  [/incline.*curl/i, 'Curl su Panca Inclinata'],
  [/bayesian/i, 'Curl Bayesiano ai Cavi'],
  [/spider/i, 'Spider Curl'],
  [/hammer/i, 'Hammer Curl'],
  [/concentration/i, 'Curl di Concentrazione'],
  [/cable curl/i, 'Curl ai Cavi'],
  [/dumbbell curl|alternating/i, 'Curl Manubri Alternato'],
  [/barbell curl|^bicep curl|^biceps curl/i, 'Curl Bilanciere Bicipiti'],
  [/rope pushdown|rope.*extension/i, 'Pushdown con Corda'],
  [/pushdown|push.?down/i, 'Pushdown Tricipiti ai Cavi'],
  [/overhead.*(cable|rope).*ext|cable overhead/i, 'Estensione Tricipiti sopra la Testa ai Cavi'],
  [/overhead.*ext/i, 'Estensione Tricipiti sopra la Testa con Manubrio'],
  [/skull|lying triceps/i, 'French Press'],
  [/kickback/i, 'Kickback Tricipiti'],
  [/side plank/i, 'Plank Laterale'],
  [/plank/i, 'Plank'],
  [/cable crunch/i, 'Crunch al Cavo'],
  [/crunch|sit.?up/i, 'Crunch a Terra'],
  [/hanging leg raise|hanging knee/i, 'Leg Raise alla Sbarra'],
  [/leg raise/i, 'Leg Raise a Terra'],
  [/russian twist/i, 'Russian Twist'],
  [/ab wheel|rollout/i, 'Ab Wheel'],
  [/pallof/i, 'Pallof Press'],
  [/dead bug/i, 'Dead Bug'],
  [/bird dog/i, 'Bird Dog'],
  [/farmer/i, 'Farmer Walk'],
  [/wall sit/i, 'Wall Sit'],
  [/mountain climber/i, 'Mountain Climber'],
  [/hollow/i, 'Hollow Hold']
];
function nomeDaEstero(n) {
  const pulito = String(n || '').trim();
  const nostro = nomeInLibreria(pulito);
  if (nostro) return nostro;
  const a = ALIAS_ESTERI.find(x => x[0].test(pulito));
  return (a && nomeInLibreria(a[1])) || nomeSicuro(pulito);
}
function leggiExport(testo) {
  const righe = leggiCSV(testo);
  if (righe.length < 2) return { errore: 'Il file è vuoto o non è un CSV' };
  const testa = righe[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const col = (rx) => testa.findIndex(h => rx.test(h));
  const c = {
    data: col(/^(date|start_time|data|datum|fecha|workout date)$/i), titolo: col(/^(workout name|title|workout)$/i),
    es: col(/^(exercise name|exercise_title|exercise|esercizio)$/i), kg: col(/^(weight_kg|weight \(kg\)|weight|peso|kg)$/i),
    lb: col(/^(weight_lbs|weight \(lbs?\)|lbs)$/i), unita: col(/^(weight unit|unit|units)$/i), reps: col(/^(reps|repetitions|ripetizioni)$/i),
    sec: col(/^(seconds|duration_seconds|time)$/i), tipo: col(/^(set_type|set type)$/i), rpe: col(/^rpe$/i)
  };
  if (c.data === -1 || c.es === -1) return { errore: 'Non trovo le colonne della data e dell esercizio' };
  const origine = testa.indexOf('exercise_title') !== -1 ? 'Hevy' : (testa.indexOf('Set Order') !== -1 ? 'Strong' : (testa.indexOf('Category') !== -1 ? 'FitNotes' : 'CSV'));
  const sedute = {};
  let riconosciuti = {}, sconosciuti = {}, scartate = 0;
  righe.slice(1).forEach(r => {
    const d = dataDaCSV(r[c.data]);
    const nome0 = (r[c.es] || '').trim();
    if (!d || !nome0) { scartate++; return; }
    const tipoSet = c.tipo !== -1 ? String(r[c.tipo] || '').toLowerCase() : '';
    if (/warm/.test(tipoSet)) return;   /* i riscaldamenti non contano */
    let kg = c.kg !== -1 ? numeroCSV(r[c.kg]) : 0;
    if (c.lb !== -1 && !kg) kg = numeroCSV(r[c.lb]) * 0.45359;
    if (c.unita !== -1 && /lb/i.test(r[c.unita] || '')) kg = kg * 0.45359;
    kg = Math.round(kg * 4) / 4;
    const secondi = c.sec !== -1 ? secondiCSV(r[c.sec]) : 0;
    let reps = c.reps !== -1 ? Math.round(numeroCSV(r[c.reps])) : 0;
    const nome = nomeDaEstero(nome0);
    if (!reps && secondi && isTimeBased(nome)) reps = secondi;
    if (!reps && !kg) { scartate++; return; }
    (nome !== nome0 || findExercise(nome) ? riconosciuti : sconosciuti)[nome0] = nome;
    const k = String(d.getTime());
    const s = sedute[k] = sedute[k] || { quando: d, titolo: c.titolo !== -1 ? (r[c.titolo] || '').trim() : '', es: [] };
    let e = s.es.find(x => x.name === nome);
    if (!e) { e = { name: nome, sets: [], extra: [] }; s.es.push(e); }
    const rpe = c.rpe !== -1 ? numeroCSV(r[c.rpe]) || null : null;
    if (/drop/.test(tipoSet)) e.extra.push({ tipo: 'drop', reps: reps, weight: kg });
    else e.sets.push({ reps: reps, weight: kg, done: true, wasBerserk: /fail/.test(tipoSet), rpe: rpe });
  });
  const lista = Object.keys(sedute).map(k => sedute[k]).sort((a, b) => b.quando - a.quando);
  return { origine: origine, sedute: lista, riconosciuti: riconosciuti, sconosciuti: sconosciuti, scartate: scartate };
}
function sedutaImportata(s, origine) {
  const giorno = DAYS[(s.quando.getDay() + 6) % 7];
  return {
    id: s.quando.getTime(), day: giorno, date: dataOra(s.quando), titolo: nomeSicuro(s.titolo || origine), importata: nomeSicuro(origine),
    berserk: s.es.some(e => e.sets.some(x => x.wasBerserk)), skipped: 0,
    sessione: s.es.map(e => ({ name: nomeSicuro(e.name), rest: 0, sets: e.sets, riscaldamento: [], extra: e.extra.length ? e.extra : undefined })),
    exercises: s.es.map(e => ({ name: nomeSicuro(e.name), weight: e.sets.length ? e.sets[e.sets.length - 1].weight : 0, totalSets: e.sets.length, doneSets: e.sets.length, wasBerserk: e.sets.some(x => x.wasBerserk) }))
  };
}
window.importaCSV = function() {
  scegliFile('.csv,text/csv,text/plain', (testo, nomeFile) => {
    const r = leggiExport(testo);
    if (r.errore) { showUndo(r.errore); return; }
    const storia = loadHistory();
    const esistenti = {};
    storia.forEach(h => { const d = dataSessione(h); if (d) esistenti[ymd(d) + ' ' + d.getHours() + ':' + d.getMinutes()] = 1; });
    const nuove = r.sedute.filter(s => !esistenti[ymd(s.quando) + ' ' + s.quando.getHours() + ':' + s.quando.getMinutes()]);
    foglioDati = { r: r, nuove: nuove };
    const sconosciuti = Object.keys(r.sconosciuti);
    const ric = Object.keys(r.riconosciuti).filter(k => r.riconosciuti[k] !== k);
    const primo = r.sedute[r.sedute.length - 1], ultimo = r.sedute[0];
    const fmt = (d) => d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: 'numeric' });
    apriFoglio('Importa allenamenti',
      '<div class="res-card"><div class="res-title">' + escapeHtml(r.origine) + '</div>' +
        '<div class="res-line"><span>Allenamenti nel file</span><b>' + r.sedute.length + '</b></div>' +
        '<div class="res-line"><span>Nuovi da aggiungere</span><b>' + nuove.length + '</b></div>' +
        (r.sedute.length - nuove.length ? '<div class="res-line"><span>Già presenti</span><b>' + (r.sedute.length - nuove.length) + '</b></div>' : '') +
        (primo ? '<div class="res-line"><span>Periodo</span><b data-no-tr>' + fmt(primo.quando) + ' – ' + fmt(ultimo.quando) + '</b></div>' : '') + '</div>' +
      (ric.length ? '<div class="res-card"><div class="res-title">Esercizi riconosciuti</div>' + ric.slice(0, 40).map(k =>
        '<div class="consent-li"><span data-no-tr>' + escapeHtml(k) + '</span> → ' + escapeHtml(senzaEmoji(r.riconosciuti[k])) + '</div>').join('') + '</div>' : '') +
      (sconosciuti.length ? '<div class="res-card"><div class="res-title">Restano con il loro nome</div><div class="consent-li" data-no-tr>' +
        escapeHtml(sconosciuti.slice(0, 40).join(', ')) + '</div><div class="sr-note">Si vedono nello storico ma il coach non li usa per i carichi.</div></div>' : '') +
      '<div class="sr-note">I riscaldamenti vengono saltati, le libbre convertite in kg. Il coach userà questi carichi come punto di partenza.</div>' +
      (nuove.length ? '<button class="btn-start-workout" onclick="confermaImport()">Importa ' + nuove.length + ' allenamenti</button>' : '<div class="sr-note">Niente di nuovo da importare.</div>'),
      nomeFile);
  });
};
