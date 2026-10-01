/* Programma e BIA salvati
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ---- Salvataggi del coach ---- */
const progKey = () => 'coach_plus_programma_' + currentMode;
const biaKey = () => 'coach_plus_bia_' + currentMode;
window.getProgramma = function() { try { return JSON.parse(localStorage.getItem(progKey()) || 'null'); } catch (e) { return null; } };
window.getBiaStorico = function() { try { return JSON.parse(localStorage.getItem(biaKey()) || '[]'); } catch (e) { return []; } };
window.aggiungiBia = function(valori, quando) {
  const data = quando || valori.data || ymd(new Date());
  const pulito = {};
  ['peso', 'altezza', 'fmPerc', 'fm', 'ffm', 'smm', 'tbw', 'bmr', 'bmi', 'phase', 'ecw', 'proteine', 'minerali', 'viscerale']
    .forEach(k => { if (valori[k] !== undefined && valori[k] !== null) pulito[k] = valori[k]; });
  /* una misura per data: ricaricando lo stesso referto non si duplica */
  const st = getBiaStorico().filter(x => x.data !== data);
  st.push({ data: data, valori: pulito });
  st.sort((a, b) => a.data < b.data ? -1 : 1);
  localStorage.setItem(biaKey(), JSON.stringify(st));
};
