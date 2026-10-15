import type { Locale } from "./i18n";

/**
 * Country (ISO 3166-1 alpha-2) → site language, for the FIRST visit to "/" only.
 * The country comes from the CDN request header — never the raw IP:
 *   Vercel `x-vercel-ip-country`, Cloudflare `cf-ipcountry`, CloudFront `cloudfront-viewer-country`.
 * Countries not listed fall back to English (international default).
 */
const COUNTRY_LOCALE: Record<string, Locale> = {};
const assign = (locale: Locale, codes: string) => codes.split(" ").forEach((c) => (COUNTRY_LOCALE[c] = locale));

// Spanish-speaking markets.
assign("es", "PA DO ES MX CO AR CL PE EC VE UY PY BO CR GT HN NI SV CU PR GQ");
// French. Canada and Switzerland → FR until a regional signal exists.
assign("fr", "FR CA BE CH LU MC SN CI CM ML BF NE TG BJ GA CG CD MG HT RE GP MQ GF PF NC");
// German.
assign("de", "DE AT LI");
// Italian.
assign("it", "IT SM VA");
// English-speaking markets (also the fallback for every other country).
assign("en", "US GB IE AU NZ JM BS BB TT BZ GY BM KY VG VI ZA NG KE GH SG PH IN MT");

export const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "cloudfront-viewer-country"] as const;

export function countryFromHeaders(headers: Headers): string | null {
  for (const h of COUNTRY_HEADERS) {
    const v = headers.get(h)?.trim().toUpperCase();
    // "XX" / "T1" are Cloudflare's unknown / Tor codes.
    if (v && /^[A-Z]{2}$/.test(v) && v !== "XX" && v !== "T1") return v;
  }
  return null;
}

export function localeForCountry(country: string): Locale {
  return COUNTRY_LOCALE[country] ?? "en";
}
