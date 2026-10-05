#!/usr/bin/env node
/* Cancello del collaudo (3in, piano coach v2, W0-T1): legge l'istantanea JSON che `npm run collaudo:schede` scrive fuori dal repo
   e fallisce (codice 1) se un criterio supera le soglie dell'onda o se qualcosa peggiora rispetto al «prima».
   Lo strumento di collaudo (tools/collaudo-generatore.js) non si tocca: e un audit che esce sempre con 0. Il cancello e la sua
   conseguenza: le soglie stanno in tools/cancello-collaudo.json (tabella E del registro, soglie di ogni INT, tabella G del piano).

   Uso
     npm run collaudo:schede -- --matrice standard --etichetta onda-0 --out /tmp/collaudo
     npm run cancello -- /tmp/collaudo/collaudo-generatore-onda-0.json onda-0
     npm run cancello -- <json> onda-3 --contro <json dell'onda 2>     nessun criterio peggiore dell'onda precedente
     npm run cancello -- <json> onda-1 --contro <json onda-0> --identico   collaudo identico (INT-1 passo 1); --eccetto COD1,COD2
     npm run cancello -- <json> prima                                  riproduce i numeri «prima» entro 0,5 punti (tag coach-v2-onda-0-prima)
     npm run cancello -- --elenco [onda]                               le soglie in vigore (di un'onda, o la tabella intera)
     npm run cancello -- --autotest                                    prove del cancello su istantanee artificiali (fa parte di npm run controlla)
   Onde: onda-0, onda-1, onda-2a, onda-2, onda-3, onda-4, onda-5, finale (anche INT-N, N, 2a, F-1, G; l'etichetta del collaudo
   `coach-v2-onda-N` e riconosciuta). Altre opzioni: --soglie <file>, --qualsiasi-matrice (non fallisce se la matrice non e quella
   dell'onda: serve per provare con --matrice rapida), --json (esito leggibile da una macchina).
   Esce con 0 se passa, 1 se fallisce, 2 per un errore d'uso (file mancante, onda sconosciuta). */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const SOGLIE_FILE = path.join(__dirname, 'cancello-collaudo.json');
const EPS = 0.005;   /* le percentuali del collaudo sono arrotondate a due decimali */

/* ----------------------------------------------------------------------------------------------- soglie e istantanee */
function leggiSoglie(file) {
  const cfg = JSON.parse(fs.readFileSync(file || SOGLIE_FILE, 'utf8'));
  if (!cfg.ordineOnde || !cfg.onde || !cfg.criteri || !cfg.prima) throw new Error('soglie incomplete: ' + (file || SOGLIE_FILE));
  return cfg;
}

/* istantanea normalizzata: dal JSON del collaudo (riepilogo + classi + verificheModello) o dal blocco compatto `prima` delle soglie */
function daCollaudo(j) {
  const r = j && j.riepilogo;
  if (!r || !r.classi_pesata || !r.classi) throw new Error('non e un JSON del collaudo (manca riepilogo.classi_pesata): rilancialo con la versione attuale di npm run collaudo:schede');
  const record = {};
  (j.classi || []).forEach(c => { record[c.chiave] = c; });
  const modello = {};
  (j.verificheModello || []).forEach(m => { modello[m.id] = m.esito; });
  return { etichetta: (j.meta && j.meta.etichetta) || '?', matrice: r.matrice, profili: r.profili, criteri: r.criteri, pesi: r.pesi, commit: r.commit, errori: r.errori,
    conGravi: r.conGravi, gravi_pesata: r.gravi_pesata, pesata: r.classi_pesata, conteggio: r.classi, record, modello };
}
function daPrima(p, etichetta) {
  const pesata = {}, conteggio = {};
  Object.keys(p.classi).forEach(k => { pesata[k] = p.classi[k][0]; conteggio[k] = p.classi[k][1]; });
  return { etichetta: etichetta || 'prima', matrice: p.matrice, profili: p.profili, criteri: p.criteri, pesi: p.pesi, commit: p.commit, errori: p.errori,
    conGravi: p.conGravi, gravi_pesata: p.gravi_pesata, pesata, conteggio, record: {}, modello: p.modello || {} };
}
const codiceDi = k => k.split(':')[0];
const sottoclasseDi = k => k.indexOf(':') === -1 ? null : k.slice(k.indexOf(':') + 1);

/* nome dell'onda: accetta onda-N, INT-N, N, 2a, F-1, fatto, G e le etichette del collaudo (coach-v2-onda-N) */
function normalizzaOnda(et, cfg) {
  let s = String(et || '').trim().toLowerCase().replace(/^coach-v2-/, '');
  if (/(^|-)(prima|base)$/.test(s) || s === 'prima' || s === 'base') return 'prima';
  s = s.replace(/^int-/, 'onda-');
  if (/^\d[a-z]?$/.test(s)) s = 'onda-' + s;
  if (s === 'f-1' || s === 'fatto' || s === 'g' || s === 'finale') return 'finale';
  return cfg.ordineOnde.indexOf(s) !== -1 ? s : null;
}

/* soglia in vigore all'onda: l'ultima scritta fino a quel punto (le soglie si ereditano) */
function risolvi(tabella, ordine, onda) {
  if (!tabella) return undefined;
  let v;
  for (let i = 0; i <= ordine.indexOf(onda); i++) if (Object.prototype.hasOwnProperty.call(tabella, ordine[i])) v = tabella[ordine[i]];
  return v;
}
const comeSoglia = v => (typeof v === 'number') ? { max: v } : v;
const unione = (ordine, onde, onda, campo) => {
  const s = new Set();
  for (let i = 0; i <= ordine.indexOf(onda); i++) ((onde[ordine[i]] || {})[campo] || []).forEach(x => s.add(x));
  return s;
};

/* ----------------------------------------------------------------------------------------------------- valutazione */
/* ritorna { righe: [{ esito: 'ok'|'fallito'|'avviso'|'nota', testo }], controlli, falliti } */
function valuta(cfg, snap, ondaId, opz) {
  opz = opz || {};
  const righe = [];
  const ok = t => righe.push({ esito: 'ok', testo: t }), ko = t => righe.push({ esito: 'fallito', testo: t }), av = t => righe.push({ esito: 'avviso', testo: t }), nota = t => righe.push({ esito: 'nota', testo: t });
  const ordine = cfg.ordineOnde, f2 = x => (Math.round(x * 100) / 100).toString();
  const prima = ondaId === 'prima';
  const onda = prima ? null : cfg.onde[ondaId];

  /* -- 1. l'istantanea e confrontabile? -- */
  const matriceAttesa = prima ? snap.matrice : onda.matrice;
  if (snap.matrice !== matriceAttesa) {
    const t = 'matrice «' + snap.matrice + '» (' + snap.profili + ' profili): per ' + ondaId + ' serve «' + matriceAttesa + '»';
    (opz.qualsiasiMatrice ? av : ko)(t + (opz.qualsiasiMatrice ? ' (ignorato: --qualsiasi-matrice)' : ''));
  } else ok('matrice ' + snap.matrice + ', ' + snap.profili + ' profili');
  if (snap.pesi !== 'popolazione') ko('pesi «' + snap.pesi + '»: le soglie valgono per i pesi della popolazione (non usare --pesi uniformi)');
  if (snap.errori !== 0) ko('il generatore ha dato errori su ' + snap.errori + ' profili (ERR-01 deve essere 0)');
  else ok('generatore senza errori');
  if (snap.criteri !== cfg.riferimento.criteri) av('criteri del collaudo v' + snap.criteri + ' (il «prima» e v' + cfg.riferimento.criteri + '): i criteri riscritti dall\'INT non sono confrontabili con il «prima»');

  /* -- 2. il riferimento: il «prima» delle soglie (della stessa matrice) o l'istantanea data con --contro -- */
  let rif;
  if (opz.contro) rif = opz.contro;
  else {
    const blocco = (snap.matrice === 'completa' && cfg.primaCompleta) ? cfg.primaCompleta : cfg.prima;
    if (snap.matrice === 'completa' && !cfg.primaCompleta) av('nelle soglie manca il «prima» della matrice completa: confronto fatto con quello della standard (percentuali entro 3 punti)');
    rif = daPrima(blocco, 'prima');
  }
  const chiavi = Array.from(new Set(Object.keys(snap.pesata).concat(Object.keys(rif.pesata)))).sort();
  const val = k => snap.pesata[k] || 0, n = k => snap.conteggio[k] || 0, valRif = k => rif.pesata[k] || 0;

  /* -- 3. riproduzione del «prima» -- */
  if (prima) {
    const tol = cfg.riferimento.tolleranzaPrima;
    let fuori = 0;
    chiavi.forEach(k => { const d = val(k) - valRif(k); if (Math.abs(d) > tol + EPS) { fuori++; ko(k + ': ' + f2(val(k)) + '% contro ' + f2(valRif(k)) + '% del «prima» (' + (d > 0 ? '+' : '') + f2(d) + ')'); } });
    const dg = snap.gravi_pesata - rif.gravi_pesata;
    if (Math.abs(dg) > tol + EPS) ko('gravi_pesata ' + f2(snap.gravi_pesata) + '% contro ' + f2(rif.gravi_pesata) + '%'); else ok('gravi_pesata ' + f2(snap.gravi_pesata) + '% (prima ' + f2(rif.gravi_pesata) + '%)');
    if (!fuori) ok(chiavi.length + ' classi entro ' + tol + ' punti dal «prima»');
    return chiudi(righe, onda, ondaId);
  }

  /* -- 4. soglie esplicite per criterio e per sottoclasse -- */
  const coperte = new Set();   /* classi gia giudicate da una soglia: niente doppio controllo di regressione */
  const giudica = (k, soglia, etichetta) => {
    const s = comeSoglia(soglia);
    if (s.dove) {
      const dim = Object.keys(s.dove)[0], valore = s.dove[dim];
      const rec = snap.record[k];
      if (n(k) > 0 && (!rec || !rec.perDimensione)) return ko(k + ': la soglia conta i programmi con ' + dim + ' ' + valore + ' ma nel JSON non c\'e perDimensione per la classe');
      const q = rec && rec.perDimensione && rec.perDimensione[dim] ? (rec.perDimensione[dim][valore] || 0) : 0;
      return (q <= s.max ? ok : ko)(k + ': ' + q + ' programmi con ' + dim + ' ' + valore + ' (soglia <= ' + s.max + ')' + etichetta);
    }
    if (s.max === 0) return (n(k) === 0 ? ok : ko)(k + ': ' + n(k) + ' programmi (' + f2(val(k)) + '%), soglia 0' + etichetta);
    return (val(k) <= s.max + EPS ? ok : ko)(k + ': ' + f2(val(k)) + '% (soglia <= ' + s.max + '%; prima ' + f2(cfg.prima.classi[k] ? cfg.prima.classi[k][0] : 0) + '%)' + etichetta);
  };
  Object.keys(cfg.criteri).forEach(cod => {
    const riga = cfg.criteri[cod];
    const sCod = risolvi(riga.soglie, ordine, ondaId);
    const classi = chiavi.filter(k => codiceDi(k) === cod);
    if (sCod !== undefined) {
      if (!classi.length) ok(cod + ': nessun programma colpito (soglia ' + (comeSoglia(sCod).max) + (comeSoglia(sCod).dove ? ' in ' + Object.keys(comeSoglia(sCod).dove)[0] + ' ' + Object.values(comeSoglia(sCod).dove)[0] : '') + ')');
      classi.forEach(k => { coperte.add(k); giudica(k, sCod, ''); });
    }
    Object.keys(riga.sub || {}).forEach(sub => {
      const sSub = risolvi(riga.sub[sub], ordine, ondaId);
      if (sSub === undefined) return;
      const k = cod + ':' + sub;
      coperte.add(k);
      if (!chiavi.includes(k)) ok(k + ': nessun programma colpito (soglia ' + comeSoglia(sSub).max + ')'); else giudica(k, sSub, '');
    });
  });

  /* -- 5. totale: programmi con almeno un fallimento grave -- */
  const sTot = risolvi(cfg.totali.gravi_pesata, ordine, ondaId);
  if (sTot !== undefined) (snap.gravi_pesata <= sTot + EPS ? ok : ko)('gravi_pesata ' + f2(snap.gravi_pesata) + '% (soglia <= ' + sTot + '%; prima ' + f2(cfg.prima.gravi_pesata) + '%)');

  /* -- 6. verifiche del modello dati (MOD) -- */
  Object.keys(cfg.modello || {}).sort().forEach(id => {
    const ammessi = risolvi(cfg.modello[id], ordine, ondaId);
    if (!ammessi) return;
    const esito = snap.modello[id];
    if (esito === undefined) return av(id + ': non c\'e nel JSON del collaudo');
    (ammessi.indexOf(esito) !== -1 ? ok : ko)(id + ': «' + esito + '» (ammessi: ' + ammessi.join(', ') + ')');
  });
  /* INT-1: con --contro una verifica del modello che era «ok» non puo diventare altro, anche se l'onda non la governa */
  if (opz.contro) Object.keys(snap.modello).sort().forEach(id => { if (rif.modello[id] === 'ok' && snap.modello[id] !== 'ok') ko('verifica del modello ' + id + ': era «ok» in «' + rif.etichetta + '», ora «' + snap.modello[id] + '»'); });

  /* -- 7. regressione: nessuna classe peggiora (rispetto al «prima», o a --contro); i criteri riscritti non si confrontano col «prima» -- */
  const riscritti = opz.contro ? new Set((onda.riscritti || [])) : unione(ordine, cfg.onde, ondaId, 'riscritti');
  const sicurezza = new Set(cfg.regressione.sicurezza);
  let controllate = 0, peggiorate = 0, ammesseUsate = 0;
  /* INT-1: `onde.<onda>.ammesse` = peggioramenti giustificati e scritti, uno per classe: { "VOL-02:glutei": { "max": 32.5, "motivo": "...", "risolve": "W2-T1" } }. Una classe ammessa
     puo salire fino a `max` (non oltre: il tetto vale come una soglia) e il cancello lo dice; mai per le classi di sicurezza. Le altre classi restano giudicate dalla tolleranza. */
  const ammesse = (onda && onda.ammesse) || {};
  chiavi.forEach(k => {
    const cod = codiceDi(k);
    if ((coperte.has(k) && !opz.contro) || riscritti.has(cod)) return;   /* contro il «prima» una soglia esplicita sostituisce il confronto; contro un'onda precedente vale sempre */
    controllate++;
    const tol = sicurezza.has(cod) ? cfg.regressione.tolleranzaSicurezza : cfg.regressione.tolleranzaPunti;
    if (val(k) > valRif(k) + tol + EPS) {
      const am = ammesse[k];
      if (am && !sicurezza.has(cod) && typeof am.max === 'number' && am.motivo) {
        if (val(k) <= am.max + EPS) { ammesseUsate++; ok('regressione AMMESSA ' + k + ': ' + f2(val(k)) + '% contro ' + f2(valRif(k)) + '% (' + rif.etichetta + '), tetto ' + am.max + '%: ' + am.motivo + (am.risolve ? ' [' + am.risolve + ']' : '')); return; }
        peggiorate++; return ko('regressione ' + k + ': ' + f2(val(k)) + '% oltre il tetto ammesso di ' + am.max + '% (contro ' + f2(valRif(k)) + '% di ' + rif.etichetta + ')');
      }
      peggiorate++; ko('regressione ' + k + ': ' + f2(val(k)) + '% contro ' + f2(valRif(k)) + '% (' + rif.etichetta + '), tolleranza ' + tol + ' punti');
    }
  });
  /* INT-1: con --contro il totale non puo peggiorare oltre la tolleranza NEMMENO se ha una soglia esplicita (una soglia allentata, per esempio 21,5 contro un 2,7 misurato, non nasconde una regressione) */
  if (sTot === undefined || opz.contro) {
    const tolG = cfg.regressione.tolleranzaPunti;
    (snap.gravi_pesata <= rif.gravi_pesata + tolG + EPS ? ok : ko)('gravi_pesata ' + f2(snap.gravi_pesata) + '% non peggiora (' + rif.etichetta + ' ' + f2(rif.gravi_pesata) + '%)');
  }
  ok('regressione contro «' + rif.etichetta + '»: ' + controllate + (opz.contro ? ' classi controllate (anche quelle con una soglia esplicita)' : ' classi non coperte da una soglia') + ', ' + peggiorate + ' peggiorate' + (ammesseUsate ? ', ' + ammesseUsate + ' ammesse con il loro motivo' : '') + (riscritti.size ? ' (criteri riscritti, non confrontati: ' + Array.from(riscritti).join(', ') + ')' : ''));

  /* -- 8. collaudo identico (INT-1 passo 1) -- */
  if (opz.identico) {
    if (!opz.contro) ko('--identico richiede --contro <json>');
    else {
      const eccetto = new Set((opz.eccetto || []).concat(Array.from(riscritti)));
      let diverse = 0;
      chiavi.forEach(k => { if (eccetto.has(codiceDi(k))) return; if (Math.abs(val(k) - valRif(k)) > EPS || n(k) !== (rif.conteggio[k] || 0)) { diverse++; ko('non identico ' + k + ': ' + f2(val(k)) + '% (' + n(k) + ') contro ' + f2(valRif(k)) + '% (' + (rif.conteggio[k] || 0) + ')'); } });
      if (Math.abs(snap.gravi_pesata - rif.gravi_pesata) > EPS) { diverse++; ko('non identico gravi_pesata ' + f2(snap.gravi_pesata) + '% contro ' + f2(rif.gravi_pesata) + '%'); }
      if (!diverse) ok('collaudo identico a «' + rif.etichetta + '»' + (eccetto.size ? ' (esclusi: ' + Array.from(eccetto).join(', ') + ')' : ''));
    }
  }

  /* -- 9. cio che il cancello non puo misurare -- */
  (onda.manuale || []).forEach(t => nota(t));
  return chiudi(righe, onda, ondaId);
}
function chiudi(righe, onda, ondaId) {
  const falliti = righe.filter(r => r.esito === 'fallito').length;
  return { onda: ondaId, titolo: onda ? onda.titolo : 'riproduzione del «prima»', righe, controlli: righe.filter(r => r.esito === 'ok' || r.esito === 'fallito').length, falliti };
}

function stampa(r, snap, json) {
  if (json) { console.log(JSON.stringify({ onda: r.onda, passato: r.falliti === 0, controlli: r.controlli, falliti: r.falliti, righe: r.righe }, null, 1)); return; }
  console.log('Cancello ' + r.onda + ': ' + r.titolo + ' | istantanea «' + snap.etichetta + '» (commit ' + snap.commit + ', criteri v' + snap.criteri + ')');
  r.righe.forEach(x => { if (x.esito === 'fallito') console.log('  FALLITO  ' + x.testo); });
  r.righe.forEach(x => { if (x.esito === 'avviso') console.log('  avviso   ' + x.testo); });
  r.righe.forEach(x => { if (x.esito === 'ok') console.log('  ok       ' + x.testo); });
  const note = r.righe.filter(x => x.esito === 'nota');
  if (note.length) { console.log('  Da controllare a mano (non misurabile dal cancello):'); note.forEach(x => console.log('   - ' + x.testo)); }
  console.log(r.falliti ? 'CANCELLO NON PASSATO: ' + r.falliti + ' controlli falliti su ' + r.controlli : 'Cancello passato (' + r.controlli + ' controlli).');
}

function elenco(cfg, ondaId) {
  const ordine = cfg.ordineOnde, onde = ondaId ? [ondaId] : ordine;
  onde.forEach(o => {
    const info = cfg.onde[o];
    console.log('== ' + o + ' (' + info.int + ', matrice ' + info.matrice + '): ' + info.titolo);
    const t = risolvi(cfg.totali.gravi_pesata, ordine, o);
    if (t !== undefined) console.log('   gravi_pesata <= ' + t + '%');
    Object.keys(cfg.criteri).forEach(cod => {
      const riga = cfg.criteri[cod];
      const s = risolvi(riga.soglie, ordine, o);
      const nuova = Object.prototype.hasOwnProperty.call(riga.soglie, o);
      if (s !== undefined && (ondaId || nuova)) console.log('   ' + cod + (comeSoglia(s).dove ? ' [' + Object.keys(comeSoglia(s).dove)[0] + ' ' + Object.values(comeSoglia(s).dove)[0] + ']' : '') + ' <= ' + comeSoglia(s).max + (nuova ? '' : ' (ereditata)') + '   prima ' + riga.prima);
      Object.keys(riga.sub || {}).forEach(sub => { const ss = risolvi(riga.sub[sub], ordine, o); if (ss !== undefined && (ondaId || Object.prototype.hasOwnProperty.call(riga.sub[sub], o))) console.log('   ' + cod + ':' + sub + ' <= ' + comeSoglia(ss).max + (Object.prototype.hasOwnProperty.call(riga.sub[sub], o) ? '' : ' (ereditata)')); });
    });
    const m = Object.keys(cfg.modello || {}).filter(id => risolvi(cfg.modello[id], ordine, o) && (ondaId || Object.prototype.hasOwnProperty.call(cfg.modello[id], o)));
    if (m.length) console.log('   verifiche del modello ok/info: ' + m.sort().join(', '));
  });
}

/* ---------------------------------------------------------------------------------------------------------- autotest */
/* istantanea artificiale nel formato del collaudo, a partire dal «prima» (o da un'altra istantanea normalizzata) con modifiche */
function istantanea(base, modifiche) {
  const m = Object.assign({ etichetta: 'artificiale', matrice: base.matrice, profili: base.profili, criteri: base.criteri, pesi: 'popolazione', errori: 0, gravi_pesata: base.gravi_pesata, pesata: {}, conteggio: {}, perDim: {}, modello: {} }, modifiche || {});
  const pesata = Object.assign({}, base.pesata, m.pesata), conteggio = Object.assign({}, base.conteggio, m.conteggio), modello = Object.assign({}, base.modello, m.modello);
  Object.keys(pesata).forEach(k => { if (pesata[k] === null) { delete pesata[k]; delete conteggio[k]; } });
  const classi = Object.keys(pesata).map(k => ({ chiave: k, codice: codiceDi(k), programmiColpiti: conteggio[k], percentualePesata: pesata[k], perDimensione: { luogo: Object.assign({ palestra: 0, manubri: conteggio[k], corpo: 0 }, m.perDim[k] || {}) } }));
  return { meta: { etichetta: m.etichetta, matrice: m.matrice }, riepilogo: { criteri: m.criteri, commit: 'artificiale', matrice: m.matrice, pesi: m.pesi, profili: m.profili, errori: m.errori, conGravi: 0, gravi_pesata: m.gravi_pesata, classi: conteggio, classi_pesata: pesata },
    classi, verificheModello: Object.keys(modello).map(id => ({ id, esito: modello[id] })) };
}
/* un'istantanea che rispetta tutte le soglie esplicite di un'onda (per provare che passa); `modifiche` si sovrappone ai valori calcolati */
function istantaneaBuona(cfg, ondaId, modifiche) {
  const base = daPrima(cfg.prima), ord = cfg.ordineOnde, mod = modifiche || {};
  const pesata = {}, conteggio = {}, modello = {}, perDim = {};
  Object.keys(cfg.criteri).forEach(cod => {
    const riga = cfg.criteri[cod];
    Object.keys(base.pesata).filter(k => codiceDi(k) === cod).forEach(k => {
      const sub = sottoclasseDi(k);
      const ss = [risolvi(riga.soglie, ord, ondaId), sub ? risolvi((riga.sub || {})[sub], ord, ondaId) : undefined].filter(x => x !== undefined).map(comeSoglia);
      const luogo = ss.filter(s => s.dove), numeriche = ss.filter(s => !s.dove);
      luogo.forEach(s => { const dim = Object.keys(s.dove)[0]; perDim[k] = Object.assign({}, perDim[k], { [s.dove[dim]]: s.max }); });
      if (!numeriche.length) return;
      const limite = Math.min(...numeriche.map(s => s.max));
      if (limite === 0) pesata[k] = null;
      else if (base.pesata[k] > limite) { pesata[k] = Math.max(0.01, limite - 0.5); conteggio[k] = Math.max(1, Math.round(base.conteggio[k] * pesata[k] / base.pesata[k])); }
    });
  });
  Object.keys(cfg.modello || {}).forEach(id => { const a = risolvi(cfg.modello[id], ord, ondaId); if (a) modello[id] = a[0]; });
  const tot = risolvi(cfg.totali.gravi_pesata, ord, ondaId);
  const matrice = cfg.onde[ondaId].matrice;
  const m = Object.assign({}, mod);
  m.pesata = Object.assign(pesata, mod.pesata); m.conteggio = Object.assign(conteggio, mod.conteggio);
  m.perDim = Object.assign(perDim, mod.perDim); m.modello = Object.assign(modello, mod.modello);
  return istantanea(base, Object.assign({ matrice, profili: matrice === 'completa' ? 64800 : 10800, gravi_pesata: tot === undefined ? base.gravi_pesata : Math.min(base.gravi_pesata, tot - 0.5) }, m));
}

function autotest() {
  const cfg = leggiSoglie(), esiti = [];
  const prova = (nome, f) => { let e = null; try { f(); } catch (x) { e = x.message; } esiti.push({ nome, e }); };
  const eq = (a, b, m) => { if (a !== b) throw new Error((m || '') + ' atteso ' + b + ', ottenuto ' + a); };
  const base = daPrima(cfg.prima);
  const esegui = (snapJson, onda, opz) => { const s = daCollaudo(snapJson); return valuta(cfg, s, onda, opz); };
  const cli = (snapJson, args) => {
    const f = path.join(os.tmpdir(), 'cancello-autotest-' + process.pid + '-' + Math.random().toString(36).slice(2) + '.json');
    fs.writeFileSync(f, JSON.stringify(snapJson));
    try { return cp.spawnSync(process.execPath, [__filename, f].concat(args), { encoding: 'utf8' }); } finally { fs.rmSync(f, { force: true }); }
  };

  prova('le soglie sono coerenti: 48 criteri, 112 classi del «prima», onde in ordine, soglie numeriche', () => {
    eq(Object.keys(cfg.criteri).length, 48, 'criteri'); eq(Object.keys(cfg.prima.classi).length, 112, 'classi');
    eq(cfg.ordineOnde.filter(o => !cfg.onde[o]).length, 0, 'onde senza descrizione');
    Object.keys(cfg.prima.classi).forEach(k => { if (!cfg.criteri[codiceDi(k)]) throw new Error('classe senza criterio: ' + k); });
    Object.keys(cfg.criteri).forEach(cod => {
      const r = cfg.criteri[cod];
      [r.soglie].concat(Object.values(r.sub || {})).forEach(t => Object.keys(t).forEach(o => {
        if (cfg.ordineOnde.indexOf(o) === -1) throw new Error(cod + ': onda sconosciuta ' + o);
        if (typeof comeSoglia(t[o]).max !== 'number') throw new Error(cod + ': soglia non numerica in ' + o);
      }));
      if (r.soglie.finale === undefined) throw new Error(cod + ': manca la colonna finale (tabella G)');
    });
    eq(cfg.criteri['SAF-01'].prima, 15.26, 'prima SAF-01'); eq(cfg.criteri['VOL-01'].prima, 57.43, 'prima VOL-01'); eq(cfg.criteri['DUR-02'].prima, 82.82, 'prima DUR-02'); eq(cfg.prima.gravi_pesata, 35.82, 'gravi_pesata');
  });
  prova('il «prima» riproduce se stesso e si ferma se una classe si sposta di piu di 0,5 punti', () => {
    eq(esegui(istantanea(base), 'prima').falliti, 0, 'identico');
    eq(esegui(istantanea(base, { pesata: { 'VOL-01:petto': 26 + 0.4 } }), 'prima').falliti, 0, 'entro tolleranza');
    eq(esegui(istantanea(base, { pesata: { 'VOL-01:petto': 26 + 1 } }), 'prima').falliti >= 1, true, 'oltre tolleranza');
  });
  prova('onda-0: l\'istantanea di partenza non passa (soglie non rispettate), una buona passa', () => {
    const r0 = esegui(istantanea(base), 'onda-0');
    eq(r0.falliti >= 8, true, 'il «prima» deve fallire molte soglie, falliti ' + r0.falliti);
    eq(r0.righe.some(x => x.esito === 'fallito' && /^SAF-01:spalle/.test(x.testo)), true, 'SAF-01:spalle fallisce');
    const b = esegui(istantaneaBuona(cfg, 'onda-0'), 'onda-0');
    if (b.falliti) throw new Error('l\'istantanea buona fallisce: ' + b.righe.filter(x => x.esito === 'fallito').map(x => x.testo).join(' | '));
  });
  prova('onda-0: una classe a zero che riappare, o una che peggiora oltre la tolleranza, ferma il cancello', () => {
    const buona = istantaneaBuona(cfg, 'onda-0');
    eq(esegui(buona, 'onda-0').falliti, 0);
    const mod = m => istantaneaBuona(cfg, 'onda-0', m);
    eq(esegui(mod({ pesata: { 'SAF-03': 0.1 }, conteggio: { 'SAF-03': 12 } }), 'onda-0').falliti >= 1, true, 'SAF-03 (gia a 0) riappare');
    eq(esegui(mod({ pesata: { 'ORD-04': 0.01 }, conteggio: { 'ORD-04': 1 } }), 'onda-0').falliti >= 1, true, 'ORD-04 (gia a 0) riappare');
    const peggio = daCollaudo(istantaneaBuona(cfg, 'onda-0')); peggio.pesata['VOL-01:petto'] = 31; peggio.conteggio['VOL-01:petto'] = 3600;
    eq(valuta(cfg, peggio, 'onda-0').falliti >= 1, true, 'VOL-01:petto 26 -> 31 e una regressione');
    const lieve = daCollaudo(istantaneaBuona(cfg, 'onda-0')); lieve.pesata['VOL-01:petto'] = 26.4;
    eq(valuta(cfg, lieve, 'onda-0').falliti, 0, '+0,4 punti e dentro la tolleranza');
    eq(esegui(mod({ errori: 3 }), 'onda-0').falliti >= 1, true, 'errori del generatore');
    eq(esegui(mod({ pesi: 'uniformi' }), 'onda-0').falliti >= 1, true, 'pesi uniformi');
  });
  prova('le soglie si ereditano: a onda-1 e onda-2a vale ancora quello di onda-0, e ogni onda aggiunge le sue', () => {
    const b1 = istantaneaBuona(cfg, 'onda-1');
    eq(esegui(b1, 'onda-1').falliti, 0, 'buona a onda-1');
    eq(esegui(istantaneaBuona(cfg, 'onda-0', { modello: { 'MOD-01': 'ok' } }), 'onda-1').falliti, 0, 'quella di onda-0 (piu MOD-01, nuovo a onda-1) passa ancora a onda-1');
    eq(esegui(istantaneaBuona(cfg, 'onda-0'), 'onda-1').falliti, 1, 'senza MOD-01 ok si ferma solo li');
    eq(esegui(istantaneaBuona(cfg, 'onda-0', { pesata: { 'SAF-01:spalle': 0.5 }, conteggio: { 'SAF-01:spalle': 10 } }), 'onda-1').falliti >= 1, true, 'SAF-01 ereditato');
    eq(esegui(istantaneaBuona(cfg, 'onda-0'), 'onda-2a').falliti >= 3, true, 'a onda-2a servono VOL-02, DIR-01...');
    eq(esegui(istantaneaBuona(cfg, 'onda-2a'), 'onda-2a').falliti, 0, 'buona a onda-2a');
    eq(esegui(istantaneaBuona(cfg, 'onda-2'), 'onda-2').falliti, 0, 'buona a onda-2');
    eq(risolvi(cfg.criteri['DUR-02'].soglie, cfg.ordineOnde, 'onda-1'), 74, 'DUR-02 a onda-1 (INT-0: alzata da 41 a 64, D-P10; W0-T7: 74 senza pause allungate per riempire i minuti, revisione Opus M2)');
    eq(risolvi(cfg.criteri['DUR-02'].soglie, cfg.ordineOnde, 'onda-2'), 3, 'DUR-02 a onda-2');
  });
  prova('le soglie per luogo contano i programmi in palestra (SES-03, PAT-01)', () => {
    const b = istantaneaBuona(cfg, 'onda-0', { pesata: { 'SES-03:lower/hinge': 14 }, conteggio: { 'SES-03:lower/hinge': 1500 }, perDim: { 'SES-03:lower/hinge': { palestra: 0, manubri: 1500 } } });
    eq(esegui(b, 'onda-0').falliti, 0, 'tutti i programmi con il difetto sono a casa: passa');
    const m = istantaneaBuona(cfg, 'onda-0', { pesata: { 'SES-03:lower/hinge': 14 }, conteggio: { 'SES-03:lower/hinge': 1500 }, perDim: { 'SES-03:lower/hinge': { palestra: 3, manubri: 1497 } } });
    eq(esegui(m, 'onda-0').falliti >= 1, true, '3 programmi in palestra: ferma');
  });
  prova('le verifiche del modello (MOD) e la matrice sbagliata fermano il cancello', () => {
    eq(esegui(istantaneaBuona(cfg, 'onda-0', { modello: { 'MOD-03': 'buchi' } }), 'onda-0').falliti >= 1, true, 'MOD-03 con buchi');
    eq(esegui(istantaneaBuona(cfg, 'onda-4'), 'onda-4').falliti, 0, 'onda-4 buona');
    eq(esegui(istantaneaBuona(cfg, 'onda-4', { matrice: 'standard', profili: 10800 }), 'onda-4').falliti >= 1, true, 'onda-4 vuole la matrice completa');
    eq(esegui(istantaneaBuona(cfg, 'onda-4', { matrice: 'standard', profili: 10800 }), 'onda-4', { qualsiasiMatrice: true }).falliti, 0, '--qualsiasi-matrice la accetta');
  });
  prova('--contro: nessuna classe peggiore dell\'onda precedente; --identico: nessuna differenza', () => {
    const contro = daCollaudo(istantaneaBuona(cfg, 'onda-2', { pesata: { 'RID-01:grande_gluteo': 2 }, conteggio: { 'RID-01:grande_gluteo': 200 } }));
    const o3 = istantaneaBuona(cfg, 'onda-3', { pesata: { 'RID-01:grande_gluteo': 2 }, conteggio: { 'RID-01:grande_gluteo': 200 } });
    eq(esegui(o3, 'onda-3', { contro }).falliti, 0, 'uguale all\'onda 2: passa');
    eq(esegui(o3, 'onda-3', { contro, identico: true }).falliti, 0, 'identico: identico');
    const diverso = istantaneaBuona(cfg, 'onda-3', { pesata: { 'RID-01:grande_gluteo': 2, 'SAF-02:ginocchia': 14.5 + 0.3 }, conteggio: { 'RID-01:grande_gluteo': 200, 'SAF-02:ginocchia': 3150 } });
    eq(esegui(diverso, 'onda-3', { contro, identico: true }).falliti >= 1, true, 'identico: una differenza ferma');
    eq(esegui(diverso, 'onda-3', { contro }).falliti, 0, 'ma +0,3 punti e dentro la tolleranza della regressione');
    const peggio = istantaneaBuona(cfg, 'onda-3', { pesata: { 'RID-01:grande_gluteo': 4.9 }, conteggio: { 'RID-01:grande_gluteo': 500 } });   /* dentro la soglia di RID-01 (<= 5) ma +2,9 punti sull'onda 2 */
    eq(esegui(peggio, 'onda-3', { contro }).falliti >= 1, true, 'regressione contro l\'onda 2 (anche dentro la soglia di RID-01 a onda-2)');
  });
  prova('--contro: ne una soglia esplicita ne un totale allentato nascondono una regressione (INT-1)', () => {
    /* onda-2: gravi_pesata <= 1; onda-1 eredita 21,5 (la soglia dell'onda 0): 21,5 contro un 2,7 misurato e una soglia allentata */
    const contro = daCollaudo(istantaneaBuona(cfg, 'onda-1', { gravi_pesata: 2.7 }));
    const buono = istantaneaBuona(cfg, 'onda-1', { gravi_pesata: 2.7 });
    eq(esegui(buono, 'onda-1', { contro }).falliti, 0, 'uguale: passa');
    const lieve = istantaneaBuona(cfg, 'onda-1', { gravi_pesata: 2.7 + 0.4 });
    eq(esegui(lieve, 'onda-1', { contro }).falliti, 0, '+0,4 punti sul totale: dentro la tolleranza');
    const peggio = istantaneaBuona(cfg, 'onda-1', { gravi_pesata: 20 });
    const senza = esegui(peggio, 'onda-1');
    eq(senza.falliti, 0, 'senza --contro il totale 20 e dentro la soglia 21,5 (e il limite del «prima»)');
    const con = esegui(peggio, 'onda-1', { contro });
    eq(con.falliti >= 1, true, 'con --contro il totale 2,7 -> 20 e una regressione anche dentro la soglia');
    eq(con.righe.some(r => r.esito === 'fallito' && /gravi_pesata .* non peggiora/.test(r.testo)), true, 'il fallimento dice che il totale peggiora');
    /* una classe dentro la sua soglia ma peggiore dell'onda precedente: gia coperta dalla prova sopra (RID-01); qui la soglia e sulla sottoclasse */
    const c2 = daCollaudo(istantaneaBuona(cfg, 'onda-1', { pesata: { 'VOL-01:femorali': 40 }, conteggio: { 'VOL-01:femorali': 4000 } }));
    const p2 = istantaneaBuona(cfg, 'onda-1', { pesata: { 'VOL-01:femorali': 44.9 }, conteggio: { 'VOL-01:femorali': 4900 } });   /* soglia onda 0: 45 */
    eq(esegui(p2, 'onda-1').falliti, 0, 'sotto la soglia della sottoclasse (45)');
    eq(esegui(p2, 'onda-1', { contro: c2 }).falliti >= 1, true, 'ma +4,9 punti sull\'onda precedente: fallisce');
    /* una verifica del modello che era ok non diventa altro */
    const m1 = daCollaudo(istantaneaBuona(cfg, 'onda-1', { modello: { 'MOD-12': 'ok' } }));
    const m2 = istantaneaBuona(cfg, 'onda-1', { modello: { 'MOD-12': 'buchi' } });
    eq(esegui(m2, 'onda-1').falliti, 0, 'MOD-12 non e governato a onda-1: senza --contro non conta');
    eq(esegui(m2, 'onda-1', { contro: m1 }).falliti >= 1, true, 'con --contro un MOD «ok» che diventa «buchi» ferma il cancello');
  });
  prova('regressioni ammesse (INT-1): una classe con il suo tetto e il suo motivo puo salire fino al tetto, non oltre; le altre restano giudicate; la sicurezza non si ammette', () => {
    const cfg2 = JSON.parse(JSON.stringify(cfg));
    cfg2.onde['onda-3'].ammesse = { 'RID-01:grande_gluteo': { max: 4, motivo: 'prova', risolve: 'W9-T9' }, 'SAF-01:spalle': { max: 20, motivo: 'non si puo' } };
    const contro = daCollaudo(istantaneaBuona(cfg2, 'onda-2', { pesata: { 'RID-01:grande_gluteo': 2 }, conteggio: { 'RID-01:grande_gluteo': 200 } }));
    const mk = (v) => istantaneaBuona(cfg2, 'onda-3', { pesata: { 'RID-01:grande_gluteo': v }, conteggio: { 'RID-01:grande_gluteo': v * 100 } });
    const valuta2 = (snapshot) => valuta(cfg2, daCollaudo(snapshot), 'onda-3', { contro });
    eq(valuta2(mk(2)).falliti, 0, 'uguale: passa');
    eq(valuta2(mk(3.5)).falliti, 0, '+1,5 punti ma sotto il tetto 4: ammessa');
    eq(valuta2(mk(3.5)).righe.some(r => /regressione AMMESSA RID-01:grande_gluteo/.test(r.testo)), true, 'e lo dice');
    eq(valuta2(mk(4.6)).falliti >= 1, true, 'oltre il tetto: fallisce');
    eq(valuta2(mk(4.6)).righe.some(r => /oltre il tetto ammesso/.test(r.testo)), true, 'e dice che e oltre il tetto');
    const altra = istantaneaBuona(cfg2, 'onda-3', { pesata: { 'RID-01:grande_gluteo': 2, 'RID-02': 20 }, conteggio: { 'RID-01:grande_gluteo': 200, 'RID-02': 2000 } });
    eq(valuta2(altra).righe.some(r => r.esito === 'fallito' && /RID-02/.test(r.testo)), true, 'una classe non ammessa continua a fallire');
    const contro2 = daCollaudo(istantaneaBuona(cfg2, 'onda-2', { pesata: { 'SAF-01:spalle': 0 }, conteggio: { 'SAF-01:spalle': 0 } }));
    const sic = istantaneaBuona(cfg2, 'onda-3', { pesata: { 'SAF-01:spalle': 3 }, conteggio: { 'SAF-01:spalle': 300 } });
    eq(valuta(cfg2, daCollaudo(sic), 'onda-3', { contro: contro2 }).falliti >= 1, true, 'una classe di sicurezza non si ammette mai');
  });
  prova('nomi delle onde e etichette del collaudo', () => {
    eq(normalizzaOnda('INT-0', cfg), 'onda-0'); eq(normalizzaOnda('coach-v2-onda-2', cfg), 'onda-2'); eq(normalizzaOnda('2a', cfg), 'onda-2a');
    eq(normalizzaOnda('coach-v2-onda-0-prima', cfg), 'prima'); eq(normalizzaOnda('base', cfg), 'prima'); eq(normalizzaOnda('F-1', cfg), 'finale'); eq(normalizzaOnda('onda-9', cfg), null);
  });
  prova('da riga di comando: esce 1 oltre soglia, 0 se passa, 2 per un errore d\'uso', () => {
    const fuori = cli(istantanea(base), ['onda-0']);
    eq(fuori.status, 1, 'oltre soglia ' + fuori.stderr); eq(/CANCELLO NON PASSATO/.test(fuori.stdout), true, 'messaggio');
    eq(cli(istantaneaBuona(cfg, 'onda-0'), ['onda-0']).status, 0, 'buona');
    eq(cli(istantanea(base), ['prima']).status, 0, 'il «prima» si riproduce');
    eq(cli(istantanea(base), ['onda-9']).status, 2, 'onda sconosciuta');
    const nonJson = path.join(os.tmpdir(), 'cancello-autotest-rotto-' + process.pid + '.json'); fs.writeFileSync(nonJson, 'non json');
    try { eq(cp.spawnSync(process.execPath, [__filename, nonJson, 'onda-0'], { encoding: 'utf8' }).status, 2, 'file rotto'); } finally { fs.rmSync(nonJson, { force: true }); }
    eq(cp.spawnSync(process.execPath, [__filename, '/non/esiste.json', 'onda-0'], { encoding: 'utf8' }).status, 2, 'file mancante');
  });
  const falliti = esiti.filter(x => x.e);
  esiti.forEach(x => console.log((x.e ? '  FALLITO  ' : '  ok       ') + x.nome + (x.e ? ': ' + x.e : '')));
  console.log(falliti.length ? 'autotest del cancello: ' + falliti.length + ' falliti su ' + esiti.length : 'autotest del cancello: ' + esiti.length + ' prove ok');
  return falliti.length ? 1 : 0;
}

/* --------------------------------------------------------------------------------------------------------------- CLI */
function main(argv) {
  const pos = [], opz = { eccetto: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--contro') opz.controFile = argv[++i];
    else if (a === '--identico') opz.identico = true;
    else if (a === '--eccetto') opz.eccetto = String(argv[++i] || '').split(',').filter(Boolean);
    else if (a === '--soglie') opz.soglie = argv[++i];
    else if (a === '--qualsiasi-matrice') opz.qualsiasiMatrice = true;
    else if (a === '--json') opz.json = true;
    else if (a === '--autotest') opz.autotest = true;
    else if (a === '--elenco') opz.elenco = true;
    else if (a === '--help' || a === '-h') { console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 25).join('\n').replace(/^   /gm, '')); return 0; }
    else if (a.startsWith('--')) { console.error('opzione sconosciuta: ' + a); return 2; }
    else pos.push(a);
  }
  let cfg;
  try { cfg = leggiSoglie(opz.soglie); } catch (e) { console.error('Soglie non leggibili: ' + e.message); return 2; }
  if (opz.autotest) return autotest();
  if (opz.elenco) { const o = pos[0] ? normalizzaOnda(pos[0], cfg) : null; if (pos[0] && !o) { console.error('onda sconosciuta: ' + pos[0]); return 2; } elenco(cfg, o === 'prima' ? null : o); return 0; }
  if (pos.length !== 2) { console.error('uso: npm run cancello -- <collaudo.json> <onda> [--contro <json>] [--identico]   (npm run cancello -- --help)'); return 2; }
  const onda = normalizzaOnda(pos[1], cfg);
  if (!onda) { console.error('onda sconosciuta: ' + pos[1] + ' (valide: prima, ' + cfg.ordineOnde.join(', ') + ')'); return 2; }
  let snap, contro = null;
  try { snap = daCollaudo(JSON.parse(fs.readFileSync(pos[0], 'utf8'))); } catch (e) { console.error('Istantanea non leggibile (' + pos[0] + '): ' + e.message); return 2; }
  if (opz.controFile) { try { contro = daCollaudo(JSON.parse(fs.readFileSync(opz.controFile, 'utf8'))); } catch (e) { console.error('Istantanea --contro non leggibile (' + opz.controFile + '): ' + e.message); return 2; } }
  if (onda === 'prima' && (contro || opz.identico)) { console.error('«prima» si confronta con le soglie, non con --contro'); return 2; }
  const r = valuta(cfg, snap, onda, { contro, identico: opz.identico, eccetto: opz.eccetto, qualsiasiMatrice: opz.qualsiasiMatrice });
  stampa(r, snap, opz.json);
  return r.falliti ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { leggiSoglie, daCollaudo, daPrima, normalizzaOnda, risolvi, valuta, istantanea, istantaneaBuona, autotest };
