/* Massimale stimato e carico dal massimale (ALG-04, W1-T3)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   MASSIMALE STIMATO (e1RM) E CARICO DAL MASSIMALE
   Un solo posto per la formula di Epley: prima erano due, con tagli diversi (e1rmSerie nel coach, unoRM nella seduta).
   Il massimale stimato e un INDICE relativo dello stesso esercizio nel tempo, non un massimale da mostrare come verita: affidabile
   fino a circa 12 ripetizioni efficaci (ricerca-algoritmi-carichi-e-app.md 3.2-3.3, ricerca-forza-progressione.md 3.3 e 3.5).
   Con il RIR si usano le ripetizioni efficaci = fatte + in riserva: 80 kg x 8 con 2 in riserva = 106,7 kg (101,3 kg senza il RIR).
   W1-T3 sposta qui e1rmSerie e e1rmSeduta (NESSUN cambiamento di numeri: servono alle analisi CAR-08, STA, CIC, partenza) e
   e1rm sostituisce unoRM della seduta (stessi numeri con il RIR a 0); la scelta del carico dall RPE (caricoPer) e di W3-T1.
   ============================================================ */

/* e1rm(peso, ripetizioni, rir): massimale stimato con Epley, arrotondato a 0,1 kg; 0 se manca il peso o le ripetizioni;
   rir (ripetizioni in riserva, 0 se non si sa) si somma alle ripetizioni; oltre 12 ripetizioni efficaci si calcola come a 12;
   a 1 ripetizione efficace il massimale e il peso stesso */
function e1rm(peso, reps, rir) {
  peso = Number(peso) || 0; reps = Number(reps) || 0; rir = Number(rir) || 0;
  if (peso <= 0 || reps <= 0) return 0;
  const eff = reps + Math.max(0, rir);
  if (eff === 1) return peso;
  return Math.round(peso * (1 + Math.min(eff, 12) / 30) * 10) / 10;
}

/* caricoPer(e1rmKg, ripetizioni, rir): il carico che con quel massimale permette `ripetizioni` con `rir` in riserva (Epley al contrario),
   arrotondato a 0,1 kg; 0 se manca il massimale. Non taglia le ripetizioni efficaci a 12 come e1rm (che lo fa per restare uguale a unoRM): 12 ripetizioni
   con 2 in riserva sono 14 e dal massimale di 123,3 kg danno 84,1 kg, non 88. Il passo dell attrezzo, il tetto del salto e l arrotondamento al disco sono di W3-T1 */
function caricoPer(e1rmKg, reps, rir) {
  e1rmKg = Number(e1rmKg) || 0; reps = Number(reps) || 0; rir = Number(rir) || 0;
  if (e1rmKg <= 0 || reps <= 0) return 0;
  const eff = reps + Math.max(0, rir);
  if (eff <= 1) return e1rmKg;
  return Math.round(e1rmKg / (1 + eff / 30) * 10) / 10;
}

/* massimale stimato (Epley) di una serie dello storico, solo da serie fino a 12 ripetizioni (0 altrimenti); non arrotondato: serve ai
   confronti tra sedute (CAR-08, repertorio, partenza) */
function e1rmSerie(x) { const w = Number(x.weight) || 0, r = Number(x.reps) || 0; if (!w || !r || r > 12) return 0; return w * (1 + r / 30); }
function e1rmSeduta(ex) { const v = (ex.sets || []).filter(x => x.done).map(e1rmSerie); return v.length ? Math.max.apply(null, v) : 0; }
