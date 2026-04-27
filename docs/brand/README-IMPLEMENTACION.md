# DOF-MESH — Assets v2.0 · Sistema Cubo
© 2026 Juan Carlos Quiceno (@Cyber_paisa) — dofmesh.com

## Qué cambió vs v1
- Wordmark: mark ❯❮ ahora vive dentro de un cubo negro con border-radius
- Sistema adaptativo: dark bg → texto blanco / light bg → texto negro
- Validado por skill logo-design v6.0: 15/15 criterios · Draplin · Haring · irradiación

## Archivos
```
dof-v2/
├── svg/
│   ├── dof-mesh-wordmark-cube-dark.svg   ← Navbar oscuro (USAR ESTE)
│   ├── dof-mesh-wordmark-cube-light.svg  ← Navbar claro
│   ├── dof-mesh-icon-cube-dark.svg       ← Icon solo oscuro
│   └── dof-mesh-icon-cube-light.svg      ← Icon solo claro
├── png/
│   ├── dof-mesh-wordmark-cube-dark-520x80.png
│   ├── dof-mesh-wordmark-cube-dark-1040x160@2x.png
│   ├── dof-mesh-wordmark-cube-light-520x80.png
│   ├── dof-mesh-wordmark-cube-light-1040x160@2x.png
│   ├── dof-mesh-icon-cube-dark-[16/32/48/64/128/256/512]px.png
│   └── dof-mesh-icon-cube-light-[16/32/48/64/128/256/512]px.png
└── dof-mesh-brand-book-v2.html           ← Brand book actualizado
```

## Regla de uso
| Contexto | SVG a usar | Texto |
|---|---|---|
| Fondo oscuro (#000, dark sections) | wordmark-cube-dark.svg | Blanco |
| Fondo claro (#F3F2EF, white) | wordmark-cube-light.svg | Negro |
| Icon solo (avatar, favicon) | icon-cube-dark.svg | — |

## HTML para implementar
```html
<!-- Dark navbar -->
<img src="/brand/dof-mesh-wordmark-cube-dark.svg"
     alt="DOF-MESH" height="28" style="display:block;" />

<!-- Light navbar -->
<img src="/brand/dof-mesh-wordmark-cube-light.svg"
     alt="DOF-MESH" height="28" style="display:block;" />

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32"
      href="/brand/dof-mesh-icon-cube-dark-32x32.png">
<link rel="icon" type="image/png" sizes="16x16"
      href="/brand/dof-mesh-icon-cube-dark-16x16.png">
<link rel="apple-touch-icon"
      href="/brand/dof-mesh-icon-cube-dark-128x128.png">
```

## Especificaciones CSS (si se construye en HTML puro)
```css
/* Cubo dark */
.logo-cube-dark {
  width: 28px; height: 28px;
  background: #000;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 4px;  /* 28-36px */
}
/* Cubo light */
.logo-cube-light {
  width: 28px; height: 28px;
  background: #000;
  border-radius: 4px;
  /* sin borde — contraste máximo */
}
/* Texto DOF */
.logo-text-dof { font-weight: 600; letter-spacing: .03em; }
/* Texto -MESH */
.logo-text-mesh { font-weight: 300; letter-spacing: .03em;
  color: rgba(255,255,255,0.32); /* dark */
  /* color: rgba(0,0,0,0.32); light */ }
```
