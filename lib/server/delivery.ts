import "server-only";

/**
 * Delivery of contact / investor requests.
 *
 * No backend is connected yet. Configure one of:
 *   CONTACT_WEBHOOK_URL            → default endpoint (CRM, Make/Zapier, email service, etc.)
 *   CONTACT_WEBHOOK_URL_<TYPE>     → optional per-category routing, e.g. CONTACT_WEBHOOK_URL_INVERTIR
 *   CONTACT_WEBHOOK_SECRET         → sent as "Authorization: Bearer …"
 *
 * Without configuration the API answers 503 "not_configured" — the form then shows an
 * error and keeps the user's data. A success is never faked.
 * CONTACT_DRY_RUN=true (development only) validates without sending and the UI
 * says explicitly that nothing was sent.
 */

export type DeliveryResult = { ok: true; mode: "webhook" | "dry-run" } | { ok: false; reason: "not_configured" | "upstream_error" };

const ROUTE_ENV: Record<string, string> = {
  conocer: "CONTACT_WEBHOOK_URL_CONOCER",
  vivir: "CONTACT_WEBHOOK_URL_VIVIR",
  invertir: "CONTACT_WEBHOOK_URL_INVERTIR",
  empresa: "CONTACT_WEBHOOK_URL_EMPRESA",
  otra: "CONTACT_WEBHOOK_URL_OTRA",
};

export function resolveEndpoint(category: string): string | undefined {
  const specific = ROUTE_ENV[category] ? process.env[ROUTE_ENV[category]] : undefined;
  return specific || process.env.CONTACT_WEBHOOK_URL || undefined;
}

export async function deliver(category: string, payload: Record<string, unknown>): Promise<DeliveryResult> {
  const endpoint = resolveEndpoint(category);

  if (!endpoint) {
    if (process.env.NODE_ENV !== "production" && process.env.CONTACT_DRY_RUN === "true") {
      return { ok: true, mode: "dry-run" };
    }
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    return res.ok ? { ok: true, mode: "webhook" } : { ok: false, reason: "upstream_error" };
  } catch {
    return { ok: false, reason: "upstream_error" };
  }
}
