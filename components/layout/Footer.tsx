import Image from "next/image";
import Link from "next/link";
import { getToday } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { href, routeAlternates, type Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/contact-links";
import { showDemoContent } from "@/lib/site";
import { Flag } from "../ui/Flag";
import { Icon } from "../ui/Icon";

/** White-on-blue logo (scripts/build-logo-white.py): the brand blue of the master turned white. */
const LOGO_RATIO = 1564 / 468;

const link =
  "inline-flex min-h-11 items-center text-[0.95rem] text-white/75 transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white";

/**
 * Global footer, one for every page and language: logo, a short navigation, then a quiet
 * legal line. Background = brand ocean navy (--brand-ocean-navy #0A2B5C: the logo navy pulled
 * toward the site ink) deepening to #061C3D, with one very faint ocean light pool.
 * The language switch lives only in the navbar.
 */
export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = (await getToday()).slice(0, 4);
  const nav = [
    { label: dict.nav.discover, href: href("discover", locale) },
    { label: dict.nav.live, href: href("live", locale) },
    { label: dict.nav.invest, href: href("invest", locale) },
    { label: dict.nav.about, href: href("about", locale) },
    { label: dict.nav.contact, href: href("contact", locale) },
  ];
  // Same height as the header logo (Header.tsx: 36px below xl, 44px from xl). Both files are
  // 1564×468 renders of the same master, so equal height = equal visual size.
  const logoH = 44;

  return (
    <footer
      className="relative isolate bg-[radial-gradient(110%_70%_at_12%_0%,rgb(14_106_128/0.2)_0%,transparent_60%),linear-gradient(180deg,var(--brand-ocean-navy)_0%,var(--brand-ocean-navy-deep)_100%)] text-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-site">
        <div className="flex flex-col gap-9 pb-8 pt-14 sm:pb-12 sm:pt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-20">
          <Link href={routeAlternates("home")[locale]} aria-label={dict.nav.logoHome} className="inline-flex self-start">
            <Image
              src="/brand/logo-white-480.webp"
              alt={dict.meta.siteName}
              width={Math.round(logoH * LOGO_RATIO)}
              height={logoH}
              sizes={`${Math.round(logoH * LOGO_RATIO)}px`}
              className="block h-9 w-auto xl:h-11"
              unoptimized
            />
          </Link>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <nav aria-label={dict.footer.explore}>
              <ul className="grid grid-cols-2 gap-x-8 sm:flex sm:flex-wrap sm:gap-x-9 sm:gap-y-1">
                {nav.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul aria-label={dict.footer.social} className="-ml-2.5 flex items-center gap-1 lg:ml-0 lg:border-l lg:border-white/15 lg:pl-6">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} ${dict.a11y.newTab}`}
                    className="tap inline-flex items-center justify-center rounded-full text-white/75 transition-[color,background-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/10 hover:text-white active:scale-[0.97]"
                  >
                    <Icon name={s.key} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-7 text-[0.85rem] text-white/70 sm:flex-row sm:items-center sm:justify-between lg:pt-9 max-[1399px]:pb-24 min-[1400px]:pb-9">
          <div className="space-y-1.5">
            <p className="flex items-center gap-2.5 text-white/85">
              <Flag code="pa" size={18} />
              <span>
                © {year} {dict.footer.rights}
              </span>
            </p>
            <p>{dict.footer.disclaimer}</p>
            {showDemoContent ? <p className="text-[#f5d98a]">{dict.footer.demoNotice}</p> : null}
          </div>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href={href("privacy", locale)} className={`${link} !text-[0.85rem] !text-white/70 hover:!text-white`}>
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`${href("about", locale)}#creditos`} className={`${link} !text-[0.85rem] !text-white/70 hover:!text-white`}>
                {dict.footer.credits}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
