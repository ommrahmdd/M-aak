import logo from "./assest/navLogo.png";

// Global fallback: any <img> that fails to load is replaced with the logo.
// "error" events don't bubble, so we listen in the capture phase on the document.
document.addEventListener(
  "error",
  (e) => {
    const el = e.target;
    if (!(el instanceof HTMLImageElement)) return;
    // Avoid an endless loop if the logo itself fails.
    if (el.dataset.fallbackApplied === "true") return;
    el.dataset.fallbackApplied = "true";
    el.removeAttribute("srcset");
    el.src = logo;
    el.style.objectFit = "contain";
  },
  true
);
