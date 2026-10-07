/* Popolazioni e rientro dopo una pausa: base degli over 65, gravidanza, calendario fermo, rampa e risalita del rientro (ETA-08 a, REC-12 a, CST-01, CST-02, CAR-04, ALG-14)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   POPOLAZIONI E RIENTRO (coach v2, W4-T2 = pacchetto P4-S snello; registro B10, B20, C.2; numeri in sicurezza/soglie-popolazioni.js)
   Tutte salvaguardie che TOLGONO o RIDUCONO (registro C.3): nessuna alza lo stimolo a una popolazione vulnerabile.
   - Over 65 (ETA-08 parte a, SOLO la base di B10): nelle prime 8 settimane del programma, e sempre dai 75 anni, mai sotto 3 ripetizioni in riserva; dopo la base
     mai sotto 3 sui pesi liberi e sul core (classi A, B, E, F) e mai sotto 2 su macchine e cavi (C, D): pavimentoRirPopolazioni, che rirBersaglio applica per ultima.
     Oggi gli over 65 restano comunque a 3-4 (rirBersaglioPerLivello): il «dopo la base» che li porterebbe a 2-3 sulle macchine (ETA-08 parte a) NON c'è, escluso per
     scelta del proprietario; la parte b (pesi liberi pesanti, 6-12 ripetizioni, 70-85%) è bloccata (registro C.2 n. 9). Niente «potenza» nella base, dai 75 anni e
     con il PAR-Q positivo (potenzaAmmessaOver65, la legge il cancello delle tecniche: chiude D-P21 n. 5); mai sotto 8 ripetizioni (fase 90: lo schema 5×3 di CAR-07).
   - Gravidanza o parto recente (REC-12 parte a): la bandiera `profilo.gravidanza` (Opzioni › Il coach) tiene accesa la modalità prudente (PAR-Q) e il coach non scende
     sotto 3 ripetizioni in riserva. inGravidanza(profilo) è la funzione da usare per le guardie degli altri sotto-coach (corpo e nutrizione: P4-C).
     La parte b (esercizi da evitare, posizione supina, ripresa dopo il parto, pavimento pelvico) è bloccata (registro C.2 n. 4): qui non c'è.
   - Rientro dopo una pausa, una catena sola (registro B20; MES-15), solo nei programmi v2 e con il consenso:
       giorni veri dall'ultima seduta   <= 6 nulla · 7-13 la rampa non avanza · 14-27 si riparte dalla prima settimana del blocco · >= 28 nuovo blocco (stessa settimana di
                                        ripartenza, carichi di CAR-04 più bassi)
       CST-01  il calendario si ferma: settimanaProgramma toglie le settimane della pausa (settimaneFermePerPausa, calcolate dallo storico: niente da salvare né da annullare)
       CAR-04  carico per esercizio -10/-20/-30/-50% (rientroDopoPausa): oltre i 65 anni, in una pausa vera (più di 6 giorni senza sedute), i giorni contano doppi
       CST-02  serie: la prima seduta -25% (RIC-05, regole-nuove.js, con la stessa soglia: 14 giorni contati), la seconda -10% (fase 90), poi il piano; +1 ripetizione in
               riserva nelle due sedute (rirExtraRientro), non a chi è già a 3-4
       ALG-14  dopo la seduta del rientro il carico risale fino a quello di prima, al massimo del 5% a seduta (2,5% a chi comincia, ai prudenti e oltre i 65 anni) (fase 90)
     I programmi salvati prima della v2 restano come prima: 14 giorni veri per le serie, giorni veri per i carichi, calendario che scorre.
   ============================================================ */

/* una soglia di soglie-popolazioni.js (undefined se il file non c'è); le soglie si leggono solo durante l'esecuzione */
function sogliaPopolazione(nome) {
  return typeof SOGLIE_POPOLAZIONI !== 'undefined' && SOGLIE_POPOLAZIONI[nome] ? SOGLIE_POPOLAZIONI[nome].v : undefined;
}

/* REC-12 parte a: gravidanza o parto recente, dichiarato in Opzioni › Il coach (profilo.gravidanza). Senza profilo: no. È la funzione per tutte le guardie
   (nessun numero di nutrizione, nessun cedimento, nessuna tecnica intensa); la bandiera tiene accesa anche la modalità prudente (setGravidanzaCoach). */
function inGravidanza(profilo) {
  return !!(profilo && profilo.gravidanza === true);
}

/* B10 (ETA-08 parte a, solo la base): l'over 65 è nella base? Sì nelle prime `settimaneBase` settimane del programma (numero = settimana del programma, 0 o
   assente = non si sa: base), sempre dai `etaSempreBase` anni. Sotto i 65 anni: no */
function inBaseOver65(eta, numero) {
  const O = sogliaPopolazione('over65');
  if (!O || !(Number(eta) >= O.eta)) return false;
  if (Number(eta) >= O.etaSempreBase) return true;
  const n = Number(numero) || ((typeof settimanaProgramma === 'function' ? settimanaProgramma() : null) || {}).numero || 0;
  return !(n > O.settimaneBase);
}

/* B10 e D-P21 n. 5: la «potenza» (salita veloce, solo su macchina: MAV-03) per un over 65 è ammessa solo dopo la base, mai con il PAR-Q positivo. `settimana` = { numero }
   della settimana del programma; null (la generazione: il programma si ripete dalla settimana 1) = la base. P = personaTecniche(brief) */
function potenzaAmmessaOver65(P, settimana) {
  if (!P || !P.over65 || P.parq || P.minore) return false;
  const n = settimana && Number(settimana.numero) >= 1 ? Number(settimana.numero) : 0;
  if (!n) return false;
  const eta = Number(P.eta) || (sogliaPopolazione('over65') || {}).eta;
  return !inBaseOver65(eta, n);
}

/* ETA-08 a e REC-12 a: il pavimento delle ripetizioni in riserva delle popolazioni, applicato per ultimo da rirBersaglio. r = [min, max]; sett = settimana del
   programma (come rirBersaglio). Solo alza: [2, 3] diventa [3, 4], [3, 4] resta. Over 65: nella base 3 su tutto; dopo la base 3 sui pesi liberi e sul core, 2 su
   macchine e cavi (classi C e D, attributo di attributi-esercizi.js). Gravidanza: 3. Gli altri: com'era */
function pavimentoRirPopolazioni(r, nome, sett) {
  if (!Array.isArray(r) || r.length < 2) return r;
  const p = (typeof getProfile === 'function' ? getProfile() : null) || {}, eta = Number(p.age) || 0;
  const O = sogliaPopolazione('over65'), R = sogliaPopolazione('rirOver65');
  let min = 0;
  if (inGravidanza(p)) min = sogliaPopolazione('rirGravidanza') || 0;
  if (O && R && eta >= O.eta) {
    const classe = typeof classeTecnica === 'function' ? classeTecnica(nome) : null;
    min = Math.max(min, inBaseOver65(eta, sett) ? R.base : (classe === 'C' || classe === 'D' ? R.macchine : R.liberi));
  }
  return min > 0 && r[0] < min ? [min, Math.max(r[1], min + 1)] : r;
}

/* ------------------------------------------------------------------------------------------------ il rientro dopo una pausa (B20) */
function programmaV2Rientro(p) {
  const pr = p || (typeof getProgramma === 'function' ? getProgramma() : null);
  return !!(pr && Number(pr.versione) >= 2);
}
/* lo storico delle sedute vere cambia solo quando si salva una seduta: i calcoli che lo scorrono si ricordano finché storico, programma e giorno restano gli stessi */
const MEMORIA_RIENTRO = {};
function ricordaRientro(spazio, extra, fn) {
  let grezzo = '';
  try { grezzo = localStorage.getItem(historyKey()) || ''; } catch (e) { grezzo = ''; }
  const chiave = ymd(new Date()) + '|' + extra;
  const m = MEMORIA_RIENTRO[spazio];
  if (m && m.grezzo === grezzo && m.chiave === chiave) return m.v;
  const v = fn();
  MEMORIA_RIENTRO[spazio] = { grezzo: grezzo, chiave: chiave, v: v };
  return v;
}
/* B20: oltre i 65 anni i giorni di una pausa VERA (più di `pausa.nulla` giorni senza nessuna seduta) contano doppi; con il ritmo normale restano quelli veri.
   gEsercizio = giorni dall'ultima volta con l'esercizio (o della pausa), gPausa = giorni senza nessuna seduta, over65 = vale il conteggio doppio */
function giorniContatiPausa(gEsercizio, gPausa, over65) {
  const P = sogliaPopolazione('pausa'), D = sogliaPopolazione('giorniDoppiOver65');
  const g = Number(gEsercizio) || 0;
  if (!over65 || !P || !D || !(Number(gPausa) > P.nulla)) return g;
  return g * D.fattore;
}
/* il conteggio doppio vale per questa persona adesso? (over 65, programma v2, consenso) */
function giorniDoppiAttivi() {
  const O = sogliaPopolazione('over65');
  return !!(O && programmaV2Rientro() && typeof coachAttivo === 'function' && coachAttivo() && profiloCoach().eta >= O.eta);
}
/* CAR-04 (B20): i giorni di pausa di un esercizio come li conta il rientro (rientroDopoPausa, regole-ricerca.js): oltre i 65 anni, in una pausa vera, doppi */
function giorniPausaContati(g) {
  if (!giorniDoppiAttivi()) return Number(g) || 0;
  return giorniContatiPausa(g, giorniDallUltimaSeduta(), true);
}
/* RIC-05 e CST-02: i giorni del rientro del piano (rientroPiano, regole-nuove.js): 0 se non c'è rientro, altrimenti i giorni veri della pausa.
   Programmi v1 o CST-02 spenta: 14 giorni veri, come prima; v2: la stessa soglia con i giorni contati (doppi oltre i 65 anni in una pausa vera) */
function giorniRientroPiano() {
  const g = giorniDallUltimaSeduta(), S = sogliaPopolazione('rientroSerie');
  if (!S) return g >= 14 ? g : 0;   /* senza le soglie: la regola di prima (RIC-05) */
  const c = regolaAttiva('CST-02') && giorniDoppiAttivi() ? giorniContatiPausa(g, g, true) : g;
  return c >= S.giorni ? g : 0;
}
/* CST-02: a che seduta del rientro siamo. { seduta: 1 (oggi è la prima dopo la pausa), 2 (la seconda), 0 (nessun rientro), giorni (la pausa, veri), doppi (contati doppi) }.
   Una pausa conta se i giorni contati arrivano alla soglia delle serie (14). La seconda seduta: l'ultima seduta era la prima dopo la pausa e da allora nessuna pausa vera */
function statoRientro() {
  const S = sogliaPopolazione('rientroSerie'), P = sogliaPopolazione('pausa');
  if (!S || !P || typeof sedutePassate !== 'function') return { seduta: 0, giorni: 0, doppi: false };
  const doppi = giorniDoppiAttivi();
  return ricordaRientro('stato', String(doppi), () => {
    const s = sedutePassate(), oggi = new Date();
    if (!s.length) return { seduta: 0, giorni: 0, doppi: false };
    const conta = g => doppi ? giorniContatiPausa(g, g, true) : g;
    const g0 = giorniTra(s[0].d, oggi);
    if (conta(g0) >= S.giorni) return { seduta: 1, giorni: g0, doppi: doppi && conta(g0) !== g0 };
    const prima = s.find(x => giorniTra(x.d, s[0].d) > 0);
    if (prima && g0 <= P.nulla) {
      const g1 = giorniTra(prima.d, s[0].d);
      if (conta(g1) >= S.giorni) return { seduta: 2, giorni: g1, doppi: doppi && conta(g1) !== g1 };
    }
    return { seduta: 0, giorni: g0, doppi: false };
  });
}
/* CST-02: una ripetizione in riserva in più nelle prime due sedute dopo la pausa (programmi v2, consenso). Non a chi è già a 3-4: modalità prudente, over 65, minorenni, gravidanza */
function rirExtraRientro(nome) {
  if (!programmaV2Rientro() || typeof coachAttivo !== 'function' || !coachAttivo() || !regolaAttiva('CST-02') || isTimeBased(nome)) return 0;
  const pc = profiloCoach(), O = sogliaPopolazione('over65'), S = sogliaPopolazione('rientroSerie');
  if (!S || pc.prudente || pc.minorenne || (O && pc.eta >= O.eta) || inGravidanza(getProfile())) return 0;
  const st = statoRientro();
  return st.seduta === 1 || st.seduta === 2 ? S.rirPiu : 0;
}

/* CST-01 (MES-15): la prima settimana del blocco in cui cadeva la settimana `w` (una settimana di scarico o di controllo: la prima del blocco dopo) */
function primaSettimanaDelBlocco(p, w) {
  const f = p && Array.isArray(p.fasi) ? p.fasi : [];
  if (!(w >= 1) || w > f.length) return w;
  if (f[w - 1] !== 'carico') return Math.min(w + 1, f.length);
  let i = w - 1;
  while (i > 0 && f[i - 1] === 'carico') i--;
  return i + 1;
}
/* CST-01: quante settimane del calendario non contano perché c'è stata una pausa (si tolgono dalla settimana di settimanaProgramma). Dallo storico, seduta dopo seduta
   dall'inizio del programma (che vale come una seduta della settimana 1) fino a oggi: per ogni intervallo di G giorni veri senza sedute, con G <= `nulla` niente, fino a `ferma`
   la settimana resta quella dell'ultima seduta (la rampa non avanza), oltre si riparte dalla prima settimana del blocco. Solo programmi v2, con il consenso e la regola accesa;
   la settimana non va mai sotto 1 e mai oltre quella del calendario */
function settimaneFermePerPausa(p) {
  const P = sogliaPopolazione('pausa');
  if (!P || !p || !p.inizio || !programmaV2Rientro(p) || !Array.isArray(p.fasi) || typeof sedutePassate !== 'function') return 0;
  if (typeof coachAttivo !== 'function' || !coachAttivo() || !regolaAttiva('CST-01')) return 0;
  return ricordaRientro('ferme', p.inizio + '|' + p.fasi.join(','), () => {
    const inizio = daYmd(p.inizio), oggi = new Date();
    const settCal = d => Math.floor(giorniTra(inizio, lunediDi(d)) / 7) + 1;
    const date = sedutePassate().map(x => x.d).filter(d => giorniTra(inizio, d) >= 0).reverse();   /* dalla piu vecchia */
    let ferme = 0, prec = inizio, wPrec = 1;
    const intervallo = d => {
      const G = giorniTra(prec, d), wCal = Math.max(1, settCal(d) - ferme);
      let w = wCal;
      if (G > P.ferma) w = Math.min(wCal, primaSettimanaDelBlocco(p, wPrec));
      else if (G > P.nulla) w = Math.min(wCal, wPrec);
      ferme += wCal - w;
      return w;
    };
    date.forEach(d => { wPrec = intervallo(d); prec = d; });
    if (giorniTra(inizio, oggi) >= 0) intervallo(oggi);
    return ferme;
  });
}

/* ALG-14: la seduta di rientro di questo esercizio (CAR-04) è una delle ultime `sedute`? Allora { prima: carico di lavoro di prima della pausa, ora: carico dell'ultima seduta }.
   La pausa di allora si conta come la contava il rientro (giorni dell'esercizio, doppi oltre i 65 anni in una pausa vera) */
function rientroRecente(nome, R) {
  const s = sessioniConData(nome, R.sedute + 1), tutte = sedutePassate(), doppi = giorniDoppiAttivi();
  for (let k = 0; k < Math.min(R.sedute, s.length - 1); k++) {
    const dopo = s[k], prima = s[k + 1];
    if (!dopo.data || !prima.data || s.slice(0, k + 1).some(x => x.eraDiScarico)) return null;
    const gEs = giorniTra(prima.data, dopo.data);
    const prec = tutte.find(x => giorniTra(x.d, dopo.data) > 0);
    const gPausa = prec ? giorniTra(prec.d, dopo.data) : gEs;
    if (!rientroDopoPausa(gEs, giorniContatiPausa(gEs, gPausa, doppi))) continue;
    const W0 = caricoDiLavoro(prima.ex), W = caricoDiLavoro(s[0].ex);
    return W0 > 0 && W > 0 ? { prima: W0, ora: W } : null;
  }
  return null;
}

/* frasi del motivo (tradotte: docs/in-arrivo/P4-S.json; i numeri vengono dalle soglie e nel dizionario sono #) */
const FRASI_POPOLAZIONI = {
  giorniDoppi: () => 'dai ' + sogliaPopolazione('over65').eta + ' anni i giorni di pausa contano doppi',
  ripetizioniOver65: () => 'dai ' + sogliaPopolazione('over65').eta + ' anni restano almeno ' + sogliaPopolazione('ripetizioniMinOver65').minimo + ' ripetizioni: invece dello schema 5×3, carico -' +
    Math.round((1 - sogliaPopolazione('ripetizioniMinOver65').caloStallo) * 100) + '% e si ricostruisce',
  secondaSeduta: () => 'seconda seduta dopo la pausa: serie -' + Math.round((1 - sogliaPopolazione('rientroSerie').seconda) * 100) + '%, poi il piano di sempre',
  rirRientro: () => 'dopo la pausa, per due sedute, una ripetizione in riserva in più',
  risalita: (kg, passo) => 'dopo la pausa si risale verso il carico di prima (' + fmtKg(kg) + ' kg), di circa il ' + String(Math.round(passo * 1000) / 10).replace('.', ',') + '% a seduta'
};

/* Fase 90 della catena 'carico' (SEN, regia/fasi.js): i tetti delle popolazioni e la rampa del rientro. Dopo RIC (60) e INT (70), prima della griglia (95), che riporta il
   carico sui pesi veri. Solo alza la prudenza, tranne ALG-14, che riporta verso il carico che c'era prima della pausa e mai oltre */
function fasePopolazioni(r, c) {
  if (!r || !c || isTimeBased(c.nome)) return r;
  const pc = profiloCoach(), O = sogliaPopolazione('over65'), over65 = !!(O && pc.eta >= O.eta);
  /* ETA-08 a (B10): dai 65 anni mai sotto 8 ripetizioni con un carico. L'unica fase che scende sotto è lo schema 5×3 del secondo stallo dei principianti con la forza
     (CAR-07): per un over 65 diventa il -5% dei principianti con le ripetizioni del piano (PCO-01, riga del principiante) */
  const minRip = sogliaPopolazione('ripetizioniMinOver65');
  if (over65 && minRip && Number(r.weight) > 0 && Number(r.reps) < minRip.minimo && Number(c.repsTarget) >= minRip.minimo) {
    r.reps = Number(c.repsTarget);
    if (Number(c.setsBase) > 0) r.sets = Math.min(r.sets, Number(c.setsBase));
    r.weight = caricoSceso(Number(r.weight), minRip.caloStallo, c.nome); r.tipo = 'giu';
    aggiungiPerche(r, 'ETA-08', FRASI_POPOLAZIONI.ripetizioniOver65());
  }
  if (r.tipo === 'scarico' || !programmaV2Rientro() || typeof coachAttivo !== 'function' || !coachAttivo()) return r;
  const st = statoRientro(), S = sogliaPopolazione('rientroSerie');
  /* CAR-04 e RIC-05 (B20): il motivo dice perché un over 65 rientra con meno giorni di pausa */
  if (st.doppi && st.seduta === 1 && /(^|• )[Rr]ientro dopo /.test(String(r.motivo || ''))) aggiungiPerche(r, 'CAR-04', FRASI_POPOLAZIONI.giorniDoppi());
  if (S && regolaAttiva('CST-02') && (st.seduta === 1 || st.seduta === 2)) {
    /* CST-02: la seconda seduta dopo la pausa ha il 10% di serie in meno (la prima ha il -25% di RIC-05); mai sotto 2. Con 3-4 serie il 10% arrotondato non toglie niente */
    if (st.seduta === 2 && r.sets > 2) {
      const n = Math.max(2, Math.round(r.sets * S.seconda));
      if (n < r.sets) { r.sets = n; aggiungiPerche(r, 'CST-02', FRASI_POPOLAZIONI.secondaSeduta()); }
    }
    if (rirExtraRientro(c.nome) > 0) aggiungiPerche(r, 'CST-02', FRASI_POPOLAZIONI.rirRientro());
  }
  /* ALG-14: dopo la seduta del rientro, se la progressione sale, si risale fino al carico di prima, al massimo del 5% a seduta (2,5% a chi comincia, prudenti, minorenni, over 65) */
  const R = sogliaPopolazione('risalita');
  if (R && regolaAttiva('ALG-14') && r.tipo === 'su' && Number(r.weight) > 0) {
    const rr = rientroRecente(c.nome, R);
    if (rr && rr.ora < rr.prima) {
      const lento = pc.livello === 'principiante' || pc.prudente || pc.minorenne || over65 || inGravidanza(getProfile());
      const passo = lento ? R.passoPrudente : R.passo;
      const w = Math.min(rr.prima, caricoSalito(rr.ora, rr.ora * passo, c.nome));
      if (w > Number(r.weight) + 1e-9) {
        r.weight = w; r.reps = Number(c.repsTarget) || r.reps;
        aggiungiPerche(r, 'ALG-14', FRASI_POPOLAZIONI.risalita(rr.prima, passo));
      }
    }
  }
  return r;
}
registraFase('carico', 90, 'SEN', fasePopolazioni);
