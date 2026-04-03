const content = {
  privacy: {
    title: "Privacy Policy",
    body: `We collect minimal data to improve your experience. We use cookies for analytics and advertising purposes only with your consent. We do not sell your personal information to third parties. By using this site, you agree to the collection of anonymized usage data. You may opt out at any time by clearing your browser cookies and declining consent when prompted.`,
  },
  terms: {
    title: "Terms of Service",
    body: `By accessing this site, you agree to use it for lawful purposes only. The quiz and its results are provided for educational and informational purposes only. We make no warranties, express or implied, about the accuracy or completeness of any content on this site. We reserve the right to modify or discontinue this service at any time without notice.`,
  },
  disclaimer: {
    title: "Disclaimer",
    body: `This quiz and all associated content are for educational purposes only. The results do not constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this site.`,
  },
};

export default function PlaceholderPage({ page, onBack }) {
  const { title, body } = content[page] ?? {
    title: "Page Not Found",
    body: "This page does not exist.",
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-6 py-24 animate-fade-up">
      <div className="max-w-xl w-full mx-auto space-y-8">
        <button
          onClick={onBack}
          className="text-brand-muted text-sm font-light hover:text-brand-text transition-colors"
        >
          ← Back
        </button>

        <div className="space-y-6">
          <h1
            className="text-3xl sm:text-4xl font-semibold text-brand-text tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          <div className="h-px bg-brand-border" />
          <p className="text-brand-muted font-light leading-relaxed text-base">
            {body}
          </p>
          <p className="text-brand-muted text-sm font-light border border-brand-border rounded-lg px-4 py-3">
            This is a placeholder page. Full legal copy will be added before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
