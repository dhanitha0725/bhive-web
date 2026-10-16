# BHive Web

Marketing website for **BHive** — strategy, brand, marketing, and digital execution, built as one growth system.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · framer-motion · GSAP + Lenis · zod

## Getting started

```bash
npm install
npm run dev      # http://localhost:3001
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port **3001** |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |

## Project layout

- `src/app/` — routes (server components); lead intake at `src/app/api/leads/route.ts`
- `src/components/` — layout, sections, ui, forms, motion (+ react-bits registry components at the root)
- `src/content/` — typed content model (services, case studies, insights, packages) with `published` gates
- `src/config/site.ts`, `src/forms/schemas.ts`, `src/seo/metadata.ts`
- `docs/` — product strategy, information architecture, content model, implementation plan

## Notes

- `NEXT_PUBLIC_SITE_URL` drives metadataBase, canonical URLs, and the sitemap.
- Lead delivery is not wired to a provider yet: development logs submissions, production returns 503 until configured.
- Agents: read `AGENTS.md` before making changes.
