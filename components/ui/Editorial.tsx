import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { t } from "@/lib/t";
import { formatDate, type Locale } from "@/lib/i18n";
import type { Source } from "@/types/content";
import { Icon } from "./Icon";
import { TrackedAnchor } from "./TrackedLink";

export function LastUpdated({ date, locale, dict }: { date: string; locale: Locale; dict: Dictionary }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon name="calendar" size={16} />
      <time dateTime={date}>{t(dict.article.updatedOn, { date: formatDate(date, locale) })}</time>
    </span>
  );
}

export function SourceList({ sources, locale, dict }: { sources: Source[]; locale: Locale; dict: Dictionary }) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="sources-title" className="rounded-3xl border border-line bg-off-white p-6 sm:p-8">
      <h2 id="sources-title" className="text-h3">
        {dict.article.sourcesTitle}
      </h2>
      <p className="mt-2 text-sm text-muted">{dict.article.sourcesIntro}</p>
      <ul className="mt-5 divide-y divide-line">
        {sources.map((s) => (
          <li key={s.url + s.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <TrackedAnchor
                href={s.url}
                event="source_click"
                eventProps={{ publisher: s.publisher }}
                className="inline-flex items-center gap-1.5 font-semibold text-blue-800 underline decoration-blue-800/30 underline-offset-4 hover:decoration-blue-800"
              >
                {s.label}
                <Icon name="external" size={15} />
                <span className="sr-only">{dict.a11y.newTab}</span>
              </TrackedAnchor>
              <p className="text-sm text-muted">{s.publisher}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
              {s.official ? (
                <span className="inline-flex items-center gap-1 text-success">
                  <Icon name="shield" size={15} />
                  {dict.article.official}
                </span>
              ) : null}
              <span>{t(dict.article.consulted, { date: formatDate(s.consultedAt, locale) })}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Breadcrumb({
  items,
  label,
}: {
  items: { name: string; href?: string }[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.name}-${i}`} className="inline-flex items-center gap-1.5">
              {it.href && !last ? (
                <Link href={it.href} className="underline-offset-4 hover:text-blue-800 hover:underline">
                  {it.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-ink" : ""}>
                  {it.name}
                </span>
              )}
              {!last ? <Icon name="chevronRight" size={14} className="text-line-strong" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped to prevent script injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
