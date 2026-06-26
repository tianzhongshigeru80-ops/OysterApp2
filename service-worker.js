self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('oyster-cache').then((cache) => {
      return cache.addAll([
        'ritou-app.html',
        'manifest.json',
        'img/wood_texture.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
