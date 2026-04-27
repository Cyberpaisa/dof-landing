
// --- ADVERSARIAL SECURITY HARDENING (APRIL 2026) ---
// Infrastructure: Vercel + Upstash Redis
// Policy: 10 messages/session, 15s Rate Limit, Origin Validation

const MAX_SESSION_MESSAGES = 10;
const RATE_LIMIT_MS = 15000;

export default async function handler(req, res) {
  // 1. Strict Origin Validation
  const origin = req.headers.origin || req.headers.referer || '';
  const isAllowed = origin.includes('dofmesh.com') || origin.includes('localhost') || origin.includes('vercel.app');
  
  res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : 'https://www.dofmesh.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  
  if (!isAllowed) {
    console.error('Unauthorized access attempt from:', origin);
    return res.status(403).json({ error: 'Sovereign territory. Origin denied.' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!apiKey) return res.status(500).json({ error: 'Core Provider Offline' });

  // 2. Persistent Redis Security Layer
  let redis = null;
  const ip = req.headers['x-forwarded-for'] || 'anonymous';
  const quotaKey = `dof:quota:${ip}`;
  const timeKey = `dof:last_seen:${ip}`;

  try {
    if (kvUrl && kvToken) {
      const { Redis } = await import('@upstash/redis');
      redis = new Redis({ url: kvUrl, token: kvToken });
    }
  } catch (e) {
    console.error('Redis Init Failed:', e);
  }

  if (redis) {
    const [count, lastTime] = await Promise.all([
      redis.get(quotaKey),
      redis.get(timeKey)
    ]);

    const now = Date.now();

    // Circuit Breaker (Quota)
    if (count && parseInt(count) >= MAX_SESSION_MESSAGES) {
      return res.status(429).json({ error: 'Global session quota exceeded. For high-volume access, contact @Cyber_paisa.' });
    }

    // Rate Limit
    if (lastTime && (now - parseInt(lastTime) < RATE_LIMIT_MS)) {
      await redis.incr(`dof:attacks:ratelimit:${ip}`); // Audit log
      return res.status(429).json({ error: 'Cooling down... Mathematics requires patience. Wait 15s.' });
    }

    // Update state asynchronously to not block
    await Promise.all([
      redis.incr(quotaKey),
      redis.set(timeKey, now),
      redis.expire(quotaKey, 86400), // Reset quota every 24h
      redis.expire(timeKey, 86400)
    ]);
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid payload' });

  // 3. Payload Depth & Size Protection
  if (messages.length > 20) return res.status(400).json({ error: 'Context depth exceeded' });
  const payloadSize = JSON.stringify(messages).length;
  if (payloadSize > 50000) return res.status(400).json({ error: 'Payload too large' });

  // 4. Upstream Call
  try {
    const upstream = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: true,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!upstream.ok) {
      const err = await upstream.text();
      return res.status(upstream.status).json({ error: 'Provider Error: ' + err });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
    res.end();

  } catch (e) {
    console.error('Upstream exception:', e);
    return res.status(500).json({ error: 'Security intervention active.' });
  }
}
