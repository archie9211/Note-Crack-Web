// src/scripts/pwa.ts
import { registerSW } from "virtual:pwa-register";

function initPwaPrompt() {
      console.log("[PWA] Initializing PWA script for auto-update.");
      const pwaToast = document.querySelector<HTMLDivElement>("#pwa-toast");
      if (!pwaToast) return;

      const pwaToastMessage =
            pwaToast.querySelector<HTMLDivElement>("#toast-message");
      const pwaCloseBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-close");

      if (!pwaToastMessage || !pwaCloseBtn) return;

      const hidePwaToast = () => {
            pwaToast.classList.remove("pwa-ready");
      };

      const showOfflineReadyToast = () => {
            console.log("[PWA] App is ready for offline use.");
            pwaToastMessage.innerHTML = "App ready to work offline.";
            pwaToast.classList.add("pwa-ready");
            // Automatically hide the toast after a few seconds
            setTimeout(hidePwaToast, 5000);
      };

      pwaCloseBtn.addEventListener("click", hidePwaToast);

      // With 'autoUpdate', we only need to handle onOfflineReady.
      // The onNeedRefresh logic is now handled automatically by the library.
      registerSW({
            onOfflineReady() {
                  console.log("[PWA] Event: onOfflineReady");
                  showOfflineReadyToast();
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
}

// Ensure the DOM is loaded before we try to find our elements
if (document.readyState === "complete") {
      initPwaPrompt();
} else {
      window.addEventListener("load", initPwaPrompt);
}
