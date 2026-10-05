# Tema chiaro «Braci su pietra»

Memoria del lavoro sulla modalità chiara (5 ottobre 2026): perché la palette è cambiata, dove vive nel codice, quali valori ha, le regole per chi tocca i colori e cosa non è ancora stato provato.
Scritta a mano e verificata sul repo (`css/base.css`, `css/chiaro.css`, `js/core/tema-iniziale.js`, `index.html`, `manifest.json`, `tests/struttura.test.js`): se cambi un valore, aggiorna la tabella qui. Contrasti WCAG ricalcolati dai valori sotto.

## Decisione

Palette «Braci su pietra» al posto del clone di iOS (grigio-lilla `#f2f2f7` + nero puro `#000`): neutri «pietra» appena caldi (croma OKLCH ≤ 0,013), arancio ember vivo e piatto, **niente gradiente verso il marrone**. Lo scuro non cambia.
Diagnosi della palette precedente:
- superfici collassate a 2 livelli (`--surface-2` = `--bg`, `--surface-3` = `--surface-1`), bordi a 1,4-1,5:1 sulla card (1,36 sullo sfondo), contorno dei comandi a 2,2:1;
- `--accent` = `--danger` (stesso `#c62828`) e `--primary` ≈ `--warning` (`#c2410c` / `#b25209`): quattro significati, due colori;
- chip colorati con velature sotto AA, palette JS (gruppi, dischi, «Tirata») fisse da scuro, ombre nere e glow da scuro sul bianco, nero puro con pesi 800/900 ovunque.

## Dove vive

- **Token** in `css/base.css`: blocco scuro `:root, html[data-theme="dark"], body[data-theme="dark"]` e blocco `html[data-theme="light"], body[data-theme="light"]` (`applyTheme` mette `data-theme` su `<html>` e su `<body>`).
- **Compatibilità nello scuro**: i token nuovi esistono anche lì con i valori che prima erano scritti a mano (`--*-text` = colore pieno, `--*-tint` = velatura 15% sulla card, `--field-*` = fondo e filo del tema, `--shadow-1: none`, `--disco-bordo: transparent`), così lo scuro resta identico per costruzione.
- **`css/chiaro.css`**: solo override del chiaro, caricato per ULTIMO in `index.html`. Prefisso `:where(html[data-theme="light"])` (peso zero: la regola ha la forza del selettore che corregge e vince solo a parità); prefisso pieno solo dove si batte una regola già scritta col prefisso pieno (elevazione, timer di recupero, `.og-day.today`).
- **Elevazione** (fine di `base.css`): una regola sola, ombre tinte di terra bruciata `--ombra` (`#4a3426`, mai nero) in `--shadow-1/2/3/brand`. Livello 1 card e riquadri (`--shadow-1` + filo), 2 flottanti (`.music-dock`, `.snackbar`, `.busy-panel`), 3 finestre dal basso (`--shadow-3` + velo caldo). Dentro una card niente ombre: il riquadro annidato scende a `--surface-2`.
- **Famiglie di token**: `--*-text` e `--*-tint` (chip), `--field-bg/--field-border`, `--switch-*`, `--map-*`, `--g-*` (gruppi muscolari), `--disco-*` e `--disco-bordo`, `--tirata`. Le tre palette JS puntano a `var(--...)`: `GRUPPO_COLORE` in `js/ui/calendario/gruppi.js`, `COLORE_DISCO` in `js/ui/allenamento/seduta.js`, «Tirata» in `js/ui/oggi.js`.

## Valori del chiaro

| Token | Valore | Nota |
|---|---|---|
| `--bg` | `#f6f5f3` | sfondo pietra, livello 0 |
| `--surface-1` | `#ffffff` | card, livello 1 |
| `--surface-2` | `#f1efec` | dentro una card: annidati, chip, comandi |
| `--surface-3` | `#e3dfda` | riempimenti e binari (anello, barre, celle vuote); le finestre usano `--surface-1` + `--shadow-3` |
| `--border` / `--border-strong` | `#e5e1dc` / `#8b857e` | filo sottile / contorno dei comandi (3,65:1 sulla card) |
| `--text` / `--muted` / `--text-dim` | `#1c1917` / `#57534e` / `#6f6a64` | 16,1 / 7,0 / 4,9:1 sullo sfondo; `--text-dim` su `--surface-3` scende a 4,0:1 |
| `--primary` (glow) | `#c43c0a` (`#a3310a`) | glow solo per lo stato premuto; `--on-primary` bianco (5,25:1) |
| `--accent` | `#a3166e` | lampone: intensità, coach, superserie |
| `--success` / `--warning` / `--danger` / `--low` | `#137a3a` / `#946200` / `#bf1d32` / `#4a63ad` | verde, ocra, cremisi (solo pericolo), blu sotto il minimo |

Chip (testo / tinta, tutti ≥ 5,8:1): primary `#a73301` / `#fcebe2`; accent `#8f135f` / `#fbe9f2`; success `#0f6a31` / `#e6f4ea`; warning `#7a5000` / `#fbf0d6`; danger `#a51d2b` / `#fdeaea`; low `#3b539a` / `#eaeffb`.
Mappa del corpo: `--map-low` `#6a87dc`, `--map-ok` `#2f9d5a`, `--map-high` `#c48600`, sagoma `--map-sil` `#e6e1db`, muscolo `--map-muscle` `#d6d0c9`. `--tirata` `#3d6fd1`.
Gruppi `--g-*`: petto `#e5484d`, schiena `#2f6fd6`, spalle `#b07a00`, braccia `#0e9384`, gambe `#7c5ce6`, glutei `#d63f97`, core `#6b7280`.
Dischi: 25 `#e5484d`, 20 `#2f6fd6`, 15 `#e2a900`, 10 `#1f9d55`, 5 bianco con contorno (`--disco-bordo`, 3,4:1), 2,5 `#57534e`, 1,25 `#a8a29e`.
Campi: `--field-bg` = `--surface-1`, `--field-border` = `--border-strong`; interruttore spento `--surface-3` con filo `--border-strong`. Nello scuro, per confronto: `--bg` `#0e0e12`, `--surface-1` `#191920`, `--primary` `#fb8b3c`, `--accent` `#f26d6d`.

## Regole d'uso (per chi modifica i colori)

- **Quattro livelli di superficie** (`--bg` < `--surface-1` < `--surface-2` < `--surface-3`): non saltarli, non rimettere `--surface-2` = `--bg`.
- **Profondità con l'ombra tinta**, non con bordi grigi più scuri. Il filo `--border` separa soltanto.
- **Contorno ≥ 3:1 solo sui controlli** (input, stepper, spunte, interruttore: `--border-strong`); sulle card resta il filo sottile.
- **Chip**: testo `--*-text` su sfondo `--*-tint`. Mai colori letterali né velature alpha nel chiaro.
- **Rosso = pericolo e avvisi** (scelta dell'utente). Nel chiaro usano danger `.bia-status.warn`, `.ex-block-title.warn`, `#web-status.web-warning` e i pulsanti/X distruttivi (`.stop-btn.danger`, `.bulk-btn.danger`, «Svuota», `.wm-x`). Attenzione: `#web-status { color: var(--muted) }` ha specificità da id, l'override deve essere `#web-status.web-warning`.
- **Lampone (`--accent`) = coach e intensità**: restano su accent `.ex-note-att`, `.onb-note`, `.sheet-hint`, `.drop-hint`. Non usarlo per errori.
- **WCAG**: 4,5:1 per il testo, 3:1 per l'interfaccia e i grafici. Ogni colore nuovo del chiaro va in `chiaro.css` o nei token, mai letterale in un file d'area; se il CSS cambia, ricontrolla anche lo scuro.

## Tema all'avvio (niente flash)

- `js/core/tema-iniziale.js` è il PRIMO script, sincrono in `<head>` prima dei CSS e dopo il meta `theme-color`. `temaRisolto()` legge `tz_theme` (`dark` | `light` | `auto`, default `dark`; `auto` = `prefers-color-scheme`) in try/catch, mette `data-theme` su `<html>` e, nel chiaro, `#f6f5f3` nel `theme-color`. `THEME_KEY` sta qui.
- `<style>` critico in `index.html` con il `--bg` di ogni tema (`#0e0e12`, `#f6f5f3`): lo confronta `tests/struttura.test.js` (2 test nuovi: ordine degli script, chiave e valori, scelta per ogni preferenza anche con localStorage bloccato).
- `applyTheme()` (`js/ui/opzioni/impostazioni.js`) riusa `temaRisolto()`; in `auto` un listener `matchMedia` segue il sistema ad app aperta. La dissolvenza di 0,4 s su `body` resta solo quando il tema cambia (Opzioni o sistema).
- Prima: chiaro dipinto scuro per ~3,6 s e poi ~20 grigi intermedi (misura di sessione: 236 fotogrammi su ~308 col colore sbagliato, CSS ritardato); dopo: 0.
- **Manifest** statico: `background_color` `#0e0e12` (= `--bg` scuro), `theme_color` `#08080a`. Lo splash Android resta quindi scuro anche per chi usa il chiaro.
- **iOS**: il meta `black-translucent` resta (statico, ora e batteria sempre bianchi). Nel chiaro, solo in `@media (display-mode: standalone)`, `.statusbar-guard` (base in `css/calendario.css`: alta `env(safe-area-inset-top)`) diventa una fascia `--text` con `z-index: 150`, sopra i fogli a tutto schermo; dove la safe-area vale 0 non appare.

## Come è stato verificato

Playwright (Chromium, 390x844 @2x, orologio fissato a giovedì 8 ottobre 2026, dati demo `guidaDatiDemo()`, `tz_theme` in localStorage): 22 schermate chiaro/scuro; chiaro identico alla proposta (0 pixel di differenza salvo l'animazione della mappa corpo), scuro identico al prima; 56 coppie di contrasto WCAG (prima 26 a norma, dopo 56); confronto degli stili calcolati su ~261k elementi. Gli script non sono versionati: per ripetere la verifica vanno riscritti da questi criteri.

## Aperti, non verificati, idee

- **Non provato**: iPhone reale (barra di stato, launch screen, `display-mode`, safe-area su iOS 26+), splash Android reale, WebKit e Firefox, resa di `:hover`/`:active`/`:focus`, lingue en/es/de.
- `docs/piano-lancio-appstore.md` indica il launch screen `#08080a`: da allineare a `#0e0e12`. Nell'app nativa: `@capacitor/status-bar` con stile per tema dentro `applyTheme` (via `Nativo.plugin('StatusBar')`) e/o prova su iPhone reale con `default` + `theme-color`.
- `@keyframes cedimento-boom` (`css/allenamento.css`) dà ancora un alone arancio di 36 px nel chiaro.
- Variante non fatta: arancio più vivo `#ea580c` con testo scuro come nello scuro; richiederebbe un `--primary-text` separato per ~240 usi di `var(--primary)`.
- `tests/browser/intensita-bia.js` fallisce già da prima: non è una regressione di questo lavoro.

## Commit di riferimento

Ramo `claude/ecstatic-edison-r8qf3d`: `d7bdf03` (palette, `CACHE_NAME` 3in-v12), `03e5d16` (avvisi in rosso), `5718890` (tema prima del primo paint, v13), `eb8794d` (CLAUDE.md) `9a10b27` (rimozione del codice Maki: via i blocchi `data-mode="maki"` di `css/base.css` e `MODE_META`, la barra del browser nello scuro è sempre `#08080a`, `CACHE_NAME` 3in-v14) più i commit «Aggiorna il grafo del codice…» (`8efcbd0`, `2d3f1c4`, `65ad234`).
