import { z } from "zod";
import { siteConfig } from "../config/site";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  RESEND_API_KEY: z.string().trim().optional(),
  LEAD_NOTIFICATION_EMAIL: z.string().trim().email().optional(),
  LEAD_NOTIFICATION_FROM: z.string().trim().optional(),
  TELEGRAM_BOT_TOKEN: z.string().trim().optional(),
  TELEGRAM_CHAT_ID: z.string().trim().optional(),
  GOOGLE_SHEETS_WEBHOOK_URL: z.string().trim().url().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validates environment variables and siteConfig.
 * In production, fails startup/build if:
 * 1. No notification channel is configured
 * 2. whatsappNumber is still the placeholder value
 * 3. contactEmail is still the placeholder value
 */
export function validateEnv(): EnvConfig {
  const parsed = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEAD_NOTIFICATION_EMAIL: process.env.LEAD_NOTIFICATION_EMAIL,
    LEAD_NOTIFICATION_FROM: process.env.LEAD_NOTIFICATION_FROM,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    GOOGLE_SHEETS_WEBHOOK_URL: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
  });

  const isProd = parsed.NODE_ENV === "production";

  const hasResend = Boolean(parsed.RESEND_API_KEY);
  const hasTelegram = Boolean(
    parsed.TELEGRAM_BOT_TOKEN && parsed.TELEGRAM_CHAT_ID
  );
  const hasSheets = Boolean(parsed.GOOGLE_SHEETS_WEBHOOK_URL);
  const hasAnyChannel = hasResend || hasTelegram || hasSheets;

  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return parsed;
  }

  if (isProd) {
    if (!hasAnyChannel) {
      throw new Error(
        "❌ [Production Configuration Error]: At least one lead notification channel must be configured. Set RESEND_API_KEY, (TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID), or GOOGLE_SHEETS_WEBHOOK_URL."
      );
    }

    if (siteConfig.whatsappNumber === "94770000000") {
      throw new Error(
        "❌ [Production Configuration Error]: siteConfig.whatsappNumber is still set to placeholder '94770000000'. Replace with a real WhatsApp number before deploying."
      );
    }

    if (siteConfig.contactEmail === "hello@bhive.lk") {
      throw new Error(
        "❌ [Production Configuration Error]: siteConfig.contactEmail is still set to placeholder 'hello@bhive.lk'. Replace with verified business email before deploying."
      );
    }
  } else {
    // Development mode warning
    if (!hasAnyChannel) {
      console.warn(
        "⚠️ [BHive Development Warning]: No lead notification channel is configured (RESEND_API_KEY, Telegram, or Google Sheets). Leads will be logged to console in dev mode."
      );
    }
  }

  return parsed;
}
