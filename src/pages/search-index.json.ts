// src/pages/search-index.json.ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { collections } from "../content/config.mjs";

// This is crucial. It tells Astro to generate this file at build time.
export const prerender = true;

export const GET: APIRoute = async ({}) => {
      const allNotes = [];
      // Create a typed array of collection names
      const subjects: (keyof typeof collections)[] = Object.keys(
            collections
      ) as (keyof typeof collections)[];

      for (const subject of subjects) {
            // No longer need to cast to `any`
            const entries = await getCollection(subject);
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
