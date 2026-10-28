# BHive Information Architecture (Minimal Conversion Flow)

## Core Value Proposition
- **Headline**: More customers for your business. Marketing that is planned, not guessed.
- **Audience**: Small and medium business owners in Sri Lanka.
- **Primary Conversion Action**: Single global CTA across the entire site — **"Get Free Growth Consultation"** (triggers the Consultation modal with WhatsApp primary action + short LeadForm).

---

## Route Map

| Route | Purpose | Primary Conversion | Notes |
| --- | --- | --- | --- |
| `/` | Streamlined 10-section conversion home | Get Free Growth Consultation / WhatsApp | Fast, mobile-first, no WebGL |
| `/services` | 5 core services with deep section anchors | Get Free Growth Consultation / WhatsApp | Single unified page, anchors `#business-strategy`, `#brand-identity`, etc. |
| `/work` | Proof library of real/illustrative case studies | Read case study / Get Consultation | Challenge → What we did → Result |
| `/work/[slug]` | Individual case study breakdown | Get Free Growth Consultation | 3-part format: Challenge, What We Did, Result |
| `/about` | Short story, team section & 3 principles | Get Free Growth Consultation | Practical business-builder mindset |
| `/contact` | Direct communication hub | WhatsApp button + unified LeadForm | Email & phone support island-wide |
| `/privacy` | Privacy policy | — | Plain terms on lead data handling |
| `/terms` | General terms of service | — | Client engagement terms |
| `not-found.tsx` | Index-safe 404 recovery | Return Home / Services | Branded recovery experience |

---

## Permanent Redirects (`next.config.ts`)

| Legacy Route | Destination | Status |
| --- | --- | --- |
| `/grow-your-business` | `/` | 308 Permanent |
| `/launch-your-business` | `/` | 308 Permanent |
| `/free-growth-audit` | `/contact` | 308 Permanent |
| `/business-guidance-call` | `/contact` | 308 Permanent |
| `/insights/category/:slug*` | `/` | 308 Permanent |
| `/services/:slug` | `/services#:slug` | 308 Permanent |

---

## Homepage Order (`src/app/page.tsx`)

1. **Hero**: Headline, subline, single CTA ("Get Free Growth Consultation") + small WhatsApp link, trust indicator (*"Free. No obligation."*). Fast CSS backdrop.
2. **Logo & Stat Strip**: Slim bar with 3 stat counters / verified placeholders (`// TODO: replace with real data`).
3. **Problem**: 4 owner pains (*"Posting regularly, but no enquiries"*, *"Website looks good, nobody buys"*, *"Wasting money on random ad boosts"*, *"Unpredictable sales from month to month"*).
4. **Outcomes**: 4 compact blocks in owner language (*More customer enquiries*, *Stronger brand*, *Website that actually sells*, *Steady repeat buyers*).
5. **Services**: 5 plain-named cards (*Business Strategy*, *Brand & Identity*, *Marketing Strategy*, *Website*, *Content & Social*) linking to `/services#<slug>`.
6. **How It Works**: 3 steps (*Message us* → *We review your marketing* → *Short call with a clear plan*).
7. **Work**: 3 case cards in Challenge → What we did → Result format.
8. **Testimonials**: Owner name, photo placeholder, business, and specific result. Placed directly before final CTA.
9. **FAQ**: Accordion covering pricing, timelines, process, and language support (*Sinhala, Tamil, English*).
10. **Final CTA**: Single primary CTA ("Get Free Growth Consultation") + WhatsApp action button.

---

## Consultation & Lead Flow

- **Trigger**: Every CTA across the website triggers the global `ConsultationDialog`.
- **Dialog Content**:
  - Primary Action: **"Chat on WhatsApp"** button (`https://wa.me/94770000000?text=...`)
  - Divider: *"or send a quick note"*
  - Form: **`LeadForm`** with fields: `name`, `whatsappNumber`, `businessName`, `whatYouNeed` (textarea).
  - Validation: Strict client & server-side Zod validation with inline error messaging.
  - Honeypot: Anti-bot silent trap.
  - Rate Limiting: Max 5 submissions per 10 minutes per IP.
  - Notifications: Dispatcher for lead logging so no lead is ever lost.
  - Future Extensibility: `whatsAppCloudApiAdapter` interface reserved with `// TODO: Wire WhatsApp Cloud API`.
