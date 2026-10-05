# Inventario esercizi e immagini

Generato con uno script node che legge `EXERCISE_LIBRARY` (`js/dati/libreria-esercizi.js`) e la mappa `IMMAGINI_ESERCIZI` (`js/dati/disegni-esercizi.js`), poi controlla il disco. Ramo: `claude/immagini-esercizi`.

## 1. Riepilogo numeri

| Voce | Valore |
|---|---|
| Esercizi nel catalogo (`EXERCISE_LIBRARY`) | 140 totali (139 nel branch + 1 da altro branch) |
| Con immagine (campo presente e file esistente) | 26 |
| Senza immagine (mancanti) | 114 su 140 (113 nel branch + 1 da altro branch) |
| Di cui non ancora presenti in questo branch | 1 (n. 140 Squat Sumo, da `claude/hopeful-thompson-uthd8f`) |
| File in `esercizi/` | 27 (tutti SVG) |
| File orfani (non referenziati) | 1 (`ex-02-panca-inclinata-su-a.svg`) |
| Peso totale `esercizi/` | 828.1 KB |
| Peso medio per file | 30.7 KB |

Copertura per gruppo muscolare:

| Gruppo | Esercizi | Con immagine | Senza |
|---|---|---|---|
| Petto | 17 | 11 | 6 |
| Schiena | 23 | 11 | 12 |
| Gambe | 25 (24 nel branch + 1 da altro branch) | 4 | 21 (20 nel branch + 1 da altro branch) |
| Glutei | 15 | 0 | 15 |
| Spalle | 16 | 0 | 16 |
| Braccia | 26 | 0 | 26 |
| Core | 18 | 0 | 18 |

Note: gli esercizi usati in `schede-*.js` e le chiavi di `DETTAGLI` (139) coincidono con la libreria: nessun esercizio fuori catalogo. `tools/genera-catalogo.js` NON riguarda gli esercizi: genera il catalogo delle regole del coach da `docs/coach-mappa-regole.md`.

Le bozze Quiver non finali (varianti a-d degli esercizi 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 e 26, di cui la b per il 10, la d per l'11, la d per il 13, la a per il 14, la a per il 15, identica alla d, la d per il 16 e la c per il 17 e la d per il 18 e la d per il 19 e la c per il 20 e la d per il 21 e la d per il 22 e la a per il 23 e la a per il 24 e la c per il 25 e la a per il 26, sono state usate per il finale) stanno in `esercizi-bozze/`, fuori da `esercizi/` e dalla cache del service worker.

## 2. Tabella completa

Il nome e' mostrato senza emoji iniziale. Percorso `img/<slug>.png` e' il ripiego di `immagineEsercizio()` quando non c'e' una voce in `IMMAGINI_ESERCIZI` (la cartella `img/` non esiste).

| # | Esercizio | Gruppo | Percorso immagine |
|---|---|---|---|
| 1 | Panca Piana Bilanciere | Petto | `esercizi/ex-01-panca-piana.svg` |
| 2 | Panca Inclinata Bilanciere | Petto | `esercizi/ex-02-panca-inclinata.svg` |
| 3 | Panca Inclinata Manubri | Petto | `esercizi/ex-03-panca-inclinata-manubri.svg` |
| 4 | Panca Declinata | Petto | `esercizi/ex-04-panca-declinata.svg` |
| 5 | Chest Press Machine | Petto | `esercizi/ex-05-chest-press.svg` |
| 6 | Dip alle Parallele | Petto | `esercizi/ex-06-dip-parallele.svg` |
| 7 | Piegamenti a Terra (Push-up) | Petto | `esercizi/ex-07-push-up.svg` |
| 8 | Croci ai Cavi | Petto | `esercizi/ex-08-croci-cavi.svg` |
| 9 | Croci su Panca Manubri | Petto | `esercizi/ex-09-croci-panca-manubri.svg` |
| 10 | Pectoral Machine (Butterfly) | Petto | `esercizi/ex-10-pectoral-machine.svg` |
| 11 | Pullover con Manubrio | Petto | `esercizi/ex-11-pullover-manubrio.svg` |
| 12 | Stacco da Terra (Deadlift) | Schiena | `esercizi/ex-12-stacco-da-terra.svg` |
| 13 | Trazioni alla Sbarra (Pull-ups) | Schiena | `esercizi/ex-13-trazioni-sbarra.svg` |
| 14 | Trazioni Presa Inversa (Chin-up) | Schiena | `esercizi/ex-14-trazioni-presa-inversa.svg` |
| 15 | Lat Machine | Schiena | `esercizi/ex-15-lat-machine.svg` |
| 16 | Lat Machine Presa Inversa | Schiena | `esercizi/ex-16-lat-machine-presa-inversa.svg` |
| 17 | Rematore con Bilanciere | Schiena | `esercizi/ex-17-rematore-bilanciere.svg` |
| 18 | Rematore con Manubrio | Schiena | `esercizi/ex-18-rematore-manubrio.svg` |
| 19 | T-Bar Row | Schiena | `esercizi/ex-19-t-bar-row.svg` |
| 20 | Pulley Basso | Schiena | `esercizi/ex-20-pulley-basso.svg` |
| 21 | Pullover ai Cavi | Schiena | `esercizi/ex-21-pullover-ai-cavi.svg` |
| 22 | Hyperextension (Lombari) | Schiena | `esercizi/ex-22-hyperextension-lombari.svg` |
| 23 | Squat con Bilanciere | Gambe | `esercizi/ex-23-squat-bilanciere.svg` |
| 24 | Front Squat | Gambe | `esercizi/ex-24-front-squat.svg` |
| 25 | Goblet Squat | Gambe | `esercizi/ex-25-goblet-squat.svg` |
| 26 | Hack Squat | Gambe | `esercizi/ex-26-hack-squat.svg` |
| 27 | Leg Press | Gambe | nessuna (ripiego inesistente `img/leg-press.png`) |
| 28 | Affondi Manubri | Gambe | nessuna (ripiego inesistente `img/affondi-manubri.png`) |
| 29 | Affondi in Camminata | Gambe | nessuna (ripiego inesistente `img/affondi-in-camminata.png`) |
| 30 | Step-up su Panca | Gambe | nessuna (ripiego inesistente `img/step-up-su-panca.png`) |
| 31 | Leg Extension | Gambe | nessuna (ripiego inesistente `img/leg-extension.png`) |
| 32 | Leg Curl Sdraiato | Gambe | nessuna (ripiego inesistente `img/leg-curl-sdraiato.png`) |
| 33 | Leg Curl Seduto | Gambe | nessuna (ripiego inesistente `img/leg-curl-seduto.png`) |
| 34 | Calf Raise in Piedi | Gambe | nessuna (ripiego inesistente `img/calf-raise-in-piedi.png`) |
| 35 | Calf Raise Seduto | Gambe | nessuna (ripiego inesistente `img/calf-raise-seduto.png`) |
| 36 | Hip Thrust | Glutei | nessuna (ripiego inesistente `img/hip-thrust.png`) |
| 37 | Stacco Rumeno | Glutei | nessuna (ripiego inesistente `img/stacco-rumeno.png`) |
| 38 | Stacco Sumo | Glutei | nessuna (ripiego inesistente `img/stacco-sumo.png`) |
| 39 | Affondi Bulgari | Glutei | nessuna (ripiego inesistente `img/affondi-bulgari.png`) |
| 40 | Good Morning | Glutei | nessuna (ripiego inesistente `img/good-morning.png`) |
| 41 | Ponte Glutei | Glutei | nessuna (ripiego inesistente `img/ponte-glutei.png`) |
| 42 | Abductor Machine | Glutei | nessuna (ripiego inesistente `img/abductor-machine.png`) |
| 43 | Kickback ai Cavi | Glutei | nessuna (ripiego inesistente `img/kickback-ai-cavi.png`) |
| 44 | Slanci Laterali a Terra | Glutei | nessuna (ripiego inesistente `img/slanci-laterali-a-terra.png`) |
| 45 | Military Press | Spalle | nessuna (ripiego inesistente `img/military-press.png`) |
| 46 | Lento Avanti Manubri | Spalle | nessuna (ripiego inesistente `img/lento-avanti-manubri.png`) |
| 47 | Arnold Press | Spalle | nessuna (ripiego inesistente `img/arnold-press.png`) |
| 48 | Shoulder Press Machine | Spalle | nessuna (ripiego inesistente `img/shoulder-press-machine.png`) |
| 49 | Tirate al Mento (Upright Row) | Spalle | nessuna (ripiego inesistente `img/tirate-al-mento.png`) |
| 50 | Alzate Laterali | Spalle | nessuna (ripiego inesistente `img/alzate-laterali.png`) |
| 51 | Alzate Frontali | Spalle | nessuna (ripiego inesistente `img/alzate-frontali.png`) |
| 52 | Alzate Posteriori (Reverse Fly) | Spalle | nessuna (ripiego inesistente `img/alzate-posteriori.png`) |
| 53 | Face Pull | Spalle | nessuna (ripiego inesistente `img/face-pull.png`) |
| 54 | Scrollate (Shrug) | Spalle | nessuna (ripiego inesistente `img/scrollate.png`) |
| 55 | Curl Bilanciere Bicipiti | Braccia | nessuna (ripiego inesistente `img/curl-bilanciere-bicipiti.png`) |
| 56 | Curl Manubri Alternato | Braccia | nessuna (ripiego inesistente `img/curl-manubri-alternato.png`) |
| 57 | Hammer Curl | Braccia | nessuna (ripiego inesistente `img/hammer-curl.png`) |
| 58 | Curl su Panca Scott | Braccia | nessuna (ripiego inesistente `img/curl-su-panca-scott.png`) |
| 59 | Curl ai Cavi | Braccia | nessuna (ripiego inesistente `img/curl-ai-cavi.png`) |
| 60 | Curl di Concentrazione | Braccia | nessuna (ripiego inesistente `img/curl-di-concentrazione.png`) |
| 61 | Pushdown Tricipiti ai Cavi | Braccia | nessuna (ripiego inesistente `img/pushdown-tricipiti-ai-cavi.png`) |
| 62 | French Press | Braccia | nessuna (ripiego inesistente `img/french-press.png`) |
| 63 | Panca Presa Stretta | Braccia | nessuna (ripiego inesistente `img/panca-presa-stretta.png`) |
| 64 | Dip su Panca | Braccia | nessuna (ripiego inesistente `img/dip-su-panca.png`) |
| 65 | Kickback Tricipiti | Braccia | nessuna (ripiego inesistente `img/kickback-tricipiti.png`) |
| 66 | Panca Piana Manubri | Petto | nessuna (ripiego inesistente `img/panca-piana-manubri.png`) |
| 67 | Croci ai Cavi dal Basso | Petto | nessuna (ripiego inesistente `img/croci-ai-cavi-dal-basso.png`) |
| 68 | Piegamenti Inclinati (Mani Rialzate) | Petto | nessuna (ripiego inesistente `img/piegamenti-inclinati.png`) |
| 69 | Rematore alla Macchina | Schiena | nessuna (ripiego inesistente `img/rematore-alla-macchina.png`) |
| 70 | Pulldown a Braccia Tese | Schiena | nessuna (ripiego inesistente `img/pulldown-a-braccia-tese.png`) |
| 71 | Trazioni Assistite (Macchina) | Schiena | nessuna (ripiego inesistente `img/trazioni-assistite.png`) |
| 72 | Rematore Inverso (Corpo Libero) | Schiena | nessuna (ripiego inesistente `img/rematore-inverso.png`) |
| 73 | Squat a Corpo Libero | Gambe | nessuna (ripiego inesistente `img/squat-a-corpo-libero.png`) |
| 74 | Affondi Inversi | Gambe | nessuna (ripiego inesistente `img/affondi-inversi.png`) |
| 75 | Nordic Curl | Gambe | nessuna (ripiego inesistente `img/nordic-curl.png`) |
| 76 | Wall Sit | Gambe | nessuna (ripiego inesistente `img/wall-sit.png`) |
| 77 | Pull-Through ai Cavi | Glutei | nessuna (ripiego inesistente `img/pull-through-ai-cavi.png`) |
| 78 | Ponte Glutei a una Gamba | Glutei | nessuna (ripiego inesistente `img/ponte-glutei-a-una-gamba.png`) |
| 79 | Abduzioni ai Cavi | Glutei | nessuna (ripiego inesistente `img/abduzioni-ai-cavi.png`) |
| 80 | Landmine Press | Spalle | nessuna (ripiego inesistente `img/landmine-press.png`) |
| 81 | Y-Raise su Panca Inclinata | Spalle | nessuna (ripiego inesistente `img/y-raise-su-panca-inclinata.png`) |
| 82 | Curl con Bilanciere EZ | Braccia | nessuna (ripiego inesistente `img/curl-con-bilanciere-ez.png`) |
| 83 | Spider Curl | Braccia | nessuna (ripiego inesistente `img/spider-curl.png`) |
| 84 | Pushdown con Corda | Braccia | nessuna (ripiego inesistente `img/pushdown-con-corda.png`) |
| 85 | Pallof Press | Core | nessuna (ripiego inesistente `img/pallof-press.png`) |
| 86 | Dead Bug | Core | nessuna (ripiego inesistente `img/dead-bug.png`) |
| 87 | Bird Dog | Core | nessuna (ripiego inesistente `img/bird-dog.png`) |
| 88 | Farmer Walk | Core | nessuna (ripiego inesistente `img/farmer-walk.png`) |
| 89 | Estensione Tricipiti sopra la Testa ai Cavi | Braccia | nessuna (ripiego inesistente `img/estensione-tricipiti-sopra-la-testa-ai-cavi.png`) |
| 90 | Estensione Tricipiti sopra la Testa con Manubrio | Braccia | nessuna (ripiego inesistente `img/estensione-tricipiti-sopra-la-testa-con-manubrio.png`) |
| 91 | Curl su Panca Inclinata | Braccia | nessuna (ripiego inesistente `img/curl-su-panca-inclinata.png`) |
| 92 | Curl Bayesiano ai Cavi | Braccia | nessuna (ripiego inesistente `img/curl-bayesiano-ai-cavi.png`) |
| 93 | Alzate Laterali ai Cavi | Spalle | nessuna (ripiego inesistente `img/alzate-laterali-ai-cavi.png`) |
| 94 | Reverse Pec Deck | Spalle | nessuna (ripiego inesistente `img/reverse-pec-deck.png`) |
| 95 | Rematore con Petto Appoggiato | Schiena | nessuna (ripiego inesistente `img/rematore-con-petto-appoggiato.png`) |
| 96 | Lat Machine a un Braccio | Schiena | nessuna (ripiego inesistente `img/lat-machine-a-un-braccio.png`) |
| 97 | Pendulum Squat | Gambe | nessuna (ripiego inesistente `img/pendulum-squat.png`) |
| 98 | Squat al Multipower | Gambe | nessuna (ripiego inesistente `img/squat-al-multipower.png`) |
| 99 | Calf Raise alla Leg Press | Gambe | nessuna (ripiego inesistente `img/calf-raise-alla-leg-press.png`) |
| 100 | Stacco con Trap Bar | Gambe | nessuna (ripiego inesistente `img/stacco-con-trap-bar.png`) |
| 101 | Hip Thrust alla Macchina | Glutei | nessuna (ripiego inesistente `img/hip-thrust-alla-macchina.png`) |
| 102 | Hyperextension a 45° per Glutei | Glutei | nessuna (ripiego inesistente `img/hyperextension-a-45-per-glutei.png`) |
| 103 | Affondi al Multipower (Piede Rialzato) | Glutei | nessuna (ripiego inesistente `img/affondi-al-multipower.png`) |
| 104 | Croci ai Cavi da Seduto | Petto | nessuna (ripiego inesistente `img/croci-ai-cavi-da-seduto.png`) |
| 105 | Plank | Core | nessuna (ripiego inesistente `img/plank.png`) |
| 106 | Plank Laterale | Core | nessuna (ripiego inesistente `img/plank-laterale.png`) |
| 107 | Crunch a Terra | Core | nessuna (ripiego inesistente `img/crunch-a-terra.png`) |
| 108 | Crunch al Cavo | Core | nessuna (ripiego inesistente `img/crunch-al-cavo.png`) |
| 109 | Leg Raise alla Sbarra | Core | nessuna (ripiego inesistente `img/leg-raise-alla-sbarra.png`) |
| 110 | Leg Raise a Terra | Core | nessuna (ripiego inesistente `img/leg-raise-a-terra.png`) |
| 111 | Russian Twist | Core | nessuna (ripiego inesistente `img/russian-twist.png`) |
| 112 | Mountain Climber | Core | nessuna (ripiego inesistente `img/mountain-climber.png`) |
| 113 | Hollow Hold | Core | nessuna (ripiego inesistente `img/hollow-hold.png`) |
| 114 | Ab Wheel | Core | nessuna (ripiego inesistente `img/ab-wheel.png`) |
| 115 | Pulley Basso Barra Larga (Presa Prona) | Schiena | nessuna (ripiego inesistente `img/pulley-basso-barra-larga.png`) |
| 116 | Pulley Basso Presa Inversa | Schiena | nessuna (ripiego inesistente `img/pulley-basso-presa-inversa.png`) |
| 117 | Pulley Basso a un Braccio | Schiena | nessuna (ripiego inesistente `img/pulley-basso-a-un-braccio.png`) |
| 118 | Lat Machine Triangolo (Presa Neutra) | Schiena | nessuna (ripiego inesistente `img/lat-machine-triangolo.png`) |
| 119 | Rematore Presa Inversa (Yates) | Schiena | nessuna (ripiego inesistente `img/rematore-presa-inversa.png`) |
| 120 | Trazioni Presa Neutra | Schiena | nessuna (ripiego inesistente `img/trazioni-presa-neutra.png`) |
| 121 | Croci ai Cavi Alti (Parte Bassa) | Petto | nessuna (ripiego inesistente `img/croci-ai-cavi-alti.png`) |
| 122 | Piegamenti Declinati (Piedi Rialzati) | Petto | nessuna (ripiego inesistente `img/piegamenti-declinati.png`) |
| 123 | Piegamenti a Diamante | Braccia | nessuna (ripiego inesistente `img/piegamenti-a-diamante.png`) |
| 124 | Adductor Machine | Gambe | nessuna (ripiego inesistente `img/adductor-machine.png`) |
| 125 | Calf Raise a un Piede (Corpo Libero) | Gambe | nessuna (ripiego inesistente `img/calf-raise-a-un-piede.png`) |
| 126 | Sissy Squat | Gambe | nessuna (ripiego inesistente `img/sissy-squat.png`) |
| 127 | Alzate Laterali alla Macchina | Spalle | nessuna (ripiego inesistente `img/alzate-laterali-alla-macchina.png`) |
| 128 | Pike Push-up | Spalle | nessuna (ripiego inesistente `img/pike-push-up.png`) |
| 129 | Curl ai Cavi con Corda (Presa Martello) | Braccia | nessuna (ripiego inesistente `img/curl-ai-cavi-con-corda.png`) |
| 130 | Curl Inverso con Bilanciere EZ | Braccia | nessuna (ripiego inesistente `img/curl-inverso-con-bilanciere-ez.png`) |
| 131 | Curl alla Macchina (Scott) | Braccia | nessuna (ripiego inesistente `img/curl-alla-macchina.png`) |
| 132 | Curl Zottman | Braccia | nessuna (ripiego inesistente `img/curl-zottman.png`) |
| 133 | Pushdown Presa Inversa | Braccia | nessuna (ripiego inesistente `img/pushdown-presa-inversa.png`) |
| 134 | Pushdown con Barra V | Braccia | nessuna (ripiego inesistente `img/pushdown-con-barra-v.png`) |
| 135 | Dip alla Macchina (Tricipiti) | Braccia | nessuna (ripiego inesistente `img/dip-alla-macchina.png`) |
| 136 | Crunch alla Macchina | Core | nessuna (ripiego inesistente `img/crunch-alla-macchina.png`) |
| 137 | Woodchop ai Cavi (Rotazioni) | Core | nessuna (ripiego inesistente `img/woodchop-ai-cavi.png`) |
| 138 | Leg Raise alla Sedia Romana | Core | nessuna (ripiego inesistente `img/leg-raise-alla-sedia-romana.png`) |
| 139 | Sit-up a Ginocchia Piegate | Core | nessuna (ripiego inesistente `img/sit-up-a-ginocchia-piegate.png`) |
| 140 | Squat Sumo | Gambe | da altro branch (non ancora presente su questo branch), file previsto `esercizi/ex-140-squat-sumo.svg` |

## 3. Esercizi senza immagine

114 esercizi (113 nel branch + 1 da altro branch, l'ultimo in coda con nota). Motivo per tutti: **nessun campo** in `IMMAGINI_ESERCIZI`, quindi l'app prova `img/<slug>.png`, il file non esiste e compare il segnaposto "Immagine in arrivo". Nessun file referenziato risulta assente su disco e non ci sono placeholder file.

| Gruppo | Esercizio | Motivo | File atteso dal ripiego |
|---|---|---|---|
| Gambe | Leg Press | nessun campo nella mappa | `img/leg-press.png` |
| Gambe | Affondi Manubri | nessun campo nella mappa | `img/affondi-manubri.png` |
| Gambe | Affondi in Camminata | nessun campo nella mappa | `img/affondi-in-camminata.png` |
| Gambe | Step-up su Panca | nessun campo nella mappa | `img/step-up-su-panca.png` |
| Gambe | Leg Extension | nessun campo nella mappa | `img/leg-extension.png` |
| Gambe | Leg Curl Sdraiato | nessun campo nella mappa | `img/leg-curl-sdraiato.png` |
| Gambe | Leg Curl Seduto | nessun campo nella mappa | `img/leg-curl-seduto.png` |
| Gambe | Calf Raise in Piedi | nessun campo nella mappa | `img/calf-raise-in-piedi.png` |
| Gambe | Calf Raise Seduto | nessun campo nella mappa | `img/calf-raise-seduto.png` |
| Glutei | Hip Thrust | nessun campo nella mappa | `img/hip-thrust.png` |
| Glutei | Stacco Rumeno | nessun campo nella mappa | `img/stacco-rumeno.png` |
| Glutei | Stacco Sumo | nessun campo nella mappa | `img/stacco-sumo.png` |
| Glutei | Affondi Bulgari | nessun campo nella mappa | `img/affondi-bulgari.png` |
| Glutei | Good Morning | nessun campo nella mappa | `img/good-morning.png` |
| Glutei | Ponte Glutei | nessun campo nella mappa | `img/ponte-glutei.png` |
| Glutei | Abductor Machine | nessun campo nella mappa | `img/abductor-machine.png` |
| Glutei | Kickback ai Cavi | nessun campo nella mappa | `img/kickback-ai-cavi.png` |
| Glutei | Slanci Laterali a Terra | nessun campo nella mappa | `img/slanci-laterali-a-terra.png` |
| Spalle | Military Press | nessun campo nella mappa | `img/military-press.png` |
| Spalle | Lento Avanti Manubri | nessun campo nella mappa | `img/lento-avanti-manubri.png` |
| Spalle | Arnold Press | nessun campo nella mappa | `img/arnold-press.png` |
| Spalle | Shoulder Press Machine | nessun campo nella mappa | `img/shoulder-press-machine.png` |
| Spalle | Tirate al Mento (Upright Row) | nessun campo nella mappa | `img/tirate-al-mento.png` |
| Spalle | Alzate Laterali | nessun campo nella mappa | `img/alzate-laterali.png` |
| Spalle | Alzate Frontali | nessun campo nella mappa | `img/alzate-frontali.png` |
| Spalle | Alzate Posteriori (Reverse Fly) | nessun campo nella mappa | `img/alzate-posteriori.png` |
| Spalle | Face Pull | nessun campo nella mappa | `img/face-pull.png` |
| Spalle | Scrollate (Shrug) | nessun campo nella mappa | `img/scrollate.png` |
| Braccia | Curl Bilanciere Bicipiti | nessun campo nella mappa | `img/curl-bilanciere-bicipiti.png` |
| Braccia | Curl Manubri Alternato | nessun campo nella mappa | `img/curl-manubri-alternato.png` |
| Braccia | Hammer Curl | nessun campo nella mappa | `img/hammer-curl.png` |
| Braccia | Curl su Panca Scott | nessun campo nella mappa | `img/curl-su-panca-scott.png` |
| Braccia | Curl ai Cavi | nessun campo nella mappa | `img/curl-ai-cavi.png` |
| Braccia | Curl di Concentrazione | nessun campo nella mappa | `img/curl-di-concentrazione.png` |
| Braccia | Pushdown Tricipiti ai Cavi | nessun campo nella mappa | `img/pushdown-tricipiti-ai-cavi.png` |
| Braccia | French Press | nessun campo nella mappa | `img/french-press.png` |
| Braccia | Panca Presa Stretta | nessun campo nella mappa | `img/panca-presa-stretta.png` |
| Braccia | Dip su Panca | nessun campo nella mappa | `img/dip-su-panca.png` |
| Braccia | Kickback Tricipiti | nessun campo nella mappa | `img/kickback-tricipiti.png` |
| Petto | Panca Piana Manubri | nessun campo nella mappa | `img/panca-piana-manubri.png` |
| Petto | Croci ai Cavi dal Basso | nessun campo nella mappa | `img/croci-ai-cavi-dal-basso.png` |
| Petto | Piegamenti Inclinati (Mani Rialzate) | nessun campo nella mappa | `img/piegamenti-inclinati.png` |
| Schiena | Rematore alla Macchina | nessun campo nella mappa | `img/rematore-alla-macchina.png` |
| Schiena | Pulldown a Braccia Tese | nessun campo nella mappa | `img/pulldown-a-braccia-tese.png` |
| Schiena | Trazioni Assistite (Macchina) | nessun campo nella mappa | `img/trazioni-assistite.png` |
| Schiena | Rematore Inverso (Corpo Libero) | nessun campo nella mappa | `img/rematore-inverso.png` |
| Gambe | Squat a Corpo Libero | nessun campo nella mappa | `img/squat-a-corpo-libero.png` |
| Gambe | Affondi Inversi | nessun campo nella mappa | `img/affondi-inversi.png` |
| Gambe | Nordic Curl | nessun campo nella mappa | `img/nordic-curl.png` |
| Gambe | Wall Sit | nessun campo nella mappa | `img/wall-sit.png` |
| Glutei | Pull-Through ai Cavi | nessun campo nella mappa | `img/pull-through-ai-cavi.png` |
| Glutei | Ponte Glutei a una Gamba | nessun campo nella mappa | `img/ponte-glutei-a-una-gamba.png` |
| Glutei | Abduzioni ai Cavi | nessun campo nella mappa | `img/abduzioni-ai-cavi.png` |
| Spalle | Landmine Press | nessun campo nella mappa | `img/landmine-press.png` |
| Spalle | Y-Raise su Panca Inclinata | nessun campo nella mappa | `img/y-raise-su-panca-inclinata.png` |
| Braccia | Curl con Bilanciere EZ | nessun campo nella mappa | `img/curl-con-bilanciere-ez.png` |
| Braccia | Spider Curl | nessun campo nella mappa | `img/spider-curl.png` |
| Braccia | Pushdown con Corda | nessun campo nella mappa | `img/pushdown-con-corda.png` |
| Core | Pallof Press | nessun campo nella mappa | `img/pallof-press.png` |
| Core | Dead Bug | nessun campo nella mappa | `img/dead-bug.png` |
| Core | Bird Dog | nessun campo nella mappa | `img/bird-dog.png` |
| Core | Farmer Walk | nessun campo nella mappa | `img/farmer-walk.png` |
| Braccia | Estensione Tricipiti sopra la Testa ai Cavi | nessun campo nella mappa | `img/estensione-tricipiti-sopra-la-testa-ai-cavi.png` |
| Braccia | Estensione Tricipiti sopra la Testa con Manubrio | nessun campo nella mappa | `img/estensione-tricipiti-sopra-la-testa-con-manubrio.png` |
| Braccia | Curl su Panca Inclinata | nessun campo nella mappa | `img/curl-su-panca-inclinata.png` |
| Braccia | Curl Bayesiano ai Cavi | nessun campo nella mappa | `img/curl-bayesiano-ai-cavi.png` |
| Spalle | Alzate Laterali ai Cavi | nessun campo nella mappa | `img/alzate-laterali-ai-cavi.png` |
| Spalle | Reverse Pec Deck | nessun campo nella mappa | `img/reverse-pec-deck.png` |
| Schiena | Rematore con Petto Appoggiato | nessun campo nella mappa | `img/rematore-con-petto-appoggiato.png` |
| Schiena | Lat Machine a un Braccio | nessun campo nella mappa | `img/lat-machine-a-un-braccio.png` |
| Gambe | Pendulum Squat | nessun campo nella mappa | `img/pendulum-squat.png` |
| Gambe | Squat al Multipower | nessun campo nella mappa | `img/squat-al-multipower.png` |
| Gambe | Calf Raise alla Leg Press | nessun campo nella mappa | `img/calf-raise-alla-leg-press.png` |
| Gambe | Stacco con Trap Bar | nessun campo nella mappa | `img/stacco-con-trap-bar.png` |
| Glutei | Hip Thrust alla Macchina | nessun campo nella mappa | `img/hip-thrust-alla-macchina.png` |
| Glutei | Hyperextension a 45° per Glutei | nessun campo nella mappa | `img/hyperextension-a-45-per-glutei.png` |
| Glutei | Affondi al Multipower (Piede Rialzato) | nessun campo nella mappa | `img/affondi-al-multipower.png` |
| Petto | Croci ai Cavi da Seduto | nessun campo nella mappa | `img/croci-ai-cavi-da-seduto.png` |
| Core | Plank | nessun campo nella mappa | `img/plank.png` |
| Core | Plank Laterale | nessun campo nella mappa | `img/plank-laterale.png` |
| Core | Crunch a Terra | nessun campo nella mappa | `img/crunch-a-terra.png` |
| Core | Crunch al Cavo | nessun campo nella mappa | `img/crunch-al-cavo.png` |
| Core | Leg Raise alla Sbarra | nessun campo nella mappa | `img/leg-raise-alla-sbarra.png` |
| Core | Leg Raise a Terra | nessun campo nella mappa | `img/leg-raise-a-terra.png` |
| Core | Russian Twist | nessun campo nella mappa | `img/russian-twist.png` |
| Core | Mountain Climber | nessun campo nella mappa | `img/mountain-climber.png` |
| Core | Hollow Hold | nessun campo nella mappa | `img/hollow-hold.png` |
| Core | Ab Wheel | nessun campo nella mappa | `img/ab-wheel.png` |
| Schiena | Pulley Basso Barra Larga (Presa Prona) | nessun campo nella mappa | `img/pulley-basso-barra-larga.png` |
| Schiena | Pulley Basso Presa Inversa | nessun campo nella mappa | `img/pulley-basso-presa-inversa.png` |
| Schiena | Pulley Basso a un Braccio | nessun campo nella mappa | `img/pulley-basso-a-un-braccio.png` |
| Schiena | Lat Machine Triangolo (Presa Neutra) | nessun campo nella mappa | `img/lat-machine-triangolo.png` |
| Schiena | Rematore Presa Inversa (Yates) | nessun campo nella mappa | `img/rematore-presa-inversa.png` |
| Schiena | Trazioni Presa Neutra | nessun campo nella mappa | `img/trazioni-presa-neutra.png` |
| Petto | Croci ai Cavi Alti (Parte Bassa) | nessun campo nella mappa | `img/croci-ai-cavi-alti.png` |
| Petto | Piegamenti Declinati (Piedi Rialzati) | nessun campo nella mappa | `img/piegamenti-declinati.png` |
| Braccia | Piegamenti a Diamante | nessun campo nella mappa | `img/piegamenti-a-diamante.png` |
| Gambe | Adductor Machine | nessun campo nella mappa | `img/adductor-machine.png` |
| Gambe | Calf Raise a un Piede (Corpo Libero) | nessun campo nella mappa | `img/calf-raise-a-un-piede.png` |
| Gambe | Sissy Squat | nessun campo nella mappa | `img/sissy-squat.png` |
| Spalle | Alzate Laterali alla Macchina | nessun campo nella mappa | `img/alzate-laterali-alla-macchina.png` |
| Spalle | Pike Push-up | nessun campo nella mappa | `img/pike-push-up.png` |
| Braccia | Curl ai Cavi con Corda (Presa Martello) | nessun campo nella mappa | `img/curl-ai-cavi-con-corda.png` |
| Braccia | Curl Inverso con Bilanciere EZ | nessun campo nella mappa | `img/curl-inverso-con-bilanciere-ez.png` |
| Braccia | Curl alla Macchina (Scott) | nessun campo nella mappa | `img/curl-alla-macchina.png` |
| Braccia | Curl Zottman | nessun campo nella mappa | `img/curl-zottman.png` |
| Braccia | Pushdown Presa Inversa | nessun campo nella mappa | `img/pushdown-presa-inversa.png` |
| Braccia | Pushdown con Barra V | nessun campo nella mappa | `img/pushdown-con-barra-v.png` |
| Braccia | Dip alla Macchina (Tricipiti) | nessun campo nella mappa | `img/dip-alla-macchina.png` |
| Core | Crunch alla Macchina | nessun campo nella mappa | `img/crunch-alla-macchina.png` |
| Core | Woodchop ai Cavi (Rotazioni) | nessun campo nella mappa | `img/woodchop-ai-cavi.png` |
| Core | Leg Raise alla Sedia Romana | nessun campo nella mappa | `img/leg-raise-alla-sedia-romana.png` |
| Core | Sit-up a Ginocchia Piegate | nessun campo nella mappa | `img/sit-up-a-ginocchia-piegate.png` |
| Gambe | Squat Sumo (n. 140) | da altro branch: non ancora presente su questo branch | `esercizi/ex-140-squat-sumo.svg` (previsto) |

### Esercizio da altro branch: n. 140 Squat Sumo

| Voce | Valore |
|---|---|
| Numero | 140 |
| Gruppo | Gambe |
| Tipo | multiarticolare |
| Attrezzo | manubrio/kettlebell |
| Bersaglio | adduttori |
| Provenienza | introdotto nel branch `claude/hopeful-thompson-uthd8f` (commit fe38769), non ancora presente su `claude/immagini-esercizi` |
| File previsto | `esercizi/ex-140-squat-sumo.svg` |
| Voce da aggiungere in `IMMAGINI_ESERCIZI` | `'Squat Sumo': 'esercizi/ex-140-squat-sumo.svg'` |
| Atleta | 140 e' pari: donna (regola pari = donna) |
| Ordine di lavorazione | in coda |
| Passi | 1) fare il merge di `claude/hopeful-thompson-uthd8f` in questo branch prima di toccare `js/dati/disegni-esercizi.js`; 2) aggiungere la voce nella mappa; 3) `npm run sw` |

Controlli: file referenziati ma assenti = 0; voci di mappa non presenti in libreria = 0.

## 4. Orfani

| File | Peso | Note |
|---|---|---|
| `esercizi/ex-02-panca-inclinata-su-a.svg` | 30.9 KB | Non referenziato da `IMMAGINI_ESERCIZI`. E' il fotogramma "su" (posa alta) usato per costruire `ex-02-panca-inclinata.svg` (vedi commento SVG: "giu-a spostata di 13px per combaciare con su-a"). Unico SVG senza animazione ne' metadati C2PA, con sfondo `rect` bianco. Resta nel precache. |

## 5. Precache sw.js

- Cache: `CACHE_NAME = '3in-v10'` (cambiare il nome butta le copie vecchie).
- Le immagini SONO nel precache: elenco **statico** tra i marcatori `/*INIZIO-ASSET*/ ... /*FINE-ASSET*/`, con 27 righe `./esercizi/*.svg` (compreso l'orfano).
- L'elenco e' rigenerato da `tools/genera-sw.js` (`npm run sw`, `-- --check` per verificarlo): fa un glob di `esercizi/*.svg` (solo `.svg`, ordinato), piu' index, manifest, icone e i riferimenti di `index.html`. Quindi un nuovo SVG in `esercizi/` entra nel precache dopo `npm run sw`; PNG/WebP no (andrebbe esteso il filtro).
- Install: `Promise.allSettled(ASSETS.map(cache.add))`, un file mancante non blocca gli altri.
- Fetch: network-first con fallback alla cache, e le risposte vengono messe in cache a runtime (`cache.put`). Per immagini non trovate (png/jpg/jpeg/webp/svg) risponde 404 pulito, cosi si vede il segnaposto.
- Promemoria: dopo aver aggiunto immagini, rilanciare `npm run sw` e alzare la versione della cache.
- Manifest/README: nessun riferimento alle immagini (solo `docs/ARCHITETTURA.md`: "esercizi/ disegni SVG degli esercizi").

## 6. Stile e convenzioni delle immagini esistenti

### Provenienza (tracce trovate)

- Ogni SVG (tranne `-su-a`, che ha solo il commento) contiene il commento `<!-- SVG created with Arrow, by QuiverAI (https://quiver.ai) -->`: conferma Quiver.ai, modello **Arrow**. Il commento di `ex-02-...-su-a.svg` e' l'unica traccia della versione originale grezza.
- Gli altri 9 SVG hanno un blocco `<metadata><c2pa:manifest>` (Content Credentials C2PA, base64) con ingredient `image/svg+xml` e relazione `parentOf`; nessun prompt leggibile.
- **Prompt: non trovati** ne' nei file, ne' nei commit, ne' nei docs. Il commento di assemblaggio descrive il lavoro successivo (nome dei fotogrammi sorgente come "ex-04-a", "ex-05-v2-a", "su-a", "giu-a", offset di allineamento).
- Commit: `3593a20` (26 set 2026, upload manuale di ex-01 e ex-02-su-a), `5849241` (30 set, spostamento in `esercizi/`, nessun prompt). Nessun commit parla di prompt.
- Nel codice (`disegni-esercizi.js`): "Illustrazioni animate create con Quiver AI".

### Dati tecnici

| File | KB | viewBox |
|---|---|---|
| `ex-01-panca-piana.svg` | 59.0 | 0 0 400 300 |
| `ex-02-panca-inclinata-su-a.svg` | 30.9 | 0 0 400 300 |
| `ex-02-panca-inclinata.svg` | 66.7 | 0 0 400 300 |
| `ex-03-panca-inclinata-manubri.svg` | 55.4 | 0 0 400 300 |
| `ex-04-panca-declinata.svg` | 31.4 | 226 84 200 150 |
| `ex-05-chest-press.svg` | 38.2 | 228 20 240 180 |
| `ex-06-dip-parallele.svg` | 33.7 | 152 0 387 290 |
| `ex-07-push-up.svg` | 24.5 | 0 25 40 30 |
| `ex-08-croci-cavi.svg` | 48.4 | 170 22 313 235 |
| `ex-09-croci-panca-manubri.svg` | 37.8 | 170 30 300 225 |
| `ex-10-pectoral-machine.svg` | 31.4 | 147.5 8 360.0 270 |
| `ex-11-pullover-manubrio.svg` | 16.2 | 220.5 54 201 150.75 |
| `ex-12-stacco-da-terra.svg` | 32.4 | 150.8 10.3 363.6 272.7 |
| `ex-13-trazioni-sbarra.svg` | 24.9 | 132 3 388 291 |
| `ex-14-trazioni-presa-inversa.svg` | 23.6 | 136 3 384 288 |
| `ex-15-lat-machine.svg` | 33.3 | 164.4 26.7 329.3 246.9 |
| `ex-16-lat-machine-presa-inversa.svg` | 29.2 | 159.0 6.0 336.7 252.5 |
| `ex-17-rematore-bilanciere.svg` | 20.8 | 167.4 25.5 323.3 242.5 |
| `ex-18-rematore-manubrio.svg` | 21.0 | 220.0 69.4 213.9 160.4 |
| `ex-19-t-bar-row.svg` | 20.9 | 208.4 39.6 238.8 179.1 |
| `ex-20-pulley-basso.svg` | 18.1 | 217.3 70.7 212.0 159.0 |
| `ex-21-pullover-ai-cavi.svg` | 19.0 | -26.11 5.22 92.99 69.74 |
| `ex-22-hyperextension-lombari.svg` | 17.0 | 174.1 30.7 308.5 231.4 |
| `ex-23-squat-bilanciere.svg` | 23.0 | 157.39 16.11 333.82 250.36 |
| `ex-24-front-squat.svg` | 26.3 | 143.10 6.70 366.00 274.50 |
| `ex-26-hack-squat.svg` | 17.3 | 186.00 43.50 284.00 213.00 |

Formato SVG vettoriale (nessun PNG/WebP); peso medio 30.7 KB, totale 828.1 KB (27 file con l'orfano). Il viewBox base e' 400x300 (rapporto 4:3); gli altri sono ritagli sulla figura (rapporti diversi, da 40x30 a 388x291). Nessun attributo width/height (tranne l'orfano 400x300): scalano al riquadro CSS `.ex-img` (`object-fit: contain`, rapporto 300/165).

### Convenzione nome file

`ex-NN-slug-esercizio.svg`, NN a due cifre progressivo (01-09), slug minuscolo senza accenti con trattini, in italiano. Il nome esercizio e' associato in `IMMAGINI_ESERCIZI` (chiave = nome senza emoji). Suffissi `-a` / `-su-a` indicano i fotogrammi sorgente. Ripiego storico: `img/<slug>.png`.

### Style guide per nuovi prompt

Illustrazioni vettoriali di una figura umana che esegue l'esercizio, in due pose (fine corsa basso e alto) sovrapposte e alternate in dissolvenza (loop CSS). Il tratto e' scuro e sottile su fondo trasparente/chiaro, con riempimenti piatti in grigi freddi per attrezzi e panche e carnagione calda per la figura; nessun testo.

- Formato: SVG pulito, `fill="none"` sul root, `role="img"` e `aria-label` in italiano (es. "Panca piana con bilanciere").
- Inquadratura: profilo laterale (panche, chest press, dip, push-up) o frontale (croci); scena intera con attrezzo, figura centrata, ritaglio stretto sul soggetto. Base 400x300.
- Sfondo: nessuno opaco; al piu' un `rect` bianco semitrasparente (`fill-opacity .6-.7`) e un'ombra a terra ellittica grigio chiaro (`#D9D9D9`, `#C4C4C4` con opacity .5; contatto `#76777C`). Nel tema scuro l'app dipinge dietro un riquadro chiaro.
- Palette (colori piu' frequenti): contorni quasi neri `#151617`, `#191919`, `#121212`, `#1D1D1D`; riempimenti scuri `#333`, `#2D2D2D`, `#333536`, `#232323`, `#252728`, `#222`; metalli/attrezzi grigio-azzurri `#8a919c`, `#A6A8AC`, `#81858C`, `#7D8087`, `#56585D`/`#54585D`; pelle `#FFB588`, `#D1B9A8`, ombre pelle `#AD998E`, `#9B8B81`, `#77665D`; bianco `#fff`.
- Tratto: `stroke-linecap="round"`, spessori molto sottili in unita' viewBox (`.31` `.41` `.52` `.58` `.60` `.8065`), `.8065` il piu' usato; molti piccoli path per muscoli e pieghe (50-200 path per file), niente gradienti, filtri o testo.
- Figura: anatomia realistica semplificata, abbigliamento scuro (canotta/pantaloni `#333`), muscoli con ombreggiatura a campiture piatte; attrezzi con dettagli (dischi, borchie, cavi).
- Animazione: due gruppi `#f-giu` e `#f-su` (classe `.fr`) sovrapposti; CSS `3.2s ease-in-out infinite`, keyframes `0%,30%{opacity:1} 45%,80%{opacity:0} 95%,100%{opacity:1}` (e inverso); `@media (prefers-reduced-motion:reduce)` ferma l'animazione. La seconda posa e' spesso la prima specchiata/traslata (`translate(400 0) scale(-1 1)`).
- Per prompt coerenti: chiedere "pose basse e alte dello stesso esercizio, stessa inquadratura e stessa posizione dell'attrezzo, fondo trasparente, nessun testo, tratto scuro sottile, colori grigio freddo + pelle calda".

File di esempio: `esercizi/ex-01-panca-piana.svg` (profilo, 2 fotogrammi, 400x300), `esercizi/ex-08-croci-cavi.svg` (frontale, torri allineate), `esercizi/ex-07-push-up.svg` (profilo a terra, il piu' leggero, 25.1 KB).

## Da rivedere a fine lavoro

Elenco delle illustrazioni da rivedere o rifare a fine lavoro. La lista si aggiorna man mano e l'utente decide alla fine quali rifare.

| Esercizio | File | Motivo | Stato |
|---|---|---|---|
| 19 - T-Bar Row | `esercizi/ex-19-t-bar-row.svg` | Segnato dall'utente come "non convince del tutto"; da rivedere/rifare alla fine con gli altri. Difetti noti: pelle grigio-beige scura, in END il disco sfiora la maniglia, romboidi non distinti dal trapezio. Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la d; la c e' buona ma ha la barra curva in END). | Da rivedere |
| 26 - Hack Squat | `esercizi/ex-26-hack-squat.svg` | Bozza a (prova del prompt Quiver riscritto in positivo), la migliore: START in piedi reclinato sulla slitta con cursore alto, END squat con cosce circa parallele, un'unica macchina completa per frame, mani sulle impugnature, quadricipiti #fb8b3c e glutei #fdba8c esatti. Difetti lievi: macchina statica presa dal START (telaio, base, piattaforma) con in END solo slitta, pad e disco traslati lungo la guida; la guida esterna in alto e' ricostruita con un raccordo (leggera giunzione visibile); in END la punta della scarpa sporge di circa 6 unita' oltre la piattaforma statica; gambe sottili e secondari poco estesi (solo un quadricipite e un gluteo per frame). Rimossi rect bianco (opacity .6) e 6 tratti vuoti. Alternative: bozze a, b, c, d in `esercizi-bozze/` (la b ha rect bianco e 10 tratti #D3D3D3 opacity .3 sparsi; la c ha tratti #F0F0F0 sparsi, rect bianco e arancioni #FF8F54/#FDB289 fuori palette; la d ha rect bianco, arancioni #FF7932/#FF7C36/#FFB587 fuori palette e in END manca lo stinco). | Difetto lieve, da valutare |
| 25 - Goblet Squat | `esercizi/ex-25-goblet-squat.svg` | Bozza c, la migliore ma non impeccabile (le altre avevano pose meno nette o tratti vaganti). Un solo manubrio verticale tenuto al petto con entrambe le mani in START e END; START in piedi ed END squat profondo con gomiti dentro le ginocchia, ben distinti. In END un piccolo vuoto sul dorso (si intravede il bianco dello sfondo, come una canottiera chiara) e la gamba arretrata e' un po' sfumata;. | Difetto lieve, da valutare |
| 24 - Front Squat | `esercizi/ex-24-front-squat.svg` | Bozza a, la migliore ma non impeccabile. Pose corrette (START in piedi con gomiti alti, END squat profondo con cosce circa parallele e busto ancora molto verticale), stessa atleta e capi nei due frame, nessun pezzo di macchina. Difetti: il bilanciere si legge solo come disco sulla spalla, centrato dietro il collo/spalla anziche' davanti sulle clavicole, e tra disco e braccia la barra non si vede; le mani non impugnano visibilmente la barra (braccia incrociate sul petto, presa a braccia incrociate); secondari (glutei, core, erettori) poco leggibili (solo striature pelle, nessun arancione chiaro #fdba8c); arancioni #FF8236/#FF7F31 (non esattamente #fb8b3c); in END un piccolo vuoto bianco tra reggiseno e disco e un riflesso crema sul ginocchio. Rimossi rect bianco e seconda ombra (END traslato di 152,1.5; ombra statica dal frame START). Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la a; la b ha clipPath, matrix(3.75), rect bianco, trattini #DADADA sparsi e secondari assenti; la c ha cerchio bianco r=150, gambe senza leggings visibili, secondo disco piu' piccolo disallineato davanti e arancioni non conformi; la d ha rect bianco e la barra orizzontale lungo l'asse sagittale, dal disco dietro la testa fino alle mani, quindi geometria sbagliata e END con gamba lontana confusa). | Difetto non lieve, da valutare |
| 23 - Squat con Bilanciere | `esercizi/ex-23-squat-bilanciere.svg` | Bozza a, la migliore ma non impeccabile. Pose corrette (START in piedi, END squat profondo con cosce circa parallele e busto inclinato circa 30-35 gradi), rack con 2 montanti completi e identici nei due frame, bilanciere con dischi sul trapezio in entrambi. Secondari poco visibili (solo una striscia di erettori arancione chiaro, adduttori/femorali non distinti); pelle chiara; arancioni #FF8641/#FD8641 (non esattamente #fb8b3c). Rack, ombra e pavimento statici presi dal frame START (END traslato di 149,6): in END le braccia di sicurezza passano dietro bacino e ginocchio. Rimossi rect bianco, 7 tratti decorativi grigio chiaro e la doppia ombra dell'END. Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la a; la b ha clipPath, matrix(3.75) e rect bianco, e senza secondari; la c ha feBlend, rect bianco, arancione rossastro, tratti decorativi sparsi e in END l'atleta con piedi sollevati e secondo disco disallineato; la d ha viso START malformato, cerchio bianco r=150 e rack END senza il braccio di sicurezza sinistro). | Difetto lieve, da valutare |
| 22 - Hyperextension (Lombari) | `esercizi/ex-22-hyperextension-lombari.svg` | Nessuna bozza e' impeccabile. Panca (cuscino, rulli, base) statica presa dalla posa START: in END la panca della bozza era leggermente piu' lunga (cuscino spostato di circa 125, rulli di circa 137), quindi il frame END e' allineato sui piedi/rulli (traslazione 136) e il bacino e' circa 11 unita' verso il cuscino (la coscia entra un poco nel cuscino). END con schiena un po' iperestesa (busto piu' verticale della linea testa-talloni); viso senza tratti, mani incrociate poco leggibili; muscoli #FC9046/#FFB58A (non esattamente #fb8b3c/#fdba8c); erettori in START poco estesi. Gradienti (maniglia dorsale) sostituiti da colore pieno #2C2B2D, rect bianco e gruppo opacity .6 della bozza d rimossi (altrimenti pallida). Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la d; la a ha cerchi bianchi sulla spalla e top che sparisce in END, la b non ha il cuscino cosce e ha il rect bianco, la c ha in END una panca diversa con triangolo pieno grigio e il cerchio bianco r=150). | Difetto lieve, da valutare |
| 21 - Pullover ai Cavi | `esercizi/ex-21-pullover-ai-cavi.svg` | In START i gomiti sono piegati (non quasi tesi) e la testa e' coperta dalle braccia; in END il cavo termina in un anellino che sta circa 0,5 unita' sopra la barra (piccolo vuoto); il pacco pesi e' statico (non sale col cavo); il viewBox 4:3 lascia ampi margini bianchi ai lati perche' la figura e' alta e stretta; muscoli arancioni nei colori della bozza (#FF8445/#FF8B4F, non esattamente #fb8b3c); sfondo grigio #F2F2F2 e clipPath della bozza rimossi. Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la d; la a ha testa START malformata e tratti decorativi tratteggiati, la b ha secondari poco visibili e barra minuscola, la c ha collo/testa malformati in END). | Difetto lieve, da valutare |
| 20 - Pulley Basso | `esercizi/ex-20-pulley-basso.svg` | In END il dorsale arancione si vede poco (resta una striscia sul bordo, deltoide posteriore chiaro); romboidi e trapezio medio non distinti. Seduta e macchina sono statiche e prese dalla posa START (nella bozza c il sedile e la base in END erano spostati di circa 12 unita'), quindi in END il bacino e' piu' vicino alla torre di circa 12 unita' (sul sedile comunque); cavo e pacco pesi (rialzato di 16.5) ricostruiti. Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la c; a ha macchina enorme e blob grigio, b ha rect #F2F2F2 e pacco pesi spezzato, d ha cavo incoerente tra i frame e molti path vuoti). | Difetto lieve, da valutare |
| 15 - Lat Machine | `esercizi/ex-15-lat-machine.svg` | In END barra un po' alta, gola/clavicole. | Difetto lieve, da valutare |
| 16 - Lat Machine Presa Inversa | `esercizi/ex-16-lat-machine-presa-inversa.svg` | Presa supina poco leggibile di profilo; poco arancione sui dorsali in END. | Difetto lieve, da valutare |
| 17 - Rematore con Bilanciere | `esercizi/ex-17-rematore-bilanciere.svg` | In END anca un po' piu' arretrata/alta che in START. | Difetto lieve, da valutare |
| 18 - Rematore con Manubrio | `esercizi/ex-18-rematore-manubrio.svg` | Arancione piu' marcato in START che in END. | Difetto lieve, da valutare |
