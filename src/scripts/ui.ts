// src/scripts/ui.ts

// =================================================================
//  1. Reusable Focus Trap for Modals and Drawers
// =================================================================
function focusTrap(node: HTMLElement, active: boolean) {
      if (!active) return;

      const focusableElements = node.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== "Tab") return;

            if (event.shiftKey) {
                  // Shift + Tab
                  if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                  }
            } else {
                  // Tab
                  if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                  }
            }
      }

      firstElement?.focus();
      node.addEventListener("keydown", handleKeyDown);

      // Return a cleanup function
      return () => {
            node.removeEventListener("keydown", handleKeyDown);
      };
}

// =================================================================
//  2. Main UI Controller
// =================================================================
function initializeUI() {
      let cleanupFocusTrap: (() => void) | null = null;

      // --- Main Header Logic (Desktop Dropdown & Mobile Flyout) ---
      const header = document.getElementById("main-header");
      const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
      const openIcon = document.getElementById("menu-open-icon");
      const closeIcon = document.getElementById("menu-close-icon");
      const subjectsDropdownWrapper = document.getElementById(
            "subjects-dropdown-wrapper"
      );
      const subjectsMenu = document.getElementById("subjects-menu");

      if (mobileMenuToggle && mobileMenu && openIcon && closeIcon) {
            mobileMenuToggle.addEventListener("click", () => {
                  const isHidden = mobileMenu.classList.toggle("hidden");
                  openIcon.classList.toggle("hidden", !isHidden);
                  closeIcon.classList.toggle("hidden", isHidden);
            });
      }

      if (subjectsDropdownWrapper && subjectsMenu) {
            subjectsDropdownWrapper.addEventListener("click", (event) => {
                  event.stopPropagation();
                  subjectsMenu.classList.toggle("opacity-0");
                  subjectsMenu.classList.toggle("pointer-events-none");
            });
            document.addEventListener("click", () => {
                  subjectsMenu.classList.add(
                        "opacity-0",
                        "pointer-events-none"
                  );
            });
      }

      // --- Article Layout Logic (Drawers & Sticky Header) ---
      const mobileNavToggle = document.getElementById("mobile-nav-toggle");
      const navDrawer = document.getElementById("mobile-nav-drawer");
      const navBackdrop = document.getElementById("mobile-nav-backdrop");

      const mobileTocToggle = document.getElementById("mobile-toc-toggle");
      const tocDrawer = document.getElementById("mobile-toc-drawer");

      const mobileBar = document.getElementById("mobile-toggle-bar");

      function toggleNavDrawer(isOpen: boolean) {
            if (isOpen) {
                  navBackdrop?.classList.remove("hidden");
                  navDrawer?.classList.remove("-translate-x-full");
                  document.body.style.overflow = "hidden";
                  if (navDrawer) cleanupFocusTrap = focusTrap(navDrawer, true);
            } else {
                  navBackdrop?.classList.add("hidden");
                  navDrawer?.classList.add("-translate-x-full");
                  document.body.style.overflow = "";
                  cleanupFocusTrap?.();
                  cleanupFocusTrap = null;
            }
      }

      mobileNavToggle?.addEventListener("click", () => toggleNavDrawer(true));
      navBackdrop?.addEventListener("click", () => toggleNavDrawer(false));
      navDrawer?.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => toggleNavDrawer(false));
      });

      function toggleTocDrawer(isOpen: boolean) {
            if (isOpen) {
                  tocDrawer?.classList.remove("translate-y-full");
                  document.body.style.overflow = "hidden";
                  if (tocDrawer) cleanupFocusTrap = focusTrap(tocDrawer, true);
            } else {
                  tocDrawer?.classList.add("translate-y-full");
                  document.body.style.overflow = "";
                  cleanupFocusTrap?.();
                  cleanupFocusTrap = null;
            }
      }

      mobileTocToggle?.addEventListener("click", () => {
            const isHidden = tocDrawer?.classList.contains("translate-y-full");
            toggleTocDrawer(!!isHidden);
      });
      tocDrawer?.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => toggleTocDrawer(false));
      });

      // --- Hide Header & Mobile Bar on Scroll ---
      if (header) {
            let lastScrollY = window.scrollY;
            window.addEventListener(
                  "scroll",
                  () => {
                        const currentScrollY = window.scrollY;
                        if (
                              currentScrollY > lastScrollY &&
                              currentScrollY > header.offsetHeight
                        ) {
                              header.classList.add("-translate-y-full");
                              mobileBar?.classList.add("-translate-y-full");
                        } else {
                              header.classList.remove("-translate-y-full");
                              mobileBar?.classList.remove("-translate-y-full");
                        }
                        lastScrollY = currentScrollY;
                  },
                  { passive: true }
            );
      }

      // --- Close drawers on Escape key ---
      document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                  if (!navDrawer?.classList.contains("-translate-x-full")) {
                        toggleNavDrawer(false);
                  }
                  if (!tocDrawer?.classList.contains("translate-y-full")) {
                        toggleTocDrawer(false);
                  }
            }
      });
}

// Run the initializer
if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeUI);
} else {
      initializeUI();
}
