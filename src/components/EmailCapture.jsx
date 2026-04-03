import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value) {
  return EMAIL_RE.test(value.trim());
}

// resultCode is like "W-ST" — split into parts for the API
function parseResultCode(code) {
  if (!code) return { coreType: null, triggerSubtype: null };
  const [coreType, triggerSubtype] = code.split("-");
  return { coreType, triggerSubtype };
}

export default function EmailCapture({ resultCode, onSubmit, onSkip }) {
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [touched, setTouched]   = useState(false);

  const valid = isValidEmail(email);

  function handleChange(e) {
    setEmail(e.target.value);
    if (error) setError("");
  }

  function handleBlur() {
    if (email && !valid) setError("Please enter a valid email address.");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);

    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!valid)        { setError("Please enter a valid email address."); return; }

    setLoading(true);
    setError("");

    const { coreType, triggerSubtype } = parseResultCode(resultCode);

    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          coreType,
          triggerSubtype,
          fullResult: resultCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Success — advance to results
      onSubmit({ email: email.trim() });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-6 py-16 animate-fade-up">
      <div className="max-w-md w-full mx-auto space-y-10">

        {/* Copy */}
        <div className="space-y-4">
          <h1
            className="text-3xl sm:text-4xl font-semibold text-brand-text leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your results are ready.
          </h1>
          <p className="text-brand-muted font-light text-base leading-relaxed">
            Enter your email to see your personalized Nervous System Profile —
            including what's happening in your body and why your current
            approach isn't working.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <div
              className={[
                "flex items-center bg-brand-surface border rounded-xl overflow-hidden transition-all duration-200",
                error
                  ? "border-red-500/60 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
                  : valid
                  ? "border-brand-sage/60 shadow-[0_0_0_1px_rgba(124,154,130,0.2)]"
                  : "border-brand-border focus-within:border-brand-sage/50 focus-within:shadow-[0_0_0_1px_rgba(124,154,130,0.2)]",
              ].join(" ")}
            >
              <input
                type="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                disabled={loading}
                className="flex-1 bg-transparent px-5 py-4 text-brand-text placeholder-brand-muted/50 text-base font-light focus:outline-none disabled:opacity-50"
              />
              {valid && !loading && (
                <span className="pr-4 text-brand-sage text-lg select-none">✓</span>
              )}
              {loading && (
                <span className="pr-4 flex-shrink-0">
                  <Spinner />
                </span>
              )}
            </div>

            {error && (
              <p className="text-red-400 text-sm font-light pl-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || (touched && !valid)}
            className={[
              "w-full py-4 rounded-xl text-white font-medium text-base transition-all duration-200",
              valid && !loading
                ? "bg-brand-sage hover:bg-brand-sage-hover hover:shadow-lg hover:shadow-brand-sage/20 hover:-translate-y-0.5 cursor-pointer"
                : "bg-brand-sage/50 cursor-default",
            ].join(" ")}
          >
            {loading ? "Saving your results…" : "See My Results"}
          </button>

          <p className="text-center text-brand-muted text-xs font-light leading-relaxed">
            We'll send your full profile breakdown to this email.
            No spam, unsubscribe anytime.
          </p>
        </form>

        {/* Skip */}
        <div className="text-center">
          <button
            onClick={onSkip}
            disabled={loading}
            className="text-brand-muted text-sm font-light hover:text-brand-text transition-colors underline underline-offset-2 decoration-brand-border disabled:opacity-40"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin text-brand-sage"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
