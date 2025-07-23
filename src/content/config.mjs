import { defineCollection, z } from "astro:content";
import fs from "fs";
import path from "path";

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

const contentDir = "src/content";

const subjects = fs
      .readdirSync(contentDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

export const collections = Object.fromEntries(
      subjects.map((subject) => [
            subject,
            defineCollection({
                  type: "content",
                  schema: notesSchema,
            }),
      ])
);

export const getSubjects = () => {
      return subjects.map((subject) => {
            const subjectDir = path.join(contentDir, subject);
            const classes = fs
                  .readdirSync(subjectDir, { withFileTypes: true })
                  .filter((dirent) => dirent.isDirectory())
                  .map((dirent) => dirent.name);
            return {
                  name: subject,
                  classes,
            };
      });
};
