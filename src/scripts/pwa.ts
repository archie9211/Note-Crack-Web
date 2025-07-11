// src/scripts/pwa.ts
import { registerSW } from "virtual:pwa-register";

function initPwaPrompt() {
      const pwaToast = document.querySelector<HTMLDivElement>("#pwa-toast");
      if (!pwaToast) return;

      const pwaToastMessage =
            pwaToast.querySelector<HTMLDivElement>("#toast-message")!;
      const pwaCloseBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-close")!;
      const pwaRefreshBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-refresh")!;

      let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

      const refreshCallback = () => refreshSW?.(true);

      const hidePwaToast = () => {
            pwaToast.classList.remove("pwa-ready", "pwa-need-refresh");
            pwaRefreshBtn.removeEventListener("click", refreshCallback);
      };

      const showPwaToast = (isOfflineReady: boolean) => {
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

      refreshSW = registerSW({
            immediate: true,
            onOfflineReady() {
                  showPwaToast(true);
            },
            onNeedRefresh() {
                  showPwaToast(false);
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
