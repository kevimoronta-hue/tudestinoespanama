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
    width: 2560,
    height: 1600,
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
          <div className="surface-ocean card-depth-dark flex flex-col gap-8 rounded-[var(--radius-surface)] p-7 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-14">
            <div className="space-y-3">
              <h2 className="text-h2 max-w-[18ch] !text-white">{d.ctaTitle}</h2>
              <p className="measure text-lg text-white/80">{d.ctaText}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href={href("live", locale)} icon="arrowRight">
                {d.ctaLive}
              </ButtonLink>
              <ButtonLink href={href("contact", locale)} variant="outline-light">
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

const LIVE_TOPICS: { key: ArticleCategory }[] = [
  { key: "primeros-pasos" },
  { key: "vivienda" },
  { key: "costo-de-vida" },
  { key: "educacion" },
  { key: "salud" },
  { key: "transporte" },
  { key: "servicios" },
  { key: "tramites" },
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
    width: 2560,
    height: 1600,
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
          <ul className="card-depth grid overflow-hidden rounded-[var(--radius-surface)] bg-line [gap:1px] sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_TOPICS.map((topic) => {
              const n = count(topic.key);
              const label = dict.categories.articles[topic.key];
              const body = (
                <>
                  <span className="font-display text-[1.12rem] font-bold leading-snug text-ink">{label}</span>
                  <span className="text-[0.95rem] leading-relaxed text-muted">{dict.liveTopics[topic.key as keyof typeof dict.liveTopics]}</span>
                  <span className={`mt-auto flex items-center gap-2 pt-3 text-sm font-semibold ${n ? "text-blue-800" : "text-muted"}`}>
                    {n ? `${n} ${d.guidesAvailable}` : d.noGuides}
                    {n ? (
                      <Icon
                        name="arrowRight"
                        size={16}
                        className="transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
                      />
                    ) : null}
                  </span>
                </>
              );
              return (
                <li key={topic.key} className="flex">
                  {n ? (
                    <Link
                      href={`${href("live", locale, { cat: topic.key })}#guias`}
                      className="group flex w-full flex-col gap-2 bg-white p-6 transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-ocean-mist sm:p-7"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex w-full flex-col gap-2 bg-off-white p-6 sm:p-7">{body}</div>
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
                  className="card-depth flex min-h-14 items-center justify-between gap-4 rounded-[var(--radius-control)] bg-white px-5 py-4 font-semibold text-blue-800 transition-colors duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-ocean-mist"
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
    width: 2560,
    height: 1600,
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
          <div className="measure space-y-4 text-lg leading-relaxed text-ink/75">
            {d.overview.map((p, i) => (
              <p key={p} className={i === 0 ? "font-display text-[1.3rem] font-semibold leading-[1.45] tracking-[-0.01em] text-ink sm:text-[1.45rem]" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="sectores" aria-labelledby="invest-sectors" className="surface-ocean py-16 sm:py-24">
        <div className="container-site space-y-10">
          <SectionHeading id="invest-sectors" title={d.sectorsTitle} intro={d.sectorsIntro} size="h3" tone="light" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {SECTORS.map((s) => (
              <li
                key={s.key}
                data-reveal
                className="card-depth-dark flex min-h-[6.5rem] items-end justify-between gap-4 rounded-[var(--radius-card)] bg-white/[0.04] p-6"
              >
                <span className="font-display text-[1.15rem] font-bold leading-snug text-white">{d.sectors[s.key]}</span>
                <Icon name={s.icon} size={22} className="shrink-0 text-white/45" />
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
          <div className="card-depth rounded-[var(--radius-surface)] bg-white p-6 sm:p-10">
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
  const values = (["integrity", "service", "quality", "innovation"] as const).map((k) => d.values[k]);
  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={d.title}
        intro={dict.meta.description}
        breadcrumb={crumbs(locale, { name: dict.nav.about, key: "about" })}
        image={{ src: "/images/panama-city-bahia-aerea.webp", alt: dict.pages.live.imageAlt }}
      />

      {/*
        Misión + Visión: one deep-ocean composition, not two equal boxes. Misión is the
        light, text-led card; Visión is the photographic card, offset lower and overlapping
        it on desktop so the pair reads as "now → horizon".
      */}
      <section aria-label={`${d.missionTitle} · ${d.visionTitle}`} className="surface-ocean py-16 sm:py-24 lg:py-28">
        <div className="container-site grid gap-0 lg:grid-cols-12">
          <article
            data-reveal
            className="card-depth relative z-0 rounded-[var(--radius-surface)] bg-white p-7 pb-14 sm:p-10 sm:pb-16 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-start lg:p-14 lg:pb-28 lg:pr-24"
          >
            <h2 className="eyebrow">{d.missionTitle}</h2>
            <p className="mt-5 font-display text-[1.45rem] font-semibold leading-[1.3] tracking-[-0.015em] text-ink sm:text-[1.8rem] lg:text-[2.05rem]">
              {d.mission}
            </p>
          </article>

          <article
            data-reveal
            className="card-depth-dark relative z-10 -mt-6 ml-5 overflow-hidden rounded-[var(--radius-surface)] bg-ocean-950 sm:ml-16 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-36 lg:ml-0 lg:self-start"
          >
            <Image
              src="/images/canal-esclusas-miraflores.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover object-[68%_center] opacity-80"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(170deg,rgb(4_22_31/0.1)_0%,rgb(4_22_31/0.55)_45%,rgb(4_22_31/0.94)_85%)]" />
            <div className="relative flex min-h-[340px] flex-col justify-end p-7 sm:min-h-[380px] sm:p-10 lg:min-h-[420px] lg:p-12">
              <h2 className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.14em] !text-white/80">{d.visionTitle}</h2>
              <p className="mt-4 max-w-[34ch] font-display text-[1.3rem] font-semibold leading-[1.35] tracking-[-0.01em] text-white sm:text-[1.55rem]">
                {d.vision}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Values: editorial rows on sand, sticky heading on desktop. No icon tiles. */}
      <section aria-labelledby="values-title" className="bg-sand py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="values-title" className="text-h2 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              {d.valuesTitle}
            </h2>
          </div>
          <ul className="lg:col-span-8">
            {values.map((v) => (
              <li
                key={v.title}
                data-reveal
                className="grid gap-2 border-t border-ink/12 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10 sm:py-8"
              >
                <h3 className="font-display text-[1.2rem] font-bold leading-snug sm:text-[1.35rem]">{v.title}</h3>
                <p className="text-[1.02rem] leading-relaxed text-ink/75">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work: a raised card that straddles the sand → white seam. */}
      <section aria-labelledby="principles-title" className="relative pb-16 sm:pb-24">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-sand sm:h-32" />
        <div className="container-site relative">
          <div className="card-depth grid gap-8 rounded-[var(--radius-surface)] bg-white p-7 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <h2 id="principles-title" className="text-h3 lg:col-span-4 lg:text-[1.75rem]">
              {d.principlesTitle}
            </h2>
            <ul className="space-y-5 lg:col-span-8">
              {d.principles.map((p) => (
                <li key={p} className="relative pl-6 text-[1.05rem] leading-relaxed text-ink/90 sm:text-lg">
                  <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-red-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SocialCommitment locale={locale} dict={dict} withLink={false} />

      {/* Credits: one quiet text block, no thumbnails, no per-image source links in the layout. */}
      <section id="creditos" aria-labelledby="credits-title" className="pb-20 sm:pb-28">
        <div className="container-site">
          <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-3 lg:col-span-4">
              <h2 id="credits-title" className="text-h3">
                {d.creditsTitle}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{d.creditsIntro}</p>
            </div>
            <div className="text-sm lg:col-span-8">
              {[
                { title: d.creditsPhotos, list: mediaSources.webPhotos.map((m) => ({ key: m.key, place: m.location, author: m.author, license: m.license, href: m.sourcePage })) },
              ].map((group) => (
                <div key={group.title}>
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.12em] text-ocean">{group.title}</h3>
                  <ul className="mt-3 grid gap-x-10 sm:grid-cols-2">
                    {group.list.map((c) => (
                      <li key={c.key} className="border-b border-line py-3">
                        <p className="font-medium text-ink">{c.place}</p>
                        <p className="text-muted">
                          <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-blue-800">
                            {c.author}
                          </a>{" "}
                          · {c.license}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
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
          <div className="card-depth rounded-[var(--radius-surface)] bg-white p-6 sm:p-10">
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
