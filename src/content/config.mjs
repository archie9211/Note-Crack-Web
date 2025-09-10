import { defineCollection } from "astro:content";
// Import the reusable schema
import { notesSchema } from "./schema";

// Define a collection for each subject.
export const collections = {
      // --- Regular Note Collections ---
      biology: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      chemistry: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      physics: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      pharmacy: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      miscellaneous: defineCollection({
            type: "content",
            schema: notesSchema,
      }),

      // --- MCQ-Specific Collections ---
      "biology-mcqs": defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      "chemistry-mcqs": defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      "physics-mcqs": defineCollection({
            type: "content",
            schema: notesSchema,
      }),
};
