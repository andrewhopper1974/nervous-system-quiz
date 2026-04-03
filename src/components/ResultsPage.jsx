import { useState } from "react";
import { profiles } from "../data/profiles";

const GUMROAD_URL = "https://placeholder.gumroad.com/l/nervous-system-protocol"; // replace before launch

const WHAT_YOU_GET = [
  "Your complete nervous system profile and what it means",
  "A personalized daily protocol (morning, midday, evening practices)",
  "Trigger-specific strategies matched to your subtype",
  "A 7-day starter schedule you can begin tomorrow",
  "The science behind your pattern explained in plain language",
];

const SITE_URL = "https://yoursite.com"; // replace before launch

export default function ResultsPage({ resultCode, name, onRetake }) {
  const profile = profiles[resultCode];
  const firstName = name ? name.split(" ")[0] : null;
  const [copied, setCopied] = useState(false);

  // Fallback for unknown codes
  if (!profile) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-brand-muted">Result code not recognized: {resultCode}</p>
          <button onClick={onRetake} className="text-brand-sage underline text-sm">Retake the quiz</button>
        </div>
      </div>
    );
  }

  function handleShare() {
    const text = `I just found out I'm "${profile.name}." Take the free nervous system quiz:`;
    const url = SITE_URL;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  }

  function handleCopy() {
    navigator.clipboard.writeText(`${SITE_URL}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-16 animate-fade-up">

        {/* ── 1. PROFILE HEADER ── */}
        <header className="space-y-5 text-center">
          {firstName && (
            <p className="text-brand-muted text-sm font-light tracking-widest uppercase">
              {firstName}, your nervous system profile is
            </p>
          )}
          <h1
            className="text-3xl sm:text-4xl font-semibold text-brand-sage leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {profile.name}
          </h1>
          <p className="text-brand-text text-lg sm:text-xl font-light leading-relaxed max-w-xl mx-auto">
            {profile.tagline}
          </p>
          <div className="inline-block text-xs font-light tracking-widest uppercase text-brand-muted border border-brand-border px-4 py-1.5 rounded-full">
            Profile {resultCode}
          </div>
        </header>

        {/* ── 2. WHAT'S HAPPENING ── */}
        <Section heading="What's happening in your body">
          {profile.whatsHappening.map((p, i) => (
            <p key={i} className="text-brand-text font-light leading-relaxed text-base">
              {p}
            </p>
          ))}
        </Section>

        {/* ── 3. WHY NOTHING HAS WORKED ── */}
        <Section heading="Why nothing has worked">
          {profile.whyNothingWorked.map((p, i) => (
            <p key={i} className="text-brand-text font-light leading-relaxed text-base">
              {p}
            </p>
          ))}
        </Section>

        {/* ── 4. LOCKED PROTOCOL ── */}
        <div className="space-y-5">
          <SectionHeading>Your personalized reset protocol</SectionHeading>

          {/* Blurred content area */}
          <div className="relative rounded-2xl overflow-hidden border border-brand-border">
            {/* Placeholder "content" behind the blur */}
            <div className="p-8 space-y-4 select-none" aria-hidden="true">
              <p className="text-brand-text font-light text-sm leading-relaxed opacity-60">
                <span className="text-brand-sage font-medium">Morning reset (7–9am)</span><br />
                Begin with 4–7–8 breathing before checking your phone. This specific pattern activates your parasympathetic nervous system before the stimulus load begins. Follow with 10 minutes of...
              </p>
              <p className="text-brand-text font-light text-sm leading-relaxed opacity-60">
                <span className="text-brand-sage font-medium">Midday regulation (12–2pm)</span><br />
                Your cortisol naturally peaks in the late morning and begins to drop around noon. Use this window to do a 5-minute sensory reset: remove yourself from screens and high-input environments and...
              </p>
              <p className="text-brand-text font-light text-sm leading-relaxed opacity-60">
                <span className="text-brand-sage font-medium">Evening wind-down (8–10pm)</span><br />
                For your profile, the evening protocol is critical. Your trigger pattern means standard wind-down advice won't work. Instead, you need to specifically address...
              </p>
              <p className="text-brand-text font-light text-sm leading-relaxed opacity-60">
                <span className="text-brand-sage font-medium">Trigger-specific interventions</span><br />
                When you notice a flare — rapid heart rate, brain fog, emotional reactivity — use the following sequence specifically calibrated for your subtype...
              </p>
            </div>

            {/* Frosted overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center space-y-6"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(15, 15, 15, 0.55)",
              }}
            >
              <div className="space-y-2">
                <p className="text-brand-text font-medium text-lg">Your full protocol is ready.</p>
                <p className="text-brand-muted text-sm font-light max-w-xs">
                  Unlock your personalized morning, midday, and evening practices — matched to your exact profile.
                </p>
              </div>

              <div className="w-full max-w-xs space-y-3">
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-brand-sage hover:bg-brand-sage-hover text-white font-medium text-base py-4 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-brand-sage/20 hover:-translate-y-0.5"
                >
                  Unlock Your Full Protocol — $19
                </a>
                <p className="text-brand-muted text-xs font-light">
                  Instant digital download. 7-day money-back guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* What you'll get */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4">
            <p className="text-brand-text text-sm font-medium tracking-wide">What you'll get</p>
            <ul className="space-y-3">
              {WHAT_YOU_GET.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-sage text-sm mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-brand-muted text-sm font-light leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-brand-sage hover:bg-brand-sage-hover text-white font-medium text-sm py-3.5 rounded-xl text-center transition-all duration-200 hover:shadow-lg hover:shadow-brand-sage/20 mt-2"
            >
              Unlock Your Full Protocol — $19
            </a>
            <p className="text-center text-brand-muted text-xs font-light">
              Instant digital download. 7-day money-back guarantee.
            </p>
          </div>
        </div>

        {/* ── 5. DISCLAIMER ── */}
        <div className="border border-brand-border rounded-xl px-6 py-5">
          <p className="text-brand-muted text-xs font-light leading-relaxed text-center">
            This is an educational tool, not a medical diagnosis. The information provided is
            for general wellness education only. It is not a substitute for professional medical,
            psychological, or psychiatric advice. Always consult a qualified healthcare provider
            before making changes to your health routine.
          </p>
        </div>

        {/* ── 6. SHARE SECTION ── */}
        <div className="space-y-4 text-center">
          <p className="text-brand-muted text-sm font-light tracking-wide uppercase">Share your result</p>
          <p className="text-brand-text text-base font-light">
            Know someone who might recognize themselves in this?
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-sage/40 text-brand-text text-sm font-light px-5 py-3 rounded-xl transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-muted flex-shrink-0">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-brand-surface border border-brand-border hover:border-brand-sage/40 text-brand-text text-sm font-light px-5 py-3 rounded-xl transition-all duration-200"
            >
              {copied ? (
                <><span className="text-brand-sage text-sm">✓</span> Copied</>
              ) : (
                <><span className="text-brand-muted">⎘</span> Copy link</>
              )}
            </button>
          </div>
        </div>

        {/* Retake */}
        <div className="text-center pb-4">
          <button
            onClick={onRetake}
            className="text-brand-muted text-sm font-light hover:text-brand-text transition-colors underline underline-offset-2 decoration-brand-border"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-brand-sage text-xs font-medium tracking-widest uppercase">
      {children}
    </h2>
  );
}

function Section({ heading, children }) {
  return (
    <div className="space-y-5">
      <SectionHeading>{heading}</SectionHeading>
      <div className="h-px bg-brand-border" />
      <div className="space-y-4">{children}</div>
    </div>
  );
}
