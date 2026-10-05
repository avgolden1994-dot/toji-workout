# Rete dell'ambiente: cosa si raggiunge e cosa sbloccare

Sondaggio del **2026-10-05** (cloud environment con accesso di rete «Trusted», proxy in `HTTPS_PROXY`, CA in `/root/.ccr/ca-bundle.crt`). Regole del proxy: `/root/.ccr/README.md` e `curl -sS "$HTTPS_PROXY/__agentproxy/status"`. Un 403 sul CONNECT è una decisione di politica dell'organizzazione: non si ritenta e non si aggira (niente TLS disattivato, niente `unset HTTPS_PROXY`).

## 1. Esito del sondaggio

Metodo: `curl --cacert /root/.ccr/ca-bundle.crt https://<host>/` (codice HTTP) e WebFetch (stessa politica: `EGRESS_BLOCKED`). Per alcuni host WebFetch risponde «Claude Code is unable to fetch from <host>» invece di `EGRESS_BLOCKED`: anche lì curl dava 403 sul tunnel.

| Gruppo | Host | Raggiungibile |
|---|---|---|
| Letteratura biomedica | pubmed.ncbi.nlm.nih.gov, eutils.ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov, www.ncbi.nlm.nih.gov, ftp.ncbi.nlm.nih.gov, europepmc.org, www.ebi.ac.uk | NO |
| API bibliografiche | api.crossref.org, api.openalex.org, api.semanticscholar.org, api.unpaywall.org, doi.org, dx.doi.org, core.ac.uk, scholar.archive.org | NO |
| Preprint e dati | arxiv.org, export.arxiv.org, www.biorxiv.org, api.biorxiv.org, sportrxiv.org, osf.io, api.osf.io, zenodo.org, figshare.com, dataverse.harvard.edu, data.mendeley.com, www.kaggle.com | NO |
| Editori e riviste | link.springer.com, www.sciencedirect.com, journals.lww.com, www.frontiersin.org, www.mdpi.com, peerj.com, bmcsportsscimedmeded.biomedcentral.com, bjsm.bmj.com, journals.sagepub.com, www.tandfonline.com, academic.oup.com, onlinelibrary.wiley.com, www.nature.com, www.cochranelibrary.com, www.researchgate.net, www.semanticscholar.org | NO |
| Enti | www.nsca.com, www.acsm.org, www.who.int, www.nih.gov, www.cdc.gov, www.nhs.uk, medlineplus.gov, www.efsa.europa.eu | NO |
| Esperti e siti fitness | www.strongerbyscience.com, mennohenselmans.com (e www.), www.biolayne.com, rpstrength.com, www.jefit.com, www.menshealth.com, www.t-nation.com, barbend.com, www.sportsmith.co, www.crossfit.com | NO |
| Enciclopedie e archivi | en.wikipedia.org, it.wikipedia.org, www.wikidata.org, commons.wikimedia.org, dbpedia.org, archive.org, web.archive.org, archive.ph, openlibrary.org, www.gutenberg.org | NO |
| Social e aggregatori | www.reddit.com, old.reddit.com, news.ycombinator.com, hn.algolia.com, medium.com, substack.com | NO |
| Lettori e proxy di testo | r.jina.ai, duckduckgo.com, html.duckduckgo.com, www.bing.com, www.google.com | NO |
| Podcast | podcasts.apple.com, itunes.apple.com, open.spotify.com, anchor.fm, feeds.megaphone.fm, feeds.simplecast.com, rss.art19.com | NO |
| Video e trascrizioni | www.youtube.com, youtu.be, www.youtube-nocookie.com, i.ytimg.com, img.youtube.com, youtubetranscript.com, downsub.com, noembed.com, yewtu.be, inv.nadeko.net, invidious.io, piped.video, piped.kavin.rocks | NO |
| CDN e varie | cdn.jsdelivr.net, cdnjs.cloudflare.com, unpkg.com, huggingface.co, paperswithcode.com, cdn.openai.com, www.wikihow.com | NO |
| GitHub | raw.githubusercontent.com (200 anche su repo pubblici qualsiasi: file grezzi, README, JSON); gist.github.com (302); codeload.github.com, objects.githubusercontent.com | SÌ |
| GitHub (limiti) | api.github.com risponde ma solo per i repo della sessione («sessions are bound to their configured repositories»); github.com pagine web 403/400 | PARZIALE |
| Pacchetti | pypi.org, files.pythonhosted.org, registry.npmjs.org | SÌ (installare, non leggere ricerca) |
| Google API | www.googleapis.com, youtube.googleapis.com, content.googleapis.com, storage.googleapis.com (risposta Google 404/400 = tunnel aperto). YouTube Data API v3 senza chiave: `403 Method doesn't allow unregistered callers` | SÌ, ma serve una chiave |
| Anthropic | platform.claude.com (200), www.anthropic.com (200), docs.claude.com (301), code.claude.com (302; WebFetch legge la documentazione) | SÌ (non è ricerca fitness) |
| Motore di ricerca | **WebSearch** (lato server, solo US): titoli, URL e un riassunto | **SÌ, è l'unico canale di ricerca** |

Utile a margine: `raw.githubusercontent.com` permette di leggere file pubblici di repo GitHub (per esempio una base dati di esercizi con licenza aperta). Non è letteratura scientifica: ogni dato preso da lì va trattato come fonte di livello 3 e con licenza controllata.

## 2. Strumenti per le trascrizioni

- `pip download youtube-transcript-api --no-deps` funziona (pypi.org è raggiungibile; versione 1.2.4). Installata in un venv e provata su un video: `ProxyError ... host='www.youtube.com' ... Tunnel connection failed: 403 Forbidden`. Serve quindi `www.youtube.com`, bloccato.
- npm: `youtube-transcript` (1.3.1) e `youtubei.js` (18.1.0) si trovano nel registro, stessa dipendenza da `www.youtube.com`: non provati, stesso esito atteso.
- Playwright Chromium (`/opt/pw-browsers/chromium`, `playwright` in `/opt/node-tools`) lanciato con `--proxy-server=$HTTPS_PROXY`: `https://www.youtube.com/` dà `net::ERR_TUNNEL_CONNECTION_FAILED`. Stesso proxy, stesso blocco. (Su host ammessi Chromium segnala anche `ERR_CERT_AUTHORITY_INVALID` perché non usa la CA del proxy: non ci si lavora oltre.)

## 3. Cosa porta WebSearch (giudizio su 7 interrogazioni)

- **Riassunto di 3-6 frasi** con alcuni numeri e affermazioni, più 8-10 link (titolo + URL). Esempi: RIR (errore medio circa 1 ripetizione, 0,95 per difetto; più preciso a ≤12 ripetizioni e vicino al cedimento; coach da video sbagliano di circa 1); «lengthened partials» (7 studi su 8 a favore delle parziali in allungamento sulle corte; 4 su 5 contro il ROM completo, **detto da Nippard** nel video del novembre 2023); landmark RP (MEV 4-8 serie a settimana per l'intermedio, MV 2-6: cifre lette su siti terzi, non su un testo di RP, e il modello MV/MEV/MAV/MRV è euristico, non un risultato di studi).
- **Mancano**: nomi degli studi, n, DOI, tabelle, passaggi di trascrizione. I numeri sono di seconda mano (riassunto di un riassunto): vanno ricontrollati e citati con la forma esatta.
- **`allowed_domains` PubMed/PMC**: restituisce titolo + PMID dello studio vero. Contenuto del riassunto di qualità variabile, titoli e URL affidabili.
- **`allowed_domains` di un sito esperto**: elenca gli articoli di quel sito; il riassunto ripete le stesse frasi.
- **`allowed_domains ["youtube.com"]`**: solo titoli e URL di video e Shorts.
- **Rumore** nelle ricerche libere: negozi (Gumroad), TikTok, forum, siti di calcolatori: tienilo fuori con `blocked_domains` e declassa a livello 3.
- Verdetto: **ottimo per mappare e identificare** (chi dice cosa, quale studio, quale titolo), **mediocre per citare**: ogni numero entra in una regola solo dopo l'incrocio con una seconda fonte indipendente.

## 4. Cosa sbloccare (da chiedere all'utente)

Impostazione: ambiente cloud (menu dell'ambiente nella barra del titolo della sessione, poi Edit) > **Network access** > **Custom**, con l'opzione di tenere anche l'elenco predefinito (pacchetti, GitHub), e gli host sotto **Allowed domains**, uno per riga. Si può usare `*.dominio` per i sottodomini. Documentazione: https://code.claude.com/docs/en/cloud-environments#network-access . Alternativa drastica: livello **Full** (qualsiasi dominio), più semplice ma senza filtro.

Elenco in ordine di valore. A copre il 90% del bisogno (studi veri):

```text
# A - letteratura (abstract, full text aperto, metadati, citazioni)
eutils.ncbi.nlm.nih.gov
pubmed.ncbi.nlm.nih.gov
pmc.ncbi.nlm.nih.gov
www.ncbi.nlm.nih.gov
www.ebi.ac.uk
europepmc.org
api.crossref.org
api.openalex.org
api.semanticscholar.org
api.unpaywall.org
doi.org

# B - preprint ed editori ad accesso aperto o con abstract
sportrxiv.org
osf.io
api.osf.io
www.biorxiv.org
api.biorxiv.org
link.springer.com
www.frontiersin.org
www.mdpi.com
peerj.com
bjsm.bmj.com
journals.lww.com

# C - esperti basati sull'evidenza (articoli completi)
www.strongerbyscience.com
mennohenselmans.com
www.biolayne.com
rpstrength.com

# D - video e podcast (trascrizioni)
www.youtube.com
youtu.be
```

- **Europe PMC** (`www.ebi.ac.uk/europepmc/webservices/rest`) è il migliore: ricerca, abstract e full text dei lavori aperti in un'unica API senza chiave. **PubMed E-utilities** (`eutils.ncbi.nlm.nih.gov`) serve per titoli, autori, abstract e ricerche mirate. **OpenAlex** e **Crossref** per DOI, citazioni e verifica che uno studio esista.
- **Trascrizioni YouTube**: con `www.youtube.com` ammesso, `pip install youtube-transcript-api` (scarica già oggi) dovrebbe funzionare per i video con sottotitoli. Non provato: dipende da se YouTube serve i sottotitoli anche a questo indirizzo e se servono altri host; da verificare con un video di prova e da registrare nel registro della skill.
- **Podcast**: le trascrizioni stanno di solito sul sito dello show (gruppo C). Per i feed RSS servono gli host dei singoli feed (`feeds.megaphone.fm`, `feeds.simplecast.com`, `rss.art19.com`, `anchor.fm`): danno note e link, non il testo.
- **Senza cambiare la rete, solo per i video**: i domini `*.googleapis.com` sono già ammessi, quindi la **YouTube Data API v3** (`youtube.googleapis.com`) risponde, ma chiede una chiave. Con una chiave API (piano Pro/Max: sezione «API credentials» dell'ambiente, host `youtube.googleapis.com`, oppure una variabile d'ambiente) si otterrebbero titolo, **descrizione, capitoli e link agli studi citati** dei video, non le trascrizioni. Non provato (nessuna chiave a disposizione).

## 5. Come rifare il sondaggio

Dopo un cambio di impostazioni, una richiesta per host (non cicli lunghi) e poi aggiorna questa pagina e il registro in `SKILL.md`:

```bash
for h in pubmed.ncbi.nlm.nih.gov europepmc.org api.openalex.org www.youtube.com www.strongerbyscience.com; do
  echo "$h => $(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 --cacert /root/.ccr/ca-bundle.crt https://$h/ 2>&1 | head -1)"
done
```

Un `CONNECT tunnel failed, response 403` = ancora bloccato; qualsiasi codice HTTP (anche 301, 403 o 404 dal sito stesso) = tunnel aperto. Poi prova con WebFetch un URL vero (per esempio una pagina PubMed) e leggi se il contenuto torna.
