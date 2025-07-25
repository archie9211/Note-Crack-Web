// src/scripts/nprogress.ts
import NProgress from "nprogress";

NProgress.configure({
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.1,
});

document.addEventListener("astro:page-load", () => NProgress.done());
document.addEventListener("astro:before-preparation", () => NProgress.start());

function startNProgressForStandardNav() {
      document.querySelectorAll("a[href]").forEach((link) => {
            // TYPE-GUARD: Ensure we are working with an actual HTMLAnchorElement
            if (!(link instanceof HTMLAnchorElement)) {
                  return;
            }

            link.addEventListener("click", (event) => {
                  const href = link.href;
                  const target = link.target;

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

                  if (
                        link.hostname === window.location.hostname &&
                        (href.startsWith("#") ||
                              (link.pathname === window.location.pathname &&
                                    href.includes("#")))
                  ) {
                        return;
                  }

                  NProgress.start();
            });
      });
}

if (document.readyState === "complete") {
      startNProgressForStandardNav();
} else {
      document.addEventListener(
            "DOMContentLoaded",
            startNProgressForStandardNav
      );
}

window.addEventListener("popstate", () => NProgress.done());
