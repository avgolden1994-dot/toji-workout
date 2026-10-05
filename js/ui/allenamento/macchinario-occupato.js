/* Macchinario occupato: sostituzione per oggi
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   MACCHINARIO OCCUPATO
   In palestra l attrezzo che ti serve e spesso preso. Dal pulsante scegli,
   SOLO PER OGGI, un esercizio che allena lo stesso muscolo bersaglio
   (vedi MUSCOLI in dati/dettagli-esercizi.js), di preferenza con un attrezzo
   diverso da quello occupato. Il piano non cambia: a fine seduta l esercizio
   previsto torna al suo posto, mentre quello che hai fatto resta nello storico col nome dell esercizio fatto davvero.
   ============================================================ */
const ETICHETTA_ATTREZZO = { macchine: 'Macchina', bilanciere: 'Bilanciere', manubri: 'Manubri', corpo: 'Corpo libero' };
const ICONA_SCAMBIO = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 4l3 3-3 3"/><path d="M4 7h16"/><path d="M7 20l-3-3 3-3"/><path d="M20 17H4"/></svg>';
const ICONA_FRECCIA_GIU = '<svg class="busy-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
let occupatoAperto = null;   /* { idx, nome }: esercizio con la tendina aperta */
let occupatoOpzioni = [];    /* nomi proposti nella tendina aperta */
let occupatoAscolto = false; /* i listener del documento ci sono solo a tendina aperta */

/* Tendina: si chiude toccando fuori, con Esc, con Tab e dopo la scelta. I listener del documento
   si aggiungono all apertura e si tolgono alla chiusura (mai uno in giro a tendina chiusa).
   Si chiude senza ridisegnare la scheda: un tocco su un altro pulsante non va perso.
   pointerdown (e non click): su iOS Safari un tocco su un punto "vuoto" non genera click. */
function impostaOccupato(v) {
  occupatoAperto = v;
  const on = !!v;
  if (on === occupatoAscolto) return;
  occupatoAscolto = on;
  const f = on ? 'addEventListener' : 'removeEventListener';
  document[f]('pointerdown', fuoriOccupato, true);
  document[f]('keydown', tastoOccupato);
}
function triggerOccupato() { return document.querySelector('.busy-btn[aria-expanded="true"]'); }
function chiudiOccupato(fuoco) {
  const b = triggerOccupato();
  impostaOccupato(null);
  document.querySelectorAll('.busy-panel').forEach(x => x.remove());
  if (b) { b.setAttribute('aria-expanded', 'false'); if (fuoco) b.focus({ preventScroll: true }); }
}
function fuoriOccupato(ev) {
  const b = triggerOccupato();
  if (!occupatoAperto || !b) { impostaOccupato(null); return; }   /* aperta ma non piu in scheda (cambio giorno o esercizio) */
  const wrap = b.closest('.busy-wrap');
  if (wrap && ev.target instanceof Node && wrap.contains(ev.target)) return;
  chiudiOccupato(false);
}
function tastoOccupato(ev) {
  const b = triggerOccupato();
  if (!occupatoAperto || !b) { impostaOccupato(null); return; }
  if (ev.key === 'Escape') { ev.preventDefault(); chiudiOccupato(true); return; }
  const wrap = b.closest('.busy-wrap');
  if (!wrap || !wrap.contains(document.activeElement)) return;
  if (ev.key === 'Tab') { chiudiOccupato(true); return; }   /* il fuoco prosegue dal pulsante */
  const voci = Array.prototype.slice.call(wrap.querySelectorAll('.busy-opt'));
  const i = voci.indexOf(document.activeElement);
  const to = ev.key === 'ArrowDown' ? (i + 1) % voci.length : ev.key === 'ArrowUp' ? (i <= 0 ? voci.length - 1 : i - 1)
    : ev.key === 'Home' ? 0 : ev.key === 'End' ? voci.length - 1 : -1;
  if (to < 0 || !voci.length) return;
  ev.preventDefault();
  voci[to].focus({ preventScroll: true });
}

/* attrezzi e fastidi dell utente: solo con il consenso ai dati, come il resto del coach */
function prefsOccupato() {
  const p = (coachAttivo() && getProfile()) || {};
  return { luogo: p.luogo || 'palestra', fastidi: (p.fastidi || []).filter(f => f !== 'nessuno'),
    attrezziPalestra: p.attrezziPalestra || null, graditi: p.graditi || [], odiati: p.odiati || [] };
}
/* Stesso muscolo bersaglio (non solo stesso gruppo: un curl non diventa un pushdown).
   In ordine: stesso movimento, stesso tipo (multiarticolare o isolamento), attrezzo DIVERSO
   da quello occupato, classifica degli esperti. Mai uno gia in scheda oggi. Al massimo 6:
   se ne restano meno, o nessuna, se ne mostrano meno (mai un esercizio per un altro muscolo). */
function alternativeOggi(e, list) {
  const m = findExercise(e.name);
  if (!m) return [];
  return alternativeStessoMuscolo(m.name, prefsOccupato(), list.map(x => x.name), { attrezzoDiverso: true, max: 6 });
}
function copiaRecord(r) { return JSON.parse(JSON.stringify(r)); }

/* etichetta nel titolo: cosa era previsto */
function htmlSostituito(e) {
  if (!e.sostituito) return '';
  return '<div class="busy-chip" data-no-tr>' + ICONA_SCAMBIO + '<span>' + escapeHtml(tr('Al posto di')) + ' <b>' +
    escapeHtml(trEs(e.sostituito.name)) + '</b> · ' + escapeHtml(tr('solo per oggi')) + '</span></div>';
}
/* pulsante e tendina: solo prima di aver fatto una serie (le serie fatte restano dell esercizio che le ha prodotte).
   Senza alternative (e senza un esercizio previsto a cui tornare) niente pulsante: solo il messaggio. */
function htmlOccupato(e, idx, list) {
  const m = findExercise(e.name);
  if (e.skipped || !m || e.completedSets.some(s => s.done)) return '';
  const alt = alternativeOggi(e, list);
  if (!alt.length && !e.sostituito) return '<div class="busy-wrap"><div class="busy-none">' + escapeHtml(tr('Nessuna alternativa adatta con i tuoi attrezzi.')) + '</div></div>';
  const aperto = !!occupatoAperto && occupatoAperto.idx === idx && occupatoAperto.nome === e.name;
  let h = '<div class="busy-wrap"><button class="busy-btn" data-busy="' + idx + '" aria-haspopup="true" aria-expanded="' + aperto + '" aria-controls="busy-p-' + idx +
    '" onclick="toggleOccupato(' + idx + ', event)" onkeydown="tastoApriOccupato(event, ' + idx + ')">' + ICONA_SCAMBIO + '<span class="busy-lbl">Macchinario occupato</span>' + ICONA_FRECCIA_GIU + '</button>';
  if (aperto) {
    occupatoOpzioni = alt.map(a => a.ex.name);
    const lavoro = lavoroDaSostituire(m.name) || { totale: false, nome: MUSCLE_GROUPS[m.group].label };   /* multiarticolari totali: la famiglia, non un muscolo */
    h += '<div class="busy-panel" id="busy-p-' + idx + '">' +
      '<div class="busy-head" data-no-tr>' + escapeHtml(tr(lavoro.totale ? 'Stesso lavoro' : 'Stesso muscolo')) + ': <b>' + escapeHtml(tr(lavoro.nome)) + '</b> · ' + escapeHtml(tr('solo per oggi')) + '</div>' +
      '<div class="busy-menu" role="menu" aria-label="' + escapeHtml(tr('Alternative')) + '">';
    if (e.sostituito) {
      h += '<button class="busy-opt torna" role="menuitem" tabindex="-1" onclick="ripristinaOriginale(' + idx + ')"><span class="busy-opt-txt" data-no-tr><span class="busy-opt-name">' +
        escapeHtml(tr('Torna a')) + ' ' + escapeHtml(trEs(e.sostituito.name)) + '</span><span class="busy-opt-meta">' + escapeHtml(tr('Esercizio previsto')) +
        '</span></span><span class="busy-opt-go" aria-hidden="true">↺</span></button>';
    }
    h += alt.map((a, i) => '<button class="busy-opt" role="menuitem" tabindex="-1" onclick="sostituisciOggi(' + idx + ',' + i + ')"><span class="busy-opt-txt" data-no-tr><span class="busy-opt-name">' +
      escapeHtml(trEs(a.ex.name)) + '</span><span class="busy-opt-meta">' + escapeHtml(tr(ETICHETTA_ATTREZZO[attrezzoDi(a.ex.name)])) + ' · ' +
      escapeHtml(tr(a.stessoMov ? 'Stesso movimento' : a.ex.type === 'isolation' ? 'Isolamento' : 'Stesso muscolo')) +
      '</span></span><span class="busy-opt-go" aria-hidden="true">›</span></button>').join('');
    h += '</div></div>';
  }
  return h + '</div>';
}
/* da tastiera: Freccia giu o su apre la tendina e va alla prima voce (a tendina aperta le frecce le gestisce tastoOccupato) */
window.tastoApriOccupato = function(ev, idx) {
  if ((ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') || ev.currentTarget.getAttribute('aria-expanded') === 'true') return;
  ev.preventDefault();
  ev.stopPropagation();   /* il listener appena aggiunto al documento non deve vedere questo stesso tasto */
  toggleOccupato(idx, null, true);
};
/* ev: il click (da tastiera Invio/Spazio ha detail 0: il fuoco va alla prima voce); sulle altre il fuoco resta sul pulsante */
window.toggleOccupato = function(idx, ev, daTastiera) {
  const e = (loadData()[currentDay] || [])[idx];
  if (!e) return;
  const gia = !!occupatoAperto && occupatoAperto.idx === idx && occupatoAperto.nome === e.name;
  if (gia) { chiudiOccupato(true); return; }
  impostaOccupato({ idx: idx, nome: e.name });
  renderAllenamento();
  const b = document.querySelector('.busy-btn[data-busy="' + idx + '"]');
  const voce = document.querySelector('#busy-p-' + idx + ' .busy-opt');
  if (voce && (daTastiera || (ev && ev.detail === 0))) voce.focus({ preventScroll: true });
  else if (b) b.focus({ preventScroll: true });
  const pan = document.getElementById('busy-p-' + idx);
  if (pan && b) posizionaOccupato(pan, b);
};
/* la tendina sta nello spazio visibile: sotto il pulsante, o sopra se sotto (barra in basso compresa) non c e posto */
function posizionaOccupato(pan, b) {
  const nav = document.getElementById('bottom-nav');
  const fondo = Math.min(window.innerHeight, nav ? nav.getBoundingClientRect().top : window.innerHeight);
  const r = b.getBoundingClientRect();
  const sotto = fondo - r.bottom - 14, sopra = r.top - 14;
  const su = sotto < 300 && sopra > sotto;
  pan.classList.toggle('busy-su', su);
  pan.style.maxHeight = Math.max(160, Math.min(460, su ? sopra : sotto)) + 'px';
}
/* dopo la scelta: la tendina si chiude, la scheda si ridisegna e chi usava la tastiera ritrova il fuoco sul pulsante */
function dopoSceltaOccupato(idx) {
  const dentro = !!(document.activeElement && document.activeElement.closest && document.activeElement.closest('.busy-panel'));
  impostaOccupato(null);
  renderAllenamento();
  renderPiano();
  const b = dentro && document.querySelector('.busy-btn[data-busy="' + idx + '"]');
  if (b) b.focus({ preventScroll: true });
}
window.sostituisciOggi = function(idx, i) {
  const data = loadData();
  const list = data[currentDay] || [];
  const cur = list[idx];
  const nuovo = findExercise(occupatoOpzioni[i]);
  if (!cur || !nuovo || cur.completedSets.some(s => s.done)) return;
  const prima = copiaRecord(cur);
  const orig = cur.sostituito ? copiaRecord(cur.sostituito) : copiaRecord(cur);   /* l originale resta quello del piano anche dopo due cambi */
  const mOrig = findExercise(orig.name);
  const r = repsRange(nuovo.name);
  const stessoTipo = !!mOrig && mOrig.type === nuovo.type && !isTimeBased(orig.name) && !isTimeBased(nuovo.name);
  const reps = stessoTipo ? Math.min(r.max, Math.max(r.min, Number(orig.reps) || nuovo.reps)) : nuovo.reps;
  /* carico: l ultimo che hai usato con questo esercizio, se l hai gia fatto; altrimenti quello di partenza della libreria */
  const ult = ultimeSessioni(nuovo.name, 1)[0];
  const fatte = ult ? ult.sets.filter(x => x.done) : [];
  const pp = fatte.length ? null : pesoPartenza(nuovo.name);
  const peso = fatte.length ? (Number(fatte[fatte.length - 1].weight) || 0) : pp.peso;
  list[idx] = normalizeExerciseRecord({ name: nuovo.name, sets: cur.sets, reps: reps, weight: peso, rest: nuovo.rest,
    superset: cur.superset, addedBy: cur.addedBy, sostituito: orig, sostituitoIl: ymd(new Date()),
    stimato: pp && pp.stimato ? pp.fonte : undefined, coachNote: pp && pp.stimato ? pp.motivo : undefined, coachTipo: pp && pp.stimato ? 'nuovo' : undefined });
  saveData(data);
  dopoSceltaOccupato(idx);
  showUndo(trP('%s al posto di %s, solo per oggi', trEs(nuovo.name), trEs(orig.name)), () => {
    const d2 = loadData();
    d2[currentDay][idx] = normalizeExerciseRecord(prima);
    saveData(d2);
    renderAllenamento(); renderPiano();
  });
};
window.ripristinaOriginale = function(idx) {
  const data = loadData();
  const list = data[currentDay] || [];
  const cur = list[idx];
  if (!cur || !cur.sostituito || cur.completedSets.some(s => s.done)) return;
  const prima = copiaRecord(cur);
  list[idx] = normalizeExerciseRecord(copiaRecord(cur.sostituito));
  saveData(data);
  dopoSceltaOccupato(idx);
  showUndo(trP('Di nuovo %s', trEs(list[idx].name)), () => {
    const d2 = loadData();
    d2[currentDay][idx] = normalizeExerciseRecord(prima);
    saveData(d2);
    renderAllenamento(); renderPiano();
  });
};
/* a fine seduta l esercizio previsto torna nel piano (l esercizio fatto e gia nello storico) */
function ripristinaSostituzioni(list) {
  list.forEach((e, i) => { if (e && e.sostituito) list[i] = normalizeExerciseRecord(copiaRecord(e.sostituito)); });
}
/* una sostituzione di un altro giorno, rimasta perche la seduta non e stata chiusa: il piano torna com era */
function pulisciSostituzioniVecchie() {
  const data = loadData();
  const oggi = ymd(new Date());
  let cambiato = false;
  DAYS.forEach(d => (data[d] || []).forEach((e, i, arr) => {
    if (e.sostituito && e.sostituitoIl !== oggi && !e.completedSets.some(s => s.done)) {
      arr[i] = normalizeExerciseRecord(copiaRecord(e.sostituito));
      cambiato = true;
    }
  }));
  if (cambiato) saveData(data);
}

window.updateSetField = function(exIdx, setIdx, field, value) {
  const data = loadData();
  const set = data[currentDay][exIdx].completedSets[setIdx];
  if (!set) return;
  if (field === 'reps') set.reps = Number(value) || 0;
  else set.weight = parseFloat(value) || 0;
  saveData(data);
  /* niente re-render: eviterebbe di far perdere il focus mentre si digita */
};

window.toggleSetDone = function(exIdx, setIdx) {
  const data = loadData();
  const ex = data[currentDay][exIdx];
  const set = ex.completedSets[setIdx];
  if (!set) return;
  set.done = !set.done;
  controllaRecord(ex, set);
  /* stile Strong/Hevy: se completo un set, precompilo il successivo (se ancora ai valori di default) con reps/kg appena usati */
  if (set.done) {
    const next = ex.completedSets[setIdx + 1];
    if (next && !next.done && next.reps === ex.reps && next.weight === ex.weight) {
      next.reps = set.reps;
      next.weight = set.weight;
    }
  }
  saveData(data);
  renderAllenamento();
  /* Mimica il meccanismo delle app commerciali: completare una serie avvia da solo il recupero.
     Eccezione: se l'esercizio SUCCESSIVO è in superset, non si riposa — si passa subito a quello. */
  if (set.done) {
    const next = data[currentDay][exIdx + 1];
    if (next && next.superset) {
      closeRecoveryPanel();
    } else {
      openRecoveryPanel(ex.name, ex.rest);
    }
  }
};

/* Il cedimento segnato per sbaglio si toglie: prima una volta acceso il
   fuoco restava per sempre. Se il timer di quella serie sta andando, si ferma. */
window.annullaCedimento = function(exIdx, setIdx) {
  const data = loadData();
  const set = ((data[currentDay] || [])[exIdx] || {}).completedSets ? data[currentDay][exIdx].completedSets[setIdx] : null;
  if (!set) return;
  if (armedSet && armedSet.exIdx === exIdx && armedSet.setIdx === setIdx) { stopDropSet(); armedSet = null; }
  set.wasBerserk = false;
  saveData(data);
  renderAllenamento();
  showUndo('Cedimento tolto dalla serie ' + (setIdx + 1), () => {
    const d2 = loadData();
    const s2 = d2[currentDay] && d2[currentDay][exIdx] && d2[currentDay][exIdx].completedSets[setIdx];
    if (s2) { s2.wasBerserk = true; saveData(d2); renderAllenamento(); }
  });
};

/* Arma una SERIE specifica (non l'intero esercizio) per il modulo Cedimento */
window.armDropTarget = function(exIdx, setIdx) {
  if (armedSet && armedSet.exIdx === exIdx && armedSet.setIdx === setIdx) {
    armedSet = null;
  } else {
    armedSet = { exIdx, setIdx };
  }
  stopDropSet();
  renderAllenamento();
};

function refreshDropButtonState() {
  const btn = document.getElementById('start-drop-btn');
  const hint = document.getElementById('drop-hint');
  if (!btn || !hint) return;
  if (!armedSet) {
    btn.disabled = true;
    hint.innerText = 'Tocca l\'icona 🔥 accanto a una serie per portarla a cedimento.';
  } else {
    const data = loadData();
    const ex = (data[currentDay] || [])[armedSet.exIdx];
    if (!ex || !ex.completedSets[armedSet.setIdx]) {
      btn.disabled = true;
      hint.innerText = 'Tocca l\'icona 🔥 accanto a una serie per portarla a cedimento.';
      return;
    }
    btn.disabled = false;
    hint.innerText = `Pronto per: ${ex.name} — Serie ${armedSet.setIdx + 1}`;
  }
}
