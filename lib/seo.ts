import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localeMeta, locales, routeAlternates, type Locale, type RouteKey } from "@/lib/i18n";
import { absoluteUrl, hasSiteUrl, SITE_URL } from "@/lib/site";

interface MetaInput {
  locale: Locale;
  title: string;
  description: string;
  /** Path of this page, e.g. "/es/descubre". */
  path: string;
  /** Path of the same page in every locale where it exists (hreflang). */
  alternates?: Partial<Record<Locale, string>>;
  image?: { src: string; alt: string; width: number; height: number };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

const DEFAULT_OG = {
  src: "/video/hero-panama-desktop-poster.webp",
  width: 1920,
  height: 1080,
};

export function buildMetadata(input: MetaInput): Metadata {
  const dict = getDictionary(input.locale);
  const image = input.image ?? { ...DEFAULT_OG, alt: dict.hero.posterAlt };
  const langs = { ...(input.alternates ?? {}), [input.locale]: input.path } as Partial<Record<Locale, string>>;

  // Canonical + hreflang need absolute URLs: only emitted once the real domain is configured.
  const alternates: Metadata["alternates"] = hasSiteUrl
    ? {
        canonical: input.path,
        languages: {
          ...Object.fromEntries(locales.filter((l) => langs[l]).map((l) => [localeMeta[l].htmlLang, langs[l]!])),
          "x-default": langs.es ?? input.path,
        },
      }
    : undefined;

  return {
    title: input.title,
    description: input.description,
    alternates,
    openGraph: {
      type: input.type ?? "website",
      siteName: dict.meta.siteName,
      title: input.title,
      description: input.description,
      locale: localeMeta[input.locale].og,
      alternateLocale: locales.filter((l) => l !== input.locale && langs[l]).map((l) => localeMeta[l].og),
      url: absoluteUrl(input.path),
      // Social images need absolute URLs → only once the real domain is configured.
      images: hasSiteUrl ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined,
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: hasSiteUrl ? [image.src] : undefined,
    },
  };
}

/** Metadata for a static route in both locales. */
export function routeMetadata(
  key: RouteKey,
  locale: Locale,
  title: string,
  description: string,
  image?: MetaInput["image"],
): Metadata {
  return buildMetadata({
    locale,
    title,
    description,
    path: routeAlternates(key)[locale],
    alternates: routeAlternates(key),
    image,
  });
}

export const metadataBase = hasSiteUrl ? new URL(SITE_URL) : undefined;

/* ---------- JSON-LD ---------- */

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  // Google requires absolute URLs in BreadcrumbList — skipped until the domain is known.
  if (!hasSiteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  path: string;
  image?: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: a.locale,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    author: { "@type": "Organization", name: a.author },
    ...(hasSiteUrl
      ? {
          mainEntityOfPage: absoluteUrl(a.path),
          image: a.image ? absoluteUrl(a.image) : undefined,
        }
      : {}),
  };
}
