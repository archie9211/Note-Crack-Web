import { getCollection } from "astro:content";
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

/**
 * Fetches all notes and organizes them into a nested structure:
 * Subject > Class > Topic
 */
export async function buildNavigationTree(): Promise<SubjectClasses> {
      const navTree: SubjectClasses = {};
      const subjectNames = Object.keys(collections);

      for (const subject of subjectNames) {
            navTree[subject] = {};
            const allTopicsInSubject = await getCollection(subject as any);

            for (const topic of allTopicsInSubject) {
                  const [className, ...topicSlugParts] = topic.slug.split("/");

                  if (!topicSlugParts.length) {
                        // This topic is not under a class folder, so we skip it or handle it differently
                        continue;
                  }

                  const topicSlug = topicSlugParts.join("/");

                  // Create the class array if it doesn't exist
                  if (!navTree[subject][className]) {
                        navTree[subject][className] = [];
                  }

                  navTree[subject][className].push({
                        slug: topic.slug, // The full slug, e.g., 'class-12/topic-name'
                        title: topic.data.title,
                  });
            }

            // Sort classes alphabetically (e.g., class-11, class-12)
            const sortedClasses = Object.keys(navTree[subject]).sort();
            const sortedNavTreeForSubject: ClassTopics = {};
            for (const className of sortedClasses) {
                  sortedNavTreeForSubject[className] =
                        navTree[subject][className];
            }
            navTree[subject] = sortedNavTreeForSubject;
      }

      return navTree;
}
