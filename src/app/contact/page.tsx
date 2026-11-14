import { Container } from "@/components/ui/container";
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
    <div className="w-full bg-white text-[#0b1220]">
      <PageHero
        eyebrow="Contact Us"
        title="Tell us what you want to achieve or fix in your business."
        body="No complicated forms or pressure. Reach out on WhatsApp or fill in the quick form below, and we'll review your business within 24 hours."
        showCta={false}
      />

      <section className="w-full py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct WhatsApp & Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#f5f7fa] border border-[#e5e8ee] p-7">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9]">
                  Fastest Way
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-medium tracking-[-0.02em] text-[#0b1220]">
                  Chat directly on WhatsApp
                </h2>
                <p className="mt-2 text-sm text-[#5b6475] leading-[1.6]">
                  Send us a message right now. We typically reply in under an hour during Sri Lankan business hours.
                </p>

                <WhatsAppLink
                  location="contact_page"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2.5 h-12 rounded-full bg-[#3068f9] hover:bg-[#1f55e0] px-6 text-[15px] font-medium text-white transition-colors duration-200 active:scale-[0.98]"
                >
                  <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
                  <span>Open WhatsApp Chat</span>
                </WhatsAppLink>
              </div>

              {/* Contact Information */}
              <div className="rounded-2xl bg-white border border-[#e5e8ee] p-7 space-y-4">
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-[#5b6475]">
                  Direct Contact Details
                </h3>

                <div className="flex items-center gap-3 text-sm text-[#0b1220]">
                  <Mail className="h-4 w-4 text-[#3068f9]" strokeWidth={1.75} />
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="hover:underline hover:text-[#3068f9] transition-colors"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#0b1220]">
                  <Phone className="h-4 w-4 text-[#3068f9]" strokeWidth={1.75} />
                  <span>{siteConfig.whatsappDisplayNumber}</span>
                </div>

                <div className="pt-3 border-t border-[#e5e8ee] text-xs text-[#5b6475]">
                  Colombo, Sri Lanka · Working with businesses island-wide.
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 text-xs text-[#5b6475] bg-[#eef3ff] p-4 rounded-xl border border-[#dce6fb]">
                <ShieldCheck className="h-5 w-5 text-[#3068f9] shrink-0 mt-0.5" strokeWidth={1.75} />
                <span className="leading-[1.55]">
                  <strong className="font-medium text-[#0b1220]">100% Free Consultation Guarantee:</strong>{" "}
                  We provide real, actionable feedback with zero sales pressure.
                </span>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-7 rounded-2xl border border-[#e5e8ee] bg-white p-7 sm:p-9">
              <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#0b1220]">
                Send a quick message
              </h2>
              <p className="mt-1.5 text-sm text-[#5b6475] mb-6 leading-[1.6]">
                Fill in these details and we will review your business and reply via WhatsApp within 24 hours.
              </p>

              <LeadForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
