// src/sw.js
console.log("[SW] Service worker loaded");

import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);

// --- THIS IS THE NEW, CRITICAL PART ---
// This listener waits for the "SKIP_WAITING" message from the client.
self.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SKIP_WAITING") {
            console.log(
                  "[SW] Received SKIP_WAITING message. Activating new service worker now."
            );
            self.skipWaiting();
      }
});

const TTL_SECONDS = 7 * 24 * 60 * 60;
const FALLBACK_HTML = "/offline";

// Apply to HTML, CSS, JS, Images
const STATIC_CACHE_NAME = "static-assets-v1";

// On install: cache fallback
self.addEventListener("install", (event) => {
      event.waitUntil(
            caches.open("fallbacks").then((cache) => cache.add(FALLBACK_HTML))
      );
});

// Cleanup expired cache entries
async function cleanUpCacheEntry(cacheName, request) {
      const cache = await caches.open(cacheName);
      const response = await cache.match(request);
      if (!response) return null;

      const dateHeader = response.headers.get("sw-cache-time");
      if (!dateHeader) return null;

      const cacheTime = parseInt(dateHeader, 10);
      const now = Date.now() / 1000;

      if (now - cacheTime > TTL_SECONDS) {
            await cache.delete(request);
            console.log("[SW] Expired cache removed:", request.url);
            return null;
      }

      return response;
}

self.addEventListener("fetch", (event) => {
      const { request } = event;
      const url = new URL(request.url);

      // Ignore non-GET requests
      if (request.method !== "GET") {
            return;
      }

      if (!url.protocol.startsWith("http")) {
            console.log("[SW] Ignored non-http request:", url.href);
            return;
      }

      // Also ignore non-GET requests
      if (request.method !== "GET") {
            return;
      }
      const isHtml = request.headers.get("accept")?.includes("text/html");

      // --- THIS IS THE ONLY CHANGE ---
      // Add 'json' to the list of static assets to be cached.
      const isStatic = /\.(js|css|png|jpg|jpeg|svg|webp|woff2?|json)$/.test(
            url.pathname
      );

      const shouldIgnore = [
            /^\/_worker\.js.*/,
            /^\/admin/,
            /^\/api\//,
            /^\/preview/,
            /^\/login/,
            // Pagefind is gone, but keeping this doesn't hurt.
            /^\/pagefind\//,
      ].some((pattern) => pattern.test(url.pathname));

      if (shouldIgnore) return;

      // Determine which cache to use
      let cacheName = STATIC_CACHE_NAME;
      if (isHtml) {
            if (/^\/biology/.test(url.pathname)) {
                  cacheName = "astro-biology";
            } else if (/^\/chemistry/.test(url.pathname)) {
                  cacheName = "astro-chemistry";
            } else if (/^\/physics/.test(url.pathname)) {
                  cacheName = "astro-physics";
            } else {
                  cacheName = "astro-pages";
            }
      }

      // Apply Cache-First Strategy
      event.respondWith(
            caches.open(cacheName).then(async (cache) => {
                  // Try to get from cache first
                  const cached = await cleanUpCacheEntry(cacheName, request);
                  if (cached) {
                        console.log("[SW] Serving from cache:", url.pathname);
                        return cached;
                  }

                  // If not in cache, fetch from network
                  return fetch(request)
                        .then((response) => {
                              // Cache the response if it's OK and it's an HTML or static asset
                              if (response.ok && (isHtml || isStatic)) {
                                    const cloned = response.clone();
                                    const headers = new Headers(cloned.headers);
                                    headers.append(
                                          "sw-cache-time",
                                          Math.floor(Date.now() / 1000)
                                    );

                                    const resToCache = new Response(
                                          cloned.body,
                                          {
                                                status: cloned.status,
                                                statusText: cloned.statusText,
                                                headers,
                                          }
                                    );

                                    cache.put(request, resToCache);
                                    // console.log("[SW] Cached:", url.pathname);
                              }

                              return response;
                        })
                        .catch(() => {
                              // If network fails, serve fallback for HTML requests
                              if (isHtml) {
                                    return caches
                                          .open("fallbacks")
                                          .then((fb) =>
                                                fb.match(FALLBACK_HTML)
                                          );
                              }
                              // For other failed static asset requests, just let the browser handle it (show a broken image icon, etc.)
                        });
            })
      );
});
