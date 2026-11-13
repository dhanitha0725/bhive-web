# BHive Blog Studio

Standalone Sanity Studio for the BHive marketing site located inside `studio-bhive-blog`.

- Project: `ealudk4o`
- Dataset: `production`
- App it serves: `..` (Next.js, dev server on port 3001)

## Commands

```bash
pnpm dev         # Sanity Studio on http://localhost:3333
pnpm typegen     # Extract schema and generate ../sanity.types.ts
pnpm deploy      # Deploy the Studio to Sanity hosting
```

This folder is installed with **pnpm** (`pnpm-lock.yaml`). Dependencies are already installed.

## Authentication

The CLI is not logged in yet. Before deploying the schema or the Studio:

```bash
npx sanity login
npx sanity schemas deploy
```

Schema deployment makes the types visible to Sanity MCP / agent tooling. Local Studio editing works without it.

## Add the app to CORS

```bash
npx sanity cors add http://localhost:3001 --credentials
npx sanity cors add https://bhive.lk --credentials   # production origin
```
