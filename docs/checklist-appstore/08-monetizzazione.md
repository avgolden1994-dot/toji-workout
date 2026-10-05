# 08 — Monetizzazione e rientro dell'investimento

Piano: [sezione 8](../piano-lancio-appstore.md#8-monetizzazione-e-rientro-dellinvestimento). Responsabile: U (ASC, contratti, fisco), C (codice, testi). Ciò che è incerto: "(da verificare, consultato 2026-10-05)".

## Scelta
- [ ] (U) Opzione di partenza confermata: A gratis + tip jar IAP (consigliata) / B Pro una tantum / C a pagamento
- [ ] (U) Prezzi delle 3 mance (es. 1,99 / 4,99 / 9,99 €)
- [ ] (U) Data di revisione dopo 2-3 mesi: valutare B in base a download, conversione, recensioni

## Regole Apple (da verificare, consultato 2026-10-05)
- [ ] 3.1.1: mance allo sviluppatore solo via IAP consumabili; nulla viene sbloccato
- [ ] 3.1.1(a): nessun link a Ko-fi/PayPal/Buy Me a Coffee dentro l'app (consentiti solo sul sito); UE/DMA da verificare
- [ ] 3.2.1(vi)/3.2.2: non applicabile (nessuna raccolta per cause)

## App Store Connect
- [ ] (U) Contratto "Paid Apps", dati bancari e fiscali, modulo W-8BEN
- [ ] (U) Iscrizione manuale al Small Business Program (commissione 15%)
- [ ] (U) Dichiarazione DSA trader: indirizzo (ammessa casella postale/indirizzo alternativo documentato), telefono, email pubblici
- [ ] (U) 3 prodotti IAP consumabili creati, localizzati in it/en/es/de, inviati in revisione con la build
- [ ] (U) Soglia minima di pagamento e tempi di accredito (circa 30-45 giorni dopo il mese fiscale) letti

## Codice (C, con OK dell'utente)
- [ ] Plugin StoreKit (community o custom Swift; compatibilità Capacitor 8 da verificare), nessun SDK di terzi
- [ ] Schermata "Offrimi un caffè": nulla si sblocca, testo chiaro, nessun link esterno
- [ ] Prove in sandbox (acquisto, annullo, ripristino); la schermata funziona anche offline con messaggio chiaro
- [ ] Note per il revisore: come provare le mance

## Fisco (da verificare con un commercialista prima del primo incasso)
- [ ] (U) Prestazione occasionale oppure attività abituale con partita IVA (forfettario)
- [ ] (U) Fattura ad Apple Distribution International senza IVA italiana (art. 7-ter, reverse charge)
- [ ] (U) Costo del commercialista inserito nel budget

## Budget
- [ ] (U) 99 USD/anno Apple (prezzo locale da verificare)
- [ ] (U) Dominio (facoltativo) e commercialista: costi stimati
- [ ] Obiettivo di rientro: circa 350 € netti = circa 253 mance da 1,99 €, circa 101 da 4,99 €, circa 51 da 9,99 € (IVA 22% scorporata, commissione 15%; indicativo, imposte sul reddito escluse)
