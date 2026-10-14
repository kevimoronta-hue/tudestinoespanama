import Link from "next/link";
import { getToday } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { href, localeMeta, locales, routeAlternates, type Locale } from "@/lib/i18n";
import { showDemoContent } from "@/lib/site";
import { Flag } from "../ui/Flag";
import { Icon } from "../ui/Icon";
import { Logo } from "./Logo";

export async function Footer({ locale, dict, lightLogoSrc }: { locale: Locale; dict: Dictionary; lightLogoSrc: string | null }) {
  const year = (await getToday()).slice(0, 4);
  const homes = routeAlternates("home");

  const col = (title: string, links: { label: string; href: string }[]) => (
    <div>
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/50">{title}</h2>
      <ul className="mt-4 space-y-0.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="inline-flex min-h-11 items-center text-[0.95rem] text-white/80 transition-colors duration-150 hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer
      className="relative isolate overflow-hidden bg-ocean-deep text-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Night-water depth: a soft lighter swell at the top, darker towards the bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_15%_0%,rgb(14_106_128/0.28)_0%,transparent_60%),linear-gradient(180deg,var(--ocean-deep)_0%,var(--ocean-950)_100%)]"
      />

      <div className="container-site grid gap-12 pb-12 pt-16 sm:pt-20 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div className="max-w-sm space-y-6">
          <Link href={homes[locale]} aria-label={dict.nav.logoHome} className="inline-flex">
            <Logo height={48} alt={dict.meta.siteName} variant="light" lightSrc={lightLogoSrc} />
          </Link>
          <p className="text-[0.97rem] leading-relaxed text-white/75">{dict.footer.tagline}</p>
          <p className="flex gap-2.5 text-sm leading-relaxed text-white/60">
            <Icon name="heart" size={18} className="mt-0.5 shrink-0 text-[#f3b5bd]" />
            {dict.footer.commitment}
          </p>
        </div>
        {col(dict.footer.explore, [
          { label: dict.nav.discover, href: href("discover", locale) },
          { label: dict.nav.live, href: href("live", locale) },
          { label: dict.nav.invest, href: href("invest", locale) },
          { label: dict.nav.explore, href: href("explore", locale) },
        ])}
        {col(dict.footer.project, [
          { label: dict.nav.about, href: href("about", locale) },
          { label: dict.nav.contact, href: href("contact", locale) },
          { label: dict.nav.cta, href: href("contact", locale) },
        ])}
        {col(dict.footer.legal, [
          { label: dict.footer.privacy, href: href("privacy", locale) },
          { label: dict.footer.credits, href: `${href("about", locale)}#creditos` },
        ])}
      </div>

      <div className="container-site">
        <nav aria-label={dict.nav.languageList} className="border-t border-white/10 py-5">
          <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={homes[l]}
                  hrefLang={localeMeta[l].htmlLang}
                  lang={localeMeta[l].htmlLang}
                  aria-current={l === locale ? "true" : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm transition-colors duration-150 ${
                    l === locale ? "bg-white/10 text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  <Flag code={localeMeta[l].flag} size={18} />
                  {localeMeta[l].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-2.5 border-t border-white/10 py-6 text-xs leading-relaxed text-white/50">
          <p>{dict.footer.disclaimer}</p>
          {showDemoContent ? <p className="text-[#f5d98a]">{dict.footer.demoNotice}</p> : null}
          <p className="text-white/60">
            © {year} {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
