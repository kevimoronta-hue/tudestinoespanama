import type { ContentImage } from "./content";

export type ListingKind = "articles" | "professionals" | "opportunities" | "videos";

/** Serializable card model shared by server pages and the client listing. */
export interface ListingItem {
  id: string;
  kind: ListingKind;
  href?: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  location: string;
  /** ISO date used for "recent" sorting. */
  date: string;
  image?: ContentImage;
  demo: boolean;
  /** Article */
  updatedAt?: string;
  readingTime?: number;
  sourceLabels?: string[];
  /** Professional */
  sponsored?: boolean;
  verifiedAt?: string;
  /** Opportunity */
  deadline?: string;
  expired?: boolean;
  organization?: string;
  /** Video */
  videoPending?: boolean;
}

export interface FacetOption {
  value: string;
  label: string;
}
