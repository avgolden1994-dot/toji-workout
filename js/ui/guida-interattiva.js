/* Guida interattiva
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   GUIDA INTERATTIVA
   Non si legge: si fa. Il coach accompagna in un allenamento di prova
   (una serie, il recupero, il cardio), poi Piano, Calendario, Progressi e
   Opzioni. Tutto quello che si tocca durante la guida e una prova: alla
   fine i dati tornano esattamente com erano. Una volta sola al primo
   avvio; si ripete da Opzioni.
   ============================================================ */
const GUIDA_KEY = 'tz_guida_vista';
let guidaPasso = -1, guidaTimer = null, guidaFoto = null, guidaUltimoCambio = 0;
/* Cosa si tocca in ogni passo (vedi «Durante la guida si tocca solo dove e illuminato»):
   - passo con 'fatto' (si deve fare qualcosa): tutto il bersaglio;
   - passo con 'btn' (Avanti): il bersaglio e solo da guardare, tranne le parti in 'tocca';
   - 'soloTrascina': in 'tocca' si trascina ma un tocco semplice non fa nulla (nel calendario aprirebbe il giorno). */
const GUIDA = [
  { t: 'Benvenuto in 3in', x: 'Sono il tuo coach. In due minuti ti faccio usare l’app davvero. Per la prova la riempio con sei mesi di allenamenti di esempio: grafici, statistiche e storico pieni. Alla fine torna tutto com’era.', btn: 'Iniziamo', inizio: true },
  { sel: '#oggi-body .btn-start-workout', t: 'Oggi', x: 'Qui trovi l’allenamento del giorno. Tocca «Inizia allenamento».',
    prep: () => switchTab('oggi'), fatto: () => currentTab === 'allenamento' && !!document.querySelector('#allenamento-list .set-check') },
  { sel: '#allenamento-list .set-check', t: 'La prima serie', x: 'Hai appena chiuso 10 ripetizioni. Tocca il cerchio per spuntare la serie: il recupero parte da solo.',
    fatto: () => (loadData()[currentDay] || []).some(e => (e.completedSets || []).some(x => x.done)) },
  { sel: '#recovery-overlay .recovery-close-btn', t: 'Il recupero', x: 'Il cronometro ti dice quando ripartire. Qui lo accorci o lo allunghi. Per la prova, chiudilo.',
    fatto: () => !document.getElementById('recovery-overlay').classList.contains('visible') },
  { sel: '.btn-cardio', t: 'Il cardio', x: 'Hai fatto cardio? Si segna qui, prima di terminare. Tocca «Cardio».', fatto: () => cardioAperto },
  { sel: '.cardio-box', t: 'Il cardio', x: 'Scegli il tipo e i minuti. Per chi fa pesi la camminata in pendenza è la più facile da recuperare. «Termina allenamento» salva tutto: oggi non serve, è una prova.', btn: 'Avanti', tocca: '.cardio-box' },
  { sel: '.nav-btn[data-tab="piano"]', t: 'Il Piano', x: 'Adesso la tua settimana. Tocca «Piano».', fatto: () => currentTab === 'piano' },
  { sel: '#plan-map', t: 'La figura', x: 'Il colore dice quanto alleni ogni muscolo. Tocca il petto.', fatto: () => !!planMapGruppo },
  { sel: '#plan-map-list', t: 'Giorno per giorno', x: 'Ecco gli esercizi del petto, giorno per giorno. Da qui ne modifichi uno o ne aggiungi uno nuovo.', btn: 'Avanti' },
  { sel: '.nav-btn[data-tab="calendario"]', t: 'Il Calendario', x: 'Tocca «Calendario».', fatto: () => currentTab === 'calendario' },
  { sel: '#mc-grid', t: 'Il mese', x: 'Il tuo mese. Per spostare un allenamento, trascina il giorno su un altro della stessa settimana.', btn: 'Avanti', tocca: '#mc-grid .mc-cell', soloTrascina: true },
  { sel: '.nav-btn[data-tab="storico"]', t: 'I Progressi', x: 'Tocca «Progressi».', fatto: () => currentTab === 'storico' },
  { sel: '#pg-tiles .pg-tile:nth-child(1)', t: 'I Progressi', x: 'Ecco sei mesi di esempio. Più sotto vedi l’anno e come stanno recuperando i muscoli. Tocca «Peso e foto».', fatto: () => pgPagina === 'peso' },
  { sel: '#pg-peso', t: 'Il peso', x: 'La linea scende piano verso l’obiettivo: è il ritmo giusto per non perdere forza. Qui segni il peso, e ogni 2 settimane una foto.', btn: 'Avanti' },
  { sel: '#pg-tiles .pg-tile:nth-child(2)', t: 'Le statistiche', x: 'Tocca «Statistiche».', prep: () => chiudiPagProgressi(), fatto: () => pgPagina === 'stats' },
  { sel: '#pg-stats-grafico', t: 'Le statistiche', x: 'Il grafico mostra quanti allenamenti fai ogni settimana: cambia periodo coi pulsanti. Sotto, ogni 4 settimane confronto i carichi con il blocco precedente, poi c’è il cardio.', btn: 'Avanti', tocca: '.st-periodo' },
  { sel: '.nav-btn[data-tab="impostazioni"]', t: 'Le Opzioni', x: 'Tocca «Opzioni».', prep: () => { if (pgPagina) chiudiPagProgressi(); }, fatto: () => currentTab === 'impostazioni' },
  { t: 'Sei pronto', x: 'Qui trovi il coach, i tuoi dati e questa guida, se vuoi rifarla. La prova è finita: rimetto tutto com’era. Buon allenamento.', btn: 'Fine', fine: true }
];
function guidaEl() {
  let g = document.getElementById('guida');
  if (!g) {
    g = document.createElement('div');
    g.id = 'guida'; g.className = 'guida';
    g.innerHTML = '<div class="g-dim g-t"></div><div class="g-dim g-b"></div><div class="g-dim g-l"></div><div class="g-dim g-r"></div><div class="g-hole"></div><div class="g-bub" role="dialog" aria-live="polite"></div>';
    document.body.appendChild(g);
  }
  return g;
}
/* la prova parte da una copia dei dati, poi riempie l app con sei mesi di
   allenamenti di esempio: grafici, statistiche, anno, recupero, peso e
   cardio si vedono pieni. All uscita guidaRipristina rimette i dati veri. */
function guidaDatiDemo() {
  const oggi = new Date(); oggi.setHours(0, 0, 0, 0);
  let seme = 7;
  const caso = () => (seme = (seme * 16807) % 2147483647) / 2147483647;
  const L = n => nomeInLibreria(n) || n;
  const SCHEDE = {
    Upper: [['Panca Piana Bilanciere', 60, 10], ['Lat Machine', 55, 10], ['Military Press', 35, 8], ['Rematore con Bilanciere', 55, 10], ['Curl Bilanciere Bicipiti', 25, 12], ['Pushdown Tricipiti ai Cavi', 22, 12]],
    Lower: [['Squat con Bilanciere', 80, 6], ['Stacco Rumeno', 70, 8], ['Leg Press', 140, 10], ['Leg Extension', 45, 12], ['Hip Thrust', 80, 10], ['Calf Raise in Piedi', 60, 12]]
  };
  const gOggi = (oggi.getDay() + 6) % 7, piano = {};
  [[0, 'Upper'], [3, 'Lower'], [4, 'Upper'], [6, 'Lower']].forEach(([o, t]) => { piano[(gOggi + o) % 7] = t; });
  const kg25 = w => Math.round(w / 2.5) * 2.5;
  /* la settimana: oggi c e sempre un allenamento da iniziare */
  const data = {}, titoli = {};
  DAYS.forEach((d, i) => {
    const t = piano[i];
    data[d] = t ? SCHEDE[t].map(([n, w, r]) => normalizeExerciseRecord({ name: L(n), sets: 3, reps: r, weight: kg25(w * 1.18), rest: t === 'Lower' ? 120 : 90, completedSets: [] })) : [];
    if (t) titoli[d] = t;
  });
  saveData(data);
  localStorage.setItem(titlesKey(), JSON.stringify(titoli));
  saveRestDays(DAYS.filter((d, i) => !piano[i]));
  /* 26 settimane: carichi in salita, uno scarico ogni 5, qualche seduta saltata, cardio dopo le gambe */
  const storia = [], cal = {};
  for (let off = -182; off <= -1; off++) {
    const g = new Date(oggi); g.setDate(g.getDate() + off);
    const t = piano[(g.getDay() + 6) % 7], k = ymd(g);
    if (!t) { cal[k] = { rest: true, title: 'Riposo' }; continue; }
    if (caso() < 0.08) { cal[k] = { title: t, items: SCHEDE[t].map(([n]) => ({ name: L(n), sets: 3, reps: '' })) }; continue; }
    const sett = Math.floor((off + 182) / 7);
    const f = (1 + 0.18 * (off + 182) / 182) * (sett % 5 === 4 ? 0.9 : 1);
    g.setHours(18, 30, 0, 0);
    const sessione = SCHEDE[t].map(([n, w, r]) => {
      const peso = kg25(w * f), cede = caso() < 0.1;
      return { name: L(n), rest: t === 'Lower' ? 120 : 90, riscaldamento: [],
        sets: [0, 1, 2].map(j => ({ reps: r - (j === 2 && caso() < 0.3 ? 1 : 0), weight: peso, done: true, wasBerserk: cede && j === 2, rpe: j === 2 ? 9 : 8 })) };
    });
    const cardio = t === 'Lower' && caso() < 0.6 ? [{ tipo: caso() < 0.7 ? 'pendenza' : 'bici', min: caso() < 0.5 ? 20 : 25 }] : (caso() < 0.15 ? [{ tipo: 'camminata', min: 30 }] : undefined);
    storia.push({ id: g.getTime(), day: DAYS[(g.getDay() + 6) % 7], date: dataOra(g), titolo: t, minuti: 55 + Math.round(caso() * 15),
      berserk: sessione.some(e => e.sets.some(x => x.wasBerserk)), skipped: 0, cardio: cardio, sessione: sessione,
      exercises: sessione.map(e => ({ name: e.name, weight: e.sets[2].weight, totalSets: 3, doneSets: 3, wasBerserk: e.sets.some(x => x.wasBerserk) })) });
  }
  storia.sort((a, b) => b.id - a.id);
  saveHistory(storia);
  saveCal(cal);
  storia.forEach(h => segnaFattoNelCalendario(Object.assign({}, h, { passata: true })));
  /* peso ogni 4 giorni, in lenta discesa verso l obiettivo */
  const pesi = [];
  for (let off = -180, kg = 84; off <= -2; off += 4) {
    const g = new Date(oggi); g.setDate(g.getDate() + off);
    kg += -0.12 + (caso() - 0.5) * 0.5;
    pesi.push({ data: ymd(g), kg: Math.round(kg * 10) / 10 });
  }
  localStorage.setItem(pesoKey(), JSON.stringify(pesi));
  localStorage.setItem(pesoObKey(), '75');
}
function guidaPreparaProva() {
  if (guidaFoto) return true;   /* gia in prova: mai fotografare i dati di esempio come se fossero veri */
  const foto = {};
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k !== GUIDA_BACKUP) foto[k] = localStorage.getItem(k); }
  /* la copia va su disco PRIMA di toccare i dati: se l app muore a meta guida
     si ripristina al prossimo avvio. Se non c e spazio, niente prova. */
  try { localStorage.setItem(GUIDA_BACKUP, JSON.stringify(foto)); } catch (e) { return false; }
  guidaFoto = foto;
  try { guidaDatiDemo(); localStorage.removeItem(cardioKey()); }
  catch (e) { guidaRipristina(); return false; }
  return true;
}
function guidaRipristina() {
  let foto = guidaFoto;
  if (!foto) { try { foto = JSON.parse(localStorage.getItem(GUIDA_BACKUP)); } catch (e) { foto = null; } }
  if (foto && typeof foto === 'object') guidaApplicaFoto(foto);
  guidaFoto = null;
}
window.avviaGuida = function() {
  try { closeSetPage(); } catch (e) {}
  guidaPasso = 0;
  const g = guidaEl();
  g.classList.add('on', 'g-init');
  guidaMostra();
  requestAnimationFrame(() => requestAnimationFrame(() => g.classList.remove('g-init')));
};
window.offriGuida = function() {
  if (localStorage.getItem(GUIDA_KEY) || navigator.webdriver || /jsdom/i.test(navigator.userAgent || '')) return;
  setTimeout(() => {
    const libero = document.getElementById('onb').classList.contains('hidden') && document.getElementById('consent').classList.contains('hidden');
    if (libero && !localStorage.getItem(GUIDA_KEY) && guidaPasso < 0) avviaGuida();
  }, 900);
};
function guidaPosiziona() {
  const g = document.getElementById('guida');
  if (!g || guidaPasso < 0) return;
  const p = GUIDA[guidaPasso];
  const el = p.sel ? document.querySelector(p.sel) : null;
  const W = window.innerWidth, H = window.innerHeight;
  let r = el ? el.getBoundingClientRect() : null;
  if (r && (!r.width || !r.height)) r = null;
  const pad = 6;
  const x0 = r ? Math.max(0, r.left - pad) : W / 2, y0 = r ? Math.max(0, r.top - pad) : H / 2;
  const x1 = r ? Math.min(W, r.right + pad) : W / 2, y1 = r ? Math.min(H, r.bottom + pad) : H / 2;
  const st = (c, css) => Object.assign(g.querySelector(c).style, css);
  st('.g-t', { left: 0, top: 0, width: W + 'px', height: y0 + 'px' });
  st('.g-b', { left: 0, top: y1 + 'px', width: W + 'px', height: Math.max(0, H - y1) + 'px' });
  st('.g-l', { left: 0, top: y0 + 'px', width: x0 + 'px', height: Math.max(0, y1 - y0) + 'px' });
  st('.g-r', { left: x1 + 'px', top: y0 + 'px', width: Math.max(0, W - x1) + 'px', height: Math.max(0, y1 - y0) + 'px' });
  st('.g-hole', { left: x0 + 'px', top: y0 + 'px', width: Math.max(0, x1 - x0) + 'px', height: Math.max(0, y1 - y0) + 'px', opacity: r ? '1' : '0' });
  const b = g.querySelector('.g-bub');
  const hb = b.offsetHeight || 190;
  let top;
  if (!r) top = (H - hb) / 2;
  else if (y1 + hb + 24 < H) top = y1 + 12;
  else if (y0 - hb - 24 > 0) top = y0 - hb - 12;
  else top = H - hb - 16;
  b.style.bottom = 'auto'; b.style.transform = 'none';
  b.style.top = Math.max(8, Math.min(top, H - hb - 8)) + 'px';
}
function guidaRidotto() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
function guidaVisibile(el) { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; }
/* serve scorrere? No se il bersaglio e gia tutto in vista con posto per il fumetto, o se sta in un
   elemento fisso (barra in basso, pannelli): li lo scorrimento non lo sposterebbe comunque. */
function guidaServeScroll(el) {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (getComputedStyle(n).position === 'fixed') return false;
  }
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) return false;
  const H = window.innerHeight;
  const nav = document.getElementById('bottom-nav'), nr = nav ? nav.getBoundingClientRect() : null;
  const fondo = nr && nr.height > 0 ? Math.min(H, nr.top) : H;
  const bub = document.querySelector('#guida .g-bub'), hb = (bub && bub.offsetHeight) || 190;
  const inVista = r.top >= 8 && r.bottom <= fondo - 8;
  const posto = r.bottom + 6 + hb + 24 < H || r.top - 6 - hb - 24 > 0;
  return !(inVista && posto);
}
/* Porta il bersaglio al centro solo quando serve. Se la pagina scorre, il riquadro lo segue da subito
   (senza scivolare verso dove il bersaglio stava prima di muoversi); se non serve, scivola.
   Con «riduci movimento» lo scorrimento e istantaneo. */
function guidaScorriVerso(el) {
  if (!el || !el.scrollIntoView || !guidaServeScroll(el)) return;
  guidaSegui();
  try { el.scrollIntoView({ block: 'center', behavior: guidaRidotto() ? 'instant' : 'smooth' }); }
  catch (e) { el.scrollIntoView({ block: 'center' }); }
}
function guidaMostra() {
  const g = guidaEl();
  const p = GUIDA[guidaPasso];
  clearInterval(guidaTimer);
  if (p.prep) try { p.prep(); } catch (e) {}
  const el = p.sel ? document.querySelector(p.sel) : null;
  const tot = GUIDA.length - 1;
  g.querySelector('.g-bub').innerHTML =
    (guidaPasso > 0 && !p.fine ? '<div class="g-num">' + tr('Passo # di #').replace('#', guidaPasso).replace('#', tot - 1) + '</div>' : '') +
    '<div class="g-tit">' + tr(p.t) + '</div><div class="g-txt">' + tr(p.x) + '</div>' +
    '<div class="g-bar">' + (p.fine ? '<span></span>' : '<button class="g-link" onclick="chiudiGuida()">' + tr('Salta la guida') + '</button>') +
      (p.btn ? '<button class="g-go" onclick="guidaAvanti()">' + tr(p.btn) + '</button>' : '<span class="g-wait">' + tr('Tocca dove è illuminato') + '</span>') + '</div>';
  g.classList.toggle('attesa', !!p.fatto);
  /* il fumetto c e gia (serve la sua altezza per decidere se scorrere), poi si scorre, poi si posiziona */
  guidaScorriVerso(el);
  guidaPosiziona();
  const passo = guidaPasso;
  let senzaEl = 0;
  let portato = !p.sel || !!(el && guidaVisibile(el));   /* bersaglio gia in pagina e portato in vista */
  guidaUltimoCambio = Date.now();
  guidaTimer = setInterval(() => {
    if (guidaPasso < 0 || guidaPasso !== passo) { clearInterval(guidaTimer); return; }
    const q = GUIDA[passo];
    const e = q.sel ? document.querySelector(q.sel) : null;
    const pronto = !!(e && guidaVisibile(e));
    /* il bersaglio e comparso dopo l inizio del passo (schermata che si disegna): ora si porta in vista */
    if (!portato && pronto) { portato = true; guidaScorriVerso(e); }
    guidaPosiziona();
    if (q.fatto) {
      let ok = false; try { ok = q.fatto(); } catch (x) {}
      if (ok) { clearInterval(guidaTimer); setTimeout(() => { if (guidaPasso === passo) guidaAvanti(true); }, 350); return; }
      /* bersaglio sparito (schermata cambiata, niente da toccare): dopo 4 secondi si va avanti
         da soli, invece di lasciare lo schermo oscurato senza via d uscita */
      senzaEl = (q.sel && !pronto) ? senzaEl + 1 : 0;
      if (senzaEl >= 16) { clearInterval(guidaTimer); guidaAvanti(true); }
    }
  }, 250);
}
window.guidaAvanti = function(auto) {
  const p = GUIDA[guidaPasso];
  if (!p) return;
  if (auto !== true) {
    /* un tocco vale solo sui passi con il bottone, e non subito dopo un cambio di passo:
       un doppio tocco su «Iniziamo» saltava il passo successivo e rompeva la guida */
    if (!p.btn && !p.fine) return;
    if (Date.now() - guidaUltimoCambio < 400) return;
  }
  if (p.inizio && !guidaPreparaProva()) {
    /* prova impossibile (niente spazio o dati non preparabili): si esce senza toccare nulla */
    clearInterval(guidaTimer); guidaPasso = -1;
    try { localStorage.setItem(GUIDA_KEY, '1'); } catch (e) {}
    const g = document.getElementById('guida'); if (g) g.classList.remove('on');
    try { showUndo('Guida non disponibile: spazio insufficiente'); } catch (e) {}
    return;
  }
  if (p.fine) { chiudiGuida(); return; }
  guidaPasso++;
  guidaMostra();
};
window.chiudiGuida = function() {
  clearInterval(guidaTimer);
  guidaPasso = -1;
  try { localStorage.setItem(GUIDA_KEY, '1'); } catch (e) {}
  const g = document.getElementById('guida');
  if (g) g.classList.remove('on');
  /* in prova c e il recupero, il cronometro o un drop set che girano: si fermano prima di rimettere i dati */
  let inProva = !!guidaFoto;
  try { if (!inProva) inProva = localStorage.getItem(GUIDA_BACKUP) !== null; } catch (e) {}
  if (!inProva) return;
  try { stopDropSet(); } catch (e) {}
  try { closeRecoveryPanel(); } catch (e) {}
  try { fermaTempoSeduta(false); } catch (e) {}
  try { guidaRipristina(); } catch (e) {}
  try { location.reload(); } catch (e) {}
};
/* Mentre la pagina scorre o cambia misura, il riquadro resta incollato al bersaglio frame per frame
   (g-segui = niente scivolamento). Finito il movimento, da fermo, torna a scivolare. */
let guidaSeguiT = null;
function guidaSegui() {
  const g = document.getElementById('guida');
  if (!g || guidaPasso < 0) return;
  g.classList.add('g-segui');
  guidaPosiziona();
  clearTimeout(guidaSeguiT);
  guidaSeguiT = setTimeout(() => g.classList.remove('g-segui'), 200);
}
window.addEventListener('resize', guidaSegui);
window.addEventListener('scroll', guidaSegui, true);

/* ============================================================
   DURANTE LA GUIDA SI TOCCA SOLO DOVE E ILLUMINATO
   I riquadri scuri fermano i tocchi fuori dal cerchio, ma non bastano: il
   margine del cerchio e dentro il foro, e nei passi «Avanti» il bersaglio e
   solo da guardare (un tocco su un giorno del calendario apriva il giorno
   sopra la guida e la rompeva). Per questo ogni tocco, clic e tasto si
   controlla prima che arrivi all app: passa solo se cade nel fumetto o nel
   bersaglio del passo, e li solo dove il passo lo prevede.
   ============================================================ */
window.guidaAttiva = function() {
  const g = document.getElementById('guida');
  return guidaPasso >= 0 && !!g && g.classList.contains('on');
};
function guidaConsente(t, tipo) {
  if (!guidaAttiva() || !t || !t.closest) return true;
  if (t.closest('#guida')) return true;                       /* fumetto e riquadri scuri */
  const p = GUIDA[guidaPasso];
  const el = p && p.sel ? document.querySelector(p.sel) : null;
  if (!el || !el.contains(t)) return false;                   /* fuori dal bersaglio, anche nel margine del cerchio */
  if (p.soloTrascina && (tipo === 'click' || tipo === 'dblclick')) return false;
  const zona = p.tocca || (p.btn ? null : '*');
  if (!zona) return false;                                    /* passo «Avanti»: si guarda e basta */
  if (zona === '*') return true;
  const m = t.closest(zona);
  return !!m && el.contains(m);
}
/* un tocco rifiutato: il fumetto fa un piccolo cenno, cosi si capisce che e voluto */
function guidaCenno() {
  const b = document.querySelector('#guida .g-bub');
  if (!b) return;
  b.classList.remove('g-nudge'); void b.offsetWidth; b.classList.add('g-nudge');
  setTimeout(() => b.classList.remove('g-nudge'), 350);
}
['pointerdown', 'mousedown', 'click', 'dblclick', 'contextmenu'].forEach(nome => {
  window.addEventListener(nome, (e) => {
    if (!guidaAttiva()) return;
    const sopraBuio = e.target && e.target.closest && e.target.closest('.g-dim');
    if (sopraBuio) { if (nome === 'pointerdown') guidaCenno(); return; }
    if (guidaConsente(e.target, nome)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (nome === 'pointerdown') guidaCenno();
  }, true);
});
window.addEventListener('keydown', (e) => {
  if (!guidaAttiva() || (e.key !== 'Enter' && e.key !== ' ')) return;
  if (guidaConsente(e.target, 'keydown')) return;
  e.preventDefault(); e.stopImmediatePropagation();
}, true);

window.setConsenso = function(si, primoAvvio) {
  try {
    localStorage.setItem(CONSENT_KEY, si ? 'si' : 'no');
    localStorage.setItem(CONSENT_KEY + '_data', formatNow());
    localStorage.setItem(CONSENT_KEY + '_versione', CONSENT_VERSION);
  } catch (e) {}
  document.getElementById('consent').classList.add('hidden');
  if (primoAvvio) {
    if (si) startOnboarding(false);
    else { try { localStorage.setItem(ONB_KEY, '1'); } catch (e) {} offriGuida(); }
  }
  if (typeof renderSettings === 'function' && document.getElementById('tab-impostazioni').classList.contains('active')) renderSettings();
};

window.revocaConsenso = function() {
  const cancella = confirm('Consenso revocato: il coach smette di usare i tuoi dati.\n\nVuoi anche cancellare il profilo e i referti BIA salvati?');
  setConsenso(false, false);
  try { localStorage.setItem('tz_consenso_ia', 'no'); } catch (e) {}
  if (cancella) {
    try {
      localStorage.removeItem(PROFILE_KEY());
      localStorage.removeItem(biaKey());
      localStorage.removeItem(progKey());
    } catch (e) {}
  }
  renderSettings();
  showUndo(cancella ? 'Consenso revocato e dati cancellati' : 'Consenso revocato');
};

/* informativa: un testo intero per lingua, scritto apposta (un testo legale non si traduce a pezzi) */
const INFORMATIVA = {"it": "<h3>1. Chi tratta i dati<\/h3>\n<p>Tutti i dati vengono elaborati <b>sul tuo dispositivo<\/b>, direttamente dall’app. Nessun server li riceve: nessuno, oltre a te, può vederli.<\/p>\n<p>Unica eccezione, solo se la attivi con un consenso a parte: il <b>Coach IA<\/b> invia a un server serie, ripetizioni, carichi, RPE, obiettivi e livello per scrivere un commento. Non invia il tuo nome né i dati della BIA.<\/p>\n<h3>2. Quali dati<\/h3>\n<p><b>Profilo di allenamento<\/b>: obiettivi (fino a tre), livello di esperienza, giorni e minuti disponibili, luogo di allenamento, eventuali fastidi fisici, qualità del sonno e livello di stress, preferenze sugli attrezzi.<\/p>\n<p><b>Composizione corporea (BIA)<\/b>: peso, altezza, massa grassa, massa magra, acqua corporea, metabolismo basale e gli altri valori del referto, compresi quelli che caricherai nel tempo. Si tratta di <b>dati relativi alla salute<\/b>: secondo il Regolamento europeo sulla protezione dei dati (GDPR, art. 9), il loro utilizzo richiede il tuo consenso esplicito.<\/p>\n<p><b>Storico degli allenamenti<\/b>: esercizi, serie, ripetizioni, carichi, serie a cedimento, cardio e date. Le <b>foto dei progressi<\/b> restano solo sul telefono.<\/p>\n<h3>3. Per quali scopi<\/h3>\n<p>Esclusivamente per: creare un programma adatto a te; pianificarlo nel calendario per tutta la sua durata; proporti l’aumento dei carichi settimana dopo settimana; valutare i tuoi progressi confrontando le analisi BIA. Nessun altro scopo.<\/p>\n<h3>4. Se non acconsenti<\/h3>\n<p>L’app resta pienamente utilizzabile in modalità manuale: crei le schede, ti alleni e tieni traccia dello storico. Restano disattivati soltanto il programma personalizzato, la lettura della BIA e la progressione automatica dei carichi.<\/p>\n<h3>5. Revoca del consenso<\/h3>\n<p>Puoi revocare il consenso in qualsiasi momento da Opzioni → Privacy e dati. Da quel momento il coach smette di usare i tuoi dati e puoi scegliere di cancellare il profilo e i referti BIA salvati.<\/p>\n<h3>6. Conservazione e cancellazione<\/h3>\n<p>I dati restano sul telefono finché non li cancelli tu, svuoti i dati del browser o disinstalli l’app.<\/p>\n<h3>7. Limiti<\/h3>\n<p>I suggerimenti del coach si basano su principi consolidati di programmazione dell’allenamento e non costituiscono una valutazione medica. In presenza di patologie, dolori o dubbi su un referto, rivolgiti a un medico o a un professionista qualificato.<\/p>\n<p class=\"consent-foot\">Versione dell’informativa: 1.2<\/p>", "en": "<h3>1. Who processes the data<\/h3>\n<p>All data is processed <b>on your device<\/b>, directly by the app. No server receives it: no one but you can see it.<\/p>\n<p>The only exception, and only if you turn it on with a separate consent: the <b>AI Coach<\/b> sends sets, reps, loads, RPE, goals and level to a server to write a comment. It never sends your name or your BIA data.<\/p>\n<h3>2. Which data<\/h3>\n<p><b>Training profile<\/b>: goals (up to three), experience level, available days and minutes, training location, any physical discomfort, sleep quality and stress level, equipment preferences.<\/p>\n<p><b>Body composition (BIA)<\/b>: weight, height, fat mass, lean mass, body water, basal metabolic rate and the other values in the report, including those you upload over time. These are <b>health data<\/b>: under the EU General Data Protection Regulation (GDPR, Art. 9), using them requires your explicit consent.<\/p>\n<p><b>Workout history<\/b>: exercises, sets, reps, loads, sets taken to failure, cardio and dates. <b>Progress photos<\/b> stay on your phone only.<\/p>\n<h3>3. For what purposes<\/h3>\n<p>Only to: build a program that suits you; schedule it in the calendar for its whole duration; suggest load increases week after week; assess your progress by comparing BIA analyses. No other purpose.<\/p>\n<h3>4. If you do not consent<\/h3>\n<p>The app remains fully usable in manual mode: you create your workouts, train and keep your history. Only the personalized program, BIA reading and automatic load progression are turned off.<\/p>\n<h3>5. Withdrawing consent<\/h3>\n<p>You can withdraw your consent at any time from Settings → Privacy and data. From then on the coach stops using your data, and you can choose to delete your profile and saved BIA reports.<\/p>\n<h3>6. Storage and deletion<\/h3>\n<p>Your data stays on your phone until you delete it, clear the browser data or uninstall the app.<\/p>\n<h3>7. Limits<\/h3>\n<p>The coach’s suggestions are based on established training-programming principles and are not a medical assessment. If you have a medical condition, pain or doubts about a report, consult a doctor or a qualified professional.<\/p>\n<p class=\"consent-foot\">Notice version: 1.2<\/p>", "es": "<h3>1. Quién trata los datos<\/h3>\n<p>Todos los datos se procesan <b>en tu dispositivo<\/b>, directamente en la app. Ningún servidor los recibe: nadie más que tú puede verlos.<\/p>\n<p>Única excepción, y solo si la activas con un consentimiento aparte: el <b>Coach IA<\/b> envía a un servidor series, repeticiones, cargas, RPE, objetivos y nivel para escribir un comentario. Nunca envía tu nombre ni los datos de la BIA.<\/p>\n<h3>2. Qué datos<\/h3>\n<p><b>Perfil de entrenamiento<\/b>: objetivos (hasta tres), nivel de experiencia, días y minutos disponibles, lugar de entrenamiento, posibles molestias físicas, calidad del sueño y nivel de estrés, preferencias de material.<\/p>\n<p><b>Composición corporal (BIA)<\/b>: peso, altura, masa grasa, masa magra, agua corporal, metabolismo basal y los demás valores del informe, incluidos los que subas con el tiempo. Son <b>datos relativos a la salud<\/b>: según el Reglamento General de Protección de Datos de la UE (RGPD, art. 9), su uso requiere tu consentimiento explícito.<\/p>\n<p><b>Historial de entrenamientos<\/b>: ejercicios, series, repeticiones, cargas, series al fallo, cardio y fechas. Las <b>fotos de progreso<\/b> se quedan solo en tu teléfono.<\/p>\n<h3>3. Para qué fines<\/h3>\n<p>Solo para: crear un programa adecuado para ti; planificarlo en el calendario durante toda su duración; proponerte aumentos de carga semana tras semana; valorar tu progreso comparando los análisis BIA. Ningún otro fin.<\/p>\n<h3>4. Si no das tu consentimiento<\/h3>\n<p>La app sigue siendo totalmente utilizable en modo manual: creas tus rutinas, entrenas y guardas tu historial. Solo quedan desactivados el programa personalizado, la lectura de la BIA y la progresión automática de cargas.<\/p>\n<h3>5. Retirada del consentimiento<\/h3>\n<p>Puedes retirar tu consentimiento en cualquier momento desde Ajustes → Privacidad y datos. A partir de ese momento el coach deja de usar tus datos y puedes elegir borrar el perfil y los informes BIA guardados.<\/p>\n<h3>6. Conservación y borrado<\/h3>\n<p>Los datos permanecen en el teléfono hasta que los borres, limpies los datos del navegador o desinstales la app.<\/p>\n<h3>7. Límites<\/h3>\n<p>Las sugerencias del coach se basan en principios consolidados de programación del entrenamiento y no constituyen una valoración médica. Si tienes una patología, dolor o dudas sobre un informe, consulta a un médico o a un profesional cualificado.<\/p>\n<p class=\"consent-foot\">Versión del aviso: 1.2<\/p>", "de": "<h3>1. Wer die Daten verarbeitet<\/h3>\n<p>Alle Daten werden <b>auf deinem Gerät<\/b> verarbeitet, direkt in der App. Kein Server erhält sie: Niemand außer dir kann sie sehen.<\/p>\n<p>Einzige Ausnahme, und nur wenn du sie mit einer eigenen Einwilligung aktivierst: Der <b>KI-Coach<\/b> sendet Sätze, Wiederholungen, Gewichte, RPE, Ziele und Niveau an einen Server, um einen Kommentar zu schreiben. Er sendet nie deinen Namen oder deine BIA-Daten.<\/p>\n<h3>2. Welche Daten<\/h3>\n<p><b>Trainingsprofil<\/b>: Ziele (bis zu drei), Erfahrungsniveau, verfügbare Tage und Minuten, Trainingsort, eventuelle körperliche Beschwerden, Schlafqualität und Stresslevel, bevorzugte Geräte.<\/p>\n<p><b>Körperzusammensetzung (BIA)<\/b>: Gewicht, Größe, Fettmasse, Magermasse, Körperwasser, Grundumsatz und die übrigen Werte des Berichts, auch die, die du im Lauf der Zeit hochlädst. Es handelt sich um <b>Gesundheitsdaten<\/b>: Nach der EU-Datenschutz-Grundverordnung (DSGVO, Art. 9) erfordert ihre Nutzung deine ausdrückliche Einwilligung.<\/p>\n<p><b>Trainingsverlauf<\/b>: Übungen, Sätze, Wiederholungen, Gewichte, Sätze bis zum Muskelversagen, Cardio und Daten. <b>Fortschrittsfotos<\/b> bleiben nur auf deinem Telefon.<\/p>\n<h3>3. Zu welchen Zwecken<\/h3>\n<p>Ausschließlich, um: ein passendes Programm für dich zu erstellen; es für die gesamte Dauer im Kalender zu planen; dir Woche für Woche Laststeigerungen vorzuschlagen; deinen Fortschritt durch den Vergleich der BIA-Analysen zu bewerten. Kein anderer Zweck.<\/p>\n<h3>4. Wenn du nicht einwilligst<\/h3>\n<p>Die App bleibt im manuellen Modus voll nutzbar: Du erstellst deine Pläne, trainierst und führst deinen Verlauf. Deaktiviert sind nur das persönliche Programm, das Auslesen der BIA und die automatische Laststeigerung.<\/p>\n<h3>5. Widerruf der Einwilligung<\/h3>\n<p>Du kannst deine Einwilligung jederzeit unter Einstellungen → Datenschutz und Daten widerrufen. Ab dann nutzt der Coach deine Daten nicht mehr, und du kannst dein Profil und die gespeicherten BIA-Berichte löschen.<\/p>\n<h3>6. Speicherung und Löschung<\/h3>\n<p>Die Daten bleiben auf dem Telefon, bis du sie löschst, die Browserdaten entfernst oder die App deinstallierst.<\/p>\n<h3>7. Grenzen<\/h3>\n<p>Die Vorschläge des Coachs beruhen auf anerkannten Prinzipien der Trainingsplanung und sind keine ärztliche Beurteilung. Bei Erkrankungen, Schmerzen oder Fragen zu einem Bericht wende dich an eine Ärztin, einen Arzt oder eine qualifizierte Fachperson.<\/p>\n<p class=\"consent-foot\">Version der Information: 1.2<\/p>"};
function renderInformativa() { const b = document.getElementById('consent-text-body'); if (b) b.innerHTML = INFORMATIVA[lingua()] || INFORMATIVA.it; }
window.openConsentText = function() { renderInformativa(); document.getElementById('consent-text-sheet').classList.remove('hidden'); };
window.closeConsentText = function() { document.getElementById('consent-text-sheet').classList.add('hidden'); };
