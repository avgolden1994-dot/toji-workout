/* Esigenza del coach
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   ESIGENZA DEL COACH
   Parte al 120% (piu volume dentro il range del livello, un RIR in meno su
   macchine e isolamenti, quindi carichi che salgono prima) e si corregge
   ogni settimana: serie facili +5%, aderenza sotto il 70% -10%, RPE sopra
   il bersaglio o prontezza bassa -5%, dolore che non passa -10%.
   Limiti 90-130%. Esclusi: modalita prudente, over 65, periodi difficili.
   ============================================================ */
const ESIGENZA_INIZIO = 1.2;   /* senza bandiere dalla BIA; con angolo di fase basso o acqua extracellulare alta parte piu bassa (INT-02, esigenzaIniziale) */
function esigenzaEsclusa(p) {
  const mo = momentoAttivo();
  return !!(p.parq || Number(p.age) >= 65 || (mo && !mo.scaduto && (mo.vol < 1 || mo.rir)));
}
window.esigenzaCoach = function() {
  const p = getProfile();
  if (!p || !getProgramma() || esigenzaEsclusa(p)) return 1;
  return p.esigenza && p.esigenza.valore ? p.esigenza.valore : esigenzaIniziale({}, p);
};
window.aggiornaEsigenza = function() {
  if (!coachAttivo()) return;
  const p = getProfile();
  if (!p || !getProgramma()) return;
  const lun = ymd(lunediDi(new Date()));
  const e = p.esigenza || { valore: esigenzaIniziale({}, p), sett: lun, storia: [] };
  if (!p.esigenza) { p.esigenza = e; localStorage.setItem(PROFILE_KEY(), JSON.stringify(p)); return; }
  if (e.sett >= lun) return;
  const da = piuGiorni(lunediDi(new Date()), -7), a = lunediDi(new Date());
  const sed = tutteLeSedute().filter(h => { const d = dataSessione(h); return d && d >= da && d < a && !h.interrotta; });
  let delta = 0;
  const motivi = [];
  const previsti = Number(p.days) || 3;
  if (sed.length / previsti < COACH_PARAMETRI.aderenzaMinima) { delta -= 0.10; motivi.push('aderenza sotto il 70%'); }
  const scarti = [];
  let tutte = true;
  sed.forEach(h => (h.sessione || []).forEach(x => (x.sets || []).forEach(st => {
    if (!st.done) { tutte = false; return; }
    if (Number(st.rpe) > 0) scarti.push(Number(st.rpe) - rpeBersaglio(x.name));
  })));
  const media = scarti.length ? scarti.reduce((t, x) => t + x, 0) / scarti.length : 0;
  const pr = storicoProntezza().filter(x => typeof x.punteggio === 'number' && x.data >= ymd(da) && x.data < ymd(a));
  const prMedia = pr.length ? pr.reduce((t, x) => t + x.punteggio, 0) / pr.length : null;
  /* se le prime due sedute del programma hanno gia tarato l esigenza in quella settimana, sforzo e prontezza non si contano due volte (INT-05) */
  const giaTarata = !!(e.calibrata && e.calibrata >= ymd(da) && e.calibrata < ymd(a));
  if (giaTarata) { /* niente */ }
  else if (scarti.length >= 3 && media >= 1) { delta -= 0.05; motivi.push('RPE sopra il bersaglio'); }
  else if (prMedia !== null && prMedia < 50) { delta -= 0.05; motivi.push('prontezza bassa'); }
  else if (sed.length && tutte && scarti.length >= 3 && media <= -1 && delta === 0) { delta += 0.05; motivi.push('serie facili'); }
  if (e.dolore && e.dolore >= ymd(da)) { delta -= 0.10; motivi.push('dolore che non passa'); }
  const valore = Math.round(Math.min(1.3, Math.max(0.9, e.valore + delta)) * 100) / 100;
  e.storia = (e.storia || []).concat([{ sett: lun, da: e.valore, a: valore, motivi: motivi }]).slice(-12);
  e.valore = valore;
  e.sett = lun;
  p.esigenza = e;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
};
function segnaDoloreEsigenza() {
  const p = getProfile();
  if (!p) return;
  p.esigenza = p.esigenza || { valore: esigenzaIniziale({}, p), sett: ymd(lunediDi(new Date())), storia: [] };
  p.esigenza.dolore = ymd(new Date());
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
}
function htmlEsigenza() {
  const p = getProfile() || {};
  if (!getProgramma()) return '<div class="met-att">Parte con il primo programma.</div>';
  if (esigenzaEsclusa(p)) return '<div class="met-att">100% · <span>in questo periodo il coach non alza l’asticella</span></div>';
  const e = p.esigenza || { valore: esigenzaIniziale({}, p), storia: [] };
  const u = (e.storia || []).slice(-1)[0];
  return '<div class="met-att"><b>' + Math.round(e.valore * 100) + '%</b>' +
    (u && u.motivi.length ? ' · <span>' + u.motivi.map(m => tr(m)).join(', ') + '</span>' : ' · <span>valutazione iniziale</span>') + '</div>';
}
