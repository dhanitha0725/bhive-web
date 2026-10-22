<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BHive Web — Agent Guide

Marketing website for **BHive**, positioned as a *business builder* (strategy, brand, marketing, and digital execution as one connected growth system). Two conversion funnels:

- **Existing business** → `/grow-your-business` → free growth audit (`/free-growth-audit`)
- **Founder / new venture** → `/launch-your-business` → guidance call (`/business-guidance-call`)

Strategy, copy guardrails, and the verified-proof policy live in `docs/product-strategy.md` — read it before writing user-facing copy.

## Commands

```bash
npm run dev      # dev server on port 3001 (NOT 3000)
npm run build    # production build (Turbopack)
npm run start    # serve production build
npm run lint     # eslint (flat config, eslint-config-next)
npx tsc --noEmit # typecheck
```

Package manager is npm (lockfile committed). Environment is Windows; repo uses LF line endings.

## Stack

- **Next.js 16.3.4** App Router + **React 19.2.8**, TypeScript strict, `@/*` path alias
- **Tailwind CSS v4** — CSS-first config; all tokens live in `src/app/globals.css`. There is no `tailwind.config`.
- **framer-motion** — the single React animation library (canonical; do not add the `motion` package). `BlurText` imports from `framer-motion`.
- **lenis** — global smooth wheel scrolling, instantiated exactly once, skipped for `prefers-reduced-motion` and touch.
- **lucide-react** icons, **zod** validation, **clsx + tailwind-merge** via `cn()` in `src/lib/utils.ts`.

## Architecture map

```text
src/
  app/                     # all routes are server components
    page.tsx               # home: 8 composed sections
    layout.tsx             # fonts (Inter + JetBrains Mono), skip-link, Header, Footer, SmoothScroll
    services/[slug]/       # generateStaticParams + generateMetadata from content, published gate
    work/[slug]/           # case-study detail
    insights/[slug]/       # article; insights/category/[slug]/ pillar listing
    grow-your-business/ launch-your-business/ free-growth-audit/ business-guidance-call/
    about/ contact/ privacy/ terms/ not-found.tsx robots.ts sitemap.ts
    api/leads/route.ts     # POST, zod-validated lead intake
  components/
    layout/                # header.tsx (floating pill nav), footer.tsx, brand-mark.tsx
    sections/              # home sections + marketing.tsx shared primitives
    ui/                    # container, section, button, card, dialog (native <dialog>)
    forms/lead-form.tsx    # client form → POST /api/leads
    motion/                # smooth-scroll.tsx, reveal.tsx (IntersectionObserver CSS reveal)
    BlurText.tsx GooeyNav.tsx ScrollStack.tsx SpotlightCard.tsx  # react-bits registry components
  content/                 # typed content model (see below)
  config/site.ts           # siteConfig, primaryNavigation, audiencePaths
  forms/schemas.ts         # zod schemas for the 3 lead types
  seo/metadata.ts          # createMetadata() helper (canonical/OG/Twitter)
docs/                      # product strategy, IA, content model, implementation plan
designsystem/              # reference design systems (inspiration only, not live styles)
.agents/skills/            # agent skills (tracked by skills-lock.json); do not duplicate elsewhere
```

Shared page primitives (`PageHero`, `SectionTitle`, `SystemSteps`, `CaseCard`, `InsightCard`, `FinalCta`, `Faqs`) live in `src/components/sections/marketing.tsx` and are used by every non-home route.

The four root-level files in `src/components/` are **react-bits registry components** added via the shadcn CLI (`components.json` + `package.json#registries` configure the `@react-bits` registry). Keep registry copies at the `src/components/` root — do not shadow them under `ui/`.

## Content system

`src/content/*.ts` is the single source of truth; all routes/static params/sitemap read from it.

- Every record has a `published` flag; helpers (`getService`, `getCaseStudy`, `getInsight`) filter unpublished records from pages, routes, and sitemap.
- `services.ts` — 5 capabilities (id, audiences, capabilities[], copy) feeding the pathway section, services pages, footer, and the sitemap.
- `case-studies.ts` — all current entries are `isDemo: true` concept work.
- `insights.ts` — 5 pillars + articles; article bodies are `string[]` paragraphs (no MDX).
- `packages.ts` — Foundation Reset / Growth Engine / Market Lead (recommendations, not fixed brand facts).

To add content of an existing type, append a typed record to the relevant file; routes, sitemap, and lists pick it up automatically.

## Lead pipeline (`/api/leads`)

- `POST { type: "growth-audit" | "business-guidance" | "general-contact", data }` validated by zod schemas in `src/forms/schemas.ts` (honeypot must be empty, consent optional boolean).
- Development: logs and returns `{ ok: true, mode: "development" }`.
- Production: returns **503 "Lead delivery is not configured"** until an email/CRM provider is wired. Do not deploy to production without resolving this.

## Motion architecture

- **CSS reveals**: `Reveal` (IntersectionObserver → `.reveal.is-visible` transition in globals.css). Zero JS work during scroll; preferred for below-fold entrances.
- **framer-motion**: hero rotating word + auto-switching cards, pathway audience tabs (`layoutId`), testimonials carousel, BlurText.
- **Lenis + GSAP ScrollTrigger**: global wheel smoothing only, instantiated in `SmoothScroll`; anchor clicks offset by 80px. No scroll-jacking, no pinned reading sections.
- **ScrollStack** runs its own rAF loop (no GSAP). Hero `CloudSky` is raw WebGL (no three.js dependency).
- All animation must respect `prefers-reduced-motion` (globals.css also clamps animations under it).

## Design tokens (`src/app/globals.css`)

- Corporate light theme only — **no dark mode, no theme switcher**. `honey-*` tokens are legacy remaps of the corporate blue scale; do not introduce amber.
- Blue scale exposed as both `navy-*` and `blue-*`; primary action color `#0b4cc4`. Neutral ink `#0a0a0b`.
- Type utilities: `.display`, `.heading-1`, `.heading-2`, `.eyebrow` / `.eyebrow-light`, `.btn-base`, `.card-base`.
- Fonts: Inter (`--font-inter`, display/body) + JetBrains Mono (`--font-mono`, eyebrows/labels).

## Ground rules

- **Never fabricate proof.** No invented client names, logos, testimonials, metrics, or results. The trusted-partners marquee, testimonials, and selected-work metrics are placeholders that are launch-blocking until owner-verified data replaces them; keep their demo markers intact.
- Routes stay server components; add `"use client"` only to interactive islands (header, forms, motion components).
- Keep the narrow dependency set. Before adding a package, check whether framer-motion, lucide, or the existing registry components already cover it.
- Reformat code with `npx prettier --write --print-width 120` (prettier is intentionally not a dependency).
- `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonical URLs, and sitemap; sitemap returns `[]` when unset.

## Housekeeping state

- Lint, `tsc --noEmit`, and `next build` are expected to be clean; keep them that way.
- Skills live in `.agents/skills/` (locked by `skills-lock.json`); MCP configs: `.mcp.json` (watermelon, vercel) and `.agents/mcp_config.json` (adds shadcn MCP).
- Legacy cleanup already done: unused UI copies, starter SVGs, duplicate theme/theming files, `analytics/events` stub, and unused packages (`gsap`, `motion`, `@gsap/react`) were removed. Don't reintroduce them.
