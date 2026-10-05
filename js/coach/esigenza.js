/* Esigenza del coach
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   ESIGENZA DEL COACH
   Parte al 120% (piu volume dentro il range del livello, un RIR in meno su
   macchine e isolamenti, quindi carichi che salgono prima) e si corregge
   ogni settimana: serie facili +5%, aderenza sotto il 70% -10%, RPE sopra
   il bersaglio o prontezza bassa -5%, dolore che non passa -10%.
   Limiti 90-130%. Esclusi: modalita prudente, over 65, periodi difficili.
   Onda 0 del coach v2 (W0-T4):
   - PRN-01 il principiante non ha l esigenza del 120%: parte da 100%, non sale oltre e non vede il "Coach esigente" (riceve la
     scheda con il volume del suo livello, vicino al cedimento mai).
   - W2-T8 (ESI-02): le serie facili degli esercizi in calibrazione (CAR-18) non alzano l esigenza: la partenza bassa era voluta (calibrazioneNellaSeduta).
   - MES-10 / MES-11 la settimana di scarico non e un dato di forma: l esigenza non cambia per le serie e per lo sforzo di quella
     settimana (le serie facili di uno scarico non la alzano) e la prima settimana dopo lo scarico non conta "RPE sopra il bersaglio"
     (i carichi di rientro); lo sforzo si confronta con il RIR bersaglio che valeva in quella seduta, non con quello di oggi.
   ============================================================ */
const ESIGENZA_INIZIO = 1.2;   /* senza bandiere dalla BIA; con angolo di fase basso o acqua extracellulare alta parte piu bassa (INT-02, esigenzaIniziale) */
/* soloSicurezza: senza la regola dei principianti (PRN-01): le prime sedute dei principianti si possono ancora leggere per abbassare */
function esigenzaEsclusa(p, soloSicurezza) {
  const mo = momentoAttivo();
  if (!soloSicurezza && p.level === 'principiante' && regolaAttiva('PRN-01')) return true;
  /* INT-2a (M3 della revisione dell onda 1, ETA-02): i minorenni (età tra 1 e 17: 0 = non detta) non hanno il -1 RIR dell esigenza ne l aumento del bilancio: restano a 2-3 ripetizioni in riserva */
  const minorenne = Number(p.age) > 0 && Number(p.age) < PARAM_ETA.maggiorenne;
  return !!(p.parq || Number(p.age) >= 65 || minorenne || (mo && !mo.scaduto && (mo.vol < 1 || mo.rir)));
}
/* PRN-01: il principiante non sale oltre il 100%; gli altri fino al 130% */
function tettoEsigenza(p) { return p && p.level === 'principiante' && regolaAttiva('PRN-01') ? 1 : 1.3; }
/* MES-11: lo scarto RPE-bersaglio di una seduta passata si misura con il RIR bersaglio salvato in quella seduta (obiettivo.rir, dall onda 0);
   per le sedute vecchie si rifa con la settimana in cui sono state fatte */
function rpeBersaglioSeduta(h, x) {
  if (!regolaAttiva('MES-11')) return rpeBersaglio(x.name);
  const r = x && x.obiettivo && x.obiettivo.rir;
  if (Array.isArray(r) && r.length >= 2 && isFinite(r[0]) && isFinite(r[1])) return 10 - (Number(r[0]) + Number(r[1])) / 2;
  if (typeof r === 'number' && isFinite(r)) return 10 - r;
  return rpeBersaglio(x.name, settimanaDellaSeduta(h) || undefined);
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
  /* MES-10: sforzo e serie facili si leggono solo dalle sedute di carico; la settimana di scarico non cambia l esigenza per sforzo o prontezza */
  const prog = getProgramma();
  const settScarico = faseDelGiorno(da, prog) === 'scarico' || (sed.length > 0 && sed.every(h => inScarico(h, null, prog)));
  const dopoScarico = faseDelGiorno(piuGiorni(da, -7), prog) === 'scarico';
  const scarti = [];
  let tutte = true;
  if (!settScarico) sed.forEach(h => (h.sessione || []).forEach(x => {
    if (inScarico(h, x, prog)) return;
    const bers = rpeBersaglioSeduta(h, x);
    /* W2-T8 (ESI-02, piano D.6): le serie facili di un esercizio in calibrazione (CAR-18) non alzano l esigenza: la partenza bassa era voluta; contano per il completamento */
    const inCalibrazione = typeof calibrazioneNellaSeduta === 'function' && calibrazioneNellaSeduta(h, x);
    (x.sets || []).forEach(st => {
      if (!st.done) { tutte = false; return; }
      if (Number(st.rpe) > 0 && !inCalibrazione) scarti.push(Number(st.rpe) - bers);
    });
  }));
  const media = scarti.length ? scarti.reduce((t, x) => t + x, 0) / scarti.length : 0;
  const pr = storicoProntezza().filter(x => typeof x.punteggio === 'number' && x.data >= ymd(da) && x.data < ymd(a));
  const prMedia = pr.length ? pr.reduce((t, x) => t + x.punteggio, 0) / pr.length : null;
  /* se le prime due sedute del programma hanno gia tarato l esigenza in quella settimana, sforzo e prontezza non si contano due volte (INT-05) */
  const giaTarata = !!(e.calibrata && e.calibrata >= ymd(da) && e.calibrata < ymd(a));
  if (giaTarata) { /* niente */ }
  else if (settScarico) { motivi.push('settimana di scarico: lo sforzo non conta'); }
  else if (!dopoScarico && scarti.length >= 3 && media >= 1) { delta -= 0.05; motivi.push('RPE sopra il bersaglio'); }
  else if (prMedia !== null && prMedia < 50) { delta -= 0.05; motivi.push('prontezza bassa'); }
  else if (sed.length && tutte && scarti.length >= 3 && media <= -1 && delta === 0) { delta += 0.05; motivi.push('serie facili'); }
  if (e.dolore && e.dolore >= ymd(da)) { delta -= 0.10; motivi.push('dolore che non passa'); }
  const valore = Math.round(Math.min(tettoEsigenza(p), Math.max(0.9, e.valore + delta)) * 100) / 100;
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
