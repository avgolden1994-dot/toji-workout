/* Coach 2: repertorio completo
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   COACH 2 — REPERTORIO COMPLETO
   Livello verificato sui numeri, azioni proposte (plateau, rotazione,
   scarico da strain), corpo e alimentazione come informazione,
   seduta saltata, aderenza, fine ciclo. Ogni azione ha il suo motivo
   ed e annullabile.
   ============================================================ */

/* ---- livello dai numeri (moltiplicatori del peso corporeo) ---- */
function pesoCorporeo() {
  const p = getProfile() || {};
  const st = getBiaStorico();
  for (let i = st.length - 1; i >= 0; i--) if (st[i].valori && st[i].valori.peso) return Number(st[i].valori.peso);
  return Number(p.weight) || 0;
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
  const f1 = (v) => String(Math.round(v * 10) / 10).replace('.', ',');
  const testo = Math.round(mesi) + ' <span>mesi regolari</span> · ' + f1(freq) + ' <span>sedute a settimana</span> · <span>difficoltà</span> ' +
    '<span>' + (diff >= 0.6 ? 'alta' : (diff >= 0.35 ? 'media' : 'bassa')) + '</span>';
  return { livello: livello, mesi: mesi, freq: freq, sedute: sed.length, difficolta: diff, testo: testo, dettaglio: [] };
};

/* ---- trovare un equivalente con i 4 criteri ---- */
function prefsCoach() {
  const p = getProfile() || {};
  return { luogo: p.luogo || (p.prefs && p.prefs.luogo) || 'palestra', fastidi: p.fastidi || (p.prefs && p.prefs.fastidi) || [], attrezzi: p.attrezzi || (p.prefs && p.prefs.attrezzi) || 'indifferente',
    attrezziPalestra: p.attrezziPalestra || null, graditi: p.graditi || [], odiati: p.odiati || [] };
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
  showUndo(testo, () => { if (prima !== null) localStorage.setItem(dataKey(), prima); if (primaAg !== null) localStorage.setItem(AGG_KEY(), primaAg); renderPiano(); renderAllenamento(); if (document.getElementById('agent-body')) renderAgent(); }, 6000);
}
window.azioneCoach = function(tipo, nome) {
  const pul = senzaEmoji(nome);
  if (tipo === 'piuSerie') conAnnulla(pul + ': +20% di serie', () => cambiaSerieNelPiano(nome, 1.2));
  if (tipo === 'menoSerie') conAnnulla(pul + ': -20% di serie', () => cambiaSerieNelPiano(nome, 0.8));
  if (tipo === 'variante') {
    const alt = sostituto(nome, prefsCoach(), []);
    if (!alt) { showUndo(trP('Nessuna variante adatta per %s', tr(pul))); return; }
    conAnnulla(pul + ' → ' + senzaEmoji(alt.name), () => sostituisciNelPiano(nome, alt.name, 'Variante scelta dal coach: ' + pul + ' era fermo'));
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
  if (tipo === 'scarico') conAnnulla('Prossime due sedute di scarico', () => { const ag = aggiustiCoach(); ag.scarico = { sedute: 2, motivo: 'carico della settimana troppo alto' }; salvaAggiusti(ag); });
  if (tipo === 'livello') {
    const l = livelloStimato(); if (!l) return;
    const p = getProfile() || {}; p.level = l.livello; localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
    showUndo(trP('Livello aggiornato: %s', tr(l.livello)));
    if (document.getElementById('agent-body')) renderAgent();
  }
};
function bloccoCorrente() { const st = settimanaProgramma(), p = getProgramma(); return st && p && p.blocco ? Math.floor((st.numero - 1) / p.blocco) + 1 : 0; }

/* ---- esercizi fermi (per livello) ---- */
function eserciziFermi() {
  const pc = profiloCoach();
  const soglia = pc.livello === 'principiante' ? 2 : (pc.livello === 'avanzato' ? 8 : 4);
  const perEs = {};
  loadHistory().filter(h => h.sessione && !h.interrotta).forEach(h => h.sessione.forEach(e => { (perEs[e.name] = perEs[e.name] || []).push({ d: dataSessione(h), m: e1rmSeduta(e) }); }));
  const out = [];
  Object.keys(perEs).forEach(n => {
    const v = perEs[n].filter(x => x.m > 0 && x.d);
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
    const fatica = hist.filter(h => { const d = dataSessione(h); return d && giorniTra(inizio, d) >= 0 && giorniTra(d, piuGiorni(inizio, 6)) >= 0; }).map(h => h.feedback.srpe);
    return { carico: tot, monotonia: Math.round(media / sd * 100) / 100, strain: Math.round(tot * media / sd), fatica: fatica.length ? fatica.reduce((t, x) => t + x, 0) / fatica.length : 0 };
  });
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
  const pc = profiloCoach();
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
  if (sw[0].strain && sw[1].strain && sw[2].strain && sw[0].strain > sw[1].strain && sw[1].strain > sw[2].strain && sw[0].fatica >= 8 && !ag.scarico)
    out.push({ testo: 'Il carico della settimana sale da due settimane e la fatica e alta (monotonia ' + String(sw[0].monotonia).replace('.', ',') + '): meglio due sedute di scarico.', bottoni: [['Scarico ora', "azioneCoach('scarico', '')"]] });
  /* livello dai numeri */
  const l = livelloStimato();
  const ordL = ['principiante', 'intermedio', 'avanzato'];
  if (l && ordL.indexOf(l.livello) > ordL.indexOf(pc.livello)) {
    out.push({ testo: '<span>Livello:</span> ' + l.livello + ' \u2014 ' + l.testo + '.', bottoni: [['Aggiorna il livello', "azioneCoach('livello', '')"]] });
  }
  return out;
}

/* ---- corpo, cardio e alimentazione: solo informazione ---- */
function corpoCoach() {
  const out = [];
  const p = getProfile() || {};
  const goals = p.goals || (p.goal ? [p.goal] : []);
  const fase = p.fase || (goals[0] === 'dimagrimento' ? 'deficit' : (goals[0] === 'ricomposizione' ? 'ricomposizione' : (goals[0] === 'massa' ? 'massa' : 'mantenimento')));
  const st = getBiaStorico().filter(x => x.valori && x.valori.peso && x.data);
  const donna = p.sex === 'F' || p.sex === 'donna';
  if (st.length >= 2) {
    const a = st[st.length - 2], b = st[st.length - 1];
    const sett = Math.max(1, giorniTra(daYmd(a.data), daYmd(b.data)) / 7);
    const perc = (b.valori.peso - a.valori.peso) / a.valori.peso * 100 / sett;
    const v = Math.round(perc * 100) / 100;
    if (fase === 'deficit') out.push(v < -1 ? 'Stai calando ' + String(Math.abs(v)).replace('.', ',') + '% del peso a settimana: troppo in fretta, rischi di perdere muscolo. L ideale e 0,5-1%.' :
      (v <= -0.5 ? 'Calo di ' + String(Math.abs(v)).replace('.', ',') + '% a settimana: ritmo ideale per salvare il muscolo.' : 'Il peso scende poco (' + String(v).replace('.', ',') + '% a settimana): in deficit l ideale e 0,5-1%.'));
  }
  if (fase === 'ricomposizione') {
    const bf = st.length ? st[st.length - 1].valori.fmPerc : null;
    const realistica = (p.level === 'principiante') || (bf && bf > (donna ? 32 : 25));
    out.push(realistica ? 'Ricomposizione realistica per te: principiante o con massa grassa alta si costruisce muscolo anche perdendo grasso.' :
      'Per te la ricomposizione e lenta: meglio fasi separate, prima massa poi definizione (o il contrario).');
  }
  const ffm = st.length ? st[st.length - 1].valori.ffm : null;
  const bw = pesoCorporeo();
  if (ffm) out.push('Proteine: circa ' + Math.round(ffm * 2.35) + '-' + Math.round(ffm * 2.75) + ' g al giorno (2,35-2,75 g per kg di massa magra). Informazione, non prescrizione.');
  else if (bw) out.push('Proteine: circa ' + Math.round(bw * (donna ? 1.75 : 2)) + ' g al giorno (' + (donna ? '1,75' : '2') + ' g per kg). Informazione, non prescrizione.');
  if (fase === 'deficit') out.push('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo ne forza.');
  else out.push('Passi: almeno 6-8 mila al giorno. Il cardio non toglie muscolo ne forza, solo un po di esplosivita.');
  if (goals.indexOf('salute') !== -1) {
    const min = loadHistory().filter(h => h.minuti && h.id && Date.now() - h.id < 7 * 864e5).reduce((t, h) => t + h.minuti, 0);
    out.push('Questa settimana ' + min + ' minuti di pesi: tra 30 e 60 si hanno gia i massimi benefici per la salute. Aggiungi 150-300 minuti di attivita aerobica moderata (OMS).');
  }
  out.push('Creatina 3-5 g al giorno: sicura ed efficace con i pesi. Solo un informazione, facoltativa.');
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
  const perEs = {};
  loadHistory().filter(h => h.sessione && !h.interrotta && dataSessione(h) >= inizio).forEach(h => h.sessione.forEach(e => { (perEs[e.name] = perEs[e.name] || []).push(e1rmSeduta(e)); }));
  const nomi = Object.keys(perEs).filter(n => perEs[n].filter(Boolean).length >= 2);
  const saliti = nomi.filter(n => { const v = perEs[n].filter(Boolean); return v[0] > v[v.length - 1] * 1.02; });
  const quota = nomi.length ? saliti.length / nomi.length : 0;
  const esito = aderenza < COACH_PARAMETRI.aderenzaMinima ? 'aderenza' : (quota >= 0.5 ? 'buono' : 'stallo');
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
  const v = soloPreferenze ? { esito: 'buono' } : (verdettoCiclo() || { esito: 'buono' });
  const d = { goals: (p.goals || [p.goal || 'salute']).slice(), level: p.level || 'intermedio', days: p.days || 3, minutes: p.minutes || 60,
    luogo: p.luogo || (p.prefs && p.prefs.luogo) || 'palestra', fastidi: p.fastidi || (p.prefs && p.prefs.fastidi) || [], sonno: p.sonno || (p.prefs && p.prefs.sonno) || 'bene',
    attrezzi: p.attrezzi || (p.prefs && p.prefs.attrezzi) || 'indifferente', sex: p.sex, age: p.age, weight: p.weight, height: p.height, bia: p.bia, parq: p.parq,
    priorita: (p.priorita || []).slice(), attrezziPalestra: p.attrezziPalestra, graditi: p.graditi || [], odiati: (p.odiati || []).slice(),
    orario: p.orario, fase: p.fase, psico: p.psico || null, cicli: (p.cicli || 0) + 1, bloccoTipo: p.bloccoTipo || 'ipertrofia', inizio: 'prossima' };
  const l = livelloStimato();
  const ord = ['principiante', 'intermedio', 'avanzato'];
  if (!soloPreferenze && l && ord.indexOf(l.livello) > ord.indexOf(d.level)) d.level = l.livello;
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
