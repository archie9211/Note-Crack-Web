import { defineCollection, z } from "astro:content";

const mcqSchema = z.object({
      text: z.string(),
      options: z.array(z.string()),
      correct: z.union([z.number(), z.array(z.number())]),
      explanation: z.string(),
});

// This schema can be used for both regular notes and MCQ-only pages.
const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
      mcqs: z.array(mcqSchema).optional(),
});

// Define a collection for each subject AND each subject's MCQs.
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
            // Example
            type: "content",
            schema: notesSchema,
      }),

      // --- MCQ-Specific Collections ---
      // Your content files would live in:
      // src/content/biology-mcqs/class-12/chapter-1-quiz.md
      "biology-mcqs": defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      "chemistry-mcqs": defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      "physics-mcqs": defineCollection({
            // Example
            type: "content",
            schema: notesSchema,
      }),
};
