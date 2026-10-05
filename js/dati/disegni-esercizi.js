/* Disegni degli esercizi
   (3in, parte di dati; ordine di caricamento: vedi index.html) */

/* ============================================================
   DISEGNI DEGLI ESERCIZI
   Il file si chiama come l esercizio, ripulito: "Panca Piana Bilanciere"
   diventa img/panca-piana-bilanciere.png. Se il file c e, compare; se
   non c e, resta il riquadro vuoto e nulla si rompe. Cosi i disegni si
   possono aggiungere uno alla volta, senza toccare il codice.
   ============================================================ */
window.slugEsercizio = function(nome) {
  let n = String(nome).replace(EMOJI_TESTA, '');          /* via l emoji */
  n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); /* via gli accenti */
  n = n.toLowerCase().replace(/\([^)]*\)/g, '');          /* via le parentesi */
  return n.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

/* Illustrazioni animate create con Quiver AI, salvate nella cartella
   "esercizi" accanto a index.html. Ogni esercizio che ha il suo disegno
   compare qui; gli altri usano ancora il vecchio percorso img/ e, se il
   file non c e, mostrano il segnaposto. Quando arriva un nuovo disegno
   basta aggiungere una riga. */
const IMMAGINI_ESERCIZI = {
  'Panca Piana Bilanciere': 'esercizi/ex-01-panca-piana.svg',
  'Panca Inclinata Bilanciere': 'esercizi/ex-02-panca-inclinata.svg',
  'Panca Inclinata Manubri': 'esercizi/ex-03-panca-inclinata-manubri.svg',
  'Panca Declinata': 'esercizi/ex-04-panca-declinata.svg',
  'Chest Press Machine': 'esercizi/ex-05-chest-press.svg',
  'Dip alle Parallele': 'esercizi/ex-06-dip-parallele.svg',
  'Piegamenti a Terra (Push-up)': 'esercizi/ex-07-push-up.svg',
  'Croci ai Cavi': 'esercizi/ex-08-croci-cavi.svg',
  'Croci su Panca Manubri': 'esercizi/ex-09-croci-panca-manubri.svg',
  'Pectoral Machine (Butterfly)': 'esercizi/ex-10-pectoral-machine.svg',
  'Pullover con Manubrio': 'esercizi/ex-11-pullover-manubrio.svg',
  'Stacco da Terra (Deadlift)': 'esercizi/ex-12-stacco-da-terra.svg',
  'Trazioni alla Sbarra (Pull-ups)': 'esercizi/ex-13-trazioni-sbarra.svg',
  'Trazioni Presa Inversa (Chin-up)': 'esercizi/ex-14-trazioni-presa-inversa.svg',
  'Lat Machine': 'esercizi/ex-15-lat-machine.svg',
  'Lat Machine Presa Inversa': 'esercizi/ex-16-lat-machine-presa-inversa.svg',
  'Rematore con Bilanciere': 'esercizi/ex-17-rematore-bilanciere.svg',
  'Rematore con Manubrio': 'esercizi/ex-18-rematore-manubrio.svg',
  'T-Bar Row': 'esercizi/ex-19-t-bar-row.svg',
  'Pulley Basso': 'esercizi/ex-20-pulley-basso.svg',
  'Pullover ai Cavi': 'esercizi/ex-21-pullover-ai-cavi.svg',
  'Hyperextension (Lombari)': 'esercizi/ex-22-hyperextension-lombari.svg',
  'Squat con Bilanciere': 'esercizi/ex-23-squat-bilanciere.svg',
  'Front Squat': 'esercizi/ex-24-front-squat.svg',
  'Goblet Squat': 'esercizi/ex-25-goblet-squat.svg'
};
window.immagineEsercizio = function(nome) {
  const pulito = String(nome).replace(EMOJI_TESTA, '');
  if (IMMAGINI_ESERCIZI[pulito]) return IMMAGINI_ESERCIZI[pulito];
  return 'img/' + slugEsercizio(nome) + '.png';
};

/* Il riquadro prova a caricare il disegno; se non esiste torna al segnaposto */
function slotImmagine(nome) {
  const src = immagineEsercizio(nome);
  return '<div class="ex-img-slot" data-exercise="' + escapeHtml(nome) + '">' +
    '<img class="ex-img" src="' + src + '" alt="Esecuzione: ' + escapeHtml(nome.replace(EMOJI_TESTA, '')) + '" ' +
    'loading="lazy" onerror="this.closest(\'.ex-img-slot\').classList.add(\'vuoto\'); this.remove();">' +
    '<span class="ex-img-hint">Immagine in arrivo</span></div>';
}

/* --- La scheda --- */
