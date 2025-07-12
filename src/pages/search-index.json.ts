// src/pages/search-index.json.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { collections } from "../content/config.mjs";

// This is crucial. It tells Astro to generate this file at build time.
export const prerender = true;

export const GET: APIRoute = async ({}) => {
      const allNotes = [];
      const subjects = Object.keys(collections);

      for (const subject of subjects) {
            // We cast to `any` here as a simple way to iterate over dynamic collection names.
            const entries = await getCollection(subject as any);
            for (const entry of entries) {
                  allNotes.push({
                        title: entry.data.title,
                        description: entry.data.description,
                        url: `/notes/${subject}/${entry.slug}`,
                  });
            }
      }

      return new Response(JSON.stringify(allNotes));
};
