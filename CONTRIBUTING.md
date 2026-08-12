# Guía de Contribución

Gracias por contribuir a **Batista Doleo & Asociados**. Este documento describe el flujo de trabajo, convenciones y checks obligatorios.

---

## Flujo de Trabajo (Git)

```bash
# 1. Fork + clonar
git clone https://github.com/dev1lsconf/byd.git
cd byd

# 2. Crear rama (convención: tipo/descripcion-corta)
git checkout -b feat/nueva-seccion-testimonios
git checkout -b fix/header-responsive
git checkout -b chore/actualizar-deps

# 3. Desarrollar + tests
pnpm dev          # Ver cambios en localhost:3000
pnpm test         # Debe pasar (36 tests)
pnpm typecheck    # Sin errores TS

# 4. Commit (hooks automáticos formatean + lintean)
git add .
git commit -m "feat: agregar sección testimonios"

# 5. Push + PR
git push origin feat/nueva-seccion-testimonios
# Abrir PR en GitHub → base: main
```

### Convención de Commits (Conventional Commits)

```
<tipo>[ámbito opcional]: <descripción corta>

[body opcional]

[footer opcional]
```

| Tipo       | Cuándo usar                              |
|------------|------------------------------------------|
| `feat`     | Nueva funcionalidad user-facing          |
| `fix`      | Corrección de bug                        |
| `chore`    | Mantenimiento (deps, configs, scripts)   |
| `refactor` | Cambio interno sin alterar comportamiento|
| `docs`     | Solo documentación                       |
| `test`     | Agregar/actualizar tests                 |
| `perf`     | Mejora de rendimiento                    |
| `style`    | Formato, punto y coma, etc. (no lógica)  |

**Ejemplos:**
```
feat(contact): agregar campo teléfono secundario
fix(seo): corregir canonical URL en sitemap
chore(deps): actualizar next@16.3.1
refactor(ui): extraer ButtonVariant type
```

---

## Checks Obligatorios (Pre-PR)

El hook `pre-commit` ejecuta **lint-staged** automáticamente:

```bash
# Lo que hace internamente:
eslint --fix    # TS/TSX/JS
prettier --write # Todos los archivos
```

**Antes de push, verifica localmente:**

```bash
pnpm lint       # 0 errores
pnpm typecheck  # 0 errores
pnpm test       # 36 tests passing
pnpm build      # Build estático exitoso
```

El CI en GitHub Actions ejecuta los mismos comandos. **PRs con checks fallados no se mergean.**

---

## Estructura de Código

### Nuevos Componentes UI (`app/components/ui/`)
- Props tipadas con `interface` + `forwardRef`
- `displayName` para debugging
- `className` mergeado con `cn()`
- Variantes via prop discriminada (`variant`, `size`)
- **Test unitario obligatorio** (`*.test.tsx`)

### Nuevas Secciones (`app/components/sections/`)
- Consumen datos de `app/data/*.ts`
- Componen primitivas de `app/components/ui/`
- **Test de integración obligatorio**

### Datos (`app/data/*.ts`)
- Arrays `readonly` + `as const`
- Tipos exportados (`Service`, `ContactItem`)
- Derivan de `siteConfig` cuando posible

### Config (`app/config/site.ts`)
- **Único lugar** para cambiar datos del negocio
- `as const` para inferencia literal
- Cualquier cambio aquí propaga a SEO, metadata, JSON-LD, tests

---

## Estilos (Tailwind v4)

- **Solo utilidades Tailwind** — nada de CSS custom salvo `globals.css`
- Paleta: **blanco, negro, grises** (`gray-50` a `gray-900`)
- `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black` en interactivos
- Mobile-first (`sm:`, `lg:` breakpoints)

---

## Accesibilidad (No Negociable)

- `alt` descriptivo en **todas** las imágenes
- Semántica HTML5: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- `aria-label` / `aria-labelledby` en landmarks
- `rel="noopener noreferrer"` + `target="_blank"` en links externos
- `tel:` / `mailto:` / `wa.me:` funcionales
- Contraste AA mínimo (blanco/negro/grises lo garantizan)

---

## Testing

```bash
# Unitarios (utils, ui)
pnpm test app/lib/utils.test.ts
pnpm test app/components/ui/Button.test.tsx

# Integración (sections)
pnpm test app/components/sections/Services.test.tsx

# SEO
pnpm test app/components/seo/JsonLd.test.tsx

# Watch mode (desarrollo)
pnpm test:watch

# Cobertura (umbral 70%)
pnpm test:coverage
```

### Mocks Comunes

| Módulo              | Mock en test                              |
|---------------------|-------------------------------------------|
| `next/image`        | `<img data-priority={...} />`             |
| `next/script`       | `<script data-testid="..." />`            |
| `@/config/site`     | `vi.mock` con `siteConfig` parcial        |
| `@/data/services`   | `vi.mock` con array literal               |

---

## Variables de Entorno

```bash
# .env.local (no commitear)
NEXT_PUBLIC_SITE_URL=https://batistaydoleo.com
```

> El proyecto actual **no requiere** variables de entorno en runtime (todo estático). El archivo es solo para futuras expansiones.

---

## Despliegue

1. **Push a `main`** → Vercel detecta y deploya automáticamente
2. **Preview Deploy** en cada PR (URL temporal)
3. **Producción** en `https://batistaydoleo.com`

```bash
# Build local para verificar
pnpm build
# Revisa .next/server/app/ para HTML estático generado
```

---

## Preguntas Frecuentes

**¿Cómo agrego un nuevo servicio?**
1. Edita `app/data/services.ts` (agrega al array `services`)
2. Si es externo, asegura `external: true` y `href` correcto
3. Test: `pnpm test app/components/sections/Services.test.tsx`

**¿Cómo cambio el teléfono del Dr. Batista?**
1. Edita `app/config/site.ts` → `whatsappDoctor` y/o `phone`
2. `pnpm build` → verifica en `pnpm dev`
3. `pnpm test` → todos pasan (mock centralizado)

**¿Cómo actualizo dependencias?**
```bash
pnpm update --latest
pnpm test && pnpm build && pnpm lint
git commit -m "chore(deps): actualizar dependencias"
```

**¿El diseño tiene colores?**
No. Solo blanco (`white`), negro (`black`) y escala de grises (`gray-50` a `gray-900`). No añadas `sky-`, `blue-`, `red-`, etc.

---

## Contacto

- **Mantenedor:** Eric Batista (dev1lsconf)
- **Issues:** GitHub Issues del repo
- **Urgencias:** PR con label `hotfix`