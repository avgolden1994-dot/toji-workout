/* Calendario del mese
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   CALENDARIO DEL MESE
   La settimana tipo del Piano e' un modello da lunedi a domenica.
   Il calendario invece e' fatto di DATE vere: ci si mette sopra la
   settimana tipo, la si ricopia sulle altre settimane, e i giorni
   finiti restano segnati con la spunta come storico.
   Regola ferma: un giorno gia FATTO non viene mai sovrascritto.
   ============================================================ */
const calKey = () => 'coach_plus_cal_' + currentMode;
const loadCal = () => { try { return JSON.parse(localStorage.getItem(calKey()) || '{}'); } catch (e) { return {}; } };
const saveCal = (c) => localStorage.setItem(calKey(), JSON.stringify(c));

let mcAnno = null, mcMese = null;   /* mese visualizzato */

function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function daYmd(s) { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function lunediDi(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }
/* giorni di calendario tra due date: immune all ora legale */
function giorniTra(a, b) { return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000); }
function piuGiorni(d, n) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }
function giornoSettimana(d) { return DAYS[(d.getDay() + 6) % 7]; }

/* La voce del calendario per una data, costruita dalla settimana tipo */
function voceDaPiano(d) {
  const nome = giornoSettimana(d);
  if (isRestDay(nome)) return { rest: true, title: 'Riposo' };
  const list = loadData()[nome] || [];
  if (!list.length) return null;
  return {
    title: getDayTitle(nome),
    items: list.map(e => ({ name: e.name, sets: e.sets, reps: e.reps })),
    done: false
  };
}

/* Mette la settimana tipo a partire dal lunedi indicato. I giorni fatti restano. */
function mettiSettimana(lunedi, cal) {
  let messi = 0;
  for (let i = 0; i < 7; i++) {
    const d = piuGiorni(lunedi, i), k = ymd(d);
    if (cal[k] && cal[k].done) continue;
    /* i giorni senza allenamento diventano riposo: il blocco e' la
       settimana intera, sette giorni su sette, non solo i giorni pieni */
    cal[k] = voceDaPiano(d) || { rest: true, title: 'Riposo' };
    messi++;
  }
  return messi;
}

/* Copia la settimana che inizia in "da" su quella che inizia in "a". */
function copiaSettimana(da, a, cal) {
  let copiati = 0;
  for (let i = 0; i < 7; i++) {
    const s = cal[ymd(piuGiorni(da, i))];
    const k = ymd(piuGiorni(a, i));
    if (cal[k] && cal[k].done) continue;           /* lo storico non si tocca */
    /* un giorno fatto nella settimana d origine si copia come allenamento
       da fare: la spunta appartiene alla data, non al programma */
    if (s && !s.rest) {
      cal[k] = { title: s.title, items: JSON.parse(JSON.stringify(s.items || [])), done: false };
    } else {
      cal[k] = { rest: true, title: 'Riposo' };
    }
    copiati++;
  }
  return copiati;
}

function settimaneDelMese() {
  const primo = new Date(mcAnno, mcMese, 1);
  const ultimo = new Date(mcAnno, mcMese + 1, 0);
  const out = [];
  for (let l = lunediDi(primo); l <= ultimo; l = piuGiorni(l, 7)) out.push(l);
  return out;
}
