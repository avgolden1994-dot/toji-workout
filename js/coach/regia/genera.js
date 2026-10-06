/* Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   IL GENERATORE A STADI (piano coach v2, B.3; W1-T4)
   window.buildProgram(d) non e piu una funzione sola di 370 righe: e l elenco ordinato degli stadi, ognuno con il suo file e il suo nome stabile.
   Le onde successive riscrivono il CORPO della funzione nel suo file, non questo elenco. Gli stadi leggono e scrivono il brief (regia/brief.js).
     1  briefCoach(d, prof0)                regia/brief.js                  chi, obiettivi (D-P6), agenda, preferenze, corpo, mente
     2  vincoliSicurezza(brief)             sicurezza/vincoli.js            i limiti (Sentinella): vietati, serie massime, tecniche ammesse
        risolviMetodo(brief)                regia/brief.js                  il metodo famoso e il tocco (dopo i vincoli: il tocco puo portare al cedimento)
     3  specialitaStruttura(brief)          qui (smista)                    forza (specialita/forza.js, W2-T7: { split, sedute }) / estetica: oggi nessuna (registraSpecialita)
     4  pianoMesociclo(brief)               programma/mesociclo.js          settimane, blocchi, scarichi, RIR per settimana
     5  scegliSplit + giorniSettimana       ui/onboarding.js, qui           la divisione e i giorni della settimana
        numeroEsercizi(brief)               volume/tempo.js                 quanti esercizi per seduta
     6  componiSedute(brief, split)         programma/ricette.js            gli esercizi di ogni posto della ricetta
     8  prescriviSerie(brief, sedute)       volume/serie-ripetizioni.js     serie, ripetizioni, pause
     7  completaSettimana(brief, sedute)    programma/completamenti.js      schemi mancanti, regioni, femorali, buchi
     9  assegnaVolume + limitaVolume        volume/volume.js                serie per gruppo, tetti
    10  adattaAlTempo + rifinisciAlTempo    volume/tempo.js                 la seduta nei minuti dichiarati
    11  strBilancia / strFinale             programma/struttura-pro.js      spinte e tirate, il fondamentale (ABB-04, ABB-08, ABB-09)
    11b ordinaSedute                        programma/completamenti.js      i grandi gruppi prima dei piccoli (ORD-03)
    13  assegnaTecniche(brief, sedute)      volume/tecniche.js              superserie, drop set, AMRAP, potenza, cluster
    12  applicaMetodo(brief, sedute)        qui                             il metodo famoso decide serie e pause; il tocco; le superserie
    14  scelte dell utente                  qui                             gli esercizi alternativi scelti (PRG-39)
    15  applicaPartenze(brief, sedute)      carichi/partenza.js             i carichi di partenza dal corpo e dallo storico
    17  verificaProgramma(brief, prog)      qui                             chiama i valida* che esistono (REG-02)
   L ORDINE e quello del codice di prima (W1-T4 non cambia nessun esito: il programma di 300 profili e identico byte per byte, tests/genera-golden.test.js).
   Differisce dal piano B.3 in tre punti, tutti perche gli stadi di oggi leggono cio che quelli prima hanno scritto: la prescrizione (8) gira PRIMA dei
   completamenti (7: leggono fisso e serie); le tecniche (13) girano PRIMA del metodo (12: il metodo le riscrive); strBilancia gira due volte. Li rimettono in ordine
   W2-T2, W2-T3 e W2-T6. REG-05: stesso seme, stesso programma.
   ============================================================ */

/* ---- 3. la specialita: forza da powerlifting, fisico da bodybuilding, un domani correre i 5 km (D-P6) ----
   Un registro: la modalita del brief (oggi sempre 'generale') -> una funzione che ritorna { split, ... } o null (= nessuna struttura speciale: il generatore
   usa la divisione di sempre). Le modalita FRZ (W2-T7) e EST (W2-T5) vi si registrano con registraSpecialita senza toccare questo file. */
const SPECIALITA_STRUTTURA = {};
function registraSpecialita(modalita, fn) { SPECIALITA_STRUTTURA[modalita] = fn; }
function specialitaStruttura(brief) {
  const fn = SPECIALITA_STRUTTURA[brief.obiettivi.modalita];
  return fn ? (fn(brief) || null) : null;
}

/* ---- 5. i giorni della settimana (indici di DAYS): lunedi-giovedi per 2 sedute; 6 giorni = lunedi-mercoledi e venerdi-domenica, con il giovedi di riposo. INT-2d (M2 della revisione): la settimana e un
   anello, quindi 6 sedute sono SEMPRE sei giorni di fila (venerdi-mercoledi): il giovedi di riposo di INT-2b non evitava i giorni di fila (il «mai piu di 4» contava solo da lunedi a domenica, REC-03 a 0 era un
   artefatto) e domenica e lunedi erano giorni consecutivi che nessun controllo vedeva (2 programmi su 1.152 col petto a fondo in tutti e due). Ora le 48 ore, i tipi di seduta e l ordine sono ciclici e la nota
   lo dice (NOTA_SEI_GIORNI_DI_FILA). Ogni grande gruppo torna dopo almeno 48 ore: con 6 giorni
   due sedute dello stesso tipo non stanno in giorni consecutivi, domenica-lunedi compresi; se la divisione lo impone (tre giorni di punti deboli con la frequenza 1) l ordine delle sedute si riordina, e se nemmeno
   cosi riesce le sedute diventano 5 con la nota (NOTA_SEI_GIORNI). Chi comincia con 5-6 giorni ha 4 sedute (splitFor, PRG-02): stanno sui giorni delle 4 sedute, con la nota
   (NOTA_PRINCIPIANTE_4_SEDUTE: la ricerca sui principianti §3.3, «detto all utente»). Scrive brief.lavoro.split se riordina o riduce le sedute. ---- */
const GIORNI_PER_SEDUTE = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 3, 4, 5], 6: [0, 1, 2, 4, 5, 6] };
const NOTA_SEI_GIORNI = 'Con 6 giorni lo stesso gruppo cadrebbe in due giorni di fila: cinque sedute e due giorni di riposo, i muscoli recuperano meglio.';
/* INT-2d (M2): 6 sedute in 7 giorni sono sempre sei giorni di fila (venerdi-mercoledi, il giovedi si riposa), perche la settimana e un anello: il «giovedi di riposo» non spezza niente. La nota lo dice; la seconda nota
   (petto, schiena, gambe e glutei non a fondo in due giorni consecutivi, domenica e lunedi compresi: i cinque di GRUPPI_RECUPERO) la mette riconciliaNote solo se la scheda finale la rispetta */
const NOTA_SEI_GIORNI_DI_FILA = 'Con 6 giorni hai un solo giorno di riposo: le sedute sono sei di fila, da venerdì a mercoledì, e il giovedì si riposa.';
const NOTA_SEI_GIORNI_48_ORE = 'Petto, schiena, gambe e glutei non lavorano a fondo in due giorni consecutivi.';
const NOTA_PRINCIPIANTE_4_SEDUTE = 'A chi comincia bastano 4 sedute a settimana: gli altri giorni sono riposo o una camminata.';   /* INT-2d (M1): prima «cresce di più con 4 sedute», senza fonte (la nota principianti §3.3: 2-3 sedute bastano, a volume pari full body e split sono uguali) */
/* due sedute dello stesso tipo in due giorni consecutivi (indici di DAYS)? */
function tipiAdiacenti(tipi, indici) {
  const n = tipi.length;
  /* INT-2d (M2): la settimana e un anello: l ultima seduta (domenica) e la prima (lunedi) sono in giorni consecutivi */
  return tipi.some((t, i) => i > 0 && indici[i] - indici[i - 1] === 1 && t === tipi[i - 1]) || (n > 2 && giorniAdiacenti(indici[n - 1], indici[0]) && tipi[n - 1] === tipi[0]);
}
/* un ordine delle sedute senza due tipi uguali in giorni consecutivi, il piu vicino possibile all ordine di partenza (ricerca esaustiva: al massimo 6 sedute); null se non esiste */
function riordinaSenzaAdiacenti(tipi, indici) {
  let trovato = null;
  const cerca = (ordine, resto) => {
    if (trovato) return;
    if (!resto.length) { if (ordine.length > 2 && giorniAdiacenti(indici[ordine.length - 1], indici[0]) && ordine[ordine.length - 1] === ordine[0]) return; trovato = ordine; return; }   /* anello: domenica e lunedi */
    const visti = {};
    for (let k = 0; k < resto.length && !trovato; k++) {
      const t = resto[k], i = ordine.length;
      if (visti[t]) continue;
      visti[t] = true;
      if (i > 0 && indici[i] - indici[i - 1] === 1 && t === ordine[i - 1]) continue;
      cerca(ordine.concat([t]), resto.slice(0, k).concat(resto.slice(k + 1)));
    }
  };
  cerca([], tipi.slice());
  return trovato;
}
/* PRG-02 (W2-T5; collaudo REC-01): i giorni dipendono da COSA si allena. I giorni fissi di sempre (lunedi-martedi-giovedi-venerdi per 4 sedute, lunedi-martedi-giovedi-venerdi-sabato per 5) mettevano
   un full body il lunedi e un upper il martedi (frequenza 3 con 4 giorni: schiena, spalle e petto a fondo in due giorni di fila), o un push e un pull consecutivi (5 giorni, push/pull/legs + upper/lower:
   le spalle). Qui, per 3-5 sedute senza un metodo famoso, se i giorni di sempre hanno due sedute in giorni consecutivi che lavorano lo stesso grande muscolo (seduteInConflitto: tipi uguali o con un
   grande gruppo in comune, SOGLIE_SPLIT.gruppiDelleSedute), si cerca tra tutte le scelte di giorni (al massimo 4 di fila, ciclico) quella con meno conflitti; a pari conflitti quella che non riordina le sedute, a
   pari riordino quella piu vicina ai giorni di sempre. Senza conflitti nei giorni di sempre non cambia niente (stesso programma di prima, byte per byte). Con 6 sedute vale l ordine di INT-2d (sotto);
   con un metodo famoso resta la sua struttura. Il risultato non porta una nota: dice il vero la scheda finale, non il tipo di seduta (una seduta di tirata ha anche lo stacco rumeno). */
function sogliaSplit(nome) { return typeof SOGLIE_SPLIT !== 'undefined' && SOGLIE_SPLIT[nome] ? SOGLIE_SPLIT[nome].v : null; }
/* i grandi muscoli che una seduta di questo tipo lavora a fondo (SOGLIE_SPLIT.gruppiDelleSedute); i punti deboli le priorita dichiarate piu le spalle (puntiDeboli); un tipo che non conosco, tutti i grandi
   muscoli (la scelta prudente) */
function grandiDellaSeduta(tipo, prefs) {
  const tabella = sogliaSplit('gruppiDelleSedute') || {};
  if (tipo === 'punti') {
    const p = sogliaSplit('puntiDeboli') || {}, out = [];
    ((prefs && prefs.priorita) || []).concat(['sempre']).forEach(g => (p[g] || []).forEach(x => { if (out.indexOf(x) === -1) out.push(x); }));
    return out;
  }
  return tabella[tipo] || tabella.fullbody || [];
}
function seduteInConflitto(a, b, prefs) {
  if (a === b) return true;
  const ga = grandiDellaSeduta(a, prefs), gb = grandiDellaSeduta(b, prefs);
  return ga.some(g => gb.indexOf(g) !== -1);
}
/* le coppie di sedute in giorni consecutivi (anche domenica-lunedi) che lavorano lo stesso grande muscolo */
function conflittiDeiGiorni(tipi, indici, prefs) {
  let n = 0;
  for (let i = 0; i < tipi.length; i++) for (let j = i + 1; j < tipi.length; j++) if (giorniAdiacenti(indici[i], indici[j]) && seduteInConflitto(tipi[i], tipi[j], prefs)) n++;
  return n;
}
/* il numero massimo di giorni di allenamento di fila, sulla settimana ad anello (7 se allenano tutti i giorni) */
function giorniDiFilaCiclici(indici) {
  const set = DAYS.map((x, i) => indici.indexOf(i) !== -1), riposo = set.indexOf(false);
  if (riposo === -1) return DAYS.length;
  let max = 0, corsa = 0;
  for (let k = 1; k <= DAYS.length; k++) { if (set[(riposo + k) % DAYS.length]) { corsa++; if (corsa > max) max = corsa; } else corsa = 0; }
  return max;
}
/* tutti gli ordini diversi delle sedute (due sedute dello stesso tipo non fanno due ordini) */
function ordiniDistinti(tipi) {
  const out = [];
  const cerca = (ordine, resto) => {
    if (!resto.length) { out.push(ordine); return; }
    const provati = {};
    resto.forEach((t, k) => { if (provati[t]) return; provati[t] = true; cerca(ordine.concat([t]), resto.slice(0, k).concat(resto.slice(k + 1))); });
  };
  cerca([], tipi.slice());
  return out;
}
/* { indici, tipi, conflitti } se esiste una scelta con MENO conflitti dei giorni `base` (stesso numero di sedute, al massimo SOGLIE_SPLIT.giorniDiFilaMax giorni di fila); null se i giorni di sempre vanno
   bene o non c e di meglio. Ordine di preferenza: conflitti, sedute riordinate, distanza dai giorni di sempre; a parita vince la prima trovata (i giorni piu a sinistra): il risultato non dipende dal caso */
function giorniSenzaConflitti(tipi, base, prefs) {
  const max = sogliaSplit('giorniDiFilaMax'), n = tipi.length;
  const c0 = conflittiDeiGiorni(tipi, base, prefs);
  if (!max || !c0) return null;
  const ordini = ordiniDistinti(tipi);
  let migliore = { c: c0, d: 0, s: 0, indici: base, tipi: tipi };
  for (let mask = 1; mask < (1 << DAYS.length); mask++) {
    const ind = [];
    for (let b = 0; b < DAYS.length; b++) if (mask & (1 << b)) ind.push(b);
    if (ind.length !== n || giorniDiFilaCiclici(ind) > max) continue;
    const s = ind.reduce((t, x, k) => t + Math.abs(x - base[k]), 0);
    ordini.forEach(o => {
      const c = conflittiDeiGiorni(o, ind, prefs);
      if (c > migliore.c) return;
      const d = o.reduce((t, x, k) => t + (x !== tipi[k] ? 1 : 0), 0);
      if (c < migliore.c || (c === migliore.c && (d < migliore.d || (d === migliore.d && s < migliore.s)))) migliore = { c: c, d: d, s: s, indici: ind, tipi: o };
    });
  }
  return migliore.c < c0 ? { indici: migliore.indici, tipi: migliore.tipi, conflitti: migliore.c } : null;
}
function giorniSettimana(brief, split) {
  const giorni = brief.agenda.giorni, L = brief.lavoro;
  const sedute = split && Array.isArray(split.giorni) ? Math.min(split.giorni.length, giorni) : giorni;
  let indici = (GIORNI_PER_SEDUTE[sedute] || GIORNI_PER_SEDUTE[giorni] || [0, 2, 4]).slice();
  const inizio = sogliaSplit('principianteSedute');   /* PRG-02: chi comincia con 5-6 giorni ha 4 sedute; senza il file delle soglie vale il 5 di sempre */
  if (split && sedute < giorni && brief.chi.livello === 'principiante' && giorni >= (inizio ? inizio.giorniDa : 5) && L && L.note && L.note.indexOf(NOTA_PRINCIPIANTE_4_SEDUTE) === -1) L.note.push(NOTA_PRINCIPIANTE_4_SEDUTE);
  if (split && sedute === 6) {
    const tipi = split.giorni.slice(0, 6);
    if (tipiAdiacenti(tipi, indici)) {
      const nuovo = riordinaSenzaAdiacenti(tipi, indici);
      if (nuovo) L.split = Object.assign({}, split, { giorni: nuovo.concat(split.giorni.slice(6)) });
      else { L.split = Object.assign({}, split, { giorni: split.giorni.slice(0, 5) }); indici = GIORNI_PER_SEDUTE[5].slice(); if (L.note.indexOf(NOTA_SEI_GIORNI) === -1) L.note.push(NOTA_SEI_GIORNI); }
    }
    if (indici.length === 6 && L.note.indexOf(NOTA_SEI_GIORNI_DI_FILA) === -1) L.note.push(NOTA_SEI_GIORNI_DI_FILA);
  }
  /* PRG-02 (W2-T5): 3-5 sedute senza un metodo famoso: i giorni (e, se serve, l ordine) che non mettono lo stesso grande muscolo in due giorni di fila */
  const corrente = split && (L.split || split);
  if (corrente && Array.isArray(corrente.giorni) && indici.length >= 3 && indici.length <= 5 && !(brief.metodo && brief.metodo.attivo) && (typeof regolaAttiva !== 'function' || regolaAttiva('PRG-02'))) {
    const tipi = corrente.giorni.slice(0, indici.length);
    const scelta = giorniSenzaConflitti(tipi, indici, L && L.prefs);
    if (scelta) {
      indici = scelta.indici;
      if (scelta.tipi.some((t, k) => t !== tipi[k])) L.split = Object.assign({}, corrente, { giorni: scelta.tipi.concat(corrente.giorni.slice(tipi.length)) });
    }
  }
  brief.agenda.indiciGiorni = indici;
  return indici;
}

/* ---- 12. il metodo famoso scelto decide serie, ripetizioni e pause; il «tocco» preso da un altro; le superserie che il metodo impone ---- */
function applicaMetodo(brief, sedute) {
  const chi = brief.chi, level = chi.livello, over65 = chi.over65, minore = chi.minorenne, ps = brief.mente.ps, metodoAttivo = brief.metodo.attivo, tocco = brief.metodo.tocco;
  const L = brief.lavoro, prefs = L.prefs, note = L.note, tecnicheOk = tecnicheAlCedimentoAmmesse(brief);
  /* il metodo scelto decide serie, ripetizioni e pause */
  if (metodoAttivo && metodoAttivo.schema) sedute.forEach(sd => sd.esercizi.forEach((e, i) => {
    delete e.tecnica; metodoAttivo.schema(e, i, sd);
    if (isTimeBased(e.name)) e.reps = (findExercise(e.name) || {}).reps || e.reps;
    /* i tetti di sicurezza valgono anche col metodo (revisione dell onda 0): il Nordic Curl al massimo 3 serie da 3-6 ripetizioni; minorenni e over 65 al massimo 3 serie (ETA-02, over 65: 8-12 ripetizioni) */
    if (RX_NORDIC.test(senzaEmoji(e.name))) { e.sets = Math.min(e.sets, PARAM_NORDIC.serieMax); e.reps = ripetizioniFlessione(e.name); }
    if (over65 || minore) { e.sets = Math.min(e.sets, COACH_PARAMETRI.serieMaxPrudente); if (!isTimeBased(e.name) && !RX_NORDIC.test(senzaEmoji(e.name))) e.reps = over65 ? Math.max(8, Math.min(12, e.reps)) : Math.max(8, Math.min(15, e.reps)); }
    /* MAV-02 e MAV-03 anche per i metodi famosi: l AMRAP di GreySkull, GZCLP e Reddit PPL non e per chi inizia, ne per minorenni, over 65 e modalita prudente, ne per core, tempo, peso zero e stacchi */
    if (TECNICHE_AL_CEDIMENTO.indexOf(e.tecnica) !== -1 && (!tecnicheOk || senzaCedimentoPer(e.name, prefs.fastidi))) delete e.tecnica;
  }));
  /* la Recommended Routine mette 3 serie a tutti (schema): l equilibrio tra spinte e tirate si rifa dopo, a casa dove la tirata e il solo rematore inverso (W0-T7) */
  if (metodoAttivo && metodoAttivo.id === 'rr') strBilancia({ sedute: sedute, level: level, over65: over65, note: note, metodoAttivo: metodoAttivo, prefs: prefs }, true);
  if (tocco) sedute.forEach(sd => TOCCHI[tocco.m.tocco].fa(sd, ps, { tecnicheOk: tecnicheOk, senzaCedimento: (n) => senzaCedimentoPer(n, prefs.fastidi) }));
  /* ABB-06 e SS-01: le coppie del metodo sono di muscoli antagonisti e senza un fondamentale pesante (strSuperserie). La Recommended Routine non passa di qui: ha `superserie: false` e le sue coppie
     per MUSCOLO le fa il suo `schema` sull ultimo esercizio (coppiePerMuscolo, metodi-momenti.js, PCO-04, W2-T2); il vecchio ramo «per indice» (Rematore inverso + Ponte glutei, Squat + Piegamenti) e tolto (INT-2b) */
  if (metodoAttivo && metodoAttivo.superserie) sedute.forEach(sd => strSuperserie(sd));
  return sedute;
}

/* regola del picco e della fine: chi non ama la fatica ricorda meglio una seduta che finisce leggera */
function regolaDelPicco(brief, sedute) {
  if (brief.mente.ps.intensita === 'bassa') sedute.forEach(sd => { const u = sd.esercizi[sd.esercizi.length - 1]; if (u && !u.fisso && u.sets > 2) u.sets--; });
  return sedute;
}

/* le note sulle superserie del poco tempo: riconciliaNote le tiene solo se la scheda ha davvero delle coppie (il cancello delle tecniche di W2-T3 le toglie agli over 65 fuori da macchine e cavi) */
const NOTA_POCO_TEMPO_SS = 'Poco tempo: spinte e tirate in superserie (-37% di tempo, stessi risultati).';
const NOTA_POCO_TEMPO_SS_DROP = 'Poco tempo: spinte e tirate in superserie (-37% di tempo, stessi risultati) e drop set sull ultimo isolamento.';
/* INT-2d (M1): la potenza va sul primo multiarticolare ammesso alla macchina, che non e sempre il primo esercizio della seduta (369 programmi su 2.500): «un esercizio alla macchina» */
const NOTA_OVER65_POTENZA = 'Dai 65 anni: 2-3 serie da 8-12, niente cedimento, un esercizio alla macchina veloce in salita per la potenza e 5 minuti di equilibrio a fine seduta.';
const NOTA_OVER65 = 'Dai 65 anni: 2-3 serie da 8-12, niente cedimento e 5 minuti di equilibrio a fine seduta.';
const NOTA_SENZA_CEDIMENTO_SS = 'Per ora niente serie al cedimento: la tecnica viene prima. Per fare prima ti propongo le superserie.';
const NOTA_SENZA_CEDIMENTO = 'Per ora niente serie al cedimento: la tecnica viene prima.';
/* le note che dicono cosa ha fatto il programma, nell ordine di sempre: il ritratto del coach, il corpo, la BIA, il poco tempo, le popolazioni, i passi.
   La nota dei passi segue la fase del corpo (OBI-02): il dimagrimento, in qualunque posizione, e un deficit. */
function noteDelProgramma(brief) {
  const chi = brief.chi, L = brief.lavoro, note = L.note, ps = brief.mente.ps, fis = brief.corpo.fis, metodoAttivo = brief.metodo.attivo;
  const { d, prof0 } = brief.grezzo, poco = brief.agenda.minuti <= 45, tecnicheOk = tecnicheAlCedimentoAmmesse(brief);
  ritrattoCoach(ps).slice(0, 4).forEach(r => note.push(r));
  fis.testi.forEach(t => note.push(t));
  if (!chi.cauto) statoBia(d, prof0).testi.forEach(t => note.push(t));   /* INT-01 */
  /* la nota dice quello che il programma fa davvero (B3, gap analysis: lo leggeva anche chi non ha il drop set o chi non deve andare al cedimento) */
  if (poco && !metodoAttivo) {
    if (L.dropAssegnato) note.push(NOTA_POCO_TEMPO_SS_DROP);
    else note.push(NOTA_POCO_TEMPO_SS);
    if (!tecnicheOk) note.push(NOTA_SENZA_CEDIMENTO_SS);
  }
  if (chi.over65) note.push(L.potenzaAssegnata ? NOTA_OVER65_POTENZA : NOTA_OVER65);
  if (chi.minorenne) {   /* ETA-02 e ETA-03: profilo minorenne */
    note.push('Alla tua età conta imparare bene i movimenti: niente massimali né serie al limite, lascia sempre 2-3 ripetizioni in riserva.');
    note.push('Allenati con un adulto o un istruttore: la tecnica viene prima dei carichi.');
  }
  /* PRG-20 (W2-T2, INT-2b): la nota c e solo se almeno una pausa e davvero scesa sotto quella degli uomini (pausePerClasse la scrive in brief.lavoro.pauseDonneAccorciate: mai con il PAR-Q positivo, con la regola spenta o con un metodo che ha le sue pause) */
  if (chi.donna && brief.lavoro.pauseDonneAccorciate) note.push('Pause un po piu corte: le donne recuperano piu in fretta tra una serie e l altra.');
  if (faseDaObiettivi(brief.obiettivi.lista) === 'deficit') note.push('Passi: 10-12 mila al giorno, aumentandoli di 500-1000 a settimana. Il cardio non toglie muscolo.');
}

/* ---- 14. gli esercizi alternativi scelti dall utente (PRG-39): stessi muscoli, stesso posto ---- */
function applicaScelteUtente(brief, sedute) {
  const scelte = brief.preferenze.scelte;
  if (Object.keys(scelte).length) sedute.forEach(sd => sd.esercizi.forEach(e => {
    const n = scelte[e.name], m = n ? findExercise(n) : null;
    if (!m || sd.esercizi.some(x => x !== e && x.name === n)) return;
    e.originale = e.name; e.name = n; e.weight = m.weight || 0;
  }));
  return sedute;
}

/* le chiusure: i tetti che valgono qualunque passo abbia aggiunto serie, le note di sicurezza e il carico ridotto richiesto dal metodo */
function chiudiProgramma(brief, sedute) {
  const note = brief.lavoro.note;
  /* B1 (revisione dell onda 0): il tetto del Nordic Curl vale alla fine, qualunque passo abbia aggiunto serie (volume per muscolo, riempimento del tempo, metodo): 3 serie da 3-6 ripetizioni */
  sedute.forEach(sd => sd.esercizi.forEach(e => { if (RX_NORDIC.test(senzaEmoji(e.name))) { e.sets = Math.min(e.sets, PARAM_NORDIC.serieMax); e.reps = Math.min(e.reps, PARAM_NORDIC.ripetizioniMax); } }));
  sedute.forEach(sd => sd.esercizi.forEach(e => { delete e.protetto; delete e.riservaTirataV; }));   /* ABB-03: serviva solo a non tagliare le aggiunte per il tempo */
  /* W0-T7 (decisione del committente, SAF-04): il rematore inverso e l unica tirata orizzontale senza attrezzi e resta anche a casa, con la nota che dice dove farlo e la prudenza sul tavolo */
  if (sedute.some(sd => sd.esercizi.some(e => /rematore inverso/i.test(senzaEmoji(e.name))))) note.push(NOTA_REMATORE_INVERSO);
  /* carico ridotto richiesto dal metodo (es. 8x8 col 70% del carico delle 8 ripetizioni), dopo la stima dai dati del corpo */
  sedute.forEach(sd => sd.esercizi.forEach(e => {
    if (!e.fattoreCarico) return;
    const m = findExercise(e.name);
    if (m && e.weight > 0) e.weight = arrotondaPartenza(m, e.weight * e.fattoreCarico);
    delete e.fattoreCarico;
  }));
  return sedute;
}

/* ---- 17. la verifica finale (REG-02): chiama i controlli che esistono; ognuno ritorna le note (testi) di cio che non ha potuto riparare.
   Oggi c e solo validaVolume (di W1-T4, non fa niente): ogni onda aggiunge il suo (validaTempo, validaTecniche, validaSicurezza). ---- */
/* REG-02 (INT-2b): le note dicono quello che il programma fa DAVVERO, non quello che uno stadio prima aveva in mente. Gli stadi scrivono la nota quando agiscono (completaSettimana, il volume) e un
   passo dopo (il taglio per il tempo, il volume, le scelte dell utente) puo togliere o cambiare l esercizio: la nota «Aggiunto: Pullover con Manubrio» restava con il pullover tolto dai 30 minuti, e
   «senza leg curl restano meno allenati» con il leg curl con l asciugamano in scheda. Qui, alla fine: (1) via «Aggiunto: X» se X non e nella scheda (ne con il suo nome ne con quello originale
   di una scelta dell utente); (2) via la nota del ponte glutei se c e una flessione del ginocchio, e quella «serve la flessione» se non c e; (3) senza nessuna coppia: via le note «in superserie» del poco tempo, e le due frasi che le nominano (principianti, taglio per il tempo) senza la parte delle coppie;
   (4) via le note delle aggiunte regionali (polpacci, deltoidi posteriori, bicipiti, tricipiti, core, retto femorale, spalle larghe) se l esercizio che nominano non c e piu; (5) niente note identiche due volte */
/* le note delle aggiunte regionali (strCopri in struttura-pro.js, completaSettimana in completamenti.js): ognuna dice che un tipo di esercizio e in scheda; se un passo dopo l ha tolto (il taglio per il tempo,
   il solutore del volume) la nota mente: «Polpacci: ... un esercizio dedicato a settimana» con 0 serie di polpacci. Il prefisso e la prova: e la stessa che usano le due funzioni che le scrivono */
const NOTE_REGIONALI = [
  ['Polpacci: squat e stacchi', e => /calf raise/i.test(senzaEmoji(e.name))],
  ['Deltoidi posteriori: le spinte', e => STR_TIRATE_ALTE.test(senzaEmoji(e.name))],
  ['Bicipiti: un curl a settimana', e => strMeta(e).group === 'braccia' && strSub(e) === 'Bicipiti'],
  ['Tricipiti: un esercizio diretto', e => strMeta(e).group === 'braccia' && strSub(e) === 'Tricipiti' && strMeta(e).type !== 'compound'],
  ['Core: un esercizio a fine seduta', e => strMeta(e).group === 'core'],
  ['Retto femorale: cresce solo con la leg extension', e => /leg extension/i.test(senzaEmoji(e.name))],
  ['Spalle larghe: la panca copre', e => /alzate laterali/i.test(senzaEmoji(e.name))]
];
function riconciliaNote(prog) {
  const nomi = [];
  prog.sedute.forEach(sd => sd.esercizi.forEach(e => { nomi.push(senzaEmoji(e.name)); if (e.originale) nomi.push(senzaEmoji(e.originale)); }));
  const flessione = nomi.some(n => /leg curl|nordic/i.test(n)), viste = {}, haCoppie = prog.sedute.some(sd => sd.esercizi.some(e => e.superset));
  /* INT-2d (M1): le note sulle tecniche dicono cosa c e nella scheda FINALE: «drop set sull ultimo isolamento» solo se un drop set e su un isolamento (classi D ed E; un passo dopo, validaTecniche, puo averlo tolto),
     «un esercizio alla macchina veloce in salita» solo se un esercizio ha la potenza */
  const haDrop = prog.sedute.some(sd => sd.esercizi.some(e => e.tecnica === 'drop' && ['D', 'E'].indexOf(classeTecnica(e.name)) !== -1));
  const haPotenza = prog.sedute.some(sd => sd.esercizi.some(e => e.tecnica === 'potenza'));
  /* senza coppie la nota dei principianti resta solo con la prima meta, e la frase del taglio per il tempo non dice «abbinato esercizi opposti» */
  prog.note = prog.note.map(testo => !haCoppie && testo === NOTA_SENZA_CEDIMENTO_SS ? NOTA_SENZA_CEDIMENTO
    : !haDrop && testo === NOTA_POCO_TEMPO_SS_DROP ? NOTA_POCO_TEMPO_SS
    : !haPotenza && testo === NOTA_OVER65_POTENZA ? NOTA_OVER65
    : !haCoppie && typeof FRASE_TAGLIO_TEMPO !== 'undefined' && testo === FRASE_TAGLIO_TEMPO ? FRASE_TAGLIO_TEMPO_SENZA_COPPIE : testo).filter(testo => {
    const t = String(testo), m = /^Aggiunto: (.+?) \u2014 /.exec(t);
    if (viste[t]) return false;
    viste[t] = true;
    if (m && nomi.indexOf(m[1]) === -1) return false;
    const regionale = NOTE_REGIONALI.find(r => t.indexOf(r[0]) === 0);
    if (regionale && !prog.sedute.some(sd => sd.esercizi.some(regionale[1]))) return false;   /* l esercizio che la nota nomina non c e piu */
    if (!haCoppie && (t === NOTA_POCO_TEMPO_SS || t === NOTA_POCO_TEMPO_SS_DROP)) return false;   /* «in superserie» senza nessuna coppia: la nota mentiva */
    if (t === NOTA_FEMORALI_SENZA_LEG_CURL) return !flessione;
    if (t === NOTA_FEMORALI_SERVE_FLESSIONE) return flessione;
    if (typeof NOTA_FEMORALI_TEMPO !== 'undefined' && t === NOTA_FEMORALI_TEMPO) return !flessione;   /* INT-2b: il taglio per il tempo ha tolto l unica flessione; se un passo dopo l ha rimessa la nota mentirebbe */
    return true;
  });
  /* INT-2d (M2): la seconda nota dei sei giorni di fila (le 48 ore) solo se la scheda finale le rispetta, anche attraverso il lunedi */
  const k = prog.note.indexOf(NOTA_SEI_GIORNI_DI_FILA);
  if (k !== -1 && recuperoRispettato(prog.sedute) && prog.note.indexOf(NOTA_SEI_GIORNI_48_ORE) === -1) prog.note.splice(k + 1, 0, NOTA_SEI_GIORNI_48_ORE);
  return prog;
}
function verificaProgramma(brief, prog) {
  const esiti = [];
  if (typeof validaVolume === 'function') esiti.push(validaVolume(brief, prog.sedute));
  if (typeof validaTempo === 'function') esiti.push(validaTempo(brief, prog.sedute));
  if (typeof validaTecniche === 'function') esiti.push(validaTecniche(brief, prog.sedute));
  if (typeof validaSicurezza === 'function') esiti.push(validaSicurezza(brief, prog.sedute));
  esiti.forEach(r => { if (Array.isArray(r)) r.forEach(t => prog.note.push(t)); });
  return riconciliaNote(prog);
}

/* INT-2b (velocità): mentre il generatore lavora le funzioni che dipendono solo dal nome di un esercizio (findExercise, senzaEmoji, dettaglioEsercizio, schemaDi, strChiave,
   creditoSerie, tipoCarico, consentito, regolaAttiva...) si calcolano una volta per nome (js/core/memoria-chiamata.js); la memoria si chiude sempre, anche con un errore (ETA-01) */
window.buildProgram = function(d) {
  memoriaApri();
  try { return generaProgramma(d); } finally { memoriaChiudi(); }
};
function generaProgramma(d) {
  const prof0 = (typeof getProfile === 'function' && d !== undefined && d.usaProfilo !== false && d === onbData) ? (getProfile() || {}) : {};
  const brief = briefCoach(d, prof0);                                  /* 1 (lancia l errore dell eta sotto i 13 anni: ETA-01) */
  brief.sicurezza.vincoli = vincoliSicurezza(brief);                    /* 2 */
  risolviMetodo(brief);
  const L = brief.lavoro;
  L.prefs = prefsDelBrief(brief);
  const spec = specialitaStruttura(brief);                              /* 3 */
  const mesociclo = pianoMesociclo(brief);                              /* 4 */
  let split = (spec && spec.split) || scegliSplit(brief);               /* 5 */
  const metodoAttivo = brief.metodo.attivo;
  if (metodoAttivo && metodoAttivo.split && !brief.agenda.freqScelta) split = metodoAttivo.split(d.days);
  L.split = split;
  L.nEs = numeroEsercizi(brief);
  giorniSettimana(brief, split);
  split = L.split;                                                      /* 5: con 6 giorni puo aver riordinato o ridotto le sedute (giorni di fila) */
  const sedute = componiSedute(brief, split);                           /* 6 */
  prescriviSerie(brief, sedute);                                        /* 8 */
  if (spec && typeof spec.sedute === 'function') spec.sedute(brief, sedute);   /* 3: la modalita (forza, W2-T7) scrive le sue alzate dopo la prescrizione, prima dei completamenti */
  completaSettimana(brief, sedute);                                     /* 7 */
  assegnaVolume(brief, sedute);                                         /* 9: volume per muscolo e tetto per seduta */
  /* ABB-04 e ABB-08: tirate non meno delle spinte, il fondamentale non ha meno serie degli altri */
  strBilancia({ sedute: sedute, level: brief.chi.livello, over65: brief.chi.over65, note: L.note, metodoAttivo: metodoAttivo, prefs: L.prefs, puoSalire: (e) => puoSalireVolume(brief, sedute, e) });   /* INT-2b: la tirata sale solo dentro il massimo di B6 */
  noteVolume(brief);
  limitaVolume(brief, sedute);                                          /* 9: tetti dopo la struttura */
  adattaAlTempo(brief, sedute);                                         /* 10 */
  /* ABB-08 e ABB-09: a tempo sistemato, il fondamentale ha le sue serie e gli stacchi da terra restano a 3 al massimo */
  strFinale({ sedute: sedute, level: brief.chi.livello, over65: brief.chi.over65, metodoAttivo: metodoAttivo });                                   /* 11 */
  strBilancia({ sedute: sedute, level: brief.chi.livello, over65: brief.chi.over65, note: L.note, metodoAttivo: metodoAttivo, prefs: L.prefs }, true);   /* il tempo e le serie spostate possono aver rotto l equilibrio: niente serie in piu */
  rifinisciAlTempo(brief, sedute);                                      /* 10 (ultimo giro) */
  ordinaSedute(brief, sedute);                                          /* 11b */
  assegnaTecniche(brief, sedute);                                       /* 13 */
  applicaMetodo(brief, sedute);                                         /* 12 */
  regolaDelPicco(brief, sedute);
  noteDelProgramma(brief);
  mesociclo.note.forEach(n => L.note.push(n));                          /* 4: la nota del mesociclo va dove stava, dopo le altre */
  applicaScelteUtente(brief, sedute);                                   /* 14 */
  applicaPartenze(brief, sedute);                                       /* 15 */
  chiudiProgramma(brief, sedute);

  const prog = {
    goals: brief.obiettivi.dichiarati, scheme: brief.obiettivi.scheme, split: split, sedute: sedute, prefs: L.prefs,
    metodo: metodoAttivo ? metodoAttivo.id : null, ispirazioni: brief.metodo.ispirazioni, fisico: brief.corpo.fis,
    sostituzioni: L.sostituzioni, note: L.note,
    riposo: DAYS.filter(g => !sedute.some(s => s.giorno === g)),
    settimane: mesociclo.struttura.settimane, blocco: mesociclo.struttura.blocco, fasi: mesociclo.fasi, rirSett: mesociclo.rirSett,
    eserciziPerSeduta: L.nEs, seme: brief.seme
  };
  /* W2-T4: i programmi v2 portano il piano del mesociclo e la versione (alternative.js li salva); senza il piano (soglie-struttura.js assente) restano come la v1 */
  if (mesociclo.piano) Object.assign(prog, { versione: 2, piano: mesociclo.piano, perche: brief.perche, modalita: brief.obiettivi.modalita });
  return verificaProgramma(brief, prog);                                /* 17 */
}
