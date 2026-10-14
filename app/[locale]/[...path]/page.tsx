import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleView,
  articleMetadata,
  OpportunityView,
  opportunityMetadata,
  ProfessionalView,
  professionalMetadata,
} from "@/components/views/DetailViews";
import {
  AboutView,
  aboutMetadata,
  ContactView,
  contactMetadata,
  DiscoverView,
  discoverMetadata,
  ExploreView,
  exploreMetadata,
  InvestView,
  investMetadata,
  LiveView,
  liveMetadata,
  PrivacyView,
  privacyMetadata,
} from "@/components/views/SectionViews";
import { isLocale, locales, resolvePath, routes, routeKeys, type Locale, type RouteKey } from "@/lib/i18n";
import { visibleSlugs } from "@/lib/routing";

/**
 * One resolver for every localized URL below "/{locale}" (the home page has its own file).
 * Slugs come from the route table in lib/i18n.ts — no per-language folders, no locale
 * conditionals. Unknown paths never reach this page: proxy.ts answers them with a 404.
 */

/**
 * Every path under this route is prerendered from generateStaticParams, and the whole
 * page depends on the resolved path, so a client navigation simply waits for the
 * (static, CDN-cached) page instead of showing a skeleton shell first.
 */
export const instant = false;

type StaticKey = Exclude<RouteKey, "home">;

const STATIC_VIEWS: Record<StaticKey, { View: (p: { locale: Locale }) => React.ReactNode; meta: (l: Locale) => Metadata }> = {
  discover: { View: DiscoverView, meta: discoverMetadata },
  live: { View: LiveView, meta: liveMetadata },
  invest: { View: InvestView, meta: investMetadata },
  explore: { View: (p) => <ExploreView {...p} />, meta: (l) => exploreMetadata(l) },
  articles: { View: (p) => <ExploreView {...p} kind="articles" />, meta: (l) => exploreMetadata(l, "articles") },
  professionals: { View: (p) => <ExploreView {...p} kind="professionals" />, meta: (l) => exploreMetadata(l, "professionals") },
  opportunities: { View: (p) => <ExploreView {...p} kind="opportunities" />, meta: (l) => exploreMetadata(l, "opportunities") },
  videos: { View: (p) => <ExploreView {...p} kind="videos" />, meta: (l) => exploreMetadata(l, "videos") },
  about: { View: AboutView, meta: aboutMetadata },
  contact: { View: ContactView, meta: contactMetadata },
  privacy: { View: PrivacyView, meta: privacyMetadata },
};

const DETAIL_VIEWS = {
  articles: { View: ArticleView, meta: articleMetadata },
  professionals: { View: ProfessionalView, meta: professionalMetadata },
  opportunities: { View: OpportunityView, meta: opportunityMetadata },
};

const split = (path: string) => path.split("/").filter(Boolean);

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...routeKeys.filter((k) => k !== "home").map((k) => ({ locale, path: split(routes[k][locale]) })),
    ...(["articles", "professionals", "opportunities"] as const).flatMap((kind) =>
      visibleSlugs(kind, locale).map((slug) => ({ locale, path: [...split(routes[kind][locale]), slug] })),
    ),
  ]);
}

async function resolve(params: PageProps<"/[locale]/[...path]">["params"]) {
  const { locale, path } = await params;
  if (!isLocale(locale)) return null;
  const route = resolvePath(locale, path.map(decodeURIComponent));
  return route ? { locale, route } : null;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[...path]">): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) notFound();
  if (r.route.type === "static") return STATIC_VIEWS[r.route.key as StaticKey].meta(r.locale);
  return DETAIL_VIEWS[r.route.kind].meta(r.locale, r.route.slug);
}

export default async function Page({ params }: PageProps<"/[locale]/[...path]">) {
  const r = await resolve(params);
  if (!r || (r.route.type === "static" && r.route.key === "home")) notFound();
  if (r.route.type === "static") {
    const { View } = STATIC_VIEWS[r.route.key as StaticKey];
    return <View locale={r.locale} />;
  }
  const { View } = DETAIL_VIEWS[r.route.kind];
  return <View locale={r.locale} slug={r.route.slug} />;
}
