# Inventario esercizi e immagini

Generato con uno script node che legge `EXERCISE_LIBRARY` (`js/dati/libreria-esercizi.js`) e la mappa `IMMAGINI_ESERCIZI` (`js/dati/disegni-esercizi.js`), poi controlla il disco. Ramo: `claude/immagini-esercizi`.

## 1. Riepilogo numeri

| Voce | Valore |
|---|---|
| Esercizi nel catalogo (`EXERCISE_LIBRARY`) | 169 totali (140 + 29 nuovi di W1-T5; dei 140: 139 nel branch + 1 da altro branch) |
| Con immagine (campo presente e file esistente) | 19 |
| Senza immagine (mancanti) | 150 su 169 (121 + i 29 di W1-T5, che escono senza disegno per scelta: D-P2) |
| Di cui non ancora presenti in questo branch | 1 (n. 140 Squat Sumo, da `claude/hopeful-thompson-uthd8f`) |
| File in `esercizi/` | 20 (tutti SVG) |
| File orfani (non referenziati) | 1 (`ex-02-panca-inclinata-su-a.svg`) |
| Peso totale `esercizi/` | 679.8 KB |
| Peso medio per file | 34.0 KB |

Copertura per gruppo muscolare:

| Gruppo | Esercizi | Con immagine | Senza |
|---|---|---|---|
| Petto | 17 | 11 | 6 |
| Schiena | 23 | 8 | 15 |
| Gambe | 25 (24 nel branch + 1 da altro branch) | 0 | 25 (24 nel branch + 1 da altro branch) |
| Glutei | 15 | 0 | 15 |
| Spalle | 16 | 0 | 16 |
| Braccia | 26 | 0 | 26 |
| Core | 18 | 0 | 18 |

Dopo W1-T5 (29 esercizi in più, tutti senza immagine, vedi 3.1): Petto +3, Schiena +5, Gambe +11, Glutei +4, Spalle +5, Core +1, Braccia +0 (i quattro rinviati Wrist Curl, Reverse Wrist Curl, Reverse Nordic e Reverse Crunch non sono in libreria). La tabella sopra è il conteggio di quando è stato scritto l'inventario e non è stata rifatta.

Note: gli esercizi usati in `schede-*.js` e le chiavi di `DETTAGLI` (139) coincidono con la libreria: nessun esercizio fuori catalogo. `tools/genera-catalogo.js` NON riguarda gli esercizi: genera il catalogo delle regole del coach da `docs/coach-mappa-regole.md`.

Le bozze Quiver non finali (varianti a-d degli esercizi 10, 11, 12, 13, 14, 15, 16, 17, 18 e 19, di cui la b per il 10, la d per l'11, la d per il 13, la a per il 14, la a per il 15, identica alla d, la d per il 16 e la c per il 17 e la d per il 18 e la d per il 19, sono state usate per il finale) stanno in `esercizi-bozze/`, fuori da `esercizi/` e dalla cache del service worker.

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
| 20 | Pulley Basso | Schiena | nessuna (ripiego inesistente `img/pulley-basso.png`) |
| 21 | Pullover ai Cavi | Schiena | nessuna (ripiego inesistente `img/pullover-ai-cavi.png`) |
| 22 | Hyperextension (Lombari) | Schiena | nessuna (ripiego inesistente `img/hyperextension.png`) |
| 23 | Squat con Bilanciere | Gambe | nessuna (ripiego inesistente `img/squat-con-bilanciere.png`) |
| 24 | Front Squat | Gambe | nessuna (ripiego inesistente `img/front-squat.png`) |
| 25 | Goblet Squat | Gambe | nessuna (ripiego inesistente `img/goblet-squat.png`) |
| 26 | Hack Squat | Gambe | nessuna (ripiego inesistente `img/hack-squat.png`) |
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

121 esercizi (120 nel branch + 1 da altro branch, l'ultimo in coda con nota). Motivo per tutti: **nessun campo** in `IMMAGINI_ESERCIZI`, quindi l'app prova `img/<slug>.png`, il file non esiste e compare il segnaposto "Immagine in arrivo". Nessun file referenziato risulta assente su disco e non ci sono placeholder file.

| Gruppo | Esercizio | Motivo | File atteso dal ripiego |
|---|---|---|---|
| Schiena | Pulley Basso | nessun campo nella mappa | `img/pulley-basso.png` |
| Schiena | Pullover ai Cavi | nessun campo nella mappa | `img/pullover-ai-cavi.png` |
| Schiena | Hyperextension (Lombari) | nessun campo nella mappa | `img/hyperextension.png` |
| Gambe | Squat con Bilanciere | nessun campo nella mappa | `img/squat-con-bilanciere.png` |
| Gambe | Front Squat | nessun campo nella mappa | `img/front-squat.png` |
| Gambe | Goblet Squat | nessun campo nella mappa | `img/goblet-squat.png` |
| Gambe | Hack Squat | nessun campo nella mappa | `img/hack-squat.png` |
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

### 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno)

29 esercizi aggiunti dalla task W1-T5 (CAS-13, SEL-03, SEL-04, D-P3), numerati di seguito ai 140 della tabella 2. **Per scelta (D-P2) non hanno un disegno**: nessuna voce in `IMMAGINI_ESERCIZI`, quindi `immagineEsercizio()` torna il ripiego `img/<slug>.png`, il file non esiste, il riquadro prende la classe `vuoto` e compare il segnaposto «Immagine in arrivo» (tradotto) senza errori. Li controlla `tests/browser/disegni-mancanti.js` (it, en, es, de) e `tests/muscoli.test.js` (nessuna voce nella mappa). Quando arriva un disegno basta una riga in `IMMAGINI_ESERCIZI` e `npm run sw`.

| # | Esercizio | Gruppo | File atteso dal ripiego |
|---|---|---|---|
| 141 | Floor Press con Manubri | Petto | `img/floor-press-con-manubri.png` |
| 142 | Chest Press Inclinata alla Macchina | Petto | `img/chest-press-inclinata-alla-macchina.png` |
| 143 | Panca con Pausa | Petto | `img/panca-con-pausa.png` |
| 144 | Trazioni Negative | Schiena | `img/trazioni-negative.png` |
| 145 | Seal Row | Schiena | `img/seal-row.png` |
| 146 | Lat Pulldown con Elastico | Schiena | `img/lat-pulldown-con-elastico.png` |
| 147 | Rematore agli Anelli | Schiena | `img/rematore-agli-anelli.png` |
| 148 | Stacco in Deficit | Schiena | `img/stacco-in-deficit.png` |
| 149 | Leg Curl con Asciugamano | Gambe | `img/leg-curl-con-asciugamano.png` |
| 150 | Leg Curl in Piedi | Gambe | `img/leg-curl-in-piedi.png` |
| 151 | Belt Squat | Gambe | `img/belt-squat.png` |
| 152 | Squat con Pausa | Gambe | `img/squat-con-pausa.png` |
| 153 | Cossack Squat | Gambe | `img/cossack-squat.png` |
| 154 | Squat su Scatola | Gambe | `img/squat-su-scatola.png` |
| 155 | Step-up Basso | Gambe | `img/step-up-basso.png` |
| 156 | Sit-to-Stand dalla Panca | Gambe | `img/sit-to-stand-dalla-panca.png` |
| 157 | Calf Raise con Manubrio sul Gradino | Gambe | `img/calf-raise-con-manubrio-sul-gradino.png` |
| 158 | Tibialis Raise | Gambe | `img/tibialis-raise.png` |
| 159 | Copenhagen Plank | Gambe | `img/copenhagen-plank.png` |
| 160 | Stacco Rumeno con Manubri | Glutei | `img/stacco-rumeno-con-manubri.png` |
| 161 | Stacco Rumeno a una Gamba | Glutei | `img/stacco-rumeno-a-una-gamba.png` |
| 162 | Hip Thrust con Manubrio | Glutei | `img/hip-thrust-con-manubrio.png` |
| 163 | Kettlebell Swing | Glutei | `img/kettlebell-swing.png` |
| 164 | Alzate Laterali con Elastico | Spalle | `img/alzate-laterali-con-elastico.png` |
| 165 | Alzate Laterali Inclinate | Spalle | `img/alzate-laterali-inclinate.png` |
| 166 | Extrarotazione al Cavo | Spalle | `img/extrarotazione-al-cavo.png` |
| 167 | Face Pull con Elastico | Spalle | `img/face-pull-con-elastico.png` |
| 168 | Scrollate con Manubri | Spalle | `img/scrollate-con-manubri.png` |
| 169 | Suitcase Carry | Core | `img/suitcase-carry.png` |

Rinviati, non in libreria (il nome è preso per altro da una regex del generatore, vedi `docs/in-arrivo/w1-t5.json`): Reverse Nordic, Wrist Curl, Reverse Wrist Curl, Reverse Crunch (dati completi nel commit 494225b).

## 4. Orfani

| File | Peso | Note |
|---|---|---|
| `esercizi/ex-02-panca-inclinata-su-a.svg` | 30.9 KB | Non referenziato da `IMMAGINI_ESERCIZI`. E' il fotogramma "su" (posa alta) usato per costruire `ex-02-panca-inclinata.svg` (vedi commento SVG: "giu-a spostata di 13px per combaciare con su-a"). Unico SVG senza animazione ne' metadati C2PA, con sfondo `rect` bianco. Resta nel precache. |

## 5. Precache sw.js

- Cache: `CACHE_NAME = '3in-v10'` (cambiare il nome butta le copie vecchie).
- Le immagini SONO nel precache: elenco **statico** tra i marcatori `/*INIZIO-ASSET*/ ... /*FINE-ASSET*/`, con 20 righe `./esercizi/*.svg` (compreso l'orfano).
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

Formato SVG vettoriale (nessun PNG/WebP); peso medio 34.0 KB, totale 679.8 KB (20 file). Il viewBox base e' 400x300 (rapporto 4:3); gli altri sono ritagli sulla figura (rapporti diversi, da 40x30 a 388x291). Nessun attributo width/height (tranne l'orfano 400x300): scalano al riquadro CSS `.ex-img` (`object-fit: contain`, rapporto 300/165).

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
| 15 - Lat Machine | `esercizi/ex-15-lat-machine.svg` | In END barra un po' alta, gola/clavicole. | Difetto lieve, da valutare |
| 16 - Lat Machine Presa Inversa | `esercizi/ex-16-lat-machine-presa-inversa.svg` | Presa supina poco leggibile di profilo; poco arancione sui dorsali in END. | Difetto lieve, da valutare |
| 17 - Rematore con Bilanciere | `esercizi/ex-17-rematore-bilanciere.svg` | In END anca un po' piu' arretrata/alta che in START. | Difetto lieve, da valutare |
| 18 - Rematore con Manubrio | `esercizi/ex-18-rematore-manubrio.svg` | Arancione piu' marcato in START che in END. | Difetto lieve, da valutare |
