// Analytics helper for Plausible and UTM/Referrer tracking

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    try {
      window.plausible(name, props ? { props } : undefined);
    } catch (e) {
      console.warn("[Analytics error]:", e);
    }
  }
}

export function trackCtaClick(location: string) {
  trackEvent("cta_click", { location });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", { location });
}

export function trackLeadSubmitSuccess() {
  trackEvent("lead_submit_success");
}

export function trackLeadSubmitError(error?: string) {
  trackEvent("lead_submit_error", error ? { error } : undefined);
}

export interface UtmAndReferrer {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

export function getUtmAndReferrer(): UtmAndReferrer {
  if (typeof window === "undefined") return {};

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const utm_source = searchParams.get("utm_source") || undefined;
    const utm_medium = searchParams.get("utm_medium") || undefined;
    const utm_campaign = searchParams.get("utm_campaign") || undefined;
    const utm_term = searchParams.get("utm_term") || undefined;
    const utm_content = searchParams.get("utm_content") || undefined;
    const referrer = document.referrer ? document.referrer : undefined;

    return {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
    };
  } catch {
    return {};
  }
}
