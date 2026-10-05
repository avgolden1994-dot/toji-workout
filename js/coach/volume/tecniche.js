/* Tecniche di intensita: drop set, superserie, AMRAP, back-off, potenza e cluster (MAV-02, MAV-03, ETA-02, ABB-06)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   TECNICHE (piano coach v2, B.3 stadio 13; W1-T4)
   assegnaTecniche(brief, sedute) mette le tecniche di intensita nelle sedute: con poco tempo superserie e drop set; per gli over 65 la «potenza»
   sul primo esercizio guidato; il cluster a chi e prudente; AMRAP o back-off sul primo fondamentale e i parziali sull ultimo isolamento di chi puo.
   Chi puo andare vicino al cedimento lo dice la Sentinella (vincoli.gruppiTecniche, tecnicheAlCedimentoAmmesse). Sono le regole di prima, spostate qui da
   buildProgram senza cambiarne l esito, e girano come prima PRIMA del metodo e del tocco (applicaMetodo, in genera.js): il piano B.3 le mette dopo,
   cosi che la matrice delle tecniche (MAV-01, W2-T3) filtri anche quelle dei metodi; oggi il metodo le riscrive e il filtro lo fa il metodo stesso.
   ============================================================ */

/* MAV-02 e MAV-03 (ponte di W0-T2, B3; la matrice completa MAV-01 e di W2-T3, docs/ricerca-metodi-avanzati-intensita.md 3.2-3.3):
   tecniche che portano vicino al cedimento (G2 e G2b). Mai a principianti, minorenni, over 65 e modalita prudente (Convenzione, prudenza). */
const TECNICHE_AL_CEDIMENTO = ['drop', 'parziali', 'amrap', 'backoff', 'calibrazione', 'riposopausa'];
/* MAV-02: niente cedimento sul core, sugli esercizi a tempo, a peso zero (togliere il 20% non ha senso) e sugli stacchi (rapporto stimolo/fatica: ABB-09) */
function senzaCedimento(nome) {
  const m = findExercise(nome) || {};
  return m.group === 'core' || isTimeBased(nome) || !(m.weight > 0) || /stacco/i.test(senzaEmoji(nome));
}
/* MAV-02 (revisione dell onda 0): niente cedimento neppure sul front squat e sulle spinte sopra la testa (Military, Lento avanti, Arnold, Shoulder press), ne sugli esercizi che caricano di piu
   la zona del fastidio dichiarato (STRESS_ZONA: l AMRAP sul Military con la schiena dolente, sul panca bilanciere con la spalla) */
const ZONA_DEL_FASTIDIO = { spalle: 'spalla', schiena: 'schiena', ginocchia: 'ginocchio' };
function senzaCedimentoPer(nome, fastidi) {
  if (senzaCedimento(nome)) return true;
  const n = senzaEmoji(nome);
  if (/front squat|military|lento avanti|arnold|shoulder press/i.test(n)) return true;
  return (fastidi || []).some(f => (STRESS_ZONA[ZONA_DEL_FASTIDIO[f]] || []).indexOf(n) !== -1);
}

/* poco tempo (30-45 minuti) = superserie e drop set; over 65 = potenza ed equilibrio; avanzati = serie AMRAP e back-off sui fondamentali.
   Scrive in brief.lavoro se ha assegnato un drop set o la potenza: le note del programma dicono quello che il programma fa davvero (B3). */
function assegnaTecniche(brief, sedute) {
  const chi = brief.chi, level = chi.livello, over65 = chi.over65, minore = chi.minorenne, parqSi = chi.parq, ps = brief.mente.ps, metodoAttivo = brief.metodo.attivo;
  const tecnicheOk = tecnicheAlCedimentoAmmesse(brief), prefs = brief.lavoro.prefs, minuti = brief.agenda.minuti, poco = minuti <= 45;
  let dropAssegnato = false, potenzaAssegnata = false;
  sedute.forEach(sd => {
    const es = sd.esercizi;
    if (poco && !metodoAttivo) {   /* con un metodo famoso decide il metodo (coppie, tecniche) */
      strSuperserie(sd);   /* ABB-06: solo antagonisti, mai con un fondamentale pesante */
      /* MAV-02 e MAV-03: il drop set per fare prima solo a chi puo andare vicino al cedimento e mai sul core, a tempo, a peso zero, sugli stacchi */
      if (tecnicheOk) {
        const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !senzaCedimentoPer(e.name, prefs.fastidi));
        const leggeri = iso.length ? iso : es.filter(e => tipoCarico(e.name) === 'macchina' && !e.tecnica && !senzaCedimentoPer(e.name, prefs.fastidi));
        /* W0-T7 (collaudo DUR-01): il drop set costa tempo (secDrop) e arriva dopo il taglio per il tempo: solo se la seduta ci sta ancora */
        if (leggeri.length && ps.intensita !== 'bassa' && durataSeduta(es) + PARAM_TEMPO.secDrop / 60 <= minuti * (1 + PARAM_TEMPO.tolleranzaSforamento)) { leggeri[leggeri.length - 1].tecnica = 'drop'; dropAssegnato = true; }
      }
    }
    const primo = es.find(e => (findExercise(e.name) || {}).type === 'compound');
    /* over 65: «potenza» solo sul primo multiarticolare su macchina (la libreria non ha l alzata dalla sedia): niente carico libero sotto velocita */
    const primoGuidato = over65 ? es.find(e => (findExercise(e.name) || {}).type === 'compound' && attrezzoDi(senzaEmoji(e.name)) === 'macchine') : null;
    if (primoGuidato) { primoGuidato.tecnica = 'potenza'; potenzaAssegnata = true; }
    else if (!minore && (parqSi || over65)) es.forEach(e => { if (tipoCarico(e.name) === 'pesante') e.tecnica = 'cluster'; });   /* il cluster non e per i minorenni (matrice MAV 3.3, G1c) */
    else if (tecnicheOk && primo && tipoCarico(primo.name) === 'pesante' && ps.intensita !== 'bassa' && !senzaCedimentoPer(primo.name, prefs.fastidi)) primo.tecnica = level === 'avanzato' ? 'backoff' : 'amrap';
    if ((level === 'avanzato' || (level === 'intermedio' && ps.intensita === 'alta')) && !poco && ps.intensita !== 'bassa' && tecnicheOk) { const iso = es.filter(e => tipoCarico(e.name) === 'isolamento' && !senzaCedimentoPer(e.name, prefs.fastidi) && !e.tecnica); if (iso.length) iso[iso.length - 1].tecnica = 'parziali'; }
  });
  brief.lavoro.dropAssegnato = dropAssegnato;
  brief.lavoro.potenzaAssegnata = potenzaAssegnata;
  return sedute;
}
