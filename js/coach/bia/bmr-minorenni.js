/* Metabolismo basale ai minorenni
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ETA-04 (decisione del proprietario, D-P26): il metabolismo basale in kcal (bmr, misura della BIA inserita dall utente) non si mostra
   ai minorenni: ne nel passo BIA dell onboarding, ne nel risultato, ne in Opzioni › BIA, con o senza coach.
   Minorenne = eta sopra 0 e sotto i 18 (PARAM_ETA.maggiorenne), come in esigenza.js; eta 0 o non detta = adulto (convenzione del repo).
   Cambia solo cio che si mostra: il dato salvato e analyzeBia non cambiano. */
function bmrNascostoPerEta(eta) {
  return Number(eta) > 0 && Number(eta) < PARAM_ETA.maggiorenne;
}
