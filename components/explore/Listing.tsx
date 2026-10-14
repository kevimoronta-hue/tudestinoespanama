import { Suspense } from "react";
import { facetsFor } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { ListingItem, ListingKind } from "@/types/listing";
import { EmptyState } from "../ui/States";
import { ListingCard } from "./Cards";
import { ExploreListing } from "./ExploreListing";

/**
 * Server wrapper: the static HTML shell already contains the first page of
 * cards (indexable, usable without JS); the interactive client listing takes
 * over once search params are available.
 */
export function Listing({
  locale,
  items,
  kinds,
  resultsTitle,
  pageSize = 9,
}: {
  locale: Locale;
  items: ListingItem[];
  kinds: ListingKind[];
  resultsTitle: string;
  pageSize?: number;
}) {
  const dict = getDictionary(locale);
  const { categories, locations } = facetsFor(items);
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));

  const fallback =
    items.length === 0 ? (
      <EmptyState title={dict.listing.emptyNoContentTitle} text={dict.listing.emptyNoContentText} icon="book" />
    ) : (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {sorted.slice(0, pageSize).map((item) => (
          <li key={item.id}>
            <ListingCard item={item} locale={locale} labels={dict.card} />
          </li>
        ))}
      </ul>
    );

  return (
    <Suspense fallback={fallback}>
      <ExploreListing
        locale={locale}
        items={items}
        kinds={kinds.map((k) => ({ value: k, label: dict.categories.kinds[k] }))}
        categories={categories}
        locations={locations}
        labels={dict.listing}
        cardLabels={dict.card}
        pageSize={pageSize}
        resultsTitle={resultsTitle}
      />
    </Suspense>
  );
}
