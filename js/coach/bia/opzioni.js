/* BIA nelle opzioni
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   BIA NELLE OPZIONI
   Carichi il PDF: tutti i valori vengono letti dal referto (anche lo
   storico stampato), li vedi, li salvi. Si scrive a mano solo se
   manca il referto. Il coach usa quello che trova qui.
   ============================================================ */
let biaLetta = null;   /* valori letti e non ancora salvati */

window.openBiaSheet = function() {
  switchTab('impostazioni');
  document.getElementById('bia-sheet').classList.remove('hidden');
  renderBiaSheet();
};
window.closeBiaSheet = function() {
  document.getElementById('bia-sheet').classList.add('hidden');
  biaLetta = null;
  renderSettings();
};

function rigaBia(v) {
  return [v.peso ? v.peso + ' kg' : '', v.fmPerc ? tr(v.fmPerc + '% grasso') : '', v.ffm ? tr(v.ffm + ' kg magra') : '']
    .filter(Boolean).join(' \u2022 ');
}

function renderBiaSheet() {
  const body = document.getElementById('bia-body');
  if (!coachAttivo()) {
    body.innerHTML = '<div class="dv-empty">\u{1F512}<br>I valori della BIA sono dati sulla salute: servono il tuo consenso.</div>' +
      '<button class="btn-start-workout" onclick="closeBiaSheet();">Vai a Privacy e dati</button>';
    return;
  }
  const et = { peso: 'Peso', fmPerc: 'Massa grassa', fm: 'Grasso', ffm: 'Massa magra', smm: 'Muscolo scheletrico',
               tbw: 'Acqua totale', bmr: 'Metabolismo', bmi: 'BMI', viscerale: 'Grasso viscerale', altezza: 'Altezza', eta: 'Eta' };
  const un = { peso: ' kg', fmPerc: '%', fm: ' kg', ffm: ' kg', smm: ' kg', tbw: ' L', bmr: ' kcal', bmi: '', viscerale: '', altezza: ' cm', eta: ' anni' };

  let html = '<label class="bia-drop" for="agent-bia-file">\u{1F4C4} Carica il PDF del referto' +
    '<span style="display:block;font-weight:400;font-size:0.7rem;margin-top:4px;">leggo io tutti i valori</span></label>' +
    '<input type="file" id="agent-bia-file" accept="application/pdf" style="display:none;" onchange="agentBiaPdf(this.files)">' +
    '<div class="bia-status" id="agent-bia-status"></div>';

  if (biaLetta) {
    const chiavi = Object.keys(et).filter(k => biaLetta[k] !== undefined && biaLetta[k] !== null);
    html += '<div class="res-card"><div class="res-title" data-no-tr>' + (biaLetta.data ? trP('Letti dal referto del %s', daYmd(biaLetta.data).toLocaleDateString(LOCALE())) : tr('Letti dal referto')) + '</div>' +
      chiavi.map(k => '<div class="res-line"><span>' + et[k] + '</span><b>' + biaLetta[k] + un[k] + '</b></div>').join('') +
      (biaLetta.storico && biaLetta.storico.length ? '<div class="set-about">Trovate anche ' + biaLetta.storico.length + ' misure precedenti stampate sul referto: le salvo nello storico.</div>' : '') +
      '<button class="btn-start-workout" style="margin-top:var(--sp-4);" onclick="salvaBiaLetta()">Salva la BIA</button></div>';
  }

  html += '<button class="set-row-btn" onclick="toggleBiaManuale()">\u270E Non ho il PDF: scrivo i valori a mano</button>' +
    '<div id="bia-manuale" style="display:none;">' +
      '<div class="bia-grid">' +
        '<label class="bia-val"><span>Peso (kg)</span><input type="number" step="0.1" id="ag-peso"></label>' +
        '<label class="bia-val"><span>Massa grassa (%)</span><input type="number" step="0.1" id="ag-fm"></label>' +
        '<label class="bia-val"><span>Massa magra (kg)</span><input type="number" step="0.1" id="ag-ffm"></label>' +
        '<label class="bia-val"><span>Metabolismo (kcal)</span><input type="number" step="1" id="ag-bmr"></label>' +
      '</div>' +
      '<button class="btn-start-workout" style="margin-top:var(--sp-4);" onclick="salvaBiaAgente()">Salva</button>' +
    '</div>';

  const st = getBiaStorico();
  html += '<div class="aw-sec">Le tue BIA</div>';
  html += st.length
    ? st.slice().reverse().map(x => '<div class="res-line"><span>' + daYmd(x.data).toLocaleDateString(LOCALE(), { day: 'numeric', month: 'short', year: '2-digit' }) +
        '</span><b><span data-no-tr>' + rigaBia(x.valori) + '</span> <button class="bia-del" onclick="eliminaBia(\'' + x.data + '\')" aria-label="Elimina">\u2715</button></b></div>').join('')
    : '<div class="set-about" style="margin-top:0;">Ancora nessuna.</div>';
  body.innerHTML = html;
}

window.toggleBiaManuale = function() {
  const m = document.getElementById('bia-manuale');
  m.style.display = m.style.display === 'none' ? 'block' : 'none';
};

window.salvaBiaLetta = function() {
  if (!biaLetta) return;
  (biaLetta.storico || []).forEach(x => { if (x.data !== biaLetta.data) aggiungiBia(x.valori, x.data); });
  aggiungiBia(biaLetta, biaLetta.data);
  const n = 1 + (biaLetta.storico || []).filter(x => x.data !== biaLetta.data).length;
  biaLetta = null;
  renderBiaSheet();
  showUndo(n > 1 ? n + ' misure salvate: il coach vede tutto l andamento' : 'BIA salvata: il coach ne tiene conto');
};

window.eliminaBia = function(data) {
  const st = getBiaStorico();
  const tolta = st.find(x => x.data === data);
  localStorage.setItem(biaKey(), JSON.stringify(st.filter(x => x.data !== data)));
  renderBiaSheet();
  showUndo('BIA eliminata', () => { if (tolta) aggiungiBia(tolta.valori, tolta.data); renderBiaSheet(); });
};

window.agentBiaPdf = async function(files) {
  const file = files && files[0];
  const st = document.getElementById('agent-bia-status');
  if (!file) return;
  st.className = 'bia-status'; st.innerText = 'Leggo il referto...';
  try {
    const pdfjsLib = await ensurePdfJs();
    const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    let testo = '';
    for (let i = 1; i <= Math.min(pdf.numPages, 6); i++) {
      const tc = await (await pdf.getPage(i)).getTextContent();
      testo += ' ' + tc.items.map(x => x.str).join(' ');
    }
    const v = parseBiaText(testo);
    const letti = ['peso', 'fmPerc', 'ffm', 'bmr'].filter(k => v[k]).length;
    if (!letti) { st.className = 'bia-status warn'; st.innerText = 'Non riconosco i valori di questo referto: scrivili a mano qui sotto.'; return; }
    biaLetta = v;
    renderBiaSheet();
  } catch (e) {
    st.className = 'bia-status warn'; st.innerText = 'Non riesco a leggere il PDF: scrivi i valori a mano.';
  }
};

window.compilaBiaAgente = function(v) {
  if (v.peso) document.getElementById('ag-peso').value = v.peso;
  if (v.fmPerc) document.getElementById('ag-fm').value = v.fmPerc;
  if (v.ffm) document.getElementById('ag-ffm').value = v.ffm;
  if (v.bmr) document.getElementById('ag-bmr').value = v.bmr;
};

window.salvaBiaAgente = function() {
  const n = (id) => { const x = parseFloat(document.getElementById(id).value); return isNaN(x) ? null : x; };
  const v = { peso: n('ag-peso'), fmPerc: n('ag-fm'), ffm: n('ag-ffm'), bmr: n('ag-bmr') };
  if (!v.peso && !v.fmPerc && !v.ffm) { alert('Inserisci almeno peso, massa grassa o massa magra.'); return; }
  if (!v.ffm && v.peso && v.fmPerc) v.ffm = Math.round(v.peso * (1 - v.fmPerc / 100) * 10) / 10;
  aggiungiBia(v);
  if (document.getElementById('bia-sheet') && !document.getElementById('bia-sheet').classList.contains('hidden')) renderBiaSheet();
  else renderAgent();
  showUndo('BIA salvata: il coach ne tiene conto');
};

window.restartOnboarding = function() {
  if (!coachAttivo()) {
    alert('Il programma personalizzato usa i tuoi dati, per questo serve il consenso. Puoi darlo da Opzioni \u2192 Privacy e dati.');
    switchTab('impostazioni');
    return;
  }
  if (!confirm('Rifacendo il questionario il programma attuale verra sostituito. Continuare?')) return;
  startOnboarding(true);
};

window.getProfile = function() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY()) || 'null'); } catch (e) { return null; }
};
