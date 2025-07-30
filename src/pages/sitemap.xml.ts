import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { collections } from "../content/config.mjs";
import { execSync } from "child_process";

export const prerender = true;

/**
 * A helper function to get the last Git commit date for a specific file.
 * Returns the date in ISO 8601 format, or the current date as a fallback.
 * @param {string} filePath - The path to the file from the project root.
 */
function getLastmod(filePath: string): string {
      try {
            const output = execSync(
                  `git log -1 --pretty="format:%cI" -- "${filePath}"`
            );
            return output.toString().trim();
      } catch (e) {
            console.warn(
                  `[sitemap] Could not get lastmod for ${filePath}. Using current date.`
            );
            return new Date().toISOString();
      }
}

const staticPages = ["/", "/offline"];

export const GET: APIRoute = async ({ site }) => {
      if (!site) {
            throw new Error(
                  "A `site` property is required in astro.config.mjs to build the sitemap."
            );
      }

      const sitemapEntries: { url: string; lastmod: string }[] = [];
      const collectionNames = Object.keys(
            collections
      ) as (keyof typeof collections)[];

      for (const collection of collectionNames) {
            const entries = await getCollection(collection);
            for (const entry of entries) {
                  const path = `/notes/${collection}/${entry.slug}`;
                  const url = new URL(path, site).href;

                  // --- THIS IS THE FIX ---
                  // Use `entry.id` which contains the original filename (e.g., "My Awesome Topic.md").
                  // Do NOT use `entry.slug` (e.g., "my-awesome-topic").
                  // Also, `entry.id` already includes the file extension, so we don't add `.md`.
                  const filePath = `src/content/${collection}/${entry.id}`;

                  const lastmod = getLastmod(filePath);
                  sitemapEntries.push({ url, lastmod });
            }
      }

      const buildDate = new Date().toISOString();
      for (const collection of collectionNames) {
            const path = `/${collection}`;
            const url = new URL(path, site).href;
            sitemapEntries.push({ url, lastmod: buildDate });
      }
      for (const page of staticPages) {
            const url = new URL(page, site).href;
            sitemapEntries.push({ url, lastmod: buildDate });
      }

      const sitemapContent = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries
          .map(
                (entry) => `
    <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastmod}</lastmod>
    </url>
    `
          )
          .join("")}
</urlset>
    `.trim();

      return new Response(sitemapContent, {
            headers: {
                  "Content-Type": "application/xml",
            },
      });
};
