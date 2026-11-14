import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy | BHive",
  description:
    "How BHive collects, processes, and protects your consultation request data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="w-full bg-white text-[#0b1220] pt-32 sm:pt-40 pb-20 sm:pb-28">
      <Container className="max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#3068f9]">
          Data &amp; Privacy
        </span>
        <h1 className="mt-2.5 text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-[#0b1220]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#5b6475]">
          Last updated: October 2026
        </p>

        <div className="mt-10 space-y-8 text-base text-[#5b6475] leading-[1.65] border-t border-[#e5e8ee] pt-8">
          <div>
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[#0b1220] mb-2.5">
              1. Information We Collect
            </h2>
            <p>
              When you request a free growth consultation through our website or WhatsApp, we collect only the essential information needed to review your business and contact you:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li><strong className="font-medium text-[#0b1220]">Your Name</strong>: To know who we are communicating with.</li>
              <li><strong className="font-medium text-[#0b1220]">WhatsApp Phone Number</strong>: To send your consultation response, message you, or arrange a short discussion.</li>
              <li><strong className="font-medium text-[#0b1220]">Business or Venture Name</strong>: To review your current market presence, website, or social profiles prior to replying.</li>
              <li><strong className="font-medium text-[#0b1220]">What You Need (Project Need)</strong>: The specific goals, questions, or marketing roadblocks you shared with us.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[#0b1220] mb-2.5">
              2. Third-Party Processors
            </h2>
            <p>
              We do not sell or rent your personal information to advertisers. We only use secure hosting and communication infrastructure necessary to deliver our services and review your inquiries.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[#0b1220] mb-2.5">
              3. Purpose of Processing
            </h2>
            <p>
              Your information is collected and processed for the sole purpose of:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>Reviewing your current business marketing setup.</li>
              <li>Preparing your tailored 3-month action plan.</li>
              <li>Contacting you via WhatsApp or phone to deliver your free growth consultation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[#0b1220] mb-2.5">
              4. Retention
            </h2>
            <p>
              We retain consultation inquiries only for as long as necessary to fulfill the initial inquiry or manage an ongoing business engagement. If no business relationship develops, your submitted details are safely purged from our records within 6 months.
            </p>
          </div>

          <div id="cookies">
            <h2 className="text-xl font-medium tracking-[-0.015em] text-[#0b1220] mb-2.5">
              5. Requesting Data Deletion
            </h2>
            <p>
              You have the right to request immediate deletion of your submitted details at any time. Simply contact us through either of the following channels:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5">
              <li>
                <strong className="font-medium text-[#0b1220]">Email</strong>: Send a message to{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-[#3068f9] underline hover:text-[#1f55e0]"
                >
                  {siteConfig.contactEmail}
                </a>{" "}
                with the subject line &ldquo;Delete My Data&rdquo;.
              </li>
              <li>
                <strong className="font-medium text-[#0b1220]">WhatsApp</strong>: Send a message to our official WhatsApp (
                {siteConfig.whatsappDisplayNumber}) stating &ldquo;Please delete my data&rdquo;.
              </li>
            </ul>
            <p className="mt-3">
              We will delete all your records from our systems within 48 hours of receiving your request.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
