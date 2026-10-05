/* Schede esercizio: spiegazione e video
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SCHEDE ESERCIZIO: spiegazione semplice e video
   (i disegni sono in esercizi/*.svg, vedi js/dati/disegni-esercizi.js).
   Ogni esercizio e'
   ricondotto al suo SCHEMA DI MOVIMENTO, perche' venti esercizi di spinta
   si spiegano con le stesse tre regole.
   ============================================================ */

const PATTERN_INFO = {
  squat: { nome: 'Accosciata', complesso: true,
    come: ['Piedi larghi come le spalle, punte leggermente in fuori.',
           'Scendi mandando il sedere indietro e in basso, come per sederti.',
           'Le ginocchia seguono la direzione delle punte dei piedi.',
           'Risali spingendo con tutto il piede, non solo con le punte.'],
    errori: ['Ginocchia che cadono verso l interno.', 'Talloni che si staccano da terra.', 'Schiena che si arrotonda in fondo.'] },
  hinge: { nome: 'Piegamento dell’anca', complesso: true,
    come: ['Il movimento parte dall anca, non dalla schiena: il sedere va indietro.',
           'La schiena resta dritta come un asse, dall inizio alla fine.',
           'Il bilanciere sfiora le gambe per tutta la salita.',
           'Arrivato in piedi stringi i glutei, senza inarcarti all indietro.'],
    errori: ['Schiena curva: e l errore che fa male.', 'Bilanciere lontano dalle gambe.', 'Partire strappando invece di spingere.'] },
  pushH: { nome: 'Spinta orizzontale', complesso: true,
    come: ['Sdraiato, avvicina le scapole tra loro e abbassa le spalle.',
           'Scendi controllando fino a sfiorare il petto.',
           'Spingi verso l alto senza staccare la schiena dalla panca.'],
    errori: ['Spalle che salgono verso le orecchie.', 'Rimbalzare il bilanciere sul petto.', 'Gomiti spalancati a 90 gradi.'] },
  pushV: { nome: 'Spinta sopra la testa', complesso: true,
    come: ['In piedi, piedi saldi e addome contratto.',
           'Spingi verso l alto tenendo il bilanciere vicino al viso.',
           'A braccia tese la testa passa leggermente avanti.'],
    errori: ['Inarcare la schiena per spingere di piu.', 'Spingere in avanti invece che in alto.'] },
  pullV: { nome: 'Trazione verticale', complesso: true,
    come: ['Appeso, spalle basse e lontane dalle orecchie.',
           'Tira portando i gomiti verso il basso e il petto verso la sbarra.',
           'Scendi controllando, senza lasciarti cadere.'],
    errori: ['Dondolare con le gambe per aiutarsi.', 'Fare mezze ripetizioni.', 'Tirare solo con le braccia.'] },
  pullH: { nome: 'Trazione orizzontale', complesso: true,
    come: ['Busto inclinato in avanti, schiena dritta.',
           'Tira verso l ombelico portando i gomiti indietro.',
           'Stringi le scapole in fondo al movimento.'],
    errori: ['Alzare il busto a ogni tirata.', 'Schiena arrotondata.', 'Usare lo slancio invece dei muscoli.'] },
  lunge: { nome: 'Affondo', complesso: false,
    come: ['Un passo avanti, busto eretto.',
           'Scendi finche il ginocchio dietro sfiora quasi terra.',
           'Risali spingendo con il tallone della gamba davanti.'],
    errori: ['Ginocchio davanti che cede verso l interno.', 'Busto che crolla in avanti.'] },
  hip: { nome: 'Spinta dell’anca', complesso: false,
    come: ['Schiena appoggiata a una panca, piedi ben piantati.',
           'Spingi il bacino verso l alto stringendo i glutei.',
           'In cima corpo dritto dalle ginocchia alle spalle.'],
    errori: ['Inarcare la schiena invece di stringere i glutei.', 'Spingere con le punte dei piedi.'] },
  curl: { nome: 'Flessione del gomito', complesso: false,
    come: ['Gomiti fermi vicino ai fianchi.', 'Sali piegando solo l avambraccio.', 'Scendi lentamente fino quasi a braccia tese.'],
    errori: ['Dondolare con la schiena.', 'Gomiti che scappano in avanti.'] },
  ext: { nome: 'Estensione del gomito', complesso: false,
    come: ['Gomiti fermi e stretti.', 'Estendi il braccio fino in fondo.', 'Torna controllando.'],
    errori: ['Allargare i gomiti.', 'Muovere le spalle al posto delle braccia.'] },
  raise: { nome: 'Alzata', complesso: false,
    come: ['Braccia quasi tese, gomito appena morbido.', 'Sali fino all altezza delle spalle, non oltre.', 'Scendi lentamente.'],
    errori: ['Usare pesi troppo alti e slanciare.', 'Alzare le spalle verso le orecchie.'] },
  coreStatic: { nome: 'Tenuta del core', complesso: false,
    come: ['Corpo dritto come un asse, dalla testa ai talloni.', 'Addome e glutei contratti.', 'Respira normalmente, non trattenere.'],
    errori: ['Sedere troppo alto o troppo basso.', 'Trattenere il respiro.'] },
  coreFlex: { nome: 'Flessione del busto', complesso: false,
    come: ['Muovi solo la parte alta o le gambe, senza strappi.', 'Espira mentre chiudi.', 'Torna lentamente.'],
    errori: ['Tirarsi con le mani dietro il collo.', 'Usare lo slancio.'] },
  calf: { nome: 'Polpacci', complesso: false,
    come: ['Sali sulle punte il piu in alto possibile.', 'Fermati un attimo in cima.', 'Scendi lentamente sotto il livello del gradino.'],
    errori: ['Rimbalzare senza controllo.', 'Fare mezze ripetizioni.'] },
  machine: { nome: 'Macchinario', complesso: false,
    come: ['Regola il sedile prima di iniziare.', 'Muovi solo l articolazione interessata.', 'Non lasciare cadere il peso a fine ripetizione.'],
    errori: ['Sedile regolato male.', 'Carico troppo alto e movimento a scatti.'] }
};

/* Ogni esercizio della libreria ricondotto al suo schema */
const PATTERN_RULES = [
  [/leg press|leg extension|leg curl|hack squat|pectoral|chest press|shoulder press|abductor|adductor|lat machine|pulley|pushdown|croci ai cavi|crunch al cavo|kickback ai cavi|curl ai cavi|dip alla macchina/i, 'machine'],
  [/squat|goblet/i, 'squat'],
  [/stacco|good morning/i, 'hinge'],
  [/panca|piegamenti|dip|croci|pullover/i, 'pushH'],
  [/military|lento avanti|arnold|tirate al mento|pike/i, 'pushV'],
  [/trazioni|chin/i, 'pullV'],
  [/rematore|t-bar|hyperextension/i, 'pullH'],
  [/affondi|step-up/i, 'lunge'],
  [/hip thrust|ponte glutei|slanci/i, 'hip'],
  [/curl/i, 'curl'],
  [/french press|panca presa stretta|dip su panca|kickback/i, 'ext'],
  [/alzate|face pull|scrollate/i, 'raise'],
  [/plank|hollow/i, 'coreStatic'],
  [/crunch|leg raise|russian|mountain|ab wheel|woodchop|sit-up/i, 'coreFlex'],
  [/calf/i, 'calf']
];

window.patternFor = function(name) {
  const n = String(name).replace(EMOJI_TESTA, '');
  for (let i = 0; i < PATTERN_RULES.length; i++) {
    if (PATTERN_RULES[i][0].test(n)) return PATTERN_RULES[i][1];
  }
  return 'machine';
};

/* Fonti video verificate durante la ricerca, in italiano.
   NOTA ONESTA mostrata anche all utente: non posso guardare i video, quindi
   per i singoli esercizi apro una RICERCA su YouTube (sempre aggiornata e
   mai un link morto) e segnalo a parte le fonti che ho verificato. */
const VIDEO_VERIFICATI = {
  '\u{1F3F9} Stacco da Terra (Deadlift)': 'https://www.youtube.com/watch?v=xPs2VFWDWTI'
};
const VIDEO_PLAYLIST = 'https://www.youtube.com/playlist?list=PLP3v68UxbrjAchVp8RRso71h5Dx9LBOH5';

/* La ricerca porta il nome nella lingua dell app, il nome inglese (e quello con piu video) e, se l esercizio ha un
   attacco o una presa (il cavo con triangolo, barra o corda non e lo stesso esercizio), anche quelli. */
window.testoRicercaVideo = function(name) {
  const pulito = String(name).replace(EMOJI_TESTA, '');
  const d = typeof dettaglioEsercizio === 'function' ? dettaglioEsercizio(name) : null;
  const l = typeof lingua === 'function' ? lingua() : 'it';
  const nome = l === 'it' ? pulito : String(window.tr(pulito));
  const en = (window.I18N && I18N.en && I18N.en[pulito]) || '';
  const parole = { it: 'tecnica esecuzione', en: 'proper form tutorial', es: 'técnica ejecución', de: 'Technik Ausführung' };
  const att = d ? [d.att, d.attacco].filter(Boolean).map(x => l === 'it' ? x : String(window.tr(x))) : [];
  const q = [nome].concat(en && en !== nome ? [en] : [], att, [parole[l] || parole.en]).join(' ');
  return q.replace(/[(),·]/g, ' ').replace(/\s+/g, ' ').trim();
};
window.videoLinkFor = function(name) {
  if (VIDEO_VERIFICATI[name]) return VIDEO_VERIFICATI[name];
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(testoRicercaVideo(name));
};
