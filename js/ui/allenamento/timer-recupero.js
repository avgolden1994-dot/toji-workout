/* Timer di recupero e orologio
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   TIMER DI RECUPERO — pannello flottante con anello (ispirato ad app commerciali)
   ============================================================ */
function updateRecoveryRing() {
  const progress = document.getElementById('recovery-ring-progress');
  const ratio = recoveryTotal > 0 ? Math.max(0, Math.min(1, recoveryRemaining / recoveryTotal)) : 0;
  const offset = RECOVERY_RING_CIRCUMFERENCE * (1 - ratio);
  progress.style.strokeDasharray = `${RECOVERY_RING_CIRCUMFERENCE}`;
  progress.style.strokeDashoffset = `${offset}`;
  document.getElementById('recovery-time-big').innerText = formatMMSS(recoveryRemaining);
}

/* ============================================================
   IL TIMER CONTA SULL OROLOGIO, NON SUGLI SCATTI
   Il difetto: il timer toglieva un secondo a ogni scatto. Quando l app
   va in secondo piano il telefono sospende gli scatti, quindi il conto
   si congelava e ripartiva da dove era rimasto. Ora si fissa l ORARIO
   DI FINE e a ogni controllo si guarda l orologio: minimizzando l app
   il tempo continua a scorrere davvero, e al rientro il conto e giusto.
   ============================================================ */
let recoveryEndAt = 0;          /* istante di fine, in millisecondi */
let recoveryLastShown = null;   /* ultimo secondo mostrato: evita bip doppi */

function secondiRimasti() {
  return Math.max(0, Math.ceil((recoveryEndAt - Date.now()) / 1000));
}

function fineRecupero() {
  clearInterval(recoveryInterval);
  recoveryInterval = null;
  recoveryRemaining = 0;
  updateRecoveryRing();
  document.getElementById('recovery-overlay').classList.remove('ending');
  if (!recoveryMuted && isOn(SOUND_KEY, true)) playEnd();
  if (navigator.vibrate) { try { navigator.vibrate([200, 90, 200]); } catch (e) {} }
  lampeggia(3);
  if (isOn(AUTOCLOSE_KEY, true)) {
    setTimeout(() => { if (!recoveryInterval) closeRecoveryPanel(); }, 1200);
  }
}

function tickRecupero() {
  const r = secondiRimasti();
  if (r === recoveryLastShown) return;       /* stesso secondo: niente da fare */
  const saltati = recoveryLastShown !== null && recoveryLastShown - r > 1;
  recoveryLastShown = r;
  recoveryRemaining = r;
  updateRecoveryRing();

  if (r > 0 && r <= 5) {
    document.getElementById('recovery-overlay').classList.add('ending');
    /* al rientro dal secondo piano non si recuperano i bip persi */
    if (!saltati && !recoveryMuted && isOn(COUNTDOWN_KEY, true)) playTick();
    if (!saltati && navigator.vibrate) { try { navigator.vibrate(40); } catch (e) {} }
  }
  if (r <= 0) fineRecupero();
}

function avviaTickRecupero() {
  clearInterval(recoveryInterval);
  /* controllo frequente: il valore viene dall orologio, non dal conteggio */
  recoveryInterval = setInterval(tickRecupero, 250);
}

/* ============================================================
   PONTE VERSO IL TELEFONO (preparazione per l App Store)
   Quando l app gira dentro Capacitor su iPhone, qui passano le
   funzioni che Safari non ha: notifica di fine recupero anche ad app
   chiusa, vibrazione, timer sulla schermata di blocco, salvataggio in
   Salute. Nel browser ogni funzione ha la sua alternativa web o non
   fa nulla: lo stesso codice vale per entrambi, niente doppioni.
   Il timer sulla schermata di blocco (Live Activity) richiede un
   pezzo scritto in Swift: qui c e gia la chiamata, che si accende
   quando quel pezzo esistera.
   ============================================================ */
