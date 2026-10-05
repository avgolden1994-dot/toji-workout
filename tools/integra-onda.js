#!/usr/bin/env node
/* Integrazione di fine onda (3in, piano coach v2, protocollo E.0 punti 3-4): i task NON toccano i file condivisi
   (index.html, i dizionari js/lingue/en|es|de.js, docs/coach-mappa-regole.md, docs/mappa-per-agenti.md...): ognuno scrive
   cio che serve in docs/in-arrivo/<task>.json e questo strumento lo applica, una volta, nell'integrazione (INT-N).

   node tools/integra-onda.js --controlla [json...]   controlla i JSON (senza scrivere nulla): esce 1 se qualcosa non va
   node tools/integra-onda.js --prova [json...]       applica in una COPIA di lavoro, rigenera i file generati, lancia npm run controlla
                                                      (che comprende npm test) e butta la copia: il repo non cambia. Esce 1 se fallisce.
                                                      Senza JSON prova comunque il ramo con i file generati rigenerati (utile ai task che
                                                      toccano solo js/: docs/mappa-simboli.md e gli altri generati restano da INT)
   node tools/integra-onda.js [json...]               applica davvero (dopo aver controllato), poi cancella i JSON e docs/in-arrivo/
   node tools/integra-onda.js --a-secco [json...]     come sopra ma dice solo cosa cambierebbe
   node tools/integra-onda.js --autotest              prove dello strumento su una copia dei file veri (fa parte di npm run controlla)
   Senza elenco di file usa docs/in-arrivo/*.json. Altre opzioni: --tieni (non cancellare i JSON), --tieni-copia (non buttare la copia della prova),
   --radice <cartella> (lavora su un'altra radice del repo: serve alle prove).

   Formato (tutti i campi tranne `task` sono facoltativi; un campo sconosciuto e un errore):
   { "task": "W2-T8",
     "script": [{ "src": "js/coach/carichi/calibrazione.js", "dopo": "js/coach/carichi/partenza.js" }],      // riga <script> in index.html ("prima" al posto di "dopo": prima di quel file)
     "stili": [{ "href": "css/nuovo.css", "dopo": "css/piano.css" }],                                          // riga <link rel="stylesheet"> in index.html
     "frasi": { "Carico tarato: da qui la progressione normale": { "en": "...", "es": "...", "de": "..." } },  // in fondo ai tre dizionari; numeri = #, valori variabili = %s
     "regole": [{ "capitolo": 8, "riga": "- **CAR-18** (spegnibile) calibrazione rapida ...", "sostituisce": false, "titolo": "solo se il capitolo non c'e" }],
     "capitoli": [{ "numero": 21, "titolo": "Nome del capitolo", "testo": "testo o tabella (stringa con a capo, o array di righe)" }],
     "squadra": [{ "sottoCoach": "bilancia", "codici": "CAR-18..19" }],                                         // aggiunge i codici alla riga del sotto-coach nella tabella del capitolo 0
     "mappaAgenti": ["calibrazione rapida: js/coach/carichi/calibrazione.js (fase 'carico' 15)"],              // righe in docs/mappa-per-agenti.md, sezione «Novita del coach v2»
     "nota": "testo libero, ignorato" }
   Controlli: JSON valido, file di script esistenti e con l'intestazione `/* Titolo`, sintassi (acorn), nessuna frase senza en, es o de,
   `#` e `%s` uguali tra italiano e traduzioni, nessuna voce che sovrascrive una traduzione esistente, codici di regola nel formato
   `XXX-NN` letto da npm run catalogo (una riga, a inizio riga, mai ripetuto), regole bloccate del registro C.2 solo come riga «(bloccata)»
   (cancello E.0 punto 0), sotto-coach noti. Dopo l'applicazione si rigenera: npm run sw, catalogo, indice, simboli (e soglie dall'INT-1),
   si alza CACHE_NAME in sw.js UNA volta, poi npm run grafo per ultimo. */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm');
const { spawnSync, execFileSync } = require('child_process');

let RADICE = path.join(__dirname, '..');
const DIR_IN_ARRIVO = 'docs/in-arrivo';
const FILE_MAPPA = 'docs/coach-mappa-regole.md', FILE_AGENTI = 'docs/mappa-per-agenti.md', FILE_REGISTRO = 'docs/coach-v2-decisioni.md', FILE_HTML = 'index.html';
const LINGUE = ['en', 'es', 'de'];
const CAMPI = ['task', 'script', 'stili', 'frasi', 'regole', 'capitoli', 'squadra', 'mappaAgenti', 'nota'];
/* i sotto-coach della squadra (piano B.1): `id` nel capitolo 0 della mappa */
const SOTTO_COACH = ['regista', 'architetto', 'dosatore', 'bilancia', 'sentinella', 'tecnico', 'preparatore', 'motivatore', 'specialista'];
const SEZIONE_AGENTI = '## Novità del coach v2';
const RX_CODICE = /^- \*\*([A-Z]{3}-\d{2})\*\* /;   /* lo stesso di tools/genera-catalogo.js */
const RX_CODICI_SQUADRA = /^[A-Z]{3}-\d{2}(\.\.\d{2})?(, ?[A-Z]{3}-\d{2}(\.\.\d{2})?)*$/;

const p = f => path.join(RADICE, f);
const leggi = f => fs.readFileSync(p(f), 'utf8');
const esiste = f => fs.existsSync(p(f));
const conta = (s, re) => (String(s).match(re) || []).length;

/* ------------------------------------------------------------------------------------------------ lettura dei JSON */
function elencoJson(args) {
  if (args.length) return args.map(a => path.resolve(a));
  const dir = p(DIR_IN_ARRIVO);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.json$/.test(f)).sort().map(f => path.join(dir, f)) : [];
}
function leggiBatch(files, errori, avvisi) {
  const batch = [], visti = new Set();
  files.forEach(file => {
    const nome = path.basename(file);
    let dati;
    try { dati = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { errori.push(nome + ': ' + (e.code === 'ENOENT' ? 'file non trovato' : 'JSON non valido (' + e.message + ')')); return; }
    if (!dati || typeof dati !== 'object' || Array.isArray(dati)) { errori.push(nome + ': il JSON deve essere un oggetto'); return; }
    if (typeof dati.task !== 'string' || !dati.task.trim()) { errori.push(nome + ': manca `task` (per esempio "W2-T8")'); return; }
    if (visti.has(dati.task)) errori.push(nome + ': il task ' + dati.task + ' compare in due file');
    visti.add(dati.task);
    if (nome.replace(/\.json$/, '').toLowerCase() !== dati.task.toLowerCase()) avvisi.push(nome + ': il file dovrebbe chiamarsi ' + dati.task + '.json');
    Object.keys(dati).filter(k => CAMPI.indexOf(k) === -1).forEach(k => errori.push(dati.task + ': campo sconosciuto «' + k + '» (ammessi: ' + CAMPI.join(', ') + ')'));
    batch.push({ file, nome, task: dati.task, dati });
  });
  return batch;
}

/* ------------------------------------------------------------------------------------------------------ dizionari */
function leggiDizionario(lingua) {
  const ctx = { window: {} };
  vm.runInNewContext(leggi('js/lingue/' + lingua + '.js'), ctx);
  return ctx.window.I18N && ctx.window.I18N[lingua] ? ctx.window.I18N[lingua] : {};
}
/* aggiunge voci in fondo, prima di `};`: la vecchia ultima riga (senza virgola) la prende */
function aggiungiVoci(testo, voci) {
  const m = testo.match(/\n\};\s*$/);
  if (!m) throw new Error('il dizionario non finisce con `};`');
  const corpo = testo.slice(0, m.index).replace(/\s+$/, '');
  return corpo + ',\n' + voci.map(([k, v]) => JSON.stringify(k) + ': ' + JSON.stringify(v)).join(',\n') + '\n};\n';
}

/* ------------------------------------------------------------------------------------------ registro: regole bloccate */
/* registro C.2: { 'DON-13': { n: 5, parziale: false }, 'REC-06': { n: 1, parziale: true }, ... } */
function leggiBloccate(avvisi) {
  const out = {};
  if (!esiste(FILE_REGISTRO)) { avvisi.push('registro ' + FILE_REGISTRO + ' non trovato: il cancello delle regole bloccate (E.0 punto 0) non e stato controllato'); return out; }
  const righe = leggi(FILE_REGISTRO).split('\n');
  const da = righe.findIndex(r => /^### C\.2 /.test(r)), a = righe.findIndex((r, i) => i > da && /^### C\.3 /.test(r));
  if (da === -1) { avvisi.push('registro: sezione C.2 non trovata, regole bloccate non controllate'); return out; }
  righe.slice(da, a === -1 ? righe.length : a).forEach(r => {
    const m = r.match(/^\| (\d+) \| (.*?) \|/);
    if (!m) return;
    const cella = m[2], primo = cella.match(/\*\*([A-Z]{3}-\d{2})( [ab])?/);
    if (!primo) return;
    (cella.match(/[A-Z]{3}-\d{2}/g) || []).forEach(c => { out[c] = { n: Number(m[1]), parziale: !!primo[2] }; });
  });
  return out;
}

/* ------------------------------------------------------------------------------------------------ mappa (markdown) */
const RX_CAPITOLO = /^## (\d+)\. (.*)$/;
function trovaCapitolo(righe, n) {
  const i = righe.findIndex(r => { const m = r.match(RX_CAPITOLO); return m && Number(m[1]) === n; });
  if (i === -1) return null;
  let f = righe.findIndex((r, k) => k > i && /^## /.test(r));
  if (f === -1) f = righe.length;
  return { inizio: i, fine: f };
}
function creaCapitolo(righe, numero, titolo, testo) {
  const corpo = (Array.isArray(testo) ? testo : String(testo || '').split('\n')).filter((r, i, a) => !(i === a.length - 1 && r === ''));
  const blocco = ['## ' + numero + '. ' + titolo, ''].concat(corpo.length ? corpo.concat(['']) : []);
  let pos = righe.findIndex(r => { const m = r.match(RX_CAPITOLO); return m && Number(m[1]) > numero; });
  if (pos === -1) {
    while (righe.length && righe[righe.length - 1] === '') righe.pop();
    righe.push('', ...blocco);
    if (righe[righe.length - 1] !== '') righe.push('');
  } else righe.splice(pos, 0, ...blocco);
}
function inserisciRegola(righe, capitolo, riga) {
  const c = trovaCapitolo(righe, capitolo);
  let dopo = -1;
  for (let i = c.inizio + 1; i < c.fine; i++) if (RX_CODICE.test(righe[i])) dopo = i;
  if (dopo !== -1) {
    /* una riga di regola puo continuare sulle righe dopo (testo non vuoto che non inizia una voce, una tabella o un titolo) */
    while (dopo + 1 < c.fine && righe[dopo + 1].trim() && !/^(- |#|\|)/.test(righe[dopo + 1])) dopo++;
    righe.splice(dopo + 1, 0, riga);
    return;
  }
  let fine = c.fine;
  while (fine - 1 > c.inizio && righe[fine - 1].trim() === '') fine--;
  righe.splice(fine, 0, '', riga);
}

/* ------------------------------------------------------------------------------------------------ pianificazione */
/* Calcola cosa cambierebbe senza scrivere nulla: { modifiche: { file: nuovoTesto }, riepilogo: [righe] }; errori e avvisi si accumulano negli array passati */
function pianifica(batch, errori, avvisi) {
  const modifiche = {}, riepilogo = [];
  const html0 = esiste(FILE_HTML) ? leggi(FILE_HTML) : '';
  let html = html0;
  const bloccate = leggiBloccate(avvisi);
  let acorn = null; try { acorn = require('acorn'); } catch (e) { /* senza acorn la sintassi si controlla con npm test */ }

  /* ---- script e stili ---- */
  const voci = [];   /* { kind, rif, dopo|prima, task } */
  batch.forEach(({ task, dati }) => {
    [['script', 'src', 'script', f => /^js\/.+\.js$/.test(f)], ['stili', 'href', 'stili', f => /^css\/.+\.css$/.test(f)]].forEach(([campo, chiave, tipo, ok]) => {
      if (dati[campo] === undefined) return;
      if (!Array.isArray(dati[campo])) return errori.push(task + ': `' + campo + '` deve essere un elenco');
      dati[campo].forEach((v, i) => {
        const id = task + ' ' + campo + '[' + i + ']';
        if (!v || typeof v !== 'object' || typeof v[chiave] !== 'string') return errori.push(id + ': serve { ' + chiave + ', dopo|prima }');
        if (!ok(v[chiave])) return errori.push(id + ': percorso «' + v[chiave] + '» non valido (' + (tipo === 'script' ? 'js/…/nome.js' : 'css/nome.css') + ')');
        if ((v.dopo === undefined) === (v.prima === undefined)) return errori.push(id + ': serve esattamente uno tra `dopo` e `prima`');
        const rif = v.dopo !== undefined ? v.dopo : v.prima;
        if (typeof rif !== 'string') return errori.push(id + ': `dopo`/`prima` devono essere un percorso');
        if (tipo === 'script' && (rif === 'js/avvio.js' && v.dopo !== undefined || v[chiave] === 'js/avvio.js')) return errori.push(id + ': js/avvio.js resta l\'ultimo script: niente dopo di lui');
        if (!esiste(v[chiave])) return errori.push(id + ': il file ' + v[chiave] + ' non esiste');
        else if (tipo === 'script') {
          const src = leggi(v[chiave]);
          if (!/^\s*\/\*\s*\S/.test(src)) errori.push(id + ': ' + v[chiave] + ' deve iniziare con `/* Titolo breve (CODICI)` (la prima riga diventa la descrizione in docs/indice-codice.md)');
          else if (!/^[^\n]*\n\s*\(3in, parte di [^;]+; ordine di caricamento: vedi index\.html\) \*\//.test(src)) avvisi.push(id + ': ' + v[chiave] + ' dovrebbe avere come seconda riga `   (3in, parte di coach; ordine di caricamento: vedi index.html) */`');
          if (acorn) { try { acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' }); } catch (e) { errori.push(id + ': errore di sintassi in ' + v[chiave] + ': ' + e.message); } }
        }
        voci.push({ tipo, chiave, file: v[chiave], rif, dopo: v.dopo !== undefined, task, id });
      });
    });
  });
  const riga = (tipo, file) => tipo === 'script' ? '<script src="' + file + '"></script>' : '<link rel="stylesheet" href="' + file + '">';
  const gia = voci.map(v => v.file);
  gia.forEach((f, i) => { if (gia.indexOf(f) !== i) errori.push(f + ': compare due volte nei JSON'); });
  /* inserimento a passate: un `dopo` puo riferirsi a un file aggiunto da un altro JSON */
  let restanti = voci.filter(v => !errori.some(e => e.indexOf(v.id) === 0));
  for (let giro = 0; restanti.length && giro <= voci.length; giro++) {
    const prossimi = [];
    restanti.forEach(v => {
      const rx = (f, t) => new RegExp('^([ \\t]*)' + riga(t, f).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[ \\t]*$', 'm');
      if (rx(v.file, v.tipo).test(html)) return errori.push(v.id + ': ' + v.file + ' e gia in index.html');
      const m = html.match(rx(v.rif, v.tipo));
      if (!m) return prossimi.push(v);
      const nuova = m[1] + riga(v.tipo, v.file);
      html = v.dopo ? html.slice(0, m.index + m[0].length) + '\n' + nuova + html.slice(m.index + m[0].length) : html.slice(0, m.index) + nuova + '\n' + html.slice(m.index);
      riepilogo.push(v.task + ': ' + v.file + (v.dopo ? ' dopo ' : ' prima di ') + v.rif);
    });
    if (prossimi.length === restanti.length) { prossimi.forEach(v => errori.push(v.id + ': ' + v.rif + ' non e in index.html (ne aggiunto da un altro JSON)')); break; }
    restanti = prossimi;
  }
  if (html !== html0) modifiche[FILE_HTML] = html;

  /* ---- frasi ---- */
  const nuove = new Map();   /* it -> { en, es, de, task } */
  let dizionari = null;
  const dizionario = l => { dizionari = dizionari || {}; if (!dizionari[l]) { try { dizionari[l] = leggiDizionario(l); } catch (e) { errori.push('js/lingue/' + l + '.js non leggibile: ' + e.message); dizionari[l] = {}; } } return dizionari[l]; };
  batch.forEach(({ task, dati }) => {
    if (dati.frasi === undefined) return;
    if (!dati.frasi || typeof dati.frasi !== 'object' || Array.isArray(dati.frasi)) return errori.push(task + ': `frasi` deve essere un oggetto { "frase italiana": { en, es, de } }');
    Object.keys(dati.frasi).forEach(it => {
      const t = dati.frasi[it], id = task + ' frase «' + it.slice(0, 50) + (it.length > 50 ? '…' : '') + '»';
      if (!it.trim()) return errori.push(task + ': una frase italiana e vuota');
      if (it !== it.trim() || /\s{2}|\n/.test(it)) errori.push(id + ': la chiave non puo avere spazi doppi, a capo o spazi ai bordi (il traduttore normalizza il testo e non la troverebbe)');
      if (!t || typeof t !== 'object' || Array.isArray(t)) return errori.push(id + ': serve { en, es, de }');
      Object.keys(t).filter(l => LINGUE.indexOf(l) === -1).forEach(l => errori.push(id + ': lingua sconosciuta «' + l + '» (ammesse: ' + LINGUE.join(', ') + ')'));
      let completa = true;
      LINGUE.forEach(l => {
        if (typeof t[l] !== 'string' || !t[l].trim()) { completa = false; return errori.push(id + ': manca la traduzione `' + l + '`'); }
        if (/\n/.test(t[l])) errori.push(id + ': la traduzione `' + l + '` ha un a capo');
        if (conta(it, /#/g) !== conta(t[l], /#/g)) errori.push(id + ': `#` sono ' + conta(it, /#/g) + ' in italiano e ' + conta(t[l], /#/g) + ' in `' + l + '` (i numeri si scrivono #)');
        if (conta(it, /%s/g) !== conta(t[l], /%s/g)) errori.push(id + ': `%s` sono ' + conta(it, /%s/g) + ' in italiano e ' + conta(t[l], /%s/g) + ' in `' + l + '`');
        if (t[l].trim() === it.trim() && /\p{L}{4,}/u.test(it)) avvisi.push(id + ': la traduzione `' + l + '` e uguale all\'italiano (va bene solo per nomi propri)');
      });
      if (/\d/.test(it)) avvisi.push(id + ': la chiave ha cifre: la voce vale solo per quei numeri, usa # (il traduttore li sostituisce)');
      if (it.indexOf(' • ') !== -1 || it.indexOf(' · ') !== -1) avvisi.push(id + ': frase composta con « • »: il traduttore la spezza, aggiungi i pezzi come voci separate');
      if (it.indexOf("'") !== -1) avvisi.push(id + ': apostrofo dritto; le frasi nuove usano quello tipografico (’)');
      if (!completa) return;
      const prec = nuove.get(it);
      if (prec) { if (LINGUE.some(l => prec[l] !== t[l])) errori.push(id + ': tradotta in modo diverso da ' + prec.task); else avvisi.push(id + ': gia aggiunta da ' + prec.task + ' (saltata)'); return; }
      const esistente = LINGUE.filter(l => Object.prototype.hasOwnProperty.call(dizionario(l), it));
      if (esistente.length) {
        if (LINGUE.some(l => dizionario(l)[it] !== t[l])) errori.push(id + ': e gia nei dizionari con un\'altra traduzione (non si sovrascrive in silenzio: cambiala a mano se serve)');
        else avvisi.push(id + ': gia nei dizionari (saltata)');
        return;
      }
      nuove.set(it, Object.assign({ task }, t));
    });
  });
  if (nuove.size) {
    LINGUE.forEach(l => {
      try { modifiche['js/lingue/' + l + '.js'] = aggiungiVoci(leggi('js/lingue/' + l + '.js'), Array.from(nuove.entries()).map(([it, t]) => [it, t[l]])); }
      catch (e) { errori.push('js/lingue/' + l + '.js: ' + e.message); }
    });
    riepilogo.push(nuove.size + ' frasi nei tre dizionari (' + Array.from(new Set(Array.from(nuove.values()).map(t => t.task))).join(', ') + ')');
  }

  /* ---- mappa delle regole: capitoli, righe, squadra ---- */
  const haMappa = esiste(FILE_MAPPA);
  let righe = haMappa ? leggi(FILE_MAPPA).split('\n') : null;
  const mappa0 = righe ? righe.join('\n') : '';
  const codiciMappa = righe ? righe.map(r => (r.match(RX_CODICE) || [])[1]).filter(Boolean) : [];
  const codiciNuovi = new Map();
  const richiedeMappa = batch.some(({ dati }) => (dati.regole || dati.capitoli || dati.squadra) !== undefined);
  if (richiedeMappa && !haMappa) errori.push(FILE_MAPPA + ' non trovato');
  if (righe) {
    batch.forEach(({ task, dati }) => {
      if (dati.capitoli === undefined) return;
      if (!Array.isArray(dati.capitoli)) return errori.push(task + ': `capitoli` deve essere un elenco');
      dati.capitoli.forEach((c, i) => {
        const id = task + ' capitoli[' + i + ']';
        if (!c || !Number.isInteger(c.numero) || c.numero < 0 || typeof c.titolo !== 'string' || !c.titolo.trim()) return errori.push(id + ': serve { numero (intero), titolo }');
        if (c.testo !== undefined && typeof c.testo !== 'string' && !Array.isArray(c.testo)) return errori.push(id + ': `testo` e una stringa o un elenco di righe');
        if (trovaCapitolo(righe, c.numero)) return avvisi.push(id + ': il capitolo ' + c.numero + ' c\'e gia (saltato)');
        if (/^- \*\*[A-Z]{3}-\d{2}\*\* /m.test(Array.isArray(c.testo) ? c.testo.join('\n') : String(c.testo || ''))) avvisi.push(id + ': il testo del capitolo contiene righe di regola: meglio metterle in `regole`, cosi il controllo dei codici le vede');
        creaCapitolo(righe, c.numero, c.titolo.trim(), c.testo);
        riepilogo.push(task + ': capitolo ' + c.numero + ' «' + c.titolo.trim() + '»');
      });
    });
    batch.forEach(({ task, dati }) => {
      if (dati.regole === undefined) return;
      if (!Array.isArray(dati.regole)) return errori.push(task + ': `regole` deve essere un elenco');
      dati.regole.forEach((r, i) => {
        const id = task + ' regole[' + i + ']';
        if (!r || !Number.isInteger(r.capitolo) || typeof r.riga !== 'string') return errori.push(id + ': serve { capitolo (intero), riga }');
        const m = r.riga.match(RX_CODICE);
        if (!m) return errori.push(id + ': la riga deve iniziare con `- **XXX-NN** ` (tre lettere maiuscole, trattino, due cifre, a inizio riga: il catalogo non legge altro)');
        if (/\n/.test(r.riga)) return errori.push(id + ': la riga di una regola sta su una riga sola');
        const cod = m[1];
        const blocc = bloccate[cod];
        if (blocc && !/bloccat/i.test(r.riga)) errori.push(id + ': ' + cod + ' e nell\'elenco delle regole bloccate (registro C.2 n. ' + blocc.n + (blocc.parziale ? ', in parte' : '') + '): si registra solo una riga con «(bloccata)» e non si implementa nulla (cancello E.0 punto 0)');
        if (!/\((spegnibile|bloccata)\)|storica/i.test(r.riga)) avvisi.push(id + ': ' + cod + ' non e segnata «(spegnibile)» ne «(bloccata)» (ogni regola nuova e spegnibile: piano F.4)');
        const presente = codiciMappa.indexOf(cod) !== -1 || codiciNuovi.has(cod);
        if (r.sostituisce) {
          const k = righe.findIndex(x => (x.match(RX_CODICE) || [])[1] === cod);
          if (k === -1) return errori.push(id + ': `sostituisce` ma ' + cod + ' non e nella mappa');
          righe[k] = r.riga; riepilogo.push(task + ': riga ' + cod + ' riscritta');
          return;
        }
        if (presente) return errori.push(id + ': ' + cod + ' e gia nella mappa' + (codiciNuovi.has(cod) ? ' (aggiunta da ' + codiciNuovi.get(cod) + ')' : '') + ' (npm run catalogo fallirebbe: usa `sostituisce: true` per riscriverla)');
        if (!trovaCapitolo(righe, r.capitolo)) {
          if (typeof r.titolo === 'string' && r.titolo.trim()) { creaCapitolo(righe, r.capitolo, r.titolo.trim(), ''); riepilogo.push(task + ': capitolo ' + r.capitolo + ' «' + r.titolo.trim() + '» creato'); }
          else return errori.push(id + ': il capitolo ' + r.capitolo + ' non c\'e in ' + FILE_MAPPA + ' (aggiungilo con `capitoli` o dai `titolo`)');
        }
        inserisciRegola(righe, r.capitolo, r.riga);
        codiciNuovi.set(cod, task);
        riepilogo.push(task + ': regola ' + cod + ' nel capitolo ' + r.capitolo);
      });
    });
    batch.forEach(({ task, dati }) => {
      if (dati.squadra === undefined) return;
      if (!Array.isArray(dati.squadra)) return errori.push(task + ': `squadra` deve essere un elenco');
      dati.squadra.forEach((s, i) => {
        const id = task + ' squadra[' + i + ']';
        if (!s || typeof s.sottoCoach !== 'string' || typeof s.codici !== 'string') return errori.push(id + ': serve { sottoCoach, codici }');
        if (SOTTO_COACH.indexOf(s.sottoCoach) === -1) return errori.push(id + ': sotto-coach «' + s.sottoCoach + '» sconosciuto (' + SOTTO_COACH.join(', ') + ')');
        if (!RX_CODICI_SQUADRA.test(s.codici.trim())) return errori.push(id + ': codici «' + s.codici + '» non nel formato `XXX-NN`, `XXX-NN..MM`, separati da virgola');
        const c0 = trovaCapitolo(righe, 0);
        if (!c0) return errori.push(id + ': nella mappa non c\'e il capitolo 0 con la tabella della squadra (lo crea W1-T1)');
        let intest = -1, colCodici = -1;
        for (let k = c0.inizio + 1; k < c0.fine; k++) if (/^\|/.test(righe[k]) && /codici/i.test(righe[k]) && intest === -1) { intest = k; colCodici = righe[k].split('|').slice(1).findIndex(c => /codici/i.test(c)); }
        if (intest === -1) return errori.push(id + ': nel capitolo 0 non trovo la tabella con la colonna «Codici»');
        let k = -1;
        for (let j = intest + 1; j < c0.fine && /^\|/.test(righe[j]); j++) if (righe[j].split('|').slice(1).some(c => c.replace(/[`*\s]/g, '').toLowerCase().indexOf(s.sottoCoach) !== -1) && !/^\|[\s-:|]+$/.test(righe[j])) { k = j; break; }
        if (k === -1) return errori.push(id + ': nella tabella del capitolo 0 non c\'e la riga di «' + s.sottoCoach + '»');
        const celle = righe[k].split('|');
        const cella = celle[colCodici + 1];
        if (cella.indexOf(s.codici.trim()) !== -1) return avvisi.push(id + ': ' + s.codici + ' e gia nella riga di ' + s.sottoCoach + ' (saltata)');
        celle[colCodici + 1] = cella.replace(/\s*$/, '') + ', ' + s.codici.trim() + ' ';
        righe[k] = celle.join('|');
        riepilogo.push(task + ': ' + s.codici + ' alla squadra (' + s.sottoCoach + ')');
      });
    });
    const nuovaMappa = righe.join('\n');
    if (nuovaMappa !== mappa0) modifiche[FILE_MAPPA] = nuovaMappa;
  }

  /* ---- mappa per gli agenti ---- */
  const righeAgenti = [];
  batch.forEach(({ task, dati }) => {
    if (dati.mappaAgenti === undefined) return;
    if (!Array.isArray(dati.mappaAgenti) || dati.mappaAgenti.some(x => typeof x !== 'string' || !x.trim() || /\n/.test(x))) return errori.push(task + ': `mappaAgenti` e un elenco di stringhe su una riga');
    dati.mappaAgenti.forEach(x => righeAgenti.push('- ' + x.trim() + ' (' + task + ')'));
  });
  if (righeAgenti.length) {
    if (!esiste(FILE_AGENTI)) errori.push(FILE_AGENTI + ' non trovato');
    else {
      const a = leggi(FILE_AGENTI).split('\n');
      const nuoveRighe = righeAgenti.filter(x => a.indexOf(x) === -1);
      if (nuoveRighe.length) {
        let h = a.findIndex(r => r.trim() === SEZIONE_AGENTI);
        if (h === -1) {
          const stile = a.findIndex(r => /^## Stile/.test(r));
          const blocco = [SEZIONE_AGENTI, '', 'Righe arrivate dai task dell\'ondata (docs/in-arrivo): in INT-N vanno riordinate nelle sezioni sopra (sotto-coach → file, nomi in posti inattesi).', ''];
          if (stile === -1) { while (a.length && a[a.length - 1] === '') a.pop(); a.push('', ...blocco); h = a.length - blocco.length; } else { a.splice(stile, 0, ...blocco); h = stile; }
        }
        let fine = a.findIndex((r, i) => i > h && /^## /.test(r)); if (fine === -1) fine = a.length;
        while (fine - 1 > h && a[fine - 1].trim() === '') fine--;
        a.splice(fine, 0, ...nuoveRighe);
        if (fine === a.length - nuoveRighe.length && a[a.length - 1] !== '') a.push('');
        modifiche[FILE_AGENTI] = a.join('\n');
        riepilogo.push(nuoveRighe.length + ' righe in ' + FILE_AGENTI);
      }
    }
  }
  return { modifiche, riepilogo };
}

/* ------------------------------------------------------------------------------------------------- operazioni */
function prepara(args) {
  const errori = [], avvisi = [];
  const files = elencoJson(args);
  const batch = leggiBatch(files, errori, avvisi);
  const { modifiche, riepilogo } = files.length ? pianifica(batch, errori, avvisi) : { modifiche: {}, riepilogo: [] };
  return { errori, avvisi, batch, modifiche, riepilogo, files };
}

function stampaEsito(r, titolo) {
  if (r.errori.length) { console.log(titolo + ': ' + r.errori.length + ' errori'); r.errori.forEach(e => console.log('  ERRORE  ' + e)); }
  r.avvisi.forEach(a => console.log('  avviso  ' + a));
  r.riepilogo.forEach(x => console.log('  ' + x));
}

function comandoControlla(args) {
  const r = prepara(args);
  if (!r.files.length) { console.log('Nessun JSON in ' + DIR_IN_ARRIVO + ': niente da controllare.'); return 0; }
  stampaEsito(r, 'integra-onda --controlla');
  if (r.errori.length) { console.log('RIFIUTATO: ' + r.errori.length + ' errori in ' + r.batch.length + ' JSON.'); return 1; }
  console.log('OK: ' + r.batch.length + ' JSON (' + r.batch.map(b => b.task).join(', ') + '), ' + Object.keys(r.modifiche).length + ' file condivisi cambierebbero (' + Object.keys(r.modifiche).join(', ') + ').');
  return 0;
}

function scriviModifiche(modifiche) { Object.keys(modifiche).forEach(f => { fs.mkdirSync(path.dirname(p(f)), { recursive: true }); fs.writeFileSync(p(f), modifiche[f]); }); }

function comandoApplica(args, opz) {
  const r = prepara(args);
  if (!r.files.length) { console.log('Nessun JSON in ' + DIR_IN_ARRIVO + ': niente da integrare.'); return 0; }
  stampaEsito(r, 'integra-onda');
  if (r.errori.length) { console.log('RIFIUTATO: nessun file e stato toccato (' + r.errori.length + ' errori).'); return 1; }
  if (opz.aSecco) { console.log('A SECCO: cambierebbero ' + Object.keys(r.modifiche).join(', ') + '. Nulla e stato scritto.'); return 0; }
  scriviModifiche(r.modifiche);
  console.log('Applicato: ' + Object.keys(r.modifiche).join(', ') + '.');
  if (!opz.tieni) {
    r.batch.forEach(b => { try { fs.rmSync(b.file); } catch (e) { /* gia tolto */ } });
    const dir = p(DIR_IN_ARRIVO);
    try { if (fs.existsSync(dir) && !fs.readdirSync(dir).length) { fs.rmdirSync(dir); console.log('Tolta la cartella ' + DIR_IN_ARRIVO + '/.'); } else if (fs.existsSync(dir)) console.log('In ' + DIR_IN_ARRIVO + '/ restano altri file: non cancello la cartella.'); } catch (e) { /* niente */ }
  }
  console.log('Ora: npm run sw && npm run catalogo && npm run indice && npm run simboli (e npm run soglie dall\'INT-1); alza CACHE_NAME in sw.js una volta; poi npm run grafo per ultimo; npm run controlla.');
  return 0;
}

/* copia di lavoro: i file del repo (tracciati e nuovi non ignorati) senza node_modules, che e un collegamento */
function copiaDiLavoro() {
  let elenco;
  try { elenco = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z'], { cwd: RADICE, encoding: 'utf8', maxBuffer: 1 << 26 }).split('\0').filter(Boolean); }
  catch (e) { throw new Error('git ls-files non riesce (la prova va lanciata in una copia git del repo): ' + e.message); }
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'integra-prova-'));
  try {
    elenco.filter(f => !/^(graphify-out|\.claude|node_modules)(\/|$)/.test(f)).forEach(f => {
      const da = p(f);
      let st; try { st = fs.lstatSync(da); } catch (e) { return; }   /* tracciato ma cancellato nella copia di lavoro */
      fs.mkdirSync(path.dirname(path.join(dest, f)), { recursive: true });
      if (st.isSymbolicLink()) fs.symlinkSync(fs.readlinkSync(da), path.join(dest, f));
      else if (st.isFile()) fs.copyFileSync(da, path.join(dest, f));
    });
    if (fs.existsSync(p('node_modules'))) fs.symlinkSync(fs.realpathSync(p('node_modules')), path.join(dest, 'node_modules'), 'dir');
  } catch (e) { fs.rmSync(dest, { recursive: true, force: true }); throw e; }
  return dest;
}
function comandoProva(args, opz) {
  const r = prepara(args);
  if (!r.files.length) console.log('Nessun JSON in ' + DIR_IN_ARRIVO + ': provo comunque il ramo, con i file generati rigenerati (sw, catalogo, indice, simboli) in una copia.');
  stampaEsito(r, 'integra-onda --prova');
  if (r.errori.length) { console.log('RIFIUTATO: i JSON non passano il controllo (' + r.errori.length + ' errori); la prova non parte.'); return 1; }
  let copia;
  try { copia = copiaDiLavoro(); } catch (e) { console.log('ERRORE  ' + e.message); return 1; }
  console.log('Copia di lavoro: ' + copia);
  let esito = 0;
  try {
    const originale = RADICE;
    RADICE = copia;
    try { scriviModifiche(r.modifiche); } finally { RADICE = originale; }
    const pkg = JSON.parse(fs.readFileSync(path.join(copia, 'package.json'), 'utf8'));
    const passi = ['sw', 'catalogo', 'indice', 'simboli', 'soglie'].filter(s => pkg.scripts && pkg.scripts[s]);
    for (const s of passi.concat(['controlla'])) {
      process.stdout.write('  npm run ' + s + ' ... ');
      const t0 = Date.now();
      const e = spawnSync('npm', ['run', '-s', s], { cwd: copia, encoding: 'utf8', maxBuffer: 1 << 26, timeout: 15 * 60 * 1000 });
      const sec = Math.round((Date.now() - t0) / 1000);
      if (e.status === 0) { console.log('ok (' + sec + ' s)'); continue; }
      console.log('FALLITO (' + sec + ' s)');
      const uscita = ((e.stdout || '') + (e.stderr || '')).trim().split('\n');
      console.log(uscita.slice(-60).map(x => '    | ' + x).join('\n'));
      esito = 1; break;
    }
  } catch (e) { console.log('ERRORE nella prova: ' + e.message); esito = 1; }
  if (opz.tieniCopia) console.log('Copia tenuta: ' + copia); else fs.rmSync(copia, { recursive: true, force: true });
  console.log(esito ? 'PROVA FALLITA: il repo non e stato toccato.' : 'PROVA OK: con le modifiche condivise applicate npm run controlla (e con lui npm test) passa. Il repo non e stato toccato.');
  return esito;
}

/* ---------------------------------------------------------------------------------------------------------- autotest */
/* La prova gira su una radice FINTA (index.html, dizionari, mappe e registro in miniatura): non dipende da come cambia il repo */
const FINTI = {
  [FILE_HTML]: '<!doctype html>\n<html><body>\n<link rel="stylesheet" href="css/base.css">\n<script src="js/lingue/en.js"></script>\n<script src="js/lingue/es.js"></script>\n<script src="js/lingue/de.js"></script>\n<script src="js/coach/uno.js"></script>\n<script src="js/coach/due.js"></script>\n<script src="js/avvio.js"></script>\n</body></html>\n',
  'js/lingue/en.js': '/* Traduzioni en: una voce per riga. */\nwindow.I18N = window.I18N || {};\nwindow.I18N["en"] = {\n"Ciao": "Hello",\n"Frase già presente": "Sentence already present"\n};\n',
  'js/lingue/es.js': '/* Traduzioni es */\nwindow.I18N = window.I18N || {};\nwindow.I18N["es"] = {\n"Ciao": "Hola",\n"Frase già presente": "Frase ya presente"\n};\n',
  'js/lingue/de.js': '/* Traduzioni de */\nwindow.I18N = window.I18N || {};\nwindow.I18N["de"] = {\n"Ciao": "Hallo",\n"Frase già presente": "Satz bereits vorhanden"\n};\n',
  [FILE_MAPPA]: '# Mappa delle regole del coach\n\n## 1. Come leggere la mappa\n\nTesto.\n\n## 19. Regole aggiunte dalla ricerca (RIC)\n\nIntro.\n\n- **RIC-01** prima regola (spegnibile).\n- **RIC-05** ultima regola del capitolo (spegnibile).\n\n## 20. Dove sta il codice\n\n| Area | File |\n|---|---|\n| RIC | `js/coach/uno.js` |\n',
  [FILE_AGENTI]: '# Mappa per agenti\n\n## Flussi principali\n\nTesto.\n\n## Stile\n\n`css/` un file per area.\n',
  [FILE_REGISTRO]: '# Registro\n\n### C.2 Elenco\n\n| # | Regola (parte) | Perché è bloccata | Query |\n|---|---|---|---|\n| 1 | **REC-06 b** pressione alta | [N] | q |\n| 15 | **TAP-01** (= MES-18) taper | [M] | q |\n\n### C.3 Non bloccate\n'
};
function autotest() {
  const esiti = [];
  const prova = (nome, f) => { let e = null; try { f(); } catch (x) { e = x.message; } esiti.push({ nome, e }); };
  const eq = (a, b, m) => { if (a !== b) throw new Error((m || '') + ' atteso ' + JSON.stringify(b) + ', ottenuto ' + JSON.stringify(a)); };
  const originale = RADICE;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'integra-autotest-'));
  const scrivi = (f, t) => { fs.mkdirSync(path.dirname(path.join(tmp, f)), { recursive: true }); fs.writeFileSync(path.join(tmp, f), t); };
  const dentro = f => { RADICE = tmp; try { return f(); } finally { RADICE = originale; } };
  const rileggi = f => fs.readFileSync(path.join(tmp, f), 'utf8');
  Object.keys(FINTI).forEach(f => scrivi(f, FINTI[f]));
  const TESTA = '\n   (3in, parte di coach; ordine di caricamento: vedi index.html) */\n';
  const NUOVO = 'js/coach/prova-integra.js';
  scrivi(NUOVO, '/* Prova di integrazione (RIC-99)' + TESTA + 'window.provaIntegra = function() { return 1; };\n');
  const FRASE = 'Frase di prova dell’integrazione con # serie';
  const base = { task: 'W9-T9', script: [{ src: NUOVO, dopo: 'js/coach/uno.js' }],
    frasi: { [FRASE]: { en: 'Integration test sentence with # sets', es: 'Frase de prueba de la integración con # series', de: 'Testsatz der Integration mit # Sätzen' } },
    regole: [{ capitolo: 19, riga: '- **RIC-99** (spegnibile) regola di prova (nessuna fonte: prova dello strumento).' }],
    mappaAgenti: ['prova dell\'integrazione: js/coach/prova-integra.js'] };
  const json = (o, nome) => { const f = path.join(tmp, DIR_IN_ARRIVO, nome || 'W9-T9.json'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o)); return f; };
  const lancia = args => dentro(() => { const e = [], a = []; const batch = leggiBatch(elencoJson(args), e, a); const r = pianifica(batch, e, a); return { errori: e, avvisi: a, modifiche: r.modifiche, riepilogo: r.riepilogo }; });
  const cli = args => spawnSync(process.execPath, [__filename, '--radice', tmp].concat(args), { encoding: 'utf8' });
  const conErrore = (o, rx, nome) => { const r = lancia([json(o, nome)]); if (!r.errori.some(e => rx.test(e))) throw new Error('errori attesi ' + rx + ', ottenuti: ' + JSON.stringify(r.errori)); };
  const clona = o => JSON.parse(JSON.stringify(o));

  prova('un JSON giusto si applica: script in index.html, frasi nei tre dizionari, regola nel capitolo 19, riga per gli agenti', () => {
    const r = lancia([json(base)]);
    eq(r.errori.length, 0, 'errori: ' + r.errori.join(' | '));
    eq(/<script src="js\/coach\/uno\.js"><\/script>\n<script src="js\/coach\/prova-integra\.js"><\/script>\n<script src="js\/coach\/due\.js">/.test(r.modifiche[FILE_HTML]), true, 'riga script dopo uno.js');
    LINGUE.forEach(l => {
      const w = {}; vm.runInNewContext(r.modifiche['js/lingue/' + l + '.js'], { window: w });
      eq(typeof w.I18N[l][FRASE], 'string', 'voce in ' + l); eq(Object.keys(w.I18N[l]).length, 3, 'una voce in piu in ' + l); eq(w.I18N[l]['Ciao'] !== undefined, true, 'le vecchie restano');
    });
    const m = r.modifiche[FILE_MAPPA].split('\n'), i = m.findIndex(x => /^- \*\*RIC-99\*\*/.test(x));
    eq(/^- \*\*RIC-05\*\*/.test(m[i - 1]) && /^$/.test(m[i + 1]) && /^## 20\./.test(m[i + 2]), true, 'RIC-99 subito dopo l\'ultima regola del capitolo 19, prima del 20');
    eq(/## Novità del coach v2\n[\s\S]*- prova dell'integrazione: js\/coach\/prova-integra\.js \(W9-T9\)\n\n## Stile/.test(r.modifiche[FILE_AGENTI]), true, 'sezione per gli agenti prima di «Stile»');
  });
  prova('una frase senza `de` (o senza `en`, `es`) e RIFIUTATA', () => {
    LINGUE.forEach(l => { const o = clona(base); delete o.frasi[FRASE][l]; conErrore(o, new RegExp('manca la traduzione `' + l + '`')); });
    const vuota = clona(base); vuota.frasi[FRASE].de = '  '; conErrore(vuota, /manca la traduzione `de`/);
  });
  prova('da riga di comando: --controlla esce 1 con una frase senza `de`, 0 con un JSON giusto, e non scrive', () => {
    const rotto = clona(base); delete rotto.frasi[FRASE].de;
    const e1 = cli(['--controlla', json(rotto)]);
    eq(e1.status, 1, 'uscita con la frase senza de: ' + e1.stdout + e1.stderr); eq(/RIFIUTATO/.test(e1.stdout) && /manca la traduzione `de`/.test(e1.stdout), true, 'messaggio');
    const e2 = cli(['--controlla', json(base)]);
    eq(e2.status, 0, 'uscita con un JSON giusto: ' + e2.stdout + e2.stderr);
    eq(rileggi(FILE_HTML), FINTI[FILE_HTML], '--controlla non scrive');
    eq(cli(['--controlla', path.join(tmp, 'non-esiste.json')]).status, 1, 'file mancante');
  });
  prova('segnaposto e sovrascritture: `#` e `%s` uguali, voce gia presente con un\'altra traduzione, doppioni tra JSON', () => {
    const o = clona(base); o.frasi = { 'Frase con # e %s': { en: 'Sentence with # and', es: 'Frase con # y %s', de: 'Satz mit # und %s' } }; conErrore(o, /`%s` sono 1 in italiano e 0 in `en`/);
    const d = clona(base); d.frasi = { 'Frase con #': { en: 'Phrase', es: 'Frase con #', de: 'Satz mit #' } }; conErrore(d, /`#` sono 1 in italiano e 0 in `en`/);
    const s = clona(base); s.frasi = { 'Frase già presente': { en: 'Diversa', es: 'Diferente', de: 'Anders' } }; conErrore(s, /gia nei dizionari con un'altra traduzione/);
    const uguale = clona(base); uguale.frasi = { 'Frase già presente': { en: 'Sentence already present', es: 'Frase ya presente', de: 'Satz bereits vorhanden' } };
    const r = lancia([json(uguale)]); eq(r.errori.length, 0, 'una voce identica e solo un avviso: ' + r.errori.join('|')); eq(r.avvisi.some(a => /gia nei dizionari \(saltata\)/.test(a)), true, 'avviso');
    const sp = clona(base); sp.frasi = { 'Frase  con spazio doppio': { en: 'a b', es: 'a b', de: 'a b' } }; conErrore(sp, /spazi doppi/);
    const a = clona(base), b = { task: 'W9-T8', frasi: { [FRASE]: { en: 'Altro', es: 'Otro', de: 'Anderer' } } };
    const rr = lancia([json(a, 'W9-T9.json'), json(b, 'W9-T8.json')]); eq(rr.errori.some(e => /tradotta in modo diverso da W9-T/.test(e)), true, 'stessa frase, due traduzioni: ' + rr.errori.join('|'));
    const dr = lancia([json(a, 'W9-T9.json'), json(Object.assign(clona(a), { task: 'W9-T8', script: undefined, regole: undefined, mappaAgenti: undefined }), 'W9-T8.json')]);
    eq(dr.errori.length, 0, 'la stessa frase con le stesse traduzioni non e un errore: ' + dr.errori.join('|')); eq(dr.avvisi.some(x => /gia aggiunta da W9-T/.test(x)), true, 'avviso di doppione');
  });
  prova('script: file mancante, senza intestazione, gia in index.html, `dopo` sconosciuto, dopo avvio.js, doppio, sintassi', () => {
    scrivi('js/coach/uno.js', '/* Uno' + TESTA + 'window.uno = 1;\n');
    const m = clona(base); m.script = [{ src: 'js/coach/non-esiste.js', dopo: 'js/coach/uno.js' }]; conErrore(m, /il file js\/coach\/non-esiste\.js non esiste/);
    scrivi('js/coach/senza-testa.js', 'window.x = 1;\n');
    const s = clona(base); s.script = [{ src: 'js/coach/senza-testa.js', dopo: 'js/coach/uno.js' }]; conErrore(s, /deve iniziare con `\/\* Titolo breve/);
    const g = clona(base); g.script = [{ src: 'js/coach/uno.js', dopo: 'js/coach/due.js' }]; conErrore(g, /e gia in index\.html/);
    const d = clona(base); d.script = [{ src: NUOVO, dopo: 'js/coach/non-c-e.js' }]; conErrore(d, /non e in index\.html/);
    const v = clona(base); v.script = [{ src: NUOVO, dopo: 'js/avvio.js' }]; conErrore(v, /js\/avvio\.js resta l'ultimo/);
    const dd = clona(base); dd.script = [{ src: NUOVO, dopo: 'js/coach/uno.js' }, { src: NUOVO, prima: 'js/avvio.js' }]; conErrore(dd, /compare due volte/);
    const nessuno = clona(base); nessuno.script = [{ src: NUOVO }]; conErrore(nessuno, /esattamente uno tra `dopo` e `prima`/);
    const fuori = clona(base); fuori.script = [{ src: '../x.js', dopo: 'js/coach/uno.js' }]; conErrore(fuori, /percorso «..\/x\.js» non valido/);
    scrivi('js/coach/rotto.js', '/* Rotto' + TESTA + 'function (\n'); const rot = clona(base); rot.script = [{ src: 'js/coach/rotto.js', dopo: 'js/coach/uno.js' }];
    try { require('acorn'); conErrore(rot, /errore di sintassi/); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
  });
  prova('script che dipendono da script nuovi: l\'ordine dei `dopo` si risolve tra file diversi, `prima` inserisce prima, stili', () => {
    scrivi('js/coach/seconda.js', '/* Seconda' + TESTA + 'window.seconda = 1;\n'); scrivi('css/nuovo.css', '.x { color: red; }\n');
    const a = clona(base); a.script = [{ src: 'js/coach/seconda.js', dopo: NUOVO }]; a.stili = [{ href: 'css/nuovo.css', dopo: 'css/base.css' }];
    const b = { task: 'W9-T8', script: [{ src: NUOVO, prima: 'js/avvio.js' }] };
    const r = lancia([json(a, 'W9-T9.json'), json(b, 'W9-T8.json')]);
    eq(r.errori.length, 0, r.errori.join('|'));
    eq(/js\/coach\/prova-integra\.js"><\/script>\n<script src="js\/coach\/seconda\.js"><\/script>\n<script src="js\/avvio\.js">/.test(r.modifiche[FILE_HTML]), true, 'ordine: nuovo, seconda, avvio');
    eq(/href="css\/base\.css">\n<link rel="stylesheet" href="css\/nuovo\.css">\n<script/.test(r.modifiche[FILE_HTML]), true, 'il foglio di stile dopo base.css');
  });
  prova('regole: formato del codice, doppioni, capitolo mancante, regole bloccate (cancello E.0 punto 0), sostituisce', () => {
    const r = (riga, extra) => { const o = clona(base); o.regole = [Object.assign({ capitolo: 19, riga }, extra || {})]; return o; };
    conErrore(r('- **RI-01** (spegnibile) due lettere'), /deve iniziare con `- \*\*XXX-NN\*\* `/);
    conErrore(r('- **RIC-100** (spegnibile) tre cifre'), /deve iniziare con `- \*\*XXX-NN\*\* `/);
    conErrore(r('  - **RIC-98** (spegnibile) rientrata'), /deve iniziare con/);
    conErrore(r('- **RIC-05** (spegnibile) e gia nella mappa'), /RIC-05 e gia nella mappa/);
    conErrore(r('- **RIC-98** (spegnibile) capitolo che non c\'e', { capitolo: 77 }), /il capitolo 77 non c'e/);
    const b = clona(base); b.regole = [{ capitolo: 19, riga: '- **RIC-97** (spegnibile) uno' }, { capitolo: 19, riga: '- **RIC-97** (spegnibile) uguale' }]; conErrore(b, /RIC-97 e gia nella mappa \(aggiunta da W9-T9\)/);
    conErrore(r('- **TAP-01** (spegnibile) taper prima di una gara'), /regole bloccate \(registro C\.2 n\. 15\)/);
    conErrore(r('- **MES-18** (spegnibile) taper, altro codice'), /regole bloccate \(registro C\.2 n\. 15\)/);
    conErrore(r('- **REC-06** (spegnibile) pressione alta'), /regole bloccate \(registro C\.2 n\. 1, in parte\)/);
    const ok = lancia([json(r('- **TAP-01** (bloccata) taper: non implementata, registro C.2 n. 15'))]); eq(ok.errori.length, 0, 'la riga «(bloccata)» passa: ' + ok.errori.join('|'));
    const sost = lancia([json(r('- **RIC-05** (spegnibile) riscritta', { sostituisce: true }))]); eq(sost.errori.length, 0, sost.errori.join('|'));
    eq(/^- \*\*RIC-05\*\* \(spegnibile\) riscritta$/m.test(sost.modifiche[FILE_MAPPA]), true, 'riga sostituita sul posto');
    conErrore(r('- **ZZZ-01** (spegnibile) non c\'e', { sostituisce: true }), /`sostituisce` ma ZZZ-01 non e nella mappa/);
    const av = lancia([json(r('- **RIC-96** senza spegnibile'))]); eq(av.avvisi.some(a => /non e segnata «\(spegnibile\)»/.test(a)), true, 'avviso senza (spegnibile)');
    const nuovoCap = clona(base); nuovoCap.regole = [{ capitolo: 21, titolo: 'Capitolo creato dalla regola', riga: '- **ABC-01** (spegnibile) in un capitolo nuovo' }];
    const rc = lancia([json(nuovoCap)]); eq(rc.errori.length, 0, rc.errori.join('|')); eq(/## 21\. Capitolo creato dalla regola\n\n- \*\*ABC-01\*\*/.test(rc.modifiche[FILE_MAPPA]), true, 'capitolo creato con la sua riga');
  });
  prova('capitoli e squadra: capitolo nuovo in ordine, capitolo 0 con la tabella, codici aggiunti alla riga del sotto-coach', () => {
    const tabella = ['| id | Nome | Missione | Codici che possiede | File |', '|---|---|---|---|---|', '| `regista` | **Il Regista** | m | LIV-01..02 | f |', '| `bilancia` | **La Bilancia** | m | PAR-01..05, CAR-01..02 | f |'];
    const o = { task: 'W9-T9', capitoli: [{ numero: 0, titolo: 'La squadra del coach', testo: tabella }, { numero: 21, titolo: 'Sotto-coach nuovo', testo: 'Capitolo vuoto per ora.' }, { numero: 19, titolo: 'gia c\'e' }],
      squadra: [{ sottoCoach: 'bilancia', codici: 'CAR-18..19' }, { sottoCoach: 'regista', codici: 'REG-01..06' }] };
    const r = lancia([json(o)]);
    eq(r.errori.length, 0, r.errori.join('|'));
    const m = r.modifiche[FILE_MAPPA].split('\n');
    const ordine = m.map(x => (x.match(RX_CAPITOLO) || [])[1]).filter(Boolean).map(Number);
    eq(ordine.join(), '0,1,19,20,21', 'capitoli in ordine');
    eq(m.some(x => /^\| `bilancia` .*PAR-01\.\.05, CAR-01\.\.02, CAR-18\.\.19 \|/.test(x)), true, 'codici della bilancia');
    eq(m.some(x => /^\| `regista` .*LIV-01\.\.02, REG-01\.\.06 \|/.test(x)), true, 'codici del regista');
    eq(r.avvisi.some(a => /il capitolo 19 c'e gia/.test(a)), true, 'capitolo gia presente: avviso');
    const senza = { task: 'W9-T9', squadra: [{ sottoCoach: 'bilancia', codici: 'CAR-18' }] }; conErrore(senza, /non c'e il capitolo 0 con la tabella della squadra/);
    const sc = clona(o); sc.squadra = [{ sottoCoach: 'cuoco', codici: 'CAR-18' }]; conErrore(sc, /sotto-coach «cuoco» sconosciuto/);
    const sf = clona(o); sf.squadra = [{ sottoCoach: 'bilancia', codici: 'car-18' }]; conErrore(sf, /non nel formato/);
    const nr = clona(o); nr.squadra = [{ sottoCoach: 'tecnico', codici: 'SUG-01' }]; conErrore(nr, /non c'e la riga di «tecnico»/);
  });
  prova('campi sconosciuti, JSON rotto, task mancante o ripetuto', () => {
    conErrore(Object.assign(clona(base), { frase: {} }), /campo sconosciuto «frase»/);
    scrivi(DIR_IN_ARRIVO + '/rotto.json', '{ non json'); const r = lancia([path.join(tmp, DIR_IN_ARRIVO, 'rotto.json')]); eq(r.errori.some(e => /JSON non valido/.test(e)), true, 'JSON rotto');
    conErrore({ script: [] }, /manca `task`/, 'senza-task.json');
    const a = json(base, 'W9-T9.json'), b = json(base, 'altro.json'); const rr = lancia([a, b]); eq(rr.errori.some(e => /compare in due file/.test(e)), true, 'task ripetuto');
  });
  prova('applicazione vera: scrive i file, cancella i JSON e la cartella docs/in-arrivo; a secco non scrive; un secondo lancio e rifiutato', () => {
    fs.rmSync(path.join(tmp, DIR_IN_ARRIVO), { recursive: true, force: true });
    json(base);
    const secco = cli(['--a-secco']); eq(secco.status, 0, secco.stdout + secco.stderr);
    eq(rileggi(FILE_HTML), FINTI[FILE_HTML], 'a secco: index.html intatto');
    const vero = cli([]); eq(vero.status, 0, vero.stdout + vero.stderr);
    eq(/prova-integra\.js/.test(rileggi(FILE_HTML)), true, 'index.html aggiornato'); eq(/RIC-99/.test(rileggi(FILE_MAPPA)), true, 'mappa aggiornata');
    eq(/Integration test sentence/.test(rileggi('js/lingue/en.js')), true, 'dizionario aggiornato');
    eq(fs.existsSync(path.join(tmp, DIR_IN_ARRIVO)), false, 'docs/in-arrivo cancellata');
    json(base); const ancora = cli(['--controlla']);
    eq(ancora.status, 1, 'secondo lancio: ' + ancora.stdout); eq(/e gia in index\.html/.test(ancora.stdout), true, 'messaggio');
    fs.rmSync(path.join(tmp, DIR_IN_ARRIVO), { recursive: true, force: true });
    eq(cli(['--controlla']).status, 0, 'senza JSON non c\'e nulla da controllare');
  });
  fs.rmSync(tmp, { recursive: true, force: true });
  const falliti = esiti.filter(x => x.e);
  esiti.forEach(x => console.log((x.e ? '  FALLITO  ' : '  ok       ') + x.nome + (x.e ? ': ' + x.e : '')));
  console.log(falliti.length ? 'autotest di integra-onda: ' + falliti.length + ' falliti su ' + esiti.length : 'autotest di integra-onda: ' + esiti.length + ' prove ok');
  return falliti.length ? 1 : 0;
}

/* ---------------------------------------------------------------------------------------------------------------- CLI */
function main(argv) {
  const args = [], opz = {};
  let comando = 'applica';
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--controlla') comando = 'controlla';
    else if (a === '--prova') comando = 'prova';
    else if (a === '--autotest') comando = 'autotest';
    else if (a === '--a-secco') opz.aSecco = true;
    else if (a === '--tieni') opz.tieni = true;
    else if (a === '--tieni-copia') opz.tieniCopia = true;
    else if (a === '--radice') RADICE = path.resolve(argv[++i]);
    else if (a === '--help' || a === '-h') { console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 30).join('\n').replace(/^   /gm, '')); return 0; }
    else if (a.startsWith('--')) { console.error('opzione sconosciuta: ' + a); return 2; }
    else args.push(a);
  }
  if (comando === 'autotest') return autotest();
  if (comando === 'controlla') return comandoControlla(args);
  if (comando === 'prova') return comandoProva(args, opz);
  return comandoApplica(args, opz);
}
if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { pianifica, leggiBatch, aggiungiVoci, leggiBloccate, autotest };
