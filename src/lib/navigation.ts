import { getCollection, type CollectionEntry } from "astro:content";
import { collections } from "../content/config.mjs";

export type Topic = {
      slug: string;
      title: string;
};

export type ClassTopics = {
      [className: string]: Topic[];
};

export type SubjectClasses = {
      [subjectName: string]: ClassTopics;
};

type CollectionName = keyof typeof collections;
type NoteEntry = CollectionEntry<CollectionName>;

/**
 * Fetches all notes and organizes them into a nested structure:
 * Subject > Class > Topic
 */
export async function buildNavigationTree(): Promise<SubjectClasses> {
      const navTree: SubjectClasses = {};
      const subjectNames = Object.keys(collections) as CollectionName[];

      for (const subject of subjectNames) {
            // --- THIS IS THE FIX ---
            // REMOVED THE LINE THAT SKIPPED "-mcqs" COLLECTIONS.
            // Now, "biology-mcqs" will be treated as its own subject in the tree.

            navTree[subject] = {};
            const allTopicsInSubject: NoteEntry[] = await getCollection(
                  subject
            );

            for (const topic of allTopicsInSubject) {
                  const [className, ...topicSlugParts] = topic.slug.split("/");

                  if (!topicSlugParts.length) {
                        continue;
                  }

                  const topicSlug = topicSlugParts.join("/");

                  if (!navTree[subject][className]) {
                        navTree[subject][className] = [];
                  }

                  navTree[subject][className].push({
                        slug: topic.slug,
                        title: topic.data.title,
                  });
            }

            // Sort topics within each class based on numeric prefix
            for (const className in navTree[subject]) {
                  navTree[subject][className].sort((a, b) => {
                        const aFilename = a.slug.split("/").pop() || "";
                        const bFilename = b.slug.split("/").pop() || "";
                        const aMatch = aFilename.match(/^(\d+)-/);
                        const bMatch = bFilename.match(/^(\d+)-/);

                        // If both have numeric prefixes, sort by number
                        if (aMatch && bMatch) {
                              return (
                                    parseInt(aMatch[1], 10) -
                                    parseInt(bMatch[1], 10)
                              );
                        }
                        // If only one has a numeric prefix, put numbered ones first
                        if (aMatch) return -1;
                        if (bMatch) return 1;
                        // If neither has a numeric prefix, sort alphabetically
                        return aFilename.localeCompare(bFilename);
                  });
            }

            const sortedClasses = Object.keys(navTree[subject]).sort();
            const sortedNavTreeForSubject: ClassTopics = {}; // Added type for clarity
            for (const className of sortedClasses) {
                  sortedNavTreeForSubject[className] =
                        navTree[subject][className];
            }
            navTree[subject] = sortedNavTreeForSubject;
      }

      return navTree;
}
