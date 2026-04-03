export const questions = [
  // ── Core type questions (1–9) ── answers map to W | S | P | B
  {
    id: 1,
    question: "When you first wake up, how does your body feel?",
    options: [
      { label: "Already buzzing — like my brain turned on before my alarm", code: "W" },
      { label: "Heavy, foggy, like I'm underwater", code: "S" },
      { label: "Totally different day to day — sometimes wired, sometimes dead", code: "P" },
      { label: "Stiff and tight, but functional enough to get moving", code: "B" },
    ],
  },
  {
    id: 2,
    question: "What's your relationship with caffeine?",
    options: [
      { label: "I need it but it makes me jittery or anxious", code: "W" },
      { label: "It barely does anything for me anymore", code: "S" },
      { label: "Some days it helps, some days it wrecks me", code: "P" },
      { label: "I depend on it quietly — without it I'm just slightly worse", code: "B" },
    ],
  },
  {
    id: 3,
    question: "Something unexpected happens — a confrontation, bad news, a sudden change of plans. What's your gut reaction?",
    options: [
      { label: "Heart races, chest tightens, I spiral fast", code: "W" },
      { label: "I freeze or go blank — like my brain shuts off", code: "S" },
      { label: "I overreact in the moment, then crash hard after", code: "P" },
      { label: "I hold it together externally but feel it lodged in my body", code: "B" },
    ],
  },
  {
    id: 4,
    question: "How would you describe your sleep?",
    options: [
      { label: "I can't fall asleep — my mind won't stop running", code: "W" },
      { label: "I sleep a lot but never feel rested", code: "S" },
      { label: "Totally inconsistent — some nights I'm out cold, some nights I'm up until 4am", code: "P" },
      { label: "I fall asleep fine but wake up clenching my jaw or with tight shoulders", code: "B" },
    ],
  },
  {
    id: 5,
    question: "What happens to your digestion when you're stressed?",
    options: [
      { label: "Acid reflux, nausea, loss of appetite", code: "W" },
      { label: "Everything slows down — bloating, constipation", code: "S" },
      { label: "It swings between extremes — can't eat, then binge", code: "P" },
      { label: "Low-grade discomfort I've mostly learned to ignore", code: "B" },
    ],
  },
  {
    id: 6,
    question: "When you try to relax — like genuinely do nothing — what happens?",
    options: [
      { label: "I physically can't — my leg bounces, I grab my phone, my mind races", code: "W" },
      { label: "I go numb or dissociate — it doesn't feel like relaxation, it feels like nothing", code: "S" },
      { label: "I feel guilty, restless, or anxious — then eventually collapse into it", code: "P" },
      { label: "My body stays tense even if my mind calms down", code: "B" },
    ],
  },
  {
    id: 7,
    question: "How emotionally reactive are you day to day?",
    options: [
      { label: "Very — small things set me off, I feel everything at high volume", code: "W" },
      { label: "Low — I feel detached or flat, like emotions are behind glass", code: "S" },
      { label: "It comes in waves — I'm fine for days then I break down over nothing", code: "P" },
      { label: "I suppress it well, but it leaks out — irritability, impatience, snapping", code: "B" },
    ],
  },
  {
    id: 8,
    question: "What does 3pm feel like for you?",
    options: [
      { label: "Wired but unproductive — lots of energy, no focus", code: "W" },
      { label: "Completely gone — I hit a wall I can't push through", code: "S" },
      { label: "Unpredictable — sometimes I get a second wind, sometimes I'm done", code: "P" },
      { label: "A dull, grinding fatigue I push through with willpower", code: "B" },
    ],
  },
  {
    id: 9,
    question: "Which statement hits closest to home?",
    options: [
      { label: "I feel like I'm running from something but I don't know what", code: "W" },
      { label: "I feel disconnected from my own life", code: "S" },
      { label: "I feel like I'm on a rollercoaster I can't get off", code: "P" },
      { label: "I'm slowly grinding down and nobody notices", code: "B" },
    ],
  },

  // ── Trigger subtype questions (10–14) ── answers map to ST | PL | DE
  {
    id: 10,
    question: "When did this start feeling like your normal?",
    options: [
      { label: "After I moved, started a new job, or changed my environment", code: "ST" },
      { label: "Honestly, as long as I can remember — maybe since childhood", code: "PL" },
      { label: "After a period where I was pushing way too hard without recovery", code: "DE" },
    ],
  },
  {
    id: 11,
    question: "What makes your worst symptoms flare up?",
    options: [
      { label: "Overstimulating environments — noise, crowds, screens, social overload", code: "ST" },
      { label: "Emotional triggers — conflict, rejection, feeling unseen, pressure to perform", code: "PL" },
      { label: "Physical neglect — bad sleep, skipping meals, overtraining, or not moving at all", code: "DE" },
    ],
  },
  {
    id: 12,
    question: "When you've had a rare 'good day,' what was different?",
    options: [
      { label: "I had less input — fewer screens, fewer people, more quiet", code: "ST" },
      { label: "I felt emotionally safe — no performance pressure, no judgment", code: "PL" },
      { label: "I slept well, ate well, and didn't push myself beyond my limit", code: "DE" },
    ],
  },
  {
    id: 13,
    question: "What does your body do when you're NOT actively doing something?",
    options: [
      { label: "I reach for stimulation — phone, food, noise, anything", code: "ST" },
      { label: "I run mental loops — replaying conversations, planning for threats, rehearsing", code: "PL" },
      { label: "I crash — my body takes any stillness as permission to collapse", code: "DE" },
    ],
  },
  {
    id: 14,
    question: "If someone could fix one thing about your life overnight, what would help most?",
    options: [
      { label: "A quieter, simpler environment with less coming at me", code: "ST" },
      { label: "Releasing the version of myself I've been performing for years", code: "PL" },
      { label: "Actual physical restoration — deep sleep, nourishment, and real recovery", code: "DE" },
    ],
  },
];

// Returns the mode of an array of codes; ties fall back to the given default.
function mode(codes, tieDefault) {
  const counts = {};
  for (const c of codes) counts[c] = (counts[c] ?? 0) + 1;
  const max = Math.max(...Object.values(counts));
  const winners = Object.keys(counts).filter((k) => counts[k] === max);
  return winners.length === 1 ? winners[0] : tieDefault;
}

// answers: { [questionId]: code }  e.g. { 1: "W", 10: "ST", ... }
// returns a result code string like "W-ST"
export function computeResultCode(answers) {
  const coreCodes = questions
    .filter((q) => q.id <= 9)
    .map((q) => answers[q.id])
    .filter(Boolean);

  const subtypeCodes = questions
    .filter((q) => q.id >= 10)
    .map((q) => answers[q.id])
    .filter(Boolean);

  const coreType    = mode(coreCodes,    "P");
  const triggerType = mode(subtypeCodes, "DE");

  return `${coreType}-${triggerType}`;
}
