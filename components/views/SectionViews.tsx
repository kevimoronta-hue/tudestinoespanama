import Image from "next/image";
import Link from "next/link";
import mediaSources from "@/data/media-sources.json";
import {
  articleToItem,
  getArticles,
  getListingItems,
  getToday,
  getOpportunities,
  getProfessionals,
  opportunityToItem,
  professionalToItem,
} from "@/lib/content";
import { licenseLabel } from "@/lib/credits";
import { getDictionary } from "@/lib/dictionaries";
import { href, type Locale, type RouteKey } from "@/lib/i18n";
import { routeMetadata } from "@/lib/seo";
import type { ArticleCategory } from "@/types/content";
import type { ListingKind } from "@/types/listing";
import { ListingCard } from "../explore/Cards";
import { Listing } from "../explore/Listing";
import { ContactForm } from "../forms/ContactForm";
import { FinalCTA } from "../home/FinalCTA";
import { SocialCommitment } from "../home/HomeSections";
import { PageHeader } from "../layout/PageHeader";
import { ButtonLink } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Callout, EmptyState } from "../ui/States";

function crumbs(locale: Locale, current: { name: string; key: RouteKey }, parent?: { name: string; key: RouteKey }) {
  const dict = getDictionary(locale);
  return {
    label: dict.breadcrumb.label,
    items: [
      { name: dict.breadcrumb.home, href: href("home", locale) },
      ...(parent ? [{ name: parent.name, href: href(parent.key, locale) }] : []),
      { name: current.name, path: href(current.key, locale) },
    ],
  };
}

/* ======================= Descubre ======================= */

export function discoverMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.discover;
  return routeMetadata("discover", locale, d.eyebrow, d.intro, {
    src: "/images/casco-antiguo-fachada.webp",
    alt: d.imageAlt,
    width: 1600,
    height: 1000,
  });
}

export function DiscoverView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.pages.discover;
  const items = getArticles(locale, "descubre").map(articleToItem);
  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={d.title}
        intro={d.intro}
        breadcrumb={crumbs(locale, { name: dict.nav.discover, key: "discover" })}
        image={{ src: "/images/casco-antiguo-fachada.webp", alt: d.imageAlt }}
      />
      <section aria-labelledby="discover-list" className="py-16 sm:py-20">
        <div className="container-site space-y-8">
          <h2 id="discover-list" className="text-h3">
            {d.listTitle}
          </h2>
          <Listing locale={locale} items={items} kinds={["articles"]} resultsTitle={d.listTitle} />
        </div>
      </section>
      <section className="pb-20 sm:pb-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-line bg-blue-50 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h2 className="text-h3">{d.ctaTitle}</h2>
              <p className="measure text-muted">{d.ctaText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href("live", locale)} icon="arrowRight">
                {d.ctaLive}
              </ButtonLink>
              <ButtonLink href={href("contact", locale)} variant="secondary">
                {d.ctaContact}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ======================= Vivir ======================= */

const LIVE_TOPICS: { key: ArticleCategory; icon: IconName }[] = [
  { key: "primeros-pasos", icon: "compass" },
  { key: "vivienda", icon: "home" },
  { key: "costo-de-vida", icon: "layers" },
  { key: "educacion", icon: "book" },
  { key: "salud", icon: "heart" },
  { key: "transporte", icon: "map" },
  { key: "servicios", icon: "sparkle" },
  { key: "tramites", icon: "shield" },
];

const REFERENCE_INSTITUTIONS = [
  { name: "Servicio Nacional de Migración", url: "https://www.migracion.gob.pa" },
  { name: "Ministerio de Salud (MINSA)", url: "https://www.minsa.gob.pa" },
  { name: "Autoridad de Tránsito y Transporte Terrestre (ATTT)", url: "https://www.transito.gob.pa" },
  { name: "Instituto Nacional de Estadística y Censo (INEC)", url: "https://www.inec.gob.pa" },
];

export function liveMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.live;
  return routeMetadata("live", locale, d.eyebrow, d.intro, {
    src: "/images/panama-city-bahia-aerea.webp",
    alt: d.imageAlt,
    width: 1600,
    height: 1000,
  });
}

export function LiveView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.pages.live;
  const articles = getArticles(locale, "vivir");
  const items = articles.map(articleToItem);
  const count = (cat: ArticleCategory) => articles.filter((a) => a.category === cat).length;

  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={d.title}
        intro={d.intro}
        breadcrumb={crumbs(locale, { name: dict.nav.live, key: "live" })}
        image={{ src: "/images/panama-city-bahia-aerea.webp", alt: d.imageAlt }}
      >
        <Callout tone="warning" title={d.disclaimerTitle}>
          {d.disclaimer}
        </Callout>
      </PageHeader>

      <section aria-labelledby="live-topics" className="py-16 sm:py-20">
        <div className="container-site space-y-10">
          <SectionHeading id="live-topics" title={d.categoriesTitle} intro={d.categoriesIntro} size="h3" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_TOPICS.map((topic) => {
              const n = count(topic.key);
              const label = dict.categories.articles[topic.key];
              const body = (
                <>
                  <span className="flex items-center justify-between">
                    <Icon name={topic.icon} size={24} className="text-blue-700" />
                    <span className={`text-xs font-bold ${n ? "text-blue-800" : "text-muted"}`}>
                      {n ? `${n} ${d.guidesAvailable}` : d.noGuides}
                    </span>
                  </span>
                  <span className="font-display text-lg font-bold text-ink">{label}</span>
                  <span className="text-sm text-muted">{dict.liveTopics[topic.key as keyof typeof dict.liveTopics]}</span>
                </>
              );
              return (
                <li key={topic.key}>
                  {n ? (
                    <Link
                      href={`${href("live", locale, { cat: topic.key })}#guias`}
                      className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-6 transition-[border-color,box-shadow] hover:border-blue-800/40 hover:shadow-[0_16px_36px_-24px_rgb(6_34_48/0.4)]"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col gap-3 rounded-3xl border border-dashed border-line-strong bg-off-white p-6">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="guias" aria-labelledby="live-guides" className="bg-blue-50 py-16 sm:py-20">
        <div className="container-site space-y-8">
          <h2 id="live-guides" className="text-h3">
            {d.listTitle}
          </h2>
          <Listing locale={locale} items={items} kinds={["articles"]} resultsTitle={d.listTitle} />
        </div>
      </section>

      <section aria-labelledby="live-sources" className="py-16 sm:py-20">
        <div className="container-site space-y-8">
          <SectionHeading id="live-sources" title={d.sourcesTitle} intro={d.sourcesIntro} size="h3" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {REFERENCE_INSTITUTIONS.map((inst) => (
              <li key={inst.url}>
                <a
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 font-semibold text-blue-800 hover:border-blue-800/40"
                >
                  <span>{inst.name}</span>
                  <Icon name="external" size={18} className="shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA locale={locale} dict={dict} id="orientacion" title={d.ctaTitle} intro={d.ctaText} eyebrow={d.eyebrow} />
    </>
  );
}

/* ======================= Invertir ======================= */

const SECTORS: { key: keyof ReturnType<typeof getDictionary>["pages"]["invest"]["sectors"]; icon: IconName }[] = [
  { key: "logistics", icon: "anchor" },
  { key: "trade", icon: "layers" },
  { key: "services", icon: "briefcase" },
  { key: "tourism", icon: "compass" },
  { key: "agro", icon: "leaf" },
  { key: "tech", icon: "sparkle" },
];

export function investMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.invest;
  return routeMetadata("invest", locale, d.eyebrow, d.intro, {
    src: "/images/canal-esclusas-miraflores.webp",
    alt: d.imageAlt,
    width: 1600,
    height: 1000,
  });
}

export async function InvestView({ locale }: { locale: Locale }) {
  const today = await getToday();
  const dict = getDictionary(locale);
  const d = dict.pages.invest;
  const guides = getArticles(locale, "invertir").map(articleToItem);
  const opportunities = getOpportunities(locale).map((o) => opportunityToItem(o, today)).slice(0, 3);
  const professionals = getProfessionals(locale)
    .filter((p) => ["legal", "contabilidad", "inmobiliaria"].includes(p.category))
    .map(professionalToItem)
    .slice(0, 3);

  const block = (id: string, title: string, items: typeof guides, all: RouteKey) => (
    <section aria-labelledby={id} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id={id} className="text-h3">
          {title}
        </h2>
        <ButtonLink href={href(all, locale)} variant="ghost" icon="arrowRight">
          {d.viewAll}
        </ButtonLink>
      </div>
      {items.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.id}>
              <ListingCard item={it} locale={locale} labels={dict.card} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={dict.listing.emptyNoContentTitle} text={dict.listing.emptyNoContentText} />
      )}
    </section>
  );

  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={d.title}
        intro={d.intro}
        breadcrumb={crumbs(locale, { name: dict.nav.invest, key: "invest" })}
        image={{ src: "/images/canal-esclusas-miraflores.webp", alt: d.imageAlt }}
      >
        <Callout tone="warning">{d.disclaimer}</Callout>
      </PageHeader>

      <section aria-labelledby="invest-overview" className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 id="invest-overview" className="text-h3">
            {d.overviewTitle}
          </h2>
          <div className="measure space-y-4 text-lg leading-relaxed text-ink/90">
            {d.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="sectores" aria-labelledby="invest-sectors" className="bg-off-white py-16 sm:py-20">
        <div className="container-site space-y-10">
          <SectionHeading id="invest-sectors" title={d.sectorsTitle} intro={d.sectorsIntro} size="h3" />
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s) => (
              <li key={s.key} className="flex items-center gap-4 bg-white p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-800">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-display text-lg font-bold">{d.sectors[s.key]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-site space-y-16 py-16 sm:py-20">
        {block("invest-guides", d.guidesTitle, guides, "articles")}
        {block("invest-opps", d.opportunitiesTitle, opportunities, "opportunities")}
        {block("invest-pros", d.professionalsTitle, professionals, "professionals")}
      </div>

      <section id="interes" aria-labelledby="invest-form" className="bg-blue-50 py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="space-y-6">
            <SectionHeading id="invest-form" eyebrow={d.eyebrow} title={d.formTitle} intro={d.formIntro} />
            <Callout tone="warning">{d.disclaimer}</Callout>
          </div>
          <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
            <ContactForm locale={locale} kind="invest" labels={dict.form} privacyHref={href("privacy", locale)} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ======================= Explora ======================= */

const KIND_ROUTE: Record<ListingKind, RouteKey> = {
  articles: "articles",
  professionals: "professionals",
  opportunities: "opportunities",
  videos: "videos",
};

export function exploreMetadata(locale: Locale, kind?: ListingKind) {
  const dict = getDictionary(locale);
  if (!kind) return routeMetadata("explore", locale, dict.nav.explore, dict.pages.explore.intro);
  const p = dict.pages[kind];
  return routeMetadata(KIND_ROUTE[kind], locale, p.title, p.intro);
}

const ALL_KINDS: ListingKind[] = ["articles", "professionals", "opportunities", "videos"];

export async function ExploreView({ locale, kind }: { locale: Locale; kind?: ListingKind }) {
  const dict = getDictionary(locale);
  const kinds = kind ? [kind] : ALL_KINDS;
  const items = await getListingItems(locale, kinds);
  const p = kind ? dict.pages[kind] : null;
  const exploreCrumb = { name: dict.nav.explore, key: "explore" as RouteKey };

  return (
    <>
      <PageHeader
        eyebrow={kind ? dict.nav.explore : dict.pages.explore.eyebrow}
        title={p ? p.title : dict.pages.explore.title}
        intro={p ? p.intro : dict.pages.explore.intro}
        breadcrumb={
          kind
            ? crumbs(locale, { name: p!.title, key: KIND_ROUTE[kind] }, exploreCrumb)
            : crumbs(locale, exploreCrumb)
        }
      >
        <nav aria-label={dict.nav.explore} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
          <Link
            href={href("explore", locale)}
            aria-current={!kind ? "page" : undefined}
            className={`tap inline-flex shrink-0 items-center rounded-full border px-4 text-sm font-bold ${
              !kind ? "border-blue-800 bg-blue-800 text-white" : "border-line-strong bg-white text-blue-900 hover:bg-blue-100"
            }`}
          >
            {dict.listing.allTypes}
          </Link>
          {ALL_KINDS.map((k) => (
            <Link
              key={k}
              href={href(KIND_ROUTE[k], locale)}
              aria-current={kind === k ? "page" : undefined}
              className={`tap inline-flex shrink-0 items-center rounded-full border px-4 text-sm font-bold ${
                kind === k ? "border-blue-800 bg-blue-800 text-white" : "border-line-strong bg-white text-blue-900 hover:bg-blue-100"
              }`}
            >
              {dict.categories.kinds[k]}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <section aria-label={p ? p.title : dict.pages.explore.title} className="py-12 sm:py-16">
        <div className="container-site">
          <Listing locale={locale} items={items} kinds={kinds} resultsTitle={p ? p.title : dict.pages.explore.title} />
        </div>
      </section>
    </>
  );
}

/* ======================= Nosotros ======================= */

export function aboutMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.about;
  return routeMetadata("about", locale, d.eyebrow, d.mission);
}

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.pages.about;
  const values: { key: keyof typeof d.values; icon: IconName }[] = [
    { key: "integrity", icon: "shield" },
    { key: "service", icon: "users" },
    { key: "quality", icon: "checkCircle" },
    { key: "innovation", icon: "sparkle" },
  ];
  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} breadcrumb={crumbs(locale, { name: dict.nav.about, key: "about" })} />

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {[
            { title: d.missionTitle, text: d.mission, icon: "compass" as IconName },
            { title: d.visionTitle, text: d.vision, icon: "globe" as IconName },
          ].map((b) => (
            <article key={b.title} className="rounded-[2rem] border border-line bg-white p-8 sm:p-10">
              <Icon name={b.icon} size={30} className="text-blue-700" />
              <h2 className="mt-5 text-h3">{b.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/85">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-off-white py-16 sm:py-20">
        <div className="container-site space-y-10">
          <SectionHeading id="values-title" title={d.valuesTitle} size="h3" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.key} className="rounded-3xl border border-line bg-white p-6">
                <Icon name={v.icon} size={26} className="text-red-700" />
                <h3 className="mt-4 font-display text-lg font-bold">{d.values[v.key].title}</h3>
                <p className="mt-2 text-sm text-muted">{d.values[v.key].text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="principles-title" className="text-h3">
            {d.principlesTitle}
          </h2>
          <ul className="space-y-4">
            {d.principles.map((p) => (
              <li key={p} className="flex gap-3 text-lg text-ink/90">
                <Icon name="check" size={22} className="mt-1 shrink-0 text-success" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SocialCommitment locale={locale} dict={dict} withLink={false} />

      <section id="creditos" aria-labelledby="credits-title" className="pb-20 sm:pb-28">
        <div className="container-site space-y-6">
          <SectionHeading id="credits-title" title={d.creditsTitle} intro={d.creditsIntro} size="h3" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mediaSources.items.map((m) => (
              <li key={m.key} className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative aspect-[16/10] bg-blue-100">
                  <Image src={`/${m.webDerivative.replace(/^public\//, "")}`} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                </div>
                <div className="space-y-1 p-5 text-sm">
                  <p className="font-semibold text-ink">{m.location}</p>
                  <p className="text-muted">
                    {m.author} ·{" "}
                    {m.licenseUrl ? (
                      <a href={m.licenseUrl} target="_blank" rel="noopener noreferrer license" className="text-blue-800 underline underline-offset-4">
                        {licenseLabel(m.license, dict)}
                      </a>
                    ) : (
                      licenseLabel(m.license, dict)
                    )}
                  </p>
                  <a href={m.sourcePage} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-blue-800 underline underline-offset-4">
                    Wikimedia Commons <Icon name="external" size={14} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ======================= Contacto ======================= */

export function contactMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.contact;
  return routeMetadata("contact", locale, d.eyebrow, d.intro);
}

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.pages.contact;
  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} intro={d.intro} breadcrumb={crumbs(locale, { name: dict.nav.contact, key: "contact" })} />
      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgb(6_34_48/0.4)] sm:p-10">
            <ContactForm locale={locale} labels={dict.form} privacyHref={href("privacy", locale)} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-h3">{d.nextTitle}</h2>
            <ol className="space-y-4">
              {d.next.map((step, i) => (
                <li key={step} className="flex gap-3 text-ink/90">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 font-display font-bold text-blue-800">{i + 1}</span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="flex gap-2 rounded-2xl bg-off-white p-4 text-sm text-muted">
              <Icon name="shield" size={18} className="mt-0.5 shrink-0" />
              {d.privacyNote}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ======================= Privacidad ======================= */

export function privacyMetadata(locale: Locale) {
  const d = getDictionary(locale).pages.privacy;
  return routeMetadata("privacy", locale, d.title, d.sections[0].text);
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.pages.privacy;
  return (
    <>
      <PageHeader title={d.title} breadcrumb={crumbs(locale, { name: d.title, key: "privacy" })}>
        <Callout tone="warning">{d.draftNotice}</Callout>
      </PageHeader>
      <section className="py-16 sm:py-20">
        <div className="container-site measure space-y-10">
          {d.sections.map((s) => (
            <div key={s.title} className="space-y-3">
              <h2 className="text-h3">{s.title}</h2>
              <p className="text-lg leading-relaxed text-ink/85">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
