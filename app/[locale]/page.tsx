import { notFound } from "next/navigation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroVideo } from "@/components/home/HeroVideo";
import {
  ExploreSection,
  GuidesSection,
  IntroSection,
  JourneysSection,
  SocialCommitment,
  WhyPanamaSection,
} from "@/components/home/HomeSections";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, routeAlternates } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    ...buildMetadata({
      locale,
      title: dict.meta.siteName,
      description: dict.meta.description,
      path: routeAlternates("home")[locale],
      alternates: routeAlternates("home"),
    }),
    title: { absolute: `${dict.meta.siteName} — ${dict.meta.tagline}` },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <>
      <HeroVideo locale={locale} dict={dict} />
      <IntroSection dict={dict} />
      <JourneysSection locale={locale} dict={dict} />
      <WhyPanamaSection locale={locale} dict={dict} />
      <GuidesSection locale={locale} dict={dict} />
      <ExploreSection locale={locale} dict={dict} />
      <SocialCommitment locale={locale} dict={dict} />
      <FinalCTA locale={locale} dict={dict} />
    </>
  );
}
