export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { topic, grade, phase, context, panelCount } = req.body;

  if (!topic) return res.status(400).json({ error: 'Missing topic' });

  const contextSection = context ? `\nLesson plan context:\n${context}\n` : '';

  const prompt = `You are an ESL comic strip writer for Panama's MEDUCA English curriculum using the Activity-Oriented Approach (AOA).
Create a ${panelCount || 6}-panel comic strip for the "${phase}" phase.
Topic/Theme: "${topic}"
Level: ${grade}
${contextSection}
Return ONLY a valid JSON array with exactly ${panelCount || 6} objects. No markdown, no code fences, no extra text.

Each object:
{
  "panel": <number 1-${panelCount || 6}>,
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
- caption is a narrator box at the top of the panel (use sparingly)`;

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
        max_tokens: 1200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'DeepSeek API error' });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    const panels = JSON.parse(clean);

    return res.status(200).json({ panels });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
