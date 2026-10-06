/* Fasi registrate: le catene dei carichi senza wrapper (REG, W1-T3)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   FASI REGISTRATE
   Quattro funzioni del coach hanno piu di una regola che ci mette le mani: caricoProssimo, applicaCaricoProgressivo,
   applicaProntezza e imparaDallaSeduta. Prima ogni regola le AVVOLGEVA (const _prima = window.f; window.f = function...) e
   l'ordine delle regole era l'ordine degli script in index.html, scritto da nessuna parte. Ora ogni regola REGISTRA una fase
   con un ORDINE SCRITTO (un numero): registraFase(punto, ordine, codice, fn). Nessun file riassegna piu una funzione di un altro file.

   Una fase e una funzione fn(valore, contesto) che riceve il risultato delle fasi prima (lo stesso oggetto, che puo modificare) e
   il contesto della chiamata. Se restituisce qualcosa (non undefined) quello diventa il valore per le fasi dopo; se non restituisce
   niente il valore resta com e. eseguiFasi(punto, valore, contesto) le esegue in ordine e restituisce il valore finale.
   Due fasi dello stesso punto non possono avere lo stesso ordine (sarebbe di nuovo l ordine degli script). Tra gli ordini lasciare
   dei vuoti (10, 20, 50...): una regola nuova si inserisce senza toccare le altre.

   I punti, gli ordini e chi li possiede (piano B.3; i numeri senza «ora» sono fasi di onde future):
     'carico'     caricoProssimo(nome, base, repsTarget, setsBase), contesto { nome, base, repsTarget, setsBase }; il valore e { weight, reps, sets, tipo, motivo, ... }
        10 BIL  ora: modello di progressione (caricoProssimoBase, regole-ricerca.js: CAR-01..17, ALG-02, AUT-01)
        15 BIL  ora: calibrazione rapida (CAR-18/19, carichi/calibrazione.js)
        20 BIL  ora: ricalcolo dal massimale (ALG-05, regole-ricerca.js: solo programmi v2)
        30 SEN  ora: scarico del programma v2 e verifica del principiante, dose unica (MES-05, PRN-03, sicurezza/scarico.js)
        40 DOS  ora: rampa del volume in seduta (MES-03, volume/rampa-settimana.js: solo programmi v2); il volume autoregolato (PCO-03) non c e
        50 AGG  ora: aggiusti del questionario (DEC/DOL, CAR-10 con la dose unica nei v2, ALG-02) e frase del RIR (dolore-mattina.js)
        60 RIC  ora: RIC-05 rientro, RIC-01 serie in piu, RIC-02 pausa (regole-nuove.js)
        70 INT  ora: INT-04 prima volta, non si somma alla rampa (intensita.js)
        90 SEN  tetti della Sentinella (dentro i carichi: non e una fase)
        95 BIL  ora: griglia dei pesi dell attrezzo e tetto dei manubri dichiarati (ALG-06, CAS-01b, carichi/attrezzi.js): puo solo abbassare
        99 REG  ora: perche -> motivo (regia/perche.js)
     'apertura'   applicaCaricoProgressivo(day), contesto { giorno }; il valore e il numero di esercizi cambiati
        10 BIL  ora: carichi per esercizio e scelta dell esercizio da tarare (regole-ricerca.js, CAR-14 in carichi/taratura.js)
        20 RIC-04  ora: al massimo una tecnica al cedimento (regole-nuove.js)
     'prontezza'  applicaProntezza(risposte), contesto { risposte }; il valore e il punteggio
        10 PRZ  ora: prontezza prima della seduta (prontezza.js)
        20 RIC-04  ora: tecniche al cedimento con prontezza bassa (regole-nuove.js)
     'dopoSeduta' imparaDallaSeduta(lista), contesto { lista }; non restituisce niente
        10 STA  ora: stalli (regole-ricerca.js)
        20 CAR-14  ora: taratura del RIR (carichi/taratura.js)
        30 INT-05  ora: bilancio delle prime due sedute (intensita.js)
   ============================================================ */
const FASI_PUNTI = {};    /* punto -> elenco di { ordine, codice, fn }, sempre in ordine */

function registraFase(punto, ordine, codice, fn) {
  if (typeof punto !== 'string' || !punto) throw new TypeError('registraFase: manca il punto');
  if (typeof ordine !== 'number' || !isFinite(ordine)) throw new TypeError('registraFase ' + punto + ' ' + codice + ': l ordine deve essere un numero');
  if (typeof codice !== 'string' || !codice) throw new TypeError('registraFase ' + punto + ': manca il codice');
  if (typeof fn !== 'function') throw new TypeError('registraFase ' + punto + ' ' + codice + ': fn deve essere una funzione');
  const lista = FASI_PUNTI[punto] || (FASI_PUNTI[punto] = []);
  const stesso = lista.find(f => f.ordine === ordine);
  if (stesso) throw new Error('registraFase ' + punto + ': l ordine ' + ordine + ' e gia di ' + stesso.codice + ' (non puo essere anche di ' + codice + ')');
  lista.push({ ordine: ordine, codice: codice, fn: fn });
  lista.sort((a, b) => a.ordine - b.ordine);
}

/* le fasi di un punto, in ordine: [{ ordine, codice }]; senza argomento tutti i punti: { punto: [...] } */
function fasiRegistrate(punto) {
  const vista = lista => lista.map(f => ({ ordine: f.ordine, codice: f.codice }));
  if (punto !== undefined) return vista(FASI_PUNTI[punto] || []);
  const tutte = {};
  Object.keys(FASI_PUNTI).forEach(p => { tutte[p] = vista(FASI_PUNTI[p]); });
  return tutte;
}

/* esegue le fasi del punto in ordine; ognuna riceve (valore, contesto) e se restituisce qualcosa quello e il nuovo valore */
function eseguiFasi(punto, valore, contesto) {
  let v = valore;
  (FASI_PUNTI[punto] || []).slice().forEach(f => {
    const out = f.fn(v, contesto);
    if (out !== undefined) v = out;
  });
  return v;
}
