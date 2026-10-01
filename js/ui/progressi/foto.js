/* Foto dei progressi
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


/* ---- Foto dei progressi: ogni 2 settimane, solo sul telefono ---- */
const FOTO_DB = 'coach_foto', FOTO_STORE = 'foto';
function fotoDB() {
  return new Promise((ok, ko) => {
    if (!window.indexedDB) { ko(new Error('no idb')); return; }
    const r = indexedDB.open(FOTO_DB, 1);
    r.onupgradeneeded = () => { const db = r.result; if (!db.objectStoreNames.contains(FOTO_STORE)) db.createObjectStore(FOTO_STORE, { keyPath: 'id' }); };
    r.onsuccess = () => ok(r.result);
    r.onerror = () => ko(r.error);
  });
}
async function fotoTutte() {
  try {
    const db = await fotoDB();
    return await new Promise((ok) => {
      const q = db.transaction(FOTO_STORE, 'readonly').objectStore(FOTO_STORE).getAll();
      q.onsuccess = () => ok((q.result || []).sort((a, b) => a.data < b.data ? 1 : (a.data > b.data ? -1 : b.id - a.id)));
      q.onerror = () => ok([]);
    });
  } catch (e) { return []; }
}
async function fotoSalva(rec) { const db = await fotoDB(); return new Promise((ok, ko) => { const t = db.transaction(FOTO_STORE, 'readwrite'); t.objectStore(FOTO_STORE).put(rec); t.oncomplete = () => ok(); t.onerror = () => ko(t.error); }); }
async function fotoTogli(id) { const db = await fotoDB(); return new Promise((ok) => { const t = db.transaction(FOTO_STORE, 'readwrite'); t.objectStore(FOTO_STORE).delete(id); t.oncomplete = () => ok(); t.onerror = () => ok(); }); }
/* la data dell ultima foto si tiene anche in chiaro, per il promemoria */
const fotoUltimaKey = () => 'coach_plus_foto_ultima_' + currentMode;
function fotoPromemoria() {
  const u = localStorage.getItem(fotoUltimaKey());
  if (!u) return { dovuta: false, giorni: null, prossima: null };
  const pross = piuGiorni(daYmd(u), 14);
  const g = Math.ceil((pross - new Date()) / 86400000);
  return { dovuta: g <= 0, giorni: Math.max(0, g), prossima: pross };
}
/* riduce la foto (lato lungo 1200 px, JPEG): meno spazio, stessa utilita */
function fotoRiduci(file) {
  return new Promise((ok) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        try {
          const k = Math.min(1, 1200 / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          const ctx = c.getContext && c.getContext('2d');
          if (!ctx) { ok(file); return; }
          ctx.drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(b => { URL.revokeObjectURL(url); ok(b || file); }, 'image/jpeg', 0.8);
        } catch (e) { ok(file); }
      };
      img.onerror = () => ok(file);
      img.src = url;
    } catch (e) { ok(file); }
  });
}
window.aggiungiFoto = async function(files) {
  const f = files && files[0];
  if (!f) return;
  const blob = await fotoRiduci(f);
  const oggi = ymd(new Date());
  const rec = { id: Date.now() * 1000 + Math.floor(Math.random() * 1000), data: oggi, blob: blob };
  try { await fotoSalva(rec); } catch (e) { showUndo('Foto non salvata: spazio del telefono pieno?'); return; }
  const u = localStorage.getItem(fotoUltimaKey());
  if (!u || u < oggi) localStorage.setItem(fotoUltimaKey(), oggi);
  showUndo('Foto salvata', async () => { await fotoTogli(rec.id); renderFoto(); });
  renderFoto(); renderPgTiles();
};
let fotoUrl = [];
let fotoConfronto = null;
window.renderFoto = async function() {
  const box = document.getElementById('pg-foto');
  if (!box) return;
  const fp = fotoPromemoria();
  const tutte = await fotoTutte();
  fotoUrl.forEach(u => { try { URL.revokeObjectURL(u); } catch (e) {} });
  fotoUrl = [];
  const src = (x) => { try { const u = URL.createObjectURL(x.blob); fotoUrl.push(u); return u; } catch (e) { return ''; } };
  const dt = (k) => daYmd(k).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short' });
  box.innerHTML = '<div class="section-title">Foto ogni 2 settimane</div>' +
    '<div class="foto-nudge' + (fp.dovuta ? ' dovuta' : '') + '">' +
      (fp.prossima ? (fp.dovuta ? '<b>Oggi tocca alla foto.</b> ' : '<span>Prossima foto</span>: <b data-no-tr>' + fp.prossima.toLocaleDateString(LOCALE(), { weekday: 'long', day: 'numeric', month: 'long' }) + '</b>. ')
        : '<b>La prima foto fissa il punto di partenza.</b> ') +
      '<span>Stessa luce, stessa posa: fronte, lato, retro.</span></div>' +
    '<div class="foto-grid">' +
      '<label class="foto-add" aria-label="Aggiungi una foto">+<input type="file" accept="image/*" hidden onchange="aggiungiFoto(this.files); this.value=\'\'"></label>' +
      tutte.map(x => '<button class="foto-t' + (fotoConfronto && fotoConfronto.indexOf(x.id) !== -1 ? ' sel' : '') + '" onclick="toccaFoto(' + x.id + ')"><img alt="" src="' + src(x) + '"><span data-no-tr>' + dt(x.data) + '</span></button>').join('') +
    '</div>' +
    (tutte.length >= 2 ? '<button class="btn-start-workout" onclick="avviaConfronto()">' + (fotoConfronto ? 'Scegli due foto (' + fotoConfronto.length + '/2)' : 'Confronta due date') + '</button>' : '') +
    '<div class="sr-note">Le foto restano solo sul telefono, mai inviate. Non entrano nel backup: si salvano una per una dalla foto aperta.</div>';
};
window.avviaConfronto = function() { fotoConfronto = fotoConfronto ? null : []; renderFoto(); };
window.toccaFoto = async function(id) {
  if (fotoConfronto) {
    const i = fotoConfronto.indexOf(id);
    if (i !== -1) fotoConfronto.splice(i, 1); else fotoConfronto.push(id);
    if (fotoConfronto.length === 2) { const due = fotoConfronto.slice(); fotoConfronto = null; mostraFoto(due); }
    renderFoto();
    return;
  }
  mostraFoto([id]);
};
async function mostraFoto(ids) {
  const tutte = await fotoTutte();
  const scelte = ids.map(id => tutte.find(x => x.id === id)).filter(Boolean).sort((a, b) => a.data < b.data ? -1 : 1);
  if (!scelte.length) return;
  const v = document.getElementById('foto-view');
  const dt = (k) => daYmd(k).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long', year: 'numeric' });
  const urls = scelte.map(x => { const u = URL.createObjectURL(x.blob); fotoUrl.push(u); return u; });
  const giorni = scelte.length === 2 ? giorniTra(daYmd(scelte[0].data), daYmd(scelte[1].data)) : 0;
  v.innerHTML = '<div class="foto-box">' +
    '<div class="foto-bar"><b>' + (scelte.length === 2 ? 'Confronto: ' + giorni + ' giorni' : '<span data-no-tr>' + dt(scelte[0].data) + '</span>') + '</b>' +
      '<button class="sheet-back" onclick="chiudiFoto()" aria-label="Chiudi">✕</button></div>' +
    '<div class="foto-pair n' + scelte.length + '">' + scelte.map((x, i) => '<figure><img alt="" src="' + urls[i] + '"><figcaption data-no-tr>' + dt(x.data) + '</figcaption></figure>').join('') + '</div>' +
    (scelte.length === 1 ? '<div class="foto-act"><a class="set-row-btn" href="' + urls[0] + '" download="3in-foto-' + scelte[0].data + '.jpg">Salva sul telefono</a>' +
      '<button class="set-row-btn foto-del" onclick="eliminaFoto(' + scelte[0].id + ')">Elimina</button></div>' : '') +
    '</div>';
  v.classList.remove('hidden');
}
window.chiudiFoto = function() { const v = document.getElementById('foto-view'); v.classList.add('hidden'); v.innerHTML = ''; };
window.eliminaFoto = async function(id) {
  const tutte = await fotoTutte();
  const rec = tutte.find(x => x.id === id);
  if (!rec) return;
  await fotoTogli(id);
  chiudiFoto(); renderFoto();
  showUndo('Foto eliminata', async () => { await fotoSalva(rec); renderFoto(); });
};
