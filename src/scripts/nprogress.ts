// src/scripts/nprogress.ts
import NProgress from "nprogress";

// Configure the progress bar
NProgress.configure({
      showSpinner: false, // We just want the bar, not the spinner
      trickleSpeed: 200,
      minimum: 0.1,
});

// --- Logic for Astro's View Transitions ---
// If you are using Astro's built-in View Transitions, this is the modern way.

// Start progress bar on page load
document.addEventListener("astro:page-load", () => {
      NProgress.done();
});

// Start progress bar on link click
document.addEventListener("astro:before-preparation", () => {
      NProgress.start();
});

// --- Fallback for standard link clicks (if not using View Transitions) ---
// This part is for robustness and ensures it works even without VT.
function startNProgressForStandardNav() {
      document.querySelectorAll("a[href]").forEach((link) => {
            link.addEventListener("click", (event) => {
                  const href = link.getAttribute("href");
                  const target = link.getAttribute("target");

                  // Don't intercept for new tabs or special protocols
                  if (
                        target === "_blank" ||
                        event.ctrlKey ||
                        event.metaKey ||
                        !href ||
                        href.startsWith("mailto:") ||
                        href.startsWith("tel:")
                  ) {
                        return;
                  }

                  // Don't intercept for anchor links on the same page
                  if (
                        href.startsWith("#") ||
                        href.startsWith(window.location.pathname + "#")
                  ) {
                        return;
                  }

                  NProgress.start();
            });
      });
}

// Attach the standard listeners once the DOM is ready
if (document.readyState === "complete") {
      startNProgressForStandardNav();
} else {
      document.addEventListener(
            "DOMContentLoaded",
            startNProgressForStandardNav
      );
}

// On browser back/forward, just mark as done
window.addEventListener("popstate", () => {
      NProgress.done();
});
