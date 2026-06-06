const CACHE_NAME = "finance-tools-ro-v1";

const URLS_TO_CACHE = [
  "/Financetools/",
  "/Financetools/index.html",
  "/Financetools/style.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
