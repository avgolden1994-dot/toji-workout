/* Ponte verso il telefono (Capacitor)
   (3in, parte di core; ordine di caricamento: vedi index.html) */

const NOTIFICA_RECUPERO = 7001;

window.Nativo = {
  attivo() {
    try { return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()); }
    catch (e) { return false; }
  },
  plugin(nome) {
    return this.attivo() && window.Capacitor.Plugins ? window.Capacitor.Plugins[nome] || null : null;
  },

  /* notifica locale: suona anche con l app chiusa o il telefono in tasca */
  async programmaFineRecupero(secondi, testo) {
    const LN = this.plugin('LocalNotifications');
    if (!LN) return false;
    try {
      await LN.cancel({ notifications: [{ id: NOTIFICA_RECUPERO }] });
      await LN.schedule({ notifications: [{
        id: NOTIFICA_RECUPERO, title: window.tr('Recupero finito'), body: testo || window.tr('Tocca a te: prossima serie'),
        schedule: { at: new Date(Date.now() + secondi * 1000), allowWhileIdle: true }
      }] });
      return true;
    } catch (e) { return false; }
  },
  async annullaFineRecupero() {
    const LN = this.plugin('LocalNotifications');
    if (!LN) return false;
    try { await LN.cancel({ notifications: [{ id: NOTIFICA_RECUPERO }] }); return true; } catch (e) { return false; }
  },

  /* timer sulla schermata di blocco: plugin nativo da scrivere in Swift */
  async attivitaRecupero(stato) {
    const LA = this.plugin('RestTimerActivity');
    if (!LA) return false;
    try {
      if (stato) await LA.start(stato); else await LA.end();
      return true;
    } catch (e) { return false; }
  },

  async vibra() {
    const H = this.plugin('Haptics');
    try {
      if (H) { await H.impact({ style: 'HEAVY' }); return true; }
      if (navigator.vibrate) { navigator.vibrate(200); return true; }
    } catch (e) {}
    return false;
  }
};
