# Sito / landing di 3in con lista d'attesa: BOZZA LOCALE

> Stato: **BOZZA, non pubblicata, non deployata.** Nessun form reale collegato, nessun servizio esterno usato. Nulla va online senza l'approvazione esplicita dell'utente su QUESTA pagina, in QUESTA lingua (regola d'oro di `controllo-pubblicazione`). Data: 2026-10-05.

## 1. File

| Percorso | Cosa | Peso |
|---|---|---|
| `index.html` | Pagina italiana (`lang="it"`) | 13,0 KB |
| `en/index.html` | Pagina inglese (`lang="en"`) | 12,6 KB |
| `css/sito.css` | Stile unico per le due lingue (token dell'app) | 12,6 KB |
| `img/{it,en}-seduta.webp` | Schermata della seduta (hero, in cornice neutra) | 35 / 34 KB |
| `img/{it,en}-occupato.webp`, `-cedimento`, `-settimana`, `-coach` | Schermate reali ritagliate per le 4 funzioni | 16-29 KB l'una |
| `img/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Favicon da logo A (si adatta al tema), icona Home da logo B | 0,5 / 0,6 / 7,6 KB |
| `img/og-it.png`, `og-en.png` | Immagini di anteprima social 1200×630 (logo A + tagline) | 87 / 90 KB |
| `anteprime/*.webp` | Screenshot a pagina intera: 360, 390, 1280 px; scuro e chiaro; it e en | ~2 MB (non fanno parte del sito) |

**Peso trasferito per pagina** (HTML + CSS + immagini + favicon): **~155 KB in italiano, ~150 KB in inglese** (le immagini OG si scaricano solo dai social). Cartella del sito senza anteprime: 465 KB. 8 richieste per pagina, tutte locali.

**Anteprima in locale**: dalla cartella `docs/marketing/sito-bozza/` avvia un server statico (es. `npx http-server -p 8124 .`, già installato globalmente come `http-server`) e apri `http://127.0.0.1:8124/` e `/en/`. Aprire i file con `file://` funziona quasi del tutto, ma i link `./` mostrano l'elenco della cartella.

## 2. Scelte di contenuto

- **Hero**: gancio a suspense «Dove finiscono i tuoi allenamenti quando chiudi l'app?» → rivelazione e unica promessa «Restano sul tuo telefono. Scheda, serie, carichi e recupero si salvano lì, senza account.» (en: «Where do your workouts go when you close the app? They stay on your phone…»). Pillola «In arrivo su iPhone», senza data e senza badge Apple.
- **4 funzioni con schermate reali** (web app servita in locale, Chromium di Playwright, dati demo: Upper con panca 4×8 a 60 kg ecc.; nessun dato personale; `serviceWorkers: 'block'`; nessuna richiesta esterna durante la cattura): macchinario occupato, cedimento con timer 90 s, settimana/calendario con trascinamento, coach progressivo a regole (+2,5 kg con il motivo scritto). Ogni immagine dichiara «dati di esempio».
- **Ritagli voluti** (per non mostrare cose da non promuovere):
  - nella schermata Piano è tagliata la scheda «Il tuo coach» (non è chiaro se rimandi al Coach IA: per prudenza fuori);
  - nella schermata del cedimento è tagliato il titolo «CEDIMENTO 90S — MODALITÀ BERSERK» (en «BERSERK MODE»): «Berserk» è anche il titolo di un manga noto; nessuna scritta del genere sul sito. Vedi sez. 8;
  - nella schermata del coach in inglese si vede solo la panca: il terzo esercizio ha una nota non tradotta in app («+5 kg sarebbe un salto del 7%…» dentro il testo inglese). Vedi sez. 8.
- **Coach IA**: assente da testi e immagini (controllato sul testo delle schermate: nessuna «IA/AI»). Si parla solo di «coach a regole», che si attiva col consenso nelle Opzioni (vero: `coachAttivo()` = consenso `si`).
- **BIA**: non citata (scelta: niente claim di salute da gestire sulla landing).
- **Privacy-first**: tre punti (nessun account; dati sul dispositivo; export e cancellazione dalle Opzioni) + riserva scritta in pagina: «Vale per la web app di oggi; lo riconfermeremo sull'app per iPhone prima del lancio. Alcune funzioni facoltative, come la musica da servizi esterni, usano internet solo se le attivi tu.»
- **Prezzi**: nessuno. Unica frase: «Prezzi e condizioni dell'app per iPhone saranno indicati chiaramente prima del lancio.» La web app è detta «gratuita» (vero oggi; mai «gratis per sempre»).
- **Riga «prova Pro di 2 settimane»: NON inserita.** Il controllo non la ammette ora: n. 20 (bloccante) chiede durata, prezzo dopo la prova, rinnovo e condizioni, e vieta di promettere il Pro finché la «Decisione aperta n. 1» (docs non allineati al modello Pro) non è chiusa; la durata di 2 settimane è ancora «da confermare in App Store Connect»; `decisioni-modello-pro.md` sez. 2 chiede «nessun Pro nei testi web». **Rischio se la si aggiunge**: promessa che potrebbe cambiare (1 settimana o 1 mese), contraddizione con la web app tutta gratuita, problemi con 3.1.2 e con le norme UE sulle pratiche commerciali. Testo pronto, da usare solo dopo quelle conferme: «Su iPhone potrai provare le funzioni Pro gratis per [DURATA]; poi [PREZZO]/anno, si rinnova se non annulli. Tutti i dettagli prima del lancio.»
- **Doppia CTA**: «Avvisami per iPhone» (porta al form) e «Prova la web app gratis». Il form sta in un riquadro accanto alla web app.
- **Footer**: informativa sintetica it/en (titolare, dati, finalità, base giuridica art. 6.1.a GDPR, responsabile, durata, diritti, reclamo al Garante, sito senza cookie), «3in è un'app di allenamento, non un dispositivo medico», «iPhone è un marchio di Apple Inc.».

## 3. Segnaposto da compilare (cercali con `grep -n "\[\|\.invalid\|\.example" index.html en/index.html`)

| Segnaposto | Dove | Nota |
|---|---|---|
| `[NOME TITOLARE]`, `[EMAIL CONTATTO]` | informativa it/en | Chi decide e riceve le richieste GDPR |
| `[SERVIZIO LISTA D'ATTESA]`, `[PAESE / GARANZIE PER TRASFERIMENTI FUORI UE]` | informativa | Dipende dall'opzione scelta (sez. 5) |
| `[DURATA MASSIMA]` | informativa | Proposta: 12 mesi o fino al lancio, il primo dei due |
| `[HOSTING]` | informativa | Il servizio che ospiterà la pagina (log tecnici) |
| `https://web-app.invalid/` | 2 link per pagina | URL della PWA; oggi la PWA «non è ancora condivisa con nessuno» (decisione 4) |
| `https://lista-attesa.invalid/iscrizione` | `action` del form | URL di invio del servizio scelto; adeguare i `name` dei campi (`email`, `lingua`, `consenso`) |
| `https://3in.example/` | canonical, hreflang, og:url, og:image | Dominio da decidere |
| `<meta name="robots" content="noindex, nofollow">` | `<head>` | Da togliere solo quando si decide di pubblicare |

## 4. Verifiche fatte (2026-10-05, Chromium di Playwright in `/opt/pw-browsers`)

| Verifica | Esito |
|---|---|
| HTML valido (Nu Html Checker via `html5validator`, vnu locale) | **0 errori, 0 avvisi** su it e en (prima: tolti `media` su `theme-color` e `inputmode`, non riconosciuti dalla versione del validatore). Il CSS dà «errori» solo su proprietà moderne che il validatore non conosce (`color-mix`, `inset`, `text-wrap`, `color-scheme`, gradienti con `var()`); per `color-mix` c'è una dichiarazione di riserva prima |
| Larghezze 360, 390, 1280 px, tema scuro e chiaro, it e en | Nessuno scorrimento orizzontale (`scrollWidth = clientWidth`), nessun elemento fuori schermo, CTA dell'hero visibili senza scorrere (fondo a 506 px su 800 di altezza, 667 su 860 a 1280), immagini tutte caricate, 0 errori in console. Screenshot in `anteprime/` |
| Richieste di rete | **Nessuna richiesta fuori da 127.0.0.1** (verificato su ogni caricamento, con scorrimento per le immagini lazy). Nessun font/CDN/analytics/tracker |
| Cookie | `document.cookie` vuoto; nessuno storage usato (il pulsante tema non salva nulla) |
| Form senza JS | Con JavaScript disattivato: campi `required`, il browser blocca l'invio senza consenso («Please check this box…»); il pulsante tema resta nascosto (`hidden`) |
| Tema | Segue `prefers-color-scheme`; il pulsante passa scuro/chiaro e aggiorna l'etichetta accessibile |
| Contrasto (WCAG, calcolato) | Scuro: testo 18,1:1; secondario 7,4-8,5:1; arancio su fondo 8,4:1; bottone 8,0:1. Chiaro: testo 17,3:1; secondario 5,9-6,6:1; arancio 4,6-5,2:1; bottone 5,2:1. La pillola chiara era 4,2:1: corretta con `#9a3412` |
| Accessibilità | `lang` per pagina e sui link di lingua, `hreflang`, link «Vai al contenuto», `:focus-visible` arancio 3 px, `alt` descrittivi su tutte le schermate, etichette sui campi, `aria-describedby` sulla nota dati, `prefers-reduced-motion` (niente rotazione del telefono) |
| Meta | title, description, canonical, hreflang it/en/x-default, Open Graph + immagine 1200×630, twitter card, favicon SVG/PNG, apple-touch-icon |

## 5. Lista d'attesa: 3 opzioni a costo zero (prezzi e limiti dei piani NON verificati)

Ognuna è un **responsabile del trattamento** (art. 28 GDPR) da nominare nell'informativa; chi gestisce la lista resta il **titolare**. Prima di scegliere: leggere i termini, il DPA (accordo sul trattamento), dove stanno i server e i limiti del piano gratuito, oggi, sul sito del fornitore.

| # | Opzione | Pro | Contro | Rischi privacy |
|---|---|---|---|---|
| A | **Servizio newsletter con piano gratuito e form ospitato** (es. fornitori con sede o server UE: da verificare) | Il form HTML della pagina invia in POST senza JS; doppio opt-in (prova del consenso); link di disiscrizione automatico; conteggio iscritti per il go/no-go; invio dell'email di lancio in un clic; export CSV | Account da creare; limiti del piano gratuito da verificare; il marchio del fornitore può comparire nelle email | Molti attivano di default il tracciamento di aperture e clic (pixel): **va spento** per coerenza con «nessun tracciamento»; possibile trasferimento extra UE; il fornitore vede le email |
| B | **Google Forms** | Zero configurazione, gratuito, foglio con le risposte | Il form non può stare davvero nella pagina: link o iframe verso Google (l'iframe porterebbe richieste e cookie di terzi); nessuna disiscrizione automatica; email di lancio da mandare a mano (in Ccn) | Google come responsabile, trasferimento USA, cookie sul dominio Google: incoerente con il messaggio «privacy-first» |
| C | **`mailto:`** (link che apre l'app di posta con oggetto «Lista d'attesa 3in iPhone» precompilato) | Nessun servizio nuovo, nessun archivio esterno, raccolta minima (l'email stessa è la richiesta e la prova del consenso) | Più attrito (apre l'app di posta, molti abbandonano); conteggio e lista a mano; il form con checkbox non si può usare così (un `action="mailto:"` non è affidabile) | Il fornitore della casella di posta del titolare tratta le email; l'indirizzo di contatto diventa pubblico (spam) |

**Raccomandazione: A**, con un fornitore a server UE, **doppio opt-in attivo e tracciamento di aperture/clic spento**, solo i campi `email` + `lingua` (+ casella di consenso). È il minimo lavoro (copiare l'URL di invio nell'`action` e allineare i nomi dei campi) con la raccolta minima, funziona senza JS e dà i numeri per la soglia dei 150 iscritti. **C come ripiego** se non si vuole aprire nessun account (aggiungere sotto il form un link «oppure scrivici a [EMAIL CONTATTO]»). B sconsigliata per coerenza col messaggio.

Note: (1) se la lista servirà anche per inviti TestFlight, la finalità nell'informativa va allargata prima della raccolta; (2) misurare il canale di provenienza richiederebbe un parametro nell'URL e un campo nascosto popolato da JS: non fatto, per tenere la pagina senza tracciamento (alternativa: una pagina per canale o i codici offerta in App Store); (3) dopo l'invio il servizio mostrerà la sua pagina di conferma: tradurla in it/en.

## 6. Controllo `controllo-pubblicazione` su TUTTI i testi it + en

Contenuto: landing it + en (testi, alt, meta, OG, informativa), canale sito, tipo organico, lista d'attesa. **Pass**: n. 1, 4, 5, 6, 8, 11, 12, 13, 18, 21, 22, 27, 29, 35, 36, 37, 39, 40, 42.

| # | Area | Esito | Gravità | Motivo / correzione |
|---|---|---|---|---|
| 2-3 | BIA | N-A | B | La BIA non è citata né mostrata |
| 7 | Privacy | Pass con riserva | B | «Senza account» e «dati sul telefono» veri nella web app; riserva scritta in pagina; **da riconfermare sulla build iOS v1**. Nella web app esiste il Coach IA facoltativo (invia dati al Worker, col consenso): la pagina dice «si salvano sul telefono» e «funzioni facoltative usano internet solo se le attivi», non «non escono mai». Meglio disattivare il Coach IA anche nella PWA prima di condividerla |
| 9 | Privacy | Pass | B | Nessun assoluto: «nessun cookie/analisi/tracciamento» è vero per questa pagina (verificato); per l'app si dice dove stanno i dati |
| 10 | Privacy | Avviso | B | Informativa con segnaposto; privacy policy dell'app non definitiva: non pubblicare finché non coincidono |
| 14 | Recensioni | N-A | A | Nessuna recensione o testimonianza |
| 15-17 | Collaborazioni | N-A | — | Contenuto organico |
| 19 | Coerenza | Pass con nota | B | Schermate della build web attuale, dati demo dichiarati; rifare le schermate dalla build iOS quando esiste |
| 20 | Prezzo | Pass (voluto) | B | Nessun prezzo né prova Pro; la riga «prova Pro 2 settimane» è esclusa (sez. 2). «Prezzi e condizioni… prima del lancio» non promette nulla |
| 23, 25 | Musica, voce | N-A | B | Nessun audio |
| 26 | Marchi di terzi | Pass con nota | B | Solo la parola «iPhone» con nota di marchio; nessun badge o logo Apple. Nelle schermate compaiono nomi generici di macchine («Chest Press Machine», «Pec Deck»), nessun marchio |
| 24 | Asset | Avviso | B | Logo e immagini OG originali; font di sistema. Le schermate contengono la figura muscolare e le icone dell'app: verificare che siano nel registro asset con licenza |
| 28 | Culturisti | N-A | A | — |
| 30 | Lingua en | Avviso | B | Inglese scritto nativamente, non tradotto parola per parola, ma **da far rivedere** (livello dell'utente da confermare) |
| 31 | Testi legali | Avviso | A | Informativa sintetica scritta da me: **farla verificare** (non è consulenza legale); controllare se servono altri elementi dell'art. 13 GDPR |
| 32 | Piattaforma | N-A | B | Sito proprio; regole dell'hosting da leggere |
| 33 | Reddit | N-A | B | — |
| 34 | Invito all'azione | Avviso | A | Due CTA (richiesta esplicita: web app + lista iPhone); la principale è la lista d'attesa |
| 38 | Sottotitoli | N-A | A | Nessun video |
| 41 | UTM / codici | Avviso | B | Nessun parametro per canale (scelta privacy, sez. 5 nota 2); i link dai social possono usare URL diversi per canale senza tracciare l'utente |
| 43 | Codice | N-A | A | Nessun codice |
| — | «In arrivo su iPhone» | Avviso | A | Vero come piano, senza data: toglierlo se l'uscita slitta molto o se il go/no-go è negativo |

**Verdetto: OK per approvazione come bozza dei testi.** **Non pubblicabile così com'è**: mancano titolare, servizio della lista, URL della web app, dominio/hosting, revisione dell'inglese e dell'informativa, e la riconferma privacy della build iOS. Dopo ogni modifica dei testi il controllo va rifatto.

## 6b. Aggiornamenti dalle decisioni del 2026-10-10 (modificata solo `en/index.html`: riga sul nome nel footer; CSS invariato)

**Nome «3in» (deciso: spiegazione SOLO in inglese)**: si legge «three-in» e richiama «train». Applicata alla sola pagina `en/index.html`, nel footer (riga prima di «3in is a training app, not a medical device.», stesso stile `.fondo`, nessun CSS nuovo): «3in is read “three-in” and echoes “train”, as in training.» Scelta del footer e non dell'hero: l'hero resta sul messaggio privacy; la riga è un tocco leggero. **La pagina italiana NON è stata modificata** (nessuna riga sul nome). Esito `controllo-pubblicazione` sulla riga en: Pass n. 1-6 (nessun claim salute/risultati), 7-11, 18-21 (nome corretto), 35-37 (tono neutro, nessun clickbait); Avviso n. 31: l'inglese e l'omofonia vanno rivisti da madrelingua (utente + Claude, nessun legale); rischio «3 inch» e marchio non verificati. Verdetto: OK per approvazione come bozza; **non pubblicata**, serve approvazione esplicita dell'utente su quel testo in inglese. Ricontrollo Playwright (Chromium, server locale) a 360/390/1280 px, scuro e chiaro: nessuno scorrimento orizzontale, nessun elemento fuori schermo, 0 richieste fuori da localhost, HTML ben formato (controllo di tag e id; validatore W3C non disponibile qui). Rigenerate solo le 5 anteprime `anteprime/en-*.webp`.
Nota: l'omofonia vale per l'inglese; in italiano è meno evidente. Rischio «3 inch» e ricerca marchio non verificati. Dettagli e tagline in `docs/marketing/brand-3in.md` sez. 2 e 8b.

**Lista d'attesa: «facciamo un server in UE» è ambiguo. Due cose diverse:**
| | Server PROPRIO in UE (VPS) | SERVIZIO con data center in UE (newsletter/form) |
|---|---|---|
| Costi | Mensili (non verificati qui) | Piano gratuito possibile (limiti NON verificati) |
| Lavoro | Manutenzione, aggiornamenti, sicurezza, backup, monitoraggio | Quasi nullo: si copia l'URL nell'`action` |
| GDPR | L'utente è titolare **e** gestisce tutto l'impianto (misure di sicurezza, violazioni dei dati, registro) | Titolare resta l'utente; il fornitore è responsabile con DPA, doppia conferma già disponibile |
| Obiettivo «minimo lavoro e spesa zero» | Contrario | Coerente (opzione A di sez. 5, percorso raccomandato) |
**DECISO il 2026-10-10: SERVIZIO con data center in UE** (non un server proprio). Il servizio specifico è ancora da scegliere; piani, prezzi, limiti, sede reale dei server e DPA NON sono verificati: da leggere sul sito del fornitore prima di scegliere e prima di compilare `[SERVIZIO LISTA D'ATTESA]` e `[PAESE / GARANZIE PER TRASFERIMENTI FUORI UE]` nell'informativa.

**Titolare del trattamento (deciso): l'utente stesso, persona fisica.** Restano da compilare `[NOME TITOLARE]`, `[EMAIL CONTATTO]` e `[DURATA MASSIMA]` (proposta 12 mesi o fino al lancio): NON sono stati inventati né presi dal contesto. Attenzione: per una persona fisica **nome ed email diventano pubblici** nell'informativa (e quindi esposti a spam e raccolta automatica). Consiglio: un indirizzo dedicato, non personale (es. una casella nuova solo per 3in). Da valutare, **non verificato**, se serva anche un recapito postale nell'informativa e se il solo indirizzo email basti per una persona fisica: chiedere a una fonte autorevole (Garante Privacy) prima della pubblicazione.

**Revisione inglese e informativa privacy**: la fanno l'utente e Claude insieme, senza legale. **Claude non è un consulente legale.** L'informativa va tenuta minima: solo email + lingua; finalità = avviso di lancio; base giuridica = consenso; cancellazione a richiesta; durata della conservazione **da decidere** (proposta in sez. 3: 12 mesi o fino al lancio). Prima della pubblicazione conviene un controllo da una fonte autorevole (Garante Privacy, modello di informativa): **non verificato qui**.

## 7. Cosa NON ho verificato

- Prezzi, limiti, sede dei server, DPA e tracciamento predefinito dei servizi di newsletter; condizioni di Google Forms.
- Disponibilità di dominio e handle; marchio «3in».
- Comportamento su Safari iOS reale e su lettori di schermo reali (VoiceOver/TalkBack): provato solo Chromium; nessun audit automatico tipo axe.
- Che l'app iPhone avrà le stesse funzioni e la stessa privacy della web app (calendario, coach, cedimento potrebbero essere Pro su iPhone: la pagina non dice che sono gratuite su iPhone).
- Che la PWA, una volta condivisa, sia raggiungibile e senza Coach IA attivo.
- Leggi e linee guida citate nell'informativa: scritte a memoria, non rilette oggi.
- Resa dell'anteprima OG sui social (cache e ritagli di ciascuna piattaforma).

## 8. Decisioni aperte per l'utente

1. **Significato di «3in»**: DECISO il 2026-10-10, spiegazione SOLO in inglese. Riga applicata al footer di `en/index.html`; la pagina italiana resta invariata. Resta da approvare la riga en (sez. 6b).
2. **Handle** social (3in, 3in.app, 3in_app, 3inworkout): li controlla l'utente a mano.
3. **Dominio e hosting** (il dominio lo controlla l'utente a mano; hosting statico gratuito? quale?) → canonical, hreflang, OG, voce «Questo sito» dell'informativa.
4. **Titolare del trattamento**: DECISO, è l'utente (persona fisica). Da compilare: nome, email di contatto (consigliata dedicata, non personale: diventano pubblici), eventuale recapito postale (da valutare, non verificato), durata massima della lista.
5. **Servizio per la lista d'attesa**: DECISO servizio con data center in UE (opzione A, sez. 5, non un server proprio). Da scegliere il servizio specifico, leggendo piani, limiti, sede e DPA (non verificati). Vedi sez. 6b.
6. **Revisione dell'inglese e dell'informativa**: DECISO il 2026-10-10, utente + Claude (nessun legale); controllo su fonte autorevole consigliato prima di pubblicare (sez. 6b).
7. **URL della web app**: si condivide la PWA già ora? Con o senza Coach IA disattivato?
8. Riga **«prova Pro di 2 settimane»**: resta fuori finché ASC e docs non sono allineati?
9. Segnalazioni sull'app (fuori dal perimetro di questo lavoro, nessuna modifica fatta): (a) il titolo del cedimento «MODALITÀ BERSERK / BERSERK MODE» richiama il titolo di un manga, simile al rischio già tolto con «Toji»: valutare un nome neutro; (b) in inglese la nota del coach «+5 kg sarebbe un salto del 7%: …» resta in parte in italiano (stringa mancante nel dizionario `js/lingue/en.js`).

## 9. Come sono state fatte le schermate

Script di servizio (non nel repo, scratchpad della sessione): app servita con `http-server` su 127.0.0.1, contesto Playwright 390×844 a 2x, service worker bloccato, localStorage con modalità, lingua, guida vista e consenso (`no` per seduta/occupato/cedimento/settimana; `si` solo per la schermata del coach, con una seduta demo completata e poi riaperta). Ritagli e conversione in WebP (qualità 78, larghezza 600-640 px) con ImageMagick. Per rifarle sulla build iOS: stessi dati demo, stessi ritagli.
