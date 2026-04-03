import { useState, useEffect } from "react";
import LandingPage     from "./components/LandingPage";
import QuizScreen      from "./components/QuizScreen";
import EmailCapture    from "./components/EmailCapture";
import ResultsPage     from "./components/ResultsPage";
import PlaceholderPage from "./components/PlaceholderPage";
import { computeResultCode } from "./data/questions";
import { initPixel, trackLead, trackViewContent } from "./utils/pixel";

// Screens: 'landing' | 'quiz' | 'email' | 'results' | 'privacy' | 'terms' | 'disclaimer'
export default function App() {
  const [screen,     setScreen]     = useState("landing");
  const [prevScreen, setPrevScreen] = useState("landing");
  const [answers,    setAnswers]    = useState({});  // { [questionId]: code }
  const [resultCode, setResultCode] = useState(null); // e.g. "W-ST"
  const [userData,   setUserData]   = useState({ email: "", name: "" });

  // Init pixel on mount for returning visitors who already accepted cookies
  useEffect(() => { initPixel(); }, []);

  // Fire ViewContent whenever the results screen becomes active
  useEffect(() => {
    if (screen === "results" && resultCode) trackViewContent(resultCode);
  }, [screen, resultCode]);

  function goTo(next) {
    setPrevScreen(screen);
    setScreen(next);
  }

  function handleAnswer(questionId, code) {
    setAnswers((prev) => ({ ...prev, [questionId]: code }));
  }

  function handleQuizComplete() {
    // By the time onComplete fires (740ms after the last onAnswer call),
    // the component has re-rendered and 'answers' in this closure is current.
    setResultCode(computeResultCode(answers));
    goTo("email");
  }

  function handleEmailSubmit({ email, name }) {
    trackLead();
    setUserData({ email, name });
    goTo("results");
  }

  function handleEmailSkip() {
    goTo("results");
  }

  function handleRetake() {
    setAnswers({});
    setResultCode(null);
    setUserData({ email: "", name: "" });
    goTo("landing");
  }

  const legalScreens = ["privacy", "terms", "disclaimer"];
  if (legalScreens.includes(screen)) {
    return (
      <PlaceholderPage
        page={screen}
        onBack={() => setScreen(prevScreen || "landing")}
      />
    );
  }

  return (
    <>
      {screen === "landing" && (
        <LandingPage
          onStart={() => goTo("quiz")}
          onNav={(page) => goTo(page)}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          onAnswer={handleAnswer}
          onComplete={handleQuizComplete}
        />
      )}
      {screen === "email" && (
        <EmailCapture
          resultCode={resultCode}
          onSubmit={handleEmailSubmit}
          onSkip={handleEmailSkip}
        />
      )}
      {screen === "results" && (
        <ResultsPage
          resultCode={resultCode}
          email={userData.email}
          name={userData.name}
          onRetake={handleRetake}
        />
      )}
    </>
  );
}
