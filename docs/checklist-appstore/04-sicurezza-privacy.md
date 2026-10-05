# 04 — Sicurezza e privacy

Piano: [sezione 3](../piano-lancio-appstore.md#3-sicurezza-e-privacy). Limiti già noti: [SICUREZZA.md](../SICUREZZA.md).

## MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05)
- [ ] STORAGE: ispezione del container (Library/Documents), nessun BIA in log/cache/screenshot; decisione su BIA in chiaro (Keychain/cifratura) documentata
- [ ] CRYPTO: nessun algoritmo proprio; `ITSAppUsesNonExemptEncryption=false` se solo HTTPS
- [ ] AUTH: documentato "non applicabile, nessun account"
- [ ] NETWORK: solo HTTPS (ATS), `connect-src` senza host esterni (Coach IA tolto, D9; aggiornato il 2026-10-05: tolto dal codice e voce del Worker rimossa dalla CSP, resta cdnjs per pdf.js finché non è incluso in locale); prova con proxy: nessun traffico extra verso server del titolare, e traffico verso terzi solo per le funzioni facoltative (YouTube/Spotify, pdf.js, link aperti nel browser)
- [ ] PLATFORM: nessun bridge superfluo, navigazione esterna verso Safari, nessun deep link non validato, WebView debug disattivato in release
- [ ] CODE: `npm audit` senza vulnerabilità alte; Capacitor e plugin aggiornati; nessun codice scaricato
- [ ] CODE: scansione segreti nel repo e nella history
- [ ] RESILIENCE: documentato "bassa priorità"
- [ ] PRIVACY: minimizzazione, trasparenza, controllo utente verificati

## XSS, import e CSP
- [ ] Test con payload XSS in import CSV/JSON (nomi, note, link) e in ogni `innerHTML`
- [ ] Verificare `nomeSicuro`, `jsArg`, `pulisciDeep` su tutti i percorsi di input
- [ ] Piano per togliere `unsafe-inline` da `script-src` (script e handler inline spostati)
- [ ] CSP adattata a `capacitor://localhost`; `connect-src` senza il Worker Cloudflare (D9, fatto il 2026-10-05); nessuna schermata bloccata
- [ ] pdf.js e worker inclusi localmente (worker senza SRI risolto)

## Servizi esterni
- [ ] YouTube/Spotify: ToS e policy letti; funzionamento in WKWebView (errore 153/referrer, da verificare); caricamento solo dopo click o apertura esterna
- [ ] Google Fonts/cdnjs inclusi localmente in nativo
- [ ] Link "Aggiungi solo questo a Google Calendar" (titolo, data ed esercizi nell'URL): tenerlo nella build iOS o toglierlo; se resta, va nella policy (bozza, sezione 5)
- [ ] Nessun analytics e nessun SDK terzo (mantenere)

## Permessi
- [ ] Usage strings Info.plist localizzate it/en/es/de solo per i permessi usati (foto progressi, fotocamera se serve, HealthKit solo se previsto)
- [ ] Permessi chiesti al momento d'uso; l'app funziona anche se rifiutati (5.1.1(iii)-(iv))
- [ ] Notifiche non obbligatorie (5.1.2)

## Dati, consenso, cancellazione
- [ ] Pulsante "cancella tutto" (localStorage, IndexedDB, backup nativo, notifiche, Live Activity)
- [ ] Export dati completo, incluso BIA su richiesta
- [ ] Consenso `tz_consenso` presente in nativo; `tz_consenso_ia` è sparito con il Coach IA (D9, piano 3.7; rimosso il 2026-10-05, le chiavi orfane `tz_consenso_ia`, `tz_device_ia`, `tz_ia_uso` si ripuliscono all'avvio; i commenti già salvati in `commentoIA` restano nei dati, non mostrati)
- [ ] GDPR art. 9: base giuridica (consenso esplicito 9(2)(a)) e ruolo di titolare chiariti con un legale (da verificare)
- [ ] Minori: età minima e testo dichiarati; non Kids Category (1.3, 5.1.4)
- [ ] Nessun dato sanitario in iCloud (5.1.3); backup iCloud del container valutato

## Privacy policy e dichiarazioni
- [ ] Privacy policy pubblica in it/en/es/de, URL in ASC e raggiungibile in app (5.1.1(i))
- [ ] La policy cita email di feedback, YouTube/Spotify facoltativi, pdf.js da cdnjs e link a Google Calendar (finché restano), IAP, conservazione, diritti, contatti; nessun Coach IA (D9); dichiara che il titolare non riceve i dati dell'app
- [ ] Coach IA rimosso per intero il 2026-10-05: voci Worker/consenso IA non applicabili (punti di codice in piano 3.7, ora storico)
- [ ] PUNTO DA VERIFICARE dal proprietario: disattivare o cancellare il Worker Cloudflare del vecchio Coach IA (fuori dal repo) e verificare se ha conservato dati o log da cancellare o dichiarare
- [ ] Bozza [privacy-policy-bozza.md](../privacy-policy-bozza.md) rivista (versione inglese e revisione legale), pubblicata con GitHub Pages (URL stabile; nome repo scelto prima)
- [ ] App Privacy labels compilate e coerenti con i flussi reali; "Data Not Collected" plausibile con dati solo locali + `mailto:` (da verificare, consultato 2026-10-05)
- [ ] PUNTO DA VERIFICARE a mano nel pannello ASC (App Privacy): stato reale al 2026-10-05, nessun dato inviato a server del titolare; contatti con terzi solo per funzioni facoltative (player e script YouTube/Spotify, link a YouTube, pdf.js da cdnjs se non incluso in locale, link a Google Calendar con titolo, data ed esercizi nell'URL). Se e come vadano dichiarati come dati raccolti da terzi dipende dalle regole Apple e dal pannello: non deciso qui
- [ ] `PrivacyInfo.xcprivacy` dell'app: `NSPrivacyTracking=false`, required reason API (UserDefaults CA92.1, ecc.)
- [ ] Verificato se Capacitor e plugin includono già un proprio manifest (da verificare, consultato 2026-10-05)
- [ ] ATT non necessario (nessun tracking) — confermato
- [ ] 1.4.1 e 5.1.3: disclaimer e nessuna promessa medica
