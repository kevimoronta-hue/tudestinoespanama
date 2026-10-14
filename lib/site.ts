/**
 * Site-wide configuration read from the environment.
 * No production domain is confirmed yet: NEXT_PUBLIC_SITE_URL stays empty until the
 * client provides it. While empty, canonical/hreflang/sitemap URLs are not emitted
 * and the site asks search engines not to index it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

export const hasSiteUrl = SITE_URL.length > 0;

export function absoluteUrl(path: string): string | undefined {
  return hasSiteUrl ? `${SITE_URL}${path}` : undefined;
}

/**
 * Demo content (status: "demo") is shown in development by default and hidden in
 * production builds unless NEXT_PUBLIC_SHOW_DEMO_CONTENT=true is set explicitly
 * (e.g. for a private preview). It is always labelled "Demo" when shown.
 */
export const showDemoContent =
  process.env.NEXT_PUBLIC_SHOW_DEMO_CONTENT !== undefined
    ? process.env.NEXT_PUBLIC_SHOW_DEMO_CONTENT === "true"
    : process.env.NODE_ENV !== "production";
