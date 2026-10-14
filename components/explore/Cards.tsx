import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { formatDate, type Locale } from "@/lib/i18n";
import { t } from "@/lib/t";
import type { ListingItem } from "@/types/listing";
import { DemoBadge } from "../ui/Badge";
import { Icon } from "../ui/Icon";

export interface CardProps {
  item: ListingItem;
  locale: Locale;
  labels: Dictionary["card"];
  /** Above-the-fold cards can load eagerly. */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /** Guide cards only: "feature" = large editorial card, "compact" = thumbnail row. */
  variant?: "default" | "feature" | "compact";
}

/*
 * Editorial cards: photo first, then a small overline, the title and one line of
 * useful facts. No icon tiles, no stacked pills. The whole card is one link
 * (stretched title link → a single tab stop).
 */

// Depth: fine border + diffuse low shadow + inner highlight (.card-depth). Hover: image 1.02
// and a slightly stronger border, no lift. Press: 0.985. 160 ms, snappy ease-out.
const shell =
  "card-depth group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white transition-[box-shadow,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_0_0_1px_var(--border-strong),0_1px_2px_rgb(6_34_48/0.05),0_22px_44px_-28px_rgb(6_34_48/0.34)] active:scale-[0.985] has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blue-600";

function TitleLink({
  href,
  children,
  as: Tag = "h3",
  size = "md",
}: {
  href?: string;
  children: string;
  as?: "h2" | "h3";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "text-[1.02rem] sm:text-[1.1rem]", md: "text-[1.2rem]", lg: "text-[1.5rem] sm:text-[1.85rem] leading-tight" };
  return (
    <Tag className={`font-display font-bold leading-snug tracking-tight text-ink ${sizes[size]}`}>
      {href ? (
        <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
          {children}
        </Link>
      ) : (
        children
      )}
    </Tag>
  );
}

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-ocean">{children}</p>;
}

function Photo({ item, priority, ratio = "aspect-[3/2]" }: { item: ListingItem; priority?: boolean; ratio?: string }) {
  if (!item.image) return null;
  return (
    <div className={`relative ${ratio} overflow-hidden bg-ocean-mist`}>
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
      />
    </div>
  );
}

function Demo({ item, labels, floating }: { item: ListingItem; labels: Dictionary["card"]; floating?: boolean }) {
  if (!item.demo) return null;
  return (
    <span className={floating ? "absolute left-3 top-3 z-10" : ""}>
      <DemoBadge label={labels.demo} title={labels.demoTitle} />
    </span>
  );
}

function Facts({ children }: { children: React.ReactNode }) {
  return <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-sm text-muted">{children}</p>;
}

const Dot = () => <span aria-hidden="true">·</span>;

export function GuideCard({ item, locale, labels, priority, headingLevel, variant = "default" }: CardProps) {
  const facts = (
    <>
      {item.updatedAt ? (
        <time dateTime={item.updatedAt}>{t(labels.updated, { date: formatDate(item.updatedAt, locale) })}</time>
      ) : null}
      {item.updatedAt && item.readingTime ? <Dot /> : null}
      {item.readingTime ? <span>{t(labels.readingTime, { n: item.readingTime })}</span> : null}
    </>
  );

  if (variant === "feature") {
    return (
      <article className={shell}>
        <Demo item={item} labels={labels} floating={Boolean(item.image)} />
        <Photo item={item} priority={priority} ratio="aspect-[16/10]" />
        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-9">
          {!item.image ? <Demo item={item} labels={labels} /> : null}
          <Overline>{item.categoryLabel}</Overline>
          <TitleLink href={item.href} as={headingLevel} size="lg">
            {item.title}
          </TitleLink>
          <p className="line-clamp-3 max-w-[56ch] text-[1.02rem] text-muted">{item.excerpt}</p>
          <Facts>{facts}</Facts>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={`${shell} !flex-row`}>
        {item.image ? (
          <div className="relative w-[38%] shrink-0 overflow-hidden bg-ocean-mist sm:w-[40%]">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 220px, 40vw"
              className="object-cover transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Overline>{item.categoryLabel}</Overline>
            <Demo item={item} labels={labels} />
          </div>
          <TitleLink href={item.href} as={headingLevel} size="sm">
            {item.title}
          </TitleLink>
          <p className="mt-auto flex flex-wrap gap-x-2 pt-2 text-[0.82rem] text-muted">{facts}</p>
        </div>
      </article>
    );
  }

  return (
    <article className={shell}>
      <Demo item={item} labels={labels} floating={Boolean(item.image)} />
      <Photo item={item} priority={priority} />
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        {!item.image ? <Demo item={item} labels={labels} /> : null}
        <Overline>{item.categoryLabel}</Overline>
        <TitleLink href={item.href} as={headingLevel}>
          {item.title}
        </TitleLink>
        <p className="line-clamp-2 text-[0.97rem] text-muted">{item.excerpt}</p>
        <Facts>
          {item.updatedAt ? (
            <time dateTime={item.updatedAt}>{t(labels.updated, { date: formatDate(item.updatedAt, locale) })}</time>
          ) : null}
          {item.updatedAt && item.readingTime ? <Dot /> : null}
          {item.readingTime ? <span>{t(labels.readingTime, { n: item.readingTime })}</span> : null}
        </Facts>
      </div>
    </article>
  );
}

export function ProfessionalCard({ item, locale, labels, headingLevel }: CardProps) {
  return (
    <article className={shell}>
      <Photo item={item} />
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Overline>{item.categoryLabel}</Overline>
          {item.sponsored ? (
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-red-700">· {labels.sponsored}</span>
          ) : null}
          <Demo item={item} labels={labels} />
        </div>
        <TitleLink href={item.href} as={headingLevel}>
          {item.title}
        </TitleLink>
        <p className="line-clamp-2 text-[0.97rem] text-muted">{item.excerpt}</p>
        <Facts>
          <span>{item.location}</span>
          <Dot />
          {item.verifiedAt ? (
            <span className="text-success">{t(labels.verified, { date: formatDate(item.verifiedAt, locale) })}</span>
          ) : (
            <span>{labels.notVerified}</span>
          )}
        </Facts>
      </div>
    </article>
  );
}

export function OpportunityCard({ item, locale, labels, headingLevel }: CardProps) {
  return (
    <article className={shell}>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Overline>{item.categoryLabel}</Overline>
          <span className={`text-xs font-semibold uppercase tracking-[0.08em] ${item.expired ? "text-muted" : "text-success"}`}>
            · {item.expired ? labels.expired : labels.active}
          </span>
          <Demo item={item} labels={labels} />
        </div>
        <TitleLink href={item.href} as={headingLevel}>
          {item.title}
        </TitleLink>
        {item.organization ? <p className="text-sm font-medium text-ink/80">{item.organization}</p> : null}
        <p className="line-clamp-2 text-[0.97rem] text-muted">{item.excerpt}</p>
        <Facts>
          <span>{item.location}</span>
          <Dot />
          <span className={item.expired ? "" : "font-medium text-ink"}>
            {item.deadline ? t(labels.deadline, { date: formatDate(item.deadline, locale) }) : labels.noDeadline}
          </span>
        </Facts>
      </div>
    </article>
  );
}

export function VideoCard({ item, labels, headingLevel }: CardProps) {
  return (
    <article className={shell}>
      <div className="relative">
        <Demo item={item} labels={labels} floating />
        <Photo item={item} ratio="aspect-video" />
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ocean-deep/25">
          <span className="grid size-12 place-items-center rounded-full bg-white/90 text-ocean-deep">
            <Icon name="play" size={20} />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <Overline>{item.categoryLabel}</Overline>
        <TitleLink href={item.href} as={headingLevel}>
          {item.title}
        </TitleLink>
        <p className="line-clamp-2 text-[0.97rem] text-muted">{item.excerpt}</p>
        <Facts>
          <span>{item.location}</span>
          {item.videoPending ? (
            <>
              <Dot />
              <span>{labels.videoPending}</span>
            </>
          ) : null}
        </Facts>
      </div>
    </article>
  );
}

export function ListingCard(props: CardProps) {
  switch (props.item.kind) {
    case "articles":
      return <GuideCard {...props} />;
    case "professionals":
      return <ProfessionalCard {...props} />;
    case "opportunities":
      return <OpportunityCard {...props} />;
    case "videos":
      return <VideoCard {...props} />;
  }
}
