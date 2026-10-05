/* Esportazione verso calendari (.ics)
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   ESPORTAZIONE VERSO APPLE, GOOGLE, OUTLOOK (.ics)
   Il formato .ics e' lo standard che leggono tutti i calendari.
   ONESTA' TECNICA: importare un file crea una COPIA, non un legame
   vivo. Un aggiornamento automatico richiederebbe un server che
   pubblica un indirizzo a cui il calendario si abbona; un app ospitata
   su GitHub Pages non ne ha uno. Per aggiornare si riesporta.
   Ogni giorno ha un identificativo fisso: cosi Apple, reimportando,
   aggiorna l evento invece di duplicarlo. Dal 5/10/2026 e
   3in-AAAAMMGG@3in: gli eventi importati con l identificativo di prima
   restano doppi (una volta sola) finche non si cancellano a mano.
   ============================================================ */
function icsEscape(t) {
  return String(t || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/* le righe oltre i 75 caratteri vanno spezzate, come vuole lo standard */
function icsFold(riga) {
  if (riga.length <= 74) return riga;
  const parti = [];
  let r = riga;
  parti.push(r.slice(0, 74)); r = r.slice(74);
  while (r.length) { parti.push(' ' + r.slice(0, 73)); r = r.slice(73); }
  return parti.join('\r\n');
}

function icsData(k) { return k.replace(/-/g, ''); }

window.buildIcs = function() {
  const cal = loadCal();
  const ora = new Date();
  const stamp = ora.getUTCFullYear() + String(ora.getUTCMonth() + 1).padStart(2, '0') + String(ora.getUTCDate()).padStart(2, '0') +
    'T' + String(ora.getUTCHours()).padStart(2, '0') + String(ora.getUTCMinutes()).padStart(2, '0') + '00Z';

  const righe = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Allenamento//IT',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:' + icsEscape('Allenamenti')
  ];

  Object.keys(cal).sort().forEach(k => {
    const v = cal[k];
    if (v.rest) return;                       /* il riposo non intasa il calendario */
    const fine = ymd(piuGiorni(daYmd(k), 1));
    const titolo = (v.done ? '\u2705 ' : '\u{1F3CB}\uFE0F ') + (v.title || 'Allenamento') + (v.done ? ' \u2014 fatto' : '');
    const dettagli = (v.done && v.summary ? v.summary + '\n\n' : '') +
      (v.items || []).map(e => '\u2022 ' + e.name.replace(EMOJI_TESTA, '') + (e.sets ? ' ' + e.sets + (e.reps ? '\u00D7' + e.reps : ' serie') : '')).join('\n');
    righe.push('BEGIN:VEVENT');
    righe.push('UID:3in-' + icsData(k) + '@3in');
    righe.push('DTSTAMP:' + stamp);
    righe.push('DTSTART;VALUE=DATE:' + icsData(k));
    righe.push('DTEND;VALUE=DATE:' + icsData(fine));
    righe.push('SUMMARY:' + icsEscape(titolo));
    righe.push('DESCRIPTION:' + icsEscape(dettagli));
    righe.push('TRANSP:TRANSPARENT');         /* non risulta "occupato" nel calendario */
    righe.push('END:VEVENT');
  });
  righe.push('END:VCALENDAR');
  return righe.map(icsFold).join('\r\n') + '\r\n';
};

window.exportIcs = async function() {
  const cal = loadCal();
  const n = Object.keys(cal).filter(k => !cal[k].rest).length;
  if (!n) { alert('Il calendario e vuoto: metti prima la settimana tipo sul mese.'); return; }

  const testo = buildIcs();
  const nome = 'allenamenti-3in.ics';

  /* Su iPhone la via migliore e' il menu Condividi: da li si sceglie
     direttamente Calendario. Dove non c e, si scarica il file. */
  try {
    const file = new File([testo], nome, { type: 'text/calendar' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Allenamenti' });
      return;
    }
  } catch (e) { if (e && e.name === 'AbortError') return; }

  const blob = new Blob([testo], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  showUndo(n + ' allenamenti esportati');
};

/* Un singolo evento verso Google: funziona anche dal telefono */
function linkGoogle(k, v) {
  const fine = ymd(piuGiorni(daYmd(k), 1));
  const titolo = (v.done ? '\u2705 ' : '') + (v.title || 'Allenamento');
  const dettagli = (v.done && v.summary ? v.summary + '\n\n' : '') +
    (v.items || []).map(e => '- ' + e.name.replace(EMOJI_TESTA, '')).join('\n');
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(titolo) +
    '&dates=' + icsData(k) + '/' + icsData(fine) +
    '&details=' + encodeURIComponent(dettagli);
}

function aggiornaAiutoIcs() {
  const el = document.getElementById('ics-help');
  if (!el) return;
  el.innerHTML =
    '<b>iPhone:</b> Esporta \u2192 Calendario \u2192 "Aggiungi tutti".<br>' +
    '<b>Google:</b> da computer, calendar.google.com \u2192 Impostazioni \u2192 Importa.<br>' +
    '<b>Da sapere:</b> è una copia, non un collegamento: dopo nuovi allenamenti riesporta.';
}
