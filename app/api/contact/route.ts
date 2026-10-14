import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n";
import { deliver } from "@/lib/server/delivery";
import { rateLimit } from "@/lib/server/rate-limit";
import { FIELD_RULES, sanitize, validateForm, type FormKind } from "@/lib/validation";

const MAX_BODY_BYTES = 16 * 1024;

function clientKey(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  // Hash so raw IPs are never kept in memory or logs.
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → silently accept without delivering (bots get no signal).
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, mode: "webhook" });
  }

  const limit = rateLimit(clientKey(req));
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const kind: FormKind = body.kind === "invest" ? "invest" : "contact";
  const locale = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "es";

  const errors = validateForm(kind, { ...body, consent: body.consent === true } as Record<string, string | boolean>);
  const invalid = Object.keys(errors).filter((k) => errors[k]);
  if (invalid.length) {
    return NextResponse.json({ ok: false, error: "validation", fields: invalid }, { status: 422 });
  }

  const clean: Record<string, string> = {};
  for (const [field, rule] of Object.entries(FIELD_RULES[kind])) {
    clean[field] = sanitize(body[field], rule.max);
  }

  const category = kind === "invest" ? "invertir" : clean.requestType;
  const payload = {
    type: kind === "invest" ? "InvestorRequest" : "ContactRequest",
    ...clean,
    requestType: category,
    locale,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  const result = await deliver(category, payload);

  // Log only non-personal metadata.
  console.info(`[contact] kind=${kind} category=${category} result=${result.ok ? result.mode : result.reason}`);

  if (result.ok) return NextResponse.json({ ok: true, mode: result.mode });
  if (result.reason === "not_configured") {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
}
