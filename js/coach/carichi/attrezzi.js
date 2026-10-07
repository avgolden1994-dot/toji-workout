/* Griglia dei pesi per attrezzo e manubrio più pesante dichiarato nella progressione (ALG-06, CAS-01)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   GRIGLIA DEI PESI E TETTO DEI MANUBRI (coach v2, P3-A «Bilancia essenziale»: una parte di W3-T1; B17 del piano, U7 della nota algoritmi)
   ALG-06: un carico proposto si carica davvero. Prima la progressione arrotondava a 0,5 kg per qualunque attrezzo (61,5 kg di bilanciere, manubri da
   13 o 16,5 kg); la partenza (PAR-04) usava gia la griglia giusta. Ora la griglia e una sola: arrotondaAttrezzo riusa arrotondaPartenza (partenza.js) e
   passoAttrezzo legge i passi di SOGLIE_PROGRESSIONE.grigliaBase, gli stessi di passoCarico (la prova tests/bilancia-v2.test.js le confronta).
   E la griglia DI BASE (manubri a passi di 1 kg sotto i 10 kg e di 2 kg da 10 kg, macchine e cavi a 2,5 kg, bilanciere a 2,5 kg = 1,25 kg per lato, mai sotto la barra):
   non quella della palestra di ognuno (manubri da 2,5 kg, pile da 5 kg, microdischi): le impostazioni «Pesi della tua palestra» sono rimandate.
   CAS-01b: il manubrio piu pesante dichiarato a casa (manubriKg, CAS-01 di W2-T5: contestoCarichi) era il tetto solo della partenza; ora vale anche per la progressione:
   mai un carico proposto sopra il tetto (il tetto stesso e un peso vero, anche fuori dai passi: 12,5 kg); arrivati al tetto si sale con le ripetizioni fino al bersaglio
   + cimaRipetizioniTetto, poi il coach lo dice (serve un manubrio piu pesante o una variante piu difficile).
   Fase 95 della catena 'carico' (regia/fasi.js): dopo i tetti della Sentinella (90) e prima dei perche (99). Puo solo ABBASSARE il carico (o lasciarlo: sotto la
   barra vuota non lo alza, dice che il bilanciere pesa 20 kg): riporta in
   griglia, per difetto, i carichi delle fasi che arrotondano ancora a 0,5 kg (aggiusti del questionario, fase 50 di dolore-mattina.js) e applica il tetto dei manubri
   anche al salto della calibrazione (CAR-18, fase 15) e all «extra» degli aggiusti. caricoProssimoBase (fase 10) usa gia la griglia (caricoSalito, caricoSceso, regole-ricerca.js).
   Fuori dalla catena 'carico' restano da portare sulla griglia la prontezza (prontezza.js, catena 'prontezza': x0,96 / x0,9) e gli aggiusti della fase 50: file di P3-B.
   ============================================================ */

/* una soglia di soglie-progressione.js (si legge solo a esecuzione) */
function sogliaProgressione(nome) { return SOGLIE_PROGRESSIONE[nome].v; }

/* la voce di libreria per un nome (o la voce stessa); un esercizio fuori libreria vale come voce senza peso di libreria */
function voceAttrezzo(attrezzo) {
  if (attrezzo && typeof attrezzo === 'object') return attrezzo;
  const nome = String(attrezzo || '');
  return findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '') || { name: nome, weight: 0 };
}

/* il passo della griglia di base vicino a un carico (ctx.kg; senza, il passo dei carichi piccoli): manubri e corpo libero 1 kg sotto la soglia e 2 kg da li,
   macchine e cavi il passo della pila, bilanciere 2,5 kg in tutto. attrezzo = nome dell esercizio o voce di libreria */
function passoAttrezzo(attrezzo, ctx) {
  const m = voceAttrezzo(attrezzo), g = sogliaProgressione('grigliaBase');
  const kg = Number(ctx && ctx.kg) || 0, att = attrezzoDi(m.name);
  if (att === 'manubri' || att === 'corpo') return kg < g.manubri.soglia ? g.manubri.passoSotto : g.manubri.passoSopra;
  return att === 'bilanciere' ? g.bilanciere.passo : g.pila;
}

/* il carico sulla griglia di base dell attrezzo: ctx.modo 'vicino' (default: il piu vicino, come la partenza), 'giu' (per difetto) o 'su' (il primo peso della griglia
   da kg in su); mai sotto il minimo (barra vuota, 1 kg di manubrio). ctx.tetto (CAS-01b, manubri e «corpo» con carico): il manubrio piu pesante dichiarato e un peso vero e il massimo.
   0 o meno resta 0 (corpo libero) */
function arrotondaAttrezzo(kg, attrezzo, ctx) {
  const x = Number(kg) || 0;
  if (x <= 0) return 0;
  const o = ctx || {}, m = voceAttrezzo(attrezzo);
  const tetto = Number(o.tetto) > 0 && esercizioConManubri(m.name) ? Number(o.tetto) : 0;
  if (tetto && x >= tetto - 1e-9) return tetto;
  let w;
  if (o.modo === 'su') {
    w = arrotondaPartenza(m, x, 'giu');
    if (w < x - 1e-9) w = arrotondaPartenza(m, w + passoAttrezzo(m, { kg: w }));
  } else w = arrotondaPartenza(m, x, o.modo === 'giu' ? 'giu' : undefined);
  return tetto ? Math.min(w, tetto) : w;
}

/* CAS-01b: l esercizio si fa con i manubri in mano: «manubri» e anche «corpo» (con un carico: Affondi Bulgari, Inversi, in Camminata, Step-up, Russian Twist, Kettlebell Swing),
   come in passoAttrezzo. Revisione di 3a (M2): il tetto non valeva per questi e con manubri fino a 20 kg gli Affondi Bulgari salivano a 24 kg. Un carico c e solo se il peso e > 0 (chi chiama) */
function esercizioConManubri(nome) { const a = attrezzoDi(nome); return a === 'manubri' || a === 'corpo'; }

/* CAS-01b: il manubrio piu pesante dichiarato per questo esercizio (0 se non e con i manubri, se non c e la dichiarazione o se CAS-01 e spenta: contestoCarichi) */
function tettoManubriDi(nome) {
  if (!esercizioConManubri(nome)) return 0;
  const cc = contestoCarichi({}, getProfile() || {});
  return cc.manubriKg > 0 ? cc.manubriKg : 0;
}

/* frasi (una voce nei dizionari per ognuna; i numeri diventano #) */
const fmtPeso = x => String(Math.round(x * 100) / 100);
const fraseGrigliaPiuVicino = kg => 'con questo attrezzo il peso più vicino è ' + fmtPeso(kg) + ' kg';
const fraseTettoRipetizioni = (kg, reps, cima) => 'Sei al manubrio più pesante che hai (' + fmtPeso(kg) + ' kg): una ripetizione in più (' + reps + ' su ' + cima + ')';
const fraseTettoCima = (kg, cima) => 'Sei al manubrio più pesante che hai (' + fmtPeso(kg) + ' kg) e alla cima delle ripetizioni (' + cima + '): per salire ancora serve un manubrio più pesante o una variante più difficile';
const fraseTettoSali = kg => 'Si sale fino al manubrio più pesante che hai (' + fmtPeso(kg) + ' kg)';
const fraseTettoNonOltre = kg => 'non oltre il manubrio più pesante che hai (' + fmtPeso(kg) + ' kg)';

/* CAS-01b: una proposta sopra il tetto dei manubri. Un aumento ('su'): gia al tetto nell ultima seduta, tutte le serie fatte -> una ripetizione in piu fino alla cima
   (bersaglio + cimaRipetizioniTetto), poi lo dice; ancora sotto -> fino al tetto. Gli altri tipi (scarico, rientro, prima volta su un piano vecchio): il tetto, con la nota.
   Il salto della calibrazione (CAR-18) non c e piu: il suo perche si toglie (direbbe un peso che non si propone). */
function alTettoDeiManubri(r, c, tetto) {
  r.weight = tetto;
  if (Array.isArray(r.perche)) r.perche = r.perche.filter(p => !p || p.codice !== 'CAR-18');
  if (r.tipo !== 'su') {
    const t = fraseTettoNonOltre(tetto);
    r.motivo = (r.motivo ? r.motivo + ' • ' : '') + t;
    aggiungiPerche(r, 'CAS-01', t, { forza: 'Convenzione' });
    return r;
  }
  const ex = ultimeSessioni(c.nome, 1)[0];
  const fatte = ex ? (ex.sets || []).filter(s => s.done) : [];
  const ult = fatte.length ? Math.max.apply(null, fatte.map(s => Number(s.weight) || 0)) : 0;
  const bersaglio = Number(c.repsTarget) || Number(r.reps) || 0;
  let testo;
  if (ult >= tetto - 1e-9 && fatte.length && fatte.length === ex.sets.length) {
    const fatteRip = Math.min.apply(null, fatte.map(s => Number(s.reps) || 0));
    const cima = bersaglio + sogliaProgressione('cimaRipetizioniTetto');
    const reps = Math.min(cima, Math.max(bersaglio, fatteRip + 1));
    if (reps > fatteRip) { r.reps = reps; r.tipo = 'su'; testo = fraseTettoRipetizioni(tetto, reps, cima); }
    else { r.reps = cima; r.tipo = 'fermo'; testo = fraseTettoCima(tetto, cima); }
  } else {
    r.reps = bersaglio || r.reps;
    r.tipo = tetto > ult + 1e-9 ? 'su' : 'fermo';
    testo = fraseTettoSali(tetto);
  }
  delete r.piuPausa;
  r.motivo = testo + (r.weight > 0 ? ' • ' + testoRir(c.nome) : '');
  aggiungiPerche(r, 'CAS-01', testo, { forza: 'Convenzione' });
  return r;
}

/* Fase 95 della catena 'carico': tetto dei manubri dichiarato (CAS-01b) e griglia dell attrezzo per difetto (ALG-06). Solo con il consenso; corpo libero e tempi no. */
function faseGrigliaETetto(r, c) {
  if (!r || !(Number(r.weight) > 0) || isTimeBased(c.nome) || !coachAttivo()) return r;
  const tetto = tettoManubriDi(c.nome);
  if (tetto > 0 && r.weight > tetto + 1e-9) return alTettoDeiManubri(r, c, tetto);
  if (!regolaAttiva('ALG-06')) return r;
  const w = arrotondaAttrezzo(r.weight, c.nome, { modo: 'giu', tetto: tetto });
  if (w > r.weight + 1e-9) {
    /* sotto il minimo dell attrezzo (un bilanciere sotto la barra vuota: dati vecchi o un tetto della Sentinella) questa fase non alza il carico: lo dice (PAR-08) */
    if (String(r.motivo || '').indexOf(NOTA_SENZA_BARRA) === -1) r.motivo = (r.motivo ? r.motivo + ' • ' : '') + NOTA_SENZA_BARRA;
    return r;
  }
  if (Math.abs(w - r.weight) > 1e-9) {
    r.weight = w;
    const t = fraseGrigliaPiuVicino(w);
    r.motivo = (r.motivo ? r.motivo + ' • ' : '') + t;
    aggiungiPerche(r, 'ALG-06', t, { forza: 'Convenzione' });
  }
  return r;
}
registraFase('carico', 95, 'ALG-06', faseGrigliaETetto);
