# Inventario esercizi e immagini

Generato con uno script node che legge `EXERCISE_LIBRARY` (`js/dati/libreria-esercizi.js`) e la mappa `IMMAGINI_ESERCIZI` (`js/dati/disegni-esercizi.js`), poi controlla il disco. Ramo: `claude/immagini-esercizi`.

## 1. Riepilogo numeri

| Voce | Valore |
|---|---|
| Esercizi nel catalogo (`EXERCISE_LIBRARY`) | 140 totali (139 nel branch + 1 da altro branch) |
| Con immagine (campo presente e file esistente) | 47 (di cui 1 con immagine condivisa: ex-29 usa il file di ex-28) |
| Senza immagine (mancanti) | 93 su 140 (92 nel branch + 1 da altro branch) |
| Di cui non ancora presenti in questo branch | 1 (n. 140 Squat Sumo, da `claude/hopeful-thompson-uthd8f`) |
| File in `esercizi/` | 47 (tutti SVG) |
| File orfani (non referenziati) | 1 (`ex-02-panca-inclinata-su-a.svg`) |
| Peso totale `esercizi/` | 1086.2 KB |
| Peso medio per file | 23.1 KB |

Copertura per gruppo muscolare:

| Gruppo | Esercizi | Con immagine | Senza |
|---|---|---|---|
| Petto | 17 | 11 | 6 |
| Schiena | 23 | 11 | 12 |
| Gambe | 25 (24 nel branch + 1 da altro branch) | 13 | 12 (11 nel branch + 1 da altro branch) |
| Glutei | 15 | 9 | 6 |
| Spalle | 16 | 3 | 13 |
| Braccia | 26 | 0 | 26 |
| Core | 18 | 0 | 18 |

Note: gli esercizi usati in `schede-*.js` e le chiavi di `DETTAGLI` (139) coincidono con la libreria: nessun esercizio fuori catalogo. `tools/genera-catalogo.js` NON riguarda gli esercizi: genera il catalogo delle regole del coach da `docs/coach-mappa-regole.md`.

Le bozze Quiver non finali (varianti a-d degli esercizi 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 e 28, 30, 31, 32, 33, 34, 35, 36, 37 e 39 e 40 e 41 e 42 e 43 e 44 e 45 e 46 e 47, di cui la b per il 10, la d per l'11, la d per il 13, la a per il 14, la a per il 15, identica alla d, la d per il 16 e la c per il 17 e la d per il 18 e la d per il 19 e la c per il 20 e la d per il 21 e la d per il 22 e la a per il 23 e la a per il 24 e la c per il 25 e la a per il 26 e la d per il 27 e la a per il 28 e la c per il 30 e la a per il 31 e la a per il 32 e la b per il 33 e la c per il 34 e la b per il 35 e la b per il 36 e la a per il 39 e la a per il 40 e la d per il 41 (la a e' presente in due copie identiche) e la d per il 42 e la c per il 43 e la a per il 44 e la d per il 45 e la b per il 46 e la c per il 47, sono state usate per il finale) stanno in `esercizi-bozze/`, fuori da `esercizi/` e dalla cache del service worker.

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
| 27 | Leg Press | Gambe | `esercizi/ex-27-leg-press.svg` |
| 28 | Affondi Manubri | Gambe | `esercizi/ex-28-affondi-manubri.svg` |
| 29 | Affondi in Camminata | Gambe | con immagine condivisa con ex-28 (Affondi Manubri): `esercizi/ex-28-affondi-manubri.svg` |
| 30 | Step-up su Panca | Gambe | `esercizi/ex-30-step-up-su-panca.svg` |
| 31 | Leg Extension | Gambe | `esercizi/ex-31-leg-extension.svg` |
| 32 | Leg Curl Sdraiato | Gambe | `esercizi/ex-32-leg-curl-sdraiato.svg` |
| 33 | Leg Curl Seduto | Gambe | `esercizi/ex-33-leg-curl-seduto.svg` |
| 34 | Calf Raise in Piedi | Gambe | `esercizi/ex-34-calf-raise-in-piedi.svg` |
| 35 | Calf Raise Seduto | Gambe | `esercizi/ex-35-calf-raise-seduto.svg` |
| 36 | Hip Thrust | Glutei | `esercizi/ex-36-hip-thrust.svg` |
| 37 | Stacco Rumeno | Glutei | `esercizi/ex-37-stacco-rumeno.svg` |
| 38 | Stacco Sumo | Glutei | `esercizi/ex-38-stacco-sumo.svg` |
| 39 | Affondi Bulgari | Glutei | `esercizi/ex-39-affondi-bulgari.svg` |
| 40 | Good Morning | Glutei | `esercizi/ex-40-good-morning.svg` |
| 41 | Ponte Glutei | Glutei | `esercizi/ex-41-ponte-glutei.svg` |
| 42 | Abductor Machine | Glutei | `esercizi/ex-42-abductor-machine.svg` |
| 43 | Kickback ai Cavi | Glutei | `esercizi/ex-43-kickback-ai-cavi.svg` |
| 44 | Slanci Laterali a Terra | Glutei | `esercizi/ex-44-slanci-laterali-a-terra.svg` |
| 45 | Military Press | Spalle | `esercizi/ex-45-military-press.svg` |
| 46 | Lento Avanti Manubri | Spalle | `esercizi/ex-46-lento-avanti-manubri.svg` |
| 47 | Arnold Press | Spalle | `esercizi/ex-47-arnold-press.svg` |
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

93 esercizi (92 nel branch + 1 da altro branch, l'ultimo in coda con nota). Motivo per tutti: **nessun campo** in `IMMAGINI_ESERCIZI`, quindi l'app prova `img/<slug>.png`, il file non esiste e compare il segnaposto "Immagine in arrivo". Nessun file referenziato risulta assente su disco e non ci sono placeholder file.

| Gruppo | Esercizio | Motivo | File atteso dal ripiego |
|---|---|---|---|
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
- Le immagini SONO nel precache: elenco **statico** tra i marcatori `/*INIZIO-ASSET*/ ... /*FINE-ASSET*/`, con 28 righe `./esercizi/*.svg` (compreso l'orfano).
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
| `ex-27-leg-press.svg` | 18.2 | 225.70 57.50 205.60 154.20 |
| `ex-28-affondi-manubri.svg` | 11.3 | 123.52 12.20 350.67 263.00 |
| `ex-30-step-up-su-panca.svg` | 10.8 | 153.28 13.12 363.44 272.58 |
| `ex-31-leg-extension.svg` | 9.4 | 66.18 -0.50 399.33 299.50 |
| `ex-32-leg-curl-sdraiato.svg` | 9.5 | 246.53 73.91 157.43 118.07 |
| `ex-33-leg-curl-seduto.svg` | 10.6 | 211.29 57.82 234.77 176.08 |
| `ex-34-calf-raise-in-piedi.svg` | 13.4 | 115.25 -20 413.1 309.8 |
| `ex-35-calf-raise-seduto.svg` | 9.3 | 193.32 42.72 267.7 200.8 |
| `ex-36-hip-thrust.svg` | 10.2 | 249.89 95.55 148.40 111.30 |
| `ex-37-stacco-rumeno.svg` | 12.1 | 172.02 23.48 325.40 244.05 |
| `ex-38-stacco-sumo.svg` | 32.9 | 150.8 10.3 363.6 272.7 (come ex-12, copia modificata) |
| `ex-39-affondi-bulgari.svg` | 11.6 | 192.90 48.26 262.64 196.98 |
| `ex-40-good-morning.svg` | 11.4 | 356.86 43.16 289.72 217.29 (3 pose) |
| `ex-41-ponte-glutei.svg` | 11.5 | 444.00 120.51 114.00 85.50 (3 pose) |
| `ex-42-abductor-machine.svg` | 20.8 | 807.41 94.30 139.73 104.80 (5 pose) |
| `ex-43-kickback-ai-cavi.svg` | 8.1 | 811.4 75.5 133.3 100 (5 pose) |
| `ex-44-slanci-laterali-a-terra.svg` | 7.4 | 845.5 120.5 70 52.5 (5 pose) |
| `ex-45-military-press.svg` | 16.5 | 756.7 49 250.67 188 (5 pose) |
| `ex-46-lento-avanti-manubri.svg` | 10.7 | 784 66 200 150 (5 pose) |
| `ex-47-arnold-press.svg` | 12.4 | 766 68 213.33 160 (5 pose) |

Formato SVG vettoriale (nessun PNG/WebP); peso medio 23.1 KB, totale 1086.2 KB (47 file con l'orfano). Il viewBox base e' 400x300 (rapporto 4:3); gli altri sono ritagli sulla figura (rapporti diversi, da 40x30 a 388x291). Nessun attributo width/height (tranne l'orfano 400x300): scalano al riquadro CSS `.ex-img` (`object-fit: contain`, rapporto 300/165).

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

Nota formato: da ex-40 in poi le animazioni sono a 3 pose (START/MID/END, gruppi `#f-giu`/`#f-mid`/`#f-su` con classe `.fr`, ciclo START > MID > END > MID > START). Standard di animazione (da riusare per le 3 pose; ritmo veloce, rivisto su richiesta dell'utente): durata 3.6 s (1% = 36 ms), `.fr{animation:3.6s linear infinite}` (timing lineare: un easing ease-in-out su ogni intervallo ferma la dissolvenza sulla posa MID e crea pulsazioni), hold molto brevi di circa 0.11 s per lato su START (0-3% e 97-100%, in tutto circa 0.22 s a cavallo del ciclo) e su END (47-53%, circa 0.22 s), transizioni singole START>MID, MID>END e ritorni di 22% (circa 0.79 s) ciascuna, MID a 25% e 75%; crossfade con opacita' complementari (somma = 1 in ogni istante, verificato ogni 50 ms su un ciclo in Chromium: somma 1.0000, passo massimo 0.063 per 50 ms, nessuno scatto al wrap). Keyframes: `giu{0%,3%{opacity:1}25%,75%{opacity:0}97%,100%{opacity:1}}`, `mid{0%,3%{opacity:0}25%{opacity:1}47%,53%{opacity:0}75%{opacity:1}97%,100%{opacity:0}}`, `su{0%,25%{opacity:0}47%,53%{opacity:1}75%,100%{opacity:0}}`; `@media (prefers-reduced-motion:reduce){.fr{animation:none}#f-mid,#f-su{opacity:0}}` (solo START visibile). Valutato e scartato: crossfade piu' stretto attorno alla meta' della transizione (con somma = 1 richiede curve ripide e rende il movimento a scatti). Gli esercizi ex-15...ex-39 sono a 2 pose (START/END, ciclo 3.2 s): candidati a un eventuale rifacimento a 3 pose a fine lavoro.

### Formato a 5 pose (primo: ex-42)

Esperimento voluto dall'utente per un'animazione piu' fluida: ex-42 Abductor Machine e' la prima immagine a 5 pose (START, 25%, MID, 75%, END). Gruppi `#f-giu` (START), `#f-q1` (25%), `#f-mid` (MID), `#f-q3` (75%), `#f-su` (END), tutti con classe `.fr`; le parti fisse (base, montante, schienale, busto, testa, braccia, maniglie) stanno fuori dai gruppi, le parti fisse che stanno sopra le gambe (schienale, busto, braccia, testa) in coda al file, cosi' non subiscono il crossfade. Ciclo START > 25% > MID > 75% > END > 75% > MID > 25% > START (8 transizioni). Parametri esatti, da riusare per le prossime a 5 pose:

- Durata ciclo: 5.4 s (1% = 54 ms). `.fr{animation:5.4s linear infinite}`: `animation-timing-function:linear` di base, quindi tra le pose intermedie la velocita' di dissolvenza e' costante (nessun rallentamento/pulsazione a 25%, MID, 75%).
- Hold molto brevi: START 0-3% e 97-100% (circa 0.32 s in totale, a cavallo del ciclo); END 47-53% (circa 0.32 s).
- Tempi delle pose (percentuale del ciclo): START 0-3%, 25% a 16.2%, MID a 25%, 75% a 33.8%, END 47-53%, 75% a 66.2%, MID a 75%, 25% a 83.8%, START 97-100%.
- Transizioni interne (25% > MID > 75% e ritorno): 8.8% ciascuna (circa 0.48 s), lineari. Transizioni che toccano START o END (START > 25%, 75% > END, END > 75%, 25% > START): 13.2% ciascuna (circa 0.71 s), cioe' 1.5 volte quelle interne, con easing solo li': in uscita da un estremo `cubic-bezier(.4,0,.7,.55)` (ease-in, parte da velocita' 0 e arriva con pendenza 1.5, uguale a quella lineare delle transizioni interne, che durano 1/1.5), in arrivo su un estremo `cubic-bezier(.3,.45,.6,1)` (specchio). Cosi' non c'e' scatto di velocita' alle pose intermedie.
- Crossfade complementare: a ogni istante le due pose adiacenti hanno opacita' p e 1-p con la stessa curva (la funzione e' scritta nello stesso keyframe di entrambi i gruppi), somma sempre = 1 (verificato ogni 50 ms su un ciclo in Chromium, compreso il wrap: somma 1.0000, passo massimo 0.108 per 50 ms, nessuno scatto).
- Keyframes: `giu{0%,3%{opacity:1;animation-timing-function:cubic-bezier(.4,0,.7,.55)}16.2%,83.8%{opacity:0;animation-timing-function:cubic-bezier(.3,.45,.6,1)}97%,100%{opacity:1}}`, `q1{0%{opacity:0}3%{opacity:0;animation-timing-function:cubic-bezier(.4,0,.7,.55)}16.2%{opacity:1}25%,75%{opacity:0}83.8%{opacity:1;animation-timing-function:cubic-bezier(.3,.45,.6,1)}97%,100%{opacity:0}}`, `mid{0%,16.2%{opacity:0}25%{opacity:1}33.8%,66.2%{opacity:0}75%{opacity:1}83.8%,100%{opacity:0}}`, `q3{0%,25%{opacity:0}33.8%{opacity:1;animation-timing-function:cubic-bezier(.3,.45,.6,1)}47%,53%{opacity:0;animation-timing-function:cubic-bezier(.4,0,.7,.55)}66.2%{opacity:1}75%,100%{opacity:0}}`, `su{0%,33.8%{opacity:0;animation-timing-function:cubic-bezier(.3,.45,.6,1)}47%,53%{opacity:1;animation-timing-function:cubic-bezier(.4,0,.7,.55)}66.2%,100%{opacity:0}}`.
- `@media (prefers-reduced-motion:reduce){.fr{animation:none}#f-q1,#f-mid,#f-q3,#f-su{opacity:0}}` (solo START visibile, nessuna animazione).
- Perche' 5.4 s: per ogni mezzo ciclo 44% di transizione (4 intervalli: 2 da 1.5 + 2 da 1 unita', unita' = 8.8%) e 6% di hold; le transizioni interne durano circa 0.5 s e quelle verso gli estremi circa 0.7 s, quindi la corsa e' quasi continua e gli estremi restano fermi solo circa 0.3 s. Per cicli piu' brevi o piu' lunghi basta scalare la durata: le percentuali restano valide.
- Spaziatura delle pose: i 5 fotogrammi devono avere un passo regolare (qui le ginocchia/cuscinetti si aprono di circa 8.7 unita' per posa, da 11.6 a 46.6). Se la bozza non lo e', ricostruire le pose intermedie per interpolazione (vedi riga ex-42 in "Da rivedere").

Elenco delle illustrazioni da rivedere o rifare a fine lavoro. La lista si aggiorna man mano e l'utente decide alla fine quali rifare.

| Esercizio | File | Motivo | Stato |
|---|---|---|---|
| 19 - T-Bar Row | `esercizi/ex-19-t-bar-row.svg` | Segnato dall'utente come "non convince del tutto"; da rivedere/rifare alla fine con gli altri. Difetti noti: pelle grigio-beige scura, in END il disco sfiora la maniglia, romboidi non distinti dal trapezio. Alternative: bozze a, b, c, d in `esercizi-bozze/` (usata la d; la c e' buona ma ha la barra curva in END). | Da rivedere |
| 27 - Leg Press | `esercizi/ex-27-leg-press.svg` | Bozza d, la migliore ma non impeccabile: macchina completa (base, gamba posteriore, guida, schienale, impugnature) quasi identica nei due frame, START con gambe quasi tese e slitta in alto, END con ginocchia circa 90 gradi e slitta vicina al sedile, mani sulle maniglie, quadricipiti #fb8b3c esatti e secondari chiari. Difetti lievi: in START 6 dischi sulla barra e in END 5; in END la guida e' circa 8 unita' piu' corta che in START (traslazione END 151,-1, pavimento e gamba posteriore allineati); la barra della slitta in END non e' esattamente allineata a quella di START; secondari poco estesi. Rimossi rect bianco, 2 ombre ellittiche (ne resta una statica sotto la macchina) e le etichette START/END (2 path). Alternative: bozze a, b, c, d in `esercizi-bozze/` (la a ha 8 path di testo, guida diversa tra i frame e macchina senza gamba posteriore; la b ha 2 path di testo, in END guida molto piu' corta (circa 28 unita') e base diversa, e 2 pezzi di slitta START con centro x oltre 400 che la regola di divisione sbaglia; la c ha 2 pillole arancioni (rect rx) piu' 2 path di testo, macchina diversa tra i frame e l'atleta con gambe poco leggibili). | Difetto lieve, da valutare |
| 28 - Affondi Manubri | `esercizi/ex-28-affondi-manubri.svg` | Bozza a, la migliore: START in piedi con manubri lungo i fianchi, END affondo con ginocchio anteriore circa 90 gradi, ginocchio posteriore vicino al pavimento, busto verticale, piede posteriore sulla punta, mani sui manubri in entrambi i frame, quadricipiti #fb8b3c esatti, stesso abbigliamento nei due frame, suolo allineato (traslazione END 160,1.5, nessun salto verticale). Difetti lievi: in START si vede un solo disco dei manubri davanti all'altro; secondari della gamba in END color pelle (#eabe9d) e non #fdba8c; ginocchio anteriore leggermente oltre la caviglia; pantaloncini grigi con cucitura poco leggibili. Rimosse 2 ombre ellittiche (ne resta una statica comune sotto i piedi). Alternative: bozze a, b, c, d in `esercizi-bozze/` (la b ha wrapper matrix da appiattire, pelle grigio-beige, manubrio START a 3 pezzi e gambe con tagli neri; la c ha busto vertical ma END con ginocchio anteriore oltre la caviglia e pelle scura; la d ha START con polpacci neri ma END con polpaccio anteriore arancione, abbigliamento incoerente, tratti marroni vaganti). | Difetto lieve, da valutare |
| 33 - Leg Curl Seduto | `esercizi/ex-33-leg-curl-seduto.svg` | Bozza b, la migliore (atleta uomo; nessuna e' impeccabile). START seduto con schiena contro lo schienale, cosce orizzontali sotto il rullo cosce, ginocchia circa 170 gradi con tibia in avanti, rullo caviglie dietro il polpaccio, leva visibile, mani sull'impugnatura; END ginocchia circa 90 gradi, tibia verticale, piede a terra sotto il ginocchio, rullo caviglie spostato in basso e indietro, cosce e busto invariati; femorali #fb8b3c, polpacci #fdba8c. Difetti lievi: la leva del rullo caviglie non e' collegata al rullo in modo realistico (in START il rullo galleggia sulla punta della leva, in END la leva e' un tratto grigio verticale davanti allo stinco e il rullo e' staccato); in END il rullo cosce e' circa 2 unita' fuori allineamento rispetto alla coscia; il pacco pesi non sale (statico); sotto il sedile resta un varco bianco tra i montanti; tono ombra #D6794C sotto il ginocchio non in palette. Macchina, busto, testa e sedile statici presi da START (identici tra i frame con scarto circa 2 unita'), nei gruppi animati solo gamba, leva, rullo caviglie e scarpa, END traslato di 157.8; rimossi rect di sfondo, 2 ombre (ne resta una statica) e circa 32 tratti decorativi vaganti #C4C4C4/#E5E5E5 (alcuni tratteggiati). Alternative: bozze a, b, c, d in `esercizi-bozze/` (la a ha START con ginocchio circa 150 gradi invece di 170 e tratti decorativi #F2F2F2, ma in END ha il braccio della leva visibile; la c ha START con ginocchio circa 150 gradi, rullo caviglie senza leva in entrambi i frame, due path nere opacity .15 come ombre extra, rect grigio di fondo e piede START che sconfina nell'altra meta'; la d ha pose corrette (ginocchio circa 155 gradi in START) e disegno pulito ma in END la leva sparisce e il rullo galleggia, piu' rect #F5F6FA di fondo). | Difetto lieve, da valutare |
| 32 - Leg Curl Sdraiato | `esercizi/ex-32-leg-curl-sdraiato.svg` | Bozza a, la migliore (atleta donna; nessuna e' impeccabile). START prona sulla panca con gambe quasi tese (circa 172 gradi), cosce sulla panca, leva bassa e rullo sul tallone/tendine d'Achille, mani sull'impugnatura; END ginocchio circa 90 gradi, stinco quasi verticale, cosce e bacino sulla panca, leva ruotata in alto, mani sull'impugnatura; femorali #fb8b3c, polpacci #fdba8c. Difetti lievi: si vede una sola gamba (l'altra e' coperta); in END il rullo sta sulla parte alta dello stinco, vicino alla caviglia, non proprio sul tallone; il perno della leva in END e' circa 5 unita' piu' in alto che in START e il blocco del perno cambia forma; il pacco pesi non sale (statico); la panca/pad e il busto sono ridisegnati in ciascun frame (identici ma nel crossfade c'e' un leggero calo di opacita'). Macchina statica presa da START, END traslato di 148.8; rimossi rect di sfondo, 2 ombre (ne resta una statica) e la macchina duplicata di END. Alternative: bozze a, b, c, d in `esercizi-bozze/` (la b ha pose corrette e macchina uguale ma panca curva con leva poco leggibile e mani su un'impugnatura strana; la c ha sfondo grigio opaco, macchina diversa tra START ed END (pacco pesi in posizioni diverse), artefatti rosa vicino al viso e leva con perno spostato; la d ha polpaccio grigio-beige con strisce chiare, leggings neri che coprono tutta la gamba e pacco pesi dietro la panca che copre la coscia). | Difetto lieve, da valutare |
| 31 - Leg Extension | `esercizi/ex-31-leg-extension.svg` | Bozza a, la migliore (nessuna e' impeccabile). START seduto con schiena contro lo schienale, cosce sul sedile, ginocchio circa 90 gradi, tibia quasi verticale, rullo sulla tibia sopra la caviglia, mani sull'impugnatura; END gamba tesa quasi orizzontale (circa 175 gradi), cosce sul sedile, leva e rullo saliti con la gamba, mani sull'impugnatura; quadricipiti #fb8b3c esatti, nessun secondario. Difetti lievi: in START la leva curva parte dal perno sul bordo del sedile e passa dietro al ginocchio (non e' una leva fissata al rullo in modo realistico); in END il rullo e' un po' sopra la linea della gamba, vicino alla caviglia; il pacco pesi non sale col rullo (statico). Macchina statica presa da START (la bozza ha il pacco pesi leggermente diverso nei due frame, circa 0,5 unita'), END traslato di 263.6; rimossi 2 ombre (ne resta una statica) e 2 cerchi duplicati. Alternative: bozze a, b, c, d in `esercizi-bozze/` (la b ha il perno leva e la gamba coerenti ma pantaloncini/pelle grigio-beige scuro, il pacco pesi con blocchi diversi tra i frame e il rullo molto in basso in START; la c ha il perno della leva che si sposta di circa 95 unita' tra START ed END, gamba sottile e canotta nera; la d ha busto molto reclinato, pelle arancione vicina al colore dei quadricipiti con doppio strato arancione e ombra chiara tagliata). | Difetto lieve, da valutare |
| 30 - Step-up su Panca | `esercizi/ex-30-step-up-su-panca.svg` | Bozza c, la migliore e l'unica con panca identica nei due frame (le altre hanno panca di dimensioni/altezza diverse tra START e END). Pose corrette: START piede destro sulla panca con ginocchio circa 90 gradi, sinistro a terra dietro, busto leggermente inclinato; END in piedi sulla panca sulla gamba destra tesa, ginocchio sinistro circa 90 gradi con coscia orizzontale; braccia rilassate, nessun manubrio. Difetti lievi: in END la mano destra e' scura (guanto/ombra) davanti alla coscia; il femorale chiaro e' poco visibile in START; atleta in END molto piu' alta, quindi viewBox ampio con margini laterali. Panca e ombra statiche prese da START, END traslato di 131.5 unita' per allinearle. | Difetto lieve, da valutare |
| 29 - Affondi in Camminata | `esercizi/ex-28-affondi-manubri.svg` (condivisa con ex-28) | Immagine condivisa con ex-28 (Affondi Manubri) per scelta dell'utente, pose praticamente identiche. Atleta donna invece di uomo (regola dispari=uomo non rispettata). Eventualmente da rigenerare con un uomo se l'utente vuole. | Da valutare |
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
| 34 - Calf Raise in Piedi | `esercizi/ex-34-calf-raise-in-piedi.svg` | Bozza c, la migliore (tutte e 4 le bozze mostrano una vera differenza di posa START/END). Alzata allargata a mano (senza Quiver): ora testa/busto/cuscino/impugnature salgono di circa 32 unita' su 275 (~11.7%, prima ~9-12 unita', ~4%); piedi in punta sul gradino con tallone alzato (scarpa ruotata di altri 10 gradi attorno alla punta), leggings, stinco e soleo allungati in verticale (circa +10%) per raccordare ginocchio e caviglia; viewBox allargato 4:3 per contenere la testa in END. Difetti lievi: gamba un po' piu' lunga in END, piede quasi verticale; nella bozza la macchina differisce un poco tra i frame (gradino a due livelli in START, blocco unico in END): usata quella di START, pavimento e gradino allineati (traslazione END 157.9,0); in START il tallone e' solo appena sotto il bordo del gradino. Rimossi rect bianco, 2 ombre (ne resta una statica) e 20 tratti decorativi #DADADA. Alternative: bozze a, b, d in `esercizi-bozze/` (a: colonna piu' bassa in START e piedi piatti sul gradino; b: colonna dietro la schiena, macchina diversa e due impugnature; d: pantaloncini, cuscino piccolo, colonna di altezza diversa tra i frame). | Difetto lieve, da valutare |
| 35 - Calf Raise Seduto | `esercizi/ex-35-calf-raise-seduto.svg` | Bozza b, la migliore (atleta uomo a torso nudo; a: macchina diversa tra i frame con gradino basso in START e alto in END; c: pelle grigia, cuscino ridisegnato a macchia in END; d: pelle tutta arancione, tratti vaganti e cerchio di sfondo). In tutte le bozze START ed END differivano di poco (testa su di 1-3 unita' su 157) e c'erano le etichette START/END. Alzata allargata a mano (senza Quiver): testa su di circa 14.5 unita' su 157 (~9.2%), cuscino/ginocchia circa 14 (~8.9%), bacino circa 4, leva del cuscino ricalcolata; in START tallone appena sotto il bordo della pedana (scarpa ruotata di circa 8 gradi), in END punta sul bordo con tallone ben alzato (scarpa ruotata di altri 12 gradi, piede molto inclinato); coscia inclinata, stinco e polpacci allungati di circa 10% per raccordare ginocchio e caviglia. Difetti lievi: bacino staccato dal sedile di circa 4 unita' in END e pantaloncini un po' allungati; coscia visibilmente inclinata; piccola fessura bianca tra stinco e scarpa e striscia chiara sul collo (gia' nella bozza); piede quasi verticale in END. Rimosse le etichette START/END (8 path di lettere), rect di sfondo, 2 ombre (ne resta una statica); pelle uniformata a #DBC0A8. | Difetto lieve, da valutare |
| 36 - Hip Thrust | `esercizi/ex-36-hip-thrust.svg` | Bozza b, la migliore (atleta donna, panca, bilanciere con un disco nero). Tutte e 4 le bozze mostrano una vera differenza di posa START/END; nessuna ha etichette di testo START/END (verificato: 0 elementi `<text>` e nessun path a forma di lettera, il divieto rafforzato ha funzionato). a: decine di tratti decorativi grigi e piccoli segni di movimento; c: due scarpe sovrapposte, tratti vaganti e segni di movimento; d: disco grigio invece che nero, ~30 strisce di sfondo. Rimossi rect di sfondo, 2 ombre (ne resta una statica), panca statica da START; pelle uniformata a #DBC0A8, glutei #fb8b3c, quadricipiti/femorali #fdba8c. Difetti lievi: scarpa in END circa 1,5 unita' piu' a sinistra che in START (offset 152.5); testa/busto in END circa 6 unita' piu' a sinistra rispetto alla panca; striscia di tonalita' diversa sul busto/avambraccio in END; glutei a forma di cerchio; in START gomito e mano in parte coperti dal disco. | Difetto lieve, da valutare |
| 37 - Stacco Rumeno | `esercizi/ex-37-stacco-rumeno.svg` | Bozza b, la migliore (atleta uomo, bilanciere con un disco nero). Tutte e 4 le bozze mostrano una vera cerniera dell'anca (busto START verticale, END circa 20-30 gradi sopra l'orizzontale, anche indietro, ginocchia quasi tese, braccia verticali); nessuna ha etichette di testo (0 elementi `<text>`, il divieto rafforzato ha funzionato). a: puntini e tratti grigi vaganti, vuoto bianco sul torso in START, mani sul disco poco chiare; c: in END due dischi sovrapposti (disegno doppio) e pelle grigia scura; d: pelle chiara ma disco piu' alto da terra e ritocchi arancio meno leggibili. Rimossi rect di sfondo, 2 ombre (ne resta una statica), ~20 tratti vaganti; scarpe statiche da START; pelle uniformata a #DBC0A8, glutei/femorali #fb8b3c, erettori/adduttori #fdba8c. Difetti lievi: in END il disco resta circa 0,6 diametri sopra il pavimento (non proprio "appena sopra"); in START il disco copre le mani; in END i femorali sono resi con una larga striscia #fdba8c; ciuffo di capelli un po' frastagliato. | Difetto lieve, da valutare |
| 38 - Stacco Sumo | `esercizi/ex-38-stacco-sumo.svg` | Derivata da ex-12 (Stacco da Terra) con gambe e busto modificati a mano, senza Quiver: atleta donna come in ex-12. START: busto ruotato di 17 gradi attorno alla spalla (piu' verticale, circa 42 gradi dalla verticale), bacino abbassato di circa 10 e avanzato di circa 12 unita', coscia vicina accorciata del 5% e ruotata, tibia lontana accorciata del 14% e spostata di 12 unita' avanti, piede lontano accorciato in larghezza (x0.72, punta in fuori) e distanza tra i talloni di circa 29 unita', scarpa vicina x0.9; aggiunti a mano tibia vicina e coscia lontana ruotata/ingrandita 15%. END: gambe quasi tese con tibie inclinate di 4-6 gradi (talloni piu' distanti), scarpe x0.9 e x0.72. Difetti residui: stance larga solo suggerita (in profilo puro non si vede), punta di scarpa vicina poco ruotata, ginocchio lontano con piccola punta della pelle in START, tibia vicina un po' lunga e pallida, spigoli originali del ginocchio in END, muscoli quadricipiti lontani semplificati. | Difetto lieve, da valutare |
| 39 - Affondi Bulgari | `esercizi/ex-39-affondi-bulgari.svg` | Bozza a, la migliore (atleta uomo, un manubrio, piede posteriore sulla panca). Tutte e 4 le bozze mostrano una vera differenza di posa START/END (START ginocchio anteriore quasi esteso, busto verticale; END ginocchio anteriore circa 90 gradi con coscia orizzontale, ginocchio posteriore vicino al pavimento, piede posteriore sulla panca, busto inclinato) e nessuna ha etichette di testo. a: panca identica nei due frame (b, c, d: panca di altezza diversa tra START ed END, la d di circa 7 unita'); b: busto in END piu' ripido e muscoli secondari poco leggibili; c: proporzioni diverse e wrapper con clipPath/matrix da appiattire; d: ok ma panca diversa. Rimossi rect di sfondo, 2 ombre (ne resta una statica), 2 barre #D9D9D9 vaganti; panca e scarpe statiche da START, END traslato di 150 unita'; pelle #D2B8A3, quadricipiti/glutei #fb8b3c, secondari #fdba8c. Difetti lievi: discesa piu' contenuta del previsto (testa circa 27 unita' piu' bassa, non ~55); in END il ginocchio anteriore sta un poco oltre la caviglia; scarpa anteriore statica da START (in END e' leggermente diversa); linee di muscolo semitrasparenti #706259. | Difetto lieve, da valutare |
| 40 - Good Morning | `esercizi/ex-40-good-morning.svg` | Bozza a, la migliore (atleta donna, disco sulla spalla). Tutte e 4 le bozze mostrano 3 pose progressive (in piedi, busto circa 45 gradi, busto quasi orizzontale) con piedi allineati e disco sulla spalla; nessuna ha etichette di testo visibili (a-d hanno `<text>` bianchi al 30% da rimuovere). a: pulita, nessun tratto vagante; b: ~20 tratti grigi vaganti, scarpe con doppia suola e ombre; c: rect grigio di sfondo e polpacci troppo chiari; d: archi/cerchi tratteggiati vaganti e macchia arancio sul fianco in START. Rimossi rect di sfondo, 12 `<text>`, 3 ombre (ne resta una statica), ritocchi d'ombra #AD643A/#D3763E; scarpa statica da START, MID e END traslati (-97.9 e -196.4 in x) per far coincidere i piedi; disco nero con centro #8a919c; pelle #D2B8A3, glutei/femorali/erettori #fb8b3c, secondari #fdba8c. Difetti lievi: pelle uniforme senza contrasto tra braccio lontano e busto (mani poco leggibili); in MID/END la caviglia (pelle) non coincide perfettamente con la scarpa statica; in END il busto e' circa 20-25 gradi sopra l'orizzontale e le braccia si confondono col disco; ciuffo di capelli un po' frastagliato. | Difetto lieve, da valutare |
| 41 - Ponte Glutei | `esercizi/ex-41-ponte-glutei.svg` | Bozza d, la migliore e l'unica con atleta uomo (a e' presente in due copie identiche, verificato con cmp). Tutte le bozze mostrano 3 pose progressive (bacino che sale da quasi a terra fino a ponte con spalle-anche-ginocchia quasi allineati, piedi fermi, braccia a terra); la posa non e' stata allargata (in d il bacino sale di circa 20 unita' su una figura lunga 90). a: atleta donna, rect bianco, 3 ombre, tappetini #989AA1 separati, muscoli poco leggibili; b: atleta donna, rect bianco, ombre doppie, tappetini viola; c: atleta donna, ponte a una gamba (altra gamba tesa in aria), non e' il Ponte Glutei base; d: rect grigio di sfondo con wrapper `matrix(3.75 0 0 3.75 450 0)` e clipPath, 25 tratti d'ombra #B5A090, nessun tappetino vero. Rimossi rect, clipPath, matrix (path appiattiti), 3 ombre (ne resta una statica), tratti #B5A090/#A38E80; tappetino #8a919c ricostruito (rect arrotondato statico) perche' in d il tappetino era il rect di sfondo; scarpa statica da START, MID e END traslati (-97.9 -0.3 e -196.7 -0.4) per far coincidere i piedi; pelle #D2B8A3, glutei/femorali #fb8b3c, secondari #fdba8c. Difetti lievi: pelle uniforme (poco contrasto tra braccio e busto), addominali/erettori in MID/END a spicchi un po' spigolosi, chiusura del collo/spalla in END un po' netta. | Difetto lieve, da valutare |
| 42 - Abductor Machine | `esercizi/ex-42-abductor-machine.svg` | Bozza d, la migliore (atleta donna in tutte le bozze; prima immagine a 5 pose, vista frontale, eccezione concordata). Confronto: a: macchina con seduta, schienale, braccio laterale e cuscinetti, ma il primo fotogramma ha una macchina diversa (base a telaio, piedi uniti), mani/braccia, ciuffo e testa cambiano da un fotogramma all'altro, muscoli quasi assenti; b: figura che sembra seduta su sgabello con semicerchio arancione, gambe nascoste dietro il sedile, ~32 strisce verticali #eee, nell'ultimo fotogramma le mani sono staccate dalle maniglie; c: gambe divaricate ma cuscinetti tra le ginocchia e muscoli appena visibili, braccia/maniglie diverse nel quarto fotogramma, pelle rosata; d: figura semplice e pulita, cuscinetti esterni che seguono le ginocchia, muscoli gia' evidenziati (#FB9954/#FCC59F), maniglie e braccia coerenti, con ~20 tratti decorativi #BDBDBD opacity .2 da rimuovere. Tutte e 4 le bozze avevano le 5 figure compresse in x 850-1150 (passo circa 60), un rect bianco semitrasparente e 5 ombre (b anche strisce); nessun testo. Difetti della bozza d: la progressione non e' regolare (distanza tra i cuscinetti 11.6, 24.7, 37.4, 42.9, 46.6: passi 13.1, 12.7, 5.5, 3.7; la distanza tra i piedi 16.7, 33.8, 42.7, 46.5, 48.4 ancora piu' irregolare); nel fotogramma 1 manca la base (c'e' una seconda ombra) e il sedile e' una striscia di 4.5 unita'; fotogrammi 4 e 5 con cuscinetto a due strati; busto/testa/braccia con scarti di circa 1 unita' tra fotogrammi; viso senza tratti. Intervento manuale: START e END presi dai fotogrammi 1 e 5 della bozza; 25%, MID e 75% ricostruiti per interpolazione dei contorni (ricampionati e fusi 25/50/75% tra START e END, semplificati con tolleranza 0.05, tutte le parti mobili: cosce, gambe, pantaloncini, muscoli, sedile visibile, cuscinetti, scarpe), cosi' le ginocchia/cuscinetti si aprono di 8.7 unita' a posa (11.6, 20.3, 29.1, 37.8, 46.6). Parti fisse (montante, base presa dal fotogramma 5 e centrata, schienale, busto, braccia, maniglie, mani, testa) statiche da START; frame 5 traslato di -240.54 per centrare i cuscinetti sull'asse; secondo strato dei cuscinetti (#212122) e ombra del collo/ombretto ombelico rimossi, cuscinetti uniformati a #2e2c2c. Rimossi rect, 5 ombre (ne resta una statica sotto la macchina), 20 tratti #BDBDBD, 1 ombra aggiuntiva del fotogramma 1; pelle #D2B8A3, glutei medi/tensore fascia lata #fb8b3c, secondari #fdba8c, macchina #8a919c. Difetti lievi: l'apertura e' piccola in valore assoluto (le ginocchia passano da 11.6 a 46.6 su una figura alta 93, circa 3 volte); il sedile visibile nel 25% ha una forma a esagono (artefatto di interpolazione); i muscoli sono due macchie semplificate per coscia; viso senza tratti; la base grigia e' piu' stretta dei piedi in MID/75%/END (come nella bozza); il crossfade tra pose intermedie lascia un lieve calo di opacita' sulle parti mobili. Alternative: bozze a, b, c, d in `esercizi-bozze/`. | Difetto lieve, da valutare |
| 45 - Military Press | `esercizi/ex-45-military-press.svg` | Bozza d, la migliore (atleta uomo in tutte le bozze; vista laterale, 5 pose con lo standard di ex-42). Confronto: a: gambe/busto coerenti ma testa senza volto in 4 e 5 (il braccio la copre), braccia confuse nel primo fotogramma, tratti #F2F2F2/#FFBC8E vaganti; b: busto, fascia #FFB576 e gambe diversi da un fotogramma all'altro, volto assente in 5, ~10 tratti #E5E5E5; c: testa con buco bianco nel terzo fotogramma e viso coperto nel quarto, cerchi grigi extra (r circa 2) su disco e testa, ~7 tratti #F2F1F1; d: volto completo con tratti, deltoide #fb8b3c e core/tricipiti #fdba8c leggibili, gambe e busto quasi identici nei 5 fotogrammi, ma ~22 tratti #D3D3D3 opacity .5 (anche ai bordi) e 5 ombre da togliere, nessun testo. Tutte e 4 le bozze avevano le 5 figure compresse in x 850-1150 (passo circa 60), alte circa 140, un rect bianco semitrasparente e 5 ombre. Difetti della bozza d: l'altezza del disco non e' regolare (centro y 117.9, 109.7, 91.0, 77.6, 66.3: passi 8.2, 18.7, 13.4, 11.3; a: 7.1, 16.4, 14.6, 9.4; b: 9.4, 19.5, 13.7, 14.1; c: 7.9, 20.3, 15.6, 12.9, quindi tutte con un 25% troppo vicino a START); nel fotogramma 3 l'avambraccio e' nascosto dietro la testa e il disco e' 18 unita' piu' indietro (x 871.9 contro 890.5 e 879.5), traiettoria a zig-zag; testa e spalle con scarti di 2-3.5 unita' in verticale e fino a 2 in orizzontale tra i fotogrammi (testa e braccio in un unico path in 4 e 5, buco bianco all'orecchio nel 4); pelle in 8 toni (#E4B694/#E7BE9E/#D4A683/#EDBB97/#E2B796/#E6B897/#E5B896/#E4B798) e addome in 3 (#F8B583/#F6B27F/#F7B482); nessuna barra visibile (solo il disco visto di taglio, con piccolo centro #8a919c). Intervento manuale: START e END presi dai fotogrammi 1 e 5 della bozza (END traslato di -246.15, -1.3 per allineare busto e testa), 25%, MID e 75% ricostruiti per interpolazione tra START ed END (secondari e deltoide ricampionati a 240 punti, allineati e fusi 25/50/75%, lisciati e semplificati a 30 punti; disco e centro interpolati in modo lineare: y 118, 104.7, 91.5, 78.2, 65; avambraccio disegnato a mano come trapezio che segue disco e gomito; il fotogramma 3 della bozza non e' stato usato); parti fisse (scarpa, gambe, pantaloncini, busto/canotta, addome, testa, capelli) statiche da START e sotto i gruppi animati, cosi' il braccio passa davanti al volto; END con l'avambraccio ritagliato dal path unico braccio+testa (volto tolto, resta quello di START). Aggiunta a mano la barra (rect #8a919c, 1.6 x circa 22) dietro ogni disco, ombra unica statica sotto i piedi. Rimossi rect, 5 ombre, ~22 tratti #D3D3D3, segni del ginocchio e del viso, 8 path di teste/avambracci/scarpe/gambe duplicati. Palette: pelle #D2B8A3, deltoide #fb8b3c, core/braccio #fdba8c (prima #F8B583/#F6B27F/#F7B482), neri #201E1E (prima #28282A/#2D2D2D), disco e barra #8a919c. Difetti residui: a 25%, MID e 75% le forme del braccio sono ricostruite (macchie semplici, contorno un po' irregolare, avambraccio liscio senza mano) e il volto e' in parte coperto dal braccio/disco; la testa e' fissa (non si inclina) e a END il volto e' quello di START con l'avambraccio sovrapposto; barra solo come stanghetta orizzontale dietro il disco (convenzione, non prospettica); figura alta e stretta in un riquadro 4:3 (occupa circa 14% della larghezza); canotta/busto statici (a END la canotta non segue l'espansione del petto); il crossfade tra pose lascia un lieve effetto fantasma sul braccio. Sul file: viewBox 756.7 49 250.67 188, 16.5 KB, 5 pose con ciclo 5.4 s (CSS identico a ex-42). | Difetto lieve, da valutare |
| 46 - Lento Avanti Manubri | `esercizi/ex-46-lento-avanti-manubri.svg` | Bozza b, la migliore (atleta donna in tutte le bozze; seduta su panca con schienale, vista laterale, 5 pose con lo standard di ex-42; le 5 pose della bozza sono usate cosi' come sono, senza interpolazione, perche' la progressione e' regolare: manubrio da vicino al mento in START a braccio disteso sopra la testa in END, centro del disco a y circa 123, 109, 100, 90, 79 in unita' viewBox). Difetti: si vede un solo braccio (l'altro e' coperto); in START il manubrio e' davanti al mento e non alle spalle (gomito circa 70 gradi); in 25% e MID il braccio copre il volto (testa senza lineamenti, rimossi occhi e bocca); da 25% in poi il braccio e' un'unica sagoma con testa e spalla (pelle uniformata #D2B8A3, deltoide #fb8b3c e secondario #fdba8c meno separati); coda di cavallo e reggiseno ridisegnati in ogni frame (scarto circa 1-2 unita' nel crossfade); manubrio solo come disco nero con centro grigio (niente impugnatura visibile); busto non perfettamente verticale. Panca, gambe, scarpa, pantaloncini e addome statici da START, ombra unica, rimossi rect di sfondo, 5 ombre, 5 puntini di coda e 8 dettagli del viso; frame 2-5 traslati su START con allineamento sull'addome (scarto 59.4, 118.9, 179.2, 240.8). Alternative: bozze a, b, c, d in `esercizi-bozze/` (la a ha la panca diversa, in 4 manca il piede e una sola mano dietro la testa; la c ha START con mani davanti al volto e manubrio piccolo, in MID il manubrio poggia sulla testa; la d ha START con due manubri ai lati della testa e coda a chignon, pose meno regolari). | Difetto lieve, da valutare |
| 47 - Arnold Press | `esercizi/ex-47-arnold-press.svg` | Bozza c, la migliore (atleta uomo in tutte le bozze; vista laterale, 5 pose con lo standard di ex-42; le 5 pose della bozza sono usate cosi' come sono, senza interpolazione: manubri davanti al petto in START, poi rotazione con gomiti larghi e manubri ai lati della testa a MID, manubri sopra la testa a 75%, braccia distese a END). Confronto: a: ~20 strisce verticali #8a919c a tutta altezza piu' rect bianco opaco, busto con canotta diversa da un fotogramma all'altro e braccia poco leggibili; b: busto nudo nei primi 2 fotogrammi e con canotta nei successivi (incoerente), pelle e gambe con riflessi rosa a spicchi, manubri come soli dischi senza barra; d: busto di forma diversa, nel fotogramma 3 un braccio penzola senza manubrio, progressione meno chiara; c: unica con barra visibile e rotazione dei polsi leggibile, deltoidi #fb8b3c e secondari #fdba8c esatti, gambe/scarpe quasi identiche nei 5 fotogrammi. Tutte e 4 le bozze avevano le 5 figure compresse in x 850-1150 (passo circa 60), rect di sfondo e 5 ombre; nessun testo. Difetti della bozza c: rect bianco e rect #8a919c opacity .1 di sfondo, 5 ombre, pelle in 4 toni (#C8A997/#D1AB94/#BA9682, ombra del braccio lontano), neri #222/#292726/#282D31 e dischi #282D31, deltoide anche sulla fascia del trapezio (arancione al posto del secondario); in END la testa e' coperta dal braccio e il fotogramma conteneva un frammento di capelli (rettangolo nero) e di volto sopra il braccio; scarti di 0.5-1 unita' tra i fotogrammi per busto/testa. Intervento manuale: nessuna interpolazione; frame 2-5 traslati su START con allineamento sui pantaloncini (0, -62, -130.1, -186.8, -250.6); parti fisse (gambe, scarpa, pantaloncini, ombra unica) statiche da START, busto/canotta, braccia, deltoidi e manubri per frame; testa e capelli statici da START sotto i gruppi, quindi il braccio passa davanti al volto (in 75% la testa del fotogramma resta sopra il braccio); rimossi rect, 5 ombre, frammento di capelli di END e le teste duplicate di START/25%/MID/END. Palette: pelle #D2B8A3 (uniforme), deltoidi #fb8b3c, secondari #fdba8c, manubri barra e centro dischi #8a919c, dischi/neri/capelli #201E1E. Difetti residui: manubrio solo come barra orizzontale con dischi sui due lati (convenzione, in vista laterale la rotazione dei polsi e' solo suggerita); a MID il braccio lontano e' piegato dietro la testa e il disco copre un po' i capelli; in END volto in gran parte coperto dal braccio e collo corto; pelle uniforme (poco contrasto tra braccio e busto); fascia del trapezio arancione in START/MID; canotta del busto che cambia leggermente forma tra i fotogrammi (non statica); il crossfade tra pose lascia un lieve effetto fantasma. Sul file: viewBox 766 68 213.33 160, 12.4 KB, 5 pose con ciclo 5.4 s (CSS identico a ex-42). Alternative: bozze a, b, c, d in `esercizi-bozze/`. | Difetto lieve, da valutare |
| 44 - Slanci Laterali a Terra | `esercizi/ex-44-slanci-laterali-a-terra.svg` | Bozza a, la migliore (atleta donna sdraiata sul fianco in tutte e 4 le bozze; 5 pose con lo standard di ex-42). Confronto: b: busto/spalla a blob senza forma, gamba superiore con stinco di un grigio diverso (due toni, sembra una protesi) e fascia arancione verticale in vita, ~13 ombre ellittiche sovrapposte e disordinate; c: rect #F2F2F2 opaco, in 2 un piede/scarpa staccato dalla gamba, busto e posizione delle braccia diversi tra i frame (in 5 testa e busto cambiano), 5 ombre #B4B9C1 piu' tappetini come path, gambe poco leggibili; d: pelle in #fdba8c (stesso colore del muscolo secondario, quindi muscoli illeggibili), macchia tan #D4B7A0 sull'anca in START e busto/braccia diversi tra i frame, ma e' l'unica con tappetino disegnato; a: anatomia piu' pulita, gluteo medio #fb8b3c e tensore #fdba8c sulla coscia, capelli e reggiseno coerenti, progressione regolare. Tutte e 4 le bozze avevano le 5 figure piccole (circa 50x20) compresse in x 850-1150 (passo circa 60), rect di sfondo e ombre; nessun testo. Difetti della bozza a: nessun tappetino (solo 5 ombre ellittiche, 4 blob #D3D3D3 opacity .2 e 5 macchie nere #313740 sfumate, da rimuovere); in START la gamba superiore e' appoggiata e non si vede la gamba inferiore (gambe sovrapposte, come voluto); progressione dell'altezza della caviglia abbastanza regolare (y 157, 147.6, 141.8, 136.2, 131: passi 9.4, 5.8, 5.6, 5.2; angolo della gamba circa -5, 6, 16, 31, 42 gradi) quindi nessuna ricostruzione; END a circa 42 gradi (non 45) e a 25%/MID la coscia e' sottile e dritta mentre a 75%/END e' piu' tozza e arcuata; busto/testa/braccia con scarti di 1-2 unita' e pose delle braccia diverse tra i frame. Intervento manuale: nessuna interpolazione; le 5 pose della gamba superiore (pantaloni, gluteo medio, tensore, scarpa, cavigliera) sono i fotogrammi 1-5 della bozza, traslati in orizzontale (0, -59.1, -119.3, -179, -238.2) e in verticale (0, 0.2, 0.2, 0.2, 0.3) per allineare l'anca; parti fisse (testa, capelli, reggiseno, busto, braccia, mano) statiche da START e sopra i gruppi animati; aggiunti a mano il tappetino (rect arrotondato #8a919c), la gamba inferiore/anca statica (path #201E1E sotto i gruppi, per evitare che il crossfade scopra il fondo) e l'ombra unica statica sotto il tappetino. Rimossi rect, 4 blob, 5 macchie nere, 3 ombre ellittiche (sostituite da una sola) e un tratto grigio #4A4444. Palette: pelle #D2B8A3 (uniforme, prima #D6BAA5/#D2B5A2/#C9A890), gluteo medio/tensore #fb8b3c e interno #fdba8c (gia' nella palette), tappetino #8a919c, neri/capelli/reggiseno/scarpe #201E1E (prima #232323/#0F0F0F/#311D16/#2D2929). Difetti residui: tappetino disegnato a mano (semplice, senza spessore); gamba inferiore non distinta in START e a 25%; secondari (grande gluteo, obliqui) poco evidenti: solo la striscia #fdba8c sulla coscia; braccia e busto di START (non perfettamente coerenti con le pose finali della gamba); in END ~42 gradi invece di 45. Sul file: viewBox 845.5 120.5 70 52.5, 7.4 KB, 5 pose con ciclo 5.4 s (CSS identico a ex-42). | Difetto lieve, da valutare |
| 43 - Kickback ai Cavi | `esercizi/ex-43-kickback-ai-cavi.svg` | Bozza c, la migliore (atleta uomo in tutte e 4 le bozze; vista laterale, 5 pose con lo standard di ex-42). Confronto: a: gamba che lavora con passi irregolari (altezza scarpa 182.8, 179.5, 171.9, 169.9, 157.5: passi 3.3, 7.6, 2.0, 12.4), gambe sottili, muscoli #FF6118 fuori palette; b: colonna/ombre incoerenti (~15 ombre disordinate, 2 ombre nel fotogramma 1), fotogramma 1 con gamba quasi dritta e salto grande al 2, poi 2-5 quasi uguali (progressione molto irregolare), fascia nera spessa alla caviglia; d: ~11 tratti decorativi #D8D8D8 opacity .1, progressione irregolare (fotogrammi 2 e 3 quasi uguali), gamba piu' pallida e muscoli poco leggibili; c: figura piu' leggibile e coerente, glutei e femorali evidenziati, erettori, mani sulla colonna, cavo che segue la caviglia. Tutte e 4 le bozze avevano le 5 figure compresse in x 850-1150 (passo circa 60), un rect bianco semitrasparente e 5 ombre; nessun testo. Difetti della bozza c: 5 path degeneri #191919 (linea d'orlo dei pantaloncini lunga 5-8 unita' e alta 0.2, da rimuovere); progressione abbastanza regolare (angolo della coscia circa 21, 33, 41, 48, 58 gradi: passi 12, 8, 7, 10) quindi nessuna ricostruzione; busto/testa/braccia/gamba d'appoggio con scarti di 1-2 unita' tra fotogrammi (e testa/torso/top con numero di curve diverso nel fotogramma 5). Intervento manuale: nessuna interpolazione; le 5 pose della gamba che lavora (cavo, scarpa, cavigliera, gamba, femorale) sono i fotogrammi 1-5 della bozza, traslati in orizzontale (0, -64.3, -126.2, -183.2, -244.2) per allineare la colonna; parti fisse (colonna, base, puleggia, gamba d'appoggio, scarpa d'appoggio, busto, pantaloncini, top, glutei, erettori, testa, capelli, braccia, mani) statiche da START, la gamba d'appoggio e il busto stanno sopra i gruppi animati; ombra unica statica ricentrata (cx 877.5, rx 33). Rimossi rect, 5 ombre, 5 path degeneri; stroke del cavo uniformato a .5. Palette: pelle #D2B8A3 (uniforme, prima 6 toni #FFC19D/#FFB98F/#F7BA93/#F2B993/#F0BE9C/#EEBB98), grande gluteo e femorali della gamba che lavora #fb8b3c (prima #F97522/#F47120/#F58D47/#F58239/#F77121/#F97120), erettori spinali #fdba8c (prima #F99032), attrezzo #8a919c, neri/capelli/scarpe #201E1E (prima #212121/#191919). Difetti residui: a meta' corsa e a 75% la coscia mostra una piccola scheggia di pelle sopra il femorale arancione, vicino all'anca; senza il gluteo medio sulla gamba d'appoggio (solo pelle); un piccolo spazio bianco tra cavigliera e scarpa in END; il femorale arancione sporge a sinistra del gluteo a 25%/MID; cavo molto sottile. Sul file: viewBox 811.4 75.5 133.3 100, 8.1 KB, 5 pose con ciclo 5.4 s (CSS identico a ex-42). |
