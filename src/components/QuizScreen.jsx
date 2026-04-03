import { useState, useEffect, useRef } from "react";
import { questions } from "../data/questions";

export default function QuizScreen({ onAnswer, onComplete }) {
  const [index, setIndex]           = useState(0);
  const [selected, setSelected]     = useState(null); // code of chosen option
  const [phase, setPhase]           = useState("in"); // "in" | "out"
  const locked                      = useRef(false);  // prevents double-clicks during transition

  const question     = questions[index];
  const progressPct  = (index / questions.length) * 100;
  const isLast       = index === questions.length - 1;

  // Reset to "in" whenever the question changes
  useEffect(() => {
    setPhase("in");
  }, [index]);

  function handleSelect(option) {
    if (locked.current) return;
    locked.current = true;
    setSelected(option.code);
    onAnswer(question.id, option.code);

    // Phase 1 — highlight the selected card briefly
    setTimeout(() => {
      setPhase("out");

      // Phase 2 — after fade-out, advance
      setTimeout(() => {
        if (isLast) {
          onComplete();
        } else {
          setSelected(null);
          setIndex((i) => i + 1);
          // phase resets to "in" via useEffect above
        }
        locked.current = false;
      }, 320); // fade-out duration
    }, 420); // highlight hold duration
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">

      {/* Progress bar */}
      <div className="w-full h-px bg-brand-border relative">
        <div
          className="absolute top-0 left-0 h-full bg-brand-sage transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Progress label */}
      <div className="px-6 pt-5 pb-0">
        <div className="max-w-2xl mx-auto">
          <span className="text-brand-muted text-xs font-light tracking-wide">
            Question {index + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Question + options */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12"
        style={{
          opacity:    phase === "in" ? 1 : 0,
          transform:  phase === "in" ? "translateY(0)" : "translateY(-8px)",
          transition: phase === "in"
            ? "opacity 0.32s ease, transform 0.32s ease"
            : "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <div className="max-w-2xl w-full mx-auto space-y-10">

          {/* Question text */}
          <h2
            className="text-2xl sm:text-3xl font-medium text-brand-text leading-snug text-center"
            style={{ letterSpacing: "-0.01em" }}
          >
            {question.question}
          </h2>

          {/* Answer options */}
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selected === option.code;
              return (
                <button
                  key={option.code}
                  onClick={() => handleSelect(option)}
                  className={[
                    "w-full text-left px-6 py-5 rounded-xl border text-base font-light leading-snug",
                    "transition-all duration-200",
                    isSelected
                      ? "border-brand-sage bg-brand-sage/10 text-brand-text shadow-[0_0_0_1px_#7c9a82]"
                      : "border-brand-border bg-brand-surface text-brand-muted hover:border-brand-sage/50 hover:text-brand-text hover:shadow-[0_0_0_1px_rgba(124,154,130,0.3)]",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom spacer so content sits slightly above center */}
      <div className="h-16" />
    </div>
  );
}
