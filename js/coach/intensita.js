/* Intensità decisa dal corpo e dalle prime sedute (INT-01..05)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   INTENSITA: DAL CORPO (BIA) E DALLE PRIME SEDUTE
   Il coach non parte piu da un "+20%" uguale per tutti.
   INT-01 stato del corpo dalla BIA: angolo di fase (cellule, qualita del muscolo) e rapporto
          acqua extracellulare / acqua totale (ECW/TBW). Nessuno studio dice di prescrivere i carichi
          da questi due numeri: sono bandiere di PRUDENZA e dicono se la lettura e affidabile.
   INT-02 esigenza di partenza: 120% senza bandiere, 100% con una, 95% con due o con un angolo molto basso.
   INT-03 con due bandiere: una ripetizione in riserva in piu (le stime del RIR sbagliano gia di circa una ripetizione).
   INT-04 prima volta con un esercizio: una serie in meno (min 2) e una ripetizione in riserva in piu: le prime sedute
          fanno piu indolenzimento (effetto della seduta ripetuta) e il carico di partenza e una stima.
   INT-05 dopo le prime due sedute del programma il coach confronta serie fatte, sforzo (RPE) e prontezza
          con quanto previsto e fissa l esigenza (90-130%) subito, senza aspettare il lunedi.
   Onda 0 del coach v2 (W0-T4):
   - PRN-01 il principiante parte da 100% (esigenzaIniziale), non sale oltre e il bilancio delle prime sedute lo puo solo abbassare.
   - ETA-04 sotto i 18 anni nessun giudizio sulla BIA (i valori di riferimento sono da adulti): niente bandiere di prudenza ne testi.
   - OBI-04 (W2-T1) in deficit calorico l esigenza di partenza non supera il 100% (esigenzaInDeficit, esigenza.js).
   - MES-06 la prima seduta con un esercizio dopo lo scarico lascia una ripetizione in riserva in piu (rirExtraIntensita).
   - MES-11 il bilancio confronta lo sforzo con il RIR bersaglio che valeva in quella seduta (rpeBersaglioSeduta).
   W2-T8: INT-05 non conta come «serie facili» (sforzo sotto il bersaglio) quelle degli esercizi in calibrazione (CAR-18, carichi/calibrazione.js): contano solo per il completamento.
   W1-T3: nessun involucro. INT-04 e la fase 70 della catena 'carico', INT-05 la fase 30 di 'dopoSeduta' (regia/fasi.js, piano B.3).
   Le prove, con la loro forza, stanno in docs/ricerca-struttura-e-intensita.md.
   ============================================================ */
const PARAM_INTENSITA = {
  ecwAlto: 0.40,                         /* ECW/TBW: normale 0,36-0,39; da 0,40 acqua extracellulare in eccesso */
  ecwLimite: 0.39,
  faMargine: 1.3,                        /* gradi sotto la media di eta e sesso: circa il 5 percentile (Bosy-Westphal 2006) */
  faAssoluta: { M: 5.04, F: 4.20 },      /* sotto questi valori la funzione fisica e peggiore (OR 3,07, anziani coreani) */
  esigenza: [1.2, 1.0, 0.95],            /* senza bandiere, con una, con due */
  rirExtra: [0, 0, 1],
  primeSedute: 2,
  completamentoBasso: 0.75, completamentoAlto: 0.95,
  scartoSopra: 1, scartoFacile: -1.5, prontezzaBassa: 50,
  passo: 0.10, passoProntezza: 0.05
};
/* angolo di fase medio a 50 kHz per eta (Bosy-Westphal 2006; sopra i 50 anni valori interpolati verso l ultimo gruppo): gli strumenti differiscono di qualche decimo */
const FA_MEDIA = { M: [[25, 8.0], [35, 8.0], [45, 7.8], [55, 7.2], [65, 6.7], [75, 6.2]], F: [[25, 7.0], [35, 6.9], [45, 6.9], [55, 6.4], [65, 6.0], [75, 5.6]] };
function faRiferimento(sesso, eta) {
  const t = FA_MEDIA[sesso] || FA_MEDIA.M;
  if (eta <= t[0][0]) return t[0][1];
  for (let i = 1; i < t.length; i++) if (eta <= t[i][0]) { const a = t[i - 1], b = t[i]; return a[1] + (b[1] - a[1]) * (eta - a[0]) / (b[0] - a[0]); }
  return t[t.length - 1][1];
}
const _virg = (x, d) => x.toFixed(d || 1).replace('.', ',');   /* sempre con i decimali: la voce del dizionario e una sola (#,#) */

/* INT-01: cosa dicono la BIA appena inserita o l ultima salvata. livello = quante bandiere di prudenza (0, 1, 2) */
window.statoBia = function(d, prof) {
  d = d || {}; prof = prof || {};
  const bia = d.bia || prof.bia || null;
  let ult = null;
  try { const st = getBiaStorico().filter(x => x && x.valori); ult = st.length ? st[st.length - 1].valori : null; } catch (e) {}
  const num = (k) => { const v = Number(bia && bia[k]); if (v > 0) return v; const w = Number(ult && ult[k]); return w > 0 ? w : null; };
  const sex = d.sex || prof.sex;
  const sesso = (sex === 'F' || sex === 'donna') ? 'F' : 'M';
  const eta = Number(d.age || prof.age) || 0;
  const minore = eta > 0 && eta < 18 && regolaAttiva('ETA-04');   /* ETA-04: i riferimenti sono da adulti, ai minori non si danno giudizi sul corpo */
  let fa = num('phase'), ecw = num('ecw'), tbw = num('tbw');
  if (fa !== null && (fa < 2 || fa > 12)) fa = null;                       /* fuori scala: errore di lettura del referto */
  let rapporto = ecw && tbw && tbw > ecw ? ecw / tbw : null;
  if (rapporto !== null && (rapporto < 0.3 || rapporto > 0.5)) rapporto = null;
  const rif = fa !== null && eta >= 18 ? faRiferimento(sesso, eta) : null;
  const faMoltoBassa = !minore && fa !== null && fa < PARAM_INTENSITA.faAssoluta[sesso];
  const faBassa = !minore && (faMoltoBassa || (rif !== null && fa < rif - PARAM_INTENSITA.faMargine));
  const ecwAlto = !minore && rapporto !== null && rapporto >= PARAM_INTENSITA.ecwAlto;
  const ecwLimite = !minore && rapporto !== null && !ecwAlto && rapporto >= PARAM_INTENSITA.ecwLimite;
  const livello = Math.min(2, (faMoltoBassa ? 2 : (faBassa ? 1 : 0)) + (ecwAlto ? 1 : 0));
  const testi = [];
  if (faBassa) testi.push('Angolo di fase basso per la tua età (' + _virg(fa) + '° contro circa ' + _virg(rif || 0) + '°): parto senza il +20% di volume e le prime sedute decidono. È una misura di prudenza, non una diagnosi.');
  if (ecwAlto) testi.push('Acqua extracellulare alta (rapporto ' + _virg(rapporto, 2) + ', normale 0,36-0,39): parto senza il +20% di volume. Ripeti la BIA a digiuno e a riposo: se resta alta, parlane con il medico.');
  else if (ecwLimite) testi.push('Acqua extracellulare ai limiti alti (rapporto ' + _virg(rapporto, 2) + '): la lettura dipende da idratazione e orario, ripeti la BIA nelle stesse condizioni.');
  if (livello >= 2) testi.push('Una ripetizione in riserva in più nelle prime settimane.');
  return { fa: fa, faRif: rif, rapporto: rapporto, faBassa: faBassa, faMoltoBassa: faMoltoBassa, ecwAlto: ecwAlto, ecwLimite: ecwLimite, livello: livello, testi: testi, dati: fa !== null || rapporto !== null };
};
/* INT-02 */
window.esigenzaIniziale = function(d, prof) {
  const v = PARAM_INTENSITA.esigenza[statoBia(d, prof).livello];
  /* PRN-01: il principiante parte da 100% (niente "Coach esigente"): impara i movimenti, il corpo si abitua senza troppa dolenzia */
  if (((d && d.level) || (prof && prof.level)) === 'principiante' && regolaAttiva('PRN-01')) return Math.min(v, 1);
  /* OBI-04: in deficit calorico (il dimagrimento tra gli obiettivi) niente +20%: parte da 100% al massimo */
  return esigenzaInDeficit(d, prof) ? Math.min(v, 1) : v;
};
/* INT-03 e INT-04: ripetizioni in riserva in piu per questo esercizio (usata da rirBersaglio) */
window.rirExtraIntensita = function(nome) {
  let piu = 0;
  try { piu += PARAM_INTENSITA.rirExtra[statoBia({}, getProfile() || {}).livello] || 0; } catch (e) {}
  try { if (nome && !isTimeBased(nome) && regolaAttiva('INT-04') && coachAttivo() && ultimeSessioni(nome, 1).length === 0) piu += 1; } catch (e) {}
  try { if (nome && ripresaDopoScarico(nome)) piu += 1; } catch (e) {}   /* MES-06: la prima seduta dopo lo scarico riparte dal carico di prima con un RIR in piu */
  return piu;
};

/* INT-04: prima volta con un esercizio, una serie in meno (min 2). Fase 70 INT della catena 'carico' (regia/fasi.js, W1-T3): l ultima,
   dopo i carichi (10), gli aggiusti (50) e RIC (60); prima era un involucro di caricoProssimo. */
function primaVoltaUnaSerieInMeno(r, c) {
  if (!r || r.tipo !== 'nuovo' || isTimeBased(c.nome) || !regolaAttiva('INT-04')) return r;
  if (r.sets > 2) {
    r.sets = Math.max(2, r.sets - 1);
    r.motivo += ' • prima volta: una serie in meno, le prime sedute fanno più indolenzimento';
  }
  return r;
}
registraFase('carico', 70, 'INT', primaVoltaUnaSerieInMeno);

/* INT-05: bilancio delle prime due sedute del programma */
function sedutePrimeDelProgramma() {
  const prog = getProgramma();
  if (!prog || !prog.inizio) return [];
  return sedutePassate().filter(x => ymd(x.d) >= prog.inizio).sort((a, b) => a.d - b.d);
}
window.bilancioPrimeSedute = function() {
  if (!coachAttivo() || !regolaAttiva('INT-05')) return null;
  const p = getProfile(), prog = getProgramma();
  if (!p || !prog || esigenzaEsclusa(p, true)) return null;   /* i principianti restano dentro: il bilancio li puo solo abbassare (PRN-01) */
  if (p.calibrazione && p.calibrazione.programma === prog.creato) return null;
  const P = PARAM_INTENSITA;
  const due = sedutePrimeDelProgramma().slice(0, P.primeSedute);
  if (due.length < P.primeSedute) return null;
  let fatte = 0, tot = 0;
  const scarti = [];
  due.forEach(x => (x.h.sessione || []).forEach(e => {
    /* W2-T8 (piano D.6): le serie di un esercizio in calibrazione (CAR-18) contano per il completamento ma non come «serie facili»: una partenza bassa voluta non deve alzare l esigenza */
    const inCalibrazione = typeof calibrazioneNellaSeduta === 'function' && calibrazioneNellaSeduta(x.h, e);
    (e.sets || []).forEach(st => {
      tot++;
      if (!st.done) return;
      fatte++;
      if (Number(st.rpe) > 0 && !inCalibrazione) scarti.push(Number(st.rpe) - rpeBersaglioSeduta(x.h, e));
    });
  }));
  const compl = tot ? fatte / tot : 1;
  const scarto = scarti.length >= 3 ? scarti.reduce((t, x) => t + x, 0) / scarti.length : null;
  const pr = due.map(x => x.h.prontezza).filter(x => typeof x === 'number');
  const prMedia = pr.length ? pr.reduce((t, x) => t + x, 0) / pr.length : null;
  let delta = 0, esito = 'giusta', motivo = 'prime due sedute: intensità giusta';
  if (compl < P.completamentoBasso) { delta = -P.passo; esito = 'alta'; motivo = 'prime due sedute: serie non completate'; }
  else if (scarto !== null && scarto >= P.scartoSopra) { delta = -P.passo; esito = 'alta'; motivo = 'prime due sedute: sforzo sopra il bersaglio'; }
  else if (prMedia !== null && prMedia < P.prontezzaBassa) { delta = -P.passoProntezza; esito = 'alta'; motivo = 'prime due sedute: prontezza bassa'; }
  else if (compl >= P.completamentoAlto && scarto !== null && scarto <= P.scartoFacile) { delta = P.passo; esito = 'bassa'; motivo = 'prime due sedute: serie facili'; }
  const lun = ymd(lunediDi(new Date()));
  const e = p.esigenza || { valore: esigenzaIniziale({}, p), sett: lun, storia: [] };
  if (delta > 0 && e.valore >= tettoEsigenza(p)) { delta = 0; esito = 'giusta'; motivo = 'prime due sedute: intensità giusta'; }   /* PRN-01: il principiante non sale oltre il 100% */
  const da = e.valore;
  e.valore = Math.round(Math.min(tettoEsigenza(p), Math.max(0.9, e.valore + delta)) * 100) / 100;
  e.calibrata = ymd(new Date());
  e.storia = (e.storia || []).concat([{ sett: lun, da: da, a: e.valore, motivi: [motivo] }]).slice(-12);
  p.esigenza = e;
  p.calibrazione = { programma: prog.creato, data: e.calibrata, esito: esito, completamento: Math.round(compl * 100), scarto: scarto === null ? null : Math.round(scarto * 10) / 10 };
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  return p.calibrazione;
};
/* INT-05 dopo la seduta: fase 30 INT-05 del punto 'dopoSeduta' (dopo gli stalli, 10, e la taratura del RIR, 20); prima era un involucro di imparaDallaSeduta */
registraFase('dopoSeduta', 30, 'INT-05', () => {
  let r = null;
  try { r = bilancioPrimeSedute(); } catch (err) {}
  if (r && typeof showUndo === 'function') {
    const e = (getProfile() || {}).esigenza || {};
    showUndo(trP({ alta: 'Prime due sedute: era tosta, abbasso un po’ l’intensità (ora %s%).', bassa: 'Prime due sedute: eri sotto il bersaglio, alzo un po’ l’intensità (ora %s%).', giusta: 'Prime due sedute: intensità giusta, resto al %s%.' }[r.esito], Math.round((e.valore || 1) * 100)), null, 6000);
  }
});
