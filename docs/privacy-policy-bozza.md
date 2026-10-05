# Informativa sulla privacy di 3in (BOZZA)

> **BOZZA del 2026-10-05, non ancora pubblicabile.** Servono: la versione in inglese (e nelle altre lingue dell'app), una revisione legale, e la sostituzione dei campi tra parentesi quadre. Descrive un'app solo locale, senza account, analytics né tracciamento, con feedback via email. Aggiornato il 2026-10-05: il Coach IA, che inviava i dati di una seduta a un Worker Cloudflare del titolare, è stato rimosso per intero (decisione del proprietario), quindi l'app non invia più dati dell'utente a server del titolare. Se in futuro tornano un servizio di IA, analytics, un account o un backend, va riscritta. Da ospitare gratis con GitHub Pages (URL stabile; scegliere il nome del repository prima di inserire l'URL in App Store Connect). Piano: [piano-lancio-appstore.md](piano-lancio-appstore.md), sezione 9.

> **Stato reale del codice al 2026-10-05 (verificato con grep su `js/`, `index.html`, `sw.js`).** Contatti di rete rimasti, tutti per funzioni facoltative di terzi: player e script di YouTube e Spotify (sezione 5), pdf.js da cdnjs per importare un PDF (sezione 5), link che l'utente apre nel browser (ricerca e playlist YouTube, evento singolo su Google Calendar: sezione 5). Nessun contatto con server del titolare. Il pulsante "Scrivici" (`mailto:`) e le mance In-App Purchase (sezioni 4 e 5) **non sono ancora nel codice**: la bozza descrive la build iOS prevista (piano 3.7 e 8). Il Worker Cloudflare del vecchio Coach IA sta fuori dal repo: se contiene dati o log di chi aveva attivato il consenso, vanno cancellati o dichiarati (da verificare dal proprietario cosa conserva e per quanto tempo).

**Ultimo aggiornamento:** [DATA]

## 1. Chi siamo
3in è sviluppata da [NOME E COGNOME], [INDIRIZZO O CASELLA POSTALE], email [EMAIL], telefono [TELEFONO, se richiesto dal profilo "trader" UE]. Per le questioni sui dati personali scrivi a [EMAIL].

## 2. In breve
- 3in non ha account e non ti chiede di registrarti.
- I tuoi dati restano sul tuo dispositivo. Non li riceviamo e non li inviamo a server nostri.
- Le funzioni facoltative di terzi (video e musica incorporati, importazione di un PDF, link aperti nel browser: sezione 5) contattano direttamente quei terzi, con le loro regole. Se non le usi, non vengono contattati.
- Non usiamo analytics, pubblicità né strumenti di tracciamento. Non ti seguiamo tra app e siti.

## 3. Dati che l'app conserva sul tuo dispositivo
Programmi, storico degli allenamenti, serie, carichi, note, calendario, impostazioni, file audio (MP3) che scegli tu, foto dei progressi e dati di composizione corporea (peso, altezza, massa grassa e magra, acqua corporea, metabolismo basale e simili, dati sulla salute). Questi dati sono salvati solo nella memoria dell'app sul tuo dispositivo. Le foto e i dati di composizione corporea li inserisci tu, solo se vuoi, e non lasciano il dispositivo.

Se hai usato una versione precedente della web app con il commento sulla seduta (Coach IA, ora rimosso), i commenti già ricevuti restano nei dati salvati sul dispositivo e nei backup che esporti, ma non vengono più mostrati. [da verificare: tenere questa frase solo se la policy copre anche la web app]

Se attivi i backup di sistema del tuo dispositivo (per esempio iCloud), i dati dell'app possono essere inclusi in quei backup secondo le impostazioni e le regole del fornitore del sistema.

## 4. Feedback via email
L'app contiene un pulsante "Scrivici" che apre il programma di posta del tuo dispositivo con un messaggio pronto: l'app non invia nulla da sola. Se scegli di inviarlo, riceviamo il tuo indirizzo email, il tuo nome (se compare) e il testo del messaggio, e gli eventuali allegati. Li usiamo solo per risponderti e migliorare l'app, sulla base del tuo consenso o del nostro interesse legittimo a gestire le richieste. Li conserviamo per [DURATA, es. 12 mesi] e poi li cancelliamo. Per quei dati siamo titolari del trattamento. Non scrivere dati sulla tua salute nel messaggio se non necessario.

## 5. Servizi di terzi facoltativi
- **YouTube e Spotify.** Se incolli un link YouTube o Spotify come musica per il timer, l'app mostra il loro player incorporato. Quando lo usi, YouTube (Google) e Spotify ricevono dati come il tuo indirizzo IP e possono usare cookie o identificativi secondo le loro politiche: https://policies.google.com/privacy e https://www.spotify.com/legal/privacy-policy/ (da verificare). Se non usi questa funzione, non vengono contattati. Gli script dei loro player si caricano solo quando scegli un brano YouTube o Spotify.
- **Video e playlist.** I pulsanti "Cerca un video" e il link alla playlist di tutorial aprono YouTube nel browser o nell'app YouTube (la ricerca contiene il nome dell'esercizio). Da quel momento vale l'informativa di YouTube.
- **Importazione di un referto PDF.** Per leggere un PDF di composizione corporea (o dei progressi) l'app scarica la libreria pdf.js dal servizio cdnjs (Cloudflare) la prima volta che importi un file: cdnjs riceve il tuo indirizzo IP, ma il PDF viene letto sul dispositivo e non viene inviato a nessuno. Nella build iOS la libreria potrà essere inclusa nell'app, e allora non serve alcun contatto (da verificare quando si fa la build: checklist 04).
- **Calendario.** L'esportazione in un file `.ics` avviene sul dispositivo. Il pulsante "Aggiungi solo questo a Google Calendar" apre una pagina di Google Calendar nel browser con titolo, data ed elenco degli esercizi di quell'allenamento nel link: lo fa solo se lo tocchi, e da quel momento vale l'informativa di Google (da verificare se resta nella build iOS).
- **Acquisti (mance).** Se scegli di lasciare una mancia, il pagamento è gestito da Apple tramite In-App Purchase. Non riceviamo i tuoi dati di pagamento; Apple ci fornisce solo rapporti aggregati sulle vendite. Vale l'informativa di Apple.

## 6. Notifiche e permessi
L'app può chiedere il permesso di inviare notifiche locali (per esempio la fine del recupero) e di accedere alle foto o alla fotocamera, solo quando usi la funzione. Le notifiche sono generate sul dispositivo. Puoi rifiutare o revocare i permessi dalle Impostazioni del dispositivo e l'app continuerà a funzionare.

## 7. Cancellare i tuoi dati
Puoi cancellare tutti i dati dell'app dalle impostazioni ("Cancella tutti i dati") oppure disinstallando l'app. Puoi esportare i tuoi dati dall'app (JSON, CSV, calendario). Per le email di feedback, scrivici per chiederne la cancellazione.

## 8. Minori
3in non è pensata per i bambini. Non raccogliamo consapevolmente dati di minori di [ETÀ MINIMA, da decidere in base al questionario di età di App Store Connect]. Se sei un genitore e pensi che un minore ci abbia scritto, contattaci.

## 9. Trasferimenti e sicurezza
Non trasferiamo i dati dell'app perché non li riceviamo: l'app non li invia a nostri server. Le email di feedback sono gestite dal nostro fornitore di posta [FORNITORE], che può trattare i dati fuori dall'UE con garanzie adeguate [da verificare]. I dati nell'app sono protetti dalle protezioni del tuo dispositivo (blocco schermo, cifratura del sistema).

## 10. I tuoi diritti
Se ci scrivi, puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati che abbiamo su di te (le email di feedback), e revocare il consenso in ogni momento. Puoi presentare reclamo all'autorità di controllo: in Italia il Garante per la protezione dei dati personali (https://www.garanteprivacy.it).

## 11. Modifiche
Se cambiamo il modo in cui trattiamo i dati, aggiorniamo questa pagina e la data in alto, e se serve ti avvisiamo nell'app.

## 12. Contatti
[NOME E COGNOME] · [EMAIL] · [INDIRIZZO O CASELLA POSTALE]
