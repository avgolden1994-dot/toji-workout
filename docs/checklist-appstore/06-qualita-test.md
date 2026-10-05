# 06 — Qualità e test

Piano: [sezione 5](../piano-lancio-appstore.md#5-qualità-e-test). Audio: [03-audio.md](03-audio.md).

## Automatici esistenti
- [ ] `npm test` verde
- [ ] `npm run test:browser` verde
- [ ] `npm run controlla` verde (sw + catalogo + indice + test; 25 file in `tests/`)

## Automatici da aggiungere (C)
- [ ] Test WebKit con `playwright webkit`
- [ ] Test del ponte nativo con mock di `window.Capacitor` (notifiche, haptics, Live Activity, fallback)
- [ ] Test di migrazione storage (chiavi `coach_plus_*`, `tz_*`, `_toji` invariate; ripristino da backup)
- [ ] Test dello script `prepara-www.js`
- [ ] XCUITest smoke (avvio, seduta, timer, notifica)

## Matrice dispositivi e condizioni (U)
- [ ] iPhone SE 3a gen (iOS minimo supportato)
- [ ] iPhone 13/15/17 su iOS 26
- [ ] iPad (solo se supportato)
- [ ] Con e senza Spotify/podcast
- [ ] Modalità silenziosa
- [ ] Basso consumo
- [ ] Schermo bloccato / app in background
- [ ] Offline e rete lenta
- [ ] Lingue it, en, es, de
- [ ] Tema chiaro/scuro, Dynamic Type, VoiceOver

## TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)
- [ ] Beta interna (max 100 tester) con almeno 3 dispositivi diversi, 7 giorni
- [ ] Beta esterna (max 10.000) con Beta App Review della prima build (se usata)
- [ ] Ricordare che le build scadono dopo 90 giorni
- [ ] Modulo feedback e lettura dei crash da Xcode Organizer

## Go / No-go
- [ ] Test automatici verdi
- [ ] Checklist audio senza bug bloccanti
- [ ] Zero crash in 7 giorni di beta
- [ ] Nessuna perdita di dati in migrazione
- [ ] Privacy e App Privacy coerenti
- [ ] Asset con licenza verificata; nome/marchio verificato
- [ ] Metadata e screenshot pronti
- [ ] Nota per il revisore pronta
- [ ] Firma finale (U): GO / NO-GO
