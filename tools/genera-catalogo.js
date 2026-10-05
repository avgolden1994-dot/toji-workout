#!/usr/bin/env node
/* Genera js/coach/catalogo-regole.js dalla mappa docs/coach-mappa-regole.md:
   la mappa e l'unica fonte, il catalogo si legge dal codice (es. per spiegare
   "perche" all'utente o per spegnere una regola).
   npm run catalogo            scrive (non scrive nulla se trova errori)
   npm run catalogo -- --check controlla che sia aggiornato e senza errori
   --radice <cartella>         lavora su un'altra copia del repo (serve alle prove)

   Dal coach v2 (W1-T1, piano B.4 e registro docs/coach-v2-decisioni.md):
   - capitolo 0 «La squadra del coach»: la tabella `| id | Nome | Missione | Codici | File |` diventa COACH_SQUADRA e ogni regola
     prende il suo `sottoCoach`. Nella colonna Codici: `PRG-01`, intervalli `PRG-01..11`, prefissi interi `IPE-*`, separati da virgole.
   - una riga con «(spegnibile)» da `spegnibile: true` (regolaAttiva la spegne con tz_regole_spente, senza toccare parametri.js);
     con «(bloccata)» da `bloccata: true` (regolaAttiva sempre false: cancello E.0 punto 0); con «(parte b bloccata)» da
     `bloccataInParte: true` (si implementa solo la parte a).
   - codici di due o tre lettere (IA-01..05 entrano nel catalogo).
   Errori (la scrittura e --check falliscono): codice ripetuto; codice senza sotto-coach o con due; codice ritirato nel registro A.3
   (assorbito, rinominato o rinviato) scritto come regola; regola del registro C.2 senza «(bloccata)» (o, se e bloccata solo in
   parte, senza la parola «bloccata»); regola spegnibile e bloccata insieme; voce non valida nella tabella della squadra.
   Il modulo esporta le funzioni (tests/catalogo.test.js, tools/elenco-soglie.js). */
'use strict';
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..');
const FILE_MAPPA = 'docs/coach-mappa-regole.md', FILE_REGISTRO = 'docs/coach-v2-decisioni.md', FILE_CATALOGO = 'js/coach/catalogo-regole.js';

const RX_REGOLA = /^- \*\*([A-Z]{2,3}-\d{2})\*\* (.*)$/;
const RX_CAPITOLO = /^## (\d+)\. (.*)$/;
const RX_CODICE = /^([A-Z]{2,3})-(\d{2})$/;
const RX_VOCE_SQUADRA = /^([A-Z]{2,3})-(?:(\*)|(\d{2})(?:\.\.(\d{2}))?)$/;
const MARCA_SPEGNIBILE = '(spegnibile)', MARCA_BLOCCATA = '(bloccata)', MARCA_PARTE_BLOCCATA = '(parte b bloccata)';

/* ------------------------------------------------------------------ voci della squadra: PRG-01, PRG-01..11, IPE-* */
function leggiVoceSquadra(t) {
  const m = String(t).trim().match(RX_VOCE_SQUADRA);
  if (!m) return null;
  if (m[2]) return { prefisso: m[1], da: 0, a: 99, testo: m[0] };
  const da = Number(m[3]), a = m[4] !== undefined ? Number(m[4]) : da;
  return da <= a ? { prefisso: m[1], da, a, testo: m[0] } : null;
}
function codiceNellaVoce(codice, voce) {
  const c = String(codice).match(RX_CODICE);
  return !!c && c[1] === voce.prefisso && Number(c[2]) >= voce.da && Number(c[2]) <= voce.a;
}

/* ------------------------------------------------------------------ capitolo 0: la squadra */
function leggiSquadra(righe, errori, avvisi) {
  const squadra = [];
  const i0 = righe.findIndex(r => { const m = r.match(RX_CAPITOLO); return m && Number(m[1]) === 0; });
  if (i0 === -1) { errori.push('manca il capitolo 0 «La squadra del coach» con la tabella dei sotto-coach: nessuna regola ha un sotto-coach'); return squadra; }
  let fine = righe.findIndex((r, k) => k > i0 && /^## /.test(r)); if (fine === -1) fine = righe.length;
  const celle = r => r.split('|').slice(1, -1).map(c => c.trim());
  const h = righe.findIndex((r, k) => k > i0 && k < fine && /^\|/.test(r) && celle(r).some(c => /^codici/i.test(c)));
  if (h === -1) { errori.push('capitolo 0: non trovo la tabella con la colonna «Codici»'); return squadra; }
  const intest = celle(righe[h]).map(c => c.toLowerCase());
  const col = nome => intest.findIndex(c => c.indexOf(nome) === 0);
  const cId = col('id'), cNome = col('nome'), cMissione = col('missione'), cCodici = col('codici');
  if ([cId, cNome, cMissione, cCodici].some(c => c === -1)) { errori.push('capitolo 0: la tabella della squadra deve avere le colonne id, Nome, Missione, Codici'); return squadra; }
  for (let k = h + 1; k < fine && /^\|/.test(righe[k]); k++) {
    if (/^\|[\s\-:|]+$/.test(righe[k])) continue;
    const c = celle(righe[k]);
    const id = (c[cId] || '').replace(/[`*\s]/g, '');
    if (!/^[a-z]+$/.test(id)) { errori.push('capitolo 0, riga ' + (k + 1) + ': id del sotto-coach non valido «' + c[cId] + '» (minuscole, senza spazi)'); continue; }
    if (squadra.some(s => s.id === id)) { errori.push('capitolo 0: il sotto-coach «' + id + '» compare due volte'); continue; }
    const voci = [];
    (c[cCodici] || '').split(',').map(t => t.trim()).filter(Boolean).forEach(t => {
      const v = leggiVoceSquadra(t);
      if (!v) errori.push('capitolo 0, ' + id + ': voce «' + t + '» non valida (si scrive XXX-NN, XXX-NN..MM o XXX-*, separate da virgole)');
      else if (!voci.some(x => x.testo === v.testo)) voci.push(v);
    });
    squadra.push({ id, nome: (c[cNome] || '').replace(/\*\*/g, '').trim(), missione: (c[cMissione] || '').replace(/^[«"“]|[»"”]$/g, '').trim(), voci });
  }
  if (!squadra.length) errori.push('capitolo 0: la tabella della squadra e vuota');
  /* due sotto-coach con la stessa voce: errore solo se il codice e nel catalogo (vedi costruisciCatalogo); qui un avviso */
  for (let a = 0; a < squadra.length; a++) for (let b = a + 1; b < squadra.length; b++) squadra[a].voci.forEach(va => squadra[b].voci.forEach(vb => {
    if (va.prefisso === vb.prefisso && va.da <= vb.a && vb.da <= va.a) avvisi.push('capitolo 0: ' + va.testo + ' (' + squadra[a].id + ') e ' + vb.testo + ' (' + squadra[b].id + ') si sovrappongono');
  }));
  return squadra;
}

/* ------------------------------------------------------------------ righe di regola */
function leggiRegole(righe) {
  const voci = []; let area = '';
  righe.forEach(r => {
    const h = r.match(RX_CAPITOLO); if (h) { area = h[2]; return; }
    const m = r.match(RX_REGOLA);
    if (!m) return;
    const testo = m[2].replace(/\s+/g, ' ').trim();
    const v = { codice: m[1], area, testo };
    if (testo.indexOf(MARCA_SPEGNIBILE) !== -1) v.spegnibile = true;
    if (testo.indexOf(MARCA_BLOCCATA) !== -1) v.bloccata = true;
    if (testo.indexOf(MARCA_PARTE_BLOCCATA) !== -1) v.bloccataInParte = true;
    voci.push(v);
  });
  return voci;
}

/* ------------------------------------------------------------------ registro: codici ritirati (A.3) e regole bloccate (C.2) */
function sezione(righe, inizio, fine) {
  const da = righe.findIndex(r => inizio.test(r));
  if (da === -1) return null;
  const a = righe.findIndex((r, i) => i > da && fine.test(r));
  return righe.slice(da + 1, a === -1 ? righe.length : a);
}
function espandiCodici(testo) {
  const out = [];
  String(testo).replace(/([A-Z]{2,3})-(\d{2})(?:\.\.(\d{2}))?/g, (x, p, da, a) => {
    for (let n = Number(da); n <= Number(a === undefined ? da : a); n++) out.push(p + '-' + String(n).padStart(2, '0'));
    return x;
  });
  return out;
}
/* A.3: «| Vecchio | Finale | SC | Task | Stato |». Un codice vecchio e ritirato (non entra nel catalogo) se e assorbito, se il codice
   finale e un altro (rinominato: PRI-01 → PRN-01, DON-01 → PAR-06, «REC-13» → ETA-08) o se non ha un codice finale (rinviato, nessuna regola). */
function leggiRitirati(righe) {
  const ritirati = {};
  const sez = sezione(righe, /^### A\.3 /, /^## B\. /);
  if (!sez) return null;
  sez.forEach(r => {
    if (!/^\|/.test(r) || /^\|[\s\-:|]+$/.test(r)) return;
    const c = r.split('|').slice(1, -1).map(x => x.trim());
    if (c.length !== 5 || /^vecchio$/i.test(c[0])) return;
    const vecchi = espandiCodici(c[0]);
    if (!vecchi.length) return;
    const finale = c[1].replace(/\*\*/g, ''), stato = c[4].replace(/\*\*/g, '');
    const primoFinale = (finale.match(/[A-Z]{2,3}-\d{2}/) || [])[0];
    vecchi.forEach(v => {
      let motivo = null;
      if (/assorbit/i.test(stato)) motivo = 'assorbita → ' + finale;
      else if (/^idem\b/i.test(finale)) motivo = null;
      else if (!primoFinale) motivo = (/rinviat/i.test(stato) ? 'rinviata' : 'senza codice finale') + ' (' + (finale || '—') + ')';
      else if (primoFinale !== v) motivo = 'rinominata → ' + finale;
      if (motivo) ritirati[v] = motivo;
    });
  });
  return ritirati;
}
/* C.2: «| n | **CODICE b** (= ALTRO) ... |»: tutti i codici della cella; «parziale» se il primo ha la parte (a/b) */
function leggiBloccate(righe) {
  const bloccate = {};
  const sez = sezione(righe, /^### C\.2 /, /^### C\.3 /);
  if (!sez) return null;
  sez.forEach(r => {
    const m = r.match(/^\| (\d+) \| (.*?) \|/);
    if (!m) return;
    const primo = m[2].match(/\*\*([A-Z]{2,3}-\d{2})( [ab])?/);
    if (!primo) return;
    (m[2].match(/[A-Z]{2,3}-\d{2}/g) || []).forEach(c => { if (!bloccate[c]) bloccate[c] = { n: Number(m[1]), parziale: !!primo[2] }; });
  });
  return bloccate;
}

/* ------------------------------------------------------------------ catalogo */
function testoCatalogo(voci, squadra) {
  return '/* Catalogo delle regole del coach: GENERATO da tools/genera-catalogo.js a partire da\n' +
    '   docs/coach-mappa-regole.md (npm run catalogo). Non si modifica a mano.\n' +
    '   COACH_SQUADRA: i sotto-coach del capitolo 0 (id, nome, missione, codici). COACH_REGOLE: per ogni regola codice, area,\n' +
    '   sotto-coach e descrizione; spegnibile/bloccata se la riga lo dice. regolaAttiva() in parametri.js spegne le regole\n' +
    '   spegnibili e non accende mai quelle bloccate; nomi e perche in js/coach/regia/perche.js. */\n' +
    'const COACH_SQUADRA = [\n' + squadra.map(s => '  ' + JSON.stringify({ id: s.id, nome: s.nome, missione: s.missione, codici: s.voci.map(v => v.testo) })).join(',\n') + '\n];\n' +
    'const COACH_REGOLE = [\n' + voci.map(v => '  ' + JSON.stringify(v)).join(',\n') + '\n];\n' +
    'const COACH_REGOLE_PER_CODICE = {};\n' +
    'COACH_REGOLE.forEach(r => { COACH_REGOLE_PER_CODICE[r.codice] = r; });\n' +
    'window.regolaDescritta = function(codice) { return Object.prototype.hasOwnProperty.call(COACH_REGOLE_PER_CODICE, codice) ? COACH_REGOLE_PER_CODICE[codice] : null; };\n';
}

/* mappa e registro come testo: { voci, squadra, errori, avvisi, testo } (testo = il file del catalogo) */
function costruisciCatalogo(opz) {
  const errori = [], avvisi = [];
  const righe = String(opz.mappa).split('\n');
  const squadra = leggiSquadra(righe, errori, avvisi);
  const regole = leggiRegole(righe);
  const righeReg = opz.registro == null ? null : String(opz.registro).split('\n');
  const ritirati = righeReg ? leggiRitirati(righeReg) : null, bloccate = righeReg ? leggiBloccate(righeReg) : null;
  if (!ritirati) avvisi.push('registro: sezione A.3 non trovata, codici assorbiti non controllati');
  if (!bloccate) avvisi.push('registro: sezione C.2 non trovata, regole bloccate non controllate');
  const visti = {};
  const voci = regole.map(r => {
    if (visti[r.codice]) errori.push('codice ripetuto nella mappa: ' + r.codice);
    visti[r.codice] = true;
    const di = squadra.filter(s => s.voci.some(v => codiceNellaVoce(r.codice, v))).map(s => s.id);
    if (squadra.length && !di.length) errori.push(r.codice + ' (' + r.area + ') non ha un sotto-coach: aggiungilo alla tabella del capitolo 0');
    if (di.length > 1) errori.push(r.codice + ' ha due sotto-coach (' + di.join(', ') + '): ogni regola appartiene a uno solo (piano B.1)');
    if (ritirati && ritirati[r.codice]) errori.push(r.codice + ' e un codice ritirato nel registro A.3 (' + ritirati[r.codice] + '): non entra nel catalogo');
    const b = bloccate && bloccate[r.codice];
    if (b && !b.parziale && !r.bloccata) errori.push(r.codice + ' e bloccata (registro C.2 n. ' + b.n + '): la riga deve dire «(bloccata)» e la regola non si implementa (cancello E.0 punto 0)');
    if (b && b.parziale && !/bloccat/i.test(r.testo)) errori.push(r.codice + ' e bloccata in parte (registro C.2 n. ' + b.n + '): la riga deve dire «(parte b bloccata)»');
    if (r.bloccata && r.spegnibile) errori.push(r.codice + ' e insieme «(spegnibile)» e «(bloccata)»: una regola bloccata resta spenta, togli «(spegnibile)»');
    if (r.bloccata && bloccate && !b) avvisi.push(r.codice + ' e segnata «(bloccata)» ma non e nel registro C.2');
    const v = { codice: r.codice, area: r.area, sottoCoach: di.length === 1 ? di[0] : null };
    if (r.spegnibile) v.spegnibile = true;
    if (r.bloccata) v.bloccata = true;
    if (r.bloccataInParte) v.bloccataInParte = true;
    v.testo = r.testo;
    return v;
  });
  return { voci, squadra, errori, avvisi, testo: testoCatalogo(voci, squadra) };
}

function leggiRepo(radice) {
  const r = radice || R;
  const reg = path.join(r, FILE_REGISTRO);
  return { mappa: fs.readFileSync(path.join(r, FILE_MAPPA), 'utf8'), registro: fs.existsSync(reg) ? fs.readFileSync(reg, 'utf8') : null };
}

function main(argv) {
  const i = argv.indexOf('--radice');
  const radice = i !== -1 && argv[i + 1] ? path.resolve(argv[i + 1]) : R;
  const c = costruisciCatalogo(leggiRepo(radice));
  c.avvisi.forEach(a => console.error('avviso: ' + a));
  if (c.errori.length) {
    c.errori.forEach(e => console.error('ERRORE: ' + e));
    console.error('catalogo NON scritto: ' + c.errori.length + ' errori nella mappa (docs/coach-mappa-regole.md) o nel registro');
    return 1;
  }
  const dest = path.join(radice, FILE_CATALOGO);
  const quanti = c.voci.length + ' regole, ' + c.squadra.length + ' sotto-coach, ' + c.voci.filter(v => v.spegnibile).length + ' spegnibili, ' + c.voci.filter(v => v.bloccata).length + ' bloccate';
  if (argv.includes('--check')) {
    if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== c.testo) { console.error('catalogo-regole.js non e aggiornato: lancia npm run catalogo'); return 1; }
    console.log('catalogo aggiornato (' + quanti + ')'); return 0;
  }
  fs.writeFileSync(dest, c.testo); console.log('catalogo scritto: ' + quanti);
  return 0;
}
if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { costruisciCatalogo, leggiSquadra, leggiRegole, leggiRitirati, leggiBloccate, leggiRepo, leggiVoceSquadra, codiceNellaVoce, espandiCodici, FILE_MAPPA, FILE_REGISTRO, FILE_CATALOGO };
