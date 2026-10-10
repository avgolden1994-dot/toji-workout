# Graph Report - toji-workout  (2026-10-10)

> Rigenerato con `npm run grafo` (graphify + legami dei nomi globali da `tools/simboli.js` + nomi italiani da `tools/grafo-nomi.json`).
> Un nome preciso (funzione, costante, `window.nome`): `npm run -s trova -- nome` → file:riga, chi lo usa e cosa usa.
> Archi con contesto "nome globale" o "html (onclick/markup)": legami tra file ricavati da `tools/simboli.js`; gli altri da graphify.
> Aggiornato? `npm run grafo:verifica` (non serve graphify).

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 3993 nodes · 11041 edges · 202 communities (193 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 885 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `998b430f`
- Aggiornato rispetto al codice? `npm run grafo:verifica` (il commit qui sopra e quello da cui e partito il giro, non quello che contiene il grafo).
- Dopo modifiche al codice: `npm run grafo` (non `graphify update .` da solo: perderebbe i nomi italiani e i legami nuovi).

## Community Hubs (Navigation)
- Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, elenco-esercizi.js +5
- INT-2e, attivazione della struttura Forza (FRZ-01): la domanda «Che forza?» (forza generale | powerlifting) in onboarding e in Opzioni, il salvataggio di forzaTipo e puntiDeboli nel profilo · tests/forza-attivazione.test.js + forza-modalita.test.js, attrezzi-onboarding.test.js, tempo-copertura.test.js +5
- Onboarding: creazione del programma · js/ui/onboarding.js
- Tempo della seduta: modello dei minuti, pause per classe, capacita, scala del taglio e fattore personale (CAS-05..08, CAS-18, PRG-03, PRG-13, PRG-20, PRG-33, IPE-04, IPE-12) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, forza.js
- Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3
- Coach: repertorio di consigli e azioni · js/coach/repertorio.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js, agente-consigli.js +10
- collaudo-generatore.js · tools/collaudo-generatore.js
- Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js
- BIA nelle opzioni · js/coach/bia/opzioni.js + questionario-decisioni.js, repertorio.js, agente-consigli.js +13
- Strumento: mappa dei simboli globali · tools/simboli.js
- Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md
- Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js
- Sessione gia completata · js/ui/sessione-completata.js + storico.js
- Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + metodi-momenti.js, stato.js, traduttore.js +11
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, regole-ricerca.js, mappa-per-agenti.md +5
- Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js
- Test: finestra del cedimento e audio · tests/cedimento.test.js
- Esigenza del coach · js/coach/esigenza.js + intensita.js
- Manifest della PWA · manifest.json
- Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js
- Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js
- Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + macchinario-occupato.js, lavoro-cronometro.js, selezione-multipla.js +12
- Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js
- Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js
- Strumento: indice del codice · tools/indice.js
- Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + lettore-fisso.js, stato-condiviso.js, cedimento.js +1
- Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + mi-sento-male.js, seduta.js, giorno.js +3
- Strumento: aggiornamento del grafo · tools/grafo.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md
- Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md
- package.json (script npm) · package.json
- Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md
- Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + soglie-split.js, onboarding.js
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + soglie-progressione.js, schede-esercizio.js
- integra-onda.js · tools/integra-onda.js
- Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, motore.js, figura-anatomica.js
- Partenza bassa per le donne e calibrazione rapida (W2-T8, piano coach v2 capitolo D, prove D.8) · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md
- package.json (script npm) (parte 2) · package.json + integrazione-onda4.test.js
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md
- Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, e1rm.js, schede-tecniche.js
- Golden di buildProgram (piano coach v2, onda 1, W1-T4: «generatore a stadi e brief») · tests/genera-golden.test.js + aiuto-genera.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md
- Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, navigazione.js, storage.js +6
- Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1
- Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md
- Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js
- Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, libreria-esercizi.js +18
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md
- Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md
- Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md
- Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, audio-silenzioso.js, utility.js +3
- Scelta degli esercizi per attributi (W2-T6, versione snella): una prova per correzione, con i numeri di prima · tests/selezione.test.js
- Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri · tests/revisione-onda1.test.js
- Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md
- Test: muscolo bersaglio e alternative · tests/muscoli.test.js
- Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js
- Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, ricerca-casa-poco-tempo.md, aiuto-selezione.js +1
- Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + utility.js, fogli.js, importa-progressi.js +12
- Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js
- Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, integrazione-3a.test.js, intensita-onda0.test.js +3
- La modalità Forza: struttura del powerlifting (piano coach v2, W2-T7): FRZ-02 (squat e panca almeno 2 volte, stacco 1 + variante, per 3-6 giorni), FRZ-03 (varianti e punto debole), · tests/forza-struttura.test.js + integrazione-onda2c.test.js
- Onboarding: creazione del programma (parte 2) · js/ui/onboarding.js + psicologia.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md
- Calibrazione rapida dei carichi stimati (CAR-18, CAR-19) · js/coach/carichi/calibrazione.js + partenza.js, soglie-partenza.js
- Il coach compone · js/coach/compone.js + metodi-momenti.js, soglie-bia.js, soglie-coach.md +2
- Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6) · js/coach/regia/genera.js + vincoli.js, psicologia.js, brief.js
- Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + attributi-esercizi.js
- Gesti: swipe, rotella e trascinamento · js/ui/gesti.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md + e1rm.js, scheda-unica.js, ricerca-algoritmi-carichi-e-app.md +2
- Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, coach-v2-decisioni.md, ricerca-algoritmi-carichi-e-app.md +5
- Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js
- Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md
- Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md
- 01 — Decisioni · docs/checklist-appstore/01-decisioni.md + README.md, 02-tecnica-ios.md, 03-audio.md +7
- Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md
- Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md
- Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md
- Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md
- Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md
- collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js
- Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md
- Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js
- Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js
- Strumento: elenco file del service worker · tools/genera-sw.js
- Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md
- Il cancello delle tecniche (piano coach v2, onda 2a, W2-T3): MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02, l aggancio di MES-02 in rirBersaglioBase · tests/tecniche.test.js
- Alternative e applicazione del programma · js/coach/programma/alternative.js + memoria-chiamata.js, genera.js, onboarding-risultato.js +1
- Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +3
- Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Coach: prontezza prima della seduta · js/coach/prontezza.js + ricerca-recupero-infortuni-popolazioni.md
- Calendario: gruppi muscolari · js/ui/calendario/gruppi.js
- collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js
- 05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md
- Documenti di architettura · docs/ARCHITETTURA.md + sw.js
- Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + psicologia.js
- collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js
- Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js
- 07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md
- 08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md
- Mesociclo (piano coach v2, W2-T4: MES-01, MES-02, MES-03, PRN-03, OBI-03): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/mesociclo.test.js + integrazione-onda2b.test.js, sicurezza-onda0.test.js, integrazione-onda0.test.js +1
- Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js + soglie.test.js, struttura.test.js, collaudo-attrezzi.test.js +6
- Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md
- Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md
- Guardie del corpo (P4-C, coach v2, W5-T3 ridotta alle sole guardie): nutrizione e composizione corporea · tests/guardie-corpo.test.js
- Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js
- Specialista Forza: la struttura del powerlifting (FRZ-02..05, STD-02) · js/coach/specialita/forza.js + soglie-forza.js, attrezzi.js, questionario-decisioni.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md
- Importazione CSV di altre app · js/ui/importa-csv.js + importa-progressi.js
- Popolazioni e rientro dopo una pausa (pacchetto P4-S del coach v2 = W4-T2 snello; registro B10, B20, C.2; D-P21 n. 5) · tests/popolazioni.test.js + aiuto-atleta-piano.js
- Progressi: foto · js/ui/progressi/foto.js + pagine.js
- Ponte nativo (Capacitor) · js/core/nativo.js
- 02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md
- Strumento: catalogo delle regole · tools/genera-catalogo.js
- 06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md
- Disegni degli esercizi · js/dati/disegni-esercizi.js + traduttore.js, schede-esercizio.js
- Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md
- Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js, onboarding.js, stile-iphone.js
- elenco-soglie.js · tools/elenco-soglie.js
- Sicurezza (documento) · docs/SICUREZZA.md
- Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md
- 03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md
- Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md
- Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md
- Volume per muscolo: fasce per unità, solutore delle serie, tetti, verifica con la causa (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, REG-02, VOL-01, VOL-02, SES-01, REC-01, ESI-01) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +5
- 3in · README.md
- W2-T5, split, giorni e attrezzi (PRG-02, OBI-01, OBI-07, CAS-01, CAS-10, ETA-05): prove in node con l app vera in vm (tests/aiuto-app.js) · tests/split.test.js
- Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + traduttore.js
- Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + piano-coach-v2.md, catalogo-regole.js, coach-v2-decisioni.md +7
- Scarico unico e protezioni (P3-B, piano coach v2 W3-T5, versione snella: MES-05, MES-07, CST-09, N6, PRN-03; solo programmi con prog.versione 2) · tests/scarichi.test.js + tecniche.test.js
- Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md
- collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js
- Mesociclo: durata, blocchi, rampa di volume, RIR per settimana e scarico (MES-01..03, PRN-03, OBI-03, PRG-01, PRG-38) · js/coach/programma/mesociclo.js + parametri.js, soglie-struttura.js, ricerca-ipertrofia-programmazione.md
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js
- Programma azzerato, progressi e carichi salvati (P3-M, D-P23) · tests/conserva-progressi.test.js
- Soglie della regia del coach (REG-01, REG-04) · js/coach/regia/soglie-regia.js
- Popolazioni e rientro dopo una pausa: base degli over 65, gravidanza, calendario fermo, rampa e risalita del rientro (ETA-08 a, REC-12 a, CST-01, CST-02, CAR-04, ALG-14) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md
- Cancello delle tecniche: quale tecnica, su quale esercizio, a chi e quando (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02) · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +5
- Coach: regole dalla ricerca (parte 2) · js/coach/regole-ricerca.js + attrezzi.js, coach-v2-decisioni.md, ricerca-casa-poco-tempo.md +2
- Integrazione dell'onda 4 (INT-4): i collegamenti che nessuno dei quattro pacchetti (P4-C guardie del corpo, P4-F fastidi, P3-C Forza, P4-S popolazioni e rientro) poteva chiudere da solo · tests/integrazione-onda4.test.js
- Generatore a stadi e brief (piano coach v2, onda 1, W1-T4): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/genera-stadi.test.js + aiuto-genera.js
- Esportazione verso calendari (.ics) · js/ui/esporta-ics.js
- Correzioni dopo la revisione indipendente dell onda 2b/2c (INT-2d, docs/coach-v2-decisioni.md D-P21): una prova per correzione, con i numeri scritti · tests/revisione-onda2d.test.js
- Fastidi: la modifica scritta (P4-F, W4-T1 snella; REC-04, SAF-02 con nota, DEC-03/04, BIO-06, PRG-24) · tests/fastidi.test.js
- Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md
- Coach: biomeccanica · js/coach/biomeccanica.js
- Coach: intensità (INT) · js/coach/intensita.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md
- Specialista Forza, i carichi dei giorni medi e leggeri (P3-C, regola FRZ-11): «il giorno leggero è leggero» · tests/forza-carichi.test.js
- Soglie del coach · docs/soglie-coach.md + split.test.js
- INT-2f (revisione indipendente dell'onda 2e, MAGGIORE 2): «Hip Hinge a Corpo Libero» e un ripiego, non una scelta da preparatore · tests/hip-hinge-ripiego.test.js
- Scarico: dose unica, fatica, scarico del programma e scarico deciso dal coach con le sue protezioni (CAR-03, CAR-10, MES-05, MES-07, MES-08, CST-09, W1-T3, P3-B) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, soglie-scarico.js, piano-coach-v2.md +1
- Il tempo (piano coach v2, W2-T2): CAS-05 (modello dei tempi: serie, cambi, lati, coppie, riscaldamento e rampa), CAS-06 (capacita), CAS-07 e CAS-08 (la scala del taglio, il tempo e un tetto), · tests/tempo.test.js
- Volume per muscolo (W2-T1, piano coach v2 E.3; registro B6, B7, B19, D-P17) · tests/volume.test.js
- Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js
- Difetti trovati dalla revisione indipendente della sotto-onda 3a (INT-3b): carichi che scendevano a ogni blocco (B1), a ogni seduta con bersagli alternati (M1), il tetto · tests/revisione-onda3a.test.js
- Aiuto per le prove del piano che si esegue in seduta e dello scarico unico (P3-B, piano coach v2 W3-T4 e W3-T5, versione snella) · tests/aiuto-atleta-piano.js + integrazione-onda4.test.js
- Progressi: peso corporeo · js/ui/progressi/peso.js + archivio.js, ricerca-obiettivi-e-programmi.md, ricerca-cardio-nutrizione.md +8
- Backup e ripristino · js/core/backup.js + statistiche.js
- Griglia dei pesi per attrezzo e manubrio più pesante dichiarato nella progressione (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js
- Distribuzione dei muscoli piccoli e flessione del ginocchio con poco tempo (P3-G, coach v2 onda 3): una prova per correzione, con i numeri di prima · tests/distribuzione.test.js
- Specialista Forza: il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + fasi.js, soglie-forza-carichi.js, regole-ricerca.js
- Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js
- INT-2e, attrezzi dichiarati che arrivano alla scelta degli esercizi (CAS-01, D-P3): prove in node con l app vera in vm (tests/aiuto-app.js) · tests/attrezzi-dichiarati.test.js
- Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 3) · docs/ricerca-ipertrofia-programmazione.md
- Il piano si esegue in seduta (P3-B, piano coach v2 W3-T4, versione snella: MES-03 in seduta, solo programmi con prog.versione 2) · tests/piano-in-seduta.test.js
- Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 2) · docs/ricerca-metodi-avanzati-intensita.md
- Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md
- Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js
- Generatore: residui dell onda 1 (piano coach v2, W1-T6): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso), come generatore-onda0b.test.js · tests/generatore-onda1.test.js
- INT-2g (ultimo giro prima della PR dell'onda 2e): le rifiniture trovate dalla seconda revisione indipendente (revisione-onda2f) · tests/revisione-onda2g.test.js
- Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md
- Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md
- Fastidi: la modifica scritta (REC-04 parte a, SAF-02, PRG-24, BIO-06) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js
- Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js
- Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + soglie-selezione.js, genera.js, tempo.js
- Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-recupero-infortuni-popolazioni.md, biomeccanica.js, schede-varianti.js
- Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js
- 04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md
- Rampa del volume in seduta: le serie seguono il piano della settimana (MES-03) · js/coach/volume/rampa-settimana.js + soglie-rampa.js
- collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js
- Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + integrazione-onda4.test.js
- Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js
- Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md
- Mappa delle regole del coach (documento) (parte 5) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 2) · docs/ricerca-psicologia-aderenza.md
- Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 3) · docs/ricerca-psicologia-aderenza.md
- collaudo-generatore.js (parte 7) · tools/collaudo-generatore.js
- Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md
- Schermata Oggi · js/ui/oggi.js
- Strumento: mappa dei simboli globali (parte 3) · tools/simboli.js
- Strumento: aggiornamento del grafo (parte 2) · tools/grafo.js

## God Nodes (most connected - your core abstractions)
1. `Novità del coach v2` - 194 edges
2. `loadData()` - 111 edges
3. `renderAllenamento()` - 93 edges
4. `findExercise()` - 90 edges
5. `regolaAttiva()` - 86 edges
6. `caricaApp()` - 78 edges
7. `currentDay` - 74 edges
8. `renderPiano()` - 73 edges
9. `senzaEmoji()` - 73 edges
10. `getProfile()` - 73 edges

## Surprising Connections (you probably didn't know these)
- `B5. RIR di partenza e rampa (principianti compresi)` --references--> `rirBersaglioBase()`  [INFERRED]
  docs/coach-v2-decisioni.md → js/coach/regole-ricerca.js
- `6. Mappa muscolare (già fatta)` --references--> `renderBodyMap()`  [INFERRED]
  docs/metodo-illustrazioni-esercizi.md → js/ui/figura-anatomica.js
- `D.1 Ambito` --references--> `contestoCarichi()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js
- `D.4 Barra e corpo libero` --references--> `alternativeStessoMuscolo()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/programma/motore.js
- `D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19)` --references--> `applicaPartenze()`  [INFERRED]
  docs/piano-coach-v2.md → js/coach/carichi/partenza.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Metodi dell'epoca d'oro** — docs_coach_mappa_regole_epo_goldensix, docs_coach_mappa_regole_epo_park, docs_coach_mappa_regole_epo_arnold6, docs_coach_mappa_regole_epo_gironda, docs_coach_mappa_regole_epo_heavyduty, docs_coach_mappa_regole_epo_ispirazione [EXTRACTED 1.00]
- **Regole ABB (struttura professionale della scheda)** — docs_coach_mappa_regole_abb_ordine, docs_coach_mappa_regole_abb_ridondanza, docs_coach_mappa_regole_abb_copertura, docs_coach_mappa_regole_abb_tirate, docs_coach_mappa_regole_abb_split3, docs_coach_mappa_regole_abb_superserie, docs_coach_mappa_regole_abb_schiena, docs_coach_mappa_regole_abb_fondamentale, docs_coach_mappa_regole_abb_stacchi, docs_coach_mappa_regole_abb_priorita [EXTRACTED 1.00]
- **Regole INT (intensità da BIA e prime sedute)** — docs_coach_mappa_regole_int_stato_bia, docs_coach_mappa_regole_int_esigenza, docs_coach_mappa_regole_int_rir, docs_coach_mappa_regole_int_prima_volta, docs_coach_mappa_regole_int_bilancio [EXTRACTED 1.00]

## Communities (202 total, 9 thin omitted)

### Community 0 - "Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, elenco-esercizi.js +5"
Cohesion: 0.09
Nodes (61): seduteAllaSettimana(), escapeHtml(), MUSCLE_GROUPS, planDayClick(), azzeraSezioniEsercizi(), htmlDettaglioRiga(), htmlEserciziOrganizzati(), sezEsAperte (+53 more)

### Community 1 - "INT-2e, attivazione della struttura Forza (FRZ-01): la domanda «Che forza?» (forza generale | powerlifting) in onboarding e in Opzioni, il salvataggio di forzaTipo e puntiDeboli nel profilo · tests/forza-attivazione.test.js + forza-modalita.test.js, attrezzi-onboarding.test.js, tempo-copertura.test.js +5"
Cohesion: 0.04
Nodes (41): assert, { caricaApp }, chips(), test, assert, fs, path, test (+33 more)

### Community 2 - "Onboarding: creazione del programma · js/ui/onboarding.js"
Cohesion: 0.15
Nodes (31): biaField(), descSonnoBene(), etaPerProgramma(), htmlAvvisoGiorni(), htmlAvvisoObiettivi(), htmlNotaTonificare(), MSG_ETA_SOTTO_MINIMO, nuovoOnbData() (+23 more)

### Community 3 - "Tempo della seduta: modello dei minuti, pause per classe, capacita, scala del taglio e fattore personale (CAS-05..08, CAS-18, PRG-03, PRG-13, PRG-20, PRG-33, IPE-04, IPE-12) · js/coach/volume/tempo.js + soglie-tempo.js, mappa-per-agenti.md, forza.js"
Cohesion: 0.11
Nodes (58): Novità del coach v2, forzaPotaAlTempo(), SOGLIE_TEMPO, adattaAlTempo(), antagonistiPerMuscolo(), _cacheFattore, classePausa(), coppiaValida() (+50 more)

### Community 4 - "Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3"
Cohesion: 0.12
Nodes (35): closeSetPage(), htmlDomandePsico(), openSetPage(), PSICO_DOMANDE, renderSetPage(), renderSettings(), SET_PAGINE, setPsico() (+27 more)

### Community 5 - "Coach: repertorio di consigli e azioni · js/coach/repertorio.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js, agente-consigli.js +10"
Cohesion: 0.10
Nodes (49): E.1 Onda 0 — strumenti e bug netti, 2. Dove le fonti non concordano, 4. Scala di intervento sugli stalli, 5. Audit delle regole esistenti, 6. Regole proposte, 7. Domande aperte, 8. Limiti onesti, Appendice A. Query pronte per una sessione con il tetto alzato (+41 more)

### Community 6 - "collaudo-generatore.js · tools/collaudo-generatore.js"
Cohesion: 0.03
Nodes (56): ABBR, ATT_DICHIARABILI, ATT_EXTRA_PALESTRA, ATTREZZI_OK, ATTREZZI_QUASI, cacheCrediti, cacheEs, cacheUsabili (+48 more)

### Community 7 - "Guida interattiva · js/ui/guida-interattiva.js + termina-e-cardio.js, ripristino-guida.js"
Cohesion: 0.12
Nodes (34): GUIDA_BACKUP, guidaApplicaFoto(), aggiungiCardio(), CARDIO_TIPI, cardioAperto, cardioCorrente(), cardioKey(), minutiCardioSettimana() (+26 more)

### Community 8 - "BIA nelle opzioni · js/coach/bia/opzioni.js + questionario-decisioni.js, repertorio.js, agente-consigli.js +13"
Cohesion: 0.10
Nodes (47): closeAgent(), deltaTesto(), openAgent(), renderAgent(), closeBiaSheet(), openBiaSheet(), renderBiaSheet(), restartOnboarding() (+39 more)

### Community 9 - "Strumento: mappa dei simboli globali · tools/simboli.js"
Cohesion: 0.07
Nodes (20): acorn, alCaricamento, appFiles, ast, datiJson, defs, dest, fs (+12 more)

### Community 10 - "Registro delle decisioni del coach v2 · docs/coach-v2-decisioni.md"
Cohesion: 0.09
Nodes (23): B10. Over 65, B11. Modello dei tempi, B12. Il tempo: tetto o obiettivo (collaudo DUR-02 contro CAS §5.4 e PRI-08), B13. Polpacci, B14. Bicipiti e croci (D-P8), B15. Glutei: hip thrust o squat, B16. Scala degli stalli e numero di mancati, B17. Scarico reattivo (+15 more)

### Community 11 - "Piano: aggiungi allenamento alla settimana · js/ui/piano/aggiungi-allenamento.js + schede-pronte.js"
Cohesion: 0.25
Nodes (22): WORKOUT_TEMPLATES, applicaAllaSettimana(), awBack(), awChoosePath(), awCustom, awDays, awEsercizi(), awGroups (+14 more)

### Community 12 - "Sessione gia completata · js/ui/sessione-completata.js + storico.js"
Cohesion: 0.31
Nodes (8): closeDoneView(), mostraSessione(), openDoneView(), openHistoryDetail(), closeAllSessions(), htmlStoricoOrdinato(), openAllSessions(), rigaSeduta()

### Community 13 - "Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + metodi-momenti.js, stato.js, traduttore.js +11"
Cohesion: 0.19
Nodes (29): 5. Regole proposte, getProfile(), fineMomento(), htmlMomento(), momentoAttivo(), prontezzaBassaSettimana(), verificaMomento(), sedutaPianoB() (+21 more)

### Community 14 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, regole-ricerca.js, mappa-per-agenti.md +5"
Cohesion: 0.15
Nodes (24): Nomi in posti inattesi, 3.10 Rotazione degli esercizi, 3.11 2-3 sedute a settimana contro 5-6, 3.12 Concatenare i blocchi in 6-12 mesi, 3.1 Principi, 3.2 Tabella per livello e obiettivo, 3.3 Rampa di volume: formula e arrotondamenti, 3.5 Carico e ripetizioni settimana per settimana (+16 more)

### Community 15 - "Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) · tests/carichi-golden.test.js"
Cohesion: 0.08
Nodes (32): acorn, AGGIUSTI, assert, BIA, { caricaApp, VETTORI_CARICHI }, chiaveSpec(), corto(), costruisciStato() (+24 more)

### Community 16 - "Test: finestra del cedimento e audio · tests/cedimento.test.js"
Cohesion: 0.12
Nodes (9): apri(), assert, fs, http, MIME, path, R, stub() (+1 more)

### Community 17 - "Esigenza del coach · js/coach/esigenza.js + intensita.js"
Cohesion: 0.35
Nodes (11): aggiornaEsigenza(), esigenzaCoach(), esigenzaEsclusa(), esigenzaInDeficit(), htmlEsigenza(), rpeBersaglioSeduta(), segnaDoloreEsigenza(), tettoEsigenza() (+3 more)

### Community 18 - "Manifest della PWA · manifest.json"
Cohesion: 0.17
Nodes (11): background_color, description, display, icons, lang, name, orientation, scope (+3 more)

### Community 19 - "Coach: schemi di movimento · js/coach/programma/schemi.js + struttura-pro.js"
Cohesion: 0.21
Nodes (12): GLUTEI_FAMIGLIE, ISOLAMENTI, isolamentoDi(), libNome(), SCAMBI_ALLUNGAMENTO, SCAMBI_ALLUNGAMENTO_NUOVI, scambiAllungamento(), SCHEMI_MOV (+4 more)

### Community 20 - "Seduta: macchinario occupato (sostituzione per oggi) · js/ui/allenamento/macchinario-occupato.js"
Cohesion: 0.33
Nodes (14): alternativeOggi(), chiudiOccupato(), dopoSceltaOccupato(), ETICHETTA_ATTREZZO, fuoriOccupato(), htmlOccupato(), impostaOccupato(), occupatoOpzioni (+6 more)

### Community 21 - "Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + macchinario-occupato.js, lavoro-cronometro.js, selezione-multipla.js +12"
Cohesion: 0.12
Nodes (58): 5.1 Funzioni molto apprezzate, applicaMomento(), setMomento(), terminaMomento(), renderCoach(), applyGeneratedProgram(), currentDay, armedSet (+50 more)

### Community 22 - "Dati: dettagli esercizio e muscolo bersaglio · js/dati/dettagli-esercizi.js + schede-tecniche.js"
Cohesion: 0.22
Nodes (20): bersaglioDi(), DETTAGLI, dettaglioEsercizio(), etichettaAttrezzo(), famigliaTotaleDi(), focusConTipo(), focusEsercizio(), lavoroDaSostituire() (+12 more)

### Community 23 - "Schede esercizio: disegno e spiegazione · js/ui/schede-esercizio.js"
Cohesion: 0.36
Nodes (14): accosciato(), arto(), freccia(), inPiedi(), manubrio(), PATTERN_DRAW, PATTERN_RULES, patternFor() (+6 more)

### Community 24 - "Strumento: indice del codice · tools/indice.js"
Cohesion: 0.20
Nodes (9): acorn, dest, fs, html, out, path, R, righe (+1 more)

### Community 25 - "Musica: player web (YouTube e Spotify) · js/ui/musica/player-web.js + lettore-fisso.js, stato-condiviso.js, cedimento.js +1"
Cohesion: 0.14
Nodes (38): currentWebMode, spotifyController, spotifyReady, webDuration, ytPlayer, ytPlayerReady, formatMMSS(), avviaWebPronto() (+30 more)

### Community 26 - "Piano: selezione multipla e azioni di massa · js/ui/piano/selezione-multipla.js + mi-sento-male.js, seduta.js, giorno.js +3"
Cohesion: 0.13
Nodes (27): apriMiSentoMale(), chiudiMiSentoMale(), chiudiSedutaInterrotta(), minutiSeduta(), chiudiQuestionario(), closePlates(), COLORE_DISCO, renderPlates() (+19 more)

### Community 27 - "Strumento: aggiornamento del grafo · tools/grafo.js"
Cohesion: 0.06
Nodes (24): archi, comunita, dati, env, ETICHETTE, { execFileSync, spawnSync }, finale, fs (+16 more)

### Community 28 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.20
Nodes (10): 1.1 Sonno, dolenzia, riposo, scarico, sovraccarico, 1.2 Riscaldamento e stretching, 1.3 Come si monitora il dolore, e quando serve il medico, 1.4 Schiena bassa, 1.5 Spalla, 1.6 Ginocchio e anca, 1.7 Gomito, tendini, polso, collo, 1.8 Rientro dopo una pausa o un infortunio (+2 more)

### Community 29 - "Ricerca: cosa fanno e dicono davvero i coach (schede, regole pratiche, euristiche) · docs/ricerca-metodi-coach-pratici.md"
Cohesion: 0.05
Nodes (39): 1.1 Studi e revisioni visti in questa sessione (livello 1; titolo/PMID dai risultati, contenuto dal riassunto del risultato), 1.2 Cosa dicono i coach, per tema (livello 2-3: «riportato da ..., da verificare»), 1.3 Temi non ricercati sul web: Conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti, 2.10 Candito 6 settimane, 2.11 Sheiko, 2.12 RTS: Reactive Training Systems (Mike Tuchscherer), 2.13 Barbell Medicine (+31 more)

### Community 30 - "package.json (script npm) · package.json"
Cohesion: 0.13
Nodes (15): scripts, cancello, catalogo, collaudo:schede, controlla, grafo, grafo:verifica, indice (+7 more)

### Community 31 - "Ricerca: le prime 12 settimane del principiante e la prima seduta · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (8): 2. Dove le fonti non concordano, 4. Primo giorno, 8. Domande aperte, 9. Limiti onesti, Appendice A. Registro delle 15 ricerche riuscite, Appendice B. Query pronte (da rilanciare con il tetto alzato), In una pagina, Ricerca: le prime 12 settimane del principiante e la prima seduta

### Community 32 - "Ricerca: specializzazione, punti deboli, simmetria, estetica e muscoli trascurati · docs/ricerca-specializzazione-punti-deboli.md + soglie-split.js, onboarding.js"
Cohesion: 0.07
Nodes (28): 10. Limiti onesti, 1.1 Come si dà priorità a un muscolo: volume, frequenza, durata, 1.2 Ipertrofia regionale: cosa è sostenuto dagli studi sul tipo di esercizio, 1.3 Muscoli piccoli e trascurati, struttura, simmetria, estetica: conoscenza del modello, 1.4 Cosa dicono i coach (e dove la fonte è una persona, non uno studio), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.1 Serie frazionarie a settimana per muscolo (+20 more)

### Community 33 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento · docs/ricerca-riscaldamento-mobilita-prevenzione.md + soglie-progressione.js, schede-esercizio.js"
Cohesion: 0.15
Nodes (13): 3.10 Esempi verificati (arrotondamento 2,5 kg bilanciere), 3.1 Ingressi (tutti già disponibili nel codice), 3.2 Classi di esercizio, 3.3 Percentuali, ripetizioni e riposi (sul carico di lavoro W), 3.4 Riduzioni («quando saltare»), 3.5 Aumenti (una serie «0» leggera: 30-40% di W × 10, discesa in 3 s, o la sola barra), 3.6 Arrotondamento e tetto di tempo, 3.7 Riscaldamento generale (minuti) (+5 more)

### Community 34 - "integra-onda.js · tools/integra-onda.js"
Cohesion: 0.13
Nodes (32): aggiungiVoci(), autotest(), CAMPI, comandoApplica(), comandoControlla(), comandoProva(), conta(), copiaDiLavoro() (+24 more)

### Community 35 - "Coach: carico di partenza · js/coach/carichi/partenza.js + ricerca-donne-carichi-iniziali.md, motore.js, figura-anatomica.js"
Cohesion: 0.18
Nodes (27): 3.3 Moltiplicatori proposti (`PARAM_PARTENZA`) e verifica, 5. Audit di PAR-01..05 e regole collegate, 6. Regole proposte, applicaPartenze(), arrotondaPartenza(), contestoCarichi(), FACILITATE_PAR09, fonteBase() (+19 more)

### Community 36 - "Partenza bassa per le donne e calibrazione rapida (W2-T8, piano coach v2 capitolo D, prove D.8) · tests/partenza-donne.test.js + aiuto-atleta.js, bilancia-v2.test.js"
Cohesion: 0.04
Nodes (52): ancora(), ANCORE_DONNE_KG65, ANCORE_VERE_DONNE, arrotonda05(), atletaVirtuale(), CONTROLLO, FILE_BILANCIA_V2, fra() (+44 more)

### Community 37 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.18
Nodes (10): 2. Dove le fonti non concordano, 4. Confronto con le app, 5.2 Funzioni odiate o fonte di reclami, 5.3 Reclami sui piani generati da IA e come si evitano, 5. Funzioni che gli utenti amano e odiano, 8. Domande aperte, 9. Limiti onesti, Appendice A. Query pronte (da rilanciare con il tetto di ricerca alzato) (+2 more)

### Community 38 - "package.json (script npm) (parte 2) · package.json + integrazione-onda4.test.js"
Cohesion: 0.18
Nodes (10): description, devDependencies, acorn, playwright-core, name, private, version, acorn (+2 more)

### Community 39 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.08
Nodes (25): 10. Limiti onesti, 2. Dove le fonti non concordano, 3.1 Classi di esercizio (come agganciarle al codice), 3.2 Tecnica contro classe di esercizio, 3.3 Tecnica contro livello, età e vincoli, 3. Matrice di idoneità, 4.1 Budget per seduta e per settimana, 4.2 Posizione nel blocco (+17 more)

### Community 40 - "Scheda esercizio a quattro sezioni · js/ui/scheda-quattro-sezioni.js + schede-esercizio.js, e1rm.js, schede-tecniche.js"
Cohesion: 0.25
Nodes (13): e1rm(), openExerciseInfo(), exInfoNome, exVuoto(), paneGrafico(), paneRecord(), paneStorico(), seduteEsercizio() (+5 more)

### Community 41 - "Golden di buildProgram (piano coach v2, onda 1, W1-T4: «generatore a stadi e brief») · tests/genera-golden.test.js + aiuto-genera.js"
Cohesion: 0.17
Nodes (16): costruisciConProfilo(), preparaConProfilo(), assert, { caricaApp, ORA, profiliGolden, profiliMetodi, profiliConProfilo, preparaConProfilo, costruisciConProfilo }, costruisciGolden(), crypto, esito(), FILE (+8 more)

### Community 42 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.07
Nodes (27): 0. STATO DELLA RICERCA: leggere prima di usare questa nota, 1.1 Lunghezza muscolare, ROM, profilo di resistenza, 1.2 Regioni e capi, muscolo per muscolo, 1.3 Tecnica, leve, antropometria, 1.4 Scelta dello strumento, 1.5 Core, cuffia, collo, avambracci, 1.6 Cue e attenzione, 1.7 Casa e attrezzatura minima (+19 more)

### Community 43 - "Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, navigazione.js, storage.js +6"
Cohesion: 0.12
Nodes (41): daysContainer, renderDayBar(), selectDay(), sedutaAperta(), getDayTitle(), loadTitles(), saveTitles(), titlesKey() (+33 more)

### Community 44 - "Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1"
Cohesion: 0.15
Nodes (45): attachWeekDrag(), etichettaSettimana(), mcCancelCopy(), mcCopySrc, mcCopyTargets, mcCopyWeeks(), mcFillMonth(), mcPaste() (+37 more)

### Community 45 - "Registro delle decisioni del coach v2 (parte 2) · docs/coach-v2-decisioni.md"
Cohesion: 0.14
Nodes (14): 0. Come si legge, A.1 Collisioni di nomi (stesso codice, due significati), A.2 Doppioni: un concetto, un codice, A. Collisioni e doppioni, C.1 Criterio, C.2 Elenco (16 regole; 7 sono bloccate solo in parte), C.3 Non bloccate, anche se toccano popolazioni o salute (motivo in una riga), C.4 Numeri che escono come «Convenzione» con etichetta visibile (+6 more)

### Community 46 - "Ricerca: allenarsi a casa con poco materiale e in poco tempo (corpo libero, elastici, manubri, kettlebell; sedute da 20 a 90 minuti) · docs/ricerca-casa-poco-tempo.md + cancello-collaudo.js"
Cohesion: 0.05
Nodes (60): 1.1 Casa, corpo libero, elastici, manubri, kettlebell (area A), 1.2 Progettare il tempo (area B), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano, 3.0 Regole comuni a tutte le scale (Convenzione, ragionamento su [V]), 3.1 Spinta orizzontale (petto, tricipiti, spalla anteriore), 3.2 Spinta verticale (spalle, tricipiti), 3.3 Squat (quadricipiti, glutei) (+52 more)

### Community 47 - "Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, libreria-esercizi.js +18"
Cohesion: 0.10
Nodes (75): 5.3 Problemi trovati [V] (ordinati per impatto sulla qualità della scelta), Parte A (da fatti del codice), 6. Audit delle regole esistenti, 4. Rilevazione dei punti deboli, bonusBiomecc(), cueEsercizio(), segnaEsercizioTaratura(), TOCCHI (+67 more)

### Community 48 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.13
Nodes (15): 1.10 Gravidanza e post-partum, 1.11 Perimenopausa e menopausa, osso, 1.12 Energia disponibile (RED-S), amenorrea, ferro, 1.13 Immagine del corpo, «tonificare», linguaggio, 1.14 Cosa dicono gli esperti (livello 2-3: «riportato da ..., da verificare»), 1.1 Differenze di sesso: massa e forza, parte alta e bassa, 1.2 Risposta all'allenamento: guadagni relativi e velocità nei principianti, 1.3 Standard di forza e carichi tipici (àncore usate in 3) (+7 more)

### Community 49 - "Ricerca: allenamento per fasce d'età e fasi della vita (14-17, 18-29, 30-49, 50-64, 65-74, 75+) · docs/ricerca-fasce-di-eta.md"
Cohesion: 0.08
Nodes (23): 10. Limiti onesti, 1.1 Minori (13-17), 1.2 Giovani adulti (18-29) e 30-49, 1.3 50-64 anni: inizio della sarcopenia e resistenza anabolica, 1.4 65-74 e 75+: forza, potenza, cadute, ossa, 1.5 Screening prima di iniziare (ACSM e PAR-Q+), 1.6 Divulgatori: cosa non è stato verificato, 1. Cosa dicono le fonti (+15 more)

### Community 50 - "Mappa delle regole del coach (documento) · docs/coach-mappa-regole.md"
Cohesion: 0.17
Nodes (13): coach-mappa-regole.md (mappa delle regole), CAR-16/17 calibrazione: correzione rapida del carico nelle prime sedute, ESI-02 correzione settimanale dell'esigenza (non conta due volte le prime sedute), BIA: composizione corporea, CAR: carico della prossima seduta, ESI: esigenza del coach, MET: metodi famosi e scelta della struttura, PRG: costruzione del programma (+5 more)

### Community 51 - "Audio: convivenza con la musica delle altre app · js/core/musica-altre-app.js + mappa-per-agenti.md, audio-silenzioso.js, utility.js +3"
Cohesion: 0.14
Nodes (24): Come cercare (in quest'ordine), Flussi principali, Mappa per agenti, Stile, mediaKeeper, SILENZIO_WAV, avviaCanaleMultimediale(), fermaCanaleMultimediale() (+16 more)

### Community 52 - "Scelta degli esercizi per attributi (W2-T6, versione snella): una prova per correzione, con i numeri di prima · tests/selezione.test.js"
Cohesion: 0.14
Nodes (16): app, assert, ATTR, BASE, { caricaApp }, costruisci(), fs, griglia() (+8 more)

### Community 53 - "Correzioni della revisione indipendente dell'onda 1 (INT-2a, docs/piano-coach-v2.md, registro docs/coach-v2-decisioni.md): una prova per correzione, con i numeri · tests/revisione-onda1.test.js"
Cohesion: 0.14
Nodes (16): app, assert, BASE, { caricaApp }, { conSoglieSelezione }, costruisci(), FASI, griglia() (+8 more)

### Community 54 - "Ricerca: dall'obiettivo al programma (dimagrire, tonificare, massa, forza, salute, atleti, schiena, mente) · docs/ricerca-obiettivi-e-programmi.md"
Cohesion: 0.06
Nodes (30): 0. Come si legge, 1.1 Dimagrimento: allenamento nel deficit, cardio, miti, 1.2 Ricomposizione, «tonificare», massa magra, 1.3 Salute e longevità, 1.4 Resistenza e sport (corsa, ciclismo, squadra, combattimento), 1.5 Schiena, collo, spalla, postura, lavoro d'ufficio, 1.6 Mente, stress, sonno, 1.7 Obiettivi di abilità («prima trazione», «toccarsi le punte», «30 minuti di corsa») (+22 more)

### Community 55 - "Test: muscolo bersaglio e alternative · tests/muscoli.test.js"
Cohesion: 0.07
Nodes (30): alt(), app5, assert, ATTR5, bersaglio(), c, carica(), ctx (+22 more)

### Community 56 - "Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js"
Cohesion: 0.18
Nodes (26): ricaricaApp(), applicaGiorniSettimana(), avviaTraduttore(), DOW_IT, EMOJI_ICO, EMOJI_RX_G, emojiInIcone(), I18N_ATTR (+18 more)

### Community 57 - "Generatore: bug netti (piano coach v2, onda 0, W0-T2): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/generatore-onda0.test.js + generatore-onda0b.test.js, ricerca-casa-poco-tempo.md, aiuto-selezione.js +1"
Cohesion: 0.08
Nodes (31): 6. Audit delle regole esistenti, conSoglieSelezione(), a_tempo(), app(), assert, BASE, { caricaApp }, { conSoglieSelezione } (+23 more)

### Community 58 - "Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + utility.js, fogli.js, importa-progressi.js +12"
Cohesion: 0.08
Nodes (40): XSS, import e CSP, Schermate (tab) → funzione d'ingresso → file, 3.2 Dati sul dispositivo, import e XSS, switchProtocol(), suggestNextExercises(), currentMode, currentTab, DEFAULT_MONDAY_PROGRAM (+32 more)

### Community 59 - "Seduta: pannello del timer di recupero · js/ui/allenamento/timer-pannello.js + timer-recupero.js, stato-condiviso.js, nativo.js"
Cohesion: 0.29
Nodes (19): Nativo, recoveryInterval, recoveryMuted, recoveryRemaining, recoveryTotal, adjustRecoveryTimer(), avvisaTelefonoRecupero(), closeRecoveryPanel() (+11 more)

### Community 60 - "Aiuto per le prove in node: carica l'app VERA in un contesto vm, senza browser (qualche decina di millisecondi per caricaApp()) · tests/aiuto-app.js + carichi-onda0.test.js, integrazione-3a.test.js, intensita-onda0.test.js +3"
Cohesion: 0.05
Nodes (37): aTempo(), caricaApp(), CARTELLA_FIXTURE_V1, elencoFixture(), fs, leggiFixture(), path, R (+29 more)

### Community 61 - "La modalità Forza: struttura del powerlifting (piano coach v2, W2-T7): FRZ-02 (squat e panca almeno 2 volte, stacco 1 + variante, per 3-6 giorni), FRZ-03 (varianti e punto debole), · tests/forza-struttura.test.js + integrazione-onda2c.test.js"
Cohesion: 0.09
Nodes (29): app(), assert, { caricaApp }, cede(), costruisci(), FILE_NUOVI, fs, minutiSeduta() (+21 more)

### Community 62 - "Onboarding: creazione del programma (parte 2) · js/ui/onboarding.js + psicologia.js"
Cohesion: 0.14
Nodes (24): onbMomento(), onbPsico(), renderPsicoStep(), chip(), htmlAttrezziOnboarding(), htmlForzaOnboarding(), NOTA_ULTIMO_ATTREZZO, ONB_ATTREZZI_NOMI (+16 more)

### Community 63 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 2) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.12
Nodes (17): 1.10 Scarico nei principianti, 1.11 Riscaldamento e durata della seduta, 1.12 Aderenza nelle prime 8 settimane, 1.13 Schede di coach rispettati: cosa fanno nella prima settimana, 1.14 Cardio per chi comincia, 1.15 Infortuni e errori tecnici più comuni, 1.16 Popolazioni speciali di principianti, 1.1 Cronologia degli adattamenti: nervi, gonfiore, muscolo (+9 more)

### Community 64 - "Calibrazione rapida dei carichi stimati (CAR-18, CAR-19) · js/coach/carichi/calibrazione.js + partenza.js, soglie-partenza.js"
Cohesion: 0.21
Nodes (18): calibrazioneChiusa(), calibrazioneNellaSeduta(), decisioneCalibrazione(), esposizioniCalibrazione(), faseCalibrazione(), percentualeSalto(), personaCalibrazione(), pesoDopoSalto() (+10 more)

### Community 65 - "Il coach compone · js/coach/compone.js + metodi-momenti.js, soglie-bia.js, soglie-coach.md +2"
Cohesion: 0.12
Nodes (25): `SOGLIE_VOLUME` — `js/coach/volume/soglie-volume.js` (dosatore), analyzeBia(), SOGLIE_BIA, apriTuttiMetodi(), fattoreFisico(), gravidanzaDichiarata(), guardiaNutrizione(), htmlIspirazioni() (+17 more)

### Community 66 - "Generatore a stadi: buildProgram, giorni, verifica e smistamento della specialità (REG-02, REG-05, D-P6) · js/coach/regia/genera.js + vincoli.js, psicologia.js, brief.js"
Cohesion: 0.15
Nodes (24): ritrattoCoach(), risolviMetodo(), applicaScelteUtente(), conflittiDeiGiorni(), generaProgramma(), GIORNI_PER_SEDUTE, giorniDiFilaCiclici(), giorniSenzaConflitti() (+16 more)

### Community 67 - "Coach: motore del programma (alternative per muscolo, sostituti) · js/coach/programma/motore.js + attributi-esercizi.js"
Cohesion: 0.28
Nodes (14): ATTREZZI_EXTRA_DEI_DATI, attrezziDichiaratiEsito(), attrezzoDiCalcolo(), attrezzoDiCasaMancante(), attrezzoExtraDi(), attrezzoFisicoDi(), chiedeAttrezzo(), consentitoCalcolo() (+6 more)

### Community 68 - "Gesti: swipe, rotella e trascinamento · js/ui/gesti.js"
Cohesion: 0.48
Nodes (6): attachNumberDrag(), attachRepsField(), attachSwipe(), closeWheel(), openWheel(), pickWheel()

### Community 69 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi · docs/ricerca-forza-progressione.md + e1rm.js, scheda-unica.js, ricerca-algoritmi-carichi-e-app.md +2"
Cohesion: 0.09
Nodes (26): 3.2 Stimatore del massimale con il RIR (`e1rmStima`, unico), 6. Audit del motore attuale, 0. Stato della ricerca (leggere prima), 2. Dove le fonti non concordano, 3.1 Scale di progressione e incrementi (carico di partenza `L`, aumento = max(passo minimo, percentuale x L), arrotondato al passo dell'attrezzo, tetto per aumento), 3.2 Quando tenere, ripetere, scaricare o riportare indietro, 3.3 Dal RIR o RPE al carico della seduta dopo, 3.4 Range di ripetizioni per obiettivo (doppia progressione: si sale di carico quando tutte le serie arrivano alla cima) (+18 more)

### Community 70 - "Coach: regole dalla ricerca · js/coach/regole-ricerca.js + ricerca-mesocicli-periodizzazione-scarichi.md, coach-v2-decisioni.md, ricerca-algoritmi-carichi-e-app.md +5"
Cohesion: 0.15
Nodes (38): A.3 Tabella di mappatura (vecchio → finale → sotto-coach → task → stato), 7. Regole proposte, 3.4 RIR per settimana e per tipo di esercizio, A. Struttura del blocco, 6. Regole proposte, 7. Regole proposte, sogliaProgressione(), caricoPer() (+30 more)

### Community 71 - "Attributi degli esercizi (W1-T2, SEL-01 dati, SEL-03 dati, SEL-06 dati, MOD-01, MOD-04): ogni esercizio della libreria ha classe, schema, crediti per · tests/attributi.test.js"
Cohesion: 0.08
Nodes (24): app, assert, ATTR, { caricaApp }, CTRL, DETT, DIFFERENZE, differenzeVere() (+16 more)

### Community 72 - "Piano di lancio su App Store — 3in · docs/piano-lancio-appstore.md"
Cohesion: 0.18
Nodes (11): 0. Analisi dell'architettura attuale e cosa cambia con un wrapper nativo, 7.1 Stima per fase (indicativa, settimane lavorative), 7.2 Prossimi 5 passi concreti, 7. Stima, dipendenze e prossimi passi, 9. Privacy in parole semplici, Appendice A. Fonti, Appendice B. Glossario, Come si aggiorna questo documento (+3 more)

### Community 73 - "Ricerca: donne, carichi di partenza prudenti e allenamento al femminile (parte 2) · docs/ricerca-donne-carichi-iniziali.md"
Cohesion: 0.12
Nodes (16): 0. In breve, 2. Dove le fonti non concordano, 3.1 Metodo, parametri, assunzioni, 3.2 Tabella: donna di 65 kg, senza BIA, programma a ripetizioni di libreria (kg), 3.4 Peso corporeo e massa magra, 3.5 Confronto con gli uomini (stesso metodo, 75 kg, principiante), 3.6 Fattore prudente e sblocco rapido (DON-04), 3.7 Pavimento della barra e alternative (+8 more)

### Community 75 - "Inventario esercizi e immagini · docs/inventario-esercizi-immagini.md"
Cohesion: 0.13
Nodes (14): 1. Riepilogo numeri, 2. Tabella completa, 3.1 Esercizi nuovi di W1-T5 (D-P2: senza disegno), 3. Esercizi senza immagine, 4. Orfani, 5. Precache sw.js, 6. Stile e convenzioni delle immagini esistenti, Convenzione nome file (+6 more)

### Community 76 - "Piano coach v2: la squadra del coach · docs/piano-coach-v2.md + coach-v2-decisioni.md, PIANO.md"
Cohesion: 0.12
Nodes (13): 0. Cosa non si ridiscute e cosa non si rifà, A. Diagnosi in 15 righe (in ordine di danno per l'utente), B.1 La squadra (8 sotto-coach e un regista), B.2 Il contratto: un `brief` che attraversa la squadra, B.4 Spostare i file o tenere un registro? Decisione, B.5 Come si vede, B.6 Regole della regia (REG), B. Architettura di arrivo: la squadra del coach (+5 more)

### Community 77 - "Informativa sulla privacy di 3in (BOZZA) · docs/privacy-policy-bozza.md"
Cohesion: 0.15
Nodes (13): 10. I tuoi diritti, 11. Modifiche, 12. Contatti, 1. Chi siamo, 2. In breve, 3. Dati che l'app conserva sul tuo dispositivo, 4. Feedback via email, 5. Servizi di terzi facoltativi (+5 more)

### Community 78 - "Piano di lancio su App Store — 3in (parte 2) · docs/piano-lancio-appstore.md"
Cohesion: 0.17
Nodes (12): 2.10 Import/export e condivisione, 2.11 Prestazioni, accessibilità, aspetto, 2.1 Requisiti e progetto, 2.2 Struttura web dir, 2.3 Firma, certificati, provisioning, 2.4 Build e TestFlight, 2.5 Audio session (TEMA CHIAVE), 2.6 Librerie e font locali (+4 more)

### Community 79 - "Mappa delle regole del coach (documento) (parte 2) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.14
Nodes (11): ABB-03 copertura settimanale (polpacci, deltoidi posteriori, core, braccia), ABB-08 il fondamentale non ha meno serie degli altri, ABB-01 ordine: fondamentale, macchine, isolamenti, core in fondo, ABB-02 niente esercizi doppi nella seduta, ABB-07 schiena pesante due giorni di fila, ABB-05 3 giorni = Upper / Lower / Full Body, ABB-09 stacchi da terra al massimo 3 serie, ABB-06 superserie solo tra antagonisti, mai con un pesante (+3 more)

### Community 80 - "Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica (parte 2) · docs/ricerca-mesocicli-periodizzazione-scarichi.md"
Cohesion: 0.18
Nodes (11): 1.10 Cosa dicono i coach (tutto «da verificare»: nessun testo originale visto), 1.1 Periodizzazione: modelli e meta-analisi, 1.2 Volume nel mesociclo: base di partenza e rampa, 1.3 RIR e intensità lungo il blocco, 1.4 Fatica, supercompensazione e sovraccarico, 1.5 Scarico: cosa è, quanto, quando, 1.6 Taper, pausa e ritorno, 1.7 Mantenimento, specializzazione, taglio (+3 more)

### Community 81 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 2) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.15
Nodes (12): 2. Dove le fonti non concordano, 4. Regole per popolazioni, 5.1 Scala del dolore, 5.2 Prontezza e tetti di sforzo, 5.3 Rampe di rientro, 5.4 Quando il coach deve dire «medico», 5. Soglie di prudenza, 8. Domande aperte (+4 more)

### Community 82 - "collaudo-generatore.js (parte 2) · tools/collaudo-generatore.js"
Cohesion: 0.16
Nodes (14): confronta(), costruisciRisultato(), creaAmbiente(), ctx, dirUscita(), gitInfo(), main(), mdReport() (+6 more)

### Community 83 - "Piano di lancio su App Store — 3in (parte 3) · docs/piano-lancio-appstore.md"
Cohesion: 0.20
Nodes (10): 4.1 Funzionalità e valore nativo (4.2 Minimum Functionality, 4.2.2), 4.2 Spam e saturazione (4.3), 4.3 Completezza (2.1), 4.4 Metadata e screenshot (2.3), 4.5 Salute e sicurezza (1.4.1) e 5.1.3, 4.6 Licenze contenuti e diritti, 4.7 Pagamenti (3.1), 4.8 Età (+2 more)

### Community 84 - "Consenso ai dati · js/core/consenso.js + modalita.js, avvio.js, costanti.js"
Cohesion: 0.29
Nodes (7): chiediConsensoSeServe(), consenso(), CONSENT_KEY, CONSENT_VERSION, MODE_KEY, chooseMode(), getStoredMode()

### Community 85 - "Catalogo delle regole e squadra del coach (W1-T1, piano coach v2 B.1, B.4, B.6; registro docs/coach-v2-decisioni.md A.3 e C.2) · tests/catalogo.test.js"
Cohesion: 0.11
Nodes (19): assert, BLOCCATE, BLOCCATE_IN_PARTE, catalogoVero(), contesto(), fs, G, JSON_W1T1 (+11 more)

### Community 86 - "Strumento: elenco file del service worker · tools/genera-sw.js"
Cohesion: 0.18
Nodes (10): fs, html, lista, mancanti, nuovo, path, R, rif (+2 more)

### Community 87 - "Piano di lancio su App Store — 3in (parte 4) · docs/piano-lancio-appstore.md"
Cohesion: 0.22
Nodes (9): 6.1 Invio, 6.2 Note per il revisore, 6.3 Rifiuti, 6.4 Rilascio, 6.5 Monitoraggio, 6.6 Recensioni e aggiornamenti, 6.7 Rollback, 6.8 Supporto (+1 more)

### Community 88 - "Il cancello delle tecniche (piano coach v2, onda 2a, W2-T3): MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02, l aggancio di MES-02 in rirBersaglioBase · tests/tecniche.test.js"
Cohesion: 0.08
Nodes (27): adatta(), AL_CEDIMENTO, app(), assert, attr(), budget(), { caricaApp }, ESERCIZI (+19 more)

### Community 89 - "Alternative e applicazione del programma · js/coach/programma/alternative.js + memoria-chiamata.js, genera.js, onboarding-risultato.js +1"
Cohesion: 0.24
Nodes (14): alternativeDi(), altraVariante(), altScelte, applicaAlternative(), apriAlternative(), chiudiAlternative(), renderAlternative(), rimescolaAlternative() (+6 more)

### Community 90 - "Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +3"
Cohesion: 0.13
Nodes (32): GRUPPI_PRINCIPALI, lunediDi(), settimaneDiFila(), annoRiassunto(), faticaMuscoli(), renderAnno(), renderFatica(), blocchiQuattroSettimane() (+24 more)

### Community 91 - "Mappa delle regole del coach (documento) (parte 3) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, metodi-epoca-oro.js, schede-epoca-oro.js +1"
Cohesion: 0.22
Nodes (9): ABB-10 priorità: il gruppo prioritario per primo, EPO-03 Arnold: schema a 6 giorni, EPO-01 Golden Six (Reg Park e Arnold), EPO-05 Heavy Duty di Mentzer (metodo hit, rivisto), EPO-06 Reeves e Yates: solo ispirazione, EPO-02 5x5 di Reg Park, EPO-07 ripeti: stessa seduta ogni volta, EPO: metodi dell'epoca d'oro (+1 more)

### Community 92 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 2) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.18
Nodes (10): 2. Dove le fonti non concordano, 4. Blocchi di mobilità, 5. Prehab per sicurezza, 7. Regole proposte, 8. Domande aperte, 9. Limiti onesti, Appendice: query pronte (da ripetere con il tetto di ricerca alzato), Come si legge (+2 more)

### Community 93 - "Coach: prontezza prima della seduta · js/coach/prontezza.js + ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.34
Nodes (14): 7. Regole proposte, applicaProntezza(), leggiProntezza(), PRONTEZZA_KEY(), PRONTEZZA_VOCI, prontezzaDiOggi(), prontezzaOggi(), prontezzaStato (+6 more)

### Community 94 - "Calendario: gruppi muscolari · js/ui/calendario/gruppi.js"
Cohesion: 0.80
Nodes (5): GRUPPI_ORDINE, gruppiDelGiorno(), GRUPPO_COLORE, puntiniGruppi(), renderLegendaGruppi()

### Community 95 - "collaudo-generatore.js (parte 3) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (7): hash32(), matrice(), matriceAttrezzi(), matriceForza(), mulberry32(), profilo(), scegli()

### Community 96 - "05 — Conformità alle Review Guidelines · docs/checklist-appstore/05-conformita-review.md"
Cohesion: 0.25
Nodes (8): 05 — Conformità alle Review Guidelines, 1.4.1 e salute, 2.1 Completezza, 2.3 Metadata, 4.2 / 4.2.2 Minimum Functionality, 4.3 Spam, Licenze, diritti, IP, Pagamenti e altro

### Community 97 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.18
Nodes (11): 1.10 Conoscenza del modello (non verificata sul web), 1.1 Volume settimanale per muscolo, 1.2 Serie per seduta e frequenza, 1.3 Vicinanza al cedimento, carico e pause, 1.4 Lunghezza muscolare, ROM e selezione per muscolo, 1.5 Tecniche d'intensità, superserie, minimal dose, 1.6 Mesociclo, progressione e scarico, 1.7 Cosa dicono i praticanti (+3 more)

### Community 98 - "Documenti di architettura · docs/ARCHITETTURA.md + sw.js"
Cohesion: 0.22
Nodes (7): Il coach è un motore a regole, non un'IA; il Coach IA è separato con il suo consenso, Testo in italiano; en/es/de con dizionari e traduttore automatico, Script classici con scope globale: l'ordine in index.html conta, Dati in localStorage (chiavi coach_plus_* e tz_*): il suffisso _toji non si rinomina, Service worker: elenco dei file generato (npm run sw), Un nome, un file: nessuna funzione globale definita in due file (lo controlla npm test), ASSETS

### Community 99 - "Brief del coach: chi sei, cosa vuoi, quando, con quali limiti (OBI-02, D-P6) · js/coach/regia/brief.js + psicologia.js"
Cohesion: 0.25
Nodes (14): psicoCoach(), ATTREZZI_CASA_IDS, ATTREZZI_EXTRA_PALESTRA_IDS, attrezziDichiarati(), attrezziSalvati(), briefCoach(), conLivelloNoto(), listaAttrezziNota() (+6 more)

### Community 100 - "collaudo-generatore.js (parte 4) · tools/collaudo-generatore.js"
Cohesion: 0.13
Nodes (21): analizza(), autotest(), contesto(), controindicato(), controlloOttavaEseguito(), copertoDaDichiarati(), coperturaLibreria(), costruisci() (+13 more)

### Community 101 - "Cedimento: scelta della canzone · js/ui/allenamento/cedimento-canzone.js + mp3-locale.js, stato-condiviso.js"
Cohesion: 0.22
Nodes (25): activeSourceTab, failureTracks, selectedTrackId, selectedTrackUrl, aggiornaRiassuntoMusica(), clearCedimentoAudio(), closeMusicSheet(), getResolvedAudioMode() (+17 more)

### Community 102 - "07 — Rilascio e dopo · docs/checklist-appstore/07-rilascio.md"
Cohesion: 0.29
Nodes (7): 07 — Rilascio e dopo, Aggiornamenti e rollback, Invio, Monitoraggio e feedback, Rifiuti, Rilascio, Supporto

### Community 103 - "08 — Monetizzazione e rientro dell'investimento · docs/checklist-appstore/08-monetizzazione.md"
Cohesion: 0.29
Nodes (7): 08 — Monetizzazione e rientro dell'investimento, App Store Connect, Budget, Codice (C, con OK dell'utente), Fisco (da verificare con un commercialista prima del primo incasso), Regole Apple (da verificare, consultato 2026-10-05), Scelta

### Community 104 - "Mesociclo (piano coach v2, W2-T4: MES-01, MES-02, MES-03, PRN-03, OBI-03): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso) · tests/mesociclo.test.js + integrazione-onda2b.test.js, sicurezza-onda0.test.js, integrazione-onda0.test.js +1"
Cohesion: 0.04
Nodes (36): conSoglieStruttura(), FILE_SOGLIE, fs, path, senzaSoglie(), assert, BASE, { caricaApp } (+28 more)

### Community 105 - "Test: app senza Coach IA (Worker, CSP, chiavi orfane, backup) · tests/senza-coach-ia.test.js + soglie.test.js, struttura.test.js, collaudo-attrezzi.test.js +6"
Cohesion: 0.04
Nodes (47): conBilanciaV2(), FILE_SOGLIE, fs, path, nuovaApp(), voce(), assert, { execFileSync } (+39 more)

### Community 106 - "Piano di lancio su App Store — 3in (parte 5) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 5.1 Matrice di test, 5.2 Test automatici esistenti, 5.3 Test mancanti da aggiungere (C), 5.4 Checklist manuali audio, 5.5 Beta TestFlight, 5.6 Criteri go/no-go, 5. Qualità e test

### Community 107 - "Piano di lancio su App Store — 3in (parte 6) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 8.1 Regole Apple rilevanti (da verificare, consultato 2026-10-05), 8.2 Commissione: Small Business Program, 8.3 Calcolo del rientro (IVA 22% scorporata, commissione 15%), 8.4 Opzioni a confronto, 8.5 Implicazioni, 8.6 Budget dell'investimento, 8. Monetizzazione e rientro dell'investimento

### Community 108 - "Ricerca: cardio, allenamento concorrente, basi di nutrizione e composizione corporea · docs/ricerca-cardio-nutrizione.md"
Cohesion: 0.10
Nodes (19): 1.1 Allenamento concorrente (cardio + pesi), 1.2 Cardio per la salute, per il dimagrimento, tipi di cardio, 1.3 Proteine, 1.4 Bilancio energetico, ritmo di calo e di aumento, 1.5 Composizione corporea e misure (stato rispetto al repo), 1.6 Integratori, alcol, idratazione, salute (stato), 1. Cosa dicono le fonti, 2. Dove le fonti non concordano (+11 more)

### Community 109 - "Guardie del corpo (P4-C, coach v2, W5-T3 ridotta alle sole guardie): nutrizione e composizione corporea · tests/guardie-corpo.test.js"
Cohesion: 0.09
Nodes (23): ADULTI, assert, BIA, campiDiCibo(), { caricaApp }, codiceApp(), DUE_BIA, FILE_SOGLIE (+15 more)

### Community 111 - "Coach: questionario di fine seduta e decisioni · js/coach/questionario-decisioni.js"
Cohesion: 0.22
Nodes (19): apriQuestionario(), decisioniCoach(), eserciziDeiGiorniCon(), etichettaDolore(), fbEsercizio(), fbLivello(), fbScelta(), fbSet() (+11 more)

### Community 112 - "Specialista Forza: la struttura del powerlifting (FRZ-02..05, STD-02) · js/coach/specialita/forza.js + soglie-forza.js, attrezzi.js, questionario-decisioni.js"
Cohesion: 0.17
Nodes (29): voceAttrezzo(), nomeInLibreria(), FORZA_AGGETTIVO, FORZA_ALZATE_BARRA, FORZA_CAMPI_TIPO, FORZA_NOTA_PUNTI, FORZA_NOTA_REQUISITI, FORZA_PUNTI_TESTI (+21 more)

### Community 113 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.29
Nodes (7): 1.1 Abbandono e predittori di aderenza, 1.2 Abitudine, 1.3 Motivazione, autonomia, obiettivi, 1.4 Piacere, intensità, preferenza, 1.5 Prontezza, fatica, sovrallenamento, 1.6 Lapsus, colpa, serie di giorni, gamification, 1. Cosa dicono le fonti

### Community 117 - "Importazione CSV di altre app · js/ui/importa-csv.js + importa-progressi.js"
Cohesion: 0.21
Nodes (16): ALIAS_ESTERI, dataDaCSV(), leggiCSV(), leggiExport(), MESI_EN, nomeDaEstero(), numeroCSV(), secondiCSV() (+8 more)

### Community 118 - "Popolazioni e rientro dopo una pausa (pacchetto P4-S del coach v2 = W4-T2 snello; registro B10, B20, C.2; D-P21 n. 5) · tests/popolazioni.test.js + aiuto-atleta-piano.js"
Cohesion: 0.10
Nodes (23): conP3B(), acorn, appP4S(), assert, BLOCCATE, { caricaApp }, CODICI_NUOVI, conP4S() (+15 more)

### Community 119 - "Progressi: foto · js/ui/progressi/foto.js + pagine.js"
Cohesion: 0.23
Nodes (21): aggiungiFoto(), avviaConfronto(), chiudiFoto(), eliminaFoto(), fotoDB(), fotoPromemoria(), fotoRiduci(), fotoSalva() (+13 more)

### Community 120 - "Ponte nativo (Capacitor) · js/core/nativo.js"
Cohesion: 0.52
Nodes (6): annullaFineRecupero(), attivitaRecupero(), attivo(), plugin(), programmaFineRecupero(), vibra()

### Community 121 - "02 — Tecnica iOS · docs/checklist-appstore/02-tecnica-ios.md"
Cohesion: 0.33
Nodes (6): 02 — Tecnica iOS, Aspetto e accessibilità, Funzioni native, Offline e service worker, Progetto e build, Storage

### Community 122 - "Strumento: catalogo delle regole · tools/genera-catalogo.js"
Cohesion: 0.23
Nodes (15): codiceNellaVoce(), costruisciCatalogo(), espandiCodici(), fs, leggiBloccate(), leggiRegole(), leggiRepo(), leggiRitirati() (+7 more)

### Community 123 - "06 — Qualità e test · docs/checklist-appstore/06-qualita-test.md"
Cohesion: 0.33
Nodes (6): 06 — Qualità e test, Automatici da aggiungere (C), Automatici esistenti, Go / No-go, Matrice dispositivi e condizioni (U), TestFlight (https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview)

### Community 124 - "Disegni degli esercizi · js/dati/disegni-esercizi.js + traduttore.js, schede-esercizio.js"
Cohesion: 0.43
Nodes (7): immagineEsercizio(), IMMAGINI_ESERCIZI, slotImmagine(), slugEsercizio(), EMOJI_TESTA, I18N, testoRicercaVideo()

### Community 125 - "Metodo illustrazioni esercizi — app train track (toji.html) · docs/metodo-illustrazioni-esercizi.md"
Cohesion: 0.22
Nodes (8): 1. Flusso di lavoro, 2. Principi visivi, 3. Modello di prompt (due pose affiancate, una sola generazione), 4. Lavorazione del file (lato Claude), 5. Collegamento nell'app, 6. Mappa muscolare (già fatta), 7. Dove eravamo rimasti, Metodo illustrazioni esercizi — app train track (toji.html)

### Community 126 - "Opzioni: il coach · js/ui/opzioni/il-coach.js + regole-ricerca.js, onboarding.js, stile-iphone.js"
Cohesion: 0.24
Nodes (20): TECNICHE, PROFILE_KEY(), ATTREZZI_PALESTRA, chipCoach(), FASI_CORPO, htmlAttrezziCoach(), htmlForzaCoach(), htmlGravidanzaCoach() (+12 more)

### Community 127 - "elenco-soglie.js · tools/elenco-soglie.js"
Cohesion: 0.20
Nodes (14): caricaSoglie(), cella(), FORZE_AMMESSE, fs, generaElenco(), main(), path, R (+6 more)

### Community 128 - "Sicurezza (documento) · docs/SICUREZZA.md"
Cohesion: 0.40
Nodes (4): Il ripristino di un backup non imposta i consensi ne il codice del dispositivo, Content-Security-Policy in index.html (unsafe-inline per gli script, rete solo verso Worker e cdnjs), Difesa all'ingresso dei dati: import e backup, escapeHtml sui testi del coach IA, pdf.js con impronta SRI da cdnjs

### Community 129 - "Piano coach v2: la squadra del coach (parte 2) · docs/piano-coach-v2.md"
Cohesion: 0.22
Nodes (9): D.1 Ambito, D.2 Formula (nuovo ordine dentro `stimaCaricoIniziale`), D.3 Tabella `PARTENZA_DONNE` (in `js/coach/carichi/soglie-partenza.js`; forza **Decisione** per *chi* parte basso, **Convenzione [D] ±25%** per i numeri; fonte «decisione dell'utente 2026-10-05; ricerca-donne §3.2-3.3 (àncore Symmetric Strength, una fonte di terzi)»), D.4 Barra e corpo libero, D.5 Calibrazione rapida (CAR-18) e promemoria dell'RPE (CAR-19), D.6 Interazioni, D.7 Messaggi (italiano; voci nuove nei tre dizionari, numeri come `#`), D.8 Prove (`tests/partenza-donne.test.js`, in node con `tests/aiuto-app.js`) (+1 more)

### Community 130 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 2) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.33
Nodes (5): 2. Dove le fonti non concordano, 6. Domande aperte, 7. Limiti onesti, 8. Appendice: query pronte per un'altra sessione con il tetto alzato, Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in

### Community 131 - "03 — Audio (tema chiave) e prove manuali · docs/checklist-appstore/03-audio.md"
Cohesion: 0.67
Nodes (3): 03 — Audio (tema chiave) e prove manuali, Implementazione (C), Prove manuali su dispositivo (U), con esito e iOS usato

### Community 132 - "Piano di lancio su App Store — 3in (parte 7) · docs/piano-lancio-appstore.md"
Cohesion: 0.50
Nodes (4): 1.1 Decisioni prese (2026-10-05), 1.2 Ancora aperte, 1.3 Nome "3in", bundle id e cosa va rinominato, 1. Decisioni prese e questioni aperte

### Community 133 - "Piano di lancio su App Store — 3in (parte 8) · docs/piano-lancio-appstore.md"
Cohesion: 0.29
Nodes (7): 3.1 Piano di prove OWASP MASVS v2 / MASTG, 3.3 Servizi esterni, 3.4 Permessi e Info.plist, 3.5 Backup, esportazione, cancellazione, minori, 3.6 Privacy policy, App Privacy labels, Privacy Manifest, 3.7 Rimozione del Coach IA dalla build iOS v1 (D9): punti di codice, 3. Sicurezza e privacy

### Community 134 - "Volume per muscolo: fasce per unità, solutore delle serie, tetti, verifica con la causa (IPE-01, IPE-02, IPE-06, OBI-04, EST-02, REG-02, VOL-01, VOL-02, SES-01, REC-01, ESI-01) · js/coach/volume/volume.js + piano-coach-v2.md, soglie-volume.js, attributi-esercizi.js +5"
Cohesion: 0.09
Nodes (56): E.3 Onda 2 — il generatore, F.1 Invarianti (ogni integrazione li verifica), F.2 Rischi e rimedi, F.3 Programmi già salvati sui telefoni, F.4 Ogni onda resta rilasciabile, F. Rischi e invarianti, COACH_PARAMETRI, faseDaObiettivi() (+48 more)

### Community 136 - "W2-T5, split, giorni e attrezzi (PRG-02, OBI-01, OBI-07, CAS-01, CAS-10, ETA-05): prove in node con l app vera in vm (tests/aiuto-app.js) · tests/split.test.js"
Cohesion: 0.12
Nodes (10): assert, BASE, { caricaApp }, caricaConSoglie(), fs, GRUPPI_REC, path, R (+2 more)

### Community 137 - "Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + traduttore.js"
Cohesion: 0.33
Nodes (14): confirm(), deleteWeek(), isoWeekLabel(), loadRestDays(), loadWeeks(), renderWeeks(), restKey(), restoreWeek() (+6 more)

### Community 138 - "Perché del coach e squadra: ogni numero cambiato porta codice e sotto-coach (REG-03) · js/coach/regia/perche.js + piano-coach-v2.md, catalogo-regole.js, coach-v2-decisioni.md +7"
Cohesion: 0.10
Nodes (25): Catalogo delle regole generato dalla mappa (npm run catalogo), E.1 Regressioni ammesse del cancello (meccanismo e voci), E. Copertura del collaudo (40 criteri falliti su 48), E.0 Protocollo di lavoro (vale per ogni task), E.2 Onda 1 — fondamenta, E.5 Onda 4 — sicurezza, recupero, popolazioni, E.7 Revisione finale, E.8 Proprietà dei file che passano tra onde (+17 more)

### Community 139 - "Scarico unico e protezioni (P3-B, piano coach v2 W3-T5, versione snella: MES-05, MES-07, CST-09, N6, PRN-03; solo programmi con prog.versione 2) · tests/scarichi.test.js + tecniche.test.js"
Cohesion: 0.10
Nodes (18): ALTA, assert, BASSA, conPrimaSedutaCoach(), conScaricoDiGiorniFa(), dodiciSettimane(), FB(), fs (+10 more)

### Community 140 - "Ricerca: recupero, allenamento attento ai dolori e popolazioni speciali (parte 3) · docs/ricerca-recupero-infortuni-popolazioni.md"
Cohesion: 0.22
Nodes (9): 3. Matrice fastidio → modifica, Anca, Caviglia (non cercato sul web: conoscenza del modello, Convenzione), Collo (assente oggi dal coach; base [V] solo sull'esercizio per il dolore cronico, il resto conoscenza del modello, Convenzione), Ginocchio, Gomito, Polso, Schiena bassa (+1 more)

### Community 141 - "collaudo-generatore.js (parte 5) · tools/collaudo-generatore.js"
Cohesion: 0.22
Nodes (9): contaSerie(), creditiAttributi(), creditoGruppo(), eseguiMatrice(), gruppoDi(), pesoProfilo(), r1(), tabellaSettimana() (+1 more)

### Community 142 - "Mesociclo: durata, blocchi, rampa di volume, RIR per settimana e scarico (MES-01..03, PRN-03, OBI-03, PRG-01, PRG-38) · js/coach/programma/mesociclo.js + parametri.js, soglie-struttura.js, ricerca-ipertrofia-programmazione.md"
Cohesion: 0.14
Nodes (31): 5. Regole proposte, regolaAttiva(), regolaAttivaCalcolo(), REGOLE_SPEGNIBILI, arrotonda2(), CAUSE_CONTROLLO_OTTAVA, classeRirDi(), CLASSI_PIANO (+23 more)

### Community 143 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 2) · docs/ricerca-algoritmi-carichi-e-app.md + mesociclo.test.js"
Cohesion: 0.15
Nodes (14): 3.10 Corpo libero, elastici, cavi, tempo, 3.11 Stallo per tendenza (`trendE1rm`) e scala delle azioni, 3.12 Scarico e ripresa, 3.13 Calibrazione del RIR corretta (`rirBias`), 3.14 Parametri (tutti in `COACH_PARAMETRI`) e vettori di prova per i test, 3.1 Ingressi per serie e cosa manca oggi nello storico, 3.3 Dal massimale al carico (`caricoDaE1rm`), 3.4 Tabella di conversione (calcolata, per l'implementatore e per i test) (+6 more)

### Community 144 - "Programma azzerato, progressi e carichi salvati (P3-M, D-P23) · tests/conserva-progressi.test.js"
Cohesion: 0.16
Nodes (23): assert, { caricaApp, elencoFixture, leggiFixture }, caricoDiLavoro(), chiaviApp(), conCarico(), creaBase(), DATI_PERSONALI, FUORI() (+15 more)

### Community 146 - "Popolazioni e rientro dopo una pausa: base degli over 65, gravidanza, calendario fermo, rampa e risalita del rientro (ETA-08 a, REC-12 a, CST-01, CST-02, CAR-04, ALG-14) · js/coach/sicurezza/popolazioni.js + regole-nuove.js, soglie-popolazioni.js"
Cohesion: 0.15
Nodes (32): giorniDallUltimaSeduta(), gruppoInPriorita(), mancavaSoloUltimaSerie(), prontezzaRecente(), regoleRicAlCarico(), rientroPiano(), sedutePassate(), settimanaCentraleBlocco() (+24 more)

### Community 147 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 3) · docs/ricerca-principianti-12-settimane.md"
Cohesion: 0.22
Nodes (9): 3.1 Principi, 3.2 Tabella settimana per settimana (valida per 2, 3 e 4 giorni), 3.4 Preferenze di esercizio per il principiante (estende SEL-06), 3.5 Regola di progressione per il principiante (si appoggia su PGR-01/02/04), 3.6 Calibrazione nelle sedute 1-3, 3.7 Quando introdurre più volume, 3.8 Criteri di passaggio a intermedio (numeri), 3.9 Varianti (+1 more)

### Community 148 - "Cancello delle tecniche: quale tecnica, su quale esercizio, a chi e quando (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02) · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +5"
Cohesion: 0.08
Nodes (53): B.3 Le catene: ordine fisso e scritto, COACH_REGOLE, strSquatDoppio(), aggiungiPerche(), limitaTecnicheIntense(), SOGLIE_TECNICHE, budgetTecniche(), CLASSI_PER_TECNICA (+45 more)

### Community 149 - "Coach: regole dalla ricerca (parte 2) · js/coach/regole-ricerca.js + attrezzi.js, coach-v2-decisioni.md, ricerca-casa-poco-tempo.md +2"
Cohesion: 0.27
Nodes (14): D. Decisioni di prodotto (prese; rispondono al cap. H del piano), 7. Regole proposte, arrotondaAttrezzo(), passoAttrezzo(), arrotonda(), carichiDelGiorno(), caricoInGriglia(), caricoProssimo() (+6 more)

### Community 150 - "Integrazione dell'onda 4 (INT-4): i collegamenti che nessuno dei quattro pacchetti (P4-C guardie del corpo, P4-F fastidi, P3-C Forza, P4-S popolazioni e rientro) poteva chiudere da solo · tests/integrazione-onda4.test.js"
Cohesion: 0.09
Nodes (17): ADULTI, assert, { caricaApp }, conGravidanza(), DUE_BIA, fileJs(), fs, GRUPPI (+9 more)

### Community 151 - "Generatore a stadi e brief (piano coach v2, onda 1, W1-T4): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso) · tests/genera-stadi.test.js + aiuto-genera.js"
Cohesion: 0.16
Nodes (11): { caricaApp }, TUTTI_GLI_OBIETTIVI, app(), assert, BASE, brief(), { caricaApp, ORA, profili, TUTTI_GLI_OBIETTIVI }, { conSoglieStruttura } (+3 more)

### Community 152 - "Esportazione verso calendari (.ics) · js/ui/esporta-ics.js"
Cohesion: 0.48
Nodes (6): aggiornaAiutoIcs(), buildIcs(), icsData(), icsEscape(), icsFold(), linkGoogle()

### Community 153 - "Correzioni dopo la revisione indipendente dell onda 2b/2c (INT-2d, docs/coach-v2-decisioni.md D-P21): una prova per correzione, con i numeri scritti · tests/revisione-onda2d.test.js"
Cohesion: 0.10
Nodes (17): assert, BASE, { caricaApp }, ES_CLASSI, FASTIDI, GIORNI, GOAL_SET, LIVELLI (+9 more)

### Community 154 - "Fastidi: la modifica scritta (P4-F, W4-T1 snella; REC-04, SAF-02 con nota, DEC-03/04, BIO-06, PRG-24) · tests/fastidi.test.js"
Cohesion: 0.10
Nodes (15): app, assert, BASE, { caricaApp }, conRec04Spenta(), ETICHETTA, fs, FUORI (+7 more)

### Community 155 - "Ricerca: algoritmi di carico, autoregolazione e come le migliori app decidono il prossimo peso (parte 3) · docs/ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.33
Nodes (6): 1.1 RIR e RPE: precisione, errori sistematici, uso per decidere il carico, 1.2 Massimale stimato (e1RM), 1.3 Dentro la seduta: caduta di ripetizioni, back-off, perdita di velocità e sostituti, 1.4 Progressione: regole, passi, finestre di ripetizioni, 1.5 Stalli, mancati, pause e scarichi, 1. Cosa dicono le fonti

### Community 156 - "Coach: biomeccanica · js/coach/biomeccanica.js"
Cohesion: 0.43
Nodes (6): CUE_SCHEMA, htmlProva(), htmlTestFaiDaTe(), SCALE_DOLORE, setTest(), TEST_FAI_DA_TE

### Community 157 - "Coach: intensità (INT) · js/coach/intensita.js + coach-mappa-regole.md, ricerca-struttura-e-intensita.md"
Cohesion: 0.24
Nodes (10): INT: intensità da BIA e prime sedute, INT-02 esigenza di partenza 120/100/95%, INT-04 prima volta con un esercizio: una serie in meno, +1 RIR, INT-03 una ripetizione in riserva in più con due bandiere, FA_MEDIA, faRiferimento(), PARAM_INTENSITA, primaVoltaUnaSerieInMeno() (+2 more)

### Community 158 - "Specialista Forza, i carichi dei giorni medi e leggeri (P3-C, regola FRZ-11): «il giorno leggero è leggero» · tests/forza-carichi.test.js"
Cohesion: 0.12
Nodes (19): A, assert, atleta(), { caricaApp }, conForzaCarichi(), conto(), controllaOrdine(), dodiciSettimane() (+11 more)

### Community 159 - "Soglie del coach · docs/soglie-coach.md + split.test.js"
Cohesion: 0.11
Nodes (17): `SOGLIE_BIA` — `js/coach/bia/soglie-bia.js` (preparatore), Soglie del coach, `SOGLIE_FASTIDI` — `js/coach/sicurezza/soglie-fastidi.js` (sentinella), `SOGLIE_FORZA_CARICHI` — `js/coach/specialita/soglie-forza-carichi.js` (specialista), `SOGLIE_FORZA` — `js/coach/specialita/soglie-forza.js` (specialista), `SOGLIE_PARTENZA` — `js/coach/carichi/soglie-partenza.js` (bilancia), `SOGLIE_POPOLAZIONI` — `js/coach/sicurezza/soglie-popolazioni.js` (sentinella), `SOGLIE_PROGRESSIONE` — `js/coach/carichi/soglie-progressione.js` (bilancia) (+9 more)

### Community 160 - "INT-2f (revisione indipendente dell'onda 2e, MAGGIORE 2): «Hip Hinge a Corpo Libero» e un ripiego, non una scelta da preparatore · tests/hip-hinge-ripiego.test.js"
Cohesion: 0.18
Nodes (6): a, assert, BASE, { caricaApp }, G, test

### Community 161 - "Scarico: dose unica, fatica, scarico del programma e scarico deciso dal coach con le sue protezioni (CAR-03, CAR-10, MES-05, MES-07, MES-08, CST-09, W1-T3, P3-B) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, soglie-scarico.js, piano-coach-v2.md +1"
Cohesion: 0.19
Nodes (22): E.4 Onda 3 — carichi e autoregolazione, 3.7 Scarico reattivo: segnali e soglie numeriche, B. Scarico, storicoProntezza(), DOSE_SCARICO, doseDellaSettimana(), doseDelLivello(), eserciziInCalo() (+14 more)

### Community 162 - "Il tempo (piano coach v2, W2-T2): CAS-05 (modello dei tempi: serie, cambi, lati, coppie, riscaldamento e rampa), CAS-06 (capacita), CAS-07 e CAS-08 (la scala del taglio, il tempo e un tetto), · tests/tempo.test.js"
Cohesion: 0.18
Nodes (16): app(), assert, BASE, { caricaApp }, costruisci(), dur(), E(), fs (+8 more)

### Community 163 - "Volume per muscolo (W2-T1, piano coach v2 E.3; registro B6, B7, B19, D-P17) · tests/volume.test.js"
Cohesion: 0.12
Nodes (14): assert, BASE, bersagli(), brief(), { caricaApp }, FILE_NUOVI, fs, nuovaApp() (+6 more)

### Community 164 - "Aiuto per le prove del generatore a stadi (W1-T4): i profili con seme fisso e il modo di far costruire i programmi all app vera · tests/aiuto-genera.js"
Cohesion: 0.22
Nodes (14): ATTREZZI_PALESTRA, BIA, conScelte(), GRUPPI, idMetodi(), MOMENTI_PROVA, mulberry32(), nomiLibreria() (+6 more)

### Community 165 - "Difetti trovati dalla revisione indipendente della sotto-onda 3a (INT-3b): carichi che scendevano a ogni blocco (B1), a ogni seduta con bersagli alternati (M1), il tetto · tests/revisione-onda3a.test.js"
Cohesion: 0.13
Nodes (13): assert, { caricaApp }, CASA20, { conBilanciaV2, inGrigliaBase }, FASI, H, nonSalgono(), PROG_V2 (+5 more)

### Community 166 - "Aiuto per le prove del piano che si esegue in seduta e dello scarico unico (P3-B, piano coach v2 W3-T4 e W3-T5, versione snella) · tests/aiuto-atleta-piano.js + integrazione-onda4.test.js"
Cohesion: 0.20
Nodes (15): apriGiorno(), BASE, { caricaApp }, FILE_P3B, fs, giorniDiAllenamento(), path, R (+7 more)

### Community 167 - "Progressi: peso corporeo · js/ui/progressi/peso.js + archivio.js, ricerca-obiettivi-e-programmi.md, ricerca-cardio-nutrizione.md +8"
Cohesion: 0.17
Nodes (25): E.6 Onda 5 — mente, corpo, interfaccia, traduzioni, 4. Audit delle regole esistenti, 5. Regole proposte, 0.1 Cosa fa oggi l'app per ciascun obiettivo (letto nel codice), 6. Audit delle regole esistenti, 7. Regole proposte, eliminaBia(), frenoBia() (+17 more)

### Community 168 - "Backup e ripristino · js/core/backup.js + statistiche.js"
Cohesion: 0.40
Nodes (9): applicaFotografia(), chiaviApp(), confermaRipristino(), contaAllenamenti(), esportaBackup(), fotografia(), ripristinaBackup(), valorePulito() (+1 more)

### Community 169 - "Griglia dei pesi per attrezzo e manubrio più pesante dichiarato nella progressione (ALG-06, CAS-01) · js/coach/carichi/attrezzi.js"
Cohesion: 0.42
Nodes (10): alTettoDeiManubri(), esercizioConManubri(), faseGrigliaETetto(), fmtPeso(), fraseGrigliaPiuVicino(), fraseTettoCima(), fraseTettoNonOltre(), fraseTettoRipetizioni() (+2 more)

### Community 170 - "Distribuzione dei muscoli piccoli e flessione del ginocchio con poco tempo (P3-G, coach v2 onda 3): una prova per correzione, con i numeri di prima · tests/distribuzione.test.js"
Cohesion: 0.18
Nodes (10): app, assert, BASE, { caricaApp }, costruisci(), CREDITI, fraz(), griglia() (+2 more)

### Community 171 - "Specialista Forza: il giorno leggero è leggero (FRZ-11) · js/coach/specialita/forza-carichi.js + fasi.js, soglie-forza-carichi.js, regole-ricerca.js"
Cohesion: 0.19
Nodes (16): eseguiFasi(), FASI_PUNTI, fasiRegistrate(), applicaCaricoProgressivo(), FORZA_FRASI_GIORNO, FORZA_RANGO_ONDA, forzaBaseReps(), forzaCaricoGiorno() (+8 more)

### Community 172 - "Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js"
Cohesion: 0.52
Nodes (11): FAILURE_SET_SECONDS, dropActive, dropInterval, dropRemaining, apriCedimento(), chiudiCedimento(), finishDropSet(), onDropVolumeInput() (+3 more)

### Community 173 - "INT-2e, attrezzi dichiarati che arrivano alla scelta degli esercizi (CAS-01, D-P3): prove in node con l app vera in vm (tests/aiuto-app.js) · tests/attrezzi-dichiarati.test.js"
Cohesion: 0.17
Nodes (5): assert, { caricaApp }, PROFILI, test, TUTTI_CASA

### Community 174 - "Ricerca: programmare l'ipertrofia (volume, frequenza, sforzo, selezione, split, scarico) per il generatore di 3in (parte 3) · docs/ricerca-ipertrofia-programmazione.md"
Cohesion: 0.20
Nodes (10): 3.1 Punto di partenza: cosa produce oggi `buildProgram` (simulazione del 2026-10-05), 3.2 Serie settimanali per muscolo (conteggio frazionario), 3.3 Serie per seduta e frequenza, 3.4 Ripetizioni, sforzo e pause per tipo di esercizio, 3.5 RIR bersaglio per settimana del blocco (ipertrofia), 3.6 Scarico: quando e come, 3.7 Split per giorni e per minuti, 3.8 Esercizi e serie per seduta in base ai minuti (+2 more)

### Community 175 - "Il piano si esegue in seduta (P3-B, piano coach v2 W3-T4, versione snella: MES-03 in seduta, solo programmi con prog.versione 2) · tests/piano-in-seduta.test.js"
Cohesion: 0.22
Nodes (9): assert, COMBINAZIONI, conStoriaDiPrima(), FB(), H, LIVELLI, OBIETTIVI, test (+1 more)

### Community 176 - "Ricerca: tecniche di intensificazione e metodi avanzati/professionali di bodybuilding (cosa funziona, per chi, con quali rischi) (parte 2) · docs/ricerca-metodi-avanzati-intensita.md"
Cohesion: 0.22
Nodes (9): 1.1 Drop set, rest-pause, myo-reps, cluster (tecniche «oltre la serie»), 1.2 Cedimento, sforzo e rapporto stimolo-fatica, 1.3 Superserie, pre/post-affaticamento, giant set, pause, 1.4 Eccentrico, forzate, parziali, tempo, isometrici, 1.5 BFR (allenamento con restrizione del flusso), 1.6 Densità, circuiti, pump, 1.7 Professionisti di oggi e naturali, 1.8 Cosa programmano per i naturali gli allenatori contemporanei (+1 more)

### Community 177 - "Ricerca: riscaldamento, mobilità, prevenzione e defaticamento (parte 3) · docs/ricerca-riscaldamento-mobilita-prevenzione.md"
Cohesion: 0.22
Nodes (9): 1.1 Riscaldamento: prestazione e infortuni, 1.2 Serie progressive e riscaldamento specifico, 1.3 Stretching prima: statico, dinamico, PNF, 1.4 Foam rolling e pistola da massaggio, 1.5 Mobilità, ROM, stretching come metodo, 1.6 Prehab per zona (cosa si sa e cosa no), 1.7 Respirazione, bracing, defaticamento, età, temperatura, 1.8 Cosa dicono i coach (verificato poco) (+1 more)

### Community 178 - "Lettore BIA a struttura · js/coach/bia/lettore.js + onboarding.js, opzioni.js"
Cohesion: 0.36
Nodes (8): applyBiaValues(), handleBiaPdf(), numIt(), parseBiaText(), parseInBody(), agentBiaPdf(), bindBiaInputs(), ensurePdfJs()

### Community 179 - "Generatore: residui dell onda 1 (piano coach v2, W1-T6): prove in node con l app vera in vm (tests/aiuto-app.js, orologio fisso, caso fisso), come generatore-onda0b.test.js · tests/generatore-onda1.test.js"
Cohesion: 0.27
Nodes (8): app(), assert, { caricaApp }, costruisci(), GIORNI, pulito(), puntiLombari(), test

### Community 180 - "INT-2g (ultimo giro prima della PR dell'onda 2e): le rifiniture trovate dalla seconda revisione indipendente (revisione-onda2f) · tests/revisione-onda2g.test.js"
Cohesion: 0.22
Nodes (7): a, assert, { caricaApp }, firma(), PL, se(), test

### Community 181 - "Mappa delle regole del coach (documento) (parte 4) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md"
Cohesion: 0.20
Nodes (7): EPO-04 Gironda 8x8, TEC: tecniche (piramide, negative, riposo-pausa...), TEC-03 ripetizioni forzate, TEC-06 Gironda 8x8 (ottoperotto), TEC-05 contrazione di picco, TEC-04 riposo-pausa, TEC-07 tetto alle tecniche al cedimento (RIC-04)

### Community 182 - "Golden dei carichi: le quattro catene del coach (W1-T3, docs/piano-coach-v2.md B.3 ed E.2) (parte 2) · tests/carichi-golden.test.js + ricerca-mesocicli-periodizzazione-scarichi.md, ricerca-algoritmi-carichi-e-app.md"
Cohesion: 0.15
Nodes (14): 3.9 Seduta o pausa saltata, Il modello consigliato in 6 righe, In una pagina, Test suggeriti (modello: `tests/browser/regole-nuove.js`), cala(), incompleta(), mancato(), meta() (+6 more)

### Community 183 - "Fastidi: la modifica scritta (REC-04 parte a, SAF-02, PRG-24, BIO-06) · js/coach/sicurezza/fastidi.js + soglie-fastidi.js"
Cohesion: 0.36
Nodes (10): applicaNoteFastidi(), datiNotaFastidio(), eNotaDelFastidio(), esclusoDalFastidio(), FASTIDI_ZONE, fastidiAttivi(), nomiDelProgramma(), pavimentoRirFastidi() (+2 more)

### Community 184 - "Stato condiviso (timer, cedimento, musica) · js/core/stato-condiviso.js + mp3-locale.js"
Cohesion: 0.36
Nodes (8): AUDIO_DB_NAME, AUDIO_DB_VERSION, AUDIO_STORE, RECOVERY_RING_CIRCUMFERENCE, dbAddTrack(), dbDeleteTrack(), dbGetAllTracks(), openAudioDB()

### Community 185 - "Completamenti della settimana: schemi mancanti, copertura per regioni, femorali, ordine (PRG-21, PRG-23, ABB-03, CAS-14, ORD-03, B29) · js/coach/programma/completamenti.js + soglie-selezione.js, genera.js, tempo.js"
Cohesion: 0.21
Nodes (14): copriCuffia(), CUFFIA_ESERCIZI, eMultiDiGambe(), NOTA_FEMORALI_SENZA_LEG_CURL, NOTA_FEMORALI_SERVE_FLESSIONE, NOTA_REMATORE_INVERSO, RX_CUFFIA, schemaDiGambe() (+6 more)

### Community 186 - "Schede tecniche per esercizio · js/dati/schede-tecniche.js + ricerca-recupero-infortuni-popolazioni.md, biomeccanica.js, schede-varianti.js"
Cohesion: 0.23
Nodes (10): 6. Audit delle regole esistenti, In una pagina, respiroPer(), closeExerciseInfo(), GLOSSARIO, pausaConsigliata(), preferenzaEsercizio(), RESPIRO (+2 more)

### Community 187 - "Ricerca: le prime 12 settimane del principiante e la prima seduta (parte 4) · docs/ricerca-principianti-12-settimane.md + ricerca-ipertrofia-programmazione.md, onboarding.js"
Cohesion: 0.25
Nodes (8): 4. Audit delle regole esistenti (confronto con il codice), 3.3 Struttura per giorni a settimana, 5.1 Errori del principiante e come il piano li evita, 5.2 Salvaguardie che hanno sempre la precedenza, 5.3 Trappole nel generatore (da [S]), 5. Errori e salvaguardie, 6. Audit delle regole esistenti, splitFor()

### Community 188 - "04 — Sicurezza e privacy · docs/checklist-appstore/04-sicurezza-privacy.md"
Cohesion: 0.33
Nodes (6): 04 — Sicurezza e privacy, Dati, consenso, cancellazione, MASVS v2 / MASTG (fonte da verificare, consultato 2026-10-05), Permessi, Privacy policy e dichiarazioni, Servizi esterni

### Community 189 - "Rampa del volume in seduta: le serie seguono il piano della settimana (MES-03) · js/coach/volume/rampa-settimana.js + soglie-rampa.js"
Cohesion: 0.43
Nodes (6): posizioneNelPiano(), rampaAlCarico(), serieDellaSettimana(), serieDelPianoQuestaSettimana(), sogliaRampa(), SOGLIE_RAMPA

### Community 190 - "collaudo-generatore.js (parte 6) · tools/collaudo-generatore.js"
Cohesion: 0.40
Nodes (6): causaDichiarata(), conflittiRecupero(), consecutivi(), minutiEffettivi(), noteFalse(), unitaRiempibile()

### Community 191 - "Istruzioni per gli agenti (CLAUDE.md) · CLAUDE.md + integrazione-onda4.test.js"
Cohesion: 0.25
Nodes (6): Architettura in breve, Come cercare (senza rileggere il codice), Delegation, Model routing, Project context & code search, controlla()

### Community 192 - "Strumento: mappa dei simboli globali (parte 2) · tools/simboli.js"
Cohesion: 0.36
Nodes (8): aggiungiUso(), analizzaUsi(), localiDi(), nomeWindow(), nomiPattern(), proprietario(), usiInStringa(), visita()

### Community 193 - "Ricerca: forza, powerlifting, S&C e progressione dei carichi (parte 2) · docs/ricerca-forza-progressione.md"
Cohesion: 0.29
Nodes (7): 1.1 Periodizzazione (forza e ipertrofia), 1.2 Autoregolazione, RIR e RPE, 1.3 1RM, %1RM, ripetizioni, test, 1.4 Progressione per livello: cosa fanno i programmi noti, 1.5 Standard di forza (multipli del peso corporeo), 1.6 Temi non cercati: conoscenza del modello (non verificata sul web), 1. Cosa dicono le fonti

### Community 194 - "Mappa delle regole del coach (documento) (parte 5) · docs/coach-mappa-regole.md + ricerca-struttura-e-intensita.md, onboarding-risultato.js"
Cohesion: 0.33
Nodes (3): PAR: carico di partenza dai dati del corpo, INT-01 stato del corpo dalla BIA (angolo di fase, ECW/TBW): bandiere di prudenza, PAR-01..05 carico di partenza stimato da massa muscolare e storico

### Community 195 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 2) · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.29
Nodes (6): 2. Dove le fonti non concordano, 4. Audit delle regole esistenti, 6. Domande aperte, 7. Limiti onesti, Fonti viste (titolo e identificativo), Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza

### Community 196 - "Ricerca: psicologia dell'allenamento, aderenza, comunicazione del coach e prontezza (parte 3) · docs/ricerca-psicologia-aderenza.md"
Cohesion: 0.29
Nodes (7): 3.1 Cosa fare dopo sedute o settimane saltate (default proposti), 3.2 Prontezza: punteggio difendibile e soglie riduci / mantieni / spingi, 3.3 Scala del tono dei messaggi (linee guida), 3.4 Dieci messaggi nella voce dell'app, 3.5 Bandiere rosse e risposta sicura, 3.6 Per chi (uomini, donne, anziani, giovani), 3. Numeri e testi per il coach

### Community 197 - "collaudo-generatore.js (parte 7) · tools/collaudo-generatore.js"
Cohesion: 0.67
Nodes (3): bandaB6(), pavimentoDiretteB6(), volumeGruppi()

### Community 198 - "Ricerca: biomeccanica e scelta degli esercizi (regioni muscolari, alternative, cue) (parte 2) · docs/ricerca-biomeccanica-esercizi.md"
Cohesion: 0.33
Nodes (6): 5.1 Inventario [V] (script eseguito sul codice, 2026-10-05), 5.2 Regole in uso (sintesi), 5.4 Tag sospetti o da rivedere [V salvo diversa nota], 5.5 Movimenti mancanti per regione (priorità A = chiude un buco concreto; B = ricambio), 5.6 Cue: stato nell'app [V], 5. Audit della libreria

### Community 199 - "Schermata Oggi · js/ui/oggi.js"
Cohesion: 1.00
Nodes (3): categoriaDi(), CATEGORIE, obiettiviSettimana()

## Knowledge Gaps
- **1249 isolated node(s):** `CREDITI`, `ATTR`, `assert`, `{ caricaApp }`, `assert` (+1244 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1455 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderOggi()` connect `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + metodi-momenti.js, stato.js, traduttore.js +11` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, elenco-esercizi.js +5`, `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + utility.js, fogli.js, importa-progressi.js +12`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js, agente-consigli.js +10`, `Schermata Oggi · js/ui/oggi.js`, `BIA nelle opzioni · js/coach/bia/opzioni.js + questionario-decisioni.js, repertorio.js, agente-consigli.js +13`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, navigazione.js, storage.js +6`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1`, `Sessione gia completata · js/ui/sessione-completata.js + storico.js`, `Coach: struttura professionale della scheda (ABB) · js/coach/programma/struttura-pro.js + ricette.js, completamenti.js, libreria-esercizi.js +18`, `Esigenza del coach · js/coach/esigenza.js + intensita.js`, `Seduta: tab Allenamento, serie e RPE · js/ui/allenamento/seduta.js + macchinario-occupato.js, lavoro-cronometro.js, selezione-multipla.js +12`, `Coach: regole dalla ricerca (parte 2) · js/coach/regole-ricerca.js + attrezzi.js, coach-v2-decisioni.md, ricerca-casa-poco-tempo.md +2`, `Lingue: traduttore automatico dell'interfaccia · js/lingue/traduttore.js + backup.js, avvio-traduttore.js`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +3`, `Disegni degli esercizi · js/dati/disegni-esercizi.js + traduttore.js, schede-esercizio.js`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 193 inferred relationships involving `Novità del coach v2` (e.g. with `arrotondaAttrezzo()` and `faseGrigliaETetto()`) actually correct?**
  _`Novità del coach v2` has 193 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CREDITI`, `ATTR`, `assert` to the rest of the system?**
  _1249 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, elenco-esercizi.js +5` be split into smaller, more focused modules?**
  _Cohesion score 0.09038461538461538 - nodes in this community are weakly interconnected._
- **Why does `switchTab()` connect `Fondamenta: storage e normalizzazione dei dati · js/core/storage.js + utility.js, fogli.js, importa-progressi.js +12` to `Figura anatomica e uso dei muscoli · js/ui/figura-anatomica.js + giorno.js, gruppi-muscolari.js, elenco-esercizi.js +5`, `Opzioni: impostazioni · js/ui/opzioni/impostazioni.js + psicologia.js, stile-iphone.js, schermo-acceso.js +3`, `Piano: giorni di riposo e settimane salvate · js/ui/riposo-settimane.js + traduttore.js`, `Seduta libera e sedute extra · js/ui/seduta-libera.js + schede-pronte.js, navigazione.js, storage.js +6`, `Cedimento: finestra drop set e audio · js/ui/allenamento/cedimento.js + stato-condiviso.js, costanti.js`, `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + metodi-momenti.js, stato.js, traduttore.js +11`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `INT-2e, attivazione della struttura Forza (FRZ-01): la domanda «Che forza?» (forza generale | powerlifting) in onboarding e in Opzioni, il salvataggio di forzaTipo e puntiDeboli nel profilo · tests/forza-attivazione.test.js + forza-modalita.test.js, attrezzi-onboarding.test.js, tempo-copertura.test.js +5` be split into smaller, more focused modules?**
  _Cohesion score 0.03898305084745763 - nodes in this community are weakly interconnected._
- **Why does `controlloOttavaPrincipiante()` connect `Mesociclo: durata, blocchi, rampa di volume, RIR per settimana e scarico (MES-01..03, PRN-03, OBI-03, PRG-01, PRG-38) · js/coach/programma/mesociclo.js + parametri.js, soglie-struttura.js, ricerca-ipertrofia-programmazione.md` to `Scarico: dose unica, fatica, scarico del programma e scarico deciso dal coach con le sue protezioni (CAR-03, CAR-10, MES-05, MES-07, MES-08, CST-09, W1-T3, P3-B) · js/coach/sicurezza/scarico.js + ricerca-mesocicli-periodizzazione-scarichi.md, soglie-scarico.js, piano-coach-v2.md +1`, `Coach: repertorio di consigli e azioni · js/coach/repertorio.js + ricerca-mesocicli-periodizzazione-scarichi.md, regole-ricerca.js, agente-consigli.js +10`, `BIA nelle opzioni · js/coach/bia/opzioni.js + questionario-decisioni.js, repertorio.js, agente-consigli.js +13`, `Calendario: copia della settimana · js/ui/calendario/copia-settimana.js + menu-settimana.js, mese.js, scambio.js +1`, `Coach: repertorio di consigli e azioni (parte 2) · js/coach/repertorio.js + metodi-momenti.js, stato.js, traduttore.js +11`, `Ricerca: mesocicli, periodizzazione, scarichi e gestione della fatica · docs/ricerca-mesocicli-periodizzazione-scarichi.md + progressivo.js, regole-ricerca.js, mappa-per-agenti.md +5`, `Cancello delle tecniche: quale tecnica, su quale esercizio, a chi e quando (MAV-01..09, MAV-11, MAV-13, MAV-16, ETA-02) · js/coach/sicurezza/tecnica-adatta.js + attributi-esercizi.js, tecniche.js, soglie-tecniche.js +5`, `Statistiche dei carichi · js/ui/statistiche.js + statistiche-grafico.js, riepilogo.js, schemi.js +3`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._