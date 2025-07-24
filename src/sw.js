// src/sw.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

console.log("[SW] Service worker loaded. Using Workbox strategies.");

// Let the PWA kit handle its own manifest files.
precacheAndRoute(self.__WB_MANIFEST);

// --- Caching Strategies ---
const staticAssetCache = new CacheFirst({
      cacheName: "static-assets-v1",
      plugins: [
            new ExpirationPlugin({
                  maxEntries: 60, // Cache up to 60 assets
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
      ],
});

// 2. For pages (HTML documents)
const pageCache = new StaleWhileRevalidate({
      cacheName: "pages-v1",
      plugins: [
            new ExpirationPlugin({
                  maxEntries: 100,
            }),
      ],
});

// --- Routing ---

// Route for static assets
registerRoute(
      ({ request }) =>
            /\.(?:js|css|png|jpg|jpeg|svg|webp|woff|woff2|json)$/.test(
                  request.url
            ),
      staticAssetCache
);

// Route for pages
registerRoute(({ request }) => request.destination === "document", pageCache);

// --- Force Refresh Logic ---
// This listener intercepts fetch events.
self.addEventListener("fetch", (event) => {
      const { request } = event;
      const url = new URL(request.url);

      // Check if our special 'forceNetwork' parameter is present.
      if (url.searchParams.has("forceNetwork")) {
            console.log(`[SW] Force network request for: ${url.pathname}`);

            // If it is, we must bypass the cache.
            // We respond with a direct network fetch.
            // We use the appropriate strategy to re-cache the new response.
            const strategy =
                  request.destination === "document"
                        ? pageCache
                        : staticAssetCache;

            event.respondWith(
                  // Fetch from network, and let the strategy handle caching the new version.
                  strategy.handle({ event, request }).then((response) => {
                        // If the network fetch fails (e.g., offline), we still want to try the cache.
                        if (!response) {
                              return caches.match(request);
                        }
                        return response;
                  })
            );
      }
});

// --- Offline Fallback ---
// This is triggered if a route fails (e.g., user is offline and item is not in cache).
const FALLBACK_HTML_URL = "/offline";
setCatchHandler(async ({ request }) => {
      if (request.destination === "document") {
            return (await caches.match(FALLBACK_HTML_URL)) || Response.error();
      }
      return Response.error();
});
