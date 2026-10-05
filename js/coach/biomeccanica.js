/* Biomeccanica del coach
   (3in, parte di coach; ordine di caricamento: vedi index.html) */

/* ============================================================
   BIOMECCANICA DEL COACH (ricerca 28/09: Menno, Beardsley, Schoenfeld,
   Wulf, McGill, Horschig, Lehman, Prilepin, ACSM)
   - respirazione: niente apnea con pressione alta / modalita prudente
   - suggerimenti esterni sui fondamentali, sul muscolo negli isolamenti
   - cedimento solo dove e stabile (macchine, cavi, isolamenti)
   - test fai-da-te: caviglia, spalle, larghezza dello squat
   - dolore: si modifica prima di escludere (scale per zona)
   - copertura per regioni: femorali, retto femorale, bicipite, deltoide laterale
   ============================================================ */
const CUE_SCHEMA = {
  squat: 'Spingi via il pavimento con tutto il piede.',
  hinge: 'Fianchi indietro come per chiudere una porta, poi spingili avanti.',
  spintaO: 'Allontana il peso da te, come per spingere via la panca.',
  spintaV: 'Spingi il peso verso il soffitto e passa con la testa sotto.',
  tirataO: 'Porta i gomiti verso i fianchi.',
  tirataV: 'Porta i gomiti verso le tasche.'
};
function cueEsercizio(nome) {
  const sch = schemaDi(nome);
  const m = findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '') || {};
  const righe = [];
  if (sch && CUE_SCHEMA[sch] && m.type === 'compound') righe.push(CUE_SCHEMA[sch]);
  else if (m.group !== 'core') righe.push('Senti il muscolo che lavora: discesa in 2–3 secondi.');
  righe.push('Stessa ampiezza a ogni seduta: così i carichi sono confrontabili.');
  const t = ((getProfile() || {}).test) || {};
  if (sch === 'squat' && t.stance) righe.push('<span>La tua posizione:</span> <span>' + ({ stretta: 'piedi alla larghezza delle anche', media: 'piedi alla larghezza delle spalle', larga: 'piedi più larghi delle spalle, punte aperte' })[t.stance] + '</span>.');
  if (sch === 'squat' && t.caviglia === 'no') righe.push('Caviglia rigida: talloni su due dischi sottili.');
  return righe;
}
/* REC-06 parte a (B31): niente apnea con PAR-Q positivo e, come nel resto del coach (cauto = PAR-Q o 65 anni e oltre),
   anche per chi ha 65 anni o piu. La parte b (pressione alta dichiarata) e bloccata: non c e nessun campo nuovo. */
function respiroPer(tipo) {
  const p = getProfile() || {};
  if (tipo === 'compound' && (p.parq || Number(p.age) >= 65)) return 'Non trattenere il fiato: espira mentre sollevi, inspira in discesa. Carichi moderati, 8–12 ripetizioni.';
  return RESPIRO[tipo];
}
/* cedimento solo su varianti stabili: pesi liberi multiarticolari almeno 1 RIR */
function stabile(nome) {
  const m = findExercise(nome) || findExercise(nomeInLibreria(senzaEmoji(nome)) || '') || {};
  return m.type !== 'compound' || attrezzoDi(senzaEmoji(nome)) === 'macchine';
}
/* test fai-da-te (Horschig, Movement Fix) */
/* Ogni prova dice: cosa fare passo per passo, come leggere il risultato e a che serve al coach.
   Ogni frase e un blocco a se: cosi la traduzione la trova intera. */
function htmlProva(p) {
  const riga = (x) => Array.isArray(x) ? '<li><b>' + x[0] + '</b> <span>' + x[1] + '</span></li>' : '<li><span>' + x + '</span></li>';
  return '<div class="test-d"><div class="test-lbl">Come si fa</div><ol class="test-steps">' + p.passi.map(riga).join('') + '</ol>' +
    (p.esiti ? '<div class="test-lbl">Risultato</div><ul class="test-esiti">' + p.esiti.map(riga).join('') + '</ul>' : '') +
    (p.nota ? '<div class="test-nota">' + p.nota + '</div>' : '') +
    '<div class="test-uso"><b>A cosa serve</b> <span>' + p.uso + '</span></div></div>';
}
const TEST_FAI_DA_TE = [
  { k: 'caviglia', q: 'Caviglia: ginocchio al muro',
    d: htmlProva({
      passi: ['Mettiti di fronte a un muro, scalzo o con scarpe basse.',
        'Metti un piede con la punta (l’alluce) a 12 cm dal muro: misurali con un righello. L’altro piede resta indietro, per stare in equilibrio.',
        'Tieni il tallone appoggiato a terra e porta il ginocchio in avanti, verso il muro, sopra le dita del piede (non verso l’interno).',
        'Ripeti con l’altra gamba.'],
      esiti: [['Tocca', 'Con tutte e due le gambe il ginocchio sfiora il muro e il tallone non si alza.'],
        ['Non tocca', 'Da almeno un lato il tallone si stacca o il ginocchio non arriva al muro.']],
      nota: 'Se senti dolore, fermati e scegli «Non tocca».',
      uso: 'Se non tocca, il coach preferisce squat più guidati (hack squat, leg press) e ti consiglia i talloni rialzati.' }),
    o: [['ok', 'Tocca'], ['no', 'Non tocca']] },
  { k: 'spalle', q: 'Spalle: braccia al muro',
    d: htmlProva({
      passi: ['Mettiti con la schiena al muro, con i piedi a circa 10 cm dal muro. Appoggia glutei, parte alta della schiena e testa.',
        'Spingi piano la parte bassa della schiena contro il muro (pancia leggermente in dentro) e tienila così per tutto il movimento.',
        'Con i gomiti dritti e i pollici verso dietro, porta le braccia in alto, sopra la testa, cercando di toccare il muro con il dorso delle mani.'],
      esiti: [['Sì', 'Le braccia arrivano in alto e toccano il muro senza che la schiena si inarchi.'],
        ['No', 'Per salire devi inarcare la schiena o staccare le braccia dal muro.']],
      nota: 'Non forzare: se una spalla pizzica, fermati e scegli «No».',
      uso: 'Se «No», il coach evita le spinte sopra la testa più impegnative (military press, lento avanti, Arnold) e preferisce il landmine press.' }),
    o: [['ok', 'Sì, ci riesco'], ['no', 'No, non ci riesco']] },
  { k: 'stance', q: 'Squat: la tua larghezza',
    d: htmlProva({
      passi: ['A corpo libero, senza pesi, fai 3-5 squat per ognuna delle tre larghezze:',
        ['Stretta', 'Piedi alla larghezza delle anche, punte quasi dritte.'],
        ['Media', 'Piedi alla larghezza delle spalle, punte un po’ aperte.'],
        ['Larga', 'Piedi più larghi delle spalle, punte aperte di circa 30°.'],
        'Scegli quella in cui scendi più in basso, con i talloni a terra e senza fastidi a ginocchia e anche.'],
      uso: 'Il coach te la ricorda quando fai lo squat.' }),
    o: [['stretta', 'Stretta'], ['media', 'Media'], ['larga', 'Larga']] }
];
window.setTest = function(k, v) {
  const p = getProfile() || {};
  p.test = p.test || {};
  p.test[k] = p.test[k] === v ? null : v;
  localStorage.setItem(PROFILE_KEY(), JSON.stringify(p));
  renderSetPage();
};
function htmlTestFaiDaTe(t) {
  t = t || {};
  return TEST_FAI_DA_TE.map(x => '<div class="aw-sec">' + x.q + '</div><div class="pref-note">' + x.d + '</div>' +
    '<div class="aw-groups">' + x.o.map(([v, n]) => chipCoach(t[x.k] === v, "setTest('" + x.k + "','" + v + "')", n)).join('') + '</div>').join('');
}
/* punteggio biomeccanico di un candidato in un posto della ricetta */
function bonusBiomecc(x, slot, test, fastidi) {
  const n = senzaEmoji(x.name);
  let v = 0;
  test = test || {}; fastidi = fastidi || [];
  if (slot === 'squat' && test.caviglia === 'no') { if (/hack|leg press|pendulum|goblet|multipower/i.test(n)) v += 2; if (/squat con bilanciere|front squat/i.test(n)) v -= 2; }
  if (slot === 'spintaV' && (test.spalle === 'no' || fastidi.indexOf('spalle') !== -1)) { if (/landmine/i.test(n)) v += 3; if (/military|lento avanti|arnold/i.test(n)) v -= 3; }
  if (slot === 'spintaO' && fastidi.indexOf('spalle') !== -1) { if (/manubri|chest press|presa stretta/i.test(n)) v += 1.5; }
  /* croci: cavi e manubri alla pari (D-P8, B32): il +0,5 dei cavi (tensione su tutto il ROM, Menno) contraddiceva il +1,5 dei manubri
     (allungamento, RIC-03). Tra le croci decide l ordine di PRIORI, non un punteggio che l altra regola smentisce. */
  if (slot === 'isoPolp' && /in piedi/i.test(n)) v += 1;  /* in piedi: gastrocnemio cresce il doppio (Kinoshita 2023) */
  return v;
}
/* scale di modifica per zona (Lehman: calma, poi ricostruisci) */
const SCALE_DOLORE = {
  spalle: 'Spalle: spinte con presa stretta o manubri a presa neutra, ampiezza senza dolore. Si torna al pieno quando il fastidio cala.',
  ginocchia: 'Ginocchia: prima delle gambe leg extension isometrica 5 × 45 s (dolore fino a 3/10), discesa in 3–4 s, profondità senza dolore.',
  schiena: 'Schiena bassa: riscaldamento McGill (curl-up, plank laterale, bird dog), tenute di 8-6-4 secondi.'
};
