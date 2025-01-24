const CACHE_NAME = 'MusicPlayer';
const urlsToCache = [
  '/MusicPlayer',
  '/MusicPlayer/index.html',
  '/styles.css',
  '/icon192.png',
  '/icon500.png',
  '/js/app.js',
  '/js/player.js',
  '/js/playlist.js',
  '/js/ui.js',
  '/manifest.json',
  '/404.html'  // Add the fallback page to the cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return the cached response
        }
        return fetch(event.request).catch(() => {
          return caches.match('/404.html').then(response => {
            return response || new Response('Page not found', {
              status: 404,
              statusText: 'Page not found'
            });
          });
        });
      }).catch(error => {
        return caches.match('/404.html').then(response => {
          const clonedResponse = response.clone();
          clonedResponse.text().then((text) => {
            const errorMessage = `Failed to fetch: ${event.request.url}`;
            const errorScript = `<script>
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                  if (registration.active) {
                    registration.active.postMessage({ type: 'errorDetails', message: '${errorMessage}' });
                  }
                });
              }
            </script>`;
            const modifiedText = text.replace('</body>', `${errorScript}</body>`);
            return new Response(modifiedText, {
              headers: { 'Content-Type': 'text/html' }
            });
          });
          return response;
        });
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
