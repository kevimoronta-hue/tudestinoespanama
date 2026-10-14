/**
 * Content model — mirrors the CMS collections planned in docs/cms-comparison.md.
 * Local data in /content implements these types so a CMS adapter can replace
 * lib/content.ts without touching components.
 */

export type Locale = "es" | "en" | "fr" | "de" | "it";

/**
 * - "demo": placeholder for development. Never presented as real data;
 *   hidden in production unless NEXT_PUBLIC_SHOW_DEMO_CONTENT=true, and always badged.
 * - "draft": written but not yet verified — never rendered.
 * - "published": verified, sourced, dated.
 */
export type ContentStatus = "demo" | "draft" | "published";

export interface Source {
  label: string;
  url: string;
  /** Organisation publishing the source, e.g. "Autoridad del Canal de Panamá". */
  publisher: string;
  /** ISO date (YYYY-MM-DD) when the source was consulted. */
  consultedAt: string;
  official: boolean;
}

export type ArticleSection = "descubre" | "vivir" | "invertir";

export type ArticleCategory =
  // Descubre
  | "regiones"
  | "cultura"
  | "lifestyle"
  | "naturaleza"
  | "destinos"
  | "economia"
  | "guias"
  // Vivir
  | "primeros-pasos"
  | "vivienda"
  | "costo-de-vida"
  | "educacion"
  | "salud"
  | "transporte"
  | "servicios"
  | "tramites"
  // Invertir
  | "entorno-negocios"
  | "sectores";

export interface ContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Required credit line when the licence requires attribution. */
  credit?: string;
}

/** Body is a small, CMS-portable block structure (no raw HTML). */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export interface Article {
  /** Shared id across locales — used for hreflang alternates. */
  translationKey: string;
  title: string;
  slug: string;
  locale: Locale;
  excerpt: string;
  body: ArticleBlock[];
  section: ArticleSection;
  category: ArticleCategory;
  /** Region / location used by the location filter. */
  location: string;
  coverImage?: ContentImage;
  author: string;
  sources: Source[];
  /** True for legal, migration, tax, health, financial topics → disclaimer + sources mandatory. */
  sensitive: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
  status: ContentStatus;
}

export type ProfessionalCategory =
  | "legal"
  | "inmobiliaria"
  | "contabilidad"
  | "reubicacion"
  | "salud"
  | "educacion"
  | "seguros"
  | "traduccion";

export interface Professional {
  translationKey: string;
  locale: Locale;
  name: string;
  slug: string;
  logo?: ContentImage;
  coverImage?: ContentImage;
  category: ProfessionalCategory;
  location: string;
  description: string;
  services: string[];
  email?: string;
  phone?: string;
  website?: string;
  /** ISO date of the last verification by the editorial team. Undefined = not verified. */
  verifiedAt?: string;
  sponsored: boolean;
  status: ContentStatus;
}

export type OpportunityCategory =
  | "licitacion"
  | "convocatoria"
  | "programa"
  | "evento"
  | "alianza";

export interface Opportunity {
  translationKey: string;
  locale: Locale;
  title: string;
  slug: string;
  category: OpportunityCategory;
  location: string;
  description: string;
  organization: string;
  /** Mandatory — an opportunity without a source is never displayed. */
  sourceUrl: string;
  publishedAt: string;
  deadline?: string;
  contactMethod: string;
  status: ContentStatus;
}

export type VideoCategory = "ciudad" | "naturaleza" | "cultura" | "guia";

export interface VideoResource {
  translationKey: string;
  locale: Locale;
  title: string;
  slug: string;
  description: string;
  thumbnail?: ContentImage;
  /** Empty until a real, licensed video is supplied. */
  videoUrl?: string;
  category: VideoCategory;
  location: string;
  publishedAt: string;
  status: ContentStatus;
}

export type RequestType = "conocer" | "vivir" | "invertir" | "empresa" | "otra";

export interface ContactRequest {
  name: string;
  email: string;
  country: string;
  requestType: RequestType;
  message: string;
  locale: Locale;
  createdAt: string;
  status: "new" | "routed" | "closed";
}

export interface InvestorRequest {
  name: string;
  company?: string;
  country: string;
  email: string;
  sector: string;
  projectType: string;
  budget?: string;
  message: string;
  locale: Locale;
  createdAt: string;
}
