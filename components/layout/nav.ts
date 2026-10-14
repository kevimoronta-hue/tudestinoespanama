import { href, locales, resolvePath, routeAlternates, type Locale, type RouteKey } from "@/lib/i18n";

export interface NavItem {
  key: RouteKey;
  label: string;
  href: string;
}

export const NAV_KEYS = ["home", "discover", "live", "invest", "explore", "about", "contact"] as const;

/** Is `pathname` the nav item's page or one of its children? */
export function isActive(pathname: string, item: NavItem, locale: Locale): boolean {
  if (item.key === "home") return pathname === `/${locale}`;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export type DetailAlternates = Record<string, Partial<Record<Locale, string>>>;

/**
 * Path of the current page in every locale. Static routes come from the route table,
 * detail pages from the precomputed translation map; when a page has no translation,
 * the target locale's home page is used.
 */
export function languageTargets(pathname: string, locale: Locale, details: DetailAlternates): Record<Locale, string> {
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const route = resolvePath(locale, segments);
  const known = route?.type === "static" ? routeAlternates(route.key) : (details[pathname] ?? {});
  return Object.fromEntries(locales.map((l) => [l, known[l] ?? href("home", l)])) as Record<Locale, string>;
}
