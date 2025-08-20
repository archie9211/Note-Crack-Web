# Note Crack ⚡️

A minimalist, fast, and offline-first PWA for student revision notes, built with Astro and deployed on the Cloudflare edge. This project is designed from the ground up to provide a blazing-fast, distraction-free reading experience with first-class support for mathematical notation and interactive quizzes, making it the perfect tool for modern study sessions.

---

## ✨ Core Features

This isn't just a simple static site. It's a full-featured web application packed with modern tools to enhance the learning and reading experience.

- **🚀 Blazing Fast Performance:** Built with [Astro](https://astro.build/) for an edge-rendered, zero-JavaScript-by-default architecture. Pages are incredibly lightweight and load instantly, served from a Cloudflare data center near you.

- **� Advanced SEO Optimization:**

     - Dynamic meta tags and structured data for better search engine visibility
     - Schema.org markup for articles and quizzes
     - Breadcrumb navigation for improved crawling
     - Content-specific keywords and meta descriptions
     - Enhanced MCQ discoverability for exam-specific searches

- **�📱 Progressive Web App (PWA):** Fully installable on both desktop and mobile for a native app-like experience.

     - **Complete Offline Support:** A custom service worker aggressively caches all visited notes, static assets, and even the search index, making the app fully functional without an internet connection.
     - **Automatic Background Updates:** When new content is published, the app updates seamlessly in the background. Users get the latest version on their next visit without any disruptive prompts.

- **🔎 Client-Side Fuzzy Search:**

     - Lightweight and instant search of note **titles and descriptions** for maximum relevance.
     - Powered by [Fuse.js](https://fusejs.io/), a powerful fuzzy-search library.
     - A simple JSON index is generated at build time, keeping the client-side footprint small.

- **✍️ First-Class Math & Science Support:**

     - Beautifully renders complex mathematical and chemical formulas using **MathJax**.
     - Seamlessly integrated into the Markdown pipeline with `remark-math` and `rehype-mathjax`.
     - Inline (`$...$`) and block (`$$...$$`) notations are fully supported.

- **🧠 Interactive Quizzes:**

     - Embed multiple-choice questions (MCQs) directly into notes to test understanding.
     - Provides instant visual feedback on answers and reveals detailed explanations.
     - Engineered for performance using a single event listener to manage all quizzes on a page, minimizing JavaScript load.
     - Dedicated MCQ collections with enhanced SEO for better visibility in exam-related searches.
     - Structured data markup for quiz content improving search engine understanding.

- **📖 Distraction-Free Reading Experience:**

     - A clean, three-column layout on desktop: **Navigation | Article | Table of Contents**.
     - Fully responsive design that refactors into a focused, single-column view with slide-out drawers on mobile.
     - **Auto-hiding navigation bars** on scroll to maximize reading space.
     - **Reading Progress Bar** at the top of the page.
     - **Page Load Progress Bar** ([NProgress](https://github.com/rstacruz/nprogress)) for instant feedback on navigation.
     - Convenient **Next/Previous Article** navigation links within the same class/section.

- **🗂️ Dynamic Content Architecture:**

     - Notes are written in simple **Markdown** using Astro's type-safe [Content Collections](https://docs.astro.build/en/guides/content-collections/).
     - Organized by `subject > class > topic` for a clear, scalable, and automatically generated tree-like navigation.
     - Enhanced metadata support for SEO, including keywords, descriptions, and subject categorization.
     - Separate collections for notes and MCQs with shared schema for consistency.

- **🎨 Theming:**

     - Light and Dark mode support with a manual toggle.
     - Persists user preference in `localStorage` and prevents FOUC (Flash of Unstyled Content).

- **☁️ Deployment Ready:**
     - Configured for **Server-Side Rendering (SSR)**.
     - Optimized for high-performance, low-latency deployment on the **Cloudflare** global network.

---

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Deployment:** [Cloudflare Pages/Workers](https://workers.cloudflare.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Client-Side Search:** [Fuse.js](https://fusejs.io/)
- **PWA / Service Worker:** Manual with [Workbox](https://developer.chrome.com/docs/workbox)
- **Math Rendering:** `remark-math` & `rehype-mathjax`
- **SEO:** Schema.org structured data, OpenGraph, Twitter Cards
- **Content Structure:** Type-safe collections with custom frontmatter schema

---

## 🚀 Getting Started

You can clone this repository and run it locally for development or contributions.

1.    **Clone the repository:**

      ```bash
      git clone https://github.com/archie9211/Note-Crack-Web.git
      cd Note-Crack-Web
      ```

2.    **Install dependencies:**

      ```bash
      npm install
      ```

3.    **Run the development server:**

      ```bash
      npm run dev
      ```

4.    **Open your browser:**
      Navigate to `http://localhost:4321` to see the site in action.

---

## ☁️ Deployment

This project is configured for a **Server-Side Rendering (SSR)** deployment on **Cloudflare**.

- The `astro.config.mjs` file is set up with `output: 'server'` and the `@astrojs/cloudflare` adapter.
- The easiest way to deploy is to link your GitHub repository directly to Cloudflare Pages, which will automatically detect the Astro configuration.
- To build the project for a manual production deployment, run:
     ```bash
     npm run build
     ```
     This will generate the `dist/` directory containing the `_worker.js` entry point required by Cloudflare.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the notes, please feel free to open an issue or submit a pull request.

1.    Fork the repository.
2.    Create a new branch (`git checkout -b feature/your-amazing-feature`).
3.    Make your changes.
4.    Commit your changes (`git commit -m 'Add some amazing feature'`).
5.    Push to the branch (`git push origin feature/your-amazing-feature`).
6.    Open a Pull Request.

---

## 📜 Licensing

This project uses a dual-license model to separate the open-source code from the creative content.

### The Code

The underlying code for this project (everything outside of the `src/content/` directory) is open-source and licensed under the **MIT License**. You are free to fork, modify, and use this code for your own projects.

See the [LICENSE](LICENSE) file for details.

### The Content

All educational notes and materials located within the `src/content/` directory are the intellectual property of the author and are licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)**.

This means you are free to share the notes, but you **cannot** use them for commercial purposes or distribute modified versions.

See the [LICENSE-CONTENT.md](LICENSE-CONTENT.md) file for more information.
