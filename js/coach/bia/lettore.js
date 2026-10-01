/* Lettore BIA a struttura
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   LETTORE BIA A STRUTTURA (InBody e simili)
   Alcuni referti, come l InBody120, DISEGNANO le etichette come
   grafica: nel testo del PDF restano solo i numeri, in un ordine
   fisso. Il lettore per etichette li' non trova nulla; questo invece
   riconosce la struttura del foglio e sa quale numero e quale.
   Legge anche lo STORICO stampato sul referto (le misure precedenti),
   cosi il coach ha subito un andamento, non una foto sola.
   ============================================================ */
function numIt(s) { return parseFloat(String(s).replace(',', '.')); }

window.parseInBody = function(testo) {
  const t = String(testo).replace(/\s+/g, ' ');
  if (!/InBody/i.test(t)) return null;
  const out = {};

  /* data e ora del test, anno a quattro cifre */
  const dt = t.match(/(\d{2})\.(\d{2})\.(\d{4})\.?\s+\d{2}:\d{2}/);
  if (dt) out.data = dt[3] + '-' + dt[2] + '-' + dt[1];

  /* intestazione: altezza ed eta stanno tra la sigla del modello e la data */
  const alt = t.match(/\b(\d{3}(?:[.,]\d)?)\s*cm\b/i);
  if (alt) out.altezza = numIt(alt[1]);
  const fineMod = t.indexOf(']');
  const inizioData = dt ? t.indexOf(dt[0]) : -1;
  if (fineMod !== -1 && inizioData > fineMod) {
    const testa = t.slice(fineMod + 1, inizioData).split(' ').filter(Boolean);
    const eta = testa.find(x => /^\d{1,3}$/.test(x) && Number(x) >= 10 && Number(x) <= 99);
    if (eta) out.eta = Number(eta);
  }
  if (/\b(Maschio|Uomo|Male)\b/i.test(t)) out.sesso = 'uomo';
  else if (/\b(Femmina|Donna|Female)\b/i.test(t)) out.sesso = 'donna';

  /* blocco composizione: (L) acqua, poi (kg) proteine, minerali, grasso, peso,
     ognuno seguito dal suo intervallo di riferimento "( ) a~b" */
  const comp = [];
  const reComp = /\((L|kg)\)\s*(\d+(?:,\d+)?)\s*\(\s*\)\s*\d+(?:,\d+)?~\d+(?:,\d+)?/g;
  let m;
  while ((m = reComp.exec(t)) !== null) comp.push({ u: m[1], v: numIt(m[2]) });
  if (comp.length >= 5 && comp[0].u === 'L') {
    out.tbw = comp[0].v;
    out.proteine = comp[1].v;
    out.minerali = comp[2].v;
    out.fm = comp[3].v;
    out.peso = comp[4].v;
  }

  /* barre: ogni valore segue la sua scala stampata */
  const dopoScala = (scala) => {
    const i = t.indexOf(scala);
    if (i === -1) return null;
    const r = t.slice(i + scala.length).match(/^\s+(\d+(?:,\d+)?)/);
    return r ? numIt(r[1]) : null;
  };
  const smm = dopoScala('70 80 90 100 110 120 130 140 150 160 170');
  if (smm) out.smm = smm;
  const bmi = dopoScala('40,0 45,0 50,0 55,0');
  if (bmi) out.bmi = bmi;
  const pbf = dopoScala('0,0 5,0 10,0 15,0 20,0 25,0 30,0 35,0 40,0 45,0 50,0');
  if (pbf) out.fmPerc = pbf;

  /* colonna destra: metabolismo (unita prima o dopo il numero), grasso viscerale */
  const bmr = t.match(/kcal\s*(\d{3,4})\b/i) || t.match(/\b(\d{3,4})\s*kcal/i);
  if (bmr) out.bmr = Number(bmr[1]);
  const visc = t.match(/\s(\d{1,2})\s+1~9\b/);
  if (visc) out.viscerale = Number(visc[1]);

  if (out.peso && out.fm && !out.ffm) out.ffm = Math.round((out.peso - out.fm) * 10) / 10;
  if (out.peso && out.fm && !out.fmPerc) out.fmPerc = Math.round(out.fm / out.peso * 1000) / 10;

  /* storico stampato: date con anno a due cifre, e prima di loro tre righe
     di valori (peso, muscolo scheletrico, percentuale di grasso) */
  const reData = /(\d{2})\.(\d{2})\.(\d{2})\.\s+\d{2}:\d{2}/g;
  const date = [];
  let first = -1;
  while ((m = reData.exec(t)) !== null) {
    if (first === -1) first = m.index;
    date.push('20' + m[3] + '-' + m[2] + '-' + m[1]);
  }
  if (date.length >= 2 && first > 0) {
    const prima = t.slice(0, first).trim().split(' ');
    const nums = [];
    for (let i = prima.length - 1; i >= 0 && nums.length < date.length * 3; i--) {
      if (/^\d+(,\d+)?$/.test(prima[i])) nums.unshift(numIt(prima[i])); else break;
    }
    if (nums.length === date.length * 3) {
      const n = date.length;
      out.storico = date.map((d, i) => {
        const peso = nums[i], smmV = nums[n + i], pbfV = nums[2 * n + i];
        return { data: d, valori: { peso: peso, smm: smmV, fmPerc: pbfV, ffm: Math.round(peso * (1 - pbfV / 100) * 10) / 10 } };
      });
    }
  }
  return out;
};

window.parseBiaText = function(testo) {
  /* Ogni strumento scrive a modo suo: InBody usa SMM e PBF, Tanita "Fat %"
     e "FFM", Akern BodyGram "MASSA GRASSA"/"MASSA MAGRA", Seca "fat mass",
     Omron "grasso corporeo". Qui si coprono le diciture piu diffuse, in
     italiano e in inglese, con virgola o punto decimale. */
  const t = testo.replace(/\s+/g, ' ');
  const num = '([0-9]{1,3}(?:[.,][0-9]{1,2})?)';
  const intero = '([0-9]{3,5})';

  const cerca = (patterns) => {
    for (let i = 0; i < patterns.length; i++) {
      const m = t.match(new RegExp(patterns[i], 'i'));
      if (m) {
        const v = parseFloat(String(m[1]).replace(',', '.'));
        if (!isNaN(v)) return v;
      }
    }
    return null;
  };

  const out = {
    peso: cerca([
      'peso(?:\\s+corporeo)?[^0-9]{0,25}' + num + '\\s*kg',
      '\\bweight\\b[^0-9]{0,25}' + num + '\\s*kg',
      'body\\s*weight[^0-9]{0,25}' + num
    ]),
    altezza: cerca([
      'altezza[^0-9]{0,25}' + num + '\\s*cm',
      '\\bheight\\b[^0-9]{0,25}' + num + '\\s*cm',
      'statura[^0-9]{0,25}' + num
    ]),
    fmPerc: cerca([
      'massa\\s+grassa[^0-9%]{0,30}' + num + '\\s*%',
      'grasso\\s+corporeo[^0-9%]{0,30}' + num + '\\s*%',
      'percentuale\\s+di\\s+grasso[^0-9%]{0,30}' + num,
      '\\bpbf\\b[^0-9]{0,25}' + num,
      'percent\\s*body\\s*fat[^0-9]{0,25}' + num,
      'body\\s*fat(?:\\s*mass)?[^0-9%]{0,25}' + num + '\\s*%',
      'fat\\s*mass[^0-9%]{0,30}' + num + '\\s*%',
      '\\bfat\\b\\s*%[^0-9]{0,15}' + num,
      '\\bfm\\b[^0-9%]{0,20}' + num + '\\s*%'
    ]),
    fm: cerca([
      'massa\\s+grassa[^0-9]{0,30}' + num + '\\s*kg',
      'fat\\s*mass[^0-9]{0,30}' + num + '\\s*kg',
      'body\\s*fat\\s*mass[^0-9]{0,25}' + num + '\\s*kg',
      '\\bfm\\b[^0-9]{0,20}' + num + '\\s*kg'
    ]),
    ffm: cerca([
      'massa\\s+magra[^0-9]{0,30}' + num + '\\s*kg',
      'massa\\s+libera\\s+da\\s+grasso[^0-9]{0,30}' + num,
      'free\\s*fat\\s*mass[^0-9]{0,30}' + num + '\\s*kg',
      'fat[\\s-]*free\\s*mass[^0-9]{0,30}' + num + '\\s*kg',
      '\\bffm\\b[^0-9]{0,20}' + num,
      'lean\\s*(?:body\\s*)?mass[^0-9]{0,25}' + num + '\\s*kg'
    ]),
    smm: cerca([
      'massa\\s+muscolare(?:\\s+scheletrica)?[^0-9]{0,30}' + num + '\\s*kg',
      'skeletal\\s*muscle\\s*mass[^0-9]{0,30}' + num,
      '\\bsmm\\b[^0-9]{0,20}' + num,
      'muscle\\s*mass[^0-9]{0,25}' + num + '\\s*kg'
    ]),
    tbw: cerca([
      'acqua\\s+total[ei][^0-9]{0,30}' + num,
      'acqua\\s+corporea\\s+totale[^0-9]{0,30}' + num,
      '\\btbw\\b[^0-9]{0,20}' + num,
      'total\\s*body\\s*water[^0-9]{0,30}' + num
    ]),
    bmr: cerca([
      'metabolismo\\s+basale[^0-9]{0,30}' + intero,
      'dispendio\\s+energetico\\s+basale[^0-9]{0,30}' + intero,
      '\\bbmr\\b[^0-9]{0,20}' + intero,
      'basal\\s*metabolic\\s*rate[^0-9]{0,25}' + intero,
      '\\bbmi?r\\b[^0-9]{0,15}' + intero + '\\s*kcal',
      '\\bmb\\b[^0-9]{0,20}' + intero + '\\s*kcal'
    ]),
    bmi: cerca([
      '\\bbmi\\b[^0-9]{0,20}' + num,
      'indice\\s+di\\s+massa\\s+corporea[^0-9]{0,30}' + num
    ]),
    ecw: cerca([
      'acqua\\s+extracellulare[^0-9]{0,30}' + num,
      '\\becw\\b[^0-9]{0,20}' + num
    ]),
    phase: cerca([
      'angolo\\s+di\\s+fase[^0-9]{0,30}' + num,
      'phase\\s*angle[^0-9]{0,25}' + num
    ])
  };

  /* incroci: se manca un dato ma si puo ricavare, lo ricavo */
  if (!out.fmPerc && out.fm && out.peso) out.fmPerc = Math.round((out.fm / out.peso) * 1000) / 10;
  if (!out.fm && out.fmPerc && out.peso) out.fm = Math.round(out.peso * out.fmPerc) / 100;
  if (!out.ffm && out.fm && out.peso) out.ffm = Math.round((out.peso - out.fm) * 10) / 10;
  if (!out.ffm && out.smm) out.ffm = out.smm;

  /* referti che disegnano le etichette: si legge la struttura del foglio */
  const strutt = parseInBody(testo);
  if (strutt) {
    Object.keys(strutt).forEach(k => {
      if (out[k] === null || out[k] === undefined) out[k] = strutt[k];
    });
  }

  /* scarta valori assurdi: meglio un campo vuoto che un dato sbagliato */
  if (out.fmPerc !== null && (out.fmPerc < 2 || out.fmPerc > 70)) out.fmPerc = null;
  if (out.peso !== null && (out.peso < 25 || out.peso > 300)) out.peso = null;
  if (out.altezza !== null && (out.altezza < 100 || out.altezza > 230)) out.altezza = null;
  if (out.bmr !== null && (out.bmr < 700 || out.bmr > 4500)) out.bmr = null;

  return out;
};

window.handleBiaPdf = async function(files) {
  const file = files && files[0];
  if (!file) return;
  const st = document.getElementById('bia-status');
  if (file.type !== 'application/pdf') { st.className = 'bia-status warn'; st.innerText = 'Serve un file PDF.'; return; }
  st.className = 'bia-status'; st.innerText = 'Leggo il referto...';

  try {
    const pdfjsLib = await ensurePdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    let testo = '';
    for (let i = 1; i <= Math.min(pdf.numPages, 6); i++) {
      const page = await pdf.getPage(i);
      const tc = await page.getTextContent();
      testo += ' ' + tc.items.map(x => x.str).join(' ');
    }
    applyBiaValues(parseBiaText(testo), true);
  } catch (err) {
    st.className = 'bia-status warn';
    st.innerText = 'Non riesco a leggere il PDF (serve la connessione la prima volta). Scrivi i valori a mano qui sotto: funziona uguale.';
  }
};

window.applyBiaValues = function(vals, fromPdf) {
  onbData.bia = Object.assign({}, onbData.bia || {}, vals);
  if (vals.eta && !onbData.age) onbData.age = vals.eta;
  if (vals.sesso && !onbData.sex) onbData.sex = vals.sesso;
  /* se ho i kg di grasso ma non la percentuale, la calcolo */
  const b = onbData.bia;
  if (!b.fmPerc && b.fm && b.peso) b.fmPerc = Math.round((b.fm / b.peso) * 1000) / 10;
  if (!b.ffm && b.fm && b.peso) b.ffm = Math.round((b.peso - b.fm) * 10) / 10;

  document.querySelectorAll('[data-bia]').forEach(inp => {
    const v = b[inp.dataset.bia];
    if (v !== undefined && v !== null) inp.value = v;
  });

  const trovati = Object.keys(b).filter(k => b[k] !== null && b[k] !== undefined).length;
  if (fromPdf && trovati > 0 && typeof onbStep !== 'undefined' && onbStep === 5) {
    renderOnb();   /* i valori letti compaiono nel riepilogo, senza riscriverli */
  }
  const st = document.getElementById('bia-status');
  if (!st) return;
  if (fromPdf && trovati === 0) {
    st.className = 'bia-status warn';
    st.innerText = 'Non ho riconosciuto valori in questo referto: ogni strumento scrive in modo diverso. Inseriscili a mano qui sotto.';
  } else if (fromPdf) {
    st.className = 'bia-status ok';
    st.innerText = '\u2713 Letti ' + trovati + ' valori. Controllali prima di proseguire.';
  }
};

/* ---------- Analisi ---------- */
window.analyzeBia = function(bia, sex) {
  if (!bia) return null;
  const out = { note: [] };
  const peso = bia.peso, h = bia.altezza, fmPerc = bia.fmPerc, ffm = bia.ffm;

  if (peso && h) {
    out.bmi = Math.round((peso / Math.pow(h / 100, 2)) * 10) / 10;
  }
  if (ffm && h) {
    /* FFMI: quanta massa magra porti rispetto alla tua statura */
    out.ffmi = Math.round((ffm / Math.pow(h / 100, 2)) * 10) / 10;
  }
  if (fmPerc) {
    out.fmPerc = fmPerc;
    /* Riferimenti: ~15% negli atleti, ~20% nei sedentari, oltre 30% obesita.
       Nelle donne la soglia fisiologica e piu alta. */
    const soglie = sex === 'donna' ? { atleta: 22, normale: 30, alto: 35 } : { atleta: 15, normale: 20, alto: 25 };
    if (fmPerc <= soglie.atleta) { out.fmLivello = 'good'; out.fmTesto = 'Livello da atleta'; }
    else if (fmPerc <= soglie.normale) { out.fmLivello = 'good'; out.fmTesto = 'Nella norma'; }
    else if (fmPerc <= soglie.alto) { out.fmLivello = 'mid'; out.fmTesto = 'Sopra la media'; }
    else { out.fmLivello = 'att'; out.fmTesto = 'Elevata: meglio parlarne con un professionista'; }

    if (sex === 'donna' && fmPerc < 17) {
      out.note.push('Sotto il 17% di massa grassa la funzione mestruale puo risentirne: e un valore da monitorare con un medico.');
    }
  }
  if (bia.tbw && peso) {
    out.tbwPerc = Math.round((bia.tbw / peso) * 1000) / 10;
    out.note.push('L acqua corporea e circa il 60% del peso in un uomo adulto, meno nelle donne e in chi ha piu massa grassa.');
  }
  if (bia.bmr) out.bmr = bia.bmr;
  return out;
};

/* ---------- Generatore del programma ---------- */
