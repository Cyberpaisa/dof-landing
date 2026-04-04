<div align="center">

<svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="8,7 42,46 42,54 8,93 8,72 29,54 29,46 8,28" fill="currentColor"/>
  <polygon points="92,7 58,46 58,54 92,93 92,72 71,54 71,46 92,28" fill="currentColor"/>
</svg>

# DOF-MESH

**Mathematics, not promises.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/cyberpaisa/dof-landing)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.dofmesh.com&label=dofmesh.com&style=flat-square)](https://www.dofmesh.com)
[![Version](https://img.shields.io/badge/version-v0.5.1-black?style=flat-square)](https://pypi.org/project/dof-sdk/)
[![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)](LICENSE)

</div>

---

## What is this

Landing page for **[dofmesh.com](https://www.dofmesh.com)** — the public face of DOF-MESH (Deterministic Observability Framework), a formal governance layer for autonomous AI agents.

DOF-MESH intercepts every agent decision before execution, verifies it against Z3 formal constraints, and registers an immutable keccak256 hash on-chain. No logs. No interpretations. Mathematical proof.

**Stack:** HTML · CSS · Vanilla JS · Vercel · Upstash Redis

---

## Repo structure

```
dof-landing/
├── public/
│   ├── dof-home.html          ← single-file landing page (HTML/CSS/JS)
│   ├── brand/                 ← Brand Kit v2.2 (32 assets)
│   │   ├── dof-mesh-wordmark-cube-dark.svg
│   │   ├── dof-mesh-wordmark-cube-light.svg
│   │   ├── dof-mesh-icon-cube-dark-{16→512}px.png
│   │   ├── dof-mesh-og-1200x630.png
│   │   ├── dof-agent-chat-icon.svg
│   │   └── dof-mesh-brand-book-v2.2.html
│   └── api/                   ← Vercel serverless functions
│       ├── visit.js           ← unique visitor counter (Upstash Redis)
│       └── chat.js            ← DOF Agent chatbot proxy (DeepSeek)
├── docs/
│   └── sessions/              ← work session log
│       ├── README.md
│       ├── 2026-04-03-session-01.md
│       └── 2026-04-04-session-02.md
└── vercel.json                ← deploy config + Cache-Control headers
```

---

## Deploy

Auto-deploy active: every `git push` to `main` triggers a Vercel production deploy.

| Branch | Environment | URL |
|--------|-------------|-----|
| `main` | Production | https://www.dofmesh.com |
| PR / branch | Preview | Temporary Vercel URL |

**Domain:** dofmesh.com → Namecheap DNS → Vercel
**SSL:** automatic via Vercel
~~Manual deploy~~ no longer needed.

### Environment variables

Set in the Vercel dashboard:

```bash
DEEPSEEK_API_KEY      # DOF Agent chatbot
KV_REST_API_URL       # Upstash Redis
KV_REST_API_TOKEN     # Upstash Redis
```

---

## Brand Kit v2.2

All brand assets live in `public/brand/` and are served at `dofmesh.com/brand/`.

| Asset | File |
|-------|------|
| Wordmark dark (SVG) | `dof-mesh-wordmark-cube-dark.svg` |
| Wordmark light (SVG) | `dof-mesh-wordmark-cube-light.svg` |
| Wordmark PNG 600×80 | `dof-mesh-wordmark-cube-dark-600x80.png` |
| Wordmark PNG 1200×160 @2x | `dof-mesh-wordmark-cube-dark-1200x160@2x.png` |
| Icon PNG (16 → 512px) | `dof-mesh-icon-cube-dark-{size}.png` |
| OG image 1200×630 | `dof-mesh-og-1200x630.png` |
| Chat icon robot SVG | `dof-agent-chat-icon.svg` |
| Brand Book (HTML) | `dof-mesh-brand-book-v2.2.html` |

**Design specs:** IBM Plex Sans · DOF weight 600 · -MESH weight 300 at 65% opacity · Cube icon with Fibonacci proportions · #0052FF accent · #00CC55 online state.

---

## Session log

Work sessions are documented in [`docs/sessions/`](docs/sessions/).

Format: `YYYY-MM-DD-session-NN.md` — each file records what changed, commit hashes, and what's pending for the next session.

| Date | Duration | Score | Summary |
|------|----------|-------|---------|
| [2026-04-03](docs/sessions/2026-04-03-session-01.md) | ~12h | 60 → 85/100 | Domain, Mintlify audit, landing +15pts, 29 skills |
| [2026-04-04](docs/sessions/2026-04-04-session-02.md) | ~6h | 85 → 38/38 QA | Brand Kit v2.2, chat icon, orbit diagram, CI green |

---

## Related

| Project | Link |
|---------|------|
| DOF-MESH core (SDK, governance engine) | [github.com/Cyberpaisa/DOF-MESH](https://github.com/Cyberpaisa/DOF-MESH) |
| dof-sdk on PyPI | [pypi.org/project/dof-sdk](https://pypi.org/project/dof-sdk/) |
| Documentation | [cyberpaisa-dof-mesh-40-27.mintlify.app](https://cyberpaisa-dof-mesh-40-27.mintlify.app) |
| Enigma Scanner | [erc-8004scan.xyz](https://erc-8004scan.xyz) |
| dof-governance frontend | [dof-governance.vercel.app](https://dof-governance.vercel.app) |

---

<div align="center">

Built by **[@Cyber_paisa](https://github.com/Cyberpaisa)** · Enigma Group · Medellín, Colombia

*If you can't prove it, you can't defend it.*

</div>
