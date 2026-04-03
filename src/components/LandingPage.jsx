import CookieConsent from "./CookieConsent";

const symptoms = [
  "You're exhausted but you can't sleep.",
  "Coffee used to help. Now it makes you anxious.",
  "You can't relax even when nothing is wrong.",
  "You snap at people you love over nothing.",
  "Your digestion falls apart when you're stressed.",
  "You feel like you're slowly grinding down and nobody notices.",
];

export default function LandingPage({ onStart, onNav }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-2xl w-full mx-auto space-y-14 animate-fade-up">

          {/* Headline */}
          <div className="space-y-6">
            <h1
              className="text-4xl sm:text-5xl font-semibold text-brand-text leading-tight tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Your habits aren't the problem.
              <br />
              <span className="text-brand-sage">Your nervous system is.</span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-muted font-light leading-relaxed max-w-xl">
              Take this free 2-minute quiz to discover which of the 12 nervous system
              profiles is keeping you stuck — and why everything you've tried hasn't worked.
            </p>
          </div>

          {/* Symptom stack */}
          <div className="space-y-3 border-l border-brand-border pl-6">
            {symptoms.map((line, i) => (
              <p
                key={i}
                className="text-brand-text text-base sm:text-lg font-light leading-snug"
                style={{
                  opacity: 1 - i * 0.07,
                  animationDelay: `${0.1 + i * 0.07}s`,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <button
              onClick={onStart}
              className="bg-brand-sage hover:bg-brand-sage-hover text-white font-medium text-base px-10 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-sage/20 hover:-translate-y-0.5"
            >
              Take the Free Quiz
            </button>
            <p className="text-brand-muted text-sm font-light">
              Takes 2 minutes. No signup required to start.
            </p>
          </div>
        </div>
      </main>

      {/* Disclaimer */}
      <div className="px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-brand-muted text-xs font-light leading-relaxed text-center border-t border-brand-border pt-6">
            This is an educational tool, not a medical diagnosis. It is not a substitute
            for professional medical advice. Consult a healthcare provider before making
            changes to your health routine.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 pb-8">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-6">
          {[
            { label: "Privacy Policy", screen: "privacy" },
            { label: "Terms of Service", screen: "terms" },
            { label: "Disclaimer", screen: "disclaimer" },
          ].map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => onNav(screen)}
              className="text-brand-muted text-xs font-light hover:text-brand-text transition-colors underline underline-offset-2 decoration-brand-border"
            >
              {label}
            </button>
          ))}
        </div>
      </footer>

      {/* Cookie consent */}
      <CookieConsent />
    </div>
  );
}
