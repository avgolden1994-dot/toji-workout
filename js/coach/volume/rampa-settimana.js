/* Rampa del volume in seduta: le serie seguono il piano della settimana (MES-03)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   RAMPA IN SEDUTA (piano coach v2, P3-B = W3-T4 snello; solo programmi con prog.versione 2)
   Il piano del mesociclo (prog.piano, programma/mesociclo.js) scrive per ogni settimana il fattore di volume (w.volume: la rampa di MES-03) e, per chi
   comincia, le serie per esercizio (w.serie: 2/2, 3/2, 3/3). Prima di P3-B la seduta leggeva del piano solo il RIR e le tecniche: nessuna funzione leggeva
   w.volume e w.serie, e ogni seduta aveva le serie del picco. Questa è la fase 40 «DOS» della catena 'carico' (regia/fasi.js): sopra la progressione
   (10 BIL) e lo scarico (30 MES-05) porta le serie dell’esercizio a quelle della settimana:
   - serie = max(2, round(picco × w.volume)), mai sopra il picco (il picco è `setsBase`, le serie del programma: quello che il generatore e il collaudo contano)
   - il principiante: le serie del piano (w.serie.multi sui primi tre esercizi della seduta, w.serie.altri sugli altri) finché w.volume < 1, poi il picco
   - nessuna rampa se il picco è 2 o meno; mai meno di 2 serie per esercizio (SOGLIE_RAMPA)
   - prudenti (over 65, PAR-Q positivo, minorenni) e settimane senza rampa: w.volume è 1, quindi niente cambia; un programma della v1 (senza piano) non cambia
   - lo scarico non è di questa fase (tipo 'scarico': lo guarda sicurezza/scarico.js, MES-05); il rientro dopo una pausa (RIC-05, fase 60) e INT-04 (fase 70) vengono dopo; il rientro
     toglie ancora, mai sotto 2; INT-04 non si somma alla rampa (INT-3a: se le serie sono già sotto il picco la «prima volta» non ne toglie altre)
   Cosa NON fa: il volume autoregolato (PCO-03: +1 o -1 serie per unità secondo prontezza e dolenzia) e il +1 ai muscoli prioritari dell’avanzato (w.prioritari: per ora lo fa RIC-01
   nella settimana centrale del blocco, fase 60). Il piano si esegue, non si autoregola. Il collaudo (VOL-01, VOL-02) misura la settimana piena, cioè il picco: non descrive le prime settimane.
   Motivo: ogni esercizio con meno serie del picco dice perché (aggiungiPerche con codice MES-03, sotto-coach dosatore). Spegnibile (regolaAttiva('MES-03')), dietro coachAttivo().
   ============================================================ */

/* una soglia di soglie-rampa.js (undefined se il file non c è); le soglie si leggono solo durante l’esecuzione */
function sogliaRampa(nome) {
  return typeof SOGLIE_RAMPA !== 'undefined' && SOGLIE_RAMPA[nome] ? SOGLIE_RAMPA[nome].v : undefined;
}

/* la posizione (0, 1, 2…) dell’esercizio nella seduta del piano salvato; null se non c’è. Se sta in più giorni vale la posizione più alta in classifica (la più bassa) */
function posizioneNelPiano(nome) {
  let pos = null;
  const data = loadData();
  DAYS.forEach(g => (data[g] || []).forEach((e, i) => { if (e && e.name === nome && (pos === null || i < pos)) pos = i; }));
  return pos;
}

/* le serie della settimana per un esercizio con `picco` serie; `pos` = posizione nella seduta (null = non si sa: conta la classe) */
function serieDellaSettimana(w, picco, nome, pos) {
  const min = sogliaRampa('serieMinime');
  if (!(min > 0) || picco <= min) return picco;                                   /* nessuna rampa se il picco è già al minimo */
  let n;
  if (w.serie && w.volume < 1) {
    const multi = pos !== null ? pos < sogliaRampa('principianteMulti') : ['A', 'B', 'C'].indexOf(classeRirDi(nome)) !== -1;
    n = multi ? w.serie.multi : w.serie.altri;
  } else n = Math.round(picco * w.volume);
  return Math.min(picco, Math.max(min, n));
}

/* fase 40 DOS della catena 'carico' (regia/fasi.js): MES-03, la rampa del piano in seduta */
function rampaAlCarico(r, c) {
  if (!r || r.tipo === 'scarico' || !regolaAttiva('MES-03')) return r;
  if (typeof coachAttivo === 'function' && !coachAttivo()) return r;
  const p = typeof programmaConPiano === 'function' ? programmaConPiano() : null;
  if (!p) return r;                                                                /* programma della v1: niente piano, niente rampa */
  const sett = settimanaProgramma();
  if (!sett || sett.finito || sett.fase === 'scarico' || !(sett.numero >= 1)) return r;
  const w = p.piano.settimane[sett.numero - 1];
  if (!w || !(w.volume > 0) || w.volume > 1) return r;
  const picco = Number(c.setsBase) || r.sets;
  if (!(r.sets > 0) || r.sets > picco) return r;                                   /* un altra fase ha gia cambiato le serie: non si tocca */
  const pos = w.serie && w.volume < 1 ? posizioneNelPiano(c.nome) : null;
  const n = serieDellaSettimana(w, picco, c.nome, pos);
  if (n >= r.sets) return r;
  r.sets = n;
  const blocco = p.piano.struttura && p.piano.struttura.blocco ? p.piano.struttura.blocco - 1 : 0;
  const testo = w.serie
    ? 'prime settimane: ' + n + ' serie invece di ' + picco + ', il volume sale piano fino a quello pieno'
    : 'settimana ' + w.sett + ' di ' + blocco + ' del blocco: ' + n + ' serie invece di ' + picco + ', il volume sale piano fino a quello pieno';
  aggiungiPerche(r, 'MES-03', testo, { forza: 'Convenzione', valore: n });
  return r;
}
registraFase('carico', 40, 'MES-03', rampaAlCarico);

/* Le serie che il piano prescrive QUESTA settimana per un esercizio con `picco` serie: la rampa di MES-03 nelle settimane di carico, la dose di MES-05 in quelle di scarico; il picco
   se non c e piano (programma v1), consenso o regola. Non guarda lo storico (RIC-05, INT-04): e l obiettivo della settimana per la scheda Oggi (obiettiviSettimana), che non deve
   cambiare mentre la settimana passa (lo stesso numero che la fase 40 e la fase 30 danno in seduta quando nessuna fase dopo di loro toglie ancora). */
function serieDelPianoQuestaSettimana(nome, picco) {
  const n = Number(picco) || 0;
  if (!(n > 0) || typeof coachAttivo !== 'function' || !coachAttivo()) return n;
  const p = typeof programmaConPiano === 'function' ? programmaConPiano() : null;
  const sett = p ? settimanaProgramma() : null;
  const w = sett && !sett.finito && sett.numero >= 1 ? p.piano.settimane[sett.numero - 1] : null;
  if (!w) return n;
  if (sett.fase === 'scarico') return regolaAttiva('MES-05') && typeof serieDelloScarico === 'function' ? serieDelloScarico(w, sett, n) : n;
  if (!regolaAttiva('MES-03') || !(w.volume > 0) || w.volume > 1) return n;
  return serieDellaSettimana(w, n, nome, w.serie && w.volume < 1 ? posizioneNelPiano(nome) : null);
}
