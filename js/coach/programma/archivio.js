/* Programma e BIA salvati
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ---- Salvataggi del coach ---- */
const progKey = () => 'coach_plus_programma_' + currentMode;
const biaKey = () => 'coach_plus_bia_' + currentMode;
window.getProgramma = function() { try { return JSON.parse(localStorage.getItem(progKey()) || 'null'); } catch (e) { return null; } };
window.getBiaStorico = function() { try { return JSON.parse(localStorage.getItem(biaKey()) || '[]'); } catch (e) { return []; } };
window.aggiungiBia = function(valori, quando, opzioni) {
  const data = quando || valori.data || ymd(new Date());
  const storico = getBiaStorico();
  /* la fusione solo se chi chiama la chiede ({ unisci: true }): il referto letto (salvaBiaLetta, il questionario con la BIA letta).
     Senza, la voce della data si riscrive com era: il form a mano e autorevole, un campo vuoto si toglie */
  const gia = (opzioni && opzioni.unisci) ? ((storico.find(x => x.data === data) || {}).valori || {}) : {};
  /* con la fusione, un campo che il nuovo valore non riporta (null o assente) lascia quello gia salvato per la stessa data: un referto senza bmr non azzera il bmr */
  const unito = {};
  ['peso', 'altezza', 'fmPerc', 'fm', 'ffm', 'smm', 'tbw', 'bmr', 'bmi', 'phase', 'ecw', 'proteine', 'minerali', 'viscerale']
    .forEach(k => {
      const v = (valori[k] !== undefined && valori[k] !== null) ? valori[k] : gia[k];
      if (v !== undefined && v !== null) unito[k] = v;
    });
  /* una misura per data: ricaricando lo stesso referto non si duplica */
  const st = storico.filter(x => x.data !== data);
  st.push({ data: data, valori: unito });
  st.sort((a, b) => a.data < b.data ? -1 : 1);
  localStorage.setItem(biaKey(), JSON.stringify(st));
};
