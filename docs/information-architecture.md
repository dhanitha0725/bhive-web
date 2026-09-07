# BHive Information Architecture

## Final route map

| Route | Purpose | Primary conversion | Notes |
| --- | --- | --- | --- |
| `/` | Shared authority, orientation, audience selection | Audience-path selection | Server-rendered homepage |
| `/grow-your-business` | Existing-business growth funnel | Growth audit | Includes packages and relevant proof |
| `/launch-your-business` | Founder launch funnel | Guidance call | Connected launch sequence |
| `/services` | Service-system overview | Relevant audience path/contact | Shows connection between capabilities |
| `/services/business-strategy` | Positioning and business architecture | Conversation | Service schema + breadcrumbs |
| `/services/brand-strategy-identity` | Brand strategy and identity | Conversation | Service schema + breadcrumbs |
| `/services/marketing-strategy` | Marketing architecture | Conversation | Service schema + breadcrumbs |
| `/services/web-design-development` | Digital experience/infrastructure | Conversation | Service schema + breadcrumbs |
| `/services/content-social-launch` | Content and launch | Conversation | Service schema + breadcrumbs |
| `/work` | Published proof library | Case-study exploration | Empty state if no published records |
| `/work/[slug]` | Individual published case study | Related service/contact | Generated only from published records |
| `/insights` | Strategic editorial hub | Read an insight / service exploration | Five pillars |
| `/insights/[slug]` | Individual published article | Related service/insight | Article schema |
| `/insights/category/[slug]` | Crawlable insight-pillar archive | Read insight | Five fixed pillar slugs |
| `/about` | BHive point of view and operating model | Start a conversation | No invented team history |
| `/contact` | General conversation form | Contact submission | Provider-backed adapter |
| `/free-growth-audit` | Growth Audit lead form | Audit submission | No unconditional 24-hour guarantee |
| `/business-guidance-call` | Founder Guidance lead form | Guidance submission | Calendar handoff only if configured |
| `/privacy` | Privacy policy | — | Legal text must be owner-approved |
| `/terms` | Terms if legally required | — | Omit from public nav until supplied |
| `not-found.tsx` | Clear recovery page | Return home/contact | Must be branded and index-safe |

## Navigation model

Desktop header: wordmark/logo, Services (accessible mega-menu), Work, Insights, About, Contact, then a Navy “Start a Conversation” CTA. The services menu contains the two audience routes followed by the five service routes. Mobile uses a focus-managed dialog or sliding panel with the same links and at least 44px targets; no essential hover behavior.

Footer groups: Navigate, Services, Audience paths, Insight pillars, Contact, Social (only known destinations), and Legal. Footer routes remain crawlable HTML links.

## Page architectures

### Existing-business funnel

Hero → recognizable growth problems → target transformation → BHive diagnostic/growth system → audit offer → package recommendations → published relevant cases → process → FAQ → final CTA.

### Founder funnel

Hero → launch uncertainty/problem framing → guidance call → Venture Launch System → chronology: clarity → positioning → brand strategy → visual identity → marketing → digital infrastructure → content/launch → initial growth system → capabilities/deliverables → published relevant proof → FAQ → final CTA.

### Link rules

- Homepage audience cards link to the respective real route.
- Insights link to related services and posts.
- Services link to matching published case studies.
- Case studies link to services and relevant audience route.
- Audience pages link to the appropriate lead magnet.
- Breadcrumbs appear on services, work detail, insights detail, and category archives.

## SEO map

Every page receives unique title, description, canonical URL, Open Graph/Twitter metadata, semantic landmarks, one logical H1, and descriptive image alternative text. Implement `robots.ts`, `sitemap.ts`, favicon/app icons, 404, and metadata generation centrally. Dynamic work and insight metadata must derive from validated published content only.

| Route class | Structured data | Sitemap rule |
| --- | --- | --- |
| Home | Organization + WebSite | Always |
| Services | Service + BreadcrumbList | Always |
| Work detail | BreadcrumbList + semantically valid CreativeWork/Article style schema | Published only |
| Insight detail | Article + BreadcrumbList | Published only |
| Insight categories | BreadcrumbList | Always for defined pillars |

No LocalBusiness address/location fields, ratings, prices, or metrics will be emitted without verified source data. Branded `ImageResponse` Open Graph images can be generated for static and dynamic pages once the canonical site URL and logo treatment are confirmed.

