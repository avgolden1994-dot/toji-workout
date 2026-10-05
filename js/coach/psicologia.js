/* Psicologia: chi ha davanti il coach
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   PSICOLOGIA: CHI HA DAVANTI IL COACH
   Otto domande brevi, ognuna tratta da uno strumento validato:
   - motivazione (BREQ-3, teoria dell autodeterminazione, Teixeira 2012)
   - preferenza e tolleranza dell’intensità (PRETIE-Q, Ekkekakis 2005)
   - autoefficacia (McAuley), tutto-o-niente dopo una pausa (BMC 2025)
   - disagio in palestra (Frontiers 2026), varieta (Kassiano 2022)
   - piano B = intenzioni di implementazione (PLOS One 2018)
   Le risposte non cambiano le regole: cambiano come il coach le usa.
   ============================================================ */
const PSICO_DOMANDE = [
  { k: 'motivo', q: 'Cosa ti spinge ad allenarti?', nota: 'Il coach sceglie cosa mettere in evidenza quando ti parla.',
    o: [['piacere', 'Mi piace'], ['valore', 'È importante per me'], ['dovere', 'Mi sentirei in colpa a non farlo'], ['altri', 'Per come appaio o perché me lo chiedono']] },
  { k: 'preferenza', q: 'Che allenamenti preferisci?', nota: 'Chi si allena come gli piace continua più a lungo.',
    o: [['tranquilli', 'Tranquilli'], ['impegnativi', 'Impegnativi'], ['durissimi', 'Durissimi']] },
  { k: 'tolleranza', q: 'Quando la fatica si fa sentire…', nota: 'Decide quanto vicino al cedimento ti porta il coach.',
    o: [['mi-fermo', 'Mi fermo'], ['continuo', 'Continuo un po’'], ['spingo', 'Spingo fino in fondo']] },
  { k: 'fiducia', q: 'Quanto sei sicuro di allenarti anche stanco o con poco tempo?', nota: 'Con poca fiducia si parte più corti: prima viene la costanza.',
    o: [['poca', 'Poco'], ['media', 'Abbastanza'], ['alta', 'Molto']] },
  { k: 'dopoPausa', q: 'Se salti un allenamento…', nota: 'Il coach ti aiuta a ripartire senza perdere il filo.',
    o: [['riprendo', 'Riprendo tranquillo'], ['colpa', 'Mi sento in colpa ma riprendo'], ['mollo', 'Spesso mollo per giorni']] },
  { k: 'palestra', q: 'In palestra ti senti…', nota: 'Se ti mette a disagio: esercizi semplici e pochi cambi di postazione.',
    o: [['agio', 'A mio agio'], ['osservato', 'Un po’ osservato'], ['disagio', 'A disagio']] },
  { k: 'varieta', q: 'Esercizi: sempre gli stessi o cambiare?', nota: 'Decide quanto cambiano gli esercizi da un ciclo all’altro.',
    o: [['routine', 'Sempre gli stessi'], ['mix', 'Un po’ di tutto'], ['varieta', 'Cambiare spesso']] },
  { k: 'pianoB', q: 'Se qualcosa si mette in mezzo, cosa fai?', nota: 'Deciderlo prima aiuta a non saltare.',
    o: [['corta', 'Una seduta corta'], ['sposta', 'La sposto a un altro giorno'], ['casa', 'Qualcosa a casa']] }
];
function psicoCoach(s) {
  s = s || {};
  const pr = { tranquilli: 0, impegnativi: 1, durissimi: 2 }[s.preferenza];
  const tl = { 'mi-fermo': 0, continuo: 1, spingo: 2 }[s.tolleranza];
  let intensita = 'media';
  if (pr !== undefined || tl !== undefined) {
    const t = (pr === undefined ? 1 : pr) + (tl === undefined ? 1 : tl);
    intensita = t <= 1 ? 'bassa' : (t >= 3 ? 'alta' : 'media');
  }
  return {
    intensita: intensita,
    fiduciaBassa: s.fiducia === 'poca',
    tuttoNiente: s.dopoPausa === 'mollo',
    colpa: s.dopoPausa === 'colpa' || s.motivo === 'dovere',
    disagio: s.palestra === 'disagio',
    osservato: s.palestra === 'osservato',
    varieta: s.varieta === 'routine' ? 0 : (s.varieta === 'varieta' ? 1.6 : 1),
    pianoB: s.pianoB || null,
    motivo: s.motivo || null,
    risposte: Object.keys(s).filter(k => s[k]).length
  };
}
/* come il coach ti descrive: ogni riga e una regola che cambia */
function ritrattoCoach(ps) {
  const r = [];
  if (ps.intensita === 'bassa') r.push('Intensità su misura: 2-4 ripetizioni in riserva, niente drop o AMRAP, fine seduta più leggera. Chi si allena come gli piace continua più a lungo.');
  if (ps.intensita === 'alta') r.push('Ti piace spingere: tecniche intense ammesse, il cedimento resta sugli isolamenti per proteggere le articolazioni.');
  if (ps.fiduciaBassa) r.push('Primo mese: l’obiettivo è presentarti due volte a settimana, con sedute un po’ più corte. La fiducia cresce riuscendo.');
  if (ps.tuttoNiente) r.push('Se salti, ti propongo subito una seduta corta: meglio poco che niente.');
  else if (ps.colpa) r.push('Niente sensi di colpa: contano le settimane, non il singolo giorno.');
  if (ps.disagio) r.push('Esercizi semplici con manubri e macchine, pochi cambi di postazione. Negli orari tranquilli la palestra è più tua, e la tua musica aiuta.');
  else if (ps.osservato) r.push('Ogni esercizio ha la sua scheda tecnica: sapere cosa fare toglie gran parte del disagio.');
  if (ps.varieta < 1) r.push('Stessi esercizi a lungo: la forza cresce su ciò che ripeti.');
  if (ps.varieta > 1) r.push('Esercizi che cambiano a ogni ciclo, sempre sugli stessi schemi di movimento.');
  if (ps.motivo === 'piacere') r.push('Ti propongo sfide e record da battere.');
  if (ps.motivo === 'valore') r.push('Ogni scelta ha il suo perché, legato al tuo obiettivo.');
  if (ps.motivo === 'altri') r.push('Piccoli traguardi visibili: il piacere di allenarti si costruisce riuscendo.');
  if (ps.pianoB === 'corta') r.push('Piano B: una seduta corta di 20 minuti.');
  if (ps.pianoB === 'casa') r.push('Piano B: 20 minuti a corpo libero a casa.');
  if (ps.pianoB === 'sposta') r.push('Piano B: la seduta si sposta al primo giorno libero.');
  return r;
}
window.onbPsico = function(k, v) {
  onbData.psico = onbData.psico || {};
  onbData.psico[k] = onbData.psico[k] === v ? null : v;
  renderOnb();
};
window.setPsico = function(k, v) {
  const p = getProfile() || {};
  p.psico = p.psico || {};
  p.psico[k] = p.psico[k] === v ? null : v;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
function htmlDomandePsico(risposte, fn, chipFn) {
  return PSICO_DOMANDE.map(d => '<div class="aw-sec">' + d.q + '</div><div class="pref-note">' + d.nota + '</div>' +
    '<div class="aw-groups">' + d.o.map(([v, t]) => chipFn((risposte || {})[d.k] === v, fn + "('" + d.k + "','" + v + "')", t)).join('') + '</div>').join('');
}
function renderPsicoStep() {
  return '<div class="onb-q">Come ti alleni meglio</div>' +
    '<div class="onb-why">Otto domande veloci, tutte facoltative. Il coach capisce chi ha davanti e usa le sue regole a modo tuo.</div>' +
    htmlDomandePsico(onbData.psico, 'onbPsico', chip) +
    '<div class="aw-sec">Stai passando un periodo particolare?</div>' +
    '<div class="pref-note">Facoltativo. Il coach dosa il volume per qualche settimana e poi ti chiede come va.</div>' +
    '<div class="aw-groups">' + MOMENTI.map(m => chip(onbData.momentoNuovo === m.id, "onbMomento('" + m.id + "')", m.nome)).join('') + '</div>';
}
window.onbMomento = function(id) { onbData.momentoNuovo = onbData.momentoNuovo === id ? null : id; renderOnb(); };
/* il primo mese: l’obiettivo e presentarsi (studio 2026 su 389 mila utenti: conta la costanza dei primi 28 giorni) */
function htmlPrimiPassi() {
  if (!coachAttivo()) return '';
  const prog = getProgramma(), prof = getProfile() || {};
  if (!prog || !prog.inizio) return '';
  const ps = psicoCoach(prof.psico);
  if (!(ps.fiduciaBassa || ps.tuttoNiente || ps.motivo === 'altri' || prof.level === 'principiante')) return '';
  const inizio = daYmd(prog.inizio), oggi = new Date();
  const g = giorniTra(inizio, oggi);
  if (g < 0 || g >= 28) return '';
  const fatti = tutteLeSedute().filter(h0 => { const d = dataSessione(h0); return d && d >= inizio; }).length;
  const obiettivo = 8;
  return '<div class="pc-row pc-sep"><span class="pc-t"><span>Primo mese</span></span><span><b>' + Math.min(fatti, obiettivo) + '</b> / ' + obiettivo + ' <span>allenamenti</span></span></div>' +
    '<div class="wday-progress"><span style="width:' + Math.min(100, Math.round(fatti / obiettivo * 100)) + '%"></span></div>' +
    '<div class="pc-sub">' + (fatti >= obiettivo ? 'Abitudine avviata.' : 'Obiettivo: 2 sedute a settimana.') + '</div>';
}
/* piano B dopo una seduta saltata: corta (i primi 3 esercizi, 2 serie) o a casa (corpo libero) */
function sedutaPianoB(tipo, v) {
  if (tipo === 'casa') {
    return ['Squat a Corpo Libero', 'Piegamenti a Terra (Push-up)', 'Ponte Glutei', 'Affondi Inversi', 'Plank']
      .map(n => nomeInLibreria(n)).filter(Boolean).map(n => { const m = findExercise(n) || {}; return { name: n, sets: 2, reps: m.reps || 12, weight: 0, rest: 60 }; });
  }
  const nomi = (v.items || []).map(x => x.name).filter(n => findExercise(n)).slice(0, 3);
  return eserciziDaNomi(nomi).map(e => Object.assign(e, { sets: 2 }));
}

const TEMI = { dark: 'Scuro', light: 'Chiaro', auto: 'Automatico' };

function renderSettings() {
  const prof = getProfile();
  const nome = getNome();
  const sett = coachAttivo() ? settimanaProgramma() : null;
  const iniziali = (nome || '?').trim().split(/\s+/).map(x => x.charAt(0)).join('').slice(0, 2).toUpperCase();

  const bia = (function() {
    if (!coachAttivo()) return 'Serve il consenso';
    const st = getBiaStorico();
    if (!st.length) return 'Nessun referto';
    return daYmd(st[st.length - 1].data).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  })();
  const timerVal = [isOn(SOUND_KEY, true) ? 'Suono' : null, isOn(FLASH_KEY, true) ? (isOn(SOUND_KEY, true) ? 'lampeggio' : 'Lampeggio') : null].filter(Boolean).join(' e ') || 'Silenzioso';

  document.getElementById('settings-body').innerHTML =
    '<button class="sr-profile" onclick="openSetPage(\'profilo\')">' +
      '<span class="sr-avatar">' + escapeHtml(iniziali) + '</span>' +
      '<span class="sr-pmain"><span class="sr-pname">' + (nome ? escapeHtml(nome) : 'Aggiungi il tuo nome') + '</span>' +
      '<span class="sr-psub">' + (sett && !sett.finito ? 'Programma: settimana ' + sett.numero + ' di ' + sett.totale
        : (prof ? escapeHtml(prof.split || 'Programma personalizzato') : (coachAttivo() ? 'Nessun programma attivo' : 'Allenamento in autonomia'))) + '</span></span>' +
      '<span class="sr-go" aria-hidden="true">›</span></button>' +

    setGroup('Profilo',
      setRow('prog', 'c-primary', 'Programma', prof ? escapeHtml(prof.split || 'Attivo') : 'Nessuno', 'openSetPage(\'programma\')') +
      setRow('body', 'c-success', 'Composizione corporea', bia, 'openBiaSheet()') +
      (coachAttivo() ? setRow('coach', 'c-accent', 'Il coach', (prof && prof.level) ? escapeHtml(prof.level.charAt(0).toUpperCase() + prof.level.slice(1)) : '', 'openSetPage(\'coach\')') : '')) +

    setGroup('Allenamento',
      setRow('timer', 'c-warning', 'Timer di recupero', timerVal, 'openSetPage(\'timer\')') +
      '<button class="sr-row" onclick="openMusicSheet()">' + setIco('music', 'c-accent') +
        '<span class="sr-name">Canzone del Cedimento<small>Vale per tutti gli allenamenti</small></span>' +
        '<span class="sr-val" id="set-music-name">' + escapeHtml(nomeMusica() || 'La tua musica') + '</span><span class="sr-go" aria-hidden="true">›</span></button>' +
      setRowSwitch('disc', 'c-muted', DISCHI_KEY, true, 'Calcolatore dischi')) +

    setGroup('App',
      setRow('lang', 'c-success', 'Lingua', LINGUE[lingua()], 'openSetPage(\'lingua\')') +
      setRow('theme', 'c-primary', 'Aspetto', TEMI[getSetting(THEME_KEY, 'dark')] || 'Scuro', 'openSetPage(\'aspetto\')')) +

    setGroup('I tuoi dati',
      setRow('save', 'c-primary', 'Esporta backup', (localStorage.getItem('tz_ultimo_backup') ? '<span data-no-tr>' + daYmd(localStorage.getItem('tz_ultimo_backup')).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' }) + '</span>' : 'Mai'), 'esportaBackup()') +
      setRow('restore', 'c-success', 'Ripristina backup', '', 'ripristinaBackup()') +
      setRow('import', 'c-accent', 'Importa i tuoi progressi', '', 'importaProgressi()'),
      'Il backup è un file: salvalo in File, Drive o iCloud. Serve anche per cambiare telefono.') +

    setGroup('Privacy e dati',
      setRow('shield', coachAttivo() ? 'c-success' : 'c-muted', 'Consenso ai dati', coachAttivo() ? 'Attivo' : 'Non dato', 'openSetPage(\'privacy\')') +
      setRow('spark', coachIAAttivo() ? 'c-accent' : 'c-muted', 'Coach IA', coachIAAttivo() ? 'Attivo' : 'Spento', 'openSetPage(\'privacy\')') +
      setRow('doc', 'c-muted', 'Informativa sui dati', '', 'openConsentText()')) +

    setGroup('Supporto',
      setRow('book', 'c-primary', 'Guida interattiva', 'Impara usando l’app', 'avviaGuida()') +
      setRow('refresh', 'c-success', 'Cerca aggiornamenti', '', 'cercaAggiornamento()')) +

    setGroup('',
      setRow('trash', 'c-danger', 'Cancella lo storico allenamenti', '', 'clearHistory(); renderSettings();', 'danger')) +

    '<div class="sr-foot"><span data-no-tr>3in</span> · <span>versione</span> <b id="app-versione">' + APP_VERSIONE + '</b><br>' +
      'I tuoi dati restano su questo telefono. I consigli del coach non sostituiscono il parere di un medico.</div>' +
    '<div class="sr-ia">' + ico('scintilla') + ' <span>Sviluppata in collaborazione con un’intelligenza artificiale</span></div>';

  if (setPagina) renderSetPage();
}

/* ---- pagine di dettaglio ---- */
let setPagina = null;
const SET_PAGINE = {
  profilo: 'Profilo', programma: 'Programma', timer: 'Timer di recupero',
  aspetto: 'Aspetto', lingua: 'Lingua', privacy: 'Consenso ai dati', guida: 'Guida alle funzioni', coach: 'Il coach'
};
window.openSetPage = function(id) {
  setPagina = id;
  document.getElementById('set-page-title').innerText = SET_PAGINE[id] || '';
  renderSetPage();
  document.getElementById('set-page').classList.remove('hidden');
};
window.closeSetPage = function() {
  setPagina = null;
  document.getElementById('set-page').classList.add('hidden');
  if (currentTab === 'impostazioni') renderSettings();
};

function renderSetPage() {
  const box = document.getElementById('set-page-body');
  if (!box || !setPagina) return;
  const prof = getProfile();
  let h = '';
  if (setPagina === 'profilo') {
    h = setGroup('Il tuo nome',
      '<label class="sr-row sr-input"><input type="text" id="set-nome" value="' + escapeHtml(getNome()) + '" placeholder="Come ti chiami" ' +
      'oninput="salvaNome(this.value)" autocomplete="given-name"></label>', 'Compare nel saluto e nei report dei progressi.');
  } else if (setPagina === 'programma') {
    h = setGroup('Programma attuale',
      '<div class="sr-row sr-static"><span class="sr-name">' + (prof ? escapeHtml(prof.split || 'Personalizzato') +
        '<small>' + escapeHtml((prof.goals || [prof.goal]).filter(Boolean).join(', ')) + ' • ' + (prof.settimane || '-') + ' settimane</small>'
        : 'Nessun programma<small>Crealo con il questionario del coach</small>') + '</span></div>') +
      setGroup('', setRow('prog', 'c-primary', prof ? 'Rifai il programma personalizzato' : 'Crea il programma personalizzato', '', 'closeSetPage(); restartOnboarding();'),
        'Il programma attuale viene sostituito. Gli allenamenti già completati restano nello storico.') +
      setGroup('Condividi la scheda',
        setRow('share', 'c-primary', 'Invia come testo', '', 'condividiScheda()') +
        setRow('print', 'c-muted', 'Stampa o salva in PDF', '', 'stampaScheda()'),
        'Per il tuo allenatore o per chi si allena con te. Nel PDF ci sono le caselle da spuntare.');
  } else if (setPagina === 'timer') {
    h = setGroup('Avvisi a fine recupero',
      toggleHtml(SOUND_KEY, true, 'Suono a fine recupero', 'Quando il tempo scade') +
      toggleHtml(COUNTDOWN_KEY, true, 'Conto alla rovescia sonoro', 'Bip negli ultimi 5 secondi') +
      toggleHtml(FLASH_KEY, true, 'Lampeggia lo schermo', 'Funziona anche senza audio') +
      toggleHtml(BYPASS_KEY, false, 'Suona anche in silenzioso', 'Solo per la canzone del cedimento, ferma la tua musica per 90 secondi')) +
      setGroup('Comportamento', toggleHtml(AUTOCLOSE_KEY, true, 'Chiudi da solo a fine recupero', 'Senza doverlo toccare') +
        toggleHtml(WAKE_KEY, true, 'Schermo sempre acceso in seduta', 'Non si spegne mentre ti alleni')) +
      '<button class="set-row-btn" onclick="testSound()">Prova il suono</button>' +
      '<div class="sr-note">Se con il silenzioso non senti nulla, affidati al lampeggio.</div>';
  } else if (setPagina === 'coach') {
    h = paginaCoach(prof || {});
  } else if (setPagina === 'aspetto') {
    h = setGroup('Tema',
      ['dark', 'light', 'auto'].map(t => {
        const on = getSetting(THEME_KEY, 'dark') === t;
        return '<button class="sr-row" onclick="setTheme(\'' + t + '\')" aria-pressed="' + on + '"><span class="sr-name">' + TEMI[t] + '</span>' +
          '<span class="sr-check">' + (on ? '✓' : '') + '</span></button>';
      }).join(''), 'Il tema chiaro si legge meglio all’aperto. Automatico segue le impostazioni del telefono.') +
      setGroup('Zoom', setRowSwitch('zoom', 'c-muted', ZOOM_KEY, false, 'Zoom con le dita'),
        'Permette di ingrandire l’app pizzicando lo schermo. Spento, la schermata resta fissa come un’app.');
  } else if (setPagina === 'lingua') {
    /* i nomi delle lingue restano nella loro lingua: chi non capisce
       quella attuale riconosce comunque la propria */
    h = setGroup('Lingua dell’app',
      Object.keys(LINGUE).map(l => '<button class="sr-row" data-no-tr onclick="setLingua(\'' + l + '\')" aria-pressed="' + (lingua() === l) + '"><span class="sr-name">' + LINGUE[l] + '</span>' +
        '<span class="sr-check">' + (lingua() === l ? '\u2713' : '') + '</span></button>').join(''),
      'Al primo avvio l’app usa la lingua del telefono. Le tue parole (nomi dei giorni, note, canzoni) restano come le hai scritte.');
  } else if (setPagina === 'privacy') {
    const quando = localStorage.getItem(CONSENT_KEY + '_data');
    h = setGroup('Stato',
      '<div class="sr-row sr-static">' + setIco('shield', coachAttivo() ? 'c-success' : 'c-muted') + '<span class="sr-name">' +
        (coachAttivo() ? 'Consenso dato' + (quando ? '<small>' + escapeHtml(quando) + '</small>' : '') : 'Nessun consenso<small>Il coach è spento: ti alleni in autonomia</small>') +
      '</span></div>',
      coachAttivo() ? 'Il coach usa questionario, BIA e storico solo su questo telefono.' : 'Con il consenso il coach crea il programma e aumenta i carichi per te.') +
      setGroup('', setRow('doc', 'c-muted', 'Leggi l’informativa', '', 'openConsentText()')) +
      setGroup('', coachAttivo()
        ? '<button class="sr-row danger" onclick="revocaConsenso()"><span class="sr-name">Revoca il consenso</span></button>'
        : '<button class="sr-row" onclick="setConsenso(true, false); renderSettings();"><span class="sr-name sr-primary">Acconsento all’uso dei miei dati</span></button>') +
      htmlPrivacyIA();
  } else if (setPagina === 'guida') {
    const voci = [
      ['Oggi', 'L’allenamento del giorno, la settimana a colpo d’occhio e gli obiettivi di serie per spinta, tirata e gambe.'],
      ['Piano', 'La tua settimana tipo: aggiungi esercizi per gruppo muscolare, usa le schede pronte o chiedi al coach.'],
      ['Seduta', 'Registra ripetizioni e carico di ogni serie. Il recupero parte da solo quando spunti una serie.'],
      ['RPE', 'Quanto è stata dura la serie, da 6 a 10: 10 è il cedimento, 8 vuol dire che avevi ancora 2 ripetizioni.'],
      ['Cedimento', 'Tocca il fuoco su una serie per portarla a cedimento con 90 secondi e la tua canzone. Ritocca il fuoco per toglierlo.'],
      ['Calendario', 'Il mese reale: scambia i giorni nella stessa settimana, copia una settimana, esporta verso il calendario del telefono.'],
      ['Progressi', 'Un report ogni 4 settimane confronta i tuoi carichi con il blocco precedente, con il giudizio del coach.'],
      ['Coach', 'Con il tuo consenso crea il programma, aumenta i carichi quando completi tutte le serie e legge la tua BIA.'],
      ['Seduta libera', 'Fuori programma: ripeti un allenamento o scegli gli esercizi. Con Seduta passata registri un allenamento che non avevi segnato.'],
      ['Drop e rest-pause', 'Dopo la prima serie compaiono + Drop (-20% di carico) e + Rest-pause (stesso carico dopo 20 secondi). Non contano per gli aumenti del coach.'],
      ['Backup', 'Opzioni > I tuoi dati: esporta un file con tutto, ripristinalo su un altro telefono o importa lo storico da Strong, Hevy e FitNotes.']
    ];
    h = '<div class="sr-group"><div class="sr-list">' + voci.map(v =>
      '<div class="sr-row sr-static sr-guide"><span class="sr-name">' + v[0] + '<small>' + v[1] + '</small></span></div>').join('') + '</div></div>';
  }
  box.innerHTML = h;
}
