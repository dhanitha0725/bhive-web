import { z } from "zod";
import { normalizePhoneNumber } from "../lib/phone.ts";

export const consultationLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  whatsappNumber: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(25, "Phone number is too long.")
    .refine((val) => {
      const result = normalizePhoneNumber(val);
      return result.valid;
    }, {
      message:
        "Please enter a valid phone number (e.g. 077 123 4567, +94 77 123 4567, or 94771234567).",
    }),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business or project name.")
    .max(150, "Business name is too long."),
  whatYouNeed: z
    .string()
    .trim()
    .min(10, "Please share a few words about what you want to achieve or fix.")
    .max(2000, "Message is too long."),
  honeypot: z.string().max(0, "Bot detected.").optional().default(""),
  // Analytics attribution metadata
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(500).optional(),
});

export type ConsultationLeadInput = z.infer<typeof consultationLeadSchema>;

// Backward compatibility alias for any existing imports
export const leadSchema = consultationLeadSchema;
