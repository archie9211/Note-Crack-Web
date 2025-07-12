console.log("[SW] Service worker loaded");

import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);

const TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
const FALLBACK_HTML = "/offline.html";

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

  const isHtml = request.headers.get("accept")?.includes("text/html");
  const isStatic =
    /\.(js|css|png|jpg|jpeg|svg|webp|woff2?)$/.test(url.pathname);

  const shouldIgnore = [
    /^\/_worker\.js.*/,
    /^\/admin/,
    /^\/api\//,
    /^\/preview/,
    /^\/login/,
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
      const cached = await cleanUpCacheEntry(cacheName, request);
      if (cached) {
        console.log("[SW] Serving from cache:", url.pathname);
        return cached;
      }

      return fetch(request)
        .then((response) => {
          if (
            response.ok &&
            (isHtml || isStatic)
          ) {
            const cloned = response.clone();
            const headers = new Headers(cloned.headers);
            headers.append("sw-cache-time", Math.floor(Date.now() / 1000));

            const resToCache = new Response(cloned.body, {
              status: cloned.status,
              statusText: cloned.statusText,
              headers,
            });

            cache.put(request, resToCache);
            console.log("[SW] Cached:", url.pathname);
          }

          return response;
        })
        .catch(() => {
          if (isHtml) {
            return caches.open("fallbacks").then((fb) =>
              fb.match(FALLBACK_HTML)
            );
          }
        });
    })
  );
});