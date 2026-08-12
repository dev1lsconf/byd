# Batista Doleo & Asociados — Sitio Web

Landing page estática para bufete de abogados con más de 3 décadas de ejercicio jurídico en República Dominicana.

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 + Tailwind CSS v4
- **Lenguaje:** TypeScript (strict mode)
- **Testing:** Vitest + React Testing Library
- **Calidad:** ESLint 9 (flat config) + Prettier + Husky
- **Package Manager:** pnpm 9

## Características

- ✅ **HTML 100% estático** (SSG) — cero serverless functions
- ✅ **SEO completo:** OpenGraph, Twitter Cards, JSON-LD `LegalService` + `LocalBusiness`, sitemap.xml, robots.txt
- ✅ **Accesibilidad:** Semántica HTML5, contraste AA, focus-visible, `rel="noopener"`, `tel:`/`mailto:`
- ✅ **Seguridad:** Headers HTTP (CSP-like, X-Frame-Options, etc.) + Error Boundary
- ✅ **TypeScript Strict** + configuración centralizada (`app/config/site.ts`)
- ✅ **Arquitectura modular:** UI reutilizable + secciones componibles + datos tipados
- ✅ **Tests:** 36 tests unitarios/integración (cobertura >70%)
- ✅ **Diseño:** Blanco y negro puro (sin colores)

## Requisitos Previos

- Node.js ≥ 20
- pnpm ≥ 9

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/dev1lsconf/byd.git
cd byd

# Instalar dependencias
pnpm install
```

## Scripts Disponibles

```bash
# Desarrollo con Turbopack
pnpm dev

# Build de producción (estático)
pnpm build

# Preview del build
pnpm start

# Linting
pnpm lint           # Solo check
pnpm lint:fix       # Auto-fix

# Type checking
pnpm typecheck

# Formato
pnpm format

# Tests
pnpm test           # Ejecuta suite completa
pnpm test:watch     # Watch mode
pnpm test:coverage  # Con reporte de cobertura
```

## Estructura del Proyecto

```
app/
├── components/
│   ├── ui/                    # Primitivas reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ExternalLink.tsx
│   │   └── index.ts
│   ├── sections/              # Secciones de la landing
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── seo/
│   │   └── JsonLd.tsx        # JSON-LD tipado
│   └── ErrorBoundary.tsx     # Captura errores de render
├── config/
│   └── site.ts               # Configuración central (Single Source of Truth)
├── data/
│   ├── services.ts           # Datos tipados de servicios
│   └── contact.ts            # Datos tipados de contacto
├── lib/
│   └── utils.ts              # Helpers (cn, etc.)
├── layout.tsx                # Root layout + metadata SEO
├── page.tsx                  # Landing page (composición de secciones)
├── globals.css               # Tailwind v4 + reset
├── robots.ts                 # robots.txt generado
└── sitemap.ts                # sitemap.xml generado
```

## Configuración (Single Source of Truth)

Todos los datos del sitio viven en **`app/config/site.ts`**:

```typescript
export const siteConfig = {
  name: 'Batista Doleo & Asociados',
  tagline: 'Más de 3 décadas en el ejercicio jurídico',
  description: '...',
  url: 'https://batistaydoleo.com',
  ogImage: '/home.png',
  locale: 'es_DO',
  country: 'DO',
  city: 'Santo Domingo',
  phone: '+1 809-843-4342',
  whatsappReception: '+1 829-703-8306',
  whatsappDoctor: '+1 809-843-4342',
  email: 'despacho@batistaydoleo.com',
  instagram: 'https://www.instagram.com/batistaydoleo',
  openingHours: 'Mo-Fr 09:00-18:00',
  keywords: [...],
} as const;
```

Cambiar un teléfono, email o dato SEO solo requiere tocar **un archivo**.

## Despliegue

El proyecto es **100% estático**. Push a `main` → Vercel despliega automáticamente.

```bash
# Build local para verificar
pnpm build

# Los archivos estáticos se generan en .next/server/app
# (Next.js 16 usa output: 'export' implícito para páginas sin getServerSideProps)
```

## Dominio de Producción

https://batistaydoleo.com

## Testing

```bash
# Ejecutar tests
pnpm test

# Con cobertura (umbrales: 70%)
pnpm test:coverage
```

Arquitectura de tests:
- **Unit tests:** `app/lib/utils.test.ts`, `app/components/ui/*.test.tsx`
- **Integration tests:** `app/components/sections/*.test.tsx`
- **SEO test:** `app/components/seo/JsonLd.test.tsx`

## Calidad de Código

```bash
# Lint + format antes de commit (husky + lint-staged)
# Configuración en package.json > lint-staged

# TypeScript strict mode (tsconfig.json)
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
```

## Licencia

Privado — Batista Doleo & Asociados.