import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { NAV_KEYS } from "@/components/layout/nav";
import { getDetailAlternates } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { lightLogoSrc } from "@/lib/brand";
import { href, isLocale, localeMeta, locales } from "@/lib/i18n";
import { metadataBase } from "@/lib/seo";
import { hasSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["600", "700", "800"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase,
    title: { default: dict.meta.siteName, template: `%s · ${dict.meta.siteName}` },
    description: dict.meta.description,
    applicationName: dict.meta.siteName,
    // No confirmed production domain yet → keep the site out of search indexes.
    robots: hasSiteUrl ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#062230",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const items = NAV_KEYS.map((key) => ({
    key,
    label: dict.nav[key],
    href: href(key, locale),
  }));

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-ocean-deep px-5 py-3 font-semibold text-white transition-transform focus:translate-y-0"
        >
          {dict.nav.skip}
        </a>
        <Header
          locale={locale}
          items={items}
          cta={{ label: dict.nav.cta, href: href("contact", locale) }}
          labels={{
            open: dict.nav.openMenu,
            close: dict.nav.closeMenu,
            title: dict.nav.menuTitle,
            language: dict.nav.language,
            logo: dict.nav.logoHome,
            languageButton: dict.nav.languageButton,
            languageList: dict.nav.languageList,
          }}
          detailAlternates={getDetailAlternates()}
          lightLogoSrc={lightLogoSrc()}
        />
        <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <RevealObserver />
      </body>
    </html>
  );
}
