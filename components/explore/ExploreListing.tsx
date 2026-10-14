"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useRef, useTransition, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { FacetOption, ListingItem, ListingKind } from "@/types/listing";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { EmptyState } from "../ui/States";
import { ListingCard } from "./Cards";
import { FilterBar, FilterDrawer, type FilterField } from "./Filters";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

export interface ExploreListingProps {
  locale: Locale;
  items: ListingItem[];
  kinds: { value: ListingKind; label: string }[];
  categories: FacetOption[];
  locations: FacetOption[];
  labels: Dictionary["listing"];
  cardLabels: Dictionary["card"];
  pageSize?: number;
  /** Section heading shown above results (visually hidden when omitted). */
  resultsTitle: string;
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function relevance(item: ListingItem, terms: string[]): number {
  const title = normalize(item.title);
  const body = normalize(`${item.excerpt} ${item.categoryLabel} ${item.location} ${item.organization ?? ""}`);
  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 3;
    else if (body.includes(term)) score += 1;
    else return 0; // every term must match somewhere
  }
  return score;
}

export function ExploreListing({
  locale,
  items,
  kinds,
  categories,
  locations,
  labels,
  cardLabels,
  pageSize = 9,
  resultsTitle,
}: ExploreListingProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const resultsId = useId();

  const q = params.get("q")?.trim() ?? "";
  const type = params.get("tipo") ?? "";
  const cat = params.get("cat") ?? "";
  const loc = params.get("loc") ?? "";
  const sort = params.get("orden") === "pertinente" ? "pertinente" : "reciente";
  const page = Math.max(1, Number.parseInt(params.get("pagina") ?? "1", 10) || 1);

  const update = (next: Record<string, string>, opts: { resetPage?: boolean; focusResults?: boolean } = {}) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    if (opts.resetPage !== false) sp.delete("pagina");
    const qs = sp.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
    if (opts.focusResults) {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  const filtered = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    let list = items.filter(
      (i) => (!type || i.kind === type) && (!cat || i.category === cat) && (!loc || i.location === loc),
    );
    if (terms.length) {
      const scored = list.map((i) => [i, relevance(i, terms)] as const).filter(([, s]) => s > 0);
      list =
        sort === "pertinente"
          ? scored.sort((a, b) => b[1] - a[1] || b[0].date.localeCompare(a[0].date)).map(([i]) => i)
          : scored.map(([i]) => i).sort((a, b) => b.date.localeCompare(a.date));
    } else {
      list = [...list].sort((a, b) => b.date.localeCompare(a.date));
    }
    return list;
  }, [items, q, type, cat, loc, sort]);

  // Facet options only list what exists for the current type.
  const visibleCategories = useMemo(() => {
    if (!type) return categories;
    const present = new Set(items.filter((i) => i.kind === type).map((i) => i.category));
    return categories.filter((c) => present.has(c.value));
  }, [categories, items, type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * pageSize, current * pageSize);
  const activeFilters = Boolean(q || type || cat || loc);

  const fields: FilterField[] = [
    ...(kinds.length > 1
      ? [
          {
            name: "tipo",
            label: labels.type,
            value: type,
            allLabel: labels.allTypes,
            options: kinds.map((k) => ({ value: k.value, label: k.label })),
          },
        ]
      : []),
    { name: "cat", label: labels.category, value: cat, allLabel: labels.all, options: visibleCategories },
    { name: "loc", label: labels.location, value: loc, allLabel: labels.all, options: locations },
    {
      name: "orden",
      label: labels.sort,
      value: sort === "pertinente" ? "pertinente" : "",
      allLabel: labels.sortRecent,
      options: [{ value: "pertinente", label: labels.sortRelevant }],
    },
  ];

  const onFilter = (name: string, value: string) => {
    track("filter_apply", { filter: name, value: value || "all", locale });
    update(name === "tipo" ? { tipo: value, cat: "" } : { [name]: value });
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    // Only the query length is tracked — never the text itself.
    track("search_submit", { locale, length: value.length, scope: pathname });
    update({ q: value }, { focusResults: true });
  };

  const clearAll = () => update({ q: "", tipo: "", cat: "", loc: "", orden: "" });

  if (items.length === 0) {
    return <EmptyState title={labels.emptyNoContentTitle} text={labels.emptyNoContentText} icon="book" />;
  }

  const countLabel =
    filtered.length === 1 ? labels.resultsOne : labels.resultsMany.replace("{n}", String(filtered.length));

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-3xl border border-line bg-off-white p-4 sm:p-5">
        <SearchBar
          key={q}
          defaultValue={q}
          label={labels.searchLabel}
          placeholder={labels.searchPlaceholder}
          button={labels.searchButton}
          onSubmit={onSearch}
        />
        <FilterBar fields={fields} onChange={onFilter} />
        <div className="flex items-center justify-between gap-3 md:hidden">
          <FilterDrawer
            fields={fields}
            onChange={onFilter}
            labels={{ open: labels.filters, apply: labels.applyFilters, close: labels.closeFilters, clear: labels.clearFilters }}
            onClear={clearAll}
            activeCount={[type, cat, loc].filter(Boolean).length}
          />
          {activeFilters ? (
            <button type="button" onClick={clearAll} className="tap text-sm font-semibold text-blue-800 underline underline-offset-4">
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 ref={resultsRef} tabIndex={-1} id={resultsId} className="sr-only outline-none">
          {resultsTitle}
        </h2>
        <p aria-live="polite" aria-atomic="true" className="font-display text-sm font-bold text-muted">
          {countLabel}
          {pending ? <span className="sr-only"> — {labels.loading}</span> : null}
        </p>
        {activeFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="tap hidden items-center gap-1.5 text-sm font-semibold text-blue-800 underline-offset-4 hover:underline md:inline-flex"
          >
            <Icon name="close" size={16} />
            {labels.clearFilters}
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={labels.emptyTitle}
          text={labels.emptyText}
          icon="search"
          action={
            <button type="button" onClick={clearAll} className={buttonClasses("secondary")}>
              {labels.clearFilters}
            </button>
          }
        />
      ) : (
        <ul
          aria-labelledby={resultsId}
          aria-busy={pending}
          className={`grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${pending ? "opacity-60" : ""}`}
        >
          {pageItems.map((item) => (
            <li key={item.id}>
              <ListingCard item={item} locale={locale} labels={cardLabels} />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 ? (
        <Pagination
          page={current}
          total={totalPages}
          labels={labels}
          onPage={(p) => update({ pagina: p > 1 ? String(p) : "" }, { resetPage: false, focusResults: true })}
        />
      ) : null}
    </div>
  );
}
