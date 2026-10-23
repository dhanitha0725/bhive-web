import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/marketing";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/config/site";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { createMetadata } from "@/seo/metadata";
import { MessageSquare, Mail, Phone, ShieldCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact BHive | Get Your Free Growth Consultation",
  description:
    "Get in touch with BHive. Message us on WhatsApp or send a message to get your free marketing consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Tell us what you want to achieve or fix in your business."
        body="No complicated forms or pressure. Reach out on WhatsApp or fill in the quick form below, and we'll review your business within 24 hours."
        showCta={false}
      />

      <Section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct WhatsApp & Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[22px] bg-emerald-50/70 border border-emerald-200/90 p-6 sm:p-7">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Fastest Way
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-semibold font-display text-slate-900">
                  Chat directly on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  Send us a message right now. We typically reply in under an hour during regular Sri Lankan business hours.
                </p>

                <WhatsAppLink
                  location="contact_page"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-base font-semibold text-white transition-all active:scale-[0.98] shadow-sm"
                >
                  <MessageSquare className="h-5 w-5 fill-white stroke-none" />
                  <span>Open WhatsApp Chat</span>
                </WhatsAppLink>
              </div>

              {/* Contact Information */}
              <div className="rounded-[22px] bg-slate-50 border border-slate-200 p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
                  Direct Contact Details
                </h3>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <Mail className="h-4 w-4 text-[#0066cc]" />
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="hover:underline hover:text-[#0066cc]"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <Phone className="h-4 w-4 text-[#0066cc]" />
                  <span>{siteConfig.whatsappDisplayNumber}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                  Location: Colombo, Sri Lanka · Working with clients island-wide.
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 text-xs text-slate-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <ShieldCheck className="h-5 w-5 text-[#0066cc] shrink-0 mt-0.5" />
                <span>
                  <strong>100% Free Consultation Guarantee:</strong> We provide real, actionable feedback. No high-pressure sales pitches.
                </span>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-7 rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-semibold font-display text-slate-900">
                Send a quick message
              </h2>
              <p className="mt-1 text-sm text-slate-600 mb-6">
                Fill in these details and we will review your business and reply via WhatsApp within 24 hours.
              </p>

              <LeadForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
