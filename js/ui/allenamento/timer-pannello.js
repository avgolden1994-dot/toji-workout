/* Pannello del timer di recupero
   (3in, parte di ui; ordine di caricamento: vedi index.html) */


let recoveryEtichetta = '';
function avvisaTelefonoRecupero() {
  const secondi = Math.max(0, Math.round((recoveryEndAt - Date.now()) / 1000));
  if (!secondi) return;
  const titolo = recoveryEtichetta ? trP('Recupero: %s', trEs(recoveryEtichetta)) : window.tr('Recupero');
  Nativo.programmaFineRecupero(secondi, recoveryEtichetta ? trEs(recoveryEtichetta) + ' \u2014 ' + window.tr('Tocca a te: prossima serie') : window.tr('Tocca a te: prossima serie'));
  Nativo.attivitaRecupero({ fineAlle: recoveryEndAt, titolo: titolo, totale: recoveryTotal });
}

window.openRecoveryPanel = function(label, seconds) {
  if (sedutaPassataAttiva()) return;   /* seduta passata: niente recupero da aspettare */
  preparaAudio();   /* il contesto audio si sblocca dentro questo tocco: i bip arrivano dopo */
  recoveryTotal = Math.max(1, Number(seconds) || 90);
  recoveryEndAt = Date.now() + recoveryTotal * 1000;
  recoveryRemaining = recoveryTotal;
  recoveryLastShown = recoveryTotal;
  recoveryEtichetta = label || '';
  document.getElementById('recovery-title').innerText = label ? `Recupero: ${label}` : 'Recupero';
  document.getElementById('recovery-overlay').classList.add('visible');
  document.getElementById('recovery-overlay').classList.remove('ending');
  updateRecoveryRing();
  avviaTickRecupero();
  aggiornaProssima();
  avvisaTelefonoRecupero();   /* su iPhone: notifica e schermata di blocco */
};

window.closeRecoveryPanel = function() {
  Nativo.annullaFineRecupero();
  Nativo.attivitaRecupero(null);
  clearInterval(recoveryInterval);
  recoveryInterval = null;
  recoveryRemaining = 0;
  recoveryEndAt = 0;
  recoveryLastShown = null;
  updateRecoveryRing();
  const panel = document.getElementById('recovery-overlay');
  panel.classList.remove('visible', 'expanded', 'ending');
  document.getElementById('recovery-expand-btn').innerText = '\u2922';
};

window.adjustRecoveryTimer = function(delta) {
  const panel = document.getElementById('recovery-overlay');
  if (recoveryInterval) {
    /* si sposta l orario di fine, non un contatore */
    recoveryEndAt = Math.max(Date.now(), recoveryEndAt + delta * 1000);
    recoveryLastShown = null;
    tickRecupero();
    avvisaTelefonoRecupero();   /* l orario di fine e cambiato: si riprogramma */
    if (secondiRimasti() > 5) panel.classList.remove('ending');
  } else if (delta > 0 && panel.classList.contains('visible')) {
    /* timer esaurito ma pannello aperto: +10 riparte da 10 secondi */
    preparaAudio();
    recoveryTotal = Math.max(recoveryTotal, delta);
    recoveryEndAt = Date.now() + delta * 1000;
    recoveryLastShown = delta;
    recoveryRemaining = delta;
    updateRecoveryRing();
    avviaTickRecupero();
  }
};

/* Tornando nell app dopo averla minimizzata, i timer si riallineano
   subito all orologio. Se il recupero e finito nel frattempo, il
   segnale di fine arriva adesso. */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  if (recoveryInterval) tickRecupero();
  if (typeof tickCedimento === 'function' && dropInterval) tickCedimento();
});

window.toggleRecoveryMute = function() {
  recoveryMuted = !recoveryMuted;
  localStorage.setItem('tz_recovery_muted', recoveryMuted ? '1' : '0');
  document.getElementById('recovery-mute-btn').innerText = recoveryMuted ? '🔇' : '🔊';
};

window.toggleRecoveryExpand = function() {
  const panel = document.getElementById('recovery-overlay');
  const isExpanded = panel.classList.toggle('expanded');
  document.getElementById('recovery-expand-btn').innerText = isExpanded ? '⤡' : '⤢';
};

window.startManualRecovery = function() {
  openRecoveryPanel('manuale', 90);
};
