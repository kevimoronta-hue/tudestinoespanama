import type { Locale } from "@/types/content";

export type { Locale };

/**
 * Single source of truth for languages and localized URLs.
 * Spanish is the default locale. Adding a language = one entry in `localeMeta`,
 * one column in `routes`, one dictionary in lib/dictionaries and its content files.
 */
export const locales = ["es", "en", "fr", "de", "it"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export type FlagCode = "pa" | "us" | "fr" | "de" | "it";

export const localeMeta: Record<
  Locale,
  { name: string; flag: FlagCode; country: string; htmlLang: string; og: string; intl: string }
> = {
  es: { name: "Español", flag: "pa", country: "Panamá", htmlLang: "es", og: "es_PA", intl: "es-PA" },
  en: { name: "English", flag: "us", country: "Estados Unidos", htmlLang: "en", og: "en_US", intl: "en-US" },
  fr: { name: "Français", flag: "fr", country: "France", htmlLang: "fr", og: "fr_FR", intl: "fr-FR" },
  de: { name: "Deutsch", flag: "de", country: "Deutschland", htmlLang: "de", og: "de_DE", intl: "de-DE" },
  it: { name: "Italiano", flag: "it", country: "Italia", htmlLang: "it", og: "it_IT", intl: "it-IT" },
};

/** Localized path of every static route (ASCII slugs, no trailing slash). */
export const routes = {
  home: { es: "", en: "", fr: "", de: "", it: "" },
  discover: { es: "/descubre", en: "/discover", fr: "/decouvrir", de: "/entdecken", it: "/scopri" },
  live: { es: "/vivir", en: "/live", fr: "/vivre", de: "/leben", it: "/vivere" },
  invest: { es: "/invertir", en: "/invest", fr: "/investir", de: "/investieren", it: "/investire" },
  explore: { es: "/explora", en: "/explore", fr: "/explorer", de: "/erkunden", it: "/esplora" },
  articles: {
    es: "/explora/articulos",
    en: "/explore/articles",
    fr: "/explorer/articles",
    de: "/erkunden/artikel",
    it: "/esplora/articoli",
  },
  professionals: {
    es: "/explora/profesionales",
    en: "/explore/professionals",
    fr: "/explorer/professionnels",
    de: "/erkunden/fachleute",
    it: "/esplora/professionisti",
  },
  opportunities: {
    es: "/explora/oportunidades",
    en: "/explore/opportunities",
    fr: "/explorer/opportunites",
    de: "/erkunden/chancen",
    it: "/esplora/opportunita",
  },
  videos: {
    es: "/explora/videos",
    en: "/explore/videos",
    fr: "/explorer/videos",
    de: "/erkunden/videos",
    it: "/esplora/video",
  },
  about: { es: "/nosotros", en: "/about", fr: "/a-propos", de: "/ueber-uns", it: "/chi-siamo" },
  contact: { es: "/contacto", en: "/contact", fr: "/contact", de: "/kontakt", it: "/contatti" },
  privacy: { es: "/privacidad", en: "/privacy", fr: "/confidentialite", de: "/datenschutz", it: "/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;
export const routeKeys = Object.keys(routes) as RouteKey[];

export function href(key: RouteKey, locale: Locale, query?: Record<string, string>): string {
  const base = `/${locale}${routes[key][locale]}`;
  if (!query) return base;
  const qs = new URLSearchParams(query).toString();
  return qs ? `${base}?${qs}` : base;
}

export type DetailKind = "articles" | "professionals" | "opportunities";
export const detailKinds: DetailKind[] = ["articles", "professionals", "opportunities"];

export function detailPath(kind: DetailKind, locale: Locale, slug: string): string {
  return `${href(kind, locale)}/${slug}`;
}

/** Resolves the segments after "/{locale}" to a static route or a detail page. */
export type ResolvedRoute = { type: "static"; key: RouteKey } | { type: "detail"; kind: DetailKind; slug: string };

export function resolvePath(locale: Locale, segments: string[]): ResolvedRoute | null {
  const path = segments.length ? `/${segments.join("/")}` : "";
  for (const key of routeKeys) {
    if (routes[key][locale] === path) return { type: "static", key };
  }
  for (const kind of detailKinds) {
    const base = routes[kind][locale];
    if (path.startsWith(`${base}/`)) {
      const slug = path.slice(base.length + 1);
      if (slug && !slug.includes("/")) return { type: "detail", kind, slug };
    }
  }
  return null;
}

/** Path of a static route in every locale (for hreflang / language selector). */
export function routeAlternates(key: RouteKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, href(key, l)])) as Record<Locale, string>;
}

export function formatDate(iso: string, locale: Locale): string {
  // Calendar dates (YYYY-MM-DD) — formatted in UTC to avoid off-by-one shifts.
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Best supported locale for an Accept-Language header (falls back to Spanish). */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .filter((x) => x.lang)
    .sort((a, b) => b.q - a.q);
  const best = ranked.find((x) => isLocale(x.lang))?.lang;
  return isLocale(best) ? best : defaultLocale;
}

export const LOCALE_COOKIE = "NEXT_LOCALE";
