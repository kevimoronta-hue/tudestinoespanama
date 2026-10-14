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

/*
 * Home composition (after the open hero):
 *   open intro with a media card → asymmetric destination cards → full-bleed ocean band
 *   with the stacked "five moments" → open editorial list on sand → featured guide +
 *   compact guides → contained Explore surface → split commitment card → contact surface
 *   that straddles into the footer.
 * Radii: surfaces 2rem, cards 1.25rem. Motion: 160 ms, cubic-bezier(0.23, 1, 0.32, 1).
 */

const EASE = "ease-[cubic-bezier(0.23,1,0.32,1)]";

/** Swipeable row on phones (native scroll-snap), regular layout from `md`. */
const SWIPE_ROW =
  "-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* ---------- Intro — open text + media card ---------- */

export function IntroSection({ dict }: { dict: Dictionary }) {
  const canal = dict.home.moments.items[1];
  return (
    <section aria-labelledby="intro-title" className="py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="intro-title"
          title={dict.home.intro.title}
          intro={dict.home.intro.text}
          className="lg:col-span-6 lg:pr-6"
        />
        <figure data-reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-surface)] bg-ocean-mist">
            <Image
              src="/images/canal-esclusas-miraflores.webp"
              alt={dict.home.intro.imageAlt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover object-[45%_center]"
            />
          </div>
          {/* Small caption surface overlapping the photo edge. */}
          <figcaption className="absolute -bottom-6 left-5 max-w-[80%] rounded-[var(--radius-control)] bg-white px-5 py-3.5 shadow-[0_14px_34px_-20px_rgb(6_34_48/0.45)] sm:left-8">
            <span className="block font-display text-[0.95rem] font-bold text-ink">{canal.place}</span>
            <span className="block text-sm text-muted">{canal.region}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- Journeys — asymmetric destination cards ---------- */

const JOURNEYS: { key: "discover" | "live" | "invest"; route: RouteKey; image: string; position: string }[] = [
  { key: "discover", route: "discover", image: "/images/casco-antiguo-fachada.webp", position: "object-[60%_center]" },
  { key: "live", route: "live", image: "/images/panama-city-bahia-aerea.webp", position: "object-center" },
  { key: "invest", route: "invest", image: "/images/canal-esclusas-miraflores.webp", position: "object-[35%_center]" },
];

export function JourneyCard({
  title,
  text,
  cta,
  href: to,
  image,
  imageAlt,
  journey,
  position,
  large = false,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  journey: string;
  position: string;
  large?: boolean;
}) {
  // Photograph first; title, one useful line and the action on a bottom scrim. One link for the whole card.
  return (
    <article
      className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ocean-deep text-white transition-transform duration-[160ms] ${EASE} active:scale-[0.985] has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-blue-600 has-[a:focus-visible]:ring-offset-2`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={large ? "(min-width: 1024px) 720px, 85vw" : "(min-width: 1024px) 520px, 85vw"}
        className={`-z-10 object-cover ${position} transition-transform duration-[180ms] ${EASE} group-hover:scale-[1.02]`}
      />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${large ? "bg-[linear-gradient(180deg,rgb(6_34_48/0)_25%,rgb(6_34_48/0.9)_100%)] md:bg-[linear-gradient(180deg,rgb(6_34_48/0)_40%,rgb(6_34_48/0.85)_100%)]" : "bg-[linear-gradient(180deg,rgb(6_34_48/0.05)_15%,rgb(6_34_48/0.9)_100%)]"}`} />
      <div className={`space-y-2 ${large ? "p-7 sm:p-10" : "p-6 sm:p-7"}`}>
        <h3 className={`font-display font-extrabold tracking-tight !text-white ${large ? "text-3xl sm:text-[2.6rem] sm:leading-[1.05]" : "text-2xl"}`}>
          {title}
        </h3>
        <p className={`text-white/90 ${large ? "max-w-[38ch] text-[1.05rem]" : "line-clamp-2 max-w-[32ch] text-[0.95rem]"}`}>{text}</p>
        <TrackedLink
          href={to}
          event="journey_select"
          eventProps={{ journey }}
          className="inline-flex min-h-11 items-center gap-2 pt-1 font-display font-bold text-white outline-none after:absolute after:inset-0 after:content-['']"
        >
          {cta}
          <Icon name="arrowRight" size={18} className={`transition-transform duration-[160ms] ${EASE} group-hover:translate-x-1`} />
        </TrackedLink>
      </div>
    </article>
  );
}

export function JourneysSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="journeys-title" className="pb-20 sm:pb-28">
      <div className="container-site space-y-10">
        <SectionHeading id="journeys-title" title={dict.home.journeys.title} />
        <ul
          data-reveal
          className={`${SWIPE_ROW} md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:h-[clamp(560px,48vw,700px)] lg:grid-cols-12 lg:grid-rows-2 lg:gap-5`}
        >
          {JOURNEYS.map((j, i) => {
            const c = dict.home.journeys.items[j.key];
            const large = i === 0;
            return (
              <li
                key={j.key}
                className={`w-[82vw] max-w-[380px] shrink-0 snap-start md:w-auto md:max-w-none ${
                  large
                    ? "aspect-[4/5] max-h-[540px] md:col-span-2 md:aspect-[16/9] md:max-h-none lg:col-span-7 lg:row-span-2 lg:aspect-auto"
                    : "aspect-[4/5] max-h-[540px] md:aspect-[4/3] md:max-h-none lg:col-span-5 lg:aspect-auto"
                }`}
              >
                <JourneyCard
                  title={c.title}
                  text={c.text}
                  cta={c.cta}
                  href={href(j.route, locale)}
                  image={j.image}
                  imageAlt={c.imageAlt}
                  journey={j.key}
                  position={j.position}
                  large={large}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Five moments — stacked cards on a full-bleed ocean band ---------- */

const MOMENT_IMAGES = [
  { src: "/images/panama-city-bahia-aerea.webp", position: "object-center" },
  { src: "/images/canal-esclusas-miraflores.webp", position: "object-[40%_center]" },
  { src: "/images/casco-antiguo-fachada.webp", position: "object-[65%_center]" },
  { src: "/images/skyline-cinta-costera.webp", position: "object-[60%_center]" },
  { src: "/images/guna-yala-isla.webp", position: "object-[50%_70%]" },
];

/**
 * Desktop/tablet: each card is sticky with a slightly larger top offset, so the next
 * one slides over it and the five settle as a stack (pure CSS, no scroll listeners).
 * Phones: the same list becomes a native swipe row; no pinned card ever blocks the screen.
 */
export function MomentsSection({ dict }: { dict: Dictionary }) {
  const m = dict.home.moments;
  return (
    <section aria-labelledby="moments-title" className="bg-ocean-deep py-20 text-white sm:py-28">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="moments-title" className="text-h2 !text-white md:col-span-7">
            {m.title}
          </h2>
          <p className="text-lead !text-white/75 md:col-span-5 md:pb-2">{m.intro}</p>
        </div>

        <ol aria-label={m.title} className={`${SWIPE_ROW} mt-10 md:mx-0 md:mt-14 md:block md:overflow-visible md:px-0 md:pb-0`}>
          {m.items.map((item, i) => {
            const img = MOMENT_IMAGES[i];
            return (
              <li
                key={item.place}
                className="w-[80vw] max-w-[360px] shrink-0 snap-start md:sticky md:mb-[22vh] md:w-auto md:max-w-none md:last:mb-0"
                style={{ top: `calc(var(--header-h) + 28px + ${i * 22}px)` }}
              >
                <article className="grid h-full overflow-hidden rounded-[var(--radius-card)] bg-ocean-800 shadow-[0_-18px_40px_-24px_rgb(0_0_0/0.6)] md:h-[min(64vh,540px)] md:grid-cols-[1.45fr_1fr] md:rounded-[var(--radius-surface)]">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 60vw, 80vw"
                      // Sticky cards defeat native lazy-loading heuristics: load these eagerly
                      // (low priority) so a card is never revealed empty.
                      loading="eager"
                      fetchPriority="low"
                      className={`object-cover ${img.position}`}
                    />
                  </div>
                  <div className="flex flex-col justify-end gap-2 p-6 md:p-10 lg:p-12">
                    <p className="text-sm font-semibold text-white/60">{item.region}</p>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight !text-white md:text-4xl">{item.place}</h3>
                    <p className="max-w-[34ch] text-white/80 md:text-lg">{item.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Why Panama — open editorial list on sand ---------- */

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
    <section aria-labelledby="why-title" className="bg-sand py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <SectionHeading id="why-title" eyebrow={dict.home.why.eyebrow} title={dict.home.why.title} intro={dict.home.why.intro} />
          </div>
        </div>
        <ul data-reveal className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {WHY.map((w) => {
            const item = dict.home.why.items[w.key];
            return (
              <li key={w.key} className="group relative border-t border-ink/12 py-5 sm:py-7">
                <h3 className="font-display text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-[40ch] text-muted">{item.text}</p>
                <Link
                  href={w.to(locale)}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-bold text-blue-800 after:absolute after:inset-0 after:content-['']"
                >
                  {dict.home.why.more}
                  <span className="sr-only">: {item.title}</span>
                  <Icon name="arrowRight" size={16} className={`transition-transform duration-[160ms] ${EASE} group-hover:translate-x-1`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Guides — one featured card + compact companions ---------- */

export function GuidesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const guides = getArticles(locale, "vivir").slice(0, 3).map(articleToItem);
  const [featured, ...rest] = guides;
  return (
    <section aria-labelledby="guides-title" className="py-20 sm:py-28">
      <div className="container-site space-y-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="guides-title"
            title={dict.home.guides.title}
            intro={
              <>
                <p>{dict.home.guides.intro}</p>
                <p className="mt-3 text-sm font-semibold text-ocean">{dict.home.guides.topics}</p>
              </>
            }
          />
          <ButtonLink href={href("live", locale)} variant="secondary" icon="arrowRight" className="self-start lg:self-auto">
            {dict.home.guides.viewAll}
          </ButtonLink>
        </div>
        {featured ? (
          <div data-reveal className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <GuideCard item={featured} locale={locale} labels={dict.card} variant="feature" />
            </div>
            <ul className="grid gap-5 lg:col-span-5 lg:grid-rows-2">
              {rest.map((g) => (
                <li key={g.id} className="min-h-[150px]">
                  <GuideCard item={g} locale={locale} labels={dict.card} variant="compact" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState title={dict.listing.emptyNoContentTitle} text={dict.listing.emptyNoContentText} icon="book" />
        )}
      </div>
    </section>
  );
}

/* ---------- Explore — contained surface ---------- */

export function ExploreSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const tiles: { key: keyof Dictionary["home"]["explore"]["tiles"]; route: RouteKey; count: number }[] = [
    { key: "articles", route: "articles", count: getArticles(locale).length },
    { key: "professionals", route: "professionals", count: getProfessionals(locale).length },
    { key: "opportunities", route: "opportunities", count: getOpportunities(locale).length },
    { key: "videos", route: "videos", count: getVideos(locale).length },
  ];
  return (
    <section aria-labelledby="explore-title" className="pb-20 sm:pb-28">
      <div className="container-site">
        <div className="grid gap-x-14 gap-y-8 rounded-[var(--radius-surface)] bg-ocean-mist px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:px-14">
          <SectionHeading
            id="explore-title"
            title={dict.home.explore.title}
            intro={dict.home.explore.intro}
            className="!max-w-4xl lg:col-span-12"
          />
          <div className="lg:col-span-5 lg:pt-5">
            <SearchBar
              action={href("explore", locale)}
              label={dict.listing.searchLabel}
              placeholder={dict.listing.searchPlaceholder}
              button={dict.listing.searchButton}
              tone="large"
            />
          </div>
          <ul data-reveal className="grid sm:grid-cols-2 lg:col-span-7">
            {tiles.map((tile) => {
              const c = dict.home.explore.tiles[tile.key];
              return (
                <li key={tile.key} className="border-t border-ink/10">
                  <Link
                    href={href(tile.route, locale)}
                    className={`group flex h-full min-h-11 items-start justify-between gap-4 rounded-[var(--radius-control)] px-2 py-6 transition-colors duration-[160ms] ${EASE} hover:bg-white/70 sm:px-4`}
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
                      className={`mt-1.5 shrink-0 text-blue-800 transition-transform duration-[160ms] ${EASE} group-hover:translate-x-1`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Social commitment — split media card ---------- */

export function SocialCommitment({ locale, dict, withLink = true }: { locale: Locale; dict: Dictionary; withLink?: boolean }) {
  const coast = dict.home.moments.items[3];
  return (
    <section aria-labelledby="social-title" className="pb-20 sm:pb-28">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[var(--radius-surface)] bg-ocean-deep text-white lg:grid-cols-12">
          <div className="relative aspect-[16/9] lg:col-span-5 lg:aspect-auto lg:min-h-[440px]">
            <Image
              src="/images/skyline-cinta-costera.webp"
              alt={`${coast.place}, ${coast.region}`}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-[60%_center]"
            />
          </div>
          <div className="space-y-5 px-6 py-10 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-16">
            <h2 id="social-title" className="text-h2 max-w-[16ch] !text-white">
              {dict.home.social.title}
            </h2>
            <p className="max-w-[52ch] text-lg leading-relaxed text-white/85">{dict.home.social.text}</p>
            <p className="max-w-[52ch] text-white/60">{dict.home.social.note}</p>
            {withLink ? (
              <Link href={href("about", locale)} className="group inline-flex min-h-11 items-center gap-2 font-display font-bold text-white">
                {dict.home.social.link}
                <Icon name="arrowRight" size={18} className={`transition-transform duration-[160ms] ${EASE} group-hover:translate-x-1`} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
