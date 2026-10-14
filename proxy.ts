import { NextResponse, type NextRequest } from "next/server";
import { isLocale, LOCALE_COOKIE, negotiateLocale } from "@/lib/i18n";
import { validPaths } from "@/lib/routing";

/**
 * 1. "/" → the visitor's language: an explicit earlier choice (cookie set by the
 *    language selector) wins, then the browser's Accept-Language, then Spanish.
 *    Runs on "/" only for that rule, so it can never loop.
 * 2. Any path under a supported locale that is not a known page is rewritten to the
 *    localized 404 route, so it answers with a real HTTP 404 (prerendered shells would
 *    otherwise stream a 200). The URL in the address bar is unchanged.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale = isLocale(cookie) ? cookie : negotiateLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Vary", "Accept-Language, Cookie");
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
