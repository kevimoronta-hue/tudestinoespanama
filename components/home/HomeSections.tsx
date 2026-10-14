import Image from "next/image";
import Link from "next/link";
import { articleToItem, getArticles, getOpportunities, getProfessionals, getVideos } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { href, type Locale, type RouteKey } from "@/lib/i18n";
import { GuideCard } from "../explore/Cards";
import { SearchBar } from "../explore/SearchBar";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { EmptyState } from "../ui/States";
import { TrackedLink } from "../ui/TrackedLink";

/* ---------- Section 2 — Intro ---------- */

export function IntroSection({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="intro-title" className="py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <SectionHeading id="intro-title" eyebrow={dict.home.intro.eyebrow} title={dict.home.intro.title} intro={dict.home.intro.text} />
        <figure className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-blue-100 lg:aspect-[5/4]">
          <Image
            src="/images/canal-esclusas-miraflores.webp"
            alt={dict.home.intro.imageAlt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  );
}

/* ---------- Section 3 — Journeys ---------- */

const JOURNEYS: { key: "discover" | "live" | "invest"; route: RouteKey; image: string }[] = [
  { key: "discover", route: "discover", image: "/images/casco-antiguo-fachada.webp" },
  { key: "live", route: "live", image: "/images/panama-city-bahia-aerea.webp" },
  { key: "invest", route: "invest", image: "/images/canal-esclusas-miraflores.webp" },
];

export function JourneyCard({
  title,
  text,
  cta,
  href: to,
  image,
  imageAlt,
  journey,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  journey: string;
}) {
  // Large photograph, title and one useful line on a soft scrim; the whole card is the link.
  return (
    <article className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-ocean-deep text-white sm:aspect-[4/5] has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-blue-600 has-[a:focus-visible]:ring-offset-2">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(6_34_48/0)_35%,rgb(6_34_48/0.85)_100%)]" />
      <div className="space-y-2 p-6 sm:p-7">
        <h3 className="font-display text-2xl font-extrabold tracking-tight !text-white sm:text-[1.7rem]">{title}</h3>
        <p className="max-w-[34ch] text-[0.97rem] leading-relaxed text-white/85">{text}</p>
        <TrackedLink
          href={to}
          event="journey_select"
          eventProps={{ journey }}
          className="inline-flex min-h-11 items-center gap-2 pt-1 font-display font-bold text-white outline-none after:absolute after:inset-0 after:content-['']"
        >
          {cta}
          <Icon
            name="arrowRight"
            size={18}
            className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
          />
        </TrackedLink>
      </div>
    </article>
  );
}

export function JourneysSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="journeys-title" className="py-20 sm:py-28">
      <div className="container-site space-y-12">
        <SectionHeading id="journeys-title" eyebrow={dict.home.journeys.eyebrow} title={dict.home.journeys.title} />
        <ul data-reveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {JOURNEYS.map((j) => {
            const c = dict.home.journeys.items[j.key];
            return (
              <li key={j.key}>
                <JourneyCard
                  title={c.title}
                  text={c.text}
                  cta={c.cta}
                  href={href(j.route, locale)}
                  image={j.image}
                  imageAlt={c.imageAlt}
                  journey={j.key}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Section 4 — Why Panama ---------- */

const WHY: { key: keyof Dictionary["home"]["why"]["items"]; to: (l: Locale) => string }[] = [
  { key: "connectivity", to: (l) => href("invest", l) },
  { key: "diversity", to: (l) => href("discover", l, { cat: "regiones" }) },
  { key: "logistics", to: (l) => `${href("invest", l)}#sectores` },
  { key: "nature", to: (l) => href("discover", l, { cat: "naturaleza" }) },
  { key: "community", to: (l) => href("live", l) },
  { key: "position", to: (l) => href("articles", l) },
];

export function WhyPanamaSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-28">
      <div className="container-site space-y-12">
        <SectionHeading id="why-title" eyebrow={dict.home.why.eyebrow} title={dict.home.why.title} intro={dict.home.why.intro} />
        {/* Editorial list: number, title, one line, link — no icon tiles. */}
        <ol data-reveal className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => {
            const item = dict.home.why.items[w.key];
            return (
              <li key={w.key} className="group relative border-t border-line py-7">
                <span className="font-display text-sm font-bold tabular-nums text-ocean">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
                <Link
                  href={w.to(locale)}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-bold text-blue-800 after:absolute after:inset-0 after:content-['']"
                >
                  {dict.home.why.more}
                  <span className="sr-only">: {item.title}</span>
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Section 5 — Practical guides ---------- */

export function GuidesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const guides = getArticles(locale, "vivir").slice(0, 3).map(articleToItem);
  return (
    <section aria-labelledby="guides-title" className="bg-sand py-20 sm:py-28">
      <div className="container-site space-y-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="guides-title"
            eyebrow={dict.home.guides.eyebrow}
            title={dict.home.guides.title}
            intro={
              <>
                <p>{dict.home.guides.intro}</p>
                <p className="mt-3 text-sm font-semibold text-blue-800">{dict.home.guides.topics}</p>
              </>
            }
          />
          <ButtonLink href={href("live", locale)} variant="secondary" icon="arrowRight" className="self-start lg:self-auto">
            {dict.home.guides.viewAll}
          </ButtonLink>
        </div>
        {guides.length ? (
          <ul data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <li key={g.id}>
                <GuideCard item={g} locale={locale} labels={dict.card} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title={dict.listing.emptyNoContentTitle} text={dict.listing.emptyNoContentText} icon="book" />
        )}
      </div>
    </section>
  );
}

/* ---------- Section 6 — Explore ---------- */

export function ExploreSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const tiles: { key: keyof Dictionary["home"]["explore"]["tiles"]; route: RouteKey; count: number }[] = [
    { key: "articles", route: "articles", count: getArticles(locale).length },
    { key: "professionals", route: "professionals", count: getProfessionals(locale).length },
    { key: "opportunities", route: "opportunities", count: getOpportunities(locale).length },
    { key: "videos", route: "videos", count: getVideos(locale).length },
  ];
  return (
    <section aria-labelledby="explore-title" className="py-20 sm:py-28">
      <div className="container-site space-y-10">
        <SectionHeading id="explore-title" eyebrow={dict.home.explore.eyebrow} title={dict.home.explore.title} intro={dict.home.explore.intro} />
        <div className="max-w-2xl">
          <SearchBar
            action={href("explore", locale)}
            label={dict.listing.searchLabel}
            placeholder={dict.listing.searchPlaceholder}
            button={dict.listing.searchButton}
            tone="large"
          />
        </div>
        <ul data-reveal className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => {
            const c = dict.home.explore.tiles[tile.key];
            return (
              <li key={tile.key}>
                <Link
                  href={href(tile.route, locale)}
                  className="group flex h-full min-h-11 items-start justify-between gap-4 border-b border-line py-6 pr-2 transition-colors duration-150 hover:bg-ocean-mist/60 sm:px-4"
                >
                  <span className="space-y-1">
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-lg font-bold text-ink">{c.title}</span>
                      <span className="font-display text-sm font-bold tabular-nums text-ocean">{tile.count}</span>
                    </span>
                    <span className="block text-sm text-muted">{c.text}</span>
                  </span>
                  <Icon
                    name="arrowRight"
                    size={18}
                    className="mt-1.5 shrink-0 text-blue-800 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Section 7 — Social commitment ---------- */

export function SocialCommitment({ locale, dict, withLink = true }: { locale: Locale; dict: Dictionary; withLink?: boolean }) {
  return (
    <section aria-labelledby="social-title" className="py-20 sm:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-ocean-deep px-6 py-14 text-white sm:px-12 lg:px-16">
          <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-ocean/40 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
            <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-red-100">
              <Icon name="heart" size={30} />
            </span>
            <div className="max-w-3xl space-y-5">
              <p className="eyebrow !text-red-100">{dict.home.social.eyebrow}</p>
              <h2 id="social-title" className="text-h2 !text-white">
                {dict.home.social.title}
              </h2>
              <p className="text-lg leading-relaxed text-white/90">{dict.home.social.text}</p>
              <p className="border-l-2 border-red-600 pl-4 text-white/75">{dict.home.social.note}</p>
              {withLink ? (
                <Link href={href("about", locale)} className="inline-flex min-h-11 items-center gap-2 font-display font-bold text-white underline-offset-4 hover:underline">
                  {dict.home.social.link}
                  <Icon name="arrowRight" size={18} />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
