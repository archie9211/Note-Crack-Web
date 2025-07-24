// src/scripts/search.ts
function initializeCustomSearch() {
      // Get all necessary HTML elements
      const desktopInput = document.getElementById(
            "search-input"
      ) as HTMLInputElement;
      const modalInput = document.getElementById(
            "modal-search-input"
      ) as HTMLInputElement;
      const triggerBtn = document.getElementById("search-trigger-btn");
      const closeBtn = document.getElementById("search-close-btn");
      const modal = document.getElementById("search-modal");
      const resultsContainer = document.getElementById(
            "search-results-container"
      );

      if (!modal || !resultsContainer || !modalInput || !closeBtn) return;

      // State for Fuse.js
      let fuse: any = null;
      let isLoading = false;
      let cleanupFocusTrap: (() => void) | null = null;

      // Function to load search data and initialize Fuse.js
      async function loadSearchData() {
            if (fuse || isLoading) return;
            isLoading = true;
            try {
                  const response = await fetch("/search-index.json");
                  const searchData = await response.json();
                  const Fuse = (
                        await import(
                              "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs"
                        )
                  ).default;
                  fuse = new Fuse(searchData, {
                        keys: [
                              { name: "title", weight: 0.7 },
                              { name: "description", weight: 0.3 },
                        ],
                        includeScore: true,
                        threshold: 0.4,
                  });
            } catch (e) {
                  console.error("Failed to load search index or Fuse.js:", e);
                  if (resultsContainer)
                        resultsContainer.innerHTML = `<p class="text-center text-red-500 py-8">Search failed to load.</p>`;
            } finally {
                  isLoading = false;
            }
      }

      // Pre-load search data on interaction
      desktopInput?.addEventListener("focus", loadSearchData, { once: true });
      triggerBtn?.addEventListener("click", loadSearchData, { once: true });

      // Function to perform the search and render results
      let debounceTimer: number;
      function performSearch() {
            if (!fuse) {
                  if (resultsContainer)
                        resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Loading search index...</p>`;
                  loadSearchData();
                  return;
            }
            const query = modalInput.value;
            if (query.length < 2) {
                  if (resultsContainer)
                        resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">Start typing to see results.</p>`;
                  return;
            }
            const results = fuse.search(query);
            if (results.length === 0) {
                  if (resultsContainer)
                        resultsContainer.innerHTML = `<p class="text-center text-gray-500 py-8">No results found for "<strong>${query}</strong>"</p>`;
                  return;
            }
            let html = '<ul class="space-y-4 list-none pl-0">';
            for (const result of results.slice(0, 20)) {
                  const note = result.item;
                  html += `
                        <li>
                              <a href="${note.url}" class="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group hover:border-blue-500 dark:hover:border-blue-500">
                                    <h2 class="text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">${note.title}</h2>
                                    <p class="text-gray-600 dark:text-gray-400 mt-1">${note.description}</p>
                              </a>
                        </li>`;
            }
            html += "</ul>";
            if (resultsContainer) resultsContainer.innerHTML = html;
      }

      // Modal handling and Event Listeners
      function openModal() {
            modal?.classList.remove("hidden");
            document.body.style.overflow = "hidden";
            modalInput.focus();
            if (modalInput.value.length > 1) {
                  performSearch();
            }
            // Activate focus trap
            if (modal) {
                  const dialog = modal.querySelector(
                        '[role="dialog"]'
                  ) as HTMLElement;
                  if (dialog) cleanupFocusTrap = focusTrap(dialog, true);
            }
      }

      function closeModal() {
            modal?.classList.add("hidden");
            document.body.style.overflow = "";
            // Deactivate focus trap
            cleanupFocusTrap?.();
            cleanupFocusTrap = null;
      }

      desktopInput?.addEventListener("focus", openModal);
      triggerBtn?.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);
      modalInput.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(performSearch, 200);
      });
      modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
      });
      document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !modal.classList.contains("hidden")) {
                  closeModal();
            }
      });
}

// Reusable focus trap for the modal
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
                  if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                  }
            } else {
                  if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                  }
            }
      }
      node.addEventListener("keydown", handleKeyDown);
      return () => node.removeEventListener("keydown", handleKeyDown);
}

if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeCustomSearch);
} else {
      initializeCustomSearch();
}
