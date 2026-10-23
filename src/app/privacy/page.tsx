import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | BHive",
  description:
    "How BHive collects, processes, and protects your consultation request data.",
};

export default function PrivacyPage() {
  return (
    <Section className="py-28 sm:py-36">
      <Container className="max-w-3xl">
        <span className="font-mono text-xs uppercase tracking-wider text-[#0066cc]">
          Data & Privacy
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold font-display text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: October 2026
        </p>

        <div className="mt-8 space-y-8 text-base text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          {/* 1. Data Collected */}
          <div>
            <h2 className="text-xl font-semibold font-display text-slate-900 mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you request a free growth consultation through our website or WhatsApp, we collect only the essential information needed to review your business and contact you:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Your Name</strong>: To know who we are communicating with.</li>
              <li><strong>WhatsApp Phone Number</strong>: To send your consultation response, message you, or arrange a short discussion.</li>
              <li><strong>Business or Venture Name</strong>: To review your current market presence, website, or social profiles prior to replying.</li>
              <li><strong>What You Need (Project Need)</strong>: The specific goals, questions, or marketing roadblocks you shared with us.</li>
            </ul>
          </div>

          {/* 2. Processors */}
          <div>
            <h2 className="text-xl font-semibold font-display text-slate-900 mb-2">
              2. Third-Party Processors
            </h2>
            <p>
              We do not sell or rent your information to advertisers. We use reputable third-party infrastructure providers solely to deliver lead alerts to our team:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Resend</strong>: Secure transactional email provider used to notify our team of new consultation submissions.</li>
              <li><strong>Telegram Bot API</strong>: Used to dispatch instant encrypted notification alerts to our internal management team.</li>
              <li><strong>Google Sheets Webhook</strong>: Used as an encrypted backup to log incoming inquiries in our private client pipeline spreadsheet.</li>
            </ul>
          </div>

          {/* 3. Purpose */}
          <div>
            <h2 className="text-xl font-semibold font-display text-slate-900 mb-2">
              3. Purpose of Processing
            </h2>
            <p>
              Your information is collected and processed for the sole purpose of:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Reviewing your current business marketing setup.</li>
              <li>Preparing your tailored 3-month action plan.</li>
              <li>Contacting you via WhatsApp or phone to deliver your free growth consultation.</li>
            </ul>
          </div>

          {/* 4. Retention */}
          <div>
            <h2 className="text-xl font-semibold font-display text-slate-900 mb-2">
              4. Data Retention
            </h2>
            <p>
              We retain consultation inquiries only for as long as necessary to fulfill the initial inquiry or manage an ongoing business engagement. If no business relationship develops, your submitted details are safely purged from our records within 6 months.
            </p>
          </div>

          {/* 5. Contact for Deletion */}
          <div>
            <h2 className="text-xl font-semibold font-display text-slate-900 mb-2">
              5. Requesting Data Deletion
            </h2>
            <p>
              You have the right to request immediate deletion of your submitted details at any time. Simply contact us through either of the following channels:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Email</strong>: Send a message to{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-[#0066cc] underline hover:text-[#0055b3]"
                >
                  {siteConfig.contactEmail}
                </a>{" "}
                with the subject line &ldquo;Delete My Data&rdquo;.
              </li>
              <li>
                <strong>WhatsApp</strong>: Send a message to our official WhatsApp (
                {siteConfig.whatsappDisplayNumber}) stating &ldquo;Please delete my data&rdquo;.
              </li>
            </ul>
            <p className="mt-3">
              We will delete all your records from our notification logs and spreadsheets within 48 hours of receiving your request.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
