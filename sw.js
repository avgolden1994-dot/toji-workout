/* Service worker: rende l'app utilizzabile anche senza connessione (in palestra
   il segnale spesso manca). Strategia: network-first con fallback alla cache,
   così vedi sempre l'ultima versione se sei online, ma l'app parte comunque offline. */

const CACHE_NAME = '3in-v10';   /* cambiando il nome, le copie vecchie vengono buttate */
const ASSETS = [
  './',
  /* Elenco generato da tools/genera-sw.js (npm run sw): non si modifica a mano.
     Comprende pagina, fogli di stile, script, icone e disegni degli esercizi. */
  /*INIZIO-ASSET*/
  './index.html',
  './manifest.json',
  './favicon-32.png',
  './icon-192.png',
  './icon-512.png',
  './css/base.css',
  './css/shell.css',
  './css/calendario.css',
  './css/componenti-coach.css',
  './css/oggi-e-lettore.css',
  './css/piano.css',
  './css/scheda-esercizio.css',
  './css/impostazioni.css',
  './css/onboarding.css',
  './css/componenti.css',
  './css/figura-e-gruppi.css',
  './css/allenamento.css',
  './css/navigazione-e-fire.css',
  './js/lingue/en.js',
  './js/lingue/es.js',
  './js/lingue/de.js',
  './js/lingue/traduttore.js',
  './js/lingue/avvio-traduttore.js',
  './js/core/service-worker.js',
  './js/core/ripristino-guida.js',
  './js/core/costanti.js',
  './js/dati/schede-pronte.js',
  './js/dati/libreria-esercizi.js',
  './js/dati/schede-epoca-oro.js',
  './js/dati/dettagli-esercizi.js',
  './js/coach/parametri.js',
  './js/coach/catalogo-regole.js',
  './js/coach/suggeritore.js',
  './js/core/stato-condiviso.js',
  './js/core/storage.js',
  './js/ui/piano/schede-pronte.js',
  './js/core/modalita.js',
  './js/core/navigazione.js',
  './js/ui/oggi.js',
  './js/core/utility.js',
  './js/core/audio-silenzioso.js',
  './js/core/musica-altre-app.js',
  './js/ui/piano/giorno.js',
  './js/ui/piano/aggiungi-allenamento.js',
  './js/ui/piano/selezione-multipla.js',
  './js/ui/allenamento/seduta.js',
  './js/ui/allenamento/macchinario-occupato.js',
  './js/ui/allenamento/sessione.js',
  './js/ui/allenamento/timer-recupero.js',
  './js/core/nativo.js',
  './js/ui/allenamento/timer-pannello.js',
  './js/ui/allenamento/cedimento-canzone.js',
  './js/ui/musica/lettore-fisso.js',
  './js/ui/allenamento/cedimento.js',
  './js/ui/musica/mp3-locale.js',
  './js/ui/musica/player-web.js',
  './js/ui/gesti.js',
  './js/ui/annulla.js',
  './js/ui/riposo-settimane.js',
  './js/ui/gruppi-muscolari.js',
  './js/ui/elenco-esercizi.js',
  './js/ui/figura-anatomica.js',
  './js/coach/pannello.js',
  './js/ui/allenamento/termina-e-cardio.js',
  './js/ui/storico.js',
  './js/ui/onboarding.js',
  './js/coach/bia/lettore.js',
  './js/coach/programma/motore.js',
  './js/coach/programma/schemi.js',
  './js/coach/programma/ricette.js',
  './js/coach/programma/struttura-pro.js',
  './js/ui/onboarding-risultato.js',
  './js/coach/programma/archivio.js',
  './js/coach/programma/alternative.js',
  './js/ui/statistiche.js',
  './js/ui/statistiche-grafico.js',
  './js/coach/carichi/progressivo.js',
  './js/coach/carichi/partenza.js',
  './js/coach/questionario-decisioni.js',
  './js/coach/prontezza.js',
  './js/coach/mi-sento-male.js',
  './js/coach/repertorio.js',
  './js/coach/dolore-mattina.js',
  './js/coach/regole-ricerca.js',
  './js/coach/regole-nuove.js',
  './js/coach/intensita.js',
  './js/coach/agente-consigli.js',
  './js/coach/bia/opzioni.js',
  './js/core/consenso.js',
  './js/ui/guida-interattiva.js',
  './js/ui/opzioni/impostazioni.js',
  './js/ui/opzioni/stile-iphone.js',
  './js/ui/opzioni/il-coach.js',
  './js/ui/fogli.js',
  './js/core/schermo-acceso.js',
  './js/core/backup.js',
  './js/ui/importa-csv.js',
  './js/ui/importa-progressi.js',
  './js/ui/seduta-libera.js',
  './js/ui/lavoro-cronometro.js',
  './js/ui/progressi/riepilogo.js',
  './js/ui/progressi/pagine.js',
  './js/ui/progressi/foto.js',
  './js/ui/progressi/peso.js',
  './js/ui/stampa-scheda.js',
  './js/coach/metodi-momenti.js',
  './js/coach/metodi-epoca-oro.js',
  './js/coach/compone.js',
  './js/coach/stato.js',
  './js/coach/biomeccanica.js',
  './js/coach/esigenza.js',
  './js/coach/psicologia.js',
  './js/ui/schede-esercizio.js',
  './js/dati/disegni-esercizi.js',
  './js/ui/scheda-quattro-sezioni.js',
  './js/dati/schede-tecniche.js',
  './js/dati/schede-varianti.js',
  './js/dati/scheda-unica.js',
  './js/ui/calendario/mese.js',
  './js/ui/calendario/gruppi.js',
  './js/ui/calendario/scambio.js',
  './js/ui/calendario/copia-settimana.js',
  './js/ui/menu-settimana.js',
  './js/ui/sessione-completata.js',
  './js/coach/coach-ia.js',
  './js/ui/esporta-ics.js',
  './js/avvio.js',
  './esercizi/ex-01-panca-piana.svg',
  './esercizi/ex-02-panca-inclinata-su-a.svg',
  './esercizi/ex-02-panca-inclinata.svg',
  './esercizi/ex-03-panca-inclinata-manubri.svg',
  './esercizi/ex-04-panca-declinata.svg',
  './esercizi/ex-05-chest-press.svg',
  './esercizi/ex-06-dip-parallele.svg',
  './esercizi/ex-07-push-up.svg',
  './esercizi/ex-08-croci-cavi.svg',
  './esercizi/ex-09-croci-panca-manubri.svg',
  './esercizi/ex-10-pectoral-machine.svg',
  './esercizi/ex-11-pullover-manubrio.svg',
  './esercizi/ex-12-stacco-da-terra.svg',
  './esercizi/ex-13-trazioni-sbarra.svg',
  './esercizi/ex-14-trazioni-presa-inversa.svg',
  './esercizi/ex-15-lat-machine.svg',
  './esercizi/ex-16-lat-machine-presa-inversa.svg',
  './esercizi/ex-17-rematore-bilanciere.svg',
  './esercizi/ex-18-rematore-manubrio.svg',
  './esercizi/ex-19-t-bar-row.svg',
  './esercizi/ex-20-pulley-basso.svg',
  './esercizi/ex-21-pullover-ai-cavi.svg',
  './esercizi/ex-22-hyperextension-lombari.svg',
  './esercizi/ex-23-squat-bilanciere.svg',
  './esercizi/ex-24-front-squat.svg',
  './esercizi/ex-25-goblet-squat.svg',
  './esercizi/ex-26-hack-squat.svg',
  './esercizi/ex-27-leg-press.svg',
  './esercizi/ex-28-affondi-manubri.svg',
  './esercizi/ex-30-step-up-su-panca.svg',
  './esercizi/ex-31-leg-extension.svg',
  './esercizi/ex-32-leg-curl-sdraiato.svg',
  './esercizi/ex-33-leg-curl-seduto.svg',
  './esercizi/ex-34-calf-raise-in-piedi.svg',
  './esercizi/ex-35-calf-raise-seduto.svg',
  './esercizi/ex-36-hip-thrust.svg',
  './esercizi/ex-37-stacco-rumeno.svg',
  './esercizi/ex-38-stacco-sumo.svg',
  './esercizi/ex-39-affondi-bulgari.svg',
  './esercizi/ex-40-good-morning.svg',
  /*FINE-ASSET*/

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      /* uno per uno: se manca un file (es. un disegno non ancora caricato)
         gli altri vengono salvati lo stesso; addAll fallirebbe in blocco */
      .then((cache) => Promise.allSettled(ASSETS.map((u) => cache.add(u))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()) /* se un asset manca, non bloccare l'installazione */
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  /* Solo richieste GET della nostra origine: YouTube/Spotify devono passare
     direttamente alla rete senza intermediazioni. */
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  /* Pagina e manifest si chiedono SEMPRE nuovi, saltando anche la memoria
     del browser: GitHub Pages dice di tenerli fino a 10 minuti, e su
     iPhone l app sulla schermata Home poteva mostrare la versione vecchia. */
  const path = new URL(req.url).pathname;
  const sempreNuovo = req.mode === 'navigate' || /\.(html|json|js)$/i.test(path) || path.endsWith('/');

  event.respondWith(
    fetch(req, sempreNuovo ? { cache: 'no-store' } : undefined)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((cached) => {
        if (cached) return cached;
        /* un disegno mancante non deve far vedere la pagina al suo posto:
           meglio un 404 pulito, cosi il riquadro mostra il segnaposto */
        if (/\.(png|jpg|jpeg|webp|svg)$/i.test(new URL(req.url).pathname)) {
          return new Response('', { status: 404 });
        }
        return caches.match('./index.html');
      }))
  );
});
