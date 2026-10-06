/* Opzioni: il coach
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   OPZIONI > IL COACH: tutto quello che il coach deve sapere di te
   ============================================================ */
const FASI_CORPO = [['massa', 'Massa'], ['mantenimento', 'Mantenimento'], ['deficit', 'Dimagrimento'], ['ricomposizione', 'Ricomposizione']];
const ATTREZZI_PALESTRA = [['bilanciere', 'Bilanciere'], ['manubri', 'Manubri'], ['macchine', 'Macchine e cavi'], ['sbarra', 'Sbarra']];
function chipCoach(on, onclick, testo) { return '<button class="fb-chip' + (on ? ' on' : '') + '" onclick="' + onclick + '">' + testo + '</button>'; }
function paginaCoach(p) {
  const livelli = [['principiante', 'Principiante'], ['intermedio', 'Intermedio'], ['avanzato', 'Avanzato']];
  const l = livelloStimato();
  const donna = p.sex === 'F' || p.sex === 'donna';
  let h = setGroup('Livello', '<div class="fb-chips sr-chips-pad">' + livelli.map(([k, t]) => chipCoach(p.level === k, "setCoach('level','" + k + "')", t)).join('') + '</div>',
    l ? '<span>Dal tuo storico:</span> ' + l.livello + ' \u2014 ' + l.testo : 'Il livello dipende da quanto e come ti alleni: dopo qualche settimana il coach lo verifica sul tuo storico.');
  h += setGroup('Fase', '<div class="fb-chips sr-chips-pad">' + FASI_CORPO.map(([k, t]) => chipCoach(p.fase === k, "setCoach('fase','" + k + "')", t)).join('') + '</div>',
    'In dimagrimento il coach tiene i carichi e controlla che il peso scenda dello 0,5-1% a settimana.');
  h += setGroup('Su di te',
    '<label class="sr-row sr-input"><span class="sr-name">Peso corporeo (kg)</span><input type="number" inputmode="decimal" value="' + (p.weight || '') + '" onchange="setCoach(\'weight\', Number(this.value) || null)"></label>' +
    '<label class="sr-row sr-input"><span class="sr-name">Età</span><input type="number" inputmode="numeric" min="' + PARAM_ETA.min + '" max="' + PARAM_ETA.max + '" step="1" value="' + (p.age || '') + '" onchange="setCoach(\'age\', Number(this.value) || null)"></label>' +
    '<div class="fb-chips sr-chips-pad">' + chipCoach(p.sex === 'M' || p.sex === 'uomo', "setCoach('sex','M')", 'Uomo') + chipCoach(donna, "setCoach('sex','F')", 'Donna') + '</div>' +
    '<label class="sr-row sr-input"><span class="sr-name">Orario abituale</span><input type="time" value="' + (p.orario || '') + '" onchange="setCoach(\'orario\', this.value)"></label>',
    'L orario fisso aiuta a creare l abitudine: se passa senza allenamento, Oggi te lo ricorda.');
  h += htmlForzaCoach(p);
  h += htmlAttrezziCoach(p);
  h += setGroup('Muscoli su cui puntare (fino a 3)', '<div class="fb-chips sr-chips-pad">' + GRUPPI_PRINCIPALI.map(g =>
    chipCoach((p.priorita || []).indexOf(g) !== -1, "toggleCoachLista('priorita','" + g + "')", MUSCLE_GROUPS[g].label)).join('') + '</div>',
    'Più serie per questi. Avanzati: specializzazione (+50%) a rotazione, mai in dimagrimento.');
  h += setGroup('Esigenza del coach', '<div class="psico-coach">' + htmlEsigenza() + '</div>',
    'Parte dal 120% e si adatta ogni settimana: serie facili la alzano, stanchezza, dolore o sedute saltate la abbassano.');
  h += setGroup('Quante volte per muscolo', '<div class="fb-chips sr-chips-pad">' + ONB_FREQ.map(f => chipCoach(String(p.freq || 'auto') === f.id, "setFreqCoach('" + f.id + "')", f.name)).join('') + '</div>',
    'Vale dal prossimo programma. Conta soprattutto il totale delle serie.');
  h += setGroup('Salute',
    toggleCoach('parq', !!p.parq, 'Modalità prudente', 'Almeno un sì al questionario di salute: niente cedimento, aumenti più piccoli') +
    (donna ? toggleCoach('cicloTraccia', !!p.cicloTraccia, 'Sintomi del ciclo', 'Una domanda in più nel check prima della seduta') : ''));
  const lista = (arr, vuoto) => arr && arr.length ? arr.map(n => '<div class="sr-row sr-static"><span class="sr-name">' + escapeHtml(senzaEmoji(n)) + '</span>' +
    '<button class="og-link" onclick="togliPreferenza(' + JSON.stringify(n).replace(/"/g, '&quot;') + ')">Togli</button></div>').join('') : '<div class="sr-row sr-static"><span class="sr-name"><small>' + vuoto + '</small></span></div>';
  h += setGroup('Test in due minuti', '<div class="psico-coach">' + htmlTestFaiDaTe(p.test) + '</div>',
    'Il coach sceglie le varianti in base al tuo corpo: talloni rialzati, spinte inclinate, larghezza dello squat.');
  const moA = momentoAttivo();
  h += setGroup('Momento di vita', '<div class="psico-coach" id="mo-anchor"><div class="aw-groups">' + MOMENTI.map(m => chipCoach(moA && moA.id === m.id, "chiediMomento('" + m.id + "')", m.nome)).join('') + '</div></div>' +
    (moA && momentoInAttesa ? '<div class="mo-conf"><div class="mo-conf-t">' + (momentoInAttesa === moA.id ? 'Chiudere il periodo?' : 'Cambiare periodo?') + '</div>' +
      '<div class="mo-conf-d">' + (momentoInAttesa === moA.id ? 'Il piano torna com’era.' : 'Il coach riparte con le regole del nuovo periodo.') + '</div>' +
      '<div class="pc-btns"><button class="btn-archive" onclick="confermaMomento(false)">Annulla</button><button class="btn-archive mo-si" onclick="confermaMomento(true)">Conferma</button></div></div>' :
     (moA ? '<div class="sr-row sr-static"><span class="sr-name"><small>' + moA.testo + '</small></span></div>' : '')),
    moA ? 'Per chiuderlo, tocca il periodo attivo e conferma.' : 'Se stai vivendo qualcosa di pesante, il coach alleggerisce il piano e poi ti chiede come va.');
  const progA = getProgramma();
  h += setGroup('Da dove prende spunto il coach', '<div class="psico-coach">' + (progA && progA.ispirazioni ? htmlIspirazioni(progA.ispirazioni) : '<div class="met-att">Rifai il programma per vedere da quali metodi prende spunto.</div>') + '</div>' +
    '<button class="sr-row" onclick="apriTuttiMetodi()"><span class="sr-name">Tutti i metodi (' + METODI.length + ')</span><span class="sr-go" aria-hidden="true">\u203A</span></button>',
    'Il coach compone il programma con fattore fisico, psicologico e momento di vita.');
  const rit = ritrattoCoach(psicoCoach(p.psico));
  h += setGroup('Come ti alleni meglio', '<div class="psico-coach">' + htmlDomandePsico(p.psico, 'setPsico', chipCoach) + '</div>',
    'Tutte facoltative: tocca di nuovo una risposta per toglierla.');
  if (rit.length) h += setGroup('Il coach ti vede così', rit.map(x => '<div class="sr-row sr-static"><span class="sr-name"><small>' + x + '</small></span></div>').join(''));
  h += setGroup('Esercizi che ti piacciono', lista(p.graditi, 'Nessuno: toccali nella scheda di un esercizio'));
  h += setGroup('Esercizi che non vuoi', lista(p.odiati, 'Nessuno'));
  h += setGroup('Tecniche che il coach può usare',
    Object.keys(TECNICHE).map(k => '<div class="sr-row sr-static"><span class="sr-name">' + escapeHtml(TECNICHE[k]) + '</span></div>').join('') +
    '<div class="sr-row sr-static"><span class="sr-name">Allenamento a flusso ridotto (fasce): solo su richiesta, 20-40% del massimale, 30-15-15-15 ripetizioni. Da evitare con rischio di trombosi o problemi al cuore.</span></div>');
  h += '<button class="set-row-btn" onclick="closeSetPage(); nuovoCiclo(true);">Rifai il programma con queste preferenze</button>' +
    '<div class="sr-note">Gli allenamenti già fatti restano nello storico. Il nuovo programma parte da lunedì prossimo.</div>';
  return h;
}
/* CAS-01 (W2-T5): gli attrezzi di chi si allena in palestra (elenco e attrezzi in piu) o a casa (cosa ha e il manubrio piu pesante). Gli stessi campi dell onboarding e del brief (regia/brief.js) */
function htmlAttrezziCoach(p) {
  const casa = p.luogo === 'manubri' || p.luogo === 'corpo', dichiarabili = typeof regolaAttiva !== 'function' || regolaAttiva('CAS-01');   /* CAS-01 spenta: solo l elenco degli attrezzi della palestra, come prima */
  if (!casa || !dichiarabili) {
    const extra = Array.isArray(p.extraPalestra) ? p.extraPalestra : [];
    return setGroup('Attrezzi della tua palestra', '<div class="fb-chips sr-chips-pad">' + ATTREZZI_PALESTRA.map(([k, t]) =>
      chipCoach(!p.attrezziPalestra || p.attrezziPalestra.indexOf(k) !== -1, "toggleCoachLista('attrezziPalestra','" + k + "')", t)).join('') + '</div>',
      'Il coach propone solo esercizi che puoi fare davvero.') + (!dichiarabili ? '' :
      setGroup('Altri attrezzi in palestra', '<div class="fb-chips sr-chips-pad">' + ATTREZZI_EXTRA_PALESTRA_IDS.map(k =>
        chipCoach(extra.indexOf(k) !== -1, "toggleCoachLista('extraPalestra','" + k + "')", ONB_ATTREZZI_NOMI[k])).join('') + '</div>',
        'Tocca quelli che trovi. Se non rispondi, il coach pensa a una palestra completa.'));
  }
  const dichiarati = Array.isArray(p.attrezziCasa) ? p.attrezziCasa : [];
  return setGroup('Attrezzi di casa', '<div class="fb-chips sr-chips-pad">' + ATTREZZI_CASA_IDS.filter(k => k !== 'manubri').map(k =>
    chipCoach(dichiarati.indexOf(k) !== -1, "toggleCoachLista('attrezziCasa','" + k + "')", ONB_ATTREZZI_NOMI[k])).join('') + '</div>' +
    (p.luogo === 'manubri' ? '<label class="sr-row sr-input"><span class="sr-name">Manubrio più pesante (kg)</span><input type="number" inputmode="decimal" min="1" max="100" step="0.5" value="' + (p.manubriKg || '') + '" onchange="setManubriKgCoach(this.value)"></label>' : ''),
    'Pavimento, una sedia robusta e un gradino li do per scontati. Se tocchi qualcosa, scelgo gli esercizi solo con quello (e con i manubri, se ti alleni con quelli); se non rispondi, non conto su sbarra, elastici, kettlebell e anelli. Vale dal prossimo programma.');
}
/* FRZ-01 (INT-2e, W2-T7): «Che forza?» e «Dove ti blocchi?» anche in Opzioni, per chi ha la forza come primo obiettivo: gli stessi campi dell onboarding (forzaTipo, puntiDeboli), letti da «Rifai il programma» */
function htmlForzaCoach(p) {
  const goals = p.goals || (p.goal ? [p.goal] : []);
  if (goals[0] !== 'forza' || typeof FORZA_TIPI_TESTI === 'undefined' || (typeof regolaAttiva === 'function' && !regolaAttiva('FRZ-02'))) return '';
  const pl = String(p.forzaTipo || '') === 'powerlifting';
  return setGroup('Che forza?', '<div class="fb-chips sr-chips-pad">' + FORZA_TIPI_TESTI.map(t => chipCoach(String(p.forzaTipo || '') === t[0], "setForzaTipoCoach('" + t[0] + "')", t[1])).join('') + '</div>',
    FORZA_NOTA_REQUISITI) + (pl ? setGroup('Dove ti blocchi?', '<div class="fb-chips sr-chips-pad">' + Object.keys(FORZA_PUNTI_TESTI).map(k =>
      chipCoach((p.puntiDeboli || []).indexOf(k) !== -1, "togglePuntoDeboleCoach('" + k + "')", FORZA_PUNTI_TESTI[k])).join('') + '</div>', FORZA_NOTA_PUNTI) : '');
}
window.setForzaTipoCoach = function(v) {
  const p = getProfile() || {};
  if (p.forzaTipo === v) delete p.forzaTipo; else p.forzaTipo = v;   /* un secondo tocco toglie la risposta: torna la forza di sempre */
  if (p.forzaTipo !== 'powerlifting') delete p.puntiDeboli;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
window.togglePuntoDeboleCoach = function(k) {
  const p = getProfile() || {};
  const l = forzaCambiaPunto(p.puntiDeboli, k);
  if (l.length) p.puntiDeboli = l; else delete p.puntiDeboli;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
function toggleCoach(k, on, nome, sub) {
  return '<button class="sr-row" onclick="setCoach(\'' + k + '\', ' + (!on) + ')" role="switch" aria-checked="' + on + '"><span class="sr-name">' + nome + '<small>' + sub + '</small></span><span class="switch ' + (on ? 'on' : '') + '"></span></button>';
}
window.setCoach = function(k, v) {
  /* ETA-01: l eta resta obbligatoria e nei limiti anche dopo l avvio (sotto 13 anni nessun programma): un valore non valido non si salva */
  if (k === 'age') { const e = etaPerProgramma(v); if (!e.ok) { showUndo(e.messaggio); renderSetPage(); return; } }
  const p = getProfile() || {};
  p[k] = v;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
window.setFreqCoach = function(v) {
  const p = getProfile() || {};
  p.freq = v;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
window.toggleCoachLista = function(k, v) {
  const p = getProfile() || {};
  let l = p[k];
  if (k === 'attrezziPalestra' && !l) l = ATTREZZI_PALESTRA.map(x => x[0]);
  l = (l || []).slice();
  const i = l.indexOf(v);
  if (i === -1) { if (k === 'priorita' && l.length >= 3) { showUndo('Al massimo tre: se tutto è prioritario, niente lo è'); return; } l.push(v); } else l.splice(i, 1);
  p[k] = (k === 'attrezziPalestra' && l.length === ATTREZZI_PALESTRA.length) ? null : l;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
window.setManubriKgCoach = function(v) {
  const n = Number(String(v).replace(',', '.'));
  const p = getProfile() || {};
  if (String(v).trim() === '' || !isFinite(n) || n <= 0) delete p.manubriKg; else p.manubriKg = n;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
window.togliPreferenza = function(n) {
  const p = getProfile() || {};
  p.graditi = (p.graditi || []).filter(x => x !== n); p.odiati = (p.odiati || []).filter(x => x !== n);
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
