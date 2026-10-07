/* Calibrazione rapida dei carichi stimati (CAR-18, CAR-19)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   CALIBRAZIONE RAPIDA DEL CARICO STIMATO (coach v2, W2-T8; piano D.5; registro B1, B3, B22, D-P1, D-P16)
   Un carico di partenza e una STIMA, e per chi comincia la stima e prudente (per le donne fino all intermedio anche bassa di proposito, PAR-06):
   se alla prima seduta l esercizio e facile, il carico sale subito invece di aspettare settimane. Fase 15 BIL della catena 'carico' (regia/fasi.js):
   dopo i carichi di sempre (10) e prima degli aggiusti (50), di RIC (60) e di INT-04 (70); sostituisce CAR-16 per questi esercizi, CAR-17 resta.

   A CHI: gli esercizi del piano con carico stimato (e.stimato, scritto da applicaPartenze e da pesoPartenza) di tutti i principianti, uomini compresi (D-P1),
   e delle donne intermedie con il fattore di partenza bassa attivo. Non ai minorenni (una regola che alza i carichi non li spinge). Solo col consenso.
   PER QUANTO: le prime 5 esposizioni (sedute con l esercizio, dallo storico) e finche non «si chiude»: i salti si decidono dopo le esposizioni 1-5, alla sesta e chiusa comunque (INT-3a: erano 4; vedi soglie-partenza.js).
   COME: lo scarto = RPE bersaglio (8: il carico e giusto, stop al primo RPE 8) meno l RPE segnato; l RPE e quello piu alto tra le serie segnate (la serie piu dura:
   con il tocco a 3 scelte di W3-T3, D-P16, e la sola prima serie), corretto da rirBias. La scala dell app parte da 6 (facile = quattro o piu ripetizioni di
   riserva): 6 vale come scarto 2. Con tutte le serie fatte alle ripetizioni previste:
       scarto >= 3: +20% / +25% / +20% (alto, basso, isolamento) · 2: +15 / +20 / +15% · 1: +10%    (partenza bassa, le donne)
       scarto >= 3: +10% · 2: +7,5% · 1: +5%                                                         (partenza normale, i principianti uomini)
       dentro ±0,5 o sopra il bersaglio: si chiude, nessun salto · senza RPE: +10 / +15 / +10% (+5%) al massimo 2 volte, e il promemoria di CAR-19 ·
       serie mancate: CAR-17 come prima (-5% se molto sotto) e si chiude.
   Ogni salto vale almeno un passo dell attrezzo, per difetto, e non supera il +25%. Salvaguardie: PAR-Q, sonno scarso o da 65 anni salti dimezzati; dolore su
   quell esercizio, freno della BIA, prontezza sotto 50 o settimana di scarico: nessun salto (la Sentinella le avra come fase 90: finche non c e le fa questa fase).
   Perche non il ricarico dal massimale: con il RIR contato al massimo 4 uno scarto vale 1-2 ripetizioni, cioe 3-6% di carico per volta (Epley): troppo poco per
   restituire uno sconto del 25-40% (ricerca-donne §3.6). La tabella dei salti e una scelta di prodotto (Convenzione), resa sicura da tetti, chiusura e salvaguardie.
   Limite onesto: la scala parte da 6, quindi un RPE segnato non distingue «facile» da «molto facile»: un salto grande puo superare il carico giusto di una persona
   vicina al suo limite fin dalla prima seduta. Per questo l RPE conta con la serie piu dura e il primo mancato chiude la calibrazione.
   La calibrazione non la si conserva in un dato: si rifa ogni volta dallo storico (esposizioniCalibrazione, storiaCalibrazione), cosi e la stessa per la schermata,
   per INT-05 e per ESI-02 (le sue serie facili non alzano l esigenza: calibrazioneNellaSeduta) e per le sedute importate o rifatte.
   ============================================================ */
const FRASE_CARICO_TARATO = 'Carico tarato: da qui la progressione normale';
/* la voce del dizionario e «Il salto era troppo grande: si torna a # kg, da qui la progressione normale» */
const FRASE_SALTO_TROPPO_GRANDE_PRIMA = 'Il salto era troppo grande: si torna a ', FRASE_SALTO_TROPPO_GRANDE_DOPO = ' kg, da qui la progressione normale';
const FRASE_PROMEMORIA_RPE = 'Segna quanto è stata dura la prima serie (RPE): con il dato il carico sale più in fretta';
const virgola = (x) => String(x).replace('.', ',');

/* il record dell esercizio nel piano della settimana (porta e.stimato); null se non c e */
function recordPianoDi(nome) {
  const dati = loadData();
  for (let i = 0; i < DAYS.length; i++) {
    const e = (dati[DAYS[i]] || []).find(x => x.name === nome);
    if (e) return e;
  }
  return null;
}
/* la persona: null se la calibrazione rapida non la riguarda (minorenne, o ne principiante ne donna intermedia con il fattore attivo);
   altrimenti { bassa: colonna «partenza bassa» della tabella (le donne con il fattore), cauto: salti dimezzati } */
function personaCalibrazione() {
  const prof = getProfile() || {};
  const pc = profiloCoach();
  if (pc.eta > 0 && pc.eta < PARAM_ETA.maggiorenne) return null;
  const chi = sogliaPartenza('calibrazioneChi');
  const cc = contestoCarichi({}, prof);
  if (!(chi.livelli.indexOf(cc.livello) !== -1 || (chi.donneConFattore && cc.partenzaBassa))) return null;
  return { bassa: cc.partenzaBassa, cauto: pc.prudente || pc.sonnoMale || pc.eta >= 65 };
}
/* le esposizioni a un esercizio dalla piu vecchia: sedute vere (non interrotte), con almeno una serie fatta, senza le sedute di scarico */
function esposizioniCalibrazione(nome) {
  return sedutePerEsercizio(nome, 40, { senzaScarico: true }).filter(x => (x.ex.sets || []).some(s => s.done)).reverse();
}
/* l RPE della seduta di un esercizio per la calibrazione: il piu alto tra le serie segnate, corretto da rirBias (come caricoProssimoBase); null se nessuna serie ha l RPE */
function rpeCalibrazione(ex, bias) {
  const v = (ex.sets || []).filter(s => s.done && Number(s.rpe) > 0).map(s => Math.max(1, Number(s.rpe) - (bias || 0)));
  return v.length ? Math.max.apply(null, v) : null;
}
/* la riga della tabella per uno scarto sopra la tolleranza: 3 (3 o piu), 2 o 1 */
function rigaSalto(scarto) { return scarto >= 3 ? 3 : (scarto >= 2 ? 2 : 1); }
/* la percentuale di salto di CAR-18 per una colonna (persona.bassa), un distretto/tipo e uno scarto, o per l assenza di RPE (scarto null) */
function percentualeSalto(persona, classe, scarto) {
  const cl = classe || 'alto';
  if (scarto === null) { const s = sogliaPartenza('calibrazioneSenzaRpe'); return persona.bassa ? s.bassa[cl] : s.normale; }
  const t = sogliaPartenza('calibrazioneSalti');
  return persona.bassa ? t.bassa[rigaSalto(scarto)][cl] : t.normale[rigaSalto(scarto)];
}
/* il nuovo carico dopo un salto: almeno un passo dell attrezzo, per difetto, MAI oltre +25%. Se gia un solo passo supera il tetto (un manubrio da 3 kg: +1 kg e +33%) il carico non
   cambia (null): con carichi cosi piccoli un passo e un salto troppo grosso, e li si sale con le ripetizioni (doppia progressione di caricoProssimoBase) */
function pesoDopoSalto(m, pesoUltimo, pct) {
  const passo = passoCarico(m, pesoUltimo);
  const tetto = pesoUltimo * (1 + sogliaPartenza('calibrazioneTettoSalto'));
  if (pesoUltimo + passo > tetto + 1e-9) return null;
  let w = Math.floor(pesoUltimo * (1 + pct) / passo + 1e-9) * passo;
  if (w <= pesoUltimo) w = pesoUltimo + passo;
  if (w > tetto) w = Math.floor(tetto / passo + 1e-9) * passo;
  return w;
}
/* cosa decide la tabella dopo una esposizione: { azione: 'salta' | 'chiude' | 'tieni' | 'mancato', pct, nuovo, pesoUltimo, rpe, scarto, cieco, forzata }
   `cieche`: quanti salti senza RPE ha gia fatto. Il salto e gia dimezzato per chi e prudente
   (PAR-Q, sonno scarso, da 65 anni) e vale nuovo kg; se un passo dell attrezzo supera gia il +25% non c e salto (azione 'tieni': si sale con le ripetizioni) */
function decisioneCalibrazione(ex, repsTarget, m, persona, cieche) {
  const bias = Number((aggiustiCoach() || {}).rirBias) || 0;
  const rpe = rpeCalibrazione(ex, bias);
  const fatte = (ex.sets || []).filter(s => s.done);
  const pesoUltimo = fatte.length ? Math.max.apply(null, fatte.map(s => Number(s.weight) || 0)) : 0;
  const base = { rpe: rpe, scarto: null, pesoUltimo: pesoUltimo };
  if (esito(ex, repsTarget) !== 'ok') return Object.assign(base, { azione: 'mancato' });
  const bers = sogliaPartenza('calibrazioneBersaglioRpe'), tol = sogliaPartenza('calibrazioneTolleranzaRpe');
  if (rpe !== null) base.scarto = bers - rpe;
  if (rpe !== null && bers - rpe <= tol + 1e-9) return Object.assign(base, { azione: 'chiude', tarato: Math.abs(bers - rpe) <= tol + 1e-9 });   /* nel bersaglio (tarato) o sopra (nessun salto, si chiude) */
  const cieco = rpe === null;
  if (cieco && cieche >= sogliaPartenza('calibrazioneSenzaRpe').volteMax) return Object.assign(base, { azione: 'tieni' });
  const pct = percentualeSalto(persona, classePartenza(m), cieco ? null : bers - rpe) * (persona.cauto ? sogliaPartenza('calibrazioneCauto') : 1);
  const nuovo = pesoUltimo > 0 ? pesoDopoSalto(m, pesoUltimo, pct) : null;
  if (nuovo === null) return Object.assign(base, { azione: 'tieni' });
  return Object.assign(base, { azione: 'salta', pct: pct, nuovo: nuovo, cieco: cieco });
}
/* La storia della calibrazione di un esercizio, rifatta dallo storico (dalla piu vecchia): chi e aperta a ogni esposizione e cosa decide l ultima.
   null se la calibrazione non riguarda questo esercizio (regola spenta, senza consenso, a tempo, persona fuori, nessun carico stimato nel piano).
   { n: esposizioni fatte, esposizioni: [{ id, aperta }], stato: 'prima' (nessuna esposizione) | 'aperta' (la prossima prescrizione e in calibrazione, decide
     `ultima`) | 'chiusaOra' (si e chiusa con l ultima esposizione) | 'chiusa' (prima), ultima: la decisione sull ultima esposizione (null se gia chiusa prima),
     cieche, m, classe, persona, pesoUltimo } */
function storiaCalibrazione(nome, repsTarget) {
  if (!coachAttivo() || !regolaAttiva('CAR-18') || isTimeBased(nome)) return null;
  const m = findExercise(nome);
  if (!m) return null;
  const persona = personaCalibrazione();
  if (!persona) return null;
  const rec = recordPianoDi(nome);
  if (!rec || !rec.stimato) return null;
  const E = sogliaPartenza('calibrazioneEsposizioni');
  const lista = esposizioniCalibrazione(nome);
  const classe = classePartenza(m);
  let chiusa = false, cieche = 0, ultima = null, chiusaOra = false;
  const esposizioni = lista.map((x, i) => {
    const aperta = !chiusa && i < E;
    ultima = null; chiusaOra = false;
    if (aperta) {
      const reps = x.ex.obiettivo && Number(x.ex.obiettivo.reps) > 0 ? Number(x.ex.obiettivo.reps) : repsTarget;
      ultima = decisioneCalibrazione(x.ex, reps, m, persona, cieche);
      if (ultima.azione === 'salta' && ultima.cieco) cieche++;
      if (ultima.azione === 'chiude' || ultima.azione === 'mancato') { chiusa = true; chiusaOra = true; }
    } else chiusa = true;
    return { id: x.h.id, aperta: aperta, dec: ultima, peso: ultima ? ultima.pesoUltimo : 0 };
  });
  const n = lista.length;
  const fatte = n ? lista[n - 1].ex.sets.filter(s => s.done) : [];
  /* l ultima seduta con l esercizio era di scarico (non e un esposizione): la ripresa dopo lo scarico (MES-06) la decide caricoProssimoBase, la calibrazione non la tocca */
  const ultimaVera = n ? sedutePerEsercizio(nome, 1)[0] : null;
  const dopoScarico = !!(ultimaVera && ultimaVera.h.id !== lista[n - 1].h.id);
  /* e dopo una pausa di 10 giorni o piu il carico scende (CAR-04): non e il momento di salire */
  const dUltima = ultimaVera ? dataSessione(ultimaVera.h) : null;
  const rientro = !!(dUltima && rientroDopoPausa(giorniTra(dUltima, new Date())));
  /* prima: nessuna esposizione · chiusa: era gia chiusa prima dell ultima esposizione · chiusaOra: l ultima l ha chiusa · aperta: decide `ultima` */
  const stato = n === 0 ? 'prima' : (!esposizioni[n - 1].aperta ? 'chiusa' : (chiusaOra ? 'chiusaOra' : 'aperta'));
  return { n: n, esposizioni: esposizioni, precedente: n > 1 ? esposizioni[n - 2] : null, dopoScarico: dopoScarico, rientro: rientro, stato: stato, ultima: ultima, cieche: cieche, m: m, classe: classe, persona: persona,
           pesoUltimo: fatte.length ? Math.max.apply(null, fatte.map(s => Number(s.weight) || 0)) : 0 };
}
/* La calibrazione di questo esercizio e chiusa? (PAR-07: lo storico delle donne conta solo gli esercizi cosi o con RPE >= 7.) false se non c e una calibrazione per lui */
function calibrazioneChiusa(nome) {
  const st = storiaCalibrazione(nome, 0);
  return !!st && st.n > 0 && st.stato !== 'aperta';
}
/* INT-05 e ESI-02 (piano D.6): questa esposizione era in calibrazione? Le serie facili di una partenza bassa voluta non alzano l esigenza del coach.
   h = la voce dello storico, x = la sua voce dell esercizio ({ name, sets }). false se la calibrazione non lo riguarda. */
function calibrazioneNellaSeduta(h, x) {
  if (!h || !x) return false;
  const st = storiaCalibrazione(x.name, Number(x.obiettivo && x.obiettivo.reps) || 0);
  if (!st) return false;
  const i = st.esposizioni.findIndex(e => e.id === h.id);
  return i !== -1 && st.esposizioni[i].aperta;
}

/* Fase 15 BIL della catena 'carico': il salto della calibrazione al posto del carico di caricoProssimoBase, la chiusura con il suo messaggio, il promemoria dell RPE.
   Non tocca lo scarico, la ripresa dopo uno scarico, il rientro dopo una pausa, gli stalli (r.tipo 'scarico', r.stallo) ne la prima esposizione (la nota della prima volta la scrive MOTIVI_STIMA, partenza.js). */
function faseCalibrazione(r, c) {
  if (!r || r.tipo === 'scarico' || r.stallo || isTimeBased(c.nome)) return r;
  const st = storiaCalibrazione(c.nome, Number(c.repsTarget) || 0);
  if (!st || st.n === 0 || st.dopoScarico || st.rientro) return r;
  const forza = SOGLIE_PARTENZA.calibrazioneSalti.forza;
  if (st.stato === 'chiusaOra') {
    /* un mancato subito dopo un salto della calibrazione: il salto era troppo grande, si torna al carico che aveva completato (non -5% su un carico troppo alto) */
    const pre = st.precedente;
    if (st.ultima && st.ultima.azione === 'mancato' && pre && pre.dec && pre.dec.azione === 'salta' && pre.dec.nuovo === st.ultima.pesoUltimo && pre.peso > 0) {
      r.weight = pre.peso; r.reps = Number(c.repsTarget) || r.reps; r.tipo = 'giu'; delete r.piuPausa;
      r.motivo = FRASE_SALTO_TROPPO_GRANDE_PRIMA + virgola(pre.peso) + FRASE_SALTO_TROPPO_GRANDE_DOPO;
      aggiungiPerche(r, 'CAR-18', r.motivo, { forza: forza });
      return r;
    }
    if (st.ultima && st.ultima.azione === 'chiude' && st.ultima.tarato) {   /* un mancato lo gestisce CAR-17, sopra il bersaglio e alla quarta esposizione si chiude senza dire «tarato» */
      /* il carico tarato si ripete una volta (consolida): la progressione normale riparte dalla seduta dopo, invece di aggiungere subito un passo a un carico appena trovato */
      if (st.ultima.pesoUltimo > 0 && (r.weight > st.ultima.pesoUltimo || r.tipo === 'su')) { r.weight = st.ultima.pesoUltimo; r.reps = Number(c.repsTarget) || r.reps; r.tipo = 'fermo'; r.motivo = ''; }
      r.motivo = (r.motivo ? r.motivo + ' • ' : '') + FRASE_CARICO_TARATO;
      aggiungiPerche(r, 'CAR-18', FRASE_CARICO_TARATO, { forza: forza });
    }
    return r;
  }
  if (st.stato !== 'aperta' || !st.ultima) return r;
  const u = st.ultima;
  const senzaRpe = u.rpe === null;
  /* salvaguardie: dolore su questo esercizio, scarico deciso dal coach (CAR-10: niente salti, il carico scende), freno della BIA, prontezza sotto 50 oggi:
     nessun salto e nessun promemoria (decide il resto della catena) */
  const ag = aggiustiCoach() || {}, a = (ag.esercizi || {})[c.nome];
  const pr = leggiProntezza();
  const bloccata = !!(a && (a.blocca || (Number(a.fattore) > 0 && Number(a.fattore) < 1))) || !!(ag.scarico && Number(ag.scarico.sedute) > 0) || frenoBia() ||
    !!(pr && pr.data === ymd(new Date()) && typeof pr.punteggio === 'number' && pr.punteggio < COACH_PARAMETRI.prontezzaMedia);
  if (u.azione === 'tieni') {
    /* mai oltre +25% in una volta, nemmeno con la progressione di prima (CAR-16): se un passo supera il tetto (manubrio da 3 kg) si sale con le ripetizioni */
    const tetto = sogliaPartenza('calibrazioneTettoSalto');
    if (u.pesoUltimo > 0 && r.weight > u.pesoUltimo * (1 + tetto) + 1e-9) {
      const salto = Math.round((r.weight / u.pesoUltimo - 1) * 100), passo = Math.round((r.weight - u.pesoUltimo) * 10) / 10;
      r.weight = u.pesoUltimo; r.reps = (Number(c.repsTarget) || r.reps) + 1; r.tipo = 'su';
      r.motivo = '+' + virgola(passo) + ' kg sarebbe un salto del ' + salto + '%: prima una ripetizione in piu (' + r.reps + ')';
    }
    if (senzaRpe && !bloccata && regolaAttiva('CAR-19')) { r.motivo = (r.motivo ? r.motivo + ' • ' : '') + FRASE_PROMEMORIA_RPE; aggiungiPerche(r, 'CAR-19', FRASE_PROMEMORIA_RPE, { forza: forza }); }
    return r;
  }
  if (u.azione !== 'salta' || bloccata) return r;
  const nuovo = u.nuovo;
  r.weight = nuovo; r.reps = Number(c.repsTarget) || r.reps; r.tipo = 'su'; delete r.piuPausa;
  const quanto = Math.round((nuovo / u.pesoUltimo - 1) * 100);
  const frase = senzaRpe ? 'Calibrazione: serie complete, +' + virgola(Math.round((nuovo - u.pesoUltimo) * 10) / 10) + ' kg'
    : 'Calibrazione: RPE ' + virgola(u.rpe) + ' contro ' + virgola(sogliaPartenza('calibrazioneBersaglioRpe')) + ' previsto, si sale a ' + virgola(nuovo) + ' kg (+' + quanto + '%)';
  const promemoria = senzaRpe && regolaAttiva('CAR-19');
  r.motivo = frase + (promemoria ? ' • ' + FRASE_PROMEMORIA_RPE : '');
  aggiungiPerche(r, 'CAR-18', frase, { forza: forza });
  if (promemoria) aggiungiPerche(r, 'CAR-19', FRASE_PROMEMORIA_RPE, { forza: forza });
  return r;
}
registraFase('carico', 15, 'CAR-18', faseCalibrazione);
