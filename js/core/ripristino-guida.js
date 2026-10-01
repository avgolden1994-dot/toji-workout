/* Ripristino dei dati veri se la guida viene interrotta
   (3in, parte di core; ordine di caricamento: vedi index.html) */

/* ============================================================
   GUIDA: RIPRISTINO DEI DATI VERI
   La guida di prova riempie l app con dati di esempio e tiene da parte
   una copia di quelli veri (tz_guida_backup). Se l app viene chiusa,
   ricaricata o uccisa dal telefono a meta guida, la copia resta: qui,
   prima che l app legga qualsiasi dato, i dati veri tornano al loro posto.
   ============================================================ */
const GUIDA_BACKUP = 'tz_guida_backup';
function guidaApplicaFoto(foto) {
  const tieni = ['tz_guida_vista', 'tz_theme', 'tz_lingua'];   /* restano come sono ora */
  Object.keys(foto).forEach(k => {
    if (k === GUIDA_BACKUP) return;
    if (tieni.indexOf(k) !== -1 && localStorage.getItem(k) !== null) return;
    try { localStorage.setItem(k, foto[k]); } catch (e) {}
  });
  const via = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k !== GUIDA_BACKUP && tieni.indexOf(k) === -1 && !Object.prototype.hasOwnProperty.call(foto, k)) via.push(k);
  }
  via.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
  try { localStorage.removeItem(GUIDA_BACKUP); } catch (e) {}
}
(function guidaRecuperaInterrotta() {
  try {
    const b = localStorage.getItem(GUIDA_BACKUP);
    if (b === null) return;
    const foto = JSON.parse(b);
    if (foto && typeof foto === 'object') guidaApplicaFoto(foto);
    else localStorage.removeItem(GUIDA_BACKUP);
  } catch (e) { try { localStorage.removeItem(GUIDA_BACKUP); } catch (e2) {} }
})();
