import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-load environment variables from .env.local if present
const envLocalPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envLocalPath) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envLocalPath);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ealudk4o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-12";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

if (!writeToken) {
  console.error("Error: SANITY_API_WRITE_TOKEN environment variable is not set.");
  console.error("");
  console.error("To run this migration:");
  console.error("1. Ensure Sanity has the 5 pillars and services created:");
  console.error("   Pillars: business-architecture, brand-strategy, modern-marketing, entrepreneurial-leadership, sustainable-growth");
  console.error("   Services: business-strategy, brand-identity, marketing-strategy, website, content-social");
  console.error("2. Create an API token with 'Editor' or 'Write' permissions at https://sanity.io/manage");
  console.error("3. Run the script with the token:");
  console.error("   Windows PowerShell:");
  console.error('     $env:SANITY_API_WRITE_TOKEN="your_token"; node scripts/import-insights.mjs');
  console.error("   Bash / macOS / Linux:");
  console.error("     SANITY_API_WRITE_TOKEN=your_token node scripts/import-insights.mjs");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
});

function toPortableText(paragraphs) {
  return paragraphs.map((text, index) => ({
    _key: `block_${index}_${Math.random().toString(36).slice(2, 9)}`,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `span_${index}_${Math.random().toString(36).slice(2, 9)}`,
        _type: "span",
        marks: [],
        text,
      },
    ],
  }));
}

async function run() {
  const sourcePath = path.resolve(__dirname, "../src/content/insights.ts");
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found at ${sourcePath}`);
    process.exit(1);
  }

  const rawSource = fs.readFileSync(sourcePath, "utf-8");
  const match = rawSource.match(
    /export const insights:\s*Insight\[\]\s*=\s*(\[[\s\S]*?\n\]);/
  );
  if (!match) {
    console.error("Could not parse insights array from src/content/insights.ts");
    process.exit(1);
  }

  const posts = new Function(`return ${match[1]}`)();
  console.log(`Found ${posts.length} posts to import.`);

  for (const post of posts) {
    console.log(`\nProcessing: "${post.title}" (${post.slug})`);

    // Check if post already exists
    const existing = await client.fetch(
      `*[_type == "insight" && slug.current == $slug][0]`,
      { slug: post.slug }
    );
    if (existing) {
      console.log(`  Already exists in Sanity (_id: ${existing._id}). Skipping.`);
      continue;
    }

    // Resolve pillar reference
    const pillarDoc = await client.fetch(
      `*[_type == "pillar" && slug.current == $slug][0]{ _id, name }`,
      { slug: post.pillar }
    );
    if (!pillarDoc?._id) {
      console.error(
        `  FAILED: Pillar with slug "${post.pillar}" not found in Sanity. Please create this pillar document in Studio first.`
      );
      continue;
    }

    // Resolve relatedService reference
    let serviceSlug = post.relatedService;
    if (serviceSlug === "brand-strategy-identity") {
      serviceSlug = "brand-identity";
    }

    let relatedServiceRef = undefined;
    if (serviceSlug) {
      const serviceDoc = await client.fetch(
        `*[_type == "service" && slug.current == $slug][0]{ _id, name }`,
        { slug: serviceSlug }
      );
      if (serviceDoc?._id) {
        relatedServiceRef = {
          _type: "reference",
          _ref: serviceDoc._id,
        };
      } else {
        console.warn(
          `  Warning: Service with slug "${serviceSlug}" not found in Sanity. Proceeding without service reference.`
        );
      }
    }

    const readingMinutes = parseInt(post.readingTime, 10) || 5;
    const publishedAt = `${post.date}T09:00:00Z`;

    const doc = {
      _type: "insight",
      title: post.title,
      slug: {
        _type: "slug",
        current: post.slug,
      },
      pillar: {
        _type: "reference",
        _ref: pillarDoc._id,
      },
      excerpt: post.excerpt,
      publishedAt,
      readingTime: readingMinutes,
      body: toPortableText(post.content),
      relatedService: relatedServiceRef,
    };

    const created = await client.create(doc);
    console.log(`  Created successfully! (_id: ${created._id})`);
  }

  console.log("\nMigration completed.");
}

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});

