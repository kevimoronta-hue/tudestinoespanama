import Image from "next/image";
import Link from "next/link";
import { getToday } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { href, routeAlternates, type Locale } from "@/lib/i18n";
import { showDemoContent } from "@/lib/site";
import { Flag } from "../ui/Flag";

/** White-on-blue logo (scripts/build-logo-white.py): the brand blue of the master turned white. */
const LOGO_RATIO = 1564 / 468;

const link =
  "inline-flex min-h-11 items-center text-[0.95rem] text-white/75 transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-white";

/**
 * Global footer, one for every page and language: logo, a short navigation, then a quiet
 * legal line. Background = the logo navy (--logo-navy #002870) deepening to --logo-navy-deep (#001d57).
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
  const logoH = 64;

  return (
    <footer
      className="relative isolate bg-[linear-gradient(180deg,var(--logo-navy)_0%,var(--logo-navy-deep)_100%)] text-white"
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
              className="block h-[52px] w-auto sm:h-[64px]"
              unoptimized
            />
          </Link>
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
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 py-7 text-[0.85rem] text-white/70 sm:flex-row sm:items-center sm:justify-between lg:py-9">
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
