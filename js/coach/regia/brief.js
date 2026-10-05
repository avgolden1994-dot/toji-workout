/* Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   IL BRIEF (piano coach v2, B.2; W1-T4)
   Un oggetto semplice, costruito UNA volta per programma da briefCoach(d, prof0) e passato come argomento a ogni stadio del generatore
   (js/coach/regia/genera.js): nessuna variabile globale nuova. Ogni stadio legge cio che gli serve e scrive solo la sua parte
   (la Sentinella riempie sicurezza.vincoli, il Regista le note). In forma leggera si ricostruisce a ogni apertura di seduta (briefOggi).
   Raggruppamento: chi (la persona), obiettivi, agenda (giorni, minuti, luogo), preferenze, corpo (BIA, sonno), mente (psicologia,
   momento di vita, esigenza), sicurezza (fastidi e vincoli), metodo (struttura scelta), test (prove fai-da-te), lavoro (il cantiere
   del programma in costruzione: note, sostituzioni, preferenze nella forma che consentito() legge) e grezzo (d e prof0 come arrivano:
   le funzioni che oggi leggono ancora il profilo, come contestoCarichi e statoBia, li vogliono cosi; le onde successive le tolgono).
   Qui vive anche la fase del corpo (OBI-02, faseCorpo): una sola funzione per tutta l app.
   Obiettivi che il coach non conosce ancora (D-P6: corsa, abilita, schiena, sport): il programma ripiega su «salute» (obiettiviEffettivi)
   ma il profilo conserva quello dichiarato (prog.goals = obiettivi.dichiarati).
   ============================================================ */

/* gli obiettivi che il generatore sa trasformare in un programma (ONB_GOALS di onboarding.js e i rami di schemeFor): un id fuori da qui
   non si perde, ma il programma e quello di salute finche un task dell onda dopo la v2 non registra l obiettivo (specialitaStruttura) */
const OBIETTIVI_NOTI = ['massa', 'dimagrimento', 'forza', 'ricomposizione', 'salute', 'glutei'];

/* gli obiettivi dichiarati, al massimo tre, come li leggeva buildProgram (vecchio campo goal compreso); senza obiettivi: salute */
function obiettiviDichiarati(d) {
  return (d.goals && d.goals.length) ? d.goals.slice(0, 3) : [d.goal || 'salute'];
}
/* D-P6: gli obiettivi con cui si costruisce il programma. Quelli noti restano com e sono (anche ripetuti, come prima); ognuno sconosciuto
   diventa «salute» (una volta sola: due sconosciuti non fanno due «salute») */
function obiettiviEffettivi(dichiarati) {
  const out = [];
  let ripiegato = false;
  dichiarati.forEach(g => {
    if (OBIETTIVI_NOTI.indexOf(g) === -1) { if (out.indexOf('salute') === -1) { out.push('salute'); ripiegato = true; } return; }
    if (g === 'salute' && ripiegato) return;   /* c e gia, al posto di un obiettivo che il coach non conosce ancora */
    out.push(g);
  });
  return out;
}

/* OBI-02: la fase del corpo dagli obiettivi, una sola regola per tutta l app (scheda Peso, pannello del coach, nota dei passi del programma).
   Il dimagrimento, in qualunque posizione, e un deficit: e quello che la nota dei passi del programma faceva gia (10-12 mila, in qualunque
   posizione) mentre la scheda Peso e il pannello guardavano solo il primo obiettivo (docs/ricerca-obiettivi-e-programmi.md A5). Poi vince il
   primo tra ricomposizione e massa; altrimenti mantenimento. La priorita tra massa e dimagrimento dichiarati insieme e di OBI-01 (W2-T5):
   fino ad allora il deficit prevale, che e la scelta prudente (nessun surplus consigliato a chi vuole anche dimagrire). */
function faseDaObiettivi(goals) {
  const g = goals || [];
  if (g.indexOf('dimagrimento') !== -1) return 'deficit';
  return g.find(x => x === 'ricomposizione' || x === 'massa') || 'mantenimento';
}
/* la fase di un profilo (quello salvato se non si passa niente): la fase scelta a mano in Opzioni vince, poi quella dagli obiettivi */
function faseCorpo(prof) {
  const p = prof || (typeof getProfile === 'function' ? getProfile() : null) || {};
  if (p.fase) return p.fase;
  return faseDaObiettivi(p.goals || (p.goal ? [p.goal] : []));
}

/* INT-2a (m9 della revisione dell onda 1): un livello che il coach non conosce (per esempio «esperto», da un backup o da un altra app) non fa piu lanciare buildProgram («reading '1'» in volume.js):
   ricade sul piu vicino dei tre noti (esperto, pro, elite -> avanzato; inizio, novizio, base -> principiante; il resto -> intermedio). Un livello mancante resta «intermedio» come prima */
const LIVELLI_NOTI = ['principiante', 'intermedio', 'avanzato'];
function livelloConosciuto(livello) {
  const l = String(livello || '').toLowerCase();
  if (LIVELLI_NOTI.indexOf(l) !== -1) return l;
  if (/avanz|esper|expert|advanced|pro|elite|agonist/.test(l)) return 'avanzato';
  if (/princip|inizi|novizi|beginner|base|neofit/.test(l)) return 'principiante';
  return 'intermedio';
}

/* m9 (INT-2b): il livello che arriva grezzo («Principiante assoluto», «esperto») entra nel brief gia normalizzato: chi legge `d.level` dopo il brief (il metodo famoso, l esigenza, le partenze, la
   composizione) vede lo stesso livello di `chi.livello`, non una stringa che nessuna tabella conosce. Un livello mancante resta mancante (ognuno ha il suo ripiego: «intermedio» per il brief,
   «principiante» per le partenze, D-P12); `d` del chiamante non si tocca (e onbData: serve identico per `usaProfilo`) */
function conLivelloNoto(d) {
  if (!d || !d.level || LIVELLI_NOTI.indexOf(d.level) !== -1) return d;
  return Object.assign({}, d, { level: livelloConosciuto(d.level) });
}

/* chi sei: eta (0 = non detta), minorenne, over 65, livello, PAR-Q, prudente. Una sola definizione per il brief del programma e per quello di oggi. */
function chiDa(d) {
  const eta = Number(d.age) || 0;
  const over65 = eta >= 65;
  const minorenne = eta >= PARAM_ETA.min && eta < PARAM_ETA.maggiorenne;   /* ETA-02 e ETA-03: profilo minorenne (assorbe REC-11); un eta non detta resta «adulto» per i programmi gia salvati */
  const parq = d.parq === 'si' || d.parq === true;
  const livello = livelloConosciuto(d.level);
  const sesso = d.sex === 'F' || d.sex === 'donna' ? 'F' : (d.sex === 'M' || d.sex === 'uomo' ? 'M' : null);
  return { sesso: sesso, donna: d.sex === 'F' || d.sex === 'donna', eta: eta, minorenne: minorenne, over65: over65, livello: livello, principiante: livello === 'principiante',
    parq: parq, cauto: over65 || parq || minorenne };
}

/* briefCoach(d, prof0): d sono le risposte (onbData o un profilo), prof0 il profilo salvato (vuoto se d non e onbData).
   Lancia l errore dell eta sotto i 13 anni (ETA-01, D-P9): e l ultima guardia, perche un programma da adulto a un bambino e peggio di nessun programma
   (e nessun chiamante scrive niente prima di aver ricevuto il programma). Il metodo (metodo.attivo, tocco, ispirazioni) lo completa
   risolviMetodo(brief) dopo i vincoli: il tocco dipende da cosa la Sentinella ammette. */
function briefCoach(d, prof0) {
  prof0 = prof0 || {};
  d = conLivelloNoto(d);   /* m9 */
  const dichiarati = obiettiviDichiarati(d);
  const goals = obiettiviEffettivi(dichiarati);
  const chi = chiDa(d);
  if (chi.eta > 0 && chi.eta < PARAM_ETA.min) throw new Error(MSG_ETA_SOTTO_MINIMO);
  const freqScelta = ['1', '2', '3'].indexOf(String(d.freq || prof0.freq || '')) !== -1 ? String(d.freq || prof0.freq) : null;
  /* chi ha davanti: le risposte psicologiche cambiano come si usano le regole; il coach compone: fattore fisico (BIA, dati) + psicologico + momento di vita */
  const ps = psicoCoach(d.psico || prof0.psico);
  const fis = fattoreFisico(d, prof0);
  const moG = typeof momentoAttivo === 'function' ? momentoAttivo() : null;
  /* esigenza del coach: +20% all inizio, poi segue l andamento (mai oltre il massimo del livello) */
  const esigenza = (chi.cauto || (moG && !moG.scaduto && (moG.vol < 1 || moG.rir))) ? 1 :
    (d.esigenza || (prof0.esigenza && prof0.esigenza.valore) || esigenzaIniziale(d, prof0));   /* INT-02: parte dal corpo (BIA) */
  const seme = d.seme !== undefined ? d.seme : [ymd(new Date()), chi.livello, d.days, goals.join('+'), (d.cicli || prof0.cicli || 0), (d.variante || 0)].join('|');
  return {
    versione: 2, seme: seme,
    chi: chi,
    obiettivi: { dichiarati: dichiarati, lista: goals, primo: goals[0], scheme: schemaMisto(goals), fase: faseCorpo({ goals: goals, fase: d.fase || prof0.fase }),
      modalita: 'generale' /* FRZ-01, EST-01 */, prioritaUnita: [] /* max 2, EST-02 (W2-T1) */ },
    agenda: { giorni: d.days /* come arriva: i controlli sui giorni lo leggono cosi */, minuti: Number(d.minutes) || 60, luogo: d.luogo || 'palestra',
      attrezziPalestra: d.attrezziPalestra !== undefined ? d.attrezziPalestra : (prof0.attrezziPalestra || null), passiPalestra: null /* W3-T1 */, freqScelta: freqScelta, indiciGiorni: null /* giorniSettimana */ },
    preferenze: { graditi: d.graditi || prof0.graditi || [], odiati: d.odiati || prof0.odiati || [], attrezzi: d.attrezzi || 'indifferente', varieta: 1 /* lo completa risolviMetodo */,
      priorita: (d.priorita || prof0.priorita || []).slice(0, 3) /* i gruppi scelti dall utente (fino a 3); le unita fini sono di EST-02 */, scelte: d.scelte || {} },
    corpo: { fis: fis, sonno: d.sonno || 'bene', statoBia: null /* INT-01: si legge dove serve (statoBia(d, prof0)) */, massa: null /* contestoCarichi, in applicaPartenze */ },
    mente: { ps: ps, momento: moG, esigenza: esigenza },
    sicurezza: { fastidi: (d.fastidi || []).filter(f => f !== 'nessuno'), vincoli: null /* riempito da vincoliSicurezza(brief), Sentinella */ },
    metodo: { attivo: null, tocco: null, ispirazioni: [], scelta: null },
    test: d.test || prof0.test || {},
    perche: [],   /* aggiungiPerche(brief, codice, testo): note del programma con codice (regia/perche.js, W1-T1) */
    lavoro: { note: [], sostituzioni: [], prefs: null, nEs: 0, tipiGiorno: [], senzaSbarra: false, pulloverMesso: false, senzaSbarraSerieInPiu: [], dropAssegnato: false, potenzaAssegnata: false, specializza: false },
    grezzo: { d: d, prof0: prof0 }
  };
}

/* il metodo famoso scelto (se c e), il «tocco» preso da un altro e il perche. Dopo i vincoli: un tocco che porta al cedimento (l ultima serie AMRAP)
   non si prende per chi non puo farlo (B22: il testo che il coach mostra deve essere quello che fa). Riempie metodo.* e preferenze.varieta. */
function risolviMetodo(brief) {
  const { d, prof0 } = brief.grezzo;
  const chi = brief.chi, ps = brief.mente.ps, fis = brief.corpo.fis;
  const dEff = Object.assign({}, d, { goals: brief.obiettivi.lista });   /* l obiettivo che il programma usa davvero (D-P6) */
  const scelta = d.metodo !== undefined ? { primo: d.metodo && metodoDa(d.metodo) ? { m: metodoDa(d.metodo), perche: [] } : null, secondo: null } : sceltaMetodo(dEff, prof0, ps, fis, chi.livello, chi.over65);
  const metodo = scelta.primo ? scelta.primo.m : null;
  const attivo = metodo && metodo.applicabile && metodo.id !== 'coach' ? metodo : null;
  const ispirazioni = [];
  if (attivo) ispirazioni.push({ id: attivo.id, ruolo: 'struttura', perche: scelta.primo.perche || [] });
  else ispirazioni.push({ id: 'coach', ruolo: 'struttura', perche: [] });
  const tecnicheOk = tecnicheAlCedimentoAmmesse(brief);
  const tocco = scelta.secondo && TOCCHI[scelta.secondo.m.tocco] && (tecnicheOk || !TOCCHI[scelta.secondo.m.tocco].alCedimento) ? scelta.secondo : null;
  if (tocco) ispirazioni.push({ id: tocco.m.id, ruolo: 'dettaglio', dettaglio: TOCCHI[tocco.m.tocco].testo, perche: (tocco.perche || []).filter(t => !/giorni a settimana/.test(t)) });
  brief.metodo = { attivo: attivo, tocco: tocco, ispirazioni: ispirazioni, scelta: scelta };
  /* routine: stessi esercizi, salvo chi chiede un altra variante */
  brief.preferenze.varieta = attivo ? Math.min(ps.varieta, attivo.varieta) || (d.variante ? 0.5 : 0) : (ps.varieta || (d.variante ? 0.5 : 0));
  return brief;
}

/* le preferenze nella forma che consentito(), sostituto() e le schermate leggono (prog.prefs, profilo salvato): l ordine dei campi e quello di sempre.
   luogo: se il metodo ne impone uno, vince il metodo. esclusi: i nomi che la Sentinella vieta (vincoli.vietati). */
function prefsDelBrief(brief) {
  const prefs = { luogo: brief.agenda.luogo, fastidi: brief.sicurezza.fastidi, sonno: brief.corpo.sonno, attrezzi: brief.preferenze.attrezzi,
    attrezziPalestra: brief.agenda.attrezziPalestra, graditi: brief.preferenze.graditi, odiati: brief.preferenze.odiati, priorita: brief.preferenze.priorita };
  prefs.esclusi = Object.keys((brief.sicurezza.vincoli || {}).vietati || {});
  if (brief.metodo.attivo && brief.metodo.attivo.luogo) prefs.luogo = brief.metodo.attivo.luogo;
  return prefs;
}

/* briefOggi(giorno): il brief leggero a ogni apertura di seduta. Tutto da dati gia salvati (profilo, programma, aggiusti, momento): nessuna scrittura.
   prontezza la riempie la fase «prontezza» (applicaProntezza); la settimana viene dal programma in corso. */
function briefOggi(giorno) {
  const p = (typeof getProfile === 'function' ? getProfile() : null) || {};
  const prog = typeof getProgramma === 'function' ? getProgramma() : null;
  const sett = prog && typeof settimanaProgramma === 'function' ? settimanaProgramma() : null;
  const chi = chiDa({ age: p.age, level: p.level, parq: !!p.parq, sex: p.sex });   /* parq e un booleano nel profilo salvato (profiloCoach: !!p.parq) */
  const goals = obiettiviEffettivi(obiettiviDichiarati({ goals: p.goals, goal: p.goal }));
  const leggero = { chi: chi, sicurezza: { fastidi: (p.fastidi || []).filter(f => f !== 'nessuno'), vincoli: null }, lavoro: {} };
  return {
    giorno: giorno || null,
    chi: chi,
    obiettivi: { dichiarati: obiettiviDichiarati({ goals: p.goals, goal: p.goal }), lista: goals, primo: goals[0], fase: faseCorpo(p), modalita: 'generale' },
    programma: prog ? { settimane: prog.settimane, blocco: prog.blocco, fasi: prog.fasi, rirSett: prog.rirSett, split: prog.split, seme: prog.seme, goals: prog.goals } : null,
    settimana: sett ? { numero: sett.numero, fase: sett.fase, totale: sett.totale, finito: !!sett.finito } : null,
    prontezza: null,
    aggiusti: typeof aggiustiCoach === 'function' ? aggiustiCoach() : null,
    momento: typeof momentoAttivo === 'function' ? momentoAttivo() : null,
    esigenza: p.esigenza || null,
    vincoli: typeof vincoliSicurezza === 'function' ? vincoliSicurezza(leggero) : null
  };
}
