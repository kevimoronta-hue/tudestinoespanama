/**
 * Site-wide configuration read from the environment.
 * No production domain is confirmed yet: NEXT_PUBLIC_SITE_URL stays empty until the
 * client provides it. While empty, canonical/hreflang/sitemap URLs are not emitted
 * and the site asks search engines not to index it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");

export const hasSiteUrl = SITE_URL.length > 0;

/**
 * Base URL for social preview images (og:image / twitter:image must be absolute).
 * The real domain when configured; otherwise the Vercel deployment URL (production URL of
 * the project, then the deployment itself), so link previews work before the domain is set.
 * Canonical, hreflang and sitemap still wait for NEXT_PUBLIC_SITE_URL.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "";
export const SOCIAL_BASE_URL = SITE_URL || (vercelHost ? `https://${vercelHost.replace(/\/+$/, "")}` : "");

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
