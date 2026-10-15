import "server-only";
import { FAQ } from "@/content/faq";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale, type RouteKey } from "@/lib/i18n";
import { REFERENCE_INSTITUTIONS } from "@/lib/institutions";
import { SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/lib/contact-links";

/**
 * The only facts the assistant may use, built once per locale from the site's own sources:
 * the FAQ (content/faq.ts — also rendered on the home page), the site copy (dictionaries),
 * the referenced official institutions and the public contact channels. Demo content
 * (articles, professionals, opportunities marked "demo") is deliberately left out.
 * Nothing is scraped at request time.
 */
export const LINKABLE_ROUTES = [
  "discover",
  "live",
  "invest",
  "explore",
  "articles",
  "professionals",
  "opportunities",
  "about",
  "contact",
  "privacy",
] as const satisfies readonly RouteKey[];
export type LinkableRoute = (typeof LINKABLE_ROUTES)[number];

const cache = new Map<Locale, string>();

export function knowledge(locale: Locale): string {
  const hit = cache.get(locale);
  if (hit) return hit;
  const d = getDictionary(locale);
  const lines: string[] = [];
  const add = (s: string) => lines.push("- " + s.replace(/\s+/g, " ").trim());

  add(`${d.meta.siteName}: ${d.meta.description}`);
  add(d.home.intro.text);
  for (const j of Object.values(d.home.journeys.items)) add(`${j.title}: ${j.text}`);
  for (const w of Object.values(d.home.why.items)) add(`${w.title}: ${w.text}`);
  d.home.moments.items.forEach((m) => add(`${m.place} (${m.region}): ${m.text}`));
  add(`${d.home.social.text} ${d.home.social.note}`);
  add(`${d.pages.discover.title} ${d.pages.discover.intro}`);
  add(`${d.pages.live.title} ${d.pages.live.intro} ${d.pages.live.disclaimer}`);
  add(`${d.pages.invest.title} ${d.pages.invest.intro} ${d.pages.invest.overview.join(" ")}`);
  add(`${d.pages.invest.sectorsTitle}: ${Object.values(d.pages.invest.sectors).join(", ")}. ${d.pages.invest.sectorsIntro} ${d.pages.invest.disclaimer}`);
  add(`${d.pages.about.missionTitle}: ${d.pages.about.mission}`);
  add(`${d.pages.about.visionTitle}: ${d.pages.about.vision}`);
  add(`${d.pages.about.principlesTitle}: ${d.pages.about.principles.join(" ")}`);
  add(`${d.pages.contact.intro} ${d.pages.contact.next.join(" ")}`);
  add(`${d.pages.live.sourcesTitle}: ${REFERENCE_INSTITUTIONS.map((i) => `${i.name} (${i.url})`).join("; ")}. ${d.pages.live.sourcesIntro}`);
  add(`WhatsApp: +${WHATSAPP_NUMBER.replace(/^507/, "507 ")}. ${SOCIAL_LINKS.map((s) => `${s.label}: ${s.href}`).join("; ")}.`);
  add(`${d.footer.disclaimer}`);

  const faq = FAQ[locale].map((f) => `P: ${f.q}\nR: ${f.a.join(" ")}`).join("\n\n");
  const routes = LINKABLE_ROUTES.map((r) => `${r} = ${href(r, locale)}`).join(", ");

  const text = `CONTENIDO DEL SITIO:\n${lines.join("\n")}\n\nPREGUNTAS FRECUENTES DEL SITIO:\n${faq}\n\nSECCIONES ENLAZABLES (clave = ruta): ${routes}`;
  cache.set(locale, text);
  return text;
}

/** Local mock (no API key, never on Vercel): picks the closest FAQ answer by word overlap. */
export function mockAnswer(locale: Locale, question: string): { answer: string; links: LinkableRoute[] } {
  const words = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 3),
    );
  const q = words(question);
  let best = FAQ[locale][0];
  let score = -1;
  for (const f of FAQ[locale]) {
    const inQ = words(f.q);
    const inA = words(f.a.join(" "));
    const s = [...q].reduce((n, w) => n + (inQ.has(w) ? 3 : inA.has(w) ? 1 : 0), 0);
    if (s > score) [best, score] = [f, s];
  }
  return { answer: best.a.join(" "), links: (best.links ?? []).filter((l): l is LinkableRoute => (LINKABLE_ROUTES as readonly string[]).includes(l)) };
}
