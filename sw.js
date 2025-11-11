// sw.js – version ultra-simple
const CACHE = 'v1';

self.addEventListener('install', evt => {
  console.log('[SW] Install');
  evt.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(['/']))   // seule la racine
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  console.log('[SW] Activate');
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  // stratégie « cache-first » ultra-basique
  evt.respondWith(
    caches.match(evt.request)
          .then(resp => resp || fetch(evt.request))
  );
});