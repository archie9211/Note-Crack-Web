import { defineCollection, z } from "astro:content";
import fs from "fs";
import path from "path";

const notesSchema = z.object({
      title: z.string(),
      description: z.string(),
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
