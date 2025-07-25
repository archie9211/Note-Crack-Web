import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

console.log("[SW] Service worker loaded. Using Workbox strategies.");

precacheAndRoute(self.__WB_MANIFEST);

const pagesCacheName = "pages-v1";
const staticAssetsCacheName = "static-assets-v1";

registerRoute(
      ({ request }) => request.destination === "document",
      new StaleWhileRevalidate({
            cacheName: pagesCacheName,
            plugins: [new ExpirationPlugin({ maxEntries: 300 })],
      })
);

registerRoute(
      ({ request }) =>
            /\.(?:js|css|png|jpg|jpeg|svg|webp|woff|woff2|json)$/.test(
                  request.url
            ),
      new CacheFirst({
            cacheName: staticAssetsCacheName,
            plugins: [
                  new ExpirationPlugin({
                        maxEntries: 100,
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                  }),
            ],
      })
);

const handleForceNetwork = async (event) => {
      const { request } = event;
      const url = new URL(request.url);
      console.log(`[SW] Force network request for: ${url.pathname}`);

      try {
            const networkResponse = await fetch(request);

            const cacheName =
                  request.destination === "document"
                        ? pagesCacheName
                        : staticAssetsCacheName;
            const cache = await caches.open(cacheName);

            const cleanUrl = new URL(request.url);
            cleanUrl.searchParams.delete("forceNetwork");

            await cache.put(cleanUrl.toString(), networkResponse.clone());
            console.log(
                  `[SW] Cache updated for clean URL: ${cleanUrl.pathname}`
            );

            return networkResponse;
      } catch (error) {
            console.error("[SW] Force network fetch failed:", error);

            const cleanUrl = new URL(request.url);
            cleanUrl.searchParams.delete("forceNetwork");
            return caches.match(cleanUrl.toString());
      }
};

self.addEventListener("fetch", (event) => {
      const { request } = event;
      const url = new URL(request.url);

      if (url.searchParams.has("forceNetwork")) {
            event.respondWith(handleForceNetwork(event));
      }
});

const FALLBACK_HTML_URL = "/offline";

self.addEventListener("install", (event) => {
      event.waitUntil(
            caches
                  .open("fallbacks")
                  .then((cache) => cache.add(FALLBACK_HTML_URL))
      );
});

setCatchHandler(async ({ request }) => {
      if (request.destination === "document") {
            const fallbackCache = await caches.open("fallbacks");
            return (
                  (await fallbackCache.match(FALLBACK_HTML_URL)) ||
                  Response.error()
            );
      }

      return Response.error();
});
