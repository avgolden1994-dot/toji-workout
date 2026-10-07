/* Specialista Forza: la struttura del powerlifting (FRZ-02..05, STD-02)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   LO SPECIALISTA FORZA (piano coach v2, W2-T7, versione snella)
   Per chi sceglie «forza» e «powerlifting» (la domanda «Che forza?» è di W2-T5; l'attivazione la legge modalitaForzaDa) il programma ha la struttura di un powerlifter:
   squat e panca almeno due volte a settimana, lo stacco una (più una variante), con la stessa alzata in un giorno pesante, uno medio e uno leggero (onda giornaliera).
   Si aggancia al generatore in due punti, senza toccarne il corpo (regia/genera.js):
     stadio 3  specialitaStruttura(brief) cerca in SPECIALITA_STRUTTURA la modalità del brief: qui si registra 'forza' (registraSpecialita) e si ritorna { split, sedute }
     dopo prescriviSerie  spec.sedute(brief, sedute): scrive le alzate nelle sedute, la prescrizione dell'onda, le varianti e gli accessori del punto debole, i titoli
   ORDINE DI CARICAMENTO: dopo regia/genera.js (registraSpecialita) e dopo soglie-forza.js. Se il file venisse caricato prima, la modalità non si registra e il programma
   di forza resta quello generale (nessun errore): tests/forza-struttura.test.js controlla che sia registrata.
   Cosa NON fa (obiettivi aperti, W3-T6): percentuali del massimale, tetti di RPE, AMRAP di appoggio, massimale di lavoro (FRZ-06..10). Il carico di ogni giorno lo dice la
   storia di OGNI esercizio: per questo i giorni medi e leggeri usano una VARIANTE (squat con pausa, panca con pausa o a presa stretta, stacco rumeno), che ha la sua
   storia di carichi, invece dello stesso esercizio con altre ripetizioni (la progressione di caricoProssimo è per nome: una 4x3 e una 3x5 sullo stesso nome si disturbano).
   Precedenze (REG-01): la Sentinella vince: nessuna alzata entra se consentito() o il fastidio la vietano, minorenni, 65+ e PAR-Q positivo non hanno la modalità, un periodo
   di vita con volume ridotto neppure, il tetto di serie per esercizio dei vincoli vale. Un metodo famoso scelto dal coach cede alla modalità (una struttura sola, dichiarata);
   uno scelto dall'utente (d.metodo) la fa cedere. «Ogni muscolo una volta a settimana» (freq 1) la fa cedere: e il contrario del powerlifting e la scelta dell'utente vince; le frequenze 2 e 3 le
   sostituisce la sua (e lo dice), perche la nota del volume («ogni muscolo N volte, come hai scelto») direbbe un numero che qui non vale.
   ============================================================ */

function sogliaForza(nome) { return SOGLIE_FORZA[nome].v; }

/* FRZ-01 (la domanda e di W2-T5; qui si legge il campo in modo difensivo): «forza generale» (o nessuna risposta) = come oggi; solo «powerlifting» attiva la modalità.
   Il campo si chiama forzaTipo; si accettano anche tipoForza e cheForza e d.modalita === 'forza' (se W2-T5 sceglie un altro nome basta aggiungerlo qui). Cerca nelle risposte (d)
   e nel profilo salvato (prof0), perche un nuovo ciclo ricostruisce il programma dal profilo. Ritorna 'forza' o null. */
const FORZA_CAMPI_TIPO = ['forzaTipo', 'tipoForza', 'cheForza'];
function modalitaForzaDa(d, prof0, goals) {
  if (!goals || goals[0] !== 'forza') return null;
  const fonti = [d || {}, prof0 || {}];
  for (let i = 0; i < fonti.length; i++) {
    if (String(fonti[i].modalita || '').toLowerCase() === 'forza') return 'forza';
    for (let k = 0; k < FORZA_CAMPI_TIPO.length; k++) {
      const v = fonti[i][FORZA_CAMPI_TIPO[k]];
      if (v !== undefined && v !== null && v !== '') return /power/i.test(String(v)) ? 'forza' : null;
    }
  }
  return null;
}

/* FRZ-03 e FRZ-04: i punti deboli dichiarati (d.puntiDeboli: un elenco o una voce). Le chiavi sono quelle di SPEC_FORZA.varianti.punti; una voce sconosciuta si ignora; al massimo
   uno per alzata e puntiDeboliMax in tutto (ognuno toglie tempo al resto della seduta). La domanda in onboarding non c'e ancora (obiettivo aperto): oggi arriva solo da d o dal profilo */
function forzaPuntiDeboli(d, prof0) {
  const grezzo = (d && d.puntiDeboli !== undefined) ? d.puntiDeboli : (prof0 && prof0.puntiDeboli);
  const lista = Array.isArray(grezzo) ? grezzo : (grezzo ? [grezzo] : []);
  const out = [], alzate = {};
  lista.forEach(x => {
    const k = String(x).toLowerCase().trim(), p = SPEC_FORZA.varianti.punti[k];
    if (!p || out.indexOf(k) !== -1 || alzate[p.alzata] || out.length >= sogliaForza('puntiDeboliMax')) return;
    alzate[p.alzata] = true; out.push(k);
  });
  return out;
}

/* FRZ-01 (INT-2e): le domande «Che forza?» e «Dove ti blocchi?» dell onboarding (js/ui/onboarding.js) e di Opzioni (js/ui/opzioni/il-coach.js): i testi stanno qui, una volta, accanto a cio che i valori
   vogliono dire per il generatore. Il tipo e il punto debole sono facoltativi: senza risposta il programma di forza e quello di sempre. */
const FORZA_TIPI_TESTI = [
  ['generale', 'Forza generale', 'i fondamentali con 2-6 ripetizioni e recuperi lunghi, come sempre'],
  ['powerlifting', 'Powerlifting', 'squat, panca e stacco più volte a settimana, con giorni pesanti, medi e leggeri']
];
const FORZA_NOTA_REQUISITI = 'Il powerlifting è per chi ha tra 18 e 64 anni e ha risposto no al questionario sulla salute; servono almeno 3 giorni a settimana, un bilanciere, un rack e una panca. Se qualcosa non va, il programma di forza resta quello generale e te lo dico.';
const FORZA_NOTA_PUNTI = 'Facoltativo, al massimo due, uno per alzata. Chi ha esperienza trova la variante che allena quel punto nei giorni medi e leggeri e, nel giorno pesante, se i minuti e gli attrezzi bastano (per la panca servono i cavi o i manubri), un esercizio in più per il muscolo che di solito cede. Chi comincia ha la stessa prescrizione in ogni seduta: il punto debole aggiunge al massimo un esercizio per punto (alle stesse condizioni) e, se l’alzata torna tre volte a settimana, mette la sua variante alla terza.';
const FORZA_PUNTI_TESTI = {
  'squat-buca': 'Squat in buca', 'squat-uscita': 'Squat a metà risalita',
  'panca-petto': 'Panca al petto', 'panca-meta': 'Panca a metà', 'panca-chiusura': 'Panca in chiusura',
  'stacco-terra': 'Stacco da terra', 'stacco-chiusura': 'Stacco in chiusura'
};
/* il tocco su un punto debole: lo toglie se c e, altrimenti lo mette al posto di un altro punto della stessa alzata, fino a puntiDeboliMax in tutto; ritorna il nuovo elenco (mai l elenco di prima modificato) */
function forzaCambiaPunto(lista, k) {
  const l = (Array.isArray(lista) ? lista : []).filter(x => SPEC_FORZA.varianti.punti[x]);
  if (l.indexOf(k) !== -1) return l.filter(x => x !== k);
  const p = SPEC_FORZA.varianti.punti[k];
  if (!p) return l;
  const senzaAlzata = l.filter(x => SPEC_FORZA.varianti.punti[x].alzata !== p.alzata);
  return senzaAlzata.length >= sogliaForza('puntiDeboliMax') ? l : senzaAlzata.concat([k]);
}
/* FRZ-01: cosa si salva nel profilo perche «Rifai il programma» e il ciclo dopo ritrovino la scelta (alternative.js): forzaTipo ('generale' | 'powerlifting') e puntiDeboli, solo se il primo obiettivo e la forza
   e la persona ha risposto (le risposte `d` vincono sul profilo, come in modalitaForzaDa); una risposta che non si riconosce non si salva. Chi non risponde ha un profilo identico a quello di prima. */
function forzaSalvata(d, prof0, goals) {
  const out = {};
  if (!goals || goals[0] !== 'forza') return out;
  const detto = [d || {}, prof0 || {}].some(f => FORZA_CAMPI_TIPO.some(k => f[k] !== undefined && f[k] !== null && f[k] !== ''));
  if (modalitaForzaDa(d, prof0, goals) === 'forza') {
    out.forzaTipo = 'powerlifting';
    const punti = forzaPuntiDeboli(d, prof0);
    if (punti.length) out.puntiDeboli = punti;
  } else if (detto) out.forzaTipo = 'generale';
  return out;
}

/* ---- le frasi: le note del programma (L.note) e i perche con codice (REG-03). Le note di «non si attiva» dicono la causa vera: il programma di forza resta quello generale ---- */
const FORZA_NOTA_STRUTTURA = 'Forza: squat e panca almeno due volte a settimana e lo stacco una volta, in giorni pesanti, medi e leggeri. Nei giorni medi e leggeri la stessa alzata cambia variante (con la pausa, a presa stretta).';
const FORZA_NOTA_ONDA = 'Forza: squat e panca almeno due volte a settimana e lo stacco una volta, in giorni pesanti, medi e leggeri: cambiano serie e ripetizioni.';
const FORZA_NOTA_PIATTA = 'Forza: squat e panca almeno due volte a settimana e lo stacco una volta, con la stessa prescrizione in ogni seduta.';
const FORZA_NOTA_PRINCIPIANTE = 'Forza: squat e panca almeno due volte a settimana e lo stacco rumeno una volta (lo stacco da terra, più tecnico, non è per chi comincia), con la stessa prescrizione in ogni seduta: chi comincia non ha giorni pesanti e leggeri.';
const FORZA_NOTA_PRINCIPIANTE_TERZA = 'Forza: squat e panca almeno due volte a settimana e lo stacco rumeno una volta (lo stacco da terra, più tecnico, non è per chi comincia), con la stessa prescrizione in ogni seduta, tranne la terza panca della settimana che ha due serie: chi comincia non ha giorni pesanti e leggeri.';
const FORZA_NOTA_MINUTI = 'Con i minuti che hai alcune alzate restano fuori da qualche seduta: la frequenza del powerlifting non è completa.';
const FORZA_NOTA_MASSIMALE = 'Non serve provare il massimale: il coach lo stima dalle serie che fai, con meno rischio.';
const FORZA_NOTA_PRUDENTE = 'Il powerlifting non è per chi ha meno di 18 anni o 65 o più, né per chi ha risposto sì al questionario sulla salute: il tuo programma di forza resta quello generale, con carichi e ripetizioni più prudenti.';
/* INT-2f: l età non detta non e un programma piu prudente (vale adulto, come per i programmi gia salvati): la nota dice solo che serve */
const FORZA_NOTA_ETA = 'Per il powerlifting devo sapere che hai tra 18 e 64 anni, e la tua età manca: indicala in Opzioni. Intanto il programma di forza resta quello generale.';
const FORZA_NOTA_GIORNI = 'Per il powerlifting servono almeno 3 giorni a settimana: con 2 il programma di forza resta quello generale.';
const FORZA_NOTA_FREQUENZA = 'Hai scelto di allenare ogni muscolo una volta a settimana: il powerlifting chiede squat e panca almeno due volte, e il programma di forza resta quello generale.';
const FORZA_NOTA_FREQUENZA_SOSTITUITA = 'Hai scelto una frequenza per i muscoli: il powerlifting ha la sua, squat e panca almeno due volte a settimana.';
const FORZA_NOTA_MOMENTO = 'In questo periodo il programma di forza resta quello generale, più leggero: niente giorni pesanti da powerlifting.';
const FORZA_NOTA_ATTREZZI = 'Per il powerlifting servono bilanciere, rack e panca: con l’attrezzatura che hai il programma di forza resta quello generale.';
const FORZA_NOTA_FASTIDIO = 'Con il fastidio che hai indicato una delle tre alzate del powerlifting non è adatta: il programma di forza resta quello generale.';
const FORZA_PERCHE_STRUTTURA = 'Squat e panca almeno due volte a settimana e lo stacco una: la frequenza di 2-3 sedute per alzata è la pratica dei programmi da powerlifting.';
const FORZA_PERCHE_ONDA = 'Stessa alzata in un giorno pesante, uno medio e uno leggero: cambia la fatica, non il movimento. Gli studi sull’onda non concordano: non è provata migliore.';
const FORZA_PERCHE_VARIANTE = 'Punto debole: una variante dell’alzata allena il tratto in cui ti fermi; l’alzata intera resta quella principale.';
const FORZA_PERCHE_ACCESSORIO = 'Punto debole: un accessorio in più per il muscolo che di solito cede in quell’alzata.';
const FORZA_ALZATE_BARRA = ['squat', 'panca', 'stacco'];
/* nome breve per i titoli delle sedute e genere (squat e stacco maschili, panca femminile) */
const FORZA_TITOLO = { squat: { nome: 'Squat', f: false }, panca: { nome: 'Panca', f: true }, stacco: { nome: 'Stacco', f: false } };
const FORZA_AGGETTIVO = { m: { pesante: 'pesante', media: 'medio', leggera: 'leggero' }, f: { pesante: 'pesante', media: 'media', leggera: 'leggera' } };

/* ============================================================
   SPEC_FORZA: la struttura (dati) e l'attivazione.
   split[giorni]: il nome e i tipi di seduta (quelli che il generatore conosce: componiSedute, giorniSettimana). Con 6 giorni i tipi si alternano: nessuna coppia uguale in due giorni di fila.
   sedute[giorni][i]: le alzate della seduta i, nell'ordine: [alzata, onda]; 'varStacco' e la variante dello stacco (stacco rumeno di solito), una seduta leggera sulla cerniera.
   Giorni: 3 = full body A/B/C (squat 2, panca 3, stacco 1 + variante); 4 = lower, upper, lower, upper (squat 2, panca 2 pesante e media, stacco 1 + variante); 5 e 6: la stessa
   alternanza con la panca tre volte. Chi comincia ha al massimo 4 sedute (splitFor, PRG-02): la tabella dei 4 giorni.
   varianti.standard: i nomi delle varianti per le esposizioni non pesanti (la prima ammessa, una diversa per ogni esposizione); varianti.punti: il punto debole che sposta in testa la variante
   che lo allena (FRZ-03). accessori: per punto debole, i candidati di un esercizio in piu nella seduta pesante di quell'alzata (FRZ-04).
   ============================================================ */
const SPEC_FORZA = {
  /* attiva(brief): { ok: true } oppure { ok: false, nota: testo per l'utente | null }. nota null = nessuna parola (la modalità non era stata chiesta davvero) */
  attiva: function (brief) {
    const L = brief.lavoro, prefs = L.prefs, chi = brief.chi;
    if (brief.obiettivi.modalita !== 'forza' || brief.obiettivi.primo !== 'forza') return { ok: false, nota: null };
    if (chi.cauto) return { ok: false, nota: FORZA_NOTA_PRUDENTE };
    if (!(chi.eta >= PARAM_ETA.maggiorenne)) return { ok: false, nota: FORZA_NOTA_ETA };   /* un'eta non detta (0) non e un adulto: carichi da powerlifting solo a chi dice di avere 18 anni o piu (INT-2f: la nota dice che serve l eta, non «piu prudenti») */
    const giorni = Number(brief.agenda.giorni) || 0, g = sogliaForza('giorni');
    if (giorni < g.min) return { ok: false, nota: FORZA_NOTA_GIORNI };
    if (brief.agenda.freqScelta === '1') return { ok: false, nota: FORZA_NOTA_FREQUENZA };   /* ogni muscolo una volta sola: il contrario del powerlifting, la scelta dell'utente vince */
    const mo = brief.mente && brief.mente.momento;
    if (mo && !mo.scaduto && (mo.vol < 1 || mo.rir)) return { ok: false, nota: FORZA_NOTA_MOMENTO };
    const d = brief.grezzo.d || {};
    if (d.metodo) return { ok: false, nota: null };   /* un metodo scelto dall'utente: ha la sua struttura e la sua nota */
    /* le tre alzate: senza fastidi dichiarati sarebbero tutte ammesse? se si, il motivo e il fastidio; se no, l'attrezzatura (bilanciere, luogo) */
    const senzaFastidi = Object.assign({}, prefs, { fastidi: [] });
    const ammesse = (p) => FORZA_ALZATE_BARRA.every(a => forzaNomeGara(brief, a, p) !== null);
    if (!ammesse(prefs)) return { ok: false, nota: ammesse(senzaFastidi) ? FORZA_NOTA_FASTIDIO : FORZA_NOTA_ATTREZZI };
    return { ok: true };
  },
  split: {
    3: { nome: 'Forza: Full Body 3x', tipi: ['fullbody', 'fullbody', 'fullbody'] },
    4: { nome: 'Forza: Lower / Upper x2', tipi: ['lower', 'upper', 'lower', 'upper'] },
    5: { nome: 'Forza: Upper / Lower x2 + Upper', tipi: ['upper', 'lower', 'upper', 'lower', 'upper'] },
    6: { nome: 'Forza: Upper / Lower x3', tipi: ['upper', 'lower', 'upper', 'lower', 'upper', 'lower'] }
  },
  sedute: {
    3: [[['squat', 'pesante'], ['panca', 'media']],
        [['stacco', 'pesante'], ['panca', 'leggera']],
        [['panca', 'pesante'], ['squat', 'leggera'], ['varStacco', 'leggera']]],
    4: [[['squat', 'pesante'], ['varStacco', 'leggera']],
        [['panca', 'pesante']],
        [['stacco', 'pesante'], ['squat', 'leggera']],
        [['panca', 'media']]],
    5: [[['panca', 'pesante']],
        [['squat', 'pesante'], ['varStacco', 'leggera']],
        [['panca', 'media']],
        [['stacco', 'pesante'], ['squat', 'leggera']],
        [['panca', 'leggera']]],
    6: [[['panca', 'pesante']],
        [['squat', 'pesante'], ['varStacco', 'leggera']],
        [['panca', 'media']],
        [['stacco', 'pesante']],
        [['panca', 'leggera']],
        [['squat', 'leggera']]]
  },
  varianti: {
    /* la gara: l'alzata intera (lo stacco da terra e abilita 3: a chi inizia e ai prudenti lo vieta la Sentinella e resta lo stacco rumeno) */
    gara: { squat: ['Squat con Bilanciere'], panca: ['Panca Piana Bilanciere'], stacco: ['Stacco da Terra (Deadlift)', 'Stacco Rumeno'] },
    standard: { squat: ['Squat con Pausa', 'Front Squat'], panca: ['Panca con Pausa', 'Panca Inclinata Bilanciere'], stacco: ['Stacco Rumeno', 'Stacco in Deficit'] },
    /* docs/ricerca-forza-progressione.md 1.6 (punti deboli e accessori, Convenzione: nessuna prova diretta che una variante batta l'alzata intera) */
    punti: {
      'squat-buca':      { alzata: 'squat',  variante: 'Squat con Pausa' },
      'squat-uscita':    { alzata: 'squat',  variante: 'Front Squat' },
      'panca-petto':     { alzata: 'panca',  variante: 'Panca con Pausa' },
      'panca-meta':      { alzata: 'panca',  variante: 'Panca Presa Stretta' },
      'panca-chiusura':  { alzata: 'panca',  variante: 'Panca Presa Stretta' },
      'stacco-terra':    { alzata: 'stacco', variante: 'Stacco in Deficit' },
      'stacco-chiusura': { alzata: 'stacco', variante: 'Stacco Rumeno' }
    }
  },
  accessori: {
    'squat-buca':      ['Affondi Bulgari', 'Hip Thrust'],
    'squat-uscita':    ['Hip Thrust', 'Affondi Bulgari'],
    'panca-petto':     ['Rematore con Petto Appoggiato', 'Lat Machine'],
    'panca-meta':      ['Pushdown Tricipiti ai Cavi', 'Estensione Tricipiti sopra la Testa ai Cavi', 'Estensione Tricipiti sopra la Testa con Manubrio'],   /* P3-C: con i manubri se non ci sono i cavi (con la palestra bilanciere + manubri + sbarra l'accessorio non entrava mai) */
    'panca-chiusura':  ['Pushdown Tricipiti ai Cavi', 'Estensione Tricipiti sopra la Testa ai Cavi', 'Estensione Tricipiti sopra la Testa con Manubrio'],
    'stacco-terra':    ['Rematore con Petto Appoggiato', 'Lat Machine'],   /* niente rematore col bilanciere nel giorno dello stacco pesante: ABB-07, REC-02 (lombari) */
    'stacco-chiusura': ['Hip Thrust', 'Affondi Bulgari']
  },
  /* SES-03: cosa prende una seduta lower che con le sue alzate non ha uno squat o una cerniera (una macchina o una spinta d'anca: mai un secondo squat o stacco pesante) */
  completamenti: { squat: ['Leg Press', 'Hack Squat'], hinge: ['Hip Thrust', 'Pull-Through ai Cavi'] },
  /* EQ-01 (P3-C): una tirata alta per le spalle (deltoidi posteriori: il collaudo la conta tra le tirate) quando le tirate della settimana non bastano; le stesse di ABB-03 (strCopri) */
  tirateAlte: ['Face Pull', 'Reverse Pec Deck', 'Alzate Posteriori (Reverse Fly)']
};

/* ---- i nomi ---- */
/* un nome ammesso per questa persona: consentito (attrezzi, fastidi, esclusi della Sentinella), senza un fastidio che l'esercizio carica (stress 1 o 2: lo stesso filtro dei passi che aggiungono)
   e, per chi inizia, di abilita 2 al massimo (SEL-06: l'abilita 3, come lo stacco da terra o il front squat, non e per i principianti: collaudo SAF-05) */
function forzaAmmesso(brief, nome, prefs) {
  const p = prefs || brief.lavoro.prefs;
  if (!nome || !consentito(nome, p) || esercizioCaricaIlFastidio(nome, p.fastidi)) return false;
  const a = typeof attributi === 'function' ? attributi(nome) : null;
  return !(brief.chi.principiante && a && a.abilita >= 3);
}
/* l'alzata intera: la prima ammessa della lista di gara (nome completo con l'emoji), o null */
function forzaNomeGara(brief, alzata, prefs) {
  const lista = SPEC_FORZA.varianti.gara[alzata] || [];
  for (let i = 0; i < lista.length; i++) { const n = nomeInLibreria(lista[i]); if (forzaAmmesso(brief, n, prefs)) return n; }
  return null;
}
/* lo schema dell'esercizio: dagli attributi (la libreria nuova), altrimenti dalla tabella vecchia */
function forzaSchema(nome) { const a = typeof attributi === 'function' ? attributi(nome) : null; return (a && a.schema) || schemaDi(nome) || null; }
/* le varianti per le esposizioni non pesanti di un'alzata, in ordine: prima quella del punto debole (FRZ-03), poi le standard; mai il nome della gara, mai due uguali */
function forzaElencoVarianti(brief, alzata, punti, gara) {
  const cand = [];
  punti.forEach(k => { const p = SPEC_FORZA.varianti.punti[k]; if (p && p.alzata === alzata) cand.push(p.variante); });
  (SPEC_FORZA.varianti.standard[alzata] || []).forEach(n => cand.push(n));
  const out = [];
  cand.forEach(n => { const nome = nomeInLibreria(n); if (nome && nome !== gara && out.indexOf(nome) === -1 && forzaAmmesso(brief, nome)) out.push(nome); });
  return out;
}

/* ---- la prescrizione di un'alzata nel suo giorno (FRZ-05): serie e ripetizioni dell'onda, la pausa dalla fascia della classe, i tetti della Sentinella ---- */
function forzaPrescrizione(brief, nome, onda) {
  const chi = brief.chi, w = sogliaForza('onda')[onda], vincoli = brief.sicurezza.vincoli || {};
  let sets = w.serie;
  const a = typeof attributi === 'function' ? attributi(nome) : null;
  if (a && a.schema === 'hinge' && /stacco/i.test(senzaEmoji(nome))) sets = Math.min(sets, sogliaForza('serieMaxStacco'));
  if (vincoli.serieMaxEsercizio) sets = Math.min(sets, vincoli.serieMaxEsercizio);
  if (brief.corpo.sonno === 'male') sets = Math.max(sogliaForza('serieMinimeAlzata'), sets - 1);   /* come il resto della scheda: poco sonno, una serie in meno */
  const lim = limitiPausa(nome, { obiettivo: 'forza', minimiDa: 'forza', reps: w.ripetizioni, donna: chi.donna && regolaAttiva('PRG-20'), parq: chi.parq, over65: chi.over65 });
  const rest = lim[sogliaForza('pausaDaClasse')[onda]];
  return { sets: sets, reps: w.ripetizioni, rest: rest };
}

/* il titolo di una seduta: le prime due alzate, con il giorno se c'e l'onda («Squat pesante · Panca media»); i pezzi separati da « · » si traducono uno a uno */
function forzaTitolo(lifts, conOnda) {
  const pezzi = [];
  lifts.forEach(e => {
    const t = FORZA_TITOLO[e.alzata];
    if (!t || pezzi.length >= 2) return;
    const p = conOnda && e.onda ? t.nome + ' ' + FORZA_AGGETTIVO[t.f ? 'f' : 'm'][e.onda] : t.nome;
    if (pezzi.indexOf(p) === -1) pezzi.push(p);
  });
  return pezzi.join(' · ');
}

/* ============================================================
   STADIO 3: la specialità registrata. Ritorna null (il generatore usa la divisione di sempre) o { split, sedute }.
   ============================================================ */
function specialitaForza(brief) {
  if (!regolaAttiva('FRZ-02')) return null;
  const L = brief.lavoro, note = L.note;
  const att = SPEC_FORZA.attiva(brief);
  if (!att.ok) {
    if (att.nota && note.indexOf(att.nota) === -1) note.push(att.nota);
    if (brief.obiettivi.modalita === 'forza') brief.obiettivi.modalita = 'generale';   /* INT-2f: la modalita dice cio che accade: il powerlifting non si attiva, il programma e di forza generale */
    return null;
  }
  /* la frequenza scelta (2 o 3 volte per muscolo) la sostituisce la frequenza della modalità: la nota del volume («ogni muscolo N volte, come hai scelto») direbbe una cosa che qui non vale */
  if (brief.agenda.freqScelta) { brief.agenda.freqScelta = null; if (note.indexOf(FORZA_NOTA_FREQUENZA_SOSTITUITA) === -1) note.push(FORZA_NOTA_FREQUENZA_SOSTITUITA); }
  /* una struttura sola, dichiarata: un metodo famoso scelto dal coach cede alla modalità (REG-01: lo Specialista viene prima dell'Architetto) */
  if (brief.metodo.attivo || brief.metodo.tocco) brief.metodo = Object.assign({}, brief.metodo, { attivo: null, tocco: null, ispirazioni: [{ id: 'coach', ruolo: 'struttura', perche: [] }] });
  const g = sogliaForza('giorni'), giorni = Math.min(Math.max(Number(brief.agenda.giorni) || g.min, g.min), g.max);
  const sedute = Math.min(giorni, brief.chi.principiante ? 4 : g.max);   /* chi comincia ha al massimo 4 sedute (PRG-02): nel resto della settimana riposo o camminata */
  const piano = SPEC_FORZA.split[sedute];
  L.forza = { sedute: sedute, tipi: piano.tipi.slice(), puntiDeboli: forzaPuntiDeboli(brief.grezzo.d, brief.grezzo.prof0) };
  return { split: { nome: piano.nome, giorni: piano.tipi.slice(), freq: 2 }, sedute: forzaSedute };
}
if (typeof registraSpecialita === 'function') registraSpecialita('forza', specialitaForza);


/* ============================================================
   DOPO LA PRESCRIZIONE: le alzate nelle sedute (FRZ-02), l'onda (FRZ-05), le varianti (FRZ-03), gli accessori (FRZ-04), il testo sul massimale (STD-02).
   Le alzate sono `fisso` (le serie le decide la modalità, non il volume né il taglio per il tempo: lo stesso segno del 5x5 di sempre) e portano `alzata` e `onda` per chi
   dopo le vuole leggere (W3-T6). L'accessorio di un punto debole e `fisso` e `protetto` (ne il volume ne il taglio per il tempo lo tolgono: se non sta nei minuti non entra, e il perché
   lo scrive solo se c'e). Gli altri esercizi
   della seduta restano quelli della ricetta, meno quelli che rifanno lo stesso schema di una alzata (un altro squat, un'altra spinta orizzontale, un'altra cerniera).
   ============================================================ */
function forzaSedute(brief, sedute) {
  const L = brief.lavoro, F = L.forza, chi = brief.chi;
  if (!F || sedute.length !== F.tipi.length || sedute.some((sd, i) => sd.tipo !== F.tipi[i])) return sedute;   /* la divisione non e quella pianificata (riordinata dal generatore): niente */
  const conOnda = !chi.principiante && regolaAttiva('FRZ-05') && !!sogliaForza('ondaGiornaliera');   /* chi comincia ha la stessa prescrizione in ogni seduta */
  const conVarianti = regolaAttiva('FRZ-03');
  const piano = SPEC_FORZA.sedute[F.sedute];
  const gara = {}, varianti = {};
  FORZA_ALZATE_BARRA.forEach(a => { gara[a] = forzaNomeGara(brief, a); varianti[a] = conVarianti ? forzaElencoVarianti(brief, a, F.puntiDeboli, gara[a]) : []; });
  /* il nome di ogni esposizione. Le non pesanti, dalla piu intensa (media) alla meno intensa (leggera): ognuna la sua variante (storia di carichi propria), senza varianti l'alzata intera.
     Chi comincia ha la stessa prescrizione ovunque: l'alzata intera le prime due volte, dalla terza una variante (RID-02: lo stesso esercizio in tre sedute) */
  const ordineOnda = { pesante: 0, media: 1, leggera: 2 }, nomeDi = {}, terza = {};   /* terza: chi comincia, la terza volta della stessa alzata nella settimana (la panca a 3 giorni) ha meno serie (P3-C, VOL-02:petto e EQ-01) */
  FORZA_ALZATE_BARRA.forEach(a => {
    const esposizioni = [];
    piano.forEach((riga, i) => riga.forEach((x, j) => { if (x[0] === a) esposizioni.push({ i: i, j: j, onda: x[1] }); }));
    if (chi.principiante) { esposizioni.forEach((e, k) => { nomeDi[e.i + '|' + e.j] = k < 2 ? gara[a] : (varianti[a][k - 2] || gara[a]); if (k >= 2) terza[e.i + '|' + e.j] = true; }); return; }
    esposizioni.filter(e => e.onda === 'pesante').forEach(e => { nomeDi[e.i + '|' + e.j] = gara[a]; });
    esposizioni.filter(e => e.onda !== 'pesante').sort((p, q) => ordineOnda[p.onda] - ordineOnda[q.onda] || p.i - q.i).forEach((e, k) => { nomeDi[e.i + '|' + e.j] = varianti[a][k] || gara[a]; });
  });
  const varStacco = !chi.principiante && conVarianti ? forzaElencoVarianti(brief, 'stacco', F.puntiDeboli, gara.stacco) : [];
  let kVar = 0;
  const accessoriMessi = [], registro = [];   /* registro: per ogni seduta la sua tirata, per il conto settimanale di forzaEquilibra (EQ-01) */
  sedute.forEach((sd, i) => {
    const riga = piano[i], originali = sd.esercizi.slice(), lifts = [];
    riga.forEach((x, j) => {
      let nome;
      if (x[0] === 'varStacco') nome = varStacco.length ? varStacco[kVar++ % varStacco.length] : null;   /* chi comincia non ha la variante: lo stacco e uno solo */
      else nome = nomeDi[i + '|' + j];
      if (!nome || lifts.some(l => l.name === nome)) return;
      const pr = forzaPrescrizione(brief, nome, conOnda ? x[1] : sogliaForza('ondaPrincipiante'));
      lifts.push({ name: nome, weight: (findExercise(nome) || {}).weight || 0, sets: terza[i + '|' + j] ? Math.min(pr.sets, sogliaForza('serieTerzaEsposizione')) : pr.sets, reps: pr.reps, rest: pr.rest, fisso: true, alzata: x[0] === 'varStacco' ? 'stacco' : x[0], onda: conOnda ? x[1] : undefined });
    });
    if (!lifts.length) return;
    /* FRZ-04: l'accessorio del punto debole nella seduta pesante dell'alzata (uno solo per punto debole) */
    const nuovi = [], portati = [];
    if (regolaAttiva('FRZ-04')) F.puntiDeboli.forEach(k => {
      const p = SPEC_FORZA.varianti.punti[k];
      if (!riga.some(x => x[0] === p.alzata && x[1] === 'pesante') || accessoriMessi.indexOf(k) !== -1) return;
      const cand = (SPEC_FORZA.accessori[k] || []).map(n => nomeInLibreria(n)).filter(n => forzaAmmesso(brief, n) && !lifts.some(l => l.name === n));
      if (!cand.length) return;
      /* se la seduta ha gia quell'esercizio, o un isolamento per lo stesso muscolo (un pushdown per i tricipiti), basta portarlo alle serie dell'accessorio */
      const presente = originali.find(e => e.name === cand[0]) || originali.find(e => bersaglioDi(e.name) && bersaglioDi(e.name) === bersaglioDi(cand[0]) && (findExercise(e.name) || {}).type !== 'compound');
      if (presente) { portati.push({ e: presente, k: k }); accessoriMessi.push(k); return; }
      nuovi.push({ name: cand[0], weight: (findExercise(cand[0]) || {}).weight || 0, puntoDebole: k });
      accessoriMessi.push(k);
    });
    if (nuovi.length) {
      /* la prescrizione di sempre per quel tipo di esercizio (ripetizioni, pausa), con le serie dell'accessorio */
      const pres = prescriviSeduta(brief, lifts.map(l => ({ name: l.name, weight: l.weight })).concat(nuovi), 'forza').slice(lifts.length);
      nuovi.forEach((n, k) => { Object.assign(n, pres[k], { sets: Math.min(pres[k].sets, sogliaForza('serieAccessorio')), protetto: true, fisso: true, puntoDebole: n.puntoDebole }); });
    }
    /* una tirata col suo carico (almeno 3 serie, il taglio per il tempo non la tocca): le spinte della modalità sono fisse e le tirate devono restare almeno il 90% delle spinte (ABB-04, EQ-01) */
    const tirata = originali.find(e => ['tirataO', 'tirataV'].indexOf(forzaSchema(e.name)) !== -1 && (findExercise(e.name) || {}).type === 'compound' && !isTimeBased(e.name));
    if (tirata) { tirata.sets = Math.max(tirata.sets, sogliaForza('serieMinimeTirata')); tirata.protetto = true; }
    /* le alzate (e l'accessorio) stanno nei minuti PRIMA di scegliere cosa resta della ricetta: l'alzata che esce non lascia la seduta senza il suo schema */
    forzaAdattaAlTempo(brief, lifts, nuovi, tirata);
    portati.forEach(p => { p.e.sets = Math.max(p.e.sets, sogliaForza('serieAccessorio')); p.e.protetto = true; p.e.fisso = true; p.e.puntoDebole = p.k; });
    /* gli altri esercizi: via quelli che rifanno lo schema di una alzata rimasta (con una alzata da gambe in seduta nessun altro squat o cerniera) */
    const schemi = lifts.map(l => forzaSchema(l.name));
    const gambe = schemi.indexOf('squat') !== -1 || schemi.indexOf('hinge') !== -1;
    const portatiEs = portati.map(p => p.e);   /* gli esercizi della ricetta portati a 3 serie per il punto debole stanno subito dopo le alzate: il taglio al numero di esercizi non li toglie */
    const altri = originali.filter(e => {
      if (portatiEs.indexOf(e) !== -1) return false;
      const s = forzaSchema(e.name);
      if ((findExercise(e.name) || {}).type !== 'compound') return true;
      if (s === 'spintaO' && lifts.some(l => forzaSchema(l.name) === 'spintaO' && /^petto/.test(bersaglioDi(l.name) || ''))) return false;
      if ((s === 'squat' || s === 'hinge') && gambe) return false;
      if (schemi.indexOf('hinge') !== -1 && SLOT_DEF.glutSpinta(findExercise(e.name))) return false;   /* una cerniera tra le alzate: la spinta d'anca fa lo stesso lavoro (RID-01) */
      return true;
    });
    const dentro = lifts.concat(nuovi, portatiEs, altri);
    /* SES-03: una seduta lower ha uno squat e una cerniera: quello che l'alzata non da lo da un esercizio di supporto (leg press, hip thrust), non un secondo stacco o squat pesante */
    const completi = [];
    if (sd.tipo === 'lower') ['squat', 'hinge'].forEach(k => {
      if (dentro.concat(completi).some(e => forzaFaSchema(e.name, k))) return;
      const cand = (SPEC_FORZA.completamenti[k] || []).map(n => nomeInLibreria(n)).filter(n => forzaAmmesso(brief, n) && !dentro.some(e => e.name === n));
      if (cand.length) completi.push({ name: cand[0], weight: (findExercise(cand[0]) || {}).weight || 0 });
    });
    if (completi.length) {
      const pres = prescriviSeduta(brief, lifts.map(l => ({ name: l.name, weight: l.weight })).concat(completi), 'forza').slice(lifts.length);
      completi.forEach((n, k) => Object.assign(n, pres[k], { completamento: true }));
    }
    const max = Math.max(L.nEs || 0, lifts.length + 2);
    const tutti = lifts.map(l => Object.assign({}, l)).concat(nuovi, portatiEs, completi, tirata && portatiEs.indexOf(tirata) === -1 ? [tirata] : [], altri.filter(e => e !== tirata)).slice(0, Math.max(max, lifts.length + nuovi.length + portatiEs.length + completi.length + (tirata ? 1 : 0)));
    sd.esercizi = forzaPotaAlTempo(brief, tutti, tirata);
    sd.titolo = forzaTitolo(sd.esercizi.filter(e => e.alzata), conOnda) || sd.titolo;
    L.tipiGiorno[i] = 'forza';
    registro.push({ sd: sd, tirata: sd.esercizi.indexOf(tirata) !== -1 ? tirata : null });
  });
  forzaEquilibra(brief, sedute, registro);
  forzaNote(brief, conOnda, F, sedute);
  return sedute;
}

/* ============================================================
   SPINTE E TIRATE (P3-C, EQ-01 del collaudo, ABB-04): le spinte della modalità sono fisse (la panca due o tre volte a settimana: FRZ-01) e le tirate devono restare almeno il 90% delle
   spinte (STR_PESI.tirateSuSpinte). Con la panca tre volte (tre giorni) le spinte sono 8-11 serie e le tirate, dopo il volume per muscolo e il taglio per il tempo (che non conoscono la
   modalità), restavano a 6-9: lo strBilancia del generatore non poteva rialzarle (stesso massimo di serie, B6, tempo gia contato) e le spinte fisse non scendono.
   Qui, a sedute composte e prima dei completamenti, si contano le tirate che resteranno di sicuro (ogni tirata multiarticolare a 2 serie: il taglio per il tempo la porta li e non sotto; gli
   isolamenti non si contano, possono uscire) contro il 90% delle spinte che resteranno (le fisse intere e una spinta verticale di 2 serie, che c'è o la aggiunge completaSettimana: le altre
   spinte della ricetta le toglie strBilancia se serve). Se mancano serie si aggiunge una tirata alta (face pull, reverse pec deck: 2 serie, `fisso` e protetta come le alzate), una per
   seduta, nella seduta con più tempo libero: conta tra le tirate del collaudo (deltoidi posteriori) e non aggiunge serie alla schiena, che per B6 ha già il suo massimo (alzare le serie delle
   tirate portava VOL-02:schiena da 20% a 44% pesata sulla matrice «forza»). Dentro i minuti (durataSeduta, come forzaAdattaAlTempo; con i completamenti di dopo contati come esercizi
   fantasma): DUR-01 non peggiora. Non tocca le spinte (FRZ-01) né le serie delle altre tirate.
   ============================================================ */
function forzaEquilibra(brief, sedute, registro) {
  const chi = brief.chi, opz = opzioniTempo(brief), M = minutiEffettivi(brief.agenda.minuti, chi.livello), pausaMin = sogliaForza('pausaMinimaStima');
  const stima = sd => durataSeduta(sd.esercizi.map(e => e.alzata ? Object.assign({}, e, { rest: Math.min(e.rest, pausaMin) }) : e), opz);
  const massimoEsercizi = chi.principiante ? PARAM_NUMERO_ESERCIZI.maxSedutaPrincipiante : PARAM_NUMERO_ESERCIZI.maxSeduta;
  const minimo = sogliaForza('serieMinimeAlzata');
  const tutti = () => [].concat.apply([], sedute.map(sd => sd.esercizi.filter(e => !e.fantasma)));
  const spinte = () => tutti().reduce((t, e) => t + (e.fisso && !isTimeBased(e.name) && strEspinta(e) ? e.sets : 0), 0) + 2;
  const serve = () => Math.ceil(spinte() * STR_PESI.tirateSuSpinte - 1e-9);
  const libero = r => M - stima(r.sd);
  /* le tirate che resteranno di sicuro: le tirate alte di qui, per intero; ogni tirata multiarticolare della ricetta a 2 serie (il taglio per il tempo, che aggiunge poi i completamenti e taglia le
     sedute, la porta li e non sotto: a 60 minuti per chi comincia tre tirate da 3 serie diventavano 3, 2 e 3); gli isolamenti no (possono uscire) */
  const sicure = () => tutti().reduce((t, e) => t + (isTimeBased(e.name) || !strEtirata(e) ? 0 : (e.tirataAlta ? e.sets : ((findExercise(e.name) || {}).type === 'compound' ? Math.min(e.sets, minimo) : 0))), 0);
  if (!registro.length) return;
  const nomi = (SPEC_FORZA.tirateAlte || []).map(n => nomeInLibreria(n)).filter(n => n && forzaAmmesso(brief, n));
  if (!nomi.length) return;
  /* i completamenti che il generatore aggiungerà dopo (completaSettimana, ABB-03 e PAT-01: un esercizio di core e una spinta verticale se la settimana non li ha) tolgono tempo alle sedute: si
     contano come esercizi fantasma (2 serie) nella seduta con meno esercizi, e si tolgono a fine passo. Senza, le tirate alte a 30 minuti facevano sforare la seduta (DUR-01) */
  const fantasmi = [];
  const fantasma = nome => {
    const sd = registro.slice().sort((x, y) => x.sd.esercizi.length - y.sd.esercizi.length)[0].sd, m = findExercise(nome) || {};
    const f = { name: nome, sets: 2, reps: 8, rest: 90, weight: m.weight || 0, fantasma: true };
    sd.esercizi.push(f); fantasmi.push({ sd: sd, f: f });
  };
  if (!tutti().some(e => (findExercise(e.name) || {}).group === 'core')) fantasma(nomeInLibreria('Plank') || nomeInLibreria('Dead Bug'));
  if (!tutti().some(e => schemaDi(e.name) === 'spintaV')) fantasma(nomeInLibreria('Military Press'));
  /* la tirata alta in una seduta, di `serie` serie: se la seduta non sta nei minuti lascia il posto, come fa forzaPotaAlTempo, agli ultimi esercizi della ricetta che non sono alzate, accessori
     del punto debole, completamenti o tirata (mai sotto il numero minimo di esercizi); prima quelli il cui muscolo lavora anche in un'altra seduta (togliere l'unico curl o l'unico calf raise
     della settimana costava FRQ-01 e DIR-01), poi gli altri dalla fine; se nemmeno cosi sta nei minuti, la seduta resta com'è */
  const provaTirataAlta = (r, nome, serie) => {
    if (r.sd.esercizi.some(e => e.tirataAlta)) return false;
    const m = findExercise(nome) || {}, pres = prescriviSeduta(brief, [{ name: nome, weight: m.weight || 0 }], 'forza')[0];
    const lista = r.sd.esercizi.concat([Object.assign({ name: nome, weight: m.weight || 0 }, pres, { sets: serie, protetto: true, fisso: true, tirataAlta: true })]);
    const prima = r.sd.esercizi;
    const altrove = e => { const b = bersaglioDi(e.name); return !!b && sedute.some(sd => sd !== r.sd && sd.esercizi.some(x => x !== e && bersaglioDi(x.name) === b)); };
    r.sd.esercizi = lista;
    for (let g = 0; (stima(r.sd) > M || lista.length > massimoEsercizi) && g < 10; g++) {
      const togliibili = lista.filter(e => !e.alzata && !e.puntoDebole && !e.completamento && !e.tirataAlta && !e.fantasma && e !== r.tirata && (typeof pavimentoOk !== 'function' || pavimentoOk(brief, sedute, e, e.sets)));   /* mai sotto i pavimenti di volume (tempo.js) */
      const e = togliibili.filter(altrove).pop() || togliibili.pop();
      if (!e || lista.length <= PARAM_NUMERO_ESERCIZI.min) break;
      lista.splice(lista.indexOf(e), 1);
    }
    if (stima(r.sd) <= M && lista.length <= massimoEsercizi) return true;
    r.sd.esercizi = prima;
    return false;
  };
  /* una tirata alta al massimo in due sedute (RID-02: lo stesso esercizio non tre volte a settimana: la prima della lista che ha meno di due sedute), di tante serie quante ne mancano (da 2 a 3:
     ogni serie di tirata alta vale mezza serie di schiena per il volume, B6, e per chi comincia il massimo è 8) */
  const usi = nome => tutti().filter(e => e.name === nome).length;
  for (let giri = 0; sicure() < serve() && giri < 12; giri++) {
    const nome = nomi.find(n => usi(n) < 2), mancano = serve() - sicure();
    const serie = Math.max(sogliaForza('serieTirataAlta'), Math.min(sogliaForza('serieTirataAltaMax'), mancano));
    if (!nome || !registro.slice().sort((x, y) => libero(y) - libero(x)).some(r => provaTirataAlta(r, nome, serie))) break;
  }
  fantasmi.forEach(x => { x.sd.esercizi.splice(x.sd.esercizi.indexOf(x.f), 1); });
}

/* un esercizio fa lo schema `k` (squat o cerniera) come lo intende il generatore: i posti della ricetta di quello schema (SLOT_PER_SCHEMA: squat; cerniera = stacco, good morning, pull-through o una
   spinta d'anca con carico). E la stessa definizione che il taglio per il tempo difende («gli schemi di base restano sempre»): un Affondo Bulgaro conta per il collaudo ma non per il taglio */
function forzaFaSchema(nome, k) {
  const m = findExercise(nome);
  if (!m || typeof SLOT_DEF === 'undefined') return false;
  const posti = (typeof SLOT_PER_SCHEMA !== 'undefined' && SLOT_PER_SCHEMA[k]) || (k === 'squat' ? ['squat'] : ['hinge', 'glutSpinta']);
  return posti.some(p => SLOT_DEF[p] && SLOT_DEF[p](m) && (p !== 'glutSpinta' || m.type === 'compound'));
}

/* le alzate (e l'accessorio del punto debole) da sole devono stare nei minuti: prima esce l'accessorio, poi le serie delle meno pesanti scendono fino al minimo, poi la tirata perde la protezione,
   poi l'ultima alzata non pesante esce, poi le serie della pesante scendono fino al minimo. Il resto della seduta lo taglia il generatore (adattaAlTempo) come per ogni scheda */
function forzaAdattaAlTempo(brief, lifts, nuovi, tirata) {
  const M = minutiEffettivi(brief.agenda.minuti, brief.chi.livello), minimo = sogliaForza('serieMinimeAlzata'), opz = opzioniTempo(brief);
  let t = tirata || null;   /* la tirata protetta conta nel tempo; se nemmeno cosi ci sta, perde la protezione e la taglia il generatore */
  const pausaMin = sogliaForza('pausaMinimaStima');   /* il taglio per il tempo accorcia le pause delle alzate fino alla fascia del collaudo (RX-02, forza pesante): la stima conta con quelle */
  const durata = () => durataSeduta(lifts.concat(nuovi, t ? [t] : []).map(e => Object.assign({}, e, { rest: e.alzata ? Math.min(e.rest, pausaMin) : e.rest })), opz);
  let g = 0;
  while (durata() > M && g++ < 30) {
    if (nuovi.length) { nuovi.pop(); continue; }
    const meno = lifts.filter(e => e.onda !== 'pesante' && e.sets > minimo).pop();
    if (meno) { meno.sets--; continue; }
    if (t) { t.protetto = false; t = null; continue; }   /* prima la frequenza delle alzate, poi la protezione della tirata */
    const ultima = lifts.filter(e => e.onda !== 'pesante').pop();
    if (ultima && lifts.length > 1) { lifts.splice(lifts.indexOf(ultima), 1); continue; }
    const pesante = lifts.filter(e => e.sets > minimo).pop();
    if (pesante) { pesante.sets--; continue; }
    break;
  }
}

/* tutta la seduta sta nei minuti: se con la ricetta non ci sta, escono gli ultimi esercizi che non sono alzate, accessori del punto debole, completamenti dello schema ne la tirata protetta. Il generatore non
   puo farlo da solo: le alzate sono fisse e i pavimenti di volume della settimana gli impediscono di togliere altro (a 30 minuti la ricetta restava a 38-44 minuti stimati) */
function forzaPotaAlTempo(brief, lista, tirata) {
  const M = minutiEffettivi(brief.agenda.minuti, brief.chi.livello), opz = opzioniTempo(brief), pausaMin = sogliaForza('pausaMinimaStima');
  const stima = () => durataSeduta(lista.map(e => e.alzata ? Object.assign({}, e, { rest: Math.min(e.rest, pausaMin) }) : e), opz);
  const minimo = sogliaForza('serieMinimeAlzata');
  let g = 0;
  while (stima() > M && g++ < 30) {
    let k = -1;
    for (let i = lista.length - 1; i >= 0 && k === -1; i--) { const e = lista[i]; if (!e.alzata && !e.puntoDebole && !e.completamento && e !== tirata) k = i; }
    if (k !== -1 && lista.length > PARAM_NUMERO_ESERCIZI.min) { lista.splice(k, 1); continue; }   /* mai sotto il numero minimo di esercizi di una seduta (EXN-01) */
    const piu = lista.filter(e => e.alzata && e.sets > minimo).sort((a, b) => (b.onda !== 'pesante') - (a.onda !== 'pesante') || b.sets - a.sets)[0];   /* poi serie alle alzate, le non pesanti per prime */
    if (!piu) break;
    piu.sets--;
  }
  return lista;
}

/* le note e i perche: dicono quello che il programma fa (con i minuti stretti una alzata puo uscire da una seduta: allora la nota lo dice). STD-02 (testo): nessun massimale */
function forzaNote(brief, conOnda, F, sedute) {
  const note = brief.lavoro.note, min = sogliaForza('frequenzaMinima');
  const aggiungi = (t) => { if (note.indexOf(t) === -1) note.push(t); };
  const sedutePer = (a) => sedute.filter(sd => sd.esercizi.some(e => e.alzata === a)).length;
  const completa = FORZA_ALZATE_BARRA.every(a => sedutePer(a) >= min[a]);
  const tutti = [].concat.apply([], sedute.map(sd => sd.esercizi));
  const conVarianti = tutti.some(e => e.alzata && e.onda && e.onda !== 'pesante' && FORZA_ALZATE_BARRA.some(a => a === e.alzata && e.name !== forzaNomeGara(brief, a)));   /* c'e davvero una variante in scheda */
  const conTerza = FORZA_ALZATE_BARRA.some(a => sedutePer(a) >= 3);   /* la terza volta della stessa alzata: ha due serie (serieTerzaEsposizione) */
  aggiungi(!completa ? FORZA_NOTA_MINUTI : (!conOnda ? (brief.chi.principiante ? (conTerza ? FORZA_NOTA_PRINCIPIANTE_TERZA : FORZA_NOTA_PRINCIPIANTE) : FORZA_NOTA_PIATTA) : (conVarianti ? FORZA_NOTA_STRUTTURA : FORZA_NOTA_ONDA)));
  aggiungi(FORZA_NOTA_MASSIMALE);
  if (completa) aggiungiPerche(brief, 'FRZ-02', FORZA_PERCHE_STRUTTURA, { forza: SOGLIE_FORZA.frequenzaMinima.forza });
  if (completa && conOnda) aggiungiPerche(brief, 'FRZ-05', FORZA_PERCHE_ONDA, { forza: SOGLIE_FORZA.ondaGiornaliera.forza });
  const conVariante = F.puntiDeboli.some(k => { const p = SPEC_FORZA.varianti.punti[k], n = nomeInLibreria(p.variante); return tutti.some(e => e.alzata === p.alzata && e.onda !== 'pesante' && e.name === n); });
  if (conVariante && regolaAttiva('FRZ-03')) aggiungiPerche(brief, 'FRZ-03', FORZA_PERCHE_VARIANTE, { forza: 'Convenzione' });
  if (tutti.some(e => e.puntoDebole) && regolaAttiva('FRZ-04')) aggiungiPerche(brief, 'FRZ-04', FORZA_PERCHE_ACCESSORIO, { forza: SOGLIE_FORZA.serieAccessorio.forza });
  aggiungiPerche(brief, 'STD-02', FORZA_NOTA_MASSIMALE, { forza: 'Moderata' });
}
