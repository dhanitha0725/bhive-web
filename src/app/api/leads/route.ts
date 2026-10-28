import { NextResponse } from "next/server";
import { consultationLeadSchema } from "@/forms/schemas";
import { checkRateLimit } from "@/lib/leads/rate-limit";
import { dispatchLeadNotification } from "@/lib/leads/adapters";

export async function POST(request: Request) {
  try {
    // 1. IP extraction for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || undefined;

    // 2. Rate limit check
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a few minutes before submitting again, or message us directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // Support both direct payload or { data: ... }
    const payload = body.data || body;

    // 3. Honeypot check (anti-bot)
    if (payload.honeypot && String(payload.honeypot).trim() !== "") {
      // Silently accept bots without doing anything
      return NextResponse.json({ ok: true });
    }

    // 4. Zod validation
    const result = consultationLeadSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Please correct the highlighted fields.",
          issues: fieldErrors,
        },
        { status: 400 }
      );
    }

    const lead = result.data;
    const timestamp = new Date().toISOString();

    // 5. Record lead submission
    await dispatchLeadNotification(lead, {
      ip,
      userAgent,
      timestamp,
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks. We will WhatsApp you within 24 hours.",
    });
  } catch (error) {
    console.error("[POST /api/leads error]:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while sending your request. Please message us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
