/* Agente coach e consigli del coach 2
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   AGENTE COACH
   Segue il programma: in che settimana sei, cosa succede ai carichi e
   perche, come cambia il corpo tra una BIA e l altra, e cosa conviene
   fare adesso. Raccoglie i dati, li legge, propone. Non decide al
   posto tuo: i carichi proposti restano modificabili in seduta.
   ============================================================ */
function deltaTesto(a, b, unita, meglioSu) {
  if (a === undefined || a === null || b === undefined || b === null) return '';
  const d = Math.round((b - a) * 10) / 10;
  if (d === 0) return '<span class="ag-d">=</span>';
  const buono = meglioSu === null ? null : (d > 0) === meglioSu;
  return '<span class="ag-d ' + (buono === null ? '' : (buono ? 'su' : 'giu')) + '">' + (d > 0 ? '+' : '') + d + unita + '</span>';
}


/* ============================================================
   CONSIGLI DEL COACH 2
   - Primo mese: l obiettivo e esserci (studio 2026 su 389.481 utenti:
     la costanza nei primi 28 giorni predice chi continua dopo un anno).
   - Plateau (RippedBody/Helms): fermo per 2 sedute (principiante),
     3-4 settimane (intermedio), 2 mesi (avanzato) -> controlli in ordine.
   - Carico di seduta (Foster): fatica x minuti; settimana molto piu
     pesante della media delle 3 prima -> attenzione al recupero.
   ============================================================ */
function consigliCoach2(hist) {
  const out = [];
  const pc = profiloCoach();
  const vere = hist.filter(h => h.sessione && !h.interrotta);
  if (pc.prudente) out.push('⚠ Modalita prudente (questionario di salute): lascia sempre almeno 3 ripetizioni in riserva e senti il medico prima di sforzi intensi.');
  const sp = storicoProntezza().slice(-3);
  if (sp.length >= 2 && sp.filter(x => x.sonno === 0).length >= 2) out.push('\u{1F634} Hai dormito poco piu notti: i multiarticolari calano, gli isolamenti no. Tieni gli isolamenti e alleggerisci i fondamentali.');
  if (pc.eta >= 65) out.push('\u{1F4AA} Dai 65 anni: niente cedimento, 5 minuti di equilibrio a fine seduta (stare su un piede, camminare sulla linea) e pause brevi da recuperare con calma.');
  /* primo mese */
  if (vere.length) {
    const prima = vere.map(dataSessione).filter(Boolean).sort((a, b) => a - b)[0];
    const g = prima ? giorniTra(prima, new Date()) : 99;
    if (g < 28) {
      const sett = Math.max(1, Math.ceil((g + 1) / 7));
      const media = Math.round(vere.length / sett * 10) / 10;
      out.push('\u{1F4C5} Primo mese: conta esserci, non il volume. Stai facendo ' + String(media).replace('.', ',') + ' sedute a settimana' + (media >= 2 ? ': ottimo, continua cosi.' : ': punta ad almeno 2.'));
    }
  }
  /* plateau per esercizio */
  const soglia = pc.livello === 'principiante' ? 2 : (pc.livello === 'avanzato' ? 8 : 4);
  const perEs = {};
  vere.forEach(h => h.sessione.forEach(e => { (perEs[e.name] = perEs[e.name] || []).push({ d: dataSessione(h), m: e1rmSeduta(e) }); }));
  const fermi = [];
  Object.keys(perEs).forEach(n => {
    const v = perEs[n].filter(x => x.m > 0 && x.d);
    if (v.length < 3) return;
    const ultimo = v[0], meglioPrima = Math.max.apply(null, v.slice(1).map(x => x.m));
    const finestra = pc.livello === 'principiante' ? v.slice(0, soglia + 1) : v.filter(x => giorniTra(x.d, ultimo.d) <= soglia * 7 + 3);
    if (finestra.length < 3) return;
    const vecchio = finestra[finestra.length - 1];
    const span = giorniTra(vecchio.d, ultimo.d);
    if ((pc.livello === 'principiante' || span >= soglia * 7) && ultimo.m <= vecchio.m && ultimo.m <= meglioPrima) fermi.push(senzaEmoji(n));
  });
  if (fermi.length) {
    const controlli = [];
    if (pc.sonnoMale) controlli.push('sonno di almeno 7 ore');
    controlli.push('proteine a sufficienza', 'serie vicine al cedimento (spesso si sottostima)', 'ogni esercizio almeno 2 volte a settimana', 'tecnica (fatti un video)');
    out.push('\u{1F4CA} Progressi fermi su: ' + fermi.slice(0, 3).join(', ') + ' \u2014 controlla in ordine: ' + controlli.join(', ') + ' \u2014 se tutto va, il coach cambia range di ripetizioni o variante.');
  }
  /* carico di seduta (RPE di seduta x minuti) */
  const conCarico = vere.filter(h => h.feedback && h.feedback.srpe && h.minuti);
  if (conCarico.length >= 4) {
    const lun = lunediDi(new Date());
    const caricoSett = (k) => conCarico.filter(h => { const d = dataSessione(h); return d && giorniTra(piuGiorni(lun, -7 * k), d) >= 0 && giorniTra(d, piuGiorni(lun, -7 * k + 6)) >= 0; })
      .reduce((t, h) => t + h.feedback.srpe * h.minuti, 0);
    const ora = caricoSett(0), prec = [1, 2, 3].map(caricoSett).filter(x => x > 0);
    if (ora && prec.length >= 2) {
      const media = prec.reduce((t, x) => t + x, 0) / prec.length;
      if (ora > media * 1.5) out.push('⚠ Questa settimana il carico (fatica x minuti) e ' + Math.round(ora / media * 10) / 10 + ' volte la media delle precedenti: dormi bene e non aggiungere lavoro extra.');
    }
  }
  return out;
}

function consigliAgente() {
  const out = [];
  const prof = getProfile() || {};
  const goals = prof.goals || (prof.goal ? [prof.goal] : []);
  const st = getBiaStorico();
  const hist = loadHistory();
  const sett = settimanaProgramma();

  if (sett && sett.fase === 'scarico') out.push('\u{1F4A4} Settimana di scarico: meno serie e carichi piu leggeri. Non e tempo perso, serve a ripartire piu forte.');
  if (sett && !sett.finito && sett.fase === 'carico' && sett.numero < sett.totale && getProgramma().fasi[sett.numero] === 'scarico') out.push('\u{1F4C5} La prossima settimana e di scarico.');
  if (sett && sett.finito) out.push('\u{1F3C1} Il programma e concluso. Fai una nuova BIA e ricrea il programma: ripartiremo dai carichi raggiunti.');
  consigliCoach2(hist).forEach(x => out.push(x));

  const ultimo = hist[0];
  if (hist.length && ultimo) {
    const giorniFa = Math.floor((Date.now() - (ultimo.id || Date.now())) / 86400000);
    if (ultimo.id && giorniFa >= 10) out.push('\u26A0\uFE0F Sono ' + giorniFa + ' giorni dall ultimo allenamento: dopo poche settimane di stop si inizia a perdere cio che si e costruito. Riparti con i carichi un po piu leggeri.');
  }

  if (st.length >= 2) {
    const a = st[0].valori, b = st[st.length - 1].valori;
    if (a.ffm && b.ffm) {
      const d = b.ffm - a.ffm;
      if (d >= 0.5) out.push('\u{1F4C8} Massa magra +' + (Math.round(d * 10) / 10) + ' kg dalla prima BIA: il programma sta funzionando.');
      if (d <= -1) out.push('\u{1F6D1} Massa magra in calo: carichi fermi finche non si stabilizza. Controlla sonno e proteine; se stai dimagrendo, un deficit troppo forte costa muscolo.');
    }
    if (a.fmPerc && b.fmPerc && goals.indexOf('dimagrimento') !== -1) {
      if (b.fmPerc >= a.fmPerc) out.push('\u{1F525} La massa grassa non scende: aggiungi cardio leggero e recuperi piu brevi. L alimentazione conta piu dell allenamento, qui.');
      else out.push('\u2705 Massa grassa ' + (Math.round((b.fmPerc - a.fmPerc) * 10) / 10) + ' punti: nella direzione giusta.');
    }
  } else if (st.length === 1) {
    out.push('\u{1F4CA} Hai una sola BIA: rifalla tra 4-6 settimane, nelle stesse condizioni (mattino, a digiuno), cosi posso confrontare.');
  } else {
    out.push('\u{1F4CA} Nessuna BIA salvata: caricarne una mi permette di capire se stai costruendo muscolo o perdendo grasso.');
  }
  return out;
}

window.openAgent = function() {
  document.getElementById('agent-sheet').classList.remove('hidden');
  renderAgent();
};
window.closeAgent = function() { document.getElementById('agent-sheet').classList.add('hidden'); };

window.renderAgent = function() {
  const body = document.getElementById('agent-body');
  if (!coachAttivo()) {
    body.innerHTML = '<div class="dv-empty">\u{1F512}<br>Il coach usa i tuoi dati (obiettivi, BIA, storico) e per questo serve il tuo consenso.<br><br>Senza consenso l app funziona a mano: costruisci e segui i tuoi allenamenti.</div>' +
      '<button class="btn-start-workout" onclick="closeAgent(); switchTab(\'impostazioni\');">Vai a Privacy e dati</button>';
    return;
  }
  const p = getProgramma();
  const sett = settimanaProgramma();
  let html = '';

  /* ---- il programma ---- */
  if (p && sett) {
    const perc = Math.min(100, Math.max(0, Math.round(((Math.min(sett.numero, p.settimane) - (sett.finito ? 0 : 1)) / p.settimane) * 100)));
    const fine = piuGiorni(daYmd(p.inizio), p.settimane * 7 - 1);
    html += '<div class="card"><div class="section-title">Il programma</div>' +
      '<div class="res-big">' + escapeHtml(p.split) + '</div>' +
      '<div class="res-line"><span>Settimana</span><b>' + (sett.finito ? 'concluso' : sett.numero + ' di ' + p.settimane) + '</b></div>' +
      (sett.fase ? '<div class="res-line"><span>Fase</span><b>' + (sett.fase === 'scarico' ? '\u{1F4A4} scarico' : '\u{1F4C8} carico') + '</b></div>' : '') +
      '<div class="res-line"><span>Termina</span><b>' + fine.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long' }) + '</b></div>' +
      '<div class="wday-progress" style="margin-top:var(--sp-3);"><span style="width:' + perc + '%"></span></div>' +
      '</div>';
  } else {
    html += '<div class="card"><div class="section-title">Il programma</div>' +
      '<div class="set-about" style="margin-top:0;">Non hai ancora un programma del coach.</div>' +
      '<button class="btn-start-workout" onclick="closeAgent(); restartOnboarding();">Crea il programma</button></div>';
  }

  /* ---- i consigli ---- */
  const c = consigliAgente();
  if (c.length) html += '<div class="card"><div class="section-title">Cosa ti dico adesso</div>' +
    c.map(x => '<div class="ag-tip">' + escapeHtml(x) + '</div>').join('') + '</div>';

  /* ---- le azioni proposte ---- */
  const az = azioniCoach();
  if (az.length) html += '<div class="card"><div class="section-title">Azioni del coach</div>' +
    az.map(a => '<div class="ag-az"><div class="ag-tip">' + escapeHtml(a.testo) + '</div><div class="ag-az-b">' +
      a.bottoni.map(b => '<button class="set-row-btn" onclick="' + b[1] + '">' + escapeHtml(b[0]) + '</button>').join('') + '</div></div>').join('') + '</div>';

  /* ---- la settimana: schemi di movimento ---- */
  const cs = controlloSchemi();
  if (!cs.vuoto && (cs.mancano.length || cs.squilibri.length)) html += '<div class="card"><div class="section-title">Equilibrio della settimana</div>' +
    (cs.mancano.length ? '<div class="ag-tip"><span>Mancano questi schemi di movimento</span>: ' + cs.mancano.join(', ') + '</div>' : '') +
    cs.squilibri.map(x => '<div class="ag-tip"><span>Squilibrio</span>: ' + x + '</div>').join('') + '</div>';

  /* ---- corpo e alimentazione ---- */
  const cc = corpoCoach();
  if (cc.length) html += '<div class="card"><div class="section-title">Corpo e alimentazione</div>' +
    cc.map(x => '<div class="ag-tip">' + escapeHtml(x) + '</div>').join('') + '</div>';

  /* ---- i carichi della prossima seduta ---- */
  const data = loadData();
  const visti = {};
  const righe = [];
  DAYS.forEach(d => (data[d] || []).forEach(e => {
    if (visti[e.name]) return;
    visti[e.name] = true;
    const t = caricoProssimo(e.name, e.weight, e.repsBase !== undefined ? e.repsBase : e.reps, e.setsBase !== undefined ? e.setsBase : e.sets);
    righe.push({ e: e, t: t });
  }));
  const ordine = { su: 0, giu: 1, scarico: 2, fermo: 3, nuovo: 4 };
  righe.sort((a, b) => ordine[a.t.tipo] - ordine[b.t.tipo]);
  if (righe.length) {
    html += '<div class="card"><div class="section-title">Carichi della prossima seduta</div>' +
      righe.slice(0, 10).map(r => '<div class="ag-row">' +
        '<span class="ag-ico ' + r.t.tipo + '">' + ({ su: '\u2191', giu: '\u2193', scarico: '\u{1F4A4}', fermo: '\u2192', nuovo: '\u2022' })[r.t.tipo] + '</span>' +
        '<span class="dv-main"><span class="dv-name">' + escapeHtml(r.e.name.replace(EMOJI_TESTA, '')) + '</span>' +
        '<span class="dv-meta">' + escapeHtml(r.t.motivo) + '</span></span>' +
        '<span class="ag-kg">' + (isTimeBased(r.e.name) ? r.t.reps + 's' : (r.t.weight ? r.t.weight + ' kg' : r.t.reps + ' rip')) + '</span></div>').join('') +
      '<div class="set-about">Li trovi gia impostati quando apri la seduta. Restano modificabili: se un giorno sei meno in forma, abbassa pure.</div></div>';
  }

  /* ---- composizione corporea ---- */
  const st = getBiaStorico();
  html += '<div class="card"><div class="section-title">Composizione corporea</div>';
  if (st.length) {
    const a = st[0].valori, b = st[st.length - 1].valori;
    html += st.slice().reverse().map(x => '<div class="res-line"><span>' +
      daYmd(x.data).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: '2-digit' }) + '</span><b>' +
      (x.valori.peso ? x.valori.peso + ' kg' : '') + (x.valori.fmPerc ? ' \u2022 ' + x.valori.fmPerc + '% grasso' : '') +
      (x.valori.ffm ? ' \u2022 ' + x.valori.ffm + ' kg magra' : '') + '</b></div>').join('');
    if (st.length > 1) {
      html += '<div class="ag-trend">Dalla prima BIA: peso ' + deltaTesto(a.peso, b.peso, ' kg', null) +
        ' \u2022 grasso ' + deltaTesto(a.fmPerc, b.fmPerc, '%', false) +
        ' \u2022 massa magra ' + deltaTesto(a.ffm, b.ffm, ' kg', true) + '</div>';
    }
  } else {
    html += '<div class="set-about" style="margin-top:0;">Nessuna BIA salvata.</div>';
  }
  html += '<button class="set-row-btn" onclick="closeAgent(); openBiaSheet();">\u{1F4C4} Carica o gestisci le BIA (in Opzioni)</button></div>';

  html += '<div class="onb-note">Il coach segue regole di programmazione dell allenamento, non fa diagnosi. Con dolori o patologie, parlane con un medico.</div>';
  body.innerHTML = html;
};
