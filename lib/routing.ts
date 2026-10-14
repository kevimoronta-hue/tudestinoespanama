/**
 * Every valid public path, computed once from the route table and the visible
 * content. Shared by the catch-all page (generateStaticParams) and proxy.ts
 * (real HTTP 404 for unknown URLs). Edge-safe: no server-only imports.
 */
import { allArticles, allOpportunities, allProfessionals } from "@/content";
import { detailPath, href, locales, routeKeys, type DetailKind, type Locale } from "@/lib/i18n";
import { isVisible } from "@/lib/visibility";

type Item = { locale: Locale; slug: string; status: Parameters<typeof isVisible>[0] };

const collections: Record<DetailKind, Item[]> = {
  articles: allArticles,
  professionals: allProfessionals,
  opportunities: allOpportunities,
};

export function visibleSlugs(kind: DetailKind, locale: Locale): string[] {
  return collections[kind].filter((i) => i.locale === locale && isVisible(i.status)).map((i) => i.slug);
}

let cache: Set<string> | null = null;

export function validPaths(): Set<string> {
  if (cache) return cache;
  const set = new Set<string>();
  for (const locale of locales) {
    for (const key of routeKeys) set.add(href(key, locale));
    for (const kind of Object.keys(collections) as DetailKind[]) {
      for (const slug of visibleSlugs(kind, locale)) set.add(detailPath(kind, locale, slug));
    }
  }
  cache = set;
  return set;
}
