# Sanity connection

The Studio lives in `studio-bhive-blog/` inside this repository. This app reads published content with `@sanity/client` / `next-sanity`.

## Files

| File | Purpose |
| --- | --- |
| `src/sanity/client.ts` | `createClient` config (project `ealudk4o`, dataset `production`, static build-time client) |
| `src/sanity/queries.ts` | GROQ queries typed by TypeGen |
| `src/sanity/image.ts` | `urlFor()` image URL builder and srcSet helper |
| `src/components/sanity/article-body.tsx` | Portable Text renderer for article bodies |
| `sanity.types.ts` | Generated types (do not edit by hand) |

## Environment

`.env.local` holds the public values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ealudk4o
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-11-12
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

Public content is read at build time with `useCdn: false`. No read token is needed.

## TypeGen

Run from the Studio folder after changing the schema or a query:

```bash
cd studio-bhive-blog
pnpm typegen
```

`pnpm dev` in the Studio folder starts Sanity Studio on `http://localhost:3333`.

## Still to do

- Authenticate the CLI (`npx sanity login`) and deploy the schema: `npx sanity schemas deploy`
- Add CORS origins for `http://localhost:3001` and the production domain
- Run one-time migration script `node scripts/import-insights.mjs` with `SANITY_API_WRITE_TOKEN` once pillar and service documents exist
