// ── In-memory rate limiter ──────────────────────────────────────────────────
// Resets on cold start. Fine for basic abuse protection.
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function getClientIP(event) {
  return (
    event.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    event.headers["client-ip"] ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ── Validation ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CORE_TYPES = ["W", "S", "P", "B"];
const VALID_SUBTYPES = ["ST", "PL", "DE"];

// ── Helpers ─────────────────────────────────────────────────────────────────
function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// ── Handler ─────────────────────────────────────────────────────────────────
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  // Rate limit
  const ip = getClientIP(event);
  if (isRateLimited(ip)) {
    return json(429, { error: "Too many requests. Please try again in a minute." });
  }

  // Parse body
  let body;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  const { email, coreType, triggerSubtype, fullResult } = body;

  // Validate fields
  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { error: "A valid email address is required." });
  }
  if (!VALID_CORE_TYPES.includes(coreType)) {
    return json(400, { error: "Invalid core type." });
  }
  if (!VALID_SUBTYPES.includes(triggerSubtype)) {
    return json(400, { error: "Invalid trigger subtype." });
  }

  // Require API key
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error("MAILERLITE_API_KEY environment variable is not set.");
    return json(500, { error: "Server configuration error." });
  }

  // Map core type → MailerLite group ID (set these in Netlify env vars)
  const groupEnvMap = {
    W: process.env.MAILERLITE_GROUP_W,
    S: process.env.MAILERLITE_GROUP_S,
    P: process.env.MAILERLITE_GROUP_P,
    B: process.env.MAILERLITE_GROUP_B,
  };
  const groupId = groupEnvMap[coreType];

  // Build MailerLite subscriber payload
  const payload = {
    email,
    fields: {
      nervous_system_profile: fullResult ?? `${coreType}-${triggerSubtype}`,
      core_type: coreType,
      trigger_subtype: triggerSubtype,
    },
    ...(groupId ? { groups: [groupId] } : {}),
  };

  // POST to MailerLite
  let mlResponse;
  try {
    mlResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("MailerLite fetch failed:", err);
    return json(500, { error: "Failed to save your email. Please try again." });
  }

  // MailerLite returns 200 (existing subscriber updated) or 201 (created)
  if (mlResponse.status !== 200 && mlResponse.status !== 201) {
    const errorBody = await mlResponse.json().catch(() => ({}));
    console.error("MailerLite API error:", mlResponse.status, errorBody);
    return json(500, { error: "Failed to save your email. Please try again." });
  }

  return json(200, { success: true });
}
