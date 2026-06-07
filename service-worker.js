const CACHE_NAME = "finance-tools-ro-v2026-constellation-02";

const URLS_TO_CACHE = [
  "/Financetools/",
  "/Financetools/index.html",
  "/Financetools/style.css",
  "/Financetools/calculatoare.html",
  "/Financetools/articole.html",
  "/Financetools/categorii.html",
  "/Financetools/despre.html",
  "/Financetools/contact.html",
  "/Financetools/icons/constellation-logo.svg",
  "/Financetools/icons/icon-192.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
