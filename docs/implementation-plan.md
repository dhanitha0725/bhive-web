# BHive Implementation Plan

## Architecture

Use Next.js 16 App Router with React Server Components by default, strict TypeScript, Tailwind CSS v4, and `next/font/google` for Bricolage Grotesque, Geist, and JetBrains Mono. Client boundaries are limited to the mobile navigation, lead forms, analytics interactions, filters, and isolated motion components.

```text
src/
  app/
    (marketing)/
    services/[slug]/
    work/[slug]/
    insights/category/[slug]/
    insights/[slug]/
    api/leads/[type]/route.ts
    robots.ts sitemap.ts not-found.tsx
  components/
    layout/ sections/ ui/ motion/ forms/ seo/
  config/ content/ analytics/ leads/ lib/ styles/
content/insights/
docs/
```

No new router, global CSS framework, global state library, CMS, WebGL decoration, carousel dependency, or icon library is planned. Add only the focused dependencies required after implementation review: `zod`, `gsap`, and optionally `lenis`; Playwright is a practical dev dependency for responsive smoke testing. Use built-in SVGs for simple 1.5px stroke icons unless a narrowly scoped library proves necessary.

## Responsive and accessibility strategy

Build mobile-first on the design system grid: 4 columns below 640px, 8 from 640px, and 12 from 1024px; use the supplied gutters/margins and cap wide content at 1440px. Test 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1536+, and 1920px. Components reflow rather than compress; forms remain one column on mobile; no horizontal overflow, clipped text, hover-only control, or below-44px primary target.

Use semantic landmarks, heading order, labels and error descriptions, visible focus, keyboard-operable menus/disclosures, focus trapping/restoration in mobile navigation, and non-color state indicators. Tokens are applied with the design-system contrast exceptions: Navy/white and Navy/Honey are preferred CTA pairs; Blue/white is large/bold UI only; white/Honey is never used.

## Motion strategy

Ship meaningful static layouts first. The growth-system SVG/DOM has sequential module and connector activation only as an enhancement, with keyboard/focus labels and a vertical mobile fallback. Section reveals, process progression, and optional large-screen restrained parallax are isolated GSAP client components.

If Lenis is adopted, instantiate exactly once on capable non-touch, non-reduced-motion contexts; bridge its scroll event to `ScrollTrigger.update`, drive it through GSAP's ticker, and clean up listeners/ticker on unmount. Avoid pinned reading sections, scroll-jacking, simultaneous requestAnimationFrame loops, layout-property animation, and content that requires JS/motion to understand. Use native touch scrolling and honor `prefers-reduced-motion`.

## Implementation phases

1. **Foundation:** replace starter CSS/metadata with BHive tokens, font loading, base layout, accessibility primitives, canonical site config, and SEO utilities.
2. **Content system:** create typed service/package/case-study/navigation data and MDX insight pipeline; add published gates and owner-editable configuration.
3. **Shell and shared sections:** header/menu, footer, buttons, container/grid, breadcrumbs, proof guard, system-diagram primitives, card and FAQ primitives. Query Watermelon before adopting relevant primitive source.
4. **Conversion routes:** implement homepage, growth funnel, founder funnel, services, about, contact, audit, and guidance routes with server-rendered copy.
5. **Editorial and work:** implement work listing/detail, insight listing/detail/category, internal links, metadata, schemas, sitemap, robots, and 404.
6. **Leads and analytics:** add Zod validation, server routes, provider adapter, development/production failure behavior, attribution capture, and provider-neutral events.
7. **Motion and performance:** add only necessary GSAP/Lenis enhancement islands; optimize image sizing/loading and generated OG artwork.
8. **Quality gate:** lint, typecheck/build, keyboard/reduced-motion checks, responsive smoke tests, form failure-path tests, and Lighthouse review against performance 90+, accessibility 95+, best-practices 95+, SEO 95+ targets.

## Files expected to change or be created

Modify later: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `next.config.ts`, `package.json`, and starter public assets only when replacements are supplied. Create the route files, shared components, content/config, lead/analytics/SEO layers, MDX content directory, and test configuration described above. This planning pass creates only the four `docs/` files.

## Risks, conflicts, and assumptions

- **Proof/assets gap:** no real logo, photography, client data, testimonials, results, social profiles, address, legal copy, or brand favicon has been provided. The build must safely omit dependent UI until supplied.
- **Design-system conflict:** its generic primary button specifies Blue with white at 14px; the brief correctly overrides this because the documented 4.2:1 contrast is insufficient for normal text. Use Navy/white or Honey/Navy for normal CTA copy.
- **Theme conflict:** the design system describes optional global dark mode, while the planned marketing experience uses intentional Navy sections rather than a user theme toggle. Do not add dark-mode toggling unless the owner requests it.
- **Operational dependency:** audit turnaround language, consent requirements, lead-delivery provider, production canonical URL, analytics provider, calendar destination, and legal content require owner confirmation before production launch.
- **Assumption:** the current starter is intentionally disposable, so a coherent implementation may replace its visual/page architecture while retaining the stable Next/Tailwind tooling foundation.

