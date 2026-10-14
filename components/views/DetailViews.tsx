import Image from "next/image";
import { notFound } from "next/navigation";
import {
  articleToItem,
  detailAlternates,
  getArticle,
  getOpportunity,
  getProfessional,
  getRelatedArticles,
  getToday,
  isExpired,
} from "@/lib/content";
import { getDictionary, t } from "@/lib/dictionaries";
import { detailPath, formatDate, href, type Locale } from "@/lib/i18n";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import type { ArticleBlock } from "@/types/content";
import { GuideCard } from "../explore/Cards";
import { PageHeader } from "../layout/PageHeader";
import { Badge, DemoBadge } from "../ui/Badge";
import { ButtonLink } from "../ui/Button";
import { JsonLd, LastUpdated, SourceList } from "../ui/Editorial";
import { Icon } from "../ui/Icon";
import { ShareButtons } from "../ui/ShareButtons";
import { Callout } from "../ui/States";
import { TrackOnMount } from "../ui/TrackOnMount";
import { TrackedAnchor } from "../ui/TrackedLink";

/* ======================= Article ======================= */

export function articleMetadata(locale: Locale, slug: string) {
  const a = getArticle(locale, slug);
  if (!a) notFound();
  return buildMetadata({
    locale,
    title: a.seoTitle ?? a.title,
    description: a.seoDescription ?? a.excerpt,
    path: detailPath("articles", locale, a.slug),
    alternates: detailAlternates("articles", a),
    image: a.coverImage,
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "note":
      return <Callout tone="info">{block.text}</Callout>;
  }
}

export function ArticleView({ locale, slug }: { locale: Locale; slug: string }) {
  const a = getArticle(locale, slug);
  if (!a) notFound();
  const dict = getDictionary(locale);
  const d = dict.article;
  const sectionKey = a.section === "descubre" ? "discover" : a.section === "vivir" ? "live" : "invest";
  const path = detailPath("articles", locale, a.slug);
  const related = getRelatedArticles(a).map(articleToItem);

  return (
    <article>
      <TrackOnMount event="article_open" props={{ slug: a.slug, category: a.category, locale }} />
      <JsonLd
        data={articleJsonLd({
          title: a.title,
          description: a.excerpt,
          path,
          image: a.coverImage?.src,
          author: a.author,
          publishedAt: a.publishedAt,
          updatedAt: a.updatedAt,
          locale,
        })}
      />
      <PageHeader
        title={a.title}
        intro={a.excerpt}
        breadcrumb={{
          label: dict.breadcrumb.label,
          items: [
            { name: dict.breadcrumb.home, href: href("home", locale) },
            { name: dict.nav[sectionKey], href: href(sectionKey, locale) },
            { name: a.title, path },
          ],
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{dict.categories.articles[a.category]}</Badge>
          {a.status === "demo" ? <DemoBadge label={dict.card.demo} title={dict.card.demoTitle} /> : null}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <span>{t(d.by, { author: a.author })}</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" size={16} />
            <time dateTime={a.publishedAt}>{t(d.publishedOn, { date: formatDate(a.publishedAt, locale) })}</time>
          </span>
          <LastUpdated date={a.updatedAt} locale={locale} dict={dict} />
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={16} />
            {t(dict.card.readingTime, { n: a.readingTime })}
          </span>
        </div>
      </PageHeader>

      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <div className="min-w-0 space-y-10">
          {a.status === "demo" ? <Callout tone="warning">{d.demoNotice}</Callout> : null}
          {a.coverImage ? (
            <figure className="space-y-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-blue-100">
                <Image
                  src={a.coverImage.src}
                  alt={a.coverImage.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                />
              </div>
              {a.coverImage.credit ? (
                <figcaption className="text-xs text-muted">{t(d.imageCredit, { credit: a.coverImage.credit })}</figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="prose-article measure">
            {a.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {a.sensitive ? (
            <Callout tone="warning" title={d.sensitiveTitle}>
              {d.sensitive}
            </Callout>
          ) : null}

          <SourceList sources={a.sources} locale={locale} dict={dict} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-3 rounded-3xl border border-line p-6">
            <p className="font-display font-bold">{d.share}</p>
            <ShareButtons title={a.title} labels={{ share: d.share, copyLink: d.copyLink, copied: d.copied }} />
          </div>
          <div className="space-y-4 rounded-3xl bg-ocean-deep p-6 text-white">
            <p className="font-display text-lg font-bold">{d.ctaTitle}</p>
            <p className="text-sm text-white/80">{d.ctaText}</p>
            <ButtonLink href={href("contact", locale)} variant="light" icon="arrowRight" className="w-full">
              {dict.nav.cta}
            </ButtonLink>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line bg-off-white py-16 sm:py-20">
          <div className="container-site space-y-8">
            <h2 id="related-title" className="text-h3">
              {d.related}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <GuideCard item={r} locale={locale} labels={dict.card} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

/* ======================= Professional ======================= */

export function professionalMetadata(locale: Locale, slug: string) {
  const p = getProfessional(locale, slug);
  if (!p) notFound();
  return buildMetadata({
    locale,
    title: p.name,
    description: p.description.slice(0, 155),
    path: detailPath("professionals", locale, p.slug),
    alternates: detailAlternates("professionals", p),
  });
}

export function ProfessionalView({ locale, slug }: { locale: Locale; slug: string }) {
  const p = getProfessional(locale, slug);
  if (!p) notFound();
  const dict = getDictionary(locale);
  const d = dict.professional;
  const path = detailPath("professionals", locale, p.slug);

  return (
    <>
      <TrackOnMount event="professional_open" props={{ slug: p.slug, category: p.category, locale }} />
      <PageHeader
        title={p.name}
        breadcrumb={{
          label: dict.breadcrumb.label,
          items: [
            { name: dict.breadcrumb.home, href: href("home", locale) },
            { name: dict.nav.explore, href: href("explore", locale) },
            { name: dict.pages.professionals.title, href: href("professionals", locale) },
            { name: p.name, path },
          ],
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{dict.categories.professionals[p.category]}</Badge>
          {p.sponsored ? <Badge tone="red">{dict.card.sponsored}</Badge> : null}
          {p.status === "demo" ? <DemoBadge label={dict.card.demo} title={dict.card.demoTitle} /> : null}
        </div>
        <p className="inline-flex items-center gap-1.5 text-muted">
          <Icon name="pin" size={18} />
          {p.location}
        </p>
      </PageHeader>

      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
        <div className="min-w-0 space-y-8">
          {p.status === "demo" ? <Callout tone="warning">{d.demoNotice}</Callout> : null}
          <p className="measure text-lg leading-relaxed text-ink/90">{p.description}</p>
          <section aria-labelledby="services-title" className="space-y-4">
            <h2 id="services-title" className="text-h3">
              {d.services}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.services.map((s) => (
                <li key={s} className="flex gap-2.5 rounded-2xl border border-line p-4">
                  <Icon name="check" size={20} className="mt-0.5 shrink-0 text-success" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
          {p.sponsored ? <Callout>{d.sponsoredNote}</Callout> : null}
          <p className="text-sm text-muted">{d.disclaimer}</p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-4 rounded-3xl border border-line p-6">
            <h2 className="font-display text-lg font-bold">{d.contact}</h2>
            <ul className="space-y-2">
              {p.website ? (
                <li>
                  <TrackedAnchor
                    href={p.website}
                    event="source_click"
                    eventProps={{ kind: "professional_website", slug: p.slug }}
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-800 underline underline-offset-4"
                  >
                    <Icon name="globe" size={18} />
                    {d.website}
                    <Icon name="external" size={14} />
                  </TrackedAnchor>
                </li>
              ) : null}
              {p.email ? (
                <li>
                  <a href={`mailto:${p.email}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-800 underline underline-offset-4">
                    <Icon name="mail" size={18} />
                    {p.email}
                  </a>
                </li>
              ) : null}
              {p.phone ? (
                <li>
                  <a href={`tel:${p.phone.replace(/\s+/g, "")}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-800 underline underline-offset-4">
                    <Icon name="phone" size={18} />
                    {p.phone}
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="flex gap-2 border-t border-line pt-4 text-sm text-muted">
              <Icon name={p.verifiedAt ? "checkCircle" : "info"} size={18} className={`mt-0.5 shrink-0 ${p.verifiedAt ? "text-success" : ""}`} />
              {p.verifiedAt ? t(d.verifiedOn, { date: formatDate(p.verifiedAt, locale) }) : d.notVerified}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ======================= Opportunity ======================= */

export function opportunityMetadata(locale: Locale, slug: string) {
  const o = getOpportunity(locale, slug);
  if (!o) notFound();
  return buildMetadata({
    locale,
    title: o.title,
    description: o.description.slice(0, 155),
    path: detailPath("opportunities", locale, o.slug),
    alternates: detailAlternates("opportunities", o),
  });
}

export async function OpportunityView({ locale, slug }: { locale: Locale; slug: string }) {
  const o = getOpportunity(locale, slug);
  if (!o) notFound();
  const dict = getDictionary(locale);
  const d = dict.opportunity;
  const expired = isExpired(o, await getToday());
  const path = detailPath("opportunities", locale, o.slug);

  const facts: { label: string; value: React.ReactNode }[] = [
    {
      label: d.status,
      value: expired ? <Badge tone="neutral">{dict.card.expired}</Badge> : <Badge tone="success">{dict.card.active}</Badge>,
    },
    { label: d.organization, value: o.organization },
    { label: dict.listing.location, value: o.location },
    { label: d.publishedOn.replace(" {date}", "").replace("{date}", ""), value: formatDate(o.publishedAt, locale) },
    { label: d.deadline, value: o.deadline ? formatDate(o.deadline, locale) : d.noDeadline },
    { label: d.contactMethod, value: o.contactMethod },
  ];

  return (
    <>
      <TrackOnMount event="opportunity_open" props={{ slug: o.slug, category: o.category, locale }} />
      <PageHeader
        title={o.title}
        breadcrumb={{
          label: dict.breadcrumb.label,
          items: [
            { name: dict.breadcrumb.home, href: href("home", locale) },
            { name: dict.nav.explore, href: href("explore", locale) },
            { name: dict.pages.opportunities.title, href: href("opportunities", locale) },
            { name: o.title, path },
          ],
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="blue">{dict.categories.opportunities[o.category]}</Badge>
          {expired ? <Badge tone="neutral">{dict.card.expired}</Badge> : <Badge tone="success">{dict.card.active}</Badge>}
          {o.status === "demo" ? <DemoBadge label={dict.card.demo} title={dict.card.demoTitle} /> : null}
        </div>
      </PageHeader>

      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div className="min-w-0 space-y-8">
          {o.status === "demo" ? <Callout tone="warning">{d.demoNotice}</Callout> : null}
          <p className="measure text-lg leading-relaxed text-ink/90">{o.description}</p>
          <Callout>{d.disclaimer}</Callout>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <dl className="divide-y divide-line rounded-3xl border border-line">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 px-6 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{f.label}</dt>
                <dd className="font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <TrackedAnchor
            href={o.sourceUrl}
            event="source_click"
            eventProps={{ kind: "opportunity", slug: o.slug }}
            className="tap inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 font-display font-bold text-white hover:bg-blue-900"
          >
            {d.viewSource}
            <Icon name="external" size={18} />
          </TrackedAnchor>
        </aside>
      </div>
    </>
  );
}
