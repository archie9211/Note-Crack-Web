// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";
import pagefind from "astro-pagefind";

import pwa from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
      output: "server",

      vite: {
            plugins: [tailwindcss()],
      },
      adapter: cloudflare(),
      integrations: [
            pagefind(),
            pwa({
                  // THIS IS THE KEY CHANGE
                  registerType: "prompt", // Use 'prompt' instead of 'autoUpdate'
                  injectRegister: false, // We will handle the registration script manually

                  workbox: {
                        globPatterns: [
                              "**/*.{js,css,html,svg,png,ico,txt,woff2}",
                        ],
                        //
                        // --- THIS IS THE KEY FIX ---
                        // Explicitly define the fallback for navigation requests.
                        // This tells the service worker to serve /index.html when a user
                        // navigates to a page like `/` or `/chemistry` while offline.
                        navigateFallback: "/index.html",
                  },
            }),
      ],
});
