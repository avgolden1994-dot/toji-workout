/* Scarico: dose unica, fatica, scarico del programma e scarico deciso dal coach con le sue protezioni (CAR-03, CAR-10, MES-05, MES-07, MES-08, CST-09, W1-T3, P3-B)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCARICO
   Un posto solo per cio che dice quanto scaricare e chi puo chiedere uno scarico, che prima stava in regole-ricerca.js
   (dose e fatica) e in tre punti diversi che scrivevano `ag.scarico` a mano (questionario-decisioni.js, prontezza.js, repertorio.js).
   W1-T3 ha spostato qui, senza cambiare un numero, DOSE_SCARICO, livelloFatica e la soglia dell sRPE (MES-08) e ha aggiunto scaricoReattivo:
   la voce di `ag.scarico` (aggiusti del coach) con il motivo che l utente legge; la scrivono questionario-decisioni.js, prontezza.js e repertorio.js
   e la legge dolore-mattina.js (fase 50 AGG di 'carico').

   P3-B (piano coach v2 W3-T5, versione snella; solo programmi con prog.versione 2: i programmi salvati prima della v2 restano come erano, registro D-P5):
   - UNA DOSE (MES-05): DOSE_SCARICO non e piu una tabella a parte ma si DERIVA da scaricoSerie e scaricoCarico di programma/soglie-struttura.js (la dose «alta» e a 0,40
     delle serie e non a 0,30: con il minimo di 2 serie lo 0,30 dava le stesse serie della «media» da 3-4 serie, il «-70%» era solo testo) e dalla verifica del principiante
     (verificaPrincipiante). Il nome resta DOSE_SCARICO: caricoProssimoBase (regole-ricerca.js) la legge cosi com era, per bassa, media e alta. I programmi v1 tengono la dose di
     prima (SOGLIE_SCARICO.doseV1: sicurezza/soglie-scarico.js).
   - N6 chiuso: un esercizio da 2 serie viene davvero alleggerito nello scarico (1 serie: serieDiScarico), prima il minimo di 2 serie lo lasciava com era.
   - Fase 30 «MES-05» della catena 'carico' (regia/fasi.js: «30 SEN scarico pianificato o reattivo»): sopra caricoProssimoBase porta le serie dello scarico alla dose unica (N6) e,
     nella verifica del principiante (la 12a settimana, PRN-03), rimette il carico sul riferimento di prima dello scarico (non ridotto) con le serie -35%; il motivo dice la dose vera
     (niente «ripartire piu forte»: non ha base) e il RIR. Lo scarico non si compone mai: il riferimento e l ultima seduta NON di scarico (MES-06), lo stesso in tutte le sedute della settimana.
   - Lo scarico deciso dal coach (CAR-10, ag.scarico) dei programmi v2 usa la stessa dose, scelta dalla fatica del momento in cui si decide, per due sedute.
   - MES-07: le protezioni dello scarico reattivo (DEC-06, PRZ-04, STR-01 non sono piu cause da sole): mai da un solo segnale (almeno due tra S1 prontezza, S2 forza in calo, S5 sonno,
     S6 voglia, S7 sedute al limite, con almeno uno tra S1, S2, S3; oppure un segnale forte), non nelle prime due settimane del blocco, non entro 14 giorni dall ultimo scarico, uno solo
     ogni 3 settimane, e se lo scarico del programma e entro 7 giorni si fa quello. S3 (deriva dell RPE) non e implementato: il piano non salva ancora l RPE bersaglio per serie.
     Lo scarico del programma non si sposta (il piano ha settimane fisse): «anticipare o ritardare» vuol dire non scaricare due volte vicino.
   - CST-09: stanchezza che non passa (prontezza media di 14 giorni bassa o due scarichi decisi dal coach in sei settimane): riposo o solo camminate una settimana e, se non passa,
     il medico. Mai la parola «sovrallenamento», mai una diagnosi.
   ============================================================ */

/* il programma salvato, se e un programma v2 con il piano del mesociclo; altrimenti null (v1 o niente programma) */
function programmaConPiano() {
  const p = typeof getProgramma === 'function' ? getProgramma() : null;
  return p && p.versione === 2 && p.piano && Array.isArray(p.piano.settimane) ? p : null;
}
/* una soglia di sicurezza/soglie-scarico.js (undefined se il file non c e); le soglie si leggono solo durante l esecuzione */
function sogliaScarico(nome) {
  return typeof SOGLIE_SCARICO !== 'undefined' && SOGLIE_SCARICO[nome] ? SOGLIE_SCARICO[nome].v : undefined;
}

/* MES-08: con le risposte 3/6/8/10 (Facile, Giusta, Dura, Al limite) la fatica e «alta» solo se la media delle ultime sedute e quasi sempre «Al limite» (9,5; era 9: bastava
   una Dura in piu); Convenzione (ricerca-mesocicli-periodizzazione-scarichi.md, MES-08) */
const SOGLIA_SRPE_ALTA = 9.5;
/* scarico dosato sul bisogno (Bell 2024): poca, media o molta fatica */
function livelloFatica() {
  const hist = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, 3);
  const pr = storicoProntezza().slice(-3).map(x => x.punteggio).filter(x => typeof x === 'number');
  if (!hist.length && !pr.length) return 'media';
  /* la scala dell sRPE e 3/6/8/10 (W0-T5, MES-08); le risposte salvate prima dell onda 0 erano 4/7/9/10 e si portano sulla scala nuova (il 9 conta come 8: registro B9) */
  const sulla3_6_8 = (v) => ({ 4: 3, 7: 6, 9: 8 })[v] || v;
  const srpe = hist.length ? hist.reduce((t, h) => t + (sulla3_6_8(h.feedback.srpe) || 6), 0) / hist.length : 6;
  const pz = pr.length ? pr.reduce((t, x) => t + x, 0) / pr.length : 70;
  if (srpe >= SOGLIA_SRPE_ALTA || pz < 50) return 'alta';
  if (srpe < 7 && pz >= 70) return 'bassa';
  return 'media';
}

/* ---------------- la dose: una sola (MES-05) ---------------- */

/* «volume -50% e carico -10%»: la dose a parole, dai numeri (cosi il testo dice sempre cio che il codice fa) */
function testoDose(serie, carico) {
  return 'volume -' + Math.round((1 - serie) * 100) + '%' + (carico < 1 ? ' e carico -' + Math.round((1 - carico) * 100) + '%' : '');
}
/* la dose del livello di fatica: { serie, carico, t }. Programma v2: derivata da scaricoSerie e scaricoCarico (soglie-struttura.js); programma v1, regola MES-05 spenta o soglie
   assenti: la dose di prima (SOGLIE_SCARICO.doseV1) */
function doseDelLivello(livello) {
  const prima = sogliaScarico('doseV1');
  const serie = typeof sogliaStruttura === 'function' ? sogliaStruttura('scaricoSerie') : undefined;
  const carico = typeof sogliaStruttura === 'function' ? sogliaStruttura('scaricoCarico') : undefined;
  if (!serie || !carico || !serie[livello] || !carico[livello] || !programmaConPiano() || !regolaAttiva('MES-05')) return prima ? prima[livello] : undefined;
  return { serie: serie[livello], carico: carico[livello], t: testoDose(serie[livello], carico[livello]) };
}
/* DOSE_SCARICO[bassa|media|alta] = { serie, carico, t }: l unico posto che dice quanto scaricare. Non e una tabella di numeri: ogni voce si legge dalle soglie nel momento in cui serve */
const DOSE_SCARICO = {
  get bassa() { return doseDelLivello('bassa'); },
  get media() { return doseDelLivello('media'); },
  get alta() { return doseDelLivello('alta'); }
};

/* le serie dell esercizio nello scarico: `picco` serie x il fattore della dose, almeno 2 per l esercizio da 3 serie in su; l esercizio da 2 serie scende davvero (N6) */
function serieDiScarico(picco, fattore) {
  const n = Math.max(1, Number(picco) || 3), min = sogliaScarico('scaricoSerieMinime') || { daTreInSu: 2, daDue: 2 };
  return Math.max(n >= 3 ? min.daTreInSu : min.daDue, Math.min(n, Math.round(n * fattore)));
}

/* Fase 30 «MES-05» della catena 'carico' (regia/fasi.js): lo scarico del programma v2 (settimana di scarico e verifica del principiante), sopra caricoProssimoBase (fase 10).
   - serie: la dose unica con il minimo di 2 serie, e un esercizio da 2 serie scende a 1 (N6); anche la tenuta a tempo (il plank) ha la dose
   - verifica del principiante (la 12a settimana, PRN-03: piano.settimane[].carico = 1): carico = il riferimento di prima dello scarico, non ridotto, serie -35%; mai composto
   - il motivo dice la dose vera, il carico di riferimento e il RIR (4-5 nello scarico, 3-4 nella verifica) */
function scaricoAlCarico(r, c) {
  if (!r || !regolaAttiva('MES-05')) return r;
  const p = programmaConPiano();
  if (!p) return r;                                                                  /* v1: la dose di prima, cosi com e */
  const sett = settimanaProgramma();
  if (!sett || sett.finito || sett.fase !== 'scarico') return r;
  const w = p.piano.settimane[sett.numero - 1];
  if (!w) return r;
  const nome = c.nome, picco = Number(c.setsBase) || 3;
  const verifica = Number(w.carico) >= 1;
  const dose = verifica ? { serie: w.volume, carico: w.carico } : DOSE_SCARICO[sett.doseFissa || livelloFatica()];
  if (!dose) return r;
  /* le serie: la dose unica col minimo di 2 (e l esercizio da 2 serie scende a 1: N6); nella verifica del principiante la tabella del piano (2 serie: da 3 sono -33%, un esercizio da 2 resta a 2) */
  const serie = verifica && w.serie ? Math.min(picco, Math.max(w.serie.multi, w.serie.altri)) : serieDiScarico(picco, dose.serie);
  if (r.tipo !== 'scarico') {                                                        /* la tenuta a tempo non ha tipo 'scarico' ma le serie della dose si */
    if (isTimeBased(nome)) r.sets = serie;
    return r;
  }
  r.sets = serie;
  const rif = regolaAttiva('MES-06') ? caricoRiferimento(nome) : 0;
  const mai = ultimeSessioni(nome, 1).length === 0;                                  /* mai fatto: il carico e quello del programma, con la dose unica (non un secondo fattore) */
  if (mai) r.weight = arrotonda((Number(c.base) || r.weight) * dose.carico);
  else if (verifica) {
    if (rif > 0) r.weight = arrotonda(rif * dose.carico);
    else { const ult = typeof pesoUltimoDi === 'function' ? pesoUltimoDi(nome) : null; r.weight = ult ? ult.weight : (Number(c.base) || r.weight); }
  }
  const testa = verifica || !(dose.carico < 1) ? 'Settimana di verifica: ' + testoDose(dose.serie, 1) + ', stesso carico di prima' : 'Settimana di scarico: ' + testoDose(dose.serie, dose.carico);
  const pezzi = [testa];
  if (rif > 0) pezzi.push('sul carico di riferimento (' + fmtKg(rif) + ' kg), lo stesso in tutte le sedute della settimana');
  if (r.weight > 0 && typeof testoRir === 'function') pezzi.push(testoRir(nome));
  r.motivo = pezzi.join(' • ');
  aggiungiPerche(r, 'MES-05', testa, { forza: 'Convenzione', valore: dose.serie });
  return r;
}
registraFase('carico', 30, 'MES-05', scaricoAlCarico);

/* ---------------- lo scarico deciso dal coach (CAR-10) ---------------- */

/* La voce `ag.scarico` degli aggiusti: le prossime `sedute` sono di scarico deciso dal coach (CAR-10); `motivo` e la frase che l utente legge
   («Scarico deciso dal coach: <motivo>»); `dose` (programmi v2: bassa, media o alta, scelta dalla fatica del momento) dice quale riga di DOSE_SCARICO usare.
   Restituisce l oggetto, non scrive niente: chi la usa lo assegna ad `ag.scarico` e salva gli aggiusti insieme al resto (questionario-decisioni.js: DEC, prontezza.js:
   stanchezza di piu giorni, repertorio.js: carico della settimana) */
function scaricoReattivo(motivo, sedute, dose) {
  const v = { sedute: sedute, motivo: motivo };
  if (dose) v.dose = dose;
  return v;
}
/* la voce di ag.scarico per chi decide lo scarico: nei programmi v2 una durata sola (reattivoSedute) e la dose della fatica di adesso; negli altri la durata di chi chiama, come prima */
function voceScaricoReattivo(motivo, seduteDiPrima) {
  if (!programmaConPiano() || !regolaAttiva('MES-05')) return scaricoReattivo(motivo, seduteDiPrima);
  return scaricoReattivo(motivo, sogliaScarico('reattivoSedute') || seduteDiPrima, livelloFatica());
}

/* ---------------- MES-07: i segnali di fatica e le protezioni ---------------- */

/* S2: i multiarticolari il cui massimale stimato dell ultima seduta (di non oltre `ultimaEntro` giorni fa) e sceso di `calo` o piu sotto il migliore degli ultimi `giorni` giorni, sedute
   di scarico escluse (MES-06: sedutePerEsercizio con senzaScarico). Ritorna l elenco dei nomi */
function eserciziInCalo() {
  const s = sogliaScarico('segnaleForza'), oggi = new Date(), nomi = [], visti = {};
  if (!s) return nomi;
  loadHistory().filter(h => h.sessione && !h.interrotta).slice(0, 12).forEach(h => (h.sessione || []).forEach(e => {
    if (!e || visti[e.name]) return;
    visti[e.name] = true;
    const m = findExercise(e.name);
    if (!m || m.type !== 'compound') return;
    const ss = sedutePerEsercizio(e.name, 6, { senzaScarico: true }).filter(x => { const d = dataSessione(x.h); return d && giorniTra(d, oggi) <= s.giorni; });
    if (ss.length < 2) return;
    const ultima = dataSessione(ss[0].h);
    if (!ultima || giorniTra(ultima, oggi) > s.ultimaEntro) return;
    const adesso = e1rmSeduta(ss[0].ex), meglio = Math.max.apply(null, ss.slice(1).map(x => e1rmSeduta(x.ex)));
    if (adesso > 0 && meglio > 0 && adesso <= meglio * (1 - s.calo)) nomi.push(e.name);
  }));
  return nomi;
}
/* I segnali di MES-07 letti dai dati salvati: { S1, S2, S3, S5, S6, S7, forte } (vero = acceso). S1 prontezza bassa, S2 forza in calo, S3 deriva dell RPE (non implementato: sempre falso),
   S5 sonno «male» e S6 voglia «poca» nelle ultime check-in (il campo voglia lo salva prontezza.js nei programmi v2), S7 sedute al limite. `forte` = un segnale da solo basta */
function segnaliFatica() {
  const out = { S1: false, S2: false, S3: false, S5: false, S6: false, S7: false, forte: false };
  const sp = sogliaScarico('segnaleProntezza'), sv = sogliaScarico('segnaleSonnoVoglia'), ss = sogliaScarico('segnaleSedute'), sf = sogliaScarico('segnaleForza');
  if (!sp || !sv || !ss || !sf) return out;
  const storia = storicoProntezza(), oggi = new Date();
  const misure = storia.filter(x => x && typeof x.punteggio === 'number');
  const ultime = misure.slice(-sp.mediaUltime);
  const media = ultime.length === sp.mediaUltime ? ultime.reduce((t, x) => t + x.punteggio, 0) / ultime.length : null;
  const sotto = misure.filter(x => giorniTra(daYmd(x.data), oggi) <= sp.giorni && x.punteggio < sp.sotto).length;
  out.S1 = (media !== null && media < sp.sotto) || sotto >= sp.giorniSu;
  const ultimi = storia.slice(-sv.checkIn);
  out.S5 = ultimi.filter(x => x && x.sonno === 0).length >= sv.minimo;
  out.S6 = ultimi.filter(x => x && x.voglia === 0).length >= sv.minimo;
  const fb = loadHistory().filter(h => h.feedback && !h.interrotta).slice(0, ss.ultime).map(h => h.feedback);
  out.S7 = typeof sedutaPesante === 'function' && fb.filter(x => sedutaPesante(x)).length >= ss.alLimiteMin;
  const calo = eserciziInCalo().length;
  out.S2 = calo >= sf.multiarticolari;
  out.forte = (media !== null && media < sp.forteSotto) || calo >= sf.forti;
  return out;
}
const NOMI_SEGNALI = { S1: 'prontezza bassa', S2: 'forza in calo', S3: 'deriva dell’RPE', S5: 'sonno scarso', S6: 'poca voglia', S7: 'sedute al limite' };

/* Quante volte il coach ha deciso uno scarico (non quello del programma) negli ultimi `giorni` giorni: gli «episodi» = sedute in cui almeno meta degli esercizi era scaricata dal coach
   (coachTipo «scarico»), a piu di 7 giorni una dall altra; una seduta di una settimana di scarico del programma non conta (MES-10: faseSedutaSalvata) */
function scarichiReattiviRecenti(giorni) {
  const oggi = new Date(), prog = getProgramma(), date = [];
  loadHistory().forEach(h => {
    const d = dataSessione(h), es = h.sessione || [];
    if (h.interrotta || !d || !es.length || giorniTra(d, oggi) > giorni) return;
    const scaricati = es.filter(e => e.obiettivo && e.obiettivo.coachTipo === 'scarico').length;
    if (scaricati >= Math.ceil(es.length / 2) && !/^scarico/.test(String(faseSedutaSalvata(h, prog) || ''))) date.push(d);
  });
  date.sort((a, b) => a - b);
  let episodi = 0, ultimo = null;
  date.forEach(d => { if (ultimo === null || giorniTra(ultimo, d) > 7) episodi++; ultimo = d; });
  return episodi;
}

/* MES-07: il coach puo decidere uno scarico per la fatica adesso? `causa` = il segnale da cui parte chi chiede (S7 le sedute al limite di DEC-06 e lo strain di STR-01, S1 la prontezza di
   PRZ-04): conta come acceso. Ritorna { ok: true, segnali: [...], forte } oppure { ok: false, codice, perche } con il perche in italiano (da mostrare, mai una diagnosi).
   Programmi della v1 e regola spenta: ok, come prima. Le protezioni, nell ordine: scarico gia in corso o gia deciso, prime settimane del blocco, distanza dall ultimo scarico, uno ogni 3
   settimane, scarico del programma vicino, e per ultimo i segnali (mai uno solo) */
function valutaScaricoReattivo(causa) {
  const p = programmaConPiano();
  const prot = sogliaScarico('reattivoProtezioni'), seg = sogliaScarico('reattivoSegnali');
  if (!p || !prot || !seg || !regolaAttiva('MES-07')) return { ok: true, segnali: [], forte: false };
  const no = (codice, perche) => ({ ok: false, codice: codice, perche: perche });
  const sett = settimanaProgramma();
  if (sett && !sett.finito && sett.fase === 'scarico') return no('inCorso', 'È già una settimana di scarico: il coach non ne aggiunge un altro.');
  const ag = aggiustiCoach();
  if (ag.scarico && ag.scarico.sedute > 0) return no('giaDeciso', 'Il coach ha già deciso uno scarico: si fa quello.');
  const blocco = p.piano.struttura && Number(p.piano.struttura.blocco) > 0 ? Number(p.piano.struttura.blocco) : 0;
  const primeNelBlocco = sett && !sett.finito && blocco && sett.numero >= 1 && ((sett.numero - 1) % blocco) + 1 <= prot.primeSettimaneDelBlocco;
  /* chi comincia: nelle prime 3 settimane del programma, salvo un segnale forte (la dolenzia e l abitudine dei primi giorni si scambiano per fatica) */
  const primeDelPrincipiante = sett && !sett.finito && p.piano.livello === 'principiante' && p.piano.modo === 'normale' && sett.numero >= 1 && sett.numero <= prot.principiantiPrimeSettimane && !segnaliFatica().forte;
  if (primeNelBlocco || primeDelPrincipiante)
    return no('primeSettimane', 'Siamo nelle prime settimane del blocco: la dolenzia dei primi giorni non è fatica accumulata, per ora nessuno scarico.');
  if (typeof scaricoRecente === 'function' && scaricoRecente(prot.giorniDalloScarico))
    return no('distanza', 'C’è stato uno scarico da meno di ' + prot.giorniDalloScarico + ' giorni: per ora nessun altro scarico.');
  if (scarichiReattiviRecenti(prot.unoOgniGiorni) > 0)
    return no('unoOgniTre', 'Il coach ha già deciso uno scarico nelle ultime ' + Math.round(prot.unoOgniGiorni / 7) + ' settimane: ne decide al massimo uno ogni ' + Math.round(prot.unoOgniGiorni / 7) + ' settimane.');
  const oggi = new Date(), prog = getProgramma();
  for (let k = 1; k <= prot.programmatoEntroGiorni; k++)
    if (faseDelGiorno(piuGiorni(oggi, k), prog) === 'scarico') return no('programmato', 'Lo scarico del programma è tra pochi giorni: si fa quello, senza un secondo scarico.');
  const s = segnaliFatica();
  if (causa && Object.prototype.hasOwnProperty.call(s, causa) && causa !== 'forte') s[causa] = true;
  const attivi = ['S1', 'S2', 'S3', 'S5', 'S6', 'S7'].filter(k => s[k]);
  const conUnoTra = attivi.some(k => seg.unoTra.indexOf(k) !== -1);
  if (!s.forte && !(attivi.length >= seg.distinti && conUnoTra))
    return no('unSegnale', 'Un solo segnale di stanchezza non basta per scaricare: il coach aspetta un secondo segnale (prontezza bassa, forza in calo).');
  return { ok: true, segnali: attivi, forte: s.forte };
}
/* i segnali a parole, per il motivo dello scarico: «sedute al limite, prontezza bassa» */
function testoSegnali(segnali) { return (segnali || []).map(k => NOMI_SEGNALI[k]).filter(Boolean).join(', '); }

/* ---------------- CST-09: la stanchezza che non passa ---------------- */

/* CST-09: la prontezza media degli ultimi 14 giorni (almeno 5 misure) e a 3/8 della scala o meno, oppure il coach ha deciso due scarichi in 6 settimane. Solo programmi v2, con il consenso e con la
   regola accesa; il messaggio si puo nascondere (nascondiStanchezza) e torna dopo 7 giorni. Ritorna { cause: ['prontezza', 'scarichi'] } o null */
function stanchezzaPersistente() {
  const s = sogliaScarico('stanchezzaPersistente');
  if (!s || !programmaConPiano() || !regolaAttiva('CST-09') || typeof coachAttivo !== 'function' || !coachAttivo()) return null;
  const ag = aggiustiCoach(), oggi = new Date();
  if (ag.stanchezzaVistaIl && giorniTra(daYmd(ag.stanchezzaVistaIl), oggi) < s.ripropostaGiorni) return null;
  const misure = storicoProntezza().filter(x => x && typeof x.punteggio === 'number' && giorniTra(daYmd(x.data), oggi) <= s.giorni);
  const media = misure.length ? misure.reduce((t, x) => t + x.punteggio, 0) / misure.length : null;
  const cause = [];
  if (misure.length >= s.misureMin && media <= s.prontezzaMediaMax) cause.push('prontezza');
  if (scarichiReattiviRecenti(s.settimane * 7) >= s.scarichiReattivi) cause.push('scarichi');
  return cause.length ? { cause: cause } : null;
}
/* il messaggio di CST-09: cosa succede, riposo o camminate, e il medico se non passa. Niente «sovrallenamento», niente diagnosi */
function htmlStanchezzaPersistente() {
  const x = stanchezzaPersistente();
  if (!x) return '';
  const causa = x.cause.indexOf('prontezza') !== -1 ? 'La stanchezza dura da due settimane' : 'Il coach ha dovuto alleggerire il programma due volte in poco tempo';
  return '<div class="card pz-card"><div class="pz-head"><b>Stanchezza che non passa</b><button class="og-link" onclick="nascondiStanchezza()">Ho capito</button></div>' +
    '<div class="pz-sub">' + escapeHtml(causa) + ': questa settimana riposa o fai solo camminate.</div>' +
    '<div class="pz-sub">Se non passa, dormi male o ti senti giù, parlane con il medico: l’app non può capire cosa c’è dietro.</div></div>';
}
/* «Ho capito»: il messaggio sparisce per 7 giorni (annullabile) */
window.nascondiStanchezza = function() {
  const prima = localStorage.getItem(AGG_KEY());
  const ag = aggiustiCoach();
  ag.stanchezzaVistaIl = ymd(new Date());
  salvaAggiusti(ag);
  if (typeof renderProntezza === 'function') renderProntezza();
  if (typeof showUndo === 'function') showUndo('Messaggio nascosto per qualche giorno', () => { if (prima !== null) localStorage.setItem(AGG_KEY(), prima); else localStorage.removeItem(AGG_KEY()); if (typeof renderProntezza === 'function') renderProntezza(); }, 6000);
};
