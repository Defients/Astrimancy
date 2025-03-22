// This file should be placed in the public folder
// Simplified Service Worker for Astrimancy

const CACHE_NAME = "astrimancy-cache-v1";
const CACHE_URLS = [
  "/",
  "/index.html",
  "/static/js/main.js",
  "/static/css/main.css",
  "/styles/styles.css",
  "/styles/main.css",
  "/manifest.json",
  "/favicon.ico",
];

// Improved URL filtering
function shouldCacheRequest(request) {
  try {
    const url = new URL(request.url);

    // Explicitly ignore problematic schemes and URLs
    const ignoredSchemes = ["chrome-extension:", "moz-extension:", "file:"];
    const ignoredPatterns = [
      "extension",
      "devtools",
      "_debugger",
      "/__webpack_dev_server__",
      "/sockjs-node/",
      "/ws", // WebSocket connections
    ];

    // Check scheme
    if (ignoredSchemes.some((scheme) => url.protocol === scheme)) {
      return false;
    }

    // Check URL patterns
    if (ignoredPatterns.some((pattern) => url.href.includes(pattern))) {
      return false;
    }

    // Only cache http(s) requests
    return url.protocol.startsWith("http");
  } catch (error) {
    // If URL parsing fails, don't cache
    console.warn("Failed to parse URL for caching:", request.url, error);
    return false;
  }
}

// Install event - cache static assets
self.addEventListener("install", (event) => {
  // Skip waiting to activate this service worker immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      // Filter out unsupported URLs
      const cachableUrls = CACHE_URLS.filter(
        (url) =>
          !url.startsWith("chrome-extension:") && !url.includes("extension")
      );
      return cache.addAll(cachableUrls).catch((error) => {
        console.warn("Some resources failed to cache:", error);
        return cache.add("/");
      });
    })
  );
});

// Fetch event - network-first strategy with improved URL filtering
self.addEventListener("fetch", (event) => {
  // Ignore non-cacheable requests
  if (!shouldCacheRequest(event.request)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache successful HTTP responses
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => {
              try {
                // Use request URL instead of original request
                cache.put(event.request.url, responseToCache);
              } catch (error) {
                console.warn("Caching failed:", error);
              }
            })
            .catch((error) => {
              console.warn("Cache open failed:", error);
            });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // If no cache match, return a basic offline page
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          // Return a simple response for non-HTML requests
          return new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        });
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener("activate", (event) => {
  // Claim clients to control all active browser windows/tabs
  event.waitUntil(self.clients.claim());

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

// Improved error logging
self.addEventListener("error", (event) => {
  console.error("Service Worker Error:", event);
});
