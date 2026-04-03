import { useState, useEffect } from "react";
import { initPixel } from "../utils/pixel";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't compete with the page fade-in
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    initPixel();
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-brand-surface border-t border-brand-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-brand-muted text-sm font-light leading-relaxed flex-1">
            This site uses cookies for analytics and advertising. By continuing,
            you agree to our{" "}
            <span className="text-brand-text underline underline-offset-2 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="text-brand-muted text-sm font-light hover:text-brand-text transition-colors px-4 py-2"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="bg-brand-sage hover:bg-brand-sage-hover text-white text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
