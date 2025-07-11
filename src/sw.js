console.log("[SW] Service worker loaded");

import { precacheAndRoute } from "workbox-precaching";

console.log("[SW] Injecting precache manifest...");
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", (event) => {
      console.log("[SW] Install event");

      event.waitUntil(
            caches.open("fallbacks").then((cache) => {
                  console.log("[SW] Caching offline.html");
                  return cache.add("/offline.html");
            })
      );
});

self.addEventListener("fetch", (event) => {
      const { request } = event;
      const url = new URL(request.url);

      const isHtmlRequest =
            request.method === "GET" &&
            request.headers.get("accept")?.includes("text/html");

      if (!isHtmlRequest) {
            console.log("[SW] Ignored non-HTML request:", url.pathname);
            return;
      }

      const shouldIgnore = [
            /^\/_worker\.js.*/,
            /^\/admin/,
            /^\/api\//,
            /^\/preview/,
            /^\/login/,
      ].some((pattern) => pattern.test(url.pathname));

      if (shouldIgnore) {
            console.log("[SW] Ignored request (excluded):", url.pathname);
            return;
      }

      let cacheName = "astro-pages";
      if (/^\/biology/.test(url.pathname)) {
            cacheName = "astro-biology";
      } else if (/^\/chemistry/.test(url.pathname)) {
            cacheName = "astro-chemistry";
      } else if (/^\/physics/.test(url.pathname)) {
            cacheName = "astro-physics";
      }

      console.log(
            "[SW] Handling fetch for:",
            url.pathname,
            "| Cache:",
            cacheName
      );

      event.respondWith(
            fetch(request)
                  .then((response) => {
                        console.log("[SW] Fetched from network:", url.pathname);
                        const cloned = response.clone();
                        caches.open(cacheName).then((cache) => {
                              cache.put(request, cloned);
                              console.log("[SW] Cached:", url.pathname);
                        });
                        return response;
                  })
                  .catch((error) => {
                        console.warn(
                              "[SW] Network failed, trying cache for:",
                              url.pathname
                        );
                        return caches.open(cacheName).then((cache) =>
                              cache.match(request).then((cached) => {
                                    if (cached) {
                                          console.log(
                                                "[SW] Serving from cache:",
                                                url.pathname
                                          );
                                          return cached;
                                    } else {
                                          console.warn(
                                                "[SW] No cache found. Showing offline.html"
                                          );
                                          return caches
                                                .open("fallbacks")
                                                .then((fb) =>
                                                      fb.match("/offline.html")
                                                );
                                    }
                              })
                        );
                  })
      );
});
