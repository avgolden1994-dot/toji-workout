/* Elenco ordinato degli esercizi: sezioni, gruppi muscolari, sottogruppi
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   ELENCO ORDINATO DEGLI ESERCIZI
   Gli esercizi si scelgono sempre da un elenco organizzato allo stesso modo:
   prima dove si fanno (macchinari e cavi, pesi liberi, corpo libero), poi per
   gruppo muscolare e per sottogruppo (per esempio Schiena > Dorsali e
   Spessore). Ogni riga dice attrezzo, presa o attacco e focus.
   Le sezioni si aprono e si chiudono; si ricorda cosa e aperto mentre si
   sceglie, cosi aggiungere un esercizio non richiude tutto.
   ============================================================ */
const sezEsAperte = {};   /* "contesto|sezione" -> aperta o chiusa, finche non si cambia schermata */

window.azzeraSezioniEsercizi = function(ctx) {
  Object.keys(sezEsAperte).forEach(k => { if (k.indexOf(ctx + '|') === 0) delete sezEsAperte[k]; });
};
window.toggleSezioneEsercizi = function(k, btn) {
  const el = btn.parentNode, apri = !el.classList.contains('open');
  el.classList.toggle('open', apri);
  btn.setAttribute('aria-expanded', apri ? 'true' : 'false');
  sezEsAperte[k] = apri;
};

/* lista: esercizi della libreria. opz: ctx (nome della schermata), presente(ex) -> gia scelto, riga(ex) -> html,
   mostraGruppi (titolo del gruppo muscolare, quando la lista ne ha piu di uno), tuttoAperto, cmp (ordine dentro il sottogruppo) */
window.htmlEserciziOrganizzati = function(lista, opz) {
  const org = organizzaEsercizi(lista, opz.cmp);
  if (!org.length) return '<div class="dv-empty">Nessun esercizio con questo filtro</div>';
  const conta = (sz) => sz.gruppi.reduce((t, g) => t + g.sottogruppi.reduce((u, x) => u + x.items.length, 0), 0);
  const scelti = (sz) => sz.gruppi.reduce((t, g) => t + g.sottogruppi.reduce((u, x) => u + x.items.filter(opz.presente).length, 0), 0);
  const algunoScelto = org.some(sz => scelti(sz) > 0);
  const piccola = lista.length <= 8;
  return org.map((sz, i) => {
    const n = conta(sz), q = scelti(sz), k = opz.ctx + '|' + sz.sez;
    let aperta = sezEsAperte[k];
    if (aperta === undefined) aperta = !!opz.tuttoAperto || piccola || q > 0 || (!algunoScelto && i === 0);
    const corpo = sz.gruppi.map(g =>
      (opz.mostraGruppi ? '<div class="es-gruppo"><span class="es-gfig">' + muscleFigure(g.gruppo) + '</span><span>' + MUSCLE_GROUPS[g.gruppo].label + '</span></div>' : '') +
      g.sottogruppi.map(x => (x.sub ? '<div class="es-sub">' + x.sub + '</div>' : '') + x.items.map(opz.riga).join('')).join('')
    ).join('');
    return '<div class="es-sez' + (aperta ? ' open' : '') + '" data-sez="' + sz.sez + '">' +
      '<button type="button" class="es-sez-head" aria-expanded="' + aperta + '" onclick="toggleSezioneEsercizi(\'' + k + '\', this)">' +
        '<span class="es-sez-nome">' + sz.titolo + '</span>' +
        '<span class="es-sez-n">' + n + (n === 1 ? ' esercizio' : ' esercizi') + (q ? ' • ' + q + ' gia scelti' : '') + '</span>' +
        '<span class="caret">▾</span></button>' +
      '<div class="es-sez-body">' + corpo + '</div></div>';
  }).join('');
};

/* le due righe che dicono cosa e: attrezzo con presa o attacco, e il focus muscolare */
window.htmlDettaglioRiga = function(nome) {
  const d = dettaglioEsercizio(nome);
  if (!d) return '';
  return '<span class="pick-tags"><i class="pick-att">' + escapeHtml(d.att) + '</i>' + (d.attacco ? '<i>' + escapeHtml(d.attacco) + '</i>' : '') + '</span>' +
    '<span class="pick-focus"><span>Focus</span>: ' + escapeHtml(d.focus) + '</span>';
};
