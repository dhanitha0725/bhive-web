import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ealudk4o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-12";
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const shouldUpdate = process.argv.includes("--update");
const skipImage = process.argv.includes("--no-image");

if (!writeToken) {
  console.error("Error: SANITY_API_WRITE_TOKEN environment variable is not set.");
  console.error("");
  console.error("Create an API token with 'Editor' or 'Write' permissions at https://sanity.io/manage");
  console.error("Then run:");
  console.error("  Bash / macOS / Linux:");
  console.error("    SANITY_API_WRITE_TOKEN=your_token node scripts/publish-entrepreneurship-blog.mjs");
  console.error("  Windows PowerShell:");
  console.error('    $env:SANITY_API_WRITE_TOKEN="your_token"; node scripts/publish-entrepreneurship-blog.mjs');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
});

let keyCounter = 0;
const nextKey = (prefix) => `${prefix}_${++keyCounter}`;

const textBlock = (text, style = "normal") => ({
  _key: nextKey("block"),
  _type: "block",
  style,
  markDefs: [],
  children: [
    {
      _key: nextKey("span"),
      _type: "span",
      marks: [],
      text,
    },
  ],
});

const leadInBlock = (leadIn, rest, options = {}) => ({
  _key: nextKey("block"),
  _type: "block",
  style: "normal",
  ...(options.bullet ? { listItem: "bullet", level: 1 } : {}),
  markDefs: [],
  children: [
    {
      _key: nextKey("span"),
      _type: "span",
      marks: ["strong"],
      text: leadIn,
    },
    {
      _key: nextKey("span"),
      _type: "span",
      marks: [],
      text: ` ${rest}`,
    },
  ],
});

const POST = {
  title:
    "What Building a Business Teaches That a Job Rarely Can: Problem Solving, Creativity, and Communication",
  slug: "what-building-a-business-teaches-that-a-job-rarely-can",
  excerpt:
    "Building a business removes workplace boundaries and trains problem-solving, creativity, and communication under real-world stakes.",
  publishedAt: "2026-11-16",
  readingTime: 5,
  preferredPillarSlugs: ["entrepreneurial-leadership", "creativity"],
  relatedServiceSlug: "business-strategy",
  coverImagePath: path.resolve(
    __dirname,
    "../src/assets/images/business_building_cover_1794851411132.jpg"
  ),
  coverImageAlt:
    "Open notebook with strategy diagrams and a blue pen on an oak desk in soft morning light",
  seo: {
    metaTitle: "What Building a Business Teaches That a Job Rarely Can",
    metaDescription:
      "How building a business cultivates problem-solving, creativity, and communication through real constraints, feedback, and customer conversations.",
  },
  body: [
    textBlock(
      "A job develops skill, but within a boundary. Your role has a defined scope, and the organization absorbs everything outside it: someone else handles finance, someone else handles customers, someone else fixes what breaks. Building something from the ground up removes that boundary. You become the strategist, salesperson, accountant, and troubleshooter all at once. This is overwhelming at first, and it is also the reason entrepreneurship is such a powerful learning environment. Three skills in particular, problem-solving, creativity, and communication, are cultivated in ways that are hard to replicate elsewhere."
    ),

    textBlock("Problem Solving: Learning Under Real Constraints", "h2"),
    textBlock(
      "Problem-solving is central to human cognition. Psychologists have long described human thinking as largely a process of closing the gap between a current state and a desired goal, and our large prefrontal cortex, which supports planning, working memory, and weighing alternatives, is what makes this possible."
    ),
    textBlock(
      "A business forces you to do this constantly, and with real stakes. Researchers distinguish between well-defined problems (a math exercise, with a clear method and a correct answer) and ill-defined problems (where the goal is fuzzy, information is missing, and several solutions might work). Most workplace tasks arrive partly structured. Entrepreneurial problems are almost always ill-defined: Why aren't customers buying? Should you cut the price or improve the product? Which of ten urgent tasks matters most?"
    ),
    textBlock("Several mechanisms make this a strong training ground:"),
    leadInBlock(
      "Deliberate practice through feedback.",
      "Skill research, most famously by Anders Ericsson, shows that improvement depends on repeated attempts with fast, clear feedback. A business supplies this naturally. Sales rise or fall, customers complain or return, cash flow tightens or eases. Each decision produces evidence."
    ),
    leadInBlock(
      "Decision-making under uncertainty.",
      "You rarely have complete data, so you learn to estimate probabilities, run small tests, and act on partial information. This is close to the scientific method: form a hypothesis, test it cheaply, observe, adjust. Entrepreneurs who work this way, sometimes called effectual reasoning in entrepreneurship research, start from the resources they have rather than waiting for perfect conditions."
    ),
    leadInBlock(
      "Stress inoculation.",
      "Moderate, manageable pressure can strengthen performance over time, a principle related to the Yerkes-Dodson curve. Too much pressure impairs thinking, which is why breaking large problems into smaller ones matters. Over time, situations that once felt like emergencies become familiar."
    ),
    textBlock(
      "The practical takeaway: write down your assumptions before each decision, and review the outcomes later. This turns raw experience into actual learning."
    ),

    textBlock("Creativity: Combining the Familiar in New Ways", "h2"),
    textBlock(
      "The claim that creativity is exclusively human deserves a small correction. Some animals show inventive behavior, such as tool use in crows and primates, but humans display creativity at a scale and flexibility no other species matches. Cognitive scientists generally define creativity as producing something both novel and useful. The second word matters, and it is where business differs from art: an idea that nobody needs is not yet a business."
    ),
    textBlock(
      "Research suggests creative ideas rarely come from nowhere. They usually come from recombination, connecting existing concepts in unexpected ways. Brain research points to interaction between the default mode network, which supports spontaneous association and imagination, and the executive control network, which evaluates and refines ideas. Creativity involves both generating and filtering."
    ),
    textBlock("Running a business trains both sides:"),
    leadInBlock(
      "Constraints fuel invention.",
      "Limited money, time, and staff push you to find unconventional solutions. Studies on creativity repeatedly find that moderate constraints can improve inventiveness by narrowing the search space. A founder who cannot afford advertising may invent a referral system or build a community instead."
    ),
    leadInBlock(
      "Exposure to diverse problems.",
      "Because you touch every part of the business, you collect varied mental material: how a supplier thinks, what a customer complains about, how a competitor prices. Wider inputs produce more potential combinations."
    ),
    leadInBlock(
      "Iteration beats inspiration.",
      "Most good ideas improve through cycles of prototype, feedback, and revision. Entrepreneurs learn that creativity is less a lightning bolt than a repeatable process."
    ),
    textBlock(
      "You do not need a million-dollar idea to benefit. Even a small venture trains you to notice unmet needs, which is the root of most successful products. Protect time for reflection, since ideas often surface during rest, walking, or other low-demand activity."
    ),

    textBlock("Communication: The Skill That Multiplies Everything Else", "h2"),
    textBlock(
      'Humans are deeply social. Evolutionary psychologists argue that our brains grew in part to manage complex social relationships, and research on social networks supports the business version of this. Sociologist Mark Granovetter\'s work on "the strength of weak ties" showed that opportunities often come through loose acquaintances rather than close friends, because they connect you to information and circles you would not otherwise reach. That is the scientific backbone of the idea that a single new connection can change your life.'
    ),
    textBlock("Business forces communication practice across many contexts:"),
    leadInBlock(
      "Persuasion and clarity.",
      "Explaining your offer in one or two sentences, to someone with limited attention, is a discipline. You learn to replace jargon with the customer's language."
    ),
    leadInBlock(
      "Listening.",
      "The most valuable communication skill is often listening. Understanding what a customer actually needs, which may differ from what they say, is the foundation of product-market fit."
    ),
    leadInBlock(
      "Negotiation.",
      "Dealing with suppliers, clients, and partners teaches you to find outcomes that work for both sides, an approach negotiation research associates with better long-term relationships than adversarial bargaining."
    ),
    leadInBlock(
      "Trust-building.",
      "Trust grows from consistent behavior: keeping promises, admitting mistakes, following up. Research on social capital shows trust reduces transaction costs, so people do business faster and more willingly."
    ),
    leadInBlock(
      "Emotional regulation.",
      "Handling an angry customer or a rejection without taking it personally builds emotional intelligence, which is linked to leadership effectiveness."
    ),
    textBlock(
      "Treat every conversation as a data source. Ask customers open-ended questions, then record what you learn."
    ),

    textBlock("Other Valuable Skills Along the Way", "h2"),
    textBlock("Beyond these three, a business quietly develops several others:"),
    leadInBlock(
      "Resilience.",
      "Setbacks are frequent. Psychologists describe resilience as a learnable capacity, strengthened by framing failure as information rather than verdict.",
      { bullet: true }
    ),
    leadInBlock(
      "Self-management.",
      "With no boss assigning tasks, you must prioritize, schedule, and sustain motivation, which develops executive function.",
      { bullet: true }
    ),
    leadInBlock(
      "Financial literacy.",
      "Understanding margins, cash flow, and pricing changes how you view money in every part of life.",
      { bullet: true }
    ),
    leadInBlock(
      "Learning how to learn.",
      "You acquire new skills quickly out of necessity, which makes you adaptable as technology and markets change.",
      { bullet: true }
    ),
    textBlock(
      "It would be dishonest to present entrepreneurship as purely beneficial. Many ventures fail, and the stress is real. Jobs offer stability, mentorship, and depth of expertise that are valuable too. The strongest path for many people is not either-or: you can build a side venture while employed, gaining breadth with a safety net."
    ),
    textBlock(
      "Starting a business, even a modest one, works like a high-intensity learning lab. It sharpens problem-solving through real feedback, develops creativity through constraint and recombination, and builds communication through countless human interactions. The skills outlast the venture itself. Whether your first business thrives or folds, you walk away more capable, more adaptable, and better connected than when you began. That alone makes it worth considering."
    ),
  ],
};

async function resolvePillar() {
  for (const slug of POST.preferredPillarSlugs) {
    const found = await client.fetch(
      `*[_type == "pillar" && slug.current == $slug][0]{ _id, name, "slug": slug.current }`,
      { slug }
    );
    if (found?._id) return found;
  }
  const fallback = await client.fetch(
    `*[_type == "pillar"] | order(order asc)[0]{ _id, name, "slug": slug.current }`
  );
  return fallback || null;
}

async function resolveService() {
  if (!POST.relatedServiceSlug) return undefined;
  const serviceDoc = await client.fetch(
    `*[_type == "service" && slug.current == $slug][0]{ _id, name }`,
    { slug: POST.relatedServiceSlug }
  );
  if (!serviceDoc?._id) return undefined;
  return { _type: "reference", _ref: serviceDoc._id };
}

async function uploadCoverImage() {
  if (skipImage || !fs.existsSync(POST.coverImagePath)) {
    return undefined;
  }
  console.log(`Uploading cover image from ${POST.coverImagePath}...`);
  const stream = fs.createReadStream(POST.coverImagePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(POST.coverImagePath),
  });
  return {
    _type: "image",
    alt: POST.coverImageAlt,
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function run() {
  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title }`,
    { slug: POST.slug }
  );

  if (existing?._id && !shouldUpdate) {
    console.log(
      `Insight "${existing.title}" already exists in Sanity (_id: ${existing._id}). Pass --update to overwrite.`
    );
    return;
  }

  const pillarDoc = await resolvePillar();
  if (!pillarDoc?._id) {
    console.error("No pillar documents found in Sanity. Create a pillar document first.");
    process.exit(1);
  }
  console.log(`Using pillar: ${pillarDoc.name} (${pillarDoc.slug})`);

  const relatedService = await resolveService();
  const coverImage = await uploadCoverImage();

  const docFields = {
    _type: "insight",
    title: POST.title,
    slug: {
      _type: "slug",
      current: POST.slug,
    },
    pillar: {
      _type: "reference",
      _ref: pillarDoc._id,
    },
    excerpt: POST.excerpt,
    publishedAt: POST.publishedAt,
    readingTime: POST.readingTime,
    body: POST.body,
    seo: POST.seo,
    ...(coverImage ? { coverImage } : {}),
    ...(relatedService ? { relatedService } : {}),
  };

  if (existing?._id && shouldUpdate) {
    const updated = await client.patch(existing._id).set(docFields).commit();
    console.log(`Updated insight in Sanity (_id: ${updated._id}).`);
  } else {
    const created = await client.create(docFields);
    console.log(`Created insight in Sanity (_id: ${created._id}).`);
  }
}

run().catch((err) => {
  console.error("Failed to publish insight to Sanity:", err.message);
  process.exit(1);
});
