/* Specialista Forza: il giorno leggero è leggero (FRZ-11)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   I CARICHI DEI GIORNI MEDI E LEGGERI (P3-C, piano coach v2 W3-T6, versione snella; numeri in specialita/soglie-forza-carichi.js)
   Il carico segue il nome dell'esercizio (e il suo bersaglio di ripetizioni, ALG-05): la stessa alzata in tre giorni (pesante 4x3, media 3x5, leggera 2x5, FRZ-05) ha una storia per giorno
   solo se i nomi sono diversi (le varianti di FRZ-03). Ogni storia sale con la sua regola dalla sua stima di partenza: la panca con pausa del giorno medio e la panca inclinata del giorno
   leggero arrivavano allo stesso peso (37,5 kg e 37,5 kg: il leggero non era leggero), e con lo stesso nome e lo stesso bersaglio nei due giorni (FRZ-03 spenta) il giorno leggero ripartiva
   dal carico del medio più un incremento.
   FRZ-11, fase 25 della catena 'carico' (regia/fasi.js: dopo il ricalcolo dal massimale 20, prima dello scarico 30): per una voce del piano con `alzata` e `onda` (c.voce, contratto di
   caricoProssimo in regole-ricerca.js) il giorno medio sta sotto il pesante e il leggero sotto il medio della stessa settimana, in percentuale del massimale stimato dell'alzata:
     - il riferimento è il carico che il giorno immediatamente più pesante ha IN QUELLA SETTIMANA: se l'ha già fatto, quello della seduta (carico di lavoro, ALG-02); se no, la proposta della catena
       fino a questa fase (fasi 10, 15, 20) per quella voce, già col suo tetto (leggero -> medio -> pesante);
     - il massimale stimato è e1rm(carico del riferimento, le sue ripetizioni, le sue ripetizioni in riserva) e il tetto del giorno è caricoPer(massimale, ripetizioni del giorno, riserva del giorno):
       la riserva del giorno è quella della settimana (rirBersaglio) e, per il leggero, due ripetizioni in più; mai meno di una (RPE 9: mai sopra la capacità);
     - il tetto sta sulla griglia dell'attrezzo per difetto e almeno un passo sotto il riferimento (l'ordine non si perde con l'arrotondamento).
   È SOLO UN TETTO sulla proposta della progressione (min): non alza mai un carico, quindi una variante più debole (panca inclinata) resta dove la porta la sua storia. Unica eccezione, il caso
   in cui due giorni hanno lo stesso nome e lo stesso bersaglio (stessa storia nello storico: il carico dell'uno diventerebbe quello dell'altro più un incremento): lì il carico del giorno è il
   tetto (derivato dal pesante, che ha il suo bersaglio e la sua storia), salvo un carico di ritorno (tipo «giu»: mancato, rientro) che resta quello della progressione.
   Vale anche nello scarico (6 e 12): l'ordine pesante > media > leggera è di ogni settimana. Le ripetizioni e le serie sono quelle della progressione di sempre.
   Regola spegnibile, con il consenso, solo per i programmi v2 con la modalità Forza (voci con `fisso`, `alzata` e `onda`): un programma di forza generale non ha onde e non cambia di un grammo.
   Cosa non fa (oltre la v2): nessuna prescrizione a percentuali di un massimale di lavoro, nessun tetto di RPE per settimana, nessuna serie di appoggio e nessun test del massimale: il massimale
   serve solo a mettere in ordine i tre giorni.
   ORDINE DI CARICAMENTO: dopo regia/fasi.js (registraFase), regole-ricerca.js (caricoProgressione), carichi/e1rm.js, carichi/attrezzi.js e specialita/forza.js; dopo soglie-forza-carichi.js.
   ============================================================ */

function sogliaForzaCarichi(nome) { return SOGLIE_FORZA_CARICHI[nome].v; }

/* le onde di c.voce: forza.js le scrive 'pesante' | 'media' | 'leggera' (FRZ-05); il contratto di caricoProssimo dice anche 'medio' e 'leggero' */
const FORZA_RANGO_ONDA = { pesante: 0, media: 1, medio: 1, leggera: 2, leggero: 2 };
/* le frasi del motivo: senza «: » e senza «, » (si tradurrebbero a pezzi), il numero diventa # nei dizionari */
const FORZA_FRASI_GIORNO = {
  media: pct => 'Il giorno medio resta sotto il pesante a circa ' + pct + '% del massimale stimato dell’alzata',
  leggera: pct => 'Il giorno leggero resta sotto gli altri giorni a circa ' + pct + '% del massimale stimato dell’alzata'
};

/* il rango dell'onda di una voce della modalità Forza (0 pesante, 1 media, 2 leggera), o null se la voce non è un'alzata con onda */
function forzaRango(v) {
  return v && v.fisso && v.alzata && FORZA_RANGO_ONDA[v.onda] !== undefined ? FORZA_RANGO_ONDA[v.onda] : null;
}
function forzaBaseReps(v) { const b = Number(v && v.repsBase); return b > 0 ? b : (Number(v && v.reps) || 0); }
/* la riserva del PIANO della settimana (rirBersaglioBase: la tabella del mesociclo, senza i rialzi del momento: la ripresa dopo lo scarico, il BIA, il carattere: quelli stanno nella progressione e
   scendere o salire con la seduta). Con la stessa riserva per i tre giorni il rapporto tra i loro carichi dipende solo da ripetizioni e giorno, non da cosa e successo a una sola voce */
const forzaRirMedio = nome => { const r = rirBersaglioBase(nome); return (Number(r[0]) + Number(r[1])) / 2; };

/* le esposizioni di un'alzata nel piano: [{ giorno, voce, rango }], dal piano salvato (loadData) */
function forzaEsposizioni(alzata) {
  const out = [], data = loadData();
  Object.keys(data).forEach(g => (data[g] || []).forEach(voce => {
    const k = forzaRango(voce);
    if (k !== null && voce.alzata === alzata) out.push({ giorno: g, voce: voce, rango: k });
  }));
  return out;
}

/* la catena 'carico' fino a una fase (esclusa): il carico che una voce avrebbe prima del tetto di FRZ-11 (fasi 10, 15, 20) */
function forzaCatenaFinoA(c, ordine) {
  let r;
  (FASI_PUNTI.carico || []).slice().forEach(f => { if (f.ordine >= ordine) return; const o = f.fn(r, c); if (o !== undefined) r = o; });
  return r;
}

/* il carico di un'esposizione in questa settimana del programma: quello della seduta se l'ha già fatta (stesso giorno, stessa settimana: ALG-02, il carico di lavoro), se no la proposta
   della catena per quella voce, già col tetto del suo giorno (prof: quanti salti dal giorno di partenza) */
function forzaPesoEsposizione(e, prof) {
  const v = e.voce, sett = settimanaProgramma();
  if (sett && sett.numero) {
    const h = loadHistory().find(x => x.sessione && !x.interrotta && x.day === e.giorno && x.settimana && Number(x.settimana.numero) === Number(sett.numero) && x.sessione.some(s => s.name === v.name));
    const ex = h && h.sessione.find(s => s.name === v.name);
    const fatto = ex ? caricoDiLavoro(ex) : 0;
    if (fatto > 0) return fatto;
  }
  const c = { nome: v.name, base: Number(v.weight) || 0, repsTarget: forzaBaseReps(v), setsBase: Number(v.setsBase) || Number(v.sets) || 3, voce: v };
  const r = forzaTetto(forzaCatenaFinoA(c, 25), c, prof);
  return r && Number(r.weight) > 0 ? Number(r.weight) : 0;
}

/* FRZ-11: il tetto del giorno medio o leggero (la fase 25: ritorna lo stesso oggetto, col carico abbassato se serve) */
function forzaTetto(r, c, prof) {
  const v = c.voce, rango = forzaRango(v);
  if (!r || rango === null || rango === 0 || !(Number(r.weight) > 0) || isTimeBased(c.nome)) return r;
  if ((prof || 0) >= sogliaForzaCarichi('profonditaMax')) return r;
  const esp = forzaEsposizioni(v.alzata), piu = esp.filter(e => e.rango < rango);
  if (!piu.length) return r;                                                      /* nessun giorno più pesante nel piano (uscito per i minuti): niente da confrontare */
  const rangoRif = Math.max.apply(null, piu.map(e => e.rango));
  const rif = piu.filter(e => e.rango === rangoRif).map(e => ({ e: e, w: forzaPesoEsposizione(e, (prof || 0) + 1) })).filter(x => x.w > 0).sort((a, b) => a.w - b.w)[0];
  if (!rif) return r;
  /* il massimale stimato dell'alzata dal giorno di riferimento, e il carico che permette per le ripetizioni e la riserva di questo giorno (mai meno di una in riserva: RPE 9) */
  const minimo = sogliaForzaCarichi('rirMinimoGiorno');
  const rirRif = Math.max(minimo, forzaRirMedio(rif.e.voce.name));
  const rirOggi = Math.max(minimo, forzaRirMedio(c.nome) + (rango === 2 ? sogliaForzaCarichi('rirInPiuLeggera') : 0));
  const E = e1rm(rif.w, forzaBaseReps(rif.e.voce), rirRif);
  const repsOggi = Number(c.repsTarget) > 0 ? Number(c.repsTarget) : forzaBaseReps(v);
  if (!(E > 0) || !(repsOggi > 0)) return r;
  const giu = kg => grigliaAttiva() ? arrotondaAttrezzo(kg, c.nome, { modo: 'giu' }) : Math.floor(kg * 2) / 2;
  let sotto = rif.w;
  for (let i = 0; i < sogliaForzaCarichi('passiSotto'); i++) sotto = giu(sotto - 1e-6);   /* almeno tanti passi della griglia sotto il giorno più pesante */
  const tetto = Math.min(giu(caricoPer(E, repsOggi, rirOggi)), sotto);
  if (!(tetto > 0)) return r;
  /* lo stesso nome e lo stesso bersaglio in un altro giorno non pesante: la storia nello storico è una sola, il carico del giorno si deriva dal pesante */
  const stessaStoria = esp.filter(e => e.rango > 0 && e.voce.name === v.name && forzaBaseReps(e.voce) === forzaBaseReps(v)).length >= 2;
  const w = stessaStoria && r.tipo !== 'giu' ? tetto : Math.min(Number(r.weight), tetto);
  if (Math.abs(w - Number(r.weight)) < 1e-9) return r;                               /* il carico della progressione era già sotto il tetto: non si tocca niente */
  r.weight = w;
  const pct = Math.round(100 * w / E), frase = FORZA_FRASI_GIORNO[rango === 2 ? 'leggera' : 'media'](pct);
  if (r.tipo !== 'scarico') {
    const ult = typeof pesoUltimoDi === 'function' ? pesoUltimoDi(c.nome) : null;
    if (ult) r.tipo = w > ult.weight + 1e-9 ? 'su' : (w < ult.weight - 1e-9 ? 'giu' : 'fermo');
    r.motivo = [frase].concat(String(r.motivo || '').split(' • ').slice(1)).join(' • ');   /* il primo pezzo diceva «+2,5 kg» di un carico che non è più questo; nello scarico il motivo lo riscrive MES-05 */
  }
  aggiungiPerche(r, 'FRZ-11', frase, { forza: 'Convenzione', valore: pct });
  return r;
}

/* la fase: solo con il consenso, i programmi v2 e la regola accesa */
function forzaCaricoGiorno(r, c) {
  if (!coachAttivo() || !progressioneV2() || !regolaAttiva('FRZ-11')) return r;
  return forzaTetto(r, c, 0);
}
if (typeof registraFase === 'function') registraFase('carico', 25, 'FRZ-11', forzaCaricoGiorno);
