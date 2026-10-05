# 02 — Tecnica iOS

Piano: [sezione 2](../piano-lancio-appstore.md#2-preparazione-tecnica-ios). Audio: vedi [03-audio.md](03-audio.md).

## Progetto e build
- [ ] (U) Mac con Xcode 26 e SDK iOS 26 (obbligatori dal 28/04/2026; da verificare, consultato 2026-10-05)
- [ ] (C) `capacitor.config.ts` (appId, appName, webDir `www`) e `npx cap add ios` (Capacitor 8; versione 8.x esatta e plugin compatibili da verificare)
- [ ] (C) Deployment target iOS 15 (o superiore, deciso); gestione dipendenze con SPM
- [ ] (C) `tools/prepara-www.js`: copia statica in `www/`, esclude tests/docs/node_modules, con test
- [ ] (C) `npm run controlla` verde prima di ogni `npx cap sync ios`
- [ ] (U) Team, firma automatica, bundle id registrato, certificati e provisioning
- [ ] (U) Archive e upload su App Store Connect; build su TestFlight interno
- [ ] (C) Versione e build number: regola scritta (CFBundleShortVersionString / CFBundleVersion)

## Offline e service worker
- [ ] (C) In nativo non registrare/ignorare `sw.js` (SW non affidabile in WKWebView salvo App-Bound Domains; da verificare)
- [ ] (C) Tutte le risorse nel bundle (font, pdf.js e worker, icone, esercizi): nessuna richiesta a CDN
- [ ] (C) Nessun aggiornamento di contenuti/codice scaricato: solo nuova build (2.5.2)
- [ ] (U) Prova in modalità aereo: ogni schermata si apre, Coach IA degrada con messaggio chiaro

## Funzioni native
- [ ] (C) Haptics: percorso nativo `@capacitor/haptics` provato su iPhone; fallback vibrate non rompe
- [ ] (C) Notifiche locali id 7001: permesso, programmazione, annullo; app chiusa; Basso consumo; Focus
- [ ] (C) Schermo acceso: Wake Lock in WKWebView verificato (iOS 15 e 26); altrimenti `@capacitor-community/keep-awake`
- [ ] (C) Plugin `RestTimerActivity` (Swift) + Widget Extension + `NSSupportsLiveActivities`; prova su dispositivo reale
- [ ] (C) Share/Filesystem per export JSON/CSV/ICS e import file
- [ ] (C) `@capacitor/status-bar` e splash coerenti con #08080a e dark mode

## Storage
- [ ] (C) Backup dei dati critici su Preferences/Filesystem; ripristino all'avvio se localStorage vuoto
- [ ] (C) Chiavi `coach_plus_*`, `tz_*` e suffisso `_toji` NON rinominate (test)
- [ ] (C) Test di migrazione e di eviction; i consensi NON vengono ripristinati dal backup (comportamento voluto)
- [ ] (U) Prova su dispositivo: aggiornamento da una build all'altra senza perdita dati

## Aspetto e accessibilità
- [ ] (U+C) Safe area con Dynamic Island e home indicator
- [ ] (U+C) Dark mode e status bar
- [ ] (U+C) VoiceOver e Dynamic Type sulle schermate principali
- [ ] (C) iPad: escluso dal target oppure layout adattato (secondo D8)
- [ ] (C) Icona 1024x1024 senza alpha (da verificare) e launch screen
- [ ] (U) Avvio a freddo accettabile su iPhone SE 3a gen
