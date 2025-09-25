// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import AstroPWA from "@vite-pwa/astro";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/svg";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism";

// https://astro.build/config
export default defineConfig({
      site: "https://notecrack.archie9211.com/",
      output: "server",
      markdown: {
            syntaxHighlight: "shiki",
            shikiConfig: {
                  theme: "github-dark",
                  wrap: true,
            },
            remarkPlugins: [
                  [
                        remarkMath,
                        {
                              inlineMath: [["$", "$"]],
                              displayMath: [["$$", "$$"]],
                        },
                  ],
                  remarkGfm,
            ],
            rehypePlugins: [
                  [
                        rehypeMathjax,
                        {
                              output: "svg",
                              chtml: {
                                    displayAlign: "left",
                                    displayIndent: "0",
                              },
                              svg: {
                                    displayAlign: "left",
                                    displayIndent: "0",
                                    fontCache: "local",
                              },
                        },
                  ],
            ],
      },

      vite: {
            plugins: [tailwindcss()],
      },
      build: {
            inlineStylesheets: "auto", // or "always"
      },
      adapter: cloudflare(),
      integrations: [
            AstroPWA({
                  // THIS IS THE KEY CHANGE
                  injectRegister: "auto",
                  strategies: "injectManifest",
                  srcDir: "src", // or 'public', wherever your custom service worker is
                  filename: "sw.js",
                  registerType: "autoUpdate",

                  injectManifest: {
                        // Only include these patterns – safe, avoids _worker.js
                        globPatterns: [
                              "**/*.{js,css,html,ico,png,svg,woff2}",
                              "_astro/**/*.{js,css}",
                              "icons/**/*.{png,svg}",
                        ],

                        globIgnores: ["_worker.js/**"],
                  },
                  manifest: {
                        name: "Note Crack: Revision Notes",
                        short_name: "NoteCrack",
                        description:
                              "Last-minute revision notes for students. Fast, focused, and available offline.",
                        theme_color: "#ffffff",
                        background_color: "#ffffff",
                        display: "standalone",
                        scope: "/",
                        start_url: "/",
                        icons: [
                              {
                                    src: "/icons/icon-192x192.png",
                                    sizes: "192x192",
                                    type: "image/png",
                              },
                              {
                                    src: "/icons/icon-512x512.png",
                                    sizes: "512x512",
                                    type: "image/png",
                              },
                              {
                                    src: "/icons/icon-512x512-maskable.png",
                                    sizes: "512x512",
                                    type: "image/png",
                                    purpose: "maskable",
                              },
                        ],
                  },
            }),
      ],
});
