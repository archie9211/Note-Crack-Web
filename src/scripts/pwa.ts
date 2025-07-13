// src/scripts/pwa.ts
import { registerSW } from "virtual:pwa-register";

function initPwaPrompt() {
      console.log("[PWA] Initializing PWA prompt script.");
      const pwaToast = document.querySelector<HTMLDivElement>("#pwa-toast");
      if (!pwaToast) {
            console.error("[PWA] Toast element not found. Exiting.");
            return;
      }

      const pwaToastMessage =
            pwaToast.querySelector<HTMLDivElement>("#toast-message");
      const pwaCloseBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-close");
      const pwaRefreshBtn =
            pwaToast.querySelector<HTMLButtonElement>("#pwa-refresh");

      if (!pwaToastMessage || !pwaCloseBtn || !pwaRefreshBtn) {
            console.error(
                  "[PWA] One or more toast sub-elements not found. Exiting."
            );
            return;
      }

      let newWorker: ServiceWorker | null = null;
      let refreshing = false;

      // This function sends a message to the waiting service worker to activate itself.
      const skipWaiting = () => {
            if (newWorker) {
                  console.log(
                        "[PWA] Sending skipWaiting message to new service worker."
                  );
                  newWorker.postMessage({ type: "SKIP_WAITING" });
            }
      };

      const refreshCallback = () => {
            console.log("[PWA] Refresh button clicked.");
            if (refreshing) {
                  console.log("[PWA] Already refreshing, ignoring click.");
                  return;
            }
            refreshing = true;
            console.log("[PWA] Setting refreshing flag to true.");

            // We MUST listen for the controller change BEFORE we ask the worker to skip waiting.
            navigator.serviceWorker.addEventListener(
                  "controllerchange",
                  () => {
                        console.log(
                              "[PWA] Controller changed! New service worker is active. Reloading page."
                        );
                        window.location.reload();
                  },
                  { once: true }
            );

            // Now, trigger the skipWaiting message.
            skipWaiting();
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

      registerSW({
            immediate: true,
            onOfflineReady() {
                  console.log("[PWA] Event: onOfflineReady");
                  showPwaToast(true);
            },
            onNeedRefresh() {
                  console.log("[PWA] Event: onNeedRefresh");
                  showPwaToast(false);
            },
            onRegistered(registration) {
                  console.log("PWA Service Worker registered.");
                  if (registration) {
                        // This is where we capture the new, waiting service worker.
                        registration.addEventListener("updatefound", () => {
                              newWorker = registration.installing!;
                              console.log(
                                    "[PWA] Update found. New worker is installing."
                              );
                        });

                        // Periodic update check
                        setInterval(() => {
                              console.log("[PWA] Checking for updates...");
                              registration.update();
                        }, 24 * 60 * 60 * 1000); // 24 hours
                  }
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
