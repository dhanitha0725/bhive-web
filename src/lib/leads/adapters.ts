import type { ConsultationLeadInput } from "@/forms/schemas";

export interface LeadDispatcherResult {
  logged?: boolean;
  errors: string[];
}

/**
 * Interface definition for future WhatsApp Business Cloud API integration.
 * DO NOT implement active API calls now per project requirements.
 */
export interface WhatsAppCloudApiAdapter {
  sendTemplateNotification(lead: ConsultationLeadInput): Promise<boolean>;
}

export function maskPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length <= 3) return "***";
  const lastThree = digits.slice(-3);
  return `*******${lastThree}`;
}

// TODO: Replace with live WhatsApp Business Cloud API credentials when client configures Meta Developer App
export const whatsAppCloudApiAdapter: WhatsAppCloudApiAdapter = {
  async sendTemplateNotification(lead: ConsultationLeadInput) {
    console.info(
      "[WhatsApp Cloud API Adapter - TODO] Notification queued for:",
      maskPhoneNumber(lead.whatsappNumber)
    );
    return true;
  },
};

/**
 * Dispatches / logs consultation lead.
 * Masks phone number in server logs (last 3 digits only).
 * Never logs full message body in production.
 */
export async function dispatchLeadNotification(
  lead: ConsultationLeadInput,
  meta: { ip?: string; userAgent?: string; timestamp: string }
): Promise<LeadDispatcherResult> {
  const result: LeadDispatcherResult = { logged: true, errors: [] };
  const isProd = process.env.NODE_ENV === "production";

  const maskedPhone = maskPhoneNumber(lead.whatsappNumber);
  const loggedMessage = isProd
    ? `[REDACTED in production, length: ${lead.whatYouNeed.length} chars]`
    : lead.whatYouNeed;

  // Masked audit log so privacy is preserved and no full body is logged in production
  console.info("================ NEW BHIVE LEAD ================");
  console.info("Timestamp:", meta.timestamp);
  console.info("Name:", lead.name);
  console.info("WhatsApp:", maskedPhone);
  console.info("Business:", lead.businessName);
  console.info("What they need:", loggedMessage);
  console.info("IP / Meta:", meta.ip || "unknown");
  console.info("================================================");

  return result;
}
