import { z } from "astro:content";

// This schema defines a single MCQ object
export const mcqSchema = z.object({
      text: z.string(),
      options: z.array(z.string()),
      correct: z.union([z.number(), z.array(z.number())]),
      explanation: z.string(),
});

// This schema defines the frontmatter for any content file
export const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.string().optional(), // Added for SEO
      subject: z.string().optional(), // Added for SEO and categorization
      class: z.string().optional(), // Added for SEO and categorization
      mcqs: z.array(mcqSchema).optional(),
      dateModified: z.string().optional(), // Added for SEO
});

// We can infer the TypeScript type directly from the Zod schema
export type Mcq = z.infer<typeof mcqSchema>;
