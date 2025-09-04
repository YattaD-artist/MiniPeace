const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  "/",              // trang chính
  "/index.html",    // file html
  "/styles.css",    // css
  "/script.js",     // js
  "/icons192.png",
  "/icons512.png"
];

// Cài đặt service worker và cache file
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Load từ cache trước, nếu không có thì fetch từ server
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Cập nhật service worker khi có version mới
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
