const CACHE_VERSION = 'v4';  // ← ここを更新するとスマホが強制的に最新を取得
const CACHE_NAME = `oysterapp-cache-${CACHE_VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './ritou-app.html',
        './manifest.json',
        './service-worker.js',
        './img/icon-192.png',
        './img/icon-512.png'
      ]);
    })
  );
  self.skipWaiting(); // ← 新しいSWを即時有効化
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // ← 古いキャッシュを自動削除
          }
        })
      )
    )
  );
  self.clients.claim(); // ← 新しいSWを即時反映
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
