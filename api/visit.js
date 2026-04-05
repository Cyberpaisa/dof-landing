export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.json({ total: null });
  }

  const cookies = req.headers.cookie || '';
  const hasVisited = cookies.split(';').some(c => c.trim().startsWith('dof_visitor='));

  res.setHeader('Set-Cookie', 'dof_visitor=1; Max-Age=86400; Path=/; SameSite=Strict');

  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({ url, token });

    if (!hasVisited) {
      const total = await redis.incr('dofmesh:visits');
      const today = new Date().toISOString().split('T')[0];
      await redis.incr(`dofmesh:visits:${today}`);
      return res.json({ total, counted: true });
    } else {
      const total = await redis.get('dofmesh:visits');
      return res.json({ total, counted: false });
    }
  } catch {
    return res.json({ total: null });
  }
}
