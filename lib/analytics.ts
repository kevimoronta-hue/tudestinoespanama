"use client";

/**
 * Analytics event layer — not connected to any provider yet.
 * Events are pushed to `window.dataLayer` (if a tag manager is added later) and
 * dispatched as a DOM CustomEvent "tdep:analytics" for debugging.
 *
 * Privacy rule: never pass form field contents. Only event names and
 * non-personal context (locale, category, slug, request type).
 */

export type AnalyticsEvent =
  | "hero_primary_cta_click"
  | "hero_secondary_cta_click"
  | "journey_select"
  | "search_submit"
  | "filter_apply"
  | "article_open"
  | "professional_open"
  | "opportunity_open"
  | "source_click"
  | "contact_start"
  | "contact_submit_success"
  | "contact_submit_error"
  | "language_change"
  | "assistant_launcher_visible"
  | "assistant_opened"
  | "assistant_question_sent"
  | "suggested_question_clicked"
  | "whatsapp_clicked";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("tdep:analytics", { detail: payload }));
  if (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_DEBUG_ANALYTICS === "true") {
    console.info("[analytics]", payload);
  }
}
