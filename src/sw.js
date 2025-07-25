import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

console.log("[SW] Service worker loaded. Using Workbox strategies.");

precacheAndRoute(self.__WB_MANIFEST);

const pagesCacheName = "pages-v1";
const staticAssetsCacheName = "static-assets-v1";

const ignoreForceNetwork = ({ request }) => {
      const url = new URL(request.url);

      return !url.searchParams.has("forceNetwork");
};

registerRoute(
      ({ request }) =>
            request.destination === "document" &&
            ignoreForceNetwork({ request }),
      new StaleWhileRevalidate({
            cacheName: pagesCacheName,
            plugins: [new ExpirationPlugin({ maxEntries: 30 })],
      })
);

registerRoute(
      ({ request }) =>
            /\.(?:js|css|png|jpg|jpeg|svg|webp|woff|woff2|json)$/.test(
                  request.url
            ) && ignoreForceNetwork({ request }),
      new CacheFirst({
            cacheName: staticAssetsCacheName,
            plugins: [
                  new ExpirationPlugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60,
                  }),
            ],
      })
);

self.addEventListener("fetch", (event) => {
      const { request } = event;
      const url = new URL(request.url);

      if (url.searchParams.has("forceNetwork")) {
            event.respondWith(
                  (async () => {
                        console.log(
                              `[SW] Force network request for: ${url.pathname}`
                        );
                        try {
                              const networkResponse = await fetch(request);

                              const cacheName =
                                    request.destination === "document"
                                          ? pagesCacheName
                                          : staticAssetsCacheName;
                              const cache = await caches.open(cacheName);

                              const cleanUrl = new URL(request.url);
                              cleanUrl.searchParams.delete("forceNetwork");

                              await cache.put(
                                    cleanUrl.toString(),
                                    networkResponse.clone()
                              );
                              console.log(
                                    `[SW] Cache updated for clean URL: ${cleanUrl.pathname}`
                              );

                              return networkResponse;
                        } catch (error) {
                              console.error(
                                    "[SW] Force network fetch failed:",
                                    error
                              );

                              const cleanUrl = new URL(request.url);
                              cleanUrl.searchParams.delete("forceNetwork");
                              return (
                                    (await caches.match(cleanUrl.toString())) ||
                                    Response.error()
                              );
                        }
                  })()
            );
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
