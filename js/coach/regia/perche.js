/* Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03)
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   REG-03 (piano coach v2 B.2, B.5, B.6). Una regola che cambia un numero lascia un «perché»
   { codice, sottoCoach, testo } nel contenitore che sta preparando: il brief del programma, il programma, il
   risultato di caricoProssimo. Il motivo mostrato all'utente e testoPerche(perche): i testi in ordine, separati
   da « • » come i motivi di oggi (il traduttore li traduce a pezzi); con { etichette: true } ogni testo porta il
   nome breve del suo sotto-coach («Bilancia · ...», per il foglio «Perché?» di W5-T1).
   Una regola bloccata (registro C.2, cancello E.0 punto 0) non parla: aggiungiPerche la ignora.
   La squadra (nomi, missioni, codici) viene dal capitolo 0 della mappa, attraverso COACH_SQUADRA e COACH_REGOLE
   del catalogo generato: tutto si legge durante l'esecuzione, nessun vincolo d'ordine con il catalogo.
   ============================================================ */
const SEPARATORE_PERCHE = ' • ';
const SEPARATORE_ETICHETTA_PERCHE = ' · ';
/* REG-03: posto della fase che porta i perché nel motivo, l'ultima della catena 'carico' (piano B.3) */
const ORDINE_FASE_PERCHE = 99;
/* registro C.4: cosa mostra il foglio «Perché?» accanto a un numero con questa forza (le altre forze non hanno etichetta) */
const ETICHETTE_FORZA = {
  Convenzione: 'Scelta prudente del coach (Convenzione): non è un risultato di studi',
  Decisione: 'Decisione di prodotto',
  Provvisoria: 'Numero di partenza, in verifica'
};

/* XXX-NN dentro una voce della squadra: 'PRG-07', 'PRG-01..11', 'IPE-*' (come tools/genera-catalogo.js) */
function codiceInSquadra(codice, voce) {
  const c = String(codice).match(/^([A-Z]{2,3})-(\d{2})$/);
  const v = String(voce).match(/^([A-Z]{2,3})-(?:(\*)|(\d{2})(?:\.\.(\d{2}))?)$/);
  if (!c || !v || c[1] !== v[1]) return false;
  if (v[2]) return true;
  const n = Number(c[2]), da = Number(v[3]), a = v[4] !== undefined ? Number(v[4]) : da;
  return n >= da && n <= a;
}

/* id del sotto-coach di un codice ('bilancia'...), o null: prima il catalogo, poi la tabella della squadra
   (cosi anche un codice nuovo, non ancora nella mappa, trova il suo sotto-coach) */
function sottoCoachDi(codice) {
  const voce = typeof regolaDescritta === 'function' ? regolaDescritta(codice) : null;
  if (voce && voce.sottoCoach) return voce.sottoCoach;
  if (typeof COACH_SQUADRA === 'undefined' || !Array.isArray(COACH_SQUADRA)) return null;
  const s = COACH_SQUADRA.find(x => (x.codici || []).some(v => codiceInSquadra(codice, v)));
  return s ? s.id : null;
}

/* nome del sotto-coach in italiano ('La Bilancia'; con { breve: true } 'Bilancia'); '' se l'id non c'e.
   La traduzione la fa chi lo mostra (tr), come per ogni testo dell'app */
function nomeSottoCoach(id, opz) {
  const s = typeof COACH_SQUADRA !== 'undefined' && Array.isArray(COACH_SQUADRA) ? COACH_SQUADRA.find(x => x.id === id) : null;
  if (!s) return '';
  return opz && opz.breve ? s.nome.replace(/^(Il|La|Lo|L[’'])\s*/, '') : s.nome;
}

/* etichetta per la forza di una soglia (registro C.4): '' per Solida, Moderata, Contrastata o una forza sconosciuta */
function etichettaForza(forza) {
  return Object.prototype.hasOwnProperty.call(ETICHETTE_FORZA, forza) ? ETICHETTE_FORZA[forza] : '';
}

/* REG-03: aggiunge un perché a dove.perche (lo crea se manca) e lo restituisce; null se il testo e vuoto o se la
   regola e bloccata. Lo stesso codice con lo stesso testo non si ripete. `extra` (facoltativo) porta altri campi per il
   foglio «Perché?» (per esempio { forza: 'Convenzione', valore: 2.5 }): codice, sottoCoach e testo non si sovrascrivono */
function aggiungiPerche(dove, codice, testo, extra) {
  if (!dove || typeof dove !== 'object' || !codice) return null;
  const t = testo == null ? '' : String(testo).trim();
  if (!t) return null;
  const regola = typeof regolaDescritta === 'function' ? regolaDescritta(codice) : null;
  if (regola && regola.bloccata) return null;
  if (!Array.isArray(dove.perche)) dove.perche = [];
  const gia = dove.perche.find(p => p && p.codice === codice && p.testo === t);
  if (gia) return gia;
  const voce = Object.assign({}, extra || {}, { codice: String(codice), sottoCoach: sottoCoachDi(codice), testo: t });
  dove.perche.push(voce);
  return voce;
}

/* REG-03: il motivo da mostrare. `perche` e l'elenco (o un oggetto con .perche); i testi vuoti e i doppioni si saltano */
function testoPerche(perche, opz) {
  const elenco = Array.isArray(perche) ? perche : (perche && Array.isArray(perche.perche) ? perche.perche : []);
  const pezzi = [];
  elenco.forEach(p => {
    if (!p) return;
    const t = (typeof p === 'string' ? p : String(p.testo || '')).trim();
    if (!t) return;
    const etichetta = opz && opz.etichette && p.sottoCoach ? nomeSottoCoach(p.sottoCoach, { breve: true }) : '';
    const pezzo = etichetta ? etichetta + SEPARATORE_ETICHETTA_PERCHE + t : t;
    if (pezzi.indexOf(pezzo) === -1) pezzi.push(pezzo);
  });
  return pezzi.join(SEPARATORE_PERCHE);
}

/* REG-03, fase 'carico' 99 (piano B.3): porta i perché del risultato nel motivo, dopo i pezzi che gli strati di oggi
   hanno gia scritto e senza ripeterli. Senza perché il risultato resta identico (stesso oggetto, stesso motivo) */
function fasePerche(r) {
  if (!r || !Array.isArray(r.perche) || !r.perche.length) return r;
  const gia = String(r.motivo || '').split(SEPARATORE_PERCHE).map(x => x.trim()).filter(Boolean);
  const nuovi = testoPerche(r.perche).split(SEPARATORE_PERCHE).filter(x => x && gia.indexOf(x) === -1);
  if (nuovi.length) r.motivo = gia.concat(nuovi).join(SEPARATORE_PERCHE);
  return r;
}

/* La catena delle fasi e di W1-T3 (js/coach/regia/fasi.js, caricato prima di questo file): se c'e, la fase dei perché
   si registra da sola come ultima della catena 'carico'; se non c'e, il motivo resta quello degli strati di oggi */
if (typeof registraFase === 'function') registraFase('carico', ORDINE_FASE_PERCHE, 'REG-03', fasePerche);
