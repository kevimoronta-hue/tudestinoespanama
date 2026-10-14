"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { buttonClasses } from "../ui/Button";
import { DesktopNavigation } from "./DesktopNavigation";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";
import type { DetailAlternates, NavItem } from "./nav";

interface Props {
  locale: Locale;
  items: NavItem[];
  cta: { label: string; href: string };
  labels: {
    open: string;
    close: string;
    title: string;
    logo: string;
    languageButton: string;
    languageList: string;
    language: string;
  };
  detailAlternates: DetailAlternates;
  lightLogoSrc: string | null;
}

/**
 * At scrollY = 0 the header has NO background on every page: over the home hero it
 * uses the light treatment (white links, light logo); on inner pages it sits on the
 * page header's own surface with dark links. Once scrolled it becomes an opaque-ish
 * white bar (small blur, hairline, soft shadow). Only one passive scroll listener,
 * and state changes only when crossing the threshold.
 */
export function Header({ locale, items, cta, labels, detailAlternates, lightLogoSrc }: Props) {
  const pathname = usePathname() ?? "";
  const overHero = pathname === `/${locale}`;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 16;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = overHero && !scrolled ? "light" : "dark";
  const selector = (
    <LanguageSelector
      locale={locale}
      labels={{ button: labels.languageButton, list: labels.languageList }}
      detailAlternates={detailAlternates}
      tone={tone}
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled
          ? "border-line/80 bg-white/95 shadow-[0_8px_24px_-18px_rgb(6_34_48/0.35)] backdrop-blur-[6px]"
          : "border-transparent bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-site flex items-center justify-between gap-4" style={{ height: "var(--header-h)" }}>
        <Link href={`/${locale}`} aria-label={labels.logo} className="tap inline-flex shrink-0 items-center">
          <span className="xl:hidden">
            <Logo height={36} alt="" priority variant={tone === "light" ? "light" : "color"} lightSrc={lightLogoSrc} />
          </span>
          <span className="hidden xl:block">
            <Logo height={44} alt="" priority variant={tone === "light" ? "light" : "color"} lightSrc={lightLogoSrc} />
          </span>
        </Link>

        <DesktopNavigation locale={locale} items={items} tone={tone} label={labels.title} />

        <div className="hidden items-center gap-2 xl:flex">
          {selector}
          <Link href={cta.href} className={buttonClasses("primary", "!px-5 !py-2.5 whitespace-nowrap")}>
            {cta.label}
          </Link>
        </div>

        {/* Mobile/tablet: language selector always visible next to the menu button. */}
        <div className="flex items-center gap-1 xl:hidden">
          {selector}
          <MobileNavigation
            locale={locale}
            items={items}
            cta={cta}
            labels={labels}
            detailAlternates={detailAlternates}
            tone={tone}
          />
        </div>
      </div>
    </header>
  );
}
