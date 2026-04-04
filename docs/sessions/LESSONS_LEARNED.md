---
date: 2026-04-04
project: dof-landing
---

# Lecciones Aprendidas — DOF Landing

## LECCIÓN 1 — Timer de animación CSS: siempre guardar la referencia

**Categoría:** JavaScript / Animaciones  
**Sesión:** 2026-04-04

### Problema
El label `"¿Necesitas ayuda?"` seguía apareciendo aunque el chat estuviera abierto.
Se intentó `clearTimeout(labelTimer)` pero el timer se reactivaba solo.

### Causa raíz
`animateLabel()` creaba dos `setTimeout` anidados.
El timer interno sobreescribía la variable `labelTimer` — si `clearTimeout`
se llamaba entre el primer y segundo timer, la referencia ya apuntaba a otro ID.
Además, `_dofLabelResume` llamaba `setTimeout(animateLabel, 2000)` **sin guardar el ID**,
haciendo ese timer incancelable.
El `mouseenter` tampoco verificaba `chatIsOpen`, y en móvil un tap dispara
mouseenter → `show()` → `visibility:'visible'`, deshaciendo el `visibility:'hidden'` previo.

### Fix definitivo
- Una sola función `stopLabelCycle()` que cancela timer + fuerza `opacity:0` + `visibility:hidden`
- Flag `chatIsOpen` verificado en TODOS los paths que muestran el label
- Toda referencia de timer guardada en `labelTimerRef` — incluyendo el timer de reanudación
- `mouseenter`/`mouseleave` verifican `if(chatIsOpen) return` como primera línea

### Regla general
> Nunca dejar timers sin referencia guardada. Si hay dos `setTimeout` anidados,
> la variable debe actualizarse en cada asignación. Verificar la flag de estado
> en todos los entry points que pueden mostrar el elemento.

---

## LECCIÓN 2 — iOS Safari + teclado virtual + position:fixed

**Categoría:** Mobile / iOS Safari / CSS  
**Sesión:** 2026-04-04

### Problema
El panel del chat desaparecía o perdía el botón send al abrir el teclado en iPhone.
`100vh`, `dvh` y el fix `focus/blur` con `style.height` no resolvían el problema.

### Causa raíz
iOS Safari **no redimensiona el viewport** cuando el teclado sube.
En vez de eso, empuja el contenido hacia arriba sin cambiar `window.innerHeight`.
Los elementos `position:fixed` quedan flotando en posición incorrecta.
`100vh` incluye la barra de dirección de Safari en su cálculo.
Además, `font-size < 16px` en inputs activa zoom automático que desplaza el layout.

### Fix definitivo
1. **`visualViewport` API** — escucha `resize` y `scroll` del viewport real:
   - `vv.height` = altura visible real (excluye teclado)
   - `vv.offsetTop` = desplazamiento vertical del viewport
   - Recalcula `panel.style.bottom` y `panel.style.maxHeight` dinámicamente
2. **`font-size: 16px !important`** en inputs — umbral exacto de iOS para no hacer zoom
3. **`height: auto`** en el panel — dejar que el contenido defina la altura,
   limitado por `max-height` que se actualiza vía JS
4. **`scrollIntoView`** en focus para centrar el input sobre el teclado

### Regla general
> En iOS Safari, nunca usar `100vh` ni timers de `blur/focus` para manejar el teclado.
> Usar `window.visualViewport` con listeners de `resize` y `scroll`.
> Siempre `font-size >= 16px` en inputs de móvil para evitar zoom automático.

---

## Referencias
- [MDN — Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API)
- [Safari + keyboard + fixed elements (WebKit bug tracker)](https://bugs.webkit.org/show_bug.cgi?id=141832)
