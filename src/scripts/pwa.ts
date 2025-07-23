// src/scripts/pwa.ts
import { registerSW } from "virtual:pwa-register";

function initPwaPrompt() {
      console.log("[PWA] Initializing PWA prompt script.");
      const pwaToast = document.querySelector<HTMLDivElement>("#pwa-toast");
      if (!pwaToast) return;

      const pwaToastMessage =
            pwaToast.querySelector<HTMLDivElement>("#toast-message");
      const pwaCloseBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-close");
      const pwaRefreshBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-refresh");

      if (!pwaToastMessage || !pwaCloseBtn || !pwaRefreshBtn) return;

      let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

      // --- NEW, SIMPLER REFRESH LOGIC ---
      const refreshCallback = () => {
            console.log("[PWA] Refresh button clicked.");
            if (updateSW) {
                  // Set a flag in sessionStorage so we know an update was triggered
                  sessionStorage.setItem("pwa_update_triggered", "true");

                  // Tell the new service worker to take over, and then reload the page.
                  // The `registerSW` library handles the skipWaiting message and reload.
                  updateSW(true);
            }
      };

      const hidePwaToast = () => {
            console.log("[PWA] Hiding toast.");
            pwaToast.classList.remove("pwa-ready", "pwa-need-refresh");
            pwaRefreshBtn.removeEventListener("click", refreshCallback);
      };

      const showPwaToast = (isOfflineReady: boolean) => {
            console.log(
                  `[PWA] Showing toast. isOfflineReady: ${isOfflineReady}`
            );
            if (isOfflineReady) {
                  pwaToastMessage.innerHTML = "App ready to work offline";
                  pwaToast.classList.add("pwa-ready");
            } else {
                  pwaToastMessage.innerHTML =
                        "New content available, click reload to update.";
                  pwaToast.classList.add("pwa-ready", "pwa-need-refresh");
                  pwaRefreshBtn.addEventListener("click", refreshCallback);
            }
      };

      pwaCloseBtn.addEventListener("click", hidePwaToast);

      updateSW = registerSW({
            onNeedRefresh() {
                  console.log("[PWA] Event: onNeedRefresh");
                  showPwaToast(false);
            },
            onOfflineReady() {
                  console.log("[PWA] Event: onOfflineReady");
                  showPwaToast(true);
            },
            onRegisteredSW(swScriptUrl) {
                  console.log("PWA Service Worker registered:", swScriptUrl);
            },
            onRegisterError(error) {
                  console.error(
                        "PWA Service Worker registration error:",
                        error
                  );
            },
      });

      // --- NEW: CHECK FOR UPDATE FLAG ON PAGE LOAD ---
      // This provides the user with immediate feedback after the reload.
      if (sessionStorage.getItem("pwa_update_triggered") === "true") {
            console.log(
                  "[PWA] Update was triggered. Hiding any visible toasts and resetting flag."
            );
            hidePwaToast();
            sessionStorage.removeItem("pwa_update_triggered");
      }
}

// Ensure the DOM is loaded before we try to find our elements
if (document.readyState === "complete") {
      initPwaPrompt();
} else {
      window.addEventListener("load", initPwaPrompt);
}
