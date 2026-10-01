/* Risultato del programma generato
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


function renderOnbResult() {
  const prog = buildProgram(onbData);
  const an = analyzeBia(onbData.bia, onbData.sex);
  const nomiObiettivi = prog.goals.map((id, i) => { const g = ONB_GOALS.find(x => x.id === id); return (i === 0 ? '<b>' : '<span>') + (g ? g.name : id) + (i === 0 ? '</b>' : '</span>'); }).join(' + ');
  const scarichi = prog.fasi.map((f, i) => f === 'scarico' ? i + 1 : null).filter(Boolean);

  let html = '<div class="onb-q">Il tuo programma</div>' +
    '<div class="onb-why">Costruito su quello che mi hai detto. Puoi cambiare ogni cosa dopo: e un punto di partenza, non una gabbia.</div>';

  html += '<div class="res-card"><div class="res-title">Struttura</div>' +
    '<div class="res-big">' + prog.split.nome + '</div>' +
    '<div class="res-line"><span>Obiettivi</span><b style="font-weight:600">' + nomiObiettivi + '</b></div>' +
    '<div class="res-line"><span>Durata</span><b>' + prog.settimane + ' settimane</b></div>' +
    '<div class="res-line"><span>Blocchi</span><b>' + (prog.blocco - 1) + ' di carico + 1 di scarico</b></div>' +
    '<div class="res-line"><span>Settimane di scarico</span><b>' + scarichi.join(', ') + '</b></div>' +
    '<div class="res-line"><span>Sedute</span><b>' + onbData.days + ' a settimana</b></div>' +
    '<div class="res-line"><span>Schema base</span><b>' + prog.scheme.sets + ' \u00D7 ' + prog.scheme.reps + '</b></div>' +
    '<div class="res-line"><span>Esercizi per seduta</span><b>' + prog.eserciziPerSeduta + '</b></div>' +
    '</div>';

  const adattamenti = [];
  if (prog.scheme.forzaSulPrimo) adattamenti.push('Il primo esercizio di ogni seduta e pesante (5\u00D75) per la forza.');
  if (prog.scheme.isoMassa) adattamenti.push('Gli esercizi di isolamento vanno a 3\u00D712 per la massa.');
  if (prog.scheme.cardio) adattamenti.push('Aggiungi 15-20 minuti di cardio leggero dopo la seduta, per il dimagrimento.');
  if (prog.prefs.sonno === 'male') adattamenti.push('Con poco recupero ho tolto una serie agli accessori e aumentero i carichi con piu prudenza.');
  (prog.note || []).forEach(n => adattamenti.push(n));
  prog.sostituzioni.forEach(s => adattamenti.push(s.da.replace(EMOJI_TESTA, '') + ' \u2192 ' + s.a.replace(EMOJI_TESTA, '')));
  if (adattamenti.length) {
    html += '<div class="res-card"><div class="res-title">Adattato a te</div>' +
      adattamenti.map(a => '<div class="consent-li">\u2022 ' + escapeHtml(a) + '</div>').join('') + '</div>';
  }

  html += '<div class="res-card"><div class="res-title">La settimana tipo</div>' +
    prog.sedute.map(s => '<div class="res-line"><span>' + s.giorno + '</span><b>' + escapeHtml(s.titolo) + '</b></div>' +
      '<div class="res-es">' + s.esercizi.map(e => escapeHtml(senzaEmoji(e.name))).join(' \u00B7 ') + '</div>').join('') +
    prog.riposo.map(r => '<div class="res-line"><span>' + r + '</span><b style="color:var(--muted)">\u{1F634} riposo</b></div>').join('') +
    '</div>';

  html += '<div class="res-card"><div class="res-title">Come ho costruito il tuo programma</div>' +
    '<div class="pref-note">Ho messo insieme chi sei, cosa stai vivendo e i tuoi dati fisici. Le schede famose sono esempi: ne prendo le idee giuste per te.</div>' +
    htmlIspirazioni(prog.ispirazioni) + '</div>';
  html += '<button class="set-row-btn" id="onb-alternative" onclick="apriAlternative()">Esercizi alternativi</button>' +
    '<div class="sr-note">Scegli tu, esercizio per esercizio, tra alternative che allenano gli stessi muscoli.</div>';
  const sb = statoBia(onbData, {});   /* INT-01: angolo di fase e acqua extracellulare, per la prudenza iniziale */
  if ((an && (an.bmi || an.fmPerc || an.ffmi || an.bmr)) || sb.dati) {
    const v1 = (x) => x.toFixed(1).replace('.', ',');
    html += '<div class="res-card"><div class="res-title">La tua composizione</div>' +
      (an.bmi ? '<div class="res-line"><span>BMI</span><b>' + an.bmi + '</b></div>' : '') +
      (an.fmPerc ? '<div class="res-line"><span>Massa grassa</span><b>' + an.fmPerc + '%</b></div>' : '') +
      (an.ffmi ? '<div class="res-line"><span>Indice di massa magra</span><b>' + an.ffmi + '</b></div>' : '') +
      (an.bmr ? '<div class="res-line"><span>Metabolismo basale</span><b>' + an.bmr + ' kcal</b></div>' : '') +
      (an && an.fmTesto ? '<span class="res-tag ' + an.fmLivello + '">' + an.fmTesto + '</span>' : '') +
      (sb.fa !== null ? '<div class="res-line"><span>Angolo di fase</span><b>' + v1(sb.fa) + '\u00B0 <span class="res-tag ' + (sb.faBassa ? 'att' : 'good') + '" style="margin:0 0 0 6px">' + (sb.faBassa ? 'Sotto la media' : 'Nella norma') + '</span></b></div>' : '') +
      (sb.rapporto !== null ? '<div class="res-line"><span>Acqua extracellulare / totale</span><b>' + sb.rapporto.toFixed(2).replace('.', ',') + ' <span class="res-tag ' + (sb.ecwAlto ? 'att' : (sb.ecwLimite ? 'mid' : 'good')) + '" style="margin:0 0 0 6px">' + (sb.ecwAlto ? 'Alta' : (sb.ecwLimite ? 'Limite alto' : 'Nella norma')) + '</span></b></div>' : '') +
      (sb.dati ? '<div class="pref-note">Il coach usa l’angolo di fase e l’acqua extracellulare solo per essere prudente all’inizio, non per scegliere i carichi. Se un valore è fuori norma, ripeti la misura a digiuno e a riposo.</div>' : '') +
      '</div>';
  }

  /* Quando parte, e cosa fare se un programma e gia in corso */
  const attivo = getProgramma();
  const s = attivo ? settimanaProgramma() : null;
  const lunQuesta = lunediDi(new Date());
  const lunProssima = piuGiorni(lunQuesta, 7);
  const dataIt = (d) => d.toLocaleDateString(LOCALE(), { day: 'numeric', month: 'long' });
  if (onbData.inizio === undefined) onbData.inizio = attivo && s && !s.finito ? 'prossima' : 'questa';

  html += '<div class="res-card"><div class="res-title">Quando parte</div>';
  if (attivo && s && !s.finito) {
    html += '<div class="consent-li" style="margin-bottom:var(--sp-3);">\u26A0\uFE0F Hai gia un programma in corso: <b>' + escapeHtml(attivo.split) +
      '</b>, settimana ' + s.numero + ' di ' + s.totale + '.</div>';
  }
  html += '<button class="onb-opt ' + (onbData.inizio === 'questa' ? 'on' : '') + '" onclick="onbPick(\'inizio\', \'questa\')">' +
      '<span class="onb-opt-emoji">\u25B6</span><span class="onb-opt-main">' +
      '<span class="onb-opt-name">' + (attivo ? 'Sostituisci da subito' : 'Questa settimana') + '</span>' +
      '<span class="onb-opt-desc"><span>Parte da luned\u00EC</span> <span data-no-tr>' + dataIt(lunQuesta) + '</span>' + (attivo ? '. Il programma attuale viene sostituito da oggi in avanti' : '') + '</span></span>' +
      '<span class="pick-check">' + (onbData.inizio === 'questa' ? '\u2713' : '') + '</span></button>' +
    '<button class="onb-opt ' + (onbData.inizio === 'prossima' ? 'on' : '') + '" onclick="onbPick(\'inizio\', \'prossima\')">' +
      '<span class="onb-opt-emoji">\u23ED</span><span class="onb-opt-main">' +
      '<span class="onb-opt-name">Dalla prossima settimana</span>' +
      '<span class="onb-opt-desc"><span>Parte da luned\u00EC</span> <span data-no-tr>' + dataIt(lunProssima) + '</span>' + (attivo ? '. Finisci questa settimana com e programmata' : '') + '</span></span>' +
      '<span class="pick-check">' + (onbData.inizio === 'prossima' ? '\u2713' : '') + '</span></button>' +
    '<div class="set-about">I giorni gi\u00E0 completati non vengono mai toccati.</div>' +
    '</div>';

  html += '<div class="onb-note">Il programma viene messo nel calendario per tutte le ' + prog.settimane + ' settimane. ' +
    'Il carico progressivo aumentera i pesi quando completi tutte le serie, e li alleggerira nelle settimane di scarico.' +
    '<br><br>E una traccia generata da regole, non la valutazione di un professionista. Con patologie o dolori, parlane prima con un medico.</div>';
  return html;
}
