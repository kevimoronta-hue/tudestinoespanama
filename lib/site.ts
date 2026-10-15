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
 * Demo content (status: "demo", always labelled "Demo") is SHOWN by default — the site is
 * presented to the client as a demo. To hide it on the public launch, set
 * NEXT_PUBLIC_SHOW_DEMO_CONTENT=false (e.g. in the Vercel project) and redeploy.
 */
export const showDemoContent = process.env.NEXT_PUBLIC_SHOW_DEMO_CONTENT !== "false";
