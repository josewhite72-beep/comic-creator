export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, grade, phase, context, panelCount } = req.body;

  if (!topic) return res.status(400).json({ error: 'Missing topic' });

  const count = panelCount || 6;
  const contextSection = context ? `\nLesson plan context:\n${context}\n` : '';

  const prompt = `You are an ESL comic strip writer for Panama's MEDUCA English curriculum using the Activity-Oriented Approach (AOA).
Create a ${count}-panel comic strip for the "${phase}" phase.
Topic/Theme: "${topic}"
Level: ${grade}
${contextSection}
Return ONLY a valid JSON array with exactly ${count} objects. No markdown, no code fences, no extra text, no trailing commas.

Each object:
{
  "panel": <number 1-${count}>,
  "caption": <string or null>,
  "speech": ["line 1", "line 2 or null"],
  "scene": "one sentence describing what happens visually"
}

Rules:
- Speech bubbles: max 7 words each, vocabulary appropriate for ${grade}
- For Warm-up: introduce key vocabulary naturally in context
- For Presentation: model the target language structure clearly in dialogue
- For Practice: use repetition and controlled practice of target structure
- For Reading: include short readable sentences (slightly longer than other phases)
- Characters: use Panamanian names (Carlos, María, Sofía, Diego, Miss Rivera, Mr. López)
- Make it fun and relevant for Panamanian students ages 4-12
- If only 1 speech line is needed, use null as the second
- caption is a narrator box at the top of the panel (use sparingly)
- Output must be syntactically valid JSON — double-check quotes, commas and brackets before responding`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'DeepSeek API error' });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const finishReason = data.choices?.[0]?.finish_reason;

    const panels = parsePanelsJSON(raw, count);

    if (!panels) {
      return res.status(502).json({
        error: 'AI returned invalid JSON' + (finishReason === 'length' ? ' (response was cut off — try fewer panels or shorter context)' : '') + '. Please try again.'
      });
    }

    return res.status(200).json({ panels });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// ===== ROBUST JSON PARSER WITH AUTO-REPAIR =====
function parsePanelsJSON(raw, expectedCount) {
  let clean = raw.replace(/```json|```/g, '').trim();

  // Try direct parse first
  try {
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    // fall through to repair attempts
  }

  // Repair attempt 1: extract the array bounds even if trailing content is broken
  const startIdx = clean.indexOf('[');
  if (startIdx === -1) return null;
  let candidate = clean.slice(startIdx);

  // Remove trailing commas before } or ]
  candidate = candidate.replace(/,\s*([}\]])/g, '$1');

  try {
    const parsed = JSON.parse(candidate);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    // fall through
  }

  // Repair attempt 2: response was truncated mid-array.
  // Find the last complete object (ends with "}") and close the array there.
  const lastCompleteObjEnd = candidate.lastIndexOf('}');
  if (lastCompleteObjEnd === -1) return null;

  let truncated = candidate.slice(0, lastCompleteObjEnd + 1);
  // Balance: count "{" vs "}" up to this point, trim any dangling comma, close array
  truncated = truncated.replace(/,\s*$/, '');
  truncated += ']';

  try {
    const parsed = JSON.parse(truncated);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    // fall through
  }

  // Repair attempt 3: parse object-by-object using regex, skip malformed ones
  const objMatches = candidate.match(/\{[^{}]*\}/g);
  if (objMatches && objMatches.length > 0) {
    const recovered = [];
    for (const m of objMatches) {
      try {
        const obj = JSON.parse(m.replace(/,\s*}/g, '}'));
        recovered.push(obj);
      } catch (e) {
        // skip broken object
      }
    }
    if (recovered.length > 0) return recovered;
  }

  return null;
}
