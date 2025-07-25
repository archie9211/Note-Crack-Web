// src/scripts/search.ts
import type Fuse from "fuse.js";

// Define the shape of our search data for type safety
interface SearchNote {
      title: string;
      description: string;
      url: string;
}

// Reusable focus trap function
function focusTrap(node: HTMLElement) {
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
      return () => node.removeEventListener("keydown", handleKeyDown);
}

function initializeCustomSearch() {
      const desktopInput = document.getElementById("search-input");
      const modalInput = document.getElementById(
            "modal-search-input"
      ) as HTMLInputElement | null;
      const triggerBtn = document.getElementById("search-trigger-btn");
      const closeBtn = document.getElementById("search-close-btn");
      const modal = document.getElementById("search-modal");
      const resultsContainer = document.getElementById(
            "search-results-container"
      );
      const modalDialog = modal?.querySelector<HTMLElement>('[role="dialog"]');

      if (
            !modal ||
            !resultsContainer ||
            !modalInput ||
            !closeBtn ||
            !modalDialog
      )
            return;

      let fuse: Fuse<SearchNote> | null = null;
      let isLoading = false;
      let cleanupFocusTrap: (() => void) | null = null;

      const loadSearchData = async () => {
            if (fuse || isLoading) return;
            isLoading = true;
            try {
                  const response = await fetch("/search-index.json");
                  if (!response.ok)
                        throw new Error("Failed to fetch search index");
                  const searchData: SearchNote[] = await response.json();

                  const FuseModule = await import(
                        "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs"
                  );
                  fuse = new FuseModule.default(searchData, {
                        keys: [
                              { name: "title", weight: 0.7 },
                              { name: "description", weight: 0.3 },
                        ],
                        includeScore: true,
                        threshold: 0.4,
                  });
            } catch (e) {
                  console.error("Failed to load search index or Fuse.js:", e);
                  resultsContainer.innerHTML = `<p class="text-center text-red-500 py-8">Search failed to load.</p>`;
            } finally {
                  isLoading = false;
            }
      };

      desktopInput?.addEventListener("focus", loadSearchData, { once: true });
      triggerBtn?.addEventListener("click", loadSearchData, { once: true });

      let debounceTimer: number;
      const performSearch = () => {
            if (!fuse) {
                  resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Loading search index...</p>`;
                  void loadSearchData();
                  return;
            }
            const query = modalInput.value;
            if (query.length < 2) {
                  resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Start typing to see results.</p>`;
                  return;
            }
            const results = fuse.search(query);
            if (results.length === 0) {
                  resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">No results found for "<strong>${query}</strong>"</p>`;
                  return;
            }
            resultsContainer.innerHTML = `<ul class="space-y-4 list-none pl-0">${results
                  .slice(0, 20)
                  .map(
                        (result) => `
                <li>
                    <a href="${result.item.url}" class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group hover:border-blue-500 dark:hover:border-blue-500">
                        <h2 class="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">${result.item.title}</h2>
                        <p class="text-gray-600 dark:text-gray-400 mt-1">${result.item.description}</p>
                    </a>
                </li>`
                  )
                  .join("")}</ul>`;
      };

      const openModal = () => {
            modal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
            modalInput.focus();
            if (modalInput.value.length > 1) performSearch();
            cleanupFocusTrap = focusTrap(modalDialog);
      };

      const closeModal = () => {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
            cleanupFocusTrap?.();
      };

      desktopInput?.addEventListener("focus", openModal);
      triggerBtn?.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);
      modalInput.addEventListener("input", () => {
            window.clearTimeout(debounceTimer);
            debounceTimer = window.setTimeout(performSearch, 200);
      });
      modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
      });
      document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Escape" && !modal.classList.contains("hidden")) {
                  closeModal();
            }
      });
}

if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeCustomSearch);
} else {
      initializeCustomSearch();
}
