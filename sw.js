/* Service worker: rende l'app utilizzabile anche senza connessione (in palestra
   il segnale spesso manca). Strategia: network-first con fallback alla cache,
   così vedi sempre l'ultima versione se sei online, ma l'app parte comunque offline. */

const CACHE_NAME = 'toji-workout-v1';
const ASSETS = [
  './',
  './toji.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
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

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('./toji.html')))
  );
});
