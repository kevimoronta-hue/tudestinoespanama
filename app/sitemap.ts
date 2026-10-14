import type { MetadataRoute } from "next";
import { detailAlternates, getArticles, getOpportunities, getProfessionals } from "@/lib/content";
import { detailPath, localeMeta, locales, routeAlternates, routeKeys, type Locale } from "@/lib/i18n";
import { SITE_URL, hasSiteUrl } from "@/lib/site";

/**
 * Multilingual sitemap with hreflang alternates for the 5 locales. Sitemaps require
 * absolute URLs, so it stays empty until NEXT_PUBLIC_SITE_URL (confirmed domain) is set.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasSiteUrl) return [];
  const abs = (p: string) => `${SITE_URL}${p}`;
  const languages = (paths: Partial<Record<Locale, string>>) =>
    Object.fromEntries(locales.filter((l) => paths[l]).map((l) => [localeMeta[l].htmlLang, abs(paths[l]!)]));

  const entries: MetadataRoute.Sitemap = [];
  for (const key of routeKeys) {
    const paths = routeAlternates(key);
    for (const locale of locales) entries.push({ url: abs(paths[locale]), alternates: { languages: languages(paths) } });
  }
  for (const locale of locales) {
    for (const a of getArticles(locale)) {
      entries.push({
        url: abs(detailPath("articles", locale, a.slug)),
        lastModified: a.updatedAt,
        alternates: { languages: languages(detailAlternates("articles", a)) },
      });
    }
    for (const p of getProfessionals(locale)) {
      entries.push({
        url: abs(detailPath("professionals", locale, p.slug)),
        alternates: { languages: languages(detailAlternates("professionals", p)) },
      });
    }
    for (const o of getOpportunities(locale)) {
      entries.push({
        url: abs(detailPath("opportunities", locale, o.slug)),
        lastModified: o.publishedAt,
        alternates: { languages: languages(detailAlternates("opportunities", o)) },
      });
    }
  }
  return entries;
}
