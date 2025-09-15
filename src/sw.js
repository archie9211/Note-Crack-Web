import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import {
      StaleWhileRevalidate,
      CacheFirst,
      NetworkOnly,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

console.log("[SW] Service worker loaded. Using Workbox strategies.");

// 1. Clean up old caches
cleanupOutdatedCaches();

// 2. Precache all assets defined in the Workbox manifest
precacheAndRoute(self.__WB_MANIFEST);

// 3. Define a custom plugin to handle 'forceNetwork'
const forceNetworkPlugin = {
      fetchDidSucceed: async ({ response, request }) => {
            // This logic runs when a network request succeeds.
            // It updates the cache with the new response, but for the URL *without* the 'forceNetwork' param.
            const cache = await caches.open("pages"); // Use a consistent cache name
            const cleanUrl = new URL(request.url);
            cleanUrl.searchParams.delete("forceNetwork");
            await cache.put(cleanUrl.toString(), response.clone());
            return response;
      },
};

// 4. Custom strategy to decide between network and cache
const customStrategy = ({ request }) => {
      const url = new URL(request.url);
      if (url.searchParams.has("forceNetwork")) {
            // If 'forceNetwork' is present, always go to the network.
            // The custom plugin will handle caching the successful response.
            return new NetworkOnly({
                  plugins: [forceNetworkPlugin],
            }).handle({ request });
      }
      // Otherwise, use the Stale-While-Revalidate strategy for pages.
      return new StaleWhileRevalidate({
            cacheName: "pages",
            plugins: [
                  new CacheableResponsePlugin({ statuses: [200] }),
                  new ExpirationPlugin({
                        maxEntries: 50, // Limit the number of pages cached
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                  }),
            ],
      }).handle({ request });
};

// 5. Register route for documents (HTML pages) using the custom strategy
registerRoute(
      ({ request }) => request.destination === "document",
      customStrategy
);

// 6. Register route for static assets (CSS, JS, images)
registerRoute(
      ({ request }) =>
            ["style", "script", "worker", "image", "font"].includes(
                  request.destination
            ),
      new CacheFirst({
            cacheName: "static-assets",
            plugins: [
                  // Only cache successful responses
                  new CacheableResponsePlugin({ statuses: [0, 200] }),
                  new ExpirationPlugin({
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                  }),
            ],
      })
);

// 7. Offline Fallback
const FALLBACK_HTML_URL = "/offline";

// Pre-cache the offline page during installation
self.addEventListener("install", (event) => {
      event.waitUntil(
            caches
                  .open("fallbacks")
                  .then((cache) => cache.add(FALLBACK_HTML_URL))
      );
});

// Use the offline page as a fallback for document requests
setCatchHandler(async ({ request }) => {
      if (request.destination === "document") {
            const fallbackCache = await caches.open("fallbacks");
            return (
                  (await fallbackCache.match(FALLBACK_HTML_URL)) ||
                  Response.error()
            );
      }
      // For other request types, just return an error
      return Response.error();
});
