/* Mesociclo: durata, blocchi, rampa di volume, RIR per settimana e scarico (MES-01..03, PRN-03, OBI-03, PRG-01, PRG-38)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   MESOCICLO (piano coach v2, B.3 stadio 4; W1-T4, riscritto da W2-T4)
   pianoMesociclo(brief) decide quante settimane dura il programma, dove stanno gli scarichi e, settimana per settimana, il fattore di
   volume (la rampa), il RIR per classe di esercizio, le serie e le ripetizioni di chi comincia, la dose dello scarico e cosa passa al
   blocco dopo. Il risultato va in prog.piano (versione 2); fasi e rirSett restano per chi li legge ancora.
   Livelli (registro coach v2 B4, B5; numeri in soglie-struttura.js):
   - principiante non prudente (PRN-03): 12 settimane, settimane 1-11 di carico, la 12ª una verifica (serie -35%, carico invariato, RIR 3-4);
     all 8ª un controllo (INT-2d, revisione B1): con il consenso, alla prima lettura della settimana 8 il coach guarda la fatica e i segnali salvati
     (controlloOttavaPrincipiante, chiamato da settimanaProgramma) e, con fatica media o alta o un segnale, scrive la settimana come scarico «basso»
     (serie -35%, carico -5% sul riferimento di prima: non si compone) nel programma salvato, con il motivo e l annulla; altrimenti si continua
   - intermedio (MES-01): 12 settimane = 2 blocchi da 5 di carico + 1 di scarico; rampa di volume 0,75 · 0,85 · 0,95 · 1 · 1
   - avanzato (MES-01): come l intermedio con rampa 0,70 · 0,80 · 0,90 · 1 · 1 e +1 serie ai prioritari dalla 3ª settimana del blocco
   - prudenti (over 65, PAR-Q positivo, minorenni): blocchi 3+1 come prima della v2, nessuna rampa, RIR fisso (3-4; i minorenni mai sotto 2)
   - lo scarico (5-7 giorni) taglia le serie del 35 / 50 / 60% e il carico del 5 / 10% SUL CARICO DI RIFERIMENTO prima dello scarico, mai
     composto (MES-06); la ripresa e al 100%. La dose reale la sceglie la fatica del momento (MES-05, W3-T5): qui c e quella di partenza.
   RIR (MES-02): una tabella per livello, tipo e settimana del blocco (principiante 3-4, poi 2-3, mai 0; intermedio pesanti 3 → 1, macchine
   3 → 1, isolamenti 3 → 0; avanzato pesanti 3 → 1, macchine 3 → 0, isolamenti 2 → 0), con i pavimenti: 1 sui fondamentali col bilanciere e
   sui pesi liberi (PCO-02), 2 sugli esercizi che possono cadere addosso da soli in casa (CAS-11), mai sotto 2 per i minorenni, e il limite
   basso non supera mai 4. Modificatori dell obiettivo (OBI-03): salute pavimento 2; forza pesanti [2, 4]; deficit pavimento 2 sui pesanti e 1
   sul resto. rirPianoSettimana(nome, data) legge la tabella dal programma salvato: la chiama rirBersaglioBase (regole-ricerca.js, W2-T3) con
   typeof; un programma salvato dalla v1 non ha il piano: ritorna null e valgono i RIR di prima.
   Senza soglie-struttura.js (sogliaStruttura non trova niente) il generatore ricade sulle regole di prima, senza piano.
   Dalla ricerca:
   - un blocco di lavoro dura 4-8 settimane, con uno SCARICO ogni 4-8; i prudenti restano a 3+1
   - nello scarico si tagliano le serie del 30-50% e si alleggerisce il carico
   ============================================================ */

/* la struttura della v1, per i programmi senza il piano (soglie-struttura.js assente o regola spenta) */
const STRUTTURA_V1 = {
  principiante: { settimane: 8, blocco: 8 },          /* PRN-03 (ponte dell onda 0): 7 di carico + 1 di scarico */
  principianteCauto: { settimane: 8, blocco: 4 },     /* over 65, PAR-Q, minorenne: 2 blocchi da 3+1 */
  intermedio: { settimane: 12, blocco: 4 },           /* 3 blocchi da 3+1 */
  avanzato: { settimane: 12, blocco: 6 }              /* 2 blocchi da 5+1 */
};
/* le sei classi di esercizio (attributi-esercizi.js) e la riga della tabella del RIR che leggono */
const CLASSI_PIANO = ['A', 'B', 'C', 'D', 'E', 'F'];
const RIGA_RIR_DI_CLASSE = { A: 'pesanti', B: 'macchine', C: 'macchine', D: 'isolamenti', E: 'isolamenti', F: 'isolamenti' };

/* una soglia di soglie-struttura.js (undefined se il file non c e); le soglie si leggono solo durante l esecuzione */
function sogliaStruttura(nome) {
  return typeof SOGLIE_STRUTTURA !== 'undefined' && SOGLIE_STRUTTURA[nome] ? SOGLIE_STRUTTURA[nome].v : undefined;
}
function copiaPiano(x) { return JSON.parse(JSON.stringify(x)); }
/* le soglie ci sono: il generatore costruisce il piano (programmi v2) */
function pianoAttivo() { return sogliaStruttura('strutturaIntermedio') !== undefined; }

/* Durata e struttura in base all esperienza (PRG-01: MES-01 e PRN-03). Ritorna { settimane, blocco }.
   `prudente` (over 65, PAR-Q positivo, minorenne): blocchi come prima della v2 (principiante 3+1, intermedio 3+1, avanzato 5+1); chi chiama
   (buildProgram) deve passarlo: over65, PAR-Q positivo o eta tra 1 e 17 anni. Gli altri: principiante 12 settimane con lo scarico solo alla 12ª
   (PRN-03), intermedio e avanzato 5+1 (MES-01). Un programma salvato tiene le sue fasi: stanno in prog.fasi (D-P5). */
function strutturaProgramma(level, prudente) {
  const v2 = pianoAttivo();
  const due = s => ({ settimane: s.settimane, blocco: s.blocco });
  if (prudente) {
    const t = v2 ? sogliaStruttura('strutturaPrudente') : { principiante: STRUTTURA_V1.principianteCauto, intermedio: STRUTTURA_V1.intermedio, avanzato: STRUTTURA_V1.avanzato };
    return due(t[level] || t.intermedio);
  }
  if (level === 'principiante') return due(v2 && regolaAttiva('PRN-03') ? sogliaStruttura('strutturaPrincipiante') : STRUTTURA_V1.principiante);
  if (level === 'avanzato') return due(v2 ? sogliaStruttura('strutturaAvanzato') : STRUTTURA_V1.avanzato);
  return due(v2 && regolaAttiva('MES-01') ? sogliaStruttura('strutturaIntermedio') : STRUTTURA_V1.intermedio);
}

function fasiProgramma(struttura) {
  const fasi = [];
  for (let w = 1; w <= struttura.settimane; w++) fasi.push(w % struttura.blocco === 0 ? 'scarico' : 'carico');
  return fasi;
}

/* ---------------- il piano settimana per settimana (MES-01, MES-02, MES-03, PRN-03, OBI-03) ---------------- */

const arrotonda2 = x => Math.round(x * 100) / 100;
/* colonna (0-4) della tabella di 5 settimane per la settimana `pos` (1..carichi) di un blocco con `carichi` settimane di carico: il blocco 5+1 le usa
   una a una, uno piu corto (3+1) le scorre per intero */
function colonnaDelBlocco(pos, carichi) { return carichi <= 1 ? 0 : Math.round((pos - 1) * 4 / (carichi - 1)); }
/* il limite basso di un RIR [lo, hi] portato ad almeno `piso` (e mai sopra il massimo), con l alto sempre un passo sopra */
function rirConPiso(r, piso, massimo) {
  const lo = Math.min(massimo, Math.max(r[0], piso));
  return [lo, Math.max(r[1], lo + 1)];
}

/* il contesto che il piano legge una volta: chi, obiettivo e quali regole sono accese */
function contestoPiano(brief, struttura) {
  const chi = brief.chi, ob = brief.obiettivi;
  const modo = (chi.parq || chi.over65) ? 'prudente' : (chi.minorenne ? 'minore' : 'normale');
  const giorni = Number(brief.agenda.giorni) || 3;
  return {
    livello: chi.livello, modo: modo, cauto: !!chi.cauto, giorni: giorni, struttura: struttura,
    principiante: chi.livello === 'principiante',
    obiettivo: ob.primo, deficit: ob.fase === 'deficit',
    rir: regolaAttiva('MES-02'), rampa: regolaAttiva('MES-03'), obi: regolaAttiva('OBI-03'),
    lungo: chi.livello === 'principiante' && !chi.cauto && struttura.settimane === sogliaStruttura('strutturaPrincipiante').settimane   /* le 12 settimane di PRN-03, con la verifica alla 12a e il controllo all 8a */
  };
}
/* la dose di scarico di partenza segnata nel piano: bassa fino a 3 giorni a settimana, media oltre e per i prudenti (poi la sceglie la fatica: MES-05) */
function doseInizialeScarico(ctx) {
  const d = sogliaStruttura('scaricoDoseIniziale');
  return ctx.modo === 'prudente' || ctx.cauto ? d.prudente : (ctx.giorni <= d.giorniBassa ? 'bassa' : 'media');
}

/* il RIR di una settimana per ognuna delle sei classi: { A..F: [lo, hi] } e, per gli isolamenti a macchina o cavo del principiante dalla 7ª, la riserva dell ultima serie */
function rirDellaSettimana(ctx, n, pos, carichi, fase) {
  const out = {}, massimo = sogliaStruttura('rirMassimo'), minorenni = sogliaStruttura('pavimentoMinorenni');
  const tutte = r => CLASSI_PIANO.forEach(c => { out[c] = r.slice(); });
  let ultima = null;
  if (fase === 'scarico') {
    tutte(ctx.principiante && !ctx.cauto ? sogliaStruttura('verificaPrincipiante').rir : sogliaStruttura('rirScarico'));
    return { rir: out, ultima: null };
  }
  const pr = sogliaStruttura('rirPrincipiante');
  if (ctx.modo === 'prudente') tutte(sogliaStruttura('rirPrudente'));
  else if (ctx.principiante) {
    tutte(n <= pr.inizioSettimane ? pr.inizio : pr.dopo);
    if (ctx.modo === 'normale' && n >= pr.ultimaSerieIsolamenti.dallaSettimana) ultima = { D: pr.ultimaSerieIsolamenti.rir.slice() };
  } else if (ctx.modo === 'minore') tutte([minorenni, minorenni + 1]);
  else {
    const t = sogliaStruttura(ctx.livello === 'avanzato' ? 'rirAvanzato' : 'rirIntermedio'), k = colonnaDelBlocco(pos, carichi);
    CLASSI_PIANO.forEach(c => { const r = t[RIGA_RIR_DI_CLASSE[c]][k]; out[c] = [r, r + 1]; });
  }
  /* modificatori dell obiettivo (OBI-03): salute pavimento 2, forza pesanti [2, 4], taglio pavimento 2 sui pesanti e 1 sul resto */
  if (ctx.obi && ctx.modo !== 'prudente') {
    if (ctx.obiettivo === 'salute') { const s = sogliaStruttura('obiettivoSalute'); CLASSI_PIANO.forEach(c => { out[c] = rirConPiso(out[c], s.pavimento, massimo); }); }
    if (ctx.obiettivo === 'forza') { const f = sogliaStruttura('obiettivoForza').pesanti; out.A = [Math.max(f[0], out.A[0]), Math.max(f[1], out.A[1])]; }
    if (ctx.deficit) { const d = sogliaStruttura('obiettivoDeficit'); CLASSI_PIANO.forEach(c => { out[c] = rirConPiso(out[c], c === 'A' ? d.pesanti : d.altri, massimo); }); }
  }
  /* pavimenti: mai 0 sui fondamentali col bilanciere (classe A) ne sui multiarticolari liberi (B); i minorenni mai sotto il loro */
  const pavimento = sogliaStruttura('pavimentoPesanti');
  out.A = rirConPiso(out.A, pavimento, massimo); out.B = rirConPiso(out.B, pavimento, massimo);
  if (ctx.modo === 'minore') CLASSI_PIANO.forEach(c => { out[c] = rirConPiso(out[c], minorenni, massimo); });
  CLASSI_PIANO.forEach(c => { out[c] = rirConPiso(out[c], 0, massimo); });
  if (ultima && ctx.obi && ctx.obiettivo === 'salute') ultima.D = rirConPiso(ultima.D, sogliaStruttura('obiettivoSalute').pavimento, massimo);
  return { rir: out, ultima: ultima };
}

/* il fattore di volume della settimana (la rampa di MES-03 / PRN-03); in scarico il fattore delle serie della dose */
function fattoreVolumeSettimana(ctx, n, pos, carichi, fase, dose) {
  if (fase === 'scarico') return ctx.principiante && !ctx.cauto ? sogliaStruttura('verificaPrincipiante').serie : sogliaStruttura('scaricoSerie')[dose];
  if (!ctx.rampa || ctx.cauto) return 1;
  if (ctx.principiante) { const t = sogliaStruttura('rampaVolumePrincipiante'); return t[Math.min(n, t.length) - 1]; }
  let f = sogliaStruttura(ctx.livello === 'avanzato' ? 'rampaVolumeAvanzato' : 'rampaVolumeIntermedio')[colonnaDelBlocco(pos, carichi)];
  if (ctx.obiettivo === 'salute' || ctx.obiettivo === 'dimagrimento') f = Math.max(f, sogliaStruttura('rampaVolumeSalute'));
  return arrotonda2(f);
}

/* il piano: { versione: 2, livello, modo, obiettivo, struttura, settimane: [...], scarico, passaggio, regole }.
   Ogni settimana: n, blocco, sett (posizione nel blocco), fase ('carico' | 'scarico' | 'controllo' = l 8ª del principiante), rir { A..F: [lo, hi] } (null se
   MES-02 e spenta), rirUltima (la riserva dell ultima serie, solo isolamenti D del principiante dalla 7ª), volume (fattore sul volume di base),
   serie { multi, altri } e rip { multi, isolamento } (solo il principiante), prioritari (+1 serie ai prioritari: avanzato dalla 3ª), carico (in scarico: fattore sul
   carico di riferimento, mai composto; null in carico), dose ('bassa' | 'media' | 'alta' in scarico), tecniche ('G1' | 'G2'), nota. */
function costruisciPiano(brief, struttura, fasi) {
  const ctx = contestoPiano(brief, struttura);
  const carichi = struttura.blocco - 1, doseIniz = doseInizialeScarico(ctx);
  const verifica = sogliaStruttura('verificaPrincipiante'), ctrl = sogliaStruttura('controlloOttava'), strP = sogliaStruttura('strutturaPrincipiante');
  const sp = sogliaStruttura('seriePrincipiante'), rp = sogliaStruttura('ripetizioniPrincipiante'), pri = sogliaStruttura('prioritariAvanzato');
  const settimane = fasi.map((f, i) => {
    const n = i + 1, pos = i % struttura.blocco + 1, scarico = f === 'scarico';
    const fase = scarico ? 'scarico' : (ctx.lungo && n === strP.controllo ? 'controllo' : 'carico');
    const dose = scarico ? (ctx.principiante && !ctx.cauto ? ctrl.dose : doseIniz) : null;
    const w = { n: n, blocco: Math.floor(i / struttura.blocco) + 1, sett: pos, fase: fase };
    const r = ctx.rir ? rirDellaSettimana(ctx, n, pos, carichi, fase) : { rir: null, ultima: null };
    w.rir = r.rir;
    if (r.ultima) w.rirUltima = r.ultima;
    w.volume = fattoreVolumeSettimana(ctx, n, pos, carichi, fase, dose);
    if (ctx.principiante && !ctx.cauto && ctx.rampa) {
      w.serie = { multi: sp.multi[Math.min(n, sp.multi.length) - 1], altri: sp.altri[Math.min(n, sp.altri.length) - 1] };
      const s = n <= rp.inizio.settimane ? rp.inizio : rp.dopo;
      w.rip = { multi: s.multi.slice(), isolamento: s.isolamento.slice() };
    }
    w.prioritari = ctx.livello === 'avanzato' && !ctx.cauto && ctx.rampa && !scarico && pos >= pri.dallaSettimana ? pri.piuSerie : 0;
    w.carico = scarico ? (ctx.principiante && !ctx.cauto ? verifica.carico : sogliaStruttura('scaricoCarico')[dose]) : null;
    w.dose = dose;
    w.tecniche = !scarico && !ctx.principiante && !ctx.cauto && pos > sogliaStruttura('tecnichePerPosizione').soloG1FinoAllaSettimana ? 'G2' : 'G1';
    w.nota = fase === 'controllo' ? 'Controllo: con fatica media o alta, o un segnale di stanchezza, questa settimana diventa uno scarico leggero'
      : (scarico ? (ctx.lungo ? 'Verifica: meno serie, stesso carico, per fare il punto' : 'Scarico: meno serie e carichi più leggeri sul carico di prima') : '');
    return w;
  });
  const piano = {
    versione: 2, livello: ctx.livello, modo: ctx.modo, obiettivo: ctx.obiettivo,
    struttura: { settimane: struttura.settimane, blocco: struttura.blocco, controllo: ctx.lungo ? strP.controllo : null,
      anticipabile: !ctx.cauto && !ctx.principiante ? copiaPiano(sogliaStruttura('scaricoAnticipabile')) : null },
    settimane: settimane,
    scarico: { dose: doseIniz, serie: copiaPiano(sogliaStruttura('scaricoSerie')), carico: copiaPiano(sogliaStruttura('scaricoCarico')), giorni: sogliaStruttura('scaricoGiorni').slice(),
      ripresa: sogliaStruttura('scaricoRipresa'), rir: sogliaStruttura('rirScarico').slice() },
    passaggio: copiaPiano(sogliaStruttura('passaggioBlocco')),
    regole: { 'MES-01': regolaAttiva('MES-01'), 'PRN-03': regolaAttiva('PRN-03'), 'MES-02': ctx.rir, 'MES-03': ctx.rampa, 'OBI-03': ctx.obi }
  };
  return piano;
}

/* la riga del programma che dice com e fatto il mesociclo (e il suo codice per il perche), o null: niente per i prudenti, ne con le regole spente */
function notaDelPiano(ctx, piano) {
  if (ctx.cauto) return null;
  const st = piano.struttura;
  if (ctx.principiante) {
    return ctx.lungo ? { codice: 'PRN-03', testo: 'Programma di ' + st.settimane + ' settimane: i carichi salgono con calma e lo scarico è solo alla fine. Alla settimana ' + st.controllo + ' il coach guarda la tua stanchezza: se sei stanco, quella settimana diventa uno scarico leggero (serve il consenso ai dati del coach).' } : null;
  }
  if (!regolaAttiva('MES-01') || !ctx.rir || !ctx.rampa) return null;
  const carico = piano.settimane.filter(w => w.fase === 'carico' && w.blocco === 1), da = carico[0].rir.A[0], a = Math.min.apply(null, carico.map(w => w.rir.A[0]));
  return { codice: 'MES-01', testo: 'Mesociclo: ' + carico.length + ' settimane di carico e una di scarico. Il volume sale piano e le ripetizioni in riserva scendono da ' + da + ' a ' + a + ' sui fondamentali.' };
}

/* pianoMesociclo(brief) -> { struttura: { settimane, blocco }, fasi, rirSett, note, piano }
   rirSett (per chi lo legge ancora, rirBersaglioBase senza il piano): con il piano e il limite basso dei fondamentali col bilanciere (classe A) di
   ogni settimana, che per i prudenti e fisso (3, 4 nello scarico) e per i minorenni non scende sotto 2 (ETA-02); senza il piano o con MES-02 spenta e quello
   di prima (avanzati: 3, 2, 2, 1, 0 e 4 in scarico; minorenni: 2 e 4 in scarico).
   `note` sono le righe che il programma mostra per il mesociclo: le scrive buildProgram al suo posto nell ordine delle note. */
function pianoMesociclo(brief) {
  const chi = brief.chi;
  const struttura = strutturaProgramma(chi.livello, chi.cauto);
  const fasi = fasiProgramma(struttura);
  const note = [];
  let piano = null, rirSett = null;
  if (pianoAttivo()) {
    piano = costruisciPiano(brief, struttura, fasi);
    brief.obiettivi.scheme = Object.assign({}, brief.obiettivi.scheme, { settimane: struttura.settimane });   /* MOD-09: la durata viene dal piano, non da schemeFor */
    if (piano.settimane[0].rir) rirSett = piano.settimane.map(w => w.rir.A[0]);
    const nota = notaDelPiano(contestoPiano(brief, struttura), piano);
    if (nota) { note.push(nota.testo); aggiungiPerche(brief, nota.codice, nota.testo); }
  }
  if (!rirSett) {
    /* i RIR di prima: avanzati con la rampa 3, 2, 1, 0; minorenni sempre 2 */
    if (chi.livello === 'avanzato' && !chi.minorenne) {
      rirSett = [];
      let k = 0;
      fasi.forEach(f => { if (f === 'scarico') { rirSett.push(4); k = 0; } else { const n = struttura.blocco - 1; rirSett.push(Math.max(0, Math.round(3 - 3 * k / Math.max(1, n - 1)))); k++; } });
      if (!piano) note.push('Mesociclo: ripetizioni in riserva 3, 2, 1, 0 nelle settimane di carico, poi scarico.');
    }
    if (chi.minorenne) rirSett = fasi.map(f => f === 'scarico' ? 4 : 2);
  }
  return { struttura: struttura, fasi: fasi, rirSett: rirSett, note: note, piano: piano };
}

/* PRN-03 / B4: il controllo dell 8ª settimana del principiante. `fatica` = 'bassa' | 'media' | 'alta' (livelloFatica); `segnale` = vero se un segnale dello
   scarico reattivo (MES-07) e acceso. Ritorna { fase: 'scarico', dose: 'bassa' } se la fatica e media o alta o c e un segnale, altrimenti { fase: 'carico', dose: null }:
   la settimana continua. La decisione vera (con i dati salvati, il consenso, il motivo e l annulla) e controlloOttavaPrincipiante, qui sotto. */
function esitoControlloPrincipiante(fatica, segnale) {
  const c = sogliaStruttura('controlloOttava');
  if (!c) return { fase: 'carico', dose: null };
  return segnale || c.scaricoSeFatica.indexOf(fatica) !== -1 ? { fase: 'scarico', dose: c.dose } : { fase: 'carico', dose: null };
}

/* ---------------- il controllo dell 8ª settimana, eseguito (PRN-03, B4, D-P15; revisione INT-2d B1) ---------------- */

/* i segnali accesi al controllo, letti dai dati gia salvati (soglie: controlloOttavaSegnali): { sonno, sedute, dolore, scarico } (vero = acceso).
   La fatica generale (sRPE medio e prontezza) la da livelloFatica; qui i segnali del registro che livelloFatica non vede (MES-07 §3.7: S5 sonno, S7 sedute
   al limite), il dolore (prudenza in piu, non fatica: S4) e uno scarico gia deciso dal coach (DEC-06, PRZ-04, STR-01) */
function segnaliControlloOttava() {
  const s = sogliaStruttura('controlloOttavaSegnali');
  const out = { sonno: false, sedute: false, dolore: false, scarico: false };
  if (!s) return out;
  const fb = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, s.seduteUltime).map(h => h.feedback);
  out.sedute = typeof sedutaPesante === 'function' && fb.filter(x => sedutaPesante(x)).length >= s.seduteAlLimiteMin;
  out.dolore = fb.some(x => x.dolore && (Number(x.livello) || 0) >= s.doloreMinimo);
  out.sonno = storicoProntezza().slice(-s.checkInSonno).filter(x => x && x.sonno === 0).length >= s.sonnoMaleMin;
  const ag = typeof aggiustiCoach === 'function' ? aggiustiCoach() : null;
  out.scarico = !!(ag && ag.scarico && Number(ag.scarico.sedute) > 0);
  return out;
}
/* la frase del controllo: un pezzo per ogni causa, separati da « • » (il traduttore li traduce a pezzi) */
const CAUSE_CONTROLLO_OTTAVA = {
  alta: 'la stanchezza delle ultime sedute è alta', media: 'la stanchezza delle ultime sedute è media',
  senzaDati: 'non ci sono ancora dati sulla tua stanchezza: per prudenza si scarica',
  sonno: 'il sonno è stato scarso nelle ultime check-in', sedute: 'le ultime sedute erano al limite o fatte da stanco',
  dolore: 'hai segnalato un dolore nelle ultime sedute', scarico: 'il coach aveva già deciso uno scarico'
};

/* PRN-03 / B4 (registro): all 8ª settimana di un programma da principiante a 12 settimane il coach guarda la stanchezza dai dati salvati e, se e media o alta o
   c e un segnale, anticipa lo scarico (dose «bassa»: serie -35%, carico -5%, sul carico di riferimento di prima, MES-06: la dose non si compone); altrimenti
   la settimana continua. Solo con il consenso (coachAttivo), una volta sola per programma (il risultato sta in piano.controllo: motivo, causa, data), e si
   annulla (showUndo: il programma torna com era e il controllo non si ripete). Lo chiama settimanaProgramma (progressivo.js) con il programma gia letto: tutto
   il resto (fasi, perche, carichi, analisi di MES-10) legge poi la settimana dal programma salvato. Ritorna vero se ha deciso. */
function controlloOttavaPrincipiante(p) {
  const piano = p && p.piano, n = piano && piano.struttura ? Number(piano.struttura.controllo) : 0;
  if (!n || piano.controllo || !Array.isArray(piano.settimane) || !p.inizio || !Array.isArray(p.fasi)) return false;   /* le uscite economiche per prime: gira a ogni lettura della settimana */
  const w = piano.settimane[n - 1];
  if (!w || w.fase !== 'controllo' || !pianoAttivo() || !regolaAttiva('PRN-03') || typeof coachAttivo !== 'function' || !coachAttivo()) return false;
  if (Math.floor(giorniTra(daYmd(p.inizio), lunediDi(new Date())) / 7) + 1 !== n) return false;
  const fatica = livelloFatica(), seg = segnaliControlloOttava();
  const senzaDati = !loadHistory().some(h => h.feedback && !h.interrotta) && !storicoProntezza().some(x => x && typeof x.punteggio === 'number');
  const acceso = Object.keys(seg).filter(k => seg[k]);
  const esito = esitoControlloPrincipiante(fatica, acceso.length > 0);
  const quando = ymd(new Date()), dose = esito.dose;
  const prima = JSON.stringify(p);
  const cause = [];
  if (esito.fase === 'scarico') {
    if (senzaDati && !acceso.length) cause.push(CAUSE_CONTROLLO_OTTAVA.senzaDati);
    else if (fatica === 'alta' || fatica === 'media') cause.push(CAUSE_CONTROLLO_OTTAVA[fatica]);
    acceso.forEach(k => cause.push(CAUSE_CONTROLLO_OTTAVA[k]));
  }
  const nome = 'Controllo della settimana ' + n;
  const sd = sogliaStruttura('scaricoSerie')[dose], cd = sogliaStruttura('scaricoCarico')[dose];
  const motivo = esito.fase === 'scarico'
    ? [nome].concat(cause, ['questa settimana è uno scarico leggero: serie -' + Math.round((1 - sd) * 100) + '% e carico -' + Math.round((1 - cd) * 100) + '%', 'poi si riprende dal carico di prima']).join(' • ')
    : [nome, 'la stanchezza è bassa e non ci sono segnali di recupero scarso', 'la settimana continua come da programma'].join(' • ');
  piano.controllo = { settimana: n, esito: esito.fase, dose: dose, fatica: fatica, segnali: acceso, senzaDati: senzaDati, data: quando, motivo: motivo };
  if (esito.fase === 'scarico') {
    /* la settimana diventa di scarico in tutto il programma salvato: fasi (le leggono settimanaProgramma, faseDelGiorno e le analisi), piano e RIR */
    p.fasi[n - 1] = 'scarico';
    const rirScarico = sogliaStruttura('verificaPrincipiante').rir;
    w.fase = 'scarico'; w.dose = dose; w.volume = sd; w.carico = cd; w.rir = {}; CLASSI_PIANO.forEach(c => { w.rir[c] = rirScarico.slice(); });
    delete w.rirUltima;
    w.nota = 'Controllo: la stanchezza lo chiedeva, questa settimana è uno scarico leggero';
    if (Array.isArray(p.rirSett)) p.rirSett[n - 1] = rirScarico[0];
  } else w.fase = 'carico';
  aggiungiPerche(p, 'PRN-03', motivo);
  try { localStorage.setItem(progKey(), JSON.stringify(p)); } catch (e) { return false; }
  if (typeof showUndo === 'function') {
    try {
      showUndo(esito.fase === 'scarico' ? nome + ' • ' + cause.concat(['questa settimana è uno scarico leggero']).join(' • ') : motivo, esito.fase === 'scarico' ? () => {
        const prec = JSON.parse(prima);
        prec.piano.controllo = { settimana: n, esito: 'carico', dose: null, fatica: fatica, segnali: acceso, senzaDati: senzaDati, data: quando, annullato: true,
          motivo: nome + ' • annullato: la settimana continua come da programma' };
        prec.piano.settimane[n - 1].fase = 'carico';
        try { localStorage.setItem(progKey(), JSON.stringify(prec)); } catch (e) {}
        if (typeof renderOggi === 'function') { try { renderOggi(); } catch (e) {} }
      } : null, 9000);
    } catch (e) {}
  }
  return true;
}

/* ---------------- leggere il piano dal programma salvato ---------------- */

/* la settimana (1..N) del programma salvato per `data`: una data (Date, 'AAAA-MM-GG'), un numero di settimana, o niente = la settimana di oggi; null se e fuori dal piano.
   INT-2b: «niente» e anche 0, NaN e la stringa vuota: rirBersaglioBase (regole-ricerca.js, W2-T3) chiama rirPianoSettimana(nome, sett) con lo stesso `sett` di tutto il coach
   (numero di settimana 1..N, oppure niente = oggi: `sett || settimanaProgramma().numero`), e uno 0 non deve far perdere la tabella, solo dire «oggi» come altrove */
function settimanaDelPiano(p, data) {
  const totale = p.piano.settimane.length;
  if (typeof data === 'number' && (data !== data || data === 0)) data = undefined;
  if (data === '') data = undefined;
  if (typeof data === 'number' && data < 1e6) return data >= 1 && data <= totale ? Math.floor(data) : null;
  if (data === undefined || data === null) {
    const st = typeof settimanaProgramma === 'function' ? settimanaProgramma() : null;
    return st && st.numero >= 1 && st.numero <= totale ? st.numero : null;
  }
  if (!p.inizio) return null;
  const d = typeof data === 'string' ? daYmd(data) : (typeof data.getTime === 'function' ? data : new Date(data));
  const w = Math.floor(giorniTra(daYmd(p.inizio), lunediDi(d)) / 7) + 1;
  return w >= 1 && w <= totale ? w : null;
}
/* la voce del piano della settimana di `data` (vedi costruisciPiano), o null: programma senza piano (v1), settimana fuori dal programma */
function pianoDellaSettimana(data) {
  const p = typeof getProgramma === 'function' ? getProgramma() : null;
  if (!p || !p.piano || !Array.isArray(p.piano.settimane)) return null;
  const n = settimanaDelPiano(p, data);
  return n ? p.piano.settimane[n - 1] : null;
}
/* la classe A-F di un esercizio (attributi); fuori libreria, dal tipo di carico di prima */
function classeRirDi(nome) {
  const c = typeof classeTecnica === 'function' ? classeTecnica(nome) : null;
  if (c) return c;
  const t = typeof tipoCarico === 'function' ? tipoCarico(nome) : 'isolamento';
  return t === 'pesante' ? 'A' : (t === 'macchina' ? 'C' : 'E');
}
/* MES-02: il RIR bersaglio [lo, hi] di un esercizio nella settimana di `data` (o nella settimana `data` se e un numero, o oggi senza), dal piano del
   programma salvato; null se il programma non ha il piano (salvato dalla v1) o la regola e spenta: allora vale il RIR di prima. Oltre alla tabella
   per classe applica i pavimenti dell esercizio: i pesi liberi o l equilibrio (stabilita 2-3) almeno 1; in casa, da soli, gli esercizi che possono
   cadere addosso almeno 2 (CAS-11); un RIR 0 solo con una prontezza di oggi di almeno 60; in taglio calorico pavimento 2 sui pesanti e 1 sul resto (OBI-03). */
function rirPianoSettimana(nome, data) {
  if (!pianoAttivo() || !regolaAttiva('MES-02')) return null;
  if (data === 0 || data === '' || (typeof data === 'number' && data !== data)) data = undefined;   /* INT-2b: «niente» = oggi, come nel resto del coach (sett || settimana di oggi) */
  const p = typeof getProgramma === 'function' ? getProgramma() : null;
  if (!p || !p.piano || !Array.isArray(p.piano.settimane)) return null;
  const n = settimanaDelPiano(p, data);
  const w = n ? p.piano.settimane[n - 1] : null;
  if (!w || !w.rir) return null;
  const classe = classeRirDi(nome);
  let r = (w.rir[classe] || w.rir.C).slice();
  const massimo = sogliaStruttura('rirMassimo') || 4;
  const a = typeof attributi === 'function' ? attributi(nome) : null;
  if (a && a.stabilita >= 2) r = rirConPiso(r, 1, massimo);
  const luogo = (p.prefs && p.prefs.luogo) || ((typeof getProfile === 'function' ? getProfile() : null) || {}).luogo;
  if (a && (luogo === 'manubri' || luogo === 'corpo') && a.stabilita >= 2 && !(a.attrezzo === 'corpo' && !a.unilaterale)) r = rirConPiso(r, sogliaStruttura('pavimentoCasa'), massimo);
  if (regolaAttiva('OBI-03') && typeof inDeficitCalorico === 'function' && inDeficitCalorico()) {
    const d = sogliaStruttura('obiettivoDeficit');
    r = rirConPiso(r, classe === 'A' ? d.pesanti : d.altri, massimo);
  }
  if (r[0] === 0 && (data === undefined || data === null) && typeof leggiProntezza === 'function') {
    const pz = leggiProntezza();
    if (pz && pz.data === ymd(new Date()) && typeof pz.punteggio === 'number' && pz.punteggio < sogliaStruttura('prontezzaPerZero')) r = rirConPiso(r, 1, massimo);
  }
  return r;
}
