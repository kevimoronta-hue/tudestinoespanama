import "server-only";
import { cacheLife } from "next/cache";
import {
  allArticles as articleData,
  allOpportunities as opportunityData,
  allProfessionals as professionalData,
  allVideos as videoData,
} from "@/content";
import { getDictionary } from "@/lib/dictionaries";
import { detailPath, locales, type DetailKind, type Locale } from "@/lib/i18n";
import { isVisible as visible } from "@/lib/visibility";
import type {
  Article,
  ArticleSection,
  Opportunity,
  Professional,
  VideoResource,
} from "@/types/content";
import type { FacetOption, ListingItem, ListingKind } from "@/types/listing";

/**
 * Single access point to content. Replace the local arrays with a CMS adapter
 * (see docs/cms-comparison.md) without touching pages or components.
 */

const byDateDesc = <T,>(get: (x: T) => string) => (a: T, b: T) => get(b).localeCompare(get(a));

/**
 * Current date (UTC, YYYY-MM-DD), cached and refreshed hourly so prerendered pages
 * (opportunity status, footer year) stay current without making routes dynamic.
 */
export async function getToday(): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Date().toISOString().slice(0, 10);
}

/* ---------- Articles ---------- */

export function getArticles(locale: Locale, section?: ArticleSection): Article[] {
  return articleData
    .filter((a) => a.locale === locale && visible(a.status) && (!section || a.section === section))
    .sort(byDateDesc((a) => a.updatedAt));
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const pool = getArticles(article.locale).filter((a) => a.slug !== article.slug);
  const score = (a: Article) =>
    (a.category === article.category ? 2 : 0) + (a.section === article.section ? 1 : 0);
  return pool.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

/* ---------- Professionals ---------- */

export function getProfessionals(locale: Locale): Professional[] {
  return professionalData
    .filter((p) => p.locale === locale && visible(p.status))
    .sort((a, b) => Number(b.sponsored) - Number(a.sponsored) || a.name.localeCompare(b.name));
}

export function getProfessional(locale: Locale, slug: string): Professional | undefined {
  return getProfessionals(locale).find((p) => p.slug === slug);
}

/* ---------- Opportunities ---------- */

/** An opportunity without an identifiable source or organisation is never exposed. */
function hasSource(o: Opportunity): boolean {
  return /^https?:\/\//.test(o.sourceUrl) && o.organization.trim().length > 0;
}

export function isExpired(o: Opportunity, today: string): boolean {
  return Boolean(o.deadline && o.deadline < today);
}

export function getOpportunities(locale: Locale): Opportunity[] {
  return opportunityData
    .filter((o) => o.locale === locale && visible(o.status) && hasSource(o))
    .sort(byDateDesc((o) => o.publishedAt));
}

export function getOpportunity(locale: Locale, slug: string): Opportunity | undefined {
  return getOpportunities(locale).find((o) => o.slug === slug);
}

/* ---------- Videos ---------- */

export function getVideos(locale: Locale): VideoResource[] {
  return videoData
    .filter((v) => v.locale === locale && visible(v.status))
    .sort(byDateDesc((v) => v.publishedAt));
}

/* ---------- Translations (hreflang + language selector) ---------- */

type Translatable = { translationKey: string; locale: Locale; slug: string };
export type LocalizedPaths = Partial<Record<Locale, string>>;

function alternatesOf(kind: DetailKind, list: Translatable[], item: Translatable): LocalizedPaths {
  const out: LocalizedPaths = {};
  for (const x of list) {
    if (x.translationKey === item.translationKey) out[x.locale] = detailPath(kind, x.locale, x.slug);
  }
  return out;
}

const allVisible = {
  articles: () => locales.flatMap((l) => getArticles(l)),
  professionals: () => locales.flatMap((l) => getProfessionals(l)),
  opportunities: () => locales.flatMap((l) => getOpportunities(l)),
} satisfies Record<DetailKind, () => Translatable[]>;

/** Paths of the same item in every locale where a translation exists. */
export function detailAlternates(kind: DetailKind, item: Translatable): LocalizedPaths {
  return alternatesOf(kind, allVisible[kind](), item);
}

/** detail path → its paths in every locale (consumed by the language selector). */
export function getDetailAlternates(): Record<string, LocalizedPaths> {
  const map: Record<string, LocalizedPaths> = {};
  for (const kind of Object.keys(allVisible) as DetailKind[]) {
    const list = allVisible[kind]();
    for (const item of list) map[detailPath(kind, item.locale, item.slug)] = alternatesOf(kind, list, item);
  }
  return map;
}

/* ---------- Listing cards ---------- */

export function articleToItem(a: Article): ListingItem {
  const dict = getDictionary(a.locale);
  return {
    id: `articles:${a.slug}`,
    kind: "articles",
    href: detailPath("articles", a.locale, a.slug),
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    categoryLabel: dict.categories.articles[a.category],
    location: a.location,
    date: a.updatedAt,
    updatedAt: a.updatedAt,
    readingTime: a.readingTime,
    sourceLabels: a.sources.map((s) => s.publisher),
    image: a.coverImage,
    demo: a.status === "demo",
  };
}

export function professionalToItem(p: Professional): ListingItem {
  const dict = getDictionary(p.locale);
  return {
    id: `professionals:${p.slug}`,
    kind: "professionals",
    href: detailPath("professionals", p.locale, p.slug),
    title: p.name,
    excerpt: p.description,
    category: p.category,
    categoryLabel: dict.categories.professionals[p.category],
    location: p.location,
    date: p.verifiedAt ?? "0000-00-00",
    sponsored: p.sponsored,
    verifiedAt: p.verifiedAt,
    image: p.logo ?? p.coverImage,
    demo: p.status === "demo",
  };
}

export function opportunityToItem(o: Opportunity, today: string): ListingItem {
  const dict = getDictionary(o.locale);
  return {
    id: `opportunities:${o.slug}`,
    kind: "opportunities",
    href: detailPath("opportunities", o.locale, o.slug),
    title: o.title,
    excerpt: o.description,
    category: o.category,
    categoryLabel: dict.categories.opportunities[o.category],
    location: o.location,
    date: o.publishedAt,
    deadline: o.deadline,
    expired: isExpired(o, today),
    organization: o.organization,
    demo: o.status === "demo",
  };
}

export function videoToItem(v: VideoResource): ListingItem {
  const dict = getDictionary(v.locale);
  return {
    id: `videos:${v.slug}`,
    kind: "videos",
    href: v.videoUrl,
    title: v.title,
    excerpt: v.description,
    category: v.category,
    categoryLabel: dict.categories.videos[v.category],
    location: v.location,
    date: v.publishedAt,
    image: v.thumbnail,
    videoPending: !v.videoUrl,
    demo: v.status === "demo",
  };
}

export async function getListingItems(locale: Locale, kinds: ListingKind[]): Promise<ListingItem[]> {
  const today = await getToday();
  const items: ListingItem[] = [];
  if (kinds.includes("articles")) items.push(...getArticles(locale).map(articleToItem));
  if (kinds.includes("professionals")) items.push(...getProfessionals(locale).map(professionalToItem));
  if (kinds.includes("opportunities"))
    items.push(...getOpportunities(locale).map((o) => opportunityToItem(o, today)));
  if (kinds.includes("videos")) items.push(...getVideos(locale).map(videoToItem));
  return items;
}

export function facetsFor(items: ListingItem[]): { categories: FacetOption[]; locations: FacetOption[] } {
  const cats = new Map<string, string>();
  const locs = new Set<string>();
  for (const i of items) {
    cats.set(i.category, i.categoryLabel);
    locs.add(i.location);
  }
  return {
    categories: [...cats].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label)),
    locations: [...locs].sort().map((l) => ({ value: l, label: l })),
  };
}
