import { z } from "zod";

export const consultationLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  whatsappNumber: z
    .string()
    .trim()
    .min(8, "Please enter a valid WhatsApp phone number.")
    .max(25, "Phone number is too long.")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number (e.g. 077 123 4567 or +94 77 123 4567)."
    ),
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
});

export type ConsultationLeadInput = z.infer<typeof consultationLeadSchema>;

// Backward compatibility alias for any existing imports
export const leadSchema = consultationLeadSchema;
