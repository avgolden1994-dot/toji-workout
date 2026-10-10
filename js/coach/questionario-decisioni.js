/* Questionario di fine allenamento e decisioni
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   QUESTIONARIO DI FINE ALLENAMENTO E DECISIONI DEL COACH
   A fine seduta l allievo dice in quattro tocchi com e andata: fatica
   della seduta (RPE di sessione, Foster), come era arrivato, come ha
   sentito i carichi e se qualcosa ha fatto male. Il coach decide con
   regole prese dalla letteratura:
   - DOLORE (modello di monitoraggio del dolore, Silbernagel 2007):
     fino a 3/10 si continua e si osserva; 4-5/10 si abbassa il carico
     del 10% sugli esercizi coinvolti; se torna nella stessa zona, o se
     e 6/10 o piu, l esercizio si SOSTITUISCE con una variante dello STESSO
     muscolo che non e tra quelle che caricano di piu quell articolazione
     (STRESS_ZONA); se non ce n e, resta lo stesso esercizio a -20% con
     ampiezza senza dolore e discesa in 3 s: mai un esercizio per un altro
     muscolo (B14).
   - FATICA (autoregolazione e scarico reattivo, Bell 2022): due sedute
     su tre "pesanti" = scarico nella seduta successiva (serie -40%,
     carico -10%). Pesante = "Al limite" (RPE 10) oppure arrivato stanco
     con "Dura" (RPE 8-9): una "Dura" da sola e la seduta che il blocco
     prevede (MES-08, B9). Se continua per tre sedute su quattro il coach
     propone di togliere un giorno a settimana.
   - SENSAZIONE DEI CARICHI: leggeri e seduta facile = aumento extra la
     prossima volta; pesanti e seduta al limite = niente aumenti.
   Ogni decisione ha il suo motivo scritto ed e annullabile.
   ============================================================ */
const AGG_KEY = () => 'coach_plus_aggiusti_' + currentMode;
window.aggiustiCoach = function() {
  try { const a = JSON.parse(localStorage.getItem(AGG_KEY()) || 'null'); if (a) return a; } catch (e) {}
  return { esercizi: {}, scarico: null };
};
function salvaAggiusti(a) { try { localStorage.setItem(AGG_KEY(), JSON.stringify(a)); } catch (e) {} }

const ZONE_DOLORE = [
  ['spalla', 'Spalla'], ['gomito', 'Gomito'], ['polso', 'Polso'], ['schiena', 'Schiena bassa'],
  ['anca', 'Anca'], ['ginocchio', 'Ginocchio'], ['caviglia', 'Caviglia']
];
/* preposizione articolata e articolo per ogni zona: "al gomito", "l’anca" */
const ZONA_ART = { spalla: ['alla ', 'la '], gomito: ['al ', 'il '], polso: ['al ', 'il '], schiena: ['alla ', 'la '], anca: ['all’', 'l’'], ginocchio: ['al ', 'il '], caviglia: ['alla ', 'la '] };
function zonaA(z, nome) { return (ZONA_ART[z] || ['a ', ''])[0] + nome; }
function zonaIl(z, nome) { return (ZONA_ART[z] || ['', ''])[1] + nome; }
/* quali esercizi caricano di piu ogni articolazione (conoscenza del coach, Convenzione: matrice di docs/ricerca-recupero-infortuni-popolazioni.md 3;
   gomito e polso con dip e piegamenti a diamante o declinati: il peso del corpo sui polsi estesi e sui gomiti) */
const STRESS_ZONA = {
  spalla: ['Panca Piana Bilanciere', 'Panca Inclinata Bilanciere', 'Panca Declinata', 'Dip alle Parallele', 'Military Press', 'Lento Avanti Manubri', 'Arnold Press', 'Tirate al Mento (Upright Row)', 'Croci su Panca Manubri', 'Trazioni alla Sbarra (Pull-ups)', 'Dip su Panca', 'Pullover con Manubrio', 'Alzate Frontali', 'Piegamenti Declinati (Piedi Rialzati)', 'Panca con Pausa', 'Trazioni Negative'],
  gomito: ['French Press', 'Curl Bilanciere Bicipiti', 'Panca Presa Stretta', 'Dip su Panca', 'Trazioni Presa Inversa (Chin-up)', 'Curl su Panca Scott', 'Dip alle Parallele', 'Piegamenti a Diamante'],
  polso: ['Curl Bilanciere Bicipiti', 'Front Squat', 'Panca Piana Bilanciere', 'Panca Presa Stretta', 'Piegamenti a Terra (Push-up)', 'Dip su Panca', 'Dip alle Parallele', 'Piegamenti a Diamante', 'Piegamenti Declinati (Piedi Rialzati)', 'Panca con Pausa'],
  schiena: ['Stacco da Terra (Deadlift)', 'Rematore con Bilanciere', 'Good Morning', 'Squat con Bilanciere', 'T-Bar Row', 'Stacco Rumeno', 'Military Press', 'Stacco Sumo', 'Hyperextension (Lombari)', 'Stacco in Deficit', 'Squat con Pausa', 'Stacco Rumeno con Manubri', 'Stacco Rumeno a una Gamba', 'Kettlebell Swing'],
  anca: ['Squat con Bilanciere', 'Affondi Bulgari', 'Stacco Sumo', 'Affondi in Camminata', 'Hip Thrust', 'Leg Press', 'Squat Sumo', 'Squat con Pausa', 'Cossack Squat', 'Belt Squat', 'Squat su Scatola', 'Copenhagen Plank', 'Hip Thrust con Manubrio'],
  ginocchio: ['Squat con Bilanciere', 'Front Squat', 'Hack Squat', 'Affondi Manubri', 'Affondi in Camminata', 'Affondi Bulgari', 'Step-up su Panca', 'Leg Extension', 'Leg Press', 'Goblet Squat', 'Squat Sumo', 'Squat con Pausa', 'Cossack Squat', 'Belt Squat', 'Squat su Scatola', 'Step-up Basso', 'Sit-to-Stand dalla Panca'],
  caviglia: ['Calf Raise in Piedi', 'Affondi in Camminata', 'Step-up su Panca', 'Mountain Climber', 'Squat con Bilanciere', 'Calf Raise con Manubrio sul Gradino', 'Step-up Basso', 'Squat con Pausa', 'Belt Squat']
};
/* dentro buildProgram lo stesso nome si pulisce una volta sola (memoria-chiamata.js, spazio condiviso con _nomePulito di dettagli-esercizi.js) */
const senzaEmoji = (n) => {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('senzaEmoji') : null;
  if (t !== null) { const v = t.get(n); if (v !== undefined) return v; }
  const r = String(n).replace(EMOJI_TESTA, '');
  if (t !== null) t.set(n, r);
  return r;
};
function nomeInLibreria(pulito) {
  const t = typeof memoriaTabella === 'function' ? memoriaTabella('nomeInLibreria') : null;
  if (t !== null) { const v = t.get(pulito); if (v !== undefined) return v; }
  const m = EXERCISE_LIBRARY.find(e => senzaEmoji(e.name) === pulito), r = m ? m.name : null;
  if (t !== null) t.set(pulito, r);
  return r;
}
/* DEC-03 (B14): la variante per il dolore allena lo STESSO muscolo (alternativeStessoMuscolo: bersaglio o famiglia del
   multiarticolare totale), attrezzi e fastidi consentiti, e non e tra gli esercizi che caricano di piu quella zona (STRESS_ZONA:
   penalita, e di fatto esclusione). La vecchia tabella SOSTITUZIONI cambiava muscolo (squat -> hip thrust, stacco -> hip thrust,
   dip -> pushdown). Se non ce n e nessuna ritorna null: chi chiama tiene lo stesso esercizio a -20% (mai un altro muscolo).
   La zona dichiarata nel questionario vale come fastidio per consentito() (spalla -> spalle, ginocchio -> ginocchia, schiena). */
const REGIONE_RISCHIO_DOLORE = { spalla: 'spalle', ginocchio: 'ginocchia', schiena: 'schiena' };
function varianteStessoMuscolo(nome, zona, prefs, giaPresenti) {
  const stress = STRESS_ZONA[zona] || [];
  const p = Object.assign({}, prefs || {}), regione = REGIONE_RISCHIO_DOLORE[zona];
  p.fastidi = (p.fastidi || []).slice();
  if (regione && p.fastidi.indexOf(regione) === -1) p.fastidi.push(regione);
  /* tra gli adatti prima la traiettoria guidata (macchina, cavo), poi i manubri (presa neutra, braccia indipendenti), il bilanciere in coda:
     e il criterio della vecchia tabella (meno leva, presa neutra, traiettoria guidata) */
  const punti = (e) => {
    if (stress.indexOf(senzaEmoji(e.name)) !== -1) return -100;
    const att = attrezzoDi(senzaEmoji(e.name));
    return att === 'macchine' ? 4 : (att === 'manubri' ? 2 : (att === 'bilanciere' ? -2 : 0));
  };
  /* un esercizio che non e della famiglia dei multiarticolari totali non si sostituisce con uno di quella famiglia (squat -> stacco con trap bar) */
  const famiglia = famigliaTotaleDi(nome);
  const scelta = alternativeStessoMuscolo(nome, p, giaPresenti || [], { max: 6, bonus: punti })
    .find(a => stress.indexOf(senzaEmoji(a.ex.name)) === -1 && famigliaTotaleDi(a.ex.name) === famiglia);
  return scelta ? scelta.ex.name : null;
}
/* i nomi dei giorni del piano in cui compare l esercizio: la variante non deve finire due volte nello stesso giorno */
function eserciziDeiGiorniCon(nome) {
  try { const data = loadData(); return [].concat.apply([], DAYS.filter(g => (data[g] || []).some(e => e.name === nome)).map(g => data[g].map(e => e.name))); } catch (e) { return []; }
}
/* MES-08 (B9, Convenzione): le risposte della fatica di seduta sono 3 / 6 / 8 / 10 (Facile, Giusta, Dura, Al limite). Una seduta e
   "pesante" se e Al limite, o se e Dura e si arrivava stanchi. Le vecchie risposte 9 (Dura) contano come 8. */
const PARAM_FATICA_SEDUTA = { srpeFacile: 3, srpeGiusta: 6, srpeDura: 8, srpeAlLimite: 10, srpeFacileMax: 5 };
/* DEC-03/04 (P4-F): il rinvio quando il dolore e forte o persiste. Dice a chi rivolgersi e che il coach non e un medico: nessuna diagnosi, nessuna promessa di guarigione, nessun «e sicuro» (la parte dopo
   i due punti e uguale per ogni zona: le frasi nei tre dizionari sono una per zona) */
const FRASE_RINVIO_MEDICO = 'fatti vedere da un medico o da un fisioterapista. Non sono un medico e non faccio diagnosi.';
/* la nota che accompagna lo stesso esercizio a -20% quando non c e una variante dello stesso muscolo (frase nei tre dizionari) */
const NOTA_AMPIEZZA_SENZA_DOLORE = 'ampiezza senza dolore, discesa in 3 s';
function sedutaPesante(x) { return x.srpe >= PARAM_FATICA_SEDUTA.srpeAlLimite || (x.arrivo === 'stanco' && x.srpe >= PARAM_FATICA_SEDUTA.srpeDura); }

let fbState = null;
window.apriQuestionario = function(entry) {
  fbState = { id: entry.id, day: entry.day, esercizi: (entry.sessione || []).map(e => e.name),
    srpe: null, arrivo: null, carichi: null, dolore: null, zone: [], livello: 3, coinvolti: [] };
  const b = document.getElementById('fb-send');
  b.onclick = () => inviaQuestionario();
  const salta = document.querySelector('#fb-sheet .sheet-footer .og-link');
  if (salta) salta.style.display = '';
  renderQuestionario();
  document.getElementById('fb-sheet').classList.remove('hidden');
};
window.fbSet = function(k, v) {
  fbState[k] = v;
  if (k === 'dolore' && !v) { fbState.zone = []; fbState.coinvolti = []; }
  renderQuestionario();
};
window.fbZona = function(z) {
  const i = fbState.zone.indexOf(z);
  if (i === -1) {
    fbState.zone.push(z);
    /* preseleziona gli esercizi di oggi che caricano quella zona */
    fbState.esercizi.forEach(n => { if ((STRESS_ZONA[z] || []).indexOf(senzaEmoji(n)) !== -1 && fbState.coinvolti.indexOf(n) === -1) fbState.coinvolti.push(n); });
  } else fbState.zone.splice(i, 1);
  renderQuestionario();
};
window.fbEsercizio = function(i) {
  const n = fbState.esercizi[i];
  const j = fbState.coinvolti.indexOf(n);
  if (j === -1) fbState.coinvolti.push(n); else fbState.coinvolti.splice(j, 1);
  renderQuestionario();
};
window.fbLivello = function(v) { fbState.livello = Number(v); const l = document.getElementById('fb-liv'); if (l) l.innerText = fbState.livello + '/10 • ' + etichettaDolore(fbState.livello); };
function etichettaDolore(v) { return v <= 3 ? 'lieve' : (v <= 5 ? 'moderato' : 'forte'); }

function fbScelta(k, opzioni) {
  return '<div class="fb-opts">' + opzioni.map(([v, l, d]) =>
    '<button class="fb-opt' + (fbState[k] === v ? ' on' : '') + '" onclick="fbSet(\'' + k + '\', ' + (typeof v === 'string' ? '\'' + v + '\'' : v) + ')">' +
    '<b>' + l + '</b>' + (d ? '<small>' + d + '</small>' : '') + '</button>').join('') + '</div>';
}
function renderQuestionario() {
  const f = fbState;
  let h = '<div class="fb-intro">Quattro tocchi: il coach usa le tue risposte per decidere carichi, varianti e recupero.</div>' +
    '<div class="fb-q">1. Quanto è stata dura la seduta?</div>' +
    fbScelta('srpe', [[PARAM_FATICA_SEDUTA.srpeFacile, 'Facile', 'RPE 1–4'], [PARAM_FATICA_SEDUTA.srpeGiusta, 'Giusta', 'RPE 5–7'], [PARAM_FATICA_SEDUTA.srpeDura, 'Dura', 'RPE 8–9'], [PARAM_FATICA_SEDUTA.srpeAlLimite, 'Al limite', 'RPE 10']]) +
    '<div class="fb-q">2. Come ci sei arrivato?</div>' +
    fbScelta('arrivo', [['riposato', 'Riposato'], ['normale', 'Normale'], ['stanco', 'Stanco']]) +
    '<div class="fb-q">3. Come hai sentito i carichi?</div>' +
    fbScelta('carichi', [['leggeri', 'Leggeri'], ['giusti', 'Giusti'], ['pesanti', 'Pesanti']]) +
    '<div class="fb-q">4. Qualcosa ti ha fatto male?</div>' +
    fbScelta('dolore', [[false, 'No'], [true, 'Sì']]);
  if (f.dolore) {
    h += '<div class="fb-sub">Dove?</div><div class="fb-chips">' + ZONE_DOLORE.map(([z, l]) =>
      '<button class="fb-chip' + (f.zone.indexOf(z) !== -1 ? ' on' : '') + '" onclick="fbZona(\'' + z + '\')">' + l + '</button>').join('') + '</div>' +
      '<div class="fb-sub">Quanto, da 0 a 10? <b id="fb-liv">' + f.livello + '/10 • ' + etichettaDolore(f.livello) + '</b></div>' +
      '<input type="range" class="fb-range" min="1" max="10" step="1" value="' + f.livello + '" oninput="fbLivello(this.value)" aria-label="Intensità del dolore">' +
      '<div class="fb-scale"><span>fastidio</span><span>moderato</span><span>forte</span></div>' +
      (f.esercizi.length ? '<div class="fb-sub">Durante quali esercizi?</div><div class="fb-chips">' + f.esercizi.map((n, i) =>
        '<button class="fb-chip' + (f.coinvolti.indexOf(n) !== -1 ? ' on' : '') + '" onclick="fbEsercizio(' + i + ')">' + escapeHtml(senzaEmoji(n)) + '</button>').join('') + '</div>' : '');
  }
  document.getElementById('fb-body').innerHTML = h;
  const ok = f.srpe !== null && f.arrivo !== null && f.carichi !== null && f.dolore !== null && (!f.dolore || f.zone.length);
  const b = document.getElementById('fb-send');
  b.disabled = !ok;
  b.innerText = ok ? 'Invia al coach' : 'Rispondi alle domande';
}
window.chiudiQuestionario = function() {
  document.getElementById('fb-sheet').classList.add('hidden');
  fbState = null;
};

/* Il cuore: dalle risposte alle decisioni. Funzione pura sui dati salvati,
   cosi e verificabile dai test. */
window.decisioniCoach = function(fb, storicoFeedback, prefs) {
  const out = [];
  const prec = (storicoFeedback || []).filter(Boolean);   /* dal piu recente */
  const ultimi3 = [fb].concat(prec.slice(0, 2));
  const ultimi4 = [fb].concat(prec.slice(0, 3));
  /* attrezzi, luogo e fastidi per scegliere la variante (prefs facoltativo: di norma quelli del profilo) */
  const prefsRif = prefs || (typeof prefsCoach === 'function' ? prefsCoach() : {});

  /* dolore */
  if (fb.dolore && fb.zone.length) {
    fb.zone.forEach(z => {
      const tornato = prec.slice(0, 2).some(p => p.dolore && (p.zone || []).indexOf(z) !== -1 && (p.livello || 0) >= 4);
      /* dolore che cresce di seduta in seduta nella stessa zona (Silbernagel) */
      const storiaZona = prec.filter(p => p.dolore && (p.zone || []).indexOf(z) !== -1).slice(0, 2).map(p => p.livello || 0);
      const cresce = storiaZona.length >= 2 && fb.livello > storiaZona[0] && storiaZona[0] > storiaZona[1];
      if (cresce) out.push({ tipo: 'medico', testo: 'Il dolore ' + zonaA(z, (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1].toLowerCase()) + ' cresce di seduta in seduta: ' + FRASE_RINVIO_MEDICO });
      const coinvolti = (fb.coinvolti.length ? fb.coinvolti : fb.esercizi)
        .filter(n => (STRESS_ZONA[z] || []).indexOf(senzaEmoji(n)) !== -1 || fb.coinvolti.indexOf(n) !== -1);
      const zNome = (ZONE_DOLORE.find(x => x[0] === z) || [z, z])[1].toLowerCase();
      if (fb.livello <= 3) {
        out.push({ tipo: 'osserva', testo: 'Fastidio lieve ' + zonaA(z, zNome) + ' (' + fb.livello + '/10): si continua. Se domattina è peggio del solito, segnalalo la prossima volta.' });
        return;
      }
      coinvolti.forEach(n => {
        const forte = fb.livello >= 6 || tornato;
        /* DEC-03 (B14): variante dello stesso muscolo; se non c e, stesso esercizio a -20% con ampiezza senza dolore e discesa lenta */
        const variante = forte ? varianteStessoMuscolo(n, z, prefsRif, (fb.esercizi || []).concat(eserciziDeiGiorniCon(n))) : null;
        if (variante) {
          out.push({ tipo: 'sostituisci', esercizio: n, variante: variante, zona: z,
            testo: senzaEmoji(n) + ' → ' + senzaEmoji(variante) + ': ' + (fb.livello >= 6 ? 'dolore forte' : 'il dolore ' + zonaA(z, zNome) + ' è tornato') + ', la variante carica meno ' + zonaIl(z, zNome) + '.' });
        } else {
          const fattore = forte ? 0.8 : 0.9, nota = forte ? NOTA_AMPIEZZA_SENZA_DOLORE : '';
          out.push({ tipo: 'carico', esercizio: n, fattore: fattore, sedute: 2, zona: z, zNome: zNome, livello: fb.livello, alteRip: z === 'gomito' || z === 'ginocchio', nota: nota,
            testo: senzaEmoji(n) + ': carico ' + (forte ? '-20%' : '-10%') + ' per due sedute, per il dolore ' + zonaA(z, zNome) + '.' + (nota ? ' • ' + nota : '') });
        }
      });
      if (fb.livello >= 6) out.push({ tipo: 'medico', testo: 'Dolore forte: se non passa o peggiora, ' + FRASE_RINVIO_MEDICO });
    });
  }

  /* fatica e recupero */
  const pesanti3 = ultimi3.filter(sedutaPesante).length;
  const pesanti4 = ultimi4.filter(sedutaPesante).length;
  if (pesanti4 >= 3 && prec.length >= 3) {
    out.push({ tipo: 'frequenza', testo: 'Tre sedute su quattro al limite o arrivando stanco: il recupero non basta. Il coach propone di togliere un allenamento a settimana.' });
  }
  /* MES-07 (P3-B, programmi v2): le sedute al limite sono UN segnale (S7), non bastano da sole: serve un secondo segnale e le protezioni di distanza (valutaScaricoReattivo);
     la dose e quella unica di DOSE_SCARICO. Programmi della v1 e regola spenta: la decisione di sempre */
  let scarico = pesanti3 >= 2;
  const mes07 = scarico && typeof valutaScaricoReattivo === 'function' ? valutaScaricoReattivo('S7') : { ok: true };
  if (scarico && !mes07.ok) { scarico = false; out.push({ tipo: 'osserva', testo: mes07.perche }); }
  if (scarico) {
    const dose = typeof programmaConPiano === 'function' && programmaConPiano() && regolaAttiva('MES-05') ? DOSE_SCARICO[livelloFatica()] : null;
    out.push({ tipo: 'scarico', testo: dose
      ? 'Fatica accumulata: le prossime ' + sogliaScarico('reattivoSedute') + ' sedute sono di scarico (serie -' + Math.round((1 - dose.serie) * 100) + '%, carico -' + Math.round((1 - dose.carico) * 100) + '%) per ricaricare le energie.' + (mes07.segnali && mes07.segnali.length ? ' \u2022 segnali: ' + testoSegnali(mes07.segnali) : '')
      : 'Fatica accumulata: la prossima seduta è di scarico (serie -' + Math.round((1 - COACH_PARAMETRI.scaricoReattivoSerie) * 100) + '%, carico -' + Math.round((1 - COACH_PARAMETRI.scaricoReattivoCarico) * 100) + '%) per ricaricare le energie.' });
  } else if (fb.carichi === 'pesanti' && fb.srpe >= PARAM_FATICA_SEDUTA.srpeDura) {   /* anche le vecchie risposte 9 */
    out.push({ tipo: 'blocca', testo: 'Carichi pesanti e seduta al limite: la prossima volta nessun aumento, consolida prima.' });
  } else if (fb.carichi === 'leggeri' && fb.srpe <= PARAM_FATICA_SEDUTA.srpeFacileMax && !fb.dolore) {
    out.push({ tipo: 'extra', testo: 'Carichi leggeri e seduta facile: la prossima volta un aumento in più dove hai completato tutte le serie.' });
  }
  if (!out.length) out.push({ tipo: 'ok', testo: 'Seduta nella norma: il programma prosegue come previsto.' });
  return out;
};

/* applica le decisioni ai dati; restituisce la funzione per annullare */
function applicaDecisioni(dec, fb) {
  const primaDati = localStorage.getItem(dataKey());
  const primaAgg = localStorage.getItem(AGG_KEY());
  const primaRest = localStorage.getItem(restKey());
  const ag = aggiustiCoach();
  const data = loadData();
  dec.forEach(d => {
    if (d.tipo === 'carico') {
      ag.esercizi[d.esercizio] = { fattore: d.fattore, sedute: d.sedute, alteRip: !!d.alteRip,
        motivo: 'Dolore segnalato: carico ridotto (' + Math.round((1 - d.fattore) * 100) + '%)' + (d.nota ? ' • ' + d.nota : '') };
      /* dolore moderato (4-5/10): domattina il coach chiede se e tornato normale (Silbernagel); vale anche se il dolore e tornato e il carico scende del 20% */
      if (d.livello >= 4 && d.livello <= 5 && d.zona) {
        const c = ag.controlloDolore && ag.controlloDolore.dal === ymd(new Date()) ? ag.controlloDolore : { dal: ymd(new Date()), zone: {}, esercizi: [] };
        c.zone[d.zona] = d.zNome;
        if (c.esercizi.indexOf(d.esercizio) === -1) c.esercizi.push(d.esercizio);
        ag.controlloDolore = c;
      }
    }
    if (d.tipo === 'blocca' || d.tipo === 'extra') fb.esercizi.forEach(n => { if (!ag.esercizi[n]) ag.esercizi[n] = { [d.tipo]: true, sedute: 1 }; });
    if (d.tipo === 'scarico') ag.scarico = voceScaricoReattivo('fatica accumulata nelle ultime sedute', 1);   /* programmi v2: la durata e la dose uniche di MES-05 e MES-07 */
    if (d.tipo === 'sostituisci') {
      const lib = findExercise(d.variante);
      DAYS.forEach(g => (data[g] || []).forEach(e => {
        if (e.name !== d.esercizio) return;
        e.name = d.variante;
        if (lib) {
          const pp = pesoPartenza(d.variante);
          /* da un esercizio a ripetizioni a uno a tempo (squat -> wall sit) o viceversa: il bersaglio vecchio non vale (8 ripetizioni = 8 secondi) */
          const cambiaMisura = isTimeBased(d.variante) !== isTimeBased(d.esercizio);
          if (cambiaMisura) e.reps = lib.reps;
          e.weight = pp.peso; e.stimato = pp.stimato ? pp.fonte : undefined;
          e.completedSets = e.completedSets.map(sx => Object.assign({}, sx, { weight: pp.peso, done: false }, cambiaMisura ? { reps: lib.reps } : {}));
        }
        e.coachNote = 'Variante scelta dal coach: ' + senzaEmoji(d.esercizio) + ' dava dolore';
        e.coachTipo = 'scarico';
      }));
      ag.esercizi[d.variante] = { nota: 'Variante scelta dal coach al posto di ' + senzaEmoji(d.esercizio), sedute: 1 };
    }
  });
  saveData(data);
  salvaAggiusti(ag);
  return () => {
    if (primaDati !== null) localStorage.setItem(dataKey(), primaDati);
    if (primaAgg !== null) localStorage.setItem(AGG_KEY(), primaAgg); else localStorage.removeItem(AGG_KEY());
    if (primaRest !== null) localStorage.setItem(restKey(), primaRest); else localStorage.removeItem(restKey());
    renderPiano(); renderAllenamento();
  };
}

/* toglie il giorno di allenamento piu leggero: diventa riposo (annullabile) */
window.riduciFrequenza = function() {
  const data = loadData();
  const giorni = DAYS.filter(d => !isRestDay(d) && (data[d] || []).length);
  if (giorni.length <= 2) { showUndo('Ti alleni già due volte a settimana: meglio ridurre le serie che i giorni'); return; }
  const piuLeggero = giorni.slice().sort((a, b) => (data[a] || []).reduce((t, e) => t + e.sets, 0) - (data[b] || []).reduce((t, e) => t + e.sets, 0))[0];
  const r = loadRestDays(); r.push(piuLeggero); saveRestDays(r);
  renderPiano();
  const btn = document.getElementById('fb-freq-btn'); if (btn) { btn.disabled = true; btn.innerText = getDayTitle(piuLeggero) + ' ora è riposo'; }
  showUndo(trP('%s diventa giorno di riposo', tr(getDayTitle(piuLeggero))), () => { const r2 = loadRestDays().filter(x => x !== piuLeggero); saveRestDays(r2); renderPiano(); });
};

window.inviaQuestionario = function() {
  const f = fbState;
  if (!f) return;
  const fb = { srpe: f.srpe, arrivo: f.arrivo, carichi: f.carichi, dolore: !!f.dolore, zone: f.zone.slice(), livello: f.dolore ? f.livello : 0,
    coinvolti: f.coinvolti.slice(), esercizi: f.esercizi.slice() };
  const hist = loadHistory();
  const i = hist.findIndex(h => h.id === f.id);
  const precedenti = hist.filter(h => h.id !== f.id && h.feedback).map(h => h.feedback);
  if (i !== -1) { hist[i].feedback = fb; saveHistory(hist); }
  const dec = decisioniCoach(fb, precedenti);
  const annulla = applicaDecisioni(dec, fb);
  const ico = { sostituisci: '⇄', carico: '↓', scarico: '↻', blocca: '‖', extra: '↑', frequenza: '−', medico: '!', osserva: '•', ok: '✓' };
  document.getElementById('fb-body').innerHTML =
    '<div class="fb-dec-title">Il coach ha deciso</div>' +
    dec.map(d => '<div class="fb-dec ' + d.tipo + '"><span class="fb-dec-ico">' + ico[d.tipo] + '</span><span>' + escapeHtml(d.testo) + '</span></div>').join('') +
    (dec.some(d => d.tipo === 'frequenza') ? '<button class="set-row-btn" id="fb-freq-btn" onclick="riduciFrequenza()">Togli un allenamento a settimana</button>' : '') +
    '<button class="btn-archive" onclick="(' + 'window.__fbAnnulla && window.__fbAnnulla()' + ')">Annulla le decisioni</button>';
  window.__fbAnnulla = () => { annulla(); showUndo('Decisioni annullate: il programma resta com era'); chiudiQuestionario(); };
  const b = document.getElementById('fb-send');
  b.disabled = false; b.innerText = 'Fatto';
  b.onclick = () => chiudiQuestionario();
  const salta = document.querySelector('#fb-sheet .sheet-footer .og-link');
  if (salta) salta.style.display = 'none';
  renderPiano(); renderAllenamento();
};
