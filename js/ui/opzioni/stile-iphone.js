/* Opzioni in stile Impostazioni di iPhone
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   OPZIONI in stile Impostazioni di iPhone (come Hevy e Strong):
   la pagina principale e una lista corta di righe icona · nome ·
   valore attuale · freccia; i dettagli si aprono in una pagina a parte.
   Ordine dal piu usato al meno usato, azioni pericolose in fondo.
   ============================================================ */
const SET_ICO = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  prog: '<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h6"/><path d="M17 15l2 2 3-4"/>',
  body: '<circle cx="12" cy="4.5" r="2"/><path d="M12 7v7"/><path d="M8 9.5l4-1 4 1"/><path d="M9.5 21l2.5-7 2.5 7"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2"/><path d="M9 2h6"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/><path d="M11 8v6M8 11h6"/>',
  theme: '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M9 7h6"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  lang: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
  coach: '<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>',
  save: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/>',
  restore: '<path d="M12 21V9"/><path d="M7 14l5-5 5 5"/><path d="M4 5h16"/>',
  import: '<path d="M4 4h10l6 6v10H4z"/><path d="M14 4v6h6"/><path d="M8 15h8"/><path d="M8 11h3"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4"/><path d="M8.2 13.2l7.6 4.4"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>'
};
function setIco(k, tono) {
  return '<span class="sr-ico ' + (tono || '') + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + SET_ICO[k] + '</svg></span>';
}
/* riga che apre una pagina o fa un azione */
function setRow(ico, tono, nome, valore, onclick, cls) {
  return '<button class="sr-row ' + (cls || '') + '" onclick="' + onclick + '">' + setIco(ico, tono) +
    '<span class="sr-name">' + nome + '</span>' +
    (valore ? '<span class="sr-val">' + valore + '</span>' : '') +
    '<span class="sr-go" aria-hidden="true">›</span></button>';
}
/* riga con interruttore, senza pagina */
function setRowSwitch(ico, tono, k, def, nome) {
  const on = isOn(k, def);
  return '<button class="sr-row" onclick="toggleSetting(\'' + k + '\', ' + (def ? 'true' : 'false') + ')" role="switch" aria-checked="' + on + '">' +
    setIco(ico, tono) + '<span class="sr-name">' + nome + '</span><span class="switch ' + (on ? 'on' : '') + '"></span></button>';
}
function setGroup(titolo, righe, nota) {
  return '<div class="sr-group">' + (titolo ? '<div class="sr-title">' + titolo + '</div>' : '') +
    '<div class="sr-list">' + righe + '</div>' + (nota ? '<div class="sr-note">' + nota + '</div>' : '') + '</div>';
}
