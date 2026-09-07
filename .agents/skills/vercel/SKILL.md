---
name: vercel-mcp
description: >-
  Use this skill when deploying, querying analytics, reading logs, searching docs, or managing Vercel projects and teams via Vercel MCP.
---

# Vercel MCP Integration Guide

Use this skill when interacting with Vercel's platform features, deployments, analytics, and documentation.

## Endpoint & Authentication

- **Server Endpoint**: `https://mcp.vercel.com`
- **Authentication**: OAuth 2.0 (triggers a browser authorization flow upon first connection)
- **Documentation**: [Vercel MCP Docs](https://vercel.com/docs/mcp) / [Agent Resources](https://vercel.com/docs/agent-resources/vercel-mcp)

---

## Capabilities

The Vercel MCP server exposes tools for:
- **Documentation Search**: Search and retrieve up-to-date Vercel and Next.js documentation.
- **Projects & Deployments**: Inspect project configurations, trigger and monitor deployments, inspect build output and errors.
- **Runtime Logs & Observability**: Stream runtime logs and inspect serverless/edge function invocations.
- **Web Analytics**: Query page views, visitor metrics, performance scores, and error rates.
- **Domains & Environment Variables**: Inspect and manage custom domains and environment variables across environments.
