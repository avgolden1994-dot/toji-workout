/* Service worker: rende l'app utilizzabile anche senza connessione (in palestra
   il segnale spesso manca). Strategia: network-first con fallback alla cache,
   così vedi sempre l'ultima versione se sei online, ma l'app parte comunque offline. */

const CACHE_NAME = 'toji-workout-v3';   /* cambiando il nome, le copie vecchie vengono buttate */
const ASSETS = [
  './',
  './toji.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  /* illustrazioni degli esercizi: salvate subito, cosi in palestra si
     vedono anche senza connessione. Ogni nuovo disegno va aggiunto qui. */
  './esercizi/ex-01-panca-piana.svg',
  './esercizi/ex-02-panca-inclinata-su-a.svg'
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
        return caches.match('./toji.html');
      }))
  );
});
