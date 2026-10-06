/* Memoria di una chiamata: tabelle di appoggio che vivono solo mentre il generatore lavora (velocità di buildProgram, INT-2b)
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   MEMORIA DI UNA CHIAMATA
   Il generatore (buildProgram) chiama decine di migliaia di volte funzioni che dipendono solo dal nome di un esercizio o da un dato
   che durante la chiamata non cambia: findExercise, senzaEmoji, dettaglioEsercizio, schemaDi, strChiave, creditoSerie, tipoCarico,
   consentito (con le stesse preferenze), regolaAttiva. Misurato su 200 profili (INT-2b): circa un quinto del tempo erano queste
   ricerche ripetute (espressioni regolari sul nome, scansioni della libreria).
   Qui non c e nessuno stato globale che possa invecchiare: la memoria si APRE all inizio di buildProgram (memoriaApri) e si CHIUDE
   alla fine, anche con un errore (memoriaChiudi, in un finally); fuori dal generatore memoriaTabella(spazio) ritorna null e le funzioni
   calcolano come sempre. Le chiamate annidate si contano: chiude solo l ultima. Ogni spazio e una Map a se (chiave -> valore).
   Una funzione che si appoggia alla memoria deve dipendere SOLO dalla chiave (e da dati che la chiamata non cambia): non e il posto
   di una funzione che legge le serie o i pesi di una seduta.
   ============================================================ */
let _memoriaChiamata = null, _memoriaProfondita = 0;
function memoriaApri() { if (_memoriaProfondita++ === 0) _memoriaChiamata = {}; }
function memoriaChiudi() { if (_memoriaProfondita > 0 && --_memoriaProfondita === 0) _memoriaChiamata = null; }
/* la Map di uno spazio (creata al primo uso), o null se la memoria e chiusa */
function memoriaTabella(spazio) {
  if (_memoriaChiamata === null) return null;
  return _memoriaChiamata[spazio] || (_memoriaChiamata[spazio] = new Map());
}
