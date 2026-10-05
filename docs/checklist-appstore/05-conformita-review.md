# 05 — Conformità alle Review Guidelines

Piano: [sezione 4](../piano-lancio-appstore.md#4-conformità-alle-review-guidelines). Guidelines: https://developer.apple.com/app-store/review/guidelines/ (numerazione da ricontrollare, consultato 2026-10-05).

## 4.2 / 4.2.2 Minimum Functionality
- [ ] Valore nativo presente e dimostrabile: notifica fine recupero ad app chiusa
- [ ] Live Activity / Dynamic Island per il timer
- [ ] Haptics
- [ ] Audio che convive con Spotify
- [ ] Offline completo
- [ ] Condivisione/export nativi
- [ ] Opzionali: HealthKit, widget, Siri Shortcuts
- [ ] Nota al revisore elenca queste funzioni

## 4.3 Spam
- [ ] Differenziazione scritta (coach a regole, BIA, epoca d'oro, locale, multilingua)

## 2.1 Completezza
- [ ] Coach IA rimosso per intero (D9, 2026-10-05): nessun backend da tenere attivo per la review; il Worker Cloudflare, fuori dal repo, lo disattiva o cancella il proprietario (da verificare dal proprietario)
- [ ] Nessun placeholder, link rotto, schermata vuota offline
- [ ] Mance IAP provabili dal revisore (sandbox)

## 2.3 Metadata
- [ ] Nome max 30 caratteri (2.3.7); nessun marchio altrui nelle keyword
- [ ] Sottotitolo, descrizione, keyword, novità in it/en/es/de
- [ ] Screenshot reali in uso (2.3.3), da 1 a 10, JPG/PNG senza alpha
- [ ] iPhone 6.9" (obbligatorio): risoluzioni da verificare sulla pagina ufficiale (consultato 2026-10-05)
- [ ] 6.5" 1284x2778 solo se mancano i 6.9" (da verificare)
- [ ] iPad: nessuno screenshot (solo iPhone, D8)
- [ ] Icona 1024x1024 senza alpha (da verificare)
- [ ] Età onesta (2.3.6) con il nuovo questionario 4+/9+/13+/16+/18+ (aggiornato entro 31/01/2026, da verificare); WebView e contenuti medici valutati

## 1.4.1 e salute
- [ ] Disclaimer medico in app e in descrizione; nessuna promessa di salute
- [ ] BIA e avvisi di prudenza formulati senza diagnosi

## Licenze, diritti, IP
- [ ] Registro asset: autore, fonte, licenza di ogni file di `esercizi/` e delle icone
- [ ] Asset Quiver.ai: per ciascuno data, prompt e copia dei termini (https://quiver.ai/legal/terms/, sez. 5.2, piano usato; da verificare)
- [ ] YouTube: ricerca generica per i tutorial e IFrame Player API per i link incollati; ToS API YouTube letti; nessun logo YouTube/Spotify presentato come dell'app (da verificare)
- [ ] Schede "epoca d'oro" con nomi di culturisti reali: diritti di nome/immagine (5.2.1) da verificare; solo riferimento descrittivo, niente foto/logo
- [ ] 5.2.5: nessuna imitazione della UI Apple (Activity rings)
- [ ] Nome "3in": libero in ASC, ricerca marchi EUIPO/TMview e USPTO (vedi 01-decisioni D7)

## Pagamenti e altro
- [ ] Tip jar: solo IAP consumabili (3.1.1), nessun link a donazioni esterne dentro l'app (3.1.1(a)); vedi [08](08-monetizzazione.md)
- [ ] Export compliance: `ITSAppUsesNonExemptEncryption=false` (solo HTTPS)
- [ ] DSA trader dichiarato in ASC (con gli IAP l'utente è trader)
- [ ] URL di supporto e privacy compilati
- [ ] 4.8 non applicabile (nessun login); 1.3/5.1.4 non Kids
