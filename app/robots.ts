import type { MetadataRoute } from "next";
import { SITE_URL, hasSiteUrl } from "@/lib/site";

/** Until the real domain is confirmed, crawlers are asked not to index anything. */
export default function robots(): MetadataRoute.Robots {
  if (!hasSiteUrl) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
