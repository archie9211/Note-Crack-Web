import { defineCollection, z } from "astro:content";

const mcqSchema = z.object({
      text: z.string(),
      options: z.array(z.string()),
      correct: z.union([z.number(), z.array(z.number())]),
      explanation: z.string(),
});

// Schema for a standard content page (a note)
const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
      // MCQs can be optionally included within a note
      mcqs: z.array(mcqSchema).optional(),
});

// A new, dedicated schema for a page that IS a collection of MCQs
const mcqCollectionSchema = z.object({
      title: z.string(), // The title of the quiz, e.g., "Chapter 1 Quiz"
      description: z.string(), // A short description of the quiz
      mcqs: z.array(mcqSchema), // It MUST have MCQs
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
      // This now uses the correct, dedicated schema.
      // Use this for content that is *only* a quiz.
      biologyMcqs: defineCollection({
            type: "content",
            schema: mcqCollectionSchema,
      }),
};
