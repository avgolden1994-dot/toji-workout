# Roadmap delle skill di marketing per «3in»

Stato: ordine DECISO il 2026-10-05 (l'utente ha delegato: «procedi come preferisci»). Oltre alla base, `controllo-pubblicazione` è in creazione; le altre non sono ancora scritte. Ogni pubblicazione richiede comunque approvazione esplicita dell'utente.

Ordine deciso: 1 `controllo-pubblicazione` (in creazione ora), 2 brand + sito/lista d'attesa, 3 `video-brevi-3in`, 4 calendario + copy it/en, 5 gestione social, 6 report metriche, 7 ASO + offer code prima del TestFlight pubblico.

Contesto: PWA di allenamento privacy-first, senza account, 4 lingue (it/en/es/de), in arrivo su App Store iPhone. Nessun pubblico oggi, zero pubblicità a pagamento, mai pubblicare senza approvazione esplicita dell'utente.

## 0. Base: `metodologia-pubblicitaria` (già fatta)

Strategia, soglie go/no-go e linee etiche. Tutte le skill sotto la citano e non la duplicano. Non si riapre qui.

## Convenzioni comuni

- Effort: S = meno di mezza giornata, M = 1-2 giornate, L = 3+ giornate (lavoro dell'agente più revisione umana).
- Ogni skill è sottile: orchestra skill e strumenti già disponibili invece di duplicarli.
- «Automatizzabile» = bozze, file, render, calcoli. «Approvazione» = tutto ciò che esce dal repo o tocca account esterni.

## 1. `controllo-pubblicazione` (anticipare)

- **Scopo**: checklist etica e di conformità eseguita su ogni contenuto prima di proporlo per la pubblicazione.
- **Input**: testo, immagini/video, canale, lingua, eventuali codici o prezzi citati.
- **Output**: esito per voce (ok / da correggere / bloccato) con motivo e correzione suggerita.
- **Automatizzabile**: scansione di claim medici o di risultati garantiti, riferimenti al Coach IA (vietati nella v1), promesse di gratuità incoerenti con i prezzi, dati personali in schermate, diritti musica/immagini dichiarati, lingue mancanti, linee della metodologia.
- **Approvazione umana**: sempre, per l'esito finale. La skill non pubblica e non assolve: segnala.
- **Dipendenze**: `metodologia-pubblicitaria`; nessun account.
- **Effort**: S.
- **Perché prima**: costa poco e le skill successive la usano come ultimo passo, evitando di rifare tutto dopo.

## 2. `sito-lista-attesa` (brand, handle, landing)

- **Scopo**: identità visiva minima, landing in 4 lingue e lista d'attesa.
- **Input**: nome/handle scelti, tono del marchio, schermate reali, testi base.
- **Output**: cartella sito statico (es. `docs/` o repo dedicato) pronta per GitHub Pages; kit identità (logo, palette, font); testo informativa privacy.
- **Automatizzabile**: generazione del sito, selettore lingua, pagine legali in bozza, controllo accessibilità e performance, prova locale con Playwright.
- **Approvazione umana**: scelta del nome/handle e dell'identità, testi legali (revisione), configurazione del servizio email, dominio, pubblicazione e ogni deploy.
- **Raccolta email GDPR-safe**: modulo con consenso esplicito e non preselezionato, finalità unica, doppio opt-in, cancellazione con un clic, nessun analytics invasivo né cookie di tracciamento, fornitore UE con accordo di trattamento dati. Contatore iscritti letto solo in forma aggregata.
- **Dipendenze**: skill di design già disponibili: `brandkit` (identità), `design-taste-frontend` e `high-end-visual-design` (direzione), `minimalist-ui` (stile sobrio), `imagegen-frontend-web` e `image-to-code` (riferimenti visivi e implementazione); `controllo-pubblicazione`. Account: GitHub (Pages), servizio email, eventuale dominio.
- **Effort**: L.
- **Perché qui**: la lista d'attesa è l'unico asset di pubblico posseduto, quindi inizia presto a raccogliere.

## 3. `video-brevi-3in` (skill di progetto sottile)

- **Scopo**: produrre video verticali 9:16 riusabili su Instagram Reels, TikTok e YouTube Shorts.
- **Input**: serie di contenuti (pilastro, idea, durata), lingua, schermate dell'app, scelta volto sì/no.
- **Output**: file MP4 per lingua, sottotitoli (it/en/es/de), copertina, bozza didascalia.
- **Cosa orchestra, senza duplicare**: `hyperframes` (entry point obbligatorio), `product-launch-video` (promo/demo da URL o brief), `motion-graphics` (titoli, stat, overlay), `faceless-explainer` (spiegoni senza volto), `talking-head-recut` ed `embedded-captions` (se compare l'utente), `general-video`, `music-to-video`, `media-use` (musica, SFX, TTS, immagini), `hyperframes-audio`, `hyperframes-cli`, `hyperframes-registry`, `hyperframes-studio`, `hyperframes-core/creative/animation/keyframes`, `figma`, `anthropic-skills:brag`.
- **Cosa aggiunge la skill**: formato 9:16 con zone sicure, template per serie, sottotitoli nelle 4 lingue, schermate reali, nessun claim medico, controllo diritti della musica, passaggio finale da `controllo-pubblicazione`.
- **Catturare le schermate**: browser Playwright preinstallato con l'app servita in locale, viewport da iPhone, dati dimostrativi finti (mai dati reali dell'utente). Da concordare: quali schermate e quale stato dell'app mostrare.
- **Automatizzabile**: l'intero render (locale o con CLI HyperFrames), le varianti linguistiche, i sottotitoli.
- **Approvazione umana**: anteprima del video, musica e voce (diritti e licenze), apparizione del volto, pubblicazione (mai automatica).
- **Dipendenze**: sito/brand (palette e font), skill HyperFrames, Playwright, `controllo-pubblicazione`.
- **Effort**: M.
- **Perché qui**: i video sono la materia prima per tutti i canali successivi.

## 4. `calendario-contenuti-4lingue`

- **Scopo**: pilastri di contenuto, calendario e copy nelle 4 lingue.
- **Input**: ore/settimana disponibili, lingue iniziali, glossario di marca, asset prodotti.
- **Output**: calendario (pilastro, formato, canale, data, lingua), copy per lingua, glossario di marca.
- **Cadenza**: derivata dalle ore settimanali (indicativa: 3 ore = 2 contenuti, 6 ore = 3-4, 10 ore = 5 più community). Meglio meno e costante.
- **Adattamento culturale**: non traduzione letterale; esempi, ritmo e tono adattati al mercato; revisione di madrelingua per en/es/de quando possibile, altrimenti segnalare «non rivisto».
- **Automatizzabile**: pianificazione, bozze, glossario, esportazione con `anthropic-skills:xlsx`, `anthropic-skills:docs`, `anthropic-skills:google-workspace`, Google Calendar e Drive MCP.
- **Approvazione umana**: ogni scrittura su Drive/Calendar, ogni copy prima dell'uso, la revisione madrelingua.
- **Dipendenze**: `metodologia-pubblicitaria`, `controllo-pubblicazione`, `video-brevi-3in`.
- **Effort**: M.
- **Perché qui**: dà ritmo e regge Instagram/TikTok, ma serve prima il materiale da pianificare.

## 5. `gestione-social`

- **Scopo**: profilo Instagram (bio, highlights, griglia), Reels e stories; TikTok e YouTube Shorts con lo stesso video verticale.
- **Input**: calendario approvato, video, handle, tono.
- **Output**: bozze di bio e highlights, piano di griglia, didascalie e hashtag per lingua, checklist di pubblicazione per piattaforma.
- **Automatizzabile**: bozze, anteprima della griglia, adattamento didascalie per piattaforma, promemoria.
- **Approvazione umana**: ogni pubblicazione e ogni cambio al profilo; pubblica l'utente (o un invio programmato da lui approvato post per post).
- **Vietato**: bot di follow/commenti, acquisto di follower o engagement, account falsi o multipli ingannevoli, scraping non consentito, qualunque violazione delle regole di piattaforma.
- **Dipendenze**: `calendario-contenuti-4lingue`, `video-brevi-3in`, `controllo-pubblicazione`; account social dell'utente.
- **Effort**: M.
- **Perché qui**: segue contenuti e calendario; se prima, il profilo resta vuoto.

## 6. `report-metriche`

- **Scopo**: report settimanale/mensile con confronto con le soglie go/no-go della metodologia.
- **Input**: numeri inseriti a mano o export di App Store Connect: iscritti lista d'attesa, uso PWA, D7, TestFlight, download, conversione, riscatti codici, per canale.
- **Output**: tabella e grafici (skill `dataviz`) con verdetto per soglia; promemoria.
- **Automatizzabile**: calcoli, grafici, report; pianificazione ricorrente con routine/cron e promemoria.
- **Approvazione umana**: inserimento o conferma dei dati, interpretazione, condivisione del report all'esterno.
- **Privacy**: solo fonti anonime e aggregate; mai dati personali (email, nomi, id dispositivo) nei report.
- **Dipendenze**: `metodologia-pubblicitaria`, `dataviz`; opzionale `offer-code-prezzi` per i riscatti.
- **Effort**: S-M.
- **Perché qui**: ha senso quando esistono canali attivi da misurare.

## 7. `aso-metadati-store`

- **Scopo**: metadati App Store ottimizzati per it/en/es/de.
- **Input**: funzioni reali dell'app, ricerca parole chiave, screenshot, `docs/checklist-appstore/`.
- **Output**: titolo (30 car.), sottotitolo, campo parole chiave (100 car.), descrizione, testi screenshot, anteprima video, per lingua; tabella di controllo dei limiti.
- **Regole**: privacy «Data Not Collected» solo se davvero non c'è analytics; nessun claim medico; nessun riferimento al Coach IA nella v1.
- **Metodo**: ricerca parole chiave, iterazioni; test A/B tramite product page optimization e custom product pages (verificare disponibilità e requisiti prima di promettere).
- **Automatizzabile**: bozze, conteggio caratteri, screenshot da Playwright, confronto con la checklist.
- **Approvazione umana**: ogni testo e inserimento in App Store Connect; dichiarazioni di privacy; invio in revisione.
- **Dipendenze**: `video-brevi-3in` (anteprima), `controllo-pubblicazione`, `docs/checklist-appstore/`; account Apple Developer.
- **Effort**: M.
- **Perché prima del TestFlight pubblico**: i metadati e le dichiarazioni vanno pronti prima di accogliere utenti esterni.

## 8. `offer-code-prezzi`

- **Scopo**: piano dei codici promozionali per canale, tracciamento riscatti, tabella prezzi per fascia di pubblico.
- **Input**: modello di prezzo deciso, canali, quantità, scadenze.
- **Output**: piano codici (canale, quantità, scopo, scadenza), registro riscatti aggregato, tabella prezzi aggiornabile.
- **Automatizzabile**: pianificazione, registro, calcoli, aggiornamento tabella.
- **Approvazione umana**: inserimento in App Store Connect (resta manuale); i codici non si pubblicano mai senza approvazione; ogni cambio di prezzo.
- **Dipendenze**: decisione sul modello di prezzo (vedi sotto), `report-metriche`, `controllo-pubblicazione`.
- **Effort**: S.
- **Perché qui**: dopo il modello di prezzo e prima del TestFlight pubblico.

## 9. Extra opzionali

| Extra | Scopo | Approvazione | Effort | Note |
|---|---|---|---|---|
| `community-risposte` | Bozze di risposta a commenti/DM | Ogni risposta (mai automatiche) | S | Solo dopo avere un pubblico |
| `outreach-palestre-pt` | Bozze di email a palestre e personal trainer | Ogni invio, uno per uno | M | Rispettare consenso e antispam; niente invii di massa |
| `press-kit` | Descrizione, loghi, screenshot, fact sheet in 4 lingue | Pubblicazione/invio | S | Riusa brand e ASO |
| `controllo-pubblicazione` | Vedi sezione 1 | | | Proposta: anticiparla |

## Tabella riassuntiva

| Skill | Priorità | Effort | Dipendenze | Automatizza | Sempre approvazione |
|---|---|---|---|---|---|
| `metodologia-pubblicitaria` | fatta | - | - | - | - |
| `controllo-pubblicazione` | 1 | S | metodologia | scansione, checklist | esito finale |
| `sito-lista-attesa` | 2 | L | skill design, GitHub, email | sito, prova locale | nome, legali, email, deploy |
| `video-brevi-3in` | 3 | M | HyperFrames, Playwright, brand | render, sottotitoli | anteprima, diritti, volto, pubblicazione |
| `calendario-contenuti-4lingue` | 4 | M | metodologia, video, controllo | piano, copy, export | copy, scritture Drive/Calendar |
| `gestione-social` | 5 | M | calendario, video, account | bozze, griglia | ogni pubblicazione |
| `report-metriche` | 6 | S-M | `dataviz`, dati a mano | grafici, routine | dati e condivisione |
| `aso-metadati-store` | 7 | M | checklist store, Apple Dev | bozze, limiti | inserimento, privacy, invio |
| `offer-code-prezzi` | 7 | S | prezzi, report | piano, registro | inserimento, diffusione codici |
| extra | 8 | S-M | varie | bozze | ogni invio/risposta |

## Ordine consigliato e motivazione

1. `controllo-pubblicazione`: economica, protegge tutto il resto.
2. Brand/handle + `sito-lista-attesa`: serve un luogo posseduto dove raccogliere pubblico; gli handle vanno riservati presto.
3. `video-brevi-3in`: produce il materiale per ogni canale.
4. `calendario-contenuti-4lingue`: organizza materiale e tempo disponibile.
5. `gestione-social`: con calendario e video pronti, il profilo non nasce vuoto.
6. `report-metriche`: misura quando ci sono canali attivi.
7. `aso-metadati-store` e `offer-code-prezzi`: prima del TestFlight pubblico.

Ordine DECISO (2026-10-05, delegato dall'utente): quello sopra, con calendario e copy in it/en. Vincolo invariato: ogni pubblicazione richiede approvazione esplicita dell'utente. Se l'uscita sullo store si avvicina, ASO e offer code non scivolano oltre il TestFlight pubblico.

## Grafo delle dipendenze

```
metodologia-pubblicitaria
 └─ controllo-pubblicazione ──────────────┐ (usata da tutte le skill che producono contenuti)
     ├─ brand/handle ─ sito-lista-attesa  │
     │        └──────────┐                │
     ├─ video-brevi-3in ◄─┘ (brand)       │
     │     ├─► calendario-contenuti-4lingue
     │     │        └─► gestione-social
     │     └─► aso-metadati-store ◄─ docs/checklist-appstore
     ├─ offer-code-prezzi ◄─ decisione prezzi
     └─ report-metriche ◄─ dataviz ◄─ (dati da social, sito, aso, offer-code)
Extra: community-risposte ◄ gestione-social; outreach, press-kit ◄ brand + aso
```

## Principi trasversali

- Approvazione umana esplicita prima di ogni pubblicazione, invio, inserimento in store o scrittura su servizi esterni.
- Nessun contenuto passa senza `controllo-pubblicazione`.
- Quattro lingue: ogni contenuto nasce con piano per it/en/es/de; lo stato «non rivisto da madrelingua» va dichiarato.
- Privacy: nessun account, nessun tracciamento invasivo; solo dati aggregati e anonimi.
- Nessun dato personale nei report, nei calendari, nei repo.
- Nessun claim medico; nessun riferimento al Coach IA nella v1.
- Rispetto delle regole di piattaforma: niente bot, follower acquistati, account falsi.
- Diritti: musica, font, immagini e voci verificati e registrati.
- Skill sottili: riusare quelle esistenti, non duplicarle.

## Decisioni prese (2026-10-05)

1. **Handle**: «3in». Disponibilità su Instagram/TikTok/YouTube NON verificata: la controlla a mano l'utente prima di annunciarlo; se occupato, alternative 3in.app / 3in_app / 3inworkout. Dominio ancora da scegliere.
2. **Lingue iniziali**: italiano e inglese insieme; spagnolo e tedesco dopo. L'utente è madrelingua spagnolo e italiano e conosce anche tedesco e inglese (formulazione ambigua): chiedere conferma del livello in inglese prima di pubblicare in inglese senza revisione. Revisione madrelingua possibile per it/es, da confermare per en/de.
3. **Tempo**: «il necessario», nessun tetto. 3 ore/settimana solo come ritmo minimo consigliato di partenza e base del calendario; la cadenza si regola sul tempo reale.
4. **Volto**: NO. Formato app + testo: video pubblicitari delle funzionalità (schermate reali, testo animato) con suspense/curiosità nei primi 1-2 secondi (hook), poi rivelazione della funzione. Skill di riferimento: `video-brevi-3in` (orchestra `faceless-explainer`, `product-launch-video`, `motion-graphics`); `talking-head-recut` ed `embedded-captions` non servono.
5. **Tono**: mix di toni (suspense, ironico, tecnico, motivazionale) con voce coerente; marchio «resiliente», senza legami con mode, notizie, polemiche, posizioni politiche o sociali; niente body shaming né promesse di risultati. I 4 pilastri con esempi e cose da evitare sono in `metodologia-pubblicitaria` sez. 2.
6. **Modello**: **decisione CHIUSA** (scheda `docs/marketing/decisioni-modello-pro.md`): Pro con annuale + lifetime, prova come introductory offer Apple (2 settimane se consentito, da confermare), tip jar tolta, nessun analytics, StoreKit 2 senza RevenueCat, PWA gratuita per ora, spesa zero fino al segnale dei 30 giorni. Prova gratuita di alcune settimane (valore operativo 2, rivedibile; trial 17-32 giorni convertono meglio dei <4 giorni, RevenueCat via terzi, fonte non letta) più offer code -80% (Pay as you go o Pay up front, per canale), riservato a lancio, recensori, palestre e trainer, a durata limitata (monouso: max 6 mesi). Netti scontati in `metodologia-pubblicitaria` sez. 6 (es. 14,99 € passa da 10,44 a 2,09 € netti).
7. **Ordine delle skill**: delegato all'agente, vedi in cima.

## Decisioni ancora aperte

1. **Modello Pro: decisione chiusa il 2026-10-05**; restano da allineare i docs del repo (elenco in `docs/marketing/decisioni-modello-pro.md` sez. 6, non eseguito), privacy store («Data Not Collected», senza SDK di terzi), ASO e offer code. Finché i docs non sono allineati, nessun testo su prezzi o gratuità viene pubblicato. Domande ancora aperte: significato di «2 allenamenti»; dati calendario/BIA a fine prova (raccomandato: sola lettura ed esportabili); durata della prova; famiglia (Family Sharing vs codice -90%, opzioni A/B/C, raccomandata A); testi PWA vs iOS; verifiche Apple (Schedule 2, Attachment 14, irreversibilità Family Sharing, JWS e Transaction.updates nel plugin, categoria d'età).
2. Conferma del livello di inglese dell'utente e disponibilità di madrelingua per la revisione de (en da confermare).
3. Strumento per la lista d'attesa e luogo di hosting (GitHub Pages sì/no); dominio.
4. Verifica manuale della disponibilità dell'handle «3in» sulle tre piattaforme.
