# Decisiones de Arquitectura (ADR)

## ADR-001: Next.js 16 App Router + Turbopack
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Migración desde Next.js 12 (Pages Router) a arquitectura moderna.

### Decisión
Usar **Next.js 16 con App Router** y **Turbopack** habilitado por defecto.

### Consecuencias
- ✅ Server Components por defecto → menos JS en cliente
- ✅ `next/image`, `next/font`, metadata API nativas
- ✅ Builds estáticos implícitos (output: 'export' en páginas sin server props)
- ✅ HMR ultrarrápido con Turbopack
- ⚠️ Requiere Node 20+

---

## ADR-002: TypeScript Strict Mode
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Base de código sin tipos estrictos (`strict: false` en tsconfig heredado).

### Decisión
Activar **`strict: true`** + flags adicionales:
- `noUncheckedIndexedAccess`
- `noImplicitOverride`
- `forceConsistentCasingInFileNames`

### Consecuencias
- ✅ Detección de bugs en compile-time
- ✅ Refactors seguros
- ⚠️ Requirió corregir ~15 errores preexistentes

---

## ADR-003: Configuración Centralizada (siteConfig)
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Datos de negocio (teléfonos, emails, URLs, SEO) dispersos en componentes.

### Decisión
**Single Source of Truth** en `app/config/site.ts` con `as const` para inferencia literal.

### Consecuencias
- ✅ Un solo lugar para cambiar datos
- ✅ Tipos derivados automáticamente (`SiteConfig`)
- ✅ JSON-LD, metadata, sitemap, robots consumen la misma fuente
- ✅ Tests mockean un solo módulo

---

## ADR-004: Separación Datos/UI (Atomic Design Ligero)
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
`page.tsx` monolítico de 140 líneas mezclando datos, lógica y JSX.

### Decisión
Estructura en capas:
```
app/
├── data/           # Datos tipados (readonly arrays)
├── components/
│   ├── ui/         # Primitivas sin lógica de negocio
│   ├── sections/   # Secciones compuestas con datos
│   └── seo/        # Componentes SEO tipados
```

### Consecuencias
- ✅ SRP: cada archivo una responsabilidad
- ✅ Tests unitarios en `ui/`, integración en `sections/`
- ✅ Reutilización de `Button`, `Card`, `ExternalLink`
- ✅ `page.tsx` solo compone secciones (< 30 líneas)

---

## ADR-005: Tailwind CSS v4 (CSS-first)
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Migración desde Tailwind v3 (config JS) + CSS Modules.

### Decisión
**Tailwind v4** con `@import "tailwindcss"` en `globals.css`. Sin `tailwind.config.js`.

### Consecuencias
- ✅ Configuración en CSS (variables nativas, `@theme`)
- ✅ Menos archivos, mejor DX
- ✅ Tree-shaking automático
- ⚠️ Requiere PostCSS plugin `@tailwindcss/postcss`

---

## ADR-006: Diseño Blanco y Negro (Sin Paleta de Colores)
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Cliente solicita "todo en blanco y negro".

### Decisión
Eliminar tokens de color (`sky-400`, etc.). Solo:
- `white` / `black` para fondos/textos principales
- `gray-50` → `gray-900` para escalas
- `gray-300` para bordes
- `gray-600` para textos secundarios

### Consecuencias
- ✅ Consistencia visual absoluta
- ✅ Accesibilidad (contraste AA garantizado)
- ✅ Mantenimiento trivial
- ⚠️ Sin estados de "brand color" (hover/focus usan `black`/`gray`)

---

## ADR-007: Security Headers en next.config.mjs
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Sitio público sin cabeceras de seguridad.

### Decisión
Headers HTTP via `async headers()` en `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-DNS-Prefetch-Control: on`

### Consecuencias
- ✅ Defensa en profundidad sin middleware
- ✅ Compatible con hosting estático (Vercel, Netlify, Cloudflare)
- ⚠️ No es CSP completo (requeriría nonce/hashes por inline scripts)

---

## ADR-008: Error Boundary Cliente
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Errores de render en Server Components rompen toda la página.

### Decisión
`ErrorBoundary` como Client Component envolviendo `{children}` en `layout.tsx`.

### Consecuencias
- ✅ Aísla fallos de hidratación/render
- ✅ UI de fallback amigable + botón recargar
- ✅ Log en consola para debugging
- ⚠️ No captura errores de Server Components (Next.js maneja aparte)

---

## ADR-009: Vitest + React Testing Library
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Sin tests en el proyecto original.

### Decisión
**Vitest** (rápido, compatible Vite) + **React Testing Library** + **jsdom**.
- `environment: 'jsdom'`
- `setupFiles` con `@testing-library/jest-dom`
- Cobertura umbral 70%
- Alias `@/` configurado igual que Next.js

### Consecuencias
- ✅ Tests unitarios e integración en mismo framework
- ✅ 36 tests pasando (utils, ui, sections, seo)
- ✅ Watch mode rápido (`pnpm test:watch`)
- ✅ Mocks de `next/image`, `next/script`, módulos internos

---

## ADR-010: Husky + lint-staged para Pre-commit
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Commits con lint errors o formato inconsistente.

### Decisión
`prepare: "husky"` en package.json + `.husky/pre-commit` ejecutando `lint-staged`:
- `eslint --fix` en TS/TSX/JS
- `prettier --write` en todo

### Consecuencias
- ✅ Código consistente en cada commit
- ✅ CI solo valida (no formatea)
- ✅ Zero-config para contributors

---

## ADR-011: Dependencias — Minimalismo Radicall
**Fecha:** 2025-08-12  
**Estado:** Aceptado

### Contexto
Proyecto original con `schema-dts`, `yarn.lock`, CSS Modules heredados.

### Decisión
Eliminar todo lo no esencial:
- ❌ `schema-dts` (JSON-LD tipado manualmente)
- ❌ `yarn` → `pnpm` (lockfile único)
- ❌ `styles/*.module.css` → Tailwind v4
- ✅ Solo: `clsx`, `next`, `react`, `react-dom`, `@tailwindcss/postcss`, `tailwindcss`

### Consecuencias
- ✅ `node_modules` ~40% menor
- ✅ Superficie de ataque reducida
- ✅ Auditoría `pnpm audit` limpia

---

## Resumen de Trade-offs

| Decisión | Gain | Cost |
|----------|------|------|
| TS Strict | Seguridad tipos | Tiempo migración inicial |
| siteConfig | Single Source Truth | Un archivo más |
| Atomic-lite | Testabilidad, SRP | Más archivos |
| Tailwind v4 | DX, performance | Curva aprendizaje v4 |
| B&W Design | Simplicidad, a11y | Sin brand color |
| Vitest | Velocidad, DX | No Jest (distinto snapshot) |
| pnpm | Velocidad, disk | Equipo debe conocerlo |

---

## Próximas Decisiones Pendientes

- [ ] **ADR-012:** CI/CD Pipeline (GitHub Actions: lint + typecheck + test + build + Lighthouse)
- [ ] **ADR-013:** Analytics / Web Vitals (Vercel Analytics vs Plausible vs GA4)
- [ ] **ADR-014:** i18n si se expande a otros países
- [ ] **ADR-015:** PWA / Service Worker para offline