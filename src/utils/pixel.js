const CONSENT_KEY = "cookie_consent";

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function isLoaded() {
  return typeof window.fbq === "function";
}

function getPixelId() {
  return import.meta.env.VITE_META_PIXEL_ID;
}

// Programmatically inject the fbevents.js script and set up the fbq stub.
// Equivalent to the standard Meta Pixel base code, written readably.
function loadScript() {
  if (window.fbq) return;

  const fbq = function (...args) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  window.fbq = window._fbq = fbq;
  fbq.push    = fbq;
  fbq.loaded  = true;
  fbq.version = "2.0";
  fbq.queue   = [];

  const script   = document.createElement("script");
  script.async   = true;
  script.src     = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

/**
 * Initialize the Meta Pixel.
 * - No-op if the user has not accepted cookies.
 * - No-op if the pixel has already been loaded.
 * - No-op if VITE_META_PIXEL_ID is not set.
 * Fires PageView automatically on init (standard Meta behavior).
 */
export function initPixel() {
  const pixelId = getPixelId();
  if (!pixelId || !hasConsent() || isLoaded()) return;

  loadScript();
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

/**
 * Fire the Lead event.
 * Called when the user submits their email on the capture screen.
 */
export function trackLead() {
  if (!isLoaded()) return;
  window.fbq("track", "Lead");
}

/**
 * Fire the ViewContent event.
 * Called when the user lands on the results screen.
 * @param {string} resultCode  e.g. "W-ST"
 */
export function trackViewContent(resultCode) {
  if (!isLoaded()) return;
  window.fbq("track", "ViewContent", {
    content_name:     resultCode,
    content_category: "nervous_system_profile",
  });
}
