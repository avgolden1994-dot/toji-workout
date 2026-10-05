/* Controllo del dolore la mattina dopo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CONTROLLO DEL DOLORE LA MATTINA DOPO (Silbernagel 2007)
   Un dolore fino a 5/10 durante la seduta e accettabile se torna al
   livello di base entro la mattina dopo. Il coach lo chiede in Oggi:
   se e tornato normale toglie il -10%, altrimenti lo tiene.
   ============================================================ */
function controlloDoloreDaFare() {
  if (!coachAttivo()) return null;
  const c = aggiustiCoach().controlloDolore;
  if (!c || !c.dal || c.dal >= ymd(new Date())) return null;
  return c;
}
function htmlControlloDolore() {
  const c = controlloDoloreDaFare();
  if (!c) return '';
  const zone = Object.keys(c.zone).map(z => (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1]);
  return '<div class="card og-dolore"><div class="og-dol-t">' + ico('cuore') + ' Controllo del coach</div>' +
    '<p><span>Dolore segnalato l’ultima volta</span>: <b>' + zone.join(', ') + '</b><br><span>Stamattina è tornato come prima?</span></p>' +
    '<div class="og-dol-b"><button class="btn-main" onclick="rispostaDolore(true)">Sì, tutto normale</button>' +
    '<button class="btn-archive" onclick="rispostaDolore(false)">No, ancora</button></div></div>';
}
window.rispostaDolore = function(passato) {
  const ag = aggiustiCoach();
  const c = ag.controlloDolore;
  if (!c) return;
  if (passato) {
    c.esercizi.forEach(n => { const a = ag.esercizi[n]; if (a && a.fattore >= 0.9) delete ag.esercizi[n]; });
    showUndo('Bene: il dolore è passato, carichi normali');
  } else {
    segnaDoloreEsigenza();
    showUndo('Il carico resta ridotto del 10%. Se continua a crescere, senti un fisioterapista.');
  }
  ag.controlloDolore = null;
  salvaAggiusti(ag);
  if (typeof renderOggi === 'function') renderOggi();
};

/* a fine seduta si consumano gli aggiustamenti usati */
function consumaAggiusti(entry) {
  const ag = aggiustiCoach();
  (entry.sessione || []).forEach(e => {
    const a = ag.esercizi[e.name];
    if (a) { a.sedute = (a.sedute || 1) - 1; if (a.sedute <= 0) delete ag.esercizi[e.name]; }
  });
  if (ag.scarico) { ag.scarico.sedute -= 1; if (ag.scarico.sedute <= 0) ag.scarico = null; }
  salvaAggiusti(ag);
}

/* MES-06 (ponte): dopo uno scarico si riparte dal carico di riferimento; con la fatica ancora addosso
   (prudenti, over 65, sonno scarso, prontezza media degli ultimi tre check sotto soglia) dal 95% */
const RIPRESA_DOPO_SCARICO_PRUDENTE = 0.95;
const RIPRESA_PRONTEZZA_MIN = 60;
/* MES-06: la ripresa non sale di piu di un quarto rispetto all ultima seduta (uno scarico normale vale al massimo +11%: serve solo
   se lo scarico si era gia composto, 24,5 → 22 → 20 → 18 kg, e si risale per gradi) */
const RIPRESA_SALTO_MAX = 1.25;
/* B7 (DEC-02): dolore a gomito o ginocchio: -10% con ampiezza senza dolore e almeno cosi tante ripetizioni in riserva */
const RIR_MIN_DOLORE = 3;
function fattoreRipresaDopoScarico() {
  const pc = profiloCoach();
  const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
  const bassa = pr.length > 0 && pr.reduce((t, x) => t + x, 0) / pr.length < RIPRESA_PRONTEZZA_MIN;
  return pc.prudente || pc.sonnoMale || pc.eta >= 65 || bassa ? RIPRESA_DOPO_SCARICO_PRUDENTE : 1;
}

window.caricoProssimo = function(nome, base, repsTarget, setsBase) {
  const r = caricoProssimoBase(nome, base, repsTarget, setsBase);
  let ag;
  try { ag = aggiustiCoach(); } catch (e) { return r; }
  /* MES-06: il carico dello scarico e della ripresa si calcola sul riferimento (ultima seduta NON di scarico), mai sul
     carico che un altro scarico ha gia tagliato. Ponte: dove la base lo calcola gia sul riferimento il risultato non cambia. */
  const rif = isTimeBased(nome) || !regolaAttiva('MES-06') ? 0 : caricoRiferimento(nome);
  const ultima = rif > 0 ? sedutePerEsercizio(nome, 1)[0] : null;
  const dopoScarico = !!(ultima && esercizioInScarico(ultima.h, ultima.ex));   /* l ultima seduta con questo esercizio era di scarico */
  const sett = settimanaProgramma();
  let rirPiu = 0;
  if (ag.scarico && ag.scarico.sedute > 0 && r.tipo !== 'scarico') {
    /* CAR-10: scarico deciso dal coach, sul riferimento; mai piu del carico che il motore proponeva (dolore, rientro),
       a meno che quella proposta parta da un altro scarico */
    r.weight = arrotonda((rif > 0 && (dopoScarico || rif <= r.weight) ? rif : r.weight) * COACH_PARAMETRI.scaricoReattivoCarico);
    r.sets = Math.max(2, Math.round((setsBase || 3) * COACH_PARAMETRI.scaricoReattivoSerie));
    r.tipo = 'scarico';
    r.motivo = 'Scarico deciso dal coach: ' + ag.scarico.motivo;
  } else if (rif > 0 && r.tipo === 'scarico' && sett && sett.fase === 'scarico') {
    /* settimana di scarico del programma: riferimento x dose, uguale in tutte le sedute (60 → 54 → 54, non 54 → 48,5) */
    r.weight = arrotonda(rif * DOSE_SCARICO[livelloFatica()].carico);
  } else if (dopoScarico && esito(ultima.ex, repsTarget) === 'ok') {
    /* prima seduta dopo uno scarico completato: il motore parte dal carico di scarico (+ incremento, o -10/-20% di rientro),
       ma lo scarico non dice quanto si e forti: si riparte dal riferimento, con una ripetizione in riserva in piu.
       Se lo scarico e mancato il motore resta dov e. */
    const ultimo = pesoUltimoDi(nome), tetto = ultimo && ultimo.weight > 0 ? arrotonda(ultimo.weight * RIPRESA_SALTO_MAX) : Infinity;
    if (r.tipo === 'su') {
      const f = fattoreRipresaDopoScarico(), pieno = arrotonda(rif * f), da = Math.min(pieno, tetto);
      if (r.weight < da) {
        const perGradi = da < pieno;
        r.weight = da; r.reps = repsTarget; r.tipo = perGradi ? 'su' : 'fermo'; rirPiu = 1;
        r.motivo = perGradi ? 'Dopo lo scarico si risale per gradi verso il carico di prima: oggi +' + Math.round((da / ultimo.weight - 1) * 100) + '%'
          : f < 1 ? 'Dopo lo scarico riparti poco sotto il carico che avevi prima (-' + Math.round((1 - f) * 100) + '%), per prudenza'
                  : 'Dopo lo scarico riparti dal carico che avevi prima';
      }
    } else if (r.tipo === 'giu') {
      /* pausa subito dopo lo scarico (rientro, doppia per gli over 65): la riduzione si applica al riferimento */
      const d = dataSessione(ultima.h), rientro = d ? rientroDopoPausa(giorniTra(d, new Date()), profiloCoach().eta) : null;
      if (rientro) r.weight = Math.max(r.weight, Math.min(arrotonda(rif * rientro.f), tetto));
    }
  }
  const a = ag.esercizi[nome];
  if (a && a.sedute > 0) {
    const inc = incrementoPer(nome);
    const alg02 = regolaAttiva('ALG-02'), ult = alg02 ? pesoUltimoDi(nome) : null;
    if (a.fattore) { r.weight = arrotonda(r.weight * a.fattore); r.tipo = 'giu'; r.motivo = a.motivo; }
    /* ALG-02: «blocca» = nessun aumento, quindi carico e ripetizioni dell ultima volta (non un incremento in meno: con +1 ripetizione
       o con un aumento da RPE il carico finiva sotto o sopra quello di prima); «extra» solo se il «su» era un aumento di carico.
       Con la regola spenta torna il comportamento di prima. */
    else if (a.blocca && r.tipo === 'su') {
      if (alg02 && ult) { r.weight = ult.weight; if (ult.reps > 0) r.reps = ult.reps; }
      else r.weight = arrotonda(Math.max(0, r.weight - inc));
      r.tipo = 'fermo'; r.motivo = 'Stesso carico: l ultima seduta era al limite';
    }
    else if (a.extra && r.tipo === 'su' && (!alg02 || (ult && r.weight > ult.weight))) { r.weight = arrotonda(r.weight + inc); r.motivo += ' • +' + inc + ' kg in più: l ultima volta era leggero'; }
    else if (a.nota) { r.motivo = a.nota; }
    if (a.alteRip && !isTimeBased(nome)) r.motivo += ' • ampiezza senza dolore, almeno ' + RIR_MIN_DOLORE + ' ripetizioni in riserva';
  }
  if (!isTimeBased(nome) && r.weight > 0 && r.tipo !== 'scarico' && r.tipo !== 'giu') {
    /* dopo uno scarico una ripetizione in riserva in piu del solito */
    const rir = rirPiu ? rirBersaglio(nome) : null;
    r.motivo += ' • ' + (rir ? 'lascia ' + (rir[0] + rirPiu) + '–' + (rir[1] + rirPiu) + ' ripetizioni in riserva' : testoRir(nome));
  }
  return r;
};
