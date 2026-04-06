# dof-landing — Reglas para Claude

## Propósito

Landing page de [dofmesh.com](https://www.dofmesh.com).
Stack: HTML + CSS + Vanilla JS + Vercel + Upstash Redis

---

## Documentación de este repo

| Tipo | Archivo |
|------|---------|
| Lecciones frontend/UX/CSS/iOS | `docs/sessions/LESSONS_LEARNED.md` |
| Bitácora de sesiones | `docs/sessions/YYYY-MM-DD-session-NN.md` |
| Sistema maestro DOF | `~/equipo-de-agentes/docs/DOC_SYSTEM.md` |

---

## Reglas críticas

- **NUNCA** hacer push sin autorización explícita de Juan
- **NUNCA** usar `100vh` en móvil — usar `dvh` o `visualViewport` API
- `font-size` mínimo `16px` en inputs de móvil (iOS Safari autozoom se activa con <16px)
- Auto-deploy activo: cada `git push → main` → Vercel → dofmesh.com
- El chat solo responde sobre DOF-MESH — no es un LLM general
- **REGLA SYNC:** Cada vez que se modifique `public/dof-home.html`, ejecutar inmediatamente:
  ```bash
  bash ~/dof-landing/scripts/sync-landing.sh
  ```
  Esto sincroniza `dof-home.html → index.html`, hace commit, push y deploy a producción.
  `index.html` nunca se edita directamente — es siempre un espejo de `dof-home.html`.

---

## Cuando Juan diga "documenta"

1. ¿Es lección **frontend/CSS/iOS/UX**? → `docs/sessions/LESSONS_LEARNED.md`
2. ¿Es bitácora de sesión completa? → `docs/sessions/YYYY-MM-DD-session-NN.md`
3. ¿Es lección técnica de **SDK/backend**? → reportar a `equipo-de-agentes/docs/02_research/LESSONS_LEARNED.md`

---

## Lecciones activas

- **L-FE-1 (= L-71):** iOS Safari — nunca `100vh`, usar `window.visualViewport`
- **L-FE-2 (= L-72):** JS timers — siempre guardar referencia, `stopLabelCycle()` como único punto de salida
- Ver `docs/sessions/LESSONS_LEARNED.md` para detalle completo

---

## Variables de entorno (Vercel dashboard)

```bash
DEEPSEEK_API_KEY      # DOF Agent chatbot
KV_REST_API_URL       # Upstash Redis (visit counter)
KV_REST_API_TOKEN     # Upstash Redis
```
