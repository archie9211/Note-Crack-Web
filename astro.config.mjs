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
                        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt}"],
                  },
            }),
      ],
});
