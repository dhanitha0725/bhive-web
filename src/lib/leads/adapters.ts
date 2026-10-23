import type { ConsultationLeadInput } from "@/forms/schemas";

export interface LeadDispatcherResult {
  emailSent?: boolean;
  telegramSent?: boolean;
  sheetsAppended?: boolean;
  errors: string[];
}

/**
 * Interface definition for future WhatsApp Business Cloud API integration.
 * DO NOT implement active API calls now per project requirements.
 */
export interface WhatsAppCloudApiAdapter {
  sendTemplateNotification(lead: ConsultationLeadInput): Promise<boolean>;
}

// TODO: Replace with live WhatsApp Business Cloud API credentials when client configures Meta Developer App
export const whatsAppCloudApiAdapter: WhatsAppCloudApiAdapter = {
  async sendTemplateNotification(lead: ConsultationLeadInput) {
    console.info(
      "[WhatsApp Cloud API Adapter - TODO] Notification queued for:",
      lead.whatsappNumber
    );
    return true;
  },
};

/**
 * Dispatches notifications across configured channels.
 * Always logs the full payload to console so leads are never lost.
 */
export async function dispatchLeadNotification(
  lead: ConsultationLeadInput,
  meta: { ip?: string; userAgent?: string; timestamp: string }
): Promise<LeadDispatcherResult> {
  const result: LeadDispatcherResult = { errors: [] };

  // Always log lead details so no lead is lost silently
  console.info("================ NEW BHIVE LEAD ================");
  console.info("Timestamp:", meta.timestamp);
  console.info("Name:", lead.name);
  console.info("WhatsApp:", lead.whatsappNumber);
  console.info("Business:", lead.businessName);
  console.info("What they need:", lead.whatYouNeed);
  console.info("IP / Meta:", meta.ip || "unknown");
  console.info("================================================");

  // 1. Email Notification (Resend API if configured)
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.LEAD_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL_TO || "hello@bhive.lk";
  const emailFrom = process.env.LEAD_NOTIFICATION_FROM || "leads@bhive.lk";

  if (resendApiKey) {
    try {
      const emailHtml = `
        <h2>New Growth Consultation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/${cleanPhone(lead.whatsappNumber)}">${escapeHtml(lead.whatsappNumber)}</a></p>
        <p><strong>Business Name:</strong> ${escapeHtml(lead.businessName)}</p>
        <p><strong>What they need:</strong></p>
        <blockquote style="background:#f4f4f5;padding:12px;border-left:4px solid #0066cc;">
          ${escapeHtml(lead.whatYouNeed).replace(/\n/g, "<br/>")}
        </blockquote>
        <p style="font-size:12px;color:#71717a;">Submitted at: ${meta.timestamp} from IP: ${meta.ip || "unknown"}</p>
      `;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `BHive Leads <${emailFrom}>`,
          to: [emailTo],
          subject: `New Lead: ${lead.name} (${lead.businessName})`,
          html: emailHtml,
        }),
      });

      if (response.ok) {
        result.emailSent = true;
      } else {
        const errorText = await response.text();
        console.error("[Email Notification Failed]:", errorText);
        result.errors.push(`Email error: ${errorText}`);
      }
    } catch (err) {
      console.error("[Email Dispatch Exception]:", err);
      result.errors.push(`Email exception: ${(err as Error).message}`);
    }
  } else {
    // Note: In development or unconfigured state, this is expected
    result.errors.push("RESEND_API_KEY not configured. Lead recorded in console.");
  }

  // 2. Telegram Bot Notification (if configured)
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramBotToken && telegramChatId) {
    try {
      const tgText = `🐝 *New BHive Consultation Request*\n\n` +
        `👤 *Name:* ${escapeTg(lead.name)}\n` +
        `📱 *WhatsApp:* [${escapeTg(lead.whatsappNumber)}](https://wa.me/${cleanPhone(lead.whatsappNumber)})\n` +
        `🏢 *Business:* ${escapeTg(lead.businessName)}\n\n` +
        `💬 *What they need:*\n${escapeTg(lead.whatYouNeed)}\n\n` +
        `🕒 _${escapeTg(meta.timestamp)}_`;

      const tgUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      const response = await fetch(tgUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: tgText,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      });

      if (response.ok) {
        result.telegramSent = true;
      } else {
        const tgErr = await response.text();
        console.error("[Telegram Notification Failed]:", tgErr);
        result.errors.push(`Telegram error: ${tgErr}`);
      }
    } catch (err) {
      console.error("[Telegram Dispatch Exception]:", err);
      result.errors.push(`Telegram exception: ${(err as Error).message}`);
    }
  }

  // 3. Google Sheets Webhook (if configured)
  const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsWebhookUrl) {
    try {
      const response = await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: meta.timestamp,
          name: lead.name,
          whatsappNumber: lead.whatsappNumber,
          businessName: lead.businessName,
          whatYouNeed: lead.whatYouNeed,
          ip: meta.ip || "unknown",
        }),
      });

      if (response.ok) {
        result.sheetsAppended = true;
      } else {
        const sheetsErr = await response.text();
        console.error("[Google Sheets Webhook Failed]:", sheetsErr);
        result.errors.push(`Sheets error: ${sheetsErr}`);
      }
    } catch (err) {
      console.error("[Google Sheets Dispatch Exception]:", err);
      result.errors.push(`Sheets exception: ${(err as Error).message}`);
    }
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeTg(str: string): string {
  return str.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}

function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}
