import { NextResponse, type NextRequest } from "next/server";
import { COUNTRY_HEADERS, countryFromHeaders, localeForCountry } from "@/lib/geo-locale";
import { isLocale, LOCALE_COOKIE, negotiateLocale } from "@/lib/i18n";
import { validPaths } from "@/lib/routing";

/**
 * 1. "/" → the visitor's language, decided before any render (no language flash):
 *    a) the language chosen manually earlier (cookie set by the selector) always wins;
 *    b) else the visitor's country from the CDN header (lib/geo-locale.ts, never the IP);
 *    c) else the browser's Accept-Language, else English (international fallback).
 *    Only "/" is redirected: an explicit /xx/... URL is never touched, so no loop.
 * 2. Any path under a supported locale that is not a known page is rewritten to the
 *    localized 404 route, so it answers with a real HTTP 404 (prerendered shells would
 *    otherwise stream a 200). The URL in the address bar is unchanged.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const country = countryFromHeaders(request.headers);
    const locale = isLocale(cookie)
      ? cookie
      : country
        ? localeForCountry(country)
        : negotiateLocale(request.headers.get("accept-language"), "en");
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Vary", ["Accept-Language", "Cookie", ...COUNTRY_HEADERS].join(", "));
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const first = pathname.split("/")[1];
  if (!isLocale(first)) return NextResponse.next(); // global-not-found handles the rest

  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (validPaths().has(normalized)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${first}/x-404`;
  return NextResponse.rewrite(url, { status: 404 });
}

export const config = {
  // Pages only: skip Next internals, the API, static media and metadata files.
  matcher: [
    "/((?!_next/|api/|video/|images/|brand/|icon|apple-icon|manifest|robots|sitemap|favicon).*)",
  ],
};
