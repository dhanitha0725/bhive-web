---
name: watermelon-ui
description: >-
  Discover, inspect, search, and compose source-backed Watermelon UI components, blocks, dashboards, and templates using the Watermelon MCP server.
---

# Watermelon UI MCP & Development Guide

Use this skill when building or styling UI using Watermelon UI components, blocks, animated components, dashboards, and templates.

## Overview & Endpoints

- **Hosted MCP Endpoint**: `https://mcp.watermelon.sh/mcp`
- **Catalog Website**: `https://ui.watermelon.sh`
- **Developer Docs**: `https://ui.watermelon.sh/developers`
- **MCP Docs**: `https://ui.watermelon.sh/developers/mcp`
- **Status & Integrations**: `https://ui.watermelon.sh/developers/status`
- **Public API Contract**: `https://ui.watermelon.sh/openapi.json`
- **LLM Guidance**: `https://ui.watermelon.sh/llms.txt`
- **GitHub Repository**: `https://github.com/WatermelonCorp/watermelon-platform`

---

## Available MCP Tools

When connected to `watermelon-mcp`, the following read-only catalog tools are available:

| Tool | Description |
| :--- | :--- |
| `search` | Search the catalog for components, animations, blocks, dashboards, and templates. |
| `get_component` | Retrieve the source code and configuration for a specific component. |
| `get_inspiration` | Retrieve design inspiration, layouts, and curated component pairings. |
| `compose_page` | Generate a cohesive multi-component page layout. |
| `list_categories` | List all component and block categories in the catalog. |
| `catalog_summary` | Get an overview and summary counts of the Watermelon catalog. |
| `list_catalog_entries` | List entries across categories with pagination and filtering. |
| `get_catalog_entry` | Fetch detailed data for a specific catalog entry by slug or ID. |

---

## Common Workflows

### 1. Finding Components
1. Call `search` with relevant keywords (e.g. `navbar`, `hero`, `card`, `sidebar`, `pricing table`).
2. Alternatively call `list_categories` or `list_catalog_entries` to browse options.

### 2. Inspecting and Installing Components
1. Use `get_component` or `get_catalog_entry` to view the component implementation.
2. Adapt the component to match the project's styling architecture (CSS/Tailwind/tokens).
3. Ensure required dependencies and icon packages are installed.

### 3. Page Composition
1. Call `compose_page` with target page requirements to get structured recommendations.
2. Call `get_inspiration` for layout ideas and modern UI patterns.
