/* Coach 2: repertorio completo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH 2 — REPERTORIO COMPLETO
   Livello verificato sui numeri, azioni proposte (plateau, rotazione,
   scarico da strain), corpo e alimentazione come informazione,
   seduta saltata, aderenza, fine ciclo. Ogni azione ha il suo motivo
   ed e annullabile.
   Onda 0 del coach v2 (W0-T4):
   - STD-01 STANDARD_FORZA controlla il livello, non lo decide: si propone di salire solo se l anzianita (LIV-01) e almeno 2 alzate
     su 4 concordano; se un avanzato dichiarato e sotto il livello 2 in tutte le alzate misurate si propone di rivederlo. Il
     livello cambia solo col tocco dell utente e si annulla (B20: prima poteva solo salire, e senza annulla).
   - MES-10 lo scarico fuori dalle analisi: esercizi fermi (STA-01), carico della settimana (STR-01), verdetto del ciclo (CIC-01).
   - MES-12 il verdetto di ciclo confronta le migliori sedute di carico, con il 3% di soglia: l ultima seduta e sempre di scarico e
     un intermedio che sale dell 1,5% a settimana risultava "in stallo".
   - ETA-04 sotto i 18 anni niente numeri su peso, cibo e integratori (proteine, passi, creatina).
   Onda 4 (P4-C, guardie del corpo): NUT-01 (solo la guardia) anche per gli over 65 e la gravidanza: niente grammi di proteine, il testo prudente
   (guardiaNutrizione in compone.js); i g/kg di COR-03 restano «Convenzione» (bia/soglie-bia.js).
   ============================================================ */

/* Un numero con decimali dentro una frase che si mostra subito (mai salvata): il segno decimale della lingua scelta, virgola per it/es/de e punto per l inglese.
   Il traduttore (tr) sostituisce i numeri cosi come sono scritti (nella chiave diventano #): se il segno e quello giusto gia qui, la frase esce giusta in ogni lingua.
   Non per i testi salvati (coachNote, aggiusti, motivi dei carichi): congelerebbero la lingua del momento in cui sono nati. */
function decimaleLingua(v) { return String(v).replace('.', lingua() === 'en' ? '.' : ','); }

/* ---- livello dai numeri (moltiplicatori del peso corporeo) ---- */
const STANDARD_FORZA = {
  M: { squat: [0.5, 1, 1.5, 2, 2.5], stacco: [0.75, 1.25, 1.75, 2.25, 2.75], panca: [0.5, 0.75, 1.25, 1.5, 2], military: [0.35, 0.55, 0.75, 1, 1.25] },
  F: { squat: [0.5, 0.75, 1.25, 1.5, 2], stacco: [0.5, 1, 1.5, 2, 2.5], panca: [0.35, 0.5, 0.75, 1, 1.25], military: [0.2, 0.35, 0.5, 0.65, 0.8] }
};
const ALZATE_BASE = { squat: /Squat con Bilanciere/, stacco: /Stacco da Terra/, panca: /Panca Piana Bilanciere/, military: /Military Press/ };
function pesoCorporeo() {
  const p = getProfile() || {};
  const st = getBiaStorico();
  for (let i = st.length - 1; i >= 0; i--) if (st[i].valori && st[i].valori.peso) return Number(st[i].valori.peso);
  return Number(p.weight) || 0;
}
/* STD-01: dove sta ognuna delle 4 alzate base rispetto alle tabelle STANDARD_FORZA (multipli del peso corporeo; tabelle di una fonte di terzi:
   Convenzione, livello 3). Il massimale e il migliore stimato (Epley, fino a 12 ripetizioni) delle sedute di carico. Fuori dai 55-110 kg
   (uomini) e 45-90 kg (donne) il confronto e solo indicativo. livello 0-5 = quante soglie delle tabelle sono raggiunte (1 = non allenato,
   2 = principiante, 3 = intermedio, 4 = avanzato, 5 = elite). */
const STD_SOGLIA_INTERMEDIO = 3, STD_SOGLIA_AVANZATO = 4, STD_MINIMO_ALZATE = 2;
const COACH_GIORNI_REVISIONE_LIVELLO = 28;   /* dopo «Lascia com e» la revisione del livello non si ripropone per 4 settimane */
function livelloStandardForza() {
  const p = getProfile() || {};
  const sesso = (p.sex === 'F' || p.sex === 'donna') ? 'F' : 'M';
  const peso = pesoCorporeo();
  const out = { peso: peso, sesso: sesso, alzate: [], indicativo: false };
  if (!(peso > 0)) return out;
  out.indicativo = sesso === 'M' ? (peso < 55 || peso > 110) : (peso < 45 || peso > 90);
  const migliore = {}, prog = getProgramma();
  tutteLeSedute().forEach(h => { if (h.interrotta) return; (h.sessione || []).forEach(e => {
    if (inScarico(h, e, prog)) return;
    Object.keys(ALZATE_BASE).forEach(k => { if (ALZATE_BASE[k].test(e.name)) migliore[k] = Math.max(migliore[k] || 0, e1rmSeduta(e)); });
  }); });
  Object.keys(ALZATE_BASE).forEach(k => {
    if (!(migliore[k] > 0)) return;
    const rapporto = migliore[k] / peso;
    out.alzate.push({ alzata: k, e1rm: Math.round(migliore[k] * 10) / 10, rapporto: Math.round(rapporto * 100) / 100, livello: STANDARD_FORZA[sesso][k].filter(x => rapporto >= x).length });
  });
  return out;
}
/* STD-01: salita e revisione del livello. salita = il livello stimato (LIV-01) e piu alto di quello dichiarato E le alzate misurate non lo
   smentiscono (con almeno 2 alzate misurate e un peso nel campo di validita, servono 2 alzate sopra la soglia del livello: intermedio 3,
   avanzato 4; con meno dati le tabelle non possono ne confermare ne smentire e resta il criterio di LIV-01). revisione = un avanzato
   dichiarato che in tutte le alzate misurate (almeno 2) e sotto il livello 2: si propone di rivedere il livello o il peso di partenza. */
function proposteLivello(livelloStimatoDaiNumeri) {
  const ord = ['principiante', 'intermedio', 'avanzato'];
  const dich = profiloCoach().livello;
  /* STD-01 non vale per chi e fragile (revisione dell onda 0): over 65, modalita prudente (PAR-Q) e fastidi dichiarati. Senza i numeri delle alzate resta il criterio di LIV-01 */
  const pc = profiloCoach(), fastidi = ((getProfile() || {}).fastidi || []).filter(f => f && f !== 'nessuno');
  const fragile = pc.eta >= 65 || pc.prudente || fastidi.length > 0;
  const std = regolaAttiva('STD-01') && !fragile ? livelloStandardForza() : null;
  const misurabile = !!std && !std.indicativo && std.alzate.length >= STD_MINIMO_ALZATE;
  let salita = null;
  for (let i = ord.indexOf(livelloStimatoDaiNumeri); i > ord.indexOf(dich) && !salita; i--) {
    const soglia = ord[i] === 'avanzato' ? STD_SOGLIA_AVANZATO : STD_SOGLIA_INTERMEDIO;
    if (!misurabile || std.alzate.filter(a => a.livello >= soglia).length >= STD_MINIMO_ALZATE) salita = ord[i];
  }
  const revisione = misurabile && dich === 'avanzato' && std.alzate.every(a => a.livello < 2) ? 'intermedio' : null;
  return { salita: salita, revisione: revisione, standard: std };
}
/* Livello = quanto e come ti alleni, non quanto sollevi.
   Anzianita di allenamento regolare (settimane con almeno 2 sedute),
   frequenza e difficolta delle sedute (fondamentali col bilanciere,
   tecniche, numero di esercizi). Soglie di uso comune (NSCA, Helms):
   principiante sotto i 6 mesi regolari, intermedio da 6 mesi a 2 anni,
   avanzato oltre 2 anni con almeno 3 sedute a settimana e sedute complesse. */
window.livelloStimato = function() {
  const sed = tutteLeSedute().filter(h0 => !h0.interrotta).map(h0 => ({ d: dataSessione(h0), h: h0 })).filter(x => x.d);
  if (sed.length < 6) return null;
  const sett = {};
  sed.forEach(x => { const k = ymd(lunediDi(x.d)); sett[k] = (sett[k] || 0) + 1; });
  const attive = Object.keys(sett).length;
  const regolari = Object.keys(sett).filter(k => sett[k] >= 2).length;
  const mesi = regolari / 4.33;
  const freq = sed.length / Math.max(1, attive);
  let diff = 0;
  sed.forEach(x => {
    const es = x.h.sessione || x.h.exercises || [];
    if (es.some(e => tipoCarico(e.name) === 'pesante')) diff += 0.5;
    if (es.some(e => (e.extra && e.extra.length) || e.tecnica)) diff += 0.2;
    if (es.length >= 5) diff += 0.3;
  });
  diff = diff / sed.length;
  let livello = 'principiante';
  if (mesi >= 6 && freq >= 2) livello = 'intermedio';
  if (mesi >= 24 && freq >= 3 && diff >= 0.5) livello = 'avanzato';
  const f1 = (v) => decimaleLingua(Math.round(v * 10) / 10);
  const testo = Math.round(mesi) + ' <span>mesi regolari</span> · ' + f1(freq) + ' <span>sedute a settimana</span> · <span>difficoltà</span> ' +
    '<span>' + (diff >= 0.6 ? 'alta' : (diff >= 0.35 ? 'media' : 'bassa')) + '</span>';
  const prop = proposteLivello(livello);
  return { livello: livello, mesi: mesi, freq: freq, sedute: sed.length, difficolta: diff, testo: testo, dettaglio: [], salita: prop.salita, revisione: prop.revisione, standard: prop.standard };
};

/* ---- trovare un equivalente con i 4 criteri ---- */
function prefsCoach() {
  const p = getProfile() || {};
  return Object.assign({ luogo: p.luogo || (p.prefs && p.prefs.luogo) || 'palestra', fastidi: p.fastidi || (p.prefs && p.prefs.fastidi) || [], attrezzi: p.attrezzi || (p.prefs && p.prefs.attrezzi) || 'indifferente',
    attrezziPalestra: p.attrezziPalestra || null, graditi: p.graditi || [], odiati: p.odiati || [] }, typeof attrezziSalvati === 'function' ? attrezziSalvati(p, null) : {});   /* CAS-01 (W2-T5) */
}
function sostituisciNelPiano(da, a, nota) {
  const data = loadData();
  const lib = findExercise(a);
  let n = 0;
  DAYS.forEach(g => (data[g] || []).forEach(e => {
    if (e.name !== da || e.completedSets.some(x => x.done)) return;
    e.name = a; n++;
    if (lib) { const pp = pesoPartenza(a); e.weight = pp.peso; e.stimato = pp.stimato ? pp.fonte : undefined; e.completedSets = e.completedSets.map(x => Object.assign({}, x, { weight: pp.peso })); }
    e.coachNote = nota; e.coachTipo = 'nuovo';
  }));
  saveData(data);
  return n;
}
function cambiaSerieNelPiano(nome, fattore) {
  const data = loadData();
  DAYS.forEach(g => (data[g] || []).forEach(e => {
    if (e.name !== nome) return;
    const n = Math.max(2, Math.min(6, Math.round(e.sets * fattore)));
    if (n === e.sets) return;
    e.sets = n; e.setsBase = n;
    e.completedSets = Array.from({ length: n }, (_, i) => e.completedSets[i] || { done: false, reps: e.reps, weight: e.weight, wasBerserk: false });
  }));
  saveData(data);
}
function conAnnulla(testo, fn) {
  const prima = localStorage.getItem(dataKey());
  const primaAg = localStorage.getItem(AGG_KEY());
  fn();
  renderPiano(); renderAllenamento();
  if (document.getElementById('agent-body')) renderAgent();
  /* una chiave che prima non c era si toglie (INT-3a): prima l annulla la lasciava con il valore di dopo, e P3-B la scriveva prima per aggirarlo */
  const ripristina = (k, v) => { if (v !== null) localStorage.setItem(k, v); else localStorage.removeItem(k); };
  showUndo(testo, () => { ripristina(dataKey(), prima); ripristina(AGG_KEY(), primaAg); renderPiano(); renderAllenamento(); if (document.getElementById('agent-body')) renderAgent(); }, 6000);
}
window.azioneCoach = function(tipo, nome) {
  const pul = senzaEmoji(nome);
  if (tipo === 'piuSerie') conAnnulla(pul + ': +20% di serie', () => cambiaSerieNelPiano(nome, 1.2));
  if (tipo === 'menoSerie') conAnnulla(pul + ': -20% di serie', () => cambiaSerieNelPiano(nome, 0.8));
  if (tipo === 'variante') {
    const alt = sostituto(nome, prefsCoach(), []);
    if (!alt) { showUndo(trP('Nessuna variante adatta per %s', tr(pul))); return; }
    conAnnulla(pul + ' → ' + senzaEmoji(alt.name), () => sostituisciNelPiano(nome, alt.name, 'Variante scelta dal coach: ' + pul + ' \u2014 era fermo'));
  }
  if (tipo === 'reset') conAnnulla(pul + ': -10% e si ricostruisce', () => {
    const ag = aggiustiCoach(); ag.esercizi[nome] = { fattore: 0.9, sedute: 1, motivo: 'Reset dopo lo stallo: -10% e si ricostruisce (5/3/1)' }; salvaAggiusti(ag);
  });
  if (tipo === 'ruota') {
    const data = loadData();
    const coppie = [];
    const usati = [].concat.apply([], DAYS.map(g => (data[g] || []).map(e => e.name)));
    DAYS.forEach(g => (data[g] || []).forEach(e => {
      if (tipoCarico(e.name) !== 'isolamento' || isTimeBased(e.name) || coppie.some(c => c[0] === e.name)) return;
      const alt = sostituto(e.name, prefsCoach(), usati);
      if (alt) { coppie.push([e.name, alt.name]); usati.push(alt.name); }
    }));
    if (!coppie.length) {   /* nessun accessorio ha un equivalente dello stesso muscolo: restano quelli attuali, il blocco si segna fatto per non riproporlo */
      const ag0 = aggiustiCoach(); ag0.ruotatoBlocco = bloccoCorrente(); salvaAggiusti(ag0);
      if (document.getElementById('agent-body')) renderAgent();
      showUndo(trP('Nessun accessorio da ruotare con lo stesso muscolo: restano quelli attuali'), null, 6000);
      return;
    }
    conAnnulla('Accessori ruotati: ' + coppie.length, () => {
      coppie.forEach(c => sostituisciNelPiano(c[0], c[1], 'Nuovo blocco: accessorio ruotato (i fondamentali restano)'));
      const ag = aggiustiCoach(); ag.ruotatoBlocco = bloccoCorrente(); salvaAggiusti(ag);
    });
  }
  if (tipo === 'scarico') {
    /* MES-07 (P3-B, programmi v2): anche col tocco dell utente lo scarico passa dalle protezioni (non vicino a un altro scarico, non nelle prime settimane del blocco, non se quello del programma e vicino) */
    const mes07 = typeof valutaScaricoReattivo === 'function' ? valutaScaricoReattivo('S7') : { ok: true };
    if (!mes07.ok) { showUndo(mes07.perche, null, 6000); return; }
    conAnnulla('Prossime due sedute di scarico', () => { const ag = aggiustiCoach(); ag.scarico = voceScaricoReattivo('carico della settimana troppo alto', 2); salvaAggiusti(ag); });   /* scarico deciso dal coach: la voce la fa sicurezza/scarico.js (W1-T3) */
  }
  /* MES-07: «Non ora» (programmi v2): la proposta di scarico non si ripete per qualche giorno; si annulla */
  if (tipo === 'scaricoNonOra') {
    conAnnulla('Va bene, non ora: te lo richiedo più avanti', () => { const ag = aggiustiCoach(); ag.scaricoNonOra = ymd(new Date()); salvaAggiusti(ag); });
  }
  /* STD-01: il livello cambia solo col tocco dell utente e si annulla (prima: solo in salita e senza annulla) */
  if (tipo === 'livello' || tipo === 'rivediLivello') {
    if (!coachAttivo()) return;
    const l = livelloStimato(); if (!l) return;
    const nuovo = tipo === 'livello' ? l.salita : l.revisione;
    if (!nuovo) return;
    const prima = localStorage.getItem(PROFILE_KEY());
    const p = getProfile() || {}; p.level = nuovo; localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
    showUndo(trP('Livello aggiornato: %s', tr(nuovo)), () => { if (prima !== null) localStorage.setItem(PROFILE_KEY(), prima); if (document.getElementById('agent-body')) renderAgent(); }, 6000);
    if (document.getElementById('agent-body')) renderAgent();
  }
  if (tipo === 'livelloOk') {   /* «Lascia com e»: la proposta di revisione non si ripete per 4 settimane */
    const ag = aggiustiCoach(); ag.livelloRivistoIl = ymd(new Date()); salvaAggiusti(ag);
    if (document.getElementById('agent-body')) renderAgent();
  }
};
function bloccoCorrente() { const st = settimanaProgramma(), p = getProgramma(); return st && p && p.blocco ? Math.floor((st.numero - 1) / p.blocco) + 1 : 0; }

/* ---- esercizi fermi (per livello) ---- */
function eserciziFermi() {
  const pc = profiloCoach();
  const soglia = pc.livello === 'principiante' ? 2 : (pc.livello === 'avanzato' ? 8 : 4);
  const perEs = {}, prog = getProgramma();
  loadHistory().filter(h => h.sessione && !h.interrotta).forEach(h => h.sessione.forEach(e => { (perEs[e.name] = perEs[e.name] || []).push({ d: dataSessione(h), m: e1rmSeduta(e), scarico: inScarico(h, e, prog) }); }));
  const out = [];
  Object.keys(perEs).forEach(n => {
    /* MES-10: le sedute di scarico e la prima seduta dopo (riparte dal riferimento con un RIR in piu) non dicono se l esercizio e fermo (dalla piu recente alla piu vecchia) */
    const v = perEs[n].filter((x, i, a) => !x.scarico && !(a[i + 1] && a[i + 1].scarico) && x.m > 0 && x.d);
    if (v.length < 3) return;
    const ultimo = v[0], meglioPrima = Math.max.apply(null, v.slice(1).map(x => x.m));
    const finestra = pc.livello === 'principiante' ? v.slice(0, soglia + 1) : v.filter(x => giorniTra(x.d, ultimo.d) <= soglia * 7 + 3);
    if (finestra.length < 3) return;
    const vecchio = finestra[finestra.length - 1];
    if ((pc.livello === 'principiante' || giorniTra(vecchio.d, ultimo.d) >= soglia * 7) && ultimo.m <= vecchio.m && ultimo.m <= meglioPrima) out.push(n);
  });
  return out;
}

/* ---- carico della settimana: monotonia e strain (Foster) ---- */
function strainSettimane() {
  const prog = getProgramma();
  const hist = loadHistory().filter(h => h.feedback && h.feedback.srpe && h.minuti && !h.interrotta);
  const lun = lunediDi(new Date());
  return [0, 1, 2].map(k => {
    const inizio = piuGiorni(lun, -7 * k);
    const giorni = [0, 1, 2, 3, 4, 5, 6].map(i => {
      const g = ymd(piuGiorni(inizio, i));
      return hist.filter(h => { const d = dataSessione(h); return d && ymd(d) === g; }).reduce((t, h) => t + h.feedback.srpe * h.minuti, 0);
    });
    const tot = giorni.reduce((t, x) => t + x, 0);
    const media = tot / 7;
    const sd = Math.sqrt(giorni.reduce((t, x) => t + (x - media) * (x - media), 0) / 7) || 1;
    const dellaSettimana = hist.filter(h => { const d = dataSessione(h); return d && giorniTra(inizio, d) >= 0 && giorniTra(d, piuGiorni(inizio, 6)) >= 0; });
    const fatica = dellaSettimana.map(h => h.feedback.srpe);
    /* MES-10: una settimana di scarico non e una base di confronto */
    const scarico = faseDelGiorno(inizio, prog) === 'scarico' || (dellaSettimana.length > 0 && dellaSettimana.every(h => inScarico(h, null, prog)));
    return { carico: tot, monotonia: Math.round(media / sd * 100) / 100, strain: Math.round(tot * media / sd), fatica: fatica.length ? fatica.reduce((t, x) => t + x, 0) / fatica.length : 0, scarico: scarico };
  });
}

/* MES-10: c e stato uno scarico (la settimana del programma o sedute scaricate dal coach) negli ultimi `giorni` giorni? Dopo uno scarico non se ne propone un altro */
function scaricoRecente(giorni) {
  const oggi = new Date(), prog = getProgramma();
  if ([0, 7, 14].some(k => k <= giorni && faseDelGiorno(piuGiorni(oggi, -k), prog) === 'scarico')) return true;
  return loadHistory().some(h => { const d = dataSessione(h); return !h.interrotta && d && giorniTra(d, oggi) <= giorni && (h.sessione || []).some(e => inScarico(h, e, prog)); });
}

/* ---- schemi della settimana nel piano attuale ---- */
function controlloSchemi() {
  const data = loadData();
  const n = {};
  DAYS.forEach(g => { if (isRestDay(g)) return; (data[g] || []).forEach(e => { const k = schemaDi(e.name); if (k) n[k] = (n[k] || 0) + 1; }); });
  const mancano = SCHEMI_MOV.filter(x => !n[x[0]]).map(x => x[2]);
  const squilibri = [];
  if (n.spintaO && !n.tirataO) squilibri.push('spinte orizzontali senza tirate orizzontali');
  if (n.spintaV && !n.tirataV) squilibri.push('spinte verticali senza tirate verticali');
  return { mancano: mancano, squilibri: squilibri, vuoto: !Object.keys(n).length };
}

/* ---- le azioni che il coach propone ---- */
function azioniCoach() {
  const out = [];
  /* plateau: volume +-20%, variante, reset */
  const pz = storicoProntezza().slice(-5).map(x => x.punteggio).filter(x => typeof x === 'number');
  const recuperaBene = !pz.length || pz.reduce((t, x) => t + x, 0) / pz.length >= 60;
  const nelPiano = {}; const dp = loadData(); DAYS.forEach(g => (dp[g] || []).forEach(e => nelPiano[e.name] = 1));
  eserciziFermi().filter(n => nelPiano[n]).slice(0, 3).forEach(n => {
    const b = [[recuperaBene ? '+20% serie' : '-20% serie', "azioneCoach('" + (recuperaBene ? 'piuSerie' : 'menoSerie') + "', " + JSON.stringify(n).replace(/"/g, '&quot;') + ")"],
      ['Cambia variante', "azioneCoach('variante', " + JSON.stringify(n).replace(/"/g, '&quot;') + ")"]];
    if (tipoCarico(n) === 'pesante') b.push(['Reset -10%', "azioneCoach('reset', " + JSON.stringify(n).replace(/"/g, '&quot;') + ")"]);
    out.push({ testo: senzaEmoji(n) + ' \u2014 fermo da un po \u2014 ' + (recuperaBene ? 'recuperi bene, prova con piu serie.' : 'il recupero e scarso, meno serie.'), bottoni: b });
  });
  /* rotazione degli accessori a inizio blocco (ipertrofia): i fondamentali restano */
  const st = settimanaProgramma(), p = getProgramma();
  const ag = aggiustiCoach();
  if (st && p && p.blocco && !st.finito && st.numero > 1 && (st.numero - 1) % p.blocco === 0 && ag.ruotatoBlocco !== bloccoCorrente() && (p.goals || [])[0] !== 'forza')
    out.push({ testo: 'Nuovo blocco: cambio gli accessori per stimolare il muscolo da angoli diversi. I fondamentali restano uguali.', bottoni: [['Ruota gli accessori', "azioneCoach('ruota', '')"]] });
  /* strain in salita da due settimane con fatica alta */
  const sw = strainSettimane();
  /* MES-07 (programmi v2): lo strain in salita e il segnale S7 (la fatica dichiarata), non basta da solo: la proposta c e solo se le protezioni e un secondo segnale la permettono, e si puo rimandare («Non ora») */
  const nonOra = programmaConPiano() && ag.scaricoNonOra && giorniTra(daYmd(ag.scaricoNonOra), new Date()) < (sogliaScarico('reattivoProtezioni') || { nonOraGiorni: 0 }).nonOraGiorni;
  if (sw[0].strain && sw[1].strain && sw[2].strain && sw[0].strain > sw[1].strain && sw[1].strain > sw[2].strain && sw[0].fatica >= 8 && !ag.scarico
      && !sw.some(x => x.scarico) && !scaricoRecente(PARAM_ANALISI.giorniDopoScarico) && !nonOra && (typeof valutaScaricoReattivo !== 'function' || valutaScaricoReattivo('S7').ok))
    out.push({ testo: 'Il carico della settimana sale da due settimane e la fatica e alta (monotonia ' + decimaleLingua(sw[0].monotonia) + '): meglio due sedute di scarico.',
      bottoni: [['Scarico ora', "azioneCoach('scarico', '')"]].concat(programmaConPiano() ? [['Non ora', "azioneCoach('scaricoNonOra', '')"]] : []) });
  /* livello dai numeri (STD-01): salita solo se l anzianita e le alzate concordano; revisione se un avanzato dichiarato e sotto i numeri di un principiante */
  const l = livelloStimato();
  if (l && l.salita) {
    out.push({ testo: '<span>Livello:</span> ' + l.salita + ' \u2014 ' + l.testo + '.', bottoni: [['Aggiorna il livello', "azioneCoach('livello', '')"]] });
  } else if (l && l.revisione && !(ag.livelloRivistoIl && giorniTra(daYmd(ag.livelloRivistoIl), new Date()) < COACH_GIORNI_REVISIONE_LIVELLO)) {
    out.push({ testo: 'Hai indicato il livello avanzato, e nei sollevamenti di base i carichi che usi sono ancora bassi: se ti va, puoi rivedere il livello o il peso di partenza. Decidi tu.',
      bottoni: [['Passa a intermedio', "azioneCoach('rivediLivello', '')"], ['Lascia com’è', "azioneCoach('livelloOk', '')"]] });
  }
  return out;
}

/* obiettivo salute: i minuti di pesi della settimana e i minuti di attivita aerobica dell OMS (non e una riga di cibo ne di corpo: la guardia NUT-01 la lascia agli over 65) */
function rigaMinutiSalute() {
  const min = loadHistory().filter(h => h.minuti && h.id && Date.now() - h.id < 7 * 864e5).reduce((t, h) => t + h.minuti, 0);
  return 'Questa settimana ' + min + ' minuti di pesi: tra 30 e 60 si hanno gia i massimi benefici per la salute. Aggiungi 150-300 minuti di attivita aerobica moderata (OMS).';
}
/* ---- corpo, cardio e alimentazione: solo informazione ---- */
function corpoCoach() {
  const out = [];
  const p = getProfile() || {};
  /* ETA-04: sotto i 18 anni niente numeri su peso, cibo e integratori (proteine, passi, creatina, ritmo di calo): si rimanda a un adulto e a un medico o dietista */
  if (regolaAttiva('ETA-04') && Number(p.age) > 0 && Number(p.age) < 18) return [TESTO_NUTRIZIONE_MINORENNE];
  /* NUT-01 (INT-4): minorenni (anche con ETA-04 spenta), over 65 e gravidanza non ricevono ritmo di calo, passi in deficit, creatina ne grammi di proteine: solo il testo prudente, con il rinvio */
  const guardiaCorpo = guardiaNutrizione({}, p);
  if (guardiaCorpo) return guardiaCorpo.gruppo === 'over65' && (p.goals || (p.goal ? [p.goal] : [])).indexOf('salute') !== -1 ? [guardiaCorpo.testo, rigaMinutiSalute()] : [guardiaCorpo.testo];
  const goals = p.goals || (p.goal ? [p.goal] : []);
  const fase = faseCorpo(p);   /* OBI-02: una sola fase del corpo per tutta l app (regia/brief.js) */
  const st = getBiaStorico().filter(x => x.valori && x.valori.peso && x.data);
  const donna = p.sex === 'F' || p.sex === 'donna';
  if (st.length >= 2) {
    const a = st[st.length - 2], b = st[st.length - 1];
    const sett = Math.max(1, giorniTra(daYmd(a.data), daYmd(b.data)) / 7);
    const perc = (b.valori.peso - a.valori.peso) / a.valori.peso * 100 / sett;
    const v = Math.round(perc * 100) / 100;
    if (fase === 'deficit') out.push(v < -1 ? 'Stai calando ' + decimaleLingua(Math.abs(v)) + '% del peso a settimana: troppo in fretta, rischi di perdere muscolo. L ideale e 0,5-1%.' :
      (v <= -0.5 ? 'Calo di ' + decimaleLingua(Math.abs(v)) + '% a settimana: ritmo ideale per salvare il muscolo.' : 'Il peso scende poco (' + decimaleLingua(v) + '% a settimana): in deficit l ideale e 0,5-1%.'));
  }
  if (fase === 'ricomposizione') {
    const bf = st.length ? st[st.length - 1].valori.fmPerc : null;
    const realistica = (p.level === 'principiante') || (bf && bf > (donna ? 32 : 25));
    out.push(realistica ? 'Ricomposizione realistica per te: principiante o con massa grassa alta si costruisce muscolo anche perdendo grasso.' :
      'Per te la ricomposizione e lenta: meglio fasi separate, prima massa poi definizione (o il contrario).');
  }
  const ffm = st.length ? st[st.length - 1].valori.ffm : null;
  const bw = pesoCorporeo();
  /* NUT-01 (guardia, P4-C, compone.js): over 65 e gravidanza (e un minorenne con ETA-04 spenta) non ricevono grammi di proteine: il testo prudente. Per gli altri adulti i g/kg di COR-03 (soglie-bia.js: «Convenzione», non validati) */
  const guardia = guardiaNutrizione({}, p), virg = decimaleLingua;
  const gMin = proteineGKg('proteineMassaMagraMin'), gMax = proteineGKg('proteineMassaMagraMax'), gPeso = proteineGKg(donna ? 'proteinePesoDonna' : 'proteinePesoUomo');
  if (guardia) out.push(guardia.testo);
  else if (ffm) out.push('Proteine: circa ' + Math.round(ffm * gMin) + '-' + Math.round(ffm * gMax) + ' g al giorno (' + virg(gMin) + '-' + virg(gMax) + ' g per kg di massa magra). Informazione, non prescrizione.');
  else if (bw) out.push('Proteine: circa ' + Math.round(bw * gPeso) + ' g al giorno (' + virg(gPeso) + ' g per kg). Informazione, non prescrizione.');
  if (fase === 'deficit') out.push('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo ne forza.');
  else out.push('Passi: almeno 6-8 mila al giorno. Il cardio non toglie muscolo ne forza, solo un po di esplosivita.');
  if (goals.indexOf('salute') !== -1) out.push(rigaMinutiSalute());
  /* NUT-01 (onda 5, m5 della revisione dell'onda 4): con il PAR-Q positivo niente creatina: a chi ha dichiarato una condizione di salute un integratore non si suggerisce (guardia che toglie; parlane col medico) */
  if (!p.parq) out.push('Creatina 3-5 g al giorno: sicura ed efficace con i pesi. Solo un informazione, facoltativa.');
  return out;
}

/* ---- seduta saltata: tre scelte (sposta, slitta, salta) ---- */
function sedutaSaltata() {
  if (!coachAttivo()) return null;
  const cal = loadCal();
  const oggi = new Date();
  const lun = lunediDi(oggi);
  for (let i = giorniTra(lun, oggi) - 1; i >= 0; i--) {
    const k = ymd(piuGiorni(lun, i)), v = cal[k];
    if (v && !v.done && !v.rest && !v.saltato && !v.spostato) return { k: k, v: v };
  }
  return null;
}
function prossimoGiornoLibero(cal, da) {
  const dom = piuGiorni(lunediDi(da), 6);
  for (let d = new Date(da.getFullYear(), da.getMonth(), da.getDate()); d <= dom; d = piuGiorni(d, 1)) {
    const v = cal[ymd(d)];
    if (!v || (v.rest && !v.done)) return d;
  }
  return null;
}
function htmlSedutaSaltata() {
  const s0 = sedutaSaltata();
  if (!s0) return '';
  const cal = loadCal();
  const libero = prossimoGiornoLibero(cal, new Date());
  const q = JSON.stringify(s0.k).replace(/"/g, '&quot;');
  const psB = psicoCoach((getProfile() || {}).psico);
  return '<div class="card og-saltata"><div class="og-dol-t">' + ico('calendario') + ' Allenamento saltato</div>' +
    '<p><b>' + escapeHtml(s0.v.title || 'Allenamento') + '</b> \u00B7 <span data-no-tr>' + daYmd(s0.k).toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric' }) + '</span></p>' +
    (psB.colpa || psB.tuttoNiente ? '<p class="og-muted">Un allenamento saltato non cancella i progressi: conta la media delle settimane.</p>' : '') +
    '<div class="og-dol-b og-tre">' +
      (psB.pianoB === 'corta' || psB.tuttoNiente ? '<button class="btn-main" onclick="sceltaSaltata(\'corta\', ' + q + ')">Seduta corta ora</button>' : '') +
      (psB.pianoB === 'casa' ? '<button class="btn-main" onclick="sceltaSaltata(\'casa\', ' + q + ')">20 minuti a casa</button>' : '') +
      (libero ? '<button class="' + (psB.pianoB === 'corta' || psB.pianoB === 'casa' || psB.tuttoNiente ? 'btn-archive' : 'btn-main') + '" onclick="sceltaSaltata(\'sposta\', ' + q + ')"><span>Sposta a</span> <span data-no-tr>' + libero.toLocaleDateString(LOCALE(), { weekday: 'short', day: 'numeric' }) + '</span></button>' : '') +
      '<button class="btn-archive" onclick="sceltaSaltata(\'slitta\', ' + q + ')">Slitta la settimana</button>' +
      '<button class="btn-archive" onclick="sceltaSaltata(\'salta\', ' + q + ')">Salta</button></div></div>';
}
window.sceltaSaltata = function(tipo, k) {
  const prima = localStorage.getItem(calKey());
  const cal = loadCal();
  const v = cal[k];
  if (!v) return;
  let msg = '';
  if (tipo === 'corta' || tipo === 'casa') {
    const es = sedutaPianoB(tipo, v);
    v.saltato = true; cal[k] = v; saveCal(cal);
    liberaTipo = 'libera';
    avviaSpeciale(es, tipo === 'casa' ? 'Seduta a casa' : 'Seduta corta');
    return;
  }
  if (tipo === 'salta') { v.saltato = true; msg = 'Saltato: si riparte dal prossimo'; }
  if (tipo === 'sposta') {
    const d = prossimoGiornoLibero(cal, new Date());
    if (!d) { showUndo('Nessun giorno libero in questa settimana'); return; }
    cal[ymd(d)] = Object.assign({}, v, { daSpostato: k }); delete cal[ymd(d)].saltato;
    cal[k] = { spostato: ymd(d), rest: true, title: 'Spostato' };
    msg = 'Spostato: ' + d.toLocaleDateString(LOCALE(), { weekday: 'long' });
  }
  if (tipo === 'slitta') {
    const dom = piuGiorni(lunediDi(daYmd(k)), 6);
    const giorni = [];
    for (let d = daYmd(k); d <= dom; d = piuGiorni(d, 1)) giorni.push(ymd(d));
    const pianificati = giorni.filter(g => cal[g] && !cal[g].done && !cal[g].rest && (g === k || g >= ymd(new Date())));
    let persi = 0;
    for (let i = pianificati.length - 1; i >= 0; i--) {
      const g = pianificati[i], nuovo = ymd(piuGiorni(daYmd(g), 1));
      if (daYmd(nuovo) > dom || (cal[nuovo] && cal[nuovo].done)) { persi++; delete cal[g]; continue; }
      cal[nuovo] = Object.assign({}, cal[g]); delete cal[g];
    }
    if (!cal[k]) cal[k] = { spostato: 'slitta', rest: true, title: 'Slittato' };
    msg = 'Settimana slittata di un giorno' + (persi ? ': l ultima seduta non ci sta ed esce' : '');
  }
  saveCal(cal);
  renderOggi(); if (typeof renderMonthCal === 'function') renderMonthCal();
  showUndo(msg, () => { if (prima !== null) localStorage.setItem(calKey(), prima); renderOggi(); renderMonthCal(); }, 6000);
};

/* ---- aderenza sotto il 70% per due settimane: prima si chiede perche ---- */
function aderenzaDueSettimane() {
  const cal = loadCal();
  const oggi = new Date();
  let previste = 0, fatte = 0;
  for (let i = 1; i <= 14; i++) {
    const v = cal[ymd(piuGiorni(oggi, -i))];
    if (v && !v.rest) { previste++; if (v.done) fatte++; }
  }
  return { previste: previste, fatte: fatte };
}
function htmlAderenza() {
  if (!coachAttivo()) return '';
  const a = aderenzaDueSettimane();
  const ag = aggiustiCoach();
  if (a.previste < 4 || a.fatte / a.previste >= COACH_PARAMETRI.aderenzaMinima) return '';
  if (ag.aderenzaChiesta && giorniTra(daYmd(ag.aderenzaChiesta), new Date()) < 14) return '';
  return '<div class="card og-saltata"><div class="og-dol-t">' + ico('idea') + ' Parliamone</div>' +
    '<p><span>Nelle ultime due settimane</span>: ' + a.fatte + ' / ' + a.previste + '. <span>Cosa ti frena di più?</span></p>' +
    '<div class="og-dol-b og-tre"><button class="btn-archive" onclick="rispostaAderenza(\'tempo\')">Poco tempo</button>' +
    '<button class="btn-archive" onclick="rispostaAderenza(\'voglia\')">Poca voglia</button>' +
    '<button class="btn-archive" onclick="rispostaAderenza(\'dolore\')">Dolori</button></div></div>';
}
window.rispostaAderenza = function(motivo) {
  const ag = aggiustiCoach(); ag.aderenzaChiesta = ymd(new Date()); salvaAggiusti(ag);
  if (motivo === 'tempo') {
    conAnnulla('Sedute piu corte: tolto l ultimo accessorio di ogni giorno', () => {
      const data = loadData();
      DAYS.forEach(g => { const l = data[g] || []; if (l.length > 3) { const i = l.map(e => tipoCarico(e.name)).lastIndexOf('isolamento'); if (i !== -1) l.splice(i, 1); } });
      saveData(data);
    });
  } else if (motivo === 'voglia') {
    riduciFrequenza();
    showUndo('Un giorno in meno. Scegli in Opzioni > Il coach gli esercizi che ti piacciono: il piacere conta piu di tutto.', null, 7000);
  } else {
    showUndo('Segnala il dolore a fine seduta: il coach alleggerisce o cambia esercizio.', null, 6000);
  }
  renderOggi();
};

/* ---- orario abituale: la costanza dell orario crea l abitudine ---- */
function htmlOrario(voce) {
  const p = getProfile() || {};
  if (!coachAttivo() || !p.orario || !voce || voce.done || voce.rest) return '';
  const [h, m] = String(p.orario).split(':').map(Number);
  const ora = new Date(), soglia = new Date(); soglia.setHours(h || 0, (m || 0) + 60, 0, 0);
  if (ora < soglia || ora.getHours() >= 23) return '';
  return '<div class="og-orario">' + ico('timer') + ' <span>Di solito ti alleni alle</span> ' + escapeHtml(p.orario) + ': <span>oggi tocca a</span> ' + escapeHtml(voce.title || '') + '</div>';
}

/* ---- fine ciclo: il report decide il ciclo dopo ---- */
function verdettoCiclo() {
  const p = getProgramma();
  if (!p) return null;
  const inizio = daYmd(p.inizio);
  const cal = loadCal();
  let previste = 0, fatte = 0;
  for (let i = 0; i < p.settimane * 7; i++) { const v = cal[ymd(piuGiorni(inizio, i))]; if (v && !v.rest) { previste++; if (v.done) fatte++; } }
  const aderenza = previste ? fatte / previste : 0;
  /* MES-12: l ultima seduta di un ciclo e sempre di scarico, quindi l ultima contro la prima dava "stallo" anche a chi saliva dell 1,5% a settimana.
     Per esercizio si confronta la media delle 3 migliori sedute di CARICO degli ultimi 2 blocchi con quella delle 3 prime, e conta solo
     una salita oltre il 3% (il rumore del RIR). Con la regola spenta: l ultima contro la prima, oltre il 2% (come prima). */
  const nuova = regolaAttiva('MES-12');
  const perEs = {}, prog = p;
  const dalBlocchi = piuGiorni(inizio, Math.max(0, (p.settimane || 0) - 2 * (p.blocco || p.settimane || 0)) * 7);   /* inizio degli ultimi 2 blocchi */
  loadHistory().filter(h => h.sessione && !h.interrotta && dataSessione(h) >= inizio).forEach(h => h.sessione.forEach(e => {
    const m = e1rmSeduta(e);
    if (nuova ? (m > 0 && !inScarico(h, e, prog)) : true) (perEs[e.name] = perEs[e.name] || []).push({ m: m, ultimi: dataSessione(h) >= dalBlocchi });   /* dalla piu recente */
  }));
  /* MES-12 (revisione dell onda 0): la mediana, non la media delle migliori: il massimo di misure rumorose gonfiava la salita e lo stallo non scattava quasi mai */
  const mediana3 = (a) => { const t = a.slice(0, 3).sort((x, y) => x - y); return t[Math.floor(t.length / 2)]; };
  const misure = (n) => perEs[n].filter(x => x.m > 0);
  const nomi = Object.keys(perEs).filter(n => misure(n).length >= 2);
  const saliti = nomi.filter(n => {
    const v = misure(n);
    if (!nuova) return v[0].m > v[v.length - 1].m * 1.02;
    const prime = mediana3(v.map(x => x.m).reverse());                                            /* le 3 prime sedute di carico del ciclo */
    const recenti = mediana3(v.map(x => x.m));                                                    /* le 3 piu recenti (v e dalla piu recente) */
    return recenti > prime * (1 + PARAM_ANALISI.rumoreE1rm);
  });
  const quota = nomi.length ? saliti.length / nomi.length : 0;
  /* con meno di 2 esercizi misurabili non si puo dire "stallo": si dice "buono" (MES-12) */
  const esito = aderenza < COACH_PARAMETRI.aderenzaMinima ? 'aderenza' : (quota >= 0.5 || (nuova && nomi.length < 2) ? 'buono' : 'stallo');
  return { aderenza: Math.round(aderenza * 100), quota: Math.round(quota * 100), esito: esito };
}
function htmlFineCiclo() {
  const st = coachAttivo() ? settimanaProgramma() : null;
  if (!st || !st.finito) return '';
  const v = verdettoCiclo();
  if (!v) return '';
  const testo = { buono: 'Progressi buoni: stesso schema, si riparte dai carichi raggiunti.',
    stallo: 'Progressi fermi: nuovo ciclo con accessori diversi e un blocco ' + (((getProfile() || {}).bloccoTipo === 'forza') ? 'di ipertrofia' : 'di forza') + '.',
    aderenza: 'Ti sei allenato poco: il prossimo ciclo ha un giorno in meno o sedute piu corte.' }[v.esito];
  return '<div class="card og-saltata"><div class="og-dol-t">' + ico('bandiera') + ' Ciclo concluso</div>' +
    '<p><span>Sedute fatte</span>: ' + v.aderenza + '% • <span>esercizi migliorati</span>: ' + v.quota + '%</p><p>' + testo + '</p>' +
    '<button class="btn-main" onclick="nuovoCiclo()">Crea il ciclo successivo</button></div>';
}
window.nuovoCiclo = function(soloPreferenze) {
  const p = getProfile() || {};
  /* ETA-01: un profilo con un'eta da 1 a 12 anni non ottiene un nuovo programma (buildProgram lancerebbe l'errore); l'eta non detta resta «adulto» come per i programmi gia salvati */
  if (p.age && etaPerProgramma(p.age).motivo === 'sotto-minimo') { showUndo(etaPerProgramma(p.age).messaggio); return; }
  const v = soloPreferenze ? { esito: 'buono' } : (verdettoCiclo() || { esito: 'buono' });
  const d = { goals: (p.goals || [p.goal || 'salute']).slice(), level: p.level || 'intermedio', days: p.days || 3, minutes: p.minutes || 60,
    luogo: p.luogo || (p.prefs && p.prefs.luogo) || 'palestra', fastidi: p.fastidi || (p.prefs && p.prefs.fastidi) || [], sonno: p.sonno || (p.prefs && p.prefs.sonno) || 'bene',
    attrezzi: p.attrezzi || (p.prefs && p.prefs.attrezzi) || 'indifferente', sex: p.sex, age: p.age, weight: p.weight, height: p.height, bia: p.bia, parq: p.parq,
    priorita: (p.priorita || []).slice(), attrezziPalestra: p.attrezziPalestra, graditi: p.graditi || [], odiati: (p.odiati || []).slice(),
    orario: p.orario, fase: p.fase, psico: p.psico || null, cicli: (p.cicli || 0) + 1, bloccoTipo: p.bloccoTipo || 'ipertrofia', inizio: 'prossima' };
  const l = livelloStimato();
  if (!soloPreferenze && l && l.salita) d.level = l.salita;   /* STD-01: sale solo se anzianita e alzate concordano */
  if (v.esito === 'aderenza') { if (d.days > 2) d.days--; else d.minutes = Math.max(30, d.minutes - 15); }
  if (v.esito === 'stallo') {
    /* si alterna un blocco ipertrofia e uno forza; gli accessori cambiano */
    d.bloccoTipo = d.bloccoTipo === 'forza' ? 'ipertrofia' : 'forza';
    if (d.bloccoTipo === 'forza' && d.goals.indexOf('forza') === -1) d.goals = [d.goals[0], 'forza'].concat(d.goals.slice(1)).slice(0, 3);
    if (d.bloccoTipo === 'ipertrofia') d.goals = d.goals.filter(g => g !== 'forza' || d.goals[0] === 'forza');
    const data = loadData();
    DAYS.forEach(g => (data[g] || []).forEach(e => { if (tipoCarico(e.name) === 'isolamento' && d.odiati.indexOf(e.name) === -1) d.odiati.push(e.name); }));
    d.odiatiTemporanei = true;
  }
  /* dopo 3 blocchi di specializzazione, uno bilanciato */
  if (d.priorita.length && d.level === 'avanzato') { d.cicliSpec = (p.cicliSpec || 0) + 1; if (d.cicliSpec > 3) { d.priorita = []; d.cicliSpec = 0; } }
  const odiatiVeri = (p.odiati || []).slice();
  onbData = d;
  applyGeneratedProgram();
  const p2 = getProfile() || {};
  p2.odiati = odiatiVeri; p2.cicliSpec = d.cicliSpec || 0;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p2));
  if (document.getElementById('agent-sheet')) closeAgent();
  renderOggi();
};
