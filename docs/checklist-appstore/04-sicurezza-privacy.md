# 04 — Sicurezza e privacy

Piano: [sezione 3](../piano-lancio-appstore.md#3-sicurezza-e-privacy). Limiti già noti: [SICUREZZA.md](../SICUREZZA.md).

## MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05)
- [ ] STORAGE: ispezione del container (Library/Documents), nessun BIA in log/cache/screenshot; decisione su BIA in chiaro (Keychain/cifratura) documentata
- [ ] CRYPTO: nessun algoritmo proprio; `ITSAppUsesNonExemptEncryption=false` se solo HTTPS
- [ ] AUTH: documentato "non applicabile, nessun account"
- [ ] NETWORK: solo HTTPS (ATS), `connect-src` solo Worker; prova con proxy: nessun traffico extra
- [ ] PLATFORM: nessun bridge superfluo, navigazione esterna verso Safari, nessun deep link non validato, WebView debug disattivato in release
- [ ] CODE: `npm audit` senza vulnerabilità alte; Capacitor e plugin aggiornati; nessun codice scaricato
- [ ] CODE: scansione segreti nel repo e nella history
- [ ] RESILIENCE: documentato "bassa priorità"
- [ ] PRIVACY: minimizzazione, trasparenza, controllo utente verificati

## XSS, import e CSP
- [ ] Test con payload XSS in import CSV/JSON (nomi, note, link) e in ogni `innerHTML`
- [ ] Verificare `nomeSicuro`, `jsArg`, `pulisciDeep` su tutti i percorsi di input
- [ ] Piano per togliere `unsafe-inline` da `script-src` (script e handler inline spostati)
- [ ] CSP adattata a `capacitor://localhost`; `connect-src` con Worker Cloudflare; nessuna schermata bloccata
- [ ] pdf.js e worker inclusi localmente (worker senza SRI risolto)

## Servizi esterni
- [ ] YouTube/Spotify: ToS e policy letti; funzionamento in WKWebView (errore 153/referrer, da verificare); caricamento solo dopo click o apertura esterna
- [ ] Google Fonts/cdnjs inclusi localmente in nativo
- [ ] Nessun analytics e nessun SDK terzo (mantenere)

## Permessi
- [ ] Usage strings Info.plist localizzate it/en/es/de solo per i permessi usati (foto progressi, fotocamera se serve, HealthKit solo se previsto)
- [ ] Permessi chiesti al momento d'uso; l'app funziona anche se rifiutati (5.1.1(iii)-(iv))
- [ ] Notifiche non obbligatorie (5.1.2)

## Dati, consenso, cancellazione
- [ ] Pulsante "cancella tutto" (localStorage, IndexedDB, backup nativo, notifiche, Live Activity)
- [ ] Export dati completo, incluso BIA su richiesta
- [ ] Consensi `tz_consenso` e `tz_consenso_ia` presenti in nativo; informativa 4 lingue aggiornata al Coach IA
- [ ] GDPR art. 9: base giuridica (consenso esplicito 9(2)(a)) e ruolo di titolare chiariti con un legale (da verificare)
- [ ] Minori: età minima e testo dichiarati; non Kids Category (1.3, 5.1.4)
- [ ] Nessun dato sanitario in iCloud (5.1.3); backup iCloud del container valutato

## Privacy policy e dichiarazioni
- [ ] Privacy policy pubblica in it/en/es/de, URL in ASC e raggiungibile in app (5.1.1(i))
- [ ] La policy cita Coach IA/AI di terzi, Worker Cloudflare, YouTube/Spotify, conservazione, diritti, contatti (5.1.2)
- [ ] Verificato cosa conserva il Worker (aperto in PIANO.md Fase 4)
- [ ] App Privacy labels compilate e coerenti con i flussi reali (pagina d'aiuto da verificare)
- [ ] `PrivacyInfo.xcprivacy` dell'app: `NSPrivacyTracking=false`, required reason API (UserDefaults CA92.1, ecc.)
- [ ] Verificato se Capacitor e plugin includono già un proprio manifest (da verificare, consultato 2026-10-05)
- [ ] ATT non necessario (nessun tracking) — confermato
- [ ] 1.4.1 e 5.1.3: disclaimer e nessuna promessa medica
