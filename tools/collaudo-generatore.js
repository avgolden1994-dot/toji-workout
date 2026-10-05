#!/usr/bin/env node
/* Collaudo del generatore di schede (3in): controlla i programmi che esce da buildProgram() con i criteri
   di un preparatore esperto di forza e ipertrofia, su una matrice di profili (obiettivo x livello x giorni x minuti x
   luogo x fastidi x sesso x eta). E un audit, non un controllo bloccante: esce sempre con codice 0.
   Esegue il codice VERO dell app in node (vm), senza browser: stesso metodo di tests/muscoli.test.js, ma carica tutti
   gli script di index.html (tranne avvio.js) cosi buildProgram trova tutte le sue dipendenze.

   npm run collaudo:schede                        matrice "standard" (10.800 profili), report fuori dal repo
   npm run collaudo:schede -- --matrice rapida    campione di ~1.800 profili (pochi secondi)
   npm run collaudo:schede -- --matrice completa  prodotto pieno di tutte le dimensioni (64.800 profili)
   npm run collaudo:schede -- --out /percorso/dir-o-file.md --etichetta prima
   npm run collaudo:schede -- --profilo '{"level":"intermedio","days":3,"goals":["massa"],"minutes":60}'
   npm run collaudo:schede -- --confronta prima.json dopo.json
   Opzioni: --solo COD1,COD2 (solo quei criteri)  --esempi N (default 3)  --top N (classi con esempi, default 14)  --quiet
            --pesi uniformi (ogni profilo vale uno; default: pesi plausibili della popolazione, vedi PESI_POPOLAZIONE)
            --autotest (programmi costruiti a mano: ogni criterio deve saper scattare)
   Come si legge e come si estende: .claude/skills/collaudo-generatore-schede/SKILL.md */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), os = require('os');
const { execFileSync } = require('child_process');
const R = path.join(__dirname, '..');

/* =====================================================================================================
   1. SOGLIE. Ogni numero ha nome, fonte e forza della prova (Solida / Moderata / Convenzione, come in
   docs/ricerca-struttura-e-intensita.md). "Convenzione" = pratica comune dei coach, senza prova diretta.
   Cambiare una soglia = alzare VERSIONE_CRITERI: i confronti prima/dopo valgono solo a pari versione.
   ===================================================================================================== */
const VERSIONE_CRITERI = '1.0';

/* --- volume --- */
/* Una serie vale 1 per il muscolo bersaglio e 0,5 per i sinergisti (Pelland 2025, Sports Medicine, 67 studi: Moderata) */
const FRAZ_SINERGISTA = 0.5;
/* Muscoli che compaiono tra i "secondari" di DETTAGLI ma non si contano come sinergisti per la crescita: stabilizzatori e presa (Convenzione) */
const SECONDARI_NON_CONTATI = ['stabilita', 'avambracci', 'flessori_anca'];
/* Nello squat e nella leg press i femorali lavorano quasi nulla (Kubo 2019, citato in dettagli-esercizi.js: Moderata): non si contano */
const FEMORALI_NON_CONTATI_NELLO_SQUAT = true;
/* Serie frazionarie a settimana per muscolo. [minimo, massimo]. "grande" = petto, schiena, quadricipiti, femorali, glutei;
   "piccolo" = deltoidi, braccia, polpacci (prendono molto dai multiarticolari, per questo il minimo e piu basso).
   Ipertrofia e generale: docs/ricerca-ipertrofia-programmazione.md 3.2 (principiante 6-10 / 4-8, intermedio 10-16 / 6-10, avanzato 12-20 / 8-12;
   Pelland 2025: da 10 serie in su si cresce piu che sotto 5, rendimenti decrescenti oltre le 12 frazionarie: Solida/Moderata; ACSM 2026 per la salute: Solida;
   Iversen 2021, Baz-Valle 2022 per il tetto: Moderata). Forza: 2-3 serie per esercizio (ACSM 2026: Solida); i numeri per livello sono Convenzione.
   Fascia "piccolo": Convenzione (stessa logica, meno serie perche i sinergisti contano). */
const VOLUME_SETT = {
  ipertrofia: { principiante: { grande: [6, 10], piccolo: [4, 10] }, intermedio: { grande: [10, 16], piccolo: [6, 14] }, avanzato: { grande: [12, 20], piccolo: [8, 18] } },
  forza:      { principiante: { grande: [4, 10], piccolo: [2, 8] },  intermedio: { grande: [6, 14], piccolo: [3, 10] },  avanzato: { grande: [8, 18], piccolo: [4, 12] } },
  generale:   { principiante: { grande: [4, 8], piccolo: [2, 8] },   intermedio: { grande: [6, 10], piccolo: [3, 10] },  avanzato: { grande: [8, 12], piccolo: [3, 10] } }
};
/* Obiettivo glutei: il gluteo ha il suo intervallo (il coach scrive 9-15 serie: onboarding.js ONB_GOALS; il resto e Convenzione) */
const VOLUME_GLUTEI_OBIETTIVO = { principiante: [8, 16], intermedio: [10, 20], avanzato: [12, 24] };
/* Il tetto non e netto (rendimenti decrescenti, non danno): si segnala solo oltre +15% (Convenzione) */
const TOLLERANZA_VOLUME_ALTO = 0.15;
/* Stessa cosa sotto il minimo: i conteggi sono approssimati, si segnala solo oltre 10% sotto (Convenzione) */
const TOLLERANZA_VOLUME_BASSO = 0.10;
/* Sotto 2 serie frazionarie a settimana un muscolo e di fatto non allenato (Convenzione) */
const ASSENTE_FRAZ = 2;
/* Serie DIRETTE minime a settimana (intermedio, avanzato) per i muscoli che i multiarticolari allenano poco, nell ipertrofia:
   docs/ricerca-ipertrofia-programmazione.md 3.2 (Moderata per tricipiti e bicipiti: Maeo 2023, Baz-Valle 2022; Convenzione per deltoidi e polpacci).
   Per i femorali la flessione del ginocchio e controllata da EQ-03 (Maeo 2021: Moderata). */
const DIRETTE_MIN_MUSCOLO = {
  tricipiti: { intermedio: 4, avanzato: 6 }, bicipiti: { intermedio: 4, avanzato: 6 }, deltoidi_laterali: { intermedio: 4, avanzato: 6 },
  deltoidi_posteriori: { intermedio: 3, avanzato: 4 }, polpacci: { intermedio: 6, avanzato: 8 }
};
/* Avambracci: un esercizio diretto (2 serie) solo per avanzati in ipertrofia (docs 3.2: 0-4 serie, opzionali: Convenzione) */
const DIRETTE_AVAMBRACCI = 2;
/* Muscoli piccoli: serie dirette in almeno 2 sedute a settimana (docs/ricerca-ipertrofia-programmazione.md 3.3: Convenzione) */
const SEDUTE_DIRETTE_PICCOLI_MIN = 2;
/* Le richieste sui muscoli piccoli valgono da 3 giorni, 45 minuti e non per i principianti (come fa il coach: strCopri; Convenzione) */
const PICCOLI_GIORNI_MIN = 3, PICCOLI_MINUTI_MIN = 45;

/* --- frequenza e recupero --- */
/* Ogni grande gruppo almeno 2 sedute a settimana (ACSM 2026: Solida; a volume pari la frequenza cambia poco la crescita: Pelland 2025) */
const FREQ_MIN_SETTIMANA = 2;
/* Una seduta "conta" per un muscolo da 1,5 serie frazionarie in su, cioe 3 serie sinergiche (Convenzione) */
const FREQ_SERIE_MIN_SEDUTA = 1.5;
/* Stesso grande muscolo con almeno 4 serie frazionarie in due giorni di fila = meno di 48 ore di recupero (ACSM 2009: 48 ore: Moderata) */
const REC_SERIE_MIN = 4;
/* Giorni di fila in palestra: oltre 4 si segnala (Convenzione) */
const GIORNI_CONSECUTIVI_MAX = 4;
/* Tetto di circa 11 serie frazionarie per muscolo in una seduta (Pelland, meta-regressione, preprint 2025: Moderata) */
const TETTO_FRAZ_SEDUTA = 11;
/* Carico pesante sui lombari: punti = serie di stacchi o good morning + mezzo punto per serie di squat, rematore e T-bar col bilanciere; 3 punti in due giorni di fila (Convenzione: ABB-07) */
const LOMBARE_SERIE_PESANTI = 3;

/* --- durata della seduta (modello del collaudo; nessuna fonte diretta: Convenzione) --- */
const SEC_PER_RIPETIZIONE = 3.5;        /* cadenza 2-0-1 piu ripresa */
const SEC_SETUP_SERIE = 10;             /* mettersi in posizione, caricare */
const SEC_TRANSIZIONE_ESERCIZIO = 60;   /* cambio di macchina o di peso, 1 minuto (docs 3.8); il recupero dell ultima serie e dentro */
const SEC_TRANSIZIONE_SUPERSERIE = 10;  /* passaggio da un esercizio all altro della coppia */
const FATTORE_LATO = 2;                 /* esercizi unilaterali: ogni serie si fa da due lati, senza recupero in mezzo */
const MIN_RISCALDAMENTO_GENERALE = 6;      /* docs/ricerca-ipertrofia-programmazione.md 3.8: 6 minuti di riscaldamento */
const SERIE_RISCALDAMENTO_PESANTE = 2;  /* serie progressive prima di ogni multiarticolare pesante (al massimo 2 esercizi) */
const RISCALDAMENTO_ESERCIZI_MAX = 2;
const SEC_SERIE_RISCALDAMENTO = 45;
const SEC_TECNICA_DROP = 45;
/* La seduta non deve superare i minuti dichiarati di oltre il 10% (Convenzione: il tempo reale oscilla) e non deve sprecarne piu del 25% (richiesta del collaudo) */
const TOLLERANZA_SFORAMENTO = 0.10, QUOTA_SPRECO_MAX = 0.25;

/* --- esercizi per seduta (Convenzione) --- */
const ES_MIN_SEDUTA = 3, ES_MAX_SEDUTA = 8, ES_MAX_PRINCIPIANTE = 6;

/* --- prescrizione: ripetizioni e recuperi per obiettivo e tipo di carico ---
   forza: 1-6 ripetizioni oltre l 80% di 1RM, pause 2-5 minuti sui fondamentali (ACSM 2009; ACSM 2026: Solida);
   ipertrofia: tutti i carichi vanno bene vicino al cedimento (ACSM 2026: Solida), ma per prassi 5-10 ripetizioni sui multiarticolari col bilanciere,
   6-15 sulle macchine e 8-20 sugli isolamenti (docs/ricerca-ipertrofia-programmazione.md 3.4: Convenzione, fasce larghe); pausa sopra 60 s piccolo vantaggio,
   oltre 90 s nessuna differenza per la massa (Singer 2024, Schoenfeld 2016: Moderata). Il collaudo segnala solo cio che esce dalle fasce. */
const REPS_AMMESSE = {
  forza:      { pesante: [1, 6],  macchina: [4, 12], isolamento: [8, 15] },
  ipertrofia: { pesante: [5, 10], macchina: [6, 15], isolamento: [8, 20] },   /* docs/ricerca-ipertrofia-programmazione.md 3.4: bilanciere 5-10, macchine 8-12, isolamenti 10-15 (fasce larghe: ACSM 2026) */
  generale:   { pesante: [6, 15], macchina: [8, 15], isolamento: [10, 20] }
};
/* Modalita prudente (over 65, PAR-Q): 8-12 ripetizioni al 60-80% di 1RM, senza apnea (ACSM 2026 per gli anziani e per la pressione: Solida; la fascia e Convenzione) */
const REPS_AMMESSE_PRUDENTE = { pesante: [6, 15], macchina: [6, 15], isolamento: [8, 20] };
const PAUSA_AMMESSA = {
  forza:      { pesante: [120, 300], macchina: [90, 240], isolamento: [45, 150] },
  ipertrofia: { pesante: [90, 180],  macchina: [60, 150], isolamento: [45, 120] },
  generale:   { pesante: [60, 150],  macchina: [45, 120], isolamento: [30, 90] }
};
/* Una serie sola per esercizio rende meno di 2-3 (Krieger 2010, Ralston 2017: Solida); oltre 6 serie su un esercizio non rende di piu (Amirthalingam 2017, Ralston 2017: Moderata) */
const SERIE_MIN_ESERCIZIO = 2, SERIE_MAX_ESERCIZIO = 6;
/* L isolamento ha ripetizioni piu alte del multiarticolare della stessa seduta: al massimo 2 in meno (Convenzione) */
const RIP_ISOLAMENTO_DELTA_MIN = -2;
/* Forza: serie a settimana sui multiarticolari con 6 ripetizioni o meno, per livello (Convenzione; ACSM 2026: 2-3 serie per esercizio) */
const SERIE_FORZA_MIN_SETT = { principiante: 6, intermedio: 9, avanzato: 12 };

/* --- struttura, ordine, ridondanza (Convenzione, salvo dove indicato) --- */
/* Tirate non meno delle spinte (1:1, tolleranza 10%): spalle in equilibrio (Convenzione, ABB-04) */
const RAPPORTO_TIRATE_SPINTE_MIN = 0.9, SERIE_BILANCIO_MIN = 8;
/* Trazioni verticali e orizzontali: ciascuna almeno il 25% delle serie di tirata (Convenzione) */
const QUOTA_TIRATA_MIN = 0.25, SERIE_TIRATA_MIN = 6;
/* Femorali/quadricipiti (serie frazionarie) almeno 0,5, cioe al massimo 2 a 1: ginocchia e catena posteriore in equilibrio (Convenzione); flessione del ginocchio presente (Maeo 2021: Moderata) */
const RAPPORTO_FEMORALI_QUADRICIPITI_MIN = 0.5, SERIE_QUADRICIPITI_PER_RAPPORTO = 6;
/* Lo stesso esercizio in 3 o piu sedute della settimana (Convenzione) */
const RIPETIZIONI_ESERCIZIO_SETT_MAX = 2;
/* Priorita dichiarata: il gruppo deve ricevere almeno 1 serie frazionaria in piu che senza (docs: "qualche serie in piu"; Convenzione) */
const PRIORITA_DELTA_MIN_SERIE = 1;

/* --- mesociclo, RIR, scarico --- */
/* Uno scarico ogni 4-8 settimane (strutturaProgramma, "dalla ricerca": Moderata/Convenzione) */
const SCARICO_OGNI_MAX = 8;
/* Sui fondamentali pesanti col bilanciere non si arriva al cedimento tecnico: RIR minimo 1 (Convenzione; ACSM 2026: il cedimento non serve, Solida) */
const RIR_MIN_PESANTE = 1;
/* RIR bersaglio minimo alla settimana 1 per livello: principiante 3, intermedio 2, avanzato 2 (docs/ricerca-ipertrofia-programmazione.md 3.5: Convenzione + Moderata;
   le stime del RIR sbagliano di circa 1 ripetizione per difetto: Halperin 2022, Refalo 2023: Moderata) */
const RIR_SETT1_MIN = { principiante: 3, intermedio: 2, avanzato: 2 };

/* --- sicurezza e attrezzatura --- */
const CAUTELA_SEV = 2;

/* --- pesi della popolazione ---
   La matrice e una griglia di copertura: sovrarappresenta i casi rari (5 profili su 6 hanno un fastidio, un terzo e a corpo libero).
   Per ordinare le classi per IMPATTO ogni profilo pesa quanto e plausibile tra chi usa un app di allenamento. Sono ASSUNZIONI del collaudo
   (Convenzione, non dati misurati): cambiale qui se hai numeri veri, oppure usa --pesi uniformi per contare ogni profilo uno. */
const PESI_POPOLAZIONE = {
  obiettivo: { massa: 0.30, forza: 0.10, ricomposizione: 0.12, dimagrimento: 0.18, salute: 0.10, glutei: 0.08, 'massa+forza': 0.06, 'forza+massa': 0.06 },
  livello: { principiante: 0.45, intermedio: 0.40, avanzato: 0.15 },
  giorni: { 2: 0.10, 3: 0.30, 4: 0.30, 5: 0.20, 6: 0.10 },
  minuti: { 30: 0.10, 45: 0.20, 60: 0.40, 75: 0.15, 90: 0.15 },
  luogo: { palestra: 0.65, manubri: 0.20, corpo: 0.15 },
  fastidi: { nessuno: 0.60, spalle: 0.10, ginocchia: 0.10, schiena: 0.10, 'spalle+schiena': 0.05, 'ginocchia+schiena': 0.05 },
  sesso: { M: 0.5, F: 0.5 },
  fasciaEta: { giovane: 0.35, adulto: 0.45, senior: 0.20 }
};

/* =====================================================================================================
   2. CONOSCENZA ESPERTA INDIPENDENTE DAL CODICE DELL APP (Convenzione clinica e di prassi; non e consulenza medica)
   Serve a controllare il generatore con un secondo parere: se l app e l audit usassero la stessa regex, non scoprirebbero nulla.
   ===================================================================================================== */
const CONTROINDICAZIONI = {
  spalle: {
    forte: /military|lento avanti|arnold|shoulder press|pike push|tirate al mento|dip (alle|su|alla)|pullover/i,
    cautela: /panca (piana|inclinata) bilanciere|croci su panca|alzate frontali|piegamenti declinati|landmine/i
  },
  ginocchia: {
    forte: /squat|affondi|leg extension|step-up|hack|bulgar|jump|salti|pistol|sissy/i,
    cautela: /leg press|nordic|wall sit|stacco con trap bar/i
  },
  schiena: {
    forte: /stacco|good morning|rematore con bilanciere|rematore presa inversa|t-bar|squat con bilanciere|front squat|hyperextension/i,
    cautela: /military|squat al multipower|sit-up|russian twist|ab wheel|leg raise|mountain climber|affondi|crunch|woodchop/i
  }
};
/* Esercizi tecnicamente impegnativi o ad alto carico assiale: per principianti e per chi e in modalita prudente (over 65, PAR-Q) (Convenzione) */
const TECNICI_PRINCIPIANTE = /stacco da terra|stacco sumo|good morning|front squat|nordic|ab wheel|tirate al mento|pike push/i;
const TECNICI_PRUDENTE = /stacco da terra|stacco sumo|stacco con trap bar|good morning|front squat|nordic|ab wheel|tirate al mento|pike push|military/i;
/* Attrezzatura che si da per certa per luogo (per DETTAGLI: attrezzo). "quasi" = non garantita: casa con manubri e panca; corpo libero "o quasi" */
const ATTREZZI_OK = {
  manubri: ['Manubri', 'Corpo libero', 'Corpo libero o manubri', 'Panca', 'Gradino'],
  corpo: ['Corpo libero', 'Corpo libero o manubri']
};
const ATTREZZI_QUASI = {
  manubri: ['Sbarra', 'Parallele', 'Sbarra bassa o anelli', 'Sedia romana', 'Panca per lombari', 'Panca a 45°', 'Ruota addominale'],
  corpo: ['Sbarra', 'Parallele', 'Sbarra bassa o anelli', 'Sedia romana', 'Panca per lombari', 'Panca a 45°', 'Ruota addominale', 'Panca', 'Gradino']
};
/* attrezzo di DETTAGLI -> categoria di "Attrezzi della tua palestra" (Opzioni > Il coach) */
const CATEGORIA_ATTREZZO = { 'Bilanciere': 'bilanciere', 'Trap bar': 'bilanciere', 'Manubri': 'manubri', 'Macchina': 'macchine', 'Cavo': 'macchine', 'Multipower': 'macchine', 'Sbarra': 'sbarra', 'Sbarra bassa o anelli': 'sbarra' };

/* Gruppi muscolari del collaudo (id di MUSCOLI in js/dati/dettagli-esercizi.js). classe: grande / piccolo / core */
const GRUPPI = {
  petto: { muscoli: ['petto_alto', 'petto_medio', 'petto_basso'], classe: 'grande' },
  schiena: { muscoli: ['dorsali', 'schiena_spessore'], classe: 'grande' },
  quadricipiti: { muscoli: ['quadricipiti'], classe: 'grande' },
  femorali: { muscoli: ['femorali'], classe: 'grande' },
  glutei: { muscoli: ['grande_gluteo'], classe: 'grande' },
  deltoidi_laterali: { muscoli: ['deltoide_laterale'], classe: 'piccolo' },
  deltoidi_posteriori: { muscoli: ['deltoide_posteriore'], classe: 'piccolo' },
  deltoidi_anteriori: { muscoli: ['deltoide_anteriore'], classe: 'piccolo', soloMax: true },
  bicipiti: { muscoli: ['bicipiti'], classe: 'piccolo' },
  tricipiti: { muscoli: ['tricipiti'], classe: 'piccolo' },
  polpacci: { muscoli: ['polpacci'], classe: 'piccolo' },
  core: { muscoli: ['addome', 'addome_basso', 'obliqui', 'stabilita'], classe: 'core' },
  avambracci: { muscoli: ['brachioradiale'], classe: 'piccolo', soloDiretto: true }
};
/* Gruppi che il collaudo pretende per tipo di obiettivo (Convenzione) */
const RICHIESTI = {
  ipertrofia: ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei', 'deltoidi_laterali', 'deltoidi_posteriori', 'bicipiti', 'tricipiti', 'polpacci', 'core'],
  forza: ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei', 'deltoidi_posteriori', 'core'],
  generale: ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei', 'core']
};
/* "Grandi gruppi" per la frequenza (ACSM 2026) */
const GRUPPI_FREQUENZA = { petto: ['petto'], schiena: ['schiena'], quadricipiti: ['quadricipiti'], femorali: ['femorali'], glutei: ['glutei'],
  spalle: ['deltoidi_laterali', 'deltoidi_posteriori', 'deltoidi_anteriori'], bicipiti: ['bicipiti'], tricipiti: ['tricipiti'] };
/* priorita dell utente (onboarding) -> gruppi del collaudo */
const PRIORITA_GRUPPI = { petto: ['petto'], schiena: ['schiena'], spalle: ['deltoidi_laterali', 'deltoidi_posteriori', 'deltoidi_anteriori'], braccia: ['bicipiti', 'tricipiti'],
  gambe: ['quadricipiti', 'femorali', 'polpacci'], glutei: ['glutei'], core: ['core'] };

/* =====================================================================================================
   3. CRITERI. Ogni criterio: id, nome, sev (1 bassa .. 5 critica), forza (Solida/Moderata/Convenzione), fonte, dove (funzioni probabili
   del generatore, file:funzione) e check(m, c) -> [{ sub?, msg, gravita }]. Per aggiungerne uno: vedi la skill.
   ===================================================================================================== */
const PESO_SEV = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
const NOME_SEV = { 1: 'bassa', 2: 'media-bassa', 3: 'media', 4: 'alta', 5: 'critica' };
const RICETTE_JS = 'js/coach/programma/ricette.js', STRUTTURA_JS = 'js/coach/programma/struttura-pro.js', MOTORE_JS = 'js/coach/programma/motore.js', ONB_JS = 'js/ui/onboarding.js';

const r1 = (x) => Math.round(x * 10) / 10;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const CRITERI = [
  { id: 'ERR-01', nome: 'Il generatore fallisce o produce una scheda malformata', sev: 5, forza: 'Convenzione', fonte: 'robustezza',
    dove: [RICETTE_JS + ': buildProgram'], check: (m) => (m.errori || []).map(e => ({ msg: e, gravita: 10 })) },
  { id: 'SAN-01', nome: 'Dati della scheda incoerenti (esercizio doppio nella seduta, serie o ripetizioni non valide, esercizio fuori libreria)', sev: 4, forza: 'Convenzione', fonte: 'robustezza',
    dove: [RICETTE_JS + ': buildProgram', STRUTTURA_JS + ': strCopri'],
    check: (m) => {
      const out = [];
      m.sedute.forEach(s => {
        const visti = {};
        s.es.forEach(e => {
          if (!e.inf.meta) out.push({ sub: 'fuori-libreria', msg: s.titolo + ': ' + e.pulito + ' non e nella libreria', gravita: 3 });
          if (visti[e.nome]) out.push({ sub: 'doppio', msg: s.titolo + ': ' + e.pulito + ' due volte nella stessa seduta', gravita: 3 });
          visti[e.nome] = 1;
          if (!(e.sets > 0) || !(e.reps > 0) || !(e.rest >= 0)) out.push({ sub: 'valori', msg: s.titolo + ': ' + e.pulito + ' ' + e.sets + 'x' + e.reps + ' r' + e.rest, gravita: 3 });
        });
      });
      return out;
    } },

  /* ---------------- volume ---------------- */
  { id: 'MIS-01', nome: 'Muscolo di fatto non allenato nella settimana (meno di 2 serie frazionarie)', sev: 4, forza: 'Moderata', fonte: 'Pelland 2025; Convenzione per i muscoli piccoli',
    dove: [STRUTTURA_JS + ': strCopri (aggiunge polpacci, deltoidi posteriori, bicipiti, tricipiti, core solo a certe condizioni)', RICETTE_JS + ': buildProgram (aggiungiRegione)', ONB_JS + ': exerciseCountFor (minimo 3 esercizi)'],
    check: (m, c) => volumeGruppi(m, c).filter(x => x.tipo === 'mis').map(x => ({ sub: x.g, sev: x.classe === 'grande' ? 4 : (x.classe === 'core' ? 2 : 3), msg: x.g + ': ' + r1(x.v) + ' serie frazionarie a settimana (dirette ' + r1(x.d) + ')', gravita: 3 - x.v / 2 + (x.classe === 'grande' ? 2 : 0) })) },
  { id: 'VOL-01', nome: 'Volume settimanale sotto il minimo del livello (serie frazionarie)', sev: 3, forza: 'Moderata', fonte: 'Pelland 2025; VOLUME_LIVELLO del coach (Convenzione per i numeri)',
    dove: [RICETTE_JS + ': buildProgram (blocco "volume per muscolo": conta per gruppo, non per muscolo; tetto di 5 serie per esercizio)', ONB_JS + ': exerciseCountFor (esercizi per seduta dai minuti)', RICETTE_JS + ': buildProgram (taglio per il tempo, minutiDi)'],
    check: (m, c) => volumeGruppi(m, c).filter(x => x.tipo === 'sotto').map(x => ({ sub: x.g, sev: 3, msg: x.g + ': ' + r1(x.v) + ' serie frazionarie a settimana, minimo ' + x.min + ' (' + c.tipoObiettivo + ', ' + c.level + ')', gravita: (x.min - x.v) / x.min * 10 })) },
  { id: 'VOL-02', nome: 'Volume settimanale sopra il massimo del livello (serie frazionarie)', sev: 3, forza: 'Moderata', fonte: 'Pelland 2025 (rendimenti decrescenti oltre 12); Convenzione per i tetti',
    dove: [RICETTE_JS + ': buildProgram (blocco "volume per muscolo": le sinergie sono per gruppo, non per muscolo; bonus priorita)', STRUTTURA_JS + ': strCopri / strBilancia (serie aggiunte dopo il tetto)'],
    check: (m, c) => volumeGruppi(m, c).filter(x => x.tipo === 'sopra').map(x => ({ sub: x.g, sev: x.classe === 'grande' ? 3 : 2, msg: x.g + ': ' + r1(x.v) + ' serie frazionarie a settimana, massimo ' + x.max + ' (' + c.tipoObiettivo + ', ' + c.level + ')', gravita: (x.v - x.max) / x.max * 10 })) },
  { id: 'DIR-01', nome: 'Poche serie dirette per tricipiti, bicipiti, deltoidi (laterali, posteriori), polpacci o avambracci nell ipertrofia', sev: 3, forza: 'Convenzione', fonte: 'docs/ricerca-ipertrofia-programmazione.md 3.2 (Maeo 2023, Baz-Valle 2022: Moderata; deltoidi e polpacci: Convenzione)',
    dove: [STRUTTURA_JS + ': strCopri (aggiunge solo con 3+ giorni e non principianti)', RICETTE_JS + ': buildProgram (aggiungiRegione per le alzate laterali)'],
    check: (m, c) => volumeGruppi(m, c).filter(x => x.tipo === 'diretto').map(x => ({ sub: x.g, sev: x.g === 'avambracci' ? 1 : (['bicipiti', 'tricipiti'].indexOf(x.g) !== -1 ? 2 : 3), msg: x.g + ': ' + r1(x.d) + ' serie dirette a settimana, minimo ' + x.min + ' (frazionarie ' + r1(x.v) + ')', gravita: (x.min - x.d) / x.min * 10 })) },
  { id: 'FRQ-01', nome: 'Grande gruppo allenato meno di 2 volte a settimana', sev: 4, forza: 'Solida', fonte: 'ACSM 2026 (137 revisioni): ogni grande gruppo almeno 2 sedute a settimana',
    dove: [ONB_JS + ': splitFor / splitPerFrequenza', RICETTE_JS + ': RICETTE (ricette per tipo di giorno) e buildProgram (nEs: pochi esercizi per seduta)', 'js/coach/metodi-momenti.js: METODI (split dei metodi famosi)'],
    check: (m, c) => {
      if (c.prof.freq === '1') return [];   /* scelta esplicita dell utente: il coach la rispetta */
      return Object.keys(GRUPPI_FREQUENZA).map(g => ({ g, n: m.sedute.filter(s => GRUPPI_FREQUENZA[g].reduce((t, x) => t + (s.grp[x] || 0), 0) >= FREQ_SERIE_MIN_SEDUTA).length }))
        .filter(x => x.n < FREQ_MIN_SETTIMANA && c.days >= 2).map(x => ({ sub: x.g, sev: ['bicipiti', 'tricipiti'].indexOf(x.g) !== -1 ? 2 : (['spalle', 'femorali'].indexOf(x.g) !== -1 ? 3 : 4), msg: x.g + ' in ' + x.n + ' sedute su ' + m.sedute.length + (c.metodo ? ' (metodo ' + c.metodo + ')' : ''), gravita: 3 - x.n })); } },
  { id: 'FRQ-02', nome: 'Muscolo piccolo (deltoidi, braccia, polpacci) con serie dirette in una sola seduta', sev: 2, forza: 'Convenzione', fonte: 'docs/ricerca-ipertrofia-programmazione.md 3.3',
    dove: [STRUTTURA_JS + ': strCopri (le aggiunte vanno nella seduta con meno esercizi: una sola)', RICETTE_JS + ': buildProgram (aggiungiRegione)'],
    check: (m, c) => {
      if (c.tipoObiettivo !== 'ipertrofia' || c.level === 'principiante' || c.days < 3 || c.minutes < PICCOLI_MINUTI_MIN || c.prof.freq === '1') return [];
      return ['deltoidi_laterali', 'deltoidi_posteriori', 'bicipiti', 'tricipiti', 'polpacci'].map(g => ({ g, tot: m.dir[g] || 0, n: m.sedute.filter(s => (s.dir[g] || 0) >= 1).length }))
        .filter(x => x.tot >= 1 && x.n < SEDUTE_DIRETTE_PICCOLI_MIN).map(x => ({ sub: x.g, msg: x.g + ': ' + r1(x.tot) + ' serie dirette, in ' + x.n + ' seduta su ' + m.sedute.length, gravita: 1 })); } },
  { id: 'SES-03', nome: 'Seduta senza uno schema di base per il suo tipo (full body senza squat/hinge, spinta o tirata; upper senza spinta o tirata; lower senza squat o hinge)', sev: 3, forza: 'Moderata', fonte: 'docs/ricerca-ipertrofia-programmazione.md 3.3 (un multiarticolare di ogni schema: Iversen 2021); piramide di Helms',
    dove: [RICETTE_JS + ': buildProgram (taglio per il tempo toglie posti dalla ricetta; RICETTE fullbody a 7 posti)', ONB_JS + ': exerciseCountFor'],
    check: (m, c) => {
      const attesi = { fullbody: ['spinta', 'tirata', 'basso'], upper: ['spinta', 'tirata'], lower: ['squat', 'hinge'], legs: ['squat', 'hinge'], push: ['spinta'], pull: ['tirata'] };
      const ha = (s, k) => s.es.some(e => (k === 'spinta' ? (e.inf.mov === 'spintaO' || e.inf.mov === 'spintaV') : (k === 'tirata' ? (e.inf.mov === 'tirataO' || e.inf.mov === 'tirataV') : (k === 'basso' ? (e.inf.mov === 'squat' || e.inf.mov === 'hinge') : e.inf.mov === k))));
      const out = [];
      m.sedute.forEach(s => (attesi[s.tipo] || []).forEach(k => { if (!ha(s, k)) out.push({ sub: s.tipo + '/' + k, msg: s.titolo + ' (' + s.giorno + '): manca ' + k + ' (' + s.es.length + ' esercizi)' + (c.metodo ? ' metodo ' + c.metodo : ''), gravita: 2 }); }));
      return out; } },
  { id: 'SES-01', nome: 'Oltre 11 serie frazionarie per muscolo in una sola seduta', sev: 3, forza: 'Moderata', fonte: 'Pelland, meta-regressione sul volume per seduta (preprint 2025)',
    dove: [RICETTE_JS + ': buildProgram (tetto serieMaxMuscoloSeduta: conta le serie dirette per gruppo, senza sinergisti)', 'js/coach/parametri.js: COACH_PARAMETRI.serieMaxMuscoloSeduta'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => Object.keys(GRUPPI).forEach(g => { if ((s.grp[g] || 0) > TETTO_FRAZ_SEDUTA) out.push({ sub: g, msg: s.titolo + ' (' + s.giorno + '): ' + g + ' ' + r1(s.grp[g]) + ' serie frazionarie in una seduta', gravita: s.grp[g] - TETTO_FRAZ_SEDUTA }); }));
      return out; } },

  /* ---------------- tempo ---------------- */
  { id: 'DUR-01', nome: 'La seduta non sta nei minuti dichiarati (durata stimata oltre il 10%)', sev: 4, forza: 'Convenzione', fonte: 'modello del collaudo: serie x (tempo sotto tensione + recupero) + transizioni + riscaldamento',
    dove: [RICETTE_JS + ': buildProgram (minutiDi: 8 + serie x (35 s + recupero), nessun tempo per transizioni, riscaldamento e unilaterali)', ONB_JS + ': exerciseCountFor'],
    check: (m, c) => m.sedute.filter(s => s.minuti > c.minutes * (1 + TOLLERANZA_SFORAMENTO)).map(s => ({ msg: s.titolo + ' (' + s.giorno + '): circa ' + Math.round(s.minuti) + ' min stimati su ' + c.minutes + ' dichiarati (+' + Math.round((s.minuti / c.minutes - 1) * 100) + '%)', gravita: (s.minuti / c.minutes - 1) * 10 })) },
  { id: 'DUR-02', nome: 'La seduta spreca oltre il 25% del tempo dichiarato', sev: 2, forza: 'Convenzione', fonte: 'richiesta del collaudo; stesso modello di durata',
    dove: [ONB_JS + ': exerciseCountFor (massimo 7 esercizi)', RICETTE_JS + ': RICETTE (ricette da 6-7 posti) e buildProgram (nEs)'],
    check: (m, c) => m.sedute.filter(s => s.minuti < c.minutes * (1 - QUOTA_SPRECO_MAX)).map(s => ({ msg: s.titolo + ' (' + s.giorno + '): circa ' + Math.round(s.minuti) + ' min stimati su ' + c.minutes + ' dichiarati (spreca ' + Math.round((1 - s.minuti / c.minutes) * 100) + '%)', gravita: (1 - s.minuti / c.minutes) * 10 })) },
  { id: 'EXN-01', nome: 'Troppo pochi esercizi in una seduta (meno di 3)', sev: 3, forza: 'Convenzione', fonte: 'pratica dei coach',
    dove: [RICETTE_JS + ': buildProgram (taglio per il tempo)', ONB_JS + ': exerciseCountFor'],
    check: (m) => m.sedute.filter(s => s.es.length < ES_MIN_SEDUTA).map(s => ({ msg: s.titolo + ': solo ' + s.es.length + ' esercizi', gravita: 3 - s.es.length })) },
  { id: 'EXN-02', nome: 'Troppi esercizi in una seduta (oltre 8, oltre 6 per un principiante)', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach',
    dove: [STRUTTURA_JS + ': strCopri (aggiunge fino a +2 esercizi sopra nEs)', RICETTE_JS + ': buildProgram (aggiungi schemi mancanti, regioni)'],
    check: (m, c) => m.sedute.filter(s => s.es.length > (c.level === 'principiante' ? ES_MAX_PRINCIPIANTE : ES_MAX_SEDUTA)).map(s => ({ msg: s.titolo + ': ' + s.es.length + ' esercizi', gravita: s.es.length - ES_MAX_SEDUTA })) },

  /* ---------------- ordine, superserie, ridondanza ---------------- */
  { id: 'ORD-01', nome: 'Pre-affaticamento: isolamento di un muscolo prima del multiarticolare che lo usa', sev: 3, forza: 'Moderata', fonte: 'Gentil 2017-2018 (docs/ricerca 1.2): nessun vantaggio, meno ripetizioni sul multiarticolare',
    dove: [STRUTTURA_JS + ': strOrdina / strTier / strRango (ordine per fasce), strCopri (riordina dopo le aggiunte)', 'js/coach/metodi-momenti.js: METODI (ricette dei metodi famosi fuori da strOrdina)'],
    check: (m) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach((a, i) => {
        if (a.inf.tipo !== 'isolation' || a.inf.tempo || a.inf.gruppoLib === 'core') return;
        for (let j = i + 1; j < s.es.length; j++) {
          const b = s.es[j];
          if (b.inf.tipo === 'compound' && !b.inf.tempo && (b.inf.bers === a.inf.bers || b.inf.sec.indexOf(a.inf.bers) !== -1)) { out.push({ msg: s.titolo + ': ' + a.pulito + ' prima di ' + b.pulito + ' (' + a.inf.bers + ')', tag: a.pulito + ' > ' + b.pulito, gravita: 2 }); break; }
        }
      }));
      return out; } },
  { id: 'ORD-02', nome: 'Isolamento prima di un multiarticolare (muscoli diversi)', sev: 2, forza: 'Solida', fonte: 'Nunes 2021 (11 studi): per la forza migliora l esercizio fatto per primo, per la massa l ordine non conta (effetto 0,03); ACSM 2009: multiarticolari per primi',
    dove: [STRUTTURA_JS + ': strOrdina / strTier / strRango'],
    check: (m) => {
      const out = [];
      m.sedute.forEach(s => {
        const pre = new Set(s.es.map((a, i) => a.inf.tipo === 'isolation' && !a.inf.tempo && a.inf.gruppoLib !== 'core' && s.es.slice(i + 1).some(b => b.inf.tipo === 'compound' && !b.inf.tempo && (b.inf.bers === a.inf.bers || b.inf.sec.indexOf(a.inf.bers) !== -1)) ? a.nome : null));
        s.es.forEach((a, i) => {
          if (a.inf.tipo !== 'isolation' || a.inf.tempo || a.inf.gruppoLib === 'core' || pre.has(a.nome)) return;
          const dopo = s.es.slice(i + 1).find(b => b.inf.tipo === 'compound' && !b.inf.tempo);
          if (dopo) out.push({ msg: s.titolo + ': ' + a.pulito + ' prima di ' + dopo.pulito, gravita: 1 });
        });
      });
      return out; } },
  { id: 'ORD-03', nome: 'Multiarticolare di spalle o braccia prima di un multiarticolare delle gambe o dello stacco (senza priorita dichiarata)', sev: 2, forza: 'Moderata', fonte: 'ACSM 2009: grandi gruppi prima dei piccoli, multi prima dei mono',
    dove: [STRUTTURA_JS + ': strRango / strOrdina (ordina per tipo e carico, non per grandezza del muscolo)', RICETTE_JS + ': RICETTE'],
    check: (m, c) => {
      const out = [];
      const piccolo = (e) => ['spalle', 'braccia'].indexOf(e.inf.gruppoLib) !== -1, basso = (e) => e.inf.mov === 'squat' || e.inf.mov === 'hinge';
      m.sedute.forEach(s => s.es.forEach((a, i) => {
        if (a.inf.tipo !== 'compound' || a.inf.tempo || !piccolo(a) || c.priorita.indexOf(a.inf.gruppoLib) !== -1) return;
        const b = s.es.slice(i + 1).find(x => x.inf.tipo === 'compound' && !x.inf.tempo && basso(x));
        if (b) out.push({ msg: s.titolo + ': ' + a.pulito + ' prima di ' + b.pulito, gravita: 1 });
      }));
      return out; } },
  { id: 'ORD-04', nome: 'Core prima di esercizi di altri muscoli', sev: 1, forza: 'Convenzione', fonte: 'pratica dei coach (ABB-01)',
    dove: [STRUTTURA_JS + ': strTier / strOrdina'],
    check: (m) => m.sedute.filter(s => s.es.some((e, i) => e.inf.gruppoLib === 'core' && s.es.slice(i + 1).some(x => x.inf.gruppoLib !== 'core'))).map(s => ({ msg: s.titolo + ': il core non e in fondo', gravita: 1 })) },
  { id: 'SS-01', nome: 'Superserie tra muscoli non antagonisti', sev: 3, forza: 'Solida', fonte: 'Meta-analisi 2025 (19 studi); Paz 2017: stessa crescita in un terzo di tempo in meno, solo tra antagonisti',
    dove: [STRUTTURA_JS + ': strSuperserie / strAntagonisti', RICETTE_JS + ': buildProgram (coppie del metodo "rr": trazione + squat, dip + hinge)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach((e, i) => { if (e.superset && i > 0 && !antagonisti(s.es[i - 1], e)) out.push({ msg: s.titolo + ': ' + s.es[i - 1].pulito + ' + ' + e.pulito + (c.metodo ? ' (metodo ' + c.metodo + ')' : ''), tag: s.es[i - 1].pulito + ' + ' + e.pulito, gravita: 2 }); }));
      return out; } },
  { id: 'SS-02', nome: 'Superserie con un multiarticolare pesante o con un esercizio a tempo o di core', sev: 3, forza: 'Moderata', fonte: 'Paz 2017: le coppie fanno calare il carico; ABB-06',
    dove: [STRUTTURA_JS + ': strPuoSuperserie', RICETTE_JS + ': buildProgram (metodi con superserie imposta)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach((e, i) => { if (e.superset && i > 0) { const a = s.es[i - 1]; if (a.inf.carico === 'pesante' || e.inf.carico === 'pesante' || a.inf.tempo || e.inf.tempo || a.inf.gruppoLib === 'core' || e.inf.gruppoLib === 'core') out.push({ msg: s.titolo + ': ' + a.pulito + ' + ' + e.pulito + (c.metodo ? ' (metodo ' + c.metodo + ')' : ''), gravita: 2 }); } }));
      return out; } },
  { id: 'RID-01', nome: 'Due esercizi per lo stesso muscolo e lo stesso tipo nella stessa seduta', sev: 2, forza: 'Convenzione', fonte: 'ABB-02; pratica dei coach (eccezioni: curl/estensioni, squat+macchina, glutei)',
    dove: [STRUTTURA_JS + ': strRidondante / strChiave (la chiave usa il sottogruppo, non il bersaglio) e ricette.js: buildProgram (penalita -4, non un divieto)', STRUTTURA_JS + ': strBilancia (converte spinte doppie in tirate)'],
    check: (m) => {
      const out = [];
      m.sedute.forEach(s => {
        const k = {};
        s.es.forEach(e => { if (!e.inf.bers || e.inf.tempo) return; const key = e.inf.bers + '|' + e.inf.tipo; (k[key] = k[key] || []).push(e); });
        Object.keys(k).forEach(key => {
          const [b, t] = key.split('|'), n = k[key].length;
          const ammessi = (t === 'isolation' && (b === 'bicipiti' || b === 'tricipiti')) || (t === 'compound' && (b === 'quadricipiti' || b === 'grande_gluteo')) ? 2 : 1;
          if (n > ammessi) out.push({ sub: b, msg: s.titolo + ': ' + k[key].map(e => e.pulito).join(' + '), tag: k[key].map(e => e.pulito).join(' + '), gravita: n - ammessi });
        });
      });
      return out; } },
  { id: 'RID-02', nome: 'Lo stesso esercizio in 3 o piu sedute della settimana', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach: varia l esercizio o la fascia di ripetizioni (i metodi con "ripeti" sono per scelta)',
    dove: [RICETTE_JS + ': buildProgram (usatiSett: penalita -4 / -1 solo a punteggio)', 'js/coach/metodi-momenti.js: METODI'],
    check: (m, c) => {
      const conta = {};
      m.sedute.forEach(s => s.es.forEach(e => { if (!e.inf.tempo && e.inf.gruppoLib !== 'core') conta[e.pulito] = (conta[e.pulito] || 0) + 1; }));
      return Object.keys(conta).filter(n => conta[n] > RIPETIZIONI_ESERCIZIO_SETT_MAX).map(n => ({ msg: n + ' in ' + conta[n] + ' sedute su ' + m.sedute.length + (c.metodo ? ' (metodo ' + c.metodo + ')' : ''), tag: n, gravita: conta[n] - 2 })); } },

  /* ---------------- equilibrio ---------------- */
  { id: 'EQ-01', nome: 'Piu serie di spinta che di tirata (spalle sbilanciate)', sev: 3, forza: 'Convenzione', fonte: 'ABB-04; pratica dei coach: tirate almeno pari alle spinte',
    dove: [STRUTTURA_JS + ': strBilancia (usa schemaDi: non vede dip su panca, presa stretta, diamante e conta i deltoidi posteriori come tirate)', RICETTE_JS + ': RICETTE'],
    check: (m) => {
      const push = m.mov.spintaO + m.mov.spintaV, pull = m.mov.tirataO + m.mov.tirataV + m.mov.deltPost;
      return push + pull >= SERIE_BILANCIO_MIN && pull < push * RAPPORTO_TIRATE_SPINTE_MIN ? [{ msg: 'spinte ' + push + ' serie, tirate ' + pull + ' (rapporto ' + (pull / push).toFixed(2) + ')', gravita: (push - pull) / Math.max(1, push) * 10 }] : []; } },
  { id: 'EQ-02', nome: 'Tirate solo verticali o solo orizzontali (manca uno dei due piani)', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach: dorsali (larghezza) e spessore (romboidi, trapezio medio)',
    dove: [RICETTE_JS + ': RICETTE (tirataV e tirataO nei posti), buildProgram (schemi mancanti)', STRUTTURA_JS + ': strBilancia'],
    check: (m, c) => {
      const v = m.mov.tirataV, o = m.mov.tirataO, tot = v + o;
      if (tot < SERIE_TIRATA_MIN) return [];
      const sub = v / tot < QUOTA_TIRATA_MIN ? 'verticale' : (o / tot < QUOTA_TIRATA_MIN ? 'orizzontale' : null);
      if (!sub || !c.fattibile[sub === 'verticale' ? 'tirataV' : 'tirataO']) return [];
      return [{ sub, msg: 'tirate verticali ' + v + ' serie, orizzontali ' + o, gravita: 2 }]; } },
  { id: 'EQ-03', nome: 'Femorali in ritardo sui quadricipiti, o nessuna flessione del ginocchio', sev: 3, forza: 'Moderata', fonte: 'Maeo 2021 (leg curl da seduto, lunghezza muscolare); pratica dei coach (rapporto 0,5-1)',
    dove: [RICETTE_JS + ': buildProgram (aggiungiRegione per il leg curl: solo 3+ giorni, 2 serie, non con goals[0] salute)', RICETTE_JS + ': SLOT_DEF isoFem'],
    check: (m, c) => {
      const out = [];
      const q = m.vol.quadricipiti || 0, f = m.vol.femorali || 0;
      if (q >= SERIE_QUADRICIPITI_PER_RAPPORTO && f < q * RAPPORTO_FEMORALI_QUADRICIPITI_MIN) out.push({ sub: 'rapporto', msg: 'femorali ' + r1(f) + ' contro quadricipiti ' + r1(q) + ' serie frazionarie (rapporto ' + (f / q).toFixed(2) + ')', gravita: (q * RAPPORTO_FEMORALI_QUADRICIPITI_MIN - f) });
      if (c.tipoObiettivo === 'ipertrofia' && c.days >= 3 && m.flessioneGinocchio === 0 && m.vol.quadricipiti >= 6) out.push({ sub: 'flessione', msg: 'nessun leg curl o nordic curl: i femorali lavorano solo in estensione d anca', gravita: 2 });
      return out; } },
  { id: 'PAT-01', nome: 'Schema di movimento fondamentale assente nella settimana (squat, hinge, spinte e tirate orizzontali e verticali)', sev: 3, forza: 'Convenzione', fonte: 'piramide di Helms (SCHEMI_MOV), pratica dei coach',
    dove: [RICETTE_JS + ': buildProgram (schemi mancanti, PRG-21)', MOTORE_JS + ': consentito / RISCHIO (fastidi tolgono schemi interi)'],
    check: (m, c) => {
      if (c.days < 3) return [];
      return ['squat', 'hinge', 'spintaO', 'tirataO', 'spintaV', 'tirataV'].filter(p => m.mov[p] === 0 && c.fattibile[p]).map(p => ({ sub: p, msg: 'nessun esercizio del tipo ' + p + ' pur essendo disponibile', gravita: 2 })); } },

  /* ---------------- recupero e calendario ---------------- */
  { id: 'REC-01', nome: 'Stesso grande muscolo allenato in due giorni consecutivi (meno di 48 ore)', sev: 3, forza: 'Moderata', fonte: 'ACSM 2009: 48 ore tra sedute dello stesso gruppo (Convenzione per la soglia di serie)',
    dove: [ONB_JS + ': splitPerFrequenza (full body + upper/lower con frequenza 3)', RICETTE_JS + ': mappaGiorni (giorni fissi lun-mar-gio-ven...)'],
    check: (m) => {
      const out = [];
      const grandi = ['petto', 'schiena', 'quadricipiti', 'femorali', 'glutei', 'spalle'];
      for (let i = 0; i < m.sedute.length; i++) for (let j = i + 1; j < m.sedute.length; j++) {
        const a = m.sedute[i], b = m.sedute[j];
        if (Math.abs(a.gi - b.gi) !== 1) continue;
        grandi.forEach(g => { const f = (s) => (GRUPPI_FREQUENZA[g] || [g]).reduce((t, x) => t + (s.grp[x] || 0), 0); if (f(a) >= REC_SERIE_MIN && f(b) >= REC_SERIE_MIN) out.push({ sub: g, msg: g + ' in ' + a.giorno + ' (' + a.titolo + ') e ' + b.giorno + ' (' + b.titolo + ')', gravita: 2 }); });
      }
      return out; } },
  { id: 'REC-02', nome: 'Carico pesante sui lombari in due giorni consecutivi', sev: 3, forza: 'Convenzione', fonte: 'ABB-07',
    dove: [RICETTE_JS + ': buildProgram (vietaSchiena: -5 punti, non un divieto; poi strBilancia e le aggiunte)'],
    check: (m) => {
      const out = [];
      const punti = (s) => s.es.reduce((t, e) => t + (/stacco|good morning/i.test(e.pulito) ? e.sets : (/squat con bilanciere|front squat|rematore con bilanciere|t-bar|rematore presa inversa/i.test(e.pulito) ? e.sets * 0.5 : 0)), 0);
      for (let i = 0; i < m.sedute.length; i++) for (let j = i + 1; j < m.sedute.length; j++) if (Math.abs(m.sedute[i].gi - m.sedute[j].gi) === 1 && punti(m.sedute[i]) >= LOMBARE_SERIE_PESANTI && punti(m.sedute[j]) >= LOMBARE_SERIE_PESANTI) out.push({ msg: m.sedute[i].giorno + ' e ' + m.sedute[j].giorno + ': ' + m.sedute[i].titolo + ' / ' + m.sedute[j].titolo, gravita: 2 });
      return out; } },
  { id: 'REC-03', nome: 'Troppi giorni di allenamento di fila (oltre 4)', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach',
    dove: [RICETTE_JS + ': buildProgram (mappaGiorni: 6 giorni = lun-sab di fila)'],
    check: (m, c) => { const mx = giorniDiFila(m.sedute.map(s => s.gi)); return mx > GIORNI_CONSECUTIVI_MAX ? [{ msg: mx + ' giorni di fila (' + m.sedute.map(s => s.giorno.slice(0, 3)).join(' ') + ')', gravita: mx - GIORNI_CONSECUTIVI_MAX }] : []; } },
  { id: 'SPL-01', nome: 'Numero di sedute diverso dai giorni dichiarati', sev: 4, forza: 'Convenzione', fonte: 'coerenza con la richiesta',
    dove: [ONB_JS + ': splitFor (principianti con 5-6 giorni: solo 4 sedute)', RICETTE_JS + ': buildProgram (split.giorni.slice(0, d.days))'],
    check: (m, c) => m.sedute.length !== c.days ? [{ sub: c.level === 'principiante' && c.days >= 5 ? 'principiante-limitato' : 'altri', sev: c.level === 'principiante' && c.days >= 5 ? 2 : 4, msg: c.days + ' giorni dichiarati, ' + m.sedute.length + ' sedute generate (split ' + c.splitNome + ')' + (c.prog.note.some(n => /giorni/i.test(String(n))) ? '' : ', senza una nota che lo spieghi'), gravita: Math.abs(c.days - m.sedute.length) }] : [] },
  { id: 'SPL-02', nome: 'Divisione non adatta al numero di giorni (muscolo singolo con pochi giorni, upper/lower con 2 giorni, full body con 5-6)', sev: 3, forza: 'Solida', fonte: 'ACSM 2026 (frequenza 2); ABB-05',
    dove: [ONB_JS + ': splitFor / splitPerFrequenza', 'js/coach/metodi-momenti.js: METODI (split)'],
    check: (m, c) => {
      if (c.prof.freq === '1') return [];
      const tipi = m.sedute.map(s => s.tipo);
      const out = [];
      if (c.days <= 3 && tipi.some(t => /^(push|pull|legs|petto-schiena|spalle-braccia)$/.test(t))) out.push({ sub: 'pochi-giorni', msg: c.days + ' giorni con divisione a muscolo singolo: ' + tipi.join(', '), gravita: 3 });
      if (c.days === 2 && tipi.some(t => t !== 'fullbody')) out.push({ sub: 'due-giorni', msg: '2 giorni non full body: ' + tipi.join(', '), gravita: 3 });
      if (c.days >= 5 && tipi.every(t => t === 'fullbody')) out.push({ sub: 'troppo-fullbody', msg: c.days + ' giorni tutti full body', gravita: 2 });
      return out; } },

  /* ---------------- prescrizione ---------------- */
  { id: 'RX-01', nome: 'Ripetizioni fuori dalla fascia dell obiettivo e del tipo di esercizio', sev: 3, forza: 'Convenzione', fonte: 'ACSM 2009 e 2026 (forza 1-6 oltre l 80%); prassi per ipertrofia 6-12 / 12-20',
    dove: [RICETTE_JS + ': buildProgram (blocco ripetizioni per tipo; PRG-14 forzaSulPrimo 5x5 su qualunque multiarticolare; blocco "schemi mancanti" PRG-21: reps = max(8, schema) e recupero da macchina anche su un isolamento)', ONB_JS + ': schemeFor', 'js/coach/compone.js: TOCCHI', 'js/coach/metodi-momenti.js: METODI (schema)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach(e => {
        if (e.inf.tempo || !(e.reps > 0)) return;
        const r = (c.cauto ? REPS_AMMESSE_PRUDENTE : REPS_AMMESSE[c.tipoObiettivo])[e.inf.carico];
        if (e.reps < r[0] || e.reps > r[1]) out.push({ sub: c.tipoObiettivo + '/' + e.inf.carico, msg: s.titolo + ': ' + e.pulito + ' ' + e.sets + 'x' + e.reps + ' (' + e.inf.carico + ', ' + (c.cauto ? 'modalita prudente' : c.tipoObiettivo) + ': ' + r[0] + '-' + r[1] + ')' + (c.metodo ? ' metodo ' + c.metodo : ''), tag: e.pulito + ' ' + e.reps + ' rip', gravita: Math.abs(e.reps < r[0] ? r[0] - e.reps : e.reps - r[1]) });
      }));
      return out; } },
  { id: 'RX-02', nome: 'Recupero tra le serie fuori dalla fascia dell obiettivo e del tipo di esercizio', sev: 3, forza: 'Moderata', fonte: 'Singer 2024, Schoenfeld 2016, ACSM 2009 (2-3 minuti sui fondamentali per la forza)',
    dove: [RICETTE_JS + ': buildProgram (rest per tipo, donne -15% min 60 s, arrotondamento a 15 s; il blocco "schemi mancanti" PRG-21 salta tutto questo)', ONB_JS + ': schemeFor (restCompound / restIso)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach(e => {
        if (e.superset || (s.es[s.es.indexOf(e) + 1] && s.es[s.es.indexOf(e) + 1].superset)) return;   /* nelle coppie il recupero e della coppia */
        const r = PAUSA_AMMESSA[c.tipoObiettivo][e.inf.carico];
        if (e.rest < r[0] || e.rest > r[1]) out.push({ sub: (e.rest < r[0] ? 'troppo-corto' : 'troppo-lungo') + '/' + c.tipoObiettivo + '/' + e.inf.carico, msg: s.titolo + ': ' + e.pulito + ' recupero ' + e.rest + ' s (' + e.inf.carico + ', ' + c.tipoObiettivo + ': ' + r[0] + '-' + r[1] + ')' + (c.metodo ? ' metodo ' + c.metodo : ''), tag: e.pulito + ' ' + e.rest + ' s', gravita: Math.abs(e.rest < r[0] ? r[0] - e.rest : e.rest - r[1]) / 30 });
      }));
      return out; } },
  { id: 'RX-03', nome: 'Una sola serie su un esercizio, o oltre 6 serie', sev: 3, forza: 'Solida', fonte: 'Krieger 2010, Ralston 2017 (2-3 serie battono 1); Amirthalingam 2017 (oltre 5-6 non rende di piu)',
    dove: [RICETTE_JS + ': buildProgram (tetti di serie, taglio per il tempo, sonno male: -1 serie)', 'js/coach/metodi-momenti.js: METODI (stronglifts: stacco 1x5)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach(e => {
        if (e.inf.tempo) return;
        if (e.sets < SERIE_MIN_ESERCIZIO && !(c.metodo && /stacco/i.test(e.pulito))) out.push({ sub: 'una-serie', msg: s.titolo + ': ' + e.pulito + ' ' + e.sets + ' serie', gravita: 2 });
        if (e.sets > SERIE_MAX_ESERCIZIO) out.push({ sub: 'troppe-serie', msg: s.titolo + ': ' + e.pulito + ' ' + e.sets + ' serie', gravita: e.sets - SERIE_MAX_ESERCIZIO });
      }));
      return out; } },
  { id: 'RX-04', nome: 'Isolamento con meno ripetizioni del multiarticolare della stessa seduta', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach: l isolamento sale di ripetizioni',
    dove: [RICETTE_JS + ': buildProgram (reps per tipo: Math.max(10, reps) sugli isolamenti)', 'js/coach/metodi-momenti.js: METODI (hit: gambe 15, parte alta 8)'],
    check: (m) => {
      const out = [];
      m.sedute.forEach(s => {
        const comp = s.es.filter(e => e.inf.tipo === 'compound' && !e.inf.tempo);
        if (!comp.length) return;
        const maxComp = Math.max.apply(null, comp.map(e => e.reps));
        s.es.forEach(e => { if (e.inf.tipo === 'isolation' && !e.inf.tempo && e.reps - maxComp < RIP_ISOLAMENTO_DELTA_MIN) out.push({ msg: s.titolo + ': ' + e.pulito + ' ' + e.reps + ' rip contro ' + maxComp + ' del multiarticolare', gravita: maxComp - e.reps }); });
      });
      return out; } },
  { id: 'GOA-01', nome: 'Obiettivo forza con poco lavoro pesante (serie sui multiarticolari a 6 ripetizioni o meno)', sev: 3, forza: 'Convenzione', fonte: 'ACSM 2026 (carichi alti, 2-3 serie per esercizio); numeri per livello Convenzione',
    dove: [RICETTE_JS + ': buildProgram (reps per tipo: le macchine e gli accessori restano a 8-12; principianti max 3 serie)', ONB_JS + ': schemeFor'],
    check: (m, c) => {
      if (c.goals[0] !== 'forza') return [];
      const n = m.sedute.reduce((t, s) => t + s.es.filter(e => e.inf.tipo === 'compound' && !e.inf.tempo && e.reps <= 6).reduce((a, e) => a + e.sets, 0), 0);
      const min = SERIE_FORZA_MIN_SETT[c.level];
      return n < min ? [{ msg: n + ' serie a settimana sui multiarticolari con 6 ripetizioni o meno, minimo ' + min + (c.metodo ? ' (metodo ' + c.metodo + ')' : ''), gravita: min - n }] : []; } },
  { id: 'TEC-01', nome: 'Tecniche al cedimento (drop set, parziali, AMRAP, back-off) a principianti o in modalita prudente', sev: 3, forza: 'Convenzione', fonte: 'docs/ricerca-struttura-e-intensita.md cap. 2 (Gironda, Mentzer: "non adatto a chi e alle prime armi"); ACSM 2026',
    dove: [RICETTE_JS + ': buildProgram (tecniche: poco tempo = drop set per tutti i livelli; avanzati: parziali)', 'js/coach/compone.js: TOCCHI'],
    check: (m, c) => {
      const out = [];
      if (c.level !== 'principiante' && !c.cauto) return out;
      m.sedute.forEach(s => s.es.forEach(e => { if (['drop', 'parziali', 'amrap', 'backoff'].indexOf(e.tecnica) !== -1) out.push({ sub: e.tecnica, msg: s.titolo + ': ' + e.pulito + ' con tecnica ' + e.tecnica + (c.cauto ? ' (modalita prudente)' : ' (principiante)'), tag: e.pulito, gravita: 2 }); }));
      return out; } },
  { id: 'PRI-01', nome: 'Muscolo prioritario dichiarato ma senza serie in piu rispetto al programma senza priorita', sev: 2, forza: 'Convenzione', fonte: 'ABB-10, PRG-29 ("qualche serie in piu")',
    dove: [RICETTE_JS + ': buildProgram (prio / specializza nel blocco "volume per muscolo")'],
    check: (m, c) => {
      if (!c.priorita.length || !m.volSenzaPriorita) return [];
      const out = [];
      c.priorita.forEach(p => { const gs = PRIORITA_GRUPPI[p] || []; const con = gs.reduce((t, g) => t + (m.vol[g] || 0), 0), senza = gs.reduce((t, g) => t + (m.volSenzaPriorita[g] || 0), 0); if (con - senza < PRIORITA_DELTA_MIN_SERIE) out.push({ sub: p, msg: p + ': ' + r1(con) + ' serie frazionarie con priorita, ' + r1(senza) + ' senza', gravita: 2 }); });
      return out; } },

  /* ---------------- mesociclo ---------------- */
  { id: 'DEL-01', nome: 'Scarico assente o troppo lontano nel programma', sev: 4, forza: 'Moderata', fonte: 'strutturaProgramma ("dalla ricerca": scarico ogni 4-8 settimane, serie -30-50%)',
    dove: [MOTORE_JS + ': strutturaProgramma / fasiProgramma'],
    check: (m, c) => {
      const f = c.prog.fasi || [], primo = f.indexOf('scarico') + 1;
      if (!f.length || primo === 0 || primo > SCARICO_OGNI_MAX) return [{ msg: 'fasi: ' + f.slice(0, 12).join(',') + ' (primo scarico: ' + (primo || 'nessuno') + ')', gravita: 3 }];
      return []; } },
  { id: 'RIR-01', nome: 'Nessun andamento settimanale del RIR per intermedi (rirSett solo agli avanzati)', sev: 2, forza: 'Convenzione', fonte: 'periodizzazione per RIR (Helms, Israetel); il coach lo applica solo agli avanzati (PRG-38)',
    dove: [RICETTE_JS + ': buildProgram (rirSett solo se level === avanzato)', 'js/coach/regole-ricerca.js: rirBersaglioBase / RIR_TIPO'],
    check: (m, c) => c.level === 'intermedio' && !c.prog.rirSett ? [{ msg: 'programma di ' + c.prog.settimane + ' settimane con RIR fisso per tipo di esercizio', gravita: 1 }] : [] },
  { id: 'RIR-02', nome: 'RIR 0 pianificato anche sui fondamentali pesanti col bilanciere', sev: 3, forza: 'Convenzione', fonte: 'ACSM 2026: il cedimento non serve; Helms: niente cedimento tecnico su squat, stacco, panca',
    dove: ['js/coach/regole-ricerca.js: rirBersaglioBase (con rirSett ignora il tipo di esercizio e RIR_TIPO)', RICETTE_JS + ': buildProgram (rirSett: 3,2,2,1,0)'],
    check: (m, c) => { const w = m.rirPesante.map((r, i) => ({ r, i })).filter(x => x.r < RIR_MIN_PESANTE && c.prog.fasi[x.i] !== 'scarico'); return w.length ? [{ msg: 'RIR bersaglio sui fondamentali pesanti: settimane ' + w.map(x => (x.i + 1) + '=' + x.r).join(', '), gravita: 2 }] : []; } },
  { id: 'RIR-03', nome: 'RIR della prima settimana troppo basso per il livello (cedimento sugli isolamenti e sulle macchine dal primo giorno)', sev: 3, forza: 'Moderata', fonte: 'docs/ricerca-ipertrofia-programmazione.md 3.5; Halperin 2022, Refalo 2023 (stime del RIR sbagliate di circa 1 ripetizione); INT-04/05',
    dove: ['js/coach/regole-ricerca.js: RIR_TIPO (isolamento [0,1], macchina [0,2]) e rirBersaglioBase', 'js/coach/intensita.js: rirExtraIntensita (+1 solo alla prima volta con un esercizio e solo con il consenso)'],
    check: (m, c) => {
      const min = RIR_SETT1_MIN[c.level], bassi = Object.keys(m.rir1).filter(k => m.rir1[k] < min);
      return bassi.length ? [{ sub: c.level, sev: c.level === 'principiante' ? 3 : 2, msg: 'RIR bersaglio alla settimana 1: ' + Object.keys(m.rir1).map(k => k + '=' + m.rir1[k]).join(', ') + ' (minimo ' + min + ' per ' + c.level + ')', gravita: min - Math.min.apply(null, bassi.map(k => m.rir1[k])) }] : []; } },

  /* ---------------- sicurezza ---------------- */
  { id: 'SAF-01', nome: 'Esercizio in conflitto con un fastidio dichiarato (controindicato)', sev: 5, forza: 'Convenzione', fonte: 'pratica clinica e dei coach (non consulenza medica); elenco del collaudo in CONTROINDICAZIONI',
    dove: [MOTORE_JS + ': RISCHIO / consentito (tre regioni, regex sul nome; nessun dato nella libreria)', 'js/coach/biomeccanica.js: bonusBiomecc'],
    check: (m, c) => {
      const out = [];
      c.fastidi.forEach(f => m.sedute.forEach(s => s.es.forEach(e => { if (CONTROINDICAZIONI[f] && CONTROINDICAZIONI[f].forte.test(e.pulito)) out.push({ sub: f, msg: s.titolo + ': ' + e.pulito + ' con fastidio a ' + f + (c.rischio[f] && c.rischio[f].test(e.nome) ? ' (RISCHIO lo vieta ma e entrato lo stesso)' : ' (RISCHIO non lo copre)'), tag: e.pulito, gravita: 3 }); })));
      return out; } },
  { id: 'SAF-02', nome: 'Esercizio da usare con cautela per un fastidio dichiarato', sev: CAUTELA_SEV, forza: 'Convenzione', fonte: 'pratica clinica e dei coach; elenco del collaudo in CONTROINDICAZIONI',
    dove: [MOTORE_JS + ': RISCHIO / consentito', 'js/coach/biomeccanica.js: SCALE_DOLORE'],
    check: (m, c) => {
      const out = [];
      c.fastidi.forEach(f => m.sedute.forEach(s => s.es.forEach(e => { if (CONTROINDICAZIONI[f] && CONTROINDICAZIONI[f].cautela.test(e.pulito)) out.push({ sub: f, msg: s.titolo + ': ' + e.pulito + ' con fastidio a ' + f, tag: e.pulito, gravita: 1 }); })));
      return out; } },
  { id: 'SAF-03', nome: 'Attrezzatura non disponibile per il luogo dichiarato', sev: 4, forza: 'Convenzione', fonte: 'coerenza con la risposta ("A casa con manubri: manubri e una panca"; "Corpo libero: senza attrezzi"; attrezzi della palestra)',
    dove: [MOTORE_JS + ': attrezzoDi (regex sul nome, non legge DETTAGLI) / consentito'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach(e => { const v = violaAttrezzatura(e, c); if (v === 'duro') out.push({ sub: c.luogo, msg: s.titolo + ': ' + e.pulito + ' richiede ' + e.inf.att + ' (luogo: ' + c.luogo + (c.attrezziPalestra ? ' con ' + c.attrezziPalestra.join('+') : '') + ')', tag: e.pulito, gravita: 3 }); }));
      return out; } },
  { id: 'SAF-04', nome: 'Attrezzatura non garantita nel luogo dichiarato (sbarra, parallele, sedia romana a casa o a corpo libero)', sev: 2, forza: 'Convenzione', fonte: 'coerenza con la risposta; il questionario non chiede la sbarra',
    dove: [MOTORE_JS + ': attrezzoDi (le trazioni contano come "corpo")', 'js/ui/onboarding.js: ONB_LUOGHI (nessuna domanda sulla sbarra)'],
    check: (m, c) => {
      const out = [];
      m.sedute.forEach(s => s.es.forEach(e => { if (violaAttrezzatura(e, c) === 'quasi') out.push({ sub: c.luogo, msg: s.titolo + ': ' + e.pulito + ' richiede ' + e.inf.att + ' (luogo: ' + c.luogo + ')', tag: e.pulito + ' [' + e.inf.att + ']', gravita: 1 }); }));
      return out; } },
  { id: 'SAF-05', nome: 'Esercizio tecnicamente impegnativo a un principiante o in modalita prudente (over 65, PAR-Q)', sev: 2, forza: 'Convenzione', fonte: 'pratica dei coach: il principiante parte da macchine, manubri e regressioni; ACSM 2026 per over 65 e pressione',
    dove: [RICETTE_JS + ': buildProgram (prio: +3 ai pesanti se !cauto, anche ai principianti; cauto toglie solo 3 punti)', MOTORE_JS + ': consentito'],
    check: (m, c) => {
      const out = [];
      const rx = c.cauto ? TECNICI_PRUDENTE : (c.level === 'principiante' ? TECNICI_PRINCIPIANTE : null);
      if (!rx) return out;
      m.sedute.forEach(s => s.es.forEach(e => { if (rx.test(e.pulito)) out.push({ sub: c.cauto ? 'prudente' : 'principiante', msg: s.titolo + ': ' + e.pulito + ' (' + (c.cauto ? 'modalita prudente' : 'principiante') + ')', tag: e.pulito, gravita: c.cauto ? 2 : 1 }); }));
      return out; } },
  { id: 'SAF-06', nome: 'Fastidio alla spalla senza lavoro per la cuffia o i deltoidi posteriori', sev: 2, forza: 'Convenzione', fonte: 'docs/ricerca-metodi-coach-pratici.md H-08 (Cressey: rotazione esterna della cuffia almeno una volta a settimana)',
    dove: ['js/coach/biomeccanica.js: SCALE_DOLORE (solo una nota)', STRUTTURA_JS + ': strCopri (aggiunge i deltoidi posteriori solo per ipertrofia non principiante)'],
    check: (m, c) => c.fastidi.indexOf('spalle') !== -1 && (m.dir.deltoidi_posteriori || 0) < 2 ? [{ msg: 'fastidio alla spalla e ' + r1(m.dir.deltoidi_posteriori || 0) + ' serie dirette di deltoidi posteriori o cuffia (face pull, reverse fly) a settimana', gravita: 2 }] : [] }
];
/* SAF-05 con modalita prudente pesa di piu: la gravita lo dice, la severita di classe resta quella del criterio */

/* =====================================================================================================
   4. CALCOLI DI SUPPORTO (volume, tempo, antagonisti, attrezzatura)
   ===================================================================================================== */
function giorniDiFila(gi) {
  const s = gi.slice().sort((a, b) => a - b); let mx = 0, cur = 0, prev = -9;
  s.forEach(g => { cur = g === prev + 1 ? cur + 1 : 1; mx = Math.max(mx, cur); prev = g; });
  return mx;
}
function antagonisti(a, b) {
  const x = a.inf.bers, y = b.inf.bers, spinta = (e) => e.inf.mov === 'spintaO' || e.inf.mov === 'spintaV', tirata = (e) => e.inf.mov === 'tirataO' || e.inf.mov === 'tirataV' || e.inf.mov === 'deltPost';
  if ((spinta(a) && tirata(b)) || (tirata(a) && spinta(b))) return true;
  if ((x.startsWith('petto') && (y === 'dorsali' || y === 'schiena_spessore')) || (y.startsWith('petto') && (x === 'dorsali' || x === 'schiena_spessore'))) return true;
  if ((x === 'bicipiti' && y === 'tricipiti') || (x === 'tricipiti' && y === 'bicipiti')) return true;
  if ((x === 'quadricipiti' && y === 'femorali') || (x === 'femorali' && y === 'quadricipiti')) return true;
  return false;
}
/* 'duro' = l esercizio non si puo fare col luogo dichiarato; 'quasi' = attrezzatura non garantita; null = ok */
function violaAttrezzatura(e, c) {
  const att = e.inf.att;
  if (!att) return null;
  if (c.luogo === 'palestra') {
    if (!c.attrezziPalestra) return null;
    const cat = CATEGORIA_ATTREZZO[att];
    if (cat && c.attrezziPalestra.indexOf(cat) === -1) return 'duro';
    return null;
  }
  if (ATTREZZI_OK[c.luogo].indexOf(att) !== -1) return null;
  if (ATTREZZI_QUASI[c.luogo].indexOf(att) !== -1) return 'quasi';
  return 'duro';
}
/* volume per gruppo del collaudo: elenco di verdetti { g, tipo: mis|diretto|sotto|sopra, v, d, min, max, classe } */
function volumeGruppi(m, c) {
  if (m._volGruppi) return m._volGruppi;
  const out = [];
  const req = RICHIESTI[c.tipoObiettivo];
  Object.keys(GRUPPI).forEach(g => {
    const def = GRUPPI[g], v = m.vol[g] || 0, d = m.dir[g] || 0;
    const piccolo = def.classe !== 'grande';
    const applicabile = !piccolo || (def.classe === 'core' ? c.days >= 3 : (c.days >= PICCOLI_GIORNI_MIN && c.minutes >= PICCOLI_MINUTI_MIN && c.level !== 'principiante'));
    if (!applicabile) return;
    if (def.soloDiretto) {   /* avambracci: solo la presenza di un esercizio diretto, per avanzati in ipertrofia con tempo */
      if (c.tipoObiettivo === 'ipertrofia' && c.level === 'avanzato' && c.days >= 4 && c.minutes >= 60 && d < DIRETTE_AVAMBRACCI) out.push({ g, tipo: 'diretto', v, d, classe: def.classe, min: DIRETTE_AVAMBRACCI });
      return;
    }
    let range = def.classe === 'core' ? null : VOLUME_SETT[c.tipoObiettivo][c.level][def.classe];
    if (g === 'glutei' && c.goals.indexOf('glutei') !== -1) range = VOLUME_GLUTEI_OBIETTIVO[c.level];
    const richiesto = req.indexOf(g) !== -1;
    if (richiesto && v < ASSENTE_FRAZ) { out.push({ g, tipo: 'mis', v, d, classe: def.classe }); return; }
    const tab = c.tipoObiettivo === 'ipertrofia' && c.level !== 'principiante' ? DIRETTE_MIN_MUSCOLO[g] : null;
    const pavimento = tab ? tab[c.level] : null;
    const direttoBasso = pavimento !== null && d < pavimento;
    if (direttoBasso) out.push({ g, tipo: 'diretto', v, d, classe: def.classe, min: pavimento });
    if (!range) return;
    if (richiesto && !def.soloMax && !direttoBasso && v < range[0] * (1 - TOLLERANZA_VOLUME_BASSO)) out.push({ g, tipo: 'sotto', v, d, min: range[0], classe: def.classe });
    if (v > range[1] * (1 + TOLLERANZA_VOLUME_ALTO)) out.push({ g, tipo: 'sopra', v, d, max: range[1], classe: def.classe });
  });
  m._volGruppi = out;
  return out;
}

/* =====================================================================================================
   5. HARNESS: carica il codice vero dell app in un contesto vm (come tests/muscoli.test.js)
   ===================================================================================================== */
function creaAmbiente() {
  const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(f => f !== 'js/avvio.js');
  const nulla = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : nulla, apply: () => nulla, construct: () => nulla });
  const store = {};
  const ctx = { console, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {}, document: nulla, addEventListener() {}, removeEventListener() {}, MutationObserver: function () { this.observe = () => {}; this.disconnect = () => {}; },
    localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
    navigator: { userAgent: 'node', language: 'it' }, location: { href: '', search: '', hash: '' } };
  ctx.window = ctx; ctx.self = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  const errori = [];
  scripts.forEach(f => { try { vm.runInContext(fs.readFileSync(path.join(R, f), 'utf8'), ctx, { filename: f }); } catch (e) { errori.push(f + ': ' + e.message); } });
  /* senza consenso il coach non legge il profilo e non stima i carichi: la struttura della scheda non cambia */
  ctx.coachAttivo = () => false; ctx.getProfile = () => null;
  const g = (nome) => vm.runInContext(nome, ctx);
  return { ctx, g, scriptCaricati: scripts.length, erroriCaricamento: errori };
}

let ENV = null, G = null;
const cacheEs = new Map();
function infoEs(nome) {
  let c = cacheEs.get(nome);
  if (c) return c;
  const meta = G.findExercise(nome), det = G.dettaglioEsercizio(nome), pulito = G.senzaEmoji(nome);
  const schema = G.schemaDi(nome);
  const bers = det ? det.bersaglio : '';
  let sec = det ? det.secondari.filter(s => SECONDARI_NON_CONTATI.indexOf(s) === -1) : [];
  if (FEMORALI_NON_CONTATI_NELLO_SQUAT && schema === 'squat') sec = sec.filter(s => s !== 'femorali');
  const tipo = meta ? meta.type : null;
  let mov = null;
  if (tipo === 'compound') {
    if (bers.startsWith('petto')) mov = 'spintaO';
    else if (bers === 'deltoide_anteriore') mov = 'spintaV';
    else if (bers === 'dorsali') mov = 'tirataV';
    else if (bers === 'schiena_spessore') mov = 'tirataO';
    else if (bers === 'tricipiti') mov = 'spintaT';
    else if (schema === 'squat') mov = 'squat';
    else if (schema === 'hinge' || ['erettori', 'grande_gluteo', 'femorali'].indexOf(bers) !== -1) mov = 'hinge';
  } else if (tipo === 'isolation' && bers === 'deltoide_posteriore') mov = 'deltPost';
  c = { nome, pulito, meta, det, tipo, bers, sec, schema, mov, carico: G.tipoCarico(nome), tempo: !!(meta && G.isTimeBased(nome)), att: det ? det.att : '', gruppoLib: meta ? meta.group : '' };
  cacheEs.set(nome, c);
  return c;
}
function gruppoDi(muscolo) { return Object.keys(GRUPPI).find(g => GRUPPI[g].muscoli.indexOf(muscolo) !== -1) || null; }

/* modello della settimana: serie per muscolo (frazionarie e dirette), per gruppo, per seduta, schemi, durata */
function modello(prog, c) {
  const DAYS = G.DAYS;
  const sedute = prog.sedute.map((sd, i) => {
    const es = sd.esercizi.map((e, k) => ({ k, nome: e.name, pulito: G.senzaEmoji(e.name), inf: infoEs(e.name), sets: Number(e.sets), reps: Number(e.reps), rest: Number(e.rest), tecnica: e.tecnica || null, superset: !!e.superset, fisso: !!e.fisso, peso: e.weight }));
    const grp = {}, dir = {};
    es.forEach(e => contaSerie(e, grp, dir));
    return { i, giorno: sd.giorno, gi: DAYS.indexOf(sd.giorno), tipo: sd.tipo, titolo: sd.titolo, es, grp, dir, minuti: stimaMinuti(es) };
  });
  const vol = {}, dirette = {}, mov = { spintaO: 0, spintaV: 0, tirataO: 0, tirataV: 0, squat: 0, hinge: 0, deltPost: 0 };
  sedute.forEach(s => {
    Object.keys(s.grp).forEach(g => { vol[g] = (vol[g] || 0) + s.grp[g]; });
    Object.keys(s.dir).forEach(g => { dirette[g] = (dirette[g] || 0) + s.dir[g]; });
    s.es.forEach(e => { if (e.inf.mov && mov[e.inf.mov] !== undefined && !e.inf.tempo) mov[e.inf.mov] += e.sets; });
  });
  const flessione = sedute.reduce((t, s) => t + s.es.filter(e => /leg curl|nordic/i.test(e.pulito)).reduce((a, e) => a + e.sets, 0), 0);
  return { sedute, vol, dir: dirette, mov, flessioneGinocchio: flessione, errori: [] };
}
function contaSerie(e, grp, dir) {
  if (!(e.sets > 0)) return;
  /* Per ogni gruppo una serie vale 1 se il bersaglio e nel gruppo, altrimenti 0,5 se lo e un sinergista: due muscoli dello stesso gruppo
     (es. dorsali bersaglio e romboidi secondario nelle trazioni) non contano due volte. */
  const peso = {};
  e.inf.sec.forEach(m => { const g = gruppoDi(m); if (g) peso[g] = Math.max(peso[g] || 0, FRAZ_SINERGISTA); });
  const gb = e.inf.bers ? gruppoDi(e.inf.bers) : null;
  if (gb) { peso[gb] = 1; dir[gb] = (dir[gb] || 0) + e.sets; }
  Object.keys(peso).forEach(g => { grp[g] = (grp[g] || 0) + e.sets * peso[g]; });
}
function secTut(e) { return ((e.inf.tempo ? e.reps : e.reps * SEC_PER_RIPETIZIONE) * (e.inf.meta && e.inf.meta.lato ? FATTORE_LATO : 1)) + SEC_SETUP_SERIE; }
function stimaMinuti(es) {
  let sec = MIN_RISCALDAMENTO_GENERALE * 60;
  const pesanti = es.filter(e => e.inf.carico === 'pesante' && e.inf.tipo === 'compound' && !e.inf.tempo).length;
  sec += Math.min(pesanti, RISCALDAMENTO_ESERCIZI_MAX) * SERIE_RISCALDAMENTO_PESANTE * SEC_SERIE_RISCALDAMENTO;
  for (let i = 0; i < es.length; i++) {
    const a = es[i], b = es[i + 1] && es[i + 1].superset ? es[i + 1] : null;
    if (b) {
      const giri = Math.max(a.sets, b.sets);
      sec += giri * (secTut(a) + secTut(b) + SEC_TRANSIZIONE_SUPERSERIE) + Math.max(0, giri - 1) * Math.max(a.rest, b.rest) + SEC_TRANSIZIONE_ESERCIZIO;
      i++;
    } else sec += a.sets * secTut(a) + Math.max(0, a.sets - 1) * a.rest + SEC_TRANSIZIONE_ESERCIZIO;
    [a, b].forEach(x => { if (x && x.tecnica === 'drop') sec += SEC_TECNICA_DROP; });
  }
  return sec / 60;
}

/* =====================================================================================================
   6. MATRICE DEI PROFILI
   ===================================================================================================== */
const GOAL_SET = [['massa'], ['forza'], ['ricomposizione'], ['dimagrimento'], ['salute'], ['glutei'], ['massa', 'forza'], ['forza', 'massa']];
const LIVELLI = ['principiante', 'intermedio', 'avanzato'];
const GIORNI = [2, 3, 4, 5, 6];
const MINUTI = [30, 45, 60, 75, 90];
const LUOGHI = ['palestra', 'manubri', 'corpo'];
const FASTIDI_SET = [[], ['spalle'], ['ginocchia'], ['schiena'], ['spalle', 'schiena'], ['ginocchia', 'schiena']];
const SESSI = ['M', 'F'];
const FASCE_ETA = [['giovane', 25], ['adulto', 45], ['senior', 70]];
/* Risposte psicologiche (js/coach/psicologia.js): cambiano la scelta del metodo famoso e le tecniche. "nessuno" = non ha risposto (la maggioranza) */
const PSICO = {
  nessuno: undefined,
  impegnativo: { preferenza: 'durissimi', tolleranza: 'spingo', fiducia: 'alta', varieta: 'mix' },
  tranquillo: { preferenza: 'tranquilli', tolleranza: 'mi-fermo', fiducia: 'media', varieta: 'mix' },
  'poca-fiducia': { fiducia: 'poca', dopoPausa: 'mollo', preferenza: 'impegnativi', tolleranza: 'continuo' },
  routine: { varieta: 'routine', preferenza: 'impegnativi', tolleranza: 'continuo' },
  disagio: { palestra: 'disagio', fiducia: 'media' }
};
function hash32(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function scegli(rng, voci) { let t = voci.reduce((s, v) => s + v[1], 0) * rng(); for (const v of voci) { t -= v[1]; if (t < 0) return v[0]; } return voci[voci.length - 1][0]; }

/* Le dimensioni "minori" (sonno, attrezzi preferiti, frequenza scelta, PAR-Q, priorita, attrezzi della palestra, seme) si assegnano con un
   generatore pseudo-casuale fisso per ogni profilo: ripetibile, e uguale in ogni esecuzione. */
function profilo(goals, level, days, minutes, luogo, fastidi, sex, eta, modo) {
  const id = [goals.join('+'), level, days, minutes, luogo, fastidi.join('+') || '-', sex, eta[0]].join('|');
  const rng = mulberry32(hash32(id));
  const p = { id, goals: goals.slice(), level, days, minutes, luogo, fastidi: fastidi.slice(), sex, age: eta[1], fasciaEta: eta[0],
    sonno: scegli(rng, [['bene', 70], ['medio', 15], ['male', 15]]), attrezzi: scegli(rng, [['indifferente', 60], ['liberi', 20], ['macchine', 20]]),
    freq: scegli(rng, [['auto', 55], ['2', 20], ['3', 15], ['1', 10]]), parq: scegli(rng, [['no', 90], ['si', 10]]),
    priorita: scegli(rng, [[[], 70], [['petto'], 4], [['schiena'], 4], [['spalle'], 4], [['braccia'], 4], [['gambe'], 4], [['glutei'], 4], [['spalle', 'braccia'], 3], [['petto', 'gambe'], 3]]).slice(),
    attrezziPalestra: luogo === 'palestra' ? scegli(rng, [[null, 80], [['bilanciere', 'manubri', 'sbarra'], 10], [['macchine', 'manubri'], 10]]) : null,
    psico: scegli(rng, [['nessuno', 55], ['impegnativo', 12], ['tranquillo', 12], ['poca-fiducia', 7], ['routine', 8], ['disagio', 6]]),
    seme: 'collaudo|' + id + '|' + Math.floor(rng() * 3) };
  return p;
}
function pesoProfilo(p) {
  if (PESI_UNIFORMI) return 1;
  const v = { obiettivo: p.goals.join('+'), livello: p.level, giorni: String(p.days), minuti: String(p.minutes), luogo: p.luogo, fastidi: p.fastidi.join('+') || 'nessuno', sesso: p.sex, fasciaEta: p.fasciaEta };
  return Object.keys(v).reduce((t, d) => t * ((PESI_POPOLAZIONE[d] && PESI_POPOLAZIONE[d][v[d]]) || 1), 1);
}
let PESI_UNIFORMI = false;
function matrice(modo) {
  const out = [];
  const completa = modo === 'completa';
  GOAL_SET.forEach(o => LIVELLI.forEach(l => GIORNI.forEach(g => MINUTI.forEach(mi => LUOGHI.forEach(lu => FASTIDI_SET.forEach(f => {
    if (completa) SESSI.forEach(s => FASCE_ETA.forEach(e => out.push(profilo(o, l, g, mi, lu, f, s, e, modo))));
    else {
      const rng = mulberry32(hash32([o.join('+'), l, g, mi, lu, f.join('+')].join('|') + '#sx'));
      out.push(profilo(o, l, g, mi, lu, f, SESSI[Math.floor(rng() * 2)], FASCE_ETA[scegli(rng, [[0, 40], [1, 40], [2, 20]])], modo));
    }
  }))))));
  if (modo === 'rapida') return out.filter(p => hash32(p.id + '#rapida') % 6 === 0);   /* campione fisso: non per indice, che cadrebbe sempre sullo stesso valore delle dimensioni interne */
  return out;
}

/* =====================================================================================================
   7. ESECUZIONE SU UN PROFILO
   ===================================================================================================== */
function datiPerBuild(p, senzaPriorita) {
  return { sex: p.sex, age: p.age, seme: p.seme, fastidi: p.fastidi.slice(), sonno: p.sonno, attrezzi: p.attrezzi, usaProfilo: false, level: p.level, days: p.days, goals: p.goals.slice(),
    luogo: p.luogo, minutes: p.minutes, freq: p.freq, parq: p.parq, priorita: senzaPriorita ? [] : p.priorita.slice(), psico: PSICO[p.psico || 'nessuno'], attrezziPalestra: p.attrezziPalestra ? p.attrezziPalestra.slice() : undefined };
}
function costruisci(p, senzaPriorita) { return G.buildProgram(datiPerBuild(p, senzaPriorita)); }

function tipoObiettivo(goals) { const g = goals[0]; return g === 'forza' ? 'forza' : ((g === 'salute' || g === 'dimagrimento') ? 'generale' : 'ipertrofia'); }

/* RIR pianificato per settimana, chiamando le funzioni vere con getProgramma/settimanaProgramma/getProfile finti */
function rirPianificato(prog, p) {
  const ctx = ENV.ctx, out = { pesante: [], nov: {} };
  const salvati = { getProgramma: ctx.getProgramma, settimanaProgramma: ctx.settimanaProgramma, getProfile: ctx.getProfile };
  try {
    ctx.getProfile = () => ({ level: p.level, age: p.age, parq: p.parq === 'si', psico: null });
    ctx.getProgramma = () => ({ rirSett: prog.rirSett, fasi: prog.fasi, settimane: prog.settimane });
    const w = (n) => { ctx.settimanaProgramma = () => ({ numero: n, fase: prog.fasi[n - 1] }); };
    for (let n = 1; n <= prog.settimane; n++) { w(n); out.pesante.push(G.rirBersaglioBase('Squat con Bilanciere')[0]); }
    w(1);
    out.nov = {};
    [['pesante', 'Squat con Bilanciere'], ['macchina', 'Leg Press'], ['isolamento', 'Curl ai Cavi']].forEach(([k, nome]) => { out.nov[k] = G.rirBersaglioBase(nome)[0]; });
  } catch (e) { out.errore = e.message; }
  Object.assign(ctx, salvati);
  return out;
}

function contesto(p) {
  return { prof: p, goals: p.goals, level: p.level, days: p.days, minutes: p.minutes, luogo: p.luogo, fastidi: p.fastidi, priorita: p.priorita, tipoObiettivo: tipoObiettivo(p.goals),
    attrezziPalestra: p.attrezziPalestra, cauto: p.age >= 65 || p.parq === 'si', rischio: G.RISCHIO };
}
function analizza(p, filtro) {
  const c = contesto(p);
  let prog;
  try { prog = costruisci(p); } catch (e) { return { c, prog: null, m: { sedute: [], errori: ['buildProgram ha lanciato: ' + (e && e.message)] }, trovati: [{ crit: CRITERI[0], f: { msg: 'buildProgram ha lanciato: ' + (e && e.message), gravita: 10 } }], erroriCriteri: [] }; }
  const senzaPriorita = p.priorita.length ? () => { try { return modello(costruisci(p, true), c).vol; } catch (e) { return null; } } : null;   /* per PRI-01 */
  return valuta(p, c, prog, filtro, senzaPriorita);
}
/* valuta un programma gia costruito (anche finto: vedi --autotest) */
function valuta(p, c, prog, filtro, volSenzaPriorita) {
  c.prog = prog; c.metodo = prog.metodo; c.splitNome = prog.split && prog.split.nome;
  const m = modello(prog, c);
  if (!Array.isArray(prog.sedute) || !prog.sedute.length) m.errori.push('nessuna seduta generata');
  /* fattibilita: esiste un esercizio dello schema consentito dal luogo e non controindicato dai fastidi dichiarati? */
  c.fattibile = {};
  ['squat', 'hinge', 'spintaO', 'tirataO', 'spintaV', 'tirataV'].forEach(k => {
    c.fattibile[k] = G.EXERCISE_LIBRARY.some(x => { const i = infoEs(x.name); return i.mov === k && G.consentito(x.name, prog.prefs) && !p.fastidi.some(f => CONTROINDICAZIONI[f] && CONTROINDICAZIONI[f].forte.test(i.pulito)) && !violaAttrezzatura({ inf: i }, c); });
  });
  const r = rirPianificato(prog, p); m.rirPesante = r.pesante; m.rir1 = r.nov;
  if (volSenzaPriorita) m.volSenzaPriorita = typeof volSenzaPriorita === 'function' ? volSenzaPriorita() : volSenzaPriorita;
  const trovati = [], erroriCriteri = [];
  CRITERI.forEach(cr => {
    if (filtro && filtro.indexOf(cr.id) === -1) return;
    try { (cr.check(m, c) || []).forEach(f => trovati.push({ crit: cr, f })); } catch (e) { erroriCriteri.push(cr.id + ': ' + e.message); }
  });
  return { c, prog, m, trovati, erroriCriteri };
}

/* =====================================================================================================
   8. REPORT
   ===================================================================================================== */
const ABBR = { Lunedì: 'Lun', Martedì: 'Mar', Mercoledì: 'Mer', Giovedì: 'Gio', Venerdì: 'Ven', Sabato: 'Sab', Domenica: 'Dom' };
function tabellaSettimana(m) {
  const righe = ['| Giorno | Seduta | Esercizi (serie x ripetizioni, recupero s; SS = in coppia col precedente) | Min stimati |', '|---|---|---|---|'];
  m.sedute.forEach(s => righe.push('| ' + (ABBR[s.giorno] || s.giorno) + ' | ' + s.titolo + ' | ' + s.es.map(e => e.pulito + ' ' + e.sets + 'x' + e.reps + ' r' + e.rest + (e.superset ? ' SS' : '') + (e.tecnica ? ' [' + e.tecnica + ']' : '')).join(' ; ') + ' | ' + Math.round(s.minuti) + ' |'));
  const vol = Object.keys(GRUPPI).map(g => g.replace('deltoidi_', 'delt.') + ' ' + r1(m.vol[g] || 0)).join(', ');
  righe.push('', 'Serie frazionarie a settimana: ' + vol + '.');
  return righe.join('\n');
}
/* il profilo nel formato di --profilo (si copia e incolla), con i nomi dei campi di buildProgram */
function profiloCompatto(p) {
  return '`' + JSON.stringify({ goals: p.goals, level: p.level, days: p.days, minutes: p.minutes, luogo: p.luogo, fastidi: p.fastidi, sex: p.sex, age: p.age, sonno: p.sonno, attrezzi: p.attrezzi, freq: p.freq, parq: p.parq, priorita: p.priorita, psico: p.psico, attrezziPalestra: p.attrezziPalestra, seme: p.seme }) + '`';
}

function eseguiMatrice(profili, opz) {
  const classi = new Map();
  const dimensioni = { livello: {}, obiettivo: {}, giorni: {}, minuti: {}, luogo: {}, fastidi: {}, sesso: {}, fasciaEta: {}, metodo: {} };
  const tot = { erroriCriteri: {}, pesoTotale: 0, profili: 0, errori: 0, conFallimenti: 0, conGravi: 0, conMetodo: 0, perSev: {}, perMetodo: {}, scemaSettimaneDiverse: 0, fallimentiTotali: 0 };
  const rngRes = mulberry32(20261005);
  const K = 40;
  const t0 = Date.now();
  let ultimo = 0;
  profili.forEach((p, idx) => {
    const a = analizza(p, opz.solo);
    const wp = pesoProfilo(p);
    tot.profili++; tot.pesoTotale += wp;
    if (!a.prog) tot.errori++;
    (a.erroriCriteri || []).forEach(e => { tot.erroriCriteri[e] = (tot.erroriCriteri[e] || 0) + 1; });
    if (a.prog && a.prog.metodo) { tot.conMetodo++; tot.perMetodo[a.prog.metodo] = (tot.perMetodo[a.prog.metodo] || 0) + 1; }
    if (a.prog && a.prog.scheme && a.prog.scheme.settimane !== a.prog.settimane) tot.scemaSettimaneDiverse++;
    const viste = new Map(), conteggi = new Map();
    const tagViste = new Map();
    a.trovati.forEach(t => {
      const key = t.crit.id + (t.f.sub ? ':' + t.f.sub : '');
      conteggi.set(key, (conteggi.get(key) || 0) + 1);
      if (t.f.tag) { const ts = tagViste.get(key) || tagViste.set(key, new Set()).get(key); ts.add(t.f.tag); }
      const prec = viste.get(key);
      t.sev = t.f.sev || t.crit.sev;
      if (!prec || t.f.gravita > prec.f.gravita) viste.set(key, t);
    });
    let gravi = false, nFall = 0;
    const dimVals = { livello: p.level, obiettivo: p.goals[0], giorni: String(p.days), minuti: String(p.minutes), luogo: p.luogo, fastidi: p.fastidi.join('+') || 'nessuno', sesso: p.sex, fasciaEta: p.fasciaEta, metodo: a.prog && a.prog.metodo ? a.prog.metodo : 'nessuno' };
    viste.forEach((t, key) => {
      nFall++;
      if (t.sev >= 4) gravi = true;
      let cl = classi.get(key);
      if (!cl) { cl = { chiave: key, codice: t.crit.id, sub: t.f.sub || '', nome: t.crit.nome, sev: t.sev, forza: t.crit.forza, fonte: t.crit.fonte, dove: t.crit.dove, n: 0, w: 0, tags: {}, occorrenze: 0, res: [], visti: 0, peggiore: null, perDim: {} }; classi.set(key, cl); }
      cl.n++; cl.w += wp; cl.occorrenze += conteggi.get(key);
      (tagViste.get(key) || []).forEach(tg => { cl.tags[tg] = (cl.tags[tg] || 0) + 1; });
      Object.keys(dimVals).forEach(d => { cl.perDim[d] = cl.perDim[d] || {}; cl.perDim[d][dimVals[d]] = (cl.perDim[d][dimVals[d]] || 0) + 1; });
      cl.visti++;
      const cand = () => ({ profilo: p, msg: t.f.msg, gravita: t.f.gravita, tabella: tabellaSettimana(a.m), metodo: a.prog && a.prog.metodo || null });
      if (cl.res.length < K) cl.res.push(cand()); else { const j = Math.floor(rngRes() * cl.visti); if (j < K) cl.res[j] = cand(); }
      if (!cl.peggiore || t.f.gravita > cl.peggiore.gravita) cl.peggiore = cand();
    });
    tot.fallimentiTotali += nFall;
    if (nFall) tot.conFallimenti++;
    if (gravi) { tot.conGravi++; tot.pesoGravi = (tot.pesoGravi || 0) + wp; }
    const dimTot = Object.assign({}, dimVals, { obiettivo: p.goals.join('+') });
    Object.keys(dimTot).forEach(d => { const o = dimensioni[d][dimTot[d]] = dimensioni[d][dimTot[d]] || { n: 0, gravi: 0, fall: 0 }; o.n++; if (gravi) o.gravi++; o.fall += nFall; });
    if (!opz.quiet && Date.now() - ultimo > 2000) { ultimo = Date.now(); process.stderr.write('\r  ' + (idx + 1) + '/' + profili.length + ' profili...'); }
  });
  if (!opz.quiet) process.stderr.write('\r' + ' '.repeat(40) + '\r');
  tot.secondi = (Date.now() - t0) / 1000;
  return { classi, dimensioni, tot };
}

/* esempi: il peggiore, poi i piu diversi (livello, luogo, obiettivo) tra i candidati */
function sceglieEsempi(cl, n) {
  const sc = [], usati = new Set();
  const chiave = (c) => [c.profilo.level, c.profilo.luogo, c.profilo.goals[0]].join('|');
  if (cl.peggiore) { sc.push(cl.peggiore); usati.add(chiave(cl.peggiore)); }
  const lista = cl.res.slice().sort((a, b) => b.gravita - a.gravita);
  for (const c of lista) { if (sc.length >= n) break; if (sc.indexOf(c) === -1 && !usati.has(chiave(c)) && c.profilo.id !== sc[0].profilo.id) { sc.push(c); usati.add(chiave(c)); } }
  for (const c of lista) { if (sc.length >= n) break; if (!sc.some(x => x.profilo.id === c.profilo.id)) sc.push(c); }
  return sc.slice(0, n);
}

/* Copertura della libreria: per ogni schema o muscolo, quanti esercizi restano disponibili per luogo e per fastidio, secondo consentito() del generatore
   e, tra parentesi, senza le controindicazioni forti dell elenco esperto. Uno zero spiega da solo molti fallimenti: manca il dato, non la regola. */
const SCHEMI_COPERTURA = [
  ['squat (multiarticolare)', (i) => i.mov === 'squat'], ['hinge (multiarticolare)', (i) => i.mov === 'hinge'],
  ['spinta orizzontale', (i) => i.mov === 'spintaO'], ['spinta verticale', (i) => i.mov === 'spintaV'],
  ['tirata orizzontale', (i) => i.mov === 'tirataO'], ['tirata verticale', (i) => i.mov === 'tirataV'],
  ['flessione del ginocchio (femorali)', (i) => /leg curl|nordic/i.test(i.pulito)], ['quadricipiti (isolamento)', (i) => i.bers === 'quadricipiti' && i.tipo === 'isolation'],
  ['polpacci', (i) => i.bers === 'polpacci'], ['deltoidi laterali', (i) => i.bers === 'deltoide_laterale' && i.tipo === 'isolation'], ['deltoidi posteriori', (i) => i.bers === 'deltoide_posteriore'],
  ['bicipiti', (i) => i.bers === 'bicipiti'], ['tricipiti (isolamento)', (i) => i.bers === 'tricipiti' && i.tipo === 'isolation'], ['core', (i) => i.gruppoLib === 'core']
];
function coperturaLibreria() {
  const colonne = [['palestra', { luogo: 'palestra', fastidi: [] }], ['manubri', { luogo: 'manubri', fastidi: [] }], ['corpo', { luogo: 'corpo', fastidi: [] }],
    ['spalle', { luogo: 'palestra', fastidi: ['spalle'] }], ['ginocchia', { luogo: 'palestra', fastidi: ['ginocchia'] }], ['schiena', { luogo: 'palestra', fastidi: ['schiena'] }]];
  return SCHEMI_COPERTURA.map(([nome, test]) => ({ schema: nome, celle: colonne.map(([col, prefs]) => {
    const ok = G.EXERCISE_LIBRARY.filter(x => { const i = infoEs(x.name); return test(i) && G.consentito(x.name, prefs); });
    const fastidi = prefs.fastidi.concat(col === 'palestra' || col === 'manubri' || col === 'corpo' ? [] : []);
    const senza = ok.filter(x => !fastidi.some(f => CONTROINDICAZIONI[f] && CONTROINDICAZIONI[f].forte.test(G.senzaEmoji(x.name))));
    return { colonna: col, n: ok.length, nSenzaControindicazioni: senza.length, esercizi: ok.map(x => G.senzaEmoji(x.name)) };
  }) }));
}

function verificheModello(risultato) {
  const v = [];
  const lib = G.EXERCISE_LIBRARY;
  /* 1. controindicazioni: dati o regex? */
  const campi = Object.keys(lib[0]);
  const ha = campi.some(k => /contro|fastid|rischio|limit/i.test(k));
  v.push({ id: 'MOD-01', esito: ha ? 'ok' : 'manca', titolo: 'Controindicazioni come dato della libreria', nota: ha ? 'presenti' : 'Nessun esercizio porta una etichetta di controindicazione (campi della libreria: ' + campi.join(', ') + '). Il rischio sta in una regex per tre regioni (RISCHIO in js/coach/programma/motore.js: ' + Object.keys(G.RISCHIO).join(', ') + ') applicata al NOME.' });
  /* 2. regioni coperte dal questionario */
  v.push({ id: 'MOD-02', esito: 'manca', titolo: 'Regioni di dolore selezionabili', nota: 'Il questionario offre solo spalle, ginocchia, schiena bassa (ONB_FASTIDI). Mancano gomiti, polsi, anche, collo, che nelle schede di un preparatore cambiano la scelta di curl, french press, panca, squat profondo e stacchi.' });
  /* 3. buchi di RISCHIO rispetto all elenco esperto */
  const buchi = {};
  Object.keys(CONTROINDICAZIONI).forEach(f => { buchi[f] = lib.filter(x => CONTROINDICAZIONI[f].forte.test(G.senzaEmoji(x.name)) && !G.RISCHIO[f].test(x.name)).map(x => G.senzaEmoji(x.name)); });
  const nBuchi = Object.keys(buchi).reduce((t, f) => t + buchi[f].length, 0);
  v.push({ id: 'MOD-03', esito: nBuchi ? 'buchi' : 'ok', titolo: 'RISCHIO contro l elenco esperto delle controindicazioni forti', nota: nBuchi ? 'Esercizi che l elenco esperto vieta ma RISCHIO lascia passare: ' + Object.keys(buchi).map(f => f + ': ' + (buchi[f].join(', ') || 'nessuno')).join(' | ') : 'nessun buco' });
  /* 4. attrezzoDi (regex) contro DETTAGLI (dati) */
  const dis = lib.filter(x => { const d = G.dettaglioEsercizio(x.name); const cat = ({ 'Bilanciere': 'bilanciere', 'Trap bar': 'bilanciere', 'Manubri': 'manubri', 'Macchina': 'macchine', 'Cavo': 'macchine', 'Multipower': 'macchine' })[d.att] || 'corpo'; return cat !== G.attrezzoDi(G.senzaEmoji(x.name)); }).map(x => G.senzaEmoji(x.name));
  v.push({ id: 'MOD-04', esito: dis.length ? 'incoerente' : 'ok', titolo: 'Attrezzo: attrezzoDi (regex sul nome) contro DETTAGLI (dato)', nota: dis.length ? dis.length + ' esercizi con due risposte diverse: ' + dis.slice(0, 12).join(', ') + (dis.length > 12 ? '...' : '') : 'coerenti' });
  /* 5. ripetizioni: un numero o un intervallo? */
  v.push({ id: 'MOD-05', esito: 'manca', titolo: 'Intervallo di ripetizioni per la doppia progressione', nota: 'Ogni esercizio della scheda porta UN numero di ripetizioni (reps), non un intervallo (es. 8-12). La progressione e "tutte le serie alle ripetizioni previste, poi +carico" (PRO-03/CAR-06 in js/coach/carichi/progressivo.js): progressione lineare, non doppia progressione.' });
  /* 6. prescrizione per settimana */
  v.push({ id: 'MOD-06', esito: 'parziale', titolo: 'Prescrizione per settimana nel programma', nota: 'Il programma salva sedute identiche per tutte le settimane + fasi (carico/scarico) + rirSett solo per gli avanzati. Volume, carichi e RIR delle altre settimane si decidono a runtime (caricoProssimo, rirBersaglioBase): il collaudo li vede solo chiamando quelle funzioni.' });
  /* 7. volume per gruppo, non per muscolo */
  v.push({ id: 'MOD-07', esito: 'incoerente', titolo: 'Conteggio frazionario nel generatore', nota: 'buildProgram conta le sinergie per GRUPPO (MUSCLE_GROUPS[g].synergists: la panca vale 0,5 per tutte le spalle e tutte le braccia) e ignora i muscoli secondari di DETTAGLI (colonna 9), che sono per MUSCOLO. Il collaudo conta per muscolo: le due misure possono divergere (es. deltoidi laterali, polpacci, femorali).' });
  /* 8. riscaldamento e durata */
  v.push({ id: 'MOD-08', esito: 'manca', titolo: 'Riscaldamento e transizioni nel modello del tempo', nota: 'La stima del coach e 8 min + serie x (35 s + recupero): non conta riscaldamento specifico, transizioni tra macchine, ne il doppio tempo degli esercizi unilaterali (lato). Il collaudo usa un modello piu prudente (vedi costanti SEC_*).' });
  /* 9. scheme.settimane */
  v.push({ id: 'MOD-09', esito: risultato.tot.scemaSettimaneDiverse ? 'incoerente' : 'ok', titolo: 'Durata dello schema (schemeFor.settimane) contro durata del programma', nota: 'schemeFor() dichiara una durata per obiettivo (forza 8, massa 10, ...) che non viene mai letta: la durata vera viene da strutturaProgramma(level) (8 o 12). Programmi con le due durate diverse: ' + risultato.tot.scemaSettimaneDiverse + ' su ' + risultato.tot.profili + '.' });
  /* 10. funzioni di progressione presenti */
  const funz = ['caricoProssimo', 'incrementoPer', 'rirBersaglio', 'rirBersaglioBase', 'applicaCaricoProgressivo'].map(n => n + ': ' + (typeof ENV.ctx[n] === 'function' ? 'si' : 'NO'));
  v.push({ id: 'MOD-10', esito: 'info', titolo: 'Regola di progressione presente', nota: funz.join(', ') });
  const cop = coperturaLibreria();
  const zeri = []; cop.forEach(r => r.celle.forEach(c => { if (c.nSenzaControindicazioni === 0) zeri.push(r.schema + ' (' + c.colonna + ')'); }));
  v.push({ id: 'MOD-12', esito: zeri.length ? 'buchi' : 'ok', titolo: 'Copertura della libreria per luogo e per fastidio', nota: zeri.length ? 'Nessun esercizio disponibile (senza controindicazioni forti) per: ' + zeri.join('; ') + '. Tabella completa nel report.' : 'ogni schema ha almeno un esercizio in ogni luogo e con ogni fastidio' });
  risultato.copertura = cop;
  const att = (cod) => { try { return !!ENV.ctx.regolaAttiva(cod); } catch (e) { return false; } };
  v.push({ id: 'MOD-11', esito: att('INT-04') && att('INT-05') ? 'ok' : 'manca', titolo: 'Calibrazione delle prime sedute (principianti)', nota: 'INT-04 (prima volta con un esercizio: -1 serie e +1 RIR) e INT-05 (bilancio delle prime due sedute) sono regole del coach a runtime: INT-04 ' + (att('INT-04') ? 'attiva' : 'spenta') + ', INT-05 ' + (att('INT-05') ? 'attiva' : 'spenta') + '. Scattano solo con il consenso ai dati (coachAttivo) e non compaiono nel programma generato: il collaudo le vede solo come funzioni (bilancioPrimeSedute: ' + (typeof ENV.ctx.bilancioPrimeSedute === 'function' ? 'presente' : 'assente') + ').' });
  return v;
}

function gitInfo() {
  try {
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: R, encoding: 'utf8' }).trim();
    const sporco = execFileSync('git', ['status', '--porcelain', '--', 'js', 'index.html'], { cwd: R, encoding: 'utf8' }).trim().length > 0;
    return sha + (sporco ? ' (js/ modificato, non committato)' : '');
  } catch (e) { return 'sconosciuto'; }
}

function costruisciRisultato(profili, esec, opz) {
  const { classi, dimensioni, tot } = esec;
  const elenco = [...classi.values()].map(cl => ({ ...cl, pct: cl.n / tot.profili * 100, pctPesata: cl.w / tot.pesoTotale * 100, impatto: cl.w / tot.pesoTotale * PESO_SEV[cl.sev] * 100 }));
  elenco.sort((a, b) => b.impatto - a.impatto || b.n - a.n);
  const perCodice = {};
  elenco.forEach(cl => { const o = perCodice[cl.codice] = perCodice[cl.codice] || { codice: cl.codice, nome: cl.nome, sev: cl.sev, forza: cl.forza, dove: cl.dove, fonte: cl.fonte, n: 0 }; o.n = Math.max(o.n, cl.n); });
  const unionePerCodice = {};
  /* profili con almeno un fallimento per codice: ricalcolato dalle classi (massimo tra le sotto-classi e' un limite inferiore) */
  return { elenco, perCodice, dimensioni, tot };
}

function mdReport(profili, ris, opz, meta, verifiche) {
  const { elenco, dimensioni, tot } = ris;
  const L = [];
  const pct = (n, d) => (d ? (n / d * 100).toFixed(1) : '0.0') + '%';
  L.push('# Collaudo del generatore di schede', '');
  L.push('- Data: ' + meta.data + ' | commit: ' + meta.commit + ' | criteri v' + VERSIONE_CRITERI + (meta.etichetta ? ' | etichetta: ' + meta.etichetta : ''));
  L.push('- Matrice: **' + meta.matrice + '** (' + tot.profili + ' profili: ' + meta.descrizioneMatrice + ')' + (opz.solo ? ' | solo criteri: ' + opz.solo.join(', ') : ''));
  L.push('- Durata: ' + tot.secondi.toFixed(1) + ' s (' + (tot.profili / Math.max(0.001, tot.secondi)).toFixed(0) + ' profili/s). Script caricati: ' + meta.scriptCaricati + (meta.erroriCaricamento.length ? ' (errori di caricamento: ' + meta.erroriCaricamento.join(' | ') + ')' : '') + '.', '');
  L.push('## Totali', '');
  L.push('| Misura | Valore |', '|---|---|');
  L.push('| Profili provati | ' + tot.profili + ' |');
  L.push('| Generatore in errore | ' + tot.errori + ' |');
  L.push('| Programmi con almeno un fallimento | ' + tot.conFallimenti + ' (' + pct(tot.conFallimenti, tot.profili) + ') |');
  L.push('| Programmi con almeno un fallimento di severita alta o critica (>= 4) | ' + tot.conGravi + ' (' + pct(tot.conGravi, tot.profili) + ' della matrice; ' + pct(tot.pesoGravi || 0, tot.pesoTotale) + ' pesata) |');
  L.push('| Fallimenti (classi per programma) in tutto | ' + tot.fallimentiTotali + ' (media ' + (tot.fallimentiTotali / Math.max(1, tot.profili)).toFixed(1) + ' per programma) |');
  L.push('| Programmi con un metodo famoso scelto dal coach | ' + tot.conMetodo + ' (' + pct(tot.conMetodo, tot.profili) + '): ' + (Object.keys(tot.perMetodo).map(k => k + ' ' + tot.perMetodo[k]).join(', ') || 'nessuno') + ' |', '');
  const perSev = {}; elenco.forEach(cl => { perSev[cl.sev] = (perSev[cl.sev] || 0) + 1; });
  L.push('Classi di fallimento trovate: ' + elenco.length + ' (' + [5, 4, 3, 2, 1].filter(s => perSev[s]).map(s => perSev[s] + ' di severita ' + s + ' ' + NOME_SEV[s]).join(', ') + ').', '');

  L.push('## Classi di fallimento per impatto', '');
  L.push('Impatto = percentuale PESATA di programmi colpiti x peso della severita (1, 2, 4, 8, 16). La percentuale pesata usa PESI_POPOLAZIONE (assunzioni del collaudo: ' + (PESI_UNIFORMI ? 'spente con --pesi uniformi' : 'attive') + '); "% matrice" conta ogni profilo uno. Una classe e un criterio, con il muscolo o lo schema dopo i due punti dove serve. "Colpiti" conta i programmi, non le occorrenze.', '');
  L.push('| # | Classe | Sev | Forza prova | Programmi | % matrice | % pesata | Impatto | Dove guardare nel generatore |', '|---|---|---|---|---|---|---|---|---|');
  elenco.slice(0, Math.max(opz.top + 10, 25)).forEach((cl, i) => L.push('| ' + (i + 1) + ' | **' + cl.codice + (cl.sub ? ':' + cl.sub : '') + '** ' + cl.nome + ' | ' + cl.sev + ' | ' + cl.forza + ' | ' + cl.n + ' | ' + cl.pct.toFixed(1) + '% | ' + cl.pctPesata.toFixed(1) + '% | ' + cl.impatto.toFixed(1) + ' | ' + cl.dove[0].slice(0, 150) + ' |'));
  L.push('');

  L.push('## Esempi per le classi principali', '');
  elenco.slice(0, opz.top).forEach((cl, i) => {
    L.push('### ' + (i + 1) + '. ' + cl.codice + (cl.sub ? ':' + cl.sub : '') + ' ' + cl.nome, '');
    L.push('Severita ' + cl.sev + ' (' + NOME_SEV[cl.sev] + '), forza della prova: ' + cl.forza + '. Fonte: ' + cl.fonte + '. Colpisce ' + cl.n + ' programmi su ' + tot.profili + ' (' + cl.pct.toFixed(1) + '% della matrice, ' + cl.pctPesata.toFixed(1) + '% pesata).');
    L.push('Dove guardare: ' + cl.dove.join('; ') + '.');
    const dimTop = ['livello', 'minuti', 'luogo', 'giorni'].map(d => { const o = cl.perDim[d] || {}; return d + ': ' + Object.keys(o).sort((a, b) => o[b] - o[a]).slice(0, 3).map(k => k + ' ' + o[k]).join(', '); }).join(' | ');
    L.push('Dove cade di piu: ' + dimTop + '.');
    const tg = Object.keys(cl.tags || {}).sort((a, b) => cl.tags[b] - cl.tags[a]).slice(0, 6);
    if (tg.length) L.push('Piu frequenti: ' + tg.map(k => k + ' (' + cl.tags[k] + ')').join('; ') + '.');
    L.push('');
    sceglieEsempi(cl, opz.esempi).forEach((e, k) => {
      L.push('**Esempio ' + (k + 1) + '.** Profilo: ' + profiloCompatto(e.profilo) + (e.metodo ? ' (metodo scelto dal coach: ' + e.metodo + ')' : ''), '');
      L.push(e.tabella, '');
      L.push('**Cosa non va:** ' + e.msg, '');
    });
  });

  L.push('## Dove cadono i fallimenti (percentuale di programmi con almeno un fallimento di severita >= 4)', '');
  Object.keys(dimensioni).forEach(d => {
    const o = dimensioni[d], chiavi = Object.keys(o).sort((a, b) => (isNaN(a) || isNaN(b)) ? (a < b ? -1 : 1) : a - b);
    L.push('**' + d + '**: ' + chiavi.map(k => k + ' ' + pct(o[k].gravi, o[k].n) + ' (n=' + o[k].n + ', ' + (o[k].fall / o[k].n).toFixed(1) + ' fall.)').join(' | '), '');
  });

  L.push('## Verifiche sul modello dati (cosa il collaudo non puo calcolare, o calcola solo per approssimazione)', '');
  L.push('| Id | Esito | Verifica | Nota |', '|---|---|---|---|');
  verifiche.forEach(v => L.push('| ' + v.id + ' | ' + v.esito + ' | ' + v.titolo + ' | ' + v.nota.replace(/\|/g, '/') + ' |'));
  L.push('');

  if (ris.copertura) {
    L.push('## Copertura della libreria (esercizi disponibili per schema, luogo e fastidio)', '');
    L.push('Ogni cella: esercizi che consentito() lascia passare, e tra parentesi quelli senza controindicazioni forti dell elenco esperto. 0 = nessuna scelta possibile.', '');
    L.push('| Schema | ' + ris.copertura[0].celle.map(c => c.colonna).join(' | ') + ' |', '|---|' + ris.copertura[0].celle.map(() => '---').join('|') + '|');
    ris.copertura.forEach(r => L.push('| ' + r.schema + ' | ' + r.celle.map(c => c.n + (c.n !== c.nSenzaControindicazioni ? ' (' + c.nSenzaControindicazioni + ')' : '')).join(' | ') + ' |'));
    L.push('');
  }
  const scattati = new Set(elenco.map(cl => cl.codice));
  const superati = CRITERI.filter(cr => !scattati.has(cr.id) && (!opz.solo || opz.solo.indexOf(cr.id) !== -1));
  L.push('## Criteri superati (nessun fallimento in tutta la matrice)', '');
  L.push(superati.length ? superati.map(cr => '- **' + cr.id + '** ' + cr.nome).join('\n') : 'Nessuno: ogni criterio ha trovato almeno un caso.', '');
  L.push('Un criterio che non scatta mai puo essere un pregio del generatore o un criterio mal scritto: `--autotest` controlla che ognuno sappia scattare su un caso costruito apposta.', '');
  L.push('## Criteri e soglie usati', '');
  L.push('| Criterio | Severita | Forza | Fonte |', '|---|---|---|---|');
  CRITERI.forEach(cr => L.push('| ' + cr.id + ' ' + cr.nome + ' | ' + cr.sev + ' | ' + cr.forza + ' | ' + cr.fonte + ' |'));
  L.push('', 'Le soglie numeriche stanno in cima a `tools/collaudo-generatore.js` (sezione 1), ognuna con la sua fonte.', '');
  return L.join('\n');
}

function riepilogoCompatto(ris, meta) {
  const per = {}, pesata = {};
  ris.elenco.forEach(cl => { per[cl.chiave] = cl.n; pesata[cl.chiave] = Number(cl.pctPesata.toFixed(2)); });
  return { criteri: VERSIONE_CRITERI, commit: meta.commit, data: meta.data, matrice: meta.matrice, pesi: PESI_UNIFORMI ? 'uniformi' : 'popolazione', profili: ris.tot.profili, errori: ris.tot.errori, conFallimenti: ris.tot.conFallimenti, conGravi: ris.tot.conGravi, gravi_pesata: Number(((ris.tot.pesoGravi || 0) / ris.tot.pesoTotale * 100).toFixed(2)), conMetodo: ris.tot.conMetodo, classi: per, classi_pesata: pesata };
}

/* =====================================================================================================
   9. CONFRONTO TRA DUE ESECUZIONI
   ===================================================================================================== */
function confronta(fa, fb) {
  const A = JSON.parse(fs.readFileSync(fa, 'utf8')).riepilogo, B = JSON.parse(fs.readFileSync(fb, 'utf8')).riepilogo;
  const L = [];
  if (A.criteri !== B.criteri) L.push('ATTENZIONE: versione dei criteri diversa (' + A.criteri + ' contro ' + B.criteri + '): i numeri non sono del tutto confrontabili.');
  if (A.matrice !== B.matrice || A.profili !== B.profili) L.push('ATTENZIONE: matrice diversa (' + A.matrice + ' ' + A.profili + ' contro ' + B.matrice + ' ' + B.profili + '): confronta le percentuali, non i conteggi.');
  if (A.pesi !== B.pesi) L.push('ATTENZIONE: pesi diversi (' + A.pesi + ' contro ' + B.pesi + '): confronta la colonna "matrice".');
  const pa = (n) => (n / A.profili * 100), pb = (n) => (n / B.profili * 100);
  L.push('Prima: ' + A.commit + ' (' + A.data + ')  Dopo: ' + B.commit + ' (' + B.data + ')');
  L.push('Programmi con fallimenti gravi (sev >= 4): ' + pa(A.conGravi).toFixed(1) + '% -> ' + pb(B.conGravi).toFixed(1) + '% (pesata ' + A.gravi_pesata + '% -> ' + B.gravi_pesata + '%)');
  L.push('Programmi con almeno un fallimento: ' + pa(A.conFallimenti).toFixed(1) + '% -> ' + pb(B.conFallimenti).toFixed(1) + '%', '');
  L.push('Classe'.padEnd(40) + 'matrice prima'.padStart(14) + 'dopo'.padStart(8) + 'pesata prima'.padStart(14) + 'dopo'.padStart(8));
  const chiavi = [...new Set(Object.keys(A.classi).concat(Object.keys(B.classi)))].sort((x, y) => Math.abs(pb(B.classi[y] || 0) - pa(A.classi[y] || 0)) - Math.abs(pb(B.classi[x] || 0) - pa(A.classi[x] || 0)));
  chiavi.forEach(k => L.push(k.padEnd(40) + (pa(A.classi[k] || 0).toFixed(1) + '%').padStart(14) + (pb(B.classi[k] || 0).toFixed(1) + '%').padStart(8) + (((A.classi_pesata || {})[k] || 0).toFixed(1) + '%').padStart(14) + (((B.classi_pesata || {})[k] || 0).toFixed(1) + '%').padStart(8)));
  return L.join('\n');
}

/* =====================================================================================================
   AUTOTEST (--autotest): programmi costruiti a mano, per sapere che ogni criterio SA scattare (e non scatta a vuoto).
   Un criterio nuovo si aggiunge con la sua riga qui sotto: vedi la skill. Nomi senza emoji, come in js/dati/libreria-esercizi.js.
   ===================================================================================================== */
function fixture(nome, over, sedute, extra, attese, assenti) { return { nome, over, sedute, extra: extra || {}, attese: attese || [], assenti: assenti || [] }; }
const FASI12 = ['carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico', 'carico', 'carico', 'carico', 'scarico'];
const E = (n, sets, reps, rest, o) => Object.assign({ n, sets, reps, rest }, o || {});
const FIXTURES = [
  fixture('pre-affaticamento: pushdown prima della panca', {}, [['Lunedì', 'push', [E('Pushdown con Corda', 3, 12, 60), E('Panca Piana Bilanciere', 3, 8, 120)]]], {}, ['ORD-01'], ['ORD-02']),
  fixture('isolamento prima di un multiarticolare di altri muscoli', {}, [['Lunedì', 'lower', [E('Curl ai Cavi', 3, 12, 60), E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['ORD-02'], ['ORD-01']),
  fixture('dip su panca prima dello squat', {}, [['Lunedì', 'fullbody', [E('Dip su Panca', 3, 10, 90), E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['ORD-03']),
  fixture('core prima della panca', {}, [['Lunedì', 'upper', [E('Plank', 3, 45, 45), E('Panca Piana Bilanciere', 3, 8, 120)]]], {}, ['ORD-04']),
  fixture('superserie non antagonista', {}, [['Lunedì', 'lower', [E('Leg Extension', 3, 12, 60), E('Curl ai Cavi', 3, 12, 60, { superset: true })]]], {}, ['SS-01']),
  fixture('superserie con due fondamentali pesanti', {}, [['Lunedì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120), E('Rematore con Bilanciere', 3, 8, 120, { superset: true })]]], {}, ['SS-02'], ['SS-01']),
  fixture('due esercizi per lo stesso muscolo', {}, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 3, 8, 120), E('Chest Press Machine', 3, 10, 90)]]], {}, ['RID-01']),
  fixture('lo stesso esercizio in tre sedute', {}, [['Lunedì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120)]], ['Mercoledì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120)]], ['Venerdì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120)]]], {}, ['RID-02']),
  fixture('una serie sola e sette serie', {}, [['Lunedì', 'lower', [E('Leg Curl Seduto', 1, 12, 60), E('Leg Extension', 7, 12, 60)]]], {}, ['RX-03']),
  fixture('isolamento con meno ripetizioni del multiarticolare', {}, [['Lunedì', 'upper', [E('Panca Piana Bilanciere', 3, 12, 120), E('Curl ai Cavi', 3, 6, 60)]]], {}, ['RX-04']),
  fixture('ripetizioni e recupero fuori fascia (forza)', { goals: ['forza'] }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 4, 20, 30)]]], {}, ['RX-01', 'RX-02']),
  fixture('nessuno scarico', {}, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]]], { fasi: Array(12).fill('carico') }, ['DEL-01']),
  fixture('spalla dolente con il military press', { fastidi: ['spalle'] }, [['Lunedì', 'upper', [E('Military Press', 3, 8, 120)]]], {}, ['SAF-01', 'SAF-06']),
  fixture('schiena dolente con il front squat', { fastidi: ['schiena'] }, [['Lunedì', 'lower', [E('Front Squat', 3, 8, 120)]]], {}, ['SAF-01']),
  fixture('corpo libero con un bilanciere', { luogo: 'corpo' }, [['Lunedì', 'lower', [E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['SAF-03']),
  fixture('casa con manubri e la sbarra', { luogo: 'manubri' }, [['Lunedì', 'upper', [E('Trazioni alla Sbarra (Pull-ups)', 3, 8, 90)]]], {}, ['SAF-04'], ['SAF-03']),
  fixture('palestra senza macchine con una macchina', { attrezziPalestra: ['bilanciere', 'manubri', 'sbarra'] }, [['Lunedì', 'upper', [E('Chest Press Machine', 3, 10, 90)]]], {}, ['SAF-03']),
  fixture('principiante con stacco da terra', { level: 'principiante' }, [['Lunedì', 'fullbody', [E('Stacco da Terra (Deadlift)', 3, 8, 120)]]], {}, ['SAF-05']),
  fixture('principiante con un drop set', { level: 'principiante' }, [['Lunedì', 'fullbody', [E('Curl ai Cavi', 3, 12, 60, { tecnica: 'drop' })]]], {}, ['TEC-01']),
  fixture('tre giorni push, pull, legs', { days: 3 }, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 3, 8, 120)]], ['Mercoledì', 'pull', [E('Lat Machine', 3, 10, 90)]], ['Venerdì', 'legs', [E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['SPL-02', 'FRQ-01']),
  fixture('cinque giorni dichiarati, tre sedute', { days: 5 }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]], ['Mercoledì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]], ['Venerdì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['SPL-01']),
  fixture('esercizio doppio nella stessa seduta', {}, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120), E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['SAN-01']),
  fixture('seduta troppo lunga per 30 minuti', { minutes: 30 }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 4, 8, 150), E('Panca Piana Bilanciere', 4, 8, 150), E('Rematore con Bilanciere', 4, 8, 150), E('Military Press', 4, 8, 150), E('Stacco Rumeno', 4, 8, 150), E('Lat Machine', 4, 10, 90)]]], {}, ['DUR-01']),
  fixture('seduta troppo corta per 90 minuti', { minutes: 90 }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120), E('Panca Piana Bilanciere', 3, 8, 120)]]], {}, ['DUR-02', 'EXN-01']),
  fixture('dieci esercizi in una seduta', { minutes: 90 }, [['Lunedì', 'fullbody', ['Squat con Bilanciere', 'Panca Piana Bilanciere', 'Lat Machine', 'Military Press', 'Leg Curl Seduto', 'Curl ai Cavi', 'Pushdown con Corda', 'Alzate Laterali', 'Calf Raise in Piedi', 'Crunch al Cavo'].map(n => E(n, 2, 10, 60))]], {}, ['EXN-02']),
  fixture('quattordici serie di petto in una seduta', {}, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 5, 8, 120), E('Panca Inclinata Manubri', 5, 10, 90), E('Croci ai Cavi', 4, 12, 60)]]], {}, ['SES-01']),
  fixture('full body senza gambe', {}, [['Lunedì', 'fullbody', [E('Panca Piana Bilanciere', 3, 8, 120), E('Lat Machine', 3, 10, 90)]]], {}, ['SES-03']),
  fixture('petto pesante due giorni di fila', {}, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 5, 8, 120)]], ['Martedì', 'push', [E('Panca Inclinata Bilanciere', 5, 8, 120)]]], {}, ['REC-01']),
  fixture('sei giorni di fila', { days: 6 }, ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'].map(g => [g, 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]]), {}, ['REC-03']),
  fixture('stacchi pesanti due giorni di fila', {}, [['Lunedì', 'lower', [E('Stacco da Terra (Deadlift)', 3, 5, 180)]], ['Martedì', 'lower', [E('Stacco Sumo', 3, 5, 180)]]], {}, ['REC-02']),
  fixture('spinte molto piu delle tirate', {}, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 4, 8, 120), E('Military Press', 4, 8, 120), E('Panca Inclinata Manubri', 4, 10, 90)]], ['Giovedì', 'pull', [E('Lat Machine', 3, 10, 90)]]], {}, ['EQ-01']),
  fixture('forza senza lavoro pesante', { goals: ['forza'] }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 12, 150), E('Panca Piana Bilanciere', 3, 12, 150)]]], {}, ['GOA-01', 'RX-01']),
  fixture('avanzato con RIR 0 sul fondamentale', { level: 'avanzato' }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 6, 180)]]], { rirSett: [3, 2, 1, 4, 3, 2, 0, 4, 3, 2, 1, 4] }, ['RIR-02'], ['RIR-01']),
  fixture('intermedio senza andamento del RIR', { level: 'intermedio' }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['RIR-01']),
  fixture('quadricipiti e femorali sbilanciati, nessun leg curl', { days: 4 }, [['Lunedì', 'lower', [E('Squat con Bilanciere', 4, 8, 150), E('Leg Press', 4, 10, 120), E('Leg Extension', 3, 12, 60)]], ['Giovedì', 'lower', [E('Hack Squat', 4, 10, 120), E('Leg Extension', 3, 12, 60)]]], {}, ['EQ-03']),
  fixture('polpacci assenti nell ipertrofia', { days: 4 }, [['Lunedì', 'lower', [E('Squat con Bilanciere', 4, 8, 150)]], ['Giovedì', 'lower', [E('Leg Press', 4, 10, 120)]]], {}, ['MIS-01']),
  fixture('priorita senza serie in piu', { priorita: ['petto'] }, [['Lunedì', 'fullbody', [E('Panca Piana Bilanciere', 3, 8, 120)]]], { volSenzaPriorita: { petto: 3 } }, ['PRI-01']),
  fixture('volume di petto sotto il minimo', {}, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120), E('Panca Piana Bilanciere', 2, 8, 120)]], ['Mercoledì', 'fullbody', [E('Stacco Rumeno', 3, 8, 120), E('Panca Inclinata Manubri', 2, 10, 90)]], ['Venerdì', 'fullbody', [E('Leg Press', 3, 10, 120), E('Chest Press Machine', 2, 10, 90)]]], {}, ['VOL-01']),
  fixture('volume di petto sopra il massimo', { days: 4 }, [['Lunedì', 'push', [E('Panca Piana Bilanciere', 5, 8, 120), E('Panca Inclinata Manubri', 5, 10, 90)]], ['Martedì', 'upper', [E('Chest Press Machine', 5, 10, 90), E('Croci ai Cavi', 5, 12, 60)]], ['Giovedì', 'push', [E('Panca Declinata', 5, 10, 90), E('Piegamenti a Terra (Push-up)', 5, 15, 60)]]], {}, ['VOL-02']),
  fixture('nessun lavoro diretto per le braccia', { days: 4 }, [['Lunedì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120), E('Lat Machine', 3, 10, 90)]], ['Giovedì', 'upper', [E('Panca Inclinata Manubri', 3, 10, 90), E('Rematore con Bilanciere', 3, 8, 120)]]], {}, ['DIR-01']),
  fixture('polpacci in una sola seduta', { days: 4 }, [['Lunedì', 'lower', [E('Squat con Bilanciere', 4, 8, 150), E('Calf Raise in Piedi', 4, 15, 45), E('Calf Raise Seduto', 3, 15, 45)]], ['Giovedì', 'lower', [E('Leg Press', 4, 10, 120)]]], {}, ['FRQ-02']),
  fixture('tirate solo verticali', {}, [['Lunedì', 'upper', [E('Lat Machine', 4, 10, 90), E('Trazioni alla Sbarra (Pull-ups)', 4, 8, 120)]], ['Giovedì', 'upper', [E('Lat Machine Presa Inversa', 4, 10, 90)]]], {}, ['EQ-02']),
  fixture('nessun hinge in tre giorni', { days: 3 }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 150), E('Panca Piana Bilanciere', 3, 8, 120)]], ['Mercoledì', 'fullbody', [E('Leg Press', 3, 10, 120), E('Lat Machine', 3, 10, 90)]], ['Venerdì', 'fullbody', [E('Hack Squat', 3, 10, 120), E('Military Press', 3, 8, 120)]]], {}, ['PAT-01']),
  fixture('intermedio con isolamenti a RIR 0 dalla settimana 1', { level: 'intermedio' }, [['Lunedì', 'fullbody', [E('Squat con Bilanciere', 3, 8, 120)]]], {}, ['RIR-03']),
  fixture('panca col bilanciere con la spalla dolente (cautela)', { fastidi: ['spalle'] }, [['Lunedì', 'upper', [E('Panca Piana Bilanciere', 3, 8, 120)]]], {}, ['SAF-02']),
  fixture('programma ben fatto (controllo)', { days: 3, minutes: 60 }, [
    ['Lunedì', 'fullbody', [E('Squat con Bilanciere', 4, 8, 150), E('Panca Piana Bilanciere', 3, 8, 120), E('Rematore con Bilanciere', 3, 8, 120), E('Alzate Laterali', 2, 15, 60)]],
    ['Mercoledì', 'fullbody', [E('Stacco Rumeno', 3, 8, 120), E('Lat Machine', 3, 10, 90), E('Panca Inclinata Manubri', 3, 10, 90), E('Leg Curl Seduto', 3, 12, 60)]],
    ['Venerdì', 'fullbody', [E('Leg Press', 3, 10, 120), E('Military Press', 3, 8, 120), E('Pulley Basso', 3, 10, 90), E('Calf Raise in Piedi', 3, 15, 45)]]], {}, [], ['ORD-01', 'ORD-02', 'SS-01', 'SS-02', 'RID-01', 'RID-02', 'RX-03', 'SAN-01', 'DEL-01', 'SPL-01', 'SPL-02', 'SES-03', 'SAF-01', 'SAF-03', 'REC-03'])
];
function autotest() {
  let ok = 0, ko = 0;
  FIXTURES.forEach(f => {
    const p = profilo(['massa'], 'intermedio', 3, 60, 'palestra', [], 'M', ['adulto', 35], 'autotest');
    Object.assign(p, { freq: 'auto', parq: 'no', sonno: 'bene', priorita: [], fastidi: [], attrezziPalestra: null, psico: 'nessuno' }, f.over);
    const c = contesto(p);
    const prog = { sedute: f.sedute.map(([giorno, tipo, es]) => ({ giorno, tipo, titolo: tipo + ' ' + giorno, esercizi: es.map(e => ({ name: G.nomeInLibreria(e.n) || ('?' + e.n), sets: e.sets, reps: e.reps, rest: e.rest, weight: 0, superset: e.superset, tecnica: e.tecnica })) })),
      fasi: f.extra.fasi || FASI12, rirSett: f.extra.rirSett || null, settimane: 12, blocco: 4, scheme: { settimane: 12 }, split: { nome: 'prova', giorni: [] }, prefs: { luogo: p.luogo, fastidi: p.fastidi, attrezziPalestra: p.attrezziPalestra, graditi: [], odiati: [], priorita: p.priorita }, note: [], metodo: null };
    const a = valuta(p, c, prog, null, f.extra.volSenzaPriorita || null);
    const trovati = new Set(a.trovati.map(t => t.crit.id));
    const manca = f.attese.filter(x => !trovati.has(x)), troppi = f.assenti.filter(x => trovati.has(x));
    const nomiMancanti = f.sedute.reduce((t, x) => t.concat(x[2].map(e => e.n).filter(n => !G.nomeInLibreria(n))), []);
    const bene = !manca.length && !troppi.length && !nomiMancanti.length && !a.erroriCriteri.length;
    bene ? ok++ : ko++;
    console.log((bene ? '  ok   ' : '  MALE ') + f.nome + (manca.length ? '  [non scatta: ' + manca.join(', ') + ']' : '') + (troppi.length ? '  [scatta a torto: ' + troppi.join(', ') + ']' : '') + (nomiMancanti.length ? '  [esercizio non in libreria: ' + nomiMancanti.join(', ') + ']' : '') + (a.erroriCriteri.length ? '  [criteri in errore: ' + a.erroriCriteri.join(' | ') + ']' : ''));
  });
  const err = CRITERI[0].check({ errori: ['x'] });
  (err.length === 1 ? ok++ : ko++); console.log((err.length === 1 ? '  ok   ' : '  MALE ') + 'ERR-01 segnala un errore del generatore');
  const coperti = new Set(['ERR-01']); FIXTURES.forEach(f => f.attese.forEach(x => coperti.add(x)));
  const senza = CRITERI.filter(cr => !coperti.has(cr.id)).map(cr => cr.id);
  console.log('Autotest: ' + ok + ' ok, ' + ko + ' falliti. Criteri senza una prova che li faccia scattare: ' + (senza.join(', ') || 'nessuno'));
}

/* =====================================================================================================
   10. MAIN
   ===================================================================================================== */
function opzioni(argv) {
  const o = { matrice: 'standard', esempi: 3, top: 14, quiet: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i], v = () => argv[++i];
    if (a === '--out') o.out = v(); else if (a === '--matrice') o.matrice = v(); else if (a === '--etichetta') o.etichetta = v();
    else if (a === '--solo') o.solo = String(v()).split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
    else if (a === '--esempi') o.esempi = Number(v()) || 3; else if (a === '--top') o.top = Number(v()) || 14; else if (a === '--quiet') o.quiet = true;
    else if (a === '--autotest') o.autotest = true; else if (a === '--pesi') o.pesi = v(); else if (a === '--profilo') o.profilo = v(); else if (a === '--confronta') { o.confronta = [v(), v()]; }
    else if (a === '--help' || a === '-h') o.aiuto = true; else o.sconosciuta = a;
  }
  return o;
}
function dirUscita(o) {
  const base = o.out ? path.resolve(o.out) : path.join(process.env.COLLAUDO_OUT_DIR || process.env.CLAUDE_SCRATCHPAD_DIR || process.env.SCRATCHPAD_DIR || os.tmpdir(), 'collaudo-generatore');
  let md = /\.md$/i.test(base) ? base : path.join(base, 'collaudo-generatore' + (o.etichetta ? '-' + o.etichetta : '') + '.md');
  const dentroRepo = path.relative(R, md) && !path.relative(R, md).startsWith('..');
  if (dentroRepo) { const alt = path.join(os.tmpdir(), 'collaudo-generatore', path.basename(md)); process.stderr.write('Il report non va nel repo (' + md + '): lo scrivo in ' + alt + '\n'); md = alt; }
  return { md, json: md.replace(/\.md$/i, '.json') };
}
function stampaRiepilogo(ris, meta, file) {
  const L = [];
  L.push('=== Collaudo del generatore (criteri v' + VERSIONE_CRITERI + ', commit ' + meta.commit + ') ===');
  L.push('Matrice ' + meta.matrice + ': ' + ris.tot.profili + ' profili in ' + ris.tot.secondi.toFixed(1) + ' s | in errore: ' + ris.tot.errori + ' | con metodo famoso: ' + ris.tot.conMetodo);
  L.push('Programmi con fallimenti: ' + ris.tot.conFallimenti + ' (' + (ris.tot.conFallimenti / ris.tot.profili * 100).toFixed(1) + '%), gravi (sev >= 4): ' + ris.tot.conGravi + ' (' + (ris.tot.conGravi / ris.tot.profili * 100).toFixed(1) + '% matrice, ' + ((ris.tot.pesoGravi || 0) / ris.tot.pesoTotale * 100).toFixed(1) + '% pesata)');
  L.push('Prime 12 classi per impatto (sev, programmi colpiti, % matrice / % pesata):');
  ris.elenco.slice(0, 12).forEach((cl, i) => L.push(('  ' + (i + 1)).slice(-3) + '. ' + (cl.codice + (cl.sub ? ':' + cl.sub : '')).padEnd(26) + ' sev ' + cl.sev + '  ' + String(cl.n).padStart(6) + ' (' + cl.pct.toFixed(1).padStart(5) + '% / ' + cl.pctPesata.toFixed(1).padStart(5) + '%)  ' + cl.nome.slice(0, 56)));
  const ec = Object.keys(ris.tot.erroriCriteri || {});
  if (ec.length) L.push('ATTENZIONE: criteri andati in errore (bug del collaudo): ' + ec.join(' | '));
  if (file) L.push('Report: ' + file.md, 'Dati:   ' + file.json);
  console.log(L.join('\n'));
}

function main() {
  const o = opzioni(process.argv.slice(2));
  if (o.aiuto || o.sconosciuta) { console.log((o.sconosciuta ? 'Opzione sconosciuta: ' + o.sconosciuta + '\n' : '') + fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 17).join('\n')); return; }
  if (o.confronta) { console.log(confronta(o.confronta[0], o.confronta[1])); return; }
  PESI_UNIFORMI = o.pesi === 'uniformi';
  ENV = creaAmbiente(); G = new Proxy({}, { get: (t, k) => { if (!(k in t)) t[k] = ENV.g(String(k)); return t[k]; } });
  if (!o.quiet && ENV.erroriCaricamento.length) process.stderr.write('Avviso: errori nel caricamento degli script: ' + ENV.erroriCaricamento.join(' | ') + '\n');
  if (o.autotest) { autotest(); return; }
  if (o.profilo) {
    /* campi di buildProgram (goals, level, days, minutes, luogo, fastidi, sex, age, sonno, attrezzi, freq, parq, priorita, psico, attrezziPalestra, seme); le dimensioni minori non dette restano neutre */
    const IT = { obiettivi: 'goals', livello: 'level', giorni: 'days', minuti: 'minutes', sesso: 'sex', eta: 'age', frequenza: 'freq', goal: 'goals' };
    const base = {}; const grezzo = JSON.parse(o.profilo);
    Object.keys(grezzo).forEach(k => { base[IT[k] || k] = k === 'goal' ? [grezzo[k]] : grezzo[k]; });
    const eta = Number(base.age) || 30;
    const p = profilo(base.goals || ['massa'], base.level || 'intermedio', base.days || 3, base.minutes || 60, base.luogo || 'palestra', base.fastidi || [], base.sex || 'M', [eta >= 65 ? 'senior' : (eta < 35 ? 'giovane' : 'adulto'), eta], 'singolo');
    Object.assign(p, { freq: 'auto', parq: 'no', sonno: 'bene', attrezzi: 'indifferente', priorita: [], attrezziPalestra: null, psico: 'nessuno', seme: 'profilo' }, base);
    const a = analizza(p, o.solo);
    console.log(profiloCompatto(p));
    if (a.prog) console.log('\n' + tabellaSettimana(a.m));
    console.log('\nFallimenti (' + a.trovati.length + '):');
    a.trovati.forEach(t => console.log('  ' + t.crit.id + (t.f.sub ? ':' + t.f.sub : '') + ' [sev ' + (t.f.sev || t.crit.sev) + '] ' + t.f.msg));
    return;
  }
  const profili = matrice(o.matrice);
  const descr = { standard: 'prodotto di obiettivo x livello x giorni x minuti x luogo x fastidi, sesso ed eta assegnati in modo fisso e ripetibile', completa: 'prodotto pieno di obiettivo x livello x giorni x minuti x luogo x fastidi x sesso x fascia di eta', rapida: 'un profilo ogni sei della matrice standard' }[o.matrice] || o.matrice;
  const meta = { data: new Date().toISOString().slice(0, 10), commit: gitInfo(), matrice: o.matrice, descrizioneMatrice: descr, etichetta: o.etichetta || '', scriptCaricati: ENV.scriptCaricati, erroriCaricamento: ENV.erroriCaricamento };
  const esec = eseguiMatrice(profili, o);
  const ris = costruisciRisultato(profili, esec, o);
  const verifiche = verificheModello(ris);
  const file = dirUscita(o);
  fs.mkdirSync(path.dirname(file.md), { recursive: true });
  fs.writeFileSync(file.md, mdReport(profili, ris, o, meta, verifiche));
  const json = { meta, riepilogo: riepilogoCompatto(ris, meta), totali: ris.tot, perDimensione: ris.dimensioni, classi: ris.elenco.map((cl, i) => ({ rango: i + 1, chiave: cl.chiave, codice: cl.codice, sub: cl.sub, nome: cl.nome, sev: cl.sev, forza: cl.forza, fonte: cl.fonte, dove: cl.dove, programmiColpiti: cl.n, percentuale: Number(cl.pct.toFixed(2)), percentualePesata: Number(cl.pctPesata.toFixed(2)), occorrenze: cl.occorrenze, impatto: Number(cl.impatto.toFixed(2)), perDimensione: cl.perDim, piuFrequenti: Object.keys(cl.tags || {}).sort((a, b) => cl.tags[b] - cl.tags[a]).slice(0, 8).map(k => [k, cl.tags[k]]),
    esempi: i < o.top ? sceglieEsempi(cl, o.esempi).map(e => ({ profilo: e.profilo, metodo: e.metodo, cosaNonVa: e.msg, settimana: e.tabella })) : undefined })),
    criteri: CRITERI.map(c => ({ id: c.id, nome: c.nome, sev: c.sev, forza: c.forza, fonte: c.fonte, dove: c.dove })), verificheModello: verifiche, coperturaLibreria: ris.copertura };
  fs.writeFileSync(file.json, JSON.stringify(json, null, 1));
  if (!o.quiet || true) stampaRiepilogo(ris, meta, file);
}
try { main(); } catch (e) { console.error('Collaudo interrotto: ' + (e && e.stack || e)); }
process.exitCode = 0;
