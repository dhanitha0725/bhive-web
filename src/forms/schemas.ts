import { z } from "zod";
const optionalText = z.string().trim().max(500).optional().or(z.literal(""));
const contact = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  phone: optionalText,
  honeypot: z.literal("").optional(),
});
export const growthAuditSchema = contact.extend({
  businessName: z.string().trim().min(2, "Enter your business name.").max(150),
  websiteOrSocialUrl: optionalText,
  businessStage: z.string().trim().min(1, "Select your business stage."),
  mainChallenge: z.string().trim().min(10, "Tell us a little more about the challenge.").max(1500),
  consent: z.boolean().optional(),
});
export const guidanceCallSchema = contact.extend({
  businessIdeaOrCategory: z.string().trim().min(2, "Tell us what you are building.").max(200),
  currentStage: z.string().trim().min(1, "Select your current stage."),
  biggestQuestion: z.string().trim().min(10, "Tell us your biggest question.").max(1500),
});
export const generalContactSchema = contact.extend({
  business: optionalText,
  website: optionalText,
  enquiry: z.string().trim().min(1, "Select what you are contacting us about."),
  message: z.string().trim().min(10, "Tell us a little more about the challenge.").max(1500),
  consent: z.boolean().optional(),
});
export type GrowthAuditInput = z.infer<typeof growthAuditSchema>;
export type GuidanceCallInput = z.infer<typeof guidanceCallSchema>;
