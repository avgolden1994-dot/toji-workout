/* Il coach compone
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   IL COACH COMPONE: fattore fisico + fattore psicologico + momento
   I metodi famosi non si scelgono: sono esempi da cui il coach prende
   spunto. Per ogni persona sceglie la struttura piu adatta (se batte il
   metodo di base) e un dettaglio da un secondo metodo, sempre col perche.
   ============================================================ */
function fattoreFisico(d, prof0) {
  const bia = d.bia || prof0.bia || null;
  const sex = d.sex || prof0.sex;
  const donna = sex === 'F' || sex === 'donna';
  let an = null;
  try { an = bia ? analyzeBia(bia, donna ? 'donna' : 'uomo') : null; } catch (e) {}
  const fm = an && an.fmPerc ? Number(an.fmPerc) : null;
  const ffmi = an && an.ffmi ? Number(an.ffmi) : null;
  const grassoAlto = fm !== null && fm > (donna ? 32 : 25);
  const ffmiBasso = ffmi !== null && !grassoAlto && ffmi < (donna ? 15 : 18);
  let magraInCalo = false;
  if (prof0 && Object.keys(prof0).length) {
    const st = getBiaStorico().filter(x => x.valori && x.valori.ffm);
    if (st.length >= 2 && st[st.length - 1].valori.ffm < st[st.length - 2].valori.ffm - 0.5) magraInCalo = true;
  }
  const ffm = bia && bia.ffm ? Number(bia.ffm) : null;
  const t = [];
  if (ffmiBasso) t.push('Massa magra bassa per la tua altezza: più serie per la crescita, il muscolo viene prima.');
  if (grassoAlto) t.push('Grasso sopra la media: si tengono i carichi per salvare il muscolo, il dispendio arriva da passi (8-10 mila) e cardio leggero.');
  if (magraInCalo) t.push('Massa magra in calo nell’ultima BIA: volume giù del 15% e carichi fermi finché risale.');
  if (ffm) t.push('Proteine: circa ' + Math.round(ffm * 2.35) + ' g al giorno (2,35 g per kg di massa magra).');
  return { grassoAlto: grassoAlto, ffmiBasso: ffmiBasso, magraInCalo: magraInCalo, fm: fm, ffmi: ffmi, ffm: ffm, testi: t, dati: !!(fm || ffmi) };
}
/* i metodi che possono dare la struttura, e quando */
function metodoAmmesso(m, c) {
  if (!m.applicabile || m.livelli.indexOf(c.level) === -1 || m.giorni.indexOf(c.days) === -1 || m.luoghi.indexOf(c.luogo) === -1) return false;
  if (m.obiettivi.indexOf(c.goals[0]) === -1) return false;
  if (c.cauto && m.intensita === 'alta') return false;
  if (m.id === 'rr' && c.luogo !== 'corpo') return false;
  if (m.id === 'mantenimento' && !(c.mo && c.mo.vol <= 0.6)) return false;
  if (m.id === 'minimo' && !((c.mo && c.mo.vol < 1) || c.minuti <= 35 || c.ps.fiduciaBassa || c.ps.tuttoNiente)) return false;
  if (m.id === 'hit' && c.ps.intensita !== 'alta') return false;
  if (c.minuti < m.minuti[0] - 5) return false;
  return true;
}
function sceltaMetodo(d, prof0, ps, fis, level, over65) {
  const goals = (d.goals && d.goals.length) ? d.goals : [d.goal || 'salute'];
  const mo = d.momentoNuovo ? momentoDa(d.momentoNuovo) : (prof0.momento ? momentoDa(prof0.momento.id) : null);
  const eta = Number(d.age) || 0;
  const c = { level: level, days: Number(d.days) || 3, minuti: Number(d.minutes) || 60, luogo: d.luogo || 'palestra', goals: goals, ps: ps, mo: mo,
    cauto: over65 || d.parq === 'si' || d.parq === true || (eta >= PARAM_ETA.min && eta < PARAM_ETA.maggiorenne) };   /* ETA-02: il minorenne e prudente come l over 65: niente metodi ad alta intensita */
  const lista = metodiPerTe({ level: level, days: c.days, minutes: c.minuti, luogo: c.luogo, goals: goals, psico: d.psico || prof0.psico, momento: mo ? { id: mo.id } : null });
  lista.forEach(x => {
    /* il fattore fisico pesa sulla scelta */
    if (fis.ffmiBasso && /gbr|hatfield|redditppl|phul/.test(x.m.id)) { x.v += 2; x.perche.unshift('massa magra da costruire'); }
    if (fis.grassoAlto && /coach|minimo|gbr/.test(x.m.id)) x.v += 1;
    if (fis.grassoAlto && x.m.pesanti) x.v -= 1;
    if (fis.magraInCalo && x.m.intensita === 'alta') x.v -= 2;
  });
  lista.sort((a, b) => b.v - a.v);
  const base = lista.find(x => x.m.id === 'coach');
  const ammessi = lista.filter(x => metodoAmmesso(x.m, c));
  /* la struttura cambia solo se un metodo batte chiaramente quello di base */
  const primo = ammessi.find(x => x.m.id !== 'coach' && x.v >= (base ? base.v : 0) + 2) || null;
  const secondo = ammessi.find(x => x.m.id !== 'coach' && x !== primo && x.m.tocco && x.v >= (base ? base.v : 0) - 3) || null;
  return { primo: primo, secondo: secondo, base: base };
}
/* i dettagli presi da un secondo metodo */
/* B22 (W0-T2): il `testo` dice quello che `fa` fa davvero (prima la piramide diceva «15-20» e metteva 20, gli isolamenti «12-15» e mettevano almeno 15).
   `alCedimento`: il tocco porta vicino al cedimento (MAV-03): buildProgram non lo sceglie per chi non puo e `fa` riceve in `c` cosa e ammesso */
const TOCCHI = {
  amrap: { testo: 'l’ultima serie del primo fondamentale a ripetizioni massime', alCedimento: true,
    fa: (sd, ps, c) => { const e = sd.esercizi.find(x => tipoCarico(x.name) === 'pesante' && !x.tecnica && !(c && c.senzaCedimento && c.senzaCedimento(x.name))); if (e && ps.intensita !== 'bassa' && !(c && c.tecnicheOk === false)) e.tecnica = 'amrap'; } },
  piramide: { testo: 'l’ultimo isolamento leggero da 20 ripetizioni', fa: (sd) => { const iso = sd.esercizi.filter(x => tipoCarico(x.name) === 'isolamento' && !isTimeBased(x.name) && (findExercise(x.name) || {}).group !== 'core'); const e = iso[iso.length - 1]; if (e) { e.reps = 20; e.rest = 60; } } },
  isolamenti: { testo: 'isolamenti da almeno 15 ripetizioni', fa: (sd) => sd.esercizi.forEach(x => { if (tipoCarico(x.name) === 'isolamento' && !isTimeBased(x.name)) x.reps = Math.max(x.reps, 15); }) },
  superserie: { testo: 'spinte e tirate in superserie per risparmiare tempo', fa: (sd) => { strSuperserie(sd); } }
};

/* ---- il collegamento: chi sei + cosa vivi -> quali metodi ---- */
function metodiPerTe(prof) {
  prof = prof || {};
  const ps = psicoCoach(prof.psico);
  const mo = prof.momento && momentoDa(prof.momento.id);
  const level = prof.level || 'intermedio', days = Number(prof.days) || 3, minuti = Number(prof.minutes) || 60;
  const luogo = prof.luogo || (prof.prefs && prof.prefs.luogo) || 'palestra';
  const goals = prof.goals || [prof.goal || 'salute'];
  return METODI.map(m => {
    let v = 0; const perche = [];
    if (m.luoghi.indexOf(luogo) === -1) return null;
    if (m.livelli.indexOf(level) !== -1) { v += 3; } else v -= 4;
    if (m.giorni.indexOf(days) !== -1) { v += 2; perche.push(days + ' giorni a settimana'); } else v -= 1;
    if (m.obiettivi.indexOf(goals[0]) !== -1) v += 2; else v -= 2;
    if (minuti < m.minuti[0] - 5) v -= 2; else if (minuti <= m.minuti[1] + 15) v += 1;
    if (ps.intensita === m.intensita) { v += 2; perche.push(ps.intensita === 'alta' ? 'ti piace spingere' : (ps.intensita === 'bassa' ? 'intensità dolce' : 'intensità media')); }
    else if (ps.intensita === 'bassa' && m.intensita === 'alta') v -= 4;
    if (ps.varieta === 0 && m.struttura === 'rigida') { v += 2; perche.push('ami la routine'); }
    if (ps.varieta > 1 && m.varieta >= 1) { v += 2; perche.push('ti piace cambiare'); }
    if (ps.varieta > 1 && m.varieta === 0) v -= 1;
    if (ps.fiduciaBassa && m.minuti[0] <= 45 && m.struttura === 'flessibile') { v += 2; perche.push('si parte leggeri'); }
    if (ps.fiduciaBassa && m.intensita === 'alta') v -= 2;
    if (ps.disagio && (m.id === 'rr' || m.id === 'minimo')) { v += 2; perche.push('pochi attrezzi, meno postazioni'); }
    if (luogo === 'corpo' && m.id === 'rr') { v += 3; perche.unshift('pensato per il corpo libero'); }
    if (ps.disagio && m.pesanti) v -= 2;
    if (ps.motivo === 'piacere' && /amrap|record/i.test(m.come)) { v += 1; perche.push('record da battere'); }
    if (ps.tuttoNiente && m.minuti[0] <= 30) { v += 2; perche.push('sedute corte: meglio poco che niente'); }
    if (mo) {
      if (m.id === 'mantenimento' && mo.vol <= 0.6) { v += mo.vol <= 0.5 ? 8 : 6; perche.unshift('adatto al periodo che stai vivendo'); }
      if (m.id === 'minimo' && mo.vol < 1) { v += 4; perche.unshift('poco tempo e poca energia: la dose minima basta'); }
      if (mo.vol < 1 && m.intensita === 'alta') v -= 3;
      if (mo.routine && m.struttura === 'rigida') { v += 1; perche.push('prevedibile'); }
    }
    if (m.id === 'coach') { v += 1; perche.push('si adatta da solo'); }
    if (!m.applicabile) v -= 1;
    return { m: m, v: v, perche: perche.slice(0, 3) };
  }).filter(Boolean).sort((a, b) => b.v - a.v);
}
function htmlMetodi(prof, azione, attuale, quanti) {
  return metodiPerTe(prof).slice(0, quanti || 3).map(x =>
    '<div class="met-card' + (attuale === x.m.id ? ' on' : '') + '"><div class="met-top"><b>' + x.m.nome + '</b> <small data-no-tr>' + escapeHtml(x.m.fonte) + '</small></div>' +
    '<div class="met-come">' + x.m.come + '</div>' +
    (x.perche.length ? '<div class="met-perche">' + ico('ok') + ' ' + x.perche.map(t => '<span>' + t + '</span>').join(' · ') + '</div>' : '') +
    (x.m.attenzione ? '<div class="met-att">' + x.m.attenzione + '</div>' : '') +
    (attuale === x.m.id ? '<div class="met-sel">\u2713 <span>Il coach ne prende spunto adesso</span></div>' : (x.m.applicabile ? '' : '<div class="met-att">Solo ispirazione</div>')) +
    '</div>').join('');
}
window.apriTuttiMetodi = function() {
  apriFoglio('Da dove prende spunto il coach', htmlMetodi(getProfile() || {}, null, null, METODI.length),
    'Le schede più famose: il coach non le copia, ne prende le idee giuste per te');
};
function htmlIspirazioni(isp) {
  return (isp || []).map(x => {
    const m = metodoDa(x.id);
    if (!m) return '';
    return '<div class="met-card"><div class="met-top"><small>' + (x.ruolo === 'struttura' ? 'Struttura' : 'Dettaglio') + '</small> <b>' + m.nome + '</b></div>' +
      '<div class="met-come">' + (x.ruolo === 'struttura' ? m.come : '<span>Preso da qui</span>: <span>' + x.dettaglio + '</span>.') + '</div>' +
      (x.perche && x.perche.length ? '<div class="met-perche">' + ico('ok') + ' ' + x.perche.slice(0, 3).map(t => '<span>' + t + '</span>').join(' \u00B7 ') + '</div>' : '') + '</div>';
  }).join('');
}
