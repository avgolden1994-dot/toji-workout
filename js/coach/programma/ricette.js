/* Variazione del coach: ricette a slot e composizione delle sedute (componiSedute)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   VARIAZIONE DEL COACH: ricette a slot
   Ogni tipo di giorno e una lista di posti in ordine di priorita.
   Per ogni posto il coach sceglie tra tutti gli esercizi adatti
   (schema, attrezzi, fastidi, graditi, allungamento) con un pizzico
   di variazione guidata da un seme: programmi diversi a ogni ciclo,
   stabili dentro il ciclo. Con l obiettivo forza i fondamentali
   restano fissi (la forza e specifica dello strumento).
   ============================================================ */
function rngDa(seme) {
  let x = 2166136261;
  String(seme).split('').forEach(c => { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; });
  return () => { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return (x % 100000) / 100000; };
}
const _n = (e) => senzaEmoji(e.name);
const SLOT_DEF = {
  spintaO: e => schemaDi(e.name) === 'spintaO' && e.group === 'petto',   /* i piegamenti a diamante e i dip su panca sono per i tricipiti */
  spintaV: e => schemaDi(e.name) === 'spintaV' || /landmine/i.test(_n(e)),
  tirataO: e => schemaDi(e.name) === 'tirataO' || /rematore alla macchina|rematore con petto|rematore inverso/i.test(_n(e)),
  tirataV: e => schemaDi(e.name) === 'tirataV',
  squat: e => schemaDi(e.name) === 'squat' && e.type === 'compound' && !e.lato && !/sumo/i.test(_n(e)),   /* lo squat sumo e per gli adduttori: non e il fondamentale delle gambe */
  unilaterale: e => (e.group === 'gambe' || e.group === 'glutei') && e.type === 'compound' && !!e.lato,
  hinge: e => /stacco|good morning|pull-through/i.test(_n(e)),
  staccoTerra: e => /stacco da terra/i.test(_n(e)),   /* B19: lo Starting Strength fa lo stacco da terra, non il rumeno */
  glutSpinta: e => /hip thrust|ponte glutei/i.test(_n(e)),
  isoPetto: e => e.group === 'petto' && e.type !== 'compound',
  isoDeltL: e => /alzate laterali/i.test(_n(e)),
  isoDeltP: e => /face pull|reverse|alzate posteriori|y-raise/i.test(_n(e)),
  isoBic: e => e.group === 'braccia' && /curl/i.test(_n(e)) && !/inverso|zottman/i.test(_n(e)),   /* il curl inverso e per gli avambracci, lo Zottman e un classico: non sono il posto del bicipite */
  isoTri: e => e.group === 'braccia' && /pushdown|french press|estensione tricipiti|kickback tricipiti/i.test(_n(e)),
  isoFem: e => /leg curl|nordic/i.test(_n(e)),
  isoQuad: e => /leg extension/i.test(_n(e)),
  isoPolp: e => /calf raise/i.test(_n(e)),
  core: e => e.group === 'core'
};
/* ricette: le varianti A/B/C cambiano l ordine e alcuni posti */
const RICETTE = {
  push: k => ['spintaO', 'spintaV', 'spintaO2', 'isoDeltL', 'isoTri', 'isoPetto'],
  pull: k => k % 2 ? ['tirataV', 'tirataO', 'hinge', 'isoDeltP', 'isoBic', 'isoBic2'] : ['hinge', 'tirataV', 'tirataO', 'isoDeltP', 'isoBic', 'isoBic2'],
  legs: k => ['squat', 'hinge', 'unilaterale', 'squat2', 'isoFem', 'isoPolp'],
  upper: k => k % 2 ? ['tirataO', 'spintaO', 'tirataV', 'spintaV', 'isoDeltL', 'isoTri', 'isoBic'] : ['spintaO', 'tirataV', 'spintaV', 'tirataO', 'isoBic', 'isoTri', 'isoDeltL'],   /* A: petto, tirata verticale, spalle; B: tirata orizzontale, petto, tirata verticale: in due sedute spinte e tirate pari e il petto sempre 2 volte */
  lower: k => k % 2 ? ['hinge', 'unilaterale', 'squat', 'glutSpinta', 'isoQuad', 'isoPolp'] : ['squat', 'hinge', 'unilaterale', 'glutSpinta', 'isoFem', 'isoPolp'],
  /* sedute dell epoca d oro (Arnold, Mentzer): petto e schiena in coppia, poi spalle e braccia */
  'petto-schiena': k => ['spintaO', 'tirataV', 'spintaO2', 'tirataO', 'isoPetto', 'hinge'],
  'spalle-braccia': k => ['spintaV', 'isoDeltL', 'isoBic', 'isoTri', 'isoDeltP', 'isoBic2'],
  /* nei full body spinte e tirate si alternano anche quando la seduta e corta (ABB-04): tagliando a 4-5 posti restano pari */
  fullbody: k => [['squat', 'spintaO', 'tirataV', 'hinge', 'tirataO', 'spintaV', 'core'], ['hinge', 'spintaV', 'tirataO', 'squat', 'spintaO', 'tirataV', 'core'], ['unilaterale', 'spintaO', 'tirataO', 'glutSpinta', 'tirataV', 'spintaV', 'core']][k % 3]
};
/* preferenze di base (classifiche degli esperti e rapporto stimolo/fatica) */
const PRIORI = {
  'Panca Piana Bilanciere': 3, 'Panca Inclinata Manubri': 2.5, 'Chest Press Machine': 2.5, 'Panca Piana Manubri': 2.5, 'Panca Inclinata Bilanciere': 2,
  'Military Press': 2.5, 'Shoulder Press Machine': 2.5, 'Lento Avanti Manubri': 2, 'Landmine Press': 1.5,
  'Lat Machine': 3, 'Trazioni alla Sbarra (Pull-ups)': 2.5, 'Lat Machine a un Braccio': 2.5, 'Trazioni Assistite (Macchina)': 2,
  'Rematore con Petto Appoggiato': 3, 'Rematore alla Macchina': 2.5, 'Pulley Basso': 2.5, 'Rematore con Bilanciere': 2, 'Rematore con Manubrio': 2,
  'Squat con Bilanciere': 3, 'Hack Squat': 3, 'Pendulum Squat': 2.5, 'Leg Press': 2.5, 'Squat al Multipower': 2, 'Front Squat': 1.5, 'Goblet Squat': 1.5,
  'Stacco Rumeno': 3, 'Stacco da Terra (Deadlift)': 2.5, 'Stacco con Trap Bar': 2.5, 'Pull-Through ai Cavi': 1.5,
  'Affondi Bulgari': 3, 'Affondi in Camminata': 2.5, 'Affondi Inversi': 2, 'Affondi al Multipower (Piede Rialzato)': 2,
  'Hip Thrust': 3, 'Hip Thrust alla Macchina': 2.5,
  'Leg Curl Seduto': 3, 'Nordic Curl': 1.5, 'Leg Extension': 2.5,
  'Alzate Laterali ai Cavi': 3, 'Alzate Laterali': 2.5, 'Reverse Pec Deck': 3, 'Face Pull': 2.5,
  'Curl Bayesiano ai Cavi': 3, 'Curl su Panca Inclinata': 2.5, 'Curl su Panca Scott': 2.5, 'Curl Bilanciere Bicipiti': 2,
  'Estensione Tricipiti sopra la Testa ai Cavi': 3, 'Pushdown con Corda': 2.5, 'Estensione Tricipiti sopra la Testa con Manubrio': 2.5,
  'Croci ai Cavi da Seduto': 3, 'Pectoral Machine (Butterfly)': 2.5, 'Croci ai Cavi dal Basso': 2,
  'Calf Raise in Piedi': 2.5, 'Calf Raise Seduto': 2, 'Calf Raise alla Leg Press': 2,
  'Plank': 2, 'Pallof Press': 2, 'Dead Bug': 2, 'Crunch al Cavo': 2
};
const SCHEMI_ATTESI = { fullbody: ['spinta', 'tirata', 'basso'], upper: ['spinta', 'tirata'], lower: ['squat', 'hinge'], legs: ['squat', 'hinge'], push: ['spinta'], pull: ['tirata'] };
const SLOT_PER_SCHEMA = { spinta: ['spintaO', 'spintaV'], tirata: ['tirataO', 'tirataV'], basso: ['squat', 'hinge', 'glutSpinta'], squat: ['squat'], hinge: ['hinge', 'glutSpinta'] };
/* un esercizio e adatto a una seduta di quel tipo se allena i suoi muscoli: nelle sedute di tirata solo il bicipite delle braccia e i deltoidi posteriori, in quelle di spinta solo il tricipite e i deltoidi anteriori e laterali */
function adattoAllaSeduta(x, tipo) {
  const g = GRUPPI_DELLA_SEDUTA[tipo];
  if (!g) return true;
  if (g.indexOf(x.group) === -1) return false;
  const sub = (dettaglioEsercizio(x.name) || {}).sub, n = senzaEmoji(x.name);
  const dietro = /face pull|reverse|alzate posteriori|y-raise/i.test(n);
  if (tipo === 'pull') return x.group === 'schiena' || (x.group === 'braccia' && sub === 'Bicipiti') || (x.group === 'spalle' && dietro);
  if (tipo === 'push') return x.group === 'petto' || (x.group === 'braccia' && sub === 'Tricipiti') || (x.group === 'spalle' && !dietro);
  return true;
}
const RIPETIZIONI_SETTIMANA_MAX = 2;   /* lo stesso esercizio al massimo in 2 sedute a settimana (collaudo RID-02, Convenzione) */
/* Nordic Curl (revisione dell onda 0, B1): e una discesa eccentrica sovramassimale, ci si inginocchia e si cade in avanti sulle mani. Non e per chi inizia, per i prudenti
   (over 65, PAR-Q, minorenni) ne per chi ha le ginocchia dolenti; per gli altri al massimo 3 serie da 3-6 ripetizioni, in una seduta a settimana (la libreria lo da a 3x6).
   Dove manca, a casa i femorali restano sotto il minimo (con la nota): le flessioni vere (elastico, slider) sono di W1-T5. */
const PARAM_NORDIC = { serieMax: 3, ripetizioniMax: 6, sedutePerSettimana: 1 };
const RX_NORDIC = /nordic/i;
function maxSettimana(nome) { return RX_NORDIC.test(senzaEmoji(nome)) ? PARAM_NORDIC.sedutePerSettimana : RIPETIZIONI_SETTIMANA_MAX; }
function ripetizioniFlessione(nome) { const m = findExercise(nome) || {}; return RX_NORDIC.test(senzaEmoji(nome)) ? Math.min(m.reps || PARAM_NORDIC.ripetizioniMax, PARAM_NORDIC.ripetizioniMax) : (m.reps && m.reps > 8 ? m.reps : 12); }
/* i gruppi che allena ogni tipo di seduta: servono a riempire una seduta rimasta con meno di 3 esercizi (EXN-01) e a scegliere un esercizio in piu (riempiTempo); i full body e i punti deboli: tutti */
const GRUPPI_DELLA_SEDUTA = { push: ['petto', 'spalle', 'braccia'], pull: ['schiena', 'braccia', 'spalle'], legs: ['gambe', 'glutei'], lower: ['gambe', 'glutei'],
  upper: ['petto', 'schiena', 'spalle', 'braccia'], 'petto-schiena': ['petto', 'schiena'], 'spalle-braccia': ['spalle', 'braccia'] };

/* ============================================================
   COMPOSIZIONE DELLE SEDUTE (piano coach v2, B.3 stadio 6; W1-T4)
   componiSedute(brief, split): per ogni seduta della divisione, scegli gli esercizi dei posti della ricetta (SLOT_DEF, RICETTE) tra tutti quelli adatti
   (schema, attrezzi, fastidi, graditi, allungamento, varieta col seme), con le regole di struttura che dipendono dalla scelta (una sola schiena pesante,
   niente esercizi ridondanti, un multiarticolare di ogni schema, almeno 3 esercizi, il core in fondo). Ritorna le sedute { giorno, tipo, titolo, esercizi }
   con gli esercizi SCELTI ({ name, weight }): serie, ripetizioni e pause le dice prescriviSerie (volume/serie-ripetizioni.js).
   Scrive in brief.lavoro: tipiGiorno (forza o ipertrofia, per la prescrizione), le sostituzioni, e i segni di CAS-14 (pullover al posto della tirata
   verticale, serie in piu al rematore) che legge completaSettimana. Per le 48 ore dei riempimenti (REC-01) sa le serie delle sedute gia fatte:
   le chiede a prescriviSeduta senza toccare niente.
   ============================================================ */
function componiSedute(brief, split) {
  const chi = brief.chi, level = chi.livello, cauto = chi.cauto, goals = brief.obiettivi.lista, ps = brief.mente.ps, metodoAttivo = brief.metodo.attivo;
  const L = brief.lavoro, prefs = L.prefs, nEs = L.nEs, sostituzioni = L.sostituzioni, indiciGiorni = brief.agenda.indiciGiorni;
  const testFisici = brief.test, fattoreVarieta = brief.preferenze.varieta;
  const visti = {};

  /* variazione: ogni programma (e ogni ciclo) esce diverso, ma e ripetibile col suo seme */
  const rng = rngDa(brief.seme);
  const occ = {}, usatiSett = {};
  /* 3 giorni con upper e lower una volta sola: il full body fa da giorno leggero per entrambi (forza + ipertrofia, ogni muscolo 2 volte) */
  const ulUnico = split.giorni.filter(g => g === 'upper').length === 1 && split.giorni.filter(g => g === 'lower').length === 1;
  let schienaPrima = null;   /* ABB-07: la seduta del giorno prima aveva un carico pesante sulla schiena? */
  let senzaSbarra = false;           /* CAS-14: almeno un posto della tirata verticale e stato riempito con il pullover o con una serie in piu di rematore */
  let pulloverMesso = false;         /* CAS-14: almeno un posto e stato riempito con il pullover (lo dice anche la nota dello schema aggiunto, come PRG-21) */
  const senzaSbarraSerieInPiu = [];  /* CAS-14: gli indici delle sedute dove il posto e rimasto vuoto: il rematore prende una serie in piu */
  const costruite = [];   /* le sedute gia fatte (giorni precedenti): servono alle 48 ore dei riempimenti (W0-T7, REC-01) */
  const sedute = split.giorni.slice(0, brief.agenda.giorni).map((tplId, i) => {
    const tpl = WORKOUT_TEMPLATES.find(t => t.id === tplId);
    const usati = [];
    const base = [];
    let pesantiSchiena = 0;
    const vietaSchiena = !!(schienaPrima && !metodoAttivo && indiciGiorni[i] - schienaPrima.idx === 1 && schienaPrima.pesa);
    let schienaQui = false;
    /* PHUL: all intermedio con upper/lower la prima volta e forza, la seconda ipertrofia */
    const tipoGiorno = ((level === 'intermedio' && !metodoAttivo) || (metodoAttivo && metodoAttivo.phul)) && (tplId === 'upper' || tplId === 'lower') ? (visti[tplId] ? 'ipertrofia' : 'forza')
      : (level === 'intermedio' && !metodoAttivo && tplId === 'fullbody' && ulUnico ? 'ipertrofia' : null);
    visti[tplId] = true;
    /* ricetta a slot: per ogni posto il coach sceglie tra tutti gli esercizi adatti */
    const RIC = (metodoAttivo && metodoAttivo.ricette && metodoAttivo.ricette[tplId]) ? metodoAttivo.ricette : RICETTE;
    const ricetta = tplId === 'punti' ? ricettaPunti(prefs.priorita) : (RIC[tplId] ? RIC[tplId](occ[tplId] || 0) : []);
    occ[tplId] = (occ[tplId] || 0) + 1;
    ricetta.forEach((slot, pos) => {
      if (base.length >= nEs) return;
      const def = SLOT_DEF[slot.replace(/\d$/, '')];
      if (!def) return;
      /* RID-01: la spinta d anca non e il terzo esercizio per il grande gluteo (stacco, affondo e hip thrust fanno lo stesso lavoro: ABB-02 ne ammette due) */
      if (slot === 'glutSpinta' && base.filter(y => bersaglioDi(y.name) === 'grande_gluteo' && (findExercise(y.name) || {}).type === 'compound').length >= 2) return;
      /* W1-T6: e una sola spinta d anca per seduta: se il posto dell hinge l ha gia preso (la schiena dolente o il giorno dopo un carico lombare pesante: senzaCandidati) il posto della spinta
         d anca non ne mette una seconda (Hip Thrust e Hip Thrust con Manubrio nella stessa seduta) */
      if (slot === 'glutSpinta' && base.some(y => SLOT_DEF.glutSpinta(y))) return;
      const tutti = EXERCISE_LIBRARY.filter(x => def(x) && !base.some(y => y.name === x.name));
      if (!tutti.length) return;
      const pesante = (pos === 0 || (metodoAttivo && metodoAttivo.pesanti)) && !cauto && !(metodoAttivo && metodoAttivo.leggeri);   /* leggeri: Gironda, 8x8 con macchine e pesi moderati */
      const fisso = pesante && goals[0] === 'forza';
      const prio = (x) => (PRIORI[x.name.replace(EMOJI_TESTA, '')] || 0) + (pesante && tipoCarico(x.name) === 'pesante' ? 3 : 0) - (cauto && tipoCarico(x.name) === 'pesante' ? 3 : 0);
      const migliore = tutti.slice().sort((x, y) => prio(y) - prio(x))[0];
      /* ABB-07: una sola schiena pesante per seduta; non nei metodi essenziali (Starting Strength, StrongLifts, GreySkull: squat e stacco insieme sono il metodo) */
      const ok = tutti.filter(x => consentito(x.name, prefs) && !(RX_NORDIC.test(senzaEmoji(x.name)) && (usatiSett[x.name] || 0) >= PARAM_NORDIC.sedutePerSettimana) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1 && !(metodoAttivo && metodoAttivo.essenziale)) && !(metodoAttivo && metodoAttivo.leggeri && tipoCarico(x.name) === 'pesante'));
      /* il posto resta senza candidati (fastidi, attrezzi, una schiena pesante gia nella seduta, o il giorno dopo un carico lombare pesante: sotto) */
      const senzaCandidati = () => {
        /* SES-03 (ponte di W0-T2): senza stacchi (schiena dolente, niente bilanciere ne cavi) il posto dell hinge lo prende la spinta d anca con carico (hip thrust):
           e il movimento di cerniera dell anca che resta, e la seduta di gambe non ne e priva */
        if (slot.replace(/\d$/, '') === 'hinge') {
          const hip = EXERCISE_LIBRARY.filter(x => SLOT_DEF.glutSpinta(x) && x.type === 'compound' && consentito(x.name, prefs) && !base.some(y => y.name === x.name)).sort((a, b) => (PRIORI[senzaEmoji(b.name)] || 0) - (PRIORI[senzaEmoji(a.name)] || 0))[0];
          if (hip) { usatiSett[hip.name] = (usatiSett[hip.name] || 0) + 1; base.push({ name: hip.name, weight: hip.weight || 0 }); }
        }
        /* CAS-14 (ponte di W0-T2, B28; W0-T7): senza sbarra ne macchine il posto della tirata verticale prende il Pullover con Manubrio (dorsali, D-P11) SUBITO, al suo posto
           nella ricetta: conta come uno dei nEs esercizi (sostituisce l ultimo posto, non si aggiunge) ed e protetto dai tagli. Se non c e nemmeno quello (corpo libero, o la spalla
           dolente), il rematore della seduta ha una serie in piu (sotto) */
        if (slot.replace(/\d$/, '') === 'tirataV' && regolaAttiva('CAS-14')) {
          const pull = nomeInLibreria('Pullover con Manubrio');
          if (pull && consentito(pull, prefs) && !base.some(y => y.name === pull)) { usatiSett[pull] = (usatiSett[pull] || 0) + 1; base.push({ name: pull, weight: (findExercise(pull) || {}).weight || 0, riservaTirataV: true, protetto: true }); senzaSbarra = true; pulloverMesso = true; }
          else senzaSbarraSerieInPiu.push(i);
        }
      };
      if (!ok.length) { senzaCandidati(); return; }
      const punteggio = (x) => {
        let v = prio(x) + bonusBiomecc(x, slot.replace(/\d$/, ''), testFisici, prefs.fastidi);
        if ((prefs.graditi || []).indexOf(x.name) !== -1) v += 3;
        if (inAllungamento(x.name)) v += 1.5;
        if (usatiSett[x.name] && !(metodoAttivo && metodoAttivo.ripeti)) v -= level === 'principiante' ? 1 : 4;   /* varieta tra i giorni (ripeti: i metodi con la stessa seduta ogni volta) */
        if (!fisso) v += rng() * (level === 'principiante' ? 1 : 2.5) * fattoreVarieta;    /* la variazione del coach, dosata sul gusto */
        if (ps.disagio && !fisso && attrezzoDi(senzaEmoji(x.name)) === 'bilanciere') v -= 2;   /* a disagio: meno bilanciere, meno postazioni */
        if (strRidondante(x, base)) v -= 4;   /* ABB-02: non due esercizi che fanno lo stesso lavoro */
        if (vietaSchiena && strSchiena(x.name)) v -= 5;   /* ABB-07: due giorni di fila, schiena pesante una volta sola */
        return v;
      };
      /* ABB-02 come regola: il migliore che non fa lo stesso lavoro di uno gia scelto, se c e (stesso ordine, stessa casualita) */
      let ordinati = ok.slice().sort((x, y) => punteggio(y) - punteggio(x));
      /* ABB-07 / REC-02 (W1-T6): il giorno dopo un carico pesante sui lombari il posto non prende un altro esercizio pesante per la schiena se ne esiste uno che non lo e (prima era solo una
         penalita di 5 punti, e il trap bar, lo stacco rumeno coi manubri o il front squat passavano). Il posto dell hinge, dove c e solo lo stacco, resta vuoto: lo prende la spinta d anca
         (senzaCandidati, SES-03). Si filtra DOPO l ordinamento: la casualita (rng) si consuma come prima e le altre sedute non cambiano per questo */
      if (vietaSchiena) {
        const leggeri = ordinati.filter(x => !strSchiena(x.name));
        if (slot.replace(/\d$/, '') === 'hinge' && tplId === 'fullbody') return;   /* il full body ha il suo squat per le gambe (SES-03 «basso»): il giorno dopo uno stacco niente cerniera, ne il pull-through ne la spinta d anca (carico solo sui glutei, REC-01) */
        if (leggeri.length) ordinati = leggeri;
        else if (slot.replace(/\d$/, '') === 'hinge') { senzaCandidati(); return; }
        else if (slot === 'unilaterale') return;   /* lo stacco rumeno a una gamba (le ginocchia dolenti tolgono gli affondi): il posto non e un fondamentale, resta vuoto */
      }
      const scelta = ordinati.find(x => !strRidondante(x, base)) || ordinati[0];
      /* RID-01 (W1-T6): il secondo posto dello stesso tipo (squat2, spintaO2, isoBic2) non diventa un TERZO esercizio che fa lo stesso lavoro di due gia scelti (nemmeno l eccezione dello
         squat o dei glutei ne ammette tre): a corpo libero lo squat, gli affondi e lo squat su scatola finivano nella stessa seduta, tre esercizi solo per i quadricipiti. Il posto resta
         vuoto: lo riempie il tempo (riempiTempo: un isolamento) o l EXN-01 (almeno 3 esercizi) */
      if (/\d$/.test(slot) && strTerzoUguale(scelta, base)) return;
      if (migliore && scelta.name !== migliore.name && !consentito(migliore.name, prefs)) sostituzioni.push({ da: migliore.name, a: scelta.name });
      if (SCHIENA_PESANTE.test(scelta.name)) pesantiSchiena++;
      if (strSchiena(scelta.name)) schienaQui = true;
      usatiSett[scelta.name] = (usatiSett[scelta.name] || 0) + 1;
      base.push({ name: scelta.name, weight: scelta.weight || 0 });
    });
    /* SES-03 (ponte di W0-T2): ogni seduta ha un multiarticolare di ogni schema del suo tipo (full body: spinta, tirata, squat o hinge; upper: spinta e tirata; lower:
       squat e hinge; push: spinta; pull: tirata). Se i fastidi, gli attrezzi o il taglio dei posti ne hanno tolto uno, entra il migliore possibile, anche oltre nEs */
    if (!metodoAttivo) (SCHEMI_ATTESI[tplId] || []).forEach(k => {
      const slots = SLOT_PER_SCHEMA[k];
      const e1 = (x) => slots.some(sl => SLOT_DEF[sl](x) && (sl !== 'glutSpinta' || x.type === 'compound'));
      if (base.some(b => { const x = findExercise(b.name); return x && e1(x); })) return;
      const cand = EXERCISE_LIBRARY.filter(x => e1(x) && consentito(x.name, prefs) && !base.some(y => y.name === x.name) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1)).sort((a, b) =>
        ((vietaSchiena && strSchiena(a.name)) - (vietaSchiena && strSchiena(b.name))) || (strRidondante(a, base) - strRidondante(b, base)) || (((usatiSett[a.name] || 0) >= maxSettimana(a.name)) - ((usatiSett[b.name] || 0) >= maxSettimana(b.name))) || ((PRIORI[senzaEmoji(b.name)] || 0) - (cauto && tipoCarico(b.name) === 'pesante' ? 3 : 0)) - ((PRIORI[senzaEmoji(a.name)] || 0) - (cauto && tipoCarico(a.name) === 'pesante' ? 3 : 0)))[0];
      if (!cand) return;
      if (SCHIENA_PESANTE.test(cand.name)) pesantiSchiena++;
      if (strSchiena(cand.name)) schienaQui = true;
      usatiSett[cand.name] = (usatiSett[cand.name] || 0) + 1;
      base.push({ name: cand.name, weight: cand.weight || 0 });
    });
    /* EXN-01 (B1, ponte di W0-T2): una seduta ha almeno 3 esercizi. Quando i fastidi o gli attrezzi svuotano i posti della ricetta
       (corpo libero con le ginocchia dolenti, per esempio) si riempie con i muscoli della seduta, poi con il core */
    for (let g = 0; base.length < PARAM_NUMERO_ESERCIZI.min && g < 4; g++) {
      const gruppi = GRUPPI_DELLA_SEDUTA[tplId] || null;
      const libero = (x) => consentito(x.name, prefs) && !base.some(y => y.name === x.name) && (usatiSett[x.name] || 0) < maxSettimana(x.name) && !(SCHIENA_PESANTE.test(x.name) && pesantiSchiena >= 1) && !(vietaSchiena && strSchiena(x.name)) && !(metodoAttivo && metodoAttivo.leggeri && tipoCarico(x.name) === 'pesante');
      const punto = (x) => (PRIORI[x.name.replace(EMOJI_TESTA, '')] || 0) - (usatiSett[x.name] ? 2 : 0) - (isTimeBased(x.name) ? 1 : 0) + (x.type === 'compound' && tplId !== 'punti' ? 1 : 0);
      const migliore = (lista) => lista.sort((a, b) => punto(b) - punto(a))[0];
      /* prima un esercizio dei muscoli della seduta che non faccia lo stesso lavoro di uno gia scelto (ABB-02), poi, nella seduta di tirata, la catena posteriore (femorali e glutei
         in isolamento: la tirata della schiena a corpo libero e una sola, W0-T7), poi il core (UNO solo per seduta: Dead Bug e Plank insieme non sono lavoro per la schiena), poi anche uno ridondante */
      const dei = EXERCISE_LIBRARY.filter(x => libero(x) && x.group !== 'core' && (!gruppi || adattoAllaSeduta(x, tplId)) && (tplId !== 'punti' || x.type !== 'compound'));
      const sdAttuale = { giorno: DAYS[indiciGiorni[i]], esercizi: base.map(y => ({ name: y.name, sets: 3 })) };
      const affini = tplId === 'pull' ? EXERCISE_LIBRARY.filter(x => libero(x) && x.type !== 'compound' && x.group !== 'core' && ['femorali', 'grande_gluteo'].indexOf(bersaglioDi(x.name)) !== -1 && !isTimeBased(x.name) &&
        recuperoOk(sdAttuale, costruite, x.name, 3)) : [];
      const core = base.some(y => (findExercise(y.name) || {}).group === 'core') ? null : migliore(EXERCISE_LIBRARY.filter(x => libero(x) && x.group === 'core'));
      const scelto = migliore(dei.filter(x => !strRidondante(x, base))) || migliore(affini.filter(x => !strRidondante(x, base))) || core || migliore(dei);
      if (!scelto) break;
      if (SCHIENA_PESANTE.test(scelto.name)) pesantiSchiena++;
      if (strSchiena(scelto.name)) schienaQui = true;
      usatiSett[scelto.name] = (usatiSett[scelto.name] || 0) + 1;
      base.push({ name: scelto.name, weight: scelto.weight || 0 });
    }
    if (tplId === 'punti') base.sort((a, b) => ((findExercise(a.name) || {}).group === 'core') - ((findExercise(b.name) || {}).group === 'core'));   /* ABB-01: nei punti deboli il core resta in fondo */
    /* allungamento dove e provato (le varianti restano in scheda se non disponibili) */
    base.forEach(e => {
      const sc = scambiAllungamento().find(x => senzaEmoji(e.name) === x[0]);
      if (!sc) return;
      const alt = nomeInLibreria(sc[1]);
      if (alt && consentito(alt, prefs) && !base.some(y => y.name === alt)) { e.name = alt; e.weight = (findExercise(alt) || {}).weight || e.weight; }
    });
    /* ABB-01: fondamentale, poi macchine, poi isolamenti, il core in fondo (i metodi famosi hanno il loro ordine) */
    if (!metodoAttivo) strOrdina(base, tplId, prefs.priorita);
    schienaPrima = { idx: indiciGiorni[i], pesa: schienaQui };

    const seduta = {
      giorno: DAYS[indiciGiorni[i]],
      tipo: tplId,
      titolo: tplId === 'punti' ? 'Punti deboli' : (tpl ? tpl.title.split(' — ')[0] : 'Seduta ' + (i + 1)) + (tipoGiorno ? ' ' + tipoGiorno : ''),
      esercizi: base
    };
    L.tipiGiorno[i] = tipoGiorno;
    costruite.push({ giorno: seduta.giorno, esercizi: prescriviSeduta(brief, base, tipoGiorno) });   /* le serie previste: le 48 ore dei riempimenti leggono quelle delle sedute precedenti */
    return seduta;
  });
  L.senzaSbarra = senzaSbarra;
  L.pulloverMesso = pulloverMesso;
  L.senzaSbarraSerieInPiu = senzaSbarraSerieInPiu;
  return sedute;
}
