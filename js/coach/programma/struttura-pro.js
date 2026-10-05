/* Struttura professionale della scheda (ABB-01..10)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   STRUTTURA PROFESSIONALE DELLA SCHEDA
   Cio che un buon coach controlla dopo aver scelto gli esercizi: l ordine
   dentro la seduta, che non ci siano due esercizi che fanno lo stesso lavoro,
   che ogni settimana non manchi nulla, che spinte e tirate si equilibrino e
   che le superserie siano solo tra muscoli antagonisti. Le prove stanno in
   docs/ricerca-struttura-e-intensita.md; i codici in docs/coach-mappa-regole.md.
   ABB-01 ordine: fondamentale, poi macchine, poi isolamenti, il core in fondo (ACSM 2009, Nunes 2021)
   ABB-02 niente esercizi doppi nella stessa seduta (stesso muscolo, stessa parte, stesso tipo)
   ABB-03 copertura della settimana: polpacci, deltoidi posteriori, core, braccia dirette
   ABB-04 tirate non meno delle spinte (convenzione dei coach, spalle in equilibrio): serie, poi cambio di un doppione
   ABB-05 3 giorni per intermedi e avanzati: Upper / Lower / Full Body, ogni muscolo 2 volte (ACSM 2026, Pelland 2025); vive in splitFor (onboarding.js)
   ABB-06 superserie solo tra antagonisti e mai con un fondamentale pesante (Paz 2017, meta-analisi 2025)
   ABB-07 due giorni di fila: al massimo un giorno con carico pesante sulla schiena
   ABB-08 il fondamentale non ha meno serie degli altri multiarticolari della seduta
   ABB-09 gli stacchi da terra al massimo 3 serie (rapporto stimolo/fatica)
   ABB-10 a parita di tipo, il muscolo prioritario per primo (principio della priorita di Arnold, Nunes 2021)
   ============================================================ */

const STR_PESI = { tettoSerieSeduta: 5, tettoSerieBilancio: 4, tirateSuSpinte: 0.9, minSerieBilancio: 8 };

function strMeta(e) { return findExercise(e.name) || {}; }
function strSub(e) { const d = dettaglioEsercizio(e.name); return d ? d.sub : ''; }
function strSchiena(nome) { return SCHIENA_PESANTE.test(nome) || /Stacco Rumeno/.test(nome); }

/* ABB-01: 0 multiarticolari (prima i pesanti), 1 isolamenti dei grandi muscoli, 2 dei piccoli, 3 core */
function strTier(e) {
  const m = strMeta(e);
  if (m.group === 'core') return 3;
  if (m.type === 'compound') return 0;
  if (['petto', 'schiena', 'gambe', 'glutei'].indexOf(m.group) !== -1 && strSub(e) !== 'Polpacci' && strSub(e) !== 'Adduttori' && strSub(e) !== 'Medio gluteo') return 1;
  return 2;
}
function strRango(e) { const t = strTier(e); return t * 10 + (t === 0 && tipoCarico(e.name) !== 'pesante' ? 1 : 0); }
/* ordina una lista di esercizi (con almeno `name`); i giorni dei punti deboli restano nell ordine di priorita dell utente */
/* ABB-10: a parita di tipo, il muscolo prioritario per primo (principio della priorita di Arnold: si allena per primo cio che si vuole far crescere;
   la forza e il lavoro migliorano di piu negli esercizi fatti all inizio, Nunes 2021) */
window.strOrdina = function(lista, tipoGiorno, priorita) {
  if (tipoGiorno === 'punti') return lista;
  const pos = new Map(lista.map((e, i) => [e, i]));
  const prio = (e) => ((priorita || []).indexOf(strMeta(e).group) !== -1 ? 0 : 1);
  return lista.sort((a, b) => strRango(a) - strRango(b) || prio(a) - prio(b) || pos.get(a) - pos.get(b));
};

/* ABB-02: due esercizi dello stesso gruppo, della stessa parte e dello stesso tipo fanno lo stesso lavoro.
   Fanno eccezione lo squat (macchina dopo il bilanciere: 2), i glutei multiarticolari (2) e i curl o le estensioni per le braccia (2: uno allungato, uno accorciato). */
function strChiave(e) {
  const m = strMeta(e), d = dettaglioEsercizio(e.name) || {};
  return [m.group, d.sub, m.type, schemaDi(e.name) || ''].join('|');
}
window.strRidondante = function(x, base) {
  if (!dettaglioEsercizio(x.name)) return false;
  const k = strChiave(x);
  const ammessi = /^gambe\|Multiarticolari\|compound\|squat$/.test(k) || /^glutei\|Glutei\|compound\|/.test(k) || /^braccia\|(Bicipiti|Tricipiti)\|isolation\|$/.test(k) ? 2 : 1;
  return base.filter(y => strChiave(y) === k).length >= ammessi;
};

/* contare le serie di spinta e di tirata della settimana */
function strSerie(sedute, filtro) {
  return sedute.reduce((t, sd) => t + sd.esercizi.reduce((a, e) => a + (!isTimeBased(e.name) && filtro(e) ? e.sets : 0), 0), 0);
}
/* ABB-09: gli stacchi da terra costano molta fatica per lo stimolo che danno (rapporto stimolo/fatica, Israetel, Helms): al massimo 3 serie */
const STR_FATICA = /Stacco da Terra|Stacco Sumo|Stacco con Trap Bar|Good Morning/;
const STR_TIRATE_ALTE = /face pull|reverse|alzate posteriori|y-raise/i;
function strEspinta(e) { const s = schemaDi(e.name); return s === 'spintaO' || s === 'spintaV'; }
/* W0-T7: il pullover coi manubri (riserva della tirata verticale a casa, CAS-14, D-P11) e una tirata a tutti gli effetti dell equilibrio (come nel collaudo): schemaDi non lo conta (SCHEMI_RISERVA) */
function strEtirata(e) { const s = schemaDi(e.name); return s === 'tirataO' || s === 'tirataV' || STR_TIRATE_ALTE.test(senzaEmoji(e.name)) || SCHEMI_RISERVA.test(senzaEmoji(e.name)); }

/* ABB-03: ogni settimana nessun buco. Le aggiunte non si tolgono per far stare la seduta nel tempo (protetto). */
window.strCopri = function(c) {
  const sedute = c.sedute;
  if (!sedute.length || (c.metodoAttivo && c.metodoAttivo.essenziale)) return;
  const ipert = c.goals.indexOf('massa') !== -1 || c.goals.indexOf('ricomposizione') !== -1;
  const ha = (rx) => sedute.some(sd => sd.esercizi.some(e => rx.test(senzaEmoji(e.name))));
  const conGambe = sedute.some(sd => /lower|legs|fullbody/.test(sd.tipo));
  const aggiungi = (nomi, dove, testo, sets, repsDefault) => {
    const nome = nomi.map(nomeInLibreria).find(n => n && consentito(n, c.prefs));
    if (!nome) return false;
    const sd = sedute.filter(dove).filter(s => !s.esercizi.some(e => e.name === nome) && s.esercizi.length <= c.nEs + 1)   /* la seduta puo crescere di due esercizi piccoli: il tempo si recupera dopo, tagliando serie */
      .sort((a, b) => a.esercizi.length - b.esercizi.length)[0];
    if (!sd) return false;
    const m = findExercise(nome) || {};
    sd.esercizi.push({ name: nome, sets: sets, reps: isTimeBased(nome) ? (m.reps || 30) : (m.reps && m.reps > 8 ? m.reps : repsDefault), weight: m.weight || 0, rest: 75, protetto: true });
    c.note.push(testo);
    return true;
  };
  const tipoDi = (rx) => (sd) => rx.test(sd.tipo);
  /* W0-T7: il buco si guarda dopo i tagli, non solo prima. Un esercizio che copre da solo il buco della settimana (un solo calf raise, un solo lavoro per i deltoidi posteriori,
     il solo curl, il solo tricipite diretto, il solo core) si protegge come le aggiunte: il taglio per il tempo e per il numero di esercizi toglie un altro isolamento, non lui
     (prima la ricetta aveva il calf raise, strCopri non aggiungeva niente e il taglio lo toglieva: polpacci assenti, collaudo MIS-01, ABB-03) */
  const proteggi = (filtro) => { const e = [].concat.apply([], sedute.map(sd => sd.esercizi.filter(filtro))).pop(); if (e) e.protetto = true; };
  if (ipert && c.level !== 'principiante' && c.days >= 3 && c.goals[0] !== 'salute') {
    if (conGambe && !ha(/calf raise/i))
      aggiungi(['Calf Raise in Piedi', 'Calf Raise Seduto', 'Calf Raise alla Leg Press', 'Calf Raise a un Piede (Corpo Libero)'], tipoDi(/lower|legs|fullbody/),
        'Polpacci: squat e stacchi li allenano poco, un esercizio dedicato a settimana.', 3, 15);
    else proteggi(e => /calf raise/i.test(senzaEmoji(e.name)));
    if (sedute.some(sd => sd.esercizi.some(strEspinta)) && !ha(STR_TIRATE_ALTE))
      aggiungi(['Reverse Pec Deck', 'Face Pull', 'Alzate Posteriori (Reverse Fly)', 'Y-Raise su Panca Inclinata'], tipoDi(/pull|upper|fullbody|punti/),
        'Deltoidi posteriori: le spinte lavorano la parte davanti della spalla, qui si bilancia il dietro.', 2, 15);
    else proteggi(e => STR_TIRATE_ALTE.test(senzaEmoji(e.name)));
  }
  if (ipert && c.level !== 'principiante' && c.days >= 4 && c.goals[0] !== 'salute') {
    const bic = e => strMeta(e).group === 'braccia' && strSub(e) === 'Bicipiti', tri = e => strMeta(e).group === 'braccia' && strSub(e) === 'Tricipiti' && strMeta(e).type !== 'compound';
    if (!sedute.some(sd => sd.esercizi.some(bic)))
      aggiungi(['Curl su Panca Inclinata', 'Curl Bayesiano ai Cavi', 'Curl con Bilanciere EZ', 'Curl Bilanciere Bicipiti', 'Hammer Curl'], tipoDi(/pull|upper|fullbody|punti/),
        'Bicipiti: un curl a settimana, oltre al lavoro delle tirate.', 2, 12);
    else proteggi(bic);
    if (!sedute.some(sd => sd.esercizi.some(tri)))
      aggiungi(['Estensione Tricipiti sopra la Testa ai Cavi', 'Pushdown con Corda', 'Estensione Tricipiti sopra la Testa con Manubrio', 'French Press'], tipoDi(/push|upper|fullbody|punti/),
        'Tricipiti: un esercizio diretto a settimana, oltre al lavoro delle spinte.', 2, 12);
    else proteggi(tri);
  }
  /* il core vale anche per la salute (revisione dell onda 0, collaudo MIS-01:core): la stabilita del tronco e proprio un obiettivo di chi si allena per stare bene */
  if (c.days >= 3) {
    if (!sedute.some(sd => sd.esercizi.some(e => strMeta(e).group === 'core'))) {
      const prudente = c.level === 'principiante';
      aggiungi(prudente ? ['Dead Bug', 'Plank', 'Crunch a Terra'] : ['Pallof Press', 'Crunch al Cavo', 'Plank', 'Dead Bug', 'Crunch a Terra'], () => true,
        'Core: un esercizio a fine seduta, per la stabilità del tronco.', 2, 12);
    } else proteggi(e => strMeta(e).group === 'core');
  }
  sedute.forEach(sd => strOrdina(sd.esercizi, sd.tipo, c.prefs.priorita));
};

/* ABB-04: le tirate non meno del 90% delle spinte. Si chiama due volte: dopo il volume per muscolo (si puo alzare una tirata)
   e dopo il taglio per il tempo (`senzaSu`: il tempo e gia contato, niente serie in piu).
   Ordine: +1 serie a una tirata (al massimo 4, 3 per principianti e over 65), -1 a una spinta (minimo 2) e solo alla fine
   una spinta doppione (lo stesso schema due volte nella stessa seduta) diventa una tirata dello stesso tipo di carico. */
window.strBilancia = function(c, senzaSu) {
  const sedute = c.sedute;
  if (c.metodoAttivo && c.metodoAttivo.id !== 'rr') return;   /* W0-T7: la Recommended Routine a casa ha una tirata sola (il rematore inverso, senza trazioni: CAS-01): l equilibrio vale anche per lei */
  const cap = (c.level === 'principiante' || c.over65) ? COACH_PARAMETRI.serieMaxPrudente : STR_PESI.tettoSerieBilancio;
  const tutti = () => [].concat.apply([], sedute.map(sd => sd.esercizi.map(e => ({ sd: sd, e: e }))));
  const spinte = () => strSerie(sedute, strEspinta), tirate = () => strSerie(sedute, strEtirata);
  const sbilanciata = () => spinte() + tirate() >= STR_PESI.minSerieBilancio && tirate() < spinte() * STR_PESI.tirateSuSpinte;
  const primi = () => sedute.map(sd => sd.esercizi.filter(e => strMeta(e).type === 'compound' && !isTimeBased(e.name))[0]);
  /* W0-T7: a corpo libero la tirata e una sola, il rematore inverso (tetto `cap` serie, niente da convertire): non si puo alzare ne sostituire. Si toglie allora una spinta intera
     (prima la verticale, poi quella delle sedute con piu spinte), mai l unica spinta di una seduta, mai il fondamentale, mai l ultima spinta di uno schema nella settimana (PAT-01) */
  const piuSpinte = (x) => x.sd.esercizi.filter(strEspinta).length, abbondante = (x) => x.sd.esercizi.length > PARAM_NUMERO_ESERCIZI.min;
  const unicoNellaSettimana = (x) => tutti().filter(z => schemaDi(z.e.name) === schemaDi(x.e.name)).length < 2;
  /* il petto resta in almeno due sedute (frequenza 2, ACSM 2026): non si toglie la spinta di petto che lo tiene in una seduta quando e l unica altra */
  const seduteConPetto = (senza) => sedute.filter(sd => sd.esercizi.some(e => e !== senza && strEspinta(e) && strMeta(e).group === 'petto')).length;
  const tienePetto = (x) => strMeta(x.e).group === 'petto' && sedute.length > 1 && seduteConPetto(x.e) < Math.min(2, sedute.length);
  const spintaDaTogliere = (soloAbbondanti) => { const pr = primi(); return tutti().filter(x => strEspinta(x.e) && !x.e.fisso && !x.e.protetto && !isTimeBased(x.e.name) && pr.indexOf(x.e) === -1 && piuSpinte(x) > 1 && !unicoNellaSettimana(x) && !tienePetto(x) && (!soloAbbondanti || abbondante(x)))
    .sort((a, b) => abbondante(b) - abbondante(a) || (schemaDi(b.e.name) === 'spintaV') - (schemaDi(a.e.name) === 'spintaV') || piuSpinte(b) - piuSpinte(a) || a.e.sets - b.e.sets)[0]; };
  let giri = 0, mosso = false, rimossa = false;
  while (sbilanciata() && giri++ < 12) {
    const su = senzaSu ? null : tutti().map(x => x.e).filter(e => strEtirata(e) && !e.fisso && !isTimeBased(e.name) && e.sets < cap).sort((a, b) => a.sets - b.sets)[0];
    if (su) { su.sets++; mosso = true; continue; }
    /* si toglie una serie alla spinta con piu serie, ma non al fondamentale della seduta (ABB-08) */
    const pr = primi();
    const giu = tutti().map(x => x.e).filter(e => strEspinta(e) && !e.fisso && e.sets > 2 && pr.indexOf(e) === -1).sort((a, b) => b.sets - a.sets)[0];
    if (giu) { giu.sets--; mosso = true; continue; }
    /* ne su ne giu: un doppione di spinta diventa una tirata (prima lo stesso piano, verticale o orizzontale, poi l altro) */
    let fatto = false;
    /* doppione vero: lo stesso schema due volte nella stessa seduta; sedute diverse sono la frequenza 2 (ACSM 2026) e non si toccano */
    const doppione = (x) => x.sd.esercizi.filter(z => schemaDi(z.name) === schemaDi(x.e.name)).length >= 2;
    tutti().filter(x => !x.e.fisso && !x.e.protetto && strEspinta(x.e) && doppione(x)).reverse().some(x => {
      const tipo = tipoCarico(x.e.name), stesso = schemaDi(x.e.name) === 'spintaV' ? 'tirataV' : 'tirataO';
      const nuovo = EXERCISE_LIBRARY.filter(y => (SLOT_DEF.tirataV(y) || SLOT_DEF.tirataO(y)) && tipoCarico(y.name) === tipo && consentito(y.name, c.prefs) && !x.sd.esercizi.some(z => z.name === y.name))
        .sort((a, b) => (strRidondante(a, x.sd.esercizi) - strRidondante(b, x.sd.esercizi)) || (SLOT_DEF[stesso](b) - SLOT_DEF[stesso](a)) ||
          ((PRIORI[senzaEmoji(b.name)] || 0) - (PRIORI[senzaEmoji(a.name)] || 0)) || (a.name < b.name ? -1 : 1))[0];
      if (!nuovo) return false;
      x.e.name = nuovo.name; x.e.weight = nuovo.weight || 0; delete x.e.superset;
      fatto = true; return true;
    });
    if (!fatto) {
      const via = spintaDaTogliere(false);
      if (via) {
        const lista = via.sd.esercizi, i = lista.indexOf(via.e);
        if (abbondante(via)) { lista.splice(i, 1); fatto = true; rimossa = true; }
        else {   /* la seduta ha gia il minimo di esercizi: la spinta in piu lascia il posto a un esercizio di core (uno solo per seduta) */
          const nome = strCoreNuovo(via.sd, c.prefs);
          if (nome) { const m = findExercise(nome) || {}; lista.splice(i, 1, { name: nome, sets: 2, reps: isTimeBased(nome) ? (m.reps || 30) : 12, weight: m.weight || 0, rest: 60, protetto: true }); strOrdina(lista, via.sd.tipo, c.prefs.priorita); fatto = true; rimossa = true; }   /* ABB-01: il core in fondo */
        }
      }
    }
    if (!fatto) break;
    mosso = true;
  }
  /* una spinta intera tolta: in ogni seduta resta una spinta sola, con le sue 3 serie (meglio una spinta da 3 serie che due da 2: il tricipite lavora nelle spinte e sotto le 1,5 serie
     frazionarie per seduta non conta, collaudo FRQ-01). Le spinte che restano riprendono serie, fino a 3, finche l equilibrio regge */
  if (rimossa) {
    for (let g = 0; g < 8; g++) { const via = spintaDaTogliere(true); if (!via) break; via.sd.esercizi.splice(via.sd.esercizi.indexOf(via.e), 1); }
    for (let g = 0; g < 12; g++) {
      if (tirate() < (spinte() + 1) * STR_PESI.tirateSuSpinte) break;
      const e = tutti().map(x => x.e).filter(x => strEspinta(x) && !x.fisso && !isTimeBased(x.name) && x.sets < Math.min(cap, 3)).sort((a, b) => a.sets - b.sets)[0];
      if (!e) break;
      e.sets++;
    }
  }
  if (mosso && c.note.indexOf(STR_NOTA_TIRATE) === -1) c.note.push(STR_NOTA_TIRATE);
};
/* il core meglio classificato (PRIORI) che la seduta non ha gia: uno solo per seduta; null se non ce n e (W0-T7) */
function strCoreNuovo(sd, prefs) {
  if (sd.esercizi.some(e => strMeta(e).group === 'core')) return null;
  const c = EXERCISE_LIBRARY.filter(x => x.group === 'core' && consentito(x.name, prefs)).sort((a, b) => (PRIORI[senzaEmoji(b.name)] || 0) - (PRIORI[senzaEmoji(a.name)] || 0) || (a.name < b.name ? -1 : 1))[0];
  return c ? c.name : null;
}
const STR_NOTA_TIRATE = 'Spinte e tirate: le serie di tirata non sono meno di quelle di spinta, per tenere le spalle in equilibrio.';

/* ABB-08 e ABB-09: alla fine, quando il tempo ha gia tagliato le serie.
   Il fondamentale non ha meno serie degli altri multiarticolari non pesanti (le serie si spostano, non si aggiungono);
   gli stacchi da terra restano a 3 serie al massimo. */
window.strFinale = function(c) {
  if (c.metodoAttivo) return;
  const cap = (c.level === 'principiante' || c.over65) ? COACH_PARAMETRI.serieMaxPrudente : STR_PESI.tettoSerieSeduta;
  c.sedute.forEach(sd => {
    sd.esercizi.forEach(e => { if (!e.fisso && STR_FATICA.test(e.name) && e.sets > 3) e.sets = 3; });
    const comp = sd.esercizi.filter(e => strMeta(e).type === 'compound' && !isTimeBased(e.name));
    const primo = comp[0];
    if (!primo || primo.fisso || tipoCarico(primo.name) !== 'pesante' || STR_FATICA.test(primo.name)) return;
    let g = 0;
    while (g++ < 4) {
      const altro = comp.slice(1).filter(e => !e.fisso && tipoCarico(e.name) !== 'pesante' && e.sets > primo.sets && e.sets > 2).sort((a, b) => b.sets - a.sets)[0];   /* un altro fondamentale pesante (forza) puo avere le sue serie */
      if (!altro || primo.sets >= cap) break;
      primo.sets++; altro.sets--;
    }
  });
};

/* ABB-06: superserie solo tra antagonisti, mai con un fondamentale pesante, mai tra esercizi a tempo o di core */
function strAntagonisti(a, b) {
  const sa = schemaDi(a.name), sb = schemaDi(b.name);
  if (sa && sb && ((/spinta/.test(sa) && /tirata/.test(sb)) || (/tirata/.test(sa) && /spinta/.test(sb)))) return true;
  const ga = strMeta(a).group, gb = strMeta(b).group;
  if ((ga === 'petto' && gb === 'schiena') || (ga === 'schiena' && gb === 'petto')) return true;
  const ua = strSub(a), ub = strSub(b);
  return (ua === 'Bicipiti' && ub === 'Tricipiti') || (ua === 'Tricipiti' && ub === 'Bicipiti') || (ua === 'Quadricipiti' && ub === 'Femorali') || (ua === 'Femorali' && ub === 'Quadricipiti');
}
function strPuoSuperserie(e) { return !isTimeBased(e.name) && strMeta(e).group !== 'core' && tipoCarico(e.name) !== 'pesante'; }
/* mette in coppia (adiacenti, il secondo col segno `superset`) gli antagonisti; ritorna quante coppie */
window.strSuperserie = function(sd, max) {
  const es = sd.esercizi;
  es.forEach(e => { delete e.superset; });
  let coppie = 0;
  for (let i = 0; i < es.length - 1 && coppie < (max || 99); i++) {
    if (!strPuoSuperserie(es[i])) continue;
    let j = -1;
    for (let k = i + 1; k <= Math.min(es.length - 1, i + 3); k++) {
      /* stesso numero di serie (W0-T7, collaudo DUR-01): il modello del tempo conta tanti giri quanti ne fa l esercizio con piu serie, e una coppia 5+2 sovrastima i minuti */
      if (strPuoSuperserie(es[k]) && strAntagonisti(es[i], es[k]) && strTier(es[i]) === strTier(es[k]) && es[i].sets === es[k].sets) { j = k; break; }
    }
    if (j === -1) continue;
    if (j > i + 1) es.splice(i + 1, 0, es.splice(j, 1)[0]);
    es[i + 1].superset = true;
    coppie++; i++;
  }
  return coppie;
};
