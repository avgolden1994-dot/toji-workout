# 03 — Audio (tema chiave) e prove manuali

Piano: [2.5](../piano-lancio-appstore.md#25-audio-session-tema-chiave) e [5.4](../piano-lancio-appstore.md#54-checklist-manuali-audio). Nei docs esistenti non c'era una checklist audio (ricerca 2026-10-05): questa è la prima.

## Implementazione (C)
- [ ] Plugin Capacitor custom Swift per `AVAudioSession` (categoria, opzioni, attiva/disattiva)
- [ ] Scelta di prodotto: i bip suonano con interruttore silenzioso? `.playback` (sì) o `.ambient` (no) — Decisione: ______
- [ ] Opzione `.mixWithOthers` attiva: Spotify/podcast non si fermano
- [ ] `.duckOthers` solo per avvisi brevi (cedimento, fine recupero) e rilascio con `.notifyOthersOnDeactivation`
- [ ] Sessione attivata solo quando serve e disattivata dopo il suono
- [ ] Gestione interruzioni (chiamata, Siri, allarme) e cambio rotta (cuffie, Bluetooth)
- [ ] `UIBackgroundModes: audio` solo se giustificato (2.5.4, da verificare, consultato 2026-10-05); altrimenti non inserirlo
- [ ] Rivalutare `audio-silenzioso.js` / `SILENZIO_WAV` in nativo (può tenere occupata la sessione)
- [ ] MP3 utente (IndexedDB `tz_audio_db`) e player YouTube/Spotify provati con la nuova sessione

## Prove manuali su dispositivo (U), con esito e iOS usato
- [ ] Spotify in riproduzione, avvio timer: la musica prosegue, i bip si sentono
- [ ] Podcast in riproduzione: non si interrompe ai bip
- [ ] Cedimento: avviso udibile, musica abbassata (duck) e poi ripristinata
- [ ] Bip di conteggio, tick e suono di fine recupero: volume e latenza accettabili
- [ ] Interruttore silenzioso ON: comportamento coerente con la scelta di prodotto
- [ ] Volume basso e volume alto: nessuna distorsione
- [ ] Schermo bloccato: cosa succede al timer e ai suoni (documentare; notifica locale con suono come alternativa)
- [ ] App in background: notifica di fine recupero ricevuta (app chiusa e app in background)
- [ ] Notifica con Basso consumo e con Focus attivo
- [ ] Cuffie Bluetooth: suoni sulle cuffie, scollegamento non rompe il timer
- [ ] Cuffie cablate / AirPods: cambio rotta gestito
- [ ] Chiamata in arrivo durante il recupero: audio ripreso dopo
- [ ] Siri / altra app audio che parte: nessun blocco dell'app
- [ ] iPhone SE 3a gen (iOS minimo) e iPhone recente (iOS 26)
- [ ] Iframe YouTube/Spotify: avvio, pausa, convivenza con i bip; errore 153/referrer controllato (da verificare)
- [ ] Nessun suono residuo dopo il termine della seduta; la musica dell'utente torna al volume normale
