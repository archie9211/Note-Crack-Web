import { defineCollection, z } from "astro:content";

const mcqSchema = z.object({
      text: z.string(),
      options: z.array(z.string()),
      correct: z.union([z.number(), z.array(z.number())]), // Can be a single number or an array of numbers
      explanation: z.string(),
});
const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
      // Add the mcqs field. It's an optional array of our mcqSchema.
      mcqs: z.array(mcqSchema).optional(),
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
      biologyMcqs: defineCollection({
            type: "content",
            schema: notesSchema,
      }),
      // Add more subjects here as you create them
};
