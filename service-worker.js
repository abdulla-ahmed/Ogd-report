const CACHE_NAME = 'HK-OGD-v1';
const ASSETS_TO_CACHE = [
  '/Ogd-report/',
  '/Ogd-report/index.html',
  '/Ogd-report/app.js',
  '/Ogd-report/Kawaz heart.json', // Animation file
  '/Ogd-report/images/icon-192x192.png',
  '/Ogd-report/images/icon-512x512.png'
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback behavior if both cache and network fail
        return caches.match('/offline.html'); // Serve an offline page
      });
    })
  );
});
