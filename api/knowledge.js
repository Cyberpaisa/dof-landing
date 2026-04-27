// api/knowledge.js — Proxy a knowledge_api del DOF Pipeline
//
// Arquitectura:
//   dof-landing/app (Vercel) → este proxy → knowledge_api:19019 (local/tunnel)
//
// Si KNOWLEDGE_API_URL no está configurado → demo mode con datos estáticos
// (útil para showcasing sin exponer el knowledge_api local al público)

const DEMO_DATA = {
  reports: [
    {
      id: "demo-001",
      title: "DOF-MESH: Deterministic Observability Framework (demo)",
      source_url: "https://www.youtube.com/watch?v=demo",
      channel: "DOF Research",
      dof_score: 92,
      relevance: 0.95,
      key_ideas: [
        "Governance determinística sin LLM",
        "Z3 formal verification — 4/4 invariantes PROVEN",
        "On-chain attestations en 9 chains"
      ],
      technologies: ["Python", "Z3", "CrewAI", "Avalanche C-Chain"],
      status: "pending",
      processed_at: new Date().toISOString()
    },
    {
      id: "demo-002",
      title: "Evolution Engine — Self-Improving AI agents (demo)",
      source_url: "https://www.youtube.com/watch?v=demo",
      channel: "DOF Evolution",
      dof_score: 87,
      relevance: 0.88,
      key_ideas: [
        "AutoAgent loop: edit → run → measure",
        "Gene pool con 114 genes extraídos",
        "Fitness function multi-objetivo"
      ],
      technologies: ["Python", "genetic algorithms", "Ollama"],
      status: "approved",
      processed_at: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  stats: {
    total_processed: 42,
    pending: 3,
    approved: 35,
    rejected: 4,
    avg_dof_score: 78.5
  }
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const apiUrl = process.env.KNOWLEDGE_API_URL;
  const path = req.query.path || 'pending';

  // Security: only allow safe paths to be proxied
  const allowedPaths = ['pending', 'approved', 'stats'];
  if (!allowedPaths.includes(path)) {
    return res.status(403).json({ error: 'Path not allowed' });
  }

  // Demo mode: no hay backend configurado
  if (!apiUrl) {
    if (path === 'stats') {
      return res.json({ mode: 'demo', ...DEMO_DATA.stats });
    }
    if (path === 'approve' || path === 'reject') {
      return res.json({ mode: 'demo', ok: true, note: 'Demo mode — changes not persisted' });
    }
    return res.json({ mode: 'demo', reports: DEMO_DATA.reports, stats: DEMO_DATA.stats });
  }

  // Proxy real al knowledge_api
  try {
    const upstream = `${apiUrl.replace(/\/$/, '')}/${path}`;
    const method = req.method || 'GET';
    const init = { method, headers: { 'Content-Type': 'application/json' } };

    if (method === 'POST' && req.body) {
      init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const upstreamRes = await fetch(upstream, init);
    const contentType = upstreamRes.headers.get('content-type') || '';
    const body = contentType.includes('json') ? await upstreamRes.json() : await upstreamRes.text();

    res.status(upstreamRes.status);
    if (typeof body === 'object') {
      return res.json({ mode: 'proxy', ...body });
    }
    return res.send(body);
  } catch (err) {
    return res.status(502).json({
      mode: 'error',
      error: 'knowledge_api unreachable',
      detail: err.message,
      hint: 'Verify KNOWLEDGE_API_URL env var and that knowledge_api is running'
    });
  }
}
