import { defineCollection, z } from "astro:content";

const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
});

// Define a collection for each subject
export const collections = {
      biology: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      chemistry: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      // Add more subjects here as you create them
};
