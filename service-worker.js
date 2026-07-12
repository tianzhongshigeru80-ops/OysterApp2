const CACHE_VERSION = 'v10';  // ← ここを更新するとスマホが強制的に最新を取得
const CACHE_NAME = `oysterapp-cache-${CACHE_VERSION}`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './ritou-app.html',
        './style.css',
        './script.js',
               './img/Copilot_20260610_171521.png',
'./img/Copilot_20260610_170705.png'
      ]);
    })
  );
  self.skipWaiting(); // 新しいSWを即座に有効化
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 古いキャッシュを削除
          }
        })
      );
    })
  );
  self.clients.claim(); // すぐに新しいSWを使わせる
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
