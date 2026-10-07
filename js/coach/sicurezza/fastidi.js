/* Fastidi: la modifica scritta (REC-04 parte a, SAF-02, PRG-24, BIO-06)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   FASTIDI: LA MODIFICA SCRITTA (piano coach v2, W4-T1 versione snella, P4-F; ricerca-recupero-infortuni-popolazioni §3, §5.1, §6)
   Con un fastidio dichiarato (spalle, ginocchia, schiena bassa) il generatore toglie e tiene esercizi (consentito, RISCHIO, l’attributo `stress`): qui la scheda lo DICE.
   Per ogni zona dichiarata c’è UNA nota, scritta sulla scheda FINALE (riconciliaNote, ultimo passo di verificaProgramma: dopo i tagli per il tempo e il solutore del volume):
     - «esclusi per il fastidio»: gli esercizi che la zona toglie (elenco per zona, FASTIDI_ZONE) e che davvero non ci sono; uno che c’è non si dichiara escluso;
     - «restano»: ogni esercizio della scheda che carica la zona (attributo `stress` >= 1, soglia stressNominato: lo stesso criterio del collaudo SAF-02), nominato uno per uno,
       con come farlo (ampiezza e carico che non fanno male: un’istruzione, non una promessa);
     - quando fermarsi (oltre doloreMassimo/10 o se peggiora) e il rinvio a un medico o a un fisioterapista se non passa. Nessuna diagnosi, nessuna promessa di guarigione.
   Il testo è fatto di pezzi separati da « — » e da «: » e «, » che il traduttore sa tradurre uno per uno (js/lingue/traduttore.js: trCore): le parti fisse sono voci dei dizionari,
   i nomi degli esercizi sono i nomi di libreria.
   Le due note generiche di SCALE_DOLORE (biomeccanica.js, aggiunte da completaSettimana) dicevano «spinte con presa stretta o manubri a presa neutra» senza che la scheda lo avesse,
   proponevano l’isometrico della leg extension e il riscaldamento di McGill come se fossero una cura (ricerca-recupero §6: non supportati come antidolorifico) e promettevano
   «si torna al pieno quando il fastidio cala»: quando REC-04 è accesa le sostituisce questa nota.
   Le eccezioni per le ginocchia (ECCEZIONI_RISCHIO, motore.js) e l’esclusione della panca col bilanciere con la spalla dolente (esclusoDalFastidio, qui) sono lette da consentito().
   Spegnibile (REC-04): spenta, tutto come prima.
   ============================================================ */
const FASTIDI_ZONE = {
  spalle: {
    etichetta: 'Spalle',
    fuori: [
      { testo: 'military press', rx: /military|lento avanti|arnold|shoulder press|pike/i },
      { testo: 'dip', rx: /\bdip\b/i },
      { testo: 'tirate al mento', rx: /tirate al mento/i },
      { testo: 'panca col bilanciere', rx: /^panca (piana bilanciere|inclinata bilanciere|declinata|con pausa)$/i }
    ],
    come: 'restano, da fare nell’ampiezza che non fa male'
  },
  ginocchia: {
    etichetta: 'Ginocchia',
    fuori: [
      { testo: 'squat con il carico', rx: /squat(?! a corpo libero| su scatola)/i },
      { testo: 'affondi', rx: /affondi|cossack/i },
      { testo: 'step-up su panca', rx: /^step-up su panca$/i }
    ],
    come: 'restano, da fare con discesa lenta e profondità che non fa male'
  },
  schiena: {
    etichetta: 'Schiena bassa',
    fuori: [
      { testo: 'stacchi', rx: /stacco/i },
      { testo: 'good morning', rx: /good morning/i },
      { testo: 'rematori col bilanciere', rx: /rematore con bilanciere|t-bar|rematore presa inversa|yates/i },
      { testo: 'squat col bilanciere', rx: /squat con bilanciere|front squat|squat con pausa/i }
    ],
    come: 'restano, da fare con la schiena ferma e un carico che non fa male'
  }
};

/* la regola è accesa? (il catalogo si legge solo a esecuzione; senza catalogo vale come accesa) */
function fastidiAttivi() {
  return typeof sogliaFastidi === 'function' && sogliaFastidi('stressNominato') !== null && (typeof regolaAttiva !== 'function' || regolaAttiva('REC-04'));
}

/* REC-04 (INT-4b, m9): il pavimento dei RIR sugli esercizi che restano con cautela: con un fastidio dichiarato (profilo.fastidi) un esercizio con stress >= `stressNominato` su quella zona non va
   sotto `rirConFastidio` ripetizioni in riserva. Solo alza: l ultimo passo prima dei pavimenti delle popolazioni in rirBersaglio. Senza fastidio, con REC-04 spenta o per gli altri esercizi: invariato */
function pavimentoRirFastidi(r, nome) {
  if (!Array.isArray(r) || r.length < 2 || !fastidiAttivi() || typeof stressArticolare !== 'function') return r;
  const piso = sogliaFastidi('rirConFastidio'), soglia = sogliaFastidi('stressNominato'), zone = ((typeof getProfile === 'function' ? getProfile() : null) || {}).fastidi || [];
  if (piso === null || soglia === null || !Array.isArray(zone) || !zone.length) return r;
  const carica = zone.some(z => (stressArticolare(nome, z) || 0) >= soglia);
  return carica && r[0] < piso ? [piso, Math.max(r[1], piso + 1)] : r;
}

/* REC-04: con la spalla dolente la panca col bilanciere (presa fissa, abilità 2-3) non si propone: inclinata e declinata come la piana e quella con pausa, che RISCHIO.spalle toglieva già. Restano la
   panca coi manubri, le macchine, la landmine (presa neutra, abilità 1), i piegamenti a terra: il petto resta coperto. Si legge il DATO (attrezzo e schema di attributi-esercizi.js, stress della spalla),
   non il nome: un esercizio nuovo che lo rispetta è tolto da solo. Ritorna true se `nome` NON va proposto per questi fastidi. */
function esclusoDalFastidio(nome, prefs) {
  if ((prefs.fastidi || []).indexOf('spalle') === -1 || typeof attributi !== 'function' || !fastidiAttivi()) return false;
  const a = attributi(nome);
  return !!a && a.attrezzo === 'bilanciere' && a.schema === 'spintaO' && ((a.stress && a.stress.spalla) || 0) >= sogliaFastidi('stressNominato');
}

/* i nomi (senza emoji, senza doppioni, nell’ordine della scheda) degli esercizi del programma */
function nomiDelProgramma(prog) {
  const nomi = [];
  (prog.sedute || []).forEach(sd => (sd.esercizi || []).forEach(e => { const n = senzaEmoji(e.name); if (nomi.indexOf(n) === -1) nomi.push(n); }));
  return nomi;
}

/* la nota di una zona, e i fatti su cui si basa: { zona, tenuti: [nomi che caricano la zona e ci sono], fuori: [{ testo, rx }: ciò che dice di non avere], testo }; null se la zona non ha nota */
function datiNotaFastidio(prog, fastidio) {
  const z = FASTIDI_ZONE[fastidio];
  const soglia = typeof sogliaFastidi === 'function' ? sogliaFastidi('stressNominato') : null, massimo = typeof sogliaFastidi === 'function' ? sogliaFastidi('doloreMassimo') : null;
  if (!z || soglia === null || massimo === null) return null;
  const nomi = nomiDelProgramma(prog);
  const tenuti = nomi.filter(n => ((typeof stressArticolare === 'function' ? stressArticolare(n, fastidio) : 0) || 0) >= soglia);
  const fuori = z.fuori.filter(f => !nomi.some(n => f.rx.test(n)));
  const parti = [];
  if (fuori.length) parti.push(z.etichetta + ', esclusi per il fastidio: ' + fuori.map(f => f.testo).join(', '));
  if (tenuti.length) parti.push((parti.length ? '' : z.etichetta + ': ') + z.come + ': ' + tenuti.join(', '));
  parti.push((parti.length ? '' : z.etichetta + ': ') + 'se il fastidio supera ' + massimo + '/10 o peggiora, fermati; se non passa, fatti vedere da un medico o da un fisioterapista.');
  return { zona: fastidio, tenuti: tenuti, fuori: fuori, testo: parti.join(' — ') };
}

/* è una nota di questo file? (per non ripeterla se riconciliaNote gira due volte) */
function eNotaDelFastidio(testo) {
  const t = String(testo);
  return Object.keys(FASTIDI_ZONE).some(k => { const e = FASTIDI_ZONE[k].etichetta; return t.indexOf(e + ', esclusi per il fastidio: ') === 0 || t.indexOf(e + ': restano, ') === 0 || t.indexOf(e + ': se il fastidio supera ') === 0; });
}

/* REC-04: alla fine della costruzione (riconciliaNote) le note generiche di SCALE_DOLORE lasciano il posto alla nota vera di ogni zona dichiarata, nello stesso punto della lista */
function applicaNoteFastidi(prog) {
  if (!fastidiAttivi()) return prog;
  const zone = ((prog.prefs && prog.prefs.fastidi) || []).filter((f, i, l) => FASTIDI_ZONE[f] && l.indexOf(f) === i);
  if (!zone.length) return prog;
  const generiche = typeof SCALE_DOLORE !== 'undefined' ? zone.map(f => SCALE_DOLORE[f]).filter(Boolean) : [];
  const vecchia = n => generiche.indexOf(n) !== -1 || eNotaDelFastidio(n);
  const k = prog.note.findIndex(vecchia);
  prog.note = prog.note.filter(n => !vecchia(n));
  const nuove = zone.map(f => datiNotaFastidio(prog, f)).filter(Boolean).map(d => d.testo);
  prog.note.splice(k === -1 ? prog.note.length : k, 0, ...nuove);
  return prog;
}
