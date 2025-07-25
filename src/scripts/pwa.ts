// src/scripts/pwa.ts
import { registerSW } from "virtual:pwa-register";

function initPwaPrompt() {
      console.log("[PWA] Initializing PWA script for auto-update.");
      const pwaToast = document.querySelector<HTMLDivElement>("#pwa-toast");
      if (!pwaToast) {
            console.warn("[PWA] Toast element not found.");
            return;
      }

      const pwaToastMessage =
            pwaToast.querySelector<HTMLDivElement>("#toast-message");
      const pwaCloseBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-close");

      if (!pwaToastMessage || !pwaCloseBtn) {
            console.warn("[PWA] Toast message or close button not found.");
            return;
      }

      const hidePwaToast = () => {
            pwaToast.classList.remove("pwa-ready");
      };

      const showOfflineReadyToast = () => {
            console.log("[PWA] App is ready for offline use.");
            pwaToastMessage.innerHTML = "App ready to work offline.";
            pwaToast.classList.add("pwa-ready");
            setTimeout(hidePwaToast, 5000);
      };

      pwaCloseBtn.addEventListener("click", hidePwaToast);

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

if (document.readyState === "complete") {
      initPwaPrompt();
} else {
      window.addEventListener("load", initPwaPrompt);
}
