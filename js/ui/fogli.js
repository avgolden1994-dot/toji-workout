/* Fogli e scambio di file
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   FUNZIONI DA UN APP CONCORRENTE (solo idee, codice nostro)
   1 schermo acceso · 2 backup · 3 import CSV · 4 seduta passata e libera
   5 drop e rest-pause · 6 per lato e corpo libero · 7 timer di lavoro
   8 fatica e anno · 9 peso corporeo · 10 prossima serie · 11 condividi
   12 filtro attrezzi e preferiti (nella seduta libera)
   ============================================================ */

/* ---- foglio generico ---- */
let foglioDati = null;
function apriFoglio(titolo, html, sub) {
  let el = document.getElementById('og-foglio');
  if (!el) {
    el = document.createElement('div');
    el.id = 'og-foglio';
    el.className = 'group-sheet hidden';
    el.innerHTML = '<div class="sheet-bar"><button class="sheet-back" onclick="chiudiFoglio()" aria-label="Indietro">←</button>' +
      '<div class="sheet-titles"><div class="sheet-title" id="og-foglio-t"></div><div class="sheet-sub" id="og-foglio-s"></div></div></div>' +
      '<div class="sheet-body" id="og-foglio-b"></div>';
    document.body.appendChild(el);
  }
  document.getElementById('og-foglio-t').textContent = titolo;
  document.getElementById('og-foglio-s').textContent = sub || '';
  document.getElementById('og-foglio-b').innerHTML = html;
  el.classList.remove('hidden');
}
window.chiudiFoglio = function() { const el = document.getElementById('og-foglio'); if (el) el.classList.add('hidden'); };
function scegliFile(accept, cb) {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = accept; inp.style.display = 'none';
  inp.onchange = () => {
    const f = inp.files && inp.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { cb(String(r.result || ''), f.name); inp.remove(); };
    r.readAsText(f);
  };
  document.body.appendChild(inp);
  inp.click();
}
function scaricaFile(nome, testo, tipo) {
  const blob = new Blob([testo], { type: tipo });
  let file = null;
  try { file = new File([blob], nome, { type: tipo }); } catch (e) {}
  /* su iPhone il download diretto non esiste: si passa dal foglio di condivisione (Salva in File) */
  if (file && navigator.canShare && /iPhone|iPad|iPod/.test(navigator.userAgent) && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file], title: nome }).catch(() => {});
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = nome;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}
function dataOra(d) {
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear() +
    ' ore ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}
