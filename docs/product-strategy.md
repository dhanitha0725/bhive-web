# BHive Product Strategy

## Product decision

BHive will be positioned as a **business builder**, not a general-purpose digital agency. The offer is a connected business-growth system: strategy, positioning, brand, marketing, digital experience, launch, and improvement work together. The site must make that system understandable before presenting individual services.

Core message: **Strategy, brand, marketing, and digital execution—built as one growth system.**

Working promise: BHive builds businesses people can understand, trust, choose, and remember. This is deliberately more commercial and concrete than generic claims about online activity or creativity.

## Audiences and conversion paths

| Audience | Starting state | Primary job-to-be-done | Indexable route | First conversion |
| --- | --- | --- | --- | --- |
| Existing business | Revenue exists, but brand, marketing, positioning, or website is fragmented | Diagnose what prevents coordinated growth and build the missing system | `/grow-your-business` | Free Social & Growth Audit |
| Founder / new venture | Idea or validated offer exists, but launch path and market presence are unclear | Turn the offer into a credible, launch-ready business | `/launch-your-business` | Free Business Launch Guidance Call |

The homepage is a shared authority layer. It lets visitors self-select with two real links; it will not hide half of the page behind a client-side audience toggle.

## Funnel model

1. Attention: direct hero statement and branded system visual.
2. Differentiation: explain why fragmented supplier-led work stalls growth.
3. Self-selection: existing business or new venture route.
4. Problem recognition: audience-specific symptoms and business cost.
5. Evidence: only verified cases, testimonials, logos, and results.
6. Method: Diagnose → Define → Build → Launch → Improve.
7. Low-risk next step: audit or guidance call.
8. Consideration: capability groups and data-driven package recommendations.
9. Conversion: concise validated form or direct conversation route.

## Homepage narrative

1. Header with Services, Work, Insights, About, Contact, and “Start a Conversation”.
2. Hero: `STRATEGY · BRAND · MARKETING · DIGITAL`; “We build businesses that are ready to grow.”; audience CTAs appear before the illustration on mobile.
3. Conditional proof strip: rendered only when verified data is supplied.
4. “Where are you starting from?” audience selection.
5. “Growth is a system.” Connected five-capability architecture.
6. Existing-business preview with Growth Systems and audit paths.
7. Founder preview with the chronological Venture Launch System and guidance path.
8. “Proof, not promises.” Published case-study grid.
9. Commercial process.
10. Insights across the five specified pillars.
11. Final problem-led CTA.
12. Compact, useful footer.

## Positioning and copy guardrails

- Use plain commercial language for non-technical owners; lead with business consequence and outcome.
- Do not use “stand out,” “next level,” “unlock potential,” “360-degree,” or “creative solutions for modern brands.”
- Never manufacture social proof, performance claims, client names, client logos, awards, prices, operating promises, or testimonials.
- The phrase “Free 24-Hour Social & Growth Audit” is content-configurable and must only be published after BHive confirms it can meet that service level.
- Package names are recommendations, not fixed brand facts: Foundation Reset, Growth Engine, and Market Lead.

## Visual and interaction direction

The visual language is structured growth: modular grids, connected cells, directional paths, carefully restrained hex geometry, editorial spacing, and high-trust information design. Hexagons are a secondary structural motif, never a decoration applied to every card or control.

Locked colors are Navy `#010071`, Blue `#3068F9`, and Honey `#F5A623`. Navy carries authority and high-contrast CTAs; blue is primarily an interactive or diagram accent; honey is sparse and uses navy text. White on blue is restricted to qualifying large/bold UI text; white on honey is prohibited.

The hero visual is a readable DOM/SVG “Business Growth System” with five nodes: Strategy → Brand → Digital → Demand → Growth. It has a static server-rendered state and optional motion enhancement, rather than a stock device image, WebGL scene, or decorative blob.

## Verified-proof policy

The initial site should ship without a proof strip, case card, testimonial, or numeric result unless each item has an owner-supplied source. Data models remain ready for them. Unpublished records must be explicitly marked `published: false` and excluded from generated routes, sitemap entries, lists, and structured data.

## Repository audit

The application is an uncustomized Next.js 16.3.4 App Router starter with React 19.2.8, TypeScript strict mode, Tailwind CSS v4, and only the default `/` page. There are no reusable BHive components, content collections, routes, images, logo files, brand fonts, or verified business proof.

Reusable foundations: App Router, strict TypeScript, the `@/*` alias, `next/font`, `next/image`, Tailwind v4/PostCSS setup, and the supplied `favicon.ico` pending brand verification. Replace: starter metadata, default page, default CSS theme/dark-mode behavior, Arial fallback, Next/Vercel SVGs, and all starter copy. The latter are framework assets, not BHive assets.

## Watermelon UI opportunities

The repo configures the Watermelon MCP and local usage guide, but includes no copied Watermelon source. In implementation, query the registry before building a responsive navigation/menu, accessible dialog/drawer, form primitives, FAQ disclosure, breadcrumb, and before/after comparison. Copy only useful source into local components; inspect accessibility and mobile behavior first; remove Framer Motion/Motion where CSS or the planned GSAP islands suffice. The custom system diagram, conversion pages, proof cards, and information architecture should remain BHive-owned implementations rather than being forced into a generic registry block.

