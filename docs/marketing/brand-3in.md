# Brand di «3in» — bozza v0 (2026-10-05)

> Stato: **BOZZA**, nulla è pubblicato né approvato. Ogni testo destinato al pubblico passa da `controllo-pubblicazione` e dall'approvazione esplicita dell'utente. Il marchio deriva dalla grafica reale dell'app (CSS, manifest, icona), non da un'identità nuova.
> File collegati: `docs/marketing/brand/logo-A.svg`, `logo-B.svg`, `logo-C.svg`, `anteprima.png`.

## 1. Essenza e promessa

- **Essenza**: lo strumento da palestra che fa il suo lavoro e poi si fa da parte. Sobrio, preciso, tuo.
- **Promessa it**: «La tua scheda, le tue serie, i tuoi dati: tutto sul tuo telefono, senza account.»
- **Promessa en**: «Your plan, your sets, your data: all on your phone, no account.»

## 2. Cosa significa «3in»

Cosa risulta dal repo (verificato con grep):
- «3in» è il nome pubblico deciso il 2026-10-05 (`docs/piano-lancio-appstore.md` D7, `docs/checklist-appstore/01-decisioni.md` D7a) e sostituisce «Toji Workout» per eliminare il rischio legato a un personaggio protetto.
- È già in `manifest.json` (`name`, `short_name`), in `index.html` (`<title>`, `apple-mobile-web-app-title`) e in `js/core/costanti.js:15`.
- **Nessun documento spiega il significato**. Non lo invento: è la domanda aperta n. 1 (sez. 11). Letture possibili da confermare o scartare: «3 in 1» (allenamento, calendario, coach: la `description` del manifest elenca proprio tre cose), «three in» (tre sedute a settimana), pronuncia «trein»/«three-in». Finché non c'è risposta, i contenuti **non spiegano** il nome.

## 3. Pubblico e posizionamento

1. **Chi**: chi si allena in palestra con una scheda e vuole registrare serie, carichi e recupero senza account, cloud o abbonamenti obbligatori.
2. **Contro cosa**: app che chiedono iscrizione, profilo e dati per partire; qui si apre e ci si allena.
3. **Perché crederci**: si mostra, non si dichiara: primo avvio senza login, modalità aereo, macchinario occupato, cedimento con timer, calendario, BIA calcolata sul dispositivo (stima).

## 4. Voce e tono

Una voce sola, quattro registri. Chi parla è un compagno di allenamento competente: frasi brevi, verbi concreti, niente urla.

**Suspense / curiosità** — gancio nei primi 1-2 s, poi la rivelazione mantiene ciò che il gancio promette.
| it | en |
|---|---|
| «La panca è occupata. E adesso?» → macchinario occupato | «Bench is taken. Now what?» → busy-machine swap |
| «Ultima serie. Il timer parte, la canzone pure.» → cedimento | «Last set. The timer starts. So does your song.» → drop set |
| «Dove finiscono i tuoi dati quando chiudi l'app? Da nessuna parte.» | «Where does your data go when you close the app? Nowhere.» |

**Ironico** — sulle abitudini di palestra, mai sulle persone.
| it | en |
|---|---|
| «Il tuo quaderno delle schede non ti ha mai chiesto la password.» | «Your paper log never asked for a password.» |
| «Settimana cambiata? Trascina il giorno. Il calendario si adegua.» | «Week changed? Drag the day. The calendar keeps up.» |
| «Zero account da ricordare. Solo il carico.» | «Zero accounts to remember. Just the weight.» |

**Tecnico** — come funziona, con numeri veri e verificabili.
| it | en |
|---|---|
| «Stesso muscolo bersaglio, altra macchina: l'alternativa è per oggi, la scheda non cambia.» | «Same target muscle, different machine: today only, your plan stays the same.» |
| «Serie, carichi, RPE e recupero restano sul telefono.» | «Sets, weights, RPE and rest stay on your phone.» |
| «La BIA è una stima calcolata sul dispositivo, non una misura medica.» | «BIA is an on-device estimate, not a medical measurement.» |

**Motivazionale** — sobrio, sul processo e sulla costanza.
| it | en |
|---|---|
| «Una seduta alla volta.» | «One session at a time.» |
| «Oggi conta la serie che hai davanti.» | «Today, it's the set in front of you.» |
| «Saltato un giorno? Il calendario non giudica.» | «Missed a day? The calendar doesn't judge.» |

**Mai**: body shaming o confronti tra corpi; prima/dopo come prova; claim medici o diagnosi («misura la salute», «dimagrisci», «garantito», «in X giorni»); clickbait ingannevole; politica, polemiche, tragedie o mode su dieta e corpo; Coach IA; Jujutsu Kaisen/Toji; «migliore app», «gratis per sempre», concorrenti per nome; assoluti sulla privacy non veri nella build.

**Regole di resilienza**: (1) niente meme o audio di tendenza come elemento portante: invecchiano e hanno diritti incerti; (2) ogni contenuto deve restare vero fra 2 anni o dipendere solo da una versione dell'app (che si cita); (3) nessuna data, festività o evento di cronaca nel copy evergreen; (4) temi attuali solo se riguardano l'app, in tono sobrio; (5) la voce non cambia tra canali, cambia solo il formato.

## 5. Identità visiva (derivata dall'app)

**Palette** (token dell'app, `css/base.css`; il marchio usa gli stessi valori nei due temi):
| Ruolo | Scuro | Chiaro | Fonte |
|---|---|---|---|
| Fondo marchio / icona | `#08080a` | — | `manifest.json:9-10`, `index.html:11`, `js/core/costanti.js:15` |
| Sfondo | `#0e0e12` | `#f2f2f7` | `css/base.css:25` / `:75` |
| Card | `#191920` | `#ffffff` | `css/base.css:26` / `:76` |
| Testo | `#f3f3f6` | `#000000` (marchio: `#0e0e12`) | `css/base.css:33` / `:82` |
| Secondario | `#a8a8b6` | `#5c5c63` | `css/base.css:34` / `:83` |
| **Primario (arancio)** | `#fb8b3c` | `#c2410c` | `css/base.css:38` / `:86` |
| Primario profondo | `#c2410c` | `#9a3412` | `css/base.css:39` / `:87` |
| Accento (rosso) | `#f26d6d` | `#c62828` | `css/base.css:41` / `:89` |
| Testo su primario | `#14100c` | `#ffffff` | `css/base.css:42` / `:90` |
| Successo (serie fatta) | `#3ddc84` | `#157f3c` | `css/base.css:50` / `:93` |

Regole: arancio = azione e urgenza (lo dice il commento di `css/base.css:18`); un solo accento per inquadratura; niente nero o bianco puri di sfondo (`css/base.css:12`); contrasti già verificati WCAG nell'app (4.5:1 testo). Il verde solo per «fatto». L'icona attuale (`icon-512.png`: anello arancio e manubrio rosso su `#08080a`) è la fonte della direzione B.

**Tipografia**: il font dell'app è quello di sistema (`css/base.css:160`: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) con numeri tabellari (`css/base.css:161`). Nei contenuti: San Francisco su iPhone / Roboto o Inter come ripiego; titoli pesanti 900 MAIUSCOLO come «OGGI» (`css/oggi-e-lettore.css:86`, 2.4rem, interlinea 1), etichette 900 maiuscolo piccole con spaziatura 0.6px (`:90`), corpo 800. Nessun font a pagamento: niente licenze da registrare.

**Griglia e forme**: scala a 8 px (`css/base.css:149-154`: 4/8/12/16/24/32); raggi 10-12 px per elementi interni, 16 px per le card (`css/oggi-e-lettore.css:78`), 999 px per le pillole (`:87`). Nei formati social: margini multipli di 8 px (es. 64 px su 1080).

**Schermate reali**: protagoniste dei contenuti (formato app + testo, nessun volto). Solo schermate della build corrente, con dati di esempio dichiarati come tali o dati propri dell'utente; nessun dato di terzi; niente mockup di funzioni che non esistono; niente Coach IA. Telefono a schermo pieno o in cornice neutra, mai loghi Apple.

**Video 9:16 (1080×1920)** — safe zone prudente (STIMA, da verificare sulle guide aggiornate delle piattaforme): testo importante entro 120 px in alto, 360-420 px in basso (barra didascalie e pulsanti), 120-140 px a destra (icone like/commenti), 64 px a sinistra. Logo piccolo in alto a sinistra o solo nella chiusura.

**Sottotitoli**: sempre incorporati, nella lingua del video; peso 800, bianco `#f3f3f6` su fascia `#0e0e12` all'85% o contorno; max 2 righe da ~32 caratteri; parola chiave in arancio `#fb8b3c`; dentro la safe zone; mai coprire il dato chiave della schermata.

## 6. Logo: tre direzioni

Tutte e tre sono disegnate a mano in SVG: forme geometriche (tracciati e rettangoli), **nessun font**, nessun asset di terzi. A e C cambiano colore con il tema (`prefers-color-scheme`); B è un distintivo pieno, uguale ovunque. Anteprima a 120/32/16 px su chiaro e scuro: `docs/marketing/brand/anteprima.png`.

- **A «Pieno»** (`logo-A.svg`): wordmark minuscolo, tratto spesso come i titoli 900 dell'app; il punto della «i» è un quadrato arancio, l'unico accento (come un disco del bilanciere). Il più leggibile a 16 px, funziona su qualunque fondo, si anima facilmente (il punto «cade» come un peso).
- **B «Anello»** (`logo-B.svg`): evoluzione dell'icona attuale: fondo `#08080a`, anello arancio, wordmark A bianco, punto rosso `#f26d6d` (il rosso dei dischi del manubrio). Perfetto per foto profilo rotonde e icona; a 16 px la scritta diventa una macchia: lì serve il solo anello o solo A.
- **C «Timer»** (`logo-C.svg`): lettere a segmenti come una cifra di cronometro, «3» arancio: richiama timer di recupero e numeri tabellari. Molto distintivo, ma a 16 px la «n» si legge peggio e lo stile «display digitale» rischia di sembrare datato.

**Raccomandazione**: **A come marchio principale + B come avatar/icona social** (stessa geometria, quindi un sistema unico). Motivi: A è il più leggibile a 16 px, deriva direttamente dal peso tipografico e dall'arancio dell'app, invecchia bene (resilienza); B conserva la continuità con l'icona che gli utenti PWA già vedono. C resta un'opzione per animazioni del timer, non come logo. Nota: l'icona App Store 1024 è prevista con asset Quiver dell'utente (`docs/piano-lancio-appstore.md:122`): decidere se B la sostituisce o la affianca.

## 7. Profili social (BOZZE, non pubblicare)

> **L'handle «3in» NON è verificato** su Instagram, TikTok, YouTube: controllo manuale dell'utente prima di annunciarlo. Alternative: `3in.app`, `3in_app`, `3inworkout` (YouTube: `@3inapp` / `@3inworkout`).

| Canale | Nome profilo | Bio it | Bio en |
|---|---|---|---|
| Instagram | 3in · scheda da palestra / 3in · gym log | «Il tuo allenamento in palestra, senza account. Scheda, serie, carichi e recupero: i dati restano sul tuo telefono. In arrivo su iPhone.» (135 car.) | «Your gym training, no account. Plan, sets, weights and rest: your data stays on your phone. Coming soon to iPhone.» (114 car.) |
| TikTok | 3in | «Allenamento in palestra senza account. Funzioni vere, schermate vere.» | «Gym training, no account. Real features, real screens.» |
| YouTube | 3in | «Brevi video sulle funzioni di 3in: scheda, serie, recupero, macchinario occupato, calendario. Nessun account: i tuoi allenamenti restano sul telefono.» | «Short videos on 3in features: plan, sets, rest, busy machine, calendar. No account: your workouts stay on your phone.» |

**Hashtag base** (pochi, pertinenti, mai di tendenza su corpo/dieta): it `#palestra #schedapalestra #allenamentoinpalestra #diariodiallenamento`; en `#gymlog #workouttracker #strengthtraining #gymtips`; marchio `#3inapp` (verificare che non sia già usato da altri; `#3in` è quasi certamente ambiguo).

## 8. Tagline candidate

| it | en |
|---|---|
| Una seduta alla volta. | One session at a time. |
| La tua scheda. I tuoi dati. Il tuo telefono. | Your plan. Your data. Your phone. |
| Serie, carichi, recupero. Basta. | Sets, weights, rest. That's it. |
| Niente account. Solo allenamento. | No account. Just training. |
| Allenati. Il resto resta qui. | Train. Everything else stays here. |

## 9. Rischi su nome e marchio (da controllare a mano)

- **Marchio**: ricerca «3in» e varianti in UIBM, EUIPO/TMview, USPTO, classi 9 (software), 41 (allenamento), 42 — **non verificabile da qui**; un nome di 3 caratteri con cifra ha alta probabilità di conflitti o di essere debole come marchio. Valutare un consulto.
- **App Store**: nome libero in App Store Connect (i nomi sono unici); variante pronta, es. «3in: Allenamento» / «3in: Gym Log» (≤30 caratteri).
- **Omonimie**: «3in» è anche un'unità di misura («3 inch»), un possibile codice o sigla, e un frammento di «3 in 1»: ricerca e hashtag saranno rumorosi. Controllare domini (3in.app ecc.), app e marchi fitness con nomi simili, pronuncia in en.
- **Asset**: i loghi qui sono originali e senza font; l'icona attuale e quella prevista da Quiver vanno nel registro asset con licenza.

**Non verificato da qui**: disponibilità handle (IG, TikTok, YouTube), domini, marchi registrati, nome in App Store Connect, safe zone ufficiali attuali delle piattaforme, uso di `#3inapp`, data di uscita su iPhone, durata della prova Pro in ASC, revisione madrelingua dell'inglese.

## 10. Checklist `controllo-pubblicazione` applicata a bio e tagline

Contenuto: bio sez. 7 e tagline sez. 8, it+en, organico. Pass: n. 1-5, 8, 12-13, 15, 17-18, 21-22, 23-27, 29, 33, 35-37, 41-42 (nessun claim di salute o risultato, nessun Coach IA, nessun Pro promesso, nessun riferimento a Toji, nessun asset di terzi).

| # | Area | Esito | Gravità | Motivo / correzione |
|---|---|---|---|---|
| 7 | Privacy | Pass con riserva | B | «Senza account» e «dati sul telefono» sono veri nella PWA; da riconfermare sulla build iOS v1 prima di pubblicare |
| 9 | Privacy | Pass | B | Nessun assoluto tipo «zero dati»: si dice dove stanno i dati; se in futuro c'è analytics anche anonimo, rileggere |
| 10 | Privacy | N-A ora | B | App Privacy e privacy policy non ancora definitive: ricontrollare al lancio |
| 19 | Coerenza | Pass | B | Le funzioni citate esistono (macchinario occupato, cedimento, calendario, BIA) |
| 20 | Prezzo | N-A | B | Nessun prezzo né prova Pro nelle bio: voluto finché i docs non sono allineati |
| 3 | BIA | N-A | B | Bio e tagline non parlano di BIA; la frase del pilastro tecnico la chiama stima |
| — | «In arrivo su iPhone» | Avviso | A | Vero come piano, ma senza data: toglierlo se l'uscita slitta molto |
| 30-31 | Lingue | Avviso | A | Inglese da far rivedere (livello dell'utente da confermare) |
| 32 | Piattaforma | Avviso | A | Regole hashtag/bio non rilette oggi sulle piattaforme |
| 34 | Invito all'azione | Avviso | A | Bio senza link finché non c'è lista d'attesa o pagina |
| 38-39 | Accessibilità | N-A | A | Solo testo; per i video valgono le regole di sez. 5 |
| 11, 14, 16, 28, 40, 43 | Varie | N-A | — | Nessuna lista d'attesa, recensione, collaborazione, nome di culturista, immagine o codice |

**Verdetto: OK per approvazione come bozza**, con le riserve 7 e «In arrivo su iPhone». Non pubblicare finché l'utente non approva esplicitamente QUEL testo in QUELLA lingua e gli handle non sono verificati.

## 11. Domande aperte per l'utente

1. Cosa significa «3in» (o come si pronuncia)? Va spiegato nei contenuti o resta un nome e basta?
2. Logo: approvi A + B (avatar) come proposto, oppure preferisci C o una variante?
3. L'icona App Store sarà B (stessa geometria del marchio) o l'asset Quiver previsto? Il marchio deve adattarsi all'icona o viceversa?
4. Quale handle hai trovato libero (3in, 3in.app, 3in_app, 3inworkout) e su quali piattaforme?
5. «In arrivo su iPhone» va bene nelle bio, o preferisci non citare la piattaforma finché non c'è una data?
6. Chi rivede l'inglese prima della pubblicazione?
